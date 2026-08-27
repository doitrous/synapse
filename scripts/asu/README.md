# scripts/asu — the Ain Shams extraction + emit toolchain

Copied from `scripts/kasr/` per `docs/Ain-Shams-Source-Imports/LANE-BRIEF.md`: same pattern,
constants changed. Field semantics in `emit.ts` / `seeds/types.ts` are kept byte-identical to
Kasr's own so the two universities' batches can be compared — see "Field semantics are decided
once" in `Instruction Manual for Content Creation/SHARED-TOOLCHAIN.md`.

**One order change from a plain copy, and it is the one thing in this toolchain that is not
just a renamed constant:** concept IDs no longer carry a module or university salt. See
"Concept IDs: the mint changed" below before doing anything else with this toolchain.

## How to run one module, start to finish

```bash
# 1. Academic structure (once the module's chapter/leaf data is filled into build-structure.ts's
#    inputs under extract/<slug>/{biochem,physio}-chapters.json)
node --experimental-strip-types scripts/asu/build-structure.ts "ASU-CVS"

# 2. Text extraction — pagetext.py first, always; the rest read its cache or their own
python3 scripts/asu/extract/pagetext.py --module "ASU-CVS" [--tier-max 5]
python3 scripts/asu/extract/deptbook.py --module "ASU-CVS" map
python3 scripts/asu/extract/deptbook-spans.py --module "ASU-CVS"
python3 scripts/asu/extract/mcq.py --module "ASU-CVS"
python3 scripts/asu/extract/practical.py --module "ASU-CVS"
python3 scripts/asu/extract/repair-options.py --module "ASU-CVS"   # only after a WATERMARKS entry exists — see below
python3 scripts/asu/extract/bank.py --module "ASU-CVS"
python3 scripts/asu/extract/eom.py --module "ASU-CVS"              # only after a SITTINGS entry exists
python3 scripts/asu/extract/eom-answerkey.py --module "ASU-CVS"    # only after a PAPERS/--calibrate entry exists

# 3. Article/claim plans (before authoring articles) and evidence (after)
node --experimental-strip-types scripts/asu/build-plans.ts "ASU-CVS"
node --experimental-strip-types scripts/asu/build-evidence.ts "ASU-CVS"
node --experimental-strip-types scripts/asu/apply-article-evidence.ts "ASU-CVS"
node --experimental-strip-types scripts/asu/build-article-links.ts
node --experimental-strip-types scripts/asu/link-claims.ts "<hand-authored concept batch>.md"
node --experimental-strip-types scripts/asu/match-sittings.ts "ASU-CVS"   # only after a COMPILATIONS entry exists

# 4. Resources, media requests
node --experimental-strip-types scripts/asu/build-resources.ts "ASU-CVS"
node --experimental-strip-types scripts/asu/build-media-requests.ts "ASU-CVS"

# 5. Build the batches — writes concept/article/question/written into
#    docs/Ain-Shams-Source-Imports/
node --experimental-strip-types scripts/asu/build-batches.ts "ASU-CVS"

# 6. Coverage ledger + evidence source index (once, whole-university, not per module)
node --experimental-strip-types scripts/asu/build-coverage.ts --module "ASU-CVS"
node --experimental-strip-types scripts/asu/build-source-index.ts

# 7. Gates — same three as every other lane (LANE-BRIEF.md §5), never medical:batch alone
npm run medical:batch -- "<file>" [--with <sibling>...]
npm run medical:simulate -- docs/Ain-Shams-Source-Imports/<kind>/<files> --emit /tmp/sim-ASU-<scope>.json
npm run medical:audit -- --source /tmp/sim-ASU-<scope>.json

# 8. Checks
node --experimental-strip-types scripts/asu/check-citations.ts
node --experimental-strip-types scripts/asu/check-column-parsers.ts docs/Ain-Shams-Source-Imports/concept/<file>.md
node --experimental-strip-types scripts/asu/check-sentinels.ts /tmp/sim-ASU-<scope>.json
node --experimental-strip-types scripts/asu/check-concept-presence.mjs docs/Ain-Shams-Source-Imports/concept/*.md
node --experimental-strip-types scripts/asu/check-question-fields.ts docs/Ain-Shams-Source-Imports/written/<file>.md
python3 scripts/asu/check-empties.py [--prefix "<module-slug>"]
node --experimental-strip-types scripts/kasr/check-concept-ids.ts <this run's own files>   # shared; scan is university-generic, do not copy

# 9. Land it — scripts/asu/sync.sh runs steps 5, 6 and the concept-ids gate, then commits and
#    pushes. This toolchain lane never runs it; a content-authoring lane does.
scripts/asu/sync.sh "ASU-CVS"
```

