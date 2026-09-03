<!--
  MU-MED101 (Foundation 1) lane-2 authored batch. Source: 'EOM Practice - Foundation 1 - Support 43 - With Answers.pdf' (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block (p13-22, Q1-38: acid-base physiology, solution chemistry, carbohydrate biochemistry, glycosaminoglycans/glycoproteins, amino acids and proteins). 37 authored, 1 held (q02, only 3 printed options). Key resolution: the source uses 'a-text'/'8.text' punctuation with no space after the letter/number, which breaks pagetext.mjs keys' regex (it requires a space after the '.'/'-'  delimiter) on p15 (q08-q13) and the p19/p20 boundary (q27, q28) -- confirmed not a colour gap by reading the PDF's own per-span colour data directly (same red 0xFF0000 mechanism the rest of the sub-block uses), cross-checked against pagetext.mjs keys' own auto-read items, which agree on every overlapping question. Zero page renders spent this round (five of the lane's 14-render budget remained unused going in; the tool gap here was a text-regex miss, not an unrecoverable colour, so no image was needed). Search-before-mint: find-existing.mjs plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files found four exact-fact reuses (see pending-live/MU-MED101-concepts-overlay.md): CON-REN-DFF352F789A971 (Ain Shams, diarrhoea/normal-anion-gap metabolic acidosis, q06), CON-FND-AEDF8CA500AD5A (Alexandria AU-MED-102, epimer/anomer/aldose-ketose isomerism, q18/q22/q29), CON-FND-F91310521FC982 (Kasr 103-BMS, glucogenic-vs-ketogenic amino-acid table, q36), CON-FND-7C8A02831B3243 (Kasr 102-INT, peptide-bond condensation mechanism, q37). 30 new concepts minted for the remaining 31 authored items (q10 and q12 share one concept, both testing molality). Apply after concept/MU-MED101-concepts-2.md, article/MU-MED101-articles.md, evidence/MU-MED101-{resources,claims,citations}.md, pending-live/MU-MED101-concepts-overlay.md and the four foreign concept files named above are live.

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-MUMED101-BIOPHYS-Q01

## title
Compensatory mechanism for a patient in metabolic alkalosis

## question
A patient has the following arterial blood gases: HCO3 38, pH 7.50, PaCO2 50. Which of the following signs may this patient exhibit as a compensatory mechanism?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Hyperventilation

## explanation_a
Incorrect. Hyperventilation blows off CO2 and would be the compensation for metabolic acidosis (a low pH), not for the raised pH and raised bicarbonate seen here.

## answer_b
Hypoventilation

## explanation_b
Correct. This gas pattern -- raised pH (7.50), raised HCO3 (38) and a raised PaCO2 (50) -- is metabolic alkalosis with respiratory compensation. The respiratory centre senses the alkalaemia and depresses ventilation, so the patient breathes more slowly and shallowly (hypoventilation) to retain CO2. Retained CO2 raises carbonic acid and therefore H+, pulling the pH back toward normal without correcting the underlying bicarbonate excess. This is the expected, appropriate compensatory response and is why the PaCO2 is elevated together with the HCO3 rather than being independently abnormal.

## answer_c
Increased potassium level (hyperkalemia)

## explanation_c
Incorrect. Metabolic alkalosis is more often associated with hypokalemia (H+ shifts out of cells in exchange for K+, and renal handling favours potassium loss), not hyperkalemia.

## answer_d
Constipation

## explanation_d
Incorrect. Constipation is not a recognised compensatory mechanism for any acid-base disturbance; it is not part of the respiratory or renal compensation systems.

## topic
Physiology

## subtopic
Acid-Base Physiology

## main_concept
CON-FND-9E4A791CF44E5C

## concept_ids
CON-FND-9E4A791CF44E5C

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-ACIDBASE-D4BF76CA

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Compensatory mechanism for a patient in metabolic alkalosis

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p13 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: red-text key, p13 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p13

---

# Item

## id
QST-MUMED101-BIOPHYS-Q03

## title
Normal bicarbonate to carbonic acid ratio in extracellular fluid

## question
Identify the correct ratio of bicarbonate to carbonic acid in the extracellular fluids under normal physiological conditions.

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
16: 1

## explanation_a
Incorrect. 16:1 is lower than the physiological bicarbonate-to-carbonic-acid ratio and would correspond to a lower, more acidotic pH than the normal extracellular value.

## answer_b
20: 1

## explanation_b
Correct. The Henderson-Hasselbalch relationship for the bicarbonate buffer, pH = 6.1 + log([HCO3-]/[H2CO3]), gives a normal extracellular pH of 7.4 only when the ratio of bicarbonate to carbonic acid is held at about 20:1 (typically around 24 mEq/L bicarbonate to about 1.2 mEq/L carbonic acid/dissolved CO2). This 20:1 ratio, not the absolute concentration of either component alone, is what the body's respiratory and renal systems act to preserve, because it is the ratio -- not either value in isolation -- that sets the pH.

## answer_c
24: 1

## explanation_c
Incorrect. 24:1 is higher than the accepted normal ratio; using it in the Henderson-Hasselbalch equation would predict an alkalotic pH above 7.4.

## answer_d
28: 1

## explanation_d
Incorrect. 28:1 overstates the normal ratio even further and would predict a pH well above the normal physiological range.

## topic
Physiology

## subtopic
Acid-Base Physiology

## main_concept
CON-FND-674670B271BEC1

## concept_ids
CON-FND-674670B271BEC1

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-ACIDBASE-D4BF76CA

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Normal bicarbonate to carbonic acid ratio in extracellular fluid

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p13 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key, p13 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p13

---

# Item

## id
QST-MUMED101-BIOPHYS-Q04

## title
False statement about respiratory regulation of acid-base balance

## question
The respiratory system regulates the acid-base balance by controlling the carbon dioxide concentration in the extracellular fluid. Which of the following statement are false to the respiratory regulations?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Increase in ventilation eliminates CO2 from the extracellular fluid and reduces H+ concentration

## explanation_a
Incorrect (not the false statement). This is true: more CO2 blown off means less carbonic acid formed, so H+ concentration falls -- exactly what increased ventilation does.

## answer_b
Increase in ventilation eliminates CO2 from the extracellular fluid and increases H+ concentration

## explanation_b
Correct -- this is the false statement. Increased ventilation eliminates CO2, which shifts the CO2 + H2O <-> H2CO3 <-> H+ + HCO3- equilibrium to the left, consuming H+ and carbonic acid rather than generating them. Saying that increased ventilation both eliminates CO2 and increases H+ concentration is self-contradictory, because removing the substrate (CO2) that forms carbonic acid necessarily lowers, not raises, free H+. This is the statement the question asks the student to identify as false among four otherwise-plausible options.

## answer_c
Decrease in ventilation increases CO2, thereby increasing hydrogen ion concentration in extracellular fluid

## explanation_c
Incorrect (not the false statement). This is true: reduced ventilation retains CO2, driving the equilibrium toward more carbonic acid and more H+, which is the mechanism of respiratory acidosis.

## answer_d
All of the above

## explanation_d
Incorrect. Since A and C are both true statements, 'all of the above' cannot be the single false statement being asked for.

## topic
Physiology

## subtopic
Acid-Base Physiology

## main_concept
CON-FND-368319E51D203E

## concept_ids
CON-FND-368319E51D203E

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-ACIDBASE-D4BF76CA

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
False statement about respiratory regulation of acid-base balance

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p13 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: red-text key, p13-14 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p13-14

---

# Item

## id
QST-MUMED101-BIOPHYS-Q05

## title
Renal contribution to acid-base balance

## question
The Kidney contributes to acid-base balance by:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Secretion of ammonia

## explanation_a
Incorrect. The kidney does secrete ammonia (as a buffer for secreted H+ in the tubular lumen), but the option being tested here as the kidney's acid-base contribution is bicarbonate reclamation, the dominant, quantitatively larger renal mechanism.

## answer_b
Reclamation of bicarbonate

## explanation_b
Correct. The proximal tubule reclaims (reabsorbs) essentially all of the filtered bicarbonate, chiefly via carbonic-anhydrase-driven H+ secretion into the lumen that converts filtered HCO3- to CO2 and water, which re-enters the cell and regenerates HCO3- to be returned to the blood. This reclamation prevents the loss of the body's main buffer base in the urine and, together with new bicarbonate generation (via ammoniagenesis and titratable acid excretion), is how the kidney maintains the extracellular bicarbonate store and complements the respiratory system's fast but limited CO2-based control.

