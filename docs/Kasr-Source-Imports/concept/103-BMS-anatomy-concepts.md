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

## definition
Inside the adductor canal, the femoral artery has two structures anterior to it: the fibrous antero-medial roof of the canal itself, and sartorius, which lies on top of that roof. The book states this as the first of the canal's four relations, opposite the posterior relations of adductor longus and adductor magnus.

## explicit_objective
State what lies anterior to the femoral artery inside the adductor canal, distinguishing the fibrous roof from the muscle that merely covers it.

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

## original_wording
In the adductor canal: Anteriorly: fibrous roof of the adductor canal and sartorius muscle.

## article_ids
+ART-103-ANA-ADDUCTOR-CANAL

## related_concept_ids
+CON-MSK-59755B64721E3D

## field_notes
definition: Dpt book Anatomy Lower Limb 103.pdf (src_23c95ac89b6b113bd58e), p18, "In the adductor canal: Anteriorly: fibrous roof of the adductor canal and sartorius muscle."
explicitObjective: Derived from the same page; no separate ILO line names this relation individually, so the objective is stated from the book's own relations list.
atomicClaimIds: Left as-is (untouched) — this update row does not change atomic_claim_ids, and the live record already carries CLM-MSK-594BD65D8C0D7A.

---

# Item

## id
CON-MSK-700EC3AB121997

## label
Adductor longus behind femoral artery

## canonical_key
femur.adductor-canal.posterior-relation-adductor-longus

## definition
Inside the adductor canal, adductor longus lies posterior to the femoral artery in the upper part of the canal, above adductor magnus. The book notes that adductor longus is also what separates the femoral artery from the profunda femoris vessels at this level, so the same muscle both forms a posterior relation of the artery and keeps it apart from the deep vessels of the thigh.
Adductor magnus lies posterior to adductor longus, forming the lower part of the same posterior relation before the femoral vessels reach the adductor hiatus.

## explicit_objective
Name the two muscles that lie posterior to the femoral artery in the adductor canal, in order from above downwards, and state what adductor longus separates the artery from.

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

## original_wording
In the adductor canal: Posteriorly: a- Adductor longus (which separates it from the profunda femoris vessels). b- Adductor magnus. c- Femoral vein: in the upper part of the canal.

## article_ids
+ART-103-ANA-ADDUCTOR-CANAL

## related_concept_ids
+CON-MSK-59755B64721E3D | CON-MSK-6F2C49EFF66B46

## field_notes
definition: Dpt book Anatomy Lower Limb 103.pdf (src_23c95ac89b6b113bd58e), p18, the three-part posterior relations list of the femoral artery in the canal.
explicitObjective: Derived from the same page's ordered list (a, b, c).
atomicClaimIds: Left as-is (untouched) — this update row does not change atomic_claim_ids, and the live record already carries CLM-MSK-700EC3AB121997.

---

# Item

## id
CON-MSK-6F2C49EFF66B46

## label
Adductor magnus behind femoral artery

## canonical_key
femur.adductor-canal.posterior-relation-adductor-magnus

## definition
Adductor magnus is the second of the two muscles posterior to the femoral artery inside the adductor canal, lying below adductor longus. The femoral vein is also posterior to the artery, but only in the upper part of the canal, where it still lies alongside it before crossing to the medial side lower down. Adductor magnus itself is pierced lower still, at the adductor hiatus, which is where the femoral vessels leave the canal to become the popliteal vessels.

## explicit_objective
State which muscle lies immediately behind adductor longus as a posterior relation of the femoral artery in the adductor canal, and say what opening in that same muscle marks the end of the canal.

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

## original_wording
In the adductor canal: Posteriorly: a- Adductor longus... b- Adductor magnus. c- Femoral vein: in the upper part of the canal.

## article_ids
+ART-103-ANA-ADDUCTOR-CANAL

## related_concept_ids
+CON-MSK-59755B64721E3D | CON-MSK-700EC3AB121997

## field_notes
definition: Dpt book Anatomy Lower Limb 103.pdf (src_23c95ac89b6b113bd58e), p18 for the posterior relations, and p17 for the femoral artery ending "at the opening in the adductor magnus where it enters the popliteal fossa and becomes the popliteal artery."
explicitObjective: Derived from the same two passages.
atomicClaimIds: Left as-is (untouched) — this update row does not change atomic_claim_ids, and the live record already carries CLM-MSK-6F2C49EFF66B46.

---

# Item

## id
CON-MSK-959D95DCE2E022

## label
Acetabular hip articular surface

## canonical_key
hip.acetabulum.articular-surface

## definition
The acetabulum of the hip bone is the cup-like socket of the hip joint, articulating with the head of the femur. Its own articular surface is not the whole cup: a smooth, horseshoe-shaped area, the lunate articular surface, runs around the outer rim, while the centre of the socket is a rough, non-articular acetabular fossa. The horseshoe is open at its lower margin, the acetabular notch, which the transverse acetabular ligament bridges to form the acetabular foramen for the vessels and nerves entering the joint.

## explicit_objective
Distinguish the articular from the non-articular parts of the acetabulum, name the horseshoe-shaped articular surface and the depression it surrounds, and state what interrupts the horseshoe inferiorly.

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > The Hip joint

## learner_years
1

## universities
kau

## original_wording
Articulating bones: a- Head of femur (rounded ball). b- Acetabulum of hip bone (cup-like socket). [Figure labels:] Smooth lunate articular surface; Rough Acetabular fossa; Acetabular notch.

## article_ids
+ART-103-ANA-HIP-JOINT-STRUCTURE

## related_concept_ids
+CON-MSK-D30F43945FC3C2 | CON-MSK-78379D5B8914BC

## field_notes
definition: Dpt book Anatomy Lower Limb 103.pdf (src_23c95ac89b6b113bd58e), p76 for the articulating bones, and the labelled figure on p77 for the lunate articular surface, acetabular fossa and acetabular notch; p80 for the transverse acetabular ligament converting the notch into a foramen.
explicitObjective: Derived from the same figure and surrounding text.
articleIds: Previously untaught — `coverage/101-ISK-untaught-concepts.md` named this concept as covered by no article. ART-103-ANA-HIP-JOINT-STRUCTURE, written alongside this update, now teaches it and lists it back in `related_concepts`.
atomicClaimIds: Left as-is (untouched) — this update row does not change atomic_claim_ids, and the live record already carries CLM-MSK-959D95DCE2E022.

---

# Item

## id
CON-MSK-78379D5B8914BC

## label
Acetabular branch of medial circumflex

## canonical_key
hip.acetabulum.acetabular-branch-medial-circumflex

## definition
The medial circumflex femoral artery, a branch of the profunda femoris arising from its postero-medial aspect, gives an acetabular branch that reaches the hip joint through the acetabular foramen — the foramen formed when the transverse acetabular ligament bridges the acetabular notch. The same medial circumflex artery also gives an ascending branch, which shares in the trochanteric anastomosis, and a transverse branch, which winds around the femur near the lesser trochanter to share in the cruciate anastomosis; the acetabular branch is the one of the three that enters the joint itself rather than contributing to the peri-trochanteric anastomoses.

## explicit_objective
Name the parent artery of the acetabular branch, state the route by which the branch reaches the hip joint, and distinguish it from the medial circumflex artery's other two named branches.

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > The Hip joint

## learner_years
1

## universities
kau

## original_wording
Medial circumflex femoral artery: arises from the postero-medial aspect of the profunda artery... It gives the following branches: Acetabular branch: to the hip joint via the acetabular foramen. Ascending branch: shares in the trochanteric anastomosis. Transverse branch: winds around the femur close to the lesser trochanter to share in the cruciate anastomosis.

## article_ids
+ART-103-ANA-HIP-JOINT-STRUCTURE

## related_concept_ids
+CON-MSK-D30F43945FC3C2 | CON-MSK-959D95DCE2E022

## field_notes
definition: Dpt book Anatomy Lower Limb 103.pdf (src_23c95ac89b6b113bd58e), p20 for the medial circumflex femoral artery's three named branches, and p80 for the transverse acetabular ligament forming the acetabular foramen the branch travels through.
explicitObjective: Derived from the same page's branch list.
articleIds: Previously untaught — `coverage/101-ISK-untaught-concepts.md` named this concept as covered by no article. ART-103-ANA-HIP-JOINT-STRUCTURE, written alongside this update, now teaches it and lists it back in `related_concepts`.
atomicClaimIds: Left as-is (untouched) — this update row does not change atomic_claim_ids, and the live record already carries CLM-MSK-78379D5B8914BC.

---

# Item

## id
CON-MSK-F656F96F575FFB

## label
Anterior-tibial transition to dorsalis pedis

## canonical_key
anterior-tibial.dorsalis-pedis-transition

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > The Foot > Dorsalis Pedis Artery

## learner_years
1

## universities
kau

## original_wording
Dorsalis Pedis Artery: Begins: as a continuation of the anterior tibial artery, in front of the ankle joint, and midway between the 2 malleoli (where its pulsations can be felt easily).

## article_ids
+ART-103-ANA-DORSUM-AND-SOLE-OF-FOOT

