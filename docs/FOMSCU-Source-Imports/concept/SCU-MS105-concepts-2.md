<!--
  SCU-MS105 · Musculoskeletal — S3 minting pass, lane 2 (scu-ms105-author2).
  9 concepts genuinely new to the corpus after `find-existing.mjs` on each
  final canonical key plus a read of every promising hit body, following
  lane 1's own method exactly (never trusted at the tool's truncated single
  line). This pass covers the remaining 45 keyed items from
  `coverage/SCU-MS105-triage.md`: cluster 'mskaxsh' (MCQ - Axilla and
  Shoulder - Nadwat.pdf, 15 of 16 authored, 1 held as contradictory), the
  remaining 9 of cluster 'mskarm' (MCQ - Arm.pdf, appended to lane 1's own
  question file), and cluster 'mskkhanfour' (11 OCR-recovered stem-complete
  items from MCQ - Lecture 1 & 2, Dr Khanfour). 21 further facts across
  these 35 items reuse existing live/pending concepts instead of minting —
  see `pending-live/SCU-MS105-author1-overlay-concepts.md`, extended by
  this lane rather than duplicated, for the overlay rows and match
  reasoning.

  Ids minted with `mint-concept-id.mjs`, checked against the live snapshot
  and the taken-id scan (13,578 existing ids at mint time); none derived
  for a concept that already exists. `atomic_claim_ids` is `[clear]` on
  every record, matching lane 1's own convention and the standing
  convention documented in Kasr's 103-BMS-mcq-lipid-concepts.md.

  `primary_node_id` is left blank with a field_note on every record, same
  as lane 1: the canonical DIS-* taxonomy nodes could not be resolved from
  this worktree in the time this lane had. `module_subject` carries
  FOMSCU's own placement instead. Arabic fields are blank with a
  field_note (LD-15, no Arabic reviewer available to this lane).

  Sources: FOMSCU Musculoskeletal own-source exam PDFs — `Anatomy/03
  Questions and QBank/MCQ - Arm.pdf`, `MCQ - Axilla and Shoulder -
  Nadwat.pdf` (both native text, one item per odd page, single answer
  letter on the following even page) and `MCQ - Lecture 1 - Dr Khanfour.pdf`
  / `MCQ - Lecture 2 - Dr Khanfour.pdf` (scanned, cached OCR, stems Q6-10 of
  Lecture 1 and Q7-10 of each of Lecture 2's two sub-decks recovered) — see
  `coverage/SCU-MS105-triage.md`. Every explanation below is written fresh
  from standard textbook fact in the platform's own voice, never copied
  from the source PDF's own short (or absent) explanation line.
-->

# Item

## label
The base of the axilla is formed by skin, subcutaneous tissue and axillary fascia

## id
CON-MSK-9261D0F63A246A

## canonical_key
anatomy.axilla.base-composition

## aliases
Base of the axilla
Axillary fascia floor

## arabic_label

## arabic_aliases

## definition
The axilla is a pyramidal space with an apex, a base and four walls. The base is not a muscular wall but the floor of the pyramid, formed by skin, subcutaneous fat and the axillary fascia that spans between the lower borders of the anterior and posterior axillary folds (pectoralis major in front, latissimus dorsi and teres major behind). This distinguishes the base from the true walls: the anterior wall is pectoralis major and pectoralis minor, the posterior wall subscapularis, teres major and latissimus dorsi, the medial wall the ribs and serratus anterior, and the lateral wall the intertubercular groove of the humerus.

## explicit_objective
State that the base of the axilla, unlike its four muscular walls, is formed by skin, subcutaneous tissue and axillary fascia.

## pitfalls
Naming a muscle, such as pectoralis major, as the base's composition, confusing it with the anterior wall or anterior fold, which are muscular structures rather than the skin/fascia floor.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Axilla: base

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-MS105

## article_ids
ART-SCU-MS105-ANA-SHOULDER-AXILLA

## related_article_ids

## related_concept_ids

## resource_ids

## approved_file_resource_ids

## approved_video_resource_ids

## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-MS105 > Anatomy > Upper Limb > Axilla: Base

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Axilla and Shoulder - Nadwat.pdf item 2 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The base of the axilla is formed by which structure? ... Skin, subcutaneous tissue, and axillary fascia" (FOMSCU Musculoskeletal, MCQ - Axilla and Shoulder - Nadwat.pdf, item 2)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "base of the axilla" returned only question titles about the lymph-node group in the axilla's base fat pad — a different specific fact (lymph node content, not the base's own tissue composition) — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The cephalic vein is not a content of the axilla proper

## id
CON-MSK-AF0860139291A3

## canonical_key
anatomy.axilla.cephalic-vein-not-a-content

## aliases
Axillary contents exclude the cephalic vein
Deltopectoral groove vein excluded from axilla

## arabic_label

## arabic_aliases

## definition
The true contents of the axilla are the axillary artery and vein, the cords and branches of the brachial plexus, axillary lymph nodes, and fat. The cephalic vein, by contrast, ascends in the deltopectoral groove between deltoid and pectoralis major, staying outside the axillary space itself along almost its whole course, and only briefly pierces the clavipectoral fascia at the very top of this groove to drain into the axillary vein. Because it runs external to the axilla and merely joins one of its contents at the very end of its course, the cephalic vein itself is excluded from lists of axillary contents.

## explicit_objective
State that the cephalic vein is not a content of the axilla, since it runs in the deltopectoral groove outside the axillary space and only terminates into the axillary vein.

## pitfalls
Assuming any vein that drains into the axillary vein must itself be an axillary content; the cephalic vein's course is deliberately external, in the deltopectoral groove, unlike the axillary vein itself which does run through the space.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Axilla: contents

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-MS105

## article_ids
ART-SCU-MS105-ANA-SHOULDER-AXILLA

## related_article_ids

## related_concept_ids
CON-MSK-66A2E56C00F3A7

## resource_ids

## approved_file_resource_ids

## approved_video_resource_ids

## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-MS105 > Anatomy > Upper Limb > Axilla: Contents

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Axilla and Shoulder - Nadwat.pdf item 5 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is NOT a content of the axilla? ... Cephalic vein (directly inside axilla)" (FOMSCU Musculoskeletal, MCQ - Axilla and Shoulder - Nadwat.pdf, item 5)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "cephalic vein" returned live/pending records about the vein's own course and termination (starts laterally, ends in the axillary vein) — the same vessel but a different specific fact from this concept's own claim (exclusion from the axilla's content list) — minted fresh; related_concept_ids points at CON-MSK-66A2E56C00F3A7 (docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md), which documents that course and is reused directly by this lane's mskkhanfour-q10.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Pronation is not a movement of the shoulder joint

## id
CON-MSK-B311B2D3290AE7

## canonical_key
anatomy.shoulder.pronation-not-a-shoulder-movement

## aliases
Shoulder joint movements exclude pronation
Glenohumeral vs radio-ulnar movements

## arabic_label

## arabic_aliases

## definition
The shoulder (glenohumeral) joint is a ball-and-socket joint permitting flexion, extension, abduction, adduction, medial and lateral rotation, and circumduction. Pronation and supination, by contrast, are rotational movements of the forearm at the proximal and distal radio-ulnar joints, produced by the radius rotating around a fixed ulna, and they do not occur at the shoulder joint at all. Confusing the two is a common exam trap, since both pronation and shoulder rotation involve turning the upper limb, but they happen at entirely different articulations with different axes of movement.

## explicit_objective
State that pronation is a forearm (radio-ulnar) movement, not one of the shoulder joint's own movements.

## pitfalls
Selecting pronation as a shoulder movement because both involve 'turning' the limb; the shoulder's own rotations are medial and lateral rotation of the humerus, a movement distinct from forearm pronation at the radio-ulnar joints.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Shoulder joint: movements

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-MS105

## article_ids
ART-SCU-MS105-ANA-SHOULDER-AXILLA

## related_article_ids

## related_concept_ids

## resource_ids

## approved_file_resource_ids

## approved_video_resource_ids

## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-MS105 > Anatomy > Upper Limb > Shoulder Joint: Movements

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Axilla and Shoulder - Nadwat.pdf item 14 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is NOT a movement possible at the shoulder joint? ... Pronation" (FOMSCU Musculoskeletal, MCQ - Axilla and Shoulder - Nadwat.pdf, item 14)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "pronation" returned live/pending records defining forearm pronation/supination itself (muscles, attachments, nerve) — a different specific fact, the movement's own mechanics rather than its exclusion from the shoulder joint's movement list — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The lateral and medial cords' terminal branches form an "M" shape with the median nerve at its apex

## id
CON-MSK-2B1E44B92E0511

## canonical_key
anatomy.brachial-plexus.m-shaped-cords-median-ulnar-musculocutaneous

## aliases
"M" of the brachial plexus
Median, ulnar, musculocutaneous nerve diagram

## arabic_label

## arabic_aliases

## definition
In the classic anterior dissection view of the axilla, the musculocutaneous nerve (from the lateral cord), the two converging roots of the median nerve (lateral and medial cord contributions uniting anterior to the axillary artery), and the ulnar nerve (from the medial cord) together trace an "M" shape across the front of the axillary artery. The median nerve's two converging roots form the central peak of the M, while the musculocutaneous and ulnar nerves diverge outward as its two limbs. This "M" is a standard teaching landmark for identifying the terminal branches of the lateral and medial cords during dissection.

## explicit_objective
State that the musculocutaneous, median and ulnar nerves together form the classic "M" shape traced by the lateral and medial cords' terminal branches around the axillary artery.

## pitfalls
Substituting the radial or axillary nerve, both posterior-cord branches lying behind the artery and no part of the anterior "M", for one of the three nerves that actually form it.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Brachial plexus: cord terminal branches

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-MS105

## article_ids
ART-SCU-MS105-ANA-SHOULDER-AXILLA

## related_article_ids

## related_concept_ids
CON-MSK-CF723B5FB24D70

## resource_ids

## approved_file_resource_ids

## approved_video_resource_ids

## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-MS105 > Anatomy > Upper Limb > Brachial Plexus: Cord Terminal Branches

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Axilla and Shoulder - Nadwat.pdf item 16 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The \"M\" shape of the brachial plexus cords is formed by which nerves? ... Median, Ulnar, and Musculocutaneous" (FOMSCU Musculoskeletal, MCQ - Axilla and Shoulder - Nadwat.pdf, item 16)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "brachial plexus formation branches" and "m shape brachial plexus" returned no hits on this specific mnemonic/diagram fact — minted fresh; related_concept_ids points at CON-MSK-CF723B5FB24D70 (docs/Kasr-Source-Imports/concept/101-ISK-concepts.md), the general cord-branches concept this "M" diagram illustrates.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Brachialis lies deep to biceps brachii in the anterior compartment of the arm

## id
CON-MSK-41AFC12F501D59

## canonical_key
anatomy.arm.brachialis-deep-to-biceps-brachii

## aliases
Arm anterior compartment muscle layering
True flexor of the elbow

## arabic_label

## arabic_aliases

## definition
The anterior compartment of the arm contains three flexor muscles arranged in two layers: biceps brachii lies superficially, while brachialis lies deep to it, arising from the anterior surface of the distal half of the humerus and inserting on the ulnar tuberosity. Coracobrachialis lies proximally, deep to the short head of biceps. Because brachialis lies directly beneath biceps brachii and both cross the elbow, brachialis is often called the true flexor of the elbow, acting regardless of forearm position, unlike biceps brachii whose action is also affected by supination.

## explicit_objective
State that brachialis lies deep to biceps brachii in the anterior compartment of the arm.

## pitfalls
Selecting triceps brachii, a posterior-compartment muscle, or brachioradialis, a forearm muscle, instead of brachialis, the only anterior-compartment muscle that lies directly deep to biceps brachii.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Arm: muscle layering

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-MS105

## article_ids
ART-SCU-MS105-ANA-ARM-COMPARTMENTS

## related_article_ids

## related_concept_ids

## resource_ids

## approved_file_resource_ids

## approved_video_resource_ids

## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-MS105 > Anatomy > Upper Limb > Arm: Muscle Layering

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Arm.pdf item 13 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which muscle lies deep to the biceps brachii in the anterior compartment of the arm? ... Brachialis" (FOMSCU Musculoskeletal, MCQ - Arm.pdf, item 13)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "brachialis deep to biceps brachii" and "brachialis lies deep to biceps" returned no hits; the only existing "brachialis" hits describe the musculocutaneous nerve's course through/supply to it — a different specific fact, nerve course rather than the two muscles' own layered position — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Injury to the medial side of the arm affects both the ulnar nerve and the medial cutaneous nerve of the forearm

## id
CON-MSK-B920ABEF3F31F8

## canonical_key
anatomy.arm.ulnar-and-medial-cutaneous-nerve-medial-arm-injury

## aliases
Medial arm neurovascular bundle injury
Ulnar nerve and medial cutaneous nerve of forearm course

## arabic_label

## arabic_aliases

## definition
The ulnar nerve and the medial cutaneous nerve of the forearm both descend along the medial side of the arm, lying close together medial to the brachial artery, before the ulnar nerve pierces the medial intermuscular septum around mid-arm to enter the posterior compartment. Because both nerves run superficially along this same medial course before diverging, a penetrating or compressive injury to the medial side of the arm is the single site most likely to damage both together, unlike a midshaft or lateral injury, which would spare one or both nerves.

## explicit_objective
State that injury to the medial side of the arm is the site most likely to injure both the ulnar nerve and the medial cutaneous nerve of the forearm together, given their shared medial course.

## pitfalls
Selecting the midshaft of the humerus, radial nerve territory on the posterior aspect, or the lateral epicondyle, radial/posterior interosseous territory, instead of the medial side of the arm, where the ulnar nerve and medial cutaneous nerve of the forearm both actually run.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Arm: medial neurovascular bundle

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-MS105

## article_ids
ART-SCU-MS105-ANA-ARM-COMPARTMENTS

## related_article_ids

## related_concept_ids

## resource_ids

## approved_file_resource_ids

## approved_video_resource_ids

## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.6

## weight_confidence
0.5

## module_subject
SCU-MS105 > Anatomy > Upper Limb > Arm: Medial Neurovascular Bundle

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Arm.pdf item 17 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Injury to which part of the arm would MOST LIKELY affect both the ulnar nerve and the medial cutaneous nerve of the forearm? ... Medial side of the arm" (FOMSCU Musculoskeletal, MCQ - Arm.pdf, item 17)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "medial cutaneous nerve of the forearm", "ulnar nerve and medial cutaneous nerve" and "medial side of the arm" returned no hits — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The median nerve crosses the brachial artery from lateral to medial in the arm, not medial to lateral

## id
CON-MSK-DE127BA529A64D

## canonical_key
anatomy.median-nerve.course-crosses-lateral-to-medial-in-arm

## aliases
Median nerve course in the arm
Median nerve crossing of the brachial artery

## arabic_label

## arabic_aliases

## definition
The median nerve is formed anterior to the axillary artery by the union of its lateral and medial roots, and it initially lies lateral to the brachial artery in the upper arm. At the level of the insertion of coracobrachialis, roughly the middle of the arm, the median nerve crosses in front of the brachial artery to become medial to it for the remainder of its course down to the cubital fossa, where it passes between the two heads of pronator teres to enter the forearm. The crossing is therefore lateral to medial, not medial to lateral.

## explicit_objective
State that the median nerve crosses the brachial artery from lateral to medial in the lower arm, correcting the commonly reversed description.

## pitfalls
Reversing the direction of the crossing to medial to lateral; the median nerve begins lateral to the brachial artery in the upper arm and ends medial to it at the elbow, the opposite direction from the misstated version.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Arm: median nerve course

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-MS105

## article_ids
ART-SCU-MS105-ANA-ARM-COMPARTMENTS

## related_article_ids

## related_concept_ids

## resource_ids

## approved_file_resource_ids

## approved_video_resource_ids

## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-MS105 > Anatomy > Upper Limb > Arm: Median Nerve Course

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Lecture 2 - Dr Khanfour.pdf item 7 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is false as regards the median nerve? ... It crosses from medial to lateral at the level of the lower third of the arm" (FOMSCU Musculoskeletal, MCQ - Lecture 2 - Dr Khanfour.pdf, item 7)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "median nerve course in the arm" and "median nerve crosses the brachial artery" returned no hits — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The ulnar nerve has no motor distribution to any muscle of the arm

## id
CON-MSK-9BE392D2C3E127

## canonical_key
anatomy.ulnar-nerve.no-motor-branches-in-the-arm

## aliases
Ulnar nerve course in the arm
Nerves with no arm muscle supply

## arabic_label

## arabic_aliases

## definition
The ulnar nerve descends through the arm on the medial side of the brachial artery without giving off any muscular branches there, contributing only an articular twig to the elbow joint near its end. Its motor supply begins only after it passes posterior to the medial epicondyle into the forearm, where it supplies flexor carpi ulnaris and the medial half of flexor digitorum profundus, and it continues into the hand to supply most of the intrinsic muscles there. This makes the ulnar nerve, alongside the median nerve, one of the two major upper-limb nerves that innervate no muscle of the arm itself.

## explicit_objective
State that the ulnar nerve gives no motor branches to any muscle of the arm, its motor supply beginning only in the forearm.

## pitfalls
Assuming that any major nerve passing through the arm must supply an arm muscle; the ulnar nerve is a clear exception, passing through purely as a conduit before its motor branches begin distal to the elbow.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Arm: ulnar nerve course

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-MS105

## article_ids
ART-SCU-MS105-ANA-ARM-COMPARTMENTS

## related_article_ids

## related_concept_ids

## resource_ids

## approved_file_resource_ids

## approved_video_resource_ids

## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-MS105 > Anatomy > Upper Limb > Arm: Ulnar Nerve Course

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Lecture 2 - Dr Khanfour.pdf item 8 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following nerves has NO motor distribution to any of the muscles of the arm? ... Ulnar nerve" (FOMSCU Musculoskeletal, MCQ - Lecture 2 - Dr Khanfour.pdf, item 8)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "ulnar nerve no motor" and "ulnar nerve course in the arm" returned no hits — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Supracondylar fracture of the humerus commonly injures the median nerve

## id
CON-MSK-69CB01414CDC17

## canonical_key
pathology.elbow.supracondylar-fracture-median-nerve-injury

## aliases
Supracondylar fracture nerve injury
Median nerve at risk in elbow fracture

## arabic_label

## arabic_aliases

## definition
A supracondylar fracture of the humerus, most often from a fall onto an outstretched hand in a child, typically displaces the distal fragment posteriorly, putting the structures that cross anterior to the elbow at risk. The median nerve, running centrally in front of the joint together with the brachial artery, is the structure most commonly injured, with its anterior interosseous branch particularly vulnerable, while the radial and ulnar nerves and the brachial artery may also be affected depending on the direction of displacement. Prompt recognition matters because an accompanying brachial artery injury can compromise the circulation of the forearm.

## explicit_objective
State that the median nerve is the structure most commonly affected in a supracondylar fracture of the humerus.

## pitfalls
Defaulting to the ulnar nerve, which is instead at risk in medial epicondyle fractures, or to the radial artery, a forearm vessel rather than the structure classically named at risk here, instead of the median nerve.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Elbow: supracondylar fracture

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-MS105

## article_ids
ART-SCU-MS105-ANA-ARM-COMPARTMENTS

## related_article_ids

## related_concept_ids

## resource_ids

## approved_file_resource_ids

## approved_video_resource_ids

## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.6

## academic_relevance
0.6

## weight_confidence
0.5

## module_subject
SCU-MS105 > Anatomy > Upper Limb > Elbow: Supracondylar Fracture

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Lecture 2 - Dr Khanfour.pdf item 10 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"What structure is commonly affected in the supracondylar fracture of the humerus? ... Median nerve" (FOMSCU Musculoskeletal, MCQ - Lecture 2 - Dr Khanfour.pdf, item 10)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "supracondylar fracture" returned an unrelated Menoufia question about DIP flexion loss and root value, a different specific structure/fact; "supracondylar fracture median nerve" and "crutch palsy" returned no hits — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
