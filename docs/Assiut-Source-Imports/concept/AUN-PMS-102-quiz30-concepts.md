<!--
  AUN-PMS-102 -- new concepts minted from "All quizzes PMS.pdf" (Moodle
  attempt-review export, _Telegram 64 Newer), pp.108-169 dispatch, per
  coverage/AUN-PMS-102-triage.md. This page range is NOT one undivided
  Quiz 30 as originally briefed: pp.108-112 is Quiz 30 (Chromosome Theory
  of Inheritance, only 13 items), and pp.114-169 is a run of nine further
  per-lecture quizzes (Quiz 41-42 implantation/2nd week, Quiz 43 cartilage,
  Quiz 44-45 bone, Quiz 46 gastrulation/notochord, Quiz 47 duplicate
  trophoblast material, Quiz 48 embryonic period/neurulation, Quiz 49
  ectodermal derivatives/neural crest, Quiz 50 mesodermal derivatives) --
  see coverage/AUN-PMS-102-triage.md's "Source (b), pp.108-169" section for
  the corrected page map. The seed cluster key `pmsquiz30` is kept as
  briefed for continuity with the ledger/triage-keys.txt naming, covering
  this whole page range in one authoring pass. Every canonical_key below
  was confirmed NEW by find-existing.mjs (live state + every
  docs/*-Source-Imports root + docs/import-ready), with several full-text
  checks against hit bodies, before minting -- see
  coverage/AUN-PMS-102-triage.md's "Concept search notes (pp.108-169
  pass)" for the search log. This source has no matching department
  lecture deck in the corpus -- teaching text is drawn from the quiz
  stems, cross-checked against standard undergraduate embryology and
  genetics teaching (Sadler/Langman's, Moore's Before We Are Born).

  Two live concepts are reused directly for the Quiz 41-42 clinical
  vignettes (ectopic pregnancy, placenta previa) rather than minted new;
  the two sparse UPDATE records at the end of this file add only the
  `modules`/`universities`/`learner_years` tags this module needs, per
  the record-6-8 pattern in docs/Kasr-Source-Imports/concept/103-BMS-
  histology-concepts.md. `medical:batch` will report these two records as
  missing fields; `medical:simulate` is what proves them (created: 0,
  updated: 2).

  Import: Admin > Concepts import.
-->

# Item

## id
CON-DEV-2DD11749B30811

## label
Primordial germ cells contain 46 single-strand chromosomes, unlike the duplicated chromosomes of meiotic prophase

## canonical_key
embryology.genetics.pgc-chromosome-number

## aliases
Primordial germ cell chromosome number
46 single chromosomes

## arabic_label
العدد الكروموسومي للخلايا الجرثومية البدائية

## arabic_aliases
الخلايا الجرثومية البدائية

## definition
Primordial germ cells (PGCs) are diploid cells with the same somatic chromosome number as other body cells: 46 single-strand (unreplicated) chromosomes, not 23 duplicated strands. They arise in the wall of the yolk sac and migrate to the gonadal ridges, where they proliferate by ordinary mitosis before meiosis begins; only after meiotic S-phase and the first meiotic division do their descendants become haploid, and only within a given meiotic prophase do their chromosomes carry duplicated (double-strand) chromatids. Confusing a PGC's baseline 46 single-strand chromosome number with the 23 double-strand chromosomes of a primary spermatocyte or oocyte arrested in meiotic prophase is the standard exam trap this fact guards against.

## explicit_objective
State that primordial germ cells contain 46 single-strand chromosomes, distinguishing this from the duplicated-chromosome counts seen later in meiotic prophase.

## pitfalls
Assuming any germ-line cell must already show a reduced or duplicated chromosome number. Primordial germ cells are ordinary diploid cells before meiosis begins; the halving and duplication both happen later, in the primary spermatocyte/oocyte and beyond.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Genetics

## subtopic
Chromosome Theory of Inheritance

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-CHROMOSOME-THEORY

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.1

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The primordial germ cells contain: a. 23 double strand chromosomes. b. 23 single strand chromosomes. c. 46 single chromosomes d. none of the above." (Quiz 30 Q9)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "primordial germ cell" -- 4 hits, all this lane's own pp.34-64 concept/question on PGC *formation site* (yolk sac), a different fact from this record's chromosome-count claim; no merge. Also checked "haploid" (live CON-DEV-B2A947014AE180, a matching-style "identify the haploid cell" assessment stub, different question family) and "meiosis prophase crossing over" (0 hits) -- no merge either way.

---

# Item

## id
CON-DEV-C480AF6C596002

## label
Synapsis and crossing over occur during prophase of the first meiotic division

## canonical_key
embryology.genetics.crossing-over-prophase-meiosis-i

## aliases
Synapsis
Crossing over
Prophase of meiosis I

## arabic_label
الاقتران والعبور الكروموسومي في الطور التمهيدي للانقسام الاختزالي الأول

## arabic_aliases
العبور الكروموسومي

## definition
Synapsis is the pairing of homologous chromosomes, and crossing over is the reciprocal exchange of chromosomal segments between them; both take place during prophase of the first meiotic division (meiosis I), specifically within its pachytene sub-stage, not during prophase of meiosis II or of mitosis. By the time meiosis II begins, the chromosomes are already segregated to haploid sets and there are no longer homologous pairs available to synapse, so no synapsis or crossing over occurs there. Mitotic prophase likewise involves no pairing of homologues, since mitosis produces genetically identical daughter cells rather than the genetically varied gametes crossing over is for.

## explicit_objective
State that synapsis and crossing over are events of prophase of the first, not the second, meiotic division, and that neither occurs in mitosis.

## pitfalls
Placing crossing over in meiosis II because it "sounds like" the reduction division. Homologous pairing is only possible while homologous pairs still exist, which is true in meiosis I and no longer true once meiosis II begins.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Genetics

## subtopic
Chromosome Theory of Inheritance

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-CHROMOSOME-THEORY

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.85

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Synapsis and Crossing over occurs in: a. prophase of second meiosis. b. none of the above. c. prophase of first meiosis d. prophase of mitosis." (Quiz 30 Q10)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "crossing over" -- 9 hits, all Kasr 104-CPS meiosis-overview concepts stating crossing over happens "during meiosis" without naming the specific prophase sub-stage this record states; no merge (different, less specific claim).

---

# Item

## id
CON-DEV-7D289CE1CADBC4

## label
Ploidy refers to the number of chromosomes present in each cell

## canonical_key
embryology.genetics.ploidy-definition

## aliases
Ploidy
Definition of ploidy

## arabic_label
تعريف مصطلح العدد الصبغي (Ploidy)

## arabic_aliases
العدد الصبغي

## definition
Ploidy is the term for the number of complete chromosome sets, and by extension the number of chromosomes, present in a cell -- for example diploid (46, two sets) in somatic cells or haploid (23, one set) in mature gametes. It is not a measure of the amount of DNA per cell (which changes with replication even when chromosome number does not), the number of ribosomes, or the number of nuclei, each of which is a separate cellular property. An abnormal ploidy state, such as triploidy or aneuploidy, is defined by a change in chromosome number, which is exactly what the term describes.

## explicit_objective
Define ploidy as the number of chromosomes per cell, distinguishing it from DNA content, ribosome number and nuclear number.

## pitfalls
Treating ploidy and DNA content as interchangeable. A cell in G2 or in meiotic prophase I has double the DNA of a G1 cell at the same ploidy, since ploidy counts chromosomes, not DNA mass.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Genetics

## subtopic
Chromosome Theory of Inheritance

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-CHROMOSOME-THEORY

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.1

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Ploidy refers to: a. number of ribosomes in each cell. b. amount of DNA in each cell. c. number of chromosomes in each cell. d. number of nuclei in each cell." (Quiz 30 Q12)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "ploidy" -- 10 hits, all Kasr 104-CPS/Ain Shams ASU-MBG euploidy/aneuploidy concepts (numerical chromosomal *aberration*), a different, narrower fact from this record's plain definition; no merge.

---

# Item

## id
CON-DEV-0B6BDC498E15FC

## label
Gametes contain a haploid number of chromosomes

## canonical_key
embryology.genetics.gamete-haploid-number

## aliases
Haploid gametes
Chromosome number of gametes

## arabic_label
العدد الصبغي الفردي (الهابلويد) في الأمشاج

## arabic_aliases
الأمشاج

## definition
Mature gametes (the ovum and the spermatozoon) each carry a haploid number of chromosomes -- 23 in humans -- half the diploid somatic number of 46, produced by the two meiotic divisions. This halving is what restores the diploid number at fertilisation, when a haploid sperm and a haploid ovum fuse to form a diploid zygote. Gametes never carry the full diploid complement, and they are not restricted to "only sex chromosomes" without any autosomes, which is why both of those distractors are wrong.

## explicit_objective
State that mature gametes carry a haploid, not a diploid, chromosome number, and that this is not limited to the sex chromosomes alone.

## pitfalls
Reading "haploid" as meaning "sex chromosomes only". A haploid gamete carries one full set of 23 chromosomes -- 22 autosomes plus one sex chromosome -- not merely a sex chromosome on its own.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Genetics

## subtopic
Chromosome Theory of Inheritance

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-CHROMOSOME-THEORY

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.1

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Gametes contains? a. haploid number of chromosomes. b. diploid number of chromosomes. c. only sex chromosomes. d. none of the above." (Quiz 30 Q13)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "haploid" -- live CON-DEV-B2A947014AE180 ("Identify cells with a haploid chromosome number") read in full: it is a matching-style assessment-objective stub for a different question family (which listed cell is haploid), cross-linked in its own record as related to a diploid-side sibling but not stating this record's plain "gametes are haploid" fact; no merge.

---

# Item

## id
CON-DEV-033AEEC489096D

## label
A fertilized ovum undergoes implantation at the blastocyst stage

## canonical_key
embryology.implantation.blastocyst-stage

## aliases
Stage of implantation
Blastocyst implantation

## arabic_label
انغراس الكيسة الأريمية

## arabic_aliases
الكيسة الأريمية

## definition
Implantation, the embedding of the conceptus into the endometrium, occurs once the conceptus has reached the blastocyst stage, roughly six days after fertilisation, not at the earlier 2-cell, 4-cell or morula stages. The blastocyst is the first stage at which the conceptus has differentiated into the structures implantation requires: an inner cell mass (the future embryo) and an outer trophoblast layer, whose outer syncytiotrophoblast is what actually invades the endometrial stroma. The gastrula stage, by contrast, is a later, post-implantation stage of the second-to-third week, not the stage at which implantation itself begins.

## explicit_objective
State that implantation begins at the blastocyst stage, distinguishing it from the earlier cleavage stages and the later gastrula stage.

## pitfalls
Assuming implantation happens as soon as a "solid ball" of cells (morula) reaches the uterus. The morula still needs to form a fluid-filled cavity and differentiate into inner cell mass and trophoblast -- becoming a blastocyst -- before implantation can begin.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Implantation and the Second Week

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-IMPLANTATION-2NDWEEK

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.85

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"At which stage of development does a fertilized ovum undergo implantation? a. 4-cell stage b. Blastocyst c. 2-cell stage d. Gastrula e. Morula" (Quiz 41-42 Q1, repeated Q25/Q26)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "blastocyst implantation" and "inner cell mass" -- 0 hits either way, safe to create.

---

# Item

## id
CON-DEV-6B6F35FF432C00

## label
Blastocyst implantation requires a progestational, functionally active endometrium and an intact trophoblast, but not the zona pellucida

## canonical_key
embryology.implantation.requirements-except-zona-pellucida

## aliases
Requirements for implantation
Zona pellucida shedding before implantation

## arabic_label
متطلبات انغراس الكيسة الأريمية

## arabic_aliases
غشاء الشفافة (زونا بيلوسيدا)

## definition
Successful blastocyst implantation depends on the endometrium being in its progestational (secretory) phase, the presence of an intact functional layer of the endometrium for the blastocyst to invade, and a differentiated trophoblast providing both the invasive syncytiotrophoblast and the underlying cytotrophoblast. The zona pellucida, by contrast, is required earlier -- to prevent polyspermy at fertilisation and to keep the dividing blastomeres from sticking prematurely to the tubal wall -- but it is shed ("hatching") before the blastocyst contacts the endometrium, so it plays no role in implantation itself. Listing the zona pellucida as a requirement for implantation reverses its actual developmental timing.

## explicit_objective
List the endometrial and trophoblastic requirements for implantation, and explain why the zona pellucida is not one of them.

## pitfalls
Assuming a structure needed earlier in development must still be present later. The zona pellucida's protective role ends with "hatching", well before the blastocyst is competent to implant.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Implantation and the Second Week

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-IMPLANTATION-2NDWEEK

## related_article_ids

## related_concept_ids
CON-DEV-033AEEC489096D

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"All of the following structures are necessary for blastocyst implantation EXCEPT? a. Endometrium in progestational phase b. Functional layer of endometrium c. Syncytiotrophoblast d. Zona pellucida e. Cytotrophoblast" (Quiz 41-42 Q2, repeated Q27)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "zona pellucida" -- live GYN follicle/corona-radiata concepts and pending 101-ISK/AU-MED-102 fertilisation concepts read; all cover the zona's fertilisation-stage role (polyspermy block, blastomere protection), none state this record's implantation-requirements-EXCEPT fact; no merge.

---

# Item

## id
CON-DEV-E58D1D5C25DB69

## label
The inner cell mass (embryoblast) of the blastocyst gives rise to the embryo proper

## canonical_key
embryology.implantation.inner-cell-mass-embryo-proper

## aliases
Inner cell mass
Embryoblast

## arabic_label
الكتلة الخلوية الداخلية (الجنين البدائي)

## arabic_aliases
الأرومة الجنينية

## definition
The blastocyst is organised into two populations: an outer trophoblast, which forms the fetal contribution to the placenta and fetal membranes, and an inner cell mass (embryoblast), a cluster of cells at one pole of the blastocyst cavity that gives rise to the embryo proper, including all three germ layers formed at gastrulation. The "outer cell mass" is not a standard term for a distinct third population; it is the trophoblast itself viewed from outside. Neither the ectoderm nor the endoderm exists yet at the blastocyst stage -- both differentiate later, from the inner cell mass, once it has organised into the bilaminar embryonic disc.

## explicit_objective
Identify the inner cell mass (embryoblast) as the blastocyst component that gives rise to the embryo proper, as distinct from the trophoblast.

## pitfalls
Assuming the whole blastocyst becomes the embryo. Only the inner cell mass does; the trophoblast becomes the placenta and fetal membranes, not embryonic tissue.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Implantation and the Second Week

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-IMPLANTATION-2NDWEEK

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.1

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"What portion of the blastocyst will give rise to the embryo? a. Cytotrophoblast b. Outer cell mass c. Ectoderm d. Inner cell mass e. Endoderm" (Quiz 41-42 Q5)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "inner cell mass" -- 0 hits, safe to create.

---

# Item

## id
CON-DEV-B783AFECFFD32A

## label
The amniotic cavity first appears on day eight as a slit-like space between the trophoblast and the embryoblast

## canonical_key
embryology.implantation.amniotic-cavity-first-appearance

## aliases
Amniotic cavity formation
Amnioblasts

## arabic_label
ظهور التجويف الأمنيوسي في اليوم الثامن

## arabic_aliases
الكيس الأمنيوسي

## definition
On approximately the eighth day of development, a small, slit-like space appears within the inner cell mass, between the trophoblast and the embryoblast; this is the first appearance of the amniotic cavity. It is bounded, on the embryoblast side, by a single layer of cells called amnioblasts, which together with the adjacent epiblast will come to line the fully formed amniotic sac. This day-eight timing places the amniotic cavity's first appearance in the same narrow window as the differentiation of the trophoblast into its cytotrophoblast and syncytiotrophoblast layers and of the inner cell mass into epiblast and hypoblast.

## explicit_objective
State that the amniotic cavity first appears on day eight as a space between the trophoblast and the embryoblast.

## pitfalls
Confusing the amniotic cavity's day-eight first appearance with its later expansion. It starts as a small slit-like space, not the roomy sac that eventually surrounds the fetus.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Implantation and the Second Week

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-IMPLANTATION-2NDWEEK

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.1

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The amniotic cavity appears on the eighth day as a slit-like space between the trophoblast and the [answer]. a. Exocoelomic membrane b. Chorion c. Connecting stalk d. Embryoblast e. Extraembryonic mesoderm" (Quiz 41-42 Q7)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "amniotic cavity" as part of the broader "inner cell mass" and "blastocyst implantation" searches -- 0 hits, safe to create.

---

# Item

## id
CON-DEV-DB4682BB1AB3CC

## label
The chorion is formed by somatopleuric extraembryonic mesoderm together with the trophoblast

## canonical_key
embryology.implantation.chorion-formation

## aliases
Chorion formation
Somatopleuric extraembryonic mesoderm

## arabic_label
تكوّن الغشاء المشيمي (الكوريون)

## arabic_aliases
المشيماء

## definition
The chorion, the outermost fetal membrane and the fetal contribution to the placenta, is formed by the fusion of the extraembryonic somatopleuric (somatic) mesoderm with the trophoblast (its cytotrophoblast and syncytiotrophoblast layers). This is in contrast to the amnion, which is formed by extraembryonic ectoderm together with the somatopleuric mesoderm on its own inner surface, and the yolk sac wall, which is formed by extraembryonic endoderm together with splanchnopleuric (visceral) mesoderm. Naming the wrong mesodermal layer -- splanchnopleuric instead of somatopleuric, or intraembryonic instead of extraembryonic -- is the standard distractor pattern for this fact.

## explicit_objective
State that the chorion is formed by somatopleuric extraembryonic mesoderm plus the trophoblast, distinguishing it from the amnion's and yolk sac's tissue origins.

## pitfalls
Mixing up somatopleuric and splanchnopleuric mesoderm. The somatopleuric layer, associated with the amnion and chorion, is distinct from the splanchnopleuric layer, associated with the yolk sac wall and gut tube.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Implantation and the Second Week

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-IMPLANTATION-2NDWEEK

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.15

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Chorion is formed by a. Splanchnopleuric extra embryonic mesoderm and hypoblast b. Splanchnopleuric extra embryonic mesoderm and trophoblast c. Somatopleuric intra embryonic mesoderm and trophoblast d. Somatopleuric extra embryonic mesoderm and trophoblast e. Somatopleuric extra embryonic mesoderm and aminoblast" (Quiz 41-42 Q8)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "chorion formation" as part of the "amniotic cavity"/"inner cell mass" search set -- 0 hits, safe to create.

---

# Item

## id
CON-DEV-857BDB55798E03

## label
Pregnancy tests generally detect human chorionic gonadotropin (hCG) in maternal urine

## canonical_key
embryology.implantation.hcg-pregnancy-test

## aliases
hCG pregnancy test
Human chorionic gonadotropin

## arabic_label
اختبار الحمل يعتمد على هرمون hCG

## arabic_aliases
موجهة الغدد التناسلية المشيمائية البشرية

## definition
Home and clinical pregnancy tests are generally based on detecting human chorionic gonadotropin (hCG) in maternal urine or serum. hCG is secreted by the syncytiotrophoblast from soon after implantation and is what maintains the corpus luteum (and hence progesterone secretion) until the placenta itself takes over steroid production. Oestrogen and progesterone, though also pregnancy-associated hormones, are not the analyte a standard pregnancy test detects, and "human chorionic corticotropin" is not a real hormone -- a distractor built from a similar-sounding but non-existent name.

## explicit_objective
State that pregnancy tests detect hCG, and identify oestrogen, progesterone and the fabricated "human chorionic corticotropin" as the wrong analytes.

## pitfalls
Confusing hCG with the fabricated distractor "human chorionic corticotropin". No such hormone exists; the syncytiotrophoblast secretes chorionic *gonadotropin*, not a corticotropin.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Implantation and the Second Week

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-IMPLANTATION-2NDWEEK

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Pregnancy tests generally are based upon the detection in maternal urine of a. Estrogen b. Human Chorionic Corticotropin c. None of the above d. Progesterone e. Human Chorionic Gonadotrophin" (Quiz 41-42 Q10, repeated Q30)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "hCG pregnancy test" -- 0 hits, safe to create.

---

# Item

## id
CON-DEV-7BE5A62AC3D0D1

## label
The notochord is a mesodermal structure that lies under the neural tube and is flanked by the somites

## canonical_key
embryology.notochord.structure-relations

## aliases
Notochord location
Notochord as mesodermal structure

## arabic_label
موقع الحبل الظهري ونشأته المتوسطية

## arabic_aliases
الحبل الظهري

## definition
The notochord is a mesodermal, rod-like structure that lies in the midline beneath the developing neural tube, with the paraxial mesoderm-derived somites flanking it on either side. It is this positional relationship -- ventral to the neural tube, between the two columns of somites -- that lets the notochord induce overlying ectoderm to form the neural plate and later provides the fixed axis around which the vertebral column condenses. Although the notochord itself arises from epiblast cells that invaginate through the primitive node, once formed it is classified as a mesodermal derivative, distinguishing it from the neuroectodermal neural tube it lies beneath.

## explicit_objective
Describe the notochord's structural relations -- mesodermal, beneath the neural tube, flanked by the somites -- and its role in inducing the neural plate.

## pitfalls
Classifying the notochord as ectodermal because it lies so close to the neural tube. It is mesodermal, and it is precisely its position beneath the neuroectoderm that lets it induce that ectoderm to thicken into the neural plate.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Gastrulation and the Notochord

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-GASTRULATION-NOTOCHORD

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.85

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The notochord is a ___ structure in vertebrate embryos that lies under the ___, and is flanked by ___. a. mesodermal, ectoderm, endoderm b. mesodermal, neural tube, somites c. endodermal, mesoderm, the gut d. endodermal, epidermis, blastocoel e. ectodermal, neural tube, mesoderm" (Quiz 46 Q8, repeated Q13)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "notochord" -- pending 101-ISK "notochord forms in four steps, guides the embryo, and ends as the nucleus pulposus" (CON-DEV-1BCF37C48AF307) read in full: it covers formation and fate, not this record's structural-relations claim (mesodermal, beneath neural tube, flanked by somites); no merge, cross-linked as related.

## related_concept_ids
CON-DEV-1BCF37C48AF307

---

# Item

## id
CON-DEV-ADC571EE1F47C0

## label
The outer cytotrophoblastic shell firmly attaches the chorionic sac to the maternal endometrium

## canonical_key
embryology.placenta.cytotrophoblastic-shell-attachment

## aliases
Outer cytotrophoblastic shell
Chorionic sac attachment

## arabic_label
الغلاف الأرومي الغاذي الخارجي وتثبيت الكيس المشيمي

## arabic_aliases
الأرومة الغاذية الخلوية

## definition
As the placenta develops, the cytotrophoblast cells at the periphery of the chorionic villi proliferate and penetrate through the overlying syncytiotrophoblast to form a continuous outer layer, the outer cytotrophoblastic shell, which gradually surrounds the entire trophoblast. This shell is what firmly attaches the chorionic sac to the maternal endometrium, anchoring the developing placenta in place, rather than the secondary or tertiary chorionic villi (which mediate exchange and branching, not the initial firm attachment) or the extraembryonic mesoderm (which forms the villous core, not the outer anchoring layer).

## explicit_objective
Identify the outer cytotrophoblastic shell as the structure that firmly attaches the chorionic sac to the maternal endometrium.

## pitfalls
Crediting the chorionic villi themselves with the firm attachment. The villi mediate maternal-fetal exchange and grow outward; it is the outer cytotrophoblastic shell surrounding them that does the anchoring.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Gastrulation and the Notochord

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-GASTRULATION-NOTOCHORD

## related_article_ids

## related_concept_ids
CON-DEV-ACDC0FE22BE06F

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.15

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"During the formation of the placenta, it is important that the chorion firmly attaches to the maternal endometrial stroma. This is accomplished by the a. Secondary chorionic villi b. Tertiary chorionic villi c. Outer cytotrophoblastic shell d. Extraembryonic mesoderm" (Quiz 46 Q10, repeated Q15, Quiz 47 Q4)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "outer cytotrophoblastic shell" -- 0 hits, safe to create.

---

# Item

## id
CON-DEV-ACDC0FE22BE06F

## label
Chorionic villi are designated secondary chorionic villi once they develop a mesodermal core

## canonical_key
embryology.placenta.secondary-chorionic-villi

## aliases
Secondary chorionic villi
Chorionic villi stages

## arabic_label
الزغابات المشيمية الثانوية

## arabic_aliases
الزغابات المشيمية

## definition
Chorionic villi progress through three stages. Primary villi are columns of cytotrophoblast covered by syncytiotrophoblast, with no mesodermal core; they become secondary chorionic villi once extraembryonic mesoderm invades the cytotrophoblastic core, and tertiary (definitive) chorionic villi once blood vessels differentiate within that mesodermal core. So it is the appearance of a mesodermal core, not contact with the decidua basalis, coverage by syncytiotrophoblast (already present from the primary stage) or the appearance of branching, that specifically marks the primary-to-secondary transition.

## explicit_objective
State that chorionic villi are designated secondary once a mesodermal core develops, distinguishing this stage from the primary and tertiary villous stages.

## pitfalls
Crediting syncytiotrophoblast coverage or branching for the primary-to-secondary transition. Both are already present, or come later; the defining event of the secondary stage specifically is the mesodermal core.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Gastrulation and the Notochord

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-GASTRULATION-NOTOCHORD

## related_article_ids

## related_concept_ids
CON-DEV-ADC571EE1F47C0

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.1

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Chorionic villi are designated as secondary chorionic villi when they: a. Develop a mesodermal core b. Contact the decidua basalis c. Are covered by syncytiotrophoblast d. Give rise to branching villi" (Quiz 46 Q11, repeated Q16, Quiz 47 Q5)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "secondary chorionic villi" -- one pending 101-ISK *question* title hit ("Secondary chorionic villi Ac em"), no backing concept found; no merge, minted new.

---

# Item

## id
CON-DEV-9FB8E4B0015C2B

## label
Closure of the cranial neuropore occurs at approximately day 25

## canonical_key
embryology.neural-tube.cranial-neuropore-closure-day

## aliases
Cranial neuropore closure
Neural tube closure timing

## arabic_label
انغلاق الثقبة العصبية القحفية في اليوم الخامس والعشرين تقريباً

## arabic_aliases
الثقبة العصبية القحفية

## definition
As the neural folds fuse to form the neural tube, fusion begins in the cervical region and proceeds bidirectionally, leaving two temporary openings -- the cranial and caudal neuropores -- that close last. The cranial neuropore closes at approximately day 25 of development, several days before the caudal neuropore, which closes at approximately day 27 to 28. This closure sequence, cranial before caudal, is the basis for the corresponding pattern of neural tube defects: failure of cranial neuropore closure produces anencephaly, while failure of caudal neuropore closure produces spina bifida.

## explicit_objective
State the approximate day of cranial neuropore closure (day 25) and its sequence relative to caudal neuropore closure.

## pitfalls
Assuming both neuropores close simultaneously. The cranial neuropore closes first (around day 25), several days before the caudal neuropore, and each closure failure produces a different, specific defect.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Neurulation and the Embryonic Period

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-NEURULATION-EMBRYONIC-PERIOD

## related_article_ids

## related_concept_ids
CON-DEV-B74E7BE5E77918

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Closure of the cranial neuropore occurs at ...: a. day 25. b. day 15. c. day 30. d. day 20." (Quiz 48 Q11, repeated Q16; T/F form Q1)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "neurulation" -- pending 101-ISK "neural plate is thickened median ectoderm... folds into the neural tube... cranial neuropore closes before the caudal one" (CON-DEV-4BC4233153C3DC) read in full: states closure *order* but not this record's specific day-25 timing; no merge, cross-linked as related.

## related_concept_ids
CON-DEV-4BC4233153C3DC

---

# Item

## id
CON-DEV-B74E7BE5E77918

## label
Spina bifida results from failure of closure of the caudal neuropore

## canonical_key
embryology.neural-tube.spina-bifida-mechanism

## aliases
Spina bifida mechanism
Caudal neuropore closure failure

## arabic_label
السنسنة المشقوقة وفشل انغلاق الثقبة العصبية الذيلية

## arabic_aliases
السنسنة المشقوقة

## definition
Spina bifida is a neural tube defect of the vertebral column and spinal cord that results from failure of closure of the caudal neuropore, the temporary opening at the caudal end of the closing neural tube. This is distinct from anencephaly, which results from failure of closure of the cranial neuropore, and from primary failure of neural tube formation itself (a much earlier and more severe disruption of neurulation). Because the caudal neuropore normally closes at approximately day 27 to 28, a teratogenic or nutritional insult (such as folate deficiency) acting around this window is what most directly threatens caudal neuropore closure.

## explicit_objective
State that spina bifida results from failure of closure of the caudal neuropore, distinguishing this mechanism from anencephaly and from failure of neural tube formation.

## pitfalls
Attributing spina bifida to failure of neural tube formation in general. The neural tube does form; it is specifically the caudal neuropore's closure that fails.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Neurulation and the Embryonic Period

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-NEURULATION-EMBRYONIC-PERIOD

## related_article_ids

## related_concept_ids
CON-DEV-9FB8E4B0015C2B

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.45

## exam_weight_by_year
AUN_Y1=0.45

## clinical_relevance
0.5

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Spina bifida occurs due to: a. failure of formation of the neural tube. b. failure of closure of the caudal neuropore. c. non of the above. d. failure of closure of the cranial neuropore." (Quiz 48 Q12, repeated Q17)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "spina bifida" -- 0 hits, safe to create.

---

# Item

## id
CON-DEV-62093248BCEC81

## label
The major features of the external body form are recognizable by the end of the second month

## canonical_key
embryology.fetal-period.external-body-form-second-month

## aliases
External body form
End of embryonic period

## arabic_label
اكتمال الملامح الخارجية الرئيسية بنهاية الشهر الثاني

## arabic_aliases
نهاية الفترة الجنينية المبكرة

## definition
By the end of the second month (the end of the embryonic period proper, week 8), the major features of the external body form are already recognisable, even though the embryo remains only about 3 cm in crown-rump length: the head is large relative to the trunk, the face has taken on a more human appearance, the limbs are formed with digits, and the external genitalia have begun to differentiate though not yet enough to determine sex by inspection. This is distinct from the fetal period that follows (from the ninth week), during which no new external features are laid down and existing ones instead mature and grow, so this eighth-week milestone is specifically about first recognisability, not final differentiation.

## explicit_objective
State that the major features of external body form are recognisable by the end of the second month, marking the close of the embryonic period.

## pitfalls
Confusing "recognisable by the end of the embryonic period" with "fully mature". The features are present in outline by week 8; they still mature substantially during the fetal period that follows.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Neurulation and the Embryonic Period

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-NEURULATION-EMBRYONIC-PERIOD

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.1

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The major features of the external body form are recognizable at: a. the end of the eighth month. b. the end of the second month. c. the end of the sixth month. d. the end of the fourth month." (Quiz 48 Q13, repeated Q18)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "organogenesis" -- pending 101-ISK "fetal period begins at the ninth week and is growth not organogenesis" (CON-DEV-E273F775E9CB77) read in full: states the fetal-period side of this same academic fact (organogenesis = embryonic period, weeks 3-8) and is reused directly for this pass's organogenesis question (see question pmsquiz30-q26); it does not, however, state this record's specific "external body form recognisable by end of 2nd month" claim, so a separate new concept is minted here.

---

# Item

## id
CON-DEV-4FBEBAB88ED8A2

## label
Ectodermal derivatives include the epidermis, nervous system and sense-organ epithelium, but not the kidneys

## canonical_key
embryology.ectoderm.derivatives-except-kidneys

## aliases
Ectodermal derivatives
Ectoderm vs mesoderm boundary

## arabic_label
مشتقات الأديم الظاهر (باستثناء الكلى)

## arabic_aliases
مشتقات الأديم الظاهر

## definition
Surface ectoderm and neuroectoderm together give rise to the epidermis and its appendages, the central and peripheral nervous systems (via the neural tube and neural crest), and the sensory epithelium of the ear, nose and eye. The kidneys, by contrast, are derived from intermediate mesoderm, not ectoderm, which is why a mixed list of ectodermal derivatives with "the kidneys" among the options uses the kidneys as the mesodermal odd-one-out. This same ectoderm/mesoderm boundary is what separates the ectodermal special sense organs from the mesodermal urogenital system throughout early development.

## explicit_objective
List the ectodermal derivatives (epidermis, nervous system, sense-organ epithelium) and identify the kidneys as a mesodermal, not ectodermal, structure.

## pitfalls
Assuming every organ derived from a surface layer is ectodermal. The kidneys develop from intermediate mesoderm deep to the surface, not from ectoderm, despite appearing in the same "which germ layer" list as genuinely ectodermal organs.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Ectodermal Derivatives

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-ECTODERM-DERIVATIVES

## related_article_ids

## related_concept_ids
CON-DEV-AD4B6CDA269ED5

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"All of the following are derived from the ectoderm except: a. The kidneys b. The central nervous system c. The peripheral nervous system d. The sensory epithelium of the ear, nose, and eye" (Quiz 49 Q5)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "neural crest" -- pending 101-ISK "the neural crest beside it becomes almost everything peripheral" (CON-DEV-785CE84F7C03DB) read in full: covers the neural-tube-vs-neural-crest derivative split, not this record's broader ectoderm-vs-kidneys (mesoderm) boundary; no merge, minted new and cross-linked.

## related_concept_ids
CON-DEV-785CE84F7C03DB

---

# Item

## id
CON-DEV-F2328E44A9B7F8

## label
Ectodermal derivatives include the nervous system, epidermis and mammary gland, but not the upper part of the anal canal

## canonical_key
embryology.ectoderm.derivatives-except-anal-canal

## aliases
Ectodermal derivatives except anal canal
Stomodeum vs proctodeum

## arabic_label
مشتقات الأديم الظاهر (باستثناء الجزء العلوي من القناة الشرجية)

## arabic_aliases
القناة الشرجية

## definition
Surface ectoderm gives rise to the epidermis and its appendages (including the mammary gland), and neuroectoderm gives rise to the nervous system -- but the gastrointestinal tract, including the upper part of the anal canal above the pectinate line, is an endodermal derivative of the hindgut, not an ectodermal one. Only the lower part of the anal canal, below the pectinate line, is ectodermal, formed from the proctodeum; this switch in germ-layer origin at the pectinate line is also why the two halves of the anal canal differ in blood supply, lymphatic drainage and epithelial type. The mouth cavity, by contrast, is the ectodermal exception at the opposite end of the gut tube, lined by ectoderm derived from the stomodeum.

## explicit_objective
Identify the upper part of the anal canal as endodermal rather than ectodermal, distinguishing it from the genuinely ectodermal mammary gland, nervous system and mouth cavity.

## pitfalls
Assuming the whole anal canal shares one germ-layer origin. Only its lower part, below the pectinate line, is ectodermal (from the proctodeum); the upper part is endodermal hindgut, matching the mouth-cavity/stomodeum pattern at the cranial end of the gut tube in reverse.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Ectodermal Derivatives

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-ECTODERM-DERIVATIVES

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Ectodermal derivatives include all of the following except: a. upper part of the anal canal. b. mammary gland. c. epidermis of the skin. d. the nervous system." (Quiz 49 Q10, repeated Q15)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "ectodermal derivatives" as part of the broader "neural crest" search -- no concept states this specific anal-canal exception; no merge, minted new.

---

# Item

## id
CON-DEV-AD4B6CDA269ED5

## label
Intermediate mesoderm gives rise to the kidneys and gonads

## canonical_key
embryology.mesoderm.intermediate-mesoderm-kidneys-gonads

## aliases
Intermediate mesoderm
Urogenital ridge

## arabic_label
المتوسطة الوسيطة ونشأة الكلى والغدد التناسلية

## arabic_aliases
الحرف البولي التناسلي

## definition
Intermediate mesoderm is the narrow strip of paraxial-to-lateral-plate mesoderm that connects the paraxial mesoderm (somites) to the lateral plate; it differentiates into the urogenital ridge, giving rise to the kidneys (via the pronephros, mesonephros and metanephros in turn) and the gonads. This is distinct from paraxial mesoderm, which forms the somites (and hence axial skeleton, back muscle and dermis), and lateral plate mesoderm, which forms the body wall, limbs and serous cavity linings -- the neural tube, by contrast, is not a mesodermal derivative at all. Because both the urinary and genital systems arise from this same intermediate strip, their close anatomical and developmental relationship is set up at this stage.

## explicit_objective
State that intermediate mesoderm gives rise to the kidneys and gonads, distinguishing it from paraxial and lateral plate mesoderm's own derivatives.

## pitfalls
Assuming the neural tube is a mesodermal derivative because it sits between mesodermal columns. The neural tube is neuroectodermal; only the tissue on either side of it is mesoderm.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Mesodermal Derivatives

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-MESODERM-DERIVATIVES

## related_article_ids

## related_concept_ids
CON-DEV-4FBEBAB88ED8A2

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.15

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Intermediate mesoderm will give rise to the a. Neural Tube b. Somites c. Kidneys and gonads d. Heart" (Quiz 50 Q7); "Intermediate mesoderm is differentiated into: a. all of the above. b. back muscles. c. urogenital system. d. body cavities." (Quiz 50 Q13, repeated Q18)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "intermediate mesoderm" and "urogenital ridge" -- 0 hits either way, safe to create.

---

# Item

## id
CON-DEV-5751F8C42B2EAC

## label
Mesodermal derivatives include the cardiovascular, respiratory-associated musculature and genital systems and the spleen, but not the suprarenal medulla

## canonical_key
embryology.mesoderm.derivatives-except-suprarenal-medulla

## aliases
Mesodermal derivatives
Suprarenal medulla exception

## arabic_label
مشتقات المتوسطة الأديمية (باستثناء لب الغدة الكظرية)

## arabic_aliases
لب الغدة الكظرية

## definition
Mesoderm gives rise to the cardiovascular system, the connective tissue and musculature of the respiratory system, the genital system and the spleen (a lateral-plate mesoderm derivative within the dorsal mesentery), among many other structures. The suprarenal (adrenal) medulla, by contrast, is a neural crest derivative -- neural crest cells migrate into the developing suprarenal cortex (which is itself mesodermal) and differentiate into chromaffin cells -- so it is the one structure in this kind of list that is ectodermal in origin rather than mesodermal, despite sitting inside a mesoderm-derived organ. This cortex-versus-medulla split, a mesodermal cortex around a neural-crest-derived medulla, is a frequently tested exception.

## explicit_objective
List mesodermal derivatives (cardiovascular, respiratory musculature, genital system, spleen) and identify the suprarenal medulla as a neural crest, not mesodermal, derivative.

## pitfalls
Assuming the whole suprarenal gland shares one germ-layer origin because it is one organ. The cortex is mesodermal and the medulla is neural crest -- two different origins fused into a single gland.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Mesodermal Derivatives

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-MESODERM-DERIVATIVES

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The following organs are derived from mesoderm EXCEPT: a. suprarenal medulla b. skeletal musculature c. suprarenal cortex d. musculature of blood vessels" (Quiz 50 Q10); "Derivatives of the mesodermal germ layer include all the followings except: a. cardiovascular system. b. respiratory system. c. the spleen. d. genital system." (Quiz 50 Q14, repeated Q19)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "suprarenal medulla mesoderm" and "neural crest" -- the 101-ISK neural-crest-derivatives concept (CON-DEV-785CE84F7C03DB) names the suprarenal medulla among the crest's own derivatives, consistent with but not stating this record's own mesoderm-derivatives-EXCEPT framing; no merge, minted new.

## related_concept_ids
CON-DEV-785CE84F7C03DB

---

# Item

## id
CON-DEV-AAFD50C9B1AD15

## label
The total number of somites is approximately 42 to 44 pairs

## canonical_key
embryology.mesoderm.total-somite-count

## aliases
Total somite count
Somite number

## arabic_label
العدد الإجمالي للجسيدات (42-44 زوجاً تقريباً)

## arabic_aliases
الجسيدات

## definition
Somites, the paired segmental blocks of paraxial mesoderm that appear in craniocaudal sequence through the fourth and fifth weeks, total approximately 42 to 44 pairs by the end of somite formation, considerably more than the roughly 30 to 35 vertebrae that persist in the adult axial skeleton, because several of the most caudal somites subsequently regress. This total is made up of regional groups -- occipital, cervical, thoracic, lumbar, sacral and coccygeal -- each somite differentiating into a sclerotome, myotome and dermatome. The final adult vertebral count is therefore smaller than the total number of somites ever formed, since some caudal somites disappear rather than persisting.

## explicit_objective
State the approximate total somite count (42 to 44 pairs) and explain why it exceeds the adult vertebral count.

## pitfalls
Equating the total somite count with the adult vertebral count. Several of the most caudal somites regress and never contribute a vertebra, so 42-44 somite pairs give rise to fewer than 42-44 vertebrae.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id

## secondary_node_ids

## topic
Embryology

## subtopic
Mesodermal Derivatives

## microtopic

## nanotopic

## modules
AUN-PMS-102

## article_ids
ART-DEV-AUN-PMS102-MESODERM-DERIVATIVES

## related_article_ids

## related_concept_ids

## resource_ids
src_05a52683963c6bdc3136

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.1

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The whole number of somites is a. 42 - 44. b. 46 - 48. c. 30 -35. d. 36 - 40." (Quiz 50 Q11, repeated Q16; T/F form Q1)

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "somites" -- live CON-DEV-9672802190D450 (8 cervical somites) and CON-DEV-574EC65777DFF3 (8-10 coccygeal somites) read in full: both state a regional count, not this record's whole-body total; no merge.

---

# Item

## id
CON-OBS-F3B46C8C137FA1

## label
ectopic pregnancy

## modules
+AUN-PMS-102

## universities
+aun

## learner_years
+1

---

# Item

## id
CON-OBS-359BB7C45CB7F8

## label
placenta previa

## modules
+AUN-PMS-102

## universities
+aun

## learner_years
+1
