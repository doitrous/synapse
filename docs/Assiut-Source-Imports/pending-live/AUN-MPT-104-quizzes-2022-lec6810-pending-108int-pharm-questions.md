<!--
  AUN-MPT-104 -- pending-live overlay questions from the All Quizzes MPT 2022.pdf quiz bank triage (coverage/AUN-MPT-104-triage.md, S3b), Lectures 6, 8 and 10 (Receptor Regulation and Variation in Drug Responsiveness; Adverse drug reaction; Pharmacokinetics 1 -- Absorption & distribution) whose tested idea reuses pending Kasr 108-INT pharmacology concepts (docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md) rather than re-minting -- the same reuse pattern as the first quizzes-2022 batch's 108-INT overlays. Q054 (novamine/irreversible antagonist) reuses CON-FND-390F2D9EC3D6DC, whose +aun overlay was already written in the sibling AUN-MPT-104-q10-irreversible-antagonist-concept.md (from final-2022 Q10, the same underlying vignette) -- not re-overlaid here to avoid a duplicate merge row. Omar applies this batch only after: 1) docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md (the Kasr concept batch itself), 2) AUN-MPT-104-quizzes-2022-lec6810-pending-108int-pharm-concept.md (the sparse +aun overlay on the 8 pharmacology concepts newly reused here, same directory), 3) AUN-MPT-104-q10-irreversible-antagonist-concept.md (already-written overlay Q054 also depends on). Import order: 1 then 2 and 3 then this file, each via Admin > Bulk import -> question.

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q048

## title
Intrinsic activity (efficacy) defined

## question
The intrinsic activity or efficacy of a drug is:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Related to its maximal effect.

## explanation_a
Correct. Efficacy (intrinsic activity) is the maximum response a drug can produce however much of it is given -- the Emax, or the height of the plateau on a concentration-response curve. It is a separate property from potency: of two drugs acting at the same receptor, the more potent one may still reach a lower maximum effect.

## answer_b
The amount of drug in relation to its effect.

## explanation_b
Incorrect. "The amount of drug in relation to its effect" describes potency, not efficacy -- potency is a statement about the dose axis of the curve, while efficacy is a statement about the height of the curve's plateau.

## answer_c
Related to its affinity to a receptor site.

## explanation_c
Incorrect. Affinity is how readily a drug binds its receptor, a distinct property from efficacy; a drug can have high affinity yet very low or no efficacy, as an antagonist does.

## answer_d
A measure of its potency.

## explanation_d
Incorrect. Potency, not efficacy, is the amount needed to produce a given response (read off as EC50/ED50) -- the two terms are commonly confused but describe different axes of the dose-response relationship.

## topic
Receptor Regulation and Variation in Drug Responsiveness

## subtopic
Efficacy and potency

## main_concept
CON-FND-17149EED384DCA

## concept_ids
CON-FND-17149EED384DCA

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Define efficacy (intrinsic activity) as a drug's maximal effect, distinct from potency.

## source_citation
All Quizzes MPT 2022.pdf, 26

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Related to its maximal effect."
pendingConcept: CON-FND-17149EED384DCA pending in 108-INT-concepts-pharmacology.md (teaching.pharma.response.efficacy-vs-potency) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q049

## title
What ED50 measures

## question
ED50 is a measure of:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Toxicity

## explanation_a
Incorrect. LD50, not ED50, is the dose measure associated with toxicity/lethality; ED50 concerns the desired therapeutic effect.

## answer_b
Potency

## explanation_b
Correct. ED50 (the median effective dose) is the dose that produces a given effect in 50% of a population, and it is read off as the position of a drug's dose-response curve along the dose axis -- that position is exactly what "potency" means. A more potent drug reaches its ED50 at a lower dose than a less potent one.

## answer_c
Efficacy

## explanation_c
Incorrect. Efficacy is the maximum effect a drug can produce (Emax), a property of the curve's height, not of where the curve sits on the dose axis -- which is what ED50 and potency describe.

## answer_d
Safety

## explanation_d
Incorrect. Safety is better captured by the therapeutic index (the ratio of the toxic dose to the effective dose), not by ED50 alone.

## topic
Receptor Regulation and Variation in Drug Responsiveness

## subtopic
Efficacy and potency

## main_concept
CON-FND-17149EED384DCA

## concept_ids
CON-FND-17149EED384DCA

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Identify ED50 as a measure of a drug's potency.

## source_citation
All Quizzes MPT 2022.pdf, 26

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Potency"
pendingConcept: CON-FND-17149EED384DCA pending in 108-INT-concepts-pharmacology.md (teaching.pharma.response.efficacy-vs-potency) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q050

## title
Sugammadex's mechanism as a reversal agent

## question
Sugammadex is a new drug that reverses the action of rocuronium and certain other skeletal muscle-relaxing agents (nondepolarizing neuromuscular blocking agents). It appears to interact directly with the rocuronium molecule and not at all with the rocuronium receptor. Which of the following terms best describes sugammadex?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Chemical antagonist

## explanation_a
Correct. Chemical antagonism is a direct reaction between two substances in solution, so the antagonist inactivates the drug before it ever reaches a receptor. Sugammadex encapsulates the rocuronium molecule itself in a tight ring structure, exactly as the stem describes -- it never touches the acetylcholine receptor rocuronium normally blocks -- making it a chemical, not a receptor-based, antagonist.

## answer_b
Physiologic antagonist

## explanation_b
Incorrect. A physiologic (functional) antagonist acts at a separate receptor to produce an opposing physiological effect; sugammadex does not act at any receptor at all, so this label does not fit its stated mechanism.

## answer_c
Pharmacologic antagonist

## explanation_c
Incorrect. A pharmacologic (receptor) antagonist works by binding the same receptor as the agonist it opposes; the stem explicitly states sugammadex does not interact with the rocuronium receptor.

## answer_d
Noncompetitive antagonist

## explanation_d
Incorrect. Noncompetitive antagonism is a form of receptor antagonism in which the antagonist binds the receptor (often irreversibly or at a different site) to lower Emax; sugammadex instead binds the drug molecule directly, never the receptor.

## topic
Receptor Regulation and Variation in Drug Responsiveness

## subtopic
Types of antagonism

## main_concept
CON-FND-A1E2092A49359C

## concept_ids
CON-FND-A1E2092A49359C

## contextual_concept_ids

## difficulty
Hard

