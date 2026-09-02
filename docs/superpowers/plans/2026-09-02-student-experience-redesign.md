# Student Experience Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan work-package by work-package. Steps use checkbox (`- [ ]`) syntax for tracking. **Nothing is committed on this branch** — Omar inspects the working tree first — so every "commit" step in the usual template is replaced by "leave the files in the working tree and report".

**Goal:** Redesign the student navigation, hub dashboards, Question Bank hub, Calendar (with tasks), Medical Terminology, Account, Study Rooms, loader and footer pages of Nishany, preserving every existing feature and route.

**Architecture:** A shell-level foundation (tokens, loader, hub primitives, nav + router with redirects) lands first; feature packages then fill in stub pages in parallel, each owning its own files and its own Arabic dictionary file. Direction 2 of the Question Bank is built in a second worktree from a patch of this one.

**Tech Stack:** React 19, react-router 7, Tailwind v4 (`@theme` tokens in `src/index.css`), lucide-react, `usePersistentState` (localStorage in demo mode, MariaDB via `/api/user-state` in live mode), `node --test` for unit tests, `tsc -b` + `vite build`, oxlint.

**Spec:** `docs/superpowers/specs/2026-09-02-student-experience-redesign-design.md` — read it first; every package cites its section.

## Global Constraints

- Work only inside this worktree: `/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/.claude/worktrees/admiring-bouman-27225d`. `node_modules` is a symlink to the main checkout; do not run `npm install`.
- **No git commits, no pushes, no stash.** Leave changes in the working tree.
- Do not edit files owned by another package (each package lists its files). Shared files (`nav.ts`, `router.tsx`, `index.css`, `i18n-ar.ts`) are edited **only** by WP0.
- Every new user-facing string goes through `t()` / `useT()`; Arabic goes in the package's own file `src/data/i18n-ar/<package>.ts` (created empty by WP0).
- Use existing tokens and `src/components/ui/*` primitives; **never hardcode hex** in components (the only literal hex values live in `src/index.css`).
- No emoji, no gradients, no blur, no opacity-based page entrances, no colour-only state. Respect `prefers-reduced-motion` (the global rule in `index.css` covers CSS animations; JS-driven motion must check `matchMedia('(prefers-reduced-motion: reduce)')`).
- Logical properties only (`ps-`, `pe-`, `start-`, `end-`, `ms-`, `me-`); mirror anything directional under `[dir="rtl"]`.
- Gate before reporting: `npx tsc -b --pretty false` clean, `npm run lint` clean for your files, `npm test` green, and the page opened in the dev server (`npm run dev` is already running on port 5173 — do **not** start another; if you need to verify visually and cannot use the browser tools, at least run `npx vite build` to prove the bundle compiles).
- Storage keys: new user-owned keys are dotted `nishany.<feature>.<thing>.v1`; never rename an existing key.

---

## WP0 — Foundation (sequential; everything else waits for it)

**Spec:** §1, §2, §3 (primitives only), §13.

