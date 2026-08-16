import Foundation
import Testing
@testable import Synapse

/// Every figure here is shown to a student as a measurement of their own work,
/// so the arithmetic has to be right and the thresholds have to hold. A wrong
/// accuracy figure does not look wrong — it looks like a bad week.
struct PerformanceTests {

    private let calendar = Calendar(identifier: .gregorian)
    private let now = Date(timeIntervalSince1970: 1_770_000_000)  // a fixed day

    private func record(
        daysAgo: Int = 0, correct: Bool? = true, seconds: Int? = 60,
        subject: String = "SYS_CVS", topic: String = "Cardiac output",
        difficulty: String = "Moderate", id: String = UUID().uuidString
    ) -> AttemptRecord {
        let at = calendar.date(byAdding: .day, value: -daysAgo, to: now)!
        return AttemptRecord(
            id: id, at: ISO8601DateFormatter.synapse.string(from: at), surface: "qbank",
            itemId: "Q-\(id)", subjectId: subject, topic: topic, difficulty: difficulty,
            conceptIds: [], correct: correct, seconds: seconds, sessionId: "S1"
        )
    }

    private func summarise(_ records: [AttemptRecord]) -> PerformanceSummary {
        PerformanceModel.summarise(records, now: now, calendar: calendar)
    }

    @Test("accuracy counts only marked answers")
    func accuracy() {
        let summary = summarise([
            record(correct: true), record(correct: true), record(correct: false),
        ])
        #expect(summary.attempts == 3)
        #expect(summary.marked == 3)
        #expect(summary.correct == 2)
        #expect(summary.accuracy == 2.0 / 3.0)
    }

    /// A self-ticked station has no right answer to compare against. Counting
    /// it either way would misreport how a student is doing.
    @Test("unmarked work is practice, not accuracy")
    func unmarkedExcluded() {
        let summary = summarise([
            record(correct: true), record(correct: nil), record(correct: nil),
        ])
        #expect(summary.attempts == 3, "it still counts as work done")
        #expect(summary.marked == 1, "but only one answer could be marked")
        #expect(summary.accuracy == 1.0)
    }

    @Test("no marked answers means no accuracy figure at all")
    func noAccuracyWithoutMarks() {
        #expect(summarise([record(correct: nil)]).accuracy == nil)
        #expect(summarise([]).accuracy == nil)
    }

    @Suite("Streaks")
    struct Streaks {
        private let helper = PerformanceTests()

        @Test("consecutive days count")
        func consecutive() {
            let summary = helper.summarise([
                helper.record(daysAgo: 0), helper.record(daysAgo: 1), helper.record(daysAgo: 2),
            ])
            #expect(summary.streak == 3)
        }

        /// Otherwise the streak reads zero every morning until the student sits
        /// down, which is exactly when encouragement matters.
        @Test("a streak survives today being empty")
        func todayNotYetStudied() {
            let summary = helper.summarise([
                helper.record(daysAgo: 1), helper.record(daysAgo: 2),
            ])
            #expect(summary.streak == 2)
        }

        @Test("a missed day ends it")
        func gapBreaks() {
            let summary = helper.summarise([
                helper.record(daysAgo: 0), helper.record(daysAgo: 2), helper.record(daysAgo: 3),
            ])
            #expect(summary.streak == 1, "the gap at day 1 ends the run")
        }

        @Test("two days of silence means no streak")
        func stale() {
            #expect(helper.summarise([helper.record(daysAgo: 2)]).streak == 0)
        }

        @Test("several answers in one day are still one day")
        func sameDay() {
            let summary = helper.summarise([
                helper.record(daysAgo: 0), helper.record(daysAgo: 0), helper.record(daysAgo: 0),
            ])
            #expect(summary.streak == 1)
        }
    }

    @Suite("Thresholds")
    struct Thresholds {
        private let helper = PerformanceTests()

        /// An accuracy drawn from four answers is noise wearing the clothes of
        /// a measurement.
        @Test("a topic below the floor is not reported")
        func topicFloor() {
            let summary = helper.summarise([
                helper.record(topic: "Thin"), helper.record(topic: "Thin"),
            ] + (0..<3).map { _ in helper.record(topic: "Thick") })

            let topics = summary.bySubject.map(\.topic)
            #expect(topics.contains("Thick"))
            #expect(!topics.contains("Thin"), "two answers is not a measurement")
        }

        @Test("weakest topics come first — that is what to study")
        func weakestFirst() {
            let strong = (0..<4).map { _ in helper.record(correct: true, topic: "Strong") }
            let weak = (0..<4).map { i in helper.record(correct: i == 0, topic: "Weak") }

            let summary = helper.summarise(strong + weak)
            #expect(summary.bySubject.first?.topic == "Weak")
        }

        @Test("difficulty reads easy to hard, not alphabetically")
        func difficultyOrder() {
            let records: [AttemptRecord] = ["Challenging", "Easy", "Hard", "Moderate"].flatMap { level in
                (0..<3).map { _ in helper.record(difficulty: level) }
            }
            #expect(helper.summarise(records).byDifficulty.map(\.difficulty)
                    == ["Easy", "Moderate", "Hard", "Challenging"])
        }
    }

    /// A heatmap with the empty days removed would misrepresent how often
    /// someone actually studies.
    @Test("activity covers 17 whole weeks, including the empty days")
    func activityIncludesGaps() {
        let summary = summarise([record(daysAgo: 0), record(daysAgo: 30)])
        #expect(summary.activity.count == 17 * 7)
        #expect(summary.activity.filter { $0.count > 0 }.count == 2)
        #expect(summary.activity.last?.count == 1, "today is the final column")
    }

    @Test("timestamps without fractional seconds still parse")
    func plainTimestamps() {
        let at = ISO8601DateFormatter.plain.string(from: now)
        let record = AttemptRecord(
            id: "1", at: at, surface: "qbank", itemId: "Q1", subjectId: "S",
            topic: "T", difficulty: "Easy", conceptIds: [], correct: true,
            seconds: 10, sessionId: "S1"
        )
        #expect(summarise([record]).streak == 1, "an older record must not be dropped")
    }

    @Test("an empty log reports nothing rather than zeroes that look like results")
    func empty() {
        let summary = summarise([])
        #expect(summary.attempts == 0)
        #expect(summary.accuracy == nil)
        #expect(summary.streak == 0)
        #expect(summary.bySubject.isEmpty)
    }
}
