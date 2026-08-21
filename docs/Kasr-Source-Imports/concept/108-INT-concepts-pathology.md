<!--
  Concepts for 108 INT — Pathology, Year 1, Kasr Al Ainy (kau).

  Source of record is the department's own theoretical book, manifest source
  src_e294bafc730fe7111b06, 22 pages, native text layer, extracted chapter by
  chapter into ../../../scripts/kasr/extract/108-INT/deptbook.json. It holds two
  numbered teaching chapters — `CHAPTER (1) CELLULAR RESPONSE TO INJURY` and
  `CHAPTER (2) INTRACELLULAR ACCUMULATION AND EXTRACELLULAR DEPOSITIONS.` — with
  16 ILOs between them. Every definition, list, gross description and
  microscopic description below is that book's own. Where the book is silent the
  record says so in `uncertainty` or `evidence_gaps` rather than borrowing a
  figure from another text.

  Weighting evidence comes from three places, all named on `exam_signal`:

    src_bd1595e59d116b78436a  EOY 2025 (batch 199) — 12 pathology MCQs, 2 written
                              groups, 3 practical items
    src_3deab75f7f81cc5f5260  EOY 2024 (batch 198) — 12 pathology MCQs, 2 written
                              groups, 4 practical items
    src_e294bafc730fe7111b06  the department book itself, whose ILOs are the
                              faculty saying what it will ask
    src_a2ffe25e8362fe840ceb  the department practical book, 10 pathology items
    src_3f8527b376185eb3c2eb  the student-compiled department question bank

  The last of those is used only as evidence of *what is examined* — 58 of its
  126 rows are pathology, and 25 of those turn on necrosis, which is why necrosis
  carries the heaviest weights in this file. Nothing from it is reproduced. It
  carries "For personal use only, No other uses without permission. Copyright
  (c) 2025. All rights reserved", it is a student compilation rather than a
  faculty document, and ../../../scripts/kasr/extract/108-INT/mcq.json records it
  as NOT CLEARED FOR PUBLICATION. No stem, option or distractor from it appears
  here, in `original_wording` or anywhere else. The exam papers and the two
  department books are the quotable sources.

  Placement, and the honest part of it. `primary_node_id` is on the systems view
  under SYS-FND-T03 "General pathology", whose only three subtopics are Cell
  injury and adaptation, Inflammation and repair, and Neoplasia. Chapter 1 fits
  that tree exactly. Chapter 2 does not fit it at all: searched across all 1,883
  canonical nodes in all four views, `accumul`, `deposit`, `calcif`, `amyloid`,
  `hyalin`, `xanthom`, `glycogen`, `metaplas` and `dysplas` return zero. So the
  27 records that teach chapter 2 are placed on the nearest defensible existing
  node — SYS-FND-T03-S01, or its M01 "Reversible injury" where the change is
  genuinely reversible — and every one of them carries a `primaryNodeId:` line
  in `field_notes` saying so and naming what the record actually is. Grep that
  key to find all of them. No node ID was invented; SYS-FND-T03-S04 does not
  exist and is not written here.

  22 records are honestly placed, 27 are placed under protest.

  Secondary placement is the discipline view, DIS-PAT and one of its topics. The
  discipline view has no nodes below topic level at runtime, so nothing here goes
  deeper than DIS-PAT-T0n.

  `module_subject` reproduces the module's own subject tree from
  ../academic/108-int-structure.md, segment for segment, including the book's own
  spelling of `Morphologic Alternations in Cell Injury`.

  Deliberately left out: `atomic_claim_ids` and `resource_ids`, for the reasons
  each record states — there is no evidence pass for this module, and the Kasr
  `src_…` sources are real and checksummed but absent from the corpus source
  index, so a citation naming one would fail the corpus check. The free-text
  provenance is on `exam_signal` and `original_wording` instead. Also left out:
  inflammation, repair and neoplasia, which SYS-FND-T03 has nodes for but this
  module's book does not teach.

  Import: Admin › Concepts › Import. The articles that teach these concepts are
  ../article/108-INT-pathology.md and must be imported first.
-->

# Item
## label
Pathology is studied in two stages, general pathology and systemic pathology
## id
CON-FND-E9DDE81591D0A7
## canonical_key
pathology.scope.general-and-systemic
## aliases
General pathology
Systemic pathology
Scope of pathology
What pathology studies
## arabic_label
علم الأمراض
## arabic_aliases
علم الأمراض العام
علم الأمراض الخاص
## definition
Pathology is the scientific study of disease, covering the functional and structural changes of disease from the molecular level up to the effect on the whole individual. It is learned in two stages: general pathology, which is the study of the main types of disease process such as inflammation and tumours, and systemic pathology, which describes specific diseases as they affect one organ or organ system.
## explicit_objective
Distinguish general pathology from systemic pathology, and place a named topic in the right one.
## pitfalls
Treating "general" as meaning introductory and "systemic" as meaning advanced. The division is by what is being described — a process against a named disease in a named organ — not by difficulty or by the order the two are taught in.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03
## secondary_node_ids
DIS-PAT
## topic
General pathology
## subtopic
Introduction to Pathology
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Introduction to Pathology
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-INTRODUCTION-TO-PATHOLOGY
## related_article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_concept_ids
CON-FND-1712C0F57AAD45
CON-FND-0BE3CE88A36BB5
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.1
## exam_weight_by_year
KAU_Y1=0.1
## clinical_relevance
0.2
## academic_relevance
0.6
## weight_confidence
0.4
## confidence
0.85
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-PATH-SCOPE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p1] Pathology is the scientific study of disease. It includes the functional and structural changes in disease, from the molecular level to the effects on the individual.
[Department book p1] 1. General pathology: The study of the main types of disease process; inflammation, tumors etc.
[Department book p1] 2. Systemic pathology: The description of specific diseases as they affect organs or organ systems e.g. Lung cancer.
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
microtopicId: The book's front matter has one level-2 heading only, "General classification of diseases", which is a separate concept; there is no third level to name here.
nanotopicId: As above — the module subject tree has no node below this one.
approvedFileResourceIds: No file resource has been rights-cleared for this module; the department book carries no licence statement.
approvedVideoResourceIds: This faculty distributes no video for 108 INT — the manifest holds only PDFs.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus concept index for "pathology" and "disease process" — the index is not present beside this batch and no candidate record exists for this module.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live concepts for "pathology" (39 label hits, all systemic disease descriptions under DIS-PAT-T07) and "disease" (28 hits) — none defines the scope of the subject, so no merge was proposed or rejected.
conflicts: The book states the two-stage division without qualification and no other source in this module contradicts it.
uncertainty: Nothing about the division is unclear; it is a naming convention the book states outright.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: This concept is not excluded; it is awaiting evidence, which publication_status records.
relationships: Walked the 49 concepts in this batch and the zero concepts already placed under SYS-FND-T03. This is the parent framing for the other 48; the two intro records are its untyped neighbours. A prerequisite_of edge to every other record in the batch would be true but valueless, so none was written to a relations batch.

---

# Item
## label
Every disease entity is described under six headings, from epidemiology to prognosis
## id
CON-FND-1712C0F57AAD45
## canonical_key
disease.description.six-characteristics
## aliases
Characteristics of disease
Aetiology pathogenesis morphology
Etiology
Pathogenesis
Sequelae
## arabic_label
خصائص المرض
## arabic_aliases
المسبب
الإمراض
## definition
For each disease the book studies six things in order: epidemiology, the distribution and determinants of the disease in a population; aetiology, its cause; pathogenesis, the mechanism by which that cause produces the disease; the morphological, functional and clinical changes it makes; its complications and sequelae; and its prognosis, the course it would take if left alone.
## explicit_objective
Name the six headings under which a disease is described, and separate aetiology from pathogenesis when given a clinical example.
## pitfalls
Using aetiology and pathogenesis as if they were the same word. Aetiology is the cause; pathogenesis is the mechanism by which that cause operates. A question asking for the pathogenesis of hydropic degeneration is not asking what caused it.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03
## secondary_node_ids
DIS-PAT
## topic
General pathology
## subtopic
Introduction to Pathology
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Introduction to Pathology
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-INTRODUCTION-TO-PATHOLOGY
## related_article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_concept_ids
CON-FND-E9DDE81591D0A7
CON-FND-0BE3CE88A36BB5
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.12
## exam_weight_by_year
KAU_Y1=0.12
## clinical_relevance
0.4
## academic_relevance
0.7
## weight_confidence
0.4
## confidence
0.85
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-PATH-DISEASE-HEADINGS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p1] For each disease entity, the following characteristics are studied: 1. Epidemiology (incidence). 2. Etiology (cause). 3. Pathogenesis (mechanism). 4. Morphological changes (gross & microscopic) as well as functional and clinical changes. 5. Complications and sequelae. 6. Prognosis (outcome).
[Department book p1] It is the mechanism by which the etiology (cause) operates to produce disease.
[Chapter 1 ILO] Discuss the pathogenesis of hydropic degeneration
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
microtopicId: The book's front matter carries no heading below this list; the six headings are the content of the concept, not a tree level.
nanotopicId: As above — nothing exists below.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "pathogenesis" and "etiology" — the index is absent beside this batch and no candidate exists.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live concepts for "disease" and "pathogenesis"; the 28 "disease" hits are all named conditions, none of which states the descriptive scheme.
conflicts: No source in this module orders or names the six headings differently.
uncertainty: The book gives "risk factor" as a category alongside aetiology without saying whether a risk factor is a weak aetiology or a separate class; it is recorded on the article rather than resolved here.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked all 49 batch concepts. The two other introduction records are untyped neighbours. No typed edge was written — the specific relation here is "is the framework for", which is not one of the 26 types.

---

# Item
## label
Diseases are classified by mechanism into congenital and acquired
## id
CON-FND-0BE3CE88A36BB5
## canonical_key
disease.classification.pathogenesis-congenital-acquired
## aliases
General classification of diseases
Congenital and acquired disease
Classification of disease by pathogenesis
## arabic_label
تصنيف الأمراض
## arabic_aliases
الأمراض الخلقية
الأمراض المكتسبة
## definition
The most widely used general classification of disease is by pathogenesis, the mechanism. Diseases are congenital, which is either genetic or non-genetic, or acquired, which the book divides five ways: inflammatory, haemodynamic, growth disorders, disordered immunity, and metabolic and degenerative disease.
## explicit_objective
Place a named disease in the book's classification, and give the five subdivisions of acquired disease.
## pitfalls
Reading "congenital" as "genetic". The book splits congenital into genetic and non-genetic, so a disease present at birth from an intrauterine insult is congenital but not genetic.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03
## secondary_node_ids
DIS-PAT
## topic
General pathology
## subtopic
Introduction to Pathology
## microtopic
General classification of diseases
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Introduction to Pathology > General classification of diseases
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-INTRODUCTION-TO-PATHOLOGY
## related_article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_concept_ids
CON-FND-E9DDE81591D0A7
CON-FND-1712C0F57AAD45
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.12
## exam_weight_by_year
KAU_Y1=0.12
## clinical_relevance
0.3
## academic_relevance
0.7
## weight_confidence
0.4
## confidence
0.85
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p2 | 108 INT
## atomic_claim_ids
CLM-FND-PATH-DISEASE-CLASSIFICATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p2] The most widely used general classification of disease is the one based on pathogenesis, or disease mechanism.
[Department book p2] 1- Congenital: a. Genetic. b. Non genetic. 2- Acquired: a. Inflammatory. b. Hemodynamic. c. Growth disorders. d. Disordered immunity. e. Metabolic and degenerative disease.
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
microtopicId: The microtopic column carries "General classification of diseases", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Introduction to Pathology > General classification of diseases) carries the curriculum position instead.
nanotopicId: "General classification of diseases" is the deepest node the module subject tree carries here; there is nothing below it.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "congenital" and "acquired disease" — no candidate record exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live concepts for "disease", "congenital" and "classification"; the hits are named conditions in systemic pathology, none of which is a general classification.
conflicts: No other 108 INT source classifies disease at all, so there is nothing to disagree with.
uncertainty: The book lists "Growth disorders" without saying whether neoplasia sits there or forms its own class; the module does not teach neoplasia, so the question is not settled by this source.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked all 49 batch concepts. Every cell-injury record in this batch is an instance of "Metabolic and degenerative disease" or "Inflammatory", but the book does not make that mapping and inventing it would be authoring a fact. Untyped neighbours only.

---

# Item
## label
A cell meets stress with adaptation, reversible injury, or irreversible injury and death
## id
CON-FND-D53E254A82F334
## canonical_key
cell.stress.adaptation-reversible-irreversible-continuum
## aliases
Effects of cell injury stimuli
Cellular response to injury
Continuum of cell injury
Homeostasis and cell stress
## arabic_label
استجابة الخلية للإصابة
## arabic_aliases
التكيف الخلوي
الإصابة العكوسة
## definition
Normal cell function is a steady state between physiological demand and the cell's structural and metabolic capacity. Modest stress is met by adaptation, which changes the cell but preserves its viability. Greater stress produces reversible injury, which returns to normal if the stimulus is removed. Stress beyond the cell's capacity to adapt produces irreversible injury and cell death. The three are one continuum of progressive impairment, not three separate events.
## explicit_objective
Predict which of the three responses a cell makes to a given stimulus, and justify the answer from the severity and duration of the stress.
## pitfalls
Learning the three as a list of alternatives a cell chooses between. They are points on one continuum, and the same stimulus moves a cell along it as it lasts longer or grows stronger.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Effects of cell injury stimuli
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Effects of cell injury stimuli
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_article_ids
ART-108-PAT-NECROSIS
ART-108-PAT-APOPTOSIS
## related_concept_ids
CON-FND-DF726F864C8BC3
CON-FND-2DDF56DA42A0A8
CON-FND-8989A49BEBCF14
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.35
## exam_weight_by_year
KAU_Y1=0.35
## clinical_relevance
0.5
## academic_relevance
0.85
## weight_confidence
0.6
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p3 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p1 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-CELL-STRESS-OUTCOMES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p3] More excessive physiological stresses, or adverse pathologic stimuli (injury), result in: 1. Adaptation. 2. Reversible injury, or 3. Irreversible injury and cell death.
[Department book p3] These responses may be considered a continuum of progressive impairment of cell structure and function.
[Chapter 1 ILO] Describe the effects of cell injury
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
microtopicId: The microtopic column carries "Effects of cell injury stimuli", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Effects of cell injury stimuli) carries the curriculum position instead.
nanotopicId: "Effects of cell injury stimuli" is the deepest node the module subject tree carries under this chapter heading.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "cell injury" and "reversible injury" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "cell injury", "reversible" and "irreversible" — zero label or canonical-key hits. Nothing to reject.
conflicts: No source in this module describes the response differently.
uncertainty: The book does not say where on the continuum reversibility is lost, which is the one thing a student most wants to know; no source in this module fixes the point.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts and the zero live concepts under SYS-FND-T03. This record is prerequisite_of the adaptation, reversible-injury, necrosis and apoptosis records; the typed edges are worth writing but a relations batch needs a claim and a citation each, and no evidence exists for this module yet. Recorded here as owed rather than written unsupported.

---

# Item
## label
Adaptation takes four forms: hypertrophy, hyperplasia, atrophy and metaplasia
## id
CON-FND-DF726F864C8BC3
## canonical_key
cell.adaptation.hypertrophy-hyperplasia-atrophy-metaplasia
## aliases
Cellular adaptation
Hypertrophy
Hyperplasia
Atrophy
Metaplasia
## arabic_label
التكيف الخلوي
## arabic_aliases
الضخامة
فرط التنسج
الضمور
الحؤول
## definition
Adaptation occurs when a physiological or pathological stressor induces a new steady state that changes the cell but preserves its viability in the face of the stimulus. The book names four changes: hypertrophy, hyperplasia, atrophy and metaplasia.
## explicit_objective
Name the four adaptive changes and identify which one a described tissue has undergone.
## pitfalls
Calling any increase in organ size hypertrophy. Hypertrophy is a larger cell; hyperplasia is more cells. An organ can enlarge by either, and the two often occur together.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M04
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Effects of cell injury stimuli
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Effects of cell injury stimuli
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_article_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## related_concept_ids
CON-FND-D53E254A82F334
CON-FND-063F60318B4D20
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.2
## exam_weight_by_year
KAU_Y1=0.2
## clinical_relevance
0.5
## academic_relevance
0.75
## weight_confidence
0.4
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p3 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-CELL-ADAPTATION-FORMS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p3] 1. Adaptation: It occurs when physiological or pathologic stressors induce a new state that changes the cell but otherwise preserves its viability in the face of the exogenous stimuli. These changes include: a. Hypertrophy. b. Hyperplasia. c. Atrophy. d. Metaplasia.
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-GYN-48D4E67DD6560A
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Effects of cell injury stimuli", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Effects of cell injury stimuli) carries the curriculum position instead.
nanotopicId: The module subject tree stops at "Effects of cell injury stimuli"; the four adaptations are the content of this record, not tree nodes.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "adaptation" and "metaplasia" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-GYN-48D4E67DD6560A "Fibrocystic breast disease can show apocrine metaplasia" is the only live concept whose label carries "metaplas". It is one named example inside one named breast condition, a systemic-pathology observation; this record is the general-pathology classification of adaptive responses. Different grain, different objective — one asks "what change is this", the other "what is seen in fibrocystic disease". Not merged, recorded so the next author does not re-litigate it.
conflicts: No source in this module names a fifth adaptation or omits one of the four.
uncertainty: The book lists the four without saying whether dysplasia is an adaptation or a step beyond it; the module does not teach dysplasia and the canonical tree has no node for it either.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. Atrophy connects to the brown-atrophy record (CON-FND-063F60318B4D20) as is_a, which is a genuine typed edge; it is owed to a relations batch once a claim and citation exist for this module. Listed as an untyped neighbour here.

---

# Item
## label
Hypoxia is the commonest cause of cell injury, and it reaches the cell three ways
## id
CON-FND-8989A49BEBCF14
## canonical_key
cell.injury.causes-hypoxia-and-others
## aliases
Causes of cell injury
Hypoxia
Ischaemia
Ischemia
Oxygen deprivation
## arabic_label
أسباب إصابة الخلية
## arabic_aliases
نقص الأكسجة
نقص التروية
## definition
Oxygen deprivation impairs aerobic respiration and therefore the cell's ability to generate ATP, and the book names it the extremely important and common cause of cell injury and death. Hypoxia arises from ischaemia, a deficient blood supply; from inadequate oxygenation, as in cardiorespiratory failure; or from loss of the oxygen-carrying capacity of the blood, as in anaemia and carbon monoxide poisoning. The book's six other causes are physical agents, chemical agents and drugs, infectious agents, immunological reactions, genetic derangements and nutritional imbalance.
## explicit_objective
Enumerate the causes of cell injury, and separate ischaemia from the other two routes to hypoxia when given a clinical scenario.
## pitfalls
Using hypoxia and ischaemia interchangeably. Ischaemia is one route to hypoxia — the one that also removes substrate and lets metabolites accumulate. Anaemia and carbon monoxide poisoning produce hypoxia with the blood supply intact.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Causes of cell injury
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Causes of cell injury
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_article_ids
ART-108-PAT-NECROSIS
## related_concept_ids
CON-FND-D53E254A82F334
CON-FND-375B9454502DE8
CON-FND-5285A9707E61CA
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.45
## exam_weight_by_year
KAU_Y1=0.45
## clinical_relevance
0.7
## academic_relevance
0.9
## weight_confidence
0.7
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p4 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p8 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-HYPOXIA-CAUSES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p4] 1. Oxygen deprivation (hypoxia) affects aerobic respiration and therefore the ability to generate adenosine triphosphate (ATP). This extremely important and common cause of cell injury and death.
[Department book p4] Hypoxia occurs because of: Ischemia (deficient blood supply). Inadequate oxygenation (e.g., cardiorespiratory failure). Loss of oxygen-carrying capacity of the blood (e.g., anemia, carbon monoxide poisoning).
[Section 2: End of year Q2b, 2 marks] Two causes of cell injury
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-RES-F6434978BBC927
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Causes of cell injury", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Causes of cell injury) carries the curriculum position instead.
nanotopicId: "Causes of cell injury" is the deepest node the module subject tree carries; the seven causes are the content of this record.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "hypoxia" and "causes of cell injury" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-RES-F6434978BBC927 "Carboxyhemoglobin cannot carry oxygen because carbon monoxide occupies oxygen-binding sites" is the mechanism behind one of the three routes named here. It is a respiratory-physiology mechanism claim; this is the pathology classification of the causes of cell injury. One question asks how carbon monoxide blocks oxygen carriage, the other asks what causes cell injury — neither answers the other. Not merged.
conflicts: No source in this module lists the causes differently. The book names alcohol under chemical agents; some texts give it its own class, but no 108 INT source does.
uncertainty: The book calls hypoxia "extremely important and common" without ranking it against the other six explicitly; the ranking here is the book's emphasis, not a stated order.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. Hypoxia causes the ATP-depletion mechanism (CON-FND-375B9454502DE8) and coagulative necrosis (CON-FND-5285A9707E61CA); both are genuine `causes` edges owed to a relations batch once a claim and citation exist for this module.

---

