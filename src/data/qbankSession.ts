import type { Question } from './qbank.ts'
import type { SessionManifests } from './qbankCollections.ts'

/**
 * The decisions a sitting turns on.
 *
 * The runner is one slot of state serving three different things — a live
 * sitting, a past test opened read-only, and a collection browsed the same way
 * — and every rule below exists because that slot was mistaken for the sitting
 * the student had paused. Each one cost real work: answers overwritten,
 * manifests miscounted, a handed-in test still offering to be resumed. They
 * live here, out of the component, so they can be stated once and held to it.
 */

/**
 * The parts of a stored sitting these rules read.
 *
 * Structurally satisfied by the runner's `LiveSession`, which carries much
 * more; nothing here needs the answers or the clock.
 */
export interface StoredSitting {
  questionIds: string[]
  sessionId: string
  submitted: boolean
}

/** Where the runner is: the hub, a question, or the paper. */
export type Phase = 'setup' | 'running' | 'results'

/**
 * The questions of a stored sitting, or `null` if it can no longer be sat.
 *
 * Only ids are stored, so the sitting is rebuilt against the published bank on
 * every restore. A question unpublished in the meantime would leave a shorter
 * paper than the one the student started, with their answers still keyed to the
 * questions that remain — so the sitting is dropped rather than silently
 * shortened. Stored order is kept: it is the order they were sat in, which the
 * pool has no reason to agree with.
 */
export function restorableQuestions(saved: StoredSitting, questions: Question[]): Question[] | null {
  const rebuilt = saved.questionIds
    .map((id) => questions.find((question) => question.id === id))
    .filter((question): question is Question => Boolean(question))
  return rebuilt.length === saved.questionIds.length ? rebuilt : null
}

/**
 * Whether ending what is on screen should clear the stored sitting.
 *
 * Finding #2: this was unconditional. Terminating is reached from a past test's
 * results too, and it threw away whatever separate sitting the student had
 * paused — silently, and on a timed one before a single answer had reached the
 * attempt log. Only the sitting actually on screen may be cleared.
 */
export function clearsStoredSitting(saved: StoredSitting | null, sessionIdOnScreen: string): boolean {
  return saved?.sessionId === sessionIdOnScreen
}

/**
 * Whether what is on screen is a sitting worth storing.
 *
 * Finding #3: a review is not work in progress. Opening a finished test from
 * Previous tests used to be mirrored like one, straight over the sitting the
 * student had paused. Being at the hub is not the end of a sitting either — it
 * is where a paused one waits — so `setup` writes nothing rather than writing
 * an empty runner over it.
 *
 * The other half of that rule lives at the call site: `reviewing` has to be
 * cleared when the review is left, or this stays false for the rest of the
 * mount and the sitting stops being stored at all.
 *
 * Narrows `phase` rather than returning a plain boolean, because a stored
 * sitting is never at `setup` and the stored shape says so in its own type.
 */
export function persistsSitting(phase: Phase, reviewing: boolean): phase is Exclude<Phase, 'setup'> {
  return phase !== 'setup' && !reviewing
}

/**
 * The sitting still open, if there is one.
 *
 * Finding #4: a submitted sitting is finished with. Reading the stored id
 * without asking showed a test the student had just handed in as though it were
 * still waiting for them.
 */
export function liveSittingId(saved: StoredSitting | null): string | null {
  return saved && !saved.submitted ? saved.sessionId : null
}

/**
 * The manifests of sittings that are over.
 *
 * Finding #5: a sitting files its manifest the moment it starts, so that a test
 * abandoned halfway still accounts for the questions it served. That makes an
 * open sitting look, to the omitted list, like one where every question not
 * reached yet was skipped — offered back on the same screen as the card
 * offering to continue it. Omitted means left unanswered in a sitting that is
 * over.
 */
export function finishedManifests(manifests: SessionManifests, saved: StoredSitting | null): SessionManifests {
  const openId = liveSittingId(saved)
  if (!openId) return manifests
  return Object.fromEntries(Object.entries(manifests).filter(([id]) => id !== openId))
}

/**
 * The strike marks left after choosing an option.
 *
 * Finding #6: an option cannot be both chosen and ruled out. It used to render
 * accent-selected and crossed through at once, and would be logged as the
 * student's answer. Symmetric with striking the option already selected, which
 * drops the selection.
 *
 * Returned unchanged by identity when the option was not struck, so the common
 * case — picking an option nobody crossed off — costs no state write.
 */
export function selectClearsStrike(
  struck: Record<string, number[]>,
  questionId: string,
  index: number,
): Record<string, number[]> {
  const next = new Set(struck[questionId] ?? [])
  if (!next.delete(index)) return struck
  return { ...struck, [questionId]: [...next] }
}

/**
 * The answered questions that have no attempt record yet.
 *
 * Checking an answer is the only other writer and its button only exists in
 * tutor mode, so a timed sitting used to reach its results having recorded
 * nothing at all: it never appeared in Previous tests, never moved the
 * student's accuracy, and left every question they got wrong invisible to the
 * list meant to collect them. Already-checked questions are excluded so
 * submitting cannot count an answer twice.
 */
export function pendingAttempts(
  session: Question[],
  answers: Record<string, number>,
  checked: Record<string, boolean>,
): Question[] {
  return session.filter((question) => answers[question.id] != null && !checked[question.id])
}
