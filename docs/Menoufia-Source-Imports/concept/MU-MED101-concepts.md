<!--
  MU-MED101 (Foundation 1) - lane-1 authored concepts for the f1supp43-anat
  and f1supp43-histo clusters (41 questions total: 24 anatomy + 17
  histology). Searched via find-existing.mjs and a bulk grep index of
  docs/Kasr-Source-Imports/concept/101-ISK*.md + 103-BMS-{anatomy,histology,
  physiology}-concepts.md (540 records) before minting -- see
  coverage/MU-MED101-triage.md's concept-search sample for the two exact-fact
  reuses (axoneme, chromosomal syndromes; sparse overlays in
  pending-live/MU-MED101-concepts-overlay.md, not repeated here) that were
  found this way. All 32 concepts below are new mints -- no close match was
  found for these specific facts (Kasr's own 101-ISK/103-BMS material tests
  applied muscle/joint anatomy and named histology structures, not this
  first-week terminology and organelle-function layer).

  Two questions share one concept in three places, where they genuinely test
  the same single distinction rather than two different facts: bone growth in
  width vs length (one concept, two questions), the elbow's hinge-joint type
  and its transverse axis (one concept, two questions), S phase duplication
  and what distinguishes it from meiosis II (one concept, two questions), and
  smooth ER's detoxifying function and its adaptive proliferation (one
  concept, two questions); long-bone classification by epiphysis count
  covers three questions (typical/miniature, twice, plus the general
  'one-epiphysis' definition) with one concept.

  Evidence (one claim + one citation per concept) is in the sibling
  evidence/MU-MED101-{claims,citations}.md, citing the exam paper itself
  (evidence/MU-MED101-resources.md) -- no department book was available in
  the local corpus for this module at time of authoring. Teaching articles
  are in article/MU-MED101-articles.md.

  Simulate together with the two source files the sparse overlay depends on:
    node scripts/content/gate.mjs simulate \
      docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      docs/Menoufia-Source-Imports/concept/MU-MED101-concepts.md \
      docs/Menoufia-Source-Imports/pending-live/MU-MED101-concepts-overlay.md \
      docs/Menoufia-Source-Imports/article/MU-MED101-articles.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED101-resources.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED101-claims.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED101-citations.md \
      docs/Menoufia-Source-Imports/question/MU-MED101-f1supp43-anat-mcq.md \
      docs/Menoufia-Source-Imports/question/MU-MED101-f1supp43-histo-mcq.md

  Import: Admin > Concepts > Import.
-->

# Item

## label
Scapular protraction is the forward gliding movement of the shoulder girdle, produced chiefly by serratus anterior

## id
CON-MSK-FE9347F2758A70

## canonical_key
anatomy.movement.scapular-protraction

## aliases
Protraction of the shoulder
Scapular protraction vs retraction

## arabic_label


## arabic_aliases


## definition
Protraction is the forward gliding movement of the scapula around the chest wall, carrying the shoulder girdle anteriorly. It is produced chiefly by serratus anterior, assisted by pectoralis minor, and is the direct opposite of retraction, which pulls the shoulder girdle posteriorly via the rhomboids and middle trapezius.

## explicit_objective
State which movement carries the shoulder anteriorly, name the prime mover, and name its direct opposite.

## pitfalls
Confusing protraction/retraction (shoulder girdle) with protrusion/retrusion (the terms conventionally reserved for the mandible).

## concept_type
movement_definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T01

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Terminology and Osteology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-MOVEMENTS-DEC273BC

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-FE9347F2758A70

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Movement lost when the shoulder cannot move forward (protraction) / "A patient cannot move the shoulder anteriorly, which one of the following movements is los" -> Protraction

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p25 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p25, red-text key.

---

# Item

## label
Opposition of the thumb combines abduction, flexion and medial rotation at the carpometacarpal joint to meet the other digits

## id
CON-MSK-CEF53DA54D9A69

## canonical_key
anatomy.movement.thumb-opposition

## aliases
Thumb opposition definition
Composite thumb movement

## arabic_label


## arabic_aliases


## definition
Opposition is the composite movement unique to the thumb, combining abduction, flexion and medial rotation at its saddle-shaped carpometacarpal joint, so the thumb pulp can meet the pulp of each of the other four fingers in turn. It is essential for precision (pinch) grip and is driven chiefly by opponens pollicis, supplied by the median nerve; reposition is the named return movement back to rest.

## explicit_objective
Name the three component movements of thumb opposition, its principal muscle and nerve supply, and its return movement.

## pitfalls
Treating opposition as a single simple movement rather than a combination of abduction, flexion and rotation; confusing opposition with reposition (its return movement).

## concept_type
movement_definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T01

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Terminology and Osteology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-MOVEMENTS-DEC273BC

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-CEF53DA54D9A69

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Movement lost when the thumb cannot meet the other fingers (opposition) / "A patient cannot move the thumb to meet each of the other four fingers, which one of the f" -> Opposition

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p25 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p25, red-text key.

---

# Item

## label
Supination is lateral rotation of the radius around the ulna, turning the palm to face anteriorly or upward

## id
CON-MSK-1DB39427FDAD0A

## canonical_key
anatomy.movement.forearm-supination

## aliases
Supination definition
Forearm rotation terminology

## arabic_label


## arabic_aliases


