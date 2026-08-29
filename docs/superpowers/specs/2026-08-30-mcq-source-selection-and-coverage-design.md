# MCQ source selection and source coverage — design

**Date:** 2026-08-30
**Status:** Approved, ready to plan
**Approved approach:** A — a dedicated authored `source` field on the question, plus a one-time backfill (chosen over B, read-time heuristic classification of the admin free-text `reference`).

---

## Summary

A student can choose which **MCQ source** a generated test draws from —
Department MCQs, Department Book, Past Papers, or any combination — and can see,
on the Performance page, how much of each source they have worked through, shown
as two coverage bars per source: questions and concepts.

The signal to power this already exists at authoring/import time (batch
filenames encode `EOM`/`EOY`/`BAQOON`/`written`/`mcq`, MCQ banks live under
`seeds/mcq/`, and each item carries a `source_citation`), but it is deliberately
stripped before it reaches the student. Today the student-facing `Question`
carries no structured source, the admin→student converter drops the admin
`ContentSource`, and `AttemptRecord` records no source. This feature reverses
that policy in a **controlled, bucketed** way: students see a clean three-value
category, never the raw citation.

## Goals

1. A student building a test can filter by MCQ source (multi-select; empty = all).
2. The source filter composes with the existing scope / pool-tab / mode / count
   controls rather than replacing any of them.
3. The Performance page shows per-source coverage as two bars — questions and
   concepts — derived from a single new field, needing no extra concept↔source
   authoring.
4. The feature is demoable before the whole bank is tagged: untagged questions
   fall into an "Unspecified" bucket and everything degrades gracefully.

## Non-goals

- **No new content authoring UI beyond the one field.** The admin gets a source
  selector on the question editor; nothing more.
- **MCQ question bank only.** Written, essay, and practical items are out of
  scope — this matches the request ("mcq source"). Their types are untouched.
- **No exposure of the raw citation.** Students see the three-value bucket, never
  `source_citation` / `author_notes` / `ContentSource.reference`, which remain
  admin-only and student-stripped as they are today.
- **No mastery/accuracy change.** Coverage answers "how much have I gone
  through", a *seen* metric. Accuracy and mastery bands are unchanged and stay in
  the existing `ConceptMastery` panel.

---

## The new field

One student-facing enum, defined once and imported everywhere:

```ts
// src/data/questionSource.ts (new)
export type QuestionSource = 'dept-mcq' | 'dept-book' | 'past-paper'

export const QUESTION_SOURCES: readonly QuestionSource[] =
  ['dept-mcq', 'dept-book', 'past-paper'] as const

export const QUESTION_SOURCE_LABEL: Record<QuestionSource, string> = {
  'dept-mcq': 'Department MCQs',
  'dept-book': 'Department Book',
  'past-paper': 'Past Papers',
}

/** The bucket shown for a question whose source is not yet tagged. */
export const UNSPECIFIED_SOURCE_LABEL = 'Unspecified'
```

Semantics:

- `dept-mcq` — questions from the department question bank (`seeds/mcq/`).
- `dept-book` — questions derived from the department textbook.
- `past-paper` — questions transcribed from EOM / EOY / resit (baqoon) papers.
- **Absent / `undefined`** — not yet tagged; rendered as "Unspecified". This is a
  first-class, expected state during rollout, never an error.

The value is kept **separate from `ContentSource`** (`contentControl.ts:664`),
which is admin provenance explicitly documented as student-invisible. Overloading
it would fight its stated contract and couple a clean three-value student concept
to inconsistent free text. This field is a *classification of the question*, so
it lives with the question's blueprint tags.

---

## Data model changes

### 1. Authoring model (source of truth)

Add an optional `sourceCategory` to the question blueprint tags in
`src/data/contentControl.ts` (the `QuestionTags` interface, near line 256, beside
`mainConceptIds` / `conceptIds`):

```ts
sourceCategory?: QuestionSource
```

Rationale: `QuestionTags` already describes how a question is classified for
students; source is another such classification. The admin question editor gets a
single-select control bound to it (three options + "Unspecified"/clear).

### 2. Student question

Add to `Question` in `src/data/qbank.ts:34`:

```ts
source?: QuestionSource
```

