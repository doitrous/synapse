import { pool } from './db.js'
import { cairoDate, todaysQuestionId } from './qotd.js'
import { sendApnsAlert } from './push.js'
import { sendFcmAlert } from './fcm.js'
import { sendWebPush } from './webPush.js'
import { sendReminderEmail } from './qotdReminderEmail.js'

/** Cairo wall-clock parts of an instant. */
function cairoParts(now) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hour12: false,
  })
  const parts = fmt.formatToParts(now)
  return {
    hour: Number(parts.find((p) => p.type === 'hour').value),
    minute: Number(parts.find((p) => p.type === 'minute').value),
  }
}

/** True when the Cairo time of `now` is within [hour:00, hour:windowMinutes). */
export function isSendWindow(now, { hour = 12, windowMinutes = 5 } = {}) {
  const { hour: h, minute: m } = cairoParts(now)
  return h === hour && m < windowMinutes
}

/** Prefer push if the student has any registered device; else email; else nothing. */
export function resolveChannel({ hasPushDevice, hasEmail }) {
  if (hasPushDevice) return 'push'
  if (hasEmail) return 'email'
  return 'none'
}

/** Bucket students by their cohort tuple so a cohort's question is computed once. */
export function groupByCohort(students) {
  const groups = new Map()
  for (const s of students) {
    const key = `${s.universityId}|${s.year}|${s.yearId ?? ''}`
    if (!groups.has(key)) {
      groups.set(key, { cohort: { universityId: s.universityId, year: s.year, yearId: s.yearId ?? '' }, students: [] })
    }
    groups.get(key).students.push(s)
  }
  return groups
}

const REMINDER = {
  title: 'Question of the Day',
  body: "Today's question is waiting — keep your streak going.",
  path: '/app/qotd',
}

/** Students in real cohorts who have not answered today. */
async function unansweredStudents(date) {
  const [rows] = await pool.query(
    `SELECT s.user_id AS userId, s.email, s.name,
            s.university_id AS universityId, s.year, s.year_id AS yearId
       FROM students s
       LEFT JOIN qotd_answers a ON a.user_id = s.user_id AND a.qotd_date = ?
      WHERE a.user_id IS NULL
        AND s.user_id IS NOT NULL
        AND s.university_id IS NOT NULL AND s.year IS NOT NULL
        AND (s.status IS NULL OR s.status = 'active')`,
    [date],
  )
  return rows
}

/** user_id → number of registered push devices, for the whole recipient set. */
async function pushDeviceCounts(userIds) {
  if (!userIds.length) return new Map()
  const [rows] = await pool.query(
    'SELECT user_id AS userId, COUNT(*) AS n FROM device_tokens WHERE user_id IN (?) GROUP BY user_id',
    [userIds],
  )
  return new Map(rows.map((r) => [r.userId, Number(r.n)]))
}

/**
 * Per-platform fan-out. Each sender is gated by its own config (no-op when
 * unconfigured), so an un-provisioned platform simply sends nothing. Wired in
 * R2 (web), R3 (ios), R4 (android); here it is the shell.
 */
export async function sendPushToUser(userId, notification) {
  const [devices] = await pool.query('SELECT * FROM device_tokens WHERE user_id = ?', [userId])
  let sent = 0
  for (const device of devices) {
    try {
      if (device.platform === 'ios' && await sendApnsAlertMaybe(device, notification)) sent++
      else if (device.platform === 'android' && await sendFcmAlertMaybe(device, notification)) sent++
      else if (device.platform === 'web' && await sendWebPushMaybe(device, notification)) sent++
    } catch { /* one bad device never fails the run */ }
  }
  return { sent, of: devices.length }
}

// Per-platform senders. Each is a no-op returning false unless its own channel
// is configured (APNs keys / FCM service account / VAPID keys), so an
// un-provisioned platform simply sends nothing.
async function sendApnsAlertMaybe(device, notification) { return sendApnsAlert(device, notification) }
async function sendFcmAlertMaybe(device, notification) { return sendFcmAlert(device, notification) }
async function sendWebPushMaybe(device, notification) { return sendWebPush(device, notification) }

/**
 * The daily job. Claims the day (exactly-once), then sends one reminder to each
 * un-answered student in a cohort that has a question today, prefer-push-else-
 * email. Never throws; a single failed send is counted, not fatal.
 */
export async function dispatchQotdReminders(now = new Date()) {
  const date = cairoDate(now)
  const [claim] = await pool.query('INSERT IGNORE INTO qotd_reminder_runs (run_date) VALUES (?)', [date])
  if (claim.affectedRows === 0) return { skipped: 'already_ran', date }

  const students = await unansweredStudents(date)
  // Drop students whose cohort has no question today (nothing to remind about).
  const groups = groupByCohort(students)
  const cohortHasQuestion = new Map()
  for (const [key, { cohort }] of groups) {
    cohortHasQuestion.set(key, Boolean(await todaysQuestionId(cohort, date)))
  }
  const eligible = students.filter((s) => cohortHasQuestion.get(`${s.universityId}|${s.year}|${s.yearId ?? ''}`))

  const deviceCounts = await pushDeviceCounts(eligible.map((s) => s.userId))
  let push = 0, email = 0, skipped = 0
  for (const s of eligible) {
    const channel = resolveChannel({ hasPushDevice: (deviceCounts.get(s.userId) ?? 0) > 0, hasEmail: Boolean(s.email) })
    try {
      if (channel === 'push') { const r = await sendPushToUser(s.userId, REMINDER); r.sent > 0 ? push++ : skipped++ }
      else if (channel === 'email') { const ok = await sendReminderEmail(s, REMINDER); ok ? email++ : skipped++ }
      else skipped++
    } catch (error) { skipped++; console.error('qotd reminder failed for', s.userId, error?.message) }
  }

  await pool.query(
    'UPDATE qotd_reminder_runs SET push_sent = ?, email_sent = ?, skipped = ? WHERE run_date = ?',
    [push, email, skipped, date],
  )
  return { date, claimed: true, push, email, skipped }
}

let schedulerStarted = false

/** Minute tick that fires the dispatch once inside the Cairo noon window. */
export function startQotdReminderScheduler() {
  if (schedulerStarted) return
  if (!process.env.QOTD_REMINDERS_ENABLED) { console.log('QotD reminders disabled (QOTD_REMINDERS_ENABLED unset)'); return }
  schedulerStarted = true
  setInterval(() => {
    const now = new Date()
    if (!isSendWindow(now, { hour: 12, windowMinutes: 5 })) return
    dispatchQotdReminders(now)
      .then((r) => { if (r.claimed) console.log('QotD reminders dispatched', r) })
      .catch((error) => console.error('QotD reminder dispatch error', error?.message))
  }, 60_000).unref?.()
}
