<!--
  AU-MED-106 Physiology · Blood pressure / pulse / heart-sound auscultation / arrhythmia-definition cluster — authored from the AU-MED-106 physiology practical bank (Mohammed Mostafa, src_2fc652b90b34c2b804be plain / src_208b4c27ce9ba9d8cc26 answer-key twin) and, where corroborated, the Telegram addendum bank (Practical CVS Qs Bank, ASM Minds, sourceId pending). GUARD=bank, no EOM/EOY paper exists for AU-MED-106 — see coverage/AU-MED-106-physiology-triage.md.

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-AUMED106PHYS-BP-BP-Q01

## title
Mean arterial pressure formula

## question
Which formula is used to estimate mean arterial pressure (MAP) from a patient's systolic (SBP) and diastolic (DBP) blood pressure?

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
MAP = DBP + 1/3 (pulse pressure)

## explanation_a
Correct. Because diastole occupies roughly two-thirds of the cardiac cycle at rest, mean arterial pressure is weighted toward the diastolic value rather than a simple midpoint: MAP is estimated as diastolic pressure plus one-third of the pulse pressure (SBP minus DBP). This worked arithmetic is exactly what this bank's own MAP-calculation item tests.

## answer_b
MAP = SBP - 1/3 (pulse pressure)

## explanation_b
Incorrect. Subtracting one-third of the pulse pressure from systolic pressure is mathematically different from the correct diastole-weighted formula, and does not correctly account for the fact that diastole occupies the larger share of the cardiac cycle.

## answer_c
MAP = (SBP + DBP) / 2

## explanation_c
Incorrect. A simple average of systolic and diastolic pressure treats the two phases as occupying equal time, but diastole in fact lasts roughly twice as long as systole at a normal resting heart rate, so a straight average underestimates how much time is actually spent near the diastolic value.

## answer_d
MAP = SBP + DBP

## explanation_d
Incorrect. Simply adding systolic and diastolic pressure together produces a value roughly double the true mean arterial pressure and has no physiological basis as an estimate of the time-averaged pressure across the cardiac cycle.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-AEBDDFAB03B5DF

## concept_ids
CON-CVS-AEBDDFAB03B5DF

## contextual_concept_ids

## difficulty
Moderate

## question_type
Calculation

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
State and apply the diastole-weighted formula for mean arterial pressure.

## source_citation
AU-MED-106 Physiology practical bank, p.2

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: bank p2 worked calculation, corroborated Telegram Spot 1
au: AU-MED-106 Physiology practical bank, p.2; corroborated Practical CVS Qs Bank, ASM Minds, Spot 1

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q02

## title
No Korotkoff sounds above systolic pressure

## question
During auscultatory blood pressure measurement, Korotkoff sounds are first heard as cuff pressure falls to a level equal to:

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
Incorrect. No Korotkoff sound is heard yet at diastolic pressure on the way down from a fully inflated cuff — diastolic pressure is instead marked by the muffling and eventual disappearance of the sounds, near the end of the sequence, not their first appearance.

## answer_b
Mean arterial pressure

## explanation_b
Incorrect. Mean arterial pressure sits between systolic and diastolic pressure and is not the point at which sound first appears; Korotkoff sounds are already audible well before cuff pressure reaches this intermediate value on the way down.

## answer_c
Systolic pressure

## explanation_c
Correct. As long as cuff pressure exceeds arterial systolic pressure, the brachial artery stays fully occluded throughout the cardiac cycle and no blood flows past the cuff, so no sound is generated. Once cuff pressure falls to systolic pressure, blood first begins to spurt through with each systole, producing the first audible Korotkoff sound — the basis for reading systolic pressure at this point.

## answer_d
Pulse pressure

## explanation_d
Incorrect. Pulse pressure (systolic minus diastolic) is a derived difference, not a pressure level the cuff passes through during deflation, so it is not the point at which sounds begin.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-BE94FBA0B205EF

## concept_ids
CON-CVS-BE94FBA0B205EF

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Explain why Korotkoff sounds first appear at cuff pressure equal to systolic pressure.

## source_citation
AU-MED-106 Physiology practical bank, p.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: standard physiology, HIT-LIVE concept
au: AU-MED-106 Physiology practical bank (Korotkoff-phase cluster, p.13)

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q03

## title
ECG finding in atrial fibrillation

## question
Which ECG finding is characteristic of atrial fibrillation?

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
Regular P waves with a normal PR interval

