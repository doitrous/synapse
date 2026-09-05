import Foundation
import Testing
@testable import Nishany

/// Pinned to `src/data/attemptStats.ts` run under Node against the same log.
///
/// The rule these all turn on: a group with nothing marked has *no* accuracy,
/// not nought. A station nobody scored and a question answered wrong are
/// different facts, and showing the first as 0% tells a student they failed at
/// something that was never marked.
struct AttemptStatsTests {

    private func record(
        _ id: String, at: String, item: String, subject: String, surface: String, correct: Bool?
    ) -> AttemptRecord {
        AttemptRecord(
            id: id, at: at, surface: surface, itemId: item, subjectId: subject,
            topic: "t", difficulty: "Easy", conceptIds: [],
            correct: correct, seconds: 10, sessionId: "s"
        )
    }

    private var log: [AttemptRecord] {
        [
            record("1", at: "2026-08-01T09:00:00Z", item: "q1", subject: "cvs", surface: "qbank", correct: true),
            record("2", at: "2026-08-01T14:00:00Z", item: "q1", subject: "cvs", surface: "qbank", correct: false),
            record("3", at: "2026-08-02T09:00:00Z", item: "q2", subject: "cvs", surface: "qbank", correct: true),
            record("4", at: "2026-08-02T21:00:00Z", item: "st1", subject: "resp", surface: "practical", correct: nil),
            record("5", at: "2026-08-03T09:00:00Z", item: "q3", subject: "resp", surface: "qbank", correct: false),
        ]
    }

    /// The practical station has one attempt and no accuracy at all, because
    /// nobody marked it.
    @Test func workBySurfaceMatchesTheWeb() {
        let surfaces = AttemptStats.bySurface(log)
        #expect(surfaces.map(\.key) == ["qbank", "practical"])
        #expect(surfaces[0].attempts == 4)
        #expect(surfaces[0].marked == 4)
        #expect(surfaces[0].accuracy == 0.5)

        #expect(surfaces[1].attempts == 1)
        #expect(surfaces[1].marked == 0)
        #expect(surfaces[1].accuracy == nil)
    }

    @Test func workBySubjectMatchesTheWeb() {
        let subjects = AttemptStats.bySubject(log)
        #expect(subjects.map(\.key) == ["cvs", "resp"])
        #expect(abs((subjects[0].accuracy ?? 0) - 2.0 / 3) < 1e-12)
        #expect(subjects[1].accuracy == 0)
    }

    /// First-attempt accuracy is what a student knew; repeat accuracy mostly
    /// measures whether they remember the answer. One number over both
    /// flatters the record.
    @Test func firstSightIsSeparatedFromEveryLaterOne() {
        let split = AttemptStats.firstAttemptSplit(log)

        #expect(split.first.attempts == 4)
        #expect(split.first.marked == 3)
        #expect(abs((split.first.accuracy ?? 0) - 2.0 / 3) < 1e-12)

        #expect(split.repeated.attempts == 1)
        #expect(split.repeated.marked == 1)
        #expect(split.repeated.accuracy == 0)
    }

    /// The same item on two surfaces is two items — a station and a question
    /// that happen to share an id are not the same piece of work.
    @Test func coverageCountsDistinctItemsNotAttempts() {
        #expect(AttemptStats.distinctItems(log) == 4)

        let sameIdTwoSurfaces = [
            record("a", at: "2026-08-01T09:00:00Z", item: "x", subject: "cvs", surface: "qbank", correct: true),
            record("b", at: "2026-08-01T09:00:00Z", item: "x", subject: "cvs", surface: "practical", correct: nil),
        ]
        #expect(AttemptStats.distinctItems(sameIdTwoSurfaces) == 2)
    }

    @Test func theWeakestComeFirst() {
        let weakest = AttemptStats.weakest(AttemptStats.bySubject(log), minMarked: 1)
        #expect(weakest.map(\.key) == ["resp", "cvs"])
    }

    /// One wrong answer is not a weakness. Ranking it as one sends a student to
    /// revise a topic on the strength of a single unlucky item.
    @Test func aSingleUnluckyAnswerIsNotAWeakness() {
        let weakest = AttemptStats.weakest(AttemptStats.bySubject(log))
        #expect(weakest.map(\.key) == ["cvs"])
    }

    /// A group with nothing marked can never be ranked as weak, however many
    /// attempts it holds.
    @Test func unmarkedGroupsAreNeverRankedWeak() {
        let stations = (0..<10).map {
            record("\($0)", at: "2026-08-01T09:00:00Z", item: "st\($0)", subject: "osce", surface: "practical", correct: nil)
        }
        #expect(AttemptStats.weakest(AttemptStats.bySubject(stations)).isEmpty)
    }

    @Test func theHourHistogramHasATwentyFourHourDay() {
        let hours = AttemptStats.hourHistogram(log)
        #expect(hours.count == 24)
        #expect(hours.reduce(0, +) == log.count)
    }

    @Test func anEmptyLogProducesNothingRatherThanZeroes() {
        #expect(AttemptStats.bySurface([]).isEmpty)
        #expect(AttemptStats.distinctItems([]) == 0)
        #expect(AttemptStats.firstAttemptSplit([]).first.accuracy == nil)
        #expect(AttemptStats.hourHistogram([]).allSatisfy { $0 == 0 })
    }
}
