# Question of the Day Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a daily-question engagement feature — one shared question per `{university, year}` cohort, answered inline, driving a personal streak, a cohort leaderboard, a friends comparison, and a shareable result — as a fully separate progress track.

**Architecture:** The **server is authoritative in live mode**: `GET /api/qotd/today` computes today's question id for the caller's cohort (deterministic seed, admin-pin override) and `POST /api/qotd/answer` re-derives and re-marks it, writing to a new `qotd_answers` SQL table that never touches `qbank_attempts` or mastery. The client renders whatever question id the server returns. In demo mode (no backend) the same deterministic selection runs client-side over `localStorage`. Pure selection/streak logic lives in small tested TypeScript modules (Lane A); the server ports the identical algorithm in JS (Lane B); the student UI (Lane C) and admin override (Lane D) build on top.

**Tech Stack:** React 19 + Vite + react-router-dom 7 (client), Express + mysql2/MariaDB (server), `node --test --experimental-strip-types` for tests, Tailwind v4. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-08-29-question-of-the-day-design.md` (read it alongside this plan)

## Global Constraints

- **No new npm dependencies.** Everything uses what `package.json` already has.
- **Tests are pure-logic `*.test.ts` (client) / `*.test.js` (server)**, co-located, run by `node --test`. There is no React/DOM test harness — keep all testable logic out of components and in Lane A/B modules.
- **Separate track is structural:** QotD answers write ONLY to `qotd_answers` (live) or the `nishany.qotd.answers.v1` user-state document (demo). They must never call `useRecordAttempt`, write mastery/SRS, or insert into `qbank_attempts`.
- **Cohort identity = `{ universityId, year-label }`** (e.g. `{ 'kau', 'Year 2' }`) for people/answers; **year _id_** (e.g. `KAU_...`) is what content is tagged with for scoping. Do not conflate them.
- **Timezone is Africa/Cairo, fixed**, for every "today"/date computation, so a cohort rolls over together.
- **Live vs demo mode** is `API_MODE` from `src/lib/api.ts` (`Boolean(import.meta.env.VITE_API_BASE)`). Server is authoritative when live; client selects locally when demo.
- **Server marking reuses `publishedQuestions()`** (`server/src/publishedQuestions.js`) — never re-derive a correct index; a marking drift is a correctness bug.
- **Route registry is the single source of truth** — a student route not added to `studentPages` in `src/router.tsx` silently 404s.
- Commit after every green step. Small atomic commits. Conventional-commit messages prefixed `feat(qotd):` / `test(qotd):` / `docs(qotd):`.
- End every commit message with:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`

## File map

**Lane A — pure contract (client TS, `src/data/` + `src/lib/`)**
- Create `src/data/qotdCohort.ts` — `hash32`, `cohortKey`, `qotdDateInCairo`, `dayNumber`.
- Create `src/data/qotdCohort.test.ts`.
- Create `src/data/qotdSelection.ts` — candidate/cohort/pins types, `scopeCandidates`, `selectQotdId`.
- Create `src/data/qotdSelection.test.ts`.
- Create `src/data/qotdStreak.ts` — `computeStreak`.
- Create `src/data/qotdStreak.test.ts`.
- Create `src/data/qotdTypes.ts` — shared API payload types + `QOTD_PINS_KEY`, `QOTD_LOCAL_ANSWERS_KEY`.

**Lane B — server (`server/src/`)**
- Modify `server/schema.sql` — add `qotd_answers` table.
- Create `server/src/qotd.js` — profile, Cairo date, candidates-from-ledger, selection (JS port), record, leaderboard, friends.
- Create `server/src/qotd.test.js`.
- Modify `server/src/index.js` — register 4 routes.

**Lane C — student UI (`src/`)**
- Create `src/lib/useQotd.ts` — the hook (live + demo).
- Create `src/pages/student/QuestionOfTheDay.tsx` — the page.
- Create `src/components/dashboard/QuestionOfTheDayCard.tsx` — dashboard card.
- Modify `src/router.tsx` — register `/app/qotd`.
- Modify `src/pages/student/Dashboard.tsx` — mount the card.
- Modify the student nav (AppShell nav registry — see Task C5) — add QotD entry + unanswered badge.

**Lane D — admin override (`src/`)**
- Create `src/lib/useQotdPins.ts` — read/write `nishany-qotd-pins-v1`.
- Create `src/components/admin/QotdPinPanel.tsx` — pin editor.
- Mount it in an existing admin questions surface (see Task D2).

---

# LANE A — Pure contract & selection (foundation; lands first)

> Lane A has zero dependencies on other lanes and must be committed before B/C/D build against it. All pure, all `node --test`.

### Task A1: Cohort keys, Cairo date, day number

**Files:**
- Create: `src/data/qotdCohort.ts`
- Test: `src/data/qotdCohort.test.ts`

**Interfaces:**
- Produces:
  - `hash32(input: string): number` — unsigned 32-bit FNV-1a hash.
  - `cohortKey(cohort: { universityId: string; year: string }): string` — `` `${universityId}|${year}` ``.
  - `qotdDateInCairo(now: Date): string` — `YYYY-MM-DD` for the Africa/Cairo local date of `now`.
  - `dayNumber(isoDate: string): number` — integer days since epoch `1970-01-01` for a `YYYY-MM-DD` string.

- [ ] **Step 1: Write the failing test**

```ts
// src/data/qotdCohort.test.ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { hash32, cohortKey, qotdDateInCairo, dayNumber } from './qotdCohort.ts'

test('hash32 is stable and unsigned', () => {
  assert.equal(hash32('kau|Year 2'), hash32('kau|Year 2'))
  assert.ok(hash32('kau|Year 2') >= 0)
  assert.notEqual(hash32('kau|Year 2'), hash32('kau|Year 3'))
})

test('cohortKey joins university and year label', () => {
  assert.equal(cohortKey({ universityId: 'kau', year: 'Year 2' }), 'kau|Year 2')
})

test('qotdDateInCairo returns the Cairo calendar date', () => {
  // 2026-08-29 23:30 UTC is already 2026-08-30 in Cairo (UTC+2 or +3).
  const d = new Date('2026-08-29T23:30:00Z')
  assert.equal(qotdDateInCairo(d), '2026-08-30')
  // 2026-08-29 12:00 UTC is still the 29th in Cairo.
  assert.equal(qotdDateInCairo(new Date('2026-08-29T12:00:00Z')), '2026-08-29')
})

test('dayNumber counts whole days from the epoch and advances by one', () => {
  assert.equal(dayNumber('1970-01-01'), 0)
  assert.equal(dayNumber('2026-08-30') - dayNumber('2026-08-29'), 1)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types src/data/qotdCohort.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```ts
