# Question of the Day — Reminders Design

**Date:** 2026-08-29
**Status:** Approved decisions, pending spec review
**Extends:** `docs/superpowers/specs/2026-08-29-question-of-the-day-design.md` (Phase 2/3)

## 1. Summary

Daily reminders that nudge a student to answer the Question of the Day when
they haven't yet. One reminder per student per day, at **12:00 Africa/Cairo**,
delivered by a **prefer-push-else-email** policy across four channels: **iOS
push, Android push, Web push, and email**. Triggered by an **in-process
scheduler** in the Express server, made safe with a **daily idempotency claim**
in the database.

The in-app nudge (dashboard/nav badge) already shipped with the core feature and
is unchanged.

## 2. Locked decisions

| Decision | Choice |
|---|---|
| Trigger | In-process cron (minute-tick) + DB idempotency row; no external scheduler |
| Channels | Email + iOS push + Android push + Web push |
| Send time | 12:00 **Africa/Cairo** |
| Delivery policy | **Prefer push** (student with ≥1 registered push device gets push only); **email fallback** for students with no push device |
| Per-student opt-out | Email: existing suppression + one-click unsubscribe (new non-transactional category "Question of the Day"). Push: OS permission. No new per-channel preference UI. |
| Credentials on hand | **None yet.** iOS + Android ship **dormant** (code present, gated by config that is absent) until the owner supplies keys and releases app updates. Email + Web + the dispatch core are built and verifiable now. |

## 3. What exists vs. what this builds (from the infra map)

- **Silent APNs pipeline EXISTS** (`server/src/push.js`, iOS `PushRegistrar.swift`, `device_tokens`, `POST /api/devices`) — token auth (ES256 JWT), `content-available` only, no alert. **User-visible alerts DO NOT exist.**
- **Email single-send EXISTS** (`POST /api/mail/send`, Resend) with suppression + one-click unsubscribe. **No cohort/loop send, no `sendToStudent` helper.**
- **No scheduler anywhere** (no cron, no GH Actions `schedule:`, no Coolify task). **Primary thing this builds.**
- **Android push: none.** **Web push: none; app is not a PWA.**
- **`device_tokens.platform` is `ENUM('ios')`** — must widen for multi-platform.
- **Cohort roster / "hasn't answered" query: not written** (schema + index support it).

## 4. Architecture

### 4.1 Scheduler (in-process, idempotent)

- On server boot, start a **minute interval** (`setInterval`, 60s). Each tick:
  1. Compute the current Africa/Cairo wall-clock time.
  2. If it is **≥ 12:00 and < 12:05 Cairo** (a small window so a missed exact
     minute still fires), attempt to **claim today**: `INSERT IGNORE INTO
     qotd_reminder_runs (run_date) VALUES (?)` with today's Cairo date. If
     `affectedRows === 0`, another tick/instance already claimed it → do nothing.
     If it inserted, run the dispatch.
- The claim row makes the job **exactly-once per day** across restarts and
  multiple instances. The 5-minute window plus minute cadence tolerates a server
  that was down at exactly 12:00 (it fires on the next tick within the window;
  if the whole window is missed, that day is skipped — acceptable for a nudge).
- Guarded by an env flag `QOTD_REMINDERS_ENABLED` (default on in production,
  off in tests) so `node --test` and dev servers never send.
- New table:

```sql
CREATE TABLE IF NOT EXISTS qotd_reminder_runs (
  run_date      DATE PRIMARY KEY,
  dispatched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  push_sent     INT NOT NULL DEFAULT 0,
  email_sent    INT NOT NULL DEFAULT 0,
  skipped       INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 4.2 Dispatch (`server/src/qotdReminders.js`)

`dispatchQotdReminders(date)`:
1. **Claim** the day (§4.1). If already claimed, return `{ skipped: 'already_ran' }`.
2. **Find un-answered students** — the anti-join, restricted to real cohorts and
   active accounts:
   ```sql
   SELECT s.user_id, s.email, s.name, s.university_id, s.year, s.year_id
     FROM students s
     LEFT JOIN qotd_answers a ON a.user_id = s.user_id AND a.qotd_date = ?
    WHERE a.user_id IS NULL
      AND s.user_id IS NOT NULL
      AND s.university_id IS NOT NULL AND s.year IS NOT NULL
      AND (s.status IS NULL OR s.status = 'active')
   ```
3. **Skip cohorts with no question today** — group the rows by `{universityId,
   year, yearId}`, compute `todaysQuestionId` once per cohort (reusing
   `server/src/qotd.js`), and drop students whose cohort has `null` (empty pool):
   a reminder must point at a real question.
4. **Resolve channel per student:** if the student has **≥1 row in
   `device_tokens`** (any platform), they are a **push** recipient; otherwise an
   **email** recipient (only if `email` is present).
5. **Send:**
   - Push recipients → `sendPushToUser(userId, notification)` (§4.4).
   - Email recipients → `sendReminderEmail(student, notification)` (§4.3).
6. **Tally** push_sent / email_sent / skipped into the `qotd_reminder_runs` row.
   Never throw out of the loop — a single failed send is logged and counted, not
   fatal.

Reminder content (shared): title "Question of the Day", body e.g. "Today's
question is waiting — keep your streak going.", deep link `/app/qotd`.

### 4.3 Email channel (buildable + live-capable now)

- Extract a reusable server helper `sendMail({ to, subject, html, text,
  category })` from the current `/api/mail/send` handler so both the route and
  the dispatcher share **one** suppression + one-click-unsubscribe path. (The
  route keeps its behaviour; the helper is what it now calls.)
- `sendReminderEmail(student, notification)` builds a minimal branded HTML +
  text body and calls `sendMail` with category **"Question of the Day"** (a new
  **non-transactional** category → suppressible and unsubscribable, correct for a
  marketing-style nudge). Respects `email_suppressions`; sets `List-Unsubscribe`.
- Resend is already configured (`RESEND_API_KEY`, `MAIL_FROM`), so this channel
  goes live on the next deploy once the scheduler is on.

### 4.4 Unified push (`sendPushToUser`)

One entry point fans out to every platform the user has registered, each sender
gated by its own config so an unconfigured platform is a silent no-op:

```
sendPushToUser(userId, { title, body, data }):
  devices = SELECT * FROM device_tokens WHERE user_id = ?
  for each device by platform:
    ios     → sendApnsAlert(device, notification)   // gated by APNS_* env
    android → sendFcmAlert(device, notification)     // gated by FCM creds
    web     → sendWebPush(subscription, notification) // gated by VAPID env
```

**`device_tokens` changes** (via the `db.js` lookup-guarded ALTER pattern):
- Widen `platform` to `ENUM('ios','android','web')`.
- Add nullable web-subscription columns (or a sibling table) for the Web Push
  keys, which don't fit the token-only shape:

```sql
ALTER TABLE device_tokens
  MODIFY COLUMN platform ENUM('ios','android','web') NOT NULL DEFAULT 'ios';