# Item
## label
ATP depletion injures the cell through the sodium pump, protein synthesis and calcium
## id
CON-FND-375B9454502DE8
## canonical_key
cell.injury.mechanism-atp-depletion
## aliases
Mechanisms of cell injury
ATP depletion
Sodium pump failure
Oxidative phosphorylation failure
## arabic_label
نقص الأدينوسين ثلاثي الفوسفات
## arabic_aliases
آليات إصابة الخلية
فشل مضخة الصوديوم
## definition
Interference with oxidative phosphorylation in the mitochondria reduces ATP and so impairs the biochemical processes that depend on it. Three consequences follow: the sodium pump loses activity, so sodium accumulates inside the cell and water follows it in and the cell swells; protein synthesis is interfered with; and intracellular calcium rises, because the enzymes that keep calcium in check are themselves ATP-dependent.
## explicit_objective
Trace ATP depletion to cell swelling, and name the two other consequences of losing ATP.
## pitfalls
Explaining cell swelling as osmosis alone. Water follows sodium, and the sodium is there because the ATP-dependent pump has stopped — the primary lesion is energetic, not osmotic.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Mechanisms of cell injury
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Mechanisms of cell injury
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_article_ids
ART-108-PAT-NECROSIS
## related_concept_ids
CON-FND-8989A49BEBCF14
CON-FND-2126819970522D
CON-FND-2DDF56DA42A0A8
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.4
## exam_weight_by_year
KAU_Y1=0.4
## clinical_relevance
0.4
## academic_relevance
0.9
## weight_confidence
0.6
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p4 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-ATP-DEPLETION-EFFECTS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p4] a. Reduction of activity of sodium pump, leading to accumulation of sodium inside the cell with influx of water into the cell causing it to swell.
[Department book p4] c. Increase of intracellular calcium (the calcium levels are kept in check by ATP-dependent enzymes).
[Chapter 1 ILO] Discuss mechanism of cell injury
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
microtopicId: The microtopic column carries "Mechanisms of cell injury", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Mechanisms of cell injury) carries the curriculum position instead.
nanotopicId: "Mechanisms of cell injury" is the deepest node the module subject tree carries; the three mechanisms are the content of this and the two records beside it.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "ATP depletion" and "sodium pump" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "ATP", "sodium pump" and "oxidative phosphorylation". The hits are skeletal-muscle energetics; none makes an assertion about cell injury. Nothing near enough to reject.
conflicts: No source in this module describes the mechanism differently.
uncertainty: The book does not say at what degree of ATP loss the swelling becomes irreversible; no 108 INT source gives a threshold.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. This is mechanism_step_before cloudy swelling (CON-FND-2DDF56DA42A0A8) and mechanism_step_before membrane disruption (CON-FND-2126819970522D) — both real typed edges, owed to a relations batch once the module has a claim and a citation to hang them on.

---

# Item
## label
Oxidative stress is free-radical production outrunning antioxidant defence
## id
CON-FND-7B96FFE8FC4285
## canonical_key
cell.injury.mechanism-oxidative-stress
## aliases
Free radicals
Reactive oxygen species
ROS
Oxidative stress
Lipid peroxidation
## arabic_label
الإجهاد التأكسدي
## arabic_aliases
الجذور الحرة
أنواع الأكسجين التفاعلية
## definition
Free radicals are chemical species with a single unpaired electron in an outer orbit, which makes them highly reactive with adjacent molecules. They are produced normally in small amounts during mitochondrial redox reactions, and the reactive oxygen species the book names are superoxide, the hydroxyl radical and hydrogen peroxide. Defence is by antioxidants such as vitamin E and enzymes such as superoxide dismutase. When the defences are overcome, free radicals attack membrane lipids by peroxidation, and attack cellular proteins and DNA — that state is oxidative stress.
## explicit_objective
Name the three reactive oxygen species and the two defences against them, and explain what makes a free radical reactive.
## pitfalls
Treating free radicals as purely pathological. They are produced normally during mitochondrial respiration; the injury is a failure of the balance, not the presence of the radical.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Mechanisms of cell injury
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Mechanisms of cell injury
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_article_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## related_concept_ids
CON-FND-2126819970522D
CON-FND-375B9454502DE8
CON-FND-2A370D3EF3EDCF
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.45
## exam_weight_by_year
KAU_Y1=0.45
## clinical_relevance
0.4
## academic_relevance
0.9
## weight_confidence
0.7
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p4 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p1 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-OXIDATIVE-STRESS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p4] a. Free radicals, including reactive oxygen species are chemical species that have a single unpaired electron in an outer orbit. They are highly reactive thus interacting and alter adjacent molecules.
[Department book p5] b. Reactive oxygen species include superoxide (O2-), hydroxyl radical (OH-), and hydrogen peroxide (H2O2). Normally there is a balance between free radicals and defense mechanisms which includes antioxidants as vitamin E and enzymes such as superoxide dismutase.
[Department book p5] c. In some situations, the defense mechanisms are overcome, and free radicals interact with lipids in cell membranes (peroxidation), cellular proteins and DNA, this is referred to as oxidative stress.
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-IMM-7308A1B0EA2D4F
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Mechanisms of cell injury", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Mechanisms of cell injury) carries the curriculum position instead.
nanotopicId: "Mechanisms of cell injury" is the deepest node the module subject tree carries here.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "free radical" and "oxidative stress" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-IMM-7308A1B0EA2D4F "Chronic granulomatous disease impairs reactive-oxygen-radical production and intracellular killing" is the only live concept that mentions reactive oxygen radicals. It is about radicals as a weapon the phagocyte needs and lacks; this record is about radicals as an agent of injury to the cell that makes them. Opposite sign, different objective. Not merged.
conflicts: No source in this module names a different set of reactive oxygen species.
uncertainty: The book gives vitamin E and superoxide dismutase as the defences without saying whether they are examples or the whole list; no 108 INT source settles it.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. Free radicals cause the lipofuscin record (CON-FND-2A370D3EF3EDCF), which the book states outright — a genuine `causes` edge across the two chapters, owed to a relations batch. Also mechanism_step_before membrane disruption.

---

# Item
## label
Free radicals released on reperfusion injure tissue that survived the ischaemia
## id
CON-FND-2126819970522D
## canonical_key
cell.injury.mechanism-membrane-disruption
## aliases
Reperfusion injury
Membrane disruption
Phospholipase activation
Lysosomal rupture
## arabic_label
إصابة إعادة التروية
## arabic_aliases
تلف الأغشية الخلوية
انحلال الجسيمات الحالة
## definition
Membrane disruption is the common end point of the other mechanisms. ATP depletion stops the plasma-membrane sodium pump; rising intracellular calcium activates phospholipases that break membranes down; free-radical peroxidation damages membrane lipids further; and rupture of lysosomal membranes releases DNAases and proteases into the cytosol, which kills the cell. Free radicals are the agent the book names in reperfusion injury, which follows the restoration of blood flow to ischaemic tissue, and in cellular ageing, chemical injury and radiation damage.
## explicit_objective
Explain why restoring blood flow to ischaemic tissue can injure it further, and name the four routes by which membranes are disrupted.
## pitfalls
Assuming restoring the blood supply can only help. Reperfusion delivers oxygen to a tissue whose antioxidant defences are already exhausted, and the burst of free radicals injures cells that survived the ischaemic period.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Mechanisms of cell injury
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Mechanisms of cell injury
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_article_ids
ART-108-PAT-NECROSIS
## related_concept_ids
CON-FND-7B96FFE8FC4285
CON-FND-375B9454502DE8
CON-FND-4CD77608FB35DF
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.4
## exam_weight_by_year
KAU_Y1=0.4
## clinical_relevance
0.7
## academic_relevance
0.85
## weight_confidence
0.7
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p5 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p1 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-REPERFUSION-FREE-RADICALS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p5] d. Free radicals play a major role in reperfusion injury (following restoration of blood flow in ischemic tissue), cellular aging, chemical injury and radiation damage.
[Department book p5] d. Disruption of lysosomal membranes leads to release of various enzymes including DNAses, and proteases, into the cytosol leading to death of the cell.
[Section 1: EOM Q2, 0.5 marks] Reperfusion injury occurs due to:
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
microtopicId: The microtopic column carries "Mechanisms of cell injury", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Mechanisms of cell injury) carries the curriculum position instead.
nanotopicId: "Mechanisms of cell injury" is the deepest node the module subject tree carries here.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "reperfusion" and "membrane disruption" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "reperfusion", "membrane disruption" and "phospholipase" — zero label or canonical-key hits. Nothing to reject.
conflicts: No source in this module describes reperfusion injury differently.
uncertainty: The book does not say how long an ischaemic period must last before reperfusion becomes injurious rather than protective; no 108 INT source gives a time.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. This is mechanism_step_before necrosis (CON-FND-4CD77608FB35DF) — the book says lysosomal rupture leads to death of the cell — and the oxidative-stress record is mechanism_step_before this one. Both are owed to a relations batch.

---

# Item
## label
Reversible injury shows as cloudy swelling first, then hydropic change, then fatty change
## id
CON-FND-2DDF56DA42A0A8
## canonical_key
cell.injury.reversible-cloudy-swelling-hydropic-fatty
## aliases
Cloudy swelling
Hydropic change
Vacuolar change
Ballooning degeneration
Degeneration
Reversible injury
## arabic_label
الإصابة الخلوية العكوسة
## arabic_aliases
التورم الغائم
التنكس المائي
## definition
Cloudy swelling is one of the earliest changes seen in injury: the sodium pump is lost, sodium and water accumulate, the cell swells and the cytoplasm looks granular. It is seen in liver cells, myocardial cells and renal tubular cells. Hydropic, ballooning or vacuolar change is the same mechanism further advanced — the cell is swollen with excess water, the cytoplasm is pale and shows multiple vacuoles. Fatty change is the third pattern, occurring in hypoxic and toxic injury, in which lipid appears as empty vacuoles in the cytoplasm of cells that handle fat.
## explicit_objective
Name the earliest morphological change of reversible cell injury, and order the three reversible patterns by severity.
## pitfalls
Reading a vacuolated cytoplasm as fatty change automatically. Hydropic change also gives vacuoles, and the two are told apart by what the vacuole held — water in hydropic change, lipid dissolved out during processing in fatty change.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Morphologic Alternations in Cell Injury
## nanotopic
Reversible Injury (degeneration)
## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Morphologic Alternations in Cell Injury > Reversible Injury (degeneration)
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-375B9454502DE8
CON-FND-D53E254A82F334
CON-FND-3B89025E2FB4E0
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.4
## academic_relevance
0.95
## weight_confidence
0.7
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p5 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p1 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-REVERSIBLE-INJURY-MORPHOLOGY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p5] a- Cloudy swelling: One of the earliest changes seen in injury is due to loss of Na pump and accumulation of sodium and water inside the cell. The cell is swollen, and the cytoplasm appears granular. It is seen in liver cells, myocardial cells and renal tubular cells.
[Department book p5] b- Hydropic, ballooning or vacuolar change: Same mechanism as cloudy swelling but more advanced. The cells are swollen due to excess water accumulation. The cytoplasm is pale and shows multiple vacuoles.
[Section 1: EOM Q1, 0.5 marks] The earliest change in reversible cell injury is:
[Chapter 1 ILO] Describe morphological changes of intracellular water accumulation
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
microtopicId: The microtopic column carries "Morphologic Alternations in Cell Injury", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Morphologic Alternations in Cell Injury > Reversible Injury (degeneration)) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Reversible Injury (degeneration)", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Morphologic Alternations in Cell Injury > Reversible Injury (degeneration)) carries the curriculum position instead.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "cloudy swelling" and "hydropic degeneration" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "cloudy swelling", "hydropic", "vacuolar" and "degeneration" — zero label or canonical-key hits. Nothing to reject.
conflicts: The book lists fatty change among the reversible morphologies in chapter 1 and treats it again as an intracellular accumulation in chapter 2. That is the same lesion filed twice by the same book, not two sources disagreeing, and this record cross-references CON-FND-3B89025E2FB4E0 rather than restating it.
uncertainty: The book calls cloudy swelling "one of the earliest changes" without naming anything earlier, so whether it is the earliest or merely an early one is not settled by this source. The 2025 paper treats it as the earliest.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. Cloudy swelling is mechanism_step_before hydropic change within this record, and the steatosis record (CON-FND-3B89025E2FB4E0) is the chapter-2 treatment of the third pattern — a `part_of` edge owed to a relations batch. ATP depletion causes this; that edge is recorded on CON-FND-375B9454502DE8.

---

# Item
## label
Necrosis is the death of a group of cells within a living body
## id
CON-FND-4CD77608FB35DF
## canonical_key
necrosis.definition.group-cell-death-in-living-body
## aliases
Necrosis
Definition of necrosis
Irreversible injury
Cell death
## arabic_label
النخر
## arabic_aliases
موت الخلايا
النخر النسيجي
## definition
Necrosis is death of a group of cells within a living body. With severe or prolonged moderate injury the cell loses membrane integrity and lysosomal enzymes are released into the cytosol, destroying the cellular constituents; cell contents leak into the surrounding tissue and provoke an inflammatory response. Two processes underlie the morphology: denaturation of proteins, and enzymatic digestion of organelles and other cytosolic components. Necrotic areas are removed by macrophages and repaired by fibrosis, and dystrophic calcification may follow.
## explicit_objective
Define necrosis, name the two processes that produce its morphology, and state the fate of necrotic tissue.
## pitfalls
Defining necrosis as cell death without the two qualifiers. It is death of a *group* of cells, and it happens *within a living body* — which is what separates it from autolysis after death and from the single-cell deletion of apoptosis.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M02
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Necrosis
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-NECROSIS
## related_article_ids
ART-108-PAT-APOPTOSIS
ART-108-PAT-PATHOLOGICAL-CALCIFICATION
## related_concept_ids
CON-FND-8DA30AD870AC1E
CON-FND-2CDE9A5C884133
CON-FND-33466CEBFC4EBA
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.8
## exam_weight_by_year
KAU_Y1=0.8
## clinical_relevance
0.7
## academic_relevance
0.95
## weight_confidence
0.8
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p6 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p7 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p5 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-NECROSIS-DEFINITION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p6] Definition: Necrosis is death of a group of cells within a living body.
[Department book p6] Two processes underline the basic morphologic changes: 1. Denaturation of proteins. 2. Enzymatic digestion of organelles and other cytosolic components.
[Section 2: End of year Q1a, 1 mark] Necrosis
[Chapter 1 ILO] Discuss fate of necrotic tissue
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-INF-5DFBC7FBB17B73
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Necrosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Necrosis) carries the curriculum position instead.
nanotopicId: "Necrosis" is the level the module subject tree carries here; its only child, "Types of necrosis", is the parent of the five type records rather than a node for this definition.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "necrosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-INF-5DFBC7FBB17B73 "Acute malaria renal failure may result from anoxic acute tubular necrosis" is the closest of the four live "necrosis" concepts. It names a complication of one parasitic disease in one organ; this record defines the process in general pathology. A question on malarial renal failure and a question defining necrosis share a word, not a claim. Not merged.
conflicts: No source in this module defines necrosis differently.
uncertainty: The book says necrotic areas are "removed by macrophages and repaired by fibrosis" without saying when regeneration is possible instead; the module does not teach repair and the book's chapter on it does not exist.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts and the zero live concepts under SYS-FND-T03. This record is_a irreversible injury, is often_confused_with apoptosis (written as its own contrast record, CON-FND-2CDE9A5C884133), and causes dystrophic calcification (CON-FND-33466CEBFC4EBA) — the book states that last one outright. All three are genuine typed edges owed to a relations batch once the module has a claim and citation.

---

# Item
## label
Necrosis is recognised by karyolysis, pyknosis and karyorrhexis with a pinker cytoplasm
## id
CON-FND-8DA30AD870AC1E
## canonical_key
necrosis.morphology.nuclear-and-cytoplasmic-changes
## aliases
Karyolysis
Pyknosis
Karyorrhexis
Morphology of necrosis
Nuclear changes in necrosis
## arabic_label
التغيرات الشكلية للنخر
## arabic_aliases
انحلال النواة
تكثف النواة
تفتت النواة
## definition
The nucleus of a necrotic cell changes three ways: karyolysis, the fading of nuclear basophilia; pyknosis, nuclear shrinkage, which is followed by karyorrhexis; and karyorrhexis itself, destructive nuclear fragmentation. Eventually the nucleus disappears completely. The cytoplasm becomes more eosinophilic — stains pinker with haematoxylin and eosin — partly from loss of the cytoplasmic RNA that binds haematoxylin and partly from denatured proteins that bind eosin; the cell border loses definition, and later the tissue appears structureless pink from autolysis.
## explicit_objective
Name the three nuclear changes of necrosis, define each, and explain why necrotic cytoplasm stains pinker.
## pitfalls
Confusing pyknosis with karyorrhexis. Pyknosis is shrinkage of the whole nucleus into a dense mass; karyorrhexis is fragmentation of it. The 2024 paper asked for karyorrhexis by definition alone.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M02
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Necrosis
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-NECROSIS
## related_article_ids
ART-108-PAT-APOPTOSIS
## related_concept_ids
CON-FND-4CD77608FB35DF
CON-FND-5285A9707E61CA
CON-FND-46B3AD5A2D8294
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## clinical_relevance
0.5
## academic_relevance
0.95
## weight_confidence
0.8
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p6 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p1 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-NECROSIS-MORPHOLOGY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p6] Karyolysis: Fading of nuclear basophilia. Pyknosis: Nuclear shrinkage followed by karyorrhexis. Karyorrhexis: Destructive nuclear fragmentation.
[Department book p6] Necrotic cells are more eosinophilic (stain pinker) with hematoxylin and eosin (due to in part to the loss of cytoplasmic RNA which binds the blue dye, hematoxylin, and in part to denatured cytoplasmic proteins, which bind the red dye, eosin).
[Section 1: EOM Q5, 0.5 marks] Karyorrhexis means:
[Chapter 1 ILO] Describe the morphological picture of necrosis
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
microtopicId: The microtopic column carries "Necrosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Necrosis) carries the curriculum position instead.
nanotopicId: The module subject tree stops at "Necrosis" for the general morphology; the nuclear changes are the content of this record.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "pyknosis" and "karyorrhexis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "karyo" and "pyknos". Every hit is "megakaryocyte" or "eukaryotic" — a substring collision, not a near-miss. Nothing to reject.
conflicts: No source in this module orders the nuclear changes differently. The book has pyknosis "followed by karyorrhexis" while listing karyolysis first, which is a list order rather than a sequence claim.
uncertainty: The book does not say which nuclear change appears first in time, only which it lists first; a student asked to order them cannot answer from this source.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. This is part_of the necrosis definition and contrasts_with the apoptosis morphology record (CON-FND-46B3AD5A2D8294) — the nucleus fragments in both, but the membrane and the inflammatory response differ. Both edges owed to a relations batch. DIS-PAT-T08 is a secondary placement because the practical book examines this appearance on a slide.

---

# Item
## label
Coagulative necrosis keeps the cell outline because denaturation outruns autolysis
## id
CON-FND-5285A9707E61CA
## canonical_key
necrosis.coagulative.ischaemic-protein-denaturation
## aliases
Coagulative necrosis
Ischaemic necrosis
Ischemic necrosis
Infarction
Ghost outlines
## arabic_label
النخر التخثري
## arabic_aliases
النخر الإقفاري
الاحتشاء
## definition
Coagulative necrosis follows acute ischaemia, a sudden decrease in blood supply, and is due to protein denaturation: the injury denatures the structural proteins and also the enzymes that would digest them, so the cellular outlines are held for a time. The necrotic area is initially white or yellow but of normal consistency, as in infarction of the kidney, spleen and heart. Microscopically there is loss of nuclei and increased cytoplasmic eosinophilia with the general cellular outline retained — the ghost of the original tissue — and inflammatory cells infiltrate the margin while macrophages remove the dead tissue.
## explicit_objective
Explain why cellular outlines survive in coagulative necrosis, and name three organs in which it occurs.
## pitfalls
Expecting the architecture to be lost because the cells are dead. In coagulative necrosis the outlines persist for a time and that persistence is the diagnostic feature — the tissue is recognisable as a ghost of itself.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M02
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Types of necrosis
## nanotopic
Coagulative necrosis (ischemic necrosis)
## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Coagulative necrosis (ischemic necrosis)
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-NECROSIS
## related_article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_concept_ids
CON-FND-88508ABAB84A67
CON-FND-8DA30AD870AC1E
CON-FND-8989A49BEBCF14
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.8
## academic_relevance
0.95
## weight_confidence
0.8
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p6 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p5 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p7 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-COAGULATIVE-NECROSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p6] It occurs because of acute ischemia (sudden decrease in blood supply). It is due to protein denaturation. Presumably, the injury denatures structural proteins, as well as the enzymes that cause proteolysis (autolysis) so the cellular outlines are maintained for some time.
[Department book p6] Microscopic examination shows loss of nuclei, increased eosinophilia of the cytoplasm with retention of the general cellular outline (Appearing as ghost of the original tissue).
[Section 2: EOY Q II.3, 2 marks] 4 types of necrosis:
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-CVS-1A060C49C5C0C1
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Types of necrosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Coagulative necrosis (ischemic necrosis)) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Coagulative necrosis (ischemic necrosis)", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Coagulative necrosis (ischemic necrosis)) carries the curriculum position instead.
approvedFileResourceIds: No file resource has been rights-cleared for this module. The practical book's renal-infarct plate is requested as media on the necrosis article instead.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "coagulative necrosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-CVS-1A060C49C5C0C1 "Coronary occlusion can cause myocardial infarction" is a causal claim in cardiovascular pathology: what an occluded artery does. This record is the general-pathology morphology: what the dead tissue then looks like and why the outlines survive. One question asks what causes an infarct, the other asks what an infarct looks like down a microscope. Distinct objectives, cross-linked rather than merged.
conflicts: No source in this module describes coagulative necrosis differently.
uncertainty: The book says the outlines are maintained "for some time" without saying how long before they are lost; no 108 INT source gives an interval.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. Hypoxia causes this (CON-FND-8989A49BEBCF14), and it contrasts_with liquefactive necrosis (CON-FND-88508ABAB84A67) — the pair the practical book puts side by side. Both owed to a relations batch. DIS-PAT-T08 is secondary because the practical book carries a renal-infarct data-show item on it.

---

