<!--
  Lane W1-103-HIST. The 9 Histology "Spot" items from the Practical Blood
  Questions bank (src_4b9b0c4cf94fde15b14a, preferred twin src_5309ee19e1149a5bbe9d
  not yet re-cached), each with three lettered sub-parts (a/b/c) on one slide or
  diagram -- authored as `structured written` questions per 05-questions.md
  (never rewritten into single-best-answer MCQs; these were never lettered
  options in the source). Every item requires an image or diagram it does not
  have, so every item carries a `Priority: required` media_recommendations
  block -- the format cannot be marked correctly without the asset.

  Spot 7b (stromal cells) tests CON-FND-C75600D3D3B546, one of the 3 concepts
  Sec22 rules out (no Kasr article names it yet) -- that one part is recorded
  with no `Concept:` tag and flagged, not dropped; the item's other two parts
  (myeloid tissue naming, megakaryocyte) are unaffected.

  Depends on both this lane's own concept file (live after import) AND the same
  4 Kasr files as AU-MED-103-histology-questions.md -- filed in pending-live/
  because most items name at least one still-pending id.

  Gate:
    npm run medical:batch -- "docs/Alexandria-Source-Imports/pending-live/AU-MED-103-histology-practical-written.md" \
      --with docs/Alexandria-Source-Imports/concept/AU-MED-103-histology-concepts.md \
      --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
      --with docs/Kasr-Source-Imports/concept/104-CPS-concepts.md \
      --with docs/Kasr-Source-Imports/concept/104-CPS-practical-concepts.md \
      --with docs/Kasr-Source-Imports/article/101-ISK-histology.md \
      --with docs/Kasr-Source-Imports/article/104-CPS-articles.md \
      --with docs/Alexandria-Source-Imports/article/AU-MED-103-histology-articles.md \
      --with docs/Alexandria-Source-Imports/evidence/AU-MED-103-histology-resources.md
-->

# Item
## title
Practical Blood Spot 1 — lymph node, silver stain, eosinophil
## question
Identify the slide, its stain, and the labelled cell.
## format
structured written
## subject
haem
## status
Draft
## owner
Admin team
## written_parts
### (a) 2 marks
Identify the slide on the microscope.
Expects: Lymph node
Concept: CON-HEM-D2143156B30A8A

### (b) 2 marks
Mention the stain used.
Expects: Silver stain

### (c) 2 marks
Identify the cell.
Expects: Eosinophil
Concept: CON-HEM-77B701F6105076
## main_concept
CON-HEM-D2143156B30A8A
## concept_ids
CON-HEM-77B701F6105076
## contextual_concept_ids

## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## difficulty
Moderate
## question_type
Anatomy
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
src_4b9b0c4cf94fde15b14a
## learning_objective
Identify a lymph node on a silver-stained section and recognise an eosinophil within it.
## source_citation
Alexandria University MED 103, Practical Blood Questions bank, Histology Spot 1.
## media_recommendations
### image · Question stem
Brief: The silver-stained lymph node slide/photomicrograph this spot is drawn from, with the labelled cell arrowed
Purpose: This is a slide-identification item; without the image the student has nothing to identify and the item cannot be marked.
Priority: required
Status: needed
Source direction: the department's own practical slide set (Histology/Practical/Slides) or an openly licensed equivalent
Rights: must be CC-BY or public domain
## estimated_seconds
90
## author_notes


---

# Item
## title
Practical Blood Spot 2 — thymus, RBC cytoskeleton diagram, actin
## question
Identify the slide, the opposite diagram, and the pointed structure.
## format
structured written
## subject
haem
## status
Draft
## owner
Admin team
## written_parts
### (a) 2 marks
Identify the slide on the microscope.
Expects: Thymus (H&E)
Concept: CON-HEM-BA8773E5D84286

### (b) 2 marks
Identify the opposite figure.
Expects: Diagram of the cytoskeleton of the RBC membrane

### (c) 2 marks
Identify the pointed structure.
Expects: Actin

## main_concept
CON-HEM-BA8773E5D84286
## concept_ids

## contextual_concept_ids

## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## difficulty
Moderate
## question_type
Anatomy
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
src_4b9b0c4cf94fde15b14a
## learning_objective
Identify a thymus H&E slide and name actin as the cytoskeletal protein arrowed on the accompanying RBC-membrane diagram.
## source_citation
Alexandria University MED 103, Practical Blood Questions bank, Histology Spot 2.
## media_recommendations
### image · Question stem
Brief: The thymus H&E slide and the paired RBC-membrane-cytoskeleton diagram this spot is drawn from
Purpose: Both sub-parts identify an image; without it there is nothing to identify.
Priority: required
Status: needed
Source direction: the department's own practical slide set or an openly licensed equivalent
Rights: must be CC-BY or public domain
## estimated_seconds
90
## author_notes
Part (b)/(c) test the RBC membrane cytoskeleton diagram, related to CON-HEM-23E454BD997B29 (biconcavity/flexibility) but not the same objective, so no Concept: tag was forced onto it.

---

# Item
## title
Practical Blood Spot 3 — spleen, germinal centre, marginal zone
## question
Name the organ and identify the two labelled zones.
## format
structured written
## subject
haem
## status
Draft
## owner
Admin team
## written_parts
### (a) 2 marks
Mention the name of the organ.
Expects: Spleen
Concept: CON-HEM-2F3CB0082551D1

### (b) 2 marks
Identify the pointed structure (4).
Expects: Germinal centre
Concept: CON-HEM-7B050DE7FE2B80

### (c) 2 marks
Identify the pointed structure (7).
Expects: Marginal zone
Concept: CON-HEM-7B050DE7FE2B80

## main_concept
CON-HEM-7B050DE7FE2B80
## concept_ids
CON-HEM-2F3CB0082551D1
## contextual_concept_ids

## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## difficulty
Moderate
## question_type
Anatomy
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
src_4b9b0c4cf94fde15b14a
## learning_objective
Identify the spleen and locate its germinal centre and marginal zone on a labelled diagram.
## source_citation
Alexandria University MED 103, Practical Blood Questions bank, Histology Spot 3.
## media_recommendations
### diagram · Question stem
Brief: The splenic white-pulp diagram this spot is drawn from, with points 4 and 7 arrowed
Purpose: The item asks the student to identify two numbered points on a diagram; without the diagram there is nothing to point to.
Priority: required
Status: needed
Source direction: the department's own practical diagram set or an openly licensed histology atlas
Rights: must be CC-BY or public domain
## estimated_seconds
90
## author_notes


---

# Item
## title
Practical Blood Spot 4 — granulopoiesis diagram, promyelocyte, band neutrophil
## question
Name the process and identify the two labelled cells.
## format
structured written
## subject
haem
## status
Draft
## owner
Admin team
## written_parts
### (a) 2 marks
Mention the name of the opposite process.
Expects: Granulopoiesis
Concept: CON-HEM-A4B2A60B89E976

### (b) 2 marks
Identify the pointed cell (2).
Expects: Promyelocyte
Concept: CON-HEM-A4B2A60B89E976

### (c) 2 marks
Identify the pointed cell (7).
Expects: Band neutrophil
Concept: CON-HEM-A4B2A60B89E976

## main_concept
CON-HEM-A4B2A60B89E976
## concept_ids

## contextual_concept_ids

## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## difficulty
Moderate
## question_type
Anatomy
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
5
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
src_4b9b0c4cf94fde15b14a
## learning_objective
Name granulopoiesis and identify the promyelocyte and band-form neutrophil on its diagram.
## source_citation
Alexandria University MED 103, Practical Blood Questions bank, Histology Spot 4.
## media_recommendations
### diagram · Question stem
Brief: The granulopoiesis diagram this spot is drawn from, with cells 2 and 7 arrowed
Purpose: The item asks the student to identify two numbered cells on a diagram; without it there is nothing to identify.
Priority: required
Status: needed
Source direction: the department's own practical diagram set or an openly licensed histology atlas
Rights: must be CC-BY or public domain
## estimated_seconds
90
## author_notes
This item's main_concept (CON-HEM-A4B2A60B89E976) is this lane's own NEW concept, live once concept/AU-MED-103-histology-concepts.md is imported — placed here rather than in question/AU-MED-103-histology-mcq.md because it is a written-format item, not a single-best-answer one, and because it sits in the same source bank as the other 8 Spot items.

---

# Item
## title
Practical Blood Spot 5 — palatine tonsil, paracortical area, medullary sinuses
## question
Identify the slide and its labelled zones.
## format
structured written
## subject
haem
## status
Draft
## owner
Admin team
## written_parts
### (a) 2 marks
Identify the slide on the microscope.
Expects: Palatine tonsil (H&E)
Concept: CON-HEM-093013026B640A

