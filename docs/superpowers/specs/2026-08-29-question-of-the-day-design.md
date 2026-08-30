# Question of the Day — Design

**Date:** 2026-08-29
**Status:** Approved design, pending spec review
**Author:** Omar (via Claude, question-of-day-feature worktree)

## 1. Summary

A daily engagement feature for the student app. Every student in a
`{ university, year }` cohort is served **one shared question per day**,
answers it inline, and sees an explanation. Answering builds a personal
**streak**, ranks the student on a **cohort leaderboard**, lets them
**compare with friends**, and produces a **shareable result card**.

The daily question is chosen **deterministically from the published pool**
(so it needs no server state and no scheduled job), with an **admin override**
to pin a specific question for a given date + cohort.

QotD is a **separate progress track**: answering it never writes to mastery,
spaced-repetition, or the normal qbank attempts ledger.

Reminders are **phased**: an in-app nudge ships in Phase 1; email and push
reminders are Phase 2 and Phase 3.

## 2. Locked decisions

| Decision | Choice |
|---|---|
| Ambition | Full engagement feature — own route `/app/qotd` + dashboard entry |
| Cohort scope | Hybrid: one question per `{ universityId, year-label }` cohort |
| Selection | Auto (deterministic, seeded) with admin override/pin |
| Engagement | Personal streak + history, cohort leaderboard, compare-with-friends, share result |
| Progress integration | **Separate track** — no mastery / SRS / `qbank_attempts` writes |
| Reminders | In-app now (P1); email (P2); user-visible push (P3, deferred) |
| Pool scoping (v1) | Filter published pool by the cohort's curriculum/subject tags when present; else full published pool |
| Timezone | **Africa/Cairo** fixed, so a whole cohort rolls over together |

## 3. Reused infrastructure (established facts)

- **Persistence has two planes.** A generic key→JSON `app_state` document
  store (`GET/PUT /api/state/:key`, `/api/user-state/:key`, via
  `src/lib/api.ts` + `src/lib/stateStore.ts`), and purpose-built SQL tables
  with REST endpoints. Live mode = Express + MariaDB; unset `VITE_API_BASE` =
  self-contained localStorage demo.
- **Cohort identity is canonical:** `{ universityId, year-label }`
  (e.g. `{ 'kau', 'Year 2' }`), resolved server-side from the `students` row
  and exposed by `GET /api/me/university`. `qbank_attempts`, parties, and the
  existing leaderboard all key on `(university_id, year, term)`.
- **A cohort leaderboard already exists** — `GET /api/leaderboards` groups
  `qbank_attempts` by `(university_id, year, term)` (`server/src/studentLedger.js`).
  We follow the same shape for a QotD-specific board.
- **Published questions** come from the redacted admin content ledger
  (`synapse-admin-content-ledger-v4`), read client-side via
  `usePublishedQuestions()`; server marking uses `publishedQuestions()` +
  `questionKey.js`. `Question.id` = `ManagedContentItem.id`.
- **`seededRandom(seed:number)` + `shuffle(items, rng)`**
  (`src/data/seededRandom.ts`) already back cross-player-identical puzzles
  with no server. Takes a **number**, so we add a small string→int hash.
- **No scheduler exists anywhere.** No cron / `setInterval` daily job.
  Push (`server/src/push.js`) is **silent background-sync only**, not
  user-visible alerts. Email (Resend, `POST /api/mail/send`) only sends when
  code explicitly calls it. This is why reminders are phased (§8).

## 4. Selection algorithm

For a student in cohort `C` on local date `D` (Africa/Cairo):

```
todaysQuestionId(C, D):
  1. pin = qotdPins[cohortKey(C)]?.[D]          // admin override
     if pin present and still published → return pin
  2. pool = publishedQuestionIds scoped to C     // §5 scoping
     if pool empty → return null (render "no question today")
  3. deck = shuffle(pool, seededRandom(hash32(`${C.universityId}|${C.year}`)))
  4. return deck[ dayNumber(D) % deck.length ]
```

- **Cohort-stable, date-stable, non-repeating within a deck cycle.** Seeding
  the *deck* by cohort (not by date) and indexing by day-number means a cohort
  cycles through its whole pool before repeating, instead of independently
  re-drawing each day (which can repeat by chance).
- `hash32` = a small FNV-1a / `Math.imul` string hash (new helper), because
  `seededRandom` takes a number.
