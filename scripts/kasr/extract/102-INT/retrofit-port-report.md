# Retrofit: the module parameter, ported onto main's generator a second time

Base taken at **`HEAD = cd8f43c597efb40c115c991f8aabcf070d5f82a7`** (`git rev-parse HEAD`,
run before anything was edited). The working tree had already merged `origin/main`;
`scripts/kasr/seeds/types.ts`, `scripts/kasr/emit.ts` and `scripts/kasr/build-batches.ts`
were main's versions and carried none of the change.

The earlier attempt at this port is `scripts/kasr/extract/102-INT/toolchain-merge-report.md`,
merged against `origin/main = eb815ad`. Main has moved a long way since. Read that
file next to this one: several things it recorded as deferred have since been done
on main, and one thing it deferred is deferred again here for the same reason.

Files changed:

| file | what happened |
|---|---|
| `scripts/kasr/seeds/types.ts` | main's file, plus the parameterisation |
| `scripts/kasr/emit.ts` | main's file, module threaded through; `batchFile` guard added |
| `scripts/kasr/build-batches.ts` | main's file, restructured to the scoped shape |
| `scripts/kasr/seeds/registry.ts` | adapted, not replaced — `REGISTRATIONS` added beside `PAPERS` |
| `scripts/kasr/seeds/from-json.ts` | one type error this port introduced, fixed here |
| `src/data/kasrConceptId.test.ts` | mechanical: the module threaded through nine calls |

`scripts/validate-content-batch.mjs` was not touched. `...alongside` is still in the
`const siblings = [...]` array at `:580`. Nothing under `docs/Kasr-Source-Imports/`
belonging to 101, 103, 104 or 108 was modified — see gate 2.

---

## What came from which side

### `seeds/types.ts` — main's file, plus the parameterisation

**From the reference (`/tmp/mine102/types.ts`):** `ModuleRef`; `MODULES` keyed by the
catalogue's five exact IDs; `moduleOf(source)` throwing on anything else;
`SourceRef.module?` defaulting to `'101 ISK'`; `SourceRef.solvedCopy?`; `KasrSubject`
widened from eight to the runtime's twenty; `BodySystem`, `DEFAULT_SYSTEM`,
`systemFor(subject, override?)` with `pharm` deliberately absent and its doc comment
kept verbatim; `Seed.system?` and the fifteen further optional `Seed` fields;
`Scheme.completionText?`; `WrittenFormat` widened with `completion`, `labeling` and
`mcq_single_best`; the `mint-concept-id.mjs` instability doc comment;
`conceptHash(module, key)`; `mintConceptId(module, subject, key, system?)`;
module-aware `mintQuestionId`.

**Kept from main:** `SourceRef.incomplete` and its doc comment; `SourceRef.tier` typed
as `ExamSourceTier` with main's wording of why; `Seed.gaps`; `subjectForPath`;
`subjectCollisions`; `SchemePart`; `partsKey`; main's structured `'matching'` shape
(`options: {letter,text}[]`, `matches: {prompt,letter}[]`) rather than the reference's
flattened strings.

`SYSTEM` is gone, replaced by `DEFAULT_SYSTEM`. Its first eight entries are `SYSTEM`
value for value, so no 101 concept changes prefix.

One edit to the reference's own text: the `Seed` block's NOTE said "as of this merge
the emitter does not yet write these columns". Main writes all of them now, so the
NOTE would have been false. It is rewritten to say where they are written from.

### `emit.ts` — main's file, module threaded through

Six occurrences of the literal `101 ISK` became the module off the paper's own
`SourceRef`: `occurrence()`, `conceptBlock`'s `## modules`, `writtenBlock`'s
`## module`, `mcqConceptBlock`'s `## modules`, `mcqBlock`'s `## module`, and
`mcqBlock`'s `source_citation`. Every mint call and the `QM-` hash take the module.
`mcqConceptBlock` and `mcqBlock` gained a `ModuleRef` parameter and are otherwise
main's.

Also ported:

- **`batchFile()` refuses** a batch putting `[clear]` on a text column, naming the
  offenders, with the reference's `exclusionReason` explanation. See conflict 2 for
  what the `TEXT_COLUMNS` list ended up being.
