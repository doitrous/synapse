/**
 * Which surface a student is looking at, named for the assistant.
 *
 * Passed as context so "where is this covered?" can be answered relative to
 * where they already are. Kept out of the component because the ordering below
 * is the whole correctness of it and deserves a test: `/app` is a prefix of
 * every other route, so it has to be matched last or every page reports itself
 * as the Dashboard.
 */
export const ASSISTANT_SURFACES: [prefix: string, name: string][] = [
  ['/app/library', 'Library'],
  ['/app/plan', 'Plan'],
  ['/app/learn', 'Learn'],
  ['/app/practice', 'Practice'],
  ['/app/revise', 'Revise'],
  ['/app/tutorial', 'Tutorial'],
  ['/app/qbank', 'Question Bank'],
  ['/app/essays', 'Essay'],
  ['/app/flashcards', 'Flashcards'],
  ['/app/minigames', 'Minigames'],
  ['/app/practical', 'Practical'],
  ['/app/oral', 'Oral questions'],
  ['/app/skills', 'Skills'],
  ['/app/histology', 'Histology'],
  ['/app/resources', 'Resources'],
  ['/app/terminology', 'Medical Terminology'],
  ['/app/taxonomy', 'Medical Terminology'],
  ['/app/calendar', 'Calendar'],
  ['/app/performance', 'Performance'],
  ['/app/notebook', 'Notebook'],
  ['/app/whiteboard', 'Whiteboard'],
  // Old paths redirect, so they still name the surface they land on.
  ['/app/study-rooms', 'Study Rooms'],
  ['/app/study-together', 'Study Rooms'],
  ['/app/billing', 'Account'],
  ['/app/account', 'Account'],
  ['/app', 'Dashboard'],
]

export function surfaceFor(pathname: string): string | undefined {
  return ASSISTANT_SURFACES.find(([prefix]) => pathname.startsWith(prefix))?.[1]
}
