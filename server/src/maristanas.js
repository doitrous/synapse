import { pool } from './db.js'

export const MARISTANA_CONFIG_KEY = 'synapse-maristana-config-v1'
export const MARISTANA_STEPS = 25

export const DEFAULT_MARISTANA_CONFIG = Object.freeze({
  version: 1,
  enabled: true,
  creditsPerStep: 100,
  creditsPerStudyMinute: 2,
  creditsPerQuestion: 2,
  creditsPerCorrectAnswer: 10,
  assessmentMinimumQuestions: 20,
  creditsPerAssessmentPercent: 1.5,
})

function bounded(value, fallback, min, max) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback
}

export function normaliseMaristanaConfig(value) {
  const input = value && typeof value === 'object' ? value : {}
  return {
    version: 1,
    enabled: input.enabled !== false,
    creditsPerStep: bounded(input.creditsPerStep, DEFAULT_MARISTANA_CONFIG.creditsPerStep, 20, 10_000),
    creditsPerStudyMinute: bounded(input.creditsPerStudyMinute, DEFAULT_MARISTANA_CONFIG.creditsPerStudyMinute, 0, 100),
    creditsPerQuestion: bounded(input.creditsPerQuestion, DEFAULT_MARISTANA_CONFIG.creditsPerQuestion, 0, 500),
    creditsPerCorrectAnswer: bounded(input.creditsPerCorrectAnswer, DEFAULT_MARISTANA_CONFIG.creditsPerCorrectAnswer, 0, 1_000),
    assessmentMinimumQuestions: Math.round(bounded(input.assessmentMinimumQuestions, DEFAULT_MARISTANA_CONFIG.assessmentMinimumQuestions, 5, 200)),
    creditsPerAssessmentPercent: bounded(input.creditsPerAssessmentPercent, DEFAULT_MARISTANA_CONFIG.creditsPerAssessmentPercent, 0, 100),
  }
}

export function calculateMaristanaCredits(evidence, config = DEFAULT_MARISTANA_CONFIG) {
  const safe = normaliseMaristanaConfig(config)
  const breakdown = {
    study: Math.round(Math.max(0, Number(evidence.studyMinutes) || 0) * safe.creditsPerStudyMinute),
    questions: Math.round(Math.max(0, Number(evidence.questionsAnswered) || 0) * safe.creditsPerQuestion),
    accuracy: Math.round(Math.max(0, Math.min(Number(evidence.questionsAnswered) || 0, Number(evidence.correctAnswers) || 0)) * safe.creditsPerCorrectAnswer),
    assessments: Math.round((evidence.assessmentScores ?? []).reduce(
      (sum, score) => sum + Math.max(0, Math.min(100, Number(score) || 0)) * safe.creditsPerAssessmentPercent,
      0,
    )),
  }
  return { breakdown, total: Object.values(breakdown).reduce((sum, value) => sum + value, 0) }
}

export function buildHospitalSlots(totalCredits, config = DEFAULT_MARISTANA_CONFIG, names = {}) {
  const safe = normaliseMaristanaConfig(config)
  const hospitalCredits = safe.creditsPerStep * MARISTANA_STEPS
  const total = Math.max(0, Math.floor(Number(totalCredits) || 0))
  const completed = Math.floor(total / hospitalCredits)
  const visible = Math.max(1, completed + 1)
  return Array.from({ length: visible }, (_, index) => {
    const slot = index + 1
    const available = Math.max(0, total - index * hospitalCredits)
    const creditsInHospital = Math.min(hospitalCredits, available)
    const stage = Math.min(MARISTANA_STEPS, Math.floor(creditsInHospital / safe.creditsPerStep))
    const complete = stage === MARISTANA_STEPS
    const remainder = complete ? 0 : creditsInHospital % safe.creditsPerStep
    return {
      slot,
      name: names[slot] || `Maristana ${String(slot).padStart(2, '0')}`,
      stage,
      completed: complete,
      active: index === visible - 1,
      creditsInHospital,
      creditsToNextStep: complete ? 0 : safe.creditsPerStep - remainder,
      stepProgress: complete ? 1 : remainder / safe.creditsPerStep,
    }
  })
}

async function readConfig() {
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ? LIMIT 1', [MARISTANA_CONFIG_KEY])
  if (!rows.length) return DEFAULT_MARISTANA_CONFIG
  try { return normaliseMaristanaConfig(JSON.parse(rows[0].v)) } catch { return DEFAULT_MARISTANA_CONFIG }
}

