<!--
  ZU-MED-104 (Musculoskeletal & Integumentary) — 20 NEW concepts minted for
  the msk-summer-sba cluster, authored from `Fakous MSK Summer 2024.pdf`
  (Zagazig's Fakous campus resit paper — provenance ruled usable, LANE-CARD.md
  §7). Same OCR-then-hand-drawn-ink-key trap as the sibling Final paper
  (coverage/ZU-MED-104-triage.md "Summer resit" section): no native PDF text
  layer, `pagetext.mjs ocr --pages 1-5` recovered the text, and the correct
  option on every keyed SBA carries a corrupted-glyph or circled/margin-letter
  mark, confirmed by `render --force` on pages 2-5 (4 renders, within the
  LANE-CARD's own ≤6 budget).

  Search-before-mint run against `Instruction Manual for Content Creation/
  tools/find-existing.mjs` for every question's topic. 10 of the 30 authored
  questions hit existing pending records instead (handled as sparse pending
  overlays, not here — see `pending-live/ZU-MED-104-msk-summer-pending-
  overlays.md`). The 20 concepts below are minted fresh because no existing
  record covers the fact tested, OR because the fact tested conflicts with an
  already-established live/pending concept from this same corpus (the Final
  sibling cluster, or another lane's pending concept) — minting fresh keeps
  the marked answer from corrupting an already-correct existing record. Every
  such conflict is logged in this concept's own `## uncertainty` field for
  reviewer attention. Ids minted with `mint-concept-id.mjs`, checked against
  13,578 existing ids, 0 collisions.

  No evidence-store `src_…` resource exists for this PDF (Telegram-dump
  staging material, not in `corpus-source-index.json`); `resource_ids` are
  left blank per 12-resources.md option 3 — the citation lives in each
  question's `source_citation` in the question batch.

  Import: Admin › Concepts › Import.
-->

# Item

## id
CON-MSK-B2787003E8A042

## label
The paper's marked key attributes inability to invert the foot to superficial peroneal nerve paralysis

## canonical_key
leg.superficial-peroneal-nerve-inversion-claim

## aliases
Foot inversion nerve supply
Superficial vs deep peroneal nerve

## arabic_label


## arabic_aliases


## definition
Foot inversion is produced chiefly by tibialis anterior (deep peroneal nerve) and tibialis posterior (tibial nerve); the superficial peroneal nerve instead supplies peroneus longus and brevis, the evertors, so its injury classically costs eversion, not inversion. This paper's marked key nonetheless names the superficial peroneal nerve as the one paralysed when a patient cannot invert the foot. The question is authored to the paper's own printed/hand-drawn key per this lane's standing rule that a single, unambiguous mark stands as authored even when it runs against the standard teaching cited above — see `## uncertainty` below for the reviewer-facing flag.

## explicit_objective
State the paper's own marked answer (superficial peroneal nerve) for a case of inability to invert the foot, while flagging that standard teaching instead attributes active inversion to the deep peroneal nerve (tibialis anterior) and tibial nerve (tibialis posterior).

## pitfalls
Treating this concept as authoritative teaching on inversion nerve supply — it records the exam paper's own marked answer, which conflicts with the standard deep-peroneal/tibialis-anterior account of active inversion; see `## uncertainty`.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Lower limb anatomy

## subtopic
Leg

## microtopic
Peroneal nerve branches

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-LOWER-LIMB-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.5

## weight_confidence
0.25

## confidence
0.35

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"16-year-old boy is unable to invert his foot. Which of the following nerves is most likely to be paralyzed? a) Superficial peroneal b) Deep peroneal c) Lateral planter d) Medial planter" ANSWER: a (circled, confirmed by render --force, Fakous MSK Summer 2024.pdf p.2 Q1)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (superficial peroneal) conflicts with the standard account that active foot inversion is produced by tibialis anterior (deep peroneal nerve) and tibialis posterior (tibial nerve), while the superficial peroneal nerve supplies the evertors (peroneus longus/brevis) — its injury classically costs eversion, not inversion. A single, unambiguous mark on this question (no second conflicting mark found on render), so it is authored per the printed-key-stands rule rather than held; flagged here for reviewer attention before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-4DDC5547E3F6B9

## label
The paper's marked key attributes loss of the mid-prone forearm position to posterior interosseous nerve injury

## canonical_key
forearm.posterior-interosseous-nerve-mid-prone-claim

## aliases
Posterior interosseous nerve injury deficit
Mid-prone forearm position

## arabic_label


## arabic_aliases


## definition
The posterior interosseous nerve is the deep, purely motor terminal branch of the radial nerve; it supplies the deep extensor group of the forearm (finger and thumb extensors, abductor pollicis longus, extensor indicis) and its injury classically produces finger drop without wrist drop, because extensor carpi radialis longus is supplied above the point of division and continues to extend the wrist. Placing the forearm in mid-prone position is a balance of biceps brachii/supinator (supination) against pronator teres/quadratus (pronation), none of which the posterior interosseous nerve supplies. This paper's marked key nonetheless names loss of the mid-prone position as the deficit from posterior interosseous nerve injury; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer for the function lost after a posterior interosseous nerve injury, while flagging that the nerve supplies the deep extensors (with wrist extension retained via extensor carpi radialis longus) rather than the pronation/supination muscles that set forearm position.

## pitfalls
Treating this concept as authoritative teaching on posterior interosseous nerve deficits — see the related pending concept CON-MSK-1FC89E36FFD98E, which documents finger drop without wrist drop as the standard picture.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Upper limb anatomy

## subtopic
Forearm and wrist

## microtopic
Posterior interosseous nerve

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-UPPER-LIMB-ANATOMY

## related_article_ids


## related_concept_ids
CON-MSK-1FC89E36FFD98E

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.5

## weight_confidence
0.25

## confidence
0.35

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 33-year-old male with gunshot which severely affect the forearm with injury to posterior interosseous nerve, which function was lost? a) Putting the forearm in mid prone position b) Extension of wrist joint c) Extension of elbow joint" ANSWER: a (circled/struck mark, confirmed by render --force, Fakous MSK Summer 2024.pdf p.2 Q8)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (mid-prone position) conflicts with the standard posterior-interosseous-nerve picture (finger drop, wrist extension retained via extensor carpi radialis longus, no role in pronation/supination) documented in the related pending concept CON-MSK-1FC89E36FFD98E (101-ISK-mcq-concepts.md). A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-17F01F0BAD6B1F

