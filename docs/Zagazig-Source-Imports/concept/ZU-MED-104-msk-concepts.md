<!--
  ZU-MED-104 (Musculoskeletal & Integumentary) — 17 NEW concepts minted for
  the 36-SBA cluster authored from `Fakous MSK Final 2024.pdf` (Zagazig's
  Fakous campus, Faculty of Medicine — provenance ruled usable by the chief
  of staff, 2026-09-01; see LANE-CARD.md §7). This paper had no PDF text
  layer (Microsoft Lens scan) and needed `pagetext.mjs ocr` before the
  hand-drawn-ink key trap (LANE-CARD.md §7) could even be read; every key
  below was then confirmed by `render --force` against the scanned image,
  one render per page (coverage/ZU-MED-104-triage.md).

  Search-before-mint run against `Instruction Manual for Content
  Creation/tools/find-existing.mjs` for every concept below (the module's own
  `scripts/content/find-existing.mjs` does not exist in this checkout; the
  manual's tool is the one that works). 19 of the 36 questions' concepts hit
  existing records instead (3 live, 16 pending) and are handled as sparse
  overlays, not here — see `concept/ZU-MED-104-msk-live-overlays.md` and
  `pending-live/ZU-MED-104-msk-pending-overlays.md`. Ids minted with
  `mint-concept-id.mjs`, checked against 13,578 existing ids, 0 collisions.

  No evidence-store `src_…` resource exists for this PDF (Telegram-dump
  staging material, not in `corpus-source-index.json`); `resource_ids` are
  left blank per 12-resources.md option 3 — the citation lives in each
  question's `source_citation` in the question batch.

  Import: Admin › Concepts › Import.
-->

# Item

## id
CON-MSK-A9C1424E9CB9B1

## label
The axis of the hand for describing abduction and adduction of the fingers passes through the middle finger

## canonical_key
hand.axis-through-middle-finger

## aliases
Axis of the hand
Middle finger as reference axis
Abduction/adduction reference line of the hand

## arabic_label


## arabic_aliases


## definition
Finger abduction and adduction are described relative to a longitudinal reference line through the hand, and that line runs through the middle finger (the third digit), not the wrist's own long axis or any other finger. Fingers moving away from this line (spreading) are abducting; fingers moving toward it are adducting. Because the axis is the middle finger itself, the middle finger is conventionally described as having no abduction/adduction of its own (it defines the line), while the index, ring and little fingers abduct away from and adduct toward it. This is the same reference line the palmar and dorsal interossei use to define their actions.

## explicit_objective
State that the axis of the hand for finger abduction/adduction passes through the middle finger, not another digit or the wrist.

## pitfalls
Assuming the axis of the hand is the same as the axis used for toe abduction/adduction (the second toe) — the two limbs use different reference digits (hand: middle finger/3rd digit; foot: second toe/2nd digit), a distinction the exam tests directly by asking for one or the other.

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
Upper limb anatomy

## subtopic
Hand

## microtopic
Terms of movement

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
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The axis of hand is a line passes through which of the following fingers? a) Index. b) Middle. c) Ring. d) Little." ANSWER: b (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.2 Q2, confirmed by render --force)

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-9F295DCA61C8E6

## label
A mass compressing the fifth (extensor digiti minimi) compartment of the extensor retinaculum causes loss of extension of the little finger's joints

## canonical_key
wrist.fifth-extensor-compartment-edm-paralysis

## aliases
Fifth extensor compartment
Extensor digiti minimi compartment
Extensor retinaculum compartments

## arabic_label


## arabic_aliases


## definition
The extensor retinaculum divides the back of the wrist into six osseofibrous compartments, from lateral to medial: (1) abductor pollicis longus and extensor pollicis brevis, (2) extensor carpi radialis longus and brevis, (3) extensor pollicis longus, (4) extensor digitorum and extensor indicis (with the posterior interosseous nerve deep to them), (5) extensor digiti minimi alone, and (6) extensor carpi ulnaris. A localized mass — a ganglion is the classic example — compressing the fifth compartment specifically entraps only extensor digiti minimi, so the deficit is confined to loss of extension of the little finger's metacarpophalangeal and interphalangeal joints, with the ring, middle and index fingers (extended by extensor digitorum in compartment 4) unaffected.

