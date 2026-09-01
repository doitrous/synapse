# Question of the Day — Reminders Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Send one daily "your Question of the Day is waiting" reminder per un-answered student at 12:00 Africa/Cairo, delivered prefer-push-else-email across iOS/Android/Web push + email, triggered by an in-process scheduler made exactly-once by a DB claim.

**Architecture:** A minute-tick scheduler in the Express server fires the dispatch once/day (idempotent via `qotd_reminder_runs`). Dispatch anti-joins `students`/`qotd_answers` for today's un-answered students, skips cohorts with no question, resolves each to push (if any registered device) or email, and sends. Push fans out through `sendPushToUser` to per-platform senders each gated by their own config (iOS/Android dormant until credentials; Web live once VAPID is set). Email reuses Resend via an extracted `sendMail` helper with suppression + one-click unsubscribe.

**Tech Stack:** Express + mysql2/MariaDB, Node built-ins (`crypto`, `http2`, `Intl`), `web-push` (new dep, server), Resend (existing). Client: a service worker + web app manifest. Native: Swift (iOS), Kotlin/Gradle (Android, prepared-not-built).

**Spec:** `docs/superpowers/specs/2026-08-29-question-of-the-day-reminders-design.md` (read alongside this plan). The core QotD feature it extends: `docs/superpowers/specs/2026-08-29-question-of-the-day-design.md`.

## Global Constraints

