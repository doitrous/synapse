# Admin role hierarchy, tab permissions, and scoped content writes

Date: 2026-08-20
Status: approved design, not yet planned
Scope: server auth, admin console, shared-state write path

## Problem

The product has two roles: `student` and `admin`. That value is stored in
`user_access.role`, checked by a single server guard (`requireAdmin`,
`server/src/auth.js:77`), and mirrored on the client as
`Identity.role: 'student' | 'admin' | null` (`src/lib/useIdentity.tsx:66`). Every
one of the 25 admin surfaces is behind that one guard, so an account either has
the entire console or none of it.

Three consequences.

1. **There is no way to hire help.** Somebody brought in to source images for
   media-needing questions receives, along with that ability, the payments
   console, the student roster, the mail box, and the ability to promote
   themselves. There is no role between "student" and "everything".
2. **Role changes have two doors and one lock.**
   `POST /api/admin/users/:id/role` (`server/src/index.js:817`) refuses a
   self-edit and guards the last admin.
   `POST /api/access/users/:userId/promote` (`server/src/index.js:844`) does
   neither, and reaches the same column. Under a hierarchy this is an
   escalation route, not merely a duplication.
3. **Concurrent admin writes silently destroy work.** Every content surface
   persists by `PUT /api/state/:key` (`server/src/index.js:579`), which replaces
   a whole JSON document. All articles, questions, practicals and resources live
   in one document, `synapse-admin-content-ledger-v4`. Two people editing at the
   same time means the second save erases the first's. With two admins that is
   rare. With a team of reviewers it is the normal case.

## Decisions taken

These were settled during brainstorming and are not open in planning.

| Decision | Choice |
|---|---|
| Where super admin lives | **Derived from email**, never stored. An `SUPER_ADMIN_EMAILS` allowlist in server config. Not grantable, not demotable, no row to change. |
| Stored roles | `user_access.role` widens to `student \| reviewer \| admin \| editor`. |
| Reviewer and Admin | **Peers at the same rank**, different scopes. Neither can act on the other. |
| Unit of permission | **The tab.** If you hold the tab you can do everything on it. No read-only tier, no capability matrix. |
| Who configures tabs | **Super admin only**, per role. The super admin's own row is fixed to everything and is not editable. |
| Admin's default scope | **Operations, not content.** |
| Reviewer's default scope | **Medical content**, minus Systems & Topics (see below). |
| Editor's ceiling | An Editor may promote up to Admin/Reviewer. **Only a super admin creates or removes an Editor.** |
| Reviewer content scope | **Assigned modules and/or years, enforced on the server.** No assignment means no content. |
| MFA | **Required for every role with console access** — reviewer, admin, editor, super admin. |
| Ledger writes | **Diff against a base version and merge**, for every caller, not only scoped ones. |
| Systems & Topics in this phase | **Editor and above.** Its nodes carry no module or year, so reviewer scope cannot be enforced on it yet. |
| Practical tagging | `PracticalCommon` gains `moduleIds` and `yearIds` **in this phase**, because without them a practical cannot be scoped to a reviewer at all. |

## Non-goals

- Per-tab read/edit/publish distinctions. Deliberately excluded; the tab is the
  unit.
- Scoping Admins. Admin holds no content tabs, so content scope does not apply.
- The media subsystem and the By-module / By-year library views. Those are
  separate phases with their own specs; this one is a prerequisite for both.

---

## 1. The role model

### Ranks

| Effective role | Rank | Stored as |
|---|:-:|---|
| Student | 0 | `student` |
| Reviewer | 1 | `reviewer` |
| Admin | 1 | `admin` |
| Editor | 2 | `editor` |
| Super admin | 3 | *not stored — derived from email* |

`rank(identity)` resolves to 3 when the signed-in email appears in
`SUPER_ADMIN_EMAILS` (`doitrous@hotmail.com`, `info@doitrous.com`), otherwise
from the stored role. Console access is `rank >= 1`.

