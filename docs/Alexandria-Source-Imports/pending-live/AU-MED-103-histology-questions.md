<!--
  Lane W1-103-HIST. Questions on this lane's HIT-PENDING concepts, per LANE-BRIEF
  Sec21 (authored now, not deferred) and Sec22 (only where the Kasr article's own
  related_concepts already names the concept -- checked directly against
  101-ISK-histology.md and 104-CPS-articles.md before each question below).

  3 of the 20 pending ids are NOT questioned here because no Kasr article names
  them yet (checked: no article_ids on the concept record, no related_concepts
  hit in any Kasr article file) -- CON-FND-C75600D3D3B546 (reticular cell),
  CON-HEM-FDAC2D5F64032E (three lymphocyte types), CON-HEM-719FA556594454
  (monocyte). Their matching EOM questions (Q6 EOM1, Q50/Q51 EOM2, Spot 7b) stay
  unauthored and flagged in this lane's report, per Sec22.

  Apply only after AU-MED-103-histology.md (the matching concept updates) is live,
  and after 101-ISK-histology.md / 104-CPS-articles.md (the Kasr articles) are
  live -- both are already-live prerequisites this file assumes.

  Gate:
    npm run medical:batch -- "docs/Alexandria-Source-Imports/pending-live/AU-MED-103-histology-questions.md" \
      --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
      --with docs/Kasr-Source-Imports/concept/104-CPS-concepts.md \
      --with docs/Kasr-Source-Imports/concept/104-CPS-practical-concepts.md \
      --with docs/Kasr-Source-Imports/article/101-ISK-histology.md \
      --with docs/Kasr-Source-Imports/article/104-CPS-articles.md
    npm run medical:simulate -- \
      docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
      docs/Kasr-Source-Imports/concept/104-CPS-concepts.md \
      docs/Kasr-Source-Imports/concept/104-CPS-practical-concepts.md \
      docs/Kasr-Source-Imports/article/101-ISK-histology.md \
      docs/Kasr-Source-Imports/article/104-CPS-articles.md \
      "docs/Alexandria-Source-Imports/pending-live/AU-MED-103-histology-questions.md" \
      --emit /tmp/sim-AU-MED-103-histology-pending-questions.json
-->

# Item
## title
What is the main function of neutrophils?
## question
What is the main function of neutrophils?
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
Converted to macrophage and engulf invaded organism
## explanation_a
Incorrect — that describes the monocyte, which leaves the blood and becomes the tissue macrophage. The neutrophil does not convert to a macrophage; it phagocytoses directly as a motile microphage.
## answer_b
Phagocytosis to invaded organism
## explanation_b
Correct. The neutrophil is the first line of non-specific defence: attracted by bacterial toxins, it leaves the blood by diapedesis and phagocytoses the invading organism directly, using its azurophilic and specific granules to kill and digest it.
## answer_c
Release histamine and heparin
## explanation_c
Incorrect — that describes the basophil's function, not the neutrophil's.
## answer_d
Release histaminase
## explanation_d
Incorrect — histaminase release is how the eosinophil terminates an allergic reaction; it is not a neutrophil product.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-3899015C5024C0
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
2
## inferred_difficulty
55
## exam_relevance
6
## clinical_relevance
0.35
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
ART-101-HIS-GRANULAR-LEUKOCYTES
## resource_ids
src_56bc398ce32f0140fc29
## learning_objective
Distinguish the neutrophil's direct phagocytic role from the monocyte's macrophage transformation and the basophil's/eosinophil's granule-release roles.
## source_citation
Alexandria University MED 103, EOM - Blood Final Egyptian final, Q23.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
55
## randomise_answers
yes
## author_notes


---

