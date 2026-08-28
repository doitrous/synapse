# 104 CPS — MCQ leaves

A leaf file here is one subject-tree leaf's worth of multiple-choice triage: it
exports a single `LEAF` constant (`McqLeafSeed`, declared in `../mcq.ts`) naming
the leaf, its `modulePath` in the 104 CPS subject tree, the article that
teaches it, the concepts an author has minted while reading the leaf's
questions, and — for every question worth keeping — which concept it tests,
why each option is right or wrong, a difficulty and question type, and
(when the extracted answer is missing or wrong) an `answerOverride` with a
reason, or an `exclude` with a reason. `_example.ts.txt` is 101 ISK's smallest
real leaf (`Myo Epithelium`, one concept, one question), copied here verbatim
as a template — rename it to `<leaf-slug>.ts` and rewrite its content against
104's own bank and department books; do not import it as-is.

The bank this module's leaves are triaged against is
`scripts/kasr/extract/104-CPS/mcq-bank.json` (1,289 rows under `questions`,
plus 32 matching-question rows under `matching`). Unlike 102 INT and 103 BMS,
this bank is in the *same* shape as 101 ISK's own — extracted by `bank.py`
rather than by `extract/102-INT/mcq.py` — so a leaf's `questions[].key` matches
one bank row's `key` field directly (a stem-derived slug, not an `id`), options
are upper-case letters, and every row already carries `occurrences` and
`timesAsked` deduplicated across however many books repeat the question; no
normalisation runs for this module's bank. Build with
`node --experimental-strip-types scripts/kasr/build-batches.ts "104 CPS"`.
104 CPS already has a written paper registered in
`scripts/kasr/seeds/registry.ts`, so the build runs today with an empty leaf
directory — it just skips the MCQ route and says so on stderr.
