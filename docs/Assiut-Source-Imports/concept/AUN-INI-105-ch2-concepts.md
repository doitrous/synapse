<!--
  AUN-INI-105 -- new concepts minted from the "INI MCQ .pdf" bank triage,
  Chapter 2 "Bacterial growth" (pp.28-37, 60 items, answer table p37;
  coverage/AUN-INI-105-triage.md's chapter map). Every canonical_key below
  was confirmed NEW by find-existing.mjs (live state + every
  docs/*-Source-Imports root + docs/import-ready) before minting -- see this
  lane's chapter-2 report for the search notes. This chapter overlaps
  heavily with Ain Shams's own ASU-INF-microbiology-concepts.md (pending),
  which already covers the growth-curve phase mechanics, oxygen-requirement
  classes, environmental-tolerance terms (thermophilic/capnophilic/
  microaerophilic), catalase/SOD, lag-period determinants, antibiotic
  sensitivity by phase, autotrophic/heterotrophic nutrition and the typical
  pathogen growth profile -- those questions reuse the ASU-INF ids via a
  sparse pending-live overlay
  (pending-live/AUN-INI-105-ch2-asuinf-overlay-concepts.md) instead of being
  re-minted here. Only the facts ASU-INF does not cover (bacterial growth's
  own definition, binary fission as the reproductive mechanism, the
  in-vivo-disease-stage correlation of each growth phase, and aerotolerant
  anaerobes) are minted in this file.

  Teaching text has no dedicated department lecture deck for this module
  (the INI folder holds only the MCQ bank itself plus three garbled/excluded
  files); definitions are written from standard microbiology teaching,
  evidenced by the bank's own stems/options
  (evidence/AUN-INI-105-mcq-resources.md).

  Import: Admin > Concepts import.
-->

# Item

## id
CON-INF-BC2D060010BE99

## label
Bacterial growth is the orderly increase of all protoplasmic components within a cell, and at the population level it appears as an increase in cell size and/or cell number

## canonical_key
teaching.microbiology.bacterial-growth.definition

## aliases
Definition of bacterial growth
Growth vs reproduction

## arabic_label
تعريف النمو البكتيري

## arabic_aliases
الزيادة المنظمة في مكونات الخلية

## definition
"Growth" in bacteriology names the orderly increase in all of a cell's protoplasmic components (its cytoplasm, membranes, ribosomes, nucleoid material and other constituents growing together in proportion), distinct from cell division or reproduction as isolated events. At the level of a bacterial population, growth is observed as an increase in cell size and/or an increase in cell number -- the two are not mutually exclusive, and a population's growth curve tracks number over time precisely because binary fission converts individual-cell growth into population growth once a cell reaches a size threshold and divides.

## explicit_objective
Define bacterial growth as the orderly, proportional increase in all of a cell's protoplasmic components, and state that at the population level this manifests as an increase in cell size and/or cell number.

## pitfalls
Treating "growth" as a synonym for "cell division" alone (division is the mechanism that converts individual-cell growth into population increase, not the definition of growth itself), or assuming growth must mean only an increase in cell count and never in cell size.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Bacterial growth

## subtopic
Definition of bacterial growth

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-BACTERIAL-GROWTH

## related_article_ids

## related_concept_ids
CON-INF-25DA8EFD9E1DA5

## resource_ids
src_6f2f4188bb0cbf848733

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
0.15

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The orderly increase in all components of protoplasm of a cell is called? ... Growth" (Q1). "Growth of bacteria refers to? ... A,B [increase in size, increase in number]" (Q51).

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
sourceCandidateIds: find-existing.mjs run for "protoplasm" -- 0 hits, safe to create.

---

# Item

## id
CON-INF-25DA8EFD9E1DA5

## label
Bacteria reproduce by simple binary fission, made possible by carrying a single (usually circular) chromosome rather than the diploid, spindle-based apparatus that eukaryotic mitosis or meiosis requires

## canonical_key
teaching.microbiology.bacterial-reproduction.binary-fission

## aliases
Binary fission
Bacterial cell division mechanism

## arabic_label
التكاثر البكتيري بالانشطار الثنائي

## arabic_aliases
انقسام الخلية البكتيرية

## definition
Bacteria multiply by simple binary fission: one cell replicates its single chromosome and divides into two genetically identical daughter cells, with no spindle apparatus, no meiotic reduction and no gamete fusion involved. This is possible precisely because a bacterium's genome is typically one (usually circular) chromosome rather than the multiple, paired chromosomes of a eukaryotic cell -- a single origin of replication and a single segregation event are enough to partition the genome between the two daughters. Binary fission is therefore distinct from spore formation (a survival strategy, not the ordinary reproductive route), conjugation (horizontal gene transfer between cells, not reproduction), budding, or any process requiring gametes.

## explicit_objective
State that bacteria reproduce by binary fission, that this is enabled by their possessing a single chromosome, and distinguish binary fission from spore formation, conjugation, mitosis, meiosis, budding and sexual/gamete-based reproduction.

## pitfalls
Confusing binary fission with mitosis (a eukaryotic process involving a mitotic spindle) or with spore formation/conjugation, which are distinct bacterial processes serving survival and gene-transfer roles respectively, not ordinary reproduction.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Bacterial growth

## subtopic
Bacterial reproduction by binary fission

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-BACTERIAL-GROWTH

## related_article_ids

## related_concept_ids
CON-INF-BC2D060010BE99

## resource_ids
src_6f2f4188bb0cbf848733

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
0.65

## weight_confidence
0.5

## confidence
0.88

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The bacterial cell multiplication is usually by? ... Binary-fission" (Q2). "Bacteria multiply by? ... Simple binary fission" (Q3). "Reproduction in bacterin takes place by binary fission as they possess? ... Single chromosome" (Q22). "Bacterial cell multiplies by? ... Binary fission" (Q39).

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
sourceCandidateIds: find-existing.mjs run for "binary fission" and "single circular chromosome bacterial reproduction" -- 0 hits each, safe to create.
relationships: four question stems (Q2, Q3, Q22, Q39) all test this same reproduction-mechanism fact from different distractor angles (rejecting mitosis/meiosis/conjugation, spore formation/gametes, multiple/linear chromosomes, and budding/sexual multiplication respectively); collapsed into one record rather than four, per the standing rule against one-fact-per-question minting.

---

# Item

## id
CON-INF-8FB2410709C1B3

## label
Each phase of the bacterial growth curve correlates with a stage of infectious disease in vivo: lag phase with the incubation period, exponential (log) phase with the invasive period, stationary phase with overt symptoms and signs, and decline phase with convalescence/recovery

## canonical_key
teaching.microbiology.growth-curve.disease-stage-correlation

## aliases
Growth curve and disease stage correlation
Incubation period as lag phase
Convalescence as decline phase

## arabic_label
العلاقة بين منحنى النمو البكتيري ومراحل المرض

## arabic_aliases
فترة الحضانة تقابل طور الكمون
فترة النقاهة تقابل طور الانحدار

## definition
The four in-vitro phases of the bacterial growth curve map onto four in-vivo stages of an infectious disease. The lag phase (bacteria adapting to a new environment, no net division yet) corresponds to the incubation period (the pathogen establishing itself before symptoms appear). The exponential/log phase (division at its maximal rate) corresponds to the invasive period (the organism spreading and increasing in numbers within the host, symptoms escalating). The stationary phase (new cells balancing dying cells, population at its peak) corresponds to the period of overt symptoms and signs (the infection at its clinical peak). The decline/death phase (dying cells outnumbering new ones) corresponds to convalescence, or recovery (the pathogen population falling as host defences and/or treatment clear the infection).

## explicit_objective
Match each bacterial growth-curve phase (lag, exponential/log, stationary, decline) to its corresponding in-vivo disease stage (incubation period, invasive period, symptoms and signs, convalescence/recovery respectively).

## pitfalls
Assigning the invasive period to the stationary phase, or symptoms/signs to the log phase -- the mapping follows the biological logic of each phase (adaptation, maximal multiplication, plateau, decline) onto the matching disease stage (silent establishment, spread, clinical peak, resolution), not an arbitrary order.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Bacterial growth

## subtopic
Growth curve correlation with disease stages

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-BACTERIAL-GROWTH

## related_article_ids

## related_concept_ids
CON-INF-6D56F46B5F1EF4

## resource_ids
src_6f2f4188bb0cbf848733

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
0.6

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Convalescence stage of the disease is corresponding to? ... Decline phase of growth curve" (Q8). "The lag phase of bacterial growth curve correlate in vivo with which of the following? ... Incubation period" (Q11). "Which one of the following is correct for stationary phase of bacterial growth? ... Correlates with symptoms & signs in vivo" (Q14). "The invasion period in vivo is corresponding in vitro to? ... Logarithmic phase" (Q26). "The recovery stage in vivo is? ... Decline phase" (Q29).

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
sourceCandidateIds: find-existing.mjs run for "incubation period", "convalescence" and "invasion period" -- 0 hits each; the pending ASU-INF phase-definitions concept (CON-INF-6D56F46B5F1EF4) covers the growth-curve phases' own internal mechanics (lag vs stationary) but not their disease-stage correlation, so this record is complementary, not a duplicate -- linked via related_concept_ids rather than merged.
relationships: five question stems (Q8, Q11, Q14, Q26, Q29) each test one leg of this same four-way correlation; collapsed into one record rather than five. Two further stems (Q31 "convalescence phase corresponds to", Q56 "recovery correlates with") are near-verbatim restatements of Q8 and Q29 respectively and are held as duplicates rather than authored a second time.

---

# Item

## id
CON-INF-6B513F07FB756B

## label
Aerotolerant anaerobes do not use oxygen in their metabolism, but unlike obligate anaerobes they are not killed by its presence

## canonical_key
teaching.microbiology.bacteria.aerotolerant-anaerobes

## aliases
Aerotolerant anaerobes
Aerotolerance vs obligate anaerobiosis

## arabic_label
اللاهوائيات المتحملة للأكسجين

## arabic_aliases
البكتيريا اللاهوائية التي تتحمل وجود الأكسجين

## definition
Aerotolerant anaerobes are organisms that continue to rely on anaerobic (fermentative) metabolism and do not use oxygen as a terminal electron acceptor, yet -- unlike obligate anaerobes -- they are not killed or inhibited by the presence of oxygen. This tolerance is generally attributed to their retaining enough superoxide dismutase (and/or peroxidase) to detoxify the reactive oxygen species that oxygen exposure generates, even without using oxygen for energy production; obligate anaerobes lack this enzymatic protection and are damaged or killed on exposure to air.

## explicit_objective
Define aerotolerant anaerobes as organisms that do not use oxygen metabolically but survive its presence (unlike obligate anaerobes, which are killed by it), and attribute this survival to retained ROS-detoxifying enzymes.

## pitfalls
Confusing aerotolerant anaerobes with facultative anaerobes -- a facultative anaerobe can switch to using oxygen for aerobic respiration when it is present, while an aerotolerant anaerobe never uses oxygen metabolically at all; it simply survives alongside it.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Bacterial growth

## subtopic
Aerotolerant anaerobes

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-BACTERIAL-GROWTH

## related_article_ids

## related_concept_ids
CON-INF-D31966C6CEF85C
CON-INF-2E9D6F833A7D5E

## resource_ids
src_6f2f4188bb0cbf848733

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
0.3

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Anaerobes that are not Killed by exposure to oxygen are? ... Aerotolerant anaerobes" (Q36).

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
sourceCandidateIds: find-existing.mjs run for "aerotolerant" -- 0 hits, safe to create. The pending ASU-INF oxygen-requirement-classes concept (CON-INF-D31966C6CEF85C) covers obligate aerobe/anaerobe/facultative anaerobe/microaerophile but not aerotolerant anaerobes specifically; linked via related_concept_ids rather than merged. The catalase/SOD concept (CON-INF-2E9D6F833A7D5E) explains the enzymatic mechanism behind this record's own tolerance claim; also linked, not merged.

---
