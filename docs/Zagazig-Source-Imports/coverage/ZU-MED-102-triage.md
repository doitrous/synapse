# ZU-MED-102 (Medical Terminology) — triage, author1 pass

Priority sources per `coverage/ZU-Y1-priority-sources.md` §ZU-MED-102, located under
`_Staging/Telegram Year 1/Fakous Medical Data/Medical Terminology/` (Fakous campus,
ruled USABLE — chief-of-staff, 2026-09-01, LANE-CARD.md §7). `source provenance: Fakous
campus` on every question drawn from the Final paper.

## Source: `Fakous Medical Terminology Final 2024.pdf` (paper, tier 1, sha `140e202a153b…`)

2 pages, scanned (`pagetext.mjs status` reports `garbled=yes`, 0 words, on both pages —
no usable text layer as delivered). OCR'd in full in the foreground
(`pagetext.mjs ocr --pages 1-2`, one chunk: p1 271 words, p2 193 words). 20 questions
total, all single-best-answer (SBA), matching the paper's own header ("Total Number of
Questions: 20 Single best answer (SBA)", "Choose the single best answer: 20 marks=1 mark
for each").

### Key-recovery method

`pagetext.mjs keys` reports **0 keyed / 0 ambiguous / 0 page(s)** both before OCR ("no
text layer — keys need ocr+render") and after OCR (still "no text layer" — the detector
does not pick up OCR'd text on this file at all) — the corpus-wide key-recovery trap
named in LANE-CARD.md §7. Unlike the hand-drawn-ink pattern documented in the
ZU-MED-103/106/107 triages, this paper's correct answers are marked with a clean
**digital green highlight box** over the correct option's letter (and, on Q19/Q20, over
the whole lower-case option letter), not a pen stroke — visible directly on the render
and indirectly in the OCR text as a corrupted or dropped leading character (e.g. `'B)`,
`/A)`, ` Adkelvin`). All 20 answers below were **confirmed by rendering both pages as
images** (`pagetext.mjs render --force`, 2 renders total, `140e202a-p1.png` and
`140e202a-p2.png`) and reading the highlight directly — every one of the 20 marks is a
single, unambiguous highlight on exactly one option, no double-marks or contradictions
anywhere on this 2-page paper.

### Checkpoint table

| Source | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|---|
| `Fakous Medical Terminology Final 2024.pdf` | 20 (all SBA) | 20/20 legible + render-confirmed, 0 held | 10 distinct (Q1/Q2/Q3 share one SI-units concept; Q4/Q5 share one cytology-word-part concept; Q6/Q8 share one hemo-suffix concept; Q7/Q14 share one vital-sign-suffix concept; Q10/Q12/Q13 share one general-prefix concept; Q11/Q15/Q16 share one clinical-suffix concept; Q17/Q18 share one anatomical-position concept; Q19 and Q20 are each their own concept) | 1 | 9 | `fnd` (SI units, cytology and general word-building prefixes/suffixes — the bulk of the paper), `hem` (hemo- combining forms), `cvs` (vital-sign combining forms), `ren` (ureter-bladder anatomy), `git` (duodenum anatomy) |

**20/20 = 100% of the Final paper's SBA items keyed with real, legible stems and
render-confirmed** — well above the ≥60% conditional-approval bar. Per this lane's
dispatch, authoring proceeds on this source without a separate wait for a TRIAGE APPROVED
posting; this pass records the verdict itself, applying the ≥60% bar exactly as the
dispatch states it.

### Full answer key (all render-confirmed, digital highlight, no holds)

| Q | Answer | Q | Answer |
|--:|---|--:|---|
| 1 | D (Meter) | 11 | C (Opening) |
| 2 | A (kelvin, K) | 12 | C (Exo) |
| 3 | C (kilogram per liter) | 13 | C (Hemi) |
| 4 | B (blasts) | 14 | A (Abnormally fast heart rate) |
| 5 | B (Cell nucleus) | 15 | B (Head) |
| 6 | A (Break down of red blood cells) | 16 | A (nephrities — printed spelling kept) |
| 7 | D (Decreased oxygen) | 17 | A (Anteriorly) |
| 8 | B (Haemorrhage) | 18 | B (Distal) |
| 9 | A (gland above the kidneys) | 19 | a (Bladder) |
| 10 | B (Green) | 20 | d (Dudenum — printed spelling kept) |

## Source: `Medical_terms MCQ.pdf` (bank, tier 2, sha `1957839d179e…`)

