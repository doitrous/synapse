import type { StateErrorKind } from './apiErrors'

/**
 * What the library should tell the student right now.
 *
 * The library is assembled from several stored documents, and in live mode the
 * seeded demo topics are deliberately dropped — so "no articles" is the normal
 * shape of *every* failure as well as of a genuinely unpublished library. A
 * student who could not reach the server saw the same blank page as a student
 * whose library simply has nothing in it yet, and neither was told which.
 *
 * Keeping the decision here, rather than inside the hook, is what makes it
 * testable without a browser.
 */
export type CatalogueAvailability =
  | { kind: 'loading' }
  | { kind: 'error'; error: StateErrorKind }
  | { kind: 'empty' }
  | { kind: 'ready' }

export interface DocumentStatus {
  hydrated: boolean
  error: StateErrorKind | null
}

export function catalogueAvailability({
  statuses,
  itemCount,
}: {
  statuses: readonly DocumentStatus[]
  itemCount: number
}): CatalogueAvailability {
  // An error outranks everything. A failed read is never marked hydrated — it
  // retries instead — so checking `hydrated` first would leave the student on a
  // spinner for as long as the fault lasts.
  const failed = statuses.find((status) => status.error)
  if (failed?.error) return { kind: 'error', error: failed.error }

  if (statuses.some((status) => !status.hydrated)) return { kind: 'loading' }

  return itemCount === 0 ? { kind: 'empty' } : { kind: 'ready' }
}
