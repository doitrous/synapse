import { pool } from './db.js'
import { GIGABYTE } from './storage.js'

export function reachedStorageThresholdGb(bytes) {
  const gb = Number(bytes) / GIGABYTE
  if (!Number.isFinite(gb) || gb < 20) return null
  if (gb >= 110) return 110 + Math.floor((gb - 110) / 20) * 20
  for (const threshold of [90, 70, 50, 20]) {
    if (gb >= threshold) return threshold
  }
  return null
}

export function storageWarningState({ usedBytes, acknowledgedThresholdGb }) {
  const reached = reachedStorageThresholdGb(usedBytes)
  return {
    reachedThresholdGb: reached,
    acknowledgedThresholdGb: acknowledgedThresholdGb ?? null,
    warning: reached !== null && reached > Number(acknowledgedThresholdGb ?? 0),
  }
}

function safeJson(value, fallback) {
  try { return JSON.parse(value) } catch { return fallback }
}

function isUnresolvedRequiredMediaRequest(value) {
  return value
    && typeof value === 'object'
    && value.priority === 'required'
    && (value.status !== 'supplied' || !String(value.mediaId ?? '').trim())
}

function countUnresolvedRequiredMedia(value) {
  if (!value || typeof value !== 'object') return 0
  if (Array.isArray(value)) return value.reduce((sum, item) => sum + countUnresolvedRequiredMedia(item), 0)
  let total = 0
  for (const [key, inner] of Object.entries(value)) {
    if (key === 'mediaRequests' && Array.isArray(inner)) {
      total += inner.filter(isUnresolvedRequiredMediaRequest).length
    } else {
      total += countUnresolvedRequiredMedia(inner)
    }
  }
  return total
}

function countBlockedContent(ledger) {
  if (!Array.isArray(ledger)) return { mediaBlocked: 0, contentHealth: { total: 0, published: 0, invalid: 0 } }
  let mediaBlocked = 0
  let published = 0
  let invalid = 0
  for (const item of ledger) {
    if (item?.status === 'Published') published += 1
    if (countUnresolvedRequiredMedia(item) > 0) mediaBlocked += 1
    if (item?.status === 'Invalid' || item?.readiness?.valid === false) invalid += 1
  }
  return { mediaBlocked, contentHealth: { total: ledger.length, published, invalid } }
}

export async function platformReport() {
  const [
    [studentCounts],
    [signupRows],
    [subscriptionRows],
    [documentBytes],
    [questionRows],
    [pendingEnrollmentRows],
    [ackRows],
    [ledgerRows],
    [reportRows],
    [mailRows],
  ] = await Promise.all([
    pool.query("SELECT COUNT(*) AS total, SUM(status = 'Active') AS active FROM students"),
    pool.query('SELECT COUNT(*) AS signups30d FROM students WHERE joined >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)'),
    pool.query("SELECT COUNT(*) AS activeSubscriptions FROM subscriptions WHERE status IN ('active','trialing') AND (expires_at IS NULL OR expires_at > NOW())"),
    pool.query("SELECT COALESCE(source_kind, 'resource') AS sourceKind, COALESCE(SUM(size_bytes), 0) AS bytes FROM user_documents WHERE deleted_at IS NULL GROUP BY COALESCE(source_kind, 'resource')"),
    pool.query('SELECT COUNT(*) AS verifiedAnswers, COUNT(DISTINCT user_id) AS activeAnswerers FROM qbank_attempts WHERE verified_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)'),
    pool.query("SELECT COUNT(*) AS pending FROM enrollment_change_requests WHERE status = 'pending'"),
    pool.query('SELECT threshold_gb AS thresholdGb, acknowledged_by AS acknowledgedBy, acknowledged_at AS acknowledgedAt FROM storage_threshold_acknowledgements ORDER BY threshold_gb DESC LIMIT 1'),
    pool.query("SELECT v FROM app_state WHERE k = 'synapse-admin-content-ledger-v4' LIMIT 1"),
    pool.query("SELECT v FROM app_state WHERE k = 'synapse-content-reports-v1' LIMIT 1"),
    pool.query("SELECT COUNT(*) AS sent30d, SUM(status <> 'sent' AND status <> 'delivered') AS problem30d FROM emails WHERE direction = 'outbound' AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)"),
  ])
  const ledger = safeJson(ledgerRows[0]?.v, [])
  const reports = safeJson(reportRows[0]?.v, [])
  const bySource = { resource: 0, notebook: 0, whiteboard: 0 }
  for (const row of documentBytes) {
    const key = ['resource', 'notebook', 'whiteboard'].includes(row.sourceKind) ? row.sourceKind : 'resource'
    bySource[key] += Number(row.bytes ?? 0)
  }
  const storageBytes = bySource.resource + bySource.notebook + bySource.whiteboard
  const ack = ackRows[0] ?? null
  const storage = {
    usedBytes: storageBytes,
    bySource,
    ...storageWarningState({ usedBytes: storageBytes, acknowledgedThresholdGb: ack?.thresholdGb ?? null }),
    acknowledgedBy: ack?.acknowledgedBy ?? null,
    acknowledgedAt: ack?.acknowledgedAt ?? null,
  }
  const content = countBlockedContent(ledger)
  return {
    generatedAt: new Date().toISOString(),
    storage,
    students: {
      total: Number(studentCounts[0]?.total ?? 0),
      active: Number(studentCounts[0]?.active ?? 0),
      signups30d: Number(signupRows[0]?.signups30d ?? 0),
    },
    subscriptions: {
      active: Number(subscriptionRows[0]?.activeSubscriptions ?? 0),
      revenueCurrency: 'EGP',
      revenue30d: null,
    },
    engagement: {
      verifiedAnswers30d: Number(questionRows[0]?.verifiedAnswers ?? 0),
      activeAnswerers30d: Number(questionRows[0]?.activeAnswerers ?? 0),
    },
    verifiedQuestionActivity: {
      answers30d: Number(questionRows[0]?.verifiedAnswers ?? 0),
    },
    contentHealth: content.contentHealth,
    mediaBlockedContent: content.mediaBlocked,
    reports: Array.isArray(reports) ? { open: reports.filter((report) => report?.status !== 'closed').length, total: reports.length } : { open: 0, total: 0 },
    pendingEnrollmentChanges: Number(pendingEnrollmentRows[0]?.pending ?? 0),
    notificationDelivery: {
      outbound30d: Number(mailRows[0]?.sent30d ?? 0),
      problem30d: Number(mailRows[0]?.problem30d ?? 0),
    },
  }
}

export async function acknowledgeStorageThreshold(thresholdGb, actorId) {
  const threshold = Number(thresholdGb)
  if (!Number.isInteger(threshold) || threshold < 20) return { error: 'invalid_threshold' }
  await pool.query(
    `INSERT INTO storage_threshold_acknowledgements (threshold_gb, acknowledged_by)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE acknowledged_by = VALUES(acknowledged_by), acknowledged_at = CURRENT_TIMESTAMP`,
    [threshold, actorId],
  )
  return { ok: true, thresholdGb: threshold }
}
