<!--
  103 BMS · Anatomy Section A of the 10/8/2021 Final Written Module Exam,
  as sittable written questions.

  Source: this sitting is embedded, not standalone. It is pages 1-16 of
  "EOY GATHERED 103 FINALS (answered) (1).pdf", manifest src_725217a3829e1dc009f7
  (61 pages, OCR-required, ocr_required in the manifest but page text is
  cached and readable), and it is re-scanned in full a second time at pages
  1-16 of "EOY GATHERED 103 exams (1).pdf", manifest src_f0eee47e545f3cbb996d
  (82 pages). Both are duplicates of the same paper; this file cites the
  61-page copy throughout. Neither manifest row carries a printed date, batch
  code or exam-sitting field of its own — the printed header on page 1 of the
  paper itself gives "Program/Course/Module Name: Biomedical Science Date:
  10/8/2021", "Program/Course/Module Code: BMS-103", "Type: Final Written
  Module Exam". No batch number is printed anywhere on the paper, so the
  batchCode+1827 sitting-year rule does not apply here; the year in this
  file's own name is the paper's own printed date, which the sitting-year
  rule says wins over a derived one when the two would conflict.

  The exam's own instructions state four sections: "Section A: 5 short answer
  questions and 2 cases" (Anatomy, 35 marks), Section B (Physiology), Section
  C (Biochemistry), Section D (Histology, MCQ + matching). Only Section A is
  this lane's scope. It printed 5 SAQs at 5 marks each and 2 problem-solving
  cases at 5 marks each (25 + 10 = 35, matching the Anatomy department's own
  orientation total of 35, though the orientation's own breakdown — "5 SAQ, 6
  marks each" plus "1 case, 5 marks" — does not match this paper's 5-mark SAQs
  and 2 cases either. Recorded, not resolved, same as the discrepancy already
  logged in 103-BMS-EOY-2025-anatomy-written.md for a different sitting.

  All 5 SAQs and both cases are now authored here. Questions 1-3
  (inversion/eversion of the foot, the sciatic nerve, and the knee-locking
  case) map onto concepts already live in concept/103-BMS-anatomy-concepts.md,
  minted while authoring a different paper's questions on the same anatomy.
  Questions 4-7 — gluteus maximus (attachments/nerve/action), the femoral
  sheath, the relations of the femoral artery in the femoral triangle and
  adductor canal, and the fractured-neck-of-femur case — were originally
  listed under MISSING CONCEPT in this lane's upstream report
  (B7a-103-anatomy-questions.md) and are authored here against the four new
  concepts minted for them in the same batch that added this file
  (CON-MSK-12FC6A14AE2740, CON-MSK-9D013840078D50, CON-MSK-5566B15D2C577E,
  CON-MSK-278D880DE7C3B0).

  OCR quality: the source PDF has no text layer (textLayer: none,
  processingStatus: ocr_required in the manifest) and the surrounding page
  furniture (a repeated Arabic-and-English document-control header/footer)
  OCRs as noise on every page. The question stems and model-answer paragraphs
  themselves OCR cleanly on every page checked. One exception: on the
  knee-locking case, parts (d) and (e) render as blank/garbled in the cached
  page text — the paper prints their answers in an italic font the OCR
  engine dropped on that page only. Both were confirmed by rendering the
  source PDF page to an image and reading it directly (page 6 of the 61-page
  file): "d. Name the ligament that prevent the hyperextension of knee. →
  Anterior cruciate ligament." / "e. Name the ligament that prevent sliding
  of femur forwards during flexion of knee. → Posterior cruciate ligament."
  Every other citation in this file was checked against the cached page text
  only; this one line item was checked against the rendered page image
  because the cache was blank there.

  Transcribed, not derived. `derived_from` is blank throughout, same
  reasoning as the sibling 2025-batch-199 file: these are the paper's own
  questions, and a written question may only be derived from another written
  question.

  Marks: the paper itself prints "(5 marks)" once for the whole knee-locking
  case, lettering five parts (a-e) without a per-letter split. The scheme
  below apportions 1 mark to each of the 5 parts so a student's total agrees
  with the 5 marks the paper printed for the case; the per-letter split is
  this file's apportionment, not the examiner's.

  Status: Draft throughout, same as every other Kasr written batch — these
  need a faculty reviewer before students sit them.

  Validate with the concept and article files named:

    npm run medical:batch -- docs/Kasr-Source-Imports/written/103-BMS-EOY-2021-anatomy-written.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-anatomy-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-anatomy.md

  Import: Admin › Bulk import → question, after the concept and article files.
-->

# Item

## id
QST-103-ANA-2021-01

## title
The anatomical basis of inversion and eversion of the foot

## subject
msk

## status
Draft

## owner
Claude

## vignette

## question
Explain the anatomical basis of the inversion of the foot: give its definition, the joints involved and the muscles producing it.

## format
structured_written

## written_parts
### (a) 5 marks
Explain the anatomical basis of the inversion of the foot: give its definition, the joints involved and the muscles producing it.
Expects: Inversion turns the sole medially, eversion turns the sole laterally
Expects: Joints involved — the subtalar joint and the talo-calcaneo-navicular joint
Expects: Mechanism — the talus is held fixed by the two malleoli, while the calcaneus and navicular swing round it, carrying the rest of the foot's bones with them
Expects: Muscles of inversion — tibialis anterior and tibialis posterior
Expects: Muscles of eversion — the three peroneal muscles, peroneus longus, brevis and tertius
Concept: CON-MSK-F5196760C3DB9C

## derived_from

## topic
Lower limb

## subtopic
Joints of the lower limb

## difficulty
Moderate

## question_type
Anatomy

## main_concept
CON-MSK-F5196760C3DB9C

## module
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > Inversion and Eversion of Foot

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.75

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
7

## contextual_concept_ids

## library_ids
ART-103-ANA-ANKLE-AND-INVERSION-EVERSION

## resource_ids
[clear]

## learning_objective
Define inversion and eversion of the foot, name the two joints at which they occur and the mechanism by which the talus stays fixed while the rest of the foot swings, and name the muscles that produce each movement.

## media_recommendations
### diagram · Question stem
Brief: Posterior view of the hindfoot showing the talus held between the two malleoli while the calcaneus and navicular swing medially (inversion) and laterally (eversion) beneath it, with tibialis anterior/posterior and the three peronei labelled on their respective sides
Purpose: The examiner's own answer turns on one mechanical idea — the talus stays put while the rest of the foot moves round it — and that idea is a motion, not a static fact a sentence states well. A single before/after diagram of the swing does the explaining a list of joint names does not.
Priority: strongly helpful
Status: needed
Source direction: openly licensed anatomy atlas or a redrawn schematic
Rights: must be CC-BY or public domain

## source_citation
EOY GATHERED 103 FINALS (answered) (1).pdf — Kasr Al Ainy, module 103 BMS, Final Written Module Exam dated 10/8/2021, Section A, question 2, p2, {5 Marks}. Manifest src_725217a3829e1dc009f7. Model answer typed inline on the same page (this paper carries its answers in the body of the OCR text, not as a separate solved twin). Re-scanned in full at src_f0eee47e545f3cbb996d, same page range.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "Explain the anatomical basis of the inversion of the foot (Def., joints and muscles). (5 marks)". The prompt above only spells out the three parts ("Def., joints and muscles") the examiner abbreviated.
This paper is not a blank exam scanned separately from a solved twin, the way the 198 and 199 sittings are — it is a single PDF with the model answer typed directly under each question, in the same page image. Confirmed against the rendered page: the answer text matches the cached page text exactly here.
concept_ids and contextual_concept_ids are empty: one concept, already live from a different paper's authoring pass, covers this question completely.

## estimated_seconds
300

## randomise_answers
no

---

# Item

## id
QST-103-ANA-2021-02

## title
The origin, relations and branches of the sciatic nerve

## subject
msk

## status
Draft

## owner
Claude

## vignette

## question
Mention the origin, relations and branches of the sciatic nerve.

## format
structured_written

## written_parts
### (a) 5 marks
Mention the origin, relations and branches of the sciatic nerve.
Expects: Origin — the sacral plexus (L4, L5, S1, S2, S3) in the pelvis
Expects: Course and end — leaves the pelvis via the greater sciatic foramen below piriformis to enter the gluteal region, then enters the back of the thigh midway between the greater trochanter and the ischial tuberosity, ending in the lower third of the thigh by dividing into the tibial and common peroneal nerves
Expects: Relations in the gluteal region — superficially gluteus maximus and the posterior cutaneous nerve of the thigh; deeply the back of the ischium, the obturator internus tendon with the two gemelli, and quadratus femoris
Expects: Relations in the back of the thigh — superficially the long head of biceps femoris; deeply adductor magnus
Expects: Muscular branches — tibial part to the long head of biceps femoris, semitendinosus, semimembranosus and the ischial part of adductor magnus; common peroneal part to the short head of biceps femoris
Expects: Articular branch to the hip joint
Expects: Terminal branches — the tibial (medial popliteal) nerve, larger, entering the popliteal fossa, and the common peroneal (lateral popliteal) nerve, smaller, entering the fossa lateral to the tibial nerve
Concept: CON-MSK-D622CBF981F879 | CON-MSK-51EC648BDAF36B

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
CON-MSK-D622CBF981F879 | CON-MSK-51EC648BDAF36B

## module
103 BMS

## module_subject
103 BMS > Anatomy > The Gluteal Region > Sciatic Nerve

## clinical_relevance
0.7

## academic_relevance
0.95

## cognitive_effort_score
0.55

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
Medium

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
9

## contextual_concept_ids

## library_ids
ART-103-ANA-SCIATIC-NERVE

## resource_ids
[clear]

## learning_objective
State the origin of the sciatic nerve, trace its relations in the gluteal region and the back of the thigh, and name its muscular, articular and terminal branches.

## media_recommendations

## source_citation
EOY GATHERED 103 FINALS (answered) (1).pdf — Kasr Al Ainy, module 103 BMS, Final Written Module Exam dated 10/8/2021, Section A, question 5, p5, {5 Marks}. Manifest src_725217a3829e1dc009f7. Model answer typed inline on the same page. Re-scanned in full at src_f0eee47e545f3cbb996d, same page range. Checked against the rendered page image; matches the cached page text exactly.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "Mention the origin, relations and branches of the sciatic nerve. (5 marks)".
The paper's own answer also names a clinical-points section (causes and effects of sciatic nerve injury, and sciatica) beyond what the question stem asks for. It is not folded into `written_parts` because the printed question asks only for origin, relations and branches — the injury material the paper adds is the answer sheet volunteering more than the mark scheme requires, not something this question tests.
Two concepts, both co-primary: the live concepts on this nerve split its course from its branches, the same division this question asks for, so both earn mastery evidence here.
The relations content (superficial/deep in the gluteal region and the back of the thigh) is not separately named by either live concept, but it is a small addition to what "course" already covers — the concept was minted from a different paper's course-and-branches question and simply did not need relations wording at the time. Flagged for a reviewer rather than treated as a fourth missing concept, since the two live concepts do carry the great majority of what this question tests.
resource_ids is empty because src_725217a3829e1dc009f7 is not a live resource record yet.

## estimated_seconds
360

## randomise_answers
no

---

# Item

## id
QST-103-ANA-2021-03

## title
Locking of the knee joint after a rotational injury

## subject
msk

## status
Draft

## owner
Claude

## vignette
During the course of a football game, a football player developed locking of the knee joint due to violent abduction and external rotation of the leg.

## question
Answer the five parts below about this player's knee: the structure most likely injured, two extracapsular ligaments of the joint, two muscles that flex it, and the two ligaments that check hyperextension and forward sliding of the femur.

## format
multipart_written

## written_parts
### (a) 1 mark
What is the most likely structure to be injured? Why?
Expects: The medial meniscus
Expects: It is fixed in position by its attachment to the capsule of the joint
Concept: CON-MSK-BBBD5662711A93

### (b) 1 mark
Name two extracapsular ligaments of the knee joint.
Expects: The medial (tibial) collateral ligament
Expects: The lateral (fibular) collateral ligament
Concept: CON-MSK-BBBD5662711A93

### (c) 1 mark
Name two muscles producing flexion of the knee joint.
Expects: Any two of semimembranosus, semitendinosus, biceps femoris, gracilis or sartorius
Concept: CON-MSK-9B1204D74AF4FF

### (d) 1 mark
Name the ligament that prevents hyperextension of the knee.
Expects: The anterior cruciate ligament
Concept: CON-MSK-9B1204D74AF4FF

### (e) 1 mark
Name the ligament that prevents the femur sliding forwards on the tibia during flexion of the knee.
Expects: The posterior cruciate ligament
Concept: CON-MSK-9B1204D74AF4FF
Depends on: d

## derived_from

## topic
Lower limb

## subtopic
Joints of the lower limb

## difficulty
Challenging

## question_type
Diagnosis

## main_concept
CON-MSK-BBBD5662711A93 | CON-MSK-9B1204D74AF4FF

## module
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > The Knee Joint

## clinical_relevance
0.85

## academic_relevance
0.85

## cognitive_effort_score
0.75

## exam_weight_by_year
KAU_Y1=0.8

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
40

## exam_relevance
8

## contextual_concept_ids

## library_ids
ART-103-ANA-KNEE-JOINT

## resource_ids
[clear]

## learning_objective
Localise a rotational knee injury to the medial meniscus from the mechanism described, name the joint's extracapsular ligaments and its flexors, and name the two cruciate ligaments by the single movement each one checks.

## media_recommendations
### anatomy plate · Question stem
Brief: Superior view of the tibial plateau showing the C-shaped medial meniscus fixed to the tibial collateral ligament and capsule against the more mobile, circular lateral meniscus, with the anterior and posterior cruciate ligaments crossing between the tibial spines
Purpose: Part (a) turns entirely on why the medial meniscus, and not the lateral one, is the one torn by this mechanism — its fixation to the capsule is what makes it liable to injury, and that fixation is a spatial fact a plate shows directly rather than a list a student has to hold in the abstract.
Priority: strongly helpful
Status: needed
Source direction: openly licensed anatomy atlas
Rights: must be CC-BY or public domain

## source_citation
EOY GATHERED 103 FINALS (answered) (1).pdf — Kasr Al Ainy, module 103 BMS, Final Written Module Exam dated 10/8/2021, Section A, problem-solving question II, p6, {5 Marks total across 5 lettered parts}. Manifest src_725217a3829e1dc009f7. Model answers from the same page; parts (d) and (e) confirmed by rendering the page to an image, since the cached OCR text is blank there (see file header). Re-scanned in full at src_f0eee47e545f3cbb996d, same page range.

## attachments

## attached_image

## author_notes
Marks: the paper prints "(5 marks)" once, for the whole case, and letters five parts without a per-letter split. The 1-mark-per-part scheme here apportions the printed total; it is this file's apportionment, not the examiner's own.
Verbatim from the paper: "During the course of a football game, a football player developed locking of the knee joint due to violent abduction and external rotation of the leg. (5 marks) a.What is the most likely structure to be injured? Why? b.Name two extracapsular ligaments of knee joint. c. Name 2 muscles producing flexion of knee joint. d.Name the ligament that prevent the hyperextension of knee. e.Name the ligament that prevent sliding of femur forwards during flexion of knee." The vignette and question above only fix grammar (subject-verb agreement, article use), not content.
Parts (d) and (e) are marked as depending on (d) for (e) only in the sense that both name a cruciate ligament by the single movement it checks — a student who has (d) right has already retrieved the pairing this question is testing and (e) asks for its mirror. They are not causally dependent the way the fibula-fracture case's parts are.
Two co-primary concepts: (a) and (b) are about the joint's own ligaments and menisci (CON-MSK-BBBD5662711A93); (c), (d) and (e) are about its movements and the locking mechanism (CON-MSK-9B1204D74AF4FF), which is where the two cruciates' individual functions are described.
resource_ids is empty because src_725217a3829e1dc009f7 is not a live resource record yet.

## estimated_seconds
360

## randomise_answers
no

---

# Item

## id
QST-103-ANA-2021-04

## title
Gluteus maximus: attachments, nerve supply and action (2021 sitting)

## subject
msk

## status
Draft

## owner
Claude

## vignette

## question
Give the attachments, nerve supply and action of the gluteus maximus muscle.

## format
structured_written

## written_parts
### (a) 5 marks
Give the attachments, nerve supply and action of the gluteus maximus muscle.
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
EOY GATHERED 103 FINALS (answered) (1).pdf — Kasr Al Ainy, module 103 BMS, Final Written Module Exam dated 10/8/2021, Section A, question 1, p1, {5 marks}. Manifest src_725217a3829e1dc009f7. Model answer typed inline on the same page (a table laid out across the page width; the cached OCR text reads it column by column rather than row by row, but every cell is present). Re-scanned in full at src_f0eee47e545f3cbb996d, same page range.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "1) Give the attachments, nerve supply and action of the gluteus maximus muscle. (5 marks)". Same content, wording and mark scheme as the gluteus maximus question already authored from the 2025/batch-198 sitting (written/103-BMS-EOY-2025-anatomy-written-2.md's question 3) — this is the same live concept, examined again in a different sitting, four years apart.
resource_ids is empty because neither manifest source (src_725217a3829e1dc009f7, src_f0eee47e545f3cbb996d) is a live resource record yet.

## estimated_seconds
300

## randomise_answers
no

---

# Item

## id
QST-103-ANA-2021-05

## title
The femoral sheath: site, shape, formation and contents

## subject
msk

## status
Draft

## owner
Claude

## vignette

## question
Describe the anatomy of the femoral sheath: its site, shape, formation and contents.

## format
structured_written

## written_parts
### (a) 5 marks
Describe the anatomy of the femoral sheath: its site, shape, formation and contents.
Expects: A funnel-shaped extension of the deep fascia of the abdomen, surrounding the upper 3-4 cm of the femoral vessels
Expects: Walls — anterior wall is an extension of the fascia transversalis; posterior wall is an extension of the fascia iliaca
Expects: Three compartments — lateral compartment contains the femoral artery and the femoral branch of the genitofemoral nerve
Expects: Intermediate compartment contains the femoral vein
Expects: Medial compartment (the femoral canal), shorter than the other two, contains a lymph node, lymph vessels and fat
Concept: CON-MSK-9D013840078D50

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
CON-MSK-9D013840078D50

## module
103 BMS

## module_subject
103 BMS > Anatomy > The Thigh > Femoral Triangle

## clinical_relevance
0.55

## academic_relevance
0.85

## cognitive_effort_score
0.5

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
55

## exam_relevance
7

## contextual_concept_ids
CON-MSK-BBFDC0AC14A819

## library_ids
ART-103-ANA-FEMORAL-TRIANGLE

## resource_ids
[clear]

## learning_objective
Describe the site, shape and formation of the femoral sheath, and name its three compartments and what each contains.

## media_recommendations

## source_citation
EOY GATHERED 103 FINALS (answered) (1).pdf — Kasr Al Ainy, module 103 BMS, Final Written Module Exam dated 10/8/2021, Section A, question 3, p3, {5 marks}. Manifest src_725217a3829e1dc009f7. Model answer typed inline on the same page. Re-scanned in full at src_f0eee47e545f3cbb996d, same page range.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "3) Describe the anatomy of the femoral sheath (site, shape, formation and contents). (5 marks)".
contextual_concept_ids names the femoral-triangle-contents concept: the sheath is one of the triangle's own four contents, examined as its own SAQ in the 2025/batch-198 sitting, but this question asks for the sheath alone, in more structural detail (walls, three compartments) than that other question's answer needs.
resource_ids is empty because neither manifest source is a live resource record yet.

## estimated_seconds
300

## randomise_answers
no

---

# Item

## id
QST-103-ANA-2021-06

## title
Relations of the femoral artery in the femoral triangle and adductor canal

## subject
msk

## status
Draft

## owner
Claude

## vignette

## question
Give the relations of the femoral artery in the femoral triangle and adductor canal.

## format
structured_written

## written_parts
### (a) 5 marks
Give the relations of the femoral artery in the femoral triangle and adductor canal.
Expects: In the femoral triangle — anteriorly, skin, fascia and the femoral sheath; posteriorly, iliopsoas, pectineus and adductor longus; laterally, the femoral nerve, saphenous nerve and femoral branch of the genitofemoral nerve; medially, the femoral vein (upper part of the triangle)
Expects: In the adductor canal — anteriorly, the fibrous roof of the canal and sartorius; posteriorly, adductor longus, then adductor magnus, and the femoral vein (upper part of the canal)
Expects: In the adductor canal — laterally, vastus medialis and its nerve, and the saphenous nerve (upper part of the canal); medially, the saphenous nerve (lower part of the canal)
Expects: Origin — at the mid-inguinal point, as the continuation of the external iliac artery; course — superficial in the upper half (femoral triangle), deep in the lower half (adductor canal), with its upper 1.5 inches enclosed with the femoral vein in the femoral sheath; end — at the adductor hiatus, entering the popliteal fossa as the popliteal artery
Concept: CON-MSK-5566B15D2C577E

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
CON-MSK-5566B15D2C577E

## module
103 BMS

## module_subject
103 BMS > Anatomy > The Thigh > Femoral Artery

## clinical_relevance
0.55

## academic_relevance
0.9

## cognitive_effort_score
0.7

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
40

## exam_relevance
8

## contextual_concept_ids
CON-MSK-FA04285EAA90F7 | CON-MSK-59755B64721E3D

## library_ids
ART-103-ANA-FEMORAL-ARTERY

## resource_ids
[clear]

## learning_objective
Give the four-aspect relations of the femoral artery separately for the femoral triangle and for the adductor canal, naming what changes between the two.

## media_recommendations

## source_citation
EOY GATHERED 103 FINALS (answered) (1).pdf — Kasr Al Ainy, module 103 BMS, Final Written Module Exam dated 10/8/2021, Section A, question 4, p4, {5 marks}. Manifest src_725217a3829e1dc009f7. Model answer typed inline on the same page, laid out as a two-column table (triangle left, canal right); both columns are read into the mark scheme above. Re-scanned in full at src_f0eee47e545f3cbb996d, same page range.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "4) Give the relations of the femoral artery in the femoral triangle and adductor canal. (5 marks)".
contextual_concept_ids names the live femoral-triangle-anterior-relations concept and the adductor-canal boundaries concept: both are narrower, partial matches for this same territory (see this concept's own field_notes for why none of the four narrower live records was merged into it).
resource_ids is empty because neither manifest source is a live resource record yet.

## estimated_seconds
360

## randomise_answers
no

---

# Item

## id
QST-103-ANA-2021-07

## title
Fracture of the neck of the femur in an elderly patient

## subject
msk

## status
Draft

## owner
Claude

## vignette
A grandmother slipped on the floor. Her right lower limb was laterally rotated and noticeably shorter than her left limb. She was unable to get up or lift her limb off the floor.

## question
Answer the four parts below about this patient's injury: the common fracture site, why the bone is fragile at that site in elderly people, why the limb is shortened, and the fracture's common complications and why they occur.

## format
multipart_written

## written_parts
### (a) 1 mark
What is the common fracture site of the femur in elderly people?
Expects: Fracture of the neck of the femur
Concept: CON-MSK-278D880DE7C3B0

### (b) 1 mark
Why is this part of the bone so fragile in elderly people?
Expects: Due to osteoporosis of old age — bone resorption is greater than bone formation
Concept: CON-MSK-278D880DE7C3B0
Depends on: a

### (c) 1 mark
Why was her injured limb shorter than the other one?
Expects: The shortening results from the upward pull of the muscles connecting the femur to the hip bone, once the fractured neck no longer holds the fragments as a rigid strut
Concept: CON-MSK-278D880DE7C3B0
Depends on: a

### (d) 2 marks
What are the complications commonly associated with these fractures, and why?
Expects: Nonunion and avascular necrosis of the head of the femur
Expects: Due to the poor blood supply of the femoral head and neck, chiefly carried by the retinacular vessels in the capsule's own fibres, which the fracture disrupts
Concept: CON-MSK-278D880DE7C3B0
Depends on: a

## derived_from

## topic
Lower limb

## subtopic
Joints of the lower limb

## difficulty
Challenging

## question_type
Diagnosis

## main_concept
CON-MSK-278D880DE7C3B0

## module
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > The Hip joint

## clinical_relevance
0.85

## academic_relevance
0.7

## cognitive_effort_score
0.75

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
Both

## reasoning_level
3

## inferred_difficulty
42

## exam_relevance
8

## contextual_concept_ids
CON-MSK-FD892596698D24

## library_ids
ART-103-ANA-HIP-JOINT-STRUCTURE

## resource_ids
[clear]

## learning_objective
Given a description of a fall in an elderly patient with a laterally rotated, shortened limb, identify the neck of the femur as the fracture site, explain why the bone is fragile there, explain the shortening, and name the fracture's common complications and why they occur.

## media_recommendations
### anatomy plate · Question stem
Brief: Coronal section of the proximal femur showing the neck of femur, the capsule's posterior attachment stopping short of the intertrochanteric crest, and the retinacular vessels running up the neck within the capsule's own fibres
Purpose: Part (d) turns on the same retinacular blood supply the hip joint's own structure article describes; a single labelled section that shows the vessels running in the capsule along the neck makes the nonunion/avascular-necrosis mechanism visible rather than a fact to memorise in isolation.
Priority: strongly helpful
Status: needed
Source direction: openly licensed anatomy atlas
Rights: must be CC-BY or public domain

## source_citation
EOY GATHERED 103 FINALS (answered) (1).pdf — Kasr Al Ainy, module 103 BMS, Final Written Module Exam dated 10/8/2021, Section A, problem-solving question I, p6, {5 marks total across 4 lettered parts}. Manifest src_725217a3829e1dc009f7. Model answers from the same page; part (a)'s answer confirmed by rendering the page to an image, since the cached OCR text is blank for that one line only (the case's other three answers OCR cleanly). Re-scanned in full at src_f0eee47e545f3cbb996d, same page range.

## attachments

## attached_image

## author_notes
Marks: the paper prints "(5 marks)" once for the whole case and letters four parts without a per-letter split. This file apportions 1/1/1/2 across the four parts so the total agrees with the paper's own printed five; it is this file's own apportionment, not the examiner's.
Verbatim from the paper: "I) A grandmother slipped on the floor. Her right lower limb was laterally rotated and noticeably shorter than her left limb. She was unable to get up or lift her limb off the floor. (5 marks) a. What is the common fracture site of the femur in elderly people. b. Why this part of bone so fragile on elderly people. c. Why her injures limb was shorter than the other one. d. What are the complications commonly associated with these fractures? and Why?" The vignette and question above only fix grammar (subject-verb agreement, article use), not content.
The rendered overlay answers: (a) "Fracture neck femur" (b) "Due to osteoporosis of old age (bone absorption is grater than bone formation)" (c) "The shortening of the lower limb results from upward pull of the muscles connecting the femur to his hip bone" (d) "Nonunion and avascular necrosis of head of femur. Due to its poor blood [supply]" — "grater" and "his" are the paper's own spelling, kept in the citation.
Part (a)'s own expected answer ("fracture neck femur") is stated by the exam paper directly and is also the department book's own section heading for this clinical point (p81); it does not depend on model knowledge.
The book itself (p78, p81) states only the osteoporosis point and the retinacula's role in keeping fragments in position; the shortening mechanism (c) and the two named complications (d) are the paper's own model answer, since the book does not state them by name — recorded in this concept's own `uncertainty` field, not treated as a source conflict.
resource_ids is empty because neither manifest source is a live resource record yet.

## estimated_seconds
360

## randomise_answers
no
