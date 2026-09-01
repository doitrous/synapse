<!--
  Lane W1-103-HIST. 10 single-best-answer MCQs from MED 103's 3 EOM papers,
  testing the 5 HIT-LIVE + 5 NEW concepts in concept/AU-MED-103-histology-concepts.md
  (own directory only; HIT-PENDING-concept questions go in
  pending-live/AU-MED-103-histology-questions.md per LANE-BRIEF Sec21).
  Gates:
    npm run medical:batch -- "docs/Alexandria-Source-Imports/question/AU-MED-103-histology-mcq.md"
    npm run medical:simulate -- "docs/Alexandria-Source-Imports/question/AU-MED-103-histology-mcq.md" --emit /tmp/sim-AU-MED-103-histology-mcq.json
    npm run medical:audit -- --source /tmp/sim-AU-MED-103-histology-mcq.json
-->

# Item
## title
What is responsible for the flexibility of the RBC membrane?
## question
What is responsible for the flexibility of the RBC membrane?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## correct_answer
C
## answer_a
Lack of nucleus and organelles
## explanation_a
Incorrect, though a genuine feature of the cell. Having no nucleus or organelles frees cytoplasmic space for haemoglobin; it does not by itself explain why the membrane bends and recovers through capillaries narrower than the cell's own diameter.
## answer_b
Biconcave discoid shape
## explanation_b
Incorrect as a mechanism, though related. The biconcave shape gives the cell spare surface area for its volume, which helps it deform, but the shape itself is a consequence of the membrane's cytoskeleton, not the flexibility mechanism the question asks for.
## answer_c
Well developed cytoskeleton
## explanation_c
Correct. The red cell's flexibility comes from its submembranous cytoskeleton — the spectrin lattice anchored to the membrane — which lets the membrane deform elastically as the cell squeezes through capillaries and the splenic sinusoids, then spring back to its resting biconcave shape. A cell whose cytoskeleton is defective (as in hereditary spherocytosis) loses this recoil and is trapped and destroyed in the spleen.
## answer_d
Well developed glycocalyx
## explanation_d
Incorrect. The glycocalyx is the cell's outer carbohydrate coat, carrying the ABO and Rh blood-group antigens; it is about surface recognition, not mechanical flexibility.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-23E454BD997B29
## concept_ids

## contextual_concept_ids
CON-HEM-9D43F05669BB37
## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.45
## setting
Academic
## reasoning_level
2
## inferred_difficulty
55
## exam_relevance
6
## clinical_relevance
0.4
## academic_relevance
0.85
## exam_weight_by_year
AU_Y1=0.3
## years
AU_Y1
## universities
au
## module
AU-MED-103
## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW
## resource_ids
src_49f438279b68a489aa42
## learning_objective
State that the red cell's submembranous cytoskeleton, not its biconcave shape or absent organelles alone, is what gives it elastic flexibility through capillaries.
## source_citation
Alexandria University MED 103, EOM - Blood End Egyptian 1, Q30.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
60
## randomise_answers
yes
## author_notes
Distractors A and B are genuine adjacent facts about the same cell, deliberately not "wrong" in isolation — the question turns on which one is the mechanism.

## module_subject
AU-MED-103 > Histology

---

