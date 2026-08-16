import Foundation
import Observation

/// A sitting of the question bank.
@MainActor
@Observable
final class QuestionBankModel {

    enum Phase: Equatable {
        case building
        case running
        case finished
    }

    /// What the student has done with one question.
    struct Answered: Equatable {
        let question: Question
        let chosenLabel: String
        let seconds: Int
        var isCorrect: Bool { question.isCorrect(chosenLabel) }
    }

    private(set) var phase: Phase = .building
    private(set) var available: [Question] = []
    private(set) var isLoading = true
    private(set) var emptyReason: String?

    /// The questions in this sitting, in order.
    private(set) var session: [Question] = []
    private(set) var index = 0
    /// Set once the student commits to an answer. Nil while they are choosing.
    private(set) var chosen: String?
    private(set) var answers: [Answered] = []

    /// Chapters a student can narrow to.
    var topics: [String] {
        Array(Set(available.map(\.topic).filter { !$0.isEmpty })).sorted()
    }

    var selectedTopic: String?
    var length = 10

    private let store: LocalStore
    private let sync: SyncEngine
    private var questionStartedAt = Date()
    private let sessionId = UUID().uuidString
    var universityId: String?
    var yearId: String?

    init(store: LocalStore, sync: SyncEngine, universityId: String? = nil, yearId: String? = nil) {
        self.store = store
        self.sync = sync
        self.universityId = universityId
        self.yearId = yearId
    }

    var current: Question? { session.indices.contains(index) ? session[index] : nil }
    var isAnswered: Bool { chosen != nil }
    var correctCount: Int { answers.filter(\.isCorrect).count }

    func load() async {
        isLoading = true
        defer { isLoading = false }

        do {
            let items = try await store.items(kind: .question, universityId: universityId, yearId: yearId)
            available = items.compactMap(QuestionProjection.project)
            emptyReason = available.isEmpty ? await describeEmptiness(published: items.count) : nil
        } catch {
            available = []
            emptyReason = "The question bank could not be opened on this device."
        }
    }

    // MARK: - Running a sitting

    func start() {
        let pool = selectedTopic.map { topic in available.filter { $0.topic == topic } } ?? available
        session = Array(pool.shuffled().prefix(length))
        index = 0
        chosen = nil
        answers = []
        questionStartedAt = Date()
        phase = session.isEmpty ? .building : .running
    }

    /// Commit to an answer. Deliberately irreversible — a question you can
    /// re-answer after seeing the explanation teaches nothing and makes the
    /// accuracy figure a fiction.
    func choose(_ label: String) {
        guard chosen == nil, let question = current else { return }
        chosen = label
        answers.append(Answered(
            question: question,
            chosenLabel: label,
            seconds: max(0, Int(Date().timeIntervalSince(questionStartedAt)))
        ))
    }

    func next() async {
        guard isAnswered else { return }
        if index + 1 < session.count {
            index += 1
            chosen = nil
            questionStartedAt = Date()
        } else {
            phase = .finished
            await recordAttempts()
        }
    }

    func restart() {
        phase = .building
        session = []
        answers = []
        index = 0
        chosen = nil
    }

    // MARK: - Recording

    /// Write the sitting to the student's record.
    ///
    /// Saved locally first, and only then pushed. The server holds a month of
    /// attempts as a single document, so writing one means replacing the whole
    /// thing — a step that can fail, and must never be the only copy of work a
    /// student has just done.
    private func recordAttempts() async {
        let now = Date()
        let stamp = ISO8601DateFormatter.synapse.string(from: now)
        let month = AttemptStore.month(of: now)

        for answer in answers {
            let record = AttemptRecord(
                id: "\(sessionId)-\(answer.question.id)",
                at: stamp,
                surface: "qbank",
                itemId: answer.question.id,
                subjectId: answer.question.subjectId,
                topic: answer.question.topic,
                difficulty: answer.question.difficulty,
                conceptIds: answer.question.conceptIds,
                correct: answer.isCorrect,
                seconds: answer.seconds,
                sessionId: sessionId
            )
            if let encoded = try? JSONEncoder().encode(record) {
                try? await store.saveAttempt(id: record.id, month: month, record: encoded)
            }
        }

        await pushAttempts()
    }

    /// Push every month that has unsent attempts.
    ///
    /// The whole month is written, rebuilt from the local record, because the
    /// server document is replaced rather than appended to.
    func pushAttempts() async {
        guard let months = try? await store.monthsWithPendingAttempts() else { return }

        for month in months {
            guard let rows = try? await store.attempts(month: month) else { continue }
            let records = rows.compactMap { try? JSONDecoder().decode(AttemptRecord.self, from: $0) }
            guard !records.isEmpty else { continue }

            await sync.write(
                key: AttemptStore.monthKey(month),
                value: AttemptMonth(month: month, records: records)
            )
            try? await store.markAttemptsPushed(month: month)
        }

        await pushIndex(months: months)
    }

    /// The headline totals, so a summary can be read without loading a shard.
    private func pushIndex(months: [String]) async {
        var totals = AttemptTotals()
        var seen: Set<String> = []

        for month in months {
            guard let rows = try? await store.attempts(month: month) else { continue }
            for row in rows {
                guard let record = try? JSONDecoder().decode(AttemptRecord.self, from: row) else { continue }
                totals.attempts += 1
                if let correct = record.correct {
                    totals.marked += 1
                    if correct { totals.correct += 1 }
                }
                if totals.lastAt == nil || record.at > totals.lastAt! { totals.lastAt = record.at }
            }
            seen.insert(month)
        }

        await sync.write(
            key: AttemptStore.indexKey,
            value: AttemptIndex(months: seen.sorted(), totals: totals)
        )
    }

    private func describeEmptiness(published: Int) async -> String {
        let total = (try? await store.itemCount(kind: .question)) ?? 0
        if total == 0 {
            let nothingSynced = (try? await store.catalogueVersions().isEmpty) ?? true
            return nothingSynced
                ? "Nothing has downloaded yet. Pull to refresh once you have a connection."
                : "No questions have been published yet."
        }
        if published == 0 {
            return "No questions are published for your university and year yet."
        }
        // Published, in scope, and still nothing sittable: every one was
        // unmarkable. Worth distinguishing — it is a content fault, not an
        // empty catalogue.
        return "The published questions could not be read on this device."
    }
}

extension ISO8601DateFormatter {
    /// Fractional seconds, matching what the web app writes.
    static let synapse: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter
    }()
}
