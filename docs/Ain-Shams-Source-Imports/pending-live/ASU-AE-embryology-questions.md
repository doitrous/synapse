<!--
  ASU-AE · Embryology, Embryo 2 deferred cluster — 25 MCQs authored against 13 Kasr
  101-ISK / Alexandria AU-MED-102 embryology concepts (both modules live in production
  since 2026-08-27, per docs/chief-of-staff/BOARD.md's ~13:55 and ~14:16 entries that day).
  This checkout's own extraction snapshot (server/data/medical-library-v1.json,
  generatedAt: 2026-08-11) predates that import and does not contain these concept ids —
  expected staleness per 00-START-HERE.md §8, not evidence the dependency is missing —
  so this file stays in pending-live/ rather than question/, same convention as
  pending-live/ASU-IBM-biochem-mcq-overlay-concepts.md. Apply only after the
  pending-live/ASU-AE-embryology-overlay-concepts.md sparse concept overlay (same 13 ids)
  is applied, and after re-confirming the two source concept files are live.

  Source: "MCQs - Embryo 2.pdf" (src_a7e3b821ab294015c05f). 47 printed rows were deferred
  last pass (docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-EMBRYO2-deferred-pending-concepts.md);
  25 are authored here (one to three representative MCQs per concept), 22 held as
  duplicates of an authored row testing the same fact — see
  docs/Ain-Shams-Source-Imports/coverage/seeds/ASU-AE/ for the seeds and held-row reasons,
  and coverage/ASU-AE-LEDGER.md for the roll-up. Five seed files (one per module_subject
  block, grouped so each shares one library_ids set) feed this single combined batch:
  embryo2-deferred-firstweek.json, -secondweek.json, -gametes.json, -fetalmembranes.json,
  -aumed102.json.

  Import: Admin › Bulk import → question, only after the concept overlay above is live.
-->

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FIRSTWEEK-Q42

## title
Where does fertilisation normally occur?

## question
Normal site of fertilization is:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
C

## answer_a
Fundus of uterus.

## explanation_a
Incorrect. The fundus of the uterus is where implantation later lands, not where the sperm and secondary oocyte meet -- fertilisation happens well upstream of the uterine cavity.

## answer_b
Medial part of uterine tube.

## explanation_b
Incorrect. The medial (isthmic) part of the uterine tube is narrower and closer to the uterus; the oocyte is fertilised before it reaches this segment.

## answer_c
Lateral part of uterine tube.

## explanation_c
Correct. Fertilisation occurs in the ampulla, the widest and longest part of the uterine tube, in its lateral third near the ovary -- it is here that the secondary oocyte, released at ovulation, meets and fuses with a capacitated sperm to form the zygote. The ampulla's wide lumen and ciliated, secretory lining give the gametes time and the right environment to meet, and the fertilised zygote then begins cleavage as it is carried toward the uterus. This is the single most heavily tested fact in this concept's exam signal across both the Kasr and ASU papers, asked from several different angles.

## answer_d
On surface of ovary.

## explanation_d
Incorrect. The surface of the ovary is where the secondary oocyte is released at ovulation, before it is picked up by the fimbriae of the uterine tube -- fertilisation itself occurs later, inside the tube.

## answer_e
Body of uterus.

## explanation_e
Incorrect. The body of the uterus is where the blastocyst implants about a week later; fertilisation itself is a tubal event, not a uterine one.

## topic
Embryology - fertilisation

## subtopic
Site of fertilisation

## main_concept
CON-DEV-F33BB68138377B

## concept_ids
CON-DEV-F33BB68138377B

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-FERTILIZATION | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that fertilisation occurs in the ampulla, the lateral third of the uterine tube.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q42, answer key p.14 row 42 = c

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FIRSTWEEK-Q38

## title
Which is NOT a result of fertilisation?

## question
Results of fertilization include all the following EXCEPT:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
E

## answer_a
Restoration of diploid number of chromosomes.

## explanation_a
Incorrect as an answer to this EXCEPT question -- restoring the diploid (46-chromosome) number by combining the haploid sperm and oocyte nuclei is one of fertilisation's own results, so it is a true statement here, not the exception.

## answer_b
Initiation of cleavage.

## explanation_b
Incorrect as an answer -- fertilisation's own definition includes that it initiates cleavage, so this is a true statement of what fertilisation does, not the exception being asked for.

## answer_c
Completion of 2nd meiotic division.

## explanation_c
Incorrect as an answer -- sperm entry is exactly what triggers the secondary oocyte to complete its arrested second meiotic division, so this is a true, direct result of fertilisation.

## answer_d
Extrusion of 2nd polar body.

## explanation_d
Incorrect as an answer -- completing the second meiotic division releases the second polar body, so this too is a true, direct result of fertilisation and not the exception.

## answer_e
Beginning of implantation.

## explanation_e
Correct. Fertilisation's four results, by this concept's own definition, are zygote formation, sex determination, restoration of the diploid number, and the start of cleavage with migration toward the uterine cavity -- implantation is not among them. Implantation is a separate, later event that begins only on about the seventh day after fertilisation, once the blastocyst has formed and travelled to the uterine cavity, so calling it a direct result of fertilisation conflates two different stages of the first week. Every other listed item (diploid restoration, cleavage initiation, completing meiosis II, extruding the second polar body) is a genuine, immediate consequence of sperm-oocyte fusion, which is exactly what makes 'beginning of implantation' the one false statement in this EXCEPT list.

## topic
Embryology - fertilisation

## subtopic
Results of fertilisation

## main_concept
CON-DEV-F33BB68138377B

## concept_ids
CON-DEV-F33BB68138377B

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-FERTILIZATION | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
List the four direct results of fertilisation and recognise that implantation is a later, separate event.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q38, answer key p.14 row 38 = e

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FIRSTWEEK-Q37

## title
Which stage implants into the uterus?

## question
The stage that implants into the uterus is:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
B

## answer_a
Morula.

## explanation_a
Incorrect. The morula is the solid, 16-cell ball that precedes the blastocyst -- it has not yet developed the blastocele cavity or the trophoblast/embryoblast split that implantation depends on.

## answer_b
Blastocyst.

## explanation_b
Correct. Once the morula's zona pellucida degenerates and uterine fluid enters, the cells reorganise into a wall of trophoblast around a fluid-filled blastocele with the embryoblast at one pole -- this is the blastocyst, and it is by its embryonic pole (the trophoblast overlying the embryoblast) that it adheres to and begins implanting into the endometrium, normally in the posterior wall of the uterine fundus, at the end of the first week. Naming the stage correctly matters clinically and academically because every implantation event -- adhesion, syncytiotrophoblast invasion, lacunar formation -- is described as something the blastocyst does, never the morula or an earlier stage. This is one of the most repeated single facts across this exam bank's cleavage and implantation questions.

## answer_c
2 cell stage.

## explanation_c
Incorrect. The 2-cell stage is the very first cleavage division, roughly a day after fertilisation -- far too early and structurally unready for implantation.

## answer_d
4 cell stage.