function text(value, max) {
  const clean = String(value ?? '').trim().replace(/\s+/g, ' ')
  return clean ? clean.slice(0, max) : null
}

/**
 * Which active-study surfaces count as "reading" vs "solving" for the study
 * breakdown. Reading is consuming content (the reader, the library, the
 * glossary); solving is answering or doing. Anything else is other study.
 * Surfaces are the route sections `StudyActivityTracker` sends.
 */
const READING_SURFACES = new Set(['resources', 'library', 'taxonomy'])
const SOLVING_SURFACES = new Set([
  'qbank', 'adaptive', 'practical', 'essays', 'minigames', 'term-grid', 'spotter',
  'term-match', 'clinical-sequence', 'mechanism-chain', 'red-flag-sort', 'study-together',
])

export function classifyStudySurface(surface) {
  if (READING_SURFACES.has(surface)) return 'reading'
  if (SOLVING_SURFACES.has(surface)) return 'solving'
  return 'other'
}

/** Sum per-surface minute rows into reading / solving / other minute totals. */
export function studyMinutesByClass(rows) {
  const totals = { reading: 0, solving: 0, other: 0 }
  for (const row of rows ?? []) {
    totals[classifyStudySurface(row.surface)] += Number(row.minutes ?? 0)
  }
  return totals
}

/**
 * One accepted row is one active minute. The wall-clock minute bucket is
 * unique per student, so two tabs cannot double-count and replaying a request
 * is harmless. Buckets too far from the server clock are refused.
 */