## question_type
Application

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
30

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Classify sugammadex as a chemical antagonist, since it binds the drug molecule directly rather than any receptor.

## source_citation
All Quizzes MPT 2022.pdf, 26

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Chemical antagonist"
pendingConcept: CON-FND-A1E2092A49359C pending in 108-INT-concepts-pharmacology.md (teaching.pharma.antagonism.chemical-physiological) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q051

## title
Definition of the median effective dose

## question
Which of the following is the median effective dose, or the dose at which 50% of the individuals exhibit the specified quantal response?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
ED50

## explanation_a
Correct. ED50, the median effective dose, is defined precisely as the dose at which 50% of a population exhibits the specified (quantal, all-or-nothing) response -- exactly the definition given in the stem. It is the standard measure used to express a drug's potency on a dose basis.

## answer_b
TD50

## explanation_b
Incorrect. TD50 is the median toxic dose -- the dose producing a defined toxic effect in 50% of a population -- not the desired therapeutic effect described in the stem.

## answer_c
LD50

## explanation_c
Incorrect. LD50 is the median lethal dose, the dose killing 50% of a population (typically determined in animal studies), not the therapeutic-response measure the stem describes.

## answer_d
EC50

## explanation_d
Incorrect. EC50 is the median effective concentration, expressed in concentration (not dose) terms and typically used for in-vitro or graded-response curves, whereas the stem specifically asks for a dose-based, quantal (population) measure -- ED50.

## topic
Receptor Regulation and Variation in Drug Responsiveness

## subtopic
Efficacy and potency

## main_concept
CON-FND-17149EED384DCA

## concept_ids
CON-FND-17149EED384DCA

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Define ED50 as the dose producing a specified quantal effect in 50% of a population.

## source_citation
All Quizzes MPT 2022.pdf, 27

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: ED50"
pendingConcept: CON-FND-17149EED384DCA pending in 108-INT-concepts-pharmacology.md (teaching.pharma.response.efficacy-vs-potency) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q052

## title
Definition of receptor affinity

## question
What does "affinity" mean?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
A measure of how tightly a drug binds to plasma proteins

## explanation_a
Incorrect. Binding to plasma proteins (albumin for acids, alpha-1 acid glycoprotein for bases) is a distribution phenomenon, not what "affinity" names in pharmacodynamics.

## answer_b
A measure of inhibiting potency of a drug

## explanation_b
Incorrect. "Inhibiting potency" is not the definition of affinity; affinity describes binding strength, not a drug's effect (which is a separate question from whether it binds at all).

## answer_c
A measure of how tightly a drug binds to a receptor

## explanation_c
Correct. Affinity is the tendency of a drug to form a complex with its receptor and to hold onto it -- its ability to fit onto and bind the receptor. Affinity alone says nothing about whether that binding then produces an effect: an antagonist can have very high affinity and, by definition, produce no effect at all, which is why affinity and efficacy must be kept conceptually separate.

## answer_d
A measure of bioavailability of a drug

## explanation_d
Incorrect. Bioavailability is the fraction of an administered dose that reaches the systemic circulation, a pharmacokinetic concept unrelated to receptor binding strength.

## topic
Receptor Regulation and Variation in Drug Responsiveness

## subtopic
Receptors and affinity

## main_concept
CON-FND-38CD8C0BD5B4DE

## concept_ids
CON-FND-38CD8C0BD5B4DE

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Define affinity as how tightly a drug binds its receptor, distinct from whether it produces an effect.

## source_citation
All Quizzes MPT 2022.pdf, 27

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: A measure of how tightly a drug binds to a receptor"
pendingConcept: CON-FND-38CD8C0BD5B4DE pending in 108-INT-concepts-pharmacology.md (teaching.pharma.receptor.affinity) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q055

## title
Physiological antagonist to histamine

## question
Which ONE of the following drugs is a physiological antagonist to histamine:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Cromolyn sodium

## explanation_a
Incorrect. Cromolyn sodium stabilises mast cells to prevent mediator release; it does not act at a separate receptor to physiologically oppose histamine's effect once released.

## answer_b
Epinephrine

## explanation_b
Correct. Physiological (functional) antagonism is two drugs acting at different receptors on different systems to produce opposite effects on the same measurable outcome, without either binding the other's receptor. Epinephrine, acting at adrenergic receptors, physiologically opposes histamine's bronchoconstriction and vasodilation (acting at histamine receptors) in anaphylaxis -- the same textbook example (epinephrine and histamine) named directly in this lecture's own antagonism teaching.

## answer_c
Corticosteroid

## explanation_c
Incorrect. Corticosteroids reduce inflammation broadly (largely through gene-level anti-inflammatory effects) but are not the specific physiological-antagonist pairing this teaching point names for histamine.

## answer_d
Diphenhydramine

## explanation_d
Incorrect. Diphenhydramine is a histamine H1-receptor competitive (pharmacologic) antagonist -- it binds the same receptor histamine does -- which is the opposite mechanism from physiological antagonism, where the two drugs act at different receptors entirely.

## topic
Receptor Regulation and Variation in Drug Responsiveness

## subtopic
Types of antagonism

## main_concept
CON-FND-A1E2092A49359C

## concept_ids
CON-FND-A1E2092A49359C

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Identify epinephrine as the physiological (functional) antagonist to histamine in anaphylaxis.

## source_citation
All Quizzes MPT 2022.pdf, 28

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Epinephrine"
pendingConcept: CON-FND-A1E2092A49359C pending in 108-INT-concepts-pharmacology.md (teaching.pharma.antagonism.chemical-physiological) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q054

## title
Novamine reduces Emax without shifting EC50 (quiz-bank vignette)

## question
A study was carried out in isolated intestinal smooth muscle preparations to determine the action of a new drug "novamine," which in separate studies bound to the same receptors as acetylcholine. In the absence of other drugs, acetylcholine caused contraction of the muscle. Novamine alone caused relaxation of the preparation. In the presence of a low concentration of novamine, the EC50 of acetylcholine was unchanged, but the Emax was reduced. In the presence of a high concentration of novamine, extremely high concentrations of acetylcholine had no effect. Which of the following expressions best describes novamine?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Physiologic antagonist

## explanation_a
Incorrect. A physiologic antagonist acts through a separate receptor and pathway; the stem explicitly states novamine binds the same receptor as acetylcholine, ruling this out.

## answer_b
An irreversible antagonist

