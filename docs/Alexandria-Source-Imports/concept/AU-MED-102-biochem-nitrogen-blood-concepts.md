<!--
  AU-MED-102 · Biochemistry · sub-lane C (vitamin/heme/blood biochemistry).
  Source: docs/Alexandria-Source-Imports/coverage/AU-MED-102-biochemistry-triage.md §3.H
  (Blood, 21 distinct ideas after H4 was dropped as a duplicate of sub-lane A's C35) plus
  the two Enzymology exceptions D35/D37 and the three Protein-Chemistry exceptions
  C37/C38/C39 that §9's sub-lane-ownership split reassigned here. All source text quoted
  in original_wording was read directly from scripts/alexandria/pagetext/src_01ab4268402d32d4d111.json
  (AFM bank, "BLOOD" section, pages 38-42 of the extracted text), never hand-transcribed
  from a render.

  13 concepts below are NEW (no hit anywhere in live state or any *-Source-Imports/concept
  batch, per the mandatory find-existing.mjs ≥4-query search plus grep -ril on the intended
  canonical key, both run before minting). One (Immunoglobulin light chains) is a sparse
  update to a LIVE concept, CON-IMM-8F37F8822F1157.

  Eight further ideas from this same split (D35, D37, H6+H9 combined, C37, C38, C39, H11,
  H21) turned out to be HIT-PENDING against six different unimported Kasr batches and are
  NOT in this file — they are sparse updates in
  docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-nitrogen-blood.md instead,
  per LANE-BRIEF §16 rule 1.

  One idea from the triage's own paraphrase (H14, "propionic acid metabolism requires
  biotin") did not survive contact with the source: reading the actual page text
  (src_01ab4268402d32d4d111, Blood Q19) shows the printed key selects "Vitamin B12", not
  "Biotin" — the source is teaching that B12 deficiency (methylmalonyl-CoA mutase) blocks
  propionate catabolism, the same mechanism as H8, not a biotin/propionyl-CoA-carboxylase
  fact. Q19 is folded into H8's concept below instead. A concept ID was minted for the
  original (wrong) framing, CON-FND-BEB61FE14E5926 from canonical key
  "propionate.propionylcoa-carboxylase.biotin-requirement", before this was caught — it is
  reported as unused in this lane's §8 report and never written to any file.

  Import: Admin › Concepts › Import. Order: article → concept (this file's articles are in
  article/AU-MED-102-biochem-nitrogen-blood-articles.md, same batch hand-over).
-->

# Item

## label
Delta-aminolevulinate (ALA) synthase is the rate-limiting enzyme of haem biosynthesis, requiring pyridoxal phosphate and condensing glycine with succinyl-CoA

## id
CON-HEM-6BA5D04F841FBA

## canonical_key
heme.biosynthesis.ala-synthase-rate-limiting-step

## aliases
ALA synthase
Delta-aminolevulinate synthase
Rate-limiting enzyme of heme synthesis
ALAS

## arabic_label
إنزيم أمينوليفولينيك سينثيز محدد سرعة تخليق الهيم

## arabic_aliases
الإنزيم المحدد لمعدل تخليق الهيم

## definition
The committed, rate-limiting step of haem biosynthesis is catalysed by ALA synthase, a mitochondrial enzyme that condenses glycine with succinyl-CoA to form delta-aminolevulinic acid (ALA), releasing CO2 and CoA-SH. The reaction absolutely requires pyridoxal phosphate (the active form of vitamin B6) as coenzyme. No other listed cofactor (TPP, ATP, PABA) will substitute, and no other listed amino acid (alanine, cysteine, serine) is the true second substrate — glycine is, which is why a question offering only those three distractors is correctly answered "none of the above".

## explicit_objective
Name the rate-limiting enzyme of haem synthesis, its two substrates, and its obligatory coenzyme.

## pitfalls
Reaching for TPP (thiamine pyrophosphate) as the coenzyme because it is the reflexive answer for "decarboxylation/condensation" reactions elsewhere in metabolism. ALA synthase specifically needs pyridoxal phosphate, because the reaction proceeds through a PLP-glycine Schiff base intermediate exactly as in other amino-acid-handling PLP enzymes. The second trap is assuming the second substrate must be one of a list of "similar" amino acids (alanine, cysteine, serine) rather than recognising that glycine, the true substrate, is often deliberately left off the option list to test whether the student notices its absence.

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
SYS-HEM-T01-S01 | SYS-HEM-T02

## topic
Clinical biochemistry

## subtopic
Biosynthesis of Heme

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Heme Metabolism > Biosynthesis of Heme

## article_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## related_article_ids
ART-HEM-AU102-HEMOGLOBIN-TYPES

## related_concept_ids
CON-HEM-4C0C6A97CA8788

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.15

## exam_weight_by_year
AU_Y1=0.15

## clinical_relevance
0.5

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p38 q1, p40 q15, p40 q16 | AU-MED-102

## atomic_claim_ids
CLM-AU102-HEM-ALA-SYNTHASE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"1. Rate limiting enzyme in heme synthesis is: ... ALA synthase"
"15. AIA synthase requires: ... PLP."
"16. AIA synthase catalyzes condensation of succinyl CoA with: ... None of the above."

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: The department has no Department Book for Biochemistry (triage §3); the canonical tree has nothing finer than DIS-BIO-T07 for this idea.
nanotopicId: No nanotopic exists below this level in the biochemistry branch.
arabicAliases: Researched and written; no further verification step is available to this lane.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM question bank's own answer key; this concept has no corpus extraction record.
sourceCandidateIds: find-existing.mjs run for "ALA synthase", "delta-aminolevulinate synthase" — the first hit is the pending AU-MED-102 question this lane is itself about to author (103-BMS-MCQ-protein-heme.md, a different module's bank, not merged); the second returned nothing. grep -ril across docs/*-Source-Imports/concept/ for the canonical key returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: None — no live or pending record states this specific fact (rate-limiting enzyme, substrates, coenzyme) at the same grain.
conflicts: None found in the source.
uncertainty: None — the bank's key is unambiguous on all three cited questions (§2 of the triage lists none of Q1/15/16 among the ambiguous "0"-key items).
relationships: Searched the live CON-HEM- namespace and this batch's own three sibling heme/haemoglobin concepts. Linked to CON-HEM-4C0C6A97CA8788 (Kasr's pending "lead inhibits ALA dehydratase and ferrochelatase" concept, same pathway, adjacent step) as the one genuinely specific edge; a full walk of every DIS-BIO-T07 sibling was not performed given lane scope and is owed to a later pass.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
Porphobilinogen, uroporphyrinogen and protoporphyrinogen are all intermediates on the haem biosynthetic pathway; urobilinogen is not — it is a product of haem's later breakdown, not its making

## id
CON-HEM-E37BFF798CC937

## canonical_key
heme.biosynthesis.pathway-intermediates-porphobilinogen-uroporphyrinogen-protoporphyrinogen

## aliases
Heme precursors
Haem biosynthesis intermediates
Porphyrin pathway intermediates

## arabic_label
السلائف الحيوية لتخليق الهيم

## arabic_aliases
بورفوبيلينوجين ويوروبورفيرينوجين وبروتوبورفيرينوجين

## definition
Haem is assembled through a sequence of pyrrole and porphyrin intermediates: porphobilinogen (from two ALA molecules), uroporphyrinogen, and protoporphyrinogen, which ferrochelatase finally converts to haem by inserting ferrous iron. Urobilinogen sounds like a member of the same family but belongs to the opposite process — it is a product of haem catabolism, formed in the gut from bilirubin after haem has already been broken down, not a step on the way to making it.

## explicit_objective
Name the three genuine intermediates of haem biosynthesis and distinguish urobilinogen as a catabolic product rather than a biosynthetic precursor.

## pitfalls
Grouping urobilinogen with the "-ogen" family by name pattern alone. Every other option in this question ends in "-ogen" and sits on the biosynthetic pathway; urobilinogen's suffix is the same but its chemistry belongs to the opposite direction — haem breakdown, not haem synthesis — which is exactly what makes it the effective distractor here.

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
SYS-HEM-T01-S01 | SYS-HEM-T02

## topic
Clinical biochemistry

## subtopic
Biosynthesis of Heme

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Heme Metabolism > Biosynthesis of Heme

## article_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## related_article_ids
ART-HEM-AU102-HEMOGLOBIN-TYPES

## related_concept_ids
CON-HEM-6BA5D04F841FBA | CON-HEM-4C0C6A97CA8788

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.1

## exam_weight_by_year
AU_Y1=0.1

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p38 q2 | AU-MED-102

## atomic_claim_ids
CLM-AU102-HEM-PRECURSORS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"2. All the following are precursors of heme, except: a- Porphobilinogen [b-] Urobilinogen c- Uroporphyrinogen d- Protoporphyrinogen" (correct answer b, per the printed key)

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level in the biochemistry branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank's own key; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "porphobilinogen", "uroporphyrinogen", "protoporphyrinogen" and "urobilinogen" individually — all four returned no existing record. grep -ril for the canonical key across docs/*-Source-Imports/concept/ returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: CON-HEM-66B1DEEC8ED961 (Kasr, pending) discusses porphyria's neuropsychiatric-vs-photosensitive clinical pattern depending on where the block falls — a related but genuinely distinct objective (clinical pattern vs identifying the intermediates themselves); not merged, and not linked into related_concept_ids because that record is unowned by this lane and outside its batch.
conflicts: None found in the source.
uncertainty: None — Q2's key (b) is unambiguous.
relationships: Linked to the two sibling heme-pathway concepts in this same batch and to Kasr's pending lead/ferrochelatase concept (same pathway). A full DIS-BIO-T07 sibling walk is owed to a later pass.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
Fetal haemoglobin (HbF, α2γ2) binds 2,3-BPG far more weakly than adult HbA (α2β2), which is the molecular reason HbF has the higher oxygen affinity that lets it pull oxygen across the placenta

## id
CON-HEM-25332F0339A5B2

## canonical_key
hemoglobin.fetal-vs-adult.composition-and-23bpg-affinity

## aliases
HbF vs HbA
Fetal haemoglobin composition
2,3-BPG and fetal haemoglobin
Alpha-2 gamma-2 haemoglobin

## arabic_label
الفرق بين هيموغلوبين الجنين والبالغ

## arabic_aliases
تركيب الهيموغلوبين الجنيني وألفته للأكسجين

## definition
Adult haemoglobin (HbA) is α2β2; fetal haemoglobin (HbF) replaces the beta chains with gamma chains, giving α2γ2. The gamma chain lacks the specific residues the beta chain offers for binding 2,3-bisphosphoglycerate (2,3-BPG), the red-cell metabolite that normally lowers hemoglobin's oxygen affinity. Because HbF cannot bind 2,3-BPG as effectively, it holds oxygen more tightly than HbA at the same partial pressure — the mechanism that lets the fetal circulation pull oxygen away from the maternal side across the placenta.

## explicit_objective
State the chain composition that distinguishes HbF from HbA and explain, from the 2,3-BPG-binding difference, why HbF has the higher oxygen affinity of the two.

## pitfalls
Assuming HbF's higher oxygen affinity is simply "because it is fetal" without the mechanism. The affinity difference is not innate to the gamma chain's oxygen-binding chemistry; it is downstream of 2,3-BPG binding — HbF binds 2,3-BPG poorly, so it is not allosterically shifted toward lower affinity the way HbA is, and that is the entire explanation asked for here.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-HEM-T01

## topic
Clinical biochemistry

## subtopic
Haemoglobin structure and function

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Haemoglobin > Fetal versus Adult Haemoglobin

## article_ids
ART-HEM-AU102-HEMOGLOBIN-TYPES

## related_article_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## related_concept_ids
CON-HEM-799C0064D0EB21 | CON-OBS-A94183DB543092

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.15

## exam_weight_by_year
AU_Y1=0.15

## clinical_relevance
0.6

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p38 q3, p39 q14 | AU-MED-102

## atomic_claim_ids
CLM-AU102-HEM-HBF-HBA-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"3. HbA differs from HbF in that: ... HbF cannot bind to 2,3-BPG"
"14. Fetal Hb is characterized by: [a-] Contains a2,Y2 chains."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-OBS-A94183DB543092

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank's own key; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "HbF", "fetal hemoglobin", "2,3-BPG" and "alpha2gamma2" — the first and last returned nothing; "fetal hemoglobin" returned only CON-OBS-A94183DB543092 (a maternal-fetal placental-physiology comparison, different objective, see rejectedMergeCandidateIds); "2,3-BPG" returned only Kasr's pending concept about the HMP-shunt's reason for running (103-BMS-biochemistry-concepts.md), a different objective again (why the shunt is worth running vs the HbF/HbA composition difference). grep -ril for the canonical key returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: CON-OBS-A94183DB543092 ("Fetal hemoglobin has 20-30% higher oxygen affinity than maternal adult hemoglobin") states the same directional fact from the obstetric/placental-physiology side, without the α2γ2-vs-α2β2 composition or the 2,3-BPG mechanism this concept explains. Two different objectives (what the placenta does with it, vs what the molecule is and why) — not merged, cross-linked instead.
conflicts: None found in the source.
uncertainty: None — Q3 and Q14's keys are unambiguous.
relationships: Cross-linked to the HbA2 concept in this same batch (same "haemoglobin variants" family) and to the live obstetric concept above. A full sibling walk of DIS-BIO-T05/SYS-HEM-T01 was not performed given lane scope.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
HbA2 is the minor adult haemoglobin, made of two alpha and two delta chains (α2δ2), distinct from both the major adult HbA (α2β2) and fetal HbF (α2γ2)

## id
CON-HEM-799C0064D0EB21

## canonical_key
hemoglobin.hba2.alpha2delta2-composition

## aliases
Alpha-2 delta-2 haemoglobin
Minor adult haemoglobin
HbA2 chain composition

## arabic_label
الهيموغلوبين البالغ الثانوي HbA2

## arabic_aliases
تركيب ألفا 2 دلتا 2 للهيموغلوبين

## definition
Beside the major adult haemoglobin HbA (α2β2, roughly 97% of adult haemoglobin) there is a minor adult form, HbA2 (α2δ2), which pairs the same two alpha chains with two delta chains rather than beta chains. Recognising HbA2's composition is what separates it, in a list of options, from HbA's β-chain pairing and HbF's γ-chain pairing.

## explicit_objective
State the chain composition of HbA2 and distinguish it from HbA and HbF by which globin chain pairs with alpha.

## pitfalls
Confusing HbA2's delta chain with HbF's gamma chain because both are "the other, minor haemoglobin" in a student's mental list. The three human hemoglobins in this comparison are told apart only by which second chain accompanies alpha — beta for HbA, gamma for HbF, delta for HbA2 — and mixing up gamma and delta is the single most common error this question is built to catch.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-HEM-T01

## topic
Clinical biochemistry

## subtopic
Haemoglobin structure and function

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Haemoglobin > Haemoglobin Variants

## article_ids
ART-HEM-AU102-HEMOGLOBIN-TYPES

## related_article_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## related_concept_ids
CON-HEM-25332F0339A5B2

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.1

## exam_weight_by_year
AU_Y1=0.1

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p39 q13 | AU-MED-102

## atomic_claim_ids
CLM-AU102-HEM-HBA2-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"13. HbA2 contains the following types of chains a- a2,B2 [b-] 02,82 c- 02,Y2 d- 52,82" (correct answer b, read as α2δ2, per the printed key)

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The source's OCR renders Greek letters as digits (α→0, δ→8), which this lane resolved by sequence position and by cross-checking against standard haemoglobin biochemistry (α2δ2 is the textbook HbA2 composition), not by trusting the garbled glyphs directly.

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank's own key; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "HbA2" and "alpha2delta2" — both returned nothing. grep -ril for the canonical key returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: None found at this grain.
conflicts: None found in the source once the OCR digit/Greek-letter substitution is resolved by sequence position rather than shape (per SHARED-TOOLCHAIN's "resolve by position, never by shape" rule).
relationships: Cross-linked to the HbF/HbA concept in this same batch.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
Vitamin K deficiency leaves the clotting factors II, VII, IX and X un-gamma-carboxylated, so they cannot bind calcium properly and coagulation is prolonged rather than accelerated

## id
CON-HEM-A8349B0F9F93BF

## canonical_key
vitamink.deficiency.gamma-carboxylation-of-clotting-factors

## aliases
Vitamin K and clotting factors
Gamma-carboxylation of glutamate residues
Vitamin K deficiency coagulation

## arabic_label
نقص فيتامين ك وتخثر الدم

## arabic_aliases
كربوكسلة الغلوتامات المعتمدة على فيتامين ك

## definition
Vitamin K's biochemical role is to act as a cofactor for the gamma-carboxylation of specific glutamate residues on clotting factors II, VII, IX and X, converting them to Gla residues that can chelate calcium and anchor the factors to phospholipid surfaces during coagulation. Without this carboxylation the factors are made but cannot function, so vitamin K deficiency — whether from malabsorption (obstructive jaundice, prolonged antibiotics wiping out the gut-flora source), or from a vitamin K antagonist such as dicoumarol — presents as prolonged coagulation time, never as accelerated clotting or as a haemolytic picture.

## explicit_objective
State vitamin K's biochemical function (gamma-carboxylation of clotting-factor glutamate residues) and predict the direction and nature of the coagulation defect its deficiency produces.

## pitfalls
Confusing vitamin K's actual biochemical job with the drugs that oppose it. The question distinguishes "converting prothrombin to thrombin" (a different, unrelated proteolytic step in the cascade) and "inhibiting lipid peroxidation" (a vitamin E function) from vitamin K's real role, which is post-translational carboxylation, not activation of the cascade itself and not an antioxidant action.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T08

## secondary_node_ids
SYS-HEM-T02 | SYS-HEM-T03

## topic
Nutrition

## subtopic
Vitamin K

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Vitamins > Vitamin K

## article_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## related_article_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## related_concept_ids
[clear]

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.15

## exam_weight_by_year
AU_Y1=0.15

## clinical_relevance
0.7

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p38 q5, p38 q6, p40 q17 | AU-MED-102

## atomic_claim_ids
CLM-AU102-HEM-VITK-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"6. Biochemical function of vitamin K is : ... Gamma carboxylation of glutamate in clotting factors"
"17. Vitamin k deficiency is manifested by: ... Prolonged coagulation time."
"5. Deficiency of vitamin K can occur in the following conditions, except; [a-] Following gastrectomy"

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-HEM-121DCA556B6311 | CON-HEM-A940AB960A5C0D

## conflicts
[clear]

## uncertainty
Q5's own printed key (a — "following gastrectomy" is the exception, i.e. does NOT typically cause vitamin K deficiency in this bank's teaching) is recorded as printed. Gastrectomy is a recognised, if less direct, route to fat-soluble-vitamin malabsorption in wider clinical teaching; this lane records the discrepancy rather than silently harmonising the two, per LANE-BRIEF's "record the questionable printed keys exactly as the triage did".

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank's own key; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "vitamin K", "gamma-carboxylation" and "clotting factor" — "vitamin K" and "clotting factor" return live CON-HEM- records about coumarin/warfarin pharmacology (rejected as merge candidates, see below); "gamma-carboxylation" returns nothing. grep -ril for the canonical key returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: CON-HEM-121DCA556B6311 ("Coumarins competitively inhibit vitamin K...") and CON-HEM-A940AB960A5C0D ("Dicumarol/warfarin acts only in vivo...") are both live concepts about the anticoagulant drugs that oppose vitamin K, not about vitamin K's own biochemical carboxylation function or the deficiency state's presentation. Different objective (drug pharmacology vs vitamin biochemistry) — not merged, cross-referenced here.
conflicts: Recorded above under uncertainty (Q5's gastrectomy answer).
relationships: Searched the live CON-HEM- namespace for "vitamin K"; the two hits are pharmacology-side records, named above rather than linked into related_concept_ids since they sit in a different batch this lane cannot edit back.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
Vitamin B12 deficiency blocks methylmalonyl-CoA mutase, so methylmalonic acid — and the propionate it derives from during amino-acid degradation — accumulates and is excreted in urine, which is the diagnostic marker that distinguishes a B12-driven macrocytic anaemia from a folate-driven one

## id
CON-HEM-6BB1F814D007D1

## canonical_key
vitaminb12.deficiency.methylmalonic-acid-excretion-marker

## aliases
Methylmalonic acid excretion
B12 deficiency diagnostic marker
Methylmalonyl-CoA mutase deficiency
Propionic acid accumulation in B12 deficiency

## arabic_label
حمض الميثيل مالونيك كعلامة لنقص فيتامين ب12

## arabic_aliases
تراكم حمض الميثيل مالونيك في نقص فيتامين ب12

## definition
Vitamin B12, as adenosylcobalamin, is the coenzyme for methylmalonyl-CoA mutase, the enzyme that converts methylmalonyl-CoA to succinyl-CoA on the pathway that disposes of propionyl-CoA generated from odd-chain fatty-acid oxidation and from the degradation of several amino acids (valine, isoleucine, methionine, threonine). When B12 is deficient this step is blocked, methylmalonyl-CoA (and the propionate upstream of it) accumulates, and methylmalonic acid appears in the urine. This is the specific biochemical marker that distinguishes B12 deficiency from folate deficiency — both cause the same macrocytic anaemia by impairing DNA synthesis, but only B12 deficiency raises methylmalonic acid, because folate has no role in this particular reaction.

## explicit_objective
Name methylmalonic acid as the compound excreted in B12 deficiency, explain the enzyme step B12 supports, and use it to distinguish B12 from folate deficiency at the biochemical level.

## pitfalls
Answering "biotin" when a question about propionate/propionic-acid handling is really asking about the *later* step. Biotin is the coenzyme for propionyl-CoA carboxylase, one step earlier in the same pathway (converting propionyl-CoA to methylmalonyl-CoA) — a genuine, adjacent fact, but not the one this bank's own key selects when the stem specifically frames "propionic acid accumulation... deficiency of which vitamin", where the printed answer is vitamin B12, testing methylmalonyl-CoA mutase, not the carboxylase step before it.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T08

## secondary_node_ids
SYS-HEM-T02

## topic
Nutrition

## subtopic
Vitamin B12

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Vitamins > Vitamin B12

## article_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## related_article_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## related_concept_ids
CON-HEM-351861BC9102DA

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.15

## exam_weight_by_year
AU_Y1=0.15

## clinical_relevance
0.7

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p39 q9, p40 q19 | AU-MED-102

## atomic_claim_ids
CLM-AU102-HEM-B12-MMA-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"9. Which compound is excreted in urine, in vitamin B12 deficiency? ... Methyl malonic acid"
"19. Propionic acid accumulation from amino acid degradation would result from a deficiency of which of the following vitamins? a- Vitamin B6 b- Biotin c- Folic acid [d-] Vitamin B12" (correct answer d, per the printed key — not biotin)

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank's own key; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "methylmalonic acid" and "B12 deficiency" — both returned nothing. Kasr's pending CON-FND-C9E5128193029E (water-soluble vitamins) mentions "cobalamin converts... methylmalonyl-CoA to succinyl-CoA" in passing within a nine-vitamin matching-question summary, but does not carry the excretion-marker/differential-diagnosis objective this concept states; linked as a related concept rather than merged. grep -ril for the canonical key returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: None found at this grain.
conflicts: None found in the source. Note this concept corrects the triage's own §3.H item 14 paraphrase ("propionic acid metabolism requires biotin"), which did not match the source's printed key on direct verification — recorded in this file's header comment and in this lane's §8 report.
relationships: Cross-linked to the B12-cobalt-content concept in this same batch (same vitamin, adjacent fact).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
Vitamin B12 (cobalamin) is named for the cobalt atom at the centre of its corrin ring — the only cobalt-containing vitamin

## id
CON-HEM-351861BC9102DA

## canonical_key
vitaminb12.structure.cobalt-content

## aliases
Cobalamin
Cobalt-containing vitamin
B12 structure

## arabic_label
فيتامين ب12 والكوبالت

## arabic_aliases
الكوبالامين

## definition
Vitamin B12's chemical name, cobalamin, comes directly from the cobalt ion held at the centre of its corrin ring — the structural feature that distinguishes it from every other vitamin, none of which is metal-centred in this way (copper, chromium and manganese are all distractors drawn from other trace-metal contexts, not from B12's own structure).

## explicit_objective
Name cobalt as the metal at the centre of vitamin B12's structure.

## pitfalls
Reaching for a metal associated with anaemia generally (iron) or with other named metalloenzymes (copper, as in cytochrome oxidase) rather than the one actually named in B12's own chemical name — "cobalamin" is the mnemonic the fact is built to test.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T08

## secondary_node_ids
SYS-HEM-T02

## topic
Nutrition

## subtopic
Vitamin B12

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Vitamins > Vitamin B12

## article_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## related_article_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## related_concept_ids
CON-HEM-6BB1F814D007D1

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.1

## exam_weight_by_year
AU_Y1=0.1

## clinical_relevance
0.3

## academic_relevance
0.6

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p39 q11 | AU-MED-102

## atomic_claim_ids
CLM-AU102-HEM-B12-COBALT-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"11. The metal present in vitamin B12 is: ... Cobalt"

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank's own key; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "cobalt" — the one hit is a pending AU-MED-102 question this lane is itself about to author (103-BMS-MCQ-vitamins.md, a different module's bank); no concept-level hit anywhere. grep -ril for the canonical key returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: None found at this grain.
conflicts: None found in the source.
relationships: Cross-linked to the methylmalonic-acid concept in this same batch (same vitamin).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
Each heavy chain of an immunoglobulin carries one variable domain (VH) and three constant domains (CH1-CH3), unlike the light chain's one-and-one

