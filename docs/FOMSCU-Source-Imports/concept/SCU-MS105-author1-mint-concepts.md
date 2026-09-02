<!--
  SCU-MS105 · Musculoskeletal — S3 minting pass, lane 1 (scu-ms105-author1).
  21 concepts genuinely new to the corpus after `find-existing.mjs` on each
  final canonical key plus a `grep -ril` sweep of distinctive terms across
  every `docs/*-Source-Imports/{concept,pending-live}` and
  `docs/import-ready/concept` directory, with the hit body read in full
  (never trusted at the tool's truncated single line). 8 further facts in
  the sibling question seeds reuse existing live/pending concepts instead
  of minting — see `pending-live/SCU-MS105-author1-overlay-concepts.md` for
  the overlay rows and the per-fact match reasoning.

  Ids minted with `mint-concept-id.mjs`, checked against the live snapshot
  and the taken-id scan (13,578 existing ids at mint time); none derived
  for a concept that already exists. `atomic_claim_ids` is `[clear]` on
  every record — this lane is scoped to concept, article and question
  files, mints no evidence claim or citation record, matching the standing
  convention already documented in Kasr's 103-BMS-mcq-lipid-concepts.md and
  this lane's own SCU-FBS103-s2-mint-concepts.md. The evidence chain is
  owed and named in the hand-off report, not concealed.

  `primary_node_id` is left blank with a field_note on every record: the
  canonical DIS-* taxonomy nodes could not be resolved from this worktree
  in the time this lane had. `module_subject` carries FOMSCU's own
  placement instead. Arabic fields are blank with a field_note (LD-15, no
  Arabic reviewer available to this lane).

  Sources: FOMSCU Musculoskeletal own-source exam PDFs, keys and stems read
  directly from `06 EOM Exams/EOM - MSK 2026 - Mid MCQ 10pct.pdf` (native
  text, printed `Correct Answer:`/`Explanation:` per item) and
  `Anatomy/03 Questions and QBank/MCQ - Arm.pdf` (native text, one item per
  odd page, single answer letter on the following even page) — see
  `coverage/SCU-MS105-triage.md`. Every explanation below is written fresh
  from standard textbook fact in the platform's own voice, never copied
  from the source PDF's own short explanation line.
-->

# Item

## label
The profunda brachii artery is the largest branch of the brachial artery

## id
CON-MSK-B1BD54BBB2CAF8

## canonical_key
anatomy.arm.profunda-brachii-origin-brachial-artery

## aliases
Profunda brachii origin
Deep artery of the arm

## arabic_label


## arabic_aliases


## definition
The profunda brachii (deep artery of the arm) is the first and largest branch given off by the brachial artery, arising in the upper part of the arm just below the lower border of teres major. From its origin it runs posteriorly with the radial nerve through the triangular interval into the spiral (radial) groove of the humerus, supplying the triceps brachii and contributing to the arterial anastomosis around the elbow.

## explicit_objective
State that the profunda brachii arises as the largest branch of the brachial artery, distinct from the axillary, radial and ulnar arteries.

## pitfalls
Confusing the profunda brachii's parent vessel (brachial artery) with the axillary artery, which lies proximal to the profunda brachii's own origin.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Arm: arterial supply

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
CON-MSK-0153660881F1ED

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
SCU-MS105 > Anatomy > Upper Limb > Arm: Arterial Supply

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q2 (Anatomy) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The profunda brachii (deep artery of the arm) typically arises as a major branch from which of the following arteries? ... Brachial artery" (FOMSCU Musculoskeletal, EOM MID 2026, Q2)

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
sourceCandidateIds: find-existing.mjs on "profunda brachii" returned a pending 101-ISK concept about the vessel's course into the spiral groove and the elbow anastomosis — a different specific fact (course, not origin/parent-vessel), so this concept is minted fresh rather than reused.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The long head of biceps brachii originates from the supraglenoid tubercle

## id
CON-MSK-67FFFD33715BA8

## canonical_key
anatomy.shoulder.biceps-long-head-supraglenoid-tubercle

## aliases
Biceps brachii long head origin
Supraglenoid tubercle

## arabic_label


## arabic_aliases


## definition
Biceps brachii has two heads with different origins: the long head arises from the supraglenoid tubercle of the scapula, its tendon running intracapsularly through the shoulder joint and along the intertubercular (bicipital) groove of the humerus before joining the muscle belly, while the short head arises from the coracoid process alongside coracobrachialis. This intracapsular course makes the long head tendon a recognised site of tendinopathy and instability, distinct from the short head's simpler extracapsular course.

## explicit_objective
State that the long head of biceps brachii originates from the supraglenoid tubercle, distinguishing it from the short head's coracoid process origin.

## pitfalls
Assigning the coracoid process (the short head's origin) to the long head, or vice versa — the two heads' origins are a classic paired-fact exam trap.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Shoulder: muscle origins

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
CON-MSK-FBC3C5E8D68756

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
SCU-MS105 > Anatomy > Upper Limb > Shoulder: Muscle Origins

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q3 (Anatomy) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the anatomical origin of the long head of the biceps brachii muscle? ... Supraglenoid tubercle of the scapula" (FOMSCU Musculoskeletal, EOM MID 2026, Q3)

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
sourceCandidateIds: find-existing.mjs on "supraglenoid" returned no hits at all — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The posterior wall of the axilla is formed by subscapularis, teres major and latissimus dorsi

## id
CON-MSK-1DF213ABE5E25C

## canonical_key
anatomy.axilla.posterior-wall-subscapularis-teres-major-latissimus

## aliases
Posterior wall of axilla
Subscapularis axillary wall

## arabic_label


## arabic_aliases


## definition
The axilla is a pyramidal space bounded by four muscular walls: the posterior wall is formed by subscapularis (above) together with teres major and latissimus dorsi (below), while the anterior wall is formed by pectoralis major and pectoralis minor, the medial wall by serratus anterior overlying the ribs, and the lateral wall by the intertubercular groove of the humerus. Subscapularis, arising from the subscapular fossa and inserting on the lesser tubercle, is the uppermost and most anterior of the three posterior-wall muscles.

## explicit_objective
State that the posterior wall of the axilla is formed by subscapularis, teres major and latissimus dorsi, distinguishing it from the anterior (pectoral) and medial (serratus anterior) walls.

## pitfalls
Substituting an anterior-wall muscle (pectoralis major or minor) for a posterior-wall one, since both walls are muscular and easily confused without anchoring the specific muscle names to each wall.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Axilla: walls

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
SCU-MS105 > Anatomy > Upper Limb > Axilla: Walls

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q4 (Anatomy) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following muscles participates in forming the posterior wall of the axilla? ... Subscapularis" (FOMSCU Musculoskeletal, EOM MID 2026, Q4)

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
sourceCandidateIds: find-existing.mjs on "subscapularis" returned live/pending rotator-cuff-composition concepts (a different specific fact — the SITS mnemonic for rotator cuff muscles, not the axillary-wall grouping) — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The axillary nerve gives the primary articular branch to the shoulder joint

## id
CON-MSK-8A3969B36918FA

## canonical_key
anatomy.shoulder.axillary-nerve-articular-branch

## aliases
Axillary nerve articular branch
Shoulder joint sensory innervation

## arabic_label


## arabic_aliases


## definition
The axillary nerve, a terminal branch of the posterior cord of the brachial plexus, passes through the quadrangular space closely inferior to the shoulder joint capsule before winding around the surgical neck of the humerus. In this position it gives off the principal articular (sensory) branch supplying the shoulder joint capsule, in addition to its motor supply to deltoid and teres minor and its cutaneous supply to the "regimental badge" area of skin over the deltoid.

## explicit_objective
Identify the axillary nerve as the source of the shoulder joint's primary articular sensory branch, distinct from the other nerves that pass near but do not chiefly supply the joint capsule.

## pitfalls
Selecting the radial or musculocutaneous nerve by association with "nerves near the shoulder", without recalling that the axillary nerve's close proximity to the joint capsule is specifically what gives it the principal articular branch.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Shoulder: joint innervation

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
SCU-MS105 > Anatomy > Upper Limb > Shoulder: Joint Innervation

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q5 (Anatomy) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which nerve provides the primary articular branch to supply the shoulder joint? ... Axillary nerve" (FOMSCU Musculoskeletal, EOM MID 2026, Q5)

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
sourceCandidateIds: find-existing.mjs on "axillary nerve" returned a live 101-ISK concept about cutaneous strip distribution of the arm's skin (radial nerve, medial cord, axillary nerve) — a different specific fact (cutaneous territory, not the articular branch to the joint) — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Sulfated glycosaminoglycans form the bulk of cartilage's organic ground substance

## id
CON-MSK-AA586AA3EC81A7

## canonical_key
histology.cartilage.sulfated-glycosaminoglycans-ground-substance

## aliases
Cartilage ground substance
Chondroitin sulfate in cartilage matrix

## arabic_label


## arabic_aliases


## definition
Cartilage's extracellular matrix is organic ground substance embedded with type II collagen fibres, and the ground substance itself is dominated by sulfated glycosaminoglycans — chiefly chondroitin sulfate and keratan sulfate, bound to a core protein as proteoglycan aggregates. These sulfated GAGs are strongly hydrophilic, drawing in and binding water to give cartilage its characteristic resilience and reversible compressibility under load.

## explicit_objective
State that sulfated glycosaminoglycans are the major organic ground-substance component of cartilage matrix, responsible for its water-binding, shock-absorbing property.

## pitfalls
Selecting type I collagen (the dominant organic component of bone, not cartilage) or calcium hydroxyapatite (the inorganic component of bone) instead of the sulfated GAGs that define cartilage's own ground substance.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Histology

## subtopic
Cartilage: matrix composition

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
ART-SCU-MS105-MSK-TISSUE-PHYSIOLOGY

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
SCU-MS105 > Histology > Cartilage: Matrix Composition

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q1 (Histology) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which component forms a major part of the organic ground substance in the extracellular matrix of cartilage? ... Sulfated glycosaminoglycans" (FOMSCU Musculoskeletal, EOM MID 2026, Q1 Histology)

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
sourceCandidateIds: find-existing.mjs on "sulfated glycosaminoglycans" returned no hits — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
High magnesium levels stabilize acetylcholine vesicles and reduce neuromuscular transmission

## id
CON-MSK-217BABA1A95C6B

## canonical_key
physiology.muscle.magnesium-inhibits-acetylcholine-release-nmj

## aliases
Hypermagnesemia muscle weakness
Magnesium at the neuromuscular junction

## arabic_label


## arabic_aliases


## definition
Magnesium acts physiologically as a calcium antagonist at the presynaptic motor nerve terminal: elevated magnesium stabilizes acetylcholine-containing vesicle membranes and competes with calcium at the voltage-gated channels that trigger vesicle fusion, reducing acetylcholine release into the neuromuscular junction. Clinically, hypermagnesemia therefore presents with skeletal muscle weakness and reduced deep tendon reflexes through this presynaptic inhibition of transmission, distinct from a postsynaptic receptor-blocking mechanism.

## explicit_objective
State that hypermagnesemia causes muscle weakness by stabilizing presynaptic acetylcholine vesicles and reducing their release, not by blocking postsynaptic receptors.

## pitfalls
Attributing hypermagnesemic weakness to postsynaptic receptor blockade (as with a depolarizing or non-depolarizing neuromuscular blocker) rather than the presynaptic vesicle-stabilizing/calcium-antagonist mechanism magnesium actually uses.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Physiology

## subtopic
Neuromuscular junction: presynaptic modulation

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
ART-SCU-MS105-MSK-TISSUE-PHYSIOLOGY

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
SCU-MS105 > Physiology > Neuromuscular Junction

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q3 (Physiology) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 45-year-old female presents with muscle weakness. Lab analysis reveals hypermagnesemia... ... Magnesium stabilizes acetylcholine vesicles, preventing their release" (FOMSCU Musculoskeletal, EOM MID 2026, Q3 Physiology)

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
sourceCandidateIds: find-existing.mjs on "acetylcholine vesicles" returned no hits — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Glucagon stimulates hepatic glycogenolysis via the cAMP pathway

## id
CON-GIT-DEDC4CF3FB848B

## canonical_key
biochemistry.liver.glucagon-stimulates-glycogenolysis

## aliases
Glucagon and liver glycogen breakdown
Hepatic glycogenolysis hormone

## arabic_label


## arabic_aliases


## definition
Glucagon, released from pancreatic alpha cells during fasting, binds hepatic G-protein-coupled receptors and activates the cAMP–protein kinase A cascade, which phosphorylates and activates glycogen phosphorylase to release glucose from stored liver glycogen. This action is liver-specific: skeletal muscle lacks glucagon receptors, so muscle glycogenolysis during exercise is instead driven by epinephrine and local factors (calcium, AMP), not glucagon.

## explicit_objective
State that glucagon accelerates liver glycogenolysis via the cAMP pathway during fasting, and that this action is specific to the liver rather than skeletal muscle.

## pitfalls
Assuming glucagon also drives skeletal-muscle glycogen breakdown — muscle lacks glucagon receptors, so this hormone's glycogenolytic action is confined to the liver.

## concept_type
directly_taught_fact

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
Glycogen metabolism: hormonal control

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
ART-SCU-MS105-METABOLIC-BIOCHEM

## related_article_ids


## related_concept_ids
CON-MSK-961E8A53F37EA3

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
0.7

## weight_confidence
0.5

## module_subject
SCU-MS105 > Biochemistry > Glycogen Metabolism

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q1 (Biochemistry) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which pancreatic hormone directly stimulates the acceleration of glycogen breakdown (glycogenolysis) in the liver during fasting states? ... Glucagon" (FOMSCU Musculoskeletal, EOM MID 2026, Q1 Biochemistry)

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
sourceCandidateIds: find-existing.mjs on "glucagon" returned a live CON-MSK concept about SKELETAL-MUSCLE glycogenolysis specifically stating muscle lacks glucagon receptors, and live CON-GIT concepts about pancreatic alpha cells secreting glucagon — all a different specific fact (source of the hormone / muscle's non-response) from this concept's own claim (the liver's own hormonal glycogenolysis pathway) — minted fresh, related_concept_ids left to point at the sibling ATP-inhibition concept instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
High ATP allosterically inhibits glycogen phosphorylase to halt glycogenolysis

## id
CON-MSK-961E8A53F37EA3

## canonical_key
biochemistry.glycogen.atp-inhibits-glycogen-phosphorylase

## aliases
Glycogen phosphorylase allosteric inhibition
ATP and glycogen breakdown control

## arabic_label


## arabic_aliases


## definition
Glycogen phosphorylase, the rate-limiting enzyme of glycogenolysis, is allosterically regulated by the cell's energy state: high levels of ATP and glucose-6-phosphate signal that energy is abundant and allosterically inhibit the enzyme, turning off further glycogen breakdown. This is the converse of the enzyme's activation during exercise, when rising AMP, calcium and epinephrine signal energy demand and switch phosphorylase on.

## explicit_objective
State that high ATP is an allosteric inhibitor of glycogen phosphorylase, halting glycogenolysis when cellular energy is abundant.

## pitfalls
Selecting high AMP or cAMP as the inhibitor — these are the activating signals (energy deficit/hormonal cascade), the opposite regulatory direction from ATP's inhibitory, energy-sufficiency signal.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Biochemistry

## subtopic
Glycogen metabolism: allosteric control

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
ART-SCU-MS105-METABOLIC-BIOCHEM

## related_article_ids


## related_concept_ids
CON-GIT-DEDC4CF3FB848B

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
SCU-MS105 > Biochemistry > Glycogen Metabolism

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q3 (Biochemistry) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following metabolites acts as an allosteric inhibitor of glycogenolysis? ... High ATP levels" (FOMSCU Musculoskeletal, EOM MID 2026, Q3 Biochemistry)

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
sourceCandidateIds: find-existing.mjs on "glycogen phosphorylase" returned a live CON-MSK concept about sprinting-triggered ACTIVATION by calcium/epinephrine/AMP — a different specific fact (activation, not the ATP-driven inhibition this concept states) — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Trichinellosis is definitively diagnosed by muscle biopsy

## id
CON-INF-BC9DE087A00D43

## canonical_key
parasitology.trichinella.muscle-biopsy-diagnosis

## aliases
Trichinella spiralis diagnosis
Muscle biopsy for trichinellosis

## arabic_label


## arabic_aliases


## definition
Trichinella spiralis larvae, after penetrating the intestinal wall, migrate through the bloodstream and encyst directly inside skeletal muscle fibres — classically the diaphragm, tongue, masseter and extraocular muscles. Because the parasite's diagnostic stage lives inside muscle tissue rather than passing through the gut lumen, stool examination is not useful, and a muscle biopsy demonstrating the encysted larvae is the definitive confirmatory test.

## explicit_objective
State that trichinellosis is confirmed by muscle biopsy demonstrating encysted larvae, not by stool examination.

## pitfalls
Defaulting to stool analysis for ova and parasites as the diagnostic method, the standard approach for intestinal helminths but not for Trichinella, whose diagnostic (encysted larval) stage lives in muscle, not the gut lumen.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Parasitology

## subtopic
Trichinella spiralis: diagnosis

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
ART-SCU-MS105-INFECTION-MSK

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
SCU-MS105 > Parasitology > Trichinella Spiralis

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q1 (Parasitology) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A patient suspected of having trichinelliasis... Which of the following methods is used to definitively confirm this disease? ... Muscle biopsy" (FOMSCU Musculoskeletal, EOM MID 2026, Q1 Parasitology)

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
sourceCandidateIds: find-existing.mjs on "trichinella" returned pending concepts about adult-worm morphology (male vs female identification) — a different specific fact from the diagnostic-stage/muscle-biopsy claim here — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Daptomycin plus ceftaroline is a synergistic combination for VRSA

## id
CON-INF-BA22D63C67B2E5

## canonical_key
pharmacology.vrsa.daptomycin-ceftaroline-synergy

## aliases
VRSA combination therapy
Daptomycin and ceftaroline synergy

## arabic_label


## arabic_aliases


## definition
Vancomycin-resistant Staphylococcus aureus (VRSA) is a severe, difficult-to-treat infection because it has already acquired resistance to the first-line glycopeptide. Ceftaroline, a cephalosporin with high affinity for PBP2a, enhances daptomycin's binding to the bacterial cell membrane, and the two drugs used together produce a synergistic bactericidal effect against VRSA that neither achieves reliably alone.

## explicit_objective
State that daptomycin combined with ceftaroline is a synergistic treatment option for VRSA, distinct from standard single-agent regimens.

## pitfalls
Selecting a standard beta-lactam/beta-lactamase-inhibitor combination (e.g. amoxicillin-clavulanic acid) that has no activity against a vancomycin- and typically methicillin-resistant organism like VRSA.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Pharmacology

## subtopic
Antibiotics: resistant Staphylococcus aureus

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
ART-SCU-MS105-INFECTION-MSK

## related_article_ids


## related_concept_ids
CON-INF-71B43C95050406

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
SCU-MS105 > Pharmacology > Antibiotics: Resistant Staph Aureus

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q1 (Pharmacology) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A patient is diagnosed with a severe infection caused by Vancomycin-Resistant Staphylococcus aureus (VRSA)... ... Daptomycin + Ceftaroline" (FOMSCU Musculoskeletal, EOM MID 2026, Q1 Pharmacology)

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
sourceCandidateIds: find-existing.mjs on "daptomycin" returned no hits — minted fresh; related_concept_ids points at the reused ceftaroline-alone concept (CON-INF-71B43C95050406, see overlay file) since it is the same drug class fact from a different angle.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Denosumab inhibits osteoclast formation by binding RANKL

## id
CON-MSK-B3C1319A149987

## canonical_key
pharmacology.osteoporosis.denosumab-rankl-inhibition

## aliases
Denosumab mechanism
RANKL inhibitor osteoporosis drug

## arabic_label


## arabic_aliases


## definition
Denosumab is a fully human monoclonal antibody that mimics the body's own osteoprotegerin (OPG): it binds RANKL (receptor activator of nuclear factor kappa-B ligand), the signal osteoblasts normally use to trigger osteoclast precursor differentiation and activation, and prevents it from engaging its RANK receptor on osteoclast precursors. By blocking this signal, denosumab reduces osteoclast formation and activity, lowering bone resorption in osteoporosis and other bone-resorbing conditions.

## explicit_objective
State that denosumab is a monoclonal antibody that inhibits osteoclast formation by binding RANKL, mimicking endogenous osteoprotegerin.

## pitfalls
Confusing denosumab's RANKL-binding mechanism with a bisphosphonate's direct osteoclast-apoptosis mechanism, or with an unrelated monoclonal antibody (rituximab/infliximab/adalimumab target B cells or TNF-alpha, not bone remodelling).

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Pharmacology

## subtopic
Osteoporosis: biologic therapy

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
ART-SCU-MS105-BONE-JOINT-PATHOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-117A15BE2C1287

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
SCU-MS105 > Pharmacology > Osteoporosis: Biologic Therapy

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q3 (Pharmacology) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which human monoclonal antibody inhibit osteoclast formation and treat severe bone-resorbing conditions? ... Denosumab" (FOMSCU Musculoskeletal, EOM MID 2026, Q3 Pharmacology)

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
sourceCandidateIds: find-existing.mjs on "denosumab" returned no hits — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Pannus formation is the morphological hallmark of rheumatoid arthritis in synovium

## id
CON-MSK-E4FB0F46A38822

## canonical_key
pathology.joint.pannus-formation-ra-hallmark

## aliases
Rheumatoid pannus
RA synovial hallmark

## arabic_label


## arabic_aliases


## definition
In rheumatoid arthritis, chronic synovial inflammation produces pannus: a mass of proliferating, inflamed synovial fibrovascular tissue that grows across and actively erodes the underlying articular cartilage and subchondral bone. Pannus formation is the diagnostic morphological hallmark that distinguishes RA's destructive, erosive process from osteoarthritis's non-inflammatory cartilage wear (eburnation, osteophytes) or septic arthritis's purulent joint-space process.

## explicit_objective
Identify pannus formation as the morphological hallmark of rheumatoid arthritis in synovium, distinct from osteoarthritis and septic arthritis's own joint changes.

## pitfalls
Selecting a non-inflammatory osteoarthritis feature (eburnation, osteophytes) or an assumption of complete joint-space loss without inflammation, instead of the actively erosive, fibrovascular pannus that defines RA.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Pathology

## subtopic
Joint pathology: rheumatoid arthritis

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
ART-SCU-MS105-BONE-JOINT-PATHOLOGY

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
0.7

## weight_confidence
0.5

## module_subject
SCU-MS105 > Pathology > Joint Pathology: Rheumatoid Arthritis

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q1 (Pathology) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following morphological features is considered the diagnostic hallmark of Rheumatoid Arthritis in a joint synovium? ... Pannus formation" (FOMSCU Musculoskeletal, EOM MID 2026, Q1 Pathology)

## merge_ids


## rejected_merge_candidate_ids
CON-MSK-CFE4B805DB79CC

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
sourceCandidateIds: find-existing.mjs on "pannus" returned a pending Helwan concept (CON-MSK-CFE4B805DB79CC) whose own label is RA's general clinical presentation (symmetrical synovitis, morning stiffness, deformity) — a different specific atomic fact from this concept's own claim (pannus as the specific morphological/histological hallmark) — read in full and rejected as a merge candidate, listed in rejected_merge_candidate_ids; minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Acute osteomyelitis breaking through cortex into the joint causes suppurative arthritis

## id
CON-MSK-32C639D5596D15

## canonical_key
pathology.bone.osteomyelitis-extension-suppurative-arthritis

## aliases
Osteomyelitis joint extension
Suppurative arthritis complication

## arabic_label


## arabic_aliases


## definition
Acute pyogenic osteomyelitis begins as a purulent bacterial infection of bone, most often seeded hematogenously near the metaphysis. If the infection is not controlled, pus can track through the cortex and periosteum and, when the site of infection lies close enough to a joint capsule (as at the proximal humerus, radial head or proximal femur, where the metaphysis is intracapsular), extend directly into the joint space to cause suppurative (septic) arthritis — an acute, purulent joint inflammation requiring urgent drainage.

## explicit_objective
State that direct extension of acute pyogenic osteomyelitis through the cortex into an adjacent joint causes suppurative arthritis.

## pitfalls
Selecting a chronic or non-infectious complication (osteosarcoma, osteoarthritis, osteoporosis) instead of the acute purulent joint inflammation that direct bacterial extension actually causes.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Pathology

## subtopic
Bone pathology: acute osteomyelitis

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
ART-SCU-MS105-BONE-JOINT-PATHOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-7F57E22692DBE2

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
SCU-MS105 > Pathology > Bone Pathology: Acute Osteomyelitis

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q2 (Pathology) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which complication is most likely to occur if an acute pyogenic osteomyelitis infection breaks through the cortex and travels into the adjacent joint space? ... Suppurative arthritis" (FOMSCU Musculoskeletal, EOM MID 2026, Q2 Pathology)

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
sourceCandidateIds: find-existing.mjs on "suppurative arthritis" and "acute hematogenous osteomyelitis" returned no hits — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Staphylococcus aureus is the most common cause of acute hematogenous osteomyelitis

## id
CON-MSK-7F57E22692DBE2

## canonical_key
microbiology.bone.staph-aureus-acute-hematogenous-osteomyelitis

## aliases
Osteomyelitis causative organism
Staph aureus bone infection

## arabic_label


## arabic_aliases


## definition
Staphylococcus aureus possesses surface adhesins (including collagen-binding and fibronectin-binding proteins) that bind readily to bone matrix components, making it by far the most common organism responsible for acute hematogenous osteomyelitis across all age groups. Bloodborne bacteria seed the richly vascular, sluggish-flow metaphysis of a growing long bone, where S. aureus's adhesin-mediated binding gives it a particular advantage in establishing infection there over other bloodborne organisms.

## explicit_objective
State that Staphylococcus aureus is the most common causative organism of acute hematogenous osteomyelitis, via its bone-matrix-binding surface adhesins.

## pitfalls
Selecting a Gram-negative organism (E. coli, Pseudomonas) as the leading cause — these are more typical in specific host contexts (e.g. sickle cell disease, IV drug use) but not the general leading pathogen, which remains S. aureus.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Microbiology

## subtopic
Bone infection: causative organisms

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
ART-SCU-MS105-BONE-JOINT-PATHOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-32C639D5596D15 | CON-INF-23A72C55AB071F

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
SCU-MS105 > Microbiology > Bone Infection: Causative Organisms

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q1 (Microbiology) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the most common causative pyogenic organism responsible for acute hematogenous osteomyelitis in the general population? ... Staphylococcus aureus" (FOMSCU Musculoskeletal, EOM MID 2026, Q1 Microbiology)

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
sourceCandidateIds: find-existing.mjs on "staphylococcus aureus" and "acute hematogenous osteomyelitis" returned no hits — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Staphylococcal Protein A binds the Fc portion of IgG to block opsonization

## id
CON-INF-23A72C55AB071F

## canonical_key
microbiology.staph.protein-a-fc-igg-binding

## aliases
Protein A virulence factor
Staph aureus antiphagocytic mechanism

## arabic_label


## arabic_aliases


## definition
Protein A is a Staphylococcus aureus surface virulence factor that binds the Fc (constant, non-antigen-binding) portion of host IgG antibodies backwards, leaving the antigen-binding Fab regions oriented outward and unable to engage Fc receptors on phagocytes. By preventing this normal opsonin-receptor interaction, Protein A blunts opsonization and protects the bacterium from phagocytic clearance, distinct from mechanisms that directly degrade tissue or host proteins.

## explicit_objective
State that Protein A protects Staphylococcus aureus from phagocytosis by binding IgG's Fc region and preventing opsonization, not by degrading collagen or cleaving IgA.

## pitfalls
Confusing Protein A's Fc-binding, antiphagocytic mechanism with an enzymatic virulence factor (collagenase degrading collagen, IgA protease cleaving secretory IgA) or with pore-forming toxins — Protein A works purely by immunoglobulin misorientation, not by direct tissue damage.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Microbiology

## subtopic
Staphylococcus aureus: virulence factors

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
ART-SCU-MS105-INFECTION-MSK

## related_article_ids


## related_concept_ids
CON-MSK-7F57E22692DBE2

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
SCU-MS105 > Microbiology > Staphylococcus Aureus: Virulence Factors

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q2 (Microbiology) | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the primary mechanism of Protein A as a virulence factor in the pathogenesis of Staphylococcal osteomyelitis? ... Binding to the Fc portion of IgG antibodies" (FOMSCU Musculoskeletal, EOM MID 2026, Q2 Microbiology)

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
sourceCandidateIds: find-existing.mjs on "protein A" returned an unrelated M-protein/rheumatic-fever concept and an unrelated protein-folding question — different facts entirely — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Chemotherapy is a direct risk factor for osteoporosis via disrupted bone remodeling

## id
CON-MSK-117A15BE2C1287

## canonical_key
pathology.bone.chemotherapy-osteoporosis-risk

## aliases
Chemotherapy-induced osteoporosis
Cancer treatment bone loss

## arabic_label


## arabic_aliases


## definition
Certain chemotherapy regimens directly disrupt bone remodeling and, in patients of reproductive age, induce premature ovarian failure and hypogonadism — the resulting drop in gonadal hormones removes a key restraint on osteoclast activity. Together these effects sharply accelerate bone density loss, making chemotherapy exposure a direct, treatment-attributable osteoporosis risk factor distinct from the smaller, non-modifiable contributions of age, sex or obesity alone.

## explicit_objective
Identify chemotherapy as a direct risk factor for osteoporosis through disrupted bone remodeling and treatment-induced hypogonadism, distinguishing it from background risk factors like age or sex in the same patient.

## pitfalls
Attributing a young patient's osteoporosis risk to age or female sex alone, missing that an active chemotherapy course is the specific, directly attributable driver being tested when the vignette names it explicitly.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Community Medicine

## subtopic
Bone health: treatment-related risk factors

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
ART-SCU-MS105-BONE-JOINT-PATHOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-B3C1319A149987

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
0.5

## weight_confidence
0.5

## module_subject
SCU-MS105 > Community Medicine > Bone Health

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | EOM MID 2026 Q1 (Community) | SCU-MS105

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 24-year-old obese female (BMI = 40) diagnosed with breast cancer is undergoing an active course of chemotherapy... ... Chemotherapy" (FOMSCU Musculoskeletal, EOM MID 2026, Q1 Community)

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
sourceCandidateIds: find-existing.mjs on "chemotherapy osteoporosis" returned no hits — minted fresh. This is a musculoskeletal-specific risk-factor fact, distinct from the FBS102 lane's Ethics/Community placement gap (LANE-CARD §7) — no Omar ruling needed here.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Coracobrachialis originates from the coracoid process of the scapula

## id
CON-MSK-FBC3C5E8D68756

## canonical_key
anatomy.arm.coracobrachialis-origin-coracoid-process

## aliases
Coracobrachialis origin
Anterior arm compartment: coracoid process

## arabic_label


## arabic_aliases


## definition
Coracobrachialis, one of the three flexor-compartment muscles of the arm along with biceps brachii and brachialis, arises from the apex of the coracoid process of the scapula (sharing this origin site with the short head of biceps brachii) and inserts on the medial surface of the mid-shaft of the humerus. It is supplied by the musculocutaneous nerve, which characteristically pierces through its belly on its course down the arm.

## explicit_objective
State that coracobrachialis originates from the coracoid process, one of the anterior-compartment arm muscles sharing this scapular origin with biceps brachii's short head.

## pitfalls
Selecting triceps brachii (a posterior-compartment muscle with no coracoid origin) instead of coracobrachialis when asked which anterior-compartment muscle arises from the coracoid process.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Arm: anterior compartment origins

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
CON-MSK-67FFFD33715BA8

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
SCU-MS105 > Anatomy > Arm: Anterior Compartment

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Arm.pdf Q1 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following muscles is located in the anterior compartment of the arm and originates from the coracoid process? ... Coracobrachialis" (FOMSCU Musculoskeletal, Anatomy 03 Questions and QBank, MCQ - Arm.pdf, item 1)

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
sourceCandidateIds: find-existing.mjs on "coracobrachialis" and "coracoid process" returned only musculocutaneous-nerve-course concepts (a different specific fact — nerve relation, not muscle origin) and an AU-MED-105 clavicle/coracoid-attachments concept naming pectoralis minor, not coracobrachialis — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The profunda brachii artery supplies the posterior compartment of the arm

## id
CON-MSK-0153660881F1ED

## canonical_key
anatomy.arm.profunda-brachii-posterior-compartment-supply

## aliases
Posterior arm compartment arterial supply
Deep artery of the arm: territory

## arabic_label


## arabic_aliases


## definition
The profunda brachii artery, after arising from the brachial artery, runs posteriorly through the triangular interval alongside the radial nerve into the spiral (radial) groove of the humerus. From there it is the main arterial supply of the posterior compartment of the arm (triceps brachii), distinct from the brachial artery's own direct territory, which runs down the anterior (flexor) compartment.

## explicit_objective
State that the profunda brachii artery is the main arterial supply of the posterior (extensor) compartment of the arm.

## pitfalls
Selecting the brachial artery itself (the anterior-compartment vessel) instead of its own posterior-compartment branch, the profunda brachii, when asked which artery supplies triceps.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Arm: arterial supply

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
CON-MSK-B1BD54BBB2CAF8

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
SCU-MS105 > Anatomy > Arm: Arterial Supply

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Arm.pdf Q2 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The main arterial supply of the posterior compartment of the arm is provided by: ... Profunda brachii artery" (FOMSCU Musculoskeletal, Anatomy 03 Questions and QBank, MCQ - Arm.pdf, item 2)

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
sourceCandidateIds: find-existing.mjs on "posterior compartment of the arm" returned no hits; "profunda brachii" alone returned only the pending 101-ISK course/anastomosis fact, a different specific claim from this concept's own territory-of-supply claim — minted fresh, related to the sibling origin concept (CON-MSK-B1BD54BBB2CAF8).
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The radial nerve provides motor supply to triceps brachii

## id
CON-MSK-1B586AB2A5A1B9

## canonical_key
anatomy.arm.radial-nerve-motor-supply-triceps-brachii

## aliases
Radial nerve triceps innervation
Mid-shaft humeral fracture nerve injury

## arabic_label


## arabic_aliases


## definition
The radial nerve, the largest branch of the posterior cord of the brachial plexus, runs in the spiral (radial) groove of the humerus in direct contact with the bone, and along this course it gives motor branches to all three heads of triceps brachii before continuing distally. Because the nerve lies directly against the mid-shaft of the humerus in this groove, a mid-shaft humeral fracture is a classic cause of radial nerve injury, producing triceps weakness together with wrist drop from loss of the more distal forearm-extensor supply.

## explicit_objective
State that the radial nerve supplies triceps brachii and is the nerve at risk in a mid-shaft humeral fracture, given its course through the spiral groove directly against the bone.

## pitfalls
Selecting the axillary nerve (injured in surgical-neck fractures, not mid-shaft) or the musculocutaneous/ulnar nerves (neither courses through the spiral groove) instead of the radial nerve for mid-shaft humeral trauma.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Arm: posterior compartment innervation

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
0.4

## academic_relevance
0.7

## weight_confidence
0.5

## module_subject
SCU-MS105 > Anatomy > Arm: Posterior Compartment Innervation

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Arm.pdf Q5, Q6 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A mid-shaft humeral fracture may damage the nerve that supplies which of the following muscles? ... Triceps brachii" and "Which nerve provides motor supply to the triceps brachii? ... Radial nerve" (FOMSCU Musculoskeletal, Anatomy 03 Questions and QBank, MCQ - Arm.pdf, items 5 and 6)

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
sourceCandidateIds: find-existing.mjs on "radial nerve triceps" and "triceps brachii" returned only unrelated general-triceps questions (antagonist role in flexion) — minted fresh. One concept covers both source items (5 and 6), which test the same fact from two directions (clinical vignette and direct recall); both questions in the seed cite this same concept_id.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Biceps brachii inserts on the radial tuberosity

## id
CON-MSK-62521FA0DEF83D

## canonical_key
anatomy.arm.biceps-brachii-insertion-radial-tuberosity

## aliases
Biceps brachii insertion
Radial tuberosity

## arabic_label


## arabic_aliases


## definition
Biceps brachii's two heads converge into a single muscle belly that inserts via its tendon onto the radial tuberosity, a roughened prominence on the proximal radius, with a bicipital aponeurosis fanning medially to blend with the deep fascia of the forearm. This insertion is what lets biceps brachii both flex the elbow and, importantly, supinate the forearm — the tendon's attachment to the radius (rather than the ulna) is what gives the muscle its supinator action, strongest with the elbow flexed.

## explicit_objective
State that biceps brachii inserts on the radial tuberosity, distinguishing it from brachialis's ulnar tuberosity insertion.

## pitfalls
Assigning the ulnar tuberosity (brachialis's own insertion) to biceps brachii — the two elbow flexors' insertion sites on the two different forearm bones are a common paired-fact confusion.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Arm: muscle insertions

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
CON-MSK-A36FFB4E368774

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
SCU-MS105 > Anatomy > Arm: Muscle Insertions

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Arm.pdf Q7 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following is the insertion of the biceps brachii muscle? ... Radial tuberosity" (FOMSCU Musculoskeletal, Anatomy 03 Questions and QBank, MCQ - Arm.pdf, item 7)

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
sourceCandidateIds: find-existing.mjs on "biceps brachii insertion" returned no hits — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Brachialis inserts on the ulnar tuberosity

## id
CON-MSK-A36FFB4E368774

## canonical_key
anatomy.arm.brachialis-insertion-ulnar-tuberosity

## aliases
Brachialis insertion
Ulnar tuberosity

## arabic_label


## arabic_aliases


## definition
Brachialis, lying deep to biceps brachii, arises from the anterior surface of the distal half of the humerus and inserts onto the ulnar tuberosity and the coronoid process of the ulna. Unlike biceps brachii's radial (and therefore rotation-capable) insertion, brachialis's fixed ulnar insertion means it acts as a pure elbow flexor regardless of forearm position (pronated or supinated), making it the primary flexor of the elbow across all positions.

## explicit_objective
State that brachialis inserts on the ulnar tuberosity, distinguishing it from biceps brachii's radial tuberosity insertion and explaining why brachialis flexes the elbow regardless of forearm rotation.

## pitfalls
Assigning the radial tuberosity (biceps brachii's own insertion) to brachialis — the two elbow flexors' insertion sites on the two different forearm bones are a common paired-fact confusion.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Arm: muscle insertions

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
CON-MSK-62521FA0DEF83D

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
SCU-MS105 > Anatomy > Arm: Muscle Insertions

## exam_signal
FOMSCU Musculoskeletal own-source QBank | past_exam | 2026 | MCQ - Arm.pdf Q8 | SCU-MS105

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following is the insertion of the brachialis muscle? ... Ulnar tuberosity" (FOMSCU Musculoskeletal, Anatomy 03 Questions and QBank, MCQ - Arm.pdf, item 8)

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
sourceCandidateIds: find-existing.mjs on "brachialis insertion" and "brachialis" alone returned only musculocutaneous-nerve-course concepts (substring collisions on "brachialis" inside "coracobrachialis"/"between biceps and brachialis") — a different specific fact, not the insertion site — minted fresh.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