### The one promotion rule

An actor may set a target's role only when **both** hold:

```
rank(actor) > rank(target)        // you outrank who you are changing
rank(actor) > rank(newRole)       // you outrank what you are making them
```

Everything specified follows from that pair, with no special cases:

- An Editor (2) may move anyone at rank 0–1 between student, reviewer and admin.
- An Editor cannot demote another Editor — `2 > 2` is false.
- An Editor cannot create an Editor — `2 > 2` is false on the second test. This
  is the same test that stops them removing one, so the two rules are one rule.
- A super admin (3) may do anything to any stored role. "Demote a super admin"
  is not expressible, because a super admin has no role row to write.
- Nobody may change their own role. Already enforced; retained.

The rule lives in one module, imported by the server as the authority and by the
client to decide which options to render. The UI must never offer an action the
API would refuse.

### Ripples

- `requireAdmin` becomes `rank >= 1` plus a tab check (§2). The name goes with
  the meaning.
- `RequireAuth role="admin"` (`src/components/auth/RequireAuth.tsx:16`) and
  `Identity.role` widen to the new union. Demo mode (no `VITE_API_BASE`)
  resolves to super admin so the offline prototype still shows everything.
- The `last_admin` guard (`server/src/accounts.js:523`) becomes *the last
  account with console access*. The two super admins cannot be locked out by
  construction, but they may not have signed in yet, so the net stays.
- `POST /api/access/users/:userId/promote` is **removed**. `AccountAccessPanel`
  repoints at `POST /api/admin/users/:id/role`. One door, one lock.
- If `SUPER_ADMIN_EMAILS` is unset or empty, the server logs loudly at boot and
  retains current behaviour rather than locking everybody out.

### MFA

Any identity with `rank >= 1` must present `aal2`. `mfaSatisfied` stops being an
opt-in flag on the row and becomes a consequence of rank; the `mfa_required`
column is kept only for students who opt in voluntarily.

A person newly promoted to a console role holds no second factor yet. `/admin`
must therefore route an authenticated console role without `aal2` to
`src/pages/auth/MfaSetup.tsx` — not bounce them to `/app`, and not render 25
pages that each fail with `mfa_required` on their own.

---

## 2. Tabs as permissions

### One registry

The sidebar (`src/components/shell/nav.ts`), the router
(`src/router.tsx:172`) and the server guards are three independent lists today.
A permission system built on three lists has three answers. They collapse into
one `ADMIN_TABS` registry, shared by client and server, from which nav, routes
and guards are all derived.

```ts
interface AdminTab {
  id: string                 // 'questions'
  label: string              // 'Questions Setup'
  to: string                 // '/admin/questions'
  icon: LucideIcon
  group: 'Overview' | 'Content' | 'Operations' | 'Governance'
  stateKeys: string[]        // app_state documents this tab may write
  apiPrefixes: string[]      // named API routes this tab owns
  superAdminOnly?: boolean
}
```

### Enforcement has two surfaces

**a. `PUT`/`DELETE /api/state/:key`.** The key resolves to its owning tab(s); the
caller must hold at least one. This covers every content surface, because they
all persist app_state documents.

**Any app_state key absent from the registry is super-admin-only.** Fail closed:
a key added later without a registry entry becomes unreachable, which is a bug
report, not a hole.

Two documents are shared by several tabs, and key-level gating is too coarse for
them. Both are already keyed collections, so they are gated per item using the
same diff the merge computes (§3):

| Document | Item | Owning tab |
|---|---|---|
| `synapse-admin-content-ledger-v4` | `item.kind === 'article'` | Library Setup |
| | `item.kind === 'question'` | Questions Setup |
| | `item.kind === 'practical'` | Practical Setup |
| | `item.kind === 'resource'` | Resources & Media |
| `synapse-concept-graph-v2` | `concepts[]` | Concepts |
| | `relations[]` | Relationships |