## explanation_d
Incorrect. The 4-cell stage is an early cleavage stage on about the second day, still inside the zona pellucida with no trophoblast or blastocele formed yet.

## answer_e
Zygote.

## explanation_e
Incorrect. The zygote is the single fertilised cell before any cleavage division has occurred, so it has none of the structural features (trophoblast wall, blastocele, embryonic pole) that implantation requires.

## topic
Embryology - implantation

## subtopic
Blastocyst structure

## main_concept
CON-DEV-28CF4D241BE607

## concept_ids
CON-DEV-28CF4D241BE607

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-FERTILIZATION | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
Identify the blastocyst as the stage that implants, distinguishing it from earlier cleavage stages.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q37, answer key p.14 row 37 = b

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FIRSTWEEK-Q64

## title
What happens during implantation of the blastocyst?

## question
During implantation, the blastocyst:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
E

## answer_a
Implants in the body of the uterus.

## explanation_a
Incomplete as a standalone answer, but true in the general sense intended here -- the normal implantation site is the posterior wall of the body of the uterus, near the fundus -- which is why it is folded into the composite "all of the above" answer rather than excluded as false.

## answer_b
Causes a change in the endometrial tissues.

## explanation_b
Incomplete as a standalone answer, but true -- as the syncytiotrophoblast erodes the endometrium, the endometrial stroma itself reacts (the decidual reaction), so implantation does cause a change in the endometrial tissue, making this one of the true sub-statements bundled into the composite answer.

## answer_c
Implants in the endometrium.

## explanation_c
Incomplete as a standalone answer, but true -- the blastocyst becomes embedded in the superficial layers of the endometrium, which is the definition of implantation, so this sub-statement is also correct on its own.

## answer_d
Is implanted at its embryonic pole.

## explanation_d
Incomplete as a standalone answer, but true -- adhesion and invasion both begin at the embryonic pole, the trophoblast overlying the embryoblast, which is why this sub-statement is also correct.

## answer_e
All of the above.

## explanation_e
Correct. Each of the first four statements is individually true of implantation -- it happens in the body of the uterus, it changes the endometrial tissue, it is embedding in the endometrium, and it proceeds by the embryonic pole -- so the composite "all of the above" is the only option that does not drop one of these genuine features. Questions written this way are testing whether the student can hold the whole implantation picture together rather than picking one true fact and missing that the others are equally true. Recognising an "all of the above" answer as correct requires checking every sub-statement individually against the concept, not just spotting one obviously true item and stopping there.

## topic
Embryology - implantation

## subtopic
Blastocyst implantation behaviour

## main_concept
CON-DEV-28CF4D241BE607

## concept_ids
CON-DEV-28CF4D241BE607

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-FERTILIZATION | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
Recognise the several true features of blastocyst implantation together, not just one in isolation.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.15.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q64, answer key p.15 row 64 = e

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FIRSTWEEK-Q30

## title
When does the morula reach the uterine cavity?

## question
On what day does the morula reach the uterine cavity after fertilization?

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
A

## answer_a
4th day.

## explanation_a
Correct. Cleaving from 2 to 4 to 8 blastomeres over the first three days, the zygote becomes a 16-cell morula inside the uterine tube by the third day, and tubal peristalsis, ciliary beating and tubal mucus together carry it into the uterine cavity, which it reaches on the fourth day -- while the zona pellucida is still intact around it. This four-day figure is one of the most heavily tested single numbers in this whole embryology bank, and it is easy to confuse with implantation's own day-6/day-7/day-11 timeline, which belongs to the blastocyst stage a few days later, not the morula's arrival.

## answer_b
7th day.

## explanation_b
Incorrect. The seventh day is when the blastocyst -- not the morula -- begins adhering to the endometrium; the morula has already reached the uterine cavity and transformed into a blastocyst well before this day.

## answer_c
9th day.

## explanation_c
Incorrect. The ninth day belongs to the second week's implantation timetable (complete embedding, Heuser's membrane, lacunar spaces), not to the morula's arrival in the uterine cavity, which happens earlier.

## answer_d
8th day.

## explanation_d
Incorrect. The eighth day is when the bilaminar disc and amniotic cavity form, well after the morula has already reached the uterine cavity and turned into a blastocyst.

## answer_e
10th day.

## explanation_e
Incorrect. The tenth day is deep into the second week's implantation events; the morula reaches the uterine cavity days earlier, on the fourth day.

## topic
Embryology - cleavage

## subtopic
Morula timing

## main_concept
CON-DEV-F5A87FDF5D911C

## concept_ids
CON-DEV-F5A87FDF5D911C

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
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-FERTILIZATION | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that the morula reaches the uterine cavity on the fourth day after fertilisation.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q30, answer key p.14 row 30 = a

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FIRSTWEEK-Q12

## title
What stops the cleaving zygote from enlarging?

## question
Enlargement of the cleaving zygote is prevented by:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
B

## answer_a
Corona radiata.

## explanation_a
Incorrect. The corona radiata is the outer layer of follicular cells around the ovulated oocyte, held together by hyaluronic acid -- it is shed before or during fertilisation and plays no role in bounding the later cleaving zygote.

## answer_b
Zona pellucida.

## explanation_b
Correct. The zona pellucida is the tough glycoprotein coat that surrounds the zygote and holds the daughter cells (blastomeres) together as they compact through successive cleavage divisions -- because the zona does not expand, the cells get progressively smaller with each division instead of the whole embryo growing larger, and it is only after the morula reaches the uterine cavity that the zona begins to degenerate, at the end of the fifth day. This is exactly the trap this concept's own pitfall note flags: students confuse when the zona is lost with the blastocyst's other features, but the zona pellucida itself is what keeps the dividing zygote at a constant overall size throughout cleavage.

## answer_c
Vitelline membrane.

## explanation_c
Incorrect. The vitelline membrane is not the structure this exam bank's own concept uses for this role -- it is the zona pellucida, not a separate vitelline membrane, that bounds the human cleaving zygote.

## answer_d
Fallopian tube.

## explanation_d
Incorrect. The Fallopian (uterine) tube is the passageway the morula travels through, not the physical boundary preventing individual blastomeres from spreading apart.

## answer_e
Follicular cells.

## explanation_e
Incorrect. Follicular cells make up the corona radiata around the oocyte before fertilisation; like the corona radiata itself, they are shed early and are not what constrains the later cleaving zygote.

## topic
Embryology - cleavage

## subtopic
Zona pellucida during cleavage

## main_concept
CON-DEV-F5A87FDF5D911C

## concept_ids
CON-DEV-F5A87FDF5D911C

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-FERTILIZATION | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that the zona pellucida prevents the cleaving zygote from enlarging.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.13.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q12, answer key p.13 row 12 = b

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FIRSTWEEK-Q59

## title
Which statement about the blastocyst is FALSE?

## question
As regards the blastocyst, all the following statements are true EXCEPT:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
B

## answer_a
It is the stage that implants in the uterus.

## explanation_a
Incorrect as an answer to this EXCEPT question -- the blastocyst genuinely is the stage that implants into the uterus, so this statement is true and not the exception.