## id
CON-IMM-7B24522E4AA746

## canonical_key
immunoglobulin.heavy-chain.domain-count-one-variable-three-constant

## aliases
Heavy chain domains
VH and CH domains
Immunoglobulin heavy chain structure

## arabic_label
تركيب السلسلة الثقيلة للجلوبيولين المناعي

## arabic_aliases
النطاقات المتغيرة والثابتة للسلسلة الثقيلة

## definition
An immunoglobulin heavy chain is built of one variable domain (VH), which together with the light chain's variable domain forms the antigen-binding site, and three constant domains (CH1, CH2, CH3 — a fourth, CH4, replaces the hinge in IgM and IgE), which determine the antibody's class and effector functions. This is asymmetric with the light chain, which carries only one variable and one constant domain — a contrast worth holding onto explicitly, since a question naming "1;1" as a distractor is testing exactly this confusion between the two chain types.

## explicit_objective
State the number of variable and constant domains on an immunoglobulin heavy chain and distinguish it from the light chain's domain count.

## pitfalls
Applying the light chain's 1-variable/1-constant domain count to the heavy chain by assuming both chains are built the same way. They are not: the heavy chain carries the extra constant domains that encode isotype and effector function, which is precisely why heavy-chain class-switching changes an antibody's function without touching its antigen specificity.

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
SYS-IMM | DIS-IMU

