import { randomUUID } from 'node:crypto'
import { pool } from './db.js'
import { inAudience, loadStudentContent } from './studentContent.js'
import { yearNumber } from './contentScope.js'
import { managedMediaFile, mediaRecords } from './mediaStore.js'

export const VALIDATOR_ROLE = 'mcq_validator'
export const ISSUE_CATEGORIES = [
  'unclear_wording',
  'multiple_plausible_answers',
  'incorrect_answer_key',
  'wrong_curriculum_placement',
  'outdated_or_incomplete',
]
export const RELEVANCE_VALUES = ['taught', 'not_taught', 'uncertain']
export const SOURCE_TYPES = ['curriculum_map', 'schedule', 'supporting_source']
export const MAX_SOURCE_BYTES = 5 * 1024 * 1024

function text(value, max = 255) {
  const clean = String(value ?? '').trim()
  return clean ? clean.slice(0, max) : null
}

function parsed(value, fallback = null) {
  if (value == null) return fallback
  if (typeof value === 'object') return value
  try { return JSON.parse(value) } catch { return fallback }
}

function dateOrNull(value) {
  if (!value) return null
  const date = new Date(value)
  return Number.isFinite(date.getTime()) ? date : null
}

function endDateExclusive(value) {
  const date = dateOrNull(value)
  if (!date) return null
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(value))) date.setUTCDate(date.getUTCDate() + 1)
  return date
}

function list(value) {
  return [...new Set((Array.isArray(value) ? value : []).map((entry) => text(entry, 96)).filter(Boolean))]
}

