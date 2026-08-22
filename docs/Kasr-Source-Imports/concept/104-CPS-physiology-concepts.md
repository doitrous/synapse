<!--
  Hand-authored physiology concepts for 104 CPS (Cardiovascular + Respiratory), covering book
  sub-topics the generated ../concept/104-CPS-concepts.md does not reach. Every concept cites
  the physiology department book (src_a11a7faed67c95e2d636) directly. Do not hand-edit
  ../concept/104-CPS-concepts.md or ../concept/104-CPS-practical-concepts.md alongside this file.

  A separate, already-live catalogue of CVS/RESP physiology content exists outside this repo's
  Kasr tree (CON-CVS-* under SYS-CVS-T01, CON-RES-* under DIS-PHY-T03) from unrelated courses;
  concepts here were checked against it with find-existing.mjs and do not duplicate it. See each
  group's dedup note (HTML comments) and the lane report for details.
-->

# Item
## label
The cardiac cycle runs through a fixed order of seven phases starting with atrial systole, and a rising heart rate shortens the cycle mainly by shortening diastole, not systole
## id
CON-CVS-8D34A57C987227
## canonical_key
cardiac-cycle.seven-phase-sequence-and-duration
## definition
The cardiac cycle is triggered by the P wave of the ECG, so one cycle is the period between two successive P waves. It runs through seven phases in a fixed order: atrial systole, isovolumetric contraction, rapid ejection, reduced ejection, isovolumetric relaxation, rapid filling, and reduced filling. As heart rate rises the whole cycle shortens, but not evenly: at 75/min the cycle is 0.8 sec (0.3 sec systole, 0.5 sec diastole); at 200/min it falls to 0.3 sec, and systole and diastole become almost equal (0.15 sec each), because the shortening is taken disproportionately out of diastole.
## explicit_objective
State the seven phases of the cardiac cycle in their normal order beginning with atrial systole, name the ECG event that initiates the cycle, and explain why a rising heart rate shortens the cycle mainly at the expense of diastole rather than systole.
## pitfalls
Assuming heart rate shortens systole and diastole by the same proportion. The book's own numbers show diastole absorbing almost all of the shortening: between 75/min and 200/min, ventricular systole only halves (0.3 to 0.15 sec) while ventricular diastole falls to less than a third (0.5 to 0.15 sec).
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Cardiac Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.35
## academic_relevance
0.9
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Table of the seven phases of the cardiac cycle | Effect of tachycardia on systole and diastole
## article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## support_mode
direct_statement
## original_wording
[Book p.21] It is initiated by the P wave of the ECG. Therefore, cardiac cycle is the period between two successive P waves.
[Book p.21] Phase of the Cardiac Cycle: (7 phases) It starts by atrial contraction followed by Ventricular contraction.
[Book p.22] The duration of the cardiac cycle varies according to the heart rate: - The cardiac cycle becomes shorter when the heart rate increases. - Shortening affects diastole much more than systole.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-F8BD2261B8CBDA | CON-CVS-43B32FA3653194
## related_article_ids
ART-104-PHY-CARDIAC-OUTPUT-AND-EXERCISE
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CYCLE-PHASES-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Both aliases are the way this material is asked for in practice; no [clear] needed.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
The aortic pressure curve rises on the ejection-driven anacrotic limb and falls on the catacrotic limb, whose dicrotic notch and dicrotic wave mark aortic valve closure
## id
CON-CVS-F8BD2261B8CBDA
## canonical_key
aortic-pressure-curve.limbs-and-dicrotic-notch
## definition
The aortic pressure curve traces aortic pressure across one cardiac cycle. Its ascending, "anacrotic", limb coincides with the maximal ejection phase and carries pressure up to about 120 mmHg (systolic arterial blood pressure). Its descending, "catacrotic", limb runs through the rest of the cycle down to about 80 mmHg (diastolic arterial blood pressure). On the catacrotic limb, the dicrotic notch is a sharp drop of pressure that ends with closure of the aortic valve at the end of systole; the dicrotic wave that follows it is a small rise of pressure caused by backwardly moving blood bouncing against the now-closed elastic aortic valve during isovolumetric relaxation.
## explicit_objective
Name the ascending and descending limbs of the aortic pressure curve, state which pressure value each limb produces, and explain what causes the dicrotic notch and the dicrotic wave that follows it.
## pitfalls
Treating the dicrotic notch and the dicrotic wave as the same event. The notch is the sharp pressure drop at the moment the aortic valve shuts; the wave is the small rebound afterwards, caused by blood bouncing back against the now-closed valve during isovolumetric relaxation.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Cardiac Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.4
## academic_relevance
0.85
## confidence
0.75
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Anacrotic and catacrotic limbs | Dicrotic notch and dicrotic wave
## article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## support_mode
direct_statement
## original_wording
[Book p.27] Ascending limb: “anacrotic limb”. - It coincides with the maximal ejection phase of cardiac cycle. - Aortic pressure rises to its maximum value (about 120 mmHg). This is known as systolic arterial blood pressure.
[Book p.27] Descending limb: “catacrotic limb”. - Aortic pressure decreases gradually through the rest of the cardiac cycle to a minimum value (about 80 mmHg) at the end of isovolumetric contraction phase.
[Book p.27] Dicrotic notch: due to sharp drop of pressure ending with closure of aortic valve at the end of systole. Dicrotic wave: small rise of aortic pressure due to bouncing up of backwardly moving blood against the closed elastic aortic valve during isovolumetric relaxation.
## conflicts
[clear]
## uncertainty
The book states the diastolic-pressure minimum on the catacrotic limb is reached "at the end of isovolumetric contraction phase" (p.27). That wording is quoted exactly as printed; it reads unusually against the more common teaching that the diastolic minimum falls just before the next isovolumetric contraction begins, but the concept records the book's own phrasing rather than silently correcting it.
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-8D34A57C987227 | CON-CVS-43B32FA3653194
## related_article_ids
ART-104-PHY-CARDIAC-OUTPUT-AND-EXERCISE
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CYCLE-AORTICCURVE-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Both are standard exam phrasings for this material; no [clear] needed.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
The jugular venous pulse's a, c, x, x prime, v and y waves each mark a distinct right atrial or tricuspid-valve event and line up with the ECG and the carotid pulse
## id
CON-CVS-43B32FA3653194
## canonical_key
jugular-venous-pulse.wave-components-and-timing
## definition
Because no valves lie between the right atrium and the venae cavae, right atrial pressure changes are transmitted directly to the jugular veins as the jugular venous pulse. The "a" positive wave is due to atrial contraction and follows the ECG's P wave. The "c" positive wave is due to bulging of the tricuspid valve leaflets into the atrium during isovolumetric contraction, and follows the QRS complex and the start of the carotid pulse. The "x" negative wave is due to escape of blood from atrium to ventricle; a second negative deflection, "x prime", is due to the downward pull of the atrioventricular ring by ventricular contraction during rapid ejection, and occurs with the carotid pulse (so the jugular veins normally collapse with carotid pulsation). The "v" positive wave is due to accumulation of venous return in the atrium while the tricuspid valve is closed, and occurs with the descending (collapsing) limb of the carotid pulse. The "y" negative wave is due to blood flowing out of the right atrium once the tricuspid valve opens for ventricular filling.
## explicit_objective
Name each wave of the jugular venous pulse (a, c, x, x prime, v, y), state the right atrial or tricuspid event each one reflects, and place each wave against the ECG and the carotid pulse.
## pitfalls
Confusing the two negative deflections. The plain "x" wave is atrial emptying into the ventricle; the separate "x prime" wave, occurring later with the carotid pulse, is the atrioventricular ring being pulled down during rapid ejection — the book gives them different causes even though both are called negative waves.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Cardiac Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.55
## academic_relevance
0.85
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
JVP waves | a c x v y waves of the jugular venous pulse
## article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## support_mode
direct_statement
## original_wording
[Book p.27] - “a” positive wave: is due to atrial contraction. - “x” negative wave: is due to escape of blood from atrium to the ventricle.
[Book p.28] - “c” positive wave: is due to bulging of tricuspid valve leaflets inside the atrium during isovolumetric contraction phase. - “x\” negative wave: is due to downward pull of the AV ring by ventricular contraction during rapid ejection phase. - “v” positive wave: is due to accumulation of venous return in atrium while the tricuspid valve is closed. - “y” negative wave: is due to flow of blood out of the right atrium after opening of tricuspid valve during ventricular filling phase.
[Book p.28] “a” wave follows the P wave of ECG. - “c” wave follows the QRS complex of ECG and occurs with the beginning of carotid pulse. - “x\” negative wave occurs with carotid pulse. This means that normally the jugular veins collapse with carotid pulsation. - “v” wave occurs with the descending limb of carotid pulse i.e. with collapsing of carotid pulse.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-8D34A57C987227 | CON-CVS-F8BD2261B8CBDA
## related_article_ids
ART-104-PHY-CARDIAC-OUTPUT-AND-EXERCISE
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CYCLE-JVP-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Both are standard exam phrasings for this material; no [clear] needed.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Cardiac output is the volume each ventricle pumps per minute, equals heart rate times stroke volume, and is corrected for body size as the cardiac index
## id
CON-CVS-D97F7FD5B9F824
## canonical_key
cardiac-output.definition-formula-and-index
## definition
Cardiac output (CO) is the volume of blood pumped by each ventricle per minute, normally about 5 litres/minute in adults. Because CO depends on body size (it is higher in people with a larger body size), it is corrected for size as the cardiac index, calculated by dividing CO in L/min by body surface area in m2; the normal cardiac index is about 3.2 L/min/m2. CO is determined by heart rate (beats per minute) and stroke volume, the volume of blood ejected by each ventricle per beat, so that CO = stroke volume x heart rate.
## explicit_objective
State the definition and normal value of cardiac output, write the formula CO = SV x HR, and define cardiac index and its normal value.
## pitfalls
Forgetting that cardiac index divides cardiac output by body surface area, not by body weight, and treating "5 L/min" as a fixed constant rather than a value that itself scales with body size.
## concept_type
definition
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Cardiac Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.5
## academic_relevance
0.95
## confidence
0.85
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
CO = HR x SV | Cardiac index
## article_ids
ART-104-PHY-CARDIAC-OUTPUT-AND-EXERCISE
## support_mode
direct_statement
## original_wording
[Book p.32] Cardiac output (CO): Volume of blood pumped by each ventricle per minute. Average normal value in adults is about 5 liters/minute.
[Book p.32] Cardiac Index: is calculated by dividing CO (L/min) by body surface area (m2). Normal cardiac index is about 3.2 L/min/m2.
[Book p.32] Cardiac output is determined by: - Heart rate (number of beats per minute). - Stroke volume. Stroke volume (SV): volume of blood ejected by each ventricle each beat. CO = SV x HR
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-BDAE3CD8565D49 | CON-CVS-73064071B3660C
## related_article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CO-DEFINITION-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Both are the standard shorthand for this material; no [clear] needed.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Cardiac output rises with physical exercise, anxiety, meals, heat and pregnancy, and falls with standing and with rapid cardiac arrhythmias
## id
CON-CVS-BDAE3CD8565D49
## canonical_key
cardiac-output.conditions-that-increase-or-decrease-it
## definition
The book lists physiological and pathological conditions that move cardiac output away from its resting value. CO increases with physical exercise (up to 700%), anxiety and excitement (up to 100%), after meals (30%), high environmental temperature, and pregnancy. CO decreases with standing up from a supine position (30%), and with rapid cardiac arrhythmias and many other heart diseases.
## explicit_objective
List the conditions the book gives for an increased cardiac output and for a decreased cardiac output, with the approximate percentage change where the book states one.
## pitfalls
Assuming any tachyarrhythmia raises cardiac output because heart rate is higher — the book places rapid cardiac arrhythmias among the causes of decreased cardiac output, not increased.
## concept_type
classification
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Cardiac Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.5
## academic_relevance
0.75
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Causes of increased and decreased cardiac output
## article_ids
ART-104-PHY-CARDIAC-OUTPUT-AND-EXERCISE
## support_mode
direct_statement
## original_wording
[Book p.32] Cardiac output increases in the following conditions: 1- Physical exercise (up to 700%). 2- Anxiety and excitement (up to 100%). 3- After meals (30%). 4- High environmental temperature. 5- Pregnancy.
[Book p.32] Cardiac output decreases in the following conditions: 1- Standing from supine position (30%) 2- Rapid cardiac arrhythmias and many other heart diseases.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-D97F7FD5B9F824 | CON-CVS-73064071B3660C
## related_article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CO-CONDITIONS-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: [clear] not needed — one alias is enough for this list-type concept, no further common name in use.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
During dynamic exercise, sympathetic stimulation raises heart rate and inotropy and lowers total peripheral resistance, but cardiac stimulation alone raises cardiac output only a little
## id
CON-CVS-73064071B3660C
## canonical_key
cardiac-output.response-to-dynamic-exercise
## definition
During muscular exercise, strong sympathetic stimulation and reduced vagal tone raise heart rate and inotropy while decreasing total peripheral resistance, mainly through local metabolites in the contracting muscles and, at the start of exercise, sympathetic vasodilator cholinergic fibres. Acting alone, these cardiac effects raise cardiac output only a little. The book states that cardiac output is limited by the return of blood to the heart, so a much larger rise in cardiac output during exercise requires the venous side of the circulation to change as well; when systemic circulatory function is additionally altered by decreased venous capacity and decreased systemic vascular resistance, cardiac output can rise to much higher levels.
## explicit_objective
State how dynamic exercise changes heart rate, inotropy and total peripheral resistance through sympathetic stimulation, and explain why cardiac stimulation by itself only raises cardiac output a little.
## pitfalls
Attributing the large rise in cardiac output during exercise to the heart's own stimulation alone. The book is explicit that cardiac stimulation in a normal heart has only a little effect on cardiac output if acting alone; the much larger rise depends on the systemic circulatory side of the loop changing too.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Cardiac Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.45
## academic_relevance
0.85
## confidence
0.75
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Cardiovascular response to muscular exercise | Effect of exercise on heart rate, inotropy and TPR
## article_ids
ART-104-PHY-CARDIAC-OUTPUT-AND-EXERCISE
## support_mode
direct_statement
## original_wording
[Book p.55] During muscular exercise, there is strong sympathetic stimulation while vagal parasympathetic stimulation of the heart decreases.
[Book p.55] a- Increasing heart rate (due to impulses from cerebral cortex or from peripheral receptors in muscles that affect medullary cardiovascular centers). b- Increasing inotropy and heart rate. c- Decreasing total peripheral resistance (mainly by the effect of local metabolites in the contracting muscles but sympathetic vasodilator cholinergic fibers play a role, mainly at the start of exercise). This alone can only increase CO a little (from point A to point B, figure 4-16).
[Book p.56] Cardiac stimulation in a normal heart has only a little effect on cardiac output if acting alone. However, if systemic circulatory function is additionally altered by decreasing venous capacity and systemic vascular resistance, the cardiac output can increase to much higher levels. Without changes in systemic circulatory function, cardiac output is limited by the return of blood to the heart and ventricular filling
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication. The book's own explanation of the second, larger step (the venous-return-curve shift driven by increased mean systemic filling pressure and decreased resistance to venous return) is deliberately not repeated here because it duplicates an already-covered concept (CON-CVS-B21C3D54DE291E, effect of changing mean systemic filling pressure on the venous return curve); this concept records only the cardiac-side response and the qualitative conclusion that the venous side must also change.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-D97F7FD5B9F824 | CON-CVS-BDAE3CD8565D49
## related_article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CO-EXERCISE-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Both are standard exam phrasings for this material; no [clear] needed.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Blood flow equals the pressure gradient divided by resistance, and applied to the whole circulation this gives a systemic resistance of about 18 mmHg/L/min against a pulmonary resistance of only about 1.4 mmHg/L/min
## id
CON-CVS-FA5FB57963DDF7
## canonical_key
hemodynamics.flow-pressure-resistance-relationship
## definition
Flow is the volume of fluid crossing a point per unit time; the overall blood flow in the circulation is the amount pumped into the aorta each minute, i.e. the cardiac output. Flow (F), pressure (P) and resistance (R) in blood vessels are related by F = delta-P / R. Applying this to the whole systemic circulation, total peripheral resistance TPR = (MAP - CVP) / CO = (90 - 0) / 5 = 18, so TPR is about 18 mmHg/L/min. Applying the same relationship to the pulmonary circulation, PulR = (MPP - LAP) / COP = (15 - 8) / 5 = 1.4, so pulmonary vascular resistance is only about 1.4 mmHg/L/min even though it carries the same cardiac output.
## explicit_objective
State the flow-pressure-resistance relationship F = delta-P / R, and use the book's own worked values to give the approximate resistance of the systemic circulation (about 18 mmHg/L/min) and of the pulmonary circulation (about 1.4 mmHg/L/min).
## pitfalls
Forgetting that the pulmonary circulation carries the same cardiac output as the systemic circulation despite having roughly one-thirteenth of its resistance — the low pulmonary resistance, not a lower flow, is why pulmonary pressures are so much lower than systemic pressures.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Vascular Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.4
## academic_relevance
0.85
## confidence
0.75
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
F = delta-P / R | Total peripheral resistance and pulmonary vascular resistance
## article_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE
## support_mode
direct_statement
## original_wording
[Book p.43] Relationship between flow (F), pressure (P), and resistance (R) in blood vessels: F=∆P÷R
[Book p.43] Total peripheral resistance (TPR) of the systemic circulation: CO = (MAP – CVP) / TPR TPR = (MAP – CVP) / CO = (90 – 0) / 5 = 18 Therefore, TPR equals about 18 mmHg/L/min.
[Book p.43] The resistance of the pulmonary circulation (PulR): PulR = (MPP – LAP) / COP = (15 – 8) / 5 = 1.4 Therefore, pulmonary vascular resistance is only about 1.4 mmHg/L/min.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication. The book does not state Poiseuille's law or the role of vessel radius in resistance in this chapter; only the simpler F = delta-P / R relationship and its two worked examples are given, so no claim about radius or viscosity is made here.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-A0579343614BCD | CON-CVS-78E74CAC3AE5E5
## related_article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-HEMODYNAMICS-FLOW-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Both are standard exam phrasings for this material; no [clear] needed.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Systolic, diastolic and mean arterial pressure are distinct quantities, mean arterial pressure sits nearer diastolic because diastole outlasts systole, and pulse pressure widens when arterial compliance falls
## id
CON-CVS-A0579343614BCD
## canonical_key
arterial-blood-pressure.systolic-diastolic-map-and-pulse-pressure
## definition
Systolic blood pressure is the peak pressure reached during systole in the aorta and large arteries, about 120 mmHg (normal range 90-140 mmHg). Diastolic blood pressure is the lowest pressure during diastole, about 80 mmHg (normal range 60-90 mmHg). Mean arterial pressure (MAP) is the average pressure throughout the cardiac cycle, approximately equal to diastolic pressure plus one-third of the pulse pressure (about 90 mmHg normally); it is not the arithmetic mean of systolic and diastolic pressure because systole, during which pressure rises, is shorter than diastole, during which pressure falls, so the mean sits nearer the diastolic value — though at a rapid heart rate, when the shortening of the cycle affects diastole more than systole, MAP moves closer to the true arithmetic mean. Pulse pressure is the difference between systolic and diastolic pressure, normally about 30-50 mmHg. When arterial compliance falls, for example in atherosclerosis, systolic pressure rises (the arteries cannot distend enough to accommodate the stroke volume) and diastolic pressure falls (the arteries recoil less in diastole), so pulse pressure increases.
## explicit_objective
Define systolic, diastolic and mean arterial pressure with their normal values, state and apply the formula MAP = diastolic pressure + one-third pulse pressure, explain why MAP is not the arithmetic mean, and explain why falling arterial compliance widens pulse pressure.
## pitfalls
Calculating MAP as the simple arithmetic mean of systolic and diastolic pressure. The book gives MAP as diastolic pressure plus one-third of the pulse pressure, precisely because diastole lasts longer than systole and pulls the true average closer to the diastolic value.
## concept_type
definition
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Vascular Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.6
## academic_relevance
0.9
## confidence
0.85
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
MAP = diastolic pressure + 1/3 pulse pressure | Effect of arterial compliance on pulse pressure
## article_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE
## support_mode
direct_statement
## original_wording
[Book p.46] Systolic blood pressure: the peak pressure reached during systole in the aorta and other large arteries. It is about 120 mm Hg (normal range is 90-140 mm Hg) in adults. Diastolic blood pressure: the lowest pressure during diastole and is about 80 mm Hg (normal range is 60-90 mm Hg) in adults.
[Book p.46] Mean arterial pressure (MAP): the average pressure throughout the cardiac cycle. It approximately equals the diastolic pressure plus one-third of the pulse pressure (about 90 mm Hg in normal adults). Why Mean arterial pressure does not equal the arithmetic mean? because systole (during which pressure rises) is shorter than diastole (during which pressure decreases), therefore the mean pressure is lower than the arithmetic mean i.e. nearer to the value of diastolic pressure.
[Book p.46] Pulse pressure: It is the difference between systolic and diastolic pressure. It is normally about 30-50 mmHg.
[Book p.47] If arterial compliance decreases e.g., due to atherosclerosis: - Systolic pressure increases because arteries are not able to distend enough to accommodate the stroke volume. - Diastolic pressure decreases because the ability of the arteries to recoil in diastole is decreased. - Pulse pressure therefore increases.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-FA5FB57963DDF7 | CON-CVS-78E74CAC3AE5E5
## related_article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-HEMODYNAMICS-ABP-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Both are standard exam phrasings for this material; no [clear] needed.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Pressure falls from about 90 mmHg mean in the aorta to a few mmHg by the great veins, while venous compliance is about 24 times arterial compliance, making veins the blood reservoir of the circulation
## id
CON-CVS-78E74CAC3AE5E5
## canonical_key
vascular-tree.pressure-and-compliance-distribution
## definition
Blood pressure falls progressively along the vascular tree: about 120/80 mmHg (mean 90 mmHg) in the systemic aorta versus about 25/15 mmHg (mean 10 mmHg) in the pulmonary artery, and within the systemic capillaries pressure falls from about 35 mmHg at the arteriolar end to 15 mmHg at the venous end (average functional capillary pressure about 25 mmHg). Vascular compliance is the ratio of change in blood volume to change in pressure in a vessel, and it is not fixed: compliance is higher at lower volumes and falls (the vessel stiffens) at higher volumes. Arterial compliance converts the intermittent flow from the aorta into continuous flow in peripheral vessels, minimises the rise of systolic and the fall of diastolic pressure, and reduces the work the heart must do for a given cardiac output. Venous compliance is about 24 times arterial compliance, so veins can accommodate far more blood than arteries for the same change in pressure, which is why veins are described as reservoir vessels; venous compliance is itself set mainly by venous tone, higher tone giving lower compliance.
## explicit_objective
State how mean and pulse pressure differ between the systemic and pulmonary circulations and along the systemic capillary bed, define vascular compliance, and explain why the much higher compliance of veins relative to arteries makes them the circulation's blood reservoir.
## pitfalls
Assuming arteries hold most of the circulating blood volume because they carry the highest pressure. Pressure and volume-holding capacity are inverse here: the low-pressure, high-compliance venous side is the reservoir, holding far more blood for the same pressure change than the stiffer arterial side.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Vascular Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.5
## academic_relevance
0.85
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Veins as capacitance/reservoir vessels | Vascular compliance = delta volume / delta pressure
## article_ids
ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE
## support_mode
direct_statement
## original_wording
[Book p.43] Systemic circulation (Aorta) 120 mm Hg / 80 mm Hg / 90 mm Hg. Pulmonary circulation (Pulmonary artery) 25 mm Hg / 15 mm Hg / 10 mm Hg.
[Book p.43] The pressure in the systemic capillaries: - It varies from 35 mm Hg at the arteriolar end to 15 mm Hg at the venous end, with an average "functional" capillary pressure of 25 mm Hg.
[Book p.44] Compliance = ∆ volume/∆ pressure. Compliance is higher at lower volumes. Compliance decreases at higher values of volume; the slope of the relationship decreases (curve becomes flat).
[Book p.45] Arterial compliance serves the following functions: 1- Converts intermittent flow in the aorta to continuous flow in peripheral vessels. 2- Minimizes both the rise of systolic pressure during ejection of blood and the decrease of pressure during diastole. 3- Reduces work done by the heart.
[Book p.45] Veins have a compliance that is about 24 times the compliance of arteries. This means that veins can accommodate much more blood than arteries for the same change in pressure. That is why veins are described as reservoir vessels.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-FA5FB57963DDF7 | CON-CVS-A0579343614BCD
## related_article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-HEMODYNAMICS-VASCTREE-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Both are standard exam phrasings for this material; no [clear] needed.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Diffusion is the dominant mechanism of capillary exchange and depends on capillary permeability type and concentration gradient, while vesicular transport carries large lipid-insoluble molecules across the endothelium
## id
CON-CVS-D3D1AF25EFA406
## canonical_key
capillary-exchange.diffusion-permeability-and-vesicular-transport
## definition
Capillaries exchange materials with the interstitial fluid by three mechanisms. Diffusion is quantitatively the most important; its rate depends on capillary permeability, which increases across the sequence continuous (lowest permeability) to fenestrated to discontinuous capillaries (highest permeability) and which itself can rise, for example during inflammation, and on properties of the substance itself — the rate of diffusion is directly proportional to the concentration gradient and is also set by molecular size, which governs passage through the capillary pores. Vesicular transport is a separate mechanism that carries large lipid-insoluble molecules such as proteins across endothelial cells, and is how tissues receive high-molecular-weight molecules such as antibodies, cytokines and protein-bound hormones.
## explicit_objective
Name the three mechanisms of capillary exchange, rank the three capillary types by permeability, and state which two properties of a diffusing substance set its rate of diffusion; state what vesicular transport carries and why it is needed alongside diffusion.
## pitfalls
Treating all capillaries as equally permeable. The book ranks them explicitly: continuous capillaries have the lowest permeability, fenestrated capillaries higher, and discontinuous capillaries the highest — a sequence worth knowing by name, not just as "capillaries are permeable".
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Vascular Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.5
## academic_relevance
0.8
## confidence
0.75
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Continuous, fenestrated and discontinuous capillaries | Mechanisms of capillary exchange
## article_ids
ART-104-PHY-CAPILLARY-EXCHANGE-AND-LYMPHATICS
## support_mode
direct_statement
## original_wording
[Book p.57] Three mechanisms are involved in this exchange: 1. Diffusion: This is quantitatively the most important mechanism for exchange of materials across the capillary wall.
[Book p.57] a- Capillary permeability: - Continuous capillaries have the lowest permeability. - Fenestrated capillaries have higher permeability. - Discontinuous capillaries have the highest permeability. Capillary permeability can change under different conditions, e.g., during inflammation, permeability increases. b- Factors related to the substance: - Concentration gradient: is directly proportional to the rate of diffusion. - Molecular size: This determines the rate of diffusion of substances through pores.
[Book p.58] 3. Vesicular Transport: By this transport mechanism, large lipid-insoluble molecules e.g., proteins, are transported across endothelial cells. Importance: It provides tissues with molecules of high molecular weight e.g., antibodies, cytokines, and protein-bound hormones.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-98657F1E7D300D | CON-CVS-6D8E2D62A9F51E
## related_article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CAPILLARY-DIFFUSION-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Both are standard exam phrasings for this material; no [clear] needed.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Trans-capillary filtration is set by the Starling forces, and along a muscle capillary this produces net outward filtration at the arteriolar end and net absorption at the venular end
## id
CON-CVS-98657F1E7D300D
## canonical_key
capillary-exchange.starling-forces-and-trans-capillary-filtration
## definition
Trans-capillary filtration (bulk flow), the Starling forces, depends on the balance of hydrostatic and osmotic pressure gradients across the capillary wall. Capillary hydrostatic pressure (Pc) and interstitial colloid osmotic pressure (pi-i) tend to move fluid outwards, into the interstitium; interstitial hydrostatic pressure (Pi) and capillary colloid osmotic pressure (pi-c) tend to move fluid inwards, into the capillary. Fluid movement = k[(Pc + pi-i) - (Pi + pi-c)], where the capillary filtration coefficient k is proportionate to the permeability of the capillary wall and the area available for filtration; interstitial colloid osmotic pressure is usually very small and can be ignored. Along a muscle capillary the book gives worked net forces: at the arteriolar end, (37 + 0) - (1 + 25) = 11 mmHg, so fluid moves out of the capillary; at the venular end, (17 + 0) - (1 + 25) = -9 mmHg, so fluid moves back into the capillary.
## explicit_objective
Name the four Starling forces and state which two favour filtration and which two favour absorption, write the fluid-movement equation, and use the book's own muscle-capillary example to state the net direction and magnitude of fluid movement at the arteriolar and venular ends.
## pitfalls
Treating interstitial colloid osmotic pressure as a major term in the Starling balance. The book states it is usually very small and can be ignored, so most of the balance in practice comes down to capillary hydrostatic pressure against capillary colloid osmotic pressure.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Vascular Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.55
## academic_relevance
0.9
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Starling forces | Trans-capillary filtration
## article_ids
ART-104-PHY-CAPILLARY-EXCHANGE-AND-LYMPHATICS
## support_mode
direct_statement
## original_wording
[Book p.57] Forces tending to move fluid outwards from capillaries into interstitium: Capillary hydrostatic pressure (Pc), and Interstitial colloid osmotic pressure (πi). Forces tending to move fluid inwards from interstitial space into capillaries: Interstitial hydrostatic pressure (Pi), and Capillary colloid osmotic pressure (πc) Fluid movement = k [(Pc + πi) – (Pi + πc)]
[Book p.57] The interstitial colloid osmotic pressure (πi) is usually very small and can be ignored.
[Book p.58] At arteriolar end: (37 + 0) – (1 + 25) = 11 mmHg i.e., fluid moves out from capillary into the interstitial space at the arteriolar end under a force of 11 mmHg. At venular end: (17 + 0) – (1 + 25) = - 9 mmHg. i.e., fluid moves into the capillary from the interstitial space at the venular end under a force of 9 mmHg.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-D3D1AF25EFA406 | CON-CVS-6D8E2D62A9F51E
## related_article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CAPILLARY-STARLING-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Both are standard exam phrasings for this material; no [clear] needed.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Interstitial fluid volume depends on capillary hydrostatic and osmotic pressure, the filtration coefficient, the number of open capillaries, and lymph flow, and oedema follows when any of these shifts toward filtration
## id
CON-CVS-6D8E2D62A9F51E
## canonical_key
interstitial-fluid.volume-determinants-and-causes-of-oedema
## definition
Interstitial fluid (ISF) volume is set by five factors: capillary hydrostatic pressure, capillary osmotic pressure, the capillary filtration coefficient, the number of active capillaries, and the lymph flow. Oedema is an abnormally large accumulation of ISF, and because of gravity it tends to accumulate in dependent parts (lower limbs when standing, the back when recumbent). The book groups the causes of increased ISF volume and oedema into four mechanisms: increased filtration pressure (arteriolar dilation, venular constriction, increased venous pressure from gravity, raised total extracellular fluid volume, incompetent venous valves, venous obstruction, or heart failure); decreased osmotic pressure gradient across the capillary (decreased plasma protein, as in nutritional oedema, liver cirrhosis or nephrosis, or accumulation of osmotically active substances in the interstitial space); increased capillary permeability (substance P, histamine, kinins); and inadequate lymph flow, where lymphatic obstruction produces oedema fluid with a high protein content and, in longstanding disease such as elephantiasis, non-pitting oedema with inflammation and fibrosis of the interstitial fluid.
## explicit_objective
List the five factors that determine interstitial fluid volume, and give at least one example under each of the book's four mechanisms of increased ISF volume and oedema.
## pitfalls
Assuming oedema always means simple excess fluid of the same composition. The book distinguishes lymphatic-obstruction oedema as high-protein and non-pitting, with inflammation and fibrosis in longstanding disease — a different picture from the low-protein, pitting oedema produced by raised filtration pressure or low plasma protein.
## concept_type
clinical_feature
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Vascular Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.75
## academic_relevance
0.8
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Causes of oedema | Determinants of interstitial fluid volume
## article_ids
ART-104-PHY-CAPILLARY-EXCHANGE-AND-LYMPHATICS
## support_mode
direct_statement
## original_wording
[Book p.60] Factors that determine the ISF Volume: 1. Capillary hydrostatic pressure. 2. Capillary osmotic pressure. 3. The capillary filtration coefficient. 4. The number of active capillaries. 5. The lymph flow.
[Book p.60] Edema is an abnormally large accumulation of ISF. Because of the effect of gravity, the ISF tends to accumulate in dependent parts as lower limbs in the standing position, and back in the recumbent position.
[Book p.60] 4- Inadequate Lymph Flow: Edema is caused by lymphatic obstruction. The edema fluid has a high protein content associated with inflammation and fibrosis of the ISF (non-pitting edema) in longstanding diseases as elephantiasis.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-98657F1E7D300D | CON-CVS-2C65CCE1C08853
## related_article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CAPILLARY-ISF-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Both are standard exam phrasings for this material; no [clear] needed.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Lymph forms because capillary filtration normally exceeds absorption, and valve-fitted peristaltic lymphatics, the skeletal muscle pump and negative intrathoracic pressure drive about 2-4 L/day of it back into the great veins
## id
CON-CVS-2C65CCE1C08853
## canonical_key
lymphatic-circulation.drainage-mechanisms-and-functions
## definition
Normally the fluid efflux across the capillary wall exceeds the fluid influx, and this extra fluid enters the lymphatics and drains back to the blood; normal lymph flow is 2-4 L/day. Initial lymphatics in regions such as the intestines and skeletal muscles have loose junctions between endothelial cells that let the extra fluid enter, and drain into collecting lymphatics, which drain into large thoracic veins (the subclavian or internal jugular). Three mechanisms drive lymph drainage: collecting lymphatics have smooth muscle and one-way valves, and their peristaltic contraction is the main force pushing lymph centrally; contraction of the surrounding skeletal muscles squeezes lymph centrally; and negative intra-thoracic pressure sucks lymph upwards. Lymphatics drain excess filtered fluid not recovered at the venous end of the capillary, carry proteins and large particles away from the tissue spaces, transport absorbed long-chain fatty acids and cholesterol from the intestine, and remove bacteria, delivering them to lymph nodes.
## explicit_objective
State why lymph forms, give the normal daily lymph flow, and name the three mechanisms that drive lymph centrally toward the great veins together with the four functions of the lymphatic circulation.
## pitfalls
Forgetting that lymphatics also return filtered plasma proteins and large particles to the blood, not just fluid — this is exactly why lymphatic obstruction produces a high-protein, non-pitting oedema rather than plain fluid accumulation.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Vascular Function
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.55
## academic_relevance
0.8
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Mechanisms of lymph drainage | Functions of the lymphatic circulation
## article_ids
ART-104-PHY-CAPILLARY-EXCHANGE-AND-LYMPHATICS
## support_mode
direct_statement
## original_wording
[Book p.58] Normally, the fluid efflux across the capillary wall exceeds the fluid influx. The extra fluid enters the lymphatics and drains back to the blood. The normal lymph flow is 2-4 L/day.
[Book p.59] Mechanisms that help drainage of lymph: 1. Collecting lymphatics have smooth muscle and valves in their walls. The peristaltic contraction of the collecting lymphatics is the main factor pushing the lymph centrally. Valves allow lymph to flow in only one direction (centrally) and prevent it from flowing backwards. 2. Contraction of skeletal muscles surrounding lymphatics squeezes lymph centrally. 3. Negative intra-thoracic pressure sucks lymph upwards.
[Book p.59] Functions of lymphatics: 1. Drainage of the excess filtered fluid from capillaries and is not drained at the venous end of the capillaries. 2. The lymphatics can carry proteins and large particles away from the tissue spaces. 3. Transport of absorbed long chain fatty acids and cholesterol from the intestine. 4. Removal of bacteria and their delivery to lymph nodes.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-6D8E2D62A9F51E | CON-CVS-98657F1E7D300D
## related_article_ids
ART-104-PHY-CARDIAC-CYCLE-AND-HEART-SOUNDS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CAPILLARY-LYMPH-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Both are standard exam phrasings for this material; no [clear] needed.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: No MIC_ id exists for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ id exists for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