- **The `scalar` / `list` split**, as named helpers inside `conceptTail`. Main already
  applied the rule by hand — blank under `arabic_label`, `exclusion_reason`,
  `last_reviewed` and `review_due`, `[clear]` on the list columns — so this changes no
  byte; it makes the rule a function instead of a convention, which is the point of it.
- `conceptBlock` and `conceptTail` take an optional `ConceptLinks`, so `article_ids`,
  `related_article_ids`, `resource_ids` and `atomic_claim_ids` come from
  `seeds/links.ts` where a module has had its evidence pass and fall back to main's
  101 sources (`ARTICLE_FOR_CONCEPT`, `furtherReading()`, `claim-links.json`,
  `DEPARTMENT_BOOK`) where it has not.
- `writtenBlock` gained `mediaFor` → `## media_recommendations`, `## completion_text`
  for the completion format, `## difficulty` and `## cognitive_effort` falling back to
  `seed.difficulty`, and `## inferred_difficulty` / `## cognitive_effort_score`.
- `reviewer` is `Medical team, Admin team` and `final_publisher` is `Admin team` —
  **main already set these**, and main's are kept. A paragraph at the foot of
  `conceptTail`'s doc comment claimed they were `[clear]`; it contradicted the code
  directly beneath it and is removed rather than left standing.

### `build-batches.ts` — main's file, restructured to the scoped shape

**From the reference:** the `Registration` shape with the lazy `load` thunk; the
required module argument with its explanatory error; the catalogue check on the
argument; the registration-vs-`source.module` agreement check; per-module output
paths; `slug()` throwing on a tier with no `TIER_PREFIX` entry; module-scoped
`removeOrphans`; module-scoped `assertOneSubjectPerKey`; `mcqLeaves(module)` claiming
a leaf by the module its own `modulePath` names; the `mcq_single_best` skip with its
stdout report; the media-request blocks; `loadLinks` / `unsupportedClaims` wiring for
both the concept batch and questions' `library_ids`.

**Kept from main:** `TIER_PREFIX` — the reference spells `other` as `OTHER`, main
spells it `FORMATIVE`, and the committed file is `101-ISK-FORMATIVE-2025-written.md`;
the reference's spelling would have orphaned it. Also `furtherReading()`,
`SITTING_SIGNALS`, `ARTICLE_FOR_CONCEPT`, `assertNoSlugCollision`, and the whole
`mcq()` pipeline including the `stems` / `original_wording` derivation and the
`untested` sweep, none of which the reference has.

`TIER_PREFIX` is exhaustive over `EXAM_SOURCE_TIERS` (all seven), which main's already
was.

### `seeds/registry.ts` — adapted, not replaced

Main introduced this file after the earlier port was written, and the brief's inline
`PAPERS` list would have replaced it. Instead `REGISTRATIONS` is added as the source of
truth — the same seven 101 papers in the same priority order, plus the two 102 entries
— and `PAPERS` is *derived* from it by filtering to `101 ISK` and calling each `load`.
Every 101 `load` is a reference to a static import, so that reads nothing off disk;
only the 102 entries touch the filesystem, and only when asked for. `seededBySource()`
is unchanged, and its one consumer `build-coverage.ts` is the 101 coverage ledger,
which filters the manifest to `101 ISK` anyway.

Deriving rather than listing twice is deliberate: a paper added to one list and not the
other is exactly the failure the earlier port hit from the opposite direction, when the
brief's six-paper list would have orphaned `101-ISK-BAQOON-2023-written.md`.

### `seeds/from-json.ts` — a type error this port introduced

`JsonSeed extends Omit<Seed, 'subject' | 'system'>` and declared `difficulty?: string`.
That compiled while `Seed` had no `difficulty`; adding the four-word union made it a
`TS2430`. `difficulty` is now omitted from the `extends` too, and the loader **refuses**
a band outside `Easy | Moderate | Hard | Challenging` rather than passing it through —
an unknown word would fall past every ternary in `writtenBlock` to the `Moderate` arm,
producing a mis-banded question the batch reports as banded.

### `src/data/kasrConceptId.test.ts` — a merge blocker, not optional

Main's file calls `mintConceptId('haem', key)` and `conceptHash(key)` with the old
signatures. Under the new ones the first argument is read as the module and
`systemFor('decidua-…')` throws. A `const MODULE = '101 ISK'` is threaded through eight
`mintConceptId` calls and the one `conceptHash` call, and the file's doc comment
corrected — it said the ID is minted "from the canonical key alone", which is now half
the truth. No test is added or removed: 1321 before, 1321 after.

