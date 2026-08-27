/**
 * Client half of delta saves: what changed between the version this client
 * loaded and what it holds now, as the same `{ collection, id, before, after }`
 * shape the server's `diffDocument` produces.
 *
 * The shared content documents are whole-JSON blobs — the question ledger alone
 * is ~23 MB — and a save used to re-upload all of it to change one item. Sending
 * only the changed items instead makes a publish a few kilobytes. The collection
 * layout here MUST match `server/src/stateMerge.js`; a key absent from it is not
 * a delta key and is saved whole, which is always safe.
 */

const LEDGER_KEY = 'synapse-admin-content-ledger-v4'
const GRAPH_KEY = 'synapse-concept-graph-v2'
const TREES_KEY = 'synapse-library-trees-v1'

interface Identified { id?: unknown }
interface Collection {
  name: string
  read: (document: unknown) => Identified[]
}

const asRecord = (value: unknown): Record<string, unknown> => (value && typeof value === 'object' ? value as Record<string, unknown> : {})

const ADAPTERS: Record<string, Collection[]> = {
  [LEDGER_KEY]: [{ name: 'items', read: (document) => (Array.isArray(document) ? document : []) }],
  [GRAPH_KEY]: [
    { name: 'concepts', read: (document) => { const c = asRecord(document).concepts; return Array.isArray(c) ? c : [] } },
    { name: 'relations', read: (document) => { const r = asRecord(document).relations; return Array.isArray(r) ? r : [] } },
  ],
  [TREES_KEY]: [{
    name: 'trees',
    read: (document) => Object.entries(asRecord(asRecord(document).trees)).map(([id, nodes]) => ({ id, nodes })),
  }],
}

export interface StateChange {
  collection: string
  id: string
  before: unknown
  after: unknown
}

/** Whether this key is saved by change (delta) rather than whole-document. */
export function isDeltaKey(key: string): boolean {
  return key in ADAPTERS
}

function byId(items: Identified[]): Map<string, unknown> {
  const map = new Map<string, unknown>()
  for (const item of items) if (item && typeof item.id === 'string') map.set(item.id, item)
  return map
}

function itemCount(key: string, document: unknown): number {
  const collections = ADAPTERS[key]
  if (!collections) return 0
  return collections.reduce((total, collection) => total + collection.read(document).length, 0)
}

/**
 * The changes from `base` (the loaded version) to `next` (what is held now).
 *
 * Returns null when the key is not a delta key, or when the change is broad
 * enough that sending it item-by-item — each change carries both its before and
 * after — would be larger than just sending the whole document (a "publish
 * everything" sweep). The caller then saves whole. Unchanged items are found by
 * reference first: immutable updates keep every untouched item as the same
 * object, so the common single-item edit is diffed in O(n) reference checks.
 */
export function diffStateForDelta(key: string, base: unknown, next: unknown): StateChange[] | null {
  const collections = ADAPTERS[key]
  if (!collections) return null

  const changes: StateChange[] = []
  for (const collection of collections) {
    const before = byId(collection.read(base))
    const after = byId(collection.read(next))
    for (const id of new Set([...before.keys(), ...after.keys()])) {
      const from = before.has(id) ? before.get(id) : null
      const to = after.has(id) ? after.get(id) : null
      if (from === to) continue
      if (from != null && to != null && JSON.stringify(from) === JSON.stringify(to)) continue
      changes.push({ collection: collection.name, id, before: from ?? null, after: to ?? null })
    }
  }

  // Each change carries before AND after, so once roughly half the document has
  // moved, the whole-document upload (one copy) is the smaller send.
  if (changes.length * 2 > itemCount(key, next)) return null
  return changes
}
