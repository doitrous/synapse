<!--
  SCU-FBS102 · Foundation 1 — S2 minting pass, third author lane
  (scu-fbs103-author3, cluster 'fbs102d'). This lane's own primary module is
  SCU-FBS103; these 6 concepts clear the last of Foundation 1's own
  remaining anatomy/embryology triage keys (`coverage/SCU-FBS102-triage-keys.txt`
  "## Remaining" list), leaving only Ethics/Community Medicine placement,
  which needs Omar per LANE-CARD.md §7 and `coverage/SCU-FBS102-triage.md`'s
  own Checkpoint section.

  6 concepts genuinely new to the corpus after re-verification:
  `find-existing.mjs` on a multi-word query built from the concept's own
  fact AND a `grep -ril` of 2-3 distinctive terms across every
  `docs/*-Source-Imports/concept/`, `pending-live/` directory and
  `docs/import-ready/concept/`, plus a read of every hit body. Two
  candidates surfaced related but non-matching (anatomy-fibers) or directly
  conflicting (embryology-three-days) hits during that closer read — named
  as a rejected merge candidate / conflict in that record's own field_notes
  rather than silently discarded or silently merged.

  Ids minted with `mint-concept-id.mjs`, checked against the live snapshot
  and the taken-id scan; none derived for a concept that already exists.
  `atomic_claim_ids` is `[clear]` on every record — this lane is scoped to
  concept, article and question files, and mints no evidence claim or
  citation records, matching the standing convention already documented in
  Kasr's 103-BMS-mcq-lipid-concepts.md and this lane's own
  SCU-FBS103-concepts-3.md.

  `primary_node_id` is left blank with a field_note on every record: the
  canonical DIS-*/SYS-* taxonomy nodes could not be resolved from this
  worktree in the time this lane had. `module_subject` carries FOMSCU's own
  placement instead.

  Sources: FOMSCU Foundation 1 own-source quiz-app JSON, keys and stems
  read directly from `07 EOY Exams/EOY - Foundation 1 2026 - FOMSCU Final -
  MCQ.json` and `03 Questions and QBank/Formative and Past Exams 2021/2022 -
  MCQ.json` (question numbers cited per record, shas verified against
  manifest/y1-sources.json) — printed keys stand; every explanation is
  written fresh in the platform's own voice from standard textbook fact,
  never translated from the source JSON's own (FOMNINU-sourced) Arabic
  explanation field.

  Covers: Anatomy (basic positional/directional terminology and muscle
  action terms: ventral, bilateral, synergist; basic neuroanatomy: white
  matter composition, medulla oblongata, 5 concepts), Embryology (early
  cleavage timing: the free morula, 1 concept).
-->

# Item

## label
Ventral has the same positional meaning as anterior

## id
CON-MSK-276046B5EEFFDB

## canonical_key
anatomy.terminology.ventral-equals-anterior

## aliases
Ventral anatomical term
Anatomical position synonyms

## arabic_label


## arabic_aliases


## definition
In standard anatomical terminology, ventral is synonymous with anterior — both describe the front, or belly-side, surface or direction of the body in the standard anatomical position. This is the opposite of dorsal (synonymous with posterior, the back surface), and distinct from superior (toward the head) and inferior (toward the feet), which describe the vertical axis rather than the front-back axis.

## explicit_objective
State that ventral is the exact positional synonym of anterior, distinguishing the front-back (ventral/dorsal = anterior/posterior) axis from the vertical (superior/inferior) axis.

