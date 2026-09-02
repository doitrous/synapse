<!--
  SCU-FBS103 S2 minting pass, third author lane (scu-fbs103-author3). 8 questions reusing an existing concept (all pending in other lanes' or this same lane's own unimported batches). Keys and stems read from the FOMSCU own-source quiz-app JSON; explanations rewritten in house voice, never pasted from the source JSON's own (FOMNINU-sourced) Arabic explanation field. Continues the cluster 'fbs103c' numbering from the sibling fbs103c-mints.json (q01-q11) at q12. Apply after docs/FOMSCU-Source-Imports/pending-live/SCU-FBS103-overlay-concepts.md (BATCH 5, appended by this lane) and docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-overlay-concepts.md (golgi apparatus and mesenchymal-cell rows extended by this lane) and, for the pending-concept rows, after their named source files are live — see the overlay files' own headers for the exact gate command.

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-SCUFBS103-FBS103C-HISTOLOGY-GOLGI-APPARATUS

## title
The Golgi apparatus and protein packaging

## question
Which of the following organelles is primarily responsible for the packaging of proteins?

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
Rough endoplasmic reticulum network

## explanation_a
Incorrect. The rough endoplasmic reticulum synthesises proteins destined for secretion or membrane insertion; it does not package them.

## answer_b
Smooth endoplasmic reticulum network

## explanation_b
Incorrect. The smooth endoplasmic reticulum is chiefly involved in lipid synthesis and detoxification, not protein packaging.

## answer_c
Peroxisomes

## explanation_c
Incorrect. Peroxisomes break down fatty acids and toxic substances by oxidation; they are not the organelle responsible for packaging proteins.

## answer_d
Golgi apparatus

## explanation_d
Correct. The Golgi apparatus is a stack of flat saccules with an entry (cis) face, which receives transfer vesicles from the rough endoplasmic reticulum, and an exit (trans) face, from which its finished products bud off. It packs, concentrates and chemically modifies protein (adding carbohydrate to make glycoprotein), forming secretory vesicles and primary lysosomes as it does so, which is why it is the organelle primarily responsible for the packaging of proteins.

## topic
Histology

## subtopic
Cytoplasmic organelles: the Golgi apparatus

## main_concept
CON-FND-405BB5EA3C359E

## concept_ids
CON-FND-405BB5EA3C359E

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
SCU-FBS103 > Histology > Cytoplasmic Organelles

## question_only_for

## library_ids

## resource_ids

## learning_objective
State that the Golgi apparatus is the organelle primarily responsible for packaging proteins, distinguishing it from the rough/smooth endoplasmic reticulum and peroxisomes.

## source_citation
FOMSCU Foundation 2, Formative 2025, Q2

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: Formative 2025 Q2; source-JSON extraction.
reuse: find-existing.mjs "golgi apparatus packaging proteins" returned no hit on the exact query; a targeted grep for the Golgi's structural/functional description found CON-FND-405BB5EA3C359E in docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md (also mirrored, unimported, in docs/import-ready/concept/101-ISK-mcq-concepts.md), whose own definition states the Golgi "packs, concentrates and stores protein" — the same fact this stem tests, from a Foundation 2 paper rather than Foundation 1. Already +scu overlaid (docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-overlay-concepts.md) by an earlier FBS102 pass reusing the same concept for a different Golgi question (EM structure); this lane extends that same overlay row with the +SCU-FBS103 module tag and a new field_note rather than adding a duplicate. Apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS103-FBS103C-HISTOLOGY-MESENCHYMAL-CELL

## title
The mesenchymal cell as fibroblast's mother cell

## question
Which of the following cells is considered the main mother cell that differentiates into a fibroblast?

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
Monocyte

## explanation_a
Incorrect. The monocyte is a blood cell that differentiates into a macrophage upon entering tissue, not into a fibroblast.

## answer_b
Macrophage

## explanation_b
Incorrect. The macrophage is itself the tissue-resident derivative of the monocyte, not the mother cell of the fibroblast.

## answer_c
Mast cell

## explanation_c
Incorrect. The mast cell arises from a distinct bone-marrow-derived progenitor and is responsible for secreting heparin and histamine, not for giving rise to fibroblasts.

## answer_d
Mesenchymal cell

## explanation_d
Correct. The active fibroblast, the commonest cell of connective tissue proper, arises from the undifferentiated mesenchymal cell (and from the pericyte). The mesenchymal cell is the embryonic connective-tissue stem cell that differentiates into fibroblasts and several other connective tissue cell lines, distinguishing it from blood-derived cells such as the monocyte, macrophage and mast cell.

## topic
Histology

## subtopic
Connective tissue cells: origin of the fibroblast

