/**
 * How two people save the same document without one erasing the other.
 *
 * Every admin surface persists by replacing a whole JSON document, and all four
 * content kinds live in one of them. With two admins a lost update was rare;
 * with a team of reviewers it is the normal case. So a save is no longer a
 * replacement: the client sends the version it started from, and this works out
 * what that client actually changed, whether it was allowed to, and applies
 * only that onto whatever is stored now.
 *
 * Documents that are keyed collections merge item by item. Everything else is
 * still whole-document, but the caller's base version is checked, so a stale
 * write is refused rather than silently winning.
 */

import { changeWritableBy } from './contentScope.js'
import { LIBRARY_TREES_STATE_KEY } from './libraryTrees.js'
import { authoriseReportChange, CONTENT_REPORTS_STATE_KEY } from './contentReports.js'

const LEDGER = 'synapse-admin-content-ledger-v4'
const GRAPH = 'synapse-concept-graph-v2'

/**
 * How to take a document apart, per key.
 *
 * `tabsFor` is what makes one shared document answer to five different tabs: a
 * question edit needs Questions Setup, an article edit needs Library Setup, and
 * neither is granted by the other.
 */
const ADAPTERS = {
  [LEDGER]: {
    collections: [{
      name: 'items',
      read: (document) => (Array.isArray(document) ? document : []),
      write: (_document, items) => items,
      kindOf: (item) => item?.kind ?? 'unknown',
      // Every content kind in the ledger, and the tab that authors it. A kind
      // missing from here maps to no tab and so refuses every write — which is
      // the right failure (closed, and loud) but only if somebody notices, so
      // `stateMerge.test.js` asserts this covers `ContentKind` exactly.
      tabsFor: (kind) => ({
        article: ['library'],
        question: ['questions'],
        practical: ['practical'],
        resource: ['resources'],
        deck: ['flashcards'],
        essay: ['written'],
        histology: ['histology'],
      }[kind] ?? []),
    }],
  },
  [LIBRARY_TREES_STATE_KEY]: {
    collections: [{
      name: 'trees',
      // Each tree becomes an item whose id is its scope, so everything the role
      // hierarchy already does per item — the tab check, the scope check, the
      // conflict detection — applies to a tree without a line of new logic.
      read: (document) => Object.entries(document?.trees ?? {}).map(([id, nodes]) => ({ id, nodes })),
      write: (document, items) => ({
        ...(document ?? {}),
        trees: Object.fromEntries(items.map((item) => [item.id, item.nodes])),
      }),
      kindOf: () => 'libraryTree',
      tabsFor: () => ['library'],
    }],
  },
  [CONTENT_REPORTS_STATE_KEY]: {
    // The reports document is a bare array of reports, like the ledger's items.
    // Making it a collection is what buys it two things at once: item-by-item
    // merge, so two people working different reports never collide, and a per-
    // item authorisation hook, so who may resolve versus only comment is decided
    // in `authoriseChanges` rather than by the coarse fact of holding the tab.
    collections: [{
      name: 'reports',
      read: (document) => (Array.isArray(document) ? document : []),
      write: (_document, items) => items,
      kindOf: () => 'contentReport',
      tabsFor: () => ['reports'],
    }],
  },
  [GRAPH]: {
    collections: [
      {
        name: 'concepts',
        read: (document) => (Array.isArray(document?.concepts) ? document.concepts : []),
        write: (document, items) => ({ ...(document ?? {}), concepts: items }),
        kindOf: () => 'concept',
        tabsFor: () => ['concepts'],
      },
      {
        name: 'relations',
        read: (document) => (Array.isArray(document?.relations) ? document.relations : []),
        write: (document, items) => ({ ...(document ?? {}), relations: items }),
        kindOf: () => 'relation',
        tabsFor: () => ['relationships'],
      },
    ],
  },
}

export function isMergeable(key) {
  return Boolean(ADAPTERS[key])
}