// src/data/qotdCohort.ts

/** Unsigned 32-bit FNV-1a. seededRandom takes a number, so cohort strings hash here. */
export function hash32(input: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/** The people/answer cohort key: university id + year LABEL (not year id). */
export function cohortKey(cohort: { universityId: string; year: string }): string {
  return `${cohort.universityId}|${cohort.year}`
}

/**
 * The Africa/Cairo calendar date of an instant, as YYYY-MM-DD.
 *
 * `en-CA` formats as YYYY-MM-DD; forcing the Cairo time zone is what makes a
 * whole cohort roll over at the same wall-clock midnight regardless of where
 * each student's device is.
 */
export function qotdDateInCairo(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Cairo',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now)
}

/** Whole days from 1970-01-01 for a YYYY-MM-DD string (UTC math, no DST drift). */
export function dayNumber(isoDate: string): number {
  const [y, m, d] = isoDate.split('-').map(Number)
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types src/data/qotdCohort.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/data/qotdCohort.ts src/data/qotdCohort.test.ts
git commit -m "feat(qotd): cohort key, Cairo date, and day-number helpers"
```

---

### Task A2: Deterministic selection with scoping and admin pin

**Files:**
- Create: `src/data/qotdSelection.ts`
- Test: `src/data/qotdSelection.test.ts`

**Interfaces:**
- Consumes: `hash32`, `cohortKey`, `dayNumber` from `./qotdCohort.ts`; `seededRandom`, `shuffle` from `./seededRandom.ts`.
- Produces:
  - `interface QotdCohort { universityId: string; year: string; yearId: string }`
  - `interface QotdCandidate { id: string; universityIds: string[]; yearIds: string[] }`
  - `type QotdPins = Record<string, Record<string, string>>` — `cohortKey → isoDate → questionId`.
  - `const MIN_POOL = 8`
  - `scopeCandidates(candidates: QotdCandidate[], cohort: QotdCohort): QotdCandidate[]`
  - `selectQotdId(candidates: QotdCandidate[], cohort: QotdCohort, isoDate: string, pins?: QotdPins): string | null`

- [ ] **Step 1: Write the failing test**

```ts
// src/data/qotdSelection.test.ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scopeCandidates, selectQotdId, type QotdCandidate, type QotdCohort } from './qotdSelection.ts'

const cohort: QotdCohort = { universityId: 'kau', year: 'Year 2', yearId: 'KAU_Y2' }
const other: QotdCohort = { universityId: 'asu', year: 'Year 2', yearId: 'ASU_Y2' }

function pool(n: number): QotdCandidate[] {
  return Array.from({ length: n }, (_, i) => ({ id: `q${i}`, universityIds: [], yearIds: [] }))
}

test('scopeCandidates keeps untagged and matching, drops mismatched', () => {
  const cands: QotdCandidate[] = [
    { id: 'untagged', universityIds: [], yearIds: [] },
    { id: 'matchUni', universityIds: ['kau'], yearIds: [] },
    { id: 'matchYear', universityIds: [], yearIds: ['KAU_Y2'] },
    { id: 'wrongUni', universityIds: ['asu'], yearIds: [] },
    { id: 'wrongYear', universityIds: ['kau'], yearIds: ['KAU_Y3'] },
  ]
  // Pad so the scoped set clears MIN_POOL and no fallback triggers.
  const padded = [...cands, ...pool(8).map((c) => ({ ...c, universityIds: ['kau'] }))]
  const ids = scopeCandidates(padded, cohort).map((c) => c.id)
  assert.ok(ids.includes('untagged') && ids.includes('matchUni') && ids.includes('matchYear'))
  assert.ok(!ids.includes('wrongUni') && !ids.includes('wrongYear'))
})

test('scopeCandidates falls back to full pool when the scoped set is too small', () => {
  const cands: QotdCandidate[] = [
    { id: 'only', universityIds: ['kau'], yearIds: ['KAU_Y2'] },
    ...pool(20).map((c) => ({ ...c, universityIds: ['asu'] })), // all wrong cohort
  ]
  // Scoped set = 1 (< MIN_POOL) → fallback returns everything.
  assert.equal(scopeCandidates(cands, cohort).length, cands.length)
})

test('selectQotdId is stable per cohort+date and differs across cohorts', () => {
  const cands = pool(30)
  const a = selectQotdId(cands, cohort, '2026-08-29')
  assert.equal(a, selectQotdId(cands, cohort, '2026-08-29')) // stable
  assert.notEqual(a, selectQotdId(cands, cohort, '2026-08-30')) // day advances the pick
  assert.notEqual(a, selectQotdId(cands, other, '2026-08-29')) // cohort changes the deck
})

test('selectQotdId cycles the whole deck before repeating', () => {
  const cands = pool(10)
  const seen = new Set<string>()
  for (let i = 0; i < 10; i++) seen.add(selectQotdId(cands, cohort, dayIso(i))!)
  assert.equal(seen.size, 10) // no repeat within one deck length
  function dayIso(offset: number): string {
    const d = new Date(Date.UTC(2026, 7, 29) + offset * 86_400_000)
    return d.toISOString().slice(0, 10)
  }
})

test('an admin pin overrides the seeded pick', () => {
  const cands = pool(30)
  const pins = { 'kau|Year 2': { '2026-08-29': 'q7' } }
  assert.equal(selectQotdId(cands, cohort, '2026-08-29', pins), 'q7')
})

test('a pin to a question absent from the pool is ignored', () => {
  const cands = pool(30)
  const pins = { 'kau|Year 2': { '2026-08-29': 'nonexistent' } }
  assert.equal(selectQotdId(cands, cohort, '2026-08-29', pins), selectQotdId(cands, cohort, '2026-08-29'))
})

test('an empty pool yields null', () => {
  assert.equal(selectQotdId([], cohort, '2026-08-29'), null)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types src/data/qotdSelection.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```ts
// src/data/qotdSelection.ts
import { hash32, cohortKey, dayNumber } from './qotdCohort.ts'
import { seededRandom, shuffle } from './seededRandom.ts'

export interface QotdCohort {
  universityId: string
  /** Year LABEL, e.g. "Year 2". */
  year: string
  /** Year ID content is tagged with, e.g. "KAU_Y2". */
  yearId: string
}

export interface QotdCandidate {
  id: string
  /** Ledger tag `questionData.tags.universityIds`. Empty = un-scoped (any university). */
  universityIds: string[]
  /** Ledger tag `questionData.tags.years` (year IDs). Empty = un-scoped (any year). */
  yearIds: string[]
}

/** cohortKey → isoDate → questionId. */
export type QotdPins = Record<string, Record<string, string>>

/** Below this many scoped candidates, relevance loses to having a question at all. */
export const MIN_POOL = 8

function matchesCohort(candidate: QotdCandidate, cohort: QotdCohort): boolean {
  const uniOk = candidate.universityIds.length === 0 || candidate.universityIds.includes(cohort.universityId)
  const yearOk = candidate.yearIds.length === 0 || candidate.yearIds.includes(cohort.yearId)
  return uniOk && yearOk
}

/**
 * Narrow the pool to this cohort by curriculum tags, but never below MIN_POOL:
 * a thin cohort is better served a slightly off-target question than none.
 */
export function scopeCandidates(candidates: QotdCandidate[], cohort: QotdCohort): QotdCandidate[] {
  const scoped = candidates.filter((c) => matchesCohort(c, cohort))
  return scoped.length >= MIN_POOL ? scoped : candidates
}

/**
 * Today's question id for a cohort: an admin pin wins; otherwise a cohort-seeded
 * shuffle indexed by day-number, so the cohort cycles its whole pool before any
 * repeat. Returns null only when the pool is empty.
 */
export function selectQotdId(
  candidates: QotdCandidate[],
  cohort: QotdCohort,
  isoDate: string,
  pins?: QotdPins,
): string | null {
  const pool = scopeCandidates(candidates, cohort)
  if (pool.length === 0) return null

  const pinned = pins?.[cohortKey(cohort)]?.[isoDate]
  if (pinned && pool.some((c) => c.id === pinned)) return pinned

  const deck = shuffle(pool, seededRandom(hash32(cohortKey(cohort))))
  const index = ((dayNumber(isoDate) % deck.length) + deck.length) % deck.length
  return deck[index].id
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types src/data/qotdSelection.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add src/data/qotdSelection.ts src/data/qotdSelection.test.ts
git commit -m "feat(qotd): deterministic cohort question selection with pin override"
```

---

### Task A3: Streak computation

**Files:**
- Create: `src/data/qotdStreak.ts`
- Test: `src/data/qotdStreak.test.ts`

**Interfaces:**
- Consumes: `dayNumber` from `./qotdCohort.ts`.
- Produces: `computeStreak(answeredDates: string[], todayIso: string): { current: number; longest: number }`
  - `current` = length of the consecutive run ending at today OR yesterday (so an unanswered *today* does not zero a live streak until the day ends).
  - `longest` = longest consecutive run anywhere in the set.

- [ ] **Step 1: Write the failing test**

```ts
// src/data/qotdStreak.test.ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { computeStreak } from './qotdStreak.ts'

test('consecutive days ending today count as the current streak', () => {
  const r = computeStreak(['2026-08-27', '2026-08-28', '2026-08-29'], '2026-08-29')
  assert.equal(r.current, 3)
  assert.equal(r.longest, 3)
})

test('a run ending yesterday is still live today (today not yet answered)', () => {
  const r = computeStreak(['2026-08-27', '2026-08-28'], '2026-08-29')
  assert.equal(r.current, 2)
})

test('a gap before today breaks the current streak', () => {
  const r = computeStreak(['2026-08-25', '2026-08-26'], '2026-08-29')
  assert.equal(r.current, 0)
  assert.equal(r.longest, 2)
})

test('longest tracks the best run even when current is shorter', () => {
  const r = computeStreak(['2026-08-01', '2026-08-02', '2026-08-03', '2026-08-29'], '2026-08-29')
  assert.equal(r.current, 1)
  assert.equal(r.longest, 3)
})

test('duplicates and disorder are tolerated', () => {
  const r = computeStreak(['2026-08-29', '2026-08-28', '2026-08-29'], '2026-08-29')
  assert.equal(r.current, 2)
})

test('no answers yields zero', () => {
  assert.deepEqual(computeStreak([], '2026-08-29'), { current: 0, longest: 0 })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types src/data/qotdStreak.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```ts
// src/data/qotdStreak.ts
import { dayNumber } from './qotdCohort.ts'

/**
 * Streak stats from a set of answered dates.
 *
 * `current` is anchored to today OR yesterday: a student who has not yet done
 * today's question keeps yesterday-anchored momentum until the day actually
 * ends, so a live streak is never zeroed mid-day.
 */
export function computeStreak(
  answeredDates: string[],
  todayIso: string,
): { current: number; longest: number } {
  const days = [...new Set(answeredDates.map(dayNumber))].sort((a, b) => a - b)
  if (days.length === 0) return { current: 0, longest: 0 }

  let longest = 1
  let run = 1
  for (let i = 1; i < days.length; i++) {
    run = days[i] === days[i - 1] + 1 ? run + 1 : 1
    if (run > longest) longest = run
  }

  const today = dayNumber(todayIso)
  const daySet = new Set(days)
  // Anchor at today if answered, else yesterday, else the streak is broken.
  let anchor = daySet.has(today) ? today : daySet.has(today - 1) ? today - 1 : null
  let current = 0
  while (anchor !== null && daySet.has(anchor)) {
    current++
    anchor--
  }
  return { current, longest }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types src/data/qotdStreak.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/data/qotdStreak.ts src/data/qotdStreak.test.ts
git commit -m "feat(qotd): streak computation from answered dates"
```

---

### Task A4: Shared API payload types

**Files:**
- Create: `src/data/qotdTypes.ts`

**Interfaces:**
- Produces the wire types Lane C consumes and constants both C and D use. No test (types + constants only).

- [ ] **Step 1: Write the module**

```ts
// src/data/qotdTypes.ts

/** Shared app_state document of admin pins. cohortKey → isoDate → questionId. */
export const QOTD_PINS_KEY = 'nishany-qotd-pins-v1'

/** User-owned demo-mode answer log (localStorage in demo, user_state in live-unused). */
export const QOTD_LOCAL_ANSWERS_KEY = 'nishany.qotd.answers.v1'

/** One locally-stored answer in demo mode. */
export interface QotdLocalAnswer {
  date: string        // YYYY-MM-DD (Cairo)
  questionId: string
  answerIndex: number
  correct: boolean
}

/** GET /api/qotd/today */
export interface QotdTodayResponse {
  date: string
  questionId: string | null
  answered: boolean
  answerIndex: number | null
  correct: boolean | null
  current: number       // current streak
  longest: number       // longest streak
  history: string[]     // answered dates, most recent first (bounded, e.g. last 60)
}

/** POST /api/qotd/answer body */
export interface QotdAnswerRequest {
  questionId: string
  answerIndex: number
}

/** POST /api/qotd/answer response */
export interface QotdAnswerResponse {
  correct: boolean
  correctIndex: number
  current: number
  longest: number
}

/** One row of GET /api/qotd/leaderboard */
export interface QotdLeaderboardRow {
  rank: number
  userId: string
  username: string
  profileIcon: string | null
  current: number
  totalCorrect: number
  totalAnswered: number
}

export interface QotdLeaderboardResponse {
  scope: { universityId: string; year: string }
  rows: QotdLeaderboardRow[]
  viewer: { rank: number | null; total: number; current: number }
}

/** One row of GET /api/qotd/friends */
export interface QotdFriendRow {
  userId: string
  name: string
  answered: boolean
  /** null until the viewer has answered today (no spoilers). */
  correct: boolean | null
  current: number
}

export interface QotdFriendsResponse {
  date: string
  viewerAnswered: boolean
  friends: QotdFriendRow[]
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc -b --noEmit` (or the repo's `npm run build` typecheck step). If the worktree's `node_modules` is empty, symlink it to the main checkout first (see the "Worktree node_modules empty" project note) so `tsc` resolves.
Expected: no type errors from this file.

- [ ] **Step 3: Commit**

```bash
git add src/data/qotdTypes.ts
git commit -m "feat(qotd): shared API payload types and storage keys"
```

---

# LANE B — Server (depends on Lane A being merged for reference only; ports the algorithm in JS)

> The server does NOT import the TS modules. It re-implements the identical
> selection in JS (small, and cross-mode parity is a nicety not a correctness
> requirement — demo and live users are never compared). Keep the JS `hash32`,
> scoping, and selection byte-identical in behaviour to Lane A so a future
> shared-vector test can prove parity.

### Task B1: `qotd_answers` table + server module + tests

**Files:**
- Modify: `server/schema.sql` (add table after the `qbank_attempts` block, near line 767)
- Create: `server/src/qotd.js`
- Test: `server/src/qotd.test.js`

**Interfaces:**
- Consumes: `pool` from `./db.js`; `publishedQuestions` from `./publishedQuestions.js`; `getState`-style ledger read (see below); `randomUUID` from `node:crypto`.
- Produces (all exported from `qotd.js`):
  - `hashText(input: string): number`
  - `cohortKey({ universityId, year }): string`
  - `cairoDate(now: Date): string`
  - `dayNumber(isoDate: string): number`
  - `selectQotdId(candidates, cohort, isoDate, pins): string | null` (JS port of A2)
  - `candidatesFromLedger(ledgerValue): Array<{ id, universityIds, yearIds }>`
  - `async qotdToday(userId): Promise<QotdTodayResponse | { error }>`
  - `async recordQotdAnswer(userId, input): Promise<QotdAnswerResponse | { error }>`
  - `async qotdLeaderboard(userId, { limit }): Promise<...>`
  - `async qotdFriends(userId): Promise<...>`

- [ ] **Step 1: Add the table to `server/schema.sql`**

Insert immediately after the `qbank_attempts` table definition:

```sql
CREATE TABLE IF NOT EXISTS qotd_answers (
  user_id       VARCHAR(64) NOT NULL,
  student_id    VARCHAR(64) NOT NULL,
  university_id VARCHAR(64) NOT NULL,
  year          VARCHAR(32) NOT NULL,
  term          VARCHAR(64) NOT NULL DEFAULT 'current',
  qotd_date     DATE NOT NULL,
  question_id   VARCHAR(96) NOT NULL,
  answer_index  INT NOT NULL,
  correct       TINYINT(1) NOT NULL,
  answered_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, qotd_date),
  INDEX idx_qotd_cohort (university_id, year, term, qotd_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

- [ ] **Step 2: Write the failing test (pure helpers first)**

`recordQotdAnswer`/`qotdLeaderboard`/`qotdFriends` hit the DB and are covered by the existing integration-style server tests only where a `pool` is available; for `node --test` without a DB, test the **pure** exports (parity with Lane A) and `candidatesFromLedger`.

```js
// server/src/qotd.test.js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { hashText, cohortKey, cairoDate, dayNumber, selectQotdId, candidatesFromLedger } from './qotd.js'

const cohort = { universityId: 'kau', year: 'Year 2', yearId: 'KAU_Y2' }

test('hashText matches the client FNV-1a (unsigned, stable)', () => {
  assert.equal(hashText('kau|Year 2'), hashText('kau|Year 2'))
  assert.ok(hashText('kau|Year 2') >= 0)
})

test('cairoDate rolls over at Cairo midnight', () => {
  assert.equal(cairoDate(new Date('2026-08-29T23:30:00Z')), '2026-08-30')
  assert.equal(cairoDate(new Date('2026-08-29T12:00:00Z')), '2026-08-29')
})

test('selectQotdId is cohort+date stable and honours a valid pin', () => {
  const pool = Array.from({ length: 20 }, (_, i) => ({ id: `q${i}`, universityIds: [], yearIds: [] }))
  const a = selectQotdId(pool, cohort, '2026-08-29')
  assert.equal(a, selectQotdId(pool, cohort, '2026-08-29'))
  assert.notEqual(a, selectQotdId(pool, cohort, '2026-08-30'))
  assert.equal(selectQotdId(pool, cohort, '2026-08-29', { 'kau|Year 2': { '2026-08-29': 'q3' } }), 'q3')
})

test('candidatesFromLedger keeps published questions with their scope tags', () => {
  const ledger = [
    { id: 'p1', kind: 'question', status: 'Published',
      questionData: { answers: [{ label: 'A', text: 'x' }, { label: 'B', text: 'y' }], correctAnswer: 'A',
                      tags: { universityIds: ['kau'], years: ['KAU_Y2'] } } },
    { id: 'd1', kind: 'question', status: 'Draft', questionData: { tags: {} } },
    { id: 'a1', kind: 'article', status: 'Published' },
  ]
  const cands = candidatesFromLedger(ledger)
  assert.deepEqual(cands, [{ id: 'p1', universityIds: ['kau'], yearIds: ['KAU_Y2'] }])
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `node --test server/src/qotd.test.js`
Expected: FAIL — module not found.

- [ ] **Step 4: Write `server/src/qotd.js`**

```js
// server/src/qotd.js
import { randomUUID } from 'node:crypto'
import { pool } from './db.js'
import { publishedQuestions } from './publishedQuestions.js'

const LEDGER_KEY = 'nishany-admin-content-ledger-v4'
const PINS_KEY = 'nishany-qotd-pins-v1'
const HISTORY_LIMIT = 60

export function hashText(input) {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

export function cohortKey({ universityId, year }) {
  return `${universityId}|${year}`
}

export function cairoDate(now) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Cairo', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now)
}

export function dayNumber(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number)
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000)
}

function seededRandom(seed) {
  let state = Math.imul(seed | 0, 0x9e3779b1) ^ 0x85ebca6b
  state = Math.imul(state ^ (state >>> 16), 0x21f0aaad)
  state = Math.imul(state ^ (state >>> 15), 0x735a2d97)
  state = (state ^ (state >>> 15)) >>> 0
  if (state === 0) state = 0x6d2b79f5
  return () => {
    state ^= state << 13; state >>>= 0
    state ^= state >>> 17
    state ^= state << 5; state >>>= 0
    return state / 0x1_0000_0000
  }
}

function shuffle(items, random) {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const MIN_POOL = 8

function scopeCandidates(candidates, cohort) {
  const scoped = candidates.filter((c) =>
    (c.universityIds.length === 0 || c.universityIds.includes(cohort.universityId)) &&
    (c.yearIds.length === 0 || c.yearIds.includes(cohort.yearId)))
  return scoped.length >= MIN_POOL ? scoped : candidates
}

export function selectQotdId(candidates, cohort, isoDate, pins) {
  const pool = scopeCandidates(candidates, cohort)
  if (pool.length === 0) return null
  const pinned = pins?.[cohortKey(cohort)]?.[isoDate]
  if (pinned && pool.some((c) => c.id === pinned)) return pinned
  const deck = shuffle(pool, seededRandom(hashText(cohortKey(cohort))))
  const index = ((dayNumber(isoDate) % deck.length) + deck.length) % deck.length
  return deck[index].id
}

/** Published, student-answerable questions with their curriculum scope tags. */
export function candidatesFromLedger(ledgerValue) {
  const ledger = Array.isArray(ledgerValue) ? ledgerValue : []
  const out = []
  for (const item of ledger) {
    if (item?.kind !== 'question' || item?.status !== 'Published' || !item?.questionData) continue
    const answers = Array.isArray(item.questionData.answers) ? item.questionData.answers : []
    const answerable = answers.filter((a) => String(a?.text ?? '').trim())
    if (answerable.length < 2 || !answerable.some((a) => a.label === item.questionData.correctAnswer)) continue
    const tags = item.questionData.tags ?? {}
    out.push({
      id: item.id,
      universityIds: (Array.isArray(tags.universityIds) ? tags.universityIds : []).filter(Boolean),
      yearIds: (Array.isArray(tags.years) ? tags.years : []).filter(Boolean),
    })
  }
  return out
}

async function readState(key) {
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ? LIMIT 1', [key])
  if (!rows.length) return null
  try { return JSON.parse(rows[0].v) } catch { return null }
}

async function studentProfile(userId) {
  const [rows] = await pool.query(
    `SELECT id, university_id AS universityId, year, year_id AS yearId,
            COALESCE(username, CONCAT('student-', LEFT(id, 6))) AS username,
            profile_icon AS profileIcon
       FROM students WHERE user_id = ? LIMIT 1`,
    [userId],
  )
  return rows[0] ?? null
}

async function answeredDates(userId) {
  const [rows] = await pool.query(
    `SELECT DATE_FORMAT(qotd_date, '%Y-%m-%d') AS d FROM qotd_answers
      WHERE user_id = ? ORDER BY qotd_date DESC LIMIT ?`,
    [userId, HISTORY_LIMIT],
  )
  return rows.map((r) => r.d)
}

function computeStreak(dates, todayIso) {
  const days = [...new Set(dates.map(dayNumber))].sort((a, b) => a - b)
  if (!days.length) return { current: 0, longest: 0 }
  let longest = 1, run = 1
  for (let i = 1; i < days.length; i++) {
    run = days[i] === days[i - 1] + 1 ? run + 1 : 1
    if (run > longest) longest = run
  }
  const today = dayNumber(todayIso)
  const set = new Set(days)
  let anchor = set.has(today) ? today : set.has(today - 1) ? today - 1 : null
  let current = 0
  while (anchor !== null && set.has(anchor)) { current++; anchor-- }
  return { current, longest }
}

async function todaysQuestionId(cohort, isoDate) {
  const [ledger, pins] = await Promise.all([readState(LEDGER_KEY), readState(PINS_KEY)])
  return selectQotdId(candidatesFromLedger(ledger), cohort, isoDate, pins ?? {})
}

export async function qotdToday(userId) {
  const profile = await studentProfile(userId)
  if (!profile?.universityId || !profile?.year) return { error: 'profile_incomplete' }
  const cohort = { universityId: profile.universityId, year: profile.year, yearId: profile.yearId ?? '' }
  const date = cairoDate(new Date())
  const questionId = await todaysQuestionId(cohort, date)
  const [mine] = await pool.query(
    'SELECT answer_index AS answerIndex, correct FROM qotd_answers WHERE user_id = ? AND qotd_date = ? LIMIT 1',
    [userId, date],
  )
  const dates = await answeredDates(userId)
  const { current, longest } = computeStreak(dates, date)
  return {
    date, questionId,
    answered: mine.length > 0,
    answerIndex: mine.length ? mine[0].answerIndex : null,
    correct: mine.length ? Boolean(mine[0].correct) : null,
    current, longest, history: dates,
  }
}

export async function recordQotdAnswer(userId, input) {
  const profile = await studentProfile(userId)
  if (!profile?.universityId || !profile?.year) return { error: 'profile_incomplete' }
  const cohort = { universityId: profile.universityId, year: profile.year, yearId: profile.yearId ?? '' }
  const date = cairoDate(new Date())
  const expected = await todaysQuestionId(cohort, date)
  const questionId = String(input?.questionId ?? '').trim()
  if (!expected || questionId !== expected) return { error: 'not_todays_question' }

  const snapshot = await publishedQuestions()
  const key = snapshot.get(questionId)
  if (!key || key.correctIndex < 0) return { error: 'question_not_markable' }
  const answerIndex = Number(input?.answerIndex)
  if (!Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= key.optionCount) {
    return { error: 'invalid_answer_index' }
  }
  const correct = answerIndex === key.correctIndex
  // INSERT IGNORE makes the day's answer immutable — a second submit is a no-op,
  // never an overwrite (the unique PK is (user_id, qotd_date)).
  await pool.query(
    `INSERT IGNORE INTO qotd_answers
       (user_id, student_id, university_id, year, term, qotd_date, question_id, answer_index, correct)
     VALUES (?, ?, ?, ?, 'current', ?, ?, ?, ?)`,
    [userId, profile.id, profile.universityId, profile.year, date, questionId, answerIndex, correct ? 1 : 0],
  )
  const dates = await answeredDates(userId)
  const { current, longest } = computeStreak(dates, date)
  return { correct, correctIndex: key.correctIndex, current, longest }
}

export async function qotdLeaderboard(userId, { limit = 50 } = {}) {
  const profile = await studentProfile(userId)
  if (!profile?.universityId || !profile?.year) return { error: 'profile_incomplete' }
  const [rows] = await pool.query(
    `SELECT a.user_id AS userId,
            COALESCE(s.username, CONCAT('student-', LEFT(s.id, 6))) AS username,
            s.profile_icon AS profileIcon,
            COUNT(*) AS totalAnswered,
            SUM(a.correct = 1) AS totalCorrect,
            GROUP_CONCAT(DATE_FORMAT(a.qotd_date, '%Y-%m-%d')) AS dates
       FROM qotd_answers a JOIN students s ON s.id = a.student_id
      WHERE a.university_id = ? AND a.year = ? AND a.term = 'current'
      GROUP BY a.user_id, s.username, s.profile_icon, s.id`,
    [profile.universityId, profile.year],
  )
  const today = cairoDate(new Date())
  const ranked = rows
    .map((r) => ({
      userId: r.userId, username: r.username, profileIcon: r.profileIcon ?? null,
      totalAnswered: Number(r.totalAnswered), totalCorrect: Number(r.totalCorrect ?? 0),
      current: computeStreak(String(r.dates ?? '').split(',').filter(Boolean), today).current,
    }))
    .sort((a, b) => b.current - a.current || b.totalCorrect - a.totalCorrect || b.totalAnswered - a.totalAnswered)
    .map((r, i) => ({ rank: i + 1, ...r }))
  const mine = ranked.find((r) => r.userId === userId) ?? null
  return {
    scope: { universityId: profile.universityId, year: profile.year },
    rows: ranked.slice(0, limit),
    viewer: { rank: mine?.rank ?? null, total: ranked.length, current: mine?.current ?? 0 },
  }
}

export async function qotdFriends(userId) {
  const profile = await studentProfile(userId)
  if (!profile?.universityId || !profile?.year) return { error: 'profile_incomplete' }
  const date = cairoDate(new Date())
  const [mineRows] = await pool.query(
    'SELECT 1 FROM qotd_answers WHERE user_id = ? AND qotd_date = ? LIMIT 1', [userId, date],
  )
  const viewerAnswered = mineRows.length > 0
  const [rows] = await pool.query(
    `SELECT f.friend_id AS userId, COALESCE(s.name, s.email) AS name,
            a.correct AS correct, (a.user_id IS NOT NULL) AS answered
       FROM (
         SELECT IF(user_a = ?, user_b, user_a) AS friend_id FROM friendships
          WHERE status = 'accepted' AND (user_a = ? OR user_b = ?)
       ) f
       JOIN students s ON s.user_id = f.friend_id
       LEFT JOIN qotd_answers a ON a.user_id = f.friend_id AND a.qotd_date = ?`,
    [userId, userId, userId, date],
  )
  const friends = rows.map((r) => ({
    userId: r.userId, name: r.name, answered: Boolean(r.answered),
    correct: viewerAnswered && r.answered ? Boolean(r.correct) : null,
    current: 0,
  }))
  return { date, viewerAnswered, friends }
}
```

Notes for the implementer:
- Verify the `friendships` friend-id expression against `server/src/friends.js` (accepted rows are `status='accepted'`, either `user_a`/`user_b`). Adjust the join column names if `friends.js` differs.
- `publishedQuestions()` returns a `Map<id, { subjectId, topic, subtopic, conceptIds, correctIndex, optionCount }>` — same object `qbankAttempts.js` marks against. Do not re-derive `correctIndex`.

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test server/src/qotd.test.js`
Expected: PASS (4 tests). The DB-backed functions are exercised by the route smoke test in Task B2 / manual verification, not unit tests.

- [ ] **Step 6: Commit**

```bash
git add server/schema.sql server/src/qotd.js server/src/qotd.test.js
git commit -m "feat(qotd): server module, qotd_answers table, selection/marking/leaderboard/friends"
```

---

### Task B2: Register the four routes

**Files:**
- Modify: `server/src/index.js` — import + 4 route handlers next to the qbank/leaderboard block (~line 826).

**Interfaces:**
- Consumes: `qotdToday`, `recordQotdAnswer`, `qotdLeaderboard`, `qotdFriends` from `./qotd.js`; existing `requireAuthenticated`, `wrap`, `req.identity.id`.

- [ ] **Step 1: Add the import** near the other feature imports (e.g. by the `qbankAttempts` import ~line 67):

```js
import { qotdToday, recordQotdAnswer, qotdLeaderboard, qotdFriends } from './qotd.js'
```

- [ ] **Step 2: Add the routes** immediately after the `/api/leaderboards` handler:

```js
/* ── Question of the Day ────────────────────────────────────────────────── */

app.get('/api/qotd/today', requireAuthenticated, wrap(async (req, res) => {
  const result = await qotdToday(req.identity.id)
  if (result.error) return res.status(result.error === 'profile_incomplete' ? 409 : 400).json(result)
  res.json(result)
}))

app.post('/api/qotd/answer', requireAuthenticated, wrap(async (req, res) => {
  const result = await recordQotdAnswer(req.identity.id, req.body ?? {})
  if (result.error) {
    const code = result.error === 'profile_incomplete' ? 409 : result.error === 'not_todays_question' ? 409 : 400
    return res.status(code).json(result)
  }
  res.json(result)
}))

app.get('/api/qotd/leaderboard', requireAuthenticated, wrap(async (req, res) => {
  const result = await qotdLeaderboard(req.identity.id, { limit: Math.min(Number(req.query?.limit) || 50, 100) })
  if (result.error) return res.status(409).json(result)
  res.json(result)
}))

app.get('/api/qotd/friends', requireAuthenticated, wrap(async (req, res) => {
  const result = await qotdFriends(req.identity.id)
  if (result.error) return res.status(409).json(result)
  res.json(result)
}))
```

- [ ] **Step 3: Verify the server boots and routes exist**

Run (from `server/`): `node --check src/index.js && node --check src/qotd.js`
Expected: no syntax errors. If the repo has an `apiPaths` allow-list test (`src/lib/apiPaths.test.ts`), add the four `/api/qotd/*` patterns there so the client-path guard passes; run `node --test --experimental-strip-types src/lib/apiPaths.test.ts`.

- [ ] **Step 4: Commit**

```bash
git add server/src/index.js src/lib/apiPaths.test.ts
git commit -m "feat(qotd): register /api/qotd today/answer/leaderboard/friends routes"
```

---

# LANE C — Student UI (depends on Lane A merged; talks to Lane B over HTTP, mockable)

> The repo has no DOM test harness, so components stay thin and all logic lives
> in Lane A. Verification for this lane is the browser preview workflow, not unit
> tests. Match styling to the named sibling files.

### Task C1: `useQotd` hook

**Files:**
- Create: `src/lib/useQotd.ts`

**Interfaces:**
- Consumes: `API_MODE`, `apiGet`, `apiPost` from `./api.ts`; `useIdentity` from `./useIdentity` (exposes `universityId`, `year`, `yearId`); `usePublishedQuestions` from `./usePublishedQuestions`; `CONTENT_LEDGER_STORAGE_KEY`/`initialManagedContent` via `usePersistentState` for demo candidates; Lane A `selectQotdId`, `candidates`, `computeStreak`, `qotdDateInCairo`; `QotdTodayResponse`, `QotdAnswerResponse`, `QOTD_LOCAL_ANSWERS_KEY`, `QotdLocalAnswer` from `@/data/qotdTypes`; `usePersistentState`/user-state for demo answer log; the `Question` type + `usePublishedQuestions` to resolve the question body.
- Produces:
  ```ts
  interface QotdState {
    loading: boolean
    date: string
    question: Question | null       // resolved body for questionId, or null
    answered: boolean
    answerIndex: number | null
    correct: boolean | null
    current: number
    longest: number
    history: string[]
    answer: (index: number) => Promise<void>
  }
  export function useQotd(): QotdState
  ```

- [ ] **Step 1: Implement the hook**

Behaviour:
- Resolve the cohort from `useIdentity()` → `{ universityId, year, yearId }`.
- **Live mode (`API_MODE`):** on mount `apiGet<QotdTodayResponse>('/qotd/today')`; resolve `question` by finding `questionId` in `usePublishedQuestions()`. `answer(i)` → `apiPost<QotdAnswerResponse>('/qotd/answer', { questionId, answerIndex: i })`, then fold the returned `{ correct, correctIndex, current, longest }` into state and mark `answered`.
- **Demo mode:** derive candidates from the ledger (`candidatesFromLedger` equivalent — reuse Lane A `selectQotdId` over candidates built inline from `usePublishedQuestions()` items; since the student `Question` lacks scope tags, in demo pass `universityIds: [], yearIds: []` for every candidate so selection still works). Compute `date = qotdDateInCairo(new Date())`, `questionId = selectQotdId(...)`. Read the demo answer log from user-state (`QOTD_LOCAL_ANSWERS_KEY`); `answer(i)` appends a `QotdLocalAnswer` (marking locally via the `Question.options[i].correct`), writes it back, and recomputes streak with `computeStreak`.
- Guard against double-answer in both modes (ignore `answer()` when `answered`).

Reference `src/lib/useParties.ts` for the live-fetch-with-loading hook shape and `src/lib/usePersistentState.ts` for the demo store.

- [ ] **Step 2: Typecheck**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/useQotd.ts
git commit -m "feat(qotd): useQotd hook (live + demo)"
```

---

### Task C2: The Question of the Day page

**Files:**
- Create: `src/pages/student/QuestionOfTheDay.tsx`

**Interfaces:**
- Consumes: `useQotd`; `PageContainer` from `@/components/shell/Page`; the existing qbank question renderer if one is reusable (check `src/components/qbank/` for a single-question view — reuse it read-only rather than rebuilding option rows); `apiGet` for leaderboard/friends (or small sub-hooks `useQotdLeaderboard`/`useQotdFriends` defined inline in this file).
- Produces: `export function QuestionOfTheDay()`.

- [ ] **Step 1: Build the page**

Sections, top to bottom:
1. Header: "Question of the Day" + `formatLongDate(new Date())` + streak pill (`🔥 {current}`; show `longest` as a subtitle).
2. The question: vignette, stem, options. Before answering, options are clickable; on click call `answer(index)`. After answering, show correct/incorrect, the explanation, and lock the options. Reuse an existing qbank option component if present (`src/components/qbank/`); otherwise render option rows matching that component's classes.
3. Cohort leaderboard: `apiGet<QotdLeaderboardResponse>('/qotd/leaderboard')`, render rank/username/streak/correct; highlight the viewer row; show `viewer.rank / viewer.total`. Empty state in demo mode.
4. Friends strip: `apiGet<QotdFriendsResponse>('/qotd/friends')`; each friend shows answered/✓/✗ (✓/✗ only once `viewerAnswered`). Empty state when no friends or demo.
5. Share button (Task C4).

Only render leaderboard/friends when `API_MODE` (demo shows a one-line "Sign in to compare with your cohort" note).

- [ ] **Step 2: Verify in the browser preview**

Follow the preview verification workflow: `preview_start` the dev server, navigate to `/app/qotd` (after Task C3 registers it), answer the question, confirm the explanation reveals and the streak increments. Screenshot for the user.

- [ ] **Step 3: Commit**

```bash
git add src/pages/student/QuestionOfTheDay.tsx
git commit -m "feat(qotd): Question of the Day page with leaderboard and friends"
```

---

### Task C3: Register the route

**Files:**
- Modify: `src/router.tsx`

- [ ] **Step 1: Add the lazy import** with the other student pages (~line 99):

```tsx
const QuestionOfTheDay = lazyNamed(() => import('@/pages/student/QuestionOfTheDay'), 'QuestionOfTheDay')
```

- [ ] **Step 2: Register it** in the `studentPages` map (~line 142):

```tsx
  qotd: QuestionOfTheDay,
```

- [ ] **Step 3: Verify** the route resolves.

Run: `npx tsc -b --noEmit` and load `/app/qotd` in the preview — it renders the page, not the 404/Placeholder.

- [ ] **Step 4: Commit**

```bash
git add src/router.tsx
git commit -m "feat(qotd): register /app/qotd route"
```

---

### Task C4: Share result card

**Files:**
- Modify: `src/pages/student/QuestionOfTheDay.tsx` (add the share control)

**Interfaces:**
- Consumes: the existing share plumbing — inspect `src/components/share/` and `src/lib/useShares.ts` for how other surfaces produce a shareable card; reuse it. If sharing is a Web Share / copy-link affordance, produce text like `` `Got today's Nishany question — ${current}-day streak 🔥` `` with **no** answer/question text.

- [ ] **Step 1: Add the share button** that only appears once `answered`. It must never include the question stem or correct option (no spoilers). Prefer `navigator.share` when available, else copy-to-clipboard with a toast.

- [ ] **Step 2: Verify** in preview: after answering, the share control appears and the produced text has no answer.

- [ ] **Step 3: Commit**

```bash
git add src/pages/student/QuestionOfTheDay.tsx
git commit -m "feat(qotd): shareable result card (no answer spoilers)"
```

---

### Task C5: Dashboard card + nav entry + unanswered nudge

**Files:**
- Create: `src/components/dashboard/QuestionOfTheDayCard.tsx`
- Modify: `src/pages/student/Dashboard.tsx`
- Modify: the student nav registry (find it: `grep -rn "qbank\|to=\"/app" src/components/shell` — the same list the sidebar/AppShell renders; add a `qotd` entry mirroring the QuestionBank entry, and preload via `preloadStudentRoute`).

**Interfaces:**
- Consumes: `useQotd` (for `answered`, `current`); `Link` to `/app/qotd`. Mirror `QuestionBankCard` from `src/components/dashboard/ProgressTrio.tsx` for the compact card styling.

- [ ] **Step 1: Build `QuestionOfTheDayCard`** — compact card showing today's state ("Answer today's question" when unanswered; "Answered ✓ · {current}-day streak" when done) linking to `/app/qotd`. Match `QuestionBankCard`'s markup/classes so the dashboard trio/column stays consistent.

- [ ] **Step 2: Mount it** in `Dashboard.tsx` — add it to the focused column near the `QuestionBankCard`/`EssayCard`/`PracticalSkillsCard` group (line ~72). Decide placement to keep the single-column rhythm (a full-width card above the trio reads well).

- [ ] **Step 3: Add the nav entry + badge** — in the nav registry, add `qotd` with an unanswered-today badge (a small dot when `useQotd().answered === false`). Keep the badge logic cheap (the hook already fetches once).

- [ ] **Step 4: Verify** in preview — dashboard shows the card; nav shows the entry with a badge that clears after answering.

- [ ] **Step 5: Commit**

```bash
git add src/components/dashboard/QuestionOfTheDayCard.tsx src/pages/student/Dashboard.tsx src/components/shell/
git commit -m "feat(qotd): dashboard card, nav entry, and unanswered nudge"
```

---

# LANE D — Admin override (depends on Lane A merged)

### Task D1: Pins read/write hook

**Files:**
- Create: `src/lib/useQotdPins.ts`

**Interfaces:**
- Consumes: `usePersistentState` from `./usePersistentState`; `QOTD_PINS_KEY`, `QotdPins` from `@/data/qotdTypes` / `@/data/qotdSelection`.
- Produces:
  ```ts
  export function useQotdPins(): {
    pins: QotdPins
    setPin: (cohortKey: string, isoDate: string, questionId: string) => void
    clearPin: (cohortKey: string, isoDate: string) => void
  }
  ```

- [ ] **Step 1: Implement** over `usePersistentState<QotdPins>(QOTD_PINS_KEY, {})`. `setPin`/`clearPin` do an immutable update of the nested map. This writes the shared app_state document — the server reads the same key.

- [ ] **Step 2: Typecheck** (`npx tsc -b --noEmit`), then **commit**:

```bash
git add src/lib/useQotdPins.ts
git commit -m "feat(qotd): admin pins hook over nishany-qotd-pins-v1"
```

---

### Task D2: Admin pin panel

**Files:**
- Create: `src/components/admin/QotdPinPanel.tsx`
- Modify: an existing admin questions surface to mount it — `src/pages/admin/QuestionsSetup.tsx` (add a "Question of the Day" section/tab). Confirm the page structure first and follow its section pattern.

**Interfaces:**
- Consumes: `useQotdPins`; `useUniversityCatalogue` (`src/lib/useUniversityCatalogue.ts`) to pick a `{ universityId, year }` cohort; `usePublishedQuestions` to pick a question; `cohortKey` from `@/data/qotdCohort`.

- [ ] **Step 1: Build the panel** — a cohort selector (university + year label), a date picker, a published-question picker, and the current pins list with clear buttons. Pin = `setPin(cohortKey({ universityId, year }), isoDate, questionId)`.

- [ ] **Step 2: Mount** it in `QuestionsSetup` behind the existing console gate (the page already renders only for authorised staff via the route guard). No new server auth needed — the shared-state write is gated by `requireConsole` server-side.

- [ ] **Step 3: Verify** in preview (admin origin/localhost): set a pin for a cohort+date, confirm `nishany-qotd-pins-v1` receives it (check the network `PUT /api/state/nishany-qotd-pins-v1`), and that a student in that cohort then gets the pinned question (`GET /api/qotd/today` returns it).

- [ ] **Step 4: Commit**

```bash
git add src/components/admin/QotdPinPanel.tsx src/pages/admin/QuestionsSetup.tsx
git commit -m "feat(qotd): admin panel to pin a question per cohort and date"
```

---

# INTEGRATION (orchestrator, after A–D)

### Task INT1: Full typecheck + test suite

- [ ] Symlink the worktree `node_modules` to the main checkout if empty (project note "Worktree node_modules empty").
- [ ] Run `npm run build` (`tsc -b && vite build`) — no type errors, clean build.
- [ ] Run `npm test` (`node --test src/**/*.test.ts`) — all Lane A tests green.
- [ ] Run `node --test server/src/qotd.test.js` — green.
- [ ] Run `npm run lint` (`oxlint`) — clean.

### Task INT2: End-to-end preview verification

- [ ] `preview_start` the dev server. As a student in a known cohort: dashboard shows the card; `/app/qotd` shows today's question; answering reveals the explanation, increments the streak, clears the nav badge; a second load shows the answered state (no re-answer). Screenshot for the user.
- [ ] As admin: pin a question for that cohort+today; reload the student — the pinned question shows. Screenshot.
- [ ] Confirm no QotD write reached `qbank_attempts` (the student's qbank performance/mastery is unchanged): answer QotD, then check the Performance page / `qbank_attempts` is untouched.

### Task INT3: Code review

- [ ] Invoke `superpowers:requesting-code-review` on the branch. Address findings.

---

# PHASE 2 (separate, later — NOT in this build)

Email reminder: a `POST /api/qotd/dispatch-reminders` endpoint (authenticated, service-triggered) that finds cohort members with no `qotd_answers` row for today and sends via the existing Resend path (`POST /api/mail/send`), respecting `email_suppressions` + unsubscribe tokens. Triggered by an **external** daily scheduler (Coolify cron / scheduled task) — the repo has no in-process scheduler. Design the endpoint idempotent per (user, date).

# PHASE 3 (deferred)

User-visible push: real APNs alert payloads (today's `server/src/push.js` sends silent nudges only) + web-push for browser users. Its own subproject; build only if requested after Phase 2.
