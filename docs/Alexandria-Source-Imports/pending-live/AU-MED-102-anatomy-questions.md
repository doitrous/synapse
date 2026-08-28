<!--
  Questions testing HIT-PENDING concepts (ids live only in
  docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md) plus two live and
  three NEW concepts this lane already updated/authored. Lane W1-102-ANAT.
  Apply only after 101-ISK-mcq-concepts.md AND the two Kasr article files named
  below are live (see pending-live/INDEX.md).

  Scope: only concepts with a FINDABLE teaching article are tested here.
  grep -rl "<id>" docs/Kasr-Source-Imports/article/ found a teaching article
  for 6 of the 23 pending-live concepts (via 101-ISK-anatomy.md /
  101-ISK-anatomy-2.md); the other 17 have no article anywhere in the Kasr
  batch yet -- "a question may only test a concept an article covers"
  (05-questions.md), so those 17 are not tested here. Flagged in this lane's
  report as a cross-lane gap for the Kasr Y1 lane, not authored around.

  Gates:
  npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-102-anatomy-questions.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-anatomy.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-anatomy-2.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-anatomy-concepts.md \
    --with docs/Alexandria-Source-Imports/article/AU-MED-102-anatomy-articles.md \
    --with docs/Alexandria-Source-Imports/evidence/AU-MED-102-anatomy-sources.md
  npm run medical:simulate -- docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    docs/Kasr-Source-Imports/article/101-ISK-anatomy.md docs/Kasr-Source-Imports/article/101-ISK-anatomy-2.md \
    docs/Alexandria-Source-Imports/concept/AU-MED-102-anatomy-concepts.md \
    docs/Alexandria-Source-Imports/article/AU-MED-102-anatomy-articles.md \
    docs/Alexandria-Source-Imports/evidence/AU-MED-102-anatomy-sources.md \
    docs/Alexandria-Source-Imports/evidence/AU-MED-102-anatomy-claims.md \
    docs/Alexandria-Source-Imports/evidence/AU-MED-102-anatomy-citations.md \
    docs/Alexandria-Source-Imports/evidence/AU-MED-102-anatomy-spans.md \
    docs/Alexandria-Source-Imports/pending-live/AU-MED-102-anatomy-questions.md \
    --emit /tmp/sim-AU-MED-102-anatomy-pending-questions.json
-->

# Item

## id
QST-MSK-SUPERFICIAL-FASCIA-SKIN-01

## title
Which connective tissue lies just under the skin?

## question
Which fatty connective tissue lies just under the skin?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
D

## answer_a
Epidermis

## explanation_a
Incorrect. The epidermis is the outer epithelial layer of the skin itself, not a connective tissue, and it sits superficial to everything else named here.

## answer_b
Dermis

## explanation_b
Incorrect. The dermis is the connective-tissue layer of the skin proper, immediately deep to the epidermis — it is still part of the skin, one layer above the fatty layer the question is asking about.

## answer_c
Deep fascia

## explanation_c
Incorrect. Deep fascia is the dense, non-elastic membrane that wraps the muscles, lying deep to superficial fascia — a student who picks this has the two fasciae's depths reversed.

## answer_d
Superficial fascia

## explanation_d
Correct. Superficial fascia is the loose, fatty connective tissue layer that lies immediately under the dermis, between the skin and the deep fascia. It insulates against heat loss, allows the skin to move over deep structures, carries the cutaneous nerves and superficial vessels, and gives the body its overall contour. Holding "superficial fascia = the fat layer just under the skin" separates it cleanly from deep fascia, which wraps muscle rather than lying under skin.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-2145D2D62EC401

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Anatomy

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
6

## clinical_relevance
0.3

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Skin and fascia

## library_ids
ART-101-ANA-DEEP-FASCIA

## resource_ids
src_8d6ddf874f8984be8217
src_7d031a45baeadc973a00

## learning_objective
Identify superficial fascia as the fatty layer under the skin, and distinguish it in depth from the epidermis, dermis and deep fascia.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), End of Module paper "EOM - End foundation 2030.pdf" / "EOM - end foundation مصريين 222 1.pdf" (twin papers, question 4 of the Anatomy section).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
30

## randomise_answers
yes

