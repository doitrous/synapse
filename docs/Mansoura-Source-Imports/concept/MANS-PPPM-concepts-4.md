<!--
  MANS-PPPM · Microbiology p.28-36 (cluster pppmbank4) -- 14 new concepts minted (no exact-match existing record found by find-existing.mjs; see each record's own field_notes.sourceCandidateIds) plus 2 sparse live-update rows (CON-INF-7789C0F6154E35, CON-INF-3E6590C8AC2166 -- both already live in server/data/medical-library-v1.json, so written as direct update rows here rather than under pending-live/, per 00-START-HERE.md's rule that pending-live is only for ids that are not yet live).
  
    Import: Admin › Concepts › Import (new records) then Admin › Concepts › Import again for the two update rows once this file's own new records are live (or apply the update rows in the same pass -- both target ids are already live today).
-->

# Item
## label
Gram-positive/Gram-negative bacteria differ by cell wall structure, not by membrane, nucleus, mesosomes or ribosomes
## id
CON-INF-D4E28BAF612C62
## canonical_key
bacteria.gram-stain.basis-cell-wall-structure
## aliases
Basis of the Gram reaction
## arabic_label

## arabic_aliases
[clear]
## definition
The Gram reaction (Gram-positive vs Gram-negative) is a stain of the bacterial cell WALL: Gram-positive organisms retain crystal violet-iodine because their wall is a thick, multilayered peptidoglycan sheet, while Gram-negative organisms decolorise and counterstain because their wall is a thin peptidoglycan layer covered by an outer lipopolysaccharide membrane. No other bacterial structure -- the cytoplasmic membrane, the (absent) nucleus, mesosomes or ribosomes -- accounts for the staining difference.
## explicit_objective
State that the Gram-positive/Gram-negative distinction is a cell-wall difference, correctly rejecting the membrane, nucleus, mesosomes and ribosomes as the basis.
## pitfalls
Assuming the cytoplasmic membrane (rather than the wall external to it) is what the Gram stain reads, or forgetting bacteria have no true nucleus at all.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Bacteriology
## subtopic
Cell wall and Gram stain
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Bacteriology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p28 | MANS-PPPM
## article_ids
ART-MANS-PPPM-GRAM-STAIN-CELL-WALL-BASIS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
1. The difference between Gram positive and Gram-negative bacteria resides in the: A) Cell wall. B) Nucleus. C) Cell membrane. D) Mesosomes. E) Ribosomes. [answer: A]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "gram positive gram negative cell wall" and "gram" -- closest hits (CON-INF-0DD46C0FD80938, CON-INF-7E3B831D71A008) describe wall COMPOSITION per Gram type, not this more basic structural-basis fact; minted new.
mint: New concept minted for cluster pppmbank4 (Microbiology p.28, Q1). Article ART-MANS-PPPM-GRAM-STAIN-CELL-WALL-BASIS authored alongside it in the same batch.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
The bacterial genome is standardly taught as haploid circular DNA without histone protein and without a nuclear envelope
## id
CON-INF-801D5737D86DD2
## canonical_key
bacteria.genome.haploid-circular-no-histone-no-envelope
## aliases
Bacterial chromosome structure
## arabic_label