## related_concept_ids
+CON-MSK-71EEF2E5A3E88A

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty, per the module-wide note that every live concept currently carries `moduleIds: []`.
articleIds: This concept was already taught by ART-MSK-TOP-BD3D529647; ART-103-ANA-DORSUM-AND-SOLE-OF-FOOT is added as a second, module-scoped teaching article covering the same artery's branches, which the existing article does not name.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.

---

# Item

## id
CON-MSK-71EEF2E5A3E88A

## label
Bony bed of dorsalis pedis

## canonical_key
dorsalis-pedis.bony-bed

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > The Foot > Dorsalis Pedis Artery

## learner_years
1

## universities
kau

## original_wording
Course and relations: It runs forwards on the dorsum of foot, lying superficial throughout its course. Ends: at the 1st interosseous space, by passing between the 2 heads of the 1st dorsal interosseous muscle to reach the sole of foot.

## article_ids
+ART-103-ANA-DORSUM-AND-SOLE-OF-FOOT

## related_concept_ids
+CON-MSK-F656F96F575FFB

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement, for the same reason as its sibling CON-MSK-F656F96F575FFB.
articleIds: Second, module-scoped teaching article added alongside the existing ART-MSK-TOP-BD3D529647; this one names the branches (medial/lateral tarsal, arcuate, 1st dorsal and 1st plantar metatarsal) that the existing article does not.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.

---

# Item

## id
CON-DER-5D2999E827DC6B

## label
Ilioinguinal cutaneous territory

## canonical_key
ilioinguinal.l1-upper-medial-thigh-genitalia

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > General Topics > Cutaneous Innervation of the Lower Limb

## learner_years
1

## universities
kau

## original_wording
From the lumbar plexus: 1. Ilio-inguinal nerve (L1): to skin of upper part of medial side of thigh and skin of adjoining external genitalia.

## article_ids
+ART-103-ANA-CUTANEOUS-AND-DERMATOMES

## related_concept_ids
+CON-DER-A12AE15E4F43CD | CON-DER-6EB8AEB4918087

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty.
articleIds: This concept was already taught by ART-DER-TOP-D0F14FE2BA; ART-103-ANA-CUTANEOUS-AND-DERMATOMES is added as a second, module-scoped article grouping it with the module's own lower-limb cutaneous-nerve list.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.

---

# Item

## id
CON-DER-A12AE15E4F43CD

## label
Femoral genitofemoral territory

## canonical_key
genitofemoral-femoral.l1-l2-upper-anterior-thigh

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > General Topics > Cutaneous Innervation of the Lower Limb

## learner_years
1

## universities
kau

## original_wording
From the lumbar plexus: 2. Femoral branch of genito-femoral nerve (L1, 2): to skin of upper part of front of thigh.

## article_ids
+ART-103-ANA-CUTANEOUS-AND-DERMATOMES

## related_concept_ids
+CON-DER-5D2999E827DC6B | CON-DER-6EB8AEB4918087

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty.
articleIds: Second, module-scoped article added alongside the existing ART-DER-TOP-D0F14FE2BA.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.

---

# Item

## id
CON-DER-6EB8AEB4918087

## label
Lateral femoral cutaneous territory

## canonical_key
lateral-femoral-cutaneous.l2-l3-lateral-thigh

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > General Topics > Cutaneous Innervation of the Lower Limb

## learner_years
1

## universities
kau

## original_wording
From the lumbar plexus: 3. Lateral cutaneous nerve of thigh (L2, 3): to skin of lateral side of thigh.

## article_ids
+ART-103-ANA-CUTANEOUS-AND-DERMATOMES

## related_concept_ids
+CON-DER-5D2999E827DC6B | CON-DER-A12AE15E4F43CD | CON-DER-D0C26711910B1B

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty.
articleIds: Second, module-scoped article added alongside the existing ART-DER-TOP-D0F14FE2BA.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.

---

# Item

## id
CON-DER-D0C26711910B1B

## label
Medial femoral cutaneous territory

## canonical_key
femoral-medial-cutaneous.medial-thigh

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > General Topics > Cutaneous Innervation of the Lower Limb

## learner_years
1

## universities
kau

## original_wording
From the femoral nerve: a) Medial cutaneous nerve of thigh: to skin of medial side of thigh.

## article_ids
+ART-103-ANA-CUTANEOUS-AND-DERMATOMES

## related_concept_ids
+CON-DER-66D9A148569084 | CON-DER-6EB8AEB4918087

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty.
articleIds: Second, module-scoped article added alongside the existing ART-DER-TOP-D0F14FE2BA.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.

---

# Item

## id
CON-DER-66D9A148569084

## label
Intermediate femoral cutaneous territory

## canonical_key
femoral-intermediate-cutaneous.front-thigh

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > General Topics > Cutaneous Innervation of the Lower Limb

## learner_years
1

## universities
kau

## original_wording
From the femoral nerve: b) Intermediate cutaneous nerve of thigh: to skin of front of thigh.

## article_ids
+ART-103-ANA-CUTANEOUS-AND-DERMATOMES

## related_concept_ids
+CON-DER-D0C26711910B1B

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty.
articleIds: Second, module-scoped article added alongside the existing ART-DER-TOP-D0F14FE2BA.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.

---

# Item

## id
CON-DER-CA58978FF603CD

## label
Lateral calf cutaneous territory

## canonical_key
lateral-calf-cutaneous.upper-third-anterolateral-leg

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > General Topics > Cutaneous Innervation of the Lower Limb

## learner_years
1

## universities
kau

## original_wording
Cutaneous nerves of leg: 2. Lateral cutaneous nerve of calf: (from lateral popliteal nerve), to skin of upper 1/3 of the anterolateral side of the leg.

## article_ids
+ART-103-ANA-CUTANEOUS-AND-DERMATOMES

## related_concept_ids
+CON-MSK-0351AAD4CAB1EE

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty.
articleIds: Second, module-scoped article added alongside the existing ART-DER-TOP-D0F14FE2BA.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.
relatedConceptIds: Cross-linked to CON-MSK-0351AAD4CAB1EE, the lateral cutaneous nerve of the calf as a named branch of the common peroneal nerve in the popliteal fossa — that record teaches the branch's origin and course; this one teaches only the skin it supplies. Not merged: one is a nerve-course concept, the other a cutaneous-territory concept, and the live graph already keeps that distinction across the other territory concepts in this cluster.

---

# Item

## id
CON-DER-ABE5E8004B7E22

## label
Lateral plantar cutaneous territory

## canonical_key
lateral-plantar.lateral-sole-one-and-half-toes

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > General Topics > Cutaneous Innervation of the Lower Limb

## learner_years
1

## universities
kau

## original_wording
Sole of foot: 2- Lateral plantar nerve: to skin of lateral part of sole and plantar surface of lateral 1 ½ toes.

## article_ids
+ART-103-ANA-CUTANEOUS-AND-DERMATOMES

## related_concept_ids
+CON-DER-337EE48D1D8BDA

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty.
articleIds: Second, module-scoped article added alongside the existing ART-DER-TOP-D0F14FE2BA.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.

---

# Item

## id
CON-DER-337EE48D1D8BDA

## label
Medial plantar cutaneous territory

## canonical_key
medial-plantar.medial-sole-three-and-half-toes

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > General Topics > Cutaneous Innervation of the Lower Limb

## learner_years
1

## universities
kau

## original_wording
Sole of foot: 1- Medial plantar nerve: to skin of medial part of sole and plantar surface of medial 3 ½ toes.

## article_ids
+ART-103-ANA-CUTANEOUS-AND-DERMATOMES

## related_concept_ids
+CON-DER-ABE5E8004B7E22

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty.
articleIds: Second, module-scoped article added alongside the existing ART-DER-TOP-D0F14FE2BA.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.

---

# Item

## id
CON-DER-99DD0425DC6B82

## label
Dermatome definition

## canonical_key
dermatome.definition

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > General Topics > Dermatomal Cutaneous Supply

## learner_years
1

## universities
kau

## original_wording
Dermatome: it is the skin area supplied by a special spinal nerve, arising from one segment of spinal cord. Spinal nerves supplying the skin of lower limb arise from L1 – L5 and from S1 – S4.

## article_ids
+ART-103-ANA-CUTANEOUS-AND-DERMATOMES

## related_concept_ids
+CON-DER-24BABC4B205703 | CON-DER-4F4C6AB0F7EEB4 | CON-DER-4CB18B8F987419

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty.
articleIds: Second, module-scoped article added alongside the existing ART-DER-TOP-A0CEDC2A00.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.

---

# Item

## id
CON-DER-24BABC4B205703

## label
L4 dermatome territory

## canonical_key
dermatome.l4.medial-anterior-leg-foot-hallux

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > General Topics > Dermatomal Cutaneous Supply

## learner_years
1

## universities
kau

## original_wording
L4: to skin of medial side of front of leg and foot and dorsum of big toe.

## article_ids
+ART-103-ANA-CUTANEOUS-AND-DERMATOMES

## related_concept_ids
+CON-DER-99DD0425DC6B82 | CON-DER-4CB18B8F987419

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty.
articleIds: Second, module-scoped article added alongside the existing ART-DER-TOP-A0CEDC2A00.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.

---

# Item

## id
CON-DER-4F4C6AB0F7EEB4

## label
S4 gluteal territory

## canonical_key
dermatome.s4.small-medial-gluteal-area

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > General Topics > Dermatomal Cutaneous Supply