Every TypeScript build/check script here that touches `docs/Ain-Shams-Source-Imports` honours
`ASU_TOOLCHAIN_OUT` (redirects the whole output root — used by the fixture proof so nothing
lands in `docs/`), `ASU_TOOLCHAIN_EXTRACT_DIR`, `ASU_TOOLCHAIN_MANIFEST_DIR`,
`ASU_TOOLCHAIN_MCQ_DIR`, `ASU_TOOLCHAIN_LIVE_STATE` and `ASU_TOOLCHAIN_PENDING_DIRS`. Unset in
every real run.

## Where the extractor .py files live, and which were copied

All under `scripts/asu/extract/`, one file per Kasr original, same basename except
`kasr_module.py` → `asu_module.py`.

**Copied and parameterised** (every one refuses without `--module`; no default, unlike Kasr's
implicit `101 ISK`):

| File | What changed beyond paths |
|---|---|
| `asu_module.py` | New shared helper (was `kasr_module.py`). `manifest_sources()` now merges every `asu-y<N>-sources.json` present, not one file. `parse_module()` has no default and raises if `--module` is absent. |
| `pagetext.py` | Manifest lookup goes through `asu_module.manifest_sources()`. Otherwise unchanged — the shared manual calls this file "the worked example and is already correct". |
| `deptbook.py` | `CHAPTERS_BY_MODULE` starts empty (was `CHAPTERS_101`, a 43-entry physical-page map read off one book). `resolve_book()` — already generic in Kasr's copy — is now the *only* path; no `DEFAULT_MODULE` special case. |
| `deptbook-spans.py` | Was hardcoded to match `"Department Book Module 101"` in a filename. Now resolves the module's Department Book from the manifest by `sourceCategory`, with `--file` to disambiguate when a module has more than one. Output namespaced per module. |
| `mcq.py` | `MODULE`/`PARTS`/`TEXTCACHE`/`OUT` start `None` rather than bound to `DEFAULT_MODULE` at import (a placeholder module would create a spurious directory as a side effect of `out_path()`). The per-module `MODULE_CATEGORIES` / `MODULE_TARGETS` / `MODULE_ANSWER_PAIRS` / `MODULE_TOPIC_RULES` tables keep Kasr's `"101 ISK"`/`"104 CPS"` entries in place rather than stripped — they are inert `.get(module, default)` lookups no Ain Shams module ever matches, and stripping ~900 lines of working dict literals cost more review time than leaving them; add an Ain Shams entry the same way once a module needs one. |
| `bank.py` | Straightforward port; depends on `leaves.py`. |
| `leaves.py` | `TREES` (was `TREE_101`/`TREE_104`, hand-built department-book keyword vocabularies) starts empty. Kept the module-level `TREE` variable Kasr's copy has, for `bank.py`'s direct `leaves.TREE` reference. |
| `practical.py` | `FILES_BY_MODULE` starts empty (was `FILES_101`, five hand-named Kasr files with absolute paths). `files_for()` — already generic in Kasr's copy for "any module but the default" — is now the only path. |
| `repair-options.py` | `WATERMARKS` starts **empty** (was `{"101 ISK": <ViP Academy regex>, "104 CPS": None}`). See "The repair-options.py watermark table" below — this is the one file where the emptying is a safety fix, not just a content removal. |
| `eom.py` | `SITTINGS` starts empty (was four hand-read Kasr cover-fact entries, keyed by exact filename). **Found and fixed a real bug while doing this**: the `SITTINGS` loop in `main()` is not filtered by module at all — only the per-sitting file list inside it is. Kasr's copy never notices because it always runs as `101 ISK`; a first draft of this copy that kept Kasr's four entries reported `"4 sittings … 360 stated"` for a module with zero matching files. Emptying the table is both the content fix and the bug's practical resolution; the underlying module-blindness is worth fixing at the source too — see "Kasr findings to relay". |
| `eom-answerkey.py` | `PAPERS` starts empty (was five hand-calibrated HSV colour-threshold entries, one per real Kasr scan against its own unsolved twin). `MANIFEST`/`MODULE` no longer hardcoded; `main()`'s `argparse` now parses the args left over after `asu_module.parse_module()` removes `--module` (a bug in my first draft — `argparse` doesn't know that flag and refused it). `"universityId": "kau"` → `"asu"`. |
| `adopt_pagetext.py` | Simpler than Kasr's copy: no `--in-place` guard needed, because Ain Shams has no module whose source and destination cache are the same file (every module is namespaced from day one; Kasr's `101 ISK` shares `extract/pagetext/` with `pagetext.py` itself). |
| `rescan.py` | `JOBS` starts empty (was four hand-tuned dpi/psm retry entries for specific Kasr instructor PDFs). |
| `notes.py` | `WM` (watermark token set) starts empty — same reasoning as `repair-options.py`, see below. |
| `show.py`, `dump.py` | Trivial; `dump.py` now takes the `questions.json` path as an argument instead of hardcoding the bare `scripts/kasr/questions.json`. |
| `cluster.py` | The 586-line `OBJECTIVES` table and `UNCLUSTERED` dict (Kasr's own hand-read clustering of 704 question rows, plus the `A`/`H`/`BASIS`/… subject-tree shorthand constants) are removed, not stripped-and-kept: they are content, not a tool, specific to row indices in a `questions.json` this toolchain does not even produce under an unprefixed name. The mechanical two-thirds of the file (normalising text, legibility scoring, subject-tree coverage reporting, the integrity check) is kept and takes `--module`. With `OBJECTIVES` empty, the integrity check correctly refuses on any module with rows in its `questions.json` — "unaccounted indices" is the honest statement that nothing has been clustered yet, not a bug. |
| `check-empties.py` (from `scripts/kasr/extract/108-INT/`) | Moved to `scripts/asu/check-empties.py` (top level, not module-scoped — it already reads `conceptImport.ts`/`bulkImport.ts` directly and is university-generic). `MODULE_PREFIX` defaults to matching every batch instead of Kasr's hardcoded `"108-int"`; pass `--prefix "<slug>"` to scope it. |

**Not copied — content, not tooling.** Four files hold hand-transcribed or hand-calibrated Kasr
exam content with no separable mechanical shape, and copying them would ship Kasr's actual exam
answers into this toolchain for no reason (an Ain Shams lane would write its own from its own
corpus regardless):

- `eoy-mcq-read.py` — 68 real Kasr end-of-year MCQs, transcribed verbatim by eye from page images,
  hardcoded as Python literals.
- `build_practical.py` — Kasr's entire practical-slide transcription (titles, stains, features,
  prompts for every 101 ISK practical page), and the file itself refuses to run for any module but
  `101 ISK`.
