# Friends and Challenges Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a student find a classmate, become friends, sit a shared test together, and challenge each other on the same frozen paper.

**Architecture:** A mutual friend graph on the server, reachable three ways — an invite link, a directory bounded to the caller's own university and year, and (later) Facebook. Challenges reuse the Study Together model exactly: the paper is frozen at creation, the server marks every answer, and the head-to-head opens only once both sides have finished. Facebook is built behind a flag because Meta's App Review, not our schedule, decides when it can light up.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind v4 (client); Node 20 + Express + `mysql2`/MariaDB (server). Client tests: `node --test --experimental-strip-types "src/**/*.test.ts"`. Server tests: `node --test src/*.test.js` from `server/`.

## Global Constraints

- Dependencies are already installed. Do not run `npm install` in either package.
- `npx tsc -b` must stay green. `noUnusedLocals` is ON — an unused import or binding fails the build.
- **Every student-facing string goes through `useT()`** — `const t = useT()`, then `t('…')`.
- **Logical CSS properties only**: `ps-`/`pe-`/`ms-`/`me-`/`start-`/`end-`. Never `pl-`/`pr-`/`left-`/`right-`. The app runs RTL in Arabic.
- Comments explain **why**, not what — state the problem the code solves.
- Commit messages are a plain sentence about what a person can now do. No `feat:`/`fix:`/`chore:` prefixes.
- **Client** test modules import relatively with an explicit `.ts` extension (`./friends.ts`) — `node --test` cannot resolve the `@/` alias. **Server** modules already use explicit `.js` extensions.
- Server: every handler is `requireAuthenticated` and derives the actor from `req.identity.id`. **Never** take a user id from the request body — that is the whole security boundary.
- Server: correctness is decided against the published question, never taken from the client.
- New tables go in `server/schema.sql`, applied by `npm run migrate` from `server/`. Use `CREATE TABLE IF NOT EXISTS` and `ALTER TABLE … ADD COLUMN IF NOT EXISTS`, matching the file's existing style.

---

### Task 1: Friendship rules

Pure functions with no database. This is where the ordered-pair invariant and the request state machine live, so both can be tested without a MariaDB.

**Files:**
- Create: `server/src/friendship.js`
- Test: `server/src/friendship.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `orderedPair(a, b) -> { userA, userB }`, `isSelf(a, b) -> boolean`, `canSendRequest(existing) -> { ok: boolean, reason?: string }`, `resolveResponse(row, responderId, accept) -> { status: 'accepted'|'declined' } | null`.

- [ ] **Step 1: Write the failing test**

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { orderedPair, isSelf, canSendRequest, resolveResponse } from './friendship.js'

test('a pair sorts the same way round either way', () => {
  assert.deepEqual(orderedPair('b', 'a'), { userA: 'a', userB: 'b' })
  assert.deepEqual(orderedPair('a', 'b'), { userA: 'a', userB: 'b' })
})

test('a student cannot befriend themselves', () => {
  assert.equal(isSelf('a', 'a'), true)
  assert.equal(isSelf('a', 'b'), false)
})

test('a first request is allowed', () => {
  assert.deepEqual(canSendRequest(null), { ok: true })
})

test('a second request while one is pending is refused', () => {
  assert.deepEqual(canSendRequest({ status: 'pending' }), { ok: false, reason: 'already_pending' })
})

test('requesting someone who is already a friend is refused', () => {
  assert.deepEqual(canSendRequest({ status: 'accepted' }), { ok: false, reason: 'already_friends' })
})

test('requesting again after a decline is allowed', () => {
  assert.deepEqual(canSendRequest({ status: 'declined' }), { ok: true })
})

test('only the person who did not ask may answer', () => {
  const row = { userA: 'a', userB: 'b', requestedBy: 'a', status: 'pending' }
  assert.equal(resolveResponse(row, 'a', true), null)
  assert.deepEqual(resolveResponse(row, 'b', true), { status: 'accepted' })
  assert.deepEqual(resolveResponse(row, 'b', false), { status: 'declined' })
})

test('a request that is not pending cannot be answered', () => {
  const row = { userA: 'a', userB: 'b', requestedBy: 'a', status: 'accepted' }
  assert.equal(resolveResponse(row, 'b', true), null)
})
```

- [ ] **Step 2: Run the test and watch it fail**

Run from `server/`: `node --test src/friendship.test.js`
Expected: FAIL — `ERR_MODULE_NOT_FOUND` for `./friendship.js`.

- [ ] **Step 3: Write the implementation**

```js
/**
 * The rules a friendship obeys, with no database in sight.
 *
 * Two of these are invariants that only break under a race: two students
 * pressing Add at the same instant, and a request answered by the person who
 * sent it. Both are cheap to state here and expensive to debug in SQL.
 */

/**
 * A friendship is one row, not two.
 *
 * Sorting the pair before it is written means "are we friends" is a single
 * lookup and a duplicate is impossible — the primary key does the work.
 */
export function orderedPair(a, b) {
  return a < b ? { userA: a, userB: b } : { userA: b, userB: a }
}

export function isSelf(a, b) {
  return a === b
}

/** Whether a fresh request may be sent, given whatever row already exists. */
export function canSendRequest(existing) {
  if (!existing) return { ok: true }
  if (existing.status === 'pending') return { ok: false, reason: 'already_pending' }
  if (existing.status === 'accepted') return { ok: false, reason: 'already_friends' }
  // A decline is not a block. Someone who tapped the wrong button, or changed
  // their mind, can be asked again.
  return { ok: true }
}

/**
 * The outcome of answering a request, or null when this person may not answer.
 *
 * The sender accepting their own request would make a friendship out of one
 * person's say-so, so the responder must be the other half of the pair.
 */
export function resolveResponse(row, responderId, accept) {
  if (!row || row.status !== 'pending') return null
  if (row.requestedBy === responderId) return null
  if (row.userA !== responderId && row.userB !== responderId) return null
  return { status: accept ? 'accepted' : 'declined' }
}
```

- [ ] **Step 4: Run the test and watch it pass**

Run from `server/`: `node --test src/friendship.test.js`
Expected: PASS, 7 tests.

- [ ] **Step 5: Run the whole server suite**

Run from `server/`: `npm test`
Expected: every existing test still passes.

