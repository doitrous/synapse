# Essay Questions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a student read a written question, answer it, and mark themselves against the points that carry marks — and let an admin author those questions.

**Architecture:** An essay is a new `ContentKind` in the existing content ledger, so it inherits the catalogue, status workflow, university/year scoping, editor and bulk import. Students read published essays through a projecting hook, exactly as the Question Bank reads questions. Answers are the student's own, stored in a user-owned document, and logged as practice rather than as a score.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind v4. Tests: `node --test --experimental-strip-types "src/**/*.test.ts"` at the repo root. No server work.

## Global Constraints

- Dependencies are installed. Do not run `npm install`. Add no dependency.
- `npx tsc -b` must stay green. `noUnusedLocals` is ON — an unused import or binding fails the build.
- **Every student- and admin-facing string goes through `useT()`.**
- **Logical CSS properties only**: `ps-`/`pe-`/`ms-`/`me-`/`start-`/`end-`. Never `pl-`/`pr-`/`left-`/`right-`. The app runs RTL in Arabic.
- Tested modules import relatively with an explicit `.ts` extension (`./contentControl.ts`) — `node --test` cannot resolve the `@/` alias. This applies to type-only imports too.
- Comments explain **why**, not what.
- Commit messages are a plain sentence about what a person can now do. No `feat:`/`fix:` prefixes.
- **Adding a `ContentKind` fans out.** Widening the union makes `tsc` name every exhaustive `Record<ContentKind, …>` it breaks — let it guide you rather than guessing. Known sites: two in `contentControl.ts`, `IMPORT_SCHEMAS` in `bulkImport.ts`, `routeFor` in `BulkImportPage.tsx`, and several `=== 'practical'`-style comparisons in `ControlDashboard.tsx`.

---

### Task 1: The essay model

Pure types and decisions, no React and no storage.

**Files:**
- Create: `src/data/essay.ts`
- Test: `src/data/essay.test.ts`

**Interfaces:**
- Consumes: `ManagedContentItem` from `./contentControl.ts`.
- Produces: `EssayKeyPoint`, `EssayAuthoringData`, `EssayQuestion`, `parseKeyPoints`, `coveredCount`, `managedEssayToStudentEssay`.

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseKeyPoints, coveredCount, managedEssayToStudentEssay } from './essay.ts'
import type { ManagedContentItem } from './contentControl.ts'

test('key points parse one per line', () => {
  const points = parseKeyPoints('Raised JVP\nPulsatile liver\n')
  assert.deepEqual(points.map((point) => point.text), ['Raised JVP', 'Pulsatile liver'])
  assert.equal(points.every((point) => !point.legible), true)
})

test('a leading ! marks a point to write legibly, and is not part of the text', () => {
  const points = parseKeyPoints('!Tricuspid regurgitation\nRaised JVP')
  assert.equal(points[0].legible, true)
  assert.equal(points[0].text, 'Tricuspid regurgitation')
  assert.equal(points[1].legible, undefined)
})

test('blank lines are not key points', () => {
  assert.equal(parseKeyPoints('One\n\n   \nTwo').length, 2)
})

test('every key point gets its own id', () => {
  const points = parseKeyPoints('One\nTwo')
  assert.notEqual(points[0].id, points[1].id)
})

test('covered is what was ticked over what there was', () => {
  assert.deepEqual(coveredCount(['a', 'c'], ['a', 'b', 'c']), { covered: 2, total: 3 })
})

test('a tick for a point that no longer exists is not counted', () => {
  assert.deepEqual(coveredCount(['a', 'gone'], ['a', 'b']), { covered: 1, total: 2 })
})

test('an unmarked answer has no count rather than a zero', () => {
  assert.equal(coveredCount(null, ['a', 'b']), null)
})

test('an unpublished essay is not offered to students', () => {
  const item = {
    id: 'e1', kind: 'essay', title: 'Right heart failure', subjectId: 'cvs', status: 'Draft',
    owner: '', updatedAt: '', fields: {},
    essayData: { prompt: 'Discuss.', keyPoints: [{ id: 'k1', text: 'Raised JVP' }], examinerNote: '', modelAnswer: '' },
  } as unknown as ManagedContentItem
  assert.equal(managedEssayToStudentEssay(item), null)
})

test('an essay with no key points is not offered either', () => {
  const item = {
    id: 'e1', kind: 'essay', title: 'Right heart failure', subjectId: 'cvs', status: 'Published',
    owner: '', updatedAt: '', fields: {},
    essayData: { prompt: 'Discuss.', keyPoints: [], examinerNote: '', modelAnswer: '' },
  } as unknown as ManagedContentItem
  assert.equal(managedEssayToStudentEssay(item), null)
})