## explanation_b
Correct. An irreversible antagonist binds the receptor covalently, so the block cannot be reversed by adding more agonist. At a low antagonist concentration, only some receptors are permanently occupied, so Emax falls while the remaining free receptors still reach half-maximal occupancy at roughly the same acetylcholine concentration (EC50 unchanged). At a high antagonist concentration, essentially all receptors are covalently blocked, so no amount of acetylcholine can produce a response -- exactly the pattern described, and the same reasoning as the identical vignette on this exam's final paper (Q10).

## answer_c
A physiologic agonist

## explanation_c
Incorrect. A physiologic agonist would produce its own effect through an unrelated receptor and pathway, not occupy and progressively block the acetylcholine receptor itself.

## answer_d
A spare receptor agonist

## explanation_d
Incorrect. "Spare receptor agonist" is not a real pharmacological category, and nothing in the stem describes a spare-receptor phenomenon (which concerns EC50 being lower than the receptor Kd for a full agonist).

## answer_e
A chemical antagonist

## explanation_e
Incorrect. A chemical antagonist neutralises the agonist directly in solution rather than acting at the receptor at all, so it would not produce the receptor-occupancy pattern (falling Emax, unchanged EC50 at low dose) the experiment specifically demonstrates.

## topic
Receptor Regulation and Variation in Drug Responsiveness

## subtopic
Types of antagonism

## main_concept
CON-FND-390F2D9EC3D6DC

## concept_ids
CON-FND-390F2D9EC3D6DC

## contextual_concept_ids

## difficulty
Hard

## question_type
Application

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Recognise a falling Emax with unchanged EC50 at low antagonist dose, and total block at high dose, as the signature of an irreversible antagonist.

## source_citation
All Quizzes MPT 2022.pdf, 28

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: An irreversible antagonist"
pendingConcept: CON-FND-390F2D9EC3D6DC pending in 108-INT-concepts-pharmacology.md (teaching.pharma.antagonism.irreversible) -- its +aun overlay is already written in AUN-MPT-104-q10-irreversible-antagonist-concept.md (from final-2022 Q10, same underlying vignette); this question applies once that overlay and the Kasr batch are live

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q061

## title
High therapeutic index and serious adverse effects

## question
A 25-year-old medical student is given a prescription for asthma, which the physician states has a very high therapeutic index. Which of the statements best characterizes the drug as it relates to the therapeutic index?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
The drug is likely to cross the blood-brain barrier.

## explanation_a
Incorrect. Crossing the blood-brain barrier is a distribution property unrelated to the therapeutic index, which is a ratio of toxic to effective dose.

## answer_b
The drug is likely to have extensive drug-drug interactions.

## explanation_b
Incorrect. The therapeutic index says nothing about a drug's propensity for drug-drug interactions; a drug can have a high TI and still interact with other drugs pharmacokinetically or pharmacodynamically.

## answer_c
The drug is unlikely to have any serious adverse effects.

## explanation_c
Correct. The therapeutic index is the ratio of the toxic dose to the effective dose, and a large ratio means a wide gap between the dose that works and the dose that harms. A very high TI therefore makes serious dose-related adverse effects unlikely, since the margin before reaching a toxic dose is large -- this is why such drugs can typically be given without close plasma-level monitoring.

## answer_d
The drug's serum levels will likely need to be carefully monitored.

## explanation_d
Incorrect. Careful serum-level monitoring is reserved for drugs with a narrow (low), not a high, therapeutic index, where the therapeutic and toxic doses are close together.

## topic
Adverse drug reaction

## subtopic
Therapeutic index

## main_concept
CON-FND-BB0DBAE1BC802B

## concept_ids
CON-FND-BB0DBAE1BC802B

## contextual_concept_ids

## difficulty
Moderate

## question_type
Application

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Infer that a high therapeutic index means a drug is unlikely to cause serious dose-related adverse effects.

## source_citation
All Quizzes MPT 2022.pdf, 33

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: The drug is unlikely to have any serious adverse effects."
pendingConcept: CON-FND-BB0DBAE1BC802B pending in 108-INT-concepts-pharmacology.md (teaching.pharma.posology.therapeutic-index) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q062

## title
What the therapeutic index measures

## question
Therapeutic index for a drug is a measure of :

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Efficacy

## explanation_a
Incorrect. Efficacy is the maximum effect a drug can produce (Emax), a separate concept from the therapeutic index, which compares the toxic dose to the effective dose.

## answer_b
Potency

## explanation_b
Incorrect. Potency is the dose needed to produce a given effect (ED50), not a comparison between effective and toxic doses.

## answer_c
Toxicity

## explanation_c
Incorrect. Toxicity alone is not what the index measures; the index specifically compares the toxic dose to the effective dose, giving a relative, not an absolute, statement.

## answer_d
Safety

## explanation_d
Correct. The therapeutic index (TI = LD50/ED50 or TD50/ED50) is a measure of a drug's safety: how little or how much room exists between the dose that works and the dose that harms. It says nothing about how well the drug works (that is efficacy) -- only about the margin for error in dosing it.

## topic
Adverse drug reaction

## subtopic
Therapeutic index

## main_concept
CON-FND-BB0DBAE1BC802B

## concept_ids
CON-FND-BB0DBAE1BC802B

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
State that the therapeutic index is a measure of a drug's safety.

## source_citation
All Quizzes MPT 2022.pdf, 33

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Safety"
pendingConcept: CON-FND-BB0DBAE1BC802B pending in 108-INT-concepts-pharmacology.md (teaching.pharma.posology.therapeutic-index) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q065

## title
Relative indicator of a drug's margin of safety

## question
Which of the following can be used as a relative indicator of the margin of safety of a drug?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
EC50

## explanation_a
Incorrect. EC50 alone describes potency on a concentration basis; it says nothing, by itself, about the gap between an effective and a toxic level.

## answer_b
T.I.

## explanation_b
Correct. The therapeutic index (T.I. = LD50/ED50, or TD50/ED50) is precisely a relative indicator of a drug's margin of safety -- it expresses how far apart the toxic and effective doses sit, rather than reporting either dose alone. The larger the T.I., the wider that safety margin.

## answer_c
ED50

## explanation_c
Incorrect. ED50 alone is only the effective dose; without comparing it to a toxic dose, it says nothing about safety margin by itself.

## answer_d
LD50

