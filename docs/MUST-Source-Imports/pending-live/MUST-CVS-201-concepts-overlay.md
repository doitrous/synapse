<!--
  MUST-CVS-201 · pending-live sparse CONCEPT overlay (tranche 1).

  Every ## id below targets a concept that exists ONLY in an unimported batch
  from another lane — none is in server/data/medical-library-v1.json (checked
  directly, not just via find-existing.mjs). Apply this file ONLY after the
  named source file is live. Three source files are involved:

    A. docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md — the two
       coronary-artery concepts (CON-CVS-1F1AB4B70AB06D, CON-CVS-2A21F1B4F30B61).
    B. docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md — the
       oedema and autoregulation concepts (CON-CVS-6D8E2D62A9F51E,
       CON-CVS-56A68328FD03C7).
    C. docs/import-ready/concept/SYS-CVS-CONCEPT-T04.md — dilated
       cardiomyopathy (CON-CVS-C531A645354244).
    D. docs/import-ready/concept/SYS-CVS-CONCEPT-T06.md — cardiac tamponade
       (CON-CVS-ABE9CE4B64FEF8).
    E. docs/Alexandria-Source-Imports/concept/AU-MED-106-physiology-concepts.md
       — hypertension definition and secondary causes (CON-CVS-F4BBA78E076D30).

  Per 00-START-HERE.md §3 (module_subject fully replaces on every write — no
  '+' form there): every row restates '## label' verbatim; 'module_subject'
  restates the source's existing line(s) plus MUST-CVS-201's own.
  '## universities', '## learner_years' and '## modules' are true ID-list
  columns and take '+must' / '+2' / '+MUST-CVS-201'.

  Sibling docs/MUST-Source-Imports/pending-live/MUST-CVS-201-questions.md
  carries the 9 questions that depend on these 7 concepts — see that file's
  own header and pending-live/INDEX.md for the apply order.

  Simulate together with the source file each block targets, e.g.:
    node scripts/content/gate.mjs simulate \
      docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md \
      docs/MUST-Source-Imports/pending-live/MUST-CVS-201-concepts-overlay.md
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
MUST-CVS-201 > Anatomy > Heart > Coronary Arteries

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested twice in this tranche — MW-Q1 ("Which artery supplies the anterior two-thirds of the interventricular septum?", answer: the anterior interventricular artery, a branch of the left coronary artery) and MW-Q10 ("Identify the origin of the left coronary artery", answer: the left posterior aortic sinus of the ascending aorta) — both facts are already in this concept's own definition. src_240262ce3fe62cc799c0 p2-3.

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
MUST-CVS-201 > Anatomy > Heart > Coronary Arteries

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as MW-Q5, "From which vessel does the posterior interventricular artery originate?" — printed answer: the right coronary artery. src_240262ce3fe62cc799c0 p2.

---

# Item

## id
CON-CVS-6D8E2D62A9F51E

## label
Interstitial fluid volume depends on capillary hydrostatic and osmotic pressure, the filtration coefficient, the number of open capillaries, and lymph flow, and oedema follows when any of these shifts toward filtration

## modules
+MUST-CVS-201

## module_subject
104 CPS > Physiology > Cardiovascular System > Vascular Function
MUST-CVS-201 > Physiology > Cardiovascular System > Oedema

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as MW-Q3, "Define edema and state two factors that can lead to its formation" — printed answer: excessive accumulation of tissue fluid; causes: increased hydrostatic pressure, decreased colloidal osmotic pressure, increased capillary permeability, lymphatic obstruction, salt & water retention. src_240262ce3fe62cc799c0 p2.
must-tranche8: Tested six more times in the Physiology paper's own Capillary Circulation & Oedema section (src_165188e079f0f475e54d p.26) — physcap-q01 (generalised oedema with low plasma albumin, key C, decreased plasma colloidal osmotic pressure), physcap-q04 (edema can be caused by, key A, increased capillary hydrostatic pressure), physcap-q08 (DVT-associated pitting oedema, key C, increased capillary hydrostatic pressure via venous obstruction), physcap-q13 (nephrotic-syndrome oedema, key C, decreased plasma colloidal osmotic pressure), physcap-q16 (elephantiasis, key C, lymphatic obstruction) and physcap-q19 (oedema from increased capillary hydrostatic pressure, key B, right-sided heart failure) — every fact this record's own four-mechanism definition (raised filtration pressure incl. venous obstruction and heart failure; decreased osmotic gradient incl. nephrotic syndrome; increased permeability; inadequate lymph flow incl. elephantiasis) already covers directly.

---

# Item

## id
CON-CVS-56A68328FD03C7

## label
Local blood flow is matched to tissue metabolism by two mechanisms — active hyperaemia driven by vasodilator metabolites and hypoxia, and myogenic/metabolic autoregulation that returns flow toward normal after a change in perfusion pressure

## modules
+MUST-CVS-201

## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
MUST-CVS-201 > Physiology > Cardiovascular System > Autoregulation

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as MW-Q7, "Briefly outline the concept of autoregulation" — printed answer: the intrinsic ability of an organ to maintain constant blood flow despite changes in perfusion pressure, mainly through local metabolic and myogenic mechanisms, particularly in the brain, heart and kidneys. src_240262ce3fe62cc799c0 p2.

---

# Item

## id
CON-CVS-C531A645354244

## label
Dilated cardiomyopathy is dilatation with systolic impairment unexplained by loading or coronary disease

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Pathology > Cardiomyopathies > Dilated Cardiomyopathy

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as Maria-Q1, "Write short notes on Dilated cardiomyopathy" — printed answer: most common type of cardiomyopathy, dilatation of all cardiac chambers; causes: inherited, alcohol, heavy metals, viral infections; gross: dilatation of all four chambers, pale flabby myocardium, ventricular thrombus; microscopy: thinned myocytes, interstitial fibrosis, chronic inflammatory cells; effect: impaired ventricular systolic function. src_7e15214661e511773a7a p1.

---

# Item

## id
CON-CVS-ABE9CE4B64FEF8

## label
Tamponade is a diagnosis of impaired filling, made clinically

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Pathology > Pericardial Disease > Cardiac Tamponade

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as Maria-Q2, "Define cardiac tamponade and mention its causes and complications" — printed answer: accumulation of fluid in the pericardial space causing reduced ventricular filling and haemodynamic failure; causes: malignant tumours, uraemia, idiopathic, infections, bleeding disorders; complications: pulmonary oedema, shock, death; it is a medical emergency. src_7e15214661e511773a7a p1.

---

# Item

## id
CON-CVS-F4BBA78E076D30

## label
Hypertension is arterial blood pressure persistently elevated above the normal range, most often caused by endocrine or kidney disease when secondary

## modules
+MUST-CVS-201

## module_subject
AU-MED-106 > Physiology > Blood pressure > Hypertension definition and causes
MUST-CVS-201 > Pathology > Hypertension > Definition and Secondary Causes

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested twice in this tranche — Maria-Q6 ("Define hypertension", printed answer: a chronic condition with sustained systolic BP >140 mmHg or diastolic BP >90 mmHg) and Maria-Q7 ("Enumerate causes of secondary hypertension", printed answer: renal diseases, endocrine diseases, phaeochromocytoma, coarctation of the aorta, obesity/contraceptive pills/sleep apnoea, pregnancy-associated hypertension). This concept's own definition already names endocrine and kidney disease as the two secondary-cause categories; the numeric threshold and the fuller MUST cause list sit in the question's own explanation rather than rewriting this concept's definition. src_7e15214661e511773a7a p2.