- **One reminder per student per day**, at **12:00 Africa/Cairo**, only to students who **have not answered today** and whose cohort **has a question today**.
- **Delivery policy:** a student with **≥1 row in `device_tokens`** (any platform) gets **push only**; a student with **no** device token gets **email** (if an address exists). Never both.
- **Exactly-once/day:** the dispatch must claim the day via `INSERT IGNORE INTO qotd_reminder_runs (run_date)` and no-op if already claimed. Safe across restarts and multiple instances.
- **Env-gated sending:** the scheduler runs only when `QOTD_REMINDERS_ENABLED` is truthy (unset/`0` in tests and dev). Each push platform sender is a **no-op when its own config is absent** (APNs keys / FCM creds / VAPID keys). Email requires `RESEND_API_KEY` (already set in prod).
- **Never throw out of the dispatch loop** — one failed send is logged + counted, never fatal.
- **Do not break the Android build.** Firebase's google-services Gradle plugin fails without `google-services.json`; the Android FCM code ships **prepared but NOT applied to the Gradle build**.
- **Reuse, don't fork:** email goes through the extracted `sendMail` (shared with `/api/mail/send`); push cohort/question logic reuses `server/src/qotd.js`; APNs auth reuses `server/src/push.js` (`readConfig`/`providerToken`).
- **Timezone Africa/Cairo** for every time computation.
- **No changes** to QotD selection/answer/streak/leaderboard/friends/admin-pin behaviour.
- Tests are pure-logic `*.test.js` run by `node --test`. Commit after each green step. Messages prefixed `feat(qotd-reminders):` / `test(...)` / `chore(...)`, ending with:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`

## File map

**Lane R0 — Dispatch core, scheduler, shared infra (foundation, lands first)**
- Modify `server/schema.sql` — add `qotd_reminder_runs`; widen `device_tokens` (platform enum + web columns) via the base CREATE.
- Modify `server/src/db.js` — lookup-guarded ALTERs for existing DBs (platform enum widen + web columns).
- Modify `server/src/qotd.js` — export `todaysQuestionId` (currently private) for reuse.
- Create `server/src/qotdReminders.js` — send-window predicate, channel resolution, cohort grouping, the dispatch, the scheduler, `sendPushToUser` fan-out shell.
- Create `server/src/qotdReminders.test.js` — pure-helper tests.
- Modify `server/src/index.js` — extract `sendMail(...)`; widen `POST /api/devices`; start the scheduler after `app.listen`.
- Modify `server/src/push.js` — add exported `sendPushToUser(userId, notification)` shell? No — keep fan-out in `qotdReminders.js`; `push.js` only gains the iOS alert sender (R3).

**Lane R1 — Email channel**
- Modify `server/src/qotdReminders.js` — `sendReminderEmail(student, notification)` + the "Question of the Day" category.

**Lane R2 — Web push**
- Add dep `web-push` (`server/package.json`).
- Create `server/src/webPush.js` — VAPID config + `sendWebPush(subscription, notification)`.
- Create `public/sw.js` — service worker (`push`, `notificationclick`).
- Create `public/manifest.webmanifest` + link it in `index.html` (+ `en/`, `ar/` entries).
- Create `src/lib/useWebPush.ts` — subscribe/unsubscribe client flow.
- Add a subscribe control to `src/pages/student/QuestionOfTheDay.tsx`.
- Modify `POST /api/devices` (R0) to accept the web subscription branch.

**Lane R3 — iOS alert (dormant)**
- Modify `server/src/push.js` — `sendApnsAlert(device, notification)`.
- Modify `ios/Synapse/Core/Push/PushRegistrar.swift` (+ wherever the app launches) — permission request + alert handling.

**Lane R4 — Android alert (dormant, out of Gradle build)**
- Create `server/src/fcm.js` — `sendFcmAlert(device, notification)` (FCM HTTP v1 via service-account JWT).
- Create Android FCM sources under `android/app/src/main/java/.../push/` — prepared, NOT applied to Gradle.
- Create `docs/qotd-android-push-enablement.md` — the exact steps to activate.

---

# LANE R0 — Dispatch core, scheduler & shared infra (foundation)

### Task R0.1: Schema — reminder-runs table + widen device_tokens

**Files:**
- Modify: `server/schema.sql`
- Modify: `server/src/db.js`

- [ ] **Step 1: Add the runs table to `server/schema.sql`** (near the QotD table, after `qotd_answers`):

```sql
CREATE TABLE IF NOT EXISTS qotd_reminder_runs (
  run_date      DATE PRIMARY KEY,
  dispatched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  push_sent     INT NOT NULL DEFAULT 0,
  email_sent    INT NOT NULL DEFAULT 0,
  skipped       INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

- [ ] **Step 2: Widen the `device_tokens` CREATE in `server/schema.sql`** — change `platform ENUM('ios') ... DEFAULT 'ios'` to `platform ENUM('ios','android','web') NOT NULL DEFAULT 'ios'`, and add the web columns:

```sql
  web_endpoint TEXT NULL,
  web_p256dh   VARCHAR(255) NULL,
  web_auth     VARCHAR(255) NULL,
```

- [ ] **Step 3: Add lookup-guarded ALTERs to `server/src/db.js`** (existing DBs), following the file's established `information_schema` pattern:

```js
// QotD reminders: device_tokens gains web-push subscription columns and a
// wider platform enum. Guarded by lookups so a DB that already has them boots.
const [platformCol] = await conn.query(
  `SELECT COLUMN_TYPE AS type FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'device_tokens' AND column_name = 'platform'`,
)
if (platformCol.length && !platformCol[0].type.includes("'web'")) {
  await conn.query(
    "ALTER TABLE device_tokens MODIFY COLUMN platform ENUM('ios','android','web') NOT NULL DEFAULT 'ios'",
  )
}
for (const [column, definition] of [
  ['web_endpoint', 'TEXT NULL'],
  ['web_p256dh', 'VARCHAR(255) NULL'],
  ['web_auth', 'VARCHAR(255) NULL'],
]) {
  const [found] = await conn.query(
    `SELECT 1 FROM information_schema.columns
      WHERE table_schema = DATABASE() AND table_name = 'device_tokens' AND column_name = ?`,
    [column],
  )
  if (!found.length) await conn.query(`ALTER TABLE device_tokens ADD COLUMN ${column} ${definition}`)
}
```

- [ ] **Step 4: Verify** — `node --check server/src/db.js`. Commit.

```bash
git add server/schema.sql server/src/db.js
git commit -m "feat(qotd-reminders): reminder-runs table and multi-platform device_tokens"
```

### Task R0.2: Export `todaysQuestionId` from `qotd.js`

**Files:** Modify `server/src/qotd.js`

- [ ] **Step 1:** Change `async function todaysQuestionId(...)` to `export async function todaysQuestionId(...)`. (No behaviour change; the reminder dispatch reuses it to find a cohort's question and to skip empty-pool cohorts.)
- [ ] **Step 2:** `node --test server/src/qotd.test.js` still green. Commit.

```bash
git add server/src/qotd.js
git commit -m "chore(qotd): export todaysQuestionId for reminder reuse"
```

### Task R0.3: Pure helpers — send window, channel resolution, cohort grouping

**Files:**
- Create: `server/src/qotdReminders.js`
- Test: `server/src/qotdReminders.test.js`

**Interfaces produced:**
- `isSendWindow(now, { hour = 12, windowMinutes = 5 } = {}): boolean` — true when the Africa/Cairo wall-clock time of `now` is in `[hour:00, hour:windowMinutes)`.
- `resolveChannel({ hasPushDevice, hasEmail }): 'push' | 'email' | 'none'`
- `groupByCohort(students): Map<string, { cohort, students }>` keyed by `` `${universityId}|${year}|${yearId}` ``.

- [ ] **Step 1: Write the failing test**

```js
// server/src/qotdReminders.test.js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isSendWindow, resolveChannel, groupByCohort } from './qotdReminders.js'

test('isSendWindow is true only inside the Cairo noon window', () => {
  // 10:00 UTC = 12:00 or 13:00 Cairo depending on DST; test both edges via known instants.
  // 2026-08-29 10:00Z → Cairo 12:00 (Egypt observes DST in 2026 → UTC+3 in summer? use computed check)
  const noonCairo = new Date('2026-08-29T10:00:00Z') // adjust if Egypt DST differs; assert via formatter below
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(noonCairo)
  const hh = Number(parts.find((p) => p.type === 'hour').value)
  // Only assert the window logic relative to the actual Cairo hour of this instant:
  assert.equal(isSendWindow(noonCairo, { hour: hh, windowMinutes: 5 }), true)
  assert.equal(isSendWindow(noonCairo, { hour: (hh + 1) % 24, windowMinutes: 5 }), false)
})

test('isSendWindow respects the window width', () => {
  const t = new Date('2026-08-29T09:07:00Z')
  const hh = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', hour12: false }).format(t))
  const mm = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', minute: '2-digit' }).format(t))
  assert.equal(isSendWindow(t, { hour: hh, windowMinutes: mm + 1 }), true)
  assert.equal(isSendWindow(t, { hour: hh, windowMinutes: mm }), false) // minute == width → outside [0,width)
})

test('resolveChannel prefers push, falls back to email, else none', () => {
  assert.equal(resolveChannel({ hasPushDevice: true, hasEmail: true }), 'push')
  assert.equal(resolveChannel({ hasPushDevice: true, hasEmail: false }), 'push')
  assert.equal(resolveChannel({ hasPushDevice: false, hasEmail: true }), 'email')
  assert.equal(resolveChannel({ hasPushDevice: false, hasEmail: false }), 'none')
})

test('groupByCohort buckets students by university+year+yearId', () => {
  const students = [
    { userId: 'a', universityId: 'kau', year: 'Year 2', yearId: 'KAU_Y2' },
    { userId: 'b', universityId: 'kau', year: 'Year 2', yearId: 'KAU_Y2' },
    { userId: 'c', universityId: 'asu', year: 'Year 1', yearId: 'ASU_Y1' },
  ]
  const groups = groupByCohort(students)
  assert.equal(groups.size, 2)
  assert.equal(groups.get('kau|Year 2|KAU_Y2').students.length, 2)
  assert.deepEqual(groups.get('asu|Year 1|ASU_Y1').cohort, { universityId: 'asu', year: 'Year 1', yearId: 'ASU_Y1' })
})
```

- [ ] **Step 2: Run it — fails** (`node --test server/src/qotdReminders.test.js`).

- [ ] **Step 3: Implement the pure helpers in `server/src/qotdReminders.js`** (dispatch/scheduler added in R0.4):

```js
// server/src/qotdReminders.js
import { pool } from './db.js'
import { cairoDate, todaysQuestionId } from './qotd.js'

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
```

- [ ] **Step 4: Run it — passes.** Commit.

```bash
git add server/src/qotdReminders.js server/src/qotdReminders.test.js
git commit -m "feat(qotd-reminders): send-window, channel-resolution, cohort-grouping helpers"
```

### Task R0.4: Dispatch + scheduler + push fan-out shell

**Files:** Modify `server/src/qotdReminders.js`

**Interfaces produced:**
- `async dispatchQotdReminders(now = new Date()): Promise<{ date, claimed, push, email, skipped } | { skipped }>`
- `async sendPushToUser(userId, notification): Promise<{ sent, of }>` — fan-out; per-platform senders wired in R2/R3/R4 (shell no-ops here).
- `startQotdReminderScheduler(): void` — the minute tick; no-op unless `QOTD_REMINDERS_ENABLED`.

- [ ] **Step 1: Append to `server/src/qotdReminders.js`:**

```js
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

// R2/R3/R4 replace these with the real senders; the shell keeps R0 self-contained.
async function sendApnsAlertMaybe() { return false }
async function sendFcmAlertMaybe() { return false }
async function sendWebPushMaybe() { return false }

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

// R1 replaces this with the real email sender.
async function sendReminderEmail() { return false }

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
```

Note: `sendReminderEmail`, `sendApnsAlertMaybe`, `sendFcmAlertMaybe`, `sendWebPushMaybe` are shells here so R0 stands alone and its pure helpers test in isolation; R1–R4 swap in the real implementations (each keeping the "no-op when unconfigured" contract). Keep them in this file so the fan-out has one home.

- [ ] **Step 2: `node --check server/src/qotdReminders.js`** and re-run the R0.3 tests (still green — pure helpers unchanged). Commit.

```bash
git add server/src/qotdReminders.js
git commit -m "feat(qotd-reminders): daily dispatch, idempotent claim, and minute-tick scheduler"
```

### Task R0.5: Extract `sendMail`, widen `POST /api/devices`, start the scheduler

**Files:** Modify `server/src/index.js`

- [ ] **Step 1: Extract a reusable `sendMail` helper.** Refactor the body of the `POST /api/mail/send` handler (index.js:3330) into a module-level `async function sendMail({ from, to, cc, bcc, subject, html, text, category, headers = {}, attachments = [] })` that returns `{ id, status, resendId, suppressed }`, applying the same suppression + one-click-unsubscribe + Resend send + `emails`/`attachments` logging. The route becomes a thin wrapper calling `sendMail(req.body)`. This is a pure refactor — no behaviour change; keep the existing tests/behaviour identical.

- [ ] **Step 2: Widen `POST /api/devices`** (index.js:1181) to accept `platform` and a web subscription. Replace the handler body with:

```js
app.post('/api/devices', requireAuthenticated, wrap(async (req, res) => {
  const platform = ['ios', 'android', 'web'].includes(req.body?.platform) ? req.body.platform : 'ios'
  const locale = typeof req.body?.locale === 'string' ? req.body.locale.slice(0, 16) : null
  const appVersion = typeof req.body?.appVersion === 'string' ? req.body.appVersion.slice(0, 32) : null

  if (platform === 'web') {
    // A web subscription's identity is its endpoint (used as the PK token).
    const sub = req.body?.subscription
    const endpoint = typeof sub?.endpoint === 'string' ? sub.endpoint : null
    const p256dh = typeof sub?.keys?.p256dh === 'string' ? sub.keys.p256dh : null
    const auth = typeof sub?.keys?.auth === 'string' ? sub.keys.auth : null
    if (!endpoint || !p256dh || !auth) return res.status(400).json({ error: 'invalid web subscription' })
    await pool.query(
      `INSERT INTO device_tokens (token, user_id, platform, environment, locale, app_version, web_endpoint, web_p256dh, web_auth)
       VALUES (?, ?, 'web', 'production', ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), locale = VALUES(locale),
         app_version = VALUES(app_version), web_endpoint = VALUES(web_endpoint),
         web_p256dh = VALUES(web_p256dh), web_auth = VALUES(web_auth), last_seen_at = CURRENT_TIMESTAMP`,
      [endpoint, req.identity.id, locale, appVersion, endpoint, p256dh, auth],
    )
    return res.json({ ok: true })
  }

  const token = normaliseDeviceToken(req.body?.token)
  if (!token) return res.status(400).json({ error: 'invalid device token' })
  const environment = req.body?.environment === 'sandbox' ? 'sandbox' : 'production'
  await pool.query(
    `INSERT INTO device_tokens (token, user_id, platform, environment, locale, app_version)
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), platform = VALUES(platform),
       environment = VALUES(environment), locale = VALUES(locale),
       app_version = VALUES(app_version), last_seen_at = CURRENT_TIMESTAMP`,
    [token, req.identity.id, platform, environment, locale, appVersion],
  )
  res.json({ ok: true })
}))
```

- [ ] **Step 3: Start the scheduler after `app.listen`.** Add the import near the other feature imports:

```js
import { startQotdReminderScheduler } from './qotdReminders.js'
```

and inside the `migrate().then(...)` block, right after `app.listen(port, () => { ... })` (index.js:3554), call it:

```js
    startQotdReminderScheduler()
```

- [ ] **Step 4: Verify** — `node --check server/src/index.js`; boot locally without `QOTD_REMINDERS_ENABLED` and confirm the "disabled" log line and that `/api/mail/send` still behaves. Commit.

```bash
git add server/src/index.js
git commit -m "feat(qotd-reminders): sendMail helper, multi-platform device registration, scheduler boot"
```

---

# LANE R1 — Email channel

### Task R1.1: `sendReminderEmail` + category

**Files:** Modify `server/src/qotdReminders.js`; the category constant lives with the send.

**Interfaces consumed:** `sendMail` from `index.js` — to avoid a circular import (`index.js` imports `qotdReminders.js`), pass `sendMail` INTO the dispatcher rather than importing it. Refactor: `startQotdReminderScheduler` and `dispatchQotdReminders` accept an injected `deps = { sendMail }`, defaulting to a lazy import. Simplest concrete approach: export a setter `setMailer(fn)` from `qotdReminders.js` that `index.js` calls once at boot with its `sendMail`. Implement that.

- [ ] **Step 1:** In `qotdReminders.js`, add:

```js
let mailer = null
/** index.js injects its sendMail here at boot to avoid a circular import. */
export function setMailer(fn) { mailer = fn }

const REMINDER_EMAIL_CATEGORY = 'Question of the Day'

function reminderEmailHtml(name) {
  const hi = name ? `Hi ${name},` : 'Hi,'
  return `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5">
    <p>${hi}</p>
    <p>Your <strong>Question of the Day</strong> is waiting. Answer it to keep your streak going.</p>
    <p><a href="${process.env.PUBLIC_ORIGIN || ''}/app/qotd">Answer today's question →</a></p>
  </div>`
}
```

- [ ] **Step 2:** Replace the R0 `sendReminderEmail` shell with the real one:

```js
async function sendReminderEmail(student, notification) {
  if (!mailer || !student.email) return false
  const result = await mailer({
    to: student.email,
    subject: notification.title,
    html: reminderEmailHtml(student.name),
    text: `${notification.body}\n${process.env.PUBLIC_ORIGIN || ''}${notification.path}`,
    category: REMINDER_EMAIL_CATEGORY,
  })
  return result?.status === 'Sent' || result?.status === 'Queued'
}
```

- [ ] **Step 3:** In `index.js`, after defining `sendMail` (R0.5) and importing from `qotdReminders.js`, call `setMailer(sendMail)` once at module load (near the scheduler import). Add `setMailer` to the import.

- [ ] **Step 4: Verify** — `node --check` both files; the R0 tests stay green. Boot with `QOTD_REMINDERS_ENABLED=1` pointed at a dev DB is optional; a real send is verified post-deploy with a test recipient. Commit.

```bash
git add server/src/qotdReminders.js server/src/index.js
git commit -m "feat(qotd-reminders): email reminder via shared sendMail (suppressible category)"
```

---

# LANE R2 — Web push (buildable + verifiable now)

### Task R2.1: `web-push` dep + VAPID + sender

**Files:** `server/package.json`, `server/src/webPush.js`

- [ ] **Step 1:** Add `web-push` to `server/package.json` dependencies (run `npm i web-push` in `server/`). Generate a VAPID keypair once (`npx web-push generate-vapid-keys`) and record the two values as env vars `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, subject `VAPID_SUBJECT` (a `mailto:`); DO NOT commit the private key — document it in `.env.example`.

- [ ] **Step 2:** Create `server/src/webPush.js`:

```js
import webpush from 'web-push'
import { pool } from './db.js'

function configured() {
  return Boolean(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY)
}
if (configured()) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:synapse@mail.doitrous.com',
    process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY,
  )
}