export async function recordStudyHeartbeat(userId, input) {
  const bucket = Number(input?.bucket)
  const current = Math.floor(Date.now() / 60_000)
  if (!Number.isInteger(bucket) || Math.abs(current - bucket) > 2) return { error: 'invalid_minute_bucket' }
  const [result] = await pool.query(
    `INSERT IGNORE INTO maristana_study_minutes
       (user_id, minute_bucket, session_id, module_id, subject_id, surface)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      userId,
      bucket,
      text(input?.sessionId, 64) ?? `minute-${bucket}`,
      text(input?.moduleId, 96),
      text(input?.subjectId, 96),
      text(input?.surface, 64),
    ],
  )
  return { ok: true, accepted: result.affectedRows === 1, minuteBucket: bucket }
}

export async function renameHospital(userId, slotValue, nameValue) {
  const slot = Number(slotValue)
  const name = text(nameValue, 80)
  if (!Number.isInteger(slot) || slot < 1 || slot > 999 || !name) return { error: 'invalid_hospital' }
  const overview = await maristanaOverview(userId, { includeRecent: false })
  if (!overview.hospitals.some((hospital) => hospital.slot === slot)) return { error: 'hospital_not_unlocked' }
  await pool.query(
    `INSERT INTO maristana_hospitals (user_id, slot_number, name)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), updated_at = CURRENT_TIMESTAMP`,
    [userId, slot, name],
  )
  return { ok: true, slot, name }
}

function assessmentRows(rows) {
  return rows.map((row) => Math.round((Number(row.correctAnswers) / Math.max(1, Number(row.questionsAnswered))) * 100))
}

export async function maristanaOverview(userId, { includeRecent = true } = {}) {
  const config = await readConfig()
  const assessmentThreshold = config.assessmentMinimumQuestions
  const [
    [studyRows], [questionRows], [assessmentSessionRows], [nameRows],
    [weekStudyRows], [weekQuestionRows], [weekSurfaceRows], recentQuestionResult, recentStudyResult,
  ] = await Promise.all([
    pool.query('SELECT COUNT(*) AS studyMinutes FROM maristana_study_minutes WHERE user_id = ?', [userId]),
    pool.query('SELECT COUNT(*) AS questionsAnswered, COALESCE(SUM(correct), 0) AS correctAnswers FROM qbank_attempts WHERE user_id = ?', [userId]),
    pool.query(
      `SELECT session_id, COUNT(*) AS questionsAnswered, COALESCE(SUM(correct), 0) AS correctAnswers,
              MAX(verified_at) AS completedAt, MAX(topic) AS topic
         FROM qbank_attempts WHERE user_id = ?
        GROUP BY session_id HAVING COUNT(*) >= ?`,
      [userId, assessmentThreshold],
    ),
    pool.query('SELECT slot_number AS slot, name FROM maristana_hospitals WHERE user_id = ? ORDER BY slot_number', [userId]),
    pool.query('SELECT COUNT(*) AS studyMinutes FROM maristana_study_minutes WHERE user_id = ? AND recorded_at >= NOW() - INTERVAL 7 DAY', [userId]),
    pool.query('SELECT COUNT(*) AS questionsAnswered, COALESCE(SUM(correct), 0) AS correctAnswers FROM qbank_attempts WHERE user_id = ? AND verified_at >= NOW() - INTERVAL 7 DAY', [userId]),
    pool.query(
      `SELECT surface, COUNT(*) AS minutes
         FROM maristana_study_minutes
        WHERE user_id = ? AND recorded_at >= NOW() - INTERVAL 7 DAY
        GROUP BY surface`, [userId],
    ),
    includeRecent ? pool.query(
      `SELECT id, session_id AS sessionId, topic, correct, verified_at AS at
         FROM qbank_attempts WHERE user_id = ? ORDER BY verified_at DESC LIMIT 8`, [userId],
    ) : Promise.resolve([[]]),
    includeRecent ? pool.query(
      `SELECT DATE(recorded_at) AS day, COUNT(*) AS minutes, MAX(recorded_at) AS at,
              MAX(COALESCE(module_id, subject_id, surface)) AS scope
         FROM maristana_study_minutes WHERE user_id = ? AND recorded_at >= NOW() - INTERVAL 7 DAY
        GROUP BY DATE(recorded_at) ORDER BY day DESC LIMIT 4`, [userId],
    ) : Promise.resolve([[]]),
  ])

  const studyMinutes = Number(studyRows[0]?.studyMinutes ?? 0)
  const questionsAnswered = Number(questionRows[0]?.questionsAnswered ?? 0)
  const correctAnswers = Number(questionRows[0]?.correctAnswers ?? 0)
  const assessmentScores = assessmentRows(assessmentSessionRows)
  const { breakdown, total } = calculateMaristanaCredits({ studyMinutes, questionsAnswered, correctAnswers, assessmentScores }, config)
  const names = Object.fromEntries(nameRows.map((row) => [Number(row.slot), row.name]))
  const hospitalCredits = config.creditsPerStep * MARISTANA_STEPS

  const weekStudyMinutes = Number(weekStudyRows[0]?.studyMinutes ?? 0)
  const weekQuestions = Number(weekQuestionRows[0]?.questionsAnswered ?? 0)
  const weekCorrect = Number(weekQuestionRows[0]?.correctAnswers ?? 0)
  const weekCredits = calculateMaristanaCredits({
    studyMinutes: weekStudyMinutes,
    questionsAnswered: weekQuestions,
    correctAnswers: weekCorrect,
    assessmentScores: [],
  }, config).total

  const recentQuestions = recentQuestionResult[0] ?? []
  const recentStudy = recentStudyResult[0] ?? []
  const recentActivity = [
    ...recentStudy.map((row) => ({
      id: `study-${row.day}`,
      kind: 'study',
      label: 'Focused study',
      detail: `${row.scope || 'Active learning'} · ${Number(row.minutes)} active minutes`,
      credits: Math.round(Number(row.minutes) * config.creditsPerStudyMinute),
      at: row.at,
    })),
    ...recentQuestions.map((row) => ({
      id: `question-${row.id}`,
      kind: 'question',
      label: row.topic || 'Question Bank',
      detail: row.correct ? 'Correct answer' : 'Scored attempt',
      credits: config.creditsPerQuestion + (row.correct ? config.creditsPerCorrectAnswer : 0),
      at: row.at,
    })),
  ].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()).slice(0, 6)

  return {
    enabled: config.enabled,
    config,
    totalCredits: total,
    completedHospitals: Math.floor(total / hospitalCredits),
    studyMinutes,
    questionsAnswered,
    correctAnswers,
    assessmentSessions: assessmentScores.length,
    averageAssessmentScore: assessmentScores.length
      ? Math.round(assessmentScores.reduce((sum, score) => sum + score, 0) / assessmentScores.length)
      : null,
    breakdown,
    hospitals: buildHospitalSlots(total, config, names),
    recentActivity,
    thisWeek: {
      studyMinutes: weekStudyMinutes,
      questionsAnswered: weekQuestions,
      credits: weekCredits,
      // Real, from the per-minute surface ledger — not an estimate.
      ...studyMinutesByClass(weekSurfaceRows),
    },
  }
}
