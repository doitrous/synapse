import { randomUUID } from 'node:crypto'
import { pool } from './db.js'
import { publishedQuestions } from './publishedQuestions.js'

function cleanText(value, max) {
  const text = String(value ?? '').trim()
  return text ? text.slice(0, max) : null
}

function cleanSeconds(value) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : null
}

export function accuracyBand(seconds) {
  const value = Number(seconds)
  if (!Number.isFinite(value)) return 'unknown'
  if (value <= 45) return 'good'
  if (value <= 60) return 'target'
  if (value <= 90) return 'slower'
  return 'overtime'
}

export function rankAccuracy(rows) {
  return rows
    .map((row) => ({
      userId: row.userId,
      username: row.username,
      profileIcon: row.profileIcon ?? null,
      verifiedAnswers: Number(row.verifiedAnswers ?? 0),
      correctAnswers: Number(row.correctAnswers ?? 0),
      accuracy: Number(row.verifiedAnswers ?? 0) > 0 ? Number(row.correctAnswers ?? 0) / Number(row.verifiedAnswers) : 0,
      lastVerifiedAt: row.lastVerifiedAt ?? null,
    }))
    .filter((row) => row.verifiedAnswers >= 100)
    .sort((a, b) => {
      const byAccuracy = b.accuracy - a.accuracy
      if (byAccuracy) return byAccuracy
      const byEvidence = b.verifiedAnswers - a.verifiedAnswers
      if (byEvidence) return byEvidence
      return new Date(b.lastVerifiedAt ?? 0) - new Date(a.lastVerifiedAt ?? 0)
    })
    .map((row, index) => ({ rank: index + 1, ...row }))
}

export function rankMastery(rows) {
  const byUser = new Map()
  for (const row of rows) {
    const user = byUser.get(row.userId) ?? {
      userId: row.userId,
      username: row.username,
      profileIcon: row.profileIcon ?? null,
      concepts: new Map(),
      evidenceVolume: 0,
      lastVerifiedAt: null,
    }
    let concepts = []
    try { concepts = Array.isArray(row.conceptIds) ? row.conceptIds : JSON.parse(row.conceptIds ?? '[]') } catch { concepts = [] }
    for (const conceptId of concepts.filter((id) => typeof id === 'string' && id.trim())) {
      const concept = user.concepts.get(conceptId) ?? { attempts: 0, correct: 0 }
      concept.attempts += 1
      concept.correct += row.correct ? 1 : 0
      user.concepts.set(conceptId, concept)
      user.evidenceVolume += 1
    }
    if (!user.lastVerifiedAt || new Date(row.verifiedAt) > new Date(user.lastVerifiedAt)) user.lastVerifiedAt = row.verifiedAt
    byUser.set(row.userId, user)
  }
  return [...byUser.values()]
    .map((user) => {
      const securedConcepts = [...user.concepts.values()].filter((concept) => (
        concept.attempts >= 3 && concept.correct / concept.attempts >= 0.8
      )).length
      return {
        userId: user.userId,
        username: user.username,
        profileIcon: user.profileIcon,
        securedConcepts,
        evidenceVolume: user.evidenceVolume,
        lastVerifiedAt: user.lastVerifiedAt,
      }
    })
    .filter((row) => row.securedConcepts > 0)
    .sort((a, b) => {
      const bySecured = b.securedConcepts - a.securedConcepts
      if (bySecured) return bySecured
      const byEvidence = b.evidenceVolume - a.evidenceVolume
      if (byEvidence) return byEvidence
      return new Date(b.lastVerifiedAt ?? 0) - new Date(a.lastVerifiedAt ?? 0)
    })
    .map((row, index) => ({ rank: index + 1, ...row }))
}

/**
 * The viewer's own position within a full ranked leaderboard array (before
 * it is sliced to `limit`). `ranked` rows carry `userId` and `rank` per
 * `rankAccuracy`/`rankMastery`; a viewer absent from `ranked` (below the
 * eligibility floor, or with no verified attempts this term) is ineligible
 * with `rank: null`, but `total` still reflects the full cohort.
 */
export function viewerStanding(ranked, userId) {
  const row = ranked.find((entry) => entry.userId === userId) ?? null
  return { eligible: Boolean(row), rank: row?.rank ?? null, total: ranked.length, row }
}

