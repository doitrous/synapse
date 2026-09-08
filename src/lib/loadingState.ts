import type { DocumentStatus } from './catalogueAvailability'

/** Initial reads only: saving and refreshing must not replace usable content. */
export function initialLoadState(...statuses: readonly DocumentStatus[]) {
  const error = statuses.find(status => status.error)?.error ?? null
  return { loading: !error && statuses.some(status => !status.hydrated), error }
}
