<!--
  MU-MED104 (Musculoskeletal) - lane-2 authored batch: two questions whose
  main concept is already LIVE in server/data/medical-library-v1.json
  (CON-MSK-594BD65D8C0D7A, adductor-canal anterior relations; CON-END-1DE2C490ABBA64,
  renal 1-alpha-hydroxylase). Per the concept-id overlay rule (00-START-HERE.md)
  a hit in live state gets a sparse update only - the two matching sparse
  overlay records (+mu/+MU_Y1/+MU-MED104) are in concept/MU-MED104-concepts.md
  itself, not a pending-live file, since the concepts are already live.
  
  Apply after concept/MU-MED104-concepts.md lands (for the sparse tag update).
  
  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-MUMED104-FINAL41-Q08

## title
Structure spared by an adductor canal infection

## question
Following surgery, a female patient had an infection in the adductor canal, damaging the enclosed structures. Which of the following structures remains intact?

## subject
msk

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Femoral artery

## explanation_a
Incorrect. The femoral artery (continuing as the popliteal artery beyond the canal) is one of the principal structures the adductor canal encloses along its whole length, running deep to the sartorius/roof and posterior to adductor longus and adductor magnus, so an infection damaging the canal's contents would directly threaten it, not spare it.

## answer_b
Femoral vein

## explanation_b
Incorrect. The femoral vein travels alongside the femoral artery within the adductor canal (initially lateral to it, crossing to lie posterior and then medial toward the canal's lower end), so it too is an enclosed structure at risk from an infection inside the canal, not a structure that would be spared.

## answer_c
Saphenous nerve

## explanation_c
Incorrect. The saphenous nerve runs within the adductor canal alongside the femoral vessels before piercing the roof to become superficial near the knee, so for most of its course it is one of the canal's own contents and would be exposed to an infection damaging those enclosed structures.

## answer_d
Great saphenous vein

## explanation_d
Correct. The great saphenous vein is a superficial vein that runs in the subcutaneous tissue of the thigh, outside the adductor canal altogether — it is not one of the canal's contents (which are the femoral artery, femoral vein, saphenous nerve and the nerve to vastus medialis). Because an infection confined to the canal damages only the structures enclosed within it, the great saphenous vein, lying superficial to and separate from the canal, is the one structure that would remain intact.

## answer_e
Nerve to the vastus medialis

## explanation_e
Incorrect. The nerve to vastus medialis travels within the adductor canal together with the femoral vessels and the saphenous nerve before it leaves to supply the muscle, so it is one of the canal's enclosed contents and would be at risk from an infection there, not spared by it.

## topic
Lower limb

## subtopic
Adductor canal contents

## main_concept
CON-MSK-594BD65D8C0D7A

## concept_ids
CON-MSK-594BD65D8C0D7A

## contextual_concept_ids

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

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 07 EOY Exams > Final 41 > Anatomy

## question_only_for

## library_ids
ART-MSK-TOP-BD3D529647

## resource_ids

## learning_objective
Name the femoral artery, femoral vein, saphenous nerve and nerve to vastus medialis as the adductor canal's contents, and recognise the great saphenous vein as a superficial structure outside the canal.

## source_citation
00 Module-wide/07 EOY Exams/Final 41.pdf, Q8 (Menoufia MED104 EOY exam, Anatomy section, lower limb)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: grey-highlight, read from rendered page image, Final 41.pdf p1, Q8
mu: Final 41.pdf, Q8, Anatomy section — the 'Make Watermark' phone-photo scan that defeats default OCR (coverage/MU-MED104-triage.md)

---

# Item

## id
QST-MUMED104-MSK2G1-Q02

## title
Enzyme defect behind vitamin D deficiency in chronic renal disease

## question
Vitamin D deficiency is seen in patients with chronic renal disease due to defect in which one of the following:

## subject
endo

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Alkaline phosphatase enzyme

## explanation_a
Incorrect. Alkaline phosphatase is a marker of osteoblastic bone activity (and rises in conditions of increased bone turnover), not the renal enzyme that activates vitamin D; a defect in it is not what chronic kidney disease produces, and it plays no part in the 25-hydroxyvitamin D to 1,25-dihydroxyvitamin D conversion this question concerns.

## answer_b
Alpha 1 hydroxylase enzyme

## explanation_b
Correct. The kidney performs the second, rate-limiting activation step of vitamin D: renal 1-alpha-hydroxylase converts 25-hydroxyvitamin D3 (calcidiol, made in the liver) to the biologically active 1,25-dihydroxyvitamin D3 (calcitriol), a reaction that parathyroid hormone stimulates and that also responds to falling serum phosphate. In chronic renal disease, loss of functioning renal tissue impairs this 1-alpha-hydroxylase step specifically, so calcitriol production falls even when the liver's earlier 25-hydroxylation step is intact, producing the vitamin D deficiency (and downstream secondary hyperparathyroidism and renal osteodystrophy) seen in these patients.

## answer_c
Creatine kinase enzyme

## explanation_c
Incorrect. Creatine kinase is a muscle enzyme used to detect muscle injury (for example in myocardial infarction or rhabdomyolysis), with no role in vitamin D activation; its levels are not what links chronic kidney disease to vitamin D deficiency.

## answer_d
Elastase enzyme

## explanation_d
Incorrect. Elastase is a proteolytic enzyme (for example released by neutrophils, or produced by the exocrine pancreas) with no role in the vitamin D activation pathway; a defect in it does not explain vitamin D deficiency in renal disease.

## answer_e
25 hydroxylase enzyme

## explanation_e
Incorrect. 25-hydroxylase performs the first activation step, converting cholecalciferol to 25-hydroxyvitamin D3 in the liver, not the kidney — this step is a hepatic, not a renal, enzyme, so it is not the one impaired by chronic kidney disease, which instead affects the kidney's own second-step enzyme, 1-alpha-hydroxylase.

## topic
Calcium and vitamin D physiology

## subtopic
Renal activation of vitamin D

## main_concept
CON-END-1DE2C490ABBA64

## concept_ids
CON-END-1DE2C490ABBA64

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
5

## clinical_relevance
0.8

## academic_relevance
0.2

## exam_weight_by_year

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK2 Endmodule Group 1 > Physiology

## question_only_for

## library_ids
ART-END-TOP-F922FFBF75

## resource_ids

## learning_objective
Explain vitamin D deficiency in chronic renal disease as a defect of renal 1-alpha-hydroxylase, the enzyme that activates 25-hydroxyvitamin D3 to calcitriol.

## source_citation
MSK2 endmodule exam group 1 - model answer.pdf, Q2 (Menoufia MED104 MSK2 end-module exam, Physiology section)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: underline, read from cached native text, MSK2 endmodule exam group 1- model answer.pdf p1, Q2
mu: MSK2 endmodule exam group 1- model answer.pdf, Q2, Physiology section
