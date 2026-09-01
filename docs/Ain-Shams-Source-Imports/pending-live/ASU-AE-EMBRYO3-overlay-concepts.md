<!--
  ASU-AE · Embryo 3 cluster — pending-live sparse CONCEPT overlay

  13 concept ids Embryo 3's own 42 authored MCQs target — 12 in
  `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`, 1 in
  `docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md`
  — none of which carry `asu`/`ASU-AE` traceability yet. Same pattern as
  `pending-live/ASU-AE-embryology-overlay-concepts.md` (Embryo 2's own
  overlay pass, whose CON-DEV-1D10DF3B716A70 entry this Embryo 3 pass
  extended in place rather than duplicating here).

  Sparse only: every row restates `## label` verbatim; `## module_subject`
  restates the source's existing line(s) plus this bank's own addition in
  full (full-replacement field, no `+` semantics); `## exam_signal`
  restates the source's existing lines plus this bank's own addition in
  full for the 101-ISK-targeted rows (the AU-MED-102 concept carries no
  `exam_signal` column, so none is added there). `## universities` and
  `## modules` are true ID-list columns and take `+asu` / `+ASU-AE`.
  `## field_notes` carries the ASU source note only (concepts have no
  `university_notes` column).

  Every fact below is tested by "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3)
  only; stems/options were re-read from the rendered page images (300 DPI)
  wherever OCR was ambiguous or (p.18) the scan was physically cropped, not
  from OCR text alone. Full per-question disposition table:
  `coverage/ASU-AE-triage.md`, "Embryo 3 — full disposition (104/104)".

  Apply after: `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`
  and `docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md`
  are live (both already confirmed live 2026-08-27 per the same BOARD
  entries Embryo 2's own overlay file cites; this checkout's own
  `medical:simulate` fixture snapshot predates that import and does not
  contain these ids — expected staleness, not evidence the dependency is
  missing).

  Simulate together with the source file each block targets:
    npm run medical:simulate -- \
      docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md \
      docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-embryology-overlay-concepts.md \
      docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-EMBRYO3-overlay-concepts.md \
      --emit /tmp/sim-ASU-AE-embryo3-overlay-concepts.json

  Import: Admin › Bulk import → concept, only after Omar confirms the two
  source files above are live (or re-runs `medical:snapshot-live`).
-->

# Item

## id
CON-DEV-215BD7E9E58872

## label
Gastrulation makes the trilaminar disc in the third week, and all three of its layers come from the epiblast

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Third Week of Development
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_12d639a625d8305c4454 | question_book | | p5 | 101 ISK
src_08bc782553366518791e | question_book | | p119 | 101 ISK
src_12d639a625d8305c4454 | question_book | | p6 | 101 ISK
src_3448fabd352cb8018ed3 | question_book | | p1 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p7 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p12 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3 Q1 ("The primitive streak develops in which layer of embryonic disc?" -- a. Epiblast), Q44 ("On what week of intrauterine life does gastrulation occur?" -- d. 3rd), Q81 ("Sources of intraembryonic mesoderm:" -- d. All of the above) and Q82 ("Intraembryonic mesoderm is absent in:" -- e. All of the above) all test this record's own definition directly (primitive-streak/epiblast origin, third-week timing, the three sources, and the three mesoderm-free sites). Q5, Q65, Q69, Q73, Q74 and Q84 test the same facts from other angles and were held as duplicates. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 1, 44, 81, 82; answer key p.17 rows 1=a, 44=d; p.19 rows 81=d, 82=e.

---

# Item

## id
CON-DEV-3AB7E19B99F387

## label
The first somite pair appears on day 20 and three pairs are added each day, so the number of somites gives the embryo's age

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Embryonic Period
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_764a2521809818b8abdc | question_book | | p93 | 101 ISK
src_3448fabd352cb8018ed3 | question_book | | p3 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p6 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3 Q17 ("The number of somites during the 22nd day is:" -- c. Seven) and Q34 ("The earliest somites begin to appear on day:" -- c. 20) both test this record's own day-20-onset/+3-per-day formula directly, and the source's own printed answer key shows the identical worked arithmetic (Day20->1, Day21->4, Day22->7) this record's formula reproduces. Q29, Q53 and Q66 test the same formula from other days and were held as duplicates. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 17 and 34; answer key p.17 rows 17=c, 34=c.