- `dayNumber(D)` = integer days since a fixed epoch, computed in Africa/Cairo.
- **Determinism is authoritative on the server too:** `POST /api/qotd/answer`
  recomputes today's question for the caller's cohort and rejects an answer
  whose `questionId` isn't today's — the client cannot pick its own question.

## 5. Pool scoping (v1)

Questions are not hard-stamped with university/year; scoping is indirect via
curriculum tags (`universityIds`, `yearIds`, `moduleIds` on ledger items) and
the library/curriculum topic scope (`src/data/qbankScope.ts`).

**v1 rule:** take the published question pool, keep items whose curriculum tags
match the cohort (`universityIds` empty or includes `C.universityId`, and
`yearIds` empty or includes the cohort's year id); if that yields too small a
pool (`< MIN_POOL`, e.g. 10), fall back to the full published pool for that
university, then to the full published pool. Recorded here so it is a one-line
change later if we want stricter subject-level scoping.

Note the cohort→year mapping gotcha: **people/attempts key on the year
_label_ (`"Year 2"`); per-module content keys on the year _id_ (`KAU_...`).**
Scoping by `yearIds` uses the id; leaderboard/cohort uses the label. Do not
conflate them.

## 6. Data model

Two new stores. **Neither touches the content ledger.**

### 6a. `qotd_answers` (new SQL table, live backend)

The separate-track ledger and the substrate for streaks / leaderboard / friends.

| Column | Notes |
|---|---|
| `user_id` | auth user |
| `student_id` | from `students` |
| `university_id`, `year`, `term` | cohort columns, copied at write time (same as `qbank_attempts`) |
| `qotd_date` | `DATE`, Africa/Cairo local date |
| `question_id` | today's question id |
| `answer_index` | student's choice |
| `correct` | server-remarked boolean |
| `answered_at` | timestamp |

- **Unique key `(user_id, qotd_date)`** — one answer per day, immutable;
  a second `POST` is rejected.
- Server **re-marks** `correct` against `publishedQuestions()` (reusing the
  existing key map), never trusting a client `correct` flag — same trust model
  as `qbank_attempts`.
- Demo mode (no server): the answer + streak live in a user-owned `app_state`
  document (`synapse.qotd.answers.v1`); leaderboard/friends render empty, the
  same graceful degradation parties/leaderboards already use.

### 6b. `synapse-qotd-pins-v1` (new shared app_state document)

Admin overrides only. Small and separate from the 23 MB content ledger.

```
{ [cohortKey]: { [isoDate]: questionId } }     // cohortKey = `${universityId}|${year}`
```

Authored by the admin surface (§9), gated by `requireConsole`, read by the
student QotD hook.

## 7. Server — new `server/src/qotd.js`

All under the existing auth (`Authorization: Bearer`), cohort resolved via the
existing `studentProfile()`.

| Endpoint | Purpose |
|---|---|
| `GET /api/qotd/today` | Caller's status today: `{ questionId, answered, answerIndex?, correct?, streak, longestStreak }`. Question body still comes from the ledger client-side; this returns status + the authoritative `questionId`. |
| `POST /api/qotd/answer` | `{ questionId, answerIndex }`. Verifies it is today's question for the caller's cohort, re-marks, upserts `qotd_answers`, returns `{ correct, correctIndex, streak }`. Rejects duplicates and stale/wrong questionId. |
| `GET /api/qotd/leaderboard` | Cohort-scoped ranking (current streak desc, then total-correct desc, then earliest-answered). `GROUP BY user` over `qotd_answers` filtered by `(university_id, year, term)`. Returns `scope: { universityId, year }`, same shape as `/api/leaderboards`. |
| `GET /api/qotd/friends` | Today's `{ answered, correct }` for the caller's friends (join friends → `qotd_answers` on `qotd_date = today`). `correct` is withheld until the caller has answered. |

Streak = longest run of consecutive `qotd_date`s ending today (or yesterday, so
an unanswered *today* doesn't instantly zero a live streak until the day ends).
Computed with a windowed query; a small pure helper `computeStreak(dates, today)`
is unit-tested independently.

## 8. Reminders (phased)

- **Phase 1 — in-app nudge (this build).** The client already knows whether
  today is answered. Show a badge on the nav item + a dashboard card state.
  No server, no schedule. Fully reliable.
- **Phase 2 — email reminder.** One authenticated
  `POST /api/qotd/dispatch-reminders` endpoint that finds cohort members who
  haven't answered today and sends via the existing Resend path, respecting
  suppression + one-click unsubscribe. **Triggered by an external daily
  scheduler** (Coolify cron / scheduled task) rather than an in-process timer —
  the repo has no in-process scheduler and an external trigger is the
  lower-risk fit. Out of scope for Phase 1; endpoint + template designed but
  not wired to a live trigger here.
- **Phase 3 — user-visible push (deferred).** Real APNs alert payloads +
  web-push for browser users. Today's push is silent-only; this is effectively
  its own subproject. Not built until requested.

## 9. Admin override surface

A lightweight admin control to pin a question for a `date + cohort`, writing
`synapse-qotd-pins-v1`. v1: a small section within an existing admin questions
surface (or a compact new tab if cleaner), gated by `requireConsole`. Auto
selection is the default; the pin is checked first (§4 step 1).

## 10. Client

- **Route** `/app/qotd`, registered in the `studentPages` registry in
  `src/router.tsx` (an unregistered route silently 404s — the registry is the
  single source of truth), lazy-loaded like its siblings.
- **`useQotd()` hook** (`src/lib/useQotd.ts`) — resolves cohort, computes
  today's questionId (pin → seeded), loads the question body from
  `usePublishedQuestions()`, and reads answer status + streak from the server
  (live) or local app_state (demo). Exposes `answer(index)`.
- **QotD page** (`src/pages/student/QuestionOfTheDay.tsx`) — the question,
  answer + explanation, streak + history calendar, cohort leaderboard, friends
  strip, share button.
- **Dashboard card** — a compact `QuestionOfTheDayCard` in the existing
  single-column dashboard (near the `QuestionBankCard` trio), showing today's
  state (unanswered / answered ✓/✗) and current streak, linking to the page.
- **Nav + nudge** — nav entry with an unanswered-today badge.
- **Share** — a result card ("Got today's question — 5-day streak") that never
  reveals the answer, via the existing share plumbing.
- **Graceful demo mode** — question + local streak work offline; leaderboard
  and friends render empty states.

## 11. Separate-track guarantee

QotD answers land **only** in `qotd_answers` (live) or `synapse.qotd.answers.v1`
(demo). They never call `useRecordAttempt`, never write mastery / SRS, never
touch `qbank_attempts`. A student can meet the same question later in the normal
qbank with no "already answered" state. The guarantee is structural (a separate
table), not a flag that could leak.

## 12. Testing

Co-located `*.test.ts`, matching the repo pattern:

- **Selector** — same cohort+date ⇒ same id; different dates diverge; deck
  cycles the whole pool before repeating; admin pin overrides; empty pool ⇒ null.
- **`hash32`** — stable, well-distributed for adjacent cohort strings.
- **`computeStreak`** — consecutive days count; a gap breaks the streak;
  Cairo-midnight rollover; unanswered-today keeps a live streak until day end.
- **Server** — re-marking matches the qbank key map; duplicate answer rejected;
  wrong/stale questionId rejected; leaderboard scoped to the caller's cohort;
  friends `correct` withheld pre-answer.

## 13. Build order — parallel lanes (Sonnet subagents)

Sized so independent lanes run concurrently with minimal shared-file contention.
Lane A must land the shared contract first; B/C/D then run in parallel.

- **Lane A — Contract & selector (foundation, lands first).**
  `hash32` helper, `qotdSelection.ts` (deterministic selector, pool scoping,
  cohort key), `computeStreak.ts`, and the shared TypeScript types for the API
  payloads + `synapse-qotd-pins-v1` shape. All pure, all unit-tested. Everything
  else imports these.
- **Lane B — Server.** `server/src/qotd.js` + the `qotd_answers` table
  migration + the four endpoints + server tests. Imports Lane A types/marking.
- **Lane C — Student UI.** `useQotd`, the QotD page, dashboard card, nav entry
  + nudge badge, share card. Imports Lane A; talks to Lane B via `api.ts`
  (mockable so C doesn't block on B).
- **Lane D — Admin override.** Admin pin surface writing `synapse-qotd-pins-v1`.
  Imports Lane A.
- **Integration pass (orchestrator).** Wire routes, run typecheck + full test
  suite, verify in the browser preview, then a `requesting-code-review` pass.
- **Phase 2 (separate, later).** Email dispatch endpoint + external trigger.
- **Phase 3 (deferred).** User-visible push.

Each lane produces small atomic commits and reports back as a delta. The
orchestrator holds the integration and review.
