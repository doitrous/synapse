# MCQ seed contract

The agent writes the medicine — stem, options, explanations, concept choice.
`emit-mcq.mjs` writes the format: the hand-authored ASU/AU field order,
correctly serialised list/object columns, a deterministic id when none is
given. Never hand-edit the generated `.md`; fix the seed and re-emit.

## Shape

```json
{
  "lane": "ASU-MBG",
  "cluster": "cancer",
  "header": "ASU-MBG · Molecular Biology of Cancer — authored from the ASU-MBG Cancer chapter question bank, keys read from the printed answer table p.30.",
  "defaults": {
    "subject": "fnd",
    "status": "Draft",
    "owner": "Claude",
    "universities": ["asu"],
    "years": ["ASU_Y1"],
    "module": "ASU-MBG",
    "module_subject": "ASU-MBG > Molecular Biology > Cancer",
    "exam_weight_by_year": { "ASU_Y1": "high" },
    "question_only_for": "",
    "library_ids": [],
    "resource_ids": ["src_…"],
    "source_citation": "MBG bank, Cancer chapter, p.{page}",
    "setting": "Academic",
    "estimated_seconds": 60,
    "randomise_answers": true
  },
  "questions": [
    {
      "key": "cancer-q01",
      "id": "QST-ASUMBG-CANCER-Q01",
      "page": 12,
      "title": "Which gene is a tumour suppressor?",
      "question": "Which of the following is a tumour suppressor gene?",
      "options": { "A": "RAS", "B": "TP53", "C": "MYC", "D": "BCR-ABL" },
      "correct": "B",
      "explanations": {
        "A": "Incorrect. RAS is a proto-oncogene …",
        "B": "Correct. TP53 encodes p53, which … (three or more sentences)",
        "C": "Incorrect. MYC …",
        "D": "Incorrect. BCR-ABL …"
      },
      "main_concept": "CON-GEN-…",
      "concept_ids": ["CON-GEN-…"],
      "contextual_concept_ids": [],
      "topic": "Molecular biology of cancer",
      "subtopic": "Tumour suppressor genes",
      "difficulty": "Moderate",
      "question_type": "Classification",
      "cognitive_effort": "Low",
      "reasoning_level": 1,
      "learning_objective": "Distinguish tumour suppressor genes from proto-oncogenes.",
      "media_recommendations": "",
      "library_ids": ["ART-A"],
      "module_subject": "ASU-MBG > Molecular Biology > Cancer, TP53 subsection",
      "source_citation": "TP53 review, p.{page}",
      "field_notes": { "keySource": "printed answer table p.30", "asu": "MBG bank p.12" },
      "author_notes": ""
    },
    { "key": "cancer-q02", "hold": "printed key conflicts with the stem (B vs D on the answer sheet)" }
  ]
}
```

The full example above (`scripts/content/fixtures/seed/ASU-MBG-cancer-example.json`)
is the fixture the tests run against — it doubles as documentation.

## Defaults are per-field, and any default can be overridden per question

`defaults` sets the value each emitted field falls back to when a question
doesn't say otherwise. Every emitted field resolves independently as
`question[key] ?? defaults[key] ?? <built-in empty>` — a question that sets
its own `library_ids`, `module_subject`, `source_citation`, or any other key
that also appears in `defaults` (including list/object fields like
`resource_ids`, `universities`, `years` and `exam_weight_by_year`) is not
merged with the default, it replaces it outright, and every other field
still falls back to `defaults` as usual. This is what lets one seed file
hold a cluster whose questions cite different articles or pages: put the
common case in `defaults.source_citation` and give the odd ones out their
own `source_citation` (and `page` — see below) directly on the question.
`{page}` substitutes into whichever `source_citation` wins, from that same
question's own `page` (falling back to `defaults.page` if the seed sets
one) — a question can set `source_citation`, `page`, both, or neither.

## Enforced rules (exit 1 with `error: <key>: <reason>`, nothing written)

- `correct` must be one of the option letters actually present in `options` (4 or 5 of A–F).
- Every filled option needs a matching entry in `explanations`.
- `explanations[correct]` must contain 3 or more sentences (counted on `[.!?]` followed by whitespace or end of string).
- No option value may start with `+` (that character means "append" everywhere else in a batch cell, so a stray leading `+` on an option is refused rather than silently stored).
- No field value may contain a line that is exactly `---` (the batch format's own record separator).
- `id` defaults to `QST-<LANE without dashes>-<CLUSTER upper>-<KEY upper, non-alnum→'-'>` when the seed omits it. Give an explicit `id` for anything that must not shift if the key is renamed.
- A question entry with `"hold": "<reason>"` emits nothing into the batch. It still counts in the ledger (see below) so the hold is visible without re-deriving it.

## Field order and the `field_notes` fold

`FIELD_ORDER` is copied verbatim from the first record of
`docs/Ain-Shams-Source-Imports/question/ASU-IBM-protein-chemistry-mcq.md`.
That file — and the real question import contract in
`src/data/bulkImport.ts` (`IMPORT_SCHEMAS.question.fields`) — has **no**
`field_notes` column; `field_notes` exists only on concept/relation records.
Writing one anyway would fail `medical:batch` with `unknown column
"field_notes"`, which is not one of the placeholder errors the fixture is
allowed to carry. So a seed's `field_notes` (one `camelCaseKey: value` per
line) are folded into `author_notes` instead — also internal, never shown to
a student — ahead of any `author_notes` text the seed itself supplies.

## Commands

```
node scripts/content/emit-mcq.mjs <seed.json> [--out <batch.md>]
node scripts/content/ledger.mjs <seed-dir> [--triage <keys.txt>] [--out <LEDGER.md>]
node scripts/content/gate.mjs batch <out.md> --with <concept files, article files, …>
```

`ledger.mjs` walks a directory of seed JSON files, groups their questions by
each seed's top-level `cluster`, and counts `authored` (no `hold`) vs `held`
per cluster. With `--triage <keys.txt>` (one key per line, `#` comments
allowed) it also reports `remaining` — triage keys not present in any seed,
grouped by the cluster inferred from the key's prefix before its first
`-qNN`. It prints `| cluster | authored | held | remaining | total |`, a
`## Held` list (`key — reason`), and a `## Remaining` list, and writes the
same text to `--out` when given.

Never hand-edit the generated `.md`; fix the seed and re-emit.
