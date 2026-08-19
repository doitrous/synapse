/**
 * Head-to-head challenges — the same frozen paper, sat separately.
 *
 * One student picks a scope, the question set is frozen at that moment, and
 * both sit it at their own pace. The comparison only opens once *both* have
 * finished: showing a running score would let whichever side hasn't started
 * decide whether it's worth trying. Modeled directly on studyRooms.js, which
 * freezes, marks, and withholds the same way for a group instead of a pair.
 */
import { randomUUID } from 'node:crypto'
import { pool } from './db.js'
import { orderedPair } from './friendship.js'
import { bothFinished, canFinish, headToHead, sideOf } from './challengeResult.js'
import { publishedQuestions } from './publishedQuestions.js'

/** Longest a challenge may be. Same ceiling as a study room, same reason. */
const MAX_QUESTIONS = 40

/** Accepted-friends check, via the same sorted pair the friend graph uses. */
async function areFriends(a, b) {
  const { userA, userB } = orderedPair(a, b)
  const [rows] = await pool.query(
    'SELECT status FROM friendships WHERE user_a = ? AND user_b = ?',
    [userA, userB],
  )
  return rows.length > 0 && rows[0].status === 'accepted'
}

/**
 * Which side of a challenge a user is on, or null when they are neither.
 *
 * Every handler below gates on this. A stranger asking about someone else's
 * challenge gets exactly what they'd get for an id that doesn't exist —
 * whether a challenge exists between two other people is not theirs to probe.
 */
