# Histology and the Microscope Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give students a microscope on the Practical page that opens a histology slide, viewable at 4× / 10× / 40× with revealable labelled structures, and give admins a Histology tab to author slides.

**Architecture:** A slide is a new `ContentKind` in the existing content ledger, so it inherits the catalogue, status workflow, university/year scoping, editor and bulk import that every other authored kind already has. Students read published slides through a projecting hook, exactly as the Question Bank reads published questions. The supplied video is the transition *into* the viewer — it ends inside the eyepiece, and the slide fades into that circle.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind v4. Tests: `node --test --experimental-strip-types "src/**/*.test.ts"` at the repo root. No server or database work in this slice.

## Global Constraints

- Dependencies are installed. Do not run `npm install`. Add no dependency.
- `npx tsc -b` must stay green. `noUnusedLocals` is ON — an unused import or binding fails the build.
- **Every student-facing and admin-facing string goes through `useT()`** — `const t = useT()`, then `t('…')`.
- **Logical CSS properties only**: `ps-`/`pe-`/`ms-`/`me-`/`start-`/`end-`. Never `pl-`/`pr-`/`left-`/`right-`. The app runs RTL in Arabic.
- Tested modules import relatively with an explicit `.ts` extension (`./contentControl.ts`) — `node --test` cannot resolve the `@/` alias. This applies to type-only imports too.
- Comments explain **why**, not what — state the problem the code solves.
- Commit messages are a plain sentence about what a person can now do. No `feat:`/`fix:`/`chore:` prefixes.
- Motion respects `prefers-reduced-motion`, as every other authored animation in this design system does.
- The asset is already committed at `public/microscope/` — `focus.mp4` (2.3s, silent), `focus-poster.jpg` (first frame), `focus-end.jpg` (last frame). Do not re-encode it.

---

### Task 1: The slide model

Pure types and decisions with no React and no storage. This is where the pin rules live so they can be tested.

**Files:**
- Create: `src/data/histology.ts`
- Test: `src/data/histology.test.ts`

**Interfaces:**
- Consumes: `ManagedContentItem` from `./contentControl.ts`.
- Produces: `OBJECTIVES`, `Objective`, `SlideView`, `SlideStructure`, `HistologySlide`, `HistologyAuthoringData`, `clampPin`, `objectivesOf`, `openingObjective`, `structuresAt`, `managedSlideToStudentSlide`.

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  clampPin, objectivesOf, openingObjective, structuresAt, managedSlideToStudentSlide,
} from './histology.ts'
import type { ManagedContentItem } from './contentControl.ts'

const slide = {
  id: 's1', title: 'Ileum', subjectId: 'gi', tissue: 'Small bowel', stain: 'H&E',
  views: [
    { objective: 10 as const, image: 'ten.jpg' },
    { objective: 4 as const, image: 'four.jpg' },
  ],
  structures: [
    { id: 'a', label: 'Villus', at: { 4: { x: 0.2, y: 0.3 } } },
    { id: 'b', label: 'Goblet cell', at: { 10: { x: 0.6, y: 0.6 } } },
  ],
}

test('a pin is kept inside the image', () => {
  assert.deepEqual(clampPin({ x: 1.4, y: -0.2 }), { x: 1, y: 0 })
  assert.deepEqual(clampPin({ x: 0.5, y: 0.5 }), { x: 0.5, y: 0.5 })
})

test('the turret offers only the objectives the slide has, in order', () => {
  assert.deepEqual(objectivesOf(slide), [4, 10])
})

test('a slide opens at its lowest power', () => {
  assert.equal(openingObjective(slide), 4)
})

test('only structures pinned at this objective are shown', () => {
  assert.deepEqual(structuresAt(slide, 4).map((s) => s.label), ['Villus'])
  assert.deepEqual(structuresAt(slide, 10).map((s) => s.label), ['Goblet cell'])
  assert.deepEqual(structuresAt(slide, 40), [])
})

test('a slide with no structures is still a slide', () => {
  assert.deepEqual(structuresAt({ ...slide, structures: [] }, 4), [])
})

test('an unpublished slide is not offered to students', () => {
  const item = {
    id: 's1', kind: 'histology', title: 'Ileum', subjectId: 'gi', status: 'Draft',
    owner: '', updatedAt: '', fields: {},
    histologyData: { tissue: 'Small bowel', stain: 'H&E', views: slide.views, structures: [] },
  } as unknown as ManagedContentItem
  assert.equal(managedSlideToStudentSlide(item), null)
})

