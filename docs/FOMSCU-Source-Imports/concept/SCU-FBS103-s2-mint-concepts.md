<!--
  SCU-FBS103 · Foundation 2 — S2 minting pass, first author lane
  (scu-fbs103-author1). 12 concepts genuinely new to the corpus after
  re-verification: `find-existing.mjs` on the final canonical key AND a
  `grep -ril` of 2-3 distinctive terms across every `docs/*-Source-Imports/
  concept/`, `pending-live/` directory, plus a read of every hit body.

  Two of these candidates surfaced automated "live"/"pending" hits that did
  NOT survive that closer read (documented per-record in field_notes and in
  the sibling question seed's own field_notes): `anatomy-frontalis` hit
  SCU-FBS102's own "norma frontalis" skull-landmark concept (a homonym —
  viewing position, not the muscle), and `anatomy-trigeminal-nerve` hit a
  live embryology concept about the trigeminal supplying the first
  pharyngeal arch (a different specific claim from adult anterior-scalp
  sensory territory). Both are minted fresh here rather than reused.

  Ids minted with `mint-concept-id.mjs`, checked against the live snapshot
  and the taken-id scan; none derived for a concept that already exists.
  `atomic_claim_ids` is `[clear]` on every record — this lane is scoped to
  concept, article and question files, and mints no evidence claim or
  citation records, matching the standing convention already documented in
  Kasr's 103-BMS-mcq-lipid-concepts.md. The evidence chain is owed and named
  in the hand-off report, not concealed.

  `primary_node_id` is left blank with a field_note on every record: the
  canonical DIS-* taxonomy nodes could not be resolved from this worktree in
  the time this lane had. `module_subject` carries FOMSCU's own placement
  instead.

  Sources: FOMSCU Foundation 2 own-source quiz-app JSON, keys and stems read
  directly from `06 EOM Exams/*.json`, `07 EOY Exams/*.json` and
  `03 Questions and QBank/Formative 2025*.json` (question numbers cited per
  record) — printed keys stand; every explanation is written fresh in the
  platform's own voice from standard textbook fact, never translated from
  the source JSON's own (FOMNINU-sourced) Arabic explanation field.
-->

# Item

## label
The lateral pterygoid is the muscle of mastication that protrudes the mandible

## id
CON-MSK-D034C2806E7E8D

## canonical_key
anatomy.lateral-pterygoid.mandible-protrusion

## aliases
Lateral pterygoid action
Mandibular protrusion muscle

## arabic_label


## arabic_aliases


## definition
The lateral pterygoid is the muscle of mastication responsible for protruding the mandible. Acting bilaterally, its inferior head — arising from the lateral pterygoid plate — pulls the mandibular condyle and articular disc forward out of the mandibular fossa onto the articular eminence, the movement that opens the jaw and juts the chin forward. Acting unilaterally, one side's lateral pterygoid instead produces the side-to-side grinding motion of chewing. It is the only muscle of mastication that pulls the mandible forward rather than closing it, distinguishing it from the elevators (masseter, temporalis, medial pterygoid).

## explicit_objective
State that the lateral pterygoid protrudes the mandible, and distinguish this action from the elevator muscles of mastication (masseter, temporalis, medial pterygoid).

## pitfalls
Selecting an elevator muscle (masseter or temporalis) by association with "muscle of mastication" generally, without separating protrusion from elevation as distinct actions.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Muscles of mastication

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-ANA-MASTICATION-MUSCLES

## related_article_ids


## related_concept_ids
CON-MSK-F8C46FFF3E9E27 | CON-MSK-E76907CC2EFEDC | CON-MSK-4F0D04FC6348EA

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
SCU-FBS103 > Anatomy > Head and Neck > Muscles of Mastication

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q27 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following muscles of mastication is primarily responsible for the protrusion of the mandible? ... Lateral pterygoid" (FOMSCU Foundation 2 EOM MID 2026, Q27)

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
sourceCandidateIds: find-existing.mjs on "lateral pterygoid" and "mandible protrusion" — 0 genuine matches (the automated pending hits were about the infratemporal fossa's lateral pterygoid PLATE and its relation to medial pterygoid, a different structure/fact from this muscle's own action).
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Temporalis's posterior fibres retract the mandible