## explanation_a
Incorrect. Regular P waves with a normal PR interval describe normal sinus rhythm, not atrial fibrillation; atrial fibrillation is defined precisely by the loss of organised, discrete atrial depolarisation that a normal P wave represents.

## answer_b
Absence of discrete P waves, replaced by fine fibrillatory waves

## explanation_b
Correct. In atrial fibrillation, the atria depolarise chaotically from multiple ectopic foci rather than in an organised wave from the sinoatrial node, so no discrete P wave forms. Instead, the baseline shows fine, irregular fibrillatory waves, and the ventricular response is irregularly irregular because the AV node conducts an unpredictable subset of the chaotic atrial impulses.

## answer_c
Absent QRS complexes throughout

## explanation_c
Incorrect. QRS complexes are still present in atrial fibrillation (the ventricles still depolarise and contract, just irregularly) — it is the atrial signal, not the ventricular QRS, that loses its organised waveform.

## answer_d
Progressive PR-interval lengthening before a dropped beat

## explanation_d
Incorrect. Progressive PR-interval lengthening before a dropped beat describes Mobitz type I (Wenckebach) second-degree AV block, a completely different rhythm disturbance from atrial fibrillation.

## topic
Cardiovascular physiology

## subtopic
Cardiac arrhythmias

## main_concept
CON-CVS-236CE7171C7289

## concept_ids
CON-CVS-236CE7171C7289

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
State the characteristic ECG finding of atrial fibrillation and explain its mechanism.

## source_citation
AU-MED-106 Physiology practical bank, p.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: Telegram bank printed key, Spot 32; HIT-LIVE concept
au: Practical CVS Qs Bank, ASM Minds (Telegram addendum), Spot 32

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q04

## title
First heart sound characteristics

## question
The first heart sound (S1) is best described as:

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
A low-pitched sound of 10-15 Hz caused by semilunar valve closure

## explanation_a
Incorrect. A frequency of 10-15 Hz is too low for S1, and semilunar (aortic/pulmonary) valve closure produces the second heart sound (S2), not S1, so both the pitch and the valve attributed here are wrong.

## answer_b
A high-pitched sound of 25-40 Hz caused by AV-valve closure

## explanation_b
Correct. S1 marks the start of systole and is caused by closure of the atrioventricular (mitral and tricuspid) valves as ventricular pressure exceeds atrial pressure. It is a relatively high-pitched sound, in the 25-40 Hz range, produced by the abrupt tensing of the closed valve leaflets and surrounding structures.

## answer_c
A murmurish sound heard only in valvular disease

## explanation_c
Incorrect. S1 is a normal heart sound present in every cardiac cycle, not a murmur, and not confined to disease states; a murmur is a distinct, separate finding caused by turbulent flow, typically superimposed on or between the normal heart sounds.

## answer_d
A direct indicator of blood pressure

## explanation_d
Incorrect. S1 reflects valve-closure timing and mechanics, not arterial blood pressure; blood pressure is assessed separately by sphygmomanometry, not by the pitch or character of the first heart sound.

## topic
Cardiovascular physiology

## subtopic
Heart sounds

## main_concept
CON-CVS-4D948B2E8F452D

## concept_ids
CON-CVS-4D948B2E8F452D

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Describe the pitch and mechanism of the first heart sound.

## source_citation
AU-MED-106 Physiology practical bank, p.10

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: highlight-recovered key D (option lettering), triage p10
au: AU-MED-106 Physiology practical bank, p.10

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q05

## title
Physiological S3 by age

## question
A third heart sound (S3) heard in an otherwise healthy 20-year-old is best interpreted as:

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
Always pathological, signalling heart failure

## explanation_a
Incorrect. An S3 is not automatically pathological — its significance depends heavily on the patient's age. In a young, healthy adult it is a common, benign finding related to rapid early diastolic ventricular filling, not a marker of disease.

## answer_b
A normal physiological finding at this age

## explanation_b
Correct. A physiological third heart sound is a normal finding in children and young adults, generated by the sudden deceleration of blood flow into a compliant, rapidly-filling ventricle during early diastole. The same sound in an older adult, whose ventricle is typically less compliant, instead usually signals heart failure — the interpretation of S3 depends on the patient's age.

## answer_c
A sign of mitral stenosis

## explanation_c
Incorrect. Mitral stenosis produces its own characteristic findings (an opening snap and a diastolic rumble), not S3; S3's significance is tied to age and ventricular filling dynamics, not specifically to mitral valve narrowing.

