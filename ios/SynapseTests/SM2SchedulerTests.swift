import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/data/srs.ts`, mirroring every case in `src/data/srs.test.ts`
/// so the Swift SM-2 port grades a card to the same next-schedule the website
/// does — the two must agree, or a card's due date drifts depending on which
/// device last answered it.
struct SM2SchedulerTests {
    private let sched = SM2Scheduler()
    private let at = ISO8601DateFormatter.synapse.date(from: "2026-08-20T09:00:00.000Z")!

    private func minutes(_ n: Double) -> String {
        ISO8601DateFormatter.synapse.string(from: at.addingTimeInterval(n * 60))
    }
    private func days(_ n: Double) -> String {
        ISO8601DateFormatter.synapse.string(from: at.addingTimeInterval(n * 86_400))
    }
    private func review(
        state: CardState = .review, step: Int = 0, interval: Int = 10, ease: Double = 2.5,
        lapses: Int = 0, reps: Int = 5, due: String? = nil
    ) -> CardSchedule {
        CardSchedule(
            state: state, step: step, interval: interval, ease: ease, lapses: lapses, reps: reps,
            due: due ?? ISO8601DateFormatter.synapse.string(from: at), stability: nil, difficulty: nil
        )
    }

    @Test func aNewCardStartsDueWithTheStartingEase() {
        let card = sched.newCard(now: at)
        #expect(card.state == .new)
        #expect(card.ease == 2.5)
        #expect(card.interval == 0)
        #expect(sched.isDue(card, now: at) == true)
    }

    @Test func goodOnANewCardEntersLearningAtTheSecondStep() {
        let card = sched.grade(sched.newCard(now: at), answer: .good, now: at)
        #expect(card.state == .learning)
        #expect(card.step == 1)
        #expect(card.due == minutes(10))
    }

    @Test func againOnANewCardStaysOnTheFirstStep() {
        let card = sched.grade(sched.newCard(now: at), answer: .again, now: at)
        #expect(card.state == .learning)
        #expect(card.step == 0)
        #expect(card.due == minutes(1))
    }

    @Test func easyOnANewCardGraduatesStraightToFourDays() {
        let card = sched.grade(sched.newCard(now: at), answer: .easy, now: at)
        #expect(card.state == .review)
        #expect(card.interval == 4)
        #expect(card.due == days(4))
    }

    @Test func hardOnALearningCardRepeatsTheStepItIsOn() {
        var learning = sched.newCard(now: at); learning.state = .learning; learning.step = 1
        let card = sched.grade(learning, answer: .hard, now: at)
        #expect(card.step == 1)
        #expect(card.due == minutes(10))
    }

    @Test func goodOnTheLastLearningStepGraduatesToOneDay() {
        var learning = sched.newCard(now: at); learning.state = .learning; learning.step = 1
        let card = sched.grade(learning, answer: .good, now: at)
        #expect(card.state == .review)
        #expect(card.interval == 1)
    }

    @Test func goodOnAReviewCardMultipliesTheIntervalByItsEase() {
        let card = sched.grade(review(interval: 10, ease: 2.5), answer: .good, now: at)
        #expect(card.interval == 25)
        #expect(card.ease == 2.5)
    }

    @Test func hardOnAReviewCardUsesTheHardMultiplierAndDropsEase() {
        let card = sched.grade(review(interval: 10, ease: 2.5), answer: .hard, now: at)
        #expect(card.interval == 12)
        #expect(card.ease == 2.35)
    }

    @Test func easyOnAReviewCardAddsTheEasyBonusAndRaisesEase() {
        let card = sched.grade(review(interval: 10, ease: 2.5), answer: .easy, now: at)
        #expect(card.interval == 33)
        #expect(card.ease == 2.65)
    }

    @Test func againOnAReviewCardLapsesItIntoRelearning() {
        let card = sched.grade(review(interval: 10, ease: 2.5), answer: .again, now: at)
        #expect(card.state == .relearning)
        #expect(card.lapses == 1)
        #expect(card.ease == 2.3)
        // New interval after a lapse is 0% of the old one, floored at the minimum.
        #expect(card.interval == 1)
        #expect(card.due == minutes(10))
    }

    @Test func easeNeverFallsBelowItsFloorHoweverOftenACardLapses() {
        var card = review(ease: 1.35)
        for _ in 0..<5 {
            var r = card; r.state = .review
            card = sched.grade(r, answer: .again, now: at)
        }
        #expect(card.ease == 1.3)
    }

    @Test func anIntervalNeverExceedsTheMaximum() {
        let card = sched.grade(review(interval: 30000, ease: 2.5), answer: .easy, now: at)
        #expect(card.interval == SrsConfig.anki.maximumInterval)
    }

    @Test func graduatingFromRelearningReturnsTheCardToReview() {
        var relearning = review(); relearning.state = .relearning; relearning.step = 0; relearning.interval = 1
        let card = sched.grade(relearning, answer: .good, now: at)
        #expect(card.state == .review)
    }

    @Test func aCardIsNotDueBeforeItsTime() {
        #expect(sched.isDue(review(due: days(1)), now: at) == false)
        #expect(sched.isDue(review(due: minutes(-1)), now: at) == true)
    }

    @Test func hardOnTheFirstLearningStepAveragesTheFirstTwoSteps() {
        var learning = sched.newCard(now: at); learning.state = .learning; learning.step = 0
        let card = sched.grade(learning, answer: .hard, now: at)
        #expect(card.step == 0)
        // (1 + 10) / 2 = 5.5 minutes.
        #expect(card.due == minutes(5.5))
    }

    @Test func withASingleLearningStepThereIsNothingToAverageSoHardRepeatsIt() {
        var config = SrsConfig.anki; config.learningSteps = [10]
        let single = SM2Scheduler(config: config)
        var learning = sched.newCard(now: at); learning.state = .learning; learning.step = 0
        #expect(single.grade(learning, answer: .hard, now: at).due == minutes(10))
    }

    @Test func aReviewCardGradedLateIsCreditedHalfTheOverdueDaysOnGood() {
        let late = review(interval: 10, ease: 2.5, due: days(-10))
        // (10 + 10/2) * 2.5 = 37.5, rounded to 38.
        #expect(sched.grade(late, answer: .good, now: at).interval == 38)
    }

    @Test func hardCreditsAQuarterOfTheOverdueDays() {
        let late = review(interval: 10, ease: 2.5, due: days(-10))
        // (10 + 10/4) * 1.2 = 15
        #expect(sched.grade(late, answer: .hard, now: at).interval == 15)
    }

    @Test func easyCreditsAllOfThem() {
        let late = review(interval: 10, ease: 2.5, due: days(-10))
        // (10 + 10) * 2.5 * 1.3 = 65
        #expect(sched.grade(late, answer: .easy, now: at).interval == 65)
    }

    @Test func aCardAnsweredEarlyIsCreditedNothing() {
        let early = review(interval: 10, ease: 2.5, due: days(5))
        #expect(sched.grade(early, answer: .good, now: at).interval == 25)
    }
}
