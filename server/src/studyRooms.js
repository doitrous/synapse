/**
 * Study Together — a shared test that actually exists.
 *
 * The page it serves was a mock end to end: "Start test" toggled a boolean,
 * room codes came from `Math.random()` and were registered nowhere, "Join"
 * accepted any four characters, and the lobby showed three hardcoded
 * classmates. Nothing on the other side of a shared code existed, because
 * there was no other side.
 *
 * The model here is deliberately asynchronous. Everyone answers the same
 * frozen set at their own pace and results open when they finish. Live
 * per-question synchrony would need websockets and a whole class of
 * reconnection behaviour for very little more than this delivers.
 */
import { randomUUID } from 'node:crypto'
import { pool } from './db.js'

const LEDGER_KEY = 'synapse-admin-content-ledger-v4'

/** Longest a room may be. Enough for a full paper, short of an endurance test. */
const MAX_QUESTIONS = 40

/** No 0/O/1/I/L — a code gets read aloud and typed by hand. */
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 6

/* The published question set, cached and invalidated on ledger writes — the
   same shape as the medical-resource snapshot above it in index.js. */
let questionSnapshot = null

export function invalidateStudyRoomSnapshot(key) {
  if (key === LEDGER_KEY) questionSnapshot = null
}

async function publishedQuestions() {
  if (questionSnapshot) return questionSnapshot
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [LEDGER_KEY])
  const byId = new Map()
  if (rows.length) {
    try {
      const ledger = JSON.parse(rows[0].v)
      for (const item of Array.isArray(ledger) ? ledger : []) {
        if (item?.kind !== 'question' || item.status !== 'Published') continue
        const answers = item.questionData?.answers ?? []
        byId.set(item.id, {
          id: item.id,
          title: item.title,
          // The index of the correct option, or -1 when the author marked none.
          correctIndex: answers.findIndex((answer) => answer?.correct),
          optionCount: answers.length,
        })
      }
    } catch {
      // A malformed ledger yields an empty set rather than a thrown request.
    }
  }
  questionSnapshot = byId
  return byId
}

function newCode() {
  let code = ''
  for (let i = 0; i < CODE_LENGTH; i++) code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
  return code
}

async function displayNameFor(userId) {
  const [rows] = await pool.query(
    'SELECT COALESCE(s.name, s.email, a.email) AS name FROM user_access a LEFT JOIN students s ON s.user_id = a.user_id WHERE a.user_id = ? LIMIT 1',
    [userId],
  )
  const name = rows[0]?.name
  return name ? String(name).split('@')[0] : 'Student'
}

export async function createRoom(userId, { name, questionIds, timed, secondsPerQuestion }) {
  const wanted = Array.isArray(questionIds) ? questionIds : []
  const published = await publishedQuestions()
  // Only questions that exist and are published can be frozen into a room.
  const valid = [...new Set(wanted.filter((id) => published.has(id)))].slice(0, MAX_QUESTIONS)
  if (!valid.length) return { ok: false, reason: 'no_questions' }

  const id = randomUUID()
  // A collision is a one-in-nine-hundred-million event per attempt; retrying a
  // few times is cheaper than a unique-violation error reaching the student.
  for (let attempt = 0; attempt < 6; attempt++) {
    const code = newCode()
    try {
      await pool.query(
        `INSERT INTO study_rooms (id, code, name, host_user_id, question_ids, timed, seconds_per_question, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'lobby')`,
        [id, code, String(name || 'Shared test').slice(0, 255), userId, JSON.stringify(valid), timed ? 1 : 0, secondsPerQuestion ?? null],
      )
      await pool.query(
        'INSERT INTO study_room_members (room_id, user_id, display_name) VALUES (?, ?, ?)',
        [id, userId, await displayNameFor(userId)],
      )
      return { ok: true, room: await roomFor(userId, id) }
    } catch (error) {
      if (error?.code !== 'ER_DUP_ENTRY') throw error
    }
  }
  return { ok: false, reason: 'code_collision' }
}

