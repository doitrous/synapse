<!--
  Hand-authored NEW concepts for AU-MED-103 (Blood and Immune System & Medical
  Terminology), Biochemistry department, lane W1-103-BIOC. Every concept here passed the
  mandatory find-existing.mjs (>=4 queries) plus `grep -ril "<canonical_key>"
  docs/*-Source-Imports/concept/` with no hit, per LANE-BRIEF.md SS10/SS12/SS16, and is
  traceable to at least one triaged exam question (exam_signal in field_notes names the
  source, page and question number). HIT-LIVE and HIT-PENDING concepts for this same
  triage are handled elsewhere: 2 HIT-LIVE sparse updates for G6PD/favism follow the NEW
  records below; 12 HIT-PENDING idea-groups are sparse updates in
  docs/Alexandria-Source-Imports/pending-live/AU-MED-103-biochemistry.md, naming the Kasr
  103-BMS/102-INT file each depends on, per LANE-BRIEF SS16's four laws.
--># Item
## id
CON-HEM-1B8CC5181A0E29

## label
Haem's porphyrin ring and the 5th/6th iron coordination bonds set how haemoglobin holds and releases oxygen

## canonical_key
hemoglobin.structure.porphyrin-and-iron-coordination

## aliases
Porphyrin ring structure | Iron coordination bonds in haem | Type I vs Type III porphyrin isomers | 5th and 6th coordination bonds

## arabic_label
حلقة البورفيرين وروابط التنسيق للحديد في الهيموجلوبين

## arabic_aliases
[clear]

## definition
Haem is iron protoporphyrin IX: four pyrrole rings joined by four methenyl bridges, with
substituted side chains arranged as Type III (the biologically important isomer, found in
haem and cytochromes) rather than the symmetrical Type I arrangement. Iron sits in the
ferrous (Fe2+) state, bonded to the four pyrrole nitrogens in the ring plane, with two
further bonds perpendicular to it: the 5th coordination bond to the imidazole nitrogen of
the globin's proximal histidine, and the 6th bond, which is empty in deoxyhaemoglobin and
occupied by oxygen in oxyhaemoglobin.

## explicit_objective
State which coordination bond of haem iron binds oxygen and which anchors the globin chain, and explain why this arrangement lets iron bind oxygen reversibly instead of being oxidised.

## pitfalls
Assuming the iron-oxygen bond is a permanent chemical bond rather than a reversible one.
The globin fold around the haem pocket is what keeps the first step (oxygen binding)
reversible while blocking the second step (irreversible oxidation to Fe3+) — strip the
globin away and the iron oxidises. A student who forgets the proximal histidine occupies
the 5th bond, not the 6th, will misplace oxygen binding onto the wrong side of the ring.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
[clear]

## topic
Clinical biochemistry

## subtopic
Haemoglobin structure

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Haemoglobin structure

## article_ids
ART-HEM-HB-STRUCTURE-TYPES

## related_article_ids
ART-HEM-HAEMOGLOBINOPATHIES

## related_concept_ids
CON-HEM-BA7B80C7A765A6

## resource_ids
src_4e9f6eb8be5aeedd4cf4

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.45

## exam_weight_by_year
AU_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-AU103-BIOC-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"5th bond is linked to N of Imidazole ring of proximal Histidine. 6th bond is linked to
Oxygen in HbO2 and empty in Deoxy Hb (Hb)." — Blood - Bio - Agha, p.2

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
resourceOccurrenceIds: Hand-authored from the department book and exam papers; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "porphyrin" and "coordination bond" — no candidate record exists beyond the department book already cited.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none — find-existing.mjs returned only the porphyria-manifestations concept (CON-HEM-66B1DEEC8ED961, a different grain: clinical consequence of a biosynthetic block, not ring/iron structure), so nothing was rejected as a near-miss.
relationships: Walked the concepts under DIS-BIO-T07. Wrote related_concept_ids to CON-HEM-BA7B80C7A765A6 (globin composition, same structural family). No typed edge authored this batch — the relation would be part_of (haem structure is part of the whole haemoglobin molecule), left for a relations pass.
examSignal: EGY1 Q35 (p7, keyed C) | EGYF Q40 (p9, keyed b) | WAF Q2 (p1, keyed a) | AGHA-BLOOD Q54 (p11, keyed b, myoglobin contrast)

---

# Item
## id
CON-HEM-BA7B80C7A765A6

## label
Globin is four chains — two 141-residue α and two 146-residue β — one haem per chain

## canonical_key
hemoglobin.globin.chain-composition-and-haem-ratio

## aliases
Globin chain composition | Haem to globin ratio | Alpha and beta chain lengths

## arabic_label
تركيب سلاسل الجلوبين في الهيموجلوبين

## arabic_aliases
[clear]

## definition
Globin, the protein part of haemoglobin, is a tetramer of two identical alpha chains
(141 amino acids each, folded into 7 alpha helices) and two identical beta chains
(146 amino acids each, folded into 8 alpha helices). Each of the four chains carries
exactly one haem group, so one haemoglobin molecule holds four haems and can carry four
oxygen molecules, while myoglobin, with a single chain and a single haem, carries only one.

## explicit_objective
State the number and length of adult haemoglobin's globin chains and the haem-to-chain ratio, and use it to predict how many oxygen molecules one haemoglobin molecule carries.

## pitfalls
Confusing the alpha and beta chain lengths (141 vs 146 residues) — this is exactly what
lets a student correctly identify which chain a mutation sits in when a question states an
amino-acid position and a residue count.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
[clear]

## topic
Clinical biochemistry

## subtopic
Haemoglobin structure

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Haemoglobin structure

## article_ids
ART-HEM-HB-STRUCTURE-TYPES

## related_article_ids
ART-HEM-HAEMOGLOBINOPATHIES

## related_concept_ids
CON-HEM-1B8CC5181A0E29

## resource_ids
src_4e9f6eb8be5aeedd4cf4

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
AU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-AU103-BIOC-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"a chain -> 141 amino acid... B chain -> 146 amino acid... Haem : Globin = 4 : 1." —
Blood - Bio - Agha, p.3

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
resourceOccurrenceIds: Hand-authored from the department book and exam papers; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "globin chains" and "141 amino acid" — no candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Sibling of CON-HEM-1B8CC5181A0E29 under the same structure topic; related_concept_ids set both ways.
examSignal: EGYF Q36 (p8, keyed c) | WAF Q1 (p1, keyed a) | WAF Q4 (p1, keyed a)

---

# Item
## id
CON-HEM-760245E8490882

## label
HbA, HbA2 and HbF differ by which non-α chain they pair with α, and HbF's γ chain is what gives it higher oxygen affinity

## canonical_key
hemoglobin.normal-types.hba-hba2-hbf-composition

## aliases
Types of normal haemoglobin | HbA2 composition | Fetal haemoglobin (HbF) composition | Alpha2Beta2 Alpha2Delta2 Alpha2Gamma2

## arabic_label
أنواع الهيموجلوبين الطبيعي: البالغ والجنيني

## arabic_aliases
[clear]

## definition
Adult haemoglobin exists mainly as HbA (α₂β₂, 95-97% of total), with a minor
fraction HbA2 (α₂δ₂, 2-4%) whose delta chain differs from beta by more than one
residue. Fetal haemoglobin (HbF, α₂γ₂) predominates before birth and falls to
under 5% by around 7 months of age; its gamma chain does not bind 2,3-BPG as tightly as
beta does, so HbF has a higher oxygen affinity than HbA, letting the fetus pull oxygen
across the placenta from maternal blood.

## explicit_objective
Name the chain pairing of HbA, HbA2 and HbF, and explain why HbF's chain composition gives it a higher oxygen affinity than adult haemoglobin.

## pitfalls
Treating HbF's higher oxygen affinity as an intrinsic property of the haem group rather than
a consequence of the gamma chain binding 2,3-BPG poorly. The affinity difference disappears
if 2,3-BPG is stripped from both molecules — it is a chain effect, not a haem effect.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
[clear]

## topic
Clinical biochemistry

## subtopic
Haemoglobin structure

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Types of normal Hb

## article_ids
ART-HEM-HB-STRUCTURE-TYPES

## related_article_ids
ART-HEM-HAEMOGLOBINOPATHIES

## related_concept_ids
CON-OBS-A94183DB543092

## resource_ids
src_4e9f6eb8be5aeedd4cf4

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.5

