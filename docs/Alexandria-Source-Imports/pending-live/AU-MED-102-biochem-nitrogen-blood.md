<!--
  AU-MED-102 · Biochemistry · sub-lane C — sparse updates onto eight concept IDs that are
  HIT-PENDING (found only in unimported Kasr Year-1 batches, never in
  server/data/medical-library-v1.json), per LANE-BRIEF §16 rule 1. Omar must not import
  this file from any import root; it is held here until each named Kasr file is live, per
  pending-live/INDEX.md.

  Every id below was found by the mandatory ≥4-query find-existing.mjs search plus
  grep -ril "<canonical_key>" docs/*-Source-Imports/concept/ (LANE-BRIEF §10/§16/§18
  corrections). Two ids repeat (CON-FND-C9E5128193029E covers two source questions;
  CON-FND-1A4A49607783A9 covers two more) — one update record per id, per the manual's
  "never two files/records naming one id" rule.

  `module_subject` and `exam_signal` do NOT take a `+` append — medical:batch reports
  "this column does not take an append... write this field as a full replacement" when
  tried. Both fields below are therefore written as the FULL value: the Kasr file's own
  existing content (read directly from the file, quoted in each record's field_notes)
  plus this lane's own AU-MED-102 line — never a plain `+` line, and never a bare
  replacement that would silently drop the Kasr lane's own module/exam data.

  Per the 2026-08-22 orchestrator correction: validate each record here with
  `medical:simulate --with <the Kasr file named below>`; failing WITHOUT --with and
  passing WITH it is the correct, expected state (an update row for an id that is neither
  live nor in the same batch folder is now an error, not a silent stub).
-->

# Item

## id
CON-HEM-4C0C6A97CA8788

## label
Lead blocks haem synthesis at both ends of the pathway — ALA dehydratase and ferrochelatase — which is why the anaemia is microcytic and iron does not fix it

## universities
+au

## modules
+AU-MED-102



## learner_years
+1

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p137 q6, topic cancelled from both exams | 103 BMS
src_9929d079ddfd6e073223 | department_question_book | undated | p11 q51 | AU-MED-102

## field_notes
moduleSubject: full replacement — the Kasr line (103 BMS) is preserved verbatim from the source file and this lane's AU-MED-102 line is appended, since this field does not take `+`.
examSignal: full replacement for the same reason. Alexandria's own Enzymes MCQ bank (src_9929d079ddfd6e073223, Q51) tests the same fact from the kinetics side — "which of the following describes this type of inhibition?", key d, "Lead combines with the enzyme reversibly forming the enzyme-substrate-inhibitor complex" — as an update to Kasr's 103-BMS pending concept rather than a second record, per LANE-BRIEF §16 rule 1. Sub-lane C's D35 (enzymology exception reassigned here per triage §9).

---

# Item

## id
CON-FND-C9E5128193029E

## label
The water-soluble vitamins are coenzymes, and a matching question tests which reaction each one runs

## universities
+au

## modules
+AU-MED-102



## learner_years
+1

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p8 | 103 BMS
src_9929d079ddfd6e073223 | department_question_book | undated | p13 q60 | AU-MED-102

## field_notes
moduleSubject: full replacement — the Kasr line (103 BMS) is preserved verbatim and this lane's AU-MED-102 line is appended.
examSignal: full replacement for the same reason. Alexandria's Enzymes MCQ bank (src_9929d079ddfd6e073223, Q60) tests exactly the biotin/carboxylase pairing this concept's definition already states ("Biotin runs carboxylation, that is, CO2 fixation") — key a, "Biotin and Carboxylases" — as an update rather than a second record. This is sub-lane C's D37 (enzymology exception reassigned here per triage §9). The AFM bank's own Blood-section Q8 (folate deficiency -> megaloblastic anaemia) and the propionic-acid/B12 question this concept's definition partly overlaps (methylmalonyl-CoA -> succinyl-CoA) are NOT added here as further exam_signal lines: this lane judged those two AU facts (H7, and the B12/methylmalonic-acid diagnostic-marker objective) distinct enough in grain to deserve their own concepts — CON-HEM-6BB1F814D007D1, minted in concept/AU-MED-102-biochem-nitrogen-blood-concepts.md — rather than folding every vitamin fact onto this one broad matching-style record. See that concept's own field_notes for the reasoning.

---

# Item

## id
CON-FND-1A4A49607783A9

## label
Folate antagonists work at two different enzymes, and that is why one is an antibiotic and the other an anticancer drug

## universities
+au

## modules
+AU-MED-102



## learner_years
+1

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p1 | 103 BMS
src_01ab4268402d32d4d111 | department_question_book | undated | p38 q7 | AU-MED-102
src_01ab4268402d32d4d111 | department_question_book | undated | p39 q10 | AU-MED-102

## field_notes
moduleSubject: full replacement — the Kasr line (103 BMS) is preserved verbatim and this lane's AU-MED-102 line is appended.
examSignal: full replacement for the same reason. Alexandria's AFM bank (Blood section) tests this concept twice. Q7 ("Folic acid is inhibited by:", key b, "Methotrexate") is sub-lane C's H6. Q10 ("Defective synthesis of thimedylic [thymidylate] acid occurs in deficiency of:", key a, "Folic acid") is sub-lane C's H9 — the same mechanism this concept's own definition already states ("the conversion of dUMP to dTMP needs methylene-THF"). Both are recorded on one update rather than two, since both point at the same live-fact grain this Kasr concept already teaches; a separate concept for H9 alone would repeat what this record already says.

---

# Item

## id
CON-FND-46C9A4425362B0

## label
Bleeding gums, falling teeth and wounds that will not heal are collagen failing, and the cause is vitamin C deficiency

## universities
+au

## modules
+AU-MED-102



## learner_years
+1

## exam_signal
src_c30d9391aa0861f41e44 | question_book | | p7 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p19 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p20 | 101 ISK
src_4852d425a88297af190e | department_question_book | undated | p11 q59 | AU-MED-102
src_4852d425a88297af190e | department_question_book | undated | p11 q60 | AU-MED-102

## field_notes
moduleSubject: full replacement — the Kasr line (101 ISK) is preserved verbatim and this lane's AU-MED-102 line is appended.
examSignal: full replacement for the same reason. Alexandria's Protein MCQ bank tests scurvy twice. Q59 ("All the following are manifestations of Scurvey except:", key d, "Diarrhea" — the false/EXCEPT option, since bleeding gums, defective bone formation and perifollicular red spots are the true manifestations this record already names) and Q60 ("Which of the following may be a cause of bleeding while brushing teeth?", key a, "Vitamin C deficiency"). This is sub-lane C's C37 (Protein-Chemistry exception reassigned here per triage §9).

---

# Item

## id
CON-NEU-46F59E9C3EA406

## label
Glutamic acid gives GABA, glutamine, glutathione, arginine and proline, and is gamma-carboxylated for clotting factors — but not heme

## universities
+au

## modules
+AU-MED-102



## learner_years
+1

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | printed p120 q6 | 103 BMS
src_4852d425a88297af190e | department_question_book | undated | p11 q64 | AU-MED-102
src_4852d425a88297af190e | department_question_book | undated | p12 q71 | AU-MED-102

## field_notes
moduleSubject: full replacement — the Kasr line (103 BMS) is preserved verbatim and this lane's AU-MED-102 line is appended.
examSignal: full replacement for the same reason. Alexandria's Protein MCQ bank tests glutamic acid's GABA connection twice. Q64 ("Which amino acid is a precursor of gamma amino butyric acid?", key d, "Glutamic acid") is sub-lane C's C38. Q71 ("Which type of amino acid is Gamma Amino Butyric Acid?", key c, "Non Protein Amino acid") is a corroborating fact about the same product this concept already names; recorded on the same update rather than a second record.

---

# Item

## id
CON-FND-FA4D15805B9D02

## label
Tyrosine is the precursor of the catecholamines, melanin and the thyroid hormones, and DOPA is where the first two part company

## universities
+au

## modules
+AU-MED-102



## learner_years
+1

## exam_signal
src_07f0a0ff41addf826c7f | department_questions | undated | p123 q20, q21, q23 and q25; p122 q18; p124 q27 | 103 BMS
src_4852d425a88297af190e | department_question_book | undated | p12 q67 | AU-MED-102

## field_notes
moduleSubject: full replacement — the Kasr line (103 BMS) is preserved verbatim and this lane's AU-MED-102 line is appended.
examSignal: full replacement for the same reason. Alexandria's Protein MCQ bank, Q67 ("Adrenaline and Noradrenaline are hormones of Adrenal Medulla. Which of the following is their precursor?", key c, "DOPA") tests the immediate catecholamine precursor this concept already names. This is sub-lane C's C39 (Protein-Chemistry exception reassigned here per triage §9).

---

# Item

## id
CON-HEM-C79EA8644C0C9C

## label
The three anaemias this chapter names fail at three different points: the marrow, the vitamin, and the haemoglobin molecule

## universities
+au

## modules
+AU-MED-102



## learner_years
+1

## exam_signal
src_34c967631e388497dc35 | question_book | | p1 | 101 ISK
src_34c967631e388497dc35 | question_book | | p4 | 101 ISK
src_34c967631e388497dc35 | question_book | | p8 | 101 ISK
src_c6ab1b49dc16762227e1 | question_book | | p2 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p4 | 101 ISK
src_01ab4268402d32d4d111 | department_question_book | undated | p39 q12 | AU-MED-102

## field_notes
moduleSubject: full replacement — the Kasr line (101 ISK) is preserved verbatim and this lane's AU-MED-102 line is appended.
examSignal: full replacement for the same reason. Alexandria's AFM bank (Blood section), Q12 ("Pernicious anemia is caused by:", key c, "Absence of intrinsic factor of the gastric juice") tests exactly the pernicious-anaemia third of this Kasr 101-ISK concept, which already states "Pernicious anaemia is a deficiency of vitamin B12 caused by the stomach's failure to produce intrinsic factor". Sub-lane C's H11. The concept's other two anaemias (aplastic, sickle-cell) are not tested by this Alexandria source and are left alone.

---

# Item

## id
CON-FND-5DBC795B58DC74

## label
Haemosiderin is stored excess iron, deposited locally after bleeding or throughout the body in overload

## universities
+au

## modules
+AU-MED-102


## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p13 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p8 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p2 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p8 | 108 INT
src_01ab4268402d32d4d111 | department_question_book | undated | p41 q26 | AU-MED-102

## learner_years
+1

## field_notes
moduleSubject: full replacement — the Kasr line (108 INT) is preserved verbatim and this lane's AU-MED-102 line is appended.
examSignal: full replacement for the same reason. Alexandria's AFM bank (Blood section), Q26 ("If the iron exceeds the capacity of the body to store it as ferritin it accumulates as:", key c, "Hemosiderin") tests the same fact this 108-INT (Year-2 Pathology) concept already states. Sub-lane C's H21. Reused across a different module/year on purpose — one medical idea, one concept ID, per the manual's overlay design; `learner_years` gains `1` alongside its existing coverage rather than replacing it (this field does take a `+`, confirmed against `universities`/`modules` behaving the same way in medical:simulate).