## answer_d
Equivalent in significance to an S4 at any age

## explanation_d
Incorrect. S3 and S4 are not equivalent in significance at any age — a physiological S3 is normal in the young, but S4 (caused by atrial contraction against a stiff, non-compliant ventricle) is never a normal finding at any age, reflecting a fundamentally different, always-abnormal mechanism.

## topic
Cardiovascular physiology

## subtopic
Heart sounds

## main_concept
CON-CVS-540567F60DB8B8

## concept_ids
CON-CVS-540567F60DB8B8

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
3

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
State that a physiological S3 is normal in children/young adults but pathological (heart failure) in an older adult, and that S4 is never normal.

## source_citation
AU-MED-106 Physiology practical bank, p.18

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: highlight-recovered keys p10/p18, corroborated Telegram Spot 29
au: AU-MED-106 Physiology practical bank, p.10/p.18; corroborated Practical CVS Qs Bank, ASM Minds, Spot 29

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q06

## title
Cardiac auscultation area at the apex

## question
Which cardiac auscultation area is found at the apex of the heart?

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
Tricuspid area

## explanation_a
Incorrect. The tricuspid area is at the left lower sternal border, not the apex; it is named for where the tricuspid valve's sound transmits best, a different location from where the mitral valve's sound is loudest.

## answer_b
Pulmonary area

## explanation_b
Incorrect. The pulmonary area is at the left 2nd intercostal space, near the upper sternal border, well away from the apex where this question asks about.

## answer_c
Aortic area

## explanation_c
Incorrect. The aortic area is at the right 2nd intercostal space, on the opposite side of the sternum from the pulmonary area and, like it, distant from the cardiac apex.

## answer_d
Mitral area

## explanation_d
Correct. The mitral area, where the mitral valve's sound transmits best, is located at the cardiac apex (typically the 5th left intercostal space, mid-clavicular line). The four standard auscultation areas are named for where each valve's sound is best heard by transmission through the chest wall, not for the valve's own anatomical position.

## topic
Cardiovascular physiology

## subtopic
Heart sounds

## main_concept
CON-CVS-C92CFC2CFFEF02

## concept_ids
CON-CVS-C92CFC2CFFEF02

## contextual_concept_ids

## difficulty
Easy

## question_type
Definition

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Name the four cardiac auscultation areas and their surface landmarks.

## source_citation
AU-MED-106 Physiology practical bank, p.10

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: standard fact, unkeyed by diff; triage p10
au: AU-MED-106 Physiology practical bank, p.10

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q07

## title
Korotkoff sound character through cuff deflation

## question
As cuff pressure falls through the Korotkoff phases during auscultatory blood-pressure measurement, the sound character progresses from first tapping through to:

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
Immediate silence

## explanation_a
Incorrect. The Korotkoff sounds pass through several recognisable phases before silence, not an immediate jump from the first sound to no sound at all; the intervening phases carry the information used to read both systolic and diastolic pressure.

## answer_b
Soft murmurish, then loud banging, then abrupt muffling and silence

## explanation_b
Correct. Korotkoff sounds progress through a recognised sequence during cuff deflation: first tapping (marking systolic pressure), then softer/murmurish sounds, then louder/banging sounds, then an abrupt muffling, and finally silence (marking diastolic pressure). Each phase reflects the changing pattern of turbulent flow through the partially-occluded brachial artery as cuff pressure falls.

## answer_c
Continuous loud banging throughout deflation

## explanation_c
Incorrect. The sound does not stay continuously loud throughout deflation — it characteristically muffles and then disappears entirely as cuff pressure approaches and then falls below diastolic pressure, which is exactly how diastolic pressure is identified by ear.

## answer_d
A single sustained tone that never changes

## explanation_d
Incorrect. A single unchanging tone would give the examiner no way to distinguish systolic from diastolic pressure; the whole point of the recognised phase sequence is that the sound's character changes in a reproducible pattern as cuff pressure falls.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-20A1EC258BFF30

## concept_ids
CON-CVS-20A1EC258BFF30

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Describe the sequence of Korotkoff sound-character changes during cuff deflation.

## source_citation
AU-MED-106 Physiology practical bank, p.13

## attached_image

## attachments

## media_recommendations
### diagram · Principle
Purpose: This item asks the student to identify Korotkoff sound character at a specific point on a cuff-pressure/time deflation graph; no such labelled graph exists in the pagetext cache.
Priority: strongly helpful
Status: needed
Section: Principle
Source direction: openly licensed cardiovascular examination atlas
Rights: must be CC-BY or public domain

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: diagram-dependent, unkeyed by diff (zero corruption); triage p13
au: AU-MED-106 Physiology practical bank, p.13

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q08