ALTER TABLE device_tokens ADD COLUMN web_endpoint TEXT NULL;      -- web only
ALTER TABLE device_tokens ADD COLUMN web_p256dh   VARCHAR(255) NULL;
ALTER TABLE device_tokens ADD COLUMN web_auth     VARCHAR(255) NULL;
```

`POST /api/devices` widens to accept `platform` and, for web, the subscription
`{ endpoint, keys: { p256dh, auth } }`; the token/PK for web is the endpoint.

#### iOS alert (dormant until APNs keys)
- Add `sendApnsAlert(device, { title, body, data })` in `push.js`: payload
  `{ aps: { alert: { title, body }, sound: 'default' }, ... }`, headers
  `apns-push-type: alert`, `apns-priority: 10`, same ES256 JWT auth and
  per-device environment as the silent path. Gated by the existing
  `isConfigured()`.
- **iOS app (Swift, `ios/`):** request notification permission via
  `UNUserNotificationCenter.requestAuthorization` (at a sensible moment, not
  cold-launch), set a delegate for foreground presentation, keep registering the
  token. This is a real app change that **requires an App Store release** to
  reach users, and **APNs keys** to deliver.

#### Android alert (dormant until Firebase; kept out of the build)
- **Server:** `sendFcmAlert(device, notification)` using **FCM HTTP v1** — mint
  an OAuth2 access token from a service-account JSON (`FCM_SERVICE_ACCOUNT` env)
  and POST the message. Gated; no-op when the env is absent. Prefer a
  dependency-free JWT→token exchange to avoid a heavy SDK.
- **Android app:** FCM SDK, `POST_NOTIFICATIONS` runtime permission (Android
  13+), token registration → `POST /api/devices` with `platform: 'android'`.
  **Hard dependency:** Firebase needs `google-services.json` at build time; the
  google-services Gradle plugin **fails the build** if applied without it.
  Therefore the Android FCM wiring is **prepared but not applied to the Gradle
  build** — it ships as documented code + the server sender, and enabling it is a
  documented step (add `google-services.json`, apply the plugin) plus a **Play
  Store release**. This keeps the Android build green today.

#### Web push (buildable + verifiable now)
- Add the **`web-push`** npm dependency (server). Generate a **VAPID** keypair;
  public key shipped to the client, private key in `VAPID_PRIVATE_KEY` env
  (gated — no key, no-op).
- **Service worker** (`public/sw.js`) handling `push` → `showNotification`, and
  `notificationclick` → focus/open `/app/qotd`. Register it from the client.
- **Web app manifest** (`public/manifest.webmanifest`) + `<link rel="manifest">`
  so the app is installable (required for web push on iOS Safari; optional but
  correct elsewhere).
- **Client subscribe flow:** a small opt-in control (e.g. on the QotD page /
  account) → `Notification.requestPermission()` →
  `registration.pushManager.subscribe({ applicationServerKey })` → POST the
  subscription to `POST /api/devices` (`platform: 'web'`).
- **Server:** `sendWebPush(subscription, notification)` via `web-push` with the
  VAPID keypair. Handles 404/410 by deleting the dead subscription (mirrors the
  APNs dead-token GC).

### 4.5 Preferences / opt-out

- **Email:** the new "Question of the Day" category is non-transactional, so the
  existing `email_suppressions` + one-click `List-Unsubscribe` fully cover
  opt-out. No new UI.
- **Push:** OS-level permission is the opt-out; a student who denies permission
  simply has no device token and (per the delivery policy) receives email
  instead — unless they also unsubscribe from email.
- No per-channel in-app preference toggles are built (the chosen policy is
  prefer-push-else-email, not student-selected channels).

## 5. Testing

Pure-logic `*.test.js`, matching the QotD feature:
- **Scheduler window/claim:** the Cairo-time "is it the send window" predicate;
  the idempotency claim returns run-once (given a mock/db-less unit for the time
  predicate).
- **Channel resolution:** prefer-push-else-email given a student's device set.
- **Cohort grouping / empty-pool skip:** students in a cohort with no question
  are dropped.
- **Web push subscription parse/store** shape; **FCM v1 message** shape; **APNs
  alert payload/headers** shape — pure builders, no network.
- DB-backed dispatch + real sends are verified manually where possible (email
  via a test recipient once deployed; web push in the browser preview) and are
  otherwise exercised only on a real backend, as with the core feature.

## 6. Build order — lanes (Sonnet subagents)

Lane R0 (shared) lands first; R1–R4 then parallelize.

- **R0 — Dispatch core & scheduler (foundation).** `qotd_reminder_runs` table,
  the minute-tick scheduler wired at server boot (env-gated), the anti-join
  roster query, per-cohort empty-pool skip, channel resolution, the tally, and
  the shared `sendMail` extraction. Pure parts unit-tested. `sendPushToUser`
  fan-out shell with no-op senders.
- **R1 — Email channel.** `sendReminderEmail` + the "Question of the Day"
  category + template. Live-capable. Verify logic + (post-deploy) a test send.
- **R2 — Web push.** `web-push` dep, VAPID, service worker, manifest, subscribe
  flow, `POST /api/devices` web branch, `sendWebPush`. Verify in the browser
  preview.
- **R3 — iOS alert (dormant).** `sendApnsAlert` + headers; Swift permission +
  alert handling. Ships gated; needs APNs keys + App Store release to go live.
- **R4 — Android alert (dormant, out of build).** `sendFcmAlert` (FCM v1 +
  service-account token) server-side; Android FCM code prepared but not applied
  to Gradle; documented enablement. Needs Firebase + Play release.
- **Integration:** widen `device_tokens` + `POST /api/devices`; full
  typecheck/tests/lint; browser-verify web push end-to-end; code review.

## 7. External dependencies to go live (owner-supplied)

| Channel | Blocked on |
|---|---|
| Email | Nothing (Resend already configured) — live on next deploy with the scheduler on |
| Web push | `VAPID_PUBLIC_KEY`/`VAPID_PRIVATE_KEY` env (generated during the build; owner sets them) |
| iOS push | `APNS_KEY_P8` / `APNS_KEY_ID` / `APNS_TEAM_ID` / `APNS_BUNDLE_ID` env **and** an App Store release of the permission-requesting build |
| Android push | A Firebase project: `google-services.json` (app) + service-account JSON (`FCM_SERVICE_ACCOUNT`, server) **and** a Play Store release |

## 8. Out of scope

- No changes to the QotD selection, answering, streak, leaderboard, friends, or
  admin-pin behaviour.
- No per-channel student preference UI.
- No retry/queue infrastructure for failed sends (best-effort within one daily
  run; a missed day is skipped, not retried).