## topic
Immunology

## subtopic
Immunoglobulin structure

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Blood > Immunoglobulins

## article_ids
ART-IMM-AU102-IMMUNOGLOBULIN-CLASSES

## related_article_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## related_concept_ids
CON-IMM-8F37F8822F1157 | CON-IMM-53DC37F76C0AA3

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.1

## exam_weight_by_year
AU_Y1=0.1

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p40 q18 | AU-MED-102

## atomic_claim_ids
CLM-AU102-IMM-HEAVY-CHAIN-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"18. Each heavy chain of Ig has ___ variable domain(s) (VH) and ___ constant domain(s) (CH). ... [d-] 1; 3"

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank's own key; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "immunoglobulin heavy chain" (nothing) and "light chain" (returned the live light-chain concept, a different chain, see relatedConceptIds). grep -ril for the canonical key returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: None — the live light-chain concepts state a different chain's domain count, a genuinely distinct fact, not a duplicate.
conflicts: None found in the source.
relationships: Cross-linked to the two live light-chain/antibody-structure concepts (CON-IMM-8F37F8822F1157, CON-IMM-53DC37F76C0AA3) as the natural sibling pair a student compares. A full DIS-IMU-T02 sibling walk beyond these two was not performed given lane scope.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
IgM occurs as a pentamer and predominates in the primary antibody response, but it is not the immunoglobulin that mediates allergic reactions — that is IgE

