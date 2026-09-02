<!--
  SCU-FBS103 · Foundation 2 — S2 minting pass, second author lane
  (scu-fbs103-author2). 26 concepts genuinely new to the corpus after
  re-verification: `find-existing.mjs` on the final canonical key AND a
  `grep -ril` of 2-3 distinctive terms across every `docs/*-Source-Imports/
  concept/`, `pending-live/` directory and `docs/import-ready/concept/`,
  plus a read of every hit body. Several candidates surfaced related but
  non-matching hits during that closer read (a different specific tested
  fact, not the same concept) — each is named as a rejected merge candidate
  in that record's own field_notes rather than silently discarded.

  Ids minted with `mint-concept-id.mjs`, checked against the live snapshot
  and the taken-id scan; none derived for a concept that already exists.
  `atomic_claim_ids` is `[clear]` on every record — this lane is scoped to
  concept, article and question files, and mints no evidence claim or
  citation records, matching the standing convention already documented in
  Kasr's 103-BMS-mcq-lipid-concepts.md and this lane's own
  SCU-FBS103-s2-mint-concepts.md / SCU-FBS103-s2-author1-batch2-mint-concepts.md.
  The evidence chain is owed and named in the hand-off report, not
  concealed.

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

  Covers: Biochemistry (DNA replication and nucleotide structure, 6
  concepts), Embryology (weeks 1-4 and fetal circulation, 11 concepts),
  Histology (astrocyte morphology and the peripheral nerve sheath, 2
  concepts), Parasitology (life-cycle and basic terminology, 4 concepts),
  Pharmacology (receptor and adverse-drug-reaction classification, 3
  concepts).
-->

# Item

## label
DNA polymerase III holoenzyme combines 5' to 3' polymerase activity with a proofreading 3' to 5' exonuclease activity

## id
CON-FND-97729CC3ACABF8

## canonical_key
biochemistry.dna-polymerase-iii.5to3-polymerase-3to5-exonuclease

## aliases
DNA polymerase III activities
Proofreading exonuclease of DNA polymerase III

## arabic_label


## arabic_aliases


## definition
DNA polymerase III holoenzyme is the main replicative enzyme of bacterial DNA replication, and it carries two activities in the same molecule. Its 5' to 3' polymerase activity adds nucleotides to the growing daughter strand, reading the template 3' to 5' and synthesising 5' to 3'. Its 3' to 5' exonuclease activity is a built-in proofreading function that immediately removes a misincorporated nucleotide from the 3' end of the growing strand before the next nucleotide is added, which is the main reason bacterial replication achieves such high fidelity.

## explicit_objective
State that DNA polymerase III holoenzyme carries both 5' to 3' polymerase activity and a proofreading 3' to 5' exonuclease activity in the same molecule.

## pitfalls
Confusing polymerase III's own proofreading exonuclease (3' to 5') with the 5' to 3' exonuclease activity of DNA polymerase I, which is used for a different job entirely — excising RNA primers ahead of the advancing fork, not proofreading newly added bases.

## concept_type
directly_taught_fact

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
DNA replication: DNA polymerase III activities

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
ART-SCU-FBS103-BIO-DNA-REPLICATION-NUCLEOTIDE

## related_article_ids


## related_concept_ids
CON-FND-FC1C2D276EFCB1

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Biochemistry > Molecular Biology > DNA Replication

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY Final 2025 Q30 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"DNA polymerase III holoenzyme possesses which of the following activities? ... 5' to 3' polymerase and 3' to 5' exonuclease activities" (FOMSCU Foundation 2 EOY Final 2025, Q30)

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
sourceCandidateIds: find-existing.mjs on "5' to 3' polymerase 3' to 5' exonuclease DNA polymerase III" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
A nucleotide is composed of a nitrogenous base, a pentose sugar and a phosphate group

## id
CON-FND-4B34F00B9AC6EE

## canonical_key
biochemistry.nucleotide-structure.three-components-base-sugar-phosphate

## aliases
Three components of a nucleotide
Nucleotide versus nucleoside

## arabic_label


## arabic_aliases


## definition
A nucleotide has three structural components: a nitrogenous base (a purine or a pyrimidine) attached to the 1' carbon of a five-carbon pentose sugar, and a phosphate group attached to the sugar's 5' carbon. A base attached to a sugar with no phosphate group is instead called a nucleoside, so the phosphate group is what specifically distinguishes a nucleotide from a nucleoside. During polymerisation, the phosphate of one nucleotide links to the 3'-hydroxyl of the next sugar, so all three components are required both for the nucleotide's own identity and for the strand it becomes part of.

## explicit_objective
State that a nucleotide is composed of a nitrogenous base, a pentose sugar and a phosphate group, distinguishing it from a nucleoside (base plus sugar only).

## pitfalls
Confusing nucleotide with nucleoside — a nucleoside is base plus sugar only, missing the phosphate group that a nucleotide requires.

## concept_type
directly_taught_fact

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
Nucleic acid structure: nucleotide composition

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
ART-SCU-FBS103-BIO-DNA-REPLICATION-NUCLEOTIDE

## related_article_ids


## related_concept_ids
CON-FND-28BB941CB8376F

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Biochemistry > Molecular Biology > Nucleic Acid Structure

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q42 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A nucleotide is structurally composed of: ... A nitrogenous base, a pentose sugar, and a phosphate group" (FOMSCU Foundation 2 EOM MID 2026, Q42)

## merge_ids


## rejected_merge_candidate_ids
CON-FND-28BB941CB8376F

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
sourceCandidateIds: find-existing.mjs on "nitrogenous base pentose sugar phosphate group nucleotide" surfaced 15 hits; the closest, CON-FND-28BB941CB8376F (SCU-FBS102-s2-author5-mint-concepts.md), was read in full and found to test the narrower fact that the phosphate attaches specifically to the sugar's 5' carbon, not this stem's broader three-component-composition question — a related but distinct explicit_objective, so rejected as a merge candidate and linked as related instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Eukaryotic chromosomes replicate from many origins of replication simultaneously

## id
CON-FND-FC1C2D276EFCB1

## canonical_key
biochemistry.dna-replication.eukaryotic-many-origins

## aliases
Multiple replication origins
Eukaryotic versus prokaryotic replication origins

## arabic_label


## arabic_aliases


## definition
Eukaryotic chromosomes are far longer than a bacterial chromosome, so eukaryotic cells fire many origins of replication along each chromosome simultaneously rather than replicating from a single origin. Each origin creates its own replication bubble, and these bubbles extend and fuse together as replication proceeds, letting the entire chromosome finish replicating within the time available in S phase. This contrasts with the typical bacterial pattern, in which the single circular chromosome is replicated from one origin (oriC).

## explicit_objective
State that eukaryotic chromosomes replicate from many origins of replication simultaneously, unlike the single origin typical of a bacterial chromosome.