- `build_notes.py` — Kasr's Notes/Important & Summaries/Orientation content, transcribed.
- `build_media_requests.py` — Kasr's own practical-slide media request list, keyed to Kasr's own
  `practical.json`.

`check-id-stability.ts` was also not copied: it pins Kasr's *committed* concept IDs against
movement across history, which only means something once this toolchain has committed batches of
its own to pin.

## The MODULES table

`seeds/types.ts`'s `MODULES` is **derived**, not pasted — it imports `universities` from
`src/data/universities.ts` and builds itself from `ASU_MODULES` at runtime:

```ts
const asuCatalogue = universities.find((u) => u.id === 'asu')
export const MODULES: Record<string, ModuleRef> = Object.fromEntries(
  asuCatalogue.years.flatMap((year) => year.courses.map((course) => [course.moduleId, {
    id: course.moduleId, code: course.moduleId.replace(/\s+/g, ''),
    yearId: year.id, name: course.name, term: course.term ?? 'Term 1',
  }])))
```

`src/data/universities.ts` has no imports of its own, so this resolves cleanly under
`--experimental-strip-types` — verified 2026-08-22, and re-verified after the catalogue lane
re-minted every module ID with an `ASU-` prefix mid-session (`ASU-CVS`, `ASU-CNS-2`, …): the table
picked the new IDs up automatically, no edit needed here. This is preferred over hand-pasting the
table, per the orchestrator's own instruction to derive rather than copy when the import is
clean, because agreement with the catalogue is then automatic rather than something to keep in
sync by hand. One addition on top: `MODULES['ASU-FIXTURE']`, a throwaway module for this
toolchain's own proof (`scripts/asu/fixtures/`), not part of the real catalogue.