## arabic_aliases
[clear]
## definition
Standard microbiology teaching describes the bacterial genome as a single haploid (one copy) circular double-stranded DNA molecule, lying free in the cytoplasm as the nucleoid, with no surrounding nuclear envelope and no associated histone proteins (histone packaging is a eukaryotic feature). A plasmid, when present, is a separate, smaller, dispensable circular DNA molecule, not part of the chromosome itself.
## explicit_objective
State the standard description of the bacterial genome (haploid, circular, no histone, no nuclear envelope) and recognise a source that instead calls it diploid as inconsistent with this teaching.
## pitfalls
Accepting a printed source's claim that the bacterial genome is diploid without flagging the inconsistency with standard haploid-genome teaching.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Bacteriology
## subtopic
Bacterial genetics — genome structure
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Bacteriology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p28 | MANS-PPPM
## article_ids
ART-MANS-PPPM-BACTERIAL-GENOME-STRUCTURE
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
3. The bacterial genome consists of a: A) Haploid circular DNA associated with histone protein. B) Diploid circular DNA without histone protein. C) Haploid circular DNA only. D) Circular DNA associated with histone protein and a plasmid. E) Haploid circular DNA inside a nuclear envelope and plasmid outside. [answer: B, printed]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
This bank's own printed key marks option B ('Diploid circular DNA without histone protein') rather than the standard-teaching option C ('Haploid circular DNA only'). Printed key followed in the authored question per lane rule; this concept records the STANDARD teaching (haploid) as its definition, with the printed-key discrepancy flagged in both records rather than silently harmonised.
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "bacterial genome haploid" -- no hit, safe to create.
mint: New concept minted for cluster pppmbank4 (Microbiology p.28, Q3). Article ART-MANS-PPPM-BACTERIAL-GENOME-STRUCTURE authored alongside it in the same batch.
doubt: This bank's own printed key marks option B ('Diploid circular DNA without histone protein') rather than the standard-teaching option C ('Haploid circular DNA only'). Printed key followed in the authored question per lane rule; this concept records the STANDARD teaching (haploid) as its definition, with the printed-key discrepancy flagged in both records rather than silently harmonised.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
A teaching mnemonic maps the bacterial growth curve phases onto stages of clinical infection
## id
CON-INF-F8003DA558DBCC
## canonical_key
bacteria.growth-curve.infection-stage-correlation-mnemonic
## aliases
Growth curve and disease stages
## arabic_label

## arabic_aliases
[clear]
## definition
A commonly taught teaching correlation maps the bacterial growth curve onto the clinical course of an infection: lag phase to the incubation period, log (exponential) phase to the prodromal period, stationary phase to the period of overt illness/symptoms (fastigium), and decline phase to convalescence. Because this is a teaching mnemonic rather than a strict biological rule, different sources sometimes assign the 'period of symptoms' step to either the log or the stationary phase.
## explicit_objective
State the teaching mnemonic correlating bacterial growth-curve phases with stages of clinical infection, and recognise that sources can disagree on which single phase maps to symptomatic illness.
## pitfalls
Treating this mnemonic as a fixed, universally agreed mapping rather than a teaching simplification that different sources render differently.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Bacteriology
## subtopic
Bacterial growth curve
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Bacteriology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p29 | MANS-PPPM
## article_ids
ART-MANS-PPPM-GROWTH-CURVE-INFECTION-STAGES
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
7. Which phase of bacterial growth corresponds to period of symptoms and signs? A) Lag phase. B) Log phase. C) Stationary. D) Decline phase. E) Convalescent phase [answer: B, p.29]; repeated at p.30 Q11 with printed answer C.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
This exact stem is printed twice in this source with two different keys (p.29: B/Log phase; p.30: C/Stationary phase). Both are render-confirmed as genuinely printed. Standard incubation-prodrome-illness-convalescence teaching more often maps 'period of illness/symptoms' to the STATIONARY phase (the p.30 printing), making the p.29 printing (authored here) the more doubtful of the two -- flagged rather than silently corrected, per lane rule to follow the printed key of the authored (first) occurrence.
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "bacterial growth curve infection stages symptoms" -- no hit; closest existing record (CON-INF-6D56F46B5F1EF4, lag vs stationary phase definitions) does not address the growth-curve-to-disease-stage correlation; minted new.
mint: New concept minted for cluster pppmbank4 (Microbiology p.29, Q7). Article ART-MANS-PPPM-GROWTH-CURVE-INFECTION-STAGES authored alongside it in the same batch.
doubt: This exact stem is printed twice in this source with two different keys (p.29: B/Log phase; p.30: C/Stationary phase). Both are render-confirmed as genuinely printed. Standard incubation-prodrome-illness-convalescence teaching more often maps 'period of illness/symptoms' to the STATIONARY phase (the p.30 printing), making the p.29 printing (authored here) the more doubtful of the two -- flagged rather than silently corrected, per lane rule to follow the printed key of the authored (first) occurrence.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
A linear plasmid is structurally unstable because its free DNA ends are exposed to exonuclease attack
## id
CON-INF-4D0653EAD80E26
## canonical_key
bacteria.plasmid.linear-form-exonuclease-instability
## aliases
Linear plasmid instability
## arabic_label