## label
The paper's marked key names the radial collateral ligament as the triangular elbow ligament injured on the medial side

## canonical_key
elbow.medial-collateral-ligament-triangular-shape

## aliases
Elbow collateral ligaments
Ulnar collateral ligament
Medial elbow dislocation

## arabic_label


## arabic_aliases


## definition
The elbow joint carries two collateral ligaments: the ulnar (medial) collateral ligament, a triangular band running from the medial epicondyle to the coronoid process and olecranon, and the radial (lateral) collateral ligament, a triangular band on the opposite, lateral side running from the lateral epicondyle to blend with the annular ligament. A dislocation injuring a triangular ligament on the medial side of the joint should, by this arrangement, injure the ulnar collateral ligament, not the radial collateral ligament, which lies laterally. This paper's marked key nonetheless names the radial collateral ligament; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer for a triangular ligament injured on the medial side of a dislocated elbow, while flagging that the medial-side triangular ligament is conventionally the ulnar (not radial) collateral ligament.

## pitfalls
Assuming "radial collateral ligament" can sit on the medial side of the elbow — by name and attachment it is the lateral-side ligament; the medial-side triangular ligament is the ulnar collateral ligament.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Upper limb anatomy

## subtopic
Elbow joint

## microtopic
Collateral ligaments of the elbow

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-UPPER-LIMB-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.45

## academic_relevance
0.5

## weight_confidence
0.25

## confidence
0.3

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 16-year-old boy with dislocation of his elbow joint. On MRI examination the physician reveals injury to triangular shaped ligament in the medial side of the joint. Which of the following ligament most likely affected? a) Annular b) Transverse humeral c) Radial collateral d) Ulnar collateral" ANSWER: c (corrupted-glyph mark, confirmed by render --force, Fakous MSK Summer 2024.pdf p.3 Q9)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (radial collateral) conflicts with standard elbow anatomy, in which the medial-side triangular ligament is the ulnar collateral ligament and the radial collateral ligament sits laterally. A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-2C52951B7ECD90

## label
Flexor pollicis brevis' ulnar-supplied deep head can retain function after a median nerve injury at the wrist

## canonical_key
hand.median-nerve-wrist-injury-flexor-pollicis-brevis

## aliases
Median nerve injury at the wrist
Flexor pollicis brevis dual innervation
Thenar muscle nerve supply

## arabic_label


## arabic_aliases


## definition
Flexor pollicis brevis has two heads: a superficial head supplied by the median nerve's recurrent branch, and a deep head that, in the majority of hands, is supplied by the deep branch of the ulnar nerve rather than the median nerve. A median nerve injury at the wrist therefore does not necessarily abolish flexor pollicis brevis function outright — the ulnar-supplied deep head can carry on the muscle's action — unlike abductor pollicis brevis and opponens pollicis, which are wholly median-supplied via the recurrent branch and are lost outright. The lumbricals of the index and middle fingers are also median-supplied (via the digital branches) and are lost with a median nerve injury at the wrist, while the ulnar-supplied lumbricals of the ring and little fingers are retained.

## explicit_objective
State that flexor pollicis brevis' deep head is typically ulnar-supplied, so the muscle can retain partial function after an isolated median nerve injury at the wrist, unlike the wholly median-supplied abductor pollicis brevis, opponens pollicis and index/middle lumbricals.

## pitfalls
Assuming every thenar muscle is lost after a median nerve injury at the wrist — abductor pollicis brevis and opponens pollicis are, but flexor pollicis brevis' deep head commonly escapes because of its ulnar supply, a frequently tested exception.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Upper limb anatomy

## subtopic
Hand

## microtopic
Median nerve injury at the wrist

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-UPPER-LIMB-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.45

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 24-year-old male had his median nerve injured in an industrial accident at the wrist. Which of the following muscle would still retain its function? a) Lumbricals of index and middle finger b) Abductor pollicis brevis c) Lumbricals of ring and little finger d) Flexor pollicis brevis" ANSWER: d (circled, confirmed by render --force, Fakous MSK Summer 2024.pdf p.3 Q11)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-35546C4BE3D029

## label
The paper's marked key attributes weakness (not loss) of wrist flexion to a mass compressing the sixth extensor compartment

## canonical_key
wrist.sixth-extensor-compartment-ecu

## aliases
Sixth extensor compartment
Extensor carpi ulnaris compartment
Extensor retinaculum compartments

## arabic_label


## arabic_aliases