# Item
## title
What characterizes the eosinophil specific granules by EM?
## question
What characterizes the eosinophil specific granules by electron microscopy?
## subject
haem
## status
Draft
## owner
Admin team
## vignette
A 42-year-old woman presents with an itchy rash and an elevated eosinophil count; other blood cell parameters are normal.
## correct_answer
D
## answer_a
Small electron dense
## explanation_a
Incorrect. The eosinophil's specific granule is large, not small, and its electron-dense material is confined to a core, not the whole granule.
## answer_b
Large electron lucent
## explanation_b
Incorrect. The granule is large, but it is not electron-lucent — it carries a dense core (the crystalloid internum) surrounded by a less dense periphery (the externum).
## answer_c
Medium sized with granular content
## explanation_c
Incorrect. The specific granule is large, not medium sized, and its defining feature is the crystalloid core, not a generic granular content.
## answer_d
Large with electron dense crystalloid core
## explanation_d
Correct. On electron microscopy the eosinophil's large, oval specific granule shows an electron-dense crystalloid core (the internum, containing major basic protein) surrounded by a less dense periphery (the externum, containing histaminase and sulphatase).
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-77B701F6105076
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.6
## setting
Clinical
## reasoning_level
2
## inferred_difficulty
42
## exam_relevance
5
## clinical_relevance
0.4
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
ART-101-HIS-GRANULAR-LEUKOCYTES
## resource_ids
src_c9c9ca53cfa1321d0508
## learning_objective
Describe the eosinophil specific granule's electron-microscopic appearance: large, with an electron-dense crystalloid core and a less dense periphery.
## source_citation
Alexandria University MED 103, EOM - Blood end wafdeen final, Q22.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
70
## randomise_answers
yes
## author_notes


---

# Item
## title
Which of the following is correct regarding platelets?
## question
Which of the following is correct regarding platelets?
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
Has acidophilic area at the periphery
## explanation_a
Incorrect. The peripheral zone (hyalomere) is pale and basophilic, not acidophilic.
## answer_b
Has reddish-purple granules at the center
## explanation_b
Incorrect as stated for the light-microscopic picture: the central granulomere is basophilic/dark-staining, and its granules are more accurately azurophilic than "reddish-purple", which is not the standard description used here.
## answer_c
Has eosinophilic area at the center
## explanation_c
Incorrect — the reverse of the true picture. The centre (granulomere) is basophilic/dark, and it is the periphery (hyalomere) that is pale.
## answer_d
It is non-nucleated biconcave discs
## explanation_d
Correct. A platelet is a non-nucleated cytoplasmic fragment, 2-4 micrometres across, shed from a megakaryocyte, with a pale peripheral hyalomere and a dark central granulomere.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-A2BE134E34EB83
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
0.25
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
ART-101-HIS-BLOOD-PLATELETS
## resource_ids
src_56bc398ce32f0140fc29
## learning_objective
State that the platelet is a non-nucleated fragment with a two-zone structure (pale hyalomere, dark granulomere).
## source_citation
Alexandria University MED 103, EOM - Blood Final Egyptian final, Q48.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
60
## randomise_answers
yes
## author_notes


---

# Item
## title
What is the function of circumferential microtubules in platelets?
## question
What is the function of circumferential microtubules in platelets?
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
Maintenance of the discoid shape of platelets
## explanation_a
Correct. The circumferential (marginal) bundle of microtubules, in the hyalomere, holds the platelet's resting discoid shape and contracts to help produce pseudopodia on activation.
## answer_b
Contraction of platelets
## explanation_b
Incorrect. Contraction that expels granule contents and retracts a clot is driven by actin-myosin, not the microtubule bundle, whose job is shape maintenance.
## answer_c
Release of fibrinogen and coagulation factors
## explanation_c
Incorrect. Release of granule contents is a function of the granules themselves via the open canalicular system, not the microtubules.
## answer_d
Platelets adhesion and aggregation
## explanation_d
Incorrect. Adhesion and aggregation depend on surface glycoprotein receptors and von Willebrand factor, not the cytoskeletal microtubule bundle.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-CC292B4D6CC61E
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
ART-101-HIS-BLOOD-PLATELETS
## resource_ids
src_49f438279b68a489aa42
## learning_objective
State that the circumferential microtubule bundle maintains the platelet's resting discoid shape.
## source_citation
Alexandria University MED 103, EOM - Blood End Egyptian 1, Q29.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
60
## randomise_answers
yes
## author_notes