## learner_years
1

## universities
kau

## original_wording
The gluteal region: is supplied by S3 and S4. S3: supplies the major area of the skin of gluteal region. S4: supplies a small medial area, close to the sacrum.

## article_ids
+ART-103-ANA-CUTANEOUS-AND-DERMATOMES

## related_concept_ids
+CON-DER-99DD0425DC6B82

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty.
articleIds: Second, module-scoped article added alongside the existing ART-DER-TOP-A0CEDC2A00.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.
uncertainty: The book credits S3 as supplying "the major area" of the gluteal region's skin, distinct from this concept's S4. No live concept yet carries the S3 majority statement itself; noted here rather than folded into this record, which is specifically about S4's smaller, more medial area.

---

# Item

## id
CON-DER-4CB18B8F987419

## label
Sole dermatome sequence

## canonical_key
sole-dermatomes.l4-l5-s1

## modules
+103 BMS

## module_subject
103 BMS > Anatomy > General Topics > Dermatomal Cutaneous Supply

## learner_years
1

## universities
kau

## original_wording
The Sole of foot: supplied by L4, 5 and S1, (from medial to lateral as the dorsum of foot).

## article_ids
+ART-103-ANA-CUTANEOUS-AND-DERMATOMES

## related_concept_ids
+CON-DER-99DD0425DC6B82 | CON-DER-24BABC4B205703

## field_notes
moduleIds: Adding 103 BMS to this live concept's module placement — its own `moduleIds` was empty.
articleIds: Second, module-scoped article added alongside the existing ART-DER-TOP-A0CEDC2A00.
atomicClaimIds: Left as-is (untouched) — the live record already carries a claim for this statement.

---

# Item

## id
CON-MSK-3EE23956EE2DDB

## label
The three hamstring muscles all arise from the ischial tuberosity, except the short head of biceps, and all flex the knee and extend the hip

## canonical_key
thigh-back.hamstrings.attachments-action-nerve

## aliases
Hamstring muscles
Biceps femoris
Semitendinosus
Semimembranosus
Muscles of the back of thigh

## arabic_label
عضلات أوتار الركبة (الخلفية للفخذ)

## arabic_aliases
العضلة ذات الرأسين الفخذية
العضلة نصف الوترية
العضلة نصف الغشائية

## definition
The hamstring muscles are biceps femoris, semitendinosus and semimembranosus. All three arise from the ischial tuberosity, except the short head of biceps femoris, which arises instead from the linea aspera; all three are supplied by the sciatic nerve; and all three flex the knee and extend the hip. Biceps femoris has two heads: the long head, from the ischial tuberosity with semitendinosus, supplied by the tibial part of the sciatic nerve; and the short head, from the lateral lip of the linea aspera, supplied by the common peroneal part. Both heads unite into a common tendon inserting into the head of the fibula, producing flexion and lateral rotation of the knee, with the long head alone also extending the hip. Semitendinosus arises with the long head of biceps and inserts into the upper medial tibia behind sartorius and gracilis; it is one of the three "guy-rope" muscles (with sartorius and gracilis) that steady the pelvis on the femur, and it flexes and medially rotates the knee besides extending the hip. Semimembranosus arises from the upper lateral part of the ischial tuberosity and inserts into the groove on the back of the medial tibial condyle, the knee capsule, the popliteal fascia and the soleal line; it flexes and medially rotates the knee and extends the hip.

## explicit_objective
Name the three hamstring muscles, state which one alone does not arise from the ischial tuberosity, and give the nerve supply, insertion and actions of each.

## pitfalls
Supplying all three hamstrings as though the whole muscle group came from one nerve trunk without qualification. Each head of biceps femoris is supplied separately — long head by the tibial part, short head by the common peroneal part of the sciatic nerve — which is exactly why a common peroneal lesion spares the long head of biceps and the other two hamstrings but weakens only the short head. The second habitual error is naming the ischial tuberosity as the origin of the short head of biceps; it alone arises from the linea aspera.

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
Muscles of the Back of Thigh

## microtopic
Hamstring muscles

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Muscles of the Back of Thigh > Hamstring muscles

## article_ids
ART-103-ANA-HAMSTRINGS

## related_article_ids
ART-103-ANA-COMMON-PERONEAL-NERVE

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
0.5

## academic_relevance
0.9

## weight_confidence
0.2

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
MUSCLES OF THE BACK OF THIGH — Hamstring muscles: They are: (1) Biceps femoris (2) Semitendinosus (3) Semimembranosus. All arise from the ischial tuberosity except the short head of biceps. All are supplied by the sciatic nerve. All are flexors of the knee and extensors of the hip joint.

## exam_signal


## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states the short head of biceps femoris is supplied by "the common peroneal part" of the sciatic nerve without describing exactly where within the thigh that separate fascicle lies before the nerve visibly divides; the anatomical basis (the sciatic nerve is really two nerves — tibial and common peroneal — bound together in one sheath from the pelvis) is not spelled out on this page, though it is consistent with the course already given for the sciatic nerve elsewhere in this module.

## evidence_gaps
Evidence must be attached before publication. This is a genuinely new concept minted from the department book with no prior claim in the corpus; `find-existing.mjs "hamstring"` returned no match. Authoring a supporting claim and citation requires a citation-bearing evidence file in `docs/Kasr-Source-Imports/evidence/`, which is outside this batch's file ownership (concept/ and article/ only) — `atomic_claim_ids` is therefore `[clear]` rather than invented, per `02-concepts.md`'s own third option ("say so and stop"). This will fail `medical:presence`'s populated-field check for this one concept until an evidence-authoring pass attaches a real claim; reported here rather than concealed.

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
microtopicId: The department book's own section, "Hamstring muscles", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-ANA-T03 and has nothing finer for the lower limb.
nanotopicId: The microtopic Hamstring muscles is the most precise node the department book's own short chapter supports; the three individual muscles are not separately headed.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book directly; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "hamstring", "biceps femoris", "semitendinosus" and "semimembranosus" — `find-existing.mjs` returns no record at all for any of the four, in live state or in any pending batch.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found; none of the group's names match anything in live state or in any pending batch.
examWeightByYear: No solved exam question exists for this concept, so the value is an authored estimate (matching blueprint_weight) rather than a paper-derived signal — the same basis blueprint_weight itself uses, and weight_confidence is set low (0.2) to say so honestly.
examSignal: Not from an exam paper — minted directly from the book's own short chapter (p40–42), which carries no question of its own in the corpus consulted so far.
atomicClaimIds: See evidenceGaps above.
relationships: Walked the live concepts on DIS-ANA-T03 and this file's own siblings. The edges worth writing are innervated_by-style links from each hamstring to the sciatic nerve's two parts (CON-MSK-D622CBF981F879, CON-MSK-51EC648BDAF36B) and a contrasts_with edge from the short head of biceps to the other two hamstrings, since it alone is common-peroneal-supplied. No relations batch is claimed for 103 BMS; reported as owed.

---

# Item

## id
CON-MSK-BBBD5662711A93

## label
The knee joint's capsule is reinforced by four extracapsular and three intracapsular ligaments, and two menisci deepen its tibial surfaces

## canonical_key
joints.knee.capsule-ligaments-menisci

## aliases
Knee joint ligaments
Menisci of the knee
Semilunar cartilages
Cruciate ligaments
Collateral ligaments of the knee

## arabic_label
أربطة وهلالات مفصل الركبة

## arabic_aliases
الأربطة الصليبية للركبة
الهلالتان الغضروفيتان

## definition
The knee is a synovial, modified-hinge joint between the lower end of the femur, the upper end of the tibia and the back of the patella. Its fibrous capsule is reinforced by four extracapsular ligaments: the patellar ligament anteriorly, the downward continuation of the quadriceps tendon from the patella to the tibial tuberosity; the fibular (lateral) collateral ligament, a cord from the lateral femoral epicondyle to the fibular head, separated from the lateral meniscus by the tendon of popliteus so the meniscus stays free and mobile; the tibial (medial) collateral ligament, a flattened band from the medial femoral epicondyle to the medial tibial condyle, firmly attached to the medial meniscus; and the oblique popliteal ligament posteriorly, an expansion of semimembranosus's own insertion. Three ligaments lie inside the capsule: the anterior and posterior cruciate ligaments, and the transverse ligament connecting the anterior horns of the two menisci. The medial meniscus is C-shaped and larger, its anterior and posterior horns attached to the tibial intercondylar area; it is firmly fixed to the tibial collateral ligament and capsule, which makes it less mobile and more liable to injury. The lateral meniscus is smaller and circular, separated from the capsule and fibular collateral ligament by popliteus, which makes it more mobile and less liable to injury. Both menisci deepen the tibial articular surfaces to fit the convex femoral condyles and act as shock absorbers.

## explicit_objective
List the four extracapsular and three intracapsular ligaments of the knee joint, and contrast the medial and lateral menisci by shape, attachment and mobility, explaining why the medial meniscus is more often injured.

## pitfalls
Assuming both menisci are equally mobile. The medial meniscus is fixed to the tibial collateral ligament and capsule and is therefore less mobile and more easily trapped and torn between the moving femoral and tibial condyles; the lateral meniscus, separated from its collateral ligament by popliteus, moves more freely and is less often injured. The second habitual error is describing the collateral ligaments as intracapsular; all four named ligaments above the transverse and cruciate ligaments are extracapsular, reinforcing the capsule from outside.

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
SYS-MSK-T01-S02-M03

