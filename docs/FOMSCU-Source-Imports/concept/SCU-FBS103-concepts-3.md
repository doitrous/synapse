<!--
  SCU-FBS103 · Foundation 2 — S2 minting pass, third author lane
  (scu-fbs103-author3, cluster 'fbs103c'). 11 concepts genuinely new to the
  corpus after re-verification: `find-existing.mjs` on a multi-word query
  built from the concept's own fact AND a `grep -ril` of 2-3 distinctive
  terms across every `docs/*-Source-Imports/concept/`, `pending-live/`
  directory and `docs/import-ready/concept/`, plus a read of every hit
  body. Several candidates surfaced related but non-matching hits during
  that closer read (a different specific tested fact, not the same
  concept) — each is named as a rejected merge candidate in that record's
  own field_notes rather than silently discarded.

  Ids minted with `mint-concept-id.mjs`, checked against the live snapshot
  and the taken-id scan; none derived for a concept that already exists.
  `atomic_claim_ids` is `[clear]` on every record — this lane is scoped to
  concept, article and question files, and mints no evidence claim or
  citation records, matching the standing convention already documented in
  Kasr's 103-BMS-mcq-lipid-concepts.md and this lane's own
  SCU-FBS103-s2-mint-concepts.md / SCU-FBS103-s2-author1-batch2-mint-concepts.md
  / SCU-FBS103-s2-author2-mint-concepts.md. The evidence chain is owed and
  named in the hand-off report, not concealed.

  `primary_node_id` is left blank with a field_note on every record: the
  canonical DIS-*/SYS-* taxonomy nodes could not be resolved from this
  worktree in the time this lane had. `module_subject` carries FOMSCU's own
  placement instead.

  Sources: FOMSCU Foundation 2 own-source quiz-app JSON, keys and stems read
  directly from `06 EOM Exams/EOM - Foundation 2 2026 - FOMSCU MID -
  MCQ.json`, `07 EOY Exams/EOY - Foundation 2 2025 and 2026 - FOMSCU Final -
  MCQ.json` and `03 Questions and QBank/Formative 2025 - Foundation 2 -
  MCQ.json` (question numbers cited per record, shas verified against
  manifest/y1-sources.json) — printed keys stand; every explanation is
  written fresh in the platform's own voice from standard textbook fact,
  never translated from the source JSON's own (FOMNINU-sourced) Arabic
  explanation field.

  Covers: Anatomy (mandibular nerve motor supply, 1 concept), Histology
  (basic tissue/cell identification: smooth muscle nucleus shape x2,
  epithelial tissue as one of the four basic tissues, blood vessel wall
  composition, 4 concepts), Microbiology (virus structure, Gram-positive
  cell wall, 2 concepts), Parasitology (old protozoan classification,
  1 concept), Pharmacology (aspirin identity, cross tolerance, morphine's
  plant source, 3 concepts).
-->

# Item

## label
The mandibular nerve (V3) carries the motor supply to the muscles of mastication

## id
CON-MSK-4D215626D6BC20

## canonical_key
anatomy.mandibular-nerve.motor-supply-muscles-of-mastication

## aliases
Motor root of the trigeminal nerve
Muscles of mastication innervation

## arabic_label


## arabic_aliases


## definition
The muscles of mastication — masseter, temporalis, and the medial and lateral pterygoids — receive their motor innervation from the mandibular nerve (V3), the third and largest division of the trigeminal nerve (cranial nerve V). Unlike the ophthalmic (V1) and maxillary (V2) divisions, which are purely sensory, the mandibular nerve is a mixed nerve: it carries general sensation from the lower face, mandible and anterior two-thirds of the tongue, and it alone carries the entire motor root of the trigeminal nerve. This motor root travels with V3 through the foramen ovale and distributes to all four muscles of mastication, plus a small group of accessory muscles (mylohyoid, anterior belly of digastric, tensor tympani, tensor veli palatini). The facial nerve (VII) supplies the muscles of facial expression, not mastication, and neither the maxillary nor the glossopharyngeal nerve carries motor fibres to the jaw muscles at all.

