<!--
  103 BMS · Anatomy · concepts behind Section 2 of the 2025 end-of-year paper.

  Source of the questions: EOY (BMS - 103) 199 (2).pdf, src_37f6c0daf3436096af19,
  Section 2: Anatomy, pages 9-14. Six questions, 34 marks as printed.
  Source of the medicine: Dpt book Anatomy Lower Limb 103.pdf,
  src_23c95ac89b6b113bd58e, read page by page. The paper says what was asked;
  the book says what is true, and every claim in the sibling evidence files
  quotes it.

  Fifteen records, of two kinds.

  TEN NEW CONCEPTS, full contract. Nothing in live state covered any of them:
  find-existing.mjs returns zero for "peroneus", "peroneal", "sciatic",
  "posterior tibial", "eversion", "dorsiflexion", "talipes", "foot drop",
  "circumflex fibular", "iliopsoas" and "gluteus".

  FIVE UPDATES to live concepts, carrying only the fields that change. Every
  one of the 1,718 live concepts has moduleIds: [] — the graph is unattached to
  any module — so these add `modules`, `module_subject`, `learner_years`,
  `universities`, the back-link to the article that now teaches them, and, for
  the three adductor-canal records, the exam signal that question 1 is.
  `medical:batch` judges these as though they were new and will report them as
  under-filled; `medical:simulate` is what validates them, and it must say
  created: 0, updated: 5.

  Why the live adductor-canal records were NOT merged into the new one. The
  three of them are relations of the FEMORAL ARTERY inside the canal, from
  page 18 of the book. CON-MSK-59755B64721E3D is the structure of the CANAL —
  its three walls and its four contents — from page 12. The objectives differ
  ("what lies behind the femoral artery here" against "enumerate the boundaries
  and contents"), the new one names the antero-lateral wall and all four
  contents which none of the live three mentions, and neither can answer the
  other's question. So: cross-linked in related_concept_ids, recorded in
  rejected_merge_candidate_ids, and the reason stated in field_notes, per
  00-START-HERE.md §4.

  The marks discrepancy is recorded, not resolved — see `conflicts` on
  CON-MSK-AB5318A9255811 and the three other case concepts.

  Import: Admin › Concepts › Import. After the sibling article file, before the
  claim and citation files.
-->

# Item

## id
CON-MSK-59755B64721E3D

## label
The adductor canal is a triangular tunnel with three walls that carries four structures from the femoral triangle to the popliteal fossa

## canonical_key
femur.adductor-canal.boundaries-contents

## aliases
Adductor canal
Subsartorial canal
Hunter's canal
Canal of Hunter
Boundaries and contents of the adductor canal

## arabic_label
القناة المقربة (قناة هنتر)

## arabic_aliases
القناة تحت الخياطية
قناة المقربات في الفخذ

## definition
The adductor canal is an intermuscular tunnel on the medial side of the middle third of the thigh, under cover of sartorius. It runs from the apex of the femoral triangle to the adductor hiatus in adductor magnus. It is triangular in cross section: the antero-medial wall is a fibrous roof between vastus medialis and adductor magnus covered by sartorius, the posterior wall or floor is adductor longus above and adductor magnus below, and the antero-lateral wall is vastus medialis. It contains the femoral artery, the femoral vein, the saphenous nerve and the nerve to vastus medialis.

## explicit_objective
Enumerate the three walls of the adductor canal, naming the muscle that forms each, and list its four contents.

## pitfalls
Calling the roof a wall of muscle. The antero-medial wall is fibrous — a sheet of connective tissue between vastus medialis and adductor magnus — and sartorius only covers it; sartorius is not itself the wall. The second habitual error is stopping the contents at three, because the nerve to vastus medialis is easy to forget and is worth a mark on its own.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
SYS-MSK-T01-S02-M02

## topic
Lower limb

## subtopic
The Thigh

## microtopic
Adductor canal

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > The Thigh > Adductor canal

## article_ids
ART-103-ANA-ADDUCTOR-CANAL

## related_article_ids
ART-MSK-TOP-BD3D529647

## related_concept_ids
CON-MSK-594BD65D8C0D7A | CON-MSK-700EC3AB121997 | CON-MSK-6F2C49EFF66B46

## resource_ids
src_23c95ac89b6b113bd58e

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.9

## atomic_claim_ids
CLM-MSK-ADDUCTOR-CANAL-01 | CLM-MSK-ADDUCTOR-CANAL-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Regarding Adductor canal, mention its boundaries and contents. {6 Marks}

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p9 | 103 BMS

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-594BD65D8C0D7A | CON-MSK-700EC3AB121997 | CON-MSK-6F2C49EFF66B46

## conflicts
[clear]

## uncertainty
The book gives the canal three walls and calls the posterior wall the floor in the same breath. Some texts describe a lateral wall and a floor rather than an antero-lateral and a posterior wall; the structures named are identical either way, so the disagreement is one of naming, not of anatomy.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The department book's own section, "Adductor canal", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-ANA-T03 and has nothing finer for the lower limb.
nanotopicId: The microtopic Adductor canal is already the most precise node the department book supports; the book prints no subdivision beneath it.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "adductor canal" and "subsartorial" — the only candidates are the three live femoral-artery relation records, which are recorded in rejected_merge_candidate_ids instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
conflicts: The department book and the exam paper agree on this content; the only variation found is a naming one, recorded under uncertainty rather than as a source conflict.
exclusionReason: This concept is intended for publication once its evidence is attached.
rejectedMergeCandidateIds: CON-MSK-594BD65D8C0D7A, CON-MSK-700EC3AB121997 and CON-MSK-6F2C49EFF66B46 describe what lies anterior and posterior to the FEMORAL ARTERY inside the canal (book p18). This concept describes the CANAL — three walls and four contents (book p12). Neither answers the other's question, so they are cross-linked rather than merged.
relationships: Walked the 41 live concepts on DIS-ANA-T03 and the nine new siblings in this file. The typed edges worth writing are part_of (this canal to the femoral artery's course) and prerequisite_of (femoral triangle to adductor canal). No relations batch is claimed for 103 BMS, so they are reported as owed rather than written.

---

# Item

## id
CON-MSK-32B5B7A5CD2A27

## label
Peroneus longus everts and plantar-flexes the foot and is supplied by the superficial peroneal nerve

## canonical_key
peroneus.longus.attachments-action-nerve

## aliases
Peroneus longus
Fibularis longus
Attachments of peroneus longus
Nerve supply of peroneus longus

## arabic_label
العضلة الشظوية الطويلة

## arabic_aliases
العضلة الشظوية الطويلة (بيرونيوس لونجس)
عضلة الشظية الطويلة

## definition
Peroneus longus arises from the upper two thirds of the lateral surface of the shaft of the fibula. Its tendon crosses the sole transversely from lateral to medial, in the fourth layer, to insert into the lateral aspect of the medial cuneiform and the lateral aspect of the base of the first metatarsal. It is supplied by the musculo-cutaneous (superficial peroneal) nerve. It everts the foot at the subtalar joint and plantar-flexes it at the ankle joint, and supports the lateral longitudinal and transverse arches.

## explicit_objective
State the origin, insertion, nerve supply and two actions of peroneus longus, and say which joint each action occurs at.

## pitfalls
Assuming that a muscle in the lateral compartment must dorsiflex the foot because it lies alongside the anterior compartment. Peroneus longus passes behind the lateral malleolus, so it plantar-flexes; only the anterior compartment dorsiflexes. The second error is giving the insertion as the fifth metatarsal — that is peroneus brevis.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
SYS-MSK-T01-S02-M04

## topic
Lower limb

## subtopic
The Leg

## microtopic
Muscles of the Lateral (Peroneal) Compartment of the Leg

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > The Leg > Muscles of the Lateral (Peroneal) Compartment of the Leg

## article_ids
ART-103-ANA-PERONEUS-LONGUS

## related_article_ids
ART-103-ANA-COMMON-PERONEAL-NERVE

## related_concept_ids
CON-MSK-C7BC26EBAF066B | CON-MSK-016DE81C5919CE

## resource_ids
src_23c95ac89b6b113bd58e

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.55

## exam_weight_by_year
KAU_Y1=0.55

## clinical_relevance
0.4

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.9

## atomic_claim_ids
CLM-MSK-PERONEUS-LONGUS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Mention attachment, action and nerve supply of Peroneus longus. {6 Marks}

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p10 | 103 BMS

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives eversion at the subtalar joint and plantar flexion at the ankle joint without saying which is the stronger action. It also lists arch support as a separate line rather than as a third action, and does not say whether an examiner would credit it as one.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The department book's own section, "Muscles of the Lateral (Peroneal) Compartment of the Leg", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-ANA-T03 and has nothing finer for the lower limb.
nanotopicId: The microtopic already names the compartment section the book prints; the book gives peroneus longus no subdivision beneath it.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "peroneus", "peroneal" and "eversion" — find-existing.mjs returns no record at all for any of the three.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found; "peroneus" matches nothing in live state or in any pending batch.
conflicts: The department book is the only source consulted for this content and the solved paper reproduces it word for word, so there is nothing for two sources to disagree about.
exclusionReason: This concept is intended for publication once its evidence is attached.
relationships: Walked the 41 live concepts on DIS-ANA-T03 and the nine new siblings. The edge worth writing is often_confused_with between this and CON-MSK-C7BC26EBAF066B, because peroneus longus is the muscle whose paralysis abolishes eversion. Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-D30F43945FC3C2

## label
Every hip movement has one prime mover with named assistants, and lateral rotation is the work of the six small rotators

## canonical_key
hip.movements.muscles-acting

## aliases
Movements of the hip joint
Muscles acting on the hip joint
Hip joint movements
Flexors and extensors of the hip

## arabic_label
حركات مفصل الورك والعضلات المحركة له

## arabic_aliases
مفصل الورك
حركات الورك

## definition
The hip is a polyaxial ball-and-socket synovial joint, so it moves in three planes. Flexion is mainly iliopsoas, assisted by sartorius and rectus femoris. Extension is mainly gluteus maximus, assisted by the hamstrings and the ischial part of adductor magnus. Abduction is mainly gluteus medius and minimus, assisted by tensor fasciae latae. Adduction is mainly the adductors, assisted by gracilis and pectineus. Medial rotation is gluteus medius and minimus, anterior fibres only. Lateral rotation is the small lateral rotators — obturator internus and externus, the two gemelli, quadratus femoris and piriformis — assisted by gluteus maximus and sartorius. Circumduction is a combination of flexion, abduction, extension and finally adduction.

## explicit_objective
List the seven movements of the hip joint and name, for each, the prime mover and its assisting muscles.

## pitfalls
Writing gluteus medius and minimus as pure abductors. Their anterior fibres are also the medial rotators of the hip, and a candidate who has not separated the two roles loses the medial-rotation mark entirely. The other habitual error is naming gluteus maximus as a lateral rotator without saying that it only assists the six small rotators.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
SYS-MSK-T01-S02-M01

## topic
Lower limb

## subtopic
Joints of the lower limb

## microtopic
The Hip joint

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > The Hip joint

## article_ids
ART-103-ANA-HIP-JOINT-MOVEMENTS

## related_article_ids
ART-MSK-TOP-0E61EF26D6

## related_concept_ids
CON-MSK-959D95DCE2E022 | CON-MSK-78379D5B8914BC

## resource_ids
src_23c95ac89b6b113bd58e

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.65

## exam_weight_by_year
KAU_Y1=0.65

## clinical_relevance
0.6

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.9

## atomic_claim_ids
CLM-MSK-HIP-MOVEMENTS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Regarding Hip joint, mention its movements and muscles acting on it. {6 Marks}

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p11 | 103 BMS

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-959D95DCE2E022

## conflicts
[clear]

## uncertainty
The book lists circumduction alongside the six true movements without saying whether an examiner expects it as a seventh. It is a combination of the other four rather than a movement in its own axis, so whether it earns a mark is a matter of local marking convention that no document in the corpus states.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The department book's own section, "The Hip joint", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-ANA-T03 and has nothing finer for the lower limb.
nanotopicId: The microtopic The Hip joint is the most precise node the department book's own chapter structure supports.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "hip", "hip joint", "iliopsoas" and "gluteus" — the only hits are two acetabular osteology records; "iliopsoas" and "gluteus" return nothing at all.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
conflicts: The department book's list on page 81 and the model answer printed in the solved paper are word for word identical, so no source disagreement arises here.
exclusionReason: This concept is intended for publication once its evidence is attached.
rejectedMergeCandidateIds: CON-MSK-959D95DCE2E022 is the acetabular articular surface — the socket's osteology, not what moves in it. A question on hip movements and one on the lunate surface share no objective, so the two are cross-linked and left separate.
relationships: Walked the 41 live concepts on DIS-ANA-T03 and the nine new siblings. The edges worth writing are prerequisite_of from the acetabular articular surface to this, and part_of from this to the sciatic nerve's articular branch. Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-0696B3F764DABC

## label
The posterior tibial artery gives seven branches, of which the peroneal is the largest and the main supply of the leg

## canonical_key
artery.posterior-tibial.branches

## aliases
Branches of the posterior tibial artery
Posterior tibial artery
Peroneal artery
Fibular artery

## arabic_label
الشريان الظنبوبي الخلفي

## arabic_aliases
فروع الشريان الظنبوبي الخلفي
الشريان الشظوي

## definition
The posterior tibial artery begins as the larger of the two terminal branches of the popliteal artery at the lower border of popliteus, and ends under the flexor retinaculum by dividing into the medial and lateral plantar arteries. Along the way it gives the circumflex fibular artery, the peroneal artery, muscular branches to the back of the leg, a nutrient artery to the tibia, a medial malleolar branch and a medial calcanean branch. The peroneal artery is the largest branch and the main supply of the leg, and itself gives muscular branches, a nutrient artery to the fibula, a lateral malleolar branch, a perforating branch and a lateral calcanean branch.

## explicit_objective
Summarise the branches of the posterior tibial artery, naming the terminal branches and the branches of the peroneal artery separately.

## pitfalls
Treating the peroneal artery as a branch of the anterior tibial artery because it ends up supplying the lateral side of the leg. It arises from the posterior tibial. The other habitual error is forgetting that the perforating branch of the peroneal can be large enough to replace the dorsalis pedis, which is why a missing dorsalis pedis pulse is not by itself evidence of disease.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
SYS-MSK-T01-S02-M04

## topic
Lower limb

## subtopic
The Leg

## microtopic
Posterior Tibial Artery

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > The Leg > Posterior Tibial Artery

## article_ids
ART-103-ANA-POSTERIOR-TIBIAL-ARTERY

## related_article_ids
ART-MSK-TOP-BD3D529647

## related_concept_ids
CON-MSK-C304D4DB6EDD7A | CON-MSK-F656F96F575FFB | CON-MSK-9E550B805ACC9F

## resource_ids
src_23c95ac89b6b113bd58e

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.55

## exam_weight_by_year
KAU_Y1=0.55

## clinical_relevance
0.6

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.9

## atomic_claim_ids
CLM-MSK-POST-TIBIAL-BRANCHES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Summaries branches of Posterior Tibial artery. {6 Marks}

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p12 | 103 BMS

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-C304D4DB6EDD7A

## conflicts
[clear]

## uncertainty
The book numbers seven branches but lists the medial and lateral plantar arteries as one numbered item, so whether the count is seven or eight depends on how the terminal division is counted. It also does not say whether the circumflex fibular artery is expected of a first-year candidate.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The department book's own section, "Posterior Tibial Artery", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-ANA-T03 and has nothing finer for the lower limb.
nanotopicId: The microtopic Posterior Tibial Artery is the most precise node the department book's own section headings support.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "posterior tibial", "circumflex fibular" and "nutrient artery" — none returns any record; "tibial artery" returns only anterior tibial records.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
conflicts: The department book's branch list on page 65 and the solved paper's model answer are identical, so no source disagreement arises here.
exclusionReason: This concept is intended for publication once its evidence is attached.
rejectedMergeCandidateIds: CON-MSK-C304D4DB6EDD7A is the anterior tibial artery entering the anterior compartment — the other terminal branch of the popliteal, a different vessel. Cross-linked because the two divide together, deliberately not merged.
relationships: Walked the 41 live concepts on DIS-ANA-T03 and the nine new siblings. The edges worth writing are contrasts_with to the anterior tibial artery and part_of from the medial malleolar and calcanean branches to CON-MSK-9E550B805ACC9F, the ankle anastomosis. Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-D622CBF981F879

## label
The sciatic nerve leaves the pelvis below piriformis and divides a little below the middle of the thigh

## canonical_key
sciatic.course.pelvis-to-lower-thigh

## aliases
Course of the sciatic nerve
Sciatic nerve
Sciatic nerve course
Nervus ischiadicus

## arabic_label
مسار العصب الوركي

## arabic_aliases
العصب الوركي
العصب النسوي

## definition
The sciatic nerve is the thickest nerve in the body. It arises from the sacral plexus from the anterior and posterior divisions of L4, L5, S1, S2 and S3 inside the pelvis, and leaves the pelvis through the greater sciatic foramen below piriformis to enter the gluteal region. It descends on the back of the ischium and enters the back of the thigh midway between the greater trochanter and the ischial tuberosity, and it ends a little below the middle of the thigh by dividing into its two terminal branches, the common peroneal and the tibial nerve.

## explicit_objective
Trace the sciatic nerve from the sacral plexus to its division, naming the foramen it uses, its relation to piriformis, and the level at which it divides.

## pitfalls
Saying the nerve divides at the apex of the popliteal fossa. It divides a little below the middle of the thigh, well above the fossa, which is why the two terminal nerves enter the popliteal fossa already separate. Naming the lesser sciatic foramen instead of the greater is the other habitual slip.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
SYS-MSK-T01-S02-M02

## topic
Lower limb

## subtopic
The Gluteal Region

## microtopic
Sciatic Nerve

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > The Gluteal Region > Sciatic Nerve

## article_ids
ART-103-ANA-SCIATIC-NERVE

## related_article_ids
ART-103-ANA-COMMON-PERONEAL-NERVE

## related_concept_ids
CON-MSK-51EC648BDAF36B

## resource_ids
src_23c95ac89b6b113bd58e

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.7

## exam_weight_by_year
KAU_Y1=0.7

## clinical_relevance
0.7

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.9

## atomic_claim_ids
CLM-MSK-SCIATIC-COURSE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Regarding Sciatic nerve, mention its course and branches. {6 Marks}

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p13 | 103 BMS

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book says the nerve leaves the pelvis below piriformis and does not mention the well-described variant in which part or all of it pierces or passes above the muscle. Whether that variant is examinable at Kasr Al Ainy in year one is not stated anywhere in the corpus.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The department book's own section, "Sciatic Nerve", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-ANA-T03 and has nothing finer for the lower limb.
nanotopicId: The microtopic Sciatic Nerve is the most precise node the department book's chapter on the gluteal region supports.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "sciatic" — find-existing.mjs returns no record at all, in live state or in any pending batch.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found; "sciatic" matches nothing anywhere.
conflicts: Only the department book was used for this content and the solved paper reproduces it, so there is nothing for two sources to disagree about.
exclusionReason: This concept is intended for publication once its evidence is attached.
relationships: Walked the 41 live concepts on DIS-ANA-T03 and the nine new siblings. The edge worth writing is prerequisite_of from this course to CON-MSK-51EC648BDAF36B, its branches, since the branch list only makes sense once the division level is known. Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-51EC648BDAF36B

## label
The sciatic nerve gives two terminal divisions, muscular branches split between its tibial and common peroneal parts, and an articular branch to the hip

## canonical_key
sciatic.branches.terminal-muscular-articular

## aliases
Branches of the sciatic nerve
Sciatic nerve branches
Muscular branches of the sciatic nerve

## arabic_label
فروع العصب الوركي

## arabic_aliases
تفرعات العصب الوركي
الفرع الظنبوبي والفرع الشظوي المشترك

## definition
The sciatic nerve's branches are the tibial (medial popliteal) nerve, the larger terminal division which leaves the thigh and enters the popliteal fossa; the common peroneal (lateral popliteal) nerve, the smaller terminal division which enters the fossa lateral to the tibial nerve; muscular branches, which come from the tibial part to the long head of biceps femoris, semitendinosus, semimembranosus and the ischial part of adductor magnus, and from the common peroneal part to the short head of biceps femoris alone; and articular branches to the hip joint.

## explicit_objective
List the branches of the sciatic nerve and state which of the two parts supplies each hamstring, distinguishing the short head of biceps femoris from the rest.

## pitfalls
Listing the hamstrings as a block supplied by the sciatic nerve. The short head of biceps femoris is the one muscle in the group supplied by the common peroneal part; everything else in the group comes off the tibial part. That single exception is what the question is testing.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
SYS-MSK-T01-S02-M02

## topic
Lower limb

## subtopic
The Gluteal Region

## microtopic
Sciatic Nerve

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > The Gluteal Region > Sciatic Nerve

## article_ids
ART-103-ANA-SCIATIC-NERVE

## related_article_ids
ART-103-ANA-COMMON-PERONEAL-NERVE

## related_concept_ids
CON-MSK-D622CBF981F879 | CON-MSK-AB5318A9255811

## resource_ids
src_23c95ac89b6b113bd58e

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.7

## exam_weight_by_year
KAU_Y1=0.7

## clinical_relevance
0.6

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.9

## atomic_claim_ids
CLM-MSK-SCIATIC-BRANCHES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Regarding Sciatic nerve, mention its course and branches. {6 Marks}

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p13 | 103 BMS

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives articular branches to the hip joint but does not say whether the sciatic also sends an articular branch to the knee; its knee articular branches are listed instead under the tibial and common peroneal nerves once they have separated.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The department book's own section, "Sciatic Nerve", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-ANA-T03 and has nothing finer for the lower limb.
nanotopicId: The microtopic Sciatic Nerve is the most precise node the department book's chapter on the gluteal region supports.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "sciatic" and "hamstring" — neither returns any record in live state or in any pending batch.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found; "sciatic" matches nothing anywhere.
conflicts: Only the department book was used and the solved paper reproduces its branch list, so there is nothing for two sources to disagree about.
exclusionReason: This concept is intended for publication once its evidence is attached.
relationships: Kept separate from CON-MSK-D622CBF981F879 because the paper asks course and branches as two things and a student can hold one without the other; the two are cross-linked and a prerequisite_of edge is owed. No relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-AB5318A9255811

## label
A fracture of the neck of the fibula injures the common peroneal nerve, because the nerve is wrapped around that neck

## canonical_key
fibula.neck-fracture.common-peroneal-injury

## aliases
Common peroneal nerve injury
Lateral popliteal nerve injury
Fibular neck fracture and nerve injury
Causes of common peroneal nerve injury

## arabic_label
إصابة العصب الشظوي المشترك بكسر عنق الشظية

## arabic_aliases
العصب الشظوي المشترك
العصب المأبضي الوحشي

## definition
The common peroneal nerve leaves the popliteal fossa, curves behind the head of the fibula and then lies against the lateral aspect of its neck, covered only by skin and fascia, before it pierces peroneus longus. That superficial course against bone is why a fracture of the head or neck of the fibula — or pressure from a cast or splint at that point — is the classic cause of common peroneal nerve injury.

## explicit_objective
Given a fracture of the neck of the fibula, name the nerve at risk and justify the answer from the nerve's course.

## pitfalls
Naming the sciatic nerve because the deficit is below the knee. The sciatic has already divided in the mid-thigh, and a fracture at the fibular neck is far too distal to reach it; only the common peroneal is against that bone. Naming the tibial nerve is the other error — the tibial nerve runs down the back of the leg, nowhere near the fibular neck.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
SYS-MSK-T03-S01-M02

## topic
Lower limb

## subtopic
Popliteal Fossa

## microtopic
Common Peroneal Nerve (Lateral popliteal nerve)

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Popliteal Fossa > Common Peroneal Nerve (Lateral popliteal nerve)

## article_ids
ART-103-ANA-COMMON-PERONEAL-NERVE

## related_article_ids
ART-103-ANA-SCIATIC-NERVE

## related_concept_ids
CON-MSK-C7BC26EBAF066B | CON-MSK-0351AAD4CAB1EE | CON-MSK-016DE81C5919CE | CON-MSK-51EC648BDAF36B

## resource_ids
src_23c95ac89b6b113bd58e

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.85

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.9

## atomic_claim_ids
CLM-MSK-CPN-INJURY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Case: An old man trying to cross the road stumbled and fell and was hit by a fast crossing car. He was transferred to hospital where x-ray declared fracture of the neck of left fibula. On examining the patients lower limb he was unable to perform dorsiflexion and eversion of the left foot.
a) What is the most probable injured nerve? {1 Mark}

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p14 | 103 BMS

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
Marks for the Anatomy case: the Anatomy department's own "Orientation of final Anatomy Exam (End of Year, 2025-2026)" states "5 SAQ, 6 marks each with total 30 mark" plus "1 case, 5 marks", giving 35 marks for the section. The paper as sat — EOY (BMS - 103) 199 (2).pdf, src_37f6c0daf3436096af19, page 14 — prints the case as four parts of {1 Mark} each, giving 4 for the case and 34 for the section. Page 14 was confirmed visually: four parts, one mark each. Both positions are recorded and neither is adopted as the truth; the written questions in this batch carry the marks the paper prints.

## uncertainty
The book gives fracture of the head or neck of the fibula and pressure from casts or splints as the causes of injury, and does not say which is commoner, nor whether the nerve is more often injured at the head or at the neck.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The department book's own section, "Common Peroneal Nerve (Lateral popliteal nerve)", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-ANA-T03 and has nothing finer for the lower limb.
nanotopicId: The microtopic already names the book's own section for this nerve; the book prints no subdivision beneath it.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "peroneal", "fibula" and "common peroneal" — "peroneal" returns nothing, and "fibula" returns only the anterior tibial artery record, which is about a different structure at the same landmark.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found; no live concept concerns the common peroneal nerve.
exclusionReason: This concept is intended for publication once its evidence is attached.
relationships: Walked the 41 live concepts on DIS-ANA-T03 and the nine new siblings. The edges worth writing are causes from this to CON-MSK-C7BC26EBAF066B and complication_of from CON-MSK-016DE81C5919CE to this. Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-C7BC26EBAF066B

## label
Common peroneal palsy abolishes dorsiflexion and eversion because it denervates both the anterior and the lateral compartment of the leg

## canonical_key
peroneal.common.motor-loss-dorsiflexion-eversion

## aliases
Motor effects of common peroneal nerve injury
Loss of dorsiflexion and eversion
Foot drop mechanism
Paralysis of the peroneal muscles

## arabic_label
الشلل الحركي الناتج عن إصابة العصب الشظوي المشترك

## arabic_aliases
فقد العطف الظهري والقلب الوحشي للقدم
هبوط القدم

## definition
The common peroneal nerve divides inside peroneus longus into the superficial and deep peroneal nerves. The deep peroneal nerve supplies the extensor muscles of the front of the leg, which dorsiflex the foot; the superficial peroneal nerve supplies the three peroneal muscles, which evert it. A lesion of the parent nerve therefore denervates both compartments at once: dorsiflexion is lost, giving foot drop, and eversion is lost with it.

## explicit_objective
Explain why a common peroneal lesion abolishes both dorsiflexion and eversion, naming the terminal nerve and the muscle group responsible for each movement.

## pitfalls
Explaining the loss as damage to the muscles themselves. The muscles are intact; they are denervated. The second error is attributing eversion to the anterior compartment — eversion is the peroneal muscles of the lateral compartment, supplied by the superficial peroneal nerve, and only dorsiflexion belongs to the anterior compartment.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
SYS-MSK-T01-S02-M04

## topic
Lower limb

## subtopic
Popliteal Fossa

## microtopic
Common Peroneal Nerve (Lateral popliteal nerve)

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Popliteal Fossa > Common Peroneal Nerve (Lateral popliteal nerve)

## article_ids
ART-103-ANA-COMMON-PERONEAL-NERVE

## related_article_ids
ART-103-ANA-PERONEUS-LONGUS

## related_concept_ids
CON-MSK-AB5318A9255811 | CON-MSK-016DE81C5919CE | CON-MSK-32B5B7A5CD2A27

## resource_ids
src_23c95ac89b6b113bd58e

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.85

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.9

## atomic_claim_ids
CLM-MSK-CPN-MOTOR-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
b) Why the patient cannot perform dorsiflexion and eversion of the left foot? {1 Mark}

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p14 | 103 BMS

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
Marks for the Anatomy case: the department's Anatomy orientation gives the case 5 marks within a 35-mark section, while the paper as sat prints four parts of {1 Mark} each on page 14, giving 4 and a 34-mark section. Both are recorded; see CON-MSK-AB5318A9255811 for the full statement. The written questions in this batch carry the marks the paper prints.

