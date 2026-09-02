<!--
  SCU-FBS102 · Foundation 1 — S2 minting pass, third author lane
  (scu-fbs102-author3). 30 concepts genuinely new to the corpus after
  re-verification: `find-existing.mjs` on the final canonical key AND
  `grep -ril` of 2-3 distinctive terms across every `docs/*-Source-Imports/
  concept/`, `pending-live/` directory, plus a read of every hit body.

  Ten of this lane's original 26 "new" candidates (19 Anatomy, 9 Histology
  from the triage's own bucket) turned out, on that closer grep pass, to
  already have a matching concept sitting in another module's pending batch
  — `find-existing.mjs`'s own pending-batch scanner only reads a `##`
  heading's FIRST line (a regex `$` inside a `/m`-flag lookahead stops the
  non-greedy capture at the first line break, so a multi-line `aliases` or
  `definition` block is invisible to it past its own first line). Those ten
  are NOT in this file — they are sparse SCU-tag overlays onto the existing
  concept in the sibling `pending-live/SCU-FBS102-overlay-concepts.md`
  instead, named in this lane's hand-off report.

  Ids minted with `mint-concept-id.mjs`, checked against the live snapshot
  and the taken-id scan; none derived for a concept that already exists.
  `atomic_claim_ids` is `[clear]` on every record — this lane was scoped to
  concept, article and question files, and mints no evidence claim or
  citation records, matching the standing convention already documented in
  Kasr's 103-BMS-mcq-lipid-concepts.md. The evidence chain is owed and named
  in the hand-off report, not concealed.

  `primary_node_id` is left blank with a field_note on every record: the
  canonical DIS-* taxonomy nodes could not be resolved from this worktree in
  the time this lane had, and inventing one would be worse than naming the
  gap. `module_subject` carries FOMSCU's own placement instead.

  Sources: FOMSCU Foundation 1 own-source quiz-app JSON, keys and stems read
  directly from `03 Questions and QBank/*.json` and `06/07 Exams/*.json`
  (question numbers cited per record) — printed keys stand; every
  explanation is written fresh in the platform's own voice from standard
  textbook fact, never translated from the source JSON's own Arabic
  explanation field.
-->

# Item

## label
The cranium is the bony structure that protects the brain

## id
CON-MSK-D12730DE62FDE5

## canonical_key
anatomy.cranium.brain-protecting-bone

## aliases
Cranial cavity
Neurocranium

## arabic_label


## arabic_aliases


## definition
The cranium (neurocranium) is the part of the skull that forms a bony box around the brain, distinct from the facial skeleton it sits above. It is built from eight bones — frontal, occipital, sphenoid, ethmoid and the paired parietal and temporal bones — joined at immobile sutures once growth is complete, so that the brain sits inside a rigid protective vault. The sternum protects the heart and great vessels, the rib cage the lungs, and the pelvis the pelvic viscera; each of the body's major cavities has its own dedicated bony guard, and the cranium is the brain's.

## explicit_objective
State that the cranium is the bony vault protecting the brain, and distinguish it from the other named bones (sternum, rib cage, pelvis) that guard other organs.

## pitfalls
Picking the sternum or the pelvis by association with "protection" generally, rather than naming the specific organ each bone guards — the sternum shields the heart and great mediastinal vessels, the rib cage the lungs, and the pelvis the pelvic viscera, not the brain.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skeletal system: skull

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-SKULL-OSTEOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-D1FA39D2D2AEA6 | CON-MSK-78F63BBD89AAE1

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
SCU-FBS102 > Anatomy > Basis of Anatomy > Osteology of the Skull

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q13 | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following bony structures protects the brain? ... Cranium" (FOMSCU past exams 2026 final, Q13)

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
sourceCandidateIds: See above — the only related hit was a different concept's passing mention of the cranium, not a duplicate of this classification fact.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The nasal bone is classified as a facial bone, not a cranial bone

## id
CON-MSK-D1FA39D2D2AEA6

## canonical_key
anatomy.nasal-bone.facial-vs-cranial-classification

## aliases
Ossa nasalia

## arabic_label


## arabic_aliases


## definition
The skull's bones split into two functional groups: the neurocranium (occipital, sphenoid, ethmoid, frontal, and paired parietal and temporal bones), which forms the vault around the brain, and the viscerocranium or facial skeleton, which frames the face. The nasal bone is one of the facial bones, forming the bridge of the nose; the occipital, sphenoid and ethmoid bones named alongside it as distractors are all neurocranial, not facial.

## explicit_objective
Sort the nasal bone correctly into the facial (viscerocranial) group rather than the cranial (neurocranial) group, and name at least two bones on each side of that split.

## pitfalls
Assuming any bone in the region of the nose or orbit must be "cranial" because it sits in the head — the ethmoid, which does border the nasal cavity, is neurocranial (it contributes to the anterior cranial fossa), while the nasal bone itself, though smaller and less discussed, is facial.

## concept_type
classification

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skeletal system: skull

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-SKULL-OSTEOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-D12730DE62FDE5

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
SCU-FBS102 > Anatomy > Basis of Anatomy > Osteology of the Skull

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q17 | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following bones is anatomically considered a facial bone? ... Nasal bone" (FOMSCU past exams 2026 final, Q17)

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
sourceCandidateIds: Searched for "nasal bone" and "facial bone". The only hit (AU-MED-106-anatomy-concepts.md) covers the bony boundaries of the whole nasal cavity, with "Nasal bone" as an alias, but never states the facial-versus-cranial classification this question tests — not a duplicate.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The sutures of the skull are the classic example of a fibrous joint

## id
CON-MSK-78F63BBD89AAE1

## canonical_key
anatomy.skull.sutures-as-fibrous-joints

## aliases
Cranial sutures
Synarthrosis

## arabic_label


## arabic_aliases


## definition
Joints are classified structurally into fibrous, cartilaginous and synovial types. Fibrous joints are united by dense fibrous tissue with no joint cavity and essentially no movement (a synarthrosis); the sutures between the flat bones of the skull vault are the textbook example. This contrasts with the knee, shoulder and hip, which are freely mobile synovial joints with a joint cavity and articular cartilage.

## explicit_objective
Name the sutures of the skull as the classic fibrous-joint example, and place them correctly against synovial joints such as the knee, shoulder and hip.

## pitfalls
Treating any joint that "does not obviously bend" as automatically fibrous — the hip is a synovial ball-and-socket joint with a very large range of motion, but a stiff or diseased synovial joint can still be mistaken for one that structurally permits little movement; the classification is by structure (a joint cavity and articular cartilage versus none), not by how much the joint is used to move in daily life.

## concept_type
classification

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Joints and their classification

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-SKULL-OSTEOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-B66C026C865EE7

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
SCU-FBS102 > Anatomy > Basis of Anatomy > Joints

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q8 | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following is considered a classic example of fibrous joints? ... Sutures of the skull" (FOMSCU past exams 2026 final, Q8)

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
sourceCandidateIds: Searched for "sutures of the skull", "cranial sutures" and "fibrous joint". The only hit was this lane's own batch-2 question file, where cranial sutures appear only as a distractor explanation inside an unrelated elbow-joint question, not a dedicated concept.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The supraorbital margin sits immediately above the orbit in norma frontalis

## id
CON-MSK-8A42DB0089F46C

## canonical_key
anatomy.skull.supraorbital-margin

## aliases
Superciliary arch region

## arabic_label


## arabic_aliases


## definition
Viewed from the front (norma frontalis), the bony rim directly above each orbit is the supraorbital margin, formed by the frontal bone and carrying the supraorbital notch or foramen that transmits the supraorbital nerve and vessels. The infraorbital margin lies below the orbit instead (formed mainly by the maxilla, with zygomatic contribution), and the frontal eminence and zygomatic process are separate landmarks elsewhere on the skull, not the rim of the orbit itself.

