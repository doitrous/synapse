# ZU-MED-103 (Structure and Function) — triage, author1 pass

Priority sources per `coverage/ZU-Y1-priority-sources.md` §ZU-MED-103, all three located
under `_Staging/Telegram Year 1/Fakous Medical Data/Structure and Function/` (Fakous
campus, ruled USABLE — chief-of-staff, 2026-09-01, LANE-CARD.md §7).
`source provenance: Fakous campus` on every question drawn from this folder.

## Source: `Final S&F 2024 .pdf` (paper, tier 1)

5 pages, scanned (`pagetext.mjs status` reports `garbled=yes`, 0 words, on every page —
no usable text layer as delivered). OCR'd in full in the foreground
(`pagetext.mjs ocr --pages 1-5`, one chunk). 47 questions total: 11 short-essay questions
(Section 1, p.1, "Answer all the following questions") + 36 single-best-answer MCQs
(Section 2, pp.2-5, "Choose the single best answer: 36 marks = 1 mark for each"),
matching the paper's own header.

### Key-recovery method (the trap named in LANE-CARD.md §7, confirmed on this paper too)

`pagetext.mjs keys` reports **0 keyed / 0 ambiguous / 0 page(s)** ("no text layer — keys
need ocr+render" before OCR; after OCR the detector still finds nothing, since the mark
is a hand-drawn ink stroke, not a font/colour property) — the same trap documented in
`ZU-MED-106-triage.md` and `ZU-MED-107-triage.md`: the correct option is marked by a
diagonal pen stroke through its letter (occasionally a full "X" instead, or an "X"
appended after the option text as a secondary confirming mark), added before scanning.
The OCR text layer shows it indirectly — the struck-through letter's glyph comes out
corrupted (`d.` → `AX`, `c.` → a bare period, `b.` → `2.`, `a.` → `x.` or `®`, etc.) — but
every one of the 36 SBA answers below was **confirmed by rendering the page as an image**
(`pagetext.mjs render --force`, one render per page, pp.2-5 — 4 renders total, all four
already rendered and read directly, not just the OCR-inferred pattern) before being
recorded.

### Checkpoint table

| Source | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| `Final S&F 2024 .pdf` | 47 (11 written + 36 SBA) | 35/36 SBA legible + render-confirmed (1 held, Q9, see below); written = essay, graded by rubric/department book, no single-letter key | 34 distinct (Q1 and Q28 share one concept — both test "histones condense/bind DNA into nucleosomes") | 3 | 5 (covering 6 questions) | 26 | `fnd` (cytology, histology, membrane physiology, ANS/renal physiology, biochemistry — the bulk of the paper), `hem` (neutrophil/band cell, erythropoiesis/EPO, stored-blood changes — blood-specific facts, matching the `CON-HEM-*` pattern already used for megakaryocyte/spherocytosis) |

**35/36 = 97% of the Final paper's SBA items keyed with real, legible stems and
render-confirmed** — well above the ≥60% conditional-approval bar in this lane's
dispatch. Per the dispatch's pre-approval, authoring proceeded without a separate wait
for TRIAGE APPROVED.

### The one held item — Q9, a double-mark on "which is INCORRECT"

