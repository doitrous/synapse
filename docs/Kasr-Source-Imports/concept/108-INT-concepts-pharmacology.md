<!--
  Concepts for the Pharmacology half of module 108 INT, Kasr Al Ainy, Year 1.

  Sources, all from ../manifest/kasr-y1-sources.json:

    src_af30e4191cb4087f8d3f — "General Pharmacology: Introduction to Basic
      Principles of Drug Therapy", the department book, 34 pages, one chapter,
      nine major sections, 11 chapter ILOs. The file has no text layer, so it
      was read by OCR; 14 of its 63 headings are flagged ocrUncertain. Nothing
      here quotes a drug name, a dose or a number from that book. Where a
      verbatim line was wanted, it was taken from a native-text source instead.

    src_b4f736e3bd809dbee187 — "ILOs of general pharmacology for the First-Year
      curriculum", 3 pages, 55 numbered ILOs, each ticked against SAQ, MCQ and
      OSPE. This is the richest blueprint evidence the module holds and it is
      what weights every record below. 18 ILOs carry an SAQ tick, 49 an MCQ
      tick, none an OSPE tick, and 3 (numbers 2, 49 and 50) carry no tick at
      all. The header allots the subject EOM 6 marks / 12 MCQs, EOY 8 marks /
      2 SAQs at 4 marks each, and OSPE 6 marks.

    src_bd1595e59d116b78436a — EOY 108 exam, 2025 sitting, solved copy.
    src_3deab75f7f81cc5f5260 — EOY Exam {INT-108}, 2024 sitting, solved copy.
      Both are native text. 40 distinct pharmacology questions across the two,
      and every verbatim line in original_wording below comes from one of them
      or from the ILO sheet.

    src_ec50845c4498e17b9b6b — "IMPORTANT Pharmacology - INT mcq", the student-
      collected department bank. It carries "For personal use only, No other
      uses without permission. Copyright (c) 2025. All rights reserved" and is
      NOT CLEARED FOR PUBLICATION. Nothing from it is reproduced here, verbatim
      or reworded. It is used only as evidence of what the department examines:
      52 of its 68 pharmacology items sit in the Pharmacokinetics chapter and 16
      in the Introduction, which is why the kinetics records below carry the
      heavier weights. That distribution, and nothing else, is what it
      contributed, and it is named on exam_signal so the judgement is auditable.

  How the weights were set. blueprint_weight is derived from the ILO tick
  pattern first and from the exam papers second:

    SAQ + MCQ ticked, and the point appears on a past paper   0.85-0.90
    SAQ + MCQ ticked, no paper appearance yet                 0.70-0.75
    MCQ only, and the point appears on a past paper           0.60-0.65
    MCQ only, no paper appearance                             0.45-0.50
    SAQ only                                                  0.55
    no tick, but the point appears on a past paper            0.40
    no tick and no paper appearance                           0.25

  weight_confidence is low throughout because two sittings is a thin base.
  Where an ILO carries no tick and the point is still on a paper, that tension
  is recorded on the record's own uncertainty field rather than smoothed away.

  ILOs 51 and 52 (pharmacogenetics and pharmacogenomics) have no concept here.
  The department book does not cover them, so there is no source to author
  from, even though the 2025 paper asked a pharmacogenomics MCQ. That gap is
  reported rather than filled from a foreign textbook.

  Placement. primary_node_id is under SYS-FND-T04 "General pharmacology";
  secondary placement is on the discipline view, DIS-PHA-T01 for kinetics,
  DIS-PHA-T02 for dynamics, DIS-PHA-T08 for prescribing and pharmacovigilance,
  with DIS-PHA as the parent. The discipline view has no nodes below topic
  level, so nothing here goes deeper than DIS-PHA-T0n.

  Two further findings, recorded rather than resolved. ILOs 51 and 52
  (pharmacogenetics, pharmacogenomics) are ticked on the orientation sheet and
  the 2025 paper asked a pharmacogenomics MCQ, but the department book does not
  cover them, so nothing here teaches them — filling that from a foreign
  textbook would be inventing curriculum. And the sheet's header allots the
  OSPE 6 marks while no ILO on any page carries an OSPE tick; the extraction
  flags that needsFaculty: true and offers the alternative reading that ILOs 53
  to 55, the routes objectives, are the practical ones. That is not resolved
  here. It is recorded on CON-FND-6A60CE8D2E7C5C, whose weight would be too low
  if the alternative reading is correct.

  Twelve records are placed under protest, because the material they teach has
  no microtopic to sit on: half-life, steady state and order of kinetics; drug
  tolerance and dependence; routes of administration as a kinetic determinant;
  and passage of drugs across cell membranes. Each of those carries a
  primaryNodeId: entry in field_notes naming the stretch. Twenty-eight are
  placed honestly. No node ID was invented.

  Deduplication. Nine live concepts already sit on these exact nodes, all with
  canonical keys of the form teaching.pharma.*: loading dose, maintenance dose,
  the four volume-of-distribution records, clearance, active tubular secretion
  and enterohepatic circulation. None of them is duplicated here. They are
  updated instead, in 108-INT-concepts-pharmacology-updates.md, which must be
  validated with medical:simulate rather than medical:batch. Where a record
  below sits next to one of them, the live ID is on
  rejected_merge_candidate_ids with the grain reasoning in field_notes.

  What is deliberately empty, everywhere. atomic_claim_ids: no evidence pass
  has been run for this module, and attaching a near-miss live claim to clear a
  validator is the wrong trade (LD-14, MASTER-PLAN.md:117). resource_ids: the
  Kasr src_ sources are real and named above, but they are absent from
  corpus-source-index.json, so citing one fails the corpus check; the citation
  lives in this preamble and on exam_signal instead. Both are recorded on every
  record's field_notes rather than left silent.
-->

# Item
## label
Pharmacokinetics is what the body does to the drug; pharmacodynamics is what the drug does to the body
## id
CON-FND-6BB35F11EBD54B
## canonical_key
teaching.pharma.scope.kinetics-vs-dynamics
## definition
Pharmacokinetics describes the movement of a drug through the body — absorption, distribution, metabolism and excretion — and so determines the concentration that reaches the site of action. Pharmacodynamics describes what the drug then does there: the receptors it occupies, the effect it produces, and how that effect grows with concentration.
## explicit_objective
Sort a described drug property into pharmacokinetics or pharmacodynamics, and say which one determines concentration and which determines effect.
## pitfalls
Reading "kinetics" as speed of onset and "dynamics" as strength. Both branches deal with time and with magnitude; the division is direction of action — body on drug, or drug on body.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T02 | DIS-PHA
## topic
General pharmacology
## subtopic
Introduction
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Introduction
## universities
kau
## learner_years
1
## aliases
Pharmacokinetics versus pharmacodynamics
PK versus PD
ADME versus drug action
What the body does to the drug versus what the drug does to the body
## arabic_label
الفرق بين حركية الدواء والديناميكا الدوائية
## arabic_aliases
علم حركية الدواء
علم تأثير الدواء
## article_ids
ART-108-PHA-INTRODUCTION
## related_article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
ART-108-PHA-PHARMACODYNAMICS
## related_concept_ids
CON-FND-1A18E2FEA47B37 | CON-FND-584FCF6897C35E
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_introduction | 2025 | p2 | 108 INT
## blueprint_weight
0.45
## exam_weight_by_year
KAU_Y1=0.45
## clinical_relevance
0.4
## academic_relevance
0.8
## weight_confidence
0.45
## confidence
0.85
## original_wording
[Orientation ILO 1, MCQ tick] To explain the difference between pharmacokinetics and pharmacodynamics
[Department book, section heading p14] Pharmacodynamics (What the DRUG does to the BODY)
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: SYS-FND-T04 has no microtopic that spans both kinetics and dynamics, which is exactly what this concept contrasts; the curriculum position is carried by module_subject instead.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT, so no claim record exists. The live pharmacology claims are bound to other concepts and none of them asserts this contrast; attaching a near-miss to clear the validator is the wrong trade (LD-14, MASTER-PLAN.md:117).
resourceIds: The department book src_af30e4191cb4087f8d3f and the ILO sheet src_b4f736e3bd809dbee187 are real manifest sources but neither is in corpus-source-index.json, so citing either here fails the corpus check. They are cited in the file preamble and named on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet and the book's own section headings; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus concept index for "pharmacokinetics" and "pharmacodynamics" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT; the department book is not cleared for redistribution.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: A review date is set when a reviewer is assigned; setting one now would be a date nobody agreed to.
exclusionReason: Not excluded — awaiting evidence, which publication_status records.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live state for "pharmacokinetic", "pharmacodynamic" and "ADME" across all 1,718 concepts unfiltered — no record makes this contrast, so no merge was proposed or rejected.
conflicts: No source disagreement found; the ILO sheet and the book agree on the division.
uncertainty: Nothing about the contrast itself is unclear; what is uncertain is its weight, and weight_confidence carries that.
relationships: Walked the 40 concepts in this batch and the 9 live concepts under SYS-FND-T04. This one is prerequisite_of most of them. Typed edges are owed in a relations batch that this task did not author; the loose links are on related_concept_ids.

---