## explicit_objective
Locate the supraorbital margin as the bony rim directly above the orbit, and distinguish it from the infraorbital margin and other nearby frontal-bone landmarks.

## pitfalls
Confusing "above the orbit" with the frontal bone's eminence, which is a rounded prominence higher up on the forehead rather than the sharp orbital rim itself, or with the infraorbital margin, which is the corresponding rim below the orbit.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skeletal system: skull

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-SKULL-OSTEOLOGY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.35

## exam_weight_by_year
SCU_Y1=0.35

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Osteology of the Skull

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q18 | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What structure is located immediately above the orbit when viewed in norma frontalis? ... Supraorbital margin" (FOMSCU past exams 2026 final, Q18)

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
sourceCandidateIds: Searched for "supraorbital margin" and "above the orbit". No existing record states this landmark.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The palatine crest separates the greater and lesser palatine foramina

## id
CON-MSK-2F3F55341C91C0

## canonical_key
anatomy.skull.palatine-crest-and-palatine-foramina

## aliases
Crista palatina

## arabic_label


## arabic_aliases


## definition
On the bony hard palate, the greater palatine foramen (transmitting the greater palatine nerve and vessels) and the lesser palatine foramen (transmitting the lesser palatine nerve and vessels) sit close together at the posterolateral corner of the palate. The palatine crest, a bony ridge, is the landmark that separates the two foramina from each other. Other nearby landmarks — the posterior nasal spine, the maxillary tuberosity and the incisive foramen — sit elsewhere on the palate and are not what divides these two specific foramina.

## explicit_objective
Name the palatine crest as the bony ridge separating the greater and lesser palatine foramina, distinguishing it from the posterior nasal spine, maxillary tuberosity and incisive foramen.

## pitfalls
Reaching for the incisive foramen by association with "another palatal foramen" — the incisive foramen sits anteriorly in the midline (transmitting the nasopalatine nerve) and has no role in separating the greater and lesser palatine foramina, which are posterolateral structures.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skeletal system: skull

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-SKULL-OSTEOLOGY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.3

## exam_weight_by_year
SCU_Y1=0.3

## clinical_relevance
0.15

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Osteology of the Skull

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q19 | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What anatomical landmark separates the greater palatine foramen from the lesser palatine foramen? ... Palatine crest" (FOMSCU past exams 2026 final, Q19)

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
sourceCandidateIds: Searched for "palatine crest" and "palatine foramen". No existing record states this landmark.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The sphenoid bone carries foramen rotundum, ovale and spinosum, but not lacerum

## id
CON-MSK-C71615E94A4BB1

## canonical_key
anatomy.sphenoid.foramina-rotundum-ovale-spinosum

## aliases
Foramen rotundum
Foramen ovale (skull base)
Foramen spinosum

## arabic_label


## arabic_aliases


## definition
The greater wing of the sphenoid bone is pierced by three named foramina: foramen rotundum (transmitting the maxillary nerve, CN V2), foramen ovale (the mandibular nerve, CN V3) and foramen spinosum (the middle meningeal vessels). Foramen lacerum, by contrast, is not a true foramen within the sphenoid itself — it forms at the junction between the sphenoid, temporal and occipital bones and is largely filled with cartilage in life, transmitting little of functional significance.

## explicit_objective
Name the three foramina genuinely sited within the sphenoid bone (rotundum, ovale, spinosum), and exclude foramen lacerum, which forms at a suture between three bones rather than within the sphenoid alone.

## pitfalls
Including foramen lacerum on the list because it is commonly taught alongside the other skull-base foramina — it sits at the junction of the sphenoid, temporal and occipital bones, not within the body of the sphenoid, and is not one of the sphenoid's own three foramina.

## concept_type
classification

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skeletal system: skull

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-SKULL-OSTEOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-B8110D7EAE8CAF | CON-MSK-0515C12ACB2EAB | CON-MSK-0ADEF17376F0FD

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Osteology of the Skull

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q20 | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following foramina exist within the sphenoid bone structure? ... Foramen rotundum ovale and spinosum" (FOMSCU past exams 2026 final, Q20)

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
sourceCandidateIds: Searched for "foramen rotundum", "foramen ovale" and "foramen spinosum". The only "foramen ovale" hits found were the CARDIAC interatrial-septum sense of the term (Kasr 104-CPS-anatomy-concepts.md, embryological right-to-left shunt) — a homonym collision, not this cranial-base fact.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: See above — the only "foramen ovale" hits in the corpus are the cardiac interatrial-septum sense of the term, a homonym, not a duplicate of this cranial-base fact.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The superior orbital fissure passes between the greater and lesser wings of the sphenoid

## id
CON-MSK-B8110D7EAE8CAF

## canonical_key
anatomy.sphenoid.superior-orbital-fissure-contents

## aliases
Superior orbital fissure

## arabic_label


## arabic_aliases


## definition
The superior orbital fissure is the gap between the greater and lesser wings of the sphenoid bone, opening into the back of the orbit; it transmits the nerves supplying eye movement and sensation (oculomotor, trochlear, ophthalmic division of the trigeminal, and abducens) along with the superior ophthalmic vein. This is distinct from the inferior orbital fissure (between the greater wing of the sphenoid and the maxilla, connecting the orbit to the infratemporal and pterygopalatine fossae) and the optic canal (which carries only the optic nerve and ophthalmic artery, more medially).

## explicit_objective
Locate the superior orbital fissure between the greater and lesser wings of the sphenoid, and distinguish it from the inferior orbital fissure and the optic canal.

## pitfalls
Confusing the superior orbital fissure with the optic canal because both are sphenoid openings into the orbit carrying nerves for vision and eye movement — the optic canal is a separate, more medial opening carrying only the optic nerve and ophthalmic artery, not the fissure between the two wings.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skeletal system: skull

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-SKULL-OSTEOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-C71615E94A4BB1 | CON-MSK-0515C12ACB2EAB

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Osteology of the Skull

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative Q44 (also 2022 Q24) | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which anatomical structure passes exactly between the greater and the lesser wings of the sphenoid bone? ... Superior orbital fissure" (FOMSCU past exams 2021 Q44, repeated 2022 Q24)

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
sourceCandidateIds: Searched for "superior orbital fissure" and "sphenoid wings". No existing record states this specific fact.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The infratemporal fossa connects to the orbit through the inferior orbital fissure

## id
CON-MSK-0515C12ACB2EAB

## canonical_key
anatomy.skull.inferior-orbital-fissure-infratemporal-connection

## aliases
Inferior orbital fissure

## arabic_label


## arabic_aliases


## definition
The inferior orbital fissure lies between the greater wing of the sphenoid and the maxilla, at the junction of the floor and lateral wall of the orbit. It is the direct bony connection between the orbit and the infratemporal fossa (and, more posteriorly, the pterygopalatine fossa), transmitting the infraorbital and zygomatic nerves and vessels. The superior orbital fissure, by contrast, connects the orbit to the middle cranial fossa, not to the infratemporal fossa.

## explicit_objective
Name the inferior orbital fissure as the opening connecting the orbit to the infratemporal fossa, and distinguish it from the superior orbital fissure, which opens into the cranial cavity instead.

## pitfalls
Choosing the superior orbital fissure because both fissures sound similar and both open into the orbit — only the inferior orbital fissure leads down and out into the infratemporal fossa; the superior orbital fissure leads back into the middle cranial fossa.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skeletal system: skull

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-SKULL-OSTEOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-B8110D7EAE8CAF | CON-MSK-0ADEF17376F0FD

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Osteology of the Skull

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative Q4 (also Formative 2023 Q4) | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Through which of the following bony openings is the infratemporal fossa directly connected to the orbit? ... Inferior orbital fissure" (FOMSCU past exams 2021 Q4, repeated Formative 2023 Q4)

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
sourceCandidateIds: Searched for "infratemporal fossa" and "inferior orbital fissure". No existing record states this fact.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The temporal fascia attaches to the superior temporal line of the skull

