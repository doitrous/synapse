/**
 * Where a student's marks are stored.
 *
 * `usePersistentState` routes any `nishany.annotations.*` key to
 * `PUT/GET /api/user-state/:key`, scoped to the verified account, versioned and
 * crash-recovered. But one key is one JSON document rewritten in full on every
 * change, and the server writes a full version row alongside it. A heavily
 * annotated 300-page book is several megabytes; storing it under one key would
 * mean rewriting all of it — and keeping a copy of all of it — every time a
 * stroke ends. Past the 25 MB request limit it would not even fail loudly:
 * `stateStore` drops a non-retryable write and only sets a status flag.
 *
 * So marks are sharded by page range. A stroke rewrites sixteen pages' worth,
 * and the reader loads only the shards near the viewport.
 */

/** Pages per shard. Small enough to rewrite cheaply, large enough to be few. */
export const SHARD_PAGES = 16

const PREFIX = 'nishany.annotations.v1.'
/** `k VARCHAR(160)` in `user_state`. */
const MAX_KEY_LENGTH = 160
/** Room for the longest suffix this module appends: `.s` + digits. */
const SUFFIX_BUDGET = 8

export function shardIndexFor(page: number): number {
  return Math.floor((Math.max(1, page) - 1) / SHARD_PAGES)
}

/** The inclusive page range a shard covers. */
export function shardPageRange(index: number): [number, number] {
  return [index * SHARD_PAGES + 1, (index + 1) * SHARD_PAGES]
}

/**
 * A stable, bounded scope for one document.
 *
 * `r-` for a catalogue resource, `d-` for the student's own upload. An id long
 * enough to threaten the column is hashed rather than truncated — truncation
 * would let two documents collide silently and share each other's notes.
 */
export function annotationScope(kind: 'resource' | 'document', id: string): string {
  const prefix = kind === 'resource' ? 'r-' : 'd-'
  const budget = MAX_KEY_LENGTH - PREFIX.length - SUFFIX_BUDGET - prefix.length
  const safe = id.replace(/[^A-Za-z0-9._-]/g, '_')
  return `${prefix}${safe.length <= budget ? safe : `h${hash(id)}`}`
}

export function manifestKey(scope: string): string {
  return `${PREFIX}${scope}.idx`
}

export function shardKey(scope: string, index: number): string {
  return `${PREFIX}${scope}.s${index}`
}

/** The shards a page range touches, so the reader loads only what it shows. */
export function shardsForPages(from: number, to: number): number[] {
  const first = shardIndexFor(from)
  const last = shardIndexFor(to)
  const shards: number[] = []
  for (let index = first; index <= last; index++) shards.push(index)
  return shards
}

/** FNV-1a, hex. Not a security boundary — just a short, stable name. */
function hash(value: string): string {
  let h = 0x811c9dc5
  for (let index = 0; index < value.length; index++) {
    h ^= value.charCodeAt(index)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0')
}
