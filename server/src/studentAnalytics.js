/**
 * Everything the platform already knows about its students, aggregated for the
 * admin Student Analytics tab.
 *
 * Every figure here is server-owned and verified: question attempts come from
 * `qbank_attempts` (the server checks the answer key, so accuracy cannot be
 * gamed from a browser), study time from the server-clocked minute ledger,
 * subscriptions and redemptions from their own tables. Nothing is read from a
 * student's localStorage, so nothing here can be spoofed by a client.
 *
 * The shape mirrors `platformReport()` in platformReports.js: one function, all
 * queries fired in parallel, plain JSON out. No per-student rows leave here —
 * these are counts, rates and small top-N lists, so the tab reports the cohort
 * without turning into a surveillance export.
 */
import { pool } from './db.js'
import { answerChangeTracking } from './studyTrackingAdmin.js'

const num = (value) => Number(value ?? 0)

/** Fill a daily series so a quiet day reads as 0 rather than a gap. */
export function fillDays(rows, valueKeys, days = 30) {
  const byDay = new Map((rows ?? []).map((row) => [String(row.day instanceof Date ? row.day.toISOString().slice(0, 10) : row.day), row]))
  const out = []
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date()
    date.setUTCHours(0, 0, 0, 0)
    date.setUTCDate(date.getUTCDate() - i)
    const key = date.toISOString().slice(0, 10)
    const row = byDay.get(key)
    const point = { day: key }
    for (const field of valueKeys) point[field] = num(row?.[field])
    out.push(point)
  }
  return out
}

const list = (rows, labelKey = 'label', valueKey = 'count') =>
  (rows ?? []).map((row) => ({ label: row[labelKey] == null || row[labelKey] === '' ? 'Unspecified' : String(row[labelKey]), count: num(row[valueKey]) }))

const topics = (rows) => (rows ?? []).map((r) => ({ label: r.label, attempts: num(r.attempts), accuracy: r.accuracy == null ? null : Number(r.accuracy) }))