## answer_c
Increased ketogenesis

## explanation_c
Incorrect. Ketogenesis is a hepatic metabolic pathway producing ketone bodies; it is not a renal acid-base regulatory mechanism, and increased ketogenesis (as in diabetic ketoacidosis) is a cause of acidosis rather than a compensation for it.

## answer_d
Decreased CO2 uptake

## explanation_d
Incorrect. The kidney does not regulate acid-base balance by controlling CO2 uptake; CO2 handling is chiefly a respiratory function, not a renal one.

## topic
Physiology

## subtopic
Acid-Base Physiology

## main_concept
CON-FND-36527431DD0232

## concept_ids
CON-FND-36527431DD0232

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-ACIDBASE-D4BF76CA

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Renal contribution to acid-base balance

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p14 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key, p14 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p14

---

# Item

## id
QST-MUMED101-BIOPHYS-Q06

## title
Diagnosis in a child with severe diarrhoea, low pH, low PaCO2, low bicarbonate and a normal anion gap

## question
A 10-year-old body develops severe diarrhea while traveling to India. The laboratory investigation revealed the following results: Arterial blood pH = 7.25, Partial Pressure of carbon dioxide = 24 mmHg, Bicarbonate = 10 mEq/L, Normal anion gap. The correct diagnosis of this patient is...........................................?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
metabolic acidosis

## explanation_a
Correct. Diarrhoea causes hyperchloremic (normal anion gap) metabolic acidosis through gastrointestinal loss of bicarbonate-rich fluid. This patient's low pH (7.25) confirms acidaemia, the low bicarbonate (10 mEq/L) identifies the primary problem as metabolic rather than respiratory, and the low PaCO2 (24 mmHg) is appropriate respiratory compensation (hyperventilation blowing off CO2 to partially correct the pH), not a primary respiratory disturbance. The normal anion gap fits the mechanism exactly: bicarbonate is lost directly in the stool and replaced by chloride, so the anion gap stays normal, unlike the high-anion-gap acidosis seen with unmeasured acids such as ketones or lactate.

## answer_b
metabolic alkalosis

## explanation_b
Incorrect. Metabolic alkalosis would show a raised pH and raised bicarbonate, the opposite of what is measured here.

## answer_c
respiratory acidosis

## explanation_c
Incorrect. Respiratory acidosis would show a raised PaCO2 as the primary abnormality with a low pH; here the PaCO2 is low, consistent with compensation rather than the primary problem.

## answer_d
respiratory alkalosis

## explanation_d
Incorrect. Respiratory alkalosis would show a raised pH with a low PaCO2 as the primary disturbance; here the pH is low (acidaemia), which rules out any primary alkalosis.

## topic
Physiology

## subtopic
Acid-Base Physiology

## main_concept
CON-REN-DFF352F789A971

## concept_ids
CON-REN-DFF352F789A971

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-ACIDBASE-D4BF76CA

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Diagnosis in a child with severe diarrhoea, low pH, low PaCO2, low bicarbonate and a normal anion gap

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p14 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: red-text key, p14 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p14
reuse: CON-REN-DFF352F789A971 (Ain Shams docs/Ain-Shams-Source-Imports/concept/ASU-UG-assessment-1-mcq-concepts.md) already teaches this exact fact ('Diarrhea causes hyperchloremic (normal anion gap) metabolic acidosis through gastrointestinal bicarbonate loss'); sparse overlay, no new mint. Taught here via this lane's own article ART-MU101-ACIDBASE-D4BF76CA rather than the Ain Shams article, to keep this lane's simulate chain to one extra dependency file per reused concept, matching lane-1's precedent.

---

# Item

## id
QST-MUMED101-BIOPHYS-Q07

## title
Respiratory compensation for metabolic acidosis

## question
To compensate for metabolic acidosis, the body will

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
excrete more bicarbonate ions

## explanation_a
Incorrect. Excreting more bicarbonate would worsen, not compensate for, a metabolic acidosis, since bicarbonate is the buffer base already depleted in this disturbance.

## answer_b
increase respiration rate

## explanation_b
Correct. The rapid, minutes-scale compensation for metabolic acidosis is respiratory: chemoreceptors sense the falling pH and rising H+, and the respiratory centre increases the rate and depth of ventilation (Kussmaul-type breathing in severe cases) to blow off extra CO2. Lowering PaCO2 shifts the CO2 + H2O <-> H2CO3 <-> H+ + HCO3- equilibrium to the left, reducing H+ concentration and partially normalising the pH even though the underlying bicarbonate deficit is not yet corrected. This respiratory response is faster than the renal compensation (which instead generates new bicarbonate over hours to days) and is the first line of defence against a falling pH.

## answer_c
decrease respiration rate

## explanation_c
Incorrect. Decreasing respiration would retain CO2 and worsen the acidosis; it is the compensation for metabolic alkalosis, not acidosis.

## answer_d
excrete more monohydrogen phosphate ions

## explanation_d
Incorrect. Increased renal excretion of titratable acid (including monohydrogen phosphate) is part of the slower renal response to acidosis, but it is a mechanism for generating new bicarbonate, not for excreting bicarbonate or phosphate as the compensatory step being asked about here; the fast, defining compensation is the respiratory one.

## topic
Physiology

## subtopic
Acid-Base Physiology

## main_concept
CON-FND-9574E00BC25339

## concept_ids
CON-FND-9574E00BC25339

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-ACIDBASE-D4BF76CA

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Respiratory compensation for metabolic acidosis

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p14 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key, p14 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p14

---

# Item

## id
QST-MUMED101-BIOPHYS-Q08

## title
First-line intervention for anxiety-induced respiratory alkalosis

## question
Ben has an anxiety attack. His ABGs results show he is in respiratory alkalosis. He has just had a car accident. What is your next nursing intervention?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Have him breathe into a paper bag

## explanation_a
Correct. Anxiety-triggered hyperventilation is the classic cause of acute respiratory alkalosis: rapid, deep breathing blows off CO2 faster than it is produced, lowering PaCO2 and raising pH. Having the patient rebreathe his own exhaled air from a paper bag increases the CO2 concentration of the inspired air, which raises PaCO2 back toward normal and corrects the alkalosis directly at its cause. This is the classic bedside intervention taught for anxiety-related hyperventilation once a more serious organic cause of the respiratory alkalosis has been excluded.

## answer_b
Give him O2

## explanation_b
Incorrect. Giving supplemental O2 does not address the problem, which is excessive CO2 elimination, not inadequate oxygenation; it does nothing to correct the alkalosis.

## answer_c
Check his temperature

## explanation_c
Incorrect. Checking his temperature does not address the acute respiratory alkalosis and is not the priority intervention for a patient who is actively hyperventilating.

## answer_d
Ask him if he is alright

## explanation_d
Incorrect. Simple reassurance alone, without a concrete physical intervention such as rebreathing, is unlikely to be enough to interrupt an established hyperventilation episode quickly.

## topic
Physiology

## subtopic
Acid-Base Physiology

## main_concept
CON-FND-57EA6E88793B03

## concept_ids
CON-FND-57EA6E88793B03

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-ACIDBASE-D4BF76CA

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
First-line intervention for anxiety-induced respiratory alkalosis

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p15 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key on stem/option, p15; pagetext.mjs keys reported this question unmarked because the source numbers it '8.Ben' with no space after the period, which its question-boundary regex requires -- resolved by reading the PDF's own per-span colour data directly (see coverage/MU-MED101-triage.md), not by rendering.
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p15

---

# Item

## id
QST-MUMED101-BIOPHYS-Q09

## title
Products of the bicarbonate buffering reaction

## question
In the bicarbonate buffering system, carbon dioxide and water join to form ___________, which dissociates into hydrogen and ________________.

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
bicarbonate, carbonic acid

## explanation_a
Incorrect. This reverses the order: CO2 and water first form carbonic acid, not bicarbonate directly.

## answer_b
bicarbonate, oxygen

## explanation_b
Incorrect. Oxygen plays no part in the bicarbonate buffer reaction; the products are carbonic acid and, on dissociation, hydrogen ion and bicarbonate.