test('a published essay projects into the student shape', () => {
  const item = {
    id: 'e1', kind: 'essay', title: 'Right heart failure', subjectId: 'cvs', status: 'Published',
    owner: '', updatedAt: '', fields: {},
    essayData: {
      prompt: 'Discuss the causes.', examinerNote: 'Looks for the word cor pulmonale.',
      modelAnswer: 'Right heart failure follows…',
      keyPoints: [{ id: 'k1', text: 'Raised JVP' }, { id: 'k2', text: 'Cor pulmonale', legible: true }],
    },
  } as unknown as ManagedContentItem
  const essay = managedEssayToStudentEssay(item)
  assert.equal(essay?.prompt, 'Discuss the causes.')
  assert.equal(essay?.keyPoints.length, 2)
  assert.equal(essay?.keyPoints[1].legible, true)
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `node --test --experimental-strip-types src/data/essay.test.ts`
Expected: FAIL — cannot resolve `./essay.ts`.

- [ ] **Step 3: Write the implementation**

```ts
import type { ManagedContentItem } from './contentControl.ts'

/** A point that carries a mark. */
export interface EssayKeyPoint {
  id: string
  text: string
  /**
   * One of the words an examiner scans for — a diagnosis, an enzyme, an
   * organism. Flagged on the point rather than kept as a separate list,
   * because it is always one of the points that carries a mark, and two
   * fields saying the same thing eventually disagree.
   */
  legible?: boolean
}

export interface EssayAuthoringData {
  prompt: string
  keyPoints: EssayKeyPoint[]
  examinerNote: string
  modelAnswer: string
}

export interface EssayQuestion {
  id: string
  title: string
  subjectId: string
  prompt: string
  keyPoints: EssayKeyPoint[]
  examinerNote: string
  modelAnswer: string
}

/** A leading `!` marks a point to write legibly. */
const LEGIBLE_MARKER = '!'

/** One point per line, because that is how an author lists them. */
export function parseKeyPoints(value = ''): EssayKeyPoint[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const legible = line.startsWith(LEGIBLE_MARKER)
      return {
        id: `kp-${index}-${line.slice(0, 24).replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`,
        text: legible ? line.slice(LEGIBLE_MARKER.length).trim() : line,
        ...(legible ? { legible: true } : {}),
      }
    })
}

/**
 * How much of the answer was there, or null when it has not been marked.
 *
 * Null rather than zero: a student who has written an answer and not yet
 * marked it has not scored nothing, and showing "0 of 6" would say they did.
 *
 * Ticks are intersected with the points that currently exist, so editing a
 * question cannot leave an old tick counting toward a point that is gone.
 */
export function coveredCount(
  ticked: string[] | null,
  pointIds: string[],
): { covered: number; total: number } | null {
  if (!ticked) return null
  const present = new Set(pointIds)
  return { covered: ticked.filter((id) => present.has(id)).length, total: pointIds.length }
}

/**
 * The student-facing question, or null when it is not one.
 *
 * An essay with no key points is refused: there would be nothing to mark
 * yourself against, which is the whole of the practice.
 */
export function managedEssayToStudentEssay(item: ManagedContentItem): EssayQuestion | null {
  if (item.kind !== 'essay' || item.status !== 'Published') return null
  const data = item.essayData
  if (!data || !data.prompt.trim() || !data.keyPoints.length) return null
  return {
    id: item.id,
    title: item.title,
    subjectId: item.subjectId,
    prompt: data.prompt,
    keyPoints: data.keyPoints,
    examinerNote: data.examinerNote,
    modelAnswer: data.modelAnswer,
  }
}
```

- [ ] **Step 4: Run it and watch it pass**

Run: `node --test --experimental-strip-types src/data/essay.test.ts`
Expected: PASS, 10 tests.

`npx tsc -b` will fail until Task 2 adds `'essay'` to `ContentKind` and `essayData` to `ManagedContentItem`. That is expected — `node --test` strips types and runs. Do not "fix" it here.

- [ ] **Step 5: Commit**

```bash
git add src/data/essay.ts src/data/essay.test.ts
git commit -m "Describe a written question and the points that carry marks"
```

---

### Task 2: An essay is a kind of content

**Files:**
- Modify: `src/data/contentControl.ts`, `src/data/bulkImport.ts`, `src/pages/admin/BulkImportPage.tsx`, `src/pages/admin/ControlDashboard.tsx`
- Test: `src/data/bulkImport.test.ts`

- [ ] **Step 1: Widen the type and its records**

```ts
export type ContentKind = 'question' | 'article' | 'practical' | 'resource' | 'histology' | 'essay'
```

Add `essayData?: EssayAuthoringData` to `ManagedContentItem`, importing from `./essay.ts`. Then add an entry to every exhaustive record `tsc` names. At minimum:

```ts
  essay: { singular: 'written question', plural: 'Written questions' },
```

```ts
  essay: [
    { key: 'Prompt', label: 'The question', multiline: true },
    { key: 'ExaminerNote', label: 'What the examiner scans for', multiline: true },
  ],
```

- [ ] **Step 2: Add the import schema**

Add an `essay` entry to `IMPORT_SCHEMAS` following the existing entries, with the `common` fields plus `prompt`, `key_points`, `examiner_note`, `model_answer`. Extend `validateImportRow` and `importRowToContent`: a row needs a title, a subject, a prompt, and **at least one key point**; the produced item carries `essayData` with `parseKeyPoints(values.key_points)`.

Document the `!` marker in the field's `help` text, so an author reading the import page learns it without reading the code.

- [ ] **Step 3: Add tests for the import row**

```ts
test('a written question needs at least one key point', () => {
  const result = validateImportRow('essay', { title: 'Right heart failure', subject: 'cvs', prompt: 'Discuss.' })
  assert.ok(result.errors.some((error) => /key point/i.test(error)))
})

test('an imported written question keeps its legible markers', () => {
  const item = importRowToContent('essay', {
    title: 'Right heart failure', subject: 'cvs', prompt: 'Discuss.',
    key_points: '!Cor pulmonale\nRaised JVP',
  }, 'row-1')
  assert.equal(item.kind, 'essay')
  assert.equal(item.essayData?.keyPoints[0].legible, true)
  assert.equal(item.essayData?.keyPoints[0].text, 'Cor pulmonale')
})
```

Read `validateImportRow`'s real return shape first and match it — never bend the function to fit a test.

- [ ] **Step 4: Add the kind to the admin catalogue**

In `ControlDashboard.tsx`: the kind tab, an icon (`PenLine` from `lucide-react` — confirm it exists at runtime), a count, and inclusion in the university/year scope filter.

- [ ] **Step 5: Verify and commit**

`npx tsc -b` clean; `npm test` green and larger.

```bash
git add src/data src/pages/admin
git commit -m "Let a written question be authored like every other piece of content"
```

---

### Task 3: The guide, and the published questions

**Files:**
- Create: `src/data/writtenGuide.ts`
- Create: `src/lib/useLiveEssays.ts`

- [ ] **Step 1: Write the guide as data**

`src/data/writtenGuide.ts` exports `WRITTEN_GUIDE: { title: string; body: string }[]` holding the seven entries from the spec's §1, verbatim. Data rather than markup so the same list cannot drift between surfaces, and so the tab renders it in one loop.

The strings stay plain here and are passed through `t()` at the point of render, matching how the rest of the data layer does it — check `src/data/` for the convention and follow it.

- [ ] **Step 2: Write the hook**

`src/lib/useLiveEssays.ts`, mirroring `src/lib/usePublishedQuestions.ts` exactly: a pure `publishedEssaysFromCatalogue(catalogue)` plus a thin `useLiveEssays()` over `usePersistentState`. Match its seeding call, or a live install will show demo content.

- [ ] **Step 3: Verify and commit**

`npx tsc -b` clean.

```bash
git add src/data/writtenGuide.ts src/lib/useLiveEssays.ts
git commit -m "Say how to approach a written question, and read the published ones"
```

---

### Task 4: Answering, and marking yourself

**Files:**
- Modify: `src/lib/stateOwnership.ts`, `src/lib/stateOwnership.test.ts`
- Modify: `ios/Synapse/Core/Sync/StateOwnership.swift`
- Modify: `src/data/attempts.ts`
- Create: `src/lib/useEssayAnswers.ts`

- [ ] **Step 1: Claim the key, on both sides**

Add `/^synapse\.essay\./` to `USER_OWNED_PATTERNS` in `src/lib/stateOwnership.ts`, and `"^synapse\\.essay\\."` to the Swift port in `ios/Synapse/Core/Sync/StateOwnership.swift`.

**While you are in that file, restore `"^synapse\\.myDocuments\\."` too.** The port has drifted: the web list has it and the Swift one does not. Nothing is losing data today — that key is only used in demo mode and iOS never writes it — but the file says it must stay a direct port, and this is exactly the quiet mismatch its comment warns about.

Add a case to `src/lib/stateOwnership.test.ts` for both keys, matching the file's existing style.

- [ ] **Step 2: Add the surface**

In `src/data/attempts.ts`:

```ts
export type AttemptSurface = 'qbank' | 'case' | 'lab' | 'station' | 'room' | 'essay'
```

Its comment already explains why a student-ticked item is recorded with `correct: null`. Extend it to say that a written answer is marked by the person who wrote it, so it goes the same way.

- [ ] **Step 3: Write the store**

`src/lib/useEssayAnswers.ts` over `usePersistentState` on `synapse.essay.answers.v1`:

```ts
export interface EssayAnswer {
  /** What the student wrote, kept so they can reread it. */
  text: string
  /** Key point ids they ticked, or null when they have not marked it yet. */
  ticked: string[] | null
  updatedAt: string
}

export function useEssayAnswers(): {
  answers: Record<string, EssayAnswer>
  save: (essayId: string, answer: Omit<EssayAnswer, 'updatedAt'>) => void
}
```

- [ ] **Step 4: Verify and commit**

`npx tsc -b` clean; `npm test` green.

```bash
git add src/lib src/data/attempts.ts ios/Synapse/Core/Sync/StateOwnership.swift
git commit -m "Keep a student's written answers where they belong, on both clients"
```

---

### Task 5: The Essay questions tab

**Files:**
- Create: `src/components/essay/EssayRunner.tsx`
- Create: `src/pages/student/EssayQuestions.tsx`
- Modify: `src/router.tsx`, `src/components/shell/nav.ts`

- [ ] **Step 1: Build the runner**

`EssayRunner` takes one `EssayQuestion` and moves through three stages:

1. **Write** — the prompt and a textarea. The helpers must **not be in the DOM**, not merely hidden: a student who can read the model answer by opening devtools, or by tabbing into a collapsed region, has lost the exercise. Render them only once revealed.
2. **Reveal** — enabled once something is written, with an explicit *Skip and show me* for a student who is stuck. Opens the key points, the legible ones marked, the examiner note, and the model answer.
3. **Mark** — a checkbox per key point beside the student's own answer, still on screen. Show `t('{covered} of {total} points covered')` using the existing interpolation convention in this codebase — check how other strings interpolate before inventing one. Never a percentage, never the word score.

On revealing, log the attempt: `surface: 'essay'`, `itemId` the essay id, `correct: null`, `seconds: null`.

- [ ] **Step 2: Build the page**

`EssayQuestions` renders the guide from `WRITTEN_GUIDE` in a collapsible panel whose open state persists via `useLocalPreference`, then the published essays grouped by subject, then the runner for whichever is opened. Follow how `src/pages/student/Practical.tsx` groups and opens its items.

Empty state when nothing is published, in the house voice — see `MedicalTaxonomy.tsx`.

- [ ] **Step 3: Route and navigate**

Add the page to `src/router.tsx` with `lazyNamed`, and a `studentNav` entry under **Study**: `{ label: 'Essay questions', to: '/app/essays', icon: PenLine }`.

- [ ] **Step 4: Verify and commit**

`npx tsc -b` clean; `npm test` green.

In the browser (`preview_start`; **front the tab with `tabs_select` before judging anything visual**, then take a screenshot and look at it — driving only through the DOM has hidden real bugs in this project): the guide opens and collapses, the helpers are absent from the DOM before revealing, and writing then marking shows the count.

```bash
git add src/components/essay src/pages/student/EssayQuestions.tsx src/router.tsx src/components/shell/nav.ts
git commit -m "Practise a written question, and mark yourself against it"
```

---

### Task 6: The Written Setup tab

**Files:**
- Create: `src/pages/admin/WrittenSetup.tsx`
- Create: `src/components/admin/EssayEditorDialog.tsx`
- Modify: `src/pages/admin/ControlDashboard.tsx`, `src/router.tsx`, `src/components/shell/nav.ts`

- [ ] **Step 1: The page**

Copy `src/pages/admin/PracticalSetup.tsx` — the university/year navigator around `ControlDashboard` — with `initialKind="essay"` and `lockedKind`. Copying is the point; a second way to author content would be worse than a repeated file.

- [ ] **Step 2: The editor**

`EssayEditorDialog`, following `ResourceEditorDialog`'s scaffold. Fields: the prompt, the key points (add, delete, reorder, flag as legible), the examiner note, and the model answer. Branch to it in `ControlDashboard.tsx` where the other per-kind editors are chosen.

- [ ] **Step 3: Route and navigate**

Add to `src/router.tsx` and an `adminNav` entry under Content: `{ label: 'Written Setup', to: '/admin/written', icon: PenLine }`.

- [ ] **Step 4: Verify and commit**

`npx tsc -b` clean; `npm test` green.

In the browser, front the tab and check by eye: create a written question, add two key points with one flagged legible, publish it, then open `/app/essays` and confirm it appears and its legible point is marked.

```bash
git add src/pages/admin src/components/admin src/router.tsx src/components/shell/nav.ts
git commit -m "Add written questions from the admin console"
```

---

## Out of scope, deliberately

- **Automatic marking of free prose.** Keyword matching misses a point made in other words and credits a keyword used wrongly, and it cannot know when it is wrong.
- **Slices D, F, G** (flashcards, study parties, the word game), unchanged.