## explicit_objective
Name extensor digiti minimi as the sole tenant of the fifth extensor compartment, and state that its compression selectively loses extension of the little finger.

## pitfalls
Assuming any compartment mass affects wrist extension generally. Each of the six compartments holds a distinct, mostly non-overlapping set of tendons, so compression is compartment-specific — extensor carpi radialis longus/brevis (compartment 2) and extensor carpi ulnaris (compartment 6) are unaffected by a fifth-compartment mass, so wrist extension itself is preserved.

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


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.5

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.6

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A localized mass that compresses the fifth compartment of extensor retinaculum. Which of the following action may result? a) Weakness of flexion of wrist joint. b) Loss of extension of wrist joint. c) Loss of extension of joints of little finger. d) Loss of extension of joints of index finger." ANSWER: c (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.2 Q3, confirmed by render --force)

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-D8CF9BB2FF6C77

## label
A medial epicondyle fracture injures the ulnar nerve behind it, causing weakness (not loss) of wrist flexion because flexor carpi radialis (median) is spared

## canonical_key
ulnarnerve.medialepicondyle-fracture-wrist-flexion-weakness

## aliases
Medial epicondyle fracture nerve injury
Ulnar nerve wrist flexion weakness
Ulnar claw hand wrist deficit

## arabic_label


## arabic_aliases


## definition
The ulnar nerve grooves the back of the medial epicondyle of the humerus as it passes from the arm into the forearm, making it the nerve at risk in a medial epicondyle fracture. At the wrist, flexion is produced jointly by flexor carpi radialis (median nerve) and flexor carpi ulnaris (ulnar nerve), with the long finger flexors contributing when they cross the joint. An ulnar nerve injury at the elbow removes flexor carpi ulnaris and the ulnar half of flexor digitorum profundus from the flexor group, but flexor carpi radialis and the median-supplied half of flexor digitorum profundus continue to flex the wrist — so the deficit is weakness of flexion, not its complete loss.

## explicit_objective
State that a medial epicondyle fracture injures the ulnar nerve, and that the resulting wrist deficit is weakness (not loss) of flexion because the median-supplied flexors are spared.

## pitfalls
Concluding "loss" rather than "weakness" of wrist flexion after an isolated ulnar nerve injury — flexor carpi radialis (median) and the radial half of flexor digitorum profundus are unaffected, so some flexion power always remains.

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
Ulnar nerve at the medial epicondyle

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-UPPER-LIMB-ANATOMY

## related_article_ids


## related_concept_ids
CON-MSK-24A0858459A59D

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.5

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.65

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A- 17-year-old girl comes to local hospital after fracture to her medial epicondyle. Examination of patient reveals severe injury to nerve lies behind the fractured bone. Which of the following conditions in wrist that occurs secondary to this injured nerve? a) Loss of extension. b) Weakness of extension. c) Loss of flexion. d) Weakness of flexion." ANSWER: d (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.2 Q5, confirmed by render --force)

## merge_ids


## rejected_merge_candidate_ids
CON-MSK-24A0858459A59D (101-ISK, pending) — same injury mechanism (ulnar nerve at medial epicondyle) but a different downstream fact (index-finger adduction via interossei, not wrist flexion power); cross-linked via related_concept_ids, not merged.

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-FFB8E902B96AD0

## label
In a wrist fracture from a fall, the distal end of the ulna is the structure normally spared when the radial side bears the impact

## canonical_key
wrist.falx-distal-ulna-normal-after-radius-injury

## aliases
Distal radius fracture sparing the ulna
FOOSH wrist injury structures
Wrist joint fracture pattern

## arabic_label


## arabic_aliases


## definition
A fall onto the wrist joint typically loads the radial (thumb) side of the wrist first, since the distal radius is the principal weight-bearing structure of the forearm at the wrist (it carries roughly five-sixths of the axial load, the ulna the rest through the triangular fibrocartilage complex). A severe fall-related wrist injury pattern therefore commonly damages the distal radius, the scaphoid, and the fibrocartilaginous disc (TFCC) that separates the ulnar head from the carpus — while the distal end of the ulna itself, which does not directly articulate with the carpal bones, is the structure most likely to remain structurally normal.

