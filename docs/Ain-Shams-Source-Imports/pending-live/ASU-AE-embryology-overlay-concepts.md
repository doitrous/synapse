<!--
  ASU-AE · Embryo 2 deferred cluster — pending-live sparse CONCEPT overlay

  These 13 concept ids are the ones `docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-EMBRYO2-deferred-pending-concepts.md`
  logged as untestable last pass because they were "pending" against this
  checkout's own stale `medical:simulate` fixture — 11 in
  `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`, 2 in
  `docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md`.

  Per `docs/chief-of-staff/BOARD.md`, 2026-08-27 ~13:55 and ~14:16 entries:
  101 ISK and AU-MED-102 (with its own pending-live overlays) were both
  applied to production in the live-DB import pass that day — DB read-back
  confirmed (concepts 2145→2882 then 2882→2882 sparse-overlay in-place). All
  13 ids below are covered by that import. This checkout's own extraction
  snapshot (`server/data/medical-library-v1.json`, `generatedAt:
  2026-08-11T03:09:06Z`) predates the import and does not contain any of
  these ids — expected staleness (00-START-HERE.md §8), not evidence the
  dependency is missing — so this file, like ASU-IBM's own precedent
  (`pending-live/ASU-IBM-biochem-mcq-overlay-concepts.md`), stays in
  `pending-live/` rather than `concept/` and is applied by Omar directly,
  not staged into `docs/import-ready/`.

  Sparse only: every row restates `## label` verbatim; `## module_subject`
  restates the source's existing line plus this bank's own addition in full
  (full-replacement field, no `+` semantics — see the ASU-IBM overlay's
  fixed eviction hazard); Kasr-targeted rows restate `## exam_signal` in
  full the same way (AU-MED-102's two concepts carry no exam_signal column
  at all, so none is added). `## universities` and `## modules` are true
  ID-list columns and take `+asu` / `+ASU-AE`. `## field_notes` carries the
  ASU source note only (concepts have no `university_notes` column).

  Every fact below is tested by "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f)
  only; question stems/options were re-read from the rendered page images
  (300 DPI) where OCR was ambiguous, not from OCR text alone. Page numbers
  below are this source's own printed answer-key pages (13, 14 or 15).

  Apply after: `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`
  and `docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md`
  are live (already true in production per the BOARD entries above; not yet
  true in this checkout's own stale snapshot).

  Simulate together with the source file each block targets:
    npm run medical:simulate -- \
      docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md \
      docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-embryology-overlay-concepts.md \
      --emit /tmp/sim-ASU-AE-embryology-overlay-concepts.json

  Import: Admin › Bulk import → concept, only after Omar confirms the two
  source files above are live (or re-runs `medical:snapshot-live`).
-->

# Item

## id
CON-DEV-F33BB68138377B

## label
Fertilisation happens in the ampulla of the uterine tube and has four results

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > First Week of Development
ASU-AE > Embryology > Questions > Embryo 2

## exam_signal
src_12d639a625d8305c4454 | question_book | | p2 | 101 ISK
src_764a2521809818b8abdc | question_book | | p88 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p5 | 101 ISK
src_08bc782553366518791e | question_book | | p114 | 101 ISK
src_12d639a625d8305c4454 | question_book | | p3 | 101 ISK
src_08bc782553366518791e | question_book | | p115 | 101 ISK
src_9487fd713153c573087f | question_book | | p6 | 101 ISK
src_a7e3b821ab294015c05f | question_book | | p14 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK, live 2026-08-27) confirmed via this concept's own definition (ampullary fertilisation; four results = zygote, sex determination, diploid restoration, start of cleavage). ASU-AE Embryo 2 Q42 ("Normal site of fertilization is:" -- c. Lateral part of uterine tube) and Q38 ("Results of fertilization include all the following EXCEPT:" -- e. Beginning of implantation -- false, implantation is a later, separate event) both test this record's own stated facts directly. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the live record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), questions 42 and 38; answer key page 14, row 42 = c, row 38 = e.

---

# Item