## answer_b
It is surrounded by zona pellucida until after implantation.

## explanation_b
Correct. The zona pellucida degenerates at the end of the fifth day, once the morula has already arrived in the uterine cavity and reorganised into a blastocyst -- implantation itself only begins on the seventh day, so by the time adhesion starts the zona is already gone, not still present until after implantation. This is precisely the trap this concept's own pitfall note warns about: attaching a feature that belongs to the morula/cleavage stage (the intact zona) onto the later blastocyst/implantation stage. Every other statement in this list -- that the blastocyst implants, that its inner cell mass forms the embryo, that its outer trophoblast will contribute to the fetal placenta, and that it implants by its embryonic pole -- is true of the blastocyst, which is what makes the zona-timing statement the one false item.

## answer_c
Its inner mass forms the embryo.

## explanation_c
Incorrect as an answer -- the inner cell mass (embryoblast) genuinely does go on to form the embryo proper, so this statement is true and not the exception.

## answer_d
Its outer cell mass forms the fetal part of the placenta.

## explanation_d
Incorrect as an answer -- the outer cell mass (trophoblast) genuinely does contribute to the fetal part of the placenta via the chorion, so this statement is true and not the exception.

## answer_e
It implants by its embryonic pole.

## explanation_e
Incorrect as an answer -- the blastocyst genuinely does implant by its embryonic pole, the side where the trophoblast overlies the embryoblast, so this statement is true and not the exception.

## topic
Embryology - cleavage

## subtopic
Zona pellucida timing versus implantation

## main_concept
CON-DEV-F5A87FDF5D911C

## concept_ids
CON-DEV-F5A87FDF5D911C

## contextual_concept_ids
CON-DEV-28CF4D241BE607

## difficulty
Hard

## question_type
Classification

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-FERTILIZATION | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
Distinguish when the zona pellucida degenerates (end of the fifth day) from when implantation begins (the seventh day).

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.15.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q59, answer key p.15 row 59 = b

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FIRSTWEEK-Q2

## title
Where does placenta praevia form?

## question
Placenta praevia results from implantation of the blastocyst in the:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
E

## answer_a
Pelvic peritoneum.

## explanation_a
Incorrect. Implantation on the pelvic peritoneum is a form of ectopic (extrauterine) pregnancy, not placenta praevia, which is by definition an intrauterine abnormality of where in the uterus implantation happens.

## answer_b
Medial part of uterine tube.

## explanation_b
Incorrect. The medial part of the uterine tube is a tubal ectopic-pregnancy site, not a uterine one, so it cannot produce placenta praevia, which is specifically an intrauterine implantation abnormality.

## answer_c
Lateral part of uterine tube.

## explanation_c
Incorrect. The lateral part of the uterine tube is the ampulla, the normal fertilisation site, not an implantation site at all, and certainly not the uterus.

## answer_d
Upper part of the uterus.

## explanation_d
Incorrect. Implantation in the upper part of the uterus (the fundus) is the normal site, not an abnormal one -- it is exactly the opposite of what produces placenta praevia.

## answer_e
Lower part of the uterus.

## explanation_e
Correct. Placenta praevia is abnormal intrauterine implantation in the lower uterine segment, where the placenta comes to lie in relation to the internal cervical os -- in complete/total, partial and marginal forms depending on how much of the os it covers. Because the placenta then sits over or near the birth canal, this is clinically important as a cause of painless antepartum bleeding and can obstruct normal vaginal delivery. It is the low uterine location, not the ovary, tube or peritoneum, that distinguishes placenta praevia from the ectopic-pregnancy sites tested in this same paper's other rows.

## topic
Embryology - abnormal implantation

## subtopic
Placenta praevia

## main_concept
CON-DEV-89FC3BBB3C9BCE

## concept_ids
CON-DEV-89FC3BBB3C9BCE

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-FERTILIZATION | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that placenta praevia is implantation in the lower uterine segment.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.13.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q2, answer key p.13 row 2 = e

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FIRSTWEEK-Q32

## title
What is placenta praevia marginalis?

## question
Placenta praevia marginalis:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
B

## answer_a
Is formed of 2 or 3 parts.

## explanation_a
Incorrect. Being formed of two or three lobes describes a bilobed or tripartite placenta, an entirely different structural variant, not the marginal subtype of placenta praevia, which is defined by how close its edge lies to the internal os.

## answer_b
Covers internal os partially.

## explanation_b
Correct. This concept's own classification places placenta praevia along a spectrum by how much of the internal cervical os the low-lying placenta covers -- complete/total (covers it entirely), partial, and marginal, where the placental edge only touches or partially encroaches on the os rather than covering it completely. Marginalis is the mildest end of that spectrum, distinguishing it from the complete/total form, which fully covers the os and carries a higher bleeding and obstruction risk. Getting the marginalis-versus-total distinction right matters clinically because it changes the delivery plan, not just the label.

## answer_c
Covers internal os completely.

## explanation_c
Incorrect. Covering the internal os completely is the definition of placenta praevia totalis/completa, not marginalis -- the two terms sit at opposite ends of the same praevia spectrum.

## answer_d
Lies near fundus of uterus.

## explanation_d
Incorrect. Placenta praevia by definition lies in the lower uterine segment, not near the fundus -- a fundal placenta is not praevia at all, marginal or otherwise.

## answer_e
Has umbilical cord attached to its margin.

## explanation_e
Incorrect. Having the umbilical cord attached to the placental margin describes battledore placenta, a separate cord-insertion anomaly tested elsewhere in this same paper, not placenta praevia marginalis, which is about the placenta's relation to the internal os.

## topic
Embryology - abnormal implantation

## subtopic
Placenta praevia subtypes

## main_concept
CON-DEV-89FC3BBB3C9BCE

## concept_ids
CON-DEV-89FC3BBB3C9BCE

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-FERTILIZATION | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
Distinguish placenta praevia marginalis (partial coverage) from the complete/total form.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q32, answer key p.14 row 32 = b

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-SECONDWEEK-Q4

## title
When is implantation of the blastocyst completed?

## question
Implantation of blastocyst is completed in which post-fertilization day?

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
D

## answer_a
5th.

## explanation_a
Incorrect. The fifth day is before implantation even begins -- it is the day the zona pellucida finishes degenerating around the already-arrived blastocyst, not a day within the implantation process itself.

## answer_b
7th.

## explanation_b
Incorrect. The seventh day is when implantation begins, with the blastocyst adhering by its embryonic pole and the trophoblast starting to split into cytotrophoblast and syncytiotrophoblast -- it is the start of the process, not its completion.

## answer_c
9th.

## explanation_c
Incorrect. By the ninth day the blastocyst is completely embedded and the breach in the surface epithelium is plugged by a fibrin clot, but the epithelium has not yet grown back over that clot -- that final step is what completion requires.

## answer_d
11th.