## explicit_objective
State that in a severe fall-related wrist injury, the distal end of the ulna is the structure most likely to be spared, because it is the distal radius (not the ulna) that bears the direct carpal load.

## pitfalls
Assuming all wrist structures are equally likely to be injured in a fall — the distal radius, scaphoid and TFCC bear the direct load and are the structures classically damaged; the ulnar head, which does not articulate directly with the carpal row, is comparatively spared.

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
Wrist joint

## microtopic
Wrist joint trauma

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
ZU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.5

## weight_confidence
0.35

## confidence
0.6

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A -\17-year- boy falls from motorcycle on his wrist joint. On examination the physician revealed sever damage of his wrist joint. Which of the following structures is normal? a) distal end of radius b) distal end of ulna c) scaphoid carpal bone d) disc fibrocartilaginous" ANSWER: b (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.2 Q9, confirmed by render --force)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The printed key names the ulna as spared, consistent with the ulna's non-articulating relationship to the carpus, but the paper does not state the injury mechanism beyond "severe damage of his wrist joint" — treated as a FOOSH-type radial-sided injury pattern by clinical convention rather than a stated fact.

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-FD71E5AF4A7E33

## label
Gluteal intramuscular injection is given in the upper lateral quadrant to protect the sciatic nerve

## canonical_key
gluteal.im-injection-upper-lateral-quadrant-sciatic

## aliases
Gluteal injection safe zone
Upper lateral quadrant injection
Sciatic nerve injection injury

## arabic_label


## arabic_aliases


## definition
The gluteal region is conventionally divided into four quadrants by a vertical and a horizontal line crossing at the greater trochanter. The sciatic nerve descends through the lower quadrants, roughly midway between the ischial tuberosity and the greater trochanter, so an intramuscular injection placed in the upper lateral (outer upper) quadrant — over gluteus medius, away from the nerve's course — avoids the risk of directly injuring the sciatic nerve that a poorly placed injection into the lower or medial gluteal region carries.

## explicit_objective
State that the upper lateral quadrant is the safe zone for gluteal intramuscular injection because it avoids the sciatic nerve's course through the lower gluteal region.

## pitfalls
Assuming any quadrant is equally safe — the upper medial and both lower quadrants carry the sciatic nerve, the inferior gluteal vessels/nerve, and the pudendal neurovascular bundle; only the upper lateral quadrant, overlying gluteus medius, keeps the needle away from all of them.

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
Gluteal region

## microtopic
Gluteal intramuscular injection

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
0.5

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.75

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Injection of gluteal region is done through upper lateral quadrant to protect which of the following structure? a) Superior gluteal artery. b) Superior gluteal nerve. c) Sciatic nerve. d) Internal pudendal artery." ANSWER: c (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.2-3 Q10, confirmed by render --force)

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-C68B915B0A6EBD

## label
Articularis genu retracts the suprapatellar synovial membrane and bursa during extension of the knee

## canonical_key
knee.articularis-genu-synovial-membrane-retraction

## aliases
Articularis genu
Suprapatellar bursa retraction
Knee synovial membrane muscle

## arabic_label


## arabic_aliases


## definition
Articularis genu is a thin, often multi-slipped muscle arising from the front of the lower femoral shaft and inserting into the synovial membrane of the knee joint capsule and the suprapatellar bursa. It is functionally a detached part of vastus intermedius, and its sole action is to pull the suprapatellar bursa and the redundant, loose synovial membrane proximally during extension of the knee, preventing that slack tissue from being pinched between the femur and patella as the joint straightens.

## explicit_objective
Name articularis genu as the muscle that retracts the suprapatellar synovial membrane/bursa during knee extension, protecting it from being trapped in the joint.

## pitfalls
Attributing suprapatellar bursa/synovial protection to vastus medialis or vastus lateralis — both are prime extensors of the knee but neither inserts into the synovial membrane itself; only articularis genu, a distinct deep slip, performs that specific retraction.

## concept_type
structure_function_relationship

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
Thigh and knee

