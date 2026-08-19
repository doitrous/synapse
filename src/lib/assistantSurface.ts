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
  ['/app/qbank', 'Question Bank'],
  ['/app/practical', 'Practical'],
  ['/app/resources', 'Resources'],
  ['/app/taxonomy', 'Medical Taxonomy'],
  ['/app/calendar', 'Calendar'],
  ['/app/performance', 'Performance'],
  ['/app/notebook', 'Notebook'],
  ['/app/whiteboard', 'Whiteboard'],
  ['/app/study-together', 'Study Together'],
  ['/app/billing', 'Billing'],
  ['/app/account', 'Account'],
  ['/app', 'Dashboard'],
]

export function surfaceFor(pathname: string): string | undefined {
  return ASSISTANT_SURFACES.find(([prefix]) => pathname.startsWith(prefix))?.[1]
}