**Files:**
- Modify: `src/index.css` (add ivory tokens to `@theme` and each theme block; add `--dur-hub-enter`, `--dur-loader`; add `nishany-loader-*` keyframes + reduced-motion hold)
- Create: `src/components/ui/NishanyLoader.tsx`
- Modify: `src/components/shell/RouteLoading.tsx`, `src/components/ui/Button.tsx:76`, `src/components/ui/AsyncSurface.tsx`
- Modify (spinner sweep): `src/components/flashcards/ImportDeckDialog.tsx:179,236`, `src/components/flashcards/ExportDeckDialog.tsx:165`, `src/components/admin/ImportWizard.tsx:152,166`, `src/pages/admin/BulkImportPage.tsx:261,274`, `src/pages/admin/MediaRequests.tsx:700,1177`, `src/pages/admin/MailBox.tsx:125`, `src/pages/admin/ControlDashboard.tsx:705`, `src/components/ui/CatalogueUnavailable.tsx:31`, `src/components/dashboard/QuestionOfTheDayCard.tsx:34`, `src/pages/student/QuestionOfTheDay.tsx:301`, `src/pages/student/Resources.tsx:763`, `src/pages/student/University.tsx:288`, `src/components/practical/SlideViewer.tsx:605`
- Create: `src/components/hub/HubPage.tsx`, `src/components/hub/FeatureCard.tsx`, `src/components/hub/FeatureGrid.tsx`, `src/components/hub/ComingSoonDialog.tsx`, `src/components/hub/HubStat.tsx`, `src/components/hub/index.ts`
- Modify: `src/components/shell/nav.ts`, `src/components/shell/Topbar.tsx:22-31`, `src/components/shell/Sidebar.tsx:40-41,146-155`, `src/router.tsx:143-171,222-227`
- Create stub pages (each exports the named component and renders `<HubPage>` with the title only; later packages replace the body): `src/pages/student/Plan.tsx`, `src/pages/student/Learn.tsx`, `src/pages/student/Practice.tsx`, `src/pages/student/Revise.tsx`, `src/pages/student/StudyRooms.tsx`, `src/pages/student/MedicalTerminology.tsx` (re-exporting `MedicalTaxonomy` for now), `src/pages/legal/LegalPage.tsx` (stub), `src/pages/legal/Terms.tsx`, `Privacy.tsx`, `RefundPolicy.tsx`, `Contact.tsx` (stubs)
- Create: `src/data/i18n-ar/index.ts` (exports `AR_REDESIGN` = spread of the per-package files), `src/data/i18n-ar/shell.ts`, `plan.ts`, `learn.ts`, `practice.ts`, `revise.ts`, `rooms.ts`, `dashboard.ts`, `legal.ts`, `qbank.ts`, `account.ts` (each `export const AR_<NAME>: Record<string,string> = {}` except `shell.ts`, which WP0 fills)
- Modify: `src/data/i18n-ar.ts` (spread `...AR_REDESIGN` at the end of `AR`)
- Modify: `src/components/shell/StudyActivityTracker.tsx:10` (add `terminology`, `plan`, `learn`, `practice`, `revise`, `study-rooms` to `STUDY_SURFACES` where the existing set includes their predecessors)
- Test: `src/components/shell/nav.test.ts` (new), `src/components/ui/NishanyLoader.test.ts` (new, geometry helper)

**Interfaces produced:**

```ts
// src/components/hub/index.ts
export { HubPage } from './HubPage'         // ({ eyebrow, title, lede, aside?, children })
export { FeatureGrid } from './FeatureGrid' // ({ children, className? }) — stagger + grid
export { FeatureCard } from './FeatureCard'
export type { FeatureCardProps, FeatureProgress, FeatureStat } from './FeatureCard'
export { ComingSoonDialog } from './ComingSoonDialog' // ({ title, body, icon, previewHref?, onClose })
export { HubStat } from './HubStat'          // ({ label, value, sub? })

// FeatureCard
export interface FeatureProgress { kind: 'ring' | 'bar'; value: number; max: number; label: string; tone?: 'primary' | 'accent' }
export interface FeatureStat { label: string; value: string }
export interface FeatureCardProps {
  to: string; icon: LucideIcon; title: string; description: string
  progress?: FeatureProgress; stats?: FeatureStat[]      // max two
  status?: 'live' | 'coming-soon'
  comingSoon?: { body: string; previewHref?: string }   // required when status === 'coming-soon'
  onClick?: () => void                                   // optional override (Practical uses it to select a tab)
}

// src/components/ui/NishanyLoader.tsx
export function NishanyLoader({ size = 40, label = 'Loading', mini = false, className }: {...}): JSX.Element
export function loaderRings(size: number): { r: number; width: number }[]  // pure, tested

// src/components/shell/nav.ts
export const studentNav: NavGroup[]   // nine items, one group, per spec §2
export const ROUTE_TITLES: Record<string, string>  // '/app/qbank': 'Question Bank', … every non-nav student route
export function titleForPath(pathname: string, portal: Portal, tabs?: readonly string[]): string
```

- [ ] **Step 1: Tokens.** Add the four ivory tokens per spec §1 to `@theme` (light values) and to the `warm`, `dark`, `oled` blocks; add `--dur-hub-enter: 420ms; --dur-loader: 1600ms;` to `:root`. Add keyframes:

```css
@keyframes nishany-loader-sweep {
  0%   { stroke-dashoffset: var(--c); transform: rotate(0deg); }
  50%  { stroke-dashoffset: 0;        transform: rotate(180deg); }
  100% { stroke-dashoffset: calc(var(--c) * -1); transform: rotate(360deg); }
}
.nishany-loader-arc {
  transform-origin: 50% 50%;
  animation: nishany-loader-sweep var(--dur-loader) cubic-bezier(0.55, 0, 0.85, 0.35) infinite;
  animation-delay: var(--phase, 0ms);
}
@media (prefers-reduced-motion: reduce) { .nishany-loader-arc { animation: none; } }
```

