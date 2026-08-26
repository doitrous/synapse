<!--
  Update rows for the nine live pharmacology concepts that already sit on the
  108 INT target nodes.

  These nine were found before anything was written, by searching label and
  canonical-key text across all 1,718 live concepts unfiltered — a subject or
  node filter is not enough, because 736 live concepts carry the legacy
  subjectId "medical" and the 206 that carry "pharm" are split across the FND
  and INF namespaces. All nine carry canonical keys of the form
  teaching.pharma.*, subjectId "pharm", secondaryNodeIds
  ['DIS-PHA-T01','DIS-PHA'], and primary placement under SYS-FND-T04-S01.

  Orientation ILOs 12, 13, 20, 21, 28, 29 and 30 are about exactly these
  records, so no second "Loading dose", "Apparent volume of distribution" or
  "Clearance" was minted. 108-INT-concepts-pharmacology.md contains no record
  duplicating any of them; where a new record sits beside one, the live ID is on
  its rejected_merge_candidate_ids with the grain reasoning in field_notes.

  Each ID here is the concept's ACTUAL live ID, read out of
  server/data/medical-library-v1.json. None was re-derived from the canonical
  key: mint-concept-id.mjs is deterministic on the key but checks ID collision
  rather than key collision, so re-minting
  "teaching.pharma.loading.definition" returns CON-FND-92FC0CBAED15B8 and
  reports ok, while the live record is CON-FND-3CC86CC26BF549. Re-deriving
  would have created a duplicate and reported success.

  What each row adds, and why it is worth an import:

    modules and module_subject — every one of the 1,718 live concepts has
      moduleIds: [], so no live concept can be revised by module at all.
      Attaching 108 INT and the book's own subject path is value nothing else
      in this batch carries.
    pitfalls and arabicLabel — empty on all nine.
    exam_signal — absent on all nine. These records were extracted from a
      source that carried no blueprint evidence; the two EOY papers and the ILO
      sheet supply it now.
    blueprint_weight — all nine currently read 0.5800000000000001, a uniform
      extraction artefact rather than a judgement. Each is reset from the ILO
      tick pattern and the papers, on the same scale the new-concept file uses,
      and weight_confidence is set to what two sittings actually support.
    original_wording — appended, never replaced, so the extraction's own
      phrasing survives beside the exam wording.
    field_notes — the noteMap is empty on all nine, which means each one
      currently fails the field audit on microtopicId and nanotopicId. The notes
      here clear that.

  Every list column that adds rather than replaces uses the leading +, so this
  file can be applied twice without doubling anything.

  VALIDATION. This is an update batch and medical:batch does not judge it
  correctly — that validator treats every record as new and would fail each row
  on every column it does not re-type. Judge it with:

    node --experimental-strip-types scripts/simulate-content-import.mjs \
      "docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology-updates.md" \
      --emit /tmp/sim-108-pharm-updates.json

  The correct result is created: 0, updated: 9, delta concepts: 0. A delta of 9
  would mean an ID did not match and nine duplicates were created instead.

  Import with "Update matching items" ON, after
  108-INT-concepts-pharmacology.md and 108-INT-pharmacology.md, because the
  article IDs appended below must exist first.
-->