export async function studentAnalytics() {
  // Correct↔wrong transitions, derived from the same verified ledger. Kicked
  // off alongside the query fan-out below so it costs no extra wall-clock.
  const answerChangesPromise = answerChangeTracking({})
  const [
    [studentTotals],
    [signupTrendRows],
    [byUniversity],
    [byYear],
    [byPlan],
    [byStatus],
    [attemptWindows],
    [answererWindows],
    [attemptTrendRows],
    [sessions30],
    [overall],
    [bySubject],
    [hardestTopics],
    [topTopics],
    [accuracyTrendRows],
    [studyTrendRows],
    [studyWindows],
    [assistant30],
    [retention],
    [subsActive],
    [subsBySource],
    [subsByPlan],
    [redemptions],
    [devicesByPlatform],
    [devicesByVersion],
    [devicesByLocale],
  ] = await Promise.all([
    // ── Audience ──────────────────────────────────────────────────────────
    pool.query("SELECT COUNT(*) AS total, SUM(status = 'Active') AS active, SUM(joined >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) AS signups30d, SUM(joined >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)) AS signups90d FROM students"),
    pool.query('SELECT DATE(joined) AS day, COUNT(*) AS count FROM students WHERE joined >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY DATE(joined)'),
    pool.query('SELECT university_id AS label, COUNT(*) AS count FROM students GROUP BY university_id ORDER BY count DESC LIMIT 12'),
    pool.query('SELECT year AS label, COUNT(*) AS count FROM students GROUP BY year ORDER BY count DESC LIMIT 12'),
    pool.query('SELECT plan AS label, COUNT(*) AS count FROM students GROUP BY plan ORDER BY count DESC LIMIT 8'),
    pool.query('SELECT status AS label, COUNT(*) AS count FROM students GROUP BY status ORDER BY count DESC LIMIT 8'),

    // ── Engagement ────────────────────────────────────────────────────────
    pool.query('SELECT SUM(verified_at >= DATE_SUB(NOW(), INTERVAL 1 DAY)) AS d1, SUM(verified_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) AS d7, SUM(verified_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)) AS d30, COUNT(*) AS total FROM qbank_attempts'),
    pool.query('SELECT COUNT(DISTINCT IF(verified_at >= DATE_SUB(NOW(), INTERVAL 1 DAY), user_id, NULL)) AS d1, COUNT(DISTINCT IF(verified_at >= DATE_SUB(NOW(), INTERVAL 7 DAY), user_id, NULL)) AS d7, COUNT(DISTINCT IF(verified_at >= DATE_SUB(NOW(), INTERVAL 30 DAY), user_id, NULL)) AS d30 FROM qbank_attempts'),
    pool.query('SELECT DATE(verified_at) AS day, COUNT(*) AS attempts, COUNT(DISTINCT user_id) AS users FROM qbank_attempts WHERE verified_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY DATE(verified_at)'),
    pool.query('SELECT COUNT(DISTINCT session_id) AS sessions30d FROM qbank_attempts WHERE verified_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)'),

    // ── Performance ───────────────────────────────────────────────────────
    pool.query('SELECT COUNT(*) AS attempts, AVG(correct) AS accuracy, AVG(seconds) AS avgSeconds, SUM(overtime_seconds > 0) AS overtime FROM qbank_attempts'),
    pool.query('SELECT subject_id AS label, COUNT(*) AS attempts, AVG(correct) AS accuracy FROM qbank_attempts WHERE subject_id IS NOT NULL GROUP BY subject_id HAVING attempts >= 20 ORDER BY attempts DESC LIMIT 12'),
    pool.query("SELECT topic AS label, COUNT(*) AS attempts, AVG(correct) AS accuracy FROM qbank_attempts WHERE topic IS NOT NULL AND topic <> '' GROUP BY topic HAVING attempts >= 20 ORDER BY accuracy ASC LIMIT 10"),
    pool.query("SELECT topic AS label, COUNT(*) AS attempts, AVG(correct) AS accuracy FROM qbank_attempts WHERE topic IS NOT NULL AND topic <> '' GROUP BY topic ORDER BY attempts DESC LIMIT 10"),
    pool.query('SELECT DATE(verified_at) AS day, AVG(correct) AS accuracy FROM qbank_attempts WHERE verified_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY DATE(verified_at)'),

    // ── Study time ────────────────────────────────────────────────────────
    pool.query('SELECT DATE(recorded_at) AS day, COUNT(*) AS minutes FROM maristana_study_minutes WHERE recorded_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY DATE(recorded_at)'),
    pool.query('SELECT SUM(recorded_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) AS d7, SUM(recorded_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)) AS d30, COUNT(DISTINCT IF(recorded_at >= DATE_SUB(NOW(), INTERVAL 30 DAY), user_id, NULL)) AS users30d FROM maristana_study_minutes'),

    // ── AI assistant ──────────────────────────────────────────────────────
    pool.query('SELECT COALESCE(SUM(messages), 0) AS messages, COUNT(DISTINCT user_id) AS users, COALESCE(SUM(input_tokens + output_tokens), 0) AS tokens, COALESCE(SUM(fallbacks), 0) AS fallbacks FROM assistant_usage WHERE day >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)'),

    // ── Retention (last seen) ─────────────────────────────────────────────
    // `neverAnswered` reads the verified ledger directly, not the denormalised
    // `students.questions_answered` counter (which only refreshes on enrolment
    // changes and so reads stale). last_active is now stamped on every attempt.
    pool.query('SELECT SUM(last_active >= DATE_SUB(NOW(), INTERVAL 1 DAY)) AS today, SUM(last_active >= DATE_SUB(NOW(), INTERVAL 7 DAY)) AS d7, SUM(last_active >= DATE_SUB(NOW(), INTERVAL 30 DAY)) AS d30, SUM(last_active < DATE_SUB(NOW(), INTERVAL 30 DAY) OR last_active IS NULL) AS dormant, SUM(NOT EXISTS (SELECT 1 FROM qbank_attempts a WHERE a.student_id = s.id)) AS neverAnswered FROM students s'),

    // ── Monetization ──────────────────────────────────────────────────────
    pool.query("SELECT SUM(status = 'active') AS active, SUM(status = 'trialing') AS trialing FROM subscriptions WHERE (expires_at IS NULL OR expires_at > NOW()) AND status IN ('active','trialing')"),
    pool.query("SELECT source AS label, COUNT(*) AS count FROM subscriptions WHERE status IN ('active','trialing') AND (expires_at IS NULL OR expires_at > NOW()) GROUP BY source ORDER BY count DESC"),
    pool.query("SELECT plan AS label, COUNT(*) AS count FROM subscriptions WHERE status IN ('active','trialing') AND (expires_at IS NULL OR expires_at > NOW()) GROUP BY plan ORDER BY count DESC LIMIT 8"),
    pool.query('SELECT COUNT(*) AS redemptions30d FROM voucher_redemptions WHERE redeemed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) AND released_at IS NULL'),

    // ── Platform / devices ────────────────────────────────────────────────
    pool.query('SELECT platform AS label, COUNT(*) AS count FROM device_tokens GROUP BY platform ORDER BY count DESC'),
    pool.query('SELECT app_version AS label, COUNT(*) AS count FROM device_tokens GROUP BY app_version ORDER BY count DESC LIMIT 8'),
    pool.query('SELECT locale AS label, COUNT(*) AS count FROM device_tokens GROUP BY locale ORDER BY count DESC LIMIT 8'),
  ])

  const s = studentTotals[0] ?? {}
  const aw = attemptWindows[0] ?? {}
  const anw = answererWindows[0] ?? {}
  const ov = overall[0] ?? {}
  const sw = studyWindows[0] ?? {}
  const ai = assistant30[0] ?? {}
  const ret = retention[0] ?? {}
  const subs = subsActive[0] ?? {}
  const answerChanges = await answerChangesPromise

  return {
    generatedAt: new Date().toISOString(),
    audience: {
      totalStudents: num(s.total),
      activeStudents: num(s.active),
      signups30d: num(s.signups30d),
      signups90d: num(s.signups90d),
      signupTrend: fillDays(signupTrendRows, ['count']),
      byUniversity: list(byUniversity),
      byYear: list(byYear),
      byPlan: list(byPlan),
      byStatus: list(byStatus),
    },
    engagement: {
      attempts: { d1: num(aw.d1), d7: num(aw.d7), d30: num(aw.d30), total: num(aw.total) },
      activeAnswerers: { d1: num(anw.d1), d7: num(anw.d7), d30: num(anw.d30) },
      sessions30d: num(sessions30[0]?.sessions30d),
      attemptTrend: fillDays(attemptTrendRows, ['attempts', 'users']),
      studyMinutes: { d7: num(sw.d7), d30: num(sw.d30), users30d: num(sw.users30d) },
      studyTrend: fillDays(studyTrendRows, ['minutes']),
      assistant30d: { messages: num(ai.messages), users: num(ai.users), tokens: num(ai.tokens), fallbacks: num(ai.fallbacks) },
    },
    performance: {
      totalAttempts: num(ov.attempts),
      accuracy: ov.accuracy == null ? null : Number(ov.accuracy),
      avgSeconds: ov.avgSeconds == null ? null : Number(ov.avgSeconds),
      overtimeAttempts: num(ov.overtime),
      accuracyTrend: fillDays(accuracyTrendRows, ['accuracy']),
      bySubject: topics(bySubject),
      hardestTopics: topics(hardestTopics),
      topTopics: topics(topTopics),
    },
    retention: {
      activeToday: num(ret.today),
      active7d: num(ret.d7),
      active30d: num(ret.d30),
      dormant: num(ret.dormant),
      neverAnswered: num(ret.neverAnswered),
    },
    answerChanges: {
      correctToCorrect: num(answerChanges.correctToCorrect),
      correctToIncorrect: num(answerChanges.correctToIncorrect),
      incorrectToCorrect: num(answerChanges.incorrectToCorrect),
      incorrectToIncorrect: num(answerChanges.incorrectToIncorrect),
      totalTransitions: num(answerChanges.totalTransitions),
      studentsWithChanges: num(answerChanges.studentsWithChanges),
      questionsWithChanges: num(answerChanges.questionsWithChanges),
    },
    monetization: {
      activeSubscriptions: num(subs.active),
      trialing: num(subs.trialing),
      bySource: list(subsBySource),
      byPlan: list(subsByPlan),
      redemptions30d: num(redemptions[0]?.redemptions30d),
    },
    platform: {
      byPlatform: list(devicesByPlatform),
      byAppVersion: list(devicesByVersion),
      byLocale: list(devicesByLocale),
    },
  }
}