# Item
## label
Most drugs cross cell membranes by passive diffusion, which favours the small, lipid-soluble, non-ionised molecule
## id
CON-FND-584FCF6897C35E
## canonical_key
teaching.pharma.membrane.simple-diffusion
## definition
Simple diffusion carries a drug down its concentration gradient through the lipid of the membrane, without a carrier and without energy. Only the uncharged, lipid-soluble fraction of the drug can make the crossing, so molecular size, lipid solubility and degree of ionisation set the rate.
## explicit_objective
Predict whether a drug will cross a membrane by simple diffusion from its size, lipid solubility and degree of ionisation.
## pitfalls
Assuming a water-soluble drug simply diffuses more slowly. A fully ionised drug does not diffuse through the lipid at all; it needs a carrier, a pore, or nothing happens.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M01
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Passage of drugs across cell membranes
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Passage of drugs across cell membranes > Simple diffusion
## universities
kau
## learner_years
1
## aliases
Simple diffusion of drugs
Passive diffusion across cell membranes
Lipid solubility and drug transfer
## arabic_label
الانتشار البسيط للأدوية عبر الأغشية
## arabic_aliases
الانتشار السلبي
## article_ids
ART-108-PHA-MEMBRANE-PASSAGE
## related_article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
CON-FND-9D7D3A5B015805 | CON-FND-ED16C95CE71A4B | CON-FND-3CECD012838275
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.4
## academic_relevance
0.85
## weight_confidence
0.45
## confidence
0.85
## original_wording
[Orientation ILO 4, MCQ tick] To describe the different ways of passage of drugs across membranes
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-E6BC7647754BFE
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: Placed under protest. The book gives "Passage of drugs across cell membranes" its own section before ADME, and the taxonomy has no microtopic for membrane transfer. SYS-FND-T04-S01-M01 (Absorption) is the nearest honest home, because absorption is the first thing this mechanism governs, but the concept also governs distribution and excretion.
microtopicId: No MIC_ id covers drug transfer across membranes; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117); no live claim asserts this and a near-miss must not be attached to clear a validator.
resourceIds: The Kasr src_ sources are real manifest entries but are absent from corpus-source-index.json, so citing one fails the corpus check. They are cited in the file preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet and the book's section headings; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "simple diffusion" and "passive diffusion" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence, which publication_status records.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-E6BC7647754BFE ("Lipid-soluble substance diffusion rate is proportional to lipid solubility") is a membrane-physiology record on DIS-PHY-T01, written from a physiology essay. Related but distinct grain: it states a proportionality about substances in general; this states which drugs cross and why, and is examined as a pharmacology objective. Cross-linked, not merged.
conflicts: No source disagreement found.
uncertainty: Nothing about the mechanism is unclear at this level.
relationships: Prerequisite_of the absorption, distribution and excretion records in this batch, and contrasts_with CON-FND-9D7D3A5B015805. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Carrier-mediated transport of drugs needs a carrier, is saturable, and can be blocked by competition
## id
CON-FND-9D7D3A5B015805
## canonical_key
teaching.pharma.membrane.carrier-mediated
## definition
Some drugs cross membranes bound to a protein carrier rather than through the lipid. Facilitated diffusion runs down the concentration gradient and needs no energy; active transport runs against it and does need energy. Both are saturable, both are relatively selective, and both can be inhibited by another drug competing for the same carrier.
## explicit_objective
Recognise carrier-mediated transport from its three signatures — carrier dependence, saturability and competitive inhibition — and separate active transport from facilitated diffusion by direction and energy use.
## pitfalls
Treating "active" as a synonym for "carrier-mediated". Facilitated diffusion also uses a carrier; what makes transport active is moving the drug against its gradient at the cost of energy.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M01
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Passage of drugs across cell membranes
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Passage of drugs across cell membranes > Carrier mediated transport
## universities
kau
## learner_years
1
## aliases
Carrier mediated transport of drugs
Active transport of drugs
Facilitated diffusion of drugs
Saturable drug transport
## arabic_label
النقل بواسطة حامل عبر الأغشية
## arabic_aliases
النقل النشط
الانتشار الميسر
## article_ids
ART-108-PHA-MEMBRANE-PASSAGE
## related_article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
CON-FND-584FCF6897C35E | CON-FND-88101C454AAF1D | CON-FND-01E59D0FD26046
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p2 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## clinical_relevance
0.45
## academic_relevance
0.85
## weight_confidence
0.55
## confidence
0.9
## original_wording
[EOY 2024 Section 1 Q13, 0.5 marks] Which of the following statements best describes active transport:
[EOY 2024 Section 1 Q13, correct option] It requires a carrier.
[Orientation ILO 4, MCQ tick] To describe the different ways of passage of drugs across membranes
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-63E98D8301CC2A | CON-FND-7E16CDFECE29B4 | CON-FND-2352D8CDD1F828 | CON-FND-DF7D6BE0B98F86
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: Placed under protest, for the reason given on CON-FND-584FCF6897C35E — the book's "Passage of drugs across cell membranes" section has no microtopic, and Absorption is the nearest honest home.
microtopicId: No MIC_ id covers carrier-mediated drug transfer.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json, so citing one fails the corpus check; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the 2024 paper and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "active transport" and "carrier" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Four live records on DIS-PHY-T01 describe facilitated diffusion from a physiology essay — CON-FND-63E98D8301CC2A (carrier, no energy, down a gradient), CON-FND-7E16CDFECE29B4 (saturation), CON-FND-2352D8CDD1F828 (conformational change) and CON-FND-DF7D6BE0B98F86 (substrate specificity). Related but distinct grain: each states one property of facilitated diffusion in general cell physiology, and none of them mentions active transport, which is what the 2024 paper actually asked. This record is the pharmacology objective that contrasts the two. Cross-linked, not merged.
conflicts: No source disagreement found.
uncertainty: Nothing about the mechanism is unclear at this level.
relationships: contrasts_with CON-FND-584FCF6897C35E and prerequisite_of CON-FND-88101C454AAF1D and the live CON-FND-01E59D0FD26046 (saturable tubular secretion). Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
A drug's pKa and the pH of the medium decide what fraction of it is non-ionised, and therefore how well it is absorbed
## id
CON-FND-ED16C95CE71A4B
## canonical_key
teaching.pharma.ionisation.ph-partition
## definition
Most drugs are weak acids or weak bases, so they exist as an equilibrium between an ionised and a non-ionised form. Only the non-ionised form is lipid-soluble enough to diffuse across a membrane. A weak acid is mostly non-ionised in an acidic medium and a weak base is mostly non-ionised in an alkaline one, so the pH of the compartment decides how readily each is absorbed.
## explicit_objective
Predict, for a weak acid or a weak base, whether it will be mainly ionised or non-ionised in a given compartment, and say what that does to its absorption.
## pitfalls
Answering that a weak acid is absorbed best in the stomach because the stomach is where acids go. The reason is ionisation, not chemistry class; the small intestine still absorbs more of most weak acids because its surface area is vastly larger.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M01
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Passage of drugs across cell membranes
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Passage of drugs across cell membranes > Simple diffusion
## universities
kau
## learner_years
1
## aliases
pH partition hypothesis
pKa and drug ionisation
Ionisation and lipid solubility of drugs
Weak acid and weak base absorption
## arabic_label
تأثير درجة حموضة الوسط وثابت تأين الدواء على امتصاصه
## arabic_aliases
فرضية التوزيع حسب درجة الحموضة
## article_ids
ART-108-PHA-MEMBRANE-PASSAGE
## related_article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
CON-FND-584FCF6897C35E | CON-FND-97E55D75DE9ED1 | CON-FND-F2DD5E50875917
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p4 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## clinical_relevance
0.5
## academic_relevance
0.9
## weight_confidence
0.55
## confidence
0.9
## original_wording
[EOY 2025 Section 1 Q13, 0.5 marks] A weak acid drug is better absorbed trom the stomach because:
[EOY 2025 Section 1 Q13, correct option] In an acidic medium, the weak acid is mostly non-ionized and lipid- soluble
[Orientation ILO 5, MCQ tick] To explain the importance of the medium's pH and drug's pKa in determine lipid solubility of drugs
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-B984AA153E7E66
## conflicts
The 2025 paper's stem asserts that a weak acid is better absorbed from the stomach, while the same book teaches that the small intestine is the main site of absorption for most drugs because of its surface area. The paper is testing the ionisation principle, not the site; both positions are recorded rather than one being chosen silently.
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: Placed under protest — the book's membrane-passage section has no microtopic; Absorption is the nearest honest home and is what the 2025 question tested.
microtopicId: No MIC_ id covers drug ionisation.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "pKa" and "ionisation" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-B984AA153E7E66 ("pKa equals the negative logarithm of Ka") sits on SYS-FND-T06-S02-M04 and is the acid-base chemistry definition. Related but distinct grain: it defines the constant, this one applies it to drug transfer. A question could test either without the other. Cross-linked, not merged.
uncertainty: Nothing about the principle is unclear; the disagreement about site of absorption is recorded on conflicts.
relationships: prerequisite_of CON-FND-97E55D75DE9ED1 (ion trapping) and mechanism_step_before CON-FND-F2DD5E50875917. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Ion trapping: a drug that ionises in a compartment cannot leave it, which is why urine pH is manipulated in overdose
## id
CON-FND-97E55D75DE9ED1
## canonical_key
teaching.pharma.ionisation.ion-trapping
## definition
When a drug crosses into a compartment whose pH ionises it, the charged form cannot diffuse back and the drug accumulates there. Alkalinising the urine ionises a weak acid in the tubule and traps it for excretion; acidifying the urine does the same for a weak base. The same trapping explains why weak bases concentrate in gastric juice and in breast milk.
## explicit_objective
Choose whether to alkalinise or acidify the urine to speed the excretion of a named weak acid or weak base, and explain the trapping that makes it work.
## pitfalls
Reversing the rule under pressure. The compartment must be given the pH that ionises the drug, not the pH that matches it — alkaline urine traps an acid.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M04
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics
## microtopic
Excretion
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Excretion > Renal
## universities
kau
## learner_years
1
## aliases
Ion trapping
pH manipulation of drug excretion
Urinary alkalinisation and acidification
Ion trapping in breast milk
## arabic_label
احتجاز الأيونات
## arabic_aliases
تعديل حموضة البول لزيادة إخراج الدواء
## article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_article_ids
ART-108-PHA-MEMBRANE-PASSAGE
## related_concept_ids
CON-FND-ED16C95CE71A4B | CON-FND-88101C454AAF1D | CON-FND-3CECD012838275
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.7
## academic_relevance
0.85
## weight_confidence
0.45
## confidence
0.85
## original_wording
[Orientation ILO 22, MCQ tick] To explain the phenomenon of ion trapping
[Orientation ILO 6, MCQ tick] To explain applications of changing medium pH of drugs' absorption and excretion
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-ED16C95CE71A4B
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S01-M04 is Excretion, and the overlay microtopic matches the canonical placement.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "ion trapping" and "urinary alkalinisation" — no candidate record exists.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-ED16C95CE71A4B is the pH-partition record in this same batch. Related but distinct grain: that one predicts the ionised fraction, this one predicts what happens once a drug is already across and cannot come back. ILO 5 and ILO 22 are separate objectives, both MCQ-ticked, so the department examines them separately. Cross-linked, not merged.
conflicts: No source disagreement found.
uncertainty: The book covers trapping in urine and in gastric juice; whether the department expects the breast-milk application is not stated on the ILO sheet, so it is taught here as an example rather than as a listed objective.
relationships: caused_by CON-FND-ED16C95CE71A4B and mechanism_step_before CON-FND-88101C454AAF1D. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Oral absorption is set by gastrointestinal surface area, gastric emptying, blood flow and what else is in the gut
## id
CON-FND-F2DD5E50875917
## canonical_key
teaching.pharma.absorption.oral-factors
## definition
The small intestine absorbs most orally given drugs because its villi give it by far the largest surface area. How fast a drug reaches that surface depends on gastric emptying; how fast it leaves depends on splanchnic blood flow. Food, other drugs and gut disease change all three, and can compete directly with the drug for absorption.
## explicit_objective
Given a change in gastric emptying, gut motility, blood flow or gut contents, predict its effect on the rate and the extent of oral drug absorption.
## pitfalls
Believing the stomach is the main site of absorption because it is the first place the drug arrives. Surface area decides it, and the stomach has very little.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M01
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics
## microtopic
Absorption
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Absorption > Factors affecting oral absorption
## universities
kau
## learner_years
1
## aliases
Factors affecting oral absorption
Factors affecting drug absorption
Food-drug interaction at absorption
Gastric emptying and drug absorption
## arabic_label
العوامل المؤثرة على امتصاص الأدوية عن طريق الفم
## arabic_aliases
العوامل المؤثرة على امتصاص الدواء
## article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_article_ids
ART-108-PHA-ROUTES
## related_concept_ids
CON-FND-CF40F32A8A74A0 | CON-FND-ED16C95CE71A4B | CON-FND-3CC8853A7D6DA8
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p3 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.6
## exam_weight_by_year
KAU_Y1=0.6
## clinical_relevance
0.6
## academic_relevance
0.85
## weight_confidence
0.55
## confidence
0.9
## original_wording
[EOY 2024 Section 1 Q14, 0.5 marks] Regarding the oral absorption of drugs, which of the following applies:
[EOY 2024 Section 1 Q14, correct option] The presence of food might compete with the absorption of some drugs.
[Orientation ILO 7, MCQ tick] To describe different factors affecting the absorption and the oral absorption of drugs
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S01-M01 is Absorption and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the 2024 paper and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "oral absorption" and "gastric emptying" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live state for "absorption", "oral absorption" and "gastric emptying" across all 1,718 concepts unfiltered. The eleven hits are gut physiology and malabsorption records in gi and haem; none is about drug absorption. No merge was proposed or rejected.
conflicts: No source disagreement found.
uncertainty: Nothing about the mechanism is unclear at this level.
relationships: mechanism_step_before CON-FND-CF40F32A8A74A0 (bioavailability) and part_of the oral-route record CON-FND-3CC8853A7D6DA8. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Bioavailability is the fraction of an oral dose that reaches the systemic circulation, and first-pass metabolism is what removes the rest
## id
CON-FND-CF40F32A8A74A0
## canonical_key
teaching.pharma.bioavailability.first-pass
## definition
Bioavailability is the fraction of an administered dose that reaches the systemic circulation unchanged. An intravenous dose is by definition completely bioavailable. An oral dose is not, because it must survive the gut lumen, the gut wall and then the liver, which it passes through before reaching the rest of the body — the first-pass effect.
## explicit_objective
Define bioavailability and first-pass metabolism, and explain why the same drug needs a larger dose by mouth than by vein.
## pitfalls
Treating incomplete bioavailability as a failure of absorption. A drug can be absorbed completely and still have low bioavailability, because the liver removed it before it reached the circulation.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M01
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics
## microtopic
Absorption
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Absorption > Bioavailability
## universities
kau
## learner_years
1
## aliases
Bioavailability
First-pass effect
First pass metabolism
Presystemic elimination
Oral bioavailability
## arabic_label
التوافر الحيوي
## arabic_aliases
تأثير المرور الأول
الاستقلاب قبل الجهازي
## article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_article_ids
ART-108-PHA-ROUTES
## related_concept_ids
CON-FND-F2DD5E50875917 | CON-FND-3CC8853A7D6DA8 | CON-FND-450B67836EBF1A
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p1 | 108 INT
src_bd1595e59d116b78436a | end_of_year_written | 2025 | p9 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year_written | 2024 | p6 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.9
## exam_weight_by_year
KAU_Y1=0.9
## clinical_relevance
0.75
## academic_relevance
0.95
## weight_confidence
0.7
## confidence
0.95
## original_wording
[EOY 2025 Section 2 Q3a, 1 mark] Bioavailability
[EOY 2024 Section 2 QIIIc, 1 mark] Bioavailability.
[Orientation ILO 8, SAQ and MCQ ticks] To define bioavailability and first-pass effect
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
The 2024 paper offers "First-pass metabolism occurs only in the liver" as a distractor, so the department treats gut-wall metabolism as part of the first pass. The book's section on the oral route names the liver alone. Both positions are recorded; the paper is the more recent statement.
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S01-M01 is Absorption and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from both exam papers and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "bioavailability" and "first pass" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live state for "bioavail", "first-pass" and "first pass" across all 1,718 concepts unfiltered — no hit. No merge was proposed or rejected.
uncertainty: Nothing about the definition is unclear; the scope of the first pass is recorded on conflicts.
relationships: This is the most heavily weighted record in the kinetics half — ILO 8 carries both ticks and it was asked as a written definition in both sittings. prerequisite_of CON-FND-3CC8853A7D6DA8 (oral route) and caused_by CON-FND-450B67836EBF1A (hepatic metabolism). Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Drugs distribute into one of four patterns, from staying in plasma to concentrating in a single tissue
## id
CON-FND-040D2633B0A2FE
## canonical_key
teaching.pharma.distribution.patterns
## definition
A drug may stay almost entirely in the plasma, spread through the extracellular fluid, spread through total body water by entering every cell, or leave the water compartments altogether and concentrate in one tissue such as fat, bone or thyroid. Which pattern it takes follows from its size, its charge, its lipid solubility and how tightly plasma proteins hold it.
## explicit_objective
Match a drug's physical properties to the distribution pattern it will follow, and name the body compartment each pattern corresponds to.
## pitfalls
Reading the pattern off the dose rather than off the drug. Distribution pattern is a property of the molecule and its binding, not of how much was given.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M02
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics
## microtopic
Distribution
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Distribution > Patterns of distribution
## universities
kau
## learner_years
1
## aliases
Patterns of drug distribution
Distribution compartments
Plasma, extracellular and total body water distribution
Tissue-concentrated drugs
## arabic_label
أنماط توزيع الأدوية في الجسم
## arabic_aliases
حجرات توزيع الدواء
## article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_article_ids
ART-108-PHA-MEMBRANE-PASSAGE
## related_concept_ids
CON-FND-53FF18E42BC94B | CON-FND-CBA2A73AE9A6D8 | CON-FND-3CECD012838275
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.5
## academic_relevance
0.85
## weight_confidence
0.45
## confidence
0.85
## original_wording
[Orientation ILO 9, MCQ tick] To describe the different patterns of drug distribution
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-43BED56FA9D1E9 | CON-FND-FD53CFAE6AAC72
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S01-M02 is Distribution and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "distribution pattern" and "body compartment" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-43BED56FA9D1E9 and CON-FND-FD53CFAE6AAC72 are the live interpretations of a low and a high apparent volume of distribution, on this same node. Related but distinct grain: those two read a number back to a distribution state, this one names the states themselves and the properties that produce them. ILO 9 (patterns) and ILO 13 (clinical importance of Vd) are separate MCQ-ticked objectives. Both live records are updated in 108-INT-concepts-pharmacology-updates.md rather than duplicated.
conflicts: No source disagreement found.
uncertainty: The book names four patterns; whether the department expects all four by name or only the contrast between them is not stated on the ILO sheet.
relationships: prerequisite_of the live Vd records CON-FND-CBA2A73AE9A6D8, CON-FND-43BED56FA9D1E9 and CON-FND-FD53CFAE6AAC72. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Plasma protein binding, lipid solubility, blood flow and tissue affinity are what decide where a drug goes
## id
CON-FND-53FF18E42BC94B
## canonical_key
teaching.pharma.distribution.factors
## definition
Only free drug can leave the circulation, so the fraction bound to plasma protein — chiefly albumin for acids, alpha-1 acid glycoprotein for bases — limits distribution and acts as a reservoir. Lipid solubility decides whether the free drug can cross membranes, regional blood flow decides how fast it arrives, and affinity for a particular tissue decides where it accumulates.
## explicit_objective
List the factors that determine drug distribution and explain, for each, the direction in which it moves the drug.
## pitfalls
Assuming that displacing a drug from plasma protein always causes toxicity. Displacement raises free drug, but it also exposes more drug to metabolism and excretion, so the effect is usually transient.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M02
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics
## microtopic
Distribution
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Distribution > Factors affecting distribution of drugs
## universities
kau
## learner_years
1
## aliases
Factors affecting drug distribution
Plasma protein binding
Protein binding and free drug
Tissue affinity and drug distribution
## arabic_label
العوامل المؤثرة على توزيع الأدوية
## arabic_aliases
ارتباط الدواء ببروتينات البلازما
## article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_article_ids
ART-108-PHA-DRUG-INTERACTIONS
## related_concept_ids
CON-FND-040D2633B0A2FE | CON-FND-3CECD012838275 | CON-FND-7F618A3D1F940B
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p1 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p3 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.85
## exam_weight_by_year
KAU_Y1=0.85
## clinical_relevance
0.65
## academic_relevance
0.9
## weight_confidence
0.65
## confidence
0.9
## original_wording
[Orientation ILO 10, SAQ and MCQ ticks] To mention factors affecting drug distribution
[EOY 2024 Section 1 Q15, correct option] This drug probably has a high molecular weight or strong plasma protien binding
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-43BED56FA9D1E9
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S01-M02 is Distribution and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet and the 2024 paper; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "protein binding" and "drug distribution" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-43BED56FA9D1E9 (low apparent Vd) names high molecular weight and strong plasma-protein binding, which is one of the factors here, and it is the record the 2024 Q15 answer belongs to. Related but distinct grain: that record reads a Vd figure, this one lists the determinants of distribution as ILO 10 asks. The 2024 stem is quoted on both — on that record through its update row, here because protein binding is the factor being tested. Cross-linked, not merged.
conflicts: No source disagreement found.
uncertainty: Nothing about the factors is unclear at this level.
relationships: prerequisite_of CON-FND-040D2633B0A2FE and mechanism_step_before CON-FND-7F618A3D1F940B (displacement as a kinetic interaction). ILO 10 carries both ticks, which is why this outweighs the pattern record beside it. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
The blood-brain barrier, the placenta and breast milk each let only some drugs through, and each has a clinical consequence
## id
CON-FND-3CECD012838275
## canonical_key
teaching.pharma.distribution.barriers
## definition
The blood-brain barrier admits lipid-soluble, non-ionised, unbound drug and excludes the rest, which is why some antibiotics never reach the meninges and why a centrally acting drug must be lipid-soluble. The placenta is a far weaker barrier and most drugs cross it, so a drug given to a pregnant woman is given to the fetus. Weak bases are trapped in the relatively acidic breast milk and reach the infant.
## explicit_objective
Predict whether a named drug will cross the blood-brain barrier or the placenta, and state the clinical consequence of it doing so.
## pitfalls
Calling the placenta a barrier and then reasoning as though it protects the fetus. It delays some drugs; it excludes very few.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M02
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | SYS-FND-T04-S03-M03 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics
## microtopic
Distribution
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Distribution > Factors affecting distribution of drugs
## universities
kau
## learner_years
1
## aliases
Blood-brain barrier and drugs
Placental transfer of drugs
Drugs in breast milk
Drug passage across biological barriers
## arabic_label
عبور الأدوية للحاجز الدموي الدماغي والمشيمة ولبن الأم
## arabic_aliases
الحاجز الدموي الدماغي
انتقال الأدوية عبر المشيمة
## article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_article_ids
ART-108-PHA-MEMBRANE-PASSAGE
ART-108-PHA-ADVERSE-DRUG-REACTIONS
## related_concept_ids
CON-FND-53FF18E42BC94B | CON-FND-97E55D75DE9ED1 | CON-FND-2A5DE8657047E4
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.85
## academic_relevance
0.8
## weight_confidence
0.45
## confidence
0.85
## original_wording
[Orientation ILO 11, MCQ tick] To understand the clinical implications of drug passage across the blood brain barrier and the placental barrier and through breast milk
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S01-M02 is Distribution and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "blood brain barrier" and "placental transfer" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live state for "blood brain", "blood-brain" and "placenta" across all 1,718 concepts unfiltered. The 37 placenta hits are embryology and obstetric physiology records under DIS-EMB and DIS-PHY-T06, all about the organ rather than about drug transfer; none is a near-miss. No merge was proposed or rejected.
conflicts: No source disagreement found.
uncertainty: The book states that most drugs cross the placenta but does not quantify it, and no local source gives an Egyptian figure; the claim is therefore taught qualitatively.
relationships: The secondary placement SYS-FND-T04-S03-M03 (Special populations) is genuine — this is the record that pregnancy and lactation prescribing rests on. is_a specialisation of CON-FND-53FF18E42BC94B. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
The liver is the main site of drug metabolism, but the gut wall, plasma, lung and kidney all metabolise drugs too
## id
CON-FND-C3B843D7032C7F
## canonical_key
teaching.pharma.metabolism.sites
## definition
Biotransformation converts a drug into a more polar metabolite that the kidney can excrete. The liver does most of it, which is why hepatic disease and first-pass metabolism matter so much, but the intestinal wall, plasma esterases, the lung and the kidney also carry out drug metabolism, and for some drugs they carry out most of it.
## explicit_objective
Name the sites of drug metabolism in order of importance and say why extrahepatic metabolism changes what happens to a drug given by mouth.
## pitfalls
Equating drug metabolism with the liver, and then being unable to explain why a drug is inactivated in the gut wall before it ever reaches a hepatocyte.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M03
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics
## microtopic
Metabolism
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Metabolism (Biotransformation) > Site of Metabolism
## universities
kau
## learner_years
1
## aliases
Sites of drug metabolism
Biotransformation sites
Extrahepatic drug metabolism
Organs of drug metabolism
## arabic_label
مواقع استقلاب الأدوية
## arabic_aliases
أماكن التحول الحيوي للدواء
## article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_article_ids
ART-108-PHA-ROUTES
## related_concept_ids
CON-FND-44B6AE3E7DDA55 | CON-FND-E34035C5B4FF80 | CON-FND-CF40F32A8A74A0
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.45
## exam_weight_by_year
KAU_Y1=0.45
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.45
## confidence
0.85
## original_wording
[Orientation ILO 14, MCQ tick] To enumerate the sites of metabolism of drugs
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S01-M03 is Metabolism and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet and the book's "Site of Metabolism (Organs)" heading; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "biotransformation" and "drug metabolism" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live state for "metabolism" and "microsomal" across all 1,718 concepts unfiltered — the single "metabolism" hit is an obstetric physiology record about human chorionic somatomammotropin. No merge was proposed or rejected.
conflicts: No source disagreement found.
uncertainty: The book lists the organs but does not rank the extrahepatic sites against each other, and no source read here does.
relationships: prerequisite_of CON-FND-44B6AE3E7DDA55 and part_of the first-pass mechanism on CON-FND-CF40F32A8A74A0. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Phase I reactions expose or add a reactive group; Phase II conjugates it, and the drug leaves the body only after the second
## id
CON-FND-44B6AE3E7DDA55
## canonical_key
teaching.pharma.metabolism.phases
## definition
Phase I is non-synthetic: oxidation, reduction or hydrolysis unmasks or introduces a functional group, and the metabolite may be less active, equally active or more active than the parent drug. Phase II is synthetic: the drug or its Phase I metabolite is conjugated — with glucuronic acid, sulphate, acetate, glycine or glutathione — into a polar, usually inactive product that the kidney can excrete.
## explicit_objective
Compare Phase I and Phase II metabolism by reaction type, effect on activity and effect on polarity, and explain why a drug may need both.
## pitfalls
Assuming metabolism always inactivates. Phase I can produce an active or a toxic metabolite, and a prodrug depends on exactly that.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M03
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics
## microtopic
Metabolism
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Metabolism (Biotransformation) > Types of Metabolic reactions
## universities
kau
## learner_years
1
## aliases
Phase I and Phase II metabolism
Phases of drug metabolism
Conjugation reactions
Non-synthetic and synthetic metabolic reactions
## arabic_label
المرحلتان الأولى والثانية من استقلاب الأدوية
## arabic_aliases
تفاعلات الاقتران
## article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_article_ids
ART-108-PHA-DRUG-INTERACTIONS
## related_concept_ids
CON-FND-C3B843D7032C7F | CON-FND-E34035C5B4FF80 | CON-FND-450B67836EBF1A
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p1 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year_written | 2024 | p6 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.85
## exam_weight_by_year
KAU_Y1=0.85
## clinical_relevance
0.6
## academic_relevance
0.95
## weight_confidence
0.65
## confidence
0.9
## original_wording
[Orientation ILO 15, SAQ and MCQ ticks] To compare the phases of drug metabolism
[EOY 2024 Section 2 QIIId, 1 mark] Phase 1 hepatic metabolism of drugs.
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
The 2025 paper offers "Hepatic microsomal enzymes can catalyze all Phase II reactions except glucuronidation" as a distractor, implying that microsomal enzymes catalyse glucuronidation and little else in Phase II. The book's enzyme section is less specific. Both are recorded; the distractor is not a statement of fact and is not taught as one.
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S01-M03 is Metabolism and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet and the 2024 paper; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "phase I metabolism" and "conjugation" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live state for "phase", "conjugation" and "glucuronid" across all 1,718 concepts unfiltered — no pharmacology hit. No merge was proposed or rejected.
uncertainty: Nothing about the two phases is unclear; the distractor's implication is recorded on conflicts.
relationships: ILO 15 carries both ticks and the 2024 paper asked Phase I as a 1-mark written definition, which is why this outweighs the site record. mechanism_step_before itself in sequence, and prerequisite_of CON-FND-E34035C5B4FF80. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Microsomal enzymes are hepatic, inducible and act on lipid-soluble drugs; non-microsomal enzymes are neither confined to the liver nor inducible
## id
CON-FND-E34035C5B4FF80
## canonical_key
teaching.pharma.metabolism.microsomal-vs-nonmicrosomal
## definition
Microsomal enzymes sit in the smooth endoplasmic reticulum of the hepatocyte, chiefly the cytochrome P450 system, act on lipid-soluble drugs, catalyse most Phase I reactions and glucuronide conjugation, and can be induced or inhibited. Non-microsomal enzymes are cytoplasmic or mitochondrial, are found in the liver and in plasma, gut and other tissues, catalyse the remaining conjugations and some oxidations, and are not inducible.
## explicit_objective
Compare microsomal and non-microsomal drug-metabolising enzymes by site, organs involved, phases catalysed and inducibility.
## pitfalls
Reading "not inducible" as "not inhibitable" or as "unimportant". Non-microsomal enzymes handle a large share of conjugation; what they do not do is respond to an inducer.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M03
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics
## microtopic
Metabolism
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Metabolism (Biotransformation) > Enzymes responsible for drug metabolism
## universities
kau
## learner_years
1
## aliases
Microsomal versus non-microsomal enzymes
Cytochrome P450 system
Hepatic microsomal enzymes
Drug-metabolising enzymes
## arabic_label
الإنزيمات الميكروسومية وغير الميكروسومية المستقلبة للأدوية
## arabic_aliases
نظام السيتوكروم بي 450
## article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_article_ids
ART-108-PHA-DRUG-INTERACTIONS
## related_concept_ids
CON-FND-44B6AE3E7DDA55 | CON-FND-450B67836EBF1A | CON-FND-C3B843D7032C7F
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p1 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p4 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.9
## exam_weight_by_year
KAU_Y1=0.9
## clinical_relevance
0.6
## academic_relevance
0.95
## weight_confidence
0.7
## confidence
0.9
## original_wording
[EOY 2025 Section 1 Q16, 0.5 marks] Which of the following correctly distinguishes hepatic microsomal from non-microsomal drug-metabolizing enzymes?
[EOY 2025 Section 1 Q16, correct option] Hepatic microsomal enzymes are inducible; non-microsomal enzymes are not
[Orientation ILO 18, SAQ and MCQ ticks] To compare microsomal and non-microsomal drug-metabolizing enzymes regarding their site, organs involved, phases catalysed, and inducibility
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S01-M03 is Metabolism and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "microsomal" and "cytochrome P450" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live state for "microsomal", "induction" and "inhibition" across all 1,718 concepts unfiltered. The four "inhibition" hits are haematology, neuroanatomy, gut physiology and renal physiology; none concerns drug-metabolising enzymes. No merge was proposed or rejected.
conflicts: No source disagreement found; the 2025 answer and the ILO wording agree.
uncertainty: Nothing about the comparison is unclear at this level.
relationships: ILO 18 carries both ticks and the 2025 paper asked it as a single-best-answer, which is why this is one of the two heaviest kinetics records. prerequisite_of CON-FND-450B67836EBF1A. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Enzyme induction speeds a drug's own metabolism and everyone else's; enzyme inhibition does the opposite and does it faster
## id
CON-FND-450B67836EBF1A
## canonical_key
teaching.pharma.metabolism.induction-inhibition
## definition
An inducer increases the synthesis of microsomal enzymes over days to weeks, so the drug that induced them and any other drug they metabolise is cleared faster, loses effect, and may need a larger dose — and a prodrug may become more toxic. An inhibitor blocks the enzyme within hours, so the affected drug accumulates and its effect and toxicity rise. Age, genetics, liver disease, malnutrition, smoking and diet all shift enzyme activity in the same way.
## explicit_objective
Predict what induction or inhibition of a drug-metabolising enzyme does to the plasma level, effect and toxicity of a co-administered drug, and say which acts faster.
## pitfalls
Assuming induction always reduces toxicity. If the toxic species is the metabolite, induction increases toxicity — and an inducer can induce its own metabolism, so the dose that worked in week one may not work in week three.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M03
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | SYS-FND-T04-S03-M02 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics
## microtopic
Metabolism
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Metabolism (Biotransformation) > Factors affecting metabolizing enzyme activity
## universities
kau
## learner_years
1
## aliases
Enzyme induction
Enzyme inhibition
Microsomal enzyme inducer
Factors affecting drug metabolism
## arabic_label
تحفيز وتثبيط إنزيمات استقلاب الأدوية
## arabic_aliases
محفزات الإنزيمات الكبدية
مثبطات الإنزيمات الكبدية
## article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_article_ids
ART-108-PHA-DRUG-INTERACTIONS
## related_concept_ids
CON-FND-E34035C5B4FF80 | CON-FND-7F618A3D1F940B | CON-FND-A1FC8CB691E6C5
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p3 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.65
## exam_weight_by_year
KAU_Y1=0.65
## clinical_relevance
0.85
## academic_relevance
0.9
## weight_confidence
0.6
## confidence
0.9
## original_wording
[EOY 2024 Section 1 Q16, 0.5 marks] A hepatic microsomal enzyme inducer can do which of the following:
[EOY 2024 Section 1 Q16, correct option] Induce its own metabolism.
[EOY 2024 Section 1 Q18, correct option] Tobacco smoking
[Orientation ILO 17, MCQ tick] To explain the consequences of microsomal enzyme induction and inhibition
[Orientation ILO 16, MCQ tick] To mention factors affecting drug metabolism
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-INF-51969EE083C8FB
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S01-M03 is Metabolism and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the 2024 paper and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "enzyme induction" and "enzyme inhibitor" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-INF-51969EE083C8FB ("Azoles have broad antifungal activity but are prone to mammalian cytochrome-P450 interactions") is a third-year antifungal record on DIS-PHA-T05. Related but distinct grain: it is a property of one drug class, this is the general principle a first-year student is examined on. Cross-linked, not merged. Two records in this batch combine ILO 16 and ILO 17 deliberately — the factors that change enzyme activity and the consequences of changing it cannot be assessed apart in a single-best-answer, and the 2024 paper tested them in adjacent questions with one mechanism.
conflicts: No source disagreement found.
uncertainty: The book lists smoking, diet, age, genetics and disease as factors but does not rank them, and the 2024 paper tested only smoking.
relationships: causes CON-FND-7F618A3D1F940B (pharmacokinetic interaction) and is one mechanism of CON-FND-A1FC8CB691E6C5 (pharmacokinetic tolerance). The secondary placement SYS-FND-T04-S03-M02 (Interactions) is genuine, not a stretch. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Renal drug elimination is the sum of glomerular filtration, active tubular secretion and passive tubular reabsorption
## id
CON-FND-88101C454AAF1D
## canonical_key
teaching.pharma.excretion.renal-processes
## definition
Only free, unbound drug is filtered at the glomerulus, so a highly protein-bound drug is barely filtered at all. Active tubular secretion needs a carrier, handles acids and bases on separate transporters, and can move bound drug as well. Passive reabsorption returns lipid-soluble, non-ionised drug from the tubule to the blood, which is why urine pH changes the final amount excreted.
## explicit_objective
Break renal drug elimination into its three processes and say, for a named drug property, which process it affects and in which direction.
## pitfalls
Assuming protein binding blocks renal elimination altogether. It blocks filtration; secretion strips drug off the protein and clears it anyway.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M04
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics
## microtopic
Excretion
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Excretion > Renal
## universities
kau
## learner_years
1
## aliases
Renal excretion of drugs
Glomerular filtration of drugs
Tubular secretion and reabsorption of drugs
Renal elimination
## arabic_label
الإخراج الكلوي للأدوية
## arabic_aliases
الترشيح الكبيبي والإفراز الأنبوبي للأدوية
## article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_article_ids
ART-108-PHA-KINETIC-PRINCIPLES
## related_concept_ids
CON-FND-01E59D0FD26046 | CON-FND-97E55D75DE9ED1 | CON-FND-87C323BB0CE321
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p4 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p5 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.65
## exam_weight_by_year
KAU_Y1=0.65
## clinical_relevance
0.7
## academic_relevance
0.9
## weight_confidence
0.6
## confidence
0.9
## original_wording
[EOY 2024 Section 1 Q19, 0.5 marks] Which of the following describes the renal elimination of drugs:
[EOY 2024 Section 1 Q19, correct option] Drugs undergoing renal secretion need a carrier.
[Orientation ILO 19, MCQ tick] To describe the processes involved in renal elimination of drugs
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-01E59D0FD26046 | CON-FND-87C323BB0CE321
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S01-M04 is Excretion and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from both papers and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "renal excretion" and "tubular secretion" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-01E59D0FD26046 ("Active tubular excretion is saturable and is a site of competition and drug interaction") sits on this exact node and covers one of the three processes; CON-FND-87C323BB0CE321 defines clearance. Related but distinct grain: the live record states a property of secretion — saturability — that matters because it produces interactions, while this one enumerates the three processes and is what the 2024 and 2025 papers both asked. A student can state the three processes without knowing secretion saturates, and the reverse. Both live records are updated in 108-INT-concepts-pharmacology-updates.md rather than duplicated.
conflicts: No source disagreement found.
uncertainty: Nothing about the three processes is unclear at this level.
relationships: part_of relationships run from CON-FND-01E59D0FD26046 up to this record, and this is prerequisite_of CON-FND-87C323BB0CE321. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Drugs also leave the body through the lungs, the gut, sweat, saliva and milk, and each route has a use or a hazard
## id
CON-FND-67D5E471045317
## canonical_key
teaching.pharma.excretion.non-renal
## definition
Volatile drugs and gases are excreted by the lungs, which is what makes a breath alcohol test possible and what governs recovery from an inhalational anaesthetic. The alimentary tract excretes drug in bile and in gastrointestinal secretions. Skin glands excrete drug in sweat, and salivary and mammary glands do the same — so a drug can reach a breastfed infant by an exit route rather than an entry one.
## explicit_objective
Name the non-renal routes of drug excretion and give, for each, one clinical use or hazard that follows from it.
## pitfalls
Treating non-renal excretion as trivial because it is quantitatively small. For a volatile anaesthetic the lung is the main route, and for the infant at the breast the mammary route is the one that matters.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M04
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics
## microtopic
Excretion
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Excretion > The Lungs
108 INT > Pharmacology > Pharmacokinetics > Excretion > The Alimentary Tract
108 INT > Pharmacology > Pharmacokinetics > Excretion > Skin Glands
## universities
kau
## learner_years
1
## aliases
Non-renal drug excretion
Pulmonary excretion of drugs
Excretion of drugs in milk
Excretion in sweat and saliva
## arabic_label
طرق إخراج الأدوية غير الكلوية
## arabic_aliases
الإخراج الرئوي للأدوية
## article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_article_ids
ART-108-PHA-ROUTES
## related_concept_ids
CON-FND-9D89A82094F8AA | CON-FND-3CECD012838275 | CON-FND-97E55D75DE9ED1
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p1 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.45
## exam_weight_by_year
KAU_Y1=0.45
## clinical_relevance
0.6
## academic_relevance
0.75
## weight_confidence
0.45
## confidence
0.85
## original_wording
[Orientation ILO 23, MCQ tick] To mention non-renal routes of drug excretion: pulmonary, gastrointestinal secretions, and skin gland routes
[Orientation ILO 20, MCQ tick] To mention the role of the biliary system in drug elimination
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-9D89A82094F8AA
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S01-M04 is Excretion and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "pulmonary excretion" and "excretion in milk" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-9D89A82094F8AA ("Biliary drug excretion can be followed by intestinal reabsorption and enterohepatic circulation") sits on this exact node and covers the biliary route in more depth than this record does. Related but distinct grain: the live record is about what happens after biliary excretion — the recirculation that prolongs a drug's action — while this one enumerates the exit routes ILO 23 asks for. This record deliberately stops at "the alimentary tract excretes drug in bile" and hands the recirculation to the live record. Updated, not duplicated, in 108-INT-concepts-pharmacology-updates.md.
conflicts: No source disagreement found.
uncertainty: The book's excretion section names lungs, alimentary tract and skin glands; whether saliva is examined separately from sweat is not stated on the ILO sheet.
relationships: mechanism_step_before CON-FND-9D89A82094F8AA on the biliary route, and shares the milk pathway with CON-FND-3CECD012838275. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
First-order elimination removes a constant fraction per unit time; zero-order removes a constant amount, because the enzyme is saturated
## id
CON-FND-BB7BEEC27836BE
## canonical_key
teaching.pharma.kinetics.order
## definition
Most drugs are eliminated by first-order kinetics: the rate is proportional to the concentration, so a constant fraction goes per unit time, half-life is constant, and doubling the dose doubles the steady-state level. When the eliminating enzyme or carrier is saturated the process becomes zero-order: a constant amount goes per unit time whatever the concentration, half-life is no longer fixed, and a small dose increase can produce a large and dangerous rise in plasma level.
## explicit_objective
Compare first-order and zero-order elimination by rate, constancy of half-life and behaviour on dose increase, and recognise which one a described drug is following.
## pitfalls
Saying zero-order elimination is "faster" or "slower". It is neither; it is fixed, and that is what makes it dangerous, because the usual proportional reasoning about dose stops working.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Fundamental Principles of Pharmacokinetics
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Fundamental Principles of Pharmacokinetics > Plasma Half Life
## universities
kau
## learner_years
1
## aliases
First-order kinetics
Zero-order kinetics
Order of elimination
Saturation kinetics
## arabic_label
حركية الإزالة من الرتبة الأولى ومن الرتبة الصفرية
## arabic_aliases
حركية التشبع
## article_ids
ART-108-PHA-KINETIC-PRINCIPLES
## related_article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
CON-FND-955AD7B6FE6F03 | CON-FND-7A66C16BA5029C | CON-FND-01E59D0FD26046
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p2 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p3 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.85
## exam_weight_by_year
KAU_Y1=0.85
## clinical_relevance
0.7
## academic_relevance
0.95
## weight_confidence
0.65
## confidence
0.9
## original_wording
[Orientation ILO 24, SAQ and MCQ ticks] To compare first-order and zero-order kinetics
[EOY 2024 Section 1 Q17, correct option] The plasma half-life is fixed in drugs following first-order elimination.
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-01E59D0FD26046
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: Placed under protest. SYS-FND-T04-S01 (Pharmacokinetics) has microtopics for absorption, distribution, metabolism and excretion only; order of elimination belongs to none of the four and to all of them. The subtopic node is the nearest honest home and no node was invented to fit it.
microtopicId: There is no microtopic for order of elimination; module_subject carries the curriculum position instead.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet and the 2024 paper; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "first order kinetics" and "zero order" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-01E59D0FD26046 (saturable active tubular excretion) is the one live record that touches saturation. Related but distinct grain: it names saturability as the source of a drug interaction at one renal transporter, while this record is about what saturation does to the shape of elimination for the whole drug. Cross-linked, not merged.
conflicts: No source disagreement found.
uncertainty: The book's Fundamental Principles section states the two orders but gives no worked example; whether the department expects a calculation is not stated on the ILO sheet.
relationships: prerequisite_of CON-FND-955AD7B6FE6F03 and CON-FND-7A66C16BA5029C. ILO 24 carries both ticks. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Plasma half-life is the time taken for the plasma concentration to fall by half, and it is fixed only in first-order elimination
## id
CON-FND-955AD7B6FE6F03
## canonical_key
teaching.pharma.halflife.definition
## definition
The plasma half-life, t1/2, is the time in which the plasma concentration of a drug falls to half its value. It follows from the volume of distribution and the clearance together, not from either alone, and it is a constant only while elimination is first-order; once the eliminating enzyme saturates, the half-life lengthens as the concentration rises.
## explicit_objective
Define plasma half-life and state the two kinetic parameters that determine it and the condition under which it stays constant.
## pitfalls
Reading half-life as duration of action. A drug can act long after its plasma level has halved — if the receptor complex is slow to dissociate or the effect is irreversible — and it can stop acting well before.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Fundamental Principles of Pharmacokinetics
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Fundamental Principles of Pharmacokinetics > Plasma Half Life
## universities
kau
## learner_years
1
## aliases
Plasma half life
t1/2
Elimination half-life
Half life of a drug
## arabic_label
عمر النصف البلازمي للدواء
## arabic_aliases
نصف العمر
زمن نصف العمر البلازمي
## article_ids
ART-108-PHA-KINETIC-PRINCIPLES
## related_article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
CON-FND-BB7BEEC27836BE | CON-FND-3D0ACE759233EC | CON-FND-87C323BB0CE321
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p2 | 108 INT
src_bd1595e59d116b78436a | end_of_year_written | 2025 | p9 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p3 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.9
## exam_weight_by_year
KAU_Y1=0.9
## clinical_relevance
0.75
## academic_relevance
0.95
## weight_confidence
0.7
## confidence
0.95
## original_wording
[EOY 2025 Section 2 Q3b, 1 mark] Plasma half life (t1/2)
[EOY 2024 Section 1 Q17, 0.5 marks] Which of the following pharmacokinetic principles applies to plasma half-life:
[Orientation ILO 25, SAQ and MCQ ticks] To define the t1/2
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-87C323BB0CE321 | CON-FND-CBA2A73AE9A6D8
## conflicts
The 2024 paper offers "The plasma half-life is always an indicator of the duration of action of a drug" as a distractor and marks it wrong, so the department teaches that half-life and duration of action are not interchangeable. The book's Plasma Half Life section does not say so explicitly. Both are recorded.
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: Placed under protest. Half-life is a derived parameter of the whole ADME cycle and belongs to no one of the four kinetic microtopics; SYS-FND-T04-S01 is the nearest honest home. No node was invented.
microtopicId: There is no microtopic for half-life; module_subject carries the curriculum position, which is the book's own "Fundamental Principles of Pharmacokinetics > Plasma Half Life".
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from both papers and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "half-life" and "half life" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-87C323BB0CE321 (clearance) and CON-FND-CBA2A73AE9A6D8 (apparent volume of distribution) are the two live records this one is derived from. Related but distinct grain: each defines one parameter, this defines the parameter they jointly produce, and the ILO sheet examines all three separately. Both live records are updated in 108-INT-concepts-pharmacology-updates.md rather than duplicated.
uncertainty: Nothing about the definition is unclear; the half-life against duration-of-action question is recorded on conflicts.
relationships: ILO 25 carries both ticks and the 2025 paper asked it as a 1-mark written definition, which makes this one of the heaviest records in the file. caused_by CON-FND-87C323BB0CE321 and CON-FND-CBA2A73AE9A6D8 together; prerequisite_of CON-FND-3D0ACE759233EC. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Four to five half-lives are needed to reach steady state on repeated dosing, and the same to clear a drug after stopping
## id
CON-FND-3D0ACE759233EC
## canonical_key
teaching.pharma.halflife.applications
## definition
Because a first-order process removes a constant fraction, roughly 50, 75, 87.5 and 94 per cent of the way to the plateau is covered in successive half-lives, so about four to five half-lives bring a repeated-dose regimen to steady state and about the same number clear the drug once it is stopped. The half-life therefore sets the dosing interval, tells you when to expect full effect, and tells you when a drug will have washed out.
## explicit_objective
Use a drug's half-life to predict the time to steady state, the time to washout, and a sensible dosing interval.
## pitfalls
Believing a larger dose reaches steady state sooner. A larger dose reaches a higher steady state at exactly the same time; only a loading dose changes when the target concentration is met.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Fundamental Principles of Pharmacokinetics
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Fundamental Principles of Pharmacokinetics > Plasma Half Life
## universities
kau
## learner_years
1
## aliases
Clinical applications of half-life
Time to steady state
Washout time
Dosing interval from half-life
## arabic_label
التطبيقات الإكلينيكية لعمر النصف البلازمي
## arabic_aliases
زمن الوصول إلى الحالة المستقرة
## article_ids
ART-108-PHA-KINETIC-PRINCIPLES
## related_article_ids
ART-108-PHA-POSOLOGY
## related_concept_ids
CON-FND-955AD7B6FE6F03 | CON-FND-7A66C16BA5029C | CON-FND-3CC86CC26BF549
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p2 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p3 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.8
## exam_weight_by_year
KAU_Y1=0.8
## clinical_relevance
0.85
## academic_relevance
0.9
## weight_confidence
0.6
## confidence
0.9
## original_wording
[Orientation ILO 26, SAQ and MCQ ticks] To explain the clinical applications of the t1/2
[EOY 2024 Section 1 Q17, distractor marked wrong] It takes two half-lives for a drug to attain steady state concentration in plasma.
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-3CC86CC26BF549 | CON-FND-7F59EAD61B05E0
## conflicts
[clear]
## uncertainty
The book states that steady state is reached after several half-lives without fixing the number. The "four to five" here is the standard first-order arithmetic and is what the 2024 paper's distractor implies by rejecting two, but no Kasr source states a figure in words.
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: Placed under protest, for the reason given on CON-FND-955AD7B6FE6F03 — no microtopic covers half-life.
microtopicId: There is no microtopic for half-life or for time to steady state.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet and the 2024 paper; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "steady state" and "dosing interval" — the two live "steady state" hits are the maintenance-dose record and a renal inulin record, neither of which is a corpus candidate for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-3CC86CC26BF549 (Loading dose) and CON-FND-7F59EAD61B05E0 (maintenance dose) are the two live records this one sits between, on this same node. Related but distinct grain: they define the two doses, this explains the time course that makes a loading dose necessary in the first place. ILO 26, ILO 28, ILO 29 and ILO 30 are four separate objectives on the sheet. Both live records are updated in 108-INT-concepts-pharmacology-updates.md rather than duplicated, and no second "Loading dose" is minted here.
conflicts: No source disagreement found; the uncertainty about the exact number of half-lives is recorded on uncertainty, not as a disagreement.
relationships: prerequisite_of CON-FND-3CC86CC26BF549 — the loading dose exists because four to five half-lives is too long to wait. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Steady state is reached when the rate of drug entering the body equals the rate leaving it
## id
CON-FND-7A66C16BA5029C
## canonical_key
teaching.pharma.steadystate.definition
## definition
On repeated dosing or continuous infusion the plasma concentration rises until elimination matches administration; from then on the average concentration stays constant and the drug is at steady state. The level of that plateau is set by the dose rate and the clearance; the time taken to reach it is set by the half-life alone.
## explicit_objective
State the condition that defines steady state, and separate what determines the level of the plateau from what determines the time taken to reach it.
## pitfalls
Confusing the two determinants. Changing the dose moves the plateau up or down; only changing the half-life changes how long the climb takes.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Fundamental Principles of Pharmacokinetics
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Fundamental Principles of Pharmacokinetics > Maintenance dose
## universities
kau
## learner_years
1
## aliases
Steady state plasma concentration
Css
Plateau concentration
Steady-state concentration
## arabic_label
تركيز الدواء في حالة الاستقرار في البلازما
## arabic_aliases
الحالة المستقرة
## article_ids
ART-108-PHA-KINETIC-PRINCIPLES
## related_article_ids
ART-108-PHA-POSOLOGY
## related_concept_ids
CON-FND-7F59EAD61B05E0 | CON-FND-3D0ACE759233EC | CON-FND-87C323BB0CE321
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p2 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p4 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.85
## exam_weight_by_year
KAU_Y1=0.85
## clinical_relevance
0.8
## academic_relevance
0.95
## weight_confidence
0.65
## confidence
0.95
## original_wording
[EOY 2025 Section 1 Q15, 0.5 marks] Which of the following is required for a drug to reach steady-state plasma concentration (Css)?
[EOY 2025 Section 1 Q15, correct option] Equal rates of drug administration and drug elimination
[Orientation ILO 27, SAQ and MCQ ticks] To define steady-state plasma concentration (Css) and explain how it is achieved with repeated drug dosing
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-7F59EAD61B05E0
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: Placed under protest. Steady state belongs to no single kinetic microtopic; SYS-FND-T04-S01 is the nearest honest home, and it is where the two live dose records already sit.
microtopicId: There is no microtopic for steady state.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "steady state" and "Css" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-7F59EAD61B05E0 ("A maintenance dose replaces drug eliminated since the preceding dose to maintain steady state") sits on this exact node and names steady state in its own label. This was the closest call in the file. Decided as related but distinct on grain: the live record defines the dose that holds a steady state, this defines the state itself and what sets its height and its timing. The 2025 paper asked the condition — equal rates in and out — and would not be answered by the maintenance-dose definition, while the 2025 maintenance-dose question (Q17, clearance x Css x interval) would not be answered by this one. ILO 27 and ILO 30 are separate objectives. The live record is updated, not duplicated, in 108-INT-concepts-pharmacology-updates.md.
conflicts: No source disagreement found.
uncertainty: Nothing about the definition is unclear at this level.
relationships: prerequisite_of the live CON-FND-7F59EAD61B05E0, and caused_by CON-FND-3D0ACE759233EC. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Drugs act through receptors, through enzymes, through ion channels and transporters, or by physical and chemical means with no receptor at all
## id
CON-FND-1A18E2FEA47B37
## canonical_key
teaching.pharma.action.mechanisms
## definition
Most drugs act on a receptor, but not all do. A drug may inhibit or activate an enzyme, block or open an ion channel, compete for a transporter, replace a deficient substance, or act by a purely physical or chemical mechanism such as an osmotic laxative or an antacid neutralising gastric acid. Naming the mechanism is what predicts the drug's selectivity and its side-effect profile.
## explicit_objective
Sort a named drug action into receptor-mediated, enzyme-mediated, channel or transporter-mediated, or non-receptor physical or chemical action.
## pitfalls
Assuming everything that produces an effect must bind a receptor. An antacid has no receptor and no selectivity, which is precisely why it behaves as it does.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA-T02 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacodynamics
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacodynamics > Possible Mechanisms of Action of Drugs
## universities
kau
## learner_years
1
## aliases
Mechanisms of drug action
Possible mechanisms of action of drugs
Non-receptor drug action
How drugs work
## arabic_label
الآليات المحتملة لعمل الأدوية
## arabic_aliases
طرق تأثير الدواء
## article_ids
ART-108-PHA-PHARMACODYNAMICS
## related_article_ids
ART-108-PHA-INTRODUCTION
## related_concept_ids
CON-FND-38CD8C0BD5B4DE | CON-FND-42F34977A8DF23 | CON-FND-6BB35F11EBD54B
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p2 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_introduction | 2025 | p2 | 108 INT
## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.5
## academic_relevance
0.85
## weight_confidence
0.45
## confidence
0.85
## original_wording
[Orientation ILO 31, MCQ tick] To mention the possible mechanisms of drug action
[Department book, chapter ILO 1] Explain the different possible mechanisms of action of drugs .
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-CB479ED34E555F
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: SYS-FND-T04-S02 is Pharmacodynamics, and this concept spans all three of its microtopics rather than sitting in one; the subtopic node is the honest placement, not a stretch.
microtopicId: The concept covers receptor and non-receptor mechanisms together, so no single microtopic fits; module_subject carries the book's own position.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet and the book's chapter ILO block; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "mechanism of action" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-CB479ED34E555F ("Ligand-gated channels open when a ligand binds a specific receptor") is a membrane-physiology record on DIS-PHY-T01. Related but distinct grain: it states how one channel type works, this classifies the whole range of drug mechanisms. Cross-linked, not merged.
conflicts: No source disagreement found; the ILO sheet and the book's own chapter ILO 1 say the same thing.
uncertainty: The book lists the mechanisms but does not say which the department expects by name.
relationships: prerequisite_of CON-FND-38CD8C0BD5B4DE and CON-FND-42F34977A8DF23. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
A receptor is the macromolecule a drug binds; affinity is how readily it binds, and it is not the same as producing an effect
## id
CON-FND-38CD8C0BD5B4DE
## canonical_key
teaching.pharma.receptor.affinity
## definition
A receptor is a cellular macromolecule, usually a protein, with which a drug forms a reversible complex that begins a chain of events ending in the drug's effect. Affinity is the tendency of the drug to form that complex and to hold it — the ability to fit onto the receptor. Affinity alone says nothing about whether the complex then does anything.
## explicit_objective
Define a receptor and define affinity, and explain why a drug with high affinity may still produce no effect.
## pitfalls
Using affinity and potency interchangeably. Affinity is about binding; an antagonist can have very high affinity and, by definition, produce no effect at all.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02-M01
## secondary_node_ids
DIS-PHA-T02 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacodynamics
## microtopic
Receptors
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacodynamics > Definition of a receptor
## universities
kau
## learner_years
1
## aliases
Definition of a receptor
Affinity
Drug-receptor complex
Receptor binding
## arabic_label
المستقبل الدوائي والألفة
## arabic_aliases
الألفة الدوائية
معقد الدواء والمستقبل
## article_ids
ART-108-PHA-PHARMACODYNAMICS
## related_article_ids
ART-108-PHA-INTRODUCTION
## related_concept_ids
CON-FND-17149EED384DCA | CON-FND-4388E0D8A75FD4 | CON-FND-42F34977A8DF23
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p2 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p4 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_introduction | 2025 | p2 | 108 INT
## blueprint_weight
0.85
## exam_weight_by_year
KAU_Y1=0.85
## clinical_relevance
0.55
## academic_relevance
0.95
## weight_confidence
0.65
## confidence
0.9
## original_wording
[EOY 2024 Section 1 Q21, 0.5 marks] The ability of a drug to fit onto a receptor to form a drug-receptor complex is termed:
[EOY 2024 Section 1 Q21, correct option] Affinity.
[Orientation ILO 32, SAQ and MCQ ticks] To define a receptor, affinity, efficacy and potency
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-17149EED384DCA | CON-IMM-22ECDF3A61CAA8
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S02-M01 is Receptors and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the 2024 paper and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "receptor" and "affinity" — no pharmacology candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: ILO 32 asks for four definitions — receptor, affinity, efficacy and potency — and is deliberately split into two concepts here, because the 2024 paper tested affinity alone and the 2025 paper tested efficacy alone, in different questions. CON-FND-17149EED384DCA is the sibling record. CON-IMM-22ECDF3A61CAA8 ("Cytokines act through high-affinity cell-surface receptors") is an immunology record on DIS-IMU-T01 that shares the word and nothing else. Neither is merged.
conflicts: No source disagreement found.
uncertainty: Nothing about the definitions is unclear at this level.
relationships: often_confused_with CON-FND-17149EED384DCA — affinity against potency is the pair students mix up, and it is worth more than any loose neighbour link here. prerequisite_of CON-FND-4388E0D8A75FD4. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Potency is the dose needed for an effect; efficacy is the largest effect the drug can produce, and a potent drug may have low efficacy
## id
CON-FND-17149EED384DCA
## canonical_key
teaching.pharma.response.efficacy-vs-potency
## definition
Efficacy is the maximum response a drug can produce however much of it is given — the Emax, the height of the plateau on a concentration-response curve. Potency is the amount needed to produce a given response — the position of the curve along the dose axis, read off as the EC50 or ED50. The two are independent: of two drugs at the same receptor, the more potent may reach a lower maximum.
## explicit_objective
Read efficacy and potency off a concentration-response curve, and decide from two drugs' maximum effects which has the greater efficacy.
## pitfalls
Calling the drug that works "at a smaller dose" the better drug. Potency is a statement about the dose axis only; a low-efficacy drug is still a weaker drug however little of it is needed.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02-M02
## secondary_node_ids
DIS-PHA-T02 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacodynamics
## microtopic
Dose-response
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacodynamics > Concentration-Response Curve of Drugs
108 INT > Pharmacology > Pharmacodynamics > Relation between Drug concentration and Response
## universities
kau
## learner_years
1
## aliases
Efficacy versus potency
Emax
EC50 and ED50
Potency of a drug
## arabic_label
الفاعلية القصوى مقابل الفعالية الجرعية
## arabic_aliases
الكفاءة الدوائية
قوة الدواء
## article_ids
ART-108-PHA-PHARMACODYNAMICS
## related_article_ids
ART-108-PHA-POSOLOGY
## related_concept_ids
CON-FND-38CD8C0BD5B4DE | CON-FND-4388E0D8A75FD4 | CON-FND-138FC0AB7A3461
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p2 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p5 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_introduction | 2025 | p2 | 108 INT
## blueprint_weight
0.85
## exam_weight_by_year
KAU_Y1=0.85
## clinical_relevance
0.6
## academic_relevance
0.95
## weight_confidence
0.65
## confidence
0.9
## original_wording
[EOY 2025 Section 1 Q20, 0.5 marks] Drug A produces a maximum effect of 80%, and Drug B produces a maximum effect of 100% at the same receptor. Which of the following correctly describes this finding?
[EOY 2025 Section 1 Q20, correct option] Drug B has greater efficacy than Drug A
[Orientation ILO 32, SAQ and MCQ ticks] To define a receptor, affinity, efficacy and potency
[Orientation ILO 33, MCQ tick] To determine the type of drug-receptor relation for a dose-response or a concentration- response curve
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-38CD8C0BD5B4DE | CON-IMM-6D6491C2ECF12D
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S02-M02 is Dose-response and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "potency", "efficacy" and "Emax" — no pharmacology candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-38CD8C0BD5B4DE is the sibling half of ILO 32, deliberately split for the reason given on that record. CON-IMM-6D6491C2ECF12D ("Cytokines are highly potent and often act at very low concentrations") is an immunology record that uses "potent" descriptively and defines nothing. Neither is merged. ILO 33, reading the curve, is folded into this record rather than given its own: the curve is where efficacy and potency are read from, and a question cannot test one without the other.
conflicts: No source disagreement found.
uncertainty: Nothing about the definitions is unclear at this level.
relationships: often_confused_with CON-FND-38CD8C0BD5B4DE, and prerequisite_of CON-FND-138FC0AB7A3461 — the competitive against non-competitive antagonism question is answered by knowing which of potency and efficacy each one moves. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
A ligand may be a full agonist, a partial agonist, an inverse agonist or an antagonist, according to what its binding does to the receptor
## id
CON-FND-4388E0D8A75FD4
## canonical_key
teaching.pharma.ligands.types
## definition
A full agonist binds and produces the maximum response the receptor can give. A partial agonist binds with affinity but produces a submaximal response however much is given, and in the presence of a full agonist it acts as an antagonist. An inverse agonist binds and produces the opposite of the agonist's effect by reducing the receptor's constitutive activity. An antagonist binds with affinity, has no efficacy of its own, and acts only by preventing an agonist from binding.
## explicit_objective
Classify a ligand from its affinity and its efficacy, and explain why a partial agonist behaves as an antagonist when a full agonist is present.
## pitfalls
Treating an antagonist as a drug with a negative effect. An antagonist alone at a quiet receptor does nothing at all; what looks like an effect is the removal of the agonist tone that was already there.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02-M01
## secondary_node_ids
DIS-PHA-T02 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacodynamics
## microtopic
Receptors
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacodynamics > Types of Ligands
## universities
kau
## learner_years
1
## aliases
Types of ligands
Full agonist
Partial agonist
Inverse agonist
Agonist and antagonist
## arabic_label
أنواع الروابط الدوائية للمستقبلات
## arabic_aliases
الناهض الكامل والناهض الجزئي
الناهض العكسي
## article_ids
ART-108-PHA-PHARMACODYNAMICS
## related_article_ids
ART-108-PHA-DRUG-INTERACTIONS
## related_concept_ids
CON-FND-38CD8C0BD5B4DE | CON-FND-17149EED384DCA | CON-FND-138FC0AB7A3461
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p2 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p5 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_introduction | 2025 | p2 | 108 INT
## blueprint_weight
0.8
## exam_weight_by_year
KAU_Y1=0.8
## clinical_relevance
0.6
## academic_relevance
0.95
## weight_confidence
0.6
## confidence
0.9
## original_wording
[Orientation ILO 34, SAQ and MCQ ticks] To explain the differences between various types of receptor ligands
[EOY 2025 Section 1 Q20, distractor] Drug A is a full agonist and Drug B is a partial agonist
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-IMM-CAAF2B9624F2B5
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S02-M01 is Receptors and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet and the 2025 paper; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "agonist", "partial agonist" and "ligand" — the only live matches are immunology and membrane-physiology records, and none is a corpus candidate for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: A search of all 1,718 live concepts for "agonist" and for "antagonist" returns exactly one record, CON-IMM-CAAF2B9624F2B5 ("Cytokines can act synergistically or antagonistically"), which is an immunology statement about cytokine interaction and not about receptor ligands. Unrelated in substance despite the shared word; recorded so the next author does not re-run the search.
conflicts: No source disagreement found.
uncertainty: The book's Types of Ligands section is one of the OCR-clean headings, but whether the department expects inverse agonism by name is not stated on the ILO sheet.
relationships: is_a hierarchy under CON-FND-38CD8C0BD5B4DE, and prerequisite_of CON-FND-138FC0AB7A3461. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
A competitive antagonist shifts the agonist curve right and is surmountable; a non-competitive antagonist lowers Emax and is not
## id
CON-FND-138FC0AB7A3461
## canonical_key
teaching.pharma.antagonism.competitive-vs-noncompetitive
## definition
A competitive antagonist binds the same site as the agonist, so enough agonist displaces it: the concentration-response curve shifts to the right in parallel, potency falls, and the maximum response is eventually still reached. A non-competitive antagonist binds elsewhere or binds irreversibly, so agonist cannot displace it: the curve flattens, the maximum response falls, and no amount of agonist restores it.
## explicit_objective
Distinguish competitive from non-competitive antagonism from the shape of the shifted concentration-response curve, and say for each whether excess agonist can overcome it.
## pitfalls
Remembering "shifts the curve right" without remembering which one. The parallel rightward shift with an unchanged maximum belongs to the competitive antagonist; the fall in Emax belongs to the non-competitive one.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02-M02
## secondary_node_ids
DIS-PHA-T02 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacodynamics
## microtopic
Dose-response
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacodynamics > Types of Antagonists > Competitive antagonists
108 INT > Pharmacology > Pharmacodynamics > Types of Antagonists > Non-competitive antagonists
## universities
kau
## learner_years
1
## aliases
Competitive antagonism
Non-competitive antagonism
Surmountable antagonism
Types of drug antagonism
## arabic_label
التضاد التنافسي وغير التنافسي
## arabic_aliases
المضاد التنافسي
المضاد غير التنافسي
## article_ids
ART-108-PHA-PHARMACODYNAMICS
## related_article_ids
ART-108-PHA-DRUG-INTERACTIONS
## related_concept_ids
CON-FND-390F2D9EC3D6DC | CON-FND-4388E0D8A75FD4 | CON-FND-17149EED384DCA
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p2 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p5 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p4 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_introduction | 2025 | p2 | 108 INT
## blueprint_weight
0.9
## exam_weight_by_year
KAU_Y1=0.9
## clinical_relevance
0.6
## academic_relevance
0.95
## weight_confidence
0.75
## confidence
0.95
## original_wording
[EOY 2025 Section 1 Q19, 0.5 marks] In a dose-response experiment, how can a non-competitive antagonist be distinguished from a competitive antagonist?
[EOY 2025 Section 1 Q19, correct option] A decrease in the Emax of the agonist occurs only with the non- competitive antagonist
[EOY 2024 Section 1 Q20, 0.5 marks] Which of the following characterizes a competitive antagonist:
[EOY 2024 Section 1 Q20, correct option] It can be displaced by an excess of the agonist.
[Orientation ILO 35, SAQ and MCQ ticks] To compare different types of drug antagonism
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-A1E2092A49359C
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S02-M02 is Dose-response and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from both papers and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "competitive antagonist" and "antagonism" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-A1E2092A49359C is the chemical-and-physiological-antagonism record in this batch. Related but distinct grain: that one is about antagonism that does not involve the same receptor at all, and the ILO sheet separates them — ILO 35 (compare types of antagonism) carries both ticks while ILO 48 (chemical and physiological antagonism) carries the SAQ tick alone and sits in the drug-interactions section. Cross-linked, not merged.
conflicts: No source disagreement found; the 2024 and 2025 answers are consistent with each other.
uncertainty: Nothing about the distinction is unclear at this level.
relationships: This is the single most heavily examined pharmacodynamics point in the module — ILO 35 carries both ticks and both sittings asked it, from opposite sides. contrasts_with itself internally; prerequisite_of CON-FND-390F2D9EC3D6DC. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
An irreversible antagonist binds covalently, so its block lifts only when the cell makes new receptors
## id
CON-FND-390F2D9EC3D6DC
## canonical_key
teaching.pharma.antagonism.irreversible
## definition
A reversible non-competitive antagonist dissociates from its site, so the block wears off as the drug is cleared. An irreversible antagonist forms a covalent bond, so clearing the drug from plasma does not restore the receptor: the effect lasts until the cell synthesises replacements, which can be days. Neither can be overcome by adding more agonist.
## explicit_objective
Explain why the duration of an irreversible antagonist's effect is set by receptor turnover rather than by its plasma half-life.
## pitfalls
Predicting the duration of effect from the half-life. For an irreversible antagonist the plasma level can be zero while the block is complete.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02-M02
## secondary_node_ids
DIS-PHA-T02 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacodynamics
## microtopic
Dose-response
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacodynamics > Types of Antagonists > Non-competitive antagonists
## universities
kau
## learner_years
1
## aliases
Irreversible antagonist
Covalent receptor block
Non-equilibrium antagonism
Reversible versus irreversible antagonism
## arabic_label
المضاد غير العكوس
## arabic_aliases
الحصار التساهمي للمستقبل
## article_ids
ART-108-PHA-PHARMACODYNAMICS
## related_article_ids
ART-108-PHA-KINETIC-PRINCIPLES
## related_concept_ids
CON-FND-138FC0AB7A3461 | CON-FND-955AD7B6FE6F03 | CON-FND-42F34977A8DF23
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p2 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p6 | 108 INT
## blueprint_weight
0.8
## exam_weight_by_year
KAU_Y1=0.8
## clinical_relevance
0.55
## academic_relevance
0.9
## weight_confidence
0.6
## confidence
0.9
## original_wording
[EOY 2025 Section 1 Q21, 0.5 marks] An IRREVERSIBLE non-competitive antagonist differs from a reversible one in that:
[EOY 2025 Section 1 Q21, correct option] It binds covalently, and its block ends only with new receptor synthesis
[Orientation ILO 35, SAQ and MCQ ticks] To compare different types of drug antagonism
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-138FC0AB7A3461
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S02-M02 is Dose-response and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the 2025 paper; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "irreversible antagonist" and "covalent" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-138FC0AB7A3461 is the competitive-against-non-competitive record in this batch, and both draw on ILO 35. Related but distinct grain: that one is read off the curve, this one is read off the time course, and the 2025 paper asked them as two separate questions, Q19 and Q21, in the same sitting. That the department examined both in one paper is the strongest available evidence that they are two objectives. Cross-linked, not merged.
conflicts: No source disagreement found.
uncertainty: Nothing about the mechanism is unclear at this level.
relationships: is_a specialisation of CON-FND-138FC0AB7A3461, and often_confused_with CON-FND-955AD7B6FE6F03 — students predict this drug's duration from its half-life, which is exactly the trap. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
The four receptor types transduce signals on four different timescales, from milliseconds at an ion channel to hours at a nuclear receptor
## id
CON-FND-42F34977A8DF23
## canonical_key
teaching.pharma.receptor.transduction-types
## definition
Ligand-gated ion channels open a pore directly and act in milliseconds. G-protein-coupled receptors act through a G protein and a second messenger in seconds. Enzyme-linked receptors, such as tyrosine kinases, phosphorylate intracellular targets over minutes to hours. Intracellular nuclear receptors bind a lipid-soluble ligand and alter gene transcription, so their effect appears over hours to days and outlasts the drug.
## explicit_objective
Name the four receptor types, describe how each transduces its signal, and give the timescale of the response each produces.
## pitfalls
Predicting onset from the route of administration. A steroid given intravenously still acts through gene transcription, so the effect is hours away whatever the route.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02-M01
## secondary_node_ids
DIS-PHA-T02 | DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacodynamics
## microtopic
Receptors
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Pharmacodynamics > Types of receptors and signal transduction mechanism
## universities
kau
## learner_years
1
## aliases
Types of receptors and signal transduction
Four receptor superfamilies
G-protein coupled receptor
Ligand-gated ion channel
Nuclear receptor
## arabic_label
أنواع المستقبلات وآليات نقل الإشارة
## arabic_aliases
المستقبلات المرتبطة ببروتين جي
المستقبلات النووية
## article_ids
ART-108-PHA-PHARMACODYNAMICS
## related_article_ids
ART-108-PHA-INTRODUCTION
## related_concept_ids
CON-FND-38CD8C0BD5B4DE | CON-FND-1A18E2FEA47B37 | CON-FND-A1FC8CB691E6C5
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p2 | 108 INT
src_bd1595e59d116b78436a | end_of_year_written | 2025 | p10 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year_written | 2024 | p7 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_introduction | 2025 | p2 | 108 INT
## blueprint_weight
0.95
## exam_weight_by_year
KAU_Y1=0.95
## clinical_relevance
0.55
## academic_relevance
1
## weight_confidence
0.8
## confidence
0.9
## original_wording
[EOY 2025 Section 2 Q4, 4 marks] Mention the FOUR (4) types of receptors and briefly describe how each type transduces signals (4 marks)
[EOY 2024 Section 2 QIV1, 4 marks] The 4 types of drug receptors and briefly describe how each type transduces signals.
[Orientation ILO 36, SAQ and MCQ ticks] To describe different types of receptors and signal transduction mechanisms
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-CB479ED34E555F
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S02-M01 is Receptors and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from both papers and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "signal transduction" and "G protein" — no pharmacology candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-CB479ED34E555F ("Ligand-gated channels open when a ligand binds a specific receptor") is a membrane-physiology record on DIS-PHY-T01 covering one of the four types. Related but distinct grain: it states how one family works as physiology, this is the four-way classification the department asks for as a 4-mark written answer. Cross-linked, not merged.
conflicts: No source disagreement found; both papers use the same wording, "briefly describe how each type transduces signals".
uncertainty: The timescales given here are the standard ones and are not stated in the Kasr sources, which name the four types without timing them; they are taught as an organising device rather than as an examined figure.
relationships: The heaviest record in the file. ILO 36 carries both ticks and the identical 4-mark written question appeared in both the 2024 and the 2025 sittings — the strongest blueprint evidence this corpus holds, since repetition across sittings is what weight_confidence 0.8 rests on. prerequisite_of CON-FND-A1FC8CB691E6C5 (receptor down-regulation). Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Adverse drug reactions are classified A to E: augmented, bizarre, chronic, delayed and end-of-use
## id
CON-FND-D957928472CA57
## canonical_key
teaching.pharma.adr.classification
## definition
An adverse drug reaction is a harmful and unintended response to a drug at doses used for therapy. Type A is an augmented, predictable extension of the drug's known action; Type B is bizarre and unpredictable; Type C follows chronic use; Type D appears after a delay; Type E follows the end of use. The letter carries the prediction: it says whether the reaction is dose-related, whether it was foreseeable, and when to expect it.
## explicit_objective
Assign a described adverse reaction to type A, B, C, D or E, and justify the assignment from dose-dependence, predictability and timing.
## pitfalls
Classifying by how serious the reaction is. Severity has nothing to do with the letter; a fatal Type A reaction is still Type A.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S03-M01
## secondary_node_ids
DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Adverse Drug Reactions
## microtopic
Adverse reactions
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Adverse Drug Reactions
## universities
kau
## learner_years
1
## aliases
Classification of adverse drug reactions
ADR
Types A to E adverse reactions
Adverse drug reaction
## arabic_label
تصنيف التفاعلات الدوائية الضارة
## arabic_aliases
الآثار الجانبية للأدوية
## article_ids
ART-108-PHA-ADVERSE-DRUG-REACTIONS
## related_article_ids
ART-108-PHA-POSOLOGY
## related_concept_ids
CON-FND-062BA29B028382 | CON-FND-7FFD028F1C7B58 | CON-FND-2A5DE8657047E4
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p2 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.75
## exam_weight_by_year
KAU_Y1=0.75
## clinical_relevance
0.85
## academic_relevance
0.9
## weight_confidence
0.5
## confidence
0.9
## original_wording
[Orientation ILO 38, SAQ and MCQ ticks] To define adverse drug reactions (define each type and subtype)
[Orientation ILO 39, MCQ tick] To classify adverse drug reactions
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S03-M01 is Adverse reactions and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet and the book's five Type headings; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "adverse drug reaction" and "ADR" — the three live "adverse" hits are drug-specific toxicity records in gi, renal and infection, not classifications, and none is a corpus candidate for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live state for "adverse" and "side effect" across all 1,718 concepts unfiltered. Every hit names the adverse effects of one named drug or class; none classifies reactions. No merge was proposed or rejected.
conflicts: No source disagreement found; the book's five headings and ILO 39 agree.
uncertainty: Four of the book's five Type headings were flagged ocrUncertain in extraction, including "lll) Type © (Chronic effects)". The letters and their meanings are legible from the ILO sheet and from the book's structure, so the classification is safe, but no wording from those headings is quoted.
relationships: Neither ILO 38 nor ILO 39 appeared on either paper read, which is why weight_confidence is 0.5 despite the double tick — the tick pattern says this is examined and two sittings have not yet shown it. prerequisite_of CON-FND-062BA29B028382 and the other ADR records. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Type A reactions are dose-dependent extensions of the drug's action; Type B reactions are not dose-dependent and not predictable from it
## id
CON-FND-062BA29B028382
## canonical_key
teaching.pharma.adr.type-a-vs-type-b
## definition
A Type A reaction is the drug doing more of what it does — bleeding on an anticoagulant, hypoglycaemia on insulin. It is common, dose-related, predictable from the mechanism, and managed by reducing the dose. A Type B reaction bears no relation to the known pharmacology, occurs in a susceptible minority, is not dose-related, is often severe, and is managed by stopping the drug and never giving it again.
## explicit_objective
Separate Type A from Type B from a clinical description, and state the different management each implies.
## pitfalls
Reducing the dose after a Type B reaction. A bizarre reaction is not dose-related, so a smaller dose is not a safer dose; the drug is withdrawn.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S03-M01
## secondary_node_ids
DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Adverse Drug Reactions
## microtopic
Adverse reactions
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Adverse Drug Reactions > Type A (Augmented or predictable undesirable adverse effects)
108 INT > Pharmacology > Adverse Drug Reactions > Type B (Bizarre or unpredictable adverse effects)
## universities
kau
## learner_years
1
## aliases
Type A adverse reaction
Type B adverse reaction
Augmented adverse reaction
Bizarre adverse reaction
## arabic_label
التفاعلات الضارة من النوع أ والنوع ب
## arabic_aliases
التفاعلات المتوقعة وغير المتوقعة
## article_ids
ART-108-PHA-ADVERSE-DRUG-REACTIONS
## related_article_ids
ART-108-PHA-POSOLOGY
## related_concept_ids
CON-FND-D957928472CA57 | CON-FND-7FFD028F1C7B58 | CON-FND-BB0DBAE1BC802B
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p2 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.9
## academic_relevance
0.85
## weight_confidence
0.45
## confidence
0.9
## original_wording
[Orientation ILO 41, MCQ tick] To determine the type of an adverse drug reaction by knowing its clinical description and its circumstances
[Orientation ILO 42, MCQ tick] To mention important precautions with different types of adverse drug reactions
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-D957928472CA57
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S03-M01 is Adverse reactions and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "type A reaction" and "predictable adverse" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-D957928472CA57 is the five-way classification in this batch. Related but distinct grain: that one names the letters, this one applies the A-against-B distinction to a clinical description and to management, which is what ILO 41 and ILO 42 ask and the classification alone does not answer. Cross-linked, not merged.
conflicts: No source disagreement found.
uncertainty: The examples used here — anticoagulant bleeding, insulin hypoglycaemia — are generic and are not taken from the Kasr book, whose Type A section was OCR-flagged; no drug name or dose is quoted from it.
relationships: is_a specialisation of CON-FND-D957928472CA57 and often_confused_with CON-FND-7FFD028F1C7B58, because idiosyncrasy is the Type B subtype students misassign. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Allergy is immune-mediated, idiosyncrasy is genetically determined, and super-sensitivity is an exaggerated normal response to a small dose
## id
CON-FND-7FFD028F1C7B58
## canonical_key
teaching.pharma.adr.allergy-vs-idiosyncrasy
## definition
Drug allergy is an immune response to the drug or a metabolite, so it needs prior sensitisation and is unrelated to dose. Idiosyncrasy is a qualitatively abnormal response arising from a genetic difference in an enzyme or a receptor, present on first exposure and needing no immune mechanism. Super-sensitivity is quantitatively abnormal rather than qualitative: the normal action of the drug, exaggerated, after a small therapeutic dose.
## explicit_objective
Distinguish allergy, idiosyncrasy and super-sensitivity by mechanism, by whether prior exposure is needed and by whether the response is qualitatively normal.
## pitfalls
Calling any unexpected reaction an allergy. Allergy requires an immune mechanism and prior sensitisation; a first-dose abnormal response in an otherwise well patient points to idiosyncrasy.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S03-M01
## secondary_node_ids
DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Adverse Drug Reactions
## microtopic
Adverse reactions
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Adverse Drug Reactions > Type B (Bizarre or unpredictable adverse effects)
## universities
kau
## learner_years
1
## aliases
Drug allergy
Idiosyncrasy
Super-sensitivity
Drug hypersensitivity
Allergy versus idiosyncrasy
## arabic_label
الحساسية الدوائية والتفارد الدوائي وفرط الحساسية
## arabic_aliases
التحسس من الدواء
التفارد الجيني للدواء
## article_ids
ART-108-PHA-ADVERSE-DRUG-REACTIONS
## related_article_ids
ART-108-PHA-INTRODUCTION
## related_concept_ids
CON-FND-062BA29B028382 | CON-FND-D957928472CA57 | CON-FND-A1FC8CB691E6C5
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p2 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p6 | 108 INT
src_bd1595e59d116b78436a | end_of_year_written | 2025 | p9 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p4 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.85
## exam_weight_by_year
KAU_Y1=0.85
## clinical_relevance
0.9
## academic_relevance
0.9
## weight_confidence
0.75
## confidence
0.9
## original_wording
[EOY 2025 Section 1 Q24, 0.5 marks] Which of the following correctly distinguishes drug allergy from idiosyncrasy?
[EOY 2025 Section 1 Q24, correct option] Allergy is immune-mediated; idiosyncrasy is genetically determined.
[EOY 2024 Section 1 Q22, 0.5 marks] Exaggerated normal action in response to a small therapeutic dose of the drug is termed
[EOY 2024 Section 1 Q22, correct option] Super-sensitivity
[EOY 2024 Section 1 Q24, correct option] Idiosyncrasy
[EOY 2025 Section 2 Q3c, 1 mark] Super-sensitivity
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-IMM-973D9385C05300 | CON-INF-FE6406B2181967
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S03-M01 is Adverse reactions and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from both papers and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "idiosyncrasy" and "drug allergy" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-IMM-973D9385C05300 ("Allergy is an inappropriate immune response to harmless antigens") is the immunology definition on DIS-IMU-T02, and CON-INF-FE6406B2181967 ("Antimicrobial hypersensitivity is usually not dose-dependent") is a third-year microbiology record on DIS-MIC-T01 that states the dose-independence this concept also states. Both are related but distinct in grain: the first defines allergy in general immunology, the second states one property for one drug class, and this one is the three-way discrimination the department examined four separate times across two sittings. The microbiology record is the closest of the two and is cross-linked rather than merged, because a first-year pharmacology question on idiosyncrasy would not be answered by it.
conflicts: No source disagreement found; the 2024 and 2025 answers are mutually consistent.
uncertainty: Nothing about the three definitions is unclear at this level.
relationships: This record carries the highest weight_confidence in the ADR group because the point was examined four times across the two sittings read — Q24 and a written definition in 2025, Q22 and Q24 in 2024 — even though ILO 40 and ILO 41 carry only the MCQ tick. That is a case where the papers outweigh the tick pattern, and the weight reflects the papers. often_confused_with CON-FND-062BA29B028382. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Type C, D and E reactions declare themselves late: chronic use, delayed teratogenic or carcinogenic effects, and withdrawal on stopping
## id
CON-FND-2A5DE8657047E4
## canonical_key
teaching.pharma.adr.chronic-delayed-withdrawal
## definition
Type C reactions need continued exposure and appear during chronic use. Type D reactions appear long after the exposure that caused them and include teratogenicity — a structural defect produced in the developing fetus — carcinogenicity and mutagenicity, a heritable change in the genetic material. Type E reactions follow withdrawal of a drug the body has adapted to, and are prevented by tapering rather than by stopping.
## explicit_objective
Recognise a chronic, a delayed and an end-of-use adverse reaction from its timing relative to the drug, and define teratogenicity and mutagenicity.
## pitfalls
Using teratogenicity and mutagenicity as synonyms. Teratogenicity is a malformation in the exposed fetus; mutagenicity is a change in the genetic material that can be passed on.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S03-M01
## secondary_node_ids
DIS-PHA-T08 | SYS-FND-T04-S03-M03 | DIS-PHA
## topic
General pharmacology
## subtopic
Adverse Drug Reactions
## microtopic
Adverse reactions
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Adverse Drug Reactions > Type C (Chronic effects)
108 INT > Pharmacology > Adverse Drug Reactions > Type D (Delayed effects)
108 INT > Pharmacology > Adverse Drug Reactions > Type E (End of Use Effect)
## universities
kau
## learner_years
1
## aliases
Type C adverse reaction
Type D adverse reaction
Type E adverse reaction
Teratogenicity
Mutagenicity
Withdrawal reaction
## arabic_label
التفاعلات الضارة المزمنة والمتأخرة وتفاعلات التوقف
## arabic_aliases
المسخية الدوائية
الطفرية الدوائية
## article_ids
ART-108-PHA-ADVERSE-DRUG-REACTIONS
## related_article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
CON-FND-D957928472CA57 | CON-FND-57E821D46F016D | CON-FND-3CECD012838275
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p2 | 108 INT
src_bd1595e59d116b78436a | end_of_year_written | 2025 | p9 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p4 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.85
## academic_relevance
0.85
## weight_confidence
0.6
## confidence
0.9
## original_wording
[EOY 2025 Section 2 Q3d, 1 mark] Mutagenicity
[EOY 2024 Section 1 Q24, distractors] Mutagenicity
[EOY 2024 Section 1 Q24, distractors] Teratogenicity
[Orientation ILO 40, MCQ tick] To define different types of adverse drug reactions
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-DEV-3C7BA246934ACE
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S03-M01 is Adverse reactions and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from both papers and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "teratogenicity" and "withdrawal" — the one live teratogen hit is an embryology record about cytomegalovirus and is not a corpus candidate for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-DEV-3C7BA246934ACE ("Cytomegalovirus as teratogen") is an embryology record on DIS-EMB-T04. Related but distinct grain: it names one infectious teratogen, this defines teratogenicity as a class of drug adverse reaction. Cross-linked, not merged.
conflicts: No source disagreement found.
uncertainty: Three of the five Type headings in the book were OCR-flagged, and Type C in particular extracted as "lll) Type © (Chronic effects)". The letters are recoverable from the ILO sheet, so the classification stands, but nothing is quoted from those headings.
relationships: The secondary placement SYS-FND-T04-S03-M03 (Special populations) is genuine — teratogenicity is the reason pregnancy prescribing is a separate skill. mechanism_step_before CON-FND-57E821D46F016D, because a Type E withdrawal reaction is what physical dependence produces. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Acquired tolerance is pharmacokinetic when the body clears the drug faster and pharmacodynamic when the receptor stops responding
## id
CON-FND-A1FC8CB691E6C5
## canonical_key
teaching.pharma.tolerance.mechanisms
## definition
Tolerance is the need for a larger dose to produce the effect an earlier dose produced. It is pharmacokinetic when the drug induces the enzymes that metabolise it, so less reaches the receptor. It is pharmacodynamic when the receptor itself adapts — chronic agonist exposure reduces receptor number and sensitivity, down-regulation, while chronic antagonist exposure increases them, up-regulation, which is why an abruptly withdrawn antagonist can produce rebound.
## explicit_objective
Assign a described mechanism of tolerance to the pharmacokinetic or the pharmacodynamic route, and predict the effect of chronic agonist or antagonist exposure on receptor number.
## pitfalls
Explaining every case of tolerance by enzyme induction. If the drug is not metabolised by an inducible enzyme, the adaptation is at the receptor, and only the pharmacodynamic account works.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA-T02 | DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Adverse Drug Reactions
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Adverse Drug Reactions > Type C (Chronic effects)
## universities
kau
## learner_years
1
## aliases
Drug tolerance
Acquired tolerance
Receptor down-regulation
Up-regulation
Tachyphylaxis
## arabic_label
التحمل الدوائي المكتسب
## arabic_aliases
تحمل الدواء
تنظيم المستقبلات بالخفض
## article_ids
ART-108-PHA-ADVERSE-DRUG-REACTIONS
## related_article_ids
ART-108-PHA-PHARMACODYNAMICS
## related_concept_ids
CON-FND-42F34977A8DF23 | CON-FND-450B67836EBF1A | CON-FND-57E821D46F016D
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p2 | 108 INT
src_bd1595e59d116b78436a | end_of_year | 2025 | p6 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.65
## exam_weight_by_year
KAU_Y1=0.65
## clinical_relevance
0.8
## academic_relevance
0.9
## weight_confidence
0.6
## confidence
0.9
## original_wording
[EOY 2025 Section 1 Q23, 0.5 marks] Which of the following is a PHARMACODYNAMIC mechanism of acquired drug tolerance
[EOY 2025 Section 1 Q23, correct option] Down-regulation of receptors following prolonged agonist administration
[Orientation ILO 43, MCQ tick] To describe the mechanisms underlying acquired drug tolerance (pharmacokinetic and pharmacodynamic mechanisms)
[Orientation ILO 37, MCQ tick] To explain the effect of chronic use of agonists and antagonists on receptor number and sensitivity (down-regulation and up-regulation)
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-450B67836EBF1A
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: Placed under protest. Tolerance has no microtopic anywhere in SYS-FND-T04; the mechanism the department actually examined in 2025 is receptor adaptation, so the Pharmacodynamics subtopic node is the nearest honest home and DIS-PHA-T01 is carried as a secondary for the kinetic half. No node was invented.
microtopicId: There is no microtopic for tolerance; module_subject carries the book's own position, under Type C chronic effects.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the 2025 paper and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "tolerance" and "down-regulation" — the three live "tolerance" hits are immunological graft tolerance and glucose tolerance, and none is a corpus candidate for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-450B67836EBF1A is the enzyme induction record in this batch, which is the pharmacokinetic mechanism named here. Related but distinct grain: induction is a fact about metabolism that also causes interactions, while tolerance is the clinical phenomenon it partly explains — and the 2025 question turned on the pharmacodynamic half, which induction cannot answer. ILO 17 and ILO 43 are separate objectives. Cross-linked, not merged. ILO 37 (receptor up- and down-regulation) is folded into this record rather than given its own, because the 2025 paper tested the two together in one stem.
conflicts: No source disagreement found.
uncertainty: Whether the department distinguishes tachyphylaxis from acquired tolerance is not stated on the ILO sheet, so the alias is offered without a separate teaching point.
relationships: caused_by CON-FND-42F34977A8DF23 on the pharmacodynamic side and by CON-FND-450B67836EBF1A on the kinetic side; prerequisite_of CON-FND-57E821D46F016D. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Habituation is psychic dependence, physical dependence shows itself on withdrawal, and addiction is both plus compulsive drug-seeking
## id
CON-FND-57E821D46F016D
## canonical_key
teaching.pharma.dependence.subtypes
## definition
Habituation, or psychic dependence, is a desire to continue taking a drug for the sense of well-being it gives, with no physical withdrawal syndrome if it stops. Physical dependence is an adapted state in which stopping the drug produces a characteristic withdrawal syndrome, so the drug must be tapered. Addiction is the compulsive state combining both, with drug-seeking behaviour that overrides the harm being done.
## explicit_objective
Distinguish habituation, physical dependence and addiction from a clinical description, and say which of them requires a taper.
## pitfalls
Treating physical dependence as addiction. A patient on long-term opioids for pain may be physically dependent and not addicted at all; what marks addiction is the compulsive behaviour, not the withdrawal syndrome.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA-T08 | DIS-PHA-T02 | DIS-PHA
## topic
General pharmacology
## subtopic
Adverse Drug Reactions
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Adverse Drug Reactions > Type C (Chronic effects)
## universities
kau
## learner_years
1
## aliases
Drug dependence
Habituation
Psychic dependence
Physical dependence
Addiction
## arabic_label
أنواع الاعتماد على الأدوية
## arabic_aliases
الاعتماد النفسي
الاعتماد الجسدي
الإدمان
## article_ids
ART-108-PHA-ADVERSE-DRUG-REACTIONS
## related_article_ids
ART-108-PHA-POSOLOGY
## related_concept_ids
CON-FND-A1FC8CB691E6C5 | CON-FND-2A5DE8657047E4 | CON-FND-D957928472CA57
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_and_mcq | 2026 | p2 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.85
## academic_relevance
0.85
## weight_confidence
0.5
## confidence
0.9
## original_wording
[Orientation ILO 44, SAQ and MCQ ticks] To differentiate between the subtypes of drug dependence: habituation (psychic dependence), physical dependence, and addiction
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: Placed under protest. Dependence has no microtopic in SYS-FND-T04; it is placed beside tolerance on the Pharmacodynamics subtopic node because the adaptation that produces it is a receptor adaptation, with DIS-PHA-T08 carried as the prescribing-and-pharmacovigilance secondary. No node was invented.
microtopicId: There is no microtopic for drug dependence; module_subject carries the book's own position.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "dependence" and "addiction" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live state for "dependence", "addiction" and "habituation" across all 1,718 concepts unfiltered. The only hits are on the word "dependent" in unrelated physiology records. No merge was proposed or rejected.
conflicts: No source disagreement found.
uncertainty: The opioid example used in the pitfall is generic and is not taken from the Kasr book; no drug name is quoted from it.
relationships: ILO 44 carries both ticks and neither sitting read has asked it, so weight_confidence is 0.5 — the tick pattern says this is due and the papers have not yet shown it. caused_by CON-FND-A1FC8CB691E6C5 and causes CON-FND-2A5DE8657047E4 on the withdrawal side. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Drug interactions are pharmaceutical before administration, pharmacokinetic through ADME, or pharmacodynamic at the site of action
## id
CON-FND-7F618A3D1F940B
## canonical_key
teaching.pharma.interactions.mechanisms
## definition
A pharmaceutical interaction happens outside the patient, when two drugs are mixed in a syringe or an infusion and react chemically or precipitate. A pharmacokinetic interaction happens when one drug changes another's absorption, distribution, metabolism or excretion, so the plasma level moves. A pharmacodynamic interaction happens when both drugs act on the same system, so the effect moves without the plasma level changing at all.
## explicit_objective
Assign a described drug interaction to the pharmaceutical, pharmacokinetic or pharmacodynamic mechanism, and say whether the plasma concentration of the affected drug would change.
## pitfalls
Reaching for enzyme induction to explain every interaction. If the plasma level is unchanged and the effect has still moved, the interaction is pharmacodynamic and no kinetic explanation will fit.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S03-M02
## secondary_node_ids
DIS-PHA-T08 | DIS-PHA-T01 | DIS-PHA
## topic
General pharmacology
## subtopic
Drug Interactions
## microtopic
Interactions
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Drug Interactions > Pharmaceutical drug interactions
108 INT > Pharmacology > Drug Interactions > Pharmacokinetic drug interactions
108 INT > Pharmacology > Drug Interactions > Pharmacodynamic drug interactions
## universities
kau
## learner_years
1
## aliases
Mechanisms of drug interaction
Pharmaceutical interaction
Pharmacokinetic interaction
Pharmacodynamic interaction
Drug-drug interaction
## arabic_label
آليات التداخلات الدوائية
## arabic_aliases
التداخل الدوائي الحركي
التداخل الدوائي الديناميكي
## article_ids
ART-108-PHA-DRUG-INTERACTIONS
## related_article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
CON-FND-CE72B2E63A736B | CON-FND-450B67836EBF1A | CON-FND-53FF18E42BC94B
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p2 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.9
## academic_relevance
0.85
## weight_confidence
0.45
## confidence
0.9
## original_wording
[Orientation ILO 45, MCQ tick] To describe the different mechanisms of drug interactions
[Orientation ILO 46, MCQ tick] To explain the consequences of some drug interactions by knowing their description
[Department book, chapter ILO 10] Describe the various mechanisms of drug-drug interactions
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-01E59D0FD26046
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S03-M02 is Interactions and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet and the book's three interaction headings; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "drug interaction" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-01E59D0FD26046 ("Active tubular excretion is saturable and is a site of competition and drug interaction") names drug interaction in its own label. Related but distinct grain: it identifies one site at which a kinetic interaction happens, this classifies interactions by mechanism across all three routes. Cross-linked, not merged; that record is updated in 108-INT-concepts-pharmacology-updates.md.
conflicts: No source disagreement found.
uncertainty: Neither sitting read asked a drug-interaction question, so the 0.5 weight rests on the ILO ticks and the book's own chapter ILO 10 alone.
relationships: caused_by CON-FND-450B67836EBF1A and CON-FND-53FF18E42BC94B on the kinetic route; prerequisite_of CON-FND-CE72B2E63A736B. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Two drugs together may summate, synergise, potentiate or reverse each other, and the four are not interchangeable words
## id
CON-FND-CE72B2E63A736B
## canonical_key
teaching.pharma.interactions.combination-effects
## definition
Summation is two drugs with the same action producing an effect equal to the sum of their separate effects. Synergism is a combined effect greater than that sum. Potentiation is one drug increasing the effect of another that has, on its own, no such effect. Reversal of action is one drug turning another's effect into its opposite, as happens when one component of a mixed response is blocked and the other is left unopposed.
## explicit_objective
Name which of summation, synergism, potentiation or reversal a described drug combination shows, from the effect of each drug alone and of the two together.
## pitfalls
Using synergism and potentiation as synonyms. Potentiation requires that the potentiating drug have no such effect of its own; if both drugs act, the term is synergism.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S03-M02
## secondary_node_ids
DIS-PHA-T08 | DIS-PHA-T02 | DIS-PHA
## topic
General pharmacology
## subtopic
Drug Interactions
## microtopic
Interactions
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Drug Interactions > Pharmacodynamic drug interactions
## universities
kau
## learner_years
1
## aliases
Summation
Synergism
Potentiation
Reversal of action
Drug combination effects
## arabic_label
نتائج الجمع بين الأدوية
## arabic_aliases
التآزر الدوائي
التقوية الدوائية
## article_ids
ART-108-PHA-DRUG-INTERACTIONS
## related_article_ids
ART-108-PHA-PHARMACODYNAMICS
## related_concept_ids
CON-FND-7F618A3D1F940B | CON-FND-A1E2092A49359C | CON-FND-4388E0D8A75FD4
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p2 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.5
## exam_weight_by_year
KAU_Y1=0.5
## clinical_relevance
0.7
## academic_relevance
0.85
## weight_confidence
0.45
## confidence
0.85
## original_wording
[Orientation ILO 47, MCQ tick] To explain the possible results of drug combinations: summation, synergism, potentiation, and reversal of action
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-IMM-CAAF2B9624F2B5
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S03-M02 is Interactions and the overlay microtopic matches it.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "synergism" and "potentiation" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-IMM-CAAF2B9624F2B5 ("Cytokines can act synergistically or antagonistically") is the one live record containing "synerg". Unrelated in substance: it is an immunology statement about cytokine behaviour and defines none of the four terms. Recorded so the next author does not re-run the search.
conflicts: No source disagreement found.
uncertainty: The book names the four results; whether the department expects a worked example of reversal is not stated on the ILO sheet, and no example is quoted from the OCR'd text.
relationships: is_a specialisation of CON-FND-7F618A3D1F940B, and often_confused_with itself internally — synergism against potentiation is the pair students mix up. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Chemical and physiological antagonism work without a shared receptor: one binds the drug, the other opposes it through a second pathway
## id
CON-FND-A1E2092A49359C
## canonical_key
teaching.pharma.antagonism.chemical-physiological
## definition
Chemical antagonism is a direct reaction between two substances in solution, so the antagonist inactivates the drug before it reaches any receptor — a chelating agent binding a heavy metal, an antacid neutralising acid. Physiological, or functional, antagonism is two drugs acting at different receptors on different systems to produce opposite effects on the same measurement, so each cancels the other without either binding the other's receptor.
## explicit_objective
Distinguish chemical from physiological antagonism, and separate both from receptor antagonism by asking whether the two drugs share a receptor at all.
## pitfalls
Calling any opposing pair of drugs competitive antagonists. Competitive antagonism requires the same binding site; physiological antagonism specifically does not, which is why it cannot be overcome by adding more agonist in the usual way.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S03-M02
## secondary_node_ids
DIS-PHA-T02 | DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Drug Interactions
## microtopic
Interactions
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Drug Interactions > Pharmacodynamic drug interactions
## universities
kau
## learner_years
1
## aliases
Chemical antagonism
Physiological antagonism
Functional antagonism
Non-receptor antagonism
## arabic_label
التضاد الكيميائي والتضاد الفسيولوجي
## arabic_aliases
التضاد الوظيفي
## article_ids
ART-108-PHA-DRUG-INTERACTIONS
## related_article_ids
ART-108-PHA-PHARMACODYNAMICS
## related_concept_ids
CON-FND-138FC0AB7A3461 | CON-FND-CE72B2E63A736B | CON-FND-7F618A3D1F940B
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_saq_only | 2026 | p3 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year_written | 2024 | p6 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.7
## academic_relevance
0.9
## weight_confidence
0.6
## confidence
0.9
## original_wording
[EOY 2024 Section 2 QIIIa, 1 mark] Physiological antagonism.
[Orientation ILO 48, SAQ tick] To describe chemical and physiological antagonism as forms of pharmacodynamic drug interaction
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-138FC0AB7A3461
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S03-M02 is Interactions and the overlay microtopic matches it, which is where the ILO sheet files this as a pharmacodynamic drug interaction.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the 2024 paper and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "physiological antagonism" and "chemical antagonism" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-138FC0AB7A3461 is the competitive-against-non-competitive record. Related but distinct grain, and the ILO sheet says so: ILO 35 sits in the pharmacodynamics block with both ticks, ILO 48 sits in the drug-interactions block with the SAQ tick alone, and the 2024 paper asked physiological antagonism as a written definition rather than as a curve question. Cross-linked, not merged.
conflicts: No source disagreement found.
uncertainty: This is one of only three ILOs carrying an SAQ tick without an MCQ tick, which means the department expects it written out rather than recognised. Whether the chemical half is examined as often as the physiological half is not shown by the two sittings read — only physiological antagonism appeared.
relationships: contrasts_with CON-FND-138FC0AB7A3461 — the whole point is that these antagonisms need no shared receptor. is_a specialisation of CON-FND-7F618A3D1F940B. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
The therapeutic index is the ratio of the toxic dose to the effective dose, and it is a measure of safety, not of potency
## id
CON-FND-BB0DBAE1BC802B
## canonical_key
teaching.pharma.posology.therapeutic-index
## definition
ED50 is the dose producing the desired effect in half a population, LD50 the dose killing half of it, and the therapeutic index is the ratio of the two. A large ratio means a wide gap between the dose that works and the dose that harms, so the drug is safe to give without monitoring. The therapeutic window is the related but narrower idea of the plasma concentration range within which effect is achieved without toxicity, and it is what plasma-level monitoring aims at.
## explicit_objective
Define ED50, LD50 and the therapeutic index, say what a large or small index implies for monitoring, and distinguish the index from the therapeutic window.
## pitfalls
Reading a low therapeutic index as a weak drug. The index says nothing about how well the drug works; it says how little room there is between working and harming.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02-M03
## secondary_node_ids
DIS-PHA-T02 | DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Dosage of Drugs (Posology)
## microtopic
Therapeutic index
## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Dosage of Drugs (Posology) > Uses of LD50
108 INT > Pharmacology > Dosage of Drugs (Posology) > Therapeutic Index
## universities
kau
## learner_years
1
## aliases
Therapeutic index
Therapeutic window
LD50
ED50
Margin of safety
## arabic_label
المؤشر العلاجي
## arabic_aliases
النافذة العلاجية
الجرعة القاتلة النصفية
## article_ids
ART-108-PHA-POSOLOGY
## related_article_ids
ART-108-PHA-KINETIC-PRINCIPLES
ART-108-PHA-ADVERSE-DRUG-REACTIONS
## related_concept_ids
CON-FND-17149EED384DCA | CON-FND-D957928472CA57 | CON-FND-7A66C16BA5029C
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_no_tick | 2026 | p3 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p4 | 108 INT
src_ec50845c4498e17b9b6b | department_bank_chapter_pharmacokinetics | 2025 | p6 | 108 INT
## blueprint_weight
0.55
## exam_weight_by_year
KAU_Y1=0.55
## clinical_relevance
0.85
## academic_relevance
0.85
## weight_confidence
0.4
## confidence
0.9
## original_wording
[EOY 2024 Section 1 Q23, 0.5 marks] Which of the following describes the therapeutic index:
[EOY 2024 Section 1 Q23, correct option] It is a measure of drug safety.
[Orientation ILO 50, no tick] To distinguish between the therapeutic index and the therapeutic window as measures of drug safety
[Orientation ILO 49, no tick] Mention different dosing definitions in relation to therapy and toxicity
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-17149EED384DCA
## conflicts
The 2024 paper offers "It is more clinically relevant than the therapeutic window" as a distractor and marks it wrong, which implies the department ranks the therapeutic window above the index clinically. ILO 50 asks only that the two be distinguished, without ranking them. Both positions are recorded and neither is chosen here.
## uncertainty
ILO 49 and ILO 50 carry no tick in any of the three format columns, yet the 2024 paper asked a therapeutic-index MCQ. Either the sheet's last page is incompletely ticked or the paper examined beyond the blueprint; the extraction records the same problem for the OSPE column and flags it needsFaculty. The weight here follows the paper rather than the blank tick, and weight_confidence 0.4 records how little that rests on.
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
microtopicId: Filled — SYS-FND-T04-S02-M03 is Therapeutic index and the overlay microtopic matches it exactly.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from the 2024 paper and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "therapeutic index", "LD50" and "ED50" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-17149EED384DCA (efficacy against potency) shares the dose-response curve and the ED50 with this record. Related but distinct grain: that one reads the curve for what the drug does, this one compares the effective and the toxic dose for whether the drug is safe to give. Cross-linked, not merged. ILO 49 and ILO 50 are combined into one record because both are about the same set of dosing definitions and neither is separately ticked.
relationships: The clearest case in the file where the tick pattern and the papers disagree — no tick on the sheet, an MCQ on the 2024 paper — which is why the weight sits mid-range at 0.55 rather than at the 0.25 an untested ILO would earn or the 0.6 an MCQ-ticked one would. prerequisite_of CON-FND-D957928472CA57 on the harm side. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Routes of administration divide into enteral, parenteral and topical, and the route chosen is a kinetic decision before it is a practical one
## id
CON-FND-6A60CE8D2E7C5C
## canonical_key
teaching.pharma.routes.classification
## definition
Enteral routes deliver the drug to the gastrointestinal tract — oral, sublingual, buccal and rectal. Parenteral routes bypass it — intravenous, intramuscular, subcutaneous, intra-arterial, intracardiac, intrathecal and intra-articular. Topical routes act on a surface. The division matters because it predicts bioavailability, speed of onset, and whether the first pass through the liver happens at all.
## explicit_objective
Classify a named route as enteral, parenteral or topical, and state what that classification predicts about first-pass metabolism and onset.
## pitfalls
Treating "parenteral" as a synonym for "injected". A drug given by inhalation or transdermally is also parenteral in the sense that matters here: it has bypassed the gut.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M01
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Routes of Drug Administration and Dosage Forms
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms
## universities
kau
## learner_years
1
## aliases
Classification of routes of administration
Enteral route
Parenteral route
Topical route
Routes of drug administration
## arabic_label
تصنيف طرق إعطاء الأدوية
## arabic_aliases
الطرق المعوية وغير المعوية
## article_ids
ART-108-PHA-ROUTES
## related_article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
CON-FND-3CC8853A7D6DA8 | CON-FND-6235934A8DD0FE | CON-FND-CF40F32A8A74A0
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p3 | 108 INT
src_bd1595e59d116b78436a | end_of_year_written | 2025 | p13 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year_written | 2024 | p10 | 108 INT
## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.85
## academic_relevance
0.8
## weight_confidence
0.6
## confidence
0.9
## original_wording
[Orientation ILO 53, MCQ tick] Classify routes of drug administration
[Orientation ILO 54, MCQ tick] Mention the advantages and disadvantages of different routes of drug administration and dosage forms
[EOY 2025 Section 3 Q1a, 0.5 marks] What's the route of administration? [0.5 marks]
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
The orientation header allots OSPE 6 marks but no ILO on the sheet carries an OSPE tick, a contradiction the extraction records as unresolved and flags needsFaculty. The alternative reading offered there is that ILOs 53 to 55 — this record and its two siblings — are the OSPE ones, and the routes questions in both papers are indeed picture-led. That is not resolved here; it is recorded because if it is right, these three records are weighted too low.
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: Placed under protest. Route of administration is a kinetic determinant with no microtopic anywhere in SYS-FND-T04; SYS-FND-T04-S01-M01 (Absorption) is the nearest honest home, because the route is what decides whether absorption happens at all. No node was invented.
microtopicId: There is no microtopic for routes of administration; module_subject carries the book's own section, which is its ninth and last.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from both papers and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "route of administration" and "parenteral" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: Searched live state for "route of administration", "parenteral" and "intravenous" across all 1,718 concepts unfiltered — no hit describes routes as a class. No merge was proposed or rejected.
conflicts: No source disagreement found.
relationships: The whole routes section of both papers is picture-led — the stem shows a dosage form and asks the student to name the route — which is why this classification carries a heavier weight than its single MCQ tick would suggest. prerequisite_of CON-FND-3CC8853A7D6DA8 and CON-FND-6235934A8DD0FE. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
The oral route is the safest and most convenient, and its price is the first pass, slow onset and dependence on a co-operative gut
## id
CON-FND-3CC8853A7D6DA8
## canonical_key
teaching.pharma.routes.oral-first-pass
## definition
Oral administration is safe, painless, cheap and self-administered, and it is the route of choice whenever it will work. It is also slow in onset, useless in vomiting or unconsciousness, unreliable when gut motility or contents vary, unsuitable for a drug destroyed by gastric acid or digestive enzymes, and it exposes the drug to the first pass. Sublingual and buccal administration keep the convenience while draining into the systemic veins, so they escape the first pass and act fast.
## explicit_objective
Give the advantages and disadvantages of the oral route, and explain why the sublingual route acts faster and escapes first-pass metabolism.
## pitfalls
Assuming any tablet placed in the mouth is sublingual. A tablet meant to be swallowed is subject to the full first pass wherever it started; it is the venous drainage that matters, not the location.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M01
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Routes of Drug Administration and Dosage Forms
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Oral route
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Sublingual / Buccal route
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Rectal route
## universities
kau
## learner_years
1
## aliases
Oral route
Sublingual route
Buccal route
Advantages and disadvantages of the oral route
Rectal route
## arabic_label
الإعطاء عن طريق الفم وتحت اللسان
## arabic_aliases
الطريق الفموي
الطريق تحت اللساني
## article_ids
ART-108-PHA-ROUTES
## related_article_ids
ART-108-PHA-PHARMACOKINETICS-ADME
## related_concept_ids
CON-FND-CF40F32A8A74A0 | CON-FND-6A60CE8D2E7C5C | CON-FND-F2DD5E50875917
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p3 | 108 INT
src_bd1595e59d116b78436a | end_of_year_written | 2025 | p14 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year_written | 2024 | p11 | 108 INT
## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.9
## academic_relevance
0.8
## weight_confidence
0.6
## confidence
0.9
## original_wording
[EOY 2025 Section 3 Q5b, 0.5 marks] Give advantages of this route. [0.5 marks]
[EOY 2024 Section 3 Q6, 0.5 marks] What is the route of administration of this dosage form? [0.5 marks]
[EOY 2024 Section 3 Q6b, 0.5 marks] Mention the disadvantages of this route of administration. [0.5 marks]
[Orientation ILO 55, MCQ tick] Describe the route of administration of various dosage forms of drugs
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-CF40F32A8A74A0
## conflicts
[clear]
## uncertainty
The 2024 and 2025 routes questions are picture-led and the extraction records 14 distinct questions across the two papers as using an image. Which dosage form each stem showed cannot be recovered from the text layer, so the advantages and disadvantages here are taught for the route in general rather than for the particular preparation the examiner displayed.
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: Placed under protest, for the reason given on CON-FND-6A60CE8D2E7C5C — routes of administration has no microtopic, and Absorption is the nearest honest home.
microtopicId: There is no microtopic for the oral route.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from both papers and the ILO sheet; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "oral route" and "sublingual" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-CF40F32A8A74A0 (bioavailability and first-pass) is the mechanism this record's main disadvantage rests on. Related but distinct grain: that one defines the first pass, this one weighs the route as a clinical choice, and both were asked separately — bioavailability as a written definition in both sittings, the oral route as a picture question in both. Cross-linked, not merged.
conflicts: No source disagreement found.
relationships: caused_by CON-FND-CF40F32A8A74A0, and the sublingual half contrasts_with the oral half within the record. Typed edges are owed in a relations batch this task did not author.