# Item
## id
CON-FND-3CC86CC26BF549
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## reviewer
Medical team, Admin team
## resource_occurrence_ids
OCC-B52B461759A2DD | OCC-3884B9ED2FB653
## publication_status
faculty_review
## owner
Admin team
## merge_ids
MRG-REVIEW-FND-97D9BF9FE97FC3
## last_reviewed
2026-08-11
## final_publisher
Admin team
## evidence_gaps
Faculty review and current authoritative evidence are required before publication.
## editorial_review_status
faculty_signoff_required
## atomic_claim_ids
CLM-FND-1CD6611D37BC37 | CLM-FND-3CC86CC26BF549
## confidence
0.96
## support_mode
direct
## academic_relevance
0.9
## clinical_relevance
0.8
## universities
kau
## learner_years
1
## concept_type
directly_taught_pharmacology_concept
## primary_node_id
SYS-FND-T04-S01
## subject
pharm
## canonical_key
teaching.pharma.loading.definition
## explicit_objective
Explain or apply: A loading dose is the initial dose that raises plasma drug level to the target concentration
## definition
A loading dose is an initial dose intended to reach a target drug concentration promptly. Because it is larger than a usual maintenance dose, an incorrect loading dose can cause toxicity.
## label
Loading dose
## modules
108 INT
## module_subject
108 INT > Pharmacology > Fundamental Principles of Pharmacokinetics > Loading dose
## pitfalls
Giving a loading dose of a drug whose danger is its peak rather than its average level. The loading dose exists to skip the four to five half-lives it would otherwise take to reach the target, and it buys that time at the cost of a high early concentration.
## arabic_label
الجرعة الاستهلالية
## arabic_aliases
جرعة التحميل
## aliases
+Loading dose calculation | Priming dose
## article_ids
+ART-108-PHA-KINETIC-PRINCIPLES
## related_concept_ids
+CON-FND-3D0ACE759233EC | CON-FND-7A66C16BA5029C | CON-FND-6235934A8DD0FE
## related_article_ids
+ART-108-PHA-POSOLOGY
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p2 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year_written | 2024 | p6 | 108 INT
## blueprint_weight
0.65
## exam_weight_by_year
KAU_Y1=0.65
## weight_confidence
0.55
## original_wording
+[EOY 2024 Section 2 QIIIb, 1 mark] The loading dose.
[Orientation ILO 29, MCQ tick] To describe the loading dose and its clinical applications
[Orientation ILO 28, MCQ tick] To determine the loading dose by knowing the desired concentration and the volume of distribution
## field_notes
microtopicId: SYS-FND-T04-S01 has microtopics for absorption, distribution, metabolism and excretion only; a loading dose belongs to none of the four, and the curriculum position is carried by module_subject instead.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology, so there is no nanotopic to name.
moduleIds: Filled by this row — 108 INT, from the Kasr Year 1 catalogue (src/data/universities.ts:113), which resolves onto the existing module rather than creating a second one.
arabicLabel: Filled by this row.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT; the department book is not cleared for redistribution.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: Unchanged by this row; the record has still not been reviewed.
reviewDue: Unchanged by this row.
blueprintWeight: Reset from 0.58, a uniform value shared by all nine extracted pharmacology concepts and therefore not a judgement about this one. ILO 28 and ILO 29 both carry the MCQ tick and the 2024 paper asked the loading dose as a 1-mark written definition.
resourceIds: Left as extracted. The Kasr sources that support the new wording are absent from corpus-source-index.json, so adding one here would fail the corpus check; it is named on exam_signal instead.
atomicClaimIds: Left as extracted. No evidence pass has been run for 108 INT and no new claim is attached (LD-14, MASTER-PLAN.md:117).

---

