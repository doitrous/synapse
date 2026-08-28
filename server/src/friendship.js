/**
 * The rules a friendship obeys, with no database in sight.
 *
 * Two of these are invariants that only break under a race: two students
 * pressing Add at the same instant, and a request answered by the person who
 * sent it. Both are cheap to state here and expensive to debug in SQL.
 */

/**
 * A friendship is one row, not two.
 *
 * Sorting the pair before it is written means "are we friends" is a single
 * lookup and a duplicate is impossible — the primary key does the work.
 */
export function orderedPair(a, b) {
  return a < b ? { userA: a, userB: b } : { userA: b, userB: a }
}

export function isSelf(a, b) {
  return a === b
}

/** Whether a fresh request may be sent, given whatever row already exists. */
export function canSendRequest(existing) {
  if (!existing) return { ok: true }
  if (existing.status === 'pending') return { ok: false, reason: 'already_pending' }
  if (existing.status === 'accepted') return { ok: false, reason: 'already_friends' }
  // A decline is not a block. Someone who tapped the wrong button, or changed
  // their mind, can be asked again.
  return { ok: true }
}

/**
 * The outcome of answering a request, or null when this person may not answer.
 *
 * The sender accepting their own request would make a friendship out of one
 * person's say-so, so the responder must be the other half of the pair.
 */
export function resolveResponse(row, responderId, accept) {
  if (!row || row.status !== 'pending') return null
  if (row.requestedBy === responderId) return null
  if (row.userA !== responderId && row.userB !== responderId) return null
  return { status: accept ? 'accepted' : 'declined' }
}
