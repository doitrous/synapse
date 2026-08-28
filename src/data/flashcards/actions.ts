/**
 * Every way a card's standing changes, as pure transitions that also record why.
 *
 * A grade, a reset, a bury — each returns the next `CardMeta` and the
 * `ReviewEvent` that explains it, and never mutates the input, so an undo stack
 * or a React render holding the old meta keeps it. The event is returned without
 * an `id`: the storage hook stamps that, the same way `useRecordAttempt` stamps
 * `id`/`at`, so these stay pure and testable with an injected clock.
 *
 * Keeping the transition and its event in one function is deliberate. It is the
 * single place that guarantees the log and the state can never disagree — a
 * reset that forgot to write its event would leave the card looking new with no
 * record of why, and the stats read the log.
 */

import type { CardSchedule, Grade } from '../srs.ts'
import type { CardMeta, ReviewEvent, SchedulerType } from './model.ts'
import type { Scheduler } from './scheduler.ts'
import { localDay, localDayPlus, daysBetweenDays } from './time.ts'

export type NewReviewEvent = Omit<ReviewEvent, 'id'>

export interface Transition {
  meta: CardMeta
  event: NewReviewEvent
}

interface EventContext {
  cardId: string
  noteId: string
  deckId: string
  scheduler: SchedulerType
}

function baseEvent(
  ctx: EventContext,
  now: Date,
  kind: ReviewEvent['kind'],
  before: CardSchedule,
  after: CardSchedule,
  extra: Partial<NewReviewEvent> = {},
): NewReviewEvent {
  return {
    at: now.toISOString(),
    cardId: ctx.cardId,
    noteId: ctx.noteId,
    deckId: ctx.deckId,
    kind,
    grade: null,
    stateBefore: before.state,
    stateAfter: after.state,
    intervalBefore: before.interval,
    intervalAfter: after.interval,
    timeSpentMs: null,
    scheduler: ctx.scheduler,
    localDay: localDay(now),
    ...extra,
  }
}

/** Answer a card. Advances the schedule and folds the answer into the meta. */
export function gradeCard(
  meta: CardMeta,
  answer: Grade,
  ctx: EventContext,
  scheduler: Scheduler,
  now: Date,
  timeSpentMs: number | null = null,
): Transition {
  const before = meta.schedule
  const after = scheduler.grade(before, answer, now)
  const nowIso = now.toISOString()
  return {
    meta: {
      ...meta,
      schedule: after,
      reviewCount: meta.reviewCount + 1,
      resetSinceReview: false,
      firstReviewedAt: meta.firstReviewedAt ?? nowIso,
      lastReviewedAt: nowIso,
    },
    event: baseEvent(ctx, now, 'grade', before, after, { grade: answer, timeSpentMs }),
  }
}

/**
 * Return a card to New, keeping the fact that it was once reviewed. `reviewCount`
 * is left intact so the card-info history and the stats can still see the past;
 * `resetSinceReview` flips true so the deck stops counting it as Learned until
 * it is reviewed again.
 */
export function resetCard(meta: CardMeta, ctx: EventContext, scheduler: Scheduler, now: Date): Transition {
  const before = meta.schedule
  const after = scheduler.newCard(now)
  return {
    meta: { ...meta, schedule: after, resetSinceReview: true },
    event: baseEvent(ctx, now, 'reset', before, after),
  }
}

/**
 * Manually reschedule a card to a chosen local day. It becomes a review card due
 * that day, its interval set to the gap from today, floored at zero so a date in
 * the past just makes it due now. Ease and history are untouched.
 */
export function setDueDate(meta: CardMeta, day: string, ctx: EventContext, now: Date): Transition {
  const before = meta.schedule
  const interval = Math.max(0, daysBetweenDays(localDay(now), day))
  const dueDate = new Date(now)
  dueDate.setDate(dueDate.getDate() + interval)
  const after: CardSchedule = { ...before, state: 'review', step: 0, interval, due: dueDate.toISOString() }
  return {
    meta: { ...meta, schedule: after },
    event: baseEvent(ctx, now, 'set-due', before, after),
  }
}

export function suspendCard(meta: CardMeta, ctx: EventContext, now: Date): Transition {
  return {
    meta: { ...meta, suspended: true },
    event: baseEvent(ctx, now, 'suspend', meta.schedule, meta.schedule),
  }
}

export function unsuspendCard(meta: CardMeta, ctx: EventContext, now: Date): Transition {
  return {
    meta: { ...meta, suspended: false },
    event: baseEvent(ctx, now, 'unsuspend', meta.schedule, meta.schedule),
  }
}

/** Hide the card until the next local study day. */
export function buryCard(meta: CardMeta, ctx: EventContext, now: Date): Transition {
  return {
    meta: { ...meta, buriedUntil: localDayPlus(now, 1) },
    event: baseEvent(ctx, now, 'bury', meta.schedule, meta.schedule),
  }
}

export function unburyCard(meta: CardMeta, ctx: EventContext, now: Date): Transition {
  return {
    meta: { ...meta, buriedUntil: null },
    event: baseEvent(ctx, now, 'unbury', meta.schedule, meta.schedule),
  }
}
