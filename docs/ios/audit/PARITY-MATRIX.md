# Web → iOS student parity matrix

Canonical index for the native iOS port. Status of every student-visible web surface, its iOS counterpart, and a link to the deep port spec where one exists.

_Baseline: iOS 507 tests / 80 suites pass; server 385 pass. Web reference = `src/`, iOS = `ios/`._

**Legend:** ✅ parity · 🟡 partial · 🔴 missing · ⚠️ present but broken (stale key / live bug)

| # | Web surface | iOS status | Gap / note | Spec |
|---|---|---|---|---|
| 1 | Dashboard (Today) | ✅ | `Features/Dashboard/DashboardView` — home tab | — |
| 2 | Library (articles) | ✅ | `Features/Library/LibraryView` + article/concept/evidence readers | — |
| 3 | ResourceReader (PDF + annotation) | ✅ | `Features/Library/ResourceReaderView` + `Core/Reader/AnnotationStore` — ink/notes/undo, round-trips with web | resources-editor |
| 4 | Account | 🟡 | `AccountView` in `SignedInView` — cohort/theme/language/reminders/sync/delete; needs field audit | — |
| 5 | AdaptiveStudy | 🟡 | `Features/Adaptive/AdaptiveStudyView` — present; parity unaudited | wave 2 |
| 6 | Billing | 🟡 | `Features/Billing/BillingView` — present; parity unaudited | wave 2 |
| 7 | Performance | 🟡 | `Features/Dashboard/PerformanceView` — present; parity unaudited | wave 2 |
| 8 | Practical | 🟡 | `Features/More/PracticalView` — present; parity unaudited | wave 2 |
| 9 | Notebook | 🟡 | `Features/More/NotebookView` — present; parity unaudited (text authoring surface) | wave 2 |
| 10 | StudyTogether | 🟡 | `Features/More/StudyTogetherView` — present; parity unaudited | wave 2 |
| 11 | Calendar | 🟡 | Folded into Dashboard / `Core/Schedule` + Upcoming; no standalone surface — confirm | wave 2 |
| 12 | QuestionNotes | 🟡 | Likely embedded in QBank (`questionNotes.v1` key synced) — confirm | wave 2 |
| 13 | **QuestionBank** | 🟡 | Text bank **already fully offline**. Missing: **question images/media (not modeled or rendered at all)**, **non-MCQ formats** (written/matching/labeling — cached, not renderable), pull-to-refresh; offline cold-launch wipes marks/notes (bug G2) | **offline-questions** |
| 14 | **Resources** (catalogue + My uploads) | 🟡 | Catalogue browser present; **"My uploads" file locker 100% absent**; catalogue filters + System/Module grouping missing; **live bug:** `ResourceFileStore.swift:61` hardcodes `.pdf` → video resources mis-routed | **resources-editor** |
| 15 | **Whiteboard** | ⚠️ | **On web's RETIRED key** `synapse.whiteboard.board` (web moved to `...boards.v1`) → **does not sync with live web**. ~7 of 24 tools present; missing ink/pen/eraser, images, multi-board, undo/redo, ready-items, etc. | **whiteboard** |
| 16 | **Flashcards** | 🔴 | Entirely absent on iOS. Sync keys already routed (`StateOwnership.swift:27`). Web reference complete (FSRS/audio/occlusion all shipped). | **flashcards** |
| 17 | EssayQuestions | 🔴 | Absent | wave 2 |
| 18 | Maristanas (Build Maristanas) | 🔴 | Absent | wave 2 |
| 19 | Minigames | 🔴 | Absent (part of Maristanas/party games?) — confirm shape | wave 2 |
| 20 | University | 🔴 | Absent; cohort selection lives in Account | wave 2 |
| 21 | MedicalTaxonomy | 🔴 | Absent — confirm whether student-facing | wave 2 |
| 22 | Tutorial / onboarding | 🔴? | Audience onboarding exists; full tutorial unconfirmed | wave 2 |

Cross-cutting present: Assistant (`Features/Assistant`), Reader/annotation stack, Sync/offline engine, Push.

## Cross-cutting findings (drive sequencing)

1. **Shared prerequisite — a real "My Documents" chunked-upload REST client** (`/my-documents/*`, `user_documents` table, `server/src/index.js:592-716`). Blocks **both** Resources My-uploads **and** Whiteboard images/files. Not the JSON user-state outbox — a separate durable upload queue. Build once → unblocks two features.
2. **Stale sync keys silently break cross-platform.** Whiteboard confirmed on the legacy key. Before building on any iOS user-state key, verify it against live web `src/lib/stateOwnership.ts` + the feature's current key constant.
3. **`MediaFileStore`** (clone of `ResourceFileStore`, target `/api/media/:id`) needed for question images; same download-manager shape reusable across surfaces.
4. **Offline is mostly already solved for text** — the 23MB content ledger syncs whole. "Offline download" work is really *media* prefetch + polish, not bulk-text download.