## explanation_d
Incorrect. LD50 alone is only the lethal dose; it must be compared with ED50 (as the therapeutic index does) to become a relative safety indicator.

## topic
Adverse drug reaction

## subtopic
Therapeutic index

## main_concept
CON-FND-BB0DBAE1BC802B

## concept_ids
CON-FND-BB0DBAE1BC802B

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Identify the therapeutic index as the relative indicator of a drug's margin of safety.

## source_citation
All Quizzes MPT 2022.pdf, 34

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: T.I."
pendingConcept: CON-FND-BB0DBAE1BC802B pending in 108-INT-concepts-pharmacology.md (teaching.pharma.posology.therapeutic-index) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q066

## title
Formula for the therapeutic index

## question
Which of the following is considered the therapeutic index (or ratio)?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
T.I. = ED50 / LD50

## explanation_a
Incorrect. This formula inverts the true ratio -- ED50 divided by LD50 would make a safer drug (high LD50) produce a smaller, not a larger, number, which is the wrong direction for an index where bigger means safer.

## answer_b
T.I. = TD50 / LD50

## explanation_b
Incorrect. TD50/LD50 compares two different toxicity measures to each other rather than comparing a toxic dose to the effective dose, so it does not define the therapeutic index.

## answer_c
T.I. = ED50 / TD50

## explanation_c
Incorrect. ED50/TD50 again inverts the ratio in the wrong direction for the same reason as option A.

## answer_d
T.I. = LD50 / ED50

## explanation_d
Correct. The therapeutic index is TI = LD50/ED50 (the median lethal, or in some formulations median toxic, dose divided by the median effective dose). Placing the toxic dose in the numerator and the effective dose in the denominator means a larger index correctly signals a safer drug -- more room between the dose that works and the dose that harms.

## topic
Adverse drug reaction

## subtopic
Therapeutic index

## main_concept
CON-FND-BB0DBAE1BC802B

## concept_ids
CON-FND-BB0DBAE1BC802B

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
State the therapeutic index formula correctly as LD50 (or TD50) divided by ED50.

## source_citation
All Quizzes MPT 2022.pdf, 35

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: T.I. = LD50 / ED50"
pendingConcept: CON-FND-BB0DBAE1BC802B pending in 108-INT-concepts-pharmacology.md (teaching.pharma.posology.therapeutic-index) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q067

## title
Parameter comparing desired effect to toxic effect

## question
Which of the following parameters is used to indicate the ability of a drug to produce the desired therapeutic effect relative to a toxic effect?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Potency

## explanation_a
Incorrect. Potency describes the dose needed for an effect, without any built-in comparison to a toxic dose.

## answer_b
Intrinsic activity

## explanation_b
Incorrect. Intrinsic activity (efficacy) describes the maximal effect a drug can produce, not a comparison between that effect and a toxic dose.

## answer_c
Efficacy

## explanation_c
Incorrect. Efficacy alone, like intrinsic activity, describes the size of a drug's effect, not its safety margin relative to toxicity.

## answer_d
Therapeutic index

## explanation_d
Correct. The therapeutic index is exactly this ratio: it indicates a drug's ability to produce its desired therapeutic effect relative to its toxic effect, by comparing the toxic dose (LD50/TD50) to the effective dose (ED50). This is the recurring definitional point of this whole lecture's therapeutic-index teaching.

## topic
Adverse drug reaction

## subtopic
Therapeutic index

## main_concept
CON-FND-BB0DBAE1BC802B

## concept_ids
CON-FND-BB0DBAE1BC802B

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Identify the therapeutic index as the parameter relating a drug's desired effect to its toxic effect.

## source_citation
All Quizzes MPT 2022.pdf, 35

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Therapeutic index"
pendingConcept: CON-FND-BB0DBAE1BC802B pending in 108-INT-concepts-pharmacology.md (teaching.pharma.posology.therapeutic-index) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q070

## title
Narrow therapeutic index (lithium vignette)

## question
A 47-year-old woman who has been diagnosed with bipolar disorder needs a refill on her lithium prescription. She also has hypertension that is well controlled with an ACE inhibitor. Lithium has a narrow therapeutic index. Which of the following describes a narrow therapeutic index?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
The therapeutic dose approaches the toxic dose

## explanation_a
Correct. A narrow therapeutic index means the therapeutic dose approaches the toxic dose -- there is little room between the dose that works and the dose that harms. Lithium is the classic teaching example: its narrow index is exactly why lithium levels must be closely monitored, and why an added ACE inhibitor (which can reduce renal lithium clearance and raise lithium levels) is a clinically important interaction to watch for in this patient.

## answer_b
The chance of toxicity is remote at the therapeutic dose

## explanation_b
Incorrect. A remote chance of toxicity at the therapeutic dose describes a wide (high), not a narrow, therapeutic index.

## answer_c
The ratio of TD50 to ED50 is great

## explanation_c
Incorrect. A great ratio of TD50 to ED50 is precisely a high (wide) therapeutic index, the opposite of "narrow."

## answer_d
The therapeutic dose is much greater than the toxic dose

## explanation_d
Incorrect. The therapeutic dose being much greater than the toxic dose is not a coherent or possible relationship (a dose greater than the toxic dose would itself be toxic) and does not describe a narrow index.

## topic
Adverse drug reaction

## subtopic
Therapeutic index

## main_concept
CON-FND-BB0DBAE1BC802B

## concept_ids
CON-FND-BB0DBAE1BC802B

## contextual_concept_ids

## difficulty
Moderate

## question_type
Application

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Define a narrow therapeutic index as the therapeutic dose sitting close to the toxic dose, using lithium as the worked clinical example.

## source_citation
All Quizzes MPT 2022.pdf, 36

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: The therapeutic dose approaches the toxic dose"
pendingConcept: CON-FND-BB0DBAE1BC802B pending in 108-INT-concepts-pharmacology.md (teaching.pharma.posology.therapeutic-index) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q068

## title
Protamine sulfate's mechanism reversing heparin overdose

## question
A 67-year-old hospitalized patient with a deep venous thrombosis of the left calf and pulmonary embolism is currently on intravenous heparin on an hourly drip. Unfortunately, because of a calculation error, the heparin drip is running at 100 times the rate it should be running at. Protamine sulfate is immediately given intravenously. This agent works by which of the following mechanisms of action?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Chemical antagonist