## uncertainty
The book states the motor effects but does not say how much eversion, if any, survives through tibialis anterior or the long extensors, so the completeness of the loss is not something the corpus settles.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The department book's own section, "Common Peroneal Nerve (Lateral popliteal nerve)", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-ANA-T03 and has nothing finer for the lower limb.
nanotopicId: The microtopic already names the book's own section for this nerve; the book prints no subdivision beneath it.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "dorsiflexion", "eversion", "foot drop" and "peroneal" — none of the four returns any record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found; no live concept concerns the common peroneal nerve or its motor territory.
exclusionReason: This concept is intended for publication once its evidence is attached.
relationships: Kept separate from CON-MSK-AB5318A9255811 because a student can name the nerve at risk without being able to explain the deficit; a causes edge from that concept to this one is owed. No relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-0351AAD4CAB1EE

## label
The cutaneous branches the common peroneal nerve gives in the popliteal fossa are the sural communicating nerve and the lateral cutaneous nerve of the calf

## canonical_key
peroneal.common.cutaneous-branches

## aliases
Cutaneous branches of the common peroneal nerve
Lateral cutaneous nerve of calf
Sural communicating nerve
Peroneal communicating branch

## arabic_label
الفروع الجلدية للعصب الشظوي المشترك

## arabic_aliases
العصب الجلدي الوحشي للربلة
العصب الرابط الربلي