# Item
## title
Which organelle is responsible for the reticulate pattern of reticulocytes on cresyl blue staining?
## question
Which organelle is responsible for the reticulate pattern of reticulocytes on cresyl blue staining?
## subject
haem
## status
Draft
## owner
Admin team
## vignette
A 4-year-old child presents with shortness of breath and easy fatigue. A CBC shows a decreased RBC count and increased reticulocytes.
## correct_answer
A
## answer_a
Ribosomes
## explanation_a
Correct. A reticulocyte still carries residual ribosomal RNA left over from haemoglobin synthesis. Cresyl blue is a supravital stain — applied to live, unfixed cells — and it precipitates that residual RNA into a visible blue-staining reticulum, which is what gives the reticulocyte its name and its count.
## answer_b
Mitochondria
## explanation_b
Incorrect. Mitochondria are present in the reticulocyte but cresyl blue does not selectively precipitate them, and they are not what the reticular pattern is made of.
## answer_c
Golgi
## explanation_c
Incorrect. The Golgi apparatus is not retained in a functionally meaningful amount at this stage and plays no part in the cresyl blue reaction.
## answer_d
Nucleus
## explanation_d
Incorrect, and a direct contradiction of the reticulocyte's own definition: the nucleus has already been extruded at the normoblast stage, one stage before the reticulocyte forms.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-D86697439C5923
## concept_ids

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
Clinical
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.5
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.3
## years
AU_Y1
## universities
au
## module
AU-MED-103
## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW
## resource_ids
src_c9c9ca53cfa1321d0508
## learning_objective
Identify ribosomal RNA as the substrate cresyl blue precipitates to reveal a reticulocyte's reticulum.
## source_citation
Alexandria University MED 103, EOM - Blood end wafdeen final, Q23.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
70
## randomise_answers
yes
## author_notes
Vignette is a clinical dressing (anaemia work-up); the concept tested is purely the staining mechanism, so the clinical scenario is contextual, not assessed.

## module_subject
AU-MED-103 > Histology

---

# Item
## title
Which of the following will increase in blood due to the accelerated rate of erythropoiesis?
## question
Which of the following will increase in blood due to the accelerated rate of erythropoiesis?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## correct_answer
A
## answer_a
Reticulocyte
## explanation_a
Correct. When erythropoiesis speeds up — for example to compensate for blood loss or haemolysis — the bone marrow releases cells earlier and in greater numbers, so more reticulocytes appear in the peripheral blood before they mature fully into erythrocytes. A reticulocyte count is the standard bedside index of how hard the marrow is working.
## answer_b
Normoblast
## explanation_b
Incorrect under normal acceleration. Normoblasts (orthochromatic erythroblasts) are nucleated marrow precursors; they are not normally released into the peripheral blood even when erythropoiesis accelerates, only under severe marrow stress.
## answer_c
Platelets
## explanation_c
Incorrect. Platelet count is not the index of erythropoietic (red cell line) activity; it reflects megakaryocyte/thrombopoietic activity instead.
## answer_d
Proerythroblasts
## explanation_d
Incorrect. Proerythroblasts are the earliest, most immature marrow precursor and are never found in peripheral blood, accelerated or not.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-D86697439C5923
## concept_ids
CON-HEM-2D18E46BA15483
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
52
## exam_relevance
6
## clinical_relevance
0.45
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.3
## years
AU_Y1
## universities
au
## module
AU-MED-103
## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW
## resource_ids
src_56bc398ce32f0140fc29
## learning_objective
State that the reticulocyte, not a nucleated precursor, is the peripheral-blood marker of accelerated erythropoiesis.
## source_citation
Alexandria University MED 103, EOM - Blood Final Egyptian final, Q62.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
60
## randomise_answers
yes
## author_notes

## module_subject
AU-MED-103 > Histology

---

# Item
## title
Which statement is true of the open canalicular system of platelets?
## question
Which of the following is/are correct regarding the open canalicular system?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## correct_answer
A
## answer_a
Small membrane-bounded canaliculi
## explanation_a
Correct. The open canalicular system is a network of small, membrane-lined channels that invaginate from the platelet's own surface membrane into the interior, staying continuous with the plasma membrane. It provides the internal surface through which granule contents are released to the exterior when the platelet is activated.
## answer_b
Remnants of endoplasmic reticulum
## explanation_b
Incorrect — that describes the dense tubular system, a separate internal membrane compartment that stores calcium, not the open canalicular system.
## answer_c
Present in the granulomere
## explanation_c
Incorrect. The open canalicular system belongs to the hyalomere, the pale peripheral zone, alongside the marginal microtubule bundle — not the dark central granulomere, where the granules themselves sit.
## answer_d
Maintains discoid shape of the platelets
## explanation_d
Incorrect. Maintaining the resting discoid shape is the job of the circumferential microtubule bundle, a different hyalomere structure; the canalicular system's role is release, not shape.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-CCD8EB004C7E24
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort_score
0.6
## cognitive_effort
High
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
6
## clinical_relevance
0.3
## academic_relevance
0.85
## exam_weight_by_year
AU_Y1=0.3
## years
AU_Y1
## universities
au
## module
AU-MED-103
## question_only_for

