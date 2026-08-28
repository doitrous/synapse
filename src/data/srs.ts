/**
 * When a flashcard should come back.
 *
 * Every number in ANKI_DEFAULTS is Anki 25.02.5's own default preset, and the
 * algorithm is the SM-2 scheduler those defaults belong to. FSRS ships in that
 * version but is opt-in, so a student who has only ever pressed "Add" is on
 * SM-2 — and matching what they already know is the point.
 *
 * FSRS is deliberately not implemented. It fits its parameters against a
 * Lateness is credited the way Anki credits it — see `gradeReview`. It is not
 * an embellishment to simplify away: without it, a student returning from a
 * week off has every interval shortened for having remembered longer.
 *
 * review history, and on day one there is none; it would be guessing with more
 * arithmetic. It becomes worth revisiting once students have logged reviews.
 *
 * `now` is a parameter rather than a call to Date.now() inside. A scheduler
 * that reads its own clock can only be asserted against itself, and a card
 * that comes back on the wrong day does not throw — it just quietly reappears
 * weeks late. Passing the clock in is what makes the intervals testable.
 */

export type Grade = 'again' | 'hard' | 'good' | 'easy'

export type CardState = 'new' | 'learning' | 'review' | 'relearning'

export interface CardSchedule {
  state: CardState
  /** Index into the learning or relearning step list; unused while in review. */
  step: number
  /** Whole days. Zero until the card graduates — the step states count minutes. */
  interval: number
  /** SM-2 ease factor, where 2.5 means "multiply the interval by two and a half". */
  ease: number
  lapses: number
  reps: number
  /** ISO 8601, so a schedule survives a round trip through storage unchanged. */
  due: string
  /** FSRS memory-stability in days (days for retrievability to fall to 0.9). Absent on SM-2 cards. */
  stability?: number
  /** FSRS difficulty in [1,10]. Absent on SM-2 cards. */
  difficulty?: number
}

export interface SrsConfig {
  newPerDay: number
  maxReviewsPerDay: number
  /** Minutes. */
  learningSteps: number[]
  /** Minutes. */
  relearningSteps: number[]
  /** Days. */
  graduatingInterval: number
  /** Days. */
  easyInterval: number
  startingEase: number
  easyBonus: number
  hardMultiplier: number
  /** Percent of the old interval a lapse leaves behind. */
  lapseNewIntervalPercent: number
  /** Days. */
  minimumInterval: number
  /** Days. */
  maximumInterval: number
  leechThreshold: number
}

export const ANKI_DEFAULTS: SrsConfig = {
  newPerDay: 20,
  maxReviewsPerDay: 200,
  learningSteps: [1, 10],
  relearningSteps: [10],
  graduatingInterval: 1,
  easyInterval: 4,
  startingEase: 2.5,
  easyBonus: 1.3,
  hardMultiplier: 1.2,
  lapseNewIntervalPercent: 0,
  minimumInterval: 1,
  maximumInterval: 36500,
  leechThreshold: 8,
}

/**
 * Anki's own floor. Without it a card the student keeps failing drives its own
 * ease towards zero and then returns every single day forever, which is how a
 * deck becomes unusable rather than merely hard.
 */
const MINIMUM_EASE = 1.3

const EASE_DELTA_HARD = -0.15
const EASE_DELTA_EASY = 0.15
const EASE_DELTA_LAPSE = -0.2

const MINUTE_MS = 60_000
const DAY_MS = 86_400_000

const atMinutes = (now: Date, minutes: number) => new Date(now.getTime() + minutes * MINUTE_MS).toISOString()

const atDays = (now: Date, days: number) => new Date(now.getTime() + days * DAY_MS).toISOString()

const clampEase = (ease: number) => Math.max(MINIMUM_EASE, ease)

/** Cards are due on a day, not at an instant, so every interval lands on a whole one. */
const clampInterval = (days: number, config: SrsConfig) => Math.min(config.maximumInterval, Math.round(days))

export function newCard(now: Date, config: SrsConfig = ANKI_DEFAULTS): CardSchedule {
  return {
    state: 'new',
    step: 0,
    interval: 0,
    ease: config.startingEase,
    lapses: 0,
    reps: 0,
    due: now.toISOString(),
  }
}

export function isDue(card: CardSchedule, now: Date): boolean {
  return Date.parse(card.due) <= now.getTime()
}