# Item
## id
CON-FND-7F59EAD61B05E0
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## reviewer
Medical team, Admin team
## resource_occurrence_ids
OCC-AAAB6CD8E50170
## publication_status
faculty_review
## owner
Admin team
## last_reviewed
2026-08-11
## final_publisher
Admin team
## evidence_gaps
Faculty review and current authoritative evidence are required before publication.
## editorial_review_status
faculty_signoff_required
## atomic_claim_ids
CLM-FND-7F59EAD61B05E0
## confidence
0.96
## support_mode
direct
## academic_relevance
0.9
## clinical_relevance
0.8
## universities
kau
## learner_years
1
## concept_type
directly_taught_pharmacology_concept
## primary_node_id
SYS-FND-T04-S01
## subject
pharm
## canonical_key
teaching.pharma.maintenance.definition
## explicit_objective
Explain or apply: A maintenance dose replaces drug eliminated since the preceding dose to maintain steady state
## definition
A maintenance dose replaces drug eliminated since the preceding dose to maintain steady state.
## label
A maintenance dose replaces drug eliminated since the preceding dose to maintain steady state
## modules
108 INT
## module_subject
108 INT > Pharmacology > Fundamental Principles of Pharmacokinetics > Maintenance dose
## pitfalls
Calculating the maintenance dose from the volume of distribution. Volume of distribution sets the loading dose; the maintenance dose follows from clearance, the target concentration and the dosing interval.
## arabic_label
جرعة الإدامة
## arabic_aliases
الجرعة المداومة
## aliases
+Maintenance dose | Maintenance dose calculation
## article_ids
+ART-108-PHA-KINETIC-PRINCIPLES
## related_concept_ids
+CON-FND-7A66C16BA5029C | CON-FND-3D0ACE759233EC | CON-FND-6235934A8DD0FE
## related_article_ids
+ART-108-PHA-POSOLOGY
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p2 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p5 | 108 INT
## blueprint_weight
0.65
## exam_weight_by_year
KAU_Y1=0.65
## weight_confidence
0.55
## original_wording
+[EOY 2025 Section 1 Q17, 0.5 marks] The maintenance dose of a drug is correctly calculated as:
[EOY 2025 Section 1 Q17, correct option] Clearance multiplied by the desired Css and the dosing interval (Tm)
[Orientation ILO 30, MCQ tick] To determine the maintenance dose in cases of infusion and cases of repeated regular dosing
## conflicts
The 2025 answer gives the maintenance dose as clearance multiplied by the desired Css and the dosing interval, which is the dose per interval. A per-minute infusion rate is clearance multiplied by Css alone, without the interval term. Both are correct for what they describe and the paper does not say which it means; recorded rather than resolved.
## field_notes
microtopicId: SYS-FND-T04-S01 has no microtopic for dosing; module_subject carries the book's own position, under Fundamental Principles of Pharmacokinetics.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
moduleIds: Filled by this row — 108 INT, from the Kasr Year 1 catalogue.
arabicLabel: Filled by this row.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: Unchanged by this row; still unreviewed.
reviewDue: Unchanged by this row.
blueprintWeight: Reset from the shared 0.58 artefact. ILO 30 carries the MCQ tick and the 2025 paper asked the calculation directly.
resourceIds: Left as extracted; the Kasr sources are absent from corpus-source-index.json and are named on exam_signal instead.
atomicClaimIds: Left as extracted; no evidence pass exists for 108 INT (LD-14).

---

# Item
## id
CON-FND-CBA2A73AE9A6D8
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## reviewer
Medical team, Admin team
## resource_occurrence_ids
OCC-047FFC0E91D28A | OCC-335AF6D2AF5C3D
## publication_status
needs_evidence
## owner
Admin team
## merge_ids
MRG-REVIEW-FND-8E05BB6A62A3A1
## last_reviewed
2026-08-11
## final_publisher
Admin team
## evidence_gaps
The editorially revised wording requires independent claim-level evidence before publication.
## editorial_review_status
editorially_revised_needs_independent_evidence
## atomic_claim_ids
CLM-FND-44EB37CE98DCB4 | CLM-FND-CBA2A73AE9A6D8
## confidence
0.96
## support_mode
direct
## academic_relevance
0.9
## clinical_relevance
0.65
## universities
kau
## learner_years
1
## concept_type
directly_taught_pharmacology_concept
## primary_node_id
SYS-FND-T04-S01-M02
## subject
pharm
## canonical_key
teaching.pharma.vd.definition
## explicit_objective
Explain or apply: Apparent volume of distribution is the hypothetical fluid volume that would contain the total drug amount at the measured plasma concentration
## definition
Apparent volume of distribution is the hypothetical volume that relates the amount of drug in the body to its plasma concentration: Vd = amount in the body ÷ plasma concentration.
## label
Apparent volume of distribution
## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Distribution > Apparent volume of distribution
## pitfalls
Treating the apparent volume of distribution as an anatomical space that a drug could be found in. It is the proportionality term between the amount in the body and the plasma concentration, which is why it can come out larger than the whole patient.
## arabic_label
حجم التوزيع الظاهري
## arabic_aliases
حجم التوزيع
## aliases
+Vd | Volume of distribution
## article_ids
+ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
+CON-FND-040D2633B0A2FE | CON-FND-53FF18E42BC94B | CON-FND-955AD7B6FE6F03
## related_article_ids
+ART-108-PHA-KINETIC-PRINCIPLES
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p1 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p4 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p3 | 108 INT
## blueprint_weight
0.85
## exam_weight_by_year
KAU_Y1=0.85
## weight_confidence
0.7
## original_wording
+[Orientation ILO 12, SAQ and MCQ ticks] To define the volume of distribution
[EOY 2025 Section 1 Q14, 0.5 marks] A very high volume of distribution (Vd) for a drug implies that it:
[EOY 2024 Section 1 Q15, 0.5 marks] A drug with a volume of distribution of 4 liters in a 70 kg person most probably has which of the following distribution patterns:
## field_notes
microtopicId: Filled at the canonical level — the record already sits on SYS-FND-T04-S01-M02, which is Distribution, and no overlay MIC_ id exists for it in the catalogue.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
moduleIds: Filled by this row — 108 INT, from the Kasr Year 1 catalogue.
arabicLabel: Filled by this row.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: Unchanged by this row; still unreviewed.
reviewDue: Unchanged by this row.
blueprintWeight: Reset from the shared 0.58 artefact. ILO 12 is one of the eighteen carrying both the SAQ and the MCQ tick, and Vd was asked in both sittings read — the heaviest evidence any distribution record in this module has.
resourceIds: Left as extracted; the Kasr sources are absent from corpus-source-index.json and are named on exam_signal instead.
atomicClaimIds: Left as extracted; no evidence pass exists for 108 INT (LD-14).

