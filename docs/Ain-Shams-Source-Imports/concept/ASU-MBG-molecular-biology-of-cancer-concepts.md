# Item

## id
CON-FND-05748BDCBE10A5

## label
The retinoblastoma protein (Rb) controls passage through the G1 restriction point by sequestering the E2F transcription factor until cyclin-CDK phosphorylation releases it

## canonical_key
rb.e2f.restriction-point-control

## aliases
Rb-E2F checkpoint
Retinoblastoma protein cell-cycle brake
G1 restriction point

## arabic_label
التحكم في نقطة التقييد بواسطة بروتين الورم الأرومي الشبكي وE2F

## arabic_aliases
بروتين الورم الأرومي الشبكي (Rb)
عامل النسخ E2F

## definition
In its hypophosphorylated (active) state, the retinoblastoma protein (Rb) binds the E2F transcription factor and prevents it from driving the cell into S phase. When a mitogenic (growth-factor) signal is received, cyclin-CDK complexes phosphorylate Rb; phosphorylated (inactivated) Rb releases E2F, which then activates the genes required for DNA synthesis, and the cell passes the late-G1 restriction point committed to complete the cycle. Rb is a tumor suppressor and cell-cycle regulator, not a growth-driving oncogene: it restrains, rather than drives, passage into S phase, so it is a loss-of-function mutation in RB — not the protein "driving cells into the cycle" — that removes this brake and permits uncontrolled proliferation. p53 and Rb both act at this same G1-to-S transition, on different arms of the same checkpoint, which is why exam questions pair the two genes together.

## explicit_objective
State which phosphorylation state of Rb releases E2F and drives G1/S progression, and distinguish Rb's restraining tumor-suppressor role from a growth-driving oncogene's role.

## pitfalls
Reading "Rb protein is phosphorylated" as the resting/inactive statement of the restriction point rather than the triggering event that releases E2F and permits passage — phosphorylation inactivates Rb's brake, it does not represent Rb "doing its job." Also assuming the RB gene's protein product drives cells into the cycle (a distractor pattern this chapter's own paper uses) when in fact it is a brake whose loss, not its activity, permits proliferation; the same reasoning makes "hyperphosphorylation of Rb" the wrong answer whenever a question asks what results in tumor suppression, since hyperphosphorylation releases E2F rather than restraining it.

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
SYS-FND-T01-S02

## topic
Molecular biology

## subtopic
Molecular Biology of Cancer

## microtopic
Rb/E2F cell-cycle checkpoint

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-ONCOGENES-AND-TUMOR-SUPPRESSOR-GENES

## related_article_ids
ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES

## related_concept_ids
CON-FND-FF40DB9ED068F9
CON-FND-1BCB86AE1C6B66

## resource_ids
src_d83a3017c760e2770c22

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
0.9

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
CLM-FND-RB-E2F-RESTRICTION-POINT-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following occur in G1's restriction point? a) Growth factor inhibits cyclin transcription. b) Cyclin inactivates CDK c) The protein P15, P16 activate CDK d) RB protein is phosphorylated. e) E2F transcription factor is inactive." ANSWER: d
"Which of the following about Rb tumor suppressor protein is correct? a. It binds E2F transcription factor preventing cells from entering S phase..." ANSWER: a (Q41); the same fact is asked again at Q24, answer c) "It binds E2F transcription factor and prevents cell from entering [S phase]" — Q24's own option b ("When a mitogenic signal is received, it binds the transcription factor E2F and thus stimulates the cell to enter S phase") is the keyed-wrong distractor, since it reverses the actual causality (a mitogenic signal triggers Rb's phosphorylation and release of E2F, not Rb itself stimulating entry while bound).

## merge_ids

