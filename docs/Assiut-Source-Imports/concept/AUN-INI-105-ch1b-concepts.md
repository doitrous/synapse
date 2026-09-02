<!--
  AUN-INI-105 -- new concepts minted from the "INI MCQ .pdf" bank triage,
  closing out Chapter 1 "Bacterial cell structure" (pp.4-27, 161 items;
  coverage/AUN-INI-105-triage.md's chapter map). This pass (lane 14) reads
  and keys Q101-Q161, the chapter's final 61 items, against the plain-text
  ANSWERS table on pp.26-27 (cross-checked two ways: pagetext.mjs show and a
  direct pdftotext -layout extraction, both agreeing on all 61 keys). 47 of
  the 61 are authored, 14 held (schema-shape option-count floors, a printed
  double answer, and duplicates of items already authored by lanes 1/2/7 --
  three of the duplicates, Q152/Q154/Q155, were flagged in advance by lane
  1's own triage note as later recurrences of Q36/Q17/Q18). Chapter 1 is now
  fully read, keyed and authored end to end across all four lanes that have
  touched it (161 of 161 items dispositioned).

  Six concepts below are newly minted, each cleared by find-existing.mjs
  first. The remaining 41 authored questions reuse concepts already minted
  or overlaid for AUN-INI-105 by chapters 1, 2, 5 and 8 (own-tree reuse) or
  by Ain-Shams ASU-INF/Menoufia MUST pending batches (via a sparse +aun
  overlay, authored separately in pending-live/) -- not re-minted a second
  time.

  Teaching text has no dedicated department lecture deck for this module
  (the INI folder holds only the MCQ bank itself plus three garbled/excluded
  files); definitions are written from standard microbiology teaching,
  evidenced by the bank's own stems/options
  (evidence/AUN-INI-105-mcq-resources.md).

  Import: Admin > Concepts import.
-->

# Item

## id
CON-INF-7A1F92BC450E31

## label
Antibiotic-inactivating enzymes, such as beta-lactamases, are excreted at or across the bacterial cytoplasmic membrane rather than from the capsule, cell wall or a spore

## canonical_key
bacteria.cytoplasmic-membrane.antibiotic-inactivating-enzyme-excretion

## aliases
Beta-lactamase excretion site
Site of antibiotic-destroying enzyme excretion

## arabic_label
موقع إفراز الإنزيمات المحللة للمضادات الحيوية

## arabic_aliases
بيتا لاكتاماز

## definition
Bacteria that inactivate antibiotics enzymatically -- classically beta-lactamases that hydrolyse the beta-lactam ring of penicillins and cephalosporins -- excrete these enzymes at or through the cytoplasmic membrane, whether into the periplasmic space (Gram-negative bacteria) or directly into the surrounding medium (Gram-positive bacteria). This membrane-associated excretion route is distinct from the capsule (an antiphagocytic outer layer), the cell wall (a structural/shape-determining layer) and the spore (a dormant survival structure), none of which is the site through which these degrading enzymes leave the cell.

## explicit_objective
State that antibiotic-inactivating enzymes such as beta-lactamases are excreted at the cytoplasmic membrane, not the capsule, cell wall or spore.

## pitfalls
Confusing the cytoplasmic membrane's role in enzyme excretion with the cell wall's own role as a structural antibiotic target (e.g. for beta-lactams acting on peptidoglycan synthesis) -- the wall is a target of some antibiotics, not the excretion route for the enzymes that destroy them.

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
Bacterial cell structure

## subtopic
Antibiotic resistance mechanisms

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-CH1B-EXTRAS

## related_article_ids

## related_concept_ids
CON-DEV-FE47A8F9B0768E

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
0.5

## academic_relevance
0.6

## weight_confidence
0.45

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The following is site of excretion of enzymes that destroy antibiotics? ... Cytoplasmic membrane" (Q142, options Capsule/Cell wall/Spores/Cytoplasmic membrane).

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
sourceCandidateIds: find-existing.mjs run for "beta-lactamase" -- 0 grain-matching hits (two unrelated live concepts about MRSA beta-lactam therapy and meningococcal empiric therapy turned up, neither about an excretion site); minted as a standalone AUN-INI-105 record rather than pulling in a cross-subject dependency for one item.

---

# Item

## id
CON-INF-C830461FA92E7D

## label
The bacterial chromosome's function is to control the cell's genetically determined properties and behaviour, not to carry out protein synthesis, house respiratory enzymes, or serve as a cloning vector

## canonical_key
bacteria.chromosome.controls-cell-properties-and-behaviour

## aliases
Function of the bacterial chromosome
Chromosome controls cell properties

## arabic_label
وظيفة الكروموسوم البكتيري

## arabic_aliases


## definition
The bacterial chromosome -- a single, circular, double-stranded DNA molecule held free in the cytoplasm's nucleoid region -- carries the genetic information that determines and controls the cell's inherited properties and behaviour (its structural features, metabolic capabilities and, indirectly, its response to the environment). This defining, genome-level control function is distinct from protein synthesis (carried out by ribosomes reading messenger RNA), respiration (housed at the cytoplasmic membrane, classically at mesosomes) and use as a cloning vector (a role specific to small, easily manipulated plasmids, not the much larger chromosome).

## explicit_objective
State that the bacterial chromosome's function is to control the cell's genetically determined properties and behaviour, and reject protein synthesis, respiration and cloning-vector use as chromosome functions.

## pitfalls
Assuming the chromosome performs the same specialised jobs its own gene products carry out (protein synthesis at ribosomes, respiration at the membrane) -- the chromosome's role is to encode and control these properties, not to physically perform them itself.

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
Bacterial cell structure

## subtopic
Bacterial chromosome

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-CH1B-EXTRAS

## related_article_ids

## related_concept_ids
CON-INF-52E3C48A1A2AAA

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
0.2

## academic_relevance
0.8

## weight_confidence
0.45

## confidence
0.78

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Function of bacterial chromosome is? ... Control bacterial properties and behavior" (Q145, options Control bacterial properties and behavior/Protein synthesis/Site of respiratory enzymes/Used as vector for gene cloning/All of the above).

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
sourceCandidateIds: find-existing.mjs run for "bacterial chromosome function" -- 0 hits (only unrelated MRSA/porin/nucleoporin records turned up on the broader "bacterial chromosome" term); this lane's own concept/AUN-INI-105-concepts.md CON-INF-52E3C48A1A2AAA (prokaryote architecture) tests the chromosome's structural, single-circular-DNA nature, a different grain from this record's own function/control angle -- cross-referenced as related_concept_ids, not merged.

---

# Item

## id
CON-INF-05E9B7D2318CFA

## label
Restriction endonucleases are not required for bacterial chromosomal replication -- binary fission is instead classically tied to the cell wall's septum formation, mesosomes and the cytoplasmic membrane

## canonical_key
bacteria.cell-division.restriction-endonuclease-not-required

## aliases
Restriction endonucleases and cell division
Binary fission structures

## arabic_label


## arabic_aliases


## definition
Bacterial cell division (binary fission) splits one bacterial cell into two genetically identical daughter cells, and is classically associated with septum formation at the cell wall, the cytoplasmic membrane's inward growth at the division site, and the mesosome's historic description as anchoring and coordinating chromosome segregation. Restriction endonucleases -- enzymes that recognise a specific nucleotide sequence and cleave DNA there, classically as part of a restriction-modification system defending against bacteriophage DNA -- play no role in the routine replication of the bacterial chromosome itself, so they are not required for chromosomal replication or for cell division to proceed.

## explicit_objective
Identify that restriction endonucleases are not required for bacterial chromosomal replication, while correctly recognising binary fission, mesosome involvement and the production of two identical daughter cells as true statements about bacterial cell division.

## pitfalls
Assuming any DNA-acting enzyme mentioned alongside a division question must be part of the division machinery -- restriction endonucleases act on foreign (phage) DNA as a defence system, not on the cell's own chromosome during its routine replication and segregation.

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
Bacterial cell structure

## subtopic
Bacterial cell division

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-CH1B-EXTRAS

## related_article_ids

## related_concept_ids
CON-INF-E4012E20B5A13D

## resource_ids
src_6f2f4188bb0cbf848733

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.25

## exam_weight_by_year
AUN_Y1=0.25

## clinical_relevance
0.2

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.72

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is incorrect regarding bacterial cell division? ... Restriction enzymes is required for chromosomal replication" (Q147, options Bacteria multiply by binary fission/Restriction enzymes is required for chromosomal replication/Mesosomes play a role in cell division/The cell divided into two daughter identical cells).

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
sourceCandidateIds: find-existing.mjs run for "restriction endonuclease" -- the only hit was a pending Ain-Shams ASU-MBG gene-therapy-module record (CON-FND-C444D428BE3E1D, "restriction endonuclease... bacterial source, palindromic sites", already overlaid for AUN-INI-105 chapter 4) covering the enzyme's own definition and origin, a different grain from this record's own "not required for chromosomal replication" framing -- not reused, since pulling that cross-subject/cross-chapter dependency chain into a single held-vs-authored item was judged worse than a small, self-contained AUN-native mint; cross-referenced in related_concept_ids to the mesosome/division concept instead.

---

# Item

## id
CON-INF-91DA24F607B3C8

## label
Curved, comma-shaped bacteria are classified as Vibrios, distinct from spherical cocci, straight-rod bacilli and helical spirochaetes

## canonical_key
bacteria.morphology.vibrio-curved-rod

## aliases
Vibrio morphology
Curved rod bacteria

## arabic_label
شكل الضمة (فيبريو)

## arabic_aliases


## definition
Bacteria are classified by shape into four broad morphological groups: cocci (spherical), bacilli (straight rods), spirochaetes (long, flexible helical/coiled organisms) and vibrios (short, curved or comma-shaped rods). Vibrio cholerae, the cause of cholera, is the classic example of this curved-rod (vibrio) morphology, and its single polar (monotrichous) flagellum drives the organism's characteristic rapid, darting motility.

## explicit_objective
Identify curved, comma-shaped bacteria as vibrios, distinguishing this morphological group from cocci, bacilli and spirochaetes.

## pitfalls
Confusing a vibrio's curved-rod shape with a spirochaete's longer, flexible helical coiling -- the two are distinct morphological groups, even though both deviate from a straight bacillus.

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
Bacterial cell structure

## subtopic
Bacterial morphology

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-CH1B-EXTRAS

## related_article_ids

## related_concept_ids
CON-INF-E4E8831D2BE517

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
0.4

## academic_relevance
0.7

## weight_confidence
0.45

## confidence
0.78

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Bacteria shaped like curved rods? ... Vibrios" (Q144, options Cocci/Bacilli/Vibrios/Spirochaetes).

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
sourceCandidateIds: find-existing.mjs run for "vibrio" -- 1 hit, this lane's own chapter-1 mint CON-INF-E4E8831D2BE517 ("Vibrio cholerae is monotrichous", flagellar arrangement), a different grain (flagellar arrangement, not general morphology-by-shape classification) -- not merged, cross-referenced as related_concept_ids and reused as this question's own contextual_concept_ids.

---

# Item

## id
CON-INF-3B7614EDA290F5

## label
Corynebacterium diphtheriae is the bacterium that causes diphtheria

## canonical_key
bacteria.corynebacterium-diphtheriae.diphtheria-etiologic-agent

## aliases
Diphtheria causative organism
Corynebacterium diphtheriae

## arabic_label
العامل المسبب للدفتيريا

## arabic_aliases


## definition
Diphtheria, an upper-respiratory-tract infection classically marked by a grey pseudomembrane and by systemic toxin-mediated complications (notably myocarditis and neuropathy), is caused by Corynebacterium diphtheriae, a Gram-positive, club-shaped (pleomorphic) rod -- not by a staphylococcal or streptococcal species. The organism's pathogenicity is driven chiefly by its exotoxin, and the same organism is also classically recognised microscopically by its prominent cytoplasmic metachromatic (Babes-Ernst) storage granules.

## explicit_objective
Identify Corynebacterium diphtheriae as the causative organism of diphtheria, distinguishing it from Staphylococcus and Streptococcus species.

## pitfalls
Confusing diphtheria's causative organism with other Gram-positive genera tested alongside it in a multiple-choice list -- Corynebacterium diphtheriae is specific and non-interchangeable with Staphylococcus or Streptococcus, which cause distinct disease patterns.

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
Bacterial cell structure

## subtopic
Clinically relevant organisms

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-CH1B-EXTRAS

## related_article_ids

## related_concept_ids
CON-INF-398B4BA280679E

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
0.7

## academic_relevance
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Diphtheria is caused by? ... Corynebacterium" (Q158, options Corynebacterium/Staphylococcus/Streptococcus/None of these).

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
sourceCandidateIds: find-existing.mjs run for "diphtheria" and "corynebacterium diphtheriae" -- hits were a pending Ain-Shams ASU-INF toxoid-conversion concept, a pending Helwan pathology-family concept about a different source question's own printed key, a pending MUST cardiovascular-module concept about diphtheria's myocarditis complication, and this lane's own already-live CON-INF-398B4BA280679E (Corynebacterium diphtheriae's metachromatic granules) -- none tests this item's own etiologic-agent fact; the granules concept is reused here as contextual_concept_ids (same organism), not merged, since it tests a different specific fact (a microscopic identification feature, not the disease-causation fact).

---

# Item

## id
CON-INF-C4A08E2F91B673

## label
Spirochetes are a distinct helical bacterial morphological group; Treponema pallidum, the cause of syphilis, is the classic example

## canonical_key
bacteria.morphology.spirochete-treponema-pallidum

## aliases
Spirochete morphology
Treponema pallidum

## arabic_label
اللولبيات

## arabic_aliases


## definition
Spirochetes are a distinct bacterial morphological group of long, thin, flexible, helically coiled (spiral) organisms, motile by internal axial filaments rather than external flagella -- a shape and motility pattern unlike the spherical cocci, straight-rod bacilli, or short curved-rod vibrios. Treponema pallidum, the causative organism of syphilis, is the classic clinically relevant spirochete, distinct from the coccal genera Neisseria (gonococci) and Staphylococcus, and the chain-forming coccal genus Streptococcus.

## explicit_objective
Identify Treponema pallidum as the classic spirochete, and spirochetes as a distinct helically coiled bacterial morphological group.

## pitfalls
Assuming any elongated or motile bacterium is a spirochete -- the group is specifically defined by its helical shape and internal axial-filament motility, not simply by an elongated form.

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
Bacterial cell structure

## subtopic
Bacterial morphology

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-CH1B-EXTRAS

## related_article_ids

## related_concept_ids
CON-INF-91DA24F607B3C8

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
0.55

## academic_relevance
0.6

## weight_confidence
0.45

## confidence
0.76

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Spirochete is? ... Treponema pallidum" (Q161, options Gonococci/Staphylococci/Treponema pallidum/Streptococci).

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
sourceCandidateIds: find-existing.mjs run for "spirochete" and "treponema pallidum" -- 0 hits both terms; minted fresh, cross-referenced to this same pass's own vibrio-morphology mint (CON-INF-91DA24F607B3C8) as a related, contrasting classification record.
