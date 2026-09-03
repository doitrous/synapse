<!--
  Sparse pending-live updates for AU-MED-103 Biochemistry Step 2 lane 2 (W1-103-BIOC,
  bioc2), reusing five concepts already minted for AU-MED-102 (same university,
  sibling module -- concept ids are university-blind per LANE-CARD.md SS1/SS4) that
  this batch's AGHA-BLOOD/AGHA-CHO question authoring found cover facts this module's
  own triage tests: fructose/galactose disorders, the malate shuttle, gluconeogenesis's
  ATP cost, and ALA synthase. Each passed find-existing.mjs before reuse (queries and
  hits logged in field_notes) and is traceable to a triaged AGHA-BLOOD/AGHA-CHO/EOM
  question (exam_signal names source, page, Q#).

  Per LANE-BRIEF.md SS16's four laws: every id here exists only in the sibling
  AU-MED-102 lane's own unimported batch, never in live state, so `medical:batch`/
  `medical:simulate` on this file ALONE correctly errors 'is not a concept that
  exists' -- these records only validate with `--with docs/Alexandria-Source-Imports/
  concept/AU-MED-102-biochem-metabolism-concepts.md` (first four rows) or `--with
  docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-nitrogen-blood-concepts.md`
  (last row).
-->

# Item

## id
CON-FND-031381BCC0ACC5

## label
Hereditary fructose intolerance is aldolase B deficiency, and fructose-1-phosphate accumulation is what makes it dangerous

## universities
+au

## learner_years
+1

## modules
+AU-MED-103

## field_notes
pendingLiveTarget: AU-MED-102-biochem-metabolism-concepts.md (Alexandria, sibling module AU-MED-102) -- this id is not yet live; hold until that batch is imported, per pending-live/INDEX.md.
sourceCandidateIds: find-existing.mjs run for "aldolase B", "fructokinase" -- the aldolase B query returned this exact record (pending, AU-MED-102); the fructokinase query returned only an unrelated glossary term (Phosphofructokinase-1, a different enzyme).
examSignal: EOM - Blood End Egyptian 1 Q20 (p4, keyed A) | EOM - Blood end wafdeen final Q38 (p10, keyed a), Q40 (p11, keyed c) | AGHA-CHO Q101 (p24, keyed D) -- essential fructosuria (fructokinase, benign) contrasted with hereditary fructose intolerance (aldolase B, harmful), both taught by this concept's own article (ART-FND-FRUCTOSE-AND-GALACTOSE-DISORDERS Mechanism section names fructokinase explicitly).

---

# Item

## id
CON-FND-C4459ABD69361C

## label
Classic galactosemia is galactose-1-phosphate uridyltransferase deficiency, and every feature follows from trapped galactose-1-phosphate and galactitol

## universities
+au

## learner_years
+1

## modules
+AU-MED-103

## field_notes
pendingLiveTarget: AU-MED-102-biochem-metabolism-concepts.md (Alexandria, sibling module AU-MED-102) -- this id is not yet live; hold until that batch is imported, per pending-live/INDEX.md.
sourceCandidateIds: find-existing.mjs run for "galactosemia" -- returned this exact record plus a pending AU-MED-102 question testing the same fact, both sibling-module hits, not merged (module-blind reuse, per LANE-CARD.md SS4).
examSignal: AGHA-CHO Q61 (p13, keyed b), Q103 (p20, keyed B) -- "commonest deficient enzyme in galactosaemia", restated twice in the same bank.

---

# Item

## id
CON-FND-95805B0745D091

## label
Gluconeogenesis moves cytosolic oxaloacetate to the cytosol as malate, because oxaloacetate itself has no mitochondrial transporter

## universities
+au

## learner_years
+1

## modules
+AU-MED-103

## field_notes
pendingLiveTarget: AU-MED-102-biochem-metabolism-concepts.md (Alexandria, sibling module AU-MED-102) -- this id is not yet live; hold until that batch is imported, per pending-live/INDEX.md.
sourceCandidateIds: find-existing.mjs run for "malate aspartate shuttle" -- no hit by that exact phrase; a second query for "malate shuttle" against this lane's own AU-MED-102 sibling batch (which this lane already knew to check per its shared-university convention) returned this exact record.
examSignal: AGHA-CHO Q17 (p4/5, keyed a) -- "malate shuttle purpose" in the gluconeogenesis question cluster.

---

# Item

## id
CON-FND-FA3952AF2C99EA

## label
Converting two pyruvate to one glucose by gluconeogenesis costs six high-energy phosphate bonds, not two

## universities
+au

## learner_years
+1

## modules
+AU-MED-103

## field_notes
pendingLiveTarget: AU-MED-102-biochem-metabolism-concepts.md (Alexandria, sibling module AU-MED-102) -- this id is not yet live; hold until that batch is imported, per pending-live/INDEX.md.
sourceCandidateIds: find-existing.mjs run for "gluconeogenesis ATP cost" -- no hit by that exact phrase; found instead by reading the sibling AU-MED-102-biochem-metabolism-concepts.md file this lane already had open for the malate-shuttle reuse above.
examSignal: AGHA-CHO Q20-21 (p5, keyed c,a) -- "ATP required to convert 2 pyruvate to glucose".

---

# Item

## id
CON-HEM-6BA5D04F841FBA

## label
Delta-aminolevulinate (ALA) synthase is the rate-limiting enzyme of haem biosynthesis, requiring pyridoxal phosphate and condensing glycine with succinyl-CoA

## universities
+au

## learner_years
+1

## modules
+AU-MED-103

## field_notes
pendingLiveTarget: AU-MED-102-biochem-nitrogen-blood-concepts.md (Alexandria, sibling module AU-MED-102) -- this id is not yet live; hold until that batch is imported, per pending-live/INDEX.md.
sourceCandidateIds: find-existing.mjs run for "ALA synthase", "delta-aminolevulinic acid synthase" -- the first query returned this exact record (pending, AU-MED-102) plus the sibling Kasr 103-BMS-MCQ-protein-heme.md question bank; the second returned nothing.
examSignal: AGHA-BLOOD Q8 (p4, keyed a, rate-limiting step), Q10 (p5, keyed d, rate-limiting enzyme restated), Q11 (p5, keyed b, precursors of haem except), Q24-25 (p6/7, keyed d,d, PLP cofactor and glycine substrate), Q49 (p12, keyed b, hematin represses ALA synthase in porphyria treatment).