## author_notes
Main concept CON-MSK-2145D2D62EC401 exists only in docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md (HIT-PENDING); teaching article ART-101-ANA-DEEP-FASCIA (title "Fascia: superficial and deep") is in docs/Kasr-Source-Imports/article/101-ISK-anatomy.md, also unimported. Distractors are the four candidate layers in the correct depth order, so each wrong pick names a specific depth error.

---

# Item

## id
QST-MSK-DEEP-FASCIA-DESCRIPTION-01

## title
Which statement best describes deep fascia?

## question
Which statement best describes deep fascia?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
A

## answer_a
It forms intermuscular septa

## explanation_a
Correct. Deep fascia is a tough, non-elastic collagen sheet that, among its several jobs, sends septa inward between groups of muscles — the intermuscular septa — dividing a limb into separate fascial compartments. Each compartment then has its own contents and, clinically, its own risk of compartment syndrome if pressure inside it rises. Deep fascia also forms retinacula at the wrist and ankle and invests muscles individually, but "forms the intermuscular septa" is the one statement here that is true of deep fascia and only deep fascia.

## answer_b
It contains blood vessels and nerves

## explanation_b
Incorrect as a description of deep fascia itself — vessels and nerves run within compartments deep fascia encloses, or superficial to it in the case of cutaneous nerves, but the fascia is a membrane, not a conduit that itself "contains" them in the way this option implies.

## answer_c
It lies under the skin

## explanation_c
Incorrect. Lying directly under the skin is superficial fascia's position; deep fascia lies deeper still, wrapping the muscles themselves, so this option picks the student who has the two fasciae's depths swapped.

## answer_d
It is responsible for the round contour of a female body

## explanation_d
Incorrect. The rounded contour of the female body is given by superficial fascia's fat content, not by deep fascia, which is a thin, unyielding membrane with no fat of its own to shape a contour.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-6CD9FFF51AE9CD

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
1

## inferred_difficulty
58

## exam_relevance
6

## clinical_relevance
0.4

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Skin and fascia

## library_ids
ART-101-ANA-DEEP-FASCIA

## resource_ids
src_3bf4527b51de57464e14
src_413115a28d7dc9914c91

## learning_objective
State that deep fascia forms the intermuscular septa, and distinguish its position and function from superficial fascia.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), End of Module paper "Final foundation 2030" / "Foundation Final Egyptian" (twin papers, question 76 of 112, cohort 2030).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
35

## randomise_answers
yes

## author_notes
Main concept CON-MSK-6CD9FFF51AE9CD is HIT-PENDING (101-ISK-mcq-concepts.md); article ART-101-ANA-DEEP-FASCIA covers it in the same "Fascia: superficial and deep" article as the previous question.

---

# Item

## id
QST-MSK-FIBROUS-JOINT-SUTURE-01

## title
What kind of joint are the irregular lines of the skull?

## question
The irregular lines seen on the skull, where adjacent bones meet, are examples of which kind of joint?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
A

## answer_a
Sutures

## explanation_a
Correct. A suture is a fibrous joint in which adjacent skull bones are united by a thin layer of fibrous tissue along an interlocking, irregular line — the visible zig-zag seen on a dried skull. Sutures permit essentially no movement in the adult and are the type example of a fibrous joint that is also permanently immobile, unlike a syndesmosis, which is fibrous but allows a little movement.

## answer_b
Gomphosis

## explanation_b
Incorrect. A gomphosis is the peg-and-socket fibrous joint of a tooth root in its bony socket — a different fibrous-joint type, and not what produces the skull's interlocking lines.

## answer_c
Syndesmosis

## explanation_c
Incorrect. A syndesmosis is a fibrous joint in which the bones are held apart by a ligament or membrane spanning a real gap between them, such as the inferior tibiofibular joint — there is a visible interosseous distance, unlike the tightly interlocked skull sutures.

## answer_d
Synovial

## explanation_d
Incorrect. A synovial joint has a joint cavity, synovial fluid and, usually, free movement — none of which the immobile skull sutures have.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-17E2267FB4758F

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Anatomy

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
0.7

## exam_weight_by_year
AU_Y1=0.25

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Joints

## library_ids
ART-101-ANA-FIBROUS-JOINTS

## resource_ids
src_2df3b7f9b3b393dc1d8f
src_98e8ccbfb3fe73a8c8e3

## learning_objective
Identify skull sutures as fibrous joints, and distinguish sutures from gomphosis and syndesmosis by structure and mobility.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), department Anatomy/Questions MCQ banks "MCQs - Foundation Anatomy & Embryology mcqs Nebras.pdf" (question 28 of the Anatomy section) and "MCQs - Questions Anatomy.pdf" (question 143, same underlying item pool).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
30