## microtopic
Articularis genu

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.6

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A39-year-old patient suffers from damage of his knee synovial membrane during the extension of his leg. Which of the following muscles most likely to be affected? a) Vastus medialis. b) Vastus lateralis. c) Articularis genu. d) Tensor facia lata." ANSWER: c (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.3 Q11, confirmed by render --force)

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-6BC15702C41224

## label
Sartorius, together with the other tailor-position flexors, allows sitting with hip and knee flexed and the leg externally rotated

## canonical_key
thigh.sartorius-tailor-position

## aliases
Sartorius tailor position
Tailor's muscle
Cross-legged sitting muscle

## arabic_label


## arabic_aliases


## definition
Sartorius, the longest muscle in the body, runs obliquely across the front of the thigh from the anterior superior iliac spine to the upper medial tibia. Acting at both the hip (flexion, abduction, lateral rotation) and the knee (flexion, weak medial rotation of the flexed knee), it is the single muscle whose combined actions let a person sit cross-legged in the "tailor's position" (hip flexed, abducted and laterally rotated, knee flexed) — the action pattern that gives the muscle its Latin name (sartor, "tailor"). Damage to sartorius (or its femoral nerve supply) impairs the ability to flex the hip and knee together into this position.

## explicit_objective
Name sartorius as the muscle whose combined hip-and-knee actions produce the tailor's (cross-legged) sitting position, and state that its damage impairs sitting that way.

## pitfalls
Confusing sartorius with the other thigh flexors (pectineus, adductor longus/brevis) listed as distractors — those adduct rather than abduct and laterally rotate the hip, so they cannot reproduce the tailor position on their own even though they also flex the hip.

## concept_type
structure_function_relationship

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
Thigh

## microtopic
Sartorius

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A patient comes to your clinic with inability to flex hip and knee joints. He cannot sit in a tailor position. Which of the following muscles is damaged? a) Pectineus. b) Adductor longus. c) Sartorius. d) Adductor brevis." ANSWER: c (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.3 Q13, confirmed by render --force)

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-03F3DA894D0C4D

## label
Tibialis anterior arises mainly from the tibia and interosseous membrane, so it keeps functioning after a fibula fracture that paralyses the fibula-attached dorsiflexors

## canonical_key
leg.tibialis-anterior-tibial-origin-spared-fibula-fracture

## aliases
Tibialis anterior origin
Fibula fracture sparing tibialis anterior
Anterior compartment leg muscle origins

## arabic_label


## arabic_aliases


## definition
The four muscles of the anterior compartment of the leg dorsiflex the ankle, but they do not all arise from the same bone: extensor hallucis longus, extensor digitorum longus and peroneus (fibularis) tertius arise mainly from the fibula and the interosseous membrane, while tibialis anterior arises mainly from the lateral surface of the tibia and the interosseous membrane. A severe fibula fracture that damages the muscles attached to it directly disables the three fibula-based dorsiflexors, but tibialis anterior — attached chiefly to the tibia — keeps its bony origin intact and continues to function, even though all four muscles share the same deep peroneal nerve supply.

## explicit_objective
State that tibialis anterior's tibial (not fibular) origin lets it keep functioning after a fibula fracture that damages the other three anterior-compartment dorsiflexors.

## pitfalls
Reasoning from nerve supply alone — all four anterior-compartment muscles share the deep peroneal nerve, so a nerve-based answer would predict all four are equally affected. The deciding factor here is bony origin, not nerve supply, because the injury is a direct fibula fracture, not a nerve lesion.

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
Anterior compartment of the leg

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
0.5

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.6

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"ray examination shows sever damage to fibula with muscles attached to it in car accident. On -year-old boy is involved... Which of the following muscles is normally functioning? a) extensor halluces longus b) extensor digitorum longus c) peroneus tertius d) Tibialis anterior" ANSWER: d (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.3 Q15, confirmed by render --force)

## merge_ids


## rejected_merge_candidate_ids
Related pending AU-MED-105 anterior-compartment concept (docs/import-ready/concept/AU-MED-105-anatomy-concepts.md) — states the muscle list and shared nerve supply but not this fibula-fracture-specific origin fact; cross-linked, not merged.

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-56D528233B4749

## label
Tibial nerve injury weakens inversion of the foot because tibialis posterior, its chief invertor, is denervated

