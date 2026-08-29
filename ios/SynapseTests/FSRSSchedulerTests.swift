import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/data/flashcards/fsrs.ts`, mirroring every case in
/// `src/data/flashcards/fsrs.test.ts`. FSRS state (stability/difficulty) is the
/// synced payload, so the Swift port must reproduce the web's floating-point
/// results, or a card's due dates drift between the phone and the website.
struct FSRSSchedulerTests {
    private let w = FSRSScheduler.defaultWeights
    private let now = ISO8601DateFormatter.synapse.date(from: "2026-01-01T00:00:00.000Z")!

    private func approx(_ a: Double, _ b: Double, _ eps: Double = 1e-6, _ note: Comment? = nil) {
        #expect(abs(a - b) < eps, note ?? "expected \(a) within \(eps) of \(b)")
    }

    // MARK: retrievability

    @Test func retrievabilityAtZeroElapsedIsOne() {
        approx(FSRSScheduler.retrievability(0, 5), 1)
        approx(FSRSScheduler.retrievability(0, 0.4), 1)
        approx(FSRSScheduler.retrievability(0, 100), 1)
    }

    @Test func retrievabilityAtStabilityIsNinePercentByDefinition() {
        for s in [2.0, 3.173, 100.0] {
            approx(FSRSScheduler.retrievability(s, s), 0.9, 1e-9)
        }
    }

    @Test func retrievabilityStrictlyDecreasesWithElapsedDays() {
        let s = 10.0
        let days = [0.0, 1, 2, 5, 10, 30, 100]
        let values = days.map { FSRSScheduler.retrievability($0, s) }
        for i in 1..<values.count {
            #expect(values[i] < values[i - 1])
        }
    }

    // MARK: intervalFromStability

    @Test func intervalFromStabilityRoundTripsAtDefaultRetention() {
        for s in [1.0, 3.173, 15.69105, 50.0] {
            approx(FSRSScheduler.intervalFromStability(s, 0.9), s, 1e-9)
        }
    }

    // MARK: initial values

    @Test func initialStabilityMapsRatingToWeights() {
        approx(FSRSScheduler.initialStability(1), 0.40255)
        approx(FSRSScheduler.initialStability(2), 1.18385)
        approx(FSRSScheduler.initialStability(3), 3.173)
        approx(FSRSScheduler.initialStability(4), 15.69105)
    }

    @Test func initialDifficultyMatchesTheD0FormulaAndStaysInRange() {
        approx(FSRSScheduler.initialDifficulty(3), 5.2827, 1e-3)
        approx(FSRSScheduler.initialDifficulty(1), 7.1949, 1e-6) // w4 - e^0 + 1 = w4
        approx(FSRSScheduler.initialDifficulty(4), 3.225, 1e-3)
        for g in 1...4 {
            let d = FSRSScheduler.initialDifficulty(g)
            #expect(d >= 1 && d <= 10)
        }
    }

    // MARK: nextDifficulty

    @Test func nextDifficultyStaysInRangeFromExtremes() {
        for d0 in [1.0, 3, 5.28, 8, 10] {
            for g in 1...4 {
                let d = FSRSScheduler.nextDifficulty(d0, g)
                #expect(d >= 1 && d <= 10)
            }
        }
    }

    @Test func nextDifficultyAgainRaisesEasyLowers() {
        let d0 = 5.0
        let dAgain = FSRSScheduler.nextDifficulty(d0, 1)
        let dEasy = FSRSScheduler.nextDifficulty(d0, 4)
        #expect(dAgain > d0)
        #expect(dEasy < d0)
        #expect(dAgain > dEasy)
    }

    // MARK: scheduler — new card

    @Test func gradeNewCardGood() {
        let scheduler = FSRSScheduler()
        let card = scheduler.newCard(now: now)
        let next = scheduler.grade(card, answer: .good, now: now)

        approx(next.stability ?? 0, 3.173)
        approx(next.difficulty ?? 0, 5.2827, 1e-3)
        #expect(next.interval == 3) // round(3.173)
        #expect(next.state == .review)
        #expect(next.due == ISO8601DateFormatter.synapse.string(from: now.addingTimeInterval(3 * 86_400)))
        #expect(next.reps == 1)
        #expect(next.lapses == 0)
        // grade() must not mutate its input.
        #expect(card.stability == nil)
        #expect(card.reps == 0)
    }

    @Test func gradeNewCardEasy() {
        let scheduler = FSRSScheduler()
        let next = scheduler.grade(scheduler.newCard(now: now), answer: .easy, now: now)
        approx(next.stability ?? 0, 15.69105)
        #expect(next.interval == 16) // round(15.69105)
        #expect(next.due == ISO8601DateFormatter.synapse.string(from: now.addingTimeInterval(16 * 86_400)))
    }

    @Test func gradeNewCardAgain() {
        let scheduler = FSRSScheduler()
        let next = scheduler.grade(scheduler.newCard(now: now), answer: .again, now: now)
        approx(next.stability ?? 0, 0.40255)
        #expect(next.interval == 1) // round(0.40255) = 0, clamped up to the 1-day floor
        #expect(next.lapses == 0) // failing a NEW card is not a lapse
        #expect(next.state == .review)
    }

    // MARK: scheduler — review card

    /// Grade a fresh card 'good' once, producing a review-state card with real
    /// stability/difficulty.
    private func firstReviewCard() -> (FSRSScheduler, CardSchedule) {
        let scheduler = FSRSScheduler()
        let card = scheduler.newCard(now: now)
        return (scheduler, scheduler.grade(card, answer: .good, now: now))
    }

    @Test func gradingAReviewCardGoodGrowsStability() {
        let (scheduler, reviewCard) = firstReviewCard()
        let later = now.addingTimeInterval(Double(reviewCard.interval) * 86_400)
        let next = scheduler.grade(reviewCard, answer: .good, now: later)
        #expect((next.stability ?? 0) > (reviewCard.stability ?? 0))
        #expect(next.reps == 2)
    }

    @Test func easyGrowsMoreThanGoodMoreThanHard() {
        let (scheduler, reviewCard) = firstReviewCard()
        let later = now.addingTimeInterval(Double(reviewCard.interval) * 86_400)
        let hard = scheduler.grade(reviewCard, answer: .hard, now: later)
        let good = scheduler.grade(reviewCard, answer: .good, now: later)
        let easy = scheduler.grade(reviewCard, answer: .easy, now: later)
        #expect((easy.stability ?? 0) > (good.stability ?? 0))
        #expect((good.stability ?? 0) > (hard.stability ?? 0))
    }

    @Test func againShrinksStabilityBelowRecallAndIncrementsLapses() {
        let (scheduler, reviewCard) = firstReviewCard()
        let later = now.addingTimeInterval(Double(reviewCard.interval) * 86_400)
        let hard = scheduler.grade(reviewCard, answer: .hard, now: later)
        let again = scheduler.grade(reviewCard, answer: .again, now: later)
        #expect((again.stability ?? 0) < (hard.stability ?? 0))
        #expect(again.lapses == reviewCard.lapses + 1)
        #expect(reviewCard.lapses == 0)
    }

    @Test func stabilityHelpersAgreeWithTheScheduler() {
        let (_, reviewCard) = firstReviewCard()
        let elapsedDays = Double(reviewCard.interval)
        let r = FSRSScheduler.retrievability(elapsedDays, reviewCard.stability ?? 0)
        let expectedGood = FSRSScheduler.nextStabilityOnRecall(
            difficulty: reviewCard.difficulty ?? 0, stability: reviewCard.stability ?? 0, retrievabilityAtReview: r, rating: 3
        )
        let expectedAgain = FSRSScheduler.nextStabilityOnForget(
            difficulty: reviewCard.difficulty ?? 0, stability: reviewCard.stability ?? 0, retrievabilityAtReview: r
        )
        let scheduler = FSRSScheduler()
        let later = now.addingTimeInterval(elapsedDays * 86_400)
        let good = scheduler.grade(reviewCard, answer: .good, now: later)
        let again = scheduler.grade(reviewCard, answer: .again, now: later)
        approx(good.stability ?? 0, expectedGood, 1e-9)
        approx(again.stability ?? 0, expectedAgain, 1e-9)
    }

    // MARK: preview

    @Test func previewReturnsTheSameFourSchedulesAsGrade() {
        let (scheduler, reviewCard) = firstReviewCard()
        let later = now.addingTimeInterval(Double(reviewCard.interval) * 86_400)
        let preview = scheduler.preview(reviewCard, now: later)
        for answer in Grade.allCases {
            let direct = scheduler.grade(reviewCard, answer: answer, now: later)
            #expect(preview[answer] == direct)
        }
    }

    // MARK: FSRS never leaks onto an SM-2 card

    @Test func aFreshSM2CardHasNoFSRSState() {
        let card = SM2Scheduler().newCard(now: now)
        #expect(card.stability == nil)
        #expect(card.difficulty == nil)
    }
}