/** Send one web push; delete the subscription on 404/410 (gone). No-op unless configured. */
export async function sendWebPush(device, notification) {
  if (!configured() || !device.web_endpoint) return false
  const subscription = { endpoint: device.web_endpoint, keys: { p256dh: device.web_p256dh, auth: device.web_auth } }
  try {
    await webpush.sendNotification(subscription, JSON.stringify({
      title: notification.title, body: notification.body, path: notification.path,
    }))
    return true
  } catch (error) {
    if (error?.statusCode === 404 || error?.statusCode === 410) {
      await pool.query('DELETE FROM device_tokens WHERE token = ?', [device.web_endpoint]).catch(() => {})
    }
    return false
  }
}
```

- [ ] **Step 3:** Wire into `qotdReminders.js` — replace the `sendWebPushMaybe` shell:

```js
import { sendWebPush } from './webPush.js'
// ...
async function sendWebPushMaybe(device, notification) { return sendWebPush(device, notification) }
```

- [ ] **Step 4:** `node --check server/src/webPush.js`. Commit.

### Task R2.2: Service worker + manifest

**Files:** `public/sw.js`, `public/manifest.webmanifest`, `index.html` (+ `en/index.html`, `ar/index.html`)

- [ ] **Step 1:** Create `public/sw.js`:

```js
self.addEventListener('push', (event) => {
  let data = {}
  try { data = event.data ? event.data.json() : {} } catch { data = {} }
  const title = data.title || 'Question of the Day'
  event.waitUntil(self.registration.showNotification(title, {
    body: data.body || "Today's question is waiting.",
    data: { path: data.path || '/app/qotd' },
    icon: '/brand/icon-192.png',
  }))
})
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const path = event.notification.data?.path || '/app/qotd'
  event.waitUntil(clients.matchAll({ type: 'window' }).then((wins) => {
    const existing = wins.find((w) => 'focus' in w)
    if (existing) { existing.focus(); existing.navigate?.(path); return }
    return clients.openWindow(path)
  }))
})
```

- [ ] **Step 2:** Create `public/manifest.webmanifest` (name, short_name, start_url `/app`, display `standalone`, theme/background colors matching `index.html`'s theme-color, and `icons` pointing at existing `public/brand/` assets — check what exists there; use the closest 192/512 icons or add them). Link it in each HTML entry: `<link rel="manifest" href="/manifest.webmanifest">`.

- [ ] **Step 3:** Verify the manifest loads (browser preview → Application tab / no console error). Commit.

### Task R2.3: Client subscribe flow + control

**Files:** `src/lib/useWebPush.ts`, `src/pages/student/QuestionOfTheDay.tsx`

- [ ] **Step 1:** Create `src/lib/useWebPush.ts` — a hook exposing `{ supported, permission, subscribed, subscribe, unsubscribe }`:
  - `supported` = `'serviceWorker' in navigator && 'PushManager' in window`.
  - `subscribe()`: register `/sw.js`, `Notification.requestPermission()`, `registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC) })`, then `apiPost('/devices', { platform: 'web', subscription })`. `VAPID_PUBLIC` comes from `import.meta.env.VITE_VAPID_PUBLIC_KEY` (add to `.env.example`).
  - `unsubscribe()`: `subscription.unsubscribe()` + delete the server row by endpoint (see the DELETE note below).
  - Include the standard `urlBase64ToUint8Array` helper.

**Web unsubscribe — server route must accept an endpoint.** `DELETE /api/devices/:token` runs `normaliseDeviceToken`, which validates a hex APNs token and will REJECT a web subscription's endpoint URL. Add a web branch: either a dedicated `POST /api/devices/web/unsubscribe` (body `{ endpoint }`) or make the DELETE handler, when `req.query.platform === 'web'`, skip `normaliseDeviceToken` and `DELETE FROM device_tokens WHERE web_endpoint = ? AND user_id = ?`. Implement one of these in `index.js` alongside the R0.5 POST widening, and have `useWebPush.unsubscribe()` call it. Scope every delete to `req.identity.id`.

- [ ] **Step 2:** Add a small "Remind me" control to `QuestionOfTheDay.tsx` (only when `supported && API_MODE`): a button that calls `subscribe()`, reflecting `permission`/`subscribed`. Keep it unobtrusive (e.g. near the streak).

- [ ] **Step 3: Verify in the browser preview** — the control appears, clicking prompts for permission, and (with VAPID env set in the dev server) a subscription POST hits `/api/devices`. Note: actual push *delivery* depends on the browser's push service; verify at least that subscription + storage works (network shows the POST; `device_tokens` gets a web row). Screenshot for the user. Commit.

```bash
git add server/package.json server/src/webPush.js server/src/qotdReminders.js public/sw.js public/manifest.webmanifest index.html en/index.html ar/index.html src/lib/useWebPush.ts src/pages/student/QuestionOfTheDay.tsx .env.example
git commit -m "feat(qotd-reminders): web push — service worker, manifest, subscribe flow, sender"
```

---

# LANE R3 — iOS alert (dormant; needs APNs keys + App Store release)

### Task R3.1: Server APNs alert sender

**Files:** Modify `server/src/push.js`

- [ ] **Step 1:** Add an exported `sendApnsAlert(device, notification)` that reuses the module's `readConfig`/`providerToken` and a `post`-like call with **alert** headers. Since `post` is private and hardcodes background headers, generalise it: add a `pushType`/`priority`/`payload` parameter (default to the current background/5 for `sendSilentNudge`), then:

```js
export async function sendApnsAlert(device, notification) {
  const config = readConfig()
  if (!isConfigured(config) || !device?.token) return false
  const token = providerToken(config)
  const host = device.environment === 'sandbox' ? SANDBOX : PRODUCTION
  const payload = JSON.stringify({
    aps: { alert: { title: notification.title, body: notification.body }, sound: 'default' },
    path: notification.path,
  })
  const result = await post({ host, token, deviceToken: device.token, payload, config, pushType: 'alert', priority: '10' })
  if (result.status === 200) return true
  if (isTokenDead(result.status, result.reason)) {
    await pool.query('DELETE FROM device_tokens WHERE token = ?', [device.token]).catch(() => {})
  }
  return false
}
```

Update `post(...)` to accept `{ pushType = 'background', priority = '5' }` and set `'apns-push-type': pushType`, `'apns-priority': priority` (keeping `sendSilentNudge`'s call defaulting to background/5 — no behaviour change).

- [ ] **Step 2:** Wire into `qotdReminders.js` — replace `sendApnsAlertMaybe`:

```js
import { sendApnsAlert } from './push.js'
async function sendApnsAlertMaybe(device, notification) { return sendApnsAlert(device, notification) }
```

- [ ] **Step 3:** `node --check server/src/push.js`; existing `push.test.js` stays green (background path unchanged). Add a small unit test asserting the alert payload/headers shape via a seam if practical. Commit.

### Task R3.2: iOS app — permission + alert handling (cannot verify here)

**Files:** `ios/Synapse/Core/Push/PushRegistrar.swift` (+ the app entry that owns `UNUserNotificationCenter`)

- [ ] **Step 1:** Add a `UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge])` call at a sensible, user-legible moment (e.g. after sign-in or first QotD view — NOT cold launch), then `registerForRemoteNotifications()` as today.
- [ ] **Step 2:** Set a `UNUserNotificationCenterDelegate` so a foreground notification presents (`willPresent` → `[.banner, .sound]`) and a tap routes to `/app/qotd` (`didReceive` → deep-link into the web view).
- [ ] **Step 3:** Keep token registration unchanged (`POST /api/devices`, still `platform` defaulting to ios). Confirm the `aps-environment` entitlement is present.
- [ ] **Step 4:** **Verification is not possible in this environment** — requires APNs keys configured server-side and an App Store (or TestFlight) build on a device. Mark the task done at code-complete; note the manual verification owed. Commit.

```bash
git add server/src/push.js server/src/qotdReminders.js ios/
git commit -m "feat(qotd-reminders): iOS user-visible push — alert sender + app permission (dormant)"
```

---

# LANE R4 — Android alert (dormant; prepared but NOT wired into the Gradle build)

### Task R4.1: Server FCM sender

**Files:** Create `server/src/fcm.js`; wire into `qotdReminders.js`

- [ ] **Step 1:** Create `server/src/fcm.js` — `sendFcmAlert(device, notification)` using **FCM HTTP v1**. Read a service account from `FCM_SERVICE_ACCOUNT` (JSON or base64). Mint a short-lived OAuth2 access token by signing a JWT (`crypto`, ES256/RS256 per the service account) against `https://oauth2.googleapis.com/token` (scope `https://www.googleapis.com/auth/firebase.messaging`), cache it ~55 min, then `POST https://fcm.googleapis.com/v1/projects/<projectId>/messages:send` with `{ message: { token: device.token, notification: { title, body }, data: { path } } }`. **No-op (`return false`) when `FCM_SERVICE_ACCOUNT` is absent.** Delete the row on `UNREGISTERED`/404.
- [ ] **Step 2:** Wire into `qotdReminders.js` — replace `sendFcmAlertMaybe` with a call to `sendFcmAlert`.
- [ ] **Step 3:** `node --check server/src/fcm.js`. Unit-test the message-shape builder (pure) if factored out. Commit.

