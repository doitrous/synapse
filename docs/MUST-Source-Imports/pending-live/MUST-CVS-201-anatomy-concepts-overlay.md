<!--
  MUST-CVS-201 · pending-live sparse CONCEPT overlay (Anatomy tranche,
  author3).

  Every ## id below targets a concept that exists ONLY in an unimported
  batch — none is in server/data/medical-library-v1.json (checked directly,
  not just via find-existing.mjs). Two source files are involved:

    A. docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md — 20 of
       the 21 ids: coronary arteries, cardiac veins, aortic sinuses, the
       conducting system, arch of aorta, pulmonary trunk/ligamentum
       arteriosum, descending thoracic aorta, recurrent laryngeal nerve,
       vagus nerves, oesophagus, thoracic duct, diaphragm openings,
       superior mediastinum, and the six embryology (CON-DEV-…) concepts —
       atrial septation, fetal shunts, interventricular-septum development,
       sinus venosus, truncus arteriosus/bulbus cordis, pharyngeal arch
       arteries. Same file tranche 1 and tranche 2 both overlaid already;
       every id here is a different record from either tranche's own set.
    B. docs/import-ready/concept/SYS-CVS-CONCEPT-T08.md — 1 id: Tetralogy
       of Fallot (CON-CVS-AF9212C18AAF03), the Year-3 SYS-CVS congenital
       heart disease catalogue.

  Sibling docs/MUST-Source-Imports/pending-live/MUST-CVS-201-anatomy-questions.md
  carries the 49 MCQs that depend on these 21 concepts — see that file's
  own header and pending-live/INDEX.md for the apply order.

  Per 00-START-HERE.md §3 (module_subject fully replaces on every write —
  no '+' form there): every row restates '## label' verbatim; a Kasr-source
  row's 'module_subject' restates the source's existing "104 CPS > …" line
  plus MUST-CVS-201's own; the Tetralogy row has no prior module_subject to
  restate (SYS-CVS-CONCEPT-T08.md carries none) so it writes only its own
  line. '## universities', '## learner_years' and '## modules' are true
  ID-list columns and take '+must' / '+2' / '+MUST-CVS-201'.

  Simulate together with the source file each block targets, e.g.:
    node scripts/content/gate.mjs simulate \
      docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md \
      docs/import-ready/concept/SYS-CVS-CONCEPT-T08.md \
      docs/MUST-Source-Imports/pending-live/MUST-CVS-201-anatomy-concepts-overlay.md
-->

# Item

## id
CON-CVS-1F1AB4B70AB06D

## label
The left coronary artery divides into the anterior interventricular and circumflex arteries, together supplying the left atrium, most of the left ventricle and the anterior two thirds of the septum

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Heart
MUST-CVS-201 > Anatomy > Blood Supply of the Heart > Left Coronary Artery

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.8

## field_notes
must: Tested 6 times in the Anatomy EOM paper's Blood Supply section (Q1 anterior interventricular branch = LAD, Q4 left marginal branch runs the rounded left margin, Q13 the LCA does NOT supply the posterior 1/3 of the septum, Q17 circumflex is a continuation of the LCA, Q19 inter-coronary anastomosis overcomes gradual obstruction, Q20 the anterior interventricular branch supplies part of both ventricles' anterior walls) — all already in this concept's own definition. src_ac0704bd16ff99889463 p1-6.

---

# Item

## id
CON-CVS-929D9DDCB95482

## label
Most cardiac veins end in the coronary sinus, which lies in the posterior coronary sulcus and receives the great, middle and small cardiac veins and the oblique vein of the left atrium

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Heart
MUST-CVS-201 > Anatomy > Blood Supply of the Heart > Cardiac Veins

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested twice in the Anatomy EOM paper (Q2 the great cardiac vein accompanies the anterior interventricular artery in its groove, Q9 the anterior cardiac veins are the ones that open directly into the right atrium, bypassing the coronary sinus) — both already in this concept's own definition. src_ac0704bd16ff99889463 p1,p3.

---

# Item

## id
CON-CVS-D02DE9B56C97B7

## label
The ascending aorta is only 5 cm long, lies wholly within the fibrous pericardium, and gives no branches beyond the two coronary arteries from its aortic sinuses

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Large Arteries of the Thorax
MUST-CVS-201 > Anatomy > Blood Supply of the Heart > Aortic Sinus Origin

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as Q3, "The right coronary artery arises from which aortic sinus?" — printed answer: anterior aortic sinus (the right coronary sinus, in the nomenclature this paper uses) — already in this concept's own statement that the two coronary arteries arise from the ascending aorta's aortic sinuses. src_ac0704bd16ff99889463 p2.

