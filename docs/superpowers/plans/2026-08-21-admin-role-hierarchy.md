# Admin Role Hierarchy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the two-role console (`student | admin`) with a four-rank hierarchy — Super admin → Editor → Admin/Reviewer — where a super admin controls which tabs each role sees, and a reviewer's writes are confined to their assigned modules and years by the server.

**Architecture:** Four pure, dependency-free rule modules on the server (`roles`, `tabs`, `contentScope`, `stateMerge`), each mirrored by a TypeScript twin under `src/data/` so the browser can render the same decisions the server enforces. Each twin **declares** its own copy rather than importing the server module — that file is untyped JavaScript outside `src`, so importing it into app code would break both the Vite bundle and `tsc -b`. The two halves are held together by parity tests, which `tsconfig.app.json` excludes and which run on Node, where a cross-boundary import is fine. Every admin surface persists through `PUT /api/state/:key`; that one route grows a base-version check, a per-item tab check, and a per-item scope check, which is where all content authorisation happens.

**Tech Stack:** Node 24, Express 4, MariaDB (`mysql2`), React 19 + TypeScript, Vite. Tests: `node:test` + `node:assert/strict` on both sides.

## Global Constraints

- **Client tests:** `npm test` at repo root → `node --test --experimental-strip-types "src/**/*.test.ts"`. Run a single file with `node --test --experimental-strip-types src/data/adminRoles.test.ts`.
- **Server tests:** `cd server && npm test` → `node --test src/*.test.js`. Run a single file with `cd server && node --test src/roles.test.js`.
- **Server tests never touch the database.** Rules live in pure modules that import nothing from `db.js`; this is the existing convention stated in `server/src/identity.js:1-8`. Anything needing a connection is verified by running the app, not by a unit test.
- **Type-check:** `npm run build` (runs `tsc -b` then Vite). `src/**/*.test.ts` is excluded from `tsconfig.app.json`, so test files may import server `.js` modules.
- **Lint:** `npm run lint` (oxlint).
- **Migrations** are idempotent statements inside `migrate()` in `server/src/db.js`, guarded either by an `information_schema` lookup (for columns and indexes) or by a `schema_migrations` marker row (for data changes). Never a bare `ALTER`. `schema.sql` is also updated so a fresh database is correct from the start.
- **Super admin emails:** `doitrous@hotmail.com`, `info@doitrous.com`, supplied as `SUPER_ADMIN_EMAILS` (comma-separated). Never hardcoded in application code.
- **Every mutating admin route requires a written reason of 8+ characters**, stored in the audit. This is existing behaviour (`readReason` in `server/src/index.js`); new mutating routes follow it.
- **Commit style:** the repo uses imperative sentence subjects that state the behaviour, not `feat:` prefixes (see `git log`). Match it. End every commit message with:
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`

---

## File Structure

**New — server rule modules (pure, unit-tested):**

| File | Responsibility |
|---|---|
| `server/src/roles.js` | Ranks, effective role from email allowlist, who may set whom to what |
| `server/src/roles.test.js` | Every actor × target × new-role triple |
| `server/src/tabs.js` | The tab registry, per-role defaults, state-key → tab, item → tab |
| `server/src/tabs.test.js` | Registry integrity, default sets, key and item resolution |
| `server/src/contentScope.js` | Year normalisation, an item's module/year tags, writability |
| `server/src/contentScope.test.js` | Intersection, untagged items, retag attacks, three year forms |
| `server/src/stateMerge.js` | Collection adapters, diff, authorise, merge |
| `server/src/stateMerge.test.js` | Concurrent edits, conflicts, refusals, whole-request atomicity |

**New — client mirrors and surfaces:**

| File | Responsibility |
|---|---|
| `src/data/adminRoles.ts` | Client twin of `roles.js` — ranks, assignable roles, labels |
| `src/data/adminRoles.test.ts` | Behaviour, plus parity against `server/src/roles.js` |
| `src/data/adminTabs.ts` | Client twin of `tabs.js`, plus label, route and icon per tab |
| `src/data/adminTabs.test.ts` | Parity: same ids, routes, governance and role resolution |
| `src/data/contentScope.ts` | Client twin of `contentScope.js` — used to filter, never to authorise |
| `src/data/contentScope.test.ts` | Parity against `server/src/contentScope.js` |
| `src/lib/useScopedContent.ts` | `useScopedItems` / `useScopedConcepts` for the six content pages |
| `src/pages/admin/AccessControl.tsx` | The tabs × roles matrix, super admin only |
| `src/components/admin/ReviewerScopeEditor.tsx` | Module and year assignment for one reviewer |
| `src/data/practicalScope.test.ts` | A practical reports the placement it was tagged with |

**Modified:**

| File | Change |
|---|---|
| `server/schema.sql:52` | `role` enum widens; `content_scope` column added |
| `server/src/db.js` | Idempotent migration for both |
| `server/src/auth.js` | Effective role, rank, scope on `req.identity`; MFA by rank; `requireTab` |
| `server/src/index.js` | `requireTab` per route; state routes gain version, merge, gates; role/scope endpoints |
| `server/src/accounts.js:508` | `setRole` takes the actor's rank; `setContentScope` added |
| `src/lib/useIdentity.tsx:66` | `role` widens; `tabs` and `scope` carried |
| `src/components/auth/RequireAuth.tsx` | Console access by rank; MFA redirect |
| `src/lib/stateStore.ts` | Track loaded version, send it, handle 409 |
| `src/components/shell/nav.ts` | Derived from `adminTabs.ts` filtered by held tabs |
| `src/router.tsx:172` | Admin routes derived from the registry |
| `src/pages/admin/UsersManagement.tsx` | Role control by rank; scope editor |
| `src/components/admin/AccountAccessPanel.tsx` | Repointed at the guarded role endpoint |
| `src/data/contentControl.ts:317` | `PracticalCommon` gains `moduleIds`, `yearIds` |
| `src/components/admin/PracticalEditorDialog.tsx` | Module and year pickers |
| `src/pages/admin/QuestionsSetup.tsx`, Library Setup, `PracticalSetup.tsx`, `ResourcesSetup.tsx`, `ConceptsSetup.tsx`, `MediaRequests.tsx` | Lists filtered to the caller's scope |

---

## Task 1: Widen the role enum and add content scope

**Files:**
- Modify: `server/schema.sql:52`
- Modify: `server/src/db.js` (inside `migrate()`, after the `mfa_required` block)

**Interfaces:**
- Consumes: nothing.
- Produces: `user_access.role` accepts `student | reviewer | admin | editor`; `user_access.content_scope` is a nullable JSON column holding `{ "moduleIds": string[], "yearIds": string[] }`.

- [ ] **Step 1: Widen the enum in `schema.sql`**

Replace line 52 of `server/schema.sql`:

```sql
  role          ENUM('student','reviewer','admin','editor') NOT NULL DEFAULT 'student',
```

And add a column after `mfa_required` (line 56):

```sql
  -- Which modules and years a reviewer may write. NULL means none: a reviewer
  -- with no assignment holds no content. Editors and super admins ignore it.
  content_scope JSON NULL,
```

- [ ] **Step 2: Add the idempotent migration**

In `server/src/db.js`, immediately after the `mfa_required` block (which ends with the closing `}` of `if (!mfaColumn.length)`), insert:

```js
    // The console grew from two roles to four. MODIFY is safe to repeat: it is
    // the same definition every boot, and it never narrows, so an existing
    // 'admin' or 'student' row keeps its value.
    const [roleColumn] = await conn.query(
      `SELECT COLUMN_TYPE AS type FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = 'user_access' AND column_name = 'role'`,
    )
    if (roleColumn.length && !roleColumn[0].type.includes("'editor'")) {
      await conn.query(
        `ALTER TABLE user_access MODIFY COLUMN role
           ENUM('student','reviewer','admin','editor') NOT NULL DEFAULT 'student'`,
      )
    }

    // What a reviewer may write. Added by lookup, like every column above, so a
    // database restored from a dump that already has it still boots.
    const [scopeColumn] = await conn.query(
      `SELECT 1 FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = 'user_access' AND column_name = 'content_scope'`,
    )
    if (!scopeColumn.length) {
      await conn.query('ALTER TABLE user_access ADD COLUMN content_scope JSON NULL AFTER mfa_required')
    }
```

- [ ] **Step 3: Verify it parses**

Run: `cd server && node --check src/db.js`
Expected: no output.

- [ ] **Step 4: Verify against the database — on deploy, not locally**

There are no database credentials in this worktree (`server/.env.example` only), so this cannot be checked here. `migrate()` runs at server boot (`server/src/index.js:1414`), so the change applies on the next Coolify deploy. After that deploy, confirm both landed:

```sql
SELECT COLUMN_NAME, COLUMN_TYPE FROM information_schema.columns
 WHERE table_schema = DATABASE() AND table_name = 'user_access'
   AND COLUMN_NAME IN ('role', 'content_scope');
```

Expected: `role` reads `enum('student','reviewer','admin','editor')`. **`content_scope` reads `longtext`, not `json`** — MariaDB implements JSON as a LONGTEXT alias with a validity constraint, and `information_schema` reports the underlying type. That is correct, not a failed migration.

Idempotency is proven by the second boot rather than a second command: both guards are existence checks, so a restart re-runs them and does nothing.

- [ ] **Step 5: Commit**

```bash
git add server/schema.sql server/src/db.js
git commit -m "$(cat <<'EOF'
Make room for two roles the console did not have

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: The rank rule

**Files:**
- Create: `server/src/roles.js`
- Create: `server/src/roles.test.js`
- Create: `src/data/adminRoles.ts`
- Create: `src/data/adminRoles.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `ROLE_RANK: Record<'student'|'reviewer'|'admin'|'editor'|'super_admin', number>`
  - Role management starts at rank 2 (`ROLE_MANAGER_RANK`), module-private
  - `CONSOLE_ROLES: string[]` — every role with rank ≥ 1
  - `STORED_ROLES: string[]` — the four values the enum accepts
  - `parseSuperAdminEmails(raw: string): string[]`
  - `effectiveRole(email, storedRole, superAdminEmails): string`
  - `rank(role: string): number`
  - `canSetRole(actorRole, targetRole, nextRole): boolean`
  - `assignableRoles(actorRole, targetRole = 'student'): string[]` — defined via `canSetRole`, so a control cannot offer what the route would refuse
  - `hasConsoleAccess(role): boolean`

- [ ] **Step 1: Write the failing server test**

Create `server/src/roles.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  CONSOLE_ROLES, STORED_ROLES, assignableRoles, canSetRole, effectiveRole,
  hasConsoleAccess, parseSuperAdminEmails, rank,
} from './roles.js'

const ALLOW = ['doitrous@hotmail.com', 'info@doitrous.com']

test('an allowlisted email is a super admin whatever the row says', () => {
  assert.equal(effectiveRole('doitrous@hotmail.com', 'student', ALLOW), 'super_admin')
  assert.equal(effectiveRole('INFO@DOITROUS.COM', 'admin', ALLOW), 'super_admin')
  assert.equal(effectiveRole(' info@doitrous.com ', null, ALLOW), 'super_admin')
})

test('everyone else is whatever their row says, and an unknown role is a student', () => {
  assert.equal(effectiveRole('someone@example.com', 'editor', ALLOW), 'editor')
  assert.equal(effectiveRole('someone@example.com', 'nonsense', ALLOW), 'student')
  assert.equal(effectiveRole(null, 'admin', ALLOW), 'admin')
})

test('an empty allowlist mints no super admins', () => {
  assert.equal(effectiveRole('doitrous@hotmail.com', 'admin', []), 'admin')
  assert.deepEqual(parseSuperAdminEmails(''), [])
  assert.deepEqual(parseSuperAdminEmails('  '), [])
  assert.deepEqual(parseSuperAdminEmails('A@b.com, c@d.com ,'), ['a@b.com', 'c@d.com'])
})

test('reviewer and admin are peers, and neither can touch the other', () => {
  assert.equal(rank('reviewer'), rank('admin'))
  assert.equal(canSetRole('admin', 'reviewer', 'student'), false)
  assert.equal(canSetRole('reviewer', 'admin', 'student'), false)
})

test('an editor may promote and demote below itself', () => {
  assert.equal(canSetRole('editor', 'student', 'reviewer'), true)
  assert.equal(canSetRole('editor', 'student', 'admin'), true)
  assert.equal(canSetRole('editor', 'reviewer', 'admin'), true)
  assert.equal(canSetRole('editor', 'admin', 'student'), true)
})

test('an editor can neither create nor remove another editor', () => {
  assert.equal(canSetRole('editor', 'student', 'editor'), false)
  assert.equal(canSetRole('editor', 'editor', 'student'), false)
  assert.equal(canSetRole('editor', 'editor', 'admin'), false)
})

test('nobody may reach past their own rank', () => {
  assert.equal(canSetRole('editor', 'student', 'super_admin'), false)
  assert.equal(canSetRole('admin', 'student', 'reviewer'), false)
  assert.equal(canSetRole('reviewer', 'student', 'student'), false)
  assert.equal(canSetRole('student', 'student', 'student'), false)
})

test('a super admin may set any stored role on anyone below', () => {
  for (const target of ['student', 'reviewer', 'admin', 'editor']) {
    for (const next of STORED_ROLES) {
      assert.equal(canSetRole('super_admin', target, next), true, `${target} → ${next}`)
    }
  }
})

test('super admin is not a stored role, so it can never be assigned or removed', () => {
  assert.equal(STORED_ROLES.includes('super_admin'), false)
  assert.equal(canSetRole('super_admin', 'super_admin', 'student'), false)
  assert.equal(canSetRole('super_admin', 'admin', 'super_admin'), false)
})

test('the roles offered are exactly the roles that would be accepted', () => {
  for (const actor of ['student', 'reviewer', 'admin', 'editor', 'super_admin']) {
    for (const next of STORED_ROLES) {
      const offered = assignableRoles(actor).includes(next)
      assert.equal(offered, canSetRole(actor, 'student', next), `${actor} offering ${next}`)
    }
  }
  assert.deepEqual(assignableRoles('editor'), ['student', 'reviewer', 'admin'])
  assert.deepEqual(assignableRoles('admin'), [])
})

