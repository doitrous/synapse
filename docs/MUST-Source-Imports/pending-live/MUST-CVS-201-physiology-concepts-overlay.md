<!--
  MUST-CVS-201 · pending-live sparse CONCEPT overlay (Physiology tranche 7,
  author7).

  15 concept ids, none in server/data/medical-library-v1.json (checked via
  find-existing.mjs, which classified every hit below as "pending" not
  "live") -- 12 in Kasr's own unimported 104-CPS-mcq-concepts.md batch, 3 in
  Alexandria's own unimported AU-MED-106/102/203 physiology-concepts.md
  files:

    A. docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md -- 12 ids:
       CON-CVS-EFDC2163E84213 (arterioles/Poiseuille's law/TPR),
       CON-CVS-BE644093FBBA69 (turbulent flow/Reynolds number),
       CON-CVS-73B5BC1B2AB1FD (nitric oxide), CON-CVS-2BE3EA659D177B
       (circulating vasoconstrictor/vasodilator hormones),
       CON-CVS-F7ACE802080250 (renin-angiotensin system),
       CON-CVS-A0579343614BCD (systolic/diastolic/MAP/pulse pressure),
       CON-CVS-C3E60AC7A9EDB1 (arterial baroreceptor reflex),
       CON-CVS-A1E3D54120275D (carotid sinus syndrome) -- all eight FULL
       records (definition/pitfalls/module_subject present) -- plus
       CON-CVS-56A68328FD03C7 (local blood-flow autoregulation),
       CON-CVS-131F06D46D3B84 (peripheral chemoreceptor reflex),
       CON-CVS-BBAEB2E1A51102 (Cushing reflex), CON-CVS-FA5FB57963DDF7
       (flow = pressure gradient / resistance) -- these four are SPARSE
       mintConceptId rows (id/label/canonical_key/exam_signal/article_ids/
       field_notes only, no module_subject field in this file -- same
       pattern LANE-CARD-Y2.md's own anatomy-tranche overlays hit before).

    B. Alexandria physiology concept files -- 3 ids: CON-CVS-5F39EB05ECFB9B
       (docs/Alexandria-Source-Imports/concept/AU-MED-106-physiology-
       concepts.md, blood-flow velocity by vessel type, HAS its own
       module_subject), CON-NEU-072664470F6101 (docs/Alexandria-Source-
       Imports/concept/AU-MED-102-physiology-concepts.md, sacral
       parasympathetic erection) and CON-NEU-4F2FAFD0D5642F (docs/
       Alexandria-Source-Imports/concept/AU-MED-203-physiology-concepts.md,
       hypothalamic osmoreceptors/ADH) -- both AU-MED-102 and AU-MED-203 use
       topic/subtopic instead of module_subject, so neither has that field
       either.

  Two of these ids are reused for a genuinely different question-set fact
  than the source record's own headline label, judged extension rather than
  new mint after a fresh find-existing.mjs + grep search found no closer
  match: CON-NEU-072664470F6101's own label is about a sacral-cord-lesion
  clinical consequence, but its definition already states the underlying
  physiology (parasympathetic outflow produces vasodilatation of erectile
  tissue) that phys-q27 asks for directly ("Parasympathetic vasodilator
  fibers are definitively known to supply which organs? Genital Organs");
  CON-CVS-A0579343614BCD's own label covers systolic/diastolic/MAP/pulse-
  pressure as quantities, extended here to also cover the haemodynamic
  determinants of those quantities (stroke volume, heart rate, peripheral
  resistance, arterial compliance) that abp-q13/14/15/16/17 test, the same
  "extend rather than duplicate" call earlier tranches made for situs
  inversus and the S. epidermidis novobiocin fact.

  Per 00-START-HERE.md §3 (module_subject fully replaces on every write --
  no '+' form there): the eight full Kasr records and the one full
  Alexandria record (AU-MED-106) restate the source's existing line(s) plus
  MUST-CVS-201's own; the six records with no module_subject field in their
  source file write only MUST-CVS-201's own line, nothing to restate, same
  as the SYS-CVS-CONCEPT-T04.md precedent in MUST-CVS-201-pathology-
  concepts-overlay.md. '## universities', '## learner_years' and
  '## modules' are true ID-list columns and take '+must' / '+2' /
  '+MUST-CVS-201'; Kasr's own records read `universities: kau, learner_years:
  1`, Alexandria's read `universities: au, learner_years: 1` (AU-MED-106,
  AU-MED-102) or `2` (AU-MED-203) -- each row appends '+must' and '+2'
  regardless.

  Sibling docs/MUST-Source-Imports/pending-live/MUST-CVS-201-physiology-
  questions.md carries the MCQs that depend on these 15 ids. See that
  file's own header and pending-live/INDEX.md for the full apply order.

  Simulate together with the source file each block targets, e.g.:
    node scripts/content/gate.mjs simulate \
      docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md \
      docs/Alexandria-Source-Imports/concept/AU-MED-106-physiology-concepts.md \
      docs/Alexandria-Source-Imports/concept/AU-MED-102-physiology-concepts.md \
      docs/Alexandria-Source-Imports/concept/AU-MED-203-physiology-concepts.md \
      docs/MUST-Source-Imports/pending-live/MUST-CVS-201-physiology-concepts-overlay.md
-->

# Item

## id
CON-CVS-EFDC2163E84213

## label
Arterioles are the principal resistance vessels of the systemic circulation, and Poiseuille's law — resistance and flow varying with the fourth power of radius — explains why their smooth-muscle tone has such a powerful effect on local blood flow and total peripheral resistance

## modules
+MUST-CVS-201

## module_subject
104 CPS > Histology > Cardiovascular System > Arteries
MUST-CVS-201 > Physiology > Blood Flow > Resistance and Poiseuille's Law

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested four times this tranche -- phys-q01 ("According to Poiseuille's law, blood flow is most directly proportional to:", key C, the fourth power of the radius), phys-q02 ("The primary site of resistance to blood flow... is the:", key D, Arterioles), phys-q18 ("Resistance to blood flow is directly proportional to:", key C, the fourth power of the radius) and phys-q21 ("Which of the following would cause an increase in blood flow (Q)...", key C, Vasodilation) -- this record's own definition (arterioles as the chief resistance vessels, Poiseuille's fourth-power radius relationship, pressure autoregulation via arteriolar dilation) already covers all four facts. src_165188e079f0f475e54d p.9. Also cited for phys-q29 ("Total Peripheral Resistance (TPR) is mainly regulated by the:", key D, Arterioles), the same resistance-vessel fact restated.

---

# Item

## id
CON-CVS-BE644093FBBA69

## label
Blood flow becomes turbulent, rather than laminar, when its Reynolds number rises — driven up by higher velocity or vessel diameter and DOWN by higher viscosity — and partial vessel occlusion promotes turbulence locally by raising velocity through the narrowed segment

## modules
+MUST-CVS-201

## module_subject
104 CPS > Physiology > Cardiovascular System > Vascular Function
MUST-CVS-201 > Physiology > Blood Flow > Laminar and Turbulent Flow

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as phys-q04, "Which type of blood flow is characterized by smooth, parallel layers of blood?" -- printed key B, Laminar flow. This record's own opening line ("Whether blood flow is smooth (laminar) or turbulent is predicted by the Reynolds number") already states the laminar/turbulent distinction the question tests, even though the record's own explicit objective goes on to the Reynolds-number determinants rather than the bare definition. src_165188e079f0f475e54d p.9.

---

# Item

## id
CON-CVS-73B5BC1B2AB1FD

## label
Endothelial nitric oxide, synthesised from L-arginine by eNOS and acting through smooth-muscle cGMP, is a short-lived local vasodilator whose deficiency contributes to chronic hypertension

## modules
+MUST-CVS-201

## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
MUST-CVS-201 > Physiology > Blood Flow > Vasoactive Hormones

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as phys-q09, "Which substance, synthesized from arginine, is a potent vasodilator essential for maintaining normal blood pressure?" -- printed key D, Nitric Oxide (NO). This record's own definition (eNOS synthesises NO from L-arginine, a paracrine vasodilator) covers the fact directly. src_165188e079f0f475e54d p.9.

---

# Item

## id
CON-CVS-2BE3EA659D177B

## label
The circulating hormones acting on the vasculature split into vasoconstrictors — angiotensin II, epinephrine, norepinephrine and vasopressin — and vasodilators — kinins and natriuretic peptide

## modules
+MUST-CVS-201

## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
MUST-CVS-201 > Physiology > Blood Flow > Vasoactive Hormones

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested twice this tranche -- phys-q06 ("Which of the following is a potent circulating vasoconstrictor released in response to renal ischemia?", key D, Angiotensin II) and phys-q11 ("Which of the following is a circulating vasodilator substance?", key C, Kinins). This record's own vasoconstrictor/vasodilator hormone classification covers both facts directly. src_165188e079f0f475e54d p.9.

---

# Item

## id
CON-CVS-F7ACE802080250

## label
Renin from the juxtaglomerular apparatus cleaves hepatic angiotensinogen to angiotensin I, which ACE converts to angiotensin II, and renin secretion — raised by hypovolaemia, renal ischaemia, reduced distal Na+ delivery and sympathetic stimulation, not by hypertension — makes the RAS a major long-term regulator of arterial pressure

## modules
+MUST-CVS-201

## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Renin-Angiotensin System

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested three times this tranche -- phys-q24 ("The conversion of Angiotensin I to Angiotensin II occurs primarily in the:", key C, Lung), abp-q18 ("What is the rapid mechanism for regulating arterial blood pressure?", key C, Nervous Regulation -- this record's own contrast of the baroreceptor/chemoreceptor reflexes acting "within seconds" against angiotensin II's own intermediate-to-long-term timescale is what the question's own EXCEPT-style framing tests), abp-q35 ("Renin secretion is increased by all of the following EXCEPT:", key C, Increased Na+ delivery to the distal tubule -- this record's own trigger list states reduced, not increased, distal Na+ delivery raises renin) and abp-q36 ("Angiotensin I is converted to Angiotensin II primarily by:", key C, ACE in the lung endothelium). This record's own cascade (renin -> angiotensin I -> ACE in lung endothelium -> angiotensin II; triggers; long-term classification) covers all four facts directly. src_165188e079f0f475e54d p.9 & p.20.

---

# Item

## id
CON-CVS-A0579343614BCD

## label
Systolic, diastolic and mean arterial pressure are distinct quantities, mean arterial pressure sits nearer diastolic because diastole outlasts systole, and pulse pressure widens when arterial compliance falls

## modules
+MUST-CVS-201

## module_subject
104 CPS > Physiology > Cardiovascular System > Vascular Function
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Pressure Components and Determinants

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested eight times this tranche -- abp-q01 ("What is the definition of arterial blood pressure?", key B, the lateral pressure of blood on the wall of arteries), abp-q02 ("What is the normal range for systolic blood pressure?", key C, 90-150 mmHg -- the source paper prints this same "60-90 mmHg" text for both options A and D, a duplication rather than a genuine fourth distractor; the printed key (C) stands per LANE-CARD.md rule 2, flagged here rather than silently corrected), abp-q03 ("Pulse pressure is defined as:", key C, systolic minus diastolic), abp-q04 ("How is mean systemic arterial pressure calculated?", key C, diastolic + 1/3 pulse pressure), abp-q14 ("An increase in stroke volume primarily increases:", key C, systolic pressure and pulse pressure), abp-q15 ("An increase in heart rate will:", key A, increase diastolic pressure and decrease pulse pressure), abp-q16 ("Increased peripheral resistance elevates which pressure the most?", key D, Diastolic Pressure) and abp-q17 ("In atherosclerosis, decreased arterial elasticity leads to:", key B, increased systolic and decreased diastolic pressure -- this record's own "pulse pressure widens when arterial compliance falls" line covers this directly). This record's definition, extended in each question's own explanation to the specific haemodynamic determinant tested (stroke volume, heart rate, peripheral resistance, arterial compliance), covers all eight facts -- the same "extend rather than duplicate" call earlier tranches made for situs inversus. src_165188e079f0f475e54d p.20.

---

# Item

## id
CON-CVS-C3E60AC7A9EDB1

## label
Baroreceptor discharge rises and falls with arterial pressure and, through the nucleus of the tractus solitarius, opposes whichever change caused it

## modules
+MUST-CVS-201

## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Baroreceptor Reflex

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested four times this tranche -- abp-q06 ("Which of the following carries the impulses from the arterial baroreceptors?", key C, A & B -- Aortic nerve and Carotid sinus nerve, both named directly in this record's own definition), abp-q21 ("The arterial baroreceptors are located in the:", key B, Aortic arch and carotid sinus), abp-q22 ("Baroreceptors are stimulated by:", key B, Stretching of the arterial wall) and abp-q23 ("When arterial blood pressure increases, the baroreceptor reflex causes:", key B, Vasodilation and decreased heart rate). This record's own definition (location, both nerves, and the full reflex arc for a rise in pressure) covers all four facts directly. src_165188e079f0f475e54d p.20.

---

# Item

## id
CON-CVS-A1E3D54120275D

## label
Carotid sinus syndrome is an acquired hypersensitivity of the carotid sinus baroreceptors, not a normal finding in young people, in which mild external pressure triggers marked bradycardia and hypotension that can require denervation or a pacemaker

## modules
+MUST-CVS-201

## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Baroreceptor Reflex

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as abp-q24, "Carotid Sinus Syndrome can lead to fainting because:" -- printed key B, "Pressure on the sinus causes a marked reflex drop in blood pressure." This record's own definition (abnormal baroreceptor hypersensitivity, trivial external pressure triggering bradycardia/hypotension/syncope) covers the fact directly. src_165188e079f0f475e54d p.20.

---

# Item

## id
CON-CVS-56A68328FD03C7

## label
Local blood flow is matched to tissue metabolism by two mechanisms — active hyperaemia driven by vasodilator metabolites and hypoxia, and myogenic/metabolic autoregulation that returns flow toward normal after a change in perfusion pressure

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Autoregulation and Active Hyperaemia

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested five times this tranche -- phys-q08 ("The ability of a tissue to regulate its own blood flow according to its metabolic needs is called:", key B, Autoregulation), phys-q10 ("An increase in blood flow to a tissue following a period of occlusion is known as:", key C, Reactive hyperemia -- this record's own "returns flow toward normal after a change in perfusion pressure" phrasing is the general autoregulatory mechanism reactive hyperaemia is a specific instance of), phys-q17 ("Which of the following metabolites accumulates during tissue activity and causes vasodilation?", key C, Adenosine -- one of this record's own "vasodilator metabolites"), phys-q22 ("The Myogenic theory of autoregulation states that an increase in blood flow causes:", key B, Contraction of muscles -- the myogenic half of this record's own two-mechanism definition) and phys-q26 ("A decrease in oxygen tension (O2) in a tissue will typically lead to:", key B, Vasodilation -- hypoxia is named directly in this record's own "active hyperaemia driven by vasodilator metabolites and hypoxia"). This file carries no module_subject field for this record (a sparse mintConceptId row, per this file's own field_notes on every such row), so only MUST-CVS-201's own module_subject line is written, nothing to restate. src_165188e079f0f475e54d p.9.
must-tranche8: Tested once more in the Capillary Circulation & Oedema section -- physcap-q03 ("The precapillary sphincters at the beginning of capillaries relax primarily in response to:", key B, Accumulation of metabolites) -- this record's own "produced by arteriolar and precapillary-sphincter dilation from local hypoxia, vasodilator metabolites (CO2, H+, adenosine)" phrasing covers the fact directly. src_165188e079f0f475e54d p.26.

---

# Item

## id
CON-CVS-131F06D46D3B84

## label
The peripheral chemoreceptor reflex, driven by low arterial PO2 in the carotid and aortic bodies, raises sympathetic discharge to correct a markedly low arterial pressure

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Chemoreceptor Reflex

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as abp-q25, "Peripheral chemoreceptors are stimulated by all of the following EXCEPT:" -- printed key C, High blood pressure (decreased O2, increased CO2 and increased H+ are all genuine peripheral-chemoreceptor stimuli; high blood pressure is a baroreceptor, not chemoreceptor, domain). This record's own definition (low PO2 in the carotid/aortic bodies is the reflex's trigger) supports the exclusion this question tests. This file carries no module_subject field for this record (a sparse mintConceptId row), so only MUST-CVS-201's own module_subject line is written. src_165188e079f0f475e54d p.20.

---

# Item

## id
CON-CVS-BBAEB2E1A51102

## label
The Cushing reflex — raised arterial pressure with bradycardia — is triggered by raised intracranial pressure compressing the cerebral vessels and making the vasomotor area ischaemic

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Cushing Reflex

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as abp-q31, "The Cushing's reflex is characterized by:" -- printed key B, "Hypertension and bradycardia." This record's own definition covers the fact directly. This file carries no module_subject field for this record (a sparse mintConceptId row), so only MUST-CVS-201's own module_subject line is written. src_165188e079f0f475e54d p.20.

---

# Item

## id
CON-CVS-FA5FB57963DDF7

## label
Blood flow equals the pressure gradient divided by resistance, and applied to the whole circulation this gives a systemic resistance of about 18 mmHg/L/min against a pulmonary resistance of only about 1.4 mmHg/L/min

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Pressure Components and Determinants

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as abp-q13, "The formula for Arterial Blood Pressure is:" -- printed key B, Cardiac Output x Total Peripheral Resistance. This record's own flow = pressure-gradient / resistance relationship is the same identity rearranged for the whole systemic circuit (mean arterial pressure ~ cardiac output x total peripheral resistance). This file carries no module_subject field for this record (a sparse mintConceptId row), so only MUST-CVS-201's own module_subject line is written. src_165188e079f0f475e54d p.20.

---

# Item

## id
CON-CVS-5F39EB05ECFB9B

## label
Blood flow velocity is fastest in the aorta and slowest in the capillaries, because velocity is inversely proportional to total cross-sectional area

## modules
+MUST-CVS-201

## module_subject
AU-MED-106 > Physiology > Blood pressure > Blood flow velocity by vessel type
MUST-CVS-201 > Physiology > Blood Flow > Velocity and Cross-Sectional Area

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as phys-q03, "The velocity of blood flow is slowest in the capillaries because:" -- printed key B, "They have the largest total cross-sectional area." This record's own definition (velocity inversely proportional to total cross-sectional area, capillaries slowest despite tiny individual diameter because of their enormous combined area) covers the fact directly. src_165188e079f0f475e54d p.9.

---

# Item

## id
CON-NEU-072664470F6101

## label
Sacral spinal-cord damage abolishes erection by removing the parasympathetic outflow that produces it

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Parasympathetic Vasodilator Fibres

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as phys-q27, "Parasympathetic vasodilator fibers are definitively known to supply which organs?" -- printed key C, Genital Organs. This record's own headline label is about a sacral-cord-lesion clinical consequence, but its definition already states the underlying physiology phys-q27 tests directly ("Erection is driven by the sacral parasympathetic outflow (S2-S4), which produces vasodilatation and engorgement of the erectile tissue"); a fresh find-existing.mjs + grep search for "parasympathetic vasodilator fibers" and "genital organs" found no closer match, so this is an extension of the same physiological fact rather than a new mint, the same call earlier tranches made for situs inversus. This file (AU-MED-102-physiology-concepts.md) carries no module_subject field for any record (uses topic/subtopic/microtopic instead), so only MUST-CVS-201's own module_subject line is written. src_165188e079f0f475e54d p.9.

---

# Item

## id
CON-NEU-4F2FAFD0D5642F

## label
Osmoreceptors that drive thirst and ADH release are located in the hypothalamus

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Vasoactive Hormones

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as phys-q30, "What is the primary trigger for the secretion of Vasopressin (ADH) from the posterior pituitary?" -- printed key C, Increased plasma osmolality. This record's own definition states osmoreceptors drive ADH release "when plasma osmolality rises," covering the fact directly -- a distinct trigger-mechanism fact from CON-CVS-A531FD56A171D7 (this lane's own live in-lane "long-term ABP regulation" concept, tranche 1), whose vasopressin account is the volume/atrial-low-pressure-receptor mechanism, not the osmoreceptor one abp-q40 and phys-q30 test separately. This file (AU-MED-203-physiology-concepts.md) carries no module_subject field for any record (uses topic/subtopic instead, and `modules` is empty for this record), so only MUST-CVS-201's own module_subject line is written. src_165188e079f0f475e54d p.9.

---

# Item

## id
CON-CVS-5419DA4CEFDBB6

## label
The Bainbridge (atrial) reflex: distension of the right atrium by increased venous return stretches the SA node and raises heart rate

## modules
+MUST-CVS-201

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must-tranche8: First MUST-CVS-201 tag for this Menoufia MU-MED105 concept. Tested as physabp2-q06, "Stimulation of atrial receptors (volume receptors) by high central venous pressure leads to:" -- printed key C, "Vasodilation and tachycardia." This record's own definition (right-atrial/SA-node stretch from raised venous return raises heart rate via the Bainbridge reflex) covers the tachycardia half of the printed answer directly; the source's own paired "vasodilation" is the accompanying vascular component of the same atrial-stretch reflex, not a separate fact this record needs to restate to serve the question. `## module_subject` intentionally omitted (not restated from MU-MED105-concepts.md, whose own module_subject is `MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology`) -- overlay rows carry no module_subject per the current gate.mjs batch check, which rejects a sparse row (modules `+MUST-CVS-201`) whose module_subject first segment does not literally match that `+`-prefixed value. src_165188e079f0f475e54d p.20.

---

# Item

## id
CON-CVS-98657F1E7D300D

## label
Trans-capillary filtration is set by the Starling forces, and along a muscle capillary this produces net outward filtration at the arteriolar end and net absorption at the venular end

## modules
+MUST-CVS-201

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must-tranche8: First MUST-CVS-201 tag for this Kasr 104-CPS-physiology-concepts.md concept. Tested four times in the Capillary Circulation & Oedema section (src_165188e079f0f475e54d p.26) -- physcap-q07 ("What is the primary force responsible for the absorption of fluid into the capillaries at the venous end?", key C, Colloidal osmotic pressure of plasma proteins), physcap-q09 ("Filtration at the arterial end of capillary occurs mainly due to:", key A, Hydrostatic pressure in capillaries), physcap-q10 ("Which of the following tends to decrease capillary filtration rate?", key D, Decreased capillary water permeability -- the filtration-coefficient term of this record's own fluid-movement equation) and physcap-q17 ("Which force...decreases significantly from the arterial end (35 mmHg) to the venous end (15 mmHg)?", key C, Hydrostatic capillary pressure -- this record's own worked muscle-capillary numbers are different but the general Starling-forces fact of falling hydrostatic pressure along the capillary is the same one tested here). `## module_subject` intentionally omitted, per this file's own new standing note above (CON-CVS-5419DA4CEFDBB6) on the current gate.mjs batch check.

---

# Item

## id
CON-CVS-D3D1AF25EFA406

## label
Diffusion is the dominant mechanism of capillary exchange and depends on capillary permeability type and concentration gradient, while vesicular transport carries large lipid-insoluble molecules across the endothelium

## modules
+MUST-CVS-201

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must-tranche8: First MUST-CVS-201 tag for this Kasr 104-CPS-physiology-concepts.md concept. Tested twice in the Capillary Circulation & Oedema section (src_165188e079f0f475e54d p.26) -- physcap-q11 ("Which of the following mechanisms is most important for the exchange of electrolytes across capillaries?", key A, Diffusion) and physcap-q14 ("Vesicular transport across the capillary wall is primarily concerned with the movement of:", key C, Large molecules like proteins) -- both facts are this record's own two named mechanisms, diffusion for small solutes and vesicular transport for large lipid-insoluble molecules. `## module_subject` intentionally omitted, per this file's own new standing note above (CON-CVS-5419DA4CEFDBB6) on the current gate.mjs batch check.