---

# Item

## id
CON-DEV-5E63C211DEEE00

## label
Each somite splits into a sclerotome and a dermomyotome, and those become bone, dermis and muscle

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Third Week of Development
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_08bc782553366518791e | question_book | | p122 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p5 | 101 ISK
src_9487fd713153c573087f | question_book | | p6 | 101 ISK
src_3448fabd352cb8018ed3 | question_book | | p10 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p16 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3's richest deferred duplicate cluster (10 of the 104 rows). Q67 ("Skin develops from:" -- d. Ectoderm & mesoderm) and Q104 ("As regards the somites, choose the correct statement:" -- e. All of the above, combining the myotome/sclerotome/dermatome scheme) both test this record's own differentiation scheme directly. Q2, Q12, Q16, Q20, Q24, Q47, Q79, Q80 and Q88 test single pieces of the same scheme from other angles and were held as duplicates. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 67 and 104; answer key p.18 row 67=d, p.20 row 104=e.

---

# Item

## id
CON-DEV-4BC4233153C3DC

## label
The neural plate is thickened median ectoderm induced by the notochord beneath it, and it folds into the neural tube

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Third Week of Development
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_764a2521809818b8abdc | question_book | | p92 | 101 ISK
src_08bc782553366518791e | question_book | | p125 | 101 ISK
src_9487fd713153c573087f | question_book | | p6 | 101 ISK
src_3448fabd352cb8018ed3 | question_book | | p3 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p7 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p12 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3 Q18 ("The anterior neuropore closes on day:" -- d. 25), Q41 ("Induces embryonic development of the nervous system:" -- b. Notochord) and Q83 ("Neural plate is derived from:" -- d. Ectoderm dorsal to notochord) all test this record's own induction/closure-order facts directly, Q18 adding the specific day-25 figure this source teaches. Q72 tests the neural-tube-forms-CNS half of the same fact and was held as a duplicate. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 18, 41, 83; answer key p.17 row 18=d, p.19 rows 41=b (prose), 83=d.

---

# Item

## id
CON-DEV-785CE84F7C03DB

## label
The neural tube becomes the central nervous system; the neural crest beside it becomes almost everything peripheral

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Third Week of Development
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_12d639a625d8305c4454 | question_book | | p6 | 101 ISK
src_764a2521809818b8abdc | question_book | | p92 | 101 ISK
src_08bc782553366518791e | question_book | | p123 | 101 ISK
src_3448fabd352cb8018ed3 | question_book | | p6 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p7 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3 Q35 ("The neural crest cells give rise to the following EXCEPT:" -- e. Retina of the eye), Q40 ("Pigment cells of the skin (melanocytes) are derived from:" -- c. Neural crest) and Q42 ("The following structures are of neural crest origin EXCEPT:" -- d. Dura matter) all test this record's own neural-tube-vs-neural-crest derivative split directly. Q68, Q76 and Q101 test the same split from other angles and were held as duplicates. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 35, 40, 42; answer key p.17 row 35=e, p.18 rows 40=c, 42=d.

---

# Item

## id
CON-DEV-1BCF37C48AF307

## label
The notochord forms in four steps, guides the embryo, and ends as the nucleus pulposus

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Third Week of Development
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_12d639a625d8305c4454 | question_book | | p6 | 101 ISK
src_764a2521809818b8abdc | question_book | | p92 | 101 ISK
src_9487fd713153c573087f | question_book | | p6 | 101 ISK
src_12d639a625d8305c4454 | question_book | | p5 | 101 ISK
src_764a2521809818b8abdc | question_book | | p91 | 101 ISK
src_16f747e1171423933757 | question_book | | p10 | 101 ISK
src_3448fabd352cb8018ed3 | question_book | | p7 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p8 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p13 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p14 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3 Q45 ("The notochord is derived from:" -- e. Epiblast), Q50 ("Amniotic cavity is temporarily connected to the yolk sac cavity via:" -- c. Neurenteric canal), Q86 ("The notochord:" -- b. Forms the nucleus pulposus of the intervertebral disc) and Q90 ("All the following are fetal membranes EXCEPT:" -- e. Notochord) all test this record's own four-step formation/fate account directly. Q38 and Q85 test the same fate/origin facts from other angles and were held as duplicates. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 45, 50, 86, 90; answer key p.17 rows 45=e, 86=b; p.19 rows 50=c, 90=e.