### 3. Attempt record

Add to `AttemptRecord` in `src/data/attempts.ts:19`:

```ts
source?: QuestionSource
```

Recorded so a per-source performance breakdown survives even if a question is
later re-tagged, mirroring how `subjectId` / `difficulty` are already snapshotted
onto each attempt.

### 4. Converter

`managedQuestionToStudentQuestion` in `src/lib/usePublishedQuestions.ts:17`
currently drops source. Copy `questionData.tags.sourceCategory` →
`Question.source` (undefined stays undefined).

### 5. Attempt logging

Wherever an `AttemptRecord` is constructed from a `Question` (attempt-log write
path behind `src/lib/useAttemptLog.ts`), pass `question.source` through to
`AttemptRecord.source`.

---

## Test builder: the Source filter

In `src/pages/student/QuestionBank.tsx`, the `'new'` hub tab setup form (controls
around lines 1584–1690):

- A new **"MCQ Source"** control, rendered like the existing segmented/chip
  controls, listing the three buckets as toggles (multi-select). Selecting more
  than one is the "combination" case; selecting none means *all sources* — the
  current behaviour, so existing users see no change until they opt in.
- Each chip shows a **live count** of currently-available questions for that
  source under the active scope/pool, computed from the same `available` set the
  rest of the form already derives (so the counts honour scope + pool tab).
- If the available set contains untagged questions, an **"Unspecified"** chip
  appears at the end; if none are untagged, it is hidden.
- **The whole control is shown only when the available set spans ≥2 buckets**
  (counting "Unspecified" as a bucket). When every available question falls in a
  single bucket, filtering by it is a no-op, so the control is hidden entirely —
  which is also the pre-backfill state, where everything is "Unspecified".

New session state: `sources: Set<QuestionSource | 'unspecified'>` (empty = all),
persisted with the rest of the session-setup state.

### Selection logic

The existing pipeline (`QuestionBank.tsx`):

1. `sourcePool` — pool tab (all/flagged/incorrect/omitted), lines 1000–1005
2. `available = questionsInScope(sourcePool, scope, libraryTopics)`, 1007–1010
3. `start()` → `requestSession(shuffle(available).slice(0, count), …)`, line 1438

Insert a **source intersection** between steps 2 and 3, as a small pure helper
kept next to the scope filter for symmetry:

```ts
// src/data/qbankScope.ts (beside questionsInScope, ~line 38)
export function questionsInSources(
  questions: readonly Question[],
  sources: ReadonlySet<QuestionSource | 'unspecified'>,
): Question[] {
  if (sources.size === 0) return questions.slice() // empty = all
  return questions.filter((q) =>
    q.source ? sources.has(q.source) : sources.has('unspecified'),
  )
}
```

Then `available` becomes
`questionsInSources(questionsInScope(sourcePool, scope, libraryTopics), sources)`.
Presets (`startPreset`, line 1450) keep today's behaviour: they pass an empty
source set (all sources) unless a preset opts in later.

---

## Performance: "Coverage by source" panel

A new panel component, `src/components/performance/SourceCoverage.tsx`, composed
into `src/pages/student/Performance.tsx` near the existing `ConceptMastery`
panel (line ~659). It mirrors that panel's structure and uses the shared `Meter`
component, so it reads as part of the same page.

One row per source bucket (only buckets with ≥1 available question; "Unspecified"
only if untagged questions exist). Each row shows the source label and **two
`Meter` bars**:

- **Questions:** `answered / available`
  - `available` = distinct published questions of that source within the
    student's curriculum scope (the same published set the student can draw
    from).
  - `answered` = distinct question ids of that source that appear in the attempt
    log (seen at least once).
- **Concepts:** `conceptsSeen / conceptsInSource`
  - `conceptsInSource` = distinct `conceptIds` assessed by all available
    questions of that source.
  - `conceptsSeen` = distinct `conceptIds` assessed by that source's questions
    the student has attempted.

Both metrics are pure derivations of `Question.source` + `Question.conceptIds` +
the attempt log; no concept↔source authoring is introduced. "Seen", not
"correct" — this is a coverage figure, and accuracy already lives in
`ConceptMastery`.

### Derivation home