## id
CON-IMM-C654630EE8FAC7

## canonical_key
immunoglobulin.igm.pentamer-primary-response-not-allergy

## aliases
IgM pentamer
Primary antibody response
IgM properties

## arabic_label
خصائص الغلوبيولين المناعي IgM

## arabic_aliases
IgM كخماسي البنية ودوره في الاستجابة المناعية الأولية

## definition
IgM is assembled as a pentamer (five monomeric units joined at a J chain), which gives it high avidity despite a relatively low affinity per binding site, and it is the antibody that predominates early in a primary immune response before class switching produces IgG. Like every immunoglobulin it is a glycoprotein. What IgM does not do is mediate allergic (type I hypersensitivity) reactions — that role belongs to IgE, bound to mast cells and basophils, so a statement that IgM "mediates allergic reactions" is the one false claim among otherwise-true properties.

## explicit_objective
List IgM's structural (pentamer) and functional (primary-response) properties, and correctly exclude an allergy-mediating role, attributing that instead to IgE.

## pitfalls
Assuming every immunoglobulin fact belongs to whichever class is being asked about, rather than checking each option against what is specifically true of IgM. The allergy-mediating property is real immunology — it is simply the wrong antibody class, and the question is built entirely around catching that misattribution.

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
SYS-IMM | DIS-IMU

