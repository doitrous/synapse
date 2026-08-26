# 102 INT — MCQ leaves

A leaf file here is one subject-tree leaf's worth of multiple-choice triage: it
exports a single `LEAF` constant (`McqLeafSeed`, declared in `../mcq.ts`) naming
the leaf, its `modulePath` in the 102 INT subject tree, the article that
teaches it, the concepts an author has minted while reading the leaf's
questions, and — for every question worth keeping — which concept it tests,
why each option is right or wrong, a difficulty and question type, and
(when the extracted answer is missing or wrong) an `answerOverride` with a
reason, or an `exclude` with a reason. `_example.ts.txt` is 101 ISK's smallest
real leaf (`Myo Epithelium`, one concept, one question), copied here verbatim
as a template — rename it to `<leaf-slug>.ts` and rewrite its content against
102's own bank and department book; do not import it as-is.

The bank this module's leaves are triaged against is
`scripts/kasr/extract/102-INT/mcq-bank.json` (1,102 rows, under `items`, one
row per printed sighting rather than deduplicated across books — see the
`RawV2Item` normalisation notes in `build-batches.ts`'s `loadBank`). A leaf's
`questions[].key` must match one bank row's `id` field (e.g.
`"MCQ-102-07f0a0ff-p5-q1"`), not a `key` — this bank has no `key` field, unlike
101's. Build with `node --experimental-strip-types scripts/kasr/build-batches.ts "102 INT"`.
102 INT already has written papers registered in `scripts/kasr/seeds/registry.ts`,
so the build runs today with an empty leaf directory — it just skips the MCQ
route and says so on stderr. A module with no registered paper at all still
needs *something* here before it builds: `build-batches.ts` refuses to run for
a module with neither a registered paper nor an MCQ leaf.