## definition
While it is still in the popliteal fossa the common peroneal nerve gives two cutaneous branches. The sural communicating nerve arises in the upper part of the fossa and runs inferomedially to join the sural nerve. The lateral cutaneous nerve of the calf arises on the lateral head of gastrocnemius and supplies the upper third of the anterolateral side of the leg. The nerve's other cutaneous territory — the front of the lower leg and the dorsum of the foot — is reached later, through its terminal superficial and deep peroneal branches.

## explicit_objective
Name the two cutaneous branches the common peroneal nerve gives in the popliteal fossa and state the skin each supplies.

## pitfalls
Answering with the sural nerve itself. The common peroneal contributes the sural communicating nerve, which joins the sural; the sural nerve proper is a branch of the tibial nerve. The other error is listing the superficial and deep peroneal nerves here — they are terminal branches, given after the nerve has left the fossa, not cutaneous branches within it.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
SYS-MSK-T01-S02-M04

## topic
Lower limb

## subtopic
Popliteal Fossa

## microtopic
Common Peroneal Nerve (Lateral popliteal nerve)

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Popliteal Fossa > Common Peroneal Nerve (Lateral popliteal nerve)

## article_ids
ART-103-ANA-COMMON-PERONEAL-NERVE

## related_article_ids
ART-103-ANA-SCIATIC-NERVE