## library_ids
ART-HEM-TOP-FD61B0A3D0
## resource_ids
src_56bc398ce32f0140fc29
## learning_objective
Distinguish the platelet's open canalicular system (release pathway) from the dense tubular system (calcium store) and the microtubule bundle (shape).
## source_citation
Alexandria University MED 103, EOM - Blood Final Egyptian final, Q49.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
75
## randomise_answers
yes
## author_notes
All four options name a real platelet structure; the question tests whether the student can assign the right function to the right zone.

## module_subject
AU-MED-103 > Histology

---

# Item
## title
What is the distribution of haemoglobin in the red blood cell?
## question
What is the distribution of haemoglobin in the red blood cell?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## correct_answer
A
## answer_a
Concentrated at the peripheral rim
## explanation_a
Correct. On electron microscopy, the red cell's haemoglobin is not spread evenly through the cytoplasm — it sits more densely at the periphery, immediately under the membrane, than in the centre of the biconcave disc.
## answer_b
Equally in the whole cytoplasm
## explanation_b
Incorrect. This is the intuitive default assumption, but the department's own electron-microscopic description explicitly contrasts an even distribution with the true, periphery-weighted one.
## answer_c
More abundant in the biconvex borders
## explanation_c
Incorrect, and also a contradiction in terms: the red cell is biconcave, not biconvex, so this option misdescribes the cell's own shape as well as the distribution.
## answer_d
Occupying the central part
## explanation_d
Incorrect — this is the reverse of the true distribution; haemoglobin is sparser, not denser, at the centre of the disc.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-786A979CC7B733
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.45
## setting
Academic
## reasoning_level
1
## inferred_difficulty
58
## exam_relevance
5
## clinical_relevance
0.2
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.3
## years
AU_Y1
## universities
au
## module
AU-MED-103
## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW
## resource_ids
src_c9c9ca53cfa1321d0508
## learning_objective
State where haemoglobin sits within the red cell's cytoplasm on electron microscopy.
## source_citation
Alexandria University MED 103, EOM - Blood end wafdeen final, Q4.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
55
## randomise_answers
yes
## author_notes

## module_subject
AU-MED-103 > Histology

---

# Item
## title
In which stage of erythropoiesis is haemoglobin synthesis completed?
## question
In which stage of erythropoiesis is haemoglobin synthesis completed?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## correct_answer
A
## answer_a
Normoblast
## explanation_a
Correct. Haemoglobin synthesis is not complete until the normoblast (orthochromatic erythroblast) stage, one stage after the polychromatophilic erythroblast — the last stage still capable of dividing. The normoblast's acidophilic, fully condensed nucleus is then extruded, leaving the reticulocyte.
## answer_b
Proerythroblast
## explanation_b
Incorrect. The proerythroblast is the first recognisable precursor in the series and has barely begun haemoglobin synthesis.
## answer_c
Basophilic erythroblast
## explanation_c
Incorrect. This stage is named for its basophilic cytoplasm — dominated by ribosomal RNA for protein synthesis machinery — not for having completed haemoglobin production, which happens two stages later.
## answer_d
Polychromatophilic erythroblast
## explanation_d
Incorrect, and a common near-miss: this is the last stage that can still divide, which is a genuine landmark, but it is one stage before haemoglobin synthesis is actually complete.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-2D18E46BA15483
## concept_ids

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
48
## exam_relevance
6
## clinical_relevance
0.25
## academic_relevance
0.85
## exam_weight_by_year
AU_Y1=0.35
## years
AU_Y1
## universities
au
## module
AU-MED-103
## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW
## resource_ids
src_56bc398ce32f0140fc29
## learning_objective
Name the erythropoiesis stage at which haemoglobin synthesis first becomes complete, and distinguish it from the preceding division landmark.
## source_citation
Alexandria University MED 103, EOM - Blood Final Egyptian final, Q46.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
65
## randomise_answers
yes
## author_notes
Distractor D is the deliberate one-stage-early trap this concept's own pitfall targets.

