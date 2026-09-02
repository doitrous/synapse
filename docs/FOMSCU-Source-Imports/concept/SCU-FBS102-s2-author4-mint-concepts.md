<!--
  SCU-FBS102 · Foundation 1 — S2 minting pass, fourth author lane
  (scu-fbs102-author4), histology + biochemistry cluster. Four concepts
  genuinely new to the corpus after re-verification: `find-existing.mjs`
  with realistic multi-word queries AND `grep -ril` of distinctive terms
  across every `docs/*-Source-Imports/concept/`, `pending-live/` and
  `docs/import-ready/concept/` directory, plus a read of every hit body —
  same trap lane 3 named (find-existing.mjs's pending-batch scanner reads
  only a `##` heading's first line, so a fact sitting past the first line of
  a multi-line `aliases`/`definition` block is invisible to it).

  Twelve of this lane's original sixteen "remaining" candidates turned out,
  on that closer pass, to already have a matching concept sitting in
  another module's pending batch (nine reused directly; three more are a
  second FOMSCU exam-year citation on a concept lane 3 or an earlier lane
  had already tagged `+scu` in the sibling overlay file) — none of those
  twelve are minted here. See the hand-off report for the full reclassify
  list and the sibling `pending-live/SCU-FBS102-overlay-concepts.md` for the
  nine new sparse SCU-tag overlay rows this lane adds.

  Ids minted with `mint-concept-id.mjs`, checked against the live snapshot
  and the taken-id scan (13578 existing ids at mint time); none derived for
  a concept that already exists. `atomic_claim_ids` is `[clear]` on every
  record — this lane is scoped to concept, article and question files, no
  evidence claim or citation records, matching lane 3's own convention. The
  evidence chain is owed and named in the hand-off report, not concealed.

  `primary_node_id` is left blank with a field_note on every record, same
  reason lane 3 gave: the canonical DIS-* taxonomy nodes could not be
  resolved from this worktree in the time this lane had, and inventing one
  would be worse than naming the gap. `module_subject` carries FOMSCU's own
  placement instead.

  Sources: FOMSCU Foundation 1 own-source quiz-app JSON, keys and stems read
  directly from `03 Questions and QBank/*.json` and `06/07 Exams/*.json`
  (question numbers cited per record) — printed keys stand; every
  explanation is written fresh in the platform's own voice from standard
  textbook fact, never translated from the source JSON's own Arabic
  explanation field.
-->

# Item

## label
A smooth muscle fibre's nucleus looks rounded in transverse section, elongated in longitudinal section

## id
CON-FND-056E29C05028D2

## canonical_key
histology.smooth-muscle.transverse-section-nucleus-rounded

## aliases
Smooth muscle nucleus shape by plane of section

## arabic_label


## arabic_aliases


## definition
A smooth muscle fibre is a long, spindle-shaped cell with a single, central, cigar-shaped nucleus. The nucleus's apparent shape on a slide depends entirely on the plane the fibre is cut in: a longitudinal section, which runs along the long axis of the spindle-shaped cell, shows the nucleus in its true elongated, cigar-shaped outline; a transverse (cross) section, which cuts straight across the narrow fibre, catches the nucleus end-on and it appears rounded instead. The fibre's cytoplasm shows the same plane-dependence — round and homogeneously acidophilic in transverse section, long and spindled in longitudinal section — so the nucleus's rounded appearance in a transverse section is not a different nucleus shape, only a different cut through the same one.

## explicit_objective
State that a smooth muscle fibre's single central nucleus appears rounded in transverse section and elongated in longitudinal section, and explain why — the plane of section, not a change in the nucleus itself.

## pitfalls
Treating "rounded" and "elongated" as two different facts about two different nuclei. Both describe the same single central nucleus of the same fibre; only the plane of section that catches it differs, exactly as the fibre's own outline goes from a round dot (transverse) to a long spindle (longitudinal) in the same two cuts.

## concept_type
structural_description

## status
under review

## subject
fnd

## topic
Histology

## subtopic
Muscle tissue: smooth muscle

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
ART-SCU-FBS102-HIS-SMOOTH-MUSCLE-CYTOLOGY

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
0.75

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Histology > Muscle Tissue > Smooth Muscle

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021,2022 | Formative and Past Exams 2021 Q78 (also 2022 Q57) | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the exact typical shape of the nucleus when viewing a transverse section of a smooth muscle fiber? ... Rounded" (FOMSCU Formative and Past Exams 2021, Q78; also 2022 Q57)

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
sourceCandidateIds: docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md carries a broader smooth-muscle EM concept (CON-MSK-B080975D6171CF, "single oval central nucleus") describing the longitudinal-section appearance generally, but not this transverse-section-specific "rounded" teaching point — read in full and judged a different fact, not a duplicate, so minted rather than overlaid.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Polyunsaturated fatty acids (linoleic and alpha-linolenic acid) are the essential fatty acids

## id
CON-FND-C8A3D8D970AF9F

## canonical_key
biochemistry.fatty-acids.pufa-are-essential-fatty-acids

## aliases
PUFA as essential fatty acids

## arabic_label


## arabic_aliases


## definition
Essential fatty acids cannot be synthesised by the human body and must be supplied in the diet; the two named essential fatty acids, linoleic acid (an omega-6 polyunsaturated fatty acid) and alpha-linolenic acid (an omega-3 polyunsaturated fatty acid), are both polyunsaturated (more than one double bond), so polyunsaturated fatty acids as a class are generally considered essential fatty acids. Arachidonic acid is a further omega-6 polyunsaturated fatty acid that the body normally synthesises from linoleic acid, and it becomes essential only when dietary linoleic acid is deficient (conditionally essential). Saturated fatty acids, by contrast, are readily made from carbohydrate and are never essential.