## canonical_key
leg.tibial-nerve-injury-weakness-of-inversion

## aliases
Tibial nerve injury inversion weakness
Tibialis posterior denervation
Posterior compartment nerve injury

## arabic_label


## arabic_aliases


## definition
The tibial nerve supplies the entire posterior compartment of the leg, including tibialis posterior, the strongest invertor of the foot. Because inversion also receives a smaller contribution from tibialis anterior (deep peroneal nerve, anterior compartment), a tibial nerve injury does not abolish inversion completely — it weakens it, in the same partial pattern that applies to plantarflexion (weakened, not lost, because the tibial nerve is the sole supply of the prime plantarflexors but some accessory action persists depending on the injury level).

## explicit_objective
State that tibial nerve injury weakens (rather than abolishes) inversion of the foot, since tibialis posterior is denervated but tibialis anterior contributes a smaller, nerve-independent share.

## pitfalls
Defaulting to "loss of inversion" reflexively — tibialis posterior is the strongest invertor and is tibial-supplied, but it is not the only muscle contributing to inversion, so the deficit from an isolated tibial nerve injury is weakness rather than complete loss.

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
Tibial nerve

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
0.5

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.6

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
"A-16-year boy comes to local hospital after motorcycle accident. Examination of patient reveals severe injury to tibial nerve. Which of the following conditions occurs secondary to this injury? a) Loss of dorsiflexion of ankle. b) Weakness of inversion. c) Weakness of dorsiflexion. d) Loss of inversion." ANSWER: b (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.3 Q17, confirmed by render --force)

## merge_ids


## rejected_merge_candidate_ids
Related pending AU-MED-105 posterior-compartment/tibial-nerve concept (docs/import-ready/concept/AU-MED-105-anatomy-concepts.md) — states the muscle list and normal function, not this injury-deficit fact; cross-linked, not merged.

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-DER-B4778F5BB4C3FF

## label
The hair matrix, at the base of the hair bulb, is the region whose cells are considered stem cells for hair growth

## canonical_key
hairfollicle.matrix-cells-are-stem-cells

## aliases
Hair matrix
Hair bulb stem cells
Hair follicle stem cell region

## arabic_label


## arabic_aliases


## definition
The hair follicle's proliferative activity is concentrated at the hair bulb, where the hair matrix — a cap-shaped layer of cells surrounding the dermal papilla — divides continually to produce the hair shaft and its internal root sheath. These matrix cells, along with a separate bulge-region stem cell population higher in the follicle, are regarded as the stem/progenitor cells responsible for hair growth, distinguishing them from the dermal papilla (a connective-tissue, non-epithelial inductive structure) and the external and internal root sheaths (differentiated epithelial layers, not the proliferative source).

## explicit_objective
Identify the hair matrix, not the dermal papilla or root sheaths, as the hair follicle region whose cells are considered stem cells.

## pitfalls
Confusing the hair matrix (the proliferative epithelial cell population) with the dermal papilla (the underlying connective-tissue inductive structure it surrounds) — the papilla signals to the matrix but is not itself epithelial or the stem-cell source being asked about here.

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
Hair follicle

## microtopic
Hair matrix

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.6

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Cells in which of the following regions of the hair follicle are considered as stem cells? a) Dermal papilla b) External root sheath c) Hair matrix d) Internal root sheath" ANSWER: c (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.4 Q22, confirmed by render --force)

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-770450C94FB6C2

## label
Thick (myosin) filaments of the skeletal muscle sarcomere are present only in the A band

## canonical_key
sarcomere.thick-filaments-confined-to-a-band

## aliases
Thick filament location
Myosin filament in A band
Sarcomere band composition

## arabic_label


## arabic_aliases


## definition
The A band of the sarcomere is defined by, and named for, the presence of thick (myosin) filaments — it is the only sarcomere zone that contains them. Thin (actin) filaments extend from the Z line through the I band and partway into the A band, overlapping the thick filaments there, but the I band itself (thin filaments only) and the central H zone during relaxation (thick filaments only, no overlap) are distinguished precisely by whether thick filaments, thin filaments, or both are present.

