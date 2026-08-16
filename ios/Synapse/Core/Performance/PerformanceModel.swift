import Foundation
import Observation

/// What the attempt log says about how a student is doing.
///
/// Computed from the local record, so it works with no connection and needs no
/// server-side aggregation. Every figure here is a measurement of work actually
/// done — nothing is projected, estimated, or padded to look encouraging.
struct PerformanceSummary: Equatable, Sendable {
    var attempts = 0
    /// Attempts that were marked. The denominator for accuracy — a self-scored
    /// station has no right answer to compare against and must not count.
    var marked = 0
    var correct = 0
    var totalSeconds = 0
    var lastAt: Date?
    /// Consecutive days ending today (or yesterday) with at least one attempt.
    var streak = 0
    /// Accuracy per subject, for subjects with enough answers to mean anything.
    var bySubject: [SubjectAccuracy] = []
    var byDifficulty: [DifficultyAccuracy] = []
    /// Answers per day for the last 17 weeks, oldest first.
    var activity: [DayCount] = []

    var accuracy: Double? {
        marked > 0 ? Double(correct) / Double(marked) : nil
    }

    var medianSeconds: Int? {
        attempts > 0 ? totalSeconds / attempts : nil
    }

    struct SubjectAccuracy: Identifiable, Equatable, Sendable {
        let subjectId: String
        let topic: String
        let marked: Int
        let correct: Int
        var id: String { subjectId + topic }
        var accuracy: Double { marked > 0 ? Double(correct) / Double(marked) : 0 }
    }

    struct DifficultyAccuracy: Identifiable, Equatable, Sendable {
        let difficulty: String
        let marked: Int
        let correct: Int
        var id: String { difficulty }
        var accuracy: Double { marked > 0 ? Double(correct) / Double(marked) : 0 }
    }

    struct DayCount: Identifiable, Equatable, Sendable {
        let date: Date
        let count: Int
        var id: TimeInterval { date.timeIntervalSince1970 }
    }
}

@MainActor
@Observable
final class PerformanceModel {

    /// Below this, an accuracy figure is noise dressed as a measurement.
    /// The web app holds the same floor.
    static let minimumMarked = 20
    /// Per topic, the same idea at a smaller scale.
    static let minimumPerTopic = 3

    private(set) var summary = PerformanceSummary()
    private(set) var isLoading = true

    private let store: LocalStore

    init(store: LocalStore) {
        self.store = store
    }

    /// True once there is enough marked work for accuracy to mean something.
    var hasEnoughForAccuracy: Bool { summary.marked >= Self.minimumMarked }

    func load() async {
        isLoading = true
        defer { isLoading = false }

        let records = await allRecords()
        summary = Self.summarise(records)
    }

    private func allRecords() async -> [AttemptRecord] {
        guard let months = try? await store.allAttemptMonths() else { return [] }
        var records: [AttemptRecord] = []
        for month in months {
            guard let rows = try? await store.attempts(month: month) else { continue }
            records.append(contentsOf: rows.compactMap { try? JSONDecoder().decode(AttemptRecord.self, from: $0) })
        }
        return records
    }

    /// Pure, so it can be tested without a database.
    nonisolated static func summarise(
        _ records: [AttemptRecord],
        now: Date = Date(),
        calendar: Calendar = .current
    ) -> PerformanceSummary {
        var summary = PerformanceSummary()
        guard !records.isEmpty else { return summary }

        var bySubject: [String: (subjectId: String, topic: String, marked: Int, correct: Int)] = [:]
        var byDifficulty: [String: (marked: Int, correct: Int)] = [:]
        var perDay: [Date: Int] = [:]

        for record in records {
            summary.attempts += 1
            summary.totalSeconds += record.seconds ?? 0

            if let at = ISO8601DateFormatter.synapse.date(from: record.at)
                ?? ISO8601DateFormatter.plain.date(from: record.at) {
                if summary.lastAt == nil || at > summary.lastAt! { summary.lastAt = at }
                let day = calendar.startOfDay(for: at)
                perDay[day, default: 0] += 1
            }

            // Unmarked work counts as practice but never as accuracy.
            guard let correct = record.correct else { continue }
            summary.marked += 1
            if correct { summary.correct += 1 }

            let key = record.subjectId + "|" + record.topic
            var subject = bySubject[key] ?? (record.subjectId, record.topic, 0, 0)
            subject.marked += 1
            if correct { subject.correct += 1 }
            bySubject[key] = subject

            var difficulty = byDifficulty[record.difficulty] ?? (0, 0)
            difficulty.marked += 1
            if correct { difficulty.correct += 1 }
            byDifficulty[record.difficulty] = difficulty
        }

        summary.bySubject = bySubject.values
            .filter { $0.marked >= minimumPerTopic }
            .map { .init(subjectId: $0.subjectId, topic: $0.topic, marked: $0.marked, correct: $0.correct) }
            .sorted { $0.accuracy < $1.accuracy }   // weakest first: that is what to study

        let order = ["Easy", "Moderate", "Hard", "Challenging"]
        summary.byDifficulty = byDifficulty
            .map { PerformanceSummary.DifficultyAccuracy(difficulty: $0.key, marked: $0.value.marked, correct: $0.value.correct) }
            .sorted { (order.firstIndex(of: $0.difficulty) ?? 99) < (order.firstIndex(of: $1.difficulty) ?? 99) }

        summary.activity = activity(perDay: perDay, now: now, calendar: calendar)
        summary.streak = streak(perDay: perDay, now: now, calendar: calendar)
        return summary
    }

    /// The last 17 weeks, day by day, including the empty ones — a heatmap with
    /// the gaps removed would misrepresent how often someone actually studies.
    private nonisolated static func activity(
        perDay: [Date: Int], now: Date, calendar: Calendar
    ) -> [PerformanceSummary.DayCount] {
        let today = calendar.startOfDay(for: now)
        return (0..<(17 * 7)).reversed().compactMap { offset in
            guard let day = calendar.date(byAdding: .day, value: -offset, to: today) else { return nil }
            return .init(date: day, count: perDay[day] ?? 0)
        }
    }

    /// Consecutive days of study, counted back from today.
    ///
    /// A streak survives today being empty — it is not broken until a whole day
    /// passes with nothing, otherwise it would read as zero every morning until
    /// the student sat down.
    private nonisolated static func streak(
        perDay: [Date: Int], now: Date, calendar: Calendar
    ) -> Int {
        let today = calendar.startOfDay(for: now)
        var cursor = (perDay[today] ?? 0) > 0
            ? today
            : calendar.date(byAdding: .day, value: -1, to: today) ?? today

        var count = 0
        while (perDay[cursor] ?? 0) > 0 {
            count += 1
            guard let previous = calendar.date(byAdding: .day, value: -1, to: cursor) else { break }
            cursor = previous
        }
        return count
    }
}

extension ISO8601DateFormatter {
    /// Timestamps without fractional seconds, which older records carry.
    static let plain: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime]
        return formatter
    }()
}