(`--c` is set inline per arc to its circumference; offset going `c → 0 → -c` is fill then empty; the first and last frames coincide visually because the arc is fully empty at both ends and rotation is a full turn.)

- [ ] **Step 2: Loader test first.** `src/components/ui/NishanyLoader.test.ts`:

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loaderRings } from './NishanyLoader.geometry.ts'
test('four rings, outer to inner, widths shrink with radius', () => {
  const rings = loaderRings(40)
  assert.equal(rings.length, 4)
  assert.ok(rings[0].r > rings[1].r && rings[1].r > rings[2].r && rings[2].r > rings[3].r)
  assert.ok(rings.every((ring) => ring.width >= 2 && ring.r - ring.width / 2 > 0))
})
```

Put the pure function in `src/components/ui/NishanyLoader.geometry.ts` so the test does not import React. Run `npm test` — expect the new test to fail (module missing), then implement, then pass.

- [ ] **Step 3: Loader component** per spec §13: four `<circle>` tracks + four `.nishany-loader-arc` circles with `strokeDasharray={c} style={{ '--c': c, '--phase': `${i*120}ms` }}`, colours accent / accent-soft / primary / primary-soft, `strokeLinecap="round"`, inner `--color-grid-major` circle, `role="status" aria-live="polite"` and `<span className="sr-only">{label}</span>`. `mini` renders only the outer ring in `currentColor` at 16px for buttons. Reduced motion: also set static offsets of 75/50/25/0% of `c` so it reads as the dashboard rings.

- [ ] **Step 4: Replace spinners** at every path listed under Files (import `NishanyLoader`, remove `Loader2` imports that become unused; `Button` uses `<NishanyLoader mini />`). `RouteLoading` renders `<div className="grid min-h-[40vh] place-items-center"><NishanyLoader size={48} /></div>` after its 150 ms delay. Keep `AsyncSurface`'s API; its default fallback becomes the loader.

- [ ] **Step 5: Hub primitives** per spec §3, in `src/components/hub/`. `FeatureCard` renders a `Link` when `status !== 'coming-soon'` and no `onClick`; a `button` otherwise. Coming-soon opens `ComingSoonDialog` from local state. Use `TargetRing` (size 44, thickness 5) for `ring` and `Meter target size="sm"` for `bar`. Hover lift with `transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:shadow-raised motion-reduce:transform-none`.

- [ ] **Step 6: Nav + titles test first.** `src/components/shell/nav.test.ts`:

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { studentNav, titleForPath } from './nav.ts'
test('student nav is the nine ordered destinations', () => {
  assert.deepEqual(studentNav.flatMap((g) => g.items.map((i) => i.label)),
    ['Dashboard','Tutorial','Plan','Learn','Practice','Revise','Minigames','Study Rooms','Account'])
})
test('every student route has a breadcrumb title', () => {
  for (const path of ['/app/qbank','/app/qotd','/app/calendar','/app/university','/app/terminology','/app/taxonomy','/app/notebook','/app/practical','/app/essays','/app/performance','/app/maristanas','/app/flashcards','/app/whiteboard','/app/resources','/app/library','/app/adaptive','/app/term-grid'])
    assert.notEqual(titleForPath(path, 'student'), path)
})
```

(`nav.ts` imports lucide icons and `adminTabs`; if `node --test` cannot load them, move `ROUTE_TITLES` + `titleForPath` into `src/components/shell/routeTitles.ts` with no React imports and test that instead.)

- [ ] **Step 7: nav.ts + Topbar + Sidebar.** Rewrite `studentNav` per §2; add `ROUTE_TITLES`; `Topbar.currentTitle` uses `titleForPath`. Move the QoTD dot in `Sidebar.tsx` from `/app/qotd` to the Dashboard item (`item.to === '/app' && qotdUnanswered`). Remove group-caption rendering only when a group has no label (already the case).

