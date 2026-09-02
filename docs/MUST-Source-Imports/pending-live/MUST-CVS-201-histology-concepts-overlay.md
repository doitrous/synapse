<!--
  MUST-CVS-201 · pending-live sparse CONCEPT overlay (Histology tranche).

  Every ## id below targets a concept that exists ONLY in an unimported Kasr
  104-CPS batch — none is in server/data/medical-library-v1.json (checked
  directly, not just via find-existing.mjs). Apply this file ONLY after the
  named source file is live. Three source files are involved:

    A. docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md — the
       three-tunic plan, artery classification, metarteriole, vein
       classification, medium-artery-vs-vein and fenestrated-capillary
       concepts (6 ids).
    B. docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md — the
       arteriovenous anastomosis (shunt) concept (1 id).
    C. docs/Kasr-Source-Imports/concept/104-CPS-concepts.md — the
       continuous-versus-sinusoidal capillary concept (1 id).

  A ninth Histology concept this batch's questions cite, CON-CVS-CC810A201244F0
  ("Pericyte regulation of capillary flow"), IS already live (confirmed
  against server/data/medical-library-v1.json) but is NOT overlaid here — this
  checkout holds no local file carrying its verbatim label to restate per the
  convention below, so its question (Q19) cites it directly with no tag
  update; see coverage/MUST-CVS-201-triage.md's Histology addendum.

  Per 00-START-HERE.md §3 (module_subject fully replaces on every write — no
  '+' form there): every row restates '## label' verbatim; 'module_subject'
  restates the source's existing line(s) plus MUST-CVS-201's own.
  '## universities', '## learner_years' and '## modules' are true ID-list
  columns and take '+must' / '+2' / '+MUST-CVS-201'.

  Sibling docs/MUST-Source-Imports/pending-live/MUST-CVS-201-histology-questions.md
  carries the 45 MCQs that depend on these 8 concepts — see that file's own
  header and pending-live/INDEX.md for the apply order.

  Simulate together with the source file each block targets, e.g.:
    node scripts/content/gate.mjs simulate \
      docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md \
      docs/MUST-Source-Imports/pending-live/MUST-CVS-201-histology-concepts-overlay.md
-->

# Item

## id
CON-CVS-30053920BDC07F

## label
Most blood vessel walls are three tunics: intima, media and adventitia, each adapted to the vessel's function

## modules
+MUST-CVS-201

## module_subject
104 CPS > Histology > Cardiovascular System > Arteries
MUST-CVS-201 > Histology > Cardiovascular System > Vessel Wall — General Plan

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested 9 times in the Histology EOM paper (Q1, Q2, Q6, Q7, Q17, Q24, Q32, Q36, Q45) — endothelium/tunica-intima identity, the internal elastic lamina's position, vasa vasorum and nervi vasorum location, subendothelial connective tissue and the external elastic lamina's role — all already in this concept's own definition. src_0511bc2ebb43a689a4c6 p1-12.

---

# Item

## id
CON-CVS-712BA581C8AF88

## label
Arteries are classed as large elastic, medium muscular or small arterioles, distinguished chiefly by their tunica media

## modules
+MUST-CVS-201

## module_subject
104 CPS > Histology > Cardiovascular System > Arteries
MUST-CVS-201 > Histology > Cardiovascular System > Artery Classification

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested 13 times in the Histology EOM paper (Q3, Q9, Q14, Q18, Q21, Q23, Q27, Q30, Q33, Q35, Q39, Q47, Q49) — elastic-artery lamina count, muscular-artery media composition, arteriole wall thinning, the aorta's and coronary/basilar arteries' classification as elastic or muscular types — all already in this concept's own definition. src_0511bc2ebb43a689a4c6 p1-13.

---

# Item

## id
CON-CVS-E6F658EEC11072

## label
The metarteriole is the arteriole's terminal segment, and its precapillary sphincter controls flow into the capillary bed

## modules
+MUST-CVS-201

