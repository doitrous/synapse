<!--
  103 BMS · Biochemistry · Vitamins — 44 single-best-answer MCQs.

  Source: the Kasr Al Ainy Biochemistry department question book
  `DPT BOOK MCQ D book bio 102&103 mcq (1).pdf`, manifest src_07f0a0ff41addf826c7f,
  chapter (11) VITAMINS, PDF pages 146-151 (printed 139-144), printed questions 1-46.
  Extracted by the 102 INT lane into scripts/kasr/extract/103-BMS/mcq-bank.json and
  tagged as taught by 103 BMS; this lane did not re-read the book to extract, only to
  verify the answer key and to repair three run-on options.

  FORTY-SIX RECORDS FOR FORTY-FOUR BANK ITEMS. Printed questions 13 and 22 are
  absent from the bank: the extraction ran each of them into the option D of the
  question before it, so the OCR lost a whole printed question twice. Both were
  recovered by opening PDF pages 147 and 148 with the Read tool, both are authored
  here as their own records with their own printed numbers and their own keys
  (13 = Vitamin D, 22 = Vitamin C / Iron), and the host items 12 and 21 have had
  the run-on trimmed. Their IDs are minted on the same deterministic scheme as
  every other item, from their own real printed numbers, so a repaired upstream
  extraction mints the same ID rather than a duplicate. Reconciled: 44 bank items,
  46 records, 0 bank items unauthored, 0 duplicate question IDs.

  Every answer is the book's own printed key on PDF page 152 (printed page 145),
  which was opened with the Read tool and read visually. It agrees with the letter
  the 102 lane recorded for all 42 items that carried one, and it supplied the two
  the bank left null (printed questions 2 and 10). No answer here was inferred.

  Concepts: every item points at a concept that already exists. Nothing was minted.
    CON-FND-46B9F239340ED9  fat-soluble vitamins, each matched to reaction and deficiency
    CON-FND-C9E5128193029E  water-soluble vitamins as coenzymes, and the reaction each runs
    CON-FND-1A4A49607783A9  folate antagonists (co-assessed by printed question 44)
  All three are taught by ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS, which is the
  library_ids entry on every item. CON-NEU-C5F79F69D989D4, a live retinal-physiology
  record, is tagged contextual on the three visual-cycle items and deliberately not
  merged: it belongs to the retina, these belong to the vitamin.

  Import: Admin > Bulk import > question. status: Draft throughout; these need a
  faculty reviewer.
-->

# Item

## id
QM-103-AAADAED10B9C

## title
Which of the following is a fat-soluble vitamin?

## question
Which of the following is a fat-soluble vitamin?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is sorting the vitamins into two groups before revising their deficiency states, because the two groups differ in how they are absorbed, transported, stored and lost.

## format
single best answer

## derived_from
Question 1 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q1 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Vitamin B

## explanation_a
The B complex is water soluble. This option catches the student who has learned that vitamins A, D, E and K are fat soluble but has never checked what that leaves, and who then assumes any vitamin whose deficiency takes a long time to appear must be fat soluble.

## answer_b
Vitamin C

## explanation_b
Vitamin C is water soluble, absorbed directly into the blood, not stored, and its excess is excreted in urine — which is exactly why scurvy appears rapidly, while a fat-soluble deficiency appears late, only when the stores are depleted.

## answer_c
Vitamin B12

## explanation_c
It is the most tempting wrong answer. Vitamin B12 is the one water-soluble vitamin that is stored — in the liver — so a student who uses "is it stored?" as the test for fat solubility picks this. Storage is a property B12 shares with the fat-soluble group; solubility is not.

## answer_d
Vitamin K

## explanation_d
The fat-soluble vitamins are A, D, E and K. They are absorbed with dietary fat in chylomicrons, need a carrier protein in blood, and are stored in liver and adipose tissue. Those three facts explain the rest of their behaviour: their deficiency appears late, only once stores are depleted, and their toxicity risk is higher, because an excess cannot simply be excreted in urine. The water-soluble group — C and the B complex — is absorbed directly into the blood, needs no carrier, is not stored except for folate and B12, and is lost in urine, so its deficiency appears quickly. Hold the list as A, D, E, K, and hold the reason with it.

## topic
Vitamins

## subtopic
Classification of vitamins

## main_concept
CON-FND-46B9F239340ED9

## concept_ids
CON-FND-C9E5128193029E

## contextual_concept_ids


## difficulty
Easy

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
82

## exam_relevance
8

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Name the four fat-soluble vitamins and give the absorption, storage and deficiency consequences that follow from their solubility.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 146 (printed page 139), printed question 1; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q1 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: option C was extracted as "Vitamin By". PDF page 146 was opened with the Read tool and the printed option is "Vitamin B12"; the subscript 12 had been read as a letter. Repaired.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-620F5389FE51

## title
Which of the following vitamins functions as a visual pigment?

## question
Which of the following vitamins functions as a visual pigment?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked which vitamin is physically built into the pigment that absorbs light in the retina, rather than which vitamin merely supports vision.

## format
single best answer

## derived_from
Question 2 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q2 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Thiamine

## explanation_a
Thiamine is vitamin B1, and its coenzyme thiamine pyrophosphate runs oxidative decarboxylation and transketolase. Its deficiency does affect the nervous system, which is why students reach for it on any question mentioning nerves or the eye, but it is nowhere in the visual pigment.

## answer_b
Retinal

## explanation_b
Retinal is the aldehyde form of vitamin A, and it is a component of the visual pigments of the rod and cone cells of the retina. In the rods, 11-cis-retinal is bound to the protein opsin, and that complex is rhodopsin. When light hits rhodopsin the 11-cis-retinal is converted to all-trans-retinal by a series of photochemical reactions, and this triggers a nerve impulse. Note the wording: retinal is not merely required for vision, it is part of the pigment itself. The three active forms of vitamin A are retinol (a primary alcohol), retinal (its aldehyde) and retinoic acid; it is the aldehyde that does the visual work.

## answer_c
Riboflavin

## explanation_c
Riboflavin is vitamin B2 and it does contain a flavin ring which is coloured and light sensitive — infants under phototherapy can become deficient because UV breaks the ring. That is light destroying the vitamin, not the vitamin detecting light, and it is the confusion this option catches.

## answer_d
Folic acid

## explanation_d
Folic acid carries one-carbon units for nucleic acid synthesis. It has no role in the retina, and it is offered here because a student who has not learned the vitamin A forms may pick any unfamiliar name.

## topic
Vitamins

## subtopic
Role of vitamin A in vision

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids
CON-NEU-C5F79F69D989D4

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
1

## inferred_difficulty
68

## exam_relevance
8

## clinical_relevance
0.6

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin A (Retinol, Antixerophthalmia)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Identify retinal as the form of vitamin A that is built into rhodopsin, and distinguish it from retinol and retinoic acid.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 146 (printed page 139), printed question 2; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q2 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152) read differently by different OCR passes (a/b)".
The bank carried correct: null for this item. The printed answer key on PDF page 152 (printed page 145) was opened with the Read tool and read visually; it names this letter. The answer was not inferred.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
CON-NEU-C5F79F69D989D4 ("11-cis retinol is converted into 11-cis retinal") is a live retinal-physiology record. It is tagged contextual, not assessed: this item tests the vitamin-A identity of the pigment, not that particular interconversion step. It is deliberately not merged with the vitamins concepts — the neurophysiology record belongs to the retina, this one to the vitamin.

---

# Item

## id
QM-103-5E07A588D688

## title
Which vitamin is required for vision in dim light?

## question
Which vitamin is required for vision in dim light?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A patient says that since the sun set he cannot see well enough to walk home, though his vision is normal by day.

## format
single best answer

## derived_from
Question 3 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q3 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Vitamin A

## explanation_a
Dim-light vision is rod vision, and the rods contain rhodopsin, which is 11-cis-retinal bound to opsin. Retinal is a form of vitamin A, so without enough vitamin A the rods cannot rebuild rhodopsin. Bright light depletes the rhodopsin stores in the rods; when a person moves suddenly into a dim area there is difficulty seeing until rhodopsin is resynthesised, and that interval is the dark adaptation time. It is prolonged in vitamin A deficiency, which is why measuring it was used for early assessment of that deficiency, and why the earliest deficiency symptom is night blindness rather than daytime blindness. Cone vision, which is colour day vision, uses similar reactions but fails later.

## answer_b
Vitamin D

## explanation_b
Vitamin D maintains plasma calcium and bone mineralisation. It is picked by students who remember that both A and D are fat soluble and stored in the liver and then stop distinguishing them by function.

## answer_c
Vitamin E

## explanation_c
Vitamin E is the major fat-soluble antioxidant of tissues. Vitamin A also has a minor antioxidant action, and that shared property is the reason this distractor works — but trapping free radicals is not what happens in the rod.

## answer_d
Vitamin K

## explanation_d
Vitamin K carboxylates glutamate residues in the clotting factors. It has no ocular function; its newborn deficiency causes intracranial haemorrhage, which is a bleed, not a visual defect.

## topic
Vitamins

## subtopic
Role of vitamin A in vision

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
85

## exam_relevance
9

## clinical_relevance
0.75

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin A (Retinol, Antixerophthalmia)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Link vitamin A to rod vision through rhodopsin, and explain why night blindness and a prolonged dark adaptation time are the earliest signs of its deficiency.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 146 (printed page 139), printed question 3; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q3 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-1F0A137CA902

## title
Which of these is a vitamin A precursor?

## question
Which of these is a vitamin A precursor?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A vegetarian patient eats no liver, fish liver oil, egg yolk or butter, yet has no sign of vitamin A deficiency. His diet is rich in carrots, tomatoes and green leafy vegetables.

## format
single best answer

## derived_from
Question 4 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q4 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Cobalamin

## explanation_a
Cobalamin is vitamin B12, a corrin ring built around a cobalt atom. It is a vitamin in its own right, not a precursor of another one, and it is offered because a student who knows only that it is "the complicated one" may assume it is upstream of something.

## answer_b
Pyridoxine

## explanation_b
Pyridoxine is vitamin B6, whose active form is pyridoxal phosphate. Naming a vitamin and its own active form is not the same as naming a precursor of a different vitamin, and that is the distinction this option tests.

## answer_c
Beta-Carotene

## explanation_c
The carotenoids are yellow plant pigments, and those carrying a β-ionone ring are precursors of vitamin A — provitamin A. β-carotene is the most important because it has two β-ionone rings and so yields two molecules of vitamin A when split by the intestinal carotenase, a dioxygenase; α- and γ-carotene have only one ring each and yield only one molecule. The retinal produced is then reduced to retinol by retinal reductase. This is why plant sources — carrots, tomatoes, green leafy vegetables, apricots — supply vitamin A activity even though the vitamin itself is found mainly in animal sources such as fish liver oil, liver, egg yolk, butter and whole milk.

## answer_d
Thiamine

## explanation_d
Thiamine is vitamin B1 and is converted to thiamine pyrophosphate, its own coenzyme form. Like option B, this catches a student conflating "activated to its coenzyme" with "precursor of another vitamin".

## topic
Vitamins

## subtopic
Provitamin A (carotenoids)

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
1

## inferred_difficulty
68

## exam_relevance
7

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin A (Retinol, Antixerophthalmia)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Name β-carotene as provitamin A and explain why it yields twice as much vitamin A as α- or γ-carotene.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 146 (printed page 139), printed question 4; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q4 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-9EF2B059E9C0

## title
Retinal is a component of

## question
Retinal is a component of

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked to name the molecule that retinal is physically bound into inside a rod cell.

## format
single best answer

## derived_from
Question 5 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q5 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Sphingosine

## explanation_a
Sphingosine is the amino alcohol backbone of the sphingolipids. It belongs to lipid chemistry, and it is offered because both it and retinal are long, mostly hydrocarbon molecules — a similarity of shape, not of function.

## answer_b
Rhodopsin

## explanation_b
Rhodopsin is the visual pigment of the rod cells and it is 11-cis-retinal bound to the protein opsin. Light converts the 11-cis-retinal to all-trans-retinal through a series of photochemical reactions, opsin separates, and a nerve impulse is triggered. The all-trans form is then returned to the 11-cis form by an isomerase, and retinal reductase interconverts the retinal and retinol forms, so the pigment can be rebuilt. Holding rhodopsin as "11-cis-retinal + opsin" makes both the mechanism of vision and the reason for night blindness follow without further memorising.

## answer_c
Cardiolipin