## randomise_answers
yes

## author_notes
Merged near-verbatim duplicate: Nebras Q28 and Alpha/"Questions Anatomy" Q143 test the identical stem and options — cited as one question against both sourceIds rather than authored twice, per the lane's coverage triage note on this bank pair's overlap.

---

# Item

## id
QST-MSK-CARTILAGINOUS-JOINT-MIDLINE-01

## title
Which type of joint is found in the midline?

## question
Which type of joint is found in the midline?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
D

## answer_a
Fibrous

## explanation_a
Incorrect. Fibrous joints (sutures, gomphoses, syndesmoses) are not defined by a midline location — sutures are on the skull vault, gomphoses at tooth sockets, and syndesmoses wherever two bones are held apart by a ligament, none of which is specifically a midline feature.

## answer_b
Primary cartilaginous

## explanation_b
Incorrect. A primary cartilaginous joint (synchondrosis) is a hyaline-cartilage union that is temporary, ossifying with growth — the epiphyseal plate is the type example, and epiphyseal plates are not confined to the midline.

## answer_c
Synovial pivot

## explanation_c
Incorrect. A pivot joint (such as the superior radio-ulnar joint) is defined by its uniaxial rotatory movement, not by a midline position, and most pivot joints in the body are paired, not midline structures.

## answer_d
Secondary cartilaginous

## explanation_d
Correct. A secondary cartilaginous joint (symphysis) unites bones by fibrocartilage, lies in the midline, is permanent, and permits only slight movement — the pubic symphysis and the intervertebral discs are the two type examples. "Midline and permanent" is what separates a secondary cartilaginous joint from a primary one, which is off the midline and temporary.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-8863ACD7E8D790

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
1

## inferred_difficulty
55

## exam_relevance
6

## clinical_relevance
0.3

## academic_relevance
0.75

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Joints

## library_ids
ART-101-ANA-CARTILAGINOUS-JOINTS

## resource_ids
src_3bf4527b51de57464e14
src_413115a28d7dc9914c91

## learning_objective
Identify the secondary cartilaginous joint as the midline, permanent joint type, and distinguish it from a primary cartilaginous, fibrous or synovial joint.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), End of Module paper "Final foundation 2030" / "Foundation Final Egyptian" (twin papers, question 75 of 112, cohort 2030).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
35

## randomise_answers
yes

## author_notes
Main concept CON-MSK-8863ACD7E8D790 is HIT-PENDING; teaching article ART-101-ANA-CARTILAGINOUS-JOINTS in 101-ISK-anatomy.md.

---

# Item

## id
QST-MSK-SYNOVIAL-CARTILAGE-COVERING-01

## title
What covers the bones of a synovial joint?

## question
Which of the following is true of the bones forming a synovial joint?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
A

## answer_a
All are covered with hyaline cartilage

## explanation_a
Correct. Every bony surface inside a synovial joint's cavity is covered by a thin layer of hyaline articular cartilage, which is avascular, aneural and lubricated by synovial fluid — the combination that lets the joint move with almost no friction and no pain-signalling from the cartilage itself. This is one of the seven named components of a synovial joint, alongside the fibrous capsule, synovial membrane, joint cavity, synovial fluid and, where present, ligaments and intra-articular discs.

## answer_b
None are covered by cartilage of any kind

## explanation_b
Incorrect. This is the direct opposite of the true statement — articular cartilage covering the bone ends is one of the joint's defining components, not an absent feature.

## answer_c
They are covered by fibrocartilage, not hyaline cartilage

## explanation_c
Incorrect. Fibrocartilage lines a secondary cartilaginous joint (such as the pubic symphysis) or forms structures like an intra-articular disc inside some synovial joints; the articular surface itself, in a synovial joint, is hyaline cartilage.

## answer_d
Only one of the two articulating bones is covered

## explanation_d
Incorrect. Both articulating surfaces are covered with hyaline cartilage — covering only one bone would leave bone directly grinding on cartilage, which is not how any synovial joint is built.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-1E40050F141F4C

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
1

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.3

## academic_relevance
0.75

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Joints

## library_ids
ART-101-ANA-SYNOVIAL-JOINTS