export async function joinRoom(userId, rawCode) {
  const code = String(rawCode ?? '').trim().toUpperCase()
  if (!code) return { ok: false, reason: 'not_found' }
  const [rows] = await pool.query('SELECT id, status FROM study_rooms WHERE code = ?', [code])
  if (!rows.length) return { ok: false, reason: 'not_found' }
  if (rows[0].status === 'closed') return { ok: false, reason: 'closed' }
  await pool.query(
    `INSERT INTO study_room_members (room_id, user_id, display_name) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE display_name = VALUES(display_name)`,
    [rows[0].id, userId, await displayNameFor(userId)],
  )
  return { ok: true, room: await roomFor(userId, rows[0].id) }
}

/**
 * A room as one member may see it.
 *
 * Question ids are withheld until the room starts, and another member's
 * answers are never included — only whether they have finished, and their
 * score once the results are open to the caller.
 */
export async function roomFor(userId, roomId) {
  const [rooms] = await pool.query(
    `SELECT id, code, name, host_user_id AS hostUserId, question_ids AS questionIds, timed,
            seconds_per_question AS secondsPerQuestion, status, started_at AS startedAt, closed_at AS closedAt
       FROM study_rooms WHERE id = ?`,
    [roomId],
  )
  if (!rooms.length) return null
  const room = rooms[0]

  const [members] = await pool.query(
    `SELECT m.user_id AS userId, m.display_name AS displayName, m.joined_at AS joinedAt, m.finished_at AS finishedAt,
            COUNT(a.question_id) AS answered, COALESCE(SUM(a.correct), 0) AS correct
       FROM study_room_members m
       LEFT JOIN study_room_answers a ON a.room_id = m.room_id AND a.user_id = m.user_id
      WHERE m.room_id = ?
      GROUP BY m.user_id, m.display_name, m.joined_at, m.finished_at
      ORDER BY m.joined_at`,
    [roomId],
  )
  const me = members.find((member) => member.userId === userId) ?? null
  if (!me) return null

  let questionIds = []
  try { questionIds = JSON.parse(room.questionIds) } catch { questionIds = [] }

  // Scores open once the caller has finished, or once the room has closed.
  const resultsOpen = Boolean(me.finishedAt) || room.status === 'closed'

  const [mine] = await pool.query(
    'SELECT question_id AS questionId, chosen_index AS chosenIndex, correct FROM study_room_answers WHERE room_id = ? AND user_id = ?',
    [roomId, userId],
  )

  return {
    id: room.id,
    code: room.code,
    name: room.name,
    hostUserId: room.hostUserId,
    isHost: room.hostUserId === userId,
    status: room.status,
    timed: Boolean(room.timed),
    secondsPerQuestion: room.secondsPerQuestion,
    questionCount: questionIds.length,
    // Withheld in the lobby so nobody can read ahead before everyone is in.
    questionIds: room.status === 'lobby' ? [] : questionIds,
    startedAt: room.startedAt,
    closedAt: room.closedAt,
    resultsOpen,
    members: members.map((member) => ({
      userId: member.userId,
      displayName: member.displayName,
      finished: Boolean(member.finishedAt),
      answered: Number(member.answered),
      correct: resultsOpen || member.userId === userId ? Number(member.correct) : null,
    })),
    myAnswers: mine.map((answer) => ({ questionId: answer.questionId, chosenIndex: answer.chosenIndex, correct: Boolean(answer.correct) })),
    myFinished: Boolean(me.finishedAt),
  }
}

export async function startRoom(userId, roomId) {
  const [rows] = await pool.query('SELECT host_user_id AS hostUserId, status FROM study_rooms WHERE id = ?', [roomId])
  if (!rows.length) return { ok: false, reason: 'not_found' }
  if (rows[0].hostUserId !== userId) return { ok: false, reason: 'not_host' }
  if (rows[0].status !== 'lobby') return { ok: true, room: await roomFor(userId, roomId) }
  await pool.query("UPDATE study_rooms SET status = 'running', started_at = CURRENT_TIMESTAMP WHERE id = ?", [roomId])
  return { ok: true, room: await roomFor(userId, roomId) }
}