- [ ] **Step 6: Commit**

```bash
git add server/src/friendship.js server/src/friendship.test.js
git commit -m "State the rules a friendship has to obey"
```

---

### Task 2: The friend graph

**Files:**
- Modify: `server/schema.sql` (append at the end, following the file's comment style)
- Create: `server/src/friends.js`
- Modify: `server/src/index.js` (routes, and the import block near line 33)

**Interfaces:**
- Consumes: `orderedPair`, `isSelf`, `canSendRequest`, `resolveResponse` from Task 1.
- Produces: `sendRequest(userId, targetId)`, `respondToRequest(userId, otherId, accept)`, `removeFriend(userId, otherId)`, `myFriends(userId)`, `myRequests(userId)` — all `async`, all returning plain JSON-safe objects.

- [ ] **Step 1: Add the schema**

Append to `server/schema.sql`:

```sql
/* ── Friends ─────────────────────────────────────────────────────────────
   A friendship is a single row with its pair sorted, so two students pressing
   Add at the same moment cannot create two rows describing one friendship.
   `requested_by` is kept because it decides who is allowed to answer. */
CREATE TABLE IF NOT EXISTS friendships (
  user_a       VARCHAR(64) NOT NULL,
  user_b       VARCHAR(64) NOT NULL,
  requested_by VARCHAR(64) NOT NULL,
  status       ENUM('pending','accepted','declined') NOT NULL DEFAULT 'pending',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at DATETIME NULL,
  PRIMARY KEY (user_a, user_b),
  INDEX idx_friendships_b (user_b, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Whether this student may be found in their cohort's directory. Default on:
   being findable by your own classmates is the point of the directory, and the
   cohort is already closed. The toggle lives in Account. */
ALTER TABLE students ADD COLUMN IF NOT EXISTS discoverable BOOLEAN NOT NULL DEFAULT 1;
```

- [ ] **Step 2: Write `server/src/friends.js`**

```js
/**
 * The friend graph.
 *
 * Every read and write goes through `orderedPair`, so the table holds one row
 * per friendship and the primary key is what makes that true. Nothing here
 * takes a user id from a request body — the actor is always the verified
 * session, and the target is checked to be a real account.
 */
import { pool } from './db.js'
import { orderedPair, isSelf, canSendRequest, resolveResponse } from './friendship.js'

/** The row for a pair, in the shape the pure rules expect, or null. */
async function pairRow(a, b) {
  const { userA, userB } = orderedPair(a, b)
  const [rows] = await pool.query(
    'SELECT user_a, user_b, requested_by, status FROM friendships WHERE user_a = ? AND user_b = ?',
    [userA, userB],
  )
  if (!rows.length) return null
  return { userA: rows[0].user_a, userB: rows[0].user_b, requestedBy: rows[0].requested_by, status: rows[0].status }
}

async function accountExists(userId) {
  const [rows] = await pool.query('SELECT 1 FROM user_access WHERE user_id = ? LIMIT 1', [userId])
  return rows.length > 0
}

/** Name and cohort for a set of ids, for rendering a row. */
async function profilesFor(ids) {
  if (!ids.length) return new Map()
  const [rows] = await pool.query(
    `SELECT a.user_id, COALESCE(s.name, s.email, a.email) AS name, s.university_id, s.year
       FROM user_access a LEFT JOIN students s ON s.user_id = a.user_id
      WHERE a.user_id IN (?)`,
    [ids],
  )
  const byId = new Map()
  for (const row of rows) {
    byId.set(row.user_id, {
      userId: row.user_id,
      displayName: row.name ? String(row.name).split('@')[0] : 'Student',
      universityId: row.university_id ?? null,
      year: row.year ?? null,
    })
  }
  return byId
}

export async function sendRequest(userId, targetId) {
  if (!targetId || isSelf(userId, targetId)) return { ok: false, reason: 'invalid_target' }
  if (!(await accountExists(targetId))) return { ok: false, reason: 'invalid_target' }
  const existing = await pairRow(userId, targetId)
  const verdict = canSendRequest(existing)
  if (!verdict.ok) return { ok: false, reason: verdict.reason }
  const { userA, userB } = orderedPair(userId, targetId)
  // A re-request after a decline overwrites the old row rather than adding one.
  await pool.query(
    `INSERT INTO friendships (user_a, user_b, requested_by, status)
     VALUES (?, ?, ?, 'pending')
     ON DUPLICATE KEY UPDATE requested_by = VALUES(requested_by), status = 'pending', responded_at = NULL`,
    [userA, userB, userId],
  )
  return { ok: true }
}

export async function respondToRequest(userId, otherId, accept) {
  const row = await pairRow(userId, otherId)
  const outcome = resolveResponse(row, userId, accept)
  if (!outcome) return { ok: false, reason: 'not_pending' }
  const { userA, userB } = orderedPair(userId, otherId)
  await pool.query(
    'UPDATE friendships SET status = ?, responded_at = NOW() WHERE user_a = ? AND user_b = ?',
    [outcome.status, userA, userB],
  )
  return { ok: true, status: outcome.status }
}

export async function removeFriend(userId, otherId) {
  const { userA, userB } = orderedPair(userId, otherId)
  await pool.query('DELETE FROM friendships WHERE user_a = ? AND user_b = ?', [userA, userB])
  return { ok: true }
}

export async function myFriends(userId) {
  const [rows] = await pool.query(
    `SELECT user_a, user_b FROM friendships
      WHERE status = 'accepted' AND (user_a = ? OR user_b = ?)`,
    [userId, userId],
  )
  const ids = rows.map((row) => (row.user_a === userId ? row.user_b : row.user_a))
  const profiles = await profilesFor(ids)
  return ids.map((id) => profiles.get(id)).filter(Boolean)
}

export async function myRequests(userId) {
  const [rows] = await pool.query(
    `SELECT user_a, user_b, requested_by FROM friendships
      WHERE status = 'pending' AND (user_a = ? OR user_b = ?)`,
    [userId, userId],
  )
  const ids = rows.map((row) => (row.user_a === userId ? row.user_b : row.user_a))
  const profiles = await profilesFor(ids)
  const incoming = []
  const outgoing = []
  for (const row of rows) {
    const otherId = row.user_a === userId ? row.user_b : row.user_a
    const profile = profiles.get(otherId)
    if (!profile) continue
    if (row.requested_by === userId) outgoing.push(profile)
    else incoming.push(profile)
  }
  return { incoming, outgoing }
}
```

- [ ] **Step 3: Wire the routes**

In `server/src/index.js`, add an import beside the `studyRooms.js` one:

```js
import { sendRequest, respondToRequest, removeFriend, myFriends, myRequests } from './friends.js'
```

and add, after the Study Together route block:

```js
/* ── Friends ─────────────────────────────────────────────────────────────── */

app.get('/api/friends', requireAuthenticated, wrap(async (req, res) => {
  res.json({ friends: await myFriends(req.identity.id), requests: await myRequests(req.identity.id) })
}))

app.post('/api/friends/request', requireAuthenticated, wrap(async (req, res) => {
  res.json(await sendRequest(req.identity.id, req.body?.userId))
}))

app.post('/api/friends/respond', requireAuthenticated, wrap(async (req, res) => {
  res.json(await respondToRequest(req.identity.id, req.body?.userId, Boolean(req.body?.accept)))
}))

app.post('/api/friends/remove', requireAuthenticated, wrap(async (req, res) => {
  res.json(await removeFriend(req.identity.id, req.body?.userId))
}))
```

- [ ] **Step 4: Check it parses and the suite is green**

Run from `server/`: `node --check src/friends.js && npm test`
Expected: no output from `node --check`; every test passes.

- [ ] **Step 5: Commit**

```bash
git add server/schema.sql server/src/friends.js server/src/index.js
git commit -m "Ask another student to be a friend, and answer when asked"
```

---

### Task 3: The Friends tab

**Files:**
- Create: `src/lib/useFriends.ts`
- Create: `src/components/social/FriendsPanel.tsx`
- Modify: `src/pages/student/StudyTogether.tsx`

**Interfaces:**
- Consumes: `/api/friends`, `/api/friends/request`, `/api/friends/respond`, `/api/friends/remove` from Task 2.
- Produces: `useFriends()` returning `{ friends, incoming, outgoing, reload, request, respond, remove, loading }`; `FriendProfile` with `{ userId, displayName, universityId, year }`.

- [ ] **Step 1: Write `src/lib/useFriends.ts`**

```ts
import { useCallback, useEffect, useState } from 'react'
import { API_MODE, apiGet, apiPost } from './api'

/**
 * The friend graph, as the server holds it.
 *
 * Nothing is invented in the browser: a friendship needs two people to agree,
 * so the only honest source is the server that both of them talk to.
 */

export interface FriendProfile {
  userId: string
  displayName: string
  universityId: string | null
  year: string | null
}

export const FRIEND_REFUSALS: Record<string, string> = {
  invalid_target: 'That student could not be found.',
  already_pending: 'You have already asked. They have not answered yet.',
  already_friends: 'You are already friends.',
  not_pending: 'That request has already been answered.',
}

export function useFriends() {
  const [friends, setFriends] = useState<FriendProfile[]>([])
  const [incoming, setIncoming] = useState<FriendProfile[]>([])
  const [outgoing, setOutgoing] = useState<FriendProfile[]>([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    if (!API_MODE) { setLoading(false); return }
    const data = await apiGet<{ friends: FriendProfile[]; requests: { incoming: FriendProfile[]; outgoing: FriendProfile[] } }>('/api/friends')
    setFriends(data?.friends ?? [])
    setIncoming(data?.requests?.incoming ?? [])
    setOutgoing(data?.requests?.outgoing ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { void reload() }, [reload])

  const request = useCallback(async (userId: string) => {
    const result = await apiPost<{ ok: boolean; reason?: string }>('/api/friends/request', { userId })
    await reload()
    return result
  }, [reload])

  const respond = useCallback(async (userId: string, accept: boolean) => {
    const result = await apiPost<{ ok: boolean; reason?: string }>('/api/friends/respond', { userId, accept })
    await reload()
    return result
  }, [reload])

  const remove = useCallback(async (userId: string) => {
    const result = await apiPost<{ ok: boolean }>('/api/friends/remove', { userId })
    await reload()
    return result
  }, [reload])

  return { friends, incoming, outgoing, loading, reload, request, respond, remove }
}
```

Check `src/lib/api.ts` for the exact exported names and generic shapes of `apiGet`/`apiPost` before writing this, and match them.

- [ ] **Step 2: Write `src/components/social/FriendsPanel.tsx`**

```tsx
import { UserPlus, Users, Check, X, Swords, Play } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import type { FriendProfile } from '@/lib/useFriends'
import { useT } from '@/lib/i18n'

/**
 * Who you study with.
 *
 * A section that has nothing to show is absent rather than empty: three
 * headings over three "nothing here yet" lines is noise on the screen a
 * student sees most often.
 */
export function FriendsPanel({
  friends,
  incoming,
  outgoing,
  onRespond,
  onRemove,
  onStudyTogether,
  onChallenge,
}: {
  friends: FriendProfile[]
  incoming: FriendProfile[]
  outgoing: FriendProfile[]
  onRespond: (userId: string, accept: boolean) => void
  onRemove: (userId: string) => void
  onStudyTogether: (friend: FriendProfile) => void
  onChallenge: (friend: FriendProfile) => void
}) {
  const t = useT()
  return (
    <div className="space-y-4">
      {incoming.length > 0 && (
        <Panel>
          <PanelHeader title={t('Asked to be friends')} icon={UserPlus} hint={String(incoming.length)} />
          <ul className="divide-y divide-line">
            {incoming.map((person) => (
              <li key={person.userId} className="flex items-center gap-3 px-4 py-3">
                <Avatar name={person.displayName} size="sm" />
                <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink">{person.displayName}</span>
                <Button variant="primary" size="sm" iconLeft={Check} onClick={() => onRespond(person.userId, true)}>
                  {t('Accept')}
                </Button>
                <Button variant="ghost" size="sm" iconLeft={X} onClick={() => onRespond(person.userId, false)}>
                  {t('Decline')}
                </Button>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel>
        <PanelHeader title={t('Your friends')} icon={Users} hint={friends.length ? String(friends.length) : undefined} />
        {friends.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={Users}
              title={t('No friends yet')}
              description={t('Share your invite link, or find someone from your year below.')}
            />
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {friends.map((person) => (
              <li key={person.userId} className="flex flex-wrap items-center gap-2 px-4 py-3">
                <Avatar name={person.displayName} size="sm" />
                <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink">{person.displayName}</span>
                <Button variant="secondary" size="sm" iconLeft={Play} onClick={() => onStudyTogether(person)}>
                  {t('Study together')}
                </Button>
                <Button variant="secondary" size="sm" iconLeft={Swords} onClick={() => onChallenge(person)}>
                  {t('Challenge')}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onRemove(person.userId)}>
                  {t('Remove')}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {outgoing.length > 0 && (
        <Panel>
          <PanelHeader title={t('Waiting for an answer')} icon={UserPlus} />
          <ul className="divide-y divide-line">
            {outgoing.map((person) => (
              <li key={person.userId} className="flex items-center gap-3 px-4 py-3">
                <Avatar name={person.displayName} size="sm" />
                <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink-2">{person.displayName}</span>
                <span className="text-[12px] text-ink-3">{t('Asked')}</span>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  )
}
```

Check the real prop names of `Avatar`, `EmptyState`, `Button` and `PanelHeader` in `src/components/ui/` before writing, and match them exactly.

- [ ] **Step 3: Add the tab to Study Together**

In `src/pages/student/StudyTogether.tsx`, add a `Tabs` control above the existing content with two values, `'tests'` and `'friends'`, defaulting to `'tests'`. Render the existing page body under `'tests'` and `<FriendsPanel …/>` under `'friends'`, fed by `useFriends()`. Leave the existing shared-test code untouched. Wire `onStudyTogether` and `onChallenge` to `undefined`-safe stubs that do nothing yet — Tasks 6 and 9 fill them in.

- [ ] **Step 4: Verify**

Run: `npx tsc -b` — clean.
Run: `npm test` — the existing suite still passes.

Then, with the `preview_start` tool (never a dev server via Bash), open `/app/study-together` and confirm the Friends tab renders and shows the empty state. Demo mode has no backend, so the tab should say so rather than break — match how the page already handles `!API_MODE`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/useFriends.ts src/components/social/FriendsPanel.tsx src/pages/student/StudyTogether.tsx
git commit -m "See who you study with, and answer who asked"
```

---

### Task 4: Invite links

The path that works with no Facebook, no shared university, and no directory.

**Files:**
- Modify: `server/schema.sql`
- Create: `server/src/friendInvites.js`
- Create: `server/src/friendInvites.test.js`
- Modify: `server/src/index.js`
- Modify: `src/lib/useFriends.ts`
- Modify: `src/components/social/FriendsPanel.tsx`

**Interfaces:**
- Consumes: `sendRequest` from Task 2.
- Produces: `inviteState(row, now, viewerId) -> 'ok'|'expired'|'used'|'self'` (pure); `mintInvite(userId)`, `redeemInvite(userId, token)` (async).

- [ ] **Step 1: Add the schema**

```sql
/* A link a student can send to anyone, on any channel we do not control.
   Single use and short-lived: a link that lives forever in a group chat is a
   standing invitation to an account no one meant to add. */
CREATE TABLE IF NOT EXISTS friend_invites (
  token      CHAR(32) PRIMARY KEY,
  user_id    VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  used_by    VARCHAR(64) NULL,
  INDEX idx_friend_invites_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

- [ ] **Step 2: Write the failing test**

`server/src/friendInvites.test.js`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { inviteState } from './friendInvites.js'

const now = new Date('2026-08-19T12:00:00Z')

test('a fresh invite from someone else is usable', () => {
  const row = { userId: 'a', expiresAt: new Date('2026-08-20T12:00:00Z'), usedBy: null }
  assert.equal(inviteState(row, now, 'b'), 'ok')
})

test('an expired invite is refused', () => {
  const row = { userId: 'a', expiresAt: new Date('2026-08-18T12:00:00Z'), usedBy: null }
  assert.equal(inviteState(row, now, 'b'), 'expired')
})

test('an invite that has been used is refused', () => {
  const row = { userId: 'a', expiresAt: new Date('2026-08-20T12:00:00Z'), usedBy: 'c' }
  assert.equal(inviteState(row, now, 'b'), 'used')
})

test('you cannot redeem your own invite', () => {
  const row = { userId: 'a', expiresAt: new Date('2026-08-20T12:00:00Z'), usedBy: null }
  assert.equal(inviteState(row, now, 'a'), 'self')
})

test('a missing invite is refused rather than thrown', () => {
  assert.equal(inviteState(null, now, 'b'), 'used')
})
```

- [ ] **Step 3: Run it and watch it fail**

Run from `server/`: `node --test src/friendInvites.test.js`
Expected: FAIL — `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 4: Write `server/src/friendInvites.js`**

```js
import { randomBytes } from 'node:crypto'
import { pool } from './db.js'
import { sendRequest } from './friends.js'

/** Long enough that guessing one is not a strategy. */
const TOKEN_BYTES = 16
const VALID_DAYS = 14

/**
 * Why an invite can or cannot be used.
 *
 * Separated from the database so every refusal is testable, and so a missing
 * row and a spent row give the same answer — whether a token ever existed is
 * not something a stranger should be able to probe.
 */
export function inviteState(row, now, viewerId) {
  if (!row || row.usedBy) return 'used'
  if (row.userId === viewerId) return 'self'
  if (new Date(row.expiresAt).getTime() <= new Date(now).getTime()) return 'expired'
  return 'ok'
}

export async function mintInvite(userId) {
  const token = randomBytes(TOKEN_BYTES).toString('hex')
  await pool.query(
    'INSERT INTO friend_invites (token, user_id, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? DAY))',
    [token, userId, VALID_DAYS],
  )
  return { token }
}

export async function redeemInvite(userId, token) {
  if (!token) return { ok: false, reason: 'used' }
  const [rows] = await pool.query(
    'SELECT user_id, expires_at, used_by FROM friend_invites WHERE token = ? LIMIT 1',
    [String(token)],
  )
  const row = rows.length ? { userId: rows[0].user_id, expiresAt: rows[0].expires_at, usedBy: rows[0].used_by } : null
  const state = inviteState(row, new Date(), userId)
  if (state !== 'ok') return { ok: false, reason: state }
  const sent = await sendRequest(userId, row.userId)
  // Marked used even when the request is refused as already-pending: the link
  // did its job, and leaving it live would let it be replayed.
  await pool.query('UPDATE friend_invites SET used_by = ? WHERE token = ? AND used_by IS NULL', [userId, String(token)])
  return sent.ok ? { ok: true, userId: row.userId } : sent
}
```

- [ ] **Step 5: Run it and watch it pass**

Run from `server/`: `node --test src/friendInvites.test.js`
Expected: PASS, 5 tests. Then `npm test` — all green.

- [ ] **Step 6: Wire the routes**

```js
app.post('/api/friends/invite', requireAuthenticated, wrap(async (req, res) => {
  res.json(await mintInvite(req.identity.id))
}))

app.post('/api/friends/invite/redeem', requireAuthenticated, wrap(async (req, res) => {
  res.json(await redeemInvite(req.identity.id, req.body?.token))
}))
```

- [ ] **Step 7: Add it to the client**

In `useFriends.ts`, add `mintInvite()` and `redeemInvite(token)` calling those two routes, and add to `FRIEND_REFUSALS`:

```ts
  expired: 'That invite link has expired. Ask for a new one.',
  used: 'That invite link has already been used.',
  self: 'That is your own invite link.',
```

In `FriendsPanel.tsx`, add a **Find friends** panel with a "Create invite link" button that mints a token and shows `${window.location.origin}/app/study-together?invite=${token}` with a copy button. In `StudyTogether.tsx`, read `?invite=` with `useSearchParams` and redeem it once on mount (guard with a `useRef` so a re-render does not redeem twice), then clear the parameter.

- [ ] **Step 8: Verify and commit**

Run: `npx tsc -b` and `npm test` — both green. From `server/`: `npm test` — green.

```bash
git add server/schema.sql server/src/friendInvites.js server/src/friendInvites.test.js server/src/index.js src/lib/useFriends.ts src/components/social/FriendsPanel.tsx src/pages/student/StudyTogether.tsx
git commit -m "Send someone a link that makes you friends"
```

---

### Task 5: The cohort directory

**Files:**
- Modify: `server/src/friends.js`
- Modify: `server/src/index.js`
- Modify: `src/lib/useFriends.ts`
- Modify: `src/components/social/FriendsPanel.tsx`

**Interfaces:**
- Produces: `directorySearch(userId, query)` -> `FriendProfile[]`, capped at 20.

- [ ] **Step 1: Add `directorySearch` to `server/src/friends.js`**

```js
/**
 * Students this one is allowed to find.
 *
 * Bounded to the caller's own university and year, read from their own row
 * rather than from anything the client sent — a client that asks for another
 * cohort is not refused so much as never consulted. Existing friends and
 * anyone with a request already in flight are left out, because the only
 * action offered on a result is "add".
 */
export async function directorySearch(userId, query) {
  const [me] = await pool.query('SELECT university_id, year FROM students WHERE user_id = ? LIMIT 1', [userId])
  const cohort = me[0]
  if (!cohort?.university_id || !cohort?.year) return []
  const term = `%${String(query ?? '').trim().slice(0, 60)}%`
  const [rows] = await pool.query(
    `SELECT s.user_id, COALESCE(s.name, s.email) AS name, s.university_id, s.year
       FROM students s
      WHERE s.university_id = ? AND s.year = ?
        AND s.discoverable = 1
        AND s.user_id IS NOT NULL
        AND s.user_id <> ?
        AND COALESCE(s.name, s.email) LIKE ?
        AND NOT EXISTS (
          SELECT 1 FROM friendships f
           WHERE (f.user_a = LEAST(s.user_id, ?) AND f.user_b = GREATEST(s.user_id, ?))
             AND f.status IN ('pending','accepted')
        )
      ORDER BY name LIMIT 20`,
    [cohort.university_id, cohort.year, userId, term, userId, userId],
  )
  return rows.map((row) => ({
    userId: row.user_id,
    displayName: row.name ? String(row.name).split('@')[0] : 'Student',
    universityId: row.university_id ?? null,
    year: row.year ?? null,
  }))
}
```

- [ ] **Step 2: Wire the route**

```js
app.get('/api/friends/directory', requireAuthenticated, wrap(async (req, res) => {
  res.json({ people: await directorySearch(req.identity.id, req.query?.q) })
}))
```

- [ ] **Step 3: Add the search to the client**

In `useFriends.ts`, add `searchDirectory(query)` calling `/api/friends/directory?q=…`. In the **Find friends** panel, add a `SearchInput` (from `src/components/ui/Field`) that calls it, debounced by ~300ms, listing each result with an **Add** button wired to `request(userId)`. Show a plain line when the caller has no university or year set, since the directory cannot work without one.

- [ ] **Step 4: Verify and commit**

Run: `npx tsc -b`, `npm test`, and from `server/`: `node --check src/friends.js && npm test`.

```bash
git add server/src/friends.js server/src/index.js src/lib/useFriends.ts src/components/social/FriendsPanel.tsx
git commit -m "Find someone from your own year"
```

---

### Task 6: Challenge rules

**Files:**
- Create: `server/src/challengeResult.js`
- Test: `server/src/challengeResult.test.js`

**Interfaces:**
- Produces: `bothFinished(challenge) -> boolean`, `headToHead(challenge, answers) -> { challenger, opponent, questions }`.

- [ ] **Step 1: Write the failing test**

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { bothFinished, headToHead } from './challengeResult.js'

test('a challenge is only finished when both sides are', () => {
  assert.equal(bothFinished({ challengerFinishedAt: null, opponentFinishedAt: null }), false)
  assert.equal(bothFinished({ challengerFinishedAt: 'x', opponentFinishedAt: null }), false)
  assert.equal(bothFinished({ challengerFinishedAt: 'x', opponentFinishedAt: 'y' }), true)
})

test('the head-to-head counts each side and names who lost which question', () => {
  const challenge = { challengerId: 'a', opponentId: 'b', questionIds: ['q1', 'q2', 'q3'] }
  const answers = [
    { userId: 'a', questionId: 'q1', correct: true, seconds: 10 },
    { userId: 'a', questionId: 'q2', correct: false, seconds: 20 },
    { userId: 'b', questionId: 'q1', correct: true, seconds: 5 },
    { userId: 'b', questionId: 'q2', correct: true, seconds: 30 },
  ]
  const result = headToHead(challenge, answers)
  assert.equal(result.challenger.correct, 1)
  assert.equal(result.opponent.correct, 2)
  assert.equal(result.challenger.seconds, 30)
  assert.deepEqual(
    result.questions.find((q) => q.questionId === 'q2'),
    { questionId: 'q2', challengerCorrect: false, opponentCorrect: true },
  )
})

test('a question neither answered is reported as missed by both', () => {
  const challenge = { challengerId: 'a', opponentId: 'b', questionIds: ['q1'] }
  const result = headToHead(challenge, [])
  assert.deepEqual(result.questions, [{ questionId: 'q1', challengerCorrect: false, opponentCorrect: false }])
})
```

- [ ] **Step 2: Run it and watch it fail**

Run from `server/`: `node --test src/challengeResult.test.js`
Expected: FAIL — `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Write the implementation**

```js
/**
 * What a finished challenge says.
 *
 * Kept away from the database because this is the part worth being sure of:
 * a comparison two students will argue about should not depend on how a query
 * happened to order its rows.
 */

export function bothFinished(challenge) {
  return Boolean(challenge?.challengerFinishedAt && challenge?.opponentFinishedAt)
}

function sideFor(userId, answers) {
  const mine = answers.filter((answer) => answer.userId === userId)
  return {
    correct: mine.filter((answer) => answer.correct).length,
    answered: mine.length,
    seconds: mine.reduce((total, answer) => total + (answer.seconds ?? 0), 0),
  }
}

/**
 * Each side's totals, and the per-question split.
 *
 * A question one got and the other missed is the interesting row — it is the
 * thing worth talking about afterwards — so every question is reported, not
 * only the ones somebody answered. Unanswered counts as not correct, because
 * from the paper's point of view that is what it is.
 */
export function headToHead(challenge, answers) {
  const verdict = new Map()
  for (const answer of answers) verdict.set(`${answer.userId}:${answer.questionId}`, Boolean(answer.correct))
  return {
    challenger: sideFor(challenge.challengerId, answers),
    opponent: sideFor(challenge.opponentId, answers),
    questions: challenge.questionIds.map((questionId) => ({
      questionId,
      challengerCorrect: verdict.get(`${challenge.challengerId}:${questionId}`) ?? false,
      opponentCorrect: verdict.get(`${challenge.opponentId}:${questionId}`) ?? false,
    })),
  }
}
```

- [ ] **Step 4: Run it and watch it pass**

Run from `server/`: `node --test src/challengeResult.test.js` — PASS, 3 tests. Then `npm test` — all green.

- [ ] **Step 5: Commit**

```bash
git add server/src/challengeResult.js server/src/challengeResult.test.js
git commit -m "Work out who won, and on which questions"
```

---

### Task 7: Challenges on the server

**Files:**
- Modify: `server/schema.sql`
- Create: `server/src/challenges.js`
- Modify: `server/src/index.js`

**Interfaces:**
- Consumes: `bothFinished`, `headToHead` (Task 6); `orderedPair` (Task 1).
- Produces: `createChallenge(userId, { opponentId, questionIds, scopeLabel })`, `respondToChallenge(userId, id, accept)`, `submitChallengeAnswer(userId, id, { questionId, chosenIndex, seconds })`, `finishChallenge(userId, id)`, `challengeFor(userId, id)`, `myChallenges(userId)`.

- [ ] **Step 1: Add the schema**

```sql
/* A challenge is the same paper, sat apart.
   `question_ids` is frozen at creation for the same reason a study room's is:
   a question published or archived mid-challenge would change what is being
   compared, and the comparison is the whole point. */
CREATE TABLE IF NOT EXISTS challenges (
  id                     VARCHAR(64) PRIMARY KEY,
  challenger_id          VARCHAR(64) NOT NULL,
  opponent_id            VARCHAR(64) NOT NULL,
  question_ids           LONGTEXT NOT NULL,
  scope_label            VARCHAR(255) NOT NULL,
  status                 ENUM('sent','declined','running','complete') NOT NULL DEFAULT 'sent',
  challenger_finished_at DATETIME NULL,
  opponent_finished_at   DATETIME NULL,
  created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_challenges_opponent (opponent_id, status),
  INDEX idx_challenges_challenger (challenger_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Marked by the server against the published question, never by the client —
   a score the other student sees must not be self-reported. */
CREATE TABLE IF NOT EXISTS challenge_answers (
  challenge_id VARCHAR(64) NOT NULL,
  user_id      VARCHAR(64) NOT NULL,
  question_id  VARCHAR(96) NOT NULL,
  chosen_index INT NOT NULL,
  correct      TINYINT(1) NOT NULL,
  seconds      INT NULL,
  answered_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (challenge_id, user_id, question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

- [ ] **Step 2: Write `server/src/challenges.js`**

Model it directly on `server/src/studyRooms.js` — read that file first and follow it closely. Requirements:

- Reuse its published-question snapshot approach for freezing and for marking. Export a `invalidateChallengeSnapshot(key)` alongside it, or import and share the one in `studyRooms.js` if it exports a usable accessor; do not open a second cache with different invalidation.
- `createChallenge` refuses unless the two are **accepted friends** (query `friendships` via `orderedPair`), caps at `MAX_QUESTIONS` (40), and keeps only ids that are currently published.
- `submitChallengeAnswer` decides `correct` server-side against the published question. A client-sent verdict is ignored entirely.
- `challengeFor` returns the caller's own answers and progress always, and the opponent's numbers **only** when `bothFinished` — before that, `result: null`. This is the rule that stops the second student seeing whether it is worth trying.
- `finishChallenge` stamps the caller's side, and sets `status = 'complete'` once `bothFinished`.
- A non-participant gets the same answer as a non-existent challenge: `null`.

- [ ] **Step 3: Wire the routes**

```js
/* ── Challenges ──────────────────────────────────────────────────────────── */

app.post('/api/challenges', requireAuthenticated, wrap(async (req, res) => {
  res.json(await createChallenge(req.identity.id, req.body ?? {}))
}))

app.get('/api/challenges/mine', requireAuthenticated, wrap(async (req, res) => {
  res.json({ challenges: await myChallenges(req.identity.id) })
}))

app.get('/api/challenges/:id', requireAuthenticated, wrap(async (req, res) => {
  const challenge = await challengeFor(req.identity.id, req.params.id)
  if (!challenge) return res.status(404).json({ error: 'challenge not found' })
  res.json({ challenge })
}))

app.post('/api/challenges/:id/respond', requireAuthenticated, wrap(async (req, res) => {
  res.json(await respondToChallenge(req.identity.id, req.params.id, Boolean(req.body?.accept)))
}))

app.post('/api/challenges/:id/answers', requireAuthenticated, wrap(async (req, res) => {
  res.json(await submitChallengeAnswer(req.identity.id, req.params.id, req.body ?? {}))
}))

app.post('/api/challenges/:id/finish', requireAuthenticated, wrap(async (req, res) => {
  res.json(await finishChallenge(req.identity.id, req.params.id))
}))
```

- [ ] **Step 4: Verify and commit**

Run from `server/`: `node --check src/challenges.js && npm test` — green.

```bash
git add server/schema.sql server/src/challenges.js server/src/index.js
git commit -m "Set a friend the same paper, and mark it honestly"
```

---

### Task 8: Sitting a challenge

**Files:**
- Create: `src/lib/useChallenges.ts`
- Create: `src/components/social/ChallengePanel.tsx`
- Create: `src/components/social/ChallengeRunner.tsx`
- Modify: `src/components/social/FriendsPanel.tsx`
- Modify: `src/pages/student/StudyTogether.tsx`

**Interfaces:**
- Consumes: the `/api/challenges/*` routes from Task 7.
- Produces: `useChallenges()`, `useChallenge(id)`, `useChallengeActions()` — mirroring `useStudyRooms.ts`'s shape exactly. Read that file and follow it.

- [ ] **Step 1: Write `src/lib/useChallenges.ts`**

Mirror `src/lib/useStudyRooms.ts`: same `POLL_MS` polling for an open challenge, same refusal-map pattern (`CHALLENGE_REFUSALS`), same exported-interface style. Types:

```ts
export interface ChallengeSummary {
  id: string
  scopeLabel: string
  status: 'sent' | 'declined' | 'running' | 'complete'
  opponentName: string
  iAmChallenger: boolean
  questionCount: number
  myAnswered: number
  myFinished: boolean
  createdAt: string
}

export interface ChallengeHeadToHead {
  challenger: { correct: number; answered: number; seconds: number }
  opponent: { correct: number; answered: number; seconds: number }
  questions: { questionId: string; challengerCorrect: boolean; opponentCorrect: boolean }[]
}

export interface Challenge extends ChallengeSummary {
  questionIds: string[]
  myAnswers: { questionId: string; chosenIndex: number; correct: boolean }[]
  /** Null until both sides have finished — see the server's rule. */
  result: ChallengeHeadToHead | null
}
```

- [ ] **Step 2: Write `ChallengeRunner.tsx`**

Reuse `QuestionView` from `@/components/qbank/QuestionView` exactly as `RoomRunner` in `StudyTogether.tsx` does: one question at a time, submit to the server, show the verdict it returns. On the last question, call finish. Log each answer to the attempt ledger with `useRecordAttempt`, `surface: 'room'`, `sessionId: \`challenge-${challenge.id}\`` — so a challenge counts toward mastery like any other marked work. Copy the concept-id derivation from `RoomRunner`.

- [ ] **Step 3: Write `ChallengePanel.tsx`**

Three sections, each absent when empty: challenges waiting for your answer (Accept / Decline), challenges in progress (Continue), and finished ones. A finished one shows both scores, both times, and the per-question split from `result.questions` — marking which side got each. Before both finish, show only your own progress and a line saying the comparison opens when your opponent finishes.

- [ ] **Step 4: Wire the Challenge button**

In `FriendsPanel.tsx`, `onChallenge(friend)` opens a small dialog: a `TopicChooser` (from `@/components/qbank/TopicChooser`) and a length `Segmented`, then creates the challenge. Follow how `StudyTogether.tsx` already builds a room's question list — `chooserTopics` + `questionsInScope` + shuffle + slice.

- [ ] **Step 5: Verify**

Run: `npx tsc -b` and `npm test` — green.

With `preview_start`, confirm the panel renders and the empty states read correctly. A full two-account run needs the backend; if `API_MODE` is off locally, confirm the page says so rather than breaking, and note in your report that the end-to-end path was not exercised.

- [ ] **Step 6: Commit**

```bash
git add src/lib/useChallenges.ts src/components/social/ChallengePanel.tsx src/components/social/ChallengeRunner.tsx src/components/social/FriendsPanel.tsx src/pages/student/StudyTogether.tsx
git commit -m "Sit a friend's challenge, and see how you both did"
```

---

### Task 9: Start a shared test with a friend

**Files:**
- Modify: `server/src/studyRooms.js`
- Modify: `server/src/index.js`
- Modify: `src/lib/useStudyRooms.ts`
- Modify: `src/components/social/FriendsPanel.tsx`

- [ ] **Step 1: Let a room be created with someone already in it**

In `studyRooms.js`, extend `createRoom` to accept an optional `inviteUserIds` array. For each id that is an **accepted friend** of the creator, insert a `study_room_members` row at creation. Anyone not a friend is ignored silently — a room invitation is not a way to discover whether an id exists.

- [ ] **Step 2: Pass it through**

`createRoom`'s route already forwards `req.body`, so no route change is needed. Add `inviteUserIds` to the client's `create(...)` signature in `useStudyRooms.ts`.

- [ ] **Step 3: Wire the button**

`onStudyTogether(friend)` in `FriendsPanel.tsx` creates a room with `inviteUserIds: [friend.userId]` and opens it — reusing the existing `RoomRunner` path in `StudyTogether.tsx`. The friend finds it under "Your shared tests" without needing the code.

- [ ] **Step 4: Verify and commit**

Run: `npx tsc -b`, `npm test`; from `server/`: `node --check src/studyRooms.js && npm test`.

```bash
git add server/src/studyRooms.js server/src/index.js src/lib/useStudyRooms.ts src/components/social/FriendsPanel.tsx
git commit -m "Start a shared test with a friend, without passing a code"
```

---

### Task 10: Being findable is a choice

**Files:**
- Modify: `server/src/accounts.js`
- Modify: `server/src/index.js`
- Modify: `src/pages/student/Account.tsx`

- [ ] **Step 1: Read and write the setting**

Add `getDiscoverable(userId)` and `setDiscoverable(userId, value)` to `accounts.js`, writing `students.discoverable` for the row whose `user_id` matches the verified session. Wire `GET`/`POST /api/account/discoverable`.

- [ ] **Step 2: Add the toggle**

In `Account.tsx`, add a row using the existing `Toggle` component: **"Let classmates find me"**, with the supporting line *"Students in your own university and year can find you by name and ask to be friends. Turning this off does not remove friends you already have."* Follow the file's existing settings-row markup exactly.

- [ ] **Step 3: Verify and commit**

Run: `npx tsc -b`, `npm test`; from `server/`: `npm test`. With `preview_start`, confirm the toggle renders and persists.

```bash
git add server/src/accounts.js server/src/index.js src/pages/student/Account.tsx
git commit -m "Choose whether your year can find you"
```

---

### Task 11: Connect Facebook

Built now, dark until Meta approves. The button must be honest about that rather than appearing broken.

**Files:**
- Modify: `server/schema.sql`
- Create: `server/src/facebook.js`
- Create: `server/src/facebook.test.js`
- Modify: `server/src/index.js`
- Modify: `src/components/social/FriendsPanel.tsx`

**Interfaces:**
- Produces: `matchFriends(fbFriendIds, linkedRows) -> string[]` (pure); `linkAccount`, `unlinkAccount`, `deletionCallback` (async).

- [ ] **Step 1: Add the schema**

```sql
/* Only the app-scoped Facebook id, and only while the student wants the link.
   Name, photo and email are already on the account; copying Facebook's copies
   would widen what we hold for nothing. `unlinked_at` records that a deletion
   request was honoured, which Meta requires us to be able to show. */
CREATE TABLE IF NOT EXISTS facebook_links (
  user_id     VARCHAR(64) PRIMARY KEY,
  fb_user_id  VARCHAR(64) NOT NULL UNIQUE,
  linked_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unlinked_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

- [ ] **Step 2: Write the failing test**

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { matchFriends } from './facebook.js'

test('only friends who have linked this app are matched', () => {
  const linked = [{ userId: 'u1', fbUserId: 'fb1' }, { userId: 'u2', fbUserId: 'fb2' }]
  assert.deepEqual(matchFriends(['fb1', 'fb9'], linked), ['u1'])
})

test('nobody linked means nobody matched', () => {
  assert.deepEqual(matchFriends(['fb1'], []), [])
})

test('an empty friend list matches nobody', () => {
  assert.deepEqual(matchFriends([], [{ userId: 'u1', fbUserId: 'fb1' }]), [])
})
```

- [ ] **Step 3: Run it and watch it fail**

Run from `server/`: `node --test src/facebook.test.js` — FAIL, `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 4: Write `server/src/facebook.js`**

```js
import { pool } from './db.js'

/**
 * Which of a student's Facebook friends are here.
 *
 * `user_friends` only ever returns friends who have also signed into this app
 * and granted the same permission, so this intersection is the whole of the
 * matching — there is nothing to look up at Facebook beyond the list it gives.
 */
export function matchFriends(fbFriendIds, linkedRows) {
  const wanted = new Set(fbFriendIds ?? [])
  return (linkedRows ?? []).filter((row) => wanted.has(row.fbUserId)).map((row) => row.userId)
}

export async function linkAccount(userId, fbUserId) {
  if (!fbUserId) return { ok: false, reason: 'invalid_target' }
  await pool.query(
    `INSERT INTO facebook_links (user_id, fb_user_id) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE fb_user_id = VALUES(fb_user_id), unlinked_at = NULL`,
    [userId, String(fbUserId)],
  )
  return { ok: true }
}

export async function unlinkAccount(userId) {
  await pool.query('DELETE FROM facebook_links WHERE user_id = ?', [userId])
  return { ok: true }
}

/**
 * Meta's data-deletion callback.
 *
 * Required for App Review, and built with the link rather than after it: an
 * integration that can be connected but not disconnected is not one we should
 * ship.
 */
export async function deletionCallback(fbUserId) {
  await pool.query('DELETE FROM facebook_links WHERE fb_user_id = ?', [String(fbUserId)])
  return { ok: true }
}
```

- [ ] **Step 5: Run it and watch it pass**

Run from `server/`: `node --test src/facebook.test.js` — PASS, 3 tests. Then `npm test`.

- [ ] **Step 6: Add the button, behind the flag**

In `FriendsPanel.tsx`, add a **Connect Facebook** control inside the Find-friends panel, gated on `import.meta.env.VITE_FEATURE_FACEBOOK_FRIENDS === 'true'`. When the flag is off, render the explanation instead of the button:

```tsx
        <p className="text-[12.5px] leading-relaxed text-ink-3">
          {t('Finding friends through Facebook is waiting on Facebook’s own review. Use your invite link in the meantime.')}
        </p>
```

Do **not** add the Facebook SDK or a login call in this task. The OAuth handshake needs an approved app id, and adding a third-party script that cannot yet do anything is a privacy cost with no return. The server side and the flag are what this task delivers.

- [ ] **Step 7: Verify and commit**

Run: `npx tsc -b`, `npm test`; from `server/`: `npm test`.

```bash
git add server/schema.sql server/src/facebook.js server/src/facebook.test.js server/src/index.js src/components/social/FriendsPanel.tsx
git commit -m "Hold a Facebook link, and let it be taken away again"
```

---

## Out of scope, deliberately

- **The Facebook OAuth handshake and live matching.** Needs an approved Meta app id, Business verification, and a privacy policy URL. Task 11 builds everything on our side of that line; the flag is what turns it on.
- **Slices C–G** (essay questions, flashcards, histology, study parties, the word game), unchanged and still ordered as in the A+B spec.
