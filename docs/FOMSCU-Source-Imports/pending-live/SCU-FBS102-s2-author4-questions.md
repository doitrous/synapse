<!--
  SCU-FBS102 · Foundation 1 — S2 minting pass, fourth author lane
  (scu-fbs102-author4), histology + biochemistry cluster. 16 authored
  questions: 4 against newly minted concepts (sibling
  concept/SCU-FBS102-s2-author4-mint-concepts.md), 9 overlaying an
  existing concept found only after a closer grep pass (sibling
  pending-live/SCU-FBS102-overlay-concepts.md, BATCH 3), and 3 citing a
  concept an earlier lane already tagged +scu — a second FOMSCU
  exam-year printing of the same fact (ATP, glycine,
  irreversible-inhibition).

  Gate together with:
    --with docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-overlay-concepts.md
    --with docs/FOMSCU-Source-Imports/concept/SCU-FBS102-s2-author4-mint-concepts.md
    --with docs/FOMSCU-Source-Imports/article/SCU-FBS102-s2-author4-mint-articles.md
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md
    --with docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md
    --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-SCUFBS102-S2-PENDING-HISTOLOGY-CRISTAE

## title
The folded inner mitochondrial membrane

## question
What is the folded inner surface membrane of the mitochondria called?

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
Cisternae

## explanation_a
Incorrect. Cisternae are the flattened, membrane-bound sacs of the endoplasmic reticulum and Golgi apparatus, not a feature of the mitochondrion's own membranes.

## answer_b
Cristae

## explanation_b
Correct. A mitochondrion is bounded by two unit membranes: a smooth outer membrane carrying porins, and a selectively permeable inner membrane thrown into folds called cristae. The cristae greatly increase the inner membrane's surface area and carry the elementary particles (ATP synthase) that generate ATP by oxidative phosphorylation.

## answer_c
Matrix

## explanation_c
Incorrect. The matrix is the space enclosed within the inner membrane, holding the citric acid cycle enzymes and mitochondrial DNA — it is a compartment, not the folded membrane itself.

## answer_d
Tubules

## explanation_d
Incorrect. Tubules are not a standard term for mitochondrial membrane architecture; the inner membrane's folds are specifically called cristae, not tubules.

## topic
Histology

## subtopic
Cytoplasmic organelles: mitochondrion

## main_concept
CON-FND-29AD7E837E1E1E

## concept_ids
CON-FND-29AD7E837E1E1E

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
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Cytoplasmic Organelles

## question_only_for

## library_ids
ART-101-HIS-CYTOPLASMIC-ORGANELLES

## resource_ids

## learning_objective
Name cristae as the folded inner mitochondrial membrane, distinct from the matrix it encloses.

## source_citation
FOMSCU Foundation 1, EOY Final 2026 Q22

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOY Final 2026 Q22; source-JSON extraction.
reclassification: find-existing.mjs's multi-word query 'mitochondrial cristae' returned no existing record (its own live hit for bare 'cristae' is the unrelated vestibular-canal cristae homonym the triage's manual QA pass already flagged). A direct grep for 'cristae' inside docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md found CON-FND-29AD7E837E1E1E, whose own definition states the inner membrane 'is thrown into folds — the cristae'. Overlaid rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-HISTOLOGY-EXOCRINE-GLANDS

## title
Gland type where myoepithelial cells occur

## question
Myoepithelial cells are mainly present in which of the following types of glands?

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
Endocrine glands

## explanation_a
Incorrect. Endocrine glands secrete hormones directly into the bloodstream and have no duct system to squeeze secretion through, so they have no myoepithelial cells.

## answer_b
Apocrine glands

