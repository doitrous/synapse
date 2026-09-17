import { resolveActivityAudience,mayAccessActivity,activityMembership,canSeeActivity } from './roomActivityScope.js'
import { tableForSeat } from '../shared/roomLayouts.js'
import { ROOM_LAYOUTS, roomLayout } from '../shared/roomLayouts.js'
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
import { notifyRoomPresence, closeRoomVoice } from './roomsRealtime.js'
import { canJoin, visibleTo, sessionState, tally } from './partyRules.js'
import {
  activityAfter, firstFreeSeatIndex, normalizeActivity, normalizeSeatInput, seatFromRow, seatIndexTaken,
} from './roomSeats.js'
import { publishedQuestions } from './publishedQuestions.js'
import { withContentCatalogueGate } from './contentCatalogueGate.js'
import { MEDIA_STATE_KEY } from './mediaLibrary.js'
import { redactLedgerForStudent, releasedMediaIdsFromDocument } from './studentLedger.js'

/** No 0/O/1/I/L — a code gets read aloud and typed by hand. */
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 6

/** Longest a session may be. Same ceiling as a study room, same reason. */
const MAX_SESSION_ITEMS = 40

// The same admin-authored ledger `publishedQuestions.js` freezes questions
// from. Practical and essay items live in the same document; there is no
// per-kind table for them to be looked up in instead.
const LEDGER_KEY = 'nishany-admin-content-ledger-v4'

function newCode() {
  let code = ''
  for (let i = 0; i < CODE_LENGTH; i++) code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
  return code
}

async function displayNamesFor(userIds) {
  if (!userIds.length) return new Map()
  const [rows] = await pool.query(
    `SELECT a.user_id, COALESCE(s.name, s.email, a.email) AS name, s.status_message
       FROM user_access a LEFT JOIN students s ON s.user_id = a.user_id
      WHERE a.user_id IN (?)`,
    [userIds],
  )
  const names = new Map()
  for (const row of rows) {
    names.set(row.user_id, {
      name: row.name ? String(row.name).split('@')[0] : 'Student',
      statusMessage: row.status_message ?? null,
    })
  }
  return names
}

/**
 * Each member's all-time cumulative study minutes, from the same per-minute
 * ledger `maristanaOverview` totals for one student (`maristana_study_minutes`
 * — one accepted row per active minute, anywhere in the app, not just in a
 * room). Batched by the room's own member ids, the same shape `displayNamesFor`
 * already queries in, so a twenty-person room stays one extra query rather
 * than one per member.
 */
async function studyMinutesFor(userIds) {
  if (!userIds.length) return new Map()
  const [rows] = await pool.query(
    'SELECT user_id AS userId, COUNT(*) AS minutes FROM maristana_study_minutes WHERE user_id IN (?) GROUP BY user_id',
    [userIds],
  )
  return new Map(rows.map((row) => [row.userId, Number(row.minutes)]))
}

/**
 * Every member row of one party, seat columns included, in join order.
 *
 * One query in one place: the party read, the seat write and the realtime
 * presence broadcast all show the same room, and a column added to the seat
 * has one line to change rather than three that can drift apart.
 */
async function memberRows(partyId) {
  const [rows] = await pool.query(
    `SELECT user_id AS userId, role, joined_at AS joinedAt,
            seat_desk AS seatDesk, seat_device AS seatDevice, seat_chair AS seatChair,
            seat_index AS seatIndex, activity,
            -- Measured by the database against its own clock, so a DATETIME
            -- column, the driver and this process cannot disagree about what
            -- timezone the heartbeat was in. See activityAfter in roomSeats.js.
            TIMESTAMPDIFF(SECOND, last_active_at, NOW()) AS activeAgoSeconds
       FROM study_party_members
      WHERE party_id = ?
      ORDER BY joined_at`,
    [partyId],
  )
  return rows
}

/**
 * One member as the room may see them.
 *
 * `activity` is what the row *means* now rather than what it last claimed —
 * `activityAfter` expires a stale heartbeat against the database's own clock —
 * while `lastActiveAt` is rebuilt as a UTC instant, so the browser can make the
 * same judgement on its own clock rather than trusting ours.
 */
