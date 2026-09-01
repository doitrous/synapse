<!--
  AU-MED-102 * Biochemistry * sub-lane A enzymology -- sparse updates onto nine concept
  IDs that are HIT-LIVE (already in server/data/medical-library-v1.json as part of the
  Kasr 102-INT bundle), per LANE-CARD's "reuse Kasr's concept via a sparse overlay"
  instruction. Staged here rather than applied directly because this lane never runs the
  live-DB importer (chief of staff only, per LANE-CARD SS2) -- the same pending-live
  mechanism used for HIT-PENDING ids, just with a live rather than pending base.

  Apply after: docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md (8 of the 9 ids:
  CON-FND-BA7E60E9E6800B, CON-FND-5846431203789F, CON-FND-028C50A610B2A2,
  CON-FND-F6E154FA6FF42A, CON-FND-CB8584ED2F3C49, CON-FND-6BBAC69900B22F,
  CON-FND-6A58FA1680290F, CON-FND-F29934C070A94C) and
  docs/Kasr-Source-Imports/concept/102-INT-concepts.md (1 id: CON-FND-DD3EE5EC8C07D1,
  the LDH/CK isoenzyme concept covered by the 2026-08-27 LDH/CK isoenzyme ruling --
  reused here, not re-derived). Both files are already live; this overlay only adds the
  `au`/`AU-MED-102`/year-1 tags and Alexandria's own exam_signal rows that the live
  import is missing.

  Every id below was found via docs/Alexandria-Source-Imports/coverage/AU-MED-102-biochemistry-triage.md
  section D (Enzymology, D1-D40 minus D35/D37 which the chief of staff's section 9
  sub-lane split reassigned to sub-lane C) and confirmed by a direct read of
  docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md and 102-INT-concepts.md
  (grep -n "enzyme|Km|Vmax|..." plus a full-record parse) -- not a keyword-only hit.

  `exam_signal` does NOT take a `+` append -- medical:batch reports "this column does
  not take an append... write this field as a full replacement" when tried. It is
  therefore written as the FULL value below: the Kasr file's own existing exam_signal
  row, preserved verbatim, plus this lane's own AU-MED-102 row -- never a bare
  replacement that would silently drop the Kasr lane's own signal.

  Questions testing these nine reused concepts are in
  pending-live/AU-MED-102-biochem-enzymology-questions.md, same apply-after targets.

  Validate with (8 ids):
    node scripts/content/gate.mjs batch docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-enzymology-overlays.md \
      --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
      --with docs/Kasr-Source-Imports/concept/102-INT-concepts.md
  Failing WITHOUT --with and passing WITH it is the correct, expected state (an update
  row for an id that is neither live nor in the same batch folder is an error).
-->

# Item

## id
CON-FND-BA7E60E9E6800B

## label
Enzymes are protein biocatalysts, produced by living cells, needed in tiny amounts, unchanged by the reaction, and highly specific for the substrate they act on

## universities
+au

## modules
+AU-MED-102

## learner_years
+1

## exam_signal
src_07f0a0ff41addf826c7f | question_book | | p45 | 102 INT
src_9929d079ddfd6e073223 | department_question_book | undated | p2,p6 q6,q26 | AU-MED-102