# Item
## label
Liquefactive necrosis turns the dead tissue to fluid, in the brain and in pus
## id
CON-FND-88508ABAB84A67
## canonical_key
necrosis.liquefactive.cns-infarct-and-pus
## aliases
Liquefactive necrosis
Colliquative necrosis
Colliquative
Pus
Abscess
## arabic_label
النخر التميعي
## arabic_aliases
النخر الاستحالي
القيح
## definition
Liquefactive or colliquative necrosis occurs in central nervous system infarction, where the tissue is rich in lipid, soft and lacking supporting stroma. The necrotic area becomes surrounded by glial tissue and is changed into a cyst. Pus in suppurative inflammation is the other example the book gives.
## explicit_objective
Name the two settings in which liquefactive necrosis occurs, and explain from tissue structure why the brain liquefies where the kidney does not.
## pitfalls
Answering "brain" alone. The 2024 paper's correct option was the centre of a pyogenic abscess, with three solid-organ infarcts as distractors — pus is liquefactive necrosis and it is the answer the examiner reaches for.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M02
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Types of necrosis
## nanotopic
Liquefactive or colliquative necrosis
## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Liquefactive or colliquative necrosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-NECROSIS
## related_article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_concept_ids
CON-FND-5285A9707E61CA
CON-FND-4CD77608FB35DF
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.7
## academic_relevance
0.95
## weight_confidence
0.85
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p7 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p1 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-LIQUEFACTIVE-NECROSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p7] Occurs in CNS infarctions, where the tissues are rich in lipid, soft and lack supporting stroma. The necrotic area becomes surrounded by glial tissue and is changed into a cyst. Pus in suppurative inflammation is also an example of liquefactive necrosis.
[Section 1: EOM Q1, 0.5 marks] Liquefactive necrosis occurs in:
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-RES-EA9A6089817998
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Types of necrosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Liquefactive or colliquative necrosis) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Liquefactive or colliquative necrosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Liquefactive or colliquative necrosis) carries the curriculum position instead.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "liquefactive necrosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-RES-EA9A6089817998 "A single abscess develops, more common on the right side" describes the distribution of lung abscess in a respiratory condition. It shares the word abscess and nothing else — it makes no claim about the type of necrosis pus represents. Not merged.
conflicts: No source in this module names a third site of liquefactive necrosis.
uncertainty: The book gives lipid richness and absent stroma as the reason the brain liquefies, without saying which of the two matters more; no 108 INT source weighs them.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. contrasts_with coagulative necrosis (CON-FND-5285A9707E61CA) is the edge worth writing here — the two are the pair a student is asked to separate, and the 2024 stem put them in the same option list. Owed to a relations batch.

---

# Item
## label
Caseation necrosis is the cheese-like necrosis of tuberculosis
## id
CON-FND-5B3B6BA12670C7
## canonical_key
necrosis.caseation.tuberculous-cheese-like
## aliases
Caseation necrosis
Caseous necrosis
Caseation
Cheese-like necrosis
## arabic_label
النخر الجبني
## arabic_aliases
التجبن
النخر التجبني
## definition
Caseation necrosis is a type of necrosis in which the necrotic tissue appears semi-solid, yellowish and cheese-like, from casein. Under the microscope it appears as granular structureless pink material. It occurs mainly in tuberculosis, through tissue digestion by activated macrophages, and the lipids liberated from the capsule of the tubercle bacillus add to the cheese-like appearance.
## explicit_objective
Recognise caseation necrosis from a gross or microscopic description, and name the disease it points to.
## pitfalls
Describing caseation as retaining tissue architecture because it is solid. It is structureless — the architecture is completely lost, which is exactly what separates it from coagulative necrosis, the other necrosis that stays firm.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M02
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Types of necrosis
## nanotopic
Caseation necrosis
## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Caseation necrosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-NECROSIS
## related_article_ids
ART-108-PAT-PATHOLOGICAL-CALCIFICATION
## related_concept_ids
CON-FND-5285A9707E61CA
CON-FND-33466CEBFC4EBA
CON-FND-4CD77608FB35DF
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.8
## academic_relevance
0.95
## weight_confidence
0.85
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p7 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p2 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-CASEATION-NECROSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p7] It is a type of necrosis where the necrotic tissue appears semi-solid, yellowish and cheese-like (casein). Under the microscope caseation necrosis appears as granular structureless pink material.
[Department book p7] This occurs mainly in tuberculosis due to tissue digestion by activated macrophages. Also, liberation of lipids from the tubercle bacilli capsule adds to the cheese-like appearance.
[Section 1: EOM Q5, 0.5 marks] Which type of necrosis has a "cheese-like" appearance?
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-INF-2383B7D853A480
CON-INF-8658F6CDBBB685
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Types of necrosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Caseation necrosis) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Caseation necrosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Caseation necrosis) carries the curriculum position instead.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "caseation" and "caseous necrosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-INF-2383B7D853A480 "Cell-mediated hypersensitivity and tissue necrosis in tuberculosis" and CON-INF-8658F6CDBBB685 "Epithelioid macrophage and giant-cell granuloma formation in tuberculosis" are microbiology concepts about how the organism produces disease. This record defines a morphological type of necrosis and names tuberculosis as where it is seen. Same disease named, opposite direction of the claim — one explains the immunology, the other identifies the lesion. Both cross-linked, neither merged.
conflicts: No source in this module names a second disease that produces caseation.
uncertainty: The book says caseation occurs "mainly" in tuberculosis without naming the other conditions it occurs in; no 108 INT source lists them.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. Caseation causes dystrophic calcification — the book gives "areas of necrosis as in old tuberculous lesions" as its second example of dystrophic calcification — which is a genuine `causes` edge to CON-FND-33466CEBFC4EBA, owed to a relations batch.

---

# Item
## label
Fat necrosis is traumatic or enzymatic, and the enzymatic form makes chalky calcium soaps
## id
CON-FND-6626C19B61A23B
## canonical_key
necrosis.fat.traumatic-and-enzymatic
## aliases
Fat necrosis
Traumatic fat necrosis
Enzymatic fat necrosis
Calcium soaps
Pancreatic fat necrosis
## arabic_label
النخر الدهني
## arabic_aliases
النخر الدهني الرضحي
النخر الدهني الإنزيمي
## definition
Traumatic fat necrosis follows trauma to adipose tissue: intracellular fat is released and provokes an inflammatory response, macrophages engulf the fat, and fibrosis follows. A common site is the breast, where it produces a palpable mass. Enzymatic fat necrosis occurs in acute pancreatitis, where leaked pancreatic lipase splits mesenteric fat into fatty acids, which combine with calcium to form white calcium soaps.
## explicit_objective
Distinguish the two types of fat necrosis by mechanism and site, and explain why the enzymatic form looks chalky white.
## pitfalls
Calling fat necrosis an intracellular accumulation of fat. It is a type of cell death in adipose tissue; fatty change is the accumulation of triglyceride inside living parenchymal cells, and the 2024 paper used exactly that swap as a distractor.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M02
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Types of necrosis
## nanotopic
Fat necrosis is of two types
## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Fat necrosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-NECROSIS
## related_article_ids
ART-108-PAT-PATHOLOGICAL-CALCIFICATION
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-3B89025E2FB4E0
CON-FND-33466CEBFC4EBA
CON-FND-4CD77608FB35DF
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.8
## academic_relevance
0.95
## weight_confidence
0.85
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p7 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p1 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p1 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p7 | 108 INT
## atomic_claim_ids
CLM-FND-FAT-NECROSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p7] a- Traumatic fat necrosis: Trauma to adipose tissue leads to the release of intracellular fat which provokes an inflammatory response. Macrophages engulf fat and eventually lead to fibrosis. A common site is the breast where it results in a palpable mass.
[Department book p7] b- Enzymatic fat necrosis: In acute pancreatitis, there is leakage of pancreatic lipase, which acts on mesenteric fat cells splitting fat into fatty acids, which combine with calcium to form white calcium soaps.
[Section 1: EOM Q3, 0.5 marks] The following is true about fat necrosis:
[Section 1: EOM Q4, 0.5 marks] Fat necrosis occurs in:
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-GIT-16EC69BD7CC435
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Types of necrosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Fat necrosis) carries the curriculum position instead.
nanotopicId: The module subject tree prints this leaf as "Fat necrosis"; the department book's own heading is "4. Fat necrosis is of two types", which is what the microtopic-level extraction recorded.
approvedFileResourceIds: No file resource has been rights-cleared for this module. The book's own Figure (1.1) of mesenteric fat necrosis is inside a copyrighted PDF and is requested as media on the article instead.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "fat necrosis" and "calcium soaps" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-GIT-16EC69BD7CC435 "Activated pancreatic secretions attack the pancreas" is a gastrointestinal claim about autodigestion of the gland. This record is about what the leaked lipase does to mesenteric fat outside the gland, and what that looks like. A question on the pathogenesis of pancreatitis and a question on the appearance of fat necrosis do not answer each other. Not merged.
conflicts: No source in this module describes fat necrosis differently.
uncertainty: The book does not say whether traumatic fat necrosis also forms calcium soaps; it attaches the soaps only to the enzymatic form.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. Fat necrosis causes dystrophic calcification (CON-FND-33466CEBFC4EBA) — it is item 6 on the book's own list of dystrophic examples — and is often_confused_with steatosis (CON-FND-3B89025E2FB4E0), which is the swap the 2024 distractor tested. Both owed to a relations batch. DIS-PAT-T08 is secondary because the practical book carries a traumatic fat necrosis data-show item.

---

# Item
## label
Fibrinoid necrosis stains like fibrin and marks immune damage to vessels and collagen
## id
CON-FND-BA0739479AD0FC
## canonical_key
necrosis.fibrinoid.immune-vascular-collagen
## aliases
Fibrinoid necrosis
Fibrinoid change
Fibrinoid degeneration
## arabic_label
النخر الفيبريني
## arabic_aliases
النخر الشبيه بالفيبرين
التنكس الفيبريني
## definition
Fibrinoid necrosis is a special form of necrosis in which the necrotic material has staining reactions resembling fibrin: with haematoxylin and eosin the material is deep red and homogeneous. It is seen where collagen is damaged in some autoimmune diseases, such as rheumatoid arthritis, and in immune reactions involving blood vessels, such as polyarteritis nodosa.
## explicit_objective
Name the type of necrosis found in blood vessels in autoimmune disease, and give its appearance on haematoxylin and eosin.
## pitfalls
Reading "fibrinoid" as meaning fibrin is present. The material only resembles fibrin in its staining — the name records an appearance, not a composition.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M02
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T04
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Types of necrosis
## nanotopic
Fibrinoid necrosis
## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Fibrinoid necrosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-NECROSIS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-5CB8B822A9A6AF
CON-FND-4CD77608FB35DF
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## clinical_relevance
0.6
## academic_relevance
0.9
## weight_confidence
0.8
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p7 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p1 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-FIBRINOID-NECROSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p7] Fibrinoid necrosis is a special form of necrosis, where the necrotic material has some staining reactions resembling fibrin. The material is deep red and homogenous with Hematoxylin and eosin stain.
[Department book p7] It is seen with collagen damage in some autoimmune diseases as rheumatoid arthritis and in immune reactions involving blood vessels, e.g. polyarteritis nodosa.
[Section 1: EOM Q4, 0.5 marks] The type of necrosis occurs in the blood vessels in autoimmune diseases:
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
microtopicId: The microtopic column carries "Types of necrosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Fibrinoid necrosis) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Fibrinoid necrosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Fibrinoid necrosis) carries the curriculum position instead.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "fibrinoid necrosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "fibrinoid" and "polyarteritis" — zero label or canonical-key hits. Nothing to reject.
conflicts: No source in this module describes fibrinoid necrosis differently.
uncertainty: The book does not say what the fibrinoid material actually is, only what it stains like; that is the book's own limit and not a gap in this record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. often_confused_with hyaline change (CON-FND-5CB8B822A9A6AF) is the edge that earns its place here: both are homogeneous pink extracellular material on H&E, both are named for an appearance rather than a substance, and both occur in vessel walls. Owed to a relations batch. DIS-PAT-T04 is secondary because the setting is immunopathology.

---

# Item
## label
Apoptosis is energy-dependent deletion of single cells that provokes no inflammation
## id
CON-FND-11D3CBC654E7F3
## canonical_key
apoptosis.definition.programmed-single-cell-no-inflammation
## aliases
Apoptosis
Programmed cell death
Definition of apoptosis
Individual cell deletion
## arabic_label
الاستماتة
## arabic_aliases
موت الخلية المبرمج
الموت الخلوي المبرمج
## definition
Apoptosis is programmed cell death, and it is energy dependent. It is a form of cell death that deletes individual cells: their membranes remain intact, so cell contents are never released into the surrounding tissue, and it therefore does not provoke an inflammatory response.
## explicit_objective
Define apoptosis, and explain from membrane integrity why it causes no inflammation.
## pitfalls
Grouping apoptosis with necrosis as passive death. Apoptosis costs the cell energy, and a cell too depleted of ATP to run it dies by necrosis instead.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M03
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Apoptosis
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Apoptosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-APOPTOSIS
## related_article_ids
ART-108-PAT-NECROSIS
## related_concept_ids
CON-FND-2CDE9A5C884133
CON-FND-46B3AD5A2D8294
CON-FND-C6661CBD045436
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.75
## exam_weight_by_year
KAU_Y1=0.75
## clinical_relevance
0.5
## academic_relevance
0.95
## weight_confidence
0.85
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p8 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p1 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p1 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-APOPTOSIS-DEFINITION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p8] It is a programmed cell death which is energy dependent. It is a form of cell death which leads to the deletion of individual cells. Their membranes remain intact and thus do not provoke an inflammatory response.
[Section 1: EOM Q2, 0.5 marks] Features of apoptosis include all the following except:
[Section 1: EOM Q12, 0.5 marks] Which of the following is true about apoptosis?
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-IMM-7EC2CFBC19A9E9
CON-IMM-8BBDB99CE5FD3C
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Apoptosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Apoptosis) carries the curriculum position instead.
nanotopicId: "Apoptosis" is the level the module subject tree carries for the definition; its three children are causes, morphology and control, each its own record.
approvedFileResourceIds: No file resource has been rights-cleared for this module. The book's Figure 1.2, "Morphology of apoptosis", sits in a copyrighted PDF and is requested as media on the article.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "apoptosis" and "programmed cell death" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-IMM-7EC2CFBC19A9E9 "Apoptosis is a clean self-destructive death involving cellular shrinkage and degradation" is the closest record in live state and was the hardest call in this batch. It is an immunology teaching point on DIS-IMU-T02, framed as what a cytotoxic lymphocyte does to a target — its objective is to explain the killing mechanism, and it carries no statement about energy dependence, single-cell deletion or the absence of inflammation, which are the three things this record is tested on. CON-IMM-8BBDB99CE5FD3C is narrower still, comparing apoptosis with osmotic lysis for speed. Both are cross-linked as neighbours of the general-pathology definition rather than merged into it; folding them together would give one record two objectives and lose the immunology framing that its own article depends on.
conflicts: The immunology records describe apoptosis as the principal cytotoxic-T-cell killing mechanism, which the pathology book lists as one pathological cause among several. That is a difference of emphasis between two courses, not a contradiction, and both are recorded.
uncertainty: The book does not say how a cell that lacks the ATP for apoptosis behaves when the apoptotic signal arrives; the switch to necrosis is not stated in this source.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts and the two live apoptosis concepts under DIS-IMU-T02. often_confused_with necrosis is the highest-value edge in this batch and is written as its own contrast record (CON-FND-2CDE9A5C884133) as well as being owed as a typed edge. contrasts_with CON-IMM-7EC2CFBC19A9E9 would connect the pathology and immunology courses and is owed too, once a claim and citation exist.

---

# Item
## label
Apoptosis is executed by caspases and controlled by the bcl-2 protein family
## id
CON-FND-C6661CBD045436
## canonical_key
apoptosis.control.caspases-and-bcl2
## aliases
Caspases
Bcl2
BCL2
Control of apoptosis
Apoptosis regulation
## arabic_label
تنظيم الاستماتة
## arabic_aliases
الكاسبيزات
عائلة بروتين bcl-2
## definition
Apoptosis is controlled by the bcl-2 protein family and is brought about by the activation of a group of enzymes called caspases. The caspases destroy the nuclear membrane and activate DNAases, which degrade nuclear DNA.
## explicit_objective
Name the enzyme family that executes apoptosis and the protein family that controls it, and state what the caspases do.
## pitfalls
Answering "proteases" when asked which enzymes bring apoptosis about. Caspases are proteases, but the department book's own formative MCQ and the 2024 paper both offer proteases as a distractor and mark caspases as the answer.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M03
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Apoptosis
## nanotopic
Control of apoptosis
## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Apoptosis > Control of apoptosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-APOPTOSIS
## related_article_ids
ART-108-PAT-NECROSIS
## related_concept_ids
CON-FND-11D3CBC654E7F3
CON-FND-46B3AD5A2D8294
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.75
## exam_weight_by_year
KAU_Y1=0.75
## clinical_relevance
0.4
## academic_relevance
0.95
## weight_confidence
0.9
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p8 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p3 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p1 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-APOPTOSIS-CONTROL-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p8] Control of apoptosis: Apoptosis is controlled by the bcl2 protein family. Apoptosis is brought about by the activation of a group of enzymes called caspases. These enzymes result in destroying the nuclear membrane and activating DNAses which degrade nuclear DNA.
[Section 1: EOM Q2, 0.5 marks] Apoptosis is brought about by a group of enzymes called:
[Section 1: EOM Q12, 0.5 marks] Which of the following is true about apoptosis?
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
microtopicId: The microtopic column carries "Apoptosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Apoptosis > Control of apoptosis) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Control of apoptosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Apoptosis > Control of apoptosis) carries the curriculum position instead.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "caspase" and "apoptosis control" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "caspase", "bcl2" and "bcl-2" — zero label or canonical-key hits. Nothing to reject.
conflicts: No source in this module names a different executioner or controller.
uncertainty: The book names the bcl-2 family as the control without saying which members promote and which oppose apoptosis; no 108 INT source separates them.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. This is mechanism_step_before the apoptotic morphology record (CON-FND-46B3AD5A2D8294) — the caspases destroy the nuclear membrane, which is what the described nuclear fragmentation is — and part_of the apoptosis definition. Both owed to a relations batch.

---

# Item
## label
Apoptosis has physiological causes as well as pathological ones
## id
CON-FND-A40D59DAB245EA
## canonical_key
apoptosis.causes.physiological-and-pathological
## aliases
Causes of apoptosis
Physiological apoptosis
Pathological apoptosis
Embryogenesis cell death
## arabic_label
أسباب الاستماتة
## arabic_aliases
الاستماتة الفسيولوجية
الاستماتة المرضية
## definition
Physiologically, apoptosis destroys cells programmed for deletion in embryogenesis, produces hormone-dependent involution such as the endometrium in menstruation, deletes cells in proliferating populations such as intestinal epithelium to hold cell number constant, and removes cells with significant DNA damage before their mutations are passed on. Pathologically it kills virus-infected cells, follows irradiation, eliminates cancer cells including under anticancer drugs, is induced by cytotoxic T lymphocytes in transplant rejection, follows accumulation of misfolded proteins, and produces the pathological atrophy of a parenchymal organ after duct obstruction.
## explicit_objective
Give a physiological and a pathological cause of apoptosis, and explain why deleting a DNA-damaged cell is protective.
## pitfalls
Treating apoptosis as always pathological. The 2025 paper offered "It is pathological only" as a distractor; the largest share of apoptosis in a healthy body is physiological.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M03
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Apoptosis
## nanotopic
Causes of apoptosis
## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Apoptosis > Causes of apoptosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-APOPTOSIS
## related_article_ids
ART-108-PAT-AMYLOIDOSIS
## related_concept_ids
CON-FND-11D3CBC654E7F3
CON-FND-D955408D228002
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.6
## academic_relevance
0.9
## weight_confidence
0.7
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p8 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p3 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-APOPTOSIS-CAUSES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p8] a. Programmed destruction of cells during embryogenesis. b. Hormone dependent involution of tissues e.g. in the endometrium during menstruation. c. Cell deletion in proliferating cell populations (e.g., intestinal epithelium) to maintain a constant cell number. d. Defective cells which acquire significant DNA damage are removed by apoptosis, to get rid of cells with unwanted mutations.
[Department book p8] e. Accumulation of misfolded proteins (e.g., due to inherited defects or due to free radical damage). This may be the basis of cell loss in several neurodegenerative disorders.
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-IMM-8BBDB99CE5FD3C
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Apoptosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Apoptosis > Causes of apoptosis) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Causes of apoptosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Apoptosis > Causes of apoptosis) carries the curriculum position instead.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "causes of apoptosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-IMM-8BBDB99CE5FD3C "Apoptosis is faster than osmotic lysis and is probably the principal cytotoxic-T-cell killing mechanism" overlaps this record at exactly one point — cytotoxic T lymphocytes in transplant rejection, which is item (d) of the book's pathological list. The live record's claim is about the relative speed of two killing mechanisms; this record's is an enumeration of causes across physiology and pathology. One item in common is not one concept. Not merged.
conflicts: No source in this module lists the causes differently.
uncertainty: The book says misfolded-protein accumulation "may be the basis of cell loss in several neurodegenerative disorders" — its own hedge, kept here rather than firmed up.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. Misfolded-protein accumulation appears in both this record and the amyloid pathogenesis record (CON-FND-D955408D228002) — the book makes protein misfolding the common thread between chapter 1's apoptosis and chapter 2's amyloidosis, which is a genuine cross-chapter link and the reason the two are cross-listed here. A typed edge is owed once evidence exists.

---

