import Foundation

/// Every way a card's standing changes, as pure transitions that also record
/// why. A port of `src/data/flashcards/actions.ts`.
///
/// A grade, a reset, a bury — each returns the next `CardMeta` and the review
/// event that explains it, and never mutates the input. The event is returned
/// WITHOUT an id (`NewReviewEvent`): the store stamps that, so these stay pure
/// and testable with an injected clock. Keeping the transition and its event in
/// one function is the single place that guarantees the log and the state can
/// never disagree.

/// Identity carried into every event a transition emits.
struct CardEventContext: Sendable {
    var cardId: String
    var noteId: String
    var deckId: String
    var scheduler: SchedulerType
}

/// A `ReviewEvent` before the store has stamped its `id`.
struct NewReviewEvent: Equatable, Sendable {
    var at: String
    var cardId: String
    var noteId: String
    var deckId: String
    var kind: ReviewEventKind
    var grade: Grade?
    var stateBefore: CardState
    var stateAfter: CardState
    var intervalBefore: Int
    var intervalAfter: Int
    var timeSpentMs: Int?
    var scheduler: SchedulerType
    var localDay: String

    /// Stamp an id, producing the storable `ReviewEvent`.
    func withId(_ id: String) -> ReviewEvent {
        ReviewEvent(
            id: id, at: at, cardId: cardId, noteId: noteId, deckId: deckId, kind: kind, grade: grade,
            stateBefore: stateBefore, stateAfter: stateAfter, intervalBefore: intervalBefore,
            intervalAfter: intervalAfter, timeSpentMs: timeSpentMs, scheduler: scheduler, localDay: localDay
        )
    }
}

/// The next standing plus the event explaining it.
struct CardTransition: Sendable {
    var meta: CardMeta
    var event: NewReviewEvent
}

private func baseEvent(
    _ ctx: CardEventContext, _ now: Date, _ kind: ReviewEventKind,
    before: CardSchedule, after: CardSchedule, grade: Grade? = nil, timeSpentMs: Int? = nil
) -> NewReviewEvent {
    NewReviewEvent(
        at: ISO8601DateFormatter.synapse.string(from: now),
        cardId: ctx.cardId, noteId: ctx.noteId, deckId: ctx.deckId, kind: kind, grade: grade,
        stateBefore: before.state, stateAfter: after.state,
        intervalBefore: before.interval, intervalAfter: after.interval,
        timeSpentMs: timeSpentMs, scheduler: ctx.scheduler, localDay: LocalDay.of(now)
    )
}

/// Answer a card. Advances the schedule and folds the answer into the meta.
func gradeCard(
    _ meta: CardMeta, answer: Grade, ctx: CardEventContext, scheduler: Scheduler, now: Date, timeSpentMs: Int? = nil
) -> CardTransition {
    let before = meta.schedule
    let after = scheduler.grade(before, answer: answer, now: now)
    let nowIso = ISO8601DateFormatter.synapse.string(from: now)
    var m = meta
    m.schedule = after
    m.reviewCount = meta.reviewCount + 1
    m.resetSinceReview = false
    m.firstReviewedAt = meta.firstReviewedAt ?? nowIso
    m.lastReviewedAt = nowIso
    return CardTransition(meta: m, event: baseEvent(ctx, now, .grade, before: before, after: after, grade: answer, timeSpentMs: timeSpentMs))
}

/// Return a card to New, keeping the fact that it was once reviewed.
func resetCard(_ meta: CardMeta, ctx: CardEventContext, scheduler: Scheduler, now: Date) -> CardTransition {
    let before = meta.schedule
    let after = scheduler.newCard(now: now)
    var m = meta
    m.schedule = after
    m.resetSinceReview = true
    return CardTransition(meta: m, event: baseEvent(ctx, now, .reset, before: before, after: after))
}

/// Manually reschedule a card to a chosen local day. It becomes a review card
/// due that day, its interval the gap from today floored at zero.
func setDueDate(_ meta: CardMeta, day: String, ctx: CardEventContext, now: Date) -> CardTransition {
    let before = meta.schedule
    let interval = max(0, LocalDay.daysBetween(from: LocalDay.of(now), to: day))
    let dueDate = Calendar.current.date(byAdding: .day, value: interval, to: now) ?? now
    var after = before
    after.state = .review
    after.step = 0
    after.interval = interval
    after.due = ISO8601DateFormatter.synapse.string(from: dueDate)
    var m = meta
    m.schedule = after
    return CardTransition(meta: m, event: baseEvent(ctx, now, .setDue, before: before, after: after))
}

func suspendCard(_ meta: CardMeta, ctx: CardEventContext, now: Date) -> CardTransition {
    var m = meta
    m.suspended = true
    return CardTransition(meta: m, event: baseEvent(ctx, now, .suspend, before: meta.schedule, after: meta.schedule))
}

func unsuspendCard(_ meta: CardMeta, ctx: CardEventContext, now: Date) -> CardTransition {
    var m = meta
    m.suspended = false
    return CardTransition(meta: m, event: baseEvent(ctx, now, .unsuspend, before: meta.schedule, after: meta.schedule))
}

/// Hide the card until the next local study day.
func buryCard(_ meta: CardMeta, ctx: CardEventContext, now: Date) -> CardTransition {
    var m = meta
    m.buriedUntil = LocalDay.plus(1, from: now)
    return CardTransition(meta: m, event: baseEvent(ctx, now, .bury, before: meta.schedule, after: meta.schedule))
}

func unburyCard(_ meta: CardMeta, ctx: CardEventContext, now: Date) -> CardTransition {
    var m = meta
    m.buriedUntil = nil
    return CardTransition(meta: m, event: baseEvent(ctx, now, .unbury, before: meta.schedule, after: meta.schedule))
}
