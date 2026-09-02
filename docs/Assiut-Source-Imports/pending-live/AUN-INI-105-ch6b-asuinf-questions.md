<!--
  AUN-INI-105 -- pending-live overlay questions from the INI MCQ .pdf, Chapter 6 "General virology" triage (pp.63-77), 7 of lane 8's 39 authored Q59-102 questions whose tested idea reuses six already-pending concepts: four from ASU-INF-microbiology-concepts.md already overlaid by lane 6 (latent infection, viroid, envelope lipoprotein, capsid universal component), one more from the same ASU-INF batch newly overlaid this pass (cell tropism), one more from ASU-INF newly overlaid this pass (Negri bodies/rabies), and one from MUST's own FHB-102-2-microbiology-introduction-concepts.md (opportunistic pathogen definition, not yet promoted to docs/import-ready) newly overlaid this pass. Omar applies this batch only after, in order: 1) docs/import-ready/concept/ASU-INF-microbiology-concepts.md, 2) docs/import-ready/article/ASU-INF-microbiology-articles.md, 3) MUST's own docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md, 4) MUST's own docs/MUST-Source-Imports/article/FHB-102-2-microbiology-introduction-articles.md, 5) the updated pending-live/AUN-INI-105-ch6-asuinf-overlay-concepts.md (lane 6's file, now with three more rows appended by lane 8), 6) this file. Steps 1-2 and 3-4 are independent of each other and may run in either pair-order, but each pair's own concept-then-article order must hold; verified end to end via `gate.mjs simulate` over exactly this six-file chain (errors=0). Import: Admin > Bulk import -> concept / article / question as appropriate.

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-AUNINI105-INI-MCQ-CH6-Q070

## title
Latent viral infection: occult, non-replicating, reactivating

## question
Latent virus infection characterized by?

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Viral nucleic acid is present in the cell but not replicating with periodic reactivation

## explanation_a
Correct. A latent viral infection is one in which the virus persists in an occult (hidden, non-productive) form inside the infected cell after the initial infection -- viral nucleic acid is present but not actively replicating -- later reactivating periodically to produce symptoms again, classic examples being herpes simplex and varicella-zoster virus reactivation. This occult, reactivating pattern is distinct from a chronic infection (ongoing, detectable low-level replication throughout, with no true dormancy) or a slow infection (long incubation, progressive disease with no dormant phase).

## answer_b
The virus is continuously replicating

## explanation_b
Incorrect. Continuous, ongoing replication describes a chronic infection, not a latent one, which by definition is characterized by NON-replicating persistence between reactivation episodes.

## answer_c
Acute viral infection with complete recovery

## explanation_c
Incorrect. "Acute infection with complete recovery" describes the opposite of latency -- an acute infection resolves and clears, while a latent infection persists indefinitely with intervening dormancy.

## answer_d
No progeny viruses produced and infection is aborted completely

## explanation_d
Incorrect. "No progeny produced, infection aborted completely" describes an abortive infection, not a latent one, which characteristically DOES eventually produce progeny again upon reactivation.

## topic
General virology

## subtopic
Viral infection patterns

## main_concept
CON-INF-4EC402ABB55946

## concept_ids
CON-INF-4EC402ABB55946

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
AUN-INI-105

## module_subject
AUN-INI-105 > General virology

## question_only_for

## library_ids
ART-INF-VIRAL-INFECTION-PATTERNS-INCLUSION-BODIES

## resource_ids
src_6f2f4188bb0cbf848733

## learning_objective
State that latent viral infection is characterized by occult, non-replicating persistence of viral nucleic acid with periodic reactivation.

## source_citation
INI MCQ .pdf, General virology, p72

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: printed plain-text ANSWERS table, chapter 6, p77
pendingConcept: CON-INF-4EC402ABB55946 is pending in docs/import-ready/concept/ASU-INF-microbiology-concepts.md, canonical_key virus.infection-patterns.latent -- already overlaid for aun/AUN-INI-105 by lane 6's pending-live/AUN-INI-105-ch6-asuinf-overlay-concepts.md; this question and its lane-8 sibling questions apply only after Omar imports that Ain-Shams batch and the (already-existing) overlay file.

---

# Item

## id
QST-AUNINI105-INI-MCQ-CH6-Q071

## title
Cell tropism is determined by receptor affinity

## question
Most viruses infect only a particular host's cell. This specific targeting (cell tropism) is primarily because?

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Viruses that are helical enter into a host cell

## explanation_a
Incorrect. Capsid symmetry (helical vs icosahedral vs complex) is a structural classification feature, not the mechanism that determines which specific cell types a virus can infect.

## answer_b
RNA viruses may use ribozyme to enter a cell

## explanation_b
Incorrect. Ribozymes (catalytic RNA) are not the general mechanism of viral cell entry or tropism.

## answer_c
Capsomeres become enzymatic and digest cell membranes and walls

## explanation_c
Incorrect. Capsomeres are structural capsid subunits; they do not become enzymatic and digest host membranes or walls as an entry mechanism.

## answer_d
Affinity of virus surface proteins for complementary receptors on the surface of the host cells

## explanation_d
Correct. Cell tropism -- why a virus infects some cell types/tissues and not others -- is determined by the affinity of specific virus surface proteins for complementary receptors on the host cell surface, together with other factors such as availability of a proteolytic enzyme the virus requires and favorable local temperature/pH; a cell lacking the required receptor simply cannot be productively infected, regardless of other conditions. This receptor-affinity basis is why tropism is considered a property of the virus-cell interaction itself, not of local immune status.

## answer_e
None of the above

## explanation_e
Incorrect. Option D correctly identifies the primary basis of cell tropism, so "none of the above" is wrong.

## topic
General virology

## subtopic
Viral replication cycle

## main_concept
CON-INF-CE64E7CD7B4393

## concept_ids
CON-INF-CE64E7CD7B4393

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
AUN-INI-105

## module_subject
AUN-INI-105 > General virology

## question_only_for

## library_ids
ART-INF-VIRAL-ONCOGENESIS-TROPISM-RETROVIRAL-INTEGRATION

## resource_ids
src_6f2f4188bb0cbf848733

## learning_objective
State that viral cell tropism is primarily determined by the affinity of viral surface proteins for complementary host cell receptors.

## source_citation
INI MCQ .pdf, General virology, p72

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: printed plain-text ANSWERS table, chapter 6, p77
pendingConcept: CON-INF-CE64E7CD7B4393 is pending in docs/import-ready/concept/ASU-INF-microbiology-concepts.md, canonical_key virus.cell-tropism.determinants -- newly overlaid for aun/AUN-INI-105 by this lane's append to pending-live/AUN-INI-105-ch6-asuinf-overlay-concepts.md; applies only after Omar imports that Ain-Shams batch and the (updated) overlay file.

---

# Item

## id
QST-AUNINI105-INI-MCQ-CH6-Q076

## title
Opportunistic pathogens exploit immunocompromise

## question
Pathogens that can cause serious infections in immunocompromised patients are called?

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Infectious pathogens

## explanation_a
Incorrect. "Infectious pathogens" is a generic term for any organism capable of causing infection; it does not specifically name the condition-dependent behavior described here.

## answer_b
Lethal pathogens

## explanation_b
Incorrect. "Lethal pathogens" describes organisms capable of causing death, a severity descriptor, not the condition-dependent (immunocompromise-exploiting) behavior this question asks about.

## answer_c
Virulent pathogens

## explanation_c
Incorrect. "Virulent pathogens" describes organisms with an inherently high capacity to cause disease in a normal host, the opposite framing from an organism that is normally harmless but becomes dangerous only under permissive (immunocompromised) conditions.

## answer_d
Opportunistic pathogens

## explanation_d
Correct. An opportunistic pathogen is a microorganism that normally does not cause disease but can become pathogenic when host defenses weaken, as in an immunocompromised patient, or when its normal habitat changes. This is exactly the immunocompromised-patient scenario this stem describes. It also distinguishes an opportunistic pathogen from one that is inherently virulent even in a healthy host, since the opportunistic pathogen's danger is condition-dependent rather than intrinsic.

## topic
General virology

## subtopic
General viral properties

## main_concept
CON-INF-17893AA3303251

## concept_ids
CON-INF-17893AA3303251

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
AUN-INI-105

## module_subject
AUN-INI-105 > General virology

## question_only_for

## library_ids
ART-INF-MUST-FHB1022-COLONIZATION-CARRIAGE

## resource_ids
src_6f2f4188bb0cbf848733

## learning_objective
Define an opportunistic pathogen as a normally harmless organism that causes disease when host defenses are compromised.

## source_citation
INI MCQ .pdf, General virology, p73

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: printed plain-text ANSWERS table, chapter 6, p77
pendingConcept: CON-INF-17893AA3303251 is pending in docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md (Menoufia MUST FHB-102-2 lane, not yet promoted to docs/import-ready), canonical_key microbiology.opportunism.opportunistic-pathogen-definition -- newly overlaid for aun/AUN-INI-105 by this lane's append to pending-live/AUN-INI-105-ch6-asuinf-overlay-concepts.md; applies only after Omar imports MUST's own FHB-102-2 batch and the (updated) overlay file.

---

# Item

## id
QST-AUNINI105-INI-MCQ-CH6-Q081

## title
Viroids are naked, low-molecular-weight infective RNA

## question
Viroids?

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Need helper viruses

## explanation_a
Incorrect. Needing a helper virus to replicate describes a defective virus (or a satellite virus), not a viroid, which is not a virus at all and does not depend on a helper virus in this sense.

## answer_b
Have protein coat

## explanation_b
Incorrect. A viroid, by definition, has NO protein coat at all -- that is precisely what distinguishes it from a true virus.

## answer_c
Don't have DNA & RNA

## explanation_c
Incorrect. A viroid does have nucleic acid -- specifically, a small circular RNA molecule; it simply lacks protein and envelope, not nucleic acid altogether.

## answer_d
Naked nucleic acid molecule

## explanation_d
Correct. A viroid is a small, circular RNA molecule -- a naked nucleic acid, with no protein coat (capsid) and no envelope surrounding it -- distinguishing it from a satellite virus (which needs a helper virus to replicate) and from a prion (an infectious protein with no nucleic acid at all, the opposite composition). Viroids are classically associated with plant diseases, not human infection.

## topic
General virology

## subtopic
Virus classification and structure

## main_concept
CON-INF-6EE705523FD61C

## concept_ids
CON-INF-6EE705523FD61C

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
AUN-INI-105

## module_subject
AUN-INI-105 > General virology

## question_only_for

## library_ids
ART-INF-VIRAL-STRUCTURE-CAPSID-ENVELOPE-VIROID

## resource_ids
src_6f2f4188bb0cbf848733

## learning_objective
Define a viroid as a naked (protein-coat-free), circular RNA molecule.

## source_citation
INI MCQ .pdf, General virology, p74

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: printed plain-text ANSWERS table, chapter 6, p77
pendingConcept: CON-INF-6EE705523FD61C is pending in docs/import-ready/concept/ASU-INF-microbiology-concepts.md, canonical_key virus.viroid.definition -- already overlaid for aun/AUN-INI-105 by lane 6's pending-live/AUN-INI-105-ch6-asuinf-overlay-concepts.md; this question applies only after Omar imports that Ain-Shams batch and the (already-existing) overlay file.

---

# Item

## id
QST-AUNINI105-INI-MCQ-CH6-Q087

## title
Enveloped vs non-enveloped differ by presence of lipid

## question
Differentiation of enveloped and non-enveloped viruses are related to the presence or absence of?

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Nucleic acid

## explanation_a
Incorrect. Both enveloped and non-enveloped viruses contain nucleic acid (DNA or RNA); its presence does not distinguish the two structural classes.

## answer_b
lipids

## explanation_b
Correct. The viral envelope is lipoprotein in nature -- its lipid portion is acquired from the host cell's plasma or nuclear membrane during budding, while its protein portion is virus-encoded. An enveloped virus has this lipid-containing outer layer; a non-enveloped (naked) virus does not, making presence or absence of lipid the defining structural difference between the two classes.

## answer_c
Proteins

## explanation_c
Incorrect. Both enveloped and non-enveloped viruses contain protein (at minimum, a capsid); protein presence does not distinguish them, since it is universal to all viruses.

## answer_d
Enzymes

## explanation_d
Incorrect. Enzyme content varies by individual virus family (whether it packages a polymerase, for instance) and is not the defining structural feature separating enveloped from non-enveloped viruses.

## topic
General virology

## subtopic
Capsid and envelope structure

## main_concept
CON-INF-7952070C4BD8AF

## concept_ids
CON-INF-7952070C4BD8AF

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
AUN-INI-105

## module_subject
AUN-INI-105 > General virology

## question_only_for

## library_ids
ART-INF-VIRAL-STRUCTURE-CAPSID-ENVELOPE-VIROID

## resource_ids
src_6f2f4188bb0cbf848733

## learning_objective
State that presence or absence of lipid is what distinguishes enveloped from non-enveloped (naked) viruses.

## source_citation
INI MCQ .pdf, General virology, p74

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: printed plain-text ANSWERS table, chapter 6, p77
pendingConcept: CON-INF-7952070C4BD8AF is pending in docs/import-ready/concept/ASU-INF-microbiology-concepts.md, canonical_key virus.envelope.origin-and-composition -- already overlaid for aun/AUN-INI-105 by lane 6's pending-live/AUN-INI-105-ch6-asuinf-overlay-concepts.md; this question applies only after Omar imports that Ain-Shams batch and the (already-existing) overlay file.

---

# Item

## id
QST-AUNINI105-INI-MCQ-CH6-Q090

## title
Negri inclusion bodies are characteristic of rabies

## question
The presence of Negri inclusion bodies in host cells is characteristic of?

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
E

## answer_a
Mumps

## explanation_a
Incorrect. Mumps virus is not the cause specifically associated with Negri bodies.

## answer_b
Infectious mononucleosis

## explanation_b
Incorrect. Infectious mononucleosis (Epstein-Barr virus) is not associated with Negri bodies; it produces a different set of cellular changes (atypical lymphocytes).

## answer_c
Congenital rubella

## explanation_c
Incorrect. Congenital rubella is not associated with Negri bodies.

## answer_d
Aseptic meningitis

## explanation_d
Incorrect. Aseptic meningitis (caused by various viruses) is not specifically associated with Negri bodies.

## answer_e
Rabies

## explanation_e
Correct. Among viral causes of inclusion bodies, rabies virus is the one specifically associated with "Negri" inclusion bodies -- cytoplasmic inclusions found in infected neurons, classically in the hippocampal pyramidal cells, distinct from the inclusion bodies associated with measles, herpes, or pox viruses. Negri bodies are visible by routine light microscopy with appropriate staining and remain a classic (though not universally sensitive) pathological clue to rabies infection.

## topic
General virology

## subtopic
Viral infection patterns

## main_concept
CON-INF-8989679385BD3C

## concept_ids
CON-INF-8989679385BD3C

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
AUN-INI-105

## module_subject
AUN-INI-105 > General virology

## question_only_for

## library_ids
ART-INF-VIRAL-INFECTION-PATTERNS-INCLUSION-BODIES

## resource_ids
src_6f2f4188bb0cbf848733

## learning_objective
Identify rabies virus as the cause of Negri inclusion bodies.

## source_citation
INI MCQ .pdf, General virology, p75

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: printed plain-text ANSWERS table, chapter 6, p77
pendingConcept: CON-INF-8989679385BD3C is pending in docs/import-ready/concept/ASU-INF-microbiology-concepts.md, canonical_key rabies-virus.negri-bodies -- newly overlaid for aun/AUN-INI-105 by this lane's append to pending-live/AUN-INI-105-ch6-asuinf-overlay-concepts.md; applies only after Omar imports that Ain-Shams batch and the (updated) overlay file.

---

# Item

## id
QST-AUNINI105-INI-MCQ-CH6-Q092

## title
Not all viruses have both a protein capsid and an envelope

## question
Which of the following is not true regarding viruses?

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
May be DNA, RNA, Single, or Double- stranded

## explanation_a
Incorrect as the NOT-true answer -- viral genomes genuinely can be DNA or RNA, single- or double-stranded, so this statement is true.

## answer_b
All are obligate intracellular parasites

## explanation_b
Incorrect as the NOT-true answer -- every virus genuinely IS an obligate intracellular parasite, so this statement is true.

## answer_c
All have a protein capsid and envelope

## explanation_c
Correct (this is the NOT-true statement). The capsid (nucleocapsid) is the structural component found in all viruses, enveloped or not, but the envelope is present only in SOME viruses -- naked (non-enveloped) viruses exist and lack an envelope entirely. Claiming "all" viruses have both a capsid AND an envelope is therefore false, since capsid is universal but envelope is not.

## answer_d
Release virions during cell lysis or budding

## explanation_d
Incorrect as the NOT-true answer -- viruses genuinely do release progeny virions either via cell lysis (naked/lytic route) or via budding (enveloped route), so this statement is true.

## answer_e
All are true

## explanation_e
Incorrect. Since option C is false (not all viruses have an envelope), "all are true" cannot be correct.

## topic
General virology

## subtopic
Capsid and envelope structure

## main_concept
CON-INF-5544B0DB9FAF82

## concept_ids
CON-INF-5544B0DB9FAF82

## contextual_concept_ids
CON-INF-7952070C4BD8AF

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
AUN-INI-105

## module_subject
AUN-INI-105 > General virology

## question_only_for

## library_ids
ART-INF-VIRAL-STRUCTURE-CAPSID-ENVELOPE-VIROID

## resource_ids
src_6f2f4188bb0cbf848733

## learning_objective
State that the capsid, unlike the envelope, is found in every virus -- not all viruses are enveloped.

## source_citation
INI MCQ .pdf, General virology, p75

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: printed plain-text ANSWERS table, chapter 6, p77
pendingConcept: CON-INF-5544B0DB9FAF82 is pending in docs/import-ready/concept/ASU-INF-microbiology-concepts.md, canonical_key virus.structure.capsid-universal-component -- already overlaid for aun/AUN-INI-105 by lane 6's pending-live/AUN-INI-105-ch6-asuinf-overlay-concepts.md; this question applies only after Omar imports that Ain-Shams batch and the (already-existing) overlay file.