## explanation_d
Correct. This concept's own day-by-day timetable places implantation's start at adhesion on day 7 and its completion on days 11-12, when the endometrial epithelium has grown back over the fibrin clot that plugged the original breach, the lacunar spaces in the syncytiotrophoblast have filled with maternal blood to open the utero-placental circulation, and extra-embryonic mesoderm has appeared from the yolk sac wall. Day 11 is the specific day this concept and this exam bank both cite as when the epithelium re-seals over the implantation site, which is the defining event of "completion" as opposed to the earlier stages of adhesion, embedding and plugging. Confusing this day with day 7 (when implantation only begins) is the single most common error this pairing of questions is designed to catch.

## answer_e
13th.

## explanation_e
Incorrect. The thirteenth day belongs to a later step in this same timetable -- the chorionic cavity forming and primary chorionic villi beginning -- which happens after implantation is already complete, not at its completion.

## topic
Embryology - second week

## subtopic
Implantation timetable

## main_concept
CON-DEV-22C6EB6EB88448

## concept_ids
CON-DEV-22C6EB6EB88448

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-CHORIONIC-VILLI-PLACENTA | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that implantation is completed by the 11th post-fertilisation day, distinct from its day-7 start.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.13.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q4, answer key p.13 row 4 = d; options re-read by rendering the page at 300 DPI, OCR was unreadable

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-SECONDWEEK-Q43

## title
When does implantation of the blastocyst begin?

## question
Implantation of blastocyst begins in which post-fertilization day?

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
B

## answer_a
5th.

## explanation_a
Incorrect. The fifth day is when the zona pellucida finishes degenerating around the already-formed blastocyst -- a preparatory event, not the start of adhesion to the endometrium.

## answer_b
6th.

## explanation_b
Correct. This concept's own timetable places implantation's start at day 6 to 7, when the fully formed blastocyst first adheres to the endometrium by its embryonic pole and the trophoblast begins differentiating into an inner cytotrophoblast and an outer syncytiotrophoblast. This exam bank's own printed key places the beginning specifically on day 6, immediately after the zona pellucida has cleared on day 5, which fits neatly between the morula's day-4 arrival in the uterine cavity and completion of implantation around day 11. Distinguishing this "begins" question from its sibling "is completed" question (day 11) is exactly the kind of pairing this exam bank uses to test whether students know the whole timetable rather than one isolated day.

## answer_c
9th.

## explanation_c
Incorrect. The ninth day is well into the implantation process -- the blastocyst is already completely embedded and Heuser's membrane is forming -- not the day adhesion first begins.

## answer_d
11th.

## explanation_d
Incorrect. The eleventh day is when implantation is completed, with the endometrial epithelium closing back over the breach -- the end of the process, not its beginning.

## answer_e
13th.

## explanation_e
Incorrect. The thirteenth day belongs to a later step, chorionic cavity formation, well after implantation has both begun and been completed.

## topic
Embryology - second week

## subtopic
Implantation timetable

## main_concept
CON-DEV-22C6EB6EB88448

## concept_ids
CON-DEV-22C6EB6EB88448

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-CHORIONIC-VILLI-PLACENTA | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that implantation begins on about the 6th post-fertilisation day.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q43, answer key p.14 row 43 = b; options re-read by rendering the page at 300 DPI, OCR was unreadable

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-SECONDWEEK-Q68

## title
What lines the extraembryonic coelom?

## question
The Extraembryonic coelom:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
C

## answer_a
Lies between cytotrophoblast & syncytiotrophoblast.

## explanation_a
Incorrect. The extraembryonic coelom (chorionic cavity) forms within the extraembryonic mesoderm itself, once its own internal spaces run together on about day 13 -- it does not sit sandwiched between the two trophoblastic layers.

## answer_b
Is first formed in 3rd postnatal week.

## explanation_b
Incorrect. This concept's own timetable places the extraembryonic coelom's formation on the thirteenth day after fertilisation, during the second week of prenatal, not postnatal, development -- by the third postnatal week the fetus has long been born.

## answer_c
Is lined by extraembryonic mesoderm.

## explanation_c
Correct. Once extra-embryonic mesoderm appears from the yolk sac wall on days 11-12, its own internal spaces run together into a single large cavity, the extraembryonic coelom (chorionic cavity), on day 13 -- so it is that same extra-embryonic mesoderm, now split into an outer somatic and an inner splanchnic layer, that lines the coelom on both sides. This lining relationship is what lets the coelom later be compressed almost to nothing as the amnion expands to fill the chorionic cavity, since the somatic mesoderm lining its outer wall stays applied to the chorion. Naming extraembryonic mesoderm as the lining, rather than the trophoblast or endoderm, is the specific fact this row is testing.

## answer_d
Is obliterated by the expansion of the placenta.

## explanation_d
Incorrect. It is the amnion's own expansion late in gestation, not the placenta's expansion, that progressively obliterates the extraembryonic (chorionic) cavity by filling it.

## answer_e
None of the above.

## explanation_e
Incorrect as an answer -- option C is a correct, defensible statement about the extraembryonic coelom, so "none of the above" cannot be right.

## topic
Embryology - second week

## subtopic
Extraembryonic coelom

## main_concept
CON-DEV-22C6EB6EB88448

## concept_ids
CON-DEV-22C6EB6EB88448

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-CHORIONIC-VILLI-PLACENTA | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that the extraembryonic coelom is lined by extraembryonic mesoderm, formed on about day 13.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.15.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q68, answer key p.15 row 68 = c

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-SECONDWEEK-Q44

## title
What is the normal site for implantation?

## question
The normal site for implantation is:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
C

## answer_a
Cervix of uterus.

## explanation_a
Incorrect. Implantation in the cervix is a rare and dangerous form of ectopic pregnancy, not the normal site -- the normal site is well up in the body of the uterus, not the cervix.

## answer_b
Anterior wall of body of uterus.

## explanation_b
Incorrect. This concept explicitly ranks the anterior wall as the less common of the two normal sites -- normal implantation happens more often in the posterior wall, with the anterior wall as the secondary alternative.

## answer_c
Posterior wall of body of uterus.

## explanation_c
Correct. This concept states that implantation happens normally in the endometrium of the upper part of the posterior wall of the uterus, just below the fundus, and less often in the upper anterior wall -- at a time when the endometrium is in its secretory phase, thickened, with secretion-filled glands and spiral arteries ready to support the conceptus. This posterior-wall preference is a specific, testable fact distinct from the general "body of the uterus" answer, and distinguishing it from the rarer anterior-wall site or from abnormal sites (cervix, lower segment, ovary) is exactly what this row is checking.

## answer_d
Lower part of uterus.

## explanation_d
Incorrect. Implantation in the lower part of the uterus is placenta praevia, an abnormal site tested elsewhere in this same paper -- the normal site is high up, near the fundus, not low in the uterus.

## answer_e
Surface of ovary.

## explanation_e
Incorrect. Implantation on the surface of the ovary is ovarian ectopic pregnancy, an abnormal, extrauterine site -- the normal site is inside the uterine cavity's own wall.

## topic
Embryology - second week

## subtopic
Normal implantation site

## main_concept
CON-DEV-E08715FEB6438D

