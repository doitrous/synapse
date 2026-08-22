<!--
  Sparse updates for AU-MED-105 (Histology) onto concept ids that exist only in
  Kasr Year 1's unimported batches, per LANE-BRIEF.md §16 (mint freeze fully lifted,
  law 1) and §19 (an update-shaped row for an id that is not live and not in the same
  batch folder is an ERROR unless validated `--with` the Kasr file it targets).

  Validate with:
    npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-105-histology.md \
      --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      --with docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md

  Do not apply this file until the Kasr file each record targets (named per record
  below, and in INDEX.md) is live. Omar imports Kasr Year 1 before Alexandria.
-->


# Item

## id
CON-MSK-AEB62E99182AEE

## label
The three cartilages are told apart by their matrix, and each has its own list of sites

## universities
+au

## modules
+AU-MED-105

## exam_signal
src_fc2b7922f6377d572f37 | bank | | p1 | AU-MED-105
src_fc2b7922f6377d572f37 | bank | | p2 | AU-MED-105
src_fc2b7922f6377d572f37 | bank | | p3 | AU-MED-105

## field_notes
targetFile: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md
relationships: Sparse AU-MED-105 overlay update on a concept pending in another lane's unimported Kasr batch (+universities, +modules, exam_signal) — held in pending-live/ per LANE-BRIEF.md §16 rule 1 until that Kasr file is live.

---

# Item

## id
CON-FND-14D80DE53DE835

## label
Nerve cells are classed by how many processes leave the cell body: one, two, or more than two

## universities
+au

## modules
+AU-MED-105

## exam_signal
src_fc2b7922f6377d572f37 | bank | | p9 | AU-MED-105
src_fc2b7922f6377d572f37 | bank | | p10 | AU-MED-105
src_fc2b7922f6377d572f37 | bank | | p11 | AU-MED-105

## field_notes
targetFile: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md
relationships: Sparse AU-MED-105 overlay update on a concept pending in another lane's unimported Kasr batch (+universities, +modules, exam_signal) — held in pending-live/ per LANE-BRIEF.md §16 rule 1 until that Kasr file is live.

---

# Item

## id
CON-FND-4AE74C678A6F64

## label
Nissl's granules are the basophilic clumps of rough endoplasmic reticulum seen in a nerve cell body

## universities
+au

## modules
+AU-MED-105

## exam_signal
src_fc2b7922f6377d572f37 | bank | | p9 | AU-MED-105
src_fc2b7922f6377d572f37 | bank | | p11 | AU-MED-105

## field_notes
targetFile: docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md
relationships: Sparse AU-MED-105 overlay update on a concept pending in another lane's unimported Kasr batch (+universities, +modules, exam_signal) — held in pending-live/ per LANE-BRIEF.md §16 rule 1 until that Kasr file is live.

---

# Item

## id
CON-MSK-888DFA3AA4E974

## label
Smooth muscle has caveolae instead of T-tubules and dense bodies instead of Z lines, and its irregular myofilaments leave it unstriated

## universities
+au

## modules
+AU-MED-105

## exam_signal
src_fc2b7922f6377d572f37 | bank | | p15 | AU-MED-105
src_fc2b7922f6377d572f37 | bank | | p16 | AU-MED-105

## field_notes
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md
relationships: Sparse AU-MED-105 overlay update on a concept pending in another lane's unimported Kasr batch (+universities, +modules, exam_signal) — held in pending-live/ per LANE-BRIEF.md §16 rule 1 until that Kasr file is live.

---

# Item

## id
CON-MSK-3013AA61E917B7

## label
Excitation–contraction coupling relays a T-tubule depolarisation into calcium release, calcium onto troponin C, and tropomyosin off the actin site

## universities
+au

## modules
+AU-MED-105

## exam_signal
src_fc2b7922f6377d572f37 | bank | | p13 | AU-MED-105
src_fc2b7922f6377d572f37 | bank | | p15 | AU-MED-105

## field_notes
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md
auBankNote: This bank also tests the structural fact this concept's mechanism already implies — that tropomyosin covers the myosin-binding site at rest and is displaced by calcium-bound troponin during this sequence (p15 Q1 of the AU-MED-105 Histology bank). Not written as a separate concept: the 00-START-HERE.md §4 tiebreaker judged this the same objective, not a distinct one, so no new concept was minted for it.
relationships: Sparse AU-MED-105 overlay update on a concept pending in another lane's unimported Kasr batch (+universities, +modules, exam_signal) — held in pending-live/ per LANE-BRIEF.md §16 rule 1 until that Kasr file is live.

---

# Item

## id
CON-MSK-77D955AAB4D0FA

## label
Neuromuscular transmission runs presynaptic calcium, acetylcholine exocytosis, a cation channel on the end plate, the end-plate potential, then hydrolysis by acetylcholinesterase

## universities
+au

## modules
+AU-MED-105

## exam_signal
src_fc2b7922f6377d572f37 | bank | | p14 | AU-MED-105

## field_notes
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md
auBankNoteNmj: The AU bank's motor-end-plate question (p14 Q6, where is choline esterase found) tests the final step of this concept's own stated sequence (hydrolysis by acetylcholinesterase); no new concept minted since the objective is already this record's.
relationships: Sparse AU-MED-105 overlay update on a concept pending in another lane's unimported Kasr batch (+universities, +modules, exam_signal) — held in pending-live/ per LANE-BRIEF.md §16 rule 1 until that Kasr file is live.

---