---

# Item
## label
Intravenous bolus, slow intravenous injection and infusion differ in speed, in control, and in what they can safely deliver
## id
CON-FND-6235934A8DD0FE
## canonical_key
teaching.pharma.routes.intravenous-types
## definition
An intravenous bolus delivers the whole dose at once, giving the fastest possible onset and complete bioavailability, and offering no way to stop once it is given. Slow intravenous injection spreads the same dose over minutes so a dangerous peak is avoided. Infusion delivers the drug continuously at a controlled rate, which is how a steady state is held and how an irritant drug is diluted; other parenteral hazards follow the same logic, which is why intra-arterial injection risks distal ischaemia and intrathecal injection is reserved for drugs that must reach the central nervous system directly.
## explicit_objective
Differentiate intravenous bolus, slow intravenous injection and infusion by speed, controllability and indication, and state the hazard of inadvertent intra-arterial injection.
## pitfalls
Choosing a bolus for a drug whose danger is its peak concentration. The total dose can be perfectly correct and still cause harm, because the harm is in the rate.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01-M01
## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | DIS-PHA
## topic
General pharmacology
## subtopic
Routes of Drug Administration and Dosage Forms
## microtopic

## nanotopic

## modules
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Parenteral routes > Types of intravenous administration
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Intra-arterial
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Intra-thecal
## universities
kau
## learner_years
1
## aliases
Types of intravenous administration
Intravenous bolus
Intravenous infusion
Slow intravenous injection
Intra-arterial injection
Intrathecal injection
## arabic_label
أنواع الحقن الوريدي
## arabic_aliases
الحقن الوريدي السريع
التسريب الوريدي
## article_ids
ART-108-PHA-ROUTES
## related_article_ids
ART-108-PHA-KINETIC-PRINCIPLES
## related_concept_ids
CON-FND-6A60CE8D2E7C5C | CON-FND-7A66C16BA5029C | CON-FND-3CC86CC26BF549
## exam_signal
src_b4f736e3bd809dbee187 | orientation_ilo_mcq_only | 2026 | p3 | 108 INT
src_bd1595e59d116b78436a | end_of_year_written | 2025 | p13 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year_written | 2024 | p11 | 108 INT
## blueprint_weight
0.7
## exam_weight_by_year
KAU_Y1=0.7
## clinical_relevance
0.9
## academic_relevance
0.8
## weight_confidence
0.65
## confidence
0.9
## original_wording
[EOY 2025 Section 3 Q2, 1.5 marks] Differentiate between the three types of intravenous injection (IV) [1.5 marks]
[EOY 2025 Section 3 Q3, 0.5 marks] What can happen with inadvertent injection of drugs in arteries instead of veins? [0.5 marks]
[EOY 2025 Section 3 Q4, 0.5 marks] Give two indications of intra-thecal injection [0.5 marks]
[EOY 2024 Section 3 Q3, 0.5 marks] Mention the precautions done for administration of irritant drugs by the intravenous route? [0.5 Mark]
[EOY 2024 Section 3 Q5, 0.5 marks] Mention 2 possible applications for intra-arterial injection [0.5 Mark]
## resource_ids
[clear]

## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-3CC86CC26BF549
## conflicts
[clear]
## uncertainty
The 2025 paper asks what happens on inadvertent intra-arterial injection and the 2024 paper asks for two deliberate applications of the same route, so the department examines it from both sides. Neither answer is recoverable from the papers — both are written questions on a copy whose answers were handwritten and not in the text layer — and the book's routes section is the one whose page numbering is inconsistent in extraction, so no specific hazard or indication is quoted from it.
## evidence_gaps
Evidence must be attached before publication; no claim or citation exists for this module yet.
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
primaryNodeId: Placed under protest, for the reason given on CON-FND-6A60CE8D2E7C5C — routes has no microtopic and Absorption is the nearest honest home, even though an intravenous drug is by definition not absorbed. That is the sharpest stretch in this file and it is recorded as such rather than solved by inventing a node.
microtopicId: There is no microtopic for parenteral administration.
nanotopicId: No NAN_ ids exist for first-year general pharmacology in the catalogue.
atomicClaimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
resourceIds: The Kasr src_ sources are absent from corpus-source-index.json; they are cited in the preamble and on exam_signal.
resourceOccurrenceIds: Hand-authored from both papers; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus concept index for "intravenous" and "intrathecal" — no candidate record exists for this module.
approvedFileResourceIds: No file resource has been rights-cleared for 108 INT.
approvedVideoResourceIds: This department distributes no video for 108 INT.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — awaiting evidence.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-FND-3CC86CC26BF549 (Loading dose) is the record an intravenous bolus most often serves. Related but distinct grain: that defines the dose, this describes the manner of giving it. Cross-linked, not merged; the live record is updated in 108-INT-concepts-pharmacology-updates.md rather than duplicated.
conflicts: No source disagreement found.
relationships: Five separate written sub-questions across the two sittings land on this record, more than on any other in the file, which is why weight_confidence is 0.65 despite only a single MCQ tick on the sheet. mechanism_step_before CON-FND-7A66C16BA5029C, since infusion is how a steady state is held. Typed edges are owed in a relations batch this task did not author.