## id
CON-DEV-28CF4D241BE607

## label
The blastocyst is a trophoblast wall around a blastocele with the embryoblast at one pole, and it implants by that embryonic pole

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > First Week of Development
ASU-AE > Embryology > Questions > Embryo 2

## exam_signal
src_12d639a625d8305c4454 | question_book | | p3 | 101 ISK
src_08bc782553366518791e | question_book | | p116 | 101 ISK
src_08bc782553366518791e | question_book | | p117 | 101 ISK
src_a7e3b821ab294015c05f | question_book | | p14 | ASU-AE
src_a7e3b821ab294015c05f | question_book | | p15 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK, live 2026-08-27). ASU-AE Embryo 2 Q37 ("The stage that implants into the uterus is:" -- b. Blastocyst) names the stage this record defines, and Q64 ("During implantation, the blastocyst:" -- e. All of the above -- implants in the body of the uterus is itself false per this record's "posterior wall of the fundus" siting, but the other four listed properties -- causes endometrial change, implants in the endometrium, implants by its embryonic pole -- are all true of this record's blastocyst, making "all of the above" the printed key's intended reading of the four true sub-statements) test this record's structure and implantation behaviour. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the live record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), questions 37 and 64; answer key page 14, row 37 = b; page 15, row 64 = e.

---

# Item

## id
CON-DEV-F5A87FDF5D911C

## label
Cleavage divides the zygote inside the zona pellucida, giving a 16-cell morula in the tube by the third day

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > First Week of Development
ASU-AE > Embryology > Questions > Embryo 2

## exam_signal
src_12d639a625d8305c4454 | question_book | | p3 | 101 ISK
src_08bc782553366518791e | question_book | | p116 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p5 | 101 ISK
src_a7e3b821ab294015c05f | question_book | | p13 | ASU-AE
src_a7e3b821ab294015c05f | question_book | | p14 | ASU-AE
src_a7e3b821ab294015c05f | question_book | | p15 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK, live 2026-08-27). ASU-AE Embryo 2 Q30 ("On what day does the morula reach the uterine cavity after fertilization?" -- a. 4th day), Q12 ("Enlargement of the cleaving zygote is prevented by:" -- b. Zona pellucida) and Q59 ("As regards the blastocyst, all the following statements are true EXCEPT:" -- b. It is surrounded by zona pellucida until after implantation -- false, this record's own timeline has the zona degenerate at the end of the fifth day, before implantation begins on the seventh) all test this record's own stated cell-count/day timeline and the zona pellucida's compaction-then-degeneration role. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the live record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), questions 30, 12 and 59; answer key page 13 row 12 = b, page 14 row 30 = a, page 15 row 59 = b.

---

# Item

## id
CON-DEV-89FC3BBB3C9BCE

## label
Implantation goes wrong either low inside the uterus or entirely outside it

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > First Week of Development
ASU-AE > Embryology > Questions > Embryo 2

## exam_signal
src_12d639a625d8305c4454 | question_book | | p3 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p5 | 101 ISK
src_a7e3b821ab294015c05f | question_book | | p13 | ASU-AE
src_a7e3b821ab294015c05f | question_book | | p14 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK, live 2026-08-27). ASU-AE Embryo 2 Q2 ("Placenta praevia results from implantation of the blastocyst in the:" -- e. Lower part of the uterus) and Q32 ("Placenta praevia marginalis:" -- b. Covers internal os partially) both test the intrauterine half of this record's abnormal-implantation classification (this batch's own Q6/Q45 ectopic-pregnancy questions were authored last pass as overlays onto the separate live `CON-OBS-F3B46C8C137FA1`, per the deferred-pending-concepts note). This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the live record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), questions 2 and 32; answer key page 13 row 2 = e, page 14 row 32 = b.

---

# Item

## id
CON-DEV-22C6EB6EB88448

## label
The second week runs to a timetable: day 7 implantation and two trophoblasts, day 8 the amniotic cavity, day 9 the primary yolk sac and lacunae, day 11–12 extra-embryonic mesoderm, day 13 the chorionic cavity

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Second Week of Development
ASU-AE > Embryology > Questions > Embryo 2