## rejected_merge_candidate_ids
CON-FND-FF40DB9ED068F9 (cyclin-CDK/restriction-point mechanism, Kasr pending) — that record names the restriction point and the cyclin-CDK complexes that drive past it, but never mentions Rb or E2F by name; this record's own tested facts (Rb's phosphorylation state, E2F sequestration/release) are absent from it, so linked as a related concept rather than merged into.

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Molecular Biology of Cancer chapter triage (coverage/ASU-MBG-triage.md Cluster 13); no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "Rb E2F", "retinoblastoma Rb" and "restriction point" before minting (find-existing.mjs) — "restriction point" hit only the cyclin-CDK mechanism concept (CON-FND-FF40DB9ED068F9), which does not name Rb or E2F; no Rb/E2F-specific concept exists anywhere.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same Molecular Biology of Cancer batch. Linked to CON-FND-FF40DB9ED068F9 (cyclin-CDK/restriction point, Kasr pending) as the mechanism this record's Rb-specific fact sits inside, and to CON-FND-1BCB86AE1C6B66 (proto-oncogene/TSG definitions, same batch) since RB is the worked example of a tumor suppressor gene both records cite. No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-1BCB86AE1C6B66

## label
Proto-oncogenes encode proteins that normally drive cell division (growth factors, receptors, signal-transduction proteins, cell-cycle regulators); tumor suppressor genes encode proteins that normally restrain division or repair/eliminate damaged cells — both operate, in their normal form, in every healthy cell

## canonical_key
oncogene.proto-oncogene-vs-tumor-suppressor-gene.definitions

## aliases
Proto-oncogene definition
Tumor suppressor gene definition
Oncogene examples
CDK inhibitors as tumor suppressors

## arabic_label
الجينات الورمية الأولية وجينات كبت الأورام

## arabic_aliases
الجين الورمي الأولي
جين كابت للورم

## definition
Proto-oncogenes and tumor suppressor genes are functionally opposite classes of gene that both, in their normal state, participate in controlling cell division — the similarity a question can test directly. A proto-oncogene's normal product promotes division (a growth factor, its receptor, a signal-transduction protein, or a cell-cycle driver such as a cyclin); a gain-of-function mutation converts it into an oncogene, and one mutated allele is enough to contribute to uncontrolled proliferation. A tumor suppressor gene's normal product restrains division or repairs/eliminates damaged cells (RB and p53 are the two worked examples in this chapter; CDK inhibitors such as p15, p16 and p21 are tumor suppressor genes too, not oncogenes); a loss-of-function mutation removes this brake. Growth factors themselves can stimulate the cell cycle directly. Cyclins drive the cycle forward and so are not classed as tumor suppressor genes, and CDK inhibitors restrain it and so are not classed as oncogenes; recognised oncogenes in this chapter's own answer key include Cerb-B2, c-Myc and Bcl-2. Proto-oncogenes are present and normally expressed in every healthy cell — they are not switched on only after a cell becomes malignant; it is specifically their mutated, overexpressed oncogene form that is pathological.

## explicit_objective
State the functional difference between a proto-oncogene's and a tumor suppressor gene's normal product, name RB/p53/CDK-inhibitors as tumor suppressor genes and Cerb-B2/c-Myc/Bcl-2 as oncogenes, and state that proto-oncogenes are expressed in healthy cells, not only in transformed ones.

## pitfalls
Assuming proto-oncogenes are only expressed once a cell becomes cancerous — they are normal, healthy-cell genes; only their transformed, oncogene state is pathological. Classifying a CDK inhibitor as an oncogene when it restrains the cycle and so is a tumor suppressor, or classifying a cyclin as a tumor suppressor when it drives the cycle forward. Assuming a gene mutation converts a proto-oncogene into a tumor suppressor gene or vice versa — the two classes are functionally opposite, and mutation moves a proto-oncogene toward an oncogene (gain of function) or inactivates a tumor suppressor gene (loss of function); it never converts one class into the other.

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
SYS-FND-T01-S02

## topic
Molecular biology

## subtopic
Molecular Biology of Cancer

## microtopic
Proto-oncogenes and tumor suppressor genes

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-ONCOGENES-AND-TUMOR-SUPPRESSOR-GENES

## related_article_ids
ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES

## related_concept_ids
CON-FND-05748BDCBE10A5
CON-FND-76604784CC143B
CON-FND-CF3FFDEA6D271F

