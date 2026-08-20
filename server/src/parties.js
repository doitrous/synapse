/**
 * Study parties — a standing group confined to one university and year, with
 * one permanent link and a switch between findable-by-your-year and
 * invite-only.
 *
 * Follows `studyRooms.js` closely: same pool use, same code alphabet, same
 * instinct that a stranger gets the same answer as a non-existent thing. The
 * rules that decide who may walk in live in `partyRules.js`, pure and tested
 * apart from the database — this module's job is only to source their inputs
 * honestly and call them.
 */
import { randomUUID } from 'node:crypto'
import { pool } from './db.js'
import { canJoin, visibleTo, sessionState, tally } from './partyRules.js'
import { publishedQuestions } from './publishedQuestions.js'

/** No 0/O/1/I/L — a code gets read aloud and typed by hand. */
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 6

/** Longest a session may be. Same ceiling as a study room, same reason. */
const MAX_SESSION_ITEMS = 40

// The same admin-authored ledger `publishedQuestions.js` freezes questions
// from. Practical and essay items live in the same document; there is no
// per-kind table for them to be looked up in instead.
const LEDGER_KEY = 'synapse-admin-content-ledger-v4'

function newCode() {
  let code = ''
  for (let i = 0; i < CODE_LENGTH; i++) code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
  return code
}

async function displayNamesFor(userIds) {
  if (!userIds.length) return new Map()
  const [rows] = await pool.query(
    `SELECT a.user_id, COALESCE(s.name, s.email, a.email) AS name
       FROM user_access a LEFT JOIN students s ON s.user_id = a.user_id
      WHERE a.user_id IN (?)`,
    [userIds],
  )
  const names = new Map()
  for (const row of rows) names.set(row.user_id, row.name ? String(row.name).split('@')[0] : 'Student')
  return names
}

/** Whether this user is standing in this party at all, host or member. */
async function isPartyMember(partyId, userId) {
  const [rows] = await pool.query(
    'SELECT 1 FROM study_party_members WHERE party_id = ? AND user_id = ? LIMIT 1',
    [partyId, userId],
  )
  return rows.length > 0
}

/**
 * Published ledger items of the given kinds, id only — the practical and
 * essay half of what `createSession` is allowed to freeze. Not cached like
 * `publishedQuestions()`: this only runs at session creation, not on every
 * answer, so there is no hot path to protect and no second cache to keep in
 * step with `invalidatePublishedQuestions`.
 */
async function publishedLedgerIdsByKind(kinds) {
  const byKind = new Map(kinds.map((kind) => [kind, new Set()]))
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [LEDGER_KEY])
  if (rows.length) {
    try {
      const ledger = JSON.parse(rows[0].v)
      for (const item of Array.isArray(ledger) ? ledger : []) {
        if (item?.status === 'Published' && byKind.has(item?.kind)) byKind.get(item.kind).add(item.id)
      }
    } catch {
      // A malformed ledger yields nothing published rather than a thrown request.
    }
  }
  return byKind
}

/**
 * The university and year this student belongs to.
 *
 * Read from their own record, never from the request. A party is confined to a
 * cohort, and a client that could name its own cohort could walk into any year
 * it liked — so the only cohort that counts is the one the server looks up.
 * Null when the student has none recorded, which callers must refuse on rather
 * than default: a party with no year is confined to nobody.
 */
async function cohortFor(userId) {
  const [rows] = await pool.query(
    'SELECT university_id AS universityId, year FROM students WHERE user_id = ? LIMIT 1',
    [userId],
  )
  const row = rows[0]
  if (!row?.universityId || !row?.year) return null
  return { universityId: row.universityId, year: row.year }
}