/**
 * Answer a card, returning its next schedule. The input is never mutated: a
 * caller holding the old schedule (a React render, an undo stack) keeps it.
 */
export function grade(card: CardSchedule, answer: Grade, now: Date, config: SrsConfig = ANKI_DEFAULTS): CardSchedule {
  const next: CardSchedule = { ...card, reps: card.reps + 1 }
  return card.state === 'review'
    ? gradeReview(next, answer, now, config)
    : gradeSteps(next, answer, now, config)
}

/** New, learning and relearning cards are all scheduled in minutes off a step list. */
function gradeSteps(card: CardSchedule, answer: Grade, now: Date, config: SrsConfig): CardSchedule {
  const relearning = card.state === 'relearning'
  const steps = relearning ? config.relearningSteps : config.learningSteps
  const stepState: CardState = relearning ? 'relearning' : 'learning'

  if (answer === 'easy') return graduate(card, 'easy', now, config)

  // Hard holds the card where it is: it was not forgotten, so it does not go
  // back to the start, and it was not recalled cleanly, so it does not advance.
  const target = answer === 'again' ? 0 : answer === 'hard' ? card.step : card.step + 1

  if (target >= steps.length) return graduate(card, answer, now, config)

  return { ...card, state: stepState, step: target, due: atMinutes(now, stepDelay(steps, answer, target)) }
}

/**
 * How long a step waits.
 *
 * Hard on the *first* step is the one place this is not simply "that step".
 * Anki averages the first two steps there — 5.5 minutes for `1m 10m` — because
 * repeating a one-minute step would show the card again almost immediately,
 * which is not what "hard" is asking for. From the second step on, and with a
 * preset that has only one step to work with, it repeats the step it is on.
 */
function stepDelay(steps: number[], answer: Grade, target: number): number {
  const current = steps[target] ?? 0
  if (answer !== 'hard' || target !== 0) return current
  const next = steps[1]
  return next === undefined ? current : (current + next) / 2
}

function graduate(card: CardSchedule, answer: Grade, now: Date, config: SrsConfig): CardSchedule {
  // A relearning card already has the interval its lapse left it with; earning
  // the full graduating interval back for one correct answer would undo the lapse.
  const interval = card.state === 'relearning'
    ? clampInterval(card.interval, config)
    : clampInterval(answer === 'easy' ? config.easyInterval : config.graduatingInterval, config)

  return { ...card, state: 'review', step: 0, interval, due: atDays(now, interval) }
}

function gradeReview(card: CardSchedule, answer: Grade, now: Date, config: SrsConfig): CardSchedule {
  if (answer === 'again') return lapse(card, now, config)

  // The days a card sat overdue are partly credited before multiplying, the
  // way Anki does it. Without this, coming back from a week away shortens every
  // interval — the student demonstrably remembered the card for longer than it
  // was scheduled for, and shrinking the interval punishes them for the gap.
  // A card answered early gets no credit: `delay` floors at zero.
  const delay = Math.max(0, Math.floor((now.getTime() - new Date(card.due).getTime()) / DAY_MS))

  const interval = clampInterval(
    answer === 'hard' ? (card.interval + delay / 4) * config.hardMultiplier
      : answer === 'good' ? (card.interval + delay / 2) * card.ease
        : (card.interval + delay) * card.ease * config.easyBonus,
    config,
  )

  const ease = clampEase(card.ease + (answer === 'hard' ? EASE_DELTA_HARD : answer === 'easy' ? EASE_DELTA_EASY : 0))

  return { ...card, state: 'review', step: 0, interval, ease, due: atDays(now, interval) }
}

function lapse(card: CardSchedule, now: Date, config: SrsConfig): CardSchedule {
  const interval = Math.min(
    config.maximumInterval,
    Math.max(config.minimumInterval, Math.round(card.interval * config.lapseNewIntervalPercent / 100)),
  )
  const lapsed: CardSchedule = {
    ...card,
    interval,
    ease: clampEase(card.ease + EASE_DELTA_LAPSE),
    lapses: card.lapses + 1,
  }

  // A preset with no relearning steps has nowhere to send the card, so it goes
  // straight back into review on its shortened interval.
  const first = config.relearningSteps[0]
  if (first === undefined) return { ...lapsed, state: 'review', step: 0, due: atDays(now, interval) }

  return { ...lapsed, state: 'relearning', step: 0, due: atMinutes(now, first) }
}
