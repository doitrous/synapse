# Admin role hierarchy — verification record

Date: 2026-08-21
Branch: `claude/media-library-user-hierarchy-42f2c5`
Plan: `docs/superpowers/plans/2026-08-21-admin-role-hierarchy.md`

## What was verified here, and what could not be

This worktree has **no database credentials** (`server/.env.example` only) and
**no Supabase session**. Everything that can be checked without them was; the
rest is listed under *Outstanding* below and must be run against the deploy
before this is called done. Nothing in that list is claimed as passing.

## Automated suites

| Command | Result |
|---|---|
| `npm test` | **867 passed, 0 failed** (was 855 before this work — 12 new) |
| `cd server && npm test` | **105 passed, 0 failed** (was 70 — 35 new) |
| `npm run build` (`tsc -b` + Vite) | **succeeds**, no TypeScript errors |
| `npm run lint` | **0 errors**, 19 warnings — all pre-existing `only-export-components` |

New suites: `roles`, `tabs`, `contentScope`, `stateMerge` (server);
`adminRoles`, `adminTabs`, `contentScope`, `practicalScope` (client, three of
which import the server module and assert the two implementations agree).

## Static sweeps

```
grep -rn "requireAdmin|role === 'admin'|role !== 'admin'" server/src/   → no matches
grep -rn "role === 'admin'|role !== 'admin'" src/                       → no matches
grep -c  "access/users/:userId/promote" server/src/index.js             → comment only, no route
```

Every route that was `requireAdmin` now names a tab. The two-role assumption
survives nowhere in either half.

## Verified in a running browser (demo mode, `/admin`)

Demo mode resolves to a super admin with no content scope, which is exactly the
identity that must see **no** change from this work.

| Check | Result |
|---|---|
| `/admin/access` renders, 26 tabs listed with what each governs | pass |
| Super admin column reads `always` on every row, with no control | pass |
| Settings / Audit / Access Control read `super admin only` for the other three | pass |
| 69 checkboxes = 23 configurable tabs × 3 roles | pass |
| Defaults match the approved table — Users on for Admin and off for Reviewer; Questions the reverse; Systems & Topics off for Reviewer; Media Requests on; Control Dashboard off | pass |
| Toggling Users off for Admin writes an explicit list omitting `users` | pass |
| That toggle survives a reload; header reads "1 role customised" | pass |
| "Back to defaults → Admin" restores the default and clears the document to `{}` | pass |
| Students no longer shows the removed promotion panel | pass |
| **Scope filter is a no-op when unscoped** — a seeded ledger holding an untagged question and a Year 4 question both render for a super admin | pass |

That last one is the regression this task most needed to rule out: a filter that
quietly emptied the console for everyone would be worse than no filter.

**Console 403s seen during this run are unrelated.** They are Vite refusing to
serve `@fontsource-variable` woff2 files from the *parent* checkout's
`node_modules`, because this worktree has none of its own and the path falls
outside its allowed fs roots. A worktree artifact; the production build embeds
its own fonts.

## Outstanding — requires the deploy

These are the checks that need a live database and a real Supabase session.
**None of them has been run.**

1. **Migration.** `migrate()` runs at boot (`server/src/index.js:1414`). After
   deploy, confirm:
   `SELECT COLUMN_NAME, COLUMN_TYPE FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'user_access' AND COLUMN_NAME IN ('role','content_scope');`
   Expect `role` = `enum('student','reviewer','admin','editor')` and
   `content_scope` = **`longtext`** — MariaDB implements JSON as a LONGTEXT
   alias, so that is correct and not a failed migration.
2. **A hidden tab refuses its API.** As a `reviewer` with one module assigned:
   `GET /api/session` lists `questions` and not `users`;
   `POST /api/admin/users/<id>/role` → **403**;
   `PUT /api/state/nishany-vouchers-v1` → **403**;
   `GET /api/state` (bulk hydrate) → **403**;
   `PUT /api/state/nishany-admin-content-ledger-v4` changing an in-scope
   question → **200**, and an out-of-scope one → **403** with a `refusals` array
   naming the item.
3. **The merge, with two sessions.** Two console accounts editing *different*
   questions: both edits survive a reload. Editing the *same* question: the
   second is told which item collided and neither is lost silently.
4. **MFA routing.** A freshly promoted reviewer with no second factor lands on
   `/auth/mfa`, not the student app and not a console of failing pages.
5. **The Users page role control and scope editor.** Both render only inside a
   selected user's detail panel, which needs the live roster — so neither was
   exercised here beyond compiling and the page shell rendering.

## Deployment prerequisites

- `SUPER_ADMIN_EMAILS=doitrous@hotmail.com,info@doitrous.com` must be set on the
  **API** resource before deploy. Without it the server boots with a warning,
  nobody holds super admin, and Access Control is unreachable. (Confirmed set by
  the owner on 2026-08-21.)
- Every current `admin` needs a decision — Editor (likely, for anyone doing
  content work) or stay Admin and lose the content tabs:
  `SELECT user_id, email, role FROM user_access WHERE role <> 'student' ORDER BY created_at;`
