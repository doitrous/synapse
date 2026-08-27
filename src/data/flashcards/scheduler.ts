/**
 * One interface over "when does this card come back", so the rest of the app
 * never names a scheduling algorithm.
 *
 * The repository ships a legacy SM-2 scheduler (`srs.ts`) and it stays the
 * default: it is what every existing deck was built on, and matching what a
 * student already knows is the whole point. FSRS is a second implementation
 * behind this same interface — opt-in per deck — so the study screen, the queue
 * and the stats read `scheduler.grade(...)` and `scheduler.preview(...)` without
 * caring which one answered. A scheduler still takes `now` as a parameter for
 * the reason `srs.ts` does: a scheduler that reads its own clock can only be
 * asserted against itself.
 *
 * FSRS analytics (stability, difficulty, retrievability) are deliberately NOT
 * faked from SM-2's ease and interval — those numbers mean nothing without a
 * fitted model, and inventing them would be worse than the honest empty state
 * the stats screen shows instead. FSRS lands as a real implementation of
 * `FsrsScheduler` or it does not land at all.
 */

import {
  ANKI_DEFAULTS,
  grade as sm2Grade,
  newCard as sm2NewCard,
  type CardSchedule,
  type Grade,
  type SrsConfig,
} from '../srs.ts'
import type { SchedulerType } from './model.ts'

/** The four intervals the answer buttons would produce, previewed before commit. */
export type GradePreview = Record<Grade, CardSchedule>

export interface Scheduler {
  readonly type: SchedulerType
  /** A fresh, never-studied card's schedule. */
  newCard(now: Date): CardSchedule
  /** Answer a card; never mutates the input (an undo stack keeps the old one). */
  grade(schedule: CardSchedule, answer: Grade, now: Date): CardSchedule
  /** What each of the four answers would do, for the button labels. */
  preview(schedule: CardSchedule, now: Date): GradePreview
}

const GRADES: readonly Grade[] = ['again', 'hard', 'good', 'easy']

/** The legacy SM-2 scheduler, wrapped to the shared interface. */
export function sm2Scheduler(config: SrsConfig = ANKI_DEFAULTS): Scheduler {
  return {
    type: 'sm2',
    newCard: (now) => sm2NewCard(now, config),
    grade: (schedule, answer, now) => sm2Grade(schedule, answer, now, config),
    preview: (schedule, now) => previewFrom((s, a, n) => sm2Grade(s, a, n, config), schedule, now),
  }
}

/** Build a full four-answer preview from any grade function. */
export function previewFrom(
  gradeFn: (schedule: CardSchedule, answer: Grade, now: Date) => CardSchedule,
  schedule: CardSchedule,
  now: Date,
): GradePreview {
  return {
    again: gradeFn(schedule, 'again', now),
    hard: gradeFn(schedule, 'hard', now),
    good: gradeFn(schedule, 'good', now),
    easy: gradeFn(schedule, 'easy', now),
  } as GradePreview
}

export { GRADES }