## id
CON-MSK-F8C46FFF3E9E27

## canonical_key
anatomy.temporalis.mandible-retraction

## aliases
Temporalis action
Mandibular retraction muscle

## arabic_label


## arabic_aliases


## definition
Temporalis is a broad, fan-shaped muscle of mastication whose fibres converge from the temporal fossa onto the coronoid process of the mandible. Its anterior, near-vertical fibres are the primary elevators of the mandible (jaw closing), while its posterior, more horizontally oriented fibres retract the mandible — pulling a protruded jaw back into its resting position. This dual-direction fibre arrangement is what makes temporalis, uniquely among the muscles of mastication, credited with both elevation and retraction, in contrast to lateral pterygoid (protrusion only) and masseter/medial pterygoid (elevation only).

## explicit_objective
State that temporalis's posterior fibres retract the mandible, distinguishing this from its own anterior fibres' elevation action and from lateral pterygoid's protrusion.

## pitfalls
Attributing retraction to masseter, which is a pure elevator with only a minor retraction component compared to temporalis's dedicated posterior fibres.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Muscles of mastication

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-ANA-MASTICATION-MUSCLES

## related_article_ids


## related_concept_ids
CON-MSK-D034C2806E7E8D | CON-MSK-E76907CC2EFEDC | CON-MSK-4F0D04FC6348EA

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
SCU-FBS103 > Anatomy > Head and Neck > Muscles of Mastication

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY 2025 Q4 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following muscles of mastication is responsible for the retraction of the mandible? ... Temporalis muscle" (FOMSCU Foundation 2 EOY 2025, Q4)

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
sourceCandidateIds: find-existing.mjs on "temporalis retraction" and "mandible retraction" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Masseter inserts on the lateral surface of the mandibular ramus and angle

## id
CON-MSK-E76907CC2EFEDC

## canonical_key
anatomy.masseter.ramus-angle-insertion

## aliases
Masseter insertion
Mandibular ramus and angle, lateral surface

## arabic_label


## arabic_aliases


## definition
The masseter arises from the zygomatic arch and passes down to insert onto the lateral surface of the ramus and the angle of the mandible. This lateral, externally palpable position (easily felt when clenching the jaw) lets masseter act as a powerful elevator of the mandible, and it mirrors medial pterygoid's insertion on the ramus and angle's medial (internal) surface — the two together forming a muscular sling that suspends and elevates the mandible from both sides at once.

## explicit_objective
State that masseter inserts on the lateral surface of the mandibular ramus and angle, and that this mirrors medial pterygoid's insertion on the medial surface.

## pitfalls
Confusing masseter's lateral-surface insertion with medial pterygoid's medial-surface insertion — the two form a sling on opposite sides of the same bone region.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Muscles of mastication

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-ANA-MASTICATION-MUSCLES

## related_article_ids


## related_concept_ids
CON-MSK-4F0D04FC6348EA | CON-MSK-D034C2806E7E8D | CON-MSK-F8C46FFF3E9E27

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
SCU-FBS103 > Anatomy > Head and Neck > Muscles of Mastication

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q57 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The masseter muscle primarily inserts into which part of the mandible? ... Lateral surface of the ramus and angle" (FOMSCU Foundation 2 EOM MID 2026, Q57)

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
sourceCandidateIds: find-existing.mjs on "masseter insertion" and "ramus and angle" — 0 genuine matches.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Medial pterygoid inserts on the medial surface of the mandibular ramus and angle

## id
CON-MSK-4F0D04FC6348EA

## canonical_key
anatomy.medial-pterygoid.mandibular-angle-insertion

## aliases
Medial pterygoid insertion
Mandibular ramus and angle, medial surface

## arabic_label


## arabic_aliases


