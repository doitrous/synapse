import Foundation

/// What a student has actually demonstrated, concept by concept.
///
/// A port of `src/data/mastery.ts`. Authoring already draws the distinction
/// this rests on: a question's main and secondary concepts are what it
/// assesses, while contextual concepts are merely mentioned. Only the first two
/// reach the ledger — recording a contextual concept would tell a student to
/// revise something no item ever measured.
enum Mastery {

    /// Which surface produced a piece of evidence.
    enum Source: String, Sendable {
        case question, `case`, interpretation, station

        /// Whether somebody marked the work against a key.
        ///
        /// A station or checklist is ticked by the student, so it says the
        /// concept was practised and nothing about whether it was understood.
        /// Keeping the two apart is what stops a self-scored checklist
        /// inflating an accuracy figure.
        var isMarked: Bool { self != .station }
    }

    /// Marked answers needed before accuracy is called anything but provisional.
    static let confidentAttempts = 3

    /// Fold one item's result into the ledger.
    ///
    /// Concepts are deduplicated: an item naming the same concept as both its
    /// main and a secondary concept is one piece of evidence, not two.
    static func record(
        _ ledger: [String: ConceptMastery], conceptIds: [String],
        source: Source, correct: Bool? = nil, at: String
    ) -> [String: ConceptMastery] {
        var seen: Set<String> = []
        let ids = conceptIds
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty && seen.insert($0).inserted }
        guard !ids.isEmpty else { return ledger }

        var next = ledger
        for id in ids {
            var entry = next[id] ?? ConceptMastery(conceptId: id, lastSeen: at)
            if source.isMarked {
                entry.attempts += 1
                if correct == true { entry.correct += 1 }
            } else {
                entry.encounters += 1
            }
            entry.lastSeen = at
            next[id] = entry
        }
        return next
    }

    /// Accuracy on marked answers, or nil when nothing has been marked yet.
    static func accuracy(_ entry: ConceptMastery) -> Double? {
        entry.attempts > 0 ? Double(entry.correct) / Double(entry.attempts) : nil
    }

    /// How confident the ledger is about a concept.
    ///
    /// `practised` is deliberately separate from the accuracy bands: it is what
    /// a student did on a station, where nobody marked the work. One right
    /// answer is not mastery either, so a single attempt cannot reach `secure`.
    static func band(_ entry: ConceptMastery?) -> MasteryBand {
        guard let entry else { return .unseen }
        guard entry.attempts > 0 else { return entry.encounters > 0 ? .practised : .unseen }

        let rate = Double(entry.correct) / Double(entry.attempts)
        if rate < 0.5 { return .shaky }
        if rate < 0.8 || entry.attempts < confidentAttempts { return .developing }
        return .secure
    }

    struct Summary: Equatable, Sendable {
        /// Concepts with at least one marked answer.
        var measured = 0
        /// Concepts seen only on a station, so never marked.
        var practisedOnly = 0
        var attempts = 0
        var correct = 0
        /// Accuracy across marked answers, or nil when there are none.
        var accuracy: Double?
    }

    static func summarise(_ ledger: [String: ConceptMastery]) -> Summary {
        let entries = Array(ledger.values)
        let attempts = entries.reduce(0) { $0 + $1.attempts }
        let correct = entries.reduce(0) { $0 + $1.correct }
        return Summary(
            measured: entries.filter { $0.attempts > 0 }.count,
            practisedOnly: entries.filter { $0.attempts == 0 && $0.encounters > 0 }.count,
            attempts: attempts,
            correct: correct,
            accuracy: attempts > 0 ? Double(correct) / Double(attempts) : nil
        )
    }
}

/// How well a concept is known.
enum MasteryBand: String, CaseIterable, Sendable {
    case unseen, practised, shaky, developing, secure

    var label: String {
        switch self {
        case .unseen: "Not met"
        case .practised: "Practised"
        case .shaky: "Shaky"
        case .developing: "Developing"
        case .secure: "Secure"
        }
    }
}

/// What is worth revisiting, and when.
///
/// A port of `src/data/reviewQueue.ts`. The dashboard used to show five fixed
/// rows, identical for every student and unrelated to anything they had done.
/// This derives the queue from the only record of what a student has actually
/// demonstrated.
///
/// The word "retention" is deliberately absent. Nothing here measures decay;
/// the ledger holds accuracy on marked answers, and calling that retention
/// would dress one measurement as a different one.
enum ReviewQueue {

    /// How long a concept stays settled before it is worth seeing again.
    ///
    /// Wider intervals for stronger evidence, which is the whole point of
    /// spacing. A concept only met on a station has no accuracy behind it, so
    /// it comes back sooner than one answered correctly three times.
    static let intervalDays: [MasteryBand: Int] = [
        .shaky: 1, .practised: 2, .developing: 3, .secure: 14,
    ]

    /// How many concepts a review sitting covers.
    static let sittingSize = 12

    struct Item: Identifiable, Equatable, Sendable {
        let conceptId: String
        let band: MasteryBand
        /// Accuracy on marked answers, 0–100, or nil when only practised.
        let accuracyPct: Int?
        let attempts: Int
        /// Negative when overdue, 0 when due today.
        let dueInDays: Int
        let lastSeen: String

        var id: String { conceptId }
    }

    /// Every concept due or overdue, most urgent first.
    ///
    /// Concepts never encountered are absent by construction: a review queue is
    /// for revisiting, and telling a student to "review" something they have
    /// never seen is how a queue becomes noise.
    static func due(_ ledger: [String: ConceptMastery], now: Date = Date()) -> [Item] {
        items(ledger, now: now) { $0 <= 0 }
            // Most overdue first; within a day, the weakest evidence first,
            // since that is where a review is worth the most.
            .sorted {
                $0.dueInDays != $1.dueInDays
                    ? $0.dueInDays < $1.dueInDays
                    : ($0.accuracyPct ?? 0) < ($1.accuracyPct ?? 0)
            }
    }

    /// Concepts due soon but not yet — what tomorrow looks like.
    static func upcoming(
        _ ledger: [String: ConceptMastery], withinDays: Int, now: Date = Date()
    ) -> [Item] {
        items(ledger, now: now) { $0 > 0 && $0 <= withinDays }
            .sorted { $0.dueInDays < $1.dueInDays }
    }

    private static func items(
        _ ledger: [String: ConceptMastery], now: Date, where include: (Int) -> Bool
    ) -> [Item] {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = .current
        let today = calendar.startOfDay(for: now)

        return ledger.values.compactMap { entry -> Item? in
            let band = Mastery.band(entry)
            guard band != .unseen, let interval = intervalDays[band] else { return nil }
            guard let seen = ISO8601DateFormatter.read(entry.lastSeen) else { return nil }

            // Whole days apart, so "due today" does not depend on the hour the
            // student happened to answer.
            let seenDay = calendar.startOfDay(for: seen)
            guard let dueDay = calendar.date(byAdding: .day, value: interval, to: seenDay) else { return nil }
            let dueInDays = calendar.dateComponents([.day], from: today, to: dueDay).day ?? 0
            guard include(dueInDays) else { return nil }

            let rate = Mastery.accuracy(entry)
            return Item(
                conceptId: entry.conceptId,
                band: band,
                accuracyPct: rate.map { Int(($0 * 100).rounded()) },
                attempts: entry.attempts,
                dueInDays: dueInDays,
                lastSeen: entry.lastSeen
            )
        }
    }
}
