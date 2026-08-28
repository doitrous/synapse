/**
 * Who may do what to a media request.
 *
 * A media request lives inside its owning article, question or practical, and a
 * change that touches only media requests is already narrowed to the Media
 * Requests tab (see `mediaRequestsOnly` in stateMerge.js). This module narrows it
 * again — by what the change actually does, and by the actor's rank:
 *
 *   Reviewer (rank 1): attach media to a request, discuss it, and escalate it.
 *     May NOT plan, decline, or hand-mark a request "supplied" — supplied is a
 *     fact the server sets once verified media is attached, not a label anyone
 *     applies — and may NOT touch a request whose escalation is still open.
 *
 *   Editor / super admin (rank >= 2): everything a reviewer may do, plus the
 *     management transitions — plan, decline, create or remove a request, and
 *     return, reassign or resolve an escalation.
 *
 * This is a pure function over the before/after of the owning item. The one thing
 * it cannot decide on its own is whether attached media is genuinely ready; that
 * needs the media table and is enforced in the write route, which promotes a
 * request to "supplied" itself rather than trusting a client to.
 */

const MANAGEMENT_STATUSES = new Set(['planned', 'declined'])

function stable(value) {
  return JSON.stringify(value ?? null)
}

/**
 * Every media request in an item, by id, wherever it is nested.
 *
 * Requests hang off the owner directly and off nested parts — a question's
 * answers, a practical's decisions — so this walks the whole item collecting any
 * `mediaRequests` array it finds, the same shape the client's `mediaRequestsOf`
 * returns. First occurrence of an id wins, matching the client's de-dup.
 */
export function collectMediaRequests(item) {
  const byId = new Map()
  const seen = new Set()
  const walk = (node) => {
    if (!node || typeof node !== 'object') return
    if (seen.has(node)) return
    seen.add(node)
    if (Array.isArray(node)) { for (const entry of node) walk(entry); return }
    for (const [key, value] of Object.entries(node)) {
      if (key === 'mediaRequests' && Array.isArray(value)) {
        for (const request of value) {
          if (request && typeof request.id === 'string' && !byId.has(request.id)) byId.set(request.id, request)
        }
      }
      walk(value)
    }
  }
  walk(item)
  return byId
}

/**
 * Whether an actor of `rank` may turn one request from `before` into `after`.
 * Returns `{ ok }` or `{ ok:false, reason }`.
 */
export function authoriseOneMediaRequestChange(before, after, { rank }) {
  const isEditor = rank >= 2

  // Creating or removing a request is authoring the item, not fulfilling it.
  if (!before || !after) {
    if (!isEditor) return { ok: false, reason: 'a reviewer supplies and escalates requests; creating or removing one is an editor action' }
    return { ok: true }
  }

  const escalationWasOpen = before.escalation?.status === 'open'

  // While an escalation is open the request belongs to whoever is handling it.
  // A reviewer's edits are refused until it is returned or resolved.
  if (escalationWasOpen && !isEditor) {
    return { ok: false, reason: 'this request is escalated and read-only until an editor returns or resolves it' }
  }

  // Escalation transitions.
  const beforeEsc = before.escalation ?? null
  const afterEsc = after.escalation ?? null
  if (stable(beforeEsc) !== stable(afterEsc)) {
    // Creating an escalation (none → open) is a reviewer action; it needs a reason and a priority.
    if (!beforeEsc && afterEsc) {
      if (afterEsc.status !== 'open') return { ok: false, reason: 'a new escalation starts open' }
      if (!String(afterEsc.reason ?? '').trim()) return { ok: false, reason: 'an escalation needs a reason' }
      if (!String(afterEsc.priority ?? '').trim()) return { ok: false, reason: 'an escalation needs a priority' }
    } else {
      // Any later move of an escalation — returned, reassigned, resolved — is an
      // editor action, and its history may only grow.
      if (!isEditor) return { ok: false, reason: 'only an editor or super admin may return, reassign or resolve an escalation' }
      const beforeHistory = Array.isArray(beforeEsc?.history) ? beforeEsc.history : []
      const afterHistory = Array.isArray(afterEsc?.history) ? afterEsc.history : []
      if (afterHistory.length < beforeHistory.length) return { ok: false, reason: 'an escalation history cannot be shortened' }
      for (let i = 0; i < beforeHistory.length; i += 1) {
        if (stable(beforeHistory[i]) !== stable(afterHistory[i])) return { ok: false, reason: 'an escalation history cannot be rewritten' }
      }
    }
  }

  // Status transitions.
  if (before.status !== after.status) {
    if (after.status === 'supplied') {
      // A reviewer never hand-marks supplied; the server sets it once media is
      // verified. Editors keep the manual transition for their own workflows.
      if (!isEditor) return { ok: false, reason: 'a request becomes supplied automatically once verified media is attached, not by hand' }
    } else if (MANAGEMENT_STATUSES.has(after.status)) {
      if (!isEditor) return { ok: false, reason: `only an editor or super admin may set a request to "${after.status}"` }
    }
    // '→ needed' (a reset) is open to reviewers.
  }

  return { ok: true }
}

/**
 * Authorise every media-request change between two versions of an owning item.
 * `beforeItem`/`afterItem` differ only in their media requests (the caller has
 * already established that). Refusals are collected, not thrown, so a person sees
 * everything wrong at once.
 */
export function authoriseMediaRequestTransitions(beforeItem, afterItem, { rank }) {
  const before = collectMediaRequests(beforeItem)
  const after = collectMediaRequests(afterItem)
  const refusals = []
  for (const id of new Set([...before.keys(), ...after.keys()])) {
    const from = before.get(id) ?? null
    const to = after.get(id) ?? null
    if (from && to && stable(from) === stable(to)) continue
    const verdict = authoriseOneMediaRequestChange(from, to, { rank })
    if (!verdict.ok) refusals.push({ id, reason: verdict.reason })
  }
  return { ok: refusals.length === 0, refusals }
}