# ARTICLES

---

# Item
## label
The peripheral chemoreceptor reflex, driven by low arterial PO2 in the carotid and aortic bodies, raises sympathetic discharge to correct a markedly low arterial pressure
## id
CON-CVS-131F06D46D3B84
## canonical_key
peripheral-chemoreceptor-reflex.carotid-and-aortic-bodies
## definition
Peripheral chemoreceptors sit in the carotid and aortic bodies, carried to the medulla by the carotid sinus (glossopharyngeal) nerve and the vagus respectively. They are stimulated primarily by low arterial PO2, and secondarily by a marked fall of arterial pressure to 40-60 mmHg, because such low pressure itself reduces blood flow through the bodies and produces local hypoxia. Their stimulation increases sympathetic discharge, producing tachycardia and vasoconstriction that tend to raise the low blood pressure back up.
## explicit_objective
Name the location and afferent nerves of the peripheral chemoreceptors, state what stimulates them (directly and via low arterial pressure), and describe the reflex response.
## pitfalls
Treating the peripheral chemoreceptor reflex as a pressure sensor like the baroreceptors. It is fundamentally an O2 sensor; it only responds to arterial pressure indirectly, once the pressure falls low enough (40-60 mmHg) to make the chemoreceptors themselves ischaemic.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.6
## academic_relevance
0.85
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Carotid and aortic body reflex
## article_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL
## support_mode
direct_statement
## original_wording
These chemoreceptors are primarily stimulated by low arterial PO2.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-C3E60AC7A9EDB1 | CON-CVS-230096C97EAB11
## related_article_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-PERIPH-CHEMO-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
Central chemoreceptors near the medulla, protected by the blood-brain barrier and bathed by CSF, are driven mainly by rising PCO2 rather than by arterial hypoxia directly
## id
CON-CVS-230096C97EAB11
## canonical_key
central-chemoreceptors.location-stimulus-and-blood-brain-barrier
## definition
Central chemoreceptors are located near the medulla and are stimulated chiefly by a rise in blood/CSF PCO2, because CO2 crosses the blood-brain barrier freely while H+ and O2 do not; they are protected by the blood-brain barrier from the ionised solutes of plasma. Their afferents feed into the medullary cardiovascular centres and, together with the direct stimulant effect of hypercapnia and hypoxia on the vasomotor area itself, raise arterial blood pressure.
## explicit_objective
State why the central chemoreceptors respond to CO2 rather than to arterial H+ or O2 directly, and explain the role of the blood-brain barrier in that selectivity.
## pitfalls
Assuming central chemoreceptors respond directly to a fall in arterial PO2, the way peripheral chemoreceptors do. They do not: they are driven by CO2/pH changes in the CSF, which the blood-brain barrier lets CO2 reach freely while excluding ionised H+ and O2 changes in plasma.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.5
## academic_relevance
0.85
## confidence
0.75
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Blood-brain barrier and chemoreceptor selectivity
## article_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL
## support_mode
direct_statement
## original_wording
Hypercapnia, and to a lesser extent hypoxia, can directly stimulate the vasomotor area, leading to elevation of arterial blood pressure.
## conflicts
[clear]
## uncertainty
The book names the afferents to the medullary centres as coming "from central chemoreceptors and from the carotid and aortic chemoreceptors" without stating the CSF/blood-brain-barrier mechanism in the same sentence as this concept's label; the blood-brain-barrier framing follows how this fact is asked in the module's own MCQ bank rather than being a direct quote of a single book sentence — recorded here rather than left unstated.
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-131F06D46D3B84 | CON-CVS-3D7B3647E1B8B2
## related_article_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CENTRAL-CHEMO-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: This exact fact (central chemoreceptors protected by the blood-brain barrier) appears in the module's answered MCQ bank; no source_id/sitting is on record for this hand-authored concept, so exam_signal itself is left blank rather than guessed.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
The CNS ischaemic response, triggered when arterial pressure falls below about 50 mmHg, is the most powerful activator of the sympathetic nervous system
## id
CON-CVS-8E2C7AEC68C4CB
## canonical_key
cns-ischemic-response.trigger-and-effect
## definition
The CNS ischaemic response is triggered when marked hypotension causes ischaemia of the medullary vasomotor area itself; the resulting local rise in PCO2 stimulates the vasomotor area directly, producing marked vasoconstriction and a rise in arterial pressure. It is activated once arterial pressure drops below about 50 mmHg and is described as the single most powerful stimulator of the sympathetic nervous system.
## explicit_objective
State the trigger, mechanism and relative strength of the CNS ischaemic response.
## pitfalls
Confusing the CNS ischaemic response with the baroreceptor reflex. The baroreceptors respond to a pressure change at any level; the CNS ischaemic response only engages once pressure has fallen far enough (below ~50 mmHg) to make the vasomotor area itself ischaemic, and is the more powerful of the two once triggered.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.6
## academic_relevance
0.8
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Cerebral ischaemic response
## article_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL
## support_mode
direct_statement
## original_wording
This reflex is the most powerful stimulator of the sympathetic nervous system. The reflex is activated when arterial blood pressure drops below 50 mm Hg.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-BBAEB2E1A51102
## related_article_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CNS-ISCHEMIC-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
The Cushing reflex — raised arterial pressure with bradycardia — is triggered by raised intracranial pressure compressing the cerebral vessels and making the vasomotor area ischaemic
## id
CON-CVS-BBAEB2E1A51102
## canonical_key
cushing-reflex.trigger-and-triad
## definition
The Cushing reflex is seen when intracranial pressure is raised: the patient shows marked elevation of arterial blood pressure with bradycardia. High intracranial pressure compresses the cerebral vessels, causing brain ischaemia; the resulting local hypercapnia and hypoxia produce a pressor response that raises arterial pressure, and the bradycardia that accompanies it is due to baroreceptor stimulation by that raised pressure.
## explicit_objective
State the trigger and the two-part response (hypertension and bradycardia) of the Cushing reflex, and explain why each component occurs.
## pitfalls
Assuming the bradycardia of the Cushing reflex is a direct effect of raised intracranial pressure. It is a secondary, baroreceptor-mediated response to the pressor rise the ischaemic vasomotor area itself produces — the primary event is the hypertension, and the bradycardia follows from it.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.7
## academic_relevance
0.75
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Cushing's reflex | Cushing response
## article_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL
## support_mode
direct_statement
## original_wording
Cushing reflex: This reflex is observed when intracranial pressure is increased. The patient has marked elevation of arterial blood pressure and bradycardia.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-8E2C7AEC68C4CB
## related_article_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CUSHING-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
The medullary vasomotor area and cardiac inhibitory area are the two centres that set moment-to-moment arterial blood pressure, receiving baroreceptor, chemoreceptor and higher-centre input and outputting via sympathetic and vagal efferents respectively
## id
CON-CVS-3D7B3647E1B8B2
## canonical_key
medullary-cardiovascular-centers.vasomotor-and-cardiac-inhibitory-areas
## definition
The vasomotor area, in the rostral ventrolateral medulla, mediates sympathetic discharge to the heart and blood vessels; its stimulation raises arterial pressure by arteriolar constriction (raising TPR), venoconstriction (raising venous return), and a rise in heart rate and stroke volume, together with a fall in vagal tone. The cardiac inhibitory area, made of the nucleus ambiguus and the dorsal motor nucleus of the vagus, mediates vagal discharge to the heart and its stimulation lowers heart rate and cardiac output. Both centres receive afferents from arterial baroreceptors, cardiopulmonary (atrial) stretch receptors, central and peripheral chemoreceptors, higher brain centres and somatic afferents, and are also directly stimulated by local hypoxia and hypercapnia.
## explicit_objective
Name the two medullary cardiovascular centres, state what each does when stimulated, and list the five categories of afferent input that regulate their activity.
## pitfalls
Treating the vasomotor area as the only medullary centre involved in blood pressure control. The cardiac inhibitory area is a separate centre with the opposite (vagal, heart-rate-lowering) effect, and the baroreflex works by reciprocally inhibiting one while exciting the other.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.5
## academic_relevance
0.85
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Vasomotor area | Cardiac inhibitory area
## article_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL
## support_mode
direct_statement
## original_wording
Stimulation of this area decreases heart rate and cardiac output.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-C3E60AC7A9EDB1 | CON-CVS-131F06D46D3B84 | CON-CVS-230096C97EAB11
## related_article_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-MEDULLARY-CENTERS-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
Local blood flow is matched to tissue metabolism by two mechanisms — active hyperaemia driven by vasodilator metabolites and hypoxia, and myogenic/metabolic autoregulation that returns flow toward normal after a change in perfusion pressure
## id
CON-CVS-56A68328FD03C7
## canonical_key
local-blood-flow-regulation.myogenic-and-metabolic-autoregulation
## definition
Active hyperaemia is the rise in blood flow that accompanies a rise in tissue metabolic activity, produced by arteriolar and precapillary-sphincter dilation from local hypoxia, vasodilator metabolites (CO2, H+, adenosine) and local heat. Autoregulation is the tendency of blood flow in a tissue to return toward normal within under a minute after a change in perfusion pressure, even though the pressure change persists, by two mechanisms: the myogenic mechanism, in which arteriolar stretch from a pressure rise increases calcium entry into vascular smooth muscle and so vasoconstricts (and the converse for a pressure fall), and the metabolic mechanism, in which a fall in flow itself causes hypoxia and metabolite accumulation that dilates the arterioles (and the converse for a flow rise). Reactive hyperaemia — the marked overshoot of blood flow seen after a period of temporary occlusion is released — is an extreme example of the metabolic mechanism.
## explicit_objective
Distinguish active hyperaemia from autoregulation, and explain the myogenic and metabolic mechanisms of autoregulation and how reactive hyperaemia is an extreme case of the metabolic one.
## pitfalls
Treating active hyperaemia and autoregulation as the same phenomenon. Active hyperaemia is a response to a rise in tissue metabolism; autoregulation is a response to a change in perfusion pressure that returns flow toward its original value — the metabolic mechanism behind autoregulation and reactive hyperaemia shares its logic with active hyperaemia, but the trigger is different.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.5
## academic_relevance
0.85
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Active hyperaemia | Reactive hyperaemia | Myogenic mechanism
## article_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL
## support_mode
direct_statement
## original_wording
Stretch stimulates Ca++ entry into smooth muscle fibers so they contract with greater force → vasoconstriction of the arteriole.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-B29600F656A34B
## related_article_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-LOCAL-REGULATION-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
Epinephrine dilates skeletal-muscle and hepatic vessels via β2 receptors so total peripheral resistance falls, while norepinephrine constricts vessels in almost all organs via α1 receptors
## id
CON-CVS-36B0211A4D9ACC
## canonical_key
hormonal-control-of-circulation.epinephrine-and-norepinephrine
## definition
Epinephrine dilates blood vessels in skeletal muscle and the liver through β2 receptors, and this vasodilator action normally overbalances its α1-mediated vasoconstriction elsewhere, so total peripheral resistance falls overall — except at very high plasma levels, where α1-mediated vasoconstriction takes over. Norepinephrine, in contrast, produces vasoconstriction in almost all organs through α1 receptors; both hormones are secreted by the adrenal medulla, and norepinephrine is also the transmitter released by postganglionic sympathetic nerves, with secretion of both raised by diffuse sympathetic stimulation, emotional stress, hypoglycaemia and cold exposure.
## explicit_objective
Contrast the net vascular effect of epinephrine with that of norepinephrine and name the receptor each acts through.
## pitfalls
Assuming epinephrine and norepinephrine have the same net effect on total peripheral resistance because both are catecholamines from the same gland. Epinephrine's β2-mediated vasodilation in muscle and liver normally wins out and lowers TPR overall; norepinephrine has no comparable vasodilator action and raises TPR.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.6
## academic_relevance
0.8
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Adrenaline and noradrenaline vascular effects
## article_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL
## support_mode
direct_statement
## original_wording
Produces vasoconstriction in almost all organs via α1 receptors.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
[clear]
## related_article_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CATECHOLAMINES-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedConceptIds: No sibling concept in this batch discusses the same mechanism closely enough to link.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
Standing shifts blood into the leg veins, dropping venous return and arterial pressure by more than 20 mmHg only if the rapid baroreceptor-driven sympathetic compensation (tachycardia, arterial and venous constriction) fails or is overwhelmed
## id
CON-CVS-0143EA79851601
## canonical_key
postural-hypotension.gravity-effect-on-abp-and-rapid-compensation
## definition
On standing, gravity pools blood in the veins of the lower body, lowering venous return and so cardiac output and arterial pressure; prolonged standing adds to this by raising capillary hydrostatic pressure and filtering fluid out of the blood, further lowering venous return. A fall in arterial pressure of more than 20 mmHg on standing is called postural (orthostatic) hypotension. Normally this is limited by a rapid baroreceptor-driven reflex — falling baroreceptor discharge raises sympathetic outflow, producing tachycardia, arterial vasoconstriction, venoconstriction (which limits pooling and restores venous return) and increased renin-angiotensin-aldosterone secretion — but the reflex can fail with a slow or weak sympathetic response (bed rest, old age, autonomic neuropathy such as diabetes, sympatholytic drugs) or be overwhelmed by hypovolaemia (haemorrhage, dehydration).
## explicit_objective
Explain the two mechanisms by which gravity lowers arterial pressure on standing, define postural hypotension by its pressure threshold, and list the components of the rapid compensatory reflex and the conditions that can make it fail.
## pitfalls
Treating postural hypotension as simply "gravity lowering blood pressure". In a healthy person gravity's effect is normally compensated within seconds by the baroreflex; postural hypotension proper only appears when that compensation is weak, slow, or overwhelmed by volume loss.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.75
## academic_relevance
0.75
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Orthostatic hypotension
## article_ids
ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL
## support_mode
direct_statement
## original_wording
If the decrease in ABP is more than 20 mmHg, this is known as "postural hypotension" or "orthostatic hypotension".
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-81C8162A18CD9E | CON-CVS-C3E60AC7A9EDB1
## related_article_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-ORTHOSTATIC-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
Coronary blood flow falls to a minimum during systole because ventricular contraction compresses the vessels within the wall, and is matched to myocardial O2 demand mainly by metabolic autoregulation since the myocardium already extracts 70-80% of delivered oxygen at rest
## id
CON-CVS-B29600F656A34B
## canonical_key
coronary-circulation.phasic-flow-and-autoregulation
## definition
Resting coronary flow (about 84 ml/100 g/min, 250 ml/min for the whole heart) can rise to about 400 ml/100 g/min. Because the myocardium already extracts 70-80% of the O2 delivered to it at rest — a near-maximal extraction aided by its dense, always-open capillary bed — a rise in O2 demand (e.g. exercise) cannot be met mostly by extracting more O2 and must instead be met by raising coronary flow. Flow is not constant through the cycle: ventricular contraction compresses the intramural coronary vessels, driving flow to a minimum during systole (hardest on the subendocardium, which is why it is most vulnerable to ischaemia) and letting it peak in early diastole before falling passively with aortic pressure, so diastolic aortic pressure is what mainly perfuses the coronaries. Flow is regulated primarily by metabolic autoregulation (vasodilator metabolites — adenosine, CO2, H+, prostaglandins — released as myocardial metabolism rises), with a considerable myogenic autoregulatory component holding flow constant across a perfusion-pressure range of about 40-130 mmHg, sympathetic stimulation that is net vasodilator despite direct α1 vasoconstriction (because it also raises myocardial metabolism), and endothelial substances (NO and prostacyclin as dilators, endothelin-1 as constrictor).
## explicit_objective
Explain why the heart cannot rely on increased O2 extraction to meet a rise in demand, describe how coronary flow varies across the cardiac cycle and why the subendocardium is vulnerable, and list the four regulatory mechanisms of coronary blood flow.
## pitfalls
Assuming coronary blood flow is highest during systole, as it is for most organs during their own most active phase. The opposite is true: ventricular contraction compresses the coronary vessels running through the wall, so flow is lowest during systole and peaks in early diastole.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Special Circulation
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.8
## academic_relevance
0.8
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Phasic coronary flow | Subendocardial vulnerability to ischaemia
## article_ids
ART-104-PHY-CORONARY-AND-PULMONARY-CIRCULATION
## support_mode
direct_statement
## original_wording
During systole: The contraction of the myocardium compresses the coronary vessels within the ventricular wall → increasing their resistance and decreasing the coronary flow to a minimum.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-56A68328FD03C7 | CON-CVS-CFF45F193765C4
## related_article_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CORONARY-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
Pulmonary vascular resistance, lowest at functional residual capacity, rises toward both total lung capacity and residual volume, and pulmonary arterioles uniquely constrict (rather than dilate) in response to local hypoxia
## id
CON-CVS-76412894FAD01C
## canonical_key
pulmonary-circulation.low-pressure-circuit-and-regulation-of-pvr
## definition
The pulmonary circulation runs at far lower pressure than the systemic circulation (pulmonary artery about 25/10 mmHg systolic/diastolic, mean 15 mmHg, against systemic 120/80, mean 90), which is why it is called a low-pressure circuit and why its capillaries normally filter no fluid. Pulmonary vascular resistance (PVR) is minimal at functional residual capacity and rises both toward total lung capacity (alveolar vessels are compressed by the expanding alveoli, outweighing the falling resistance of extra-alveolar vessels) and toward residual volume (alveolar collapse lowers alveolar-vessel resistance, but extra-alveolar vessels narrow as intrapleural pressure rises, and this dominates). PVR also falls as pulmonary blood flow rises, through distension and recruitment of previously closed capillaries. Uniquely among the vascular beds, pulmonary arterioles constrict rather than dilate in response to local alveolar hypoxia ("hypoxic pulmonary vasoconstriction") and to high alveolar PCO2 — a physiologically useful mechanism that diverts blood away from poorly ventilated lung regions.
## explicit_objective
State how pulmonary artery pressure compares with systemic pressure and why that matters for capillary filtration, describe how pulmonary vascular resistance changes with lung volume, and explain hypoxic pulmonary vasoconstriction and why it is the opposite of the systemic response to hypoxia.
## pitfalls
Assuming pulmonary vessels respond to hypoxia the way systemic vessels do, by dilating. Pulmonary arterioles constrict in local hypoxia — the opposite response — which is what usefully diverts blood flow away from underventilated alveoli rather than wasting perfusion on them.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Special Circulation
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.7
## academic_relevance
0.8
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Hypoxic pulmonary vasoconstriction
## article_ids
ART-104-PHY-CORONARY-AND-PULMONARY-CIRCULATION
## support_mode
direct_statement
## original_wording
Unlike systemic vessels, pulmonary arterioles constrict in response to low PO2.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-C74AB8F5E776B7 | CON-RES-4A773ABA9943BE
## related_article_ids
ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-PULMONARY-CIRC-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
Anatomic dead space (about 150 ml) is the conducting-zone air that never reaches an alveolus, and alveolar ventilation — the volume of fresh air actually reaching the alveoli each minute — is (tidal volume minus dead space) times respiratory rate
## id
CON-RES-F9A8562032A469
## canonical_key
airway-zones-and-dead-space.conducting-respiratory-and-physiological-dead-space
## definition
Anatomic dead space is the volume of air in the conducting zone (nasal cavity to terminal bronchioles) where no gas exchange occurs, about 150 ml; physiologic dead space adds any non-functioning alveoli to this, and normally equals the anatomic dead space because normally every alveolus functions, but rises above it in disease. Because the dead space's own old air (about 150 ml) moves into the alveoli on the next breath before fresh air does, only tidal volume minus dead space is functionally fresh air reaching the alveoli, so alveolar ventilation = (tidal volume - dead space) x respiratory rate — at rest, (500 - 150) x 12 = 4200 ml/min against a pulmonary (minute) ventilation of 500 x 12 = 6000 ml/min. Because dead space is roughly fixed, increasing the depth of breathing raises alveolar ventilation far more effectively than increasing its rate: shallow rapid breathing (200 ml x 30/min) can leave alveolar ventilation markedly below normal despite an unchanged minute ventilation, producing hypoxia and hypercapnia, while slow deep breathing (1000 ml x 6/min) raises it well above normal for the same minute ventilation.
## explicit_objective
Define anatomic and physiologic dead space, state the alveolar ventilation formula, and explain why increasing breathing depth raises alveolar ventilation more effectively than increasing breathing rate for the same minute ventilation.
## pitfalls
Assuming minute (pulmonary) ventilation and alveolar ventilation are the same thing, or that they change together. Two breathing patterns can share an identical minute ventilation (rate x tidal volume) while alveolar ventilation — the only part that matters for gas exchange — differs several-fold, because dead space is subtracted once per breath regardless of tidal volume.
## concept_type
mechanism
## status
under review
## subject
resp
## primary_node_id
DIS-PHY-T03
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Pulmonary Compliance
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.4
## exam_weight_by_year
KAU_Y1=0.4
## clinical_relevance
0.6
## academic_relevance
0.9
## confidence
0.85
## topic
Physiology
## subtopic
Respiratory System
## aliases
Alveolar ventilation formula | Bohr's equation | Shallow rapid vs slow deep breathing
## article_ids
ART-104-PHY-AIRWAY-ANATOMY-AND-DEAD-SPACE
## support_mode
direct_statement
## original_wording
Alveolar ventilation = (TV– DS) x Respiratory rate
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication. The book states Bohr's equation measures physiologic dead space from arterial and expired PCO2 but does not work a numeric example of it; none is claimed here.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-RES-57BCE3B42BEF36
## related_article_ids
ART-104-PHY-GAS-EXCHANGE-AND-VQ-MATCHING
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-DEADSPACE-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
The conducting zone humidifies, warms and filters air on its way to the respiratory zone, and the lung performs several functions besides gas exchange, including acid-base regulation, heat/water loss, olfaction, and secretion of ACE and heparin
## id
CON-RES-57BCE3B42BEF36
## canonical_key
respiratory-membrane-and-non-respiratory-functions.structure-and-non-gas-exchange-roles
## definition
The lower respiratory passages divide functionally into the conducting zone (trachea to terminal bronchioles, ciliated, transports air, humidifies and warms it, and filters particulates) and the respiratory zone (from the respiratory bronchioles onward, where alveoli appear and gas exchange occurs, lined by type I pneumocytes for exchange, type II pneumocytes that secrete surfactant, and alveolar macrophages that engulf foreign particles). Gas exchange itself crosses the thin (about 0.5 micrometre) alveolar-capillary (respiratory) membrane over a combined surface area of 70-80 m2. Besides gas exchange, the respiratory tract performs several non-respiratory functions the book lists explicitly: regulating acid-base balance, defending against pathogens, enhancing venous return, olfaction, vocalisation, water and heat loss during expiration, an anticoagulant role (lung mast cells secrete heparin), and secretion of angiotensin-converting enzyme.
## explicit_objective
Distinguish the conducting zone from the respiratory zone by structure and function, name the three cell types of the alveolar epithelium and what each does, and list the non-respiratory functions of the lung.
## pitfalls
Assuming the conducting zone contributes nothing physiologically because it does no gas exchange. It humidifies, warms and filters every breath before it reaches the respiratory zone, and "wasted" ventilation of it is still functionally necessary.
## concept_type
classification
## status
under review
## subject
resp
## primary_node_id
DIS-PHY-T03
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Organization of the Respiratory System
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.25
## exam_weight_by_year
KAU_Y1=0.25
## clinical_relevance
0.4
## academic_relevance
0.75
## confidence
0.8
## topic
Physiology
## subtopic
Respiratory System
## aliases
Conducting zone versus respiratory zone | Type I and type II pneumocytes
## article_ids
ART-104-PHY-AIRWAY-ANATOMY-AND-DEAD-SPACE
## support_mode
direct_statement
## original_wording
Non-Respiratory Functions of the Respiratory System: ... 1. Regulation of acid-base balance in blood. 2. Protection against pathogens and foreign particles in the airways. 3. Enhancing the venous return.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-RES-F9A8562032A469 | CON-RES-B7F9FACECA4AFF
## related_article_ids
ART-104-PHY-GAS-EXCHANGE-AND-VQ-MATCHING
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-ZONES-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
Transpulmonary pressure (intra-alveolar minus intrapleural) is the force expanding the lungs, and intrapleural pressure swings from about -30 to -40 cmH2O in a maximal forced inspiration against a closed glottis to about +50 cmH2O in a forced expiration against one
## id
CON-RES-97B778DE471E7E
## canonical_key
transpulmonary-pressure.definition-and-intrapleural-pressure-extremes
## definition
Transpulmonary (transmural) pressure equals intra-alveolar pressure minus intrapleural pressure, and is the force that expands the lungs against their elastic recoil: at the end of normal expiration it is about 3 cmH2O (0 - (-3)), and at the end of normal inspiration about 6 cmH2O (0 - (-6)). Intrapleural pressure itself is about -3 cmH2O at the end of normal expiration and ranges -6 to -8 cmH2O at the end of normal inspiration; in Muller's experiment (forced inspiration against a closed glottis) it can fall to -30 to -40 cmH2O, and in Valsalva's experiment (forced expiration against a closed glottis) it can rise to about +50 cmH2O, becoming positive. In diseases that destroy elastic fibres, such as emphysema, reduced lung recoil makes the intrapleural pressure less negative than normal at any given lung volume.
## explicit_objective
Define transpulmonary pressure and calculate it from the book's own end-expiratory and end-inspiratory intrapleural pressure values, and state the intrapleural pressure extremes reached in Muller's and Valsalva's experiments.
## pitfalls
Assuming intrapleural pressure is always negative under all conditions. It is always negative during normal breathing, but a forced expiratory effort against a closed glottis (Valsalva) can drive it positive, to about +50 cmH2O.
## concept_type
mechanism
## status
under review
## subject
resp
## primary_node_id
DIS-PHY-T03
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Organization of the Respiratory System
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.5
## academic_relevance
0.85
## confidence
0.8
## topic
Physiology
## subtopic
Respiratory System
## aliases
Muller's experiment | Valsalva's experiment
## article_ids
ART-104-PHY-AIRWAY-ANATOMY-AND-DEAD-SPACE
## support_mode
direct_statement
## original_wording
During forced inspiration with the glottis closed (Muller's experiment): IPP becomes more negative, e.g., -30 to -40 cmH2O.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-RES-1BA6BE714676EC
## related_article_ids
ART-104-PHY-GAS-EXCHANGE-AND-VQ-MATCHING
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-TRANSPULMONARY-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: This exact fact (a Valsalva-type manoeuvre making intrapleural pressure positive) appears in the module's answered MCQ bank; no source_id/sitting is on record for this hand-authored concept, so exam_signal itself is left blank rather than guessed.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
Gas diffuses through the respiratory membrane fastest with a large pressure gradient, large surface area, high temperature and solubility, and slowest with a thick membrane or a large molecular weight — and CO2 diffuses about 20 times faster than O2 despite O2's larger pressure gradient, because CO2 is so much more soluble
## id
CON-RES-C323EEF5DA30FF
## canonical_key
alveolar-capillary-diffusion.factors-determining-rate
## definition
The rate of gas diffusion through the respiratory membrane is directly proportional to the pressure gradient across it, the membrane's surface area (70-80 m2) and temperature, and to the gas's solubility, and inversely proportional to the membrane's thickness (about 0.5 micrometre) and to the square root of the gas's molecular weight. O2's pressure gradient across the membrane (about 60 mmHg, alveolar 105 minus capillary 40) is roughly ten times CO2's (about 6 mmHg), yet because CO2 is about 24 times more soluble in water than O2 despite its 1.4-times larger molecule, its relative diffusion coefficient is about 20.3 times that of O2 — so diffusion problems affect O2 exchange far more readily than they affect CO2 elimination.
## explicit_objective
List the six factors that determine the rate of gas diffusion through the respiratory membrane and state which way each acts, and explain why a diffusion-limiting disease affects O2 exchange much more than CO2 elimination.
## pitfalls
Assuming a larger pressure gradient always means faster net diffusion between two gases. O2 has the larger pressure gradient across the membrane, but CO2 still diffuses faster overall because its far higher solubility more than compensates — solubility, not just the pressure gradient, decides the winner.
## concept_type
mechanism
## status
under review
## subject
resp
## primary_node_id
DIS-PHY-T03
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Gas exchange in the lung
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.35
## exam_weight_by_year
KAU_Y1=0.35
## clinical_relevance
0.6
## academic_relevance
0.9
## confidence
0.85
## topic
Physiology
## subtopic
Respiratory System
## aliases
Relative diffusion coefficient of CO2 versus O2
## article_ids
ART-104-PHY-GAS-EXCHANGE-AND-VQ-MATCHING
## support_mode
direct_statement
## original_wording
the relative diffusion coefficient of CO2 is 20.3 times that of O2. Diffusion problems affect O2 diffusion, but rarely affect the elimination of CO2.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-RES-317D54C114B246
## related_article_ids
ART-104-PHY-AIRWAY-ANATOMY-AND-DEAD-SPACE
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-DIFFUSION-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
The ventilation-perfusion ratio is about 3.0 at the lung apex and 0.6 at the base, because gravity drops perfusion faster than ventilation moving up the upright lung
## id
CON-RES-317D54C114B246
## canonical_key
ventilation-perfusion-ratio.regional-variation-in-the-lung
## definition
The ventilation-perfusion ratio (VA/Q) — alveolar ventilation (about 4 L/min) divided by pulmonary perfusion (about 5 L/min, the right ventricular cardiac output) — averages 0.8-1.2 for the lung as a whole, but both ventilation and perfusion fall from base to apex in the upright lung, and perfusion falls faster than ventilation does. The lung's own weight makes the intrapleural space more negative at the apex (about -10 cmH2O) than the base (about -2.5 cmH2O), so apical alveoli sit more expanded at rest and change volume less on inspiration than the less-inflated basal alveoli do, making ventilation highest at the base. Gravity acts even more strongly on the low-pressure pulmonary circulation: apical capillaries, under low arterial pressure, nearly collapse (poor perfusion, "zone 1"); mid-lung pressures are balanced (moderate perfusion, "zone 2"); basal capillaries, under the highest hydrostatic pressure, stay fully open (highest perfusion, "zone 3"). The net result is a high VA/Q of about 3.0 at the apex (poorly perfused relative to ventilated) and a low VA/Q of about 0.6 at the base (poorly ventilated relative to perfused).
## explicit_objective
State how alveolar ventilation and perfusion each vary from apex to base of the upright lung, explain the gravitational mechanism behind each, and give the approximate VA/Q value at the apex and at the base.
## pitfalls
Assuming ventilation and perfusion vary together, keeping VA/Q constant throughout the lung. Both fall from base to apex, but perfusion falls faster, so VA/Q rises going up the lung — it is not a uniform 0.8-1.2 everywhere, only on average for the whole lung.
## concept_type
mechanism
## status
under review
## subject
resp
## primary_node_id
DIS-PHY-T03
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Gas exchange in the lung
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.35
## exam_weight_by_year
KAU_Y1=0.35
## clinical_relevance
0.6
## academic_relevance
0.9
## confidence
0.8
## topic
Physiology
## subtopic
Respiratory System
## aliases
V/Q ratio | Zone 1, zone 2, zone 3 of the lung
## article_ids
ART-104-PHY-GAS-EXCHANGE-AND-VQ-MATCHING
## support_mode
direct_statement
## original_wording
In the lung apex: blood flow is relatively poor compared to ventilation and VA/Q is high (3.0). At the lung base: pulmonary blood flow is relatively high compared to ventilation and VA/Q is low (0.6).
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-RES-C323EEF5DA30FF | CON-RES-4A773ABA9943BE
## related_article_ids
ART-104-PHY-AIRWAY-ANATOMY-AND-DEAD-SPACE
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-VQ-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.

---

# Item
## label
Pulmonary capillaries normally absorb more fluid than they filter, because colloidal osmotic pressure (about 28 mmHg) exceeds hydrostatic pressure (about 7 mmHg), and bronchial venous blood draining into the pulmonary vein creates a small physiologic shunt even in a healthy lung
## id
CON-RES-4A773ABA9943BE
## canonical_key
pulmonary-shunt.physiologic-versus-anatomic-arteriovenous-shunt
## definition
Pulmonary capillaries normally keep the lung dry because the absorptive force, colloidal osmotic pressure (about 28 mmHg), exceeds the filtering force, mean pulmonary capillary hydrostatic pressure (about 7 mmHg), so there is continual net absorption of fluid from alveoli and tissue into blood; pulmonary oedema develops only once capillary hydrostatic pressure rises above the colloidal osmotic pressure (above about 28 mmHg), interfering with gas exchange across the respiratory membrane. Separately, the bronchial circulation — which supplies the bronchial smooth muscle and pleura, arising from the aorta — drains its deoxygenated venous blood into the pulmonary vein, where it mixes with oxygenated blood before reaching the systemic circulation; this venous admixture, present even in a healthy lung, is the physiologic shunt.
## explicit_objective
State the two pressures that keep pulmonary capillaries dry and the threshold at which pulmonary oedema develops, and explain what the physiologic shunt is and why it exists even in a healthy lung.
## pitfalls
Assuming pulmonary capillaries behave like systemic ones, with filtration usually exceeding reabsorption. In the lung the balance is reversed: the low hydrostatic pressure means absorption normally dominates, and only a hydrostatic-pressure rise above the colloidal osmotic pressure (~28 mmHg) tips it into oedema.
## concept_type
mechanism
## status
under review
## subject
resp
## primary_node_id
DIS-PHY-T03
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Gas exchange in the lung
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.7
## academic_relevance
0.8
## confidence
0.8
## topic
Physiology
## subtopic
Respiratory System
## aliases
Physiologic shunt | Bronchial circulation venous admixture
## article_ids
ART-104-PHY-GAS-EXCHANGE-AND-VQ-MATCHING
## support_mode
direct_statement
## original_wording
Deoxygenated blood in bronchial veins mixes with oxygenated blood in pulmonary vein, resulting in a physiologic shunt (shunt = venous blood mixed with oxygenated blood before it enters systemic circulation).
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-RES-317D54C114B246 | CON-CVS-76412894FAD01C
## related_article_ids
ART-104-PHY-AIRWAY-ANATOMY-AND-DEAD-SPACE
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-PULM-SHUNT-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
relatedArticleIds: The concept's own teaching article is on article_ids; further reading is chosen once the library for this module is complete.
<!-- ============================= ARTICLES (group resp-org-compliance-exchange) ============================= -->


---

# Item
## label
The Na+-K+ ATPase, the Ca++-ATPase and the Na+-Ca++ exchanger maintain cardiac myocyte ionic gradients, and the exchanger can reverse direction
## id
CON-CVS-7A8A04F61D44D1
## canonical_key
cardiac-sarcolemma.ionic-pumps-exchangers.resting-gradient-maintenance
## definition
Every action potential lets Na+ and Ca++ leak into the cardiac myocyte and K+ leak out; left uncorrected this would run down the very gradients the resting membrane potential depends on. Three sarcolemmal transport proteins correct this. The Na+-K+ ATPase pumps 3 Na+ out of the myocyte for every 2 K+ it pumps in, an unequal exchange that makes the pump electrogenic — it contributes a small outward current of its own rather than being electrically silent. A separate Ca++-ATPase pumps Ca++ out of the myocyte. The Na+-Ca++ exchanger normally exchanges 3 Na+ in for 1 Ca++ out, but its direction is not fixed: it can reverse and instead move Na+ out while bringing Ca++ in, whenever the intracellular Na+ concentration rises — for example when a drug such as digitalis inhibits the Na+-K+ ATPase.
## explicit_objective
Name the three sarcolemmal transporters that restore cardiac ionic gradients after each action potential, give the Na+-K+ ATPase's stoichiometry and say why it is electrogenic, and state the condition under which the Na+-Ca++ exchanger reverses direction.
## pitfalls
Treating the Na+-Ca++ exchanger as a one-way Ca++ exit pump. Its direction is set by the prevailing membrane potential and the ionic gradients at that moment, not fixed — reversal (Na+ out, Ca++ in) is exactly the mechanism by which a rise in intracellular Na+, such as from digitalis, raises intracellular Ca++.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.55
## academic_relevance
0.85
## confidence
0.80
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Cardiac sarcolemmal ion pumps | Na-Ca exchanger reversibility | Electrogenic Na-K ATPase
## article_ids
ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY
## support_mode
direct_statement
## original_wording
[Book p.2] This pump mechanism is electrogenic as it pumps 3 Na+ out of the myocyte for each 2 K+ pumped into the myocyte.
[Book p.2] 1- Na+-K+ ATPase: pumps Na+ out of the myocytes and pumps K+ in (at a ratio of 3Na+: 2 K+). 2- Ca++-ATPase: pumps Ca++ out of the myocytes. 3- Na+-Ca++ exchanger that exchanges 3 Na+ for 1 Ca++
[Book p.3] Na+-Ca++ exchanger can operate in both directions depending on the membrane potential and the concentration gradient for the ions: If excess Ca++ ions are present inside the myocyte: It moves Ca++ out the myocyte and brings Na+ in. If the intracellular Na+ concentration is increased (e.g. by inhibition of the activity of Na+-K+ ATPase by drugs such as digitalis): It moves Na+ out and brings Ca++ inside the myocytes.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-34D3CB7F794801
## related_article_ids
ART-104-PHY-CARDIAC-CONDUCTION
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-IONIC-PUMPS-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Filled with common exam/textbook phrasings for the same transporters.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
The pacemaker potential's phase 4 is a spontaneous depolarization carried by the funny current, T-type calcium channels and the sodium-calcium exchanger, unlike the stable phase 4 of working atrial and ventricular myocytes
## id
CON-CVS-34D3CB7F794801
## canonical_key
sa-node-pacemaker-potential.phase-4.ionic-basis
## definition
Phase 4 of the pacemaker action potential, also called the pre-potential, is a spontaneous gradual depolarization that begins at about -60 mV and is unique to pacemaker cells (the SA node, AV node and Purkinje fibres). Two currents drive it in sequence. First, from about -60 mV to -40 mV, Na+ funny channels activate and carry an inward Na+ current called the funny current (If), while the Na+-Ca++ exchanger — activated by a spontaneous release of Ca++ from the sarcoplasmic reticulum early in phase 4 — carries a further inward Na+ current (INCX). Second, from about -50 mV to -40 mV, transient (T-type) Ca++ channels activate and add an inward Ca++ current (ICaT); they are called transient because they inactivate rapidly after opening. This is the fundamental contrast with a working atrial or ventricular myocyte, whose own phase 4 is simply the stable resting membrane potential, held by a slow outward K+ leak, and which stays flat until it is depolarized by current arriving from an adjacent active cell.
## explicit_objective
Describe the two sequential inward currents that produce phase 4 of the pacemaker action potential (the funny current plus the Na+-Ca++ exchanger, then the T-type calcium current), and explain why only pacemaker cells show a spontaneously depolarizing phase 4 while working myocytes show a stable one.
## pitfalls
Assuming every cardiac cell has a spontaneously depolarizing phase 4. Only specialised pacemaker tissue (SA node, AV node, Purkinje fibres) does; ordinary atrial and ventricular myocytes have a flat, stable phase 4 and depolarize only when current arrives from a neighbouring cell.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.35
## academic_relevance
0.9
## confidence
0.85
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Funny current (If) | Pre-potential | Diastolic depolarization
## article_ids
ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY
## support_mode
direct_statement
## original_wording
[Book p.5-6] Phase 4: It is a spontaneous gradual depolarization. It is also known as the pre-potential. Begins at membrane potential about -60 mV. Ionic basis: 1st: influx of Na+ (inward Na+ current): (-60 mV -> -40mV) 1. Activation of Na+ funny channels -> conducts inward Na+ current "funny current (If)". 2. Activation of Na+-Ca++ exchanger -> conducts inward Na+ current (INCX): one Ca++ out in exchange with 3 Na+ in with a net influx of one positive charge carried by Na+.
[Book p.6] Activation of Na+-Ca++ exchanger during early part of phase 4 is due to spontaneous release of Ca++ from the sarcoplasmic reticulum of SA node cell. 2nd: influx of Ca++: inward Ca++ current (ICaT) Activation of transient or T-type Ca++ channels at -50 mV-> -40 mV. They are called transient channels because they rapidly inactivated after they open.
[Book p.11] Phase 4: Resting membrane potential. It continues till the cardiac myocytes become depolarized (normally by electric current from an adjacent active myocyte). During this phase, K+ slowly moves out of the myocyte (Ik1) through inward rectifying potassium channels.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-0AD04EE46FD2C5 | CON-CVS-802E52B82883CD | CON-CVS-AAAD34C16F9880
## related_article_ids
ART-104-PHY-CARDIAC-CONDUCTION
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-PACEMAKER-PHASE4-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Filled with the book's own named currents/phases.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Phase 0 of the pacemaker action potential is a slow upstroke through L-type calcium channels, which is why it is called the slow response action potential, and phase 3 is repolarization through delayed rectifier potassium channels
## id
CON-CVS-0AD04EE46FD2C5
## canonical_key
sa-node-pacemaker-potential.phase-0-and-3.ionic-basis
## definition
Phase 0 of the pacemaker action potential begins at the firing level, about -40 mV, once phase 4 has depolarized the cell that far. It is produced by activation of long-lasting (L-type) Ca++ channels, which are called long-lasting because they inactivate slowly once open, together with inactivation of the Na+ funny channels and the T-type Ca++ channels that drove phase 4. Because the movement of Ca++ through channels is not rapid, the rate of depolarization — the slope of phase 0 — is slower in pacemaker cells than in working cardiac myocytes, which is why the pacemaker action potential is called the "slow response action potential" (as opposed to the fast-response, Na+-channel-driven upstroke of ordinary myocytes). Phase 3 is the repolarization that follows, continuing until the membrane returns to about -60 mV; it is produced by an outward K+ current (Ik) through delayed rectifying K+ channels, along with inactivation of the L-type Ca++ channels. At -60 mV, the outward K+ current gradually inactivates and a new phase 4 begins, so the cycle repeats spontaneously.
## explicit_objective
State the ionic basis of phase 0 (L-type Ca++ channel activation) and phase 3 (delayed rectifier K+ efflux) of the pacemaker action potential, and explain why the pacemaker action potential is called the slow response action potential.
## pitfalls
Assuming the pacemaker action potential's upstroke uses the fast Na+ channels the way a working myocyte's does. The pacemaker upstroke (phase 0) is carried by L-type Ca++ channels, which open more slowly than fast Na+ channels — that is precisely why it is the "slow response" action potential.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.25
## academic_relevance
0.85
## confidence
0.85
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Slow response action potential | Pacemaker upstroke
## article_ids
ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY
## support_mode
direct_statement
## original_wording
[Book p.6] Phase 0: Begins at the firing level (about -40 mV). Ionic basis: 1. influx of Ca++ (more inward Ca++current) (ICaL): Activation of long-lasting or L-type Ca++ channels influx at -40 mV. 2. Inactivation of Na+ funny channels and T-type Ca++ channels. L-type Ca++ channels are called long lasting channels because they slowly inactivated after they open.
[Book p.6] Why Pacemaker action potential is known as "slow response action potential"? Because its rate of depolarization (i.e. slope of Phase 0) is slower than cardiomyocytes action potential, as the movement of Ca++ through channels is not rapid.
[Book p.6] Phase 3: This is the repolarization phase -> continues till -60 mV. Ionic basis: 1. efflux of K+ (outward K+ current (Ik): along concentration and electrical gradients: Activation of delayed rectifying K+ channels. 2. Inactivation of L-type Ca++ channels. At -60mV: outward K+ current (Ik) becomes gradually inactivated and a new phase 4 is initiated and the whole cycle is spontaneously repeated on and on again.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-34D3CB7F794801 | CON-CVS-802E52B82883CD
## related_article_ids
ART-104-PHY-CARDIAC-ACTION-POTENTIAL: the fast-response, Na+-channel-driven upstroke this concept is contrasted against
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-PACEMAKER-UPSTROKE-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Filled with the book's own named terms.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
The SA node discharges faster than the AV node and Purkinje fibres, so it normally suppresses them, and a slower tissue only takes over as an escape pacemaker if the faster one above it fails
## id
CON-CVS-802E52B82883CD
## canonical_key
cardiac-pacemaker-hierarchy.intrinsic-rates.sa-av-purkinje
## definition
The three pacemaker tissues of the heart discharge action potentials at different intrinsic rates: the SA node at about 90-105/min, the AV node at about 60/min, and Purkinje cells at about 20-40/min. Because the SA node is faster than the natural rhythm of every other pacemaker tissue in the heart, it suppresses them and acts as the heart's normal pacemaker. This hierarchy is also a safety mechanism: if the SA node cells fail, the AV node cells become the pacemaker instead; if the AV node also fails, the Purkinje cells take over. Each tissue further down the hierarchy is progressively slower.
## explicit_objective
Give the approximate intrinsic discharge rates of the SA node, AV node and Purkinje fibres, and explain why the SA node is normally the heart's pacemaker and what happens if it, or the AV node, fails.
## pitfalls
Thinking the AV node or Purkinje fibres are incapable of initiating a heartbeat on their own. Both can — they simply discharge more slowly than the SA node under normal conditions and are suppressed by it; either can become an escape pacemaker if the faster tissue above it fails.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.6
## academic_relevance
0.85
## confidence
0.85
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Escape pacemaker | SA node dominance | Pacemaker rate hierarchy
## article_ids
ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY
## support_mode
direct_statement
## original_wording
[Book p.7] The normal pacemaker of the human heart is the SA node i.e., they control heart rate. SA node discharge action potentials at a rate of about 90-105/min. AV node discharge action potentials at a rate of about 60/min. Purkinje cells discharge at rate of about 20-40/min. So, SA node is faster than the natural rhythm of all other pacemaker tissues in the heart -> suppresses other pacemaker tissues.
[Book p.7] If the SA node cells fail -> AV node cells will become the pacemaker. If the AV node fails -> the Purkinje cells will become the pacemaker
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-34D3CB7F794801 | CON-CVS-0AD04EE46FD2C5
## related_article_ids
ART-104-PHY-CARDIAC-CONDUCTION
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-PACEMAKER-HIERARCHY-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Filled with common exam phrasing for this hierarchy.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Sympathetic activity raises heart rate and conduction velocity while parasympathetic activity lowers both, and a dominant resting vagal tone keeps heart rate below the SA node's own intrinsic rate
## id
CON-CVS-AAAD34C16F9880
## canonical_key
autonomic-nervous-system.heart-rate-and-conduction-velocity.chronotropy-dromotropy
## definition
Sympathetic and parasympathetic activity act on the same two cardiac electrical properties in opposite directions. On rate: sympathetic activity, through norepinephrine acting on β1-adrenoreceptors and raising cAMP, increases the funny current and so speeds SA node discharge — positive chronotropy, causing tachycardia. Parasympathetic (vagal) activity has the opposite effect on the SA node, lowering the discharge rate — negative chronotropy, causing bradycardia. On conduction: sympathetic stimulation, again through β1 receptors, increases ionic conductance and so the upstroke velocity of action potentials, speeding conduction through the conducting system (positive dromotropy); parasympathetic stimulation, through muscarinic receptors, decreases ionic conductance and slows conduction (negative dromotropy). Under normal resting conditions the parasympathetic effect on the SA node is the stronger of the two — the "vagal tone" — which is why the normal resting heart rate is only about 72 beats/minute, slower than the SA node's own intrinsic discharge rate of 90-105 beats/minute.
## explicit_objective
State the opposite effects of sympathetic and parasympathetic activity on both heart rate (chronotropy) and conduction velocity (dromotropy), name the receptors and second messenger involved for each, and explain why the resting heart rate (about 72/min) is slower than the SA node's intrinsic rate (90-105/min).
## pitfalls
Assuming the resting heart rate equals the SA node's intrinsic discharge rate. It does not: a dominant resting vagal tone continuously brakes the SA node, so the measured resting rate (about 72/min) sits well below the node's own unopposed rate (90-105/min).
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.65
## academic_relevance
0.85
## confidence
0.85
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Chronotropy and dromotropy | Vagal tone | Positive and negative chronotropic effects
## article_ids
ART-104-PHY-CARDIAC-CONDUCTION
## support_mode
direct_statement
## original_wording
[Book p.7] A- Sympathetic activity: increases the rate of discharge SA node -> increases the heart rate (tachycardia) (Positive chronotropy). Mechanism: Norepinephrine released by sympathetic nerve terminals at SA node binds to beta1-adrenoreceptors -> generation of c-AMP -> increase in funny current.
[Book p.7] B- Parasympathetic (vagal) activity: decreases the rate of discharge SA node -> decreases the heart rate (bradycardia) (Negative chronotropy).
[Book p.8] Under normal resting conditions, the parasympathetic (vagal) effect on SA node is stronger than sympathetic effect. "the vagal tone". Decreasing SA discharge rate (60 - 100)/min. So the normal resting heart rate is about 72 beats/minute (slower than the intrinsic rate of discharge of the SA node (90-105 beats/minute).
[Book p.10] 1. Sympathetic stimulation: increases the velocity of conduction by beta1 adrenergic receptors. Mechanism: increasing ionic conductance -> faster upstroke velocity of action potentials. 2. Parasympathetic stimulation: decreases the velocity of conduction by muscarinic receptors. Mechanism: decreasing ionic conductance -> slower upstroke velocity of action potentials.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-11E581298A0B95
## related_article_ids
ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-AUTONOMIC-CHRONOTROPY-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Filled with the book's own named terms.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Conduction velocity is slowest through the AV node and fastest through the Purkinje fibres, and the slow AV nodal delay gives the atria time to empty before ventricular contraction begins
## id
CON-CVS-11E581298A0B95
## canonical_key
cardiac-conduction-system.regional-velocity.av-nodal-delay
## definition
Action potentials spread cell to cell through gap junctions at the intercalated discs, whose low electrical resistance allows rapid transmission of charge between neighbouring myocytes. Conduction velocity is not uniform across the conducting system: it is about 1 m/sec along the internodal bundles that carry the impulse from the SA node toward the AV node, but within the AV node itself it slows sharply to about 0.05 m/sec. From the AV node the impulse enters the bundle of His and the bundle branches at a rapid 2 m/sec, and the Purkinje fibre network then conducts it throughout the ventricles at a high 4 m/sec, spreading from the subendocardial to the epicardial surface so that the action potential reaches essentially all ventricular myocytes at almost the same time. The AV node's slow conduction is not a design flaw: it gives the atria enough time to finish contracting and empty their blood into the ventricles before ventricular contraction begins, and in disease it also limits how many rapid atrial impulses can be transmitted to the ventricles per minute.
## explicit_objective
Rank the conduction velocities through the internodal bundles, the AV node, the bundle of His/bundle branches and the Purkinje fibres, and give the two functional reasons the book gives for why slow AV nodal conduction matters.
## pitfalls
Treating the AV nodal delay as simply "conduction is slow there" without knowing why it matters. The book gives two concrete reasons: it lets the atria finish emptying into the ventricles before ventricular systole starts, and it protects the ventricles by capping how many atrial impulses per minute can reach them when the atrial rate is abnormally fast.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.6
## academic_relevance
0.85
## confidence
0.85
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
AV nodal delay | Conduction velocities of the conducting system
## article_ids
ART-104-PHY-CARDIAC-CONDUCTION
## support_mode
direct_statement
## original_wording
[Book p.9] Occurs by direct electric conduction from cell to cell. Cause: presence of gap junctions at the intercalated discs between different cardiac cells. Gap junctions have low electric resistance -> rapid transmission of charges from one cell to its neighbor.
[Book p.9] From SA node through the atrial myocytes = 0.5 m/sec. Special conduction tracts known as internodal bundles (figure 1-2) from SA node to AV node has a faster speed=1 m/sec. Within the AV node: it is slow = 0.05 m/sec.
[Book p.9] Slow Conduction within AV node is important for two reasons: 1) This gives the atria enough time to finish their contraction and empty their blood into the ventricles before ventricular contraction begins. 2) In some diseases, there is a very rapid rate of action potentials in the atria which may be harmful (not give the ventricles enough time between beats to adequately fill with blood). The low conduction velocity at AV node -> limit the frequency of impulses from atria to the ventricle.
[Book p.10] From the AV node enter the base of the ventricle through the bundle of His and then give the left and right bundle branches to the left and right ventricles: conduction velocity is rapid = 2 m/sec. The bundle branches divide into an extensive system of Purkinje fibers that conduct the impulses throughout the ventricles at high speed = 4 m/sec (conduction occurs from subendocardial to epicardial parts, i.e., from inside out). So the action potentials reach all ventricular myocytes almost at the same time.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-AAAD34C16F9880
## related_article_ids
ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CONDUCTION-VELOCITY-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Filled with common exam phrasing for this material.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
The absolute and relative refractory periods of the cardiac myocyte action potential span almost the whole of contraction, which prevents the sustained tetanic contractions seen in skeletal muscle
## id
CON-CVS-5288011D93888B
## canonical_key
cardiac-myocyte-action-potential.refractory-periods.arp-rrp-supernormal
## definition
The cardiac myocyte passes through three excitability states after it fires. During the absolute refractory period (ARP) the myocyte cannot be re-excited by any stimulus, because the inactivation gates of the fast Na+ channels are still closed; the ARP spans phases 0, 1 and 2 and part of phase 3, down to about -50 mV. It is followed by the relative refractory period (RRP), which lasts until about -75 mV and during which only a supra-threshold (stronger than normal) stimulus can elicit a new action potential. Late in phase 3, before the membrane is fully repolarized, there is a brief supernormal period in which the myocyte can respond to a weaker-than-normal stimulus; this is also called the vulnerable period, because many cardiac arrhythmias can be triggered during it. Because of the plateau (phase 2), the cardiac myocyte's refractory period is much longer than a skeletal myocyte's, and it occupies almost the whole period of contraction and the early part of relaxation. This is functionally important: it prevents the heart from developing the sustained, tetanic contractions seen in skeletal muscle, which would not suit a pump that has to fill between beats.
## explicit_objective
Name the three excitability phases that follow a cardiac action potential (absolute refractory, relative refractory, supernormal/vulnerable period), state what defines each, and explain why a long refractory period is functionally necessary for a pump.
## pitfalls
Treating the long cardiac refractory period as an incidental fact rather than a functional necessity. It is what stops the heart from being tetanised the way skeletal muscle can be — a tetanised ventricle could not relax and fill between beats.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.5
## academic_relevance
0.9
## confidence
0.85
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Absolute refractory period | Relative refractory period | Supernormal period | Vulnerable period
## article_ids
ART-104-PHY-CARDIAC-CONDUCTION
## support_mode
direct_statement
## original_wording
[Book p.14] The absolute refractory period (ARP): Cardiac myocytes are refractory to initiation of new action potentials (i.e., unexcitable). Cause: Inactivation gates of fast Na+ channels are still closed. It includes: phases 0, 1, 2, and part of phase 3 ( at about -50 mv).
[Book p.14] The relative refractory period (RRP): A supra-threshold stimulus is required to elicit action potential. It follows the absolute refractory period till about -75 mv.
[Book p.14] The supernormal period: The myocyte can respond to a weaker stimulus than normal. It occurs during the late part of phase 3. It follows RRP until the membrane is fully repolarized. It is also known as the vulnerable period because many cardiac arrhythmias can be initiated during this period.
[Book p.14] The refractory period in cardiac myocytes is much longer than that in skeletal myocytes. Why? - due to the presence of plateau in cardiac myocytes action potential. What is the importance of long refractory period in cardiac myocytes? The long refractory period occupies the whole period of contraction and early part of relaxation. This prevents the heart from developing sustained, tetanic contractions like those that occur in skeletal muscle. Such sustained contraction is not suitable for the pumping function of the heart.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
[clear]
## related_article_ids
ART-104-PHY-CARDIAC-ACTION-POTENTIAL: the phase-1/phase-2 plateau this concept's long refractory period arises from
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-REFRACTORY-TETANUS-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Filled with the book's own named periods.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Excitation-contraction coupling in cardiac muscle is calcium-induced calcium release: a small trigger influx of calcium through L-type channels opens ryanodine receptors and releases a much larger store of calcium from the sarcoplasmic reticulum
## id
CON-CVS-71212213BD80F3
## canonical_key
cardiac-excitation-contraction-coupling.calcium-induced-calcium-release.mechanism
## definition
Membrane depolarization of the cardiac myocyte opens L-type Ca++ channels in the sarcolemma and T-tubules, letting a small amount of Ca++ enter and raise the Ca++ concentration in the region just inside the sarcolemma. This local rise is sensed by the ryanodine-sensitive calcium release channel (the ryanodine receptor, RyR) in the terminal cisterns of the sarcoplasmic reticulum, and it triggers the release of a much larger amount of Ca++ from the sarcoplasmic reticulum — a process the book names "calcium-induced calcium release." The released Ca++ binds troponin-C and permits actin-myosin interaction and contraction, as in skeletal muscle. As the action potential ends and Ca++ release falls, relaxation begins once Ca++ is removed from the cytoplasm and dissociates from troponin-C. Three mechanisms remove it: the sarco-endoplasmic reticulum reuptakes Ca++ through the ATP-dependent SERCA pump, whose activity is normally held in check by the inhibitory protein phospholamban (phosphorylating phospholamban relieves this inhibition and speeds reuptake); the sarcolemmal Na+-Ca++ exchanger moves Ca++ out of the myocyte; and a separate ATP-dependent Ca++ pump in the sarcolemma also removes it.
## explicit_objective
Trace excitation-contraction coupling step by step from membrane depolarization to actin-myosin interaction, name the process by which a small trigger Ca++ influx releases a much larger store ("calcium-induced calcium release"), and list the three mechanisms that remove Ca++ from the cytoplasm during relaxation.
## pitfalls
Describing the Ca++ that enters through L-type channels as the Ca++ that directly activates troponin-C. It is mostly a trigger: it opens the ryanodine receptor, and the much larger pool of Ca++ that actually saturates troponin-C comes from the sarcoplasmic reticulum.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.55
## academic_relevance
0.9
## confidence
0.85
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Calcium-induced calcium release | Ryanodine receptor | SERCA and phospholamban
## article_ids
ART-104-PHY-CARDIAC-MECHANICS
## support_mode
direct_statement
## original_wording
[Book p.15] 1- Membrane depolarization: -> opening of L-type Ca++ channels (in sarcolemma and T-tubules) -> entry of small amount of Ca++ inside the myocyte. This increases Ca++ concentration in local region just inside the sarcolemma. 2- This Ca++ is sensed by calcium release channel in the terminal cisterns of the sarco-endoplasmic reticulum (known as "ryanodine-sensitive calcium release channel" or "ryanodine receptor RyR").
[Book p.16] 3- This triggers the release of large amount of Ca++ from the sarcoplasmic reticulum. This is known as "Calcium-induced Calcium release". 4- Ca++ binds to Troponin-C and starts the steps of interaction between actin and myosin leading to contraction as described for skeletal muscle.
[Book p.16] 7- Calcium is removed from the cytoplasm by the following mechanisms: a. Sarco-endoplasmic reticulum actively reuptakes Ca++ by ATP-dependent calcium pump known as sarco-endoplasmic reticulum calcium ATPase (SERCA). The activity of SERCA is physiologically regulated by an inhibitory protein called phospholamban (PLN). Phosphorylation of PLN decreases its inhibitory effect on SERCA thus increasing calcium uptake by the sarcoplasmic reticulum. b. Calcium is transported out of the myocyte by Na+-Ca++ exchanger located in the sarcolemma. c. Calcium is also transported out of the myocyte by ATP-dependent calcium pump located in sarcolemma.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-BF82D6F52B72C9 | CON-CVS-7A8A04F61D44D1
## related_article_ids
ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-EC-COUPLING-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Filled with the book's own named terms.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Beta-adrenergic stimulation raises cytoplasmic calcium through Protein Kinase A to increase both contractile force (positive inotropy) and the speed of relaxation (lusitropy), while hypoxia and ischaemia impair both
## id
CON-CVS-BF82D6F52B72C9
## canonical_key
cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms
## definition
Stimulation of beta-adrenergic receptors, whether by sympathetic nerve stimulation or by circulating catecholamines, raises cAMP inside the myocyte and activates Protein Kinase A (PKA). PKA increases cytoplasmic Ca++ by two routes: it phosphorylates the L-type Ca++ channel so it stays open longer, admitting more Ca++, and it phosphorylates the ryanodine receptor so more Ca++ is released from the sarcoplasmic reticulum — together producing a positive inotropic effect (greater contractile force). The same PKA activation also speeds relaxation (a positive lusitropic effect): phosphorylating phospholamban removes its inhibition of SERCA, so Ca++ is pumped back into the sarcoplasmic reticulum faster, and PKA also decreases troponin's binding to Ca++. Contractility and relaxation can also be impaired together: hypoxia inhibits the ATP production that contraction depends on, and myocardial ischaemia — through ATP deficiency that slows the pumps that remove cytoplasmic Ca++ — causes both weak contraction and poor relaxation, because the excess Ca++ that accumulates cannot detach from troponin.
## explicit_objective
Trace the beta-adrenergic-cAMP-PKA pathway from receptor stimulation to its two separate downstream effects — more Ca++ entering/being released (positive inotropy) and faster Ca++ removal (positive lusitropy) — and explain why myocardial ischaemia produces both weak contraction and poor relaxation together.
## pitfalls
Treating inotropy and lusitropy as unrelated. The book's own mechanism links them: the same beta-adrenergic-cAMP-PKA cascade that increases contractile force by raising cytoplasmic Ca++ also speeds relaxation, by phosphorylating phospholamban to accelerate SERCA-mediated Ca++ removal.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.65
## academic_relevance
0.85
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Positive and negative inotropic mechanisms | Lusitropy | Myocardial ischaemia and relaxation
## article_ids
ART-104-PHY-CARDIAC-MECHANICS
## support_mode
direct_statement
## original_wording
[Book p.17] 1- Stimulation of beta-adrenergic receptors (by sympathetic nerve stimulation or by catecholamines in blood): Formation of c-AMP inside the myocyte -> activates Protein Kinase A -> increases cytoplasmic Ca++ of the myocyte by the following mechanisms: a. Protein Kinase A phosphorylates L-type Ca++ channel in sarcolemma -> channel remains open for a longer time -> more Ca++ enters the myocyte. b. Protein Kinase A phosphorylates ryanodine-sensitive calcium release channel on sarco-endoplasmic reticulum -> more release of Ca++.
[Book p.17] 1- Hypoxia of the myocytes: inhibits ATP production (the source of energy for muscle contraction).
[Book p.18] 1- Activation of beta-adrenergic receptors: (production of c-AMP and activation of protein kinase A) can accelerate relaxation by the following mechanisms: a. Activation of the SERCA pump (by phosphorylation of phospholamban -> decrease of its inhibitory effect on SERCA) -> rapid removal of Ca++ by sarcoplasmic reticulum -> rapid relaxation. b. Decreased binding of Troponin to Ca++.
[Book p.18] 2 - Myocardial ischemia inhibits relaxation. Ischemia is associated with deficiency of ATP -> decreased activity of pump mechanisms that remove Ca++ from the cytoplasm -> Intracellular Ca++ increases. Excessive accumulation of Ca++ in the cytoplasm inhibits the detachment of Ca++ from troponin l -> inhibition of relaxation. This means that myocardial ischemia causes weak contraction and poor relaxation.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication. The book lists adenosine and Ca++-channel-blocking drugs as additional negative inotropic mechanisms and glucagon and raised extracellular Ca++ as additional positive ones; this concept covers only the beta-adrenergic/PKA pathway and hypoxia/ischaemia, the two the article's claim is built on, so the others are not repeated here to avoid diluting a single claim.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-71212213BD80F3
## related_article_ids
ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-INOTROPY-LUSITROPY-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Filled with the book's own named terms.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Frank-Starling's law states that isometric tension rises in direct proportion to the muscle's stretch (its preload), and in isolated cardiac muscle a higher preload increases both the degree and the velocity of shortening
## id
CON-CVS-CEB3B0EC313DC9
## canonical_key
cardiac-muscle-length-tension.frank-starling-law.preload-effect-on-shortening
## definition
Passive stretching of cardiac muscle raises the tension within it even before contraction (the passive length-tension relationship). Superimposed on this, the maximum tension the muscle develops during an isometric contraction is directly proportional to how far it has been stretched (the active length-tension relationship). Frank-Starling's law states this formally: within limits, the tension developed during isometric contraction of cardiac muscle is directly proportional to the degree of stretching of the muscle, i.e. to its preload. In an isolated cardiac muscle preparation this shows up in two related ways: the degree of shortening is directly proportional to preload, because a higher preload stretches the muscle to a greater starting length, and a higher preload also increases the velocity of shortening at any given afterload — so at any level of afterload, a more stretched cardiac muscle contracts both further and faster.
## explicit_objective
State the Frank-Starling law in terms of isometric tension and stretch (preload), and describe preload's separate effects on the degree and the velocity of shortening of isolated cardiac muscle.
## pitfalls
Treating "preload increases the degree of shortening" and "preload increases the velocity of shortening" as the same statement. The book gives them as two separate effects of raising preload on isolated muscle performance, not one restated twice.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.55
## academic_relevance
0.85
## confidence
0.85
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Frank-Starling law | Length-tension relationship in cardiac muscle | Preload and isolated muscle shortening
## article_ids
ART-104-PHY-CARDIAC-MECHANICS
## support_mode
direct_statement
## original_wording
[Book p.19] Passive length-tension relationship: Passive stretching of cardiac muscle -> rise of tension within the muscle. Active length-tension relationship: the maximum tension developed during isometric contraction is directly proportional to the degree of stretching of the muscle.
[Book p.19] Frank-Starling Law: This law states that, within limits, tension developed during isometric contraction is directly proportional to the degree of stretching of the muscle (i.e., preload).
[Book p.20] 2- Effect of changing preload on isolated cardiac muscle performance: - Effect of changes in preload on muscle shortening: The degree of muscle shortening is directly proportional to preload. Increasing preload will stretch the muscle to a higher length. Higher preload increases the velocity of shortening for any value of load.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-BE5C24D066F705
## related_article_ids
ART-CVS-CARDIAC-OUTPUT: the article carrying afterload's own definition and its separate effect on isolated cardiac muscle performance
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-FRANK-STARLING-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Filled with the book's own named terms.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Raising the frequency of cardiac muscle stimulation gradually increases the force of contraction over the first few beats until a new steady state is reached, a phenomenon called the staircase phenomenon or treppe
## id
CON-CVS-BE5C24D066F705
## canonical_key
cardiac-muscle-contraction-frequency.staircase-phenomenon.treppe
## definition
Increasing the frequency at which cardiac muscle is stimulated produces a gradual, stepwise increase in the force of contraction over the first few contractions — an effect the book calls increased inotropy. This continues until a new, higher steady-state level of contractile force is reached, and that higher force is then sustained for as long as the high stimulation frequency is maintained; the phenomenon is called the "staircase phenomenon" or "treppe." Decreasing the frequency has the opposite effect. The cause is that rapid repetition of contractions shortens the interval between one contraction and the next, leaving too little time for complete removal of the Ca++ released by the previous beat; Ca++ therefore accumulates in the cytoplasm of the myocytes across successive beats, and this accumulated Ca++ is what raises the force of contraction.
## explicit_objective
Describe the staircase phenomenon (treppe): what happens to contractile force as stimulation frequency rises, how long the effect takes to reach a new steady state, and the calcium-accumulation mechanism that causes it.
## pitfalls
Assuming treppe is caused by a change in the calcium channels or receptors themselves. The book's stated cause is simpler and purely kinetic: shorter intervals between beats leave incomplete time for calcium removal, so calcium accumulates in the cytoplasm from one beat to the next.
## concept_type
mechanism
## status
under review
## subject
cvs
## primary_node_id
DIS-PHY-T02
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.25
## academic_relevance
0.7
## confidence
0.8
## topic
Physiology
## subtopic
Cardiovascular System
## aliases
Treppe | Staircase phenomenon | Frequency effect on cardiac contraction
## article_ids
ART-104-PHY-CARDIAC-MECHANICS
## support_mode
direct_statement
## original_wording
[Book p.20] 4- Effect of changing frequency of stimulation on force of contractions: Increasing the frequency of stimulation of cardiac muscle -> gradual increase in force of contractions (increased inotropy) over the first few contractions. This continues till a new higher steady state is reached and this higher level of force of contraction is maintained as long as the high frequency of stimulation is maintained. This is called "staircase phenomenon" or "treppe". Decreasing frequency has an opposite effect.
[Book p.20] Cause: Rapid repetition of contractions -> the time between each contraction and the next one is short and is not enough for complete removal of released Ca++-> Ca++ will accumulate in the cytoplasm of the myocytes and the force of contraction will increase.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-CVS-CEB3B0EC313DC9
## related_article_ids
ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-TREPPE-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Filled with the book's own named terms.
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
exam_signal: No exam-paper occurrence on record for this concept; hand-authored from the department book's own coverage, not from a paper sitting.
exam_weight_by_year: No per-year exam weight on record; see weight_confidence.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.


---

# Item
## label
About 98% of blood oxygen is carried bound to haemoglobin rather than dissolved, and P50 — the PO2 at which haemoglobin is 50% saturated, normally 27 mmHg — is the single number that marks where the dissociation curve sits
## id
CON-RES-228D7C6B6FDE80
## canonical_key
oxygen-transport.content-capacity-and-p50
## definition
Oxygen is carried in blood in two forms: physically dissolved (about 0.3 ml O2/100 ml arterial blood, which sets the blood PO2 and so the direction of diffusion) and bound to haemoglobin (about 19.5 ml O2/100 ml arterial blood, about 98% of the total, the main supply for tissue needs). O2 content is the volume of O2 actually combined with haemoglobin per 100 ml blood, and varies with the amount of haemoglobin present; O2 capacity is the maximum volume haemoglobin could carry if fully saturated (1.34 ml O2 per gram of Hb, giving about 20.1 ml O2/100 ml at a normal 15 g Hb/100 ml) — percentage saturation itself does not fall in anaemia, because content and capacity fall together. P50 is the PO2 at which haemoglobin is 50% saturated, normally 27 mmHg, and is the single value used to describe where the dissociation curve sits: a lower P50 means higher O2 affinity (curve shifted left), a higher P50 means lower affinity (curve shifted right).
## explicit_objective
Distinguish O2 content from O2 capacity, calculate O2 capacity from hameoglobin concentration, and define P50 and what a lower or higher P50 means for haemoglobin's O2 affinity.
## pitfalls
Assuming percentage O2 saturation falls in anaemia the way O2 content does. Saturation is a ratio of content to capacity, and anaemia lowers both together, leaving percentage saturation normal even though the blood carries less O2 in absolute terms.
## concept_type
definition
## status
under review
## subject
resp
## primary_node_id
DIS-PHY-T03
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Gas Transport by the Blood
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.35
## exam_weight_by_year
KAU_Y1=0.35
## clinical_relevance
0.7
## academic_relevance
0.85
## confidence
0.85
## topic
Physiology
## subtopic
Respiratory System
## aliases
O2 content versus O2 capacity | P50
## article_ids
ART-104-PHY-OXYGEN-CONTENT-AND-CO2-TRANSPORT
## support_mode
direct_statement
## original_wording
P50 is the PO2 at which hemoglobin is 50% saturated with oxygen... The normal P50 for human blood is 27 mmHg.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-RES-D95A9FD64ABF25
## related_article_ids
ART-104-PHY-RESPIRATORY-CENTERS-AND-CHEMORECEPTORS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-O2CONTENT-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
CO2 is carried in blood as dissolved gas, as carbamino compounds and, mostly, as bicarbonate formed inside red cells, with chloride shifting into the cell to preserve electrical balance as bicarbonate leaves
## id
CON-RES-9D54E7538F395C
## canonical_key
co2-transport.forms-and-chloride-shift
## definition
CO2 is carried in three forms: physically dissolved (about 3 ml/100 ml arterial blood, setting the blood PCO2), as carbamino compounds (about 3 ml/100 ml, formed by CO2 reacting with terminal amine groups mainly on haemoglobin), and as bicarbonate (about 42 ml/100 ml, the largest share) — carbonic anhydrase inside red blood cells accelerates CO2 + H2O to H2CO3, which dissociates to H+ and HCO3-, with deoxyhaemoglobin buffering the H+. As bicarbonate accumulates inside the red cell it diffuses out into plasma down its concentration gradient, and because the red cell membrane is far more permeable to anions than cations, chloride moves from plasma into the cell to preserve electrical balance — the chloride shift — raising red cell chloride and osmotic pressure (drawing water in, and so raising the venous haematocrit slightly) while lowering plasma chloride.
## explicit_objective
List the three forms CO2 is carried in with their approximate proportions, and explain the chloride shift — what moves, in which direction, and why.
## pitfalls
Assuming bicarbonate formation happens mainly in plasma. It is slow in plasma and fast inside the red cell because of carbonic anhydrase; that is exactly why bicarbonate then has to diffuse back out to plasma, and why chloride has to shift in to replace the charge it takes with it.
## concept_type
mechanism
## status
under review
## subject
resp
## primary_node_id
DIS-PHY-T03
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Gas Transport by the Blood
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.35
## exam_weight_by_year
KAU_Y1=0.35
## clinical_relevance
0.6
## academic_relevance
0.85
## confidence
0.85
## topic
Physiology
## subtopic
Respiratory System
## aliases
Hamburger phenomenon | Carbonic anhydrase
## article_ids
ART-104-PHY-OXYGEN-CONTENT-AND-CO2-TRANSPORT
## support_mode
direct_statement
## original_wording
Since the K+ cannot move in association with HCO3- (because RBCs membrane is more permeable to anions than to cations), electrical balance is maintained by movement of chloride anions from plasma to RBCs. This exchange of anions is known as Chloride shift phenomenon.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-RES-1488F775DCD49E
## related_article_ids
ART-104-PHY-RESPIRATORY-CENTERS-AND-CHEMORECEPTORS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CHLORIDESHIFT-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
At any given CO2 tension, reduced (deoxygenated) haemoglobin carries more CO2 than oxygenated haemoglobin does — the Haldane effect — so unloading O2 at the tissues directly helps haemoglobin pick up CO2, and loading O2 at the lungs helps it let CO2 go
## id
CON-RES-1488F775DCD49E
## canonical_key
haldane-effect.co2-carriage-and-oxygenation
## definition
The Haldane effect is the fact that, at a given CO2 tension, reduced haemoglobin carries more CO2 than oxygenated haemoglobin does — binding of O2 to haemoglobin lowers its affinity for CO2. This works in both directions: at the tissues, as haemoglobin gives up O2 it becomes better able to carry CO2 (as carbamino compounds and, by buffering H+, as bicarbonate), and at the lungs, as haemoglobin binds O2 it becomes a poorer CO2 carrier and a poorer buffer, releasing H+ that combines with bicarbonate to reform CO2 for exhalation. It is the mirror image of the Bohr effect, in which CO2/H+ lowers haemoglobin's affinity for O2.
## explicit_objective
State the Haldane effect and explain how it helps CO2 loading at the tissues and CO2 unloading at the lungs, and distinguish it from the Bohr effect.
## pitfalls
Confusing the Haldane effect with the Bohr effect. The Bohr effect is CO2/H+ changing haemoglobin's affinity for O2; the Haldane effect is the reverse pairing — O2 changing haemoglobin's affinity for CO2. They are complementary, not the same fact stated twice.
## concept_type
mechanism
## status
under review
## subject
resp
## primary_node_id
DIS-PHY-T03
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Gas Transport by the Blood
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.5
## academic_relevance
0.8
## confidence
0.85
## topic
Physiology
## subtopic
Respiratory System
## aliases
Haldane effect
## article_ids
ART-104-PHY-OXYGEN-CONTENT-AND-CO2-TRANSPORT
## support_mode
direct_statement
## original_wording
At any given CO2 tension reduced Hb carries more CO2 than oxygenated Hb.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-RES-9D54E7538F395C | CON-RES-D95A9FD64ABF25
## related_article_ids
ART-104-PHY-RESPIRATORY-CENTERS-AND-CHEMORECEPTORS
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-HALDANE-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
The dorsal respiratory group drives normal quiet breathing alone, the ventral respiratory group activates only for forced breathing, and the pontine apneustic and pneumotaxic centres tune the medullary rhythm rather than generating it
## id
CON-RES-A54FECB95CBEBC
## canonical_key
respiratory-center.drg-vrg-pontine-groups-and-rhythm-generation
## definition
The respiratory centre is a bilateral collection of inspiratory and expiratory neurons in the pons and medulla, reciprocally inhibiting each other, with basic rhythm generated by pacemaker neurons in the medullary pre-Botzinger complex. The dorsal respiratory group (DRG, in and around the nucleus of the tractus solitarius) is the primary inspiratory centre: it fires continuous rhythmic signals to the inspiratory muscles during normal quiet breathing and has its own slow, irregular inherent rhythmicity, finely tuned by the pontine centres. The ventral respiratory group (VRG, around the nucleus ambiguus) carries both inspiratory and expiratory neurons but is totally inactive during quiet breathing, activating only during forced breathing to drive expiratory and accessory inspiratory muscles. Two pontine centres regulate the medulla: the apneustic centre (lower pons) sends tonic excitatory drive to the DRG, and — if it loses its own inhibitory input — produces apneusis (prolonged inspiratory gasps interrupted by occasional expirations); the pneumotaxic centre (upper pons) sends inhibitory signals to the DRG and apneustic centre, switching off inspiration and starting expiration, thereby setting the rate and depth of breathing.
## explicit_objective
Name the four groups of the respiratory centre (DRG, VRG, apneustic centre, pneumotaxic centre), state which is active during quiet breathing versus forced breathing, and explain what apneustic breathing reveals about the apneustic centre's role.
## pitfalls
Assuming the ventral respiratory group is active during normal quiet breathing because it is a "respiratory centre" too. It is totally inactive at rest; the DRG alone drives quiet breathing, and the VRG only switches on for forced breathing (exercise, hyperventilation).
## concept_type
mechanism
## status
under review
## subject
resp
## primary_node_id
DIS-PHY-T03
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Control of Respiration
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.4
## exam_weight_by_year
KAU_Y1=0.4
## clinical_relevance
0.6
## academic_relevance
0.9
## confidence
0.85
## topic
Physiology
## subtopic
Respiratory System
## aliases
DRG | VRG | Apneustic centre | Pneumotaxic centre | Pre-Botzinger complex
## article_ids
ART-104-PHY-RESPIRATORY-CENTERS-AND-CHEMORECEPTORS
## support_mode
direct_statement
## original_wording
DRG is the Primary inspiratory center. It has inherent rhythmicity, however, irregular and slow, so its activity is finely modified by pontine centers.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-RES-B68E39C6B4178F | CON-RES-C6F65BAAC06FAA
## related_article_ids
ART-104-PHY-OXYGEN-CONTENT-AND-CO2-TRANSPORT
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-RESPCENTER-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
Central chemoreceptors provide 75-80% of resting respiratory drive, responding to CSF H+ generated when CO2 (not H+ itself) crosses the blood-brain barrier, while peripheral chemoreceptors provide the remaining 20-25%, monitoring arterial PO2 directly and switching on sharply only once PO2 falls below about 60 mmHg
## id
CON-RES-C6F65BAAC06FAA
## canonical_key
chemoreceptors-respiratory.central-and-peripheral-drive-contributions
## definition
Central (medullary) chemoreceptors, just beneath the ventral medullary surface and protected by the blood-brain barrier, provide about 75-80% of resting respiratory drive; their direct stimulus is H+ in the CSF, which plasma H+ cannot reach because the barrier excludes charged particles, so CO2 stimulates them only indirectly, by crossing the barrier freely and hydrating to carbonic acid, which dissociates to H+ and lowers CSF pH — a mechanism made highly sensitive by the CSF's very low protein buffering capacity. Peripheral chemoreceptors (glomus cells in the carotid bodies, carried by the glossopharyngeal/Hering's nerve, and aortic bodies, carried by the vagus) provide the remaining 20-25% of drive; their very high blood flow lets them sense dissolved PO2 directly rather than O2 content, so they are unaffected by anaemia or carbon monoxide poisoning, and they are almost insensitive to a PO2 fall from 100 to 60 mmHg before responding steeply as PO2 falls further toward 30 mmHg — they also respond, more weakly, to a rise in PCO2 or H+, and can be stimulated by markedly reduced blood flow (severe haemorrhage or hypotension). For PCO2 specifically, about 70-80% of the ventilatory response runs through the central route and 20-30% through the peripheral one, and CO2 is overall the most potent respiratory stimulus: a 3% rise in arterial PCO2 can double ventilation, while a marked rise above about 70 mmHg instead depresses the respiratory centre (CO2 narcosis).
## explicit_objective
State the approximate drive contribution of central versus peripheral chemoreceptors, explain why central chemoreceptors respond to CSF H+ but are driven mainly by CO2 rather than plasma H+, and describe the shape of the peripheral chemoreceptors' response to falling PO2.
## pitfalls
Assuming central chemoreceptors respond to plasma H+ or O2 directly. They respond only to H+ generated locally in the CSF; the blood-brain barrier excludes plasma H+ and O2 changes, which is exactly why CO2 (which crosses freely) is the potent indirect stimulus while O2 lack is not sensed centrally at all.
## concept_type
mechanism
## status
under review
## subject
resp
## primary_node_id
DIS-PHY-T03
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Control of Respiration
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.45
## exam_weight_by_year
KAU_Y1=0.45
## clinical_relevance
0.7
## academic_relevance
0.9
## confidence
0.85
## topic
Physiology
## subtopic
Respiratory System
## aliases
Central chemoreceptors (respiratory) | Peripheral chemoreceptors (respiratory) | CO2 narcosis
## article_ids
ART-104-PHY-RESPIRATORY-CENTERS-AND-CHEMORECEPTORS
## support_mode
direct_statement
## original_wording
Importance: They are responsible for 75-80 % of respiratory drive at rest.
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-RES-A54FECB95CBEBC | CON-CVS-131F06D46D3B84 | CON-CVS-230096C97EAB11
## related_article_ids
ART-104-PHY-OXYGEN-CONTENT-AND-CO2-TRANSPORT
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-CENTRALCHEMO-RESP-01 | CLM-104-PHY-PERIPHCHEMO-RESP-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.

