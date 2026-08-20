# Study Parties Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let students form a standing study party inside their year, and work through mixed sets of questions, practical items and essay questions together.

**Architecture:** A party is a group with one permanent link and a discovery switch; it owns sessions, each with a frozen mix of items that either opens now or at a time. The rules that decide who may join and what a session's state is are pure and tested; everything touching MariaDB follows `studyRooms.js`.

**Tech Stack:** Client — React 19 + TypeScript + Vite + Tailwind v4, tests `node --test --experimental-strip-types "src/**/*.test.ts"`. Server — Node 20 + Express + mysql2/MariaDB in `server/`, tests `npm test` from `server/` (`node --test src/*.test.js`).

## Global Constraints

- Dependencies are installed. Do not run `npm install` in either package.
- `npx tsc -b` must stay green. `noUnusedLocals` is ON.
- **Every student-facing string goes through `useT()`.**
- **Logical CSS properties only**: `ps-`/`pe-`/`ms-`/`me-`/`start-`/`end-`. Never `pl-`/`pr-`/`left-`/`right-`. The app runs RTL in Arabic.
- Client modules under `node --test` import relatively with an explicit `.ts` extension; server modules use explicit `.js`.
- Comments explain **why**, not what.
- Commit messages are a plain sentence about what a person can now do. No `feat:`/`fix:` prefixes.
- **There is no database in this worktree.** Nothing that runs SQL can be executed. `mysql2`'s `createPool` is lazy, so importing a db module is safe and `node --check` parses it, but any SQL correctness must come from reading carefully.
- Server handlers are `requireAuthenticated` and take the actor from `req.identity.id`. **Never take a user id from the body as the actor** — that is the security boundary.
- Correctness for questions is decided against the published question, never taken from the client.

---

### Task 1: The rules

Pure, no database. Who may join, what state a session is in, and how a mixed session is tallied.

**Files:**
- Create: `server/src/partyRules.js`
- Test: `server/src/partyRules.test.js`

**Interfaces:**
- Produces: `sameCohort`, `canJoin`, `visibleTo`, `sessionState`, `tally`.

- [ ] **Step 1: Write the failing test**

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { canJoin, visibleTo, sessionState, tally } from './partyRules.js'

const party = (over = {}) => ({
  id: 'p1', universityId: 'kasr', year: 'Y3', visibility: 'open', archivedAt: null, ...over,
})
const viewer = (over = {}) => ({ universityId: 'kasr', year: 'Y3', ...over })

test('someone from the same cohort may join', () => {
  assert.equal(canJoin(party(), viewer()).ok, true)
})

test('another university may not, even holding the code', () => {
  assert.equal(canJoin(party(), viewer({ universityId: 'ain-shams' })).ok, false)
})

test('another year may not either', () => {
  assert.equal(canJoin(party(), viewer({ year: 'Y2' })).ok, false)
})

test('an invite-only party can still be joined with the code', () => {
  assert.equal(canJoin(party({ visibility: 'invite' }), viewer()).ok, true)
})

test('an archived party is closed to everyone', () => {
  assert.equal(canJoin(party({ archivedAt: '2026-01-01' }), viewer()).ok, false)
})

test('only open parties in your own cohort are browsable', () => {
  const list = [
    party({ id: 'open-here' }),
    party({ id: 'invite-here', visibility: 'invite' }),
    party({ id: 'open-elsewhere', universityId: 'ain-shams' }),
    party({ id: 'archived', archivedAt: '2026-01-01' }),
  ]
  assert.deepEqual(visibleTo(list, viewer()).map((p) => p.id), ['open-here'])
})

const now = new Date('2026-08-20T12:00:00.000Z')

test('a session with no start time is open from the moment it exists', () => {
  assert.equal(sessionState({ startsAt: null, closedAt: null }, now), 'open')
})

test('a session starting later is scheduled until then', () => {
  assert.equal(sessionState({ startsAt: '2026-08-20T18:00:00.000Z', closedAt: null }, now), 'scheduled')
})

test('and open once its time has passed', () => {
  assert.equal(sessionState({ startsAt: '2026-08-20T06:00:00.000Z', closedAt: null }, now), 'open')
})

test('a closed session stays closed whatever its start time said', () => {
  assert.equal(sessionState({ startsAt: null, closedAt: '2026-08-20T09:00:00.000Z' }, now), 'closed')
})

test('a mixed session counts what was marked apart from what was practised', () => {
  const result = tally([
    { itemKind: 'question', correct: true },
    { itemKind: 'question', correct: false },
    { itemKind: 'question', correct: true },
    { itemKind: 'practical', correct: null },
    { itemKind: 'essay', correct: null },
  ])
  assert.deepEqual(result, { marked: { correct: 2, of: 3 }, practised: 2 })
})