- [ ] **Step 8: Router.** In `src/router.tsx`: register `plan`, `learn`, `practice`, `revise`, `study-rooms`, `terminology` (→ `MedicalTerminology`), keep `taxonomy` (→ `MedicalTerminology`), and add redirect elements: `study-together` → `<Navigate to={{ pathname: '/app/study-rooms', search }} replace />` (use a tiny `RedirectWithSearch` component reading `useLocation`), `billing` → `/app/account?tab=billing`, `question-notes` → `/app/notebook?tab=questions`. Add marketing routes `/terms`, `/privacy`, `/refund-policy`, `/contact` next to `/pricing`. Stub pages so the build stays green.

- [ ] **Step 9: i18n files** as listed; `shell.ts` gets: `'Tutorial': 'الشرح'`, `'Plan': 'الخطة'`, `'Learn': 'تعلّم'`, `'Practice': 'تدرّب'`, `'Revise': 'مراجعة'`, `'Minigames': 'ألعاب صغيرة'`, `'Study Rooms': 'غرف المذاكرة'`, `'Account': 'الحساب'`, `'Coming soon': 'قريبًا'`, `'Open the preview': 'افتح المعاينة'`, `'Got it': 'فهمت'`, `'Loading': 'جارٍ التحميل'`, and the four hub ledes/eyebrow words. Keep the existing `'Medical Taxonomy'` key and add `'Medical Terminology': 'المصطلحات الطبية'`.

- [ ] **Step 10: Gate.** `npx tsc -b --pretty false`, `npm run lint`, `npm test`, then in the browser: sidebar shows nine items, `/app/study-together` lands on the Study Rooms stub, `/app/billing` lands on Account, a route chunk shows the loader (throttle or open a cold route). Report file list + any deviations.

---

## WP1 — Plan hub + Calendar tasks

**Spec:** §3 (Plan), §7. **Depends on:** WP0.

**Files:**
- Modify: `src/pages/student/Plan.tsx` (replace stub body)
- Create: `src/data/tasks.ts`, `src/data/tasks.test.ts`, `src/lib/useTasks.ts`, `src/components/calendar/TaskList.tsx`, `src/components/calendar/TaskRow.tsx`, `src/components/calendar/TaskComposer.tsx`, `src/components/calendar/TaskGroupSection.tsx`
- Modify: `src/pages/student/Calendar.tsx:426-525` (toolbar gains the mobile `Segmented`; aside replaced by `<TaskList selectedDay=… onFocusDay=… />`; task events merged into the grid/day sheet), `src/data/calendar.ts` (add `kind: 'task'` to the union if it is a closed union), `src/data/i18n-ar/plan.ts`
- Do not touch: `src/data/studyBlocks.ts`, `src/lib/useUpcoming.ts`.