## definition
The medial pterygoid arises from the medial surface of the lateral pterygoid plate (and a small slip from the maxillary tuberosity) and passes down and laterally to insert onto the medial surface of the mandibular ramus and angle. Together with masseter — inserting on the ramus and angle's lateral surface — medial pterygoid forms a muscular sling that elevates the mandible from both sides at once, and this same muscle also gives a minor assist to protrusion when acting together with lateral pterygoid.

## explicit_objective
State that medial pterygoid inserts on the medial surface of the mandibular ramus and angle, forming an elevator sling with masseter on the lateral surface.

## pitfalls
Confusing medial pterygoid's medial-surface insertion with masseter's lateral-surface insertion, or with lateral pterygoid's separate insertion on the neck of the mandible (pterygoid fovea).

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Muscles of mastication

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-ANA-MASTICATION-MUSCLES

## related_article_ids


## related_concept_ids
CON-MSK-E76907CC2EFEDC | CON-MSK-D034C2806E7E8D | CON-MSK-F8C46FFF3E9E27

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
SCU-FBS103 > Anatomy > Head and Neck > Muscles of Mastication

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY 2025 Q6 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the insertion site of the medial pterygoid muscle? ... Medial surface of the mandibular angle" (FOMSCU Foundation 2 EOY 2025, Q6)

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
sourceCandidateIds: find-existing.mjs on "medial pterygoid insertion" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Frontalis elevates the eyebrows

## id
CON-MSK-11D43CB3EC7C7C

## canonical_key
anatomy.frontalis.eyebrow-elevation

## aliases
Frontal belly of occipitofrontalis
Eyebrow elevator muscle

## arabic_label


## arabic_aliases


## definition
Frontalis is the frontal belly of the occipitofrontalis muscle, a muscle of facial expression that runs vertically in the forehead with no bony attachment inferiorly — instead, it inserts into the skin of the eyebrows and the epicranial aponeurosis superiorly. When it contracts, it pulls the scalp forward and elevates the eyebrows, producing horizontal forehead wrinkles (the look of surprise); this is precisely the muscle Botox commonly targets to smooth those forehead lines.

## explicit_objective
State that frontalis elevates the eyebrows, and distinguish it from the sphincter muscles of facial expression (orbicularis oculi/oris) and from the masticatory muscle temporalis.

## pitfalls
Confusing frontalis with SCU-FBS102's own skull-viewing-position term "norma frontalis" (the anterior view of the skull) — same word, unrelated fact; also confusing it with temporalis by proximity near the temple.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Muscles of facial expression

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-ANA-SKULL-LANDMARKS-AND-FACE

## related_article_ids


## related_concept_ids
CON-MSK-494ED1120D9DC2 | CON-MSK-7AEF6CB638B636

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
SCU-FBS103 > Anatomy > Head and Neck > Muscles of Facial Expression

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q55 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following muscles is responsible for elevating the eyebrows? ... Frontalis" (FOMSCU Foundation 2 EOM MID 2026, Q55)

## merge_ids


## rejected_merge_candidate_ids
CON-MSK-8A42DB0089F46C

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
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
rejectedMergeCandidateIds: find-existing.mjs on "frontalis" returned SCU-FBS102's own pending concept CON-MSK-8A42DB0089F46C ("The supraorbital margin sits immediately above the orbit in norma frontalis") — read against this question, that record is about the skull-viewing-position term "norma frontalis" (an anatomical orientation), not the frontalis muscle of facial expression. Same word, different fact (a homonym collision of exactly the shape LANE-CARD.md §7 warns about); not merged.

---

# Item

## label
The submandibular fossa sits on the medial surface of the mandible, below the mylohyoid line

## id
CON-MSK-4447F3513B60E4

## canonical_key
anatomy.mandible.submandibular-fossa-medial-surface

## aliases
Submandibular gland bed
Mylohyoid line landmark

## arabic_label


## arabic_aliases


## definition
The submandibular fossa is a shallow depression on the medial (inner) surface of the body of the mandible, below the mylohyoid line, and it is exactly where the submandibular gland's larger, superficial part is lodged — the gland wraps around the posterior free edge of mylohyoid, with its smaller deep part continuing above the muscle. The mylohyoid line itself is the key landmark: structures above it (sublingual fossa/gland) sit in the floor of the mouth proper, while structures below it (submandibular fossa/gland) sit in the neck, outside the oral cavity.