## main_concept
CON-FND-9EA7F8E2898EB7

## concept_ids
CON-FND-9EA7F8E2898EB7

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
SCU-FBS103 > Histology > Connective Tissue Cells

## question_only_for

## library_ids

## resource_ids

## learning_objective
State that the mesenchymal cell is the mother cell that differentiates into the fibroblast.

## source_citation
FOMSCU Foundation 2, Formative 2025, Q12

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: Formative 2025 Q12; source-JSON extraction.
reuse: This lane's own coverage/SCU-FBS103-triage.md already names the correct existing hit for this exact stem: docs/import-ready/concept/101-ISK-concepts.md, 'The active fibroblast comes from the mesenchymal cell and is built to synthesise protein' (CON-FND-9EA7F8E2898EB7), also present in docs/Kasr-Source-Imports/concept/101-ISK-concepts.md. Already +scu overlaid (docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-overlay-concepts.md) by an earlier FBS102 pass reusing the same concept for a different fact (ground substance); this lane extends that same overlay row with the +SCU-FBS103 module tag and a new field_note rather than adding a duplicate. Apply after docs/Kasr-Source-Imports/concept/101-ISK-concepts.md.

---

# Item

## id
QST-SCUFBS103-FBS103C-MICROBIOLOGY-ASPERGILLUS

## title
Aflatoxin's fungal source

## question
Aflatoxin acts as a potent mycotoxin that is primarily produced by which of the following fungi?

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
Cryptococcus neoformans

## explanation_a
Incorrect. Cryptococcus neoformans is a yeast associated with cryptococcal meningitis, not with aflatoxin production.

## answer_b
Aspergillus species

## explanation_b
Correct. Aflatoxin, a potent mycotoxin and a chemical carcinogen linked to hepatocellular carcinoma, is primarily produced by Aspergillus species, particularly Aspergillus flavus. It contaminates improperly stored grains and nuts, entering the food chain when these crops are consumed. Chronic dietary exposure is the recognised route by which aflatoxin exerts its carcinogenic effect on the liver.

## answer_c
Candida albicans

## explanation_c
Incorrect. Candida albicans is a yeast responsible for candidiasis, not for aflatoxin production.

## answer_d
Dermatophytes

## explanation_d
Incorrect. Dermatophytes are fungi that cause superficial skin, hair and nail infections, not aflatoxin production.

## topic
Microbiology

## subtopic
Mycology: mycotoxins

## main_concept
CON-FND-D1D48A5564E978

## concept_ids
CON-FND-D1D48A5564E978

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
0.35

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
SCU-FBS103 > Microbiology > Mycology

## question_only_for

## library_ids

## resource_ids

## learning_objective
State that aflatoxin is primarily produced by Aspergillus species.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q20

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q20 (repeated verbatim in EOY Final 2026 Q20); source-JSON extraction.
reuse: find-existing.mjs "aflatoxin aspergillus" surfaced CON-FND-D1D48A5564E978 in docs/Kasr-Source-Imports/concept/208-INT-concepts.md, whose own label states aflatoxin is a carcinogen 'from Aspergillus flavus' — the same source-fungus fact this stem tests, from the fungal-ID angle rather than the cancer-caused angle. Apply after docs/Kasr-Source-Imports/concept/208-INT-concepts.md.

---

# Item

## id
QST-SCUFBS103-FBS103C-MICROBIOLOGY-EXOENZYMES

## title
Tissue-degrading bacterial enzymes

## question
The enzymes produced by some bacteria to break down tissue barriers and spread deeper into host tissues are known as:

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
Exoenzymes (Invasion factors)

## explanation_a
Correct. Exoenzymes, also called invasion factors, actively promote bacterial invasion by degrading tissue barriers. Collagenase and hyaluronidase are the classic examples, breaking down collagen and the hyaluronic-acid-rich extracellular matrix respectively. Once these barriers are degraded, the organism can spread deeper into host tissue than it otherwise could.

## answer_b
Capsules

## explanation_b
Incorrect. Capsules are polysaccharide structures that resist host phagocytosis; they are not enzymes and do not break down tissue barriers.

## answer_c
Endotoxins

## explanation_c
Incorrect. Endotoxins are the lipopolysaccharide component of the Gram-negative outer membrane, released mainly on bacterial lysis; they are not tissue-degrading enzymes.

## answer_d
Siderophores

## explanation_d
Incorrect. Siderophores are small molecules bacteria secrete to scavenge iron from the host, not enzymes that degrade tissue barriers.

## topic
Microbiology

## subtopic
Bacterial virulence: invasion factors

## main_concept
CON-INF-1EAFF70A6FC769