## explicit_objective
Identify the mandibular nerve (V3) as the sole carrier of motor innervation to the muscles of mastication, distinguishing it from the purely sensory V1/V2 trigeminal divisions and from the facial nerve's separate supply to facial expression.

## pitfalls
Confusing the mandibular nerve's motor role with the facial nerve because both are commonly described as "nerves of the lower face" — the facial nerve supplies the muscles of facial expression, while only the mandibular nerve carries motor fibres to the muscles that move the jaw.

## concept_type
directly_taught_fact

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Head and neck: trigeminal nerve divisions

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
ART-SCU-FBS103-ANAT-MANDIBULAR-NERVE

## related_article_ids


## related_concept_ids
CON-NEU-4BFE30D065C975

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
0.85

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Anatomy > Head and Neck > Trigeminal Nerve

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY Final 2025 Q18 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids
find-existing.mjs "mandibular nerve muscles of mastication" — no existing record; a grep for "mandibular nerve" and "muscles of mastication" surfaced Ain Shams's ASU-CNS-3 trigeminal-motor-nucleus record (CON-NEU-4BFE30D065C975, a different fact — see rejected_merge_candidate_ids) and this lane's own SCU-FBS103-s2-mint-concepts.md buccal-nerve record (a different, sensory, branch). Safe to create.

## original_wording
"The muscles of mastication receive their motor innervation from which of the following nerves? ... Mandibular nerve" (FOMSCU Foundation 2, EOY Final 2025, Q18)

## merge_ids


## rejected_merge_candidate_ids
CON-NEU-4BFE30D065C975

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
sourceCandidateIds: find-existing.mjs on "mandibular nerve muscles of mastication" — 0 hits, safe to create.
rejectedMergeCandidateIds: CON-NEU-4BFE30D065C975 ("The motor nucleus of the trigeminal nerve belongs to the special visceral efferent... column") states the muscles of mastication are supplied by the trigeminal motor nucleus/nerve, but its own tested fact is the nucleus's functional-column classification, not "which named peripheral nerve carries the motor supply" against Facial/Maxillary/Glossopharyngeal distractors — a different specific angle, cross-linked rather than merged.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
A smooth muscle fibre's nucleus is single, central and oval

## id
CON-FND-97429CCFF7F704

## canonical_key
histology.smooth-muscle-fiber.nucleus-central-oval

## aliases
Smooth muscle nucleus shape and position
Smooth vs skeletal muscle nucleus

## arabic_label


## arabic_aliases


## definition
A smooth muscle fibre (leiomyocyte) has a single nucleus, positioned centrally within the cell and oval in shape, tapering slightly at its ends to follow the spindle shape of the cell during contraction. This contrasts with skeletal muscle fibres, whose nuclei are multiple, flattened, and pushed to the cell's periphery just beneath the sarcolemma. The central, oval, single-nucleus pattern is one of the standard light-microscope features used to identify smooth muscle in a histological section, alongside its lack of striations.

## explicit_objective
State that a smooth muscle fibre's nucleus is single, central and oval, distinguishing it from the multiple, peripheral, flattened nuclei of skeletal muscle.

## pitfalls
Assuming all muscle nuclei follow the same peripheral pattern seen in skeletal muscle — smooth muscle's nucleus is central, not peripheral, and there is only one per cell, not several.

## concept_type
structural_description

## status
under review

## subject
fnd

## topic
Histology

## subtopic
Muscle tissue: smooth muscle identification

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
ART-SCU-FBS103-HIS-TISSUE-ID

## related_article_ids


## related_concept_ids
CON-FND-BEE052613B7347

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
0.85

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Histology > Muscle Tissue

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q53 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids
find-existing.mjs "central and oval nucleus smooth muscle" — no existing record. Safe to create.

## original_wording
"Which of the following best describes the appearance and position of the nucleus in smooth muscle fibers? ... Central and oval" (FOMSCU Foundation 2, EOM MID 2026, Q53)

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
sourceCandidateIds: find-existing.mjs on "central and oval nucleus smooth muscle" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
A macrophage's nucleus is characteristically eccentric in position