## topic
Lower limb

## subtopic
Joints of the lower limb

## microtopic
The Knee Joint

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > The Knee Joint

## article_ids
ART-103-ANA-KNEE-JOINT

## related_article_ids
ART-103-ANA-HIP-JOINT-STRUCTURE

## related_concept_ids
CON-MSK-9B1204D74AF4FF

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
0.7

## academic_relevance
0.9

## weight_confidence
0.2

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Ligaments of the knee joint: Four extra-capsular ligaments... a- Patellar ligament... b- Fibular (lateral) collateral ligament... c- Tibial (medial) collateral ligament... d- Oblique popliteal ligament... Three intracapsular ligaments... Semilunar Cartilages (Menisci): The meniscus is a curved plate of fibrocartilage which lies on the upper surface of the corresponding condyle of tibia.

## exam_signal


## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state whether the transverse ligament of the knee, which has no bony attachment, is counted among the "three intracapsular ligaments" alongside the two cruciates in every examiner's tally, or listed separately; both readings are consistent with the page as printed.

## evidence_gaps
Evidence must be attached before publication. This is a genuinely new concept minted from the department book with no prior claim in the corpus; `find-existing.mjs "meniscus"`, `"cruciate"` and `"knee joint"` returned no substantive match. Authoring a supporting claim and citation requires a citation-bearing evidence file outside this batch's file ownership (concept/ and article/ only) — `atomic_claim_ids` is `[clear]` rather than invented. This will fail `medical:presence`'s populated-field check until an evidence-authoring pass attaches a real claim; reported here rather than concealed.

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
microtopicId: The department book's own section, "The Knee Joint", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-ANA-T03 and has nothing finer for the lower limb.
nanotopicId: The microtopic The Knee Joint is the most precise node the department book's own chapter structure supports.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book directly; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "meniscus", "cruciate", "collateral ligament" and "knee joint" — the only "collateral ligament" hits are 101 ISK's elbow, a different joint in a different module; nothing else matches.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found.
examWeightByYear: No solved exam question exists for this concept; the value is an authored estimate matching blueprint_weight, with weight_confidence set low (0.2).
examSignal: Not from an exam paper — minted directly from the book (p82–86).
atomicClaimIds: See evidenceGaps above.
relationships: Walked the live concepts on DIS-ANA-T03 and this file's own siblings. The edge worth writing is part_of from popliteus (not yet a concept in this module) to the lateral meniscus's mobility, and prerequisite_of from this structural record to CON-MSK-9B1204D74AF4FF's account of locking. Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-9B1204D74AF4FF

## label
The knee locks into a rigid column on full extension by lateral rotation of the tibia, and unlocks by popliteus rotating the femur laterally on the tibia

## canonical_key
joints.knee.movements-locking-mechanism

## aliases
Locking of the knee
Unlocking of the knee
Movements of the knee joint
Popliteus unlocking mechanism

## arabic_label
آلية قفل وفك قفل مفصل الركبة

## arabic_aliases
حركات مفصل الركبة
دور العضلة المأبضية في فك القفل

## definition
Flexion and extension are the main movements of the knee: flexion by the three hamstrings, assisted by popliteus, sartorius and gracilis; extension by quadriceps femoris alone. A slight further rotation is possible: active rotation, performed only with the knee semiflexed, is lateral rotation by biceps femoris alone and medial rotation by sartorius, gracilis, semitendinosus and semimembranosus together; passive (obligatory) rotation occurs automatically during the last 15 degrees of extension, locking the knee by lateral rotation of the tibia on the femur, and during the first 15 degrees of flexion, unlocking it by medial rotation of the tibia on the femur. Locking happens because the anterior cruciate ligament becomes taut before extension is complete on the lateral side, so extension continues on the medial side, producing rotation — helped by the medial articular surfaces of the femur being longer front-to-back than the lateral ones; quadriceps femoris is the muscle responsible, and locking makes the limb a rigid column for standing and walking. Unlocking is produced by popliteus alone, rotating the femur laterally on the fixed tibia (or, equivalently, the tibia medially on the femur) at the start of flexion. Nerve supply of the joint is from three genicular branches of the tibial nerve, three from the common peroneal nerve, and branches from the femoral and obturator nerves as for the hip joint — which is why hip disease can refer pain to the knee. Its arterial supply is from the anastomosis around the knee.

## explicit_objective
Explain the mechanism and the muscles responsible for locking and unlocking the knee joint, and state why locking matters functionally for standing and walking.

## pitfalls
Reversing which muscle does which. Popliteus unlocks the knee; quadriceps femoris, by completing extension, locks it. The second habitual error is describing locking as happening at the hip or ankle; the book credits a separate locking mechanism to each of the three lower-limb joints that bear weight, and the knee's own mechanism depends specifically on unequal femoral condyle lengths and the anterior cruciate ligament, not shared machinery with the other two joints.

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
SYS-MSK-T01-S02-M03

## topic
Lower limb

## subtopic
Joints of the lower limb

## microtopic
The Knee Joint

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > The Knee Joint

## article_ids
ART-103-ANA-KNEE-JOINT

## related_article_ids
ART-103-ANA-HIP-JOINT-MOVEMENTS

## related_concept_ids
CON-MSK-BBBD5662711A93 | CON-MSK-D30F43945FC3C2

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
0.9

## weight_confidence
0.2

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Locking — Mechanism: medial rotation of femur on tibia or lateral rotation of tibia on femur. Occurs: after full extension... Muscle responsible: quadriceps femoris muscle. Unlocking — Mechanism: lateral rotation of femur on tibia or medial rotation of tibia on femur. Occurs: at the beginning of flexion. Muscle involved: Popliteus.

## exam_signal


## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book's own "Mechanism" line for locking reads "medial rotation of femur on tibia .or lateral rotation of tibia on femur" — the femur's rotation and the tibia's rotation are printed as alternative descriptions of the same event (the two bones' relative motion can be described from either side), which this definition follows by naming the tibial-rotation version as primary, matching the "Structures involved in locking" paragraph on the same page, which speaks only in terms of tibial rotation.

## evidence_gaps
Evidence must be attached before publication. Genuinely new concept, no prior claim in the corpus; `find-existing.mjs "locking of the knee"` and `"popliteus"` returned no match. Authoring a supporting claim and citation requires a citation-bearing evidence file outside this batch's file ownership. `atomic_claim_ids` is `[clear]` rather than invented; this will fail `medical:presence` until an evidence-authoring pass attaches a real claim.

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
microtopicId: The department book's own section, "The Knee Joint", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node.
nanotopicId: The microtopic The Knee Joint is the most precise node the book's chapter structure supports.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book directly; no corpus extraction record.
sourceCandidateIds: Searched the corpus for "locking of the knee", "popliteus", "genu valgum" and "unhappy triad" — none returns any record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found.
examWeightByYear: No solved exam question exists for this concept; the value is an authored estimate matching blueprint_weight, with weight_confidence set low (0.2).
examSignal: Not from an exam paper — minted directly from the book (p87–88).
atomicClaimIds: See evidenceGaps above.
relationships: Walked the live concepts on DIS-ANA-T03 and this file's own siblings. The edge worth writing is prerequisite_of from CON-MSK-BBBD5662711A93 (the joint's own ligaments and menisci) to this mechanism, since locking depends on the anterior cruciate ligament named there, and a referred_pain-style edge from CON-MSK-D30F43945FC3C2 (hip movements) given the shared femoral/obturator nerve supply noted on this page. Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-C4AD88B60ADDB8

## label
The ankle is a hinge joint between the tibia, fibula and talus, stabilised by the medial deltoid ligament and three lateral bands, allowing only plantar flexion and dorsiflexion

## canonical_key
joints.ankle.surfaces-ligaments-movements

## aliases
Ankle joint
Deltoid ligament
Lateral ligament of the ankle
Talo-crural joint

## arabic_label
مفصل الكاحل وأربطته

## arabic_aliases
الرباط الدالي (الأنسي)
الرباط الوحشي للكاحل

## definition
The ankle joint is a synovial, uniaxial, hinge joint. Its articulating surfaces are the lower end of the tibia and its medial malleolus above and medially, the lateral malleolus of the fibula above and laterally, and the trochlea of the talus below. The medial ligament, the deltoid ligament, is triangular, attached by its apex to the tip of the medial malleolus and by its base to the neck of talus, the tuberosity of the navicular, the spring ligament, the sustentaculum tali and the body of talus. The lateral ligament is formed of three separate bands radiating from the lateral malleolus: the anterior talofibular ligament, to the talus; the posterior talofibular ligament, running horizontally from the malleolar fossa of the fibula to the talus; and the calcaneofibular ligament, a vertical middle band from the lateral malleolus to the lateral calcaneus. A posterior tibiofibular ligament runs from the upper part of the malleolar fossa to the medial malleolus. Only two movements occur at the ankle: plantar flexion, produced mainly by gastrocnemius and soleus and helped by the deep calf muscles (tibialis posterior, flexor hallucis longus, flexor digitorum longus); and dorsiflexion, produced by the anterior compartment muscles (tibialis anterior, extensor digitorum longus, extensor hallucis longus, peroneus tertius). Nerve supply is from the anterior and posterior tibial nerves, and arterial supply from the anastomosis around the ankle, around the two malleoli.