A pure module `src/data/sourceCoverage.ts` with a function
`sourceCoverage(questions, attempts): SourceCoverageRow[]`, unit-tested in
isolation (empty log, all-unspecified, partial coverage, a source with zero
available questions). The panel is a thin renderer over it. A `bySource`
aggregate is also added to `src/data/attemptStats.ts` (beside `bySubject` line
60 / `byDifficulty` line 74) for any future per-source accuracy view; the panel
itself does not need accuracy.

---

## Backfill and rollout (separate content workstream)

Code ships behind the "Unspecified" bucket, so it is demoable the day it lands,
with every legacy question in that bucket. Populating real values is a content
task owned by the chief-of-staff (content) lane, not a blocker for the code:

1. **Backfill classifier** — a one-off script that reads each published
   question's import provenance (batch path, filename tokens `EOM`/`EOY`/`BAQOON`
   → `past-paper`; `seeds/mcq/` origin → `dept-mcq`; department-book batches →
   `dept-book`; `source_citation` as a tiebreaker) and writes `sourceCategory`
   onto the authoring record. Output is reviewed/spot-checked before it ships,
   because a wrong bucket is worse than "Unspecified".
2. **Going forward** — `scripts/kasr/build-batches.ts` (and the sibling module
   builders) emit `sourceCategory` on each generated question so new content is
   born tagged.

Both are out of scope for the *code* plan below and tracked as content work.

---

## Testing

- `questionSource.ts` — label/enum table sanity (trivial).
- `questionsInSources` — empty set = all; single; multi; untagged routed to
  `'unspecified'`; untagged excluded when `'unspecified'` not selected.
- `sourceCoverage` — empty attempt log (0/N everywhere); partial question and
  concept coverage; a source with zero available questions omitted; all-untagged
  bank yields only an "Unspecified" row; concept dedupe (a question naming a
  concept twice counts once).
- Converter — `sourceCategory` present → `Question.source`; absent → `undefined`.
- Attempt logging — `question.source` reaches `AttemptRecord.source`.
- Builder integration — selecting a source narrows `available`; chip counts match
  the intersection; deselecting all restores the full set.

## Edge cases

- **All untagged (pre-backfill):** the builder hides the source control entirely
  (only one bucket present — see the ≥2-bucket rule above); the panel shows a
  single "Unspecified" row. No crashes, no empty-divide.
- **Zero available in a selected source:** `start()` guards on
  `available.length` already; the source chip shows count 0 and the start button
  disables as it does today for an empty scope.
- **A question re-tagged after being attempted:** the attempt keeps its snapshot
  `source`, so historical per-source stats are stable; the coverage panel (built
  from current `Question.source`) reflects the new tag. This divergence is
  intended and matches how `difficulty`/`subjectId` snapshots already behave.
- **Concept-less questions:** contribute to question coverage, not concept
  coverage (no `conceptIds` to count) — correct, and consistent with how the
  mastery ledger already ignores items with no assessed concept.

---

## File-by-file change list (code plan scope)

| File | Change |
|---|---|
| `src/data/questionSource.ts` | **new** — enum, labels, constants |
| `src/data/contentControl.ts` | `QuestionTags.sourceCategory?: QuestionSource` |
| `src/data/qbank.ts` | `Question.source?: QuestionSource` |
| `src/data/attempts.ts` | `AttemptRecord.source?: QuestionSource` |
| `src/lib/usePublishedQuestions.ts` | converter copies `sourceCategory` → `source` |
| `src/lib/useAttemptLog.ts` (write path) | snapshot `question.source` onto the attempt |
| `src/data/qbankScope.ts` | **new** `questionsInSources` helper + test |
| `src/pages/student/QuestionBank.tsx` | source multi-select control, state, chip counts, fold into `available` |
| `src/data/sourceCoverage.ts` | **new** pure derivation + test |
| `src/data/attemptStats.ts` | `bySource` aggregate |
| `src/components/performance/SourceCoverage.tsx` | **new** panel |
| `src/pages/student/Performance.tsx` | mount the panel |
| admin question editor (blueprint-tags section) | single-select bound to `sourceCategory` |

Backfill script and `build-batches.ts` emission are **content workstream**, not
part of this code plan.
