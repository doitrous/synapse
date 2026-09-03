# Nishany — Project Handover

A single, bilingual (Arabic-first + English, full RTL) clinical-study web app for
undergraduate medicine: **student app** (library, question bank, practical,
resources, calendar, whiteboard, performance) + **admin console** (author every
piece of content, manage universities/curriculum, concepts & relationships,
students, payments, email). This doc is the pick-up point for a new session.

- **Repo**: github.com/omary98/synapse · branch `main`
- **Local path**: this folder
- **Owner domain**: `synapse.doitrous.com` · mail domain `mail.doitrous.com`

---

## 1. Stack & how to run

- **Frontend**: React 19, React Router 7 (`createBrowserRouter`), TypeScript, Vite 8,
  Tailwind CSS v4. Self-hosted fonts (Fontsource). Icons: lucide-react.
- **Backend** (`server/`): Node 20 + Express + `mysql2` (MariaDB) + Resend (email).
- **Lint/type**: `oxlint`; `tsc -b` (strict, `noUnusedLocals` ON — unused vars fail the build).

```bash
npm install
npm run dev            # Vite dev server (demo mode: localStorage, seeded demo data)
npx tsc -b             # typecheck (must stay green)
npm run build          # tsc -b && vite build → ./dist
# server:
cd server && npm install && npm run dev   # needs a reachable MariaDB (DATABASE_URL)
```

**Verification norms used in this project**: after a change, run `npx tsc -b`, and
(for anything visible) drive the in-app browser preview — never claim done without
a green typecheck.

---

## 2. Two runtime modes (this is the core architecture)

Everything writable goes through small hooks so the storage layer can be swapped:
`usePersistentState`, `useLiveLibrary`, `useLiveResources`, `useTaxonomyTree`,
`useUniversityCatalogue`, the content ledger, `systemColors`, `plans`, `emailLog`,
concept graph.

- **Demo mode** (`VITE_API_BASE` unset): state lives in `localStorage`, seeded with
  rich **demo data**. This is what runs on `npm run dev`.
- **Live mode** (`VITE_API_BASE` set): `src/lib/api.ts` → `API_MODE = true`. State
  hydrates from / persists to the backend (`/api/state/:key`), and **all demo data
  is suppressed** so production starts empty. The switch is `seedOr(demo, empty)`
  in `src/lib/api.ts`, used by every seed.

`src/lib/usePersistentState.ts` also has a **cross-tab `storage` listener** (edits
in one tab push live to others).

---

## 3. Single source of truth: Subjects & Topics taxonomy

`src/data/taxonomyStore.ts` (`useTaxonomyTree`, key `nishany-taxonomy-tree-v3`) is
the **single source** for the 5-level curriculum tree: **System → Topic → Subtopic
→ Microtopic → Nanotopic**, each with a stable visible ID (`SYS_/TPC_/SUB_/MIC_/NAN_`).
Exposes mutation helpers: `renameTaxonomyNode`, `addTaxTopic`, `addTaxSub`.
Editing lives on the **Subjects & Topics** admin page (`TaxonomySetup.tsx`) and is
reused by Concepts, Relationships, Library Setup, and the content catalogues.

`src/data/systemColors.ts` — editable per-system color (common chapters get common
colors), read by the premium `SystemBadge` monogram everywhere (replaced the old
colored dot). `SubjectDot` now delegates to `SystemBadge`.

Universities/years single source: `useUniversityCatalogue` (Academic Setup). Year
IDs derive as `<UNI_SHORT>_Y<n>` (e.g. `OMS_Y2`) via `src/data/taxonomy.ts`.

---

## 4. What's DONE (high level)