test('nothing answered reports nothing rather than zero of zero', () => {
  assert.deepEqual(tally([]), { marked: null, practised: 0 })
})
```

- [ ] **Step 2: Run it and watch it fail**

From `server/`: `node --test src/partyRules.test.js` — FAIL, `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Write the implementation**

`server/src/partyRules.js`, with no `./db.js` import. Header comment: these are the rules a party obeys, kept apart from the database so the ones that matter — who may walk in, and what a mixed session honestly reports — can be tested without a MariaDB.

Key points to state in comments:

- **Cohort is checked here but sourced on the server.** These functions take a viewer's cohort; the caller must read it from the student's own record, never from the request.
- **`visibility` decides discovery, not entry.** `canJoin` deliberately ignores it: the code is the way in, and flipping to invite-only stops a party being *found*, it does not lock the door on people who already have the link.
- **`tally` never averages.** A question is marked by the server; a practical item and an essay are marked by the student who did them. Combining them would put self-reported work into a number other people compare themselves against.

- [ ] **Step 4: Run it and watch it pass** — 12 tests. Then `npm test` from `server/` — all green.

- [ ] **Step 5: Commit**

```bash
git add server/src/partyRules.js server/src/partyRules.test.js
git commit -m "State who may walk into a party, and what a mixed session says"
```

---

### Task 2: The party itself