`mediaRequests` live inside their owner item, so a Media Requests write is a
change to the owning article/question/practical and is checked against **either**
the Media Requests tab or the owner's tab.

**b. Named admin routes.** `requireAdmin` is replaced route-by-route with
`requireTab(id)`:

| Routes | Tab |
|---|---|
| `/api/admin/users*`, `/api/access/users*` | Users |
| `/api/students*` | Students |
| `/api/mail*`, `/api/mailboxes*` | Mail Box |
| `/api/vouchers*` (admin side) | Vouchers |
| `/api/admin/assistant*` | AI Assistant |
| `/api/medical-resources/*` (write), `/api/medical-library/coverage/*` | Resources & Media |
| `/api/backups*`, `/api/launch/*` | Audit & Security |
| `/api/state` (bulk hydrate) | *super admin only* |

`GET /api/state/:key` keeps its current rule: keys in `STUDENT_READABLE_STATE`
stay readable by any signed-in account; everything else needs console access.
Read access is not narrowed by tab in this phase — the tab governs writes and
navigation. Narrowing reads would break cross-surface pickers (a question editor
reads the concept graph) for no security gain, since the same documents are
already student-readable.

### Default tab sets

Super admin holds every tab and **its column is not editable** — that is the
anti-lockout property. Editor holds everything except the three
`superAdminOnly` tabs.

| Tab | Super | Editor | Admin | Reviewer |
|---|:-:|:-:|:-:|:-:|
| Control Dashboard | ● | ● | ● | ○ |
| Library Setup | ● | ● | ○ | ● |
| Questions Setup | ● | ● | ○ | ● |
| Practical Setup | ● | ● | ○ | ● |
| Concepts | ● | ● | ○ | ● |
| Media Requests | ● | ● | ○ | ● |
| Resources & Media | ● | ● | ○ | ● |
| Systems & Topics | ● | ● | ○ | ○ |
| Relationships | ● | ● | ○ | ○ |
| Glossary | ● | ● | ○ | ○ |
| Adaptive Learning | ● | ● | ○ | ○ |
| Academic Setup | ● | ● | ○ | ○ |
| Marks & Weights | ● | ● | ○ | ○ |
| Content Reports | ● | ● | ● | ○ |
| Users | ● | ● | ● | ○ |
| Students | ● | ● | ● | ○ |
| Payments & Finance | ● | ● | ● | ○ |
| Vouchers | ● | ● | ● | ○ |
| Email & Automations | ● | ● | ● | ○ |
| Mail Box | ● | ● | ● | ○ |
| Student Notifications | ● | ● | ● | ○ |
| Privacy & Support | ● | ● | ● | ○ |
| AI Assistant | ● | ● | ● | ○ |
| **Settings** | ● | ○ | ○ | ○ |
| **Audit & Security** | ● | ○ | ○ | ○ |
| **Access Control** (new) | ● | ○ | ○ | ○ |

Every ●/○ outside the super admin column and the three `superAdminOnly` rows is
a **default, not a rule** — the super admin flips any of them on Access Control.

Import sub-pages (Bulk Import, Concepts Import, Relations Import, Evidence
Import, Academic Import, Subjects Import, Glossary Import, Medical Coverage
Review) are child routes and inherit their parent tab.

`/admin` currently lands on Control Dashboard. It becomes a redirect to the
first tab the caller holds — Library Setup for a Reviewer under these defaults.

### Where the configuration lives

A new app_state key, `synapse-role-tabs-v1`, shaped
`Record<'editor' | 'admin' | 'reviewer', string[]>`, owned by the Access Control
tab — so it is super-admin-only by the same mechanism that governs everything
else, with no bespoke guard. A role missing from the document falls back to the
defaults above. An unknown tab id in a stored list is ignored.

---

## 3. Reviewer content scope, and the write protocol

### Where scope lives

