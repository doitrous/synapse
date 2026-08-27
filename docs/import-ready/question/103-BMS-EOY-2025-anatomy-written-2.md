<!--
  103 BMS · Anatomy · the 2025/batch-198 "Written Exam 103" paper, as sittable
  written questions.

  Source: EOY (BMS - 103) 198 (1).pdf, manifest src_22fdf028a1335432afdc (blank
  twin, 14 pages, native text layer), and its solved twin EOY (BMS - 103) 198
  Solved (1).pdf, manifest src_4b8582402b55eae3bfd9 (14 pages). The solved
  twin's own text layer carries the printed question stems cleanly but not the
  model answers — the answers are a colour-highlighted handwritten overlay
  present only in the page image, absent from the text layer entirely (the
  same failure mode already recorded for the 199-sitting sibling file). Every
  answer below was read by rendering pages 1-3 of the solved twin to images
  (150 dpi) and transcribing the overlay directly.

  Sitting-year rule applied: batch 198 -> 198+1827 = 2025, same calendar year
  as the already-authored batch-199 sitting (103-BMS-EOY-2025-anatomy-written.md)
  but a different paper, a different cohort, and a different question set — the
  two share no question in common. Hence the "-2" suffix on this filename,
  matching the demand-driven lane's own instruction, rather than colliding
  with the batch-199 file's own ids (which use the pipeline `QW-103-<hex>`
  shape; this file uses the hand-authored `QST-103-ANA-198-NN` shape instead,
  since these seven items were authored by search-and-fill against a specific
  gap list, not by the extraction pipeline).

  The paper prints seven items, not six. B7a-103-anatomy-questions.md's own
  inventory (this lane's upstream report) counted "Q1-6" for this paper and
  treated the seventh as an unnumbered "case" appended to that count. Reading
  the solved twin's own page 3 directly shows the paper numbers a sixth SAQ,
  "6) Enumerate Anomalies of limbs {5 Marks}", before the case, which is
  itself printed "7) Case: ...". Question 6 tests CON-DEV-7A9E2385A26A8B, a
  concept already live in concept/103-BMS-anatomy-concepts.md with its own
  article ART-103-ANA-LIMB-DEVELOPMENT (minted for the department book's own
  "Anomalies of limbs" section, independent of this paper) — so it needed no
  new concept and is authored here as an addition beyond B7a's twelve-item
  skip list, not a substitute for any of them. Flagged for the orchestrator:
  B7a's report undercounted this paper by one question.

  Five of the seven items (questions 1-5) test the five concepts newly minted
  in this same batch (concept/103-BMS-anatomy-concepts.md): femoral triangle
  contents, ligaments of the hip joint, gluteus maximus, popliteal artery and
  obturator nerve. Question 6 (anomalies of limbs) reuses a live concept from
  an earlier authoring pass. The case (item 7) reuses the same four common-
  peroneal-nerve concepts already live from the 2022 and 2025/batch-199
  sittings of the identical clinical vignette, minus the "terminal branches"
  fifth part those two sittings ask and this one does not.

  Marks: six of the seven items print their own mark value inline
  ("{5 Marks}" against each of questions 1-6). The case (item 7) prints none
  anywhere on either the blank or solved copy — confirmed by rendering page 4
  of both copies directly; every other item on this paper prints its own
  mark, this one alone does not. The department's own orientation
  ("Orientation of final Anatomy Exam (End of Year, 2025-2026)", manifest
  src_b8c531b4c8a1a2fe96e6, p1) states the module's case allocation directly:
  "1 case, 5 marks." That total is used here, apportioned across the case's
  four lettered parts as 1/1/1/2 marks — this file's own apportionment, not
  the examiner's, on the same convention already used for the un-split
  "(5 marks)" totals on the 2021 and 2022 sittings' own cases.

  Transcribed, not derived. `derived_from` is blank throughout: these are the
  paper's own questions, and a written question may only be derived from
  another written question.

  Status: Draft throughout.

  Validate with the concept and article files named:

    npm run medical:batch -- docs/Kasr-Source-Imports/written/103-BMS-EOY-2025-anatomy-written-2.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-anatomy-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-anatomy.md

  Import: Admin › Bulk import → question, after the concept and article files.
-->

# Item

## id
QST-103-ANA-198-01

## title
The contents of the femoral triangle

## subject
msk

## status
Draft

## owner
Claude

## vignette

## question
Enumerate the contents of the femoral triangle.

## format
structured_written

## written_parts
### (a) 5 marks
Enumerate the contents of the femoral triangle.
Expects: The femoral sheath, a funnel-shaped tube surrounding the upper 3-4 cm of the femoral vessels, divided into a lateral compartment (femoral artery and femoral branch of the genitofemoral nerve), an intermediate compartment (femoral vein), and a medial compartment, the femoral canal (a lymph node, lymph vessels and fat)
Expects: The femoral nerve, lying outside the femoral sheath, with its own branches
Expects: The lateral cutaneous nerve of the thigh
Expects: The deep inguinal lymph nodes, on the medial side of the femoral vein
Concept: CON-MSK-BBFDC0AC14A819

## derived_from

## topic
Lower limb

## subtopic
The Thigh

## difficulty
Moderate

## question_type
Anatomy

## main_concept
CON-MSK-BBFDC0AC14A819

## module
103 BMS

## module_subject
103 BMS > Anatomy > The Thigh > Femoral Triangle

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for
KAU_Y1

## concept_ids

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
1

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids
CON-MSK-9D013840078D50

## library_ids
ART-103-ANA-FEMORAL-TRIANGLE

## resource_ids
[clear]

## learning_objective
Enumerate the four contents of the femoral triangle, and for the femoral sheath, name its three compartments and what each one holds.

## media_recommendations

## source_citation
Written Exam 103 (BMS - 103), EOY (BMS - 103) 198 Solved (1).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025 (batch 198), question 1, p1, {5 Marks}. Manifest src_4b8582402b55eae3bfd9. Blank twin src_22fdf028a1335432afdc, same page. Model answer read by rendering the solved twin's page 1 to a 150 dpi image; the overlay is absent from the cached text layer.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "1) Enumerate content of femoral triangle {5 Marks}". The rendered overlay answer: "*Contents: 1-Femoral sheath: Funnel tube surrounding upper 3-4 cm of femoral vessels. It is divided by 2 antero-posterior septa into 3 compartments a)Lat. compartment: Contains femoral A. & femoral branch of genitofemoral n. b)Intermediate compartment: Contains femoral V. c)Med. compartment (femoral canal) (shorter than others): Contains a lymph node, lymph vessels & fat. 2-Femoral N.: It lies outside femoral sheath and gives branches. 3-Lat. cutaneous nerve of thigh. 4-Deep inguinal lymph nodes: On med. side of femoral V."
contextual_concept_ids names the femoral sheath concept: the sheath is one of the triangle's own four contents and is examined as its own SAQ elsewhere in this module, but this question asks for the triangle's contents as a whole, not the sheath alone.
resource_ids is empty because neither manifest source (src_4b8582402b55eae3bfd9, src_22fdf028a1335432afdc) is a live resource record yet.

## estimated_seconds
300

## randomise_answers
no

---

# Item

## id
QST-103-ANA-198-02

## title
The ligaments of the hip joint

## subject
msk

## status
Draft

## owner
Claude

## vignette

## question
Summarise the ligaments of the hip joint.

## format
structured_written

## written_parts
### (a) 5 marks
Summarise the ligaments of the hip joint.
Expects: Iliofemoral ligament (strongest) — inverted-Y shaped, attached to the anterior inferior iliac spine (stem) and the intertrochanteric line (limbs); reinforces the front of the capsule and limits over-extension
Expects: Pubofemoral ligament — triangular, attached to the superior pubic ramus and iliopubic eminence of the hip bone, fused with the inferomedial part of the capsule; supports the inferomedial part of the capsule and limits over-abduction
Expects: Ischiofemoral ligament — attached to the ischium below the acetabulum, fused with the back of the capsule; supports the back of the capsule and limits excessive medial rotation
Expects: Ligamentum teres (round ligament of the head of femur) — a weak triangular band whose apex attaches to the fovea (pit) of the head of femur and whose base attaches to the acetabular notch and the transverse acetabular ligament; carries the passage of arteries to the head of femur
Expects: Transverse acetabular ligament — attached to both ends of the acetabular notch, converting it into a foramen for the passage of vessels and nerves to the hip joint
Expects: Labrum acetabulare — a fibrocartilaginous rim attached to the acetabular margins, blending with the transverse acetabular ligament
Concept: CON-MSK-FD892596698D24

## derived_from

## topic
Lower limb

## subtopic
Joints of the lower limb

## difficulty
Hard

## question_type
Anatomy

## main_concept
CON-MSK-FD892596698D24

## module
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > The Hip joint

## clinical_relevance
0.6

## academic_relevance
0.9

## cognitive_effort_score
0.65

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for
KAU_Y1

## concept_ids

## years
KAU_Y1

## universities
kau

## cognitive_effort
High

## setting
Academic

## reasoning_level
1

## inferred_difficulty
45

## exam_relevance
8

## contextual_concept_ids
CON-MSK-959D95DCE2E022 | CON-MSK-5B6B7F483BC112

## library_ids
ART-103-ANA-HIP-JOINT-STRUCTURE

## resource_ids
[clear]

## learning_objective
Name the three extracapsular ligaments of the hip joint with their attachments and the movement each limits, and the two further structures and the labrum inside the joint, with what each does.

## media_recommendations

## source_citation
Written Exam 103 (BMS - 103), EOY (BMS - 103) 198 Solved (1).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025 (batch 198), question 2, p1, {5 Marks}. Manifest src_4b8582402b55eae3bfd9. Blank twin src_22fdf028a1335432afdc, same page. Model answer read by rendering the solved twin's page 1 to a 150 dpi image; the overlay is absent from the cached text layer.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "2) Summaries Ligaments of hip joint {5 Marks}" — "Summaries" is the paper's own spelling, kept in the citation and corrected to "Summarise" in the question and title above. The rendered overlay answer numbers six ligaments, marking 1-3 "extracapsular"; it is reproduced in full in the mark scheme above.
This same content is already written out, word for word, in ART-103-ANA-HIP-JOINT-STRUCTURE's own "Structure" section (book pp.78-80) — the article existed before this concept did, minted for a different gap; this question is the first to test it directly.
contextual_concept_ids names the acetabular articular surface and labrum-attachment concepts: both are live records this question's own answer touches on (the labrum, the acetabular notch) without being the question's own focus.
resource_ids is empty because neither manifest source is a live resource record yet.

## estimated_seconds
360

## randomise_answers
no

---

# Item

## id
QST-103-ANA-198-03

## title
Gluteus maximus: attachment, nerve supply and action (2025/batch-198 sitting)

## subject
msk

## status
Draft

## owner
Claude

## vignette

## question
Give the attachment, nerve supply and action of gluteus maximus.

## format
structured_written

## written_parts
### (a) 5 marks
Give the attachment, nerve supply and action of gluteus maximus.
Expects: Origin — gluteal surface of the ilium behind the posterior gluteal line; back of the sacrum and coccyx; back of the sacrotuberous ligament
Expects: Insertion — superficial three-quarters into the posterior border of the iliotibial tract; deep one-quarter into the floor of the gluteal tuberosity
Expects: Nerve supply — inferior gluteal nerve
Expects: Action — extension, abduction and lateral rotation of the thigh; makes the iliotibial tract tight, keeping the knee extended in standing and walking
Expects: Gluteus maximus is ideal for intramuscular injection; to avoid sciatic nerve injury, the injection should be given in the upper outer quadrant of the buttock
Concept: CON-MSK-12FC6A14AE2740

## derived_from

## topic
Lower limb

## subtopic
The Gluteal Region

## difficulty
Moderate

## question_type
Anatomy

## main_concept
CON-MSK-12FC6A14AE2740

## module
103 BMS

## module_subject
103 BMS > Anatomy > The Gluteal Region > Muscles of the Gluteal Region

## clinical_relevance
0.6

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.65

## question_only_for
KAU_Y1

## concept_ids

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
1

## inferred_difficulty
55

## exam_relevance
9

## contextual_concept_ids

## library_ids
ART-103-ANA-GLUTEUS-MAXIMUS

## resource_ids
[clear]

## learning_objective
State the origin, insertion, nerve supply and action of gluteus maximus, and give the clinical reason its intramuscular injections are placed in the upper outer quadrant of the buttock.

## media_recommendations

## source_citation
Written Exam 103 (BMS - 103), EOY (BMS - 103) 198 Solved (1).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025 (batch 198), question 3, p2, {5 Marks}. Manifest src_4b8582402b55eae3bfd9. Blank twin src_22fdf028a1335432afdc, same page. Model answer read by rendering the solved twin's page 2 to a 150 dpi image; the overlay is absent from the cached text layer.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "3) Gluteus Maximus (Attachment, nerve supply & action) {5 Marks}". Same content as the 2021 sitting's gluteus maximus question (103-BMS-EOY-2021-anatomy-written.md, question 1); this is a different paper, sat by a different cohort, four sittings apart, examining the identical muscle in identical wording.
resource_ids is empty because neither manifest source is a live resource record yet.

## estimated_seconds
300

## randomise_answers
no

---

# Item

## id
QST-103-ANA-198-04

## title
Popliteal artery: beginning, end and branches

## subject
msk

## status
Draft

## owner
Claude

## vignette

## question
Give the beginning, end and branches of the popliteal artery.

## format
structured_written

## written_parts
### (a) 5 marks
Give the beginning, end and branches of the popliteal artery.
Expects: Origin, course and end — continuation of the femoral artery at the adductor magnus hiatus (junction of middle and lower thirds of thigh); enters the popliteal fossa lying on its floor as the deepest structure; ends below at the lower border of popliteus by dividing into the anterior and posterior tibial arteries
Expects: Muscular branches — to the hamstring and calf muscles
Expects: Five articular branches — superior and inferior medial genicular, superior and inferior lateral genicular, and middle genicular arteries
Expects: Terminal branches — anterior and posterior tibial arteries
Concept: CON-MSK-8E782A7460730E

## derived_from

## topic
Lower limb

## subtopic
Popliteal Fossa

## difficulty
Moderate

## question_type
Anatomy

## main_concept
CON-MSK-8E782A7460730E

## module
103 BMS

## module_subject
103 BMS > Anatomy > Popliteal Fossa > Popliteal Artery

## clinical_relevance
0.55

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.55

## question_only_for
KAU_Y1

## concept_ids

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
1

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids
CON-MSK-0696B3F764DABC

## library_ids
ART-103-ANA-POPLITEAL-ARTERY

## resource_ids
[clear]

## learning_objective
State the origin, course and termination of the popliteal artery, and enumerate its muscular, five articular and two terminal branches.

## media_recommendations

## source_citation
Written Exam 103 (BMS - 103), EOY (BMS - 103) 198 Solved (1).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025 (batch 198), question 4, p2, {5 Marks}. Manifest src_4b8582402b55eae3bfd9. Blank twin src_22fdf028a1335432afdc, same page. Model answer read by rendering the solved twin's page 2 to a 150 dpi image; the overlay is absent from the cached text layer.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "4) Popliteal artery (Beginning, End & Branches) {5 Marks}".
contextual_concept_ids names the posterior tibial artery: it is one of this artery's own two terminal branches, examined as its own SAQ elsewhere in this module, but not the focus of this question.
resource_ids is empty because neither manifest source is a live resource record yet.

## estimated_seconds
300

## randomise_answers
no

---

# Item

## id
QST-103-ANA-198-05

## title
Obturator nerve: origin and branches

## subject
msk

## status
Draft

## owner
Claude

## vignette

## question
Give the origin and branches of the obturator nerve.

## format
structured_written

## written_parts
### (a) 5 marks
Give the origin and branches of the obturator nerve.
Expects: Origin — lumbar plexus, ventral divisions of the anterior rami of L2, L3 and L4
Expects: Course — appears at the medial margin of psoas major, descends on the side of the pelvis with the obturator vessels, leaves through the obturator canal, reaching the medial compartment of the thigh, where it divides
Expects: Anterior division — passes above obturator externus, then between adductor longus and brevis; muscular branches to adductor longus, adductor brevis, gracilis (and pectineus, if present); articular branch to the hip joint; cutaneous branch to the lower part of the medial side of the thigh
Expects: Posterior division — pierces obturator externus, then passes between adductor brevis and magnus; muscular branches to obturator externus, adductor brevis and the pubic part of adductor magnus; articular branch to the knee joint
Concept: CON-MSK-6614EA58CFAF9C

## derived_from

## topic
Lower limb

## subtopic
The Thigh

## difficulty
Hard

## question_type
Anatomy

## main_concept
CON-MSK-6614EA58CFAF9C

## module
103 BMS

## module_subject
103 BMS > Anatomy > The Thigh > Obturator nerve

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.6

## exam_weight_by_year
KAU_Y1=0.55

## question_only_for
KAU_Y1

## concept_ids

## years
KAU_Y1

## universities
kau

## cognitive_effort
High

## setting
Academic

## reasoning_level
1

## inferred_difficulty
45

## exam_relevance
8

## contextual_concept_ids

## library_ids
ART-103-ANA-OBTURATOR-NERVE

## resource_ids
[clear]

## learning_objective
State the origin and course of the obturator nerve to the obturator canal, and give the muscular, articular and cutaneous branches of its anterior and posterior divisions separately.

## media_recommendations

## source_citation
Written Exam 103 (BMS - 103), EOY (BMS - 103) 198 Solved (1).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025 (batch 198), question 5, p3, {5 Marks}. Manifest src_4b8582402b55eae3bfd9. Blank twin src_22fdf028a1335432afdc, same page. Model answer read by rendering the solved twin's page 3 to a 150 dpi image; the overlay is absent from the cached text layer.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "5) Obturator nerve (Origin & Branches) {5 Marks}".
resource_ids is empty because neither manifest source is a live resource record yet.

## estimated_seconds
360

## randomise_answers
no

---

# Item

## id
QST-103-ANA-198-06

## title
Anomalies of the limbs

## subject
dev

## status
Draft

## owner
Claude

## vignette

## question
Enumerate the anomalies of limbs.

## format
short_answer

## written_parts
### (a) 5 marks
Enumerate the anomalies of limbs.
Expects: Meromelia — short limb
Expects: Amelia — complete limb absence
Expects: Brachydactyly — abnormally short digits
Expects: Syndactyly — fused two or three digits
Expects: Polydactyly — presence of an extra digit
Expects: Cleft hand or foot — two fingers (or toes) in either hand or foot
Concept: CON-DEV-7A9E2385A26A8B

## derived_from

## topic
Embryology

## subtopic
Congenital anomalies

## difficulty
Moderate

## question_type
Anatomy

## main_concept
CON-DEV-7A9E2385A26A8B

## module
103 BMS

## module_subject
103 BMS > Anatomy > Development of Limbs > Anomalies of limbs

## clinical_relevance
0.5

## academic_relevance
0.85

## cognitive_effort_score
0.45

## exam_weight_by_year
KAU_Y1=0.5

## question_only_for
KAU_Y1

## concept_ids

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
1

## inferred_difficulty
58

## exam_relevance
7

## contextual_concept_ids

## library_ids
ART-103-ANA-LIMB-DEVELOPMENT

## resource_ids
[clear]

## learning_objective
Name and define the six limb anomalies the department book lists, distinguishing absence, shortening and digit number or fusion defects.

## media_recommendations

## source_citation
Written Exam 103 (BMS - 103), EOY (BMS - 103) 198 Solved (1).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025 (batch 198), question 6, p3, {5 Marks}. Manifest src_4b8582402b55eae3bfd9. Blank twin src_22fdf028a1335432afdc, same page. Model answer read by rendering the solved twin's page 3 to a 150 dpi image; the overlay is absent from the cached text layer.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "6) Enumerate Anomalies of limbs {5 Marks}". This question was not in B7a-103-anatomy-questions.md's own skip table for this paper (that report counted this paper as "Q1-6" with the case folded into the sixth slot); reading the solved twin's own page 3 directly shows a separate, numbered sixth SAQ before the case. Authored here as an addition, using a concept (CON-DEV-7A9E2385A26A8B) already live in this file's own concept batch from an earlier authoring pass on the department book's "Anomalies of limbs" section — no new concept was needed.
The rendered overlay answer gives six named anomalies with a one-line definition each, exactly matching the live concept's own `definition` field; both sides of the two-column overlay layout were read (left column: meromelia, brachydactyly, polydactyly; right column: amelia, syndactyly, cleft hand or foot).
resource_ids is empty because neither manifest source is a live resource record yet.

## estimated_seconds
300

## randomise_answers
no

---

# Item

## id
QST-103-ANA-198-07

## title
Common peroneal nerve palsy after a fracture near the neck of the fibula (2025/batch-198 sitting)

## subject
msk

## status
Draft

## owner
Claude

## vignette
A 55-year-old man was accidentally kicked with a skate on the lateral surface of his right leg just inferior to the knee. Later he experienced numbness and tingling on the lateral surface of his leg and on the dorsum of his foot, and was unable to dorsiflex his right foot or his toes.

## question
Answer the four parts below about this patient's injury: the nerve involved, its relationship to the neck of the fibula, why sensation is lost in the leg, and the deformity that results.

## format
multipart_written

## written_parts
### (a) 1 mark
What nerve appears to have been injured?
Expects: The common peroneal nerve
Concept: CON-MSK-AB5318A9255811

### (b) 1 mark
What is the relationship of this nerve to the neck of the fibula?
Expects: It lies on the lateral aspect of the neck of the fibula
Concept: CON-MSK-AB5318A9255811
Depends on: a

### (c) 1 mark
Why is there loss of sensation in the leg?
Expects: Due to injury of its cutaneous branches
Concept: CON-MSK-0351AAD4CAB1EE
Depends on: a

### (d) 2 marks
Name the deformity resulting from the nerve injury.
Expects: Foot drop and inversion — talipes equinovarus
Concept: CON-MSK-016DE81C5919CE
Depends on: a

## derived_from

## topic
Lower limb

## subtopic
Popliteal Fossa

## difficulty
Challenging

## question_type
Diagnosis

## main_concept
CON-MSK-AB5318A9255811 | CON-MSK-0351AAD4CAB1EE | CON-MSK-016DE81C5919CE

## module
103 BMS

## module_subject
103 BMS > Anatomy > Popliteal Fossa > Common Peroneal Nerve (Lateral popliteal nerve)

## clinical_relevance
0.95

## academic_relevance
0.9

## cognitive_effort_score
0.8

## exam_weight_by_year
KAU_Y1=0.9

## question_only_for
KAU_Y1

## concept_ids

## years
KAU_Y1

## universities
kau

## cognitive_effort
High

## setting
Both

## reasoning_level
3

## inferred_difficulty
38

## exam_relevance
9

## contextual_concept_ids
CON-MSK-32B5B7A5CD2A27 | CON-MSK-C7BC26EBAF066B

## library_ids
ART-103-ANA-COMMON-PERONEAL-NERVE

## resource_ids
[clear]

## learning_objective
Localise a nerve injury from the bone fractured and the movements lost, explain the sensory loss, and name the resulting deformity.

## media_recommendations
### anatomy plate · Question stem
Brief: Lateral view of the right leg showing the common peroneal nerve winding around the neck of the fibula
Purpose: This printing asks only four of the five parts the 2022 sitting of the identical vignette asks (it omits the terminal-branches part); a single plate showing the nerve against the fibula neck answers parts (a) and (b) from one picture.
Priority: strongly helpful
Status: needed
Source direction: openly licensed anatomy atlas
Rights: must be CC-BY or public domain

## source_citation
Written Exam 103 (BMS - 103), EOY (BMS - 103) 198 Solved (1).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025 (batch 198), question 7 (case), p4. No marks are printed anywhere on the page for this case — confirmed on both the blank (src_22fdf028a1335432afdc) and solved (src_4b8582402b55eae3bfd9) copies of page 4, by rendering both to images; every other question on this paper prints its own mark, this one alone does not. Marks used here (1/1/1/2, totalling 5) are this file's own apportionment of the department's orientation total for a case ("1 case, 5 marks" — ORIENTATION 103 EOM AND EOY physiology (2) (1).pdf.pdf, manifest src_b8c531b4c8a1a2fe96e6, p1), not the examiner's own printed split. Model answer read by rendering the solved twin's page 4 to a 150 dpi image.

## attachments

## attached_image

## author_notes
MARKS NOT PRINTED, resolved via the department orientation rather than left blank, per this lane's own instruction. The paper prints "{5 Marks}" against every one of questions 1-6 on this same paper but nothing at all against this case — checked on both copies' page 4 by rendering to an image, not just the text layer. No other source in the corpus prints a mark for this specific case on this specific paper. The orientation's own total for "1 case" on this module (5 marks) is used as the case total; the 1/1/1/2 per-part split is an apportionment this file makes, not a printed scheme, on the same convention already used for the 2021 and 2022 sittings' own un-split case totals. A reviewer may prefer an even 1/1/1/2-or-otherwise split; the total of 5 is the only number with a citable source.
Verbatim from the paper: "7) Case: A 55 tears old man was accidentally kicked with a skate on the lateral surface of his right leg just inferior to the knee. Later he experienced numbness and tingling on the lateral surface of his leg and on the dorsum of his foot and unable to dorsiflex his right foot or his toes. a) What nerve appears to have been injured? b) What is the relationship of this nerve to the neck of the fibula? c) Why there is loss of sensation in the leg? d) Name the deformity resulting from the nerve injury?" ("tears" for "years" is the paper's own OCR-legible typo, kept in the citation, corrected in the vignette above.)
The rendered overlay answers: (a) "Common peroneal nerve" (b) "It lies on the lateral aspect of the neck of the fibula" (c) "Due to injury of its cutaneous branches" (d) "Foot drop and inversion (Talipus equinio varus)" — identical in substance and near-identical in wording to the 2022 sitting's parts (a)-(d) of the same vignette (103-BMS-EOY-2022-anatomy-written.md, question 4), which is why the same three concepts are reused rather than re-minted.
This printing has only four lettered parts, unlike the 2022 and 2025/batch-199 sittings of the identical vignette, which both add a fifth part asking for the nerve's terminal branches; that fifth part's concept, CON-MSK-C7BC26EBAF066B, is named in contextual_concept_ids because the scenario still depends on the common peroneal nerve's compartment-wide effect, but no written_parts item here tests it directly.
contextual_concept_ids also names peroneus longus (CON-MSK-32B5B7A5CD2A27): one of the muscles this injury paralyses, but not directly asked about.
resource_ids is empty because neither manifest source is a live resource record yet.

## estimated_seconds
300

## randomise_answers
no