---

# Item
## id
CON-FND-0D3254CF812B1A
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## reviewer
Medical team, Admin team
## resource_occurrence_ids
OCC-93EE1AF5B36296
## publication_status
needs_evidence
## owner
Admin team
## last_reviewed
2026-08-11
## final_publisher
Admin team
## evidence_gaps
The editorially revised wording requires independent claim-level evidence before publication.
## editorial_review_status
editorially_revised_needs_independent_evidence
## atomic_claim_ids
CLM-FND-0D3254CF812B1A
## confidence
0.96
## support_mode
direct
## academic_relevance
0.9
## clinical_relevance
0.65
## universities
kau
## learner_years
1
## concept_type
directly_taught_pharmacology_concept
## primary_node_id
SYS-FND-T04-S01-M02
## subject
pharm
## canonical_key
teaching.pharma.vd.apparent
## explicit_objective
Explain or apply: Apparent volume of distribution may exceed physical body volume, as stated for digoxin
## definition
Apparent volume of distribution can exceed total body volume because it is a proportionality term, not a physical anatomical space.
## label
Apparent volume of distribution can exceed body volume
## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Distribution > Apparent volume of distribution
## pitfalls
Rejecting a calculated Vd because it is larger than the patient. A figure of hundreds of litres is not an arithmetic error; it is the signature of a drug that has left the plasma almost entirely.
## arabic_label
تجاوز حجم التوزيع الظاهري لحجم الجسم
## arabic_aliases
حجم التوزيع الظاهري الكبير
## aliases
+Vd greater than total body water | Why Vd can exceed body volume
## article_ids
+ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
+CON-FND-040D2633B0A2FE | CON-FND-53FF18E42BC94B
## related_article_ids
+ART-108-PHA-KINETIC-PRINCIPLES
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
## blueprint_weight
0.45
## exam_weight_by_year
KAU_Y1=0.45
## weight_confidence
0.4
## original_wording
+[Orientation ILO 13, MCQ tick] To explain the clinical importance of the volume of distribution
## field_notes
microtopicId: Filled at the canonical level — the record sits on SYS-FND-T04-S01-M02, Distribution, and no overlay MIC_ id exists for it.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
moduleIds: Filled by this row — 108 INT, from the Kasr Year 1 catalogue.
arabicLabel: Filled by this row.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: Unchanged by this row; still unreviewed.
reviewDue: Unchanged by this row.
blueprintWeight: Reset from the shared 0.58 artefact, downward. ILO 13 carries the MCQ tick only and neither sitting read asked this particular point, so it should not carry the same weight as the Vd definition beside it.
originalWording: The extracted wording names digoxin as the example. That name is left exactly as extracted and is not repeated in any new text, because the department book is OCR'd and no drug name from it has been verified.
resourceIds: Left as extracted; the Kasr sources are absent from corpus-source-index.json.
atomicClaimIds: Left as extracted; no evidence pass exists for 108 INT (LD-14).