## pitfalls
Assuming eukaryotic replication uses only one origin per chromosome by analogy with the bacterial pattern; the opposite is true, and this multi-origin strategy is precisely what allows eukaryotic replication to finish within S phase despite the much greater chromosome length.

## concept_type
directly_taught_fact

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
DNA replication: eukaryotic versus prokaryotic origins

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
ART-SCU-FBS103-BIO-DNA-REPLICATION-NUCLEOTIDE

## related_article_ids


## related_concept_ids
CON-FND-97729CC3ACABF8

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Biochemistry > Molecular Biology > DNA Replication

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q10 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Eukaryotic DNA replication differs from prokaryotic replication in that eukaryotes typically have: ... Many origins of replication" (FOMSCU Foundation 2 EOM MID 2026, Q10)

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
sourceCandidateIds: find-existing.mjs on "many origins of replication eukaryotic" and a grep -ril for "many origins of replication" across docs/*-Source-Imports and docs/import-ready — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The eukaryotic open reading frame is interrupted by introns, unlike the continuous prokaryotic one

## id
CON-FND-7E45E94A441771

## canonical_key
biochemistry.gene-structure.orf-interrupted-by-introns-eukaryotic

## aliases
Introns interrupt the eukaryotic open reading frame
Eukaryotic versus prokaryotic gene structure

## arabic_label


## arabic_aliases


## definition
Eukaryotic genes are typically split into coding exons interrupted by noncoding introns, so the open reading frame is discontinuous in the genomic DNA and must be reunited by RNA splicing (removing the introns) before a continuous, translatable open reading frame exists on the mature mRNA. Prokaryotic genes are essentially never interrupted this way — their open reading frame runs continuously from start to stop codon with no introns to remove. This structural difference is also why prokaryotic transcription and translation can happen simultaneously (coupled), while eukaryotic transcription in the nucleus must be completed, and the transcript spliced, before translation begins in the cytoplasm.

## explicit_objective
State that the eukaryotic open reading frame is interrupted by introns, requiring splicing, unlike the continuous prokaryotic open reading frame.

## pitfalls
Assuming any feature unique to eukaryotic gene expression (coupled transcription-translation, polycistronic mRNA, circular supercoiled DNA) also applies to eukaryotes; each of those three actually describes the prokaryotic pattern, and only the intron-interrupted open reading frame is the genuinely eukaryotic-specific feature among common exam distractors.

## concept_type
directly_taught_fact

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
Gene structure: introns and the eukaryotic open reading frame

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
ART-SCU-FBS103-BIO-DNA-REPLICATION-NUCLEOTIDE

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Biochemistry > Molecular Biology > Gene Structure and Expression

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q41 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following exists in eukaryotic genes but NOT in prokaryotic genes? ... The open reading frame is interrupted by introns" (FOMSCU Foundation 2 EOM MID 2026, Q41)

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
sourceCandidateIds: find-existing.mjs on "open reading frame interrupted by introns eukaryotic genes" and a grep -ril for "open reading frame" across docs/*-Source-Imports and docs/import-ready — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Chargaff's rule: adenine equals thymine and guanine equals cytosine in double-stranded DNA

## id
CON-FND-40504130316AEB

## canonical_key
biochemistry.dna-composition.chargaff-rule-gc-content-from-at

## aliases
Chargaff's base-pairing rule
Calculating GC content from AT percentage

## arabic_label


## arabic_aliases


## definition
By Chargaff's base-pairing rule, adenine (A) always pairs with thymine (T) and guanine (G) always pairs with cytosine (C) in double-stranded DNA, so the percentage of adenine equals the percentage of thymine, and the percentage of guanine equals the percentage of cytosine. Because the four bases together make up 100% of the DNA, knowing any one base's percentage lets the other three be calculated: if thymine is 30%, adenine is also 30% (A+T = 60%), leaving 40% split evenly between guanine and cytosine, so guanine alone is 20%. This arithmetic relationship is a direct structural consequence of the double helix's specific base pairing, not a coincidence of any one organism's genome composition.

## explicit_objective
Apply Chargaff's rule (%A = %T, %G = %C) to calculate guanine content from a given thymine percentage in double-stranded DNA.

## pitfalls
Confusing the combined G+C percentage (40% in the worked example) with guanine's own individual percentage (half of that, 20%) — the question asks for guanine alone, not guanine plus cytosine together.

## concept_type
directly_taught_fact

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
DNA composition: Chargaff's base-pairing rule

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
ART-SCU-FBS103-BIO-DNA-REPLICATION-NUCLEOTIDE

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Biochemistry > Molecular Biology > DNA Composition

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY Final 2025 Q19 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"If a double-stranded DNA molecule contains 30% thymine, what is the amount of guanine in this molecule? ... 20%" (FOMSCU Foundation 2 EOY Final 2025, Q19)

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
sourceCandidateIds: find-existing.mjs on the bare answer "20%" during S3 automated triage hit unrelated cardiac-filling and renal-tumour percentage records (a homonym collision on a generic number, per coverage/SCU-FBS103-triage.md's manual QA table). Re-queried here with the full Chargaff-rule phrase "double-stranded DNA thymine guanine content base pairing" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
A clinically significant portion of the body's vitamin K is produced by normal intestinal bacterial flora

## id
CON-FND-23AB2D963ED92A

## canonical_key
biochemistry.vitamin-k.gut-flora-synthesis-source

## aliases
Vitamin K bacterial source
Intestinal flora and vitamin K

## arabic_label


## arabic_aliases


## definition
Vitamin K is unusual among the fat-soluble vitamins in that a significant portion of what the body uses is produced by the normal bacterial flora of the large intestine, in addition to what is obtained from green leafy vegetables in the diet. This bacterial source is clinically important: newborns, whose gut has not yet been colonised by normal flora, and patients on prolonged broad-spectrum antibiotic therapy, whose normal flora has been suppressed, are both at particular risk of vitamin K deficiency and the resulting bleeding tendency. This bacterial-synthesis route distinguishes vitamin K from vitamins A, C and D, none of which are produced by gut flora.

## explicit_objective
State that a clinically significant portion of the body's vitamin K is produced by normal intestinal bacterial flora, distinguishing this source from vitamins A, C and D.

## pitfalls
Assuming vitamin K's only source is dietary (green leafy vegetables); the gut-flora contribution is clinically significant enough that its loss (in newborns, or after antibiotic therapy) is itself a recognised cause of deficiency.

## concept_type
directly_taught_fact

## status
under review

## subject
fnd

## topic
Biochemistry

## subtopic
Fat-soluble vitamins: vitamin K's bacterial source

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
ART-SCU-FBS103-BIO-DNA-REPLICATION-NUCLEOTIDE

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.6

## academic_relevance
0.7

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Biochemistry > Vitamins > Fat-Soluble Vitamins

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | Formative 2025 Q10 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following vitamins is primarily synthesized by the normal bacterial flora in the human intestine? ... Vitamin K" (FOMSCU Foundation 2 Formative 2025, Q10)

## merge_ids


## rejected_merge_candidate_ids
CON-HEM-BC9F1F59205EC7

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
sourceCandidateIds: find-existing.mjs on "vitamin K synthesized by intestinal bacterial flora" and a grep -ril for "vitamin K" plus "intestinal flora"/"gut flora"/"bacterial flora" across docs/*-Source-Imports and docs/import-ready surfaced CON-HEM-BC9F1F59205EC7 (Kasr 102-INT-physiology-concepts.md), whose definition mentions gut-flora synthesis in passing but whose own label and explicit_objective are about deficiency's effect on coagulation factors II/VII/IX/X and proteins C/S — a different specific tested fact from this stem's source-of-the-vitamin question. Read in full and rejected as a merge candidate, matching the same automated "live" false positive already logged in coverage/SCU-FBS103-triage.md (the warfarin/coumarin hit) for this same answer term.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Approximately 28-30 pairs of somites have formed by the end of the fourth week

## id
CON-DEV-D3847B540C0E93

## canonical_key
embryology.somitogenesis.28to30-pairs-by-fourth-week

## aliases
Somite count at four weeks
Embryo staging by somite number

## arabic_label


## arabic_aliases


## definition
Somites form in a craniocaudal sequence from paraxial mesoderm at a fairly constant rate of about three pairs per day, beginning around day 20. By the end of the fourth week, approximately 28 to 30 pairs of somites have formed. Because somite formation proceeds so regularly, embryologists use the somite count itself as one of the standard ways to stage (date) an embryo during the fourth week, alongside other criteria such as limb bud development.

## explicit_objective
State that approximately 28-30 pairs of somites have formed by the end of the fourth week, and that somite counting is used to stage the embryo.

## pitfalls
Confusing the fourth-week running total (28-30 pairs) with the eventual final total reached later in development (around 42-44 pairs, several of which subsequently regress); the two figures describe different timepoints.

## concept_type
directly_taught_fact

## status
under review

## subject
dev

## topic
Embryology

## subtopic
Fourth week: somite formation and embryo staging

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
ART-SCU-FBS103-DEV-WEEK3-4-COELOM-MESODERM

## related_article_ids


## related_concept_ids


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
SCU-FBS103 > Embryology > General Embryology > Fourth Week

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY Final 2025 Q9 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"By the end of the fourth week of embryonic development, approximately how many pairs of somites have formed? ... 28 to 30 pairs" (FOMSCU Foundation 2 EOY Final 2025, Q9)

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
sourceCandidateIds: find-existing.mjs on "28 to 30 pairs somites fourth week" surfaced 2 live hits (CON-DEV-9672802190D450 cervical somite count, CON-DEV-574EC65777DFF3 coccygeal somite count), both read and found to test region-specific somite counts, not this stem's total-by-fourth-week fact; not merge candidates, so not listed as rejected (different question shape entirely).
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The morula reaches the uterine cavity on approximately the fourth day after fertilization

## id
CON-DEV-8495EC8CE23F95

## canonical_key
embryology.first-week.morula-reaches-uterus-day4

## aliases
Morula transport timing
Day 4 of development

## arabic_label


## arabic_aliases


## definition
After fertilization in the ampulla of the uterine tube, the zygote undergoes cleavage divisions while being swept toward the uterus by tubal ciliary action and muscular contractions. By around the fourth day, the resulting solid ball of blastomeres — the morula — reaches the uterine cavity, where fluid begins to accumulate within it, marking the start of the transition toward the blastocyst stage. This four-day transit time places the morula's arrival roughly midway through the first week of development.

## explicit_objective
State that the morula typically reaches the uterine cavity on approximately the fourth day after fertilization.

## pitfalls
Confusing the morula's arrival in the uterine cavity (day 4) with implantation, which begins several days later (around day 6) once the blastocyst has formed and its trophoblast begins invading the endometrium.

## concept_type
directly_taught_fact

## status
under review

## subject
dev

## topic
Embryology

## subtopic
First week: morula transport to the uterine cavity

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
ART-SCU-FBS103-DEV-WEEK1-2-CLEAVAGE-BILAMINAR

## related_article_ids


## related_concept_ids
CON-DEV-CD3A7E5062F1BB | CON-DEV-C5B75FE3FD0D47

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Embryology > General Embryology > First Week

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q62 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Following fertilization, the morula typically reaches the uterine cavity on which day? ... 4th day" (FOMSCU Foundation 2 EOM MID 2026, Q62)

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
sourceCandidateIds: find-existing.mjs on "morula reaches uterine cavity 4th day fertilization" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Blastocyst formation is the defining event of the first week of human development

## id
CON-DEV-C5B75FE3FD0D47

## canonical_key
embryology.first-week.blastocyst-formation-defining-event

## aliases
First week milestones
Blastocyst formation timing

## arabic_label


## arabic_aliases


## definition
The first week of human development runs from fertilization through cleavage (the zygote dividing into blastomeres), morula formation, and finally blastocyst formation, in which fluid accumulates within the morula to create a fluid-filled cavity (the blastocele) separating an outer trophoblast layer from an inner cell mass (embryoblast). The week closes with the blastocyst beginning to implant into the endometrium. Blastocyst formation is therefore the single event most characteristic of the first week, distinguishing it from the bilaminar differentiation that defines the second week and the gastrulation that defines the third.

## explicit_objective
Identify blastocyst formation as the event that characterizes the first week of development, distinct from the second week's bilaminar differentiation and the third week's gastrulation.

## pitfalls
Assigning gastrulation, primitive streak formation, or bilaminar (epiblast/hypoblast) differentiation to the first week; each of those belongs to a later week (third, third, and second respectively), while blastocyst formation is the first week's own defining event.

## concept_type
directly_taught_fact

## status
under review

## subject
dev

## topic
Embryology

## subtopic
First week: blastocyst formation

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
ART-SCU-FBS103-DEV-WEEK1-2-CLEAVAGE-BILAMINAR

## related_article_ids


## related_concept_ids
CON-DEV-CD3A7E5062F1BB | CON-DEV-517FE336846466

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Embryology > General Embryology > First Week

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q60 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following major events characterizes the first week of human development? ... Blastocyst formation" (FOMSCU Foundation 2 EOM MID 2026, Q60)

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
sourceCandidateIds: find-existing.mjs on "blastocyst formation first week human development" surfaced 2 live hits (CON-OBS-6F13F7AB2C80C0 chorionic villi, CON-OBS-F3B46C8C137FA1 ectopic pregnancy), both read and found unrelated to this stem's own first-week-milestone question; not merge candidates.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Blastomeres are the cells formed immediately by cleavage of the zygote

## id
CON-DEV-CD3A7E5062F1BB

## canonical_key
embryology.cleavage.blastomeres-formed-by-mitosis

## aliases
Cleavage divisions
Zygote to blastomeres

## arabic_label


## arabic_aliases


## definition
Cleavage is the series of rapid mitotic divisions the zygote undergoes as it travels along the uterine tube, and each division produces progressively smaller daughter cells called blastomeres, packed within the same original zona pellucida. By around the third division, the blastomeres compact together to form the solid morula. Blastomeres are, by definition, the direct immediate product of cleavage, distinct from the trophoblast and epiblast/hypoblast cells that differentiate from them only later.

## explicit_objective
State that blastomeres are the cells produced immediately by the zygote's cleavage divisions, distinct from the later trophoblast and epiblast/hypoblast differentiation events.

## pitfalls
Naming trophoblast or epiblast cells as the immediate product of cleavage; both differentiate from blastomeres only after the morula has become a blastocyst, several developmental steps later.

## concept_type
directly_taught_fact

## status
under review

## subject
dev

## topic
Embryology

## subtopic
First week: cleavage and blastomere formation

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
ART-SCU-FBS103-DEV-WEEK1-2-CLEAVAGE-BILAMINAR

## related_article_ids


## related_concept_ids
CON-DEV-8495EC8CE23F95 | CON-DEV-B8D22B244F1E15

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Embryology > General Embryology > First Week

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q32 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following cells are formed immediately by the mitotic divisions (cleavage) of the zygote? ... Blastomeres" (FOMSCU Foundation 2 EOM MID 2026, Q32)

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
sourceCandidateIds: find-existing.mjs on "blastomeres cleavage mitotic division zygote" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The cranial neuropore closes around day 25, roughly two days before the caudal neuropore

## id
CON-DEV-2EB4FBC84DF414

## canonical_key
embryology.neurulation.cranial-neuropore-closes-day25

## aliases
Neural tube closure timing
Cranial neuropore closure

## arabic_label


## arabic_aliases


## definition
The neural tube closes in a zipper-like fashion, starting in the cervical (mid-embryonic) region around day 22 and extending both cranially and caudally from there. The cranial neuropore, the temporary opening at the rostral end of the still-unfused neural tube, closes around day 25. The caudal neuropore closes roughly two days later, around day 27-28, so the two neuropores' closure timings frame the window within which failure to close produces the corresponding neural tube defect (anencephaly for the cranial end, spina bifida for the caudal end).

## explicit_objective
State that the cranial neuropore closes around day 25, roughly two days before the caudal neuropore.

## pitfalls
Reversing which neuropore closes first; the cranial neuropore closes before the caudal one, both a few days after cervical-region fusion begins around day 22.

## concept_type
directly_taught_fact

## status
under review

## subject
dev

## topic
Embryology

## subtopic
Fourth week: neural tube closure timing

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
ART-SCU-FBS103-DEV-WEEK3-4-COELOM-MESODERM

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Embryology > General Embryology > Fourth Week

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY Final 2025 Q5 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"During embryonic development, the cranial neuropore typically closes around which day? ... Day 25" (FOMSCU Foundation 2 EOY Final 2025, Q5)

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
sourceCandidateIds: find-existing.mjs on "cranial neuropore closure day 25" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The second week of development is defined by the embryoblast's differentiation into epiblast and hypoblast

## id
CON-DEV-517FE336846466

## canonical_key
embryology.second-week.embryoblast-differentiates-epiblast-hypoblast

## aliases
Bilaminar disc formation
Week of twos

## arabic_label


## arabic_aliases


## definition
The second week is often called the week of twos: the trophoblast splits into cytotrophoblast and syncytiotrophoblast, and the embryoblast (inner cell mass) itself splits into two layers, the epiblast and the hypoblast, forming the bilaminar embryonic disc. This bilaminar-disc formation is the defining structural event of the second week. It sets up the platform on which gastrulation will act the following week, converting the bilaminar disc into a trilaminar one.

## explicit_objective
State that the second week of development is defined by the embryoblast's differentiation into the epiblast and hypoblast, forming the bilaminar disc.

## pitfalls
Assigning trilaminar germ disc formation (a third-week, gastrulation event) or morula formation (a first-week event) to the second week; the second week's own defining event is specifically the bilaminar (not trilaminar) disc.

## concept_type
directly_taught_fact

## status
under review

## subject
dev

## topic
Embryology

## subtopic
Second week: embryoblast differentiation into epiblast and hypoblast

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
ART-SCU-FBS103-DEV-WEEK1-2-CLEAVAGE-BILAMINAR

## related_article_ids


## related_concept_ids
CON-DEV-C5B75FE3FD0D47 | CON-DEV-42DB8406323467

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Embryology > General Embryology > Second Week

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q61 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The second week of human embryonic development is specifically characterized by the: ... Differentiation of the embryoblast into the epiblast and hypoblast" (FOMSCU Foundation 2 EOM MID 2026, Q61)

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
sourceCandidateIds: find-existing.mjs on "differentiation of embryoblast into epiblast and hypoblast second week" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Endoderm and splanchnic mesoderm together form the primitive gut tube

## id
CON-DEV-42DB8406323467

## canonical_key
embryology.third-week.endoderm-splanchnic-mesoderm-forms-primitive-gut

## aliases
Primitive gut tube formation
Splanchnic mesoderm and gut wall

## arabic_label


## arabic_aliases


## definition
As lateral folding brings the sides of the trilaminar disc together, the endoderm rolls up into a tube — the primitive gut — and the splanchnic (visceral) layer of the lateral plate mesoderm wraps around this endodermal tube from the outside. Endoderm becomes the gut's epithelial lining, while splanchnic mesoderm becomes its surrounding muscular and connective-tissue wall. This is distinct from somatic (parietal) mesoderm, which instead forms the body-wall side of the coelom rather than any part of the gut tube.

## explicit_objective
State that the primitive gut tube is formed from endoderm (lining) and splanchnic mesoderm (wall), distinguishing splanchnic from somatic mesoderm's role in the body wall.

## pitfalls
Pairing endoderm with somatic (rather than splanchnic) mesoderm; somatic mesoderm forms the body-wall side of the coelom (parietal peritoneum, abdominal wall), not the gut wall.

## concept_type
directly_taught_fact

## status
under review

## subject
dev

## topic
Embryology

## subtopic
Third week: endoderm and splanchnic mesoderm form the primitive gut

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
ART-SCU-FBS103-DEV-WEEK3-4-COELOM-MESODERM

## related_article_ids


## related_concept_ids
CON-DEV-65C2AEF8C5DB47 | CON-DEV-F103401B1603A1

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
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Embryology > General Embryology > Third Week

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY Final 2025 Q20 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which layers of the trilaminar germ disc are involved in the formation of the primitive gut? ... Endoderm and splanchnic mesoderm" (FOMSCU Foundation 2 EOY Final 2025, Q20)

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
sourceCandidateIds: find-existing.mjs on "endoderm splanchnic mesoderm primitive gut trilaminar" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Coalescing vacuoles within the extraembryonic mesoderm form the extraembryonic coelom (chorionic cavity)

## id
CON-DEV-35C976C7594D91

## canonical_key
embryology.second-week.extraembryonic-coelom-chorionic-cavity-formation

## aliases
Chorionic cavity formation
Extraembryonic coelom

## arabic_label


## arabic_aliases


## definition
During the second week, isolated fluid-filled spaces (vacuoles) appear within the extraembryonic mesoderm surrounding the amniotic and yolk-sac cavities. These vacuoles enlarge and coalesce into one large cavity, the extraembryonic coelom, also called the chorionic cavity, which comes to surround both the amniotic cavity and the primary/secondary yolk sac (except where they remain tethered by the connecting stalk). This coalescence of many small spaces into one large cavity is distinct from the amniotic cavity's own formation, which arises by cavitation within the epiblast rather than by coalescence of mesodermal vacuoles.

## explicit_objective
State that coalescing vacuoles within the extraembryonic mesoderm form the extraembryonic coelom (chorionic cavity), distinct from the amniotic cavity and primary yolk sac.

## pitfalls
Confusing the extraembryonic coelom's own formation mechanism (mesodermal vacuoles coalescing) with the amniotic cavity's mechanism (cavitation within the epiblast) or the primary yolk sac's mechanism (Heuser's membrane lining the blastocyst cavity) — each of the three cavities forms by a different specific process.

## concept_type
directly_taught_fact

## status
under review

## subject
dev

## topic
Embryology

## subtopic
Second week: extraembryonic coelom (chorionic cavity) formation

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
ART-SCU-FBS103-DEV-WEEK3-4-COELOM-MESODERM

## related_article_ids


## related_concept_ids
CON-DEV-7E6D5DD34BEFF7

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Embryology > General Embryology > Second Week

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q58 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The formation and joining of cavities within the extraembryonic mesoderm directly results in the formation of the: ... Extraembryonic coelom (Chorionic cavity)" (FOMSCU Foundation 2 EOM MID 2026, Q58)

## merge_ids


## rejected_merge_candidate_ids
CON-DEV-7E6D5DD34BEFF7

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
sourceCandidateIds: find-existing.mjs on "extraembryonic coelom chorionic cavity formation" and "extraembryonic coelom" surfaced CON-DEV-7E6D5DD34BEFF7 (live, kau, "Coelomic communication at disc margin"), read in full and found to test a different fact — that the caudal ends of the INTRAembryonic coelom communicate with the extraembryonic coelom at the disc margin, not this stem's own formation-by-coalescence question. Rejected as a merge candidate and linked as related instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The urogenital ridge, source of the urinary and genital systems, arises from intermediate mesoderm

## id
CON-DEV-F103401B1603A1

## canonical_key
embryology.mesoderm-differentiation.intermediate-mesoderm-forms-urogenital-ridge

## aliases
Intermediate mesoderm
Urogenital ridge origin

## arabic_label


## arabic_aliases


## definition
Trilaminar mesoderm organises, from medial to lateral, into paraxial mesoderm, intermediate mesoderm and lateral plate mesoderm. The intermediate mesoderm forms a longitudinal ridge, the urogenital ridge, running the length of the posterior body wall, and it gives rise to the components of both the urinary system (the nephrogenic cord and, eventually, the kidneys) and the genital system (the gonadal ridge). Its position between the paraxial and lateral plate columns is what places it correctly as the source of this specific ridge, distinguishing it from paraxial mesoderm (axial skeleton, skeletal muscle, dermis) and lateral plate mesoderm (body-wall and limb connective tissue, coelomic linings).

## explicit_objective
State that the urogenital ridge (source of the urinary and genital systems) arises from intermediate mesoderm, positioned between the paraxial and lateral plate columns.

## pitfalls
Assigning the urogenital ridge to paraxial or lateral plate mesoderm; those two columns give rise to the axial skeleton/muscle and the body-wall/coelomic linings respectively, not to the urinary or genital systems, which are the intermediate mesoderm's own specific contribution.

## concept_type
directly_taught_fact

## status
under review

## subject
dev

## topic
Embryology

## subtopic
Third week: intermediate mesoderm and the urogenital ridge

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
ART-SCU-FBS103-DEV-WEEK3-4-COELOM-MESODERM

## related_article_ids


## related_concept_ids
CON-DEV-42DB8406323467

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
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Embryology > General Embryology > Third Week

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY Final 2025 Q10 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The urogenital ridge, which gives rise to the urinary and genital systems, originates from the: ... Intermediate mesoderm" (FOMSCU Foundation 2 EOY Final 2025, Q10)

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
sourceCandidateIds: find-existing.mjs on "intermediate mesoderm urogenital ridge" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The umbilical vein becomes the ligamentum teres hepatis after birth

## id
CON-DEV-CC1CF93A090BEE

## canonical_key
embryology.fetal-circulation.ligamentum-teres-hepatis-from-umbilical-vein

## aliases
Round ligament of the liver
Postnatal fate of the umbilical vein

## arabic_label


## arabic_aliases


## definition
In the fetus, the single umbilical vein carries oxygenated, nutrient-rich blood from the placenta to the fetus, running within the falciform ligament to reach the liver. After birth, once placental flow stops, the umbilical vein closes off and fibroses into a solid fibrous cord — the ligamentum teres hepatis (round ligament of the liver) — which remains visible within the free edge of the falciform ligament in the adult. This is distinct from the postnatal fates of the paired umbilical arteries (medial umbilical ligaments), the urachus (median umbilical ligament) and the ductus venosus (ligamentum venosum), each of which is a separate fetal structure with its own separate adult remnant.

## explicit_objective
State that the umbilical vein becomes the ligamentum teres hepatis after birth, distinguishing it from the postnatal fates of the umbilical arteries, urachus and ductus venosus.

## pitfalls
Confusing the ligamentum teres hepatis (from the umbilical vein) with the ligamentum venosum (from the ductus venosus, the vessel that shunted umbilical-vein blood through the liver) — the two structures sit close together anatomically but derive from different fetal vessels.

## concept_type
directly_taught_fact

## status
under review

## subject
dev

## topic
Embryology

## subtopic
Fetal circulation: postnatal fate of the umbilical vein

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
ART-SCU-FBS103-DEV-FETAL-CIRCULATION-REMNANTS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Embryology > General Embryology > Fetal Circulation

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q33 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following structures represents the fate of the umbilical vein in the adult? ... Ligamentum teres hepatis" (FOMSCU Foundation 2 EOM MID 2026, Q33)

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
sourceCandidateIds: find-existing.mjs on "ligamentum teres hepatis umbilical vein fate" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The pericardial cavity forms from the part of the intraembryonic coelom lying cranial to the oropharyngeal membrane

## id
CON-DEV-7678BBFF8E1462

## canonical_key
embryology.third-week.pericardial-cavity-from-cranial-intraembryonic-coelom

## aliases
Pericardial cavity origin
Cranial coelom and the cardiogenic area

## arabic_label


## arabic_aliases


## definition
Before head folding, the horseshoe-shaped intraembryonic coelom has a part lying entirely cranial to the oropharyngeal membrane, in the region where the developing heart (the cardiogenic area) sits. As folding proceeds, this cranial portion of the coelom is carried ventrally along with the heart. It becomes the pericardial cavity, the space surrounding the developing heart, distinct from the stomodeum (a surface-ectoderm depression, not a coelomic space) and the cranial foregut (endoderm-lined gut tube that the coelom surrounds rather than becomes).

## explicit_objective
State that the part of the intraembryonic coelom lying cranial to the oropharyngeal membrane becomes the pericardial cavity.

## pitfalls
Confusing the coelomic space itself (which becomes the pericardial cavity) with the structures it surrounds or sits near (the stomodeum, the oral cavity, the cranial foregut) — those are different germ-layer derivatives, not fates of the coelom.

## concept_type
directly_taught_fact

## status
under review

## subject
dev

## topic
Embryology

## subtopic
Third week: pericardial cavity from the cranial intraembryonic coelom

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
ART-SCU-FBS103-DEV-WEEK3-4-COELOM-MESODERM

## related_article_ids


## related_concept_ids
CON-DEV-65C2AEF8C5DB47

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
0.9

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Embryology > General Embryology > Third Week

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q30 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The intraembryonic coelom located completely cranial to the oropharyngeal membrane eventually becomes the: ... Pericardial cavity" (FOMSCU Foundation 2 EOM MID 2026, Q30)

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
sourceCandidateIds: find-existing.mjs on "pericardial cavity" surfaced docs/Assiut-Source-Imports/concept/AUN-PMS-102-concepts.md (head-folding movement of the septum transversum/heart/pericardial cavity as a group) and docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md (pericardiocentesis needle-entry anatomy); both read in full and found to test different specific facts from this stem's own coelom-fate question, matching the false-positive judgement already logged for this term in coverage/SCU-FBS103-triage.md. Not merge candidates (unrelated facts, not near-misses on the same fact).
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Fibrous and protoplasmic astrocytes differ in process shape and white-versus-grey-matter location

## id
CON-NEU-1B7B4BA87B29B2

## canonical_key
histology.astrocytes.fibrous-vs-protoplasmic-morphology

## aliases
Astrocyte types
Fibrous versus protoplasmic astrocyte

## arabic_label


## arabic_aliases


## definition
Fibrous astrocytes, found predominantly in white matter, have long, thin, sparsely branched processes that run between axon bundles and contact blood vessels and the pial surface. Protoplasmic astrocytes, concentrated in grey matter, have abundant cytoplasm and short, thick processes that branch extensively (a bushy appearance), suited to their many contacts with neuronal cell bodies, dendrites and synapses. Both types contain the intermediate filament GFAP (glial fibrillary acidic protein), just in different relative abundance — fibrous astrocytes show it more prominently — so the defining contrast between the two is process shape and location, not the presence or absence of GFAP.

## explicit_objective
Distinguish fibrous astrocytes (white matter; long, thin, unbranched processes) from protoplasmic astrocytes (grey matter; short, thick, branched processes) by their process morphology and location.

## pitfalls
Reversing the two locations (white versus grey matter) or claiming one type lacks intermediate filaments entirely; both types express GFAP, just to differing degrees, and it is process shape plus location — not filament presence — that distinguishes them.

## concept_type
directly_taught_fact

## status
under review

## subject
neuro

## topic
Histology

## subtopic
Neuroglia: fibrous versus protoplasmic astrocyte morphology

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
ART-SCU-FBS103-HIS-NEUROGLIA-NERVE-SHEATHS

## related_article_ids


## related_concept_ids
CON-NEU-93CD087BDE3F7B

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
SCU-FBS103 > Histology > Nervous Tissue > Neuroglia

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY Final 2025 Q12 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the main morphological difference between fibrous and protoplasmic astrocytes? ... Fibrous astrocytes have long, thin, unbranched processes" (FOMSCU Foundation 2 EOY Final 2025, Q12); "Protoplasmic astrocytes differ from fibrous astrocytes primarily in having: ... Abundant cytoplasm and short thick branched processes" (FOMSCU Foundation 2 EOM MID 2026, Q23)

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
sourceCandidateIds: find-existing.mjs on "fibrous astrocyte" and "astrocyte" — the "astrocyte" query surfaced Ain Shams's own CNS-3 astrocyte-function records (blood-brain barrier, GLUT1 glucose uptake), read and found to test different specific facts (astrocyte function, not the fibrous/protoplasmic morphology contrast this stem tests); not merge candidates.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
questionMapping: One concept covers both fbs103b-q18 (fibrous, "long thin unbranched") and fbs103b-q19 (protoplasmic, "abundant cytoplasm short thick branched") — the two questions test the same comparative fact from opposite framings.

---

# Item

## label
The epineurium is the outermost connective tissue layer surrounding an entire peripheral nerve trunk

## id
CON-NEU-81402D876C77D5

## canonical_key
histology.peripheral-nerve.epineurium-surrounds-whole-trunk

## aliases
Peripheral nerve connective tissue layers
Epineurium

## arabic_label


## arabic_aliases


## definition
Peripheral nerve connective tissue is organised in three concentric layers: endoneurium, a thin layer of loose connective tissue surrounding each individual nerve fibre; perineurium, a specialised sleeve wrapping each fascicle (bundle of nerve fibres); and epineurium, the outermost and thickest layer, a dense irregular connective tissue that surrounds and binds together the entire nerve trunk — all its fascicles plus the blood vessels running with them. This outermost, whole-trunk position is what distinguishes the epineurium from the fascicle-level perineurium and the fibre-level endoneurium.

## explicit_objective
Name the epineurium as the outermost connective-tissue layer surrounding an entire peripheral nerve trunk, distinguishing it from the perineurium (fascicle) and endoneurium (individual fibre) layers.

## pitfalls
Confusing epineurium with perineurium; perineurium wraps each individual fascicle, one layer inward from the epineurium, which wraps the whole trunk containing all the fascicles together.

## concept_type
directly_taught_fact

## status
under review

## subject
neuro

## topic
Histology

## subtopic
Peripheral nerve: the three connective-tissue sheath layers

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
ART-SCU-FBS103-HIS-NEUROGLIA-NERVE-SHEATHS

## related_article_ids


## related_concept_ids


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
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Histology > Nervous Tissue > Peripheral Nerve

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q54 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The dense connective tissue sheath that surrounds and covers the entire nerve trunk is called the: ... Epineurium" (FOMSCU Foundation 2 EOM MID 2026, Q54)

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
sourceCandidateIds: find-existing.mjs on "epineurium" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
A direct (monoxenous) life cycle completes entirely within a single host species

## id
CON-GIT-D76A567284E40B

## canonical_key
parasitology.life-cycles.direct-cycle-single-host-definition

## aliases
Monoxenous life cycle
Direct versus indirect life cycle

## arabic_label


## arabic_aliases


## definition
A direct (monoxenous) life cycle is one in which the parasite completes its entire development, from infective stage to reproductively mature adult, within a single host species, with no intermediate host required — transmission passes straight from one definitive host to the next. This is the defining feature separating a direct cycle from an indirect (heteroxenous) one, which needs one or more intermediate hosts along the way. This distinction is foundational parasitology terminology used to classify essentially every parasite's transmission pattern.

## explicit_objective
Define a direct (monoxenous) life cycle as one completed within a single host, distinguishing it from an indirect cycle requiring an intermediate host.

## pitfalls
Confusing "direct life cycle" with a paratenic host (a transport host in which no development occurs) or a free-living stage (no host at all); neither of those concepts is what "direct" refers to — it specifically means single-host completion without an intermediate host.

## concept_type
directly_taught_fact

## status
under review

## subject
inf

## topic
Parasitology

## subtopic
Basic terminology: direct (monoxenous) versus indirect life cycles

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
ART-SCU-FBS103-PAR-LIFE-CYCLES-TERMINOLOGY

## related_article_ids


## related_concept_ids
CON-GIT-2FCF45AE17574F

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
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Parasitology > General Parasitology > Life Cycle Terminology

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q35 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the life cycle of a parasite that needs only one host? ... Direct life cycle" (FOMSCU Foundation 2 EOM MID 2026, Q35)

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
sourceCandidateIds: find-existing.mjs on "direct life cycle one host" and "direct life cycle one host parasite" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Heterophyes heterophyes eggs are characteristically golden-brown

## id
CON-GIT-CA7E5195BF5F65

## canonical_key
parasitology.heterophyes.egg-color-golden-brown

## aliases
Heterophyes heterophyes egg identification
Golden-brown trematode eggs

## arabic_label


## arabic_aliases


## definition
Heterophyes heterophyes, the smallest trematode infecting humans, produces very small, operculated eggs measuring only about 30 by 15 micrometres. These eggs carry a characteristic golden-brown shell colour, a feature used alongside their small size to identify them on stool microscopy and distinguish them from the eggs of other intestinal flukes.

## explicit_objective
State that Heterophyes heterophyes eggs are characteristically golden-brown, a feature used with their small size to identify them on stool microscopy.

## pitfalls
Assuming all trematode eggs share one uniform colour; golden-brown is specific to Heterophyes heterophyes among the common exam distractors and, combined with its unusually small size, is what allows the two features together to identify the species.

## concept_type
directly_taught_fact

## status
under review

## subject
inf

## topic
Parasitology

## subtopic
Trematodes: Heterophyes heterophyes egg identification

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
ART-SCU-FBS103-PAR-LIFE-CYCLES-TERMINOLOGY

## related_article_ids


## related_concept_ids
CON-GIT-E20B95815074E4

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
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Parasitology > Trematodes > Heterophyes heterophyes

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q4 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the characteristic color of Heterophyes heterophyes eggs? ... Golden brown" (FOMSCU Foundation 2 EOM MID 2026, Q4)

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
sourceCandidateIds: find-existing.mjs on "golden brown" — 0 hits. find-existing.mjs on "heterophyes" surfaced 44 records (Assiut/Helwan lanes) about distribution, host, size, complications, treatment and diagnosis of Heterophyes heterophyes, none about egg colour specifically; not merge candidates.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Malacology is the scientific study of molluscs and snails

## id
CON-GIT-E77362A9C0FFFC

## canonical_key
parasitology.terminology.malacology-study-of-molluscs

## aliases
Study of molluscs
Snail-borne intermediate hosts

## arabic_label


## arabic_aliases


## definition
Malacology is the scientific study of molluscs, including the freshwater and brackish-water snails that serve as essential intermediate hosts for many medically important trematodes (flukes), such as Schistosoma species and Fasciola. In parasitology, malacological surveys of local snail populations are a standard tool for tracking and controlling the transmission of these fluke infections. This distinguishes malacology from entomology (the study of insects), mycology (fungi) and helminthology (worms), each a separate discipline within parasitology's broader scope.

## explicit_objective
Define malacology as the study of molluscs and snails, distinguishing it from entomology (insects), mycology (fungi) and helminthology (worms).

## pitfalls
Confusing malacology with entomology or helminthology; malacology specifically studies the mollusc/snail intermediate hosts, a discipline separate from (though closely linked to) the study of the parasites those snails carry.

## concept_type
directly_taught_fact

## status
under review

## subject
inf

## topic
Parasitology

## subtopic
Basic terminology: malacology as the study of molluscs and snails

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
ART-SCU-FBS103-PAR-LIFE-CYCLES-TERMINOLOGY

## related_article_ids


## related_concept_ids


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
SCU-FBS103 > Parasitology > General Parasitology > Life Cycle Terminology

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY Final 2025 Q7 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In the context of parasitology, the term malacology refers to the scientific study of: ... Molluscs and snails" (FOMSCU Foundation 2 EOY Final 2025, Q7)

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
sourceCandidateIds: find-existing.mjs on "malacology" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Parasitic infection and infestation are distinguished by the parasite's site of living in the host

## id
CON-GIT-9D0CDFBC5FAF24

## canonical_key
parasitology.terminology.infection-vs-infestation-site-of-living

## aliases
Infection versus infestation
Internal versus external parasite site

## arabic_label


## arabic_aliases


## definition
By convention, "infection" is used for parasites (or microorganisms) that live inside the host's tissues or internal organs — for example intestinal or blood parasites — while "infestation" is reserved for parasites living on the external body surface or in superficial body cavities, such as lice, mites or ticks on the skin. The site of living within versus on the host is the primary distinguishing factor between the two terms. Neither the parasite's life-cycle duration, the disease severity it produces, nor its mode of reproduction determines which term applies.

## explicit_objective
Distinguish parasitic infection (internal tissues/organs) from infestation (external surface/superficial cavities) by the parasite's site of living in the host.

## pitfalls
Assuming infection versus infestation is a matter of disease severity ("infestation" sounding worse than "infection," or vice versa); the actual distinguishing factor is strictly the site of living (internal versus external/superficial), not severity.

## concept_type
directly_taught_fact

## status
under review

## subject
inf

## topic
Parasitology

## subtopic
Basic terminology: infection versus infestation

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
ART-SCU-FBS103-PAR-LIFE-CYCLES-TERMINOLOGY

## related_article_ids


## related_concept_ids


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
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Parasitology > General Parasitology > Life Cycle Terminology

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q5 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The distinction between a parasitic infection and an infestation is primarily based on which of the following factors? ... Their site of living in the host" (FOMSCU Foundation 2 EOM MID 2026, Q5)

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
sourceCandidateIds: find-existing.mjs on "infestation" surfaced 4 records (live house-dust-mite detection, Ain Shams pediculosis-vs-flea-infestation alias), read and found unrelated to this stem's own definitional infection-versus-infestation question; not merge candidates.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Nicotinic (Nn) receptors mediate transmission at the autonomic ganglion synapse

## id
CON-FND-AA5799FC98B2D4

## canonical_key
pharmacology.receptors.nicotinic-in-autonomic-ganglia

## aliases
Ganglionic nicotinic receptors
Autonomic ganglion synapse

## arabic_label


## arabic_aliases


## definition
In both the sympathetic and parasympathetic divisions of the autonomic nervous system, the preganglionic fibre releases acetylcholine onto the postganglionic neuron's cell body within the ganglion, and this ganglionic synapse is mediated by nicotinic (specifically Nn, neuronal-type nicotinic) receptors. This holds regardless of which division the ganglion belongs to, which is why nicotinic receptor blockade (ganglionic blockade) affects both sympathetic and parasympathetic transmission at once. This contrasts with muscarinic receptors, which mediate transmission at the postganglionic parasympathetic (and sympathetic sweat gland) target organ, not at the ganglion itself.

## explicit_objective
State that nicotinic (Nn) receptors mediate the preganglionic-to-postganglionic synapse in both sympathetic and parasympathetic ganglia, distinct from the muscarinic and adrenergic receptors found at postganglionic target organs.

## pitfalls
Confusing the ganglionic (nicotinic) synapse with the postganglionic target-organ synapse (muscarinic for parasympathetic targets, adrenergic for sympathetic targets) — the receptor type differs at each of these two synaptic stages.

## concept_type
directly_taught_fact

## status
under review

## subject
pharm

## topic
Pharmacology

## subtopic
Cholinergic receptors: nicotinic receptors at the autonomic ganglion

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
ART-SCU-FBS103-PHARM-RECEPTORS-ADR-CLASSIFICATION

## related_article_ids


## related_concept_ids
CON-FND-4388E0D8A75FD4

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
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Pharmacology > General Pharmacology > Cholinergic Receptors

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY Final 2025 Q16 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which type of cholinergic receptors is predominantly located in the ganglia of the sympathetic nervous system? ... Nicotinic receptors" (FOMSCU Foundation 2 EOY Final 2025, Q16)

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
sourceCandidateIds: find-existing.mjs on "nicotinic receptors sympathetic ganglia" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Type B (bizarre) adverse drug reactions are unpredictable, non-dose-related idiosyncratic or immunological effects

## id
CON-FND-6F98091A586CF3

## canonical_key
pharmacology.adverse-drug-reactions.type-b-bizarre-idiosyncratic

## aliases
Idiosyncratic adverse drug reaction
Bizarre (Type B) reaction

## arabic_label


## arabic_aliases


## definition
Type B (bizarre) adverse drug reactions are unpredictable and not related to the drug's known pharmacological action or dose. They occur only in susceptible individuals, often on an immunological or genetic (idiosyncratic) basis, such as a penicillin allergy or a genetically determined enzyme deficiency causing an abnormal drug response. Because they cannot be predicted from the drug's normal pharmacology, they are termed "bizarre," distinguishing them from the dose-related, predictable Type A reactions.

## explicit_objective
Classify an unpredictable, non-dose-related adverse drug reaction (immunological or idiosyncratic) as Type B (bizarre), distinguishing it from the predictable, dose-related Type A reaction.

## pitfalls
Confusing Type B with Type A (augmented, a predictable exaggeration of the drug's known action) or with Type C (continuous, a cumulative effect of chronic dosing) — Type B is specifically the unpredictable, non-dose-related category.

## concept_type
directly_taught_fact

## status
under review

## subject
pharm

## topic
Pharmacology

## subtopic
Adverse drug reactions: Type B (bizarre/idiosyncratic) classification

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
ART-SCU-FBS103-PHARM-RECEPTORS-ADR-CLASSIFICATION

## related_article_ids


## related_concept_ids
CON-FND-05FF1011EFFE2A

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
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Pharmacology > General Pharmacology > Adverse Drug Reactions

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q16 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following types of adverse drug reactions is best described as a bizarre or idiosyncratic reaction? ... Type B (Bizarre)" (FOMSCU Foundation 2 EOM MID 2026, Q16)

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
sourceCandidateIds: find-existing.mjs on "type B bizarre adverse drug reaction" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Type E (end of dose) adverse drug reactions are withdrawal effects appearing when a drug is abruptly stopped

## id
CON-FND-05FF1011EFFE2A

## canonical_key
pharmacology.adverse-drug-reactions.type-e-end-of-dose-withdrawal

## aliases
Withdrawal reaction (Type E)
End-of-dose adverse effect

## arabic_label


## arabic_aliases


## definition
Type E (end of dose) adverse drug reactions occur when a drug is stopped abruptly after the body has adapted physiologically to its continuous presence. Withdrawal syndromes, such as those seen with opioids, benzodiazepines or corticosteroids, are the classic example. The body's compensatory adaptations, built up during continuous use, are suddenly left unopposed once the drug is removed, producing the rebound withdrawal effect.

## explicit_objective
Classify a withdrawal syndrome appearing on drug discontinuation as a Type E (end of dose) adverse drug reaction, distinguishing it from Types A, B and C.

## pitfalls
Confusing Type E with Type A (augmented, an effect that occurs while the drug is still being given, not after stopping it); Type E is specifically defined by its timing at drug discontinuation.

## concept_type
directly_taught_fact

## status
under review

## subject
pharm

## topic
Pharmacology

## subtopic
Adverse drug reactions: Type E (end of dose/withdrawal) classification

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
ART-SCU-FBS103-PHARM-RECEPTORS-ADR-CLASSIFICATION

## related_article_ids


## related_concept_ids
CON-FND-6F98091A586CF3

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
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Pharmacology > General Pharmacology > Adverse Drug Reactions

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q46 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The withdrawal manifestations experienced by an addicted patient upon stopping a drug are an example of which type of adverse drug reaction? ... Type E (End of dose) adverse effect" (FOMSCU Foundation 2 EOM MID 2026, Q46)

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
sourceCandidateIds: find-existing.mjs on "end of dose adverse effect withdrawal" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