**Student app**: dashboard (L-layout: full-width schedule + plan list + perf/exam/
qbank/practical + heatmap|resources), library (live from ledger, personal tags,
university-only notes render), question bank (subject/topic chooser, concept reveal),
practical (OSCE/case/lab, oral questions), resources (Files/Videos, organize by
System/Module, collapsible folders, live), calendar (month/week, **mobile day-sheet**),
performance, whiteboard, notebook, medical-taxonomy AR-EN dictionary, billing.
Full Arabic translation + RTL. Landing pages (`/`, `/ar`, `/en`) with plans/pricing.
**Context back-button**: opening a resource/article from a question/practical/reading
returns to the exact origin.

**Admin console**:
- **Subjects & Topics** — the 5-level editable taxonomy + bulk-import wizard.
- **Academic Setup** — universities → years (unique year_ID) → terms → modules
  (editable unique module_ID, "CVS 01" chip) + curriculum/schedule dialogs + wizard import.
- **Library / Questions / Practical / Resources Setup** — powered by the shared
  `ControlDashboard`. Questions/Resources/Practical wrap it in a **Master → university
  → year** left navigator. Rich per-kind editors (all fields). Topic group headers are
  inline-renamable (retag items + rename taxonomy node) with "+ Add topic".
- **Concepts** — collapsible taxonomy-placement tree, full field set on create/edit,
  live edits, wizard import.
- **Relationships** — directed + bidirectional + one-to-many, custom types, system-
  grouped source picker, collapsible System→Topic list, inline edit, sort by source system.
- **Students**, **Payments & Finance** (per-university/year reports, comparisons,
  editable plans), **Email & Automations**, **Mail Box** (see §6), Reports, Vouchers,
  Notifications, Settings, Privacy, Audit.
- **Bulk import**: a generic 6-step wizard (`ImportWizard.tsx`: Choose file → Confirm
  → Map columns → Preview → Skipped → Options; `.csv/.xlsx/.md`) powers Concepts,
  Academic, and Subjects & Topics; `BulkImportPage.tsx` powers question/article/
  practical/resource. `src/data/bulkImport.ts` holds `IMPORT_SCHEMAS`.

**Quality**: mobile/tablet swept (no horizontal overflow at 375/768; tables scroll,
shell uses a drawer, navigators cap height on mobile). Top-level `ErrorBoundary`.
SEO/OG meta complete in `index.html`.

**Backend** (`server/`): Express API — `/api/state` KV store (mirrors localStorage
keys), `/api/students`, `/api/mail*` (send via Resend + record, list, read,
attachment download), `/api/mailboxes` (create addresses), Resend inbound webhook,
bearer gate on `/api` only, auto-migrate `schema.sql` on boot, and **serves the built
SPA** from `./public` (single-origin). Root `Dockerfile` builds the SPA and bundles
it into the API image.

---

## 5. What's PENDING / next steps

1. **Deploy the current live stack** by following **`DEPLOY-STEPS.md`**: one Coolify
   app (root Dockerfile, port 8080) + the existing MariaDB. The production deploy
   must verify `/api/health`, empty academic setup, persistence, and a downloadable
   database snapshot.
2. **Mail Box — external inbound proof**: Resend sending, SPF, DKIM, and inbound MX
   are verified. Send one message from a genuinely external mailbox to
   `synapse@mail.doitrous.com` and confirm it appears in Inbox; a same-address
   loopback is not a valid final receiving test.
3. **Account provider connection**: login, signup, email verification, password
   recovery, logout, TOTP MFA, per-user MariaDB ownership, explicit audited admin
   promotion, and AAL2 API enforcement are implemented. Add the Supabase project
   URL/publishable key and configure Resend as Supabase custom SMTP to activate them.
   The temporary owner key remains server-only and is entered on `/login`; no admin
   secret is compiled into the browser.
4. **Curriculum ↔ module linking (design agreed, not built)**: a module should carry a
   typed selection (systems/topics/questions/practical types/articles) that flows to the
   student view, and schedule blocks (lecture/training) pick a subset with a "add to
   module?" confirm. Approach is written up in a prior message / could be added to BACKEND-PLAN.
