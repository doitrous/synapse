# Student experience redesign — design spec

Date: 2026-09-02 · Branch: `claude/student-dashboard-redesign` (worktree, preview only, nothing committed until Omar approves)

## 0. Purpose and posture

A comprehensive redesign of the student menus and main dashboards of Nishany. The
brief: premium, elegant, simple, minimalist; warm ivory `#F7F2EA` as the background
accent; subtle animation and polished transitions; preserve every existing feature,
integration, route and responsive behaviour unless a change is asked for.

Visual reference: the Nishany product showcase PDF (September 2026). Its language —
ivory ground, white cards with hairline borders, serif headlines with one crimson
italic word, small mono uppercase section labels, crimson-on-ivory rings and meters —
is the "most recent design direction" and is already expressible with the tokens in
`src/index.css` (the `warm` theme's neutral ramp *is* that ivory). This spec adds the
ivory as an **accent** in every theme rather than switching the app to the warm theme.

Everything below extends the existing Clinical Chart / Nishany system (`DESIGN.md`,
`docs/rebrand/BRAND.md`). Hard rules that still apply: no gradients, no glass/blur, no
emoji, no colour-only state, tabular figures for data, serif page titles over sans panel
titles, logical properties for RTL, transform-only entrances, `prefers-reduced-motion`
respected, crimson for what you act on, blue for what points elsewhere, the bullseye dot
is earned only at 100%.

## 1. Tokens added

In `src/index.css` `@theme`:

| Token | light | warm | dark | oled | Role |
|---|---|---|---|---|---|
| `--color-ivory` → **`--color-mist`** | `#eff3fa` | `#eef1f8` | `#131a26` | `#0c1017` | Field-blue mist accent ground: hub header bands, icon tiles, room floor, hero strips |
| `--color-ivory-2` → `--color-mist-2` | `#e6ecf7` | `#e3e8f2` | `#182130` | `#121823` | Mist inset (a tile on a mist band) |
| `--color-ivory-line` → `--color-mist-line` | `#d8e1f1` | `#cfd9ea` | `#243044` | `#1e2734` | Hairline on mist |
| `--color-on-ivory` → `--color-on-mist` | `#161920` | `#1f1b16` | `#e8ecf3` | `#dfe2e8` | Ink on mist |

**Revision 2026-09-02 (Omar):** the warm ivory `#F7F2EA` accent was rejected ("use a lighter or more premium colour that goes with our brand"). The accent is now a *field-blue mist* — the brand's own blue at about 6% over white — so the bands read as the same material as the paper (`#f5f7fb`), one step raised, not a second colour. The utilities were first shipped under the `ivory` name and are renamed to `mist` at integration; no component may reference either name's hex directly.

Utilities follow automatically (`bg-mist`, `border-mist-line`, `text-on-mist`).
Mist is a **band or tile, never a whole page**. Never put the crimson tint on mist
(two tints stacked read as a stain); on mist the selected state is a hairline +
crimson spine, as `nav-selected` already does.

New durations: `--dur-hub-enter 420ms`, `--dur-loader 1600ms`.

## 2. Navigation

`src/components/shell/nav.ts` `studentNav` becomes one unlabelled group of nine
destinations, in this order:

| # | Label | Route | Icon (lucide) | Notes |
|---|---|---|---|---|
| 1 | Dashboard | `/app` | `LayoutDashboard` | default landing (unchanged) |
| 2 | Tutorial | `/app/tutorial` | `MonitorPlay` | label singular (was "Tutorials") |
| 3 | Plan | `/app/plan` | `CalendarRange` | new hub |
| 4 | Learn | `/app/learn` | `BookOpen` | new hub |
| 5 | Practice | `/app/practice` | `Target` | new hub |
| 6 | Revise | `/app/revise` | `Layers` | new hub — the renamed "Consolidate" |
| 7 | Minigames | `/app/minigames` | `Gamepad2` | existing hub page |
| 8 | Study Rooms | `/app/study-rooms` | `Users` | new page (rebranded Study Parties) |
| 9 | Account | `/app/account` | `UserCog` | Billing merged in |

"Revise" was chosen over "Consolidate": one word every medical student already uses
("revision"), it names what Notebook, Whiteboard and Flashcards are for, and it
translates cleanly (مراجعة). Sidebar group captions disappear (nine items need no
grouping). Collapsed rail, mobile drawer, ⌘K palette, breadcrumb and `Placeholder`
keep reading from `studentNav`; every route that is no longer in the nav needs a title
in a small `ROUTE_TITLES` map in `nav.ts` (consumed by `Topbar.currentTitle`) so the
breadcrumb never falls back to the path.

Routes kept (reachable from hubs or redirects), none removed:
`/app/university`, `/app/calendar`, `/app/performance`, `/app/library`, `/app/resources`,
`/app/taxonomy` (→ renders Medical Terminology; new canonical alias `/app/terminology`),
`/app/qbank`, `/app/qotd`, `/app/question-notes` (→ redirect `/app/notebook?tab=questions`),
`/app/adaptive`, `/app/practical`, `/app/essays`, `/app/notebook`, `/app/whiteboard`,
`/app/flashcards`, `/app/maristanas`, `/app/study-together` (→ redirect
`/app/study-rooms`, query string preserved so `?party=` / `?invite=` links still work),
`/app/billing` (→ redirect `/app/account?tab=billing`), all six minigame routes,
`/app/term-grid`, `/app/resources/:id`.

QoTD's sidebar unanswered dot moves to the Dashboard nav item (a dot on "Dashboard"
when today's question is unanswered) so the signal is not lost.

## 3. Hub pages (Plan · Learn · Practice · Revise)

One shared page pattern, `src/components/hub/`:

- `HubPage({ eyebrow, title, lede, children, aside? })` — `PageContainer`, then a
  header band on `bg-ivory` with `border-ivory-line`, radius `2xl`, padding 24/32:
  a mono uppercase eyebrow (`font-mono text-[11px] tracking-[0.18em] text-ink-2`,
  e.g. "03 · PRACTICE"), the serif page title (30px desktop / 24px mobile), a one-line
  lede in `text-ink-2`, and an optional right-aligned summary slot (a ring or two
  stats). The band enters with `animate-screen-in` (transform-only).
- `FeatureGrid` — `grid gap-4 sm:grid-cols-2 xl:grid-cols-3`, children staggered via
  the existing `stagger` utility (transform-only rise; never opacity).
- `FeatureCard({ to, icon, title, description, progress?, stats?, status?, onComingSoon? })`
  — `Panel` surface (`rounded-xl border border-line bg-surface shadow-panel`), padding
  20. Top row: a 40px icon tile (`bg-ivory border border-ivory-line rounded-lg`, icon
  18px `text-primary-strong`) and, at the end, an `ArrowUpRight` 16px `text-ink-3` that
  slides 2px on hover. Title sans 15px semibold; description 13px `text-ink-2`, two
  lines max. Footer row: progress device + up to two mono `tnum` stats.
  `progress` is `{ kind: 'ring' | 'bar', value, max, label, tone?: 'primary' | 'accent' }`
  rendered with `TargetRing size=44 thickness=5` or `Meter target`. Hover: −2px
  `translateY` + `shadow-raised`, 180ms `--ease-out-quint`; focus-visible ring as
  everywhere. The whole card is a `Link` (or a `button` for coming-soon).
  `status: 'coming-soon'` renders a `Badge tone="outline"` "Coming soon", desaturates
  the icon tile to `bg-surface-2`, and clicking opens `ComingSoonDialog`.
- `ComingSoonDialog({ title, body, previewHref?, onClose })` — the existing `Dialog`
  (`size="sm"`), header on an ivory band with the feature's icon, the serif title,
  a two-sentence body ("what it will do · when it makes sense to expect it"), and
  actions: "Got it" (primary) and, when `previewHref` is given, "Open the preview"
  (secondary) — this is how the existing partial University, Library and Adaptive
  Study interfaces stay reachable.
- `HubStat({ label, value, sub? })` — mono value, small label, for the header slot.

Hub contents and the progress each card shows (all from existing hooks; nothing new
is persisted for the hubs):

**Plan** (`/app/plan`, eyebrow "01 · PLAN", lede "Where your weeks are going.")
1. Calendar → `/app/calendar` · bar: today's blocks done / total (`useUpcoming` +
   `nishany.calendar.blocks`) · stats: open tasks (from the new task store), next exam
   in N days.