## resource_ids
src_2df3b7f9b3b393dc1d8f
src_98e8ccbfb3fe73a8c8e3

## learning_objective
State that hyaline cartilage covers both articulating bone surfaces of a synovial joint, as one of its seven named components.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), department Anatomy/Questions MCQ banks "MCQs - Foundation Anatomy & Embryology mcqs Nebras.pdf" (question 34 of the Anatomy section) and "MCQs - Questions Anatomy.pdf" (question 149, same underlying item pool).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
35

## randomise_answers
yes

## author_notes
Source item is printed true/false ("All the bones of synovial joints are covered with hyaline cartilage — True/False"); rebuilt as a single-best-answer item with three false variants so it carries the required 4 options, without changing what is tested. Merged near-verbatim duplicate: Nebras Q34 / Alpha Q149.

---

# Item

## id
QST-MSK-LONG-BONE-EXCEPTION-SACRUM-01

## title
Which of the following is not a long bone?

## question
Which of the following is not a long bone?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
C

## answer_a
Humerus

## explanation_a
Incorrect as the answer to "which is NOT a long bone" — the humerus is a textbook long bone, with two expanded ends and a shaft, so it does not belong with the exception being asked for.

## answer_b
Femur

## explanation_b
Incorrect as the answer to "which is NOT a long bone" — the femur is the largest long bone in the body, built to the same two-ends-and-a-shaft plan as every other long bone.

## answer_c
Sacrum

## explanation_c
Correct. The sacrum is not a long bone — it is five vertebrae fused into one irregular bone, classified with the vertebrae rather than with the long bones of the limbs. A student who reads "bone of the axial skeleton" as automatically meaning "irregular bone" gets this right for the wrong reason; the sacrum is irregular because of its complex shape and multiple articular surfaces, which is the same reason any single vertebra is classified as irregular.

## answer_d
Tibia

## explanation_d
Incorrect as the answer to "which is NOT a long bone" — the tibia has two expanded ends and a shaft like the other three limb bones offered, so it is a long bone like the rest of the wrong options.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-12504AAE2403E8

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
1

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.2

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Skeletal system

## library_ids
ART-MSK-TOP-3E60C20647

## resource_ids
src_2df3b7f9b3b393dc1d8f
src_98e8ccbfb3fe73a8c8e3

## learning_objective
Recognise the sacrum as an irregular bone rather than a long bone, and give the reason (fused vertebrae, complex shape).

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), department Anatomy/Questions MCQ banks "MCQs - Foundation Anatomy & Embryology mcqs Nebras.pdf" (question 11 of the Anatomy section) and "MCQs - Questions Anatomy.pdf" (question 126, same underlying item pool).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
30

## randomise_answers
yes

## author_notes
Main concept CON-MSK-12504AAE2403E8 is HIT-LIVE (updated with +au/+AU-MED-102 in concept/AU-MED-102-anatomy-concepts.md, not pending) — this question resolves against live state without needing --with for the concept itself, but the bank sourceIds still need the evidence-source records this lane authored. Merged near-verbatim duplicate: Nebras Q11 / Alpha Q126.

---

# Item

## id
QST-MSK-BONE-MARROW-WBC-FACTORY-01

## title
What does bone marrow manufacture?

## question
The bone marrow acts as a factory for the formation of which of the following?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
D

## answer_a
Hyaline cartilage

## explanation_a
Incorrect. Hyaline cartilage is made by chondrocytes in cartilage tissue, not by the bone marrow, which is a blood-forming (haemopoietic) tissue rather than a skeletal connective tissue.

## answer_b
Collagen for tendons

## explanation_b
Incorrect. Tendon collagen is produced by fibroblasts in dense connective tissue, an entirely different cell line from the marrow's own haemopoietic stem cells.

## answer_c
Synovial fluid

## explanation_c
Incorrect. Synovial fluid is secreted by the synovial membrane lining a joint capsule, a structure unrelated to bone marrow.

## answer_d
White blood cells

## explanation_d
Correct. Red bone marrow is the body's main haemopoietic organ, and one of its products is the white blood cells (alongside red blood cells and platelets), formed from haemopoietic stem cells in the marrow's vascular stroma. "Bone marrow = blood cell factory" is the concept this question tests, and the same marrow is why hematopoiesis is described as occurring in bone marrow and, secondarily, in lymphatic organs such as the thymus.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-HEM-F4A6018FB59FDD

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Anatomy

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
0.4

