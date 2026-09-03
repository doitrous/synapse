<!--
  Hand-authored NEW concept for AU-MED-103 (Blood and Immune System & Medical
  Terminology), Biochemistry department, lane W1-103-BIOC Step 2 lane 2 (bioc2). One
  genuinely new concept survived the search-before-mint pass across this whole batch:
  everything else the 45-question batch tests was already minted by this lane's own
  Step 2 lane 1 (concept/AU-MED-103-biochemistry-concepts.md, live-flavoured), by the
  sibling Kasr 103-BMS carbohydrate/heme batches (pending-live overlay), or by the
  sibling AU-MED-102 biochemistry-metabolism batch (pending-live overlay) — see
  pending-live/AU-MED-103-biochemistry-2-*-overlay-concepts.md for those. This record
  passed find-existing.mjs ("PFK-1 activator", "phosphofructokinase inhibitor" — no hit)
  plus `grep -ril "phosphofructokinase" docs/*-Source-Imports/concept/
  docs/*-Source-Imports/pending-live/ docs/import-ready/concept/` (one hit only: this
  lane's own already-minted CON-FND-853096A349FFBD/CON-FND-EA1BA37ACB643B family, which
  name PFK-1 as glycolysis's committed step but do not cover its allosteric regulation).
--># Item
## id
CON-FND-7C2C9C8F5A1E43

## label
PFK-1 is switched on by AMP and fructose 2,6-bisphosphate and switched off by ATP and citrate

## canonical_key
glycolysis.pfk1.allosteric-regulation

## aliases
PFK-1 allosteric regulation | Phosphofructokinase-1 activators and inhibitors | Fructose 2,6-bisphosphate and PFK-1

## arabic_label
التنظيم التفارغي لإنزيم فوسفوفركتوكيناز-1

## arabic_aliases
[clear]

## definition
PFK-1, the committed and rate-limiting enzyme of glycolysis, is controlled allosterically
rather than by covalent modification. Falling energy charge, signalled by a rise in AMP,
switches PFK-1 on; rising energy charge, signalled by ATP and by citrate (a citric acid
cycle intermediate that accumulates when the cycle is already well supplied), switches it
off. Fructose 2,6-bisphosphate, made from fructose-6-phosphate by a separate bifunctional
enzyme under hormonal control, is PFK-1's single most powerful activator and is what lets
insulin push glycolysis forward in the fed liver.

## explicit_objective
State which two signals switch PFK-1 on (AMP, fructose 2,6-bisphosphate) and which two switch it off (ATP, citrate), and explain why each pairing makes physiological sense as an energy-charge and substrate-supply signal.

## pitfalls
Confusing PFK-1's own substrate, fructose-6-phosphate, with fructose 2,6-bisphosphate, the
separate regulatory molecule that activates it — they are chemically distinct compounds
one phosphate apart. Assuming ADP rather than AMP is the activating adenine nucleotide:
AMP is the more sensitive low-energy signal because cellular AMP concentration rises much
more steeply than ADP does as ATP falls, via the adenylate kinase reaction.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
[clear]

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > CHO metabolism chapter

## article_ids
ART-FND-PFK1-ALLOSTERIC-REGULATION

## related_article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_concept_ids
CON-FND-853096A349FFBD

## resource_ids
src_97aa282c2fde6f6025a2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.4

## exam_weight_by_year
AU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"PFK-1 is activated by all the following except: ... " (AGHA-CHO, MCQs - CHO Metabolism MCQs (1), Q12, p3-4).

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed
[clear]

## review_due
[clear]

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason
[clear]

## field_notes
microtopicId: The canonical placement is already more precise than the overlay microtopic.
nanotopicId: The microtopic placement is already more precise than any nanotopic would be.
moduleIds: No verified live module ID was supplied; curriculum mapping remains explicit and unguessed.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the department CHO Metabolism MCQ bank; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "PFK-1 activator", "phosphofructokinase inhibitor" -- no hit beyond this lane's own committed-step concept (CON-FND-853096A349FFBD family), a different grain (enzyme identity, not its regulators).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none -- find-existing.mjs and grep returned only the committed-step concept, which this record's related_concept_ids points to rather than rejects, since the two are directly related (same enzyme, different fact).
relationships: related_concept_ids set to CON-FND-853096A349FFBD (PFK-1's identity as glycolysis's committed step) -- the natural sibling fact. No typed edge authored this batch, left for a relations pass.
examSignal: AGHA-CHO Q12 (p3-4, keyed d, "PFK-1 activators except" -- fluoride is the odd one out among AMP/F2,6BP/ADP-style activators in the source's own option list).