2. University → coming soon, `previewHref="/app/university"` · body explains the
   modules/timetable/marks view will be driven by the faculty's published curriculum.
3. Performance → `/app/performance` · ring: first-attempt accuracy (`attemptStats`) ·
   stats: answered this week, sessions.
Header slot: the exam countdown figure (days to next exam) when one exists.

**Learn** (`/app/learn`, eyebrow "02 · LEARN", lede "Read, look it up, understand it.")
1. Library → coming soon, `previewHref="/app/library"`.
2. Medical Terminology → `/app/terminology` · ring: terms marked known / total
   (new `useTerminologyProgress`) · stats: categories, terms.
3. Resources → `/app/resources` · stats: bookmarks, recently opened
   (`useRecentResources`).
4. Tutorial → `/app/tutorial` (kept discoverable here as well; no progress).

**Practice** (`/app/practice`, eyebrow "03 · PRACTICE", lede "Every format your exams
throw at you.")
1. Question Bank → `/app/qbank` · ring: bank seen % (same numbers as the dashboard
   ring stack) · stats: first-attempt accuracy, questions answered.
2. Practical → `/app/practical` · ring: items attempted / total · stats: OSCE stations,
   cases.
3. Essay → `/app/essays` · ring: marked / total.
4. Adaptive Study → coming soon, `previewHref="/app/adaptive"`.
Header slot: the three-ring stack in miniature (`RingStack` at 72px) is *not* repeated
here — the header shows "questions answered today / target" as one `HubStat` pair.

**Revise** (`/app/revise`, eyebrow "04 · REVISE", lede "Capture it, connect it, keep it.")
1. Notebook → `/app/notebook` · stats: notes, question notes.
2. Whiteboard → `/app/whiteboard` · stats: boards.
3. Flashcards → `/app/flashcards` · ring: due today cleared / due · stats: decks, cards.

## 4. Dashboard

`src/pages/student/Dashboard.tsx` keeps its column and hero. Changes:

- The column widens to `max-w-[60rem]`.
- The standalone Question of the Day card slot is removed; instead the "Study rhythm"
  area becomes `StudyRhythmSection`: a `grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]`
  with `StudyHeatmap` on the start side and `QuestionOfTheDayCard` (full height,
  `h-full`) on the end side. Below `lg` the QoTD card stacks under the heatmap.
- The ring stack and exam hero are unchanged. The footer link row stays.
- The greeting hero's ring already uses the target vocabulary; no change.

## 5. Question Bank — Direction 1 (this worktree)

`src/pages/student/QuestionBank.tsx` is 2,460 lines of hub + session. The redesign is
of the **hub** (everything under `hubTab`), leaving the session runner, `QuestionView`,
`StudyRail`, `QuestionNavigator`, `EndSessionDialog`, collections and attempt
recording untouched. Extract the hub into `src/components/qbank/hub/`:

- `QbankHub.tsx` — page header: serif title "Question Bank", lede, actions:
  **Question of the Day** (`ButtonLink to="/app/qotd" variant="secondary"
  iconLeft={Target}`, with the unanswered dot) and "Previous tests" (scrolls to the
  ledger). Beneath, a `Tabs` row: **Build a test** · **Flagged & missed** · **Previous
  tests** (the existing three hub tabs, relabelled).
- `TestBuilder.tsx` — the "Build a test" tab as a two-column composer
  (`lg:grid-cols-[minmax(0,1fr)_20rem]`):
  - Start with quick-starts as a horizontal chip row (weakest / emergency /
    high-yield / everything) — the existing presets.
  - Numbered steps, each a `Panel` with a mono step label ("STEP 1 · DRAW FROM"):
    1. Draw from — `Segmented` (all / flagged / incorrect / omitted), unchanged state.
    2. Question source — the 2×4 source cards rendered **disabled** (`aria-disabled`,
       `opacity-60`, no pointer), with a `Badge tone="outline"` "Coming soon" beside
       the label and one line "Source filtering arrives with the next content
       release." The `sourceSel` state stays wired so nothing else changes.
    3. Scope — `TopicChooser` unchanged.
    4. Session — count / mode / timer controls that exist today.
  - The end column is a sticky **summary card** on ivory: the live matching-question
    count as a `TargetRing` (matching / pool), the chosen scope summarised in one line,
    and the primary **Start test** button (existing `startSession` handler). On mobile
    it becomes a bottom-fixed bar with count + Start.
- `CollectionsTab.tsx` and `PreviousTestsTab.tsx` wrap the existing `QuestionCollections`
  and `PreviousTests`/`SessionDetailPanel` with the new header rhythm.

No filter logic changes. Question Source is the only functional change, and it is a
disable.

## 6. Question Bank — Direction 2 (separate worktree, separate port)

Branch `claude/qbank-unified-builder` in a second worktree, started on port **5174**.
It begins from Direction 1's working tree (patch-applied, since nothing is committed)
and replaces the "Build a test" tab with a **Unified test builder** that houses three
banks:

- **MCQ bank** — Direction 1's builder verbatim.
- **Practical bank** — pick OSCE stations / clinical cases / lab & imaging by system,
  count, minutes; starts `PracticalRunner` items in sequence.
- **Essay bank** — pick essays / written formats by system and count; starts
  `EssayRunner` / written runners in sequence.
- **Mixed test** — a fourth tab: a proportion editor (three `Meter`-style sliders that
  must total the chosen count) drawing from the three banks; the session is a queue of
  `MixedItem = { kind: 'mcq' | 'practical' | 'essay', id }` and the runner dispatches
  each item to its existing runner, then shows one combined summary (answered,
  correct, marked, time). Attempts still record through each bank's existing hooks;
  the mixed session persists only its own queue/cursor under
  `nishany.qbank.mixedSession.v1`.

Each bank works independently (own tab, own Start). The bank switcher is a `Tabs`
row above the composer: **MCQ · Practical · Essay · Mixed**. Direction 2 is a
preview; its limitations (sequential dispatch, no shared timer across kinds) are
listed in the handover.

## 7. Plan → Calendar with tasks

`src/pages/student/Calendar.tsx` keeps the grid, toolbar, block dialog, day sheet and
all persistence of study blocks. The right column (`<aside>` at `:471`, four panels)
is replaced by **`TaskList`** (`src/components/calendar/TaskList.tsx`), and the four
panels' facts that still matter are folded into the header of the task list (a
one-line "Prepare next: …" row) so nothing is lost.

