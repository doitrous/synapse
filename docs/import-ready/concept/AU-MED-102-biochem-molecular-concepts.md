<!--
  AU-MED-102 (Foundation of Basic Medical Sciences & Medical Terminology) ·
  Biochemistry, sub-lane D (molecular biology & cell signalling) — NEW concepts.

  Every ## id below was minted with tools/mint-concept-id.mjs (SYSTEM=FND), checked
  against live state and every unimported docs/*-Source-Imports concept batch first
  (>= 4 find-existing.mjs queries per idea, plus grep -ril <canonical_key> against
  every university's pending concept/ directory) per LANE-BRIEF.md SS10/SS16 -
  transcripts in this lane's scratch directory, summarised in its S8 report.

  26 of the 68 ideas this sub-lane owns (see coverage/AU-MED-102-biochemistry-triage.md
  SS9) are minted here; 7 more that hit an existing Kasr pending concept are sparse
  updates in pending-live/AU-MED-102-biochem-molecular.md instead, never here. The
  remaining ideas are mapped (target concept group + HIT/NEW decision already made)
  but not yet authored - see this lane's hand-over report for the list.

  atomic_claim_ids / resource_ids point at claim and citation ids this lane mints in
  its own evidence/AU-MED-102-biochem-molecular-*.md files. Those claims/citations
  name the correct src_... source ids (verified against corpus-source-index.json),
  but the *evidence-source* record for each of the 13 AU-MED-102 Biochemistry sources
  is owned by sub-lane A (evidence/AU-MED-102-biochemistry-resources.md) and does not
  exist yet - this lane references the ids rather than minting a resource, and has
  filed a Wanted row in CLAIMS.md. medical:audit will report these as an unresolved
  resource until that file lands; that is the documented cross-lane dependency, not a
  defect in this batch. See exam_signal on every record for the exact question this
  concept traces to.
-->

# Item

## id
CON-FND-92DD65D96E3FA1

## label
Purine catabolism in humans ends at uric acid, not urea or hypoxanthine

## canonical_key
purine.catabolism.uric-acid-endproduct

## aliases
Purine breakdown product
End product of purine catabolism
Uric acid formation

## arabic_label
حمض اليوريك كناتج نهائي لتكسير البيورينات

## arabic_aliases
تكسير البيورينات

## definition
Humans lack uricase, so the purine bases adenine and guanine are degraded through hypoxanthine and xanthine to uric acid, which is excreted rather than oxidised further. Urea is the end product of amino-acid nitrogen disposal, a separate pathway.

## explicit_objective
State that uric acid, not urea or hypoxanthine, is the final excreted product of human purine catabolism, and explain why (uricase is absent in humans).

## pitfalls
Confusing the end product of purine catabolism (uric acid) with the end product of amino-acid nitrogen disposal (urea) because both are nitrogenous waste excreted in urine. Hypoxanthine and xanthine are catabolic intermediates, not the end product.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01

## topic
Molecular biology

## subtopic
Nucleotide metabolism

## microtopic
Purine catabolism

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Purine catabolism

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-92DD65D96E3FA1-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
The chief product of catabolism of purines in human beings is: b- Uric acid

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q1

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: Cross-links to sub-lane C's blood-biochemistry heme/purine concepts (gout, hyperuricaemia) are that lane's to make; this record is the plain biochemical fact only.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-7302601EA492D2

## label
DNA replication fidelity rests on complementary base pairing and DNA polymerase's own proofreading, and the same base-pairing rule lets you write any strand's complement

## canonical_key
replication.fidelity.base-pairing-and-proofreading

## aliases
Replication fidelity
Complementary base pairing
Predicting a complementary DNA strand

## arabic_label
دقة التضاعف والتزاوج التكاملي للقواعد

## arabic_aliases
تزاوج القواعد التكاملي

## definition
Replication copies a template strand with very low error because each incoming nucleotide must complementary-base-pair correctly (A with T, G with C) before DNA polymerase adds it, and the polymerase itself proofreads by removing a wrongly-paired nucleotide via its 3'-to-5' exonuclease activity. The same pairing rule lets a student derive the complementary sequence of any given strand, antiparallel and base-for-base.

## explicit_objective
Explain the two mechanisms that give DNA replication its fidelity, and apply the base-pairing rule to write the antiparallel complement of a given DNA sequence.

## pitfalls
Naming only base pairing and forgetting that DNA polymerase's proofreading is a second, independent check — the question bank tests both as the reasons fidelity is high, not one alone. When writing a complementary strand, forgetting to reverse the direction (5'->3' becomes 3'->5' on the new strand written the other way).

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA replication

## microtopic
Replication fidelity

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA replication

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-5BAF472E54A764

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.4

## exam_weight_by_year
AU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids
CLM-FND-7302601EA492D2-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Fidelity of replication is ensured by: a- Complementary base pairing (and) b- Specificity of DNA polymerase

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q2, q3, q28
src_01ab4268402d32d4d111 | department_bank | | molecular biology q1, q2

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to the antiparallel/hydrogen-bonding concept (a Kasr pending record, so cross-linked loosely rather than as a typed edge, since a typed edge needs both endpoints live).
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-73C77966B56FED

## label
Telomerase adds telomeric repeats so a linear chromosome does not shorten with every replication

## canonical_key
telomere.replication.telomerase-function

## aliases
Telomerase
End-replication problem
Chromosome ageing

## arabic_label
إنزيم التيلوميراز ووظيفته

## arabic_aliases
التيلومير

## definition
Linear chromosomes lose a small amount of sequence at each round of replication because the lagging strand cannot be primed all the way to its end. Telomerase, a reverse transcriptase carrying its own RNA template, extends the chromosome's telomeric repeats to offset this loss, which is why it is described as protecting DNA from ageing.

## explicit_objective
State what telomerase does and why a cell without active telomerase loses chromosomal DNA with each division.

## pitfalls
Confusing telomerase with topoisomerase or DNA ligase because all three are 'enzymes that do something to DNA ends or coils' — telomerase is specifically about compensating for end-replication loss, not relieving supercoiling or sealing nicks.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA replication

## microtopic
Telomeres and telomerase

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA replication

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.35

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-73C77966B56FED-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Which enzyme protects DNA from aging? d- Telomerase

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q4

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: No populated neighbour under DIS-BIO-T06 shares this specific mechanism; recorded as an isolated leaf pending the relationship pass once more of this cluster is live.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-F1E54D68C8FAB0

## label
RNA is distinguished from DNA by uracil in place of thymine and by being single-stranded, and RNA never contains xanthine as a base

## canonical_key
rna.composition.uracil-vs-thymine-single-strand

## aliases
RNA vs DNA bases
Uracil vs thymine
RNA composition

## arabic_label
التركيب الكيميائي للحمض النووي الريبي

## arabic_aliases
اليوراسيل مقابل الثايمين

## definition
RNA carries uracil where DNA carries thymine, is built as a single strand rather than a duplex, and — like DNA — never uses xanthine as one of its four bases; xanthine is a purine catabolism intermediate, not a nucleic acid base. mRNA in particular is important for protein synthesis and contains all the standard RNA bases except thymine.

## explicit_objective
Identify the base and strandedness differences that distinguish RNA from DNA, and reject xanthine as a nucleic acid base in either.

## pitfalls
Assuming xanthine must be one of the bases because it appears in the same metabolic neighbourhood as the true purine bases (adenine, guanine) — it is a catabolic intermediate, never incorporated into RNA or DNA.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Nucleic acid structure

## microtopic
RNA composition

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > RNA structure

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.25

## academic_relevance
0.6

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-F1E54D68C8FAB0-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
The nitrogenous base absent in DNA is: a- Uracil
As regard RNA, all are correct EXCEPT: a- It contains xanthine

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q5, q6, q18
src_01ab4268402d32d4d111 | department_bank | | molecular biology q4, q5, q20

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: Loosely related to the mRNA-processing concept in this same file (both concern mRNA), but each answers a different question, so no typed edge — recorded as related_concept_ids only.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-5FF8EB2DB4D662

## label
mRNA processing adds a 7-methylguanosine 5' cap and a 3' poly-A tail and removes introns by splicing — nuclear export is a separate, later step, not part of processing itself

## canonical_key
mrna.processing.capping-polyadenylation-splicing

## aliases
mRNA processing
5' cap
Poly-A tail
Post-transcriptional processing

## arabic_label
معالجة الحمض النووي الريبي المرسال

## arabic_aliases
الغطاء الطرفي 5
ذيل بولي أدينين

## definition
A eukaryotic primary transcript is processed into mature mRNA by three steps: capping the 5' end with 7-methylguanosine triphosphate, adding a poly-A tail at the 3' end, and splicing out introns to join exons. Export of the finished mRNA from the nucleus to the cytoplasm happens afterwards, as a separate transport step, not as part of processing.

## explicit_objective
List the three steps of mRNA processing and the chemical identity of the 5' cap, and distinguish processing from the nuclear-export step that follows it.

## pitfalls
Listing nuclear export as one of the processing steps because it happens in the same general sequence of events — the question bank specifically tests that export is what processing is not.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Transcription

## microtopic
mRNA processing

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Transcription

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.4

## exam_weight_by_year
AU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.65

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-5FF8EB2DB4D662-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
The processing of mRNA does not involve: d- Transfer of mRNA into nucleus
After Transcription, 5' end of mRNA is capped with which molecule? a- 7-Methyl Guanosine Tri phosphate

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q7, q42, q79
src_01ab4268402d32d4d111 | department_bank | | molecular biology q6, q15

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: Cross-links loosely to the pending splicing/intron concept (CON-FND-27013C64915C7E, Kasr 102-INT) and the pending promoter concept (CON-FND-CC55F157021237) — both teach adjacent steps of the same transcription-to-translation pipeline.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-A1B0BFB9626438

## label
The genetic code is degenerate, unambiguous, non-overlapping and universal, and each codon is exactly three nucleotides long

## canonical_key
code.properties.degenerate-unambiguous-nonoverlapping-universal

## aliases
Genetic code properties
Triplet code
Codon

## arabic_label
خصائص الشفرة الوراثية

## arabic_aliases
الشفرة الوراثية

## definition
A codon is a triplet of three mRNA nucleotides. The genetic code built from these triplets is degenerate (most amino acids have more than one codon), unambiguous (a given codon specifies only one amino acid, never several), non-overlapping (each nucleotide belongs to only one codon, read consecutively) and universal (nearly all organisms use the same code). It is not ambiguous — that is the property it lacks, and the property exam questions most often test by asking which statement is false.

## explicit_objective
State the four defining properties of the genetic code (degenerate, unambiguous, non-overlapping, universal) and the length of a codon, and identify 'ambiguous' as the property the code does not have.

## pitfalls
Picking 'ambiguous' as a true property of the genetic code because it superficially resembles 'degenerate' — degeneracy means several codons can specify one amino acid; ambiguity would mean one codon specifies several amino acids, which never happens.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
The genetic code

## microtopic
Genetic code properties

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Genetic code

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
CON-FND-906B844C9AEE7D

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.4

## exam_weight_by_year
AU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.65

## weight_confidence
0.45

## confidence
0.75

## atomic_claim_ids
CLM-FND-A1B0BFB9626438-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Which is not true regarding the genetic code? b- Ambiguous
The number of nitrogenous bases in mRNA that form a codon is: b- 3

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q9, q12, q46, q56, q68, q77
src_01ab4268402d32d4d111 | department_bank | | molecular biology q8

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own anticodon-codon-pairing concept — both belong to the same 'reading the genetic code' cluster.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-E8CD7F7F690B14

## label
Xeroderma pigmentosum is a defect in nucleotide excision repair, leaving UV-induced DNA damage unrepaired

## canonical_key
repair.xeroderma-pigmentosum.nucleotide-excision-defect

## aliases
Xeroderma pigmentosum
Nucleotide excision repair defect
UV sensitivity, DNA repair

## arabic_label
جفاف الجلد المصطبغ وعيب الإصلاح باستئصال النيوكليوتيدات

## arabic_aliases
إصلاح استئصال النيوكليوتيدات

## definition
Xeroderma pigmentosum is caused by a defect in nucleotide excision repair, the pathway that normally removes bulky, helix-distorting lesions such as UV-induced pyrimidine dimers. Without it, unrepaired UV damage accumulates, producing the extreme sun sensitivity and skin changes (including a markedly raised skin-cancer risk) that define the disease.

## explicit_objective
Name nucleotide excision repair as the pathway defective in xeroderma pigmentosum, and state what kind of lesion that pathway normally removes.

## pitfalls
Attributing xeroderma pigmentosum to a transcription or translation defect rather than a DNA-repair defect, because the clinical vignette describes damage 'from the outside' (sunlight) rather than an obviously genetic mechanism.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA repair

## microtopic
Nucleotide excision repair

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA repair

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.4

## exam_weight_by_year
AU_Y1=0.4

## clinical_relevance
0.55

## academic_relevance
0.5

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids
CLM-FND-E8CD7F7F690B14-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Xerodema pigmentosa results from defect in: c- DNA repair
A 13 years old boy suffers from ulceration and extreme sensitivity to sunlight, which of the following enzymes has a defect? a- Endonuclease

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q10, q81
src_01ab4268402d32d4d111 | department_bank | | molecular biology q9

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: Cross-links to this file's own DNA-repair-mechanism-family concept is owed once that concept is authored (deferred this turn, see field_notes).
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.
relatedConceptIds: The broader DNA-repair-mechanism-family concept (base excision / nucleotide excision / mismatch repair) that would normally cross-link here is mapped but not yet authored in this pass; see this lane's hand-over report.


---

# Item

## id
CON-FND-8E4A3DB9BC03AC

## label
The nucleotide sequence of a DNA strand is always written in the 5' to 3' direction by convention

## canonical_key
dna.strand-direction.five-to-three-convention

## aliases
5' to 3' direction
DNA sequence convention

## arabic_label
اتجاه كتابة تسلسل الحمض النووي من 5' إلى 3'

## arabic_aliases


## definition
By convention, the nucleotide sequence of a DNA (or RNA) strand is always written starting from its 5' end and ending at its 3' end, never the reverse and never ambiguously either direction, because the sugar-phosphate backbone itself has a fixed chemical polarity (a free 5'-phosphate at one end, a free 3'-hydroxyl at the other).

## explicit_objective
State that a nucleic acid sequence is conventionally written 5' to 3', and explain that this reflects the backbone's real chemical polarity rather than an arbitrary choice.

## pitfalls
Treating the writing direction as an arbitrary convention that 'could go either way' — the bank explicitly rejects that option, because the physical polarity of the backbone is real, not a labelling choice.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA structure

## microtopic
Strand polarity

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA structure

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-5BAF472E54A764

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.15

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-8E4A3DB9BC03AC-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
The order nucleotides in DNA strand in always written: a- From the 5' to 3' direction

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q11

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to the antiparallel/hydrogen-bonding pending concept — same structural topic, different specific fact.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-5B8E3AAFEB6C35

## label
DNA replication is semiconservative — each daughter duplex keeps one parental strand and synthesises one new strand — and it requires DNA polymerase

## canonical_key
replication.directionality.semiconservative

## aliases
Semiconservative replication
Meselson-Stahl

## arabic_label
التضاعف نصف المحافظ للحمض النووي

## arabic_aliases


## definition
Replication is semiconservative: each of the two new DNA duplexes is built from one original (parental) strand serving as template and one newly synthesised strand, so no daughter molecule is either fully new or fully old. It requires DNA polymerase, and — because polymerases only extend an existing 3'-OH — synthesis always proceeds 5' to 3' on the new strand, never 3' to 5'.

## explicit_objective
State that replication is semiconservative and explain why new DNA synthesis always runs 5' to 3', never 3' to 5'.

## pitfalls
Picking '3' to 5'' as a valid direction for new-strand synthesis because the template is read 3' to 5' — the template's reading direction and the new strand's synthesis direction are opposite, and the bank tests exactly this reversal as the false option.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA replication

## microtopic
Semiconservative replication

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA replication

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-7302601EA492D2

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.2

## academic_relevance
0.6

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-5B8E3AAFEB6C35-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Replication is characterized by all EXCEPT: c- It occurs from 3' - 5' direction

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q13

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own replication-fidelity concept — same overall process, different tested facts.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-412F3EDF118F44

## label
Each eukaryotic RNA polymerase transcribes its own class of genes: RNA polymerase I makes the large ribosomal RNAs, II makes mRNA, and III makes tRNA and the small 5S rRNA and snRNA

## canonical_key
transcription.rna-polymerase.gene-class-specificity

## aliases
RNA polymerase I II III
Eukaryotic RNA polymerases

## arabic_label
أنواع بوليميراز الحمض النووي الريبي الثلاثة

## arabic_aliases


## definition
Eukaryotes divide transcription among three RNA polymerases by the class of RNA product: RNA polymerase I transcribes the genes for the large ribosomal RNAs (5.8S, 18S and 28S rRNA), RNA polymerase II transcribes protein-coding genes into mRNA, and RNA polymerase III transcribes tRNA genes together with 5S rRNA and the small nuclear RNAs.

## explicit_objective
Match each of RNA polymerase I, II and III to the class of RNA gene it transcribes.

## pitfalls
Assuming RNA polymerase I makes mRNA because it is 'numbered first' — mRNA is polymerase II's product; I is dedicated to the large ribosomal RNAs.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Transcription

## microtopic
RNA polymerase specificity

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Transcription

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.2

## academic_relevance
0.6

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-412F3EDF118F44-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
RNA polymerase I transcribes the genes of: c- 5.8S, 18S, 28S rRNA

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q14

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: No populated sibling under DIS-BIO-T06 yet shares this exact fact; flagged for the relationship pass once the wider molecular-biology cluster is fuller.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-DF5E3014A149FC

## label
A transition point mutation swaps a purine for a purine or a pyrimidine for a pyrimidine; a transversion swaps a purine for a pyrimidine or vice versa

## canonical_key
mutation.point-mutation.transition-vs-transversion

## aliases
Transition mutation
Transversion mutation
Point mutation classification by base chemistry

## arabic_label
طفرة الانتقال مقابل التحويل

## arabic_aliases


## definition
Point mutations are classed by the chemical relationship between the old and new base. A transition substitutes one purine for the other purine (A<->G) or one pyrimidine for the other pyrimidine (C<->T/U); a transversion substitutes a purine for a pyrimidine or a pyrimidine for a purine. This axis (transition vs transversion) is independent of whether the substitution turns out to be silent, missense or nonsense.

## explicit_objective
Classify a given base substitution as a transition or a transversion from the purine/pyrimidine identity of the old and new bases.

## pitfalls
Confusing this purine/pyrimidine axis with the functional-consequence axis (silent/missense/nonsense) — a question can ask for either classification of the very same substitution, and they are not interchangeable answers.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Mutation

## microtopic
Point mutation classification

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Mutation

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
CON-FND-4508AC0EA86F86

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.25

## academic_relevance
0.6

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-DF5E3014A149FC-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
One of the following is transition type of point mutations: c- Guanine is replaced by adenine

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q16, q47, q83

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to the pending nonsense/missense/silent concept — this record is the base-chemistry axis, that one the functional-consequence axis, of the same substitution event.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-914D9DDFB56AD1

## label
Removing the phosphate group from a nucleotide leaves a nucleoside

## canonical_key
nucleotide.structure.nucleoside-vs-nucleotide

## aliases
Nucleoside vs nucleotide

## arabic_label
النيوكليوسيد مقابل النيوكليوتيد

## arabic_aliases


## definition
A nucleotide is a base joined to a sugar (a nucleoside) plus one or more phosphate groups. Removing the phosphate — not the base and not the sugar — is what converts a nucleotide into a nucleoside.

## explicit_objective
State which group's removal converts a nucleotide into a nucleoside.

## pitfalls
Answering 'purine base' or 'pyrimidine base' because base loss also changes the molecule — but base loss gives an abasic sugar-phosphate, not a nucleoside; it is specifically the phosphate whose removal defines the nucleoside.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Nucleotide structure

## microtopic
Nucleoside vs nucleotide

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Nucleotide structure

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.25

## exam_weight_by_year
AU_Y1=0.25

## clinical_relevance
0.15

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-914D9DDFB56AD1-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Nucleotide is converted into nucleoside by removal of: d- Phosphate

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q19

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: A small, self-contained definitional fact; no populated sibling to cross-link under DIS-BIO-T06 yet.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-CA2D65E688434A

## label
Every tRNA's acceptor arm ends in the same 3'-CCA sequence, which is where the amino acid attaches

## canonical_key
trna.structure.acceptor-arm-cca

## aliases
tRNA acceptor arm
3' CCA end

## arabic_label
ذراع القبول في الحمض النووي الريبي الناقل

## arabic_aliases


## definition
Every tRNA molecule, regardless of which amino acid it carries, terminates its acceptor arm at the 3' end with the same CCA sequence (5'-...C-C-A-3'). The terminal adenosine's 3'-hydroxyl is where the corresponding amino acid is esterified by its aminoacyl-tRNA synthetase.

## explicit_objective
State the sequence that terminates every tRNA's acceptor arm and what attaches there.

## pitfalls
Reversing the sequence direction (writing it 3'-ACC-5' or similar) — the bank tests the exact 5'-to-3' order, CCA, not just the three letters.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Translation

## microtopic
tRNA structure

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Translation

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
CON-FND-906B844C9AEE7D

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-CA2D65E688434A-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
The acceptor arm of tRNA terminates at its 3' OH ends by: 5'-CCA-3'

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q25

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own anticodon-codon-pairing concept — both are tRNA structural facts.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-09FACBDCBBF8FD

## label
AUG is the mRNA start codon in almost every case, and initiation forms a complex with methionyl-tRNA

## canonical_key
translation.initiation.start-codon-aug

## aliases
Start codon
AUG

## arabic_label
شفرة البدء AUG

## arabic_aliases


## definition
Translation begins at the codon AUG in the overwhelming majority of mRNAs, which is why AUG is called the start codon. In eukaryotic initiation, a methionyl-initiator-tRNA complex (charged with methionine and recognising AUG) is what assembles at the start site, not one of the other amino-acid tRNAs.

## explicit_objective
Name AUG as the (near-universal) mRNA start codon and identify methionyl-tRNA as the initiator complex that recognises it.

## pitfalls
Picking a stop codon (UAA, UGA) as the start codon by confusing 'the first codon read' with 'the codon that starts the process' — the initiator complex specifically recognises AUG, and a stop codon terminates rather than starts.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Translation

## microtopic
Translation initiation

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Translation

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.2

## academic_relevance
0.6

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-09FACBDCBBF8FD-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Which of the following is the mRNA start codon in most cases? c- AUG
During the initiation of translation in eukaryotes, a tRNA complex is formed with: c- Met (AUG)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q26, q33

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: Cross-links to this file's own peptidyl-transferase/termination concept are owed once that concept is authored (deferred this turn, see field_notes).
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.
relatedConceptIds: The translation-termination concept (peptidyl transferase, release factors) that would naturally cross-link here as the other end of the same process is mapped but not yet authored in this pass; see this lane's hand-over report.


---

# Item

## id
CON-FND-252B3C77D181DA

## label
DNA ligase joins Okazaki fragments together, sealing the nicks left on the lagging strand

## canonical_key
replication.dna-ligase.okazaki-fragment-joining

## aliases
DNA ligase
Okazaki fragment joining

## arabic_label
إنزيم لايجيز وربط شظايا أوكازاكي

## arabic_aliases


## definition
The lagging strand is synthesised discontinuously as short Okazaki fragments, each starting from its own RNA primer. After the primers are removed and replaced with DNA, DNA ligase forms the final phosphodiester bond that seals the nick between adjacent fragments, joining them into one continuous strand.

## explicit_objective
State what DNA ligase does at the lagging strand and why that step is needed there specifically.

## pitfalls
Crediting DNA ligase with synthesising the fragments themselves — that is DNA polymerase's job; ligase only seals the join between fragments that already exist.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA replication

## microtopic
Lagging-strand synthesis

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA replication

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-7302601EA492D2

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.2

## academic_relevance
0.6

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-252B3C77D181DA-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
What is the function of DNA ligase? c- Joins the Okazaki fragments

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q29

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own replication-fidelity concept — same overall process.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-D717E6E7EEA466

## label
The coding strand of DNA has the same sequence as its mRNA except that mRNA uses uracil where the coding strand uses thymine

## canonical_key
transcription.strands.coding-strand-vs-mrna

## aliases
Coding strand
Sense strand
Template strand vs coding strand

## arabic_label
الشريط المرمز مقابل الحمض النووي الريبي المرسال

## arabic_aliases


## definition
The coding (sense) strand of DNA reads the same base sequence as the mRNA transcribed from that gene, base for base, with one systematic substitution: everywhere the coding strand carries thymine, the mRNA carries uracil. RNA polymerase itself copies the other strand, the template (antisense) strand, by complementary base pairing.

## explicit_objective
State the one difference between a gene's coding strand and its mRNA, and identify which of the two DNA strands RNA polymerase actually reads.

## pitfalls
Assuming the coding strand is the one RNA polymerase reads because it is called 'coding' — polymerase reads the template strand; the coding strand is named for matching the RNA product, not for being the one transcribed.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Transcription

## microtopic
Coding vs template strand

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Transcription

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.2

## academic_relevance
0.6

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-D717E6E7EEA466-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
The coding strand of DNA is the same as the associated mRNA EXCEPT for: a- mRNA uses U instead of T

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q30, q63

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: Cross-links to this file's own RNA-polymerase-mechanism concept are owed once that concept is authored (deferred this turn, see field_notes).
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.
relatedConceptIds: The RNA-polymerase-mechanism concept (3'-addition, no primer) that would naturally cross-link here is mapped but not yet authored in this pass; see this lane's hand-over report.


---

# Item

## id
CON-FND-906B844C9AEE7D

## label
A tRNA's anticodon, at its 3' end, pairs with the complementary codon on mRNA to place the correct amino acid

## canonical_key
translation.trna.anticodon-codon-pairing

## aliases
Anticodon
Codon-anticodon pairing

## arabic_label
اقتران الشفرة المضادة مع الشفرة الوراثية

## arabic_aliases


## definition
The anticodon is a three-nucleotide sequence carried on tRNA that base-pairs, antiparallel, with the complementary codon on mRNA. This pairing is what positions each tRNA's specific amino acid at the correct place in the growing polypeptide, translating the mRNA sequence into a protein sequence.

## explicit_objective
State which two molecules pair through the anticodon-codon interaction, and which one (mRNA or tRNA) carries which.

## pitfalls
Placing the anticodon on mRNA and the codon on tRNA — the terms are frequently swapped by students; the codon is always the mRNA triplet, the anticodon is always the tRNA triplet that reads it.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Translation

## microtopic
Codon-anticodon pairing

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Translation

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
CON-FND-CA2D65E688434A | CON-FND-A1B0BFB9626438

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.2

## academic_relevance
0.6

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-906B844C9AEE7D-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
The anticodon is a set of three nucleotides on the 3'-end of ...., which corresponds to the codon on the ......... a- tRNA; mRNA

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q31

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own tRNA-acceptor-arm and genetic-code-properties concepts — all three are the 'reading the code at the ribosome' cluster.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-FFEE58EC9C0784

## label
Topoisomerase relieves the supercoiling that helicase's unwinding creates ahead of the replication fork

## canonical_key
replication.topoisomerase.supercoil-relief

## aliases
Topoisomerase
DNA supercoil relief

## arabic_label
إنزيم توبويزوميراز وتخفيف الالتفاف الفائق

## arabic_aliases


## definition
As helicase unwinds the parental DNA duplex at the replication fork, the still-wound DNA ahead of the fork becomes overwound (positively supercoiled) because the two strands cannot simply spin freely in the cell. Topoisomerase relieves this supercoiling by transiently cutting one or both strands, letting the DNA rotate, and resealing the break — without it, the fork would stall.

## explicit_objective
State what problem topoisomerase solves at the replication fork, and which enzyme's action creates that problem in the first place.

## pitfalls
Confusing topoisomerase's role with DNA ligase's — both 'cut and reseal' DNA, but ligase seals nicks between finished Okazaki fragments while topoisomerase relieves torsional strain ahead of the fork.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA replication

## microtopic
Supercoiling and topoisomerase

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA replication

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-252B3C77D181DA

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.25

## academic_relevance
0.6

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-FFEE58EC9C0784-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Which of the following relives the supercoil on the parental duplex of DNA caused by unwinding during synthesis? d- Toposiomerase
What is the function of Topoisomerase enzyme in DNA replication? a- Relax supercoiled DNA created by Helicase action

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q35, q74

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own DNA-ligase concept — both are 'cut and reseal' enzymes students conflate, worth an often_confused_with edge once both are live and the relationship pass runs.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-31C41EFEF31740

## label
Chargaff's rule: in double-stranded DNA the amount of adenine equals thymine and the amount of guanine equals cytosine, so knowing one base's percentage gives every other base's percentage

## canonical_key
dna.composition.chargaff-base-ratio-rule

## aliases
Chargaff's rule
DNA base ratios
Percentage base composition

## arabic_label
قاعدة شارجاف لنسب القواعد النيتروجينية

## arabic_aliases


## definition
Because every adenine on one strand of double-stranded DNA pairs with a thymine on the other, and every guanine pairs with a cytosine, the total amount of adenine in a DNA sample always equals the total amount of thymine, and total guanine always equals total cytosine (Chargaff's rule). Given the percentage of any one base, the other three percentages can be calculated directly from this rule.

## explicit_objective
Apply Chargaff's rule to calculate the percentage of any base in double-stranded DNA given the percentage of one other base.

## pitfalls
Applying Chargaff's rule to single-stranded nucleic acids (mRNA, ssDNA) where it does not hold, because there is no obligatory partner strand to enforce the 1:1 ratio.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA structure

## microtopic
Base composition rules

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA structure

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-5BAF472E54A764

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.4

## exam_weight_by_year
AU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.65

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids
CLM-FND-31C41EFEF31740-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
If cytosine content of DNA is 20% of the total bases, the adenine content will be: c- 30%

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q41, q51, q65, q80

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to the pending antiparallel/hydrogen-bonding concept — Chargaff's rule is the quantitative consequence of that same base-pairing fact.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-DB1988D55A69E3

## label
PCR is an in vitro DNA-amplification technique that requires two primers, a thermostable DNA polymerase and all four deoxyribonucleoside triphosphates, run through repeated thermocycler cycles

## canonical_key
pcr.requirements.primers-polymerase-dntps

## aliases
PCR
Polymerase chain reaction
PCR requirements

## arabic_label
متطلبات تفاعل البوليميراز المتسلسل

## arabic_aliases
تفاعل البوليميراز المتسلسل

## definition
PCR amplifies a chosen DNA segment in vitro (not in a living cell) using an automated thermocycler. Each cycle needs two sequence-specific primers that flank the target, a thermostable DNA polymerase able to survive repeated heating (rather than the heat-sensitive polymerases used in vivo), and all four deoxyribonucleoside triphosphates as building blocks.

## explicit_objective
List the three components PCR requires beyond the target DNA (two primers, thermostable polymerase, all four dNTPs) and state that it is an in vitro, not in vivo, technique.

## pitfalls
Calling PCR an in vivo technique because it 'copies DNA the way a cell does' — it deliberately reproduces replication chemistry outside any cell, in a thermocycler, which is exactly why it needs a heat-stable polymerase a living cell does not.

## concept_type
investigation

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Recombinant DNA techniques

## microtopic
PCR

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Recombinant DNA and PCR

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.55

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-DB1988D55A69E3-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
PCR (Practical): a- In vivo technique for DNA amplification (false)
PCR requires (Practical): d- A and B (2 types of DNA primers, and thermostable DNA polymerase)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q44, q45

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: The source bank itself tags both PCR items '(Practical)' — recorded here as a concept because the exam tests it as a fact, with a note that a practical/skills-checklist treatment may also be owed if a practical format source ever surfaces for this module.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-A1FC2FAF9F0211

## label
Cystine has no direct codon of its own because it is formed after translation, from two cysteine residues joined by a disulfide bond

## canonical_key
aminoacid.codon.no-direct-code-cystine

## aliases
Cystine
Amino acids without a codon
Disulfide-linked cysteine

## arabic_label
السيستين لا يملك شفرة وراثية مباشرة

## arabic_aliases


## definition
The genetic code specifies cysteine, which does have codons. Cystine — two cysteine molecules joined by a disulfide bond — is produced only after translation, by oxidation of two cysteine side chains; because it is a post-translational product rather than a directly translated residue, no codon specifies cystine itself.

## explicit_objective
Explain why cystine, unlike cysteine, has no direct genetic code word, in terms of when and how it is formed.

## pitfalls
Treating cystine and cysteine as interchangeable names for one amino acid — cysteine is the codon-specified residue; cystine is the disulfide-bonded dimer formed afterwards, and only the latter lacks a codon.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
DIS-BIO-T05

## topic
Molecular biology

## subtopic
The genetic code

## microtopic
Post-translational amino acid modification

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Genetic code
AU-MED-102 > Biochemistry > Protein Chemistry > Amino acid modification

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
[clear]

## resource_ids
src_4852d425a88297af190e

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.25

## exam_weight_by_year
AU_Y1=0.25

## clinical_relevance
0.2

## academic_relevance
0.45

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids
CLM-FND-A1FC2FAF9F0211-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Which of the following amino acids doesn't have specific code on DNA? d- Cystine

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_4852d425a88297af190e | department_bank_unkeyed | | q74

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: Boundary note: this idea sits at the seam between sub-lane A/C's protein-chemistry scope and sub-lane D's genetic-code scope; assigned to D per the triage's named exception (item C40) because the tested mechanism is codon assignment, not amino-acid structure.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.
weightConfidence: The source question (Protein MCQ bank Q74) has no printed answer key (the bank's key list ends at Q73) — the option 'd- Cystine' is the standard teaching answer, not a confirmed key, which is why this concept's own weight_confidence is set low rather than the higher confidence used elsewhere in this file.


---

# Item

## id
CON-FND-8C5B1666F4F7C1

## label
Phosphorylation of a protein's serine, threonine or tyrosine residues is a reversible switch that can either raise or lower that protein's activity

## canonical_key
signaling.phosphorylation.reversible-switch-ser-thr-tyr

## aliases
Protein phosphorylation
Phosphorylation sites
Reversible covalent modification

## arabic_label
الفسفرة كمفتاح تنظيمي قابل للعكس

## arabic_aliases


## definition
Phosphorylation attaches a phosphate group to a protein's serine, threonine or tyrosine side chain, and depending on the specific protein this can either activate or inactivate it — there is no single universal direction of effect. Because a phosphatase can remove the phosphate again, phosphorylation is a reversible regulatory switch, not a one-way modification.

## explicit_objective
State that a protein's phosphorylation can raise or lower its activity depending on the protein, and name the three residues that can be phosphorylated.

## pitfalls
Assuming phosphorylation always activates a protein (a common shorthand from kinase-cascade examples) — the bank specifically tests that the direction of effect is protein-dependent, not fixed.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
SYS-FND-T01-S02

## secondary_node_ids
DIS-BIO-T05

## topic
Cell signalling

## subtopic
Post-translational regulation

## microtopic
Phosphorylation

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Cell Signaling > Phosphorylation

## article_ids
ART-FND-CELL-SIGNALING-RECEPTORS

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
[clear]

## resource_ids
src_4ff0b2fb099c99bb896e

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.4

## exam_weight_by_year
AU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids
CLM-FND-8C5B1666F4F7C1-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Phosphorylation of a protein: c- Either increases or decreases a protein's activity
On Phosphorylation of a signaling molecule, phosphate group can be linked to which of the following? d- All of the above (Tyrosine, Serine, Threonine)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_4ff0b2fb099c99bb896e | department_bank | | q2, q8

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: Cross-links to Kasr's own pending post-translational-modification concept (102-INT, general PTM survey) are noted but not made as a typed edge, since that record is itself unimported.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-13FCDB652CB258

## label
A cell is a target for a given hormone or signalling molecule only because it expresses the specific receptor for it, not because of its distance from the secreting cell

## canonical_key
signaling.target-cell.receptor-specificity

## aliases
Target cell definition
Receptor specificity

## arabic_label
الخلية المستهدفة وخصوصية المستقبل

## arabic_aliases


## definition
What makes a cell a 'target' for a hormone or other signalling molecule is that it expresses a receptor specific to that molecule — a cell without the matching receptor cannot respond, however close it sits to the source, and a cell with the receptor can respond however far away it sits.

## explicit_objective
State that receptor expression, not physical proximity to the secreting cell, is what defines a target cell.

## pitfalls
Assuming a 'neighbouring cell' is automatically a target cell (confusing this with paracrine signalling's short range) — proximity alone does not confer target status; the receptor does.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
SYS-FND-T01-S02-M02

## secondary_node_ids
[clear]

## topic
Cell signalling

## subtopic
Hormone action

## microtopic
Target cell specificity

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Cell Signaling > Receptors

## article_ids
ART-FND-CELL-SIGNALING-RECEPTORS

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-22F8C729D1E8B0

## resource_ids
src_4ff0b2fb099c99bb896e

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.25

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-13FCDB652CB258-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
What defines a cell as a target for certain hormone? c- It has receptor specific to hormone

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_4ff0b2fb099c99bb896e | department_bank | | q5

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own signalling-classification concept (autocrine/paracrine/endocrine) — that concept is about signal range, this one about what makes a cell able to receive the signal at all.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-22F8C729D1E8B0

## label
Cell signalling is classified by the distance the signal travels: autocrine acts on the same cell that secreted it, paracrine acts on nearby cells (including synaptic transmission, by this bank's classification), and endocrine travels through the bloodstream

## canonical_key
signaling.classification.autocrine-paracrine-endocrine

## aliases
Autocrine signalling
Paracrine signalling
Endocrine signalling
Signalling classification

## arabic_label
تصنيف الإشارات الخلوية حسب المسافة

## arabic_aliases
الإفراز الذاتي
الإفراز المجاور

## definition
Cell-to-cell signalling is classified by how far the signal travels before acting: autocrine signalling acts back on the same cell that released it; paracrine signalling acts on nearby cells, and this question bank classifies synaptic transmission across the synaptic cleft as an example of paracrine signalling because the neurotransmitter acts locally on an adjacent cell rather than through the bloodstream; endocrine signalling releases a hormone into the blood to act on distant target cells.

## explicit_objective
Classify a described signalling event as autocrine, paracrine or endocrine from the distance the signal travels, and recognise synaptic transmission as this bank's paracrine example.

## pitfalls
Classifying synaptic transmission as its own separate category rather than as an instance of paracrine signalling — this exact bank keys it as paracrine because a neurotransmitter acting across a synaptic cleft is local, cell-to-neighbouring-cell signalling by the distance criterion the bank uses.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
SYS-FND-T01-S02

## secondary_node_ids
DIS-BIO-T01

## topic
Cell signalling

## subtopic
Signalling classification

## microtopic
Autocrine, paracrine, endocrine

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Cell Signaling > Signalling classification

## article_ids
ART-FND-CELL-SIGNALING-RECEPTORS

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-13FCDB652CB258

## resource_ids
src_4ff0b2fb099c99bb896e

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.25

## academic_relevance
0.6

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-22F8C729D1E8B0-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Which type of signaling is the transmission of nerve impulse through the synaptic cleft? b- Paracrine

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_4ff0b2fb099c99bb896e | department_bank | | q7
src_7d031a45baeadc973a00 | end_of_module | | short eom biochem q3

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own target-cell concept — both are foundational cell-signalling definitions taught together.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-1D57FC5C8BFF90

## label
A typical intracellular receptor is described as having about two domains, while a typical cell-membrane receptor is described as having more, by this bank's teaching

## canonical_key
receptor.structure.domain-count-membrane-vs-intracellular

## aliases
Receptor domain count
Intracellular vs membrane receptor structure

## arabic_label
عدد النطاقات في المستقبلات

## arabic_aliases


## definition
This department's teaching gives a typical intracellular (nuclear/steroid-type) receptor about two domains, while a typical cell-membrane receptor is described with more domains, reflecting the added complexity of a membrane-spanning, ligand-binding and signal-transducing structure compared with an intracellular receptor's simpler ligand-binding and DNA-binding arrangement.

## explicit_objective
State, per this department's teaching, the approximate domain count given for a typical intracellular receptor versus a typical cell-membrane receptor.

## pitfalls
Treating this as a universally fixed number rather than the department's own simplified teaching figure — real receptor domain counts vary considerably by receptor family; the bank tests the taught figure specifically.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
SYS-FND-T01-S02-M02

## secondary_node_ids
[clear]

## topic
Cell signalling

## subtopic
Receptor structure

## microtopic
Receptor domain count

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Cell Signaling > Receptors

## article_ids
ART-FND-CELL-SIGNALING-RECEPTORS

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-42F34977A8DF23

## resource_ids
src_4ff0b2fb099c99bb896e

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.2

## exam_weight_by_year
AU_Y1=0.2

## clinical_relevance
0.15

## academic_relevance
0.4

## weight_confidence
0.3

## confidence
0.55

## atomic_claim_ids
CLM-FND-1D57FC5C8BFF90-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Number of Domains in Typical Intra Cellular receptor is: b- 2
Number of Domains in Typical Cell Membrane receptor is: c- 3

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_4ff0b2fb099c99bb896e | department_bank | | q13, q14

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to the pending four-receptor-types concept (Kasr 108-INT) — same receptor-classification cluster, different specific fact (domain count vs mechanism/timescale).
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.
weightConfidence: Set low because this is a specific numeric figure from one department's own bank rather than a widely corroborated fact; recorded as taught, not independently verified against a standard textbook.


---

# Item

## id
CON-FND-D10E79C01B3345

## label
Adenylate cyclase synthesises cAMP from ATP, and phosphodiesterase degrades cAMP back down, so the balance of the two enzymes sets the second messenger's level

## canonical_key
signaling.camp.synthesis-and-degradation

## aliases
Adenylate cyclase
Phosphodiesterase
cAMP degradation

## arabic_label
تصنيع وتحلل الأدينوسين أحادي الفوسفات الحلقي

## arabic_aliases
الأدينيلات سيكلاز

## definition
cAMP, the second messenger of many GPCR pathways, is synthesised from ATP by adenylate cyclase and degraded to inactive 5'-AMP by phosphodiesterase. The intracellular cAMP level at any moment reflects the balance between these two opposing enzyme activities, not synthesis alone.

## explicit_objective
Name the enzyme that makes cAMP and the enzyme that degrades it, and state that the signal's level depends on the balance of both.

## pitfalls
Treating cAMP signalling as a one-way synthesis event and forgetting that phosphodiesterase actively terminates the signal — a rise in cAMP can result either from more synthesis or from less degradation.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
SYS-FND-T01-S02-M03

## secondary_node_ids
[clear]

## topic
Cell signalling

## subtopic
Second messengers

## microtopic
cAMP turnover

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Cell Signaling > Second messengers

## article_ids
ART-FND-CELL-SIGNALING-RECEPTORS

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-D6DFABFBA0BA5E

## resource_ids
src_413115a28d7dc9914c91

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.55

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
CLM-FND-D10E79C01B3345-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Which of the following enzymes reverses the action of adenylate cyclase? a. phosphodiesterase

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_413115a28d7dc9914c91 | end_of_module | | long eom / foundation final egyptian paper (biochemistry section) q29

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to the pending nucleotide-six-jobs concept (Kasr 102-INT), which names cAMP's second-messenger role — this record is the synthesis/degradation mechanism behind that same role.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-22D1D9B77A768E

## label
Cytosine is a pyrimidine base (2-oxy-4-amino) found in both DNA and RNA

## canonical_key
cytosine.structure.pyrimidine-2-oxy-4-amino

## aliases
Cytosine structure

## arabic_label
تركيب السيتوزين

## arabic_aliases


## definition
Cytosine is a pyrimidine base, chemically the 2-oxy-4-amino derivative of pyrimidine, and unlike thymine or uracil it is present in both DNA and RNA.

## explicit_objective
State cytosine's chemical class (pyrimidine, 2-oxy-4-amino) and that it occurs in both DNA and RNA.

## pitfalls
Assuming cytosine is DNA-specific by analogy with thymine — cytosine is shared by both nucleic acids; only thymine (DNA) and uracil (RNA) differ between them.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Nucleotide structure

## microtopic
Base structure

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA structure

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-F1E54D68C8FAB0

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.2

## exam_weight_by_year
AU_Y1=0.2

## clinical_relevance
0.15

## academic_relevance
0.4

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids
CLM-FND-22D1D9B77A768E-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Cytosine is characterized by all of the following EXCEPT: d- 2-oxy-6-aminopyrimidine (the false option; it is 2-oxy-4-amino)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q20

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own RNA-vs-DNA-composition concept — both are base-identity facts.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-38857DFD506559

## label
Peptidyl transferase (on the 60S ribosomal subunit) hydrolyses the bond between the finished peptide and its tRNA when release factors, not a charged tRNA, occupy the stop codon

## canonical_key
translation.termination.peptidyl-transferase-release-factors

## aliases
Peptidyl transferase
Translation termination
Release factors

## arabic_label
إنهاء الترجمة وعامل الإطلاق

## arabic_aliases


## definition
Translation terminates when a stop codon enters the ribosomal A site: no aminoacyl-tRNA recognises it, so a release factor binds instead, and this triggers peptidyl transferase (part of the 60S ribosomal subunit) to hydrolyse the bond linking the completed polypeptide to the last tRNA, releasing the finished protein.

## explicit_objective
State what triggers peptidyl transferase to release the finished polypeptide, and where peptidyl transferase activity resides.

## pitfalls
Assuming a special stop-codon-reading tRNA exists — no tRNA reads a stop codon; a release factor occupies the site instead, and that substitution is what triggers hydrolysis.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Translation

## microtopic
Translation termination

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Translation

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
CON-FND-09FACBDCBBF8FD

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-38857DFD506559-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
What causes Peptidyl transferase to hydrolyze the bond between the peptide chain and tRNA, terminating translation? d- Releasing factors
Where is Peptidyl transferase activity present? b- 60 S ribosomal subunit

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q34, q55

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own translation-initiation concept — start and end of the same process.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-FE41A702648A00

## label
An enhancer is a eukaryotic regulatory DNA sequence that raises transcription of a particular gene without needing to sit in a fixed location relative to it

## canonical_key
transcription.enhancer.location-independent-element

## aliases
Enhancer

## arabic_label
المعزز الجيني

## arabic_aliases


## definition
An enhancer is a DNA control sequence, distant regulatory proteins bind, that increases the transcription rate of a particular gene; unlike the promoter, it does not need to occupy a fixed position relative to the gene it regulates.

## explicit_objective
Identify the enhancer as the eukaryotic control element that need not be in a fixed location, and state its effect (raising transcription rate).

## pitfalls
Confusing the enhancer with the promoter because both raise transcription — the promoter must sit at a fixed position (where RNA polymerase binds); the enhancer's defining feature is that its location is flexible.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Transcription

## microtopic
Gene regulatory elements

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Transcription

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-FE41A702648A00-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Which of the following eukaryotic DNA control sequences does not need to be in a fixed location, and is most responsible for high rates of transcription of particular genes? c- Enhancer

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q36, q54

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: Cross-links to the pending Kasr promoter concept (CON-FND-CC55F157021237, sparse update elsewhere in this lane) are noted in prose (see article) rather than as a typed edge, since that record is not in this batch.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-874F418DFB12AF

## label
Making single-stranded DNA from an RNA template requires reverse transcriptase

## canonical_key
replication.reverse-transcriptase.rna-to-dna

## aliases
Reverse transcriptase

## arabic_label
إنزيم النسخ العكسي

## arabic_aliases


## definition
Synthesising a single strand of DNA using an RNA molecule as template is catalysed by reverse transcriptase, an RNA-dependent DNA polymerase; without this enzyme (used naturally by retroviruses and in the lab for cDNA synthesis), RNA cannot be converted back into DNA.

## explicit_objective
Name reverse transcriptase as the enzyme required to synthesise DNA from an RNA template.

## pitfalls
Assuming any DNA polymerase can copy an RNA template — ordinary DNA polymerases are DNA-dependent; only reverse transcriptase is RNA-dependent.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA replication

## microtopic
Reverse transcription

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA replication

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.25

## exam_weight_by_year
AU_Y1=0.25

## clinical_relevance
0.25

## academic_relevance
0.45

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids
CLM-FND-874F418DFB12AF-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
What is the most important condition for the formation of a Single stranded DNA from RNA? d- A reverse transcriptase must be present

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q38

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: No populated sibling under DIS-BIO-T06 shares this specific enzyme fact yet.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-21B283A2FE53C4

## label
Deamination of cytosine produces uracil, a mutagenic lesion because DNA is not supposed to contain uracil at all

## canonical_key
mutation.cytosine-deamination.uracil-formation

## aliases
Cytosine deamination

## arabic_label
نزع أمين السيتوزين

## arabic_aliases


## definition
Spontaneous deamination converts cytosine to uracil. Because uracil is not a normal DNA base, this is a recognisable, repairable point-mutation-causing lesion — if uncorrected before the next replication, it pairs with adenine instead of guanine, converting the original C:G pair to a U:A (read as T:A) pair.

## explicit_objective
State that cytosine deamination produces uracil and that this is what makes the lesion mutagenic if unrepaired.

## pitfalls
Calling the product of cytosine deamination an insertion or deletion mutation — deamination produces a substitution-type point mutation (C to U/T), not a frameshift event.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Mutation

## microtopic
Spontaneous DNA damage

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Mutation

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-36FA9827A6B99C

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-21B283A2FE53C4-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Deamination of cytosine, if not repaired, produces: c- a point mutation

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q39

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own DNA-repair-mechanism-family concept — base excision repair is specifically what removes the uracil this lesion creates.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-55348CAA8F9C16

## label
The primosome, not helicase or DNA ligase, is the complex credited with introducing positive supercoils into DNA ahead of the replication fork

## canonical_key
replication.helicase.primosome-positive-supercoiling

## aliases
Primosome

## arabic_label
مركب البريموسوم

## arabic_aliases


## definition
As the replication machinery advances, the primosome (the helicase-primase complex that lays down RNA primers while unwinding DNA) is the entity this question bank credits with introducing positive supercoiling into the DNA ahead of the fork — distinct from topoisomerase, which relieves that same supercoiling afterwards.

## explicit_objective
Name the primosome as the source of positive supercoiling ahead of the fork, and distinguish it from topoisomerase, which relieves that supercoiling.

## pitfalls
Crediting helicase alone with introducing positive supercoils — this bank specifically keys the primosome (the composite helicase-primase unit) rather than helicase in isolation.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA replication

## microtopic
Supercoiling and topoisomerase

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA replication

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-FFEE58EC9C0784

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.25

## exam_weight_by_year
AU_Y1=0.25

## clinical_relevance
0.15

## academic_relevance
0.45

## weight_confidence
0.3

## confidence
0.55

## atomic_claim_ids
CLM-FND-55348CAA8F9C16-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Which of the following proteins can introduce positive supercoils into DNA? a- Primosome

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q40

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own topoisomerase concept — the two are often_confused_with candidates (creates vs relieves supercoiling) once a relationship pass is run against live state.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.
weightConfidence: This is a narrower, more debated exam fact than most of this file's records (some sources credit helicase itself); recorded as the source bank's own keyed answer, not as settled biochemistry consensus.


---

# Item

## id
CON-FND-FE0A89860189A5

## label
RNA polymerase adds nucleotides only at the 3' end of the growing chain and does not require a primer

## canonical_key
transcription.rna-polymerase.mechanism-3prime-addition

## aliases
RNA polymerase mechanism

## arabic_label
آلية عمل بوليميراز الحمض النووي الريبي

## arabic_aliases


## definition
RNA polymerase, unlike DNA polymerase, can initiate synthesis de novo: it does not require a primer, and it extends the growing RNA chain only by adding nucleotides at the 3' end, never at both ends and never requiring nucleoside diphosphates as substrate (it uses nucleoside triphosphates, releasing pyrophosphate).

## explicit_objective
State that RNA polymerase needs no primer and adds nucleotides only at the 3' end of the chain.

## pitfalls
Assuming RNA polymerase needs a primer by analogy with DNA polymerase — this is precisely the mechanistic difference the bank tests; RNA polymerase initiates de novo.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Transcription

## microtopic
RNA polymerase mechanism

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Transcription

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.25

## exam_weight_by_year
AU_Y1=0.25

## clinical_relevance
0.15

## academic_relevance
0.45

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids
CLM-FND-FE0A89860189A5-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
What is the foundation of RNA polymerase? d- It adds nucleotides at the 3' end of the growing polynucleotide chain

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q58

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: Cross-links to this file's own RNA-pol-gene-specificity concept in prose (see article); not a typed edge, since the two facts (which genes vs how it adds nucleotides) are genuinely distinct objectives.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-7CEF0F2F8C9EE1

## label
Inserting or deleting a base causes a frameshift mutation, which shifts every downstream codon reading frame, unlike a point substitution

## canonical_key
mutation.frameshift.insertion-deletion-vs-point

## aliases
Frameshift mutation

## arabic_label
طفرة إزاحة الإطار

## arabic_aliases


## definition
A frameshift mutation results from inserting or deleting one or more bases (not a multiple of three), which shifts the ribosome's reading frame for every codon downstream of the change — a far more disruptive event than a point substitution, which changes only the one affected codon.

## explicit_objective
Identify insertion or deletion of bases as the cause of a frameshift mutation, and contrast its downstream effect with a single point substitution's local effect.

## pitfalls
Treating any deletion as automatically a 'point mutation' — deleting a single base is a frameshift event because it shifts every subsequent codon, which is a categorically larger effect than substituting one base for another.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Mutation

## microtopic
Frameshift vs point mutation

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Mutation

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
CON-FND-4508AC0EA86F86

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.25

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-7CEF0F2F8C9EE1-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
What is the type of mutation when deletion or insertion of bases occurs? b- Frame Shift Mutation

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q53, q86

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to the pending nonsense/missense/silent concept (Kasr 102-INT) — both classify point-level substitutions, while this record is the insertion/deletion axis.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-9D5D6275474035

## label
Removing an mRNA's 5' cap (decapping) shuts down its translation and marks it for degradation

## canonical_key
mrna.stability.decapping-control

## aliases
mRNA decapping

## arabic_label
إزالة الغطاء الطرفي لل mRNA

## arabic_aliases


## definition
A processed mRNA can be shut down by decapping — removal of its 5' 7-methylguanosine cap — which both blocks further translation initiation (the cap is what the small ribosomal subunit recognises) and exposes the transcript to exonucleolytic degradation.

## explicit_objective
State that decapping is a mechanism that shuts down translation of a processed mRNA and predisposes it to degradation.

## pitfalls
Confusing decapping with normal processing — capping happens once, early, as part of maturation; decapping is a separate, later regulatory/degradative event that removes what processing added.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Transcription

## microtopic
mRNA stability

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Transcription

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
[clear]

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.25

## exam_weight_by_year
AU_Y1=0.25

## clinical_relevance
0.2

## academic_relevance
0.45

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids
CLM-FND-9D5D6275474035-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
What may shut down the translation of a processed mRNA? a- Decapping

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q64

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: Cross-links to this file's own mRNA-processing concept in prose (see article) — decapping is the reverse of one of that concept's three steps.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-6EF5C044E64C46

## label
Single-stranded DNA at the replication fork has unequal base ratios and a free 3'-OH end, and single-strand binding protein keeps the separated strands apart so they cannot reanneal

## canonical_key
dna.single-strand.structural-features-and-binding-protein

## aliases
Single-stranded DNA
Single-strand binding protein
SSB protein

## arabic_label
الحمض النووي أحادي السلسلة وبروتين الارتباط

## arabic_aliases


## definition
Once helicase separates the two DNA strands at the fork, each single strand no longer obeys Chargaff's equal-base-ratio rule (there is no partner strand to enforce it) and each end is a real chemical terminus, with a free 3'-hydroxyl at one end. Single-strand binding protein coats these separated strands, keeping them apart and protected from re-annealing or nuclease attack until they are used as templates.

## explicit_objective
State that single-stranded DNA has unequal base ratios (Chargaff's rule does not apply) and a free 3'-OH end, and explain what single-strand binding protein does at the fork.

## pitfalls
Applying Chargaff's rule (%A=%T) to a single strand — the rule is a consequence of obligatory strand pairing and does not hold once the strands are separated. Crediting SSB with cutting supercoils (that is topoisomerase's job) rather than simply keeping the separated strands apart.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA replication

## microtopic
Single-stranded DNA at the fork

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA replication

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-31C41EFEF31740

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-6EF5C044E64C46-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Which structural feature is found in the single-stranded DNA molecule? a- It can have one end with a 5'-phosphate group while the other end has a 2'-hydroxyl group
Single stranded binding protein binds to single stranded DNA: a- To keep the 2 strands from binding together

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q60, q82

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own Chargaff's-rule concept, since this record states the boundary condition (single strand) under which that rule stops applying.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-60F505DFC88026

## label
Translocation moves the ribosome one codon along the mRNA, shifting the peptide-bearing tRNA from the A site to the P site and freeing the A site for the next aminoacyl-tRNA

## canonical_key
translation.translocation.ribosome-a-p-sites

## aliases
Ribosomal translocation
A site, P site

## arabic_label
انتقال الريبوسوم

## arabic_aliases


## definition
After each peptide bond forms, translocation moves the ribosome one codon further along the mRNA: the tRNA now carrying the growing polypeptide chain shifts from the A (aminoacyl) site to the P (peptidyl) site, freeing the A site to receive the next aminoacyl-tRNA. In eukaryotes this step is driven by eEF-2 together with GTP hydrolysis.

## explicit_objective
Describe what moves during translocation (the ribosome relative to mRNA) and which site the growing-chain tRNA shifts into, and name the factor that drives the step.

## pitfalls
Reversing the site direction (P to A rather than A to P) for the peptide-bearing tRNA — the newly formed peptidyl-tRNA starts in the A site and is translocated into the P site, not the other way round.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Translation

## microtopic
Ribosomal translocation

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Translation

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
CON-FND-38857DFD506559

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-60F505DFC88026-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Translocation is the process where ....... Moves in order to place the tRNA carrying the growing polypeptide chain in ...... site, thereby freeing ........ site. b- Ribosome - P- A
After peptide bond formation, mRNA is translocated along the ribosome by: a- eEF-1 and GTP

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q66, q71

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own peptidyl-transferase/termination concept — both are ribosome-mechanics facts in the same translation elongation/termination cluster.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-B92EB41248D631

## label
eIF-1 and eIF-3 are required for mRNA to bind the 40S ribosomal subunit during translation initiation

## canonical_key
translation.initiation.eif1-eif3-40s-binding

## aliases
eIF-1
eIF-3
Initiation factors

## arabic_label
عوامل البدء eIF-1 وeIF-3

## arabic_aliases


## definition
eIF-1 and eIF-3 are eukaryotic initiation factors required specifically for binding of mRNA to the 40S ribosomal subunit at the start of translation — not for aminoacyl-tRNA binding, and not for 60S-subunit joining, which are separate steps handled by other factors.

## explicit_objective
State what eIF-1 and eIF-3 are required for during translation initiation (mRNA binding to the 40S subunit).

## pitfalls
Assuming eIF-1/eIF-3 act at 60S-subunit joining because they are 'early' initiation factors — their specific, tested role is 40S-subunit mRNA binding, a distinct step from 60S joining.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Translation

## microtopic
Translation initiation factors

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Translation

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
CON-FND-09FACBDCBBF8FD

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.2

## exam_weight_by_year
AU_Y1=0.2

## clinical_relevance
0.15

## academic_relevance
0.4

## weight_confidence
0.3

## confidence
0.6

## atomic_claim_ids
CLM-FND-B92EB41248D631-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
eIF-1 and elF-3 in Protein synthesis are required: b- For Binding of mRNA to 40 S ribosomal subunit

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q69

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own start-codon/initiation concept — same overall step of translation, finer-grained factor detail.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-D6A7B168134B07

## label
Tetracycline blocks translation by preventing aminoacyl-tRNA from attaching to the ribosomal A site

## canonical_key
translation.antibiotic.tetracycline-a-site-block

## aliases
Tetracycline mechanism

## arabic_label
آلية عمل التتراسيكلين

## arabic_aliases


## definition
Tetracycline is an antibiotic that inhibits bacterial protein synthesis by preventing aminoacyl-tRNA from binding at the ribosomal A site, blocking chain elongation.

## explicit_objective
State that tetracycline acts by blocking aminoacyl-tRNA attachment at the ribosomal A site.

## pitfalls
Confusing tetracycline's A-site block with chloramphenicol's mechanism (peptidyl transferase inhibition) or erythromycin's (translocation block) — each named antibiotic in this bank's option list blocks a different, specific step.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Translation

## microtopic
Antibiotic inhibitors of translation

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Translation

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
CON-FND-60F505DFC88026

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.35

## academic_relevance
0.45

## weight_confidence
0.4

## confidence
0.65

## atomic_claim_ids
CLM-FND-D6A7B168134B07-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
Which of the following antibiotics prevent tRNA from attaching to A site of Ribosome? b- Tetracycline

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q70

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own translocation (A/P site) concept — the drug's target site is the same A site this concept describes.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-32433CE637CA9A

## label
RNA editing changes apoB-100's mRNA to produce the shorter apoB-48 in the intestine, a post-transcriptional change distinct from alternative splicing

## canonical_key
rna.editing.apob48-intestine

## aliases
RNA editing
ApoB-48

## arabic_label
تحرير الحمض النووي الريبي وApoB-48

## arabic_aliases


## definition
RNA editing alters the sequence of an already-transcribed mRNA. The clearest example is intestinal editing of the apoB mRNA, which introduces a premature stop codon so the intestine produces the truncated apoB-48 protein instead of the full-length apoB-100 made in the liver from the identical gene — a change made to the RNA itself, not to which exons are joined (that would be splicing).

## explicit_objective
Name RNA editing as the mechanism that produces apoB-48 from the same gene that gives apoB-100, and distinguish it from alternative splicing.

## pitfalls
Attributing the apoB-48/apoB-100 difference to alternative splicing — the two are different genetic mechanisms; editing changes a base in the transcript itself (creating a stop codon), splicing changes which exons are joined.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Transcription

## microtopic
RNA editing

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Transcription

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
CON-FND-5FF8EB2DB4D662

## resource_ids
src_413115a28d7dc9914c91

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.25

## exam_weight_by_year
AU_Y1=0.25

## clinical_relevance
0.3

## academic_relevance
0.4

## weight_confidence
0.3

## confidence
0.6

## atomic_claim_ids
CLM-FND-32433CE637CA9A-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
What is the main function of RNA editing? b. synthesis different protein from the same gene

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_3bf4527b51de57464e14 | end_of_module | | long eom biochem q92-93 (see field_notes on source pairing)

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own mRNA-processing concept — editing is explicitly distinguished from splicing there.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.
weightConfidence: Verified directly against the paired cached duplicate's own page text (src_413115a28d7dc9914c91, since src_3bf4527b51de57464e14's page cache is missing) — Q92, not Q92-93 as the triage's own listing said; only one question tests this, not two.


---

# Item

## id
CON-FND-A427EA66958B81

## label
A mature red blood cell cannot synthesise new mRNA because it has lost its nucleus, which is why it is anucleate

## canonical_key
transcription.gene-silencing.anucleate-red-cell

## aliases
Anucleate red blood cell
Reticulocyte maturation

## arabic_label
فقدان النواة في خلايا الدم الحمراء الناضجة

## arabic_aliases


## definition
During erythropoiesis the maturing red blood cell expels its nucleus. Without a nucleus there is no DNA template left to transcribe, so the mature red cell cannot synthesise new mRNA (or, in turn, new protein) — the gene loss this bank tests is literally the whole-nucleus loss, not a smaller-scale silencing event.

## explicit_objective
Explain why a mature red blood cell cannot make new mRNA, in terms of what erythropoiesis removes from the cell.

## pitfalls
Looking for a specific gene-silencing mechanism (methylation, a repressor) — the bank's intended answer is the blunter fact that the whole nucleus, and with it every gene, is gone by maturity.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Transcription

## microtopic
Gene expression and cell differentiation

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > Transcription

## article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_concept_ids
[clear]

## resource_ids
src_413115a28d7dc9914c91

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.25

## exam_weight_by_year
AU_Y1=0.25

## clinical_relevance
0.3

## academic_relevance
0.4

## weight_confidence
0.35

## confidence
0.65

## atomic_claim_ids
CLM-FND-A427EA66958B81-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
According to regulation of gene expression, Which of the following explains why mature RBCs cannot form mRNA: c. Gene loss

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_413115a28d7dc9914c91 | end_of_module | | long eom / foundation final egyptian paper (biochemistry section) q27

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: A boundary fact between molecular biology and haematology; kept here per the triage's topic-E placement (the mechanism tested is transcriptional capacity, not red-cell physiology).
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-36FA9827A6B99C

## label
DNA repair divides into three excision-based families by what triggers them: base excision repair removes a single damaged base (such as the uracil from cytosine deamination), nucleotide excision repair removes a bulky helix-distorting lesion (such as a UV pyrimidine dimer), and mismatch repair corrects a replication error the proofreading exonuclease missed

## canonical_key
repair.mechanism-family.base-nucleotide-mismatch-excision

## aliases
DNA repair mechanisms
Base excision repair
Mismatch repair

## arabic_label
آليات إصلاح الحمض النووي الثلاث

## arabic_aliases


## definition
Three excision-based DNA repair pathways are distinguished by what they are triggered by: base excision repair removes one damaged or inappropriate base (for example, the uracil produced by cytosine deamination) via a glycosylase; nucleotide excision repair removes a bulky, helix-distorting lesion such as a UV-induced pyrimidine dimer (its failure causes xeroderma pigmentosum); mismatch repair corrects a mispaired base that escaped DNA polymerase's own proofreading during replication.

## explicit_objective
Match each of the three excision-based DNA repair pathways (base excision, nucleotide excision, mismatch) to the kind of lesion or error that specifically triggers it.

## pitfalls
Treating the three repair pathways as interchangeable names for 'DNA repair' generally — each is triggered by a specific, different kind of problem, and a question can ask which pathway handles which lesion.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA repair

## microtopic
Repair pathway family

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA repair

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-E8CD7F7F690B14 | CON-FND-21B283A2FE53C4

## resource_ids
src_80f6b1121bd3b85f8886

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-FND-36FA9827A6B99C-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
What is the mechanism that will remove Uracil and incorporate the correct base? b- Base Excision repair.

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_80f6b1121bd3b85f8886 | department_bank | | q76

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own xeroderma-pigmentosum concept (the clinical instance of nucleotide excision repair failure) and cytosine-deamination concept (the lesion base excision repair specifically removes).
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.


---

# Item

## id
CON-FND-014D200ED96498

## label
Ciprofloxacin inhibits bacterial DNA gyrase, a topoisomerase, blocking DNA replication

## canonical_key
pharmacology.ciprofloxacin.dna-gyrase-inhibition

## aliases
Ciprofloxacin
DNA gyrase inhibitor

## arabic_label
السيبروفلوكساسين ومثبطات جيريز الحمض النووي

## arabic_aliases


## definition
Ciprofloxacin, a fluoroquinolone antibiotic, acts by inhibiting bacterial DNA gyrase — a bacterial topoisomerase that relieves supercoiling ahead of the replication fork — so replication (and therefore bacterial growth) is blocked.

## explicit_objective
Name DNA gyrase as ciprofloxacin's target and identify it as a topoisomerase.

## pitfalls
Treating ciprofloxacin's target as an unrelated novel enzyme rather than recognising DNA gyrase as specifically a (bacterial) topoisomerase — the drug's mechanism is a direct clinical application of the topoisomerase concept taught earlier in this same cluster.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
DNA replication

## microtopic
Antibiotic inhibitors of replication

## nanotopic


## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Molecular Biology > DNA replication

## article_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-FFEE58EC9C0784

## resource_ids
src_413115a28d7dc9914c91

## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.45

## weight_confidence
0.4

## confidence
0.65

## atomic_claim_ids
CLM-FND-014D200ED96498-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording
A patient had acute bacterial infection and was given Ciprofloxacin which cured him, what is the effect of Ciprofloxacin: a. inhibition of bacterial DNA gyrase

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).

## exam_signal
src_413115a28d7dc9914c91 | end_of_module | | long eom / foundation final egyptian paper (biochemistry section) q24

## last_reviewed


## review_due


## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
relationships: related_concept_ids links to this file's own topoisomerase concept — this record is the clinical/drug application of that same enzyme class.
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: No prior record has been folded into this one.
rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.
conflicts: No source disagreement found for this fact.
uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.
resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.
atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.

