# MCQ Source Selection and Coverage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a student build a test that draws from chosen MCQ sources (Department MCQs / Department Book / Past Papers, or any combination), and show per-source coverage — questions and concepts seen — on the Performance page.

**Architecture:** One student-facing enum `QuestionSource` becomes an optional field on the authoring tags, the student `Question`, and each `AttemptRecord`. The admin→student converter carries it through. The test builder gains a multi-select source filter that intersects with the existing scope/pool pipeline; the Performance page gains a panel that derives two coverage bars per source purely from the published question set and the attempt log. Untagged questions fall into an "Unspecified" bucket so the feature works before any backfill.

**Tech Stack:** React + TypeScript, Vite, Node's built-in test runner (`node --test --experimental-strip-types`, `node:test` + `node:assert/strict`), Tailwind. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-08-30-mcq-source-selection-and-coverage-design.md`

## Global Constraints

- **This is a git worktree; its `node_modules` is empty.** Pure data-layer tests (`node --test --experimental-strip-types <file>`) run without it. For `tsc`/preview, symlink deps from the main checkout first:
  `ln -s "/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/node_modules" node_modules`
- **Test idiom:** `import test from 'node:test'`, `import assert from 'node:assert/strict'`. Test files are `src/**/*.test.ts`. Run one file with `node --test --experimental-strip-types src/data/<name>.test.ts`. Type imports in `.ts` use explicit `.ts` extensions (match existing files, e.g. `import type { Question } from './qbank.ts'`).
- **Scope:** MCQ QuestionBank only. Do not touch written/essay/practical types or flows.
- **The enum values are exactly** `'dept-mcq' | 'dept-book' | 'past-paper'`; labels exactly `Department MCQs`, `Department Book`, `Past Papers`; the untagged bucket label is exactly `Unspecified`. Copy verbatim.
- **`AcademicSourceCategory` (`src/data/academicSource.ts`) and `ContentSource` (`src/data/contentControl.ts`) are NOT reused** — the student enum is separate by design. Do not import them for this feature.
- **`MasterySource` (`'question' | 'case' | ...` in `mastery.ts`) is a different concept** from `QuestionSource`. The `record({ source: 'question' })` calls in `QuestionBank.tsx` are mastery evidence, unrelated — do not change them.
- **Backfill and `build-batches.ts` emission are out of scope** for this plan (separate content workstream). Ship behind the "Unspecified" bucket.

---

### Task 1: The `QuestionSource` vocabulary module + field additions

**Files:**
- Create: `src/data/questionSource.ts`
- Create: `src/data/questionSource.test.ts`
- Modify: `src/data/qbank.ts` (add `source?` to `Question`, ~line 34-58)
- Modify: `src/data/attempts.ts` (add `source?` to `AttemptRecord`, ~line 19)
- Modify: `src/data/contentControl.ts` (add `sourceCategory?` to `QuestionTags`, ~line 256-296)

**Interfaces:**
- Produces:
  - `type QuestionSource = 'dept-mcq' | 'dept-book' | 'past-paper'`
  - `type SourceBucket = QuestionSource | 'unspecified'`
  - `const QUESTION_SOURCES: readonly QuestionSource[]`
  - `const SOURCE_BUCKET_ORDER: readonly SourceBucket[]`
  - `function bucketOf(source: QuestionSource | undefined): SourceBucket`
  - `function sourceBucketLabel(bucket: SourceBucket): string`
  - `Question.source?: QuestionSource`, `AttemptRecord.source?: QuestionSource`, `QuestionTags.sourceCategory?: QuestionSource`

- [ ] **Step 1: Write the failing test**

Create `src/data/questionSource.test.ts`:

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  QUESTION_SOURCES,
  QUESTION_SOURCE_LABEL,
  SOURCE_BUCKET_ORDER,
  UNSPECIFIED_SOURCE,
  bucketOf,
  sourceBucketLabel,
} from './questionSource.ts'

test('every source has a label', () => {
  for (const source of QUESTION_SOURCES) {
    assert.equal(typeof QUESTION_SOURCE_LABEL[source], 'string')
    assert.ok(QUESTION_SOURCE_LABEL[source].length > 0)
  }
})

test('bucketOf routes undefined to the unspecified bucket', () => {
  assert.equal(bucketOf(undefined), UNSPECIFIED_SOURCE)
  assert.equal(bucketOf('dept-mcq'), 'dept-mcq')
})

