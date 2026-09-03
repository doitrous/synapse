| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| mock1 | 26 | 0 | 0 | 26 |

## Held
(none — the 5 image-dependent items below were triaged out before seeding, so `ledger.mjs`
does not carry them as seed-declared holds; recorded here instead.)

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
(2 stream-specific EOM finals, 1 practical paper, this Mock pair) and ~127 bank files not
yet triaged — the largest single-department page footprint of any AU Year 2 module
(Physiology, 2158 pages).