Model `src/data/tasks.ts`:

```ts
export const TASKS_STORAGE_KEY = 'nishany.calendar.tasks.v1'   // user-owned (dotted)
export interface TaskGroup { id: string; title: string; createdAt: string }
export interface Subtask { id: string; title: string; done: boolean }
export interface Task {
  id: string; groupId: string; title: string; details?: string
  date?: string            // 'YYYY-MM-DD'
  time?: string            // 'HH:MM'
  done: boolean; subtasks: Subtask[]; createdAt: string; updatedAt: string
}
export interface TaskDoc { version: 1; groups: TaskGroup[]; tasks: Task[] }
export const EMPTY_TASKS: TaskDoc
export function scheduleLabel(task, today): 'Today' | 'Tomorrow' | 'Overdue' | string | null
export function tasksForDay(doc, ymd): Task[]
export function taskProgress(task): { done: number; total: number }   // subtasks
```

Hook `src/lib/useTasks.ts`: `useTasks()` → `{ doc, addGroup(title), renameGroup,
removeGroup (moves its tasks to the default group), addTask({ groupId, title,
details?, date?, time? }), updateTask(id, patch), toggleTask(id), removeTask(id),
addSubtask(taskId, title), toggleSubtask(taskId, subId), removeSubtask }` over
`usePersistentState<TaskDoc>`. A default group "My tasks" is created lazily.