## title
Correct ABP measurement technique

## question
Which of the following is NOT true when measuring auscultatory blood pressure (ABP)?

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
The measuring device is kept at the same level as the heart

## explanation_a
This IS true, so it is not the answer being asked for. Keeping the device at heart level avoids a hydrostatic pressure offset; a device positioned above or below heart level introduces a systematic measurement error, so this is a correct and necessary part of proper technique.

## answer_b
The stethoscope diaphragm is placed under the cuff edge

## explanation_b
This IS true, so it is not the answer being asked for. Placing the stethoscope diaphragm under the cuff edge, over the brachial artery, is the standard position for detecting Korotkoff sounds as the cuff deflates, and is correct standard technique.

## answer_c
A preceding palpatory estimate is done purely to reduce the patient's discomfort

## explanation_c
Correct — this statement is NOT true, making it the answer. The palpatory pre-estimate (inflating while palpating the radial pulse until it disappears, then reinflating further above that point) exists to set the correct starting cuff pressure and avoid missing the auscultatory gap — a real silent interval that can cause systolic pressure to be underestimated — not primarily to reduce the patient's pain. Framing it as a comfort measure mischaracterises its actual physiological purpose.

## answer_d
The cuff is positioned about 2.5 cm proximal to the cubital fossa

## explanation_d
This IS true, so it is not the answer being asked for. Positioning the cuff bladder centred over the brachial artery roughly 2.5 cm proximal to the cubital fossa is standard technique, giving the stethoscope clear access to the artery just below the cuff's lower edge.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-90D5088E39154B

## concept_ids
CON-CVS-90D5088E39154B

## contextual_concept_ids

## difficulty
Hard

## question_type
Mechanism

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Identify correct auscultatory BP technique and explain the true purpose of the palpatory pre-estimate.

## source_citation
AU-MED-106 Physiology practical bank, p.2

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: bank p2, unkeyed by diff; flawed distractor reasoning flagged in concept record
au: AU-MED-106 Physiology practical bank, p.2

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q09

## title
Pulse pressure determinants

## question
Pulse pressure increases in all of the following EXCEPT:

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
After a meal

## explanation_a
This DOES increase pulse pressure, so it is not the exception being asked for. Eating a meal raises cardiac output (through increased splanchnic blood flow and metabolic demand), which raises systolic pressure more than diastolic, widening pulse pressure.

## answer_b
During endurance exercise

## explanation_b
This DOES increase pulse pressure, so it is not the exception being asked for. Endurance exercise raises stroke volume and cardiac output substantially, driving systolic pressure up while diastolic pressure changes comparatively little (or even falls slightly), widening pulse pressure.

## answer_c
Old age

## explanation_c
This DOES increase pulse pressure, so it is not the exception being asked for. Advancing age stiffens the major arteries (reduced elastic recoil), which raises systolic pressure while diastolic pressure tends to fall, widening pulse pressure — a well-recognised feature of arterial ageing.

## answer_d
Sleep

## explanation_d
Correct — sleep is the exception. During sleep, parasympathetic tone predominates and cardiac output and sympathetic vascular tone both fall, lowering blood pressure overall. This narrows, rather than widens, pulse pressure — the opposite direction from the other three conditions listed, which is exactly why the bank marks sleep as the exception to the rule.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-5F58332D8D4A0E

## concept_ids
CON-CVS-5F58332D8D4A0E

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Name the physiological determinants that raise or lower pulse pressure.

## source_citation
AU-MED-106 Physiology practical bank, p.2

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: standard physiology, unkeyed by diff; triage p2
au: AU-MED-106 Physiology practical bank, p.2

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q10

## title
Properties assessed on pulse examination

## question
Which of the following is NOT one of the standard properties assessed when examining the arterial pulse?

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
Rate

## explanation_a
This IS a standard pulse property, so it is not the answer being asked for. Pulse rate — the number of beats felt per minute — is a basic, routinely assessed component of pulse examination.

## answer_b
Rhythm

## explanation_b
This IS a standard pulse property, so it is not the answer being asked for. Rhythm (regular versus irregular) is assessed by feeling whether successive beats arrive at even intervals, and is essential for detecting arrhythmias such as atrial fibrillation.

## answer_c
Force (volume)