---

## Where the two genuinely conflicted

### 1. The field-set conflict — mostly settled by main, and settled the same way

The earlier port deferred the 54-column `conceptBlock` because adopting it would have
*rewritten* seven columns main already emits (`blueprint_weight`, `exam_weight_by_year`,
`clinical_relevance`, `confidence`, `topic`, `subtopic`, `evidence_gaps`, plus
`secondary_node_ids`) on batches that are already imported.

**Main has since taken the nineteen presence columns and kept its own derivations.**
Measured before anything was edited: `fieldsUsed: 54` on
`docs/Kasr-Source-Imports/concept/101-ISK-concepts.md`. So `conceptPresence` did not
need re-applying — it is on main, inside `conceptTail`, in a different column order and
with the same nineteen columns. **Main's order and bytes are kept**, because gates 2 and
3 both depend on them. What is added is the plumbing: the columns now take real values
from `seeds/links.ts` when a module has them.

Consequence for 102: its concept batch has the same 54 columns as before this port, in
main's column order rather than the earlier port's. The values are unchanged except
`## uncertainty`, which was an empty block and is now `[clear]` — `uncertainty` is a
*list* column (measured, see conflict 2), and a blank on a list column stores `null`
where `[]` is the accurate statement. `check-column-parsers.ts` reports
`sentinelInTextColumn: 0, blankInListColumn: 0` for both modules.

### 2. `TEXT_COLUMNS` — the reference's list would refuse main's own committed batch

The reference lists nineteen columns and includes `subtopic`, `microtopic` and
`nanotopic`. Main's `conceptTail` emits `## microtopic\n[clear]` and
`## nanotopic\n[clear]`, and that is what is committed for 101. Porting the list
verbatim makes `batchFile()` throw on the 101 build — not a diff, a crash — so gates 2
and 3 become unreachable.

Resolved by taking the list the reference's *own doc comment* says it is: the measured
one. `check-column-parsers.ts` sends a probe containing a `|` through `conceptFromRow`
for every column and classifies by what comes back. Today that gives **eighteen** text
columns:

```
arabic_label, canonical_key, concept_type, definition, editorial_review_status,
exclusion_reason, explicit_objective, final_publisher, id, label, last_reviewed,
owner, pitfalls, primary_node_id, publication_status, review_due, reviewer,
support_mode
```

It adds `id` and `label`, which the reference's hand-written list omits, and drops
`subtopic`, `microtopic` and `nanotopic`, which the probe puts in **neither** set:
they are catalogue *resolvers* (`conceptImport.ts:125-127`), looked up against SUB_/MIC_/NAN_
nodes. `[clear]` on one of those is a lookup that finds nothing and leaves the ID unset
— not a literal stored in a text field, which is the bug the guard exists for. Scanned
across every existing batch under `docs/Kasr-Source-Imports/`: no text column anywhere
carries `[clear]`, so the guard is live rather than merely satisfied.

`microtopic` and `nanotopic` keeping `[clear]` is main's committed behaviour and is
left alone. It is not right — it is a lookup nobody meant — but changing it rewrites
101's imported concept batch, which is conflict 3's territory.

### 3. Three `writtenBlock` columns — **not reconciled, and named rather than guessed**

The brief asks for seven extra question columns. Four of them are conditional on data
101 does not carry, so they change no 101 byte and are merged:

| column | gate | 101 | 102 |
|---|---|---|---|
| `media_recommendations` | paper carries media requests | none | 3 and 2 |
| `completion_text` | `format === 'completion'` | none | 2 blocks on the 2024 paper |
| `inferred_difficulty` | `seed.difficulty` is set | never set | all 45 seeds |
| `cognitive_effort_score` | `seed.difficulty` is set | never set | all 45 seeds |

The gate on the last two is not a proxy for the module. `inferred_difficulty` is a
facility percentage and `cognitive_effort_score` a 0–1 load; both are readings of
`seed.difficulty`. 101's papers were transcribed before that field existed, so the
"Moderate" fallback would put a statistic on seven committed batches that nobody
authored. **A question nobody banded gets no band.**

The other three are unconditional in the reference and fully derivable for 101, so they
cannot be emitted without rewriting all seven of 101's written batches:

- **`exam_weight_by_year`** — `KAU_Y1=<exam_relevance/10>`. Always available.
- **`contextual_concept_ids`** — always `[clear]`. Carries no data at all; its only
  value is presence.
- **`concept_ids`** — the reference emits `main_concept.slice(1)`. Note that
  `main_concept` is parsed by `optionalList` (`bulkImport.ts:762`), so main already
  writes every co-primary concept there; `concept_ids` is a *separate* array
  ("Concepts the item also assesses"), and putting the same IDs in both risks
  double-crediting mastery. This one may be wrong on its merits as well as
  byte-breaking, which is a second reason not to take it inside a port.

101's written batches are committed and, per the import-ready workflow, already applied
by hand through Bulk Import. Changing their bytes re-imports 105 questions. That is a
**content** decision for whoever owns 101's imported material, not a merge one, and
gate 2 names byte-identity as the invariant protecting the other four lanes. Resolved
in favour of gate 2.

**What this costs:** 102's two written batches now carry 34 columns rather than the 37
the earlier generation produced. They are untracked and not yet imported, so the cost is
a regenerate rather than a re-import. Nothing gates on those three columns —
`check-question-fields.ts` reports them as "AVAILABLE and unfilled", which is the
report, not a failure.

### 4. MCQ leaves are still not module-scoped by directory

`seeds/mcq/` was written when there was only 101, and all 43 leaves declare
`modulePath: '101 ISK > …'`. A leaf is claimed by the module its own `modulePath`
names — the same string the batch writes to `module_subject`, so a leaf cannot be filed
one way here and another at import. The bank JSON is opened only *after* that filter, so
a 102 build never reads `mcq-bank.json`. Moving the directory to `seeds/mcq/<module>/`
is the tidier fix; it is a file move and this port did not make it. Unchanged from the
earlier report.

### 5. `removeOrphans` — confirmed destructive on main, now scoped

Not a hypothetical. Running main's generator to take the gate-2 baseline printed:

```
removed orphaned batch (no paper produces it any more): written/102-INT-EOY-2024-written.md
removed orphaned batch (no paper produces it any more): written/102-INT-EOY-2025-written.md
```

Main deletes every `*-written.md` the run did not write, so a 101 build deletes 102's
batches. They were restored from the pre-run snapshot. The sweep is now filtered to the
module's own filename prefix, and the gate-2 and gate-5 runs both leave the 102 files
in place.

---

## The gate

Every result below is real output from this worktree, at
`HEAD = cd8f43c597efb40c115c991f8aabcf070d5f82a7` plus the changes described above.

### 1 — `check-id-stability.ts`

```
$ node --experimental-strip-types scripts/kasr/check-id-stability.ts
ID stability: 3 concept IDs and 3 question IDs unchanged; 102 INT mints a distinct namespace.
pharm refuses to mint without an explicit body-system code; overrides honoured.
exit=0
```

### 2 — 101's batches byte-identical to what is committed

Before any edit, main's generator was run as main invokes it
(`node --experimental-strip-types scripts/kasr/build-batches.ts`, no argument) and all
ten files it wrote were snapshotted. `git status --porcelain docs/` was clean at that
point, so the snapshot is the committed bytes.

```
$ node --experimental-strip-types scripts/kasr/build-batches.ts "101 ISK"
71 concepts (41 repeated across papers) -> docs/Kasr-Source-Imports/concept/101-ISK-concepts.md
16 written questions, 81 marks -> docs/Kasr-Source-Imports/written/101-ISK-EOY-2025-written.md
16 written questions, 76 marks -> docs/Kasr-Source-Imports/written/101-ISK-EOY-2024-written.md
14 written questions, 74 marks -> docs/Kasr-Source-Imports/written/101-ISK-EOY-2022-written.md
14 written questions, 74 marks -> docs/Kasr-Source-Imports/written/101-ISK-BAQOON-2022-written.md
16 written questions, 80 marks -> docs/Kasr-Source-Imports/written/101-ISK-BAQOON-2024-written.md
13 written questions, 65 marks -> docs/Kasr-Source-Imports/written/101-ISK-BAQOON-2023-written.md
10 written questions, 50 marks -> docs/Kasr-Source-Imports/written/101-ISK-FORMATIVE-2025-written.md
  skipped concept "case-clavicle-fracture-middle-third" — declared by a leaf but no question tests it
261 MCQ concepts -> docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md
1662 MCQ questions (556 excluded, 0 unanswered) -> docs/Kasr-Source-Imports/question/101-ISK-mcq.md
exit=0

$ diff -r <snapshot of main's output> <snapshot after the port>
exit=0

$ git status --porcelain docs/ | grep -v "^??"
(no output above = every tracked file under docs/ is at its committed bytes)
```