## definition
The sixth (most medial) compartment of the extensor retinaculum holds extensor carpi ulnaris alone. A mass compressing this compartment entraps only that tendon, so the expected deficit is a loss or weakness of wrist extension with ulnar deviation, not a flexion deficit — wrist flexion is produced by flexor carpi radialis and flexor carpi ulnaris, whose tendons run on the flexor (volar), not extensor (dorsal), side of the wrist and are unrelated to the extensor retinaculum's six compartments. This paper's marked key nonetheless names weakness of flexion as the deficit from sixth-compartment compression; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer for the deficit from a mass compressing the sixth extensor compartment, while flagging that the sixth compartment holds only extensor carpi ulnaris, so the standard-teaching deficit is weakness/loss of wrist extension, not flexion.

## pitfalls
Confusing an extensor-compartment mass with a flexor-side deficit — the extensor retinaculum's six compartments hold only extensor tendons; flexor carpi radialis and flexor carpi ulnaris run through the separate flexor retinaculum region and are unaffected by an extensor compartment mass.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Upper limb anatomy

## subtopic
Forearm and wrist

## microtopic
Extensor retinaculum compartments

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-UPPER-LIMB-ANATOMY

## related_article_ids


## related_concept_ids
CON-MSK-9F295DCA61C8E6

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.45

## academic_relevance
0.5

## weight_confidence
0.25

## confidence
0.3

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A localized mass that compresses the sixth compartment of extensor retinaculum. Which of the following condition may result in wrist joint? a) Weakness of flexion b) Loss of flexion c) Loss of extension d) Weakness of extension" ANSWER: a (circled/underlined, confirmed by render --force, Fakous MSK Summer 2024.pdf p.3 Q12)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (weakness of flexion) conflicts with standard teaching that the sixth extensor compartment holds only extensor carpi ulnaris, so its compression is expected to weaken/lose wrist extension, not flexion (a fact the sibling fifth-compartment concept CON-MSK-9F295DCA61C8E6, from the Final paper, illustrates for the neighbouring compartment). A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-F3403BC680A09E

## label
Froment's sign is the test expected to be positive in cubital tunnel syndrome

## canonical_key
elbow.cubital-tunnel-syndrome-froment-sign

## aliases
Cubital tunnel syndrome
Froment sign
Ulnar nerve compression at the elbow

## arabic_label


## arabic_aliases


## definition
Cubital tunnel syndrome is compression of the ulnar nerve as it passes behind the medial epicondyle of the humerus, at the elbow. Because the ulnar nerve supplies adductor pollicis, Froment's sign — the patient substitutes flexor pollicis longus (median-supplied) for the weak or paralysed adductor pollicis when pinching a card between thumb and index finger, producing exaggerated thumb interphalangeal flexion — is the clinical test that becomes positive with ulnar nerve dysfunction, including cubital tunnel syndrome. Trendelenburg's sign tests hip abductor (gluteus medius/minimus, superior gluteal nerve) function, the card test and hand-of-benediction are distractor names not standard eponymous signs for ulnar-nerve testing in this format, so Froment's sign is the option that specifically targets the ulnar nerve territory affected by cubital tunnel syndrome.

## explicit_objective
State that Froment's sign, reflecting adductor pollicis weakness, is the test expected to be positive in cubital tunnel syndrome (ulnar nerve compression at the elbow).

## pitfalls
Selecting Trendelenburg's sign — that tests the hip abductors (superior gluteal nerve), an unrelated lower-limb territory, not the ulnar nerve.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Upper limb anatomy

## subtopic
Elbow and forearm nerve injuries

## microtopic
Cubital tunnel syndrome

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-UPPER-LIMB-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.45

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.65

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.65

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 23-year-old girl suffers from cubital tunnel syndrome. Which of the following signs would you expect to be positive in this patient? a) Trendelenburg b) Card test c) Froment d) Hand of benediction" ANSWER: c (circled, confirmed by render --force, Fakous MSK Summer 2024.pdf p.3 Q13)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-FAAB39CEF5BA96

## label
The radial tuberosity is spared in a severe elbow joint injury because it lies distal to the joint itself

## canonical_key
elbow.radial-tuberosity-spared-in-joint-trauma

## aliases
Elbow joint bony landmarks
Radial tuberosity
Trochlea, capitulum and radial head

## arabic_label


## arabic_aliases


## definition
The elbow joint proper is formed by the trochlea and capitulum of the humerus articulating with the trochlear notch of the ulna and the head of the radius. The radial tuberosity, the biceps brachii insertion, sits on the shaft of the radius distal to the radial head and does not itself form part of the articulating joint surface. A severe injury to the elbow joint that damages its intra-articular bony landmarks (trochlea, capitulum, upper surface of the radial head) would therefore be expected to spare the radial tuberosity, which lies outside the joint capsule's own articulating surfaces.

## explicit_objective
State that the radial tuberosity, lying distal to the radial head outside the elbow joint's own articulating surfaces, is the landmark expected to be spared in a severe elbow joint injury, unlike the trochlea, capitulum and upper surface of the radial head.

## pitfalls
Assuming every proximal-radius/distal-humerus landmark is equally at risk in an elbow injury — only the landmarks that form the joint's own articulating surfaces (trochlea, capitulum, radial head's upper surface) are classically damaged; the radial tuberosity, distal to the joint, is not one of them.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Upper limb anatomy

## subtopic
Elbow joint

## microtopic
Bony landmarks of the elbow

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-UPPER-LIMB-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.45

## clinical_relevance
0.5

## academic_relevance
0.55

