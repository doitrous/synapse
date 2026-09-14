/**
 * The safe write path for an admin tab that loaded only a SLICE of the content
 * ledger.
 *
 * A tab that holds the whole ledger can save the whole array and the store diffs
 * it. A tab that holds a slice must not: saving a filtered array as the document
 * `value` reads every absent id as a deletion (`server/src/stateMerge.js`
 * `mergeDocument`), which would erase most of the catalogue. So a sliced tab
 * saves through the delta path instead, naming only the items it edited.
 *
 * This is safe by construction, not by care:
 *  - The server applies each change onto the LIVE ledger under a row lock and
 *    touches only the named ids (`applyDelta`). An item this tab never loaded is
 *    never named, so it is physically incapable of being deleted or altered —
 *    proven in `stateMerge.test.js` ("a delta publishes one question without
 *    resending the rest").
 *  - A `before` that no longer matches what is stored is a conflict: nothing is
 *    written. A stale or slightly-wrong base therefore fails closed — it never
 *    loses data, it just refuses the save.
 *  - `baseVersion` is null on purpose: the delta path ignores it entirely and
 *    guards per item by `before`, so a pruned version row cannot strand a save.
 *
 * A deletion is an explicit `{ before: <item>, after: null }`; a creation is
 * `{ before: null, after: <item> }`; an edit carries both.
 */
import { API_MODE, putStateDelta } from '@/lib/api'
import { CONTENT_LEDGER_STORAGE_KEY, type ManagedContentItem } from '@/data/contentControl'
import { invalidateAdminContent } from './adminContentClient'

export interface LedgerItemChange {
  id: string
  /** The item exactly as loaded from its slice — the per-item conflict guard. Null to create. */
  before: ManagedContentItem | null
  /** The edited item. Null to delete. */
  after: ManagedContentItem | null
}

/** Apply changes to the demo-mode localStorage ledger, mirroring the server's per-item merge. */
function applyToDemoLedger(changes: LedgerItemChange[]): void {
  if (typeof localStorage === 'undefined') return
  try {
    const raw = JSON.parse(localStorage.getItem(CONTENT_LEDGER_STORAGE_KEY) ?? '[]')
    const items: ManagedContentItem[] = Array.isArray(raw) ? raw : []
    const byId = new Map(items.map((item) => [item.id, item]))
    for (const change of changes) {
      if (change.after) byId.set(change.id, change.after)
      else byId.delete(change.id)
    }
    localStorage.setItem(CONTENT_LEDGER_STORAGE_KEY, JSON.stringify([...byId.values()]))
  } catch { /* private browsing — a demo edit simply does not persist */ }
}

/**
 * Save exactly the items a tab edited, as an item-scoped delta on the content
 * ledger. Rejects (throws) on a conflict or refusal so the caller can surface it
 * and keep the editor's unsaved state; resolves once the change is committed.
 */
export async function saveLedgerChanges(changes: LedgerItemChange[]): Promise<void> {
  const dirty = changes.filter((change) => change.before !== null || change.after !== null)
  if (!dirty.length) return
  if (!API_MODE) {
    applyToDemoLedger(dirty)
    invalidateAdminContent()
    return
  }
  await putStateDelta(
    CONTENT_LEDGER_STORAGE_KEY,
    dirty.map((change) => ({ collection: 'items', id: change.id, before: change.before, after: change.after })),
    null,
  )
  invalidateAdminContent()
}