---

# Item
## title
What is the histological feature of platelets granulomere?
## question
What is the histological feature of the platelet's granulomere?
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
Contains dense tubular system
## explanation_a
Incorrect — the dense tubular system is a hyalomere structure (it stores the calcium that triggers granule release), not a granulomere feature.
## answer_b
Contains network of actin and myosin filaments
## explanation_b
Incorrect as the defining granulomere feature — actomyosin is present in the platelet generally for contraction, but it is not what histologically characterises the granulomere zone.
## answer_c
Contains few ribosomes and glycogen particles
## explanation_c
Incorrect as the defining feature — ribosomes and glycogen are present, but the granulomere's histological hallmark is its granule content and the circumferential microtubule bundle around it, covered by option D.
## answer_d
Contains a circumferential bundle of microtubules
## explanation_d
Correct, per this paper's own key. The circumferential microtubule bundle sits at the margin of the platelet and is the feature this question's key attributes to the granulomere region — though note it is more precisely a hyalomere structure in the standard three-zone description (see this concept's own conflicts/uncertainty note).
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-CC292B4D6CC61E
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
5
## clinical_relevance
0.25
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
ART-101-HIS-BLOOD-PLATELETS
## resource_ids
src_c9c9ca53cfa1321d0508
## learning_objective
Recognise the circumferential microtubule bundle as the tested feature, while noting the paper's own zone attribution differs from the standard hyalomere/granulomere split.
## source_citation
Alexandria University MED 103, EOM - Blood end wafdeen final, Q5.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
75
## randomise_answers
yes
## author_notes
Recorded rather than silently corrected: this paper's key places the microtubule bundle in the granulomere, while the department's own histology notes and the Kasr concept both place it in the hyalomere. Explanation D names the discrepancy rather than asserting the paper's zone as fact.

---

# Item
## title
What is in the medulla of the thymus?
## question
What is in the medulla of the thymus?
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
Plasma cells
## explanation_a
Incorrect. The thymus has no plasma cells anywhere, medulla included — it has no B lymphocytes to become them.
## answer_b
B lymphocytes
## explanation_b
Incorrect. The thymus carries no B lymphocytes in either zone; only T-lineage cells develop there.
## answer_c
Phagocytic cells
## explanation_c
Correct. The medulla is where Hassall's corpuscles sit, formed of concentrically arranged epithelial reticular cells around a degenerating, acidophilic centre, and macrophages (phagocytic cells) are also found there, clearing degenerating thymocytes and Hassall's corpuscle debris.
## answer_d
Germinal centres
## explanation_d
Incorrect, and a useful contrast: the thymus has no germinal centres anywhere, because it has no B lymphocytes to form them. Germinal centres belong to secondary lymphoid organs such as the lymph node and spleen.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-10B2E783E164FD
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Anatomy
## cognitive_effort
Medium
## cognitive_effort_score
0.45
## setting
Academic
## reasoning_level
1
## inferred_difficulty
55
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
ART-104-HIS-LYMPHOID-ORGANS
## resource_ids
src_49f438279b68a489aa42
## learning_objective
Name Hassall's corpuscles and phagocytic macrophages as the two things found in the thymic medulla, and rule out B-lineage cells.
## source_citation
Alexandria University MED 103, EOM - Blood End Egyptian 1, Q28.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
55
## randomise_answers
yes
## author_notes
Source paper prints only three options (a/b/c) for this item; option d (germinal centres) is added to meet the 4-option format floor, drawn from the thymus's own well-documented "no germinal centres" feature rather than invented from nothing.

---

# Item
## title
What is the function of epithelial reticular cells in the thymus?
## question
What is the function of epithelial reticular cells in the thymus?
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
Phagocytosis
## explanation_a
Incorrect — phagocytosis of degenerating thymocytes is the macrophage's job in the thymus, not the epithelial reticular cell's.
## answer_b
Supporting
## explanation_b
Correct. The thymic epithelial reticular cells are endodermal, branched cells joined by desmosomes and tight junctions into a cellular reticulum that forms the thymus's supporting framework — unlike a lymph node or spleen, where mesodermal reticular cells and their secreted fibres do this job.
## answer_c
Nutritive
## explanation_c
Incorrect as the primary tested function here, though the cells do secrete thymic hormones that support T-cell differentiation; the paper's own key names the structural, supporting role.
## answer_d
Storage
## explanation_d
Incorrect. Storage is not a function attributed to the epithelial reticular cell in the department's teaching.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-02424D1AF8A169
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
5
## clinical_relevance
0.15
## academic_relevance
0.85
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
ART-104-HIS-LYMPHOID-ORGANS
## resource_ids
src_56bc398ce32f0140fc29
## learning_objective
State that the thymic epithelial reticular cell's role is structural support (forming the reticulum), distinguishing it from the macrophage's phagocytic role in the same organ.
## source_citation
Alexandria University MED 103, EOM - Blood Final Egyptian final, Q63.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
60
## randomise_answers
yes
## author_notes


---

# Item
## title
Which of the following are components of blood thymic barrier?
## question
Which of the following are components of the blood-thymic barrier?
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
Post capillary venules, perivascular macrophages and epithelial reticular cells
## explanation_a
Incorrect. Post-capillary venules are the route by which lymphocytes enter the paracortex of a lymph node, not a component of the blood-thymic barrier.
## answer_b
Continuous capillaries of cortex, epithelial reticular cells and medullary macrophages
## explanation_b
Incorrect — the macrophages named should be perivascular (around the cortical capillary), not medullary; the barrier exists only in the cortex.
## answer_c
Continuous capillaries of cortex, pericytes and epithelial reticular cells
## explanation_c
Incorrect. Pericytes are part of the barrier's basement-membrane layer in some descriptions, but this option omits the perivascular macrophage layer the paper's key requires.
## answer_d
Arterioles at cortico-medullary junction, Hassall's corpuscles and epithelial reticular cells
## explanation_d
Correct, per this paper's own key: the blood-thymic barrier is four layers around a cortical capillary — continuous endothelium, its basement membrane, perivascular macrophages and epithelial reticular cells — and it exists only in the cortex, not the medulla, where Hassall's corpuscles sit and antigen exposure is no longer being screened out.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-BB5A071CEEB78F
## concept_ids
CON-HEM-10B2E783E164FD
## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.65
## setting
Academic
## reasoning_level
3
## inferred_difficulty
35
## exam_relevance
5
## clinical_relevance
0.2
## academic_relevance
0.85
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
ART-104-HIS-LYMPHOID-ORGANS
## resource_ids
src_c9c9ca53cfa1321d0508
## learning_objective
Name the four layers of the blood-thymic barrier and state that it exists only in the cortex.
## source_citation
Alexandria University MED 103, EOM - Blood end wafdeen final, Q14.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
80
## randomise_answers
yes
## author_notes
The paper's printed option D names Hassall's corpuscles and cortico-medullary arterioles alongside epithelial reticular cells as the keyed answer, which is a looser combination than the concept's own four-layer description (endothelium, basement membrane, perivascular macrophages, epithelial reticular cells) — recorded as the paper's own phrasing rather than silently rewritten to match the concept exactly.

---

# Item
## title
Which describes the cells in the inner cortex of the thymus?
## question
Which describes the cells in the inner cortex of the thymus?
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
Originate in bone marrow and interact with T lymphocytes to stimulate the immune response
## explanation_a
Incorrect. This describes an antigen-presenting cell's interaction with an already-mature T lymphocyte in a peripheral response, not a thymocyte developing in the cortex.
## answer_b
Originate in bone marrow and acquire surface immunoglobulins in the thymus
## explanation_b
Incorrect. Acquiring surface immunoglobulin describes B-lymphocyte maturation; the thymus has no B lymphocytes at all.
## answer_c
Reach the thymus as colony forming unit lymphocyte
## explanation_c
Incorrect as a description of the inner-cortex population specifically — CFU-Ly is the marrow precursor stage before the cells ever reach the thymus; by the inner cortex they are already thymocytes undergoing selection.
## answer_d
Migrate to the thymus when they are promyelocytes
## explanation_d
Correct, per this paper's own key: the inner cortex is densely populated with thymocytes, more differentiated than the outer-cortex lymphoblasts, completely surrounded by epithelial reticular cells and macrophages as they undergo selection.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-BA8773E5D84286
## concept_ids

## contextual_concept_ids

## difficulty
Challenging
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.7
## setting
Academic
## reasoning_level
3
## inferred_difficulty
30
## exam_relevance
4
## clinical_relevance
0.15
## academic_relevance
0.8
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
ART-104-HIS-LYMPHOID-ORGANS
## resource_ids
src_c9c9ca53cfa1321d0508
## learning_objective
Identify thymocytes, surrounded by epithelial reticular cells and macrophages, as the inner-cortex population.
## source_citation
Alexandria University MED 103, EOM - Blood end wafdeen final, Q13.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
80
## randomise_answers
yes
## author_notes
Flagged rather than smoothed over: option D's own wording ("migrate to the thymus when they are promyelocytes") names the wrong precursor name for a lymphoid cell — "promyelocyte" is a granulocyte-series term — and is nonetheless this paper's own printed key. Recorded as the paper's key; the explanation states the correct concept (thymocytes in the inner cortex) rather than defending the paper's mislabelling.

---

# Item
## title
How is the thymus histologically different from the lymph node?
## question
How is the thymus histologically different from the lymph node?
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
It contains lymphatic nodules distributed in all parts of the gland
## explanation_a
Incorrect — the reverse is true. The thymus has no lymphoid nodules at all; nodules with germinal centres are a lymph-node feature, not a thymic one.
## answer_b
It is divided into completely separate lobules by complete trabeculae
## explanation_b
Incorrect. The thymus's trabeculae are thin and incomplete, so its lobules stay continuous with each other through the medulla — the opposite of "completely separate".
## answer_c
Its parenchyma is not divided into cortex and medulla
## explanation_c
Incorrect. The thymus is very much divided into cortex and medulla, the same as a lymph node's cortex and medulla, just with different cell content.
## answer_d
It has a supportive network of epithelial reticular cells
## explanation_d
Correct. The thymus's distinguishing structural feature is its epithelial reticular cell network — endodermal, forming the framework directly rather than secreting reticular fibres — where a lymph node instead has mesodermal reticular cells and true reticular fibres.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-3E38A04641F73C
## concept_ids
CON-HEM-02424D1AF8A169
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
ART-104-HIS-LYMPHOID-ORGANS
## resource_ids
src_49f438279b68a489aa42
## learning_objective
Name the epithelial reticular cell network as what histologically distinguishes the thymus from a lymph node.
## source_citation
Alexandria University MED 103, EOM - Blood End Egyptian 1, Q34.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
70
## randomise_answers
yes
## author_notes


---

# Item
## title
Which of the following cells is the main cell population of the paracortical area of the lymph node?
## question
Which of the following cells is the main cell population of the paracortical area of the lymph node?
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
T lymphocytes
## explanation_a
Correct. The paracortex is the thymus-dependent zone of the lymph node — its T lymphocytes arrive from the blood through post-capillary venules lined by tall cuboidal cells, and it holds no follicles or germinal centres, unlike the B-cell-rich cortex above it.
## answer_b
Macrophages
## explanation_b
Incorrect. Macrophages are scattered throughout the node but are not the defining population of the paracortex specifically.
## answer_c
B lymphocyte
## explanation_c
Incorrect. B lymphocytes populate the follicular cortex and its germinal centres, not the paracortex, which is exactly what distinguishes the two zones.
## answer_d
Plasma cells
## explanation_d
Incorrect. Plasma cells, the antibody-secreting descendants of activated B cells, are found in the medullary cords, not the paracortex.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-748293D5DA5D92
## concept_ids
CON-HEM-D2143156B30A8A
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
2
## inferred_difficulty
55
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
ART-104-HIS-LYMPHOID-ORGANS
## resource_ids
src_56bc398ce32f0140fc29
## learning_objective
Name T lymphocytes as the paracortex's population and distinguish it from the B-cell follicular cortex and the plasma-cell medullary cords.
## source_citation
Alexandria University MED 103, EOM - Blood Final Egyptian final, Q53.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
60
## randomise_answers
yes
## author_notes


---

# Item
## title
What is the thymus dependent area of the spleen?
## question
What is the thymus-dependent area of the spleen?
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
Splenic cords
## explanation_a
Incorrect. The splenic (Billroth) cords are red-pulp structures holding a mix of blood and lymphoid cells, not a defined T-cell zone.
## answer_b
Medullary cords
## explanation_b
Incorrect — medullary cords belong to the lymph node, not the spleen, and this option names the wrong organ's structure entirely.
## answer_c
Periarterial lymphoid sheath
## explanation_c
Correct. Splenic white pulp is organised in four concentric zones around the central arteriole; the innermost, the periarteriolar lymphatic sheath (PALS), holds T lymphocytes ensheathing the vessel and is the spleen's thymus-dependent zone.
## answer_d
Loose lymphoid tissue
## explanation_d
Incorrect. This is too vague to name any specific zone of the four that make up splenic white pulp.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-7B050DE7FE2B80
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
ART-104-HIS-LYMPHOID-ORGANS
## resource_ids
src_56bc398ce32f0140fc29
## learning_objective
Name the periarteriolar lymphatic sheath (PALS) as the spleen's thymus-dependent (T-cell) zone.
## source_citation
Alexandria University MED 103, EOM - Blood Final Egyptian final, Q52.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
65
## randomise_answers
yes
## author_notes


---

# Item
## title
Which of the following histological structures are related to the capsule of palatine tonsil?
## question
Which of the following histological structures are related to the capsule of the palatine tonsil?
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
Lymph sinuses
## explanation_a
Incorrect. Lymph sinuses belong to a lymph node, which the tonsil — a lymphoid nodule, not an encapsulated node — does not have.
## answer_b
Mucous acini
## explanation_b
Correct. Deep to the palatine tonsil's incomplete capsule of dense connective tissue lie mucous glands (acini), whose ducts open onto the tonsil's free surface rather than at the base of its crypts — which is exactly why debris is not washed out and tonsillar crypts become chronically inflamed.
## answer_c
Smooth muscle fibers
## explanation_c
Incorrect. The palatine tonsil's capsule is dense connective tissue; it is not a muscular structure the way the spleen's capsule is.
## answer_d
Blood sinusoids
## explanation_d
Incorrect. Blood sinusoids are a spleen feature (its red pulp), not a structure found around the tonsil's capsule.
## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## main_concept
CON-HEM-093013026B640A
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
48
## exam_relevance
5
## clinical_relevance
0.4
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
ART-104-HIS-LYMPHOID-ORGANS
## resource_ids
src_c9c9ca53cfa1321d0508
## learning_objective
Name mucous acini, deep to the palatine tonsil's capsule, and explain why their duct placement predisposes the crypts to chronic inflammation.
## source_citation
Alexandria University MED 103, EOM - Blood end wafdeen final, Q21.
## attached_image

## attachments

## media_recommendations

## estimated_seconds
70
## randomise_answers
yes
## author_notes