## weight_confidence
0.35

## confidence
0.55

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 25-year-old male with car accident which severely affect the elbow joint. Which of the following bony landmarks is spared? a) Trochlea of ulna b) Upper surface of head of radius c) Capitulum of humerus d) Radial tuberosity" ANSWER: d (circled, margin "d" note, confirmed by render --force, Fakous MSK Summer 2024.pdf p.3 Q14)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-794D7DCFF1EC5A

## label
The paper's marked key attributes tendo-achillis rupture weakness to inversion of the foot

## canonical_key
leg.tendo-achillis-rupture-plantarflexion-weakness

## aliases
Tendo-achillis rupture
Achilles tendon rupture
Gastrocnemius-soleus tendon

## arabic_label


## arabic_aliases


## definition
The tendo-achillis (Achilles tendon) is the common insertion of gastrocnemius and soleus onto the calcaneus; it is the prime mover of plantarflexion at the ankle, and its rupture classically produces marked weakness of plantarflexion (the basis of the clinical Thompson/Simmonds test), not inversion. This paper's marked key nonetheless names inversion as the action weakened by tendo-achillis rupture; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer for the action weakened by tendo-achillis rupture, while flagging that standard teaching attributes the deficit to plantarflexion, the tendon's own prime action, not inversion.

## pitfalls
Treating this concept as authoritative teaching on tendo-achillis function — gastrocnemius and soleus are plantarflexors; inversion is instead the province of tibialis anterior and tibialis posterior.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Lower limb anatomy

## subtopic
Leg

## microtopic
Tendo-achillis

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-LOWER-LIMB-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.5

## weight_confidence
0.25

## confidence
0.3

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A football player tears his tendo-achillis. You would expect to find weakness in which of the following actions of the foot? a) Dorsiflexion b) Eversion c) Inversion d) Plantarflexion" ANSWER: c (corrupted-glyph mark, confirmed by render --force, Fakous MSK Summer 2024.pdf p.4 Q19)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (inversion) conflicts with standard teaching that gastrocnemius/soleus, inserting via the tendo-achillis, are plantarflexors, so rupture classically weakens plantarflexion (the clinical basis of the Thompson/Simmonds test), not inversion. A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-D926FA70E80B77

## label
The paper's marked key names the ulnar artery as the vessel to ligate to stop deep palmar arch bleeding

## canonical_key
hand.deep-palmar-arch-ligation-claim

## aliases
Deep palmar arch
Superficial vs deep palmar arch
Radial artery termination

## arabic_label


## arabic_aliases


## definition
The deep palmar arch is chiefly the termination of the radial artery, completed by the deep branch of the ulnar artery; the superficial palmar arch, by contrast, is chiefly the continuation of the ulnar artery, completed by the superficial branch of the radial artery. Bleeding specifically identified as arising from the deep palmar arch is therefore conventionally traced to the radial artery as the dominant contributor and the vessel to ligate, not the ulnar artery, whose main contribution is instead to the superficial arch. This paper's marked key nonetheless names the ulnar artery; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer for the vessel to ligate to stop deep palmar arch bleeding, while flagging that standard teaching identifies the radial artery, not the ulnar artery, as the deep arch's dominant contributor.

## pitfalls
Confusing the deep and superficial palmar arches' dominant contributors — the deep arch is chiefly radial (with the ulnar's deep branch completing it); the superficial arch is chiefly ulnar (with the radial's superficial branch completing it).

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Upper limb anatomy

## subtopic
Hand vasculature

## microtopic
Palmar arches

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-UPPER-LIMB-ANATOMY

## related_article_ids


## related_concept_ids
CON-MSK-BC95DAE3531583

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.5

## weight_confidence
0.25

## confidence
0.3

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 26-year-old man suffers from severe bleeding in his hand after examination the physician decides this bleeding from deep palmer arch. Which of the following arteries must be ligated to stop this bleeding? a) Ulnar b) Anterior interosseus c) Radial d) Posterior interosseous" ANSWER: a (corrupted-glyph mark, confirmed by render --force, Fakous MSK Summer 2024.pdf p.4 Q20)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (ulnar) conflicts with the pending concept CON-MSK-BC95DAE3531583 (101-ISK-concepts.md), which states the deep palmar arch is the radial artery's own termination. A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication. This concept was minted fresh rather than overlaid onto CON-MSK-BC95DAE3531583 to avoid attaching a conflicting claim to that already-correct pending record.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-DER-FC6E618EF5E648

## label
The paper's marked key names merocrine sweat glands as the ones discharging an oily secretion into the hair follicle lumen

## canonical_key
skin.gland-discharging-into-hair-follicle-lumen

## aliases
Sebaceous gland secretion
Merocrine vs sebaceous glands
Skin gland types

## arabic_label


## arabic_aliases


## definition
Sebaceous glands are holocrine acinar glands, usually attached to a hair follicle, that discharge their oily product (sebum) directly into the follicle's lumen when the whole secreting cell disintegrates. Merocrine (eccrine) sweat glands, by contrast, open independently onto the skin surface through their own duct and secrete a watery, not oily, product without discharging into hair follicles at all. This paper's marked key nonetheless names merocrine sweat glands as the ones discharging an oily secretion into the hair follicle lumen; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer for the gland discharging an oily secretion into the hair follicle lumen, while flagging that standard histology attributes this specifically to the sebaceous gland (holocrine secretion), not the merocrine (eccrine) sweat gland.