## explanation_c
Cardiolipin is a phospholipid of the inner mitochondrial membrane. It is chosen by students who recognise it as a specialised lipid with a specific location and generalise that retinal must also sit in a membrane lipid rather than in a protein complex.

## answer_d
Glycoproteins

## explanation_d
For an instructive reason: vitamin A does promote the synthesis of glycoproteins in mucous membranes and induces synthesis of the glycoproteins of connective tissue matrix. So vitamin A acts on glycoproteins — it is not a component of one. This option catches the student who confuses a function of the vitamin with its structural home.

## topic
Vitamins

## subtopic
Role of vitamin A in vision

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids
CON-NEU-C5F79F69D989D4

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
1

## inferred_difficulty
68

## exam_relevance
8

## clinical_relevance
0.55

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin A (Retinol, Antixerophthalmia)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
State that rhodopsin is 11-cis-retinal bound to opsin, and separate that structural role from vitamin A’s effects on glycoprotein synthesis.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 146 (printed page 139), printed question 5; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q5 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
CON-NEU-C5F79F69D989D4 is tagged contextual for the same reason as item 2, and is deliberately not merged.

---

# Item

## id
QM-103-27B466BA1AF4

## title
Xerophthalmia in man is caused by deficiency of

## question
Xerophthalmia in man is caused by deficiency of

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A child’s conjunctiva is dry, thick and wrinkled and has lost its transparency. Tear production is reduced.

## format
single best answer

## derived_from
Question 6 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q6 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Vitamin C

## explanation_a
Vitamin C deficiency is scurvy: defective collagen gives fragile capillaries, swollen spongy bleeding gums, petechial haemorrhages on the legs and buttocks, delayed wound healing and loose teeth. The eye is not the target organ, and the mistake this catches is treating any mucosal or connective-tissue sign as scurvy.

## answer_b
Vitamin K

## explanation_b
Vitamin K deficiency presents as bleeding — bleeding gums and nose, easy bruising, post-traumatic and internal haemorrhage, and a prolonged prothrombin time. A bleeding eye is not a dry one.

## answer_c
Vitamin A

## explanation_c
Xerophthalmia is the eye manifestation of vitamin A deficiency in which the conjunctiva becomes dry, thick and wrinkled and loses its transparency, because the lacrimal gland keratinises and tear production falls; corneal opacity may follow. The name of the vitamin records this: vitamin A is the antixerophthalmia vitamin. The ocular manifestations run in order — night blindness first, from failure to rebuild rhodopsin, then xerophthalmia, then corneal opacity — and they sit alongside hyperkeratinisation of skin and mucous membranes, delayed growth of bones and eruption of teeth, and an increased risk of cancer.

## answer_d
Vitamin D

## explanation_d
Vitamin D deficiency gives rickets in children and osteomalacia in adults. It is picked because both A and D deficiency can affect a growing child, but the target tissue is bone, not the conjunctiva.

## topic
Vitamins

## subtopic
Vitamin A deficiency

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Diagnosis

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
2

## inferred_difficulty
80

## exam_relevance
8

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin A (Retinol, Antixerophthalmia)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Recognise xerophthalmia as a manifestation of vitamin A deficiency and place it in the order of ocular signs.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 146 (printed page 139), printed question 6; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q6 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-0448DF0A15D9

## title
On exposure to light rhodopsin forms:

## question
On exposure to light rhodopsin forms:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is tracing what happens inside a rod at the instant a photon is absorbed.

## format
single best answer

## derived_from
Question 7 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q7 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
All trans-retinal

## explanation_a
Light converts the 11-cis-retinal of rhodopsin to all-trans-retinal by a series of photochemical reactions, and it is this conversion that triggers the nerve impulse. The direction is what matters: 11-cis is the form bound in the resting pigment, all-trans is what light produces. The cycle then runs back — an isomerase returns all-trans to 11-cis, and retinal reductase interconverts the retinal and retinol forms at either end — so rhodopsin can be regenerated, which is the dark adaptation the eye needs after bright light.

## answer_b
Cis-retinal

## explanation_b
It is the direction error the question exists to catch. Cis-retinal is what rhodopsin contains before the light arrives, not what light makes from it. A student who has learned the two isomers but not which way the photon drives the reaction picks this.

## answer_c
Retinol

## explanation_c
Retinol is the alcohol form. It appears later in the cycle, when retinal reductase reduces retinal, and it is a storage and transport form rather than the immediate photoproduct.

## answer_d
Retinoic acid

## explanation_d
Retinoic acid is formed by oxidation of retinal and acts on gene transcription through nuclear retinoic acid receptors. It regulates cell growth and differentiation and cannot be reduced back to retinal, so it takes no part in the visual cycle at all.

## topic
Vitamins

## subtopic
Role of vitamin A in vision

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids
CON-NEU-C5F79F69D989D4

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
62

## exam_relevance
8

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin A (Retinol, Antixerophthalmia)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
State the direction of the light-driven isomerisation in rhodopsin, and place retinol and retinoic acid correctly outside it.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 146 (printed page 139), printed question 7; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p146-q7 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
CON-NEU-C5F79F69D989D4 is tagged contextual: it asserts the retinol-to-retinal step, not the light-driven cis-to-trans isomerisation this item tests. Recorded as a near-miss, deliberately not merged.

---

# Item

## id
QM-103-A44C43CFEE54

## title
Dietary deficiency of this vitamin leads to night blindness:

## question
Dietary deficiency of this vitamin leads to night blindness:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A patient reports difficulty seeing after dusk. He is asked what he eats; his diet contains no liver, fish liver oil, egg yolk, butter or coloured vegetables.

## format
single best answer

## derived_from
Question 8 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q8 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Retinol

## explanation_a
Retinol is vitamin A. Night blindness, or nyctalopia, is the earliest ocular manifestation of its deficiency, and the mechanism is a prolonged dark adaptation time: bright light depletes rhodopsin from the rods, and with too little vitamin A the pigment cannot be resynthesised quickly. Note that the question names the vitamin by its chemical form rather than by letter — the four options here are retinol, niacin, ascorbic acid and cholecalciferol, which is a habit of this book and is worth practising, because the exam does the same.

## answer_b
Niacin

## explanation_b
Niacin is vitamin B3, and its deficiency is pellagra — the three Ds of dermatitis, diarrhoea and dementia. The dementia includes poor memory and confusion, not a visual defect.

## answer_c
Ascorbic acid

## explanation_c
Ascorbic acid is vitamin C and its deficiency is scurvy. This option catches a student who knows a vitamin deficiency is being tested but is matching on familiarity rather than on the chemical name.

## answer_d
Cholecalciferol

## explanation_d
Cholecalciferol is vitamin D3, the animal form made in skin from 7-dehydrocholesterol on exposure to sunlight. Its deficiency gives rickets or osteomalacia. Because both D and A are fat soluble and stored in the liver, this is the commonest wrong choice on any vitamin A question.

## topic
Vitamins

## subtopic
Vitamin A deficiency

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin A (Retinol, Antixerophthalmia)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Recognise the chemical names of the fat-soluble vitamins and match night blindness to retinol.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 147 (printed page 140), printed question 8; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q8 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-FD1B3E787597

## title
Calcitriol is:

## question
Calcitriol is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked to name the fully active form of vitamin D by its chemistry, not by its trade name.

## format
single best answer

## derived_from
Question 9 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q9 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
1-OH-cholecalciferol

## explanation_a
A single hydroxyl at position 1 is not an intermediate the body makes: the first hydroxylation is at carbon 25, in the liver, and only then does the kidney add the 1-hydroxyl. The order is not interchangeable, and that is what this option tests.

## answer_b
25-OH-cholecalciferol

## explanation_b
It is the most valuable distractor here. 25-OH-cholecalciferol is calcidiol, which is the major circulating and storage form of vitamin D — so it is the form measured in blood to assess vitamin D status. Being the form you measure is not the same as being the form that acts.

## answer_c
24, 25-diOH cholecalciferol

## explanation_c
The 24-hydroxylase in the kidney produces 1,24,25-(OH)3-D3, and that pathway is inactivation, not activation. Calcitriol itself inhibits 1-hydroxylase and activates 24-hydroxylase, so this is how the body switches its own vitamin D off.

## answer_d
1, 25-diOH cholecalciferol

## explanation_d
Calcitriol is 1,25-dihydroxycholecalciferol, the active form of vitamin D3. Cholecalciferol is not biologically active until it is hydroxylated twice: first at C25 by 25-hydroxylase in the liver microsomes, giving calcidiol, then at C1 by 1-hydroxylase in the kidney, giving calcitriol. Low plasma calcium raises parathyroid hormone, which activates the renal 1-hydroxylase and inhibits the 24-hydroxylase, so the pathway is pushed towards the active form exactly when calcium is needed. Keep three names apart: cholecalciferol is the parent, calcidiol the store, calcitriol the hormone.

## topic
Vitamins

## subtopic
Activation of vitamin D3

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
48

## exam_relevance
9