## explicit_objective
Name the three articulating bones of the ankle joint, contrast the single medial (deltoid) ligament with the lateral ligament's three named bands, and state the two movements the joint allows with the muscles producing each.

## pitfalls
Crediting inversion or eversion to the ankle joint itself. The book states explicitly that these movements are not done at the ankle joint — only plantar flexion and dorsiflexion occur here; inversion and eversion happen at the intertarsal joints below it. The second habitual error is naming a sprain's torn ligament without matching it to the movement: excessive inversion tears the anterior talofibular and calcaneofibular ligaments (the common ankle sprain), while excessive eversion tears the deltoid ligament, which is less common because the deltoid is the stronger of the two.

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
SYS-MSK-T01-S02-M05

## topic
Lower limb

## subtopic
Joints of the lower limb

## microtopic
The Ankle Joint

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > The Ankle Joint

## article_ids
ART-103-ANA-ANKLE-AND-INVERSION-EVERSION

## related_article_ids
ART-103-ANA-KNEE-JOINT

## related_concept_ids
CON-MSK-F5196760C3DB9C

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
0.65

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The Ankle Joint: Type and variety: synovial, uniaxial joint of the hinge variety... Movements of the ankle joint: (Only two)... N.B.: These movements are not done at the ankle joint. [referring to inversion/eversion, printed on the following page]

## exam_signal


## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives the deltoid ligament's base five separate attachments (neck of talus, navicular tuberosity, spring ligament, sustentaculum tali, body of talus) without stating whether an examiner expects all five named individually or credits the ligament's general description as triangular and attached "by its base" to the medial tarsus as a whole.

## evidence_gaps
Evidence must be attached before publication. Genuinely new concept, no prior claim in the corpus; `find-existing.mjs "ankle joint"` and `"tibiofibular"` returned no substantive match. Authoring a supporting claim and citation requires a citation-bearing evidence file outside this batch's file ownership. `atomic_claim_ids` is `[clear]` rather than invented; this will fail `medical:presence` until an evidence-authoring pass attaches a real claim.

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
microtopicId: The department book's own section, "The Ankle Joint", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node.
nanotopicId: The microtopic The Ankle Joint is the most precise node the book's chapter structure supports; the superior, middle and inferior tibiofibular joints are treated in the article's prose rather than as a separate concept, since the book gives each only a brief description with no distinct nerve/blood supply or clinical point of its own.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book directly; no corpus extraction record.
sourceCandidateIds: Searched the corpus for "ankle joint", "deltoid ligament", "tibiofibular" and "talofibular" — none returns any record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found.
examWeightByYear: No solved exam question exists for this concept; the value is an authored estimate matching blueprint_weight, with weight_confidence set low (0.2).
examSignal: Not from an exam paper — minted directly from the book (p89–91).
atomicClaimIds: See evidenceGaps above.
relationships: Walked the live concepts on DIS-ANA-T03 and this file's own siblings. The edge worth writing is prerequisite_of from this joint's ligaments to CON-MSK-F5196760C3DB9C's account of which joints permit inversion/eversion, and an often_confused_with edge to CON-MSK-016DE81C5919CE (talipes equinovarus), since a sprained ankle and a peroneal-nerve foot drop are both taught with "inversion" in the sentence but are mechanically unrelated. Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-F5196760C3DB9C

## label
Inversion and eversion of the foot occur at the subtalar and talo-calcaneo-navicular joints, not the ankle, produced by tibialis anterior and posterior against the three peronei

## canonical_key
foot.inversion-eversion.joints-and-muscles

## aliases
Inversion of the foot
Eversion of the foot
Subtalar joint
Talo-calcaneo-navicular joint

## arabic_label
انقلاب القدم للداخل وللخارج

## arabic_aliases
مفصل تحت الكاحل
المفصل الكاحلي العقبي الزورقي

## definition
Inversion turns the sole of the foot medially, and eversion turns it laterally. These movements occur at the intertarsal joints, not the ankle: the subtalar (talocalcanean) joint, a plane synovial joint between the inferior surface of the body of talus and the upper surface of the calcaneus; and the talo-calcaneo-navicular joint, a complex ball-and-socket synovial joint where the head of talus (the ball) articulates with a socket formed by the calcaneus and navicular bones, with the spring ligament between them. The range of inversion and eversion is increased by the gliding action of the transverse tarsal (mid-tarsal) joint. The mechanism is that the talus is held fixed by the two malleoli while the calcaneus and navicular bones swing around it, carrying the rest of the foot's bones with them. Inversion is produced by tibialis anterior and tibialis posterior; eversion is produced by peroneus longus, peroneus brevis and peroneus tertius.

## explicit_objective
Name the two joints at which inversion and eversion occur, describe the mechanism by which the calcaneus and navicular swing around a fixed talus, and list the muscles producing each movement.

## pitfalls
Attributing inversion and eversion to the ankle joint. The book states explicitly that these movements are not done at the ankle joint, only plantar flexion and dorsiflexion; inversion and eversion belong to the subtalar and talo-calcaneo-navicular joints below it. The second habitual error is crediting eversion to only one or two of the three peronei; all three — longus, brevis and tertius — are evertors, though tertius is the only one that also dorsiflexes because it is functionally part of the anterior compartment.

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
SYS-MSK-T01-S02-M06

## topic
Lower limb

## subtopic
Joints of the lower limb

## microtopic
Inversion and Eversion of Foot

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Joints of the lower limb > Inversion and Eversion of Foot

## article_ids
ART-103-ANA-ANKLE-AND-INVERSION-EVERSION

## related_article_ids
ART-103-ANA-PERONEUS-LONGUS

## related_concept_ids
CON-MSK-C4AD88B60ADDB8 | CON-MSK-32B5B7A5CD2A27 | CON-MSK-C7BC26EBAF066B | CON-MSK-016DE81C5919CE

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
0.7

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Inversion and Eversion of Foot: In inversion: the sole turns medially (to inside). In eversion: the sole turns laterally (to outside). These movements take place at the intertarsal joints: 1- Subtalar joint. 2- Talo-calcaneo-navicular joint... N.B.: These movements are not done at the ankle joint.

## exam_signal


## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book credits the transverse tarsal (mid-tarsal) joint only with increasing the "range" of inversion/eversion by gliding, not with producing the movement itself, so whether an examiner would accept it as a third named joint alongside the subtalar and talo-calcaneo-navicular joints, rather than as a contributing mechanism, is not settled by the page as printed.

## evidence_gaps
Evidence must be attached before publication. Genuinely new concept, no prior claim in the corpus; `find-existing.mjs "inversion"` and `"subtalar"` returned no substantive match. Authoring a supporting claim and citation requires a citation-bearing evidence file outside this batch's file ownership. `atomic_claim_ids` is `[clear]` rather than invented; this will fail `medical:presence` until an evidence-authoring pass attaches a real claim.

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
microtopicId: The department book's own section, "Inversion and Eversion of Foot", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node.
nanotopicId: The microtopic already names the book's own section; no finer subdivision is printed. The three other intertarsal joints (tarsometatarsal, metatarsophalangeal, interphalangeal) and the two ligaments of the foot (spring, long/short plantar) are treated in the article's prose rather than as separate concepts, since none of them is credited with a distinct movement, nerve supply or clinical point of its own beyond what the arches article already covers for the spring and plantar ligaments.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book directly; no corpus extraction record.
sourceCandidateIds: Searched the corpus for "inversion", "eversion", "subtalar" and "talo-calcaneo-navicular" — "eversion" matches only this module's own existing common-peroneal-nerve records (a different facet, the loss of the movement rather than its mechanism); the others return nothing.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found; the "eversion" hits on CON-MSK-C7BC26EBAF066B and CON-MSK-016DE81C5919CE are cross-linked in related_concept_ids rather than merged, because those concepts describe the loss of eversion after nerve injury, not the joints and muscles that normally produce it.
examWeightByYear: No solved exam question exists for this concept; the value is an authored estimate matching blueprint_weight, with weight_confidence set low (0.2).
examSignal: Not from an exam paper — minted directly from the book (p94, p97).
atomicClaimIds: See evidenceGaps above.
relationships: Walked the live concepts on DIS-ANA-T03 and this file's own siblings. The edges worth writing are often_confused_with to CON-MSK-C7BC26EBAF066B and CON-MSK-016DE81C5919CE (loss of eversion after nerve injury versus the normal mechanism here), and part_of from CON-MSK-32B5B7A5CD2A27 (peroneus longus) as one of the three named evertors. Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-47A1A46432D3E0

## label
The great saphenous vein is the longest vein in the body, running from the dorsal venous arch to the femoral vein below the pubic tubercle

## canonical_key
vein.great-saphenous.course-tributaries

## aliases
Great saphenous vein
Long saphenous vein
Saphenous opening termination
Varicose veins of the leg

## arabic_label
الوريد الصافن الكبير (الطويل)

## arabic_aliases
مسار الوريد الصافن الكبير
الدوالي