## explanation_b
Incorrect. Apocrine is a mode of secretion (part of the cell's apex pinches off), not a distinct gland category from exocrine — myoepithelial cells belong to the broader exocrine class regardless of secretion mode.

## answer_c
Merocrine glands

## explanation_c
Incorrect. Merocrine (eccrine) is also a secretion mode, seen in glands such as the pancreas and salivary glands, again a subtype of exocrine rather than an alternative to it.

## answer_d
Exocrine glands

## explanation_d
Correct. Myo-epithelial cells are a special, contractile epithelium found basally — between the base of the secretory cells and their basement membrane — around the acini of exocrine glands: the salivary glands, mammary glands and sweat glands. When they contract they squeeze the secretory cells so their product is discharged into the duct, a mechanism exocrine glands need to move secretion along a duct system that endocrine glands, having no ducts, do not.

## topic
Histology

## subtopic
Glandular epithelium: myoepithelial cells

## main_concept
CON-FND-38ABCC4E4E4E68

## concept_ids
CON-FND-38ABCC4E4E4E68

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
60

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
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Glandular Epithelium

## question_only_for

## library_ids
ART-101-HIS-MYO-EPITHELIUM

## resource_ids

## learning_objective
State that myoepithelial cells occur around the acini of exocrine glands (salivary, mammary, sweat), not endocrine glands.

## source_citation
FOMSCU Foundation 1, EOY Final 2026 Q30

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOY Final 2026 Q30; source-JSON extraction.
reclassification: find-existing.mjs's multi-word query 'myoepithelial cells exocrine glands' returned no existing record. A direct grep for 'myoepithelial' inside docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md found CON-FND-38ABCC4E4E4E68, whose own definition names the salivary, mammary and sweat glands (all exocrine) as the sites. Overlaid rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-HISTOLOGY-FIBROBLASTS

## title
The cell that forms ground substance

## question
Which specific cells are responsible for the formation of the ground substance in connective tissue?

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
Macrophages

## explanation_a
Incorrect. Macrophages are the connective tissue's phagocytic cell, derived from monocytes; their role is defence and clearance, not matrix production.

## answer_b
Fibroblasts

## explanation_b
Correct. The fibroblast is the commonest cell of connective tissue proper, arising from the undifferentiated mesenchymal cell. In its active state it is a branched, protein-synthesising cell — deeply basophilic cytoplasm with well-developed rough endoplasmic reticulum and Golgi apparatus on electron microscopy — that lays down the connective tissue fibres (collagen, elastin and fibrillin, reticular fibres). It also secretes the amorphous ground substance those fibres sit in, so both the fibrous and non-fibrous components of the extracellular matrix trace back to this one cell.

## answer_c
Adipocytes

## explanation_c
Incorrect. Adipocytes (fat cells) store neutral fat as their primary role; they do not synthesise the fibres or ground substance of connective tissue.

## answer_d
Plasma cells

## explanation_d
Incorrect. Plasma cells are terminally differentiated B lymphocytes that secrete antibodies for immune defence, not structural matrix components.

## topic
Histology

## subtopic
Connective tissue: cells

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
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
62

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
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Connective Tissue > Cells of Connective Tissue

## question_only_for

## library_ids
ART-101-HIS-CONNECTIVE-TISSUE-CELLS

## resource_ids

## learning_objective
Name the fibroblast as the connective tissue cell that synthesises both the fibres and the ground substance.

## source_citation
FOMSCU Foundation 1, EOY Final 2026 Q33

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOY Final 2026 Q33; source-JSON extraction.
reclassification: find-existing.mjs's multi-word query 'fibroblasts secrete ground substance connective tissue' returned no existing record. A direct grep for 'ground substance' + 'fibroblast' inside docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md found CON-FND-9EA7F8E2898EB7, whose own evidence_gaps note explicitly names ground substance as a product the definition should be widened to list and instructs against minting 'a second fibroblast key'. Overlaid per that note. Apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-HISTOLOGY-FILAMENTS

## title
The non-membranous organelle

## question
Which of the following structures is classified as a non membranous organelle?

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
Lysosome

## explanation_a
Incorrect. The lysosome is bounded by a single limiting membrane, so it is classified among the membranous organelles.

## answer_b
Active cellular mitochondria

## explanation_b
Incorrect. The mitochondrion is bounded by two unit membranes (outer and inner, folded into cristae), so it too is membranous.

## answer_c
Peroxisome

## explanation_c
Incorrect. The peroxisome, like the lysosome, is a single-membrane-bound organelle and is classed as membranous.

## answer_d
Filaments

## explanation_d
Correct. Organelles are classified by whether they have a limiting membrane. The membranous organelles are the plasma membrane, mitochondria, endoplasmic reticulum, Golgi apparatus, lysosomes and peroxisomes; the non-membranous organelles are the ribosomes and the cytoskeleton — the microtubules, microfilaments and intermediate filaments — together with the centrioles, cilia and flagella the cytoskeleton builds. Filaments have no limiting membrane of their own, so they fall in the non-membranous group.

## topic
Histology

## subtopic
Cytoplasmic organelles: classification

## main_concept
CON-FND-2560DB7970AF40

## concept_ids
CON-FND-2560DB7970AF40

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
60

## exam_relevance
4

## clinical_relevance
0.1

## academic_relevance
0.8

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Cytoplasmic Organelles

## question_only_for

## library_ids
ART-101-HIS-CYTOPLASMIC-ORGANELLES

## resource_ids

## learning_objective
Sort filaments (cytoskeleton) as non-membranous versus lysosome/mitochondria/peroxisome as membranous organelles.

## source_citation
FOMSCU Foundation 1, EOM 2026 Q11

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOM 2026 Q11; source-JSON extraction.
reclassification: find-existing.mjs's multi-word query 'non membranous cytoplasmic filaments organelle' returned no existing record. A direct grep for 'non-membranous' inside docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md found CON-FND-2560DB7970AF40, whose own definition explicitly sorts every option in this question's option set (lysosome, mitochondria, peroxisome as membranous; ribosomes and cytoskeleton/filaments as non-membranous). Overlaid rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-HISTOLOGY-LYSOSOMES

## title
The organelle the Golgi apparatus forms

## question
Which of the following functional cellular organelles is structurally and directly formed by the Golgi apparatus?

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
Ribosomes

## explanation_a
Incorrect. Ribosomes are formed in the nucleolus, where ribosomal RNA is transcribed and combines with protein into the large and small subunits; the Golgi apparatus plays no part in their formation.

## answer_b
Lysosomes

## explanation_b
Correct. A lysosome is a single-membrane bag of hydrolytic enzymes. Those enzymes are synthesised on the rough endoplasmic reticulum, carried by transfer vesicles to the Golgi apparatus, and released from the Golgi's trans face packaged inside lysosomes — so the lysosome, as a discrete membrane-bound organelle, is directly formed and released by the Golgi.

## answer_c
Peroxisomes

## explanation_c
Incorrect. Peroxisomes self-replicate by budding from pre-existing peroxisomes and import their enzymes post-translationally from the cytosol; they are not a Golgi product.

## answer_d
Mitochondria

## explanation_d
Incorrect. Mitochondria arise by division of pre-existing mitochondria and carry their own DNA; they are not formed by the Golgi apparatus.

## topic
Histology

## subtopic
Cytoplasmic organelles: Golgi apparatus and lysosomes

## main_concept
CON-FND-1ACE68A9080772

## concept_ids
CON-FND-1ACE68A9080772

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
60

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
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Cytoplasmic Organelles

## question_only_for

## library_ids
ART-101-HIS-CYTOPLASMIC-ORGANELLES

## resource_ids

## learning_objective
State that lysosomes are packaged and released by the Golgi apparatus from enzymes made on the rough ER.

## source_citation
FOMSCU Foundation 1, Formative and Past Exams 2021 Q79 (also 2022 Q58)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative and Past Exams 2021 Q79 (also 2022 Q58); source-JSON extraction.
reclassification: find-existing.mjs's multi-word query 'lysosomes formed by golgi apparatus digestive enzymes' returned no existing record. A direct grep for 'lysosome' + 'golgi' inside docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md found CON-FND-1ACE68A9080772, whose own definition states the enzymes are 'carried by transfer vesicles to the Golgi apparatus and released from it in lysosomes'. Overlaid rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-HISTOLOGY-ROUNDED

## title
Smooth muscle nucleus shape in transverse section

## question
What is the exact typical shape of the nucleus when viewing a transverse section of a smooth muscle fiber?

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
An irregular, jagged shape

## explanation_a
Incorrect. A smooth muscle fibre's nucleus is a single, smoothly-contoured, cigar-shaped structure — it has no irregular or jagged outline in either plane of section.

## answer_b
A true oval shape, unchanged from the fibre's own outline

## explanation_b
Incorrect. The nucleus's true, oval-to-elongated outline is seen in a longitudinal section, which runs along the fibre's long axis. A transverse section cuts across that same axis instead, so the outline seen there is not the fibre's (or nucleus's) true longitudinal shape.

