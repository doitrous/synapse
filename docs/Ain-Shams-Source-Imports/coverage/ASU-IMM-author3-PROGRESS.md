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

## Commit 3 — Ashraf Pt2 Exam II, all 15 Qs. DONE.

7 new concepts (monocyte→macrophage, NK-cell viral/tumor killing, lymph-node
activation site, CD3-absent-on-B-cells, IgA respiratory-mucosal protection,
Th17-neutrophil extracellular-bacteria clearance, TCR alpha-beta-heterodimer
structure) — the other 8 of 15 questions reuse concepts already minted
across Block A and this branch's own Humoral/Exam-I commits.
`QST-ASU-IMM-084`..`098`.

One more `library_ids` coverage fix after first `medical:batch` pass:
superantigen's real teaching article is `ART-ASU-IMM-ANTIGENS-AND-MHC`, not
`ART-ASU-IMM-T-CELL-BIOLOGY` (guessed wrong again — always grep the
concept's own `## article_ids` line before setting a question's
`library_ids`, do not infer from topic).

Validation: `medical:batch` questions `--with` concepts+article+resources+
sources: 0 errors, fieldsUsed 49. `medical:simulate` (positional, all 8
files): concepts `created:72, updated:3`, claims/citations `created:72`
each, spans unchanged at 6, questions `created:98`. **0 errors, 0
rejected, 0 skipped.** `medical:audit`: **0 errors.** `medical:concept-ids`:
exit 0, no rival ids. `medical:duplicate-keys`: 0 canonical-key collisions.
`medical:validate:authoring`: 0 errors.

## Commit 4 — Ashraf Pt2 Extra section, all 15 Qs. DONE.

**Ashraf Pt2 (all 62 questions across Humoral/Exam I/Exam II/Extra) is now
fully authored.** 5 new concepts needed for Extra (Th1-IL-2 source,
B+dendritic-cell antigen presentation to helper T cells, clonal-expansion
purpose, antibody-opsonization-complement defense against extracellular
bacteria, naive-B-cell IgM+IgD co-expression) — the other 10 of 15 reuse
concepts already minted across Block A and this branch's Humoral/Exam-I/
Exam-II commits. `QST-ASU-IMM-099`..`113`.

Two more printed-source oddities kept as printed, not silently corrected
(both confirmed by direct high-dpi image reads, not OCR artefacts): Extra
Q4 prints options a,b,c,e with no "d" letter at all (renumbered a-d here,
noted in author_notes); Extra Q14 prints "mature NAIVE T cells" in its stem
but keys IgM+IgD (unambiguously the B-cell receptor fact) as correct — kept
as printed, with the concept and explanation naming the real underlying
fact.

Got every `library_ids`/`article_ids` coverage link right on the first
`medical:batch` pass this time (grepped each concept's own `## article_ids`
line before assigning `library_ids`, instead of guessing from topic, per
the lesson from the two earlier misses).

Validation: `medical:batch` questions `--with` concepts+article+resources+
sources: 0 errors, fieldsUsed 49 (first pass, no fixes needed).
`medical:simulate` (positional, all 8 files): concepts `created:77,
updated:3`, claims/citations `created:77` each, spans unchanged at 6,
questions `created:113`. **0 errors, 0 rejected, 0 skipped.**
`medical:audit`: **0 errors.** `medical:concept-ids`: exit 0, no rival ids.
`medical:duplicate-keys`: 0 canonical-key collisions. `medical:validate:authoring`:
0 errors.

## Full branch totals (asu-imm-author6, all 4 commits)
- 33 new concepts (14 Humoral + 4 Exam I + 7 Exam II + 5 Extra + this
  branch's own 3 shared-across-sections reuses already counted once) + 3
  sparse updates onto live concepts (colostrum `CON-GYN-B5C12E798C9C48`,
  opsonization `CON-IMM-5AE67E0CE9228C`; perforin `CON-IMM-7EBC289118B06C`
  was already sparse-updated by the prior `asu-imm-author2` commit and
  reused here, not re-updated).
- 1 new article (`ART-ASU-IMM-HUMORAL-IMMUNITY`), two-sided linked into
  `ART-ASU-IMM-T-CELL-BIOLOGY` and `ART-ASU-IMM-ANTIGENS-AND-MHC`.
- 33 claims + 33 citations + 1 span.
- 62 new questions (`QST-ASU-IMM-052`..`113`), completing all of Ashraf
  Part 2. Every explanation ≥3 sentences on the correct answer, every
  distractor explained.
- Starting state was 47 concepts / 5 articles / 51 questions (Ashraf Pt1 +
  cytokines.pdf); ending state is 80 concepts / 6 articles / 113 questions.

## Remaining OWED (next sitting, per the original module OWED list)
- **Ashraf Pt2 is fully done — nothing left there.**
- hegazy.pdf (~101 Qs, 6 chapters): still block-level triage only in
  `coverage/ASU-IMM-triage.md` §B; full per-question OCR/keying and
  authoring not started. The triage notes dense embedded mini-answer-keys
  after every 5-8 questions with only small gaps (<5 Qs unkeyed, right-edge
  scan cutoff) — same 220dpi-direct-image-read approach as Ashraf Pt1/Pt2
  should work.
- Bg. MCQs immune.pdf, the 241-Q generic external bank: still block-level
  triage only. 180/241 questions have a printed key (Q1-180); the other 61
  (Q181-241 — hypersensitivity tail, autoimmunity, transplant,
  immunodeficiency blocks) have **no printed key anywhere in the file**
  (confirmed: the key page is physically repeated 3× instead of a second
  page continuing past Q180). Per Standing Order 4 ("missing key → key
  editorially with field_note"), before authoring these 61 either (a)
  cross-check against hegazy/Ashraf for the same fact keyed elsewhere, or
  (b) key editorially with a field_note — needs the orchestrator's ruling
  before authoring, not a unilateral call.