## related_concept_ids
CON-MSK-AB5318A9255811 | CON-MSK-C7BC26EBAF066B

## resource_ids
src_23c95ac89b6b113bd58e

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.9

## atomic_claim_ids
CLM-MSK-CPN-CUTANEOUS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
c) Name the cutaneous branches of the injured nerve. {1 Mark}

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p14 | 103 BMS

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
Marks for the Anatomy case: the department's Anatomy orientation gives the case 5 marks within a 35-mark section, while the paper as sat prints four parts of {1 Mark} each on page 14, giving 4 and a 34-mark section. Both are recorded; see CON-MSK-AB5318A9255811 for the full statement. The written questions in this batch carry the marks the paper prints.

## uncertainty
The book calls the branch the sural communicating nerve while the solved paper's model answer calls it the sural communicating nerve too, but other texts call the same branch the peroneal communicating branch. Which name a Kasr examiner expects is not stated in any document in the corpus.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The department book's own section, "Common Peroneal Nerve (Lateral popliteal nerve)", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-ANA-T03 and has nothing finer for the lower limb.
nanotopicId: The microtopic already names the book's own section for this nerve; the book prints no subdivision beneath it.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "sural", "cutaneous nerve of calf" and "peroneal" — "sural" matches only a neuroanatomy record through the substring in "commissural", and "cutaneous nerve of calf" matches one live citation, CIT-DA222FFC046089, with no concept attached to it.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found; the single "cutaneous nerve of calf" hit is a citation, not a concept, so there is nothing to merge with.
exclusionReason: This concept is intended for publication once its evidence is attached.
relationships: Walked the 41 live concepts on DIS-ANA-T03 and the nine new siblings. The edge worth writing is part_of from these branches to CON-MSK-AB5318A9255811. Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-016DE81C5919CE