## arabic_aliases
[clear]
## definition
Most bacterial plasmids exist as covalently closed circular (CCC) DNA, a topology with no free ends and therefore relative resistance to exonuclease degradation. A linear plasmid, seen in some genera such as Borrelia and Streptomyces, has two exposed free DNA ends, making it a much easier substrate for exonucleases and comparatively unstable compared with the closed-circular form.
## explicit_objective
State that a linear plasmid, unlike the typical closed-circular form, is structurally unstable because its free ends are vulnerable to exonuclease attack.
## pitfalls
Assuming all plasmids share the same closed-circular stability, or confusing structural (linear vs circular) instability with functional properties such as host range or copy number.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Bacteriology
## subtopic
Bacterial genetics — plasmids
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Bacteriology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p29 | MANS-PPPM
## article_ids
ART-MANS-PPPM-PLASMID-FORMS-STABILITY
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
8. Which plasmid type is unstable and can be easily attacked by exonucleases? A) Broad host range plasmid B) Narrow host range plasmid C) Linear plasmid D) Shuttle vector E) Conjugative plasmid [answer: C]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "linear plasmid exonuclease" -- no hit, safe to create.
mint: New concept minted for cluster pppmbank4 (Microbiology p.29, Q8). Article ART-MANS-PPPM-PLASMID-FORMS-STABILITY authored alongside it in the same batch.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
Covalently closed circular DNA is the most common physical form of a bacterial plasmid
## id
CON-INF-0B7E625048C641
## canonical_key
bacteria.plasmid.covalently-closed-circular-most-common-form
## aliases
Plasmid topology
## arabic_label

## arabic_aliases
[clear]
## definition
The most common and typical physical form of a bacterial plasmid is covalently closed circular (CCC) double-stranded DNA: a closed loop with no free ends, usually maintained in a supercoiled state, which both protects it from exonuclease degradation and is the standard state in which plasmids are purified and studied in the laboratory (for example by alkaline lysis and gel electrophoresis).
## explicit_objective
Identify covalently closed circular (CCC) DNA as the most common physical form of a bacterial plasmid.
## pitfalls
Answering only 'circular' without the more specific, examined detail that the typical form is covalently CLOSED (no free ends) and usually supercoiled.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Bacteriology
## subtopic
Bacterial genetics — plasmids
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Bacteriology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p32 | MANS-PPPM
## article_ids
ART-MANS-PPPM-PLASMID-FORMS-STABILITY
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
22. The most common form of plasmids is: A) Linear plasmids. B) Semicircular plasmids. C) Circular plasmids. D) Covalently closed circular plasmids. E) Square plasmids. [answer: D]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "covalently closed circular plasmid" and "plasmid covalently closed circular DNA form" -- no hit, safe to create; filed under the same new article as CON-INF-4D0653EAD80E26 (linear-plasmid instability) since both describe complementary plasmid-topology facts from the same source page block.
mint: New concept minted for cluster pppmbank4 (Microbiology p.32, Q22). Article ART-MANS-PPPM-PLASMID-FORMS-STABILITY authored alongside it in the same batch.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
Transduction is the form of bacterial gene transfer mediated by a bacteriophage vector
## id
CON-INF-B34E47DDA0A5C0
## canonical_key
bacteria.gene-transfer.transduction-phage-mediated
## aliases
Bacteriophage-mediated gene transfer
## arabic_label