## pitfalls
Treating this concept as authoritative teaching on skin gland secretion — sebaceous glands are the ones that empty an oily, holocrine secretion into the hair follicle; merocrine/eccrine sweat glands secrete a watery product independently onto the skin surface.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
derm

## primary_node_id


## secondary_node_ids


## topic
Integumentary histology

## subtopic
Skin glands

## microtopic
Sebaceous and sweat glands

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-HISTOLOGY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.5

## weight_confidence
0.25

## confidence
0.3

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which one of the following glands discharge an oily secretion into the lumen of hair follicles? a) Apocrine sweat b) Merocrine sweat c) Sebaceous d) Eccrine sweat" ANSWER: b (corrupted-glyph mark, confirmed by render --force, Fakous MSK Summer 2024.pdf p.4 Q21)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (merocrine sweat) conflicts with standard histology, in which sebaceous glands are the ones that discharge an oily, holocrine secretion into the hair follicle lumen, while merocrine (eccrine) sweat glands secrete a watery product independently onto the skin surface. A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-015215DF0C152A

## label
The triad of skeletal muscle is a pair of terminal cisternae flanking a single transverse tubule

## canonical_key
muscle.triad-terminal-cisternae-transverse-tubule

## aliases
Skeletal muscle triad
Terminal cisternae
Transverse tubule

## arabic_label


## arabic_aliases


## definition
At the A-I junction of each sarcomere, the sarcoplasmic reticulum's terminal cisternae flank a single transverse (T) tubule, an invagination of the sarcolemma; this three-part structure — one T-tubule sandwiched between two terminal cisternae — is the triad. Depolarisation spreading down the T-tubule is sensed by dihydropyridine receptors, which mechanically couple to ryanodine receptors on the adjacent terminal cisternae, triggering calcium release. The triad is therefore defined by a single transverse tubule paired with two terminal cisternae, not two transverse tubules or two cisternae paired with more than one tubule.

## explicit_objective
State that the skeletal muscle triad consists of a single transverse tubule flanked by a pair of terminal cisternae, and name its role in excitation-contraction coupling.

## pitfalls
Doubling the transverse tubule component of the triad — the defining feature is one T-tubule between two terminal cisternae, not two T-tubules; a structure with two T-tubules and two cisternae is not the standard triad.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Muscle histology

## subtopic
Sarcomere

## microtopic
Triad and sarcotubular system

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-HISTOLOGY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.45

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.65

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following describes the triad in skeletal muscle? a) A pair of terminal cisternae with a longitudinal tubule b) A pair of terminal cisternae with a transverse tubule c) A pair of terminal cisternae with an oblique tubule d) A pair of transverse tubule with one terminal cisternae" ANSWER: b (corrupted-glyph mark, confirmed by render --force, Fakous MSK Summer 2024.pdf p.4 Q22)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-NEU-0C49B84F31317B

## label
The paper's marked key names gamma motor fibers as the component not seen in the muscle spindle

## canonical_key
muscle.spindle-alpha-motor-fibers-not-seen

## aliases
Muscle spindle components
Gamma motor fibers
Alpha motor fibers

## arabic_label


## arabic_aliases


## definition
The muscle spindle is innervated by afferent annulospiral (group Ia) and flower-spray (group II) sensory endings on its intrafusal fibres, and by efferent gamma motor fibres, which adjust intrafusal fibre tension. Alpha motor fibres, by contrast, innervate only the extrafusal (ordinary contractile) fibres outside the spindle capsule and are not a component of the spindle itself. This paper's marked key nonetheless names gamma motor fibres as the component not seen in the muscle spindle; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer for the component not seen in the muscle spindle, while flagging that standard teaching places gamma motor fibres inside the spindle (innervating intrafusal fibres) and alpha motor fibres outside it (innervating extrafusal fibres only).

## pitfalls
Treating this concept as authoritative teaching on muscle spindle innervation — annulospiral and flower-spray sensory endings and gamma motor fibres are all found within the spindle; alpha motor fibres supply extrafusal fibres outside it.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
neuro

## primary_node_id


## secondary_node_ids


## topic
Nerve physiology

## subtopic
Muscle spindle

## microtopic
Intrafusal fibre innervation

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-MUSCLE-NERVE-PHYSIOLOGY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.45

## clinical_relevance
0.3

## academic_relevance
0.55

## weight_confidence
0.3

## confidence
0.35

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In muscle spindle, which of the followings are not seen? a) Annulospiral nerve endings b) Flower spray nerve endings c) Gamma (γ) motor fibers d) Alpha (α) motor fibers" ANSWER: c (corrupted-glyph mark, confirmed by render --force, Fakous MSK Summer 2024.pdf p.4 Q23)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (gamma motor fibers) conflicts with standard teaching, in which gamma motor fibres innervate intrafusal fibres inside the spindle while alpha motor fibres, supplying only extrafusal fibres, are the ones not found within it. A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-51178FF4A71C3E

## label
The paper's marked key names collagen type I as the fibre type present in hyaline cartilage

## canonical_key
cartilage.hyaline-collagen-type-claim

## aliases
Hyaline cartilage collagen
Collagen type II
Collagen type I

## arabic_label


## arabic_aliases


## definition
Hyaline cartilage's extracellular matrix is built on a framework of collagen type II, distinguishing it from bone (collagen type I) and from the elastic-fibre-rich matrix of elastic cartilage. This paper's marked key nonetheless names collagen type I as the fibre type present in hyaline cartilage; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer for the collagen type present in hyaline cartilage, while flagging that standard histology attributes hyaline cartilage's collagen framework to type II, not type I (which is bone's collagen).