## definition
The great (long) saphenous vein is the longest vein in the body. It begins on the dorsum of the foot from the medial end of the dorsal venous arch, passes backwards on the medial side of the foot and ascends in front of the medial malleolus, runs up the medial side of the leg to the medial side of the back of the knee, then ascends along the medial thigh and curves forwards to the saphenous opening, piercing the cribriform fascia to end in the femoral vein four centimetres below and lateral to the pubic tubercle. It carries fifteen to twenty valves, which divide it into segments and reduce venous pressure on its walls in the erect position. Its tributaries and communications are superficial veins from the foot, leg and thigh; communicating veins to the small saphenous vein; perforating veins piercing the deep fascia to join the deep veins; and the superficial inguinal veins (superficial circumflex iliac, superficial epigastric and superficial external pudendal).

## explicit_objective
Trace the great saphenous vein from its origin to its termination, state where and how it ends, and explain how incompetent perforating-vein valves produce varicose veins.

## pitfalls
Saying the great saphenous vein ends in the popliteal vein. That is the small saphenous vein's termination; the great saphenous vein ends in the femoral vein at the saphenous opening. The second habitual error is describing varicose veins as caused by valve failure in the great saphenous vein itself rather than in the perforating veins connecting it to the deep system — the book specifies incompetence of the distal perforating veins' valves, producing reversed flow from deep to superficial.

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
Veins of the Lower Limb

## microtopic
Veins of the Lower Limb

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Veins of the Lower Limb

## article_ids
ART-103-ANA-VEINS-AND-LYMPH

## related_article_ids
ART-103-ANA-ADDUCTOR-CANAL

## related_concept_ids
CON-MSK-E812B745282A3A | CON-MSK-E77A7FF7843CF2

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
0.75

## academic_relevance
0.8

## weight_confidence
0.2

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
1- Great (long) saphenous vein: It is the longest vein in the body. Course and relations: It begins: on the dorsum of the foot from the medial end of the dorsal venous arch... It pierces the cribriform fascia to end in the femoral vein, 4 cm below and lateral to the pubic tubercle.

## exam_signal


## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives the coronary bypass use of the great saphenous vein as a clinical point without stating whether Kasr Al Ainy's first-year anatomy examiners expect it, since it is a surgical rather than an anatomical fact; it is included here for completeness but flagged as the less certain of the two clinical points on this page.

## evidence_gaps
Evidence must be attached before publication. Genuinely new concept, no prior claim in the corpus; `find-existing.mjs "great saphenous"` and `"saphenous vein"` returned no substantive match. Authoring a supporting claim and citation requires a citation-bearing evidence file outside this batch's file ownership. `atomic_claim_ids` is `[clear]` rather than invented; this will fail `medical:presence` until an evidence-authoring pass attaches a real claim.

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
microtopicId: The department book gives this whole short chapter, "Veins of the Lower Limb", one undivided heading rather than separate subheadings per vein; `microtopic` therefore repeats the chapter title, and resolves to no `MIC_` node.
nanotopicId: The book prints no subdivision beneath the chapter title.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book directly; no corpus extraction record.
sourceCandidateIds: Searched the corpus for "great saphenous", "saphenous vein", "varicose" and "dorsal venous arch" — the only "dorsal venous arch" hits are 101 ISK's upper-limb (hand) articles, a different structure in a different module.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found.
examWeightByYear: No solved exam question exists for this concept; the value is an authored estimate matching blueprint_weight, with weight_confidence set low (0.2).
examSignal: Not from an exam paper — minted directly from the book (p108–110).
atomicClaimIds: See evidenceGaps above.
relationships: Walked the live concepts on DIS-ANA-T03 and this file's own siblings. The edge worth writing is often_confused_with to CON-MSK-E812B745282A3A (the small saphenous vein, its frequent point of confusion) and part_of to CON-MSK-E77A7FF7843CF2 (the superficial lymph vessels that mostly follow this vein to the inguinal nodes). Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-E812B745282A3A

## label
The small saphenous vein begins from the lateral end of the dorsal venous arch and ends in the popliteal vein, unlike the great saphenous vein

## canonical_key
vein.small-saphenous.course-termination

## aliases
Small saphenous vein
Short saphenous vein
Lesser saphenous vein

## arabic_label
الوريد الصافن الصغير (القصير)

## arabic_aliases
مسار الوريد الصافن الصغير

## definition
The small (short) saphenous vein begins from the lateral end of the dorsal venous arch, ascends behind the lateral malleolus and runs along the middle of the back of the leg accompanied by the sural nerve, then pierces the deep fascia and ascends between the two heads of gastrocnemius before ending in the popliteal vein. It carries five to ten valves — fewer than the great saphenous vein's fifteen to twenty — and drains the lateral side of the foot and the back of the leg. It communicates with the great saphenous vein.

## explicit_objective
Trace the small saphenous vein from its origin to its termination, contrasting its origin, course and termination point-by-point with the great saphenous vein.

## pitfalls
Assuming the two saphenous veins are mirror images that both end in the femoral vein. Only the great saphenous vein reaches the femoral vein; the small saphenous vein ends lower, in the popliteal vein, after piercing the deep fascia between the two heads of gastrocnemius. The second habitual error is forgetting the nerve that accompanies it — the sural nerve, not the saphenous nerve, which travels with the great saphenous vein instead.

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
Veins of the Lower Limb

## microtopic
Veins of the Lower Limb

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Veins of the Lower Limb

## article_ids
ART-103-ANA-VEINS-AND-LYMPH

## related_article_ids
ART-103-ANA-COMMON-PERONEAL-NERVE

## related_concept_ids
CON-MSK-47A1A46432D3E0 | CON-MSK-E77A7FF7843CF2

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
0.55

## academic_relevance
0.8

## weight_confidence
0.2

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
2- Small (short) saphenous vein: Course and relations: It begins from the lateral end of the dorsal venous arch. It ascends behind the lateral malleolus and passes along the middle of the back of the leg accompanied by the sural nerve... Termination: It ends in the popliteal vein.

## exam_signal


## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives the small saphenous vein five to ten valves without stating whether that range reflects individual variation or an approximation; no further precision is offered on this page.

## evidence_gaps
Evidence must be attached before publication. Genuinely new concept, no prior claim in the corpus; `find-existing.mjs "small saphenous"` returned no match. Authoring a supporting claim and citation requires a citation-bearing evidence file outside this batch's file ownership. `atomic_claim_ids` is `[clear]` rather than invented; this will fail `medical:presence` until an evidence-authoring pass attaches a real claim.

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
microtopicId: The department book gives this whole short chapter one undivided heading; `microtopic` repeats the chapter title, and resolves to no `MIC_` node.
nanotopicId: The book prints no subdivision beneath the chapter title.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book directly; no corpus extraction record.
sourceCandidateIds: Searched the corpus for "small saphenous" — no match in live state or any pending batch.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found.
examWeightByYear: No solved exam question exists for this concept; the value is an authored estimate matching blueprint_weight, with weight_confidence set low (0.2).
examSignal: Not from an exam paper — minted directly from the book (p108–110).
atomicClaimIds: See evidenceGaps above.
relationships: Walked the live concepts on DIS-ANA-T03 and this file's own siblings. The edge worth writing is often_confused_with to CON-MSK-47A1A46432D3E0 (contrasted directly above) and part_of to CON-MSK-E77A7FF7843CF2 (the minority of superficial lymph vessels that follow this vein to the popliteal nodes). Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-MSK-E77A7FF7843CF2

## label
Superficial lymph mostly follows the great saphenous vein to the superficial inguinal nodes, and obstruction of lower-limb lymphatics can progress to elephantiasis

## canonical_key
lymph.lower-limb.nodes-and-elephantiasis

## aliases
Lymph drainage of the lower limb
Superficial inguinal lymph nodes
Deep inguinal lymph nodes
Popliteal lymph nodes
Elephantiasis

## arabic_label
التصريف الليمفاوي للطرف السفلي وداء الفيل

## arabic_aliases
العقد الليمفاوية الأربية السطحية
العقد الليمفاوية الأربية العميقة
داء الفيل

## definition
Superficial lymph vessels drain the skin and subcutaneous tissue superficial to the deep fascia; most accompany the great saphenous vein to the superficial inguinal lymph nodes, and a minority accompany the small saphenous vein to the popliteal lymph nodes. Deep lymph vessels drain tissue beneath the deep fascia, accompanying the deep blood vessels to the inguinal nodes. The superficial inguinal nodes form a horizontal group, below and parallel to the inguinal ligament, and a vertical group along the termination of the great saphenous vein; together they receive afferents from the skin of the lower limb, the gluteal region, the external genitalia, the perineum (including the lower anal canal and vagina) and the anterior abdominal wall below the umbilicus, and send efferents to the deep inguinal nodes. The deep inguinal nodes lie beneath the deep fascia along the medial side of the femoral vein, inside the femoral canal; they receive afferents from the superficial inguinal nodes, the deep tissues of the limb, the popliteal nodes and the deep perineum, and send efferents to the external iliac nodes. The popliteal nodes lie deep in the popliteal fossa along the popliteal vessels, receive afferents from the foot and leg, and send efferents to the deep inguinal nodes. Obstruction of the lower limb's lymphatics leads to progressive oedema, and when the limb becomes greatly enlarged the condition is called elephantiasis.

## explicit_objective
Trace lymph drainage from the skin and deep tissues of the lower limb through the superficial and deep inguinal and popliteal nodes to the external iliac nodes, and explain the anatomical basis of elephantiasis.