## explanation_c
This IS a standard pulse property, so it is not the answer being asked for. Force, or volume, describes how large the pulse wave feels under the examining finger and reflects stroke volume and arterial compliance.

## answer_d
Condition of the vein

## explanation_d
Correct. The arterial pulse is examined for rate, rhythm, force (volume), and the condition of the arterial wall — never the condition of the vein, which is not part of the arterial pulse examination at all. Confusing the arterial wall (a real, examined property) with 'the vein' is the specific distractor this bank tests.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-1D28CC9DC7E152

## concept_ids
CON-CVS-1D28CC9DC7E152

## contextual_concept_ids

## difficulty
Easy

## question_type
Definition

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Name the four standard properties assessed on pulse examination.

## source_citation
AU-MED-106 Physiology practical bank, p.14

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: standard fact, unkeyed by diff, corroborated Telegram bank; triage p14
au: AU-MED-106 Physiology practical bank, p.14

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q11

## title
Mercury sphygmomanometer components

## question
A mercury sphygmomanometer is made up of which combination of parts?

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
A cuff with an inflatable rubber bladder, a rubber inflation bulb, and a mercury column/reservoir

## explanation_a
Correct. A mercury sphygmomanometer consists of an inflatable cuff containing a rubber bladder (which compresses the brachial artery), a rubber inflation bulb with a release valve (to raise and slowly lower cuff pressure), and a mercury column and reservoir (the manometer itself, which reads the pressure). Together these components allow the examiner to control cuff pressure while reading its exact value.

## answer_b
A diaphragm, a bell, and tubing only

## explanation_b
Incorrect. A diaphragm, bell and tubing describe the stethoscope used alongside the sphygmomanometer to auscultate Korotkoff sounds, not the sphygmomanometer's own components — the two instruments are used together but are separate devices.

## answer_c
A digital pressure sensor and an LCD display

## explanation_c
Incorrect. A digital pressure sensor and LCD display describe an automated electronic (oscillometric) blood pressure device, not a mercury sphygmomanometer, which is a manual, mechanical instrument with no electronic components.

## answer_d
A cuff, a stethoscope head, and a mercury thermometer

## explanation_d
Incorrect. A mercury thermometer measures body temperature and has no role in blood pressure measurement; combining it with a cuff and stethoscope head does not correctly describe a sphygmomanometer's actual parts.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-67BE6BC3977828

## concept_ids
CON-CVS-67BE6BC3977828

## contextual_concept_ids

## difficulty
Easy

## question_type
Definition

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Name the components of a mercury sphygmomanometer.

## source_citation
AU-MED-106 Physiology practical bank, p.14

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: highlight-recovered key C (related item p14); triage p14/p16
au: AU-MED-106 Physiology practical bank, p.14

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q12

## title
The auscultatory gap

## question
Regarding the auscultatory gap during blood pressure measurement, which statement is correct?

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
It occurs during Korotkoff phase I

## explanation_a
Incorrect. The auscultatory gap is a silent interval that occurs within Korotkoff phase II (after sounds have already begun), not phase I, which is the initial appearance of sound at true systolic pressure.

## answer_b
It can be detected by the auscultatory method alone, without palpation

## explanation_b
Incorrect. The auscultatory gap can be MISSED by the auscultatory method alone, because the examiner may mistake the point where sounds resume after the gap for the true systolic pressure — that is exactly why a preceding palpatory estimate is needed, not because auscultation alone reliably detects the gap.

## answer_c
It is more likely to occur in aortic-valve disease or stiff arteries

## explanation_c
Correct. The auscultatory gap is a real, patient-specific silent interval during cuff deflation, and it is more likely to occur in patients with a stiff aorta or aortic-valve disease. A palpatory pre-estimate is used specifically to avoid mistaking the point sound resumes (after the gap) for true systolic pressure, which would otherwise cause systolic pressure to be underestimated.

## answer_d
It produces an unusually loud sound

## explanation_d
Incorrect. The auscultatory gap is, by definition, a period of silence — the temporary absence of sound — not an unusually loud sound; loudness changes belong to the Korotkoff-phase sequence, a separate feature from the gap itself.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-6A836071F085B7

## concept_ids
CON-CVS-6A836071F085B7

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Describe the auscultatory gap, when it is more likely to occur, and why a palpatory pre-estimate avoids being misled by it.

## source_citation
AU-MED-106 Physiology practical bank, p.14

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: standard fact, unkeyed by diff; triage p14
au: AU-MED-106 Physiology practical bank, p.14

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q13