## id
CON-MSK-246D9AD62C4CD7

## canonical_key
anatomy.skull.temporal-fascia-attachment

## aliases
Fascia temporalis

## arabic_label


## arabic_aliases


## definition
The temporalis muscle occupies the temporal fossa and is covered by a tough sheet of deep fascia, the temporal fascia, which attaches above to the superior temporal line and splits into two layers near the zygomatic arch. The temporalis muscle itself attaches lower down, at the inferior temporal line, so the fascia and the muscle it covers take origin at two different lines on the same bone.

## explicit_objective
State that the temporal fascia — not the temporalis muscle itself — attaches to the superior temporal line, and that the muscle attaches at the inferior temporal line below it.

## pitfalls
Attributing the superior temporal line attachment to the temporalis muscle rather than its covering fascia — the two structures attach at different lines only a short distance apart, and the question specifically isolates the fascia's own attachment.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skeletal system: skull

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-SKULL-OSTEOLOGY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.3

## exam_weight_by_year
SCU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Osteology of the Skull

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative Q2 (also Formative 2023 Q2) | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following anatomical structures is specifically attached to the superior temporal line of the skull? ... Temporal fascia" (FOMSCU past exams 2021 Q2, repeated Formative 2023 Q2)

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
sourceCandidateIds: Searched for "temporal fascia" and "superior temporal line". No existing record states this fact.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The maxillary nerve is a main content of the pterygopalatine fossa

## id
CON-MSK-0ADEF17376F0FD

## canonical_key
anatomy.pterygopalatine-fossa.maxillary-nerve-content

## aliases
CN V2

## arabic_label


## arabic_aliases


## definition
The maxillary nerve (the second, purely sensory division of the trigeminal nerve, CN V2) crosses the pterygopalatine fossa on its way from the trigeminal ganglion to the face, entering the fossa through foramen rotundum and leaving it through the inferior orbital fissure. It gives off its major sensory branches to the face and upper teeth from within the fossa, making it one of the fossa's principal contents, alongside the pterygopalatine ganglion and the terminal part of the maxillary artery. The mandibular nerve, optic nerve and vagus nerve named as distractors do not pass through this fossa.

## explicit_objective
Name the maxillary nerve as a main content of the pterygopalatine fossa, entering via foramen rotundum, and exclude the mandibular, optic and vagus nerves, which take different routes.

## pitfalls
Substituting the mandibular nerve because both are trigeminal divisions — the mandibular nerve (CN V3) passes through foramen ovale into the infratemporal fossa, not through the pterygopalatine fossa, which belongs specifically to the maxillary division.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skeletal system: skull

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-SKULL-OSTEOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-C71615E94A4BB1

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Osteology of the Skull

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative Q47 (also 2022 Q27) | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following important nerves is one of the main contents found within the pterygopalatine fossa? ... Maxillary nerve" (FOMSCU past exams 2021 Q47, repeated 2022 Q27)

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
sourceCandidateIds: Searched for "maxillary nerve" and "pterygopalatine fossa". No existing record states this fact.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The knee joint is classified as a modified hinge joint

## id
CON-MSK-B66C026C865EE7

## canonical_key
anatomy.knee.modified-hinge-classification

## aliases
Ginglymus (modified)

## arabic_label


## arabic_aliases


## definition
By movement type, the knee is classed as a modified hinge (ginglymus) joint: it mainly performs flexion and extension, like a pure hinge such as the elbow, but permits a small amount of rotation as well, which a pure hinge does not. This sets it apart from the shoulder and hip (ball-and-socket joints, free movement in all planes) and from the pivot joint between the first two cervical vertebrae (rotation only).

## explicit_objective
Classify the knee as a modified hinge joint — flexion/extension with a small added rotary component — and distinguish it from a pure hinge, a ball-and-socket joint, and a pivot joint.

## pitfalls
Calling the knee a simple/pure hinge because flexion and extension dominate its movement — the small rotary component available once the knee is flexed (used in "unlocking" the joint) is exactly what makes it a modified rather than a pure hinge.

## concept_type
classification

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Joints and their classification

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-JOINTS-TERMINOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-78F63BBD89AAE1

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Joints

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOM Mid Q8 | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"How is the knee joint anatomically classified based on its movement type? ... Modified hinge" (FOMSCU past exams 2026 MID, Q8)

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
sourceCandidateIds: Searched for "modified hinge" and "knee joint". The hits found (Kasr 103-BMS-anatomy-concepts.md, AU-MED-105-anatomy-concepts.md) are detailed ligament/meniscus/movement-mechanism concepts, not this basic movement-classification fact — not duplicates.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: See above — the existing knee-joint records cover ligaments and locking/unlocking mechanism in much finer detail, not this basic classification fact.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The hip bone forms the pelvic girdle

## id
CON-MSK-C13E91A6C14613

## canonical_key
anatomy.pelvis.hip-bone-forms-pelvic-girdle

## aliases
Os coxae
Innominate bone

## arabic_label


## arabic_aliases


## definition
The hip bone (os coxae), formed by the fusion of the ilium, ischium and pubis, is the bone that forms the pelvic girdle — the ring of bone linking the lower limb to the axial skeleton, together with the sacrum behind. The femur is a bone of the lower limb itself rather than the girdle that attaches it, and the sacrum and lumbar vertebrae are part of the vertebral column, not the girdle.

## explicit_objective
Name the hip bone as the bone that forms the pelvic girdle, and distinguish the girdle (which attaches the limb to the trunk) from the limb bone (femur) and the vertebral column (sacrum, lumbar vertebrae).

## pitfalls
Choosing the sacrum because it sits inside the bony pelvis and joins the two hip bones at the sacroiliac joints — the sacrum is part of the vertebral (axial) skeleton, while the pelvic girdle proper is the paired hip bones of the appendicular skeleton.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skeletal system: pelvis and lower limb

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-JOINTS-TERMINOLOGY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.35

## exam_weight_by_year
SCU_Y1=0.35

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Osteology

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOM Mid Q3 | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following bones forms the pelvic girdle? ... The hip bone" (FOMSCU past exams 2026 MID, Q3)

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
sourceCandidateIds: Searched for "pelvic girdle" and "hip bone". The only hit (AU-MED-102-anatomy-owed-questions.md) discusses the axial-versus-appendicular skeleton classification generally, not this specific fact about which bone forms the girdle — not a duplicate.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Posterolateral describes a position both behind and to the side of the midline

## id
CON-MSK-FBEAFF9582394D

## canonical_key
anatomy.terminology.posterolateral-position

## aliases
Posteriolateral

## arabic_label


## arabic_aliases


## definition
Anatomical position terms combine a front/back axis (anterior/posterior) with a side axis (medial/lateral). Posterolateral names a position that is both posterior (behind) and lateral (away from the midline) — the opposite combination to anteromedial, and distinct from the two mixed forms anterolateral (in front and to the side) and posteromedial (behind and toward the midline).

## explicit_objective
Combine the anterior/posterior and medial/lateral axes correctly to define "posterolateral", and distinguish it from anteromedial, anterolateral and posteromedial.

## pitfalls
Treating the four compound position terms as interchangeable because they share the same two root words — each names a specific combination of the two independent axes, and swapping either half of the word (anterior for posterior, or medial for lateral) names a different position entirely.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Anatomical position and terminology

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-JOINTS-TERMINOLOGY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.3

