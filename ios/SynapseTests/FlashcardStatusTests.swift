import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/data/flashcards/status.ts`, mirroring `status.test.ts`.
/// The day-boundary cases assume a non-far-west local timezone, exactly as the
/// web fixtures do (`09:00Z` reads as the same calendar day).
struct FlashcardStatusTests {
    private let now = ISO8601DateFormatter.synapse.date(from: "2026-08-20T09:00:00.000Z")!
    private func iso(_ d: Date) -> String { ISO8601DateFormatter.synapse.string(from: d) }

    private func sched(state: CardState = .new, step: Int = 0, interval: Int = 0, ease: Double = 2.5,
                       lapses: Int = 0, reps: Int = 0, due: String? = nil) -> CardSchedule {
        CardSchedule(state: state, step: step, interval: interval, ease: ease, lapses: lapses, reps: reps,
                     due: due ?? iso(now), stability: nil, difficulty: nil)
    }
    private func meta(_ schedule: CardSchedule? = nil, reviewCount: Int = 0, resetSinceReview: Bool = false,
                      suspended: Bool = false, buriedUntil: String? = nil) -> CardMeta {
        var m = newCardMeta(schedule ?? sched())
        m.reviewCount = reviewCount
        m.resetSinceReview = resetSinceReview
        m.suspended = suspended
        m.buriedUntil = buriedUntil
        return m
    }

    @Test func theMatureBoundaryIs21Days() { #expect(MATURE_THRESHOLD_DAYS == 21) }

    @Test func aReviewCardIsYoungAt20AndMatureAt21() {
        #expect(isYoung(meta(sched(state: .review, interval: 20))) == true)
        #expect(isMature(meta(sched(state: .review, interval: 20))) == false)
        #expect(isYoung(meta(sched(state: .review, interval: 21))) == false)
        #expect(isMature(meta(sched(state: .review, interval: 21))) == true)
    }

    @Test func unseenIsExactlyNeverAnswered() {
        #expect(isUnseen(meta(reviewCount: 0)) == true)
        #expect(isUnseen(meta(reviewCount: 1)) == false)
    }

    @Test func learnedNeedsAReviewAndNoResetSince() {
        #expect(isLearned(meta(reviewCount: 0)) == false)
        #expect(isLearned(meta(reviewCount: 3, resetSinceReview: false)) == true)
        #expect(isLearned(meta(reviewCount: 3, resetSinceReview: true)) == false)
    }

    @Test func aSuspendedReviewCardIsNeverCountedReviewDue() {
        let due = sched(state: .review, interval: 5, due: iso(now.addingTimeInterval(-1)))
        #expect(isReviewDue(meta(due), now: now) == true)
        #expect(isReviewDue(meta(due, suspended: true), now: now) == false)
    }

    @Test func buryRollsOverOnTheLocalDay() {
        let buried = meta(buriedUntil: "2026-08-21")
        #expect(isBuried(buried, now: now) == true) // 08-20 < 08-21
        let next = ISO8601DateFormatter.synapse.date(from: "2026-08-21T00:05:00.000Z")!
        #expect(isBuried(buried, now: next) == false) // 08-21 is not < 08-21
    }

    @Test func aBuriedOrSuspendedCardIsNotStudyEligible() {
        let dueReview = sched(state: .review, interval: 5, due: iso(now.addingTimeInterval(-1)))
        #expect(isStudyEligible(meta(dueReview), now: now) == true)
        #expect(isStudyEligible(meta(dueReview, suspended: true), now: now) == false)
        #expect(isStudyEligible(meta(dueReview, buriedUntil: "2026-08-25"), now: now) == false)
    }

    @Test func deckCountsUseTotalAndLetMeasuresOverlap() {
        let metas = [
            meta(sched(), reviewCount: 0),
            meta(sched(state: .review, interval: 30, due: "2026-09-15T09:00:00.000Z"), reviewCount: 5),
            meta(sched(state: .review, interval: 5, due: iso(now.addingTimeInterval(-1))), reviewCount: 2),
            meta(sched(state: .learning, step: 0), reviewCount: 1, suspended: true),
        ]
        let c = deckCounts(metas, now: now)
        #expect(c.total == 4)
        #expect(c.new == 1)
        #expect(c.unseen == 1)
        #expect(c.mature == 1)
        #expect(c.young == 1)
        #expect(c.reviewDue == 1)
        #expect(c.learned == 3)
        #expect(c.learning == 1)
        #expect(c.suspended == 1)
        #expect(c.new + c.mature + c.young + c.learning + c.learned > c.total)
    }

    @Test func exclusiveStatusPartitionsTheDeckExactlyOnce() {
        let metas = [
            meta(sched()),
            meta(sched(state: .learning)),
            meta(sched(state: .relearning)),
            meta(sched(state: .review, interval: 10)),
            meta(sched(state: .review, interval: 40)),
            meta(sched(state: .review, interval: 40), suspended: true),
            meta(sched(state: .review, interval: 40), buriedUntil: "2026-09-01"),
        ]
        let c = exclusiveCounts(metas, now: now)
        let sum = c.new + c.learning + c.relearning + c.young + c.mature + c.suspended + c.buried
        #expect(sum == metas.count)
        #expect(c.new == 1)
        #expect(c.suspended == 1)
        #expect(c.buried == 1)
    }

    @Test func suspendedAndBuriedWinOverSchedulingState() {
        let m = meta(sched(state: .review, interval: 40), suspended: true)
        #expect(exclusiveStatus(m, now: now) == .suspended)
    }

    @Test func statusFlagsAgreesWithThePredicates() {
        let m = meta(sched(state: .review, interval: 25), reviewCount: 4)
        let f = statusFlags(m, now: now)
        #expect(f.mature == true)
        #expect(f.learned == true)
        #expect(f.young == false)
        #expect(f.unseen == false)
    }
}
