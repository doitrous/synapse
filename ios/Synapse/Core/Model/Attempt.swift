import Foundation

/// One answered item.
///
/// A port of `AttemptRecord` in `src/data/attempts.ts`, and it has to stay a
/// port: this is the raw event log every performance figure is computed from,
/// on both platforms. A field named differently here would not throw — it would
/// quietly stop counting on the web.
struct AttemptRecord: Codable, Identifiable, Equatable, Sendable {
    let id: String
    /// ISO 8601.
    let at: String
    let surface: String
    let itemId: String
    let subjectId: String
    let topic: String
    let difficulty: String
    let conceptIds: [String]
    /// Null when nobody marked the work — a self-ticked OSCE station. Null is
    /// not the same as wrong, and accuracy must not count it either way.
    let correct: Bool?
    let seconds: Int?
    let sessionId: String
}

/// A month's worth of attempts. Sharded so a year of study is not one document
/// that has to be rewritten on every answer.
struct AttemptMonth: Codable, Equatable, Sendable {
    var version = 1
    let month: String
    var records: [AttemptRecord]
}

/// The headline numbers, readable without loading a single month shard.
struct AttemptTotals: Codable, Equatable, Sendable {
    var attempts = 0
    /// Attempts that were marked — the denominator for accuracy.
    var marked = 0
    var correct = 0
    var lastAt: String?
}

struct AttemptIndex: Codable, Equatable, Sendable {
    var version = 1
    var months: [String] = []
    var totals = AttemptTotals()
}

enum AttemptStore {
    static let indexKey = "nishany.progress.attemptIndex.v1"

    /// `YYYY-MM` — the shard a timestamp belongs to.
    ///
    /// Local components, matching the web app's use of `getFullYear` and
    /// `getMonth`. Using UTC here would file a late-evening answer under the
    /// next month for anyone east of Greenwich, and split a student's record
    /// across two shards the web app would not look in.
    static func month(of date: Date, calendar: Calendar = .current) -> String {
        let parts = calendar.dateComponents([.year, .month], from: date)
        return String(format: "%04d-%02d", parts.year ?? 0, parts.month ?? 0)
    }

    static func monthKey(_ month: String) -> String { "nishany.progress.attempts.\(month)" }
}

/// How well a concept is known.
///
/// A port of `ConceptMastery` in `src/data/mastery.ts`. `encounters` counts
/// times seen without being marked, which is why it is separate from
/// `attempts`.
struct ConceptMastery: Codable, Equatable, Sendable {
    let conceptId: String
    var attempts = 0
    var correct = 0
    var encounters = 0
    var lastSeen: String
}

enum MasteryStore {
    static let key = "nishany.progress.mastery.v1"
}