61 pages, native text (`pagetext.mjs status` reports `garbled=no` on 55 of 61 pages; the
6 garbled pages are section-divider/image pages, not MCQ content). Confirmed to be the
Ministry-of-Health Technical Health Institutes' shared "Medical Terminology" curriculum
book (prepared by Dr. Houria Abdel-Wahab, Mansoura Health Technical Institute, 2018/2019,
front matter pp.1-14) with ~10 numbered "Exercise" MCQ blocks (pp.16-61, ~96 four-option
items total per `pagetext.mjs keys`' unmarked count) covering the same
prefix/root/suffix/body-system territory as the Final paper. **`pagetext.mjs keys`
reports 0 keyed / 0 ambiguous / 96 unmarked across all 61 pages** — no colour, bold,
underline, highlight or hand-drawn mark on any option, on any exercise spot-checked
(pp.16-17, 21, 25, 31, 37, 43, 48, 53, 57, 61) or in the full-file scan. **Verdict:
genuine "nothing to author" result, not a gap** — same pattern as the two 244/125-page
lecture books in `ZU-MED-106-triage.md` §"The other 3 Priority-4 Cardiopulmonary
sources": a real MCQ-shaped source with zero recoverable key, held wholesale rather than
triaged item-by-item, per LANE-CARD.md §7 ("Printed/marked keys stand… hold only
unmarked/contradictory items"). Not authored from. Corroborated by the Final paper alone
already clearing the ≥60% approval bar and most of the 20-30 lower end of a cluster
target; this bank cannot safely close the gap to 30 without a key.

## The two tier-9 "other" sources — not authored from, catalog only

`Terminology (1) Dr Abdalla Elsamahy 5.pdf` (sha `ceedc0432301…`) and `terminology dr.
wagih.pdf` (sha `e1278ce45545…`) are named-professor lecture slide decks per
`coverage/ZU-Y1-priority-sources.md`'s own tier-9 classification — spot-checked
(`pagetext.mjs status`, first 5 pages each): low word counts consistent with slide decks,
no MCQ-shaped content found. Not triaged question-by-question; tier-9 sources are catalog
material in this lane's convention, not authoring sources.

## Concept search — 1 live-hit, 9 new

`find-existing.mjs` run for every one of the 10 distinct concepts before minting, short
literal queries per LANE-CARD.md §4, supplemented by `grep -ril` across
`docs/*-Source-Imports/{concept,pending-live}` and `docs/import-ready/concept` for the
generic-sounding terms (SI units, duodenum).

**1 live hit** — sparse live overlay,
`concept/ZU-MED-102-termfinal24-live-overlays.md`:
- `CON-REN-5D60B4B43BCCC3` "Adrenal medulla secretes epinephrine and norepinephrine
  during fight-flight-fright stress response" — Q9 ("Which of the following describes
  Epinephrine?" → "A chemical substance produced by a gland above the kidneys"). Direct
  match — the live concept's own label already states epinephrine is an adrenal-medulla
  secretion (the adrenal gland sits above the kidney). Found by
  `find-existing.mjs "epinephrine"`.

**9 new concepts minted** — `concept/ZU-MED-102-termfinal24-concepts.md`, covered by 5
new articles (`article/ZU-MED-102-termfinal24-articles.md`):
- `CON-FND-70361F36A2952D` — SI units for basic quantity, temperature and mass
  concentration (Q1, Q2, Q3).
- `CON-FND-4292412C40F704` — cytology word-parts: the root "karyon" (nucleus) and the
  suffix "-blast" (immature/actively dividing cell) (Q4, Q5).
- `CON-HEM-84EBE116475480` — hem/o combining-form facts: hemolysis (breakdown of red
  blood cells) and hemorrhage (bleeding from a damaged vessel) (Q6, Q8).
- `CON-CVS-F6F49377F30EF4` — vital-sign combining forms: tachycardia (abnormally fast
  heart rate) and hypoxia (decreased oxygen) (Q7, Q14).
- `CON-FND-DE1C8E5CF7001A` — general medical prefixes: chloro- (green), exo- (outside/
  outer), hemi- (half) (Q10, Q12, Q13).
- `CON-FND-AEEB25E713AFCF` — clinical word-building elements: the suffix "-stomy"
  (surgical opening), the combining form "cephal/o" (head), and the suffix "-itis"
  (inflammation, e.g. nephritis = kidney inflammation) (Q11, Q15, Q16).
- `CON-FND-B04DD375E26D87` — anatomical position and directional terms: palms face
  anteriorly in the standard anatomical position; distal describes movement/position away
  from the point of attachment or origin (Q17, Q18).
- `CON-REN-720B8C1048B7BC` — ureters connect the kidneys to the bladder (Q19).
- `CON-GIT-567C50B44DB4FE` — the duodenum is part of the gastrointestinal tract (Q20).

Terminology items are grouped into a few concept records per word-part family (9 concept
records for 20 questions) rather than one concept per term, per this lane's dispatch.

## Needs Omar

- **Cluster size is below the 30-50 target.** ZU-MED-102's only source with any
  recoverable printed/marked key in this staging folder is the 20-question Final paper;
  the 61-page MCQ bank carries zero marks on any of its ~96 items and, per the corpus's
  own hold-unmarked-items rule, cannot be authored from without a key. No other file in
  the module folder has exam-grade, keyed content. **All 20 authorable questions in this
  source are authored this pass — the module's keyed material is exhausted, not
  under-worked.** Closing the gap to 30-50 needs either a ruling that definitionally
  self-evident (unmarked) terminology-bank items may be authored on word-part logic
  alone (a policy change from the corpus's current hold-unmarked-items convention), or
  new source material for ZU-MED-102 — logged here rather than assumed.