"One of the following about pericytes is INCORRECT? a. Helps in wound healing b.
Control the diameter of blood capillary c. Can differentiate into macrophages d. Are
located along capillaries" — option **a** carries a diagonal pen stroke through its
letter (the paper's standard "this is the marked answer" convention), and option **d**
independently carries a bold hand-drawn **X** directly over its letter (the paper's
alternate "this is the marked answer" convention, seen elsewhere on this same paper —
e.g. Q8's Megakaryocyte). Both marks were render-confirmed (`42181581-p2.png` for a,
`42181581-p3.png` for d, plus a 2x-zoomed crop of each) — this is not a corrupted-text
artefact resolved by rendering; the paper genuinely carries two different, independently
legible marks on two different options for one question, and neither option is the
textbook-correct answer to "which is INCORRECT" on its own (pericytes do line
capillaries — a true statement, so d is a poor "incorrect" pick; pericytes are also
credited with a wound-healing role in most sources, so a is not a clean pick either — the
genuinely false statement in the option set, "can differentiate into macrophages", carries
no mark at all). Per LANE-CARD.md §7 ("an indefensible key holds with reason
`held-indefensible-key`"), this item is **held**, not guessed. No concept is minted
against it — the live concept `CON-CVS-5D4C49C48AA325` ("Pericytes around capillary
endothelium") already covers the location fact tested by the unused option d, and no new
record is needed for a held item.

### Stem/option observations kept as printed, not corrected

Q25's option a reads "Sphingosine, fatty acids, glycerol, phosphoric acid" and option d
reads "Sphingosine, glucose, fatty acids, glycerol" — both plausible-looking distractors
mixing up sphingomyelin's composition (which does include phosphoric acid, via a
phosphodiester bond, but no galactose) with cerebroside's. Kept as printed; the new
concept's definition (`CON-FND-8BC2AA065984A1`) states the correct cerebroside
composition (sphingosine + fatty acid + galactose, no glycerol, no phosphate) and
distinguishes it from sphingomyelin explicitly.

Q35's option layout ("a. Thiamine b.Niacin c. Folic acid d. (B12)") runs the options
horizontally in one line on the source page rather than one per line like every other
question — read correctly from the render, not a content issue, just a layout note.

## Source: `examsssss (1).pdf` (other, tier 9)

11 pages, native text (`pagetext.mjs status` reports `garbled=no` on every page).
Inspected per LANE-CARD.md §1 item 3 ("may be compiled past papers"): confirmed to be a
**compiled 5-option MCQ study bank** ("Dr. Ahmed Ammar, 1st Year"), covering the same
histology/hematology territory as the Final paper's early questions (connective tissue
classification, blood cell types, granulocytes) but in a different option format
(5 options a–e, not this module's 4-option SBA) and with **no answer key of any kind** —
no colour, bold, underline, highlight or hand-drawn mark on any option, on any of the
~40+ questions spot-checked or in the full `pagetext.mjs keys` scan (`1 keyed / 0
ambiguous / 119 unmarked` across all 11 pages, the 1 "keyed" hit a false positive from
unrelated bold styling, consistent with the false-positive pattern documented for
lecture-book compilations in `ZU-MED-106-triage.md`). **Verdict: genuine "nothing to
author" result, not a gap** — logged per LANE-CARD.md §1 item 3 ("otherwise log the
verdict") since the Final paper alone already cleared the ~35-question cluster target.
Not triaged question-by-question.

## Source: `Hand out Module 1 st year-signed.pdf` (lecture, tier 2 — catalogue only)

373 pages, native text, clean (`garbled=no` on every sampled page). Confirmed to be the
module's official lecture hand-out / learning-outcomes document: page 2 lists 13 learning
outcomes (skeleton structure and movement; cell structure; membrane specialisations; cell
cycle/karyotyping/chromosomal anomalies; epithelium; connective tissue cells and types;
blood cell types and formation; the four macromolecule classes; genetic information
storage/expression; vitamin functions/deficiencies; homeostasis and body-fluid
compartments; ANS divisions/receptors; blood component functions) that map directly onto
the Final paper's own question spread — corroborating evidence that the Final paper is
this module's own end-of-module exam, not a mismatched or misfiled source. Per
LANE-CARD.md §7 ("lecture, tier 2 — catalogue only"), not authored from; catalogued here
only.

## Concept search — 3 live-hit, 5 pending-hit (6 questions), 26 new

`find-existing.mjs` run for every one of the 34 distinct concepts before minting, short
literal queries per LANE-CARD.md §4.

**3 live hits** (already in `server/data/medical-library-v1.json`) — sparse live overlay,
`concept/ZU-MED-103-sf-final24-live-overlays.md`:
- `CON-HEM-3DC3EAA5D4D84B` "Bone-marrow megakaryocytes produce platelets" — Q8 (platelets
  formed from megakaryocyte). Direct match.
- `CON-HEM-88860E0417E50F` "Hereditary spherocytosis produces less-flexible spherical
  RBCs that hemolyze readily because of membrane-protein mutations" — Q19 (congenital
  spherocytosis "regarded as a type of hemolytic anemia"). Direct match.
- `CON-GIT-CFF765C2EF7ED9` "Lactulose is an unabsorbed synthetic fructose-galactose
  disaccharide that retains bowel water and is metabolized by colonic bacteria to lactic
  acid" — Q23 (disaccharide used in constipation and hepatic encephalopathy). The live
  concept's mechanism (retains bowel water → osmotic laxative effect; colonic
  fermentation to lactic acid → ammonia-trapping in hepatic encephalopathy) already
  implies both therapeutic uses ZU's question names; a Helwan pending concept
  (`HU-GIT-301`) states the hepatic-encephalopathy indication explicitly but this live
  record was preferred as the overlay target since it is already live and its mechanism
  covers both facts without becoming two stapled records.