## label
The deformity of common peroneal palsy is talipes equinovarus, and its mirror image, talipes calcaneo-valgus, belongs to the tibial nerve

## canonical_key
peroneal.common.talipes-equinovarus

## aliases
Talipes equinovarus
Foot drop
Drop foot
Talipes equino varus
Deformity of common peroneal nerve injury

## arabic_label
القدم الحنفاء الفحجاء (هبوط القدم)

## arabic_aliases
هبوط القدم
حنف القدم

## definition
When the common peroneal nerve is injured the foot hangs plantar-flexed because the anterior compartment no longer dorsiflexes it, and it is drawn into inversion because the peroneal muscles no longer evert it against the intact invertors. That combination — foot drop with inversion — is talipes equinovarus. Injury of the tibial nerve produces the opposite picture, dorsiflexion and eversion of the foot, which is talipes calcaneo-valgus.

## explicit_objective
Name the deformity that follows a common peroneal nerve injury and distinguish it from the deformity of a tibial nerve injury.

## pitfalls
Swapping the two names. Equinovarus is the horse-hoof foot of the peroneal lesion — down and in; calcaneo-valgus is the tibial lesion — up and out. Students who learn only "foot drop" for the peroneal nerve lose the mark when the question asks for the deformity by name.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
SYS-MSK-T01-S02-M05