## academic_relevance
0.6

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Skeletal system

## library_ids
ART-HEM-TOP-672DDE9D3A

## resource_ids
src_2df3b7f9b3b393dc1d8f
src_98e8ccbfb3fe73a8c8e3

## learning_objective
State that bone marrow forms white blood cells (among other blood cells), as part of the haemopoietic system.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), department Anatomy/Questions MCQ banks "MCQs - Foundation Anatomy & Embryology mcqs Nebras.pdf" (question 25 of the Anatomy section) and "MCQs - Questions Anatomy.pdf" (question 140, same underlying item pool).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
30

## randomise_answers
yes

## author_notes
Main concept CON-HEM-F4A6018FB59FDD is HIT-LIVE. Merged near-verbatim duplicate: Nebras Q25 / Alpha Q140.

---

# Item

## id
QST-MSK-VERTEBRAL-BODY-POSITION-01

## title
Which part of a vertebra is the body?

## question
The body of a typical vertebra is its ______ part.

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
A

## answer_a
Anterior

## explanation_a
Correct. The vertebral body is the anterior, weight-bearing block of a typical vertebra, increasing in size from the cervical to the lumbar region as the load it carries increases going down the column. Everything behind the body — the pedicles, laminae and the processes they carry — makes up the neural arch, so "body = anterior" versus "arch = posterior" is the basic front/back division of a typical vertebra.

## answer_b
Posterior

## explanation_b
Incorrect. The posterior part of a typical vertebra is the neural arch (pedicle, lamina and the processes), not the body.

## answer_c
Inferior

## explanation_c
Incorrect. "Inferior" describes a vertical relationship (below something), not the front/back position the body occupies relative to the neural arch.

## answer_d
Superior

## explanation_d
Incorrect, for the same reason as "Inferior" — this option answers a different question (vertical position) than the one asked (front/back position of the body within one vertebra).

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-DBEEE85B8D5613

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Anatomy

## cognitive_effort
Low

## cognitive_effort_score
0.15

## setting
Academic

## reasoning_level
1

## inferred_difficulty
80

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Skeletal system

## library_ids
ART-MSK-VERTEBRA-STRUCTURE

## resource_ids
src_2df3b7f9b3b393dc1d8f
src_98e8ccbfb3fe73a8c8e3

## learning_objective
State that the vertebral body is the anterior part of a typical vertebra, and distinguish it from the posterior neural arch.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), department Anatomy/Questions MCQ banks "MCQs - Foundation Anatomy & Embryology mcqs Nebras.pdf" (question 23 of the Anatomy section) and "MCQs - Questions Anatomy.pdf" (question 138, same underlying item pool).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
30

## randomise_answers
yes

## author_notes
Main concept CON-MSK-DBEEE85B8D5613 is this lane's own NEW concept (concept/AU-MED-102-anatomy-concepts.md, article ART-MSK-VERTEBRA-STRUCTURE) — no --with needed for the concept/article, only for the two bank resource records. Merged near-verbatim duplicate: Nebras Q23 / Alpha Q138.

---

# Item

## id
QST-MSK-VERTEBRAL-PROCESS-ATTACHMENT-01

## title
What do vertebral processes provide attachment for?

## question
The spinous, transverse and articular processes of a vertebra are principally a site of attachment for which of the following?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
B

## answer_a
Blood vessels only

## explanation_a
Incorrect. Vessels pass close to the vertebral column (segmentally, and through the intervertebral and transverse foramina in the cervical region) but the processes themselves are not primarily vascular attachment sites — that role belongs to muscles and ligaments.

## answer_b
Muscles and ligaments

## explanation_b
Correct. The spinous process, the two transverse processes and the four articular processes of a typical vertebra all serve principally as attachment sites for the muscles that move and stabilise the column and for the ligaments that bind adjacent vertebrae together. This is the same reason the processes vary in size and shape between regions — a lumbar vertebra carrying heavier musculature has correspondingly larger processes than a cervical one.

## answer_c
The intervertebral disc

## explanation_c
Incorrect. The intervertebral disc sits between the bodies of adjacent vertebrae, not on the processes, which project from the neural arch rather than the body.

## answer_d
The spinal cord directly

## explanation_d
Incorrect. The spinal cord lies within the vertebral canal, formed by the stacked vertebral foramina of the bodies and arches — it does not attach to the processes, which are external projections rather than part of the canal's wall.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-DBEEE85B8D5613

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
62

