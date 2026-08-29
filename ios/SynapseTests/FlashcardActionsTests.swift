import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/data/flashcards/actions.ts`, mirroring `actions.test.ts`.
/// (`localDay`-based cases assume a non-far-west local timezone, as the web
/// fixtures do.)
struct FlashcardActionsTests {
    private let now = ISO8601DateFormatter.synapse.date(from: "2026-08-20T09:00:00.000Z")!
    private let scheduler = SM2Scheduler()
    private let ctx = CardEventContext(cardId: "n1::card", noteId: "n1", deckId: "d1", scheduler: .sm2)
    private func iso(_ d: Date) -> String { ISO8601DateFormatter.synapse.string(from: d) }
    private func fresh() -> CardMeta { newCardMeta(scheduler.newCard(now: now)) }

    @Test func gradingAdvancesCountsAndLogsAGradeEvent() {
        let t = gradeCard(fresh(), answer: .good, ctx: ctx, scheduler: scheduler, now: now, timeSpentMs: 4200)
        #expect(t.meta.reviewCount == 1)
        #expect(t.meta.resetSinceReview == false)
        #expect(t.meta.firstReviewedAt == iso(now))
        #expect(t.meta.lastReviewedAt == iso(now))
        #expect(t.event.kind == .grade)
        #expect(t.event.grade == .good)
        #expect(t.event.timeSpentMs == 4200)
        #expect(t.event.intervalBefore == 0)
        #expect(t.event.localDay == "2026-08-20")
    }

    @Test func theTransitionNeverMutatesTheInputMeta() {
        let before = fresh()
        _ = gradeCard(before, answer: .again, ctx: ctx, scheduler: scheduler, now: now)
        #expect(before.reviewCount == 0)
    }

    @Test func resetReturnsToNewKeepsReviewCountFlipsResetSinceReview() {
        let once = gradeCard(fresh(), answer: .easy, ctx: ctx, scheduler: scheduler, now: now).meta
        let studied = gradeCard(once, answer: .good, ctx: ctx, scheduler: scheduler, now: now).meta
        #expect(studied.reviewCount == 2)
        let t = resetCard(studied, ctx: ctx, scheduler: scheduler, now: now)
        #expect(t.meta.schedule.state == .new)
        #expect(t.meta.reviewCount == 2) // history is kept
        #expect(t.meta.resetSinceReview == true)
        #expect(t.event.kind == .reset)
    }

    @Test func reviewingAfterAResetMakesTheCardLearnedAgain() {
        let graded = gradeCard(fresh(), answer: .good, ctx: ctx, scheduler: scheduler, now: now).meta
        let reset = resetCard(graded, ctx: ctx, scheduler: scheduler, now: now).meta
        #expect(reset.resetSinceReview == true)
        let relearned = gradeCard(reset, answer: .good, ctx: ctx, scheduler: scheduler, now: now).meta
        #expect(relearned.resetSinceReview == false)
    }

    @Test func setDueDateMakesTheCardAReviewDueOnThatDay() {
        let t = setDueDate(fresh(), day: "2026-08-30", ctx: ctx, now: now)
        #expect(t.meta.schedule.state == .review)
        #expect(t.meta.schedule.interval == 10)
        #expect(t.event.kind == .setDue)
    }

    @Test func setDueDateInThePastFloorsTheIntervalAtZero() {
        let t = setDueDate(fresh(), day: "2026-08-10", ctx: ctx, now: now)
        #expect(t.meta.schedule.interval == 0)
    }

    @Test func buryHidesUntilTheNextLocalDayAndUnburyClears() {
        let t = buryCard(fresh(), ctx: ctx, now: now)
        #expect(t.meta.buriedUntil == "2026-08-21")
        #expect(isBuried(t.meta, now: now) == true)
        #expect(t.event.kind == .bury)
    }

    @Test func suspendAndUnsuspendToggleAndLogBoth() {
        let s = suspendCard(fresh(), ctx: ctx, now: now)
        #expect(s.meta.suspended == true)
        #expect(s.event.kind == .suspend)
        let u = unsuspendCard(s.meta, ctx: ctx, now: now)
        #expect(u.meta.suspended == false)
        #expect(u.event.kind == .unsuspend)
    }
}