5. **Rotate secrets**: the Resend keys and MariaDB passwords were shared in chat and sit
   in `.env.local` — rotate after first successful deploy.
6. **Completed**: route-level code splitting reduced the main JavaScript chunk to
   about 110 KB gzip; individual screens are loaded only when visited.

---

## 6. Mail Box specifics

`src/pages/admin/MailBox.tsx` (route `/admin/mailbox`, nav "Mail Box"). Live via the
API: **All/Inbox/Outbox** folders, per-address filter, **Compose** with file
**attachments** (base64 → `/api/mail/send`), reader that renders html/text and
**downloads attachments** (`apiDownload` in `src/lib/api.ts` — fetch w/ auth → blob),
and **create new `name@mail.doitrous.com` addresses**. In demo mode it shows a
"connect the backend" panel. Default from-address: `synapse@mail.doitrous.com`.

---

## 7. Key files map

- `src/router.tsx` — all routes (student `/app/*`, admin `/admin/*`, landing).
- `src/components/shell/{AppShell,Sidebar,Topbar,nav.ts,Page,ErrorBoundary}.tsx` — shell.
- `src/lib/` — `api.ts` (live/demo switch), `usePersistentState.ts`, `useLiveLibrary.ts`,
  `useLiveResources.ts`, `useUniversityCatalogue.ts`, `i18n.tsx`, `cn.ts`, `format.ts`.
- `src/data/` — `taxonomyStore.ts`, `taxonomy.ts`, `contentControl.ts` (content ledger +
  `ManagedContentItem`), `conceptGraph.ts`, `universities.ts`, `students.ts`, `plans.ts`,
  `systemColors.ts`, `bulkImport.ts`, `library.ts`, `resources.ts`, `qbank.ts`, `calendar.ts`.
- `src/pages/admin/*`, `src/pages/student/*` — pages. `src/components/admin/*` — editors,
  `ImportWizard.tsx`, `TaxonomyPlacementPicker.tsx`.
- `server/` — `src/index.js` (API + SPA serving), `src/db.js`, `schema.sql`, `Dockerfile`, `README.md`.
- **Docs**: `DEPLOY-STEPS.md` (Coolify one-app flow — start here), `BACKEND-PLAN.md`
  (full backend design), `DEPLOY.md` (generic static-host notes), `.env.example`,
  `.env.local` (gitignored, real secrets).

---

## 8. Conventions & gotchas

- **i18n**: `useT()` from `src/lib/i18n.tsx`; dictionary `src/data/i18n-ar.ts` keyed by
  English source; `t()` falls back to English. Use logical CSS (`ps-/pe-/ms-/me-/start-/end-`, `rtl:`).
- **`tsc -b` has `noUnusedLocals`** — remove unused imports/vars or the build fails.
  (When repointing a "Bulk import" button from a dialog to a route, keep the dialog JSX
  so its state vars stay referenced, or delete them fully.)
- Some setup-page navigators (`QuestionsSetup/ResourcesSetup/PracticalSetup`) are near-
  identical; they read universities from `useUniversityCatalogue` and cap to 45vh on mobile.
- `.env*` is gitignored (`.env.example` kept). Never `VITE_`-prefix a real secret — Vite
  bundles those into public JS. Server secrets: `RESEND_API_KEY`, `DATABASE_URL`.
  The owner enters `API_BEARER` at runtime on `/login`; it stays in session storage
  for that tab and is cleared at logout.
- Commit style: end messages with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
  Commit/push only when asked; the user has been reviewing per-feature commits.

---

## 9. Suggested first actions for the next session
1. Read `DEPLOY-STEPS.md`; verify the latest Coolify deployment and MariaDB snapshot.
2. Complete the genuinely external Resend inbound test.
3. Connect the Supabase project keys and custom SMTP, then perform the real
   signup → verification → TOTP → sign-in sequence.
