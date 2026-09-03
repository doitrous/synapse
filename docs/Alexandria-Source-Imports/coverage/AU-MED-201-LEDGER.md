| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| finalw1 | 43 | 13 | 48 | 104 |
| mock1 | 26 | 0 | 0 | 26 |

## Held
(none)

## Remaining
(none)

## Image-dependent items excluded during triage, AU-201 Mock exam EGU 2023-2024

Not seeded (no attached figure available in this repository — none authored, none held with
a placeholder question):

- Q9 (two-part item, p5) — first half references a nephron-segment diagram labelled A-D;
  second half references an unlabelled figure for "the affected organ"'s posterior relation.
- Q17 (p10) — references "the attached figure" showing lettered (A-G) structures in the
  ovarian cortex.
- Q22 (p14) — references "the attached figure" for a numbered (1-4) renal tubule segment.
- Q30 (p20) — references "the attached photo" for a numbered (1-4) spermatogenic cell layer.

## AU-MED-201 module opened — au201-author1, 2026-09-03

First authoring pass on this module (previously 0 authored records). Source: "EOM MCQs -
Mock exam EGU 2023-2024 answers.pdf" (src_a6e9adda1ad630d28a55, 27pp, native text,
twinPreferred=true over the OCR-only non-preferred twin), each item keyed from its own
printed "The correct answer is: …" line — the sibling questions-only PDF's bullet-glyph
pseudo-marks were checked and found unreliable (disagree with the answers file's key on the
first two items checked), matching the known AU-MED-203 visual-key trap, so only the
answers file is trusted for this batch.

26 of the paper's ~30 usable items authored (Q1-Q8, Q10-Q16, Q18-Q21, Q23-Q29): 5 anatomy,
3 histology, 18 physiology. 26 new concepts minted (11 endo, 10 renal, 3 gyn, 2 androl)
after a per-item find-existing.mjs search; no live or pending match found for any of the 26
(near-misses on hyperaldosteronism/hypokalemia, pancreatic islets, and ADH were checked and
ruled not genuine hits — different mechanism/angle in each case). 3 department articles
(anatomy, histology, physiology). Q4's printed key (distal convoluted tubule, over the more
commonly cited collecting duct) is kept per LANE-CARD's "printed keys stand, note doubts"
rule, flagged on that concept's own `conflicts` field.

Gate: `medical:batch` 0 errors on every file (question/concept x3/article x3/resource/
evidence-source), after fixing one placement error (`DIS-HIS-T06` is not a canonical node —
Histology & Cell Biology's discipline taxonomy tops out at T05; corrected to `DIS-HIS-T03`,
"Organ histology", the correct fit for pancreatic islets/adrenal cortex/ovary). `medical:
simulate` (9 files, dependency order): created 57, updated 0, rejected 0, errors 0 — matches
26 concepts + 3 articles + 26 questions + 1 resource + 1 evidence-source.

Next frontier: the paper's remaining 5 image-dependent items (Q9/17/22/30, see above) need
the source's attached figures before they can be authored; module still has 6 papers total
(2 stream-specific EOM finals, 1 practical, this Mock pair) and ~127 bank files not
yet triaged — the largest single-department page footprint of any AU Year 2 module
(Physiology, 2158 pages).

## Held items, AU-201 EGU FINAL -27- (wafdeen) paper, Physiology section

Not seeded (below this lane's 4-option SBA floor — the printed key still names a correct
letter, but the item itself carries only 2-3 options):

- Q13 (p3) — "In normal levels, what is the function of thyroid hormone?" — 3 options (A-C).
- Q21 (p3) — "A 24-year-old female patient had galactorrhea..." — 2 options (A-B).
- Q39 (p7) — "What is the effect of Addison syndrome on ACTH?" — 3 options (A-C).

## AU-201 module, second pass — au201-author2, 2026-09-03

Second authoring pass on this module, resuming from au201-author1's HANDOFF. Frontier
surveyed: the module's 5 remaining tier-1 exam papers plus ~127 bank files not yet triaged.
Findings on the 5 papers:

- **`EOM - EGU Practical -27-(مصريين).pdf`** (13pp, native text, src_22c207a95d7ea076697a) —
  61 items, every one a "what is the structure related 'A'/'1'/etc." spot-ID question
  against a labelled prosection/diagram photo not present anywhere in this repository. A
  clean printed answer-key table exists (p13), but per this module's own precedent (the
  Mock exam's Q9/17/22/30, see above) an unavailable-figure SBA item is HELD, not authored
  with a blank `labeling_image` — that exception is reserved for `format: labeling` items
  with hand-placed points (see AU-MED-105's precedent), not standard 4-option SBAs whose
  stem itself is unanswerable without the image. **Whole paper HELD** (61 items) pending
  the source's attached figures.
- **`EOM - EGU End 2028 (مصريين).pdf`** (1pp but dense, native text,
  src_c059086be836c37cbe13) and **`EOM - EGU END 2028 (وافدين).pdf`** (7pp, native text,
  src_6728142c9079b9c45416) — both read in full (Physiology, Biochemistry, Anatomy,
  Histology and — مصريين only — an Integrated section); **no printed answer key found in
  either file**, and no separate "…answers.pdf" twin exists for either in the manifest.
  Per LANE-CARD's "unreliable/no key" HOLD rule, **both papers HELD in full** pending a key
  (a render-verified highlight pass, if any exists, is next-session frontier).
- **`EOM MCQs - EGU FINAL -27- (wafdeen).pdf`** (20pp, native text,
  src_de3dfe0928d063fd37f4) — the international-stream EOM final, 4 sections (Physiology
  Q1-40, Biochemistry Q1-7, Anatomy Q1-29, Histology Q1-28), each with its own printed
  per-section answer table. **This pass authored 20 of the Physiology section's 37 usable
  items** (Q1-Q12, Q14-Q20, Q22 — cluster `finalw1`; Q13/Q21/Q39 held, see above). 16 new
  concepts minted after a per-item find-existing.mjs search (no genuine match for any); 4
  items (Q3, Q5, Q6, Q19) instead reuse an existing physiology concept from the Mock exam
  batch, since each tests the same underlying fact from a different stem. Two printed keys
  diverge from more commonly cited textbook figures and are kept per LANE-CARD's
  printed-key convention, flagged on each concept's own `conflicts` field: Q10 (Tm PAH =
  75 mg/min, texts often cite ~80) and Q18 (LH surge 48h before ovulation, texts often cite
  ~36h). Same physiology department article extended (not a new article) — see its own
  header/notes for the field-by-field breakdown.

  Gate: `medical:batch` 0 errors on question/concept/article/resource/evidence-source (with
  `--with` naming the sibling concept+article+resource files). `medical:simulate`
  (resource→evidence→concept→article→question, dependency order): created 34 concepts + 1
  article + 1 resource + 20 questions against this worktree's local dev snapshot (which
  does not yet carry au201-author1's mock1 batch either — the live-DB import is a separate,
  chief-of-staff-only step per LANE-CARD §2), updated 0, rejected 0, errors 0.

  **Remaining in this paper**: Physiology Q23-Q38 and Q40 (17 usable items — Q39 held); the
  entire Biochemistry (7), Anatomy (29) and Histology (28) sections, none yet triaged for
  option-count/image-dependency.
- **`EOM MCQs - EGU FINAl -27-(مصريين).pdf`** (15pp, native text, src_219779bfa432fe3ac4a8)
  — the Egyptian-stream twin of the paper above (different question content, not a
  byte/content twin), also has its own printed per-section keys (checked: Physiology,
  Biochemistry, Anatomy sections at minimum). **Not yet authored** — next frontier.
- **`EOM MCQs - Mock exam EGU 2023-2024.pdf`** (24pp, questions-only sibling of the
  already-authored `...answers.pdf`, src_efc5a6ba9f077048d2bc, nameTwinOf the non-preferred
  `[from Alexandria University Updated]` copy) — **not opened this pass**; per
  au201-author1's own finding (this sibling's bullet-glyph pseudo-marks disagree with the
  answers file's key), it adds no new trustworthy content over the already-authored mock1
  batch and is not expected to resolve the Mock exam's 4 held image-dependent items (same
  paper, same missing figures). Low priority for a future pass.

Next frontier: `EOM MCQs - EGU FINAl -27-(مصريين).pdf` (full paper, ~90+ usable items
across 4 sections) and this pass's own paper's remaining ~81 items (Physiology Q23-Q40 +
Biochem/Anatomy/Histology sections) are the two largest ungated sources; ~127 bank files
(Physiology 66, Anatomy/Embryology 21, plus Dr Gawad's 155pg "All EGU questions with
answers" bank and others) remain completely untriaged.

## AU-201 module, third pass — au201-author3, 2026-09-03

Third authoring pass, resuming from au201-author2's HANDOFF frontier: the FINAL -27- (wafdeen)
paper's own remaining Physiology items (Q23-Q38, Q40 — 17 usable, Q39 already held) plus its
Biochemistry, Anatomy and Histology sections (untriaged coming in). This pass triaged and
authored the Physiology and Biochemistry sections in full, and triaged (but did not author)
Anatomy and Histology — see next frontier below.

- **Physiology (Q23-Q40)**: 17 of the remaining 18 items usable (Q39 already held); all 17
  authored, finishing the section (37 authored total across all three passes, 3 held — Q13,
  Q21, Q39). 17 new concepts minted (11 endo, 5 renal, 1 gyn) after a per-item find-existing.mjs
  search; no genuine live or pending match for any of the 17, including a specific check
  against Q25's near-miss (the Mock exam's own DKA concept, CON-REN-25DD9CCD2FC30A, pH 7.35) —
  ruled not a genuine merge since that concept's own definition explicitly hinges on a
  low-normal, not frankly abnormal, pH, which Q25's own pH-7.2 vignette would contradict if
  merged; minted a new concept instead. Q25's key (pH 7.2 still labelled "compensated") and
  Q38's stem (GH credited as the DM-linked hormone among PTH/androgen/aldosterone/GH — an
  atypically indirect way to test that fact) are both kept per LANE-CARD's printed-key
  convention, flagged on each concept's own `conflicts` field. Same physiology department
  article extended (not a new article).