## answer_c
A flattened, compressed shape

## explanation_c
Incorrect. Flattening is not how a transverse cut through a spindle-shaped cell and its central nucleus appears; a cross-cut through a round-in-cross-section fibre and its central nucleus produces a round profile, not a flattened one.

## answer_d
Rounded

## explanation_d
Correct. A smooth muscle fibre is spindle-shaped with one central, cigar-shaped nucleus. Because the fibre is narrow, a transverse (cross) section cuts straight across it and catches the nucleus end-on, so both the fibre's outline and the nucleus appear rounded — the same central nucleus that looks elongated in a longitudinal section, seen from the other direction.

## topic
Histology

## subtopic
Muscle tissue: smooth muscle

## main_concept
CON-FND-056E29C05028D2

## concept_ids
CON-FND-056E29C05028D2

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
3

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
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Muscle Tissue > Smooth Muscle

## question_only_for

## library_ids
ART-SCU-FBS102-HIS-SMOOTH-MUSCLE-CYTOLOGY

## resource_ids

## learning_objective
State that a smooth muscle fibre's central nucleus appears rounded in transverse section and elongated in longitudinal section.

## source_citation
FOMSCU Foundation 1, Formative and Past Exams 2021 Q78 (also 2022 Q57)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative and Past Exams 2021 Q78 (also 2022 Q57); source-JSON extraction.
reclassification: find-existing.mjs's multi-word query 'smooth muscle fiber nucleus shape transverse section' returned no existing record. A related but non-matching concept (CON-MSK-B080975D6171CF, docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md) describes the nucleus generally as 'single oval central' without the transverse-section-specific 'rounded' teaching point, so this is minted new rather than overlaid — see the sibling concept file's own field_notes.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-HISTOLOGY-SILVER-STAIN