## topic
Lower limb

## subtopic
Popliteal Fossa

## microtopic
Common Peroneal Nerve (Lateral popliteal nerve)

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Popliteal Fossa > Common Peroneal Nerve (Lateral popliteal nerve)

## article_ids
ART-103-ANA-COMMON-PERONEAL-NERVE

## related_article_ids
ART-103-ANA-PERONEUS-LONGUS

## related_concept_ids
CON-MSK-C7BC26EBAF066B | CON-MSK-AB5318A9255811

## resource_ids
src_23c95ac89b6b113bd58e

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.55

## exam_weight_by_year
KAU_Y1=0.55

## clinical_relevance
0.85

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.9

## atomic_claim_ids
CLM-MSK-CPN-DEFORMITY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
d) Name the deformity resulting. {1 Mark}

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p14 | 103 BMS

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
Marks for the Anatomy case: the department's Anatomy orientation gives the case 5 marks within a 35-mark section, while the paper as sat prints four parts of {1 Mark} each on page 14, giving 4 and a 34-mark section. Both are recorded; see CON-MSK-AB5318A9255811 for the full statement. The written questions in this batch carry the marks the paper prints.
Spelling of the deformity: the department book prints "talipes equinovarus" (p49) and the solved paper's model answer writes "Talipus equinio varus" (p14). The book's spelling is used here; the paper's is preserved verbatim only inside the written question's mark scheme.

