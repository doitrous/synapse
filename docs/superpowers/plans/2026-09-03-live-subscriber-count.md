# Live Subscriber Count Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Ship the secluded, superadmin-controlled "live subscriber count" marketing
figure described in Section 3 of the spec below: a synthetic-plus-real counter stored
in `app_state`, served by a public read endpoint and a superadmin write endpoint, shown
on the client via a `useSubscriberCount` hook and a `<LiveCount>` component, and tuned
from a panel on the existing superadmin Settings page. The feature must never write
`students` or `subscriptions` — it only ever reads a real count to add growth on top of
a synthetic baseline.

**Architecture:** All new math lives in one server-side module,
`server/src/subscriberCount.js`, split into pure functions (the growth model, the
write-validation logic) and thin DB-IO functions (read/write the `app_state` row),
mirroring the existing `server/src/pricing.js` shape (`quoteAllAccess` pure /
`pricingQuote` DB wrapper). Two Express routes in `server/src/index.js` — one
unauthenticated public read, one `requireSuperAdmin`-guarded write — are thin glue
around that module, matching the existing route style (e.g. `GET /api/pricing/quote`,
`POST /api/content-reports/:id/delete`). The client never computes the count itself:
`useSubscriberCount()` and `<LiveCount>` each fetch the public endpoint directly, so
there is exactly one implementation of the math, on the server, and the real-count read
never leaves it.

**Tech Stack:** TypeScript + Vite + React 19 on the client, Tailwind v4 tokens
(`src/index.css`); Express + raw `mysql2/promise` on the server; settings persisted as
versioned JSON in `app_state`/`app_state_versions` (MariaDB); superadmin authority is
the `SUPER_ADMIN_EMAILS` env allowlist via `requireSuperAdmin`
(`server/src/auth.js:279`); client tests run with `node --test --experimental-strip-types "src/**/*.test.ts"`
(`npm test` at the repo root); server tests run with `node --test src/*.test.js`
(`npm test` inside `server/`), both using bare `node:test` + `node:assert/strict` — no
Jest, no Vitest, no supertest.

**Spec:** docs/superpowers/specs/2026-09-03-landing-pricing-subscriber-count-design.md

## Global Constraints

- Never write to `students` or `subscriptions` — only ever `SELECT` from them, and only
  inside the one query this plan reuses (`activeSubscriptionCount()`).
- The new app_state key is `nishany-subscriber-display-v1`. Defaults:
  `{ enabled: false, base: 790, minPct: 0.3, maxPct: 2.5 }`.
- All displayed counts are whole numbers and monotonic non-decreasing in time (for a
  fixed real count).
- The generic `PUT /api/state/:key` route must never be used to write this key — writes
  go through the dedicated `POST /api/admin/subscriber-count`, guarded by
  `requireSuperAdmin` (not `requireConsole`), because a base change must re-capture the
  real count server-side in the same request.
- `useSubscriberCount(): { enabled: boolean; value: number | null }` and
  `LiveCount(props: { variant?: 'chip' | 'band'; className?: string }): JSX.Element | null`
  are exact, load-bearing signatures — a separate landing-rebuild plan consumes them
  as-is. Do not add or rename fields.
- Match existing repo conventions exactly: pure logic extracted into its own module and
  unit-tested there; DB-touching route handlers stay thin and untested by automated
  tests (this repo has no supertest/HTTP-integration convention — see
  `server/src/contentReports.test.js`, which tests `authoriseReportChange` etc., never
  the Express route itself).

---

### Task 1: Pure growth model (`server/src/subscriberCount.js`)

**Files:**
- Creates: `server/src/subscriberCount.js`
- Creates: `server/src/subscriberCount.test.js`

**Interfaces:**
- Produces (pure, no DB):
  - `export const SUBSCRIBER_DISPLAY_STATE_KEY = 'nishany-subscriber-display-v1'`
  - `export const DEFAULT_SUBSCRIBER_DISPLAY: { enabled: boolean; base: number; epoch: number; realCountAtEpoch: number; minPct: number; maxPct: number }`
  - `export function dailyMultiplierPercent(day: number, minPct: number, maxPct: number, daySeed?: number): number`
  - `export function syntheticValueAt(nowMs: number, doc: { base: number; epoch: number; minPct: number; maxPct: number; daySeed?: number }): number`
  - `export function computeSubscriberCount(doc, { realCountNow: number, now?: number }): { value: number; ratePerSecond: number }`
  - `export function publicSubscriberCountPayload(doc, { realCountNow: number, now?: number }): { enabled: false } | { enabled: true; value: number; ratePerSecond: number }`
- Consumes: nothing (no imports from `db.js` in this task — this file gains DB imports
  in Task 3).

- [ ] **Step 1: Write the failing test for the daily multiplier's range.**
  Create `server/src/subscriberCount.test.js`:
  ```js
  import test from 'node:test'
  import assert from 'node:assert/strict'
  import { dailyMultiplierPercent } from './subscriberCount.js'

  test('the daily multiplier always lands within [minPct, maxPct]', () => {
    for (let day = 0; day < 2000; day++) {
      const m = dailyMultiplierPercent(day, 0.3, 2.5)
      assert.ok(m >= 0.3 && m <= 2.5, `day ${day} multiplier ${m} out of range`)
    }
  })

  test('the daily multiplier is deterministic for the same day and seed', () => {
    assert.equal(dailyMultiplierPercent(19000, 0.3, 2.5, 7), dailyMultiplierPercent(19000, 0.3, 2.5, 7))
  })
  ```
  Run: `node --test server/src/subscriberCount.test.js`
  Expected FAIL: `Cannot find module '.../server/src/subscriberCount.js'` (module does not exist yet).

- [ ] **Step 2: Minimal implementation to pass the multiplier tests.**
  Create `server/src/subscriberCount.js`:
  ```js
  /**
   * The marketing subscriber count: a synthetic baseline that grows a little
   * every day, plus real signups added on top. Never reads or writes
   * `students`/`subscriptions` except through `activeSubscriptionCount()`
   * (server/src/platformReports.js), and never writes either table.
   */

  const DAY_MS = 86_400_000

  function dayIndex(ms) {
    return Math.floor(ms / DAY_MS)
  }

  /**
   * A deterministic multiplier in [minPct, maxPct] for one calendar day.
   *
   * Deterministic from (day, daySeed) alone — no Math.random — so re-computing
   * it later (a second request, a redeploy) always gives the same number for
   * the same day. A plain xorshift mix of the two integers, not a hash library:
   * the only property this needs is "looks unpredictable, is actually a pure
   * function of its inputs."
   */
  export function dailyMultiplierPercent(day, minPct, maxPct, daySeed = 0) {
    let x = (day * 2654435761 + daySeed * 2246822519) >>> 0
    x ^= x << 13; x >>>= 0
    x ^= x >>> 17
    x ^= x << 5; x >>>= 0
    const unit = x / 4294967296 // → [0, 1)
    return minPct + unit * (maxPct - minPct)
  }
  ```
  Run: `node --test server/src/subscriberCount.test.js`
  Expected PASS: `tests 2`, `pass 2`, `fail 0`.
  Commit: `git add server/src/subscriberCount.js server/src/subscriberCount.test.js && git commit -m "feat(subscriber-count): deterministic daily multiplier"`

