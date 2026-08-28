# Toolchain merge: the module parameter onto main's generator

Merged against **`origin/main` = `eb815ad970c55c07763047de5c5bd899fd2a2b08`**
("Let a Paper seed hold a matching question, and settle a key by word order"),
fetched at the moment the base was taken. If main has moved since, that line is
what says which main this was merged against.

Files changed: `scripts/kasr/seeds/types.ts`, `scripts/kasr/emit.ts`,
`scripts/kasr/build-batches.ts`, and — see "Scope I had to widen" — the 102
loader `scripts/kasr/seeds/from-json.ts` and main's
`src/data/kasrConceptId.test.ts`.

---

## The first thing to know: this was not a divergence

The brief describes two diverged versions. They are not diverged.

```
$ git merge-base --is-ancestor HEAD origin/main && echo YES
YES
$ git rev-parse HEAD
7092c3b80deed81d21f5c4037a1bbbf970406dcd
$ git log --oneline origin/main..HEAD
(empty)
```

`HEAD` is an **ancestor** of `origin/main`. Everything committed on this branch
is already upstream; what is being merged is a set of *uncommitted working-tree
edits* sitting on top of a checkout that is 20-odd commits behind. Main is the
base not merely because it has more content but because it strictly contains
this branch.

That matters for one practical reason, below.

## The worktree cannot run the merged generator

Main's registry imports seven hand-written 101 papers. **Six of those seed files
do not exist in this worktree**, because this worktree is checked out at an
older commit:

| in `origin/main` | in this worktree |
|---|---|
| `seeds/101-eoy-2025.ts` | present (but with different canonical keys — see below) |
| `seeds/101-eoy-2024.ts` | **missing** |
| `seeds/101-eoy-2022.ts` | **missing** |
| `seeds/101-eoy-2022-second.ts` | **missing** |
| `seeds/101-baqoon-2024.ts` | **missing** |
| `seeds/101-baqoon-2023.ts` | **missing** |
| `seeds/101-eoy-2025-cases.ts` | **missing** |
| `seeds/sittings.ts`, `seeds/mcq.ts`, `seeds/mcq/*` (14 files) | **missing** |

So in the worktree as it stands:

```
$ node --experimental-strip-types scripts/kasr/build-batches.ts "101 ISK"
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '…/scripts/kasr/seeds/101-eoy-2024.ts'
```

This is expected and is not a defect in the merge — those files arrive the
moment main is merged in, which is a fast-forward. I did **not** materialise
them into the worktree: writing 20 files from `origin/main` by hand is a merge
performed with `cat-file`, and the brief forbids exactly that.

Instead every generator verification was run in a throwaway tree built with
`git archive eb815ad`, plus this branch's untracked 102 artefacts
(`extract/102-INT/`, `seeds/from-json.ts`, `seeds/links.ts`,
`check-id-stability.ts`) copied in. That tree is precisely what the repository
will look like once main is merged, so the gate results below are the real ones.

Also worth flagging: main's `seeds/101-eoy-2025.ts` has **different canonical
keys** from this worktree's copy (`lysosome-types-electron-microscopy` →
`lysosome-types-secondary-fates`, `pectoralis-major-attachment-action-nerve` →
`…-attachment-nerve-action`, and three more). Byte-identity is only a meaningful
claim against **main's** seed files, and that is what it was measured against.

## The registry, and a seventh paper the brief did not have

The brief specified six 101 papers. Main at `eb815ad` has **seven** — it added
`BAQOON_2023` in commit `22732e5`, after the brief was written. All seven are
registered, plus the two 102 papers:

```ts
const PAPERS: Registration[] = [
  { module: '101 ISK', load: () => EOY_2025 },
  { module: '101 ISK', load: () => EOY_2024 },
  { module: '101 ISK', load: () => EOY_2022 },
  { module: '101 ISK', load: () => EOY_2022_SECOND },
  { module: '101 ISK', load: () => BAQOON_2024 },
  { module: '101 ISK', load: () => BAQOON_2023 },   // ← added on main after the brief
  { module: '101 ISK', load: () => CASES_2025 },
  { module: '102 INT', load: () => paperFromJson('…/102-INT/eoy-2025-199.json') },
  { module: '102 INT', load: () => paperFromJson('…/102-INT/eoy-2024-198.json') },
]
```

Had I used the brief's list verbatim, `101-ISK-BAQOON-2023-written.md` would
have been deleted as an orphan on the next 101 build. That is the "re-applying
something already upstream quietly reverts something newer" failure, and the
byte-identity gate is what caught it.

---

## What came from which side

### `seeds/types.ts` — main's file, plus the parameterisation