## explanation_a
Correct. Chemical antagonism is a direct reaction between two substances in solution: protamine sulfate is positively charged at physiological pH and binds directly and tightly to negatively charged heparin, neutralising it before it can act at antithrombin -- the drug never touches a receptor at all. This is the textbook worked example of chemical antagonism given directly in this lecture's own teaching.

## answer_b
Physiological antagonist

## explanation_b
Incorrect. Physiological antagonism requires two drugs acting at separate receptors on different systems to oppose each other's effect; protamine instead binds the heparin molecule itself directly, with no receptor involved on either side.

## answer_c
Non-competitive antagonist

## explanation_c
Incorrect. Non-competitive antagonism is a receptor-based mechanism (binding the receptor, not the drug, usually irreversibly); protamine's action is a direct drug-drug interaction in solution, not a receptor event.

## answer_d
Competitive antagonist

## explanation_d
Incorrect. Competitive antagonism requires both drugs to compete for the same receptor binding site; heparin's anticoagulant action does not work through a receptor that protamine competes at.

## topic
Adverse drug reaction

## subtopic
Types of antagonism

## main_concept
CON-FND-A1E2092A49359C

## concept_ids
CON-FND-A1E2092A49359C

## contextual_concept_ids

## difficulty
Moderate

## question_type
Application

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Recognise protamine sulfate's heparin reversal as chemical antagonism (direct binding of the drug, not a receptor).

## source_citation
All Quizzes MPT 2022.pdf, 35

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Chemical antagonist"
pendingConcept: CON-FND-A1E2092A49359C pending in 108-INT-concepts-pharmacology.md (teaching.pharma.antagonism.chemical-physiological) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q071

## title
Comparing potency from a dose-response table

## question
Two cholesterol-lowering drugs, X and Y, were studied in a large group of patients, and the percentages of the group showing a specific therapeutic effect (35% reduction in low density lipoprotein [LDL] cholesterol) were determined. The results are shown in the following table. Which of the following statements about these results is correct? Drug dose (mg): 5/10/20/50/100/200; percent responding to drug X: 1/5/10/50/70/90; percent responding to drug Y: 10/20/50/70/90/100.

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Drug Y is more effective than drug X

## explanation_a
Incorrect. At the highest doses tested both drugs reach comparably high response rates (90-100%), so the table does not show drug Y as more effective (a higher maximal effect) than drug X -- it shows Y reaching the same responses at consistently lower doses, which is a potency difference, not an efficacy one.

## answer_b
Drug X is less potent than drug Y

## explanation_b
Correct. At every dose in the table, a larger percentage of patients respond to drug Y than to drug X (e.g. 50% respond to 20 mg of Y, but 20 mg of X only gets 10% response, and it takes 50 mg of X to reach the same 50% response Y achieves at 20 mg). Reaching the same response at a lower dose is exactly what greater potency means, so drug X -- needing a higher dose for the same effect -- is the less potent of the two.

## answer_c
The 2 drugs act on the same receptors

## explanation_c
Incorrect. Nothing in a dose-response comparison table alone can establish that two drugs share the same receptor; that would require independent mechanistic or binding-competition data, not just percent-responding figures.

## answer_d
Drug X is safer than drug Y

## explanation_d
Incorrect. Safety is a statement about the therapeutic index (toxic dose relative to effective dose); this table reports only therapeutic response rates, with no toxicity data at all, so no conclusion about relative safety can be drawn from it.

## topic
Adverse drug reaction

## subtopic
Efficacy and potency

## main_concept
CON-FND-17149EED384DCA

## concept_ids
CON-FND-17149EED384DCA

## contextual_concept_ids

## difficulty
Hard

## question_type
Application

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Read relative potency off a dose-response table: the drug reaching the same response at a lower dose is more potent.

## source_citation
All Quizzes MPT 2022.pdf, 37

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Drug X is less potent than drug Y"
pendingConcept: CON-FND-17149EED384DCA pending in 108-INT-concepts-pharmacology.md (teaching.pharma.response.efficacy-vs-potency) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q072

## title
Relative potency of two thiazide diuretics

## question
A 55-year-old woman with hypertension is to be treated with a thiazide diuretic. Thiazide A in a dose of 5 mg produces the same decrease in blood pressure as 500 mg of thiazide B. Which of the following statements best describes these results?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Toxicity of thiazide A is less than that of thiazide B

## explanation_a
Incorrect. Nothing in the vignette gives toxic-dose information for either drug, so no conclusion about relative toxicity (which requires comparing toxic, not just effective, doses) can be drawn.

## answer_b
Thiazide A is more efficacious than thiazide B

## explanation_b
Incorrect. Efficacy (the maximal achievable effect) is not established here -- the vignette only shows the two drugs matching each other's effect at different doses, not one producing a larger maximum blood-pressure reduction than the other is capable of.

## answer_c
Thiazide A is about 100 times more potent than thiazide B

## explanation_c
Correct. Potency compares the dose needed to produce a given effect: 5 mg of thiazide A produces the same effect as 500 mg of thiazide B, a 100-fold difference in the dose required. That is exactly what "100 times more potent" means -- thiazide A reaches the same effect at 1/100th of the dose thiazide B needs.

## answer_d
Thiazide A has a wider therapeutic window than thiazide B

## explanation_d
Incorrect. The therapeutic window depends on toxic-dose information, which the vignette does not provide; a potency difference alone says nothing about the safety margin of either drug.

## topic
Adverse drug reaction

## subtopic
Efficacy and potency

## main_concept
CON-FND-17149EED384DCA

## concept_ids
CON-FND-17149EED384DCA

## contextual_concept_ids

## difficulty
Hard

## question_type
Application

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Calculate relative potency as the ratio of doses producing the same effect, distinct from efficacy or safety.

## source_citation
All Quizzes MPT 2022.pdf, 37

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Thiazide A is about 100 times more potent than thiazide B"
pendingConcept: CON-FND-17149EED384DCA pending in 108-INT-concepts-pharmacology.md (teaching.pharma.response.efficacy-vs-potency) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q078

## title
How lipid-soluble drugs are absorbed

## question
lipid soluble drugs are absorbed mainly by:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Filtration

## explanation_a
Incorrect. Filtration through aqueous membrane pores mainly handles small, water-soluble molecules, not lipid-soluble ones, which cross the lipid bilayer itself rather than passing through pores.

## answer_b
Active transport

## explanation_b
Incorrect. Active transport needs a specific carrier protein and energy; most lipid-soluble drugs do not need a carrier at all, since they can dissolve directly through the lipid membrane.