## uncertainty
Whether "foot drop" alone earns the mark, or whether the examiner requires the words talipes equinovarus, is not stated in the orientation or on the paper. The solved copy's model answer gives both, which suggests both are wanted but does not settle it.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The department book's own section, "Common Peroneal Nerve (Lateral popliteal nerve)", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-ANA-T03 and has nothing finer for the lower limb.
nanotopicId: The microtopic already names the book's own section for this nerve; the book prints no subdivision beneath it.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "talipes", "foot drop", "equinovarus" and "deformity" — none returns any record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found; neither deformity name matches anything in live state or in any pending batch.
exclusionReason: This concept is intended for publication once its evidence is attached.
relationships: The highest-value edge in this batch is often_confused_with between this concept and the tibial-nerve deformity, talipes calcaneo-valgus, which the book prints on the facing page (p48) and which no live concept yet carries. Reported as owed, together with complication_of from this to CON-MSK-AB5318A9255811; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-594BD65D8C0D7A

## label
Anterior relations in adductor canal

## canonical_key
femur.adductor-canal.anterior-relations

## modules
103 BMS

## module_subject
103 BMS > Anatomy > The Thigh > Adductor canal

## learner_years
1

## universities
kau

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p9 | 103 BMS

## article_ids
+ART-103-ANA-ADDUCTOR-CANAL