function parseQuestionIds(raw) {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function challengeRow(id) {
  const [rows] = await pool.query(
    `SELECT id, challenger_id AS challengerId, opponent_id AS opponentId, question_ids AS questionIds,
            scope_label AS scopeLabel, status, challenger_finished_at AS challengerFinishedAt,
            opponent_finished_at AS opponentFinishedAt, created_at AS createdAt
       FROM challenges WHERE id = ?`,
    [id],
  )
  return rows.length ? rows[0] : null
}

export async function createChallenge(userId, { opponentId, questionIds, scopeLabel }) {
  if (!opponentId || typeof opponentId !== 'string' || opponentId === userId) {
    return { ok: false, reason: 'invalid_opponent' }
  }
  if (!(await areFriends(userId, opponentId))) return { ok: false, reason: 'not_friends' }

  const wanted = Array.isArray(questionIds) ? questionIds : []
  const published = await publishedQuestions()
  // Only questions that exist and are published can be frozen into a challenge.
  const valid = [...new Set(wanted.filter((id) => published.has(id)))].slice(0, MAX_QUESTIONS)
  if (!valid.length) return { ok: false, reason: 'no_questions' }

  const id = randomUUID()
  await pool.query(
    `INSERT INTO challenges (id, challenger_id, opponent_id, question_ids, scope_label)
     VALUES (?, ?, ?, ?, ?)`,
    [id, userId, opponentId, JSON.stringify(valid), String(scopeLabel || 'Challenge').slice(0, 255)],
  )
  return { ok: true, challenge: await challengeFor(userId, id) }
}

/** Accept or decline a challenge sent to you. Only the opponent may answer it. */
export async function respondToChallenge(userId, id, accept) {
  const row = await challengeRow(id)
  if (!row) return { ok: false, reason: 'not_found' }
  if (sideOf(row, userId) !== 'opponent') return { ok: false, reason: 'not_your_challenge' }
  if (row.status !== 'sent') return { ok: false, reason: 'not_pending' }
  await pool.query('UPDATE challenges SET status = ? WHERE id = ?', [accept ? 'running' : 'declined', id])
  return { ok: true, challenge: await challengeFor(userId, id) }
}

export async function submitChallengeAnswer(userId, id, { questionId, chosenIndex, seconds }) {
  const row = await challengeRow(id)
  if (!row) return { ok: false, reason: 'not_found' }
  const side = sideOf(row, userId)
  if (!side) return { ok: false, reason: 'not_your_challenge' }
  if (row.status !== 'running') return { ok: false, reason: 'not_running' }

  const questionIds = parseQuestionIds(row.questionIds)
  if (!questionIds.includes(questionId)) return { ok: false, reason: 'not_in_challenge' }

  const finishedAt = side === 'challenger' ? row.challengerFinishedAt : row.opponentFinishedAt
  if (finishedAt) return { ok: false, reason: 'already_finished' }

  const published = await publishedQuestions()
  const question = published.get(questionId)
  if (!question) return { ok: false, reason: 'question_gone' }
  // The server marks it, exactly as study rooms do. A client-supplied `correct`
  // flag would let anyone report a perfect score to the friend who sent this.
  const correct = question.correctIndex >= 0 && Number(chosenIndex) === question.correctIndex

  await pool.query(
    `INSERT INTO challenge_answers (challenge_id, user_id, question_id, chosen_index, correct, seconds)
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE chosen_index = VALUES(chosen_index), correct = VALUES(correct), seconds = VALUES(seconds)`,
    [id, userId, questionId, Number(chosenIndex), correct ? 1 : 0, seconds ?? null],
  )
  return { ok: true, correct, correctIndex: question.correctIndex }
}

export async function finishChallenge(userId, id) {
  const row = await challengeRow(id)
  if (!row) return { ok: false, reason: 'not_found' }
  const side = sideOf(row, userId)
  if (!side) return { ok: false, reason: 'not_your_challenge' }
  // Without this gate, either side could call finish while the challenge sits
  // at `sent` (never accepted) or `declined`; two such calls would flip status
  // straight to `complete` with zero answers recorded. Reasons match the
  // vocabulary `submitChallengeAnswer` already uses for the same two cases.
  if (!canFinish(row, side)) {
    return { ok: false, reason: row.status !== 'running' ? 'not_running' : 'already_finished' }
  }

  const column = side === 'challenger' ? 'challenger_finished_at' : 'opponent_finished_at'
  await pool.query(
    `UPDATE challenges SET ${column} = CURRENT_TIMESTAMP WHERE id = ? AND ${column} IS NULL`,
    [id],
  )
  // Complete only once both timestamps are set — the same condition `bothFinished`
  // checks in memory, expressed here as the WHERE clause that makes it so.
  await pool.query(
    `UPDATE challenges SET status = 'complete'
      WHERE id = ? AND status <> 'complete'
        AND challenger_finished_at IS NOT NULL AND opponent_finished_at IS NOT NULL`,
    [id],
  )
  return { ok: true, challenge: await challengeFor(userId, id) }
}

/**
 * A challenge as one side may see it.
 *
 * The caller's own answers and progress are always included. The opponent's
 * numbers — their score, the per-question breakdown — are included only once
 * `bothFinished`; until then `result` is null. Whether the opponent has
 * finished at all is shown regardless, the same way a study room always shows
 * who's done without showing what they got: that's progress, not a score.
 */
export async function challengeFor(userId, id) {
  const row = await challengeRow(id)
  const side = sideOf(row, userId)
  if (!side) return null // a non-participant gets what a non-existent challenge gets

  const questionIds = parseQuestionIds(row.questionIds)
  const challenge = {
    challengerId: row.challengerId,
    opponentId: row.opponentId,
    questionIds,
    challengerFinishedAt: row.challengerFinishedAt,
    opponentFinishedAt: row.opponentFinishedAt,
  }

  const [answerRows] = await pool.query(
    `SELECT user_id AS userId, question_id AS questionId, chosen_index AS chosenIndex, correct, seconds
       FROM challenge_answers WHERE challenge_id = ?`,
    [id],
  )
  const answers = answerRows.map((answer) => ({
    userId: answer.userId,
    questionId: answer.questionId,
    chosenIndex: answer.chosenIndex,
    correct: Boolean(answer.correct),
    seconds: answer.seconds,
  }))
  const mine = answers.filter((answer) => answer.userId === userId)
  const finished = bothFinished(challenge)
  const myFinishedAt = side === 'challenger' ? row.challengerFinishedAt : row.opponentFinishedAt
  const opponentFinishedAt = side === 'challenger' ? row.opponentFinishedAt : row.challengerFinishedAt

  return {
    id: row.id,
    challengerId: row.challengerId,
    opponentId: row.opponentId,
    scopeLabel: row.scopeLabel,
    status: row.status,
    questionIds,
    questionCount: questionIds.length,
    createdAt: row.createdAt,
    myRole: side,
    myFinished: Boolean(myFinishedAt),
    opponentFinished: Boolean(opponentFinishedAt),
    myAnswers: mine.map((answer) => ({
      questionId: answer.questionId,
      chosenIndex: answer.chosenIndex,
      correct: answer.correct,
    })),
    result: finished ? headToHead(challenge, answers) : null,
  }
}

/** Challenges this student sent or received, most recent first. */
export async function myChallenges(userId) {
  const [rows] = await pool.query(
    `SELECT id, challenger_id AS challengerId, opponent_id AS opponentId, scope_label AS scopeLabel,
            status, question_ids AS questionIds, challenger_finished_at AS challengerFinishedAt,
            opponent_finished_at AS opponentFinishedAt, created_at AS createdAt
       FROM challenges
      WHERE challenger_id = ? OR opponent_id = ?
      ORDER BY created_at DESC
      LIMIT 30`,
    [userId, userId],
  )
  return rows.map((row) => {
    const side = sideOf(row, userId)
    const questionIds = parseQuestionIds(row.questionIds)
    return {
      id: row.id,
      opponentId: side === 'challenger' ? row.opponentId : row.challengerId,
      scopeLabel: row.scopeLabel,
      status: row.status,
      questionCount: questionIds.length,
      myRole: side,
      myFinished: Boolean(side === 'challenger' ? row.challengerFinishedAt : row.opponentFinishedAt),
      opponentFinished: Boolean(side === 'challenger' ? row.opponentFinishedAt : row.challengerFinishedAt),
      createdAt: row.createdAt,
    }
  })
}