## answer_c
Passive diffusion

## explanation_c
Correct. Simple (passive) diffusion carries a drug down its concentration gradient directly through the lipid of the membrane, without a carrier and without energy. Only the uncharged, lipid-soluble fraction of a drug can make this crossing, so lipid solubility -- along with small molecular size and low ionisation -- is exactly what determines whether passive diffusion is the absorption route.

## answer_d
Pinocytosis

## explanation_d
Incorrect. Pinocytosis engulfs fluid and large or macromolecular substances via membrane invagination, not the route by which small lipid-soluble drug molecules typically cross membranes.

## topic
Pharmacokinetics 1 (Absorption & distribution)

## subtopic
Absorption mechanisms

## main_concept
CON-FND-584FCF6897C35E

## concept_ids
CON-FND-584FCF6897C35E

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
State that lipid-soluble drugs are absorbed mainly by passive diffusion through the membrane.

## source_citation
All Quizzes MPT 2022.pdf, 41

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Passive diffusion"
pendingConcept: CON-FND-584FCF6897C35E pending in 108-INT-concepts-pharmacology.md (teaching.pharma.membrane.simple-diffusion) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q079

## title
Selective accumulation of iodide

## question
Iodide has selective accumulation to:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Bone

## explanation_a
Incorrect. Bone is the classic site of selective accumulation for tetracyclines and heavy metals (which bind hydroxyapatite), not for iodide.

## answer_b
Thyroid gland

## explanation_b
Correct. A drug (or ion) may leave the water compartments altogether and concentrate in a single tissue -- one of the four basic distribution patterns a drug can follow. Iodide is the worked example of this pattern: it is actively taken up and concentrated by the thyroid gland's sodium-iodide symporter, ready for use in thyroid hormone synthesis. This selective, tissue-specific accumulation is why radioactive iodine can be used both to image and to ablate thyroid tissue.

## answer_c
Brain

## explanation_c
Incorrect. The brain is instead the tissue that highly lipid-soluble drugs able to cross the blood-brain barrier concentrate in, not the selective accumulation site named for iodide.

## answer_d
Liver

## explanation_d
Incorrect. The liver is the principal site of drug metabolism, not the named selective-accumulation site for iodide, whose target organ is the thyroid.

## topic
Pharmacokinetics 1 (Absorption & distribution)

## subtopic
Distribution patterns

## main_concept
CON-FND-040D2633B0A2FE

## concept_ids
CON-FND-040D2633B0A2FE

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Identify the thyroid gland as the tissue in which iodide selectively concentrates.

## source_citation
All Quizzes MPT 2022.pdf, 41

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Thyroid gland"
pendingConcept: CON-FND-040D2633B0A2FE pending in 108-INT-concepts-pharmacology.md (teaching.pharma.distribution.patterns) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q080

## title
Factors affecting absorption (except one)

## question
Absorption is affected by all the following factors EXCEPT:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Presence of food

## explanation_a
Incorrect. Presence of food and other gut contents genuinely affects oral absorption (by competing with the drug or altering gastric emptying), so it is not the exception.

## answer_b
Blood supply

## explanation_b
Incorrect. Blood supply (splanchnic flow) genuinely affects how fast an absorbed drug is carried away from the gut, sustaining the concentration gradient for continued absorption -- not the exception.

## answer_c
Lipid solubility

## explanation_c
Incorrect. Lipid solubility genuinely determines whether a drug can passively diffuse across the gut membrane at all -- not the exception.

## answer_d
Plasma protein binding

## explanation_d
Correct. Oral absorption is set by gastrointestinal surface area, gastric emptying, blood flow, and gut contents (like food). Plasma protein binding is instead a distribution factor: it determines how a drug that has already been absorbed is then held in or released from the bloodstream, not a factor governing the absorption step itself. This is the recurring distinction this lecture draws between what happens before a drug reaches the blood (absorption) and what happens to it once it is there (distribution).

## topic
Pharmacokinetics 1 (Absorption & distribution)

## subtopic
Factors affecting absorption

## main_concept
CON-FND-F2DD5E50875917

## concept_ids
CON-FND-F2DD5E50875917

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Distinguish absorption factors (surface area, gastric emptying, blood flow, gut contents) from distribution factors like plasma protein binding.

## source_citation
All Quizzes MPT 2022.pdf, 42

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Plasma protein binding"
pendingConcept: CON-FND-F2DD5E50875917 pending in 108-INT-concepts-pharmacology.md (teaching.pharma.absorption.oral-factors) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q081

## title
Protein binding and drug toxicity

## question
Drug toxicity is more with:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Drug with plasma protein binding 50%

## explanation_a
Incorrect. At 50% binding, half the drug is already free to act and be eliminated, so a small further displacement changes the free fraction proportionally far less than it would for a highly bound drug.

## answer_b
Drug with plasma protein binding 99%

## explanation_b
Correct. Only free (unbound) drug can leave the circulation to act at tissue receptors or be eliminated -- plasma protein binding acts as a reservoir. For a drug that is 99% bound, only 1% is normally free; if that binding is even slightly displaced (by another drug competing for the same albumin sites, for instance), the free fraction can double or triple in relative terms, producing a large, potentially toxic jump in active drug -- far more dangerous than the same absolute displacement in a weakly-bound drug.

## answer_c
Drug with plasma protein binding 1%

## explanation_c
Incorrect. At only 1% binding, almost all of the drug is already free, so binding displacement changes the free fraction very little in relative terms, making toxicity from this mechanism unlikely.

## answer_d
Drug with plasma protein binding 20%

## explanation_d
Incorrect. At 20% binding, most of the drug is already free, so the same reasoning as for the lower-binding options applies -- displacement produces only a small relative change in free drug.

## topic
Pharmacokinetics 1 (Absorption & distribution)

## subtopic
Factors affecting distribution

## main_concept
CON-FND-53FF18E42BC94B

## concept_ids
CON-FND-53FF18E42BC94B

## contextual_concept_ids

## difficulty
Hard

## question_type
Application

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Explain why a highly protein-bound drug (99%) is at greater risk of toxicity from small changes in the free fraction than a weakly-bound drug.

## source_citation
All Quizzes MPT 2022.pdf, 42

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Drug with plasma protein binding 99%"
pendingConcept: CON-FND-53FF18E42BC94B pending in 108-INT-concepts-pharmacology.md (teaching.pharma.distribution.factors) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q083