export async function createParty(userId, { name }) {
  const cohort = await cohortFor(userId)
  // A party with no year cannot be confined to one; making it visible to
  // everybody by default would be exactly the failure to avoid.
  if (!cohort) return { ok: false, reason: 'no_cohort' }

  const id = randomUUID()
  // A collision is a one-in-nine-hundred-million event per attempt; retrying a
  // few times is cheaper than a unique-violation error reaching the student.
  for (let attempt = 0; attempt < 6; attempt++) {
    const code = newCode()
    try {
      await pool.query(
        `INSERT INTO study_parties (id, code, name, host_user_id, university_id, year)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, code, String(name || 'Study party').slice(0, 255), userId, cohort.universityId, cohort.year],
      )
      await pool.query(
        "INSERT INTO study_party_members (party_id, user_id, role) VALUES (?, ?, 'host')",
        [id, userId],
      )
      return { ok: true, party: await partyFor(userId, id) }
    } catch (error) {
      if (error?.code !== 'ER_DUP_ENTRY') throw error
    }
  }
  return { ok: false, reason: 'code_collision' }
}

export async function joinByCode(userId, rawCode) {
  const cohort = await cohortFor(userId)
  if (!cohort) return { ok: false, reason: 'no_cohort' }

  const code = String(rawCode ?? '').trim().toUpperCase()
  const [rows] = await pool.query(
    `SELECT id, university_id AS universityId, year, visibility, archived_at AS archivedAt
       FROM study_parties WHERE code = ?`,
    [code],
  )
  // A code that matches nothing stands in for a party in nobody's cohort, so
  // it fails `canJoin` the same way a real party in someone else's cohort
  // does — wrong code and wrong cohort must look the same from outside.
  const party = rows[0] ?? { universityId: null, year: null, archivedAt: null }
  const verdict = canJoin(party, cohort)
  if (!verdict.ok) return verdict

  await pool.query(
    `INSERT INTO study_party_members (party_id, user_id, role) VALUES (?, ?, 'member')
     ON DUPLICATE KEY UPDATE role = role`,
    [rows[0].id, userId],
  )
  return { ok: true, party: await partyFor(userId, rows[0].id) }
}

export async function setVisibility(userId, partyId, visibility) {
  if (visibility !== 'open' && visibility !== 'invite') return { ok: false, reason: 'invalid_visibility' }
  const [rows] = await pool.query('SELECT host_user_id AS hostUserId FROM study_parties WHERE id = ?', [partyId])
  if (!rows.length) return { ok: false, reason: 'not_found' }
  if (rows[0].hostUserId !== userId) return { ok: false, reason: 'not_host' }
  // The link itself never changes here — this only decides whether the party
  // can be found while browsing, not whether the link still works.
  await pool.query('UPDATE study_parties SET visibility = ? WHERE id = ?', [visibility, partyId])
  return { ok: true, party: await partyFor(userId, partyId) }
}

/**
 * A party as one member may see it. A non-member gets null, exactly as
 * `roomFor` does — whether a party exists is not something a stranger should
 * be able to probe by id.
 */
export async function partyFor(userId, partyId) {
  const [parties] = await pool.query(
    `SELECT id, code, name, host_user_id AS hostUserId, university_id AS universityId, year,
            visibility, created_at AS createdAt, archived_at AS archivedAt
       FROM study_parties WHERE id = ?`,
    [partyId],
  )
  if (!parties.length) return null
  const party = parties[0]

  const [members] = await pool.query(
    'SELECT user_id AS userId, role, joined_at AS joinedAt FROM study_party_members WHERE party_id = ? ORDER BY joined_at',
    [partyId],
  )
  const me = members.find((member) => member.userId === userId) ?? null
  if (!me) return null

  const names = await displayNamesFor(members.map((member) => member.userId))

  return {
    id: party.id,
    code: party.code,
    name: party.name,
    hostUserId: party.hostUserId,
    isHost: party.hostUserId === userId,
    universityId: party.universityId,
    year: party.year,
    visibility: party.visibility,
    createdAt: party.createdAt,
    archivedAt: party.archivedAt,
    members: members.map((member) => ({
      userId: member.userId,
      displayName: names.get(member.userId) ?? 'Student',
      role: member.role,
      joinedAt: member.joinedAt,
    })),
  }
}

/** Parties this student hosts or has joined, most recent first. */
export async function myParties(userId) {
  const [rows] = await pool.query(
    `SELECT p.id, p.code, p.name, p.host_user_id AS hostUserId, p.visibility,
            p.created_at AS createdAt, p.archived_at AS archivedAt,
            (SELECT COUNT(*) FROM study_party_members pm WHERE pm.party_id = p.id) AS members
       FROM study_parties p
       JOIN study_party_members m ON m.party_id = p.id AND m.user_id = ?
      ORDER BY p.created_at DESC
      LIMIT 30`,
    [userId],
  )
  return rows.map((row) => ({
    id: row.id,
    code: row.code,
    name: row.name,
    isHost: row.hostUserId === userId,
    visibility: row.visibility,
    createdAt: row.createdAt,
    archivedAt: row.archivedAt,
    members: Number(row.members),
  }))
}

/**
 * Parties this student could stumble onto while browsing: open, in their own
 * cohort, not archived. The cohort narrows the SQL for efficiency; `visibleTo`
 * still makes the actual call, so the browsable list can never drift from the
 * rule that decides it.
 */
export async function openParties(userId) {
  const cohort = await cohortFor(userId)
  if (!cohort) return []

  const [rows] = await pool.query(
    `SELECT p.id, p.code, p.name, p.host_user_id AS hostUserId, p.university_id AS universityId, p.year,
            p.visibility, p.created_at AS createdAt, p.archived_at AS archivedAt,
            (SELECT COUNT(*) FROM study_party_members pm WHERE pm.party_id = p.id) AS members
       FROM study_parties p
      WHERE p.university_id = ? AND p.year = ?
        -- "Open in your year" is a list of parties to join. One you are already
        -- in is not an invitation, and offering to let someone join a party they
        -- are standing in reads as a bug.
        AND NOT EXISTS (
          SELECT 1 FROM study_party_members pm
           WHERE pm.party_id = p.id AND pm.user_id = ?
        )`,
    [cohort.universityId, cohort.year, userId],
  )
  const candidates = rows.map((row) => ({
    id: row.id,
    code: row.code,
    name: row.name,
    hostUserId: row.hostUserId,
    universityId: row.universityId,
    year: row.year,
    visibility: row.visibility,
    createdAt: row.createdAt,
    archivedAt: row.archivedAt,
    members: Number(row.members),
  }))
  return visibleTo(candidates, cohort).map((party) => ({
    id: party.id,
    code: party.code,
    name: party.name,
    hostUserId: party.hostUserId,
    createdAt: party.createdAt,
    members: party.members,
  }))
}

export async function leaveParty(userId, partyId) {
  const [rows] = await pool.query('SELECT host_user_id AS hostUserId FROM study_parties WHERE id = ?', [partyId])
  if (!rows.length) return { ok: false, reason: 'not_found' }
  // The host leaving would strand the party without one; archiving it (a
  // later slice's concern) is the host's way out, not this.
  if (rows[0].hostUserId === userId) return { ok: false, reason: 'host_cannot_leave' }
  await pool.query('DELETE FROM study_party_members WHERE party_id = ? AND user_id = ?', [partyId, userId])
  return { ok: true }
}

function parseItemRefs(raw) {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Freeze a mixed set of items into a session: questions, practicals and
 * essays worked through together but marked apart, per `partyRules.tally`.
 *
 * Only a member may start one — a party's work is not something a stranger
 * with the id gets to hand the group. Every item is re-checked against the
 * published snapshot at the moment of freezing, the same way `createRoom`
 * only ever freezes questions that exist and are published; an item that is
 * unpublished, deleted, or was never real is silently dropped rather than
 * failing the whole request, again matching `createRoom`.
 */
export async function createSession(userId, partyId, { name, items, startsAt }) {
  if (!(await isPartyMember(partyId, userId))) return { ok: false, reason: 'not_a_member' }

  const wanted = Array.isArray(items) ? items : []
  const published = await publishedQuestions()
  const ledgerIds = await publishedLedgerIdsByKind(['practical', 'essay'])

  const seen = new Set()
  const frozen = []
  for (const item of wanted) {
    if (frozen.length >= MAX_SESSION_ITEMS) break
    const kind = item?.kind
    const id = item?.id
    if (!id || (kind !== 'question' && kind !== 'practical' && kind !== 'essay')) continue
    const exists = kind === 'question' ? published.has(id) : ledgerIds.get(kind).has(id)
    if (!exists) continue
    const key = `${kind}:${id}`
    if (seen.has(key)) continue
    seen.add(key)
    frozen.push({ kind, id })
  }
  if (!frozen.length) return { ok: false, reason: 'no_items' }

  // `startsAt` is stored as a real Date, not the raw client string: mysql2
  // formats a Date correctly for a DATETIME column, where an ISO string with
  // a trailing `Z` is not guaranteed to be.
  const starts = startsAt ? new Date(startsAt) : null
  if (starts && Number.isNaN(starts.getTime())) return { ok: false, reason: 'invalid_starts_at' }

  const id = randomUUID()
  const status = sessionState({ startsAt: starts, closedAt: null })
  await pool.query(
    `INSERT INTO study_party_sessions (id, party_id, name, item_refs, starts_at, status, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, partyId, String(name || 'Study session').slice(0, 255), JSON.stringify(frozen), starts, status, userId],
  )
  return { ok: true, session: await sessionFor(userId, id) }
}

/** The party's sessions, most recent first, with state derived per `sessionState`. */
export async function sessionsFor(userId, partyId) {
  if (!(await isPartyMember(partyId, userId))) return []

  const [rows] = await pool.query(
    `SELECT id, name, item_refs AS itemRefs, starts_at AS startsAt, closed_at AS closedAt,
            created_by AS createdBy, created_at AS createdAt
       FROM study_party_sessions WHERE party_id = ? ORDER BY created_at DESC`,
    [partyId],
  )
  return rows.map((row) => {
    const itemRefs = parseItemRefs(row.itemRefs)
    return {
      id: row.id,
      name: row.name,
      itemCount: itemRefs.length,
      startsAt: row.startsAt,
      closedAt: row.closedAt,
      createdBy: row.createdBy,
      isMine: row.createdBy === userId,
      createdAt: row.createdAt,
      state: sessionState({ startsAt: row.startsAt, closedAt: row.closedAt }),
    }
  })
}

/**
 * A session as one member may see it: the caller's own answers always, and
 * every member's `tally` — marked apart from practised, never averaged
 * together, per `partyRules.tally`.
 *
 * A non-member gets null, exactly as `roomFor` does for a non-member room —
 * whether a session exists is not something a stranger should be able to
 * probe by id.
 */
export async function sessionFor(userId, sessionId) {
  const [rows] = await pool.query(
    `SELECT id, party_id AS partyId, name, item_refs AS itemRefs, starts_at AS startsAt,
            closed_at AS closedAt, created_by AS createdBy, created_at AS createdAt
       FROM study_party_sessions WHERE id = ?`,
    [sessionId],
  )
  if (!rows.length) return null
  const session = rows[0]
  if (!(await isPartyMember(session.partyId, userId))) return null

  const itemRefs = parseItemRefs(session.itemRefs)

  const [members] = await pool.query(
    'SELECT user_id AS userId, joined_at AS joinedAt FROM study_party_members WHERE party_id = ? ORDER BY joined_at',
    [session.partyId],
  )
  const names = await displayNamesFor(members.map((member) => member.userId))

  const [answerRows] = await pool.query(
    `SELECT user_id AS userId, item_kind AS itemKind, item_id AS itemId, correct, seconds, answered_at AS answeredAt
       FROM study_party_answers WHERE session_id = ?`,
    [sessionId],
  )
  // MariaDB's TINYINT(1) comes back as 0/1/null; `tally` tests `correct ===
  // true`, so a bare 1 would never match and every session would look
  // unmarked. NULL must stay null — that is the practical/essay signal, not
  // a false.
  const answers = answerRows.map((row) => ({
    userId: row.userId,
    itemKind: row.itemKind,
    itemId: row.itemId,
    correct: row.correct === null ? null : Boolean(row.correct),
    seconds: row.seconds,
  }))
  const mine = answers.filter((answer) => answer.userId === userId)

  return {
    id: session.id,
    partyId: session.partyId,
    name: session.name,
    itemRefs,
    itemCount: itemRefs.length,
    startsAt: session.startsAt,
    closedAt: session.closedAt,
    createdBy: session.createdBy,
    isMine: session.createdBy === userId,
    createdAt: session.createdAt,
    state: sessionState({ startsAt: session.startsAt, closedAt: session.closedAt }),
    myAnswers: mine.map((answer) => ({ kind: answer.itemKind, id: answer.itemId, correct: answer.correct, seconds: answer.seconds })),
    members: members.map((member) => ({
      userId: member.userId,
      displayName: names.get(member.userId) ?? 'Student',
      tally: tally(answers.filter((answer) => answer.userId === member.userId)),
    })),
  }
}

/**
 * Record one member's answer to one item.
 *
 * For a question, `correct` is decided here against the published snapshot
 * and whatever the client claims about it is ignored outright — a score
 * other members compare against must never be self-reported. For a
 * practical or essay item, `correct` is always stored `null`: those are
 * self-checked by the student who did them, which is the whole reason a
 * session reports two numbers and never averages them.
 */
export async function answerItem(userId, sessionId, { kind, id, chosenIndex, seconds }) {
  const [rows] = await pool.query(
    `SELECT party_id AS partyId, item_refs AS itemRefs, starts_at AS startsAt, closed_at AS closedAt
       FROM study_party_sessions WHERE id = ?`,
    [sessionId],
  )
  if (!rows.length) return { ok: false, reason: 'not_found' }
  const session = rows[0]
  if (!(await isPartyMember(session.partyId, userId))) return { ok: false, reason: 'not_a_member' }

  // `sessionState` decides this, not the client and not a stale `status`
  // column: a scheduled session that has quietly turned open must start
  // accepting answers the instant it does, with nobody having written
  // anything, and a closed session must never accept one again.
  const state = sessionState({ startsAt: session.startsAt, closedAt: session.closedAt })
  if (state !== 'open') return { ok: false, reason: state === 'scheduled' ? 'not_started' : 'closed' }

  const itemRefs = parseItemRefs(session.itemRefs)
  if (!itemRefs.some((ref) => ref.kind === kind && ref.id === id)) return { ok: false, reason: 'not_in_session' }

  let correct = null
  let correctIndex
  if (kind === 'question') {
    const published = await publishedQuestions()
    const question = published.get(id)
    if (!question) return { ok: false, reason: 'question_gone' }
    correct = question.correctIndex >= 0 && Number(chosenIndex) === question.correctIndex
    correctIndex = question.correctIndex
  }
  // practical and essay items fall through with `correct` left null: they
  // are self-checked, never marked here, whatever `chosenIndex` says.

  await pool.query(
    `INSERT INTO study_party_answers (session_id, user_id, item_kind, item_id, correct, seconds)
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE correct = VALUES(correct), seconds = VALUES(seconds), answered_at = CURRENT_TIMESTAMP`,
    [sessionId, userId, kind, id, kind === 'question' ? (correct ? 1 : 0) : null, seconds ?? null],
  )
  return kind === 'question' ? { ok: true, correct, correctIndex } : { ok: true, correct: null }
}

/** Close a session early. Only the host of its party or the member who created it may. */
export async function closeSession(userId, sessionId) {
  const [rows] = await pool.query(
    `SELECT s.party_id AS partyId, s.created_by AS createdBy, s.closed_at AS closedAt,
            p.host_user_id AS hostUserId
       FROM study_party_sessions s JOIN study_parties p ON p.id = s.party_id
      WHERE s.id = ?`,
    [sessionId],
  )
  if (!rows.length) return { ok: false, reason: 'not_found' }
  const row = rows[0]
  if (row.createdBy !== userId && row.hostUserId !== userId) return { ok: false, reason: 'not_allowed' }

  if (!row.closedAt) {
    await pool.query(
      "UPDATE study_party_sessions SET closed_at = CURRENT_TIMESTAMP, status = 'closed' WHERE id = ? AND closed_at IS NULL",
      [sessionId],
    )
  }
  return { ok: true, session: await sessionFor(userId, sessionId) }
}