## concept_ids
CON-DEV-E08715FEB6438D

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
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-CHORIONIC-VILLI-PLACENTA | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that the normal implantation site is the upper posterior wall of the uterine body.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q44, answer key p.14 row 44 = c

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-SECONDWEEK-Q67

## title
What are the first two intraembryonic germ layers?

## question
The first 2 intraembryonic germ layers that differentiate are:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
B

## answer_a
Ectoderm & endoderm.

## explanation_a
Incorrect. Ectoderm and endoderm are two of the three germ layers of the trilaminar disc, formed during gastrulation in the third week -- these are later derivatives of the epiblast, not the first bilaminar-disc layers themselves.

## answer_b
Epiblast & hypoblast.

## explanation_b
Correct. On the eighth day, the embryoblast splits into two layers: the hypoblast, cuboidal cells facing the blastocele, and the epiblast, taller columnar cells forming the floor of the newly opened amniotic cavity -- together these make up the bilaminar embryonic disc, and they are the first two germ-layer-precursor populations to differentiate in the embryo. This matters because the epiblast, not the hypoblast, is the layer that goes on to give rise to all three germ layers of the trilaminar disc the following week (ectoderm, intraembryonic mesoderm and endoderm), while the hypoblast is simply displaced rather than converted into any of them. Naming epiblast and hypoblast correctly as the *first* pair, distinct from the *three* germ layers that come later, is the specific distinction this row tests.

## answer_c
Ectoderm & mesoderm.

## explanation_c
Incorrect. Ectoderm and mesoderm are two of the three later trilaminar-disc germ layers, both ultimately derived from the epiblast during gastrulation -- they are not the first bilaminar-disc layers.

## answer_d
Ectoderm & hypoblast.

## explanation_d
Incorrect. This mixes one bilaminar-disc layer (ectoderm, actually a later trilaminar-disc derivative) with one true bilaminar-disc layer (hypoblast), which is not a matched pair from either stage.

## answer_e
Endoderm & epiblast.

## explanation_e
Incorrect. This pairs a later trilaminar-disc layer (endoderm) with a true bilaminar-disc layer (epiblast), again mixing stages rather than naming the correct first pair.

## topic
Embryology - second week

## subtopic
Bilaminar embryonic disc

## main_concept
CON-DEV-59DB99C028C33F

## concept_ids
CON-DEV-59DB99C028C33F

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-CHORIONIC-VILLI-PLACENTA | ART-101-ANA-IMPLANTATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
Name epiblast and hypoblast as the first two intraembryonic layers, distinct from the three later germ layers.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.15.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q67, answer key p.15 row 67 = b

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-GAMETES-Q9

## title
Which cell is fertilised by the sperm?

## question
The cell that is fertilized by the sperm is the:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
B

## answer_a
Primary oocyte.

## explanation_a
Incorrect. The primary oocyte completes its first meiotic division at ovulation, becoming a secondary oocyte before it is ever exposed to sperm -- the primary oocyte itself is never the cell that gets fertilised.

## answer_b
Secondary oocyte.

## explanation_b
Correct. Oogenesis is arrested in metaphase of the second meiotic division at ovulation, so the cell released from the ovary and picked up by the uterine tube is a secondary oocyte, carrying 22 autosomes and a single X chromosome -- it is this secondary oocyte, not a fully mature ovum, that the sperm fuses with in the ampulla. Sperm entry is exactly what triggers the secondary oocyte to complete its stalled second meiotic division, extruding the second polar body and only then becoming a mature ovum pronucleus that combines with the sperm's own pronucleus to form the zygote. This sequencing -- fertilisation triggers the completion of meiosis II, rather than meiosis II finishing beforehand -- is the key distinction this row and this concept's own definition are testing.

## answer_c
Mature ovum.

## explanation_c
Incorrect. A "mature ovum" in the strict sense only exists after the second meiotic division is complete, which happens as a *consequence* of fertilisation, not as the cell that is fertilised in the first place.

## answer_d
First polar body.

## explanation_d
Incorrect. The first polar body is a byproduct of the first meiotic division, extruded before ovulation -- it plays no further role and is never the cell fertilised.

## answer_e
Second polar body.

## explanation_e
Incorrect. The second polar body is only extruded once fertilisation has already triggered completion of the second meiotic division -- it is a byproduct that appears *after* fertilisation, not the cell being fertilised.

## topic
Embryology - gametes

## subtopic
Oocyte maturation and fertilisation

## main_concept
CON-DEV-0BA870DF2C2E13

## concept_ids
CON-DEV-0BA870DF2C2E13

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-GAMETES | ART-101-HIS-NUCLEUS

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that the sperm fertilises a secondary oocyte, which then completes meiosis II as a result.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.13.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
sourceQ: Q9, answer key p.13 row 9 = b

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-GAMETES-Q40

## title
When is the sex of the embryo determined?

## question
The sex of the embryo is determined at

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
A

## answer_a
Fertilization.

## explanation_a
Correct. This concept's own definition states that the secondary oocyte's nucleus always carries 22 autosomes plus a single X chromosome, with no alternative -- so it is entirely the fertilising sperm, carrying either an X or a Y chromosome, that decides whether the resulting zygote is chromosomally XX or XY. The moment sperm and oocyte nuclei combine at fertilisation is therefore the moment the embryo's genetic (chromosomal) sex is fixed, even though the gonads and external genitalia that later reveal that sex outwardly do not develop until weeks afterward. This concept's own pitfall note flags the common error of thinking the oocyte can somehow determine sex too -- it cannot, because its nucleus only ever carries an X.

## answer_b
Spermatogenesis.

## explanation_b
Incorrect. Spermatogenesis is the process that produces X-bearing and Y-bearing sperm in the first place, but it happens in the father well before fertilisation -- it sets up the possibility of either sex, without itself being the moment any one embryo's sex is fixed.

## answer_c
Ovulation.

## explanation_c
Incorrect. Ovulation releases the secondary oocyte, whose nucleus can only ever carry an X chromosome -- ovulation cannot determine sex because it offers no X-versus-Y choice at all; that choice belongs to the sperm.

## answer_d
Development of gonads.

## explanation_d
Incorrect. Gonadal development happens weeks after fertilisation and simply reads out the chromosomal sex that was already fixed at fertilisation -- it does not determine sex itself.

## answer_e
Development of external genitalia.

## explanation_e
Incorrect. External genitalia develop even later than the gonads, under hormonal influence from the already-determined gonads -- this is the visible endpoint of sex determination, not the moment it happens.

## topic
Embryology - gametes

## subtopic
Chromosomal sex determination

## main_concept
CON-DEV-0BA870DF2C2E13

## concept_ids
CON-DEV-0BA870DF2C2E13

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-GAMETES | ART-101-HIS-NUCLEUS

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that chromosomal sex is fixed at fertilisation, by whether the fertilising sperm carries X or Y.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
sourceQ: Q40, answer key p.14 row 40 = a

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FETALMEMBRANES-Q11

## title
Which part of the decidua does the chorion laeve face?

## question
The chorion leave faces which part of the decidua?

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
B

## answer_a
Basalis.

