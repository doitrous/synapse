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
import { canJoin, visibleTo } from './partyRules.js'

/** No 0/O/1/I/L — a code gets read aloud and typed by hand. */
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 6

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

/**
 * A student's own cohort, read from their record — never from anything a
 * client sends. Null when either field is unset, so a caller can refuse
 * rather than silently confining a party to `null`, which `visibleTo` would
 * happily match against every other unenrolled student.
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
      WHERE p.university_id = ? AND p.year = ?`,
    [cohort.universityId, cohort.year],
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