## answer_c
bicarbonate, carbon dioxide

## explanation_c
Incorrect. The blank cannot be carbon dioxide, since carbon dioxide is a reactant of the first step, not a dissociation product of the second.

## answer_d
carbonic acid, bicarbonate

## explanation_d
Correct. The bicarbonate buffer reaction proceeds CO2 + H2O <-> H2CO3 <-> H+ + HCO3-, catalysed rapidly by carbonic anhydrase in red cells and renal tubular cells. Carbon dioxide and water first combine to form carbonic acid (H2CO3), which then dissociates into a hydrogen ion (H+) and bicarbonate (HCO3-). This two-step reaction is the basis of the body's most important extracellular buffer system, linking CO2 handling by the lungs to bicarbonate handling by the kidneys.

## answer_e
carbonic acid, carbon dioxide

## explanation_e
Incorrect. Carbon dioxide is the starting reactant, not the second dissociation product; carbonic acid dissociates into hydrogen ion and bicarbonate, not back into carbon dioxide directly at the tissue level being described.

## topic
Physiology

## subtopic
Acid-Base Physiology

## main_concept
CON-FND-2905C98769FD5A

## concept_ids
CON-FND-2905C98769FD5A

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-ACIDBASE-D4BF76CA

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Products of the bicarbonate buffering reaction

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p15 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key on stem/option, p15; pagetext.mjs keys reported this question unmarked because the source numbers it '9.In' with no space after the period -- resolved by reading the PDF's own per-span colour data directly, not by rendering.
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p15

---

# Item

## id
QST-MUMED101-BIOPHYS-Q10

## title
Definition of molality

## question
Molality (m) = moles of solute / _________________________.

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
kilogram of solvent

## explanation_a
Correct. Molality is defined as the number of moles of solute per kilogram of solvent (mol/kg), and it is this mass-based definition -- not a volume-based one -- that makes molality independent of temperature, since mass does not change with thermal expansion or contraction the way volume does. This is the key practical advantage of molality over molarity (moles per litre of solution) in precise physical-chemistry work such as freezing-point depression or boiling-point elevation calculations.

## answer_b
kiloliter of solvent

## explanation_b
Incorrect. A kiloliter is a volume unit; molality is defined by mass of solvent (kilograms), not volume, which is instead the basis of molarity/other concentration units.

## answer_c
kilometer of solvent

## explanation_c
Incorrect. A kilometer is a unit of length and has no role in any concentration definition.

## answer_d
ounces of solvent

## explanation_d
Incorrect. Ounces are neither the SI mass unit used in the standard molality definition nor a unit commonly used in this context; the standard definition uses kilograms of solvent.

## topic
Biochemistry

## subtopic
Solution Chemistry

## main_concept
CON-FND-A6366627A6860E

## concept_ids
CON-FND-A6366627A6860E

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-SOLNCHEM-49A71510

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Definition of molality

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p15 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
keySource: red-text key on stem/option, p15; pagetext.mjs keys reported this question unmarked because the source numbers it '10.Molality' with no space after the period -- resolved by reading the PDF's own per-span colour data directly, not by rendering.
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p15

---

# Item

## id
QST-MUMED101-BIOPHYS-Q11

## title
Molar mass of sodium hydroxide (NaOH)

## question
Molar mass of NaOH is ______________________

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
40 grams/mol

## explanation_a
Correct. Sodium hydroxide, NaOH, is made of one sodium atom (atomic mass approximately 23 g/mol), one oxygen atom (approximately 16 g/mol) and one hydrogen atom (approximately 1 g/mol). Summing these atomic masses gives 23 + 16 + 1 = 40 g/mol, which is the molar mass of NaOH. This straightforward summation of atomic masses from the periodic table is the standard method for calculating the molar mass of any simple ionic compound.

## answer_b
50 grams/mol

## explanation_b
Incorrect. 50 g/mol overstates the sum of sodium (23), oxygen (16) and hydrogen (1); it does not match the correct atomic-mass addition for NaOH.

## answer_c
45 grams/mol

## explanation_c
Incorrect. 45 g/mol is also higher than the correctly summed atomic masses of Na, O and H (23 + 16 + 1 = 40).

## answer_d
38 grams/mol

## explanation_d
Incorrect. 38 g/mol is lower than the correct sum; it does not match 23 (Na) + 16 (O) + 1 (H).

## topic
Biochemistry

## subtopic
Solution Chemistry

## main_concept
CON-FND-F08DE65A4D2FA4

## concept_ids
CON-FND-F08DE65A4D2FA4

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-SOLNCHEM-49A71510

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Molar mass of sodium hydroxide (NaOH)

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p15 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
keySource: red-text key on stem/option, p15-16; pagetext.mjs keys reported this question unmarked because the source numbers it '11.Molar' with no space after the period -- resolved by reading the PDF's own per-span colour data directly, not by rendering.
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p15-16

---

# Item

## id
QST-MUMED101-BIOPHYS-Q12

## title
Molality of a solution of NaOH in water (worked calculation)

## question
What is the molality of a solution made by dissolving 2 moles of NaOH in 400 grams of water?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
5 mol/kg. solvent

## explanation_a
Correct. Molality is moles of solute per kilogram of solvent. Here there are 2 moles of NaOH (the solute) dissolved in 400 grams of water (the solvent), and 400 grams equals 0.4 kilograms. Dividing 2 mol by 0.4 kg gives 5 mol/kg, so the molality of this solution is 5 mol/kg -- applying the same mass-based definition tested in the previous question to a concrete worked example.

## answer_b
4 mol/kg solvent

## explanation_b
Incorrect. 4 mol/kg does not follow from dividing 2 mol by 0.4 kg; it corresponds to a different (incorrect) arithmetic step.

## answer_c
3 mol/kg. solvent

## explanation_c
Incorrect. 3 mol/kg also does not match 2 mol / 0.4 kg = 5 mol/kg.

## answer_d
2.5 moles /kg solvent

## explanation_d
Incorrect. 2.5 mol/kg would follow from dividing 1 mol by 0.4 kg, or from treating the solvent mass as 800 g instead of the stated 400 g; it does not match the given numbers.

## topic
Biochemistry

## subtopic
Solution Chemistry

## main_concept
CON-FND-A6366627A6860E

## concept_ids
CON-FND-A6366627A6860E

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-SOLNCHEM-49A71510

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Molality of a solution of NaOH in water (worked calculation)

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p16 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key, p16 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p16
sharedConcept: Shares CON-FND-A6366627A6860E with q10 -- both test the single distinction of molality (definition, then a worked calculation applying it), not two different facts.

---

# Item

## id
QST-MUMED101-BIOPHYS-Q13

## title
Definition of normality

## question
It is defined as the number of mole equivalents per liter of solution.

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Mole Fraction

## explanation_a
Incorrect. Mole fraction is the ratio of the moles of one component to the total moles of all components in a mixture; it does not involve equivalents or a per-litre basis.

## answer_b
MOLALITY

## explanation_b
Incorrect. Molality is moles of solute per kilogram of solvent, not mole equivalents per litre of solution.

## answer_c
MOLARITY

## explanation_c
Incorrect. Molarity is moles of solute per litre of solution, but it counts moles of the whole solute species, not mole equivalents, which is the specific distinction being tested here.

## answer_d
NORMALITY

## explanation_d
Correct. Normality is defined as the number of gram-equivalents (mole equivalents) of solute per litre of solution. It differs from molarity because it accounts for the reactive capacity of the solute -- for example, one mole of a diprotic acid supplies two equivalents of H+, so its normality is twice its molarity. Normality is particularly used in acid-base and redox contexts where the number of reactive units, not just the number of molecules, determines the chemistry.

## topic
Biochemistry

## subtopic
Solution Chemistry

## main_concept
CON-FND-71E0F5AABC0F85

## concept_ids
CON-FND-71E0F5AABC0F85

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-SOLNCHEM-49A71510

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Definition of normality

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p16 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
keySource: red-text key, p16 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p16

---

# Item

## id
QST-MUMED101-BIOPHYS-Q14

## title
Composition of invert sugar

## question
Invert sugar consists of:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Glucose + glucose