## title
Normal paediatric systolic blood pressure

## question
The normal systolic blood pressure range in children is approximately:

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
90-140 mmHg

## explanation_a
Incorrect. 90-140 mmHg is closer to the normal adult systolic blood pressure range (as this same bank states elsewhere, p19), not the paediatric range, which sits lower to reflect children's smaller body size and lower baseline vascular resistance.

## answer_b
80-130 mmHg

## explanation_b
Incorrect. 80-130 mmHg is not the value this bank's recovered answer key marks; it overlaps partly with the correct range but extends both too low and too high relative to the marked normal paediatric range.

## answer_c
70-110 mmHg

## explanation_c
Incorrect. 70-110 mmHg understates the normal paediatric range at both ends compared to the bank's recovered key, though it correctly reflects the general principle that children's normal systolic pressure sits below the adult range.

## answer_d
90-120 mmHg

## explanation_d
Correct. This bank's answer key gives the normal paediatric systolic blood pressure range as approximately 90-120 mmHg. This is lower than the adult range the same bank states elsewhere (90-140 mmHg), consistent with children's smaller body size and vasculature. The two ranges corroborate each other internally, since a lower paediatric ceiling below the adult range is exactly what growth-related increases in stroke volume and vascular tone would predict.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-2B3F0AE97D6E19

## concept_ids
CON-CVS-2B3F0AE97D6E19

## contextual_concept_ids

## difficulty
Easy

## question_type
Fact recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
State the normal systolic blood pressure range in children.

## source_citation
AU-MED-106 Physiology practical bank, p.14

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: highlight-recovered key D, corroborated by same bank's p19 adult range; triage p14
au: AU-MED-106 Physiology practical bank, p.14

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q14

## title
Why diastolic pressure matters for organ perfusion

## question
Diastolic pressure is considered more physiologically important than systolic pressure for organ perfusion mainly because:

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
It has a numerically smaller value

## explanation_a
Incorrect. Diastolic pressure being numerically smaller than systolic is simply a description of its value, not a physiological reason it matters more for organ perfusion; a smaller number has no inherent physiological significance on its own.

## answer_b
It reflects the nutritional/perfusion state of organs across most of the cardiac cycle

## explanation_b
Correct. Diastole occupies roughly two-thirds of the cardiac cycle, and virtually all coronary blood flow occurs during diastole, so adequate diastolic pressure sustains organ (and especially myocardial) perfusion through most of each heartbeat. This is why diastolic pressure, not just the peak systolic value, is a critical determinant of how well tissues are nourished with blood.

## answer_c
It cannot be measured by the palpatory method

## explanation_c
Incorrect. While it is true that the palpatory method (feeling for the return of a pulse) more reliably detects systolic than diastolic pressure, this is a limitation of a measurement technique, not the physiological reason diastolic pressure matters for organ perfusion.

## answer_d
It results from elastic recoil of the aorta

## explanation_d
Incorrect. Elastic recoil of the aorta helps sustain diastolic pressure and forward flow between heartbeats (the Windkessel effect), but this describes the mechanism generating diastolic pressure, not the reason diastolic pressure itself matters more than systolic for perfusing organs across the cycle.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-4D7D094B95D274

## concept_ids
CON-CVS-4D7D094B95D274

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Explain why diastolic pressure is physiologically important for organ perfusion.

## source_citation
AU-MED-106 Physiology practical bank, p.14

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: standard fact, unkeyed by diff; triage p14
au: AU-MED-106 Physiology practical bank, p.14

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q15

## title
Blood flow velocity across vessel types

## question
Blood flow velocity is fastest in which vessel, and why?

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
Capillaries, because of their large total cross-sectional area

## explanation_a
Incorrect. Capillaries are individually tiny, but their enormous number gives them the LARGEST total cross-sectional area of any vessel type in the circulation, which is exactly why flow velocity is SLOWEST, not fastest, there — velocity is inversely proportional to total cross-sectional area for a given total flow.

## answer_b
Aorta, because of its small total cross-sectional area relative to total flow

## explanation_b
Correct. For a given total blood flow (cardiac output), velocity at any level of the circulation is inversely proportional to the total cross-sectional area of all vessels at that level. The aorta is a single large vessel with the smallest total cross-sectional area of the systemic circulation, so blood must move through it fastest — this bank's recovered key gives a value of 1 m/sec, though it does not specify which single vessel that figure refers to.