export async function submitAnswer(userId, roomId, { questionId, chosenIndex, seconds }) {
  const [rows] = await pool.query('SELECT question_ids AS questionIds, status FROM study_rooms WHERE id = ?', [roomId])
  if (!rows.length) return { ok: false, reason: 'not_found' }
  if (rows[0].status === 'lobby') return { ok: false, reason: 'not_started' }

  let questionIds = []
  try { questionIds = JSON.parse(rows[0].questionIds) } catch { questionIds = [] }
  if (!questionIds.includes(questionId)) return { ok: false, reason: 'not_in_room' }

  const [member] = await pool.query('SELECT finished_at AS finishedAt FROM study_room_members WHERE room_id = ? AND user_id = ?', [roomId, userId])
  if (!member.length) return { ok: false, reason: 'not_a_member' }
  if (member[0].finishedAt) return { ok: false, reason: 'already_finished' }

  const published = await publishedQuestions()
  const question = published.get(questionId)
  if (!question) return { ok: false, reason: 'question_gone' }
  // The server marks it. A client-supplied `correct` flag would let anyone
  // report a perfect score to everybody else in the room.
  const correct = question.correctIndex >= 0 && Number(chosenIndex) === question.correctIndex

  await pool.query(
    `INSERT INTO study_room_answers (room_id, user_id, question_id, chosen_index, correct, seconds)
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE chosen_index = VALUES(chosen_index), correct = VALUES(correct), seconds = VALUES(seconds)`,
    [roomId, userId, questionId, Number(chosenIndex), correct ? 1 : 0, seconds ?? null],
  )
  return { ok: true, correct, correctIndex: question.correctIndex }
}

export async function finishRoom(userId, roomId) {
  await pool.query(
    'UPDATE study_room_members SET finished_at = CURRENT_TIMESTAMP WHERE room_id = ? AND user_id = ? AND finished_at IS NULL',
    [roomId, userId],
  )
  // A room closes on its own once nobody is still working, which is what makes
  // everyone's results visible to everyone.
  const [pending] = await pool.query(
    'SELECT COUNT(*) AS n FROM study_room_members WHERE room_id = ? AND finished_at IS NULL',
    [roomId],
  )
  if (Number(pending[0]?.n ?? 0) === 0) {
    await pool.query("UPDATE study_rooms SET status = 'closed', closed_at = CURRENT_TIMESTAMP WHERE id = ? AND status <> 'closed'", [roomId])
  }
  return { ok: true, room: await roomFor(userId, roomId) }
}

/** Rooms this student hosts or has joined, most recent first. */
export async function myRooms(userId) {
  const [rows] = await pool.query(
    `SELECT r.id, r.code, r.name, r.status, r.created_at AS createdAt, r.host_user_id AS hostUserId,
            r.question_ids AS questionIds, m.finished_at AS finishedAt,
            (SELECT COUNT(*) FROM study_room_members mm WHERE mm.room_id = r.id) AS members,
            (SELECT COUNT(*) FROM study_room_answers aa WHERE aa.room_id = r.id AND aa.user_id = ?) AS answered,
            (SELECT COALESCE(SUM(aa.correct), 0) FROM study_room_answers aa WHERE aa.room_id = r.id AND aa.user_id = ?) AS correct
       FROM study_rooms r
       JOIN study_room_members m ON m.room_id = r.id AND m.user_id = ?
      ORDER BY r.created_at DESC
      LIMIT 30`,
    [userId, userId, userId],
  )
  return rows.map((row) => {
    let questionIds = []
    try { questionIds = JSON.parse(row.questionIds) } catch { questionIds = [] }
    return {
      id: row.id,
      code: row.code,
      name: row.name,
      status: row.status,
      createdAt: row.createdAt,
      isHost: row.hostUserId === userId,
      members: Number(row.members),
      questionCount: questionIds.length,
      answered: Number(row.answered),
      correct: Number(row.correct),
      finished: Boolean(row.finishedAt),
    }
  })
}