## explicit_objective
State that thick (myosin) filaments occupy the A band only, distinguishing this from the composition of the I band and H zone.

## pitfalls
Saying thick filaments are "crossed by the Z line" or "present in the I band" — both are properties of thin (actin) filaments, which run from the Z line into the A band; the Z line marks the ends of the sarcomere/thin filament attachment, not a boundary thick filaments cross.

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
Thick and thin filaments

## nanotopic


## modules
ZU-MED-104

## article_ids
ART-MSK-ZU104-HISTOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-0824FE988ADA00

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
ZU_Y1=0.5

## clinical_relevance
0.2

## academic_relevance
0.6

## weight_confidence
0.35

## confidence
0.7

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is correct about the thick filaments of skeletal muscle fibers? a) Are present in the A bands b) Consist of actin and myosin c) Are crossed by the Z line d) Are present in the I bands" ANSWER: a (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.4 Q24, confirmed by render --force)

## merge_ids


## rejected_merge_candidate_ids
CON-MSK-0824FE988ADA00 (103-BMS-histology, pending) — states the sarcomere is the segment between two Z lines, a related but distinct fact from thick-filament A-band localisation; cross-linked, not merged.

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-DER-F007227C0C1633

## label
Thin skin's dermis has few dermal papillae, unlike the numerous papillae of thick skin

## canonical_key
skin.thin-skin-dermis-sparse-papillae

## aliases
Thin skin dermis
Thick vs thin skin dermal papillae
Dermal papillae distribution

## arabic_label


## arabic_aliases


## definition
Thick skin (palms and soles) has a dermis thrown into numerous, tall dermal papillae that interdigitate with a correspondingly thick, ridged epidermis (producing fingerprints) to resist high mechanical stress. Thin skin, covering most of the body, is flatter at the dermo-epidermal junction, with comparatively few and shallow dermal papillae. Thin skin's dermis does, however, retain hair follicles, sensory corpuscles and melanophores (pigment-containing cells) — the numerous dermal papillae is specifically a thick-skin feature, so it is the one listed option that is not a character of thin skin's dermis.

## explicit_objective
State that thin skin's dermis has few dermal papillae, distinguishing it from thick skin, while it retains hair follicles, sensory corpuscles and melanophores.

## pitfalls
Assuming thin and thick skin differ only in the epidermis (keratinisation, presence of stratum lucidum) — the dermis differs too, most obviously in dermal papilla number and height, which is the specific fact this question isolates.

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
Skin

## microtopic
Thin vs thick skin

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.25

## academic_relevance
0.6

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which one of the following is not a character of the dermis of thin skin? a) Numerous dermal papillae b) Melanophores c) Hair follicles d) Sensory corpuscles" ANSWER: a (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.4 Q25, confirmed by render --force)

## merge_ids


## rejected_merge_candidate_ids
Related pending 103-BMS/Ain-Shams thin-vs-thick-skin concept (docs/import-ready/concept/103-BMS-histology-concepts.md) — states the general epidermis/appendage/papillae difference, not this specific "numerous papillae is a thick-skin feature" fact; cross-linked, not merged.

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-F9DD4BBAC7D900

## label
Smooth muscle maintains its contraction longer than skeletal muscle, without correspondingly greater fatigue

## canonical_key
smoothmuscle.contraction-maintained-longer-than-skeletal

## aliases
Smooth muscle sustained contraction
Latch state
Smooth vs skeletal muscle contractility

## arabic_label


## arabic_aliases


## definition
Smooth muscle contracts and relaxes far more slowly than skeletal muscle, but its defining contractile advantage is that it can sustain tension for prolonged periods (the "latch" state) at a low energy cost, without the rapid fatigue skeletal muscle shows under sustained tetanic contraction. This is distinct from a rapid onset of contraction/relaxation (a skeletal, not smooth, muscle property), from tension that continuously increases during stretching (smooth muscle actually shows stress relaxation — tension falls back toward baseline when stretched and held), and from being easily fatigued (smooth muscle is comparatively fatigue-resistant).

## explicit_objective
State that smooth muscle's distinguishing contractile property is a maintained (latch) contraction longer than skeletal muscle can sustain, not rapid onset/relaxation or easy fatigability.