## clinical_relevance
0.8

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin D (Calciferol, Antirachitic Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Name calcitriol as 1,25-dihydroxycholecalciferol and distinguish it from calcidiol and from the 24-hydroxylated inactivation product.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 147 (printed page 140), printed question 9; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q9 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-0485ACA4986E

## title
1-hydroxylation of 25-OH vitamin D3 takes place in the:

## question
1-hydroxylation of 25-OH vitamin D3 takes place in the:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A patient with chronic renal disease has a normal 25-OH vitamin D level but a low calcitriol level and a low plasma calcium.

## format
single best answer

## derived_from
Question 10 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q10 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Liver

## explanation_a
This is the half-remembered answer the question is built to catch. The liver performs the first hydroxylation, at carbon 25, in its microsomes, using 25-hydroxylase. A student who recalls only that "the liver hydroxylates vitamin D" answers this and cannot then explain why renal failure causes a calcitriol deficiency.

## answer_b
Kidneys

## explanation_b
The second hydroxylation, at carbon 1, occurs in the kidney and is catalysed by 1-hydroxylase, converting calcidiol to calcitriol, the active form. The kidney also holds the off-switch, the 24-hydroxylase that inactivates the vitamin. This is why chronic renal disease produces ineffective vitamin D even when intake and sun exposure are adequate, and why a genetic defect of 1-hydroxylase produces the same picture. Parathyroid hormone, released when plasma calcium falls, is what turns the renal 1-hydroxylase up.

## answer_c
Intestine

## explanation_c
The intestine is where calcitriol acts, not where it is made: calcitriol enters the intestinal cell, binds a cytosolic receptor, and the complex moves to the nucleus to induce the calcium-binding protein calbindin. Confusing the site of action with the site of activation is a common way to lose this mark.

## answer_d
Pancreas

## explanation_d
The pancreas has no role in vitamin D activation. Vitamin D does have a non-calcaemic effect on insulin secretion and sensitivity, which is presumably why the organ is offered, but that is an effect of the finished hormone.

## topic
Vitamins

## subtopic
Activation of vitamin D3

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
3

## inferred_difficulty
48

## exam_relevance
9

## clinical_relevance
0.85

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin D (Calciferol, Antirachitic Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
State that the 1-hydroxylation of vitamin D occurs in the kidney, and explain why renal disease causes ineffective vitamin D.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 147 (printed page 140), printed question 10; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q10 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "none".
The bank carried correct: null for this item. The printed answer key on PDF page 152 (printed page 145) was opened with the Read tool and read visually; it names this letter. The answer was not inferred.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-87AF9D4818CB

## title
Osteomalacia in adults is caused due to deficiency of:

## question
Osteomalacia in adults is caused due to deficiency of:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A woman who has had several pregnancies complains of bone aches and pains and has sustained a fracture after minor trauma.

## format
single best answer

## derived_from
Question 11 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q11 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Vitamin A

## explanation_a
Vitamin A deficiency delays the growth of bones and the eruption of teeth, so it does touch the skeleton — but through growth, in children, and alongside night blindness and xerophthalmia rather than as isolated adult bone pain.

## answer_b
Vitamin D

## explanation_b
Vitamin D deficiency gives rickets in children and osteomalacia in adults, and both are failures of bone mineralisation rather than of bone formation. Osteomalacia occurs mostly in females, especially after repeated pregnancies; bone aches and pains are common and patients fracture after minor trauma. The causes divide into deficiency of the vitamin — too little sunlight, inadequate intake, defective absorption in obstructive jaundice, steatorrhoea or a high dietary phytate — and ineffective vitamin, meaning defective activation in chronic liver or renal disease, or a genetic defect of 1-hydroxylase or of the calcitriol receptor.

## answer_c
Vitamin E

## explanation_c
Vitamin E deficiency causes haemolytic anaemia, mainly in premature infants, and neuromuscular manifestations from free-radical tissue damage. It does not demineralise bone.

## answer_d
Vitamin C

## explanation_d
Worth separating carefully, because vitamin C deficiency does affect bone: defective collagen gives fractures, dislocations, bone tenderness and delayed eruption of teeth. But in scurvy the defect is in the collagen matrix, with bleeding gums and petechiae alongside it; in osteomalacia the matrix is laid down and simply not mineralised.

## topic
Vitamins

## subtopic
Vitamin D deficiency

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
8

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin D (Calciferol, Antirachitic Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Match osteomalacia to vitamin D deficiency in adults and separate it from the bone changes of vitamin C deficiency.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 147 (printed page 140), printed question 11; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q11 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-CE78CB758D02

## title
In children, a severe deficiency of vitamin D causes:

## question
In children, a severe deficiency of vitamin D causes:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A toddler has an enlarged head with delayed closure of the fontanelles, a protruding sternum, beading at the costochondral junctions and bowing of the legs.

## format
single best answer

## derived_from
Question 12 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q12 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Osteoporosis

## explanation_a
Osteoporosis is a loss of bone mass in which what remains is normally mineralised. Rickets is the opposite arrangement — matrix is present but not mineralised — and this option catches the student who treats every soft or fragile bone as one disease.

## answer_b
Osteomalacia

## explanation_b
It is the intended trap. Osteomalacia is the same biochemical failure in the adult skeleton, where the growth plates have closed, so there are no bony deformities of growth, only bone pain and fractures. Age is what separates the two names, and the question says "in children".

## answer_c
Rickets

## explanation_c
Rickets is severe vitamin D deficiency in the child: mineralisation of bone is insufficient, bones become soft and pliable, and growth is markedly affected. The classical features are deformities — an enlarged head with delayed closure of the fontanelles, a protruding sternum (pigeon chest) with rosary beading at the costochondral junctions, kyphosis or scoliosis, a contracted pelvis, and enlarged osteochondral junctions with bow or knock knees. The biochemistry runs alongside: calcium is normal early, held up by increased parathyroid hormone mobilising it from bone, and falls later; phosphate is low, from both the deficiency and the PTH-driven renal loss; alkaline phosphatase rises markedly and early, from osteoblasts trying to lay down matrix, which makes it the early marker; and calcitriol is low.

## answer_d
Osteogenesis imperfecta

## explanation_d
Osteogenesis imperfecta is an inherited defect of collagen, not a nutritional deficiency. It is offered because it also presents with fragile deformed bones in a child, and the discriminator is that no dietary or sunlight history will explain it.

## topic
Vitamins

## subtopic
Vitamin D deficiency

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Diagnosis

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
81

## exam_relevance
9

## clinical_relevance
0.9

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin D (Calciferol, Antirachitic Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Name rickets as childhood vitamin D deficiency, give its classical deformities, and state the biochemical changes including the early rise in alkaline phosphatase.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 147 (printed page 140), printed question 12; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q12 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction ran the next printed question into option D, which arrived as "Osteogenesis imperfecta LSisewocunsices is a steroid vitamin. a) Vitamin C b) Vitamin D" plus a spurious fifth option. PDF page 147 was opened with the Read tool: option D is printed as "Osteogenesis imperfecta" and ends there, and the trailing text is printed question 13, a separate item. Option D trimmed; the item has four options, as printed.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-785A4BA238A2

## title
Which vitamin is required for calcium absorption from the small intestine?

## question
Which vitamin is required for calcium absorption from the small intestine?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked which vitamin, acting through a nuclear receptor, induces a calcium-binding protein in the intestinal mucosal cell.

## format
single best answer

## derived_from
Question 14 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q14 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Vitamin A

## explanation_a
Vitamin A works on gene transcription too — all-trans-retinoic acid binds nuclear retinoic acid receptors and up- or down-regulates target genes — so the mechanism sounds familiar. The genes are not the calcium-handling ones.

## answer_b
Vitamin D

## explanation_b
Calcitriol increases the absorption of calcium by the intestine, with phosphate absorption following it. The mechanism is genomic: calcitriol enters the intestinal cell, binds a cytosolic receptor, and the calcitriol-receptor complex moves to the nucleus and interacts with DNA to express the genes coding for a specific calcium-binding protein, calbindin. Calcitriol also increases the reabsorption of calcium and phosphate by the renal tubules, minimising their loss, and promotes bone mineralisation by ensuring both ions are available. Those are its calcaemic, or skeletal, functions, and they are its main ones.

## answer_c
Vitamin E

## explanation_c
Vitamin E is an antioxidant and has no role in mineral absorption. It is offered to check that the student is not simply picking any fat-soluble vitamin, since all four are absorbed with dietary fat in chylomicrons.

## answer_d
Vitamin K

## explanation_d
There is a real link worth holding: vitamin K γ-carboxylates osteocalcin, which helps it bind hydroxyapatite crystals, so vitamin K helps bone retain calcium. That is calcium retention in bone, not calcium absorption from the gut, and confusing the two is exactly what this option catches.

## topic
Vitamins

## subtopic
Functions of vitamin D

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin D (Calciferol, Antirachitic Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
State that calcitriol drives intestinal calcium absorption by inducing calbindin, and distinguish that from vitamin K’s effect on osteocalcin.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 147 (printed page 140), printed question 14; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q14 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-C5A4FADD5BFF

## title
Hydroxylation of vitamin D occurs in the:

## question
Hydroxylation of vitamin D occurs in the:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked where the first of the two hydroxylation steps of vitamin D3 is carried out.

## format
single best answer

## derived_from
Question 15 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q15 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Skin

## explanation_a
What the skin does is not a hydroxylation. Beneath the skin, 7-dehydrocholesterol is converted to vitamin D3 by ultraviolet radiation, which is the synthesis of the parent compound, not its activation. Insufficient sun exposure is a cause of deficiency for exactly this reason.

## answer_b
Liver

## explanation_b
The point is the order: this is the printed key's sequence. The first hydroxylation happens in the liver microsomes: 25-hydroxylase converts cholecalciferol to 25-hydroxycholecalciferol, calcidiol, which is the major circulating and storage form. Only afterwards does the kidney add the 1-hydroxyl to make calcitriol. Both organs hydroxylate vitamin D, so read the stem carefully — with a bare "hydroxylation" and both organs offered, this book expects the first step, and item 10 of this same chapter asks specifically about the 1-hydroxylation and answers "kidneys".

## answer_c
Kidney

## explanation_c
This does not match the key, though the kidney genuinely performs the second hydroxylation, by 1-hydroxylase, and also the 24-hydroxylation that inactivates the vitamin. A student who picks it has the biochemistry right and the question’s intent wrong; the safeguard is to notice which of the two steps is being asked about.

## answer_d
Intestinal mucosa

## explanation_d
The intestinal mucosa is a target of calcitriol, where calbindin is induced, not a site of its activation.

## topic
Vitamins

## subtopic
Activation of vitamin D3

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Challenging

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
40

## exam_relevance
7

## clinical_relevance
0.7

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin D (Calciferol, Antirachitic Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Order the two hydroxylations of vitamin D3 — C25 in the liver, then C1 in the kidney — and identify which step a question is asking about.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 147 (printed page 140), printed question 15; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p147-q15 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
This item and item 10 test the same pathway from opposite ends, and taken alone the stem here is ambiguous: both liver and kidney hydroxylate vitamin D. The printed key names B, the liver, which is the first step. The ambiguity is flagged for the faculty reviewer rather than resolved by rewriting the stem, and explanation C says plainly that the kidney also hydroxylates.

---

# Item

## id
QM-103-F940172091DF

## title
Which vitamin is a major lipid-soluble antioxidant in cell membranes?

## question
Which vitamin is a major lipid-soluble antioxidant in cell membranes?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked which vitamin protects the polyunsaturated fatty acids of membrane phospholipids from peroxidation.

## format
single best answer

## derived_from
Question 16 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p148-q16 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Vitamin A

## explanation_a
This is the distractor that separates a careful student from a quick one. Vitamin A does help trap free radicals in tissues, which may explain an anticancer effect — but this action is complementary to vitamin E, which is the major fat-soluble antioxidant. The question asks for the major one.

## answer_b
Vitamin D

## explanation_b
Vitamin D is a hormone precursor acting through a nuclear receptor on calcium handling. It has no antioxidant role, and it is offered to catch students matching on "fat soluble" alone.

## answer_c
vitamin E

## explanation_c
Vitamin E is accepted as the most potent biological antioxidant, and it is the major fat-soluble one, which is why it works inside membranes where the polyunsaturated fatty acids of the phospholipids are vulnerable to peroxidation. There are eight naturally occurring tocopherols, α, β, γ and so on, and α-tocopherol is the most active. It is carried in blood on α-tocopherol transfer protein and stored in liver and adipose tissue. The water-soluble counterpart is vitamin C, which is a highly efficient antioxidant in the aqueous compartment — the two divide the work by solubility.

## answer_d
Vitamin K

## explanation_d
Vitamin K is a coenzyme for γ-carboxylation of glutamate residues and has no antioxidant function. It also happens to be the one fat-soluble vitamin the intestinal flora make, which is a different distinguishing fact worth keeping separate from this one.

## topic
Vitamins

## subtopic
Function of vitamin E

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
8

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin E (Tocopherols, Antioxidant vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Identify vitamin E as the major lipid-soluble antioxidant and state how its role differs from the minor antioxidant action of vitamin A.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 148 (printed page 141), printed question 16; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p148-q16 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-6AF38583A428

## title
Weakness in muscles and increase in the fragility of red blood cells is caused by the deficiency of which vitamin?

## question
Weakness in muscles and increase in the fragility of red blood cells is caused by the deficiency of which vitamin?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A premature infant has a haemolytic anaemia. The paediatrician is asked which fat-soluble vitamin deficiency produces this picture together with neuromuscular signs.

## format
single best answer

## derived_from
Question 17 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p148-q17 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Deficiency of vitamin E

## explanation_a
Vitamin E deficiency leads to haemolytic anaemia, mainly in premature infants, and to neuromuscular manifestations caused by tissue damage from increased free radicals. Both follow from one mechanism: without the major lipid-soluble antioxidant, the polyunsaturated fatty acids of the red cell membrane are peroxidised, the membrane becomes fragile, and the cell lyses. The summary table states it as "increased red cell fragility leads to anaemia". Its causes are decreased intake, malabsorption as in obstructive jaundice and steatorrhoea, and genetic defects in α-tocopherol transfer protein.

## answer_b
Deficiency of vitamin D

## explanation_b
Vitamin D deficiency gives rickets and osteomalacia. Muscle weakness is a genuine feature of many deficiency states, so it does not discriminate — the red cell fragility is the part of the stem that does.

## answer_c
Deficiency of vitamin C

## explanation_c
The anaemia of scurvy is the reason this is tempting. Vitamin C deficiency can cause anaemia three ways: normocytic from haemorrhagic blood loss, microcytic from defective iron absorption, and macrocytic from decreased dihydrofolate reductase activity. None of those is a membrane fragility, and all three come with bleeding gums and petechiae.

## answer_d
Deficiency of vitamin A

## explanation_d
Vitamin A deficiency affects the eye, skin and mucous membranes and delays bone growth. It shares the antioxidant theme with vitamin E, which is why it is offered, but it does not present as haemolysis.

## topic
Vitamins

## subtopic
Vitamin E deficiency

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
66

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin E (Tocopherols, Antioxidant vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Explain why vitamin E deficiency causes haemolysis, and separate that anaemia from the three anaemias of vitamin C deficiency.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 148 (printed page 141), printed question 17; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p148-q17 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-6C348F730B4E

## title
Which of the following vitamins help in blood clotting?

## question
Which of the following vitamins help in blood clotting?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A newborn is given a routine injection in the first hours of life to prevent bleeding.

## format
single best answer

## derived_from
Question 18 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p148-q18 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Vitamin A

## explanation_a
Vitamin A has no role in coagulation. It is offered because a student who has learned the fat-soluble group as a block may pick any member of it.

## answer_b
Vitamin C

## explanation_b
This is the useful trap. Vitamin C deficiency does cause bleeding — swollen spongy bleeding gums and petechial haemorrhages — but the mechanism is fragile capillaries from defective collagen, not a defect of the clotting cascade. Vessel wall and clotting factors are different failures with a similar-looking result.

## answer_c
Vitamin D

## explanation_c
Vitamin D acts on calcium and bone. Calcium is needed for coagulation, which makes this feel plausible, but vitamin D does not participate in the carboxylation that lets the factors bind that calcium.

## answer_d
Vitamin K

## explanation_d
Vitamin K is the antihaemorrhagic vitamin. It serves as a coenzyme in the carboxylation of certain glutamic acid residues to γ-carboxyglutamate in specific proteins, the Gla proteins, and among these are the clotting factors prothrombin and factors VII, IX and X. The new carboxyl group together with the existing one forms a binding site for divalent calcium, and the factor–calcium complex then binds the platelet phospholipid membrane, which is what allows coagulation to proceed. Newborns are at established risk of deficiency — the fetal intestine is sterile so it cannot synthesise the vitamin, placental transfer is poor, and human milk is low in it — which is why vitamin K is routinely given prophylactically to newborns in many countries.

## topic
Vitamins

## subtopic
Function of vitamin K

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
84

## exam_relevance
8

## clinical_relevance
0.9

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin K (Antihemorrhagic Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Name vitamin K as the coagulation vitamin and state why newborn infants are given it.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 148 (printed page 141), printed question 18; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p148-q18 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-58C173E5D387

## title
Which vitamin is required for synthesis of the blood clotting proteins?

## question
Which vitamin is required for synthesis of the blood clotting proteins?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A patient on warfarin has a prolonged prothrombin time. The house officer is asked which vitamin the drug is competing with.

## format
single best answer

## derived_from
Question 19 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p148-q19 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Vitamin A

## explanation_a
Vitamin A regulates gene transcription through retinoic acid receptors and maintains epithelium; it does not act on the clotting proteins.

## answer_b
Vitamin D

## explanation_b
Vitamin D induces calbindin and drives calcium absorption. The link between it and clotting is calcium, and calcium alone is not enough — the factors must first be carboxylated before they can bind it.

## answer_c
Vitamin E

## explanation_c
Vitamin E protects membranes from peroxidation. Its deficiency causes bleeding into no cascade at all; the anaemia it produces is haemolytic.

## answer_d
Vitamin K

## explanation_d
The vitamin K-dependent γ-glutamyl carboxylase modifies glutamate residues in preprothrombin and in factors VII, IX and X, producing the mature, functional proteins. This is why dicumarol and warfarin work: they resemble vitamin K structurally, competitively inhibit vitamin K epoxide reductase, and so keep the vitamin in its oxidised, inactive form; high doses produce the symptoms and signs of vitamin K deficiency. The same carboxylation modifies osteocalcin, letting it bind hydroxyapatite, so vitamin K helps bone retain calcium as well. Note the difference between this item and item 18: that one asks which vitamin helps clotting, this one asks which is required to make the proteins — the same answer through the same mechanism, asked from two directions.

## topic
Vitamins

## subtopic
Function of vitamin K

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
8

## clinical_relevance
0.9

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin K (Antihemorrhagic Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
State that vitamin K carboxylates glutamate residues in prothrombin and factors VII, IX and X, and explain how warfarin exploits this.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 148 (printed page 141), printed question 19; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p148-q19 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-2D870618497D

## title
Which of the following will increase in vitamin K deficiency?

## question
Which of the following will increase in vitamin K deficiency?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A patient with obstructive jaundice is being assessed before surgery. The registrar wants to know which laboratory value will move, and in which direction.

## format
single best answer

## derived_from
Question 20 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p148-q20 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
The plasma concentration of prothrombin

## explanation_a
The direction is the whole point. Functional prothrombin falls in vitamin K deficiency, because the carboxylation that makes it functional cannot occur. A student who knows vitamin K and prothrombin belong together but does not track which way each moves picks this.

## answer_b
The time for blood to clot

## explanation_b
Vitamin K deficiency produces an increased bleeding tendency: bleeding gums and nose, easy bruising, post-traumatic bleeding and internal haemorrhage, and a prolonged prothrombin time and delayed clotting time. The mechanism is a shortage of carboxylated, functional clotting factors, so the measured clotting time lengthens. Obstructive jaundice is one of the classic causes because the vitamin is fat soluble and needs bile for absorption; the others are steatorrhoea, failure of intestinal synthesis after prolonged antibiotics or repeated washing enemas, failure of utilisation in liver disease, and the coumarin anticoagulants.

## answer_c
Hemolysis due to oxidative damage to red cell membranes

## explanation_c
Oxidative haemolysis is the vitamin E story. It is offered because both vitamins are fat soluble and both deficiencies follow malabsorption, so the causes overlap even though the consequences do not.

## answer_d
The time for broken bones to heal.

## explanation_d
Delayed healing of bone and delayed wound healing belong to vitamin C, where the defect is collagen. Vitamin K does act on bone through osteocalcin, but that concerns calcium retention rather than fracture healing time.

## topic
Vitamins

## subtopic
Vitamin K deficiency

## main_concept
CON-FND-46B9F239340ED9

## concept_ids


## contextual_concept_ids


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
3

## inferred_difficulty
64

## exam_relevance
8

## clinical_relevance
0.9

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin K (Antihemorrhagic Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Predict the direction each clotting measurement moves in vitamin K deficiency, and name the causes that act through malabsorption.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 148 (printed page 141), printed question 20; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p148-q20 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-8655C49B16F3

## title
Vitamin synthesized by intestinal bacteria is:

## question
Vitamin synthesized by intestinal bacteria is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A patient on a prolonged course of broad-spectrum antibiotics develops easy bruising and a prolonged prothrombin time.

## format
single best answer

## derived_from
Question 21 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p148-q21 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Vitamin C

## explanation_a
Vitamin C must come from the diet — mainly fresh fruit and vegetables — and it is easily destroyed by heat, alkali and storage. Humans cannot synthesise it and neither is it supplied by the gut flora.

## answer_b
Vitamin K

## explanation_b
Vitamin K2, menaquinone, is synthesised by the intestinal bacterial flora, alongside K1 (phylloquinone) from green vegetables and the synthetic water-soluble K3 (menadione). This is why prolonged antibiotics or repeated washing enemas cause deficiency by wiping out the source, and it is also why the newborn is at risk: the fetal intestine is sterile and cannot yet synthesise it. One other vitamin is made by the flora — biotin, in more than the body requires, which is why biotin deficiency is rare except with large amounts of raw egg white, whose avidin binds it.

## answer_c
Vitamin A

## explanation_c
Vitamin A comes from animal sources or is made from dietary carotenoids by the intestinal carotenase of the host, not by bacteria. That the conversion happens in the intestine is exactly what makes this option attractive.

## answer_d
Vitamin D

## explanation_d
Vitamin D3 is made in human skin from 7-dehydrocholesterol under ultraviolet light. It is endogenous synthesis, but by the patient, not by the flora — and this is the commonest confusion here, because both facts are stored as "this vitamin does not have to come from food".

## topic
Vitamins

## subtopic
Chemistry and sources of vitamin K

## main_concept
CON-FND-46B9F239340ED9

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
2

## inferred_difficulty
72

## exam_relevance
7

## clinical_relevance
0.75

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin K (Antihemorrhagic Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Name vitamin K as the vitamin synthesised by intestinal flora, and distinguish that from the cutaneous synthesis of vitamin D.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 148 (printed page 141), printed question 21; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p148-q21 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction ran the next printed question into option D, which arrived as "Vitamin D a is a vitamin which is needed for absorption of a) Vitamin B, Calcium b) Vitamin C, Iron" plus a spurious fifth option. PDF page 148 was opened with the Read tool: option D is printed as "Vitamin D" and ends there, and the trailing text is printed question 22, a separate item. Option D trimmed; the item has four options, as printed.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-EC2B03328BDC

## title
Ascorbic acid prevents:

## question
Ascorbic acid prevents:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A sailor on a long voyage with no fresh fruit or vegetables develops swollen, spongy, bleeding gums and petechial haemorrhages over his legs.

## format
single best answer

## derived_from
Question 23 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q23 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Scurvy

## explanation_a
Ascorbic acid is vitamin C, the anti-scurvy vitamin. Its central action is as a coenzyme for prolyl and lysyl hydroxylases, which hydroxylate the proline and lysine residues of collagen, so it is required for normal synthesis of connective tissue, bone, cartilage and teeth. When it is absent, collagen is abnormal: capillaries become fragile, giving swollen spongy bleeding gums and petechial haemorrhages, seen mostly on the legs and buttocks where hydrostatic pressure is greatest; bone, cartilage, ligaments and teeth are affected, giving fractures, dislocations, bone tenderness, delayed wound healing and loose or falling teeth. Its other roles are worth holding: it keeps iron in the ferrous state for absorption and mobilisation, it is a highly efficient water-soluble antioxidant, and it is needed for dihydrofolate reductase to activate folate.

## answer_b
Pellagra

## explanation_b
Pellagra is niacin deficiency — dermatitis, diarrhoea and dementia. Both diseases have a skin component, which is why they are confused; the discriminator is that pellagra dermatitis is on sun-exposed and pressure areas, while scurvy bleeds into the skin.

## answer_c
Rickets

## explanation_c
Rickets is vitamin D deficiency. Both scurvy and rickets damage the growing skeleton, so a child with bone pain could suggest either, but rickets is a mineralisation defect and scurvy a matrix defect.

## answer_d
Beriberi

## explanation_d
Beriberi is thiamine deficiency, with neurological and cardiovascular manifestations. It appears here to test whether the deficiency names are being matched to vitamins rather than recognised as a set.

## topic
Vitamins

## subtopic
Vitamin C deficiency (Scurvy)

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Diagnosis

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
85

## exam_relevance
8

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin C (L-Ascorbic Acid, Anti-Scurvy Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Match ascorbic acid to scurvy, and explain the bleeding and bone signs from the failure of collagen hydroxylation.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 149 (printed page 142), printed question 23; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q23 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-99F81860921F

## title
Transketolase activity is affected in:

## question
Transketolase activity is affected in:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A laboratory measures erythrocyte transketolase activity to assess the status of one particular vitamin.

## format
single best answer

## derived_from
Question 24 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q24 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Biotin deficiency

## explanation_a
Biotin is the coenzyme of the carboxylation reactions — pyruvate carboxylase, acetyl-CoA carboxylase and propionyl-CoA carboxylase. Carboxylation adds carbon dioxide; transketolase transfers a two-carbon unit. Both move carbon, and that is the whole basis of the confusion.

## answer_b
Pyridoxine deficiency

## explanation_b
Pyridoxal phosphate is the coenzyme of amino acid metabolism: transamination, all amino acid decarboxylations, cystathionine synthase, ALA synthase and kynureninase. Transamination and transketolase both begin with "trans" and neither shares a coenzyme with the other, which is exactly the trap.

## answer_c
PABA deficiency

## explanation_c
Para-aminobenzoic acid is a structural component of folic acid, not a vitamin humans require or a coenzyme in its own right — humans cannot synthesise PABA and do not need to, because they take folate ready-made. Sulfonamides work by competing with PABA in bacteria.

## answer_d
Thiamine deficiency

## explanation_d
Thiamine pyrophosphate is the coenzyme for transketolase in the hexose monophosphate shunt, as well as for the oxidative decarboxylation of α-keto acids. Because red cell transketolase depends on TPP, its activity falls early in thiamine deficiency, which is why it is used as an assessment of thiamine status. Hold TPP as having two jobs: oxidative decarboxylation of α-keto acids, and transketolase.

## topic
Vitamins

## subtopic
Functions of thiamine pyrophosphate

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Investigation

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
48

## exam_relevance
7

## clinical_relevance
0.7

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B1 (Thiamine, Antiberiberi)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Name transketolase as a thiamine pyrophosphate-dependent enzyme and separate it from the biotin and pyridoxine reactions.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 149 (printed page 142), printed question 24; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q24 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-076CBBE6A87C

## title
Increased carbohydrate consumption increases the dietary requirement for:

## question
Increased carbohydrate consumption increases the dietary requirement for:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A community lives largely on polished rice and white flour, and the requirement for one particular vitamin rises with that diet at the same time as the diet supplies less of it.

## format
single best answer

## derived_from
Question 25 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q25 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Thiamine

## explanation_a
The main role of thiamine, as thiamine pyrophosphate, is in carbohydrate metabolism: it is the coenzyme of the pyruvate dehydrogenase complex converting pyruvate to acetyl-CoA, of the α-ketoglutarate dehydrogenase complex in the Krebs cycle, and of transketolase in the hexose monophosphate shunt. The more carbohydrate is oxidised, the more of these reactions must run, so the requirement rises with carbohydrate intake. This is why beriberi is found where polished rice and white flour, which lack thiamine, are the staple — the diet raises the requirement and lowers the supply at once.

## answer_b
Riboflavin

## explanation_b
Riboflavin becomes FMN and FAD, hydrogen carriers in oxidation–reduction reactions across all fuels, not carbohydrate in particular. A general involvement in energy metabolism is not the same as a carbohydrate-specific one.

## answer_c
Pyridoxine

## explanation_c
Pyridoxal phosphate serves amino acid metabolism, so its requirement tracks protein intake rather than carbohydrate. This option is the mirror image of the right answer and catches a student who has the two nutrients swapped.

## answer_d
Folic acid

## explanation_d
Folate carries one-carbon units for nucleic acid synthesis, so its requirement rises with cell division — in pregnancy and lactation — not with dietary carbohydrate.

## topic
Vitamins

## subtopic
Functions of thiamine pyrophosphate

## main_concept
CON-FND-C9E5128193029E

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
63

## exam_relevance
8

## clinical_relevance
0.7

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B1 (Thiamine, Antiberiberi)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Explain why the thiamine requirement rises with carbohydrate intake, and why the classical beriberi diet lowers supply at the same time.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 149 (printed page 142), printed question 25; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q25 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-E50FA3E4EA3B

## title
Which of the following vitamin deficiency causes Beriberi?

## question
Which of the following vitamin deficiency causes Beriberi?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A patient has peripheral neuritis, poor memory, mental confusion and muscular weakness, with cardiac enlargement and oedema.

## format
single best answer

## derived_from
Question 26 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q26 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Vitamin B1

## explanation_a
Vitamin B1 is thiamine, and its deficiency is beriberi — the vitamin is named the antiberiberi vitamin for this. The biochemistry comes first: reduced pyruvate and α-ketoglutarate dehydrogenase activity impairs the Krebs cycle and cuts ATP production, and reduced pyruvate dehydrogenase activity raises blood pyruvate and lactate. The clinical picture follows the tissues with the highest energy demand. Neurological: peripheral neuritis, poor memory, mental confusion and muscular weakness — when these predominate it is called dry beriberi. Cardiovascular: cardiac enlargement, weakness and possibly heart failure, with oedema in wet beriberi only. Gastrointestinal: anorexia, nausea and vomiting.

## answer_b
Vitamin B2

## explanation_b
Vitamin B2 is riboflavin, and its deficiency is confined to skin and mucous membranes — cheilosis, angular stomatitis, magenta tongue, seborrhoeic dermatitis and sunshine eyes.

## answer_c
Vitamin B6

## explanation_c
Vitamin B6 deficiency gives hypochromic anaemia, peripheral neuritis and convulsions. Peripheral neuritis is shared with beriberi, which is what makes this the strongest distractor; the cardiac enlargement and oedema in the stem are not part of the B6 picture.

## answer_d
Vitamin B12

## explanation_d
Vitamin B12 deficiency gives megaloblastic anaemia with glossitis and neurological signs including subacute combined degeneration of the cord. Again the nervous system is involved, but the lesion is in the spinal columns rather than a metabolic energy failure.

## topic
Vitamins

## subtopic
Vitamin B1 deficiency (beriberi)

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Diagnosis

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
78

## exam_relevance
9

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B1 (Thiamine, Antiberiberi)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Match beriberi to thiamine and separate dry from wet beriberi by which system predominates.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 149 (printed page 142), printed question 26; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q26 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: option A was extracted as "Vitamin Bl" — a lowercase L for the numeral 1. Read as "Vitamin B1", consistent with the same substitution in printed question 46 on PDF page 151 and with the chapter heading "Vitamin B1 (Thiamine, Antiberiberi)".
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-5A1846AB080B

## title
Vitamin B1 coenzyme (TPP) is involved in:

## question
Vitamin B1 coenzyme (TPP) is involved in:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked which class of reaction thiamine pyrophosphate catalyses when pyruvate becomes acetyl-CoA.

## format
single best answer

## derived_from
Question 27 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q27 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Oxidative decarboxylation

## explanation_a
Thiamine pyrophosphate is the coenzyme for the oxidative decarboxylation of α-keto acids: the pyruvate dehydrogenase complex converting pyruvate to acetyl-CoA, the α-ketoglutarate dehydrogenase complex converting α-ketoglutarate to succinyl-CoA, and the α-ketobutyrate dehydrogenase complex converting α-ketobutyrate to propionyl-CoA. Its second job is transketolase in the hexose monophosphate shunt. Fixing the two together explains the deficiency: block the first and pyruvate and lactate accumulate while ATP production falls; the second is what makes red cell transketolase a test of thiamine status.

## answer_b
Hydroxylation

## explanation_b
Hydroxylation is the province of vitamin C — prolyl and lysyl hydroxylases in collagen, homogentisate oxidase, 7-α-hydroxylase in bile acid synthesis and the steroid hydroxylases. NADPH-dependent hydroxylases are a further group again.

## answer_c
Transamination

## explanation_c
Transamination is pyridoxal phosphate, vitamin B6 — ALT and AST are the examples. This is the single commonest confusion in the B-complex, because both coenzymes act on carbon skeletons at reactions with similar-looking names.

## answer_d
Carboxylation

## explanation_d
Carboxylation, meaning fixation of carbon dioxide, is biotin: pyruvate carboxylase, acetyl-CoA carboxylase and propionyl-CoA carboxylase. Decarboxylation removes carbon dioxide and carboxylation adds it — opposite directions, different vitamins, and the option is here to see whether the student reads the prefix.

## topic
Vitamins

## subtopic
Functions of thiamine pyrophosphate

## main_concept
CON-FND-C9E5128193029E

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
68

## exam_relevance
9

## clinical_relevance
0.6

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B1 (Thiamine, Antiberiberi)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Assign oxidative decarboxylation to TPP, transamination to PLP and carboxylation to biotin.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 149 (printed page 142), printed question 27; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q27 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-6283113F537C

## title
Concentration of pyruvic acid and lactic acid in blood is increased due to deficiency of the vitamin:

## question
Concentration of pyruvic acid and lactic acid in blood is increased due to deficiency of the vitamin:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A malnourished patient has a lactic acidosis with a raised blood pyruvate and no evidence of hypoxia.

## format
single best answer

## derived_from
Question 28 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q28 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Thiamine

## explanation_a
Decreased pyruvate dehydrogenase activity is the direct consequence of thiamine deficiency, because that complex needs thiamine pyrophosphate. Pyruvate cannot be converted to acetyl-CoA, so it accumulates and is reduced to lactate, giving a raised blood pyruvate and lactate with a lactic acidosis. The same block, plus the loss of α-ketoglutarate dehydrogenase, impairs the Krebs cycle and cuts ATP production, which is why the nervous and muscular tissues suffer first — they have the highest energy demand.

## answer_b
Riboflavin

## explanation_b
Riboflavin supplies FAD to the α-keto acid dehydrogenase complexes, so a severe deficiency would impair the same step indirectly. But riboflavin deficiency in practice presents on skin and mucous membranes, while the accumulation of pyruvate and lactate is attributed specifically to thiamine deficiency.

## answer_c
Niacin

## explanation_c
Niacin supplies NAD⁺, which lactate dehydrogenase and pyruvate dehydrogenase both use — again an indirect link. Its deficiency presents as pellagra, and a student picking it is reasoning from the cofactor list rather than from the disease.

## answer_d
Pantothenic acid

## explanation_d
Pantothenic acid becomes coenzyme A, the acyl carrier that receives the acetyl group. Its deficiency is extremely rare in humans and shows as fatty liver, because CoA is needed for fatty acid oxidation.

## topic
Vitamins

## subtopic
Vitamin B1 deficiency (beriberi)

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
48

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B1 (Thiamine, Antiberiberi)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Trace the rise in blood pyruvate and lactate in thiamine deficiency to the loss of pyruvate dehydrogenase activity.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 149 (printed page 142), printed question 28; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q28 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-97B3A0F01645

## title
Riboflavin deficiency causes:

## question
Riboflavin deficiency causes:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A strict vegetarian has swollen, fissured, congested lips with fissures at the angles of the mouth.

## format
single best answer

## derived_from
Question 29 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q29 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Cheilosis

## explanation_a
The manifestations of riboflavin deficiency are confined to skin and mucous membranes: cheilosis, meaning swollen, fissured and congested lips; angular stomatitis, meaning inflammation and fissures at the angles of the mouth; glossitis with a magenta tongue; seborrhoeic dermatitis; and sunshine eyes from corneal vascularisation. It occurs in strict vegetarians, because animal sources are rich in riboflavin, and in infants under phototherapy, because ultraviolet light breaks the flavin ring. Riboflavin itself becomes FMN and FAD, which act as hydrogen carriers in oxidation–reduction reactions; the flavoproteins include NADH dehydrogenase, succinate dehydrogenase, glutathione reductase and acyl-CoA dehydrogenase.

## answer_b
Loss of weight

## explanation_b
Weight loss accompanies almost any severe deficiency and therefore discriminates nothing. It is offered to catch a student who reaches for a general answer when the specific sign is not remembered.

## answer_c
Mental deterioration

## explanation_c
Mental deterioration belongs to the dementia of pellagra, to the confusion of thiamine deficiency and to the neurological picture of B12 deficiency. Riboflavin deficiency spares the nervous system, and that absence is itself a distinguishing feature.

## answer_d
Night blindness

## explanation_d
Night blindness is vitamin A. Riboflavin deficiency does affect the eye, but as corneal vascularisation — "sunshine eyes" — not as failure of rod pigment, and mixing the two ocular signs is what this option tests.

## topic
Vitamins

## subtopic
Vitamin B2 deficiency

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B2 (Riboflavin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
List the mucocutaneous signs of riboflavin deficiency and state why the nervous system is spared.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 149 (printed page 142), printed question 29; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q29 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-21DC3BD1BA66

## title
Magenta tongue is found in the deficiency of the vitamin:

## question
Magenta tongue is found in the deficiency of the vitamin:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
An infant who has been under phototherapy has a magenta-coloured, inflamed tongue.

## format
single best answer

## derived_from
Question 30 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q30 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Riboflavin

## explanation_a
Glossitis with a magenta tongue is one of the characteristic mucocutaneous signs of riboflavin deficiency, alongside cheilosis, angular stomatitis, seborrhoeic dermatitis and sunshine eyes. The phototherapy in the stem is the clue to the cause: ultraviolet light breaks the flavin ring, so infants under phototherapy are at risk, as are strict vegetarians who avoid the animal sources rich in the vitamin.

## answer_b
Thiamine

## explanation_b
Thiamine deficiency is beriberi, whose manifestations are neurological, cardiovascular and gastrointestinal. The tongue is not its target.

## answer_c
Nicotinic acid

## explanation_c
It is the strongest distractor, because pellagra — nicotinic acid, or niacin, deficiency — does include glossitis among its gastrointestinal manifestations, together with stomatitis, gastritis, enteritis and diarrhoea. What pellagra does not produce is the magenta colour, and its picture is dominated by the three Ds. Note also that the same vitamin appears under three names in this chapter — niacin, nicotinic acid and the pellagra preventive factor.

## answer_d
Pyridoxine

## explanation_d
Vitamin B6 deficiency gives hypochromic anaemia, peripheral neuritis, convulsions and pellagra-like manifestations. Those pellagra-like changes arise because PLP is needed by kynureninase to convert tryptophan to niacin, so a B6 deficiency can starve the body of niacin — an indirect route to a sore mouth, but not to a magenta tongue.

## topic
Vitamins

## subtopic
Vitamin B2 deficiency

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
66

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B2 (Riboflavin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Attribute magenta tongue to riboflavin, and distinguish it from the glossitis of pellagra and the pellagra-like signs of B6 deficiency.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 149 (printed page 142), printed question 30; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p149-q30 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-E4B161C88EFA

## title
The pellagra preventive factor is:

## question
The pellagra preventive factor is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student meets a vitamin known by three different names and is asked which one prevents pellagra.

## format
single best answer

## derived_from
Question 31 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q31 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Riboflavin

## explanation_a
Riboflavin is vitamin B2, whose deficiency is a mucocutaneous syndrome. Both B2 and B3 deficiencies affect skin, which is why they are confused; only one of them carries dementia and diarrhoea with it.

## answer_b
Pantothenic acid

## explanation_b
Pantothenic acid is vitamin B5, the precursor of coenzyme A and of the acyl carrier protein. Its deficiency is extremely rare in humans and manifests as fatty liver.

## answer_c
Niacin

## explanation_c
Niacin is vitamin B3 and its chapter is titled "Niacin, Pellagra Preventive Factor (PPF)". Nicotinamide is built into NAD⁺ and NADP⁺, the two great hydrogen carriers of redox metabolism. Pellagra is an Italian word meaning rough skin, and its symptoms are the three Ds: dermatitis on sun-exposed and pressure areas, diarrhoea with stomatitis, glossitis, gastritis and enteritis, and dementia with irritability, poor concentration, poor memory, peripheral neuritis and depression. Its causes are worth holding because they are not all dietary: a maize staple, which lacks tryptophan; vitamin B6 deficiency, which slows tryptophan conversion to niacin; carcinoid syndrome, which shunts tryptophan to serotonin; and Hartnup disease, which impairs tryptophan absorption.

## answer_d
Pyridoxine

## explanation_d
Only just, and this is the most instructive option on the page. Vitamin B6 deficiency does produce pellagra-like manifestations, because pyridoxal phosphate is the coenzyme of kynureninase, which converts tryptophan to niacin. B6 is a cause of a pellagra-like state, not the factor that prevents pellagra.

## topic
Vitamins

## subtopic
Vitamin B3 deficiency (Pellagra)

## main_concept
CON-FND-C9E5128193029E

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
2

## inferred_difficulty
70

## exam_relevance
8

## clinical_relevance
0.75

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B3 (Niacin, Pellagra Preventive Factor (PPF))

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Identify niacin as the pellagra preventive factor and explain why B6 deficiency produces a pellagra-like state.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 150 (printed page 143), printed question 31; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q31 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-384773E3E166

## title
A vitamin which can be synthesized by human beings is:

## question
A vitamin which can be synthesized by human beings is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked which B vitamin the body can make for itself, given a sufficient supply of one particular amino acid.

## format
single best answer

## derived_from
Question 32 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q32 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Thiamine

## explanation_a
Thiamine must be supplied in the diet; humans convert it to thiamine pyrophosphate but cannot build the vitamin itself. Activating a vitamin is not synthesising it, and that is the distinction being tested.

## answer_b
Niacin

## explanation_b
The amino acid tryptophan is the precursor of niacin in the body, so niacin is the B vitamin humans can make for themselves. This single fact explains three of the four causes of pellagra: a maize staple, because maize lacks tryptophan; carcinoid syndrome, because tryptophan is shunted into serotonin synthesis; and Hartnup disease, because tryptophan absorption is decreased. The fourth, vitamin B6 deficiency, blocks the conversion itself, since kynureninase needs pyridoxal phosphate.

## answer_c
Folic acid

## explanation_c
Folic acid is composed of pteridine linked to para-aminobenzoic acid and glutamate, and humans cannot synthesise PABA — which is precisely why sulfonamides, which compete with PABA, harm bacteria and not us. Bacteria make their own folate; we must eat ours.

## answer_d
Cyanocobalamin

## explanation_d
Cyanocobalamin is a form of vitamin B12, which humans cannot synthesise and can only absorb with the help of intrinsic factor. It is picked because B12 is the one B vitamin that is stored, and a student may confuse being stored with being made.

## topic
Vitamins

## subtopic
Chemistry of niacin

## main_concept
CON-FND-C9E5128193029E

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
64

## exam_relevance
7

## clinical_relevance
0.6

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B3 (Niacin, Pellagra Preventive Factor (PPF))

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
State that niacin can be synthesised from tryptophan, and use that to explain three of the causes of pellagra.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 150 (printed page 143), printed question 32; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q32 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-F865A6C8A623

## title
Which of the following diseases is caused by the deficiency of Niacin?

## question
Which of the following diseases is caused by the deficiency of Niacin?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A man whose staple food is maize bread has a red, pigmented, scaly, fissured rash over his face, neck and the backs of his hands, with diarrhoea and increasing forgetfulness.

## format
single best answer

## derived_from
Question 33 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q33 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Scurvy

## explanation_a
Scurvy is vitamin C deficiency: bleeding gums, petechiae, poor wound healing and loose teeth from defective collagen. It shares a skin sign with pellagra, but scurvy bleeds into skin while pellagra roughens it.

## answer_b
Rickets

## explanation_b
Rickets is vitamin D deficiency in a child, a failure of bone mineralisation with deformities. Nothing in this stem points to the skeleton.

## answer_c
Pellagra

## explanation_c
Pellagra is niacin deficiency, and the name is Italian for rough skin. It is remembered as the three Ds. Dermatitis: red, pigmented, scaly and fissured skin, especially on the face, neck and dorsum of the hands, which are sun-exposed, and on the elbows, knees, greater trochanter and ischial tuberosities, which are pressure areas. Diarrhoea, with stomatitis, glossitis, gastritis and enteritis. Dementia: irritability, inability to concentrate, poor memory, peripheral neuritis and depression. The maize staple in the stem is the classic cause, because maize lacks the tryptophan from which niacin would otherwise be made.

## answer_d
Pernicious anemia

## explanation_d
Pernicious anaemia is vitamin B12 deficiency. It also carries neurological and gastrointestinal manifestations, which is why it is offered — but its skin is pale from anaemia rather than photosensitively roughened, and its neurology is peripheral neuritis with subacute combined degeneration of the cord.

## topic
Vitamins

## subtopic
Vitamin B3 deficiency (Pellagra)

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Diagnosis

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
80

## exam_relevance
8

## clinical_relevance
0.85

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B3 (Niacin, Pellagra Preventive Factor (PPF))

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Match pellagra to niacin deficiency and give its three Ds with the distribution of the rash.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 150 (printed page 143), printed question 33; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q33 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-148D53486191

## title
Which of the following is a component of the coenzyme A?

## question
Which of the following is a component of the coenzyme A?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked which vitamin is built into the molecule that activates fatty acids for oxidation and carries the acetyl group into the Krebs cycle.

## format
single best answer

## derived_from
Question 34 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q34 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Retinol

## explanation_a
Retinol is a form of vitamin A. It is a fat-soluble vitamin acting in vision, epithelial maintenance and gene expression, and it is not a component of any coenzyme of intermediary metabolism.

## answer_b
Pyridoxine

## explanation_b
Pyridoxine becomes pyridoxal phosphate, the coenzyme of amino acid metabolism. Both PLP and CoA are B-complex coenzymes, so a student who knows only that much has to guess between them; the discriminator is that PLP works on nitrogen and CoA on acyl groups.

## answer_c
Retinoic acid

## explanation_c
Retinoic acid regulates gene transcription through nuclear receptors. It is offered alongside retinol so that two of the four options belong to vitamin A, which punishes guessing by vitamin rather than by function.

## answer_d
Pantothenic acid

## explanation_d
Pantothenic acid, vitamin B5, is formed of pantoic acid and β-alanine, and its derivative 4′-phosphopantetheine is built into both coenzyme A and the acyl carrier protein. Coenzyme A activates carboxylic acids: fatty acyl-CoA for oxidation, elongation and esterification; acetyl-CoA, the active acetate; succinyl-CoA for haem synthesis and ketolysis; malonyl-CoA for fatty acid synthesis; and it participates in the oxidative decarboxylation of α-keto acids. The acyl carrier protein is part of the fatty acid synthase complex. Deficiency is extremely rare in humans and may cause fatty liver, because CoA is needed for fatty acid oxidation — which is why pantothenic acid counts as a lipotropic factor.

## topic
Vitamins

## subtopic
Functions of pantothenic acid

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
72

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B5 (Pantothenic acid)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Name pantothenic acid as the vitamin component of coenzyme A and of the acyl carrier protein.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 150 (printed page 143), printed question 34; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q34 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-1A47DA0F329D

## title
Biotin is a coenzyme of the enzyme:

## question
Biotin is a coenzyme of the enzyme:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked which reaction class needs biotin, given that pyruvate carboxylase, acetyl-CoA carboxylase and propionyl-CoA carboxylase all depend on it.

## format
single best answer

## derived_from
Question 35 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q35 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Carboxylase

## explanation_a
Biotin is the coenzyme of the carboxylation reactions, which are carbon dioxide fixation reactions. Three matter in this course: pyruvate carboxylase, converting pyruvate to oxaloacetate for the Krebs cycle and gluconeogenesis; acetyl-CoA carboxylase, adding carbon dioxide to acetyl-CoA to make malonyl-CoA for fatty acid synthesis; and propionyl-CoA carboxylase, converting propionyl-CoA to methylmalonyl-CoA. Biotin is made by the intestinal flora in more than the body needs, so deficiency is rare except in people eating large amounts of raw egg white, whose heat-labile protein avidin binds biotin and prevents its absorption.

## answer_b
Hydroxylase

## explanation_b
Hydroxylation belongs to vitamin C — prolyl and lysyl hydroxylases and the others — and to the NADPH-dependent hydroxylases.

## answer_c
Decarboxylase

## explanation_c
It is the option that catches the student reading too quickly. Decarboxylation removes carbon dioxide; carboxylation adds it. The amino acid decarboxylases need pyridoxal phosphate and the oxidative decarboxylation of α-keto acids needs thiamine pyrophosphate, so all three vitamins sit near this word and only one of them adds carbon dioxide.

## answer_d
Deaminase

## explanation_d
Deamination removes an amino group and belongs to amino acid catabolism; the transaminases that precede it need PLP. No step in that sequence requires biotin.

## topic
Vitamins

## subtopic
Function of biotin

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B7 (Biotin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Assign the carboxylation reactions to biotin and name the three carboxylases that depend on it.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 150 (printed page 143), printed question 35; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q35 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-D4F0F630A4C0

## title
Which of the following vitamins acts as coenzyme for transamination reaction?

## question
Which of the following vitamins acts as coenzyme for transamination reaction?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked which coenzyme ALT and AST require.

## format
single best answer

## derived_from
Question 36 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q36 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Nicotinamide

## explanation_a
Nicotinamide is built into NAD⁺ and NADP⁺, which are hydrogen carriers in oxidation–reduction reactions. Transamination transfers an amino group, not hydrogen, and the two are confused because both are described as "transfer" reactions.

## answer_b
Biotin

## explanation_b
Biotin fixes carbon dioxide in the carboxylases. It transfers a one-carbon unit at the oxidation level of carbon dioxide, which is a different one-carbon economy from either folate’s or PLP’s.

## answer_c
Thiamine pyrophosphate

## explanation_c
This is the sharpest distractor in the chapter. Thiamine pyrophosphate runs oxidative decarboxylation of α-keto acids and transketolase. Both TPP and PLP work on α-keto acids and amino acids respectively, and both reactions begin with "trans" in one of their names, so the pair must be learned against each other rather than separately.

## answer_d
Pyridoxal phosphate

## explanation_d
Pyridoxal phosphate, the active form of vitamin B6, is the coenzyme of transamination — ALT and AST are the named examples. PLP’s reach across amino acid metabolism is wide: intestinal absorption of amino acids and their uptake by cells; all amino acid decarboxylations, including serine to ethanolamine, glutamate to GABA, cysteine to thioethanolamine and taurine, 5-hydroxytryptophan to serotonin, and histidine to histamine; methionine and cysteine metabolism through cystathionine synthase, cystathionase and cysteine desulfhydrase; ALA synthase in haem synthesis; and kynureninase, converting tryptophan to niacin. Muscle glycogen phosphorylase also carries a PLP at each catalytic site.

## topic
Vitamins

## subtopic
Functions of pyridoxal phosphate

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
9

## clinical_relevance
0.6

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B6 (Pyridoxine)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Assign transamination to pyridoxal phosphate and list the other reaction classes PLP serves.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 150 (printed page 143), printed question 36; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q36 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-CF5F78C363E6

## title
Folate as a coenzyme is involved in the transfer and utilization of:

## question
Folate as a coenzyme is involved in the transfer and utilization of:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked what tetrahydrofolate actually carries when it moves between its methylene, methenyl, formyl, formimino and methyl forms.

## format
single best answer

## derived_from
Question 37 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q37 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Amino group

## explanation_a
Amino group transfer is transamination, which needs pyridoxal phosphate. Folate and PLP both work in amino acid metabolism — folate helps synthesise glycine, serine and methionine — which is why the two get swapped.

## answer_b
Hydroxyl group

## explanation_b
Hydroxyl groups are added by hydroxylases, and vitamin C is the vitamin associated with them. There is a real link between C and folate, but it is that ascorbate is essential for dihydrofolate reductase activity, not that folate carries hydroxyls.

## answer_c
Single carbon moiety

## explanation_c
Folic acid plays a key role in one-carbon metabolism: the active form tetrahydrofolate carries one-carbon groups attached to N5, to N10 or to both. The sources of those units are the α-carbon of glycine, the β-carbon of serine, a formyl group from tryptophan and a formimino group from histidine. Their fates are the synthesis of glycine, serine and methionine, and of purines and the pyrimidine TMP. That is why folate is essential for nucleic acid synthesis, cell division, growth and bone marrow function, and why its deficiency shows up first in the tissues that divide fastest.

## answer_d
Amido group

## explanation_d
An amido group is the nitrogen-containing group of glutamine and asparagine, moved by amidotransferases in purine synthesis. Folate contributes carbons 2 and 8 of the purine ring while glutamine contributes nitrogens, so the two act on the same molecule with different atoms — which is exactly the distinction this option probes.

## topic
Vitamins

## subtopic
Functions of folic acid

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
8

## clinical_relevance
0.6

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B9 (Folic acid, Pteroyl glutamate)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
State that tetrahydrofolate carries one-carbon units, and name the sources and fates of those units.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 150 (printed page 143), printed question 37; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q37 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-9AA7F79103F7

## title
Which of the following nutrient deficiencies cause megaloblastic anemia?

## question
Which of the following nutrient deficiencies cause megaloblastic anemia?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A pregnant woman with a poor diet has a macrocytic anaemia with leucopenia, thrombocytopenia and glossitis, and no neurological signs.

## format
single best answer

## derived_from
Question 38 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q38 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Folic acid

## explanation_a
Folate deficiency decreases cell division, and the consequences follow the tissues that divide fastest: decreased haemopoiesis gives megaloblastic anaemia with leucopenia and thrombocytopenia; decreased multiplication in the gastrointestinal tract gives glossitis and fatty diarrhoea; growth is impaired. It also causes hyperhomocysteinaemia, and neural tube defects in the newborn, which is why daily folate supplements are recommended in pregnancy. Its causes are poor intake, impaired absorption, increased requirement in pregnancy and lactation, and treatment with methotrexate.

## answer_b
Niacin

## explanation_b
Niacin deficiency is pellagra. Anaemia is not one of its three Ds, and this option catches a student answering from a list of B vitamins rather than from the mechanism.

## answer_c
Pyridoxine

## explanation_c
Vitamin B6 deficiency causes a hypochromic anaemia — a microcytic picture — because PLP is needed by ALA synthase for haem synthesis. Same word, opposite red cell size, and that contrast is the point of the option.

## answer_d
Thiamine

## explanation_d
Thiamine deficiency is beriberi, a disorder of energy metabolism in nerve and heart, with no primary anaemia.

## topic
Vitamins

## subtopic
Deficiency of folate

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
9

## clinical_relevance
0.9

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B9 (Folic acid, Pteroyl glutamate)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Match megaloblastic anaemia to folate and contrast it with the hypochromic anaemia of B6 deficiency.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 150 (printed page 143), printed question 38; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p150-q38 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-120139711B7B

## title
Which of the following is the most essential nutrient for a woman during her initial stages of pregnancy to prevent birth defects?

## question
Which of the following is the most essential nutrient for a woman during her initial stages of pregnancy to prevent birth defects?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A woman planning a pregnancy asks which supplement she should begin before conception to reduce the risk of a birth defect.

## format
single best answer

## derived_from
Question 39 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q39 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Thiamin

## explanation_a
Thiamine requirement rises with carbohydrate intake and its deficiency causes beriberi. It is not linked to congenital malformation.

## answer_b
Folic acid

## explanation_b
Folate deficiency causes neural tube defects in the newborn, and daily folate supplements are recommended for pregnant women. The mechanism is the same one that produces the anaemia: tetrahydrofolate carries the one-carbon units needed for purine and thymidylate synthesis, so a shortage limits DNA synthesis and cell division exactly when the embryo is dividing fastest. Pregnancy and lactation also raise the requirement, so intake and demand move in opposite directions. The timing in the stem matters — the neural tube closes early, so supplementation has to begin at the start.

## answer_c
Vitamin C

## explanation_c
Vitamin C is needed for collagen synthesis and iron absorption. It is important in pregnancy, as most nutrients are, but it is not the one that prevents a neural tube defect.

## answer_d
Vitamin E

## explanation_d
Vitamin E deficiency causes haemolytic anaemia in premature infants — a neonatal problem, but one that appears after birth rather than a defect of development, which is the distinction this option tests.

## topic
Vitamins

## subtopic
Deficiency of folate

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Management

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
83

## exam_relevance
8

## clinical_relevance
0.95

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B9 (Folic acid, Pteroyl glutamate)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Name folate as the supplement that prevents neural tube defects and explain the mechanism through one-carbon metabolism.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 151 (printed page 144), printed question 39; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q39 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-622AA9BC6D25

## title
Intrinsic factor is chemically a:

## question
Intrinsic factor is chemically a:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A patient who has had a total gastrectomy will need lifelong parenteral vitamin B12, because the substance secreted by the gastric parietal cells is no longer made.

## format
single best answer

## derived_from
Question 40 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q40 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Protein

## explanation_a
It is the answer that is nearly right. Intrinsic factor is a protein, but the question asks for the more specific chemical class: it is a glycoprotein — a protein with carbohydrate attached. When one option is a subset of another, the more specific one is what is being asked for.

## answer_b
Glycoprotein

## explanation_b
Intrinsic factor is a glycoprotein secreted by the gastric parietal cells, and vitamin B12 requires it for absorption because of the vitamin’s large size. B12 combines with intrinsic factor to form the IF–B12 complex, which travels through the gut and binds specific receptors on the mucosal cells of the ileum, allowing the vitamin to pass into the portal circulation. This is the reason gastrectomy and autoimmune destruction of the parietal cells both cause B12 deficiency, and why failure of absorption is a far commoner cause than dietary lack. Note that the transport protein in blood, transcobalamin, is also a glycoprotein.

## answer_c
Mucopolysaccaride

## explanation_c
A mucopolysaccharide, or glycosaminoglycan, is carbohydrate with no protein backbone of this kind. The mucus of the stomach contains such molecules, which is why the word feels at home in this stem, and that proximity is what makes the option work.

## answer_d
Peptide

## explanation_d
A peptide is short. Intrinsic factor is a full-sized protein carrying a carbohydrate moiety, and calling it a peptide would not explain how it binds both a vitamin and an ileal receptor.

## topic
Vitamins

## subtopic
Absorption of vitamin B12

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
3

## inferred_difficulty
48

## exam_relevance
8

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B12 (Cobalamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
State that intrinsic factor is a parietal-cell glycoprotein and describe how the IF–B12 complex is absorbed in the ileum.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 151 (printed page 144), printed question 40; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q40 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: option C was extracted as "Mucopolysaccaride", which is how the book prints it. Kept as printed in the option text rather than silently corrected, since it is the examiner’s own spelling; the explanation uses the correct form.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-46EBDEDDA549

## title
Vitamin B12 is:

## question
Vitamin B12 is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A patient stops absorbing vitamin B12 after gastric surgery, yet the deficiency takes years rather than weeks to appear.

## format
single best answer

## derived_from
Question 41 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q41 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Not stored in the body.

## explanation_a
It is the trap the rule creates. Water-soluble vitamins are generally not stored — excess is excreted in urine — so a student applying the rule answers this. B12 and folate are the stated exceptions, and B12 is the one this question singles out.

## answer_b
Stored in the bone marrow.

## explanation_b
The bone marrow is where B12 deficiency shows itself, as megaloblastic erythropoiesis, but the site of the lesion is not the site of the store. This is a good example of confusing where a deficiency is seen with where the vitamin is kept.

## answer_c
Stored in the liver.

## explanation_c
Vitamin B12 is stored in the liver, as an exception among the B-complex vitamins, which are generally not stored. The store is what makes the clinical course slow: after gastrectomy or in autoimmune parietal cell destruction, absorption stops at once but the deficiency takes years to appear. In the blood, B12 is transported bound to a specific glycoprotein, transcobalamin.

## answer_d
Stored in the RE cell.

## explanation_d
The reticuloendothelial cells store iron, as ferritin and haemosiderin, and this option imports that fact from the haematology of iron into the storage of B12. Both belong to anaemia, which is what makes the substitution feel plausible.

## topic
Vitamins

## subtopic
Transport and storage of vitamin B12

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
7

## clinical_relevance
0.8

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B12 (Cobalamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
State that B12 is stored in the liver, and explain why that store delays the appearance of deficiency after absorption fails.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 151 (printed page 144), printed question 41; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q41 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-F7E765D03274

## title
Subacute combined degeneration of cord is caused due to deficiency of:

## question
Subacute combined degeneration of cord is caused due to deficiency of:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A patient with a macrocytic anaemia has progressive weakness with loss of position sense; the lateral and posterior columns of the spinal cord are affected.

## format
single best answer

## derived_from
Question 42 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q42 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Niacin

## explanation_a
Niacin deficiency is pellagra, whose neurological component is dementia with irritability, poor memory, peripheral neuritis and depression. It is a diffuse picture, not a tract-specific cord lesion.

## answer_b
Cobalamin

## explanation_b
Subacute combined degeneration of the spinal cord — atrophy of the lateral and posterior columns — is a neurological manifestation of vitamin B12 deficiency, alongside peripheral neuritis. It is explained by accumulation of methylmalonyl-CoA, since deoxyadenosyl cobalamin is the coenzyme of methylmalonyl-CoA isomerase: methylmalonyl-CoA competes with malonyl-CoA and inhibits fatty acid synthesis, which myelin needs, and it can also substitute for malonyl-CoA, producing branched-chain fatty acids that disrupt membrane structure. This is why any patient with megaloblastic anaemia must be examined neurologically and assessed for B12: treating with folic acid alone corrects the anaemia while the neurological damage advances and becomes irreversible.

## answer_c
Biotin

## explanation_c
Biotin deficiency is rare and shows as anorexia, muscle pain, dermatitis, delayed growth, hair loss and depression. It has no cord syndrome.

## answer_d
Thiamine

## explanation_d
Thiamine deficiency gives peripheral neuritis and confusion. Peripheral neuritis is shared with B12 deficiency, which is exactly why the stem specifies the cord: the combined degeneration of the two named columns is what makes the diagnosis.

## topic
Vitamins

## subtopic
Deficiency of vitamin B12

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
48

## exam_relevance
9

## clinical_relevance
0.9

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B12 (Cobalamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Attribute subacute combined degeneration to B12, explain it through methylmalonyl-CoA accumulation, and state why folate alone must not be given.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 151 (printed page 144), printed question 42; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q42 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-28403865DB23

## title
Which of the following vitamins is also known as cobalamin?

## question
Which of the following vitamins is also known as cobalamin?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked to match the chemical names of the B-complex vitamins to their numbers.

## format
single best answer

## derived_from
Question 43 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q43 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Vitamin B11

## explanation_a
B11 is not one of the vitamins this chapter names; the numbered members it teaches are B1, B2, B3, B5, B6, B7, B9 and B12. An unfamiliar number is offered to see whether the student is matching names or guessing.

## answer_b
Vitamin B2

## explanation_b
Vitamin B2 is riboflavin, a flavin ring plus ribitol, converted to FMN and FAD.

## answer_c
Vitamin B6

## explanation_c
Vitamin B6 is pyridoxine, whose active form is pyridoxal phosphate.

## answer_d
Vitamin B12

## explanation_d
Vitamin B12 is cobalamin. It is built on a corrin ring, porphyrin-like, made of four pyrrole rings coordinated with a cobalt atom, and the cobalt gives the vitamin its red colour. The cobalt is covalently linked to a nucleotide containing a benzimidazole ring, which is what makes it a cobalamin, and the sixth valency of the cobalt is occupied by cyanide, hydroxyl, methyl or deoxyadenosyl — giving cyanocobalamin, hydroxycobalamin, methylcobalamin and deoxyadenosyl cobalamin. The last two are the coenzyme forms.

## topic
Vitamins

## subtopic
Chemistry of vitamin B12

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Easy

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
86

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B12 (Cobalamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Match the numbered B vitamins to their chemical names, and describe the corrin–cobalt structure of cobalamin.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 151 (printed page 144), printed question 43; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
35

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q43 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-F2634B4A01CF

## title
Both folic acid and methyl cobalamin (vitamin B12) are required in:

## question
Both folic acid and methyl cobalamin (vitamin B12) are required in:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked to name the single reaction at which the folate and B12 pathways meet, and which explains why a B12 deficiency traps folate.

## format
single best answer

## derived_from
Question 44 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q44 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Deamination of serine

## explanation_a
Serine does supply folate with a one-carbon unit — its β-carbon becomes methylene-THF — but that is a transfer to folate, not a reaction needing both vitamins, and its deamination is a PLP-dependent step.

## answer_b
Deamination of threonine

## explanation_b
Threonine metabolism does not require either vitamin at this point, and the option is here to punish a student who recognises "an amino acid reaction" and stops reading.

## answer_c
Conversion of pyridoxal phosphate to pyridoxamine phosphate

## explanation_c
Interconversion of the B6 forms is internal to vitamin B6. It appears because pyridoxamine is formed during transamination, and any half-remembered link between two B vitamins can look like the answer.

## answer_d
Methylation of homocysteine to methionine

## explanation_d
Methionine synthase converts homocysteine to methionine, and it needs both partners: methyl-THF supplies the methyl group and methylcobalamin is the coenzyme that transfers it. This is the meeting point of the two pathways, and it explains the folate trap. The interconversions of folate are reversible except the production of methyl-THF, which is irreversible, so the only route back to THF is through this cobalamin-dependent reaction. In B12 deficiency folate is trapped as methyl-THF, giving a functional folate deficiency and hence the megaloblastic anaemia of pernicious anaemia. It also explains the hyperhomocysteinaemia of both deficiencies, which is a significant risk factor for atherosclerosis, thrombosis and hypertension.

## topic
Vitamins

## subtopic
Folate trap

## main_concept
CON-FND-C9E5128193029E

## concept_ids
CON-FND-1A4A49607783A9

## contextual_concept_ids


## difficulty
Challenging

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
40

## exam_relevance
9

## clinical_relevance
0.8

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B9 (Folic acid, Pteroyl glutamate)
103 BMS > Biochemistry > Vitamins > Vitamin B12 (Cobalamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Name methionine synthase as the reaction requiring both methyl-THF and methylcobalamin, and use it to explain the folate trap.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 151 (printed page 144), printed question 44; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q44 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-8100F2D4E245

## title
Metal in Vitamin B12 is:

## question
Metal in Vitamin B12 is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked which metal sits at the centre of the corrin ring and gives the vitamin its red colour.

## format
single best answer

## derived_from
Question 45 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q45 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Copper

## explanation_a
Copper is carried on caeruloplasmin, which chelates it so it cannot catalyse free-radical formation. It is a trace metal of metabolism, not a component of any vitamin.

## answer_b
Cobalt

## explanation_b
Cobalt sits at the centre of the corrin ring of vitamin B12, coordinated by four pyrrole rings, and it is responsible for the red colour of the vitamin. The name cobalamin records the cobalt. The metal is also the working part of the molecule: its sixth valency carries the cyanide, hydroxyl, methyl or deoxyadenosyl group, and it is the methyl and deoxyadenosyl forms that act as coenzymes.

## answer_c
Iron

## explanation_c
It is the strongest distractor for two reasons. Iron sits at the centre of haem, in a porphyrin ring the corrin ring resembles, and iron deficiency causes an anaemia just as B12 deficiency does. Two anaemias and two similar rings — the discriminator is that haem is not a vitamin and B12 is not iron.

## answer_d
Zinc

## explanation_d
Zinc is a cofactor of many metalloenzymes but is not part of a vitamin. It is offered as a plausible trace metal for a student guessing from a list.

## topic
Vitamins

## subtopic
Chemistry of vitamin B12

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Easy

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
84

## exam_relevance
7

## clinical_relevance
0.45

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B12 (Cobalamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Name cobalt as the metal of vitamin B12 and distinguish the corrin ring from the iron-containing porphyrin of haem.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 151 (printed page 144), printed question 45; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
35

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q45 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-4DADB0C2517A

## title
Cobalt containing Vitamin is:

## question
Cobalt containing Vitamin is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student meets the same fact asked from the opposite direction: this time the metal is given and the vitamin must be named.

## format
single best answer

## derived_from
Question 46 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q46 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Vitamin B6

## explanation_a
Vitamin B6 is pyridoxine; its active form, pyridoxal phosphate, contains no metal. Its link to a metal-containing molecule is indirect — PLP is needed by ALA synthase, and ALA is a precursor of haem, which contains iron.

## answer_b
Vitamin B12

## explanation_b
Vitamin B12, cobalamin, is the cobalt-containing vitamin, and it is the only vitamin in this chapter that contains a metal at all. The cobalt sits in a corrin ring of four pyrrole rings, gives the vitamin its red colour, and carries the group at its sixth valency that defines each cobalamin form. This fact is worth knowing outright rather than only recognising, since it can equally be asked from either direction — the vitamin given the property, or the property given the vitamin.

## answer_c
Vitamin B2

## explanation_c
Vitamin B2 is riboflavin, and its ring system is a flavin, not a metal complex. Its coenzymes FMN and FAD carry hydrogen, not a metal.

## answer_d
Vitamin B1

## explanation_d
Vitamin B1 is thiamine, built from a pyrimidine and a thiazole ring; the sulphur in the thiazole is a non-metal and is sometimes mistaken for a metal component by students who remember only that thiamine contains an unusual atom.

## topic
Vitamins

## subtopic
Chemistry of vitamin B12

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Easy

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
85

## exam_relevance
7

## clinical_relevance
0.45

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin B12 (Cobalamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Name vitamin B12 as the only metal-containing vitamin, and recognise the same fact asked from either direction.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 151 (printed page 144), printed question 46; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
35

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-07f0a0ff-p151-q46 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152)".
Read off the printed answer key on PDF page 152 (printed page 145) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: option D was extracted as "Vitamin Bl" — a lowercase L for the numeral 1. Read as "Vitamin B1", the same substitution seen in printed question 26 on PDF page 149.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-8C0F01D0E9CC

## title
………. is a steroid vitamin.

## question
………. is a steroid vitamin.

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A student is asked which of the four fat-soluble vitamins is built on a steroid nucleus rather than on an isoprenoid or a quinone skeleton.

## format
single best answer

## derived_from
Question 13 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as (none — swallowed into option D of MCQ-102-07f0a0ff-p147-q12) and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Vitamin C

## explanation_a
Vitamin C is L-ascorbic acid, a water-soluble sugar-derived lactone, and it is not even in the fat-soluble group. It is offered first because a student who reads no further than "vitamin" may answer from familiarity.

## answer_b
Vitamin D

## explanation_b
Vitamin D is the steroid vitamin. Both compounds with vitamin D activity are steroids: D2, ergocalciferol, from plants and yeast, and D3, cholecalciferol, found in animal tissues and formed from cholesterol. The steroid origin is visible in the pathway — cholesterol is dehydrogenated in the liver to 7-dehydrocholesterol, which lies beneath the skin and is converted to cholecalciferol by ultraviolet light. It is also why vitamin D behaves like a hormone rather than a coenzyme: calcitriol enters the cell, binds a receptor, and the complex acts on DNA to induce a specific protein, which is exactly how a steroid hormone works.

## answer_c
Vitamin A

## explanation_c
Vitamin A is a polyisoprenoid containing a β-ionone ring, and its three active forms are the alcohol retinol, the aldehyde retinal and the acid retinoic acid. Retinoic acid does act on nuclear receptors like a hormone, which makes this the strongest distractor — but acting like a steroid is not being one.

## answer_d
Vitamin K

## explanation_d
Vitamin K is a naphthoquinone: the parent structure is 1,4-naphthoquinone and the vitamin is 2-methyl-1,4-naphthoquinone with a side chain. Quinone, not steroid.

## topic
Vitamins

## subtopic
Chemistry of vitamin D

## main_concept
CON-FND-46B9F239340ED9

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
2

## inferred_difficulty
66

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin D (Calciferol, Antirachitic Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
Identify vitamin D as the steroid vitamin, and relate its steroid structure to its hormone-like mechanism of action.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 147 (printed page 140), printed question 13; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as (none — swallowed into option D of MCQ-102-07f0a0ff-p147-q12) and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152), read visually".
The printed key on PDF page 152 gives 13. b. Option B is Vitamin D. The answer was read, not inferred.
RECOVERED QUESTION. This item was never extracted: the 102 lane's OCR ran it into option D of the preceding printed question, so it has no ID in scripts/kasr/extract/103-BMS/mcq-bank.json. It was recovered by opening the page with the Read tool, and its stem, its four options and its printed number are read off that page. Its key is the book's own printed key on PDF page 152 (printed page 145), read visually. The question ID is minted on the same deterministic scheme as every other item in this file, from its own real printed number, so a repaired upstream extraction will mint this same ID rather than a duplicate.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
Printed question 13 of the Vitamins chapter. Recovered from the run-on in printed question 12; both are now authored, and printed 12 has had the run-on trimmed.

---

# Item

## id
QM-103-37380CE2F42E

## title
…………… is a vitamin which is needed for absorption of …………:

## question
…………… is a vitamin which is needed for absorption of …………:

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A patient with iron-deficiency anaemia is advised to take her iron tablets with orange juice rather than with tea.

## format
single best answer

## derived_from
Question 22 of the Vitamins chapter of the Kasr Al Ainy Biochemistry department question book, extracted by the 102 INT lane as (none — swallowed into option D of MCQ-102-07f0a0ff-p148-q21) and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Vitamin B, Calcium

## explanation_a
Both halves are wrong here, which is what makes it the easiest to eliminate. No B vitamin is required for calcium absorption; the vitamin that drives calcium absorption is D, through calbindin.

## answer_b
Vitamin C, Iron

## explanation_b
Vitamin C is an important reducing agent: it keeps iron in the ferrous state, which is what matters for the absorption and mobilisation of iron. This is the practical reason ascorbate is given with iron, and it also explains one of the three anaemias of scurvy — a microcytic anaemia from defective iron absorption, alongside the normocytic anaemia of haemorrhagic blood loss and the macrocytic anaemia from decreased dihydrofolate reductase activity, since ascorbate is essential for that enzyme too.

## answer_c
Vitamin A, Calcium

## explanation_c
Vitamin A maintains epithelium, supports vision and regulates gene expression; it has no role in mineral absorption. The pairing is offered because both halves are plausible-sounding on their own.

## answer_d
Vitamin A, Iron

## explanation_d
It is the intended trap: it keeps the right mineral and changes the vitamin. A student who remembers "something helps iron absorption" but not which vitamin it is picks this. The discriminator is the mechanism — the vitamin needed is the one that acts as a reducing agent, and that is ascorbate.

## topic
Vitamins

## subtopic
Functions of vitamin C

## main_concept
CON-FND-C9E5128193029E

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
8

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Vitamin C (L-Ascorbic Acid, Anti-Scurvy Vitamin)

## question_only_for


## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07


## learning_objective
State that vitamin C keeps iron ferrous for absorption, and connect that to the microcytic anaemia of scurvy.

## source_citation
Kasr Al Ainy, Biochemistry department question book (DPT BOOK MCQ D book bio 102&103 mcq), Vitamins chapter, PDF page 148 (printed page 141), printed question 22; printed answer key on PDF page 152 (printed page 145). Manifest src_07f0a0ff41addf826c7f.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as (none — swallowed into option D of MCQ-102-07f0a0ff-p148-q21) and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p152), read visually".
The printed key on PDF page 152 gives 22. b. Option B is "Vitamin C, Iron". The answer was read, not inferred.
RECOVERED QUESTION. This item was never extracted: the 102 lane's OCR ran it into option D of the preceding printed question, so it has no ID in scripts/kasr/extract/103-BMS/mcq-bank.json. It was recovered by opening the page with the Read tool, and its stem, its four options and its printed number are read off that page. Its key is the book's own printed key on PDF page 152 (printed page 145), read visually. The question ID is minted on the same deterministic scheme as every other item in this file, from its own real printed number, so a repaired upstream extraction will mint this same ID rather than a duplicate.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
Printed question 22 of the Vitamins chapter. Recovered from the run-on in printed question 21; both are now authored, and printed 21 has had the run-on trimmed.