## definition
Supination turns the palm to face anteriorly (anatomical position) or upward, produced by lateral (external) rotation of the radius around the ulna at the proximal and distal radio-ulnar joints. Biceps brachii is the most powerful supinator with the elbow flexed, assisted by supinator at any elbow angle; the opposite movement, pronation, is produced by medial rotation of the radius.

## explicit_objective
Classify supination as a rotational movement of the radius, name its prime mover, and name its opposite.

## pitfalls
Describing supination as an abduction/adduction-type movement rather than as a rotation of the radius; reversing supination and pronation.

## concept_type
movement_definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T01

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Terminology and Osteology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-MOVEMENTS-DEC273BC

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-1DB39427FDAD0A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Term correctly describing supination / "Which one of the following terms is correct regarding supination?" -> Lateral rotation

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p25 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p25, red-text key.

---

# Item

## label
Eversion turns the sole of the foot to face laterally, produced chiefly by peroneus longus and brevis

## id
CON-MSK-AC860554F97C5D

## canonical_key
anatomy.movement.foot-eversion

## aliases
Eversion definition
Foot inversion vs eversion

## arabic_label


## arabic_aliases


## definition
Eversion turns the sole of the foot to face outward (laterally), occurring mainly at the subtalar and transverse tarsal joints and produced chiefly by peroneus (fibularis) longus and brevis. It is the direct opposite of inversion (sole facing medially, produced by tibialis anterior and posterior); ankle sprains occur far more often in forced inversion than eversion because the lateral ligaments are weaker than the deltoid ligament.

## explicit_objective
Define eversion, name its prime movers, and contrast it with inversion.

## pitfalls
Confusing eversion/inversion (which turn the sole) with dorsiflexion/plantarflexion (which move the whole foot up or down at the ankle).

## concept_type
movement_definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T01

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Terminology and Osteology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-MOVEMENTS-DEC273BC

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-AC860554F97C5D

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Term for the sole of the foot facing outward (eversion) / "Which one of the following terms is correct if sole of the foot faces outward or laterally" -> Eversion

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p26 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p26, red-text key.

---

# Item

## label
Skull vault bones ossify intramembranously, directly from mesenchyme, without a cartilage model

## id
CON-MSK-BDB90615924999

## canonical_key
anatomy.ossification.intramembranous-skull-vault

## aliases
Intramembranous ossification
Flat bone development

## arabic_label


## arabic_aliases


## definition
The flat bones of the skull vault ossify by the intramembranous route: mesenchymal cells condense directly into osteoblasts within a fibrous membrane, with no intervening cartilage model. This allows rapid growth to accommodate the expanding brain and explains the fontanelles (unossified membrane) present at birth, contrasting with endochondral ossification, which forms almost every limb bone from a cartilage model that is later replaced by bone.

## explicit_objective
Name the ossification route used by the skull vault and state how it differs from endochondral ossification.