## arabic_aliases
[clear]
## definition
Of the three classic forms of bacterial horizontal gene transfer -- conjugation (direct cell-to-cell contact via a sex pilus), transformation (direct uptake of free DNA by a competent cell) and transduction -- transduction is the one mediated by a bacteriophage: during its lytic cycle the phage accidentally packages donor bacterial DNA into a phage particle, which then injects that DNA into a new recipient cell on subsequent infection.
## explicit_objective
Identify transduction as the bacteriophage-mediated form of horizontal gene transfer, distinguishing it from conjugation and transformation.
## pitfalls
Confusing transduction (needs a phage vector) with conjugation (needs direct cell contact) or transformation (needs free DNA uptake by a competent cell).
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Bacteriology
## subtopic
Bacterial genetics — gene transfer
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Bacteriology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p30 | MANS-PPPM
## article_ids
ART-MANS-PPPM-GENE-TRANSFER-FORMS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
13. Which of the following forms of gene transfer is mediated by bacteriophage? A) Conjugation. B) Mutation C) Transduction D) Transformation E) Transposition [answer: C]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "transduction gene transfer phage" and "transduction bacteriophage" -- closest existing record (CON-INF-E9C14F5981ACE5, generalized transduction transferring plasmid DNA) covers one specific detail, not this general classification fact; AUN-INI-105's own field_notes independently record the identical search gap before minting their own bacteriophage-definition concept, confirming this gap is real. Minted new umbrella concept.
mint: New concept minted for cluster pppmbank4 (Microbiology p.30, Q13). Article ART-MANS-PPPM-GENE-TRANSFER-FORMS authored alongside it in the same batch.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
Phoresis is a transport-only host-parasite association in which one organism is simply carried by another
## id
CON-INF-2D58890CB37378
## canonical_key
parasitology.host-relationships.phoresis-transport-only
## aliases
Phoresis
## arabic_label

## arabic_aliases
[clear]
## definition
Phoresis is a host-parasite (or, more broadly, organism-organism) relationship in which one organism is carried by another purely for transport, without deriving nourishment from the carrier and without harming or benefiting it -- a mechanical, transport-only association distinct from true parasitism (harm to the host), commensalism (one-sided benefit without harm) and mutualism (benefit to both).
## explicit_objective
Define phoresis as a transport-only association (the parasite is carried by the host) and distinguish it from parasitism, commensalism and mutualism.
## pitfalls
Confusing phoresis with commensalism (which involves a nutritional or habitat benefit) or assuming the host benefits, which would instead describe mutualism.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Parasitology
## subtopic
Host-parasite relationships
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Parasitology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p30 | MANS-PPPM
## article_ids
ART-MANS-PPPM-HOST-PARASITE-RELATIONS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
15. Phoresis is a host parasite relation in which the: A) Parasite is host specific. B) Host benefits from the parasite. C) Parasite is host dependent. D) Parasite is carried by the host. E) Host is resistant to the parasite [answer: D]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "phoresis", "phoresis host parasite carried" and "commensalism" -- only unrelated hits (fly-biology Dermatobia phoresis; haematology vignettes matching "phoresis" inside "electrophoresis"); no record defines phoresis as a host-parasite-relationship term. Minted new.
mint: New concept minted for cluster pppmbank4 (Microbiology p.30, Q15). Article ART-MANS-PPPM-HOST-PARASITE-RELATIONS authored alongside it in the same batch.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
Pili (fimbriae) are fine filamentous appendages arising from basal bodies in the bacterial cytoplasmic membrane
## id
CON-INF-C3005E4600F3FD
## canonical_key
bacteria.pili.structure-basal-body-filamentous-appendage
## aliases
Pili structure
Fimbriae structure
## arabic_label

## arabic_aliases
[clear]
## definition
Pili (fimbriae) are fine, hair-like proteinaceous appendages that arise from basal bodies anchored in the cytoplasmic membrane of many, chiefly Gram-negative, bacteria. Structurally they are thinner, shorter, straighter and far more numerous per cell than flagella; ordinary pili mediate adhesion to host cells and surfaces, while specialised sex pili mediate conjugative DNA transfer.
## explicit_objective
Identify pili (fimbriae) as fine filamentous appendages arising from basal bodies in the cytoplasmic membrane, structurally distinct from flagella.
## pitfalls
Confusing pili with flagella, which are thicker, longer, fewer in number and function in motility rather than adhesion.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Bacteriology
## subtopic
Bacterial cell structure — pili and flagella
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Bacteriology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p31 | MANS-PPPM
## article_ids
ART-MANS-PPPM-PILI-STRUCTURE
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
16. The fine filamentous appendages arising from basal bodies in the cytoplasmic membrane of many Gram-negative bacteria are known as: A) Flagella. B) Mesosomes. C) Pili. D) Plasmids. E) Spores. [answer: C]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "pili", "pili basal body" and "pili filamentous appendages basal body" -- existing pili records (CON-INF-BC446C9816D9CE, CON-INF-1EAFF70A6FC769) describe pili FUNCTION, not this structural description; minted new.
mint: New concept minted for cluster pppmbank4 (Microbiology p.31, Q16). Article ART-MANS-PPPM-PILI-STRUCTURE authored alongside it in the same batch.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
Flagella differ from fimbriae by being fewer in number, thicker, longer and helical rather than straight
## id
CON-INF-5F13F185EFA540
## canonical_key
bacteria.pili.flagella-vs-fimbriae-comparison
## aliases
Flagella vs fimbriae comparison
## arabic_label

