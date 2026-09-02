<!--
  Sparse-concept reuse batch. Every question below has a "## main_concept" that
  targets a concept id living ONLY in pending-live/MANS-HIS-203-concepts.md and
  its Kasr/Alexandria targets (none of these concept ids are in
  server/data/medical-library-v1.json yet, checked directly 2026-09-02). Apply
  this file ONLY after pending-live/MANS-HIS-203-concepts.md and every concept
  file it overlays (101-ISK-mcq-concepts.md, 102-INT-mcq-concepts.md,
  102-INT-physiology-concepts.md, 104-CPS-mcq-concepts.md,
  104-CPS-practical-concepts.md, AU-MED-103-histology-concepts.md) are live.

  27 questions across 5 clusters (erythropoiesis stages/site/terminology 9,
  bone marrow 3, leukocytes/lymphocytes/granulopoiesis 9, lymphoid organs 5,
  microbiology Rh/hypersensitivity 1), all with printed-key sources from the
  His Continuous Berlin Book 2026 (src_c4ee1e63536c22ca52d4).

  Gate (run once without --with to confirm the "does not exist" refusal on
  main_concept, then once with the full set below to confirm a clean pass):

  npm run medical:batch -- "docs/Mansoura-Source-Imports/pending-live/MANS-HIS-203-questions.md" \
    --with docs/Mansoura-Source-Imports/resource/MANS-HIS-203-resources.md \
    --with docs/Mansoura-Source-Imports/pending-live/MANS-HIS-203-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/102-INT-physiology-concepts.md \
    --with docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/104-CPS-practical-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-103-histology-concepts.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-histology.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-histology-2.md \
    --with docs/Kasr-Source-Imports/article/102-INT-physiology-blood-ans.md \
    --with docs/Alexandria-Source-Imports/article/AU-MED-103-histology-articles.md \
    --with docs/Kasr-Source-Imports/article/104-CPS-articles.md \
    --with docs/Mansoura-Source-Imports/concept/MANS-HIS-203-concepts.md \
    --with docs/Mansoura-Source-Imports/article/MANS-HIS-203-articles.md

  This file's "## id"s are not live, so "medical:simulate" cannot resolve this
  file standalone; it is included, in dependency order, in this lane's one
  full-tree simulate run (see the lane report).
-->

# Item

## id
QST-MANSHIS203-ERYTHROPOIESIS-PENDING-Q4

## title
Erythropoiesis — where mitosis is lost

## question
In erythropoiesis, mitosis (proliferation) is lost in:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
E

## answer_a
CFU-erythrocyte

## explanation_a
Incorrect. The CFU-erythrocyte (colony-forming unit) is an early committed progenitor, well before the mitotic capacity of the maturing erythroid series is lost.

## answer_b
Basophilic erythroblast

## explanation_b
Incorrect. The basophilic erythroblast is still an actively dividing stage, earlier in the series than the point where mitosis is lost.

## answer_c
Proerythroblast

## explanation_c
Incorrect. The proerythroblast is the very first recognisable precursor and is still capable of mitosis; it is far too early in the series for mitosis to have been lost already.

## answer_d
Polychromatic erythroblast

## explanation_d
Incorrect. The polychromatophilic erythroblast is in fact the LAST stage still capable of mitosis, not the stage where that capacity is lost; it is the stage immediately before the one this question is asking for.

## answer_e
Normoblast

## explanation_e
Correct. Mitosis (the capacity to divide) is lost at the normoblast stage, the stage immediately after the polychromatophilic erythroblast, which is the last dividing stage. From the normoblast onward the erythroid series only matures — condensing its nucleus and extruding it — without further cell division.

## topic
Hematopoiesis and blood science

## subtopic
Erythropoiesis

## main_concept
CON-HEM-2D18E46BA15483

## concept_ids
CON-HEM-2D18E46BA15483

## contextual_concept_ids

## difficulty
Hard

## question_type
Recall

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Physiology > Blood > Erythropoiesis

## question_only_for

## library_ids
ART-102-PHY-ERYTHROPOIESIS | ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA | ART-HEM-AU103-RBC-BONE-MARROW

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that the normoblast is the first erythroid stage to have lost the capacity for mitosis, immediately after the last dividing stage (the polychromatophilic erythroblast).

## source_citation
His Continuous Berlin Book 2026, p.16

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.16

---

# Item

## id
QST-MANSHIS203-ERYTHROPOIESIS-PENDING-Q5

## title
Term for decreased RBC count

## question
Decreased RBCs count is called:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Polycythemia

## explanation_a
Incorrect. Polycythemia is the opposite term — an INCREASED RBC count, not a decreased one.

## answer_b
Leukemia

## explanation_b
Incorrect. Leukemia is a malignant proliferation of white blood cells; it is not the term for a decreased red cell count.

## answer_c
Anemia

## explanation_c
Correct. A decreased RBC count is called anemia. It may arise from decreased production (for example bone marrow depression), increased loss (haemorrhage) or increased destruction (haemolysis) of red cells, but the term itself simply names the reduced count and the reduced oxygen-carrying capacity that follows from it.

## answer_d
Leukopenia

## explanation_d
Incorrect. Leukopenia is a decreased white blood cell count, not a decreased red cell count.

## answer_e
Thrombocytopenia

## explanation_e
Incorrect. Thrombocytopenia is a decreased platelet count, a different cell line from the erythrocyte this question is asking about.

## topic
Hematopoiesis and blood science

## subtopic
Anaemia and polycythemia terminology

## main_concept
CON-HEM-3FDA659AB5822B

## concept_ids
CON-HEM-3FDA659AB5822B

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Physiology > Blood > Erythropoiesis

## question_only_for

## library_ids
ART-102-PHY-ERYTHROPOIESIS | ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA | ART-HEM-AU103-RBC-BONE-MARROW

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Name anemia as the term for a decreased RBC count, as distinct from leukopenia (white cells) and thrombocytopenia (platelets).

## source_citation
His Continuous Berlin Book 2026, p.16

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.16

---

# Item

## id
QST-MANSHIS203-ERYTHROPOIESIS-PENDING-Q13

## title
What erythropoiesis means

## question
Erythropoiesis means the development of:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Red blood cells

## explanation_a
Correct. Erythropoiesis is the term for the development (production and maturation) of red blood cells. It runs from the proerythroblast through several intermediate erythroblast stages and the reticulocyte to the mature erythrocyte. The name itself builds on "erythro-", the same root used for the mature red cell it produces.

## answer_b
Lymphocytes