UI:
- Header: sans panel title "Tasks", count of open tasks, a "+ Group" ghost button.
- **Quick add**: one text input at the top ("Add a task…"); Enter creates it in the
  currently selected group, scheduled for the selected calendar day if one is
  selected, else unscheduled. A `Popover` "More" opens the full form: title, details
  (textarea), group `Select`, schedule chips **Today · Tomorrow · Pick a date**
  (`DateField`) and an optional `TimeField`.
- Groups render as collapsible sections (`Collapse`), each with its open count.
  Tasks are rows: `Checkbox`, title, schedule chip (`Badge`: "Today" primary,
  "Tomorrow" neutral, "Overdue" danger, else the short date), a subtask meter
  (`2/5`) when subtasks exist, and a chevron to expand details + subtasks. Expanded
  state shows details, the subtask list with an inline "Add a subtask" input, and
  edit/delete actions (`ContextMenu` on right-click as well).
- Done tasks sink to the end of their group with `line-through text-ink-3`; a "Show
  completed" toggle per list.
- Scheduled tasks appear on the calendar: a small crimson dot row in the month cell
  and as items in the `DaySheet` and week list, using the same `CalEvent` union with
  `layer: 'personal'`, `kind: 'task'`. Clicking a task in the grid opens it in the
  list (scroll + highlight).