## pitfalls
Treating ventral, dorsal, superior and inferior as four points on a single scale — ventral/dorsal (front/back) and superior/inferior (up/down) are two separate, independent axes of anatomical description, not four degrees of the same one.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Anatomical terminology: position and direction

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
ART-SCU-FBS102-ANAT-TERMINOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-26F681BFC6E661

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
SCU-FBS102 > Anatomy > Introduction to Anatomical Terminology

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final 2026 Q1 | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which anatomical term has the exact same positional meaning as the word anterior? ... Ventral" (FOMSCU Foundation 1, EOY Final 2026, Q1)

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
sourceCandidateIds: find-existing.mjs on "ventral anterior anatomical term" — 0 hits, safe to create. A broader grep for "ventral" alone returned dozens of hits (per LANE-CARD.md §7's warning that single generic words are unreliable); every one names ventral as a positional adjective inside a specific structure's own fact (ventral root, ventral rami, VPM nucleus, ventral respiratory group), not the bare terminology-definition fact tested here.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Bilateral means relating to both the right and left sides of the body

## id
CON-MSK-26F681BFC6E661

## canonical_key
anatomy.terminology.bilateral-both-sides

## aliases
Bilateral anatomical term
Unilateral vs bilateral vs ipsilateral vs contralateral

## arabic_label


## arabic_aliases


## definition
Bilateral is the anatomical term describing a structure, finding or process that relates to both the right and left sides of the body together. This is distinct from unilateral (one side only), ipsilateral (the same side as a reference point) and contralateral (the opposite side from a reference point) — four related but distinct terms that are frequently tested against one another.

## explicit_objective
Define bilateral as relating to both the right and left sides of the body, distinguishing it from unilateral, ipsilateral and contralateral.

## pitfalls
Confusing bilateral with ipsilateral because both can describe "the same" side in some contexts — bilateral means both sides together, while ipsilateral specifically means the same side as a stated reference point, which could be either the right or the left.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Anatomical terminology: laterality

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
ART-SCU-FBS102-ANAT-TERMINOLOGY

## related_article_ids


## related_concept_ids
CON-MSK-276046B5EEFFDB

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
SCU-FBS102 > Anatomy > Introduction to Anatomical Terminology

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final 2026 Q3 | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which anatomical term is specifically related to both right and left sides of the body? ... Bilateral" (FOMSCU Foundation 1, EOY Final 2026, Q3)

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
sourceCandidateIds: find-existing.mjs on "bilateral both sides anatomical term" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
A synergist muscle assists the prime mover to produce a specific movement

## id
CON-MSK-249270602DEA0B

## canonical_key
anatomy.muscle-action-terms.synergist-definition

## aliases
Muscle action terminology
Prime mover, antagonist, fixator, synergist

## arabic_label


## arabic_aliases


## definition
A synergist is a muscle that assists the prime mover (agonist) in producing a specific movement, either by adding force in the same direction or by preventing unwanted secondary movements. This is one of four standard muscle-action roles taught together: the agonist (prime mover) is the muscle chiefly responsible for a movement; the antagonist opposes the agonist and produces the opposite movement; and the fixator stabilises the muscle's bony origin so the agonist can act efficiently — the synergist is the one of these four that assists, rather than opposes or stabilises.

## explicit_objective
Define the synergist as the muscle that assists the prime mover in a specific movement, distinguishing it from the antagonist (opposes), the fixator (stabilises the origin) and the agonist/prime mover itself.

## pitfalls
Confusing the synergist with the agonist (prime mover) because both act in the same general direction of movement — the agonist is the muscle chiefly responsible for the movement, while the synergist only assists it or refines it by blocking unwanted secondary actions.

## concept_type
definition

## status
under review

## subject
msk

## topic
Anatomy

## subtopic
Muscle physiology: action terminology

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
ART-SCU-FBS102-ANAT-TERMINOLOGY

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
SCU-FBS102 > Anatomy > Muscle Physiology

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final 2026 Q11 | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the muscle called that assists the prime mover to produce a specific movement? ... Synergist" (FOMSCU Foundation 1, EOY Final 2026, Q11)

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
sourceCandidateIds: find-existing.mjs on "synergist muscle prime mover" — 0 hits, safe to create. A broader grep for "synergist" alone returned only pharmacological/microbiological drug-synergy records (a different sense of the word), not the muscle-action-role fact tested here.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
White matter in the nervous system is formed by nerve fibers

## id
CON-NEU-846C2990B967C1

## canonical_key
neuroanatomy.white-matter.composed-of-nerve-fibers

## aliases
White matter composition
Grey matter vs white matter

## arabic_label


## arabic_aliases


## definition
White matter in the nervous system is formed by nerve fibers (axons), most of them myelinated — the myelin sheath's lipid content is what gives white matter its pale colour. This is distinct from grey matter, which is formed by nerve cell bodies (along with dendrites and unmyelinated fibres), and distinct also from synaptic vesicles (small membrane-bound sacs of neurotransmitter inside a nerve terminal) and dendritic trees (the branching receptive processes of a single neuron), neither of which is the structural component that defines white matter as a tissue region.

## explicit_objective
State that white matter is formed by nerve fibers (myelinated axons), distinguishing it from the nerve cell bodies that form grey matter and from synaptic vesicles and dendritic trees.

## pitfalls
Assuming any neural structure inside the CNS could equally define "white" vs "grey" matter — the colour distinction specifically tracks fibers (myelin, giving white matter its pale colour) versus cell bodies (giving grey matter its colour), not synaptic vesicles or dendrites.

## concept_type
definition

## status
under review

## subject
neuro

## topic
Neuroanatomy

## subtopic
Basic CNS histology: grey vs white matter

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
ART-SCU-FBS102-NEU-BRAINSTEM

## related_article_ids


## related_concept_ids
CON-NEU-13DB29B3F93239
CON-NEU-EBD57894496834

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
SCU-FBS102 > Anatomy > Basic Neuroanatomy

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final 2026 Q14 | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following structural components forms the white matter in the nervous system? ... Fibers" (FOMSCU Foundation 1, EOY Final 2026, Q14)

## merge_ids


## rejected_merge_candidate_ids
CON-NEU-EBD57894496834

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
sourceCandidateIds: find-existing.mjs on "white matter nerve fibers nervous system" — 0 hits, safe to create.
rejectedMergeCandidateIds: CON-NEU-EBD57894496834, "Spinal white matter contains myelinated nerve fibers and neuroglia" — names fibers as one component of spinal white matter specifically, but does not state the general fibers-vs-cell-bodies (white-vs-grey) distinction this FOMSCU stem tests against Nerve cell bodies/Synaptic vesicles/Dendritic trees distractors. Not merged; cross-linked instead. Kasr's own 103-BMS-mcq-vitamins-nerve-concepts.md already logged this same id as a rejected merge candidate for a neighbouring myelination fact, for the same reason (composition statement, not a definitional contrast).
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The medulla oblongata is a core part of the brainstem

## id
CON-NEU-13DB29B3F93239

## canonical_key
neuroanatomy.brainstem.medulla-oblongata-core-part

## aliases
Brainstem components
Medulla oblongata classification

## arabic_label


## arabic_aliases


## definition
The medulla oblongata is a core part of the brainstem, the stalk-like lower part of the brain that connects the spinal cord to the rest of the brain and houses the vital cardiorespiratory centres. The brainstem's other core parts are the pons and midbrain. The cerebral cortex (the cerebrum's outer grey-matter layer), the cerebellar hemispheres (paired lobes of the cerebellum, attached to the brainstem but not part of it) and the corpus callosum (the white-matter tract connecting the two cerebral hemispheres) are each distinct structures, not parts of the brainstem itself.

