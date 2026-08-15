# Synapse

A medical learning platform for undergraduate medical students — a single calm
clinical workspace where you read the library, drill the question bank, practise
clinically, and see exactly what to study next. Two portals under one design
system: a **Student app** and an **Admin console**.

> Front-end prototype. Realistic but **illustrative** content for undergraduate
> medicine — not clinical guidance. No real auth, database, or payments.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `/` is the entry with the two pathways;
`/app` is the student portal, `/admin` is the admin console. Press **⌘K** (or
Ctrl-K) anywhere in-app for the command palette.

Other scripts: `npm run build` (type-check + production build), `npm run preview`.

## What's built

**Phase 1:** design system, app shell (collapsible sidebar, ⌘K search, mobile
drawer), the landing page, and the flagship **Student Dashboard**.

**Phase 2:** all remaining **student** surfaces, fully built —

- **Library** — two-pane topic navigator + consolidated reading view, with linked questions & resources
- **Question Bank** — session builder + question runner with per-option rationales, explanations, and references back to the Library (`?s=` deep links)
- **Practical** — OSCE stations, clinical cases, skills sign-off, and lab & imaging (tabbed)
- **Calendar** — month grid + week agenda; curriculum and personal layers, visually distinct and toggleable
- **Performance** — accuracy by subject & question type, an anonymous year leaderboard, and time-management (dataviz-guided charts)
- **Resources** — filterable ruled catalog with working bookmarks
- **Whiteboard** — infinite pan/zoom canvas with draggable notes and connections
- **Notebook** — searchable notes with an inline editor, linked to the Library
- **Study Together** — build a shared test and generate an invite link
- **Billing** — plan, payment method, and invoices

**Phase 3:** all 11 **admin** surfaces, fully built —

- **Control Dashboard** — enrolment, content health, at-risk students, activity feed
- **Academic Setup** — years/cohorts, courses & blocks, term dates
- **Library / Questions / Practical Setup** — CMS tables with status, review queues, and item management
- **Resources & Media** — asset library with storage usage
- **Email & Automations** — campaigns + automation toggles
- **Payments & Finance** — MRR/ARR/churn stats, revenue trend, plans, transactions
- **Privacy & Support** — ticket queue, data requests, consent settings
- **Settings** — institution profile, roles, integrations, feature flags
- **Audit & Security** — security posture + immutable audit trail

**All 22 surfaces across both portals are now built.** Any unmapped route still
falls back to the intentional placeholder.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · react-router · lucide-react ·
self-hosted variable fonts (Source Serif 4, Geist, Geist Mono).

## Project structure

```
src/
  index.css              Design tokens (@theme) — "The Clinical Chart" system
  router.tsx             All routes for both portals
  components/
    ui/                  Primitives (Button, Panel, Badge, Meter, …)
    shell/               AppShell, Sidebar, Topbar, CommandSearch, nav
    dashboard/           The six dashboard modules
    brand/               Wordmark + mark
  data/                  Typed mock data (student.ts, types.ts)
  pages/                 Landing, student/Dashboard, Placeholder, NotFound
```

## Authoring content

Subjects, concepts, relationships, articles, questions, practicals and glossary terms are
written as importer-format batches and applied by hand through the admin import pages. The
rules for every content type live in
**[Instruction Manual for Content Creation/](Instruction%20Manual%20for%20Content%20Creation/00-START-HERE.md)**
— start with `00-START-HERE.md`, then read the one manual for what you are writing.

Finished batches wait in [`docs/import-ready/`](docs/import-ready/INDEX.md), one folder per
import page. Nothing there has been imported.

## Design

See **[DESIGN.md](DESIGN.md)** for the visual system and **[PRODUCT.md](PRODUCT.md)**
for product context.