- **Biochemistry (Q1-Q7)**: 6 of 7 items usable (Q7 has only 2 printed options — "increase
  absorption of calcium and phosphate from intestine" and two others, no fourth — held, below
  this lane's 4-option floor). All 6 authored: 6 new concepts (1 gi, 1 renal, 4 endo), no
  genuine live/pending match for any. Q5's key (Gs bound to GDP, the resting/pre-stimulation
  state, credited as "true regarding glucagon action" over the more commonly emphasised
  GTP-bound active state) kept per printed-key convention, flagged on that concept's own
  `conflicts` field. First biochemistry content for AU-MED-201: **new** department article
  `ART-END-AU-MED-201-BIOCHEMISTRY` and **new** concept file
  `concept/AU-MED-201-biochemistry-concepts.md` minted (no biochem article/concept file existed
  for this module before this pass).
- **Anatomy (Q1-Q29) — triaged, not authored**: 23 usable, 6 held for below-floor option counts
  (Q5, Q6, Q16, Q18, Q25, Q26 — each has only 2-3 printed options in the source PDF, confirmed
  not a page-break extraction artifact by checking the full page text around each). Taxonomy
  note: the existing anatomy article/concepts (from au201-author1's Mock-exam pass) are placed
  under `DIS-ANA-T06` ("Head and neck"), which is the correct node only for that batch's own
  thyroid/pituitary-adjacent facts — none of which are pelvic. This paper's Anatomy section is
  overwhelmingly pelvic/GU (renal, reproductive, urethral anatomy: `DIS-ANA-T05`, "Abdomen and
  pelvis"), with 4 items (inferior thyroid artery, pituitary-in-sphenoid, trachea-thyroid
  relation, thyroid posterior relation) genuinely head-and-neck. A follow-up authoring pass
  should place new pelvic/GU anatomy concepts under `DIS-ANA-T05` (the correct node for that
  content) rather than copying the existing `DIS-ANA-T06` placement forward — not a gate
  failure (both nodes exist and validate), but a semantic-fit correction worth making going
  forward, similar to au201-author1's own `DIS-HIS-T06`→`DIS-HIS-T03` correction.
- **Histology (Q1-Q28) — triaged, not authored**: 25 usable, 3 held — Q6 and Q8 for below-floor
  option counts (3 options each), Q27 for image-dependency (a labelled 1-7 numbered diagram of
  testis histology, "which cells are responsible," not present anywhere in this repository —
  held per this module's own precedent for unavailable-figure SBA items, not authored with a
  blank `labeling_image`).

Gate: `medical:batch` on the question file `--with` both concept files, both article files, the
resource file and the evidence-source file — 0 errors (only the pre-existing/expected
`needs_evidence` pending-import notes, matching every prior pass in this module).
`medical:simulate` (resource → evidence → concept → article → question, dependency order,
against this worktree's local dev snapshot, which — same as au201-author2's own note — does
not yet carry any of this module's earlier batches either): created 51 physiology concepts + 6
biochemistry concepts + 2 articles + 1 resource + 43 questions, updated 0, rejected 0, errors
0.

Next frontier: this paper's own Anatomy (23 usable, 6 held) and Histology (25 usable, 3 held)
sections are triaged above and are the immediate next authoring target — resume with Anatomy's
`DIS-ANA-T05` placement note above in mind. After that: the مصريين twin
(`EOM MCQs - EGU FINAl -27-(مصريين).pdf`, ~90+ usable items across 4 sections, own printed
keys, likely heavy dedup vs this paper) and ~127 untriaged bank files (Physiology 66,
Anatomy/Embryology 21, Dr Gawad's 155pg bank, others).

## NEEDS-OMAR

- `EOM - EGU End 2028 (مصريين).pdf` and `EOM - EGU END 2028 (وافدين).pdf`: no printed
  answer key found anywhere in either file (both read in full). If a keyed twin, a
  separately-scanned answer sheet, or a highlight-marked copy exists outside this
  repository's current corpus, it would unlock 2 more exam papers (~70 combined usable
  items) for this module.