## topic
Immunology

## subtopic
Immunoglobulin classes

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Blood > Immunoglobulins

## article_ids
ART-IMM-AU102-IMMUNOGLOBULIN-CLASSES

## related_article_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## related_concept_ids
CON-IMM-42AF5584580C2B | CON-IMM-EAF86E35BDD4D6 | CON-IMM-3A081F9C7FBB9D

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.1

## exam_weight_by_year
AU_Y1=0.1

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p40 q20 | AU-MED-102

## atomic_claim_ids
CLM-AU102-IMM-IGM-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"20. All of the following are true with respect to IgM antibodies EXCEPT a- They occur as pentamer b- They predominate in the primary response to antigen c- They are glycoproteins [d-] They mediate allergic reaction" (correct/EXCEPT answer d, per the printed key)

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank's own key; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "IgM" — two live concepts hit (primary-response kinetics, isotype-switch order), neither states the pentamer structure or the allergy exclusion together; both cross-linked rather than merged, see relatedConceptIds. grep -ril for the canonical key returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: CON-IMM-42AF5584580C2B and CON-IMM-EAF86E35BDD4D6 (live) state IgM's primary-response kinetics and isotype-switch order respectively — real overlap in subject but neither states the pentamer structure or the explicit not-allergy-mediating fact this concept teaches; linked rather than merged, since a single record combining all three would answer three distinct questions, per the 00-START-HERE tiebreaker.
conflicts: None found in the source.
relationships: Cross-linked to the two live IgM concepts and to this batch's own IgE concept (the class that IgM is explicitly contrasted against in the source's own distractor).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
Of the immunoglobulin classes, IgG is present in plasma at the highest concentration