## exam_signal
src_08bc782553366518791e | question_book | | p118 | 101 ISK
src_08bc782553366518791e | question_book | | p117 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p6 | 101 ISK
src_a7e3b821ab294015c05f | question_book | | p13 | ASU-AE
src_a7e3b821ab294015c05f | question_book | | p14 | ASU-AE
src_a7e3b821ab294015c05f | question_book | | p15 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK, live 2026-08-27). ASU-AE Embryo 2 Q4 ("Implantation of blastocyst is completed in which post-fertilization day?" -- d. 11th, rendered and re-read at 300 DPI, OCR of this row was unreadable), Q43 ("Implantation of blastocyst begins in which post-fertilization day?" -- b. 6th, also re-read by rendering) and Q68 ("The Extraembryonic coelom:" -- c. Is lined by extraembryonic mesoderm) all test this record's own day-by-day timetable (day 7 adhesion/two trophoblasts through day 13 chorionic cavity, extra-embryonic mesoderm appearing day 11-12). This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the live record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), questions 4, 43 and 68; answer key page 13 row 4 = d, page 14 row 43 = b, page 15 row 68 = c.

---

# Item

## id
CON-DEV-E08715FEB6438D

## label
The blastocyst implants by its embryonic pole into the upper posterior wall of the uterus, and it is the syncytiotrophoblast that eats its way in

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Second Week of Development
ASU-AE > Embryology > Questions > Embryo 2

## exam_signal
src_12d639a625d8305c4454 | question_book | | p3 | 101 ISK
src_08bc782553366518791e | question_book | | p117 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p5 | 101 ISK
src_08bc782553366518791e | question_book | | p116 | 101 ISK
src_08bc782553366518791e | question_book | | p119 | 101 ISK
src_a7e3b821ab294015c05f | question_book | | p14 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK, live 2026-08-27). ASU-AE Embryo 2 Q44 ("The normal site for implantation is:" -- c. Posterior wall of body of uterus, confirmed by rendering) tests this record's own stated normal site directly. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the live record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), question 44; answer key page 14, row 44 = c.

---

# Item

## id
CON-DEV-0BA870DF2C2E13

## label
Each gamete nucleus carries 22 autosomes and one sex chromosome — always X in the ovum, X or Y in the sperm

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Gametes
ASU-AE > Embryology > Questions > Embryo 2

## exam_signal
src_12d639a625d8305c4454 | question_book | | p1 | 101 ISK
src_764a2521809818b8abdc | question_book | | p87 | 101 ISK
src_f32859b80fb79d668010 | question_book | | p2 | 101 ISK
src_9487fd713153c573087f | question_book | | p4 | 101 ISK
src_08bc782553366518791e | question_book | | p114 | 101 ISK
src_a7e3b821ab294015c05f | question_book | | p13 | ASU-AE
src_a7e3b821ab294015c05f | question_book | | p14 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK, live 2026-08-27). ASU-AE Embryo 2 Q9 ("The cell that is fertilized by the sperm is the:" -- b. Secondary oocyte) and Q40 ("The sex of the embryo is determined at" -- a. Fertilization) both test this record's own stated gamete-nucleus content (secondary oocyte nucleus = 22 autosomes + X only, so the fertilising sperm's X-or-Y decides sex). This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the live record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), questions 9 and 40; answer key page 13 row 9 = b, page 14 row 40 = a.

---

# Item

## id
CON-DEV-B84639AB8FF5DE

## label
The decidua is the pregnant endometrium, in three parts named by their relation to the conceptus

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Fetal Membranes
ASU-AE > Embryology > Questions > Embryo 2

## exam_signal
src_08bc782553366518791e | question_book | | p116 | 101 ISK
src_08bc782553366518791e | question_book | | p118 | 101 ISK
src_a7e3b821ab294015c05f | question_book | | p13 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK, live 2026-08-27). ASU-AE Embryo 2 Q11 ("The chorion leave faces which part of the decidua?" -- b. Capsularis) tests this record's own three-part classification -- decidua capsularis is the part covering the conceptus (and hence facing chorion laeve/leave), distinct from basalis (deep, becomes the maternal placenta) and parietalis (the rest of the cavity lining). This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the live record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), question 11; answer key page 13, row 11 = b.

