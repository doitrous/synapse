import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/data/mastery.ts` and `src/data/reviewQueue.ts` run under
/// Node against the same ledger. This is the record the whole idea of the
/// product rests on — what a student has actually demonstrated — so a band or
/// an interval that disagrees between platforms sends them to revise the wrong
/// thing.
struct MasteryTests {

    private func entry(
        _ id: String, attempts: Int = 0, correct: Int = 0, encounters: Int = 0, seen: String = "x"
    ) -> ConceptMastery {
        ConceptMastery(conceptId: id, attempts: attempts, correct: correct, encounters: encounters, lastSeen: seen)
    }

    @Test func bandsMatchTheWeb() {
        #expect(Mastery.band(nil) == .unseen)
        #expect(Mastery.band(entry("a")) == .unseen)
        #expect(Mastery.band(entry("a", encounters: 2)) == .practised)
        #expect(Mastery.band(entry("a", attempts: 2, correct: 0)) == .shaky)
        #expect(Mastery.band(entry("a", attempts: 2, correct: 2)) == .developing)
        #expect(Mastery.band(entry("a", attempts: 5, correct: 4)) == .secure)
        #expect(Mastery.band(entry("a", attempts: 5, correct: 5)) == .secure)
        #expect(Mastery.band(entry("a", attempts: 10, correct: 7)) == .developing)
    }

    /// Two right answers out of two is not mastery. A single good run cannot
    /// reach `secure`, however clean it is.
    @Test func oneGoodRunIsNotMastery() {
        #expect(Mastery.band(entry("a", attempts: 1, correct: 1)) == .developing)
        #expect(Mastery.band(entry("a", attempts: 2, correct: 2)) == .developing)
        #expect(Mastery.band(entry("a", attempts: 3, correct: 3)) == .secure)
    }

    /// A ticked station says the concept was practised and nothing about
    /// whether it was understood. Letting it count would inflate accuracy with
    /// work nobody marked.
    @Test func selfScoredWorkClaimsNoAccuracy() {
        var ledger: [String: ConceptMastery] = [:]
        ledger = Mastery.record(ledger, conceptIds: ["c1"], source: .station, at: "2026-08-19T09:00:00Z")
        #expect(ledger["c1"]?.attempts == 0)
        #expect(ledger["c1"]?.encounters == 1)
        #expect(Mastery.accuracy(ledger["c1"]!) == nil)
        #expect(Mastery.band(ledger["c1"]) == .practised)
    }

    /// An item naming the same concept twice is one piece of evidence.
    @Test func aConceptNamedTwiceCountsOnce() {
        var ledger: [String: ConceptMastery] = [:]
        ledger = Mastery.record(
            ledger, conceptIds: ["c1", "c1", "c2"], source: .question,
            correct: true, at: "2026-08-19T09:00:00Z"
        )
        ledger = Mastery.record(
            ledger, conceptIds: ["c1"], source: .station, at: "2026-08-19T09:30:00Z"
        )

        #expect(ledger["c1"] == ConceptMastery(
            conceptId: "c1", attempts: 1, correct: 1, encounters: 1, lastSeen: "2026-08-19T09:30:00Z"
        ))
        #expect(ledger["c2"] == ConceptMastery(
            conceptId: "c2", attempts: 1, correct: 1, encounters: 0, lastSeen: "2026-08-19T09:00:00Z"
        ))
    }

    @Test func blankAndWhitespaceConceptsAreIgnored() {
        let ledger = Mastery.record([:], conceptIds: ["  ", ""], source: .question, correct: true, at: "x")
        #expect(ledger.isEmpty)
    }

    @Test func theSummaryMatchesTheWeb() {
        var ledger: [String: ConceptMastery] = [:]
        ledger = Mastery.record(ledger, conceptIds: ["c1", "c1", "c2"], source: .question, correct: true, at: "2026-08-19T09:00:00Z")
        ledger = Mastery.record(ledger, conceptIds: ["c1"], source: .station, at: "2026-08-19T09:30:00Z")

        let summary = Mastery.summarise(ledger)
        #expect(summary.measured == 2)
        #expect(summary.practisedOnly == 0)
        #expect(summary.attempts == 2)
        #expect(summary.correct == 2)
        #expect(summary.accuracy == 1)
    }
}

struct ReviewQueueTests {

    /// A fixed clock, so "due today" does not depend on when the suite runs.
    private let now = ISO8601DateFormatter.read("2026-08-19T10:00:00Z")!

    private func daysAgo(_ days: Int) -> String {
        ISO8601DateFormatter.synapse.string(from: now.addingTimeInterval(-Double(days) * 86_400))
    }

    private var ledger: [String: ConceptMastery] {
        [
            "shakyOld": ConceptMastery(conceptId: "shakyOld", attempts: 4, correct: 1, lastSeen: daysAgo(5)),
            "secureNew": ConceptMastery(conceptId: "secureNew", attempts: 5, correct: 5, lastSeen: daysAgo(1)),
            "secureOld": ConceptMastery(conceptId: "secureOld", attempts: 5, correct: 5, lastSeen: daysAgo(20)),
            "practised": ConceptMastery(conceptId: "practised", encounters: 3, lastSeen: daysAgo(4)),
            "unseen": ConceptMastery(conceptId: "unseen", lastSeen: daysAgo(9)),
            "devToday": ConceptMastery(conceptId: "devToday", attempts: 3, correct: 2, lastSeen: daysAgo(3)),
        ]
    }

    @Test func intervalsMatchTheWeb() {
        #expect(ReviewQueue.intervalDays[.shaky] == 1)
        #expect(ReviewQueue.intervalDays[.practised] == 2)
        #expect(ReviewQueue.intervalDays[.developing] == 3)
        #expect(ReviewQueue.intervalDays[.secure] == 14)
    }

    /// Most overdue first, and within a day the weakest evidence first —
    /// that is where a review is worth the most.
    @Test func theQueueMatchesTheWebExactly() {
        let due = ReviewQueue.due(ledger, now: now)
        #expect(due.map(\.conceptId) == ["secureOld", "shakyOld", "practised", "devToday"])
        #expect(due.map(\.dueInDays) == [-6, -4, -2, 0])
        #expect(due.map(\.accuracyPct) == [100, 25, nil, 67])
        #expect(due.map(\.band) == [.secure, .shaky, .practised, .developing])
    }

    /// A concept never met is not something to review. Telling a student to
    /// revisit it is how a queue becomes noise they learn to ignore.
    @Test func conceptsNeverMetAreNotInTheQueue() {
        let due = ReviewQueue.due(ledger, now: now)
        #expect(!due.contains { $0.conceptId == "unseen" })
    }

    /// Stronger evidence buys a longer rest — the whole point of spacing.
    @Test func strongEvidenceIsNotDueYet() {
        let due = ReviewQueue.due(ledger, now: now)
        #expect(!due.contains { $0.conceptId == "secureNew" })

        let soon = ReviewQueue.upcoming(ledger, withinDays: 14, now: now)
        #expect(soon.map(\.conceptId) == ["secureNew"])
        #expect(soon.map(\.dueInDays) == [13])
    }

    @Test func nothingIsDueFromAnEmptyLedger() {
        #expect(ReviewQueue.due([:], now: now).isEmpty)
        #expect(ReviewQueue.upcoming([:], withinDays: 7, now: now).isEmpty)
    }

    /// A timestamp that cannot be read is skipped rather than treated as the
    /// epoch, which would put it at the top of the queue forever.
    /// The ledger carries timestamps in both forms — the web writes fractional
    /// seconds, older rows do not. Reading only one would quietly retire every
    /// concept written in the other from review, with nothing to show for it.
    @Test func bothTimestampFormsAreRead() {
        let withFraction = ISO8601DateFormatter.synapse.string(from: now.addingTimeInterval(-5 * 86_400))
        let withoutFraction = ISO8601DateFormatter.plain.string(from: now.addingTimeInterval(-5 * 86_400))

        let a = ["a": ConceptMastery(conceptId: "a", attempts: 4, correct: 1, lastSeen: withFraction)]
        let b = ["b": ConceptMastery(conceptId: "b", attempts: 4, correct: 1, lastSeen: withoutFraction)]

        #expect(ReviewQueue.due(a, now: now).map(\.dueInDays) == [-4])
        #expect(ReviewQueue.due(b, now: now).map(\.dueInDays) == [-4])
    }

    @Test func anUnreadableTimestampIsSkipped() {
        let broken = ["x": ConceptMastery(conceptId: "x", attempts: 3, correct: 1, lastSeen: "not a date")]
        #expect(ReviewQueue.due(broken, now: now).isEmpty)
    }
}