## title
Factors affecting distribution (except one)

## question
Distribution is affected by all the following factors EXCEPT:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
First-pass metabolism

## explanation_a
Correct. Plasma protein binding, lipid solubility, blood flow and tissue affinity are what decide where an already-absorbed drug distributes to. First-pass metabolism instead happens during absorption, as an orally absorbed drug passes through the gut wall and liver before reaching the systemic circulation -- it determines how much drug survives to be distributed at all, not how the surviving drug is subsequently distributed.

## answer_b
Lipid solubility of the drug

## explanation_b
Incorrect. Lipid solubility genuinely affects distribution -- it decides whether free drug can cross membranes (such as the blood-brain barrier) to reach a given tissue -- not the exception.

## answer_c
Ionization of the drug

## explanation_c
Incorrect. Ionisation genuinely affects distribution, since only the non-ionised, lipid-soluble fraction of a drug can cross membranes into tissue compartments -- not the exception.

## answer_d
Plasma protein binding of the drug

## explanation_d
Incorrect. Plasma protein binding genuinely limits distribution, since only free drug can leave the circulation to reach tissue -- not the exception.

## topic
Pharmacokinetics 1 (Absorption & distribution)

## subtopic
Factors affecting distribution

## main_concept
CON-FND-53FF18E42BC94B

## concept_ids
CON-FND-53FF18E42BC94B

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Distinguish distribution factors (protein binding, lipid solubility, ionisation, blood flow) from first-pass metabolism, which happens before distribution.

## source_citation
All Quizzes MPT 2022.pdf, 43

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: First-pass metabolism"
pendingConcept: CON-FND-53FF18E42BC94B pending in 108-INT-concepts-pharmacology.md (teaching.pharma.distribution.factors) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q084

## title
Best route for an emergency antidote

## question
An 18-year-old female patient is brought to the emergency department due to drug overdose. Which of the following routes of administration is the most desirable for administering the antidote for the drug overdose?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Transdermal

## explanation_a
Incorrect. The transdermal route has the slowest onset of the options listed, relying on slow diffusion across skin -- unsuitable for the urgent, immediate reversal an overdose antidote requires.

## answer_b
Subcutaneous

## explanation_b
Incorrect. Subcutaneous injection has a slower, less predictable onset than intravenous administration, since the drug must first be absorbed from the injection site into the circulation.

## answer_c
Intravenous

## explanation_c
Correct. An intravenous bolus delivers the whole dose directly into the circulation at once, giving the fastest possible onset and complete bioavailability -- exactly what is needed for an emergency antidote, where speed and a reliably delivered full dose both matter. This is the same reasoning tested by this exam's final paper (Q1), which asks the identical question about the IV route for an emergency antidote.

## answer_d
Oral

## explanation_d
Incorrect. Oral administration is the slowest and least reliable route here, subject to variable gut absorption and first-pass hepatic metabolism, both of which delay and reduce the amount of antidote reaching the circulation.

## answer_e
Intramuscular

## explanation_e
Incorrect. Intramuscular injection, like subcutaneous, has a slower and less predictable onset than direct intravenous delivery, since the drug must still be absorbed from the muscle into the bloodstream.

## topic
Pharmacokinetics 1 (Absorption & distribution)

## subtopic
Routes of administration

## main_concept
CON-FND-6235934A8DD0FE

## concept_ids
CON-FND-6235934A8DD0FE

## contextual_concept_ids

## difficulty
Moderate

## question_type
Application

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Identify the intravenous route as fastest and most complete for an emergency antidote in drug overdose.

## source_citation
All Quizzes MPT 2022.pdf, 43

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Intravenous"
pendingConcept: CON-FND-6235934A8DD0FE pending in 108-INT-concepts-pharmacology.md (teaching.pharma.routes.intravenous-types) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q086

## title
Site of absorption for a weakly basic drug (pH-partition)

## question
Drug A is a weakly basic drug with a pKa of 7.8. If administered orally, at which of the following sites of absorption will the drug be able to readily pass through the membrane?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Jejunum (pH approximately 8.0)

## explanation_a
Correct. A drug's pKa and the surrounding pH decide what fraction of it is non-ionised, and only the non-ionised fraction is lipid-soluble enough to cross a membrane readily. A weak base is mostly non-ionised when the medium's pH is above its pKa; with a pKa of 7.8, drug A is closest to being predominantly non-ionised in the jejunum (pH about 8.0, the only listed site above 7.8), so that is where it crosses the membrane most readily.

## answer_b
Duodenum (pH approximately 6.1)

## explanation_b
Incorrect. At duodenal pH (about 6.1), well below the drug's pKa of 7.8, a weak base is predominantly ionised (protonated) and poorly able to cross the membrane.

## answer_c
Mouth (pH approximately 7.0)

## explanation_c
Incorrect. Mouth pH (about 7.0) is still below the drug's pKa of 7.8, so the drug remains predominantly ionised there, and absorption in the mouth is negligible in any case since it is not a significant absorptive surface.

## answer_d
Stomach (pH of 2.5)

## explanation_d
Incorrect. Stomach pH (2.5) is far below the drug's pKa, so a weak base would be almost completely ionised there and essentially unable to cross the gastric membrane.

## answer_e
Ileum (pH approximately 7.0)

## explanation_e
Incorrect. Ileum pH (about 7.0), like the mouth, is still below the drug's pKa of 7.8, so the drug remains predominantly ionised and less able to cross than at the more alkaline jejunum.

## topic
Pharmacokinetics 1 (Absorption & distribution)

## subtopic
pH-partition and ionisation

## main_concept
CON-FND-ED16C95CE71A4B

## concept_ids
CON-FND-ED16C95CE71A4B

## contextual_concept_ids

## difficulty
Hard

## question_type
Application

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Apply pH-partition theory to identify the GI segment where a weak base with a given pKa is best absorbed.

## source_citation
All Quizzes MPT 2022.pdf, 44

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Jejunum (pH approximately 8.0)"
pendingConcept: CON-FND-ED16C95CE71A4B pending in 108-INT-concepts-pharmacology.md (teaching.pharma.ionisation.ph-partition) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q089

## title
Defining feature of active transport

## question
Character of active transport:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Non-selective