A new nullable column, `user_access.content_scope JSON`, shaped
`{ moduleIds: string[], yearIds: string[] }`. It is read by the query that
already fetches role, status and MFA (`server/src/auth.js:24`), so it costs no
extra round trip and arrives on `req.identity` with everything else.

- Rank >= 2 (Editor, super admin) is always unscoped.
- Admin holds no content tabs, so scope does not apply.
- A Reviewer with `null` or empty scope holds **no content**: empty tables, every
  write refused, until someone assigns a module or a year.

### What "in scope" means

`itemScope(item)` (`src/data/contentControl.ts:514`) already knows where each
content kind keeps its tags. It gains a `moduleIds` arm:

| Kind | Modules | Years | Year form |
|---|---|---|---|
| question | `questionData.tags.moduleIds` | `questionData.tags.years` | labels — `"Year 2"` |
| article | `articleData.moduleIds` | `articleData.yearIds` | scoped ids — `"OMS_Y2"` |
| resource | `resourceData.moduleIds` | `resourceData.yearIds` | scoped ids |
| concept | `concept.moduleIds` | `concept.learnerYears` | numbers — `2` |
| practical | **none — see below** | **none** | — |

An item is writable when its modules or its years intersect the reviewer's.

**Years are stored three different ways** and this is the one place that has to
reconcile them: question tags hold labels from `YEARS`, articles and resources
hold university-scoped ids from `yearId()` (`src/data/taxonomy.ts:26`), and
concepts hold plain numbers. Scope matching therefore compares **year numbers**,
extracted by one `yearNumber(value)` that accepts all three forms, and
additionally requires university overlap when both the item and the reviewer
declare universities. Reviewer scope itself stores scoped year ids, which are
the only form that carries a university.

This is normalisation for comparison only. No stored data is rewritten; unifying
the three representations is worth doing, but it is a migration of its own and
not this spec's business.

### Practicals carry no module or year

`PracticalCommon` (`src/data/contentControl.ts:317`) has `references`,
`conceptTags`, `mediaRequests` and `learningObjective` — and no scope fields at
all. `itemScope` reads `item.articleData ?? item.resourceData`, so a practical
falls through to empty today. **A practical cannot be scoped to a reviewer until
it can be tagged.**

`PracticalCommon` therefore gains `moduleIds?: string[]` and
`yearIds?: string[]`, with matching pickers in `PracticalEditorDialog`, as part
of this phase. Existing practicals are untagged and so — by the empty-matches-
nobody rule above — are editable only by Editors and above until somebody tags
them. That is the honest state of the data, surfaced as an *untagged* filter on
Practical Setup rather than hidden.

**A deliberate asymmetry, named here because it will otherwise confuse
somebody.** The existing `itemInScope` treats **empty as unrestricted** — an
untagged article is shown to every student. Write scope does the opposite: **an
untagged item matches no reviewer**, and only Editors and above can touch it.
Same word, opposite default, and both are correct — showing untagged content to
everyone is generous; letting anyone edit it is not. These stay two separately
named functions (`itemInScope`, `itemWritableBy`); neither becomes the other
with a flag.

### The write protocol

`app_state_versions` already records every version with its actor
(`server/src/index.js:584`), which is what makes a real merge possible without
uploading a base document alongside every save.

1. `GET /api/state/:key` returns a `version` id alongside `value` and
   `updatedAt`.
2. `PUT /api/state/:key` sends `{ value, baseVersion }` — the version the client
   started from.
3. The server loads `stored` and reconstructs `base` from `app_state_versions`.
4. `diff(base → incoming)` is this client's actual changes, item by item.
   `diff(base → stored)` is what changed underneath them.
5. **Tab check.** Every changed item must belong to a tab the caller holds
   (§2a).
6. **Scope check.** Every changed item must be in the caller's write scope
   **both before and after the edit** — so a reviewer can neither edit a
   Year-4 question nor retag one into their own year, and neither move one out.