## resource_ids
src_d83a3017c760e2770c22

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
0.9

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
CLM-FND-PROTO-ONCOGENE-TSG-DEFINITIONS-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is a similarity between proto-oncogenes and tumor suppressor gene? a) They both control cell division..." ANSWER: a
"Which of the following is NOT a tumor suppressor gene? a) The retinoblastoma Rb b) P53 gene c) CDKIs as P21 d) Cyclin e) Bax." ANSWER: d
"Which of the following is NOT an oncogene? a) Cerb-B2 b) c-Myc c) CDKIs d) Cyclin e) Bcl-2" ANSWER: c

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Molecular Biology of Cancer chapter triage; no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "proto-oncogene", "tumor suppressor", "loss of function tumor suppressor" and "gain of function oncogene" before minting — the only hits were an article alias and a glossary term (no teaching concept) for "tumor suppressor"; no dedicated definitional concept exists anywhere.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same batch. Linked to CON-FND-05748BDCBE10A5 (Rb is this record's worked TSG example), CON-FND-76604784CC143B (the activation-mechanism concept this record's gain/loss-of-function distinction feeds), and CON-FND-CF3FFDEA6D271F (cancer-cell hallmarks, the downstream phenotype both gene classes contribute to). No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-76604784CC143B

## label
A proto-oncogene is converted to an active oncogene by point mutation, gene amplification, chromosomal translocation, insertion mutagenesis (including retroviral promoter insertion) or elimination of its own translational start signal — never by deletion of the gene itself

## canonical_key
oncogene.activation.proto-to-active-mechanisms

## aliases
Proto-oncogene activation mechanisms
Chromosomal translocation oncogene
Gene amplification cancer

## arabic_label
آليات تنشيط الجين الورمي الأولي إلى جين ورمي

## arabic_aliases
التضخيم الجيني
الانتقال الصبغي

## definition
Several distinct mechanisms convert a normal proto-oncogene into an active oncogene: a point mutation in the coding sequence (the classical RAS example), gene amplification (extra copies raising expression, e.g. HER2/Cerb-B2 in breast cancer), chromosomal translocation that places the gene under a new, stronger regulatory element or fuses it to another gene (the Philadelphia chromosome's BCR-ABL is the worked translocation example), and insertion mutagenesis, in which a foreign sequence — classically a retroviral promoter — is inserted next to the proto-oncogene and drives its overexpression. Every one of these mechanisms increases the gene's expression or activity. Deletion of a proto-oncogene has the opposite effect: it removes the gene's growth-promoting function rather than activating it, so deletion is never a mechanism of proto-oncogene-to-oncogene activation, in direct contrast to a tumor suppressor gene, where deletion of the remaining functional copy is exactly the mechanism that contributes to cancer. Eliminating a proto-oncogene's own translational start signal would silence its expression, not enhance it, so this too is not an activating mechanism.

## explicit_objective
Name the mechanisms that activate a proto-oncogene into an oncogene, and explain why deletion of a proto-oncogene — unlike deletion of a tumor suppressor gene — is not one of them.

## pitfalls
Applying the tumor-suppressor-gene logic (deletion contributes to cancer) to a proto-oncogene, where deletion instead removes its function and cannot activate it. Naming elimination of the gene's own translational start signal as an activating step when it would silence, not enhance, expression.

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
SYS-FND-T01-S02

## topic
Molecular biology

## subtopic
Molecular Biology of Cancer

## microtopic
Proto-oncogene activation mechanisms

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-ONCOGENES-AND-TUMOR-SUPPRESSOR-GENES

## related_article_ids
ART-104-HIS-STRUCTURAL-ABERRATIONS

## related_concept_ids
CON-FND-1BCB86AE1C6B66
CON-FND-4A768CDB232E77
CON-DEV-D2BA4082190B3F

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.4

## exam_weight_by_year
ASU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.45

## confidence
0.8

## atomic_claim_ids
CLM-FND-ONCOGENE-ACTIVATION-MECHANISMS-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Proto-oncogenes are not converted to oncogene by which of the following? a) Chromosomal translocation b) Proto-oncogene duplication c) Insertion mutagenesis d) Proto-oncogene deletion e) Point mutation of proto-oncogene." ANSWER: d
"Proto-oncogenes can be transformed to oncogenes by all of the following mechanisms except a) Elimination of their start signals for translation. b) Point mutations. c) Gene Amplification d) Chromosomal translocation e) Promoter insertion." ANSWER: a
"One of these mechanisms dose not result in activation of a protooncogene to an oncogene? ... e) Promotor deletion." ANSWER: e

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Molecular Biology of Cancer chapter triage; no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "proto-oncogene activation mechanisms" and "chromosomal translocation cancer" before minting — no hit anywhere.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same batch. Linked to CON-FND-1BCB86AE1C6B66 (the gene-class definitions this mechanism list activates between), CON-FND-4A768CDB232E77 (retroviral promoter insertion is the specific worked example of one of these mechanisms), and the already-ASU-tagged CON-DEV-D2BA4082190B3F (structural chromosomal aberrations, whose own pitfalls field names the Philadelphia/BCR-ABL translocation this record cites as its translocation example). No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-4A768CDB232E77