## title
The stain that demonstrates reticular fibres

## question
Which of the following stains is specifically used to demonstrate reticular tissue?

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
Periodic acid Schiff

## explanation_a
Incorrect. Periodic acid Schiff (PAS) does stain reticular fibres red because of their high sugar content, but it is not the stain specifically named for demonstrating them — silver is.

## answer_b
Hematoxylin and Eosin

## explanation_b
Incorrect. Reticular fibres are not visible in a routine haematoxylin and eosin section at all, which is precisely why a special stain is needed to show them.

## answer_c
Silver stain

## explanation_c
Correct. Reticular fibres are not visible in a routine H&E section at all. Silver stains them brown — the reason they are called argyrophilic ('silver-loving') — and this is the classic, specifically-named stain for demonstrating them. Collagen and elastic fibres each have their own distinguishing stains instead (collagen: pink with eosin, blue with Mallory's trichrome, red with van Gieson; elastic: pink with eosin, brown with orcein, yellow with van Gieson), so silver is the one reserved for the reticular fibre specifically.

## answer_d
Masson trichrome

## explanation_d
Incorrect. Masson trichrome differentiates collagen from muscle and other tissue by colour but is not the stain specifically used to demonstrate reticular fibres.

## topic
Histology

## subtopic
Connective tissue: fibre stains

## main_concept
CON-FND-CE178A6B5707B1

## concept_ids
CON-FND-CE178A6B5707B1

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
58

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
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Connective Tissue > Types of Connective Tissue Proper

## question_only_for

## library_ids
ART-101-HIS-CONNECTIVE-TISSUE-CELLS

## resource_ids

## learning_objective
Name silver stain as the classic demonstration stain for reticular fibres (argyrophilic).

## source_citation
FOMSCU Foundation 1, EOY Final 2026 Q21

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOY Final 2026 Q21; source-JSON extraction.
reclassification: find-existing.mjs's multi-word query 'silver stain demonstrates reticular fibers' returned no existing record. A direct grep for 'silver stain' inside docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md found CON-FND-CE178A6B5707B1, whose own definition states 'silver stains them [reticular fibres] brown — the reason they are called argyrophilic'. Overlaid rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-HISTOLOGY-SMOOTH-MUSCLE

## title
The non-striated, involuntary muscle type

## question
Which of the following is an involuntary muscle type that is characterized by having completely non striated muscle fibers?

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
Cardiac heart muscle

## explanation_a
Incorrect. Cardiac muscle is involuntary, but it does show striation (a non-clear striation, per the department's own comparison table) — it is not non-striated.

## answer_b
Skeletal voluntary muscle

## explanation_b
Incorrect. Skeletal muscle is striated and voluntary, the opposite of both features this question asks for.

## answer_c
Smooth muscle

## explanation_c
Correct. The department's own three-way comparison table lists striation and action side by side for all three muscle types: skeletal muscle is striated and voluntary; cardiac muscle shows non-clear striation and is involuntary; smooth muscle is non-striated and involuntary. Smooth muscle is the only one of the three that is both involuntary and completely non-striated, because its thick and thin filaments are irregularly arranged rather than organised into sarcomeres.

## answer_d
A highly organised, pennate-structured muscle

## explanation_d
Incorrect. Pennate structuring describes a skeletal-muscle fibre architecture (fibres angled onto a central tendon), which is a voluntary, striated category, not smooth muscle.

## topic
Histology

## subtopic
Muscle tissue: three-type comparison

## main_concept
CON-MSK-B080975D6171CF

## concept_ids
CON-MSK-B080975D6171CF

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
72

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
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Muscle Tissue > Smooth Muscle

## question_only_for

## library_ids
ART-103-HIS-MUSCLE-COMPARISON-TABLE

## resource_ids

## learning_objective
Identify smooth muscle as the non-striated, involuntary muscle type among the three muscle types.

## source_citation
FOMSCU Foundation 1, Formative and Past Exams 2021 Q56 (also 2022 Q36)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative and Past Exams 2021 Q56 (also 2022 Q36); source-JSON extraction.
reclassification: find-existing.mjs's multi-word query 'smooth muscle non striated involuntary fibers' returned no existing record. A direct grep for 'non-striated' inside docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md found CON-MSK-B080975D6171CF, a three-muscle-type comparison table whose own definition states smooth muscle's striation and action rows directly. Overlaid rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-HISTOLOGY-TIGHT-JUNCTION

## title
The junction that barriers diffusion between cells

## question
Which of the following structures acts as a barrier to diffusion between adjacent cells?

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
Gap junction

## explanation_a
Incorrect. The gap junction (nexus) leaves a narrow gap bridged by channel proteins that let ions and small molecules pass between cells — it is a communication route, not a diffusion barrier.

## answer_b
Desmosome

## explanation_b
Incorrect. The desmosome (macula adherens) is an adhesion spot anchoring intermediate filaments between cells; it holds cells together mechanically but leaves the intercellular space open, so it does not seal against diffusion.

## answer_c
Tight junction

## explanation_c
Correct. The tight (occluding) junction, the zonula occludens, is the most apical of the lateral junctions. Its adjacent plasma membranes actually fuse at points through transmembrane proteins, obliterating the intercellular space at those points and encircling the apex of the cell like a belt. This makes the epithelium a barrier rather than a sieve, forcing anything crossing it to pass through the cells rather than between them.

## answer_d
Hemidesmosome

## explanation_d
Incorrect. The hemidesmosome anchors a cell's basal surface to the underlying basement membrane, not to an adjacent cell, so it plays no role in sealing the space between neighbouring cells.

## topic
Histology

## subtopic
Epithelial tissue: cell junctions

## main_concept
CON-FND-2EAD7BC676C215

## concept_ids
CON-FND-2EAD7BC676C215

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
58

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
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Epithelial Tissue

## question_only_for

## library_ids
ART-101-HIS-MEMBRANOUS-SPECIALISATIONS

## resource_ids

## learning_objective
Identify the tight junction (zonula occludens) as the epithelial diffusion barrier, distinct from the gap junction, desmosome and hemidesmosome.

## source_citation
FOMSCU Foundation 1, EOY Final 2026 Q31

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOY Final 2026 Q31; source-JSON extraction.
reclassification: find-existing.mjs's multi-word query 'tight junction zonula occludens barrier diffusion' returned no existing record. A direct grep for 'zonula occludens' inside docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md found CON-FND-2EAD7BC676C215, a generic (non-Sertoli-specific) tight-junction concept whose own definition states it 'makes the epithelium a barrier rather than a sieve' — distinct from the AU-MED-105 Sertoli-cell-specific tight-junction concept the triage's automated pass originally (falsely) matched on the bare word 'tight junction'. Overlaid rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-BIOCHEMISTRY-CHOLESTEROL

## title
Cholesterol's lipid classification

## question
Which of the following lipid classes is scientifically classified as derived lipids?

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
Simple neutral waxes

## explanation_a
Incorrect. Waxes — esters of a fatty acid with a long-chain monohydroxy alcohol — are a subgroup of simple lipids, not derived lipids.

## answer_b
Membrane phospholipids

## explanation_b
Incorrect. Phospholipids contain a fatty acid, an alcohol and an additional phosphate-linked group, which is exactly the definition of a compound lipid, not a derived one.

## answer_c
Cholesterol

## explanation_c
Correct. Lipids are classified by composition into simple lipids (fatty acid + alcohol only), compound lipids (fatty acid + alcohol + another group), and derived lipids — hydrolysis products of the other two groups, or substances associated with lipids in nature, a heading that covers free fatty acids and steroids. Cholesterol is a steroid, so it is a derived lipid by this classification, even though cholesteryl esters (cholesterol esterified with a fatty acid) are separately classed as a wax, a simple lipid.

## answer_d
Long chain fatty acids

## explanation_d
Incorrect. A free long-chain fatty acid on its own (not esterified to an alcohol) is itself an example of a derived lipid, but the question asks which whole class cholesterol specifically belongs to, and fatty acids and steroids are named as two separate examples within that same derived-lipid heading — cholesterol is the steroid example, not the fatty-acid one.

## topic
Biochemistry

## subtopic
Lipids: classification by composition

## main_concept
CON-FND-30D2E317144DDF

## concept_ids
CON-FND-30D2E317144DDF

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Moderate

## cognitive_effort_score
0.25

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
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Lipids of Biological Importance

## question_only_for

## library_ids
ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE

## resource_ids

## learning_objective
Classify cholesterol as a derived lipid (a steroid), distinct from simple lipids (waxes) and compound lipids (phospholipids).

## source_citation
FOMSCU Foundation 1, Formative and Past Exams 2021 Q45 (also 2022 Q25)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative and Past Exams 2021 Q45 (also 2022 Q25); source-JSON extraction.
reclassification: The triage's automated pass called this a 'live' hit on the bare word 'cholesterol', which the lane's manual QA pass reclassified as a false positive (homonym/adjacent, not verified). find-existing.mjs's multi-word query 'cholesterol derived lipid' returned no existing record — the exact phrase is not present verbatim. A direct grep for 'derived lipid' inside docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md found CON-FND-30D2E317144DDF, whose own definition explicitly names steroids (cholesterol's class) as a derived-lipid example. Overlaid rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-BIOCHEMISTRY-ESSENTIAL-FATTY-ACIDS

## title
Which class PUFA generally belongs to

## question
Polyunsaturated fatty acids are generally considered to belong to which of the following groups?

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
Non essential fatty acids

## explanation_a
Incorrect. Non-essential fatty acids are those the body readily synthesises, mainly from carbohydrate — the opposite of what defines an essential fatty acid, and not the group polyunsaturated fatty acids fall into.

## answer_b
Essential fatty acids

## explanation_b
Correct. The two unconditionally essential fatty acids — linoleic acid (omega-6) and alpha-linolenic acid (omega-3) — are both polyunsaturated, so polyunsaturated fatty acids as a class are generally classed as the essential fatty acids. Saturated fatty acids, by contrast, are freely made from carbohydrate and are never essential. (Arachidonic acid, a further omega-6 PUFA, is normally synthesised from linoleic acid and becomes essential only when linoleic acid is deficient — a conditional exception that does not change the general class-level association.)

## answer_c
Simple structural phospholipids

## explanation_c
Incorrect. Phospholipids are a compound-lipid class defined by their fatty-acid-plus-alcohol-plus-phosphate-group composition, not by degree of saturation — 'polyunsaturated' describes a fatty acid's bonding, not a phospholipid's structural category.

## answer_d
Complex derived steroids

## explanation_d
Incorrect. Steroids (e.g. cholesterol) are a derived-lipid class structurally unrelated to fatty acid chains; polyunsaturation is a fatty-acid property, not a steroid one.

## topic
Biochemistry

## subtopic
Lipids: fatty acid classification

## main_concept
CON-FND-C8A3D8D970AF9F

## concept_ids
CON-FND-C8A3D8D970AF9F

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Moderate

## cognitive_effort_score
0.25

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
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Lipids of Biological Importance

## question_only_for

## library_ids
ART-SCU-FBS102-BIO-LIPIDS-AMINOACIDS-VITAMINS

## resource_ids

## learning_objective
State that polyunsaturated fatty acids, as a class, are generally classed as the essential fatty acids.

## source_citation
FOMSCU Foundation 1, EOY Final 2026 Q52

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOY Final 2026 Q52; source-JSON extraction.
reclassification: The triage's automated pass called this a 'live' hit on the phrase 'essential fatty acids', which the lane's manual QA pass reclassified as a false positive (not individually verified). find-existing.mjs's multi-word query 'polyunsaturated fatty acids essential' returned no existing record. Kasr's docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md carries both a PUFA-class concept and a named-essential-fatty-acids concept, but neither states the class-level equivalence this question tests — read in full and judged a different fact, so minted new rather than overlaid.

---

# Item

## id
QST-SCUFBS102-S2-BIOCHEMISTRY-L-AMINO-ACIDS

## title
The naturally occurring amino acid isomer

## question
What is the specific isomeric type of amino acids that is naturally found in human proteins?

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
D amino acids

## explanation_a
Incorrect. D-amino acids do occur in nature — in some bacterial cell walls and a few peptide antibiotics — but they are not incorporated into human protein.

## answer_b
Both L and D amino acids

## explanation_b
Incorrect. Human protein synthesis is stereospecific: only one isomer is used, not a mixture of both.

## answer_c
L amino acids

## explanation_c
Correct. Every standard amino acid except glycine has a chiral alpha-carbon and so exists as D- and L-stereoisomers, mirror images of one another. Only the L-isomer is incorporated into the proteins of the human body — the selectivity comes from the stereospecificity of the ribosomal protein-synthesis machinery, not from any difference in chemical stability between the two forms.

## answer_d
Unspecified racemic mixtures

## explanation_d
Incorrect. A racemic mixture is an equal blend of D- and L-forms with no stereochemical preference; human protein synthesis is the opposite of racemic — it selects the L-form specifically.

## topic
Biochemistry

## subtopic
Amino acids: stereochemistry

## main_concept
CON-FND-555E4A38A269A6

## concept_ids
CON-FND-555E4A38A269A6

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
60

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
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Amino Acids and Proteins

## question_only_for

## library_ids
ART-SCU-FBS102-BIO-LIPIDS-AMINOACIDS-VITAMINS

## resource_ids

## learning_objective
State that human protein is built exclusively from L-amino acids.

## source_citation
FOMSCU Foundation 1, EOY Final 2026 Q48

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOY Final 2026 Q48; source-JSON extraction.
reclassification: The triage's automated pass called this a 'live' hit on the phrase 'L amino acids', which the lane's manual QA pass reclassified as a false positive (not individually verified). find-existing.mjs's multi-word query 'L amino acids naturally occurring in human proteins' returned no existing record, and a direct grep for 'L-amino'/'L amino acid'/'L-isomer'/'levorotatory' across every docs/*-Source-Imports/concept and pending-live directory found no hit. Minted new.

---

# Item

## id
QST-SCUFBS102-S2-BIOCHEMISTRY-VITAMIN-C

## title
The classic vitamin C deficiency disease

## question
Scurvy disease is primarily and classically caused by a chronic deficiency of which of the following vitamins?

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
Biotin

## explanation_a
Incorrect. Chronic biotin deficiency is rare and, when it occurs, causes dermatitis and neurological signs (classically after eating large amounts of raw egg white, whose avidin binds biotin), not scurvy.

## answer_b
Folate

## explanation_b
Incorrect. Folate deficiency causes megaloblastic anaemia and neural tube defects in pregnancy, not scurvy.

## answer_c
Vitamin C

## explanation_c
Correct. Scurvy is the classic disease of chronic vitamin C (ascorbic acid) deficiency. Vitamin C is a required cofactor for lysyl and prolyl hydroxylase, the enzymes that hydroxylate collagen's lysine and proline residues; without this hydroxylation, collagen cannot form a stable triple helix and cross-link properly. The result is scurvy's hallmark signs: bleeding gums, poor wound healing, and fragile blood vessels causing easy bruising and perifollicular haemorrhages.

## answer_d
Vitamin B12

## explanation_d
Incorrect. Vitamin B12 deficiency causes megaloblastic anaemia and subacute combined degeneration of the spinal cord, not scurvy.

## topic
Biochemistry

## subtopic
Vitamins: water-soluble

## main_concept
CON-FND-53814C63B5D46C

## concept_ids
CON-FND-53814C63B5D46C

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
0.4

## academic_relevance
0.8

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Vitamins

## question_only_for

## library_ids
ART-SCU-FBS102-BIO-LIPIDS-AMINOACIDS-VITAMINS

## resource_ids

## learning_objective
Name scurvy as the classic disease of chronic vitamin C deficiency, and link it to collagen hydroxylation.

## source_citation
FOMSCU Foundation 1, Formative and Past Exams 2021 Q72 (also 2022 Q51)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative and Past Exams 2021 Q72 (also 2022 Q51); source-JSON extraction.
reclassification: The triage's automated pass flagged this 'live' hit as borderline/uncertain (the matched record was about vitamin C deficiency impairing gastrectomy-related iron absorption, not scurvy). find-existing.mjs's multi-word query 'scurvy vitamin C deficiency collagen' returned no existing record. A direct grep for 'vitamin c'/'scurvy' across docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md found only vitamin C's cofactor role in lysine hydroxylation (collagen) and, separately, its role in iron absorption — the concept file's own field_notes record a corpus search for 'ascorbic' that found no scurvy/deficiency-disease record. Read in full and judged a different fact from either existing mention, so minted new.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-BIOCHEMISTRY-ADENOSINE-TRIPHOSPHATE-2023

## title
Precursor molecule of cyclic AMP (2023 printing)

## question
During the activation of the G protein signaling pathway from which specific precursor molecule is cyclic AMP directly synthesized?

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
Guanosine triphosphate

## explanation_a
Incorrect. Guanosine triphosphate (GTP) activates the G protein itself — the Gα subunit exchanges its bound GDP for GTP — but GTP is not adenylate cyclase's substrate.

## answer_b
Adenosine diphosphate

## explanation_b
Incorrect. Adenosine diphosphate is a lower-energy relative of ATP; adenylate cyclase acts on the triphosphate form, not the diphosphate.

## answer_c
Adenosine triphosphate

## explanation_c
Correct. Once a hormone binds its receptor and activates the G protein, the Gα-GTP subunit stimulates the membrane enzyme adenylate cyclase, which converts ATP into cyclic AMP (cAMP) with the release of pyrophosphate. Phosphodiesterase later degrades cAMP back down, so the balance of the two enzymes sets the second messenger's intracellular level.

## answer_d
Guanosine diphosphate

## explanation_d
Incorrect. Guanosine diphosphate is the resting (inactive) form the Gα subunit carries before exchange for GTP; it is not the precursor cAMP is made from.

## topic
Biochemistry

## subtopic
Cell signalling: cAMP second messenger

## main_concept
CON-FND-D10E79C01B3345

## concept_ids
CON-FND-D10E79C01B3345

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
58

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
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Enzymes and Cell Signalling

## question_only_for

## library_ids
ART-FND-CELL-SIGNALING-RECEPTORS

## resource_ids

## learning_objective
State that adenylate cyclase synthesises cAMP from ATP.

## source_citation
FOMSCU Foundation 1, Formative and Past Exams 2023 Q12

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative and Past Exams 2023 Q12 (2021 Q12's near-duplicate, already covered by pending-live-reuse-batch2's biochemistry-adenosine-triphosphate question). Same concept (CON-FND-D10E79C01B3345, already tagged +scu in pending-live/SCU-FBS102-overlay-concepts.md) answers both exam years' printing of this question, per the field_notes edit made alongside this seed. Apply after docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-BIOCHEMISTRY-GLYCINE-2023

## title
Amino acid with no chiral centre (2023 printing)

## question
Which of the following amino acids is considered optically inactive because it lacks a chiral center?

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
Valine

## explanation_a
Incorrect. Valine's alpha carbon carries a branched side chain along with an amino group, a carboxyl group and a hydrogen — four different groups — so it is chiral and optically active.

## answer_b
Alanine

## explanation_b
Incorrect. Alanine's alpha carbon carries a methyl side chain plus the amino group, carboxyl group and hydrogen, again four distinct substituents, so it too has a chiral centre.

## answer_c
Glycine

## explanation_c
Correct. Glycine's side chain is a single hydrogen atom, so its alpha carbon is bonded to two identical hydrogen atoms along with the amino and carboxyl groups — only three distinct groups, not four. This makes glycine the one amino acid with no chiral centre, and therefore the only one that is optically inactive.

## answer_d
Leucine

## explanation_d
Incorrect. Leucine has a bulky branched side chain distinct from the other three groups on its alpha carbon, giving it a chiral centre like the other eighteen standard amino acids besides glycine.

## topic
Biochemistry

## subtopic
Amino acids: stereochemistry

## main_concept
CON-FND-3FF9CA93465562

## concept_ids
CON-FND-3FF9CA93465562

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
60

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
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Amino Acids and Proteins

## question_only_for

## library_ids
ART-FND-AU-MED-102-PROTEIN-CHEMISTRY

## resource_ids

## learning_objective
Name glycine as the one amino acid with no chiral centre and therefore no D/L form.

## source_citation
FOMSCU Foundation 1, Formative and Past Exams 2023 Q5

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative and Past Exams 2023 Q5 (2021 Q5's near-duplicate, already covered by pending-live-reuse-batch2's biochemistry-glycine question). Same concept (CON-FND-3FF9CA93465562, already tagged +scu in pending-live/SCU-FBS102-overlay-concepts.md) answers both exam years' printing of this question, per the field_notes edit made alongside this seed. Apply after docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-BIOCHEMISTRY-IRREVERSIBLE-INHIBITION-2023

## title
Covalent enzyme inhibition type (2023 printing)

## question
Certain toxic compounds inhibit the acetylcholinesterase enzyme by forming strong covalent bonds. What type of inhibition is this?

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
Reversible competitive blockage

## explanation_a
Incorrect. A reversible competitive inhibitor binds the active site non-covalently, resembling the substrate, and can be displaced by raising substrate concentration; a compound forming a strong covalent bond is by definition not competing reversibly for the site.

## answer_b
Irreversible inhibition

## explanation_b
Correct. Irreversible inhibition permanently disables an enzyme, unlike competitive or allosteric inhibition, which are reversible. It works either by blocking a required cofactor or, as here, by chemically (covalently) modifying part of the apoenzyme itself — organophosphate-type compounds are classic examples that combine covalently and essentially permanently with a catalytically important group on acetylcholinesterase, which is exactly the 'strong covalent bond' the question describes.

## answer_c
Reversible allosteric activation

## explanation_c
Incorrect. Allosteric activation increases enzyme activity by binding a site other than the active site; it is neither inhibitory nor covalent, and it is reversible.

## answer_d
Simple negative feedback inhibition

## explanation_d
Incorrect. Negative feedback inhibition is a reversible, non-covalent regulatory mechanism (typically the pathway's own end-product binding an early enzyme), not a description of a toxic compound forming a strong covalent bond.

## topic
Biochemistry

## subtopic
Enzymes: inhibition types

## main_concept
CON-FND-42EE1863F04920

## concept_ids
CON-FND-42EE1863F04920

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Moderate

## cognitive_effort_score
0.25

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
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Enzymes

## question_only_for

## library_ids
ART-102-BIO-ENZYMES

## resource_ids

## learning_objective
Identify covalent, essentially permanent enzyme blockage as irreversible inhibition, distinct from reversible competitive/allosteric mechanisms.

## source_citation
FOMSCU Foundation 1, Formative and Past Exams 2023 Q14

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative and Past Exams 2023 Q14 (2021 Q14's near-duplicate, already covered by pending-live-reuse-batch2's biochemistry-irreversible-inhibition question). Same concept (CON-FND-42EE1863F04920, already tagged +scu in pending-live/SCU-FBS102-overlay-concepts.md) answers both exam years' printing of this question, per the field_notes edit made alongside this seed. Apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.
