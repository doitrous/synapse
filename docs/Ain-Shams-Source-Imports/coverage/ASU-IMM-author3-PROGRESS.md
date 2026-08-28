# ASU-IMM authoring — branch `asu-imm-author6` — progress log

Continuation of ASU-IMM (Immunology) past `asu-imm-author2`. That branch and its
siblings (`asu-imm-author3/4/5`) were never pushed to origin — all four sat as
identical local worktree branches at commit `8538625c` (47 concepts / 5
articles / 51 questions, Ashraf Pt1 + cytokines.pdf). This branch starts fresh
off that same commit under a new name to avoid colliding with those stale
worktrees.

## OWED at start (per CLAIMS.md + coverage/ASU-IMM-triage.md)
- Ashraf Part 2 (`MCQs - Bg Immune Dr.Ashraf mcq part 2.pdf`, 18pp): 62 Qs,
  fully keyed — Humoral(17) + Exam I(15) + Exam II(15) + Extra(15).
- hegazy.pdf (~101 Qs, 6 chapters, block-level triage only).
- Bg. MCQs immune.pdf (241 Qs generic bank, Q181-241 unkeyed — needs a ruling).

## This session (commit 1)
**Ashraf Pt2 — Section I (Humoral immune response), all 17 Qs. DONE.**

All 62 Pt2 questions were re-verified against 220dpi direct page-image reads
of the actual PDF (`MCQs - Bg Immune Dr.Ashraf mcq part 2.pdf`), not the raw
tesseract OCR, which mis-read several stems/options (confirmed against
`/private/tmp/asu-ocr/imm/BLOCK-A-KEYS.md`, itself image-verified by a prior
agent). Two genuine printed oddities found and kept as printed (not silently
corrected): Humoral Q5 prints "Hyperdoma" for what is standardly "hybridoma";
Extra Q14 prints "T cells" for what its own key (IgM+IgD) makes clearly a
B-cell-receptor fact, and Extra Q4 prints options a,b,c,e with no "d" at all
(renumbered a-d for our 4-answer schema, noted in field_notes).

Produced:
- 14 new concepts + 1 sparse update (`CON-GYN-B5C12E798C9C48`, colostrum,
  live-hit found via find-existing.mjs) in
  `concept/ASU-IMM-immunology-concepts.md`.
- 1 new article `ART-ASU-IMM-HUMORAL-IMMUNITY` in
  `article/ASU-IMM-immunology-articles.md`, two-sided linked to
  `ART-ASU-IMM-T-CELL-BIOLOGY` and `ART-ASU-IMM-ANTIGENS-AND-MHC`.
- 14 claims + 14 citations + 1 span in the evidence files.
- 17 questions (`QST-ASU-IMM-052`..`068`) in `question/ASU-IMM-immunology-mcq.md`.

**Reuse, not re-mint** (per Minting rule / search-before-mint): 3 of 17
Humoral questions point at concepts that already existed before this commit —
`CON-IMM-5D0DFF26A97616` (secondary-vs-primary response, already tested by an
Ashraf1 question; found via its own `exam_signal` note already anticipating
"Ashraf Pt2 Humoral Q10"), `CON-GYN-B5C12E798C9C48` (colostrum, live, sparse
overlay), and the CD40 live-hit `CON-IMM-162267AD1BF293` was inspected and
kept as a *related*, not merged, concept (general CD40L activation vs. the
specific isotype-class-switch trigger this batch tests — a sibling, not a
duplicate, matching the triage's own call).

## Validation (this commit's own gate lines — see report for full paste)
- `medical:batch` concepts: 0 errors, fieldsUsed 54.
- `medical:batch` article: 0 errors, fieldsUsed 52.
- `medical:batch` questions `--with` concepts+article+resources+sources:
  0 errors, fieldsUsed 49.
- `medical:simulate` (positional, all 8 files: sources, resources, concepts,
  article, claims, citations, spans, questions): concepts `created:61,
  updated:2`, articles `created:6`, claims `created:61`, citations
  `created:61`, spans `created:6`, questions `created:68`. **0 errors, 0
  rejected, 0 skipped.**
- `medical:audit` on that emit: **0 errors.**
- `medical:concept-ids`: exit 0, "no rival ids".
- `medical:duplicate-keys`: 0 canonical-key collisions for this file (1
  pre-existing, unrelated aspirin/Kasr label collision noted by the tool,
  nothing to do with ASU-IMM).
- `medical:validate:authoring`: 0 errors in every category.

## Bugs found and fixed in my own draft (documented for the next sitting)
1. A line that is exactly `---` inside a multi-line field value (I had
   combined two questions' `original_wording`/`support_span` with a `---`
   divider) gets read by `validate-content-batch.mjs`'s
   `text.split(/^\s*---\s*$/m)` as a record separator, silently corrupting
   every subsequent item's field alignment. Fixed by using a plain-text divider
   instead of a bare `---` line inside any field value — never combine two
   quotes with a literal `---` line.
2. `field_notes` keys must be **one per line**, exact camelCase, e.g.
   `microtopicId: ...` on its own line. A combined line like
   `subtopicId/microtopicId/nanotopicId: none supplied.` parses as a single
   bogus key and satisfies none of the three — `medical:audit` flags all
   three as "blank without an explicit reason". Every field that can be left
   blank (`arabicLabel`, `arabicAliases`, `subtopicId`, `microtopicId`,
   `nanotopicId`, `approvedFileResourceIds`, `approvedVideoResourceIds`,
   `resourceOccurrenceIds`, `sourceCandidateIds`, `mergeIds`, `lastReviewed`,
   `reviewDue`, `exclusionReason`, `uncertainty`) needs its own line.
3. `related_article_ids` on a concept is also gated by
   `medical:audit` the same way (blank needs either a real value or a
   `relatedArticleIds:` field_note) — it is not merely decorative.

## Remaining OWED (next sitting)
- Ashraf Pt2 — Exam I (15 Qs), Exam II (15 Qs), Extra (15 Qs) = 45 Qs left.
  Full stems/options/keys for all 45 are already transcribed and verified
  (direct image reads) in this session's transcript; the concept-reuse map
  against both the pre-existing 47 concepts and this commit's 14 new ones is
  already worked out — most of Exam I/II/Extra reuses existing concepts
  (only ~11 new concepts needed across all 45, several shared with each
  other and with 3 of this commit's Humoral concepts via `exam_signal`
  cross-references already written in). Re-derive quickly from this file's
  git history / the dispatching session's transcript rather than re-doing
  the image reads.
- hegazy.pdf and the 241-Q generic bank: still block-level triage only,
  full per-question authoring not started.