test('unspecified sorts last and is labelled Unspecified', () => {
  assert.equal(SOURCE_BUCKET_ORDER[SOURCE_BUCKET_ORDER.length - 1], UNSPECIFIED_SOURCE)
  assert.equal(sourceBucketLabel(UNSPECIFIED_SOURCE), 'Unspecified')
  assert.equal(sourceBucketLabel('past-paper'), 'Past Papers')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types src/data/questionSource.test.ts`
Expected: FAIL — cannot find module `./questionSource.ts`.

- [ ] **Step 3: Write the module**

Create `src/data/questionSource.ts`:

```ts
/**
 * The MCQ source a student can filter a test by — deliberately a small, clean
 * three-value vocabulary shown to students, distinct from the admin free-text
 * provenance (`ContentSource`) and the academic-intake evidence taxonomy
 * (`AcademicSourceCategory`), neither of which is student-facing.
 */
export type QuestionSource = 'dept-mcq' | 'dept-book' | 'past-paper'

export const QUESTION_SOURCES: readonly QuestionSource[] = ['dept-mcq', 'dept-book', 'past-paper'] as const

export const QUESTION_SOURCE_LABEL: Record<QuestionSource, string> = {
  'dept-mcq': 'Department MCQs',
  'dept-book': 'Department Book',
  'past-paper': 'Past Papers',
}

/** The bucket a question falls in once untagged questions are given a home. */
export const UNSPECIFIED_SOURCE = 'unspecified' as const
export type SourceBucket = QuestionSource | typeof UNSPECIFIED_SOURCE

export const UNSPECIFIED_SOURCE_LABEL = 'Unspecified'

/** Display order: the three real sources, then untagged last. */
export const SOURCE_BUCKET_ORDER: readonly SourceBucket[] = [...QUESTION_SOURCES, UNSPECIFIED_SOURCE]

/** An absent source is a first-class, expected state during rollout, not an error. */
export function bucketOf(source: QuestionSource | undefined): SourceBucket {
  return source ?? UNSPECIFIED_SOURCE
}

export function sourceBucketLabel(bucket: SourceBucket): string {
  return bucket === UNSPECIFIED_SOURCE ? UNSPECIFIED_SOURCE_LABEL : QUESTION_SOURCE_LABEL[bucket]
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types src/data/questionSource.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Add the field to `Question`**

In `src/data/qbank.ts`, at the top add the type import (next to the existing `MediaPlacement` import):

```ts
import type { QuestionSource } from './questionSource.ts'
```

In `interface Question`, immediately after the `conceptIds?: string[]` field, add:

```ts
  /** Which MCQ source this question came from. Absent until tagged/backfilled. */
  source?: QuestionSource
```

- [ ] **Step 6: Add the field to `AttemptRecord`**

In `src/data/attempts.ts`, at the top add:

```ts
import type { QuestionSource } from './questionSource.ts'
```

In `interface AttemptRecord`, after the `subtopic?: string` field, add:

```ts
  /**
   * The question's MCQ source, snapshotted at attempt time so per-source stats
   * stay stable even if the question is later re-tagged — the same reason
   * `subjectId` and `difficulty` are snapshotted here rather than looked up.
   */
  source?: QuestionSource
```

- [ ] **Step 7: Add the field to `QuestionTags`**

In `src/data/contentControl.ts`, add the import near the other type imports at the top of the file:

```ts
import type { QuestionSource } from './questionSource.ts'
```

In `interface QuestionTags`, after `questionOnlyFor?: string[]`, add:

```ts
  /** The student-facing MCQ source bucket. The single source of truth, copied to `Question.source`. */
  sourceCategory?: QuestionSource
```

- [ ] **Step 8: Typecheck**

Run (from the worktree root, after the node_modules symlink from Global Constraints):
`node_modules/.bin/tsc -b --noEmit`
Expected: no new errors introduced by these files. (If the project's `tsc -b` reports pre-existing unrelated errors, confirm none reference `questionSource`, `qbank.ts`, `attempts.ts`, or `contentControl.ts` source additions.)

- [ ] **Step 9: Commit**

```bash
git add src/data/questionSource.ts src/data/questionSource.test.ts src/data/qbank.ts src/data/attempts.ts src/data/contentControl.ts
git commit -m "feat(qbank): add QuestionSource vocabulary and optional source fields"
```

---

### Task 2: Carry `source` through the admin→student converter

**Files:**
- Modify: `src/lib/usePublishedQuestions.ts` (`managedQuestionToStudentQuestion`, ~line 30-54)
- Create: `src/lib/usePublishedQuestions.test.ts`

**Interfaces:**
- Consumes: `Question.source` (Task 1), `QuestionTags.sourceCategory` (Task 1).
- Produces: converter output now sets `source: item.questionData.tags.sourceCategory`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/usePublishedQuestions.test.ts`. The fixture is cast via `as unknown as ManagedContentItem` so only the fields the converter reads need to be present; it is shaped to pass the converter's guards (Published status, ≥2 answers, a correct answer matching `correctAnswer`, no blocking media requests):

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { managedQuestionToStudentQuestion } from './usePublishedQuestions.ts'
import type { ManagedContentItem } from '@/data/contentControl'
import type { QuestionSource } from '@/data/questionSource'

function publishedQuestion(sourceCategory?: QuestionSource): ManagedContentItem {
  return {
    id: 'Q1',
    kind: 'question',
    status: 'Published',
    subjectId: 'cardio',
    title: 'Stem text',
    fields: {},
    questionData: {
      answers: [
        { label: 'A', text: 'right', explanation: 'because' },
        { label: 'B', text: 'wrong', explanation: 'no' },
      ],
      correctAnswer: 'A',
      attachedImage: '',
      attachments: [],
      libraryIds: [],
      resourceIds: [],
      learningObjective: '',
      tags: {
        topic: 'Rhythm',
        conceptIds: ['c1'],
        mainConceptIds: [],
        sourceCategory,
      },
    },
  } as unknown as ManagedContentItem
}

test('the converter copies sourceCategory onto the student question', () => {
  const q = managedQuestionToStudentQuestion(publishedQuestion('dept-mcq'), [publishedQuestion('dept-mcq')])
  assert.ok(q)
  assert.equal(q?.source, 'dept-mcq')
})

test('an untagged question yields an undefined source', () => {
  const q = managedQuestionToStudentQuestion(publishedQuestion(undefined), [publishedQuestion(undefined)])
  assert.ok(q)
  assert.equal(q?.source, undefined)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types src/lib/usePublishedQuestions.test.ts`
Expected: FAIL — first test asserts `q.source === 'dept-mcq'` but the converter does not set `source` yet (undefined).

Note: `@/` path aliases resolve under `node --test` via the tsconfig paths only if Node is configured for it. If the alias fails to resolve at runtime, change the two `@/data/...` imports in this test to relative paths (`../data/contentControl.ts`, `../data/questionSource.ts`) — the existing data tests use relative imports for the same reason.

- [ ] **Step 3: Add the source copy**

In `src/lib/usePublishedQuestions.ts`, inside the object returned by `managedQuestionToStudentQuestion`, after the `conceptIds: [...]` line, add:

```ts
    source: data.tags.sourceCategory,
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types src/lib/usePublishedQuestions.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/usePublishedQuestions.ts src/lib/usePublishedQuestions.test.ts
git commit -m "feat(qbank): carry question source through the published-question converter"
```

---

### Task 3: `questionsInSources` selection helper

**Files:**
- Modify: `src/data/qbankScope.ts` (add `questionsInSources`, next to `questionsInScope` ~line 38)
- Modify: `src/data/qbankScope.test.ts` (append tests)

**Interfaces:**
- Consumes: `Question.source` (Task 1), `SourceBucket`/`bucketOf` (Task 1).
- Produces: `function questionsInSources(questions: readonly Question[], sources: ReadonlySet<SourceBucket>): Question[]`

- [ ] **Step 1: Write the failing test**

Append to `src/data/qbankScope.test.ts`. Add `questionsInSources` to the file's existing `from './qbankScope.ts'` import line (don't add a second import from that module), then add the type import and tests below. It reuses the file's existing local `question(id, subjectId, topic)` helper, setting `.source` on the returned object:

```ts
import type { QuestionSource, SourceBucket } from './questionSource.ts'

function sourced(id: string, source?: QuestionSource): Question {
  return { ...question(id, 'cardio', 'Topic'), source }
}

test('questionsInSources: empty set means all questions', () => {
  const qs = [sourced('a', 'dept-mcq'), sourced('b', 'past-paper'), sourced('c', undefined)]
  assert.equal(questionsInSources(qs, new Set()).length, 3)
})

test('questionsInSources: filters to the selected buckets', () => {
  const qs = [sourced('a', 'dept-mcq'), sourced('b', 'past-paper'), sourced('c', undefined)]
  const sel: Set<SourceBucket> = new Set(['dept-mcq'])
  assert.deepEqual(questionsInSources(qs, sel).map((q) => q.id), ['a'])
})

test('questionsInSources: untagged questions match only when unspecified is selected', () => {
  const qs = [sourced('a', 'dept-mcq'), sourced('c', undefined)]
  assert.deepEqual(questionsInSources(qs, new Set(['unspecified'])).map((q) => q.id), ['c'])
  assert.deepEqual(questionsInSources(qs, new Set(['dept-mcq'])).map((q) => q.id), ['a'])
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types src/data/qbankScope.test.ts`
Expected: FAIL — `questionsInSources` is not exported.

- [ ] **Step 3: Implement the helper**

In `src/data/qbankScope.ts`, add the import at the top:

```ts
import { bucketOf, type SourceBucket } from './questionSource.ts'
```

And add the function beside `questionsInScope`:

```ts
/**
 * Narrow a question set to the chosen MCQ source buckets. An empty selection
 * means "all sources" — the pre-feature behaviour — so an untouched builder is
 * unchanged. Untagged questions match only when the `'unspecified'` bucket is
 * explicitly selected.
 */
export function questionsInSources(
  questions: readonly Question[],
  sources: ReadonlySet<SourceBucket>,
): Question[] {
  if (sources.size === 0) return questions.slice()
  return questions.filter((q) => sources.has(bucketOf(q.source)))
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types src/data/qbankScope.test.ts`
Expected: PASS (existing tests + 3 new).

- [ ] **Step 5: Commit**

```bash
git add src/data/qbankScope.ts src/data/qbankScope.test.ts
git commit -m "feat(qbank): add questionsInSources selection helper"
```

---

### Task 4: `sourceCoverage` module (builder options + performance rows)

**Files:**
- Create: `src/data/sourceCoverage.ts`
- Create: `src/data/sourceCoverage.test.ts`

**Interfaces:**
- Consumes: `Question` (`.source`, `.conceptIds`), `SourceBucket`/`bucketOf`/`sourceBucketLabel`/`SOURCE_BUCKET_ORDER` (Task 1).
- Produces:
  - `interface SourceOption { bucket: SourceBucket; label: string; count: number }`
  - `function sourceOptions(questions: readonly Question[]): SourceOption[]`
  - `interface SourceCoverageRow { bucket; label; questionsAvailable; questionsAnswered; conceptsAvailable; conceptsSeen }`
  - `function sourceCoverage(questions: readonly Question[], answeredItemIds: ReadonlySet<string>): SourceCoverageRow[]`

- [ ] **Step 1: Write the failing test**

Create `src/data/sourceCoverage.test.ts`:

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { sourceOptions, sourceCoverage } from './sourceCoverage.ts'
import type { Question } from './qbank.ts'
import type { QuestionSource } from './questionSource.ts'

function q(id: string, source: QuestionSource | undefined, conceptIds: string[]): Question {
  return {
    id, subjectId: 'cardio', topic: 'T', difficulty: 'Moderate', vignette: '', stem: id,
    options: [], explanation: '', libraryRefs: [], resourceRefs: [],
    conceptIds, source,
  } as unknown as Question
}

test('sourceOptions counts by bucket, real sources first then unspecified', () => {
  const qs = [q('a', 'dept-mcq', []), q('b', 'dept-mcq', []), q('c', undefined, [])]
  const opts = sourceOptions(qs)
  assert.deepEqual(opts.map((o) => [o.bucket, o.count]), [['dept-mcq', 2], ['unspecified', 1]])
  assert.equal(opts[0].label, 'Department MCQs')
})

test('sourceOptions omits buckets with no questions', () => {
  const opts = sourceOptions([q('a', 'past-paper', [])])
  assert.deepEqual(opts.map((o) => o.bucket), ['past-paper'])
})

test('sourceCoverage: questions and concepts, answered vs available', () => {
  const qs = [
    q('a', 'dept-mcq', ['c1', 'c2']),
    q('b', 'dept-mcq', ['c2', 'c3']),
    q('c', 'past-paper', ['c4']),
  ]
  const answered = new Set(['a'])
  const rows = sourceCoverage(qs, answered)
  const mcq = rows.find((r) => r.bucket === 'dept-mcq')!
  assert.equal(mcq.questionsAvailable, 2)
  assert.equal(mcq.questionsAnswered, 1)
  assert.equal(mcq.conceptsAvailable, 3) // c1,c2,c3
  assert.equal(mcq.conceptsSeen, 2)      // c1,c2 from answered 'a'
  const paper = rows.find((r) => r.bucket === 'past-paper')!
  assert.equal(paper.questionsAnswered, 0)
  assert.equal(paper.conceptsSeen, 0)
})

test('sourceCoverage: empty log yields zero answered everywhere, rows still present', () => {
  const rows = sourceCoverage([q('a', 'dept-mcq', ['c1'])], new Set())
  assert.equal(rows.length, 1)
  assert.equal(rows[0].questionsAnswered, 0)
  assert.equal(rows[0].conceptsSeen, 0)
})

test('sourceCoverage: a concept named on two answered questions counts once', () => {
  const qs = [q('a', 'dept-mcq', ['c1']), q('b', 'dept-mcq', ['c1'])]
  const rows = sourceCoverage(qs, new Set(['a', 'b']))
  assert.equal(rows[0].conceptsAvailable, 1)
  assert.equal(rows[0].conceptsSeen, 1)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types src/data/sourceCoverage.test.ts`
Expected: FAIL — cannot find module `./sourceCoverage.ts`.

- [ ] **Step 3: Implement the module**

Create `src/data/sourceCoverage.ts`:

```ts
import type { Question } from './qbank.ts'
import { SOURCE_BUCKET_ORDER, bucketOf, sourceBucketLabel, type SourceBucket } from './questionSource.ts'

export interface SourceOption {
  bucket: SourceBucket
  label: string
  /** How many questions of this bucket are in the given set. */
  count: number
}

/**
 * The source buckets present in a question set, in display order, each with its
 * count — powers the builder's source chips. Buckets with no questions are
 * omitted, so the caller can hide the control when fewer than two remain.
 */
export function sourceOptions(questions: readonly Question[]): SourceOption[] {
  const counts = new Map<SourceBucket, number>()
  for (const q of questions) {
    const b = bucketOf(q.source)
    counts.set(b, (counts.get(b) ?? 0) + 1)
  }
  return SOURCE_BUCKET_ORDER
    .filter((b) => counts.has(b))
    .map((b) => ({ bucket: b, label: sourceBucketLabel(b), count: counts.get(b) ?? 0 }))
}

export interface SourceCoverageRow {
  bucket: SourceBucket
  label: string
  questionsAvailable: number
  questionsAnswered: number
  conceptsAvailable: number
  conceptsSeen: number
}

/**
 * Per-source coverage, derived purely from the available question set and the
 * ids the student has answered. "Seen", not "correct": this is a coverage
 * figure — accuracy lives in the mastery ledger. Computed from the questions'
 * current source tag rather than the attempt snapshot, so a re-tagged question
 * moves buckets and legacy attempts (which predate `AttemptRecord.source`)
 * still count.
 */
export function sourceCoverage(
  questions: readonly Question[],
  answeredItemIds: ReadonlySet<string>,
): SourceCoverageRow[] {
  const acc = new Map<SourceBucket, {
    qAvail: number
    qAns: number
    conceptsAvail: Set<string>
    conceptsSeen: Set<string>
  }>()
  for (const q of questions) {
    const bucket = bucketOf(q.source)
    let e = acc.get(bucket)
    if (!e) {
      e = { qAvail: 0, qAns: 0, conceptsAvail: new Set(), conceptsSeen: new Set() }
      acc.set(bucket, e)
    }
    e.qAvail += 1
    const answered = answeredItemIds.has(q.id)
    if (answered) e.qAns += 1
    for (const c of q.conceptIds ?? []) {
      e.conceptsAvail.add(c)
      if (answered) e.conceptsSeen.add(c)
    }
  }
  return SOURCE_BUCKET_ORDER
    .filter((bucket) => acc.has(bucket))
    .map((bucket) => {
      const e = acc.get(bucket)!
      return {
        bucket,
        label: sourceBucketLabel(bucket),
        questionsAvailable: e.qAvail,
        questionsAnswered: e.qAns,
        conceptsAvailable: e.conceptsAvail.size,
        conceptsSeen: e.conceptsSeen.size,
      }
    })
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types src/data/sourceCoverage.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/data/sourceCoverage.ts src/data/sourceCoverage.test.ts
git commit -m "feat(qbank): add sourceOptions and sourceCoverage derivations"
```

---

### Task 5: `bySource` aggregate in attemptStats

**Files:**
- Modify: `src/data/attemptStats.ts` (add `bySource`, near `byDifficulty` ~line 74)
- Modify: `src/data/attemptStats.test.ts` (append a test; if the file does not exist, create it with the header below)

**Interfaces:**
- Consumes: `AttemptRecord.source` (Task 1); the file's existing `group` helper and exported `Breakdown<K>` type.
- Produces: `function bySource(records: AttemptRecord[]): Breakdown<SourceBucket>[]` — the SAME shape as the sibling `byDifficulty`/`bySubject`. `Breakdown<K>` is `{ key: K; attempts; marked; correct; accuracy }`, so the grouped key lives on `.key`, not `.source`.

Note: This aggregate is for a future per-source accuracy view; the coverage panel (Task 7) does not depend on it. It exists because the spec calls for it and it is one line on the existing `group` helper. `SourceBucket` is a union of string literals, so it satisfies `Breakdown<K extends string>`.

- [ ] **Step 1: Write the failing test**

`src/data/attemptStats.test.ts` already exists, with a `attempt(patch: Partial<AttemptRecord>)` factory and a destructured import from `./attemptStats.ts`. Add `bySource` to that existing import list (do not add a second import line), then append this test:

```ts
test('bySource groups attempts by source bucket, keyed on .key', () => {
  const rows = bySource([
    attempt({ itemId: 'a', source: 'dept-mcq', correct: true }),
    attempt({ itemId: 'b', source: 'dept-mcq', correct: false }),
    attempt({ itemId: 'c', source: 'past-paper', correct: true }),
    attempt({ itemId: 'd', source: undefined, correct: true }),
  ])
  const mcq = rows.find((r) => r.key === 'dept-mcq')!
  assert.equal(mcq.attempts, 2)
  assert.equal(mcq.correct, 1)
  assert.ok(rows.find((r) => r.key === 'unspecified'))
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types src/data/attemptStats.test.ts`
Expected: FAIL — `bySource` is not exported.

- [ ] **Step 3: Implement `bySource`**

In `src/data/attemptStats.ts`, add the import at the top:

```ts
import { bucketOf, type SourceBucket } from './questionSource.ts'
```

Add, immediately beside `byDifficulty`, matching that function's one-line style over the shared `group` helper:

```ts
/**
 * Attempts grouped by MCQ source bucket — same shape as `byDifficulty`. Marked
 * vs unmarked answers are handled by `group`, exactly as every sibling
 * breakdown. For a future per-source accuracy view; the coverage panel does not
 * use this.
 */
export function bySource(records: AttemptRecord[]): Breakdown<SourceBucket>[] {
  return group(records, (record) => bucketOf(record.source))
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types src/data/attemptStats.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/attemptStats.ts src/data/attemptStats.test.ts
git commit -m "feat(stats): add bySource attempt aggregate"
```

---

### Task 6: Source filter in the test builder + attempt snapshotting

**Files:**
- Modify: `src/pages/student/QuestionBank.tsx` (state ~719; selection pipeline ~1007-1010; setup form render ~1585; two `AttemptRecord` construction sites ~1723 and ~1833)

**Interfaces:**
- Consumes: `questionsInSources` (Task 3), `sourceOptions` (Task 4), `SourceBucket` (Task 1), `FilterChip` (`src/components/ui/FilterChip.tsx`), `Question.source` (Task 1).
- Produces: no exports; behaviour change only. Verified by typecheck + preview.

- [ ] **Step 1: Add imports**

At the top of `src/pages/student/QuestionBank.tsx`, add:

```ts
import { FilterChip } from '@/components/ui/FilterChip'
import { questionsInSources } from '@/data/qbankScope'
import { sourceOptions } from '@/data/sourceCoverage'
import type { SourceBucket } from '@/data/questionSource'
```

(`questionsInScope` is already imported from `@/data/qbankScope`; add `questionsInSources` to that existing import line rather than duplicating the module import.)

- [ ] **Step 2: Add selection state**

Next to the existing `const [source, setSource] = useState<Source>('all')` (~line 719), add:

```ts
  const [sourceSel, setSourceSel] = useState<Set<SourceBucket>>(() => new Set())
```

- [ ] **Step 3: Split the scope filter and apply the source filter**

Replace the existing `available` memo (~line 1007-1010):

```ts
  const available = useMemo(
    () => questionsInScope(sourcePool, scope, libraryTopics),
    [sourcePool, libraryTopics, scope],
  )
```

with:

```ts
  const scoped = useMemo(
    () => questionsInScope(sourcePool, scope, libraryTopics),
    [sourcePool, libraryTopics, scope],
  )
  const sourceOpts = useMemo(() => sourceOptions(scoped), [scoped])
  const showSourceFilter = sourceOpts.length >= 2
  // Drop any selected bucket no longer present under the current scope/pool, so a
  // stale selection can't silently empty the pool.
  const effectiveSources = useMemo(() => {
    const present = new Set(sourceOpts.map((o) => o.bucket))
    return new Set([...sourceSel].filter((b) => present.has(b)))
  }, [sourceSel, sourceOpts])
  const available = useMemo(
    () => (showSourceFilter ? questionsInSources(scoped, effectiveSources) : scoped),
    [scoped, effectiveSources, showSourceFilter],
  )
```

(Any other reference to `available` downstream is unchanged — it is still the final pool.)

- [ ] **Step 4: Render the source control**

In the setup form, immediately after the closing `</div>` of the "Draw from" block (the block that ends with the `source === 'all' ? … : …` helper paragraph, ~line 1601) and before the "Choose a topic or subtopic" block, insert:

```tsx
              {showSourceFilter && (
                <div>
                  <p className="mb-2 text-[12.5px] font-medium text-ink-2">{t('MCQ source')}</p>
                  <div className="flex flex-wrap gap-2">
                    {sourceOpts.map((opt) => (
                      <FilterChip
                        key={opt.bucket}
                        active={effectiveSources.has(opt.bucket)}
                        onClick={() => setSourceSel((cur) => {
                          const next = new Set(cur)
                          if (next.has(opt.bucket)) next.delete(opt.bucket)
                          else next.add(opt.bucket)
                          return next
                        })}
                      >
                        {t(opt.label)} <span className="tnum ml-1 font-mono text-ink-3">{opt.count}</span>
                      </FilterChip>
                    ))}
                  </div>
                  <p className="mt-2 text-[11.5px] text-ink-3">
                    {effectiveSources.size === 0
                      ? t('All sources. Pick one or more to narrow the test.')
                      : t('Only the selected sources are drawn from.')}
                  </p>
                </div>
              )}
```

- [ ] **Step 5: Snapshot `source` onto the end-of-session records**

At the record-object built in the report path (~line 1723, the object with `id: \`${sessionId}:qbank:${question.id}\``), add after the `...(question.libraryRefs[0]?.title ? { subtopic: … } : {})` line:

```ts
              ...(question.source ? { source: question.source } : {}),
```

- [ ] **Step 6: Snapshot `source` onto the shared `attemptFor` builder**

In `attemptFor` (~line 1824), in the returned object, after the `...(question.libraryRefs[0]?.title ? { subtopic: … } : {})` line, add:

```ts
      ...(question.source ? { source: question.source } : {}),
```

(Do NOT touch the `record({ conceptIds, source: 'question', correct })` line just above the return — that `source` is `MasterySource`, a different type.)

- [ ] **Step 7: Typecheck**

Run: `node_modules/.bin/tsc -b --noEmit`
Expected: no new errors.

- [ ] **Step 8: Verify in the preview**

Start the dev server via the Browser pane (preview_start with the project's dev config, or create `.claude/launch.json` for `npm run dev` if absent). Navigate to the Question Bank → New session. Confirm:
- With a bank that spans ≥2 source buckets, an "MCQ source" chip row appears with per-bucket counts.
- Selecting one chip drops the "available questions" total to that bucket's count; selecting a second widens it; deselecting all restores the full total.
- With a single-bucket (or all-untagged) bank, the control is absent.
Capture a screenshot of the builder with the chips for the handoff.

- [ ] **Step 9: Commit**

```bash
git add src/pages/student/QuestionBank.tsx
git commit -m "feat(qbank): source filter in the test builder + source on attempt records"
```

---

### Task 7: "Coverage by source" panel on the Performance page

**Files:**
- Create: `src/components/performance/SourceCoverage.tsx`
- Modify: `src/pages/student/Performance.tsx` (mount after `<ConceptMasteryPanel />` in both the early "not enough answers" branch ~line 659 and the main branch ~line 720)

**Interfaces:**
- Consumes: `sourceCoverage` (Task 4), `usePublishedQuestions` (`src/lib/usePublishedQuestions`), `AttemptRecord` (Task 1), `Meter`, `Panel`/`PanelHeader`.
- Produces: `function SourceCoveragePanel({ records }: { records: AttemptRecord[] }): JSX.Element`

- [ ] **Step 1: Create the panel**

Create `src/components/performance/SourceCoverage.tsx`. It mirrors `ConceptMastery.tsx` in structure (plain English strings, `Panel`/`PanelHeader`/`Meter`), and renders two bars per source:

```tsx
import { Layers } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Meter } from '@/components/ui/Meter'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import { sourceCoverage } from '@/data/sourceCoverage'
import type { AttemptRecord } from '@/data/attempts'

function tone(pct: number): 'danger' | 'warning' | 'success' {
  return pct < 34 ? 'danger' : pct < 67 ? 'warning' : 'success'
}

/**
 * How much of each MCQ source the student has worked through — questions seen
 * and concepts seen, per source. A coverage view, not an accuracy one: a bar
 * fills as a question is answered at all, right or wrong. Denominators are the
 * published questions the student can draw from, so the figure is honest about
 * what is left. Hidden entirely until some source-tagged questions exist.
 */
export function SourceCoveragePanel({ records }: { records: AttemptRecord[] }) {
  const questions = usePublishedQuestions()
  const answered = new Set(records.map((r) => r.itemId))
  const rows = sourceCoverage(questions, answered)

  if (rows.length === 0) return <></>

  return (
    <Panel>
      <PanelHeader
        title="Coverage by source"
        icon={Layers}
        hint="Questions and concepts you have seen, by source"
      />
      <div className="space-y-5 p-5">
        {rows.map((row) => {
          const qPct = row.questionsAvailable ? Math.round((row.questionsAnswered / row.questionsAvailable) * 100) : 0
          const cPct = row.conceptsAvailable ? Math.round((row.conceptsSeen / row.conceptsAvailable) * 100) : 0
          return (
            <div key={row.bucket}>
              <p className="mb-1.5 text-[13.5px] font-medium text-ink">{row.label}</p>
              <div className="space-y-2">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11.5px] text-ink-3">Questions</span>
                    <span className="font-mono text-[12px] text-ink-2">{row.questionsAnswered}/{row.questionsAvailable}</span>
                  </div>
                  <Meter value={qPct} tone={tone(qPct)} className="mt-1" />
                </div>
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11.5px] text-ink-3">Concepts</span>
                    <span className="font-mono text-[12px] text-ink-2">{row.conceptsSeen}/{row.conceptsAvailable}</span>
                  </div>
                  <Meter value={cPct} tone={tone(cPct)} className="mt-1" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
```

- [ ] **Step 2: Mount it on the Performance page**

In `src/pages/student/Performance.tsx`, add the import near the other performance-panel imports:

```ts
import { SourceCoveragePanel } from '@/components/performance/SourceCoverage'
```

In the early "not enough answers" branch, immediately after `<ConceptMasteryPanel />` (~line 659), add:

```tsx
          <SourceCoveragePanel records={records} />
```

In the main branch, immediately after `<ConceptMasteryPanel />` (~line 720), add the same line:

```tsx
        <SourceCoveragePanel records={records} />
```

- [ ] **Step 3: Typecheck**

Run: `node_modules/.bin/tsc -b --noEmit`
Expected: no new errors.

- [ ] **Step 4: Verify in the preview**

In the running preview, answer a handful of questions across at least two sources (use the builder from Task 6), then open Performance. Confirm the "Coverage by source" panel shows one row per source with two bars each, denominators matching the bank, and the answered counts rising as you answer more. Confirm the panel is absent when the bank has no source-tagged questions. Screenshot for the handoff.

- [ ] **Step 5: Commit**

```bash
git add src/components/performance/SourceCoverage.tsx src/pages/student/Performance.tsx
git commit -m "feat(performance): coverage-by-source panel (questions + concepts)"
```

---

### Task 8: Admin source selector on the question editor

**Files:**
- Modify: `src/components/admin/QuestionEditorDialog.tsx` (the blueprint-tags grid, beside the "Question type" `Field` ~line 404)

**Interfaces:**
- Consumes: `QUESTION_SOURCES`, `QUESTION_SOURCE_LABEL`, `QuestionSource` (Task 1); the editor's existing `data.tags` / `updateData` state (already in this file), and its `Field` / `Select` components (already imported).
- Produces: writes `tags.sourceCategory` on the edited item — the source of truth Task 2 reads.

- [ ] **Step 1: Add the import**

At the top of `src/components/admin/QuestionEditorDialog.tsx`, add:

```ts
import { QUESTION_SOURCES, QUESTION_SOURCE_LABEL, type QuestionSource } from '@/data/questionSource'
```

- [ ] **Step 2: Add the source `Field` to the tags grid**

The editor renders each tag as `<Field label=… htmlFor=…><Select … value={data.tags.X} onChange={(event) => updateData((current) => ({ ...current, tags: { ...current.tags, X: … } }))} />…</Field>`. Immediately after the "Question type" `Field` (the one with `htmlFor="tag-qtype"`, ~line 404), add a sibling in the same grid, following that exact pattern:

```tsx
<Field label="MCQ source" htmlFor="tag-source" hint="The source bucket students filter tests by.">
  <Select
    id="tag-source"
    value={data.tags.sourceCategory ?? ''}
    onChange={(event) => updateData((current) => ({
      ...current,
      tags: { ...current.tags, sourceCategory: (event.target.value || undefined) as QuestionSource | undefined },
    }))}
  >
    <option value="">Unspecified</option>
    {QUESTION_SOURCES.map((s) => <option key={s} value={s}>{QUESTION_SOURCE_LABEL[s]}</option>)}
  </Select>
</Field>
```

Selecting "Unspecified" writes `undefined` (clears the field). No change to the `onSubmit` handler is needed — it already spreads `questionData: finalData`, which now carries `tags.sourceCategory`.

- [ ] **Step 3: Typecheck**

Run: `node_modules/.bin/tsc -b --noEmit`
Expected: no new errors.

- [ ] **Step 4: Verify in the preview**

Open the admin question editor for a question, set MCQ source to "Department MCQs", save. Confirm the value persists on reload (the field round-trips through the authoring store). If a published question can be re-fetched as a student, confirm it now carries `source: 'dept-mcq'`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(admin): MCQ source selector on the question editor"
```

---

## Full test-suite gate

- [ ] Run the whole data suite once at the end:

Run: `node --test --experimental-strip-types "src/**/*.test.ts"`
Expected: all pass (glob may need quoting; if the shell does not expand it, run `npm test`).

- [ ] Final typecheck: `node_modules/.bin/tsc -b --noEmit` — clean.

---

## Notes for the executor

- **This is the code slice only.** Populating real `sourceCategory` values on the existing bank (the backfill classifier) and teaching `scripts/kasr/build-batches.ts` to emit it are a separate content workstream. Until then every legacy question is "Unspecified"; the builder control stays hidden and the coverage panel shows a single Unspecified row — both correct.
- **i18n:** the builder strings are wrapped in `t(...)` to match `QuestionBank.tsx`; the Performance panel uses plain English to match its sibling `ConceptMastery.tsx`. This asymmetry is intentional (each matches its neighbour).
- **Do not** reuse `AcademicSourceCategory` or `ContentSource` — the student enum is deliberately separate (see Global Constraints).
