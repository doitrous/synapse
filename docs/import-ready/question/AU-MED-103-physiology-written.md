<!--
  AU-MED-103 Physiology · structured-written items from the module's own Practical/
  Forms-bank department question banks — never rewritten into single-best-answer MCQs,
  since none of these were lettered options in the source (05-questions.md: "Never
  rewrite a source question into a format it was not set in").

  6 records, closing 6 of the module's own untested-concept backlog:
    1. QST-HEM-AU103-FORMS-Q53 — hemolytic anaemia intrinsic/extrinsic causes, from
       "MCQs - Blood practical.pdf" (src_3e62e4d388493af88dbe), item 53 — an open
       short-answer item on an MS-Forms results export, printed correct answer intact.
    2. QST-HEM-AU103-SPOT-Q8 — bleeding time, from "MCQs - Practical Blood Questions"
       (src_4b9b0c4cf94fde15b14a), Physiology Spot 8.
    3. QST-HEM-AU103-SPOT-Q5-6 — coagulation time, from the same bank's Spot 5 and
       Spot 6 (one concept, two adjacent stations).
    4. QST-HEM-AU103-SPOT-Q6-7 — MCV/MCHC, from the same bank's Spot 6 and Spot 7.
    5. QST-HEM-AU103-SPOT-Q9 — leukocytosis, from the same bank's Spot 9.
    6. QST-HEM-AU103-SPOT-Q2 — ESR, from the same bank's Spot 2.

  Every Spot item's image-dependent sub-part ("identify this test/arrow/abnormality
  from the picture") is dropped rather than guessed at — no station image is available
  in this pass — and only the image-independent sub-parts (normal values, mechanisms,
  causes) are transcribed, each noted in that record's author_notes. Every main_concept
  is an existing concept in concept/AU-MED-103-physiology-concepts.md (five, already
  carrying this same exam_signal) or a live Kasr-origin concept sparse-updated there
  (the two anaemia-classification ones). Every library_ids entry is an existing article
  already live or in article/AU-MED-103-physiology-articles.md — no new concept or
  article minted.

  Status Draft throughout; needs a faculty reviewer. Import: Admin > Bulk import >
  question, after the physiology concept and article files.

  Validate with:
    npm run medical:batch -- docs/import-ready/question/AU-MED-103-physiology-written.md \
      --with docs/import-ready/concept/AU-MED-103-physiology-concepts.md \
      --with docs/import-ready/article/AU-MED-103-physiology-articles.md
-->

# Item

## id
QST-HEM-AU103-FORMS-Q53

## title
Causes of hemolytic anaemia

## question
A patient's blood picture shows a normocytic normochromic anaemia. What are the possible causes, including the two broad categories of haemolytic anaemia?

## format
structured written

## subject
haem

## status
Draft

## owner
Admin team

## vignette

## written_parts
### (a) 5 marks
List the possible causes of normocytic normochromic anaemia, including the two broad categories of haemolytic anaemia (intrinsic and extrinsic) with an example of each.
Expects: Acute haemorrhage is a cause of normocytic normochromic anaemia
Expects: Haemolytic anaemia — from red-cell haemolysis — is a second cause
Expects: Intrinsic (intracellular) causes: a haemoglobin abnormality, e.g. thalassaemia or sickle-cell anaemia
Expects: Extrinsic (extracellular) causes: mismatched blood-group transfusion, infection (e.g. malaria), drugs (e.g. sulphonamides), food (e.g. favism), or autoimmune disease
Concept: CON-HEM-CDF561308A4D25

## derived_from

## main_concept
CON-HEM-CDF561308A4D25

## concept_ids

## contextual_concept_ids

## topic
Anaemia and red-cell disorders

## subtopic
Haemolytic anaemia

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
7

## clinical_relevance
0.65

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Physiology > Anaemia

## question_only_for

## library_ids
ART-HEM-TOP-B697DE3AAD

## resource_ids
src_3e62e4d388493af88dbe

## learning_objective
Classify the causes of normocytic normochromic anaemia into acute haemorrhage and haemolytic anaemia, and split haemolytic causes into intrinsic (intracellular) and extrinsic (extracellular) categories with an example of each.

## source_citation
Alexandria University, AU-MED-103, "MCQs - Blood practical.pdf" (src_3e62e4d388493af88dbe), item 53 (p18), printed correct answer on the same page.

## media_recommendations

## attachments

## attached_image

## randomise_answers
no

## estimated_seconds
90

## author_notes
Printed as an open short-answer item ("Enter your answer") with its correct answer shown verbatim beneath, on an MS-Forms results-export page; transcribed as a structured-written item to preserve its open-answer form rather than inventing lettered distractors for it.

---

# Item

## id
QST-HEM-AU103-SPOT-Q8

## title
Practical Blood Spot 8 — bleeding time: normal value and platelet dependence

## question
State the normal value of bleeding time, name the blood element whose function it assesses, and state how a deficiency of that element affects the test's value.

## format
structured written

## subject
haem

## status
Draft

## owner
Admin team

## vignette

## written_parts
### (a) 2 marks
What is the normal value of bleeding time?
Expects: 2 to 5 minutes
Concept: CON-HEM-BDFE30E479F74A

### (b) 2 marks
Which blood element does bleeding time assess the function of?
Expects: Platelets

### (c) 2 marks
How does a deficiency of platelets affect the bleeding-time value?
Expects: Increases (prolongs) the bleeding time

## derived_from

## main_concept
CON-HEM-BDFE30E479F74A

## concept_ids

## contextual_concept_ids

## topic
Hemostasis and thrombosis

## subtopic
Bleeding disorders

## difficulty
Easy

## question_type
Investigation

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
6

## clinical_relevance
0.5

## academic_relevance
0.6

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Physiology > Laboratory tests: bleeding time, coagulation time, PT/aPTT/INR

## question_only_for

## library_ids
ART-HEM-HEMOSTASIS-TESTING

## resource_ids
src_4b9b0c4cf94fde15b14a

## learning_objective
State the normal value of bleeding time and explain that it assesses platelet-plug formation, prolonged when platelets are deficient.

## source_citation
Alexandria University, AU-MED-103, "MCQs - Practical Blood Questions" bank (src_4b9b0c4cf94fde15b14a), Physiology Spot 8, question p15, printed answer key p17.

## media_recommendations

## attachments

## attached_image

## randomise_answers
no

## estimated_seconds
60

## author_notes
Spot 8's own first sub-part ("what is the normal value of this test?") depends on an unavailable station image identifying the pictured apparatus; dropped rather than guessed, and the test is named directly (bleeding time) since the concept's own definition already establishes it independently of that image. The two remaining, image-independent sub-parts are exactly as printed.

---

# Item

## id
QST-HEM-AU103-SPOT-Q5-6

## title
Practical Blood Spot 5/6 — coagulation time: normal value and an acquired cause of prolongation

## question
State the normal value of coagulation time and name one acquired condition that can prolong it.

## format
structured written

## subject
haem

## status
Draft

## owner
Admin team

## vignette

## written_parts
### (a) 2 marks
What is the normal value of coagulation time?
Expects: 5 to 10 minutes
Concept: CON-HEM-78066FA5967B13

### (b) 2 marks
Mention one acquired condition that may cause a prolonged coagulation time.
Expects: Liver failure or vitamin K deficiency

## derived_from

## main_concept
CON-HEM-78066FA5967B13

## concept_ids

## contextual_concept_ids

## topic
Hemostasis and thrombosis

## subtopic
Coagulation cascade

## difficulty
Moderate

## question_type
Investigation

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
0.55

## academic_relevance
0.6

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Physiology > Laboratory tests: bleeding time, coagulation time, PT/aPTT/INR

## question_only_for

## library_ids
ART-HEM-HEMOSTASIS-TESTING

## resource_ids
src_4b9b0c4cf94fde15b14a

## learning_objective
State the normal value of coagulation time and name liver failure and vitamin K deficiency as acquired causes of its prolongation.

## source_citation
Alexandria University, AU-MED-103, "MCQs - Practical Blood Questions" bank (src_4b9b0c4cf94fde15b14a), Physiology Spot 6 (normal value, p14) and Spot 5 (acquired cause, p14), printed answer key p17.

## media_recommendations

## attachments

## attached_image

## randomise_answers
no

## estimated_seconds
75

## author_notes
Combines one sub-part each from two adjacent spot stations in the same bank (Spot 6's normal-value sub-part and Spot 5's acquired-cause sub-part), both testing this one concept. The hereditary-cause half of the concept (haemophilia) is already stated in the concept's own definition and is not re-tested here, since the printed spot bank only asks for an acquired cause.

---

# Item

## id
QST-HEM-AU103-SPOT-Q6-7

## title
Practical Blood Spot 6/7 — MCHC equation and the definition of MCV

## question
Write the equation used to calculate MCHC, and define MCV.

## format
structured written

## subject
haem

## status
Draft

## owner
Admin team

## vignette

## written_parts
### (a) 2 marks
Write the equation of MCHC.
Expects: MCHC = Haemoglobin ÷ Haematocrit × 100
Concept: CON-HEM-488777E982E1DB

### (b) 2 marks
Define MCV.
Expects: The average volume of a single red blood cell

## derived_from

## main_concept
CON-HEM-488777E982E1DB

## concept_ids

## contextual_concept_ids

## topic
Hematopoiesis and blood science

## subtopic
Laboratory foundations

## difficulty
Easy

## question_type
Investigation

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
6

## clinical_relevance
0.5

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Physiology > Reading the CBC

## question_only_for

## library_ids
ART-HEM-CBC-READING

## resource_ids
src_4b9b0c4cf94fde15b14a

## learning_objective
State the MCHC calculation and define MCV as the average single red-cell volume.

## source_citation
Alexandria University, AU-MED-103, "MCQs - Practical Blood Questions" bank (src_4b9b0c4cf94fde15b14a), Physiology Spot 6 (MCHC equation, p14) and Spot 7 (MCV definition, p15), printed answer key p17.

## media_recommendations

## attachments

## attached_image

## randomise_answers
no

## estimated_seconds
60

## author_notes
Spot 7's first two sub-parts ("mention the abnormality of the test", "give one reason for this condition") depend on an unavailable blood-film image and test a different concept (macrocytic anaemia from B12/folate deficiency, already authored separately as QST-HEM-AU103-FORMS-Q54); only its third, image-independent sub-part (define MCV) is used here, combined with Spot 6's MCHC sub-part.

---

# Item

## id
QST-HEM-AU103-SPOT-Q9

## title
Practical Blood Spot 9 — leukocytosis on a CBC

## question
A 40-year-old man presents with recurrent infections. A routine CBC points to a haematological abnormality. What CBC parameter indicates this, and what is its normal value?

## format
structured written

## subject
haem

## status
Draft

## owner
Admin team

## vignette

## written_parts
### (a) 3 marks
What parameter in the CBC indicates this condition?
Expects: The white-cell (leukocyte) count, raised — leukocytosis
Concept: CON-HEM-09BC500E55C1AA

### (b) 2 marks
What is the normal value of this parameter?
Expects: 4,000–10,000 cells/mm3

## derived_from

## main_concept
CON-HEM-09BC500E55C1AA

## concept_ids

## contextual_concept_ids

## topic
White-cell disorders

## subtopic
Benign leukocyte disorders

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## clinical_relevance
0.7

## academic_relevance
0.6

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Physiology > Reading the CBC

## question_only_for

## library_ids
ART-HEM-CBC-READING

## resource_ids
src_4b9b0c4cf94fde15b14a

## learning_objective
Identify a raised white-cell count (leukocytosis) as the CBC parameter suggesting recurrent infection, and state its normal range.

## source_citation
Alexandria University, AU-MED-103, "MCQs - Practical Blood Questions" bank (src_4b9b0c4cf94fde15b14a), Physiology Spot 9 (p16), printed answer key p18.

## media_recommendations

## attachments

## attached_image

## randomise_answers
no

## estimated_seconds
75

## author_notes
Vignette and both sub-parts transcribed as printed, with "a malignant condition" softened to "a haematological abnormality" in the stem — the printed key's own answer is simply leukocytosis (a raised white-cell count), not a malignancy diagnosis, and the concept's own pitfalls field already warns against over-reading a single raised CBC parameter as diagnostic of a specific disease.

---

# Item

## id
QST-HEM-AU103-SPOT-Q2

## title
Practical Blood Spot 2 — ESR: a physiological cause of rise, and congenital afibrinogenaemia's effect

## question
Name one physiological cause of a raised ESR in an adult female, and state what happens to the ESR in congenital afibrinogenaemia.

## format
structured written

## subject
haem

## status
Draft

## owner
Admin team

## vignette

## written_parts
### (a) 2 marks
Mention one physiological cause of increased ESR in an adult female.
Expects: Menses or pregnancy
Concept: CON-HEM-A708323F4E072A

### (b) 2 marks
In congenital afibrinogenaemia, what happens to the ESR value?
Expects: Decreases

## derived_from

## main_concept
CON-HEM-A708323F4E072A

## concept_ids

## contextual_concept_ids

## topic
Hematopoiesis and blood science

## subtopic
Laboratory foundations

## difficulty
Moderate

## question_type
Investigation

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
0.6

## academic_relevance
0.6

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Physiology > Reading the CBC

## question_only_for

## library_ids
ART-HEM-CBC-READING

## resource_ids
src_4b9b0c4cf94fde15b14a

## learning_objective
Name menses and pregnancy as physiological causes of a raised ESR, and state that congenital afibrinogenaemia lowers the ESR.

## source_citation
Alexandria University, AU-MED-103, "MCQs - Practical Blood Questions" bank (src_4b9b0c4cf94fde15b14a), Physiology Spot 2 (p12), printed answer key p17.

## media_recommendations

## attachments

## attached_image

## randomise_answers
no

## estimated_seconds
60

## author_notes
Spot 2's own first sub-part ("what is the ESR reading?") depends on an unavailable station image (an ESR-tube diagram); dropped rather than guessed. The two remaining, image-independent sub-parts are exactly as printed.