### 3 — 101's concept batch still emits 54 columns

```
$ node --experimental-strip-types scripts/validate-content-batch.mjs docs/Kasr-Source-Imports/concept/101-ISK-concepts.md | head -6
{
 "file": "docs/Kasr-Source-Imports/concept/101-ISK-concepts.md",
 "kind": "concept",
 "items": 71,
 "fieldsUsed": 54,
 "placements": [
```

### 4 — `"102 INT"` produces 38 concepts, 19 written (80 marks) and 15 (68 marks)

```
$ node --experimental-strip-types scripts/kasr/build-batches.ts "102 INT"
38 concepts (7 repeated across papers) -> docs/Kasr-Source-Imports/concept/102-INT-concepts.md
19 written questions, 80 marks -> docs/Kasr-Source-Imports/written/102-INT-EOY-2025-written.md
  5 single-best-answer question(s) left out of 102-INT-EOY-2024 — they belong in the MCQ route:
    P4 (In response to a systemic sympathetic response, …)
    P5 (A 39-year-old woman returns home after eating at…)
    P6 (While driving, you narrowly avoid a car accident…)
    P7 (Adrenergic nerve fibres secrete: A. Acetyl choli…)
    P8 (The ciliary ganglion is considered as: A. Sympat…)
15 written questions, 68 marks -> docs/Kasr-Source-Imports/written/102-INT-EOY-2024-written.md
exit=0
```

### 5 — a scoped build reads no other module's files

```
$ mv scripts/kasr/extract/102-INT/eoy-2025-199.json /tmp/eoy-2025-199.json.aside
$ node --experimental-strip-types scripts/kasr/build-batches.ts "101 ISK"
71 concepts (41 repeated across papers) -> docs/Kasr-Source-Imports/concept/101-ISK-concepts.md
16 written questions, 81 marks -> docs/Kasr-Source-Imports/written/101-ISK-EOY-2025-written.md
16 written questions, 76 marks -> docs/Kasr-Source-Imports/written/101-ISK-EOY-2024-written.md
14 written questions, 74 marks -> docs/Kasr-Source-Imports/written/101-ISK-EOY-2022-written.md
14 written questions, 74 marks -> docs/Kasr-Source-Imports/written/101-ISK-BAQOON-2022-written.md
16 written questions, 80 marks -> docs/Kasr-Source-Imports/written/101-ISK-BAQOON-2024-written.md
13 written questions, 65 marks -> docs/Kasr-Source-Imports/written/101-ISK-BAQOON-2023-written.md
10 written questions, 50 marks -> docs/Kasr-Source-Imports/written/101-ISK-FORMATIVE-2025-written.md
  skipped concept "case-clavicle-fracture-middle-third" — declared by a leaf but no question tests it
261 MCQ concepts -> docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md
1662 MCQ questions (556 excluded, 0 unanswered) -> docs/Kasr-Source-Imports/question/101-ISK-mcq.md
exit=0

$ node --experimental-strip-types scripts/kasr/build-batches.ts "102 INT"   # must fail loudly
Error: ENOENT: no such file or directory, open 'scripts/kasr/extract/102-INT/eoy-2025-199.json'
  code: 'ENOENT',
  path: 'scripts/kasr/extract/102-INT/eoy-2025-199.json'

$ mv /tmp/eoy-2025-199.json.aside scripts/kasr/extract/102-INT/eoy-2025-199.json
$ diff -r <snapshot of main's output> <101 rebuilt with 102 absent>
exit=0
```

The 101 build succeeds with 102's seed absent, reproduces the committed bytes, and does
not delete 102's two written batches. The 102 build fails loudly on its own missing
seed, which is the behaviour worth keeping.

### 6 — `npm test` and `npx tsc -b`

```
$ npm test
ℹ tests 1321
ℹ suites 39
ℹ pass 1321
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2611.487

$ npx tsc -b
exit=0
```