## explanation_b
Incorrect. Lymphocyte development is not called erythropoiesis; lymphocytes arise from the separate lymphoid line.

## answer_c
Monocytes

## explanation_c
Incorrect. Monocyte development is part of the myeloid (granulocyte-monocyte) line, not the erythroid line erythropoiesis names.

## answer_d
Basophils

## explanation_d
Incorrect. Basophil development is part of granulopoiesis, the granulocyte series, not erythropoiesis.

## answer_e
Eosinophils

## explanation_e
Incorrect. Eosinophil development is likewise part of granulopoiesis, not erythropoiesis.

## topic
Hematopoiesis and blood science

## subtopic
Erythropoiesis

## main_concept
CON-HEM-2D18E46BA15483

## concept_ids
CON-HEM-2D18E46BA15483

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Physiology > Blood > Erythropoiesis

## question_only_for

## library_ids
ART-102-PHY-ERYTHROPOIESIS | ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA | ART-HEM-AU103-RBC-BONE-MARROW

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Define erythropoiesis as the development of red blood cells, as distinct from the separate lymphoid and granulocyte-monocyte lines.

## source_citation
His Continuous Berlin Book 2026, p.18

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.18

---

# Item

## id
QST-MANSHIS203-ERYTHROPOIESIS-PENDING-Q14

## title
Main site of erythropoiesis in middle age

## question
The main site of erythropoiesis in middle age is:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Red bone marrow

## explanation_a
Correct. By middle age, as through the rest of adult life, red bone marrow is the main site of erythropoiesis. It persists specifically in the membranous bones — vertebrae, skull, ribs, pelvis and sternum — once the marrow of the long bone shafts has converted to inactive yellow marrow. The earlier fetal sites (yolk sac, liver, spleen) have long since handed over to this adult one.

## answer_b
Amniotic cavity

## explanation_b
Incorrect. The amniotic cavity surrounds the developing embryo/fetus in fluid; it is not, and has never been, a site of blood cell formation.

## answer_c
Yolk sac

## explanation_c
Incorrect. The yolk sac is the site of erythropoiesis only in the earliest weeks of embryonic life, not in middle age; erythropoiesis moves on from the yolk sac to the liver, spleen and finally bone marrow well before birth.

## answer_d
Lymph node

## explanation_d
Incorrect. The lymph node is a site of lymphocyte proliferation and immune surveillance, not a site of erythropoiesis at any age.

## answer_e
Lung

## explanation_e
Incorrect. The lung has no haemopoietic function at any stage of life.

## topic
Hematopoiesis and blood science

## subtopic
Erythropoiesis site by age

## main_concept
CON-HEM-A3B0CEA5DFA83E

## concept_ids
CON-HEM-A3B0CEA5DFA83E

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Physiology > Blood > Erythropoiesis

## question_only_for

## library_ids
ART-102-PHY-ERYTHROPOIESIS | ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA | ART-HEM-AU103-RBC-BONE-MARROW

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that red bone marrow of the membranous bones is the main erythropoietic site by middle age and throughout adult life.

## source_citation
His Continuous Berlin Book 2026, p.18

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.18

---

# Item

## id
QST-MANSHIS203-ERYTHROPOIESIS-PENDING-Q16

## title
Erythropoiesis — where haemoglobin starts to appear

## question
During erythropoiesis, hemoglobin starts to appear in:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
E

## answer_a
Basophilic erythroblast

## explanation_a
Incorrect. The basophilic erythroblast's cytoplasm is still purely basophilic (ribosome-rich, blue-staining on Romanowsky stain), which is why it is named for basophilia rather than for any visible haemoglobin yet.

## answer_b
CFU-Erythroid

## explanation_b
Incorrect. The CFU-erythroid is an early committed progenitor, well before any visible haemoglobin content, since it precedes even the first recognisable erythroblast stage.

## answer_c
Reticulocyte

## explanation_c
Incorrect. By the reticulocyte stage haemoglobin synthesis is already essentially complete, one stage further on than where it FIRST becomes visible.

## answer_d
Normoblast

## explanation_d
Incorrect. Haemoglobin synthesis is not complete until the normoblast stage, but it has already started appearing one stage earlier, at the polychromatophilic erythroblast.

## answer_e
Polychromatic erythroblast

## explanation_e
Correct. Haemoglobin starts to appear at the polychromatophilic erythroblast stage. This stage is literally named for its mixed ("polychromatic") staining — a cytoplasm that is part basophilic (residual ribosomal RNA, blue) and part acidophilic (the newly accumulating haemoglobin, pink) — which is the visible sign that haemoglobin synthesis has begun.

## topic
Hematopoiesis and blood science

## subtopic
Erythropoiesis

## main_concept
CON-HEM-2D18E46BA15483

## concept_ids
CON-HEM-2D18E46BA15483

## contextual_concept_ids

## difficulty
Hard

## question_type
Recall

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Physiology > Blood > Erythropoiesis

## question_only_for

## library_ids
ART-102-PHY-ERYTHROPOIESIS | ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA | ART-HEM-AU103-RBC-BONE-MARROW

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that haemoglobin first becomes visible at the polychromatophilic erythroblast stage, one stage before its synthesis completes at the normoblast.

## source_citation
His Continuous Berlin Book 2026, p.19

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.19

---

# Item

## id
QST-MANSHIS203-ERYTHROPOIESIS-PENDING-Q18

## title
Term for increased RBC count

## question
Increased RBCs count is called:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
E

## answer_a
Anemia

## explanation_a
Incorrect. Anemia is the opposite term — a DECREASED RBC count, not an increased one.

## answer_b
Leukopenia

## explanation_b
Incorrect. Leukopenia is a decreased white blood cell count, a different cell line from the erythrocyte this question is asking about.

## answer_c
Thrombocytopenia

## explanation_c
Incorrect. Thrombocytopenia is a decreased platelet count, again a different cell line.

## answer_d
Leukocytosis

## explanation_d
Incorrect. Leukocytosis is an increased white blood cell count, not an increased red cell count.

## answer_e
Polycythemia

## explanation_e
Correct. An increased RBC count is called polycythemia, up to roughly 6-8 million/mm3. It may be primary, arising from the bone marrow itself (polycythemia vera), or secondary, driven by tissue hypoxia stimulating erythropoietin.

## topic
Hematopoiesis and blood science

## subtopic
Anaemia and polycythemia terminology

## main_concept
CON-HEM-3FDA659AB5822B

## concept_ids
CON-HEM-3FDA659AB5822B

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Physiology > Blood > Erythropoiesis

## question_only_for