## explicit_objective
State that polyunsaturated fatty acids, as a class, are generally classed as the essential fatty acids, and name linoleic and alpha-linolenic acid as the two unconditionally essential examples.

## pitfalls
Assuming every polyunsaturated fatty acid is unconditionally essential, or that essentiality is unrelated to saturation. Arachidonic acid is a PUFA the body normally makes for itself and is only conditionally essential, but the general class-level association — polyunsaturated fatty acids are the essential ones, saturated fatty acids are not — still holds and is what a "generally classified" question is testing.

## concept_type
classification

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
Lipids: fatty acid classification

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
ART-SCU-FBS102-BIO-LIPIDS-AMINOACIDS-VITAMINS

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
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Biochemistry > Lipids of Biological Importance

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY - Foundation 1 2026 - FOMSCU Final Q52 | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Polyunsaturated fatty acids are generally considered to belong to which of the following groups? ... Essential fatty acids" (FOMSCU EOY Foundation 1 2026 Final, Q52)

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
sourceCandidateIds: docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md carries both a PUFA-class concept and a named-essential-fatty-acids concept, but neither states the class-level equivalence this question tests (PUFA generally = essential fatty acids) — read in full and judged a different fact from either, so minted rather than overlaid.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Human proteins are built exclusively from L-amino acids

## id
CON-FND-555E4A38A269A6

## canonical_key
biochemistry.amino-acids.l-isomer-is-the-natural-form

## aliases
L-amino acids as the natural isomer


## arabic_label


## arabic_aliases


## definition
Amino acids other than glycine have a chiral alpha-carbon and so exist as two stereoisomers, D and L, mirror images of one another. Only the L-isomer occurs in the proteins of the human body and of virtually all living organisms; D-amino acids exist in nature (for example in some bacterial cell walls and a few peptide antibiotics) but are not incorporated into human protein. This L-selectivity is a property of the protein-synthesis machinery, not of chemical stability — D- and L-amino acids are equally stable — and it is a separate fact from glycine's own special case of having no chiral centre at all and so no D or L form.

## explicit_objective
State that the amino acids of human protein are all in the L configuration, and that this is the naturally occurring isomeric form in the body.

## pitfalls
Confusing L-selectivity with glycine's lack of a chiral centre. Glycine is optically inactive because it has no asymmetric carbon at all — it is neither D nor L — which is a different fact from the other nineteen standard amino acids, which do have a chiral centre and are selected as the L-form specifically.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
Amino acids: stereochemistry

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
ART-SCU-FBS102-BIO-LIPIDS-AMINOACIDS-VITAMINS

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
0.75

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Biochemistry > Amino Acids and Proteins

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2026 | EOY - Foundation 1 2026 - FOMSCU Final Q48 | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the specific isomeric type of amino acids that is naturally found in human proteins? ... L amino acids" (FOMSCU EOY Foundation 1 2026 Final, Q48)

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
sourceCandidateIds: grep -ril for "L-amino"/"L amino acid"/"L-isomer"/"levorotatory" across every concept/pending-live directory returned no hit. Safe to mint.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Scurvy is the classic disease of chronic vitamin C deficiency

## id
CON-FND-53814C63B5D46C

## canonical_key
biochemistry.vitamin-c.scurvy-is-the-classic-deficiency

## aliases
Ascorbic acid deficiency disease

## arabic_label


## arabic_aliases


## definition
Scurvy is the classic disease of chronic vitamin C (ascorbic acid) deficiency. Vitamin C is a required cofactor for lysyl and prolyl hydroxylase, the enzymes that hydroxylate lysine and proline residues during collagen synthesis; without it, collagen cannot form its stable triple helix and cross-links properly, producing scurvy's hallmark features — bleeding gums, poor wound healing, and fragile blood vessels causing easy bruising and perifollicular haemorrhages. This is distinct from vitamin C's separate, narrower role in dietary iron absorption (a gastrectomy or vitamin C deficiency can each independently impair non-haem iron uptake) — that fact concerns iron-deficiency anaemia, not the classic collagen-based deficiency disease scurvy itself.

## explicit_objective
Name scurvy as the classic vitamin C deficiency disease, and connect it to vitamin C's cofactor role in collagen hydroxylation.

## pitfalls
Confusing vitamin C's role in collagen synthesis (the basis of scurvy) with its separate, narrower role in dietary iron absorption. Both are real vitamin C facts, but a question asking for the "classic" or primary deficiency disease is asking for scurvy, not iron-deficiency anaemia.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
Vitamins: water-soluble

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
ART-SCU-FBS102-BIO-LIPIDS-AMINOACIDS-VITAMINS

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
0.4

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS102 > Biochemistry > Vitamins

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | 2021,2022 | Formative and Past Exams 2021 Q72 (also 2022 Q51) | SCU-FBS102

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Scurvy disease is primarily and classically caused by a chronic deficiency of which of the following vitamins? ... Vitamin C" (FOMSCU Formative and Past Exams 2021, Q72; also 2022 Q51)

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
sourceCandidateIds: docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md's own field_notes record a corpus search for "ascorbic" returning no existing record; the only vitamin-C hits anywhere are its cofactor role inside collagen (lysine hydroxylation) and iron-absorption records, neither of which states scurvy as vitamin C's classic/primary deficiency disease — read in full and judged a different fact, so minted rather than overlaid.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