## concept_ids
CON-INF-1EAFF70A6FC769

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
SCU-FBS103 > Microbiology > Bacterial Virulence

## question_only_for

## library_ids

## resource_ids

## learning_objective
Identify exoenzymes (invasion factors) as the tissue-degrading enzymes some bacteria produce to spread into host tissue.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q49

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q49; source-JSON extraction.
reuse: find-existing.mjs "exoenzymes invasion factors bacteria" surfaced CON-INF-1EAFF70A6FC769 in docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md, whose own definition names collagenase, hyaluronidase and invasins as 'invasion-promoting factors' — the same fact this stem tests, against simpler distractors (capsules/endotoxins/siderophores) rather than that concept's own pili/flagella contrast. Apply after docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md.

---

# Item

## id
QST-SCUFBS103-FBS103C-MICROBIOLOGY-HETEROTROPHS

## title
Bacteria requiring preformed organic carbon

## question
The bacteria that require preformed organic compounds as a carbon source are called:

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
Autotrophs

## explanation_a
Incorrect. Autotrophic bacteria synthesise organic molecules using CO2 as their carbon source, rather than requiring preformed organic compounds, and do not cause human disease.

## answer_b
Heterotrophs

## explanation_b
Correct. Heterotrophic bacteria require preformed organic carbon compounds — including every clinically relevant, pathogenic and normal-flora (commensal) organism, which are all heterotrophic. This is the standard classification of bacteria by carbon source, contrasting with autotrophs, which fix CO2.

## answer_c
Phototrophs

## explanation_c
Incorrect. Phototrophs use light as an energy source, a classification based on energy source rather than specifically on requiring preformed organic carbon compounds.

## answer_d
Chemotrophs

## explanation_d
Incorrect. Chemotrophs use chemical reactions as an energy source, a classification based on energy source rather than specifically on requiring preformed organic carbon compounds.

## topic
Microbiology

## subtopic
General bacteriology: nutritional classification

## main_concept
CON-INF-841FAB7F11BA18

## concept_ids
CON-INF-841FAB7F11BA18

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
SCU-FBS103 > Microbiology > General Bacteriology

## question_only_for

## library_ids

## resource_ids

## learning_objective
Identify heterotrophs as bacteria requiring preformed organic carbon compounds.

## source_citation
FOMSCU Foundation 2, EOY Final 2025, Q28

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOY Final 2025 Q28; source-JSON extraction.
reuse: find-existing.mjs "heterotrophs preformed organic compounds carbon" surfaced CON-INF-841FAB7F11BA18 in docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md, whose own definition states 'Heterotrophic bacteria require preformed organic carbon compounds' — an exact match. Apply after docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md (same file as the row above).

---

# Item

## id
QST-SCUFBS103-FBS103C-MICROBIOLOGY-OUTER-MEMBRANE

## title
Gram-negative outer membrane

## question
Which of the following structures is characteristically present in the cell wall of Gram-negative bacteria but absent in Gram-positive bacteria?

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
Thick layer of peptidoglycan

## explanation_a
Incorrect. A thick layer of peptidoglycan is characteristic of Gram-POSITIVE, not Gram-negative, cell walls, which instead have only a thin peptidoglycan layer.

## answer_b
Teichoic acid

## explanation_b
Incorrect. Teichoic acid and lipoteichoic acid are Gram-positive-only wall components, absent from Gram-negative bacteria — the reverse of what this stem asks.

## answer_c
Outer membrane

## explanation_c
Correct. The outer membrane, containing lipopolysaccharide whose lipid A component is the toxic moiety, occurs only in Gram-negative bacteria and is entirely absent from Gram-positive cell walls. Porin proteins spanning this outer membrane allow passage of small hydrophilic solutes but not large molecules such as amino acids or proteins.

## answer_d
Mycolic acid

## explanation_d
Incorrect. Mycolic acid is a distinctive cell-wall lipid of Mycobacteria (acid-fast organisms), not a general feature distinguishing Gram-negative from Gram-positive bacteria.

## topic
Microbiology

## subtopic
General bacteriology: Gram-negative cell wall

## main_concept
CON-INF-BF26D7E563FB78

## concept_ids
CON-INF-BF26D7E563FB78

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.4

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
SCU-FBS103 > Microbiology > General Bacteriology

## question_only_for

## library_ids

## resource_ids

## learning_objective
Identify the outer membrane as the structure present in Gram-negative but absent in Gram-positive bacterial cell walls.

## source_citation
FOMSCU Foundation 2, EOY Final 2025, Q2

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOY Final 2025 Q2; source-JSON extraction.
reuse: find-existing.mjs "gram-negative outer membrane" was a direct hit on CON-INF-BF26D7E563FB78 in docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md, whose own definition states 'the outer membrane occurs only in Gram-negative bacteria, not in Gram-positive ones' — an exact match. Apply after docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md (same file as the two rows above).