async function studentProfile(userId) {
  const [rows] = await pool.query(
    `SELECT id, university_id AS universityId, year,
            COALESCE(username, CONCAT('student-', LEFT(id, 6))) AS username,
            profile_icon AS profileIcon
       FROM students WHERE user_id = ? LIMIT 1`,
    [userId],
  )
  return rows[0] ?? null
}

export async function recordVerifiedAttempts(userId, input) {
  const profile = await studentProfile(userId)
  if (!profile?.universityId || !profile?.year) return { error: 'profile_incomplete' }
  const snapshot = await publishedQuestions()
  const attempts = Array.isArray(input?.attempts) ? input.attempts : [input]
  const term = cleanText(input?.term, 64) ?? 'current'
  const sessionId = cleanText(input?.sessionId, 96) ?? randomUUID()
  const rows = []
  for (const attempt of attempts) {
    const questionId = cleanText(attempt?.questionId ?? attempt?.id, 96)
    const key = questionId ? snapshot.get(questionId) : null
    if (!questionId || !key || key.correctIndex < 0) return { error: 'question_not_markable', questionId }
    const answerIndex = Number(attempt?.answerIndex ?? attempt?.selectedIndex)
    if (!Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= key.optionCount) {
      return { error: 'invalid_answer_index', questionId }
    }
    const answeredAt = attempt?.answeredAt ? new Date(attempt.answeredAt) : new Date()
    if (!Number.isFinite(answeredAt.getTime())) return { error: 'invalid_answered_at', questionId }
    rows.push({
      id: cleanText(attempt?.attemptId, 64) ?? randomUUID(),
      sessionId: cleanText(attempt?.sessionId, 96) ?? sessionId,
      questionId,
      term,
      subjectId: cleanText(key.subjectId, 96),
      topic: cleanText(key.topic, 255),
      subtopic: cleanText(key.subtopic, 255),
      conceptIds: JSON.stringify(key.conceptIds ?? []),
      answerIndex,
      correctIndex: key.correctIndex,
      correct: answerIndex === key.correctIndex,
      seconds: cleanSeconds(attempt?.seconds),
      sessionDurationSeconds: cleanSeconds(attempt?.sessionDurationSeconds ?? input?.sessionDurationSeconds),
      overtimeSeconds: cleanSeconds(attempt?.overtimeSeconds ?? input?.overtimeSeconds),
      answeredAt,
    })
  }
  if (rows.length) {
    // One round trip for the whole batch instead of one per attempt — a
    // finished session can verify dozens of answers at once, and each used to
    // be its own INSERT. Still one ON DUPLICATE KEY UPDATE per row, just sent
    // together, wrapped in a transaction so a mid-batch failure verifies
    // nothing rather than half a session.
    const placeholders = rows.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ')
    const params = rows.flatMap((row) => [
      row.id, userId, profile.id, row.sessionId, row.questionId, profile.universityId, profile.year, row.term,
      row.subjectId, row.topic, row.subtopic, row.conceptIds, row.answerIndex, row.correctIndex, row.correct ? 1 : 0,
      row.seconds, row.sessionDurationSeconds, row.overtimeSeconds, row.answeredAt,
    ])
    const conn = await pool.getConnection()
    try {
      await conn.beginTransaction()
      await conn.query(
        `INSERT INTO qbank_attempts
         (id, user_id, student_id, session_id, question_id, university_id, year, term,
          subject_id, topic, subtopic, concept_ids, answer_index, correct_index, correct,
          seconds, session_duration_seconds, overtime_seconds, answered_at)
         VALUES ${placeholders}
         ON DUPLICATE KEY UPDATE
          answer_index = VALUES(answer_index), correct_index = VALUES(correct_index),
          correct = VALUES(correct), seconds = VALUES(seconds),
          session_duration_seconds = VALUES(session_duration_seconds),
          overtime_seconds = VALUES(overtime_seconds), answered_at = VALUES(answered_at),
          verified_at = CURRENT_TIMESTAMP`,
        params,
      )
      // Append-only mirror for accurate transition tracking: one row per
      // distinct attempt, ordered by its own AUTO_INCREMENT seq rather than a
      // client clock. A retake (new session id → new attempt_id) appends; a
      // retried POST hits the unique key and just refreshes the grade in place.
      const eventPlaceholders = rows.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ')
      const eventParams = rows.flatMap((row) => [
        row.id, userId, profile.id, row.sessionId, row.questionId, profile.universityId, profile.year, row.term,
        row.answerIndex, row.correctIndex, row.correct ? 1 : 0, row.answeredAt,
      ])
      await conn.query(
        `INSERT INTO qbank_answer_events
         (attempt_id, user_id, student_id, session_id, question_id, university_id, year, term,
          answer_index, correct_index, correct, answered_at)
         VALUES ${eventPlaceholders}
         ON DUPLICATE KEY UPDATE
          answer_index = VALUES(answer_index), correct_index = VALUES(correct_index),
          correct = VALUES(correct), answered_at = VALUES(answered_at)`,
        eventParams,
      )
      // The single funnel every attempt routes through, so this is where
      // "last seen" is honestly stamped. Nothing else updates last_active from
      // real student activity, so the admin Retention panel depends on it.
      await conn.query('UPDATE students SET last_active = NOW() WHERE id = ?', [profile.id])
      await conn.commit()
    } catch (error) {
      await conn.rollback()
      throw error
    } finally {
      conn.release()
    }
  }
  return { ok: true, recorded: rows.length, results: rows.map((row) => ({
    questionId: row.questionId,
    answerIndex: row.answerIndex,
    correctIndex: row.correctIndex,
    correct: row.correct,
    paceBand: accuracyBand(row.seconds),
  })) }
}

