import { API_MODE, apiPost } from './api'
import { ensureEntry, setEntryValue } from './stateStore'
import { toPendingPayloads, type Pending } from './attemptPayload'
import {
  attemptMonth, attemptMonthKey, emptyMonth,
  type AttemptMonth, type AttemptRecord,
} from '@/data/attempts'

/**
 * Durable delivery of verified Question Bank answers to the server ledger.
 *
 * The local attempt log is the student's own authoritative copy and is already
 * safe. The server copy (leaderboards, analytics, mastery) used to be sent
 * fire-and-forget: a failed POST — a flaky network, a tab closed right after
 * answering — was a permanent silent loss. Here every send is queued (device
 * -local, survives reload) and retried until the server accepts it; the server
 * keys by attemptId, so re-sending is idempotent.
 *
 * On success the server's receipt time is stamped back onto each record
 * (`serverAt`) so verdict/transition ordering is device-independent — see
 * `attemptOrder`. The stamp is written through the same synced store the log
 * lives in, so other devices see it too.
 */

const QUEUE_KEY = 'nishany-qbank-attempt-queue-v1'

function loadQueue(): Pending[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}

function saveQueue(queue: Pending[]): void {
  try {
    if (queue.length) localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
    else localStorage.removeItem(QUEUE_KEY)
  } catch { /* private browsing — the local log still holds the answer */ }
}

let flushing = false

/** Enqueue verified answers and try to deliver them now. */
export function queueVerifiedAttempts(records: AttemptRecord[]): void {
  if (!API_MODE || typeof window === 'undefined') return
  const fresh = toPendingPayloads(records)
  if (!fresh.length) return
  const queue = loadQueue()
  const seen = new Set(queue.map((p) => p.attemptId))
  for (const payload of fresh) if (!seen.has(payload.attemptId)) queue.push(payload)
  saveQueue(queue)
  void flushVerifiedAttempts()
}

/** Deliver everything queued; keep whatever the server did not accept. */
export async function flushVerifiedAttempts(): Promise<void> {
  if (!API_MODE || typeof window === 'undefined' || flushing) return
  const attempts = loadQueue()
  if (!attempts.length) return
  flushing = true
  try {
    let result: { serverAt?: number } | null = null
    try {
      result = await apiPost<{ serverAt?: number }>('/qbank/attempts', { attempts })
    } catch {
      return // keep the queue; a later enqueue, reconnect, or boot retries it
    }
    const serverAt = Number(result?.serverAt) || Date.now()
    stampServerAt(attempts, serverAt)
    // The server accepted (or permanently rejected as unmarkable) every row it
    // was sent — either way retrying them is pointless, so drop exactly those.
    const sent = new Set(attempts.map((p) => p.attemptId))
    saveQueue(loadQueue().filter((p) => !sent.has(p.attemptId)))
    window.dispatchEvent(new Event('nishany:maristana-progress'))
    if (loadQueue().length) void flushVerifiedAttempts() // items enqueued mid-send
  } finally {
    flushing = false
  }
}

/** Write the server's receipt time onto the matching records in each month shard. */
function stampServerAt(attempts: Pending[], serverAt: number): void {
  const idsByMonth = new Map<string, Set<string>>()
  for (const payload of attempts) {
    const month = attemptMonth(new Date(payload.answeredAt))
    const ids = idsByMonth.get(month) ?? new Set<string>()
    ids.add(payload.attemptId)
    idsByMonth.set(month, ids)
  }
  for (const [month, ids] of idsByMonth) {
    const key = attemptMonthKey(month)
    ensureEntry(key, () => emptyMonth(month))
    setEntryValue(key, (raw: unknown) => {
      const current = raw as AttemptMonth
      let changed = false
      const records = current.records.map((record) => {
        if (ids.has(record.id) && record.serverAt !== serverAt) { changed = true; return { ...record, serverAt } }
        return record
      })
      return changed ? { ...current, records } : current
    })
  }
}

// ---- Session retraction (deleting a sitting) ---------------------------------
// Deleting a sitting locally must also retract it from the server ledger, or
// leaderboards/analytics keep the "deleted" answers forever. Queued and retried
// like sends, so a failed delete isn't silent server drift; the endpoint is
// idempotent and user-scoped.

const DELETE_QUEUE_KEY = 'nishany-qbank-delete-queue-v1'

function loadDeleteQueue(): string[] {
  try {
    const raw = localStorage.getItem(DELETE_QUEUE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}

function saveDeleteQueue(ids: string[]): void {
  try {
    if (ids.length) localStorage.setItem(DELETE_QUEUE_KEY, JSON.stringify(ids))
    else localStorage.removeItem(DELETE_QUEUE_KEY)
  } catch { /* private browsing */ }
}

let deleting = false

/** Retract a sitting server-side, durably. */
export function queueSessionDeletion(sessionId: string): void {
  if (!API_MODE || typeof window === 'undefined' || !sessionId) return
  const queue = loadDeleteQueue()
  if (!queue.includes(sessionId)) queue.push(sessionId)
  saveDeleteQueue(queue)
  void flushSessionDeletions()
}

export async function flushSessionDeletions(): Promise<void> {
  if (!API_MODE || typeof window === 'undefined' || deleting) return
  const pending = loadDeleteQueue()
  if (!pending.length) return
  deleting = true
  try {
    for (const sessionId of pending) {
      try {
        await apiPost('/qbank/attempts/delete', { sessionId })
      } catch {
        return // keep this and the rest; retried on next reconnect/boot
      }
      saveDeleteQueue(loadDeleteQueue().filter((id) => id !== sessionId))
    }
  } finally {
    deleting = false
  }
}

// Retry both backlogs when the app boots and whenever connectivity returns.
if (API_MODE && typeof window !== 'undefined') {
  const flush = () => { void flushVerifiedAttempts(); void flushSessionDeletions() }
  window.addEventListener('online', flush)
  flush()
}