## pitfalls
Assuming smooth muscle behaves like a slower version of skeletal muscle in every respect — its resistance to fatigue during sustained contraction, and its stress-relaxation response to stretch, are qualitatively different from skeletal muscle, not simply slower versions of the same properties.

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
Smooth muscle

## microtopic
Smooth muscle contractility

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
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.6

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of these characteristics distinguishes smooth muscle contractility? a) It is easily fatigued b) Has rapid onset of contraction and relaxation. c) Its contraction is maintained than skeletal muscle. d) Its tension is maintained and continuously increases during stretching" ANSWER: c (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.4 Q29, confirmed by render --force)

## merge_ids


## rejected_merge_candidate_ids
Related pending 103-BMS smooth-muscle-contraction-factors concept (docs/import-ready/concept/103-BMS-physiology-concepts.md) — covers modifying factors, not this specific contractility-comparison fact; cross-linked, not merged.

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-MSK-C901502C99C892

## label
The staircase (treppe) phenomenon is caused by increasing calcium release from the sarcoplasmic reticulum with successive twitches

## canonical_key
muscle.treppe-staircase-calcium-mechanism

## aliases
Treppe phenomenon
Staircase phenomenon
Positive staircase effect

## arabic_label


## arabic_aliases


## definition
When a fresh (unwarmed, unstimulated) skeletal muscle is stimulated with a series of identical maximal twitches at low frequency, each successive twitch develops slightly more tension than the last for the first several contractions, before plateauing — the staircase (treppe, Bowditch) phenomenon. It results from a progressive rise in cytosolic calcium available to the contractile apparatus: each stimulus releases calcium from the sarcoplasmic reticulum faster than the muscle's calcium pumps can fully re-sequester it, so residual calcium accumulates over the first few twitches, increasing cross-bridge activation and hence tension until a new steady state is reached.

## explicit_objective
State that the treppe (staircase) phenomenon is caused by progressively increased calcium release/accumulation from the sarcoplasmic reticulum across successive twitches.

## pitfalls
Confusing treppe with tetanus or summation — treppe is a genuine, small, self-limited increase in single-twitch tension over the first few stimuli of a train at low frequency, caused by a calcium-handling mechanism, not by mechanical/temporal summation of overlapping twitches (which is the mechanism of tetanus at higher stimulation frequencies).

## concept_type
mechanism

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
Skeletal muscle twitch properties

## microtopic
Treppe phenomenon

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
ZU_Y1=0.5

## clinical_relevance
0.2

## academic_relevance
0.6

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the cause of stair-case (treppe) phenomenon? a) Increasing K+ intracellular. b) Decreasing Na+ intracellular. c) Decrease temperature of the muscle. d) Increase Ca++ release from sarcoplasmic reticulum." ANSWER: d (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.4 Q31, confirmed by render --force)

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-NEU-1A249087FE95F2

## label
Myasthenia gravis can be fatal when it affects the respiratory muscles

## canonical_key
myastheniagravis.respiratory-muscle-involvement-death

## aliases
Myasthenia gravis respiratory failure
Myasthenic crisis
Fatal myasthenia gravis

## arabic_label


## arabic_aliases


## definition
Myasthenia gravis is an autoimmune disease of the neuromuscular junction (antibodies against the postsynaptic acetylcholine receptor) that produces fatigable skeletal muscle weakness, worsened rather than improved by exercise. When the disease involves the muscles of respiration (diaphragm and intercostals), the resulting weakness can progress to a myasthenic crisis — respiratory failure severe enough to require ventilatory support — making respiratory muscle involvement the mechanism by which myasthenia gravis can lead to death, distinct from its more common, non-fatal ocular and limb-girdle presentations.

## explicit_objective
State that myasthenia gravis is potentially fatal specifically when it involves the respiratory muscles (myasthenic crisis), not from its disease process in general.

## pitfalls
Selecting "improves by muscular exercise" or "more frequent in males" as the defining feature — myasthenia gravis characteristically worsens with exercise and is more common in females; respiratory muscle involvement is the fact tested here as the mechanism of death.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
neuro

## primary_node_id


## secondary_node_ids


## topic
Neuromuscular junction physiology

## subtopic
Myasthenia gravis