## label
Retroviruses can transform a host cell into a tumor cell by inserting a strong viral promoter next to a host proto-oncogene (insertional mutagenesis), a process that requires the retrovirus's own reverse transcriptase to first copy its RNA genome into DNA for integration

## canonical_key
retrovirus.oncogenesis.promoter-insertion-mechanism

## aliases
Retroviral insertional mutagenesis
Retrovirus reverse transcriptase requirement

## arabic_label
التسرطن بواسطة الفيروسات القهقرية

## arabic_aliases
إنزيم النسخ العكسي الفيروسي
إدخال المروج الفيروسي

## definition
A retrovirus carries an RNA genome and must first copy it into double-stranded DNA using its own reverse transcriptase — an RNA-dependent DNA polymerase — before that DNA copy (the provirus) can integrate into the host cell's chromosome. If the provirus happens to integrate next to a host proto-oncogene, the strong viral promoter/enhancer it carries drives abnormally high expression of that proto-oncogene — a mechanism called insertional mutagenesis or promoter insertion, one of the recognised routes by which a proto-oncogene is activated into an oncogene. Without reverse transcriptase, a retrovirus cannot make the DNA copy its genome needs to integrate, and so cannot alter host gene expression by this route at all; reverse transcriptase, not telomerase, caspase or any DNA-repair enzyme, is the specific enzyme this mechanism depends on.

## explicit_objective
State that retroviruses transform host cells chiefly by promoter insertion next to a proto-oncogene, and name reverse transcriptase as the enzyme this mechanism requires.

## pitfalls
Naming telomerase, caspase or another enzyme as what retroviruses need for oncogenesis — the tested requirement is specifically reverse transcriptase, needed to make the DNA copy that integrates into the host genome in the first place. Treating retroviral transformation as a wholly separate mechanism from ordinary proto-oncogene activation, when it is in fact a specific, retrovirus-mediated case of promoter/insertion mutagenesis.

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
SYS-FND-T01-S02

## topic
Molecular biology

## subtopic
Molecular Biology of Cancer

## microtopic
Retroviral oncogenesis

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-ONCOGENES-AND-TUMOR-SUPPRESSOR-GENES

## related_article_ids

## related_concept_ids
CON-FND-76604784CC143B
CON-FND-874F418DFB12AF

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.35

## academic_relevance
0.8

## weight_confidence
0.45

## confidence
0.8

## atomic_claim_ids
CLM-FND-RETROVIRAL-ONCOGENESIS-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Retroviruses can produce a tumor cell by a) Point mutation b) Gene amplification c) Chromosomal translocation d) Promotor insertion." ANSWER: d
"Which of the following enzymes is needed by Retroviruses to produce a tumor cell? a) Reverse transcriptase b) caspase c) telomerase d) Promotor insertion. e) Spliceosome." ANSWER: a

## merge_ids