## exam_weight_by_year
SCU_Y1=0.3

## clinical_relevance
0.15

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Anatomical Terminology

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q4 | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following terms correctly describes a position that is both below and outside of the body midline? ... Posteriolateral" (FOMSCU past exams 2026 final, Q4; the source stem's "below" is read as the paper's own loose phrasing for "behind" — the four options it offers are all antero-/postero- combined with medial/lateral, none involving superior/inferior, so "posterolateral" is the only internally consistent reading of the printed key)

## merge_ids


## rejected_merge_candidate_ids


## conflicts
The source stem says "both below and outside of the body midline", which literally names inferior + lateral, yet all four answer options are antero-/postero- × medial/lateral combinations with no superior/inferior option at all. This concept follows the printed key (Posteriolateral) and reads the stem's "below" as loose phrasing for "behind", consistent with the option set actually offered; the discrepancy is recorded here rather than silently corrected.

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
sourceCandidateIds: Searched for "posterolateral" and "posteriolateral". The hits found (AU-MED-105-anatomy-concepts.md leg dermatomes, Kasr 104-CPS-anatomy-concepts.md chest-wall lymph drainage) use the word descriptively within unrelated facts, never as a definition of the term itself — not duplicates.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Triceps brachii acts as the antagonist during elbow flexion

## id
CON-MSK-5EA8A1155CBD94

## canonical_key
anatomy.elbow.triceps-as-antagonist-in-flexion

## aliases
Agonist-antagonist muscle pair

## arabic_label


## arabic_aliases


## definition
In a simple movement, the agonist (prime mover) actively shortens to produce it while the antagonist relaxes and lengthens to allow it, then reverses roles for the opposite movement. At the elbow, biceps brachii and brachialis are the prime movers of flexion, so triceps brachii — the elbow's own extensor — is the antagonist during flexion; during elbow extension the roles swap, and triceps becomes the agonist while biceps and brachialis relax as antagonists.

## explicit_objective
Identify triceps brachii as the antagonist (not the agonist) during elbow flexion, and state that the agonist/antagonist roles reverse for the opposite movement.

## pitfalls
Assuming "antagonist" means a muscle that resists or fights against a movement in some active sense — an antagonist simply relaxes and lengthens to permit the agonist's action; triceps is not working against flexion, it is yielding to it.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Muscle action terminology

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-JOINTS-TERMINOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-8CFED26E6528B0

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.35

## exam_weight_by_year
SCU_Y1=0.35

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Muscular System

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOM Mid Q18 | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The triceps muscle acts as an antagonist during which of the following specific joint movements? ... Elbow flexion" (FOMSCU past exams 2026 MID, Q18)

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
sourceCandidateIds: Searched for "triceps" and "antagonist". Every triceps hit found (Kasr 101-ISK-mcq-concepts.md, AU-MED-105-anatomy-concepts.md) covers gross-anatomy detail — heads, origins, nerve supply, intermuscular spaces — never this basic agonist/antagonist terminology fact.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: See above — every existing "triceps" record is detailed gross anatomy (origins, heads, nerve supply), never this basic agonist/antagonist fact.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Flexion is the movement that decreases the angle between two body segments

## id
CON-MSK-8CFED26E6528B0

## canonical_key
anatomy.terminology.flexion-definition

## aliases
Bending a joint

## arabic_label


## arabic_aliases


## definition
Flexion is the movement that decreases the angle between two articulating body segments — bending the elbow, for instance, brings the forearm closer to the angle it makes with the arm. Extension is its opposite, increasing that angle back out. Abduction and adduction describe a different pair of movements entirely, moving a limb away from or toward the body's midline rather than changing the angle at a single joint.

## explicit_objective
Define flexion as the movement decreasing the angle between two articulating segments, and distinguish it from extension (the opposite movement) and from abduction/adduction (movement relative to the midline, not joint angle).