## module_subject
AU-MED-103 > Histology

---

# Item
## title
Which stage of erythropoiesis is the last in which the cells can undergo cell division?
## question
Which stage of erythropoiesis is the last in which the cells can undergo cell division?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## correct_answer
C
## answer_a
Proerythroblast
## explanation_a
Incorrect. This early stage can divide, but it is far from the last one that can — three more dividing stages follow it.
## answer_b
Basophilic erythroblast
## explanation_b
Incorrect. This stage still divides, but one further stage — the polychromatophilic erythroblast — also retains that capacity and is the true last one.
## answer_c
Polychromatophilic erythroblast
## explanation_c
Correct. The polychromatophilic erythroblast is the last stage of the erythroid series capable of mitosis. The stage that follows it, the normoblast, has a fully condensed nucleus that is extruded rather than divided.
## answer_d
Normoblast
## explanation_d
Incorrect. By the normoblast stage the nucleus is pyknotic and about to be extruded; this stage cannot divide, which is exactly why the stage before it is the correct answer.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-2D18E46BA15483
## concept_ids

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
6
## clinical_relevance
0.25
## academic_relevance
0.85
## exam_weight_by_year
AU_Y1=0.35
## years
AU_Y1
## universities
au
## module
AU-MED-103
## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW
## resource_ids
src_56bc398ce32f0140fc29
## learning_objective
Name the last erythropoiesis stage capable of mitosis and distinguish it from the following, non-dividing normoblast stage.
## source_citation
Alexandria University MED 103, EOM - Blood Final Egyptian final, Q47.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
65
## randomise_answers
yes
## author_notes
Paired with the Q46 item above; both test the same concept's two stage landmarks from opposite ends.

## module_subject
AU-MED-103 > Histology

---

# Item
## title
In which stage do the specific granules of the granulocytes appear?
## question
In which stage do the specific granules of the granulocytes appear?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## correct_answer
B
## answer_a
Promyelocyte
## explanation_a
Incorrect, and the deliberate trap this concept exists to catch. The promyelocyte carries only azurophilic (primary) granules, and is still producing them; the specific granules have not appeared yet.
## answer_b
Myelocyte
## explanation_b
Correct. At the myelocyte stage the specific (secondary) granules that let a neutrophil, eosinophil and basophil be told apart first appear, alongside a fall in cytoplasmic basophilia and a rise in eosinophilia as those granules accumulate.
## answer_c
Metamyelocyte
## explanation_c
Incorrect. By the metamyelocyte stage specific granules are already present; they appeared one stage earlier, at the myelocyte stage, not this one.
## answer_d
Myeloblast
## explanation_d
Incorrect. The myeloblast is the earliest, most primitive precursor and has no specific granules of any kind yet.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-A4B2A60B89E976
## concept_ids

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
48
## exam_relevance
6
## clinical_relevance
0.2
## academic_relevance
0.85
## exam_weight_by_year
AU_Y1=0.3
## years
AU_Y1
## universities
au
## module
AU-MED-103
## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW
## resource_ids
src_56bc398ce32f0140fc29
## learning_objective
Name the granulopoiesis stage at which specific (secondary) granules first appear, distinguishing it from the promyelocyte stage before it.
## source_citation
Alexandria University MED 103, EOM - Blood Final Egyptian final, Q45.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
60
## randomise_answers
yes
## author_notes

