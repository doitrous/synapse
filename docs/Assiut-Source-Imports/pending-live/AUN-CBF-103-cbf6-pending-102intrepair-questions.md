<!--
  AUN-CBF-103 -- All quizzes CBF .pdf, lane 6 (branch aun-cbf103-author6).
  This 1 row reuses one pending Kasr 102-INT concept (CON-FND-DEE7732AEC0F74
  DNA repair's four-step order -- docs/Kasr-Source-Imports/concept/
  102-INT-concepts.md, not yet mirrored to docs/import-ready/) rather than
  re-minting. Omar applies this batch only after: 1) the Kasr
  102-INT-concepts.md batch, 2) AUN-CBF-103-cbf6-pending-102intrepair-
  concept.md (the sparse +aun overlay). Import order: 1 then 2 then this
  file.

  Import: Admin > Bulk import -> question.
-->

# Item

## id
QST-AUNCBF103-CBF6PENDING102INTREPAIR-Q001

## title
Correct order of gene repair mechanism events

## question
Which of the following is the correct sequence of events in gene repair mechanisms in patients without a mutated repair process?

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
Nicking, sealing, recognition, excision, replacement

## explanation_a
Incorrect. Sealing (ligation) is the final step, not the second -- it cannot occur before the damaged segment has even been excised and replaced.

## answer_b
Nicking, recognition, excision, sealing, replacement

## explanation_b
Incorrect. This places nicking before recognition, but recognition of the lesion is what directs the endonuclease where to nick -- the lesion must be recognised first.

## answer_c
Recognition, nicking, excision, replacement, sealing

## explanation_c
Correct. DNA repair proceeds through recognition of the lesion, nicking of the damaged strand by an endonuclease at that site, excision of the damaged segment by an exonuclease, gap-filling replacement synthesis by a repair DNA polymerase, and finally ligation (sealing) by DNA ligase. Recognition and nicking are functionally linked (an endonuclease both recognises the lesion and makes the nick), but recognition logically precedes the cut, and replacement must fill the gap before ligase can seal it -- giving the order recognition, nicking, excision, replacement, sealing. Defects anywhere in this pathway cause genetic repair diseases such as xeroderma pigmentosum, whose hallmark is hypersensitivity to sunlight, increased skin cancer risk and premature skin ageing.

## answer_d
Sealing, recognition, nicking, excision, replacement

## explanation_d
Incorrect. Placing sealing (ligation) as the very first step is not possible -- ligation can only close a gap after the damaged DNA has already been excised and replaced.

## answer_e
Nicking, excision, replacement, sealing, recognition

## explanation_e
Incorrect. Placing recognition last does not fit the pathway -- the lesion must be recognised before an endonuclease can nick the strand at that site.

## topic
Molecular Biology of DNA Repair

## subtopic
DNA repair mechanism order

## main_concept
CON-FND-DEE7732AEC0F74

## concept_ids
CON-FND-DEE7732AEC0F74

## contextual_concept_ids

## difficulty
Hard

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
35

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AUN_Y1=moderate

## years
AUN_Y1

## universities
aun

## module
AUN-CBF-103

## module_subject
AUN-CBF-103 > Molecular Biology > DNA repair

## question_only_for

## library_ids
ART-102-BIO-DNA-REPAIR-MUTATIONS-AND-GENETIC-CODE-SUPPLEMENT

## resource_ids
src_f7e45bae9ce161e08d46

## learning_objective
Reconstruct the correct order of DNA repair pathway events: recognition, nicking, excision, replacement, sealing.

## source_citation
All quizzes CBF .pdf, 228

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
keySource: printed "The correct answer is: Recognition, nicking, excision, replacement, sealing" and marked-option glyph (bullet + checkmark) both on option C, p228-229.
pendingConcept: CON-FND-DEE7732AEC0F74 is pending in docs/Kasr-Source-Imports/concept/102-INT-concepts.md; this question and its +aun overlay apply only after Omar imports that Kasr batch.