## explanation_a
Incorrect. Glucose + glucose describes maltose (an alpha-1,4 linked disaccharide of two glucose units), not invert sugar.

## answer_b
Glucose + fructose

## explanation_b
Correct. Invert sugar is the equimolar mixture of glucose and fructose produced by the hydrolysis of sucrose. It is called 'invert' because the optical rotation of the mixture is opposite in sign to that of the original sucrose (sucrose is dextrorotatory, while the glucose-fructose mixture is levorotatory, dominated by fructose's strong negative rotation). Invert sugar is sweeter than sucrose and does not crystallise as readily, which is why it is used commercially in confectionery and preserves.

## answer_c
Glucose + galactose

## explanation_c
Incorrect. Glucose + galactose describes lactose, the disaccharide found in milk, not invert sugar.

## answer_d
Glucose + mannose

## explanation_d
Incorrect. Glucose + mannose is not a standard named disaccharide relevant here and is not the composition of invert sugar.

## answer_e
Glucose + ribose

## explanation_e
Incorrect. Glucose + ribose is not a recognised disaccharide pairing in this context and does not describe invert sugar.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-7B94977469CE26

## concept_ids
CON-FND-7B94977469CE26

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Composition of invert sugar

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p16 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key, p16 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p16

---

# Item

## id
QST-MUMED101-BIOPHYS-Q15

## title
Repeating disaccharide unit of hyaluronic acid

## question
Repeating units of hyaluronic acid are:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
N-acetyl glucosamine and D-glucuronic acid

## explanation_a
Correct. Hyaluronic acid is a glycosaminoglycan built from a repeating disaccharide unit of N-acetylglucosamine and D-glucuronic acid, linked together and repeated many times to form a very long, unbranched, unsulfated polysaccharide chain. Unlike the other glycosaminoglycans, hyaluronic acid is not sulfated and is not found covalently attached to a core protein as a proteoglycan; it is a free polysaccharide that binds huge amounts of water, giving synovial fluid, vitreous humour and the extracellular matrix their viscosity and cushioning properties.

## answer_b
N-acetyl galactosamine and D-glucuronic acid

## explanation_b
Incorrect. N-acetylgalactosamine paired with D-glucuronic acid is the repeating unit of chondroitin sulfate and dermatan sulfate, not hyaluronic acid, which uses N-acetylglucosamine.

## answer_c
N-acetyl glucosamine and galactose

## explanation_c
Incorrect. Galactose alone (not as glucuronic acid) paired with N-acetylglucosamine does not describe the hyaluronic acid repeat unit.

## answer_d
N-acetyl galactosamine and L-iduronic acid

## explanation_d
Incorrect. N-acetylgalactosamine with L-iduronic acid is the repeating unit of dermatan sulfate, not hyaluronic acid.

## answer_e
N-acetyl glucosamine and iduronic acid

## explanation_e
Incorrect. Iduronic acid (rather than D-glucuronic acid) paired with N-acetylglucosamine is not the hyaluronic acid repeat; iduronic acid features in heparin and dermatan sulfate instead.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-41A66DE2892493

## concept_ids
CON-FND-41A66DE2892493

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Repeating disaccharide unit of hyaluronic acid

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p16 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key, p16 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p16

---

# Item

## id
QST-MUMED101-BIOPHYS-Q16

## title
Identifying the aldose sugar

## question
The aldose sugar is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Glyceraldehyde

## explanation_a
Correct. Glyceraldehyde is the simplest possible aldose, a three-carbon sugar carrying an aldehyde group on carbon 1. It is the reference compound used to define the D and L configurations for all other monosaccharides, since its single chiral centre (carbon 2) is compared against every larger sugar's highest-numbered chiral carbon. All of the other listed sugars carry a ketone group instead and are therefore ketoses, not aldoses.

## answer_b
Ribulose

## explanation_b
Incorrect. Ribulose is a five-carbon ketose (a ketopentose), not an aldose.

## answer_c
Erythrulose

## explanation_c
Incorrect. Erythrulose is a four-carbon ketose (a ketotetrose), not an aldose.

## answer_d
Dihydoxyacetone

## explanation_d
Incorrect. Dihydroxyacetone is a three-carbon ketose (the simplest possible ketose, with no chiral centre), not an aldose.

## answer_e
Fructose

## explanation_e
Incorrect. Fructose is a six-carbon ketose (a ketohexose), the best-known example of a sugar with a ketone rather than an aldehyde group.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-9754E4BE532753

## concept_ids
CON-FND-9754E4BE532753

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Identifying the aldose sugar

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p17 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
keySource: red-text key, p17 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p17

---

# Item

## id
QST-MUMED101-BIOPHYS-Q17

## title
Glycosidic linkage joining galactose and glucose in lactose

## question
Lactose is formed from galactose and glucose united by:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
α-1-4-glucosidic linkage

## explanation_a
Incorrect. An alpha-1,4-glucosidic linkage is the bond of maltose (glucose-glucose), not lactose, and lactose's bond is beta, not alpha.

## answer_b
β-1-4-galactosidic linkage

## explanation_b
Correct. Lactose, the principal sugar of milk, is a disaccharide of galactose and glucose joined by a beta-1,4-galactosidic (glycosidic) bond: the anomeric carbon of beta-D-galactose links to carbon 4 of D-glucose. This beta linkage is why lactose requires the specific enzyme lactase (beta-galactosidase) for hydrolysis in the small intestine, and why deficiency of that enzyme (lactose intolerance) leaves the disaccharide undigested and osmotically active in the gut.

## answer_c
β-1-6-glucosidic linkage

## explanation_c
Incorrect. A beta-1,6-glucosidic linkage is not the lactose bond; 1,6 linkages are seen in branch points of glycogen and amylopectin, not in lactose.

## answer_d
α-1-6-glucosidic linkage

## explanation_d
Incorrect. An alpha-1,6-glucosidic linkage describes glycogen/amylopectin branch points, not the bond in lactose, and lactose's linkage is beta, not alpha.

## answer_e
α-1-4-galactosidic linkage

## explanation_e
Incorrect. An alpha-1,4-galactosidic linkage is not correct either in configuration (lactose's bond is beta) or overall description.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-B79A436C6533E1

## concept_ids
CON-FND-B79A436C6533E1

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Glycosidic linkage joining galactose and glucose in lactose

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p17 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key, p17 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p17

---

# Item

## id
QST-MUMED101-BIOPHYS-Q18

## title
Term for sugars differing only in configuration around carbon 2

## question
Two sugars which differ from one another only in configuration around the second carbon atom are termed

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Epimers

## explanation_a
Correct. Monosaccharides that share the same molecular formula can differ from each other at exactly one specified carbon that is not the anomeric carbon; such a pair is called epimers. Glucose and galactose, for instance, are epimers at carbon 4, while glucose and mannose are epimers at carbon 2 -- the exact scenario described here.

## answer_b
Anomers

## explanation_b
Incorrect. Anomers differ only at the anomeric carbon (carbon 1 in an aldose), the carbon created by ring closure, not at carbon 2 or any other specified non-anomeric carbon.

## answer_c
Optical isomers

## explanation_c
Incorrect. Optical isomers is a broader, less specific term for any stereoisomers that rotate plane-polarised light differently; it does not pin the difference to one specific carbon the way 'epimers' does.

## answer_d
Aldo and keto isomers

## explanation_d
Incorrect. Aldose and ketose isomers share a molecular formula but differ in functional group (aldehyde vs ketone), not in configuration at one particular carbon.

## answer_e
D and Lisomers

## explanation_e
Incorrect. D and L isomers are mirror images defined by the configuration at the highest-numbered chiral carbon (the reference carbon), not by a difference confined to carbon 2 specifically.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-AEDF8CA500AD5A

## concept_ids
CON-FND-AEDF8CA500AD5A

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Term for sugars differing only in configuration around carbon 2

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p17 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key, p17 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p17
reuse: CON-FND-AEDF8CA500AD5A (Alexandria docs/import-ready/concept/AU-MED-102-biochem-structural-concepts.md) already teaches this exact isomerism classification (D/L, epimers, anomers, aldose-ketose); sparse overlay, no new mint. Taught here via this lane's own article ART-MU101-CARBCHEM-9E8FDE35, which names this id in related_concepts.

---

# Item

## id
QST-MUMED101-BIOPHYS-Q19

## title
Monosaccharide composition of sucrose

## question
Sucrose consists of which of the following:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
α Glucose + β glucose

## explanation_a
Incorrect. Alpha glucose + beta glucose (two glucose units) is not sucrose's composition; sucrose contains one glucose and one fructose unit, not two glucose units.

## answer_b
α Glucose + β fructose

## explanation_b
Correct. Sucrose (table sugar) is a disaccharide formed by an alpha-1,2-glycosidic bond joining the anomeric carbon of alpha-D-glucose to the anomeric carbon of beta-D-fructose. Because this bond links both sugars' anomeric carbons, sucrose has no free anomeric carbon left and so, unlike lactose or maltose, it is a non-reducing sugar. Its two components are alpha-glucose and beta-fructose specifically, which is the exact pairing this question is testing.

## answer_c
β Glucose + α Fructose

## explanation_c
Incorrect. This reverses the correct anomeric configurations; sucrose is alpha-glucose plus beta-fructose, not beta-glucose plus alpha-fructose.

## answer_d
α Glucose + α Fructose

## explanation_d
Incorrect. Fructose's anomeric configuration in sucrose is beta, not alpha; pairing alpha-glucose with alpha-fructose is not the correct composition of sucrose.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-AF2B462D55E69C

## concept_ids
CON-FND-AF2B462D55E69C

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Monosaccharide composition of sucrose

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p17 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key, p17 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p17

---

# Item

## id
QST-MUMED101-BIOPHYS-Q20

## title
False statement about heparin

## question
Which of the following is false about heparin?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Secreted by mast cells

## explanation_a
Incorrect (not the false statement). This is true: heparin is stored in and released from the secretory granules of mast cells (and basophils).

## answer_b
Natural anticoagulant

## explanation_b
Incorrect (not the false statement). This is true: heparin is the body's own most strongly acidic, most heavily sulfated natural anticoagulant, acting chiefly by potentiating antithrombin III.

## answer_c
Contains 2 sulphate groups

## explanation_c
Correct -- this is the false statement. Heparin's repeating disaccharide unit is exceptionally heavily sulfated, carrying three sulfate groups plus one carboxyl group per disaccharide, not two. That higher figure is what makes heparin the most strongly acidic, most densely charged macromolecule in the body, and it is why 'contains 2 sulphate groups' is the false statement among these five, not the true one.

## answer_d
Contains 3 sulphate groups

## explanation_d
Incorrect (not the false statement). This is true, and is the correct sulfation figure the source and this question are built around: three sulfate groups per repeating disaccharide unit.

## answer_e
Used as a drug

## explanation_e
Incorrect (not the false statement). This is true: heparin is used clinically as an injectable anticoagulant drug for prophylaxis and treatment of thrombosis.

## topic
Biochemistry

## subtopic
Glycosaminoglycans and Glycoproteins

## main_concept
CON-FND-8B7D8582182540

## concept_ids
CON-FND-8B7D8582182540

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-GAGGLYCO-87AAAE0F

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
False statement about heparin

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p18 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: red-text key, p18 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p18

---

# Item

## id
QST-MUMED101-BIOPHYS-Q21

## title
Immunoglobulins as an example of glycoprotein function

## question
Which of the following is a function of glycoproteins?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Animal starch

## explanation_a
Incorrect. 'Animal starch' is a common name for glycogen, a homopolysaccharide storage molecule, not a glycoprotein or a function of glycoproteins.

## answer_b
Immunoglobulins

## explanation_b
Correct. Glycoproteins are proteins carrying covalently attached oligosaccharide chains, and immunoglobulins (antibodies) are one of the best-known examples: the carbohydrate component contributes to their folding, stability, secretion and effector function. This makes immune recognition and defence one of the classic functional roles carried out by a glycoprotein, distinguishing glycoproteins (which are mostly protein, with a minority carbohydrate content and a defined amino-acid sequence) from proteoglycans and glycosaminoglycans, which are mostly carbohydrate.

## answer_c
Media for bacteria

## explanation_c
Incorrect. 'Media for bacteria' is not a recognised physiological function of glycoproteins in the human body.

## answer_d
Natural anticoagulant

## explanation_d
Incorrect. Being a natural anticoagulant describes heparin, a glycosaminoglycan, not a function generally attributed to glycoproteins as a class.

## answer_e
Store for carbohydrates

## explanation_e
Incorrect. Acting as a store for carbohydrates describes glycogen, a polysaccharide, not a function of glycoproteins.

## topic
Biochemistry

## subtopic
Glycosaminoglycans and Glycoproteins

## main_concept
CON-FND-0A30250CF4A5B1

## concept_ids
CON-FND-0A30250CF4A5B1

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-GAGGLYCO-87AAAE0F

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Immunoglobulins as an example of glycoprotein function

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p18 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key, p18 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p18

---

# Item

## id
QST-MUMED101-BIOPHYS-Q22

## title
Example pair of epimeric sugars

## question
Which of the following is an example of Epimers?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Glucose and Ribose

## explanation_a
Incorrect. Glucose (a hexose) and ribose (a pentose) do not share the same molecular formula/carbon skeleton length, so the epimer relationship, which requires two sugars differing at exactly one specified carbon, does not apply to this pair.

## answer_b
Glucose and Galactose

## explanation_b
Correct. Glucose and galactose are both six-carbon aldohexoses that share the same molecular formula and differ in configuration at exactly one carbon, carbon 4 -- the textbook example of an epimeric pair. (Glucose and mannose form the other classic epimer pair, differing at carbon 2.)

## answer_c
Galactose, Mannose and Glucose

## explanation_c
Incorrect. Epimers are defined as a pair differing at one carbon; grouping three different sugars together (galactose, mannose and glucose) does not fit the pairwise epimer definition, since galactose and mannose themselves differ at more than one carbon.

## answer_d
Glucose, Ribose and Mannose

## explanation_d
Incorrect. As with option C, listing three sugars together, one of them (ribose) not even a hexose, does not fit the pairwise, same-formula epimer definition.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-AEDF8CA500AD5A

## concept_ids
CON-FND-AEDF8CA500AD5A

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Example pair of epimeric sugars

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p18 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
keySource: red-text key, p18 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p18
reuse: CON-FND-AEDF8CA500AD5A (Alexandria docs/import-ready/concept/AU-MED-102-biochem-structural-concepts.md) -- its own pitfalls text names 'glucose and galactose (C4)' as epimers, an exact match. Second use of this reused concept in this cluster (also q18, q29).

---

# Item

## id
QST-MUMED101-BIOPHYS-Q23

## title
Glycosaminoglycan lacking sulphate groups

## question
Which of the following does not have sulphuric acid groups?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Heparin

## explanation_a
Incorrect (heparin does carry sulfate groups -- heavily so, three per disaccharide, as tested elsewhere in this sub-block).

## answer_b
Keratan sulfate

## explanation_b
Incorrect. Keratan sulfate, as its name states, carries sulfate groups on its repeating disaccharide.

## answer_c
Hyaluronic acid

## explanation_c
Correct. Hyaluronic acid is the one glycosaminoglycan that is never sulfated. Its repeating disaccharide (N-acetylglucosamine and D-glucuronic acid) carries carboxyl groups from the glucuronic acid but no sulfate esters, which also explains why hyaluronic acid, unlike the other glycosaminoglycans, is never found covalently linked to a core protein as a proteoglycan.

## answer_d
Chondroitin sulfate

## explanation_d
Incorrect. Chondroitin sulfate, again as its name indicates, is a sulfated glycosaminoglycan.

## topic
Biochemistry

## subtopic
Glycosaminoglycans and Glycoproteins

## main_concept
CON-FND-F4865459F719A6

## concept_ids
CON-FND-F4865459F719A6

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-GAGGLYCO-87AAAE0F

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Glycosaminoglycan lacking sulphate groups

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p18 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key, p18 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p18

---

# Item

## id
QST-MUMED101-BIOPHYS-Q24

## title
Composition of starch: amylose and amylopectin

## question
Starch consists of

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Branched amylose and branched amylopectin

## explanation_a
Incorrect. Amylose is not branched; only amylopectin (the other component of starch) is branched.

## answer_b
Unbranched amylose and branched amylopectin

## explanation_b
Correct. Starch, the storage polysaccharide of plants, is a mixture of two glucose polymers: amylose, an unbranched chain of glucose units joined by alpha-1,4 glycosidic bonds, and amylopectin, a branched polymer built of alpha-1,4-linked chains with additional alpha-1,6 branch points roughly every 24-30 residues. The unbranched amylose component tends to form a helical structure and gives the characteristic blue colour with iodine, while branched amylopectin makes up the larger fraction of most starches.

## answer_c
Unbranched amylose and unbranched amylopectin

## explanation_c
Incorrect. Amylopectin is branched, not unbranched; describing both components as unbranched misdescribes amylopectin's structure.

## answer_d
None of the above

## explanation_d
Incorrect. Option B correctly describes starch's composition, so 'none of the above' is not applicable.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-99CC4397B1DE0C

## concept_ids
CON-FND-99CC4397B1DE0C

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Composition of starch: amylose and amylopectin

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p19 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key, p19 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p19

---

# Item

## id
QST-MUMED101-BIOPHYS-Q25

## title
Alternative name for the sucrose-hydrolysis sugar mixture

## question
Which of the following is also known as inverted sugar?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
E

## answer_a
Sucrose

## explanation_a
Incorrect. Sucrose is the starting disaccharide that is hydrolysed to produce invert sugar; it is not itself invert sugar.

## answer_b
Fructose

## explanation_b
Incorrect. Fructose alone is only one of the two components of invert sugar, not the full mixture that carries the name.

## answer_c
Dextrose

## explanation_c
Incorrect. Dextrose is simply another name for D-glucose; it is only one component of the mixture, not invert sugar itself.

## answer_d
Glucose

## explanation_d
Incorrect. Glucose alone, like fructose alone, is only one of the two components; invert sugar specifically names the combined mixture, not either sugar on its own.

## answer_e
Mixture of hydrolysis of sucrose

## explanation_e
Correct. 'Invert sugar' or 'inverted sugar' is precisely the name given to the equimolar mixture of glucose and fructose produced when sucrose is hydrolysed (by acid or the enzyme invertase/sucrase). The name reflects the inversion (sign change) of optical rotation between sucrose and the resulting mixture, and describing it as 'the mixture of hydrolysis of sucrose' is the most literal, complete answer among the five, distinguishing this naming question from the earlier composition question (q14) about what invert sugar consists of.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-1EBEB86CAB058D

## concept_ids
CON-FND-1EBEB86CAB058D

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Alternative name for the sucrose-hydrolysis sugar mixture

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p19 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key, p19 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p19

---

# Item

## id
QST-MUMED101-BIOPHYS-Q26

## title
The one carbohydrate with no asymmetric carbon atom

## question
The only carbohydrate which does not have any asymmetric carbon atoms is

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Glyceraldehyde

## explanation_a
Incorrect. Glyceraldehyde has one asymmetric (chiral) carbon, carbon 2, which is exactly why it exists as D- and L-glyceraldehyde and is used as the reference sugar for assigning configuration.

## answer_b
Erythrose

## explanation_b
Incorrect. Erythrose, a four-carbon aldose, has two asymmetric carbons (carbons 2 and 3).

## answer_c
Dihydroxyacetone

## explanation_c
Correct. Dihydroxyacetone is the simplest possible ketose, a three-carbon sugar whose central carbon bears the ketone group and is attached to two identical -CH2OH groups. Because none of its three carbons has four different substituents, dihydroxyacetone has no chiral (asymmetric) centre at all and therefore has no D or L form -- it is achiral, unlike every other monosaccharide listed.

## answer_d
Erythrulose

## explanation_d
Incorrect. Erythrulose, a four-carbon ketose, has one asymmetric carbon (carbon 3).

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-ED32F5874F5421

## concept_ids
CON-FND-ED32F5874F5421

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
The one carbohydrate with no asymmetric carbon atom

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p19 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key, p19 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p19

---

# Item

## id
QST-MUMED101-BIOPHYS-Q27

## title
Glycosidic linkage found in maltose

## question
Which of the following glycosidic linkages is found in maltose?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Glucose (α-1 – 2β) Fructose

## explanation_a
Incorrect. Glucose(alpha1-2beta)fructose describes the sucrose linkage, not maltose, and maltose does not contain fructose at all.

## answer_b
Glucose (α1 – 4) Glucose

## explanation_b
Correct. Maltose is a disaccharide of two glucose units joined by an alpha-1,4-glycosidic bond, produced physiologically as an intermediate of starch digestion by salivary and pancreatic amylase. Because the bond involves only one of the two anomeric carbons, the second glucose retains a free anomeric carbon, making maltose a reducing sugar, unlike sucrose.

## answer_c
Galactose (β1 – 4) Glucose

## explanation_c
Incorrect. Galactose(beta1-4)glucose describes lactose, not maltose, which is made of two glucose units, not galactose plus glucose.

## answer_d
Glucose (β1 – 4) Glucose

## explanation_d
Incorrect. A beta-1,4 linkage between two glucose units describes cellobiose (the repeat unit relationship in cellulose), not maltose, which uses an alpha, not a beta, linkage.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-24219DD2F169B6

## concept_ids
CON-FND-24219DD2F169B6

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Glycosidic linkage found in maltose

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p19 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key on stem/option, p19; pagetext.mjs keys reported this question as ambiguous (both B and D flagged) -- resolved by reading the PDF's own per-span colour data directly: only option B ('Glucose (α1-4) Glucose') carries red text, matching standard biochemistry (maltose = alpha-1,4 glucose-glucose).
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p19

---

# Item

## id
QST-MUMED101-BIOPHYS-Q28

## title
Naming oligosaccharides linked to proteins

## question
Oligosaccharides linked to proteins are called

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Glycolipids

## explanation_a
Incorrect. Glycolipids are oligosaccharides covalently attached to lipids, not to proteins.

## answer_b
Glycoproteins

## explanation_b
Correct. When one or more oligosaccharide chains are covalently attached to a protein (typically via N-linkage to asparagine or O-linkage to serine/threonine), the resulting molecule is a glycoprotein. Glycoproteins are mostly protein by mass, with the attached carbohydrate influencing folding, stability, solubility, half-life and recognition by other cells or molecules, distinguishing them from proteoglycans, which are mostly carbohydrate attached to a smaller protein core.

## answer_c
Galactosides

## explanation_c
Incorrect. 'Galactoside' is a generic chemical term for a glycoside of galactose; it does not describe the general category of oligosaccharide-protein conjugates.

## answer_d
Ganglioside

## explanation_d
Incorrect. A ganglioside is a specific class of glycolipid found abundantly in neuronal cell membranes (carbohydrate attached to a ceramide lipid), not a protein conjugate.

## topic
Biochemistry

## subtopic
Glycosaminoglycans and Glycoproteins

## main_concept
CON-FND-05A8CEB2CD0029

## concept_ids
CON-FND-05A8CEB2CD0029

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-GAGGLYCO-87AAAE0F

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Naming oligosaccharides linked to proteins

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p19 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key on stem/option, p19-20; pagetext.mjs keys reported this question unmarked because the source numbers it '28.Oligosaccharides' with no space after the period -- resolved by reading the PDF's own per-span colour data directly, not by rendering.
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p19-20

---

# Item

## id
QST-MUMED101-BIOPHYS-Q29

## title
Term for the alpha and beta forms of D-glucose

## question
The α and β forms of D-Glucose are known as

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Anomer

## explanation_a
Correct. When glucose cyclises into its ring form, carbon 1 becomes a new chiral centre called the anomeric carbon, and the two possible configurations at that carbon are called alpha and beta anomers. Alpha-D-glucose and beta-D-glucose interconvert in solution through the open-chain form, a process called mutarotation, and the anomeric designation is specifically reserved for this carbon-1 difference, distinct from epimerism at any other carbon.

## answer_b
Epimer

## explanation_b
Incorrect. Epimers differ at a specified carbon other than the anomeric carbon (for example carbon 2 or carbon 4); the alpha/beta distinction of D-glucose is specifically at the anomeric carbon, so it is termed anomerism, not epimerism.

## answer_c
Racemic mixture

## explanation_c
Incorrect. A racemic mixture is an equal mixture of two full enantiomers (complete mirror images, such as D- and L-glucose); alpha and beta D-glucose are not full mirror images of each other, only anomers differing at one carbon.

## answer_d
Enediol

## explanation_d
Incorrect. An enediol is a chemical intermediate structure (a carbon-carbon double bond bearing two hydroxyl groups) formed transiently during isomerisation reactions such as the glucose-fructose interconversion; it is not the name for the alpha/beta forms of glucose.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-AEDF8CA500AD5A

## concept_ids
CON-FND-AEDF8CA500AD5A

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Term for the alpha and beta forms of D-glucose

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p20 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key, p20 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p20
reuse: CON-FND-AEDF8CA500AD5A (Alexandria docs/import-ready/concept/AU-MED-102-biochem-structural-concepts.md) -- its own definition states 'anomers differ only at the anomeric carbon', an exact match for the alpha/beta-D-glucose distinction. Third use of this reused concept in this cluster (also q18, q22).

---

# Item

## id
QST-MUMED101-BIOPHYS-Q30

## title
Glycosidic linkage of cellulose

## question
Cellulose is made up of repeating units of

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
beta - 1 - 4 linkage between D-glucose units

## explanation_a
Correct. Cellulose is an unbranched, structural polysaccharide of D-glucose units joined exclusively by beta-1,4-glycosidic bonds. This beta linkage forces each successive glucose unit to rotate 180 degrees relative to its neighbour, producing long, straight, hydrogen-bonded chains that pack into rigid microfibrils -- the basis of plant cell wall strength -- and, critically, humans lack the beta-glucosidase (cellulase) needed to hydrolyse this bond, so cellulose passes through the human gut undigested as dietary fibre.

## answer_b
beta - 1 - 2 linkage between D-glucose units

## explanation_b
Incorrect. A beta-1,2 linkage is not the bond found in cellulose; cellulose's glucose units are linked 1,4, not 1,2.

## answer_c
alpha - 1 - 4 linkage between D-glucose units

## explanation_c
Incorrect. Alpha-1,4 linkages join glucose units in starch (amylose) and glycogen, not in cellulose, which is defined by its beta configuration.

## answer_d
alpha - 1 - 2 linkage between D-glucose units

## explanation_d
Incorrect. Neither the alpha configuration nor a 1,2 linkage position describes cellulose's bond.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-F9F45E1748DD65

## concept_ids
CON-FND-F9F45E1748DD65

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Glycosidic linkage of cellulose

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p20 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key, p20 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p20

---

# Item

## id
QST-MUMED101-BIOPHYS-Q31

## title
Glycosidic linkages present in amylopectin

## question
Amylopectin has

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
beta - 1 - 4 and B - 1 - 6 linkage

## explanation_a
Incorrect. Amylopectin's linkages are alpha, not beta; a beta-1,4/beta-1,6 combination describes neither amylopectin nor any of the standard storage polysaccharides.

## answer_b
beta - 1 - 2 linkage

## explanation_b
Incorrect. A single beta-1,2 linkage does not describe amylopectin's structure, which needs both a 1,4 backbone linkage and a 1,6 branch linkage.

## answer_c
alpha - 1 - 4 and alpha-1-6 linkage

## explanation_c
Correct. Amylopectin, the branched component of starch, is built from D-glucose units joined by alpha-1,4-glycosidic bonds along its linear stretches, with additional alpha-1,6-glycosidic bonds introduced roughly every 24-30 residues to create branch points. This combination of a 1,4 backbone and 1,6 branches is structurally identical in principle to glycogen, though glycogen branches more frequently (about every 8-12 residues), making glycogen more compact and more rapidly mobilised.

## answer_d
alpha - 1 - 2 linkage

## explanation_d
Incorrect. A single alpha-1,2 linkage does not describe amylopectin, which requires both the 1,4 backbone and the 1,6 branch linkage to account for its branched structure.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-3AE7A52E50C9A2

## concept_ids
CON-FND-3AE7A52E50C9A2

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Glycosidic linkages present in amylopectin

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p20 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key, p20 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p20

---

# Item

## id
QST-MUMED101-BIOPHYS-Q32

## title
Identifying the keto tetrose

## question
Which of the following is a keto tetrose?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Erythrulose

## explanation_a
Correct. Erythrulose is a four-carbon ketose (a keto tetrose), the ketone-bearing counterpart of the aldotetrose erythrose. Naming monosaccharides by carbon number plus functional group (tetrose/pentose/hexose, aldo-/keto-) is the standard classification system, and erythrulose is the specific four-carbon member of the ketose series among these four named sugars.

## answer_b
Xylulose

## explanation_b
Incorrect. Xylulose is a five-carbon ketose (a ketopentose), not a four-carbon sugar.

## answer_c
Sorbose

## explanation_c
Incorrect. Sorbose is a six-carbon ketose (a ketohexose), not a four-carbon sugar.

## answer_d
Psicose

## explanation_d
Incorrect. Psicose is also a six-carbon ketose (a ketohexose), not a four-carbon sugar.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-27F1AC824735FB

## concept_ids
CON-FND-27F1AC824735FB

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Identifying the keto tetrose

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p20 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
keySource: red-text key, p20 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p20

---

# Item

## id
QST-MUMED101-BIOPHYS-Q33

## title
Major carbohydrate storage form in animals

## question
Name the major storage form of carbohydrates in animals?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Cellulose

## explanation_a
Incorrect. Cellulose is a structural polysaccharide of plant cell walls, not a storage form, and humans cannot digest it in any case.

## answer_b
Chitin

## explanation_b
Incorrect. Chitin is a structural polysaccharide of arthropod exoskeletons and fungal cell walls (built from N-acetylglucosamine units), not an animal carbohydrate storage molecule.

## answer_c
Glycogen

## explanation_c
Correct. Glycogen is the major carbohydrate storage polysaccharide of animals, stored chiefly in liver and skeletal muscle. It is built of D-glucose units joined by alpha-1,4 linkages with alpha-1,6 branch points roughly every 8-12 residues -- more heavily branched than plant starch -- which gives it many free ends for rapid, simultaneous mobilisation of glucose during fasting or exercise.

## answer_d
Starch

## explanation_d
Incorrect. Starch is the carbohydrate storage form of plants, not animals; the animal equivalent, built on the same alpha-1,4/alpha-1,6 chemistry but more branched, is glycogen.

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## main_concept
CON-FND-A717B3B956BD3E

## concept_ids
CON-FND-A717B3B956BD3E

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-CARBCHEM-9E8FDE35

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Major carbohydrate storage form in animals

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p21 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key, p21 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p21

---

# Item

## id
QST-MUMED101-BIOPHYS-Q34

## title
Identifying a metalloprotein

## question
An example of metalloprotein is

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
casein

## explanation_a
Incorrect. Casein is a phosphoprotein, the major milk protein family, distinguished by phosphate groups esterified to serine residues, not by a bound metal.

## answer_b
ceruloplasmin

## explanation_b
Correct. Ceruloplasmin is a copper-binding plasma glycoprotein, and its bound copper (six to seven atoms per molecule) makes it a metalloprotein -- a protein whose function depends on a tightly, often covalently or coordinately bound metal cofactor. Ceruloplasmin also has ferroxidase activity (oxidising Fe2+ to Fe3+ to allow its loading onto transferrin) and is the plasma protein that is characteristically low in Wilson's disease, a disorder of copper metabolism.

## answer_c
albumin

## explanation_c
Incorrect. Albumin is a simple, non-conjugated plasma protein; it carries various ligands reversibly (including some metal ions in transit) but is not itself classified as a metalloprotein.

## answer_d
salmin

## explanation_d
Incorrect. Salmin is a simple protamine (a small, highly basic, arginine-rich protein that binds DNA in fish sperm), not a metal-binding protein.

## answer_e
gelatin

## explanation_e
Incorrect. Gelatin is a denatured derivative of collagen, a simple structural protein, not a metalloprotein.

## topic
Biochemistry

## subtopic
Proteins and Amino Acids

## main_concept
CON-FND-4CDCC389A481F0

## concept_ids
CON-FND-4CDCC389A481F0

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-PROTEINAA-C5C4756B

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Identifying a metalloprotein

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p21 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key, p21 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p21

---

# Item

## id
QST-MUMED101-BIOPHYS-Q35

## title
Structural level represented by the alpha helix and beta-pleated sheet

## question
In protein, the α- helix and β-pleated sheet are example of

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Primary structure

## explanation_a
Incorrect. Primary structure is simply the linear sequence of amino acids joined by peptide bonds; it has no three-dimensional folding pattern of its own.

## answer_b
Secondary structure

## explanation_b
Correct. Secondary structure describes the regular, local, repeating folding patterns of the polypeptide backbone that are stabilised by hydrogen bonds between backbone amide and carbonyl groups. The alpha helix (a right-handed coil) and the beta-pleated sheet (extended strands hydrogen-bonded side by side) are the two classic examples of secondary structure, forming before the chain packs into its overall three-dimensional tertiary fold.

## answer_c
Tertiary structure

## explanation_c
Incorrect. Tertiary structure is the overall three-dimensional folding of a single polypeptide chain, built from its secondary-structure elements packing together and stabilised by side-chain interactions (hydrophobic packing, hydrogen bonds, ionic bonds, disulfide bonds), not the helix/sheet patterns themselves.

## answer_d
Quaternary stucture

## explanation_d
Incorrect. Quaternary structure refers to the arrangement of multiple, separate polypeptide subunits into a single functional multi-chain protein complex (such as haemoglobin's four chains), not to the helix or sheet patterns within one chain.

## answer_e
Subunit structure

## explanation_e
Incorrect. 'Subunit structure' is not a standard name for one of the four recognised levels of protein structure; the helix/sheet patterns are specifically secondary structure.

## topic
Biochemistry

## subtopic
Proteins and Amino Acids

## main_concept
CON-FND-6AE7C832CAA796

## concept_ids
CON-FND-6AE7C832CAA796

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-PROTEINAA-C5C4756B

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Structural level represented by the alpha helix and beta-pleated sheet

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p21 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text key, p21 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p21. Source formatting note: option A ('Primary structure') is printed on the line immediately after the stem with no 'a)' label, unlike options B-E which are labelled -- read as option A by position and by process of elimination (the only remaining structural-level term), not inferred.

---

# Item

## id
QST-MUMED101-BIOPHYS-Q36

## title
Identifying the purely ketogenic amino acid

## question
Which of the following amino acids is ketogenic not glucogenic

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Isoleucine

## explanation_a
Incorrect. Isoleucine is a mixed amino acid, both glucogenic and ketogenic, not purely ketogenic.

## answer_b
Tyrosine

## explanation_b
Incorrect. Tyrosine is also a mixed amino acid, both glucogenic and ketogenic.

## answer_c
Leucine

## explanation_c
Correct. Leucine and lysine are the only two amino acids that are purely ketogenic, with no glucogenic pathway at all: their carbon skeletons are degraded entirely to acetyl-CoA and/or acetoacetyl-CoA (ketone-body precursors), so they cannot be used for net gluconeogenesis. This makes leucine (with lysine) the key exception among the amino acids, most of which are glucogenic or, like isoleucine, tyrosine and phenylalanine, mixed.

## answer_d
Phenylalanine

## explanation_d
Incorrect. Phenylalanine is a mixed amino acid, both glucogenic and ketogenic.

## answer_e
Therionine

## explanation_e
Incorrect. Threonine is glucogenic only, not ketogenic.

## topic
Biochemistry

## subtopic
Proteins and Amino Acids

## main_concept
CON-FND-F91310521FC982

## concept_ids
CON-FND-F91310521FC982

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-PROTEINAA-C5C4756B

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Identifying the purely ketogenic amino acid

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p21 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key, p21 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p21
reuse: CON-FND-F91310521FC982 (Kasr docs/import-ready/concept/103-BMS-biochemistry-concepts.md) already teaches this exact fact ('Purely ketogenic are leucine and lysine'); sparse overlay, no new mint. Taught here via this lane's own article ART-MU101-PROTEINAA-C5C4756B.

---

# Item

## id
QST-MUMED101-BIOPHYS-Q37

## title
Correct statement about peptide bond formation

## question
Which of the following statement about peptide bond is true

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
It is carbon- carbon bond

## explanation_a
Incorrect. A peptide bond is a carbon-nitrogen bond (specifically, the carbonyl carbon of one amino acid to the amide nitrogen of the next), not a carbon-carbon bond.

## answer_b
It has cis hydrogen and oxygen groups

## explanation_b
Incorrect. The peptide bond's carbonyl oxygen and amide hydrogen are arranged trans to each other across the bond in the overwhelmingly favoured conformation, not cis, because of steric clash between adjacent side chains in the cis form.

## answer_c
It occurs between carboxyl group and amino group of 2 amino acids

## explanation_c
Correct. A peptide bond forms by condensation of the carboxyl (-COOH) group of one amino acid with the amino (-NH2) group of the next amino acid, releasing one molecule of water. Two amino acids linked this way form a dipeptide, three form a tripeptide, and many linked together form a polypeptide or protein; this condensation reaction, catalysed on the ribosome during translation, is the fundamental bond that builds every protein's primary structure.

## answer_d
It has rational freedom

## explanation_d
Incorrect. The peptide bond has partial double-bond character from resonance with the adjacent carbonyl, which makes it rigid and planar with restricted (not free) rotation; only the bonds on either side of it (the N-Ca and Ca-C bonds) have rotational freedom.

## answer_e
It is found in fatty acids

## explanation_e
Incorrect. Peptide bonds link amino acids in proteins; they are not found in fatty acids, which are joined to other molecules (such as glycerol) by ester bonds, not peptide bonds.

## topic
Biochemistry

## subtopic
Proteins and Amino Acids

## main_concept
CON-FND-7C8A02831B3243

## concept_ids
CON-FND-7C8A02831B3243

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-PROTEINAA-C5C4756B

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Correct statement about peptide bond formation

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p22 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key, p22 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p22
reuse: CON-FND-7C8A02831B3243 (Kasr docs/import-ready/concept/102-INT-mcq-concepts.md) already teaches this exact fact ('A peptide bond forms by condensation of the carboxylic group of one amino acid with the amino group of the next'); sparse overlay, no new mint. Taught here via this lane's own article ART-MU101-PROTEINAA-C5C4756B.

---

# Item

## id
QST-MUMED101-BIOPHYS-Q38

## title
Uncharged derivative of an acidic amino acid

## question
Which of the amino acids below is the uncharged derivative of an acidic amino acid?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
propionic acid

## explanation_a
Incorrect. Propionic acid is a simple short-chain fatty acid, not an amino acid or a derivative of one.

## answer_b
Cystine

## explanation_b
Incorrect. Cystine is the disulfide-linked dimer of two cysteine molecules; it is a sulfur-containing amino-acid derivative, not a derivative of an acidic amino acid.

## answer_c
Tyrosine

## explanation_c
Incorrect. Tyrosine is an aromatic amino acid derived by hydroxylation of phenylalanine; it is not an amide derivative of an acidic amino acid.

## answer_d
Glutamine

## explanation_d
Correct. Glutamine is the amide of glutamic acid: its side-chain carboxyl group is converted to an amide (-CONH2) group, which removes the negative charge that glutamic acid carries at physiological pH. This makes glutamine the uncharged amide derivative of the acidic amino acid glutamic acid, in exactly the same way that asparagine is the uncharged amide derivative of aspartic acid.

## topic
Biochemistry

## subtopic
Proteins and Amino Acids

## main_concept
CON-FND-3D0104B8490B14

## concept_ids
CON-FND-3D0104B8490B14

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Biochemistry-Physiology

## question_only_for

## library_ids
ART-MU101-PROTEINAA-C5C4756B

## resource_ids
src_34ff78aabb8bfd729922

## learning_objective
Uncharged derivative of an acidic amino acid

## source_citation
EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Support 43 Biochemistry/Physiology sub-block p22 (Menoufia MED101 Foundation 1 EOM exam)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: red-text key, p22 (pagetext.mjs keys auto-read)
mu: EOM Practice - Foundation 1 - Support 43 - With Answers.pdf, Biochemistry/Physiology sub-block, Q from p22. Source anomaly: a stray sixth line 'f) Isoleucine' follows option E in the raw text with no red mark and no bearing on the marked key; read as extraneous noise (Isoleucine already appears as an option in q36) and excluded, keeping the five lettered options a-e that the stem's own instructions call for.