## explanation_a
Incorrect. Decidua basalis lies deep to the conceptus, on the opposite side from the chorion, and it faces the vascular, villus-bearing chorion frondosum -- not the smooth chorion laeve.

## answer_b
Capsularis.

## explanation_b
Correct. As the conceptus grows, its avillous pole (chorion laeve, where the villi degenerate) bulges toward the uterine cavity and is covered only by decidua capsularis, the thin part of the decidua stretched over the growing sac -- while the villus-bearing chorion frondosum stays applied to decidua basalis beneath it. This basalis-versus-capsularis pairing with frondosum-versus-laeve is exactly the paired fact this concept's own definition and this exam bank's related placenta-origin questions both test, and mixing up which decidual part faces which chorionic part is the single most common error in this area.

## answer_c
Parietalis.

## explanation_c
Incorrect. Decidua parietalis lines the rest of the uterine cavity, away from the conceptus entirely, and later fuses with the capsularis as the sac grows -- it does not face the chorion laeve directly at this stage.

## answer_d
Lateralis.

## explanation_d
Incorrect. "Decidua lateralis" is not one of the three named parts of the decidua in this concept's own classification -- the three real parts are basalis, capsularis and parietalis.

## answer_e
Frondosum.

## explanation_e
Incorrect. "Chorion frondosum" is a chorionic structure, not a part of the decidua -- it is the villus-bearing chorion that decidua basalis, not the laeve-facing capsularis, lies against.

## topic
Embryology - fetal membranes

## subtopic
Decidua classification

## main_concept
CON-DEV-B84639AB8FF5DE

## concept_ids
CON-DEV-B84639AB8FF5DE

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-CHORIONIC-VILLI-PLACENTA | ART-101-ANA-FERTILIZATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that the chorion laeve is covered by decidua capsularis, distinct from decidua basalis under the chorion frondosum.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.13.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
sourceQ: Q11, answer key p.13 row 11 = b; options re-read by rendering the page at 300 DPI, OCR had mis-read option c (Parietalis) as a second "d"

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FETALMEMBRANES-Q61

## title
What makes up a primary stem villus?

## question
A primary stem villus consists of:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
C

## answer_a
Cytotrophoblast.

## explanation_a
Incorrect. Cytotrophoblast alone describes the proliferating core before the syncytiotrophoblast layer has even formed around it -- a primary villus already has both trophoblastic layers, not just one.

## answer_b
Syncytiotrophoblast.

## explanation_b
Incorrect. Syncytiotrophoblast alone is only the outer covering; a primary villus also has a cytotrophoblastic core pushing it outward, so the syncytiotrophoblast by itself is incomplete.

## answer_c
Cytotrophoblast & Syncytiotrophoblast.

## explanation_c
Correct. This concept's own villus progression defines a primary villus as a core of proliferating cytotrophoblast pushing outward into the overlying syncytiotrophoblast -- both trophoblastic layers and nothing else. It becomes a secondary villus only once extra-embryonic mesoderm invades that cytotrophoblastic core, and a tertiary villus only once fetal blood vessels then form within that mesoderm. Getting the primary stage right as "trophoblast only, no mesoderm yet" is the anchor fact the secondary and tertiary stages both build on.

## answer_d
Cytotrophoblast, Syncytiotrophoblast & Extraembryonic Mesoderm.

## explanation_d
Incorrect. Adding extraembryonic mesoderm to the two trophoblastic layers describes a secondary villus (mesoderm present, no vessels yet), not the primary stage, which has no mesodermal core at all.

## answer_e
Syncytiotrophoblast & extraembryonic mesoderm.

## explanation_e
Incorrect. Dropping cytotrophoblast while keeping syncytiotrophoblast and mesoderm does not match any real stage in this concept's progression -- the cytotrophoblastic core is present at every stage, from primary through tertiary.

## topic
Embryology - fetal membranes

## subtopic
Chorionic villus types

## main_concept
CON-DEV-E099FAA01BEAEB

## concept_ids
CON-DEV-E099FAA01BEAEB

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-CHORIONIC-VILLI-PLACENTA | ART-101-ANA-FERTILIZATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that a primary chorionic villus consists of cytotrophoblast and syncytiotrophoblast only, with no mesodermal core yet.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
sourceQ: Q61, answer key p.14 row 61 = c

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FETALMEMBRANES-Q14

## title
What is a secondary chorionic villus made of?

## question
A 2ry chorionic villus is made of:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
E

## answer_a
Cytotrophoblast + syncytiotrophoblast.

## explanation_a
Incorrect. Trophoblast (cytotrophoblast + syncytiotrophoblast) with no mesoderm at all is the *primary* villus stage, one step before this record's secondary stage.

## answer_b
Trophoblast + 2ry mesoderm.

## explanation_b
Incorrect. This concept's naming uses "1ry mesoderm" for the mesoderm that first invades the villus core, not "2ry mesoderm" -- there is no such thing as a "2ry mesoderm" stage in this progression.

## answer_c
Trophoblast + 1ry mesoderm + fetal capillaries.

## explanation_c
Incorrect. Adding fetal capillaries on top of trophoblast and mesoderm is exactly what defines the *tertiary*, not secondary, villus -- the presence of vessels is the specific feature that moves a villus from secondary to tertiary.

## answer_d
Syncytiotrophoblast + fetal capillaries.

## explanation_d
Incorrect. This drops the cytotrophoblastic core entirely and adds fetal capillaries, matching neither the secondary nor the tertiary stage as this concept defines them -- every real stage keeps both trophoblastic layers.

## answer_e
Trophoblast + 1ry mesoderm.

## explanation_e
Correct. A secondary chorionic villus is made when extra-embryonic (primary) mesoderm invades the cytotrophoblastic core of a primary villus, still covered by syncytiotrophoblast -- so it is trophoblast (both layers) plus this primary mesoderm, with no fetal blood vessels yet. It becomes tertiary only once that mesoderm develops its own fetal capillaries, so "mesoderm present, vessels absent" is precisely what distinguishes secondary from both the primary stage before it (no mesoderm) and the tertiary stage after it (mesoderm plus vessels).

## topic
Embryology - fetal membranes

## subtopic
Chorionic villus types

## main_concept
CON-DEV-E099FAA01BEAEB

## concept_ids
CON-DEV-E099FAA01BEAEB

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-CHORIONIC-VILLI-PLACENTA | ART-101-ANA-FERTILIZATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that a secondary chorionic villus is trophoblast plus primary mesoderm, with no fetal vessels yet.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.13.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
sourceQ: Q14, answer key p.13 row 14 = e

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FETALMEMBRANES-Q63

## title
What is a tertiary stem villus made of?

## question
A tertiary stem villus consists of:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
E

## answer_a
Cytotrophoblast & Syncytiotrophoblast only.

## explanation_a
Incorrect. Trophoblast alone, with no mesoderm, is the *primary* villus stage -- a tertiary villus has already gained a vascularised mesodermal core.

## answer_b
Syncytiotrophoblast & extraembryonic mesoderm only.