## pitfalls
Treating the superficial and deep inguinal lymph nodes as a single group. They lie on either side of the deep fascia, drain different territories, and the superficial group's efferents pass through the deep group before reaching the external iliac nodes — reversing that order, or conflating them, loses the logic of the whole chain. The second habitual error is naming lymphangitis and elephantiasis as the same condition; the book distinguishes lymphangitis, inflammation of the superficial lymph vessels, from elephantiasis, the chronic, progressive oedema and limb enlargement that follows lymphatic obstruction.

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
SYS-MSK-T01-S02-M02

## topic
Lower limb

## subtopic
Veins of the Lower Limb

## microtopic
Lymph Drainage of the Lower Limb

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Veins of the Lower Limb > Lymph Drainage of the Lower Limb

## article_ids
ART-103-ANA-VEINS-AND-LYMPH

## related_article_ids
ART-103-ANA-ADDUCTOR-CANAL

## related_concept_ids
CON-MSK-47A1A46432D3E0 | CON-MSK-E812B745282A3A

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
0.7

## academic_relevance
0.8

## weight_confidence
0.2

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Lymph Drainage of the Lower Limb... Superficial group: Superficial inguinal lymph nodes... Deep group: Deep inguinal lymph nodes... Popliteal lymph nodes... Clinical important points: Obstruction of the lymphatics of lower limb leads to progressive oedema. When the limb acquires a large size, the condition is called elephantiasis.

## exam_signal


## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book lists the deep inguinal nodes as receiving afferents from "the deep tissues of the lower limb" without naming which deep structures specifically, beyond what accompanies the deep blood vessels stated earlier on the same page.

## evidence_gaps
Evidence must be attached before publication. Genuinely new concept, no prior claim in the corpus; `find-existing.mjs "lymph node"` and `"elephantiasis"` returned no substantive match for this module's own lymph chain. Authoring a supporting claim and citation requires a citation-bearing evidence file outside this batch's file ownership. `atomic_claim_ids` is `[clear]` rather than invented; this will fail `medical:presence` until an evidence-authoring pass attaches a real claim.

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
microtopicId: The department book's own subheading, "Lymph Drainage of the Lower Limb", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node.
nanotopicId: The microtopic already names the book's own subheading; no finer subdivision is printed.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book directly; no corpus extraction record.
sourceCandidateIds: Searched the corpus for "lymph node", "elephantiasis" and "lymphangitis" — the "lymph node" hits are all unrelated live concepts (cervical, bladder-neck, breast, cervical-cancer drainage in other subjects); none concerns the lower limb's own chain.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found.
examWeightByYear: No solved exam question exists for this concept; the value is an authored estimate matching blueprint_weight, with weight_confidence set low (0.2).
examSignal: Not from an exam paper — minted directly from the book (p111–112).
atomicClaimIds: See evidenceGaps above.
relationships: Walked the live concepts on DIS-ANA-T03 and this file's own siblings. The edges worth writing are part_of to both saphenous vein concepts above, since most lymph vessels follow one or the other. Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-DEV-EAF577AD3F3C53

## label
Limb buds form in the fourth week from lateral plate mesoderm under an apical ectodermal ridge, and the lower limb rotates 90 degrees medially in the seventh week

## canonical_key
limb.development.bud-formation-and-rotation

## aliases
Limb bud
Apical ectodermal ridge
Limb rotation
Development of the limbs

## arabic_label
تكوّن براعم الأطراف ودورانها

## arabic_aliases
الحافة الظهارية القمية
دوران الطرف السفلي

## definition
At the end of the fourth week, limb buds form as outpocketings from the anterolateral body wall. Each bud has a core of mesenchyme from lateral plate mesoderm, which forms the limb's skeleton and connective tissue, covered by surface ectoderm, which gives rise to the epidermis; the distal margin of the bud thickens into the apical ectodermal ridge (AER). By six weeks the terminal part of the bud flattens into a hand- or footplate, separated from the proximal segment by a circular constriction, and a second constriction later divides the proximal portion into two, giving the limb three segments. Fingers and toes form when cell death in the AER separates it into five parts that grow into the digits. Limb musculature and the dermis derive from the dermomyotomes of somites that migrate into the limb, initially segmented according to their somite of origin, then splitting into flexor and extensor components with further splitting and fusion, so a single muscle can arise from more than one original segment. Upper limb buds lie opposite the lower five cervical and upper two thoracic segments; lower limb buds lie opposite the lower four lumbar and upper two sacral segments, and the nerve supply of each limb depends on the somites its muscles and dermatomes derive from. During the seventh week the limbs rotate in opposite directions: the upper limb rotates 90 degrees laterally, placing the extensor muscles on its lateral and posterior surface and the thumb laterally; the lower limb rotates approximately 90 degrees medially, placing the extensor muscles on its anterior surface and the big toe medially.

## explicit_objective
Describe the formation of the limb bud and the apical ectodermal ridge, explain how the segmental nerve supply of the limb follows from its somitic origin, and state the direction and degree of rotation of the lower limb and its anatomical consequence.

## pitfalls
Confusing the direction of rotation between the two limbs. The lower limb rotates medially, bringing the extensors to the front and the big toe to the medial side — the opposite direction to the upper limb's lateral rotation. The second habitual error is treating the segmental (dermatomal) nerve pattern as arbitrary; the book derives it directly from which somites the limb's muscles and dermis came from, which is why the dermatome sequence and the limb's rotation are connected facts rather than two things to memorise separately.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T03

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
System development

## microtopic
Development of Limbs

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Development of Limbs > Steps

## article_ids
ART-103-ANA-LIMB-DEVELOPMENT

## related_article_ids
ART-103-ANA-ADDUCTOR-CANAL

## related_concept_ids
CON-DEV-59689788046B4E | CON-DEV-7A9E2385A26A8B

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
0.45

## exam_weight_by_year
KAU_Y1=0.45

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
DEVELOPMENT OF LIMBS — Steps: At the end of 4th week, limb buds are formed as outpocketing from anterolateral aspect of the body... During the seventh week of gestation, the limbs rotate in opposite directions... whereas the lower limb rotates approximately 90° medially, placing the extensor muscles on the anterior surface and the big toe medially.

## exam_signal


## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states the AER separates into five parts "when cell death" occurs there, without giving the controlling signal a name; this is left as the book states it rather than supplemented from outside knowledge.

## evidence_gaps
Evidence must be attached before publication. Genuinely new concept, no prior claim in the corpus; `find-existing.mjs "limb bud"` and `"apical ectodermal ridge"` returned no match. Authoring a supporting claim and citation requires a citation-bearing evidence file outside this batch's file ownership. `atomic_claim_ids` is `[clear]` rather than invented; this will fail `medical:presence` until an evidence-authoring pass attaches a real claim.

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
systemId: `subject: dev` ("Human development") is the id this module's brief specifies for the Development of Limbs chapter, but the live curriculum catalogue's own `SYS-DEV` system tree is postnatal life-stages (infancy, adolescence, adult health), not embryology, so no `SYS-DEV-*` node describes this content. `primary_node_id` instead uses the canonical taxonomy's own embryology discipline node, `DIS-EMB-T03` ("System development"), mirroring how this file's anatomy concepts use `DIS-ANA-T03` as `primary_node_id` under `subject: msk`.
secondaryNodeIds: Left `[clear]`. The MSK lower-limb microtopic tree (`SYS-MSK-T01-S02-M01..M06`) covers regional anatomy, not embryology, and no `DIS-EMB` leaf node exists finer than `DIS-EMB-T03` in the canonical taxonomy scanned. Recorded as a genuine gap rather than a forced, wrong placement.
microtopicId: The department book's own chapter title, "Development of Limbs", is carried in `microtopic`; it resolves to no `MIC_` node.
nanotopicId: The book's own subheading, "Steps", is carried in `module_subject`; the canonical tree has nothing finer.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book directly; no corpus extraction record.
sourceCandidateIds: Searched the corpus for "limb bud", "apical ectodermal ridge" and "limb rotation" — none returns any record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found.
examWeightByYear: No solved exam question exists for this concept; the value is an authored estimate matching blueprint_weight, with weight_confidence set low (0.2).
examSignal: Not from an exam paper — minted directly from the book (p113–114).
atomicClaimIds: See evidenceGaps above.
relationships: Walked the live concepts under `DIS-EMB-T03`/`T04` and this file's own siblings. The edges worth writing are prerequisite_of to CON-DEV-59689788046B4E (skeleton formation, which follows bud formation) and to CON-DEV-7A9E2385A26A8B (anomalies, which are disturbances of this same process). Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-DEV-59689788046B4E

## label
The limb skeleton ossifies from a cartilage model by primary centres in the shaft before birth and secondary centres in the epiphyses after, separated by a growth-controlling epiphyseal plate

## canonical_key
limb.skeleton.endochondral-ossification

## aliases
Endochondral ossification of the limb
Primary ossification centre
Secondary ossification centre
Epiphyseal plate

## arabic_label
التعظم الغضروفي لهيكل الطرف

## arabic_aliases
مركز التعظم الأولي
مركز التعظم الثانوي
الصفيحة المشاشية