7. **Conflict check.** An item changed on both sides is a `409` naming the item.
   No winner is picked silently.
8. The surviving changes are applied **onto `stored`**, not over it.

Refusals are whole-request and itemised. A half-saved page is worse than a
rejected one.

### Which documents merge

| Document | Behaviour |
|---|---|
| `synapse-admin-content-ledger-v4` | Merge, keyed by `item.id` |
| `synapse-concept-graph-v2` | Merge, `concepts[]` and `relations[]` each keyed by `id` |
| Everything else | Whole-document write, plus the `baseVersion` check |

Non-mergeable documents therefore gain a `409` and a reload prompt where today
they silently overwrite — an improvement for every surface, not only content. A
`baseVersion` that has been pruned from `app_state_versions` is also a `409`:
fail closed.

Requests with no `baseVersion` are refused, so a client that has not been
updated cannot fall back to blind replacement.

### Client side

`src/lib/stateStore.ts` retains the version it loaded, sends it on flush, and on
`409` re-hydrates and reports which item collided — rather than retrying blindly
or discarding the person's edit.

---

## 4. Screens

### Users (`/admin/users`)

- The role control lists only the roles the signed-in actor may assign, computed
  by the same rank function the server uses, so nothing offered is refusable. A
  super admin renders as a locked badge reading *set in server configuration*,
  not a dropdown.
- A **scope** editor appears for Reviewers: modules and/or years chosen from the
  existing university and module-subject catalogues. A Reviewer with none shows
  a plain warning that they currently hold no content.
- Reason-plus-confirmation is unchanged, and every role change keeps writing
  `role_promotion_audit`. **Scope changes are audited the same way** — who
  widened whose access is the same class of fact as who promoted whom.

### Access Control (`/admin/access`, new, super admin only)

A tabs × roles matrix of toggles. The super admin column renders locked-on,
making the anti-lockout property visible rather than merely true. Each row names
what the tab governs — its state keys and API prefixes — so switching one off is
not a guess about what will break. Editor, Admin and Reviewer columns are free.

### Derived everywhere else

The sidebar renders the caller's tabs from the registry. `/admin` redirects to
their first. A route the caller does not hold renders the not-found page rather
than a surface whose API will refuse it.

---

## 5. Migration and rollout

Additive and reversible:

1. Widen the `user_access.role` enum to include `reviewer` and `editor`.
2. Add `user_access.content_scope JSON NULL`.
3. Expose the `app_state_versions` row id as `version` on state reads.

Every existing admin remains `admin`. **Under these defaults, Admin loses the
content tabs**, so before deploy each current admin needs a decision: become an
Editor (the likely answer for anyone doing content work) or stay an Admin. That
list is produced from the live `user_access` table at planning time, not guessed
here.

## 6. Verification

Tested as behaviour, on the parts where being wrong is expensive.

**The rank rule** — every actor × target × new-role triple, including the ones
the rules imply but nobody stated: Editor → Editor refused, Editor → super admin
refused, Admin → Reviewer refused, Reviewer → anyone refused, self-edit refused,
super admin not demotable, last console account not demotable.

**Scope matching** — intersection on modules, on years, on both; the untagged
item refused to every reviewer; the retag-into-my-scope and retag-out-of-my-scope
attacks from step 6 both refused; and `yearNumber` reconciling all three stored
year forms (`"Year 2"`, `"OMS_Y2"`, `2`) onto the same reviewer.

**The merge** — concurrent edits to different items both survive; concurrent
edits to the same item `409`; an out-of-scope change refuses the whole request
and applies none of it; a pruned or absent `baseVersion` `409`s rather than
replacing.

**Tab enforcement, end to end** — for each role, one hidden tab's API is called
directly and must answer `403`. This is the claim the entire design rests on, so
it is verified as behaviour rather than inferred from the registry.

Verification runs against a running app before any of this is called done, not
from reading the code.