## explicit_objective
Locate the submandibular fossa on the medial surface of the mandible, below the mylohyoid line, and state that it is the bed of the submandibular gland's superficial part.

## pitfalls
Placing the submandibular gland above the mylohyoid line (that is the sublingual gland's territory instead) or on the lateral surface of the mandible.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Mandible: surface landmarks

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-ANA-SKULL-LANDMARKS-AND-FACE

## related_article_ids


## related_concept_ids
CON-MSK-494ED1120D9DC2 | CON-MSK-7AEF6CB638B636

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
SCU-FBS103 > Anatomy > Head and Neck > Mandible Surface Landmarks

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q56 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The submandibular gland is located in the submandibular fossa, which is found on the: ... Medial surface of the mandible" (FOMSCU Foundation 2 EOM MID 2026, Q56)

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
sourceCandidateIds: find-existing.mjs on "submandibular fossa" and "mylohyoid line" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The external occipital protuberance lies midway between lambda and the foramen magnum

## id
CON-MSK-494ED1120D9DC2

## canonical_key
anatomy.external-occipital-protuberance.landmark

## aliases
Inion
Occipital bone midline landmark

## arabic_label


## arabic_aliases


## definition
The external occipital protuberance (inion) is a palpable bony prominence on the midline of the occipital bone's external surface, positioned midway between the lambda (the suture point where the two parietal bones meet the occipital bone above) and the foramen magnum below. It is a key surface landmark for locating the confluence of the venous sinuses on the internal surface directly opposite it, and it also gives attachment to the ligamentum nuchae and trapezius muscle; the external occipital crest and the superior/inferior nuchal lines radiate out from it.

## explicit_objective
Locate the external occipital protuberance midway between lambda and the foramen magnum, and state its clinical significance (marking the internal confluence of sinuses).

## pitfalls
Confusing this posterior-skull landmark with anterior ones (glabella, nasion) that sit at the opposite end of the head.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skull: occipital bone landmarks

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-ANA-SKULL-LANDMARKS-AND-FACE

## related_article_ids


## related_concept_ids
CON-MSK-7AEF6CB638B636 | CON-MSK-11D43CB3EC7C7C

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
SCU-FBS103 > Anatomy > Head and Neck > Skull Landmarks

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | Formative 2025 Q5 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following bony landmarks lies midway between the lambda and the foramen magnum? ... External occipital protuberance" (FOMSCU Foundation 2 Formative 2025, Q5)

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
sourceCandidateIds: find-existing.mjs on "external occipital protuberance" and "inion" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Glabella is the frontal bone elevation between the superciliary arches

## id
CON-MSK-7AEF6CB638B636

## canonical_key
anatomy.glabella.landmark

## aliases
Frontal bone brow-ridge landmark

## arabic_label


## arabic_aliases


## definition
The glabella is a smooth, slightly raised area of the frontal bone, situated on the midline directly between the two superciliary arches (the brow ridges above each eyebrow) and just above the root of the nose. It is a standard cephalometric and forensic landmark, used as a reference point for measuring facial proportions and for orienting the skull in the standard anatomical (Frankfurt) plane, and it sits just above the nasion (where the nasal bones meet the frontal bone).

## explicit_objective
Identify the glabella as the frontal bone elevation between the superciliary arches, distinguishing it from nasion (below it), inion (posterior skull) and vertex (skull roof).

## pitfalls
Confusing glabella with nasion, the next landmark immediately below it at the root of the nose.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skull: frontal bone landmarks

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-ANA-SKULL-LANDMARKS-AND-FACE

## related_article_ids


## related_concept_ids
CON-MSK-494ED1120D9DC2 | CON-MSK-11D43CB3EC7C7C

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
SCU-FBS103 > Anatomy > Head and Neck > Skull Landmarks

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | Formative 2025 Q9 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the name of the bony elevation located between the two superciliary arches above the root of the nasal bone? ... Glabella" (FOMSCU Foundation 2 Formative 2025, Q9)

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
sourceCandidateIds: find-existing.mjs on "glabella" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The supraorbital artery, a branch of the ophthalmic artery, supplies the anterior scalp

## id
CON-MSK-DD82667CFFB4DD

## canonical_key
anatomy.supraorbital-artery.ophthalmic-branch-scalp

## aliases
Ophthalmic artery branch to forehead
Anterior scalp arterial supply

## arabic_label


## arabic_aliases


## definition
The supraorbital artery is a direct branch of the ophthalmic artery — itself a branch of the internal carotid artery — given off inside the orbit before the ophthalmic artery continues on to supply the eyeball and surrounding structures. The supraorbital artery exits the orbit through the supraorbital notch or foramen, alongside the supraorbital nerve, and ascends onto the forehead to supply the anterior scalp — one of the few scalp vessels that ultimately traces back to the internal, rather than external, carotid circulation (unlike the occipital, superficial temporal and posterior auricular arteries, which are all external carotid branches).

## explicit_objective
State that the supraorbital artery, a branch of the ophthalmic (internal carotid) artery, supplies the anterior scalp, distinct from the external-carotid-derived scalp arteries.

## pitfalls
Assuming all scalp arteries arise from the external carotid artery — the supraorbital (and supratrochlear) arteries are the anterior-scalp exception, arising from the internal carotid via the ophthalmic artery.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Head and neck: scalp arterial supply

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-ANA-TRIGEMINAL-VASCULAR-HEAD

## related_article_ids


## related_concept_ids
CON-NEU-83543D4C475144

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
SCU-FBS103 > Anatomy > Head and Neck > Scalp Arterial Supply

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q26 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following arteries is a direct branch of the ophthalmic artery and supplies the anterior part of the scalp? ... Supraorbital artery" (FOMSCU Foundation 2 EOM MID 2026, Q26)

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
sourceCandidateIds: find-existing.mjs on "supraorbital artery" and "ophthalmic artery scalp" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The trigeminal nerve (V1/V2) supplies sensation to the anterior scalp

## id
CON-NEU-83543D4C475144

## canonical_key
anatomy.trigeminal-nerve.anterior-scalp-sensory

## aliases
Anterior scalp sensory innervation
Supraorbital/supratrochlear nerve territory

## arabic_label


## arabic_aliases


## definition
The anterior scalp — from the forehead back to roughly the vertex — is supplied by sensory branches of the ophthalmic (V1) and maxillary (V2) divisions of the trigeminal nerve (CN V), specifically the supraorbital and supratrochlear nerves (from V1) anteriorly. This is distinct from the posterior scalp, which is instead supplied by cervical spinal nerves (the greater and lesser occipital nerves) — a common exam split between anterior scalp (trigeminal, cranial nerve) and posterior scalp (cervical spinal nerve) sensory territory.

## explicit_objective
State that the trigeminal nerve (V1/V2 branches) supplies the anterior scalp, distinguishing it from the posterior scalp's cervical (occipital nerve) supply.

## pitfalls
Assuming the entire scalp is supplied by one nerve or one cranial-nerve division — anterior scalp is trigeminal (cranial), posterior scalp is cervical spinal nerves, a boundary roughly at the vertex.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Head and neck: scalp sensory innervation

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-ANA-TRIGEMINAL-VASCULAR-HEAD

## related_article_ids


## related_concept_ids
CON-MSK-DD82667CFFB4DD | CON-NEU-3E26F2287D36C3

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
SCU-FBS103 > Anatomy > Head and Neck > Trigeminal Sensory Territory

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY 2025 Q17 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following nerves provides sensory innervation primarily to the anterior part of the scalp? ... Trigeminal nerve" (FOMSCU Foundation 2 EOY 2025, Q17)

## merge_ids


## rejected_merge_candidate_ids
CON-DEV-0DC1018AC12648

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
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
rejectedMergeCandidateIds: find-existing.mjs on "trigeminal nerve" returned a live concept CON-DEV-0DC1018AC12648 ("First-arch nerve": trigeminal nerve supplies the first pharyngeal arch) — read against this question, that is a distinct embryology fact (branchial arch innervation) from this record's adult anterior-scalp sensory territory; related but not merged, cross-linked instead.

---

# Item

## label
The buccal branch of the mandibular nerve (V3) supplies sensation to the cheek

## id
CON-NEU-3E26F2287D36C3

## canonical_key
anatomy.buccal-nerve.mandibular-division-cheek-sensation

## aliases
Long buccal nerve
Cheek sensory innervation

## arabic_label


## arabic_aliases


## definition
The buccal nerve (long buccal nerve) is a sensory branch of the mandibular division (V3) of the trigeminal nerve, arising from the anterior trunk of V3. It passes forward between the two heads of the lateral pterygoid to reach and supply general sensation — including pain — to the skin and mucous membrane of the cheek and the buccal (cheek-side) gingiva of the mandibular molars. It is easily confused by name with the buccal branch of the facial nerve (CN VII), which is a motor branch supplying the buccinator muscle and carries no sensory fibres at all.

## explicit_objective
Identify the buccal branch of the mandibular nerve (V3) as the sensory supply to the cheek, distinguishing it by name from the motor buccal branch of the facial nerve.

## pitfalls
Confusing the buccal branch of the mandibular nerve (sensory, V3) with the buccal branch of the facial nerve (motor, VII) — same name, different nerve and different function entirely.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Head and neck: trigeminal sensory branches

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-ANA-TRIGEMINAL-VASCULAR-HEAD

## related_article_ids


## related_concept_ids
CON-NEU-83543D4C475144

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
0.5

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Anatomy > Head and Neck > Trigeminal Sensory Branches

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY 2025 Q25 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"An emergency physician used local anesthesia for surgery to drain an abscess affecting the cheek area. Which of the following nerves must be anesthetized because it carries pain sensation from the cheek area? ... Buccal branch of the mandibular nerve" (FOMSCU Foundation 2 EOY 2025, Q25)

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
sourceCandidateIds: find-existing.mjs on "buccal nerve mandibular" and "cheek sensation trigeminal" — 0 genuine matches.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The sartorius is a strap muscle: long, narrow, parallel-fibred

## id
CON-MSK-04E84268E7EF53

## canonical_key
anatomy.sartorius.strap-muscle-classification

## aliases
Strap muscle architecture
Longest muscle in the body

## arabic_label


## arabic_aliases


## definition
The sartorius is the longest muscle in the body and is architecturally classified as a strap muscle: a long, narrow, ribbon-like muscle whose fibres run largely parallel to each other along its whole length, from its origin at the anterior superior iliac spine to its insertion at the pes anserinus on the medial tibia. This parallel-fibre, uniform-width strap shape — as opposed to a fusiform (biceps brachii), multipennate (deltoid), or segmented (rectus abdominis) architecture — is what earns sartorius the classification, and it also explains its distinctive spiral course across the front and medial side of the thigh.

## explicit_objective
Identify the sartorius as a strap muscle (long, parallel-fibred), distinguishing this architecture from multipennate, segmented, and fusiform muscle shapes.

## pitfalls
Selecting a muscle by size or prominence rather than by fibre architecture — a strap muscle is defined by its parallel, uniform-width fibre arrangement, not merely by being long.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Skeletal muscle: architectural classification

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-ANA-MASTICATION-MUSCLES

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
0.1

## academic_relevance
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Anatomy > Lower Limb > Muscle Architecture

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | Formative 2025 Q4 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following muscles is anatomically classified as a strap-like muscle? ... Sartorius muscle" (FOMSCU Foundation 2 Formative 2025, Q4)

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
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
sourceCandidateIds: find-existing.mjs on "sartorius" returned a live citation about sartorius muscle in the context of femoral-triangle relations and the adductor canal's fibrous roof — read against this question, that is a different specific fact (topographic relations, not muscle-shape architecture classification); not merged. No concept id exists for this citation to name as a rejected candidate.