### Task R4.2: Android app FCM sources (prepared, not applied to Gradle)

**Files:** `android/app/src/main/java/.../push/` (new), `docs/qotd-android-push-enablement.md`

- [ ] **Step 1:** Add a `FirebaseMessagingService` subclass + a token-registration helper that POSTs to `/api/devices` with `platform: 'android'`, and a `POST_NOTIFICATIONS` runtime-permission request — as **source files that are NOT referenced by the manifest/Gradle** (or under a source set excluded from the build), so the project still compiles without `google-services.json` and the google-services plugin.
- [ ] **Step 2:** Write `docs/qotd-android-push-enablement.md`: create a Firebase project; add `google-services.json` to `android/app/`; apply the `com.google.gms.google-services` plugin + FCM dependency in Gradle; register the service in the manifest; set `FCM_SERVICE_ACCOUNT` on the server; ship a Play Store release.
- [ ] **Step 3:** **Verification not possible here** (no Firebase project, no build wiring). Confirm the Android project still builds unchanged (the new files are inert). Commit.

```bash
git add server/src/fcm.js server/src/qotdReminders.js android/ docs/qotd-android-push-enablement.md
git commit -m "feat(qotd-reminders): Android FCM sender + prepared app sources (dormant, off-build)"
```

---

# INTEGRATION