## explicit_objective
Identify the medulla oblongata as a core part of the brainstem, distinguishing it from the cerebral cortex, cerebellar hemispheres and corpus callosum, none of which is a brainstem component.

## pitfalls
Assuming the cerebellum, because it sits adjacent to and communicates heavily with the brainstem, is itself a brainstem structure — the cerebellum is attached to the brainstem by the cerebellar peduncles but is anatomically and developmentally distinct from it, unlike the medulla, pons and midbrain.

## concept_type
classification

## status
under review

## subject
neuro

## topic
Neuroanatomy

## subtopic
Brainstem: gross subdivisions

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
ART-SCU-FBS102-NEU-BRAINSTEM

## related_article_ids


## related_concept_ids
CON-NEU-846C2990B967C1

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
0.85

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Anatomy > Basic Neuroanatomy

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY Final 2026 Q16 | SCU-FBS102

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following structures is considered a core part of the brainstem? ... Medulla oblongata" (FOMSCU Foundation 1, EOY Final 2026, Q16)

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
sourceCandidateIds: find-existing.mjs on "medulla oblongata core part brainstem" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The developing morula remains free in the uterine cavity for about three days before becoming a blastocyst

## id
CON-DEV-91DA3B19B9A506

## canonical_key
embryology.morula.free-in-uterine-cavity-three-days