## answer_c
Veins, because of low resistance

## explanation_c
Incorrect. Veins have a large combined cross-sectional area (larger than arteries, since venous capacity is substantially greater), and low resistance on its own does not determine velocity — cross-sectional area relative to flow does, so this reasoning does not correctly identify the fastest vessel.

## answer_d
Arterioles, because of high resistance

## explanation_d
Incorrect. Arterioles are the principal site of vascular resistance, but resistance itself is not what determines flow velocity; it is the total cross-sectional area at that level of the branching vascular tree, which is considerably larger for the combined arteriolar bed than for the single aorta.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-5F39EB05ECFB9B

## concept_ids
CON-CVS-5F39EB05ECFB9B

## contextual_concept_ids

## difficulty
Hard

## question_type
Mechanism

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Explain why blood flow velocity is inversely proportional to total vascular cross-sectional area, and state that the aorta has the fastest velocity.

## source_citation
AU-MED-106 Physiology practical bank, p.14

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: highlight-recovered key D (value 1m/sec), vessel unspecified in extracted stem; triage p14
au: AU-MED-106 Physiology practical bank, p.14

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q16

## title
Definition of hypertension

## question
Which of the following best defines hypertension?

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
A transient rise in blood pressure during exercise

## explanation_a
Incorrect. A transient, exercise-related rise in blood pressure is a normal physiological response that resolves with rest; hypertension specifically describes a persistent, not transient, elevation present outside of such physiological triggers.

## answer_b
Arterial blood pressure persistently elevated above the normal range for the individual

## explanation_b
Correct. Hypertension is defined as arterial blood pressure that is persistently elevated above the normal range for an individual, rather than a one-off or situational reading. When a specific cause is identified (secondary hypertension), this bank names endocrine disease and kidney disease as the two categories of cause it tests.

## answer_c
A drop in blood pressure on standing

## explanation_c
Incorrect. A drop in blood pressure on standing describes orthostatic (postural) hypotension, the opposite condition — low, not high, blood pressure triggered by a change in posture.

## answer_d
Blood pressure that fluctuates only with meals

## explanation_d
Incorrect. Blood pressure does fluctuate somewhat around meals (among other normal physiological variations), but hypertension is not defined by this pattern of fluctuation; it is defined by a sustained elevation above the normal range.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-F4BBA78E076D30

## concept_ids
CON-CVS-F4BBA78E076D30

## contextual_concept_ids

## difficulty
Easy

## question_type
Definition

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Define hypertension and name two categories of secondary cause.

## source_citation
AU-MED-106 Physiology practical bank, p.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: Telegram bank printed key, Spot 42
au: Practical CVS Qs Bank, ASM Minds (Telegram addendum), Spot 42

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q17

## title
Pulsus deficit

## question
Pulsus deficit refers to:

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
A palpated pulse rate higher than the auscultated heart rate

## explanation_a
Incorrect. A palpated rate exceeding the auscultated rate is not physiologically possible in this context and is not what pulsus deficit describes; the deficit runs in the opposite direction — the palpated count falls short of the true (auscultated) rate.

## answer_b
A palpated pulse rate lower than the auscultated heart rate, classically in atrial fibrillation

## explanation_b
Correct. Pulsus deficit is a palpated peripheral pulse rate that is lower than the heart rate heard on cardiac auscultation, classically occurring in atrial fibrillation. Some ventricular beats in atrial fibrillation follow so closely on the previous one that they generate too little stroke volume to produce a palpable pulse wave at the periphery, so the palpated count undercounts the true (auscultated) rate.

## answer_c
Complete absence of a palpable pulse

## explanation_c
Incorrect. Complete absence of a palpable pulse describes a different, more severe clinical situation (such as an occluded limb artery or cardiac arrest), not the partial undercounting that defines pulsus deficit.

## answer_d
A pulse that varies in strength with respiration

## explanation_d
Incorrect. A pulse varying in strength with respiration describes pulsus paradoxus, a distinct clinical sign (seen in cardiac tamponade, among other conditions) with a different mechanism from pulsus deficit.

## topic
Cardiovascular physiology

## subtopic
Blood pressure measurement

## main_concept
CON-CVS-BCFB8AF00C5053

## concept_ids
CON-CVS-BCFB8AF00C5053

## contextual_concept_ids

## difficulty
Moderate

## question_type
Definition

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Define pulsus deficit and explain its classic association with atrial fibrillation.