---

# Item
## id
CON-FND-FD53CFAE6AAC72
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## reviewer
Medical team, Admin team
## resource_occurrence_ids
OCC-DB4C476C4DA8C7
## publication_status
needs_evidence
## owner
Admin team
## last_reviewed
2026-08-11
## final_publisher
Admin team
## evidence_gaps
The editorially revised wording requires independent claim-level evidence before publication.
## editorial_review_status
editorially_revised_needs_independent_evidence
## atomic_claim_ids
CLM-FND-FD53CFAE6AAC72
## confidence
0.96
## support_mode
direct
## academic_relevance
0.9
## clinical_relevance
0.65
## universities
kau
## learner_years
1
## concept_type
directly_taught_pharmacology_concept
## primary_node_id
SYS-FND-T04-S01-M02
## subject
pharm
## canonical_key
teaching.pharma.vd.high
## explicit_objective
Explain or apply: A high apparent volume of distribution indicates multicompartment distribution or tissue concentration
## definition
A high apparent volume of distribution usually indicates that a drug is extensively distributed or bound in tissues relative to its plasma concentration.
## label
Interpretation of a high apparent volume of distribution
## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Distribution > Apparent volume of distribution
## pitfalls
Reading a high Vd as a high plasma concentration. It means the opposite: the drug has left the plasma, so the measured plasma level is low relative to the amount in the body.
## arabic_label
تفسير ارتفاع حجم التوزيع الظاهري
## arabic_aliases
حجم التوزيع المرتفع
## aliases
+High Vd interpretation | Tissue-concentrated drug
## article_ids
+ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
+CON-FND-040D2633B0A2FE | CON-FND-53FF18E42BC94B | CON-FND-3CECD012838275
## related_article_ids
+ART-108-PHA-KINETIC-PRINCIPLES
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p4 | 108 INT
## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## weight_confidence
0.55
## original_wording
+[EOY 2025 Section 1 Q14, 0.5 marks] A very high volume of distribution (Vd) for a drug implies that it:
[EOY 2025 Section 1 Q14, correct option] Is concentrated in body tissues rather than remaining in the blood
[Orientation ILO 13, MCQ tick] To explain the clinical importance of the volume of distribution
## uncertainty
The 2025 answer to this question was recovered from a highlight on the solved copy at confidence 0.90, the lowest of the eleven pharmacology answers recovered and the only one below 0.95. The answer is consistent with the concept as written, but it is the one answer in this module that a reviewer should check against the paper.
## field_notes
microtopicId: Filled at the canonical level — the record sits on SYS-FND-T04-S01-M02, Distribution, and no overlay MIC_ id exists for it.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
moduleIds: Filled by this row — 108 INT, from the Kasr Year 1 catalogue.
arabicLabel: Filled by this row.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: Unchanged by this row; still unreviewed.
reviewDue: Unchanged by this row.
blueprintWeight: Reset from the shared 0.58 artefact. ILO 13 carries the MCQ tick and the 2025 paper asked this reading directly.
resourceIds: Left as extracted; the Kasr sources are absent from corpus-source-index.json.
atomicClaimIds: Left as extracted; no evidence pass exists for 108 INT (LD-14).

---