## pitfalls
Treating this concept as authoritative teaching on cartilage collagen typing — collagen type II is the standard hyaline cartilage answer (see the pending concept CON-FND-E6C216AED80ED8, whose own aliases list "cartilage collagen type II"); type I is bone's collagen.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Cartilage biochemistry

## subtopic
Collagen types

## microtopic
Hyaline cartilage matrix

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-HISTOLOGY

## related_article_ids


## related_concept_ids
CON-FND-E6C216AED80ED8

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.25

## academic_relevance
0.5

## weight_confidence
0.25

## confidence
0.3

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which type of collagen is present in the hyaline cartilage? a) Collagen type I b) Collagen type II c) Collagen type III d) Collagen type IV" ANSWER: a (circled, confirmed by render --force, Fakous MSK Summer 2024.pdf p.4 Q24)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (type I) conflicts with the pending concept CON-FND-E6C216AED80ED8 (102-INT-mcq-concepts.md), whose own aliases already list "cartilage collagen type II" — the standard hyaline-cartilage answer. A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication. This concept was minted fresh rather than overlaid onto CON-FND-E6C216AED80ED8 to avoid attaching a conflicting claim to that already-correct pending record.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-20171F528FD19E

## label
The paper's marked key attributes lack of organelles and an actin-filament-rich cytoplasm to the osteoclast's basal zone

## canonical_key
bone.osteoclast-zone-ultrastructure-claim

## aliases
Osteoclast ultrastructure
Basal zone
Clear (sealing) zone

## arabic_label


## arabic_aliases


## definition
An actively resorbing osteoclast shows four ultrastructural zones against the bone surface: a basal zone (containing the nucleus and the bulk of the organelles), a vesicular zone (transport vesicles between the basal region and the ruffled border), a ruffled border (the resorbing surface facing the bone), and a clear (sealing) zone, an organelle-poor rim rich in actin filaments that seals the resorption compartment against the surrounding bone surface. This paper's marked key nonetheless attributes the organelle-poor, actin-rich description to the basal zone rather than the clear (sealing) zone; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer for which osteoclast zone lacks organelles but is rich in actin filaments, while flagging that standard histology attributes this description to the clear (sealing) zone, and that the basal zone instead holds the nucleus and organelles.

## pitfalls
Treating this concept as authoritative teaching on osteoclast zone ultrastructure — the clear (sealing) zone is the organelle-poor, actin-rich rim; the basal zone is where the nucleus and organelles actually concentrate.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Bone histology

## subtopic
Osteoclast

## microtopic
Osteoclast ultrastructural zones

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-HISTOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-76CE11C6DCDC37

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.5

## weight_confidence
0.25

## confidence
0.3

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following sentence best describe bone osteoclasts? a) Basal-zone lacks organelles but contains many actin filaments b) Ruffled zone is farthest away from the bone surface c) Plasma membrane of the clear zone forms the sealing zone d) Vesicular zone contains multiple nuclei, mitochondria and Golgi" ANSWER: a (circled, confirmed by render --force, Fakous MSK Summer 2024.pdf p.5 Q26)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (basal zone) conflicts with standard histology, which attributes the organelle-poor, actin-filament-rich description to the clear (sealing) zone; the basal zone instead holds the nucleus and the bulk of the organelles (see the related pending concept CON-MSK-76CE11C6DCDC37, 103-BMS-histology-concepts.md, on the osteoclast's ruffled border). A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-DER-BA87CF38DCB308

## label
The glassy membrane is not a structural part of the nail — it belongs to the hair follicle's inner root sheath

## canonical_key
nail.glassy-membrane-not-a-nail-structure

## aliases
Nail structures
Glassy membrane
Hyponychium, eponychium and lunula

## arabic_label


## arabic_aliases


## definition
The nail apparatus is built of the nail plate, nail bed, nail matrix, eponychium (cuticle), hyponychium, lunula and the lateral/proximal nail folds. The glassy (vitreous) membrane is instead a hair-follicle structure — the innermost layer of the outer root sheath's basement-membrane region — with no counterpart in the nail apparatus, making it the option that is not a structural part of the nail among hyponychium, eponychium and lunula, which are.

## explicit_objective
State that the glassy membrane, a hair-follicle structure, is not a structural part of the nail, distinguishing it from hyponychium, eponychium and lunula, which are.

## pitfalls
Assuming every listed skin-appendage term belongs to the nail because the question is framed around the nail — the glassy membrane is borrowed from hair follicle histology and has no nail counterpart.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
derm

## primary_node_id


## secondary_node_ids


## topic
Integumentary histology

## subtopic
Nail

## microtopic
Nail structures

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-HISTOLOGY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.5

## weight_confidence
0.3

## confidence
0.55

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following is not a structural part of nail? a) Hyponychium b) Eponychium c) Lunula d) Glassy membrane" ANSWER: d (circled, confirmed by render --force, Fakous MSK Summer 2024.pdf p.5 Q27)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-END-CEFAFB97BEDE58

## label
The paper's marked key states that calcitonin increases serum calcium level

## canonical_key
calcium.hormonal-regulation-serum-level-claim

## aliases
Calcitonin action
Serum calcium hormonal regulation
Parathormone and glucocorticoid effects on calcium

## arabic_label


## arabic_aliases