## library_ids
ART-102-PHY-ERYTHROPOIESIS | ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA | ART-HEM-AU103-RBC-BONE-MARROW

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Name polycythemia as the term for an increased RBC count, and distinguish primary from secondary causes.

## source_citation
His Continuous Berlin Book 2026, p.19

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.19

---

# Item

## id
QST-MANSHIS203-ERYTHROPOIESIS-PENDING-Q19

## title
Site of erythropoiesis in the early embryo

## question
Site of erythropoiesis in early embryo is:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Liver

## explanation_a
Incorrect. The liver becomes the major site of fetal erythropoiesis a little later, after the yolk sac stage, not in the earliest embryo.

## answer_b
Yolk sac mesoderm

## explanation_b
Correct. In the early embryo, erythropoiesis begins in the yolk sac mesoderm, the earliest of the sites the erythropoietic function shifts through with age. This yolk sac phase lasts only a few weeks before the site of erythropoiesis moves on, first to the liver and spleen and eventually to bone marrow.

## answer_c
Red bone marrow

## explanation_c
Incorrect. Red bone marrow becomes active only later in fetal life and remains the site through childhood and adulthood; it is not where erythropoiesis begins in the earliest embryo.

## answer_d
Spleen

## explanation_d
Incorrect. The spleen becomes a site of fetal erythropoiesis after the yolk sac and alongside the liver, not at the very start.

## answer_e
Yellow bone marrow

## explanation_e
Incorrect. Yellow bone marrow is inactive, fatty marrow, the opposite of an active erythropoietic site at any stage.

## topic
Hematopoiesis and blood science

## subtopic
Erythropoiesis site by age

## main_concept
CON-HEM-A3B0CEA5DFA83E

## concept_ids
CON-HEM-A3B0CEA5DFA83E

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Physiology > Blood > Erythropoiesis

## question_only_for

## library_ids
ART-102-PHY-ERYTHROPOIESIS | ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA | ART-HEM-AU103-RBC-BONE-MARROW

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that erythropoiesis begins in the yolk sac mesoderm in the early embryo, before shifting to the liver, spleen and finally bone marrow.

## source_citation
His Continuous Berlin Book 2026, p.19

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.19

---

# Item

## id
QST-MANSHIS203-ERYTHROPOIESIS-PENDING-Q20

## title
First precursor cell for RBCs

## question
The first precursor cell for RBCs is:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
CFU-erythrocyte

## explanation_a
Incorrect. The CFU-erythrocyte (colony-forming unit) is a committed progenitor stage before any recognisable erythroblast morphology appears; it precedes the proerythroblast, the first RECOGNISABLE precursor this question is asking for.

## answer_b
Basophilic erythroblast

## explanation_b
Incorrect. The basophilic erythroblast is the second recognisable stage of the series, coming after the proerythroblast, not the first.

## answer_c
Proerythroblast

## explanation_c
Correct. The proerythroblast is the first recognisable precursor cell of the erythroid series. From it the series proceeds through the basophilic, polychromatophilic and normoblast stages to the reticulocyte and finally the mature erythrocyte.

## answer_d
Polychromatic erythroblast

## explanation_d
Incorrect. The polychromatophilic erythroblast is the third stage of the series, well after the proerythroblast that begins it.

## answer_e
Normoblast

## explanation_e
Incorrect. The normoblast is the fourth stage, the last stage before the reticulocyte, far from the first precursor this question asks for.

## topic
Hematopoiesis and blood science

## subtopic
Erythropoiesis

## main_concept
CON-HEM-2D18E46BA15483

## concept_ids
CON-HEM-2D18E46BA15483

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Physiology > Blood > Erythropoiesis

## question_only_for

## library_ids
ART-102-PHY-ERYTHROPOIESIS | ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA | ART-HEM-AU103-RBC-BONE-MARROW

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify the proerythroblast as the first recognisable precursor cell of the erythroid series.

## source_citation
His Continuous Berlin Book 2026, p.19

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.19

---

# Item

## id
QST-MANSHIS203-ERYTHROPOIESIS-PENDING-D63B-3

## title
Duration of yolk sac hematopoiesis (past-exam block, دفعة 63)

## question
Hematopoiesis in the yolk sac of the embryo continues for:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Few weeks

## explanation_a
Correct. Yolk sac haematopoiesis is brief, lasting only a few weeks of early embryonic life. After that short window, the site of blood cell formation shifts on to the liver and spleen. Bone marrow only becomes the dominant site later still, in the third trimester and beyond.

## answer_b
End of 2nd trimester

## explanation_b
Incorrect. Yolk sac activity has already ended well before the end of the second trimester; by then the liver and spleen (and increasingly bone marrow) have taken over.

## answer_c
3rd trimester

## explanation_c
Incorrect. The third trimester's dominant haemopoietic site is bone marrow, not the long-since-inactive yolk sac.

## answer_d
Puberty

## explanation_d
Incorrect. Yolk sac haematopoiesis is confined to early embryonic life; it plays no role anywhere near puberty.

## answer_e
Lifelong

## explanation_e
Incorrect. The yolk sac's haemopoietic role is the shortest-lived of all the sites in the sequence, not a lifelong one; bone marrow is the site that persists lifelong instead.

## topic
Hematopoiesis and blood science

## subtopic
Erythropoiesis site by age

## main_concept
CON-HEM-A3B0CEA5DFA83E

## concept_ids
CON-HEM-A3B0CEA5DFA83E

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Physiology > Blood > Erythropoiesis

## question_only_for

## library_ids
ART-102-PHY-ERYTHROPOIESIS | ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA | ART-HEM-AU103-RBC-BONE-MARROW

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that yolk sac haematopoiesis lasts only a few weeks of early embryonic life before the site shifts to the liver, spleen and bone marrow.

## source_citation
His Continuous Berlin Book 2026, p.38

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.38 (دفعة 63 past-exam block, printed item 3)

---

# Item

## id
QST-MANSHIS203-MARROW-PENDING-Q11

## title
Where red bone marrow is found

## question
Red bone marrow is present in which of the following?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
In most of the bones of the fetus

## explanation_a
Correct. In the fetus, red (active) marrow fills most of the bones. It is only later in life, as the child grows, that the marrow of the long bone shafts progressively converts to inactive yellow marrow, leaving red marrow confined to the flat, short and irregular bones in the adult.

## answer_b
In shafts of long bones in adults

## explanation_b
Incorrect. In the adult, the shafts of long bones are filled with inactive yellow marrow, not red marrow — the two-way conversion runs the opposite direction from what this option states.

## answer_c
Intervertebral discs