## id
CON-FND-C38D7FEB8040C8

## canonical_key
histology.macrophage.nucleus-eccentric

## aliases
Macrophage nucleus position
Eccentric nucleus

## arabic_label


## arabic_aliases


## definition
The macrophage, the activated tissue form of the blood monocyte, characteristically has a nucleus positioned eccentrically within the cell — pushed to one side rather than sitting centrally — reflecting the cell's abundant peripheral cytoplasm packed with lysosomes and phagocytic vacuoles. This eccentric position, together with the macrophage's irregular cell outline and often kidney- or horseshoe-shaped nuclear profile, helps distinguish it on light microscopy from cells with a central nucleus (such as lymphocytes) or a peripheral, flattened nucleus (such as adipocytes and skeletal muscle fibres).

## explicit_objective
State that a macrophage's nucleus is typically eccentric in position, distinguishing this from the central nuclear position of lymphocytes and the peripheral position seen in adipocytes or skeletal muscle.

## pitfalls
Confusing "eccentric" (off-centre, to one side) with "peripheral" (pressed against the cell membrane, as in adipocytes) — a macrophage's nucleus is displaced from centre but still sits within the body of the cell, not flattened against its rim.

## concept_type
structural_description

## status
under review

## subject
fnd

## topic
Histology

## subtopic
Connective tissue cells: macrophage identification

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
ART-SCU-FBS103-HIS-TISSUE-ID

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
SCU-FBS103 > Histology > Connective Tissue Cells

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | Formative 2025 Q1 | SCU-FBS103

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids
find-existing.mjs "eccentric nucleus macrophage" — no existing record. A grep for "macrophage" surfaced Kasr's 101-ISK "kidney-shaped nucleus" macrophage-identification records (a different feature — outline/shape, not eccentric position). Safe to create.