**Files:**
- Modify: `server/schema.sql` (append, following the file's comment style)
- Create: `server/src/parties.js`
- Modify: `server/src/index.js`

**Interfaces:**
- Consumes: Task 1's rules.
- Produces: `createParty`, `joinByCode`, `setVisibility`, `myParties`, `openParties`, `partyFor`, `leaveParty`.

- [ ] **Step 1: Add the schema**

The four tables from the spec's §1, verbatim, with `CREATE TABLE IF NOT EXISTS`. Keep the comments; they carry the reasoning.

**Do not put a semicolon at the end of a line inside a block comment** — `migrate()` splits the file on `;` followed by a newline, and one there would cut the statement in half. Semicolons mid-sentence are fine; the existing file has many.

- [ ] **Step 2: Write `server/src/parties.js`**

Follow `server/src/studyRooms.js` closely — read it first. It is the nearest existing module: same pool use, same code alphabet (no 0/O/1/I/L, because a code gets read aloud), same instinct that a stranger gets the same answer as a non-existent thing.

Requirements:

- `createParty(userId, { name })` reads the host's `university_id` and `year` from `students` and copies them onto the party. **Refuse if the student has no cohort recorded** — a party with no year cannot be confined to one, and silently making it visible to everybody is the failure to avoid. Return a refusal reason the client can render.
- `joinByCode(userId, code)` loads the party, builds the viewer's cohort from their own record, and defers to `canJoin`. A refusal must not reveal whether the code exists.
- `setVisibility(userId, partyId, visibility)` — host only.
- `openParties(userId)` uses `visibleTo` over the caller's cohort.
- `partyFor(userId, partyId)` returns null for a non-member, exactly as `roomFor` does.

- [ ] **Step 3: Wire the routes**

```js
/* ── Study parties ───────────────────────────────────────────────────────── */

app.post('/api/parties', requireAuthenticated, wrap(async (req, res) => {
  res.json(await createParty(req.identity.id, req.body ?? {}))
}))

app.post('/api/parties/join', requireAuthenticated, wrap(async (req, res) => {
  res.json(await joinByCode(req.identity.id, req.body?.code))
}))

app.get('/api/parties/mine', requireAuthenticated, wrap(async (req, res) => {
  res.json({ parties: await myParties(req.identity.id) })
}))

app.get('/api/parties/open', requireAuthenticated, wrap(async (req, res) => {
  res.json({ parties: await openParties(req.identity.id) })
}))

app.get('/api/parties/:id', requireAuthenticated, wrap(async (req, res) => {
  const party = await partyFor(req.identity.id, req.params.id)
  if (!party) return res.status(404).json({ error: 'party not found' })
  res.json({ party })
}))

app.post('/api/parties/:id/visibility', requireAuthenticated, wrap(async (req, res) => {
  res.json(await setVisibility(req.identity.id, req.params.id, req.body?.visibility))
}))

app.post('/api/parties/:id/leave', requireAuthenticated, wrap(async (req, res) => {
  res.json(await leaveParty(req.identity.id, req.params.id))
}))
```

- [ ] **Step 4: Verify and commit**

From `server/`: `node --check src/parties.js && node --check src/index.js && npm test`.

```bash
git add server/schema.sql server/src/parties.js server/src/index.js
git commit -m "Make a study party, and let your year walk in"
```

---

### Task 3: Sessions

**Files:**
- Modify: `server/src/parties.js`, `server/src/index.js`

**Interfaces:**
- Produces: `createSession`, `sessionsFor`, `sessionFor`, `answerItem`, `closeSession`.

- [ ] **Step 1: Implement**

- `createSession(userId, partyId, { name, items, startsAt })` — members only. `items` is `[{ kind, id }]`; **keep only items that exist and are published**, resolving questions through the same published snapshot `studyRooms.js` uses, and the ledger for practical and essay. Cap at 40, as rooms do. Freeze the survivors into `item_refs`.
- `answerItem(userId, sessionId, { kind, id, chosenIndex, seconds })` — for a **question**, decide `correct` on the server against the published answer and ignore anything the client says about it. For **practical** and **essay**, record `correct: null`: those are self-checked, and that is the whole reason a session reports two numbers.
- `sessionFor` returns the caller's own answers always, plus each member's tally via `tally` from Task 1.
- `closeSession` — host or the member who created it.

- [ ] **Step 2: Routes**, following the shape above, under `/api/parties/:id/sessions` and `/api/party-sessions/:sessionId/...`.

- [ ] **Step 3: Verify and commit**

```bash
git add server/src/parties.js server/src/index.js
git commit -m "Set the party something to work through"
```

---

### Task 4: The client hooks

**Files:**
- Create: `src/lib/useParties.ts`

Mirror `src/lib/useStudyRooms.ts` exactly — read it first. Same polling for an open party, same `PARTY_REFUSALS` map, same exported-interface style.

```ts
export interface PartySummary {
  id: string; code: string; name: string; visibility: 'open' | 'invite'
  members: number; isHost: boolean; openSessions: number
}
export interface PartySession {
  id: string; name: string; state: 'scheduled' | 'open' | 'closed'
  startsAt: string | null; itemCount: number
  myAnswered: number
  tally: { marked: { correct: number; of: number } | null; practised: number } | null
}
export interface Party extends PartySummary {
  universityId: string; year: string
  members: { userId: string; displayName: string; role: 'host' | 'member' }[]
  sessions: PartySession[]
}
```

Refusals must read as sentences a student understands — "That party is for a different year", not a code.

- [ ] Verify `npx tsc -b`, then commit: `Read the parties you are in`

---

### Task 5: The Parties tab

**Files:**
- Create: `src/components/social/PartiesPanel.tsx`, `src/components/social/PartyPage.tsx`
- Modify: `src/pages/student/StudyTogether.tsx`

- [ ] **Step 1** — a **Parties** tab beside Shared tests and Friends: your parties, open ones in your year (the section absent entirely when there are none), and join-with-a-link.

- [ ] **Step 2** — the party page: name, members, the one link with a copy button, the visibility switch for the host, and the sessions.

  The switch's two options are named, not `open`/`invite`:
  - **Open to your year** — "Anyone in your university and year can find this party and join it."
  - **Invite only** — "It appears in no list. Anyone with the link can still join."

  That second sentence is not optional. A host who believes flipping the switch ejects people will be wrong at the worst moment.

- [ ] **Step 3** — verify. `npx tsc -b`, `npm test`.

  Browser: **check `document.hidden` first** — the pane is often closed here, and if it is, say so and verify by DOM query rather than claiming you looked. `API_MODE` is off in demo mode, so the tab must say the backend is needed rather than break — follow how `StudyTogether.tsx` already handles that.

```bash
git add src/components/social src/pages/student/StudyTogether.tsx
git commit -m "Find your year's parties, and see who is in yours"
```

---

### Task 6: Sitting a session

**Files:**
- Create: `src/components/social/PartySessionRunner.tsx`
- Modify: `src/components/social/PartyPage.tsx`

- [ ] **Step 1** — one item at a time, each in the form it already has:
  - a **question** through `QuestionView`, as `RoomRunner` does, marked by the server
  - a **practical** item and an **essay** shown with their own presentation, self-checked

  Log each to the attempt ledger with its natural surface, `sessionId: \`party-${sessionId}\``.

- [ ] **Step 2** — the end: **the two numbers, separately**. "14 of 20 correct" and "6 items self-checked", with a line saying the self-checked ones are not scored. Never one combined figure.

- [ ] **Step 3** — verify and commit.

```bash
git add src/components/social
git commit -m "Work through a party session, and see how the room did"
```

---

## Out of scope, deliberately

- **Chat, voice, and live presence.** A party is a place to study together, not a messaging product.
- **Rotating a party's link.** Visibility controls discovery; a rotating link would imply an eviction it does not perform.
- **Slice G**, the word game, which builds on this.