## aliases
Morula to blastocyst timing
Free morula in the uterine cavity

## arabic_label


## arabic_aliases


## definition
According to this FOMSCU source's own teaching timetable, the developing morula remains free (unattached) within the uterine cavity for about three days before it transforms into a blastocyst, ahead of implantation. The morula is a solid ball of blastomeres produced by cleavage of the fertilised zygote; it has no internal cavity, and the fluid-filled cavity (blastocele) that defines the blastocyst stage only forms after this free period in the uterine cavity, per this source's teaching.

## explicit_objective
State, per this FOMSCU source's own teaching, that the free-floating morula spends about three days in the uterine cavity before becoming a blastocyst.

## pitfalls
Assuming the "three days" describes the time from fertilisation to the morula's first appearance rather than the time the already-formed morula spends free in the uterine cavity before its transformation into a blastocyst — this source's stem specifically asks about the second interval, not the first.

## concept_type
fact

## status
under review

## subject
dev

## topic
Embryology

## subtopic
First week: cleavage, morula and blastocyst formation

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
ART-SCU-FBS102-EMBRYO-MORULA

## related_article_ids


## related_concept_ids
CON-DEV-F5A87FDF5D911C

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
0.35

## module_subject
SCU-FBS102 > Embryology > First Week

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021 | Formative and Past Exams 2021 Q74 | SCU-FBS102

## confidence
0.6

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The developing morula remains completely free in the uterine cavity for how many days before changing into a blastocyst? ... Three days" (FOMSCU Foundation 1, Formative and Past Exams 2021, Q74; repeated verbatim in 2022, Q53)

## merge_ids


## rejected_merge_candidate_ids
CON-DEV-F5A87FDF5D911C

## conflicts
CON-DEV-F5A87FDF5D911C ("Cleavage divides the zygote inside the zona pellucida, giving a 16-cell morula in the tube by the third day") states the morula FORMS in the uterine TUBE by day 3 and is carried to the uterine CAVITY, which it reaches on day 4 — a different timing model than this FOMSCU stem's own claim that the morula is free IN THE CAVITY for three days before becoming a blastocyst. Not merged and not corrected: LANE-CARD.md's standing rule is that printed keys stand, so the printed answer (Three days) is honoured, and this discrepancy between the two sources' teaching timelines is logged here rather than silently resolved either way. Needs Omar if a single canonical timeline is ever required across sources.

## uncertainty
This source's own timing model (morula free in the CAVITY for 3 days pre-blastocyst) differs from the Kasr concept's timing model (morula forms in the TUBE by day 3, reaches the cavity on day 4). Both are printed-key-backed but not reconciled; flagged rather than guessed at.

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
sourceCandidateIds: find-existing.mjs on "morula three days uterine cavity blastocyst" — 0 hits, safe to create.
rejectedMergeCandidateIds: CON-DEV-F5A87FDF5D911C — see conflicts field above; not merged because the two sources' specific timing claims disagree, not because the topic differs.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
