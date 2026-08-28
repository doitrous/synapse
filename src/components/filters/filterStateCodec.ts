/**
 * Pure serialisation for `useFilterState`, split out of the hook so the
 * encode/decode/merge rules can be unit-tested with `node --test` without a
 * React runtime or a router. `useFilterState.ts` is a thin wrapper over these
 * plus `react-router-dom`'s `useSearchParams`.
 */

export type FilterStateValue = string | string[]
export type FilterStateDefaults = Record<string, FilterStateValue>

/** `undefined` means "omit this key from the URL entirely" — an empty string or empty array is not a value worth carrying in the address bar. */
export function encodeFilterStateValue(value: FilterStateValue): string | undefined {
  if (Array.isArray(value)) return value.length ? value.join(',') : undefined
  return value === '' ? undefined : value
}

export function decodeFilterStateValue(raw: string | null, fallback: FilterStateValue): FilterStateValue {
  if (raw === null) return fallback
  return Array.isArray(fallback) ? raw.split(',').filter(Boolean) : raw
}

/** Read every default's key out of `params`, falling back to its default when absent. */
export function readFilterStateFromParams<T extends FilterStateDefaults>(
  params: URLSearchParams,
  defaults: T,
  prefix = '',
): T {
  const next = { ...defaults }
  for (const key of Object.keys(defaults)) {
    const raw = params.get(`${prefix}${key}`)
    if (raw !== null) (next as Record<string, FilterStateValue>)[key] = decodeFilterStateValue(raw, defaults[key])
  }
  return next
}

/**
 * Apply a partial update to `params`, returning a new `URLSearchParams`.
 * A key set back to its own default is removed rather than written as
 * `key=default` — the URL only ever carries what actually diverges from the
 * page's own defaults, so an untouched filter bar has no query string at all.
 */
export function writeFilterStatePatchToParams<T extends FilterStateDefaults>(
  params: URLSearchParams,
  defaults: T,
  patch: Partial<T>,
  prefix = '',
): URLSearchParams {
  const next = new URLSearchParams(params)
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue
    const encoded = encodeFilterStateValue(value as FilterStateValue)
    const isDefault = JSON.stringify(value) === JSON.stringify(defaults[key])
    if (encoded === undefined || isDefault) next.delete(`${prefix}${key}`)
    else next.set(`${prefix}${key}`, encoded)
  }
  return next
}

/** Remove every key this filter state owns, leaving unrelated params untouched. */
export function clearFilterStateParams<T extends FilterStateDefaults>(
  params: URLSearchParams,
  defaults: T,
  prefix = '',
): URLSearchParams {
  const next = new URLSearchParams(params)
  for (const key of Object.keys(defaults)) next.delete(`${prefix}${key}`)
  return next
}