## pitfalls
Confusing flexion/extension (which change the angle at a joint) with abduction/adduction (which move a limb toward or away from the midline) — the four terms describe two separate, independent pairs of movement, not four points on one scale.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Anatomical position and terminology

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-JOINTS-TERMINOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-5EA8A1155CBD94

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
0.85

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Anatomical Terminology

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOM Mid Q5 (also EOY Final Q2) | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following movements decreases the angle between two articulating body segments? ... Flexion" (FOMSCU past exams 2026 MID, Q5); "Which movement involves bending the joint to decrease the angle between two body surfaces? ... Flexion" (FOMSCU past exams 2026 final, Q2)

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
sourceCandidateIds: Searched for "flexion" as a defined term and "decreases the angle". The only hits found are question-file answer options naming "Flexion" as an answer to an unrelated wrist/elbow question, never a concept defining the term itself — matches lane 2's own conclusion that no generic movement-terminology concept exists in the corpus.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: This is one of lane 2's own four deferred candidates (per LANE-CARD.md §"Cluster: S2 minting" and pending-live/SCU-FBS102-questions-batch2.md's own header note) — two FOMSCU papers ask essentially the same definitional question, and no generic flexion-terminology concept exists anywhere in the corpus to overlay.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The cerebellum is mainly responsible for balance and coordination

## id
CON-NEU-28024BBAF8753A

## canonical_key
anatomy.cerebellum.balance-and-coordination

## aliases
Cerebellar function

## arabic_label


## arabic_aliases


## definition
The cerebellum sits below the occipital lobes of the cerebrum and is mainly responsible for balance and the coordination of voluntary muscle movement, refining motor commands generated elsewhere in the brain rather than initiating them. This is distinct from the occipital lobe (vision), the frontal lobe (speech production, among other functions) and the temporal lobe (smell, among other functions) offered as distractors.

## explicit_objective
State that the cerebellum's main function is balance and motor coordination, and distinguish it from the visual, speech and olfactory functions localised to the occipital, frontal and temporal lobes respectively.

## pitfalls
Assigning a sensory function (vision, smell) to the cerebellum by confusing it with a cerebral lobe — the cerebellum is a separate structure below the cerebrum, dedicated to motor coordination and balance rather than any primary sensory modality.

## concept_type
definition

## status
under review

## subject
neuro

## topic
Anatomy

## subtopic
Central nervous system: brain overview

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-AUTONOMIC-CEREBELLUM

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
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Central Nervous System

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q16 | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The cerebellum in the human brain is mainly responsible for which specific function? ... Balance and coordination" (FOMSCU past exams 2026 final, Q16)

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
sourceCandidateIds: Searched for "cerebellum" and "balance and coordination". The only hit (Kasr 103-BMS-histology-concepts.md) mentions the cerebellum only in a field_note about a rejected merge candidate for an unrelated Purkinje-fibre/cardiac-conduction concept — not a duplicate.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: See above — the only hit is a field_note mentioning cerebellar Purkinje cells for an unrelated cardiac-conduction concept, not a duplicate of this function fact.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Sympathetic nerves originate from the thoracic and upper lumbar spinal cord segments

## id
CON-NEU-2989BC9984B366

## canonical_key
anatomy.ans.sympathetic-thoracolumbar-outflow-origin

## aliases
Thoracolumbar outflow

## arabic_label


## arabic_aliases


## definition
The autonomic nervous system's two divisions leave the central nervous system from different levels. Sympathetic (thoracolumbar) outflow arises from preganglionic neurons in the lateral horn of the spinal cord grey matter across the thoracic and upper two lumbar segments (roughly T1-L2). Parasympathetic (craniosacral) outflow, by contrast, leaves from cranial nerve nuclei in the brainstem and from the second to fourth sacral spinal segments — the two divisions never share an outflow level.

## explicit_objective
State that sympathetic (thoracolumbar) outflow arises from the thoracic and upper lumbar cord segments, and contrast it with parasympathetic (craniosacral) outflow from the brainstem and sacral cord.

## pitfalls
Swapping the two divisions' outflow levels — sympathetic is thoracolumbar (T1-L2) and parasympathetic is craniosacral (brainstem plus S2-S4); confusing "thoracic and lumbar" for the parasympathetic division reverses the entire autonomic outflow scheme.

## concept_type
definition

## status
under review

## subject
neuro

## topic
Anatomy

## subtopic
Autonomic nervous system

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-AUTONOMIC-CEREBELLUM

## related_article_ids


## related_concept_ids
CON-MSK-59F41C4BAF6181

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Central Nervous System

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative Q7 (also Formative 2023 Q7) | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"From which specific regions of the central nervous system do the sympathetic nerves originally emerge? ... Thoracic and lumbar regions" (FOMSCU past exams 2021 Q7, repeated Formative 2023 Q7)

## merge_ids


## rejected_merge_candidate_ids
CON-MSK-59F41C4BAF6181

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
sourceCandidateIds: Searched for "sympathetic" and "thoracolumbar". One related hit (Kasr 101-ISK-mcq-concepts.md, CON-MSK-59F41C4BAF6181) states in passing, within a much broader spinal-cord segment-count concept, that the lateral horn holds "sympathetic nuclei in the thoracic and upper two lumbar segments" — genuinely on-topic, but that concept's own explicit_objective is "give the number of spinal cord segments region by region", not the autonomic-outflow fact this question isolates. Recorded as related rather than merged; see rejected_merge_candidate_ids.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
rejectedMergeCandidateIds: CON-MSK-59F41C4BAF6181 ("The spinal cord is 31 segments...around an H of grey matter") mentions sympathetic-nuclei location as one clause inside a definition whose own explicit_objective is segment counting, not autonomic outflow — the FOMSCU question isolates the outflow-origin fact as its own teaching point, so a new, narrowly-scoped concept was minted rather than overlaying a record whose stated objective is something else.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The sternum directly protects the heart

## id
CON-CVS-BC96A4B3426085

## canonical_key
anatomy.sternum.protects-the-heart

## aliases
Breastbone

## arabic_label


## arabic_aliases


## definition
The sternum lies in the midline of the anterior thoracic wall, directly in front of the heart and great vessels, and together with the rib cage forms the bony shield that protects the heart from anterior blunt trauma. The brain is protected by the cranium, the spinal cord by the vertebral column, and the liver mainly by the lower ribs — each major organ has its own named bony guard, and the sternum's is the heart.

## explicit_objective
State that the sternum directly protects the heart, and place it correctly against the other named organ-protecting bones (cranium/brain, vertebral column/spinal cord, lower ribs/liver).

## pitfalls
Assigning the sternum's protective role to the brain by association with "the most protected organ" — the brain's dedicated bony guard is the cranium; the sternum's is the heart, sitting directly behind it in the chest.

## concept_type
definition

## status
under review

## subject
cvs

## topic
Anatomy

## subtopic
Thoracic wall and mediastinum

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-THORAX-HEART

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.35

## exam_weight_by_year
SCU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.75

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Thorax

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q6 | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following major organs is directly protected by the sternum? ... The human heart" (FOMSCU past exams 2026 final, Q6)

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
sourceCandidateIds: Searched for "sternum protects" and "heart protected". No existing record states this specific organ-guard pairing; "sternum" alone returns many unrelated muscle-attachment and gross-anatomy hits across several modules, none stating this fact.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The hepatic portal circulation is the pathway with two sequential capillary beds

## id
CON-GIT-4B253B4F700C58

## canonical_key
anatomy.portal-circulation.two-capillary-beds-gut-to-liver

## aliases
Hepatic portal system
Portal circulation

## arabic_label


## arabic_aliases


## definition
Most circulatory routes run capillary bed to heart to capillary bed. The hepatic portal circulation is the exception: blood leaves capillary beds in the stomach, intestines, pancreas and spleen, collects into the portal vein, and passes through a SECOND capillary-like bed (the hepatic sinusoids) inside the liver before finally draining into the hepatic veins and the systemic circulation — two capillary beds in series, with no pass through the heart in between, letting the liver process absorbed nutrients before they reach general circulation.

## explicit_objective
Name the hepatic portal circulation as the pathway with two sequential capillary beds (gut/spleen capillaries, then hepatic sinusoids), and explain why this lets the liver process blood before it reaches the systemic circulation.

## pitfalls
Picking the pulmonary circulation because it also involves the lungs and a distinct vascular bed — the pulmonary circulation is a single capillary bed between two chambers of the heart (right ventricle to left atrium), not two beds in series without an intervening pass through the heart, which is the hepatic portal system's defining feature.

## concept_type
mechanism

## status
under review

## subject
gi

## topic
Anatomy

## subtopic
Abdominal viscera and circulation

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-ANA-ABDOMEN-PORTAL

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
0.4

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Abdomen

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative Q63 (also 2022 Q43) | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The specific circulatory pathway that is well known to contain exactly two sequential capillary beds is the circulation located between which organs? ... Digestive organs [and the] liver" (FOMSCU past exams 2021 Q63, repeated 2022 Q43)

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
sourceCandidateIds: Searched for "hepatic portal" and "two capillary beds". No existing record states this fact.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The main physiological function of epithelial tissue is absorption and secretion

## id
CON-FND-D7C621EDE0FC46

## canonical_key
histology.epithelium.absorption-and-secretion-function

## aliases
Epithelial tissue function

## arabic_label


## arabic_aliases


## definition
Of the four basic tissue types, epithelium's defining physiological job is absorption and secretion — lining surfaces and cavities and lining or forming glands to move substances across a barrier in either direction, as in intestinal absorption or glandular secretion. Contraction and movement belong to muscle tissue, protection and mechanical support to connective tissue, and conducting electrical impulses to nervous tissue; each of the four basic tissue types has its own defining physiological role.

## explicit_objective
Name absorption and secretion as epithelium's main physiological function, and match the other three basic tissue types (muscle, connective, nervous) to their own defining roles.

## pitfalls
Assigning "protection" as epithelium's chief function because it is the first role usually taught for surface epithelium — protection is a real but secondary role; the functional role this fact isolates, shared by both surface and glandular epithelium, is absorption and secretion.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Histology

## subtopic
Basic tissue types

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-HIST-CELL-TISSUE-BASICS

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
0.85

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Histology > Epithelial Tissue

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q26 | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the main physiological function of epithelial tissue? ... Absorption and secretion" (FOMSCU past exams 2026 final, Q26)

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
sourceCandidateIds: Searched for "epithelial tissue" and "absorption and secretion". Extensive detailed Kasr 101-ISK epithelium records exist (junction types, gland classification, neuro-epithelium), but none states this basic overview fact as its own teaching point — not a duplicate.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: See above — Kasr's 101-ISK epithelium records cover junctions and gland classification in fine detail, never this basic four-tissue-type overview fact.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Continuous capillaries with narrow intercellular clefts are typical of lung and adipose tissue

## id
CON-FND-FFB55EEEDBE376

## canonical_key
histology.capillary.continuous-type-sites-lung-and-adipose

## aliases
Somatic capillaries

## arabic_label


## arabic_aliases


## definition
Continuous (somatic) capillaries have an unbroken endothelium with only narrow intercellular clefts between adjacent cells, built for tissue where solutes cross gradually rather than in bulk; lung and adipose tissue (along with muscle and skin) are classic examples. This is the opposite end of the spectrum from sinusoidal capillaries in the liver and spleen, which have wide open gaps and a discontinuous basement membrane for whole-cell and plasma-protein traffic, and from the fenestrated capillaries of the renal glomeruli and endocrine glands, which have pores covered by diaphragms for fast fluid filtration.

## explicit_objective
Name lung and adipose tissue as classic sites of continuous capillaries with narrow intercellular clefts, and distinguish this type from the sinusoidal capillaries of the liver/spleen and the fenestrated capillaries of the glomeruli/endocrine glands.

## pitfalls
Choosing the liver and spleen because "capillary type by organ" questions often default to that pairing — the liver and spleen are the classic SINUSOIDAL example, the structural opposite of the sealed continuous capillary this question asks about.

## concept_type
classification

## status
under review

## subject
fnd

## topic
Histology

## subtopic
Vascular histology

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-HIST-CELL-TISSUE-BASICS

## related_article_ids


## related_concept_ids
CON-CVS-E1894F649030DE

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.35

## exam_weight_by_year
SCU_Y1=0.35

## clinical_relevance
0.25

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Histology > Connective and Vascular Tissue

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative Q18 (also Formative 2023 Q18) | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Continuous capillaries characterized by having narrow intercellular clefts are typically found in which of the following tissues? ... Lung and adipose tissue" (FOMSCU past exams 2021 Q18, repeated Formative 2023 Q18)

## merge_ids


## rejected_merge_candidate_ids
CON-CVS-E1894F649030DE

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
sourceCandidateIds: Searched for "continuous capillar". One related hit, Kasr 104-CPS-mcq-concepts.md (CON-CVS-E1894F649030DE), contrasts continuous versus sinusoidal capillary STRUCTURE and gives liver/spleen/bone marrow as the SINUSOIDAL site example, but never names lung or adipose tissue as the continuous-type site this question tests — recorded as related, not merged.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
rejectedMergeCandidateIds: CON-CVS-E1894F649030DE ("A continuous (somatic) capillary is a sealed tube...") states the continuous-versus-sinusoidal structural contrast and gives liver/spleen/bone marrow as its own worked site example — for the SINUSOIDAL type, not the continuous type this FOMSCU question names a site for. A new, narrowly-scoped concept was minted for the specific continuous-capillary site fact rather than overlaying a record that does not state it.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Presence of extracellular matrix is a defining feature of connective tissue

## id
CON-FND-BCC7B2E4FDB202

## canonical_key
histology.connective-tissue.extracellular-matrix-as-defining-feature

## aliases
ECM
Ground substance and fibres

## arabic_label


## arabic_aliases


## definition
Connective tissue is defined by having relatively few cells widely separated by an abundant extracellular matrix (ground substance plus fibres) that they themselves secrete — the opposite arrangement from epithelium, whose cells sit closely packed with minimal matrix between them, resting on a basement membrane and typically avascular. The presence of a large extracellular matrix compartment, rather than close cell packing, absence of blood vessels, or resting on a basement membrane (all epithelial features), is what characterises connective tissue.

## explicit_objective
Name an abundant extracellular matrix as connective tissue's defining feature, and contrast it with the closely packed, avascular, basement-membrane-resting arrangement of epithelium.

## pitfalls
Assigning epithelial features (closely packed cells, no blood vessels, resting on a basement membrane) to connective tissue by simply picking whichever distractor sounds like a tissue-classification term — those three features describe epithelium; the feature that actually defines connective tissue is its large extracellular matrix compartment.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Histology

## subtopic
Basic tissue types

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-HIST-CELL-TISSUE-BASICS

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
0.85

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Histology > Connective Tissue

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q32 | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following is considered a main characteristic feature of connective tissue? ... Presence of extracellular matrix" (FOMSCU past exams 2026 final, Q32)

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
sourceCandidateIds: Searched for "extracellular matrix" and "connective tissue" together. Every hit found (collagen biosynthesis, GAG biology, osteoblast ultrastructure across several Kasr/Ain-Shams files) discusses a specific molecular component of the matrix, not this basic classification fact that "having abundant ECM" is what defines connective tissue as a basic tissue type — not a duplicate.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Smooth endoplasmic reticulum regulates intracellular calcium concentration

## id
CON-FND-C38F8E29E9FA1D

## canonical_key
histology.smooth-er.calcium-regulation-function

## aliases
SER calcium storage
Sarcoplasmic reticulum (specialised SER)

## arabic_label


## arabic_aliases


## definition
Smooth endoplasmic reticulum has several functions depending on the cell type — lipid and steroid synthesis, detoxification of drugs and toxins, and, especially prominent in muscle cells (where it is specialised as the sarcoplasmic reticulum), regulating intracellular calcium concentration by sequestering and releasing calcium ions to drive and terminate contraction. Packaging of protein for secretion is the Golgi apparatus's job, digestion of cellular waste is the lysosome's, and ATP production is the mitochondrion's — each organelle named as a distractor has its own distinct role.

## explicit_objective
Name calcium regulation, particularly in muscle, as a primary function of smooth endoplasmic reticulum, and distinguish it from the Golgi apparatus (packaging), lysosome (digestion) and mitochondrion (energy production).

## pitfalls
Assigning protein-packaging to smooth ER by confusing it with the Golgi apparatus, which the smooth ER's own membranes feed into — packaging finished secretory protein is specifically a Golgi function, not one performed by the smooth ER itself.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Histology

## subtopic
Cytoplasmic organelles

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-HIST-CELL-TISSUE-BASICS

## related_article_ids


## related_concept_ids
CON-FND-0B3CC0A79F9150

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.35

## exam_weight_by_year
SCU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Histology > Cytoplasmic Organelles

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q24 | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the primary function of the smooth endoplasmic reticulum in a cell? ... Regulating calcium concentration inside the cell" (FOMSCU past exams 2026 final, Q24)

## merge_ids


## rejected_merge_candidate_ids
CON-FND-0B3CC0A79F9150

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
sourceCandidateIds: Searched for "smooth endoplasmic reticulum". A related hit (Kasr 101-ISK-concepts.md / 101-ISK-mcq-concepts.md, CON-FND-0B3CC0A79F9150) describes smooth ER's light/electron-microscopic appearance and its role in lipid and steroid synthesis, but its own explicit_objective is "describe it on LM and EM and say what it does" in the lipid/steroid sense — it never states the calcium-regulation function this FOMSCU question tests. Recorded as related, not merged.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
rejectedMergeCandidateIds: CON-FND-0B3CC0A79F9150 ("Smooth endoplasmic reticulum is invisible in itself...") is scoped to LM/EM appearance and lipid/steroid synthesis; it never states the calcium-regulation function, so a new, narrowly-scoped concept was minted rather than overlaying a record that does not state the tested fact.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Serous acini are pyramidal cells with a basophilic base and acidophilic apex

## id
CON-FND-4D2D9F6F9DE232

## canonical_key
histology.gland.serous-acini-cell-morphology

## aliases
Serous demilune

## arabic_label


## arabic_aliases


## definition
Serous acinar cells are pyramidal in shape with poorly defined lateral cell boundaries. The basal cytoplasm is basophilic, reflecting the abundant rough endoplasmic reticulum making the protein-rich secretion, while the apical cytoplasm is acidophilic, reflecting the zymogen (secretory) granules stored there before release. Mucous acinar cells, by contrast, have pale (not basophilic/acidophilic-polarised) cytoplasm and sharply defined cell boundaries, which is the usual distractor pairing in this comparison.

## explicit_objective
Describe the serous acinus's pyramidal cells with a basophilic base and acidophilic apex, and contrast this with the pale, sharply-outlined cytoplasm of a mucous acinus.

## pitfalls
Choosing "mucous acini" by simply pairing "gland cell type" with the first plausible-sounding option — mucous acinar cells are described as pale-staining with clear/distinct cell boundaries, the opposite polarity pattern from the serous acinus this question describes.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Histology

## subtopic
Glandular epithelium

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-HIST-CELL-TISSUE-BASICS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.35

## exam_weight_by_year
SCU_Y1=0.35

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Histology > Glandular Epithelium

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final Q29 | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which structure consists of pyramidal cells with ill defined boundaries where the apical part is acidophilic and the basal part is basophilic? ... Serous acini" (FOMSCU past exams 2026 final, Q29)

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
sourceCandidateIds: Searched for "serous acini" and "serous demilune". No existing record states this fact.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Hydrolysis of GTP switches off G protein signalling

## id
CON-FND-FC87EE0F527D55

## canonical_key
biochemistry.g-protein.gtp-hydrolysis-switches-off-signal

## aliases
G protein deactivation
GTPase activity of Gα

## arabic_label


## arabic_aliases


## definition
A G protein-coupled receptor activates its heterotrimeric G protein by prompting the alpha subunit to exchange bound GDP for GTP, which lets alpha dissociate from the beta-gamma pair and activate its downstream target. Signalling switches off when the alpha subunit's own intrinsic GTPase activity hydrolyses that bound GTP back to GDP, allowing alpha to re-associate with beta-gamma and return the complex to its resting state — the same molecule that turns the switch on (GTP loading) is undone by hydrolysing it, not by any of the other steps in the cycle.

## explicit_objective
State that hydrolysis of bound GTP by the alpha subunit's own GTPase activity is what switches off G protein signalling, as the reverse of the GDP-to-GTP exchange that switches it on.

## pitfalls
Picking GDP-to-GTP exchange, subunit dissociation, or direct target activation as the "off" step — each of those is part of turning the G protein ON; only GTP hydrolysis, which regenerates GDP-bound (inactive) alpha, turns it back off.

## concept_type
mechanism

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
Cell signalling mechanisms

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-BIOCHEM-MOLECULAR-BASICS

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
0.3

## academic_relevance
0.85

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Biochemistry > Cell Signalling

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative Q80 (also 2022 Q59) | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In G protein coupled receptors the G protein action is switched off by which one of the following specific biochemical processes? ... Hydrolysis of GTP" (FOMSCU past exams 2021 Q80, repeated 2022 Q59)

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
sourceCandidateIds: Searched for "hydrolysis of GTP" and "G protein" together. No existing record states this specific switch-off mechanism.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Steroid hormones signal through intracellular receptors

## id
CON-FND-DDD7B6BEBE1FA3

## canonical_key
biochemistry.hormone-signaling.steroid-hormones-use-intracellular-receptors

## aliases
Nuclear receptor signalling
Lipid-soluble hormone mechanism

## arabic_label


## arabic_aliases


## definition
Because steroid hormones are lipid-soluble, they cross the plasma membrane freely rather than needing a surface receptor, and bind instead to intracellular receptors in the cytoplasm or nucleus; the hormone-receptor complex then acts directly on gene expression. This contrasts with water-soluble peptide hormones, which cannot cross the membrane and instead use surface-membrane receptors — G protein-coupled receptors or tyrosine kinase receptors — to trigger an intracellular second-messenger cascade.

## explicit_objective
State that steroid (lipid-soluble) hormones signal through intracellular receptors because they cross the membrane freely, and contrast this with peptide hormones, which use surface-membrane receptors instead.

## pitfalls
Assigning a surface-membrane mechanism (G protein-coupled receptor or tyrosine kinase receptor) to steroid hormones by over-generalising "hormones use receptors" without distinguishing lipid solubility — only a hormone that can cross the membrane on its own reaches an intracellular receptor; a water-soluble peptide hormone cannot.

## concept_type
mechanism

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
Cell signalling mechanisms

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-BIOCHEM-MOLECULAR-BASICS

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
0.3

## academic_relevance
0.85

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Biochemistry > Cell Signalling

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative Q50 (also 2022 Q30) | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following intracellular components is primarily involved in the signaling mechanism of steroid hormones? ... Intracellular receptors" (FOMSCU past exams 2021 Q50, repeated 2022 Q30)

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
sourceCandidateIds: Searched for "intracellular receptor" and "steroid hormone" together. Two related hits found: an Assiut concept (AUN-MPT-104-concepts.md) ranking receptor types by TIME SCALE (ionotropic fastest, intracellular slowest), and an Alexandria concept (AU-MED-102-biochem-molecular-concepts.md) comparing intracellular-versus-membrane receptor DOMAIN COUNT — neither states the basic "steroid hormones use intracellular receptors because they are lipid-soluble" mechanism this FOMSCU question tests; not duplicates.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: See above — the two related hits classify receptors by time scale and by domain count respectively, neither stating the lipid-solubility mechanism this question tests.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
An enzymatic reaction's product is the result of the reaction between enzyme and substrate

## id
CON-FND-91E1F17DDDD2B5

## canonical_key
biochemistry.enzyme-kinetics.product-defined-as-reaction-result

## aliases
Enzyme reaction terminology

## arabic_label


## arabic_aliases


## definition
An enzymatic reaction has three basic terms. The substrate is the molecule the enzyme acts upon at the start; the transition state is the brief, high-energy intermediate the substrate passes through mid-reaction; and the product is what the substrate becomes once the enzyme has finished acting on it — the result of the reaction between enzyme and substrate. A cofactor, when one is needed, is a separate helper molecule the enzyme uses, not the product of the reaction itself.

## explicit_objective
Define the product of an enzymatic reaction as the result of the enzyme acting on the substrate, and distinguish it from the substrate itself, the transition state, and any cofactor involved.

## pitfalls
Confusing the product with the transition state because both come "after the substrate" in a loose sense — the transition state is a fleeting, high-energy intermediate mid-reaction, not the final, stable result the reaction produces.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
Enzyme kinetics

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-BIOCHEM-MOLECULAR-BASICS

## related_article_ids


## related_concept_ids
CON-FND-028C50A610B2A2

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.3

## exam_weight_by_year
SCU_Y1=0.3

## clinical_relevance
0.15

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Biochemistry > Enzymes

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOM Mid Q14 | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In an enzymatic reaction how is the product defined? ... Result of reaction between enzyme and substrate" (FOMSCU past exams 2026 MID, Q14)

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
sourceCandidateIds: Searched for "product" and "enzyme substrate" together, and for exact-phrase forms of the definition. No existing record defines the basic vocabulary term "product" for an enzymatic reaction.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
One turn of an alpha helix spans 3.6 amino acid residues

## id
CON-FND-52781380EFEB16

## canonical_key
biochemistry.protein-structure.alpha-helix-3-6-residues-per-turn

## aliases
Alpha helix pitch

## arabic_label


## arabic_aliases


## definition
The alpha helix, one of protein secondary structure's two regular forms, coils the polypeptide backbone with 3.6 amino acid residues per complete turn, stabilised by intra-chain hydrogen bonds between the backbone NH and C=O groups of residues one turn (four positions) apart. This specific numeric pitch — not an integer number of residues — is what gives the helix its regular, repeating hydrogen-bonding pattern along its length.

## explicit_objective
State the alpha helix's characteristic pitch of 3.6 residues per turn, as the specific numeric parameter distinguishing it from other secondary-structure geometries.

## pitfalls
Rounding 3.6 to a whole number of residues, or confusing it with the four-residue spacing between hydrogen-bonded partners along the chain — the pitch itself is a non-integer 3.6 residues per turn, precisely because the helix does not repeat on a whole-residue period.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
Protein structure

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-BIOCHEM-MOLECULAR-BASICS

## related_article_ids


## related_concept_ids
CON-FND-99CEF760A9D2CC

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.3

## exam_weight_by_year
SCU_Y1=0.3

## clinical_relevance
0.1

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Biochemistry > Protein Structure

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative Q82 (also 2022 Q61) | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"How many intact amino acid residues are typically present in exactly one complete turn of an alpha helix structure? ... Three point six" (FOMSCU past exams 2021 Q82, repeated 2022 Q61)

## merge_ids


## rejected_merge_candidate_ids
CON-FND-99CEF760A9D2CC

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
sourceCandidateIds: Searched for "alpha helix" and "3.6 residues". A related hit (Kasr 102-INT-mcq-concepts.md, CON-FND-99CEF760A9D2CC) describes the alpha helix's hydrogen-bonding mechanism, handedness, and which side chains disrupt it, but never states the 3.6-residues-per-turn numeric pitch this FOMSCU question tests — recorded as related, not merged.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
rejectedMergeCandidateIds: CON-FND-99CEF760A9D2CC ("Secondary structure is mainly alpha-helix or beta-pleated sheet...") covers the helix's hydrogen-bonding mechanism and disrupting residues in detail, but never states the 3.6-residue pitch, so a new, narrowly-scoped concept was minted for that specific numeric fact rather than overlaying a record that does not state it.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
A single terminal monosaccharide determines ABO blood group antigen specificity

## id
CON-FND-8AE0C43FCB08FC

## canonical_key
biochemistry.abo-blood-group.terminal-monosaccharide-determines-specificity

## aliases
ABH antigen specificity
H antigen and ABO conversion

## arabic_label


## arabic_aliases


## definition
The ABO blood group antigens are branched oligosaccharide chains attached to red-cell membrane glycolipids and glycoproteins, built from five monosaccharide types (galactose, fucose, N-acetylglucosamine, N-acetylgalactosamine and, at the base, the linking sugar). All three ABO phenotypes share the same core chain terminating in fucose — the H antigen. Blood-group specificity is then set by which SINGLE further monosaccharide, if any, an individual's glycosyltransferase adds onto that H antigen: an extra N-acetylgalactosamine gives the A antigen, an extra galactose gives the B antigen, and no further addition leaves the O (H-only) phenotype. So while the whole antigen is a multi-unit oligosaccharide, it is the identity of one additional terminal monosaccharide that determines which ABO group a person belongs to.

## explicit_objective
State that ABO blood-group specificity is set by a single terminal monosaccharide added onto the shared H-antigen core, and that five monosaccharide types in total build the ABO antigen family.

## pitfalls
Treating "the ABO antigen is an oligosaccharide" and "a monosaccharide determines ABO specificity" as contradictory — they describe two different levels of the same structure: the antigen AS A WHOLE is a multi-sugar oligosaccharide chain, while the single extra sugar a glycosyltransferase adds onto that shared chain is what actually distinguishes A from B from O.

## concept_type
mechanism

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
Carbohydrate biochemistry

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-BIOCHEM-MOLECULAR-BASICS

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
0.4

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Biochemistry > Carbohydrates

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative Q24 and Q3 (also 2022 Q4 and Q3) | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"How many types of sugar molecules are primarily involved in determining the ABO blood group antigens? ... Five sugars / Five monosaccharides" (FOMSCU past exams 2021 Q24, repeated 2022 Q4); "What is the primary type of carbohydrate molecules that determine the ABO blood group antigens on the red blood cell surface? ... Monosaccharides" (FOMSCU past exams 2021 Q3, repeated Formative 2023 Q3)

## merge_ids


## rejected_merge_candidate_ids
CON-FND-4128FE1AD6819C

## conflicts
CON-FND-4128FE1AD6819C classifies the whole ABO antigen as an oligosaccharide (3-10 monosaccharide units) — correct at the level of the complete chain — while this FOMSCU module's two printed keys both name "monosaccharides" as the sugar type that determines antigen specificity. The two are not actually contradictory once the two levels are separated (whole-chain classification versus the single terminal sugar that sets A/B/O specificity), and this concept's own definition states both explicitly so the distinction is visible rather than silently picking a side.

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
sourceCandidateIds: Searched for "ABO blood group" and "monosaccharides" together. The one related hit found (Kasr 102-INT-mcq-concepts.md, CON-FND-4128FE1AD6819C) classifies carbohydrates generally by hydrolysis-unit count and names the ABO blood group substances as an example of an OLIGOSACCHARIDE (3-10 units) — accurate at the whole-chain level, but it directly contradicts the printed key of this FOMSCU pair, which specifically asks what TYPE of sugar molecule determines the antigens' specificity (monosaccharides, per both printed answer keys). Overlaying CON-FND-4128FE1AD6819C would attach a record that reads as disagreeing with the printed key to these two FOMSCU questions, so a new, correctly-scoped concept was minted instead that states both facts together and resolves the apparent conflict (see conflicts field).
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
rejectedMergeCandidateIds: CON-FND-4128FE1AD6819C ("Carbohydrates are classified by their hydrolysis products...") calls the ABO blood-group substances oligosaccharides, contradicting this module's printed key at face value; per LANE-CARD.md §"Cluster: S2 minting", a correctly-scoped concept was minted instead of overlaying the mismatched one, with the apparent conflict named in the conflicts field above rather than silently resolved either way.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
A secondary spermatocyte completes the second meiotic division to form a haploid spermatid

## id
CON-DEV-874A4B94DBF067

## canonical_key
genetics.spermatogenesis.secondary-spermatocyte-second-meiotic-division

## aliases
Meiosis II in spermatogenesis
Spermatid formation

## arabic_label


## arabic_aliases


## definition
Spermatogenesis takes a primary spermatocyte (46 chromosomes, each already duplicated into two sister chromatids, from premeiotic S phase) through the first meiotic division to give two secondary spermatocytes, each with 23 chromosomes still duplicated (23 duplicated chromosomes, or 46 chromatids total). Each secondary spermatocyte then completes the SECOND meiotic division — separating sister chromatids rather than homologous chromosomes, with no further DNA replication beforehand — to give two spermatids, each with a genuinely haploid 23 single chromosomes. The first division is what halves the chromosome NUMBER (reductional); the second is what separates the sister chromatids (equational), and it is specifically this second division that a secondary spermatocyte undergoes to produce a spermatid.

## explicit_objective
State that a secondary spermatocyte produces a haploid spermatid by completing the SECOND meiotic division (separating sister chromatids), not the first, mitosis, or simple binary fission.

## pitfalls
Attributing spermatid formation to the first meiotic division — the first division is what created the secondary spermatocyte itself (from the primary spermatocyte), already halving the chromosome number to 23 (still duplicated); it is the SECOND division, splitting those duplicated chromosomes' sister chromatids, that turns a secondary spermatocyte into a spermatid.

## concept_type
mechanism

## status
under review

## subject
dev

## topic
Genetics

## subtopic
Meiosis and gametogenesis

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GENETICS-MEIOSIS

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
0.85

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Genetics > Meiosis

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative Q6 (also Formative 2023 Q6, EOY Final Q44) | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"By which specific cellular division process does a secondary spermatocyte produce a spermatid with a haploid number of chromosomes? ... Second meiotic division" (FOMSCU past exams 2021 Q6, repeated Formative 2023 Q6); "A secondary spermatocyte typically contains which of the following chromosomal arrangements? ... 23 duplicated chromosome" (FOMSCU past exams 2026 final, Q44)

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
sourceCandidateIds: Searched for "secondary spermatocyte" and "second meiotic division" together. No existing concept anywhere in the corpus states this fact — confirmed by lane 2's own triage (deferred rather than forced onto an unrelated hit) and re-confirmed here.
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: This is one of lane 2's own four deferred candidates (per LANE-CARD.md §"Cluster: S2 minting") — no meiosis-II/spermatid concept exists anywhere in the corpus, confirmed independently by this lane's own find-existing.mjs and grep passes.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