- Mobile (`< xl`): the page gets a `Segmented` **Calendar · Tasks** switch under the
  toolbar; the task list is full-width when selected. Touch targets ≥ 44px.

## 8. Learn → Medical Terminology

Rename "Medical Taxonomy" → **"Medical Terminology"** for every user-facing string
(nav, page title, tutorials label and body, `assistantSurface` name, deck description,
AR dictionary key) while keeping internal identifiers: route `/app/taxonomy` still
resolves (alias of the new canonical `/app/terminology`), `STUDY_SURFACES` gains
`terminology`, tutorial topic id `taxonomy`, deck-id prefix `deck-taxonomy-`, and the
admin "Systems & Topics" taxonomy is untouched. `currentFilterName()`'s default string
changes to "Medical Terminology" for the visible deck title; to keep old deck ids
stable, `deckFromTerms` slugs the id from a fixed `'medical-taxonomy'` seed when the
filter is the default, not from the label.

Page redesign (`src/pages/student/MedicalTerminology.tsx`, `MedicalTaxonomy.tsx` becomes
a re-export):

- **Hero band** (ivory): eyebrow "LEARN · TERMINOLOGY", serif title, lede, and on the
  end side a `TargetRing` of terms known / total with "known" label, plus two
  `HubStat`s (categories, terms).
- **Three ways to learn** row of three action cards: *Browse & mark* (this page),
  *Term Grid* (crossword, existing `/app/term-grid?category=…`), *Flashcards* (existing
  `deckFromTerms` → `/app/flashcards`), *Term Match* (existing game). Each shows its
  count / progress.
- **Category rail**: `FilterChip`s with a per-category mini progress (`12/13`), plus
  the search field and EN⇄AR direction toggle that exist today.