# Item
## label
An apoptotic cell shrinks with an intact membrane and breaks into apoptotic bodies
## id
CON-FND-46B3AD5A2D8294
## canonical_key
apoptosis.morphology.shrinkage-and-apoptotic-bodies
## aliases
Apoptotic bodies
Morphology of apoptosis
Membrane blebs
Cell shrinkage
## arabic_label
الأجسام الاستماتية
## arabic_aliases
التغيرات الشكلية للاستماتة
تكثف السيتوبلازم
## definition
The cytoplasm condenses and the cell shrinks while the plasma membrane stays intact. The nucleus shrinks and fragments. The cell throws out surface blebs, which then break off as membrane-bound apoptotic bodies, each a dark nuclear fragment surrounded by eosinophilic cytoplasm. Adjacent cells or macrophages remove the apoptotic cells and bodies.
## explicit_objective
Describe the morphological features of apoptosis in order, and identify an apoptotic body from a description.
## pitfalls
Expecting a swollen cell. Apoptosis shrinks the cell; necrosis swells it, and the 2025 paper tested exactly that with cell swelling as a distractor.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M03
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Apoptosis
## nanotopic
Morphological changes
## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Apoptosis > Morphological changes
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-APOPTOSIS
## related_article_ids
ART-108-PAT-NECROSIS
## related_concept_ids
CON-FND-8DA30AD870AC1E
CON-FND-2CDE9A5C884133
CON-FND-C6661CBD045436
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.4
## academic_relevance
0.95
## weight_confidence
0.85
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p8 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p1 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-APOPTOSIS-MORPHOLOGY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p8] 1- The cytoplasm condenses and the cell shrinks, retaining an intact plasma membrane. 2- The nucleus shrinks and fragments. 3- Apoptotic cells show surface blebs which later fragment into membrane bound apoptotic bodies, consisting of a dark nuclear fragment surrounded by eosinophilic cytoplasm. 4- Apoptotic cells and apoptotic bodies are removed by adjacent cells or macrophages.
[Section 1: EOM Q3, 0.5 marks] Apoptosis is characterized by:
[Chapter 1 ILO] Describe morphological features of apoptosis
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-IMM-7EC2CFBC19A9E9
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Apoptosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Apoptosis > Morphological changes) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Morphological changes", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Apoptosis > Morphological changes) carries the curriculum position instead.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "apoptotic bodies" and "membrane blebs" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-IMM-7EC2CFBC19A9E9 "Apoptosis is a clean self-destructive death involving cellular shrinkage and degradation" is a genuine near-miss on one feature, shrinkage. It is an immunology summary of what the death looks like from the killer's side; this record is the four-step morphological sequence a student must reproduce for a "describe" question. The live record could not answer that question and this one could not replace it in its own article. Distinct, cross-linked.
conflicts: No source in this module describes the morphology differently.
uncertainty: The book does not say how long an apoptotic body persists before it is cleared, which is why apoptosis is so much harder to catch on a slide than necrosis; no 108 INT source gives a figure.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. contrasts_with the necrosis morphology record (CON-FND-8DA30AD870AC1E) is the edge that matters — both are nuclear-change lists and students mix them. The caspase record is mechanism_step_before this one. Both owed to a relations batch. DIS-PAT-T08 is secondary because this is a slide-recognition skill.

---

# Item
## label
Necrosis and apoptosis differ in cell size, membrane integrity and inflammation
## id
CON-FND-2CDE9A5C884133
## canonical_key
celldeath.contrast.necrosis-versus-apoptosis
## aliases
Necrosis versus apoptosis
Apoptosis versus necrosis
Comparison of cell death
Types of cell death
## arabic_label
الفرق بين النخر والاستماتة
## arabic_aliases
مقارنة أنماط موت الخلية
## definition
Cell death occurs by two morphological patterns and mechanisms. Necrosis kills a group of cells, swells them, breaks the membrane, spills the contents and provokes inflammation, and it is not energy dependent. Apoptosis deletes individual cells, shrinks them, keeps the membrane intact, packages the remains into apoptotic bodies and provokes no inflammation, and it costs the cell energy. Both fragment the nucleus, which is why the nuclear picture alone does not separate them.
## explicit_objective
Compare necrosis and apoptosis across cell size, membrane integrity, inflammatory response, number of cells and energy requirement.
## pitfalls
Separating the two on the nucleus. Both fragment it — karyorrhexis in necrosis, nuclear fragmentation in apoptosis. The membrane and the inflammatory response are what settle it.
## concept_type
classification
## status
under review
## support_mode
inferred
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M03
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Morphologic Alternations in Cell Injury
## nanotopic
Irreversible Injury
## modules
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Morphologic Alternations in Cell Injury > Irreversible Injury
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-APOPTOSIS
## related_article_ids
ART-108-PAT-NECROSIS
## related_concept_ids
CON-FND-4CD77608FB35DF
CON-FND-11D3CBC654E7F3
CON-FND-46B3AD5A2D8294
CON-FND-8DA30AD870AC1E
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.5
## academic_relevance
0.95
## weight_confidence
0.8
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p5 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p1 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p1 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-NECROSIS-VS-APOPTOSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p5] 2- Irreversible Injury: Cell death occurs primarily through two morphologic patterns and mechanisms: Necrosis and Apoptosis.
[Section 1: EOM Q3, 0.5 marks] Apoptosis is characterized by:
[Section 1: EOM Q12, 0.5 marks] Which of the following is true about apoptosis?
## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication. The comparison table itself is assembled from the book's separate accounts of necrosis and apoptosis rather than taken from one passage, which is why support_mode is inferred.
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
microtopicId: The microtopic column carries "Morphologic Alternations in Cell Injury", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Morphologic Alternations in Cell Injury > Irreversible Injury) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Irreversible Injury", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Cellular Response to Injury > Morphologic Alternations in Cell Injury > Irreversible Injury) carries the curriculum position instead.
approvedFileResourceIds: No file resource has been rights-cleared for this module. A comparison table is requested as media on the apoptosis article.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "necrosis versus apoptosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: This record deliberately overlaps CON-FND-4CD77608FB35DF and CON-FND-11D3CBC654E7F3, both authored in this batch. It is not a merge candidate for either: each of those answers "what is X", this one answers "how do you tell them apart", and a student can hold both definitions and still fail the comparison. The three are cross-linked.
conflicts: No source in this module compares the two differently. The book itself never tabulates the comparison, which is why this record exists at all.
uncertainty: The book states that both are morphological patterns of irreversible injury but does not say whether a cell can begin one and end in the other; the switch is not addressed in this source.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. This record is itself the discharge of the often_confused_with edge between necrosis and apoptosis — written as a concept because a revising student needs the comparison as a testable object, not only as an edge between two other records. The typed edge is still owed to a relations batch, alongside contrasts_with between the two morphology records.

---

# Item
## label
A cell accumulates a substance when production, metabolism or degradation fails
## id
CON-FND-0A32C902A825AA
## canonical_key
accumulation.intracellular.three-routes
## aliases
Intracellular accumulations
Cellular accumulations
Storage diseases
Abnormal accumulation
## arabic_label
التراكمات داخل الخلوية
## arabic_aliases
تراكم المواد داخل الخلية
## definition
Cells accumulate abnormal amounts of substances by three routes. A normal endogenous substance — water, protein, carbohydrate or lipid — is produced at a normal rate but accumulates because the metabolic rate cannot remove it, as with fat in liver cells, or accumulates because of a genetic or acquired defect in its metabolism, as in the lysosomal storage diseases. An abnormal endogenous substance, the product of a mutated gene, accumulates because it is misfolded, mistransported or inadequately degraded, as in alpha-1 antitrypsin disease. An abnormal exogenous substance accumulates in normal cells that cannot degrade it, as with macrophages laden with environmental carbon.
## explicit_objective
Classify a named intracellular accumulation into one of the three routes, and give an example of each.
## pitfalls
Assuming an accumulation means the cell is making too much. Two of the three routes are failures of removal, not of production — the rate of synthesis in fatty liver can be entirely normal.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Intracellular Accumulations
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_article_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## related_concept_ids
CON-FND-3B89025E2FB4E0
CON-FND-2D8B89A2F75643
CON-FND-57B12823E95B52
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.45
## exam_weight_by_year
KAU_Y1=0.45
## clinical_relevance
0.4
## academic_relevance
0.9
## weight_confidence
0.6
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p10 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p2 | 108 INT
## atomic_claim_ids
CLM-FND-INTRACELLULAR-ACCUMULATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p10] 1. A normal endogenous substance a) Water, protein, carbohydrates, & lipids are produced at a normal rate, but accumulate if the metabolic rate is inadequate to remove it (e.g., fat accumulation in liver cells).
[Department book p10] 3. An abnormal exogenous substance may accumulate in normal cells as they are unable to degrade such substances (e.g., macrophages laden with environmental carbon).
[Chapter 2 ILO] Describe morphological changes of different forms of intracellular accumulations.
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
microtopicId: The microtopic column carries "Intracellular Accumulations", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for intracellular accumulations or extracellular deposits — `accumul`, `deposit`, `calcif`, `amyloid`, `hyalin`, `xanthom` and `glycogen` all return zero across all 1,883 nodes in all four views, and SYS-FND-T03 holds only Cell injury and adaptation, Inflammation and repair, and Neoplasia. This concept is the general classification of intracellular accumulations, the opening of the book's chapter 2. SYS-FND-T03-S01-M01 is the nearest defensible existing node because these are reversible cellular changes; it is not where this belongs, and no node ID was invented to fix that.
nanotopicId: "Intracellular Accumulations" is the level the module subject tree carries for the general classification; its children are the individual substances, each its own record.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "intracellular accumulation" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "accumulation", "deposition" and "storage". The hits are hepatic lipid, corpus-luteum cholesterol and breast adipose — all statements about one substance in one tissue, none a classification of the routes. Nothing near enough to reject.
conflicts: No source in this module classifies accumulations differently.
uncertainty: The book gives alpha-1 antitrypsin disease as its example of an abnormal endogenous substance without describing the lesion; a student cannot picture it from this source.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. This is the parent of the steatosis, cholesterol, hyaline, glycogen and pigment records — a genuine `part_of` fan owed to a relations batch. Its route 3 is exactly what the exogenous-pigment record describes, which is why carbon appears in both.

---

# Item
## label
Steatosis is abnormal triglyceride accumulation inside parenchymal cells
## id
CON-FND-3B89025E2FB4E0
## canonical_key
steatosis.definition.triglyceride-in-parenchymal-cells
## aliases
Steatosis
Fatty change
Fatty liver
Hepatic steatosis
Fatty degeneration
## arabic_label
التنكس الدهني
## arabic_aliases
التغير الدهني
الكبد الدهني
## definition
Steatosis, or fatty change, is an abnormal accumulation of triglycerides within parenchymal cells, either from excessive entry of lipid or from defective metabolism of it. It is typically reversible, but it can lead to inflammation and fibrosis. The commonest site is the liver, but it also occurs in the heart, muscle and kidney. The book's causes of hepatic steatosis are alcohol abuse, which it names the commonest cause in the USA, protein malnutrition, diabetes mellitus, obesity, hypoxia and toxins.
## explicit_objective
Define steatosis, name four causes of a fatty liver, and state whether the change is reversible.
## pitfalls
Calling fatty change irreversible because the cell looks so badly disrupted. The book states it is typically reversible; the 2024 paper offered "It is typically irreversible" as a distractor.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Lipids intracellular accumulations
## nanotopic
Steatosis (Fatty Change)
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_concept_ids
CON-FND-A0BC07E35554B1
CON-FND-70554B38361679
CON-FND-2DDF56DA42A0A8
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.8
## academic_relevance
0.95
## weight_confidence
0.85
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p11 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p1 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p6 | 108 INT
## atomic_claim_ids
CLM-FND-STEATOSIS-DEFINITION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p11] Definition: An abnormal accumulation of triglycerides within parenchymal cells either due to excessive entry or defective metabolism. Fatty change is typically reversible, but it can lead to inflammation and fibrosis.
[Department book p11] Causes of hepatic steatosis: include alcohol abuse (most common cause in USA), protein malnutrition, diabetes mellitus, obesity, hypoxia, & toxins.
[Section 1: EOM Q6, 0.5 marks] Which is true about hepatic steatosis:
[Section 2: EOY Q II.2, 2 marks] 4 Causes of fatty liver:
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-GIT-2D2709CD4D9A17
CON-GIT-D5AE5CFC839666
## conflicts
The department book names alcohol abuse the commonest cause of hepatic steatosis "in USA" and does not state the commonest cause in Egypt. Local practice would put hepatitis C, schistosomiasis and metabolic disease higher, but no 108 INT source says so and none is claimed here.
## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Lipids intracellular accumulations", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Steatosis (Fatty Change)", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations and deposits; this concept is the definition and causes of steatosis, from the book's chapter 2. SYS-FND-T03-S01-M01 "Reversible injury" is the nearest defensible existing node, and it is defensible here because the book itself lists fatty change among the morphologies of reversible injury in chapter 1 and states that steatosis is typically reversible. It is still not a node for accumulations. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "steatosis" and "fatty change" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-GIT-2D2709CD4D9A17 "Fatty liver or hepatic steatosis is abnormal extensive hepatic lipid accumulation, mainly triacylglycerol" is the closest live record to anything in this batch and was decided against with care. It sits on DIS-BIO-T04 in a run of five biochemistry concepts about hepatic lipid handling (VLDL capacity, lipotropic factors, carbohydrate overfeeding), and its objective is metabolic: why the liver accumulates triacylglycerol. This record's objective is pathological: what the lesion is called, whether it is reversible, and which clinical causes the paper asks for. A student could hold the biochemistry and still fail "4 causes of fatty liver", and the biochemistry article would be damaged by having the pathology folded into it. Distinct, cross-linked. CON-GIT-D5AE5CFC839666 "Excess hepatic fat can cause chronic inflammation, fibrosis or cirrhosis" overlaps the single clause "can lead to inflammation and fibrosis" and is otherwise a different claim about outcome; also rejected.
uncertainty: The book does not say what proportion of hepatocytes must be involved before the change is called steatosis; no 108 INT source gives a threshold.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts and the five live DIS-BIO-T04 hepatic-lipid concepts. often_confused_with fat necrosis (CON-FND-6626C19B61A23B) is a real edge — the 2024 stem used the swap as a distractor. contrasts_with CON-GIT-2D2709CD4D9A17 would join the pathology and biochemistry courses on one lesion. Both owed to a relations batch.

---

# Item
## label
Hepatic steatosis follows four routes: more fat in, less oxidised, more made, less exported
## id
CON-FND-A0BC07E35554B1
## canonical_key
steatosis.hepatic.pathogenesis-four-routes
## aliases
Pathogenesis of fatty liver
Fatty liver mechanism
Alcohol and fatty liver
Mechanism of steatosis
## arabic_label
إمراض التنكس الدهني الكبدي
## arabic_aliases
آلية حدوث الكبد الدهني
## definition
Steatosis arises from excessive entry or defective metabolism of lipids, and the book gives four routes with an example each: increased fatty acids entering the liver, as in starvation and corticosteroid excess; decreased fatty acid oxidation, as in hypoxia; increased triglyceride formation, as with alcohol; and impaired lipoprotein secretion from the liver, also alcohol.
## explicit_objective
Discuss the pathogenesis of fatty change, and explain why alcohol appears twice on the list.
## pitfalls
Giving alcohol as a single mechanism. It works at two separate steps — it increases triglyceride formation and it impairs lipoprotein export — which is why it is the heaviest cause the book names.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Lipids intracellular accumulations
## nanotopic
Steatosis (Fatty Change)
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_concept_ids
CON-FND-3B89025E2FB4E0
CON-FND-70554B38361679
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.6
## academic_relevance
0.9
## weight_confidence
0.7
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p11 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p5 | 108 INT
## atomic_claim_ids
CLM-FND-HEPATIC-STEATOSIS-PATHOGENESIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p11] Pathogenesis: Excessive entry or defective metabolism of lipids: Increased fatty acids entering the liver (starvation, corticosteroids). Decreased fatty acid oxidation (hypoxia). Increased triglyceride formation (alcohol). Impaired lipoprotein secretion from the liver (alcohol).
[Chapter 2 ILO] Discuss the pathogenesis of fatty change of different organs
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-GIT-5E17AE710409A4
CON-GIT-ADAE9B3037FA58
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Lipids intracellular accumulations", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Steatosis (Fatty Change)", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations and deposits; this concept is the pathogenesis of hepatic steatosis, from the book's chapter 2. SYS-FND-T03-S01-M01 "Reversible injury" is the nearest defensible existing node because the lesion is reversible. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "pathogenesis of fatty liver" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-GIT-5E17AE710409A4 "Overmobilization of adipose fat can exceed hepatic VLDL-synthesis capacity and cause fatty liver" and CON-GIT-ADAE9B3037FA58 "Carbohydrate overfeeding beyond glycogen-storage capacity promotes fatty liver" are two biochemistry mechanism claims on DIS-BIO-T04. Each is one nutritional route stated in metabolic terms; this record is the pathology course's own four-item pathogenesis list with its own examples, and it is what the ILO asks for. Same lesion, different course, different enumeration. Not merged; both cross-linked as neighbours.
conflicts: The biochemistry records name carbohydrate overfeeding and adipose overmobilisation as routes to fatty liver; the pathology book's four routes name neither in those words. Neither list contradicts the other and both are recorded rather than one being picked silently.
uncertainty: The book does not say which of the four routes predominates in alcohol, only that alcohol acts at two of them.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts and the five live DIS-BIO-T04 hepatic-lipid concepts. This record is mechanism_step_before the steatosis morphology record (CON-FND-70554B38361679) and part_of the steatosis definition. Hypoxia (CON-FND-8989A49BEBCF14) causes route two. All owed to a relations batch.

---

# Item
## label
The fatty liver is enlarged, yellow and greasy, with signet-ring hepatocytes
## id
CON-FND-70554B38361679
## canonical_key
steatosis.liver.gross-and-microscopic-signet-ring
## aliases
Signet ring appearance
Fatty liver morphology
Gross picture of fatty liver
Liver steatosis slide
## arabic_label
الشكل المرضي للكبد الدهني
## arabic_aliases
مظهر خاتم الخاتم
الكبد المتضخم الأصفر
## definition
Grossly the fatty liver is enlarged and soft, its borders are rounded, and the cut section is yellow and greasy. Microscopically small intracytoplasmic droplets or large vacuoles of fat accumulate in the liver cells, and the nucleus is flattened and pushed to one side, giving the cell a signet-ring appearance. In a paraffin section the vacuole is empty, because the fat dissolved in xylol and alcohol during processing.
## explicit_objective
Describe the gross and microscopic picture of a fatty liver, and explain why the fat vacuole appears empty on a routine section.
## pitfalls
Describing the fatty liver as shrunken. It is enlarged, with rounded borders that record its softness; the 2024 paper offered "the liver is shrunken, yellow and greasy" as a distractor and the shrinkage is what made it wrong.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Lipids intracellular accumulations
## nanotopic
Steatosis (Fatty Change)
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_article_ids
ART-108-PAT-AMYLOIDOSIS
## related_concept_ids
CON-FND-3B89025E2FB4E0
CON-FND-4354823564BAB3
CON-FND-A0BC07E35554B1
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.65
## exam_weight_by_year
KAU_Y1=0.65
## clinical_relevance
0.6
## academic_relevance
0.95
## weight_confidence
0.8
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p11 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p1 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p6 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p11 | 108 INT
## atomic_claim_ids
CLM-FND-FATTY-LIVER-MORPHOLOGY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p11] Gross picture: Fatty livers are enlarged, and soft. The borders are rounded, and the cut section is yellow and greasy.
[Department book p11] Microscopic picture: Small, intracytoplasmic droplets or large vacuoles of fat accumulate in the liver cells. The nucleus becomes flattened and pushed to one side giving the cell a signet ring appearance.
[Practical book, SLIDE (9)] The vacuole is the site of fat accumulating in the hepatocytes and dissolved in xylol and alcohol during the preparation of the paraffin section, leaving these empty vacuoles.
[Chapter 2 ILO] Describe morphological picture of fatty change of different organs
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-7650D31963FEBD
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Lipids intracellular accumulations", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Steatosis (Fatty Change)", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations and deposits; this concept is the gross and microscopic morphology of hepatic steatosis, from the book's chapter 2 and the practical book's slide 9 and specimen D105-2. SYS-FND-T03-S01-M01 "Reversible injury" is the nearest defensible existing node. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module. A liver-steatosis micrograph and a gross slice are requested as media on the accumulations article.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book and the practical book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "signet ring" and "fatty liver morphology" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-7650D31963FEBD "Glycogen is identified as red granules in liver cells after Best's carmine or PAS", authored for 101 ISK, is the sharpest grain distinction in this batch. Both records are about a vacuole in a liver cell on a processed section, and both explain that the substance dissolved out. But that is a histology identification criterion — which stain demonstrates which inclusion — where this is the pathological lesion, its gross appearance and its cause. A student identifying glycogen on a normal-histology plate and a student diagnosing a fatty liver are answering different questions. Not merged; recorded so the next author does not re-open it.
uncertainty: The book describes both small droplets and large vacuoles without saying which comes first or what determines it; microvesicular against macrovesicular steatosis is not a distinction this source makes.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts and the 101 ISK practical concepts. often_confused_with the glycogen inclusion record (CON-FND-7650D31963FEBD) is a genuine cross-module edge worth writing, and contrasts_with the amyloid liver record (CON-FND-00024C3C0A7C4F), which the book explicitly describes as waxy streaks on a yellow background of fatty change in the same organ. Both owed to a relations batch. DIS-PAT-T08 is secondary because this is examined as a slide and as a museum specimen.

---