## Concept IDs: the mint changed

This is the one place this toolchain is not a plain copy-and-rename of Kasr's.

Kasr's `mintConceptId(module, subject, key, system)` hashes `sha256("kau:" + module + ":" + key)`.
That salt is Kasr's own divergence from the shared minting law —
`Instruction Manual for Content Creation/tools/mint-concept-id.mjs` hashes the **canonical key
alone**: `CON-<SYSTEM>-` + `sha256(canonicalKey)` uppercased, first 14 hex, no module, no
university. `seeds/types.ts`'s `mintConceptId(subject, key, system)` here matches that tool
exactly — verified:

```
$ node "Instruction Manual for Content Creation/tools/mint-concept-id.mjs" CVS heart.chambers.four
CON-CVS-97165FF9CA99A7
$ node --experimental-strip-types -e "import('./scripts/asu/seeds/types.ts').then(m =>
    console.log(m.mintConceptId('cvs','heart.chambers.four')))"
CON-CVS-97165FF9CA99A7
```

Question, MCQ and written-question IDs keep a module salt (`asu:<module>:...`, replacing Kasr's
`kau:`) — those are university-specific occurrences, not portable medical ideas, so two
universities asking "different" questions about one concept must mint two questions.

**Why:** a concept is a medical idea, not a university's reading of one. The same idea taught at
Kasr and at Ain Shams must mint the same ID, or a student's mastery of it silently splits across
two records forever. Proved with a probe: `mintConceptId('fnd', 'shared-canonical-key-test',
'FND')` here is `CON-FND-6234C73D03D372`; Kasr's `kau:`-salted mint for the same subject/key is
`CON-FND-2AB9270A6783E6` — different, which is exactly the divergence being closed.

### The three-way switch this forces on `build-batches.ts`