## explanation_c
Incorrect. Intervertebral discs are fibrocartilaginous structures between vertebral bodies; they contain no marrow of either kind.

## answer_d
Mucoid connective tissue

## explanation_d
Incorrect. Mucoid connective tissue (such as Wharton's jelly) is a distinct embryonic connective tissue type; it is not a site of bone marrow.

## answer_e
Tendons of muscles

## explanation_e
Incorrect. Tendons are dense regular connective tissue attaching muscle to bone; they contain no marrow.

## topic
Hematopoiesis and blood science

## subtopic
Bone marrow

## main_concept
CON-HEM-AEB2E6C6E8A423

## concept_ids
CON-HEM-AEB2E6C6E8A423

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
MANS_Y1=moderate

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Haemopoiesis

## question_only_for

## library_ids
ART-101-HIS-HAEMOPOIESIS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that red marrow fills most fetal bones and that it is confined to specific adult sites once the long bone shafts convert to yellow marrow.

## source_citation
His Continuous Berlin Book 2026, p.18

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.18

---

# Item

## id
QST-MANSHIS203-MARROW-PENDING-Q12

## title
Site of yellow (inactive) bone marrow

## question
What is the site of yellow (inactive) bone marrow?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
E

## answer_a
Bones of fetus

## explanation_a
Incorrect. Fetal bones are filled with active red marrow, not the inactive yellow marrow this question asks about.

## answer_b
Clavicle

## explanation_b
Incorrect. The clavicle, like the other flat and short bones, retains red (active) marrow in the adult, not yellow marrow.

## answer_c
Sternum

## explanation_c
Incorrect. The sternum is one of the classic sites of red marrow biopsy in the adult precisely because it remains active, not because it holds yellow marrow.

## answer_d
Ribs and vertebrae

## explanation_d
Incorrect. Ribs and vertebrae, like the sternum, remain red-marrow-active flat and irregular bones in the adult.

## answer_e
Shafts of long bones

## explanation_e
Correct. Yellow (inactive, fat-laden) marrow occupies the shafts of the long bones in the adult. It is not dead tissue but a fat reserve that can convert back to active red marrow when the body's demand for blood cells rises.

## topic
Hematopoiesis and blood science

## subtopic
Bone marrow

## main_concept
CON-HEM-AEB2E6C6E8A423

## concept_ids
CON-HEM-AEB2E6C6E8A423

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
MANS_Y1=moderate

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Haemopoiesis

## question_only_for

## library_ids
ART-101-HIS-HAEMOPOIESIS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify the shafts of the long bones as the adult site of inactive yellow marrow, as distinct from the flat/irregular bones that stay red-marrow-active.

## source_citation
His Continuous Berlin Book 2026, p.18

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.18

---

# Item

## id
QST-MANSHIS203-MARROW-PENDING-D63A-2

## title
Site of adult hemopoiesis (past-exam block, دفعة 63)

## question
Where does hemopoiesis take place in adults?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Lungs

## explanation_a
Incorrect. The lungs have no haemopoietic function at any stage of life.

## answer_b
Liver

## explanation_b
Incorrect. The liver is a major site of fetal haemopoiesis but is not the site in the adult, whose haemopoietic function has by then shifted to bone marrow.

## answer_c
Bone marrow

## explanation_c
Correct. Bone marrow is where haemopoiesis takes place in the adult. More specifically, it is the red (active) marrow of the flat, short and irregular bones that does the work, since the long bone shafts have converted to inactive yellow marrow by then. This marrow takes over from the fetal liver and spleen well before birth.

## answer_d
Pancreas

## explanation_d
Incorrect. The pancreas is an exocrine and endocrine digestive gland; it has no role in blood cell formation.

## answer_e
Spleen

## explanation_e
Incorrect. The spleen is a site of fetal haemopoiesis and remains a store and filter for blood cells in the adult, but it is not the adult's main site of active production, which is bone marrow.

## topic
Hematopoiesis and blood science

## subtopic
Bone marrow

## main_concept
CON-HEM-AEB2E6C6E8A423

## concept_ids
CON-HEM-AEB2E6C6E8A423

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
MANS_Y1=moderate

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Haemopoiesis

## question_only_for

## library_ids
ART-101-HIS-HAEMOPOIESIS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that bone marrow is the adult site of haemopoiesis, having taken over from the fetal liver and spleen.

## source_citation
His Continuous Berlin Book 2026, p.37

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.37 (دفعة 63 past-exam block, printed item 7)

---

# Item

## id
QST-MANSHIS203-LEUKOCYTES-PENDING-Q51

## title
B-lymphocyte function

## question
B-lymphocytes:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Constitute 1% of leukocytes

## explanation_a
Incorrect. B-lymphocytes make up a far larger share of the lymphocyte population than 1% of total leukocytes; lymphocytes overall are a substantial fraction of the white cell count, not a rare 1%.

## answer_b
Life span is few hours

## explanation_b
Incorrect. Memory B-lymphocytes in particular can persist for years, not just a few hours; a life span of hours would leave no basis for long-term immune memory.

## answer_c
Important in humoral immunity

## explanation_c
Correct. B-lymphocytes are important in humoral immunity. On activation by antigen and helper T-cell signals, they become plasma cells that secrete antibody into the blood and tissue fluid. That antibody-mediated response is exactly what "humoral immunity" means.

## answer_d
Important in cellular immunity

## explanation_d
Incorrect. Cell-mediated immunity is the T-lymphocyte's role, not the B-lymphocyte's; the two lymphocyte types divide immunity along exactly this humoral-versus-cellular line.

## answer_e
Anti-parasitic action

## explanation_e
Incorrect. Direct anti-parasitic granule release is a function of the eosinophil, not the B-lymphocyte, which works through antibody production rather than cytotoxic granules.

## topic
Hematopoiesis and blood science

## subtopic
Lymphocytes

## main_concept
CON-HEM-FDAC2D5F64032E

## concept_ids
CON-HEM-FDAC2D5F64032E

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Leukocytes

## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW | ART-101-HIS-GRANULAR-LEUKOCYTES

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that the B-lymphocyte mediates humoral immunity, as distinct from the T-lymphocyte's cell-mediated role.

## source_citation
His Continuous Berlin Book 2026, p.26

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.26

---

# Item

## id
QST-MANSHIS203-LEUKOCYTES-PENDING-Q52

## title
T-lymphocyte function

## question
T-lymphocytes:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Live for many days

## explanation_a
Incorrect as the defining feature this question is testing. Some T-lymphocytes are long-lived memory cells, but the fact this question turns on is their function, not their lifespan, and "many days" understates memory T cells' true persistence in any case.

## answer_b
Develop in bone marrow

## explanation_b
Incorrect. T-lymphocytes develop their antigen-specificity in the thymus (hence "T"), not the bone marrow; the bone marrow is where the B-lymphocyte matures instead.

## answer_c
Constitute 60% of leukocytes

## explanation_c
Incorrect. Lymphocytes overall, not T-lymphocytes alone, make up a large share of leukocytes, but 60% overstates any single lymphocyte subtype's share of the total white cell count.

## answer_d
Important in cellular immunity

## explanation_d
Correct. T-lymphocytes are important in cellular (cell-mediated) immunity. They act directly against infected or foreign cells and coordinate the immune response, rather than working through secreted antibody. That direct, cell-based action is in contrast to the antibody-based humoral immunity B-lymphocytes mediate.

## answer_e
Important in humoral immunity

## explanation_e
Incorrect. Humoral immunity is the B-lymphocyte's role, not the T-lymphocyte's; this option describes the paired lymphocyte type's function, not this one's.

## topic
Hematopoiesis and blood science

## subtopic
Lymphocytes

## main_concept
CON-HEM-FDAC2D5F64032E

## concept_ids
CON-HEM-FDAC2D5F64032E

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Leukocytes

## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW | ART-101-HIS-GRANULAR-LEUKOCYTES

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that the T-lymphocyte mediates cell-mediated (cellular) immunity, as distinct from the B-lymphocyte's humoral role.

## source_citation
His Continuous Berlin Book 2026, p.26

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.26

---

# Item

## id
QST-MANSHIS203-LEUKOCYTES-PENDING-Q53

## title
Largest cell in granulopoiesis

## question
In granulopoiesis, the largest cell is:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Myeloblast

## explanation_a
Incorrect. The myeloblast, the earliest cell of the series, is smaller than the promyelocyte that follows it.

## answer_b
Promyelocyte

## explanation_b
Correct. The promyelocyte is the largest cell in the granulopoietic series. It is the stage that first produces the large azurophilic (primary) granules, and it is larger than both the myeloblast before it and the myelocyte and later stages after it, which progressively shrink as the series matures toward the small mature granulocyte.

## answer_c
Myelocytes

## explanation_c
Incorrect. The myelocyte, the stage after the promyelocyte, is smaller than it, not larger; cell size decreases as granulopoiesis proceeds toward the mature granulocyte.

## answer_d
Metamyelocytes

## explanation_d
Incorrect. The metamyelocyte is later and smaller still than the promyelocyte, continuing the same size-decreasing trend.

## answer_e
Basophil

## explanation_e
Incorrect. The basophil is a mature granulocyte, the end product of the series, and mature granulocytes are smaller than the promyelocyte stage.

## topic
Hematopoiesis and blood science

## subtopic
Granulopoiesis

## main_concept
CON-HEM-A4B2A60B89E976

## concept_ids
CON-HEM-A4B2A60B89E976

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Leukocytes

## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW | ART-101-HIS-GRANULAR-LEUKOCYTES

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify the promyelocyte as the largest cell in the granulopoietic series.

## source_citation
His Continuous Berlin Book 2026, p.26

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.26

---

# Item

## id
QST-MANSHIS203-LEUKOCYTES-PENDING-Q54

## title
Where specific granules first appear in granulopoiesis

## question
Specific granules start to appear in which stage of granulopoiesis?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Myeloblast

## explanation_a
Incorrect. The myeloblast, the earliest stage, has no granules of either kind yet.

## answer_b
Promyelocyte

## explanation_b
Incorrect. The promyelocyte produces only azurophilic (primary) granules, not yet the specific (secondary) granules this question is asking about; those come one stage later.

## answer_c
Myelocytes

## explanation_c
Correct. Specific (secondary) granules first appear at the myelocyte stage of granulopoiesis. These are the granules that distinguish neutrophils, eosinophils and basophils from one another. Their accumulation is accompanied by a fall in basophilia and a rise in eosinophilia in the maturing cell's cytoplasm.

## answer_d
Metamyelocytes

## explanation_d
Incorrect. By the metamyelocyte stage specific granules are already present, having first appeared one stage earlier at the myelocyte; this option is too late, not too early.

## answer_e
UMC

## explanation_e
Incorrect. "UMC" is not a recognised stage of the granulopoietic series named in this bank.

## topic
Hematopoiesis and blood science

## subtopic
Granulopoiesis

## main_concept
CON-HEM-A4B2A60B89E976

## concept_ids
CON-HEM-A4B2A60B89E976

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Leukocytes

## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW | ART-101-HIS-GRANULAR-LEUKOCYTES

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that specific (secondary) granules first appear at the myelocyte stage of granulopoiesis, one stage after the promyelocyte's azurophilic granules.

## source_citation
His Continuous Berlin Book 2026, p.26

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.26

---

# Item

## id
QST-MANSHIS203-LEUKOCYTES-PENDING-Q55

## title
Promyelocyte granule content

## question
Promyelocytes:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Precursor of platelets

## explanation_a
Incorrect. The promyelocyte is a stage of granulopoiesis, the granulocyte series; platelets arise from an entirely separate series, thrombopoiesis, from the megakaryocyte.

## answer_b
Contain fine nonspecific granules

## explanation_b
Correct. The promyelocyte carries only azurophilic (primary, nonspecific) granules at this stage, and is still actively producing them. The specific (secondary) granules that will later distinguish neutrophils, eosinophils and basophils have not yet appeared. Those come one stage later, at the myelocyte.

## answer_c
Small cell

## explanation_c
Incorrect. The promyelocyte is in fact the LARGEST cell in the granulopoietic series, not a small one.

## answer_d
Contain specific granules

## explanation_d
Incorrect. Specific granules have not yet appeared at the promyelocyte stage; they first appear one stage later, at the myelocyte.

## answer_e
Precursor for monocytes

## explanation_e
Incorrect. The promyelocyte belongs to the granulocyte series, not the monocyte line; monocytes arise from a separate precursor (the monoblast).

## topic
Hematopoiesis and blood science

## subtopic
Granulopoiesis

## main_concept
CON-HEM-A4B2A60B89E976

## concept_ids
CON-HEM-A4B2A60B89E976

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Leukocytes

## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW | ART-101-HIS-GRANULAR-LEUKOCYTES

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that the promyelocyte carries only azurophilic (nonspecific) granules, before specific granules appear at the myelocyte stage.

## source_citation
His Continuous Berlin Book 2026, p.26

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.26

---

# Item

## id
QST-MANSHIS203-LEUKOCYTES-PENDING-Q57

## title
What granulopoiesis means

## question
What is meant by granulopoiesis?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Development of platelets

## explanation_a
Incorrect. Platelet development is thrombopoiesis, a separate series from granulopoiesis.

## answer_b
Development of eosinophils

## explanation_b
Correct per this department book's own printed key. Broader physiology texts define granulopoiesis as the development of ALL granulocytes (neutrophils, eosinophils and basophils). This Mansoura HIS 203 source instead keys "development of eosinophils" as the answer among the five options given. The printed key is honoured here as-is rather than silently widened to the broader textbook definition, since eosinophils are a granulocyte and this is the only granulocyte-development option offered.

## answer_c
Development of lymphocytes

## explanation_c
Incorrect. Lymphocyte development follows the separate lymphoid line, not granulopoiesis, which is a myeloid (granulocyte) series.

## answer_d
Development of monocytes

## explanation_d
Incorrect. Monocyte development is a separate myeloid line (from the monoblast), distinct from the granulocyte series granulopoiesis names.

## answer_e
Development of red blood cells

## explanation_e
Incorrect. Red blood cell development is erythropoiesis, a different series entirely from granulopoiesis.

## topic
Hematopoiesis and blood science

## subtopic
Granulopoiesis

## main_concept
CON-HEM-A4B2A60B89E976

## concept_ids
CON-HEM-A4B2A60B89E976

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Leukocytes

## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW | ART-101-HIS-GRANULAR-LEUKOCYTES

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Recognise this department book's own printed framing of granulopoiesis (as eosinophil development) among the given options, while knowing the broader textbook definition covers all granulocytes.

## source_citation
His Continuous Berlin Book 2026, p.27

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.27; stem/key verified against the direct page render, not OCR — the printed key genuinely reads B, narrower than the standard textbook definition of granulopoiesis; flagged per MANS-HIS-203-triage.md rather than silently corrected

---

# Item

## id
QST-MANSHIS203-LEUKOCYTES-PENDING-Q60

## title
Where fine nonspecific granules appear in granulopoiesis

## question
In granulopoiesis the fine non-specific granules appear in the stage of:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Myeloblast

## explanation_a
Incorrect. The myeloblast, the earliest stage, has not yet begun producing any granules.

## answer_b
Myelocyte

## explanation_b
Incorrect. By the myelocyte stage the SPECIFIC granules are what newly appear, not the nonspecific ones, which arrived one stage earlier.

## answer_c
Promyelocyte

## explanation_c
Correct. Fine, nonspecific (azurophilic) granules appear at the promyelocyte stage of granulopoiesis. This is the stage before the specific (secondary) granules appear, which happens at the myelocyte stage that follows. The promyelocyte is still producing only this one granule type.

## answer_d
Metamyelocyte

## explanation_d
Incorrect. By the metamyelocyte stage the nonspecific granules have long since appeared, at the earlier promyelocyte stage.

## answer_e
Mature granulocyte

## explanation_e
Incorrect. The mature granulocyte carries the full complement of both granule types by then, but they did not first appear at this final stage; the nonspecific granules appeared much earlier, at the promyelocyte.

## topic
Hematopoiesis and blood science

## subtopic
Granulopoiesis

## main_concept
CON-HEM-A4B2A60B89E976

## concept_ids
CON-HEM-A4B2A60B89E976

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Leukocytes

## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW | ART-101-HIS-GRANULAR-LEUKOCYTES

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that fine nonspecific (azurophilic) granules first appear at the promyelocyte stage, before specific granules appear at the myelocyte stage.

## source_citation
His Continuous Berlin Book 2026, p.27

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.27

---

# Item

## id
QST-MANSHIS203-LEUKOCYTES-PENDING-Q59

## title
Primary neutrophil granules

## question
Which of the following is true about primary neutrophilic granules?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Faint pink

## explanation_a
Incorrect. A faint pink stain describes the specific (secondary) granule, not the primary one, which stains azurophilic (purple-blue) instead.

## answer_b
Azurophilic

## explanation_b
Correct. The neutrophil's primary (azurophilic) granules are large, few and dark-staining. They are primary lysosomes, holding myeloperoxidase among other contents. "Azurophilic" is exactly the staining property that names them.

## answer_c
Less dense

## explanation_c
Incorrect. The primary granules are large and dense, not less dense; it is the specific (secondary) granules that are smaller and paler.

## answer_d
Smaller in size

## explanation_d
Incorrect. The primary granules are larger, not smaller, than the specific (secondary) granules; size is one of the features that tells the two populations apart.

## answer_e
Bactericidal & Bacteriostatic substances

## explanation_e
Incorrect as a description of the primary granule specifically. Bactericidal and bacteriostatic substances (such as lysozyme, lactoferrin and phagocytin) are carried in the neutrophil's specific (secondary) granules, not the primary (azurophilic) ones, which instead carry myeloperoxidase.

## topic
Hematopoiesis and blood science

## subtopic
Leukocytes

## main_concept
CON-HEM-3899015C5024C0

## concept_ids
CON-HEM-3899015C5024C0

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Leukocytes

## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW | ART-101-HIS-GRANULAR-LEUKOCYTES

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that the neutrophil's primary (azurophilic) granules are large, dark and myeloperoxidase-bearing, as distinct from the smaller, paler, bactericidal-substance-bearing specific granules.

## source_citation
His Continuous Berlin Book 2026, p.27

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.27

---

# Item

## id
QST-MANSHIS203-LEUKOCYTES-PENDING-D62-4

## title
Shape of the neutrophil nucleus (past-exam block, دفعة 62)

## question
What is the shape of the neutrophil nucleus?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Kidney shape

## explanation_a
Incorrect. A kidney (indented) shape describes the monocyte's nucleus, not the neutrophil's.

## answer_b
Bilobed

## explanation_b
Incorrect. A bilobed (two-lobe) nucleus describes the eosinophil, not the neutrophil, which has more lobes than that.

## answer_c
Multilobed

## explanation_c
Correct. The neutrophil's nucleus is multilobed, typically two to five lobes joined by thin strands of chromatin. That segmented appearance is exactly why the neutrophil is also called the polymorphonuclear leukocyte. No other granulocyte carries that many separate lobes.

## answer_d
Spherical

## explanation_d
Incorrect. A spherical (round, undivided) nucleus describes lymphocytes, not the neutrophil's distinctly segmented one.

## answer_e
Irregular

## explanation_e
Incorrect. "Irregular" is too vague and non-specific to describe the neutrophil's nucleus, which has a specific, recognisable multilobed shape rather than an arbitrary irregular outline.

## topic
Hematopoiesis and blood science

## subtopic
Leukocytes

## main_concept
CON-HEM-3899015C5024C0

## concept_ids
CON-HEM-3899015C5024C0

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Leukocytes

## question_only_for

## library_ids
ART-HEM-AU103-RBC-BONE-MARROW | ART-101-HIS-GRANULAR-LEUKOCYTES

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify the neutrophil's multilobed (2-5 lobe) nucleus as the feature behind its "polymorphonuclear" name.

## source_citation
His Continuous Berlin Book 2026, p.36

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.36 (دفعة 62 past-exam block)

---

# Item

## id
QST-MANSHIS203-LYMPHOID-ORGANS-PENDING-Q61

## title
Where lymph node plasma cells sit

## question
Which part of the lymph node contains numerous plasma cells?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Cortical sinuses

## explanation_a
Incorrect. Cortical sinuses are spaces lined by endothelium and macrophages that separate the cortical follicles from the capsule and trabeculae; they filter lymph rather than housing the numerous plasma cells this question asks about.

## answer_b
Medullary sinuses

## explanation_b
Incorrect. Medullary sinuses are the channels between the medullary cords, lined by endothelium and macrophages, that filter lymph on its way to the hilum; the plasma cells sit in the cords beside them, not in the sinuses themselves.

## answer_c
Connective tissue trabeculae

## explanation_c
Incorrect. Connective tissue trabeculae are structural septa extending inward from the capsule; they are not a site where plasma cells accumulate.

## answer_d
Medullary cords

## explanation_d
Correct. The medullary cords, irregular branching cords of B lymphocytes, plasma cells and macrophages in the lymph node's medulla, are where numerous plasma cells are found. These cords may be continuous with the cortical follicles, reflecting the path B lymphocytes take as they differentiate into antibody-secreting plasma cells.

## answer_e
Primary cortical follicles

## explanation_e
Incorrect. Primary cortical follicles are aggregates of mainly naive B lymphocytes in the cortex, before antigen-driven activation; they are not where the numerous, already-differentiated plasma cells of the medulla are found.

## topic
Hematopoiesis and blood science

## subtopic
Lymph node

## main_concept
CON-HEM-E3D03CE92F1D92

## concept_ids
CON-HEM-E3D03CE92F1D92

## contextual_concept_ids
CON-HEM-60C0AFCC9A1F88

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Lymphoid organs

## question_only_for

## library_ids
ART-104-HIS-LYMPHOID-ORGANS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify the medullary cords as the lymph node compartment where numerous plasma cells are found.

## source_citation
His Continuous Berlin Book 2026, p.28

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.28

---

# Item

## id
QST-MANSHIS203-LYMPHOID-ORGANS-PENDING-Q62

## title
Where lymphoid follicles are found in the lymph node

## question
In the lymph node, the lymphoid follicles are found in:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
The cortex

## explanation_a
Correct. Lymphoid follicles are found in the outer part of the lymph node's cortex. Primary follicles there are mainly B lymphocytes. Once antigen has driven activation, some become secondary follicles with a pale germinal centre surrounded by a darker rim of small lymphocytes.

## answer_b
The medulla

## explanation_b
Incorrect. The medulla holds medullary cords and sinuses, not lymphoid follicles, which are a cortical structure.

## answer_c
The Paracortex

## explanation_c
Incorrect. The paracortex, between the cortex and medulla, is the thymus-dependent zone of T lymphocytes only; it specifically has no follicle and no germinal centre of its own.

## answer_d
The red pulp

## explanation_d
Incorrect. Red pulp is a compartment of the spleen, not the lymph node; the two organs' terminology should not be mixed.

## answer_e
The connective tissue trabeculae

## explanation_e
Incorrect. The connective tissue trabeculae are structural septa extending in from the capsule, not the site of the lymphoid follicles, which sit in the cortex between them.

## topic
Hematopoiesis and blood science

## subtopic
Lymph node

## main_concept
CON-HEM-60C0AFCC9A1F88

## concept_ids
CON-HEM-60C0AFCC9A1F88

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Lymphoid organs

## question_only_for

## library_ids
ART-104-HIS-LYMPHOID-ORGANS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State that lymphoid follicles sit in the lymph node's cortex, as distinct from the paracortex's T-lymphocyte-only zone and the medulla's cords and sinuses.

## source_citation
His Continuous Berlin Book 2026, p.28

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.28

---

# Item

## id
QST-MANSHIS203-LYMPHOID-ORGANS-PENDING-Q64

## title
The encapsulated lymphatic organ

## question
Which of the following is an encapsulated lymphatic organ?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Diffuse lymphatic tissue

## explanation_a
Incorrect. Diffuse lymphatic tissue is scattered lymphocytes within a connective tissue framework without a distinct capsule of its own.

## answer_b
Lymph follicles

## explanation_b
Incorrect. Lymph follicles are aggregates of lymphocytes found within various organs (lymph node, spleen, tonsil); a follicle itself has no independent capsule.

## answer_c
Lymph node

## explanation_c
Correct. The lymph node is a discrete, encapsulated lymphatic organ. A dense connective tissue capsule surrounds it, sending trabeculae inward. That capsule is what lets it be identified as an individual organ, with its own afferent and efferent lymphatic vessels, rather than diffuse tissue scattered within another organ.

## answer_d
Peyer's patches

## explanation_d
Incorrect. Peyer's patches are aggregates of lymphoid follicles in the wall of the ileum; they are part of the gut wall, not a separately encapsulated organ.

## answer_e
White pulp

## explanation_e
Incorrect. White pulp is a compartment within the spleen, itself encapsulated as a whole organ, but white pulp is not itself a separately capsulated structure.

## topic
Hematopoiesis and blood science

## subtopic
Lymph node

## main_concept
CON-HEM-60C0AFCC9A1F88

## concept_ids
CON-HEM-60C0AFCC9A1F88

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Lymphoid organs

## question_only_for

## library_ids
ART-104-HIS-LYMPHOID-ORGANS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify the lymph node as an encapsulated lymphatic organ, as distinct from diffuse lymphatic tissue, follicles and Peyer's patches.

## source_citation
His Continuous Berlin Book 2026, p.28

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.28

---

# Item

## id
QST-MANSHIS203-LYMPHOID-ORGANS-PENDING-Q65

## title
Lymph follicles of the spleen

## question
Lymph follicles (lymphatic tissue collections) of the spleen are called:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Blood sinusoids

## explanation_a
Incorrect. Blood sinusoids are the wide, irregular vascular channels of the red pulp, not the lymphatic tissue collections this question asks about.

## answer_b
White pulp

## explanation_b
Correct. The spleen's lymphatic tissue collections are called white pulp, scattered irregularly throughout the red pulp. White pulp is organised concentrically around a central arteriole and contains the spleen's B- and T-lymphocyte zones, functionally analogous to a lymph node's follicles and paracortex.

## answer_c
Cortical follicles

## explanation_c
Incorrect. "Cortical follicles" is lymph-node terminology (the lymph node's cortex holds follicles); the spleen has no cortex/medulla division and its equivalent lymphatic tissue is instead called white pulp.

## answer_d
Red pulp

## explanation_d
Incorrect. Red pulp is the spleen's OTHER compartment — Billroth cords and blood sinusoids — not the lymphatic tissue collections asked for here.

## answer_e
Billroth cords

## explanation_e
Incorrect. Billroth cords are a structural component of the red pulp, between the sinusoids, not the lymphatic tissue collections (white pulp) this question is asking about.

## topic
Hematopoiesis and blood science

## subtopic
Spleen

## main_concept
CON-HEM-594B1725902DAD

## concept_ids
CON-HEM-594B1725902DAD

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Lymphoid organs

## question_only_for

## library_ids
ART-104-HIS-LYMPHOID-ORGANS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify white pulp as the spleen's lymphatic tissue collections, as distinct from the red pulp's Billroth cords and sinusoids.

## source_citation
His Continuous Berlin Book 2026, p.28

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.28

---

# Item

## id
QST-MANSHIS203-LYMPHOID-ORGANS-PENDING-D63A-1

## title
Where Hassall's corpuscles are found (past-exam block, دفعة 63)

## question
Hassall's corpuscles are found in which of the following?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
The red pulp of the spleen

## explanation_a
Incorrect. The splenic red pulp is Billroth cords and blood sinusoids; it contains no Hassall's corpuscles, which are a thymic, not splenic, structure.

## answer_b
Cortex of the lymph node

## explanation_b
Incorrect. Hassall's corpuscles are a thymic structure, not a lymph node one; the lymph node cortex instead holds lymphoid follicles.

## answer_c
Medulla of the thymus lobule

## explanation_c
Correct. Hassall's corpuscles — concentric epithelial bodies with a degenerating acidophilic centre — are found only in the medulla of the thymus lobule. They are a normal constituent of the thymic medulla at every age and occur nowhere else in the body, so finding one identifies both the organ and the zone.

## answer_d
Cortex of the thymus lobule

## explanation_d
Incorrect. The thymic cortex is densely packed with proliferating T-lymphocyte precursors (thymocytes); Hassall's corpuscles are specifically a medullary, not cortical, feature of the thymus.

## answer_e
White pulp of the spleen

## explanation_e
Incorrect. Splenic white pulp is lymphatic tissue around a central arteriole; it contains no Hassall's corpuscles, which are exclusive to the thymic medulla.

## topic
Hematopoiesis and blood science

## subtopic
Thymus

## main_concept
CON-HEM-10B2E783E164FD

## concept_ids
CON-HEM-10B2E783E164FD

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Lymphoid organs

## question_only_for

## library_ids
ART-104-HIS-LYMPHOID-ORGANS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify Hassall's corpuscles as a structure exclusive to the thymic medulla, as distinct from the thymic cortex and from splenic red/white pulp.

## source_citation
His Continuous Berlin Book 2026, p.37

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.37 (دفعة 63 past-exam block, printed item 6)

---

# Item

## id
QST-MANSHIS203-MICROBIOLOGY-PENDING-M5

## title
Rh incompatibility as a hypersensitivity type

## question
An Rh-negative mother gives birth to an Rh-positive child who is completely normal. At the birth of her 2nd child (also Rh-positive), he shows jaundice and anaemia. His lesion is caused by:

## subject
imm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Type I hypersensitivity

## explanation_a
Incorrect. Type I is IgE bound to mast cells producing an immediate reaction to a re-encountered antigen; this scenario is IgG-mediated destruction of the fetus's own red cells, not a mast-cell degranulation reaction.

## answer_b
Type II hypersensitivity

## explanation_b
Correct. This is a type II (cytotoxic) hypersensitivity reaction — erythroblastosis fetalis. The first Rh-positive pregnancy sensitised the Rh-negative mother, producing anti-D IgG antibody. That antibody crosses the placenta in a subsequent Rh-positive pregnancy and binds directly to the D antigen fixed on the fetal red cell surface, and complement-mediated destruction of those antibody-coated cells causes the newborn's jaundice (from the haemoglobin breakdown product bilirubin) and anaemia.

## answer_c
Type III hypersensitivity

## explanation_c
Incorrect. Type III is antibody bound to soluble circulating antigen forming immune complexes that deposit in tissue; here the antibody binds directly to a fixed antigen on the red cell surface, which is the type II mechanism, not immune-complex deposition.

## answer_d
Type VI hypersensitivity

## explanation_d
Incorrect. The Gell and Coombs classification runs only from type I to type IV; there is no "type VI" hypersensitivity.

## answer_e
Viral infection

## explanation_e
Incorrect. The scenario describes an immune-mediated destruction of the newborn's red cells driven by maternal antibody, not an infectious process; no viral trigger is described or needed to explain the findings.

## topic
Immunology

## subtopic
Hypersensitivity reactions

## main_concept
CON-HEM-6C81E4B3EB30DE

## concept_ids
CON-HEM-6C81E4B3EB30DE

## contextual_concept_ids
CON-IMM-64B2E67A0AAF07

## difficulty
Hard

## question_type
Diagnosis

## cognitive_effort
High

## cognitive_effort_score
0.8

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
30

## exam_relevance
5

## clinical_relevance
0.8

## academic_relevance
0.2

## exam_weight_by_year
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Microbiology > Immunology > Hypersensitivity reactions

## question_only_for

## library_ids
ART-102-PHY-BLOOD-GROUPS-AND-BLOOD-TRANSFUSION | ART-MANS-HIS-HYPERSENSITIVITY-CLASSIFICATION

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Classify erythroblastosis fetalis (Rh incompatibility) as a type II (cytotoxic) hypersensitivity reaction, distinguishing it from type I and type III mechanisms.

## source_citation
His Continuous Berlin Book 2026, Microbiology L1 revision, p.46

## attached_image

## attachments

## media_recommendations

## estimated_seconds
65

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.46