---

# Item

## id
CON-DEV-E099FAA01BEAEB

## label
Chorionic villi run primary to secondary to tertiary, and the chorion that carries them splits into frondosum and laeve

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Fetal Membranes
ASU-AE > Embryology > Questions > Embryo 2

## exam_signal
src_764a2521809818b8abdc | question_book | | p91 | 101 ISK
src_08bc782553366518791e | question_book | | p119 | 101 ISK
src_f32859b80fb79d668010 | question_book | | p5 | 101 ISK
src_a7e3b821ab294015c05f | question_book | | p13 | ASU-AE
src_a7e3b821ab294015c05f | question_book | | p14 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK, live 2026-08-27). ASU-AE Embryo 2's richest deferred cluster (8 of the 47 rows): Q61 ("A primary stem villus consists of:" -- c. Cytotrophoblast & Syncytiotrophoblast only), Q14 ("A 2ry chorionic villus is made of:" -- e. Trophoblast + 1ry mesoderm), Q63 ("A tertiary stem villus consists of:" -- e. Cytotrophoblast, Syncytiotrophoblast & extraembryonic mesoderm with small blood vessels) and Q62 ("As regards the secondary villi, all are true EXCEPT:" -- d. They contain a core of 2ry mesoderm -- false, this record's own primary-to-secondary step is entered by 1ry, not 2ry, mesoderm) all test this record's own primary/secondary/tertiary progression directly (Q8, Q20, Q22, Q60 test the same progression from other angles and were left as duplicates this pass). This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the live record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), questions 61, 14, 63 and 62; answer key page 13 row 14 = e, page 14 rows 61 = c, 62 = d and 63 = e.

---

# Item

## id
CON-DEV-1D10DF3B716A70

## label
Heuser's membrane lines the primary yolk sac, the allantois buds from the secondary one, and the vitelline duct is what connects the definitive sac to the midgut

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Fetal Membranes
ASU-AE > Embryology > Questions > Embryo 2
ASU-AE > Embryology > Questions > Embryo 3

## exam_signal
src_12d639a625d8305c4454 | question_book | | p9 | 101 ISK
src_764a2521809818b8abdc | question_book | | p95 | 101 ISK
src_12d639a625d8305c4454 | question_book | | p12 | 101 ISK
src_764a2521809818b8abdc | question_book | | p98 | 101 ISK
src_08bc782553366518791e | question_book | | p125 | 101 ISK
src_16f747e1171423933757 | question_book | | p11 | 101 ISK
src_a7e3b821ab294015c05f | question_book | | p13 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p14 | ASU-AE
src_3448fabd352cb8018ed3 | question_book | | p15 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK, live 2026-08-27). ASU-AE Embryo 2 Q7 ("The blastocoele becomes the:" -- b. Yolk sac) tests this record's own first step (Heuser's membrane lining the blastocele on day 9 to form the primary yolk sac). This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the live record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), question 7; answer key page 13, row 7 = b. Extended 2026-09-02 (author5 pass) for "MCQs - Embryo 3.pdf" (src_3448fabd352cb8018ed3): Q91 ("The definitive yolk sac: ... c. Is found in the umbilical cord") and Q99 ("As regards the allantois, choose the correct statement: ... a. Is a diverticulum of hindgut") both test this same record's yolk-sac/allantois definition from its two other stated facts (the definitive yolk sac's fate, and the allantois's own hindgut-diverticulum origin). Embryo 3's own Q92 (secondary yolk sac lined by endoderm) duplicates the fact Embryo 2's Q7 already tests here and was held rather than re-authored. Answer key page 19, row 91 = c, row 99 = a.

---

# Item

## id
CON-DEV-59DB99C028C33F

## label
The embryoblast splits into epiblast and hypoblast, and the cavity that opens above the epiblast is roofed by amnioblast