# Item
## label
Fatty change of the myocardium is spotty in ischaemia and diffuse in toxaemia
## id
CON-FND-4354823564BAB3
## canonical_key
myocardium.fattychange.spotty-and-diffuse-tabby-cat
## aliases
Tabby cat heart
Thrush breast heart
Fatty heart
Fatty change of the heart
Myocardial fatty change
## arabic_label
التنكس الدهني لعضلة القلب
## arabic_aliases
قلب القط المخطط
## definition
Fatty change occurs in cells involved in or dependent on fat metabolism, which in the heart means the myocardial cells. In the myocardium it can be spotty, in ischaemia, or diffuse, in toxaemia such as diphtheria. The museum specimen shows a yellow myocardium in which the columnae carneae carry brown dots alternating with yellow ones, which is the tabby cat appearance.
## explicit_objective
Explain the difference between spotty and diffuse myocardial fatty change by cause, and identify the tabby cat heart from a gross description.
## pitfalls
Reading the alternating brown and yellow bands as two different lesions. They are one lesion unevenly distributed — the yellow is fat-laden muscle, the brown is muscle that escaped, and the pattern is what the name records.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Lipids intracellular accumulations
## nanotopic
Steatosis (Fatty Change)
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_article_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## related_concept_ids
CON-FND-3B89025E2FB4E0
CON-FND-70554B38361679
CON-FND-063F60318B4D20
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.6
## academic_relevance
0.9
## weight_confidence
0.7
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p5 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p10 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p11 | 108 INT
## atomic_claim_ids
CLM-FND-MYOCARDIAL-FATTY-CHANGE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p5] Fatty change in myocardium can be spotty (in case of ischemia) or diffuse (in case of toxemia e.g. in diphtheria).
[Practical book, C19-1] The myocardium is yellow in color. The Columnae Carnae show brown dots alternating with yellow ones (Tabby cat appearance).
[Chapter 2 ILO] Discuss the clinical significance of fatty change of liver and heart
## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The practical book's specimen C19-1 lists "Hypertrophy and dilatation of right ventricle" in its diagnosis while its own description says the left ventricle shows hypertrophy and dilatation. The two lines of that specimen disagree with each other, so neither ventricle is asserted here.
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
microtopicId: The microtopic column carries "Lipids intracellular accumulations", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Steatosis (Fatty Change)", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations and deposits; this concept is myocardial fatty change and the tabby cat specimen, from the book's chapters 1 and 2 and the practical book. SYS-FND-T03-S01-M01 "Reversible injury" is the nearest defensible existing node. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module. The tabby cat gross specimen is requested as media on the accumulations article.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department and practical books; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "tabby cat" and "fatty change of the heart" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "tabby", "fatty heart" and "myocardial fat" — zero label or canonical-key hits. Nothing to reject.
conflicts: The department book and the practical book agree on the lesion; they disagree only on the ventricle in one specimen, which is recorded under uncertainty rather than here because it is an internal inconsistency in one source, not two sources disputing a fact.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. contrasts_with brown atrophy of the heart (CON-FND-063F60318B4D20) is the edge that earns its place: both are gross heart specimens the same practical examines, both are named for colour, and a student confronted with a discoloured heart must separate a yellow fatty myocardium from a small brown lipofuscin-laden one. Owed to a relations batch. DIS-PAT-T08 is secondary because this is a museum specimen the practical examines.

---

# Item
## label
Cholesterol accumulates as clefts in atheroma and as foamy macrophages in xanthomas
## id
CON-FND-3BB4FF8F2223FF
## canonical_key
cholesterol.accumulation.atheroma-clefts-and-xanthoma
## aliases
Xanthoma
Xanthomas
Cholesterol clefts
Foam cells
Foamy macrophages
Cholesterol esters
## arabic_label
تراكم الكوليسترول
## arabic_aliases
الورم الأصفر
الخلايا الرغوية
## definition
Cholesterol is normally required for cell membranes and for lipid-soluble hormone synthesis and its production is tightly regulated, but it accumulates in several pathological states. In atherosclerosis, cholesterol and cholesterol esters accumulate in the smooth muscle cells and macrophages of the arterial wall, and the extracellular accumulations appear microscopically as cleft-like spaces where the crystals dissolved during processing. In acquired and hereditary hyperlipidaemias, lipids accumulate in foamy macrophages that cluster in subcutaneous tissue and tendons to form masses called xanthomas.
## explicit_objective
Name the substance that builds up in a xanthoma, and explain why cholesterol appears as empty clefts in an atheromatous plaque.
## pitfalls
Naming a xanthoma as a calcium or urate deposit. The 2025 paper offered calcium, uric acid and melanin against lipids; the tendon site invites the gout answer and the substance is lipid.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Lipids intracellular accumulations
## nanotopic
Cholesterol & Cholesterol Esters
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Cholesterol & Cholesterol Esters
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_article_ids
ART-108-PAT-PATHOLOGICAL-CALCIFICATION
## related_concept_ids
CON-FND-0A32C902A825AA
CON-FND-3B89025E2FB4E0
CON-FND-33466CEBFC4EBA
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## clinical_relevance
0.8
## academic_relevance
0.9
## weight_confidence
0.85
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p11 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p3 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p2 | 108 INT
## atomic_claim_ids
CLM-FND-CHOLESTEROL-ACCUMULATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p11] Atherosclerosis: Cholesterol & cholesterol esters accumulate in arterial wall smooth muscle cells & macrophages. Extracellular accumulations appear microscopically as cleft-like spaces (due to dissolved cholesterol crystals during normal histologic processing).
[Department book p11] Xanthomas: In acquired & hereditary hyperlipidemias, lipids accumulate in "foamy" macrophages forming clusters in subcutaneous tissues and tendons producing masses called xanthomas.
[Section 1: EOM Q11, 0.5 marks] Xanthomas are skin or tendon lesions caused by the buildup of which substance?
[Section 1: EOM Q11, 0.5 marks] The following are examples of abnormal lipid deposition:
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-6C2C52E862B410
CON-GYN-C8C64279CF05F4
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Lipids intracellular accumulations", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Cholesterol & Cholesterol Esters) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Cholesterol & Cholesterol Esters", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Cholesterol & Cholesterol Esters) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations and deposits; this concept is cholesterol accumulation in atheroma and xanthoma, from the book's chapter 2. SYS-FND-T03-S01-M01 is the nearest defensible existing node. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "xanthoma" and "cholesterol clefts" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-6C2C52E862B410 "A standard lipid profile includes total cholesterol, HDL cholesterol, LDL cholesterol, and triglycerides" is a pharmacology record listing an investigation's components; it shares the word cholesterol and asserts nothing about tissue accumulation. CON-GYN-C8C64279CF05F4 "Cholesterol accumulation gives corpus luteum its yellow color" is closer in shape — cholesterol accumulating in a tissue and colouring it — but it is a normal physiological finding in the ovary, where this record is pathological deposition. Neither merged; both are word-level collisions rather than claim-level ones.
conflicts: No source in this module describes cholesterol accumulation differently.
uncertainty: The book does not say whether the foamy macrophages of a xanthoma and those of an atheromatous plaque are the same cell doing the same thing; it describes both without connecting them.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. Atheromatous plaques are the book's first example of dystrophic calcification, so this record is prerequisite_of CON-FND-33466CEBFC4EBA — a real cross-section edge owed to a relations batch. part_of the accumulations classification.

---

# Item
## label
Hyaline change names a glassy pink appearance, not a single substance
## id
CON-FND-5CB8B822A9A6AF
## canonical_key
hyaline.change.intracellular-and-extracellular
## aliases
Hyaline change
Hyalinosis
Hyaline degeneration
Russell bodies
Mallory hyaline
Hyaline arteriolosclerosis
## arabic_label
التنكس الزجاجي
## arabic_aliases
التحول الهياليني
أجسام راسل
## definition
Hyaline refers to an alteration within cells or in the extracellular space that gives a homogeneous, glassy, pink appearance on routine haematoxylin and eosin sections. It is a descriptive histological term, not a specific marker of cell injury. Intracellular examples are Russell bodies, hyaline change in plasma cells distended with immunoglobulin in chronic inflammation, and Mallory alcoholic hyaline in hepatocytes in chronic alcoholism. Extracellular examples are the hyalinised collagen of old scars, mesenchymal soft-tissue tumours such as leiomyoma, and the arteriolar walls of long-standing hypertension and diabetes, especially in the kidney, where extravasated plasma protein and basement-membrane material accumulate.
## explicit_objective
Separate intracellular from extracellular examples of hyaline change, and state why the term describes an appearance rather than a substance.
## pitfalls
Treating hyaline as one material with one cause. Russell bodies are immunoglobulin, Mallory hyaline is a hepatocyte inclusion, and arteriolar hyalinosis is plasma protein and basement membrane — the same word for three different substances that happen to look alike.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Hyaline Change
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Hyaline Change
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_article_ids
ART-108-PAT-NECROSIS
ART-108-PAT-AMYLOIDOSIS
## related_concept_ids
CON-FND-BA0739479AD0FC
CON-FND-D955408D228002
CON-FND-0A32C902A825AA
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.55
## exam_weight_by_year
KAU_Y1=0.55
## clinical_relevance
0.5
## academic_relevance
0.9
## weight_confidence
0.8
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p11 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p3 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p2 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p6 | 108 INT
## atomic_claim_ids
CLM-FND-HYALINE-CHANGE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p11] The term hyaline usually refers to an alteration within cells or in the extracellular space that gives a homogeneous, glassy, pink appearance in routine histologic sections stained with hematoxylin and eosin. It is widely used as a descriptive histologic term rather than a specific marker for cell injury.
[Department book p12] a) Russell bodies: This is hyaline change in plasma cells in chronic inflammation due to distension with immunoglobulins
[Practical book, SLIDE (7)] The splenic capsule and fibrous trabeculae show hyalinosis (thickened, structureless, homogenous pink).
[Section 1: EOM Q9, 0.5 marks] Which of the following is an example of intracellular hyaline change?
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-NEU-344CEA02284052
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Hyaline Change", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Hyaline Change) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations and deposits — `hyalin` returns zero across all 1,883 canonical nodes. This concept is hyaline change, from the book's chapter 2. SYS-FND-T03-S01-M01 "Reversible injury" is the nearest defensible existing node, and the book itself calls hyaline change a descriptive term rather than a marker of injury, so even that placement overstates it. No node ID was invented.
nanotopicId: "Hyaline Change" is the deepest node the module subject tree carries; the six examples are the content of this record.
approvedFileResourceIds: No file resource has been rights-cleared for this module. The practical book's splenic hyalinosis slide is requested as media on the accumulations article.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department and practical books; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "hyaline change" and "Russell bodies" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-NEU-344CEA02284052 "Hyalinized centers of meningioma whorls may calcify to form psammoma bodies" is the only live concept whose label carries "hyalin", and it joins hyalinisation to calcification exactly as this batch does. It is nevertheless a neuropathology identification criterion for one tumour on one slide; this record is the general definition of the term across its intracellular and extracellular forms. A student diagnosing a meningioma and a student asked to define hyaline change need different records. Not merged; a genuine cross-link.
conflicts: No source in this module defines hyaline differently. The practical book calls the splenic lesion "hyalinosis" where the theoretical book says "hyaline change"; both spellings are recorded as aliases rather than one being preferred silently.
uncertainty: The book says the biochemical basis of hyalinisation in old scars "is not clear" — its own words, kept rather than resolved.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. often_confused_with fibrinoid necrosis (CON-FND-BA0739479AD0FC) and often_confused_with amyloid (CON-FND-D955408D228002) are both real: all three are homogeneous pink extracellular material on H&E in vessel walls, and telling them apart is a stain question. Both owed to a relations batch. DIS-PAT-T08 is secondary because the practical examines splenic hyalinosis as a slide.

---

# Item
## label
Excess intracellular glycogen appears as clear vacuoles in the glycogen storage diseases
## id
CON-FND-2D8B89A2F75643
## canonical_key
glycogen.accumulation.storage-disease-clear-vacuoles
## aliases
Glycogen storage disease
Glycogenosis
Glycogen accumulation
Glycogen inclusions
## arabic_label
تراكم الغليكوجين
## arabic_aliases
أمراض اختزان الغليكوجين
## definition
Glycogen is commonly stored within cells as a ready energy source. Excessive intracellular deposits, seen as clear vacuoles, occur in the glycogen storage diseases, the glycogenoses.
## explicit_objective
Name the disease group in which excess intracellular glycogen accumulates, and give the appearance of the deposit on a routine section.
## pitfalls
Reading a clear cytoplasmic vacuole as glycogen without a special stain. Fat, water and glycogen all leave clear vacuoles on a routine section; only a stain such as PAS or Best's carmine tells them apart.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T06
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Glycogen
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Glycogen
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_concept_ids
CON-FND-0A32C902A825AA
CON-FND-3B89025E2FB4E0
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.3
## exam_weight_by_year
KAU_Y1=0.3
## clinical_relevance
0.4
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p12 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p1 | 108 INT
## atomic_claim_ids
CLM-FND-GLYCOGEN-ACCUMULATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p12] Glycogen is commonly stored within cells as a ready energy source. Excessive intracellular deposits (seen as clear vacuoles) are seen in glycogen storage diseases (so-called glycogenosis).
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-7650D31963FEBD
## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication. The department book does not name a single glycogen storage disease, so no example is given here.
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
microtopicId: The microtopic column carries "Glycogen", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Glycogen) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations and deposits — `glycogen` returns zero across all 1,883 canonical nodes. This concept is pathological glycogen accumulation, from the book's chapter 2. SYS-FND-T03-S01-M01 is the nearest defensible existing node. No node ID was invented.
nanotopicId: "Glycogen" is the deepest node the module subject tree carries here.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "glycogen storage disease" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-7650D31963FEBD "Glycogen is identified as red granules in liver cells after Best's carmine or PAS", authored for 101 ISK histology, is the nearest record in the repository and a genuinely hard call. It is an identification criterion: which stain demonstrates glycogen and what it looks like when it does. This record is a pathological claim: excess glycogen means a glycogen storage disease, and on a routine section it is a clear vacuole. One question asks "how would you show this is glycogen", the other asks "what does excess glycogen mean". Neither answers the other, and the histology record would be spoiled by having a disease claim folded into it. Not merged, cross-linked, and the stain fact is carried here only as a pitfall pointing at that record.
conflicts: No source in this module describes glycogen accumulation differently.
uncertainty: The book gives no example of a glycogenosis and does not say which organs are affected, so a student cannot go further than the category from this source.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts and the 101 ISK practical concepts. often_confused_with CON-FND-7650D31963FEBD and often_confused_with the steatosis morphology record are both real — three substances, one clear vacuole. Owed to a relations batch. DIS-PAT-T06 is secondary because the glycogenoses are genetic disease.

---

# Item
## label
Inhaled carbon blackens the lung as anthracosis and can fibrose it in coal miners
## id
CON-FND-57B12823E95B52
## canonical_key
pigment.exogenous.carbon-anthracosis-and-tattoo
## aliases
Anthracosis
Carbon pigment
Exogenous pigments
Coal worker's pneumoconiosis
Tattoo pigment
## arabic_label
الأصبغة الخارجية المنشأ
## arabic_aliases
الفحام الرئوي
تصبغ الرئة بالكربون
## definition
Exogenous pigments come from outside the body. Carbon particles in air polluted by factory and car exhaust are inhaled, picked up by alveolar macrophages and carried through lymphatic channels to the tracheobronchial lymph nodes; accumulation blackens the lung tissue and the involved nodes, which is anthracosis. In coal miners the aggregates of carbon dust may induce a fibroblastic reaction and so cause coal worker's pneumoconiosis. Tattoo pigment inoculated into the skin is phagocytosed by dermal macrophages, giving permanent localised pigmentation.
## explicit_objective
Name the pigment that accumulates in anthracosis, trace its route from the air to the lymph node, and state what turns anthracosis into a serious lung disease.
## pitfalls
Treating anthracosis and coal worker's pneumoconiosis as the same thing. Anthracosis is the pigment; the pneumoconiosis is the fibroblastic reaction to a heavy dust load, and only the second one damages the lung.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pigments
## nanotopic
Exogenous Pigments
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Exogenous Pigments
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-0A32C902A825AA
CON-FND-2A370D3EF3EDCF
CON-FND-AA9A76DBB4EE6B
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.55
## exam_weight_by_year
KAU_Y1=0.55
## clinical_relevance
0.6
## academic_relevance
0.9
## weight_confidence
0.8
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p12 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p2 | 108 INT
## atomic_claim_ids
CLM-FND-ANTHRACOSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p12] a- Carbon particles in air polluted by factory and car exhaust. When inhaled it is picked up by macrophages within the alveoli and is then transported through lymphatic channels to the regional lymph nodes in the tracheobronchial region. Accumulations of this pigment blacken the tissues of the lungs (anthracosis) and the involved lymph nodes.
[Department book p12] In coal miners the aggregates of carbon dust may induce a fibroblastic reaction and thus cause a serious lung disease known as coal worker's pneumoconiosis.
[Section 1: EOM Q9, 0.5 marks] In Anthracosis, the lung accumulate:
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-RES-F6434978BBC927
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Exogenous Pigments) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Exogenous Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Exogenous Pigments) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations and deposits — `pigment`, `accumul` and `deposit` all return zero across all 1,883 canonical nodes. This concept is exogenous carbon pigment and anthracosis, from the book's chapter 2. SYS-FND-T03-S01-M01 is the nearest defensible existing node; the pigment is not an injury at all until the fibroblastic reaction starts, so even that placement is a stretch. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "anthracosis" and "carbon pigment" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-RES-F6434978BBC927 and the four other live carbon-monoxide concepts are a substring collision, not a near-miss: they are about a gas that displaces oxygen from haemoglobin, where this is about particulate carbon phagocytosed by macrophages. Recorded here because "carbon" is the search term a later author will reach for and the collision should not be re-investigated.
conflicts: No source in this module describes anthracosis differently.
uncertainty: The book does not say how much carbon load separates harmless anthracosis from pneumoconiosis; it says only that the aggregates "may" induce the reaction.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. This is an instance of route three of the accumulations classification (CON-FND-0A32C902A825AA), which names environmental carbon in macrophages as its own example — an `is_a` edge the book itself makes explicit, owed to a relations batch.

---

# Item
## label
Lipofuscin is wear-and-tear pigment from lipid peroxidation, and it does not harm the cell
## id
CON-FND-2A370D3EF3EDCF
## canonical_key
pigment.lipofuscin.wear-and-tear-lipid-peroxidation
## aliases
Lipofuscin
Lipochrome
Wear-and-tear pigment
Endogenous pigments
## arabic_label
الليبوفوسين
## arabic_aliases
صباغ البلى والتآكل
الصباغ الشحمي
## definition
Lipofuscin is an insoluble endogenous pigment, also called lipochrome or wear-and-tear pigment. It is derived through lipid peroxidation of cellular membranes and is a sign of free-radical injury and lipid peroxidation across the life of the cell, but it is not injurious to the cell or its functions. It appears as a yellow-brown, finely granular, often perinuclear cytoplasmic pigment, and is seen in the liver and heart cells of ageing patients and of patients with severe malnutrition or cancer.
## explicit_objective
State what lipofuscin is derived from, describe its microscopic appearance, and say whether it damages the cell that holds it.
## pitfalls
Treating lipofuscin as a cause of injury because it marks free-radical damage. It is a residue, not an agent — the book states outright that it is not injurious to the cell or its functions.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pigments
## nanotopic
Endogenous Pigments
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## related_article_ids
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## related_concept_ids
CON-FND-063F60318B4D20
CON-FND-7B96FFE8FC4285
CON-FND-5DBC795B58DC74
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.55
## exam_weight_by_year
KAU_Y1=0.55
## clinical_relevance
0.4
## academic_relevance
0.9
## weight_confidence
0.8
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p12 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p2 | 108 INT
## atomic_claim_ids
CLM-FND-LIPOFUSCIN-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p12] Lipofuscin is an insoluble pigment, also known as lipochrome or wear-and-tear pigment. Lipofuscin is derived through lipid peroxidation of cellular membranes. Lipofuscin is not injurious to the cell or its functions.
[Department book p13] It appears as a yellow brown, finely granular cytoplasmic, often perinuclear, pigment. It is seen in the liver and heart cells of aging patients or patients with severe malnutrition and cancer.
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
microtopicId: The microtopic column carries "Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Endogenous Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations and deposits. This concept is lipofuscin, an endogenous pigment, from the book's chapter 2. SYS-FND-T03-S01-M01 is the nearest defensible existing node, and it is a poor fit precisely because the book insists lipofuscin is not injurious. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "lipofuscin" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "lipofuscin", "lipochrome" and "wear-and-tear" — zero label or canonical-key hits, and find-existing.mjs reports "No existing record matches" across live and pending batches. Nothing to reject.
conflicts: No source in this module describes lipofuscin differently.
uncertainty: The book says lipofuscin accumulates in ageing, malnutrition and cancer without saying what the three have in common; the connection to free-radical load is stated for ageing only.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. Free-radical injury (CON-FND-7B96FFE8FC4285) causes lipofuscin — the book states it in both chapters — and lipofuscin is part_of brown atrophy of the heart (CON-FND-063F60318B4D20). Both are genuine typed edges owed to a relations batch.

---