## arabic_aliases
[clear]
## definition
Compared with fimbriae/pili, bacterial flagella are typically few in number per cell (one to a modest tuft, depending on arrangement, versus several hundred pili), thicker in diameter, longer, and helical/wavy (rotating to produce movement) rather than straight and rigid -- differences that track their different jobs, motility for flagella versus adhesion for pili.
## explicit_objective
Compare flagella with fimbriae/pili on number, thickness, length and shape, and link these structural differences to their different functions.
## pitfalls
Assuming flagella and fimbriae differ only in function (motility vs adhesion) without recognising the accompanying structural differences in number, thickness, length and shape this stem tests.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Bacteriology
## subtopic
Bacterial cell structure — pili and flagella
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Bacteriology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p33 | MANS-PPPM
## article_ids
ART-MANS-PPPM-PILI-STRUCTURE
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
27. Compared with fimbria, flagella is: A) Few in number. B) Straight. C) Thinner. D) Shorter. E) Occur in non-motile chains. [answer: A]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "fimbria flagella difference" and "flagella vs fimbria comparison" -- no hit naming this specific number/thickness/length comparison; minted new, filed under the same article as CON-INF-C3005E4600F3FD (pili structure) since both concern the same pili-vs-flagella comparison from adjacent source pages.
mint: New concept minted for cluster pppmbank4 (Microbiology p.33, Q27). Article ART-MANS-PPPM-PILI-STRUCTURE authored alongside it in the same batch.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
Insertion sequence elements are the simplest transposable elements, carrying only a transposase gene flanked by direct or inverted repeats
## id
CON-INF-4CA956843BD550
## canonical_key
bacteria.mobile-elements.insertion-sequence-structure
## aliases
Insertion sequences
## arabic_label

## arabic_aliases
[clear]
## definition
An insertion sequence (IS) element is the simplest bacterial transposable element: a central gene encoding transposase (the enzyme needed for the element's own movement), flanked at both ends by short direct or inverted repeat sequences that serve as the recognition sites the transposase acts on. Unlike composite or complex transposons (named Tn, e.g. Tn5, Tn7), an IS element carries no accessory genes such as antibiotic resistance.
## explicit_objective
State that insertion sequences are the simplest transposable elements, structurally defined by flanking direct/inverted repeats around a transposase gene, and distinguish them from composite/complex transposons.
## pitfalls
Confusing an insertion sequence with a composite transposon (which carries extra genes, such as resistance determinants, between two flanking insertion sequences) or naming Tn5/Tn7 as insertion sequences rather than transposons.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Bacteriology
## subtopic
Bacterial genetics — mobile genetic elements
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Bacteriology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p31 | MANS-PPPM
## article_ids
ART-MANS-PPPM-INSERTION-SEQUENCE-TRANSPOSABLE-ELEMENTS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
20. Insertion sequence elements: A) Carry genes for antibiotic resistance. B) Carry virulence and transposition genes in its central piece. C) Have examples as Tn5 and Tn7. D) Have direct or inverted repeats at their ends. E) Are the most complex form of transposable elements. [answer: D]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "insertion sequence" and "insertion sequence repeats" -- closest existing record (CON-INF-D6A264E108B348, transposons as mobile 'jumping genes') describes transposons generally, not this specific IS structural feature; minted new.
mint: New concept minted for cluster pppmbank4 (Microbiology p.31, Q20). Article ART-MANS-PPPM-INSERTION-SEQUENCE-TRANSPOSABLE-ELEMENTS authored alongside it in the same batch.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
The bacterial cytoplasmic membrane is the site of electron transport and oxidative phosphorylation, replacing the mitochondrial role
## id
CON-INF-8A977687AA3A8C
## canonical_key
bacteria.cytoplasmic-membrane.electron-transport-function
## aliases
Bacterial electron transport chain location
## arabic_label

