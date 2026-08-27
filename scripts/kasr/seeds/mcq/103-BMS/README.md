# 103 BMS — MCQ leaves

A leaf file here is one subject-tree leaf's worth of multiple-choice triage: it
exports a single `LEAF` constant (`McqLeafSeed`, declared in `../mcq.ts`) naming
the leaf, its `modulePath` in the 103 BMS subject tree, the article that
teaches it, the concepts an author has minted while reading the leaf's
questions, and — for every question worth keeping — which concept it tests,
why each option is right or wrong, a difficulty and question type, and
(when the extracted answer is missing or wrong) an `answerOverride` with a
reason, or an `exclude` with a reason. `_example.ts.txt` is 101 ISK's smallest
real leaf (`Myo Epithelium`, one concept, one question), copied here verbatim
as a template — rename it to `<leaf-slug>.ts` and rewrite its content against
103's own bank and department books; do not import it as-is.

The bank this module's leaves are triaged against is
`scripts/kasr/extract/103-BMS/mcq-bank.json` (391 rows, under `items`, handed
over from the 102 INT lane's own extraction — see the file's own `note` field).
It shares 102 INT's row shape: one row per printed sighting, keyed by `id`
rather than by `key`, options lettered lower-case (`a`–`d`), and `correct`
rather than `answer` (normalised to `BankRow` by `loadBank` in
`build-batches.ts`; see the `RawV2Item` comment there for exactly which fields
survive and which are approximated — `confidence` and `answerConfidence` in
particular are inferred, not read off the bank directly).

**Before minting a concept, check whether it already exists.** Several 103 BMS
concept files were authored by hand outside this pipeline —
`docs/Kasr-Source-Imports/concept/103-BMS-mcq-*-concepts.md` — and their
`canonical_key` values are real concepts a new leaf should reuse rather than
re-mint under a different key (which would hash to a different id for the same
idea; see `mintConceptId` in `../types.ts`). Build with
`node --experimental-strip-types scripts/kasr/build-batches.ts "103 BMS"`. 103 BMS
has no paper registered in `scripts/kasr/seeds/registry.ts` yet, so an MCQ leaf
in this directory is currently the only thing that makes the build runnable at
all for this module.