## definition
Serum calcium is held in a narrow range chiefly by parathyroid hormone and calcitriol (active vitamin D), both of which raise it, opposed by calcitonin, which lowers it by inhibiting osteoclastic bone resorption. Glucocorticoids independently tend to decrease serum calcium (reduced intestinal absorption, increased renal excretion). This paper's marked key nonetheless states that calcitonin increases serum calcium level; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer on hormonal regulation of serum calcium, while flagging that standard physiology attributes a calcium-lowering, not calcium-raising, action to calcitonin.

## pitfalls
Treating this concept as authoritative teaching on calcitonin's action — calcitonin lowers serum calcium by inhibiting osteoclasts; parathyroid hormone and calcitriol are the calcium-raising hormones.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Endocrine physiology

## subtopic
Calcium homeostasis

## microtopic
Calcitonin

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-MUSCLE-NERVE-PHYSIOLOGY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.35

## academic_relevance
0.5

## weight_confidence
0.25

## confidence
0.3

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Regarding Hormonal regulation of serum Ca++ level, which of the following is a correct effect on Ca++? a) Parathormone decreases serum Ca++ level b) Calcitonin increases serum Ca++ level c) Glucocorticoids decrease serum Ca++ level d) Thyroid hormone decreases serum Ca++ level" ANSWER: b (circled, confirmed by render --force, Fakous MSK Summer 2024.pdf p.5 Q28)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (calcitonin increases serum Ca++) conflicts with standard physiology, in which calcitonin lowers serum calcium by inhibiting osteoclastic resorption, while glucocorticoids (option c) are the option with a textbook calcium-lowering effect. A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-NEU-7CD17E162E7E09

## label
The paper's marked key attributes presynaptic inhibition to increased sodium influx

## canonical_key
synapse.presynaptic-inhibition-mechanism-claim

## aliases
Presynaptic inhibition
Primary afferent depolarisation
Chloride permeability and presynaptic terminals

## arabic_label


## arabic_aliases


## definition
Presynaptic inhibition classically results from GABA acting on axo-axonic synapses onto a presynaptic terminal, increasing that terminal's chloride permeability; because presynaptic terminals maintain an unusually high intracellular chloride concentration, this produces primary afferent depolarisation rather than hyperpolarisation, which in turn inactivates voltage-gated calcium channels and reduces calcium influx and neurotransmitter release at that terminal. Increased sodium influx is depolarising and excitatory wherever it occurs and is not the accepted mechanism of presynaptic inhibition. This paper's marked key nonetheless names increased sodium influx as the mechanism; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer for the mechanism of presynaptic inhibitory potentials, while flagging that standard neurophysiology attributes presynaptic inhibition to increased chloride permeability (primary afferent depolarisation), not increased sodium influx.

## pitfalls
Treating this concept as authoritative teaching on presynaptic inhibition — increased chloride permeability, producing primary afferent depolarisation and reduced presynaptic calcium influx, is the standard mechanism; increased sodium influx is depolarising but not the accepted presynaptic-inhibition pathway.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
neuro

## primary_node_id


## secondary_node_ids


## topic
Nerve physiology

## subtopic
Synaptic transmission

## microtopic
Presynaptic inhibition

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-MUSCLE-NERVE-PHYSIOLOGY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.55

## weight_confidence
0.25

## confidence
0.3

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which one of the following is the mechanism of pre-synaptic inhibitory potential? a) Increased Cl- permeability b) Increased K+ outflux c) Increased Na+ influx d) Increased Ca++ permeability" ANSWER: c (circled, confirmed by render --force, Fakous MSK Summer 2024.pdf p.5 Q29)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (increased Na+ influx) conflicts with standard neurophysiology, which attributes presynaptic inhibition to increased chloride permeability on the presynaptic terminal (primary afferent depolarisation reducing calcium influx and transmitter release), the mechanism listed as option (a). A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-9BC1EF2E623E6F

## label
The paper's marked key attributes the myosin cross-bridge binding site, rather than tropomyosin binding, to troponin T

## canonical_key
muscle.troponin-t-myosin-crossbridge-claim

## aliases
Troponin T function
Troponin subunits
Troponin I and C

## arabic_label


## arabic_aliases


## definition
Troponin is built of three subunits, each defined by one binding partner: troponin C binds calcium and initiates contraction; troponin I binds actin and, at rest, holds the troponin-tropomyosin complex in its blocking position; troponin T binds tropomyosin, anchoring the troponin complex onto it. None of the three troponin subunits is itself the myosin cross-bridge's binding site — that site lies on actin, exposed once calcium-bound troponin C causes tropomyosin to shift. This paper's marked key nonetheless names "the binding site for the myosin cross-bridge" as troponin T's function; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer for troponin T's function, while flagging that standard physiology defines troponin T by its tropomyosin-binding role, not as the myosin cross-bridge binding site (a role that belongs to actin itself).

## pitfalls
Treating this concept as authoritative teaching on troponin T — its defining function is binding tropomyosin (see the pending concept CON-MSK-287D88DF2F6B8C, whose own definition states this for all three subunits); the myosin cross-bridge binding site is on actin, not on any troponin subunit.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Muscle physiology

## subtopic
Regulatory proteins

## microtopic
Troponin subunits

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-MUSCLE-NERVE-PHYSIOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-287D88DF2F6B8C

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.45

## clinical_relevance
0.2

## academic_relevance
0.55

## weight_confidence
0.3