---

# Item

## id
CON-DEV-2E3E3098D90C0C

## label
Intra-embryonic mesoderm divides into paraxial, intermediate and lateral plate, and each division has its own derivatives

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Third Week of Development
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_12d639a625d8305c4454 | question_book | | p8 | 101 ISK
src_764a2521809818b8abdc | question_book | | p94 | 101 ISK
src_3448fabd352cb8018ed3 | question_book | | p2 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p8 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p10 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3 Q9 ("The kidneys are derived from which part of the intraembryonic mesoderm?" -- c. Intermediate cell mass), Q49 ("The arteries, veins and lymphatic channels develop from:" -- c. Mesoderm) and Q71 ("Visceral pericardium originates from:" -- a. Splanchnic layer of lateral plate mesoderm) all test this record's own three-division/derivative scheme directly. Q33, Q51 and Q97 test the same scheme from other angles and were held as duplicates. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 9, 49, 71; answer key p.17 row 9=c, p.18 row 49=c, p.18 row 71=a.

---

# Item

## id
CON-DEV-C84AD85AB265CC

## label
Ectoderm makes the nervous system and the epidermis; endoderm makes the linings and the glandular parenchymas

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Third Week of Development
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_12d639a625d8305c4454 | question_book | | p7 | 101 ISK
src_764a2521809818b8abdc | question_book | | p94 | 101 ISK
src_3448fabd352cb8018ed3 | question_book | | p3 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p13 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3 Q13 ("The lining of respiratory passages is derived from:" -- d. Endoderm) and Q87 ("All the following are derivatives of ectoderm EXCEPT:" -- c. Pancreas) both test this record's own ectoderm/endoderm derivative lists directly (respiratory lining and pancreatic parenchyma). Q25, Q30, Q39, Q48, Q77, Q89 and Q100 test the same lists from other angles and were held as duplicates. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 13 and 87; answer key p.17 row 13=d, p.19 row 87=c.

---

# Item

## id
CON-FND-5097CA5BAB2E51

## label
Named syndromes follow from a specific extra chromosome, missing sex chromosome or deleted arm

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Histology > Cytology > Nucleus
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_12d639a625d8305c4454 | question_book | | p14 | 101 ISK
src_764a2521809818b8abdc | question_book | | p100 | 101 ISK
src_08bc782553366518791e | question_book | | p133 | 101 ISK
src_3448fabd352cb8018ed3 | question_book | | p1 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p5 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p7 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3's second-richest deferred duplicate cluster (20 of the 104 rows, including a 10-item matching-format sub-cluster held rather than attempted). Q3 ("Which syndrome has 44+XXY chromosomes?" -- c. Klinefelter's), Q31 ("A boy having Down's syndrome is characterized by a chromosomal formula:" -- e. 45+XY) and Q43 ("Turner's syndrome has the following genotype:" -- b. 44+X) all test this record's own named-syndrome genotypes directly, in the same '44+' notation this record already uses. Q7, Q8, Q15, Q19, Q21, Q27, Q98 and the matching clusters Q55-59/Q60-64 test the same three syndrome facts from other angles or in a different question format and were held as duplicates/not-attempted. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 3, 31, 43; answer key p.17 rows 3=c, 31=e, 43=b.

---

# Item

## id
CON-DEV-44A219B862FFD5

## label
Folding turns a flat disc into a cylinder with a gut inside it and a ring in its belly wall

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Embryonic Period
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_12d639a625d8305c4454 | question_book | | p9 | 101 ISK
src_764a2521809818b8abdc | question_book | | p95 | 101 ISK
src_08bc782553366518791e | question_book | | p126 | 101 ISK
src_3448fabd352cb8018ed3 | question_book | | p8 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p11 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3 Q46 ("Lateral folding leads to the formation of an elongated:" -- b. Gut tube) and Q78 ("All the following are results of folding EXCEPT:" -- d. Connecting stalk becomes dorsal, i.e. it actually becomes ventral) both test this record's own results-of-folding account directly. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 46 and 78; answer key p.18 row 46=b, p.19 row 78=d.

