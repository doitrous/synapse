# Item

## id
CON-FND-74F14B0C28F74B

## label
Cytogenetic technique selection by indication

## canonical_key
genetics.cytogenetics.technique-selection-by-indication

## aliases
Cytogenetic test selection
Indications for cytogenetic analysis
Choosing FISH vs karyotype vs microarray

## arabic_label

## arabic_aliases

## definition
The four cytogenetic techniques are not interchangeable — each matches the size and kind of abnormality suspected.

**Conventional karyotyping** is the first-line, general-purpose test for a **numerical aberration** (such as trisomy 21) or a large structural one. __It is the only one of the four that visualises the whole chromosome complement, so it is what confirms a balanced translocation.__

**High-resolution karyotyping** arrests cells earlier (prophase/prometaphase) to resolve **smaller structural abnormalities** than conventional karyotyping can.

**FISH** targets one known, specific probe (a microdeletion such as 15q, or a suspected aneuploidy) and is faster than karyotyping, but __requires knowing what to look for in advance.__

**Microarray** screens the whole genome for **copy-number changes** (microdeletions, microduplications, trisomies, monosomies) at higher resolution than karyotyping. Because it detects gain or loss of material rather than its arrangement, __it cannot detect a balanced translocation or inversion__, where no material is gained or lost.

Indications for referral include intellectual disability with dysmorphic facies, short stature in a female (possible Turner syndrome), fertility problems and recurrent miscarriage, and advanced maternal age — **but not universal newborn screening**.

## explicit_objective
Given a clinical indication (a suspected microdeletion, a numerical aneuploidy, a balanced translocation, or a genome-wide unbalanced rearrangement), select the cytogenetic technique that can actually detect it, and state why the others cannot.

## concept_type
investigation

## status
under review

## support_mode
inferred

## subject
fnd

## primary_node_id
SYS-FND-T02-S02-M02

## topic
Human genetics

## subtopic
Genomic methods and counselling

## microtopic
Genetic testing

## nanotopic

## secondary_node_ids
DIS-GEN | KNW-DIA

## pitfalls
Ordering microarray for a patient with a suspected balanced translocation (such as a mother with recurrent miscarriage): microarray only detects copy-number change, so a genuinely balanced rearrangement returns a normal result and the true cause is missed. Conventional karyotyping, not microarray, is the correct test whenever a balanced structural rearrangement is suspected.

## related_concept_ids
CON-FND-F994CFE9178664
CON-FND-176C4D79DE2D9B
CON-FND-F6EED466B61FA3
CON-FND-6DA77834D84CF7

## modules
ASU-MBG

## article_ids
ART-FND-CYTOGENETIC-FISH-MICROARRAY

## related_article_ids
ART-FND-CYTOGENETIC-KARYOTYPE-FOUNDATIONS

## resource_ids
src_55c89e56f25f683c83fa
src_0680f45a8f7d7d1cabd2

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.5

## exam_weight_by_year
ASU_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.75

## module_subject
ASU-MBG > Medical Genetics and Molecular Biology > Lectures > Cytogenetic diagnostic techniques

## exam_signal
src_0680f45a8f7d7d1cabd2 | tier5 | unknown-year | How to Study Chromosomes Q1, Q4-Q7, Q9-Q12

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids
CLM-FND-CYTOGENETIC-SELECTION-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"To detect microdeletion in chromosome 15, the best method used is: Fluorescence in situ hybridization" (MCQs - Bg MCQs revision Dr.Omar, How to Study Chromosomes Q4)
"All the following abnormalities can be detected by microarray except: ... Unbalanced translocation [is detected, balanced is the exception]" (same source, Q8)
"You examined a phenotypically normal mother with recurrent miscarriages... suspected balanced chromosomal translocation. The best method... Conventional karyotyping" (same source, Q11)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
The source sheet's own answer key for Q9 (ranking FISH, conventional karyotyping, microarray and high-resolution karyotyping from largest to smallest detectable abnormality) is recorded as printed; this concept's definition states the general size ordering the department teaches without over-claiming a single universal resolution ranking, since real-world resolution ranges for these techniques overlap.

## evidence_gaps
Evidence must be attached before publication. The claim below is sourced from the formative sheet's own printed key; no department-book page citation has been located yet.

## owner
Dr. Omar

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
arabicLabel: No standard Arabic term is in undergraduate use for this comparative fact; students use the English technique names.
nanotopicId: The microtopic placement (Genetic testing) is already more precise than any nanotopic would be for this comparative synthesis.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the triaged formative MCQ sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus (find-existing.mjs "karyotype notation", plus the four technique names individually) — the four base techniques already have their own ASU-MBG concepts (this lane's earlier chromosome-analysis batch); no existing concept covers the comparative "which technique for which indication" synthesis this cluster's questions actually test.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: This concept sits alongside the four ASU-MBG cytogenetic-technique concepts (karyotype, high-resolution karyotype, FISH, microarray) under the same module_subject; related_concept_ids links all four as the prerequisite facts this comparative concept builds on. No typed edge authored this pass — relations batch not in this lane's current scope; flagged for the relationship pass.