# Item
## label
Brown atrophy is a small brown senile heart loaded with lipofuscin
## id
CON-FND-063F60318B4D20
## canonical_key
atrophy.heart.brown-atrophy-with-lipofuscin
## aliases
Brown atrophy
Brown atrophy of the heart
Senile atrophy of the heart
Serous atrophy of fat
## arabic_label
الضمور البني للقلب
## arabic_aliases
ضمور القلب الشيخي
الضمور المصلي للدهن
## definition
Brown atrophy of the heart is a senile atrophy of the heart with an excess of lipofuscin pigment. Grossly the heart is reduced in size and brown, the coronaries appear more tortuous because normal-length arteries now run over a smaller heart, and the pericardial fat is replaced by oedematous jelly-like tissue, which is serous atrophy of the fat. Microscopically the muscle fibres are thin and atrophic, and excess fine yellow-brown lipofuscin granules sit on both sides of the nucleus in haematoxylin and eosin sections.
## explicit_objective
Discuss the pathogenesis of brown atrophy of the heart and describe its gross and microscopic morphology, including why the coronaries look tortuous.
## pitfalls
Explaining the tortuous coronaries as a disease of the arteries. The arteries are unchanged; the heart under them has shrunk, so the same length of vessel must now take a winding course.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M04
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pigments
## nanotopic
Endogenous Pigments
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-2A370D3EF3EDCF
CON-FND-DF726F864C8BC3
CON-FND-4354823564BAB3
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## clinical_relevance
0.5
## academic_relevance
0.95
## weight_confidence
0.85
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p13 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p5 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p10 | 108 INT
## atomic_claim_ids
CLM-FND-BROWN-ATROPHY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p13] Brown atrophy of the heart: This is a senile atrophy of the heart with an excess lipofuscin pigment
[Department book p13] The heart is reduced in size and brown in color. The coronaries appear more tortuous due to the decreased size of the heart with normal length arteries. The pericardial fat is replaced by edematous jelly-like tissue (serous atrophy of the fat)
[Section 2: EOY Q I.2, 1 mark] Brown Atrophy of the heart:
[Chapter 2 ILO] Discuss pathogenesis of brown atrophy of the heart
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-DER-3076014D01EA15
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Endogenous Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments) carries the curriculum position instead.
primaryNodeId: Placed under protest, but the least stretched of the chapter 2 records. Atrophy is genuinely one of the four adaptations the canonical node SYS-FND-T03-S01-M04 covers, and this lesion is an atrophy — so the placement is defensible for half the concept. The other half, the excess lipofuscin that makes it brown and gives it its name, is a pigment accumulation, and the canonical tree has no node for pigments or accumulations anywhere in its 1,883 nodes. Flagged with the other chapter 2 records so a reviewer walking the mis-homed set sees this one too. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module. The practical book's specimen C18-1 is requested as media on the pigments article.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department and practical books; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "brown atrophy" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-DER-3076014D01EA15 "Age-related elastic-fiber atrophy reduces skin elasticity and causes wrinkling" is the only live concept whose label carries "atroph". It is an ageing change in skin connective tissue; this is an ageing change in cardiac muscle with a named pigment and a named gross specimen. They share only the word and the general theme of senescence. Not merged.
conflicts: No source in this module describes brown atrophy differently. The practical specimen adds aortic atherosclerosis to the same heart, which is a second lesion on one specimen rather than a disagreement.
uncertainty: The book does not say whether the lipofuscin causes the atrophy or merely accumulates alongside it; given its own statement that lipofuscin is not injurious, the pigment is presumably a marker, but the book does not say so.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. is_a atrophy (CON-FND-DF726F864C8BC3), contains lipofuscin as part_of (CON-FND-2A370D3EF3EDCF), and contrasts_with the tabby-cat fatty heart (CON-FND-4354823564BAB3) — the pair of discoloured heart specimens the same practical sets side by side. All three owed to a relations batch. DIS-PAT-T08 is secondary because C18-1 is a museum specimen the practical examines.

---

# Item
## label
Melanin is made by tyrosinase, and five named conditions increase it
## id
CON-FND-AA9A76DBB4EE6B
## canonical_key
pigment.melanin.tyrosinase-and-hyperpigmentation
## aliases
Melanin
Hyperpigmentation
Chloasma
Cafe au lait patches
Addison pigmentation
Melanocyte
## arabic_label
الميلانين
## arabic_aliases
فرط التصبغ
الكلف
بقع القهوة بالحليب
## definition
Melanin is an endogenous, non-haemoglobin-derived brown-black pigment formed when the enzyme tyrosinase catalyses the oxidation of tyrosine to dihydroxyphenylalanine in melanocytes. The book names five conditions in which melanin is increased: prolonged exposure to the sun; melanocytic naevi and melanomas; chloasma of pregnancy, brown patches on the face, nipple and genitalia from hormonal change; Addison's disease, where hyperpigmentation of sun-exposed areas and pressure points such as the neck, elbows, knees and knuckles is characteristic, caused by raised pro-opiomelanocortin from the anterior pituitary, the precursor of both ACTH and melanocyte-stimulating hormone; and café-au-lait patches in neurofibromatosis.
## explicit_objective
Discuss the causes of increased melanin pigmentation, and explain why primary adrenal failure darkens the skin.
## pitfalls
Explaining Addison's pigmentation by cortisol deficiency directly. The pigment comes from raised pro-opiomelanocortin, the shared precursor of ACTH and MSH — which is why it is primary adrenal disease and not secondary that darkens the skin.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pigments
## nanotopic
Endogenous Pigments
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-57B12823E95B52
CON-FND-2A370D3EF3EDCF
CON-FND-B9A3C8B28B1443
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## clinical_relevance
0.7
## academic_relevance
0.9
## weight_confidence
0.8
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p13 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p2 | 108 INT
## atomic_claim_ids
CLM-FND-MELANIN-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p13] Melanin is an endogenous, non-hemoglobin-derived, brown-black pigment formed when the enzyme tyrosinase catalyzes the oxidation of tyrosine to dihydroxyphenylalanine in melanocytes.
[Department book p13] 3. Chloasma of pregnancy: Brown patches in the skin of the face, nipple and genitalia due to hormonal changes. 4. Addison's disease... 5. Café au lait patches in neurofibromatosis.
[Section 1: EOM Q8, 0.5 marks] Café au lait patches in neurofibromatosis are related to deposition of:
[Chapter 2 ILO] Discuss Causes of increased melanin pigmentation (Hyperpigmentation)
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-DER-6665EA8EA687C3
CON-END-F5DE310BFC53C5
CON-DER-AE64BA2838BC30
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Endogenous Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations or pigments. This concept is melanin and the causes of hyperpigmentation, from the book's chapter 2. SYS-FND-T03-S01-M01 is the nearest defensible existing node; increased melanin is not a cell injury at all, so the fit is poor. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "melanin" and "hyperpigmentation" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Three live records were weighed. CON-DER-6665EA8EA687C3 "Albinism is absent melanin production caused by a genetic defect in tyrosinase synthesis" is the closest: same enzyme, same pathway, but its objective is a named genetic disease of pigment loss, where this record enumerates the causes of pigment excess. A student can answer either without the other. CON-END-F5DE310BFC53C5 "ACTH-dependent Cushing syndrome causes skin pigmentation through melanocyte-stimulating activity" is the same mechanism in a different endocrine disease — the book here names Addison's, and the live record names Cushing's; two applications of one pathway, and merging them would file an endocrinology teaching point inside a general-pathology list. CON-DER-AE64BA2838BC30 "Melanoma has scant vascular stroma with extracellular melanin deposits" is a tumour identification criterion. None merged; all three cross-linked so a later author sees the pathway is taught in three courses.
conflicts: The endocrinology record attributes ACTH-driven pigmentation to Cushing syndrome and this book attributes it to Addison's disease. Both are true of raised POMC and neither contradicts the other; recorded rather than silently resolved.
uncertainty: The book gives chloasma as due to "hormonal changes" without naming which hormone; no 108 INT source is more specific.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts and the three live melanin concepts across DIS-HIS-T03 and DIS-PHY-T06. contrasts_with CON-DER-6665EA8EA687C3 (excess against absence, one enzyme) is the edge most worth writing, and this record shares its POMC mechanism with the bronze diabetes record (CON-FND-B9A3C8B28B1443), where increased melanotropin adds skin melanin to the iron. Both owed to a relations batch.

---

# Item
## label
Haemosiderin is stored excess iron, deposited locally after bleeding or throughout the body in overload
## id
CON-FND-5DBC795B58DC74
## canonical_key
pigment.haemosiderin.localised-and-generalised-iron-overload
## aliases
Haemosiderin
Hemosiderin
Haemosiderosis
Hemosiderosis
Prussian blue
Ferritin
## arabic_label
الهيموسيدرين
## arabic_aliases
داء ترسب الهيموسيدرين
صباغ الحديد
## definition
Haemosiderin is a haemoglobin-derived, golden yellow-to-brown granular pigment. Iron is carried by transferrin and stored bound to apoferritin as ferritin micelles; when there is a local or systemic excess of iron, ferritin aggregates into haemosiderin granules that are easily seen with the light microscope. Localised haemosiderosis follows haemorrhage into tissue, where macrophages break down extravasated red cells over several days, as in chronic venous congestion of the lung. Generalised haemosiderosis follows systemic iron overload, whose three causes are increased absorption of dietary iron, haemolytic anaemias releasing abnormal quantities of iron from erythrocytes, and repeated blood transfusion. Iron appears as a coarse golden granular cytoplasmic pigment and is demonstrated by the Prussian blue reaction; in most cases of systemic haemosiderosis it does not damage the parenchymal cells or impair organ function.
## explicit_objective
Give three causes of generalised haemosiderosis, name the stain that demonstrates iron, and separate localised from generalised deposition.
## pitfalls
Assuming iron deposition means organ damage. The book states that in most instances of systemic haemosiderosis the pigment does not damage parenchymal cells or impair function — it is haemochromatosis, with its far heavier load, that injures.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pigments
## nanotopic
Endogenous Pigments
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-B9A3C8B28B1443
CON-FND-C96C66BC1A17DF
CON-FND-2A370D3EF3EDCF
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.65
## exam_weight_by_year
KAU_Y1=0.65
## clinical_relevance
0.7
## academic_relevance
0.95
## weight_confidence
0.85
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p13 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p8 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p2 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p8 | 108 INT
## atomic_claim_ids
CLM-FND-HEMOSIDERIN-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p13] Hemosiderin is a hemoglobin-derived, golden yellow-to-brown, granular pigment.
[Department book p14] The main causes of generalized hemosiderosis are: 1- Increased absorption of dietary iron. 2- Hemolytic anemias, in which abnormal quantities of iron are released from erythrocytes. 3- Repeated blood transfusions because the transfused red cells constitute an exogenous load of iron.
[Department book p14] In most instances of systemic hemosiderosis, the pigment does not damage the parenchymal cells or impair organ function.
[Section 2: End of year Q2a, 2 marks] Two causes of generalised haemosiderosis
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-HEM-881E8EA781D8E2
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Endogenous Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations or pigments. This concept is haemosiderin and haemosiderosis, from the book's chapter 2. SYS-FND-T03-S01-M01 is the nearest defensible existing node; the book says the deposit usually does no harm, so calling it a cell injury overstates it. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module. The practical book's Prussian blue plate is requested as media on the pigments article.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department and practical books; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "hemosiderin" and "iron overload" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-HEM-881E8EA781D8E2 "Erythrocyte breakdown yields excreted bile pigments while iron is reused for new erythrocytes" is the normal-physiology counterpart: what happens to haem iron when the system is working. This record is what happens when it is not — the same iron, retained rather than reused, and visible as a pigment. A haematology question on red-cell turnover and a pathology question on the causes of haemosiderosis do not answer each other. Not merged; cross-linked because the two together make the pathway whole.
conflicts: No source in this module describes haemosiderin differently.
uncertainty: The book does not say how much iron load separates harmless systemic haemosiderosis from the damaging overload of haemochromatosis, only that the second injures and the first usually does not.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. prerequisite_of haemochromatosis (CON-FND-B9A3C8B28B1443) and contrasts_with haemozoin (CON-FND-C96C66BC1A17DF), which is the pair the 2024 paper separated on the Prussian blue reaction. Both owed to a relations batch. DIS-PAT-T08 is secondary because the practical examines the Prussian blue plate.

---

# Item
## label
Primary haemochromatosis is a chromosome-6 defect that loads the body with iron
## id
CON-FND-B9A3C8B28B1443
## canonical_key
haemochromatosis.primary.bronze-diabetes
## aliases
Haemochromatosis
Hemochromatosis
Bronze diabetes
Primary haemochromatosis
Iron overload
## arabic_label
داء ترسب الأصبغة الدموية
## arabic_aliases
السكري البرونزي
فرط تحميل الحديد
## definition
Primary haemochromatosis is the commonest form of iron overload. It is a congenital disorder from a gene defect on chromosome 6; heterozygotes absorb more iron, but only homozygotes reach dangerous levels. The defect increases iron absorption in the small intestine even when transferrin is fully saturated. In the liver, haemosiderin appears as golden-yellow granules in periportal hepatocytes that stain blue with Prussian blue; with increasing load the rest of the lobule, the bile duct epithelium and the Kupffer cells become pigmented, the liver is slightly enlarged, dense and chocolate brown, and fibrous septa develop slowly into a micronodular cirrhosis in an intensely pigmented liver. In advanced disease iron is deposited in the endocrine glands — pancreas, adrenal, pituitary and thyroid. Bronze diabetes is iron-induced damage to the pancreatic islets together with increased pituitary melanotropin, which raises skin melanin on top of the haemosiderin already deposited in the skin. Deposition in the heart can lead to heart failure.
## explicit_objective
Explain what makes a diabetic patient bronze, and describe the hepatic changes of primary haemochromatosis.
## pitfalls
Attributing the bronze colour to iron alone. The book makes it two pigments — haemosiderin deposited in the skin and extra melanin from increased pituitary melanotropin — which is why the name says bronze and not grey.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T06
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pigments
## nanotopic
Endogenous Pigments
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-5DBC795B58DC74
CON-FND-AA9A76DBB4EE6B
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## clinical_relevance
0.8
## academic_relevance
0.9
## weight_confidence
0.8
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p14 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p2 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p8 | 108 INT
## atomic_claim_ids
CLM-FND-HAEMOCHROMATOSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p14] Primary hemochromatosis is the most common form of iron overload. It is a congenital disorder due to a gene defect on chromosome 6. Heterozygotes have increased absorption of iron, but only in homozygotes does this reach dangerous levels.
[Department book p15] The clinical syndrome Bronze diabetes is due to iron–induced damage of pancreatic islets and increased melanotropin secretion by pituitary leading to excess melanin production in skin, in addition to hemosiderin deposition in the skin.
[Section 1: EOM Q10, 0.5 marks] Bronze diabetes occurs in:
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
microtopicId: The microtopic column carries "Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Endogenous Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations or pigments, and `hemochromat` returns zero across all 1,883 canonical nodes. This concept is primary haemochromatosis and bronze diabetes, from the book's chapter 2. SYS-FND-T03-S01-M01 is the nearest defensible existing node; a genetic iron-overload disease is not a reversible cell injury and the fit is poor. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module. The practical book's Prussian blue hepatic haemochromatosis plate is requested as media on the pigments article.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department and practical books; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "hemochromatosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "hemochromat", "haemochromat" and "bronze" — zero label or canonical-key hits, and find-existing.mjs reports "No existing record matches" across live and pending batches. Nothing to reject.
conflicts: No source in this module describes haemochromatosis differently.
uncertainty: The book names a gene defect on chromosome 6 without naming the gene; no 108 INT source is more specific, and the gene is not asserted here.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. is_a generalised haemosiderosis at a heavier load (CON-FND-5DBC795B58DC74) and shares the melanotropin mechanism with the melanin record (CON-FND-AA9A76DBB4EE6B) — the only place in this module where two pigment pathways meet in one clinical sign. Both owed to a relations batch. DIS-PAT-T06 is secondary because this is a genetic disease.

---

# Item
## label
Hemozoin is the iron pigment made by blood-feeding parasites, and Prussian blue misses it
## id
CON-FND-C96C66BC1A17DF
## canonical_key
pigment.haemozoin.blood-feeding-parasites
## aliases
Hemozoin
Haemozoin
Malaria pigment
Parasitic pigment
## arabic_label
الهيموزوين
## arabic_aliases
صباغ الملاريا
## definition
Hemozoin is a brownish iron-containing pigment produced by parasites feeding on blood cells, in malaria and in bilharziasis. It is not reactive to Prussian blue. The pigment is released into the blood and taken up by the macrophages of the liver, spleen and other organs.
## explicit_objective
Name the pigment associated with parasitic infection, and give the stain result that separates it from haemosiderin.
## pitfalls
Expecting an iron-containing pigment to stain with Prussian blue. Hemozoin contains iron and does not react, which is the single feature that tells it from haemosiderin in the same macrophage in the same organ.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pigments
## nanotopic
Endogenous Pigments
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-5DBC795B58DC74
CON-FND-57B12823E95B52
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.7
## academic_relevance
0.85
## weight_confidence
0.75
## confidence
0.9
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p15 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p2 | 108 INT
## atomic_claim_ids
CLM-FND-HEMOZOIN-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p15] Hemozoin is a brownish iron containing pigment that is produced by parasites feeding on blood cells as malaria and bilharziasis. It is not reactive to Prussian blue. The pigments are released in blood and taken by macrophages of liver, spleen and other organs.
[Section 1: EOM Q12, 0.5 marks] The pigment associated with parasitic infection:
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-INF-76B90F4D91B733
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Endogenous Pigments", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical tree has no node for cellular accumulations or pigments. This concept is hemozoin, an endogenous pigment, from the book's chapter 2. SYS-FND-T03-S01-M01 is the nearest defensible existing node; a parasite's waste product taken up by macrophages is not a cell injury. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "hemozoin" and "malaria pigment" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-INF-76B90F4D91B733 "Growing malaria trophozoites metabolize hemoglobin and produce hemozoin pigment" is a parasitology concept on DIS-PAR-T01, part of a life-cycle sequence: what the trophozoite does inside the red cell. This record is a general-pathology pigment concept: what the substance is, that bilharziasis makes it too, and that Prussian blue does not stain it. One question asks how malaria makes the pigment, the other asks how to tell the pigment from haemosiderin down a microscope. Not merged; cross-linked, because a student who has both gets the whole story.
conflicts: No source in this module describes hemozoin differently. Local epidemiology matters here and the book reflects it: bilharziasis is named alongside malaria, which a Western text would usually omit.
uncertainty: The book says the pigment is iron containing and does not react to Prussian blue, without saying why the iron is unavailable to the reaction.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts and the live DIS-PAR-T01 malaria concepts. often_confused_with haemosiderin (CON-FND-5DBC795B58DC74) is the edge that earns its place: both are brown, both contain iron, both sit in liver and spleen macrophages, and one stain separates them. Owed to a relations batch.

---

# Item
## label
Dystrophic calcification is calcium laid down in already damaged tissue at a normal serum calcium
## id
CON-FND-33466CEBFC4EBA
## canonical_key
calcification.dystrophic.damaged-tissue-normal-calcium
## aliases
Dystrophic calcification
Pathological calcification
Calcification in dead tissue
Lithopedion
## arabic_label
التكلس التصنعي
## arabic_aliases
التكلس المرضي
ترسب الكالسيوم في الأنسجة التالفة
## definition
Pathological calcification is abnormal deposition of calcium salts in tissue other than teeth or bone. Dystrophic calcification occurs in tissues already affected by disease, with a normal serum calcium, and is due to local precipitation of insoluble calcium salts. The book's examples are atheromatous plaques, congenital bicuspid aortic valves, areas of necrosis such as old tuberculous lesions, old thrombi, lithopedion — a dead retained fetus — and fat necrosis.
## explicit_objective
Define dystrophic calcification, state the serum calcium in it, and give four examples of tissues in which it occurs.
## pitfalls
Reading calcification as a sign that the calcium level is high. Dystrophic calcification happens at a normal serum calcium; it is the tissue that is abnormal, not the blood.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pathological Calcification
## nanotopic
Dystrophic calcification
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Dystrophic calcification
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-PATHOLOGICAL-CALCIFICATION
## related_article_ids
ART-108-PAT-NECROSIS
## related_concept_ids
CON-FND-87392C49DB246C
CON-FND-718662116D90C4
CON-FND-4CD77608FB35DF
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.7
## academic_relevance
0.95
## weight_confidence
0.85
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p15 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p2 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p8 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p11 | 108 INT
## atomic_claim_ids
CLM-FND-DYSTROPHIC-CALCIFICATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p15] This is an abnormal deposition of calcium salts in tissue other than teeth or bone. Calcification may be dystrophic or metastatic.
[Department book p15] It occurs in tissues already affected by disease. Serum calcium is normal. The calcification is due to local precipitation of insoluble calcium salts.
[Department book p15] Examples: 1. Atheromatous plaques. 2. Congenital bicuspid aortic valves. 3. Areas of necrosis as in old tuberculous lesions. 4. Old thrombi. 5. Lithopedion (dead fetus). 6. Fat necrosis.
[Section 1: EOM Q6, 0.5 marks] Dystrophic calcification occurs in:
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-3FC9145CE14DD4
CON-NEU-344CEA02284052
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Pathological Calcification", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Dystrophic calcification) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Dystrophic calcification", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Dystrophic calcification) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for pathological calcification anywhere — `calcif` returns zero across all 1,883 nodes in all four views. This concept is dystrophic calcification, the book's chapter 2 heading PATHOLOGICAL CALCIFICATION. It is placed at the section node SYS-FND-T03-S01 "Cell injury and adaptation" rather than a microtopic beneath it, because calcification in damaged tissue is neither reversible injury nor necrosis nor apoptosis nor an adaptation, and forcing it into one of the four would be a worse claim than the section itself. No node ID was invented; SYS-FND-T03-S04 does not exist and is not written here.
approvedFileResourceIds: No file resource has been rights-cleared for this module. The practical book's dystrophic calcification slide and its calcified fibroma specimen are requested as media on the calcification article.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department and practical books; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "dystrophic calcification" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-3FC9145CE14DD4 "Posterior acoustic shadowing" is an imaging-physics concept that mentions calcification as a strong reflector; it shares the word and asserts nothing about how or where calcium is deposited. CON-NEU-344CEA02284052 "Hyalinized centers of meningioma whorls may calcify to form psammoma bodies" is genuinely an instance of dystrophic calcification — calcium precipitating in altered tissue — but it is a neuropathology identification criterion for one tumour, and this record is the general category with the serum calcium that defines it. Neither merged; the second is cross-linked as an example the general rule covers.
conflicts: No source in this module describes dystrophic calcification differently.
uncertainty: The book says the calcification is due to "local precipitation of insoluble calcium salts" without saying what in damaged tissue makes precipitation favourable; no 108 INT source explains the local mechanism.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. Necrosis, caseation, fat necrosis and atheroma all cause this — four `causes` edges the book states explicitly on its own example list, and the densest cluster of real typed edges in the batch. All owed to a relations batch. DIS-PAT-T08 is secondary because the practical carries two calcification items.