## source_citation
AU-MED-106 Physiology practical bank, p.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: Telegram bank printed key, Spot 26
au: Practical CVS Qs Bank, ASM Minds (Telegram addendum), Spot 26

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q18

## title
Defining bradycardia

## question
Bradycardia is best defined as:

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
Heart rate below 60 beats/min with a regular rhythm and every P wave followed by a QRS complex

## explanation_a
Correct. Bradycardia is diagnosed as a heart rate below 60 beats per minute occurring together with a regular rhythm in which each P wave is followed by a normal QRS complex. This combination describes a slow but otherwise organised and properly-conducted rhythm, distinguishing true bradycardia from a slow ventricular rate caused instead by a conduction block or another arrhythmia. This bank's own worked heart-rate example (300/6 = 50 beats/min) is explicitly read as bradycardia, matching this definition.

## answer_b
Any heart rate below 100 beats/min

## explanation_b
Incorrect. 100 beats/min is well above the standard 60 beats/min cutoff for bradycardia; using this threshold would misclassify a large range of entirely normal resting heart rates as bradycardic.

## answer_c
An irregular rhythm regardless of the rate

## explanation_c
Incorrect. An irregular rhythm describes an arrhythmia generally (such as atrial fibrillation), not bradycardia specifically, which by definition requires a regular, properly-conducted rhythm at a slow rate.

## answer_d
Heart rate below 60 beats/min with absent P waves

## explanation_d
Incorrect. Absent P waves would suggest an entirely different rhythm disturbance (such as atrial fibrillation or a junctional rhythm), not bradycardia, which specifically requires normal P waves each followed by a QRS complex, just at a slow rate.

## topic
Cardiovascular physiology

## subtopic
Cardiac arrhythmias

## main_concept
CON-CVS-F4A51007E715DD

## concept_ids
CON-CVS-F4A51007E715DD

## contextual_concept_ids

## difficulty
Moderate

## question_type
Definition

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
State the operational definition of bradycardia, distinguishing it from other causes of a slow or irregular rhythm.

## source_citation
AU-MED-106 Physiology practical bank, p.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: Telegram bank printed key, Spot 39, corroborated by this bank's own p24 and Spot 31 worked example
au: Practical CVS Qs Bank, ASM Minds (Telegram addendum), Spot 39

---

# Item

## id
QST-AUMED106PHYS-BP-BP-Q19

## title
Defining arrhythmia

## question
Arrhythmia is best defined as:

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
A permanently fixed heart rate

## explanation_a
Incorrect. A 'permanently fixed' heart rate is not a meaningful or accurate description of arrhythmia; a healthy heart rate naturally varies with activity, breathing and autonomic tone, and arrhythmia refers to abnormal disturbances of rate or rhythm, not fixation.

## answer_b
A disturbance in the rate or rhythm of the heartbeat

## explanation_b
Correct. Arrhythmia is defined as a disturbance in the rate or rhythm of the heartbeat — encompassing rates that are too fast (tachyarrhythmias), too slow (bradyarrhythmias), or irregular, and rhythms that originate or conduct abnormally. Patients may present with symptoms such as a felt pause between heartbeats or shortness of breath.

## answer_c
A murmur heard on auscultation

## explanation_c
Incorrect. A murmur is a sound caused by turbulent blood flow, typically from valvular disease, and is a distinct auscultatory finding from arrhythmia, which is an electrical rhythm disturbance, not a sound-generating flow abnormality.

## answer_d
A disorder of blood pressure regulation only

## explanation_d
Incorrect. Blood pressure regulation disorders (such as hypertension) are a separate category of cardiovascular disturbance from arrhythmia; arrhythmia specifically concerns the heart's electrical rate and rhythm, not the level of arterial pressure.

## topic
Cardiovascular physiology

## subtopic
Cardiac arrhythmias

## main_concept
CON-CVS-E40856B6F0BE8B

## concept_ids
CON-CVS-E40856B6F0BE8B

## contextual_concept_ids

## difficulty
Easy

## question_type
Definition

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

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
AU-MED-106 > Physiology > Blood pressure and heart sounds

## question_only_for

## library_ids
ART-CVS-BP-PULSE-AUSCULTATION

## resource_ids
src_2fc652b90b34c2b804be

## learning_objective
Define arrhythmia and name typical presenting symptoms.

## source_citation
AU-MED-106 Physiology practical bank, p.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: Telegram bank printed key, Spot 43
au: Practical CVS Qs Bank, ASM Minds (Telegram addendum), Spot 43