## original_wording
"What is the typical position of the nucleus in a macrophage? ... Eccentric" (FOMSCU Foundation 2, Formative 2025, Q1)

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
sourceCandidateIds: find-existing.mjs on "eccentric nucleus macrophage" — 0 hits, safe to create. A broader grep for "macrophage" alone returned dozens of hits across the corpus (per LANE-CARD.md §7's warning that single generic words are unreliable); the ones naming a nuclear feature at all describe shape ("kidney-shaped"), not position, and were not merged.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Epithelial tissue is one of the four basic tissues of the human body

## id
CON-FND-2442FE83E1BA90

## canonical_key
histology.four-basic-tissues.epithelial-tissue

## aliases
Four basic tissues
Basic tissue classification

## arabic_label


## arabic_aliases


## definition
The human body is built from four basic tissues: epithelial tissue, connective tissue, muscular tissue and nervous tissue. Epithelial tissue lines body surfaces and cavities and forms glands; it is one of these four fundamental tissue categories, not a body system or organ. Respiratory, endocrine and immune tissue are not themselves basic-tissue categories — each of those systems is instead built from combinations of the four basic tissues (for example, the respiratory system's airway lining is epithelial tissue, and its wall contains connective and muscular tissue).

## explicit_objective
Name epithelial tissue as one of the four basic tissues (with connective, muscular and nervous tissue), distinguishing "basic tissue" from a body system such as respiratory, endocrine or immune tissue.

## pitfalls
Treating a body system (respiratory, endocrine, immune) as if it were itself a basic tissue category — every body system is built from combinations of the four basic tissues, not a fifth basic tissue in its own right.

## concept_type
classification

## status
under review

## subject
fnd

## topic
Histology

## subtopic
Introduction: the four basic tissues

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
ART-SCU-FBS103-HIS-TISSUE-ID

## related_article_ids


## related_concept_ids
CON-FND-366BDE9995356F

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
0.85

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Histology > Introduction

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | Formative 2025 Q6 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids
find-existing.mjs "epithelial tissue four basic tissues" — no existing record. Ain Shams's ASU-HCB-epithelium-mcq-concepts.md has a live-adjacent record about epithelium's unique polarity among the four basic tissues (CON-FND-366BDE9995356F) — a different specific fact (polarity, not tissue-category membership) — cross-linked, not merged. Safe to create.

## original_wording
"Which of the following is considered one of the four basic tissues in the human body? ... Epithelial tissue" (FOMSCU Foundation 2, Formative 2025, Q6)

## merge_ids


## rejected_merge_candidate_ids
CON-FND-366BDE9995356F

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
sourceCandidateIds: find-existing.mjs on "epithelial tissue four basic tissues" — 0 hits, safe to create.
rejectedMergeCandidateIds: CON-FND-366BDE9995356F ("Epithelium is the only basic tissue that shows polarity") assumes the same four-basic-tissue framework but tests a different specific fact (polarity as epithelium's unique feature) than this concept's own (epithelium's category membership against non-tissue distractors) — cross-linked, not merged.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The walls of blood vessels are composed primarily of smooth muscle tissue

## id
CON-FND-BEE052613B7347

## canonical_key
histology.smooth-muscle.blood-vessel-walls

## aliases
Vascular smooth muscle
Tunica media composition

## arabic_label


## arabic_aliases


## definition
The walls of blood vessels are composed primarily of smooth muscle tissue, concentrated in the tunica media, which allows involuntary regulation of vessel diameter (vasoconstriction and vasodilation) without conscious control. This distinguishes blood vessel walls from the tongue and the muscles attached to the skeleton, which are skeletal (voluntary, striated) muscle, and from the heart, whose wall is cardiac muscle — striated but involuntary, and structurally and functionally distinct from vascular smooth muscle.

## explicit_objective
State that the walls of blood vessels are composed primarily of smooth muscle tissue, distinguishing this from the skeletal muscle of the tongue and limbs and from the cardiac muscle of the heart.

## pitfalls
Assuming any involuntary muscle must be cardiac because the heart is the most familiar involuntary organ — blood vessel walls are involuntary smooth muscle, not cardiac muscle, which is confined to the heart itself.

## concept_type
structural_description

## status
under review

## subject
fnd

## topic
Histology

## subtopic
Muscle tissue: smooth muscle distribution

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
ART-SCU-FBS103-HIS-TISSUE-ID

## related_article_ids


## related_concept_ids
CON-FND-97429CCFF7F704

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
SCU-FBS103 > Histology > Muscle Tissue

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | Formative 2025 Q13 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids
find-existing.mjs "walls of blood vessels smooth muscle" — no existing record. Safe to create.

## original_wording
"Which of the following structures is primarily composed of smooth muscle tissue? ... Walls of the blood vessels" (FOMSCU Foundation 2, Formative 2025, Q13)

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
sourceCandidateIds: find-existing.mjs on "walls of blood vessels smooth muscle" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
A virus's basic structure is a protein coat (capsid) enclosing its nucleic acid genome

## id
CON-INF-88CF1D8B051CF9

## canonical_key
virology.virus-structure.protein-coat-and-nucleic-acid

## aliases
Capsid and genome
Basic virus structure

## arabic_label


## arabic_aliases


## definition
A virus, unlike a true cell, has no organelles, no cytoplasm and no cell wall of its own. Its basic structure is a nucleic acid genome (DNA or RNA, never both) enclosed within a protective protein coat called the capsid; some viruses add a lipid envelope derived from host membrane around the capsid, but the protein coat plus nucleic acid pairing is the structure common to every virus. This is fundamentally different from a bacterial cell, which is a complete, independently metabolising cell with a peptidoglycan cell wall, ribosomes and cytoplasmic organelles the virus entirely lacks.

## explicit_objective
State that a virus's basic structure is a protein coat (capsid) enclosing its nucleic acid genome, distinguishing this from a complete cell's organelles, cytoplasm and peptidoglycan wall.

## pitfalls
Attributing cell-like features (a nucleus, organelles, a peptidoglycan wall) to a virus because it is discussed alongside bacteria in microbiology — a virus is not a cell at all; it is only a protein coat around a nucleic acid genome, dependent entirely on a host cell's machinery to replicate.

## concept_type
definition

## status
under review

## subject
inf

## topic
Microbiology

## subtopic
General virology: basic virus structure

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
ART-SCU-FBS103-MICRO-PARA-BASICS

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
0.25

## academic_relevance
0.85

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Microbiology > General Virology

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q17 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids
find-existing.mjs "virus protein coat nucleic acid" — no existing record. Safe to create.

## original_wording
"The basic structure of a virus primarily consists of: ... A protein coat and nucleic acid" (FOMSCU Foundation 2, EOM MID 2026, Q17; repeated verbatim in EOY Final 2026, Q17)

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
sourceCandidateIds: find-existing.mjs on "virus protein coat nucleic acid" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Gram-positive bacteria are identified by a cell wall with a thick peptidoglycan layer

## id
CON-INF-876D1C153188B8

## canonical_key
bacteriology.gram-positive.cell-wall-thick-peptidoglycan

## aliases
Gram-positive cell wall
Thick peptidoglycan layer

## arabic_label


## arabic_aliases


## definition
The cell wall is the structural component of a Gram-positive bacterium that contains a thick layer of peptidoglycan, in contrast to the thin peptidoglycan layer of a Gram-negative cell wall. Neither the nucleoid (the bacterial chromosome's location, with no peptidoglycan at all), the capsule (a polysaccharide layer external to the wall, present in only some species), nor the cell membrane (the lipid bilayer internal to the wall, also with no peptidoglycan) is the structure that carries this thick peptidoglycan. The wall's thick peptidoglycan is also what retains the crystal violet-iodine complex in the Gram stain, giving Gram-positive organisms their characteristic violet colour.

## explicit_objective
Identify the cell wall (not the nucleoid, capsule or cell membrane) as the Gram-positive bacterial structure containing a thick peptidoglycan layer.

## pitfalls
Confusing the cell wall with the cell membrane because both are described as "membranes" of the bacterium in casual usage — the cell wall is the external, rigid, peptidoglycan-containing structure, while the cell membrane is the internal lipid bilayer that contains no peptidoglycan at all.

## concept_type
classification

## status
under review

## subject
inf

## topic
Microbiology

## subtopic
General bacteriology: Gram-positive cell wall

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
ART-SCU-FBS103-MICRO-PARA-BASICS

## related_article_ids


## related_concept_ids
CON-INF-7E3B831D71A008

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.3

## exam_weight_by_year
SCU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Microbiology > General Bacteriology

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q19 | SCU-FBS103

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids
find-existing.mjs "gram-positive cell wall thick peptidoglycan" — no existing record. Ain Shams's ASU-INF-microbiology-concepts.md has a related record on teichoic/lipoteichoic acid as Gram-positive-only wall components (CON-INF-7E3B831D71A008), whose own definition states the wall is "thick peptidoglycan" in passing, but its tested/quizzed fact is teichoic acid presence, not "which structure carries the thick layer" against nucleoid/capsule/membrane distractors — cross-linked, not merged.

## original_wording
"Which structural component of Gram-positive bacteria contains a thick layer of peptidoglycan? ... Cell wall" (FOMSCU Foundation 2, EOM MID 2026, Q19; repeated verbatim in EOY Final 2026, Q19)

## merge_ids


## rejected_merge_candidate_ids
CON-INF-7E3B831D71A008

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
sourceCandidateIds: find-existing.mjs on "gram-positive cell wall thick peptidoglycan" — 0 hits, safe to create.
rejectedMergeCandidateIds: CON-INF-7E3B831D71A008, "Teichoic acid and lipoteichoic acid are Gram-positive wall components absent from Gram-negative bacteria" — same wall, different tested fact (teichoic acid presence vs. which structure has thick peptidoglycan). Not merged; cross-linked instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Sarcodina is the old taxonomic group of protozoa that move by pseudopodia

## id
CON-INF-85B8A95618EA94

## canonical_key
parasitology.protozoa-old-classification.sarcodina-pseudopodia

## aliases
Old protozoan classification
Amoeboid protozoa

## arabic_label


## arabic_aliases


## definition
Under the old (pre-molecular) taxonomic classification of protozoa by mode of locomotion, four groups were recognised: Sarcodina, characterised by pseudopodia (temporary cytoplasmic extensions, as in Entamoeba); Mastigophora, characterised by flagella; Ciliophora, characterised by cilia; and Sporozoa, which have no clear locomotor organelle at any stage. Sarcodina is therefore the group specifically identified by amoeboid, pseudopodial movement, distinguishing it from the whip-like flagellar movement of Mastigophora and the coordinated ciliary beating of Ciliophora.

## explicit_objective
Identify Sarcodina as the old taxonomic protozoan group characterised by pseudopodial (amoeboid) locomotion, distinguishing it from Mastigophora (flagella), Ciliophora (cilia) and Sporozoa (no locomotor organelle).

## pitfalls
Mixing up the four old locomotion-based protozoan groups by their Latin/Greek roots alone — "pseudopodia" (false feet) is Sarcodina's defining feature, not to be confused with the whip-like flagella of Mastigophora or the hair-like cilia of Ciliophora.

## concept_type
classification

## status
under review

## subject
inf

## topic
Parasitology

## subtopic
General parasitology: old protozoan classification

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
ART-SCU-FBS103-MICRO-PARA-BASICS

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
0.85

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Parasitology > General Parasitology

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q2 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids
find-existing.mjs "sarcodina pseudopodia protozoa" — no existing record. Safe to create.

## original_wording
"According to its old taxonomic classification, which group of protozoa is characterized by the use of pseudopodia for locomotion? ... Sarcodina" (FOMSCU Foundation 2, EOM MID 2026, Q2; repeated verbatim in EOY Final 2026, Q2)

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
sourceCandidateIds: find-existing.mjs on "sarcodina pseudopodia protozoa" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Aspirin is the common name for acetylsalicylic acid

## id
CON-FND-70F5839FD191FA

## canonical_key
pharmacology.aspirin.acetylsalicylic-acid

## aliases
Aspirin chemical identity
Acetylsalicylic acid

## arabic_label


## arabic_aliases


## definition
Aspirin is the common (and originally brand) name for the chemical compound acetylsalicylic acid, a non-steroidal anti-inflammatory drug (NSAID) that acetylates and irreversibly inhibits cyclooxygenase (COX). It is chemically distinct from other common analgesics: ibuprofen and diclofenac sodium are separate NSAID compounds with their own chemical names, and acetaminophen (paracetamol) is a distinct, non-NSAID analgesic/antipyretic — none of these three is a brand name for acetylsalicylic acid.

## explicit_objective
State that aspirin is the common name for acetylsalicylic acid, distinguishing it by chemical identity from ibuprofen, diclofenac sodium and acetaminophen.

## pitfalls
Assuming all common over-the-counter pain relievers share one chemical identity because they are used for similar symptoms — aspirin (acetylsalicylic acid), ibuprofen, diclofenac sodium and acetaminophen are four chemically distinct compounds, not different names for the same drug.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Pharmacology

## subtopic
General pharmacology: drug names and identities

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
ART-SCU-FBS103-PHARM-BASICS

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
0.35

## academic_relevance
0.75

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Pharmacology > General Pharmacology

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q13 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids
find-existing.mjs "acetylsalicylic acid aspirin" — no existing record. Safe to create.

## original_wording
"Aspirin is the brand or common name for which of the following chemical compounds? ... Acetylsalicylic acid" (FOMSCU Foundation 2, EOM MID 2026, Q13; repeated verbatim in EOY Final 2026, Q13)

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
sourceCandidateIds: find-existing.mjs on "acetylsalicylic acid aspirin" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Cross tolerance is tolerance to one drug that extends to other drugs in the same pharmacological group

## id
CON-FND-B147F4448B4BF1

## canonical_key
pharmacology.tolerance.cross-tolerance

## aliases
Cross tolerance definition
Tolerance within a drug class

## arabic_label


## arabic_aliases


## definition
Cross tolerance is the phenomenon in which tolerance developed to one drug also reduces the response to other drugs within the same pharmacological group (for example, opioids or benzodiazepines), even without prior exposure to those other drugs. It is distinct from tachyphylaxis, which is a rapid loss of response occurring over a much shorter timescale (minutes to hours, from repeated dosing of the same drug), from idiosyncrasy, an unusual and unpredictable reaction unrelated to dose or prior exposure, and from drug dependence, which describes a compulsive pattern of drug-seeking rather than a reduction in drug effect.

## explicit_objective
Define cross tolerance as tolerance to one drug extending to other drugs of the same pharmacological group, distinguishing it from tachyphylaxis, idiosyncrasy and drug dependence.

## pitfalls
Confusing cross tolerance with tachyphylaxis because both describe a reduced drug response — cross tolerance develops gradually and extends across a drug class, while tachyphylaxis is a rapid loss of response to repeated doses of the same drug over a short timescale.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Pharmacology

## subtopic
General pharmacology: tolerance and its variants

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
ART-SCU-FBS103-PHARM-BASICS

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
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Pharmacology > General Pharmacology

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q14 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids
find-existing.mjs "cross tolerance pharmacology" — no existing record. Safe to create.

## original_wording
"What term is used to describe the development of tolerance to a specific drug that also results in tolerance to other drugs within the same pharmacological group? ... Cross tolerance" (FOMSCU Foundation 2, EOM MID 2026, Q14; repeated verbatim in EOY Final 2026, Q14)

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
sourceCandidateIds: find-existing.mjs on "cross tolerance pharmacology" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Morphine is primarily derived from a plant source

## id
CON-FND-342512BCB62F65

## canonical_key
pharmacology.morphine.plant-source

## aliases
Morphine source
Opium poppy alkaloid

## arabic_label


## arabic_aliases


## definition
Morphine is an opioid alkaloid derived primarily from a plant source — the opium poppy (Papaver somniferum) — rather than from a microorganism, an animal, or a fully synthetic process. This places it among the plant-derived drugs (alongside examples such as atropine), distinct from microbially-sourced drugs (such as most antibiotics, which are produced by fungi or bacteria), animal-derived drugs (such as historical bovine/porcine insulin), and synthetic drugs manufactured entirely by chemical synthesis.

## explicit_objective
State that morphine is derived primarily from a plant source (the opium poppy), distinguishing this from microorganism-, animal- and synthetic-sourced drugs.

## pitfalls
Assuming a potent, "medical-sounding" drug like morphine must be synthetic or microbially produced — morphine is a naturally occurring plant alkaloid, extracted from the opium poppy, not manufactured from scratch or fermented by a microorganism.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Pharmacology

## subtopic
General pharmacology: sources of drugs

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
ART-SCU-FBS103-PHARM-BASICS

## related_article_ids


## related_concept_ids
CON-FND-F468990E215745

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.3

## exam_weight_by_year
SCU_Y1=0.3

## clinical_relevance
0.25

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Pharmacology > General Pharmacology

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q48 | SCU-FBS103

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids
find-existing.mjs "morphine plant source" — no existing record. Assiut's AUN-MPT-104-concepts.md has a related record on insulin as a drug obtained from more than one source (CON-FND-F468990E215745), which names morphine only as a parenthetical single-source counter-example, not as its own tested fact — cross-linked, not merged.

## original_wording
"What is the natural source from which morphine is primarily derived? ... Plant source" (FOMSCU Foundation 2, EOM MID 2026, Q48)

## merge_ids


## rejected_merge_candidate_ids
CON-FND-F468990E215745

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
sourceCandidateIds: find-existing.mjs on "morphine plant source" — 0 hits, safe to create.
rejectedMergeCandidateIds: CON-FND-F468990E215745, "Insulin is a drug obtained from both animal... and human/recombinant sources" — names morphine only as a passing single-source example inside a different concept's own definition (insulin's dual sourcing), not as its own tested fact. Not merged; cross-linked instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