---

# Item
## label
Metastatic calcification is calcium laid down in living tissue because the blood level is high
## id
CON-FND-87392C49DB246C
## canonical_key
calcification.metastatic.viable-tissue-hypercalcaemia
## aliases
Metastatic calcification
Hypercalcaemia calcification
Nephrocalcinosis
Milk alkali syndrome
## arabic_label
التكلس النقيلي
## arabic_aliases
التكلس بسبب فرط كالسيوم الدم
تكلس الكلية
## definition
Metastatic calcification occurs in viable tissues in cases of hypercalcaemia. The book's causes are elevated parathyroid hormone — from a parathyroid tumour, from ectopic secretion by another neoplasm, or secondary hyperparathyroidism in chronic renal failure; bone destruction, as in primary marrow malignancy such as multiple myeloma, diffuse skeletal metastasis such as breast cancer, accelerated bone turnover in Paget's disease, or immobilisation; hypervitaminosis D; and, less commonly, the milk-alkali syndrome from excessive ingestion of calcium and absorbable antacids. The deposits sit in the interstitial tissue of the gastric mucosa, kidney, lungs, systemic arteries and pulmonary veins. They usually cause no clinical dysfunction, but massive deposits in the kidney — nephrocalcinosis — may in time cause renal failure.
## explicit_objective
Enumerate four causes of metastatic calcification, name its main sites of deposition, and state the one that can cause organ failure.
## pitfalls
Reading "metastatic" as meaning cancer has spread there. It means the calcium travelled, not the tumour — the tissue receiving it is viable and normal.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pathological Calcification
## nanotopic
Metastatic calcification
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Metastatic calcification
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-PATHOLOGICAL-CALCIFICATION
## related_article_ids
ART-108-PAT-AMYLOIDOSIS
## related_concept_ids
CON-FND-33466CEBFC4EBA
CON-FND-718662116D90C4
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.8
## academic_relevance
0.95
## weight_confidence
0.85
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p16 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p2 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p5 | 108 INT
## atomic_claim_ids
CLM-FND-METASTATIC-CALCIFICATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p15] Calcification occurs in viable tissues in cases of hypercalcemia.
[Department book p16] 1. Elevated parathyroid hormone e.g. hyperparathyroidism due to parathyroid tumors or ectopic parathyroid hormone secreted by other neoplasms. Or Secondary hyperparathyroidism in chronic renal failure.
[Department book p16] Usually, deposits cause no clinical dysfunction. Massive deposits in the kidney (nephrocalcinosis) may in time cause renal failure.
[Section 1: EOM Q7, 0.5 marks] Hyperparathyroidism commonly causes:
[Section 2: EOY Q II.1, 2 marks] 4 Causes of metastatic calcification:
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-END-D6A4BA9B54463D
CON-END-907406BCFC6CE7
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Pathological Calcification", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Metastatic calcification) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Metastatic calcification", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Metastatic calcification) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for pathological calcification — `calcif` returns zero across all 1,883 nodes. This concept is metastatic calcification, from the book's chapter 2. It is placed at the section node SYS-FND-T03-S01 because the tissue receiving the calcium is viable, so none of the four microtopics beneath — reversible injury, necrosis, apoptosis, adaptation — describes it at all. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "metastatic calcification" and "nephrocalcinosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-END-D6A4BA9B54463D "Hypercalcemia is described as the biochemical hallmark of primary hyperparathyroidism" and CON-END-907406BCFC6CE7 "Primary hyperparathyroidism is attributed to a parathyroid tumour" are endocrinology concepts about a gland disease and its biochemistry. This record is about what a raised calcium does to tissues that were previously normal, and about the other three causes the endocrine records do not touch. A question on the hallmark of hyperparathyroidism and a question asking for four causes of metastatic calcification do not answer each other. Neither merged; both cross-linked, since the endocrine pair supplies the mechanism for the pathology list's first item.
conflicts: No source in this module lists the causes differently.
uncertainty: The book does not say why the gastric mucosa, kidney and lung are the preferred sites; the acid-secreting or acid-excreting explanation is not given in this source and is not asserted here.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. contrasts_with dystrophic calcification (CON-FND-33466CEBFC4EBA) is the edge, and it is discharged as its own contrast record (CON-FND-718662116D90C4). Multiple myeloma appears both here, as a cause of bone destruction, and in the amyloid records as the source of AL protein — a coincidence of disease rather than a typed edge, and not written as one.

---

# Item
## label
The two calcifications look identical; only the serum calcium tells them apart
## id
CON-FND-718662116D90C4
## canonical_key
calcification.dystrophic-versus-metastatic.serum-calcium
## aliases
Dystrophic versus metastatic calcification
Morphology of calcification
Chalky white deposits
Basophilic calcium deposits
## arabic_label
الفرق بين التكلس التصنعي والنقيلي
## arabic_aliases
مقارنة أنواع التكلس المرضي
## definition
Both dystrophic and metastatic calcification look the same. Grossly the deposit is chalky white granular material; microscopically calcium salts have a basophilic amorphous granular appearance. What separates them is not the deposit but the setting: dystrophic calcification is in tissue already damaged, at a normal serum calcium; metastatic calcification is in viable tissue, at a raised serum calcium.
## explicit_objective
Given a described calcified lesion, decide whether it is dystrophic or metastatic, and justify the answer from the serum calcium and the state of the tissue.
## pitfalls
Trying to separate the two on the appearance of the deposit. They are morphologically identical, grossly and microscopically; the question is always about the tissue and the blood, never about the calcium.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pathological Calcification
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-PATHOLOGICAL-CALCIFICATION
## related_article_ids
ART-108-PAT-NECROSIS
## related_concept_ids
CON-FND-33466CEBFC4EBA
CON-FND-87392C49DB246C
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## clinical_relevance
0.6
## academic_relevance
0.95
## weight_confidence
0.8
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p16 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p2 | 108 INT
src_a2ffe25e8362fe840ceb | department_book | 2026 | p8 | 108 INT
## atomic_claim_ids
CLM-FND-CALCIFICATION-MORPHOLOGY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p16] Morphology of calcification: Both dystrophic and metastatic show Grossly: Chalky white granular material. Microscopic: Calcium salts have a basophilic amorphous granular appearance.
[Practical book, DATA SHOW] Calcification is seen as blue basophilic deposition. Ragged and torn foci are noted due to difficult cutting by microtome knife.
[Section 1: EOM Q6, 0.5 marks] Dystrophic calcification occurs in:
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
microtopicId: The microtopic column carries "Pathological Calcification", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for pathological calcification — `calcif` returns zero across all 1,883 nodes. This concept is the comparison of dystrophic and metastatic calcification, from the book's chapter 2. Placed at SYS-FND-T03-S01, the section node, for the same reason as the two records it compares. No node ID was invented.
nanotopicId: The comparison spans both of the module subject tree's children under Pathological Calcification, so it sits at their parent rather than under either.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department and practical books; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "calcification morphology" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: This record deliberately overlaps CON-FND-33466CEBFC4EBA and CON-FND-87392C49DB246C, both authored in this batch, and is not a merge candidate for either: those two answer "what is it and what causes it", this one answers "how do you tell them apart when the slide looks the same". The practical book's own item makes the distinction impossible from the deposit alone, which is why the comparison needs a record of its own.
conflicts: No source in this module distinguishes them on morphology, which is exactly the point this record makes.
uncertainty: The practical book notes ragged and torn foci from the microtome knife but does not say whether that artefact is itself a useful sign of calcification on a slide.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. This record discharges the often_confused_with edge between the two calcification records, as the necrosis-apoptosis contrast record does for cell death. The typed edge is still owed to a relations batch. DIS-PAT-T08 is secondary because the practical examines a calcification slide.

---

# Item
## label
Amyloid is extracellular beta-pleated protein deposited on basement membranes and vessel walls
## id
CON-FND-D955408D228002
## canonical_key
amyloid.definition.beta-pleated-extracellular-deposit
## aliases
Amyloid
Amyloidosis
Nature of amyloid
Beta pleated sheet
Amyloid P protein
## arabic_label
الداء النشواني
## arabic_aliases
المادة النشوانية
الترسب النشواني
## definition
Amyloidosis is extracellular deposition of an abnormal protein with a beta-pleated configuration together with a glycoprotein, amyloid P protein. It is deposited on basement membranes, reticulin fibres and the walls of small blood vessels, and the affected tissue becomes hard and waxy. It arises from abnormal folding of proteins, which become insoluble, aggregate and deposit as fibrils; normally misfolded proteins are degraded intracellularly in proteasomes or extracellularly by macrophages, and in amyloidosis these quality-control mechanisms fail. The proteins that form amyloid are either normal proteins with an inherent tendency to fold improperly when produced in increased amounts, or mutant proteins prone to misfolding and aggregation.
## explicit_objective
State the nature of amyloid, name where it is deposited, and explain the failure of protein quality control that allows it to accumulate.
## pitfalls
Naming amyloid as one substance. It is a physical configuration — a beta-pleated fibril with amyloid P — that more than twenty different proteins can adopt, which is why the classification is by the protein and not by the deposit.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Amyloidosis
## nanotopic
Pathogenesis of amyloidosis
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathogenesis of amyloidosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-AMYLOIDOSIS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-8151AE03EA25C5
CON-FND-4867DD3814D088
CON-FND-A40D59DAB245EA
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.8
## exam_weight_by_year
KAU_Y1=0.8
## clinical_relevance
0.7
## academic_relevance
0.95
## weight_confidence
0.9
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p16 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p5 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p2 | 108 INT
## atomic_claim_ids
CLM-FND-AMYLOID-DEFINITION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p16] Amyloidosis is extracellular deposition of abnormal protein having beta-pleated configuration with a glycoprotein (amyloid P protein). It is deposited on basement membrane, reticulin fibers, and walls of small blood vessels. The affected tissue becomes hard & waxy.
[Department book p16] Amyloidosis results from abnormal folding of proteins, which become insoluble, aggregate, and deposit as fibrils in extracellular tissues.
[Section 2: EOY Q I.1, 1 mark] Amyloidosis:
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-NEU-7AE49F0DB2D418
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathogenesis of amyloidosis) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Pathogenesis of amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathogenesis of amyloidosis) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for amyloidosis or for extracellular deposits — `amyloid` and `deposit` both return zero across all 1,883 nodes in all four views, and SYS-FND-T03 holds only cell injury, inflammation and neoplasia. This concept is the definition and pathogenesis of amyloid, from the book's chapter 2. Placed at the section node SYS-FND-T03-S01 because amyloid is an extracellular deposit and none of that section's four microtopics — reversible injury, necrosis, apoptosis, adaptation — describes it. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "amyloid" and "beta pleated" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-NEU-7AE49F0DB2D418 "Amyloid is AB protein" is the only live concept whose label carries "amyloid", and it looks superficially like a definition of the same word. It sits on DIS-PAT-T07 in a run of neuropathology concepts and its scope is the amyloid of Alzheimer disease specifically. Merging would either narrow this general-pathology definition to one protein — which is the misconception this record's pitfall exists to prevent — or broaden a neuropathology teaching point past what its own article supports. Not merged; cross-linked from the localised amyloidosis record, where cerebral amyloid genuinely belongs.
conflicts: The live neuropathology record states amyloid is AB protein; this book states more than twenty forms exist, of which AL and AA are commonest and cerebral AB is one localised form. Recorded rather than silently resolved, because the two are a general rule and a special case rather than a disagreement.
uncertainty: The book does not say what determines which tissues a given amyloid protein prefers, only that the deposits sit on basement membranes, reticulin and small vessels.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts and the one live amyloid concept on DIS-PAT-T07. Misfolded-protein accumulation links this to the apoptosis causes record (CON-FND-A40D59DAB245EA), which the book names as a cause of apoptosis in neurodegenerative disease — a genuine cross-chapter mechanism edge. often_confused_with hyaline change (CON-FND-5CB8B822A9A6AF) is the other, since both are homogeneous pink extracellular material. Both owed to a relations batch.

---

# Item
## label
AL amyloid comes from plasma-cell light chains; AA amyloid from the acute phase response
## id
CON-FND-8151AE03EA25C5
## canonical_key
amyloid.types.al-and-aa-protein
## aliases
AL amyloid
AA amyloid
Amyloid light chain
Serum amyloid associated protein
SAA
Types of amyloid protein
## arabic_label
أنواع بروتين الأميلويد
## arabic_aliases
أميلويد السلسلة الخفيفة
الأميلويد المرتبط بالالتهاب
## definition
More than twenty distinct forms of amyloid protein exist. The two commonest are amyloid light chain (AL) protein, immunoglobulin light chains derived from plasma cells, and amyloid-associated (AA) protein, a non-immunoglobulin protein derived from a larger serum precursor, serum amyloid-associated (SAA) protein, which hepatocytes synthesise as part of the acute phase response.
## explicit_objective
Name the two commonest amyloid fibril proteins with their cell of origin, and decide which one a named disease would produce.
## pitfalls
Assigning AA protein to multiple myeloma. Myeloma is a plasma-cell tumour, so it makes light chains and therefore AL; the 2024 paper asked for the exception in a list of chronic inflammatory diseases and myeloma was it.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T04
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Amyloidosis
## nanotopic
Types of amyloid protein
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Types of amyloid protein
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-AMYLOIDOSIS
## related_article_ids
ART-108-PAT-PATHOLOGICAL-CALCIFICATION
## related_concept_ids
CON-FND-D955408D228002
CON-FND-E3F496F6DDD7C3
CON-FND-42A1BD1A1DAAE6
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.75
## exam_weight_by_year
KAU_Y1=0.75
## clinical_relevance
0.7
## academic_relevance
0.95
## weight_confidence
0.9
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p17 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p2 | 108 INT
## atomic_claim_ids
CLM-FND-AMYLOID-PROTEIN-TYPES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p17] 1- Amyloid light chain (AL) protein: Immunoglobulin light chains derived from plasma cells.
[Department book p17] 2- Amyloid-associated (AA) protein: A non-immunoglobulin protein derived from a larger serum precursor called serum amyloid–associated (SAA) protein synthesized by hepatocytes as part of the "acute phase response".
[Section 1: EOM Q8, 0.5 marks] In all of the following conditions the amyloid fibril protein is AA EXCEPT:
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-NEU-7AE49F0DB2D418
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Types of amyloid protein) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Types of amyloid protein", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Types of amyloid protein) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for amyloidosis anywhere — `amyloid` returns zero across all 1,883 nodes. This concept is the classification of amyloid fibril proteins, from the book's chapter 2. Placed at the section node SYS-FND-T03-S01 for the same reason as the other amyloid records: it is an extracellular deposit and no microtopic beneath that section describes one. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "amyloid light chain" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-NEU-7AE49F0DB2D418 "Amyloid is AB protein" names a third fibril protein that this record's own source says is one of more than twenty. It is a neuropathology record about Alzheimer disease; folding it in would put a fourth protein into a two-item classification without the disease context that makes it meaningful. Not merged; cross-linked from the localised amyloidosis record.
conflicts: No source in this module names a different pair as commonest.
uncertainty: The book says "more than 20 distinct forms" without naming any beyond AL, AA and, later, transthyretin and cerebral AB; the full list is not in this source.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. AL and AA map directly onto primary and secondary systemic amyloidosis (CON-FND-E3F496F6DDD7C3), which is a `prerequisite_of` edge and the reason the two records are cross-linked rather than merged: one names the protein, the other names the clinical setting. Owed to a relations batch. DIS-PAT-T04 is secondary because AA amyloid is a consequence of chronic inflammation.

---

# Item
## label
Systemic amyloidosis is primary, secondary or senile, and each has its own protein
## id
CON-FND-E3F496F6DDD7C3
## canonical_key
amyloidosis.systemic.primary-secondary-senile
## aliases
Systemic amyloidosis
Primary amyloidosis
Secondary amyloidosis
Reactive amyloidosis
Senile amyloidosis
Myeloma associated amyloidosis
## arabic_label
الداء النشواني الجهازي
## arabic_aliases
الداء النشواني الأولي
الداء النشواني الثانوي
## definition
In systemic amyloidosis the material is deposited in many organs — liver, spleen, tongue, heart and kidney — producing organomegaly such as hepatomegaly, splenomegaly and macroglossia, and organ dysfunction such as heart failure and proteinuria. It is classified by aetiology into three. Primary, or myeloma-associated, amyloidosis deposits AL protein and accompanies myeloma, a plasma-cell tumour arising in bone marrow that produces a large amount of one immunoglobulin class with one light-chain type; the light chain forms the amyloid. Secondary, or reactive, amyloidosis deposits AA protein derived from SAA, an acute-phase reactant the liver secretes when inflammatory cytokines stimulate it, and it follows long-lasting chronic inflammation — bronchiectasis, chronic osteomyelitis, rheumatoid disease, tuberculosis, Crohn's disease and ulcerative colitis — with a predilection for liver, spleen and kidney. Senile amyloidosis deposits minute amounts of transthyretin in the heart and blood-vessel walls, and only rarely causes clinical disease.
## explicit_objective
Classify systemic amyloidosis by aetiology, and list the chronic inflammatory diseases that cause the secondary form.
## pitfalls
Reading "primary" as meaning idiopathic. In this book primary amyloidosis is myeloma-associated and has a named cause; it is called primary because the amyloid is the first disease process, not because the cause is unknown.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T04
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Amyloidosis
## nanotopic
Systemic amyloidosis
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Systemic amyloidosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-AMYLOIDOSIS
## related_article_ids
ART-108-PAT-PATHOLOGICAL-CALCIFICATION
## related_concept_ids
CON-FND-8151AE03EA25C5
CON-FND-42A1BD1A1DAAE6
CON-FND-699152CE450385
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.8
## exam_weight_by_year
KAU_Y1=0.8
## clinical_relevance
0.8
## academic_relevance
0.95
## weight_confidence
0.9
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p17 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p2 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p5 | 108 INT
## atomic_claim_ids
CLM-FND-SYSTEMIC-AMYLOIDOSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p17] In systemic amyloidosis, the material is deposited in many organs: liver, spleen, tongue, heart, and kidney. This results in organomegaly e.g. hepatomegaly, splenomegaly, macroglossia; and can lead to organ dysfunction e.g. heart failure and proteinuria.
[Department book p17] So reactive amyloidosis is secondary to long-lasting chronic inflammatory disorders such as: - Bronchiectasis. - Chronic osteomyelitis. - Rheumatoid disease. - Tuberculosis. - Crohn's disease & ulcerative colitis.
[Section 1: EOM Q7, 0.5 marks] Primary amyloidosis can be found in patients with:
[Chapter 2 formative assessment SAQ 2] List causes of secondary amyloidosis.
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
microtopicId: The microtopic column carries "Amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Systemic amyloidosis) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Systemic amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Systemic amyloidosis) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for amyloidosis — `amyloid` returns zero across all 1,883 nodes. This concept is the aetiological classification of systemic amyloidosis, from the book's chapter 2. Placed at the section node SYS-FND-T03-S01; none of its four microtopics describes an extracellular protein deposit. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "systemic amyloidosis" and "reactive amyloidosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "amyloid" — one hit, CON-NEU-7AE49F0DB2D418, which is cerebral and therefore localised rather than systemic, and is recorded as a rejected candidate on the localised record where it actually belongs. Nothing to reject here.
conflicts: No source in this module classifies systemic amyloidosis differently. The list of chronic inflammatory causes is worth reading against local epidemiology — tuberculosis and bronchiectasis carry more weight in Egypt than a Western text would give them — but the book states the list and nothing is added to it here.
uncertainty: The book does not say how long chronic inflammation must last before reactive amyloidosis appears, only that the disorders are long-lasting.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. contrasts_with localised amyloidosis (CON-FND-42A1BD1A1DAAE6), and the AL/AA record is prerequisite_of this one. The organ records — kidney, liver and spleen, heart and gut — are all part_of the systemic form. All owed to a relations batch. DIS-PAT-T04 is secondary because reactive amyloidosis is a consequence of chronic inflammation.

---