## rejected_merge_candidate_ids
CON-FND-874F418DFB12AF (Alexandria's "replication.reverse-transcriptase.rna-to-dna" concept) — that record teaches reverse transcriptase as a generic RNA-to-DNA enzyme (its own objective is naming the enzyme for cDNA synthesis), with no objective or pitfall about retroviral oncogenesis or promoter insertion; this record's own tested fact (the mechanism by which a retrovirus turns a host cell cancerous) is absent from it, so linked as a related concept rather than merged into.

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Molecular Biology of Cancer chapter triage; no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "retrovirus oncogene" (no hit) and "reverse transcriptase" (hit only Alexandria's generic DNA-replication-framed concept, recorded above as a rejected merge candidate) before minting.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same batch. Linked to CON-FND-76604784CC143B (promoter insertion is one of the general activation mechanisms this record specialises to retroviruses) and to the pre-existing Alexandria concept CON-FND-874F418DFB12AF (the generic reverse-transcriptase mechanism this record's enzyme requirement draws on). No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-B03C1C16A79323

## label
p53, the guardian of the genome, is normally kept inactive by Mdm2; DNA damage stabilises p53, which halts the cell at the G1-S checkpoint via p21, activates DNA-repair enzymes, and triggers apoptosis if the damage is irreparable

## canonical_key
p53.dna-damage-response.guardian-of-genome

## aliases
p53 guardian of the genome
Mdm2-p53 regulation
p53 DNA damage checkpoint

## arabic_label
p53 وحارس الجينوم — الاستجابة لتلف الحمض النووي

## arabic_aliases
بروتين p53
جين Mdm2

## definition
p53 is called the guardian of the genome because it is the cell's principal sensor-and-response system for DNA damage. In a normal, undamaged cell, p53 is kept at a low, inactive level by Mdm2, which binds it and targets it for degradation. DNA damage disrupts this Mdm2-p53 interaction, stabilising and activating p53. Activated p53 halts the cell cycle specifically at the G1-S checkpoint (through p21, a CDK inhibitor) so that damaged DNA is not replicated, and stimulates synthesis of the DNA-repair enzymes needed to fix the damage. If the damage is irreparable, p53 instead commits the cell to apoptosis (through the pro-apoptotic protein Bax), removing the damaged cell rather than allowing a mutation to be passed on. p53 does not cause or drive the G1-S transition — halting that very transition is its role — and it is a policeman-of-the-cell / tumor-suppressor function throughout, never one that activates anti-apoptotic (pro-survival) gene expression.

## explicit_objective
State p53's normal regulation by Mdm2, the checkpoint it halts on DNA damage, and its two possible outcomes (repair-then-resume, or apoptosis if damage is irreparable).

## pitfalls
Reading p53 as causing the G1-S transition (it halts it, precisely the opposite) or as activating anti-apoptotic genes (it triggers apoptosis via pro-apoptotic Bax when damage is irreparable, not survival). Forgetting Mdm2's role: in a normal, undamaged cell, p53 is kept inactive specifically by Mdm2 binding, not because p53 is inherently unstable on its own — "release of Mdm2 away from p53" is itself one route by which tumor suppression can occur, since it frees p53 to act.

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
SYS-FND-T01-S02

## topic
Molecular biology

## subtopic
Molecular Biology of Cancer

## microtopic
p53 DNA-damage response

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-ONCOGENES-AND-TUMOR-SUPPRESSOR-GENES

## related_article_ids
ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES

## related_concept_ids
CON-FND-1F66060A9C2625
CON-FND-05748BDCBE10A5

## resource_ids
src_d83a3017c760e2770c22

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
0.55

## academic_relevance
0.9

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
CLM-FND-P53-DNA-DAMAGE-RESPONSE-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"All of the following are true as regard p53 except: ... d) In a normal cells p53 inactivated by Mdm2. e) Initiate apoptosis if DNA damage is irreparable." (b, "Cause G1-S transition in cell cycle," is the false statement) ANSWER: b
"Which of the followings is not true about p53 protein? ... e) It activates the gene producing antiapoptotic proteins." ANSWER: e
"Which property of p53 enables it to prevent the development of cancer? a) It prevents replication of cells with damaged DNA..." ANSWER: a
"At which cell cycle checkpoint, cell cycle is halted if cells DNA is damaged: ... d) G1-S" ANSWER: d

## merge_ids

## rejected_merge_candidate_ids
CON-FND-1F66060A9C2625 ("cell-cycle-and-apoptosis-regulatory-proteins", Kasr pending) — that record states p53 arrests the cycle in G1 via p21 and triggers apoptosis via Bax after severe damage, but its definition names no Mdm2 regulation, no explicit G1-S-checkpoint-halt framing, and no "guardian of the genome"/DNA-repair-activation clause; the four questions this record answers test exactly those absent facts, so linked as a related concept (broader family) rather than merged into.

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Molecular Biology of Cancer chapter triage; no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "p53" before minting — the only hits were the broader pending cell-cycle/apoptosis-regulators concept (recorded above as a rejected merge candidate) and unrelated article/glossary aliases; no dedicated p53-DNA-damage-response concept exists anywhere.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same batch. Linked to CON-FND-1F66060A9C2625 (the broader pending cell-cycle/apoptosis-regulators family this record's p53 detail sits inside) and CON-FND-05748BDCBE10A5 (Rb, the parallel G1/S-checkpoint tumor suppressor this chapter's own paper pairs p53 with). No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-BBCC9BC05C8C5F

## label
Caspase 9 is the initiator caspase of the intrinsic (mitochondrial) pathway and caspase 8 the initiator of the extrinsic (death-receptor) pathway; both converge on the same shared effector caspase, caspase 3, which actually executes the cell's death; the apoptosome (cytochrome c + Apaf-1 + procaspase-9, assembled with ATP) activates caspase 9, while a receptor-bound adaptor protein directly activates procaspase 8

## canonical_key
apoptosis.caspase-cascade.initiator-effector-apoptosome

## aliases
Initiator caspase
Effector caspase
Apoptosome composition
Caspase 3 executioner

## arabic_label
سلسلة الكاسبيز — الكاسبيز البادئ والمنفذ وجسيم الاستماتة

## arabic_aliases
الكاسبيز البادئ
الكاسبيز المنفذ
جسيم الاستماتة (أبوبتوسوم)

## definition
Two initiator caspases start apoptosis, one per pathway. Caspase 9 initiates the intrinsic/mitochondrial pathway: cytochrome c released from mitochondria binds Apaf-1 (apoptosis activation factor) together with ATP/dATP and procaspase-9 to form the apoptosome, which activates caspase 9; the apoptosome does not contain procaspase-8, which belongs to the separate extrinsic pathway. Caspase 8 initiates the extrinsic/death-receptor pathway: once a death ligand binds its receptor (e.g. FAS or TNF receptor), a receptor-bound adaptor protein directly activates procaspase-8 — not cytochrome c or Apaf-1. Both initiator caspases converge on a single shared effector (executioner) caspase, caspase 3, which is the caspase that actually carries out the death of the cell — DNA fragmentation, cytoskeletal breakdown and the other hallmarks of apoptotic execution. Caspase 8 is specific to the extrinsic pathway and takes no part in the intrinsic pathway.

## explicit_objective
Name caspase 9 as the intrinsic-pathway initiator, caspase 8 as the extrinsic-pathway initiator, caspase 3 as the shared effector that both converge on, list the apoptosome's four components, and name the adaptor protein as procaspase-8's direct activator.

## pitfalls
Confusing which numbered caspase initiates which pathway — caspase 9 for intrinsic, caspase 8 for extrinsic, easy to swap. Naming caspase 9 or caspase 8 as the executioner instead of caspase 3, which both pathways converge on. Listing procaspase-8 as an apoptosome component — it belongs to the separate extrinsic pathway, not the cytochrome-c/Apaf-1/procaspase-9/ATP apoptosome — or naming cytochrome C/Apaf-1 rather than a receptor adaptor protein as procaspase-8's direct activator.

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
SYS-FND-T01-S02
DIS-PAT-T01

## topic
Molecular biology

## subtopic
Molecular Biology of Cancer

## microtopic
Caspase cascade and apoptosome

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-CASPASE-CASCADE-AND-APOPTOSOME

## related_article_ids
ART-108-PAT-APOPTOSIS
ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES

## related_concept_ids
CON-FND-70E5BD77E8FE49
CON-FND-46B3AD5A2D8294
CON-FND-C6661CBD045436

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.55

## exam_weight_by_year
ASU_Y1=0.55

## clinical_relevance
0.45

## academic_relevance
0.9

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
CLM-FND-CASPASE-INITIATOR-EFFECTOR-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is the initiator caspase in intrinsic pathway ... c) Caspase 9" ANSWER: c
"Which of the following is the initiator caspase in Extrinsic pathway ... b) Caspase 8" ANSWER: b
"Which of the following is the Effector caspase in Extrinsic pathway ... a) Caspase 3" ANSWER: a
"Apoptosome contain all the following except ... c) Procaspase 8" ANSWER: c
"Which of the following is the direct activator of procaspase 8 ... c) Adaptor protein" ANSWER: c
"Which of the followings is not involved in intrinsic apoptotic pathway? ... d) Caspase 8." ANSWER: d
"Which of the following best describes the components of apoptosome? ... b) Cytochrome C, Apaf-1, and procaspase-9" ANSWER: b