Because the ID no longer encodes which university minted it, `concepts()` and `mcq()` in
`build-batches.ts` look every concept's minted ID up — via `seeds/existing.ts`'s
`findExistingConcept()` — against live state (`server/data/medical-library-v1.json`) and every
pending batch under `docs/import-ready/`, `docs/questions-import-ready/`, and every
`docs/*-Source-Imports/` directory (Kasr's included), before deciding what to write:

1. **No hit anywhere** → a full concept record, as before.
2. **Hit in live state** → a sparse *update* record (`## id` + only what changed), written into
   the normal `concept/` batch alongside full records — the importer decides create-vs-update
   per row by `id`.
3. **Hit only in a pending, not-yet-imported batch** (e.g. a Kasr lane's freshly authored but
   unapplied file) → the *same* sparse update record, but routed to
   `pending-live/<module>-<kind>.md` — outside every import folder — because the record it
   updates does not exist yet. Importing it now would race the other lane's own import rather
   than merge with it. `pending-live/INDEX.md` names which file has to land first.

Every decision is logged to stderr, one line per concept.

### The sparse update record, field by field — verified against the real validator, not assumed

`emit.ts`'s `conceptUpdateBlock` writes:

- `## universities`, `## learner_years`, `## modules` — these are genuine `optionalList()`
  columns, so a leading `+` is a real append directive (`src/data/importSemantics.ts`), and only
  written when the value is not already present.
- `## module_subject` — **NOT** a `+`-form. `conceptFromRow` reads it through
  `parseModuleSubjectPaths` directly, never through `optionalList`, so nothing marks the parsed
  array as an append and a leading `+` is stored as a literal character. **This was caught
  empirically, not by reading code alone**: a first draft wrote `+<path>` per an explicit
  instruction that it would append, and running it through `medical:simulate` against a real live
  concept (`CON-FND-7EC14E00DE2EAE`) stored `"moduleSubjectPaths": ["+ASU-CVS > Anatomy > …"]` —
  the plus sign landed in the data. Fixed to a full replace: the existing paths the lookup found,
  unioned with the new one.
- `## exam_signal` and `## exam_weight_by_year` — also full replaces, computed the same way.
  `exam_weight_by_year` turns out not to have strictly needed that: it is a plain
  `Record<string, number>`, and `mergeConcept` recurses into nested plain objects key-by-key
  (`src/data/importMerge.ts`) — the same mechanism that lets `field_notes` accumulate — so a bare
  single-entry map would merge with an existing one on its own. Merged by hand anyway, so the
  emitted row is self-describing.
- `## label` — written **unconditionally**, carrying the existing record's own label. Also
  caught empirically: a first draft wrote no label at all (truest reading of "id + only what
  changed"), and `detectBatchKind` (`src/data/batchKind.ts`) recognises a row as a *concept* only
  by `has('label') || has('canonical_key')` — with neither, both `medical:batch` and
  `medical:simulate` read the row as `kind: "unknown"` and silently skipped it. So a sparse update
  needs *a* detector column, and it is the record's own existing label, never this build's
  newly-authored one — an update must not overwrite another university's phrasing of the same idea
  just to satisfy a detector.

Proven end to end against a real live concept, not just the fixture — see the gate output in the
final report.

## What was 101/Kasr-specific and was removed

- The `kau:` concept-ID salt (see above — replaced by the shared minting law, not by `asu:`).
- The `QW-101-`-style module code embedded in question IDs — `mintQuestionId`/`mcqBlock` now read
  `module.code`, derived from the real catalogue ID, not a literal.
- `## universities\nkau`, `KAU_Y1=`, hardcoded `## years\nYear 1` and `## learner_years\n1` —
  `emit.ts` now reads `module.yearId` (added to `ModuleRef`, since Ain Shams spans three years in
  one toolchain and Kasr's is Year 1 only) and derives the year number from it.
- `"Kasr Al Ainy"` in `source_citation` prose → `"Ain Shams"`.
- Kasr's own department-book fallback for `resource_ids` (a specific `src_…` ID) — dropped with no
  Ain Shams equivalent; a concept with nothing else named now gets no `resource_ids` rather than
  pointing at a source that is not this corpus's own book.
- `101-ISK-*` hardcoded output filenames throughout the build scripts, replaced by the module's own
  slug.
- Every `--module` default of `"101 ISK"` — see "Constants to change" in the orders; every script
  here refuses without an explicit `--module`, matching `build-batches.ts`'s own refusal to run
  bare.
- `"101-ISK-undefined-2022-written.md"`-class silent failures — the `TIER_PREFIX` exhaustive-map
  refusal is unchanged from Kasr's (still throws on an unknown tier rather than stringifying
  `undefined`), just copied as-is since it was already the fix.
- Institution string `"Kasr Alainy — Faculty of Medicine, Cairo University"` in
  `build-resources.ts` → `"Ain Shams University — Faculty of Medicine"`; `collection_id`
  `kasr-y1-101-isk` → derived from the module id.

## Kasr findings to relay

For the orchestrator to pass to the relevant Kasr lane(s). Nothing in `scripts/kasr/` was edited.

1. **`scripts/kasr/extract/eom.py`'s `SITTINGS` loop is not scoped by module.** `main()` filters
   `papers` (the manifest rows) by `MODULE`, but the `for date, sitting in sorted(SITTINGS.items())`
   loop right after it iterates the whole hardcoded table regardless — only the per-sitting file
   list inside each entry is checked against what was actually read. Invisible in Kasr's own copy
   because it always runs as `101 ISK` and `SITTINGS` is `101 ISK`'s own data, so the two never
   disagree. Would matter the moment that file gets a real `--module` retrofit with more than one
   module's sittings in one table. File: `scripts/kasr/extract/eom.py`, around the `SITTINGS`
   iteration in `main()`.
2. **`scripts/kasr/build-article-links.ts`'s `blocks()` helper has no `existsSync` guard**, and
   neither does its `writeFileSync(LEDGER, …)` call have a `mkdirSync` first. Both are harmless on
   Kasr's checkout only because `docs/Kasr-Source-Imports/article/`, `/concept/` and `/coverage/`
   already exist with committed content. Found because this toolchain's copy crashed on both,
   pointed at an empty output tree — `ENOENT` on `readdirSync` of a missing `article/` directory,
   then again on `writeFileSync` into a missing `coverage/` directory. Fixed in
   `scripts/asu/build-article-links.ts`; the same two-line fix (`existsSync` before `readdirSync`,
   `mkdirSync(dirname(LEDGER), { recursive: true })` before the write) would make Kasr's copy
   robust to a fresh checkout too, though it is not exercised there today.
3. **`node:path`'s `join()` does not special-case an absolute second argument** the way Python's
   `os.path.join` does — `join('/repo', '/private/tmp/x')` returns `/repo/private/tmp/x`, not
   `/private/tmp/x`. Cost this toolchain a stray `private/tmp/…` directory written into the repo
   root by `build-coverage.ts` and `build-source-index.ts` when their env-var output overrides
   were absolute paths (used by the fixture proof). Not a Kasr defect — Kasr's originals have no
   such override — but worth knowing before any Kasr script grows one: use `path.isAbsolute()` to
   guard, or `path.resolve()`, not a bare `join(REPO, possiblyAbsolutePath)`.

## Extraction results and the page cache

Module-namespaced from day one: `scripts/asu/extract/<module-slug>/…`, never an unprefixed
result file (`SHARED-TOOLCHAIN.md` §1 names exactly this class of file as Kasr's collision
source). Page cache is `scripts/asu/extract/pagetext/`, gitignored by `scripts/asu/extract/.gitignore`
(copied from `scripts/kasr/extract/.gitignore`'s pattern — `pagetext/`, `parts/`, `raw/`,
`__pycache__/`, rendered-page images).

## The fixture proof

`scripts/asu/fixtures/` holds a throwaway module (`ASU-FIXTURE`, stubbed into `seeds/types.ts`'s
`MODULES`), a one-paper JSON seed (2 seeds is not what shipped — see below), a one-leaf MCQ bank,
a 3-row fake manifest, and a fixture article — all clearly marked, never real content. To rerun
it, temporarily add these two lines back (they carry `FIXTURE-PROOF-TEMP` markers in git history/
diffs; removed from the committed state):

```ts
// scripts/asu/seeds/registry.ts — inside REGISTRATIONS
{ module: 'ASU-FIXTURE', load: () => paperFromJson('scripts/asu/fixtures/paper.json') }
// scripts/asu/seeds/articles.ts — inside ARTICLE_FOR_CONCEPT
'CON-FND-A9A4D15983C214': 'ART-FIX-0000000000',
'CON-FND-7D20B6C6A6B3C1': 'ART-FIX-0000000000',
```

then:

```bash
export ASU_TOOLCHAIN_OUT=/tmp/asu-fixture-out
export ASU_TOOLCHAIN_EXTRACT_DIR=scripts/asu/fixtures/extract
export ASU_TOOLCHAIN_MCQ_DIR=scripts/asu/fixtures/mcq
export ASU_TOOLCHAIN_LIVE_STATE=scripts/asu/fixtures/nonexistent-live.json      # forces the "fresh" branch
export ASU_TOOLCHAIN_PENDING_DIRS=scripts/asu/fixtures/nonexistent-pending
node --experimental-strip-types scripts/asu/build-batches.ts "ASU-FIXTURE"
```

and revert the two additions afterward. See the orchestrator's final report for the actual gate
output this produced — one written question (short-answer, from the paper seed), one SBA
question (from the MCQ bank/leaf route), two concepts, one article.

To exercise the live-update and pending-collision branches, point `ASU_TOOLCHAIN_LIVE_STATE` at
`scripts/asu/fixtures/fake-live-state.json` and `ASU_TOOLCHAIN_PENDING_DIRS` at
`scripts/asu/fixtures/pending-collision/` instead.

## What asu-intake owns

`scripts/asu/intake/` is the asu-intake lane's, untouched by this lane. `scripts/asu/build-*.ts`
and `extract/*.py` read the manifests that lane writes (`docs/Ain-Shams-Source-Imports/manifest/
asu-y<N>-sources.json`) but do not generate them.