function memberView(row, names, studyMinutes) {
  const age = row.activeAgoSeconds
  const info = names.get(row.userId)
  return {
    userId: row.userId,
    displayName: info?.name ?? 'Student',
    statusMessage: info?.statusMessage ?? null,
    role: row.role,
    joinedAt: row.joinedAt,
    seat: seatFromRow(row),
    // Rebuilt from the age rather than passed through from the column, so what
    // the browser receives is an unambiguous UTC instant it can compare against
    // its own clock — which is exactly what the hall does with it.
    lastActiveAt: age === null || age === undefined
      ? null
      : new Date(Date.now() - Number(age) * 1000).toISOString(),
    activity: activityAfter(row.activity, age),
    // Cumulative, all-time, the same number Maristanas shows this student for
    // themselves — not minutes in this room alone. 0 rather than undefined for
    // a member who has never sent a heartbeat, so the room can show "0m" instead
    // of hiding the figure.
    totalStudyMinutes: studyMinutes.get(row.userId) ?? 0,
  }
}

/**
 * The members of a party, for a caller who is one of them.
 *
 * Exported for `roomsRealtime.js`: a presence broadcast is the same list the
 * party read returns, and building it twice is how two views of one room start
 * disagreeing about who is in it. A non-member gets null, exactly as
 * `partyFor` does — the socket refuses on that, and so does every route.
 */
export async function partyMembers(partyId, userId) {
  const rows = await memberRows(partyId)
  if (!rows.some((row) => row.userId === userId)) return null
  const ids = rows.map((row) => row.userId)
  const [names, studyMinutes] = await Promise.all([displayNamesFor(ids), studyMinutesFor(ids)])
  return rows.map((row) => memberView(row, names, studyMinutes))
}

/**
 * The whole room, read on the server's own authority.
 *
 * No caller, and therefore no caller's identity: this is what the realtime hub
 * uses to decide *who may still be here*, and reading it as one of the sockets
 * would make the answer depend on which socket happened to be first in a Set —
 * and a socket whose owner has since left the party returns null, which used to
 * silence presence for the entire room.
 *
 * `archivedAt` comes back with the members because a socket has to be closed
 * when the room is archived, and the party record is the only place that says
 * so. Returns null for a party that does not exist.
 */
export async function roomSnapshot(partyId) {
  const [parties] = await pool.query(
    'SELECT id, code, name, layout_key AS layoutKey, archived_at AS archivedAt FROM study_parties WHERE id = ? LIMIT 1',
    [partyId],
  )
  if (!parties.length) return null
  const rows = await memberRows(partyId)
  const ids = rows.map((row) => row.userId)
  const [names, studyMinutes] = await Promise.all([displayNamesFor(ids), studyMinutesFor(ids)])
  return {
    id: parties[0].id,
    code: parties[0].code,
    name: parties[0].name, layoutKey:parties[0].layoutKey,
    archivedAt: parties[0].archivedAt ?? null,
    members: rows.map((row) => memberView(row, names, studyMinutes)),
  }
}

/**
 * The party id behind whatever the caller put in the path.
 *
 * A room is addressed by its code in the browser — a code is what a student
 * reads aloud and types — and by its id in every route that existed before
 * this one. Both are accepted here so neither has to be translated by the
 * caller, and neither existing route changes. Returns null for a party nobody
 * can name, which every caller answers exactly as it answers "not a member".
 */
