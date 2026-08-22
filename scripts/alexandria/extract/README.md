# MCQ triage and extraction notes — Alexandria

## Scrambled answer-key columns — symptom and remedy

The terminology lane (W1-102-TERM) and the anatomy lane (W1-105-ANAT) both hit the same
failure independently: a native-text answer block prints question numbers and answer
letters as a multi-column grid (e.g. five columns of 25 rows each), and `pdftotext`
extracts it as one linear stream with the columns interleaved — a run of `26 27 28 b 29 d
30 C d 31 b b 32 33 C a a a a a C b b b d …` where the numbers and letters are no longer
reliably paired, or, worse, most of the grid is simply dropped and only a bare column of
loose letters survives (`scripts/alexandria/pagetext/src_a2ec24de7b5561128fed.json`'s last
page: 21 letter tokens, zero question numbers, against a 50-question bank).

**Diagnosis.** `pdftotext -bbox-layout -f <page> -l <page> <file> -` on every affected page
shows every word's bounding box collapsed into a sliver a couple of points wide near the
page's origin (`xMin`/`xMax` around 1.0–2.4, the whole page's content squeezed into `yMin`
0.27 through `yMax` 44, on an 802-point-tall page) — regardless of the true, much larger
page size. That is not something any `pdftotext` flag can see past: `-layout` (the default
this tool's `native_page` has always used), `-raw` (content-stream order), `-fixed <n>`
(fixed-pitch/tabular assumption) and `-colspacing <n>` all read the *same* embedded
coordinates and so all produce byte-identical output on every affected page — confirmed
directly, not inferred. The embedded text layer on these pages is a prior OCR bake-in (the
terminology lane's own note: "CamScanner OCR baked into text layer"; several of the anatomy
banks end `Scanned with CamScanner`), and that prior OCR pass wrote its recognised words
with degenerate position metadata. `pdftotext`'s layout reconstruction is only as good as
the coordinates it is given; these are not real coordinates, they are noise, so no
re-invocation of `pdftotext` against the same file can recover the row order.

**`pagetext.py --layout`** (added for this finding) runs an explicit second
`pdftotext -layout` pass into `<sourceId>.layout.json`, beside — never over — the plain
`<sourceId>.json`, and records `identicalToPlainCache` so the answer is written down rather
than re-derived by eye each time. Tested against all 7 banks this affects so far
(2 AU-MED-102 Terminology, 5 AU-MED-105 Anatomy): **`--layout` changed nothing on any of
them** — every one comes back `identicalToPlainCache: true`. This matches the diagnosis:
the flag cannot fix a coordinate problem in the source file.

**The remedy is not automated.** Per the anatomy lane's own citation of
SHARED-TOOLCHAIN.md's "Recovering an answer key" procedure — "resolve the label from its
position in the sequence, never from its shape" and "confirm any suspected mark at 200
dpi" — reconstructing a jumbled table from a linear text dump risks a wrong-letter error
that is worse than recording no key at all. The working path is to render the affected
page (`pdftoppm -r 200 …`, or open the PDF directly) and read the grid by eye, column by
column, exactly as printed; a render-based *automated* reconstruction was tried during this
finding (tesseract at several `--psm` settings, and a naive TSV word-position clustering)
and none of it reliably survived the source pages' own ruled table lines, skew and shadow
— so this tool does not attempt one, and a lane hitting this should not either. Record the
recovered mapping as a manual finding in the triage doc, not as a cache re-extraction.

## What Alexandria does instead of copying Kasr's MCQ triage pipeline

LANE-BRIEF.md §16 asks this lane to look at commit `bec5510`'s MCQ triage
pipeline (`seeds/mcq/<module-slug>/`, `extract/<module-slug>/mcq-bank.json`)
and copy an equivalent **only if it runs without Kasr-specific registries** —
otherwise describe what a lane does by hand. It does not run without them.
This file is the "describe by hand" half of that instruction.

## What was inspected

Three stages, chained:

1. **`scripts/kasr/extract/mcq.py`** — OCRs/extracts raw MCQs (stem, lettered
   options, printed answer where present) out of a module's question-book
   PDFs into `extract/<module-slug>/mcq.json`.
2. **`scripts/kasr/extract/bank.py`** — deduplicates `mcq.json` by normalised
   stem + option set into `extract/<module-slug>/mcq-bank.json`, flagging
   variants and answer conflicts rather than silently resolving them.
3. **`scripts/kasr/seeds/mcq/<module-slug>/*.ts`** (hand-authored "leaf"
   files, one per subject-tree leaf) + **`scripts/kasr/build-batches.ts`** —
   an author reads the bank leaf by leaf, mints a concept per idea tested,
   writes why each option is right or wrong, and the build step turns that
   into the actual concept/article-link/question batches the importer reads.

## Why none of the three stages copies cleanly

| Stage | What it imports that Alexandria does not have |
|---|---|
| `mcq.py` | `kasr_module.py`: a hard path to `docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json` (one file, not four), a `module_sources()` helper keyed on Kasr manifest field names (`sourceCategory`, `secondaryModule`) that do not exist in the Alexandria manifest schema (Alexandria's field is `category`, and there is no `secondaryModule` — the manifest README says this corpus's departments are reliable enough that Kasr's "a file can serve two modules" case does not apply here). Also keeps its own private page-render cache, separate from the shared `pagetext.py` cache. |
| `bank.py` | `leaves.py`: a **hand-built, per-Kasr-module keyword table** mapping question stems onto that module's own subject-tree leaves (`TREE_101`, `TREE_104`, …), built by hand against each Kasr department book's own chapter structure. Alexandria's department books are different books with different chapters — this table cannot be reused, only re-built from scratch per module, which is triage work for the authoring lanes, not tooling. `bank.py` also imports `kasr_module.py`, same issue as above. |
| `build-batches.ts` | `seeds/registry.ts` (Kasr's own paper-registration table — "103 BMS has no paper registered yet, so an MCQ leaf is currently the only thing that makes the build runnable"), `seeds/articles.ts` (`ARTICLE_FOR_CONCEPT`, a Kasr concept→article map), `seeds/sittings.ts` (`SITTING_SIGNALS`), `seeds/links.ts`, and `./emit.ts`'s `mcqConceptBlock`/`mcqBlock`/`conceptBlock`, which call `mintConceptId`/`mintQuestionId` from `seeds/types.ts` — the `kau:`-flavoured mint LANE-BRIEF.md §4 says this lane must not copy. Even `seeds/mcq.ts` itself (the `McqLeafSeed`/`McqConcept` type definitions) imports `KasrSubject` from `./types.ts`, so even the *types* pull the mint file in. |

In short: stage 1 and 2 assume a manifest shape Alexandria's manifest does
not have, stage 2 additionally needs a subject-tree keyword table that is
irreducibly per-corpus content, and stage 3 needs four registries
(`registry.ts`, `articles.ts`, `sittings.ts`, `links.ts`) plus the mint that do
not exist for Alexandria and are out of this lane's scope to build (this lane
is extraction tooling, not the authoring pipeline). Building Alexandria
equivalents of all four registries is a content-programme decision, not a
tooling copy, and nothing in the brief asks this lane to design them.

## What an Alexandria lane does instead, by hand

There is no `mcq-bank.json` and no leaf-file scaffolding for Alexandria. A
concept/article/question lane triages a module's MCQ papers directly against
the cached page text this lane produced in Part A:

1. **Find the module's question sources.** Filter the manifest (any of the
   four `au-*-sources.json` files) on `moduleId` and `category ==
   "Department Questions"` (or `"End of Module paper"` / `"End of Module
   answers"` / `"End of Year paper"` where present) — exactly what
   `scripts/alexandria/extract/pagetext.py --module <id> --category <name>`
   already filters on. **Also grep the `Department Questions` rows for a
   filename starting with `EOM` or `EOY`** — this run found real EOM papers
   miscategorised as plain `Department Questions` for AU-MED-102 and
   AU-MED-105 (see `PROGRESS.md`), so trusting the `category` field alone
   under-counts a module's actual exam papers.
2. **Read the cached page text**, not the PDF — `scripts/alexandria/pagetext/<sourceId>.json`,
   built by `pagetext.py` in Part A. `PRE-EXTRACTED.md` in this directory
   lists every source already cached for the four priority Year 1 modules,
   with word counts, so a lane can see at a glance what is available before
   running the extractor itself.
3. **Deduplicate by eye across sittings**, per LANE-BRIEF.md's exam-signal
   rules: a `مصريين`/`Egyptian` paper and a `وافدين`/`wafdeen` paper are the
   same sitting's two streams, not two years; a four-digit number in a
   filename is a graduating cohort, not a sitting year (leave the year field
   empty unless the paper's own header prints one). Two papers asking the
   same question in different words are one occurrence for blueprint
   purposes, the same rule Kasr's `bank.py` encodes mechanically — here it is
   a judgement call made while reading, not a script.
4. **Recover the answer key** per SHARED-TOOLCHAIN.md's "Recovering an answer
   key: one decision procedure" before recording any correct answer — answer
   keys hide in highlights, a separate `answers` file, or a mock's second
   half; a mark on every option is not a key.
5. **Author concept → article → question in that order**, per LANE-BRIEF.md
   §10/§16: for each question worth keeping, name (or mint, after the key
   search in §16) the concept it tests, write the article that teaches it if
   none exists yet, then the question — with `explanation_<correct>` as the
   full worked teaching moment LANE-BRIEF.md §10 requires, and the question
   ID recorded in the concept's `field_notes` / article's `question_ids` so
   the trace back to a real question is auditable, per the same section's
   scope test.
6. **Mint concept IDs with the manual's own tool**,
   `Instruction Manual for Content Creation/tools/mint-concept-id.mjs` — never
   the Kasr `mintConceptId`/`mintQuestionId` this lane deliberately did not
   copy — after the mandatory `find-existing.mjs` + `grep -ril` key search in
   LANE-BRIEF.md §16.
7. **Run the evidence tooling this lane did build** —
   `scripts/alexandria/build-evidence.ts` and `scripts/alexandria/build-spans.ts`
   (see their own header comments) — once the concept and article batches
   exist, to generate the claims/citations/spans that back each concept's and
   article's assertions against the cached department-book text.

None of steps 3-6 above is mechanical the way Kasr's leaf files are — they are
judgement calls an author makes while reading, which is exactly what
`seeds/mcq/<module>/*.ts` also is (a human writing `explanations`, `pitfall`,
`primary`/`secondary` node placement by hand into a typed template). The
difference is only that Kasr wrapped that authoring step in a typed leaf file
plus a generator; Alexandria's authoring lanes write the same judgement
straight into the manual's own batch-file format, because there is no
Alexandria-side registry/mint infrastructure for a generator to target yet.