- [ ] **Step 3: Write the failing tests for `syntheticValueAt` — whole numbers and no shrinking within a day.**
  Append to `server/src/subscriberCount.test.js`:
  ```js
  import { syntheticValueAt } from './subscriberCount.js'

  test('the synthetic value is always a whole number', () => {
    const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), minPct: 0.3, maxPct: 2.5 }
    for (let days = 0; days < 30; days++) {
      const at = doc.epoch + days * 86_400_000 + 12 * 3_600_000
      assert.ok(Number.isInteger(syntheticValueAt(at, doc)), `day ${days} not an integer`)
    }
  })

  test('the synthetic value never drops as time moves forward within a day', () => {
    const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), minPct: 0.3, maxPct: 2.5 }
    const dayStart = doc.epoch + 3 * 86_400_000
    let previous = syntheticValueAt(dayStart, doc)
    for (let hour = 1; hour <= 24; hour++) {
      const value = syntheticValueAt(dayStart + hour * 3_600_000, doc)
      assert.ok(value >= previous, `hour ${hour}: ${value} < ${previous}`)
      previous = value
    }
  })
  ```
  (Add the `syntheticValueAt` import to the existing `import { dailyMultiplierPercent } from './subscriberCount.js'` line instead of a second import statement.)
  Run: `node --test server/src/subscriberCount.test.js`
  Expected FAIL: `syntheticValueAt is not a function` (SyntaxError/TypeError from the test file).

- [ ] **Step 4: Implement `syntheticValueAt` — grow one full day at a time, then ease across today.**
  Append to `server/src/subscriberCount.js`:
  ```js
  /**
   * The synthetic total's {dayStart, dayEnd, fraction} bounds for `nowMs`.
   *
   * `dayStart` is the value at the most recent UTC midnight, computed by
   * compounding one full calendar day at a time from `epoch`. `dayEnd` is what
   * today grows it to. `fraction` is how far through today `nowMs` is, so the
   * caller eases linearly between the two — "increases across the day" rather
   * than jumping at midnight.
   *
   * ponytail: one loop iteration per calendar day since `epoch`. `epoch` resets
   * whenever a superadmin changes `base` (see `nextSubscriberDisplayDoc`), so in
   * practice this stays small; if it is ever left running for years without a
   * base change, replace the loop with closed-form compounding.
   */
  function syntheticDayBounds(nowMs, { base, epoch, minPct, maxPct, daySeed = 0 }) {
    const epochDay = dayIndex(epoch)
    const nowDay = dayIndex(nowMs)
    let value = base
    for (let day = epochDay; day < nowDay; day++) {
      const m = dailyMultiplierPercent(day, minPct, maxPct, daySeed)
      value += Math.round(value * (m / 100))
    }
    const mToday = dailyMultiplierPercent(nowDay, minPct, maxPct, daySeed)
    const dayStart = value
    const dayEnd = dayStart + Math.round(dayStart * (mToday / 100))
    const dayStartMs = nowDay * DAY_MS
    const fraction = Math.min(1, Math.max(0, (nowMs - dayStartMs) / DAY_MS))
    return { dayStart, dayEnd, fraction }
  }

  /** The synthetic component alone, at a point in time. Whole number. */
  export function syntheticValueAt(nowMs, doc) {
    const { dayStart, dayEnd, fraction } = syntheticDayBounds(nowMs, doc)
    return Math.round(dayStart + (dayEnd - dayStart) * fraction)
  }
  ```
  Run: `node --test server/src/subscriberCount.test.js`
  Expected PASS: `tests 4`, `pass 4`, `fail 0`.
  Commit: `git add server/src/subscriberCount.js server/src/subscriberCount.test.js && git commit -m "feat(subscriber-count): synthetic growth model, eased within the day"`