---

# Item

## id
CON-DEV-134C8B5E98D759

## label
The cord runs primitive umbilical ring to primitive cord to definitive cord, and the physiological hernia lives in the primitive cord

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Fetal Membranes
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_12d639a625d8305c4454 | question_book | | p11 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p5 | 101 ISK
src_ce4292e31edea7517e7b | question_book | | p5 | 101 ISK
src_3448fabd352cb8018ed3 | question_book | | p2 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p4 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p14 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3 Q11 ("Which of the following is not found in the umbilical cord at full term:" -- e. Right umbilical vein), Q22 ("The allantois is present in the:" -- c. Connecting stalk) and Q94 ("The primitive umbilical cord contains all the following EXCEPT:" -- d. One umbilical artery, since it actually has two) all test this record's own cord-development/contents account directly. Q36, Q51 and Q52 test the same facts from other angles and were held as duplicates. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 11, 22, 94; answer key p.17 rows 11=e, 22=c; p.19 row 94=d.

---

# Item

## id
CON-DEV-3E918A4C74B56D

## label
The cord goes wrong in its length, its contents, its vessels or its attachment

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Fetal Membranes
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_08bc782553366518791e | question_book | | p130 | 101 ISK
src_9487fd713153c573087f | question_book | | p5 | 101 ISK
src_3448fabd352cb8018ed3 | question_book | | p1 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p14 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3 Q4 ("An umbilical cord attached to the margin of the placenta is called:" -- c. Battledore placenta) and Q95 ("As regards anomalies of the umbilical cord, the following are true EXCEPT:" -- c. A true knot is due to local accumulation of Wharton's jelly, which actually causes a false knot) both test this record's own cord-anomaly classification directly; Q4's fact is also stated by a separate live record (CON-OBS-C095B75A61EA4F, Battledore cord attachment), tagged as this question's `contextual_concept_ids`. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 4 and 95; answer key p.17 row 4=c, p.19 row 95=c.

---

# Item

## id
CON-DEV-3D26C14BF0AA28

## label
Oligohydramnios is amniotic fluid under 400 mL

## universities
+asu

## modules
+ASU-AE

## module_subject
AU-MED-102 > Embryology > Amnion
ASU-AE > Embryology > Questions > Embryo 3

## field_notes
overlay: Sparse update only -- pending-hit (AU-MED-102). Embryo 3 Q6 ("The normal volume of amniotic fluid at birth is:" -- d. 1000 mL) and Q26 ("Oligohydramnios could indicate the presence of:" -- c. Renal agenesis) both test this record's own definition directly -- the normal term range it states (roughly 800-1500 mL) covers Q6's 1000 mL figure, and its stated fetal-renal/urinary-outflow mechanism covers Q26's renal-agenesis answer. Q14 tests the same oligohydramnios/renal-agenesis fact from another angle and was held as a duplicate. This row only adds ASU/ASU-AE traceability and the module_subject union; every other field is left as the pending record holds it (this AU-MED-102 concept carries no `exam_signal` column). Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), questions 6 and 26; answer key p.17 rows 6=d, 26=c.

---

# Item

## id
CON-DEV-F356C3B8CFD31E

## label
Amniotic fluid is a clear watery fluid of water, electrolytes, protein, carbohydrate, lipid, phospholipid and urea, produced first by the amnioblast cells, then derived from maternal blood by osmosis, with fetal urine added from the fifth month

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Fetal Membranes
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_3448fabd352cb8018ed3 | question_book | | p14 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK). Embryo 3 Q93 ("As regards amnion, all the following are true EXCEPT:" -- c. It prevents fetal movements, which is false -- amniotic fluid actually helps them) tests this record's own late-pregnancy function directly ("it provides space for the fetal movements that develop the fetal muscles"). This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the pending record holds it (this concept carried no exam_signal before this row). Source: ASU-AE Embryology, "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3), question 93; answer key p.19, row 93=c.
