/**
 * The rules a study party obeys, kept apart from the database so the ones
 * that matter — who may walk in, and what a mixed session honestly reports —
 * can be tested without a MariaDB.
 *
 * Cohort is checked here but sourced on the server: these functions take a
 * viewer's cohort (universityId, year) as a plain argument, and the caller
 * must read it from the student's own record, never trust it off the
 * request — otherwise "same cohort" becomes whatever the client claims.
 */

/** Two people are in the same standing group only if both fields match. */
export function sameCohort(party, viewer) {
  return party.universityId === viewer.universityId && party.year === viewer.year
}

/**
 * Whether this viewer may join, given they already have the party's code.
 *
 * `visibility` decides discovery, not entry — this deliberately ignores it.
 * The code is the way in: flipping a party to invite-only stops it being
 * *found* on a browse list, it does not lock the door on anyone who already
 * holds the link. Only cohort and archival state can actually keep someone
 * out.
 */
export function canJoin(party, viewer) {
  if (party.archivedAt) return { ok: false, reason: 'archived' }
  if (!sameCohort(party, viewer)) return { ok: false, reason: 'wrong_cohort' }
  return { ok: true }
}

/**
 * Which of these parties this viewer could stumble onto while browsing.
 *
 * Unlike `canJoin`, visibility matters here — this is discovery, not entry.
 * Only `open` parties in the viewer's own cohort, and never an archived one.
 */
export function visibleTo(parties, viewer) {
  return parties.filter((party) => (
    !party.archivedAt && party.visibility === 'open' && sameCohort(party, viewer)
  ))
}

/**
 * A session's state at a given instant, independent of the caller's clock.
 *
 * A close is final regardless of what the start time says — a session that
 * was ended does not spring back to "scheduled" because its `startsAt` is
 * still in the future. Absent a start time, a session is open from the
 * moment it exists.
 */
export function sessionState(session, now = new Date()) {
  if (session.closedAt) return 'closed'
  if (session.startsAt && new Date(session.startsAt) > now) return 'scheduled'
  return 'open'
}

/**
 * Counts of a mixed session's items, marked apart from practised.
 *
 * A question is marked by the server against the published answer; a
 * practical item and an essay are marked by the student who did them (hence
 * `correct: null` on those rows elsewhere in this app). Averaging the two
 * would let self-reported work feed a number other people compare
 * themselves against, so this keeps them separate and never averages.
 * When nothing was server-marked, `marked` is `null` — not a zero-of-zero —
 * because "nobody has answered a question yet" is not the same claim as
 * "everybody got zero".
 */
export function tally(items) {
  const marked = items.filter((item) => item.itemKind === 'question')
  const practised = items.filter((item) => item.itemKind !== 'question').length
  if (marked.length === 0) return { marked: null, practised }
  const correct = marked.filter((item) => item.correct === true).length
  return { marked: { correct, of: marked.length }, practised }
}
