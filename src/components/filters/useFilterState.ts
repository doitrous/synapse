import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  clearFilterStateParams,
  readFilterStateFromParams,
  writeFilterStatePatchToParams,
  type FilterStateDefaults,
} from './filterStateCodec'

/**
 * Deep-linkable filter state, opt-in per page via `enabled`.
 *
 * `defaults` is both the shape of the state (string vs `string[]` per key)
 * and what counts as "not worth putting in the URL" — a value patched back
 * to its own default is removed from the query string rather than written
 * out, so a page nobody has filtered has no `?...` at all.
 *
 * `enabled: false` (the default is `true`) makes this behave as ordinary
 * component state instead — nothing is read from or written to the URL. A
 * page can flip this per-render (e.g. off while embedded inside another
 * page's own URL state) without changing how it calls the hook.
 *
 * Usage:
 * ```tsx
 * const [filters, setFilters, clearFilters] = useFilterState(
 *   { q: '', status: 'all', medium: [] as string[] },
 *   { enabled: true, prefix: 'mr.' },
 * )
 * <FilterBar
 *   searchValue={filters.q}
 *   onSearchChange={(q) => setFilters({ q })}
 *   statusValue={filters.status}
 *   onStatusChange={(status) => setFilters({ status })}
 *   secondaryValue={{ medium: filters.medium }}
 *   onSecondaryChange={(next) => setFilters({ medium: next.medium ?? [] })}
 *   onClearAll={clearFilters}
 *   ...
 * />
 * ```
 */
export function useFilterState<T extends FilterStateDefaults>(
  defaults: T,
  options: { enabled?: boolean; prefix?: string } = {},
): [T, (patch: Partial<T>) => void, () => void] {
  const { enabled = true, prefix = '' } = options

  // Always called, so the hook's own call order never depends on `enabled` —
  // only which branch's result is returned does.
  const [local, setLocal] = useState<T>(defaults)
  const [params, setParams] = useSearchParams()

  const urlValue = useMemo(
    () => readFilterStateFromParams(params, defaults, prefix),
    // `defaults` is intentionally excluded: callers pass an inline literal,
    // and it only needs to be read the first time a key is seen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params, prefix],
  )

  const setUrlValue = useCallback(
    (patch: Partial<T>) => setParams(
      (previous) => writeFilterStatePatchToParams(previous, defaults, patch, prefix),
      { replace: true },
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefix, setParams],
  )

  const clearUrlValue = useCallback(
    () => setParams((previous) => clearFilterStateParams(previous, defaults, prefix), { replace: true }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefix, setParams],
  )

  const setLocalValue = useCallback((patch: Partial<T>) => setLocal((current) => ({ ...current, ...patch })), [])
  const clearLocalValue = useCallback(() => setLocal(defaults), [defaults])

  if (!enabled) return [local, setLocalValue, clearLocalValue]
  return [urlValue, setUrlValue, clearUrlValue]
}