---

# Item
## label
The Hering-Breuer reflex — lung stretch receptors signalling through the vagus to inhibit the DRG and apneustic centre and switch off inspiration — matters little in resting adult breathing but engages once tidal volume triples, as in exercise
## id
CON-RES-B68E39C6B4178F
## canonical_key
hering-breuer-reflex.pulmonary-stretch-receptors
## definition
The Hering-Breuer reflex is triggered by lung inflation acting on stretch receptors in the walls of the bronchi and bronchioles, which send inhibitory afferent signals through the vagus nerve to the DRG and apneustic centre, stopping inspiration and starting expiration. In newborn infants (and in animals generally) it adjusts the normal rate and depth of every breath; in human adults it is important only at high rates and depths of breathing, when tidal volume rises to more than three times normal, as in exercise, functioning as a protective brake against over-expanding the lungs.
## explicit_objective
State the stimulus, receptor, afferent pathway and response of the Hering-Breuer reflex, and explain why it matters in the newborn but not at rest in the adult.
## pitfalls
Assuming the Hering-Breuer reflex is a major regulator of every resting adult breath. In adults it is essentially silent at normal tidal volumes and only engages once tidal volume rises well above normal, unlike in the newborn where it shapes ordinary quiet breathing.
## concept_type
mechanism
## status
under review
## subject
resp
## primary_node_id
DIS-PHY-T03
## secondary_node_ids
[clear]
## modules
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Control of Respiration
## universities
kau
## learner_years
1
## exam_signal

## weight_confidence
0.3
## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.5
## academic_relevance
0.8
## confidence
0.85
## topic
Physiology
## subtopic
Respiratory System
## aliases
Pulmonary stretch reflex
## article_ids
ART-104-PHY-RESPIRATORY-CENTERS-AND-CHEMORECEPTORS
## support_mode
direct_statement
## original_wording
In human adults, it is important only in cases of high rates and depths of respiration (exercise, when TV increases to more than 3 times normal).
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication.
## arabic_label

## arabic_aliases
[clear]
## microtopic
[clear]
## nanotopic
[clear]
## related_concept_ids
CON-RES-A54FECB95CBEBC
## related_article_ids
ART-104-PHY-OXYGEN-CONTENT-AND-CO2-TRANSPORT
## resource_ids
src_a11a7faed67c95e2d636
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-104-PHY-HERINGBREUER-01
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## exclusion_reason

## reviewer
Medical team, Admin team
## final_publisher
Admin team
## last_reviewed

## review_due

## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
approvedFileResourceIds: No approved file resource exists for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Hand-authored from the department book directly; not a pipeline extraction, no occurrence record applies.
sourceCandidateIds: The source is known exactly (the department book); not a corpus-search candidate.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet reviewed.