test('a published slide with no image is not offered either', () => {
  const item = {
    id: 's1', kind: 'histology', title: 'Ileum', subjectId: 'gi', status: 'Published',
    owner: '', updatedAt: '', fields: {},
    histologyData: { tissue: 'Small bowel', stain: 'H&E', views: [], structures: [] },
  } as unknown as ManagedContentItem
  assert.equal(managedSlideToStudentSlide(item), null)
})

test('a published slide projects into the student shape', () => {
  const item = {
    id: 's1', kind: 'histology', title: 'Ileum', subjectId: 'gi', status: 'Published',
    owner: '', updatedAt: '', fields: { Description: 'Note the villi.' },
    histologyData: { tissue: 'Small bowel', stain: 'H&E', views: slide.views, structures: slide.structures },
  } as unknown as ManagedContentItem
  const projected = managedSlideToStudentSlide(item)
  assert.equal(projected?.title, 'Ileum')
  assert.equal(projected?.stain, 'H&E')
  assert.equal(projected?.description, 'Note the villi.')
  assert.deepEqual(projected?.views.map((v) => v.objective), [4, 10])
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `node --test --experimental-strip-types src/data/histology.test.ts`
Expected: FAIL — cannot resolve `./histology.ts`.

- [ ] **Step 3: Write the implementation**

```ts
import type { ManagedContentItem } from './contentControl.ts'

/**
 * The objectives a teaching microscope actually carries.
 *
 * Fixed rather than free-form because the turret is a control with one button
 * per objective, and because "find it at low power, confirm at high power" is
 * the method being taught — an arbitrary magnification would not mean anything
 * to a student sitting a spotter exam.
 */
export const OBJECTIVES = [4, 10, 40] as const
export type Objective = (typeof OBJECTIVES)[number]

export interface SlideView {
  objective: Objective
  /** A stored media reference, resolved exactly as question attachments are. */
  image: string
}

export interface SlideStructure {
  id: string
  label: string
  /**
   * Where the pin sits, per objective, as a fraction of the image.
   *
   * Fractions because a pixel offset breaks the moment the image is rendered at
   * any other size. Per objective because 4× and 40× are different fields, not
   * the same picture scaled — a structure is usually somewhere else entirely,
   * if it is on screen at all.
   */
  at: Partial<Record<Objective, { x: number; y: number }>>
  note?: string
}

export interface HistologySlide {
  id: string
  title: string
  subjectId: string
  tissue: string
  stain: string
  views: SlideView[]
  structures: SlideStructure[]
  description?: string
}

/** What the admin editor stores on the ledger item. */
export interface HistologyAuthoringData {
  tissue: string
  stain: string
  views: SlideView[]
  structures: SlideStructure[]
}

/** A pin dropped outside the image would render off the field of view. */
export function clampPin(point: { x: number; y: number }): { x: number; y: number } {
  return { x: Math.min(1, Math.max(0, point.x)), y: Math.min(1, Math.max(0, point.y)) }
}

/** The objectives this slide actually has an image for, low power first. */
export function objectivesOf(slide: Pick<HistologySlide, 'views'>): Objective[] {
  return OBJECTIVES.filter((objective) => slide.views.some((view) => view.objective === objective))
}

/**
 * Where a slide opens.
 *
 * The lowest power it has, because that is where you orient yourself. Opening
 * at 40× drops the student into a field with no landmarks.
 */
export function openingObjective(slide: Pick<HistologySlide, 'views'>): Objective | null {
  return objectivesOf(slide)[0] ?? null
}

/** The structures pinned at this objective — the others are not on this field. */
export function structuresAt(
  slide: Pick<HistologySlide, 'structures'>,
  objective: Objective,
): SlideStructure[] {
  return slide.structures.filter((structure) => Boolean(structure.at[objective]))
}

/**
 * The student-facing slide, or null when it is not one.
 *
 * A slide with no image cannot be looked at, so it is refused here rather than
 * reaching the viewer and rendering an empty eyepiece.
 */
export function managedSlideToStudentSlide(item: ManagedContentItem): HistologySlide | null {
  if (item.kind !== 'histology' || item.status !== 'Published') return null
  const data = item.histologyData
  if (!data) return null
  const views = OBJECTIVES
    .map((objective) => data.views.find((view) => view.objective === objective && view.image.trim()))
    .filter((view): view is SlideView => Boolean(view))
  if (!views.length) return null
  return {
    id: item.id,
    title: item.title,
    subjectId: item.subjectId,
    tissue: data.tissue,
    stain: data.stain,
    views,
    structures: data.structures ?? [],
    description: item.fields.Description?.trim() || undefined,
  }
}
```

- [ ] **Step 4: Run it and watch it pass**

Run: `node --test --experimental-strip-types src/data/histology.test.ts`
Expected: PASS, 8 tests.

Note this will not compile until Task 2 adds `histologyData` to `ManagedContentItem` and `'histology'` to `ContentKind`. That is expected — `node --test` strips types and runs. Do **not** run `npx tsc -b` at this task; it is green again at the end of Task 2.

- [ ] **Step 5: Commit**

```bash
git add src/data/histology.ts src/data/histology.test.ts
git commit -m "Describe a slide, and where its labels sit"
```

---

### Task 2: A slide is a kind of content

Wire `'histology'` through the ledger so it inherits the catalogue, editor, scoping and bulk import.

**Files:**
- Modify: `src/data/contentControl.ts`
- Modify: `src/data/bulkImport.ts`
- Modify: `src/components/admin/pickerOptions.ts`
- Modify: `src/pages/admin/ControlDashboard.tsx`
- Modify: `src/data/contentReports.ts`, `src/components/reports/ReportContentDialog.tsx` (only where a `Record<ContentKind, …>` now needs a `histology` entry)
- Test: `src/data/bulkImport.test.ts`

**Interfaces:**
- Consumes: `HistologyAuthoringData` from Task 1.
- Produces: `ContentKind` including `'histology'`; `ManagedContentItem.histologyData`.

- [ ] **Step 1: Widen the type and its records**

In `contentControl.ts`:

```ts
export type ContentKind = 'question' | 'article' | 'practical' | 'resource' | 'histology'
```

Add to `ManagedContentItem`:

```ts
  histologyData?: HistologyAuthoringData
```

importing the type from `./histology.ts`. Add entries to **every** `Record<ContentKind, …>` in the file — `CONTENT_KIND_LABEL` and `CONTENT_FIELDS` at minimum:

```ts
  histology: { singular: 'slide', plural: 'Histology slides' },
```

```ts
  histology: [
    { key: 'Tissue', label: 'Tissue' },
    { key: 'Stain', label: 'Stain' },
    { key: 'Description', label: 'What to look for', multiline: true },
  ],
```

`tsc` will name any record you miss — that is the point of the exhaustive `Record`. Fix each until it is green.

- [ ] **Step 2: Add the import schema**

In `bulkImport.ts`, add a `histology` entry to `IMPORT_SCHEMAS` following the shape of the existing entries (`noun`, `fields`, `markdownExample`), with the `common` fields plus `tissue`, `stain`, `description`, and `image_4x`, `image_10x`, `image_40x`.

Then extend `validateImportRow` and `importRowToContent` for `'histology'`: a row is valid with a title, a subject, and **at least one** image; the produced item carries `histologyData` with its views and an empty `structures` array.

Add a comment saying why pins are not importable: clicking a point on an image is not a spreadsheet cell, so imported slides arrive with their images and metadata and are labelled in the editor.

- [ ] **Step 3: Add tests for the import row**

Append to `src/data/bulkImport.test.ts`, matching the file's existing style:

```ts
test('a histology row needs at least one image', () => {
  const missing = validateImportRow('histology', { title: 'Ileum', subject: 'gi' })
  assert.ok(missing.errors.some((error) => /image/i.test(error)))
})

test('a histology row with one image is accepted', () => {
  const result = validateImportRow('histology', {
    title: 'Ileum', subject: 'gi', tissue: 'Small bowel', stain: 'H&E', image_4x: 'four.jpg',
  })
  assert.deepEqual(result.errors, [])
})

test('an imported slide carries its views and no pins yet', () => {
  const item = importRowToContent('histology', {
    title: 'Ileum', subject: 'gi', tissue: 'Small bowel', stain: 'H&E',
    image_4x: 'four.jpg', image_40x: 'forty.jpg',
  }, 'row-1')
  assert.equal(item.kind, 'histology')
  assert.deepEqual(item.histologyData?.views.map((view) => view.objective), [4, 40])
  assert.deepEqual(item.histologyData?.structures, [])
})
```

Read `validateImportRow`'s actual return shape first and match it — if it returns something other than `{ errors }`, adjust these assertions to the real shape rather than changing the function.

- [ ] **Step 4: Add the kind to the admin catalogue**

In `ControlDashboard.tsx`, add `['histology', 'Histology']` to the kind list near line 508, add a `histology` count beside the others near line 229, and include `'histology'` in the scope-filter condition near line 240 so slides scope by university and year like questions and practicals do.

- [ ] **Step 5: Verify and commit**

Run: `npx tsc -b` — clean. `npm test` — the existing suite plus your new tests.

```bash
git add src/data src/components/admin src/pages/admin src/components/reports
git commit -m "Let a slide be authored like every other piece of content"
```

---

### Task 3: The published slides a student can see

**Files:**
- Create: `src/lib/useLiveHistology.ts`

**Interfaces:**
- Consumes: `managedSlideToStudentSlide` (Task 1), `CONTENT_LEDGER_STORAGE_KEY` and `initialManagedContent` from `@/data/contentControl`.
- Produces: `useLiveHistology(): { slides: HistologySlide[] }`.

- [ ] **Step 1: Write the hook**

Read `src/lib/usePublishedQuestions.ts` first and mirror it exactly — same `usePersistentState` on `CONTENT_LEDGER_STORAGE_KEY`, same `useMemo`, same projection-and-filter shape. It is a dozen lines:

```ts
export function useLiveHistology(): { slides: HistologySlide[] } {
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const slides = useMemo(
    () => ledger.map(managedSlideToStudentSlide).filter((slide): slide is HistologySlide => Boolean(slide)),
    [ledger],
  )
  return { slides }
}
```

Match `usePublishedQuestions`'s actual generic and seeding call — if it uses a `seedOr` helper for live mode, use the same one, or a live install will show demo slides.

- [ ] **Step 2: Verify and commit**

Run: `npx tsc -b` — clean.

```bash
git add src/lib/useLiveHistology.ts
git commit -m "Read the slides that have been published"
```

---

### Task 4: The microscope, and choosing a slide

**Files:**
- Create: `src/components/practical/Microscope.tsx`

**Interfaces:**
- Consumes: `useLiveHistology` (Task 3), `HistologySlide` (Task 1).
- Produces: `<Microscope onOpen={(slide: HistologySlide) => void} />`.

- [ ] **Step 1: Build it**

Three states in one component:

1. **Idle** — a `<button>` showing `/microscope/focus-poster.jpg`, with an accessible name through `t('Choose a slide to look at')`. A real button, not a decorated `div`, so it is keyboard-reachable and announced.
2. **Picking** — the published slides grouped by subject, each row naming its tissue and stain. When there are none, say so plainly: `t('No slides have been published yet.')` with `t('Slides appear here once they are published in the admin console.')` — never an empty microscope.
3. **Focusing** — `<video src="/microscope/focus.mp4" autoPlay muted playsInline>` played once on choosing a slide, calling `onOpen(slide)` on `onEnded`.

Preload the video when the picker **opens**, not on mount — a student who never opens histology should not pay 261 KB for it.

Under reduced motion, skip the video entirely and call `onOpen(slide)` immediately:

```tsx
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
```

Also call `onOpen` on the video's `onError`, so a codec or network failure lands the student on the slide rather than stranding them on a still frame.

- [ ] **Step 2: Verify and commit**

Run: `npx tsc -b` — clean.

```bash
git add src/components/practical/Microscope.tsx
git commit -m "Press the microscope, and pick something to look at"
```

---

### Task 5: The slide viewer

**Files:**
- Create: `src/components/practical/SlideViewer.tsx`

**Interfaces:**
- Consumes: `objectivesOf`, `openingObjective`, `structuresAt`, `HistologySlide`, `Objective` (Task 1); `resolveMediaSource` from `@/lib/mediaStorage`.
- Produces: `<SlideViewer slide={…} onClose={() => void} />`.

- [ ] **Step 1: Build it**

- A **circular field of view** — `rounded-full overflow-hidden` with a dark rim, in CSS rather than an image, so it scales and takes the theme.
- The current objective's image inside it, resolved through `resolveMediaSource` (a stored reference is not a URL). Revoke the object URL on unmount and on changing objective — `resolveMediaSource` returns `revoke` saying whether you must.
- An **objective turret**: one button per entry in `objectivesOf(slide)`, opening at `openingObjective(slide)`. Show only what the slide has.
- **Pins** for `structuresAt(slide, objective)`, absolutely positioned at `left: ${x * 100}%` — note this one case genuinely needs `left`/`top` in an inline style, because it is a coordinate, not a layout direction; use `insetInlineStart` if it renders correctly in RTL, otherwise `left` with a comment saying why.
- Pins start **hidden**. Tapping one reveals that structure's label and note; a **Reveal all** control shows every label at once.
- Below the field: title, tissue, stain, and description where present.
- Drag to pan when the image overflows.

- [ ] **Step 2: Verify and commit**

Run: `npx tsc -b` — clean.

```bash
git add src/components/practical/SlideViewer.tsx
git commit -m "Look down the eyepiece, and name what you see"
```

---

### Task 6: The Histology tab

**Files:**
- Modify: `src/pages/student/Practical.tsx`

- [ ] **Step 1: Add the tab**

Add a sixth entry to the existing `Tabs` — `{ value: 'histology', label: 'Histology', icon: Microscope, count: slides.length }` (`Microscope` from `lucide-react`; **confirm it exists at runtime** — some lucide icons in this version do not, and a missing export is a blank page, not a type error). Render `<HistologyTab />` under it, holding the `Microscope` component and swapping to `SlideViewer` once a slide is chosen.

- [ ] **Step 2: Verify and commit**

Run: `npx tsc -b` — clean. `npm test` — unchanged.

Then in the browser (`preview_start`, never a dev server via Bash; drive with real DOM clicks via `javascript_tool` — the pane does not composite, so coordinate clicks and screenshots are unreliable): the tab appears, the microscope renders, and with nothing published it says so.

```bash
git add src/pages/student/Practical.tsx
git commit -m "Find the microscope under Practical"
```

---

### Task 7: The admin Histology tab

**Files:**
- Create: `src/pages/admin/HistologySetup.tsx`
- Modify: `src/router.tsx`, `src/components/shell/nav.ts`

- [ ] **Step 1: Build the page**

Copy `src/pages/admin/PracticalSetup.tsx` exactly — the university/year navigator wrapped around `ControlDashboard` — changing `initialKind="practical"` to `initialKind="histology"` and the heading. It is 111 lines and the pattern is the point; do not invent a second way to author content.

- [ ] **Step 2: Route and navigate**

Add `HistologySetup` to `src/router.tsx` with `lazyNamed`, and a nav entry to `adminNav` in `src/components/shell/nav.ts` under Content: `{ label: 'Histology', to: '/admin/histology', icon: Microscope }`.

- [ ] **Step 3: Verify and commit**

Run: `npx tsc -b` — clean. In the browser, `/admin/histology` renders with the navigator and the catalogue.

```bash
git add src/pages/admin/HistologySetup.tsx src/router.tsx src/components/shell/nav.ts
git commit -m "Add slides from the admin console"
```

---

### Task 8: Authoring a slide

**Files:**
- Modify: `src/components/admin/ContentEditorDialog.tsx` (or the per-kind editor it delegates to — read it first and follow its existing pattern)

- [ ] **Step 1: Add the histology section**

When `kind === 'histology'`, the editor gains:

- **One image per objective** — three upload slots labelled 4×, 10×, 40×, each storing through the same media path question attachments use, writing `histologyData.views`.
- **Structures** — add, rename, delete; each with a label and an optional note.
- **Pin placement** — with a structure selected and an objective shown, clicking the image drops that structure's pin at the clicked point, stored as a fraction through `clampPin`. Clicking again moves it. A structure may be pinned at more than one objective, and need not be pinned at all of them.

Show the objective being pinned, and which structures already have a pin there — an author needs to see what is done and what is not.

- [ ] **Step 2: Verify and commit**

Run: `npx tsc -b` — clean. `npm test` — unchanged.

In the browser: create a slide, upload an image, add a structure, place its pin, publish it, then confirm it appears on the student Histology tab and the pin shows where it was placed.

```bash
git add src/components/admin
git commit -m "Place a label exactly where the structure is"
```

---

## Out of scope, deliberately

- **The spotter quiz.** The pins authored here are exactly what it needs, so it is a later addition rather than a rebuild.
- **Deep-zoom tiles.** Objectives were chosen over continuous zoom; a tile pyramid needs a pipeline and scanned slides that do not exist yet.
- **Slices C, D, F, G**, unchanged and still ordered as in the A+B spec.