**Interfaces:** consumes `HubPage/FeatureGrid/FeatureCard/HubStat` from WP0, `useUpcoming` (today's blocks), `useAttemptHistory` + `attemptStats.firstAttemptSplit`, `ExamCountdown`'s exam-programme hook for "next exam in N days" (find it in `src/components/dashboard/ExamCountdown.tsx` — reuse the hook it calls, do not duplicate the maths). Produces `useTasks()` per spec §7 (used by the Plan card's "open tasks" stat).

- [ ] **Step 1: Model tests first** in `src/data/tasks.test.ts` — `scheduleLabel` for today/tomorrow/overdue/other/undated; `tasksForDay`; `taskProgress`; a reducer-style helper set (`addTask`, `toggleTask`, `removeGroup` moving tasks to the default group) that `useTasks` wraps, so the logic is testable without React. Run, see failures, implement `src/data/tasks.ts`, pass.
- [ ] **Step 2: `useTasks`** over `usePersistentState<TaskDoc>(TASKS_STORAGE_KEY, EMPTY_TASKS)`; lazily create the default group "My tasks" on first write.
- [ ] **Step 3: `TaskList` UI** per §7 (quick-add input, `Popover` full form with `DateField`/`TimeField`/`Select`, `Collapse` groups, `Checkbox` rows, subtasks, `ContextMenu` edit/delete, "Show completed" `Toggle`). Keep it under ~350 lines by splitting rows/composer/group files as listed.
- [ ] **Step 4: Calendar integration** — tasks with a date become `CalEvent`s (`layer: 'personal'`, `kind: 'task'`, `time` from `task.time`); month cells show up to three crimson dots for tasks; `DaySheet` lists them with checkboxes (toggle through `useTasks`); clicking a task focuses it in the list (`scrollIntoView` + a 1.2 s `bg-primary-tint` highlight). Add the `Segmented` Calendar · Tasks switch visible below `xl`.
- [ ] **Step 5: Plan hub page** per §3.
- [ ] **Step 6: Gate** (tsc, lint, tests, browser at 1440 and 390 widths: add a group, add a task for tomorrow with a subtask, tick it, see the dot on the grid). Report.

---

## WP2 — Learn hub + Medical Terminology

**Spec:** §3 (Learn), §8. **Depends on:** WP0.

**Files:**
- Modify: `src/pages/student/Learn.tsx`, `src/pages/student/MedicalTerminology.tsx` (real page), `src/pages/student/MedicalTaxonomy.tsx` (becomes `export { MedicalTerminology as MedicalTaxonomy } from './MedicalTerminology'`)
- Create: `src/data/terminologyProgress.ts`, `src/data/terminologyProgress.test.ts`, `src/lib/useTerminologyProgress.ts`, `src/components/terminology/TermCard.tsx`, `src/components/terminology/CategoryRail.tsx`, `src/components/terminology/WaysToLearn.tsx`
- Modify (rename sweep, user-facing only): `src/data/tutorials.ts:119,122`, `src/lib/assistantSurface.ts:15`, `src/data/decks.ts:129-136` (id stability rule in §8), `src/data/i18n-ar/learn.ts`
- Do not touch: anything under `src/components/admin`, `src/data/medicalLibraryTaxonomy*`, `taxonomyStore.ts`, storage keys.

**Interfaces:** consumes `useMedicalGlossary()` (`src/data/glossaryStore.ts`), `deckFromTerms`, `buildGrid`/`MIN_TERMS` (`src/data/crossword.ts`), `useRecentResources`, WP0 hub primitives. Produces `useTerminologyProgress()` per §8 (the Learn card and the hero ring use it).

- [ ] **Step 1: Progress model tests first** (`known` add/remove idempotent; `knownIn` counts only ids present in the given list). Implement, pass.
- [ ] **Step 2: Rename sweep** per §8, with a test in `src/data/decks.test.ts` (extend if present) asserting `deckFromTerms('Medical Terminology', terms).id === 'deck-taxonomy-medical-taxonomy'` (old id preserved for the default filter) and that a category filter still slugs from its name.
- [ ] **Step 3: Terminology page** per §8 — hero band, ways-to-learn cards, category rail with per-category progress, flip `TermCard`s (`[transform-style:preserve-3d]`, `rotate-y-180` via inline `transform`, `motion-reduce` = instant), Got it / Still learning toggle, "Study the N you're still learning" → `deckFromTerms` of unknown terms → `/app/flashcards`.
- [ ] **Step 4: Learn hub** per §3.
- [ ] **Step 5: Gate** + browser: `/app/taxonomy` and `/app/terminology` both render the new page titled "Medical Terminology"; flip a card, mark known, ring moves; RTL check with the language switch. Report.

---

## WP3 — Practice hub + Practical overview + Question Bank hub (Direction 1)

**Spec:** §3 (Practice), §5, §9. **Depends on:** WP0.

**Files:**
- Modify: `src/pages/student/Practice.tsx`, `src/pages/student/Practical.tsx:725-766` (overview grid + `?tab=` sync), `src/pages/student/QuestionBank.tsx` (hub portion only: lines ~1540-1730 and the `hubTab` render; the session runner below is untouched)
- Create: `src/components/qbank/hub/QbankHub.tsx`, `TestBuilder.tsx`, `BuilderSummary.tsx`, `CollectionsTab.tsx`, `PreviousTestsTab.tsx`, `src/data/i18n-ar/practice.ts`, `src/data/i18n-ar/qbank.ts`
- Do not touch: `src/components/qbank/QuestionView.tsx`, `StudyRail.tsx`, `QuestionNavigator.tsx`, `EndSessionDialog.tsx`, `src/data/qbankSession.ts`, `qbankScope.ts`, `questionSource.ts`.

**Interfaces:** consumes WP0 primitives, `usePracticalProgress`, `useLivePracticals`, `useLiveHistology`, `useLiveEssays`/`useEssayAnswers`, `usePublishedQuestions`/`useAttemptHistory`/`attemptStats`, `useQotd` (for the button dot). The hub components receive the builder's state and handlers as **props** from `QuestionBank.tsx` (keep state where it is; lift nothing into context). Define `TestBuilderProps` in `TestBuilder.tsx` with exactly the state and setters the current JSX uses (`source/setSource`, `sourceSel` (read-only now), `scope/setScope`, `count/setCount`, mode/timer state, `matching: number`, `pool: number`, `onStart`, `presets: { id, label, apply }[]`).

- [ ] **Step 1: Practical overview** per §9 — `FeatureGrid` of six `FeatureCard`s with `onClick` selecting the tab and pushing `?tab=`; read `?tab=` on mount. Existing tabs remain.
- [ ] **Step 2: Extract the Qbank hub** — move the JSX for the three hub tabs into the new files unchanged first (pure move, gate with tsc), then restyle per §5: header with the **Question of the Day** button and the relabelled `Tabs`; the composer's four numbered `Panel` steps; **Question source disabled with "Coming soon"**; the sticky ivory summary card with the `TargetRing` of matching/pool and **Start test**; mobile bottom bar (`fixed inset-x-0 bottom-0 lg:hidden` inside the page, `pb-[env(safe-area-inset-bottom)]`).
- [ ] **Step 3: Practice hub** per §3.
- [ ] **Step 4: Gate** + browser: build a test end to end (scope → start → answer one → end) to prove the runner is intact; confirm the source cards are inert; 390 px bottom bar. Report, including the exact `TestBuilderProps` you defined (WP7 reuses it).

---

## WP4 — Revise hub + Notebook question notes + Account with Billing + Minigames card

**Spec:** §3 (Revise), §10, §11, §17. **Depends on:** WP0.

**Files:**
- Modify: `src/pages/student/Revise.tsx`, `src/pages/student/Notebook.tsx:28,45-…` (third tab, header button, `?tab=`), `src/pages/student/QuestionNotes.tsx` (becomes a thin page that renders `QuestionNotesPanel` — kept so the redirect target and any direct import survive), `src/pages/student/Account.tsx` (tabs), `src/pages/student/Billing.tsx` (keeps `Billing` export rendering `<Account initialTab="billing" />` for safety), `src/components/games/MinigamesHubPage.tsx:10-52` (add the Build Maristanas card → `/app/maristanas`), `src/data/i18n-ar/revise.ts`, `src/data/i18n-ar/account.ts`
- Create: `src/components/notebook/QuestionNotesPanel.tsx`, `src/components/account/BillingPanels.tsx`, `src/components/account/AccountTabs.tsx`

**Interfaces:** consumes WP0 primitives, `useFlashcards` (decks/cards/due), notebook notes store, `QBANK_NOTES_STORAGE_KEY`, whiteboard collection key. Produces `QuestionNotesPanel()` (no props) and `BillingPanels()` (no props).

- [ ] **Step 1: QuestionNotesPanel** — move the join + UI from `QuestionNotes.tsx` (lines 32-253) into the panel unchanged; Notebook gets the tab and the "Question notes · N" header button; `?tab=questions` selects it.
- [ ] **Step 2: Account tabs** per §11 — `Tabs` with `?tab=`; `BillingPanels` is the moved body of `Billing.tsx` (its hooks come with it).
- [ ] **Step 3: Revise hub** per §3 and the Minigames card.
- [ ] **Step 4: Gate** + browser: `/app/question-notes` → Notebook on the questions tab; `/app/billing` → Account billing tab; Revise cards' stats populate. Report.

---

## WP5 — Study Rooms

**Spec:** §12. **Depends on:** WP0. Largest package; budget accordingly.

**Files:**
- Modify: `src/pages/student/StudyRooms.tsx`, `src/pages/student/StudyTogether.tsx` (keep the file; export `StudyTogether` as `() => <Navigate … />` is WP0's router job — leave it), `src/data/i18n-ar/rooms.ts`
- Create: `src/components/rooms/RoomLobby.tsx`, `RoomCard.tsx`, `RoomView.tsx`, `StudyHall.tsx`, `Seat.tsx`, `seatArt.tsx` (the SVG variants: 3 desks, 5 devices, 2 chairs, 1 character with `typing` limb), `SeatCustomiser.tsx`, `RoomControls.tsx`, `src/lib/rooms/useRoomAudio.ts`, `src/lib/rooms/useSeatPreference.ts`, `src/lib/rooms/roomPresence.ts` (+ `.test.ts`: `isStudying(lastActiveAt, now)` 90 s rule; `seatLayout(count, columns)` positions), `src/lib/rooms/demoRoom.ts`
- Reuse, do not modify: `src/lib/useParties.ts`, `src/lib/useStudyRooms.ts`, `src/components/social/*` (mount `PartySessionRunner`/`PartyGameSyncPlayer`/`FriendsPanel`/shared-tests UI from the lobby as they are).

**Interfaces:** produces `useRoomAudio(roomId, selfId): RoomAudio` per §12 (exact shape in the spec), `useSeatPreference(): [SeatPreference, set]` with `SeatPreference = { desk: 'plain'|'drawer'|'corner'; device: 'laptop'|'desktop'|'tablet'|'iphone'|'android'; chair: 'stool'|'office' }`, `StudyHall({ seats: SeatOccupant[], columns?: 4|5, selfId, onSeatClick? })` with `SeatOccupant = { id, name, seat: SeatPreference, studying: boolean, speaking: boolean }`.

- [ ] **Step 1: Presence + layout tests first** (`roomPresence.test.ts`), implement.
- [ ] **Step 2: seatArt + Seat + StudyHall** — one `viewBox` per hall (`0 0 1000 <rows*220>`), seats placed by `seatLayout`; the character is ~12 strokes: head circle, torso path, two arms, the forearm group gets `className="seat-arm"` and a keyframe `nishany-typing` (translateY 0→2px→0, 900 ms, infinite) applied when `studying`; speaking ring = a circle with `nishany-speak` scale pulse in `--color-accent`; strokes `--color-ink` at 1.6, fills `--color-surface`, self cushion `--color-primary`. Add both keyframes in a local `<style>` block? No — add them to `src/index.css`? That file is WP0-owned; instead put them in a new `src/components/rooms/rooms.css` imported by `StudyHall.tsx` (Vite handles CSS imports; include the reduced-motion `animation: none` rule there).
- [ ] **Step 3: Lobby + RoomView + controls** per §12 on top of `useMyParties/useOpenParties/useParty/usePartyActions`; demo mode uses `demoRoom.ts` (six seeded occupants, two studying, one speaking) so the preview shows the hall.
- [ ] **Step 4: `useRoomAudio`** — local mic only; `join()` calls `getUserMedia({ audio: true })`, wires an `AnalyserNode`, sets `speaking` for self when RMS > threshold for > 120 ms; `state` is `'unsupported'` for remote audio with `reason`; `leave()` stops tracks. Never claim other members' audio is heard.
- [ ] **Step 5: SeatCustomiser** dialog with the three pickers; preference persisted; own seat in the hall re-renders live.
- [ ] **Step 6: Gate** + browser at 1440 / 768 / 390: lobby, enter the demo room, customise the seat, join voice (grant mic in the browser pane if it prompts; if not possible, verify the `unsupported`/`error` path renders calmly). Report, including the "what the backend still needs" list from §12.

---

## WP6 — Dashboard rhythm layout + footer pages

**Spec:** §4, §14. **Depends on:** WP0.

**Files:**
- Modify: `src/pages/student/Dashboard.tsx`, `src/components/dashboard/QuestionOfTheDayCard.tsx` (accept `className` and fill height), `src/pages/landing/MarketingShell.tsx:163-175` (footer second row), `public/sitemap.xml`, `src/data/i18n-ar/dashboard.ts`, `src/data/i18n-ar/legal.ts`
- Create/replace stubs: `src/pages/legal/LegalPage.tsx`, `src/pages/legal/content.ts`, `src/pages/legal/Terms.tsx`, `Privacy.tsx`, `RefundPolicy.tsx`, `Contact.tsx`, `src/pages/legal/ContactForm.tsx`

- [ ] **Step 1: Dashboard** — `StudyRhythmSection` grid per §4; remove the standalone QoTD slot; widen the column.
- [ ] **Step 2: Legal content + page** per §14 — structured sections `{ id, heading, paragraphs: string[], needsReview?: boolean }`; every uncertain fact bracketed and badged; refund page opens with the existing pricing line; contact page with the mailto form. `usePageMeta` on each.
- [ ] **Step 3: Footer** — second row of the four links in both language chromes (AR labels: الشروط والأحكام · سياسة الخصوصية · سياسة الاسترداد · تواصل معنا, pages themselves in EN with a top notice "Arabic version pending review" on the AR shell).
- [ ] **Step 4: Gate** + browser: dashboard at 1440 (QoTD beside the heatmap) and 390 (stacked); `/terms`, `/privacy`, `/refund-policy`, `/contact` render with the review badges; footer links work from `/` and `/ar`. Report.

---

## WP7 — Question Bank Direction 2 (second worktree, port 5174)

**Spec:** §6. **Depends on:** WP3 (and WP0). Run by the orchestrator: create the worktree, transfer the patch, then dispatch.

- [ ] **Step 1 (orchestrator):** in this worktree `git add -A && git diff --cached --binary > <scratch>/direction1.patch && git reset -q`; `git worktree add "<repo>/.claude/worktrees/qbank-unified" -b claude/qbank-unified-builder main`; in it `git apply --index <patch>` then `git reset -q` (index cleared, files present), symlink `node_modules`, add `.claude/launch.json` entry `nishany-unified` with `runtimeArgs: ["run","dev","--","--port","5174"]`, port 5174.
- [ ] **Step 2 (subagent):** in that worktree, build `src/components/qbank/unified/UnifiedBuilder.tsx` (bank `Tabs` MCQ · Practical · Essay · Mixed), `PracticalBank.tsx`, `EssayBank.tsx`, `MixedBank.tsx` (proportion editor: three number inputs + `Meter` stack that must sum to `count`; a "balance" button splits evenly), `src/data/mixedSession.ts` (+ test: queue building respects proportions and shuffles deterministically with a seed; cursor advance; summary maths), `src/lib/useMixedSession.ts` (`nishany.qbank.mixedSession.v1`), `src/components/qbank/unified/MixedRunner.tsx` (dispatches each `MixedItem` to `QuestionView`-based MCQ step, `PracticalRunner`, or `EssayRunner`, then `MixedSummary`). Wire it into `QuestionBank.tsx` in place of `TestBuilder` when `hubTab === 'new'`; MCQ tab reuses `TestBuilder` unchanged.
- [ ] **Step 3: Gate** in that worktree + browser on 5174: start one test from each bank and one mixed test of 6 items; report limitations.

---

## WP8 — Design canvas (parallel with everything; no code files)

**Spec:** §15. Authored in the scratchpad `design/` directory as `.dc.html` artboards + `canvas.json`; the orchestrator seeds and publishes. Token values come from `src/index.css` warm theme (paper `#f7f2ea`, surface `#fffdf9`, surface-2 `#f1ebe1`, inset `#e9e1d4`, ink `#1f1b16`, ink-2 `#675e51`, ink-3 `#9b9284`, line `#e9e0d2`, line-2 `#d7ccb9`, primary `#d13a63`, primary-strong `#a82449`, primary-tint `#fdefef`, accent `#1553b3`, accent-soft `#5a8ee0`, accent-tint `#eef1f8`, success `#1a6e56`, scale ramp `#ece4d6 #f8dcdd #f5b4c2 #e37fa0 #d13a63 #a82449`; fonts Source Serif 4 / Geist (fallback Georgia / system-ui via Google Fonts link), radii 6/8/10/12/16, shadow-panel `0 1px 2px rgba(31,27,22,.05), 0 1px 1px rgba(31,27,22,.03)`).

- [ ] Artboards (1440×900 desktop unless noted): `Main.dc.html` (Sidebar + Dashboard), `Plan`, `Learn`, `Practice`, `Revise`, `CalendarTasks`, `Terminology`, `QuestionBank`, `UnifiedBuilder`, `StudyRoom`, `Account`, `Loader` (480×320, with the four-ring loader animated in CSS), `Terms`, `StudyRoomPhone` (390×844), `CalendarTasksPhone` (390×844). `canvas.json` lays them in three rows with ≥ 80/120 px gaps; `launch: { view: 'canvas' }`.

---

## WP9 — Integration gate (orchestrator)

- [ ] `npx tsc -b --pretty false`; `npm run lint`; `npm test`; `npx vite build`.
- [ ] Browser pass at 1440, 768, 390 on: `/app`, `/app/plan`, `/app/learn`, `/app/practice`, `/app/revise`, `/app/calendar`, `/app/terminology`, `/app/qbank`, `/app/practical`, `/app/notebook?tab=questions`, `/app/account?tab=billing`, `/app/study-rooms`, `/terms`, `/contact`; dark theme spot-check on two hubs; RTL spot-check on one hub and Calendar.
- [ ] Screenshots saved to the scratchpad and sent with the handover; worktree path, preview instructions, decisions and limitations listed.