## exam_relevance
5

## clinical_relevance
0.3

## academic_relevance
0.65

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Skeletal system

## library_ids
ART-MSK-VERTEBRA-STRUCTURE

## resource_ids
src_2df3b7f9b3b393dc1d8f
src_98e8ccbfb3fe73a8c8e3

## learning_objective
State that vertebral processes are principally attachment sites for muscles and ligaments.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), department Anatomy/Questions MCQ banks "MCQs - Foundation Anatomy & Embryology mcqs Nebras.pdf" (question 24 of the Anatomy section) and "MCQs - Questions Anatomy.pdf" (question 139, same underlying item pool).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
35

## randomise_answers
yes

## author_notes
Merged near-verbatim duplicate: Nebras Q24 / Alpha Q139.

---

# Item

## id
QST-MSK-VERTEBRAL-COLUMN-PROTECTS-CORD-01

## title
What does the vertebral column protect?

## question
Which of the following best describes a function of the vertebral column?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
A

## answer_a
It protects the spinal cord within the vertebral canal

## explanation_a
Correct. The vertebral foramina of the thirty-three stacked vertebrae together form the vertebral canal, which houses and protects the spinal cord along the whole length of the column — one of the column's central roles, alongside supporting the trunk and providing muscle attachment. This is a different protective relationship from the intervertebral foramen, which transmits a spinal nerve root at each level rather than housing the cord itself.

## answer_b
It produces the red blood cells of the adult

## explanation_b
Incorrect. Red blood cell production in the adult is a function of red bone marrow, which is found within cancellous bone generally (including vertebral bodies) — but that is a property of the bone tissue's marrow content, not a function of the vertebral column as a structural unit the way protecting the cord is.

## answer_c
It is the only attachment site for the diaphragm

## explanation_c
Incorrect. The diaphragm attaches to the lumbar vertebrae (via the crura) as only one of several attachment sites — it also attaches to the xiphoid process and the costal margin, so "the only attachment site" overstates the vertebral column's specific role.

## answer_d
It forms the roof of the thoracic cavity

## explanation_d
Incorrect. The thoracic vertebrae form part of the posterior wall of the thorax, not its roof — the thoracic cavity's roof is the thoracic inlet, bounded by the first ribs, the manubrium and the first thoracic vertebra together, not the vertebral column alone.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-DBEEE85B8D5613

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
1

## inferred_difficulty
58

## exam_relevance
5

## clinical_relevance
0.4

## academic_relevance
0.65

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Skeletal system

## library_ids
ART-MSK-VERTEBRA-STRUCTURE

## resource_ids
src_2df3b7f9b3b393dc1d8f
src_98e8ccbfb3fe73a8c8e3

## learning_objective
State that the vertebral column protects the spinal cord within the vertebral canal.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), department Anatomy/Questions MCQ banks "MCQs - Foundation Anatomy & Embryology mcqs Nebras.pdf" (question 26 of the Anatomy section) and "MCQs - Questions Anatomy.pdf" (question 141, same underlying item pool).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
35

## randomise_answers
yes

## author_notes
Source item is printed true/false ("Vertebral column protects the spinal cord — True/False"); rebuilt as single-best-answer with three false statements about other structures/functions so it carries the required 4 options. Merged near-verbatim duplicate: Nebras Q26 / Alpha Q141.

---

# Item

## id
QST-MSK-BONE-STRENGTH-SEX-DIFFERENCE-01

## title
How do male and female bones usually differ?

## question
Usually, male bones are, compared with female bones:

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
D

## answer_a
Shorter

## explanation_a
Incorrect — the opposite is generally true. Male bones tend to be longer, not shorter, than female bones, reflecting the effect of male sex hormones on bone deposition through growth.

## answer_b
Thinner

## explanation_b
Incorrect — the opposite is generally true. Male bones are, on average, thicker (greater cortical bone) rather than thinner.

## answer_c
Lighter

## explanation_c
Incorrect — the opposite is generally true. Greater bone mass makes male bones heavier, not lighter, than female bones of comparable size.

## answer_d
Stronger

## explanation_d
Correct. Male bones are generally longer, heavier and stronger than female bones because male sex hormones stimulate greater bone deposition throughout growth. This sex difference in peak bone strength is part of why osteoporosis — and the fractures it causes — is commoner in women: they start from a lower peak bone mass and then lose bone further after the menopause.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-D0E73C5156D3AD

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Anatomy

