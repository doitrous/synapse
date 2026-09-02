<!--
  ZU-MED-104 (Musculoskeletal & Integumentary) — 3 sparse LIVE concept
  overlays.

  All 3 ids below are confirmed LIVE directly against
  server/data/medical-library-v1.json (grepped for `"id": "<id>"`, not just
  via find-existing.mjs). All 3 have `moduleIds: []` and no
  `moduleSubjectPaths` field on the live record today, so writing
  `module_subject` as a single new path here evicts nothing. `learnerYears`
  on all 3 already includes `1`, so no `## learner_years` addition is
  needed (unlike the ZU-MED-106 worked example, where year 1 was missing on
  its live overlays).

  A fourth candidate this pass initially treated as live — the anatomical
  snuff box / scaphoid-fracture / radial-artery concept
  `CON-MSK-1424177E093253`, named in a sourceCandidateIds note inside
  `docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md` as
  "the live anatomical-snuff-box concept" — is NOT actually in
  medical-library-v1.json (0 grep hits). The real snuffbox concept teaching
  the same fact (scaphoid floors the snuff box, radial artery crosses it) is
  `CON-MSK-1B2BD8EC2B44B8`, pending in `docs/import-ready/concept/101-ISK-
  concepts.md` (Kasr) — handled as a pending overlay instead, see
  `pending-live/ZU-MED-104-msk-pending-overlays.md`.

  Import: Admin › Concepts › Import, with "Update matching items" on.
-->

# Item

## id
CON-MSK-F656F96F575FFB

## label
Anterior-tibial transition to dorsalis pedis

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Lower limb vascular anatomy

## exam_weight_by_year
ZU_Y1=0.6

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q16, "An elderly man is suffering from vasoocclusive disease in lower limb. Which of the following arteries is most probably palpable in this patient?" (answer: dorsalis pedis, hand-drawn-ink key, confirmed by render --force). Direct match — the live concept's own definition (the anterior tibial artery becomes dorsalis pedis anterior to the ankle, where its pulse is palpable) is exactly the fact this question tests. Found by `find-existing.mjs "dorsalis pedis"` after an earlier compound-phrase search ("vasoocclusive disease dorsalis pedis") missed it — this tool appears to require its search terms to co-occur verbatim rather than matching per-word, so short, literal phrases find more than long compound ones. The ZU-side question's own explanation covers the clinical vasoocclusive-disease framing; the live concept's own text is untouched by this row.

---

# Item

## id
CON-MSK-967E873EEEACE0

## label
Bone cells include osteogenic cells, osteoblasts, osteocytes, and osteoclasts

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Bone histology

## exam_weight_by_year
ZU_Y1=0.55

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q20, "Which of the following cells initiate the mineralization of the bone matrix during growth and bone remodeling?" (answer: osteoblasts, hand-drawn-ink key, confirmed by render --force). Partial match — the live concept's own definition is only the bone-cell-type roster (osteogenic cells, osteoblasts, osteocytes, osteoclasts); it does not itself state that osteoblasts specifically initiate matrix mineralization. Close enough in scope (same four-cell-type teaching point, one cell type's specific function) to overlay rather than fork a new concept — the ZU-side question's own explanation states the mineralization-initiation fact directly; the live concept's roster text is untouched by this row.

---

# Item

## id
CON-MSK-0E3AE8E79060E1

## label
Endomysial reticular fibers surround individual fibers and carry small vessels/fine nerves

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Skeletal muscle histology

## exam_weight_by_year
ZU_Y1=0.55

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q26, "The connective tissue investment seen with the light microscope around an individual muscle fiber of skeletal muscle is called which one of the following?" (answer: endomysium, hand-drawn-ink key, confirmed by render --force). Direct match — the live concept's own definition ("surround individual fibers") is exactly the fact this question tests, distinguishing endomysium from epimysium (whole muscle), perimysium (fascicle) and sarcolemma (the fiber's own cell membrane, not a connective-tissue layer). The ZU-side question's own explanation states the distinction directly; the live concept's own text is untouched by this row.