/** Stable across key order, so a re-serialised item is not a phantom change. */
function fingerprint(value) {
  if (value === null || value === undefined) return 'null'
  if (typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map(fingerprint).join(',')}]`
  return `{${Object.keys(value).sort()
    .filter((key) => value[key] !== undefined)
    .map((key) => `${JSON.stringify(key)}:${fingerprint(value[key])}`)
    .join(',')}}`
}

function byId(items) {
  return new Map(items.filter((item) => item && typeof item.id === 'string').map((item) => [item.id, item]))
}

/**
 * Canonical item equality, with a cheap pre-check.
 *
 * `fingerprint` is order-independent but deep and recursive. `diffDocument` and
 * `mergeDocument` compare every item in a document on every save, several times
 * over — and on the content ledger (thousands of nested question items) calling
 * `fingerprint` that many times cost tens of seconds per publish, long enough
 * that a reload before it returned dropped the write and the change looked like
 * it reverted.
 *
 * Almost every item is byte-identical between the two versions being compared —
 * both were serialised from the same stored document — so an identical native
 * `JSON.stringify` settles them without the sorted walk. An identical string is
 * unconditionally equal, so this never reports a false match; only when the fast
 * strings differ (a genuine change, or the rare re-ordered key) do we fall back
 * to the authoritative, order-independent fingerprint. Correctness is unchanged;
 * the common case is now one native serialisation instead of a recursive one.
 */
function equalItems(a, b) {
  if (a === b) return true
  if (!a || !b) return false
  if (JSON.stringify(a) === JSON.stringify(b)) return true
  return fingerprint(a) === fingerprint(b)
}

/**
 * What changed between two versions of a document, item by item.
 *
 * A change carries both sides because authorisation needs both — see
 * `changeWritableBy`.
 */
export function diffDocument(key, base, next) {
  const adapter = ADAPTERS[key]
  if (!adapter) return []
  const changes = []
  for (const collection of adapter.collections) {
    const before = byId(collection.read(base))
    const after = byId(collection.read(next))
    for (const id of new Set([...before.keys(), ...after.keys()])) {
      const from = before.get(id) ?? null
      const to = after.get(id) ?? null
      if (from && to && equalItems(from, to)) continue
      const kind = collection.kindOf(to ?? from)
      changes.push({
        collection: collection.name,
        id,
        kind,
        tabs: collection.tabsFor(kind),
        before: from,
        after: to,
      })
    }
  }
  return changes
}

/** True when the only difference between two items is their media requests. */
function mediaRequestsOnly(before, after) {
  if (!before || !after) return false
  const strip = (value) => {
    if (Array.isArray(value)) return value.map(strip)
    if (!value || typeof value !== 'object') return value
    return Object.fromEntries(Object.entries(value)
      .filter(([key]) => key !== 'mediaRequests')
      .map(([key, inner]) => [key, strip(inner)]))
  }
  return fingerprint(strip(before)) === fingerprint(strip(after))
}

/**
 * Whether this caller may make these changes.
 *
 * Refusals are collected rather than thrown on the first one, so a person is
 * told everything that is wrong at once. The caller applies none of it either
 * way: a half-saved page is worse than a rejected one.
 */
export function authoriseChanges(changes, { heldTabs, contentScope, role }) {
  const held = new Set(heldTabs ?? [])
  const refusals = []
  for (const change of changes) {
    // A media request lives inside its owner, so sourcing an asset is a write
    // to the owning item. Media Requests grants that one edit, and so does the
    // owner's tab — but only that edit: anything else needs the owner's tab.
    const allowed = mediaRequestsOnly(change.before, change.after)
      ? [...change.tabs, 'media']
      : change.tabs
    if (!allowed.some((tab) => held.has(tab))) {
      refusals.push({ id: change.id, reason: `${change.kind} "${change.id}" is not part of your role` })
      continue
    }
    // A content report is judged by rank, not curriculum scope: who may resolve,
    // archive or only comment is a property of the actor's role. Holding the tab
    // got us this far; the transition itself is what the ladder decides.
    if (change.kind === 'contentReport') {
      const verdict = authoriseReportChange({ before: change.before, after: change.after, role })
      if (!verdict.ok) refusals.push({ id: change.id, reason: verdict.reason })
      continue
    }
    if (!changeWritableBy(contentScope, change.kind, change.before, change.after)) {
      refusals.push({
        id: change.id,
        reason: `${change.kind} "${change.id}" is outside the modules and years assigned to you`,
      })
    }
  }
  return { ok: refusals.length === 0, refusals }
}

/**
 * This caller's changes, applied onto what is stored now.
 *
 * An item both sides touched is a conflict and the whole save is refused. Two
 * people who edited different items both keep their work, which is the point.
 */
export function mergeDocument(key, base, stored, incoming) {
  const adapter = ADAPTERS[key]
  if (!adapter) return { ok: true, value: incoming }

  const conflicts = []
  let value = stored
  for (const collection of adapter.collections) {
    const before = byId(collection.read(base))
    const mine = byId(collection.read(incoming))
    const theirs = byId(collection.read(stored))
    const result = new Map(theirs)

    for (const id of new Set([...before.keys(), ...mine.keys()])) {
      const from = before.get(id) ?? null
      const to = mine.get(id) ?? null
      if (from && to && equalItems(from, to)) continue

      const current = theirs.get(id) ?? null
      if (!equalItems(current, from)) { conflicts.push(id); continue }

      if (to) result.set(id, to)
      else result.delete(id)
    }
    value = collection.write(value, [...result.values()])
  }

  if (conflicts.length) return { ok: false, conflicts }
  return { ok: true, value }
}

/**
 * A delta save sends only the items a client changed, not the whole document.
 *
 * The content ledger is tens of megabytes; re-uploading all of it to publish one
 * question was the dominant cost of a save. A client that tracks the version it
 * loaded can instead send just `{ collection, id, before, after }` per changed
 * item — the same shape `diffDocument` produces — and the server applies those
 * onto whatever is stored now, with the identical per-item conflict check.
 *
 * `reconstructChanges` re-derives `kind` and `tabs` from the adapter rather than
 * trusting the client for them: authorisation must not be something the caller
 * can assert. It returns null for anything malformed — an unknown collection, a
 * non-string id, an `after` whose id disagrees — so the caller refuses the save
 * rather than guessing. A missing/blank `changes` is the caller's signal to take
 * the whole-document path, and must never be read as "delete everything".
 */
export function reconstructChanges(key, rawChanges) {
  const adapter = ADAPTERS[key]
  if (!adapter || !Array.isArray(rawChanges)) return null
  const byName = new Map(adapter.collections.map((collection) => [collection.name, collection]))
  const changes = []
  for (const raw of rawChanges) {
    if (!raw || typeof raw !== 'object') return null
    const collection = byName.get(raw.collection)
    if (!collection) return null
    if (typeof raw.id !== 'string' || !raw.id) return null
    const before = raw.before ?? null
    const after = raw.after ?? null
    if (before === null && after === null) return null
    if (after && after.id !== raw.id) return null
    if (before && before.id !== raw.id) return null
    const kind = collection.kindOf(after ?? before)
    changes.push({ collection: collection.name, id: raw.id, kind, tabs: collection.tabsFor(kind), before, after })
  }
  return changes
}

/**
 * The reconstructed changes applied onto what is stored now.
 *
 * Mirrors `mergeDocument`'s conflict rule exactly: an item whose stored value no
 * longer matches the `before` the client started from is a conflict and the
 * whole save is refused, so a delta can never silently overwrite somebody
 * else's concurrent edit. Changes name their collection, so this touches only
 * the items actually sent — a truncated list cannot delete the rest.
 */
export function applyDelta(key, stored, changes) {
  const adapter = ADAPTERS[key]
  if (!adapter) return { ok: false, conflicts: [] }

  const perCollection = new Map()
  for (const change of changes) {
    if (!perCollection.has(change.collection)) perCollection.set(change.collection, [])
    perCollection.get(change.collection).push(change)
  }

  const conflicts = []
  let value = stored
  for (const collection of adapter.collections) {
    const theirs = byId(collection.read(stored))
    const result = new Map(theirs)
    for (const change of perCollection.get(collection.name) ?? []) {
      const current = theirs.get(change.id) ?? null
      if (!equalItems(current, change.before)) { conflicts.push(change.id); continue }
      if (change.after) result.set(change.id, change.after)
      else result.delete(change.id)
    }
    value = collection.write(value, [...result.values()])
  }

  if (conflicts.length) return { ok: false, conflicts }
  return { ok: true, value }
}