- [ ] **Step 5: Write the failing tests for the day-boundary continuity and multi-day growth.**
  Append to `server/src/subscriberCount.test.js`:
  ```js
  test('the synthetic value does not jump at a day boundary', () => {
    const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), minPct: 0.3, maxPct: 2.5 }
    const boundary = doc.epoch + 5 * 86_400_000
    const justBefore = syntheticValueAt(boundary - 1000, doc)
    const justAfter = syntheticValueAt(boundary + 1000, doc)
    assert.ok(justAfter >= justBefore, `${justAfter} < ${justBefore}`)
    assert.ok(justAfter - justBefore <= 1, `jumped by ${justAfter - justBefore}`)
  })

  test('the synthetic value keeps growing, never shrinking, across many days', () => {
    const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), minPct: 0.3, maxPct: 2.5 }
    let previous = doc.base
    for (let days = 1; days <= 60; days++) {
      const value = syntheticValueAt(doc.epoch + days * 86_400_000, doc)
      assert.ok(value >= previous, `day ${days}: ${value} < ${previous}`)
      previous = value
    }
  })
  ```
  Run: `node --test server/src/subscriberCount.test.js`
  Expected PASS already (Step 4's implementation satisfies these by construction) —
  run to confirm: `tests 6`, `pass 6`, `fail 0`. This step is a pure test addition; no
  production code changes.
  Commit: `git add server/src/subscriberCount.test.js && git commit -m "test(subscriber-count): day-boundary continuity and multi-day growth"`

- [ ] **Step 6: Write the failing tests for `computeSubscriberCount` — real delta added, and clamped.**
  Append to `server/src/subscriberCount.test.js` (add `computeSubscriberCount` to the import line):
  ```js
  test('a real-subscriber delta on top of epoch is added to the displayed total', () => {
    const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), realCountAtEpoch: 100, minPct: 0.3, maxPct: 2.5 }
    const now = doc.epoch
    const noGrowth = computeSubscriberCount(doc, { realCountNow: 100, now })
    const withGrowth = computeSubscriberCount(doc, { realCountNow: 130, now })
    assert.equal(withGrowth.value - noGrowth.value, 30)
  })

  test('a lapsed real subscriber (count below epoch) never lowers the displayed total', () => {
    const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), realCountAtEpoch: 100, minPct: 0.3, maxPct: 2.5 }
    const now = doc.epoch
    const atEpoch = computeSubscriberCount(doc, { realCountNow: 100, now })
    const belowEpoch = computeSubscriberCount(doc, { realCountNow: 60, now })
    assert.equal(belowEpoch.value, atEpoch.value)
  })

  test('computeSubscriberCount always returns a whole number and a non-negative rate', () => {
    const doc = { base: 790, epoch: Date.UTC(2026, 0, 1), realCountAtEpoch: 100, minPct: 0.3, maxPct: 2.5 }
    const { value, ratePerSecond } = computeSubscriberCount(doc, { realCountNow: 115, now: doc.epoch + 10 * 86_400_000 })
    assert.ok(Number.isInteger(value))
    assert.ok(ratePerSecond >= 0)
  })
  ```
  Run: `node --test server/src/subscriberCount.test.js`
  Expected FAIL: `computeSubscriberCount is not a function`.

- [ ] **Step 7: Implement `computeSubscriberCount`.**
  Append to `server/src/subscriberCount.js`:
  ```js
  /**
   * The full displayed figure: synthetic growth plus real signups since epoch.
   *
   * `ratePerSecond` is today's synthetic growth spread evenly across 86,400
   * seconds — what the client ticks the number up by between page loads. The
   * real-subscriber delta does not get its own rate: real signups are discrete
   * events, not something that should visibly tick every second.
   */
  export function computeSubscriberCount(doc, { realCountNow, now = Date.now() }) {
    const { dayStart, dayEnd, fraction } = syntheticDayBounds(now, doc)
    const syntheticNow = dayStart + (dayEnd - dayStart) * fraction
    const ratePerSecond = (dayEnd - dayStart) / 86_400
    const realDelta = Math.max(0, realCountNow - doc.realCountAtEpoch)
    return { value: Math.round(syntheticNow + realDelta), ratePerSecond }
  }
  ```
  Run: `node --test server/src/subscriberCount.test.js`
  Expected PASS: `tests 9`, `pass 9`, `fail 0`.
  Commit: `git add server/src/subscriberCount.js server/src/subscriberCount.test.js && git commit -m "feat(subscriber-count): add real-subscriber delta on top of synthetic growth"`

- [ ] **Step 8: Write the failing tests for the public payload shape and the stored defaults.**
  Append to `server/src/subscriberCount.test.js` (add `publicSubscriberCountPayload`, `DEFAULT_SUBSCRIBER_DISPLAY`, `SUBSCRIBER_DISPLAY_STATE_KEY` to the import line):
  ```js
  test('a disabled document reports disabled with no value', () => {
    const doc = { ...DEFAULT_SUBSCRIBER_DISPLAY, enabled: false }
    assert.deepEqual(publicSubscriberCountPayload(doc, { realCountNow: 500, now: Date.now() }), { enabled: false })
  })

  test('an enabled document reports enabled, a value, and a rate', () => {
    const doc = { enabled: true, base: 790, epoch: Date.UTC(2026, 0, 1), realCountAtEpoch: 100, minPct: 0.3, maxPct: 2.5 }
    const payload = publicSubscriberCountPayload(doc, { realCountNow: 100, now: doc.epoch })
    assert.equal(payload.enabled, true)
    assert.ok(Number.isInteger(payload.value))
    assert.equal(typeof payload.ratePerSecond, 'number')
  })

  test('the state key and default document match the spec defaults', () => {
    assert.equal(SUBSCRIBER_DISPLAY_STATE_KEY, 'nishany-subscriber-display-v1')
    assert.equal(DEFAULT_SUBSCRIBER_DISPLAY.enabled, false)
    assert.equal(DEFAULT_SUBSCRIBER_DISPLAY.base, 790)
    assert.equal(DEFAULT_SUBSCRIBER_DISPLAY.minPct, 0.3)
    assert.equal(DEFAULT_SUBSCRIBER_DISPLAY.maxPct, 2.5)
  })
  ```
  Run: `node --test server/src/subscriberCount.test.js`
  Expected FAIL: `publicSubscriberCountPayload is not a function` (and `DEFAULT_SUBSCRIBER_DISPLAY`/`SUBSCRIBER_DISPLAY_STATE_KEY` undefined).

- [ ] **Step 9: Implement the constants and `publicSubscriberCountPayload`.**
  Append to `server/src/subscriberCount.js`:
  ```js
  export const SUBSCRIBER_DISPLAY_STATE_KEY = 'nishany-subscriber-display-v1'

  /**
   * `epoch: 0` and `realCountAtEpoch: 0` are placeholders for a key that has
   * never been written — harmless because `enabled` is also `false`, and
   * `nextSubscriberDisplayDoc` (Task 4) always re-captures both the first time
   * anyone actually saves this document, base unchanged or not.
   */
  export const DEFAULT_SUBSCRIBER_DISPLAY = {
    enabled: false,
    base: 790,
    epoch: 0,
    realCountAtEpoch: 0,
    minPct: 0.3,
    maxPct: 2.5,
  }

  /** What `GET /api/public/subscriber-count` sends. Hides everything when off. */
  export function publicSubscriberCountPayload(doc, { realCountNow, now = Date.now() }) {
    if (!doc?.enabled) return { enabled: false }
    const { value, ratePerSecond } = computeSubscriberCount(doc, { realCountNow, now })
    return { enabled: true, value, ratePerSecond }
  }
  ```
  Run: `node --test server/src/subscriberCount.test.js`
  Expected PASS: `tests 12`, `pass 12`, `fail 0`.
  Commit: `git add server/src/subscriberCount.js server/src/subscriberCount.test.js && git commit -m "feat(subscriber-count): public payload shape and stored defaults"`

---

### Task 2: Extract the real active-subscription count reader

**Files:**
- Modifies: `server/src/platformReports.js` (~line 76, the `subscriptionRows` query inside `platformReport()`)

**Interfaces:**
- Produces:
  - `export const ACTIVE_SUBSCRIPTIONS_SQL: string`
  - `export async function activeSubscriptionCount(): Promise<number>`
- Consumes: `pool` from `./db.js` (already imported in this file).

This is a pure extract-and-reuse refactor: the exact SQL `platformReport()` already runs
is pulled into a named constant and a small exported function, and `platformReport()` is
pointed at the constant instead of a second copy of the string. No behavior changes, so
there is no new test — consistent with this repo's convention of never unit-testing
DB-touching functions (`platformReport()` itself has none either). Verified by running
the existing `platformReports.test.js` (regression) and a manual `grep` diff.

- [ ] **Step 1: Read the current query to copy it exactly.**
  Confirm the literal string at `server/src/platformReports.js` inside `platformReport()`:
  ```js
  pool.query("SELECT COUNT(*) AS activeSubscriptions FROM subscriptions WHERE status IN ('active','trialing') AND (expires_at IS NULL OR expires_at > NOW())"),
  ```
  This is the query the new function must reuse byte-for-byte — it is the one place in
  this task that reads `subscriptions`, and it must never become a second, drifting copy.

- [ ] **Step 2: Add the constant and the exported reader function.**
  Near the top of `server/src/platformReports.js`, just below the existing `import { pool } from './db.js'` line, add:
  ```js
  /**
   * The one query that reads `subscriptions` for the live subscriber count
   * (server/src/subscriberCount.js). Kept as a named constant, not inlined
   * twice, so `platformReport()`'s figure and the marketing count's real
   * delta can never silently drift from the same definition of "active."
   */
  export const ACTIVE_SUBSCRIPTIONS_SQL =
    "SELECT COUNT(*) AS activeSubscriptions FROM subscriptions WHERE status IN ('active','trialing') AND (expires_at IS NULL OR expires_at > NOW())"

  /** The real count of active/trialing subscriptions, right now. Read-only. */
  export async function activeSubscriptionCount() {
    const [rows] = await pool.query(ACTIVE_SUBSCRIPTIONS_SQL)
    return Number(rows[0]?.activeSubscriptions ?? 0)
  }
  ```

- [ ] **Step 3: Point `platformReport()`'s existing query at the constant.**
  In `platformReport()`, replace:
  ```js
  pool.query("SELECT COUNT(*) AS activeSubscriptions FROM subscriptions WHERE status IN ('active','trialing') AND (expires_at IS NULL OR expires_at > NOW())"),
  ```
  with:
  ```js
  pool.query(ACTIVE_SUBSCRIPTIONS_SQL),
  ```
  Nothing else in `platformReport()` changes — `subscriptionRows` still destructures to
  the same `[{ activeSubscriptions }]` shape, because `pool.query(ACTIVE_SUBSCRIPTIONS_SQL)`
  returns exactly what `pool.query("...")` returned.

  Verify: `grep -n "ACTIVE_SUBSCRIPTIONS_SQL\|activeSubscriptions" server/src/platformReports.js`
  Expected: the constant declared once, `activeSubscriptionCount()` using it, and
  `platformReport()`'s `Promise.all` entry using it — no literal SQL string duplicated.

  Run the existing suite as a regression check: `cd server && node --test src/platformReports.test.js`
  Expected PASS: `tests 2`, `pass 2`, `fail 0` (unchanged — this file's tests never
  touched the subscription query, so this confirms nothing else broke on import).

  Commit: `git add server/src/platformReports.js && git commit -m "refactor(platform-reports): extract activeSubscriptionCount for reuse by the subscriber-count feature"`

---

### Task 3: Storage read + public endpoint

**Files:**
- Modifies: `server/src/subscriberCount.js` (add DB-IO functions)
- Modifies: `server/src/index.js` (~line 62-75 imports, new route after the `/api/pricing/quote` block at ~line 863)

**Interfaces:**
- Produces:
  - `export async function readSubscriberDisplay(): Promise<SubscriberDisplayDoc>` (server/src/subscriberCount.js)
  - `GET /api/public/subscriber-count` → `{ enabled: false } | { enabled: true; value: number; ratePerSecond: number }`, no auth guard.
- Consumes:
  - `pool` from `./db.js`
  - `activeSubscriptionCount` from `./platformReports.js` (Task 2)
  - `SUBSCRIBER_DISPLAY_STATE_KEY`, `DEFAULT_SUBSCRIBER_DISPLAY`, `publicSubscriberCountPayload` from `./subscriberCount.js` (Task 1)

This task's route is DB-touching glue, so — matching this repo's convention (no
supertest, DB routes verified manually) — it is verified with a running dev server and
`curl`, not an automated test. The pure logic it calls was already proven in Task 1.

- [ ] **Step 1: Add `readSubscriberDisplay` to `server/src/subscriberCount.js`.**
  Add the DB import at the top of the file and the reader function at the bottom:
  ```js
  import { pool } from './db.js'
  ```
  ```js
  /** The stored document, or the defaults if the key has never been written. */
  export async function readSubscriberDisplay() {
    const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [SUBSCRIBER_DISPLAY_STATE_KEY])
    if (!rows.length) return { ...DEFAULT_SUBSCRIBER_DISPLAY }
    try {
      return { ...DEFAULT_SUBSCRIBER_DISPLAY, ...JSON.parse(rows[0].v) }
    } catch {
      return { ...DEFAULT_SUBSCRIBER_DISPLAY }
    }
  }
  ```
  This has no new unit test — it is a two-branch DB read with no independent logic
  (the merge-with-defaults behavior is a one-liner), matching how `documentAllowance`
  and `pricingQuote` (both DB readers with no tests of their own) are treated elsewhere
  in this codebase.

- [ ] **Step 2: Confirm the module still loads cleanly with the new DB import.**
  Run: `node --test server/src/subscriberCount.test.js`
  Expected PASS: `tests 12`, `pass 12`, `fail 0` (Task 1's tests are unaffected — they
  never call `readSubscriberDisplay`, and importing `pool` from `db.js` does not open a
  connection at import time).
  Commit: `git add server/src/subscriberCount.js && git commit -m "feat(subscriber-count): read the stored document from app_state"`

- [ ] **Step 3: Wire the imports in `server/src/index.js`.**
  Change the existing platformReports import (~line 75):
  ```js
  import { acknowledgeStorageThreshold, platformReport } from './platformReports.js'
  ```
  to:
  ```js
  import { acknowledgeStorageThreshold, activeSubscriptionCount, platformReport } from './platformReports.js'
  ```
  Add a new import just below the existing pricing import (~line 62):
  ```js
  import { publicSubscriberCountPayload, readSubscriberDisplay } from './subscriberCount.js'
  ```

- [ ] **Step 4: Add the public route.**
  In `server/src/index.js`, immediately after the `/* ── Pricing and verified QBank records ── */`
  block's `app.get('/api/pricing/quote', ...)` route (~line 863), add:
  ```js
  /**
   * The marketing subscriber count. No auth guard — it is read by anonymous
   * landing-page visitors, the same way `/api/pricing/quote` is. Hidden
   * entirely (`{ enabled: false }`) until a superadmin turns it on.
   */
  app.get('/api/public/subscriber-count', wrap(async (req, res) => {
    const doc = await readSubscriberDisplay()
    if (!doc.enabled) return res.json({ enabled: false })
    const realCountNow = await activeSubscriptionCount()
    res.json(publicSubscriberCountPayload(doc, { realCountNow, now: Date.now() }))
  }))
  ```

- [ ] **Step 5: Manually verify against a running server.**
  Start the server: `cd server && node --env-file-if-exists=.env src/index.js` (or the
  project's normal dev-server launch command).
  Run: `curl -s http://localhost:<port>/api/public/subscriber-count`
  Expected: `{"enabled":false}` (the key has never been written, so `readSubscriberDisplay`
  falls back to `DEFAULT_SUBSCRIBER_DISPLAY`, whose `enabled` is `false`).
  Stop the server.
  Commit: `git add server/src/index.js && git commit -m "feat(subscriber-count): serve GET /api/public/subscriber-count"`

---

### Task 4: Superadmin write endpoint

**Files:**
- Modifies: `server/src/subscriberCount.js` (add `nextSubscriberDisplayDoc` + `writeSubscriberDisplay`)
- Modifies: `server/src/subscriberCount.test.js` (add write-validation and guard tests)
- Modifies: `server/src/index.js` (new route after the public route added in Task 3)

**Interfaces:**
- Produces:
  - `export function nextSubscriberDisplayDoc(current: SubscriberDisplayDoc, patch: unknown, { realCountNow: number, now?: number }): { ok: true; doc: SubscriberDisplayDoc } | { ok: false; error: string }`
  - `export async function writeSubscriberDisplay(doc: SubscriberDisplayDoc, actorId: string): Promise<void>`
  - `POST /api/admin/subscriber-count` (guarded by `requireSuperAdmin`) → `{ ok: true; doc: SubscriberDisplayDoc; preview: { value: number; ratePerSecond: number } }` or `400 { error: string }`
- Consumes:
  - `requireSuperAdmin` from `./auth.js` (already imported in `index.js`, line 24)
  - `readSubscriberDisplay`, `writeSubscriberDisplay`, `nextSubscriberDisplayDoc`, `computeSubscriberCount` from `./subscriberCount.js`
  - `activeSubscriptionCount` from `./platformReports.js`

- [ ] **Step 1: Write the failing tests for `nextSubscriberDisplayDoc`.**
  Append to `server/src/subscriberCount.test.js` (add `nextSubscriberDisplayDoc` to the import line):
  ```js
  test('changing base re-captures epoch and the real count at that moment', () => {
    const current = { enabled: true, base: 790, epoch: 1000, realCountAtEpoch: 50, minPct: 0.3, maxPct: 2.5 }
    const patch = { enabled: true, base: 900, minPct: 0.3, maxPct: 2.5 }
    const result = nextSubscriberDisplayDoc(current, patch, { realCountNow: 77, now: 5000 })
    assert.equal(result.ok, true)
    assert.equal(result.doc.epoch, 5000)
    assert.equal(result.doc.realCountAtEpoch, 77)
    assert.equal(result.doc.base, 900)
  })

  test('leaving base unchanged keeps the existing epoch and real count', () => {
    const current = { enabled: true, base: 790, epoch: 1000, realCountAtEpoch: 50, minPct: 0.3, maxPct: 2.5 }
    const patch = { enabled: false, base: 790, minPct: 0.5, maxPct: 2 }
    const result = nextSubscriberDisplayDoc(current, patch, { realCountNow: 77, now: 5000 })
    assert.equal(result.ok, true)
    assert.equal(result.doc.epoch, 1000)
    assert.equal(result.doc.realCountAtEpoch, 50)
    assert.equal(result.doc.enabled, false)
    assert.equal(result.doc.minPct, 0.5)
  })

  test('the very first save captures an epoch even when base matches the default', () => {
    const current = { ...DEFAULT_SUBSCRIBER_DISPLAY } // epoch: 0 → "never configured"
    const result = nextSubscriberDisplayDoc(current, { enabled: true, base: 790, minPct: 0.3, maxPct: 2.5 }, { realCountNow: 12, now: 9000 })
    assert.equal(result.ok, true)
    assert.equal(result.doc.epoch, 9000)
    assert.equal(result.doc.realCountAtEpoch, 12)
  })

  test('a negative base is refused', () => {
    const current = { ...DEFAULT_SUBSCRIBER_DISPLAY, epoch: 1000 }
    const result = nextSubscriberDisplayDoc(current, { enabled: true, base: -5, minPct: 0.3, maxPct: 2.5 }, { realCountNow: 0, now: 1000 })
    assert.equal(result.ok, false)
  })

  test('minPct greater than maxPct is refused', () => {
    const current = { ...DEFAULT_SUBSCRIBER_DISPLAY, epoch: 1000 }
    const result = nextSubscriberDisplayDoc(current, { enabled: true, base: 790, minPct: 3, maxPct: 1 }, { realCountNow: 0, now: 1000 })
    assert.equal(result.ok, false)
  })
  ```
  Run: `node --test server/src/subscriberCount.test.js`
  Expected FAIL: `nextSubscriberDisplayDoc is not a function`.

- [ ] **Step 2: Implement `nextSubscriberDisplayDoc`.**
  Append to `server/src/subscriberCount.js`:
  ```js
  /**
   * Validates a superadmin's patch and decides the document to store.
   *
   * `epoch`/`realCountAtEpoch` are re-captured — set to `now`/`realCountNow` —
   * whenever `base` changes, or whenever the document has never been given an
   * epoch (`current.epoch` falsy: the very first save). Left untouched
   * otherwise, so toggling `enabled` or retuning `minPct`/`maxPct` does not
   * reset the growth clock.
   */
  export function nextSubscriberDisplayDoc(current, patch, { realCountNow, now = Date.now() }) {
    const enabled = Boolean(patch?.enabled)
    const base = Number(patch?.base)
    const minPct = Number(patch?.minPct)
    const maxPct = Number(patch?.maxPct)
    if (!Number.isFinite(base) || base < 0) {
      return { ok: false, error: 'base must be a non-negative number' }
    }
    if (!Number.isFinite(minPct) || !Number.isFinite(maxPct) || minPct < 0 || maxPct < minPct) {
      return { ok: false, error: 'minPct/maxPct must be numbers with minPct <= maxPct' }
    }
    const needsEpoch = base !== current.base || !current.epoch
    return {
      ok: true,
      doc: {
        enabled,
        base,
        minPct,
        maxPct,
        epoch: needsEpoch ? now : current.epoch,
        realCountAtEpoch: needsEpoch ? realCountNow : current.realCountAtEpoch,
      },
    }
  }
  ```
  Run: `node --test server/src/subscriberCount.test.js`
  Expected PASS: `tests 17`, `pass 17`, `fail 0`.
  Commit: `git add server/src/subscriberCount.js server/src/subscriberCount.test.js && git commit -m "feat(subscriber-count): validate a superadmin patch, re-capture epoch on base change"`

- [ ] **Step 3: Write the failing guard test — `requireSuperAdmin` refuses a non-superadmin.**
  Append to `server/src/subscriberCount.test.js`:
  ```js
  import { requireSuperAdmin } from './auth.js'

  test('requireSuperAdmin refuses anyone who is not a super admin', () => {
    let statusCode = null
    let body = null
    const res = { status(code) { statusCode = code; return this }, json(payload) { body = payload; return this } }
    let nextCalled = false
    requireSuperAdmin({ identity: { role: 'admin', aal: 'aal2' } }, res, () => { nextCalled = true })
    assert.equal(nextCalled, false)
    assert.equal(statusCode, 403)
    assert.deepEqual(body, { error: 'super admin required' })
  })

  test('requireSuperAdmin admits a super admin who has satisfied MFA', () => {
    let nextCalled = false
    const res = { status() { return this }, json() { return this } }
    requireSuperAdmin({ identity: { role: 'super_admin', aal: 'aal2', mfaRequired: true } }, res, () => { nextCalled = true })
    assert.equal(nextCalled, true)
  })
  ```
  Run: `node --test server/src/subscriberCount.test.js`
  Expected FAIL: none of the *new* assertions should fail if `auth.js` is unchanged and
  correct — this step's "red" is about confirming the test file itself compiles and the
  import resolves; if `requireSuperAdmin`'s behavior ever regresses, this is the test
  that goes red. Run once now to see it pass immediately (this endpoint's guard is
  pre-existing code being characterized, not new code):
  Expected: `tests 19`, `pass 19`, `fail 0`.
  Commit: `git add server/src/subscriberCount.test.js && git commit -m "test(subscriber-count): pin requireSuperAdmin's guard behavior for this endpoint"`

- [ ] **Step 4: Add `writeSubscriberDisplay` to `server/src/subscriberCount.js`.**
  Append to `server/src/subscriberCount.js`:
  ```js
  /**
   * Writes the document, versioned. Same shape as every other admin-owned
   * app_state write in this codebase (see `POST /api/content-reports/:id/delete`
   * in index.js): a version row first, then the live row, in one transaction.
   */
  export async function writeSubscriberDisplay(doc, actorId) {
    const v = JSON.stringify(doc)
    const conn = await pool.getConnection()
    try {
      await conn.beginTransaction()
      await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [SUBSCRIBER_DISPLAY_STATE_KEY, v, actorId])
      await conn.query('INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)', [SUBSCRIBER_DISPLAY_STATE_KEY, v])
      await conn.commit()
    } catch (error) {
      await conn.rollback()
      throw error
    } finally {
      conn.release()
    }
  }
  ```
  No new test — this is DB-IO with no independent branching logic, matching the
  no-test convention already established for `readSubscriberDisplay` in Task 3.
  Run: `node --test server/src/subscriberCount.test.js`
  Expected PASS: `tests 19`, `pass 19`, `fail 0` (unchanged — confirms the file still
  loads cleanly).
  Commit: `git add server/src/subscriberCount.js && git commit -m "feat(subscriber-count): write the document, versioned"`

- [ ] **Step 5: Add the superadmin write route.**
  In `server/src/index.js`, update the subscriberCount import (~line 62-63) to:
  ```js
  import { computeSubscriberCount, nextSubscriberDisplayDoc, publicSubscriberCountPayload, readSubscriberDisplay, writeSubscriberDisplay } from './subscriberCount.js'
  ```
  Immediately after the `GET /api/public/subscriber-count` route added in Task 3, add:
  ```js
  /**
   * Superadmin-only. `requireSuperAdmin`, not `requireConsole` — the generic
   * `PUT /api/state/:key` must never write this key, because a base change
   * has to re-capture the real subscription count in the same request as the
   * write, and the generic route has no way to express that.
   */
  app.post('/api/admin/subscriber-count', requireSuperAdmin, wrap(async (req, res) => {
    const current = await readSubscriberDisplay()
    const realCountNow = await activeSubscriptionCount()
    const result = nextSubscriberDisplayDoc(current, req.body ?? {}, { realCountNow, now: Date.now() })
    if (!result.ok) return res.status(400).json({ error: result.error })
    await writeSubscriberDisplay(result.doc, req.identity.id)
    const preview = computeSubscriberCount(result.doc, { realCountNow, now: Date.now() })
    res.json({ ok: true, doc: result.doc, preview })
  }))
  ```

- [ ] **Step 6: Manually verify the guard and the write against a running server.**
  Start the server: `cd server && node --env-file-if-exists=.env src/index.js`
  Run (no auth header — expect a refusal): `curl -s -o /dev/null -w '%{http_code}\n' -X POST http://localhost:<port>/api/admin/subscriber-count -H 'Content-Type: application/json' -d '{}'`
  Expected: `401` or `403` (no identity / not a super admin — depends on how this
  deployment's dev auth is configured; either way, not `200`).
  With a valid superadmin bearer token (from a superadmin's own signed-in session):
  ```
  curl -s -X POST http://localhost:<port>/api/admin/subscriber-count \
    -H "Authorization: Bearer <token>" -H 'Content-Type: application/json' \
    -d '{"enabled":true,"base":790,"minPct":0.3,"maxPct":2.5}'
  ```
  Expected: `200` with `{"ok":true,"doc":{...,"enabled":true,"base":790,...},"preview":{"value":790,"ratePerSecond":...}}`.
  Then: `curl -s http://localhost:<port>/api/public/subscriber-count`
  Expected: `{"enabled":true,"value":790,"ratePerSecond":<number>}`.
  Stop the server.
  Commit: `git add server/src/index.js && git commit -m "feat(subscriber-count): serve POST /api/admin/subscriber-count, superadmin-only"`

---

### Task 5: Frontend hook and `<LiveCount>` component

**Files:**
- Creates: `src/lib/useSubscriberCount.ts`
- Creates: `src/components/marketing/LiveCount.tsx`
- Modifies: `src/pages/admin/Settings.tsx` (temporary mount, superseded by Task 6's real panel)

**Interfaces:**
- Produces:
  - `export function useSubscriberCount(): { enabled: boolean; value: number | null }` (src/lib/useSubscriberCount.ts)
  - `export function LiveCount(props: { variant?: 'chip' | 'band'; className?: string }): JSX.Element | null` (src/components/marketing/LiveCount.tsx)
- Consumes:
  - `API_MODE`, `apiGet` from `@/lib/api`
  - `cn` from `@/lib/cn`
  - `GET /api/public/subscriber-count` (Task 3)

`LiveCount` does its own fetch of the public endpoint rather than consuming
`useSubscriberCount()` — it needs `ratePerSecond` for its live tick, which is
deliberately outside `useSubscriberCount`'s pinned return shape (`{ enabled, value }`
only, per the Global Constraints above). The two are independent, equally valid
consumers of the same endpoint; forcing `LiveCount` through the narrower hook would mean
inventing a second, wider hook nobody asked for.

- [ ] **Step 1: Write `useSubscriberCount`.**
  Create `src/lib/useSubscriberCount.ts`:
  ```ts
  import { useEffect, useState } from 'react'
  import { API_MODE, apiGet } from './api'

  interface SubscriberCountResponse {
    enabled: boolean
    value?: number
    ratePerSecond?: number
  }

  /**
   * The live subscriber count, read-only. `{ enabled: false, value: null }`
   * until the fetch resolves, in demo mode (no backend), or when the
   * superadmin has the feature turned off — three states a caller need not
   * tell apart, since all three mean "do not show a number."
   */
  export function useSubscriberCount(): { enabled: boolean; value: number | null } {
    const [state, setState] = useState<{ enabled: boolean; value: number | null }>({ enabled: false, value: null })

    useEffect(() => {
      if (!API_MODE) return
      let active = true
      apiGet<SubscriberCountResponse>('/public/subscriber-count')
        .then((data) => {
          if (!active) return
          setState(data.enabled && typeof data.value === 'number' ? { enabled: true, value: data.value } : { enabled: false, value: null })
        })
        .catch(() => { if (active) setState({ enabled: false, value: null }) })
      return () => { active = false }
    }, [])

    return state
  }
  ```
  This hook has no dedicated test file: it is a thin fetch-into-state wrapper with no
  branching logic of its own (the same shape as `useAssistant.ts`'s and
  `useAdminUsers.ts`'s `API_MODE` guard, neither of which has a test) — it is verified
  by browser in Step 5 below, through `<LiveCount>`.

- [ ] **Step 2: Write `LiveCount`'s data-fetch and disabled/demo-mode null render.**
  Create `src/components/marketing/LiveCount.tsx`:
  ```tsx
  import { useEffect, useRef, useState } from 'react'
  import { API_MODE, apiGet } from '@/lib/api'
  import { cn } from '@/lib/cn'

  interface SubscriberCountResponse {
    enabled: boolean
    value?: number
    ratePerSecond?: number
  }

  /**
   * The marketing subscriber count: a small pulsing "live" dot next to a
   * number that counts up from 0 the first time it scrolls into view, then
   * ticks up in real time. Renders nothing at all while the feature is off,
   * in demo mode, or before the first successful fetch — never a placeholder
   * "0" that a visitor could mistake for the real figure.
   */
  export function LiveCount({ variant = 'chip', className }: { variant?: 'chip' | 'band'; className?: string }): JSX.Element | null {
    const [data, setData] = useState<{ value: number; ratePerSecond: number } | null>(null)

    useEffect(() => {
      if (!API_MODE) return
      let active = true
      apiGet<SubscriberCountResponse>('/public/subscriber-count')
        .then((res) => {
          if (!active || !res.enabled || typeof res.value !== 'number') return
          setData({ value: res.value, ratePerSecond: res.ratePerSecond ?? 0 })
        })
        .catch(() => {})
      return () => { active = false }
    }, [])

    if (!data) return null

    return (
      <span className={cn('inline-flex items-center gap-2', className)}>
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-success motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        <span className={cn('tnum font-mono font-semibold', variant === 'band' ? 'text-2xl' : 'text-sm')}>
          {data.value.toLocaleString('en-US')}
        </span>
      </span>
    )
  }
  ```
  This intermediate version always shows the final value with no count-up yet — Step 3
  adds the scroll-triggered animation on top without changing this shape.

- [ ] **Step 3: Add the scroll-into-view count-up and the live per-second tick.**
  Replace the component body in `src/components/marketing/LiveCount.tsx` with:
  ```tsx
  export function LiveCount({ variant = 'chip', className }: { variant?: 'chip' | 'band'; className?: string }): JSX.Element | null {
    const [data, setData] = useState<{ value: number; ratePerSecond: number } | null>(null)
    const [displayed, setDisplayed] = useState<number | null>(null)
    const rootRef = useRef<HTMLSpanElement | null>(null)
    const startedRef = useRef(false)

    useEffect(() => {
      if (!API_MODE) return
      let active = true
      apiGet<SubscriberCountResponse>('/public/subscriber-count')
        .then((res) => {
          if (!active || !res.enabled || typeof res.value !== 'number') return
          setData({ value: res.value, ratePerSecond: res.ratePerSecond ?? 0 })
        })
        .catch(() => {})
      return () => { active = false }
    }, [])

    // Count up from 0 the first time the number scrolls into view.
    useEffect(() => {
      const node = rootRef.current
      if (!node || !data || startedRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return
        startedRef.current = true
        observer.disconnect()
        if (reduceMotion) { setDisplayed(data.value); return }
        const durationMs = 1200
        const startedAt = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - startedAt) / durationMs)
          setDisplayed(Math.round(data.value * progress))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }, { threshold: 0.4 })
      observer.observe(node)
      return () => observer.disconnect()
    }, [data])

    // After the count-up finishes, keep ticking up by ratePerSecond.
    useEffect(() => {
      if (!data || displayed === null || displayed < data.value) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const interval = window.setInterval(() => {
        setDisplayed((current) => (current === null ? current : current + data.ratePerSecond))
      }, 1000)
      return () => window.clearInterval(interval)
    }, [data, displayed])

    if (!data) return null
    const shown = Math.round(displayed ?? 0)

    return (
      <span ref={rootRef} className={cn('inline-flex items-center gap-2', className)}>
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-success motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        <span className={cn('tnum font-mono font-semibold', variant === 'band' ? 'text-2xl' : 'text-sm')}>
          {shown.toLocaleString('en-US')}
        </span>
      </span>
    )
  }
  ```

- [ ] **Step 4: Typecheck.**
  Run: `npx tsc -b --noEmit`
  Expected PASS: no errors from `src/lib/useSubscriberCount.ts` or
  `src/components/marketing/LiveCount.tsx`. If `node_modules` is empty in this worktree
  (symlink it from the main checkout first — see repo memory on worktree setup), fix
  that before trusting this result.

- [ ] **Step 5: Temporarily mount `<LiveCount>` to browser-verify it, then commit.**
  In `src/pages/admin/Settings.tsx`, add a temporary import and a one-line mount right
  under the `<PageHeader ... />` line, purely to make the component reachable in the
  running app before Task 6 wires it into a real panel:
  ```tsx
  import { LiveCount } from '@/components/marketing/LiveCount'
  ```
  ```tsx
  <LiveCount variant="band" className="mb-4" />
  ```
  With the dev server running and a superadmin session already active (from Task 4's
  manual verification, or by turning the feature on there first):
  1. Open `/admin/settings` in the browser.
  2. Confirm a pulsing green dot and a number are visible near the top of the page,
     counting up from 0 shortly after the page settles (it is already in view on load,
     so the `IntersectionObserver` fires almost immediately).
  3. In DevTools, enable "Emulate CSS prefers-reduced-motion: reduce," reload, and
     confirm the number appears immediately at its final value with no count-up, while
     the dot itself no longer pulses (`motion-reduce:animate-none`).
  4. With the subscriber-count feature turned off (re-run Task 4's curl with
     `"enabled":false`), reload the page and confirm nothing renders where `<LiveCount>`
     was — no dot, no number, no empty gap wider than the removed `className="mb-4"`
     margin.
  Revert the temporary mount (Task 6 replaces it with the real panel):
  ```
  git diff src/pages/admin/Settings.tsx
  ```
  Remove the two added lines, leaving `Settings.tsx` exactly as it was before this step.
  Commit: `git add src/lib/useSubscriberCount.ts src/components/marketing/LiveCount.tsx && git commit -m "feat(subscriber-count): useSubscriberCount hook and LiveCount component"`

---

### Task 6: Superadmin panel in Settings

**Files:**
- Modifies: `src/pages/admin/Settings.tsx` (new panel, placed after the existing "Peer answer breakdown" panel at ~line 420, before "Build Maristanas economy")

**Interfaces:**
- Consumes:
  - `apiGet`, `apiPost` from `@/lib/api`
  - `LiveCount` from `@/components/marketing/LiveCount` (Task 5)
  - `Panel`, `PanelHeader` from `@/components/ui/Panel`
  - `Field`, `TextInput` from `@/components/ui/Field`
  - `Toggle` from `@/components/ui/Toggle`
  - `Button` from `@/components/ui/Button`
  - `GET /api/state/nishany-subscriber-display-v1` (generic read — this key holds no
    student-facing data and no student ever reads it, so the existing console-access
    `GET /api/state/:key` route is reused here rather than adding a third endpoint)
  - `POST /api/admin/subscriber-count` (Task 4 — never the generic `PUT /api/state/:key`)
- Produces: no new exports — this is a page, not a module others import.

- [ ] **Step 1: Add local form state, seeded from the generic state read.**
  In `src/pages/admin/Settings.tsx`, add to the top-level imports:
  ```tsx
  import { TrendingUp as SubscriberIcon } from 'lucide-react'
  import { apiPost } from '@/lib/api'
  import { LiveCount } from '@/components/marketing/LiveCount'
  ```
  (`TrendingUp` is already imported for the answer-changes panel; alias a second import
  of it as `SubscriberIcon` rather than importing the same named export twice — or, if
  the linter refuses the alias-of-an-already-imported-name pattern, reuse the existing
  `TrendingUp` identifier directly for this panel's `PanelHeader icon` instead of
  aliasing.)

  Add state, right after the existing `answerStats`/`answerStatsEnabled` declarations
  (~line 74):
  ```tsx
  interface SubscriberCountForm {
    enabled: boolean
    base: number
    minPct: number
    maxPct: number
  }
  const SUBSCRIBER_DISPLAY_KEY = 'nishany-subscriber-display-v1'
  const DEFAULT_SUBSCRIBER_FORM: SubscriberCountForm = { enabled: false, base: 790, minPct: 0.3, maxPct: 2.5 }
  ```
  ```tsx
  const [subscriberForm, setSubscriberForm] = useState<SubscriberCountForm>(DEFAULT_SUBSCRIBER_FORM)
  const [subscriberSaving, setSubscriberSaving] = useState(false)
  const [subscriberError, setSubscriberError] = useState('')
  const [subscriberPreviewKey, setSubscriberPreviewKey] = useState(0)

  useEffect(() => {
    if (!API_MODE) return
    let active = true
    apiGet<{ value: Partial<SubscriberCountForm> | null }>(`/state/${SUBSCRIBER_DISPLAY_KEY}`)
      .then((res) => {
        if (!active || !res.value) return
        setSubscriberForm((current) => ({ ...current, ...res.value }))
      })
      .catch(() => {})
    return () => { active = false }
  }, [])
  ```

- [ ] **Step 2: Add the save handler.**
  Right after the state above:
  ```tsx
  const saveSubscriberCount = async () => {
    setSubscriberSaving(true)
    setSubscriberError('')
    try {
      await apiPost('/admin/subscriber-count', subscriberForm)
      setSubscriberPreviewKey((k) => k + 1) // remounts <LiveCount>, forcing a fresh fetch
    } catch {
      setSubscriberError('Could not save — check the values and try again.')
    } finally {
      setSubscriberSaving(false)
    }
  }
  ```

- [ ] **Step 3: Add the panel JSX.**
  Insert after the "Peer answer breakdown" `</Panel>` (~line 420) and before the "Build
  Maristanas economy" `<Panel className="mb-4">`:
  ```tsx
  <Panel className="mb-4">
    <PanelHeader title="Live subscriber count" icon={TrendingUp} hint="A marketing figure, secluded from real student/subscription data" />
    <div className="border-b border-line p-5">
      <p className="max-w-3xl text-[12.5px] leading-relaxed text-ink-2">
        A synthetic baseline that grows a little every day, with real signups added on
        top. This never reads or changes a student's record or a subscription — it only
        ever counts how many are currently active, to add that growth on top of the
        baseline below.
      </p>
    </div>
    <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
      <Field label="Starting figure (base)">
        <TextInput
          type="number" min={0} step={1}
          value={subscriberForm.base}
          onChange={(event) => setSubscriberForm((current) => ({ ...current, base: Number(event.target.value) }))}
          className="tnum font-mono"
        />
      </Field>
      <Field label="Minimum daily growth %">
        <TextInput
          type="number" min={0} step={0.1}
          value={subscriberForm.minPct}
          onChange={(event) => setSubscriberForm((current) => ({ ...current, minPct: Number(event.target.value) }))}
          className="tnum font-mono"
        />
      </Field>
      <Field label="Maximum daily growth %">
        <TextInput
          type="number" min={0} step={0.1}
          value={subscriberForm.maxPct}
          onChange={(event) => setSubscriberForm((current) => ({ ...current, maxPct: Number(event.target.value) }))}
          className="tnum font-mono"
        />
      </Field>
      <label className="flex items-center gap-2 pt-5 text-[12.5px] text-ink-2">
        <Toggle
          checked={subscriberForm.enabled}
          onChange={(enabled) => setSubscriberForm((current) => ({ ...current, enabled }))}
          label="Show the live subscriber count"
        />
        {subscriberForm.enabled ? 'Shown to visitors' : 'Hidden'}
      </label>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line p-5">
      <div>
        <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.06em] text-ink-3">Preview</p>
        <LiveCount key={subscriberPreviewKey} variant="band" />
        {!subscriberForm.enabled && <p className="text-[12.5px] text-ink-3">Off — no value is shown to visitors.</p>}
      </div>
      <div className="flex items-center gap-3">
        {subscriberError && <p className="text-[12.5px] text-danger">{subscriberError}</p>}
        <Button variant="primary" size="md" onClick={saveSubscriberCount} disabled={subscriberSaving}>
          {subscriberSaving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </div>
  </Panel>
  ```
  Note: the preview only shows a `<LiveCount>` figure once the *saved* state has
  `enabled: true` — a base/minPct/maxPct edit that has not been saved yet is not
  reflected in the preview until "Save changes" is pressed, since `<LiveCount>` always
  reads the live, saved endpoint rather than the unsaved form. This is deliberate: the
  preview is honestly "what visitors would see right now," not a simulation of unsaved
  edits.

- [ ] **Step 4: Typecheck.**
  Run: `npx tsc -b --noEmit`
  Expected PASS: no errors in `src/pages/admin/Settings.tsx`.

- [ ] **Step 5: Browser-verify the full round trip.**
  With the dev server running and signed in as a superadmin:
  1. Open `/admin/settings`, scroll to "Live subscriber count." Confirm it starts
     `Hidden` with base `790`, min `0.3`, max `2.5` (either freshly seeded defaults, or
     whatever Task 4's manual curl left behind — if the latter, this also proves the
     `GET /api/state/nishany-subscriber-display-v1` prefill works).
  2. Toggle "Show the live subscriber count" on, leave the numbers as-is, click "Save
     changes." Confirm the preview area now shows a pulsing dot and `790` (counting up
     from 0).
  3. Change "Starting figure (base)" to `1000`, click "Save changes" again. Confirm the
     preview updates to `1000` after the save resolves (the `key={subscriberPreviewKey}`
     remount forces `<LiveCount>` to re-fetch).
  4. Reload the page entirely. Confirm the form still shows `enabled: true, base: 1000`
     and the preview still renders — proving the round trip survived a page reload, not
     just React state.
  5. Toggle off, save, reload. Confirm the preview area now shows "Off — no value is
     shown to visitors." and no dot.
  Commit: `git add src/pages/admin/Settings.tsx && git commit -m "feat(subscriber-count): superadmin panel to tune and preview the live count"`

---

## Self-review: spec bullets mapped to tasks

- **Storage** (`nishany-subscriber-display-v1` app_state key, defaults, never writes
  students/subscriptions) → Task 1 (`SUBSCRIBER_DISPLAY_STATE_KEY`,
  `DEFAULT_SUBSCRIBER_DISPLAY`), Task 3 (`readSubscriberDisplay`), Task 4
  (`writeSubscriberDisplay`, `nextSubscriberDisplayDoc`). Task 2 documents and enforces
  the "reads, never writes, `subscriptions`" boundary by naming the one query the whole
  feature is allowed to run against it.
- **Model** (synthetic growth eased within the day, deterministic daily multiplier, real
  delta on top, whole numbers, monotonic) → Task 1, fully unit-tested
  (`dailyMultiplierPercent`, `syntheticValueAt`, `computeSubscriberCount`,
  `publicSubscriberCountPayload`).
- **Endpoints** (`GET /api/public/subscriber-count`, `POST /api/admin/subscriber-count`
  guarded by `requireSuperAdmin`, never the generic `PUT /api/state/:key`) → Task 3
  (public read) and Task 4 (superadmin write + guard test).
- **Front-end** (`useSubscriberCount()`, `<LiveCount>`, scroll-triggered count-up, live
  tick, reduced-motion, pulsing dot) → Task 5.
- **Superadmin UI** (base/toggle/min/max in Settings, read-only preview) → Task 6.
- **Testing** (multiplier range, whole numbers, monotonic within a day and across a day
  boundary, real delta added, disabled → hidden) → Task 1, Steps 1, 3, 5, 6, 8 cover
  every one of these bullets individually; Task 4 adds write-validation and guard
  coverage on top.

No spec bullet for Section 3 was left unmapped. The one deliberate scope decision beyond
the spec's literal text: the superadmin panel's "read-only preview" (Task 6) is the real
`<LiveCount>` component reading the real, saved endpoint — not a second, client-side
reimplementation of the growth model — so there is exactly one implementation of the
math in the whole feature, and the preview can never drift from what a visitor actually
sees.