## id
CON-IMM-6EFE000F60C739

## canonical_key
immunoglobulin.serum-concentration.igg-highest-ranking

## aliases
Serum immunoglobulin ranking
IgG plasma concentration
Most abundant immunoglobulin

## arabic_label
ترتيب تركيز الغلوبيولينات المناعية في البلازما

## arabic_aliases
IgG هو الأكثر تركيزًا في البلازما

## definition
Among the five immunoglobulin classes, IgG is present in plasma at the highest concentration (roughly 70-75% of total serum immunoglobulin), ahead of IgM, IgA and the far scarcer IgD and IgE. This ranking underlies why IgG dominates the secondary/memory antibody response and why it is the class most relied upon for passive immunity across the placenta.

## explicit_objective
Rank IgG as the immunoglobulin class present in plasma at the highest concentration.

## pitfalls
Confusing "most abundant in plasma" with "first responder" or "most abundant at a mucosal surface" — those are IgM (primary response) and IgA (secretory surfaces) respectively, each abundant in its own compartment or phase, while IgG is simply the highest by total serum concentration.

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
SYS-IMM | DIS-IMU

## topic
Immunology

## subtopic
Immunoglobulin classes

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Blood > Immunoglobulins

## article_ids
ART-IMM-AU102-IMMUNOGLOBULIN-CLASSES