test('console access starts at reviewer', () => {
  assert.deepEqual(CONSOLE_ROLES, ['reviewer', 'admin', 'editor', 'super_admin'])
  assert.equal(hasConsoleAccess('student'), false)
  assert.equal(hasConsoleAccess('reviewer'), true)
  assert.equal(hasConsoleAccess('super_admin'), true)
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd server && node --test src/roles.test.js`
Expected: FAIL — `Cannot find module './roles.js'`

- [ ] **Step 3: Write `server/src/roles.js`**

```js
/**
 * Who outranks whom, and what follows from that.
 *
 * No database, no Express, no imports — the same split `identity.js` makes, for
 * the same reason: rules that need a driver loaded to be tested do not get
 * tested. `auth.js` reads these; the client mirrors them in
 * `src/data/adminRoles.ts` and a parity test holds the two together.
 *
 * `super_admin` is deliberately absent from `STORED_ROLES`. It is derived from
 * the signed-in email, so there is no row to write — which is what makes it
 * neither grantable nor removable, by anyone, including another super admin.
 */

export const ROLE_RANK = {
  student: 0,
  reviewer: 1,
  admin: 1,
  editor: 2,
  super_admin: 3,
}

/** The four values `user_access.role` accepts. Ordered by rank, then by name. */
export const STORED_ROLES = ['student', 'reviewer', 'admin', 'editor']

/** Every role that may open the admin console at all. */
export const CONSOLE_ROLES = ['reviewer', 'admin', 'editor', 'super_admin']

export function rank(role) {
  return ROLE_RANK[role] ?? 0
}

export function hasConsoleAccess(role) {
  return rank(role) >= 1
}

/** `SUPER_ADMIN_EMAILS`, split and lowercased. Blank entries are dropped. */
export function parseSuperAdminEmails(raw) {
  return String(raw ?? '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean)
}

/**
 * The role this identity actually has.
 *
 * The allowlist wins over the row, so a super admin whose row says `student`
 * is still a super admin — there is no state a database edit could put them in
 * that locks them out.
 */
export function effectiveRole(email, storedRole, superAdminEmails) {
  const address = String(email ?? '').trim().toLowerCase()
  if (address && superAdminEmails.includes(address)) return 'super_admin'
  return STORED_ROLES.includes(storedRole) ? storedRole : 'student'
}

/**
 * Whether `actorRole` may change `targetRole` into `nextRole`.
 *
 * Two tests, and every stated rule falls out of them: you must outrank the
 * person you are changing, and you must outrank what you are making them. The
 * second is what stops an editor creating a peer it could never demote.
 */
export function canSetRole(actorRole, targetRole, nextRole) {
  if (!STORED_ROLES.includes(nextRole)) return false
  return rank(actorRole) > rank(targetRole) && rank(actorRole) > rank(nextRole)
}

/** The roles this actor may hand out, for rendering a control that cannot lie. */
export function assignableRoles(actorRole) {
  return STORED_ROLES.filter((role) => rank(actorRole) > rank(role))
}
```

- [ ] **Step 4: Run the server test to verify it passes**

Run: `cd server && node --test src/roles.test.js`
Expected: PASS — 13 tests.

- [ ] **Step 5: Write the client mirror `src/data/adminRoles.ts`**

```ts
/**
 * The client's twin of `server/src/roles.js`.
 *
 * The server is the authority; this exists so a control is never drawn for an
 * action the API would refuse. `adminRoles.test.ts` imports both and asserts
 * they agree, so the two cannot drift apart silently.
 */

export type StoredRole = 'student' | 'reviewer' | 'admin' | 'editor'
export type EffectiveRole = StoredRole | 'super_admin'

export const ROLE_RANK: Record<EffectiveRole, number> = {
  student: 0,
  reviewer: 1,
  admin: 1,
  editor: 2,
  super_admin: 3,
}

export const STORED_ROLES: StoredRole[] = ['student', 'reviewer', 'admin', 'editor']
export const CONSOLE_ROLES: EffectiveRole[] = ['reviewer', 'admin', 'editor', 'super_admin']

/** How each role is named on screen. Super admin is stated, never offered. */
export const ROLE_LABEL: Record<EffectiveRole, string> = {
  student: 'Student',
  reviewer: 'Reviewer',
  admin: 'Admin',
  editor: 'Editor',
  super_admin: 'Super admin',
}

export function rank(role: string): number {
  return ROLE_RANK[role as EffectiveRole] ?? 0
}

export function hasConsoleAccess(role: string): boolean {
  return rank(role) >= 1
}

export function canSetRole(actorRole: string, targetRole: string, nextRole: string): boolean {
  if (!STORED_ROLES.includes(nextRole as StoredRole)) return false
  return rank(actorRole) > rank(targetRole) && rank(actorRole) > rank(nextRole)
}

export function assignableRoles(actorRole: string): StoredRole[] {
  return STORED_ROLES.filter((role) => rank(actorRole) > rank(role))
}
```

- [ ] **Step 6: Write the parity test `src/data/adminRoles.test.ts`**

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { ROLE_LABEL, ROLE_RANK, STORED_ROLES, assignableRoles, canSetRole, rank } from './adminRoles.ts'
import * as server from '../../server/src/roles.js'

test('the client agrees with the server about rank', () => {
  assert.deepEqual(ROLE_RANK, server.ROLE_RANK)
  assert.deepEqual(STORED_ROLES, server.STORED_ROLES)
})

test('the client agrees with the server about every possible role change', () => {
  const roles = ['student', 'reviewer', 'admin', 'editor', 'super_admin']
  for (const actor of roles) {
    for (const target of roles) {
      for (const next of roles) {
        assert.equal(
          canSetRole(actor, target, next),
          server.canSetRole(actor, target, next),
          `${actor} changing ${target} to ${next}`,
        )
      }
    }
    assert.deepEqual(assignableRoles(actor), server.assignableRoles(actor))
  }
})

test('every role a control can offer has a label to offer it under', () => {
  for (const role of Object.keys(ROLE_RANK)) assert.ok(ROLE_LABEL[role as keyof typeof ROLE_LABEL])
  assert.equal(rank('nonsense'), 0)
})
```

- [ ] **Step 7: Run the client test to verify it passes**

Run: `node --test --experimental-strip-types src/data/adminRoles.test.ts`
Expected: PASS — 3 tests.

- [ ] **Step 8: Commit**

```bash
git add server/src/roles.js server/src/roles.test.js src/data/adminRoles.ts src/data/adminRoles.test.ts
git commit -m "$(cat <<'EOF'
Say who may change whom, in one rule both sides read

Two tests decide every role change: you must outrank the person you are
changing, and you must outrank what you are making them. The editor who
cannot create a peer and the editor who cannot demote one are the same
test, not two rules that could disagree.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

> **Amended during execution.** Two refinements came out of writing the tests, and both are in the shipped code:
>
> 1. `assignableRoles` takes the **target** as well as the actor. Without it, an actor who merely outranks a student was offered "student" — a change that does nothing, rendered as a one-option dropdown. It is now defined as `STORED_ROLES.filter((role) => canSetRole(actor, target, role))`, so the control and the route cannot disagree by construction.
> 2. Role management requires **rank ≥ 2** (`ROLE_MANAGER_RANK`). Outranking somebody is not enough: the brief gives promote/demote to Super admin and Editor only, so an Admin or Reviewer now has none of it — even over a student. Admin keeps the rest of the Users tab; promotion is the one thing that is not theirs.

## Task 3: Give every request its real role, rank and scope

**Files:**
- Modify: `server/src/auth.js`

**Interfaces:**
- Consumes: `roles.js` from Task 2; `user_access.content_scope` from Task 1.
- Produces: `req.identity` gains `role` (now the *effective* role), `rank: number`, and `contentScope: { moduleIds: string[], yearIds: string[] } | null`. Exports `requireConsole(req, res, next)`, `requireSuperAdmin(req, res, next)`, and keeps `mfaSatisfied(identity)` with new meaning.

- [ ] **Step 1: Replace the identity resolution in `server/src/auth.js`**

Add the import at the top, beside the existing ones:

```js
import { effectiveRole, hasConsoleAccess, parseSuperAdminEmails, rank as rankOf } from './roles.js'
```

Below the existing `const jwks = ...` line, add:

```js
const superAdminEmails = parseSuperAdminEmails(process.env.SUPER_ADMIN_EMAILS)
if (!superAdminEmails.length) {
  // Loud, and then carry on. An empty allowlist means nobody is a super admin,
  // which is survivable; refusing to boot over it is not.
  console.warn('SUPER_ADMIN_EMAILS is empty — no account will hold super admin.')
}

/** Whatever was stored in `content_scope`, made safe to read. */
function readContentScope(raw) {
  if (raw == null) return null
  const parsed = typeof raw === 'string' ? safeParse(raw) : raw
  if (!parsed || typeof parsed !== 'object') return null
  const list = (value) => (Array.isArray(value) ? value.filter((entry) => typeof entry === 'string' && entry.trim()) : [])
  const moduleIds = list(parsed.moduleIds)
  const yearIds = list(parsed.yearIds)
  return moduleIds.length || yearIds.length ? { moduleIds, yearIds } : null
}

function safeParse(value) {
  try { return JSON.parse(value) } catch { return null }
}
```

Then in `supabaseIdentity`, change the `SELECT` and the returned object:

```js
  const [rows] = await pool.query(
    'SELECT role, status, mfa_required, content_scope FROM user_access WHERE user_id = ?',
    [userId],
  )
  const access = rows[0]
  if (!access || access.status !== 'active') return null
  const role = effectiveRole(email, access.role, superAdminEmails)
  return {
    id: userId,
    email,
    role,
    rank: rankOf(role),
    // Editors and super admins are never scoped; only a reviewer's writes are
    // confined, and a reviewer with nothing assigned holds nothing.
    contentScope: rankOf(role) >= 2 ? null : readContentScope(access.content_scope),
    aal: payload.aal === 'aal2' ? 'aal2' : 'aal1',
    mfaRequired: Boolean(access.mfa_required),
  }
```

- [ ] **Step 2: Replace the guards at the bottom of `server/src/auth.js`**

Delete `requireAdmin` and replace it, keeping `requireAuthenticated` as it is:

```js
/**
 * Whether this identity has cleared its second-factor requirement.
 *
 * MFA used to be opt-in for everyone. It is now a consequence of rank: any
 * account that can open the console must present aal2, because the console
 * decides who else can open it. The `mfa_required` column survives for students
 * who asked for a second factor voluntarily.
 */
export function mfaSatisfied(identity) {
  if (!identity) return false
  if (hasConsoleAccess(identity.role)) return identity.aal === 'aal2'
  return !identity.mfaRequired || identity.aal === 'aal2'
}

/** Any console role at all. Not sufficient on its own — see `requireTab`. */
export function requireConsole(req, res, next) {
  if (!hasConsoleAccess(req.identity?.role)) return res.status(403).json({ error: 'console access required' })
  if (!mfaSatisfied(req.identity)) return res.status(403).json({ error: 'mfa_required' })
  return next()
}

export function requireSuperAdmin(req, res, next) {
  if (req.identity?.role !== 'super_admin') return res.status(403).json({ error: 'super admin required' })
  if (!mfaSatisfied(req.identity)) return res.status(403).json({ error: 'mfa_required' })
  return next()
}

/** Explicit route-level guard for student/staff-only files. */
export function requireAuthenticated(req, res, next) {
  if (!req.identity) return res.status(401).json({ error: 'unauthorized' })
  return next()
}
```

- [ ] **Step 3: Keep the server importable while `requireAdmin` still has callers**

`server/src/index.js` imports `requireAdmin` on line 11 and uses it on roughly 40 routes; Task 5 replaces those. Until then, add a temporary alias at the end of `auth.js` so the app still boots:

```js
/** Temporary: every caller moves to `requireTab` in Task 5, then this goes. */
export const requireAdmin = requireConsole
```

- [ ] **Step 4: Verify the server still boots and answers**

Run: `cd server && npm test`
Expected: PASS — the existing suites (`accounts`, `assistant`, `datetime`, `identity`, `storage`, `assistantProviders`) plus `roles`, all green.

Run: `cd server && node -e "import('./src/auth.js').then((m)=>console.log(typeof m.requireConsole, typeof m.requireSuperAdmin, typeof m.mfaSatisfied))"`
Expected: `function function function`

- [ ] **Step 5: Commit**

```bash
git add server/src/auth.js
git commit -m "$(cat <<'EOF'
Read the role from the allowlist before the row

A super admin whose row says 'student' is still a super admin, because
the allowlist wins. There is no state a database edit can put those two
accounts in that locks them out. MFA stops being a flag somebody opts
into and becomes a consequence of holding console access.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: The tab registry

**Files:**
- Create: `server/src/tabs.js`
- Create: `server/src/tabs.test.js`
- Create: `src/data/adminTabs.ts`
- Create: `src/data/adminTabs.test.ts`

**Interfaces:**
- Consumes: `roles.js` from Task 2.
- Produces:
  - `ADMIN_TABS: Array<{ id, group, stateKeys: string[], apiPrefixes: string[], superAdminOnly?: boolean }>`
  - `TAB_IDS: string[]`
  - `DEFAULT_ROLE_TABS: Record<'editor'|'admin'|'reviewer', string[]>`
  - `ROLE_TABS_STATE_KEY = 'synapse-role-tabs-v1'`
  - `tabsForRole(role, storedConfig): string[]`
  - `tabsForStateKey(key): string[]` — empty array means no tab owns it
  - `holdsTab(heldTabs, wantedTabs): boolean`
- Client `src/data/adminTabs.ts` produces `ADMIN_TAB_VIEWS: Array<{ id, label, to, icon, group }>` and `tabViewsFor(role, storedConfig)`.

- [ ] **Step 1: Write the failing server test**

Create `server/src/tabs.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ADMIN_TABS, DEFAULT_ROLE_TABS, ROLE_TABS_STATE_KEY, TAB_IDS,
  holdsTab, tabsForRole, tabsForStateKey,
} from './tabs.js'

test('every tab id is unique and every route is unique', () => {
  assert.equal(new Set(TAB_IDS).size, TAB_IDS.length)
  const routes = ADMIN_TABS.map((tab) => tab.to)
  assert.equal(new Set(routes).size, routes.length)
})

test('a super admin holds every tab, and nothing stored can take one away', () => {
  assert.deepEqual(tabsForRole('super_admin', null), TAB_IDS)
  assert.deepEqual(tabsForRole('super_admin', { super_admin: [] }), TAB_IDS)
  assert.deepEqual(tabsForRole('super_admin', { editor: [] }), TAB_IDS)
})

test('an editor holds everything except the super-admin-only tabs', () => {
  const held = tabsForRole('editor', null)
  const superOnly = ADMIN_TABS.filter((tab) => tab.superAdminOnly).map((tab) => tab.id)
  assert.deepEqual(superOnly, ['settings', 'audit', 'access'])
  for (const id of superOnly) assert.equal(held.includes(id), false)
  assert.equal(held.length, TAB_IDS.length - superOnly.length)
})

test('admin is operations and reviewer is content, and they barely overlap', () => {
  const admin = new Set(tabsForRole('admin', null))
  const reviewer = new Set(tabsForRole('reviewer', null))
  assert.equal(admin.has('users'), true)
  assert.equal(admin.has('questions'), false)
  assert.equal(reviewer.has('questions'), true)
  assert.equal(reviewer.has('media'), true)
  assert.equal(reviewer.has('users'), false)
  assert.equal(reviewer.has('dashboard'), false)
  // Systems & Topics is editor-and-above this phase: its nodes carry no module
  // or year, so a reviewer's scope could not be enforced on it.
  assert.equal(reviewer.has('taxonomy'), false)
  assert.deepEqual([...admin].filter((id) => reviewer.has(id)), [])
})

test('a student holds nothing', () => {
  assert.deepEqual(tabsForRole('student', null), [])
  assert.deepEqual(tabsForRole('nonsense', null), [])
})

test('a stored configuration replaces a role default, and junk in it is ignored', () => {
  assert.deepEqual(tabsForRole('reviewer', { reviewer: ['questions', 'nope'] }), ['questions'])
  assert.deepEqual(tabsForRole('reviewer', { reviewer: [] }), [])
  // A super-admin-only tab cannot be handed out by configuration.
  assert.deepEqual(tabsForRole('editor', { editor: ['settings', 'questions'] }), ['questions'])
  // A role the document does not mention keeps its default.
  assert.deepEqual(tabsForRole('admin', { reviewer: [] }), tabsForRole('admin', null))
  assert.deepEqual(tabsForRole('admin', 'nonsense'), tabsForRole('admin', null))
})

test('the tabs are returned in registry order, so the first one is predictable', () => {
  const held = tabsForRole('reviewer', null)
  assert.deepEqual(held, TAB_IDS.filter((id) => held.includes(id)))
  assert.equal(held[0], 'library')
})

test('a state key resolves to the tabs that may write it', () => {
  assert.deepEqual(tabsForStateKey('synapse-vouchers-v1'), ['vouchers'])
  assert.deepEqual(
    tabsForStateKey('synapse-admin-content-ledger-v4'),
    ['library', 'questions', 'practical', 'resources', 'media'],
  )
  assert.deepEqual(tabsForStateKey(ROLE_TABS_STATE_KEY), ['access'])
})

test('an unregistered key belongs to no tab, so only a super admin may write it', () => {
  assert.deepEqual(tabsForStateKey('synapse-something-nobody-declared'), [])
  assert.equal(holdsTab(tabsForRole('editor', null), []), false)
  assert.equal(holdsTab(tabsForRole('editor', null), ['questions']), true)
  assert.equal(holdsTab(tabsForRole('admin', null), ['questions']), false)
  assert.equal(holdsTab(tabsForRole('admin', null), ['questions', 'users']), true)
})

test('every declared state key and api prefix is claimed by exactly one owner list', () => {
  for (const tab of ADMIN_TABS) {
    for (const key of tab.stateKeys) assert.ok(tabsForStateKey(key).includes(tab.id), `${key} → ${tab.id}`)
    for (const prefix of tab.apiPrefixes) assert.ok(prefix.startsWith('/api/'), prefix)
  }
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd server && node --test src/tabs.test.js`
Expected: FAIL — `Cannot find module './tabs.js'`

- [ ] **Step 3: Write `server/src/tabs.js`**

```js
/**
 * Every admin surface, what it governs, and who holds it by default.
 *
 * The sidebar, the router and the server guards used to be three independent
 * lists, which is three answers to one question. This is the single list they
 * all derive from: the client mirrors the presentation half in
 * `src/data/adminTabs.ts`, and a parity test asserts the ids match exactly.
 *
 * `stateKeys` is what makes hiding a tab mean something. A tab you cannot see
 * is a tab whose documents you cannot write, so removing it removes the
 * capability rather than only the link.
 */

import { rank } from './roles.js'

export const ROLE_TABS_STATE_KEY = 'synapse-role-tabs-v1'

export const ADMIN_TABS = [
  { id: 'dashboard', to: '/admin', group: 'Overview', stateKeys: [], apiPrefixes: [] },

  { id: 'taxonomy', to: '/admin/taxonomy', group: 'Content',
    stateKeys: ['synapse-taxonomy-tree-v4', 'synapse-medical-library-taxonomy-v1'], apiPrefixes: [] },
  { id: 'glossary', to: '/admin/glossary', group: 'Content',
    stateKeys: ['synapse-medical-glossary-v1'], apiPrefixes: [] },
  { id: 'academic', to: '/admin/academic', group: 'Content',
    stateKeys: ['synapse-academic-universities-v1', 'synapse-course-curricula-v1', 'synapse-module-schedules-v1'],
    apiPrefixes: [] },
  { id: 'marks', to: '/admin/academic/marks', group: 'Content',
    stateKeys: ['synapse-module-subjects-v1'], apiPrefixes: [] },
  { id: 'library', to: '/admin/library', group: 'Content',
    stateKeys: [
      'synapse-admin-content-ledger-v4',
      'synapse-medical-evidence-v1',
      'synapse-medical-evidence-published-v1',
      'synapse-import-journal-v1',
    ],
    apiPrefixes: ['/api/medical-library/coverage'] },
  { id: 'questions', to: '/admin/questions', group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'adaptive', to: '/admin/adaptive', group: 'Content',
    stateKeys: ['synapse-adaptive-config-v1', 'synapse-adaptive-blueprints-v1', 'synapse-adaptive-heldout-v1'],
    apiPrefixes: [] },
  { id: 'practical', to: '/admin/practical', group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'concepts', to: '/admin/concepts', group: 'Content',
    stateKeys: ['synapse-concept-graph-v2', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'relationships', to: '/admin/relationships', group: 'Content',
    stateKeys: ['synapse-concept-graph-v2', 'synapse-relation-types-v1', 'synapse-import-journal-v1'],
    apiPrefixes: [] },
  { id: 'resources', to: '/admin/resources', group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4'], apiPrefixes: ['/api/medical-resources'] },
  { id: 'media', to: '/admin/library/media', group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4'], apiPrefixes: [] },
  { id: 'reports', to: '/admin/reports', group: 'Content',
    stateKeys: ['synapse-content-reports-v1'], apiPrefixes: [] },

  { id: 'email', to: '/admin/email', group: 'Operations',
    stateKeys: ['synapse-email-automations-v1'], apiPrefixes: [] },
  { id: 'mailbox', to: '/admin/mailbox', group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/mail', '/api/mailboxes'] },
  { id: 'notifications', to: '/admin/notifications', group: 'Operations',
    stateKeys: ['synapse-notification-campaigns-v1'], apiPrefixes: [] },
  { id: 'users', to: '/admin/users', group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/admin/users', '/api/access/users'] },
  { id: 'students', to: '/admin/students', group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/students'] },
  { id: 'payments', to: '/admin/payments', group: 'Operations',
    stateKeys: ['synapse-plans-v1', 'synapse-plan-catalog-v1', 'synapse-student-id-discount-v1'],
    apiPrefixes: [] },
  { id: 'vouchers', to: '/admin/vouchers', group: 'Operations',
    stateKeys: ['synapse-vouchers-v1'], apiPrefixes: [] },
  { id: 'assistant', to: '/admin/assistant', group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/admin/assistant'] },
  { id: 'privacy', to: '/admin/privacy', group: 'Operations', stateKeys: [], apiPrefixes: [] },

  { id: 'settings', to: '/admin/settings', group: 'Governance', superAdminOnly: true,
    stateKeys: ['synapse-storage-limits-v1', 'synapse-system-colors-v1'], apiPrefixes: [] },
  { id: 'audit', to: '/admin/audit', group: 'Governance', superAdminOnly: true,
    stateKeys: [], apiPrefixes: ['/api/backups', '/api/launch'] },
  { id: 'access', to: '/admin/access', group: 'Governance', superAdminOnly: true,
    stateKeys: [ROLE_TABS_STATE_KEY], apiPrefixes: [] },
]

export const TAB_IDS = ADMIN_TABS.map((tab) => tab.id)

const SUPER_ADMIN_ONLY = new Set(ADMIN_TABS.filter((tab) => tab.superAdminOnly).map((tab) => tab.id))

/** Everything an editor could hold — the whole registry, minus governance. */
const EDITOR_TABS = TAB_IDS.filter((id) => !SUPER_ADMIN_ONLY.has(id))

const ADMIN_DEFAULT = [
  'dashboard', 'reports', 'email', 'mailbox', 'notifications',
  'users', 'students', 'payments', 'vouchers', 'assistant', 'privacy',
]

const REVIEWER_DEFAULT = ['library', 'questions', 'practical', 'concepts', 'resources', 'media']

export const DEFAULT_ROLE_TABS = {
  editor: EDITOR_TABS,
  admin: ADMIN_DEFAULT,
  reviewer: REVIEWER_DEFAULT,
}

/**
 * The tabs this role holds.
 *
 * A super admin's set is computed, never read from configuration — that is the
 * property that makes locking yourself out impossible. Everyone else takes the
 * stored list when there is one, and the default when there is not. A
 * super-admin-only tab is filtered out last, so no configuration can hand one
 * over.
 */
export function tabsForRole(role, storedConfig) {
  if (role === 'super_admin') return TAB_IDS
  if (rank(role) < 1) return []
  const stored = storedConfig && typeof storedConfig === 'object' ? storedConfig[role] : null
  const wanted = new Set(Array.isArray(stored) ? stored : DEFAULT_ROLE_TABS[role] ?? [])
  return TAB_IDS.filter((id) => wanted.has(id) && !SUPER_ADMIN_ONLY.has(id))
}

/** Which tabs may write this document. Empty means none — super admin only. */
export function tabsForStateKey(key) {
  return ADMIN_TABS.filter((tab) => tab.stateKeys.includes(key)).map((tab) => tab.id)
}

/** True when the caller holds at least one of the tabs that would permit this. */
export function holdsTab(heldTabs, wantedTabs) {
  if (!wantedTabs?.length) return false
  const held = new Set(heldTabs)
  return wantedTabs.some((id) => held.has(id))
}
```

- [ ] **Step 4: Run the server test to verify it passes**

Run: `cd server && node --test src/tabs.test.js`
Expected: PASS — 10 tests.

- [ ] **Step 5: Write the client mirror `src/data/adminTabs.ts`**

```ts
/**
 * The client's twin of `server/src/tabs.js`, plus the presentation the browser
 * needs — a label and an icon per tab.
 *
 * Declared rather than imported. The server module is plain JavaScript outside
 * `src`, so importing it here would put an untyped file into the Vite bundle
 * and fail `tsc -b`. `adminTabs.test.ts` imports both and asserts they agree;
 * test files are excluded from `tsconfig.app.json` and run on Node, which is
 * where a cross-boundary import belongs. Same arrangement as `adminRoles.ts`.
 */
import type { LucideIcon } from 'lucide-react'
import {
  Gauge, Network, Languages, GraduationCap, Scale, Library, FileQuestion, Compass,
  Stethoscope, Braces, GitFork, Clapperboard, ImagePlus, Flag, Mail, Inbox, BellRing,
  UserCog, Users, Banknote, TicketPercent, Bot, LifeBuoy, Settings, ShieldCheck, KeyRound,
} from 'lucide-react'
import { rank } from './adminRoles.ts'

export const ROLE_TABS_STATE_KEY = 'synapse-role-tabs-v1'

export type AdminTabGroup = 'Overview' | 'Content' | 'Operations' | 'Governance'

export interface AdminTabView {
  id: string
  label: string
  to: string
  icon: LucideIcon
  group: AdminTabGroup
  /** What this tab governs, shown on Access Control before somebody hides it. */
  stateKeys: string[]
  apiPrefixes: string[]
  superAdminOnly?: boolean
  end?: boolean
}

export const ADMIN_TAB_VIEWS: AdminTabView[] = [
  { id: 'dashboard', label: 'Control Dashboard', to: '/admin', icon: Gauge, group: 'Overview', end: true, stateKeys: [], apiPrefixes: [] },

  { id: 'taxonomy', label: 'Systems & Topics', to: '/admin/taxonomy', icon: Network, group: 'Content',
    stateKeys: ['synapse-taxonomy-tree-v4', 'synapse-medical-library-taxonomy-v1'], apiPrefixes: [] },
  { id: 'glossary', label: 'Glossary', to: '/admin/glossary', icon: Languages, group: 'Content',
    stateKeys: ['synapse-medical-glossary-v1'], apiPrefixes: [] },
  { id: 'academic', label: 'Academic Setup', to: '/admin/academic', icon: GraduationCap, group: 'Content',
    stateKeys: ['synapse-academic-universities-v1', 'synapse-course-curricula-v1', 'synapse-module-schedules-v1'], apiPrefixes: [] },
  { id: 'marks', label: 'Marks & Weights', to: '/admin/academic/marks', icon: Scale, group: 'Content',
    stateKeys: ['synapse-module-subjects-v1'], apiPrefixes: [] },
  { id: 'library', label: 'Library Setup', to: '/admin/library', icon: Library, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-medical-evidence-v1', 'synapse-medical-evidence-published-v1', 'synapse-import-journal-v1'],
    apiPrefixes: ['/api/medical-library/coverage'] },
  { id: 'questions', label: 'Questions Setup', to: '/admin/questions', icon: FileQuestion, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'adaptive', label: 'Adaptive Learning', to: '/admin/adaptive', icon: Compass, group: 'Content',
    stateKeys: ['synapse-adaptive-config-v1', 'synapse-adaptive-blueprints-v1', 'synapse-adaptive-heldout-v1'], apiPrefixes: [] },
  { id: 'practical', label: 'Practical Setup', to: '/admin/practical', icon: Stethoscope, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'concepts', label: 'Concepts', to: '/admin/concepts', icon: Braces, group: 'Content',
    stateKeys: ['synapse-concept-graph-v2', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'relationships', label: 'Relationships', to: '/admin/relationships', icon: GitFork, group: 'Content',
    stateKeys: ['synapse-concept-graph-v2', 'synapse-relation-types-v1', 'synapse-import-journal-v1'], apiPrefixes: [] },
  { id: 'resources', label: 'Resources & Media', to: '/admin/resources', icon: Clapperboard, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4'], apiPrefixes: ['/api/medical-resources'] },
  { id: 'media', label: 'Media Requests', to: '/admin/library/media', icon: ImagePlus, group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4'], apiPrefixes: [] },
  { id: 'reports', label: 'Content Reports', to: '/admin/reports', icon: Flag, group: 'Content',
    stateKeys: ['synapse-content-reports-v1'], apiPrefixes: [] },

  { id: 'email', label: 'Email & Automations', to: '/admin/email', icon: Mail, group: 'Operations',
    stateKeys: ['synapse-email-automations-v1'], apiPrefixes: [] },
  { id: 'mailbox', label: 'Mail Box', to: '/admin/mailbox', icon: Inbox, group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/mail', '/api/mailboxes'] },
  { id: 'notifications', label: 'Student Notifications', to: '/admin/notifications', icon: BellRing, group: 'Operations',
    stateKeys: ['synapse-notification-campaigns-v1'], apiPrefixes: [] },
  { id: 'users', label: 'Users', to: '/admin/users', icon: UserCog, group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/admin/users', '/api/access/users'] },
  { id: 'students', label: 'Students', to: '/admin/students', icon: Users, group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/students'] },
  { id: 'payments', label: 'Payments & Finance', to: '/admin/payments', icon: Banknote, group: 'Operations',
    stateKeys: ['synapse-plans-v1', 'synapse-plan-catalog-v1', 'synapse-student-id-discount-v1'], apiPrefixes: [] },
  { id: 'vouchers', label: 'Vouchers', to: '/admin/vouchers', icon: TicketPercent, group: 'Operations',
    stateKeys: ['synapse-vouchers-v1'], apiPrefixes: [] },
  { id: 'assistant', label: 'AI Assistant', to: '/admin/assistant', icon: Bot, group: 'Operations',
    stateKeys: [], apiPrefixes: ['/api/admin/assistant'] },
  { id: 'privacy', label: 'Privacy & Support', to: '/admin/privacy', icon: LifeBuoy, group: 'Operations',
    stateKeys: [], apiPrefixes: [] },

  { id: 'settings', label: 'Settings', to: '/admin/settings', icon: Settings, group: 'Governance', superAdminOnly: true,
    stateKeys: ['synapse-storage-limits-v1', 'synapse-system-colors-v1'], apiPrefixes: [] },
  { id: 'audit', label: 'Audit & Security', to: '/admin/audit', icon: ShieldCheck, group: 'Governance', superAdminOnly: true,
    stateKeys: [], apiPrefixes: ['/api/backups', '/api/launch'] },
  { id: 'access', label: 'Access Control', to: '/admin/access', icon: KeyRound, group: 'Governance', superAdminOnly: true,
    stateKeys: [ROLE_TABS_STATE_KEY], apiPrefixes: [] },
]

export const TAB_IDS: string[] = ADMIN_TAB_VIEWS.map((view) => view.id)

const SUPER_ADMIN_ONLY = new Set(ADMIN_TAB_VIEWS.filter((view) => view.superAdminOnly).map((view) => view.id))

export const DEFAULT_ROLE_TABS: Record<string, string[]> = {
  editor: TAB_IDS.filter((id) => !SUPER_ADMIN_ONLY.has(id)),
  admin: ['dashboard', 'reports', 'email', 'mailbox', 'notifications', 'users', 'students', 'payments', 'vouchers', 'assistant', 'privacy'],
  reviewer: ['library', 'questions', 'practical', 'concepts', 'resources', 'media'],
}

/** The tab ids this role holds. Mirrors `tabsForRole` in server/src/tabs.js. */
export function tabsForRole(role: string, storedConfig: unknown): string[] {
  if (role === 'super_admin') return TAB_IDS
  if (rank(role) < 1) return []
  const config = storedConfig && typeof storedConfig === 'object' ? storedConfig as Record<string, unknown> : null
  const stored = config?.[role]
  const wanted = new Set(Array.isArray(stored) ? stored as string[] : DEFAULT_ROLE_TABS[role] ?? [])
  return TAB_IDS.filter((id) => wanted.has(id) && !SUPER_ADMIN_ONLY.has(id))
}

const VIEW_BY_ID = new Map(ADMIN_TAB_VIEWS.map((view) => [view.id, view]))

/** The tabs this role holds, ready to render, in registry order. */
export function tabViewsFor(role: string, storedConfig: unknown): AdminTabView[] {
  return tabsForRole(role, storedConfig)
    .map((id) => VIEW_BY_ID.get(id))
    .filter((view): view is AdminTabView => Boolean(view))
}
```

- [ ] **Step 6: Write the parity test `src/data/adminTabs.test.ts`**

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { ADMIN_TAB_VIEWS, DEFAULT_ROLE_TABS, TAB_IDS, tabViewsFor, tabsForRole } from './adminTabs.ts'
import * as server from '../../server/src/tabs.js'

test('every registered tab has a label, a route and an icon', () => {
  assert.deepEqual(ADMIN_TAB_VIEWS.map((view) => view.id), TAB_IDS)
  for (const view of ADMIN_TAB_VIEWS) {
    assert.ok(view.label, `${view.id} has no label`)
    assert.ok(view.to.startsWith('/admin'), `${view.id} route: ${view.to}`)
    assert.ok(view.icon, `${view.id} has no icon`)
  }
})

test('no two tabs share a label, so the sidebar is never ambiguous', () => {
  const labels = ADMIN_TAB_VIEWS.map((view) => view.label)
  assert.equal(new Set(labels).size, labels.length)
})

test('the client registry is the server registry, tab for tab', () => {
  assert.deepEqual(TAB_IDS, server.TAB_IDS)
  const serverById = new Map((server.ADMIN_TABS as Array<Record<string, unknown>>).map((tab) => [tab.id as string, tab]))
  for (const view of ADMIN_TAB_VIEWS) {
    const tab = serverById.get(view.id)!
    assert.equal(view.to, tab.to, `${view.id} route`)
    assert.equal(view.group, tab.group, `${view.id} group`)
    assert.equal(Boolean(view.superAdminOnly), Boolean(tab.superAdminOnly), `${view.id} governance`)
    assert.deepEqual(view.stateKeys, tab.stateKeys, `${view.id} state keys`)
    assert.deepEqual(view.apiPrefixes, tab.apiPrefixes, `${view.id} api prefixes`)
  }
})

test('the client and the server hand every role the same tabs', () => {
  const configs = [null, {}, { reviewer: ['questions'] }, { editor: ['settings', 'questions'] }, { admin: [] }]
  for (const role of ['student', 'reviewer', 'admin', 'editor', 'super_admin']) {
    for (const config of configs) {
      assert.deepEqual(tabsForRole(role, config), server.tabsForRole(role, config), `${role} with ${JSON.stringify(config)}`)
    }
  }
  assert.deepEqual(DEFAULT_ROLE_TABS, server.DEFAULT_ROLE_TABS)
})

test('a role renders exactly the tabs it holds, in registry order', () => {
  const reviewer = tabViewsFor('reviewer', null).map((view) => view.id)
  assert.deepEqual(reviewer, ['library', 'questions', 'practical', 'concepts', 'resources', 'media'])
  assert.deepEqual(tabViewsFor('student', null), [])
  assert.equal(tabViewsFor('super_admin', null).length, TAB_IDS.length)
})
```

- [ ] **Step 7: Run the client test to verify it passes**

Run: `node --test --experimental-strip-types src/data/adminTabs.test.ts`
Expected: PASS — 5 tests.

- [ ] **Step 8: Commit**

```bash
git add server/src/tabs.js server/src/tabs.test.js src/data/adminTabs.ts src/data/adminTabs.test.ts
git commit -m "$(cat <<'EOF'
Keep one list of what the console contains

The sidebar, the router and the server guards were three lists, which is
three answers to one question. Each tab now declares the documents and
routes it governs, so hiding one removes the capability rather than only
the link. A super admin's own set is computed and never read from
configuration, which is what makes locking yourself out impossible.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Guard every named route by its tab

**Files:**
- Modify: `server/src/auth.js` (add `requireTab`, drop the `requireAdmin` alias)
- Modify: `server/src/index.js` (import line 11; every `requireAdmin` call site)

**Interfaces:**
- Consumes: `tabs.js` from Task 4, `requireConsole`/`requireSuperAdmin` from Task 3.
- Produces: `requireTab(tabId)` middleware factory, and `heldTabs(identity)` used by later tasks and by `GET /api/session`.

- [ ] **Step 1: Add `requireTab` to `server/src/auth.js`**

Add the import beside the others:

```js
import { ROLE_TABS_STATE_KEY, holdsTab, tabsForRole } from './tabs.js'
import { pool } from './db.js'
```

(`pool` is already imported at the top of `auth.js`; do not import it twice.)

Then add, above `requireConsole`:

```js
/**
 * The role→tabs document, cached until it is written.
 *
 * Every guarded request reads it, so it cannot be a query per request. The
 * cache is dropped by `invalidateRoleTabs`, which `PUT /api/state/:key` calls
 * when this key changes — the same invalidation shape the medical-resource
 * snapshot already uses.
 */
let roleTabsCache = null

export function invalidateRoleTabs() {
  roleTabsCache = null
}

async function roleTabs() {
  if (roleTabsCache) return roleTabsCache
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [ROLE_TABS_STATE_KEY])
  roleTabsCache = rows.length ? safeParse(rows[0].v) ?? {} : {}
  return roleTabsCache
}

/** Every tab this identity holds. */
export async function heldTabs(identity) {
  if (!identity) return []
  return tabsForRole(identity.role, await roleTabs())
}

/**
 * A route belongs to a tab, and you must hold that tab.
 *
 * This is the whole permission model: hiding a tab in Access Control is not a
 * cosmetic change, it is this refusal.
 */
export function requireTab(...tabIds) {
  return async function guard(req, res, next) {
    if (!hasConsoleAccess(req.identity?.role)) return res.status(403).json({ error: 'console access required' })
    if (!mfaSatisfied(req.identity)) return res.status(403).json({ error: 'mfa_required' })
    try {
      if (!holdsTab(await heldTabs(req.identity), tabIds)) {
        return res.status(403).json({ error: 'that area is not part of your role' })
      }
    } catch (error) { return next(error) }
    return next()
  }
}
```

- [ ] **Step 2: Delete the temporary alias**

Remove this line, added in Task 3:

```js
export const requireAdmin = requireConsole
```

- [ ] **Step 3: Repoint every route in `server/src/index.js`**

Change the import on line 11 to:

```js
import { apiAuthGate, heldTabs, mfaSatisfied, requireAuthenticated, requireConsole, requireSuperAdmin, requireTab } from './auth.js'
```

Then apply this mapping to every `requireAdmin` occurrence:

| Route(s) | Replace with |
|---|---|
| `GET /api/state` (line 559, bulk hydrate) | `requireSuperAdmin` |
| `PUT`/`DELETE /api/state/:key` | leave `requireConsole` — Task 8 adds the per-key gate |
| `app.use(['/api/students', '/api/mailboxes', '/api/mail'], …)` (line 697) | split into `app.use('/api/students', requireTab('students'))` and `app.use(['/api/mailboxes', '/api/mail'], requireTab('mailbox'))` |
| `/api/admin/users*` and `/api/access/users*` (lines 707–878) | `requireTab('users')` |
| `/api/backups*`, `/api/launch/*` (lines 881, 911, 1134, 1139) | `requireTab('audit')` |
| `/api/medical-library/coverage/*` (lines 928, 946, 985) | `requireTab('library')` |
| `/api/medical-resources/*` writes (lines 1032, 1070, 1088, 1103) | `requireTab('resources')` |
| `/api/admin/assistant*` (lines 1362–1390) | `requireTab('assistant')` |

Leave `requireAuthenticated` routes exactly as they are.

Also update the inline admin check inside `GET /api/state/:key` (line 567) — read access stays at console level, since these documents are largely student-readable already and narrowing reads would break cross-surface pickers:

```js
app.get('/api/state/:key', wrap(async (req, res) => {
  if (!STUDENT_READABLE_STATE.has(req.params.key)) {
    if (!hasConsoleAccess(req.identity?.role)) return res.status(403).json({ error: 'console access required' })
    if (!mfaSatisfied(req.identity)) return res.status(403).json({ error: 'mfa_required' })
  }
```

Import `hasConsoleAccess` from `./roles.js` at the top of `index.js` for that line.

And `GET /api/medical-resources/:resourceId/status` (line 1046) discloses `storageKey` to admins; change its condition from `req.identity.role === 'admin'` to `hasConsoleAccess(req.identity.role)`.

- [ ] **Step 4: Report the caller's tabs on the session**

The client needs to know what to render. Extend `GET /api/session` (line 146) and `GET /api/me` (line 165) to include the resolved role, rank and tabs:

```js
app.get('/api/session', wrap(async (req, res) => res.json({
  user: req.identity ? {
    id: req.identity.id,
    email: req.identity.email,
    role: req.identity.role,
    rank: req.identity.rank,
    tabs: await heldTabs(req.identity),
    contentScope: req.identity.contentScope,
    aal: req.identity.aal,
    mfaRequired: Boolean(req.identity.mfaRequired),
  } : null,
})))
```

Apply the same four added fields (`rank`, `tabs`, `contentScope`, and the already-present `role`) to the `user` object inside `GET /api/me`.

- [ ] **Step 5: Verify no caller of `requireAdmin` remains**

Run: `cd server && grep -rn "requireAdmin" src/`
Expected: no output.

Run: `cd server && npm test`
Expected: PASS — all suites.

Run: `cd server && node --check src/index.js && node --check src/auth.js`
Expected: no output (both parse).

- [ ] **Step 6: Commit**

```bash
git add server/src/auth.js server/src/index.js
git commit -m "$(cat <<'EOF'
Make a hidden tab refuse, not merely disappear

Every admin route now names the tab it belongs to, so a reviewer with
the browser console open cannot post to the roster. The bulk state
hydrate becomes super-admin-only: it returns every document at once,
which no tab list could narrow.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: What a reviewer may write

**Files:**
- Create: `server/src/contentScope.js`
- Create: `server/src/contentScope.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `yearNumber(value): number | null`
  - `itemModules(kind, item): string[]`
  - `itemYears(kind, item): number[]`
  - `itemUniversities(kind, item): string[]`
  - `itemWritableBy(scope, kind, item): boolean` — `scope === null` means unscoped and always true
  - `changeWritableBy(scope, kind, before, after): boolean` — both sides must pass

- [ ] **Step 1: Write the failing test**

Create `server/src/contentScope.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { changeWritableBy, itemWritableBy, itemYears, yearNumber } from './contentScope.js'

const scope = { moduleIds: ['MOD_CVS'], yearIds: ['OMS_Y2'] }

const question = (tags) => ({ kind: 'question', questionData: { tags } })
const article = (data) => ({ kind: 'article', articleData: data })
const practical = (data) => ({ kind: 'practical', practicalData: data })

test('a year is read from all three forms it is stored in', () => {
  assert.equal(yearNumber('Year 2'), 2)
  assert.equal(yearNumber('OMS_Y2'), 2)
  assert.equal(yearNumber(2), 2)
  assert.equal(yearNumber('HU_Y10'), 10)
  assert.equal(yearNumber('OMS_INT1'), null, 'an internship year is not year 1')
  assert.equal(yearNumber('Internship Year 1'), null)
  assert.equal(yearNumber(''), null)
  assert.equal(yearNumber(null), null)
  assert.equal(yearNumber('nonsense'), null)
})

test('a field named yearIds may hold either form, and both are read', () => {
  // ResourceEditorDialog.tsx:231 writes YEARS labels into `yearIds`, while the
  // article editor writes scoped ids into the same field. Reconciling that is
  // this function's whole reason for existing.
  assert.equal(itemWritableBy(scope, 'resource', { resourceData: { yearIds: ['Year 2'] } }), true)
  assert.equal(itemWritableBy(scope, 'resource', { resourceData: { yearIds: ['OMS_Y2'] } }), true)
  assert.equal(itemWritableBy(scope, 'resource', { resourceData: { yearIds: ['Year 4'] } }), false)
})

test('an item is writable when its module matches', () => {
  assert.equal(itemWritableBy(scope, 'question', question({ moduleIds: ['MOD_CVS'], years: [] })), true)
  assert.equal(itemWritableBy(scope, 'question', question({ moduleIds: ['MOD_RES'], years: [] })), false)
})

test('an item is writable when its year matches, whatever form it is stored in', () => {
  assert.equal(itemWritableBy(scope, 'question', question({ moduleIds: [], years: ['Year 2'] })), true)
  assert.equal(itemWritableBy(scope, 'article', article({ yearIds: ['OMS_Y2'] })), true)
  assert.equal(itemWritableBy(scope, 'concept', { learnerYears: [2] }), true)
  assert.equal(itemWritableBy(scope, 'question', question({ moduleIds: [], years: ['Year 4'] })), false)
})

test('a university named on both sides must agree', () => {
  const other = { moduleIds: [], yearIds: ['HU_Y2'] }
  assert.equal(itemWritableBy(other, 'article', article({ yearIds: ['OMS_Y2'] })), false)
  // The item names no university, so a Year 2 reviewer owns it.
  assert.equal(itemWritableBy(other, 'question', question({ moduleIds: [], years: ['Year 2'] })), true)
})

test('an untagged item belongs to no reviewer', () => {
  assert.equal(itemWritableBy(scope, 'question', question({ moduleIds: [], years: [] })), false)
  assert.equal(itemWritableBy(scope, 'article', article({})), false)
  assert.equal(itemWritableBy(scope, 'practical', practical({})), false)
  assert.equal(itemWritableBy(scope, 'resource', { resourceData: {} }), false)
})

test('an unscoped caller writes anything, including untagged items', () => {
  assert.equal(itemWritableBy(null, 'question', question({ moduleIds: [], years: [] })), true)
  assert.equal(itemWritableBy(null, 'article', article({ yearIds: ['OMS_Y4'] })), true)
})

test('a practical is scoped once it is tagged', () => {
  assert.equal(itemWritableBy(scope, 'practical', practical({ moduleIds: ['MOD_CVS'] })), true)
  assert.equal(itemWritableBy(scope, 'practical', practical({ yearIds: ['OMS_Y2'] })), true)
  assert.equal(itemWritableBy(scope, 'practical', practical({ yearIds: ['OMS_Y4'] })), false)
})

test('a change is refused when either side of it is out of scope', () => {
  const mine = question({ moduleIds: ['MOD_CVS'], years: [] })
  const theirs = question({ moduleIds: ['MOD_RES'], years: [] })
  assert.equal(changeWritableBy(scope, 'question', mine, mine), true)
  // Retagging somebody else's question into my scope.
  assert.equal(changeWritableBy(scope, 'question', theirs, mine), false)
  // Retagging my question out of my scope.
  assert.equal(changeWritableBy(scope, 'question', mine, theirs), false)
  // Creating and deleting are one-sided, and the side that exists must pass.
  assert.equal(changeWritableBy(scope, 'question', null, mine), true)
  assert.equal(changeWritableBy(scope, 'question', null, theirs), false)
  assert.equal(changeWritableBy(scope, 'question', mine, null), true)
  assert.equal(changeWritableBy(scope, 'question', theirs, null), false)
})

test('years are read from the block each kind actually keeps them in', () => {
  assert.deepEqual(itemYears('question', question({ years: ['Year 1', 'Year 3'] })), [1, 3])
  assert.deepEqual(itemYears('article', article({ yearIds: ['OMS_Y5'] })), [5])
  assert.deepEqual(itemYears('concept', { learnerYears: [1, 2] }), [1, 2])
  assert.deepEqual(itemYears('question', question({ years: ['nonsense'] })), [])
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd server && node --test src/contentScope.test.js`
Expected: FAIL — `Cannot find module './contentScope.js'`

- [ ] **Step 3: Write `server/src/contentScope.js`**

```js
/**
 * Which content a reviewer may write.
 *
 * The mirror of this on the client is `itemInScope` in
 * `src/data/contentControl.ts`, and the two deliberately disagree about what an
 * empty tag list means. There, empty means unrestricted: an untagged article is
 * shown to every student. Here, empty means nobody: an untagged item matches no
 * reviewer and only an unscoped caller may touch it. Showing untagged content
 * to everyone is generous; letting anyone edit it is not. They are two named
 * functions rather than one with a flag, so neither can be mistaken for the
 * other.
 */

/**
 * A year, from any of the three ways this codebase stores one.
 *
 * Question tags hold labels ("Year 2"), concepts hold plain numbers, and
 * `yearIds` holds whichever form the editor that wrote it used — the article
 * editor writes scoped ids from `yearId()` (src/data/taxonomy.ts:26), while
 * ResourceEditorDialog.tsx:231 writes YEARS labels into the same field. All
 * three forms are therefore read here rather than assumed away.
 *
 * Internship years are deliberately not numbers: "OMS_INT1" is not year 1, and
 * treating it as one would hand a first-year reviewer the interns.
 */
export function yearNumber(value) {
  if (typeof value === 'number') return Number.isInteger(value) && value > 0 ? value : null
  const text = String(value ?? '').trim()
  if (!text) return null
  if (/int/i.test(text)) return null
  const match = text.match(/(?:^|[_\s])(?:Y)?(\d{1,2})$/i)
  return match ? Number(match[1]) : null
}

/** The university an id like "OMS_Y2" belongs to, or null for a bare label. */
function universityOfYear(value) {
  const match = String(value ?? '').match(/^([A-Za-z]+)_(?:Y|INT)\d+$/)
  return match ? match[1].toUpperCase() : null
}

function list(value) {
  return Array.isArray(value) ? value.filter((entry) => entry !== null && entry !== undefined && entry !== '') : []
}

/** Where each kind keeps its tags. The one place that has to know. */
function tagsOf(kind, item) {
  if (!item) return { moduleIds: [], years: [], universityIds: [] }
  if (kind === 'question') {
    const tags = item.questionData?.tags ?? {}
    return { moduleIds: list(tags.moduleIds), years: list(tags.years), universityIds: list(tags.universityIds) }
  }
  if (kind === 'article') {
    const data = item.articleData ?? {}
    return { moduleIds: list(data.moduleIds), years: list(data.yearIds), universityIds: list(data.universityIds) }
  }
  if (kind === 'practical') {
    const data = item.practicalData ?? {}
    return { moduleIds: list(data.moduleIds), years: list(data.yearIds), universityIds: list(data.universityIds) }
  }
  if (kind === 'resource') {
    const data = item.resourceData ?? {}
    return { moduleIds: list(data.moduleIds), years: list(data.yearIds), universityIds: list(data.universityIds) }
  }
  if (kind === 'concept') {
    return { moduleIds: list(item.moduleIds), years: list(item.learnerYears), universityIds: list(item.universityIds) }
  }
  return { moduleIds: [], years: [], universityIds: [] }
}

export function itemModules(kind, item) {
  return tagsOf(kind, item).moduleIds.map(String)
}

export function itemYears(kind, item) {
  return [...new Set(tagsOf(kind, item).years.map(yearNumber).filter((year) => year !== null))]
}

export function itemUniversities(kind, item) {
  const tags = tagsOf(kind, item)
  const fromYears = tags.years.map(universityOfYear).filter(Boolean)
  return [...new Set([...tags.universityIds.map((id) => String(id).toUpperCase()), ...fromYears])]
}

/**
 * Whether this scope may write this item.
 *
 * A null scope is an editor or a super admin and writes anything. Otherwise the
 * item's modules or its years must intersect the reviewer's — and when both
 * sides name universities, those must overlap too, so a Year 2 reviewer at one
 * university does not inherit another's Year 2.
 */
export function itemWritableBy(scope, kind, item) {
  if (!scope) return true
  if (!item) return true

  const scopeUniversities = new Set(scope.yearIds.map(universityOfYear).filter(Boolean))
  const itemUniversityList = itemUniversities(kind, item)
  if (scopeUniversities.size && itemUniversityList.length
      && !itemUniversityList.some((id) => scopeUniversities.has(id))) return false

  const modules = new Set(itemModules(kind, item))
  if (scope.moduleIds.some((id) => modules.has(String(id)))) return true

  const years = new Set(itemYears(kind, item))
  const scopeYears = scope.yearIds.map(yearNumber).filter((year) => year !== null)
  return scopeYears.some((year) => years.has(year))
}

/**
 * Whether this scope may make this change.
 *
 * Both sides are judged, which is what stops the two obvious attacks: retagging
 * somebody else's item into your scope, and retagging your own out of it. A
 * creation has no before and a deletion has no after; the side that exists must
 * still pass.
 */
export function changeWritableBy(scope, kind, before, after) {
  if (!scope) return true
  return itemWritableBy(scope, kind, before) && itemWritableBy(scope, kind, after)
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd server && node --test src/contentScope.test.js`
Expected: PASS — 10 tests.

- [ ] **Step 5: Commit**

```bash
git add server/src/contentScope.js server/src/contentScope.test.js
git commit -m "$(cat <<'EOF'
Judge a content edit by both the before and the after

Checking only the result would let a reviewer retag somebody else's
question into their own year and then edit it. Checking only the original
would let them tag their own out and abandon it. Years arrive in three
different forms across the four content kinds, so this is also the one
place that reconciles them — and an internship year is deliberately not
a number, or a first-year reviewer would inherit the interns.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Diff, authorise and merge a shared document

**Files:**
- Create: `server/src/stateMerge.js`
- Create: `server/src/stateMerge.test.js`

**Interfaces:**
- Consumes: `tabs.js` (Task 4), `contentScope.js` (Task 6).
- Produces:
  - `isMergeable(key): boolean`
  - `diffDocument(key, base, next): Array<{ collection, id, kind, before, after }>`
  - `authoriseChanges(changes, { heldTabs, contentScope }): { ok: boolean, refusals: Array<{ id, reason }> }`
  - `mergeDocument(key, base, stored, incoming): { ok: boolean, value?: unknown, conflicts?: string[] }`

- [ ] **Step 1: Write the failing test**

Create `server/src/stateMerge.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { authoriseChanges, diffDocument, isMergeable, mergeDocument } from './stateMerge.js'

const LEDGER = 'synapse-admin-content-ledger-v4'
const GRAPH = 'synapse-concept-graph-v2'

const q = (id, title, moduleIds = ['MOD_CVS']) => ({
  id, kind: 'question', title, questionData: { tags: { moduleIds, years: [] } },
})

test('only the keyed collections merge', () => {
  assert.equal(isMergeable(LEDGER), true)
  assert.equal(isMergeable(GRAPH), true)
  assert.equal(isMergeable('synapse-vouchers-v1'), false)
})

test('a diff names what changed, by collection and id', () => {
  const base = [q('a', 'One'), q('b', 'Two')]
  const next = [q('a', 'One edited'), q('c', 'Three')]
  const changes = diffDocument(LEDGER, base, next)
  assert.deepEqual(
    changes.map((change) => [change.id, change.before ? 'was' : 'new', change.after ? 'is' : 'gone']).sort(),
    [['a', 'was', 'is'], ['b', 'was', 'gone'], ['c', 'new', 'is']],
  )
  assert.equal(changes.every((change) => change.kind === 'question'), true)
})

test('an untouched document produces no changes, whatever the key order', () => {
  const base = [{ id: 'a', kind: 'question', title: 'One', questionData: { tags: {} } }]
  const next = [{ kind: 'question', questionData: { tags: {} }, title: 'One', id: 'a' }]
  assert.deepEqual(diffDocument(LEDGER, base, next), [])
})

test('the concept graph diffs its two collections separately', () => {
  const base = { concepts: [{ id: 'c1', label: 'A' }], relations: [{ id: 'r1', type: 'causes' }] }
  const next = { concepts: [{ id: 'c1', label: 'B' }], relations: [] }
  const changes = diffDocument(GRAPH, base, next)
  assert.deepEqual(changes.map((change) => [change.collection, change.id]), [['concepts', 'c1'], ['relations', 'r1']])
  assert.equal(changes[0].kind, 'concept')
})

test('a change is refused when the caller does not hold its tab', () => {
  const changes = diffDocument(LEDGER, [], [q('a', 'One')])
  assert.equal(authoriseChanges(changes, { heldTabs: ['questions'], contentScope: null }).ok, true)
  const refused = authoriseChanges(changes, { heldTabs: ['library'], contentScope: null })
  assert.equal(refused.ok, false)
  assert.match(refused.refusals[0].reason, /not part of your role/)
})

test('a media-request-only edit is allowed by the media tab or by the owner tab', () => {
  const before = q('a', 'One')
  const after = { ...before, questionData: { ...before.questionData, mediaRequests: [{ id: 'm1', brief: 'ECG' }] } }
  const changes = diffDocument(LEDGER, [before], [after])
  assert.equal(authoriseChanges(changes, { heldTabs: ['media'], contentScope: null }).ok, true)
  assert.equal(authoriseChanges(changes, { heldTabs: ['questions'], contentScope: null }).ok, true)
  assert.equal(authoriseChanges(changes, { heldTabs: ['library'], contentScope: null }).ok, false)
})

test('a change outside the caller scope is refused, and the request refuses whole', () => {
  const scope = { moduleIds: ['MOD_CVS'], yearIds: [] }
  const changes = diffDocument(LEDGER, [], [q('a', 'Mine'), q('b', 'Theirs', ['MOD_RES'])])
  const result = authoriseChanges(changes, { heldTabs: ['questions'], contentScope: scope })
  assert.equal(result.ok, false)
  assert.deepEqual(result.refusals.map((refusal) => refusal.id), ['b'])
  assert.match(result.refusals[0].reason, /outside the modules and years/)
})

test('concurrent edits to different items both survive', () => {
  const base = [q('a', 'One'), q('b', 'Two')]
  const stored = [q('a', 'One edited by them'), q('b', 'Two')]
  const incoming = [q('a', 'One'), q('b', 'Two edited by me')]
  const merged = mergeDocument(LEDGER, base, stored, incoming)
  assert.equal(merged.ok, true)
  assert.deepEqual(
    merged.value.map((item) => item.title).sort(),
    ['One edited by them', 'Two edited by me'],
  )
})

test('concurrent edits to the same item are a conflict, not a winner', () => {
  const base = [q('a', 'One')]
  const stored = [q('a', 'Theirs')]
  const incoming = [q('a', 'Mine')]
  const merged = mergeDocument(LEDGER, base, stored, incoming)
  assert.equal(merged.ok, false)
  assert.deepEqual(merged.conflicts, ['a'])
})

test('an item deleted underneath me is a conflict rather than a resurrection', () => {
  const merged = mergeDocument(LEDGER, [q('a', 'One')], [], [q('a', 'Mine')])
  assert.equal(merged.ok, false)
  assert.deepEqual(merged.conflicts, ['a'])
})

test('my deletion applies onto what is stored, and leaves their additions alone', () => {
  const base = [q('a', 'One')]
  const stored = [q('a', 'One'), q('z', 'Theirs')]
  const merged = mergeDocument(LEDGER, base, stored, [])
  assert.equal(merged.ok, true)
  assert.deepEqual(merged.value.map((item) => item.id), ['z'])
})

test('an unmergeable document is returned as sent, for the caller to version-check', () => {
  const merged = mergeDocument('synapse-vouchers-v1', { a: 1 }, { a: 2 }, { a: 3 })
  assert.equal(merged.ok, true)
  assert.deepEqual(merged.value, { a: 3 })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd server && node --test src/stateMerge.test.js`
Expected: FAIL — `Cannot find module './stateMerge.js'`

- [ ] **Step 3: Write `server/src/stateMerge.js`**

```js
/**
 * How two people save the same document without one erasing the other.
 *
 * Every admin surface persists by replacing a whole JSON document, and all four
 * content kinds live in one of them. With two admins a lost update was rare;
 * with a team of reviewers it is the normal case. So a save is no longer a
 * replacement: the client sends the version it started from, and this works out
 * what that client actually changed, whether it was allowed to, and applies
 * only that onto whatever is stored now.
 *
 * Documents that are keyed collections merge item by item. Everything else is
 * still whole-document, but the caller's base version is checked, so a stale
 * write is refused rather than silently winning.
 */

import { tabsForStateKey } from './tabs.js'
import { changeWritableBy } from './contentScope.js'

const LEDGER = 'synapse-admin-content-ledger-v4'
const GRAPH = 'synapse-concept-graph-v2'

/**
 * How to take a document apart, per key.
 *
 * `tabsFor` is what makes one shared document answer to five different tabs: a
 * question edit needs Questions Setup, an article edit needs Library Setup, and
 * neither is granted by the other.
 */
const ADAPTERS = {
  [LEDGER]: {
    collections: [{
      name: 'items',
      read: (document) => (Array.isArray(document) ? document : []),
      write: (_document, items) => items,
      kindOf: (item) => item?.kind ?? 'unknown',
      tabsFor: (kind) => ({
        article: ['library'], question: ['questions'], practical: ['practical'], resource: ['resources'],
      }[kind] ?? []),
    }],
  },
  [GRAPH]: {
    collections: [
      {
        name: 'concepts',
        read: (document) => (Array.isArray(document?.concepts) ? document.concepts : []),
        write: (document, items) => ({ ...(document ?? {}), concepts: items }),
        kindOf: () => 'concept',
        tabsFor: () => ['concepts'],
      },
      {
        name: 'relations',
        read: (document) => (Array.isArray(document?.relations) ? document.relations : []),
        write: (document, items) => ({ ...(document ?? {}), relations: items }),
        kindOf: () => 'relation',
        tabsFor: () => ['relationships'],
      },
    ],
  },
}

export function isMergeable(key) {
  return Boolean(ADAPTERS[key])
}

/** Stable across key order, so a re-serialised item is not a phantom change. */
function fingerprint(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null'
  if (Array.isArray(value)) return `[${value.map(fingerprint).join(',')}]`
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${fingerprint(value[key])}`).join(',')}}`
}

function byId(items) {
  return new Map(items.filter((item) => item && typeof item.id === 'string').map((item) => [item.id, item]))
}

/**
 * What changed between two versions of a document, item by item.
 *
 * A change carries both sides because authorisation needs both — see
 * `changeWritableBy`.
 */
export function diffDocument(key, base, next) {
  const adapter = ADAPTERS[key]
  if (!adapter) return []
  const changes = []
  for (const collection of adapter.collections) {
    const before = byId(collection.read(base))
    const after = byId(collection.read(next))
    for (const id of new Set([...before.keys(), ...after.keys()])) {
      const from = before.get(id) ?? null
      const to = after.get(id) ?? null
      if (from && to && fingerprint(from) === fingerprint(to)) continue
      changes.push({
        collection: collection.name,
        id,
        kind: collection.kindOf(to ?? from),
        tabs: collection.tabsFor(collection.kindOf(to ?? from)),
        before: from,
        after: to,
      })
    }
  }
  return changes
}

/** True when the only difference between two items is their media requests. */
function mediaRequestsOnly(before, after) {
  if (!before || !after) return false
  const strip = (item) => {
    const copy = { ...item }
    for (const block of ['questionData', 'articleData', 'practicalData']) {
      if (copy[block]) copy[block] = { ...copy[block], mediaRequests: undefined }
    }
    return copy
  }
  return fingerprint(strip(before)) === fingerprint(strip(after))
}

/**
 * Whether this caller may make these changes.
 *
 * Refusals are collected rather than thrown on the first one, so a person is
 * told everything that is wrong at once. The caller applies none of it either
 * way: a half-saved page is worse than a rejected one.
 */
export function authoriseChanges(changes, { heldTabs, contentScope }) {
  const held = new Set(heldTabs ?? [])
  const refusals = []
  for (const change of changes) {
    // A media request lives inside its owner, so sourcing an asset is a write
    // to the owning item. Media Requests grants it, and so does the owner's tab.
    const allowed = mediaRequestsOnly(change.before, change.after)
      ? [...change.tabs, 'media']
      : change.tabs
    if (!allowed.some((tab) => held.has(tab))) {
      refusals.push({ id: change.id, reason: `${change.kind} "${change.id}" is not part of your role` })
      continue
    }
    if (!changeWritableBy(contentScope, change.kind, change.before, change.after)) {
      refusals.push({ id: change.id, reason: `${change.kind} "${change.id}" is outside the modules and years assigned to you` })
    }
  }
  return { ok: refusals.length === 0, refusals }
}

/**
 * This caller's changes, applied onto what is stored now.
 *
 * An item both sides touched is a conflict and the whole save is refused. Two
 * people who edited different items both keep their work, which is the point.
 */
export function mergeDocument(key, base, stored, incoming) {
  const adapter = ADAPTERS[key]
  if (!adapter) return { ok: true, value: incoming }

  const conflicts = []
  let value = stored
  for (const collection of adapter.collections) {
    const before = byId(collection.read(base))
    const mine = byId(collection.read(incoming))
    const theirs = byId(collection.read(stored))
    const result = new Map(theirs)

    for (const id of new Set([...before.keys(), ...mine.keys()])) {
      const from = before.get(id) ?? null
      const to = mine.get(id) ?? null
      if (from && to && fingerprint(from) === fingerprint(to)) continue

      const current = theirs.get(id) ?? null
      const changedUnderneath = fingerprint(current) !== fingerprint(from)
      if (changedUnderneath) { conflicts.push(id); continue }

      if (to) result.set(id, to)
      else result.delete(id)
    }
    value = collection.write(value, [...result.values()])
  }

  if (conflicts.length) return { ok: false, conflicts }
  return { ok: true, value }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd server && node --test src/stateMerge.test.js`
Expected: PASS — 12 tests.

- [ ] **Step 5: Commit**

```bash
git add server/src/stateMerge.js server/src/stateMerge.test.js
git commit -m "$(cat <<'EOF'
Stop one person's save erasing another's afternoon

Every admin surface replaced a whole document, and all four content
kinds live in one of them, so two people editing at once meant the
second save destroyed the first. A save now carries the version it
started from: what that client actually changed is worked out, checked
against their tabs and their scope, and applied onto what is stored.
Two people editing different items both keep their work. Two people
editing the same one are told so, rather than one of them being picked.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Wire the merge into the state route

**Files:**
- Modify: `server/src/index.js` (`GET`/`PUT`/`DELETE /api/state/:key`, lines 566–608)

**Interfaces:**
- Consumes: `stateMerge.js` (Task 7), `tabs.js` (Task 4), `heldTabs`/`invalidateRoleTabs` (Task 5).
- Produces: `GET /api/state/:key` returns `{ value, updatedAt, version }`. `PUT` accepts `{ value, baseVersion }` and answers `200`, `403` (tab or scope), or `409` (conflict or stale base).

- [ ] **Step 1: Return a version from the read**

Replace the body of `GET /api/state/:key` after the access check:

```js
  const [rows] = await pool.query(
    `SELECT s.v, s.updated_at AS updatedAt,
            (SELECT MAX(id) FROM app_state_versions WHERE k = s.k) AS version
       FROM app_state s WHERE s.k = ?`,
    [req.params.key],
  )
  if (!rows.length) return res.json({ value: null, updatedAt: null, version: null })
  const { updatedAt, version } = rows[0]
  try { res.json({ value: JSON.parse(rows[0].v), updatedAt, version }) }
  catch { res.json({ value: null, updatedAt, version }) }
```

- [ ] **Step 2: Replace the write**

Replace `app.put('/api/state/:key', ...)` entirely:

```js
/**
 * Save a shared document.
 *
 * Three refusals, in the order they become knowable: you must hold a tab that
 * owns this key; the changes you are making must be yours to make; and nobody
 * may have changed the same item underneath you. Each answers with what is
 * wrong, because a save that fails silently is the bug this route used to have.
 */
app.put('/api/state/:key', requireConsole, wrap(async (req, res) => {
  const key = req.params.key
  const owners = tabsForStateKey(key)
  const held = await heldTabs(req.identity)
  const superAdmin = req.identity.role === 'super_admin'

  // A key no tab declares is reachable only by a super admin. Fail closed: a
  // document added later without a registry entry becomes a bug report, never
  // a hole.
  if (!superAdmin && !holdsTab(held, owners)) {
    return res.status(403).json({ error: 'that area is not part of your role' })
  }

  const baseVersion = req.body?.baseVersion
  if (baseVersion === undefined) {
    return res.status(400).json({ error: 'baseVersion is required; reload this page and try again' })
  }

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [currentRows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [key])
    const storedRaw = currentRows.length ? currentRows[0].v : null
    const [versionRows] = await conn.query('SELECT MAX(id) AS version FROM app_state_versions WHERE k = ?', [key])
    const storedVersion = versionRows[0]?.version ?? null

    let base = null
    if (baseVersion !== null) {
      const [baseRows] = await conn.query('SELECT v FROM app_state_versions WHERE id = ? AND k = ?', [baseVersion, key])
      if (!baseRows.length) {
        await conn.rollback()
        return res.status(409).json({ error: 'stale', reason: 'this page was loaded from a version that is no longer on record — reload and try again' })
      }
      base = JSON.parse(baseRows[0].v)
    } else if (storedVersion !== null) {
      // The client believed the document did not exist, and it does.
      await conn.rollback()
      return res.status(409).json({ error: 'stale', reason: 'this document was created while you were editing — reload and try again' })
    }

    const stored = storedRaw === null ? null : JSON.parse(storedRaw)
    const incoming = req.body?.value ?? null

    if (!superAdmin) {
      const changes = diffDocument(key, base, incoming)
      // A document with no adapter yields no changes; the base-version check
      // above is what protects it, and the tab check above is its authorisation.
      const authorised = authoriseChanges(changes, { heldTabs: held, contentScope: req.identity.contentScope })
      if (!authorised.ok) {
        await conn.rollback()
        return res.status(403).json({ error: 'refused', refusals: authorised.refusals })
      }
    }

    const merged = mergeDocument(key, base, stored, incoming)
    if (!merged.ok) {
      await conn.rollback()
      return res.status(409).json({ error: 'conflict', conflicts: merged.conflicts, reason: 'somebody else changed the same items while you were editing' })
    }

    const v = JSON.stringify(merged.value ?? null)
    let version = storedVersion
    if (storedRaw !== v) {
      const [inserted] = await conn.query(
        'INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [key, v, req.identity.id],
      )
      version = inserted.insertId
      await conn.query(
        'INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)', [key, v],
      )
    }
    await conn.commit()
    invalidateSnapshots(key)
    if (key === ROLE_TABS_STATE_KEY) invalidateRoleTabs()
    res.json({ ok: true, version })
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}))
```

- [ ] **Step 3: Guard the delete the same way**

```js
app.delete('/api/state/:key', requireSuperAdmin, wrap(async (req, res) => {
  await pool.query('DELETE FROM app_state WHERE k = ?', [req.params.key])
  invalidateSnapshots(req.params.key)
  if (req.params.key === ROLE_TABS_STATE_KEY) invalidateRoleTabs()
  res.json({ ok: true })
}))
```

Deleting a whole document is not an edit and has no scope, so it is super-admin only.

- [ ] **Step 4: Add the imports**

At the top of `server/src/index.js`:

```js
import { ROLE_TABS_STATE_KEY, holdsTab, tabsForStateKey } from './tabs.js'
import { authoriseChanges, diffDocument, mergeDocument } from './stateMerge.js'
import { invalidateRoleTabs } from './auth.js'
```

Fold `invalidateRoleTabs` into the existing `./auth.js` import rather than adding a second one.

- [ ] **Step 5: Verify**

Run: `cd server && node --check src/index.js`
Expected: no output.

Run: `cd server && npm test`
Expected: PASS — all suites including `stateMerge`, `tabs`, `roles`, `contentScope`.

- [ ] **Step 6: Commit**

```bash
git add server/src/index.js
git commit -m "$(cat <<'EOF'
Refuse a save with the reason, or apply it onto what is there

Three refusals in the order they become knowable: hold a tab that owns
the document, be allowed to make the changes you are making, and have
nobody edit the same item underneath you. A key no tab declares is
super-admin only, so a document added later without a registry entry is
a bug report rather than a hole.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Role and scope, behind one door

**Files:**
- Modify: `server/src/accounts.js:508` (`setRole`), and add `setContentScope`
- Modify: `server/src/index.js` (`POST /api/admin/users/:id/role`; delete `POST /api/access/users/:userId/promote`; add `POST /api/admin/users/:id/scope`)

**Interfaces:**
- Consumes: `roles.js` (Task 2).
- Produces: `setRole(studentId, { role, reason, actorId, actorRole })` gains an `actorRole` parameter and a `forbidden` error. `setContentScope(studentId, { moduleIds, yearIds, reason, actorId, actorRole })` returns `{ ok, scope }` or `{ error }`.

- [ ] **Step 1: Take the actor's rank into `setRole`**

In `server/src/accounts.js`, add the import at the top:

```js
import { STORED_ROLES, canSetRole, effectiveRole, parseSuperAdminEmails, rank } from './roles.js'

const superAdminEmails = parseSuperAdminEmails(process.env.SUPER_ADMIN_EMAILS)
```

Then replace the opening of `setRole` (line 508–521) with:

```js
export async function setRole(studentId, { role, reason, actorId, actorRole }) {
  if (!STORED_ROLES.includes(role)) return { error: 'invalid_role' }
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, studentId)
    if (!student) { await conn.rollback(); return { error: 'not_found' } }
    const userId = student.user_id
    if (!userId) { await conn.rollback(); return { error: 'no_identity' } }

    const [access] = await conn.query(
      'SELECT role, status, email FROM user_access WHERE user_id = ? FOR UPDATE', [userId],
    )
    if (!access.length) { await conn.rollback(); return { error: 'no_identity' } }
    if (access[0].status !== 'active') { await conn.rollback(); return { error: 'suspended' } }

    // The target's rank is their *effective* one, so an allowlisted super admin
    // cannot be demoted by writing to their row.
    const targetRole = effectiveRole(access[0].email, access[0].role, superAdminEmails)
    if (!canSetRole(actorRole, targetRole, role)) { await conn.rollback(); return { error: 'forbidden' } }
    if (access[0].role === role) { await conn.rollback(); return { error: 'unchanged' } }

    // Somebody must be able to open the console tomorrow. The allowlist makes
    // this near-impossible to trip, but an allowlisted account that has never
    // signed in has no row, so the net stays.
    if (rank(targetRole) >= 1 && rank(role) < 1) {
      const [[{ consoles }]] = await conn.query(
        "SELECT COUNT(*) AS consoles FROM user_access WHERE role <> 'student' AND status = 'active'",
      )
      if (consoles <= 1) { await conn.rollback(); return { error: 'last_console' } }
    }
```

The remainder of the function — the two `UPDATE`/`INSERT` statements, `recordAction`, commit and catch — is unchanged.

- [ ] **Step 2: Add `setContentScope` below `setRole`**

```js
/**
 * Which modules and years a reviewer may write.
 *
 * Audited exactly like a role change, because it is one: widening somebody's
 * scope is widening their access, and "who gave them Year 4" is the same class
 * of question as "who made them a reviewer".
 */
export async function setContentScope(studentId, { moduleIds, yearIds, reason, actorId, actorRole }) {
  const clean = (value) => [...new Set((Array.isArray(value) ? value : [])
    .map((entry) => String(entry ?? '').trim())
    .filter(Boolean))]
  const scope = { moduleIds: clean(moduleIds), yearIds: clean(yearIds) }
  const stored = scope.moduleIds.length || scope.yearIds.length ? JSON.stringify(scope) : null

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, studentId)
    if (!student) { await conn.rollback(); return { error: 'not_found' } }
    const userId = student.user_id
    if (!userId) { await conn.rollback(); return { error: 'no_identity' } }

    const [access] = await conn.query(
      'SELECT role, status, email FROM user_access WHERE user_id = ? FOR UPDATE', [userId],
    )
    if (!access.length) { await conn.rollback(); return { error: 'no_identity' } }
    const targetRole = effectiveRole(access[0].email, access[0].role, superAdminEmails)
    // Scope only means anything for a reviewer, and you must outrank them.
    if (rank(actorRole) <= rank(targetRole)) { await conn.rollback(); return { error: 'forbidden' } }
    if (targetRole !== 'reviewer') { await conn.rollback(); return { error: 'not_scoped' } }

    await conn.query('UPDATE user_access SET content_scope = ? WHERE user_id = ?', [stored, userId])
    await recordAction(conn, {
      studentId, userId, action: 'access.scope',
      detail: stored ?? 'none', reason, actorId,
    })
    await conn.commit()
    return { ok: true, scope: stored ? scope : null }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}
```

- [ ] **Step 3: Replace the role route in `server/src/index.js`**

```js
app.post('/api/admin/users/:id/role', requireTab('users'), wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  if (req.params.id === req.identity.id) return res.status(409).json({ error: 'you cannot change your own role' })
  const result = await setRole(req.params.id, {
    role: req.body?.role, reason, actorId: req.identity.id, actorRole: req.identity.role,
  })
  const REFUSALS = {
    invalid_role: [400, 'role must be student, reviewer, admin or editor'],
    forbidden: [403, 'that change is above your level'],
    no_identity: [409, 'this person has never signed in, so there is no role to change'],
    suspended: [409, 'reactivate this account before changing its role'],
    unchanged: [409, 'that is already their role'],
    last_console: [409, 'this is the last account with console access — promote someone else first'],
    not_found: [404, 'user not found'],
  }
  if (result.error) {
    const [status, message] = REFUSALS[result.error] ?? [400, result.error]
    return res.status(status).json({ error: message })
  }
  res.json(result)
}))

app.post('/api/admin/users/:id/scope', requireTab('users'), wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const result = await setContentScope(req.params.id, {
    moduleIds: req.body?.moduleIds, yearIds: req.body?.yearIds,
    reason, actorId: req.identity.id, actorRole: req.identity.role,
  })
  const REFUSALS = {
    forbidden: [403, 'that change is above your level'],
    not_scoped: [409, 'only a reviewer is assigned modules and years'],
    no_identity: [409, 'this person has never signed in, so there is nothing to scope'],
    not_found: [404, 'user not found'],
  }
  if (result.error) {
    const [status, message] = REFUSALS[result.error] ?? [400, result.error]
    return res.status(status).json({ error: message })
  }
  res.json(result)
}))
```

Add `setContentScope` to the existing `./accounts.js` import at the top of `index.js`.

- [ ] **Step 4: Delete the unguarded door**

Remove `app.post('/api/access/users/:userId/promote', ...)` (lines 844–878) entirely. `GET /api/access/users` stays — it is a read, and it is already behind `requireTab('users')`.

- [ ] **Step 5: Verify**

Run: `cd server && grep -n "access/users/:userId/promote" src/index.js`
Expected: no output.

Run: `cd server && node --check src/index.js && node --check src/accounts.js && npm test`
Expected: parses clean, all suites PASS.

- [ ] **Step 6: Commit**

```bash
git add server/src/accounts.js server/src/index.js
git commit -m "$(cat <<'EOF'
Close the second door to the same room

Two endpoints wrote user_access.role. One refused a self-edit and
guarded the last admin; the other checked nothing at all, which under a
hierarchy is an escalation route rather than a duplication. The
unguarded one is gone. A reviewer's modules and years are set through
the same audited path, because widening somebody's scope is widening
their access.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Give a practical a module and a year

**Files:**
- Modify: `src/data/contentControl.ts:317` (`PracticalCommon`), and `itemScope` at line 514
- Modify: `src/components/admin/PracticalEditorDialog.tsx`
- Create: `src/data/practicalScope.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `PracticalCommon` gains `universityIds?: string[]`, `yearIds?: string[]`, `moduleIds?: string[]`. `itemScope` reads practicals.

- [ ] **Step 1: Write the failing test**

Create `src/data/practicalScope.test.ts`:

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { emptyPracticalCommon, itemScope } from './contentControl.ts'
import type { ManagedContentItem, OsceAuthoringData } from './contentControl.ts'

function osce(scope: Partial<OsceAuthoringData>): ManagedContentItem {
  return {
    id: 'p1', kind: 'practical', title: 'Station', subjectId: 'cvs', status: 'Draft',
    owner: 'nobody', updatedAt: '2026-08-21', fields: {},
    practicalData: {
      ...emptyPracticalCommon(), format: 'osce',
      candidateInstructions: '', actorBrief: [], markScheme: [],
      ...scope,
    } as OsceAuthoringData,
  }
}

test('a practical reports the years and universities it was tagged with', () => {
  const item = osce({ yearIds: ['OMS_Y2'], universityIds: ['oms'], moduleIds: ['MOD_CVS'] })
  assert.deepEqual(itemScope(item), { universityIds: ['oms'], yearIds: ['OMS_Y2'] })
})

test('an untagged practical reports nothing, and so applies to everyone', () => {
  assert.deepEqual(itemScope(osce({})), { universityIds: [], yearIds: [] })
})

test('a new practical starts with no scope rather than an invented one', () => {
  const fresh = emptyPracticalCommon()
  assert.equal(fresh.moduleIds, undefined)
  assert.equal(fresh.yearIds, undefined)
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test --experimental-strip-types src/data/practicalScope.test.ts`
Expected: FAIL — `itemScope` returns empty arrays for a tagged practical, so the first assertion fails.

- [ ] **Step 3: Add the fields to `PracticalCommon`**

In `src/data/contentControl.ts`, extend the interface at line 317:

```ts
export interface PracticalCommon {
  references: string[]
  conceptTags: PracticalConceptTags
  /**
   * Assets the station still needs. Stored apart from `LabQuestionDraft.mediaUrl`
   * on purpose — the runner renders any non-empty `mediaUrl` as an `<img>`, so a
   * placeholder written there would show a student a broken image. `section`
   * names the `###` block the asset belongs to, or `station` for the item.
   */
  mediaRequests: MediaRequest[]
  /** What a student who passes this item has demonstrated. */
  learningObjective?: string
  /**
   * Curriculum placement, matching the blocks articles and resources already
   * carry. Absent until somebody tags it — which is also what decides whether a
   * scoped reviewer may edit it, so an untagged station stays with the editors.
   */
  universityIds?: string[]
  yearIds?: string[]
  moduleIds?: string[]
}
```

- [ ] **Step 4: Teach `itemScope` about practicals**

Replace the body of `itemScope` (line 514):

```ts
export function itemScope(item: ManagedContentItem): { universityIds: string[]; yearIds: string[] } {
  const questionTags = item.questionData?.tags
  const scope = item.articleData ?? item.practicalData ?? item.resourceData
  return {
    universityIds: questionTags?.universityIds ?? scope?.universityIds ?? [],
    yearIds: questionTags?.years ?? scope?.yearIds ?? [],
  }
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `node --test --experimental-strip-types src/data/practicalScope.test.ts`
Expected: PASS — 3 tests.

- [ ] **Step 6: Add the pickers to the practical editor**

In `src/components/admin/PracticalEditorDialog.tsx`, find the `Section` that holds the concept tags (search for `conceptTags`). Immediately above it, add a scope section. Read the file first to match its `Section` and `updateData` conventions — the surrounding code is the pattern; do not invent a new one.

Add these imports and the derived option list at the top of the component:

```tsx
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { moduleOptions } from '@/components/admin/pickerOptions'
import { EntityPicker } from '@/components/admin/EntityPicker'
import { YEARS } from '@/data/universities'

// …inside the component:
const { catalogue } = useUniversityCatalogue()
const modulePicks = useMemo(() => moduleOptions(catalogue), [catalogue])
```

`moduleOptions` already exists (`src/components/admin/pickerOptions.ts:88`) and returns `PickerOption[]` grouped by university and year — do not write a second one. Check the exact shape `useUniversityCatalogue` returns before destructuring; `src/pages/student/Library.tsx:43` uses it and is the reference.

Then the section itself:

```tsx
<Section title="Curriculum placement" hint="Who this station is for. An untagged station can only be edited by an editor." icon={GraduationCap}>
  <EntityPicker
    label="Modules"
    noun="modules"
    options={modulePicks}
    selected={data.moduleIds ?? []}
    onChange={(moduleIds) => updateData((current) => ({ ...current, moduleIds }))}
  />
  <p className="mb-1.5 mt-4 text-[11.5px] font-medium text-ink-2">
    Years <span className="font-normal text-ink-3">— leave empty for every year</span>
  </p>
  <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
    {YEARS.map((year) => (
      <label key={year} className="flex items-center gap-2 rounded px-1.5 py-1 text-[11.5px] text-ink-2 hover:bg-inset">
        <input
          type="checkbox"
          className="accent-[var(--color-primary)]"
          checked={(data.yearIds ?? []).includes(year)}
          onChange={() => updateData((current) => ({
            ...current,
            yearIds: (current.yearIds ?? []).includes(year)
              ? (current.yearIds ?? []).filter((id) => id !== year)
              : [...(current.yearIds ?? []), year],
          }))}
        />
        {year.replace('Year ', 'Y')}
      </label>
    ))}
  </div>
</Section>
```

The year checkboxes deliberately copy `ResourceEditorDialog.tsx:229-232` verbatim in shape, including writing `YEARS` labels into `yearIds`. That field already holds labels from the resource editor and scoped ids from the article editor, and `yearNumber` reads both — matching the neighbouring editor is better than introducing a third convention here.

- [ ] **Step 7: Verify the whole client suite and the type-check**

Run: `npm test`
Expected: PASS — all suites.

Run: `npm run build`
Expected: build succeeds with no TypeScript errors.

- [ ] **Step 8: Commit**

```bash
git add src/data/contentControl.ts src/data/practicalScope.test.ts src/components/admin/PracticalEditorDialog.tsx
git commit -m "$(cat <<'EOF'
Let a practical say which year it is for

A station carried references, concepts and media requests, and nothing
at all about where in the curriculum it sits — so it could not be
assigned to a reviewer even in principle. Existing stations are untagged
and stay with the editors until somebody places them, which is the
honest state of the data rather than a silent default.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Teach the browser who it is

**Files:**
- Modify: `src/lib/useIdentity.tsx` (the `Identity` interface at line 66, and where `/api/me` is read)
- Modify: `src/components/auth/RequireAuth.tsx`
- Modify: `src/router.tsx` (the `/admin` route element)

**Interfaces:**
- Consumes: `adminRoles.ts` (Task 2), `adminTabs.ts` (Task 4), the extended `/api/me` (Task 5).
- Produces: `Identity` gains `rank: number`, `tabs: string[]`, `contentScope: { moduleIds: string[]; yearIds: string[] } | null`, and `role` widens to `EffectiveRole | null`. `RequireAuth` accepts `tab?: string` instead of `role?: 'admin'`.

- [ ] **Step 1: Widen the identity**

In `src/lib/useIdentity.tsx`, change the `role` line inside `interface Identity` and add three fields:

```ts
  role: EffectiveRole | null
  /** 0 student, 1 reviewer/admin, 2 editor, 3 super admin. */
  rank: number
  /** The admin tabs this account holds, resolved by the server. */
  tabs: string[]
  /** A reviewer's assigned modules and years; null for everyone else. */
  contentScope: { moduleIds: string[]; yearIds: string[] } | null
```

Import the type: `import type { EffectiveRole } from '@/data/adminRoles'`.

Then carry the four fields through wherever the `/api/me` response is mapped into the context value, and give them demo-mode defaults. In demo mode there is no account system, so the prototype resolves to a super admin who holds everything:

```ts
const DEMO_IDENTITY = {
  role: 'super_admin' as EffectiveRole,
  rank: 3,
  tabs: TAB_IDS as string[],
  contentScope: null,
}
```

Import `TAB_IDS` from `@/data/adminTabs`. Anonymous and loading states get `role: null, rank: 0, tabs: [], contentScope: null`.

- [ ] **Step 2: Replace `RequireAuth`**

```tsx
import { Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useIdentity } from '@/lib/useIdentity'
import { RouteLoading } from '@/components/shell/RouteLoading'
import { hasConsoleAccess } from '@/data/adminRoles'

/**
 * A portal only renders for someone entitled to see it.
 *
 * The server already refuses every admin route, so this is not what keeps data
 * safe. What it fixes is that until now `/app` and `/admin` rendered fully for
 * a signed-out visitor: the student app showed a dashboard belonging to nobody,
 * and the admin console loaded twenty-five pages that each failed on their own.
 * Sending someone to sign in — and back to where they were going — is both more
 * honest and less work than twenty-five separate error states.
 *
 * `tab` narrows it further: a route belongs to a tab, and a role that does not
 * hold that tab never renders it. The same registry decides what the sidebar
 * offers, so a visible link and a rendering page cannot disagree.
 */
export function RequireAuth({ console: needsConsole, tab, children }: {
  console?: boolean
  tab?: string
  children: ReactElement
}) {
  const identity = useIdentity()
  const location = useLocation()

  if (identity.status === 'loading') return <RouteLoading />
  if (identity.status === 'demo') return children
  if (identity.status === 'anonymous') {
    const next = `${location.pathname}${location.search}`
    return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />
  }
  if (needsConsole || tab) {
    if (!hasConsoleAccess(identity.role ?? '')) return <Navigate to="/app" replace />
    // Console access now requires a second factor. Somebody promoted an hour
    // ago has not enrolled yet; send them to enrol rather than to a console
    // whose every request will answer mfa_required.
    if (identity.aal !== 'aal2') return <Navigate to="/account/mfa" replace />
  }
  if (tab && !identity.tabs.includes(tab)) return <Navigate to="/admin" replace />
  return children
}
```

- [ ] **Step 3: Point the admin route at the new prop**

In `src/router.tsx`, change the `adminApp` element (line 197):

```tsx
element: <RequireAuth console><AppShell portal="admin" /></RequireAuth>,
```

- [ ] **Step 4: Confirm the MFA route exists**

Run: `grep -rn "account/mfa\|MfaSetup" src/router.tsx`
Expected: a route path that matches the redirect target above. If the path differs from `/account/mfa`, use the real one in Step 2 rather than adding a route.

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/useIdentity.tsx src/components/auth/RequireAuth.tsx src/router.tsx
git commit -m "$(cat <<'EOF'
Send a new reviewer to enrol, not to a console that will refuse them

Console access now requires a second factor, so somebody promoted an
hour ago has none. Bouncing them to the student app would be a lie about
why; the console asks them to enrol instead.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Carry the version, and say what collided

**Files:**
- Modify: `src/lib/stateStore.ts`
- Modify: `src/lib/api.ts:142-151` (`getState`, `putState`)

**Interfaces:**
- Consumes: the versioned state route (Task 8).
- Produces: `RemoteState<T>` gains `version: number | null`. `putState(key, value, baseVersion)` sends the base. `PersistentStateStatus` gains `conflict: string | null`.

- [ ] **Step 1: Carry the version through the API layer**

In `src/lib/api.ts`, extend `RemoteState` and the two functions:

```ts
export interface RemoteState<T> {
  value: T | null
  updatedAt: string | null
  version: number | null
}

export function putState(key: string, value: unknown, baseVersion: number | null): Promise<{ ok: boolean; version: number | null }> {
  return apiSend(`/state/${encodeURIComponent(key)}`, 'PUT', { value, baseVersion })
}
```

`getState` already returns the parsed body; the added `version` field arrives with it and needs no change beyond the type.

- [ ] **Step 2: Hold the version in the store**

In `src/lib/stateStore.ts`, add to `interface Entry`:

```ts
  /** The version this client last read or wrote. Sent with every save so the
   *  server can work out what we actually changed rather than replacing. */
  version: number | null
```

Initialise it to `null` in `ensureEntry`, and set it from the response in `hydrate` (`remote.version`) and from the `{ version }` a successful `putState` returns.

Add to `PersistentStateStatus`:

```ts
  /** Set when somebody else changed the same items. Cleared on the next read. */
  conflict: string | null
```

- [ ] **Step 3: Send the version and handle the refusals**

In `writeRemote`, pass the entry's version:

```ts
function writeRemote(entry: Entry, value: unknown, keepalive = false): Promise<unknown> {
  return putState(entry.key, value, entry.version)
}
```

In `flush`, where the `ApiError` is caught, branch on status before the existing retry logic:

```ts
    // 409 is not a transport failure and must never be retried: the document
    // moved, so this client's base is wrong and re-sending the same body would
    // only fail again. Re-read, then tell the person what collided — silently
    // discarding their edit is the behaviour this whole change exists to end.
    if (error instanceof ApiError && error.status === 409) {
      const detail = (error.body as { conflicts?: string[]; reason?: string } | undefined)
      setStatus(entry, {
        conflict: detail?.reason
          ?? `Somebody else changed ${detail?.conflicts?.join(', ') ?? 'this'} while you were editing.`,
      })
      hydrate(entry.key)
      return
    }
    if (error instanceof ApiError && error.status === 403) {
      const detail = (error.body as { refusals?: Array<{ reason: string }>; error?: string } | undefined)
      setStatus(entry, {
        conflict: detail?.refusals?.map((refusal) => refusal.reason).join('; ')
          ?? 'That change is not part of your role.',
      })
      hydrate(entry.key)
      return
    }
```

If `ApiError` does not already carry a parsed `body`, add it in `src/lib/apiErrors.ts` alongside `status` — the refusal text is the whole point of the change, and a status code alone cannot carry it.

Clear `conflict` to `null` at the start of a successful `hydrate`.

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/stateStore.ts src/lib/api.ts src/lib/apiErrors.ts
git commit -m "$(cat <<'EOF'
Tell the editor what collided instead of dropping their work

A save now carries the version it started from. A 409 is not a transport
failure and is never retried — the document moved, so re-sending the
same body would only fail again. The page re-reads and says which items
somebody else changed, and a refusal says which change was not theirs
to make.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Render only the tabs this person holds

**Files:**
- Modify: `src/components/shell/nav.ts`
- Modify: `src/components/shell/Sidebar.tsx`
- Modify: `src/router.tsx:172-198`

**Interfaces:**
- Consumes: `adminTabs.ts` (Task 4), `Identity.tabs` (Task 11).
- Produces: `adminNavFor(tabs: string[]): NavGroup[]`; the `/admin` index redirects to the first held tab.

- [ ] **Step 1: Derive the admin nav from the registry**

In `src/components/shell/nav.ts`, delete the hand-written `adminNav` array and replace it:

```ts
import { ADMIN_TAB_VIEWS } from '@/data/adminTabs'

const ADMIN_GROUP_ORDER = ['Overview', 'Content', 'Operations', 'Governance'] as const

/**
 * The admin sidebar, built from the tab registry rather than beside it.
 *
 * These were two lists that had to agree and had no way to. Now a tab appears
 * in the sidebar because the caller holds it, which is the same fact the server
 * checks when the page saves.
 */
export function adminNavFor(tabs: readonly string[]): NavGroup[] {
  const held = new Set(tabs)
  const visible = ADMIN_TAB_VIEWS.filter((view) => held.has(view.id))
  return ADMIN_GROUP_ORDER
    .map((group) => ({
      label: group === 'Overview' ? undefined : group,
      items: visible
        .filter((view) => view.group === group)
        .map((view) => ({ label: view.label, to: view.to, icon: view.icon, end: view.end })),
    }))
    .filter((navGroup) => navGroup.items.length > 0)
}
```

Keep `studentNav` exactly as it is. Replace `navFor`:

```ts
export function navFor(portal: Portal, tabs: readonly string[] = []): NavGroup[] {
  return portal === 'student' ? studentNav : adminNavFor(tabs)
}
```

- [ ] **Step 2: Pass the held tabs in**

In `src/components/shell/Sidebar.tsx`, find the `navFor(portal)` call and give it the identity's tabs:

```tsx
const identity = useIdentity()
const groups = navFor(portal, identity.tabs)
```

Import `useIdentity` from `@/lib/useIdentity`. Check `CommandSearch.tsx` for a second `navFor` caller and give it the same argument — a command palette that offers a page the person cannot open is the same bug in a different place.

- [ ] **Step 3: Guard each admin route by its tab**

In `src/router.tsx`, replace the `adminRoutes` construction (line 180). Each path maps to the tab whose route ends with it:

```tsx
import { ADMIN_TAB_VIEWS } from '@/data/adminTabs'

/** The tab that owns each admin path, so a route and a sidebar link agree. */
const TAB_BY_PATH = new Map(
  ADMIN_TAB_VIEWS.map((view) => [view.to.replace(/^\/admin\/?/, ''), view.id]),
)

const adminRoutes = adminPaths.map((path) => ({
  path,
  element: (
    <RequireAuth tab={TAB_BY_PATH.get(path)}>
      {adminBuilt[path] ?? render(Placeholder)}
    </RequireAuth>
  ),
}))
```

Add `access` to `adminPaths` and `AccessControl` to `adminBuilt` (the page itself is Task 14; import it here as a lazy route so this task's routing is complete):

```tsx
const AccessControl = lazyNamed(() => import('@/pages/admin/AccessControl'), 'AccessControl')
```

Child routes under a parent path (`academic/marks`, the import pages) inherit the parent's guard by sitting inside it; where a child has its own entry in `adminPaths`, map it to the same tab as its parent.

- [ ] **Step 4: Redirect `/admin` to the first tab this person holds**

Replace the admin index route element with a small component in `src/router.tsx`:

```tsx
/**
 * Where `/admin` goes.
 *
 * The Control Dashboard is enrolment and revenue, which a reviewer does not
 * hold, so the console cannot have one fixed front door. It opens on the first
 * tab you actually have.
 */
function AdminHome() {
  const identity = useIdentity()
  if (identity.tabs.includes('dashboard')) return <ControlDashboard />
  const first = ADMIN_TAB_VIEWS.find((view) => identity.tabs.includes(view.id))
  return first ? <Navigate to={first.to} replace /> : <Navigate to="/app" replace />
}
```

- [ ] **Step 5: Verify in the running app**

Run: `npm run build`
Expected: build succeeds.

Start the dev server through the preview tooling (not `npm run dev` in a shell), open `/admin`, and confirm the sidebar renders. In demo mode the identity resolves to super admin, so every tab should appear, including the new **Access Control**.

- [ ] **Step 6: Commit**

```bash
git add src/components/shell/nav.ts src/components/shell/Sidebar.tsx src/components/shell/CommandSearch.tsx src/router.tsx
git commit -m "$(cat <<'EOF'
Open the console on a page this person actually has

The Control Dashboard is enrolment and revenue, which a reviewer does
not hold, so there is no one front door. The sidebar, the command
palette and the routes now read the same registry the server checks, so
a visible link and a rendering page cannot disagree.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 14: The Access Control page

**Files:**
- Create: `src/pages/admin/AccessControl.tsx`

**Interfaces:**
- Consumes: `adminTabs.ts` (Task 4), `usePersistentState`, the `synapse-role-tabs-v1` key.
- Produces: the page component `AccessControl`, already routed in Task 13.

- [ ] **Step 1: Write the page**

Follow the house layout — `PageContainer`, `PageHeader`, `Panel`, `Table` — as `src/pages/admin/MediaRequests.tsx` does.

```tsx
import { useMemo } from 'react'
import { KeyRound } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { usePersistentState } from '@/lib/usePersistentState'
import { ADMIN_TAB_VIEWS, DEFAULT_ROLE_TABS, ROLE_TABS_STATE_KEY, tabsForRole } from '@/data/adminTabs'
import { ROLE_LABEL } from '@/data/adminRoles'

const CONFIGURABLE = ['editor', 'admin', 'reviewer'] as const
type ConfigurableRole = (typeof CONFIGURABLE)[number]
type RoleTabConfig = Partial<Record<ConfigurableRole, string[]>>

/**
 * Which console tabs each role sees.
 *
 * The super admin column is computed and rendered locked, never read from this
 * document. That is what makes locking yourself out impossible, and showing it
 * as a fixed column states the property rather than leaving it implied.
 */
export function AccessControl() {
  const [config, setConfig] = usePersistentState<RoleTabConfig>(ROLE_TABS_STATE_KEY, {})

  const held = useMemo(() => ({
    editor: new Set(tabsForRole('editor', config)),
    admin: new Set(tabsForRole('admin', config)),
    reviewer: new Set(tabsForRole('reviewer', config)),
  }), [config])

  function toggle(role: ConfigurableRole, tabId: string) {
    setConfig((current) => {
      const base = current[role] ?? DEFAULT_ROLE_TABS[role] ?? []
      const next = base.includes(tabId) ? base.filter((id) => id !== tabId) : [...base, tabId]
      return { ...current, [role]: next }
    })
  }

  return (
    <PageContainer>
      <PageHeader
        title="Access control"
        description="Which console tabs each role sees. A tab is the whole unit of permission: hiding one does not only remove the link, it makes the server refuse that area's requests. Super admin holds everything and cannot be changed — that is what makes locking yourself out impossible."
      />
      <Panel className="overflow-hidden">
        <PanelHeader title="Tabs by role" icon={KeyRound} hint={`${ADMIN_TAB_VIEWS.length} tabs`} />
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <Tr>
                <Th>Tab</Th>
                <Th>Governs</Th>
                <Th>{ROLE_LABEL.super_admin}</Th>
                {CONFIGURABLE.map((role) => <Th key={role}>{ROLE_LABEL[role]}</Th>)}
              </Tr>
            </thead>
            <tbody>
              {ADMIN_TAB_VIEWS.map((view) => {
                const governs = [
                  ...view.stateKeys.map((key) => key.replace(/^synapse-|-v\d+$/g, '')),
                  ...view.apiPrefixes,
                ]
                return (
                  <Tr key={view.id}>
                    <Td>
                      <span className="block text-[12.5px] font-medium text-ink">{view.label}</span>
                      <span className="mt-0.5 block font-mono text-[11px] text-ink-3">{view.to}</span>
                    </Td>
                    <Td>
                      <span className="text-[11.5px] leading-snug text-ink-3">
                        {governs.length ? governs.join(' · ') : 'the page only'}
                      </span>
                    </Td>
                    <Td>
                      <Badge tone="success">always</Badge>
                    </Td>
                    {CONFIGURABLE.map((role) => (
                      <Td key={role}>
                        {view.superAdminOnly ? (
                          <span className="text-[11.5px] text-ink-3">super admin only</span>
                        ) : (
                          <label className="flex items-center gap-2 text-[11.5px] text-ink-2">
                            <input
                              type="checkbox"
                              className="size-4 accent-primary"
                              checked={held[role].has(view.id)}
                              onChange={() => toggle(role, view.id)}
                              aria-label={`${view.label} for ${ROLE_LABEL[role]}`}
                            />
                          </label>
                        )}
                      </Td>
                    ))}
                  </Tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </Panel>
    </PageContainer>
  )
}
```

- [ ] **Step 2: Verify it renders and saves**

Run: `npm run build`
Expected: build succeeds.

In the running app, open `/admin/access`. Confirm:
- Every tab is listed with its route and what it governs.
- The super admin column reads `always` on every row and has no control.
- Settings, Audit & Security and Access Control read `super admin only` in the other three columns.
- Unticking **Users** for Admin persists across a reload.

- [ ] **Step 3: Commit**

```bash
git add src/pages/admin/AccessControl.tsx
git commit -m "$(cat <<'EOF'
Show what each tab governs before you switch it off

Every row names the documents and routes it controls, so hiding a tab is
a decision rather than a guess about what will break. The super admin
column is computed and locked: stating the property on screen is better
than leaving it implied by code nobody reads.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 15: Role and scope on the Users page

**Files:**
- Create: `src/components/admin/ReviewerScopeEditor.tsx`
- Modify: `src/pages/admin/UsersManagement.tsx`
- Modify: `src/components/admin/AccountAccessPanel.tsx`
- Modify: `src/data/adminUsers.ts:11` (`UserRole`)

**Interfaces:**
- Consumes: `adminRoles.ts` (Task 2), `Identity.role` (Task 11), `POST /api/admin/users/:id/role` and `/scope` (Task 9).
- Produces: `ReviewerScopeEditor` component taking `{ userId, scope, onSaved }`.

- [ ] **Step 1: Widen the client user type**

In `src/data/adminUsers.ts`, replace line 11 and extend the identity record:

```ts
export type UserRole = 'student' | 'reviewer' | 'admin' | 'editor' | 'super_admin'
```

And in `AdminUserIdentity`, add:

```ts
  /** A reviewer's assigned modules and years. Null for every other role. */
  contentScope: { moduleIds: string[]; yearIds: string[] } | null
```

- [ ] **Step 2: Offer only the roles this actor may assign**

In `src/pages/admin/UsersManagement.tsx`, wherever the role control is rendered, derive its options from the signed-in identity rather than a fixed list:

```tsx
const identity = useIdentity()
const options = assignableRoles(identity.role ?? '')
```

Render a locked badge instead of a control when the target is a super admin or when `options` is empty:

```tsx
{target.identity?.role === 'super_admin' ? (
  <Badge tone="primary">{ROLE_LABEL.super_admin} · set in server configuration</Badge>
) : options.length === 0 ? (
  <p className="text-[11.5px] text-ink-3">Changing roles is above your level.</p>
) : (
  <Select value={role} onChange={(event) => setRole(event.target.value as StoredRole)}>
    {options.map((value) => <option key={value} value={value}>{ROLE_LABEL[value]}</option>)}
  </Select>
)}
```

Import `assignableRoles`, `ROLE_LABEL` and the `StoredRole` type from `@/data/adminRoles`.

- [ ] **Step 3: Write the scope editor**

Create `src/components/admin/ReviewerScopeEditor.tsx`:

```tsx
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { EntityPicker, type PickerOption } from '@/components/admin/EntityPicker'
import { moduleOptions } from '@/components/admin/pickerOptions'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { apiPost } from '@/lib/api'

/**
 * Which modules and years a reviewer may write.
 *
 * A reviewer with nothing assigned holds no content — empty tables and every
 * save refused. That is deliberate: hiring somebody for Year 2 anatomy should
 * not begin by giving them everything and trusting them to stay put. The
 * warning below says so plainly rather than leaving an empty state to be read
 * as a bug.
 *
 * Years are chosen as university-scoped ids (KAU_Y1, OMS_Y2) rather than as the
 * plain labels the content editors write. The id is the only form that names a
 * university, and without it "Year 2" would hand a reviewer at one university
 * every other university's second year.
 */
export function ReviewerScopeEditor({ userId, scope, onSaved }: {
  userId: string
  scope: { moduleIds: string[]; yearIds: string[] } | null
  onSaved: () => void
}) {
  const { catalogue } = useUniversityCatalogue()
  const modulePicks = useMemo(() => moduleOptions(catalogue), [catalogue])
  const yearPicks = useMemo<PickerOption[]>(() => catalogue.flatMap((university) =>
    university.years.map((year) => ({
      id: year.id,
      label: year.year,
      sublabel: year.id,
      group: university.short,
    }))), [catalogue])

  const [moduleIds, setModuleIds] = useState<string[]>(scope?.moduleIds ?? [])
  const [yearIds, setYearIds] = useState<string[]>(scope?.yearIds ?? [])
  const [reason, setReason] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const empty = moduleIds.length === 0 && yearIds.length === 0

  async function save() {
    setSaving(true)
    setMessage(null)
    try {
      await apiPost(`/admin/users/${encodeURIComponent(userId)}/scope`, { moduleIds, yearIds, reason })
      setMessage('Scope saved, and recorded in the account audit.')
      onSaved()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save that scope.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <EntityPicker label="Modules" noun="modules" options={modulePicks} selected={moduleIds} onChange={setModuleIds} />
      <EntityPicker label="Years" noun="years" options={yearPicks} selected={yearIds} onChange={setYearIds} />
      {empty && (
        <p className="rounded-lg border border-warning/40 bg-warning-tint px-3 py-2.5 text-[11.5px] leading-relaxed text-ink-2">
          With nothing assigned this reviewer holds no content: every content table reads empty and every save is refused. Assign at least one module or year.
        </p>
      )}
      <Field label="Reason" hint="Minimum 8 characters; stored in the audit">
        <TextInput value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Why this reviewer covers these modules" />
      </Field>
      <Button variant="primary" loading={saving} disabled={reason.trim().length < 8} onClick={() => void save()}>
        Save scope
      </Button>
      {message && <p role="status" className="text-[11.5px] leading-relaxed text-ink-2">{message}</p>}
    </div>
  )
}
```

Check the real prop names of `CheckList` and `EntityPicker` before wiring — `QuestionEditorDialog.tsx` uses both and is the reference.

- [ ] **Step 4: Show the editor for reviewers only**

In `UsersManagement.tsx`, inside the detail panel, render it when the target's role is `reviewer`:

```tsx
{target.identity?.role === 'reviewer' && (
  <ReviewerScopeEditor
    userId={target.id}
    scope={target.identity.contentScope}
    onSaved={reload}
  />
)}
```

`target` is the currently selected `AdminUser` in the detail panel and `reload` is the existing function that refetches the roster — both already exist in this file under whatever names it uses. Read the surrounding panel before wiring rather than assuming these two.

- [ ] **Step 5: Repoint `AccountAccessPanel`**

In `src/components/admin/AccountAccessPanel.tsx`, change the role type on lines 13 and 21 to the widened `UserRole`, populate the `Select` from `assignableRoles(identity.role ?? '')`, and change the request on line 49 from the deleted promote endpoint to the guarded one:

```ts
await apiPost(`/admin/users/${encodeURIComponent(selected.userId)}/role`, { role, reason })
```

- [ ] **Step 6: Verify**

Run: `npm run build && npm test`
Expected: build succeeds, all tests PASS.

In the running app, open `/admin/users`. Confirm the role control lists Student, Reviewer, Admin and Editor for a super admin, and that selecting Reviewer reveals the scope editor with the empty-scope warning.

- [ ] **Step 7: Commit**

```bash
git add src/data/adminUsers.ts src/pages/admin/UsersManagement.tsx src/components/admin/ReviewerScopeEditor.tsx src/components/admin/AccountAccessPanel.tsx
git commit -m "$(cat <<'EOF'
Offer only the roles this person could actually grant

The control is built from the same rule the server enforces, so nothing
it offers can be refused. A reviewer with nothing assigned holds no
content, and the panel says so rather than leaving an empty table to be
read as a bug.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 16: Show a reviewer only their own content

**Files:**
- Create: `src/data/contentScope.ts`
- Create: `src/data/contentScope.test.ts`
- Create: `src/lib/useScopedContent.ts`
- Modify: `src/pages/admin/QuestionsSetup.tsx`, `LibrarySetup` (`src/pages/admin/*` — the Library Setup page), `PracticalSetup.tsx`, `ResourcesSetup.tsx`, `ConceptsSetup.tsx`, `MediaRequests.tsx`

**Interfaces:**
- Consumes: `Identity.contentScope` (Task 11), the server rules in `server/src/contentScope.js` (Task 6).
- Produces: `src/data/contentScope.ts` mirroring `yearNumber`, `itemWritableBy` and `changeWritableBy`; `useScopedItems(items)` and `useScopedConcepts(concepts)` from `src/lib/useScopedContent.ts`.

Without this a reviewer sees the whole catalogue and learns where their boundary is only when a save is refused. The server is still the authority — this is what makes the console usable, not what makes it safe.

- [ ] **Step 1: Write the failing parity test**

Create `src/data/contentScope.test.ts`:

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { changeWritableBy, itemWritableBy, yearNumber } from './contentScope.ts'
import * as server from '../../server/src/contentScope.js'

const scope = { moduleIds: ['MOD_CVS'], yearIds: ['OMS_Y2'] }
const question = (moduleIds: string[], years: string[] = []) =>
  ({ id: 'q', kind: 'question', questionData: { tags: { moduleIds, years } } })

test('the client reads a year exactly as the server does', () => {
  for (const value of ['Year 2', 'OMS_Y2', 2, 'HU_Y10', 'OMS_INT1', 'Internship Year 1', '', null, 'nonsense']) {
    assert.equal(yearNumber(value as never), server.yearNumber(value), `yearNumber(${JSON.stringify(value)})`)
  }
})

test('the client and the server agree on every writability question', () => {
  const items = [
    question(['MOD_CVS']), question(['MOD_RES']), question([], ['Year 2']), question([], ['Year 4']), question([]),
  ]
  for (const item of items) {
    assert.equal(itemWritableBy(scope, 'question', item as never), server.itemWritableBy(scope, 'question', item))
    assert.equal(itemWritableBy(null, 'question', item as never), server.itemWritableBy(null, 'question', item))
    for (const other of items) {
      assert.equal(
        changeWritableBy(scope, 'question', item as never, other as never),
        server.changeWritableBy(scope, 'question', item, other),
      )
    }
  }
})

test('an unscoped viewer sees everything, and an unassigned reviewer sees nothing', () => {
  assert.equal(itemWritableBy(null, 'question', question([]) as never), true)
  assert.equal(itemWritableBy(scope, 'question', question([]) as never), false)
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test --experimental-strip-types src/data/contentScope.test.ts`
Expected: FAIL — `Cannot find module './contentScope.ts'`

- [ ] **Step 3: Write the client mirror**

Create `src/data/contentScope.ts` as a direct transliteration of `server/src/contentScope.js` (Task 6) — same functions, same order, same comments, with these TypeScript signatures:

```ts
import type { ManagedContentItem } from './contentControl.ts'
import type { Concept } from './conceptGraph.ts'

export interface ContentScope { moduleIds: string[]; yearIds: string[] }
export type ScopedKind = 'question' | 'article' | 'practical' | 'resource' | 'concept'
export type ScopedItem = ManagedContentItem | Concept

export function yearNumber(value: string | number | null | undefined): number | null
export function itemModules(kind: ScopedKind, item: ScopedItem | null): string[]
export function itemYears(kind: ScopedKind, item: ScopedItem | null): number[]
export function itemUniversities(kind: ScopedKind, item: ScopedItem | null): string[]
export function itemWritableBy(scope: ContentScope | null, kind: ScopedKind, item: ScopedItem | null): boolean
export function changeWritableBy(scope: ContentScope | null, kind: ScopedKind, before: ScopedItem | null, after: ScopedItem | null): boolean
```

Do not paraphrase the logic — the parity test compares the two implementations against each other, and a "tidier" client version is exactly what that test exists to catch. Declared rather than imported, for the same reason as `adminTabs.ts`: the server module is untyped JavaScript outside `src`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test --experimental-strip-types src/data/contentScope.test.ts`
Expected: PASS — 3 tests.

- [ ] **Step 5: Write the hook**

Create `src/lib/useScopedContent.ts`:

```ts
import { useMemo } from 'react'
import { useIdentity } from './useIdentity'
import { itemWritableBy, type ScopedKind } from '@/data/contentScope'
import type { ManagedContentItem } from '@/data/contentControl'
import type { Concept } from '@/data/conceptGraph'

/**
 * The content this person may actually work on.
 *
 * A reviewer scoped to one module should not scroll a catalogue they cannot
 * edit and discover the boundary only when a save is refused. The server is
 * still what enforces this; the filter is what makes the console usable.
 *
 * Everyone unscoped — editors, super admins, and the demo build — gets the list
 * back untouched, so this is free for every other role.
 */
export function useScopedItems(items: ManagedContentItem[]): ManagedContentItem[] {
  const { contentScope } = useIdentity()
  return useMemo(
    () => (contentScope ? items.filter((item) => itemWritableBy(contentScope, item.kind as ScopedKind, item)) : items),
    [contentScope, items],
  )
}

export function useScopedConcepts(concepts: Concept[]): Concept[] {
  const { contentScope } = useIdentity()
  return useMemo(
    () => (contentScope ? concepts.filter((concept) => itemWritableBy(contentScope, 'concept', concept)) : concepts),
    [concepts, contentScope],
  )
}
```

- [ ] **Step 6: Apply it to the six content surfaces**

In each page, wrap the ledger read at the point the list is derived — not at the point it is rendered, so counts, filters and empty states all agree:

| File | Change |
|---|---|
| `src/pages/admin/QuestionsSetup.tsx` | `const items = useScopedItems(ledger)` before any filtering |
| Library Setup page | same |
| `src/pages/admin/PracticalSetup.tsx` | same |
| `src/pages/admin/ResourcesSetup.tsx` | same |
| `src/pages/admin/MediaRequests.tsx:78` | `const scoped = useScopedItems(ledger)`, then build `rows` from `scoped` rather than `ledger` |
| `src/pages/admin/ConceptsSetup.tsx` | `const concepts = useScopedConcepts(graph.concepts)` |

Note for `MediaRequests.tsx`: the `nodeByArticle` map on line 82 must still be built from the **unfiltered** ledger. It exists so a question inherits its article's placement, and an article a reviewer cannot edit may still be the one that places a question they can.

Each page also needs an honest empty state when the filter, not the data, is why the table is blank:

```tsx
{contentScope && items.length === 0 && (
  <EmptyState
    icon={ImagePlus}
    title="Nothing here is assigned to you"
    description="You can work on the modules and years assigned to your account. Ask a super admin or an editor to widen your scope."
  />
)}
```

- [ ] **Step 7: Verify**

Run: `npm test && npm run build`
Expected: all suites PASS, build succeeds.

In the running app the demo identity is a super admin with no scope, so every table must be **unchanged** — this filter is invisible to everyone except a scoped reviewer, and a regression here would be a silently emptied console.

- [ ] **Step 8: Commit**

```bash
git add src/data/contentScope.ts src/data/contentScope.test.ts src/lib/useScopedContent.ts src/pages/admin/
git commit -m "$(cat <<'EOF'
Show a reviewer the work that is theirs

Scrolling a catalogue you cannot edit, and finding the boundary only
when a save is refused, is a worse way to learn your scope than not
being shown it. The server still decides; this is what makes the console
usable. Everyone unscoped gets the list back untouched.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 17: Prove the refusals, end to end

**Files:**
- Create: `docs/superpowers/plans/2026-08-21-admin-role-hierarchy-verification.md`

**Interfaces:**
- Consumes: everything above.
- Produces: a recorded verification run. No production code changes; if this task finds a defect, fix it in the task that owns it and re-run.

- [ ] **Step 1: Run every suite**

```bash
npm test && npm run lint && npm run build && cd server && npm test
```

Expected: all green, no lint errors, build succeeds.

- [ ] **Step 2: Confirm no bypass survives**

```bash
cd server && grep -rn "requireAdmin\|access/users/:userId/promote" src/ ; grep -rn "role === 'admin'" src/
```

Expected: no output from either. Any hit is a guard that still believes there are two roles.

- [ ] **Step 3: Verify a hidden tab refuses its API, not only its link**

This is the claim the whole design rests on, so it is tested as behaviour. With the server running and a real Supabase session for a test account:

1. Set the account's role to `reviewer` and give it a scope of one module.
2. `GET /api/session` — confirm `tabs` contains `questions` and not `users`.
3. `POST /api/admin/users/<some-id>/role` with a valid reason — expect **403** `that area is not part of your role`.
4. `PUT /api/state/synapse-vouchers-v1` — expect **403**.
5. `PUT /api/state/synapse-admin-content-ledger-v4` changing a question inside the reviewer's module — expect **200**.
6. The same call changing a question outside it — expect **403** with a `refusals` array naming the item.
7. `GET /api/state` (bulk hydrate) — expect **403**, super admin only.

Record each status code in the verification document.

- [ ] **Step 4: Verify the merge with two sessions**

1. Open Questions Setup in two browser profiles signed in as different console accounts.
2. Edit **different** questions in each, save both. Expect both edits present after a reload — this is the bug that previously destroyed one of them.
3. Edit the **same** question in each, save both. Expect the second to report the collision by name and re-read, with neither edit silently lost.

- [ ] **Step 5: Verify MFA routing**

Sign in as a freshly promoted reviewer with no second factor enrolled. Expect `/admin` to land on the MFA enrolment screen, not the student app and not a console of failing pages.

- [ ] **Step 6: Write up what was observed**

Record, in `docs/superpowers/plans/2026-08-21-admin-role-hierarchy-verification.md`: each command run, the status code or screen observed, and anything that did not match. State plainly whether every check passed. **Do not report this work as complete on the strength of the code alone** — an untested refusal is an assumption.

- [ ] **Step 7: Commit**

```bash
git add docs/superpowers/plans/2026-08-21-admin-role-hierarchy-verification.md
git commit -m "$(cat <<'EOF'
Record what the refusals actually did

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Deployment note

Before this reaches production, every current `admin` needs a decision: become an `editor` (the likely answer for anyone doing content work — Admin is operations-only under these defaults) or stay `admin` and lose the content tabs. Produce the list from the live table:

```sql
SELECT user_id, email, role FROM user_access WHERE role <> 'student' ORDER BY created_at;
```

Set `SUPER_ADMIN_EMAILS=doitrous@hotmail.com,info@doitrous.com` in the Coolify environment **before** deploying. Without it the server boots with a warning and no account holds super admin — survivable, but Access Control would be unreachable.