## merge_ids

## rejected_merge_candidate_ids
CON-FND-70E5BD77E8FE49 ("caspases-and-the-extrinsic-and-intrinsic-apoptotic-pathways", Kasr pending) and CON-FND-C6661CBD045436 ("apoptosis.control.caspases-and-bcl2", 108-INT pending) — both teach that caspases are cysteine proteases activated by the two pathways in general terms, but neither names caspase 9/8/3 individually, lists the apoptosome's components, or names the adaptor-protein/procaspase-8 link; the nine questions this record answers test exactly that missing granularity, so both are linked as related concepts (the general mechanism this record specialises) rather than merged into.

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Molecular Biology of Cancer chapter triage; no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "initiator caspase", "effector caspase" and "apoptosome Apaf-1" before minting — no hit anywhere for the specific numbered-caspase/apoptosome-composition facts; the two near neighbours found are recorded above as rejected merge candidates.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same batch. Linked to CON-FND-70E5BD77E8FE49 and CON-FND-C6661CBD045436 (the two general pending caspase concepts this record specialises) and CON-FND-46B3AD5A2D8294 (apoptosis morphology, the downstream effect caspase-3 execution produces). No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-CF3FFDEA6D271F

## label
A cancer cell is characterised by uncontrolled cell division, invasion of neighbouring tissue, spread to distant sites (metastasis), and resistance to apoptosis — the combination of all four, not any single feature alone