**5 pending hits, covering 6 questions** (concept exists only in another lane's
unimported batch) — sparse pending-live overlay,
`pending-live/ZU-MED-103-sf-final24-pending-overlays.md`:
- `CON-FND-3660CDEFA054C3` (Kasr 102-INT) "Histones are lysine- and arginine-rich basic
  proteins that condense DNA into nucleosomes…" — Q1 (first level of DNA packing in
  metaphase chromosome = nucleosome) **and** Q28 (which protein binds DNA = histone).
  Two questions, one concept — same pattern as ZU-MED-106's Q14/Q17 and ZU-MED-107's
  Q6/Q9/Q13.
- `CON-FND-0A988681FF1ABF` (Kasr 101-ISK) "Glandular epithelium is epithelium modified to
  secrete, and the presence of a duct divides glands into exocrine, endocrine and mixed"
  — Q4 (gland secreting through a duct = exocrine gland). Direct match.
- `CON-FND-D716C3939DB217` (Kasr 101-ISK) "Basal infoldings increase the basal surface
  area, with mitochondria stacked vertically between them to power active transport" —
  Q5 (striated-duct epithelial specialisation for transport surface area = basal
  infoldings). Direct match.
- `CON-FND-68DA70C4BBE2A1` (Kasr 101-ISK) "Pseudostratified columnar epithelium is
  simple — every cell reaches the basement membrane — and comes in three forms…" — Q6
  (pseudostratified columnar belongs to which type = simple epithelium). Direct match.
- `CON-IMM-CCB3049ABF5021` (Ain Shams ASU-IMM) "Opsonization is the process by which IgG
  and/or C3b tag antigens for enhanced phagocytosis and destruction by effector cells" —
  Q22 (opsonization definition = making foreign material more susceptible to
  phagocytosis). Direct match.

**26 new concepts minted** — `concept/ZU-MED-103-sf-final24-concepts.md`, covered by 5
new articles (`article/ZU-MED-103-sf-final24-articles.md`): a cytology/genetics article
(Q2 meiotic crossing-over/pachytene, Q29 tRNA TψC-loop thymine, Q31 non-competitive
inhibition lowers Vmax), a histology/connective-tissue article (Q3 keratin intermediate
filaments, Q10 dense irregular CT = organ capsule), a hematology article (Q7 neutrophil
band-cell immature form, Q18 renal failure → EPO fall → marrow depression, Q21 stored-
blood potassium rise), a physiology/ANS/renal article (Q11 Na+/amino-acid symport, Q12
diffusion inversely proportional to membrane thickness, Q13 secondary active transport
and amino acids, Q14 sympathetic inhibition of intestinal secretion, Q15 vagal
bronchoconstriction, Q16 hypovolemia stimulates JG cells, Q17 angiotensin II increases
ADH, Q20 adrenaline in bronchial asthma treatment, Q30 pancreatic lipase as an
extracellular enzyme), and a biochemistry/vitamins article (Q24 linoleic acid as
essential fatty acid, Q25 cerebroside composition, Q26 glutathione hydrolysis products,
Q27 threonine as a hydroxyl-bearing essential amino acid, Q32 vitamin A deficiency, Q33
vitamin K deficiency in the newborn, Q34 B1/beriberi, Q35 B12/vegetarian diet, Q36 folic
acid and one-carbon metabolism).

## Needs Omar

- None new this pass. Q9's double-mark is handled by the LANE-CARD's own
  `held-indefensible-key` rule; the lactulose live-vs-pending overlay-target choice (Q23)
  followed the standard merge tiebreaker without needing a ruling.