## related_concept_ids
+CON-MSK-59755B64721E3D

---

# Item

## id
CON-MSK-700EC3AB121997

## label
Adductor longus behind femoral artery

## canonical_key
femur.adductor-canal.posterior-relation-adductor-longus

## modules
103 BMS

## module_subject
103 BMS > Anatomy > The Thigh > Adductor canal

## learner_years
1

## universities
kau

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p9 | 103 BMS

## article_ids
+ART-103-ANA-ADDUCTOR-CANAL

## related_concept_ids
+CON-MSK-59755B64721E3D

---

# Item

## id
CON-MSK-6F2C49EFF66B46

## label
Adductor magnus behind femoral artery

## canonical_key
femur.adductor-canal.posterior-relation-adductor-magnus

## modules
103 BMS

## module_subject
103 BMS > Anatomy > The Thigh > Adductor canal

## learner_years
1

## universities
kau

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p9 | 103 BMS

## article_ids
+ART-103-ANA-ADDUCTOR-CANAL

## related_concept_ids
+CON-MSK-59755B64721E3D

---

# Item

## id
CON-MSK-959D95DCE2E022

## label
Acetabular hip articular surface

## canonical_key
hip.acetabulum.articular-surface

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > The Hip joint

## learner_years
1

## universities
kau

## related_concept_ids
+CON-MSK-D30F43945FC3C2

---

# Item

## id
CON-MSK-78379D5B8914BC

## label
Acetabular branch of medial circumflex

## canonical_key
hip.acetabulum.acetabular-branch-medial-circumflex

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > The Hip joint

## learner_years
1

## universities
kau

## related_concept_ids
+CON-MSK-D30F43945FC3C2