## arabic_aliases
[clear]
## definition
Because bacteria have no mitochondria, the electron transport chain and oxidative phosphorylation take place across the bacterial cytoplasmic membrane instead, generating the proton-motive force used for ATP synthesis, active transport and (in motile species) flagellar rotation -- making the cytoplasmic membrane functionally analogous to the eukaryotic inner mitochondrial membrane.
## explicit_objective
Identify electron transport/oxidative phosphorylation as a cytoplasmic-membrane function that substitutes for the absent mitochondrion in bacteria.
## pitfalls
Attributing the Gram staining reaction, motility or adhesion to the cytoplasmic membrane, when these are instead functions of the cell wall, flagella and pili respectively.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Bacteriology
## subtopic
Bacterial cell structure — cytoplasmic membrane
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Bacteriology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p32 | MANS-PPPM
## article_ids
ART-MANS-PPPM-CYTOPLASMIC-MEMBRANE-FUNCTIONS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
26. Which of the following is a function of cytoplasmic membrane? A) Adhesion. B) Electron transport. C) Responsible for staining reaction. D) Motility. E) Conjugation. [answer: B]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "electron transport bacterial membrane" and "electron transport chain bacteria" -- no hit, safe to create.
mint: New concept minted for cluster pppmbank4 (Microbiology p.32, Q26). Article ART-MANS-PPPM-CYTOPLASMIC-MEMBRANE-FUNCTIONS authored alongside it in the same batch.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
The viral nucleic acid (genome) is the infectious part of the virus, as distinct from its capsid or envelope
## id
CON-INF-24FB4526E5DDFC
## canonical_key
virology.virus-structure.nucleic-acid-is-infectious-component
## aliases
Infectious component of a virus
## arabic_label

## arabic_aliases
[clear]
## definition
The viral nucleic acid (the DNA or RNA genome) is the truly infectious component of a virus: it alone carries the genetic information needed to direct a host cell's machinery to produce new virions, and for some non-enveloped viruses, experimentally purified nucleic acid stripped of its capsid can still initiate infection when introduced directly into a susceptible cell, even though far less efficiently than a complete virion.
## explicit_objective
Identify the viral nucleic acid (genome) as the infectious component of the virus, as opposed to its structural capsid or envelope proteins.
## pitfalls
Attributing infectivity to the capsid, capsomers or envelope, which are protective/entry structures rather than the genetic material that actually drives replication.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Virology
## subtopic
Viral structure and infectivity
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Virology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p33 | MANS-PPPM
## article_ids
ART-MANS-PPPM-VIRUS-STRUCTURE-INFECTIVITY
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
31. Which parts of the virus act as an 'infectious part'? A) Capsomers. B) Envelope glycoprotein spikes. C) Lipoproteins. D) Nucleic acids. E) Viral antigens. [answer: D]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "infectious nucleic acid" and "infectious nucleic acid virus" -- no hit, safe to create.
mint: New concept minted for cluster pppmbank4 (Microbiology p.33, Q31). Article ART-MANS-PPPM-VIRUS-STRUCTURE-INFECTIVITY authored alongside it in the same batch.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
Fungi characteristically reproduce by spore formation, which may be either sexual or asexual
## id
CON-INF-DE98690A5CF554
## canonical_key
mycology.reproduction.spore-formation-sexual-or-asexual
## aliases
Fungal reproduction
## arabic_label