### (b) 2 marks
Identify (5).
Expects: Paracortical area
Concept: CON-HEM-748293D5DA5D92

### (c) 2 marks
Identify (7).
Expects: Medullary lymph sinuses
Concept: CON-HEM-D2143156B30A8A

## main_concept
CON-HEM-093013026B640A
## concept_ids
CON-HEM-748293D5DA5D92 | CON-HEM-D2143156B30A8A
## contextual_concept_ids

## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## difficulty
Moderate
## question_type
Anatomy
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
ART-104-HIS-LYMPHOID-ORGANS
## resource_ids
src_4b9b0c4cf94fde15b14a
## learning_objective
Identify a palatine tonsil slide, its paracortical area and (on an adjoining node) its medullary lymph sinuses.
## source_citation
Alexandria University MED 103, Practical Blood Questions bank, Histology Spot 5.
## media_recommendations
### image · Question stem
Brief: The palatine tonsil H&E slide this spot is drawn from, with points 5 and 7 arrowed
Purpose: This is a slide-identification item; without the image there is nothing to identify.
Priority: required
Status: needed
Source direction: the department's own practical slide set or an openly licensed equivalent
Rights: must be CC-BY or public domain
## estimated_seconds
90
## author_notes
Source bank prints "Identify (5)"/"Identify (7)" with no structure named until the answer key; part (c)'s "medullary lymph sinuses" answer implies the slide set for this spot also shows lymph-node tissue alongside the tonsil, not stated explicitly in the source.

---

# Item
## title
Practical Blood Spot 6 — spleen (silver stain), secondary tonsillar crypt, mucous acini
## question
Identify the slide and the two labelled structures.
## format
structured written
## subject
haem
## status
Draft
## owner
Admin team
## written_parts
### (a) 2 marks
Identify the slide on the microscope.
Expects: Spleen (silver stain)
Concept: CON-HEM-2F3CB0082551D1

### (b) 2 marks
Identify (2).
Expects: Secondary tonsillar crypt
Concept: CON-HEM-093013026B640A

### (c) 2 marks
Identify (4).
Expects: Mucous acini
Concept: CON-HEM-093013026B640A

## main_concept
CON-HEM-093013026B640A
## concept_ids
CON-HEM-2F3CB0082551D1
## contextual_concept_ids

## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## difficulty
Moderate
## question_type
Anatomy
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
ART-104-HIS-LYMPHOID-ORGANS
## resource_ids
src_4b9b0c4cf94fde15b14a
## learning_objective
Identify a silver-stained spleen slide and, on a companion tonsil slide, its secondary crypt and mucous acini.
## source_citation
Alexandria University MED 103, Practical Blood Questions bank, Histology Spot 6.
## media_recommendations
### image · Question stem
Brief: The silver-stained spleen slide and the companion tonsil slide this spot is drawn from, with points 2 and 4 arrowed
Purpose: This is a slide-identification item; without the image there is nothing to identify.
Priority: required
Status: needed
Source direction: the department's own practical slide set or an openly licensed equivalent
Rights: must be CC-BY or public domain
## estimated_seconds
90
## author_notes
Source bank's part (a) names the spleen slide but parts (b)/(c)'s answers ("secondary tonsillar crypt", "mucous acini") belong to a tonsil slide, not the spleen one named in (a) — recorded as printed rather than reconciled; the bank likely shows two slides in this one spot.

---

# Item
## title
Practical Blood Spot 7 — bone marrow (myeloid tissue) diagram, stromal cells, megakaryocyte
## question
Name the diagram and identify the two labelled cells.
## format
structured written
## subject
haem
## status
Draft
## owner
Admin team
## written_parts
### (a) 2 marks
Identify the opposite figure.
Expects: Diagram of the red bone marrow (myeloid tissue)

### (b) 2 marks
Identify (3).
Expects: Stromal cells

### (c) 2 marks
Identify (5).
Expects: Megakaryocyte
Concept: CON-HEM-3DC3EAA5D4D84B

## main_concept
CON-HEM-3DC3EAA5D4D84B
## concept_ids

## contextual_concept_ids

## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## difficulty
Moderate
## question_type
Anatomy
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
ART-HEM-TOP-FD61B0A3D0
## resource_ids
src_4b9b0c4cf94fde15b14a
## learning_objective
Identify a red-bone-marrow (myeloid tissue) diagram and its megakaryocyte.
## source_citation
Alexandria University MED 103, Practical Blood Questions bank, Histology Spot 7.
## media_recommendations
### diagram · Question stem
Brief: The red bone marrow (myeloid tissue) diagram this spot is drawn from, with points 3 and 5 arrowed
Purpose: The item asks the student to identify two numbered structures on a diagram; without it there is nothing to identify.
Priority: required
Status: needed
Source direction: the department's own practical diagram set or an openly licensed histology atlas
Rights: must be CC-BY or public domain
## estimated_seconds
90
## author_notes
Part (b), "stromal cells", is deliberately left with no Concept: tag. Its matching concept, CON-FND-C75600D3D3B546 (the reticular cell), is one of the 3 pending ids no Kasr article names yet (Sec22) -- kept in the mark scheme, since the paper's own answer is real, but not tagged to an unauthored-question concept.

---

# Item
## title
Practical Blood Spot 8 — spleen diagram, splenic cords, central artery
## question
Name the diagram and identify the two labelled structures.
## format
structured written
## subject
haem
## status
Draft
## owner
Admin team
## written_parts
### (a) 2 marks
Identify the opposite figure.
Expects: Diagram of the spleen
Concept: CON-HEM-2F3CB0082551D1

### (b) 2 marks
Identify (1).
Expects: Splenic cords of the red pulp
Concept: CON-HEM-594B1725902DAD

### (c) 2 marks
Identify (2).
Expects: Central (follicular) artery
Concept: CON-HEM-4D47090A0B7561

## main_concept
CON-HEM-594B1725902DAD
## concept_ids
CON-HEM-2F3CB0082551D1 | CON-HEM-4D47090A0B7561
## contextual_concept_ids

## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## difficulty
Moderate
## question_type
Anatomy
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
ART-104-HIS-LYMPHOID-ORGANS
## resource_ids
src_4b9b0c4cf94fde15b14a
## learning_objective
Identify the spleen diagram and locate the splenic cords of the red pulp and the central (follicular) artery on it.
## source_citation
Alexandria University MED 103, Practical Blood Questions bank, Histology Spot 8.
## media_recommendations
### diagram · Question stem
Brief: The spleen diagram this spot is drawn from, with points 1 and 2 arrowed
Purpose: The item asks the student to identify two numbered structures on a diagram; without it there is nothing to identify.
Priority: required
Status: needed
Source direction: the department's own practical diagram set or an openly licensed histology atlas
Rights: must be CC-BY or public domain
## estimated_seconds
90
## author_notes


---

# Item
## title
Practical Blood Spot 9 — lymph node, alpha granules, dense tubular system
## question
Identify the slide and the two labelled platelet structures.
## format
structured written
## subject
haem
## status
Draft
## owner
Admin team
## written_parts
### (a) 2 marks
Identify the slide on the microscope.
Expects: Lymph node (H&E)
Concept: CON-HEM-D2143156B30A8A

### (b) 2 marks
Identify (4).
Expects: Alpha granules
Concept: CON-HEM-B000CE18F93F83

### (c) 2 marks
Identify (8).
Expects: Dense tubular system
Concept: CON-HEM-CC292B4D6CC61E

## main_concept
CON-HEM-D2143156B30A8A
## concept_ids
CON-HEM-B000CE18F93F83 | CON-HEM-CC292B4D6CC61E
## contextual_concept_ids

## topic
Hematopoiesis and blood science
## subtopic
Blood cell development
## difficulty
Moderate
## question_type
Anatomy
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
45
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
ART-104-HIS-LYMPHOID-ORGANS
## resource_ids
src_4b9b0c4cf94fde15b14a
## learning_objective
Identify a lymph node H&E slide and, on an accompanying platelet EM diagram, its alpha granules and dense tubular system.
## source_citation
Alexandria University MED 103, Practical Blood Questions bank, Histology Spot 9.
## media_recommendations
### image · Question stem
Brief: The lymph node H&E slide and the paired platelet EM diagram this spot is drawn from, with points 4 and 8 arrowed
Purpose: This is a slide/diagram-identification item; without the images there is nothing to identify.
Priority: required
Status: needed
Source direction: the department's own practical slide set or an openly licensed equivalent
Rights: must be CC-BY or public domain
## estimated_seconds
90
## author_notes
Source bank's part (a) names a lymph node slide but parts (b)/(c) answers belong to a platelet EM diagram, not the lymph node — recorded as printed, same pattern as Spot 6.