---

# Item

## id
CON-CVS-2A21F1B4F30B61

## label
The right coronary artery runs the coronary sulcus to give the marginal and posterior interventricular arteries, supplying the whole right side of the heart and, in most people, the whole conducting system

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Heart
MUST-CVS-201 > Anatomy > Blood Supply of the Heart > Right Coronary Artery

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested twice (Blood Supply Q6, "Concerning the RCA" — printed answer: it gives a marginal branch along the right border of the heart; Conducting System Q10, obstruction of the RCA is more likely to interrupt cardiac impulses/heart block) — both already in this concept's own definition ("in most people, the whole conducting system"). src_ac0704bd16ff99889463 p2,p10.

---

# Item

## id
CON-CVS-6799821893D6D2

## label
The conducting system runs SA node to AV node to AV bundle to right and left bundle branches to Purkinje fibres, arranged so each ventricle contracts from the apex upwards

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Heart
MUST-CVS-201 > Anatomy > Conducting System of the Heart

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.75

## field_notes
must: Tested 5 times in the Conducting System section (Q1 the SA node is the pacemaker, Q3 the AV node is supplied by the RCA in 80% of cases, Q4 the AV bundle descends along the posterior margin of the membranous interventricular septum, Q5 the right bundle branch runs through the septomarginal/moderator band, Q8 the AV node lies above the coronary sinus orifice) — all already in this concept's own definition (the AV bundle's membranous-septum course, the right branch's moderator-band route, and the AV node's position above the coronary sinus opening are named explicitly). src_ac0704bd16ff99889463 p8-10.

---

# Item

## id
CON-CVS-9C60987F3CB5A1

## label
The arch of the aorta passes over the left bronchus and gives the brachiocephalic, left common carotid and left subclavian arteries from its convexity, with the trachea and oesophagus behind it

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Large Arteries of the Thorax
MUST-CVS-201 > Anatomy > Arch of Aorta and Descending Thoracic Aorta > Arch Branches

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested 3 times (Q1 the arch begins at the sternal end of the right 2nd costal cartilage, Q7 the brachiocephalic artery divides into the right common carotid and right subclavian, Q8 the brachiocephalic artery is the first branch of the arch) — all already in this concept's own definition. src_ac0704bd16ff99889463 p11-12.

---

# Item

## id
CON-CVS-A723ADE6F4E726

## label
The pulmonary trunk runs entirely within the fibrous pericardium and ends at the sternal angle level by dividing into right and left pulmonary arteries, joined to the aortic arch by the ligamentum arteriosum

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Large Arteries of the Thorax
MUST-CVS-201 > Anatomy > Arch of Aorta and Descending Thoracic Aorta > Ligamentum Arteriosum

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as Q4, "The ligamentum arteriosum connects the left pulmonary artery to which structure?" — printed answer: aortic arch — already in this concept's own statement that the ligamentum arteriosum joins the pulmonary side to the aortic arch. src_ac0704bd16ff99889463 p11.

---

# Item

## id
CON-CVS-EEA29FB47CBB71

## label
The descending thoracic aorta runs from T4/T5 to T12, giving nine pairs of posterior intercostal arteries, a subcostal pair, two left bronchial arteries and oesophageal branches

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Large Arteries of the Thorax
MUST-CVS-201 > Anatomy > Arch of Aorta and Descending Thoracic Aorta > Descending Thoracic Aorta

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.8

## field_notes
must: Tested 5 times (Q10 the oesophagus crosses its anterior surface, Q11 it passes through the diaphragm at T12, Q13 the posterior intercostal arteries arise from its posterior surface, Q14 the bronchial arteries are a visceral branch, Q18 it terminates at T12) — all already in this concept's own definition (course T4/5-T12, posterior intercostal and bronchial branches). src_ac0704bd16ff99889463 p13-18.

---

# Item

## id
CON-CVS-E9BA4A6C0E8392

## label
The left recurrent laryngeal nerve leaves the vagus on the aortic arch and hooks beneath it beside the ligamentum arteriosum before ascending in the tracheo-oesophageal groove

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Large Nerves of the Thorax
MUST-CVS-201 > Anatomy > Arch of Aorta and Descending Thoracic Aorta > Recurrent Laryngeal Nerve

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as Q25, "Which of the following nerves is related posteriorly to the arch of the aorta?" — printed answer: left recurrent laryngeal — already in this concept's own statement that the nerve hooks beneath the arch. src_ac0704bd16ff99889463 p17.

