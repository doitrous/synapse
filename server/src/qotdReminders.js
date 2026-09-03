import { pool } from './db.js'
import { cairoDate, todaysQuestionId } from './qotd.js'
import { sendApnsAlert, isConfigured as apnsConfigured } from './push.js'
import { sendFcmAlert } from './fcm.js'
import { sendWebPush } from './webPush.js'
import { sendReminderEmail } from './qotdReminderEmail.js'

/**
 * Which push platforms can actually deliver right now, by their own config.
 *
 * A student is only treated as a "push device" holder for platforms that can
 * deliver — otherwise a dormant platform (e.g. iOS tokens registered by the
 * silent-sync pipeline while APNs alert keys are absent) would win the
 * prefer-push-else-email choice and the student would silently get nothing,
 * even with a deliverable email address.
 */
function deliverablePlatforms() {
  const set = []
  if (apnsConfigured()) set.push('ios')
  if (process.env.FCM_SERVICE_ACCOUNT) set.push('android')
  if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) set.push('web')
  return set
}

/** Wall-clock parts of an instant, in any IANA zone (Cairo by default). */
function zonedParts(now, timeZone = 'Africa/Cairo') {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone, hour: '2-digit', minute: '2-digit', hour12: false,
  })
  const parts = fmt.formatToParts(now)
  return {
    hour: Number(parts.find((p) => p.type === 'hour').value),
    minute: Number(parts.find((p) => p.type === 'minute').value),
  }
}

/** True when `now`, read in `timeZone` (Cairo by default), falls in [hour:00, hour:windowMinutes). */
export function isSendWindow(now, { hour = 12, windowMinutes = 5, timeZone = 'Africa/Cairo' } = {}) {
  const { hour: h, minute: m } = zonedParts(now, timeZone)
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
    `SELECT s.user_id AS userId, s.email, s.name, s.timezone,
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

/**
 * Per-user, per-day dedup for the loop below.
 *
 * The cohort's *day* stays one Cairo date for everyone (see qotdCohort.ts) —
 * but the send *hour* now follows each student's own timezone, and a
 * student's local hour:00-hour:05 window spans several of the scheduler's
 * 60s ticks, so something has to stop that from becoming several sends.
 *
 * ponytail: per-process and in-memory, like every other counter in this
 * server (see rateLimit.js). Ceiling: a restart mid-window can cost a
 * duplicate reminder, and a second app instance is not coordinated with this
 * one at all. Move to a `qotd_reminder_sent(run_date, user_id)` table
 * (INSERT IGNORE as the claim, same shape as qotd_reminder_runs below) if a
 * duplicate reminder ever actually matters more than the extra table.
 */
let remindedDate = null
let remindedUsers = new Set()
function alreadyReminded(date, userId) {
  if (remindedDate !== date) { remindedDate = date; remindedUsers = new Set() }
  return remindedUsers.has(userId)
}
function markReminded(date, userId) {
  if (remindedDate !== date) { remindedDate = date; remindedUsers = new Set() }
  remindedUsers.add(userId)
}

/** user_id → number of registered devices on a DELIVERABLE platform. */
async function pushDeviceCounts(userIds, platforms) {
  if (!userIds.length || !platforms.length) return new Map()
  const [rows] = await pool.query(
    'SELECT user_id AS userId, COUNT(*) AS n FROM device_tokens WHERE user_id IN (?) AND platform IN (?) GROUP BY user_id',
    [userIds, platforms],
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
 * The daily job. Runs on every scheduler tick (see below) and, each time,
 * sends one reminder to each not-yet-reminded, un-answered student whose
 * *own* local clock is currently inside the send window — Cairo for a
 * student with no timezone on record, their own zone otherwise. The cohort's
 * day is still one shared Cairo date (see qotdCohort.ts); only the hour a
 * student is nudged at now follows them. Never throws; a single failed send
 * is counted, not fatal.
 */
export async function dispatchQotdReminders(now = new Date()) {
  const date = cairoDate(now)
  try {
    const students = await unansweredStudents(date)
    // Drop students whose cohort has no question today (nothing to remind about).
    // A cohort whose question cannot be resolved (bad app_state, DB blip) is
    // skipped rather than aborting the whole run.
    const groups = groupByCohort(students)
    const cohortHasQuestion = new Map()
    for (const [key, { cohort }] of groups) {
      try {
        cohortHasQuestion.set(key, Boolean(await todaysQuestionId(cohort, date)))
      } catch (error) {
        cohortHasQuestion.set(key, false)
        console.error('qotd reminder: could not resolve question for cohort', key, error?.message)
      }
    }
    const eligible = students.filter((s) =>
      cohortHasQuestion.get(`${s.universityId}|${s.year}|${s.yearId ?? ''}`)
      && !alreadyReminded(date, s.userId)
      && isSendWindow(now, { hour: 12, windowMinutes: 5, timeZone: s.timezone || 'Africa/Cairo' }))

    const deviceCounts = await pushDeviceCounts(eligible.map((s) => s.userId), deliverablePlatforms())
    let push = 0, email = 0, skipped = 0
    for (const s of eligible) {
      const channel = resolveChannel({ hasPushDevice: (deviceCounts.get(s.userId) ?? 0) > 0, hasEmail: Boolean(s.email) })
      try {
        if (channel === 'push') { const r = await sendPushToUser(s.userId, REMINDER); r.sent > 0 ? push++ : skipped++ }
        else if (channel === 'email') { const ok = await sendReminderEmail(s, REMINDER); ok ? email++ : skipped++ }
        else skipped++
      } catch (error) { skipped++; console.error('qotd reminder failed for', s.userId, error?.message) }
      // Marked whether it actually sent or not — a student with no push
      // device and no email is not retried every tick for the rest of their window.
      markReminded(date, s.userId)
    }

    if (eligible.length) {
      await pool.query(
        `INSERT INTO qotd_reminder_runs (run_date, push_sent, email_sent, skipped)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE push_sent = push_sent + VALUES(push_sent),
                                  email_sent = email_sent + VALUES(email_sent),
                                  skipped = skipped + VALUES(skipped)`,
        [date, push, email, skipped],
      )
    }
    return { date, push, email, skipped, checked: eligible.length }
  } catch (error) {
    console.error('qotd reminder dispatch failed for', date, error?.message)
    return { error: 'dispatch_failed', date }
  }
}

let schedulerStarted = false

/** Minute tick — dispatch itself decides who, if anyone, is in their window right now. */
export function startQotdReminderScheduler() {
  if (schedulerStarted) return
  if (!process.env.QOTD_REMINDERS_ENABLED) { console.log('QotD reminders disabled (QOTD_REMINDERS_ENABLED unset)'); return }
  schedulerStarted = true
  setInterval(() => {
    dispatchQotdReminders(new Date())
      .then((r) => { if (r.push || r.email || r.skipped) console.log('QotD reminders dispatched', r) })
      .catch((error) => console.error('QotD reminder dispatch error', error?.message))
  }, 60_000).unref?.()
}