## universities
+asu

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Second Week of Development
ASU-AE > Embryology > Questions > Embryo 2

## exam_signal
src_12d639a625d8305c4454 | question_book | | p10 | 101 ISK
src_764a2521809818b8abdc | question_book | | p96 | 101 ISK
src_12d639a625d8305c4454 | question_book | | p5 | 101 ISK
src_764a2521809818b8abdc | question_book | | p91 | 101 ISK
src_08bc782553366518791e | question_book | | p119 | 101 ISK
src_16f747e1171423933757 | question_book | | p10 | 101 ISK
src_12d639a625d8305c4454 | question_book | | p11 | 101 ISK
src_a7e3b821ab294015c05f | question_book | | p15 | ASU-AE

## field_notes
overlay: Sparse update only -- live-hit (101 ISK, live 2026-08-27). ASU-AE Embryo 2 Q67 ("The first 2 intraembryonic germ layers that differentiate are:" -- b. Epiblast & hypoblast) tests this record's own bilaminar-disc split directly. Q69 ("The amniotic cavity develops:" -- printed key d, "During 1st week after fertilization") was left out this pass: this record's own definition places amniotic-cavity opening on day 8, which is conventionally the first day of the *second* week (day 1-7 = first week), so the printed key conflicts with this record's own timeline and was judged indefensible per LANE-CARD's "printed keys stand unless indefensible" rule rather than authored against it. This row only adds ASU/ASU-AE traceability and the module_subject/exam_signal union; every other field is left as the live record holds it. Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), question 67; answer key page 15, row 67 = b.

---

# Item

## id
CON-DEV-642BA9E28AC8B6

## label
The zona pellucida blocks polyspermy and stops the blastomeres sticking to the tubal wall

## universities
+asu

## modules
+ASU-AE

## module_subject
AU-MED-102 > Embryology > Implantation & decidua
ASU-AE > Embryology > Questions > Embryo 2

## field_notes
overlay: Sparse update only -- live-hit (AU-MED-102, live 2026-08-27). ASU-AE Embryo 2 Q29 ("What is the result of the zona reaction (cortical reaction)?" -- e. Sperms can no longer enter the egg) tests this record's own stated block-to-polyspermy mechanism directly. This batch's Q3/Q19/Q41/Q54 test the same fact with the same printed key intent but were left as duplicates (Q3 in particular uses this source's own non-standard "vitelline membrane" label for the same zona-reaction barrier, which this record does not use, so Q29's cleaner wording was kept). This row only adds ASU/ASU-AE traceability and the module_subject union; every other field is left as the live record holds it (this AU-MED-102 concept carries no `exam_signal` column). Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), question 29; answer key page 14, row 29 = e.

---

# Item

## id
CON-DEV-CA422E559742A2

## label
Capacitation strips the glycoprotein coat from the sperm surface before it can fertilise

## universities
+asu

## modules
+ASU-AE

## module_subject
AU-MED-102 > Embryology > Fertilization
ASU-AE > Embryology > Questions > Embryo 2

## field_notes
overlay: Sparse update only -- live-hit (AU-MED-102, live 2026-08-27). Same id Embryo 1's own triage/authoring pass already found and left untested (see coverage/ASU-AE-triage.md). ASU-AE Embryo 2 Q18 ("The process of sperm capacitation takes place within the:" -- c. Female genital tract, rendered and re-read at 300 DPI) and Q65 ("As regards sperm capacitation, choose the CORRECT statement:" -- b. Is essential for fertilization) test this record's own site and prerequisite-role facts. Q21/Q28/Q33 test the same site fact with the same or a narrower answer ("uterus" in Q21 vs "female genital tract" elsewhere in this same paper) and were left as duplicates. This row only adds ASU/ASU-AE traceability and the module_subject union; every other field is left as the live record holds it (this AU-MED-102 concept carries no `exam_signal` column). Source: ASU-AE Embryology, "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f), questions 18 and 65; answer key page 14, row 18 = c; page 15, row 65 = b.
