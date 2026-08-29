/**
 * Question of the Day — server module.
 *
 * The server is authoritative in live mode: `qotdToday` computes today's
 * question id for the caller's cohort (deterministic seed, admin-pin
 * override) and `recordQotdAnswer` re-derives and re-marks it, writing to
 * `qotd_answers` — a table that never touches `qbank_attempts` or mastery.
 * See docs/superpowers/specs/2026-08-29-question-of-the-day-design.md.
 *
 * This does NOT import the client's `src/data/qotdSelection.ts` — it ports
 * the identical algorithm in JS so the server has no build-time dependency
 * on the client tree. Keep `hashText`, scoping, and `selectQotdId` here
 * byte-identical in behaviour to the client's `src/data/qotdCohort.ts` /
 * `qotdSelection.ts` so a future shared-vector test can prove parity.
 */
import { pool } from './db.js'
import { publishedQuestions } from './publishedQuestions.js'

const LEDGER_KEY = 'synapse-admin-content-ledger-v4'
const PINS_KEY = 'synapse-qotd-pins-v1'
const HISTORY_LIMIT = 60

/** Unsigned 32-bit FNV-1a. Mirrors the client's hash32 in src/data/qotdCohort.ts. */
export function hashText(input) {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/** The people/answer cohort key: university id + year LABEL (not year id). */
export function cohortKey({ universityId, year }) {
  return `${universityId}|${year}`
}

/** The Africa/Cairo calendar date of an instant, as YYYY-MM-DD. */
export function cairoDate(now) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Cairo', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now)
}

/** Whole days from 1970-01-01 for a YYYY-MM-DD string (UTC math, no DST drift). */
export function dayNumber(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number)
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000)
}

function seededRandom(seed) {
  let state = Math.imul(seed | 0, 0x9e3779b1) ^ 0x85ebca6b
  state = Math.imul(state ^ (state >>> 16), 0x21f0aaad)
  state = Math.imul(state ^ (state >>> 15), 0x735a2d97)
  state = (state ^ (state >>> 15)) >>> 0
  if (state === 0) state = 0x6d2b79f5
  return () => {
    state ^= state << 13; state >>>= 0
    state ^= state >>> 17
    state ^= state << 5; state >>>= 0
    return state / 0x1_0000_0000
  }
}