## arabic_aliases
[clear]
## definition
Fungi characteristically reproduce by spore formation. Spores may be produced sexually, following fusion of compatible mating types with genetic recombination, or asexually, by mitotic division producing clonal spores -- this dual sexual-or-asexual spore-forming capacity, rather than fission, fragmentation or simple mitosis, is the defining fungal reproductive mechanism.
## explicit_objective
State that fungi reproduce by spore formation, which may occur either sexually or asexually, as the defining fungal reproductive mechanism.
## pitfalls
Naming binary fission (a bacterial mechanism) or plain mitotic division (ordinary vegetative growth) as the defining fungal reproductive mechanism instead of spore formation.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Mycology
## subtopic
Fungal reproduction
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Mycology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p34 | MANS-PPPM
## article_ids
ART-MANS-PPPM-FUNGAL-REPRODUCTION
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
32. How do fungi reproduce? A) Fission as in bacteria. B) Spore formation which may be sexual or asexual. C) Fragmentation of hyphae. D) Formation of unicellular cell. E) Mitotic division. [answer: B]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "fungi sexual asexual spore" and "fungi reproduce" -- closest existing record (CON-INF-2FEBA5328F9E83, fungal spores vs bacterial survival spores) addresses a different comparison; minted new, more specific concept.
mint: New concept minted for cluster pppmbank4 (Microbiology p.34, Q32). Article ART-MANS-PPPM-FUNGAL-REPRODUCTION authored alongside it in the same batch.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## label
A specific parasite is restricted to, and can complete its life cycle only in, a single host species
## id
CON-INF-28E3C38239E3F0
## canonical_key
parasitology.host-relationships.specific-parasite-single-host-species
## aliases
Parasite host specificity
## arabic_label

## arabic_aliases
[clear]
## definition
A specific parasite is one restricted to a single host species, able to complete its life cycle only in that host -- a narrow host range that distinguishes it from non-specific (euryxenous) parasites able to infect multiple host species, and from unrelated classifications such as accidental parasitism or zoonotic transmission direction.
## explicit_objective
Define a specific parasite as one restricted to a single host species, distinguishing host specificity from accidental parasitism and from zoonotic transmission-direction terms (anthropozoonotic/zooanthroponotic).
## pitfalls
Confusing host specificity with transmission-direction terms (anthropozoonotic = animal to human; zooanthroponotic = human to animal), which describe a different classification axis.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-FND-T05-S01
DIS-MIC
## topic
Parasitology
## subtopic
Host-parasite relationships
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Microbiology > Parasitology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p34 | MANS-PPPM
## article_ids
ART-MANS-PPPM-PARASITE-HOST-SPECIFICITY
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.3
## exam_weight_by_year
MANS_Y1=0.3
## clinical_relevance
0.3
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.75
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
33. Which of the following describes specific parasites? A) Accidentally acquired B) Affect only one host species C) Anthropozonototic D) Free living E) Zooanthroponotic [answer: B]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching unless flagged otherwise in field_notes.
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
## exclusion_reason

## field_notes
sourceCandidateIds: find-existing.mjs run for "specific parasite host" and "host specific parasite" -- no hit, safe to create.
mint: New concept minted for cluster pppmbank4 (Microbiology p.34, Q33). Article ART-MANS-PPPM-PARASITE-HOST-SPECIFICITY authored alongside it in the same batch.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.

---

# Item
## id
CON-INF-7789C0F6154E35
## label
Antiphagocytic capsule is an important virulence factor
## universities
+mans
## modules
+MANS-PPPM
## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology section, cluster pppmbank4. Antiphagocytic capsule / bacterial structure protecting against phagocytosis, tested at pppmbank4-q10, q25 (held) and q42 (held) -- three printings of the same fact within this cluster's own window.

---

# Item
## id
CON-INF-3E6590C8AC2166
## label
Bacillus and Clostridium can form dormant highly resistant non-replicating endospores
## universities
+mans
## modules
+MANS-PPPM
## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology section, cluster pppmbank4. Sporing bacterium (Bacillus group), tested at pppmbank4-q02 and repeated at q21 (held).

---

# Item
## id
CON-IMM-50269E374FCFE9
## label
Functional lymphocyte classes are T lymphocytes, B lymphocytes, and natural killer cells
## universities
+mans
## modules
+MANS-PPPM
## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology section, cluster pppmbank4. NK cells classified as a lymphocyte lineage, tested at pppmbank4-q35.