## cognitive_effort
Low

## cognitive_effort_score
0.15

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
4

## clinical_relevance
0.4

## academic_relevance
0.5

## exam_weight_by_year
AU_Y1=0.25

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Skeletal system

## library_ids
ART-MSK-BONE-STRENGTH-SEX-OSTEOPOROSIS

## resource_ids
src_2df3b7f9b3b393dc1d8f
src_98e8ccbfb3fe73a8c8e3

## learning_objective
State that male bones are generally stronger than female bones, and link this to sex-hormone effects on bone deposition.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), department Anatomy/Questions MCQ banks "MCQs - Foundation Anatomy & Embryology mcqs Nebras.pdf" (question 21 of the Anatomy section) and "MCQs - Questions Anatomy.pdf" (question 136, same underlying item pool).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
30

## randomise_answers
yes

## author_notes
The two twin banks word option D slightly differently (Nebras: "stronger"; Alpha: "All of the above") but key to the same underlying fact and the same correct position in a 4-option "shorter/thinner/lighter/stronger" set — cited as one question against both, using the Nebras wording. Main concept and article both this lane's own (NEW, no --with needed for them).

---

# Item

## id
QST-MSK-OSTEOPOROSIS-SLOWED-BY-01

## title
What slows the progress of osteoporosis?

## question
Which of the following can slow the progress of osteoporosis?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
B

## answer_a
Moderate exercise alone, regardless of type

## explanation_a
Incorrect as the single best answer here — it is specifically moderate, weight-bearing exercise that helps, and immobility (the failure to bear any load on the skeleton) accelerates bone loss instead; "regardless of type" overstates what is actually protective.

## answer_b
An adequate dietary calcium intake

## explanation_b
Correct. An adequate intake of dietary calcium (with milk and other calcium-rich foods as sources) is one of the modifiable factors that slows the bone loss of osteoporosis, alongside moderate weight-bearing exercise. Calcium is the mineral bone loses in osteoporosis in the first place, so replacing it through diet is the direct, exam-favoured answer to "what slows it".

## answer_c
Being a young woman

## explanation_c
Incorrect. Osteoporosis is commoner in older women, particularly after the menopause — being young is protective in the sense of not yet being at peak risk, but it is not itself a factor that "slows" an ongoing disease process, and the option describes a demographic, not a modifiable intervention.

## answer_d
A calcium-free diet

## explanation_d
Incorrect, and the opposite of the correct answer — removing dietary calcium would worsen, not slow, the mineral loss that defines osteoporosis.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-D0E73C5156D3AD

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.3

## setting
Clinical

## reasoning_level
1

## inferred_difficulty
60

## exam_relevance
5

## clinical_relevance
0.6

## academic_relevance
0.5

## exam_weight_by_year
AU_Y1=0.25

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Skeletal system

## library_ids
ART-MSK-BONE-STRENGTH-SEX-OSTEOPOROSIS

## resource_ids
src_2df3b7f9b3b393dc1d8f
src_98e8ccbfb3fe73a8c8e3

## learning_objective
Name dietary calcium as a modifiable factor that slows osteoporosis's progress.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), department Anatomy/Questions MCQ banks "MCQs - Foundation Anatomy & Embryology mcqs Nebras.pdf" (question 22 of the Anatomy section) and "MCQs - Questions Anatomy.pdf" (question 137, same underlying item pool).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
35

## randomise_answers
yes

## author_notes
Both twin banks key "calcium" alone as correct on their printed option list (not "moderate exercise", which sits as a separate, unkeyed distractor in the source) — recorded as printed, not reconciled with the article's own broader "exercise and calcium both help" teaching statement; the discrepancy between the exam's single keyed answer and the fuller medical picture is worth a faculty reviewer's eye before publication.

---

# Item

## id
QST-MSK-SPLEEN-RELATED-ORGAN-01

## title
Which organ is related to the spleen?

## question
Which organ is related to the spleen?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
C

## answer_a
Right renal

## explanation_a
Incorrect on side: the kidney related to the spleen is the left kidney, since the spleen is a left-sided organ — the right kidney sits on the opposite side of the abdomen, related instead to the liver.

## answer_b
Left suprarenal

