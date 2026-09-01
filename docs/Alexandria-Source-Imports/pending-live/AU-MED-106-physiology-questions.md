<!--
  AU-MED-106 Physiology · pending-live — questions on the Telegram addendum bank's ventricular tachycardia / ventricular fibrillation spots (Practical CVS Qs Bank, ASM Minds, sourceId pending), whose main concepts (CON-CVS-AEC4F470747102, CON-CVS-4B1E9C05DA52C1) exist only in another lane's unimported batch (docs/import-ready/concept/SYS-CVS-CONCEPT-T05.md, docs/import-ready/article/SYS-CVS-ARTICLE-T05.md). Do not apply until those two files are live. Validate with: npm run medical:batch -- <this file> --with docs/import-ready/concept/SYS-CVS-CONCEPT-T05.md --with docs/import-ready/article/SYS-CVS-ARTICLE-T05.md

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-AUMED106PHYS-PENDING-ARR-PENDING-ARR-Q01

## title
Broad-complex tachycardia — default assumption

## question
A patient presents with a regular, broad-complex (wide QRS) tachycardia on ECG. Which is the safest default diagnosis to assume until proven otherwise?

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
Supraventricular tachycardia with aberrant conduction

## explanation_a
Incorrect. Supraventricular tachycardia with aberrant conduction can genuinely look identical to ventricular tachycardia on a broad-complex ECG, and distinguishing the two reliably can be difficult even for experienced readers. Because misdiagnosing a dangerous rhythm as a benign one carries far greater risk than the reverse, this is not the safe default assumption.

## answer_b
Ventricular tachycardia

## explanation_b
Correct. Ventricular tachycardia and supraventricular tachycardia with aberrant conduction both produce a regular broad-complex tachycardia, and they can be genuinely difficult to separate from the surface ECG alone. Because ventricular tachycardia is both far commoner in this presentation and far more immediately dangerous (it can degenerate into ventricular fibrillation and cardiac arrest), the safe default is to assume ventricular tachycardia until specific evidence proves otherwise.

## answer_c
Sinus tachycardia with a bundle branch block

## explanation_c
Incorrect. While sinus tachycardia with a pre-existing bundle branch block can also produce a wide-complex rapid rhythm, it is a less immediately dangerous explanation, and defaulting to it risks under-treating a genuinely life-threatening ventricular arrhythmia.

## answer_d
Atrial flutter with 1:1 conduction

## explanation_d
Incorrect. Atrial flutter with 1:1 AV conduction can produce a fast, though typically narrow-complex, rhythm; it is not the standard broad-complex differential this teaching point addresses, and assuming it here would similarly risk missing a true ventricular tachycardia.

## topic
Cardiovascular physiology

## subtopic
Cardiac arrhythmias

## main_concept
CON-CVS-AEC4F470747102

## concept_ids
CON-CVS-AEC4F470747102

## contextual_concept_ids

## difficulty
Hard

## question_type
Diagnosis

## cognitive_effort
High

## cognitive_effort_score
0.8

## setting
Academic

## reasoning_level
3

## inferred_difficulty
30

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=high

## years
AU_Y1

## universities
au

## module
AU-MED-106

## module_subject
AU-MED-106 > Physiology > Cardiac arrhythmias

## question_only_for

## library_ids
ART-CVS-VENTRICULAR-TACHYCARDIA | ART-CVS-VENTRICULAR-FIBRILLATION

## resource_ids

## learning_objective
State the safe-default rule for a broad-complex tachycardia (assume ventricular tachycardia until proven otherwise) and explain the risk asymmetry behind it.

## source_citation
Practical CVS Qs Bank, ASM Minds, AU-MED-106 Physiology, Spot 43.3

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: Telegram bank printed key, Spot 43.3
au: Practical CVS Qs Bank, ASM Minds (Telegram addendum), Spot 43.3

---

# Item

## id
QST-AUMED106PHYS-PENDING-ARR-PENDING-ARR-Q02

## title
Ventricular fibrillation — rate and output

## question
In ventricular fibrillation, the ventricular myocardium depolarises chaotically at a rate of roughly 350-500 beats/min from many sites at once. What is the resulting cardiac output?

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
Normal cardiac output, since the ventricles are still electrically active

## explanation_a
Incorrect. Electrical activity alone does not guarantee mechanical output; in ventricular fibrillation the depolarisation is chaotic and disorganised rather than a single coordinated wave, so it cannot trigger the synchronised contraction a normal cardiac output requires.

## answer_b
Reduced but still measurable cardiac output

## explanation_b
Incorrect. Even a severely reduced but still-measurable output would allow some tissue perfusion; ventricular fibrillation instead produces none at all, because no coordinated mechanical contraction occurs anywhere in the chaotically-depolarising ventricle.

## answer_c
No cardiac output — this is cardiac arrest

## explanation_c
Correct. In ventricular fibrillation the ventricular myocardium depolarises chaotically in many places at once (at the stated rate of roughly 350-500 beats/min), so no coordinated contraction occurs. There is no stroke volume and no pulse: ventricular fibrillation is cardiac arrest, not merely a rhythm to be monitored, and requires immediate defibrillation rather than observation.

## answer_d
Increased cardiac output from the very rapid rate

## explanation_d
Incorrect. A very rapid electrical rate does not translate into increased output when the underlying contraction is disorganised; without coordinated mechanical systole, rate alone cannot generate any forward stroke volume, let alone an increased one.

## topic
Cardiovascular physiology

## subtopic
Cardiac arrhythmias

## main_concept
CON-CVS-4B1E9C05DA52C1

## concept_ids
CON-CVS-4B1E9C05DA52C1

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

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
AU_Y1=high

## years
AU_Y1

## universities
au

## module
AU-MED-106

## module_subject
AU-MED-106 > Physiology > Cardiac arrhythmias

## question_only_for

## library_ids
ART-CVS-VENTRICULAR-TACHYCARDIA | ART-CVS-VENTRICULAR-FIBRILLATION

## resource_ids

## learning_objective
State that ventricular fibrillation produces no cardiac output and is cardiac arrest, not a monitorable rhythm.

## source_citation
Practical CVS Qs Bank, ASM Minds, AU-MED-106 Physiology, Spot 32.3

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: Telegram bank printed key, Spot 32.3
au: Practical CVS Qs Bank, ASM Minds (Telegram addendum), Spot 32.3