## related_article_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## related_concept_ids
CON-IMM-88E230DE36ABFA | CON-IMM-E098A15ED29DE2

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.1

## exam_weight_by_year
AU_Y1=0.1

## clinical_relevance
0.3

## academic_relevance
0.6

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p41 q21 | AU-MED-102

## atomic_claim_ids
CLM-AU102-IMM-IGG-RANKING-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"21. Which of the following immunoglobulins is present normally in plasma at the highest concentration? [a-] IgG"

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank's own key; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "serum immunoglobulin" — the one hit (live CON-IMM-E098A15ED29DE2) is about which classes a B-cell assessment measures, not their relative ranking; cross-linked, not merged. grep -ril for the canonical key returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: None found at this grain.
conflicts: None found in the source.
relationships: Cross-linked to this batch's own secretory-IgA concept (the natural class-comparison pair) and to the live B-cell-assessment concept.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
IgA is the principal immunoglobulin found in secretions such as milk, saliva and mucus — the secretory antibody, as opposed to IgG's dominance in serum

## id
CON-IMM-88E230DE36ABFA

## canonical_key
immunoglobulin.secretory-form.iga-identity

## aliases
Secretory IgA
Milk immunoglobulin
Mucosal antibody

## arabic_label
الغلوبيولين المناعي الإفرازي IgA

## arabic_aliases
IgA في الإفرازات مثل اللبن واللعاب

## definition
IgA is the immunoglobulin class that predominates in external secretions — milk, saliva, tears, respiratory and gut mucus — where it is exported as a dimer linked by a secretory component that protects it from proteolytic digestion. This is distinct from its serum-monomer form and from IgG, which dominates the blood compartment rather than mucosal surfaces.

## explicit_objective
Identify IgA as the principal immunoglobulin in secretions such as milk, and distinguish its secretory role from IgG's serum role.

## pitfalls
Defaulting to IgG as "the main antibody" for every question about immunoglobulin abundance, without noticing the question specifies a secretion (milk) rather than plasma. The compartment named in the stem changes the correct class.

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
SYS-IMM | DIS-IMU

## topic
Immunology

## subtopic
Immunoglobulin classes

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Blood > Immunoglobulins

## article_ids
ART-IMM-AU102-IMMUNOGLOBULIN-CLASSES

## related_article_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## related_concept_ids
CON-IMM-6EFE000F60C739

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.1

## exam_weight_by_year
AU_Y1=0.1

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p41 q22 | AU-MED-102

## atomic_claim_ids
CLM-AU102-IMM-IGA-SECRETORY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"22. Which immunoglobulin is the principal one found in secretions such as milk? ... [c-] IgA"

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-INF-A6D04F194FA5FB

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank's own key; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "secretory IgA" — the one hit (live CON-INF-A6D04F194FA5FB) is about gonococcal IgA protease inactivating secretory IgA during infection, a microbiology-side mechanism, not the basic classification fact this concept teaches. grep -ril for the canonical key returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: CON-INF-A6D04F194FA5FB is about a pathogen's evasion mechanism against secretory IgA, not about IgA's own classification as the secretory immunoglobulin — different objective, not merged.
conflicts: None found in the source.
relationships: Cross-linked to this batch's own IgG-ranking concept.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
IgE is the allergy-associated immunoglobulin, the least abundant in plasma, binds mast cells, and — unlike IgG — does not cross the placental barrier

## id
CON-IMM-3A081F9C7FBB9D

## canonical_key
immunoglobulin.ige.allergy-least-abundant-mast-cell-no-placental-crossing

## aliases
IgE properties
Allergy immunoglobulin
Mast-cell-binding antibody

## arabic_label
خصائص الغلوبيولين المناعي IgE

## arabic_aliases
IgE ودوره في الحساسية

## definition
IgE is the immunoglobulin associated with type I hypersensitivity (allergic) reactions: it binds high-affinity Fc receptors on mast cells and basophils, so that allergen cross-linking triggers degranulation. It is the least abundant immunoglobulin class in plasma by concentration. Unlike IgG, IgE does not cross the placental barrier, so a fetus is not passively protected — or sensitised — by maternal IgE the way it is by maternal IgG.