# Item
## id
CON-FND-43BED56FA9D1E9
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## reviewer
Medical team, Admin team
## resource_occurrence_ids
OCC-C597F50AB28346
## publication_status
needs_evidence
## owner
Admin team
## last_reviewed
2026-08-11
## final_publisher
Admin team
## evidence_gaps
The editorially revised wording requires independent claim-level evidence before publication.
## editorial_review_status
editorially_revised_needs_independent_evidence
## atomic_claim_ids
CLM-FND-43BED56FA9D1E9
## confidence
0.96
## support_mode
direct
## academic_relevance
0.9
## clinical_relevance
0.65
## universities
kau
## learner_years
1
## concept_type
directly_taught_pharmacology_concept
## primary_node_id
SYS-FND-T04-S01-M02
## subject
pharm
## canonical_key
teaching.pharma.vd.low
## explicit_objective
Explain or apply: A low apparent volume of distribution indicates retention in the vascular compartment due to high molecular weight or high plasma-protein binding
## definition
A low apparent volume of distribution suggests that much of the measured drug remains in plasma, often because of limited tissue distribution or substantial plasma-protein binding.
## label
Interpretation of a low apparent volume of distribution
## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Distribution > Apparent volume of distribution
## pitfalls
Concluding that a drug with a small Vd is poorly absorbed. A small Vd says the drug stayed in the plasma once it arrived; it says nothing about how much arrived.
## arabic_label
تفسير انخفاض حجم التوزيع الظاهري
## arabic_aliases
حجم التوزيع المنخفض
## aliases
+Low Vd interpretation | Intravascular confinement
## article_ids
+ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
+CON-FND-040D2633B0A2FE | CON-FND-53FF18E42BC94B
## related_article_ids
+ART-108-PHA-KINETIC-PRINCIPLES
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p3 | 108 INT
## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## weight_confidence
0.55
## original_wording
+[EOY 2024 Section 1 Q15, 0.5 marks] A drug with a volume of distribution of 4 liters in a 70 kg person most probably has which of the following distribution patterns:
[EOY 2024 Section 1 Q15, correct option] This drug probably has a high molecular weight or strong plasma protien binding
[Orientation ILO 13, MCQ tick] To explain the clinical importance of the volume of distribution
## field_notes
microtopicId: Filled at the canonical level — the record sits on SYS-FND-T04-S01-M02, Distribution, and no overlay MIC_ id exists for it.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
moduleIds: Filled by this row — 108 INT, from the Kasr Year 1 catalogue.
arabicLabel: Filled by this row.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: Unchanged by this row; still unreviewed.
reviewDue: Unchanged by this row.
blueprintWeight: Reset from the shared 0.58 artefact. ILO 13 carries the MCQ tick and the 2024 paper asked this reading with a worked figure.
originalWording: The 2024 option is appended exactly as printed, including the misspelling "protien". Correcting a source quotation would defeat the purpose of the field.
resourceIds: Left as extracted; the Kasr sources are absent from corpus-source-index.json.
atomicClaimIds: Left as extracted; no evidence pass exists for 108 INT (LD-14).

---

