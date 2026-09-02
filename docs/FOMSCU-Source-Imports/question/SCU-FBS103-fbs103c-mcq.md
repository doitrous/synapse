<!--
  SCU-FBS103 S2 minting pass, third author lane (scu-fbs103-author3). 11 questions minting 11 genuinely new concepts (re-verified with find-existing.mjs on a multi-word query plus a grep -ril read of every hit body across docs/*-Source-Imports and docs/import-ready; near-miss hits are named in each concept's own field_notes as rejected merge candidates). Covers anatomy (mandibular nerve motor supply), histology (basic tissue/cell identification), microbiology (virus structure, Gram-positive cell wall), parasitology (old protozoan classification) and pharmacology (aspirin identity, cross tolerance, morphine's plant source). Keys and stems read from the FOMSCU own-source quiz-app JSON (06 EOM Exams/EOM - Foundation 2 2026 - FOMSCU MID - MCQ.json, 07 EOY Exams/EOY - Foundation 2 2025 and 2026 - FOMSCU Final - MCQ.json, 03 Questions and QBank/Formative 2025 - Foundation 2 - MCQ.json, shas verified against manifest/y1-sources.json); explanations written fresh in house voice, never pasted from the source JSON's own (FOMNINU-sourced) Arabic explanation field. No claim/citation/media record minted — scoped to concept, article and question files, matching the standing convention (Kasr's 103-BMS-mcq-lipid-concepts.md, this lane's own SCU-FBS103-concepts-3.md); the evidence chain is owed and named in the hand-off report.

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-SCUFBS103-FBS103C-ANATOMY-MANDIBULAR-NERVE

## title
Motor nerve to the muscles of mastication

## question
The muscles of mastication receive their motor innervation from which of the following nerves?

## subject
msk

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Facial nerve

## explanation_a
Incorrect. The facial nerve (CN VII) supplies the muscles of facial expression, an entirely separate muscle group from the muscles of mastication, which it does not innervate at all.

## answer_b
Maxillary nerve

## explanation_b
Incorrect. The maxillary nerve (V2), the second division of the trigeminal nerve, is purely sensory and carries no motor fibres to any muscle.

## answer_c
Mandibular nerve

## explanation_c
Correct. The mandibular nerve (V3), the third and largest division of the trigeminal nerve, is a mixed nerve that alone carries the trigeminal nerve's entire motor root. This motor root supplies all four muscles of mastication (masseter, temporalis, and the medial and lateral pterygoids), distinguishing V3 from the purely sensory V1 and V2 divisions. Injury isolated to this motor root produces weakness of chewing without any facial-expression weakness, since that is supplied separately by the facial nerve.

## answer_d
Glossopharyngeal nerve

## explanation_d
Incorrect. The glossopharyngeal nerve (CN IX) supplies the stylopharyngeus muscle and carries sensory and parasympathetic fibres to the posterior tongue and parotid gland; it carries no motor fibres to the muscles of mastication.

## topic
Anatomy

## subtopic
Head and neck: trigeminal nerve divisions

## main_concept
CON-MSK-4D215626D6BC20

## concept_ids
CON-MSK-4D215626D6BC20

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.15

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.85

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject
SCU-FBS103 > Anatomy > Head and Neck > Trigeminal Nerve

## question_only_for

## library_ids

## resource_ids

## learning_objective
Identify the mandibular nerve (V3) as the sole carrier of motor innervation to the muscles of mastication.

## source_citation
FOMSCU Foundation 2, EOY Final 2025, Q18

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOY Final 2025 Q18; source-JSON extraction.
mint: find-existing.mjs "mandibular nerve muscles of mastication" — 0 hits. See concept's own field_notes for the rejected merge candidate (CON-NEU-4BFE30D065C975, a different central-nucleus-classification fact).

---

# Item

## id
QST-SCUFBS103-FBS103C-HISTOLOGY-CENTRAL-AND-OVAL

## title
Smooth muscle nucleus: shape and position

## question
Which of the following best describes the appearance and position of the nucleus in smooth muscle fibers?

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
Central and multiple

## explanation_a
Incorrect. A smooth muscle fibre has only a single nucleus, not multiple — multiple nuclei describe skeletal muscle fibres instead.

## answer_b
Peripheral and oval

## explanation_b
Incorrect. A smooth muscle fibre's nucleus is central, not peripheral; a peripheral position instead describes skeletal muscle's nuclei.

## answer_c
Central and oval

## explanation_c
Correct. A smooth muscle fibre (leiomyocyte) has a single nucleus, positioned centrally within the cell and oval in shape, tapering slightly at its ends to follow the spindle shape of the cell. This contrasts with skeletal muscle fibres, whose nuclei are multiple, flattened, and pushed to the cell's periphery just beneath the sarcolemma. The central, oval, single-nucleus pattern is one of the standard light-microscope features used to identify smooth muscle, alongside its lack of striations.

## answer_d
Peripheral and multiple

## explanation_d
Incorrect. Peripheral and multiple nuclei describe skeletal muscle fibres, not smooth muscle, which has a single central nucleus.

## topic
Histology

## subtopic
Muscle tissue: smooth muscle identification

## main_concept
CON-FND-97429CCFF7F704

## concept_ids
CON-FND-97429CCFF7F704

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
4

## clinical_relevance
0.1

## academic_relevance
0.85

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject
SCU-FBS103 > Histology > Muscle Tissue

## question_only_for

## library_ids

## resource_ids

## learning_objective
State that a smooth muscle fibre's nucleus is single, central and oval, distinguishing it from skeletal muscle's multiple, peripheral, flattened nuclei.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q53

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q53; source-JSON extraction.
mint: find-existing.mjs "central and oval nucleus smooth muscle" — 0 hits, safe to create.

---

# Item

## id
QST-SCUFBS103-FBS103C-HISTOLOGY-ECCENTRIC

## title
Macrophage nucleus position

## question
What is the typical position of the nucleus in a macrophage?

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
Peripheral

## explanation_a
Incorrect. A peripheral, flattened position instead typically describes the nucleus of an adipocyte (fat cell), not a macrophage.

## answer_b
Eccentric

## explanation_b
Correct. The macrophage, the activated tissue form of the blood monocyte, characteristically has a nucleus positioned eccentrically — displaced to one side of the cell rather than sitting centrally. This reflects the cell's abundant peripheral cytoplasm, packed with lysosomes and phagocytic vacuoles, which pushes the nucleus off-centre. The eccentric position, together with an irregular cell outline and often a kidney- or horseshoe-shaped nuclear profile, helps distinguish the macrophage on light microscopy from cells with a central nucleus, such as lymphocytes.

## answer_c
Central

## explanation_c
Incorrect. A central nuclear position is more typical of a lymphocyte or a smooth muscle fibre, not a macrophage.

## answer_d
Basal

## explanation_d
Incorrect. A basal position (at the base of the cell, away from a free apical surface) describes the nucleus of a secretory columnar epithelial cell, not a macrophage.

## topic
Histology

## subtopic
Connective tissue cells: macrophage identification

## main_concept
CON-FND-C38D7FEB8040C8

## concept_ids
CON-FND-C38D7FEB8040C8

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
4

## clinical_relevance
0.15

## academic_relevance
0.8

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject
SCU-FBS103 > Histology > Connective Tissue Cells

## question_only_for

## library_ids

## resource_ids

## learning_objective
State that a macrophage's nucleus is typically eccentric in position.

## source_citation
FOMSCU Foundation 2, Formative 2025, Q1

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: Formative 2025 Q1; source-JSON extraction.
mint: find-existing.mjs "eccentric nucleus macrophage" — 0 hits. A grep for "macrophage" surfaced only cell-shape (kidney-shaped nucleus) identification records, a different feature. Safe to create.

---

# Item

## id
QST-SCUFBS103-FBS103C-HISTOLOGY-EPITHELIAL-TISSUE

## title
Epithelial tissue as one of the four basic tissues

## question
Which of the following is considered one of the four basic tissues in the human body?

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
Respiratory tissue

## explanation_a
Incorrect. "Respiratory tissue" names a body system, not a basic tissue category — the respiratory system is itself built from combinations of the four basic tissues.

## answer_b
Epithelial tissue

## explanation_b
Correct. The human body is built from four basic tissues: epithelial tissue, connective tissue, muscular tissue and nervous tissue. Epithelial tissue lines body surfaces and cavities and forms glands, and is one of these four fundamental categories, not a body system or organ. Respiratory, endocrine and immune tissue are not themselves basic-tissue categories; each of those systems is instead constructed from combinations of the four basic tissues.

## answer_c
Endocrine tissue

## explanation_c
Incorrect. "Endocrine tissue" names a body system, not a basic tissue category — endocrine organs are themselves built from epithelial, connective and other basic tissues.

## answer_d
Immune system tissue

## explanation_d
Incorrect. "Immune system tissue" names a body system, not a basic tissue category — lymphoid organs are themselves built from combinations of the four basic tissues.

## topic
Histology

## subtopic
Introduction: the four basic tissues

## main_concept
CON-FND-2442FE83E1BA90

## concept_ids
CON-FND-2442FE83E1BA90

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.15

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

## exam_relevance
4

## clinical_relevance
0.1

## academic_relevance
0.85

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject
SCU-FBS103 > Histology > Introduction

## question_only_for

## library_ids

## resource_ids

## learning_objective
Name epithelial tissue as one of the four basic tissues, distinguishing "basic tissue" from a body system.

## source_citation
FOMSCU Foundation 2, Formative 2025, Q6

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: Formative 2025 Q6; source-JSON extraction.
mint: find-existing.mjs "epithelial tissue four basic tissues" — 0 hits. See concept's own field_notes for the rejected merge candidate (CON-FND-366BDE9995356F, a different fact about epithelium's unique polarity).

---

# Item

## id
QST-SCUFBS103-FBS103C-HISTOLOGY-WALLS-OF-BLOOD-VESSELS

## title
Smooth muscle in the walls of blood vessels

## question
Which of the following structures is primarily composed of smooth muscle tissue?

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
Muscles of the human tongue

## explanation_a
Incorrect. The muscles of the tongue are skeletal (voluntary, striated) muscle, not smooth muscle.

## answer_b
Walls of the blood vessels

## explanation_b
Correct. The walls of blood vessels are composed primarily of smooth muscle tissue, concentrated in the tunica media, which allows involuntary regulation of vessel diameter (vasoconstriction and vasodilation) without conscious control. This distinguishes blood vessel walls from the tongue and skeletal muscles, which are voluntary skeletal muscle, and from the heart, whose wall is cardiac muscle: striated but involuntary, and structurally distinct from vascular smooth muscle.

## answer_c
Muscles attached to the skeleton

## explanation_c
Incorrect. Muscles attached to the skeleton are, by definition, skeletal muscle, not smooth muscle.

## answer_d
Cardiac muscle of the heart

## explanation_d
Incorrect. The heart wall is composed of cardiac muscle, a striated and involuntary muscle type structurally and functionally distinct from smooth muscle.

## topic
Histology

## subtopic
Muscle tissue: smooth muscle distribution

## main_concept
CON-FND-BEE052613B7347

## concept_ids
CON-FND-BEE052613B7347

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.15

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

## exam_relevance
4

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject
SCU-FBS103 > Histology > Muscle Tissue

## question_only_for

## library_ids

## resource_ids

## learning_objective
State that the walls of blood vessels are composed primarily of smooth muscle tissue.

## source_citation
FOMSCU Foundation 2, Formative 2025, Q13

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: Formative 2025 Q13; source-JSON extraction.
mint: find-existing.mjs "walls of blood vessels smooth muscle" — 0 hits, safe to create.

---

# Item

## id
QST-SCUFBS103-FBS103C-MICROBIOLOGY-PROTEIN-COAT-NUCLEIC-ACID

## title
The basic structure of a virus

## question
The basic structure of a virus primarily consists of:

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
A complete cell with nucleus and organelles

## explanation_a
Incorrect. A virus has no nucleus, cytoplasm or organelles of its own; it is not a complete, independently metabolising cell.

## answer_b
A protein coat and nucleic acid

## explanation_b
Correct. A virus's basic structure is a nucleic acid genome (DNA or RNA, never both) enclosed within a protective protein coat called the capsid. Some viruses add a lipid envelope derived from host membrane around the capsid, but the protein coat plus nucleic acid pairing is the structure common to every virus. This is fundamentally different from a bacterial cell, which is a complete, independently metabolising cell with its own peptidoglycan wall, ribosomes and cytoplasmic organelles.

## answer_c
Peptidoglycan cell wall and ribosomes

## explanation_c
Incorrect. A peptidoglycan cell wall and ribosomes are features of a bacterial cell, not a virus, which entirely lacks both.

## answer_d
Lipid bilayer exclusively without proteins

## explanation_d
Incorrect. Not every virus has a lipid envelope at all (many, such as adenoviruses, are non-enveloped), and even an enveloped virus's structure still centres on the protein coat and nucleic acid, not an exclusively protein-free lipid bilayer.

## topic
Microbiology

## subtopic
General virology: basic virus structure

## main_concept
CON-INF-88CF1D8B051CF9

## concept_ids
CON-INF-88CF1D8B051CF9

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.15

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

## exam_relevance
5

## clinical_relevance
0.25

## academic_relevance
0.85

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject
SCU-FBS103 > Microbiology > General Virology

## question_only_for

## library_ids

## resource_ids

## learning_objective
State that a virus's basic structure is a protein coat (capsid) enclosing its nucleic acid genome.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q17

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q17 (repeated verbatim in EOY Final 2026 Q17); source-JSON extraction.
mint: find-existing.mjs "virus protein coat nucleic acid" — 0 hits, safe to create.

---

# Item

## id
QST-SCUFBS103-FBS103C-MICROBIOLOGY-CELL-WALL

## title
Gram-positive cell wall and peptidoglycan

## question
Which structural component of Gram-positive bacteria contains a thick layer of peptidoglycan?

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
Cell wall

## explanation_a
Correct. The cell wall is the structural component of a Gram-positive bacterium that contains a thick layer of peptidoglycan, in contrast to the thin peptidoglycan layer of a Gram-negative cell wall. This thick peptidoglycan is also what retains the crystal violet-iodine complex in the Gram stain, giving Gram-positive organisms their characteristic violet colour.

## answer_b
Nucleoid

## explanation_b
Incorrect. The nucleoid is the region of the bacterial cytoplasm holding the chromosome; it contains no peptidoglycan at all.

## answer_c
Capsule

## explanation_c
Incorrect. The capsule is a polysaccharide layer external to the cell wall, present in only some species; it is not the peptidoglycan-containing structure.

## answer_d
Cell membrane

## explanation_d
Incorrect. The cell membrane is the lipid bilayer internal to the cell wall; like the nucleoid, it contains no peptidoglycan.

## topic
Microbiology

## subtopic
General bacteriology: Gram-positive cell wall

## main_concept
CON-INF-876D1C153188B8

## concept_ids
CON-INF-876D1C153188B8

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
5

## clinical_relevance
0.3

## academic_relevance
0.8

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject
SCU-FBS103 > Microbiology > General Bacteriology

## question_only_for

## library_ids

## resource_ids

## learning_objective
Identify the cell wall as the Gram-positive bacterial structure containing a thick peptidoglycan layer, distinguishing it from the nucleoid, capsule and cell membrane.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q19

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q19 (repeated verbatim in EOY Final 2026 Q19); source-JSON extraction.
mint: find-existing.mjs "gram-positive cell wall thick peptidoglycan" — 0 hits. See concept's own field_notes for the rejected merge candidate (CON-INF-7E3B831D71A008, a different tested fact about teichoic acid).

---

# Item

## id
QST-SCUFBS103-FBS103C-PARASITOLOGY-SARCODINA

## title
Old protozoan classification: Sarcodina

## question
According to its old taxonomic classification, which group of protozoa is characterized by the use of pseudopodia for locomotion?

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
Mastigophora

## explanation_a
Incorrect. Mastigophora is the old classification group characterised by flagella, not pseudopodia.

## answer_b
Sarcodina

## explanation_b
Correct. Under the old (pre-molecular) taxonomic classification of protozoa by mode of locomotion, Sarcodina is the group characterised by pseudopodia — temporary cytoplasmic extensions used for amoeboid movement, as in Entamoeba. This distinguishes Sarcodina from Mastigophora (flagella), Ciliophora (cilia) and Sporozoa (no clear locomotor organelle at any stage).

## answer_c
Sporozoa

## explanation_c
Incorrect. Sporozoa are the old classification group with no clear locomotor organelle, not pseudopodia.

## answer_d
Ciliophora

## explanation_d
Incorrect. Ciliophora is the old classification group characterised by cilia, not pseudopodia.

## topic
Parasitology

## subtopic
General parasitology: old protozoan classification

## main_concept
CON-INF-85B8A95618EA94

## concept_ids
CON-INF-85B8A95618EA94

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
4

## clinical_relevance
0.15

## academic_relevance
0.85

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject
SCU-FBS103 > Parasitology > General Parasitology

## question_only_for

## library_ids

## resource_ids

## learning_objective
Identify Sarcodina as the old taxonomic protozoan group characterised by pseudopodial (amoeboid) locomotion.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q2

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q2 (repeated verbatim in EOY Final 2026 Q2); source-JSON extraction.
mint: find-existing.mjs "sarcodina pseudopodia protozoa" — 0 hits, safe to create.

---

# Item

## id
QST-SCUFBS103-FBS103C-PHARMACOLOGY-ACETYLSALICYLIC-ACID

## title
Aspirin's chemical identity

## question
Aspirin is the brand or common name for which of the following chemical compounds?

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
Acetylsalicylic acid

## explanation_a
Correct. Aspirin is the common (and originally brand) name for the chemical compound acetylsalicylic acid, a non-steroidal anti-inflammatory drug (NSAID) that acetylates and irreversibly inhibits cyclooxygenase (COX). This irreversible inhibition is the basis of aspirin's long-lasting antiplatelet effect, since platelets cannot resynthesise cyclooxygenase.

## answer_b
Ibuprofen

## explanation_b
Incorrect. Ibuprofen is a separate NSAID compound with its own chemical identity, not a brand name for acetylsalicylic acid.

## answer_c
Diclofenac sodium

## explanation_c
Incorrect. Diclofenac sodium is a separate NSAID compound with its own chemical identity, not a brand name for acetylsalicylic acid.

## answer_d
Acetaminophen

## explanation_d
Incorrect. Acetaminophen (paracetamol) is a distinct, non-NSAID analgesic and antipyretic, not a brand name for acetylsalicylic acid.

## topic
Pharmacology

## subtopic
General pharmacology: drug names and identities

## main_concept
CON-FND-70F5839FD191FA

## concept_ids
CON-FND-70F5839FD191FA

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.15

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

## exam_relevance
5

## clinical_relevance
0.35

## academic_relevance
0.75

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject
SCU-FBS103 > Pharmacology > General Pharmacology

## question_only_for

## library_ids

## resource_ids

## learning_objective
State that aspirin is the common name for acetylsalicylic acid.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q13

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q13 (repeated verbatim in EOY Final 2026 Q13); source-JSON extraction.
mint: find-existing.mjs "acetylsalicylic acid aspirin" — 0 hits, safe to create.

---

# Item

## id
QST-SCUFBS103-FBS103C-PHARMACOLOGY-CROSS-TOLERANCE

## title
Cross tolerance within a drug class

## question
What term is used to describe the development of tolerance to a specific drug that also results in tolerance to other drugs within the same pharmacological group?

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
Idiosyncrasy

## explanation_a
Incorrect. Idiosyncrasy is an unusual, unpredictable drug reaction unrelated to dose or prior exposure, not a shared tolerance across a drug class.

## answer_b
Cross tolerance

## explanation_b
Correct. Cross tolerance is the phenomenon in which tolerance developed to one drug also reduces the response to other drugs within the same pharmacological group, even without prior exposure to those other drugs. It is distinct from tachyphylaxis (a much faster loss of response, over minutes to hours, from repeated doses of the same drug), idiosyncrasy, and drug dependence.

## answer_c
Tachyphylaxis

## explanation_c
Incorrect. Tachyphylaxis is a rapid loss of response occurring over a much shorter timescale, from repeated dosing of the same drug, not a tolerance that extends across a drug class.

## answer_d
Drug dependence

## explanation_d
Incorrect. Drug dependence describes a compulsive pattern of drug-seeking behaviour, not a reduction in drug effect shared across a pharmacological group.

## topic
Pharmacology

## subtopic
General pharmacology: tolerance and its variants

## main_concept
CON-FND-B147F4448B4BF1

## concept_ids
CON-FND-B147F4448B4BF1

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
4

## clinical_relevance
0.3

## academic_relevance
0.8

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject
SCU-FBS103 > Pharmacology > General Pharmacology

## question_only_for

## library_ids

## resource_ids

## learning_objective
Define cross tolerance as tolerance to one drug extending to other drugs of the same pharmacological group.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q14

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q14 (repeated verbatim in EOY Final 2026 Q14); source-JSON extraction.
mint: find-existing.mjs "cross tolerance pharmacology" — 0 hits, safe to create.

---

# Item

## id
QST-SCUFBS103-FBS103C-PHARMACOLOGY-PLANT-SOURCE

## title
Morphine's natural source

## question
What is the natural source from which morphine is primarily derived?

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
Microorganism source

## explanation_a
Incorrect. Microbially-sourced drugs include most antibiotics (produced by fungi or bacteria), not morphine.

## answer_b
Plant source

## explanation_b
Correct. Morphine is an opioid alkaloid derived primarily from a plant source — the opium poppy (Papaver somniferum) — rather than from a microorganism, an animal, or a fully synthetic process. This places it among plant-derived drugs, such as atropine, distinct from microbially-sourced, animal-derived and synthetic drug categories.

## answer_c
Animal source

## explanation_c
Incorrect. Animal-derived drugs include examples such as historical bovine/porcine insulin, not morphine.

## answer_d
Synthetic source

## explanation_d
Incorrect. Morphine is a naturally occurring plant alkaloid, extracted from the opium poppy, not manufactured entirely by chemical synthesis.

## topic
Pharmacology

## subtopic
General pharmacology: sources of drugs

## main_concept
CON-FND-342512BCB62F65

## concept_ids
CON-FND-342512BCB62F65

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
4

## clinical_relevance
0.25

## academic_relevance
0.8

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject
SCU-FBS103 > Pharmacology > General Pharmacology

## question_only_for

## library_ids

## resource_ids

## learning_objective
State that morphine is derived primarily from a plant source (the opium poppy).

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q48

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q48; source-JSON extraction.
mint: find-existing.mjs "morphine plant source" — 0 hits. See concept's own field_notes for the rejected merge candidate (CON-FND-F468990E215745, which names morphine only as a passing counter-example).