## exam_weight_by_year
AU_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-AU103-BIOC-03

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"HbF has Great affinity for O2 -> gamma chains don't Bind 2,3 BPG." — Blood - Bio - Agha, p.6

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
resourceOccurrenceIds: Hand-authored from the department book and exam papers; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "HbA2" and "glycosylated hemoglobin" — no candidate record exists for the structural composition angle (a different-grain live/pending record exists for HbF's numeric O2-affinity figure and is cross-linked, not merged).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: CON-OBS-A94183DB543092 is a live concept stating fetal Hb's ~20-30% higher O2 affinity number in an obstetric-monitoring context; this concept teaches the chain-composition mechanism behind that number — related, not merged, since a question could test either without the other.
relationships: Cross-linked to CON-OBS-A94183DB543092 (mechanism vs. the numeric fact it explains).
examSignal: EGYF Q16 (p4, keyed c) | WAF Q39 (p11, keyed d) | AGHA-BLOOD Q22-23,47-48 (p6-7,10-11)

---

# Item
## id
CON-HEM-17E893CE5B7661

## label
Sickle cell disease is a single β-chain substitution that lets deoxygenated HbS polymerise into rigid fibres

## canonical_key
hemoglobinopathy.sickle-cell.mutation-and-polymerisation

## aliases
Sickle cell anaemia mechanism | HbS Glu6Val mutation | Sickling of red blood cells | Deoxy-HbS polymerisation

## arabic_label
آلية مرض الخلايا المنجلية

## arabic_aliases
[clear]

## definition
Sickle cell disease is caused by a single substitution in the beta globin gene: glutamic
acid (polar) at position 6 is replaced by valine (non-polar), producing HbS. The non-polar
patch this creates on deoxygenated HbS matches a complementary groove on other deoxy-HbS
molecules, so under low oxygen tension the molecules polymerise into long, rigid fibres
that distort the red cell into the sickle shape. Sickled cells are fragile (causing
haemolytic anaemia) and can obstruct small vessels (causing tissue infarction).

## explicit_objective
State the exact amino-acid substitution that causes HbS, and explain in one step how that substitution leads from deoxygenation to a sickle-shaped, fragile red cell.

## pitfalls
Saying glutamic acid is replaced by "serine" instead of valine, or placing the substitution
at the wrong chain (it is beta, not alpha). Also, treating sickling as something that happens
to oxygenated HbS — it is specifically the deoxygenated form that exposes the sticky patch
and polymerises.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
[clear]

## topic
Clinical biochemistry

## subtopic
Types of abnormal Hb

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Types of abnormal Hb

## article_ids
ART-HEM-HAEMOGLOBINOPATHIES

## related_article_ids
ART-HEM-HAEMATINIC-VITAMINS

## related_concept_ids
CON-HEM-64F900DD24CBA1

## resource_ids
src_4e9f6eb8be5aeedd4cf4

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.6

## exam_weight_by_year
AU_Y1=0.6

## clinical_relevance
0.8

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
CLM-AU103-BIOC-04

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Glutamic amino acid is replaced by Valine amino acid at 6th position of Beta chain due to
Mutation... leads to formation of sticky patches on the surface of both Oxy HbS and Deoxy
HbS." — Blood - Bio - Agha, p.6

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-HEM-64F900DD24CBA1

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
resourceOccurrenceIds: Hand-authored from the department book and exam papers; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "sickling" and "glutamic valine mutation" — no candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: CON-HEM-64F900DD24CBA1 lists sickle cells only as one of several abnormal erythrocyte shapes (a morphology catalogue) — this concept teaches the biochemical mutation and polymerisation mechanism, a different grain; cross-linked, not merged.
relationships: Cross-linked to CON-HEM-64F900DD24CBA1 (mechanism vs. shape catalogue).
examSignal: EGY1 Q5 (p1, keyed C) | EGYF Q17 (p4, keyed b) | AGHA-BLOOD Q1,3,41,55-57 (p3,4,11,12)

---

# Item
## id
CON-HEM-105A0F711013C4

## label
Thalassaemia is reduced or absent synthesis of one globin chain, not an abnormal chain itself

## canonical_key
hemoglobinopathy.thalassaemia.chain-imbalance-mechanism

## aliases
Alpha thalassaemia | Beta thalassaemia | HbH disease | Thalassaemia mechanism

## arabic_label
آلية الثلاسيميا

## arabic_aliases
[clear]

## definition
Thalassaemia is a hereditary condition in which a mutation affecting a regulatory gene
reduces or abolishes synthesis of one globin chain, rather than producing a structurally
abnormal chain. In alpha-thalassaemia, reduced alpha-chain synthesis leaves an excess of
the other chains, which combine with themselves to form abnormal tetramers (HbH, four beta
chains; Hb Bart's, four gamma chains). In beta-thalassaemia, reduced beta synthesis leaves
excess alpha chains, which combine with delta or gamma chains to raise HbA2 and HbF above
their normal proportions.

## explicit_objective
Distinguish thalassaemia from a structural haemoglobinopathy by stating that the defect is reduced chain output, and predict which haemoglobin fraction rises in alpha- versus beta-thalassaemia.

## pitfalls
Confusing thalassaemia with sickle cell disease as "just another abnormal haemoglobin" —
thalassaemia's chains are structurally normal; the fault is quantity, not sequence. A
student who does not hold this distinction cannot predict which electrophoresis band rises.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
[clear]

## topic
Clinical biochemistry

## subtopic
Types of abnormal Hb

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Types of abnormal Hb

## article_ids
ART-HEM-HAEMOGLOBINOPATHIES

## related_article_ids
ART-HEM-HAEMATINIC-VITAMINS

## related_concept_ids
CON-HEM-17E893CE5B7661

## resource_ids
src_4e9f6eb8be5aeedd4cf4

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.5

## exam_weight_by_year
AU_Y1=0.5

## clinical_relevance
0.7

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-AU103-BIOC-05

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Hereditary hemolytic diseases in which synthesis of their a or B globin chain is defective
due to mutation affecting the regulatory gene." — Blood - Bio - Agha, p.7

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
resourceOccurrenceIds: Hand-authored from the department book and exam papers; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "thalassemia", "HbH disease", "alpha thalassemia" and "beta thalassemia" — no candidate record exists anywhere.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Cross-linked to CON-HEM-17E893CE5B7661 (sibling haemoglobinopathy, contrasting mechanism — quantity defect vs structural defect); an often_confused_with edge is a Step-2-relations candidate, not written this batch.
examSignal: EGYF Q20 (p5, keyed b) | WAF Q3 (p1, keyed c) | AGHA-BLOOD Q2,69 (p3,14)

---

# Item
## id
CON-HEM-A0E086A6BBF15E

## label
Methaemoglobinaemia is oxidised (Fe3+) haemoglobin that cannot carry oxygen, and its two causes need different treatments

## canonical_key
hemoglobin.methaemoglobinaemia.congenital-versus-acquired

## aliases
Methaemoglobin | Congenital methaemoglobinaemia | Acquired methaemoglobinaemia | NADH-cytochrome b5 reductase deficiency

## arabic_label
ميثهيموجلوبينية الدم

## arabic_aliases
[clear]

## definition
Methaemoglobin is haemoglobin whose iron has been oxidised from ferrous (Fe2+) to ferric
(Fe3+), which cannot bind oxygen. Congenital methaemoglobinaemia due to haemoglobin M
(histidine replaced by tyrosine, stabilising Fe3+) does not respond to reducing agents and
needs blood transfusion; congenital deficiency of the NADH-cytochrome b5 reductase system
responds well to reducing agents such as methylene blue. Acquired (toxic) methaemoglobinaemia
follows exposure to oxidising drugs or chemicals (for example phenacetin, sulphonamides,
nitrites) and also responds to reducing agents.

## explicit_objective
Distinguish the two causes of methaemoglobinaemia by which one responds to a reducing agent, and explain in one sentence why haemoglobin M does not.

## pitfalls
Assuming every case of methaemoglobinaemia is treatable with methylene blue. Haemoglobin M
is the exception: because the mutation itself stabilises the ferric state through a tight
ionic bond, a reducing agent cannot reverse it, and the treatment is conservative
(transfusion) rather than pharmacological.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
[clear]

## topic
Clinical biochemistry

## subtopic
Types of abnormal Hb

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Types of abnormal Hb

## article_ids
ART-HEM-HAEMOGLOBINOPATHIES

## related_article_ids
ART-HEM-HAEMATINIC-VITAMINS

## related_concept_ids
[clear]

## resource_ids
src_4e9f6eb8be5aeedd4cf4

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.45

## exam_weight_by_year
AU_Y1=0.45

## clinical_relevance
0.6

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-AU103-BIOC-06

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Distal or Proximal Histidine is replaced by Tyrosine... Treatment with reducing agents...
is ineffective. Treatment is only conservative as Blood Transfusion." — Blood - Bio - Agha, p.8

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
resourceOccurrenceIds: Hand-authored from the department book and exam papers; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "methemoglobin", "met hemoglobin reductase" and "cytochrome b5 reductase" — no candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Same-topic proximity to the haemoglobinopathy siblings only; no typed edge authored this batch.
examSignal: EGY1 Q7 (p2, keyed B) | EGYF Q19 (p4, keyed d) | AGHA-BLOOD Q41,59 (p11,13)

---

# Item
## id
CON-HEM-EF9B70874983FB

## label
Folic acid carries one-carbon units as tetrahydrofolate, and its deficiency blocks DNA synthesis before hindering the nervous system

## canonical_key
vitamin.folic-acid.one-carbon-metabolism-and-deficiency

## aliases
Folate | Tetrahydrofolic acid (THF) | One-carbon metabolism | Folic acid deficiency anaemia

## arabic_label
حمض الفوليك وأيض الكربون الواحد

## arabic_aliases
[clear]

## definition
Folic acid is reduced to tetrahydrofolic acid (THF), the coenzyme that carries one-carbon
units (methyl, methylene, methenyl, formyl, formimino) needed for purine synthesis,
deoxythymidylic acid (dTMP) synthesis, and the synthesis of glycine, serine, methionine and
histidine. Deficiency slows DNA synthesis and RBC maturation, producing macrocytic,
megaloblastic anaemia, plus glossitis and gastrointestinal disturbance — but, unlike
vitamin B12 deficiency, folate deficiency does not itself cause neurological signs.

## explicit_objective
State what tetrahydrofolate carries and why its deficiency produces a macrocytic anaemia, and use the absence of neurological signs to separate it from vitamin B12 deficiency in a clinical vignette.

## pitfalls
Diagnosing folate deficiency in a patient with neurological signs. Folate deficiency gives
the same macrocytic blood picture as B12 deficiency but does not cause demyelination — a
vignette with both macrocytosis and neurological findings points to B12, not folate.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
DIS-BIO-T04

## topic
Clinical biochemistry

## subtopic
Folic acid

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Folic acid

## article_ids
ART-HEM-HAEMATINIC-VITAMINS

## related_article_ids
ART-HEM-IRON-AND-MYOGLOBIN

## related_concept_ids
CON-FND-1A4A49607783A9 | CON-HEM-DDAAF125FD2EBE

## resource_ids
src_4e9f6eb8be5aeedd4cf4

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.5

## exam_weight_by_year
AU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-AU103-BIOC-07

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"FH4 is the coenzyme for one Carbon metabolism... Folate deficiency leads to: Macrocytic
anaemia with Megaloblastic changes in Bone marrow... Glossitis and Gastrointestinal
disturbances." — Blood - Bio - Agha, p.12

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
resourceOccurrenceIds: Hand-authored from the department book and exam papers; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "folic acid", "tetrahydrofolate" and "one carbon metabolism" — no direct-grain candidate exists; a related folate-antagonist mechanism concept (CON-FND-1A4A49607783A9, Kasr 102-INT pending) and B12's own deficiency concept (CON-HEM-DDAAF125FD2EBE, Kasr 102-INT pending) are cross-linked below.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: CON-FND-1A4A49607783A9 teaches methotrexate/sulfonamide as folate antagonists — a pharmacology angle, not the vitamin's own one-carbon-metabolism mechanism; cross-linked, not merged.
relationships: Cross-linked to the folate-antagonists concept and to cobalamin's deficiency concept (often_confused_with candidate for a relations pass — folate vs B12 deficiency is the classic exam confusion).
examSignal: EGYF Q22 (p5, keyed d) | WAF Q12 (p3, keyed a) | AGHA-BLOOD Q16-19,43-44 (p6,10)

---

# Item
## id
CON-HEM-E77CBD6BDF5624

## label
Vitamin K drives γ-carboxylation of glutamate on clotting factors II, VII, IX and X, without which they cannot bind calcium

## canonical_key
vitamin.k.carboxylation-of-clotting-factors

## aliases
Vitamin K mechanism | Gamma-carboxyglutamic acid | Clotting factor carboxylation | Vitamin K deficiency

## arabic_label
فيتامين ك وتكربكس عوامل التجلط

## arabic_aliases
[clear]

## definition
Clotting factors II (prothrombin), VII, IX and X are synthesised in the liver as inactive
precursors. Vitamin K is the essential cofactor for the carboxylase enzyme that converts
specific glutamic acid residues on these precursors into gamma-carboxyglutamic acid; these
carboxylated residues chelate calcium, which lets the factor bind the phospholipid membrane
and become catalytically active. Vitamin K deficiency leaves the factors uncarboxylated and
unable to bind calcium, prolonging the blood coagulation time.

## explicit_objective
Explain what vitamin K's carboxylase does to glutamic acid on the clotting factors, and why that specific change is what lets the factor bind calcium.

## pitfalls
Saying vitamin K "activates all blood clotting factors" rather than naming the four
vitamin-K-dependent ones (II, VII, IX, X) and the specific chemical change (gamma
carboxylation of glutamate). This concept's own deficiency is diagnosed by a *prolonged*
coagulation time, not a shortened one — the reverse claim is a common distractor.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
[clear]

## topic
Clinical biochemistry

## subtopic
Vitamin K

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Vitamin K

## article_ids
ART-HEM-HAEMATINIC-VITAMINS

## related_article_ids
ART-HEM-IRON-AND-MYOGLOBIN

## related_concept_ids
CON-HEM-121DCA556B6311 | CON-HEM-A940AB960A5C0D | CON-FND-46B9F239340ED9

## resource_ids
src_4e9f6eb8be5aeedd4cf4

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.55

## exam_weight_by_year
AU_Y1=0.55

## clinical_relevance
0.7

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
CLM-AU103-BIOC-08

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Conversion of pre Prothrombin to active Prothrombin requires vitamin K dependent
carboxylation of glutamic Acid to y-carboxy glutamic Acid... allow active Prothrombin to
bind (chelate) calcium." — Blood - Bio - Agha, p.15

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
resourceOccurrenceIds: Hand-authored from the department book and exam papers; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "vitamin k", "gamma carboxylation" and "clotting factor carboxylation" — no same-grain candidate exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: CON-HEM-121DCA556B6311 and CON-HEM-A940AB960A5C0D are live concepts about coumarin/warfarin pharmacology (the drugs that antagonise vitamin K), not the vitamin's own carboxylation biochemistry; CON-FND-46B9F239340ED9 is a pending bundled fat-soluble-vitamins overview that touches "K to glutamate carboxylation" in one row among five vitamins. All three are cross-linked, none merged — a question could test this concept's mechanism without ever mentioning warfarin.
relationships: Cross-linked to the two live coumarin/warfarin concepts (differential_of candidate: vitamin K deficiency vs. warfarin therapy, both prolong PT) and to the pending fat-soluble-vitamins bundle (part_of candidate). No typed edge authored this batch.
examSignal: EGY1 Q11 (p2, keyed A) | EGYF Q43,59,65 (p10,13,15) | AGHA-BLOOD Q4,26,73 (p4,6,11)

---

# Item
## id
CON-HEM-818791AC372CE2

## label
Dietary iron is absorbed as ferrous iron in the duodenum, carried by transferrin, and stored as ferritin and haemosiderin

## canonical_key
iron.metabolism.absorption-transport-storage

## aliases
Iron absorption | Transferrin | Ferritin | Total iron binding capacity (TIBC) | Iron distribution in the body

## arabic_label
امتصاص الحديد ونقله وتخزينه

## arabic_aliases
[clear]

## definition
About 10% of dietary iron is absorbed, mainly in the duodenum; acidity, reducing agents
(vitamin C, glutathione) and sulfur-containing amino acids convert ferric iron to the
absorbable ferrous form, while achlorhydria, phytates and oxalates inhibit absorption.
Absorbed iron is transported in plasma bound to transferrin (as Fe3+, after oxidation by
ceruloplasmin), which normally runs about 35% saturated (protein-bound iron 50-150 µg/dL
against a total iron-binding capacity of 300-360 µg/dL). Iron is stored mainly as ferritin
(and, in excess, as haemosiderin), chiefly in the liver, and of the body's total 5 g of
iron, about 60% is in haemoglobin.

## explicit_objective
Trace dietary iron from absorption (site, form, factors that help or hinder it) through plasma transport (transferrin) to storage (ferritin), and use TIBC and ferritin to distinguish iron deficiency from iron overload.

## pitfalls
Confusing the storage protein (ferritin) with the transport protein (transferrin), or
assuming iron is absorbed in the ferric state — it is the ferrous form that crosses the
enterocyte's apical membrane, which is exactly why reducing agents help absorption and
oxidising conditions hinder it.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
[clear]

## topic
Clinical biochemistry

## subtopic
Iron

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Iron

## article_ids
ART-HEM-IRON-AND-MYOGLOBIN

## related_article_ids
ART-FND-CHO-PATHWAY-ENZYMES

## related_concept_ids
CON-HEM-A92555744C9B35

## resource_ids
src_4e9f6eb8be5aeedd4cf4

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.55

## exam_weight_by_year
AU_Y1=0.6

## clinical_relevance
0.7

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
CLM-AU103-BIOC-09

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Of Dietary iron, 10% is absorbed in the duodenum... Ferritin is the main storage form for
Iron. Liver is the main storage organ for Iron." — Blood - Bio - Agha, pp.16-17

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
resourceOccurrenceIds: Hand-authored from the department book and exam papers; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "ferritin" and "transferrin" — no candidate record exists for the storage/transport mechanism itself.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: CON-HEM-A92555744C9B35 is a live concept about causes of *impaired* iron absorption (gastrectomy, vitamin C deficiency, small-bowel disease) — a different objective (what goes wrong) from this concept (how it normally works); cross-linked, not merged.
relationships: Cross-linked to CON-HEM-A92555744C9B35 (prerequisite_of candidate: normal absorption mechanism explains what impairment disrupts).
examSignal: EGY1 Q3,12 (p1,3) | EGYF Q25-27,42 (p6,9-10) | WAF Q9,11 (p3) | AGHA-BLOOD Q7,34-35,46,52,60,62,65-66 (p4,9,12-13)

---

# Item
## id
CON-HEM-C2FB3E03807379

## label
Myoglobin holds one haem and one oxygen-binding site, storing oxygen in muscle rather than transporting it

## canonical_key
myoglobin.single-haem-oxygen-store

## aliases
Myoglobin structure | Myoglobin vs haemoglobin

## arabic_label
الميوجلوبين

## arabic_aliases
[clear]

## definition
Myoglobin is a single polypeptide chain carrying one haem group and therefore one oxygen-
binding site, in contrast to haemoglobin's four chains and four haems. This single-site
binding gives myoglobin a hyperbolic oxygen-dissociation curve and a higher oxygen affinity
than haemoglobin at low oxygen tensions, which suits its role as an oxygen store within
skeletal and cardiac muscle rather than a bulk transporter between the lungs and tissues.

## explicit_objective
State how many haem groups and oxygen-binding sites myoglobin carries, and explain why that single-site structure fits its role as a muscle oxygen store rather than a transporter.

## pitfalls
Treating myoglobin as "a smaller haemoglobin" that does the same job. The functional
difference (store vs. transport) follows directly from the structural one (one site vs.
four cooperating sites) — one binding site cannot show the cooperative, sigmoid binding
behaviour that lets haemoglobin load fully in the lungs and unload substantially in tissue.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
[clear]

## topic
Clinical biochemistry

## subtopic
Haemoglobin structure

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Haemoglobin structure

## article_ids
ART-HEM-IRON-AND-MYOGLOBIN

## related_article_ids
ART-FND-CHO-PATHWAY-ENZYMES

## related_concept_ids
CON-HEM-1B8CC5181A0E29

## resource_ids
src_c757d47d9f689de66b5d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-AU103-BIOC-10

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"How many Iron atoms does each Myoglobin molecule contain? ... b. One." — MCQs - Blood Agha
MCQ, Q54, p11

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
resourceOccurrenceIds: Hand-authored from the exam bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "myoglobin iron atoms" — no candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Cross-linked to CON-HEM-1B8CC5181A0E29 (contrasts_with: single-site myoglobin vs. four-site haemoglobin).
examSignal: AGHA-BLOOD Q54 (p11, keyed b)

---

# Item
## id
CON-HEM-5F48A031367211

## label
Oxyhaemoglobin and carboxyhaemoglobin are told apart at the bedside by sodium dithionite, since carboxyHb resists reduction

## canonical_key
hemoglobin.oxy-versus-carboxy-differentiation

## aliases
Oxyhemoglobin vs carboxyhemoglobin | Sodium dithionite test | HbCO differentiation

## arabic_label
التفريق بين أوكسي هيموجلوبين وكربوكسي هيموجلوبين

## arabic_aliases
[clear]

## definition
Oxyhaemoglobin (HbO2) and carboxyhaemoglobin (HbCO) are visually similar bright-red
pigments, but they are told apart in the laboratory by adding sodium dithionite, a reducing
agent: oxyhaemoglobin is reduced to deoxyhaemoglobin and darkens, while carboxyhaemoglobin
resists reduction because carbon monoxide is bound roughly 200 times more tightly than
oxygen and stays bright red. This distinction matters clinically because carbon monoxide
poisoning can be missed on simple visual inspection of blood colour.

## explicit_objective
Name the reagent used to distinguish oxyhaemoglobin from carboxyhaemoglobin, and explain why carboxyhaemoglobin resists the colour change that oxyhaemoglobin undergoes.

## pitfalls
Assuming any red blood sample is safely oxygenated. A cherry-red colour that fails to darken
with a reducing agent is the tell for carbon monoxide poisoning, not reassurance of normal
oxygenation.

## concept_type
investigation

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
[clear]

## topic
Clinical biochemistry

## subtopic
Haemoglobin structure

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Haemoglobin structure

## article_ids
ART-HEM-IRON-AND-MYOGLOBIN

## related_article_ids
ART-FND-CHO-PATHWAY-ENZYMES

## related_concept_ids
CON-HEM-A0E086A6BBF15E

## resource_ids
src_5309ee19e1149a5bbe9d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.6

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids
CLM-AU103-BIOC-11

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The opposite tube could be [Oxyhemoglobin (HbO) or HbCO] and we use [sodium dithionite] to
differentiate between them." — Practical Blood Questions bank, Biochemistry Spot 8

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
resourceOccurrenceIds: Hand-authored from the practical bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "myoglobin iron atoms"-adjacent Hb-derivative terms — no candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Cross-linked to CON-HEM-A0E086A6BBF15E (methaemoglobinaemia — a third Hb-derivative sharing this same "which oxidation/binding state" family).
examSignal: PRAC-BIOCHEM Spot 8 (Biochemistry Answers page)

---

# Item
## id
CON-FND-D789B411988E18

## label
The uronic acid pathway makes UDP-glucuronic acid, the activated form that conjugates bilirubin, steroids and drugs for excretion

## canonical_key
uronicacid.pathway.udp-glucuronic-acid-conjugation

## aliases
Uronic acid pathway | UDP-glucuronic acid | Glucuronidation

## arabic_label
مسار حمض اليورونيك

## arabic_aliases
[clear]

## definition
The uronic acid pathway is a minor, ATP-independent route of glucose oxidation, running
mainly in liver cytoplasm: glucose-6-phosphate is converted through glucose-1-phosphate and
UDP-glucose to UDP-glucuronic acid. This activated glucuronic acid conjugates less-polar
compounds — bilirubin, steroids, and many drugs — making them more water-soluble and so
easier to excrete; it is also a precursor of the glycosaminoglycans (heparin, hyaluronic
acid), though in humans (unlike some other species) it cannot be converted to vitamin C.

## explicit_objective
State what the uronic acid pathway produces and name the class of substances it conjugates, and explain why conjugation makes a compound easier to excrete.

## pitfalls
Assuming the uronic acid pathway generates energy like glycolysis. It runs alongside the
HMP shunt as a second ATP-independent branch off glucose-6-phosphate, and its output is a
conjugating agent, not ATP or NADPH.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T07

## topic
Carbohydrate metabolism

## subtopic
Uronic acid pathway

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > CHO Metabolism > Uronic acid pathway

## article_ids
ART-FND-CHO-PATHWAY-ENZYMES

## related_article_ids
ART-FND-SPECIMEN-HANDLING

## related_concept_ids
CON-HEM-7A26AE75471EF8

## resource_ids
src_afc87efebd1aaf64f595

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-AU103-BIOC-12

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Importance: Formation of UDP Glucuronic Acid (Active form) needed in: Conjugation to less
polar compounds as bilirubin, steroids and some drugs." — CHO Metabolism - Agha, p.15

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
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "uronic acid pathway" and "UDP glucuronic acid" — no candidate record exists for the pathway itself (a pending concept covers only bilirubin's own conjugation step, cross-linked below).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: CON-HEM-7A26AE75471EF8 (Kasr 103-BMS pending) teaches bilirubin's own hepatic conjugation step using this pathway's product — a specific application, not the pathway itself; cross-linked, not merged.
relationships: Cross-linked to the pending bilirubin-conjugation concept (mechanism_step_before: this pathway's product feeds that conjugation).
examSignal: EGY1 Q18 (p4, keyed C) | EGYF Q8 (p2, keyed a) | WAF Q35 (p10, keyed b) | AGHA-CHO Q111 (p20-21, keyed d)

---

# Item
## id
CON-FND-F62541F9719FA5

## label
Glycogen synthase extends chains by α1,4 bonds and branching enzyme creates the α1,6 branch points that make glycogen compact

## canonical_key
glycogenesis.synthase-and-branching-enzyme-mechanism

## aliases
Glycogen synthase mechanism | Branching enzyme | Amylo-1,4 to 1,6 transglucosidase

## arabic_label
آلية إنزيم الجليكوجين سينثاز وإنزيم التفريع

## arabic_aliases
[clear]

## definition
Glycogen synthase, the key enzyme of glycogenesis, transfers the glucose unit of UDP-glucose
onto the non-reducing end of an existing glycogen primer, linking it by an α1,4 glucosidic
bond and elongating the chain. Once a chain reaches a minimum length (about 11 glucose
units), the branching enzyme (amylo-1,4→1,6 transglucosidase) transfers a block of the
outer chain (minimum 6 glucose units) to a nearby chain, attaching it by a new α1,6 bond and
creating a branch point; glycogen synthase then elongates the new branch again. This
repeated branching is what makes glycogen a compact, highly branched, rapidly mobilisable
store rather than a single long chain.

## explicit_objective
Name the bond each enzyme makes (glycogen synthase: α1,4; branching enzyme: α1,6) and explain why repeated branching, not chain length alone, is what makes glycogen a fast store of glucose.

## pitfalls
Confusing glycogen synthase's elongation step with the branching enzyme's transfer step —
they are sequential, not alternative, actions: synthase always makes the 1,4 bond; only the
branching enzyme makes the new 1,6 bond, and only after a minimum chain length is reached.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Carbohydrate metabolism

## subtopic
Glycogenesis

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > CHO Metabolism > Glycogenesis

## article_ids
ART-FND-CHO-PATHWAY-ENZYMES

## related_article_ids
ART-FND-SPECIMEN-HANDLING

## related_concept_ids
CON-FND-1FC7D932D7EFDC | CON-FND-CA74978B7B7ED1

## resource_ids
src_afc87efebd1aaf64f595

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
AU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-AU103-BIOC-13

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Glycogen Synthase... Catalyzes the transfer of Glucose units from UDP-glucose to Glycogen
primer... linked by a 1,4 Glucosidic Bond... Branching Enzyme... transfers parts of the
elongated chain... to be linked to the nearest chain by a 1,6 Glucosidic linkage." —
CHO Metabolism - Agha, p.20

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-1FC7D932D7EFDC

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
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "glycogen synthase" and "debranching enzyme" — the only pending hit (Kasr 103-BMS-mcq-carbohydrate-concepts.md, CON-FND-1FC7D932D7EFDC) covers the UDP-glucose/UTP activation cost, not the transfer/branching mechanism itself; a second pending record (CON-FND-CA74978B7B7ED1) covers only the hormonal on/off switch. Neither teaches which bond each enzyme makes.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: CON-FND-1FC7D932D7EFDC ("glycogen synthesis runs on UDP-glucose, costs a UTP") is about activation energetics, a different objective from this concept's bond-forming mechanism; genuinely distinct grain per the 00-START-HERE tiebreaker (a question could ask either without the other), so cross-linked and not merged.
relationships: Cross-linked to both pending records (prerequisite_of: UDP-glucose activation precedes the transfer step this concept teaches; part_of: hormonal regulation acts on the enzyme this concept describes).
examSignal: WAF Q34 (p9, keyed a) | AGHA-CHO Q44-45,78,93,97,108 (p10,18,20)

---

# Item
## id
CON-FND-0189D5EC600BC7

## label
Debranching enzyme removes the last glucose at a branch point by hydrolysis, the one step glycogen phosphorylase cannot do

## canonical_key
glycogenolysis.debranching-enzyme-mechanism

## aliases
Debranching enzyme | Amylo-1,6-glucosidase | Glycogen phosphorylase stalls at branch points

## arabic_label
آلية إنزيم نزع التفريع

## arabic_aliases
[clear]

## definition
Glycogen phosphorylase, the rate-limiting enzyme of glycogenolysis, acts on α1,4 bonds at
the outer branches of glycogen, releasing successive glucose-1-phosphate units by
phosphorolysis until four glucose residues remain on either side of an α1,6 branch point,
where it stops. The debranching enzyme then completes the job in two steps: it transfers a
trisaccharide block from one branch to expose the α1,6 point, and then hydrolyses that
single remaining α1,6-linked glucose with water, releasing it as free glucose rather than as
glucose-1-phosphate.

## explicit_objective
Explain why glycogen phosphorylase alone cannot fully break down a branched glycogen molecule, and state what product the debranching enzyme releases and by what kind of reaction.

## pitfalls
Assuming every glucose released during glycogenolysis is glucose-1-phosphate. The single
glucose the debranching enzyme releases at each branch point is free glucose (via
hydrolysis, using water), not glucose-1-phosphate (via phosphorolysis, using inorganic
phosphate) — the two enzymes use different reaction chemistry for a reason.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Carbohydrate metabolism

## subtopic
Glycogenolysis

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > CHO Metabolism > Glycogenolysis

## article_ids
ART-FND-CHO-PATHWAY-ENZYMES

## related_article_ids
ART-FND-SPECIMEN-HANDLING

## related_concept_ids
CON-FND-3905E3B98C2EC4 | CON-FND-1BE461A57AB76D

## resource_ids
src_afc87efebd1aaf64f595

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
AU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-AU103-BIOC-14

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Debranching Enzyme (Amylo 1,6 glucosidase): Remove the last glucose at the Branching point
by adding H2O producing free glucose." — CHO Metabolism - Agha, p.22

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-3905E3B98C2EC4

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
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "debranching enzyme" specifically — genuinely no hit anywhere, confirmed by both find-existing.mjs and a direct grep of the matching Kasr pending file (103-BMS-mcq-carbohydrate-concepts.md), which covers phosphorylase's product/tissue-fate and the reciprocal hormonal switch but not the debranching step.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: CON-FND-3905E3B98C2EC4 ("glycogen breakdown yields mostly glucose-1-phosphate, and only the liver can turn it into blood glucose") is about phosphorylase's own product and tissue fate, not the debranching step that lets phosphorolysis continue past a branch point — distinct objective, cross-linked not merged.
relationships: Cross-linked to the phosphorylase-product concept (mechanism_step_before) and to Von Gierke's disease (CON-FND-1BE461A57AB76D, complication_of candidate for a downstream disorder of the same pathway family).
examSignal: EGYF Q14 (p3, keyed c) | AGHA-CHO Q79,94,96 (p18)

---

# Item
## id
CON-FND-4137F8A0A3E8AE

## label
A haemolysed sample falsely raises intracellular analytes such as potassium, AST and LDH because the cells have released their contents into the plasma

## canonical_key
labmedicine.hemolysed-sample.analyte-interference

## aliases
Haemolysed sample interference | Pseudohyperkalaemia | Preanalytical haemolysis error

## arabic_label
تداخل العينة المنحلة مع نتائج المعمل

## arabic_aliases
[clear]

## definition
Red cells hold potassium, AST, LDH and other analytes at far higher intracellular
concentrations than plasma. When a blood sample is haemolysed — during collection,
handling or storage — those analytes leak into the plasma and are falsely reported as
raised, even though the patient's true circulating level is normal. Recognising a
haemolysed sample from its appearance is what prevents a false diagnosis being chased.

## explicit_objective
Name at least two analytes a haemolysed sample falsely raises, and explain why an intracellular concentration gradient is the mechanism.

## pitfalls
Treating a raised potassium or LDH in a visibly haemolysed sample as a true clinical finding rather than requesting a repeat sample first.

## concept_type
investigation

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
Clinical biochemistry

## subtopic
Specimen quality

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Applied clinical biochemistry

## article_ids
ART-FND-SPECIMEN-HANDLING

## related_article_ids
ART-FND-PHOTOMETRY-LAB

## related_concept_ids
[clear]

## resource_ids
src_5309ee19e1149a5bbe9d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.6

## academic_relevance
0.5

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-AU103-BIOC-15

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"In a hemolyzed sample, AST, LDH, Potassium, ALT will falsely increase." — Practical Blood Questions bank, Biochemistry Spot 1

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
resourceOccurrenceIds: Hand-authored from the practical bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus with the concept's own distinctive terms — no candidate record exists; this applied/clinical-biochemistry cluster is not in the department book's own contents page at all.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Same-topic proximity within the applied/clinical-biochemistry cluster; specific cross-links noted per concept where a genuine mechanism relationship exists.
examSignal: PRAC-BIOCHEM Spot 1 (Biochemistry Answers page)

---

# Item
## id
CON-FND-9DB220EDC15C62

## label
Ammonium chloride lyses red cells osmotically while ether dissolves the membrane's lipid — two different mechanisms reaching the same haemolysis

## canonical_key
labmedicine.rbc-lysis.osmotic-versus-lipid-solvent-mechanisms

## aliases
RBC lysis mechanisms | 0.9% NH4Cl haemolysis | Ether haemolysis | Osmotic fragility reagents

## arabic_label
آليات انحلال خلايا الدم الحمراء

## arabic_aliases
[clear]

## definition
Ammonium chloride causes haemolysis because the red cell membrane is permeable to
ammonium ions but not to chloride ions: ammonium diffuses in, water follows to restore
osmotic balance, and the membrane ruptures under the resulting osmotic pressure. Ether,
by contrast, causes haemolysis by dissolving the lipid component of the membrane
directly — a chemical-solvent mechanism with no osmotic step at all.

## explicit_objective
Explain the osmotic mechanism by which ammonium chloride lyses red cells, and contrast it with ether's lipid-dissolving mechanism.

## pitfalls
Assuming every haemolytic reagent works the same way. An examiner testing 'which reagent dissolves the membrane's lipid' wants ether named specifically, not a generic osmotic answer.

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
Clinical biochemistry

## subtopic
Specimen quality

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Applied clinical biochemistry

## article_ids
ART-FND-SPECIMEN-HANDLING

## related_article_ids
ART-FND-PHOTOMETRY-LAB

## related_concept_ids
[clear]

## resource_ids
src_5309ee19e1149a5bbe9d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

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
0.35

## confidence
0.75

## atomic_claim_ids
CLM-AU103-BIOC-16

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The membrane of RBC is permeable to Ammonium ions and not to the chloride ions, so ammonium diffuses inside the RBCs... Ether [causes hemolysis by dissolving the lipid part of the membrane]." — Practical Blood Questions bank, Biochemistry Spot 2

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
resourceOccurrenceIds: Hand-authored from the practical bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus with the concept's own distinctive terms — no candidate record exists; this applied/clinical-biochemistry cluster is not in the department book's own contents page at all.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Same-topic proximity within the applied/clinical-biochemistry cluster; specific cross-links noted per concept where a genuine mechanism relationship exists.
examSignal: PRAC-BIOCHEM Spot 2 (Biochemistry Answers page)

---

# Item
## id
CON-FND-DC01E117AAEEBA

## label
Seliwanoff's test detects fructose in urine, distinguishing hereditary fructose intolerance from other causes of infant vomiting

## canonical_key
labmedicine.seliwanoffs-test.fructose-detection

## aliases
Seliwanoff's test | Fructose detection in urine

## arabic_label
اختبار سيليوانوف

## arabic_aliases
[clear]

## definition
Seliwanoff's test is a colour reaction used to detect fructose in a urine sample. In a
child with recurrent vomiting after fruit or sucrose intake, a positive Seliwanoff's
test confirms fructosuria and points to a fructose-metabolising enzyme deficiency
(fructokinase in essential fructosuria, or aldolase B in hereditary fructose
intolerance) as the cause, rather than another cause of vomiting.

## explicit_objective
Name the test used to confirm fructose in urine, and state which enzyme deficiency it points to in a vomiting infant with a fruit-triggered pattern.

## pitfalls
Ordering a generic urine glucose test instead of Seliwanoff's test when fructose, not glucose, is the sugar in question — the two tests are not interchangeable.

## concept_type
investigation

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
Clinical biochemistry

## subtopic
Carbohydrate disorders

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Applied clinical biochemistry

## article_ids
ART-FND-GLYCAEMIC-MONITORING

## related_article_ids
ART-IMM-IMMUNOGLOBULINS

## related_concept_ids
[clear]

## resource_ids
src_5309ee19e1149a5bbe9d

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
AU_Y1=0.4

## clinical_relevance
0.6

## academic_relevance
0.5

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-AU103-BIOC-17

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"1. What is the test's name? [Seliwanoff's test] ... 3. Which enzyme is deficient in the patient? [Aldolase B]" — Practical Blood Questions bank, Biochemistry Spot 3

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
resourceOccurrenceIds: Hand-authored from the practical bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus with the concept's own distinctive terms — no candidate record exists; this applied/clinical-biochemistry cluster is not in the department book's own contents page at all.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Same-topic proximity within the applied/clinical-biochemistry cluster; specific cross-links noted per concept where a genuine mechanism relationship exists.
examSignal: PRAC-BIOCHEM Spot 3 (Biochemistry Answers page)

---

# Item
## id
CON-FND-4B28A338953D39

## label
Renal glucosuria is glucose in the urine despite a normal or low plasma glucose, and plasma, not whole blood, is what glycaemic control is measured from

## canonical_key
labmedicine.renal-glucosuria.plasma-versus-whole-blood-glucose

## aliases
Renal glucosuria | Renal threshold for glucose | Plasma vs whole blood glucose

## arabic_label
سكر الكلى وسكر البلازما مقابل الدم الكامل

## arabic_aliases
[clear]

## definition
Renal glucosuria is glucose appearing in urine while the plasma glucose remains at or
below the normal renal threshold (about 180 mg/dL), so it is ruled out by an oral
glucose tolerance test showing a normal plasma glucose curve. For glycaemic control,
serum or plasma is the specimen used to estimate glucose concentration, while a
separate whole-blood sample is what point-of-care glucometers typically measure — the
two are not numerically interchangeable.

## explicit_objective
Define renal glucosuria and name the test that rules it out, and state which specimen (plasma or whole blood) is used for glycaemic-control glucose estimation.

## pitfalls
Assuming glucosuria always means diabetes. A normal OGTT with glucosuria present points to a renal tubular defect (a low renal threshold), not hyperglycaemia.

## concept_type
investigation

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
Clinical biochemistry

## subtopic
Carbohydrate disorders

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Applied clinical biochemistry

## article_ids
ART-FND-GLYCAEMIC-MONITORING

## related_article_ids
ART-IMM-IMMUNOGLOBULINS

## related_concept_ids
[clear]

## resource_ids
src_5309ee19e1149a5bbe9d

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
AU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.6

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-AU103-BIOC-18

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Renal glucosuria is defined as [glucose in urine despite normal/low plasma glucose]... it can be ruled out by using [OGTT] test." — Practical Blood Questions bank, Biochemistry Spot 4

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
resourceOccurrenceIds: Hand-authored from the practical bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus with the concept's own distinctive terms — no candidate record exists; this applied/clinical-biochemistry cluster is not in the department book's own contents page at all.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Same-topic proximity within the applied/clinical-biochemistry cluster; specific cross-links noted per concept where a genuine mechanism relationship exists.
examSignal: PRAC-BIOCHEM Spot 4 (Biochemistry Answers page)

---

# Item
## id
CON-FND-EC85494A11DFC1

## label
A spectrophotometer holds the sample in a cuvette and selects the measuring wavelength with a monochromator or filter

## canonical_key
labmedicine.spectrophotometry.cuvette-and-monochromator

## aliases
Spectrophotometry principles | Cuvette | Monochromator | Filter (spectrophotometry)

## arabic_label
مبادئ قياس الطيف الضوئي

## arabic_aliases
[clear]

## definition
A spectrophotometer measures the concentration of a coloured solution from the light it
absorbs. The cuvette is the optically transparent cell that holds the coloured solution
in the light path; the filter (or monochromator, in a more precise instrument)
selectively transmits the one wavelength the assay needs and absorbs the rest, so that
only light the compound of interest actually absorbs reaches the detector.

## explicit_objective
State the function of the cuvette and of the filter/monochromator in a spectrophotometer, and explain why selecting one wavelength matters for an accurate reading.

## pitfalls
Confusing the cuvette (which holds the sample) with the filter (which selects the wavelength) — a question naming one component's function is testing whether the two are kept apart.

## concept_type
investigation

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
Clinical biochemistry

## subtopic
Laboratory methods

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Applied clinical biochemistry

## article_ids
ART-FND-PHOTOMETRY-LAB

## related_article_ids
ART-FND-GLYCAEMIC-MONITORING

## related_concept_ids
CON-FND-4BEF6B38D02CDC

## resource_ids
src_5309ee19e1149a5bbe9d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

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
0.5

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-AU103-BIOC-19

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"1. What is the importance of cuvette? [Optically transparent cells used to contain the colored solution] 2. ... [Filter]" — Practical Blood Questions bank, Biochemistry Spot 7

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
resourceOccurrenceIds: Hand-authored from the practical bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus with the concept's own distinctive terms — no candidate record exists; this applied/clinical-biochemistry cluster is not in the department book's own contents page at all.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Same-topic proximity within the applied/clinical-biochemistry cluster; specific cross-links noted per concept where a genuine mechanism relationship exists.
examSignal: PRAC-BIOCHEM Spot 7,12 (Biochemistry Answers page)

---

# Item
## id
CON-FND-4BEF6B38D02CDC

## label
A nephelometer measures scattered light and outperforms a colorimeter for reading turbidity

## canonical_key
labmedicine.turbidity.nephelometer-versus-colorimeter

## aliases
Nephelometer | Turbidity measurement | Colorimeter vs nephelometer

## arabic_label
قياس العكارة بالمقياس الرشي

## arabic_aliases
[clear]

## definition
Turbidity — cloudiness from suspended particles — is better measured by a nephelometer,
which detects the light scattered at an angle by suspended particles, than by a
colorimeter, which measures light absorbed along the direct beam path and is designed
for coloured solutions rather than particulate suspensions.

## explicit_objective
State which instrument is preferred for measuring turbidity and why it outperforms a colorimeter for that purpose.

## pitfalls
Assuming a colorimeter can substitute for a nephelometer whenever a sample is cloudy rather than coloured — the two instruments measure different optical phenomena (absorbance vs. scatter).

## concept_type
investigation

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
Clinical biochemistry

## subtopic
Laboratory methods

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Applied clinical biochemistry

## article_ids
ART-FND-PHOTOMETRY-LAB

## related_article_ids
ART-FND-GLYCAEMIC-MONITORING

## related_concept_ids
CON-FND-EC85494A11DFC1

## resource_ids
src_5309ee19e1149a5bbe9d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

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
0.35

## confidence
0.75

## atomic_claim_ids
CLM-AU103-BIOC-20

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"[Nephelometer] is better than the colorimeter in measuring turbidity." — Practical Blood Questions bank, Biochemistry Spot 5

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
resourceOccurrenceIds: Hand-authored from the practical bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus with the concept's own distinctive terms — no candidate record exists; this applied/clinical-biochemistry cluster is not in the department book's own contents page at all.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Same-topic proximity within the applied/clinical-biochemistry cluster; specific cross-links noted per concept where a genuine mechanism relationship exists.
examSignal: PRAC-BIOCHEM Spot 5 (Biochemistry Answers page)

---

# Item
## id
CON-FND-3198F7B954BF0E

## label
A laboratory error is preanalytical, analytical or postanalytical depending on where in the testing process it happened

## canonical_key
labmedicine.error-classification.preanalytical-analytical-postanalytical

## aliases
Preanalytical error | Analytical error | Postanalytical error | Laboratory error classification

## arabic_label
تصنيف أخطاء المعمل

## arabic_aliases
[clear]

## definition
Laboratory errors are classified by the stage of testing at which they occur.
Mislabelling a patient sample is a preanalytical error (before the specimen is
analysed); a breakdown in the instrument performing the test is an analytical error
(during measurement); an error in reporting or transcribing a correct result is
postanalytical (after measurement). Most laboratory errors are preanalytical, which is
why specimen identification and handling receive so much quality-control attention.

## explicit_objective
Classify a given laboratory error as preanalytical, analytical or postanalytical from a description of when in the testing process it occurred.

## pitfalls
Labelling every laboratory mistake 'analytical' by default. An error in patient/sample identification, storage or transport is preanalytical even though it eventually shows up as a wrong result.

## concept_type
classification

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
Clinical biochemistry

## subtopic
Laboratory quality control

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Applied clinical biochemistry

## article_ids
ART-FND-SPECIMEN-HANDLING

## related_article_ids
ART-FND-PHOTOMETRY-LAB

## related_concept_ids
[clear]

## resource_ids
src_5309ee19e1149a5bbe9d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.5

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-AU103-BIOC-21

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"When you mislabel a patient sample. It is a [Preanalytical] error... A breakdown in an instrument used in the test is considered to be [Analytical] error." — Practical Blood Questions bank, Biochemistry Spots 5, 13

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
resourceOccurrenceIds: Hand-authored from the practical bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus with the concept's own distinctive terms — no candidate record exists; this applied/clinical-biochemistry cluster is not in the department book's own contents page at all.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Same-topic proximity within the applied/clinical-biochemistry cluster; specific cross-links noted per concept where a genuine mechanism relationship exists.
examSignal: PRAC-BIOCHEM Spot 5,13 (Biochemistry Answers page)

---

# Item
## id
CON-FND-D740F7CB9D13CB

## label
Fructosamine reports glycaemic control over the last two to three weeks, where HbA1c reports the last two to three months

## canonical_key
labmedicine.glycaemic-monitoring.hba1c-versus-fructosamine-window

## aliases
Fructosamine | Glycaemic monitoring window | HbA1c vs fructosamine

## arabic_label
مراقبة التحكم بسكر الدم: الفركتوزامين مقابل الهيموجلوبين السكري

## arabic_aliases
[clear]

## definition
Fructosamine measures glycated plasma proteins (mainly albumin), whose shorter half-
life gives it a monitoring window of roughly the last two to three weeks — useful when
a more recent picture of glycaemic control is needed than HbA1c's two-to-three-month
window can give, for example in pregnancy or after a recent change in treatment.

## explicit_objective
State the time window fructosamine reports glycaemic control over, and explain why it differs from HbA1c's window.

## pitfalls
Treating fructosamine as a replacement for HbA1c rather than a complementary test with a shorter window — the choice between them depends on how recent a picture of control is needed.

## concept_type
investigation

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
Clinical biochemistry

## subtopic
Carbohydrate disorders

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Applied clinical biochemistry

## article_ids
ART-FND-GLYCAEMIC-MONITORING

## related_article_ids
ART-IMM-IMMUNOGLOBULINS

## related_concept_ids
CON-END-839E4F7D92FBEF

## resource_ids
src_5309ee19e1149a5bbe9d

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
AU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.5

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-AU103-BIOC-22

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"A 27 year old female with sickle anemia... Mention a good test to judge her diabetic control within the last 3 weeks [Fructosamine]." — Practical Blood Questions bank, Biochemistry Spot 9

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
resourceOccurrenceIds: Hand-authored from the practical bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus with the concept's own distinctive terms — no candidate record exists; this applied/clinical-biochemistry cluster is not in the department book's own contents page at all.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Same-topic proximity within the applied/clinical-biochemistry cluster; specific cross-links noted per concept where a genuine mechanism relationship exists.
examSignal: PRAC-BIOCHEM Spot 9,12 (Biochemistry Answers page)

---

# Item
## id
CON-FND-B49ED9369565EE

## label
Microalbuminuria detects diabetic nephropathy before overt proteinuria develops

## canonical_key
labmedicine.microalbuminuria.early-nephropathy-marker

## aliases
Microalbuminuria | Early diabetic nephropathy marker | Albumin-to-creatinine ratio

## arabic_label
زلال البول الدقيق

## arabic_aliases
[clear]

## definition
Microalbuminuria is the detection of albumin in urine at concentrations below what
standard urine dipsticks (which detect overt proteinuria) can pick up. Because it is
the earliest laboratory sign of diabetic nephropathy, testing for it lets treatment
start before structural kidney damage becomes irreversible; a first-morning-void
sample is preferred because it shows less variation in the albumin-to-creatinine ratio
than a random daytime sample.

## explicit_objective
State what microalbuminuria detects and why it matters clinically, and explain why a first-morning-void sample is preferred for measuring it.

## pitfalls
Waiting for a positive standard urine dipstick before screening a diabetic patient for nephropathy — by the time the dipstick is positive, the disease has already progressed past the stage microalbuminuria testing is designed to catch.

## concept_type
investigation

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
Clinical biochemistry

## subtopic
Carbohydrate disorders

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Applied clinical biochemistry

## article_ids
ART-FND-GLYCAEMIC-MONITORING

## related_article_ids
ART-IMM-IMMUNOGLOBULINS

## related_concept_ids
[clear]

## resource_ids
src_5309ee19e1149a5bbe9d

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
AU_Y1=0.4

## clinical_relevance
0.6

## academic_relevance
0.5

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-AU103-BIOC-23

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Microalbuminuria test is used for... assisting in diagnosis of early sign of nephropathy before the Development of proteinuria." — Practical Blood Questions bank, Biochemistry Spot 8

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
resourceOccurrenceIds: Hand-authored from the practical bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus with the concept's own distinctive terms — no candidate record exists; this applied/clinical-biochemistry cluster is not in the department book's own contents page at all.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Same-topic proximity within the applied/clinical-biochemistry cluster; specific cross-links noted per concept where a genuine mechanism relationship exists.
examSignal: PRAC-BIOCHEM Spot 8,11,12 (Biochemistry Answers page)

---

# Item
## id
CON-FND-6FEED17793F861

## label
Potassium oxalate and sodium fluoride anticoagulate blood by precipitating calcium as an insoluble salt

## canonical_key
labmedicine.anticoagulant-tubes.oxalate-fluoride-versus-calcium-precipitation

## aliases
Potassium oxalate | Sodium fluoride | Anticoagulant tube chemistry

## arabic_label
كيمياء أنابيب مضادات التجلط

## arabic_aliases
[clear]

## definition
Some anticoagulant tube additives, including potassium oxalate and sodium fluoride,
prevent clotting by precipitating the calcium in the sample as an insoluble calcium
salt, removing the calcium that coagulation depends on — a different mechanism from
additives such as heparin (which acts through antithrombin) or citrate (which chelates
calcium in solution rather than precipitating it).

## explicit_objective
Name two anticoagulants that work by precipitating calcium, and state the mechanism by which removing calcium prevents clotting.

## pitfalls
Treating all anticoagulant tube additives as working by the same mechanism — precipitating calcium (oxalate, fluoride) is chemically distinct from chelating it in solution (citrate, EDTA) or from potentiating a natural inhibitor (heparin).

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
Clinical biochemistry

## subtopic
Specimen quality

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Applied clinical biochemistry

## article_ids
ART-FND-SPECIMEN-HANDLING

## related_article_ids
ART-FND-PHOTOMETRY-LAB

## related_concept_ids
[clear]

## resource_ids
src_5309ee19e1149a5bbe9d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.5

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-AU103-BIOC-24

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Mention 2 anticoagulants that makes insoluble Calcium salts [Potassium Oxalate, Sodium Flouride]." — Practical Blood Questions bank, Biochemistry Spot 11

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
resourceOccurrenceIds: Hand-authored from the practical bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus with the concept's own distinctive terms — no candidate record exists; this applied/clinical-biochemistry cluster is not in the department book's own contents page at all.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Same-topic proximity within the applied/clinical-biochemistry cluster; specific cross-links noted per concept where a genuine mechanism relationship exists.
examSignal: PRAC-BIOCHEM Spot 11,13 (Biochemistry Answers page)

---

# Item
## id
CON-FND-6B493D91647B78

## label
The oral glucose tolerance test is used to confirm equivocal diabetes and is avoided in already-confirmed or hospitalised patients

## canonical_key
labmedicine.ogtt.indications-and-contraindications

## aliases
Oral glucose tolerance test (OGTT) | OGTT indications | OGTT contraindications

## arabic_label
اختبار تحمل الجلوكوز الفموي

## arabic_aliases
[clear]

## definition
The oral glucose tolerance test measures the plasma glucose response to a standard oral
glucose load, and is indicated to confirm equivocal cases (for example, ruling out
benign renal glucosuria, or borderline results in pregnancy) rather than to diagnose
patients whose diabetes is already confirmed. It is avoided in already-confirmed
diabetic patients and in hospitalised or acutely unwell patients, whose glucose
handling is disturbed by illness rather than by the question the test is meant to
answer.

## explicit_objective
Name at least two situations that call for an OGTT and two in which it is not advised, and explain why confirmed diabetics do not need one.

## pitfalls
Ordering an OGTT on a patient with already-confirmed diabetes or on an acutely hospitalised patient — the test is for resolving diagnostic uncertainty, not for monitoring or for patients whose acute illness would distort the result.

## concept_type
investigation

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
Clinical biochemistry

## subtopic
Carbohydrate disorders

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Applied clinical biochemistry

## article_ids
ART-FND-GLYCAEMIC-MONITORING

## related_article_ids
ART-IMM-IMMUNOGLOBULINS

## related_concept_ids
CON-FND-4B28A338953D39

## resource_ids
src_5309ee19e1149a5bbe9d

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
AU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.5

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-AU103-BIOC-25

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Oral glucose tolerance test is not advised to be done in [confirmed diabetic patients] and [hospitalized patients]." — Practical Blood Questions bank, Biochemistry Spot 10

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
resourceOccurrenceIds: Hand-authored from the practical bank; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus with the concept's own distinctive terms — no candidate record exists; this applied/clinical-biochemistry cluster is not in the department book's own contents page at all.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: none found on search.
relationships: Same-topic proximity within the applied/clinical-biochemistry cluster; specific cross-links noted per concept where a genuine mechanism relationship exists.
examSignal: PRAC-BIOCHEM Spot 6,10 (Biochemistry Answers page)

---

# Item
## id
CON-IMM-2CE147CEFDC67F

## label
Immunoglobulins are Y-shaped, two-light/two-heavy-chain glycoproteins, and the five classes differ by heavy-chain type and role

## canonical_key
immunoglobulin.structure-and-five-classes

## aliases
Immunoglobulin structure | IgG IgA IgM IgD IgE | Antibody classes | Heavy and light chains

## arabic_label
بنية الأجسام المضادة والفئات الخمس

## arabic_aliases
[clear]

## definition
Each immunoglobulin molecule is Y-shaped, built from two identical light chains and two
identical heavy chains joined by disulphide bonds; both chain types have a variable region
(forming the antigen-binding site) and a constant region. The five classes — IgG, IgA, IgM,
IgD and IgE — are distinguished by their heavy-chain type and each has a distinct role: IgG
is the main secondary-response antibody and crosses the placenta; IgA is secretory,
protecting mucosal surfaces; IgM is the first antibody made in a primary response and forms
a pentamer; IgD is a B-cell surface receptor; IgE mediates allergic (type I hypersensitivity)
reactions by binding mast cells and basophils.

## explicit_objective
State the shared structural plan of an immunoglobulin (light/heavy chains, variable/constant regions) and match each of the five classes to its heavy chain and its principal biological role.

## pitfalls
Assuming all antigen-binding happens on the constant region — it is the variable region, at
the amino-terminal end of both light and heavy chains, that forms the antigen-binding site.
Also, confusing which class predominates in the primary response (IgM) with which
predominates in the secondary response (IgG) is the single most common mix-up this topic
produces.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
imm

## primary_node_id
DIS-IMU-T02

## secondary_node_ids
DIS-BIO-T07

## topic
Immunology

## subtopic
Immunoglobulins

## microtopic
[clear]

## nanotopic
[clear]

## modules
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry > Immunoglobulins

## article_ids
ART-IMM-IMMUNOGLOBULINS

## related_article_ids
ART-HEM-HB-STRUCTURE-TYPES

## related_concept_ids
CON-IMM-FDB121DA9F9124 | CON-IMM-42AF5584580C2B

## resource_ids
src_4e9f6eb8be5aeedd4cf4

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.55

## exam_weight_by_year
AU_Y1=0.55

## clinical_relevance
0.6

## academic_relevance
0.8

## weight_confidence
0.45

## confidence
0.85

## atomic_claim_ids
CLM-AU103-BIOC-26

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Ig molecule is Y shaped with 4 polypeptide chains: 2 identical Light chains (L) & 2
identical Heavy chains (H)... The Variable regions have variable amino acid sequence and
form the antigen binding site." — Blood - Bio - Agha, p.18

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
resourceOccurrenceIds: Hand-authored from the department book and exam papers; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "immunoglobulin structure"; single-token "IgG"/"IgA"/"IgM" queries returned only substring false positives ("trigger", "ligament", "pigment" respectively, per LANE-BRIEF SS4's shortest-distinctive-word trap) — no genuine same-grain hit exists for Ig molecule structure and class function.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
conflicts: No source disagreement found on this fact.
rejectedMergeCandidateIds: CON-IMM-FDB121DA9F9124 and CON-IMM-42AF5584580C2B are live concepts about primary/secondary antibody-response *kinetics* (lag time, which class dominates when) — this concept teaches the molecule's own structure and the five classes' identities, a different objective; cross-linked, not merged.
relationships: Cross-linked to both live response-kinetics concepts (part_of: this concept's class identities are what those kinetics concepts name).
examSignal: EGY1 Q13 (p3, keyed C) | EGYF Q28-29 (p6-7) | WAF Q18 (p2, keyed c) | AGHA-BLOOD Q9,22-23,27,29-33,45,64,71 (p5-8,10,13-15)