# Item
## id
CON-FND-87C323BB0CE321
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## reviewer
Medical team, Admin team
## resource_occurrence_ids
OCC-FDFBE8E3C2922D
## publication_status
needs_evidence
## owner
Admin team
## last_reviewed
2026-08-11
## final_publisher
Admin team
## evidence_gaps
The editorially revised wording requires independent claim-level evidence before publication.
## editorial_review_status
editorially_revised_needs_independent_evidence
## atomic_claim_ids
CLM-FND-87C323BB0CE321
## confidence
0.96
## support_mode
direct
## academic_relevance
0.9
## clinical_relevance
0.65
## universities
kau
## learner_years
1
## concept_type
directly_taught_pharmacology_concept
## primary_node_id
SYS-FND-T04-S01-M04
## subject
pharm
## canonical_key
teaching.pharma.clearance.volume
## explicit_objective
Explain or apply: Clearance is the volume of body fluid from which drug is removed per unit time
## definition
Clearance is the volume of body fluid from which drug is removed per unit time.
## label
Clearance is the volume of body fluid from which drug is removed per unit time
## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Excretion > Renal
## pitfalls
Reading clearance as an amount of drug removed. It is a volume cleared per unit time, which is why the amount actually removed depends on the concentration in that volume.
## arabic_label
التصفية الدوائية
## arabic_aliases
معدل التخلص من الدواء
## aliases
+Drug clearance | Total body clearance | CL
## article_ids
+ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
+CON-FND-88101C454AAF1D | CON-FND-955AD7B6FE6F03 | CON-FND-7A66C16BA5029C
## related_article_ids
+ART-108-PHA-KINETIC-PRINCIPLES
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p2 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p5 | 108 INT
## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## weight_confidence
0.5
## original_wording
+[EOY 2025 Section 1 Q17, correct option] Clearance multiplied by the desired Css and the dosing interval (Tm)
[Orientation ILO 30, MCQ tick] To determine the maintenance dose in cases of infusion and cases of repeated regular dosing
## field_notes
microtopicId: Filled at the canonical level — the record sits on SYS-FND-T04-S01-M04, Excretion, and no overlay MIC_ id exists for it.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
moduleIds: Filled by this row — 108 INT, from the Kasr Year 1 catalogue.
arabicLabel: Filled by this row.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: Unchanged by this row; still unreviewed.
reviewDue: Unchanged by this row.
blueprintWeight: Reset from the shared 0.58 artefact. No ILO defines clearance on its own — it is examined through ILO 30, the maintenance-dose calculation, and through the 2025 question that turns on it. That indirectness is why weight_confidence is 0.5 rather than higher.
resourceIds: Left as extracted; the Kasr sources are absent from corpus-source-index.json.
atomicClaimIds: Left as extracted; no evidence pass exists for 108 INT (LD-14).

---

# Item
## id
CON-FND-01E59D0FD26046
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## reviewer
Medical team, Admin team
## resource_occurrence_ids
OCC-B440CCA0C0A332
## publication_status
needs_evidence
## owner
Admin team
## last_reviewed
2026-08-11
## final_publisher
Admin team
## evidence_gaps
The editorially revised wording requires independent claim-level evidence before publication.
## editorial_review_status
editorially_revised_needs_independent_evidence
## atomic_claim_ids
CLM-FND-01E59D0FD26046
## confidence
0.96
## support_mode
direct
## academic_relevance
0.9
## clinical_relevance
0.65
## universities
kau
## learner_years
1
## concept_type
directly_taught_pharmacology_concept
## primary_node_id
SYS-FND-T04-S01-M04
## subject
pharm
## canonical_key
teaching.pharma.tubular.secretion
## explicit_objective
Explain or apply: Active tubular excretion is saturable and is a site of competition and drug interaction
## definition
Active tubular excretion is saturable and is a site of competition and drug interaction.
## label
Active tubular excretion is saturable and is a site of competition and drug interaction
## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Excretion > Renal
## pitfalls
Assuming that a drug competing at the tubular carrier is always cleared faster. Competition at a shared carrier slows the excretion of the drug that loses, which is how one drug can be used deliberately to prolong another.
## arabic_label
الإفراز الأنبوبي النشط للأدوية
## arabic_aliases
التنافس على الناقل الأنبوبي
## aliases
+Active tubular secretion | Saturable renal secretion | Carrier competition in the renal tubule
## article_ids
+ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
+CON-FND-88101C454AAF1D | CON-FND-9D7D3A5B015805 | CON-FND-7F618A3D1F940B
## related_article_ids
+ART-108-PHA-DRUG-INTERACTIONS
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p5 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p4 | 108 INT
## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## weight_confidence
0.6
## original_wording
+[EOY 2025 Section 1 Q18, 0.5 marks] Which of the following characterizes renal tubular secretion of drugs?
[EOY 2025 Section 1 Q18, correct option] It is an active saturable process.
[EOY 2024 Section 1 Q19, correct option] Drugs undergoing renal secretion need a carrier.
[Orientation ILO 19, MCQ tick] To describe the processes involved in renal elimination of drugs
## conflicts
The 2025 paper offers "Probenecid increases penicillin excretion by competition at this mechanism" as a distractor and marks it wrong, so the department teaches that competition at this carrier reduces excretion of the loser rather than increasing it. The extracted wording of this concept says only that the site is one of competition, without giving the direction. The paper is the more specific statement and both are recorded.
## field_notes
microtopicId: Filled at the canonical level — the record sits on SYS-FND-T04-S01-M04, Excretion, and no overlay MIC_ id exists for it.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
moduleIds: Filled by this row — 108 INT, from the Kasr Year 1 catalogue.
arabicLabel: Filled by this row.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: Unchanged by this row; still unreviewed.
reviewDue: Unchanged by this row.
blueprintWeight: Reset from the shared 0.58 artefact, upward. This is the only one of the nine that was asked in both sittings read, from two different angles — saturability in 2025 and carrier dependence in 2024.
originalWording: Probenecid and penicillin appear in the 2025 distractor and are quoted only inside the conflicts note, as the paper's own words. Neither drug name is asserted as teaching.
resourceIds: Left as extracted; the Kasr sources are absent from corpus-source-index.json.
atomicClaimIds: Left as extracted; no evidence pass exists for 108 INT (LD-14).