function shuffle(items, random) {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const MIN_POOL = 8

function scopeCandidates(candidates, cohort) {
  const scoped = candidates.filter((c) =>
    (c.universityIds.length === 0 || c.universityIds.includes(cohort.universityId)) &&
    (c.yearIds.length === 0 || c.yearIds.includes(cohort.yearId)))
  return scoped.length >= MIN_POOL ? scoped : candidates
}

/**
 * Today's question id for a cohort: an admin pin wins; otherwise a
 * cohort-seeded shuffle indexed by day-number, so the cohort cycles its
 * whole pool before any repeat. Returns null only when the pool is empty.
 */
export function selectQotdId(candidates, cohort, isoDate, pins) {
  const pool = scopeCandidates(candidates, cohort)
  if (pool.length === 0) return null
  const pinned = pins?.[cohortKey(cohort)]?.[isoDate]
  if (pinned && pool.some((c) => c.id === pinned)) return pinned
  const deck = shuffle(pool, seededRandom(hashText(cohortKey(cohort))))
  const index = ((dayNumber(isoDate) % deck.length) + deck.length) % deck.length
  return deck[index].id
}

/**
 * Published, student-answerable questions with their curriculum scope tags.
 *
 * Tag shape verified against the real ledger writer
 * (src/components/admin/QuestionEditorDialog.tsx) and the server's own
 * tag reader (server/src/studentLedger.js `tagsOf`): a question's scope
 * tags live at `questionData.tags.universityIds` and `questionData.tags.years`
 * — the latter holds year *ids* (e.g. "KAU_Y2"), not year labels, despite
 * the field being named `years`.
 */
export function candidatesFromLedger(ledgerValue) {
  const ledger = Array.isArray(ledgerValue) ? ledgerValue : []
  const out = []
  for (const item of ledger) {
    if (item?.kind !== 'question' || item?.status !== 'Published' || !item?.questionData) continue
    const answers = Array.isArray(item.questionData.answers) ? item.questionData.answers : []
    const answerable = answers.filter((a) => String(a?.text ?? '').trim())
    if (answerable.length < 2 || !answerable.some((a) => a.label === item.questionData.correctAnswer)) continue
    const tags = item.questionData.tags ?? {}
    out.push({
      id: item.id,
      universityIds: (Array.isArray(tags.universityIds) ? tags.universityIds : []).filter(Boolean),
      yearIds: (Array.isArray(tags.years) ? tags.years : []).filter(Boolean),
    })
  }
  return out
}

async function readState(key) {
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ? LIMIT 1', [key])
  if (!rows.length) return null
  try { return JSON.parse(rows[0].v) } catch { return null }
}

async function studentProfile(userId) {
  const [rows] = await pool.query(
    `SELECT id, university_id AS universityId, year, year_id AS yearId,
            COALESCE(username, CONCAT('student-', LEFT(id, 6))) AS username,
            profile_icon AS profileIcon
       FROM students WHERE user_id = ? LIMIT 1`,
    [userId],
  )
  return rows[0] ?? null
}

async function answeredDates(userId) {
  const [rows] = await pool.query(
    `SELECT DATE_FORMAT(qotd_date, '%Y-%m-%d') AS d FROM qotd_answers
      WHERE user_id = ? ORDER BY qotd_date DESC LIMIT ?`,
    [userId, HISTORY_LIMIT],
  )
  return rows.map((r) => r.d)
}

/**
 * Streak stats from a set of answered dates. `current` is anchored to today
 * OR yesterday: a student who has not yet done today's question keeps
 * yesterday-anchored momentum until the day actually ends.
 */
function computeStreak(dates, todayIso) {
  const days = [...new Set(dates.map(dayNumber))].sort((a, b) => a - b)
  if (!days.length) return { current: 0, longest: 0 }
  let longest = 1, run = 1
  for (let i = 1; i < days.length; i++) {
    run = days[i] === days[i - 1] + 1 ? run + 1 : 1
    if (run > longest) longest = run
  }
  const today = dayNumber(todayIso)
  const set = new Set(days)
  let anchor = set.has(today) ? today : set.has(today - 1) ? today - 1 : null
  let current = 0
  while (anchor !== null && set.has(anchor)) { current++; anchor-- }
  return { current, longest }
}

async function todaysQuestionId(cohort, isoDate) {
  const [ledger, pins] = await Promise.all([readState(LEDGER_KEY), readState(PINS_KEY)])
  return selectQotdId(candidatesFromLedger(ledger), cohort, isoDate, pins ?? {})
}

export async function qotdToday(userId) {
  const profile = await studentProfile(userId)
  if (!profile?.universityId || !profile?.year) return { error: 'profile_incomplete' }
  const cohort = { universityId: profile.universityId, year: profile.year, yearId: profile.yearId ?? '' }
  const date = cairoDate(new Date())
  const questionId = await todaysQuestionId(cohort, date)
  const [mine] = await pool.query(
    'SELECT answer_index AS answerIndex, correct FROM qotd_answers WHERE user_id = ? AND qotd_date = ? LIMIT 1',
    [userId, date],
  )
  const dates = await answeredDates(userId)
  const { current, longest } = computeStreak(dates, date)
  return {
    date, questionId,
    answered: mine.length > 0,
    answerIndex: mine.length ? mine[0].answerIndex : null,
    correct: mine.length ? Boolean(mine[0].correct) : null,
    current, longest, history: dates,
  }
}

export async function recordQotdAnswer(userId, input) {
  const profile = await studentProfile(userId)
  if (!profile?.universityId || !profile?.year) return { error: 'profile_incomplete' }
  const cohort = { universityId: profile.universityId, year: profile.year, yearId: profile.yearId ?? '' }
  const date = cairoDate(new Date())
  const expected = await todaysQuestionId(cohort, date)
  const questionId = String(input?.questionId ?? '').trim()
  if (!expected || questionId !== expected) return { error: 'not_todays_question' }

  const snapshot = await publishedQuestions()
  const key = snapshot.get(questionId)
  if (!key || key.correctIndex < 0) return { error: 'question_not_markable' }
  const answerIndex = Number(input?.answerIndex)
  if (!Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= key.optionCount) {
    return { error: 'invalid_answer_index' }
  }
  const correct = answerIndex === key.correctIndex
  // INSERT IGNORE makes the day's answer immutable — a second submit is a no-op,
  // never an overwrite (the unique PK is (user_id, qotd_date)).
  await pool.query(
    `INSERT IGNORE INTO qotd_answers
       (user_id, student_id, university_id, year, term, qotd_date, question_id, answer_index, correct)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [userId, profile.id, profile.universityId, profile.year, 'current', date, questionId, answerIndex, correct ? 1 : 0],
  )
  const dates = await answeredDates(userId)
  const { current, longest } = computeStreak(dates, date)
  return { correct, correctIndex: key.correctIndex, current, longest }
}

export async function qotdLeaderboard(userId, { limit = 50 } = {}) {
  const profile = await studentProfile(userId)
  if (!profile?.universityId || !profile?.year) return { error: 'profile_incomplete' }
  const [rows] = await pool.query(
    `SELECT a.user_id AS userId,
            COALESCE(s.username, CONCAT('student-', LEFT(s.id, 6))) AS username,
            s.profile_icon AS profileIcon,
            COUNT(*) AS totalAnswered,
            SUM(a.correct = 1) AS totalCorrect,
            GROUP_CONCAT(DATE_FORMAT(a.qotd_date, '%Y-%m-%d')) AS dates
       FROM qotd_answers a JOIN students s ON s.id = a.student_id
      WHERE a.university_id = ? AND a.year = ? AND a.term = 'current'
      GROUP BY a.user_id, s.username, s.profile_icon, s.id`,
    [profile.universityId, profile.year],
  )
  const today = cairoDate(new Date())
  const ranked = rows
    .map((r) => ({
      userId: r.userId, username: r.username, profileIcon: r.profileIcon ?? null,
      totalAnswered: Number(r.totalAnswered), totalCorrect: Number(r.totalCorrect ?? 0),
      current: computeStreak(String(r.dates ?? '').split(',').filter(Boolean), today).current,
    }))
    .sort((a, b) => b.current - a.current || b.totalCorrect - a.totalCorrect || b.totalAnswered - a.totalAnswered)
    .map((r, i) => ({ rank: i + 1, ...r }))
  const mine = ranked.find((r) => r.userId === userId) ?? null
  return {
    scope: { universityId: profile.universityId, year: profile.year },
    rows: ranked.slice(0, limit),
    viewer: { rank: mine?.rank ?? null, total: ranked.length, current: mine?.current ?? 0 },
  }
}

export async function qotdFriends(userId) {
  const profile = await studentProfile(userId)
  if (!profile?.universityId || !profile?.year) return { error: 'profile_incomplete' }
  const date = cairoDate(new Date())
  const [mineRows] = await pool.query(
    'SELECT 1 FROM qotd_answers WHERE user_id = ? AND qotd_date = ? LIMIT 1', [userId, date],
  )
  const viewerAnswered = mineRows.length > 0
  // Friend-id expression mirrors friends.js `myFriends` (status='accepted',
  // either side of user_a/user_b); name fallback mirrors its `profilesFor`.
  const [rows] = await pool.query(
    `SELECT f.friend_id AS userId, COALESCE(s.name, s.email) AS name,
            a.correct AS correct, (a.user_id IS NOT NULL) AS answered
       FROM (
         SELECT IF(user_a = ?, user_b, user_a) AS friend_id FROM friendships
          WHERE status = 'accepted' AND (user_a = ? OR user_b = ?)
       ) f
       JOIN students s ON s.user_id = f.friend_id
       LEFT JOIN qotd_answers a ON a.user_id = f.friend_id AND a.qotd_date = ?`,
    [userId, userId, userId, date],
  )
  const friends = rows.map((r) => ({
    userId: r.userId, name: r.name, answered: Boolean(r.answered),
    correct: viewerAnswered && r.answered ? Boolean(r.correct) : null,
    current: 0,
  }))
  return { date, viewerAnswered, friends }
}
