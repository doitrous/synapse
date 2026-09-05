import Foundation

/// What the attempt log adds up to.
///
/// A port of the analyses in `src/data/attemptStats.ts`. One rule runs through
/// all of them: **a group with nothing marked has no accuracy, not nought.**
/// A station nobody scored and a question answered wrong are different facts,
/// and rendering the first as 0% tells a student they failed at something that
/// was never marked.
enum AttemptStats {

    /// One group of attempts and what they came to.
    struct Breakdown<Key: Hashable & Sendable>: Identifiable, Equatable, Sendable {
        let key: Key
        let attempts: Int
        /// Attempts that were marked against a key — the denominator.
        let marked: Int
        let correct: Int
        /// Nil when this group has no marked attempt.
        let accuracy: Double?

        var id: Key { key }
    }

    /// Marked attempts needed before a group is worth ranking.
    ///
    /// One wrong answer is not a weakness, and ranking it as one sends a
    /// student to revise a topic on the strength of a single unlucky item.
    static let minimumMarked = 3

    private static func summarise<Key>(_ key: Key, _ records: [AttemptRecord]) -> Breakdown<Key> {
        let scored = records.filter { $0.correct != nil }
        let correct = scored.filter { $0.correct == true }.count
        return Breakdown(
            key: key,
            attempts: records.count,
            marked: scored.count,
            correct: correct,
            accuracy: scored.isEmpty ? nil : Double(correct) / Double(scored.count)
        )
    }

    static func group<Key>(
        _ records: [AttemptRecord], by keyOf: (AttemptRecord) -> Key
    ) -> [Breakdown<Key>] {
        var order: [Key] = []
        var buckets: [Key: [AttemptRecord]] = [:]
        for record in records {
            let key = keyOf(record)
            if buckets[key] == nil { order.append(key) }
            buckets[key, default: []].append(record)
        }
        return order.map { summarise($0, buckets[$0] ?? []) }
    }

    static func bySubject(_ records: [AttemptRecord]) -> [Breakdown<String>] {
        group(records) { $0.subjectId }.sorted { $0.attempts > $1.attempts }
    }

    static func byTopic(_ records: [AttemptRecord]) -> [Breakdown<String>] {
        group(records) { $0.topic }.sorted { $0.attempts > $1.attempts }
    }

    /// Where the work went — question bank, practical, cases.
    static func bySurface(_ records: [AttemptRecord]) -> [Breakdown<String>] {
        group(records) { $0.surface }.sorted { $0.attempts > $1.attempts }
    }

    /// The weakest groups, worst accuracy first.
    static func weakest<Key>(
        _ breakdowns: [Breakdown<Key>], minMarked: Int = minimumMarked, limit: Int = 5
    ) -> [Breakdown<Key>] {
        breakdowns
            .filter { $0.marked >= minMarked && $0.accuracy != nil }
            .sorted {
                let a = $0.accuracy ?? 0
                let b = $1.accuracy ?? 0
                return a != b ? a < b : $0.marked > $1.marked
            }
            .prefix(limit)
            .map { $0 }
    }

    /// When in the day the work happens, by local hour.
    static func hourHistogram(_ records: [AttemptRecord]) -> [Int] {
        var hours = [Int](repeating: 0, count: 24)
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = .current
        for record in records {
            guard let date = ISO8601DateFormatter.read(record.at) else { continue }
            hours[calendar.component(.hour, from: date)] += 1
        }
        return hours
    }

    /// How the first sight of an item compares with every later one.
    ///
    /// First-attempt accuracy is the honest measure of what a student knew;
    /// repeat accuracy mostly measures whether they remember the answer.
    /// Reporting one number over both flatters the record, so they are kept
    /// apart.
    static func firstAttemptSplit(
        _ records: [AttemptRecord]
    ) -> (first: Breakdown<String>, repeated: Breakdown<String>) {
        let ordered = records.sorted { $0.at < $1.at }
        var seen: Set<String> = []
        var firsts: [AttemptRecord] = []
        var repeats: [AttemptRecord] = []

        for record in ordered {
            let key = "\(record.surface):\(record.itemId)"
            if seen.contains(key) { repeats.append(record) } else {
                seen.insert(key)
                firsts.append(record)
            }
        }
        return (summarise("first", firsts), summarise("repeat", repeats))
    }

    /// Distinct items attempted, which is coverage rather than volume.
    ///
    /// A student who answered the same ten questions twenty times has done two
    /// hundred attempts and covered ten items; saying "200" would be true and
    /// useless.
    static func distinctItems(_ records: [AttemptRecord]) -> Int {
        Set(records.map { "\($0.surface):\($0.itemId)" }).count
    }
}