---

# Item
## id
CON-FND-9D89A82094F8AA
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## reviewer
Medical team, Admin team
## resource_occurrence_ids
OCC-527542AE101453
## publication_status
needs_evidence
## owner
Admin team
## last_reviewed
2026-08-11
## final_publisher
Admin team
## evidence_gaps
The editorially revised wording requires independent claim-level evidence before publication.
## editorial_review_status
editorially_revised_needs_independent_evidence
## atomic_claim_ids
CLM-FND-9D89A82094F8AA
## confidence
0.96
## support_mode
direct
## academic_relevance
0.9
## clinical_relevance
0.65
## universities
kau
## learner_years
1
## concept_type
directly_taught_pharmacology_concept
## primary_node_id
SYS-FND-T04-S01-M04
## subject
pharm
## canonical_key
teaching.pharma.enterohepatic
## explicit_objective
Explain or apply: Biliary drug excretion can be followed by intestinal reabsorption and enterohepatic circulation
## definition
Biliary drug excretion can be followed by intestinal reabsorption and enterohepatic circulation.
## label
Biliary drug excretion can be followed by intestinal reabsorption and enterohepatic circulation
## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Excretion > The Alimentary Tract
## pitfalls
Counting biliary excretion as elimination. A drug that is reabsorbed from the gut has not left the body at all; it has been recycled, and the effect is a longer duration of action than the plasma half-life alone would predict.
## arabic_label
الدورة المعوية الكبدية للأدوية
## arabic_aliases
الإفراز الصفراوي للدواء
## aliases
+Enterohepatic circulation | Biliary excretion of drugs | Enterohepatic recycling
## article_ids
+ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
+CON-FND-67D5E471045317 | CON-FND-88101C454AAF1D | CON-FND-955AD7B6FE6F03
## related_article_ids
+ART-108-PHA-KINETIC-PRINCIPLES
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## weight_confidence
0.45
## original_wording
+[Orientation ILO 21, MCQ tick] To explain enterohepatic circulation and its pharmacological significance
[Orientation ILO 20, MCQ tick] To mention the role of the biliary system in drug elimination
## field_notes
microtopicId: Filled at the canonical level — the record sits on SYS-FND-T04-S01-M04, Excretion, and no overlay MIC_ id exists for it.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
moduleIds: Filled by this row — 108 INT, from the Kasr Year 1 catalogue.
arabicLabel: Filled by this row.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: Unchanged by this row; still unreviewed.
reviewDue: Unchanged by this row.
blueprintWeight: Reset from the shared 0.58 artefact, slightly downward. Two ILOs carry the MCQ tick for it, but neither sitting read asked it, so the department-bank chapter distribution is the only other evidence.
resourceIds: Left as extracted; the Kasr sources are absent from corpus-source-index.json.
atomicClaimIds: Left as extracted; no evidence pass exists for 108 INT (LD-14).