## explanation_b
Incorrect. Dropping the cytotrophoblastic core does not match any stage in this concept's progression -- both trophoblastic layers are retained through every villus stage, including tertiary.

## answer_c
Cytotrophoblast & extraembryonic mesoderm only.

## explanation_c
Incorrect. Dropping the syncytiotrophoblastic covering, and omitting that the mesoderm carries blood vessels, does not match the tertiary stage as this concept defines it.

## answer_d
Cytotrophoblast, Syncytiotrophoblast & intraembryonic mesoderm.

## explanation_d
Incorrect. Chorionic villi are built from *extraembryonic*, not intraembryonic, mesoderm -- intraembryonic mesoderm belongs to the embryo's own trilaminar disc, a separate structure entirely.

## answer_e
Cytotrophoblast, Syncytiotrophoblast & extraembryonic mesoderm with small blood vessels.

## explanation_e
Correct. A tertiary (definitive) chorionic villus keeps both trophoblastic layers -- cytotrophoblast and syncytiotrophoblast -- around a core of extraembryonic mesoderm that has now developed its own small fetal blood vessels, which is precisely the feature that distinguishes it from the secondary stage (mesoderm present, no vessels yet). This vascularised stage is what allows real fetal-maternal exchange to occur across the villus wall, since fetal blood can now be carried right up to (though never mixed with) the maternal blood bathing the villus in the intervillous space. Naming all three components together -- both trophoblastic layers plus vascularised extraembryonic mesoderm -- is what this row is checking, since dropping any one of them describes an earlier stage instead.

## topic
Embryology - fetal membranes

## subtopic
Chorionic villus types

## main_concept
CON-DEV-E099FAA01BEAEB

## concept_ids
CON-DEV-E099FAA01BEAEB

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-CHORIONIC-VILLI-PLACENTA | ART-101-ANA-FERTILIZATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that a tertiary chorionic villus is trophoblast plus extraembryonic mesoderm carrying fetal blood vessels.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
sourceQ: Q63, answer key p.14 row 63 = e

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FETALMEMBRANES-Q62

## title
Which statement about secondary villi is FALSE?

## question
As regards the secondary villi, all are true EXCEPT:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
D

## answer_a
They contain cytotrophoblast.

## explanation_a
Incorrect as an answer to this EXCEPT question -- secondary villi genuinely do retain a cytotrophoblastic core, inherited unchanged from the primary stage, so this statement is true and not the exception.

## answer_b
They contain syncytiotrophoblast.

## explanation_b
Incorrect as an answer -- secondary villi genuinely do keep their syncytiotrophoblastic covering, so this statement is true and not the exception.

## answer_c
They do not contain fetal blood vessels.

## explanation_c
Incorrect as an answer -- secondary villi genuinely lack fetal blood vessels, since vascularisation is exactly what turns a secondary villus into a tertiary one, so this statement is true and not the exception.

## answer_d
They contain a core of 2ry mesoderm.

## explanation_d
Correct. This concept's own villus progression names the mesoderm that first invades the cytotrophoblastic core "1ry (primary/extraembryonic) mesoderm," not "2ry mesoderm" -- there is no separate "secondary mesoderm" generation in this concept's terminology at all. This is the exact naming trap this concept's own pitfalls note warns about: it is tempting to assume "secondary villus" must contain "secondary mesoderm" by analogy, but the villus stage's own ordinal (primary/secondary/tertiary) does not match the mesoderm's own naming (which stays "1ry" throughout). Because every other statement about secondary villi in this list is genuinely true, this mismatched "2ry mesoderm" label is the one false statement, making it the correct answer to this EXCEPT question.

## answer_e
They are found in decidua basalis.

## explanation_e
Incorrect as an answer -- chorionic villi of all three types, including secondary, are found where the chorion faces the decidua, and villi anchored toward decidua basalis specifically persist to form the placenta, so this statement is true and not the exception.

## topic
Embryology - fetal membranes

## subtopic
Chorionic villus types

## main_concept
CON-DEV-E099FAA01BEAEB

## concept_ids
CON-DEV-E099FAA01BEAEB

## contextual_concept_ids

## difficulty
Hard

## question_type
Classification

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-CHORIONIC-VILLI-PLACENTA | ART-101-ANA-FERTILIZATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
Recognise that secondary villi contain 1ry (not '2ry') mesoderm, avoiding the ordinal-naming trap.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
sourceQ: Q62, answer key p.14 row 62 = d

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-FETALMEMBRANES-Q7

## title
What does the blastocoele become?

## question
The blastocoele becomes the:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
B

## answer_a
Amniotic sac.

## explanation_a
Incorrect. The amniotic cavity opens separately, within the remainder of the inner cell mass on day 8 -- it is a different space entirely, not a transformation of the blastocoele.

## answer_b
Yolk sac.

