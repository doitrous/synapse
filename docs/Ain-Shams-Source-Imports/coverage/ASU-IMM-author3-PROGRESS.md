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

## Commit 2 — Ashraf Pt2 Exam I, all 15 Qs. DONE.

4 new concepts (`cytokine.il2.excluded-from-acute-phase-trio`,
`antibody.structure.fab-idiotype-fc-effector`, `antibody.idiotype.variableregion-both-chains`,
`igm.diagnostic.intrauterine-infection-marker`) + 1 sparse update onto live
opsonization concept `CON-IMM-5AE67E0CE9228C` (find-existing.mjs "opsonization"
hit). 11 of 15 Exam I questions reuse concepts already minted (7 pre-existing
from Block A, 2 new from this branch's own Humoral commit, 1 live sparse-update
from Block A's perforin overlay) — only 4 genuinely new concepts needed for the
whole section. `QST-ASU-IMM-069`..`083`.

Two `article_ids`/`related_concepts` coverage fixes needed after first
`medical:batch` pass (both because a question's `library_ids` must match one
of the concept's own registered `article_ids`, or the reverse-link via an
article's `related_concepts`, not just "some article exists"):
eosinophil's real teaching article is `ART-ASU-IMM-CELLS-OF-INNATE-IMMUNITY`,
not `ART-ASU-IMM-INNATE-BASICS`; the opsonization sparse-update concept
carries no `article_ids` of its own (it is a partial overlay on a live
record), so it was added to `ART-ASU-IMM-INNATE-BASICS`'s `related_concepts`
for the reverse-link.

Validation: `medical:batch` questions `--with` concepts+article+resources+
sources: 0 errors, fieldsUsed 49. `medical:simulate` (positional, all 8
files): concepts `created:65, updated:3`, claims/citations `created:65`
each, spans unchanged at 6, questions `created:83`. **0 errors, 0 rejected,
0 skipped.** `medical:audit`: **0 errors.** `medical:concept-ids`: exit 0,
no rival ids. `medical:duplicate-keys`: 0 canonical-key collisions.
`medical:validate:authoring`: 0 errors.

Note: `medical:batch` run directly on `evidence/*-citations.md` with
`--with` the sources/resources files reports "not a source the corpus
contains" for every row, including the original, already-passing Block A
rows — this is a pre-existing tool limitation in how citations resolve
`resource_id` via `--with` (unrelated to this branch's content); the real
gate for the evidence chain is `medical:simulate`, which resolves it
correctly and passed 0 errors.

## Remaining OWED (next sitting)
- Ashraf Pt2 — Exam II (15 Qs), Extra (15 Qs) = 30 Qs left. Full
  stems/options/keys for both sections are already transcribed and verified
  (220dpi direct image reads) in this branch's authoring session; most
  reuse concepts already minted across the Humoral/Exam-I commits (per the
  concept-reuse map: `CON-IMM-A89092F59B7397` for E2-4 neutrophil-PRR,
  `CON-IMM-823F05209D7145` for E2-5 hapten, `CON-IMM-D981D07A61E9FE` for
  E2-7 MHC-I cytosol, `CON-IMM-521ADF1111D704` for E2-8 superantigen,
  `CON-IMM-D1DF4147B03986` for E2-3 idiotype (this branch), `CON-IMM-19D6B87A141F6D`
  for E2-14 CD4/CD8, `CON-IMM-2AFB94649004DE`/`CON-IMM-7C76D5D920C47C` for
  E2-10/E2-9, `CON-IMM-FD2151E25121CF` for X3/X13 (Th1 NOT bind soluble Ag),
  `CON-IMM-17CE429C40F7BD` for X1, `CON-IMM-282B44B64B1FD2` for X4,
  `CON-IMM-F4A968204B2571` for X5/X10, `CON-IMM-4D425614619A4B` for X8,
  `CON-IMM-AB38F5017A2AB9` for X12). Roughly 6 genuinely new concepts still
  needed (monocyte→macrophage, NK-cell viral/tumor killing, lymph-node
  activation site, CD3-absent-on-B-cells, IgA mucosal-respiratory
  protection, Th17-neutrophil extracellular-bacteria clearance, TCR
  alpha-beta heterodimer structure, IL-2/Th1-source, B+dendritic-cell
  antigen presentation, clonal-expansion purpose, naive-BCR IgM+IgD — some
  of these were already minted in this session's exploratory pass and can
  be reused directly; re-derive the exact ids from this session's transcript
  rather than re-searching).
- hegazy.pdf and the 241-Q generic bank: still block-level triage only,
  full per-question authoring not started.