function validatorMediaUrl(value) {
  const url = text(value, 2000)
  if (!url) return null
  const match = url.match(/^\/media\/([^/?#]+)$/)
  return match ? `/mcq-validator/media/${match[1]}` : url
}

function httpUrl(value, max = 2000) {
  const candidate = text(value, max)
  if (!candidate) return null
  try {
    const url = new URL(candidate)
    return url.protocol === 'https:' || url.protocol === 'http:' ? candidate : null
  } catch {
    return null
  }
}

export function validatorQuestionSnapshot(item, mediaById = new Map()) {
  const data = item?.questionData ?? {}
  const answers = (Array.isArray(data.answers) ? data.answers : [])
    .map((answer) => ({ label: text(answer?.label, 32), text: text(answer?.text, 4000) }))
    .filter((answer) => answer.label && answer.text)
  return {
    id: text(item?.id, 96),
    stem: text(item?.title, 20_000),
    vignette: text(item?.fields?.Vignette, 20_000),
    leadIn: text(item?.fields?.['Lead-in'] ?? item?.fields?.LeadIn, 4000),
    subjectId: text(item?.subjectId, 96),
    topic: text(data.tags?.topic ?? item?.fields?.Topic, 500),
    format: text(data.format, 64) ?? 'mcq_single_best',
    attachedImage: validatorMediaUrl(data.attachedImage),
    attachments: (Array.isArray(data.attachments) ? data.attachments : []).map((attachment) => ({
      id: text(attachment?.id, 96), type: text(attachment?.type, 16), name: text(attachment?.name, 255),
      url: validatorMediaUrl(attachment?.url), mimeType: text(attachment?.mimeType, 128), size: Number(attachment?.size) || 0,
    })).filter((attachment) => attachment.id && attachment.url && ['image', 'audio', 'video'].includes(attachment.type)),
    media: (Array.isArray(data.media) ? data.media : []).map((placement) => ({
      id: text(placement?.id, 96), mediaId: text(placement?.mediaId, 96), slot: text(placement?.slot, 32),
      answerLabel: text(placement?.answerLabel, 32), caption: text(placement?.caption, 1000),
    })).filter((placement) => placement.id && placement.mediaId && placement.slot === 'stem'),
    mediaRecords: (Array.isArray(data.media) ? data.media : [])
      .filter((placement) => placement?.slot === 'stem')
      .map((placement) => mediaById.get(placement.mediaId))
      .filter(Boolean)
      .map((record) => ({
        id: record.id,
        type: record.mediaType || (String(record.mimeType).startsWith('audio/') ? 'audio' : String(record.mimeType).startsWith('video/') ? 'video' : 'image'),
        name: record.title || 'Question media',
        url: `/mcq-validator/media/${encodeURIComponent(record.id)}`,
        mimeType: record.mimeType,
        size: Number(record.sizeBytes) || 0,
        altText: record.altText || record.title || 'Question media',
      })),
    answers,
  }
}

export function assertBlindQuestion(question) {
  const forbidden = new Set(['correctanswer', 'correct_answer', 'explanation', 'answerkey', 'answer_key'])
  function isSafe(value) {
    if (Array.isArray(value)) return value.every(isSafe)
    if (!value || typeof value !== 'object') return true
    return Object.entries(value).every(([key, child]) => !forbidden.has(key.toLowerCase()) && isSafe(child))
  }
  return isSafe(question)
}

export async function createValidationBatch(actorId, input) {
  const title = text(input?.title, 255)
  const universityId = text(input?.universityId, 64)
  const questionIds = list(input?.questionIds)
  if (!title || !universityId || !questionIds.length) return { error: 'title, universityId and questionIds are required' }
  if (questionIds.length > 500) return { error: 'a batch may contain at most 500 questions' }

  const batch = {
    id: randomUUID(),
    title,
    universityId,
    academicYear: text(input?.academicYear, 64),
    yearId: text(input?.yearId, 64),
    term: text(input?.term, 64),
    moduleId: text(input?.moduleId, 96),
    moduleName: text(input?.moduleName, 255),
    subjectId: text(input?.subjectId, 96),
    subjectName: text(input?.subjectName, 255),
    dueAt: dateOrNull(input?.dueAt),
  }
  const audience = {
    universityId: batch.universityId.toUpperCase(),
    yearId: batch.yearId,
    year: yearNumber(batch.yearId) ?? yearNumber(batch.academicYear),
  }
  const [content, releasedMedia] = await Promise.all([loadStudentContent(), mediaRecords()])
  const mediaById = new Map(releasedMedia.map((record) => [record.id, record]))
  const rows = []
  for (const questionId of questionIds) {
    const item = content.byId.get(questionId)
    const snapshot = validatorQuestionSnapshot(item, mediaById)
    const correctAnswer = text(item?.questionData?.correctAnswer, 32)
    if (item?.kind !== 'question' || !inAudience(item, audience)
      || snapshot.answers.length < 2 || !snapshot.answers.some((a) => a.label === correctAnswer)) {
      return { error: 'question_not_assignable', questionId }
    }
    if (!assertBlindQuestion(snapshot)) return { error: 'unsafe_question_snapshot', questionId }
    rows.push({ questionId, snapshot, correctAnswer })
  }

  const placement = JSON.stringify({
    universityId: batch.universityId, academicYear: batch.academicYear, yearId: batch.yearId,
    term: batch.term, moduleId: batch.moduleId, moduleName: batch.moduleName,
    subjectId: batch.subjectId, subjectName: batch.subjectName,
  })
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    await conn.query(
      `INSERT INTO mcq_validation_batches
       (id, title, university_id, academic_year, year_id, term, module_id, module_name, subject_id, subject_name, due_at, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [batch.id, batch.title, batch.universityId, batch.academicYear, batch.yearId, batch.term, batch.moduleId,
        batch.moduleName, batch.subjectId, batch.subjectName, batch.dueAt, actorId],
    )
    const placeholders = rows.map(() => '(?, ?, ?, ?, ?, ?)').join(', ')
    const params = rows.flatMap((row, index) => [batch.id, row.questionId, index + 1, JSON.stringify(row.snapshot), row.correctAnswer, placement])
    await conn.query(
      `INSERT INTO mcq_validation_batch_questions
       (batch_id, question_id, ordinal_no, question_snapshot, correct_answer, curriculum_placement)
       VALUES ${placeholders}`,
      params,
    )
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
  return { ok: true, batch: { ...batch, status: 'draft', questionCount: rows.length } }
}

export async function assignValidationBatch(actorId, batchId, validatorIds) {
  const ids = list(validatorIds)
  if (!ids.length) return { error: 'validatorIds are required' }
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [batches] = await conn.query(
      'SELECT id, university_id AS universityId, status FROM mcq_validation_batches WHERE id = ? FOR UPDATE',
      [batchId],
    )
    const batch = batches[0]
    if (!batch) { await conn.rollback(); return { error: 'batch_not_found' } }
    if (batch.status === 'closed') { await conn.rollback(); return { error: 'batch_closed' } }
    const placeholders = ids.map(() => '?').join(',')
    const [validators] = await conn.query(
      `SELECT a.user_id AS validatorId, s.university_id AS universityId
         FROM user_access a JOIN students s ON s.user_id = a.user_id
        WHERE a.user_id IN (${placeholders}) AND a.role = ? AND a.status = 'active'`,
      [...ids, VALIDATOR_ROLE],
    )
    const valid = new Map(validators.map((row) => [row.validatorId, row]))
    const invalid = ids.filter((id) => !valid.has(id) || valid.get(id).universityId !== batch.universityId)
    if (invalid.length) { await conn.rollback(); return { error: 'validators_must_be_active_and_in_batch_university', validatorIds: invalid } }
    for (const validatorId of ids) {
      await conn.query(
        `INSERT IGNORE INTO mcq_validation_assignments
         (id, batch_id, validator_id, university_id, assigned_by) VALUES (?, ?, ?, ?, ?)`,
        [randomUUID(), batchId, validatorId, batch.universityId, actorId],
      )
    }
    await conn.query("UPDATE mcq_validation_batches SET status = 'assigned' WHERE id = ?", [batchId])
    await conn.commit()
    return { ok: true, assigned: ids.length }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export async function validationSetup() {
  const [validators, batches] = await Promise.all([
    pool.query(
      `SELECT a.user_id AS id, COALESCE(s.name, a.email, a.user_id) AS name, a.email,
              s.university_id AS universityId, s.year, s.year_id AS yearId
         FROM user_access a LEFT JOIN students s ON s.user_id = a.user_id
        WHERE a.role = ? AND a.status = 'active' ORDER BY s.university_id, name`,
      [VALIDATOR_ROLE],
    ).then(([rows]) => rows),
    pool.query(
      `SELECT b.id, b.title, b.university_id AS universityId, b.academic_year AS academicYear,
              b.year_id AS yearId, b.term, b.module_id AS moduleId, b.module_name AS moduleName,
              b.subject_id AS subjectId, b.subject_name AS subjectName, b.status, b.due_at AS dueAt,
              b.created_at AS createdAt, COUNT(DISTINCT q.question_id) AS questionCount,
              COUNT(DISTINCT a.id) AS validatorCount,
              COUNT(DISTINCT CASE WHEN a.status = 'completed' THEN a.id END) AS completedAssignments
         FROM mcq_validation_batches b
         LEFT JOIN mcq_validation_batch_questions q ON q.batch_id = b.id
         LEFT JOIN mcq_validation_assignments a ON a.batch_id = b.id
        GROUP BY b.id ORDER BY b.created_at DESC LIMIT 250`,
    ).then(([rows]) => rows),
  ])
  return { validators, batches }
}

function shapeOwnAssignment(row) {
  return {
    assignmentId: row.assignmentId,
    batchId: row.batchId,
    title: row.title,
    universityId: row.universityId,
    academicYear: row.academicYear,
    yearId: row.yearId,
    term: row.term,
    moduleId: row.moduleId,
    moduleName: row.moduleName,
    subjectId: row.subjectId,
    subjectName: row.subjectName,
    status: row.status,
    assignedAt: row.assignedAt,
    startedAt: row.startedAt,
    completedAt: row.completedAt,
    dueAt: row.dueAt,
    questionCount: Number(row.questionCount ?? 0),
    submittedCount: Number(row.submittedCount ?? 0),
  }
}

export async function ownValidationWorkspace(validatorId) {
  const [assignmentRows, submissions, sources] = await Promise.all([
    pool.query(
      `SELECT a.id AS assignmentId, a.batch_id AS batchId, a.status, a.assigned_at AS assignedAt,
              a.started_at AS startedAt, a.completed_at AS completedAt,
              b.title, b.university_id AS universityId, b.academic_year AS academicYear,
              b.year_id AS yearId, b.term, b.module_id AS moduleId, b.module_name AS moduleName,
              b.subject_id AS subjectId, b.subject_name AS subjectName, b.due_at AS dueAt,
              (SELECT COUNT(*) FROM mcq_validation_batch_questions q WHERE q.batch_id = b.id) AS questionCount,
              (SELECT COUNT(*) FROM mcq_validation_submissions s WHERE s.assignment_id = a.id) AS submittedCount
         FROM mcq_validation_assignments a JOIN mcq_validation_batches b ON b.id = a.batch_id
        WHERE a.validator_id = ? ORDER BY a.assigned_at DESC`,
      [validatorId],
    ).then(([rows]) => rows),
    pool.query(
      `SELECT id, assignment_id AS assignmentId, batch_id AS batchId, question_id AS questionId,
              selected_answer AS selectedAnswer, confidence, time_seconds AS timeSeconds,
              curriculum_relevance AS curriculumRelevance, issue_category AS issueCategory,
              suggested_correction AS suggestedCorrection, evidence_text AS evidenceText,
              evidence_url AS evidenceUrl, source_id AS sourceId, submitted_at AS submittedAt
         FROM mcq_validation_submissions WHERE validator_id = ? ORDER BY submitted_at DESC`,
      [validatorId],
    ).then(([rows]) => rows),
    pool.query(
      `SELECT id, assignment_id AS assignmentId, source_type AS sourceType, title, file_name AS fileName,
              mime_type AS mimeType, size_bytes AS sizeBytes, source_url AS sourceUrl, uploaded_at AS uploadedAt
         FROM mcq_validation_sources WHERE validator_id = ? ORDER BY uploaded_at DESC`,
      [validatorId],
    ).then(([rows]) => rows),
  ])
  const assignments = assignmentRows.map(shapeOwnAssignment)
  const totals = assignments.reduce((out, a) => ({
    assigned: out.assigned + 1,
    started: out.started + (a.status === 'started' ? 1 : 0),
    completed: out.completed + (a.status === 'completed' ? 1 : 0),
    questions: out.questions + a.questionCount,
    submitted: out.submitted + a.submittedCount,
  }), { assigned: 0, started: 0, completed: 0, questions: 0, submitted: 0 })
  return { totals, assignments, submissions, sources }
}

export async function ownValidationBatch(validatorId, batchId) {
  const [assignments] = await pool.query(
    `SELECT a.id AS assignmentId, a.status, a.assigned_at AS assignedAt, a.started_at AS startedAt,
            a.completed_at AS completedAt, b.*
       FROM mcq_validation_assignments a JOIN mcq_validation_batches b ON b.id = a.batch_id
      WHERE a.validator_id = ? AND a.batch_id = ? LIMIT 1`,
    [validatorId, batchId],
  )
  if (!assignments.length) return null
  const [questions] = await pool.query(
    `SELECT q.question_id AS questionId, q.ordinal_no AS ordinalNo, q.question_snapshot AS questionSnapshot,
            s.id AS submissionId, s.submitted_at AS submittedAt
       FROM mcq_validation_batch_questions q
       LEFT JOIN mcq_validation_submissions s
         ON s.assignment_id = ? AND s.question_id = q.question_id
      WHERE q.batch_id = ? ORDER BY q.ordinal_no`,
    [assignments[0].assignmentId, batchId],
  )
  return {
    assignment: shapeOwnAssignment({ ...assignments[0], batchId, questionCount: questions.length, submittedCount: questions.filter((q) => q.submissionId).length }),
    questions: questions.map((row) => ({
      questionId: row.questionId, ordinalNo: row.ordinalNo,
      question: parsed(row.questionSnapshot, {}),
      submitted: Boolean(row.submissionId), submittedAt: row.submittedAt ?? null,
    })),
  }
}

/** Only question media captured in one of this validator's assigned blind snapshots is readable. */
export async function ownValidationMedia(validatorId, mediaId) {
  const [rows] = await pool.query(
    `SELECT q.question_snapshot AS questionSnapshot
       FROM mcq_validation_assignments a
       JOIN mcq_validation_batch_questions q ON q.batch_id = a.batch_id
      WHERE a.validator_id = ?`,
    [validatorId],
  )
  const expectedPath = `/mcq-validator/media/${encodeURIComponent(mediaId)}`
  const allowed = rows.some((row) => {
    const snapshot = parsed(row.questionSnapshot, {})
    return snapshot?.attachedImage === expectedPath
      || (Array.isArray(snapshot?.attachments) && snapshot.attachments.some((entry) => entry?.url === expectedPath))
      || (Array.isArray(snapshot?.media) && snapshot.media.some((entry) => entry?.mediaId === mediaId))
      || (Array.isArray(snapshot?.mediaRecords) && snapshot.mediaRecords.some((entry) => entry?.id === mediaId))
  })
  return allowed ? managedMediaFile(mediaId) : null
}

export async function submitValidationResponse(validatorId, batchId, input) {
  const questionId = text(input?.questionId, 96)
  const selectedAnswer = text(input?.selectedAnswer, 32)
  const confidence = Number(input?.confidence)
  const timeSeconds = Number(input?.timeSeconds)
  const relevance = text(input?.curriculumRelevance, 32)
  const issueCategory = text(input?.issueCategory, 64)
  if (!questionId || !selectedAnswer) return { error: 'questionId and selectedAnswer are required' }
  if (!Number.isInteger(confidence) || confidence < 1 || confidence > 5) return { error: 'confidence must be from 1 to 5' }
  if (!Number.isInteger(timeSeconds) || timeSeconds < 0 || timeSeconds > 86_400) return { error: 'timeSeconds is invalid' }
  if (!RELEVANCE_VALUES.includes(relevance)) return { error: 'curriculumRelevance is invalid' }
  if (issueCategory && !ISSUE_CATEGORIES.includes(issueCategory)) return { error: 'issueCategory is invalid' }
  const rawEvidenceUrl = text(input?.evidenceUrl, 2000)
  const evidenceUrl = httpUrl(rawEvidenceUrl)
  if (rawEvidenceUrl && !evidenceUrl) return { error: 'evidenceUrl must be an http or https URL' }

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [assignments] = await conn.query(
      `SELECT a.id AS assignmentId, a.university_id AS universityId, a.status,
              b.academic_year AS academicYear, b.year_id AS yearId, b.term,
              b.module_id AS moduleId, b.module_name AS moduleName,
              b.subject_id AS subjectId, b.subject_name AS subjectName
         FROM mcq_validation_assignments a JOIN mcq_validation_batches b ON b.id = a.batch_id
        WHERE a.validator_id = ? AND a.batch_id = ? FOR UPDATE`,
      [validatorId, batchId],
    )
    const assignment = assignments[0]
    if (!assignment) { await conn.rollback(); return { error: 'assignment_not_found' } }
    if (assignment.status === 'completed') { await conn.rollback(); return { error: 'assignment_completed' } }
    const [questionRows] = await conn.query(
      `SELECT question_snapshot AS questionSnapshot, correct_answer AS correctAnswer
         FROM mcq_validation_batch_questions WHERE batch_id = ? AND question_id = ?`,
      [batchId, questionId],
    )
    const question = questionRows[0]
    if (!question) { await conn.rollback(); return { error: 'question_not_in_batch' } }
    const snapshot = parsed(question.questionSnapshot, {})
    if (!Array.isArray(snapshot.answers) || !snapshot.answers.some((answer) => answer.label === selectedAnswer)) {
      await conn.rollback(); return { error: 'selectedAnswer is not an option' }
    }
    const sourceId = text(input?.sourceId, 64)
    if (sourceId) {
      const [sources] = await conn.query(
        'SELECT id FROM mcq_validation_sources WHERE id = ? AND validator_id = ? AND university_id = ?',
        [sourceId, validatorId, assignment.universityId],
      )
      if (!sources.length) { await conn.rollback(); return { error: 'supporting source is not available' } }
    }
    await conn.query(
      `INSERT INTO mcq_validation_submissions
       (id, assignment_id, batch_id, validator_id, university_id, question_id,
        academic_year, year_id, term, module_id, module_name, subject_id, subject_name,
        selected_answer, is_correct, confidence, time_seconds, curriculum_relevance,
        issue_category, suggested_correction, evidence_text, evidence_url, source_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [randomUUID(), assignment.assignmentId, batchId, validatorId, assignment.universityId, questionId,
        assignment.academicYear, assignment.yearId, assignment.term, assignment.moduleId, assignment.moduleName,
        assignment.subjectId, assignment.subjectName, selectedAnswer, selectedAnswer === question.correctAnswer ? 1 : 0,
        confidence, timeSeconds, relevance, issueCategory, text(input?.suggestedCorrection, 5000),
        text(input?.evidenceText, 5000), evidenceUrl, sourceId],
    )
    const [[counts]] = await conn.query(
      `SELECT (SELECT COUNT(*) FROM mcq_validation_batch_questions WHERE batch_id = ?) AS total,
              (SELECT COUNT(*) FROM mcq_validation_submissions WHERE assignment_id = ?) AS submitted`,
      [batchId, assignment.assignmentId],
    )
    const completed = Number(counts.submitted) >= Number(counts.total)
    await conn.query(
      `UPDATE mcq_validation_assignments
          SET status = ?, started_at = COALESCE(started_at, NOW()), completed_at = IF(?, COALESCE(completed_at, NOW()), NULL)
        WHERE id = ?`,
      [completed ? 'completed' : 'started', completed ? 1 : 0, assignment.assignmentId],
    )
    await conn.commit()
    return { ok: true, status: completed ? 'completed' : 'started', submitted: Number(counts.submitted), total: Number(counts.total) }
  } catch (error) {
    await conn.rollback()
    if (error?.code === 'ER_DUP_ENTRY') return { error: 'already_submitted' }
    throw error
  } finally {
    conn.release()
  }
}

export async function uploadValidationSource(validatorId, input) {
  const sourceType = text(input?.sourceType, 64)
  const title = text(input?.title, 255)
  const rawSourceUrl = text(input?.sourceUrl, 2000)
  const sourceUrl = httpUrl(rawSourceUrl)
  const content = input?.contentBase64 ? Buffer.from(String(input.contentBase64), 'base64') : null
  if (!SOURCE_TYPES.includes(sourceType) || !title) return { error: 'sourceType and title are required' }
  if (rawSourceUrl && !sourceUrl) return { error: 'sourceUrl must be an http or https URL' }
  if (!sourceUrl && !content?.length) return { error: 'provide a sourceUrl or file' }
  if (content?.length > MAX_SOURCE_BYTES) return { error: 'file_too_large' }
  const [profiles] = await pool.query(
    `SELECT s.university_id AS universityId FROM user_access a JOIN students s ON s.user_id = a.user_id
      WHERE a.user_id = ? AND a.role = ? AND a.status = 'active'`,
    [validatorId, VALIDATOR_ROLE],
  )
  const profile = profiles[0]
  if (!profile?.universityId) return { error: 'validator_university_required' }
  const assignmentId = text(input?.assignmentId, 64)
  if (assignmentId) {
    const [assignments] = await pool.query(
      'SELECT id FROM mcq_validation_assignments WHERE id = ? AND validator_id = ? AND university_id = ?',
      [assignmentId, validatorId, profile.universityId],
    )
    if (!assignments.length) return { error: 'assignment_not_found' }
  }
  const id = randomUUID()
  await pool.query(
    `INSERT INTO mcq_validation_sources
     (id, validator_id, university_id, assignment_id, source_type, title, file_name, mime_type, size_bytes, source_url, content_bytes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, validatorId, profile.universityId, assignmentId, sourceType, title, text(input?.fileName, 255),
      text(input?.mimeType, 128), content?.length ?? 0, sourceUrl, content],
  )
  return { ok: true, source: { id, assignmentId, sourceType, title, fileName: text(input?.fileName, 255), mimeType: text(input?.mimeType, 128), sizeBytes: content?.length ?? 0, sourceUrl } }
}

export async function validationSource(sourceId) {
  const [rows] = await pool.query(
    `SELECT id, validator_id AS validatorId, university_id AS universityId, title,
            file_name AS fileName, mime_type AS mimeType, source_url AS sourceUrl,
            content_bytes AS contentBytes FROM mcq_validation_sources WHERE id = ?`,
    [sourceId],
  )
  return rows[0] ?? null
}

function whereFor(filters, columns, dateColumn) {
  const clauses = []
  const params = []
  for (const [key, column] of Object.entries(columns)) {
    if (!filters?.[key]) continue
    clauses.push(`${column} = ?`)
    params.push(String(filters[key]))
  }
  const from = dateColumn ? dateOrNull(filters?.from) : null
  const to = dateColumn ? endDateExclusive(filters?.to) : null
  if (from) { clauses.push(`${dateColumn} >= ?`); params.push(from) }
  if (to) { clauses.push(`${dateColumn} < ?`); params.push(to) }
  return { sql: clauses.length ? ` WHERE ${clauses.join(' AND ')}` : '', params }
}

function ratio(numerator, denominator) {
  return denominator ? numerator / denominator : 0
}

function metricGroups(rows, idKey, nameKey = idKey) {
  const groups = new Map()
  for (const row of rows) {
    const id = row[idKey] ?? 'Unspecified'
    const current = groups.get(id) ?? { id, label: row[nameKey] ?? id, attempted: 0, correct: 0, confidence: 0, seconds: 0 }
    current.attempted += 1
    current.correct += Number(Boolean(row.isCorrect))
    current.confidence += Number(row.confidence ?? 0)
    current.seconds += Number(row.timeSeconds ?? 0)
    groups.set(id, current)
  }
  return [...groups.values()].map((row) => ({
    id: row.id, label: row.label, attempted: row.attempted,
    accuracy: ratio(row.correct, row.attempted),
    averageConfidence: ratio(row.confidence, row.attempted),
    averageTimeSeconds: ratio(row.seconds, row.attempted),
  })).sort((a, b) => b.attempted - a.attempted)
}

export function buildValidationAnalytics({ validators, assignments, submissions }) {
  const totalValidators = validators.length
  const validatorsByUniversity = [...validators.reduce((map, row) => {
    const id = row.universityId ?? 'Unspecified'
    const value = map.get(id) ?? { universityId: id, validators: 0 }
    value.validators += 1
    map.set(id, value)
    return map
  }, new Map()).values()]

  const assignmentCounts = { assigned: 0, started: 0, completed: 0 }
  const byBatch = new Map()
  for (const row of assignments) {
    const batchId = row.batchId ?? row.id
    const statuses = byBatch.get(batchId) ?? []
    statuses.push(row.status)
    byBatch.set(batchId, statuses)
  }
  for (const statuses of byBatch.values()) {
    const state = statuses.every((status) => status === 'completed') ? 'completed'
      : statuses.some((status) => status !== 'assigned') ? 'started' : 'assigned'
    assignmentCounts[state] += 1
  }
  const completedAssignments = assignments.filter((row) => row.status === 'completed').length
  const completionRows = (key, labelKey) => {
    const grouped = new Map()
    for (const row of assignments) {
      const id = row[key] ?? 'Unspecified'
      const value = grouped.get(id) ?? { id, label: row[labelKey] ?? id, assigned: 0, completed: 0 }
      value.assigned += 1
      value.completed += row.status === 'completed' ? 1 : 0
      grouped.set(id, value)
    }
    return [...grouped.values()].map((row) => ({ ...row, completionRate: ratio(row.completed, row.assigned) }))
  }

  const relevance = { taught: 0, not_taught: 0, uncertain: 0 }
  const flags = Object.fromEntries(ISSUE_CATEGORIES.map((category) => [category, 0]))
  for (const row of submissions) {
    if (relevance[row.curriculumRelevance] !== undefined) relevance[row.curriculumRelevance] += 1
    if (row.issueCategory && flags[row.issueCategory] !== undefined) flags[row.issueCategory] += 1
  }

  const agreementMap = new Map()
  for (const row of submissions) {
    const key = row.questionId
    const group = agreementMap.get(key) ?? { questionId: row.questionId, universities: new Set(), responses: new Map() }
    group.universities.add(row.universityId ?? 'Unspecified')
    // One validator is one vote even when the same question appears in a later
    // batch. Queries arrive oldest-to-newest, so the newest response wins.
    group.responses.set(row.validatorId, row)
    agreementMap.set(key, group)
  }
  const agreement = [...agreementMap.values()].filter((group) => group.responses.size > 1).map((group) => {
    const answers = new Map()
    const relevanceDistribution = new Map()
    for (const row of group.responses.values()) {
      answers.set(row.selectedAnswer, (answers.get(row.selectedAnswer) ?? 0) + 1)
      relevanceDistribution.set(row.curriculumRelevance, (relevanceDistribution.get(row.curriculumRelevance) ?? 0) + 1)
    }
    const total = group.responses.size
    const top = Math.max(...answers.values())
    return {
      universityId: [...group.universities].join(', '), questionId: group.questionId, validatorCount: total,
      answerAgreement: ratio(top, total), disagreement: answers.size > 1,
      answerDistribution: Object.fromEntries(answers), relevanceDistribution: Object.fromEntries(relevanceDistribution),
    }
  }).sort((a, b) => Number(b.disagreement) - Number(a.disagreement) || a.answerAgreement - b.answerAgreement)

  const attempted = submissions.length
  const correct = submissions.reduce((sum, row) => sum + Number(Boolean(row.isCorrect)), 0)
  return {
    summary: {
      totalValidators, validatorsByUniversity, batches: assignmentCounts,
      completionRate: ratio(completedAssignments, assignments.length), questionsAttempted: attempted,
      uniqueQuestionsAttempted: new Set(submissions.map((row) => row.questionId)).size,
      accuracy: ratio(correct, attempted),
      averageConfidence: ratio(submissions.reduce((sum, row) => sum + Number(row.confidence ?? 0), 0), attempted),
      averageTimeSeconds: ratio(submissions.reduce((sum, row) => sum + Number(row.timeSeconds ?? 0), 0), attempted),
      relevance, flags,
    },
    completion: {
      byValidator: completionRows('validatorId', 'validatorName'),
      byUniversity: completionRows('universityId', 'universityId'),
    },
    accuracy: {
      byValidator: metricGroups(submissions, 'validatorId', 'validatorName'),
      byUniversity: metricGroups(submissions, 'universityId'),
      byYear: metricGroups(submissions.map((row) => ({
        ...row,
        yearKey: row.yearId ?? row.academicYear,
        yearLabel: row.academicYear ?? row.yearId,
      })), 'yearKey', 'yearLabel'),
      byTerm: metricGroups(submissions, 'term'),
      byModule: metricGroups(submissions, 'moduleId', 'moduleName'),
      bySubject: metricGroups(submissions, 'subjectId', 'subjectName'),
    },
    agreement,
  }
}

export async function validationAnalytics(filters = {}) {
  const vf = whereFor(filters, { universityId: 's.university_id', validatorId: 'a.user_id' })
  const af = whereFor(filters, {
    universityId: 'a.university_id', academicYear: 'b.academic_year', yearId: 'b.year_id', term: 'b.term',
    moduleId: 'b.module_id', subjectId: 'b.subject_id', validatorId: 'a.validator_id', batchStatus: 'a.status',
  }, 'a.assigned_at')
  const sf = whereFor(filters, {
    universityId: 's.university_id', academicYear: 's.academic_year', yearId: 's.year_id', term: 's.term',
    moduleId: 's.module_id', subjectId: 's.subject_id', validatorId: 's.validator_id', batchStatus: 'va.status',
  }, 's.submitted_at')
  const [validators, assignments, submissions, reviewQueue] = await Promise.all([
    pool.query(
      `SELECT a.user_id AS validatorId, COALESCE(s.name, a.email, a.user_id) AS validatorName,
              s.university_id AS universityId FROM user_access a LEFT JOIN students s ON s.user_id = a.user_id
        WHERE a.role = ?${vf.sql ? ` AND ${vf.sql.replace(/^ WHERE /, '')}` : ''}`,
      [VALIDATOR_ROLE, ...vf.params],
    ).then(([rows]) => rows),
    pool.query(
      `SELECT a.id, a.batch_id AS batchId, a.validator_id AS validatorId, a.university_id AS universityId, a.status,
              COALESCE(st.name, ua.email, a.validator_id) AS validatorName, b.title AS batchTitle
         FROM mcq_validation_assignments a JOIN mcq_validation_batches b ON b.id = a.batch_id
         LEFT JOIN user_access ua ON ua.user_id = a.validator_id LEFT JOIN students st ON st.user_id = a.validator_id${af.sql}`,
      af.params,
    ).then(([rows]) => rows),
    pool.query(
      `SELECT s.*, s.validator_id AS validatorId, s.university_id AS universityId,
              s.question_id AS questionId, s.is_correct AS isCorrect, s.selected_answer AS selectedAnswer,
              s.curriculum_relevance AS curriculumRelevance, s.issue_category AS issueCategory,
              s.time_seconds AS timeSeconds, s.academic_year AS academicYear, s.year_id AS yearId,
              s.module_id AS moduleId, s.module_name AS moduleName, s.subject_id AS subjectId,
              s.subject_name AS subjectName, COALESCE(st.name, ua.email, s.validator_id) AS validatorName
         FROM mcq_validation_submissions s JOIN mcq_validation_assignments va ON va.id = s.assignment_id
         LEFT JOIN user_access ua ON ua.user_id = s.validator_id
         LEFT JOIN students st ON st.user_id = s.validator_id${sf.sql}
        ORDER BY s.submitted_at`,
      sf.params,
    ).then(([rows]) => rows),
    pool.query(
      `SELECT s.id, s.question_id AS questionId, s.batch_id AS batchId, b.title AS batchTitle,
              s.validator_id AS validatorId, COALESCE(st.name, ua.email, s.validator_id) AS validatorName,
              s.university_id AS universityId, s.academic_year AS academicYear, s.term,
              s.module_name AS moduleName, s.subject_name AS subjectName, s.selected_answer AS selectedAnswer,
              s.is_correct AS isCorrect, s.confidence, s.time_seconds AS timeSeconds,
              s.curriculum_relevance AS curriculumRelevance, s.issue_category AS issueCategory,
              s.suggested_correction AS suggestedCorrection, s.evidence_text AS evidenceText,
              s.evidence_url AS evidenceUrl, s.source_id AS sourceId, s.submitted_at AS submittedAt
         FROM mcq_validation_submissions s JOIN mcq_validation_batches b ON b.id = s.batch_id
         JOIN mcq_validation_assignments va ON va.id = s.assignment_id
         LEFT JOIN user_access ua ON ua.user_id = s.validator_id LEFT JOIN students st ON st.user_id = s.validator_id
         ${sf.sql}${sf.sql ? ' AND' : ' WHERE'} s.issue_category IS NOT NULL
        ORDER BY s.submitted_at DESC LIMIT 500`,
      sf.params,
    ).then(([rows]) => rows),
  ])
  const filtered = Object.values(filters ?? {}).some((value) => Boolean(value))
  const assignedValidatorIds = new Set(assignments.map((row) => row.validatorId))
  const scopedValidators = filtered ? validators.filter((row) => assignedValidatorIds.has(row.validatorId)) : validators
  return { ...buildValidationAnalytics({ validators: scopedValidators, assignments, submissions }), reviewQueue }
}