- **Term cards** become **flip cards**: front = term (EN, serif 20px) + AR term; tap or
  "Reveal" flips (3D `rotateY` 400ms, reduced-motion = instant swap) to definition EN/AR
  + example. A **"Got it"** toggle marks the term known (crimson check pill); "Still
  learning" unmarks. Keyboard: Space flips, Enter toggles known. Grid `sm:grid-cols-2
  xl:grid-cols-3`, staggered entrance.
- Progress model `src/data/terminologyProgress.ts` + `src/lib/useTerminologyProgress.ts`:
  `TERMINOLOGY_PROGRESS_KEY = 'nishany.terminology.progress.v1'`, doc
  `{ version: 1; known: Record<termId, isoDate> }`, hook returns `{ known: Set<string>,
  mark(id), unmark(id), toggle(id), knownIn(termIds: string[]): number }`.
  Term ids are the glossary's stable `term.id`.
- A "Study the N you're still learning" button starts a flashcard deck of unknown
  terms in the current filter.

## 9. Practice → Practical

`src/pages/student/Practical.tsx` keeps every tab and runner. The top of the page
becomes a **section overview**: a `FeatureGrid` of six `FeatureCard`s — OSCE Stations,
Clinical Cases, Oral Questions, Skills, Lab & Imaging, Histology — each with its count
and a progress ring from `usePracticalProgress`; clicking selects that tab (URL
`?tab=osce|cases|oral|skills|lab|histology`, so deep links work) and scrolls the tab
strip into view. The `Tabs` row and tab bodies remain below. This gives Practical a
dashboard without adding routes.

## 10. Revise → Notebook and Question Notes

`Notebook.tsx` gets a third tab, **Question notes** (`NotebookTab = 'your' | 'shared' |
'questions'`), and a header action button "Question notes · N" (`StickyNote` icon) that
selects it. The tab body renders the existing join from `QuestionNotes.tsx`, moved into
`src/components/notebook/QuestionNotesPanel.tsx` (search, subject chips, note cards,
"Open question" links to `/app/qbank?…` unchanged). `?tab=questions` selects the tab;
`/app/question-notes` redirects there. Notes still live in
`nishany.qbank.questionNotes.v1` and are still written from `StudyRail`.

## 11. Account (with Billing)

`Account.tsx` becomes a tabbed page (`Tabs`, URL `?tab=`): **Profile** (study context,
identity, timezone) · **Preferences** (notifications, appearance, privacy & data) ·
**Billing** (the four Billing panels, moved into `src/components/account/BillingPanels.tsx`
and rendered from the existing `Billing.tsx` logic) · **Security** (MFA, this session,
export, support). Nav label "Account"; `/app/billing` redirects to
`/app/account?tab=billing`. Page title "Account".

## 12. Study Rooms (rebranded Study Parties)

New page `src/pages/student/StudyRooms.tsx` at `/app/study-rooms`, replacing
`StudyTogether` as the destination (the old page's shared tests and friends tabs are
kept as secondary sections of the lobby so nothing is lost; `/app/study-together`
redirects with its query string).

**Lobby** (`components/rooms/RoomLobby.tsx`): header band on ivory ("Study Rooms —
sit with your cohort. Up to 20 to a room."), a **Join with a code** field, **Create a
room** (name, subject chips, seats 4–20), then **Your rooms** and **Open rooms** as
room cards (name, occupancy `7/20` with a `Meter target`, who is speaking count,
Enter). Below: two quiet panels — *Shared tests* and *Friends* (the existing panels,
demoted). Demo mode shows a seeded demo room with six students so the scene renders
in the preview.

**Room** (`components/rooms/RoomView.tsx`): a full-width **study hall scene** on an
ivory floor (`components/rooms/StudyHall.tsx`): an SVG of up to 20 desks in rows of
five (4 rows), each `Seat` a small sketch-style character on a chair with a device on
the desk. Occupied seats show the member's initials/username under the desk; empty
seats are drawn lighter. A member who is **studying** (activity within the last 90 s,
from the room's member `lastSeenAt`/activity heartbeat that the existing party polling
already carries, plus the local `StudyActivityTracker` for self) gets a `typing` class:
the character's forearm oscillates 2px at 0.9 s (transform-only; reduced motion =
still). A member who is **speaking** gets a soft ring pulse around the head in accent
blue. Your own seat has a crimson seat cushion.

**Customise** (`components/rooms/SeatCustomiser.tsx`): a `Dialog` with three pickers,
each a row of sketch variants drawn as inline SVG: **Desk** (3: plain, drawer, corner),
**Device** (laptop, desktop PC, iPad/tablet, iPhone, Android phone), **Chair** (2).
Stored in `nishany.studyRooms.seat.v1` `{ desk, device, chair }` and sent with the
room's member record in live mode (`seat` JSON on `study_party_members` if the server
accepts it; otherwise kept client-side and reported as a limitation).

**Audio** (`lib/rooms/useRoomAudio.ts`): the integration boundary:

```ts
export type RoomAudioState = 'unsupported' | 'idle' | 'joining' | 'live' | 'error'
export interface RoomAudio {
  state: RoomAudioState
  muted: boolean
  speaking: Set<string>          // member ids currently speaking (self included)
  join(): Promise<void>; leave(): void; toggleMute(): void
  reason?: string                // why unsupported/error, for the UI
}
export function useRoomAudio(roomId: string, selfId: string): RoomAudio
```

Because no signalling, TURN or SFU exists in the repo (parties use 4 s polling and one
SSE stream for games; no WebSocket, no WebRTC), the shipped implementation captures the
**local microphone only** (`getUserMedia` + `AnalyserNode`) to drive the mute button and
your own "speaking" ring, and reports `state: 'unsupported'` with reason "Voice
transport is not connected yet" for other members. The UI says this plainly in a quiet
inset note; no fake remote audio. `RoomControls` shows Join voice · Mute · Leave room,
and a "Speaking now" list. The handover lists what the backend needs: a signalling
channel (WebSocket or SSE + POST), STUN/TURN, and an SFU for 20-peer rooms (LiveKit or
mediasoup are the honest options; mesh WebRTC does not scale to 20).

Room data uses the existing parties API and hooks (`useParties`, `usePartyActions`,
`useParty`) — a Study Room *is* a study party; only the words and the scene change. The
existing party session runner and game sync stay available from inside the room as
"Start a shared set" and "Play a game".

## 13. Loading animation

`src/components/ui/NishanyLoader.tsx` — `NishanyLoader({ size = 40, label = 'Loading',
className })`: an SVG of four concentric ring tracks (stroke widths scale with size;
radii at 0.46, 0.36, 0.26, 0.16 of size) in `--color-inset`, with a thin `--color-grid-major`
inner circle, and four arcs (outer→inner: `--color-accent`, `--color-accent-soft`,
`--color-primary`, `--color-primary-soft`) that each **fill then empty** around the ring.
The motion is a CSS keyframe on `stroke-dasharray`/`stroke-dashoffset` plus a rotation
so the arc's head keeps travelling while the tail catches up (the "chasing arc"); one
period is `--dur-loader` 1600 ms with `cubic-bezier(0.55, 0, 0.85, 0.35)` (slow start,
accelerating end) and the rings are phase-shifted by 120 ms each so the stack reads as
one instrument. The loop is seamless (the keyframe's first and last frames are equal).
`prefers-reduced-motion`: arcs hold at 25/50/75/100% with no motion. `role="status"`,
`aria-live="polite"`, sr-only label.

Replacements: `RouteLoading` centres a 48px loader after its 150 ms delay (the skeleton
goes); `Button`'s `loading` prop uses a 16px single-ring variant (`NishanyLoader mini`);
`AsyncSurface` default fallback; every `Loader2 … animate-spin` in `src/` (flashcards
import/export dialogs, admin ImportWizard, BulkImportPage, MediaRequests, MailBox,
ControlDashboard's hand-rolled spinner); the "Loading…" text states on student surfaces
(QoTD card and page, Resources, University, SlideViewer, CatalogueUnavailable).

## 14. Footer pages

Marketing routes (both `MarketingShell` chromes, EN and AR shells link to the same EN
pages; AR translations are flagged as pending): `/terms`, `/privacy`, `/refund-policy`,
`/contact`. One `LegalPage` layout (`src/pages/legal/LegalPage.tsx`): title, "Last
updated" line, a sticky in-page section index on desktop, prose at 62ch. Content lives
in `src/pages/legal/content.ts` as structured sections. Every section that states a
fact Nishany has not confirmed (company legal name, jurisdiction, address, refund
window mechanics beyond the existing "14-day refund window" line, data retention
periods) carries a visible `Badge tone="warning"` **"Needs legal review"** and a
bracketed placeholder like `[COMPANY LEGAL NAME]`. The refund page reuses the existing
pricing copy ("14-day refund window, subject to the published refund policy and abuse
controls") as its opening statement. Contact is a page with `help@nishany.com`
(the existing support address), a short form (name, email, message) that composes a
`mailto:` because no contact endpoint exists, and the same review badge on any
address/phone placeholder. The footer in `MarketingShell` gains a second row with the
four links; `public/sitemap.xml` lists them; `usePageMeta` sets titles.

## 15. Design canvas

A Claude Design canvas titled **"Nishany Student Redesign"** with artboards in the
app's warm theme (every hex is an existing token value) for: Sidebar + Dashboard, Plan,
Learn, Practice, Revise, Calendar + Tasks, Medical Terminology, Question Bank
(direction 1), Unified Test Builder (direction 2), Study Room, Account, Loader, Terms
page, and a phone artboard of the Study Room and of Calendar + Tasks. It is the
reference Omar can tweak; the code is the deliverable.

## 16. Responsiveness and accessibility

Desktop ≥ `xl`, tablet `md`–`lg`, phone `< sm`. Hubs go 3 → 2 → 1 columns; two-column
composers stack with the summary becoming a bottom bar; the study hall scales to fit
its container width (SVG `viewBox`) and rows of five become rows of four below `md`.
All new controls are keyboard reachable, labelled, ≥ 44px on touch, and no state is
carried by colour alone. All new strings go through `t()` with Arabic entries added
in per-feature dictionaries merged into `AR`.

## 17. Out of scope / not changed

Session runners (MCQ, practical, essay, written), the admin portal, the landing hero,
the iOS/Android apps, storage-key names, the server, Maristanas (a "Build Maristanas"
card is added to the Minigames hub so it stays reachable), and the parties backend.