# Item
## label
Localised amyloid marks medullary thyroid carcinoma, Alzheimer disease and type 2 diabetic islets
## id
CON-FND-42A1BD1A1DAAE6
## canonical_key
amyloidosis.localised.thyroid-alzheimer-islet
## aliases
Localized amyloidosis
Localised amyloidosis
Cerebral amyloid
Medullary carcinoma amyloid
Islet amyloid
## arabic_label
الداء النشواني الموضعي
## arabic_aliases
الأميلويد الدماغي
أميلويد جزر لانغرهانس
## definition
In localised amyloidosis the deposits are limited to a single tissue or organ. In medullary carcinoma of the thyroid, a tumour of the calcitonin-secreting C cells, amyloid made of calcitonin precursor molecules in beta-pleated configuration lies in the stroma around the tumour cells; it has no clinical effect but helps identify the tumour. Cerebral amyloid is found in Alzheimer disease, in neuritic plaques and in blood-vessel walls, as A-beta protein. Localised deposits are occasionally seen without obvious cause in skin, laryngeal wall, lung, ureter and urinary system, and amyloid is found in the islets of Langerhans in type 2 diabetes mellitus.
## explicit_objective
Give two examples of localised amyloidosis, and explain what the amyloid in medullary thyroid carcinoma is made of and what it is useful for.
## pitfalls
Expecting localised amyloid to damage the organ it sits in. In medullary thyroid carcinoma the book says it has no clinical effect at all — its whole value is diagnostic.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T07
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Amyloidosis
## nanotopic
Localized amyloidosis
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Localized amyloidosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-AMYLOIDOSIS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-E3F496F6DDD7C3
CON-FND-8151AE03EA25C5
CON-FND-D955408D228002
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.7
## academic_relevance
0.95
## weight_confidence
0.85
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p18 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p8 | 108 INT
## atomic_claim_ids
CLM-FND-LOCALIZED-AMYLOIDOSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p18] 1- In medullary carcinoma, a tumor from calcitonin secreting C cells in the thyroid, amyloid material is seen in the stroma surrounding the tumor cells. The amyloid material is calcitonin precursor molecules arranged in beta pleated sheets configuration. It has no clinical effect but helps in identification of the tumor.
[Department book p18] 2- Cerebral amyloid is found in Alzheimer disease. They are seen in neuritic plaques and in the wall of blood vessels (Aβ2 protein).
[Section 2: End of year Q2c, 2 marks] Two examples of localised amyloidosis
## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-NEU-7AE49F0DB2D418
## conflicts
[clear]

## uncertainty
[clear]

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
microtopicId: The microtopic column carries "Amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Localized amyloidosis) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Localized amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Localized amyloidosis) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for amyloidosis — `amyloid` returns zero across all 1,883 nodes. This concept is localised amyloidosis and its examples, from the book's chapter 2. Placed at the section node SYS-FND-T03-S01. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "localized amyloidosis" and "cerebral amyloid" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-NEU-7AE49F0DB2D418 "Amyloid is AB protein" is the live record this one comes closest to. It sits on DIS-PAT-T07 as part of a neuropathology degenerative-disease article, and it names the protein of cerebral amyloid. This record names four localised amyloidoses across three organ systems, of which cerebral amyloid is one. The general-pathology objective — give two examples of localised amyloidosis — cannot be met by the neuropathology record, and the neuropathology article would be worse off with three unrelated organs added to it. Not merged; cross-linked, and it is the reason DIS-PAT-T07 is a secondary placement here.
conflicts: The book writes the cerebral protein as "Aβ2" where the live neuropathology record writes "AB protein"; both are the same protein under different renderings of the same symbol, recorded rather than silently normalised.
uncertainty: The book says localised deposits are "rarely seen without any obvious cause" in skin, larynx, lung and urinary tract without saying what they are made of; the protein is not asserted here.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts and the one live amyloid concept on DIS-PAT-T07. contrasts_with systemic amyloidosis (CON-FND-E3F496F6DDD7C3) and contrasts_with CON-NEU-7AE49F0DB2D418, which would join the pathology and neuropathology courses on cerebral amyloid. Both owed to a relations batch.

---

# Item
## label
Congo red under polarised light gives amyloid its apple-green birefringence
## id
CON-FND-4867DD3814D088
## canonical_key
amyloid.staining.congo-red-apple-green-birefringence
## aliases
Congo red
Apple green birefringence
Amyloid stain
Metachromatic stain
Lugol iodine amyloid
## arabic_label
صبغة أحمر الكونغو
## arabic_aliases
الانكسار المزدوج الأخضر التفاحي
صبغات الأميلويد
## definition
Grossly, a slice of tissue immersed in Lugol's iodine stains amyloid dark brown against a yellow background, which is the observation the substance is named for; iodine followed by 1% sulphuric acid turns the amyloid blue. Microscopically, amyloid stains pink with haematoxylin and eosin; it stains orange-red with Congo red and, viewed by polarised light through a fixed and a rotating filter, appears apple green against a dark background — apple-green birefringence; and with the metachromatic stains methyl violet and crystal violet it stains rose red while the rest of the tissue stains violet.
## explicit_objective
Name the stain and the optical technique that confirm amyloid, and state the colour seen.
## pitfalls
Reporting Congo red alone as diagnostic. Congo red gives orange-red under ordinary light, which several things do; it is the apple-green birefringence under polarised light that confirms amyloid.
## concept_type
investigation
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Amyloidosis
## nanotopic
Staining characteristics of amyloid
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Staining characteristics of amyloid
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-AMYLOIDOSIS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-D955408D228002
CON-FND-A69F39242D6698
CON-FND-699152CE450385
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.7
## academic_relevance
0.95
## weight_confidence
0.85
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p18 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p3 | 108 INT
## atomic_claim_ids
CLM-FND-CONGO-RED-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p18] If a slice of tissue is immersed in Lugol's iodine amyloid stains dark brown while the rest of the tissue stains yellow (hence the name amyloid, starch-like).
[Department book p18] 2- Congo red Stain: Amyloid stains orange red and when examined by polarized light (using two filters in the path of light of a microscope, one fixed and one rotating) the amyloid appears as an apple- green light against a dark background (apple green birefringence)
[Section 1: EOM Q9, 0.5 marks] Under polarized light, Congo red stained amyloid shows:
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
microtopicId: The microtopic column carries "Amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Staining characteristics of amyloid) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Staining characteristics of amyloid", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Staining characteristics of amyloid) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for amyloidosis or for staining technique in general pathology — `amyloid` returns zero across all 1,883 nodes. This concept is the staining characteristics of amyloid, from the book's chapter 2. Placed at the section node SYS-FND-T03-S01. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module. A Congo red polarised-light plate is requested as media on the amyloidosis article; the book's own Figure (2.2) shows one and sits in a copyrighted PDF.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "Congo red" and "apple green birefringence" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "congo", "birefring" and "amyloid stain" — zero label or canonical-key hits, and find-existing.mjs reports "No existing record matches congo red" across live and pending batches. Nothing to reject.
conflicts: No source in this module gives different staining results.
uncertainty: The book explains the polarised-light apparatus but not why a beta-pleated fibril is birefringent; the optical mechanism is outside this source.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. diagnosed_by is the relation this record carries to every amyloidosis record in the batch, and prerequisite_of the diagnosis record (CON-FND-A69F39242D6698), which turns the stain into a biopsy decision. Both owed to a relations batch. DIS-PAT-T08 is secondary because the kidney amyloid plate is examined with this stain.

---

# Item
## label
Renal amyloid obliterates the glomerulus and presents as proteinuria, then renal failure
## id
CON-FND-699152CE450385
## canonical_key
amyloidosis.kidney.glomerular-deposit-and-proteinuria
## aliases
Kidney amyloidosis
Renal amyloidosis
Amyloid kidney
Amyloid nephropathy
## arabic_label
الداء النشواني الكلوي
## arabic_aliases
أميلويد الكلية
البيلة البروتينية النشوانية
## definition
Grossly the kidney is enlarged and its cut surface is pale yellow with brown waxy dots, the amyloid in the glomeruli; in long-standing cases the kidneys contract from secondary ischaemic change. Microscopically amyloid is deposited in the basement membrane of the glomerular capillaries and in the mesangium, appearing thick and pink, until the whole glomerular capillary is obliterated and appears as a homogeneous pink mass. Arteriolar walls are thickened by amyloid, producing ischaemia, tubular atrophy and fibrosis; amyloid is also deposited in the tubular basement membrane, and the tubular lumen shows hyaline casts. Clinically the patient presents with proteinuria and later renal failure.
## explicit_objective
Describe the gross and microscopic picture of amyloid kidney, and explain why an enlarged kidney becomes a contracted one.
## pitfalls
Expecting the amyloid kidney to stay large. It is enlarged early and contracted late, because amyloid in the arteriolar walls makes the organ ischaemic — so kidney size alone does not exclude the diagnosis.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pathological changes in different organs in amyloidosis
## nanotopic
Kidney amyloidosis
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathological changes in different organs in amyloidosis > Kidney amyloidosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-AMYLOIDOSIS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-E3F496F6DDD7C3
CON-FND-4867DD3814D088
CON-FND-A69F39242D6698
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.65
## exam_weight_by_year
KAU_Y1=0.65
## clinical_relevance
0.8
## academic_relevance
0.95
## weight_confidence
0.75
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p19 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p11 | 108 INT
## atomic_claim_ids
CLM-FND-RENAL-AMYLOIDOSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p19] Gross picture: The kidney is enlarged. The cut surface is pale yellow and shows brown waxy dots (amyloid deposits in the glomeruli.) In long standing cases the kidneys are contracted due to secondary ischemic changes.
[Department book p19] Amyloid is deposited in the basement membrane of the glomerular capillaries, and in the mesangium. It appears thick and pink. Finally, the whole glomerular capillary is obliterated by the amyloid deposit and appears as a homogeneous pink mass.
[Department book p19] Clinically, the patient presents with proteinuria, and later renal failure.
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
microtopicId: The microtopic column carries "Pathological changes in different organs in amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathological changes in different organs in amyloidosis > Kidney amyloidosis) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Kidney amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathological changes in different organs in amyloidosis > Kidney amyloidosis) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for amyloidosis — `amyloid` returns zero across all 1,883 nodes, and the systems view's renal topic covers renal disease rather than a deposit that reaches the kidney from a systemic process. This concept is renal amyloidosis, from the book's chapter 2. Placed at the section node SYS-FND-T03-S01 with the other amyloid records so the set stays together. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module. The book's Figure (2.2), amyloid in glomeruli with a Congo red polarised-light panel, is requested as media on the amyloidosis article.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "renal amyloidosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "amyloid", "proteinuria" and "glomerul" combined with amyloid — the only amyloid hit is cerebral. Nothing near enough to reject.
conflicts: No source in this module describes renal amyloid differently.
uncertainty: The book does not say at what point proteinuria becomes nephrotic, nor whether the hyaline casts are themselves amyloid; both are left as the book left them.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. part_of systemic amyloidosis (CON-FND-E3F496F6DDD7C3), diagnosed_by the Congo red record (CON-FND-4867DD3814D088), and prerequisite_of the diagnosis record — the kidney is the book's first-named biopsy site when renal manifestations are present. All owed to a relations batch. DIS-PAT-T08 is secondary because this is examined as a plate.

---

# Item
## label
Amyloid makes the liver waxy and firm, and the spleen either sago or lardaceous
## id
CON-FND-00024C3C0A7C4F
## canonical_key
amyloidosis.liver-and-spleen.sago-and-lardaceous
## aliases
Liver amyloidosis
Spleen amyloidosis
Sago spleen
Lardaceous spleen
Diffuse amyloid spleen
## arabic_label
الداء النشواني للكبد والطحال
## arabic_aliases
طحال الساجو
الطحال الشحمي
## definition
The amyloid liver is enlarged, heavy, firm and rubbery with sharp borders, and its cut surface shows waxy light-brown streaks of amyloid on a yellow background of fatty change; microscopically amyloid lies in the sinusoid walls as pink streaks, the liver cells atrophy from pressure and anoxia, and the walls of hepatic arterioles and venules are thickened. The spleen takes one of two forms. Sago spleen is enlarged, rubbery and firm, its cut surface showing brown glassy dots — follicles laden with amyloid — against a red background; amyloid lies in the central arterioles of the white-pulp follicles, which thicken and narrow, and the follicles atrophy and are replaced. Diffuse amyloid or lardaceous spleen is less common, markedly enlarged, with brown streaks of amyloid deposited widely in the red-pulp sinusoids and an atrophic white pulp.
## explicit_objective
Distinguish sago spleen from lardaceous spleen by the compartment involved and the cut-surface appearance, and describe the gross liver in amyloidosis.
## pitfalls
Reading the yellow background of the amyloid liver as amyloid. The yellow is coexisting fatty change; the amyloid is the waxy light-brown streak running through it.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pathological changes in different organs in amyloidosis
## nanotopic
Liver amyloidosis
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathological changes in different organs in amyloidosis > Liver amyloidosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-AMYLOIDOSIS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-E3F496F6DDD7C3
CON-FND-70554B38361679
CON-FND-13BFC600597FD6
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## clinical_relevance
0.6
## academic_relevance
0.95
## weight_confidence
0.7
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p18 | 108 INT
src_e294bafc730fe7111b06 | department_book | 2026 | p20 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p11 | 108 INT
## atomic_claim_ids
CLM-FND-HEPATIC-SPLENIC-AMYLOIDOSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p18] The liver is enlarged, heavy, firm and rubbery. The borders are sharp. The cut surface shows waxy light brown streaks of amyloid on a yellow background of liver tissue (fatty change).
[Department book p20] 1- Sago spleen: The spleen is enlarged, rubbery and firm. The cut surface shows brown, glassy dots (which represents follicles with amyloid deposit) against a red background.
[Department book p20] 2- Diffuse amyloid spleen (lardaceous spleen): A less common type. The spleen is markedly enlarged. The cut surface shows brown streaks of amyloid deposit.
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
microtopicId: The microtopic column carries "Pathological changes in different organs in amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathological changes in different organs in amyloidosis > Liver amyloidosis) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for amyloidosis — `amyloid` returns zero across all 1,883 nodes. This concept is hepatic and splenic amyloidosis, from the book's chapter 2. Placed at the section node SYS-FND-T03-S01 with the other amyloid records. No node ID was invented.
nanotopicId: The module subject tree gives liver and spleen separate leaves under the same parent; this record covers both, so it carries the first and names the second in module_subject's parent path rather than splitting one comparison across two records.
approvedFileResourceIds: No file resource has been rights-cleared for this module. The book's Figures (2.1) and (2.3) show hepatic and splenic amyloid and are requested as media on the amyloidosis article.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "sago spleen" and "hepatic amyloidosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "sago", "lardaceous", "spleen amyloid" and "liver amyloid" — zero label or canonical-key hits. Nothing to reject.
conflicts: No source in this module describes these organs differently. The extraction record notes the book prints the heading as "Amyloidosis spleen" where the module subject tree reads "Spleen amyloidosis"; that is a heading order, not a disagreement.
uncertainty: The book does not say what determines whether a spleen becomes sago or lardaceous, only that the second is less common.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. part_of systemic amyloidosis, and contrasts_with the steatosis liver record (CON-FND-70554B38361679) — the book puts the two lesions in the same organ in one sentence, amyloid streaks on a background of fatty change, which is the clearest reason a student must be able to tell them apart. Both owed to a relations batch. DIS-PAT-T08 is secondary because these are gross-specimen descriptions.

---

# Item
## label
Cardiac amyloid causes arrhythmia and heart failure; gut amyloid causes macroglossia and malabsorption
## id
CON-FND-13BFC600597FD6
## canonical_key
amyloidosis.heart-and-git.arrhythmia-and-macroglossia
## aliases
Cardiac amyloidosis
Amyloidosis of the heart
GIT amyloidosis
Macroglossia
Amyloid heart failure
## arabic_label
الداء النشواني للقلب والجهاز الهضمي
## arabic_aliases
ضخامة اللسان
اعتلال القلب النشواني
## definition
In the heart, amyloid is deposited in the walls of small blood vessels and in the interstitial tissue surrounding and replacing muscle fibres; the heart is enlarged and the myocardium thickened and firm, and the effects are cardiac arrhythmias and heart failure. Any part of the gastrointestinal tract can be affected: amyloid in the tongue causes macroglossia, and amyloid in the intestine affects blood vessels first before extending into the adjacent submucosa, muscularis and subserosa, producing mucosal atrophy with malabsorption and protein loss.
## explicit_objective
State the functional consequence of amyloid deposition in the heart and in the gut, and name the tongue sign of systemic amyloidosis.
## pitfalls
Expecting a thickened, firm myocardium to contract more strongly. The muscle fibres are being surrounded and replaced by amyloid, so the stiff heart fails — thickness here is deposit, not hypertrophy.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T07
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pathological changes in different organs in amyloidosis
## nanotopic
Amyloidosis of the heart
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathological changes in different organs in amyloidosis > Amyloidosis of the heart
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-AMYLOIDOSIS
## related_article_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## related_concept_ids
CON-FND-E3F496F6DDD7C3
CON-FND-00024C3C0A7C4F
CON-FND-063F60318B4D20
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.55
## exam_weight_by_year
KAU_Y1=0.55
## clinical_relevance
0.8
## academic_relevance
0.9
## weight_confidence
0.7
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p20 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p11 | 108 INT
## atomic_claim_ids
CLM-FND-CARDIAC-GI-AMYLOIDOSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p20] Amyloid is deposited in the walls of small blood vessels and in the interstitial tissue surrounding and replacing muscle fibres. The heart is enlarged, and the myocardium is thickened and firm. The effects are cardiac arrhythmias and heart failure.
[Department book p20] Amyloid deposits in the tongue cause macroglossia.
[Department book p20] The early lesions mainly affect blood vessels but eventually extend to involve the adjacent areas of the submucosa, muscularis, and subserosa resulting in mucosal atrophy. The effects are malabsorption and protein loss.
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
microtopicId: The microtopic column carries "Pathological changes in different organs in amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathological changes in different organs in amyloidosis > Amyloidosis of the heart) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for amyloidosis — `amyloid` returns zero across all 1,883 nodes. This concept is cardiac and gastrointestinal amyloidosis, from the book's chapter 2. Placed at the section node SYS-FND-T03-S01 with the other amyloid records rather than split across the cardiovascular and gastrointestinal systems views, which would separate one systemic disease into two homes. No node ID was invented.
nanotopicId: The module subject tree gives the heart and the gastrointestinal tract separate leaves under the same parent; this record covers both and carries the heart leaf, because the effects the book names for the two are the same kind of claim.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "cardiac amyloidosis" and "macroglossia" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "macroglossia", "cardiac amyloid" and "amyloid heart" — zero label or canonical-key hits. Nothing to reject.
conflicts: No source in this module describes these organs differently.
uncertainty: The book says the heart is enlarged with a thickened firm myocardium but does not say whether the failure is systolic or diastolic; the restrictive physiology is not stated in this source and is not asserted here.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. part_of systemic amyloidosis, and contrasts_with brown atrophy of the heart (CON-FND-063F60318B4D20) — an enlarged stiff heart against a small brown one, the two ends of the module's cardiac gross pathology. Both owed to a relations batch. DIS-PAT-T07 is secondary because the lesions are described organ by organ.

---

# Item
## label
Amyloidosis is diagnosed on tissue, by kidney, rectal or gingival biopsy
## id
CON-FND-A69F39242D6698
## canonical_key
amyloidosis.diagnosis.tissue-biopsy
## aliases
Diagnosis of amyloidosis
Rectal biopsy
Gingival biopsy
Amyloid biopsy
## arabic_label
تشخيص الداء النشواني
## arabic_aliases
خزعة النسيج
خزعة المستقيم
## definition
The diagnosis of amyloidosis depends on histological demonstration of amyloid deposits in tissue. The commonest sites biopsied are the kidney, when renal manifestations are present, and rectal or gingival biopsy in patients suspected of having systemic amyloidosis.
## explicit_objective
State what the diagnosis of amyloidosis rests on, and name the three biopsy sites the book gives with the circumstance that selects each.
## pitfalls
Reaching for the affected organ every time. Rectal and gingival biopsy are used precisely because a systemic deposit can be demonstrated from an accessible site, and biopsying an amyloid kidney or a failing heart carries risk the gum does not.
## concept_type
investigation
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Amyloidosis
## nanotopic
Diagnosis of amyloidosis
## modules
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Diagnosis of amyloidosis
## universities
kau
## learner_years
1
## article_ids
ART-108-PAT-AMYLOIDOSIS
## related_article_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## related_concept_ids
CON-FND-4867DD3814D088
CON-FND-699152CE450385
CON-FND-E3F496F6DDD7C3
## resource_ids
src_e294bafc730fe7111b06

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.45
## exam_weight_by_year
KAU_Y1=0.45
## clinical_relevance
0.8
## academic_relevance
0.85
## weight_confidence
0.6
## confidence
0.95
## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p21 | 108 INT
## atomic_claim_ids
CLM-FND-AMYLOIDOSIS-DIAGNOSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Department book p21] The diagnosis of amyloidosis depends on the histologic demonstration of amyloid deposits in tissues. The most common sites biopsied are the kidney, when renal manifestations are present, or rectal or gingival biopsy in patients suspected of having systemic amyloidosis.
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
microtopicId: The microtopic column carries "Amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no MIC_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved microtopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Diagnosis of amyloidosis) carries the curriculum position instead.
nanotopicId: The nanotopic column carries "Diagnosis of amyloidosis", which is the department book's own heading as reproduced in the module subject tree. The curriculum overlay holds no NAN_ node for 108 INT pathology — searched the catalogue for one to resolve the title against and found none — so the resolved nanotopicId is empty and module_subject (108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Diagnosis of amyloidosis) carries the curriculum position instead.
primaryNodeId: Placed under protest. The canonical taxonomy has no node for amyloidosis — `amyloid` returns zero across all 1,883 nodes. This concept is the diagnosis of amyloidosis, from the book's chapter 2. Placed at the section node SYS-FND-T03-S01 with the other amyloid records. No node ID was invented.
approvedFileResourceIds: No file resource has been rights-cleared for this module.
approvedVideoResourceIds: This faculty distributes no video for 108 INT.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "diagnosis of amyloidosis" — no candidate exists and the index is absent beside this batch.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched all 1,718 live concepts unfiltered for "amyloid" and "biopsy" — the one amyloid hit is cerebral and makes no diagnostic claim. Nothing to reject.
conflicts: No source in this module names different biopsy sites.
uncertainty: The book does not give the yield of a rectal or gingival biopsy, so a student cannot say how often a negative one excludes the disease.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; awaiting evidence.
relationships: Walked the 49 batch concepts. diagnosed_by the Congo red record (CON-FND-4867DD3814D088) — the biopsy is worthless without the stain — and prerequisite_of nothing else in the batch, since this is where the module's amyloid teaching ends. The edge to the staining record is owed to a relations batch.