## confidence
0.35

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Regarding the regulatory proteins, which of the following is the function of troponin-T? a) It inhibits myosin ATPase b) It is a calcium binding protein c) It is the binding site for myosin cross-bridge d) It binds troponin with tropomyosin" ANSWER: c (corrupted-glyph mark, confirmed by render --force, Fakous MSK Summer 2024.pdf p.5 Q33)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (myosin cross-bridge binding site) conflicts with the pending concept CON-MSK-287D88DF2F6B8C (103-BMS-physiology-concepts.md), whose own definition states troponin T's defining function is binding tropomyosin (option d in this question). A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication. This concept was minted fresh rather than overlaid onto CON-MSK-287D88DF2F6B8C to avoid attaching a conflicting claim to that already-correct pending record.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-813A3CBDC1C458

## label
The paper's marked key names ATP as the main, unlimited energy source for muscle during the period of recovery

## canonical_key
muscle.recovery-period-energy-source-claim

## aliases
Muscle recovery period energy source
Free fatty acid oxidation
Oxygen debt repayment

## arabic_label


## arabic_aliases


## definition
During the recovery period after muscular exercise, elevated oxygen consumption (the oxygen debt) is used chiefly to oxidise free fatty acids, replenishing phosphocreatine and ATP stores and clearing accumulated lactate; free fatty acid oxidation is considered the main, functionally unlimited fuel source available during this period, since fat stores vastly exceed the muscle's own minute, rapidly depleted ATP reserve. ATP itself is the immediate energy currency consumed by contraction, not a store the body can call "unlimited" — muscle ATP stores are small and are what recovery-period metabolism is busy replenishing, not drawing on as a source. This paper's marked key nonetheless names ATP as the main, unlimited energy source during recovery; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer for the main, unlimited energy source during the muscle recovery period, while flagging that standard physiology instead names free fatty acid oxidation for this role, since ATP itself is a small, rapidly depleted store being replenished, not an unlimited source.

## pitfalls
Treating this concept as authoritative teaching on recovery-period metabolism — free fatty acid oxidation, powering the elevated oxygen consumption of the recovery period, is the standard "main, unlimited" fuel answer; ATP is the currency being restored, not the source funding that restoration.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## topic
Muscle physiology

## subtopic
Muscle energetics

## microtopic
Recovery period metabolism

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-MUSCLE-NERVE-PHYSIOLOGY

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.5

## weight_confidence
0.25

## confidence
0.3

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Regarding energy for the muscle, what is the main, unlimited and major source of energy in period of recovery? a) ATP b) Free fatty acid c) Creatine phosphate d) Glucose" ANSWER: a (circled, confirmed by render --force, Fakous MSK Summer 2024.pdf p.5 Q34)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key (ATP) conflicts with standard teaching that free fatty acid oxidation, not ATP itself, is the main functionally-unlimited fuel source during the recovery period's elevated oxygen consumption; muscle ATP stores are small and are what recovery metabolism replenishes, not draws on. A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-NEU-09CF6CD84BC47F

## label
The paper's marked key describes skeletal muscle chronaxie as variable compared to that of its nerve, rather than longer

## canonical_key
excitability.skeletal-muscle-chronaxie-vs-nerve

## aliases
Skeletal muscle chronaxie
Nerve vs muscle chronaxie
Strength-duration curve comparison

## arabic_label


## arabic_aliases


## definition
Chronaxie, the minimum stimulus duration needed at twice rheobase to evoke a response (see the live concept CON-NEU-105A7842809DC1), differs by tissue: nerve fibres, with their fast-responding voltage-gated channels, have a short chronaxie, while normally-innervated skeletal muscle fibres, which respond more slowly, have a longer chronaxie than the nerve supplying them — a difference that becomes dramatically larger after denervation. This paper's marked key nonetheless describes skeletal muscle chronaxie as merely "variable compared to that of its nerve" rather than specifically longer; it is authored to the paper's own printed/hand-drawn key per this lane's standing rule — see `## uncertainty`.

## explicit_objective
State the paper's own marked answer comparing skeletal muscle chronaxie to that of its nerve, while flagging that standard teaching specifically describes normally-innervated skeletal muscle chronaxie as longer than that of its nerve, not merely "variable."

## pitfalls
Treating this concept as authoritative teaching on the muscle-nerve chronaxie comparison — the standard, specific comparison is that skeletal muscle chronaxie is longer than its nerve's, a fact this paper's own key states only vaguely.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
neuro

## primary_node_id


## secondary_node_ids


## topic
Nerve physiology

## subtopic
Excitability

## microtopic
Chronaxie

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-MUSCLE-NERVE-PHYSIOLOGY

## related_article_ids


## related_concept_ids
CON-NEU-105A7842809DC1

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.5

## weight_confidence
0.25

## confidence
0.35

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Both nerve and muscles are excitable tissues, which one of the following is a character of skeletal muscle chronaxie? a) Shorter than that of its nerve b) Variable compared to its nerve c) Equal to that of its nerve d) Longer than that of its nerve" ANSWER: b (circled, confirmed by render --force, Fakous MSK Summer 2024.pdf p.5 Q36)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The marked key ("variable compared to its nerve") is vaguer than, and arguably in tension with, the standard specific teaching that normally-innervated skeletal muscle chronaxie is longer than that of its nerve (option d). This concept was minted fresh, cross-linked to the live chronaxie-definition concept CON-NEU-105A7842809DC1 rather than overlaid onto it, since that live record only defines the term and does not itself carry the muscle-vs-nerve comparison. A single, unambiguous mark on this question, so authored per the printed-key-stands rule rather than held; flagged for reviewer attention before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous MSK Summer 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.