## explanation_a
Incorrect. Active transport is relatively selective, not non-selective -- the carrier protein recognises specific drug structures, unlike simple diffusion, which crosses the membrane regardless of a molecule's identity as long as it is small, lipid-soluble and non-ionised.

## answer_b
Not need energy

## explanation_b
Incorrect. Active transport specifically runs against the concentration gradient and does need energy -- this is what separates it from facilitated diffusion, which also uses a carrier but runs down the gradient without energy.

## answer_c
Non-saturable

## explanation_c
Incorrect. Active transport is saturable, not non-saturable, because only a finite number of carrier molecules are available; once they are all occupied, a further rise in drug concentration produces no further increase in transport rate.

## answer_d
Need carrier

## explanation_d
Correct. Carrier-mediated transport (of which active transport is one type, alongside facilitated diffusion) needs a specific protein carrier rather than crossing through the lipid directly. Both active transport and facilitated diffusion are saturable, relatively selective, and can be inhibited by another drug competing for the same carrier -- but active transport is further defined by moving the drug against its concentration gradient at the cost of energy.

## topic
Pharmacokinetics 1 (Absorption & distribution)

## subtopic
Absorption mechanisms

## main_concept
CON-FND-9D7D3A5B015805

## concept_ids
CON-FND-9D7D3A5B015805

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
State that active transport requires a carrier protein, is saturable and selective, and consumes energy against the gradient.

## source_citation
All Quizzes MPT 2022.pdf, 45

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Need carrier"
pendingConcept: CON-FND-9D7D3A5B015805 pending in 108-INT-concepts-pharmacology.md (teaching.pharma.membrane.carrier-mediated) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q090

## title
Drugs highly bound to albumin

## question
Drugs that are highly bound to albumin:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Are easily filtered at the glomerulus

## explanation_a
Incorrect. A highly albumin-bound drug is largely NOT free, and only free drug is small enough (and not held by the large albumin molecule) to be filtered at the glomerulus, so heavy protein binding reduces, rather than eases, glomerular filtration.

## answer_b
Can undergo competition with other drugs for albumin binding sites

## explanation_b
Correct. Albumin has a finite number of binding sites, and two drugs that share the same site can compete for it. Displacement of one drug by another sharing its albumin binding site is a well-recognised drug-interaction mechanism, classically important for drugs like warfarin and NSAIDs. This competition can transiently raise the free (active) fraction of the displaced drug, which is clinically significant precisely when a drug is highly protein-bound to begin with.

## answer_c
Have a large Vd

## explanation_c
Incorrect. A drug that is heavily bound to plasma albumin tends to stay largely within the plasma compartment rather than distributing widely into tissue, giving it a small, not a large, volume of distribution.

## answer_d
Effectively cross the BBB

## explanation_d
Incorrect. High albumin binding limits, rather than promotes, blood-brain barrier crossing, since only the free fraction of a drug is available to cross into the CNS.

## answer_e
Often contain quaternary nitrogens

## explanation_e
Incorrect. A quaternary nitrogen makes a molecule permanently charged (ionised) regardless of pH, a structural property unrelated to whether the drug happens to bind albumin heavily.

## topic
Pharmacokinetics 1 (Absorption & distribution)

## subtopic
Factors affecting distribution

## main_concept
CON-FND-53FF18E42BC94B

## concept_ids
CON-FND-53FF18E42BC94B

## contextual_concept_ids

## difficulty
Hard

## question_type
Application

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
30

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
Recognise that heavily albumin-bound drugs can compete with each other for binding sites, a mechanism of drug interaction.

## source_citation
All Quizzes MPT 2022.pdf, 45

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Can undergo competition with other drugs for albumin binding sites"
pendingConcept: CON-FND-53FF18E42BC94B pending in 108-INT-concepts-pharmacology.md (teaching.pharma.distribution.factors) -- this question and its +aun overlay apply only after Omar imports that Kasr batch

---

# Item

## id
QST-AUNMPT104-QUIZZES2022-Q091

## title
How most drugs gain entry to cells

## question
Most drugs gain entry to cells by:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Active transport with zero-order kinetics

## explanation_a
Incorrect. Most drugs do not require a carrier at all (active transport is the exception, reserved for specific drugs resembling endogenous substrates), and zero-order kinetics describes a saturated, capacity-limited process, not the usual case for drug entry.

## answer_b
Passive diffusion through membrane pores

## explanation_b
Incorrect. Passage through aqueous membrane pores (filtration) is reserved for very small, water-soluble molecules; most drugs instead dissolve directly through the lipid of the membrane rather than passing through pores.

## answer_c
Passive diffusion with first-order kinetics

## explanation_c
Correct. Most drugs cross cell membranes by simple (passive) diffusion down their concentration gradient, without a carrier and without energy. The rate of diffusion is proportional to the concentration gradient at any given moment, since it is not capped by a saturable carrier. This makes passive diffusion follow first-order kinetics: a constant fraction, not a constant amount, of the drug crosses per unit time.

## answer_d
Active transport with first-order kinetics

## explanation_d
Incorrect. Active transport is not how most drugs enter cells (it is reserved for specific carrier-dependent drugs), and active transport, being carrier-limited, is typically associated with saturable (zero-order-capable), not universally first-order, kinetics.

## answer_e
Passive diffusion with zero-order kinetics

## explanation_e
Incorrect. Passive diffusion follows first-order, not zero-order, kinetics -- zero-order kinetics describes a saturated, carrier- or enzyme-limited process, which passive diffusion through lipid is not.

## topic
Pharmacokinetics 1 (Absorption & distribution)

## subtopic
Absorption mechanisms

## main_concept
CON-FND-584FCF6897C35E

## concept_ids
CON-FND-584FCF6897C35E

## contextual_concept_ids

## difficulty
Hard

## question_type
Application

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS | ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-ADVERSE-DRUG-REACTIONS | ART-108-PHA-POSOLOGY | ART-108-PHA-MEMBRANE-PASSAGE | ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-ROUTES

## resource_ids
src_3e62ae5ed2a35ed7211c

## learning_objective
State that most drugs enter cells by passive diffusion, which follows first-order kinetics.

## source_citation
All Quizzes MPT 2022.pdf, 45

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Passive diffusion with first-order kinetics"
pendingConcept: CON-FND-584FCF6897C35E pending in 108-INT-concepts-pharmacology.md (teaching.pharma.membrane.simple-diffusion) -- this question and its +aun overlay apply only after Omar imports that Kasr batch