export async function resolvePartyId(ref) {
  const raw = String(ref ?? '').trim()
  if (!raw) return null
  const [byId] = await pool.query('SELECT id FROM study_parties WHERE id = ? LIMIT 1', [raw])
  if (byId.length) return byId[0].id
  const [byCode] = await pool.query('SELECT id FROM study_parties WHERE code = ? LIMIT 1', [raw.toUpperCase()])
  return byCode.length ? byCode[0].id : null
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
  const [rows] = await pool.query('SELECT k, v FROM app_state WHERE k IN (?, ?)', [LEDGER_KEY, MEDIA_STATE_KEY])
  try {
    const ledgerRow = rows.find((row) => row.k === LEDGER_KEY)
    const mediaRow = rows.find((row) => row.k === MEDIA_STATE_KEY)
    const media = mediaRow ? JSON.parse(mediaRow.v) : { records: [] }
    const ledger = redactLedgerForStudent(
      ledgerRow ? JSON.parse(ledgerRow.v) : [],
      releasedMediaIdsFromDocument(media),
    )
    for (const item of ledger) {
      if (byKind.has(item?.kind)) byKind.get(item.kind).add(item.id)
    }
  } catch {
    // A malformed ledger or media document yields nothing published rather
    // than freezing content whose required asset is unavailable.
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
export async function cohortFor(userId) {
  const [rows] = await pool.query(
    'SELECT university_id AS universityId, year FROM students WHERE user_id = ? LIMIT 1',
    [userId],
  )
  const row = rows[0]
  if (!row?.universityId || !row?.year) return null
  return { universityId: row.universityId, year: row.year }
}

export async function createParty(userId, { name, layoutKey='campus', scope='cohort', visibility='open' }) {
  if(!Object.hasOwn(ROOM_LAYOUTS,layoutKey)||!['cohort','university','global'].includes(scope)||!['open','invite'].includes(visibility))return {ok:false,reason:'invalid_room_options'}
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
        `INSERT INTO study_parties (id, code, name, host_user_id, university_id, year, layout_key, room_scope, visibility)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, code, String(name || 'Study party').slice(0, 255), userId, cohort.universityId, cohort.year, layoutKey, scope, visibility],
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
    `SELECT id, university_id AS universityId, year, visibility, layout_key AS layoutKey, room_scope AS scope, archived_at AS archivedAt
       FROM study_parties WHERE code = ?`,
    [code],
  )
  // A code that matches nothing stands in for a party in nobody's cohort, so
  // it fails `canJoin` the same way a real party in someone else's cohort
  // does — wrong code and wrong cohort must look the same from outside.
  const party = rows[0] ?? { universityId: null, year: null, archivedAt: null }
  const verdict = canJoin(party, cohort)
  if (!verdict.ok) return verdict

  const conn=await pool.getConnection()
  try {
    await conn.beginTransaction()
    await conn.query('SELECT id FROM study_parties WHERE id = ? FOR UPDATE',[party.id])
    const [members]=await conn.query('SELECT user_id AS userId FROM study_party_members WHERE party_id = ?',[party.id])
    if(!members.some(m=>m.userId===userId)){
      if(members.length>=roomLayout(party.layoutKey).capacity){await conn.rollback();return {ok:false,reason:'room_full'}}
      await conn.query("INSERT INTO study_party_members (party_id,user_id,role) VALUES (?,?,'member')",[party.id,userId])
    }
    await conn.commit()
  }catch(error){await conn.rollback();throw error}finally{conn.release()}
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
 * Change who a room is for, after it was created.
 *
 * Creation is the only place scope used to be set, so a room made before the
 * global option existed — or made without changing the default — was stuck at
 * its original audience for good: a room the host wanted open to every
 * university simply never appeared outside their own. The host can now widen
 * or narrow it here. The stored `university_id`/`year` (the host's own cohort
 * at creation) stay put; only which of them the audience test consults
 * changes. Host-only, exactly like visibility.
 */
export async function setScope(userId, partyId, scope) {
  if (!['cohort', 'university', 'global'].includes(scope)) return { ok: false, reason: 'invalid_room_scope' }
  const [rows] = await pool.query('SELECT host_user_id AS hostUserId FROM study_parties WHERE id = ?', [partyId])
  if (!rows.length) return { ok: false, reason: 'not_found' }
  if (rows[0].hostUserId !== userId) return { ok: false, reason: 'not_host' }
  await pool.query('UPDATE study_parties SET room_scope = ? WHERE id = ?', [scope, partyId])
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
            visibility, layout_key AS layoutKey, room_scope AS scope, created_at AS createdAt, archived_at AS archivedAt
       FROM study_parties WHERE id = ?`,
    [partyId],
  )
  if (!parties.length) return null
  const party = parties[0]

  const members = await memberRows(partyId)
  const me = members.find((member) => member.userId === userId) ?? null
  if (!me) return null

  const memberIds = members.map((member) => member.userId)
  const [names, studyMinutes] = await Promise.all([displayNamesFor(memberIds), studyMinutesFor(memberIds)])

  return {
    id: party.id,
    code: party.code,
    name: party.name,
    hostUserId: party.hostUserId,
    isHost: party.hostUserId === userId,
    universityId: party.universityId,
    year: party.year,
    visibility: party.visibility, layoutKey:party.layoutKey, scope:party.scope, capacity:roomLayout(party.layoutKey).capacity,
    createdAt: party.createdAt,
    archivedAt: party.archivedAt,
    members: members.map((member) => memberView(member, names, studyMinutes)),
  }
}

/** Parties this student hosts or has joined, most recent first. */
export async function myParties(userId) {
  const [rows] = await pool.query(
    `SELECT p.id, p.code, p.name, p.host_user_id AS hostUserId, p.visibility, p.layout_key AS layoutKey, p.room_scope AS scope,
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
    visibility: row.visibility, layoutKey:row.layoutKey, scope:row.scope, capacity:roomLayout(row.layoutKey).capacity,
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
  // A global room is open to everyone, cohort or not — so a student who has not
  // finished setting their university and year still sees the platform-wide
  // rooms. Only the university/cohort lists need a cohort to match against;
  // absent one, the first branch (`? IS NOT NULL` = false) drops them and
  // global rooms are all that remain. This used to `return []` here, which
  // hid every room — global included — from anyone without a year on file.
  const universityId = cohort?.universityId ?? null
  const year = cohort?.year ?? null

  const [rows] = await pool.query(
    `SELECT p.id, p.code, p.name, p.host_user_id AS hostUserId, p.university_id AS universityId, p.year,
            p.visibility, p.layout_key AS layoutKey, p.room_scope AS scope, p.created_at AS createdAt, p.archived_at AS archivedAt,
            (SELECT COUNT(*) FROM study_party_members pm WHERE pm.party_id = p.id) AS members
       FROM study_parties p
      WHERE (p.room_scope = 'global' OR (? IS NOT NULL AND p.university_id = ? AND (p.room_scope = 'university' OR p.year = ?)))
        -- "Open in your year" is a list of parties to join. One you are already
        -- in is not an invitation, and offering to let someone join a party they
        -- are standing in reads as a bug.
        AND NOT EXISTS (
          SELECT 1 FROM study_party_members pm
           WHERE pm.party_id = p.id AND pm.user_id = ?
        )`,
    [universityId, universityId, year, userId],
  )
  const candidates = rows.map((row) => ({
    id: row.id,
    code: row.code,
    name: row.name,
    hostUserId: row.hostUserId,
    universityId: row.universityId,
    year: row.year,
    visibility: row.visibility, layoutKey:row.layoutKey, scope:row.scope, capacity:roomLayout(row.layoutKey).capacity,
    createdAt: row.createdAt,
    archivedAt: row.archivedAt,
    members: Number(row.members),
  }))
  return visibleTo(candidates, cohort ?? { universityId: null, year: null }).map((party) => ({
    id: party.id,
    code: party.code,
    name: party.name,
    hostUserId: party.hostUserId,
    createdAt: party.createdAt,
    members: party.members, layoutKey:party.layoutKey, scope:party.scope, capacity:party.capacity,
  }))
}

export async function leaveParty(userId, partyId) {
  const [rows] = await pool.query('SELECT host_user_id AS hostUserId FROM study_parties WHERE id = ?', [partyId])
  if (!rows.length) return { ok: false, reason: 'not_found' }
  // The host leaving would strand the party without one; archiving it (a
  // later slice's concern) is the host's way out, not this.
  if (rows[0].hostUserId === userId) return { ok: false, reason: 'host_cannot_leave' }
  await pool.query('DELETE FROM study_party_members WHERE party_id = ? AND user_id = ?', [partyId, userId])
  // The room finds out now, not on its next sweep. Without this a student who
  // left keeps a socket that is still handed every roster, every seat change
  // and every producer in a room they are no longer in.
  notifyRoomPresence(partyId)
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
async function createSessionUnlocked(userId, partyId, { name, items, startsAt, scope='room' }) {
  const audience=await resolveActivityAudience(userId,partyId,scope)
  if(!audience.ok)return audience

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
    `INSERT INTO study_party_sessions (id, party_id, name, item_refs, starts_at, status, created_by, table_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, partyId, String(name || 'Study session').slice(0, 255), JSON.stringify(frozen), starts, status, userId, audience.tableId],
  )
  return { ok: true, session: await sessionFor(userId, id) }
}

export async function createSession(userId, partyId, input) {
  return withContentCatalogueGate(() => createSessionUnlocked(userId, partyId, input))
}

/** The party's sessions, most recent first, with state derived per `sessionState`. */
export async function sessionsFor(userId, partyId) {
  if (!(await isPartyMember(partyId, userId))) return []

  const [rows] = await pool.query(
    `SELECT id, name, table_id AS tableId, item_refs AS itemRefs, starts_at AS startsAt, closed_at AS closedAt,
            created_by AS createdBy, created_at AS createdAt
       FROM study_party_sessions WHERE party_id = ? ORDER BY created_at DESC`,
    [partyId],
  )
  const membership=await activityMembership(userId,partyId)
  if(!membership)return []
  return rows.filter(row=>canSeeActivity(row.tableId,membership.tableId)).map((row) => {
    const itemRefs = parseItemRefs(row.itemRefs)
    return {
      id: row.id,
      name: row.name, tableId:row.tableId,
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
    `SELECT id, party_id AS partyId, name, table_id AS tableId, item_refs AS itemRefs, starts_at AS startsAt,
            closed_at AS closedAt, created_by AS createdBy, created_at AS createdAt
       FROM study_party_sessions WHERE id = ?`,
    [sessionId],
  )
  if (!rows.length) return null
  const session = rows[0]
  if (!(await mayAccessActivity(userId,session.partyId,session.tableId))) return null

  const membership=await activityMembership(userId,session.partyId)
  if(!membership)return null
  const itemRefs = parseItemRefs(session.itemRefs)

  const [members] = await pool.query(
    'SELECT user_id AS userId, seat_index AS seatIndex, joined_at AS joinedAt FROM study_party_members WHERE party_id = ? ORDER BY joined_at',
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
    name: session.name, tableId:session.tableId,
    itemRefs,
    itemCount: itemRefs.length,
    startsAt: session.startsAt,
    closedAt: session.closedAt,
    createdBy: session.createdBy,
    isMine: session.createdBy === userId,
    createdAt: session.createdAt,
    state: sessionState({ startsAt: session.startsAt, closedAt: session.closedAt }),
    myAnswers: mine.map((answer) => ({ kind: answer.itemKind, id: answer.itemId, correct: answer.correct, seconds: answer.seconds })),
    members: members.filter(member=>!session.tableId||tableForSeat(member.seatIndex,membership.layoutKey)===session.tableId).map((member) => ({
      userId: member.userId,
      // `displayNamesFor` returns { name, statusMessage }, not a bare string —
      // handing the whole object to the client made <Avatar name> call
      // .split on an object ("e.split is not a function") and took the whole
      // Study-together screen down. Read the name the way memberView does.
      displayName: names.get(member.userId)?.name ?? 'Student',
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
    `SELECT party_id AS partyId, table_id AS tableId, item_refs AS itemRefs, starts_at AS startsAt, closed_at AS closedAt
       FROM study_party_sessions WHERE id = ?`,
    [sessionId],
  )
  if (!rows.length) return { ok: false, reason: 'not_found' }
  const session = rows[0]
  if (!(await mayAccessActivity(userId,session.partyId,session.tableId))) return { ok: false, reason: 'not_found' }

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

/* ── Seats and activity ──────────────────────────────────────────────────── */

/**
 * Where a member sits, and what their desk looks like.
 *
 * Only a member of the party may move, and only within it — a party id from
 * somebody else's room is answered the same way a party that does not exist
 * is, so a guessed id cannot be used to learn that a room is real.
 *
 * A desk somebody else is already at is refused (409 at the route). The check
 * is made twice on purpose: once by reading, so the common case has a clear
 * refusal, and once by the unique index, because between the read and the
 * write another student can sit down. The index is the one that is actually
 * true; the read only makes the answer friendlier.
 *
 * `seatIndex: null` is a real request, not an omission — it unseats a member
 * who is still in the room, which is what leaving the hall open in another tab
 * amounts to.
 */
export async function setSeat(userId, partyRef, input) {
  const partyId = await resolvePartyId(partyRef)
  if (!partyId) return { ok: false, reason: 'not_found' }
  if (!(await isPartyMember(partyId, userId))) return { ok: false, reason: 'not_a_member' }

  const [settings]=await pool.query('SELECT layout_key AS layoutKey FROM study_parties WHERE id = ?',[partyId])
  const parsed = normalizeSeatInput(input,roomLayout(settings[0]?.layoutKey).capacity)
  if (!parsed.ok) return parsed

  const seatIndex = parsed.seat.seatIndex
  const moving = seatIndex !== undefined
  if (moving) {
    const members = await memberRows(partyId)
    if (seatIndexTaken(members.map((row) => ({ userId: row.userId, seatIndex: row.seatIndex })), seatIndex, userId)) {
      return { ok: false, reason: 'seat_taken' }
    }
  }

  // Only the columns the caller actually named. An omitted piece is not a
  // choice to erase one, so it does not appear in the SET list at all — which
  // is the difference between "move me to desk 7" and "move me to desk 7 and
  // throw away my furniture".
  const sets = []
  const values = []
  for (const [column, value] of [
    ['seat_desk', parsed.seat.desk],
    ['seat_device', parsed.seat.device],
    ['seat_chair', parsed.seat.chair],
    ['seat_index', seatIndex],
  ]) {
    if (value === undefined) continue
    sets.push(`${column} = ?`)
    values.push(value)
  }
  // Nothing named at all is a no-op, not an UPDATE with an empty SET list.
  if (!sets.length) return { ok: true, partyId, party: await partyFor(userId, partyId) }

  try {
    await pool.query(
      `UPDATE study_party_members SET ${sets.join(', ')} WHERE party_id = ? AND user_id = ?`,
      [...values, partyId, userId],
    )
  } catch (error) {
    // Somebody sat down between the read above and this write.
    if (error?.code === 'ER_DUP_ENTRY') return { ok: false, reason: 'seat_taken' }
    throw error
  }

  if(moving)closeRoomVoice(partyId,userId)
  return { ok: true, partyId, party: await partyFor(userId, partyId) }
}

/**
 * Seat a member who has arrived without a desk.
 *
 * Called when somebody opens a room they are already in: they should appear
 * somewhere rather than nowhere, and the desk they had last time is the one
 * they keep. Returns the seat index they now hold, or null when the room is
 * full — twenty desks is the room, and inventing a twenty-first would draw a
 * person standing in the wall.
 *
 * Silent about a race: two students arriving at once may both aim at desk 4,
 * and the loser is simply retried onto the next free desk rather than shown an
 * error for something they did not ask for.
 */
export async function ensureSeated(userId, partyId) {
  const [settings]=await pool.query('SELECT layout_key AS layoutKey FROM study_parties WHERE id = ?',[partyId])
  const capacity=roomLayout(settings[0]?.layoutKey).capacity
  for (let attempt = 0; attempt < 3; attempt++) {
    const members = await memberRows(partyId)
    const me = members.find((row) => row.userId === userId)
    if (!me) return null
    if (Number.isInteger(me.seatIndex)) return me.seatIndex

    const free = firstFreeSeatIndex(
      members.map((row) => ({ userId: row.userId, seatIndex: row.seatIndex })),
      userId, capacity,
    )
    if (free === null) return null
    try {
      await pool.query(
        'UPDATE study_party_members SET seat_index = ? WHERE party_id = ? AND user_id = ? AND seat_index IS NULL',
        [free, partyId, userId],
      )
      return free
    } catch (error) {
      if (error?.code !== 'ER_DUP_ENTRY') throw error
    }
  }
  return null
}

/**
 * "I am still here, and this is what I am doing."
 *
 * Stores the moment as the server's own `NOW()` rather than anything the
 * client sends: a browser with a wrong clock would otherwise be permanently
 * idle or permanently studying, and every reader compares these stamps against
 * each other.
 */
export async function recordActivity(userId, partyRef, activity) {
  const partyId = await resolvePartyId(partyRef)
  if (!partyId) return { ok: false, reason: 'not_found' }
  const [result] = await pool.query(
    'UPDATE study_party_members SET last_active_at = NOW(), activity = ? WHERE party_id = ? AND user_id = ?',
    [normalizeActivity(activity), partyId, userId],
  )
  if (!result.affectedRows) return { ok: false, reason: 'not_a_member' }
  return { ok: true, partyId, activity: normalizeActivity(activity) }
}