## definition
The mesenchymal core of the limb bud is first transformed into a skeleton of hyaline cartilage. Endochondral ossification of that cartilage begins by the end of the embryonic period: primary ossification centres form in the shafts of the cartilage models, converting the shaft into bone but leaving its two ends cartilaginous. At birth the shafts are usually completely ossified, but the epiphyses are still cartilaginous; secondary ossification centres then appear in the epiphyses, and a cartilage plate, the epiphyseal plate, temporarily remains between the diaphyseal and epiphyseal ossification centres, playing the central role in growth of the bone's length. When the bone reaches its full length the epiphyseal plates disappear and the epiphyses unite with the shaft. In long bones an epiphyseal plate is found at each extremity; in smaller bones such as the phalanges, only at one extremity; and in irregular bones such as the vertebrae, one or more primary centres and usually several secondary centres are present. By the sixth week, joints form by an arrest of chondrogenesis at the future joint site, and the surrounding mesenchymal cells differentiate into a joint capsule.

## explicit_objective
Describe the sequence of endochondral ossification of the limb skeleton from cartilage model to mature bone, name where primary and secondary centres appear, and explain the epiphyseal plate's role in longitudinal growth.

## pitfalls
Assuming a long bone has only one ossification centre. It has at least three functionally: the primary centre in the shaft plus a secondary centre at each epiphysis, and the book explicitly contrasts this with smaller bones (one epiphyseal plate only) and irregular bones (several secondary centres). The second habitual error is saying the epiphyseal plate is bone; it is cartilage throughout growth and disappears — is not converted to a permanent structure — once growth is complete and the epiphysis fuses with the shaft.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T03

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
System development

## microtopic
Development of Limbs

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Development of Limbs > Formation of skeleton of limbs

## article_ids
ART-103-ANA-LIMB-DEVELOPMENT

## related_article_ids
ART-103-ANA-HIP-JOINT-STRUCTURE

## related_concept_ids
CON-DEV-EAF577AD3F3C53 | CON-DEV-7A9E2385A26A8B

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
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.35

## academic_relevance
0.8

## weight_confidence
0.2

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Formation of skeleton of limbs: At the beginning, the mesenchymal core is transformed into skeleton that is composed of hyaline cartilage. Endochondral ossification of the hyaline cartilage of the limbs, begins by the end of the embryonic period... At birth, the shafts are usually completely ossified, but the two ends, the epiphyses, are still cartilaginous.

## exam_signal


## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book's note on smaller and irregular bones ("N.B. In long bones, an epiphyseal plate is found on each extremity; in smaller bones, such as the phalanges, it is found only at one extremity...") is printed as a general aside rather than tied to a specific limb bone by name, so which of the limb's own bones besides the phalanges are meant by "smaller bones" is not spelled out.

## evidence_gaps
Evidence must be attached before publication. Genuinely new concept, no prior claim in this module's own corpus; a live concept exists for hard-palate ossification and pending 101 ISK batches use "endochondral ossification" as an alias for unrelated histology content, but nothing in live state or pending batches asserts this limb-specific sequence. Authoring a supporting claim and citation requires a citation-bearing evidence file outside this batch's file ownership. `atomic_claim_ids` is `[clear]` rather than invented; this will fail `medical:presence` until an evidence-authoring pass attaches a real claim.

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
systemId: Same reasoning as CON-DEV-EAF577AD3F3C53: `subject: dev` per this module's brief, `primary_node_id: DIS-EMB-T03` because the live `SYS-DEV` tree is postnatal life-stages, not embryology.
secondaryNodeIds: Left `[clear]` for the same reason as CON-DEV-EAF577AD3F3C53 — no finer `DIS-EMB` leaf exists in the canonical taxonomy scanned.
microtopicId: The department book's own chapter title, "Development of Limbs", is carried in `microtopic`; resolves to no `MIC_` node.
nanotopicId: The book's own subheading, "Formation of skeleton of limbs", is carried in `module_subject`.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book directly; no corpus extraction record.
sourceCandidateIds: Searched the corpus for "epiphyseal plate", "ossification" and "primary ossification centre" — a live `CON-DEV-F8572E6FF3E771` concerns hard-palate ossification (unrelated bone), and a pending 101 ISK batch uses "Endochondral ossification"/"Intramembranous ossification" as aliases on different histology-scoped records; none states this limb-development sequence, so no merge candidate exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found; the ossification hits above concern different bones or a different framing (histological mechanism rather than the limb's own developmental timeline).
examWeightByYear: No solved exam question exists for this concept; the value is an authored estimate matching blueprint_weight, with weight_confidence set low (0.2).
examSignal: Not from an exam paper — minted directly from the book (p114).
atomicClaimIds: See evidenceGaps above.
relationships: Walked the live concepts under `DIS-EMB-T03`/`T04` and this file's own siblings. The edge worth writing is prerequisite_of from CON-DEV-EAF577AD3F3C53 (bud formation) to this record, since the skeleton this concept describes forms inside the bud already described there. Reported as owed; no relations batch is claimed for 103 BMS.

---

# Item

## id
CON-DEV-7A9E2385A26A8B

## label
Limb anomalies range from complete absence to duplication or fusion of digits, named amelia, meromelia, brachydactyly, syndactyly, polydactyly and cleft hand or foot

## canonical_key
limb.anomalies.classification

## aliases
Amelia
Meromelia
Syndactyly
Polydactyly
Brachydactyly
Cleft hand or foot

## arabic_label
تشوهات الأطراف الخلقية

## arabic_aliases
انعدام الطرف
قصر الطرف
التصاق الأصابع
زيادة الأصابع

## definition
The department book gives six examples of limb anomalies. Meromelia is a short limb; amelia is the complete absence of a limb; brachydactyly is abnormally short digits; syndactyly is fusion of two or three digits; polydactyly is the presence of an extra digit; and cleft hand or foot is a condition with two fingers (or toes) in either the hand or the foot. These are presented as anomalies of the normal developmental sequence — limb bud outgrowth, apical-ectodermal-ridge-driven digit separation, and endochondral ossification — described in the same chapter, rather than as a separate mechanism of their own.

## explicit_objective
Name and define the six limb anomalies the department book lists, distinguishing absence (amelia), shortening (meromelia, brachydactyly) and digit number or fusion defects (syndactyly, polydactyly, cleft hand or foot).

## pitfalls
Confusing amelia with meromelia. Amelia is complete absence of the limb; meromelia is a short limb that is still present, not absent. The second habitual error is confusing syndactyly, fusion of digits, with polydactyly, an extra digit — the two are opposite kinds of defect (too few separate digits against too many) and the book illustrates both from separate photographs on the same page.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T04

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Congenital anomalies

## microtopic
Development of Limbs

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Anatomy > Development of Limbs > Anomalies of limbs

## article_ids
ART-103-ANA-LIMB-DEVELOPMENT

## related_article_ids
ART-103-ANA-HIP-JOINT-STRUCTURE

## related_concept_ids
CON-DEV-EAF577AD3F3C53 | CON-DEV-59689788046B4E

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
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.2

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Anomalies of limbs: examples of anomalies are: Meromelia: short limb. Amelia: complete absence of a limb. Brachydactyly: Abnormally short digits. Syndactyly: Fused two or three digits. Polydactyly: presence of extra digit. Cleft hand or foot: Two fingers in either hand or foot.

## exam_signal


## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book calls these "examples of anomalies," not an exhaustive list, and gives no cause, incidence or associated-syndrome information for any of the six; nothing beyond the name and one-line definition of each is asserted here.

## evidence_gaps
Evidence must be attached before publication. Genuinely new concept, no prior claim in the corpus; `find-existing.mjs "syndactyly"`, `"amelia"`, `"meromelia"` and `"brachydactyly"` returned no match. Authoring a supporting claim and citation requires a citation-bearing evidence file outside this batch's file ownership. `atomic_claim_ids` is `[clear]` rather than invented; this will fail `medical:presence` until an evidence-authoring pass attaches a real claim.

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
systemId: `subject: dev` per this module's brief; `primary_node_id: DIS-EMB-T04` ("Congenital anomalies"), the canonical taxonomy's own discipline node matching this record's content, rather than `DIS-EMB-T03` used by its two siblings above.
secondaryNodeIds: Left `[clear]` — no finer `DIS-EMB` leaf node exists in the canonical taxonomy scanned for limb-specific congenital anomalies.
microtopicId: The department book's own chapter title, "Development of Limbs", is carried in `microtopic`; resolves to no `MIC_` node.
nanotopicId: The book's own subheading, "Anomalies of limbs", is carried in `module_subject`.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book directly; no corpus extraction record.
sourceCandidateIds: Searched the corpus for "syndactyly", "amelia", "meromelia", "brachydactyly" and "polydactyly" — none returns any record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
rejectedMergeCandidateIds: No near-miss was found.
examWeightByYear: No solved exam question exists for this concept; the value is an authored estimate matching blueprint_weight, with weight_confidence set low (0.2).
examSignal: Not from an exam paper — minted directly from the book (p115).
atomicClaimIds: See evidenceGaps above.
relationships: Walked the live concepts under `DIS-EMB-T03`/`T04` and this file's own siblings. The edges worth writing are complication_of from CON-DEV-EAF577AD3F3C53 (a disturbance of bud/AER formation plausibly underlies amelia, meromelia and the digit-number defects) to this record. Reported as owed; no relations batch is claimed for 103 BMS.