## module_subject
AU-MED-103 > Histology

---

# Item
## title
Where does lymphopoiesis take place?
## question
Where does lymphopoiesis take place?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## correct_answer
C
## answer_a
Secondary lymphoid tissues
## explanation_a
Incorrect. Secondary (peripheral) lymphoid tissues — lymph nodes, spleen, tonsils — are where mature lymphocytes meet antigen and respond; they are not where lymphocytes are made.
## answer_b
Lymph nodes
## explanation_b
Incorrect. A lymph node is a secondary lymphoid organ; it hosts an immune response, it does not manufacture lymphocytes.
## answer_c
Primary lymphoid organs
## explanation_c
Correct. Lymphopoiesis — the development and maturation of lymphocytes — takes place in the primary (central) lymphoid organs: the thymus and the bone marrow.
## answer_d
Lymphoid nodules
## explanation_d
Incorrect. Lymphoid nodules (as in the tonsils) are secondary lymphoid tissue, sites of response rather than production.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-2C5153657AD1AE
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Classification
## cognitive_effort
Low
## cognitive_effort_score
0.3
## setting
Academic
## reasoning_level
1
## inferred_difficulty
65
## exam_relevance
5
## clinical_relevance
0.2
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.3
## years
AU_Y1
## universities
au
## module
AU-MED-103
## question_only_for

## library_ids
ART-HEM-AU103-LYMPHOID-ORGANS
## resource_ids
src_c9c9ca53cfa1321d0508
## learning_objective
State that lymphopoiesis takes place in the primary, not the secondary, lymphoid organs.
## source_citation
Alexandria University MED 103, EOM - Blood end wafdeen final, Q6.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
45
## randomise_answers
yes
## author_notes

## module_subject
AU-MED-103 > Histology

---

# Item
## title
What is the role of the reticulo-endothelial system?
## question
What is the role of the reticulo-endothelial system?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## correct_answer
D
## answer_a
Vascular spasm
## explanation_a
Incorrect. Vascular spasm is the immediate vessel-wall response to injury in hemostasis, unrelated to the tissue-macrophage network the question names.
## answer_b
Platelet adhesion
## explanation_b
Incorrect. Platelet adhesion is a step in primary hemostasis, carried out by platelets themselves, not by the reticulo-endothelial system.
## answer_c
Blood clotting
## explanation_c
Incorrect. Clotting is the coagulation cascade's job; the reticulo-endothelial system takes no part in forming a clot.
## answer_d
Defences
## explanation_d
Correct. The reticulo-endothelial (mononuclear phagocyte) system is the body's diffuse network of tissue macrophages, fixed in connective tissue and the walls of blood sinusoids. Its contribution to the body's defences is phagocytosis — clearing particulate matter, spent cells and micro-organisms from the blood and tissues.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-157B01DD5EAEB6
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Classification
## cognitive_effort
Medium
## cognitive_effort_score
0.4
## setting
Academic
## reasoning_level
1
## inferred_difficulty
55
## exam_relevance
5
## clinical_relevance
0.35
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.25
## years
AU_Y1
## universities
au
## module
AU-MED-103
## question_only_for

## library_ids
ART-HEM-AU103-LYMPHOID-ORGANS
## resource_ids
src_49f438279b68a489aa42
## learning_objective
Name phagocytosis, by tissue macrophages, as the reticulo-endothelial system's contribution to the body's defences.
## source_citation
Alexandria University MED 103, EOM - Blood End Egyptian 1, Q25.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
50
## randomise_answers
yes
## author_notes
The paper's own printed key gives only the single word "defenses"; the other three distractors are plausible hemostasis-adjacent terms a student could confuse it with.

## module_subject
AU-MED-103 > Histology