### Task INT1: Full checks
- [ ] `server/` `node --check` all new/changed files; `node --test server/src/qotdReminders.test.js server/src/qotd.test.js server/src/push.test.js` green.
- [ ] Client: `npx tsc -b --noEmit` clean; `npm test` (full suite) green; `npm run lint` clean.
- [ ] Boot the server locally WITHOUT `QOTD_REMINDERS_ENABLED` → "disabled" log; nothing sends.

### Task INT2: Web push preview verification
- [ ] With `VITE_VAPID_PUBLIC_KEY` + server VAPID env set on the dev server: open `/app/qotd`, click the reminder control, grant permission, confirm the `POST /api/devices` (web) lands and a `device_tokens` web row is created. Screenshot. (Real delivery depends on the browser push service; note what was and wasn't exercised.)

### Task INT3: Dispatch smoke (dev DB, optional)
- [ ] With a dev DB seeded: temporarily call `dispatchQotdReminders(new Date('...T12:00 Cairo'))` from a scratch script (not committed) to confirm the anti-join, cohort skip, channel resolution, and tally behave; confirm a second call returns `already_ran`. Remove the scratch script.

### Task INT4: Code review
- [ ] `superpowers:requesting-code-review` on the reminders range. Address findings. Special focus: exactly-once claim under concurrency, never-throw dispatch loop, per-platform gating (no accidental send when unconfigured), email suppression/unsubscribe correctness, web subscription auth, Android build stays green.

---

# External dependencies to go live (owner-supplied)

| Channel | Env / assets | Ship |
|---|---|---|
| Scheduler | `QOTD_REMINDERS_ENABLED=1` | server deploy |
| Email | (Resend already set) | server deploy |
| Web push | `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`, `VITE_VAPID_PUBLIC_KEY` | server + web deploy |
| iOS push | `APNS_KEY_P8`, `APNS_KEY_ID`, `APNS_TEAM_ID`, `APNS_BUNDLE_ID` + App Store release of the permission build | app release |
| Android push | Firebase project: `google-services.json` + `FCM_SERVICE_ACCOUNT`; apply plugin + Play release | app release |