---

# Item

## id
CON-CVS-E9CF510CBD01BC

## label
The right and left vagus nerves take different paths through the superior mediastinum before both break up behind their lung roots into the pulmonary and oesophageal plexuses

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Large Nerves of the Thorax
MUST-CVS-201 > Anatomy > Esophagus > Nerve Supply

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as Esophagus Q20, "The nerve supply to the esophagus includes fibers from:" — printed answer: sympathetic trunks and vagi — already in this concept's own statement that both vagi contribute to the oesophageal plexus. src_ac0704bd16ff99889463 p23.

---

# Item

## id
CON-GIT-4E4EC465826CF2

## label
The oesophagus enters the thorax as the most posterior structure of the superior mediastinum and has four constrictions, one where the aortic arch and left bronchus each cross it

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Large Tubes of the Thorax
MUST-CVS-201 > Anatomy > Esophagus

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.8

## field_notes
must: Tested 6 times in the Esophagus section (Q1 the left main bronchus crosses its anterior surface, Q2 the 15-inch narrowing on endoscopy is the left principal bronchus constriction, Q7 cervical oesophageal venous drainage ends in the brachiocephalic veins, Q8 it crosses the descending aorta's anterior surface at T7, Q9 the descending aorta — unlike the bronchus, pulmonary artery and diaphragm — is NOT an anterior relation of the oesophagus generally, Q18 it begins at C6) — all already in this concept's own definition (four constrictions, course, relations). src_ac0704bd16ff99889463 p19-23.

---

# Item

## id
CON-HEM-9123D4493320A7

## label
The thoracic duct crosses from right to left behind the oesophagus at T5 and drains the whole body except the right upper quadrant into the left brachiocephalic vein

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Lymphatics of the Thorax
MUST-CVS-201 > Anatomy > Thoracic Duct

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested 3 times (Aorta Q17 it runs between the aorta and the azygos vein, Esophagus Q6 it lies posterior to the oesophagus, Esophagus Q14 it lies on the left side of the oesophagus in the superior mediastinum) — all already in this concept's own definition (crosses right to left behind the oesophagus at T5). src_ac0704bd16ff99889463 p15,p20,p22.

---

# Item

## id
CON-RES-80C9B9E43B459B

## label
The diaphragm has three major openings — aortic at T12, oesophageal at T10, caval at T8 — plus named minor openings for the musculophrenic artery, splanchnic nerves and phrenic nerves

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > The Diaphragm
MUST-CVS-201 > Anatomy > Esophagus > Diaphragmatic Hiatus

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as Esophagus Q11, "The esophagus enters the abdomen by piercing which part of the diaphragm?" — printed answer: right crus (the muscular sling that chiefly forms the oesophageal hiatus at T10) — already in this concept's own statement of the oesophageal opening at T10. src_ac0704bd16ff99889463 p21.

---

# Item

## id
CON-RES-F360EFDEA84D58

## label
The superior mediastinum holds the great veins and thymus in front, the aortic arch and its three branches in the middle, and the trachea, oesophagus and thoracic duct behind

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Mediastinum
MUST-CVS-201 > Anatomy > Arch of Aorta and Descending Thoracic Aorta > Superior Mediastinum Relations

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as Q28, "Which of the following structures lies superior to the arch of the aorta?" — printed answer: left innominate (brachiocephalic) vein — already in this concept's own statement that the great veins lie in front of/above the arch in the superior mediastinum's anterior compartment. src_ac0704bd16ff99889463 p17.

---

# Item

## id
CON-DEV-67A96150DDAFD9

## label
Septum primum, septum secundum and the atrioventricular cushions together partition the primitive atrium, leaving the foramen ovale as the one right-to-left shunt that survives to birth

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Development of the Heart
MUST-CVS-201 > Anatomy > Heart Development and Fetal Circulation > Atrial Septation

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.8

## field_notes
must: Tested 4 times (Q2 complete absence of the interatrial septum is a "tri-locular heart", Q4 the floor of the fossa ovalis is formed by septum primum, Q10 a small opening between the atria is an atrial septal defect, Q12 failure of septum primum and septum secundum to fuse after birth leaves a patent foramen ovale) — all already in this concept's own definition (septum primum/secundum, foramen ovale, and the septal defects that follow when partitioning fails). src_ac0704bd16ff99889463 p25-27.

---

# Item

## id
CON-DEV-B33D9F68392311

## label
In the fetus, oxygenated blood bypasses the liver by the ductus venosus and the lungs by the foramen ovale and ductus arteriosus, until the first breath reverses the atrial pressure gradient and closes both shunts

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Development of the Heart
MUST-CVS-201 > Anatomy > Heart Development and Fetal Circulation > Fetal Shunts

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested 3 times (Q3 oxygenated placental blood enters the right atrium via the inferior vena cava, Q6 the ligamentum arteriosum is the postnatal remnant of the ductus arteriosus, Q9 blood bypasses the fetal lungs via the ductus arteriosus and foramen ovale together) — all already in this concept's own definition (the three fetal shunts and what each becomes after birth). src_ac0704bd16ff99889463 p25-27.

---

# Item

## id
CON-DEV-87CC6D0D2EF658

## label
The interventricular septum has a muscular part growing up from the ventricular floor and a membranous part closing the interventricular foramen from two other sources

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Development of the Heart
MUST-CVS-201 > Anatomy > Heart Development and Fetal Circulation > Interventricular Septum

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as Q8, "The interventricular septum is composed of:" — printed answer: both muscular and membranous parts — already in this concept's own definition. src_ac0704bd16ff99889463 p26.

---

# Item

## id
CON-DEV-13EE046ACBE541

## label
The sinus venosus's right horn is absorbed into the right atrium as the sinus venarum, and its left horn shrinks to become the coronary sinus

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Development of the Heart
MUST-CVS-201 > Anatomy > Heart Development and Fetal Circulation > Sinus Venosus

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as Q11, "Which structure is derived mainly from the sinus venosus?" — printed answer: right atrium — already in this concept's own definition (right horn absorbed into the right atrium as the sinus venarum). src_ac0704bd16ff99889463 p27.

---

# Item

## id
CON-DEV-FFBA6FA260E484

## label
The bulbus cordis becomes the right ventricle's proximal part, the infundibulum and aortic vestibule from its conus, and the roots of the aorta and pulmonary trunk from its distal truncus, split by a spiralling septum

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Development of the Heart
MUST-CVS-201 > Anatomy > Heart Development and Fetal Circulation > Truncus Arteriosus

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as Q13, "During heart tube development, the truncus arteriosus gives rise to:" — printed answer: ascending aorta and pulmonary trunk — already in this concept's own definition (the distal truncus splits by a spiralling septum into the aortic and pulmonary roots). src_ac0704bd16ff99889463 p28.

---

# Item

## id
CON-DEV-3A610A0FB2823C

## label
Of the six pairs of pharyngeal arch arteries, the third forms the carotids, the fourth forms the subclavian on the right and the arch of the aorta on the left, and the sixth's dorsal segment persists on the left as the ductus arteriosus

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Development of the Heart
MUST-CVS-201 > Anatomy > Heart Development and Fetal Circulation > Pharyngeal Arch Arteries

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.4

## field_notes
must: Cited as a contextual concept on Q6 (the ligamentum arteriosum is the postnatal remnant of the ductus arteriosus) alongside the fetal-shunts concept (CON-DEV-B33D9F68392311) — this record is the specific embryological origin of the ductus arteriosus from the sixth pharyngeal arch artery, not itself the main_concept of any question in this tranche but named so the reference resolves. src_ac0704bd16ff99889463 p26.

---

# Item

## id
CON-CVS-AF9212C18AAF03

## label
Tetralogy of Fallot is four features arising from one malformation

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Anatomy > Heart Development and Fetal Circulation > Tetralogy of Fallot

## universities
+must

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as Heart Development Q7, "Which congenital anomaly is characterized by pulmonary stenosis, overriding aorta, VSD, and right ventricular hypertrophy?" — printed answer: Tetralogy of Fallot — the four features named in the stem are exactly this concept's own four components (right ventricular outflow obstruction, VSD, overriding aorta, right ventricular hypertrophy). This record carries no prior `module_subject`/`modules` value in its source file (docs/import-ready/concept/SYS-CVS-CONCEPT-T08.md, the Year-3 SYS-CVS congenital-heart-disease catalogue) — nothing to restate, so this row writes only MUST-CVS-201's own line. `learner_years` already reads `2 | 3 | 4` on the live-pending record; not re-appended here. src_ac0704bd16ff99889463 p25-26.