## explanation_b
Incorrect. The left suprarenal (adrenal) gland sits above the left kidney and is related to the stomach and pancreas, not named by the spleen's own renal impression or its lienorenal ligament — a genuine left-sided abdominal neighbour, but the wrong one.

## answer_c
Left renal

## explanation_c
Correct. The spleen's renal impression, on its visceral surface below the hilum, is faced against the left kidney, and the two organs are directly connected by the lienorenal ligament — a peritoneal fold that also carries the splenic vessels to and from the hilum. The relation is left-sided throughout, matching the spleen's own left upper-quadrant position.

## answer_d
Right suprarenal

## explanation_d
Incorrect. The suprarenal (adrenal) gland sits on top of the kidney and, on the left side, is related to the stomach and pancreas rather than being the organ the spleen's own impressions and ligament name — and this option is also on the wrong side.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-816EE3A5FAFECF

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
1

## inferred_difficulty
55

## exam_relevance
5

## clinical_relevance
0.3

## academic_relevance
0.65

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Lymphatic system

## library_ids
ART-MSK-SPLEEN-GROSS-ANATOMY

## resource_ids
src_2df3b7f9b3b393dc1d8f

## learning_objective
State that the spleen is related to the left kidney, via its renal impression and the lienorenal ligament.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), department Anatomy/Questions MCQ bank "MCQs - Foundation Anatomy & Embryology mcqs Nebras.pdf" (question 54 of the Anatomy section — Nebras-only, no Alpha/"Questions Anatomy" counterpart past its own item 165).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
30

## randomise_answers
yes

## author_notes
Source printed options as "a. Right renal / b. Right renal." (the second one differing only by a stray full stop, both reading as the same wrong answer) with the correct answer "Left renal" left unlettered in the extracted text — rebuilt with a genuine 4-way option set (right renal, left suprarenal, left renal correct, right suprarenal) rather than reproducing the source's duplicate-option typo. Flagged for a render check before publication given the source anomaly.

---

# Item

## id
QST-MSK-SPLEEN-LIENORENAL-VESSEL-01

## title
Which vessel passes in the lienorenal ligament before entering the spleen?

## question
Which of the following passes in the lienorenal ligament before its entry into the hilum of the spleen?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
A

## answer_a
Splenic artery

## explanation_a
Correct. The splenic artery runs within the lienorenal ligament — the peritoneal fold connecting the spleen to the anterior surface of the left kidney — before reaching the hilum, alongside the splenic vein and the tail of the pancreas. This is what makes the lienorenal ligament (not the gastrosplenic ligament) the one to control surgically for vascular access to the spleen.

## answer_b
Superior mesenteric artery

## explanation_b
Incorrect. The superior mesenteric artery supplies the midgut derivatives and runs in the root of the mesentery, nowhere near the lienorenal ligament or the spleen's hilum.

## answer_c
Superior mesenteric vein

## explanation_c
Incorrect, for the same reason as the superior mesenteric artery — it drains midgut structures into the portal system via the mesentery, not via the lienorenal ligament.

## answer_d
Splenic vein

## explanation_d
Marked incorrect only because the source keys the artery as the single best answer here — the splenic vein genuinely does run in the same lienorenal ligament alongside the artery, so this option is not built on a misconception the way a true distractor should be. Retained as printed rather than replaced with an invented wrong answer; see author_notes for the review flag this raises.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-816EE3A5FAFECF

## concept_ids

## contextual_concept_ids

## difficulty
Hard

## question_type
Anatomy

## cognitive_effort_score
0.55

## cognitive_effort
High

## setting
Academic

## reasoning_level
2

## inferred_difficulty
40

## exam_relevance
5

## clinical_relevance
0.4

## academic_relevance
0.65

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Lymphatic system

## library_ids
ART-MSK-SPLEEN-GROSS-ANATOMY

## resource_ids
src_2df3b7f9b3b393dc1d8f

## learning_objective
Name the splenic artery as a structure running in the lienorenal ligament to reach the splenic hilum.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), department Anatomy/Questions MCQ bank "MCQs - Foundation Anatomy & Embryology mcqs Nebras.pdf" (question 55 of the Anatomy section — Nebras-only).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Author flag: the source's own correct answer is the splenic artery specifically, even though the splenic vein travels the same ligament — this is a genuinely awkward single-best-answer item (option D is not really wrong, just not the one keyed) and is a candidate for review rather than a clean four-way distractor set; explanation_d says so rather than inventing a misconception that is not really there.