## explanation_b
Correct. On the ninth day, flat hypoblast-derived cells spread out to line the blastocele, forming a membrane (Heuser's membrane) -- once this lining is complete, the cavity it encloses is renamed the primary yolk sac. This is the very first step of a whole sequence this concept describes: the primary yolk sac is later replaced by a second, definitive yolk sac lined by a fresh wave of hypoblast cells, and this second sac in turn gives rise to the allantois and, after folding, the vitelline duct connecting to the midgut. Recognising that the blastocele does not simply vanish but is renamed and re-lined as the primary yolk sac is the anchor fact the rest of that sequence builds on.

## answer_c
Extraembryonic coelom.

## explanation_c
Incorrect. The extraembryonic coelom (chorionic cavity) forms later, around day 13, within the extraembryonic mesoderm -- a structurally different space that appears well after the blastocele has already become the yolk sac.

## answer_d
Intraembryonic coelom.

## explanation_d
Incorrect. The intraembryonic coelom is a much later cavity within the embryo's own lateral plate mesoderm, unrelated to the blastocele, which is an extraembryonic space from the very start.

## answer_e
Chorionic cavity.

## explanation_e
Incorrect. "Chorionic cavity" is another name for the extraembryonic coelom, which forms later and separately from the blastocele's own transformation into the yolk sac.

## topic
Embryology - fetal membranes

## subtopic
Yolk sac formation

## main_concept
CON-DEV-1D10DF3B716A70

## concept_ids
CON-DEV-1D10DF3B716A70

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
ASU_Y1=0.4

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-101-ANA-CHORIONIC-VILLI-PLACENTA | ART-101-ANA-FERTILIZATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that the blastocoele becomes the primary yolk sac once Heuser's membrane lines it.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.13.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
sourceQ: Q7, answer key p.13 row 7 = b

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-AUMED102-Q29

## title
What does the zona reaction achieve?

## question
What is the result of the zona reaction (cortical reaction)?

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
E

## answer_a
The corona radiata is formed.

## explanation_a
Incorrect. The corona radiata is formed around the oocyte much earlier, during follicular development in the ovary, from follicular cells held together by hyaluronic acid -- the zona reaction happens afterward, at fertilisation, and does not form the corona radiata.

## answer_b
The zona pellucida is formed.

## explanation_b
Incorrect. The zona pellucida itself is already present around the oocyte before fertilisation -- the zona *reaction* is a chemical change in that already-existing coat, triggered by the first sperm's entry, not the formation of the coat itself.

## answer_c
Sperms can now enter the egg.

## explanation_c
Incorrect. This is the opposite of what the zona reaction does -- rather than opening the door to more sperm, it closes it, which is exactly the point of the mechanism.

## answer_d
Acrosomes are removed.

## explanation_d
Incorrect. Acrosomal enzyme release happens on the sperm's own side during the acrosome reaction, which lets a single sperm penetrate the corona radiata and zona -- it is not what the *zona's* own cortical-granule-driven reaction does in response.

## answer_e
Sperms can no longer enter the egg.

## explanation_e
Correct. Once the first sperm fuses with the oocyte's plasma membrane, cortical granules beneath that membrane release their contents, chemically altering the zona pellucida's structure -- this is the zona reaction (cortical reaction), and its result is that the altered zona can no longer be penetrated by any further sperm. This is the specific mechanism that blocks polyspermy: fertilisation by more than one sperm, which would leave the zygote with the wrong chromosome number and is normally lethal to the embryo. Naming the *result* (sperm can no longer enter) rather than the *trigger* (first sperm's entry) or an unrelated event (corona radiata formation) is exactly what this row is testing.

## topic
Embryology - fertilisation

## subtopic
Zona reaction / block to polyspermy

## main_concept
CON-DEV-642BA9E28AC8B6

## concept_ids
CON-DEV-642BA9E28AC8B6

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
ASU_Y1=0.35

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-AU-MED-102-EMBR-FERTILIZATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that the zona reaction blocks further sperm penetration, preventing polyspermy.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q29, answer key p.14 row 29 = e

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-AUMED102-Q18

## title
Where does sperm capacitation take place?

## question
The process of sperm capacitation takes place within the:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
C

## answer_a
Testes.

## explanation_a
Incorrect. The testes are where spermatogenesis, not capacitation, happens -- sperm leave the testes already fully formed but still coated with the glycoproteins that capacitation later removes.

## answer_b
Male urethra.

## explanation_b
Incorrect. The male urethra is simply the passage sperm travel through at ejaculation -- capacitation is a change that happens afterward, once the sperm are inside the female tract, not while still in the male's own duct system.

## answer_c
Female genital tract.

## explanation_c
Correct. Capacitation is the removal of the glycoprotein coat and seminal plasma proteins from the plasma membrane overlying the sperm's acrosomal region, and this stripping happens only after ejaculation, as the sperm travels through the female genital tract. Only a capacitated sperm can go on to bind zona pellucida receptors and undergo the acrosome reaction, so this step is a required gatekeeper before fertilisation can occur at all -- a freshly ejaculated, uncapacitated sperm cannot fertilise an oocyte even if it reaches one. This female-tract location, rather than anywhere in the male reproductive system, is the specific fact this row and its sibling question (Q65, on capacitation's necessity) both test.

## answer_d
Ovum.

## explanation_d
Incorrect. The ovum (strictly, the oocyte before fertilisation) is not itself a site where anything happens to the sperm -- capacitation is a change to the sperm's own surface, occurring in the surrounding female tract, not something the oocyte does or a location inside it.

## answer_e
Embryo.

## explanation_e
Incorrect. There is no embryo yet at the point capacitation occurs -- capacitation happens before fertilisation, and the embryo does not exist until after the sperm and oocyte have already fused.

## topic
Embryology - fertilisation

## subtopic
Sperm capacitation

## main_concept
CON-DEV-CA422E559742A2

## concept_ids
CON-DEV-CA422E559742A2

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
ASU_Y1=0.35

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-AU-MED-102-EMBR-FERTILIZATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that sperm capacitation occurs within the female genital tract, after ejaculation.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q18, answer key p.14 row 18 = c; options re-read by rendering the page at 300 DPI, OCR was unreliable

---

# Item

## id
QST-ASUAE-EMBRYO2-DEFERRED-AUMED102-Q65

## title
Which statement about sperm capacitation is correct?

## question
As regards sperm capacitation, choose the CORRECT statement:

## subject
dev

## status
Draft

## owner
Dr. Omar

## vignette

## correct_answer
B

## answer_a
Occurs in male just before ejaculation.

## explanation_a
Incorrect. Capacitation happens after ejaculation, inside the female genital tract, not beforehand in the male -- the sperm is still coated with glycoproteins and seminal plasma proteins right up until ejaculation.

## answer_b
Is essential for fertilization.

## explanation_b
Correct. This concept states that capacitation is a prerequisite for the acrosome reaction -- only a capacitated sperm can bind zona pellucida receptors and undergo acrosomal exocytosis to penetrate the corona radiata and zona pellucida, so without capacitation a sperm simply cannot fertilise an oocyte at all, however normal it otherwise looks. This is what makes capacitation clinically relevant too: sperm used for in-vitro fertilisation must be capacitated in the laboratory (mimicking the female tract's own effect) before they are capable of fertilising a retrieved oocyte. Confusing capacitation's own role (stripping the surface coat, enabling the later acrosome reaction) with the acrosome reaction itself is the specific trap this concept's own pitfall note names, and this option is testing that capacitation's necessity is what should be recognised as correct, not any of the other listed claims.

## answer_c
Is caused by zona pellucida.

## explanation_c
Incorrect. Capacitation is not caused by the zona pellucida -- it is caused by exposure to secretions of the female genital tract, and it must already be complete before the sperm ever binds zona pellucida receptors.

## answer_d
Prevents entrance of more than one sperm to oocyte.

## explanation_d
Incorrect. Preventing entry of more than one sperm is the role of the zona reaction (cortical reaction) on the oocyte's own side, not sperm capacitation -- these are two separate mechanisms tested elsewhere in this same paper.

## answer_e
Removes the head of the sperm.

## explanation_e
Incorrect. Capacitation removes surface glycoproteins from the sperm's plasma membrane; it does not remove or alter the sperm head itself, which remains intact until the acrosome reaction later releases its enzyme contents.

## topic
Embryology - fertilisation

## subtopic
Sperm capacitation

## main_concept
CON-DEV-CA422E559742A2

## concept_ids
CON-DEV-CA422E559742A2

## contextual_concept_ids
CON-DEV-642BA9E28AC8B6

## difficulty
Hard

## question_type
Classification

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
ASU_Y1=0.35

## years
ASU_Y1

## universities
asu

## module
ASU-AE

## module_subject
ASU-AE > Embryology > Questions > Embryo 2

## question_only_for

## library_ids
ART-AU-MED-102-EMBR-FERTILIZATION

## resource_ids
src_a7e3b821ab294015c05f

## learning_objective
State that capacitation is essential for fertilisation, distinguishing it from the zona reaction and the acrosome reaction.

## source_citation
Ain Shams University, ASU-AE (Introduction to Anatomy and Embryology), Embryology, "MCQs - Embryo 2.pdf" (Part 2), printed answer key p.15.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
sourceQ: Q65, answer key p.15 row 65 = b
