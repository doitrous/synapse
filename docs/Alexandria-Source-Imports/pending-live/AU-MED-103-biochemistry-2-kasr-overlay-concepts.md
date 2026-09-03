<!--
  Sparse pending-live updates for AU-MED-103 Biochemistry Step 2 lane 2 (W1-103-BIOC,
  bioc2), extending pending-live/AU-MED-103-biochemistry.md with two more Kasr
  103-BMS-mcq-carbohydrate-concepts.md ids this batch's question authoring reused --
  ids the Step 2 lane 1 author's 37-id list did not already cover. Both passed
  find-existing.mjs before reuse (queries logged in field_notes below) and are
  traceable to a triaged AGHA-CHO/EOM question (exam_signal names source, page, Q#).

  Per LANE-BRIEF.md SS16's four laws and SS19's rule: every id here exists only in
  another lane's unimported Kasr batch, never in live state, so `medical:batch`/
  `medical:simulate` on this file ALONE correctly errors 'is not a concept that
  exists' -- these records only validate with `--with docs/Kasr-Source-Imports/concept/
  103-BMS-mcq-carbohydrate-concepts.md`.
-->

# Item

## id
CON-FND-5253967A0E3786

## label
Substrate-level phosphorylation makes ATP directly at three reactions: two in glycolysis and one in the citric acid cycle

## universities
+au

## learner_years
+1

## modules
+AU-MED-103

## field_notes
pendingLiveTarget: 103-BMS-mcq-carbohydrate-concepts.md (Kasr, module 103 BMS) -- this id is not yet live; hold until that Kasr file is imported, per pending-live/INDEX.md.
sourceCandidateIds: find-existing.mjs run for "substrate level phosphorylation", "succinate thiokinase" -- no hit beyond this record itself (found by direct grep of the Kasr concept file's own label text, not by find-existing, since the phrase match is exact).
examSignal: AGHA-CHO Q32-33 (p6, keyed b,c), Q58 (p13, keyed a), Q74 (p19, keyed a, succinate thiokinase/GTP), Q102 (p19, keyed c) -- all "substrate-level phosphorylation" identification items.

---

# Item

## id
CON-HEM-585B833F845F62

## label
A red cell without pyruvate kinase makes no net ATP from glucose, and the result is haemolytic anaemia

## universities
+au

## learner_years
+1

## modules
+AU-MED-103

## field_notes
pendingLiveTarget: 103-BMS-mcq-carbohydrate-concepts.md (Kasr, module 103 BMS) -- this id is not yet live; hold until that Kasr file is imported, per pending-live/INDEX.md.
sourceCandidateIds: find-existing.mjs run for "pyruvate kinase deficiency" -- no hit beyond this record itself.
examSignal: EOM - Blood Final Egyptian final Q2 (p1, keyed a) | EOM - Blood end wafdeen final Q20 (p5/6, keyed a) -- both "enzyme deficiency causing hemolytic anaemia" items naming pyruvate kinase, distinct from the G6PD/favism cluster already tested elsewhere in this lane.