**From this branch:** `ModuleRef`, `MODULES` (the catalogue's exact five IDs),
`moduleOf(source)` throwing on anything else; `SourceRef.module?` defaulting to
`'101 ISK'`; `SourceRef.solvedCopy?`; `KasrSubject` widened from eight to the
runtime's twenty; `BodySystem`, `DEFAULT_SYSTEM`, `systemFor`; `Seed.system?`
and the fifteen further optional `Seed` fields; the `mint-concept-id.mjs`
instability doc comment; `conceptHash(module, key)`;
`mintConceptId(module, subject, key, system?)`; module-aware `mintQuestionId`.

**Kept from main, which this branch's version had dropped:** `SourceRef.incomplete`
(and its doc comment — the 26 unprinted MCQs on the 2025 paper), `Seed.gaps`,
`subjectForPath`, `subjectCollisions`, and main's `WrittenFormat`-with-`'matching'`
shape.

**Not re-applied, because main already had it:** matching support. See the
conflict below.

`SYSTEM` is gone, replaced by `DEFAULT_SYSTEM`. Its first eight entries are
`SYSTEM` value for value, so no 101 concept changes prefix; the doc comment says
so.

### `emit.ts` — main's file, module threaded through

Six occurrences of the literal `101 ISK` became the module off the paper's own
`SourceRef`: `occurrence()`, `conceptBlock`'s `## modules`, `writtenBlock`'s
`## module`, `mcqConceptBlock`'s `## modules`, `mcqBlock`'s `## module`, and
`mcqBlock`'s `source_citation`. Both mint calls and the `QM-` hash take the
module. `mcqConceptBlock` and `mcqBlock` gained a `ModuleRef` parameter;
**both survive**, unchanged otherwise.

Three things from this branch went in because they are conditional on data 101
does not carry, so they change no 101 byte:

- `mediaFor` → `## media_recommendations`, emitted only when a paper carries
  media requests (101's `Paper` literals carry none; 102 emits 3 and 2).
- `## difficulty` falls back to `seed.difficulty` when present (101 seeds have none).
- `## cognitive_effort` likewise.

### `build-batches.ts` — main's file, restructured to the scoped shape

**From this branch:** the `Registration` shape with the lazy `load` thunk; the
required module argument with its explanatory error; the
registration-vs-`source.module` agreement check; per-module output paths;
`loadLinks` wiring for the concept batch's `articleId` and for questions'
`library_ids`.

**Kept from main:** `TIER_PREFIX` (this branch's inline ternary spelled `resit`
as `RESIT`; main spells it `BAQOON`, and the committed files are
`101-ISK-BAQOON-2024-written.md` — main wins, and this branch's version would
have orphaned three files), `SITTING_SIGNALS`, `assertNoSlugCollision`,
`assertOneSubjectPerKey`, `removeOrphans`, and the whole `mcq()` pipeline.

---

## Where the two genuinely conflicted

### 1. Matching questions — two spellings, main's kept

Main added matching support in `eb815ad`, *after* the brief was written, in a
different shape from this branch's:

| | this branch | main `eb815ad` |
|---|---|---|
| type | separate `SchemeFormat = WrittenFormat \| 'matching' \| …` | `'matching'` added to `WrittenFormat` itself |
| options | `matchingOptions?: string[]`, pre-formatted `"A \| text"` | `options?: { letter, text }[]` |
| prompts | `matchingPrompts?: string[]`, pre-formatted `"Glycine = C"` | `matches?: { prompt, letter }[]` |

Both emit identical bytes. **Resolved to main's**, per the instruction not to
introduce a second way to express one thing. `SchemeFormat` is gone; the 102
JSON keeps its flattened strings and `from-json.ts` parses them into main's
structured pairs on the way in, with validation main's hand-written seeds get
from the type system (a prompt answering a letter no option defines is now an
error rather than a matching question nothing matches).

`'completion'` and `'labeling'` **were** genuinely missing from main and are
added to `WrittenFormat` in main's style. The 2024 102 paper sets two
`completion` blocks; without it that paper cannot load.

### 2. The field-set conflict — **not reconciled, and deliberately so**

This is the one open decision. The brief says: "Main's `conceptBlock` emits 29
columns; mine emits 31 … Reconcile field by field — do not simply pick one."

Both counts are wrong, and the gap between them is the problem. Counted from the
source: **main emits 35 columns, this branch emits 54.** The brief was written
believing the delta was two columns. It is nineteen — and, critically, they are
not nineteen *additions*. This branch also gives **seven columns main already
emits a different derivation**:

| column | main | this branch |
|---|---|---|
| `blueprint_weight` | `marks/paperTotal × (1 + 0.5·sittings)`, cap 1.0 | tier-based `0.6/0.45/0.3 + 0.15·(sittings−1)`, cap 0.95 |
| `exam_weight_by_year` | follows the above | follows the above |
| `clinical_relevance` | `0.8 / 0.3` | `0.7 / 0.2`, and widens `clinical` to include `clinical_feature` |
| `confidence` | `0.9 / 0.75` by sittings | constant `0.8` |
| `topic` | `modulePath[1] ?? section` | `seed.topic ?? section` |
| `subtopic` | `modulePath[2] ?? leaf` | `seed.subtopic ?? leaf` |
| `evidence_gaps` | `seed.gaps` or `[clear]` | fixed sentence; **drops `seed.gaps` entirely** |
| `secondary_node_ids` | joined, may be empty | `[clear]` when empty |

Plus a different column order and an entirely different `field_notes` body.

Adopting this branch's `conceptBlock` therefore does not *add* to 101's concept
batch — it **rewrites** it. All seven of 101's written batches, its 71-concept
batch, its 88 MCQ concepts and 640 MCQ questions are committed and, per the
import-ready workflow, already applied by hand through Bulk Import. Changing
those bytes re-imports 71 concepts with changed blueprint weights and relevance
scores.

Byte-identity and "emit every column either version emits" are **mutually
exclusive**. There is no merged emitter satisfying both, short of branching on
the module, which would be behaviour in neither version.

I resolved it in favour of byte-identity, because:

- it is the invariant named twice as the thing protecting the other four lanes;
- 101's batches are already imported, so a silent rewrite is a **content**
  decision, not a toolchain one, and is not mine to take inside a merge;
- 102's batch is untracked and not yet imported, so deferring costs a
  regenerate, not a re-import.

**What this costs:** 102's concept batch currently emits main's 35 columns and
will not reach `medical:audit`'s floor of 50. The 54-column emitter is not lost —
it is in this branch's git-stash-shaped working copy and reproduced in full at
`scripts/kasr/seeds/types.ts` (the optional `Seed` fields it needs are all
merged in and carry their doc comments), and `loadLinks`/`unsupportedClaims` are
wired and waiting. What it needs is a decision on the seven conflicting columns,
which is a question for whoever owns 101's imported content.

The same applies to six `writtenBlock` columns this branch adds unconditionally
— `concept_ids`, `contextual_concept_ids`, `cognitive_effort_score`,
`inferred_difficulty`, `exam_weight_by_year`, and the unconditional half of
`media_recommendations`. They are not merged for the same reason.

### 3. MCQ leaves are not module-scoped

`seeds/mcq/` was written when there was only 101. Under a scoped build,
`mcq()` would happily emit 101's 640 question-book items into a 102 batch. A
leaf is now claimed by the module its own `modulePath` names — the same string
the batch writes to `module_subject`, so a leaf cannot be filed one way here and
another at import. The bank JSON is opened only *after* that filter, so a 102
build never reads 101's `mcq-bank.json`. Moving the directory to
`seeds/mcq/<module>/` is the tidier fix; it is a file move and this merge did
not make it.

### 4. `removeOrphans` would have deleted its neighbours

Main deletes every `*-written.md` the run did not write. Scoped to one module
and left unchanged, a `"101 ISK"` build would delete
`102-INT-EOY-2025-written.md` and `102-INT-EOY-2024-written.md` — the exact
neighbour-clobbering the required module argument exists to prevent, arriving by
the back door. Orphan removal is now scoped to the module's own filename prefix.

---

## Scope I had to widen, and why

**`scripts/kasr/seeds/from-json.ts`** — the 102 loader. Adapting it to main's
matching shape was directed in the mid-task correction. It is untracked and is
this branch's own half of the merge.

**`src/data/kasrConceptId.test.ts`** — this is a **merge blocker** and is not
optional. Main added this file in `422d799`. It calls `mintConceptId('haem', key)`
and `conceptHash(key)` with the old signatures. Under the new ones the first
argument is read as the module and `systemFor('decidua-…')` throws, so `npm test`
fails. **The file does not exist in this worktree**, so I could not commit the
fix here — it must be applied when main is merged. The change is mechanical: add
a `const MODULE = '101 ISK'` and thread it as the first argument to all eight
`mintConceptId` calls and the one `conceptHash` call. I verified it in the
scratch tree; with it applied the suite is 1316/1316 green.

## Not mine

`docs/Kasr-Source-Imports/INDEX.md` is modified in the worktree (102 coverage
documentation, mtime 15:21, one minute before my first write). Another session's
work. Left untouched.

---

## The gate

Run in the scratch tree at `eb815ad` + this merge, which is the repository as it
will be once main is merged. Verbatim output is in the task report.

| # | gate | result |
|---|---|---|
| 1 | `check-id-stability.ts` prints two lines, exit 0 | **pass** |
| 2 | byte-identity for 101 across all seven papers | **pass** — all 21 files under `docs/Kasr-Source-Imports/` identical, 10 of them regenerated |
| 3 | `"102 INT"` → 38 concepts, two written batches | **pass** |
| 4 | scoped build reads no other module's files | **pass** — `"101 ISK"` exits 0 with `102-INT/eoy-2025-199.json` moved aside; `"102 INT"` fails loudly on it |
| 5 | `npx tsc -b` clean, `npm test` green | **pass** — tsc exit 0; 1316/1316 (worktree is 1306; main's `kasrConceptId.test.ts` adds 10) |

Two caveats on gate 5 that a reader should not have to discover:

- **`npx tsc -b` does not typecheck any of these files.** `tsconfig.app.json`
  includes only `src`, `tsconfig.node.json` only `vite.config.ts`. Nothing under
  `scripts/` is in either program. A clean `tsc -b` says nothing about this
  merge; the generator running and reproducing bytes is the real check.
- The brief's 1306 is this worktree's count. The merged tree is 1316 because
  main carries a test file this branch's checkout does not.

Gates 2, 3 and 4 **cannot be run in this worktree** until main is merged, for
the missing-seed-files reason at the top.