## microtopic
Myasthenic crisis

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
0.5

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.7

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Regarding myasthenia gravis, which of the following is appropriate? a) Improve by muscular exercise b) Is frequently in male than female c) If it affects the respiratory muscles leads to death d) Occurs as a result of decreased cholinesterase activity" ANSWER: c (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.5 Q33, confirmed by render --force)

## merge_ids


## rejected_merge_candidate_ids
Related pending 103-BMS myasthenia-gravis-mechanism concept (docs/import-ready/concept/103-BMS-mcq-vitamins-nerve-concepts.md) — states the autoantibody mechanism, not this respiratory/death fact; cross-linked, not merged.

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-NEU-53A1528D25C66A

## label
Mechanical pressure on a nerve decreases its excitability

## canonical_key
nerve.mechanical-pressure-decreases-excitability

## aliases
Nerve compression excitability
Factors decreasing nerve excitability
Mechanical pressure nerve block

## arabic_label


## arabic_aliases


## definition
Nerve excitability — the ease with which a stimulus triggers an action potential — is raised by factors such as warming, alkalosis and decreased extracellular calcium (which lowers the threshold), and lowered by factors including mechanical pressure/compression, cooling, acidosis and increased extracellular calcium. Mechanical pressure applied to a nerve trunk (sustained limb compression is the clinical example) distorts the axon and impairs local ion channel function, raising the threshold for excitation and, if sustained, producing a conduction block — the physiological basis of a pressure-induced nerve palsy.

## explicit_objective
State that mechanical pressure on a nerve decreases its excitability, in contrast to warming, alkalosis, and decreased extracellular calcium, which increase it.

## pitfalls
Grouping mechanical pressure with the excitability-increasing factors by assuming "more stimulus" always means "more excitable" — pressure is a distorting, threshold-raising insult, not an excitatory one, and belongs with cooling and acidosis as an excitability-lowering factor.

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
Nerve excitability

## microtopic
Factors affecting nerve excitability

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
ZU_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following factors decreases nerve excitability? a) Warming b) Alkalosis c) Mechanical pressure d) Decreased extracellular Ca++" ANSWER: c (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.4-5 Q34, confirmed by render --force)

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-CVS-C6E888D47E1254

## label
Calcium influx is the ion current mainly responsible for the plateau phase of the cardiac muscle action potential

## canonical_key
cardiacmuscle.actionpotential-plateau-calcium-influx

## aliases
Cardiac action potential plateau
Phase 2 cardiac action potential
Calcium plateau phase

## arabic_label


## arabic_aliases


## definition
The cardiac ventricular muscle action potential has five conventional phases: phase 0 (rapid depolarisation, fast Na+ influx), phase 1 (brief early repolarisation), phase 2 (the plateau, sustained by slow inward Ca2+ current through L-type calcium channels balanced against a small outward K+ current), phase 3 (repolarisation, K+ efflux as Ca2+ channels close), and phase 4 (resting potential). The plateau phase is what gives cardiac muscle its long refractory period relative to skeletal muscle, preventing tetanic contraction of the heart, and the calcium entering during it is also what triggers calcium-induced calcium release from the sarcoplasmic reticulum, coupling the action potential to contraction.

## explicit_objective
State that calcium influx (through L-type calcium channels) is the current mainly responsible for the plateau phase of the cardiac action potential.

## pitfalls
Confusing the plateau's calcium current with the rapid sodium influx of phase 0 (upstroke) or the potassium efflux of phase 3 (repolarisation) — each phase of the cardiac action potential is dominated by a different ion current, and the plateau specifically is the calcium-dominated phase.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## topic
Cardiac muscle physiology

## subtopic
Cardiac action potential

## microtopic
Plateau phase

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
0.5

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.5

## academic_relevance
0.65

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In the above curve, label (2) represent the plateau phase of cardiac muscle action potential. Which of the following ion is mainly involved in this phase? a) Ca++ b) Na+ c) K+ d) Cl+" ANSWER: a (hand-drawn-ink key, Fakous MSK Final 2024.pdf p.5 Q36, confirmed by render --force)

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
resourceIds: No evidence-store src_ id exists for Fakous MSK Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.