## pitfalls
Assuming all bones ossify the same way; forgetting that most limb bones (including the clavicle's medial end) are endochondral while the vault is intramembranous.

## concept_type
structure_function_relationship

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Bone development

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-BONES-98D4726F

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-BDB90615924999

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Bone developing by intramembranous ossification (skull vault) / "Which of the following bones develops by intra-membranous ossification?" -> Skull vault

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p26 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p26, red-text key.

---

# Item

## label
A long bone lengthens at its epiphyseal cartilage and widens by periosteal apposition

## id
CON-MSK-BF43527FC90940

## canonical_key
anatomy.bone-growth.length-vs-width

## aliases
Bone growth in length and width
Epiphyseal plate vs periosteum

## arabic_label


## arabic_aliases


## definition
A long bone increases in length at its epiphyseal (growth) plates of cartilage, through chondrocyte proliferation and endochondral ossification at the metaphysis, and increases in width by appositional new bone laid down by osteoblasts in the deep layer of the periosteum, while the endosteal surface is resorbed to enlarge the medullary cavity. The epiphyseal plate that closes later marks the bone's growing end; both plates fuse permanently at the end of puberty, roughly two years earlier in females than males.

## explicit_objective
Name the structure responsible for growth in length and the one responsible for growth in width, and state what "growing end" means.

## pitfalls
Attributing width growth to the metaphysis (which is where new length is being converted to bone, not where width is added) rather than to the periosteum.

## concept_type
structure_function_relationship

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T01

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Terminology and Osteology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-BONES-98D4726F

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-BF43527FC90940

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Structure responsible for a long bone growing in width (periosteum) / "Growth of bone in width is due to activity of which one of the following?" -> Periosteum | Structure responsible for a long bone growing in length (epiphyseal cartilage) / "Growth of bone in length is due to activity of which one of the following?" -> Epiphyseal cartilage

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p26 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p26, red-text key.

---

# Item

## label
The first carpometacarpal joint is a saddle joint, giving the thumb biaxial movement plus rotation for opposition

## id
CON-MSK-3982C8B3A4E7EE

## canonical_key
anatomy.joint.thumb-cmc-saddle

## aliases
Thumb CMC joint type
Saddle joint of the thumb

## arabic_label


## arabic_aliases


## definition
The first carpometacarpal (CMC) joint, between the trapezium and the base of the first metacarpal, is a saddle joint: each surface is convex in one direction and concave in the perpendicular direction. This gives it flexion-extension and abduction-adduction plus enough axial rotation for their combination to produce opposition — mobility no other (plane) carpometacarpal joint has.

## explicit_objective
Name the joint type of the thumb CMC joint and explain why its shape allows opposition.

## pitfalls
Assuming all carpometacarpal joints share the thumb's mobility; the 2nd-5th CMC joints are plane joints with only limited gliding.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Joints

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-JOINTS-518D520B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-3982C8B3A4E7EE

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Type of the first carpometacarpal joint (saddle) / "The type of first carpometacarpal joint is which one of the following?" -> Saddle

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p27 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p27, red-text key.

---

# Item

## label
The elbow is a uniaxial hinge joint moving only in flexion-extension around a transverse axis

## id
CON-MSK-784654E02FC967

## canonical_key
anatomy.joint.elbow-hinge-transverse-axis

## aliases
Elbow joint type
Hinge joint axis of movement

## arabic_label


## arabic_aliases


## definition
The elbow (humero-ulnar) joint is a uniaxial hinge (ginglymus) synovial joint, permitting flexion and extension only, around a single transverse axis through the trochlea. Hinge joints in general (elbow, knee, interphalangeal joints) are confined to one plane of movement around a transverse axis, distinguishing them from pivot joints (which rotate around a longitudinal axis).

## explicit_objective
Name the elbow's joint type, its single axis of movement, and contrast that axis with a pivot joint's axis.

## pitfalls
Forgetting that forearm rotation (pronation/supination) happens at the separate radio-ulnar joints, not at the humero-ulnar hinge joint itself.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Joints

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-JOINTS-518D520B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-784654E02FC967

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Joint type of the elbow (hinge) / "To which type of joints the elbow belongs?" -> Hinge | Axis of movement at hinge synovial joints (transverse) / "In hing synovial joints, the movements occur around an axis:" -> Transverse

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p27,p30 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p27,p30, red-text key.

---

# Item

## label
The knee is a modified hinge joint: mainly flexion-extension, with rotation and a screw-home mechanism at full extension

## id
CON-MSK-640634634E4930

## canonical_key
anatomy.joint.knee-modified-hinge

## aliases
Knee joint type
Screw-home mechanism

## arabic_label


## arabic_aliases


## definition
The knee joint is a modified hinge joint: its dominant movement is uniaxial flexion-extension, but a small amount of medial/lateral rotation is possible when flexed, and in the last few degrees of extension the femur rotates on the tibia to "screw home" and lock the fully extended knee. This secondary rotatory component is what makes it "modified" rather than a pure hinge.

## explicit_objective
Name the knee's joint type and describe the screw-home mechanism that makes it a modified, not a pure, hinge.

## pitfalls
Classifying the knee as a simple/pure hinge joint and missing its rotatory component.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Joints

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-JOINTS-518D520B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-640634634E4930

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Type of the knee joint (modified hinge) / "The type of the knee joint is which one of the following?" -> Modified hinge joint

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p27 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p27, red-text key.

---

# Item

## label
Abduction is movement of a limb away from the midline of the body

## id
CON-MSK-CD856A89D12EB5

## canonical_key
anatomy.movement.abduction-definition

## aliases
Abduction definition
Midline-referenced limb movements

## arabic_label


## arabic_aliases


## definition
Abduction is movement of a limb, or part of a limb, away from the midline of the body (or, for digits, away from the axis of the hand or foot), typically in the coronal plane at joints such as the shoulder and hip. It is the direct opposite of adduction, which returns the limb toward the midline; this midline-referenced pair is the standard convention used across all limb movement terminology.

## explicit_objective
Define abduction against the midline of the body and name its direct opposite.

## pitfalls
Confusing abduction/adduction (midline-referenced) with protraction/retraction (forward/backward gliding) or flexion/extension (joint-angle-referenced).

## concept_type
movement_definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T01

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Terminology and Osteology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-MOVEMENTS-DEC273BC

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-CD856A89D12EB5

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Term for limb movement away from the midline (abduction) / "Movement of the limb away from the midline of the body is called which one of the followin" -> Abduction

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p27 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p27, red-text key.

---

# Item

## label
The endocrine system is the set of ductless glands that secrete hormones directly into the bloodstream

## id
CON-FND-8C984FDEDA5B93

## canonical_key
physiology.endocrine-system.definition

## aliases
Endocrine system definition
Ductless glands

## arabic_label


## arabic_aliases


## definition
The endocrine system is the collection of ductless glands (pituitary, thyroid, adrenal glands, pancreatic islets and others) that secrete hormones directly into the bloodstream to act on distant target tissues, as opposed to exocrine glands, which secrete through a duct. It is distinguished from the nervous system, the body's other major control system, by signalling chemically and at a distance rather than electrically and locally, though the two interact closely (the neuroendocrine axis).

## explicit_objective
Define the endocrine system by its ductless, hormone-into-bloodstream mechanism and contrast it with the nervous system.

## pitfalls
Confusing endocrine glands (ductless, hormone into blood) with exocrine glands (ducted, secretion onto a surface or into a cavity).

## concept_type
functional_relationship

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Endocrine system

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Physiology

## article_ids
ART-MU101-JOINTS-518D520B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-8C984FDEDA5B93

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
System comprising all hormone-producing glands (endocrine) / "The system which consists of all glands that produce hormones is which one of the followin" -> Endocrine

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p27 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p27, red-text key.

---

# Item

## label
The metacarpophalangeal joints are condyloid joints, allowing flexion-extension and abduction-adduction

## id
CON-MSK-EBFF0703F8B8D9

## canonical_key
anatomy.joint.mcp-condyloid

## aliases
MCP joint type
Condyloid joint of the fingers

## arabic_label


## arabic_aliases


## definition
The metacarpophalangeal (MCP) joints are condyloid (ellipsoid) synovial joints: the convex, ellipsoid metacarpal head fits the shallow, oval concavity of the proximal phalanx base. This gives two degrees of freedom — flexion-extension and abduction-adduction (finger spreading) — plus a limited circumduction from their combination.

## explicit_objective
Name the MCP joint type and the two independent movements this shape allows.

## pitfalls
Assuming the MCP joints are hinge joints (uniaxial, flexion-extension only) and missing their abduction-adduction component.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Joints

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-JOINTS-518D520B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-EBFF0703F8B8D9

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Type of the metacarpophalangeal joints (condyloid) / "Which is the type of the metacarpophalangeal joints?" -> Condyloid

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p28 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p28, red-text key.

---

# Item

## label
The tarsal bones are short bones — a thin compact shell around a cancellous core

## id
CON-MSK-36E5F5233582E4

## canonical_key
anatomy.bone-classification.tarsal-short-bones

## aliases
Tarsal bone classification
Short bone structure

## arabic_label


## arabic_aliases


## definition
The tarsal bones (talus, calcaneus, navicular, cuboid and three cuneiforms) are short bones: roughly cuboidal, of similar length, breadth and thickness, with a thin outer shell of compact bone around a core of cancellous bone. This shape and internal architecture suits their role transmitting and absorbing load through the foot while still permitting gliding movement between adjacent bones; the carpal bones share the same classification for the same reason.

## explicit_objective
Classify the tarsal bones and describe the structural feature that suits them to load transmission.

## pitfalls
Calling the tarsals "irregular" or "flat" bones instead of short bones, or confusing them with the miniature long bones (metatarsals, phalanges) of the same foot.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T01

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Terminology and Osteology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-BONES-98D4726F

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-36E5F5233582E4

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Classification of the tarsal bones (short bones) / "The tarsal bones are:" -> Short bones

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p28 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p28, red-text key.

---

# Item

## label
Long bones are classed by epiphysis count: typical (two epiphyses), miniature (one), or atypical/modified (e.g. the clavicle)

## id
CON-MSK-4D6EF83A9A2C7F

## canonical_key
anatomy.bone-classification.long-bone-epiphysis-count

## aliases
Typical vs miniature long bone
Long bone classification

## arabic_label


## arabic_aliases


## definition
A typical long bone (femur, humerus, radius, ulna, tibia, fibula) has a diaphysis with its own separately-ossifying epiphysis at each end. A miniature (short) long bone (metacarpals, metatarsals, phalanges) also has a diaphysis but only one epiphysis, at one end, the other end fusing to the shaft without its own ossification centre; a modified long bone (the clavicle) is atypical for other reasons — no medullary cavity and partly intramembranous ossification.

## explicit_objective
State the epiphysis-count criterion that separates typical from miniature long bones, and name the clavicle's different, "modified" exception.

## pitfalls
Assuming every bone with a shaft (diaphysis) is a "typical" long bone regardless of how many epiphyses it has.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T01

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Terminology and Osteology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-BONES-98D4726F

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-4D6EF83A9A2C7F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Which bone is not a typical long bone (metacarpal) / "All of the following are typical long bones except:" -> Metacarpal | Which bone is a miniature long bone (metacarpal) / "Which of the following is miniature long bone?" -> Metacarpal bone | Long bone with only one epiphysis (miniature long bone) / "A long bone having only one epiphysis is called which one of the following?" -> Miniature long bone

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p28,p29,p30 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p28,p29,p30, red-text key.

---

# Item

## label
Shoulder circumduction runs flexion, then abduction, then extension, then adduction in sequence

## id
CON-MSK-FFA1DBDC9336D6

## canonical_key
anatomy.movement.shoulder-circumduction-sequence

## aliases
Circumduction sequence
Shoulder circumduction order

## arabic_label


## arabic_aliases


## definition
Circumduction is a compound movement describing a cone, built from a continuous, sequential combination of a joint's other movements rather than an independent motion of its own. At the shoulder, the conventional sequence runs flexion, then abduction, then extension, then adduction, returning to the start.

## explicit_objective
State the four-movement sequence, in order, that makes up shoulder circumduction.

## pitfalls
Treating circumduction as a distinct fifth movement rather than as flexion+abduction+extension+adduction performed in a continuous cycle.

## concept_type
movement_definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Joints

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-JOINTS-518D520B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-FFA1DBDC9336D6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Second movement in shoulder circumduction (abduction) / "The second movement that occurs during shoulder circumduction is:" -> Abduction

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p29 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p29, red-text key.

---

# Item

## label
The wrist (radiocarpal) joint, a condyloid joint, performs flexion, extension, abduction and adduction

## id
CON-MSK-387676EEB2B66E

## canonical_key
anatomy.joint.wrist-condyloid-movements

## aliases
Wrist joint movements
Radiocarpal joint mobility

## arabic_label


## arabic_aliases


## definition
The wrist (radiocarpal) joint is a condyloid (ellipsoid) synovial joint with two degrees of freedom: flexion-extension and abduction-adduction (radial/ulnar deviation), plus circumduction as their combination. All four of these movements are therefore genuinely performed at the wrist.

## explicit_objective
List the movements a condyloid joint such as the wrist can perform.

## pitfalls
Under-stating the wrist's mobility by naming only flexion-extension and missing its abduction-adduction (radial/ulnar deviation) component.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Joints

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-MOVEMENTS-DEC273BC

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-387676EEB2B66E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Movements performed by the wrist joint / "Which of the following movements are done by the wrist joint:" -> All of the above

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p29 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p29, red-text key.

---

# Item

## label
Synchondrosis is a primary cartilaginous joint (hyaline cartilage), not a fibrous joint

## id
CON-MSK-655D9A80CEEADE

## canonical_key
anatomy.joint.synchondrosis-classification

## aliases
Synchondrosis classification
Cartilaginous vs fibrous joints

## arabic_label


## arabic_aliases


## definition
Synchondrosis is a primary cartilaginous joint in which the bones are united by hyaline cartilage (as at an epiphyseal plate or the first costochondral joint), typically temporary and later ossifying. Fibrous joints instead unite bone with dense fibrous tissue and include sutures, gomphoses and syndesmoses; synchondrosis belongs in the cartilaginous category, alongside symphyses (secondary cartilaginous joints).

## explicit_objective
Classify synchondrosis as cartilaginous (hyaline) rather than fibrous, and name the three true fibrous joint types.

## pitfalls
Grouping synchondrosis with the fibrous joints because it, like them, allows little movement — classification is by tissue type (cartilage vs fibrous tissue), not by mobility.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Joints

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-JOINTS-518D520B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-655D9A80CEEADE

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Which is not a type of fibrous joint (synchondrosis) / "All of the following are types of fibrous joints except:" -> Synchondrosis

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p29 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p29, red-text key.

---

# Item

## label
The glenohumeral (shoulder) joint is a ball-and-socket joint, the most mobile joint in the body

## id
CON-MSK-3A296955587FDE

## canonical_key
anatomy.joint.shoulder-ball-and-socket

## aliases
Shoulder joint type
Glenohumeral joint mobility

## arabic_label


## arabic_aliases


## definition
The glenohumeral (shoulder) joint, between the shallow glenoid cavity and the spherical humeral head, is a ball-and-socket synovial joint allowing flexion-extension, abduction-adduction, medial-lateral rotation and circumduction — the most mobile joint in the body. This mobility comes at the cost of stability, which is why the joint depends heavily on the rotator cuff and glenoid labrum and is the most commonly dislocated large joint.

## explicit_objective
Name the shoulder joint's type and explain the mobility-versus-stability trade-off that follows from it.

## pitfalls
Assuming the shoulder's shallow glenoid cavity gives it the same stability as a deeper ball-and-socket joint such as the hip.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Joints

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-JOINTS-518D520B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-3A296955587FDE

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Type of joint between the glenoid cavity and the head of the humerus (ball and socket) / "The type of the joint between glenoid cavity and the head of the humerus is:" -> Ball and socket

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p30 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p30, red-text key.

---

# Item

## label
A portal circulation connects two capillary beds in series via a portal vein, without an intervening pass through the heart

## id
CON-FND-FF41417DBE6C38

## canonical_key
physiology.circulation.portal-two-capillary-beds

## aliases
Portal circulation definition
Hepatic portal system

## arabic_label


## arabic_aliases


## definition
A portal circulation connects two capillary (or sinusoidal) beds in series through a portal vein, without an intervening pass back through the heart. The hepatic portal system is the classic example: blood from the gut, spleen and pancreas capillary beds drains via the portal vein to a second capillary bed, the liver sinusoids, before leaving by the hepatic veins — letting the liver process gut-derived blood before it rejoins the systemic circulation.

## explicit_objective
Define a portal circulation by its two-capillary-beds-in-series arrangement and name its classic example.

## pitfalls
Confusing a portal circulation (two capillary beds in series, no heart pass between them) with the ordinary systemic or pulmonary circulation (a single capillary bed each).

## concept_type
functional_relationship

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T02

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Cardiovascular system

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Physiology

## article_ids
ART-MU101-JOINTS-518D520B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-FF41417DBE6C38

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Circulation connecting two capillary beds (portal) / "Which of the following circulations connects two capillary beds:" -> Portal

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p30 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p30, red-text key.

---

# Item

## label
Synovial joints have a joint cavity and a capsule; articular cartilage, not synovial membrane, covers the bone ends

## id
CON-MSK-11D3738D214A8B

## canonical_key
anatomy.joint.synovial-joint-features

## aliases
Synovial joint characteristics
Articular cartilage vs synovial membrane

## arabic_label


## arabic_aliases


## definition
A synovial joint has a fluid-filled joint cavity and a fibrous capsule binding the articulating bones, is freely mobile, and may contain an intra-articular disc/meniscus. The bone ends are covered by hyaline articular cartilage, not by synovial membrane; synovial membrane instead lines the capsule's inner surface and secretes the lubricating synovial fluid, stopping short of the load-bearing cartilage itself.

## explicit_objective
List the defining features of a synovial joint and state precisely what covers the articular bone ends.

## pitfalls
Assuming synovial membrane covers the articular surfaces themselves, rather than lining the capsule around them; articular cartilage is what actually covers the bone ends.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T03

## secondary_node_ids
[clear]

## topic
Anatomy

## subtopic
Joints

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Anatomy

## article_ids
ART-MU101-JOINTS-518D520B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-MSK-11D3738D214A8B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Characteristics of synovial joints (which is not one) / "All are characteristic of synovial joints except :" -> The articular ends of bone are covered by synovial membrane

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p31 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p31, red-text key.

---

# Item

## label
Cell inclusions (pigment, glycogen, lipid, secretory granules) are non-living stored material, distinct from living organelles such as microtubules

## id
CON-FND-00AB95D36059E4

## canonical_key
histology.cytology.inclusions-vs-organelles

## aliases
Cell inclusions definition
Inclusions vs organelles

## arabic_label


## arabic_aliases


## definition
Cell inclusions are non-living, often transient or metabolically variable accumulations of material within the cytoplasm — pigments (such as lipofuscin), stored nutrients (glycogen, lipid) and secretory granules awaiting release. This is distinct from organelles and cytoskeletal elements such as microtubules, which are permanent, living, functional cell components rather than stored substances.

## explicit_objective
Distinguish a cell inclusion from a living organelle, and give the four classic categories of inclusion.

## pitfalls
Classifying a permanent structural component such as a microtubule as an inclusion because it looks like a discrete cytoplasmic structure.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-HIS-T01

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Cell biology and cytogenetics

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-ORGANELLES1-AFA15D96

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-00AB95D36059E4

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Which of these is not a cell inclusion (microtubules) / "Which of the following is NOT considered an inclusion?" -> microtubules

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p33 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p33, red-text key.

---

# Item

## label
PAS stains carbohydrates (glycogen, glycoproteins), not neutral fat; osmic acid, Sudan III and Sudan black do stain fat

## id
CON-FND-B00722B64F7A11

## canonical_key
histology.stains.pas-vs-fat-stains

## aliases
PAS stain specificity
Fat cell stains

## arabic_label


## arabic_aliases


## definition
PAS (periodic acid-Schiff) demonstrates carbohydrates and carbohydrate-rich macromolecules — glycogen, glycoproteins, basement membranes — by oxidising vicinal diols to aldehydes that react with Schiff reagent; it does not demonstrate neutral fat, which has no such carbohydrate structure. Osmic acid, Sudan III and Sudan black, by contrast, are all lipid-specific stains that do demonstrate fat.

## explicit_objective
State which histochemical stain among a set of fat stains is the one that does not stain fat, and why (its target is carbohydrate, not lipid).

## pitfalls
Assuming any general-purpose histochemical stain used near fat cells (such as PAS, used to check for glycogen contamination or diabetic changes) is itself a fat stain.

## concept_type
structure_function_relationship

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-HIS-T01

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Cell biology and cytogenetics

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-ORGANELLES1-AFA15D96

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-B00722B64F7A11

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Stain that does not stain fat cells (PAS) / "The fat cell stain by all of the following except" -> pas

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p33 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p33, red-text key.

---

# Item

## label
Hemoglobin is the essential, life-sustaining respiratory pigment; carotene, melanin, carbon and bilirubin are not essential

## id
CON-FND-F0D524E0B74132

## canonical_key
histology.pigments.hemoglobin-essential

## aliases
Essential body pigment
Hemoglobin vs other pigments

## arabic_label


## arabic_aliases


## definition
Hemoglobin, the iron-containing respiratory pigment in red blood cells, is essential because it is the molecule that carries oxygen from the lungs to the tissues and carbon dioxide back — its absence is incompatible with life. Other body pigments (carotene, melanin, carbon particles, bilirubin) are protective, diagnostic or incidental, and the body can survive without any of them.

## explicit_objective
Identify which of the body's common pigments is truly essential to life, and why.

## pitfalls
Treating "important" pigments such as melanin (UV protection) as equally essential as hemoglobin, when only hemoglobin's absence is directly incompatible with life.

## concept_type
clinical_correlation

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-HIS-T01

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Cell biology and cytogenetics

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-ORGANELLES1-AFA15D96

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-F0D524E0B74132

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Most important and essential pigment in the body (hemoglobin) / "Which is the most important and essential pigment in the body?" -> hemoglobin

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p34 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p34, red-text key.

---

# Item

## label
Lysosome formation: rER synthesises acid hydrolases, the Golgi processes and packages them into primary lysosomes

## id
CON-FND-84EEFA1B15B9B3

## canonical_key
histology.organelles.lysosome-formation-rer-golgi

## aliases
Lysosome biogenesis
rER and Golgi in lysosome formation

## arabic_label


## arabic_aliases


## definition
Lysosome formation begins at the rough endoplasmic reticulum (rER), whose ribosomes synthesise the acid hydrolase enzymes destined for the lysosome. These enzymes then pass to the Golgi apparatus, which processes and tags them (mannose-6-phosphate) for lysosomal targeting and packages them into primary lysosomes budding from its trans face.

## explicit_objective
Name the two organelles that cooperate in lysosome formation and each one's specific contribution.

## pitfalls
Naming only one organelle (rER alone, or Golgi alone) rather than the required sequential pair.

## concept_type
structure_function_relationship

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-HIS-T01

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Cell biology and cytogenetics

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-ORGANELLES1-AFA15D96

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-84EEFA1B15B9B3

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Organelles that together form lysosomes (rER and Golgi) / "Which of the following two organelles share in the formation of lysosomes?" -> rER & Golgi

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p34 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p34, red-text key.

---

# Item

## label
S phase is when DNA and centrioles duplicate; meiosis II, unlike mitosis, is not preceded by its own S phase

## id
CON-FND-CFD790D4F45BB1

## canonical_key
histology.cell-cycle.s-phase-duplication-and-meiosis-ii

## aliases
S phase of interphase
Mitosis vs meiosis II timing

## arabic_label


## arabic_aliases


## definition
The S (synthesis) phase of interphase is when a cell replicates its DNA (to double the normal amount, as sister chromatids) and duplicates its centrioles, in preparation for division. Mitosis is always preceded by its own S phase, but meiosis II is not — the DNA was already replicated once before meiosis I, and that same replicated content is carried through into meiosis II without a second copying step, which is the cleanest feature distinguishing meiosis II from an ordinary mitotic division.

## explicit_objective
State what is duplicated in S phase, and explain why meiosis II, unlike mitosis, has no S phase of its own immediately before it.

## pitfalls
Assuming meiosis II must have its own preceding S phase because mitosis does; the two divisions differ precisely because meiosis II reuses meiosis I's single round of replication.

## concept_type
functional_relationship

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-HIS-T01

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Cell biology and cytogenetics

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-ORGANELLES2-3DEE3A82

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-CFD790D4F45BB1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Stage of duplication of DNA and centrioles (S phase) / "In which of the following stages the duplication of DNA and centrioles has been occurred?" -> S- stage of inter phase | Feature distinguishing mitosis from meiosis II (S phase) / "How to differentiate between mitosis and meiosis II?" -> S phase precedes mitosis but not meiosis II.

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p34,p37 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p34,p37, red-text key.

---

# Item

## label
The nucleolus is where ribosomal RNA is transcribed and assembled with proteins into ribosomal subunits

## id
CON-FND-3C79F1FD10BE15

## canonical_key
histology.nucleus.nucleolus-ribosome-synthesis

## aliases
Nucleolus function
Ribosome biogenesis site

## arabic_label


## arabic_aliases


## definition
The nucleolus is the intranuclear site where ribosomal RNA (rRNA) genes are transcribed and rRNA is assembled with imported ribosomal proteins into the large and small ribosomal subunits, which are then exported separately through nuclear pores and join on mRNA in the cytoplasm to form a functional ribosome. Nucleolar size and prominence correlate with a cell's protein-synthetic activity.

## explicit_objective
Name the site of ribosome (subunit) assembly and explain why active, secretory cells have prominent nucleoli.

## pitfalls
Assuming ribosomes are fully assembled inside the nucleolus; the two subunits are exported separately and only join in the cytoplasm.

## concept_type
structure_function_relationship

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-HIS-T01

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Cell biology and cytogenetics

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-ORGANELLES2-3DEE3A82

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-3C79F1FD10BE15

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Site where ribosomes are formed (nucleoli) / "Where are ribosomes formed?" -> Nucleoli

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p34 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p34, red-text key.

---

# Item

## label
Janus green selectively stains mitochondria in living cells because their active respiratory chain keeps it in its oxidised, coloured form

## id
CON-FND-97B30057F98924

## canonical_key
histology.stains.janus-green-mitochondria

## aliases
Janus green stain
Supravital mitochondrial stain

## arabic_label


## arabic_aliases


## definition
Janus green B is a supravital dye, applied to living unfixed cells, that stays in its oxidised blue-green colour selectively within mitochondria, because the mitochondrion's active electron-transport chain continuously re-oxidises it, while surrounding cytoplasm reduces it to a colourless form. This dependence on ongoing respiratory activity is what makes the stain mitochondria-selective, and is why it must be used on living tissue.

## explicit_objective
Name the vital stain specific for mitochondria and explain the respiratory-chain mechanism behind its selectivity.

## pitfalls
Confusing Janus green (a supravital, living-tissue stain) with a fixed-tissue histochemical stain.

## concept_type
structure_function_relationship

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-HIS-T01

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Cell biology and cytogenetics

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-ORGANELLES2-3DEE3A82

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-97B30057F98924

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Stain used to demonstrate mitochondria (Janus green) / "Mitochondria is stained by which type of stains?" -> Janus green

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p35 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p35, red-text key.

---

# Item

## label
Macrophages, as professional phagocytes with an unusually large lysosomal population, are the classic cell for studying lysosomes

## id
CON-FND-8DC1E6E867FDFA

## canonical_key
histology.organelles.macrophage-lysosome-study

## aliases
Macrophages and lysosomes
Best cell type for lysosome study

## arabic_label


## arabic_aliases


## definition
Macrophages are professional phagocytes whose core job — engulfing and digesting microorganisms, debris and worn-out cells — depends on a large, active population of lysosomes, making them the classic cell type used to study lysosomal structure and function (for example by acid phosphatase histochemistry).

## explicit_objective
Name the cell type whose central phagocytic function makes it the standard model for studying lysosomes.

## pitfalls
Choosing a cell type known for a different, unrelated organelle specialisation (e.g. fat cells for lipid droplets, mast cells for secretory granules) instead of macrophages for lysosomes.

## concept_type
structure_function_relationship

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-HIS-T01

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Cell biology and cytogenetics

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-ORGANELLES1-AFA15D96

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-8DC1E6E867FDFA

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Best cell type for studying lysosomes (macrophages) / "Which one of the following cells would be best for the study of lysosomes?" -> macrophages

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p35 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p35, red-text key.

---

# Item

## label
Smooth ER carries cytochrome P450 enzymes for drug detoxification, and proliferates adaptively with chronic drug/alcohol exposure

## id
CON-FND-05007E925AB4D5

## canonical_key
histology.organelles.ser-detoxification-and-proliferation

## aliases
Smooth ER detoxification
sER proliferation with chronic drug use

## arabic_label


## arabic_aliases


## definition
The smooth endoplasmic reticulum (sER) is rich in cytochrome P450 mixed-function oxidase enzymes, which chemically modify lipid-soluble drugs and other xenobiotics to make them more water-soluble and excretable, a role especially prominent in hepatocyte sER. With chronic drug or alcohol exposure, hepatocytes adaptively proliferate (massively expand) their sER to increase detoxifying capacity to match sustained demand — the structural basis of enzyme induction and drug tolerance.

## explicit_objective
Name the organelle responsible for drug detoxification and describe its adaptive proliferation with chronic exposure.

## pitfalls
Attributing drug detoxification to rER (protein synthesis) or to mitochondria (ATP production) instead of to sER's cytochrome P450 system.

## concept_type
structure_function_relationship

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-HIS-T01

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Cell biology and cytogenetics

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-ORGANELLES2-3DEE3A82

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-05007E925AB4D5

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Organelle responsible for drug detoxification (smooth ER) / "Which of these organelles responsible for detoxification of drugs?" -> sER | Organelle that proliferates with chronic drug/alcohol use (smooth ER) / "In patients who abuse drugs, including alcohol, there is an increased level of detoxifying" -> Smooth endoplasmic reticulum.

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p35,p36 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p35,p36, red-text key.

---

# Item

## label
Centrioles organise the mitotic spindle that segregates chromosomes during cell division

## id
CON-FND-C590C1C094E153

## canonical_key
histology.organelles.centrioles-mitotic-spindle

## aliases
Centrioles and cell division
Spindle-organising role of centrioles

## arabic_label


## arabic_aliases


## definition
Centrioles, duplicated during S phase, migrate to opposite cell poles and organise the microtubules of the mitotic spindle, the apparatus that pulls duplicated chromosomes apart to the daughter cells during mitosis — a direct, mechanical role in cell division that intermediate filaments (keratin, vimentin, glial, desmin) do not share.

## explicit_objective
Explain how centrioles contribute mechanically to cell division.

## pitfalls
Attributing a mitotic role to an intermediate filament type instead of to the centriole/centrosome-organised spindle.

## concept_type
structure_function_relationship

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-HIS-T01

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Cell biology and cytogenetics

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-ORGANELLES2-3DEE3A82

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-C590C1C094E153

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Organelle that shares in cell division (centrioles) / "Which of the following share in cell division?" -> Centrioles

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p35 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p35, red-text key. Lane 3: also tested as answerlabeled-q32 ("Microtubules have important role in which of the following? -> Mitotic spindle formation") in "EOM Practice - Foundation 1 - Anatomy Embryology Histology - Answer-Labeled.pdf" (mu_191aaaeeff88f7bfd219), p11, yellow-highlight key.

---

# Item

## label
The Golgi apparatus has a cis (entry) face receiving transport vesicles and a trans (exit) face releasing them

## id
CON-FND-887554F469D74B

## canonical_key
histology.organelles.golgi-cis-trans-polarity

## aliases
Golgi apparatus polarity
Cis face vs trans face

## arabic_label


## arabic_aliases


## definition
Transport vesicles carrying newly-synthesised protein from the rough ER fuse with the cis (entry/forming) face of the Golgi apparatus; material then moves through the stacked cisternae toward the trans (exit/maturing) face, being modified along the way, before leaving in vesicles that bud from the trans face. The cisternae are a series of separate stacked sacs, not a single interconnected system.

## explicit_objective
Name which Golgi face receives incoming transport vesicles and which face releases outgoing ones.

## pitfalls
Reversing cis and trans — attributing vesicle reception to the trans face and release to the cis face.

## concept_type
structure_function_relationship

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-HIS-T01

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Cell biology and cytogenetics

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-ORGANELLES2-3DEE3A82

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-887554F469D74B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Correct statement about the Golgi apparatus (cis face receives transport vesicles) / "Which statement is correctly describing the Golgi apparatus?" -> The transport vesicles are related to the cis face.

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p36 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p36, red-text key.

---

# Item

## label
Cholesterol buffers membrane fluidity, restraining excess fluidity at high temperature and excess rigidity at low temperature

## id
CON-FND-EBD0772A60AD54

## canonical_key
histology.membrane.cholesterol-fluidity-buffer

## aliases
Cholesterol and membrane fluidity
Fluid mosaic model regulator

## arabic_label


## arabic_aliases


## definition
Cholesterol, interspersed among the phospholipids of the cell membrane, acts as a fluidity buffer: at higher (body) temperatures its rigid steroid ring restrains excessive movement of the fatty-acid tails, preventing the membrane from becoming too fluid, while at lower temperatures it prevents the tails from packing too closely and becoming too rigid. This dual, temperature-buffering action is unique to cholesterol among the membrane's components.

## explicit_objective
Explain how cholesterol keeps the cell membrane's fluidity within a workable range at both high and low temperature.

## pitfalls
Attributing fluidity regulation to membrane proteins or glycolipids/glycoproteins, whose roles are transport, anchorage or surface recognition rather than bulk fluidity control.

## concept_type
structure_function_relationship

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-HIS-T01

## secondary_node_ids
[clear]

## topic
Histology

## subtopic
Cell biology and cytogenetics

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Histology

## article_ids
ART-MU101-ORGANELLES2-3DEE3A82

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-EBD0772A60AD54

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Structure preventing the cell membrane from being too fluid (cholesterol) / "Prevention of the cell membrane from being too fluid is the function of which of the follo" -> Cholesterol.

## exam_signal
mu_34ff78aabb8bfd729922 | paper | | p36 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus a bulk grep index of Kasr 101-ISK/103-BMS concept files (540 records), before minting -- no match found for this specific fact.
mu: Tested in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Support 43 sub-block, p36, red-text key.