Baseline before the port was also 1321/1321; `kasrConceptId.test.ts` is rewritten, not
added to.

### After the gate

```
$ git status --porcelain docs/
?? docs/Kasr-Source-Imports/academic/102-int-structure.md
?? docs/Kasr-Source-Imports/article/102-INT-biochemistry.md
?? docs/Kasr-Source-Imports/article/102-INT-physiology.md
?? docs/Kasr-Source-Imports/concept/102-INT-concepts.md
?? docs/Kasr-Source-Imports/coverage/102-INT-OWED.md
?? docs/Kasr-Source-Imports/coverage/102-INT-coverage.md
?? docs/Kasr-Source-Imports/evidence/102-INT-citations.md
?? docs/Kasr-Source-Imports/evidence/102-INT-claims.md
?? docs/Kasr-Source-Imports/evidence/102-INT-sources.md
?? docs/Kasr-Source-Imports/evidence/102-INT-spans.md
?? docs/Kasr-Source-Imports/media-requests/102-INT-media-requests.md
?? docs/Kasr-Source-Imports/question/102-INT-MCQ-bank.md
?? docs/Kasr-Source-Imports/written/102-INT-EOY-2024-written.md
?? docs/Kasr-Source-Imports/written/102-INT-EOY-2025-written.md
```

Untracked 102 artefacts only. No tracked file under `docs/` is modified.

---

## Caveats a reader should not have to discover

**`npx tsc -b` does not typecheck any of the three ported files.** `tsconfig.app.json`
includes only `src`, `tsconfig.node.json` only `vite.config.ts`; nothing under
`scripts/` is in either program. A clean `tsc -b` says nothing about this port. The
generator running and reproducing bytes is the real check.

`scripts/kasr/**/*.ts` was therefore typechecked separately, with a throwaway
`tsconfig` (`strict`, `allowImportingTsExtensions`). Two errors remain, **both
pre-existing and neither in a file this port authored**:

- `scripts/kasr/seeds/sittings.ts:128,131,140` — `TS1117`, three duplicated keys in
  `SITTING_SIGNALS` (`elbow-joint-type-bones-ligaments`,
  `lysosome-types-secondary-fates`, `radial-nerve-origin-root-branches`). The later
  literal wins at runtime and the earlier signal lines are discarded, so those three
  concepts under-report the sittings they were examined on. This is main's file,
  unmodified here, and fixing it changes 101's committed concept batch — so it is a
  content decision, filed rather than taken.
- `scripts/kasr/check-column-parsers.ts:39` — `TS2352`, a `Concept` → `Record<string,
  unknown>` cast. Untracked, from the 102 lane; the script runs correctly.

**`medical:batch` on a written batch alone reports cross-reference errors, and always
has.** `102-INT-EOY-2025-written.md` reports 40 (`main_concept … is not a concept that
exists`, `library_ids … is not an article that exists`); the same command on the
committed `101-ISK-EOY-2025-written.md` reports 33. They are the sibling-resolution
errors `...alongside` in `scripts/validate-content-batch.mjs` exists to answer, not a
regression: the previous generation of the same 102 file reported 42, and the two that
went away are the `concept_ids` rows this port does not emit. `102-INT-concepts.md`
validates with `errors: 0`.

## Open questions

1. **The three `writtenBlock` columns** (`concept_ids`, `contextual_concept_ids`,
   `exam_weight_by_year`) — see conflict 3. Whoever owns 101's imported content has to
   decide whether seven written batches may be rewritten. If yes, the change is five
   lines in `emit.ts` and a regenerate. Note the `concept_ids` / `main_concept`
   double-credit question before saying yes.
2. **`microtopic` / `nanotopic` carrying `[clear]`** in every concept batch. They are
   catalogue resolvers, so the sentinel resolves to nothing and the ID is left unset —
   harmless, and meaningless. Emitting the key with nothing under it would be right and
   would change 101's committed bytes. Same owner, same decision.
3. **`furtherReading()` reads every module's article batches**, not only the module
   being built. It is keyed by article ID so there is no cross-module leakage today,
   but it is a directory read a scoped build has no business doing. Main's behaviour,
   left alone.
4. **`seeds/mcq/` is not scoped by directory** — conflict 4. A file move nobody has
   made.