## field_notes
examSignal: full replacement -- the Kasr line (102 INT) is preserved verbatim from the source file and this lane's AU-MED-102 line is appended, since this field does not take `+`.
au: Alexandria's own Enzymes MCQ bank (src_9929d079ddfd6e073223) tests the same general-properties fact twice: Q6 ("an enzyme is: protein in nature" -- keyed to the protein-in-nature option specifically, this bank's key not choosing 'all of the above' since not every listed property is universally true) and Q26 (enzymes are heat labile, colloidal, non-dialyzable -- all true, contrasted with a coenzyme's opposite, small/dialyzable nature).

---

# Item

## id
CON-FND-5846431203789F

## label
The enzyme's active site catalyses the reaction by lowering the activation energy, without changing the reaction's equilibrium or free energy change

## universities
+au

## modules
+AU-MED-102

## learner_years
+1

## exam_signal
src_07f0a0ff41addf826c7f | question_book | | p45 | 102 INT
src_9929d079ddfd6e073223 | department_question_book | undated | p3,p6 q7,q9,q25,q27 | AU-MED-102

## field_notes
examSignal: full replacement -- the Kasr line (102 INT) is preserved verbatim from the source file and this lane's AU-MED-102 line is appended, since this field does not take `+`.
au: Tested four ways by Alexandria's Enzymes MCQ bank: Q7 (enzyme reduces Ea), Q9 (an EXCEPT item -- enzymes do NOT alter equilibrium, the direct converse of Q7), Q25 (transition state -- the high-energy state the lowered Ea makes easier to reach) and Q27 (active site = the region that binds substrate, the site where Ea-lowering catalysis happens).

---

# Item

## id
CON-FND-028C50A610B2A2

## label
Km is the substrate concentration that gives half the maximal velocity, and a smaller Km means higher enzyme-substrate affinity

## universities
+au

## modules
+AU-MED-102

## learner_years
+1

## exam_signal
src_07f0a0ff41addf826c7f | question_book | | p46 | 102 INT
src_9929d079ddfd6e073223 | department_question_book | undated | p3,p12 q10,q53 | AU-MED-102

## field_notes
examSignal: full replacement -- the Kasr line (102 INT) is preserved verbatim from the source file and this lane's AU-MED-102 line is appended, since this field does not take `+`.
au: Alexandria's Enzymes MCQ bank tests the same Km definition twice: Q10 (direct definition) and Q53 (an applied scenario -- enzyme A half-maximal at 0.05mM vs enzyme B at 5mM, so A has the lower Km and therefore higher affinity).

---

# Item

## id
CON-FND-F6E154FA6FF42A

## label
A zymogen (proenzyme) is an inactive enzyme precursor, activated by proteolysis that removes the part of the chain masking the active site — pepsinogen becoming pepsin is the classic autocatalytic example

## universities
+au

## modules
+AU-MED-102

## learner_years
+1

## exam_signal
src_07f0a0ff41addf826c7f | question_book | | p48 | 102 INT
src_9929d079ddfd6e073223 | department_question_book | undated | p3 q11 | AU-MED-102

## field_notes
examSignal: full replacement -- the Kasr line (102 INT) is preserved verbatim from the source file and this lane's AU-MED-102 line is appended, since this field does not take `+`.
au: Alexandria's Enzymes MCQ bank Q11 tests the same zymogen definition ("enzymes which are synthesized in an inactive form are called: d. Zymogens").

---

# Item

## id
CON-FND-CB8584ED2F3C49

## label
A competitive inhibitor resembles the substrate closely enough to occupy the active site, so it raises the apparent Km without touching Vmax and is defeated by adding more substrate

## universities
+au

## modules
+AU-MED-102

## learner_years
+1

## exam_signal
src_07f0a0ff41addf826c7f | question_book | | p47 | 102 INT
src_9929d079ddfd6e073223 | department_question_book | undated | p3 q12 | AU-MED-102

## field_notes
examSignal: full replacement -- the Kasr line (102 INT) is preserved verbatim from the source file and this lane's AU-MED-102 line is appended, since this field does not take `+`.
au: Alexandria's Enzymes MCQ bank Q12 tests the same competitive-inhibition kinetic signature ("inhibitor has structural similarity to substrate").

---

# Item

## id
CON-FND-6BBAC69900B22F

## label
Allosteric effectors bind a site distinct from the catalytic site and change enzyme activity by producing a conformational change in the protein

## universities
+au

## modules
+AU-MED-102

## learner_years
+1

## exam_signal
src_07f0a0ff41addf826c7f | question_book | | p48 | 102 INT
src_9929d079ddfd6e073223 | department_question_book | undated | p2,p8 q1,q34 | AU-MED-102

## field_notes
examSignal: full replacement -- the Kasr line (102 INT) is preserved verbatim from the source file and this lane's AU-MED-102 line is appended, since this field does not take `+`.
au: Alexandria's Enzymes MCQ bank tests the same allosteric mechanism twice: Q1 (an allosteric inhibitor causes conformational change to the active site) and Q34 (the allosteric site is distinct from the substrate binding site).

---

# Item

## id
CON-FND-6A58FA1680290F

## label
Reversible phosphorylation/dephosphorylation is a covalent modification, catalysed by protein kinase and protein phosphatase, that can activate or inactivate an enzyme depending on which enzyme it is

## universities
+au

## modules
+AU-MED-102

## learner_years
+1

## exam_signal
src_07f0a0ff41addf826c7f | question_book | | p48 | 102 INT
src_9929d079ddfd6e073223 | department_question_book | undated | p13 q61 | AU-MED-102

## field_notes
examSignal: full replacement -- the Kasr line (102 INT) is preserved verbatim from the source file and this lane's AU-MED-102 line is appended, since this field does not take `+`.
au: Alexandria's Enzymes MCQ bank Q61 tests the same covalent-modification fact ("regulation of enzyme activity by covalent modification involves addition or removal of: b. Phosphate").

---

# Item

## id
CON-FND-DD3EE5EC8C07D1

## label
LDH is a tetramer of H and M subunits forming five tissue isoenzymes and CK is a dimer of M and B subunits forming three, and it is that tissue distribution that makes each isoenzyme's rise diagnostic of where it leaked from

## universities
+au

## modules
+AU-MED-102

## learner_years
+1

## exam_signal
src_78d4962525e01c247496 | baqoon | 2022 | p9 | 102 INT
src_9929d079ddfd6e073223 | department_question_book | undated | p4,p5,p11 q15,q20,q49 | AU-MED-102

## field_notes
examSignal: full replacement -- the Kasr line (102 INT) is preserved verbatim from the source file and this lane's AU-MED-102 line is appended, since this field does not take `+`.
au: Alexandria's Enzymes MCQ bank tests the same LDH/CK isoenzyme fact three ways: Q15 (isoenzymes have identical polypeptide chains -- the false EXCEPT option), Q20 (isoenzymes have different amino acid sequence but the same function) and Q49 (a clinical vignette -- a 50-year-old man with sudden chest pain, expecting LDH1 to rise, the classic myocardial-infarction isoenzyme pattern this Kasr concept already teaches). Per the 2026-08-27 LDH/CK isoenzyme ruling, this record is reused, not re-derived.

---

# Item

## id
CON-FND-F29934C070A94C

## label
The rate of an enzyme-catalysed reaction is set by substrate concentration, enzyme concentration, cofactor concentration, temperature and pH

## universities
+au

## modules
+AU-MED-102

## learner_years
+1

## exam_signal
src_07f0a0ff41addf826c7f | question_book | | p46,p47 | 102 INT
src_9929d079ddfd6e073223 | department_question_book | undated | p7,p11,p13 q31,q52,q56 | AU-MED-102

## field_notes
examSignal: full replacement -- the Kasr line (102 INT) is preserved verbatim from the source file and this lane's AU-MED-102 line is appended, since this field does not take `+`.
au: Alexandria's Enzymes MCQ bank tests three of these five rate factors from different angles: Q31 (chloride as an activator of salivary amylase -- the cofactor-concentration factor acting positively), Q52 (vigorous shaking irreversibly inhibits activity -- the temperature/agitation factor) and Q56 (why activity rises when more substrate is added -- the substrate-concentration factor).