---

# Item

## id
QST-SCUFBS103-FBS103C-PHARMACOLOGY-HALF-LIFE-FIRST-ORDER

## title
First-order kinetics and constant half-life

## question
Ampicillin is metabolized by first-order kinetics. Which of the following statements best describes this pharmacokinetic property?

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
A constant amount of the drug is eliminated per unit time

## explanation_a
Incorrect. Elimination of a constant AMOUNT per unit time describes zero-order, not first-order, kinetics.

## answer_b
The elimination half-life of the drug is constant

## explanation_b
Correct. Plasma half-life is the time taken for the plasma concentration to fall by half, and it is fixed only in first-order elimination, where a constant FRACTION (not amount) of the drug is eliminated per unit time. Once the eliminating enzyme system saturates, kinetics shift to zero-order, and the half-life is no longer constant.

## answer_c
The rate of elimination is independent of drug concentration

## explanation_c
Incorrect. Elimination independent of drug concentration describes zero-order kinetics, the opposite of the concentration-proportional elimination of first-order kinetics.

## answer_d
The drug accumulates to toxic levels very rapidly

## explanation_d
Incorrect. Rapid accumulation to toxic levels is a hallmark concern in zero-order (saturation) kinetics, not the well-behaved, constant-half-life pattern of first-order kinetics.

## topic
Pharmacology

## subtopic
Fundamental principles of pharmacokinetics: half-life

## main_concept
CON-FND-955AD7B6FE6F03

## concept_ids
CON-FND-955AD7B6FE6F03

## contextual_concept_ids

## difficulty
Hard

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
35

## exam_relevance
5

## clinical_relevance
0.4

## academic_relevance
0.8

## exam_weight_by_year
SCU_Y1=high

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject
SCU-FBS103 > Pharmacology > Fundamental Principles of Pharmacokinetics

## question_only_for

## library_ids

## resource_ids

## learning_objective
State that plasma half-life is constant only under first-order elimination kinetics.

## source_citation
FOMSCU Foundation 2, EOY Final 2025, Q11

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOY Final 2025 Q11; source-JSON extraction.
reuse: find-existing.mjs "ampicillin first-order kinetics half-life constant" surfaced CON-FND-955AD7B6FE6F03 in docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md, whose own definition states half-life 'is a constant only while elimination is first-order' — an exact match. Apply after docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md.

---

# Item

## id
QST-SCUFBS103-FBS103C-PHARMACOLOGY-PK-DEFINITION

## title
Defining pharmacokinetics

## question
Which of the following statements correctly represents the concept of pharmacokinetics?

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
The study of biological and therapeutic effects of drugs

## explanation_a
Incorrect. The biological and therapeutic effects of drugs are the subject of pharmacodynamics (what the drug does to the body), not pharmacokinetics.

## answer_b
The study of absorption, distribution, metabolism, and excretion of drugs

## explanation_b
Correct. Pharmacokinetics describes what the body does to the drug: its movement through absorption, distribution, metabolism and excretion (ADME). This determines the concentration of drug that reaches the site of action at any given time. It is distinct from pharmacodynamics, which describes what the drug then does at that site once it arrives there.

## answer_c
The study of mechanisms of drug action

## explanation_c
Incorrect. The mechanisms of drug action are the subject of pharmacodynamics, not pharmacokinetics.

## answer_d
The study of methods of new drug development

## explanation_d
Incorrect. Methods of new drug development belong to pharmaceutics and drug discovery, not to the pharmacokinetics of an individual drug already in use.

## topic
Pharmacology

## subtopic
General pharmacology: scope of pharmacokinetics

## main_concept
CON-FND-6BB35F11EBD54B

## concept_ids
CON-FND-6BB35F11EBD54B

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
SCU-FBS103 > Pharmacology > Introduction

## question_only_for

## library_ids

## resource_ids

## learning_objective
State that pharmacokinetics is the study of absorption, distribution, metabolism and excretion of drugs, distinguishing it from pharmacodynamics.

## source_citation
FOMSCU Foundation 2, EOY Final 2025, Q22

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 2 QBank
fomscu: EOY Final 2025 Q22; source-JSON extraction.
reuse: find-existing.mjs "pharmacokinetics absorption distribution metabolism excretion" surfaced CON-FND-6BB35F11EBD54B in docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md, whose own definition states pharmacokinetics 'describes the movement of a drug through the body — absorption, distribution, metabolism and excretion' — an exact match. Apply after docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md (same file as the row above).