## module_subject
104 CPS > Histology > Cardiovascular System > Arteries
MUST-CVS-201 > Histology > Cardiovascular System > Metarteriole

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested 3 times in the Histology EOM paper (Q11 pre-capillary sphincter location, Q26 metarteriole definition, Q38 "vascular shunt" naming) — all already in this concept's own definition. src_0511bc2ebb43a689a4c6 p2,p3,p5.

---

# Item

## id
CON-CVS-B29610035B568D

## label
Veins are classed as small venules, medium-sized muscular veins or large veins, each thinner-walled than its arterial counterpart

## modules
+MUST-CVS-201

## module_subject
104 CPS > Histology > Cardiovascular System > Veins
MUST-CVS-201 > Histology > Cardiovascular System > Vein Classification

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested 5 times in the Histology EOM paper (Q4 valves, Q13 large-vein adventitial smooth muscle, Q25 largest lumen-to-wall ratio, Q28 valves aiding venous return, Q37 large-vein longitudinal smooth muscle) — all already in this concept's own definition. src_0511bc2ebb43a689a4c6 p1-8.

---

# Item

## id
CON-CVS-3C04F2DED454C9

## label
A medium artery and a medium vein differ across every coat: thickness, lumen, valves and the three tunics

## modules
+MUST-CVS-201

## module_subject
104 CPS > Histology > Cardiovascular System > Veins
MUST-CVS-201 > Histology > Cardiovascular System > Artery-vs-Vein Comparison

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as Q41, "What is the primary histological difference between arteries and veins?" — printed answer: thickness of tunica media — already in this concept's own comparison table. src_0511bc2ebb43a689a4c6 p11.

---

# Item

## id
CON-CVS-132A76916FEC05

## label
A fenestrated (visceral) capillary has pores covered by diaphragms and a continuous basal lamina, sited wherever fluid crosses fast

## modules
+MUST-CVS-201

## module_subject
104 CPS > Histology > Cardiovascular System > A-V Connections
MUST-CVS-201 > Histology > Cardiovascular System > Fenestrated Capillary

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested twice in the Histology EOM paper (Q12 kidney-glomerulus fenestrae without diaphragms, Q34 diaphragmed fenestrae site) — both already in this concept's own definition, which itself already distinguishes the glomerulus's diaphragm-free fenestrae from the diaphragmed general case. src_0511bc2ebb43a689a4c6 p4,p9.

---

# Item

## id
CON-CVS-4BE9D0F74D4377

## label
An arteriovenous anastomosis is a direct, sympathetically innervated, muscular-sphinctered shunt between an arteriole and a venule that bypasses the capillary bed

## modules
+MUST-CVS-201

## module_subject
104 CPS > Histology > Cardiovascular System > A-V Connections
MUST-CVS-201 > Histology > Cardiovascular System > Arteriovenous Anastomosis

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested 3 times in the Histology EOM paper (Q16 temperature-regulation function, Q22 fingertip site, Q42 digestive-organ flow role) — all already in this concept's own definition (named sites, sympathetic innervation, sphincter mechanism). src_0511bc2ebb43a689a4c6 p5,p6,p11.

---

# Item

## id
CON-CVS-9585A65D9EDA4D

## label
Continuous capillaries are sealed tubes on a continuous basal lamina; sinusoids are wide, porous and discontinuous

## modules
+MUST-CVS-201

## module_subject
104 CPS > Histology > Cardiovascular System > A-V Connections
MUST-CVS-201 > Histology > Cardiovascular System > Capillary Types

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested 9 times in the Histology EOM paper (Q5 continuous/skeletal muscle, Q10 sinusoid/liver, Q29 capillary exchange site, Q31 sinusoid/bone marrow, Q40 sinusoid/bone marrow, Q43 continuous/skin, Q44 sinusoid basal-lamina absence, Q48 capillary wall = endothelium + pericytes, Q50 sinusoid-wall macrophages) — the first eight are already in this concept's own definition; Q50 (macrophages lining sinusoid walls for phagocytosis) is a reasonable extension of the same sinusoid-structure fact the printed answer key confirms but is not itself spelled out in this concept's stored definition — flagged here rather than silently assumed, for the eventual evidence pass. src_0511bc2ebb43a689a4c6 p1-13.