## canonical_key
cancer.cell-hallmarks.phenotype

## aliases
Cancer cell characteristics
Hallmarks of a cancer cell

## arabic_label
السمات المميزة للخلية السرطانية

## arabic_aliases
الانقسام الخلوي غير المنضبط
الانتشار (النقائل)

## definition
A cancer cell is defined by the combination of four phenotypic features acting together, not by any one of them in isolation: autonomous, uncontrolled cell division that no longer responds to the normal signals restraining growth; invasion of neighbouring tissue, crossing boundaries a normal cell respects; metastasis, the capacity to spread to and establish growth at distant sites; and resistance to apoptosis, evading the normal programmed-death response that would otherwise remove a damaged or abnormal cell. All four features together are what an exam question asking "a cancer cell is characterised by" is testing, and each on its own is a genuine but partial description.

## explicit_objective
List the four hallmark features that together characterise a cancer cell (uncontrolled division, invasion, metastasis, apoptosis resistance).

## pitfalls
Selecting only one feature (most often "uncontrolled cell division" alone) when the question asks for the complete characterisation of a cancer cell — the correct answer combines all four, since each is individually necessary but not sufficient to describe malignant behaviour.

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
SYS-FND-T01-S02

## topic
Molecular biology

## subtopic
Molecular Biology of Cancer

## microtopic
Cancer-cell hallmark features

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-ONCOGENES-AND-TUMOR-SUPPRESSOR-GENES

## related_article_ids

## related_concept_ids
CON-FND-1BCB86AE1C6B66

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.45

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-CANCER-CELL-HALLMARKS-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A cancer cell is characterized by a) Uncontrolled cell division b) Invasion of neighboring cells c) Spread to distant sites d) Resist apoptosis e) All of these" ANSWER: e

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Molecular Biology of Cancer chapter triage; no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "cancer cell characteristics hallmarks" before minting — no hit anywhere.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same batch. Linked to CON-FND-1BCB86AE1C6B66 (proto-oncogene/TSG definitions) as the genetic basis this record's downstream phenotype rests on. No typed-edge relations batch written this pass.

---
