<!--
  MUST-CVS-201 - Physiology tranche (author7) - pending MCQs (main_concept pending in Kasr 104-CPS-mcq-concepts.md or Alexandria AU-MED-106/102/203 physiology-concepts.md, per pending-live/MUST-CVS-201-physiology-concepts-overlay.md), from the Physiology CVS201 EOM Final paper. 18 Blood Flow questions (keys read from the paper's own printed Blood Flow answer key, p.9) emitted from physblood-pending.json, followed by 19 Arterial Blood Pressure questions (keys read from the paper's own printed Arterial Blood Pressure answer key, p.20) emitted from physabp-pending.json — plus one held item (abp-q07, garbled printed option list) that emits no record. library_ids for the five autoregulation-concept questions (physblood-q08/10/17/22/26) point to ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL, not ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL named on the concept's own article_ids field — the concept's teaching article (per its own related_concepts list, the direction validate-content-batch.mjs's coverage check also honours) is the local/hormonal-control one; the concept row's own article_ids field is a "+"-prefixed sparse-pipeline addendum, not a clean id, so citing it literally would fail the coverage check on the "+" character.

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q01

## title
Poiseuille's law and blood flow

## question
According to Poiseuille's law, blood flow is most directly proportional to:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Viscosity of the blood

## explanation_a
Incorrect. Blood flow is inversely, not directly, proportional to viscosity: a rise in viscosity reduces flow for a given pressure gradient and radius.

## answer_b
Length of the blood vessel

## explanation_b
Incorrect. Blood flow is inversely, not directly, proportional to vessel length: a longer vessel offers more resistance and so, for a given pressure and radius, less flow.

## answer_c
The fourth power of the radius (r⁴)

## explanation_c
Correct. Poiseuille's law states that flow varies with the pressure gradient and with the vessel radius raised to the fourth power, while it varies inversely with viscosity and length. Because flow scales with r to the fourth power, a vessel that doubles its radius increases flow sixteen-fold from that change alone, making radius, of every variable in the equation, by far the most powerful determinant of flow and resistance. This fourth-power relationship is exactly why small changes in arteriolar diameter dominate local blood-flow control far more than comparable changes in driving pressure.

## answer_d
Pressure gradient

## explanation_d
Incorrect. Flow is directly proportional to the pressure gradient too, but only to its first power, a much weaker relationship than the fourth-power dependence on radius, so radius is the "most directly proportional" variable Poiseuille's law singles out.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-EFDC2163E84213

## concept_ids
CON-CVS-EFDC2163E84213

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Resistance and Poiseuille's Law

## question_only_for

## library_ids
ART-104-HIS-ARTERIES-AND-VEINS

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that Poiseuille's law makes blood flow vary with the fourth power of vessel radius, the strongest single determinant of flow and resistance.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q02

## title
Primary site of vascular resistance

## question
The primary site of resistance to blood flow in the circulatory system is the:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Large arteries

## explanation_a
Incorrect. Large arteries have wide lumens and offer relatively little resistance; their main functional role is elastic conduction and pressure-wave transmission, not resistance.

## answer_b
Capillaries

## explanation_b
Incorrect. Individual capillaries are narrow, but their enormous combined cross-sectional area and lack of smooth muscle mean they are not the principal resistance vessels; their role is exchange, not resistance.

## answer_c
Venules

## explanation_c
Incorrect. Venules have thin, low-resistance walls and function mainly as the first collecting vessels of the venous (capacitance) side of the circulation, not as major resistance vessels.

## answer_d
Arterioles

## explanation_d
Correct. Arterioles are the principal resistance vessels of the systemic circulation: their small lumen combined with a well-developed smooth-muscle media lets them change vascular resistance far more than any other vessel type. Sympathetic constriction of arterioles produces the largest rise in total peripheral resistance of any vessel class, and arterioles carry out the last point of active flow control before the capillary bed. This resistance role, governed by Poiseuille's fourth-power radius relationship, is why arteriolar diameter dominates both local blood flow and overall arterial pressure.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-EFDC2163E84213

## concept_ids
CON-CVS-EFDC2163E84213

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Resistance and Poiseuille's Law

## question_only_for

## library_ids
ART-104-HIS-ARTERIES-AND-VEINS

## resource_ids
src_165188e079f0f475e54d

## learning_objective
Identify arterioles as the principal resistance vessels of the systemic circulation.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q03

## title
Slowest blood flow velocity

## question
The velocity of blood flow is slowest in the capillaries because:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
The pressure is lowest there

## explanation_a
Incorrect. Although capillary pressure is indeed relatively low, velocity is set by the relationship between flow and total cross-sectional area, not directly by local pressure.

## answer_b
They have the largest total cross-sectional area

## explanation_b
Correct. For a continuous flow, where the same total volume per minute passes through every level of the circulation, velocity at any point is inversely proportional to the total cross-sectional area available there. Despite each individual capillary being tiny, the sheer number of capillaries running in parallel gives them the largest combined cross-sectional area of any level of the circulation, so velocity falls to its slowest there, roughly 0.03 to 0.05 cm per second, compared to 40 to 50 cm per second in large arteries. This "traffic jam" effect is precisely what gives capillary blood the time it needs for gas, nutrient and waste exchange to occur.

## answer_c
They have the highest resistance

## explanation_c
Incorrect. Capillaries individually offer little resistance compared with arterioles, which are the principal resistance vessels; high resistance is not what slows capillary velocity.

## answer_d
They are the most numerous

## explanation_d
Incorrect. Being numerous is the underlying reason their combined cross-sectional area is so large, but it is that large total cross-sectional area, not numerousness on its own, that is the direct cause of the low velocity.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-5F39EB05ECFB9B

## concept_ids
CON-CVS-5F39EB05ECFB9B

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Velocity and Cross-Sectional Area

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that blood-flow velocity is inversely proportional to total cross-sectional area, making capillaries the slowest despite their tiny individual diameter.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q04

## title
Laminar flow definition

## question
Which type of blood flow is characterized by smooth, parallel layers of blood?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Turbulent flow

## explanation_a
Incorrect. Turbulent flow is disorganised, with eddies and cross-currents rather than smooth parallel layers, and it is promoted by a high Reynolds number, driven up by higher velocity or vessel diameter and down by higher viscosity.

## answer_b
Laminar flow

## explanation_b
Correct. Laminar flow is the normal, smooth pattern of blood movement, in which blood moves in concentric, parallel layers (or streamlines) that slide past one another with the fastest layer at the centre of the vessel and progressively slower layers toward the wall. Whether flow stays laminar or becomes turbulent is predicted by the Reynolds number, and laminar flow is silent, whereas turbulent flow is the physical basis of vascular murmurs and bruits, such as those produced by a partial vessel occlusion that locally raises velocity enough to disrupt the smooth layers.

## answer_c
Bolus flow

## explanation_c
Incorrect. "Bolus flow" is not a standard term for a basic pattern of blood flow in the circulation; it is not one of the two recognised flow patterns (laminar and turbulent).

## answer_d
Critical flow

## explanation_d
Incorrect. "Critical flow" is not a standard classification of blood-flow pattern; the relevant physiological distinction is between laminar and turbulent flow, predicted by the Reynolds number.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-BE644093FBBA69

## concept_ids
CON-CVS-BE644093FBBA69

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Laminar and Turbulent Flow

## question_only_for

## library_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE

## resource_ids
src_165188e079f0f475e54d

## learning_objective
Define laminar flow as the smooth, parallel-layered pattern of normal blood flow, and contrast it with turbulent flow.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q06

## title
Angiotensin II as a circulating vasoconstrictor

## question
Which of the following is a potent circulating vasoconstrictor released in response to renal ischemia?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Atrial Natriuretic Peptide (ANP)

## explanation_a
Incorrect. ANP is a vasodilator hormone secreted in response to atrial stretch from rising blood volume, not a vasoconstrictor released by renal ischaemia.

## answer_b
Bradykinin

## explanation_b
Incorrect. Bradykinin, a kinin, is a local vasodilator, the opposite direction of action from the vasoconstrictor this question describes.

## answer_c
Nitric Oxide (NO)

## explanation_c
Incorrect. Nitric oxide is a local vasodilator synthesised by endothelium, not a circulating vasoconstrictor released in response to renal ischaemia.

## answer_d
Angiotensin II

## explanation_d
Correct. The circulating hormones acting on the vasculature split into vasoconstrictors, angiotensin II, epinephrine, norepinephrine and vasopressin, and vasodilators, kinins and natriuretic peptide. Renal ischaemia (from a fall in arterial pressure) triggers renin secretion, which drives formation of angiotensin II, a potent circulating vasoconstrictor that raises arterial pressure by direct vasoconstriction and by promoting aldosterone and ADH secretion. This renal-ischaemia trigger is exactly what makes angiotensin II, among the four circulating vasoconstrictor hormones, the one specifically tied to falling renal perfusion.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-2BE3EA659D177B

## concept_ids
CON-CVS-2BE3EA659D177B

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Vasoactive Hormones

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
Identify angiotensin II as the circulating vasoconstrictor hormone released in response to renal ischaemia.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q08

## title
Autoregulation definition

## question
The ability of a tissue to regulate its own blood flow according to its metabolic needs is called:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Reactive hyperemia

## explanation_a
Incorrect. Reactive hyperaemia is a specific instance of increased flow following a period of occlusion, not the general term for a tissue's ability to match its own flow to its metabolic needs.

## answer_b
Autoregulation

## explanation_b
Correct. Local blood flow is matched to tissue metabolism by two intrinsic mechanisms working together, active hyperaemia, driven by vasodilator metabolites and hypoxia, and myogenic and metabolic autoregulation, which returns flow toward normal after a change in perfusion pressure. Autoregulation is the general term for this tissue-level, self-regulating ability to keep blood flow appropriate to metabolic demand independent of moment-to-moment changes in driving pressure. It is an intrinsic property of the tissue's own vasculature rather than a response requiring external nervous or hormonal input.

## answer_c
Active hyperemia

## explanation_c
Incorrect. Active hyperaemia is one specific mechanism contributing to autoregulation, driven by local vasodilator metabolites, but it is not itself the general term for the tissue's overall self-regulating ability.

## answer_d
Myogenic response

## explanation_d
Incorrect. The myogenic response is one specific mechanism of autoregulation, in which stretch of vascular smooth muscle triggers reflex contraction, but it is not the general term the question asks for.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-56A68328FD03C7

## concept_ids
CON-CVS-56A68328FD03C7

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Autoregulation and Active Hyperaemia

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
Define autoregulation as a tissue's intrinsic ability to match its own blood flow to its metabolic needs.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q09

## title
Nitric oxide synthesis and action

## question
Which substance, synthesized from arginine, is a potent vasodilator essential for maintaining normal blood pressure?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Endothelin

## explanation_a
Incorrect. Endothelin is also produced by endothelium, but it is a peptide, not synthesised from arginine, and it is a potent vasoconstrictor, not a vasodilator.

## answer_b
Thromboxane A₂

## explanation_b
Incorrect. Thromboxane A2 is derived from arachidonic acid, not arginine, and it is a vasoconstrictor and platelet-aggregation promoter, the opposite of a vasodilator.

## answer_c
Vasopressin

## explanation_c
Incorrect. Vasopressin is a peptide hormone from the posterior pituitary, not synthesised from arginine in the endothelium, and its principal vascular action is vasoconstriction, not vasodilation.

## answer_d
Nitric Oxide (NO)

## explanation_d
Correct. Endothelial nitric oxide is synthesised continuously from the amino acid L-arginine by endothelial nitric oxide synthase (eNOS), and it acts through smooth-muscle cyclic GMP to produce vasodilation. It is a short-lived local vasodilator whose deficiency contributes to chronic hypertension, underscoring why adequate NO synthesis is essential for maintaining normal blood pressure rather than merely a minor contributor to it. Shear stress, acetylcholine, bradykinin and histamine all raise NO secretion, linking it to the body's other local vasodilator signalling pathways.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-73B5BC1B2AB1FD

## concept_ids
CON-CVS-73B5BC1B2AB1FD

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Vasoactive Hormones

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
Identify nitric oxide as the arginine-derived, endothelium-synthesised vasodilator essential for normal blood pressure.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q10

## title
Reactive hyperaemia after occlusion

## question
An increase in blood flow to a tissue following a period of occlusion is known as:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Active hyperemia

## explanation_a
Incorrect. Active hyperaemia is the increase in local blood flow that accompanies increased tissue metabolic activity itself, not specifically the flow surge that follows release of a period of occlusion.

## answer_b
Autoregulation

## explanation_b
Incorrect. Autoregulation is the general mechanism that keeps flow matched to metabolic need across a range of perfusion pressures; reactive hyperaemia is one specific, named manifestation of it after occlusion, not the general term.

## answer_c
Reactive hyperemia

## explanation_c
Correct. Local blood flow is matched to tissue metabolism by mechanisms that return flow toward normal after a change in perfusion pressure, and when a vessel has been occluded, the resulting build-up of vasodilator metabolites and local hypoxia produces a pronounced increase in blood flow once the occlusion is released, exceeding the resting baseline for a period before settling back down. This surge is specifically named reactive hyperaemia, distinguishing it from active hyperaemia (driven by increased metabolic activity itself) even though both arise from the same underlying local, metabolite-driven vasodilator mechanisms.

## answer_d
Myogenic contraction

## explanation_d
Incorrect. Myogenic contraction describes vascular smooth muscle contracting in response to stretch (e.g. from a rise in pressure), the opposite direction of response from the flow increase reactive hyperaemia describes.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-56A68328FD03C7

## concept_ids
CON-CVS-56A68328FD03C7

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Autoregulation and Active Hyperaemia

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
Name reactive hyperaemia as the specific increase in blood flow that follows release of a period of vascular occlusion.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q11

## title
Circulating vasodilator substance

## question
Which of the following is a circulating vasodilator substance?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Norepinephrine

## explanation_a
Incorrect. Norepinephrine acts almost exclusively on alpha-adrenergic receptors and is a circulating vasoconstrictor, not a vasodilator, in essentially every vascular bed it reaches.

## answer_b
Vasopressin (ADH)

## explanation_b
Incorrect. Vasopressin is one of the circulating vasoconstrictor hormones, alongside angiotensin II, epinephrine and norepinephrine, not a vasodilator.

## answer_c
Kinins

## explanation_c
Correct. The circulating hormones acting on the vasculature split into vasoconstrictors, angiotensin II, epinephrine, norepinephrine and vasopressin, and vasodilators, kinins (such as bradykinin) and natriuretic peptides (such as ANP). Kinins are therefore, alongside natriuretic peptide, one of only two classes of circulating vasodilator hormone named in this classification, distinguishing them from the four circulating vasoconstrictors.

## answer_d
Endothelin

## explanation_d
Incorrect. Endothelin, though locally rather than systemically acting, is a potent vasoconstrictor released by endothelium in response to stretch or injury, not a vasodilator.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-2BE3EA659D177B

## concept_ids
CON-CVS-2BE3EA659D177B

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Vasoactive Hormones

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
Identify kinins as one of the two classes of circulating vasodilator hormone, distinct from the four circulating vasoconstrictors.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q17

## title
Adenosine as a local vasodilator metabolite

## question
Which of the following metabolites accumulates during tissue activity and causes vasodilation?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Glucose

## explanation_a
Incorrect. Glucose is a metabolic substrate consumed, not accumulated, during tissue activity, and it is not itself a recognised local vasodilator metabolite.

## answer_b
Oxygen

## explanation_b
Incorrect. Oxygen is consumed, and so falls rather than accumulates during tissue activity; it is the fall in oxygen tension, not oxygen itself, that promotes local vasodilation.

## answer_c
Adenosine

## explanation_c
Correct. Local blood flow is matched to tissue metabolism by active hyperaemia, driven by vasodilator metabolites and hypoxia. As tissue metabolic activity rises, adenosine, released from cells as ATP is broken down for energy, accumulates locally and acts as one of the vasodilator metabolites that widens the local vasculature, increasing blood flow to match the tissue's rising metabolic demand.

## answer_d
Bicarbonate

## explanation_d
Incorrect. Bicarbonate is not a classic local vasodilator metabolite of active hyperaemia; carbon dioxide and hydrogen ions, not bicarbonate itself, are the acid-base-related mediators usually cited alongside adenosine.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-56A68328FD03C7

## concept_ids
CON-CVS-56A68328FD03C7

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Autoregulation and Active Hyperaemia

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
Name adenosine as a local vasodilator metabolite that accumulates during increased tissue activity.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q18

## title
Resistance and the fourth power of radius

## question
Resistance to blood flow is directly proportional to:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
The radius of the vessel

## explanation_a
Incorrect. Resistance is inversely, not directly, proportional to the vessel radius: a wider vessel offers less resistance.

## answer_b
The fourth power of the radius

## explanation_b
Incorrect. Resistance is inversely proportional to the fourth power of the radius (a doubled radius cuts resistance to a sixteenth), the inverse of the relationship this option states; flow, not resistance, rises directly with r to the fourth power.

## answer_c
The viscosity of the blood

## explanation_c
Correct. Poiseuille's law shows that vascular resistance rises directly with blood viscosity, alongside vessel length, while it falls with the fourth power of the radius. Because arterioles are the principal resistance vessels, and their small lumen combined with well-developed smooth muscle lets them change resistance more than any other vessel type, viscosity's direct contribution to resistance sits alongside, but is dominated in practice by, the arterioles' own radius changes.

## answer_d
The pressure gradient

## explanation_d
Incorrect. The pressure gradient is the driving force for flow, related to resistance and flow by flow = pressure gradient / resistance, but resistance itself is not directly proportional to the pressure gradient.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-EFDC2163E84213

## concept_ids
CON-CVS-EFDC2163E84213

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Resistance and Poiseuille's Law

## question_only_for

## library_ids
ART-104-HIS-ARTERIES-AND-VEINS

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that vascular resistance rises directly with blood viscosity, per Poiseuille's law.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q21

## title
Vasodilation and increased flow

## question
Which of the following would cause an increase in blood flow (Q) according to the principles of flow?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Vasoconstriction

## explanation_a
Incorrect. Vasoconstriction narrows the vessel radius, which by Poiseuille's fourth-power relationship sharply reduces, not increases, flow.

## answer_b
Increased viscosity

## explanation_b
Incorrect. Increased viscosity raises resistance and so reduces flow for a given pressure gradient and radius, the opposite of an increase.

## answer_c
Vasodilation

## explanation_c
Correct. By Poiseuille's law, flow varies with the pressure gradient and with vessel radius raised to the fourth power. Vasodilation widens the vessel radius, and because flow scales with r to the fourth power, even a modest increase in radius produces a large rise in flow, for example a doubled radius increases flow sixteen-fold from that change alone. This is the physical basis for why arteriolar vasodilation is such a powerful way to increase local blood flow to a tissue.

## answer_d
Increased vessel length

## explanation_d
Incorrect. Increased vessel length raises resistance and so reduces flow for a given pressure gradient and radius, the opposite of an increase.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-EFDC2163E84213

## concept_ids
CON-CVS-EFDC2163E84213

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Resistance and Poiseuille's Law

## question_only_for

## library_ids
ART-104-HIS-ARTERIES-AND-VEINS

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that vasodilation increases blood flow, via Poiseuille's fourth-power radius relationship.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q22

## title
Myogenic theory of autoregulation

## question
The Myogenic theory of autoregulation states that an increase in blood flow causes:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Accumulation of metabolites

## explanation_a
Incorrect. Accumulation of metabolites is the basis of the metabolic theory of autoregulation, a different mechanism from the myogenic theory this question asks about.

## answer_b
Contraction of muscles

## explanation_b
Correct. Local blood flow is matched to tissue metabolism partly by myogenic autoregulation, one of the two mechanisms (alongside metabolic/active hyperaemia) that return flow toward normal after a change in perfusion pressure. In the myogenic theory specifically, an increase in blood flow (and the pressure and stretch that accompany it) directly stretches vascular smooth muscle, and stretched vascular smooth muscle responds by contracting, which narrows the vessel and limits the rise in flow back toward normal, an intrinsic, pressure-sensing mechanism independent of nerves or metabolites.

## answer_c
Release of Nitric Oxide

## explanation_c
Incorrect. Release of nitric oxide is a separate, endothelium-mediated vasodilator mechanism triggered by shear stress, not the muscle-stretch-triggered contraction the myogenic theory describes.

## answer_d
Decreased oxygen tension

## explanation_d
Incorrect. Decreased oxygen tension is part of the metabolic (active hyperaemia) theory of autoregulation, not the myogenic theory, and it is a stimulus for vasodilation, not the myogenic response to increased flow.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-56A68328FD03C7

## concept_ids
CON-CVS-56A68328FD03C7

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Autoregulation and Active Hyperaemia

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that the myogenic theory of autoregulation explains increased flow triggering vascular smooth-muscle contraction via stretch.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q24

## title
Site of angiotensin conversion

## question
The conversion of Angiotensin I to Angiotensin II occurs primarily in the:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Liver

## explanation_a
Incorrect. The liver secretes angiotensinogen, the precursor renin acts on, not the site where angiotensin-converting enzyme converts angiotensin I to angiotensin II.

## answer_b
Kidney

## explanation_b
Incorrect. The kidney's juxtaglomerular apparatus secretes renin, the enzyme that forms angiotensin I from angiotensinogen, but the conversion of angiotensin I to angiotensin II happens elsewhere.

## answer_c
Lung

## explanation_c
Correct. Renin from the juxtaglomerular apparatus cleaves hepatic angiotensinogen to angiotensin I, and angiotensin-converting enzyme (ACE), found in vascular endothelial cells especially of the lung, then converts angiotensin I to the octapeptide angiotensin II. The lung's vast pulmonary capillary endothelial surface area, through which essentially all cardiac output passes, makes it the principal site of this conversion, which is why ACE inhibitor drugs are named for blocking an enzyme concentrated there.

## answer_d
Adrenal gland

## explanation_d
Incorrect. The adrenal cortex secretes aldosterone in response to angiotensin II and the adrenal medulla secretes epinephrine, but the adrenal gland is not the primary site of angiotensin I to angiotensin II conversion.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-F7ACE802080250

## concept_ids
CON-CVS-F7ACE802080250

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Renin-Angiotensin System

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that angiotensin-converting enzyme in the lung's vascular endothelium is the primary site of angiotensin I to angiotensin II conversion.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q26

## title
Hypoxia and local vasodilation

## question
A decrease in oxygen tension (O₂) in a tissue will typically lead to:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Vasoconstriction

## explanation_a
Incorrect. A local fall in tissue oxygen tension promotes vasodilation, not vasoconstriction, in the systemic circulation, the opposite of the pulmonary vasculature's characteristic hypoxic vasoconstrictor response.

## answer_b
Vasodilation

## explanation_b
Correct. Local blood flow is matched to tissue metabolism by active hyperaemia, driven by vasodilator metabolites and hypoxia. When tissue oxygen tension falls, whether from increased metabolic consumption or reduced delivery, local arterioles dilate to increase blood flow and restore oxygen supply toward the tissue's needs, part of the same metabolic autoregulatory response that also responds to accumulated vasodilator metabolites such as adenosine and carbon dioxide.

## answer_c
No change in vessel diameter

## explanation_c
Incorrect. A fall in tissue oxygen tension does produce a change in vessel diameter, specifically vasodilation, rather than leaving diameter unchanged.

## answer_d
Spasm

## explanation_d
Incorrect. "Spasm" describes an abnormal, sustained vasoconstriction, not the vasodilator response tissues normally show to a local fall in oxygen tension.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-56A68328FD03C7

## concept_ids
CON-CVS-56A68328FD03C7

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Autoregulation and Active Hyperaemia

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that a local fall in tissue oxygen tension produces vasodilation as part of active hyperaemia.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q27

## title
Parasympathetic vasodilator fibres and genital organs

## question
Parasympathetic vasodilator fibers are definitively known to supply which organs?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Heart and Lungs

## explanation_a
Incorrect. The heart's parasympathetic (vagal) innervation slows heart rate and conduction rather than acting as a vasodilator supply to the coronary vessels, and the lungs' parasympathetic supply mediates bronchoconstriction, not vasodilation to a peripheral vascular bed.

## answer_b
Skeletal Muscle

## explanation_b
Incorrect. Skeletal muscle vasodilation during exercise or stress is mediated by sympathetic cholinergic fibres and by epinephrine acting on beta2 receptors, not by parasympathetic vasodilator fibres.

## answer_c
Genital Organs

## explanation_c
Correct. Parasympathetic vasodilator fibres are definitively known to supply the genital organs: erection is driven by the sacral parasympathetic outflow (S2 to S4), which produces vasodilatation and engorgement of the erectile tissue. Destruction of the sacral region of the spinal cord removes this outflow and abolishes the capacity for a reflex erection, confirming that this specific vascular bed's vasodilator supply is genuinely parasympathetic, unlike the sympathetically-mediated vasodilation seen in skeletal muscle.

## answer_d
Cerebral Vessels

## explanation_d
Incorrect. Cerebral vessels are regulated mainly by local metabolic autoregulation (CO2 and pH) rather than by a definitively parasympathetic vasodilator supply.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-NEU-072664470F6101

## concept_ids
CON-NEU-072664470F6101

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Parasympathetic Vasodilator Fibres

## question_only_for

## library_ids
ART-NEU-PHYSIO-AUTONOMIC-NS

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that the genital organs are the vascular bed definitively supplied by parasympathetic vasodilator fibres.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q29

## title
Regulation of total peripheral resistance

## question
Total Peripheral Resistance (TPR) is mainly regulated by the:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Aorta

## explanation_a
Incorrect. The aorta's role is elastic conduction and pressure-wave buffering; its wide lumen and lack of significant smooth-muscle-driven resistance mean it is not the main regulator of TPR.

## answer_b
Capillaries

## explanation_b
Incorrect. Capillaries are exchange vessels without smooth muscle of their own and cannot actively change their diameter, so they cannot actively regulate TPR.

## answer_c
Large Veins

## explanation_c
Incorrect. Large veins are capacitance vessels, holding a large proportion of blood volume with little pressure change, not the vessels that set overall peripheral resistance.

## answer_d
Arterioles

## explanation_d
Correct. Arterioles are the principal resistance vessels of the systemic circulation, and their small lumen combined with a well-developed smooth-muscle media lets them change vascular resistance far more than any other vessel type. Sympathetic constriction or dilation of arterioles, governed by Poiseuille's fourth-power radius relationship, is the main lever by which total peripheral resistance is raised or lowered, which is why arterioles, not the aorta, capillaries or veins, are described as the vessels mainly regulating TPR.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-CVS-EFDC2163E84213

## concept_ids
CON-CVS-EFDC2163E84213

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Resistance and Poiseuille's Law

## question_only_for

## library_ids
ART-104-HIS-ARTERIES-AND-VEINS

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that arterioles are the vessels mainly regulating total peripheral resistance.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSBLOOD-Q30

## title
ADH secretion trigger - osmolality

## question
What is the primary trigger for the secretion of Vasopressin (ADH) from the posterior pituitary?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Increased blood pressure

## explanation_a
Incorrect. Increased blood pressure is not the osmoreceptor-mediated trigger for ADH secretion; the primary trigger tested here is a change in plasma osmolality, sensed independently of pressure.

## answer_b
Decreased plasma osmolality

## explanation_b
Incorrect. Decreased plasma osmolality would reduce, not stimulate, osmoreceptor-driven ADH secretion, since a more dilute plasma is the opposite of the concentrating stimulus that triggers ADH release.

## answer_c
Increased plasma osmolality

## explanation_c
Correct. Osmoreceptors, specialised cells sensitive to changes in plasma osmolality via cell shrinkage or swelling as water moves osmotically, are located in the hypothalamus, concentrated around the organum vasculosum of the lamina terminalis and the supraoptic nucleus. From there, they drive both the sensation of thirst and the release of antidiuretic hormone from the posterior pituitary specifically when plasma osmolality rises, for example during dehydration, prompting the kidney to retain water and dilute the plasma back toward normal.

## answer_d
Increased blood volume

## explanation_d
Incorrect. Increased blood volume is sensed by low-pressure atrial volume receptors and tends to reduce, not increase, ADH secretion, the opposite of the osmolality-driven trigger this question tests.

## topic
Physiology

## subtopic
Blood Flow

## main_concept
CON-NEU-4F2FAFD0D5642F

## concept_ids
CON-NEU-4F2FAFD0D5642F

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Vasoactive Hormones

## question_only_for

## library_ids
ART-NEU-AU-MED-203-QUIZ1-PHYSIOLOGY

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that a rise in plasma osmolality, sensed by hypothalamic osmoreceptors, is the primary trigger for ADH secretion.

## source_citation
Physiology CVS201 Questions (Final), Blood Flow section, key p.9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes


---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q01

## title
Definition of arterial blood pressure

## question
What is the definition of arterial blood pressure?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
The pressure in the veins during diastole

## explanation_a
Incorrect. Venous pressure during diastole describes a different, low-pressure part of the circulation, not the definition of arterial blood pressure.

## answer_b
The lateral pressure of blood on the wall of arteries

## explanation_b
Correct. Arterial blood pressure is defined as the lateral pressure exerted by blood on the wall of the arteries. Systolic, diastolic and mean arterial pressure are distinct quantities describing different aspects of this lateral wall pressure across the cardiac cycle, but the underlying definition in every case is the force blood exerts sideways against the arterial wall. This lateral-pressure definition is what pressure-measuring devices such as a sphygmomanometer actually detect, via the vessel wall, rather than measuring blood pressure directly inside the lumen.

## answer_c
The maximum pressure reached in the aorta

## explanation_c
Incorrect. The maximum pressure reached in the aorta describes systolic pressure specifically, one component of arterial blood pressure, not the general definition of arterial blood pressure itself.

## answer_d
The average pressure throughout the cardiac cycle

## explanation_d
Incorrect. The average pressure throughout the cardiac cycle describes mean arterial pressure specifically, one derived quantity, not the general definition of what arterial blood pressure is.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-A0579343614BCD

## concept_ids
CON-CVS-A0579343614BCD

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Pressure Components and Determinants

## question_only_for

## library_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE

## resource_ids
src_165188e079f0f475e54d

## learning_objective
Define arterial blood pressure as the lateral pressure of blood on the arterial wall.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q02

## title
Normal systolic blood pressure range

## question
What is the normal range for systolic blood pressure?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
60-90 mmHg

## explanation_a
Incorrect. 60-90 mmHg is the normal diastolic pressure range, not systolic; the source paper prints this same figure for both options A and D, a duplication in the source rather than a genuine second distractor, but the printed key still points to option C.

## answer_b
30-50 mmHg

## explanation_b
Incorrect. 30-50 mmHg is far below the normal range for either systolic or diastolic arterial pressure and does not correspond to a recognised physiological value here.

## answer_c
90-150 mmHg

## explanation_c
Correct. Normal systolic blood pressure, the peak pressure reached in the arteries during ventricular ejection, falls in the range of roughly 90 to 150 mmHg. This range sits above the normal diastolic range (roughly 60-90 mmHg), and the difference between the two, the pulse pressure, is itself an important derived quantity in arterial pressure physiology.

## answer_d
60-90 mmHg

## explanation_d
Incorrect. 60-90 mmHg is the normal diastolic pressure range, not systolic; this option duplicates option A verbatim in the source paper, a printed inconsistency rather than a genuine distinct distractor.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-A0579343614BCD

## concept_ids
CON-CVS-A0579343614BCD

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Pressure Components and Determinants

## question_only_for

## library_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State the normal range for systolic blood pressure as roughly 90-150 mmHg.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Source prints identical text ("60-90 mmHg") for both options A and D, a duplication rather than a genuine fourth distractor; the printed key (C) stands per LANE-CARD.md rule 2, flagged here rather than silently corrected.

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q03

## title
Pulse pressure definition

## question
Pulse pressure is defined as:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Diastolic pressure + 1/3 systolic pressure

## explanation_a
Incorrect. "Diastolic pressure plus one-third systolic pressure" is not the formula for pulse pressure; a formula close to this shape (diastolic plus one-third pulse pressure) instead defines mean arterial pressure.

## answer_b
The average pressure in the arteries

## explanation_b
Incorrect. The average pressure in the arteries describes mean arterial pressure, a separate derived quantity from pulse pressure.

## answer_c
The difference between systolic and diastolic pressures

## explanation_c
Correct. Systolic, diastolic and mean arterial pressure are distinct quantities, and pulse pressure is defined as the difference between the systolic and diastolic pressures. Because pulse pressure widens when arterial compliance falls, for example as arteries stiffen with age or atherosclerosis, it is a useful clinical indicator of arterial elasticity, not merely an arithmetic curiosity.

## answer_d
The maximum pressure during ventricular ejection

## explanation_d
Incorrect. The maximum pressure during ventricular ejection describes systolic pressure alone, one of the two pressures pulse pressure is the difference between, not pulse pressure itself.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-A0579343614BCD

## concept_ids
CON-CVS-A0579343614BCD

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Pressure Components and Determinants

## question_only_for

## library_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE

## resource_ids
src_165188e079f0f475e54d

## learning_objective
Define pulse pressure as the difference between systolic and diastolic pressure.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q04

## title
Mean arterial pressure calculation

## question
How is mean systemic arterial pressure calculated?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Systolic pressure - Diastolic pressure

## explanation_a
Incorrect. Systolic minus diastolic pressure is the formula for pulse pressure, a different quantity from mean arterial pressure.

## answer_b
(Systolic pressure + Diastolic pressure) / 2

## explanation_b
Incorrect. The simple average of systolic and diastolic pressure is a common approximation but not the physiologically correct formula, since it does not account for diastole lasting longer than systole.

## answer_c
Diastolic pressure + 1/3 Pulse pressure

## explanation_c
Correct. Mean arterial pressure sits nearer diastolic pressure than the midpoint between systolic and diastolic, because diastole outlasts systole in the cardiac cycle, spending proportionally more time at the lower, diastolic pressure. This is captured by the formula diastolic pressure plus one-third of the pulse pressure, which weights the average toward diastole rather than splitting the difference evenly as a simple average would.

## answer_d
Systolic pressure + 1/2 Pulse pressure

## explanation_d
Incorrect. "Systolic pressure plus one-half pulse pressure" is not the standard formula for mean arterial pressure; it does not correctly weight the longer diastolic phase of the cardiac cycle.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-A0579343614BCD

## concept_ids
CON-CVS-A0579343614BCD

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Pressure Components and Determinants

## question_only_for

## library_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that mean arterial pressure is calculated as diastolic pressure plus one-third of pulse pressure, because diastole outlasts systole.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q06

## title
Nerves carrying baroreceptor impulses

## question
Which of the following carries the impulses from the arterial baroreceptors?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Aortic nerve

## explanation_a
Incorrect (this is a genuine route, but not the complete answer). The aortic nerve carries impulses from the aortic-arch baroreceptors, but it is not the only nerve involved.

## answer_b
Carotid sinus nerve

## explanation_b
Incorrect (this is a genuine route, but not the complete answer). The carotid sinus (Hering's) nerve carries impulses from the carotid-sinus baroreceptors, but it is not the only nerve involved.

## answer_c
A & B

## explanation_c
Correct. Arterial baroreceptors are stretch receptors in the carotid sinus and the aortic arch, reporting to the nucleus of the tractus solitarius through both the carotid sinus (Hering's) nerve and the aortic nerve. Because baroreceptors sit at two distinct anatomical sites, the carotid sinus and the aortic arch, both afferent pathways are needed to carry the full baroreceptor signal centrally, which is why the complete answer requires naming both nerves together rather than either alone.

## answer_d
None of the above

## explanation_d
Incorrect. Both the aortic nerve and the carotid sinus nerve do carry baroreceptor impulses, so "none of the above" is incorrect.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-C3E60AC7A9EDB1

## concept_ids
CON-CVS-C3E60AC7A9EDB1

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Baroreceptor Reflex

## question_only_for

## library_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
Name both the aortic nerve and the carotid sinus nerve as the afferent pathways carrying arterial baroreceptor impulses.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q13

## title
Formula for arterial blood pressure

## question
The formula for Arterial Blood Pressure is:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Stroke Volume × Heart Rate

## explanation_a
Incorrect. Stroke volume multiplied by heart rate gives cardiac output, one component of the arterial-pressure formula, not arterial blood pressure itself.

## answer_b
Cardiac Output × Total Peripheral Resistance

## explanation_b
Correct. Blood flow equals the pressure gradient divided by resistance, and applied to the whole systemic circulation this same relationship, rearranged, gives arterial blood pressure as cardiac output multiplied by total peripheral resistance. Cardiac output is itself the product of stroke volume and heart rate, so this formula ties arterial pressure directly to how much blood the heart pumps per minute and how much resistance the arterioles offer to that flow, the two variables the rest of this section's questions explore individually.

## answer_c
Mean Arterial Pressure × Heart Rate

## explanation_c
Incorrect. Mean arterial pressure multiplied by heart rate is not a recognised formula for arterial blood pressure; mean arterial pressure is itself one of the pressure quantities being defined, not a multiplier of heart rate.

## answer_d
Pulse Pressure × Stroke Volume

## explanation_d
Incorrect. Pulse pressure multiplied by stroke volume is not the standard formula for arterial blood pressure; pulse pressure and stroke volume are related but this particular product is not the recognised relationship.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-FA5FB57963DDF7

## concept_ids
CON-CVS-FA5FB57963DDF7

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Pressure Components and Determinants

## question_only_for

## library_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that arterial blood pressure equals cardiac output multiplied by total peripheral resistance.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q14

## title
Effect of increased stroke volume

## question
An increase in stroke volume primarily increases:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Diastolic pressure

## explanation_a
Incorrect. Diastolic pressure is set mainly by peripheral resistance and the rate of runoff between beats, not primarily by the volume ejected in a single beat.

## answer_b
Heart rate

## explanation_b
Incorrect. Stroke volume and heart rate are two separate determinants of cardiac output; an increase in stroke volume does not itself define or primarily increase heart rate.

## answer_c
Systolic pressure and pulse pressure

## explanation_c
Correct. A larger stroke volume ejects more blood into the arterial tree during systole, raising the peak (systolic) pressure reached; because diastolic pressure is comparatively unaffected, the gap between systolic and diastolic pressure, the pulse pressure, widens as well. This is why an increased stroke volume is taught as primarily raising both systolic pressure and pulse pressure together, rather than diastolic pressure or peripheral resistance.

## answer_d
Peripheral resistance

## explanation_d
Incorrect. Peripheral resistance is determined mainly by arteriolar tone, an independent variable from how much blood is ejected per beat, not something stroke volume itself primarily increases.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-A0579343614BCD

## concept_ids
CON-CVS-A0579343614BCD

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Pressure Components and Determinants

## question_only_for

## library_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that an increase in stroke volume primarily raises systolic pressure and pulse pressure.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q15

## title
Effect of increased heart rate

## question
An increase in heart rate will:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Increase diastolic pressure and decrease pulse pressure

## explanation_a
Correct. A faster heart rate shortens diastole (the filling and run-off period) proportionally more than it shortens systole, leaving less time between beats for arterial pressure to fall before the next ejection. This raises diastolic pressure, and because diastolic pressure rises while systolic pressure changes comparatively little, the difference between them, the pulse pressure, narrows rather than widens. This time-dependent effect on diastole is distinct from stroke volume's effect, which instead acts mainly on systolic pressure and pulse pressure.

## answer_b
Decrease diastolic pressure and increase pulse pressure

## explanation_b
Incorrect. Increased heart rate raises, rather than decreases, diastolic pressure by shortening the time available for pressure to fall between beats, and correspondingly narrows, rather than widens, pulse pressure.

## answer_c
Increase systolic pressure only

## explanation_c
Incorrect. Increased heart rate's principal effect is on diastolic pressure and pulse pressure via shortened diastole, not an isolated rise in systolic pressure alone.

## answer_d
Decrease systolic pressure only

## explanation_d
Incorrect. Increased heart rate does not primarily decrease systolic pressure; its characteristic effect is to raise diastolic pressure and narrow pulse pressure.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-A0579343614BCD

## concept_ids
CON-CVS-A0579343614BCD

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Pressure Components and Determinants

## question_only_for

## library_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that an increase in heart rate raises diastolic pressure and narrows pulse pressure by shortening diastole.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q16

## title
Effect of increased peripheral resistance

## question
Increased peripheral resistance elevates which pressure the most?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Systolic Pressure

## explanation_a
Incorrect. Systolic pressure is raised somewhat by increased peripheral resistance, but it is not the pressure component this specific effect elevates the most.

## answer_b
Pulse Pressure

## explanation_b
Incorrect. Pulse pressure is set mainly by stroke volume and arterial compliance, not primarily by peripheral resistance; increased resistance tends to raise both systolic and diastolic pressure together rather than widening the gap between them.

## answer_c
Mean Arterial Pressure

## explanation_c
Incorrect. Mean arterial pressure does rise overall with increased peripheral resistance, but as a composite of systolic and diastolic pressure, it is not itself the single pressure component elevated the most.

## answer_d
Diastolic Pressure

## explanation_d
Correct. Because arterioles are the principal resistance vessels, raising total peripheral resistance impedes the runoff of blood from the arteries into the capillary bed during diastole, so pressure falls less between beats and diastolic pressure rises accordingly, more than systolic pressure does. This is why increased peripheral resistance is taught as elevating diastolic pressure most among the individual pressure components, distinguishing its effect from stroke volume's effect on systolic pressure and pulse pressure.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-A0579343614BCD

## concept_ids
CON-CVS-A0579343614BCD

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Pressure Components and Determinants

## question_only_for

## library_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that increased peripheral resistance elevates diastolic pressure the most among the individual pressure components.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q17

## title
Atherosclerosis and arterial elasticity

## question
In atherosclerosis, decreased arterial elasticity leads to:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Decreased systolic and increased diastolic pressure

## explanation_a
Incorrect. Reduced arterial elasticity raises, rather than lowers, systolic pressure, and lowers, rather than raises, diastolic pressure, the opposite of this option's direction.

## answer_b
Increased systolic and decreased diastolic pressure

## explanation_b
Correct. Pulse pressure widens when arterial compliance falls, and atherosclerosis is a classic cause of reduced arterial compliance (decreased elasticity) from stiffened, less distensible arterial walls. A stiffer arterial tree cannot buffer the ejected stroke volume as effectively, so systolic pressure rises higher than normal, while the stiff walls also recoil less well during diastole, letting diastolic pressure fall lower than normal; the combined effect is a widened pulse pressure with systolic pressure up and diastolic pressure down.

## answer_c
Decreased pulse pressure

## explanation_c
Incorrect. Reduced arterial compliance widens, rather than decreases, pulse pressure, since systolic pressure rises and diastolic pressure falls together.

## answer_d
No change in pressures

## explanation_d
Incorrect. Reduced arterial elasticity does produce a clear, characteristic change in pressures, a widened pulse pressure with systolic up and diastolic down, not an absence of change.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-A0579343614BCD

## concept_ids
CON-CVS-A0579343614BCD

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Pressure Components and Determinants

## question_only_for

## library_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that reduced arterial compliance, as in atherosclerosis, raises systolic pressure and lowers diastolic pressure, widening pulse pressure.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q18

## title
Rapid mechanism of blood pressure regulation

## question
Which of the following is the rapid mechanism for regulating arterial blood pressure?

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Renal Mechanism

## explanation_a
Incorrect. The renal mechanism, which controls extracellular fluid volume via sodium and water excretion, acts over hours to days and is the most important long-term, not rapid, regulator of arterial pressure.

## answer_b
Capillary Fluid Shift

## explanation_b
Incorrect. The capillary fluid shift mechanism buffers pressure changes over minutes, an intermediate timescale, not the fastest, second-to-second mechanism.

## answer_c
Nervous Regulation

## explanation_c
Correct. Nervous regulation, via the baroreceptor and chemoreceptor reflexes, is the rapid, second-to-second mechanism for regulating arterial blood pressure: baroreceptor discharge rises and falls with arterial pressure and, through the nucleus of the tractus solitarius, opposes whichever change caused it almost instantly. This is in contrast to angiotensin II and the renin-angiotensin system, which act over an intermediate-to-long timescale of minutes to days, making the nervous reflexes specifically the mechanism this question's "rapid" framing is pointing to.

## answer_d
Endocrine Mechanism

## explanation_d
Incorrect. Endocrine mechanisms, such as the renin-angiotensin system, act over an intermediate-to-long timescale of minutes to days, not the rapid, second-to-second timescale of the nervous reflexes.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-F7ACE802080250

## concept_ids
CON-CVS-F7ACE802080250

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Renin-Angiotensin System

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that nervous (baroreceptor/chemoreceptor) regulation is the rapid mechanism of arterial blood pressure control, contrasted with the slower renal and endocrine mechanisms.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q21

## title
Location of arterial baroreceptors

## question
The arterial baroreceptors are located in the:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Left ventricle and right atrium

## explanation_a
Incorrect. The left ventricle houses the ventricular mechano/chemoreceptors of the Bezold-Jarisch reflex, and the right atrium houses the low-pressure volume receptors; neither is the site of the arterial baroreceptors.

## answer_b
Aortic arch and carotid sinus

## explanation_b
Correct. Arterial baroreceptors are stretch receptors located specifically in the carotid sinus and the aortic arch, reporting to the nucleus of the tractus solitarius through the carotid sinus (Hering's) nerve and the aortic nerve. Their placement at these two high-pressure arterial sites, rather than in low-pressure venous or atrial locations, is exactly what makes them sensitive detectors of arterial, rather than venous or atrial, pressure changes.

## answer_c
Pulmonary veins and vena cava

## explanation_c
Incorrect. The pulmonary veins and vena cava are low-pressure venous structures, not the sites of the arterial (high-pressure) baroreceptors.

## answer_d
Coronary arteries and cerebral vessels

## explanation_d
Incorrect. Coronary arteries and cerebral vessels are not the classic sites of the arterial baroreceptor reflex, which is specifically located in the carotid sinus and aortic arch.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-C3E60AC7A9EDB1

## concept_ids
CON-CVS-C3E60AC7A9EDB1

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Baroreceptor Reflex

## question_only_for

## library_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
Name the aortic arch and carotid sinus as the locations of the arterial baroreceptors.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q22

## title
Baroreceptor stimulus

## question
Baroreceptors are stimulated by:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Low oxygen levels in the blood

## explanation_a
Incorrect. Low oxygen levels stimulate the peripheral chemoreceptors, not the baroreceptors, which are purely mechanoreceptors rather than chemical sensors.

## answer_b
Stretching of the arterial wall

## explanation_b
Correct. Arterial baroreceptors are stretch receptors, and their discharge rises and falls directly with arterial pressure because a rise in pressure stretches the vessel wall at the carotid sinus and aortic arch where the receptors sit. This mechanical stretch is the direct stimulus that increases baroreceptor firing, which the nucleus of the tractus solitarius then uses to oppose whichever pressure change caused it, distinguishing baroreceptors sharply from the chemically-sensitive peripheral chemoreceptors.

## answer_c
High carbon dioxide levels

## explanation_c
Incorrect. High carbon dioxide levels are a stimulus for the chemoreceptors (both peripheral and central), not for the purely mechanical baroreceptors.

## answer_d
Changes in blood pH

## explanation_d
Incorrect. Changes in blood pH are a chemoreceptor stimulus, not a baroreceptor one; baroreceptors respond to mechanical stretch, not chemical composition.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-C3E60AC7A9EDB1

## concept_ids
CON-CVS-C3E60AC7A9EDB1

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Baroreceptor Reflex

## question_only_for

## library_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that stretching of the arterial wall is the mechanical stimulus for baroreceptor activation.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q23

## title
Baroreceptor reflex response to raised pressure

## question
When arterial blood pressure increases, the baroreceptor reflex causes:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Vasoconstriction and increased heart rate

## explanation_a
Incorrect. Vasoconstriction and increased heart rate would raise, not oppose, an already-elevated pressure, the opposite of what the baroreceptor reflex does when pressure rises.

## answer_b
Vasodilation and decreased heart rate

## explanation_b
Correct. When arterial pressure rises, baroreceptor discharge increases, and through the nucleus of the tractus solitarius this inhibits the vasomotor area more strongly, so sympathetic drive to the heart and vessels falls, giving a lower heart rate, stroke volume and cardiac output together with vasodilatation; the cardiac inhibitory area is also excited more, raising vagal tone and slowing the heart further. This combination, vasodilation and decreased heart rate, is exactly the corrective, pressure-lowering response the reflex produces when it detects a rise in pressure.

## answer_c
Increased cardiac output

## explanation_c
Incorrect. The baroreceptor reflex reduces, rather than increases, cardiac output when pressure rises, since heart rate and stroke volume both fall as sympathetic drive is withdrawn.

## answer_d
Increased peripheral resistance

## explanation_d
Incorrect. The baroreceptor reflex reduces, rather than increases, peripheral resistance when pressure rises, producing vasodilation via reduced sympathetic vasoconstrictor tone.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-C3E60AC7A9EDB1

## concept_ids
CON-CVS-C3E60AC7A9EDB1

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Baroreceptor Reflex

## question_only_for

## library_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that the baroreceptor reflex responds to a rise in arterial pressure with vasodilation and decreased heart rate.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q24

## title
Carotid sinus syndrome and fainting

## question
Carotid Sinus Syndrome can lead to fainting because:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
It causes a severe headache.

## explanation_a
Incorrect. A severe headache is not the mechanism by which carotid sinus syndrome produces fainting; the mechanism is haemodynamic, via the baroreceptor reflex, not a pain-related process.

## answer_b
Pressure on the sinus causes a marked reflex drop in blood pressure.

## explanation_b
Correct. Carotid sinus syndrome is an acquired hypersensitivity of the carotid sinus baroreceptors, so mild external pressure, such as a tight collar or the pressure of shaving, that would be trivial in a normal person instead activates the baroreceptor reflex strongly enough to produce marked bradycardia and a fall in arterial pressure. This exaggerated reflex drop in blood pressure can cause cerebral ischaemia and fainting, and severe or recurrent cases may need denervation of the hypersensitive carotid sinus or a permanent pacemaker to manage it.

## answer_c
It increases heart rate excessively.

## explanation_c
Incorrect. Carotid sinus syndrome causes bradycardia, a marked decrease rather than an excessive increase in heart rate, as part of its exaggerated baroreceptor reflex.

## answer_d
It blocks blood flow to the coronary arteries.

## explanation_d
Incorrect. Carotid sinus syndrome does not act by blocking coronary blood flow; its mechanism is an exaggerated baroreceptor reflex producing systemic bradycardia and hypotension, not localised coronary obstruction.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-A1E3D54120275D

## concept_ids
CON-CVS-A1E3D54120275D

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Baroreceptor Reflex

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that carotid sinus syndrome causes fainting via an exaggerated baroreceptor reflex producing a marked drop in blood pressure.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q25

## title
Peripheral chemoreceptor stimuli - the exception

## question
Peripheral chemoreceptors are stimulated by all of the following EXCEPT:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Decreased O₂ tension (hypoxia)

## explanation_a
Incorrect (this is a genuine stimulus). The peripheral chemoreceptor reflex, in the carotid and aortic bodies, is driven by low arterial oxygen tension, one of its established stimuli.

## answer_b
Increased CO₂ tension

## explanation_b
Incorrect (this is a genuine stimulus). A rise in carbon dioxide tension is also a recognised stimulus of the peripheral chemoreceptors, alongside their more dominant response to hypoxia.

## answer_c
High blood pressure

## explanation_c
Correct. The peripheral chemoreceptor reflex, in the carotid and aortic bodies, is driven by low arterial oxygen tension and raises sympathetic discharge to correct a markedly low arterial pressure. High blood pressure, by contrast, is sensed by the arterial baroreceptors, a mechanically-, not chemically-, sensitive system, so it is not a stimulus of the chemically-sensitive peripheral chemoreceptors, making it the exception among the four options.

## answer_d
Increased H⁺ concentration

## explanation_d
Incorrect (this is a genuine stimulus). Increased hydrogen ion concentration (acidosis) is also a recognised stimulus of the peripheral chemoreceptors, alongside hypoxia and hypercapnia.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-131F06D46D3B84

## concept_ids
CON-CVS-131F06D46D3B84

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Chemoreceptor Reflex

## question_only_for

## library_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that high blood pressure, a baroreceptor rather than chemoreceptor stimulus, is not among the peripheral chemoreceptors' own stimuli.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q31

## title
Cushing reflex characterisation

## question
The Cushing's reflex is characterized by:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Hypotension and tachycardia

## explanation_a
Incorrect. Hypotension and tachycardia describe a very different picture, closer to a compensatory sympathetic response to blood loss, not the Cushing reflex.

## answer_b
Hypertension and bradycardia

## explanation_b
Correct. The Cushing reflex, raised arterial pressure with bradycardia, is triggered by raised intracranial pressure compressing the cerebral vessels and making the vasomotor area ischaemic. The resulting local ischaemia of the vasomotor centre drives an intense sympathetic pressor response, raising arterial pressure sharply (hypertension) in an attempt to restore cerebral perfusion, while a secondary baroreceptor-mediated reflex bradycardia develops in response to that very high pressure, giving the classic hypertension-with-bradycardia pairing.

## answer_c
Hypotension and bradycardia

## explanation_c
Incorrect. Hypotension and bradycardia describe the opposite pressure direction from the Cushing reflex, which is characterised by hypertension, not hypotension.

## answer_d
Hypertension and tachycardia

## explanation_d
Incorrect. Hypertension and tachycardia is not the Cushing reflex's characteristic pairing; the reflex specifically produces bradycardia, not tachycardia, alongside its hypertension.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-BBAEB2E1A51102

## concept_ids
CON-CVS-BBAEB2E1A51102

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Cushing Reflex

## question_only_for

## library_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that the Cushing reflex is characterised by hypertension with bradycardia, triggered by raised intracranial pressure.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q35

## title
Renin secretion triggers - the exception

## question
Renin secretion is increased by all of the following EXCEPT:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Hypovolemia and hypotension

## explanation_a
Incorrect (this is a genuine trigger). Renin secretion rises with hypovolaemia and hypotension, one of its established triggers.

## answer_b
Renal ischemia

## explanation_b
Incorrect (this is a genuine trigger). Renal ischaemia, such as from renal artery stenosis, is also a recognised trigger of renin secretion.

## answer_c
Increased Na⁺ delivery to the distal tubule

## explanation_c
Correct. Renin secretion rises with hypovolaemia and hypotension, renal ischaemia, decreased, not increased, sodium delivery to the distal tubule, and sympathetic stimulation via beta1 receptors, but it is suppressed, not raised, by hypertension through the same feedback logic in reverse. Because it is decreased distal sodium delivery, sensed by the macula densa, that signals reduced renal perfusion and raises renin, an increase in distal sodium delivery instead signals adequate perfusion and lowers renin secretion, making this the exception among the four options.

## answer_d
Sympathetic stimulation

## explanation_d
Incorrect (this is a genuine trigger). Sympathetic stimulation, acting via beta1 receptors on the juxtaglomerular apparatus, is also a recognised trigger of renin secretion.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-F7ACE802080250

## concept_ids
CON-CVS-F7ACE802080250

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Renin-Angiotensin System

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that decreased, not increased, sodium delivery to the distal tubule is the trigger that raises renin secretion.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes

---

# Item

## id
QST-MUSTCVS201-PHYSABP-Q36

## title
ACE and angiotensin conversion

## question
Angiotensin I is converted to Angiotensin II primarily by:

## subject
cvs

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Renin in the liver

## explanation_a
Incorrect. Renin is secreted by the kidney's juxtaglomerular apparatus, not produced in the liver, and it acts on angiotensinogen to form angiotensin I, a step before the conversion this question asks about.

## answer_b
Angiotensinogen in the blood

## explanation_b
Incorrect. Angiotensinogen is the hepatic precursor protein that renin acts on to form angiotensin I; it is not itself the enzyme that converts angiotensin I to angiotensin II.

## answer_c
ACE in the lung endothelium

## explanation_c
Correct. Renin from the juxtaglomerular apparatus cleaves hepatic angiotensinogen to angiotensin I, which angiotensin-converting enzyme (ACE), found in vascular endothelial cells especially of the lung, then converts to the octapeptide angiotensin II. The lung's enormous pulmonary capillary endothelial surface area, through which essentially the entire cardiac output passes, makes it the primary site of this conversion step.

## answer_d
Aldosterone in the adrenal cortex

## explanation_d
Incorrect. Aldosterone is secreted by the adrenal cortex in response to angiotensin II, a downstream effect of the conversion, not the enzyme that performs the conversion itself.

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## main_concept
CON-CVS-F7ACE802080250

## concept_ids
CON-CVS-F7ACE802080250

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MUST_Y2=moderate

## years
MUST_Y2

## universities
must

## module
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Renin-Angiotensin System

## question_only_for

## library_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL

## resource_ids
src_165188e079f0f475e54d

## learning_objective
State that ACE in the lung's vascular endothelium primarily converts angiotensin I to angiotensin II.

## source_citation
Physiology CVS201 Questions (Final), Arterial Blood Pressure section, key p.20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
