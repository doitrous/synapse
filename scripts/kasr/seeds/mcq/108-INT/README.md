# 108 INT — MCQ leaves

A leaf file here is one subject-tree leaf's worth of multiple-choice triage: it
exports a single `LEAF` constant (`McqLeafSeed`, declared in `../mcq.ts`) naming
the leaf, its `modulePath` in the 108 INT subject tree, the article that
teaches it, the concepts an author has minted while reading the leaf's
questions, and — for every question worth keeping — which concept it tests,
why each option is right or wrong, a difficulty and question type, and
(when the extracted answer is missing or wrong) an `answerOverride` with a
reason, or an `exclude` with a reason. `_example.ts.txt` is 101 ISK's smallest
real leaf (`Myo Epithelium`, one concept, one question), copied here verbatim
as a template — rename it to `<leaf-slug>.ts` and rewrite its content against
108's own bank and department books; do not import it as-is.

**No usable bank exists for this module yet.** `build-batches.ts` looks for
`scripts/kasr/extract/108-INT/mcq-bank.json` and there is only
`scripts/kasr/extract/108-INT/mcq.json` — a third, unrelated shape (rows keyed
by `sourceId`/`page`/`number` rather than by `key` or `id`, with `answer:
null` on all 86 recovered MCQ rows: "the book marks its answers on a
bubble-grid page", per its own `totals.answerKeyCoverage`). `loadBank` in
`build-batches.ts` only recognises the `bank.py` shape (`questions`, as 101 ISK
and 104 CPS have) and the `extract/102-INT/mcq.py` shape (`items`, as 102 INT
and 103 BMS have); it does not read `mcq.json`, and none of its 86 rows carry
an answer to author against regardless. Producing a real
`extract/108-INT/mcq-bank.json` — deduplicated, with answers recovered from
whatever answer key exists for the bubble-grid papers — is a prerequisite for
this directory, not something a leaf file can work around. Until then,
`node --experimental-strip-types scripts/kasr/build-batches.ts "108 INT"` skips
the MCQ route (it says so on stderr) once this module has at least a leaf file
or a registered paper to build from.