export async function leaderboardFor(userId, { metric = 'accuracy', term = 'current', limit = 50 } = {}) {
  const profile = await studentProfile(userId)
  if (!profile?.universityId || !profile?.year) return { error: 'profile_incomplete' }
  const cleanTerm = cleanText(term, 64) ?? 'current'
  if (metric === 'mastery') {
    const [rows] = await pool.query(
      `SELECT a.user_id AS userId, COALESCE(s.username, CONCAT('student-', LEFT(s.id, 6))) AS username,
              s.profile_icon AS profileIcon, a.concept_ids AS conceptIds,
              a.correct, a.verified_at AS verifiedAt
         FROM qbank_attempts a
         JOIN students s ON s.id = a.student_id
        WHERE a.university_id = ? AND a.year = ? AND a.term = ?`,
      [profile.universityId, profile.year, cleanTerm],
    )
    const ranked = rankMastery(rows)
    const standing = viewerStanding(ranked, userId)
    const viewer = {
      eligible: standing.eligible,
      rank: standing.rank,
      total: standing.total,
      securedConcepts: standing.row?.securedConcepts ?? 0,
    }
    return {
      metric: 'mastery',
      term: cleanTerm,
      scope: { universityId: profile.universityId, year: profile.year },
      rows: ranked.slice(0, limit),
      viewer,
    }
  }
  const [rows] = await pool.query(
    `SELECT a.user_id AS userId, COALESCE(s.username, CONCAT('student-', LEFT(s.id, 6))) AS username,
            s.profile_icon AS profileIcon, COUNT(*) AS verifiedAnswers,
            SUM(a.correct = 1) AS correctAnswers, MAX(a.verified_at) AS lastVerifiedAt
       FROM qbank_attempts a
       JOIN students s ON s.id = a.student_id
      WHERE a.university_id = ? AND a.year = ? AND a.term = ?
      GROUP BY a.user_id, s.username, s.profile_icon, s.id`,
    [profile.universityId, profile.year, cleanTerm],
  )
  const ranked = rankAccuracy(rows)
  const standing = viewerStanding(ranked, userId)
  const viewerQueryRow = rows.find((row) => row.userId === userId) ?? null
  const viewer = {
    eligible: standing.eligible,
    rank: standing.rank,
    total: standing.total,
    verifiedAnswers: Number(standing.row?.verifiedAnswers ?? viewerQueryRow?.verifiedAnswers ?? 0),
    requiredAnswers: 100,
  }
  return {
    metric: 'accuracy',
    term: cleanTerm,
    scope: { universityId: profile.universityId, year: profile.year },
    rows: ranked.slice(0, limit),
    viewer,
  }
}