## explicit_objective
List IgE's defining properties (allergy association, low plasma abundance, mast-cell binding) and correctly state that it does not cross the placenta.

## pitfalls
Assuming every immunoglobulin behaves like IgG with respect to the placenta, since IgG-mediated passive immunity (and IgG-mediated haemolytic disease of the newborn) is the more familiar placental-transfer story. IgE's inability to cross is the specific fact the "NOT TRUE" framing of this question is built to isolate.

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
SYS-IMM | DIS-IMU

## topic
Immunology

## subtopic
Immunoglobulin classes

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Blood > Immunoglobulins

## article_ids
ART-IMM-AU102-IMMUNOGLOBULIN-CLASSES

## related_article_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## related_concept_ids
CON-IMM-C654630EE8FAC7

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.1

## exam_weight_by_year
AU_Y1=0.1

## clinical_relevance
0.6

## academic_relevance
0.6

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p41 q24 | AU-MED-102

## atomic_claim_ids
CLM-AU102-IMM-IGE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"24. Which of the following NOT TRUE about IgE? a- An allergy associated immunoglobulin b- the least abundant immunoglobulin in the plasma c- binds to mast cells [d-] can cross the placental barrier" (correct/NOT-TRUE answer d, per the printed key)

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank's own key; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "IgE" — a large number of hits returned, all about unrelated topics matching "pigment"/"antigen" substrings rather than IgE's own class properties (the tool's substring match is broad); none is a genuine hit for this concept's specific claim set. grep -ril for the canonical key returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: None found at this grain; the many find-existing hits for "IgE" were confirmed as incidental substring matches, not genuine near-misses, by reading each one.
conflicts: None found in the source.
relationships: Cross-linked to this batch's own IgM concept (the class most directly contrasted against IgE for the allergy-mediating property).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
Milk is a poor dietary source of iron, unlike cereals and pulses

## id
CON-HEM-9E0A054961D86A

## canonical_key
iron.dietary-sources.milk-is-poor-source

## aliases
Dietary iron sources
Iron content of milk
Iron-poor foods

## arabic_label
الحديد في الحليب مقارنة بالمصادر الغذائية الأخرى

## arabic_aliases
اللبن مصدر فقير للحديد

## definition
Among common foods, milk is a notably poor source of dietary iron, while cereals (rice, wheat) and pulses (bengal gram and similar legumes) supply meaningfully more. This is part of why exclusively milk-fed infants, without iron-fortified weaning foods, are at particular risk of dietary iron deficiency.

## explicit_objective
Identify milk as a poor dietary source of iron relative to cereals and pulses.

## pitfalls
Assuming milk is nutritionally complete because it is the default infant food; it is specifically iron-poor, which is the clinical reason paediatric iron-deficiency anaemia is linked to prolonged milk feeding without dietary supplementation.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
SYS-HEM-T02

## secondary_node_ids
DIS-BIO-T08

## topic
Nutrition

## subtopic
Iron

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Blood > Iron

## article_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## related_article_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## related_concept_ids
CON-HEM-BDED630BBC87A3

## resource_ids
src_01ab4268402d32d4d111

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.1

## exam_weight_by_year
AU_Y1=0.1

## clinical_relevance
0.5

## academic_relevance
0.5

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p41 q25 | AU-MED-102

## atomic_claim_ids
CLM-AU102-HEM-IRON-MILK-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"25. Iron is deficient in: a- Cereals (rice, wheat) b- Maize and corn c- Pulses (bengal gram, etc.) [d-] Milk" (correct answer d, per the printed key)

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
authored_needs_independent_evidence

## exclusion_reason

## field_notes
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank's own key; no corpus extraction record exists.
sourceCandidateIds: find-existing.mjs run for "dietary iron" — the one hit (live CON-HEM-BDED630BBC87A3) states that low dietary iron causes iron-deficiency anaemia, especially in growth and pregnancy, a different objective (consequence of deficiency vs which specific foods are poor sources); cross-linked, not merged. grep -ril for the canonical key returned nothing.
mergeIds: Nothing folded into this record.
rejectedMergeCandidateIds: None — the live record is a genuinely different objective, cross-linked instead.
conflicts: None found in the source.
relationships: Cross-linked to the one live iron-deficiency concept found.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## label
A light chain contains one variable domain and one constant domain, and its variable domain contributes to the antigen-binding site

## id
CON-IMM-8F37F8822F1157

## universities
+au

## modules
+AU-MED-102



## learner_years
+1

## exam_signal
src_01ab4268402d32d4d111 | department_question_book | undated | p41 q23 | AU-MED-102

## field_notes
moduleSubject: written as a full replacement, not `+`, per medical:batch's finding that this column does not take an append; the live record carries no existing module_subject (checked in server/data/medical-library-v1.json), so nothing is lost.
examSignal: written as a full replacement for the same reason; the live record carries no existing exam_signal. Alexandria's AU-MED-102 AFM question bank (Q23, Blood section) tests exactly this fact — "Light chains of Ig are: ... Contains antigen binding site" (correct answer c, per the printed key) — as an update to this already-live concept rather than a new record, per the manual's "same idea, same scope → update" rule.
