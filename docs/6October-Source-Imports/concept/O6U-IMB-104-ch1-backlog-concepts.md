<!--
  O6U-IMB-104 -- 22 genuinely new concepts for the Chapter 1 (Nucleotides and Nucleic
  Acid Chemistry) authoring backlog from Bio questions.pdf, continuing the 34-question
  first pass (coverage/O6U-IMB-104-triage.md). Search-before-mint per 00-START-HERE.md
  §4: broad grep across docs/*-Source-Imports/concept/ for each fact found no reusable
  hit beyond the two already-minted concepts reused here (CON-FND-DBF48366CDD944 for
  Q31's D-arm/dihydrouracil restatement, CON-FND-921CE703EE0C22 for Q24's mitochondrial
  DNA restatement) -- both cited directly in the new questions' concept_ids without a
  new concept record.

  One bookkeeping note carried from the triage-keys ledger: the first-pass seed's
  bio104-q04 record cites "Q10, p2" in its source_citation but its actual question text
  ("melting temperature ... G and C content") is chapter Q9, not Q10 -- an off-by-one
  label slip in that record's citation only (its concept, CON-FND-50C9386652AC03, is
  correctly the GC/melting-temperature fact). Q9 is therefore already authored under a
  mislabeled citation; ch1-unselected-q09 is held below as a duplicate rather than
  re-authored, and the genuinely never-authored real Q10 (nucleosome core histones) is
  picked up here as ch1-unselected-q10 in its place, keeping the chapter's authored
  count at the correct 26 without a duplicate MCQ.

  atomic_claim_ids blank with a field_notes reason on every record, same as the first
  pass: this PDF is not in the shared corpus extraction index. §4 relationship discovery
  and Arabic fields deferred to a later pass for the same reason as the first batch.
-->

# Item

## id
CON-FND-E7D5D442111822

## label
A nucleotide is converted into a nucleoside by removing its phosphate group

## canonical_key
nucleotide.to-nucleoside.phosphate-removal

## definition
A nucleotide is a nucleoside (base + pentose sugar) esterified with one or more phosphate
groups. Hydrolysing that phosphate group away -- the reaction catalysed by nucleotidases --
leaves the base-sugar unit, a nucleoside, behind. Removing the base or the sugar is not the
step that separates these two terms; only the phosphate is the differentiator.

## explicit_objective
State that a nucleotide is converted into a nucleoside by removal of its phosphate group.

## pitfalls
Picking "purine base" or "pentose" as the group removed -- those changes would not leave a
nucleoside behind; only phosphate removal does.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-3662F0ED838A4C

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-BACKBONE-BASEPAIRING-CHARGAFF

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.15

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleic acid backbone chemistry and base pairing

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p1 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q2: A nucleotide is converted into a nucleoside by the removal of a: (answer: Phosphate)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleic acid backbone chemistry and base pairing
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-3662F0ED838A4C

## label
A nucleoside is a purine or pyrimidine base joined to a pentose sugar (no phosphate)

## canonical_key
nucleoside.definition.base-plus-sugar-no-phosphate

## definition
A nucleoside consists of a nitrogenous base (purine or pyrimidine) attached to a pentose sugar
(ribose or deoxyribose) via an N-glycosidic bond, with no phosphate group. Adding one or more
phosphate groups converts it into a nucleotide. The base alone is not a nucleoside, and adding
phosphate to base+sugar produces a nucleotide, not a nucleoside.

## explicit_objective
Define a nucleoside as a purine or pyrimidine base joined to a pentose sugar, without
phosphate.

## pitfalls
Including phosphate in the definition of a nucleoside -- that combination (base + sugar +
phosphate) is a nucleotide, not a nucleoside.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-E7D5D442111822

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-BACKBONE-BASEPAIRING-CHARGAFF

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleic acid backbone chemistry and base pairing

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p1 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q5: The chemical combination of ribose and one of the five nitrogen bases results in
formation of a: (answer: nucleoside); Q26: A nucleoside consists of (answer: Purine or
pyrimidine base + sugar)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.
reusedBy: Two questions in this backlog (ch1-unselected-q05, ch1-unselected-q26) test this
same definitional fact from different distractor sets -- shared here rather than minting
twice.

## topic
Molecular Biology
## subtopic
Nucleic acid backbone chemistry and base pairing
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-C763C4F2FD27CD

## label
In double-stranded DNA, %A = %T and %G = %C (Chargaff's rule), so one base's percentage fixes
the rest

## canonical_key
dna.chargaff-rule.percent-computation

## definition
Because A pairs only with T and G pairs only with C across the two DNA strands, the
percentage of adenine always equals that of thymine, and the percentage of guanine always
equals that of cytosine (Chargaff's rule). Knowing any one base's percentage therefore fixes
its pairing partner's percentage, and the remaining two bases (the other pair) share the rest
of 100% equally between themselves.

## explicit_objective
Apply Chargaff's rule (%A=%T, %G=%C) to compute an unknown base percentage in double-stranded
DNA from a given one.

## pitfalls
Forgetting that the two base pairs (A-T and G-C) are independent of each other in relative
proportion -- only within a pair (A=T, G=C) is equality guaranteed, not between the two pairs.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-A74C1DB1304CEE

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-BACKBONE-BASEPAIRING-CHARGAFF

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.1

## academic_relevance
0.8

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleic acid backbone chemistry and base pairing

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p2 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q11: If a DNA molecule contains 30% thymine, then what is its guanine content? (answer: 20%);
Q32: In a DNA molecule, if the guanosine content is 40%, the adenine content will be: (answer:
10%)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.
reusedBy: ch1-unselected-q11 and ch1-unselected-q32 both drill this same arithmetic rule with
different starting numbers -- shared here rather than minting twice.

## topic
Molecular Biology
## subtopic
Nucleic acid backbone chemistry and base pairing
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-7A93ACBD7DBE1D

## label
The base pairs of the DNA double helix are linked by hydrogen bonds

## canonical_key
dna.base-pairs.hydrogen-bonds

## definition
Complementary bases across the two strands of the DNA double helix (A-T, G-C) are held
together by hydrogen bonds -- two between A and T, three between G and C -- not by ionic,
peptide, or hydrophobic bonds. Peptide bonds link amino acids in proteins, not bases in DNA;
ionic and hydrophobic interactions are not the bonds directly pairing the bases themselves.

## explicit_objective
State that hydrogen bonds link the base pairs across the two strands of the DNA double helix.

## pitfalls
Choosing "peptide bonds" (a protein-chemistry term) or "ionic bonds" for base pairing --
neither describes how DNA bases interact across the double helix.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-582C17D77BF6D2

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-BACKBONE-BASEPAIRING-CHARGAFF

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleic acid backbone chemistry and base pairing

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p2 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q12: The bonds that link the base pairs in the DNA double helix are (answer: Hydrogen bonds)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleic acid backbone chemistry and base pairing
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-58D06DE687AA2C

## label
The nucleic acid backbone is an alternating sequence of sugar and phosphate groups

## canonical_key
nucleic-acid.backbone.sugar-phosphate

## definition
The backbone of DNA and RNA is built from alternating pentose sugar and phosphate groups,
linked in a repeating sugar-phosphate-sugar-phosphate chain; the nitrogenous bases project
outward from this backbone rather than forming part of it. The backbone is not made of base
groups, nor of sugar+base without phosphate.

## explicit_objective
State that the nucleic acid backbone consists of alternating sugar and phosphate groups.

## pitfalls
Including the base as part of the "backbone" -- the bases project off the backbone but are not
themselves backbone components.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-8ABEA9759DA601

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-BACKBONE-BASEPAIRING-CHARGAFF

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleic acid backbone chemistry and base pairing

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p2 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q15: The "backbone" of a nucleic acid molecule consists of an alternating sequence of:
(answer: Sugar and phosphate groups)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleic acid backbone chemistry and base pairing
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-EF26C78C81ED36

## label
The two strands of the DNA double helix are complementary; one strand's sequence determines
the other's

## canonical_key
dna.double-helix.strand-complementarity

## definition
DNA's two strands run antiparallel and pair complementarily (A with T, G with C), so the base
sequence of one strand fully determines the sequence of the other. The helix is right-handed
(B-DNA) in its standard form, not left-handed; the strands run antiparallel, not parallel; and
base pairing is A-T/G-C, not A-G/C-T.

## explicit_objective
State that the two strands of the DNA double helix are complementary, with one strand's
sequence determining the other's.

## pitfalls
Selecting "left-handed helix", "A-G and C-T pairing", or "strands run parallel" -- each
describes a real but different or incorrect structural feature; standard B-DNA is right-handed
with A-T/G-C pairing and antiparallel strands.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-7A93ACBD7DBE1D

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-BACKBONE-BASEPAIRING-CHARGAFF

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.1

## academic_relevance
0.8

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleic acid backbone chemistry and base pairing

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p3 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q18: Which of the following statements concerning the double helix structure present in DNA
molecules is correct? (answer: The sequence of the two strands is complementary and the
sequence of one strand determines the sequence of the second one)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleic acid backbone chemistry and base pairing
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-8ABEA9759DA601

## label
The nucleotides in the DNA backbone are held together by phosphodiester bonds

## canonical_key
nucleic-acid.backbone.phosphodiester-bonds

## definition
Successive nucleotides in a DNA (or RNA) strand are joined by phosphodiester bonds, which
link the 3' carbon of one sugar to the 5' carbon of the next via a phosphate group. Hydrogen
bonds hold the two strands together across the helix, not within a single strand's backbone;
peptide bonds are a protein-chemistry term; glycosidic bonds join a base to its own sugar, not
adjacent nucleotides to each other.

## explicit_objective
State that phosphodiester bonds hold successive nucleotides together within a DNA strand's
backbone.

## pitfalls
Confusing the intra-strand backbone linkage (phosphodiester bonds) with the inter-strand base-
pairing linkage (hydrogen bonds), or with the base-to-sugar linkage within one nucleotide
(glycosidic bond).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-58D06DE687AA2C

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-BACKBONE-BASEPAIRING-CHARGAFF

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleic acid backbone chemistry and base pairing

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p3 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q19: The nucleotides in the backbone of DNA are held together by ___ bonds. (answer:
phosphodiester)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleic acid backbone chemistry and base pairing
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-A74C1DB1304CEE

## label
In DNA, the number of guanine bases equals the number of cytosine bases

## canonical_key
dna.chargaff-rule.g-equals-c

## definition
Because every guanine on one DNA strand pairs with a cytosine on the complementary strand
(and vice versa), a DNA molecule's total guanine count always equals its total cytosine count
-- one part of Chargaff's rule (the other being A=T). Neither pair equality crosses over to
the other base pair (G/C count need not equal A/T count).

## explicit_objective
State that guanine and cytosine base counts are equal in a DNA molecule (Chargaff's rule).

## pitfalls
Choosing "guanine does not equal cytosine" or "adenine does not equal thymine" -- both of
those inequalities are false for double-stranded DNA; Chargaff's rule guarantees G=C and A=T
within it.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-C763C4F2FD27CD

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-BACKBONE-BASEPAIRING-CHARGAFF

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.1

## academic_relevance
0.8

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleic acid backbone chemistry and base pairing

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p3 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q20: In DNA molecule (answer: The number of guanine bases equals cytosine bases)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleic acid backbone chemistry and base pairing
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-F3AC55FAFA2BF4

## label
RNA is single stranded, so its base counts do not have to obey Chargaff's rule

## canonical_key
rna.single-stranded.chargaff-rule-not-applicable

## definition
Chargaff's rule (%A=%T or %U, %G=%C) arises from obligate complementary base pairing across
two strands. Because RNA is typically single stranded rather than a double helix, its guanine
count need not equal its cytosine count, nor its adenine count its uracil count -- there is no
second strand forcing that equality.

## explicit_objective
Explain that RNA's base counts do not obey Chargaff's rule because RNA is single stranded, not
a double helix.

## pitfalls
Applying Chargaff's rule (which depends on double-stranded complementary pairing) to RNA,
whose typical single-stranded form has no obligate partner strand to enforce it.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-A74C1DB1304CEE

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-BACKBONE-BASEPAIRING-CHARGAFF

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleic acid backbone chemistry and base pairing

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p3 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q22: In RNA molecule guanine bases does not necessarily equal its cytosine bases also, its
adenine bases does not necessarily equal its uracil bases since it is a (answer: Single
stranded molecule)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleic acid backbone chemistry and base pairing
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-C6AFD486109C6E

## label
The melting temperature of DNA is the temperature at which half of its helical structure is
lost

## canonical_key
dna.melting-temperature.definition

## definition
The melting temperature (Tm) of DNA is defined as the temperature at which half of the
double-helical base pairing has been disrupted (denatured) into single strands, typically
tracked by the rise in UV absorbance (hyperchromicity) as stacked bases separate. It is not
the temperature at which solid DNA liquefies, DNA is hydrolysed into nucleotides, or the helix
converts to a supercoiled form.

## explicit_objective
Define the melting temperature of DNA as the temperature at which half of its helical
structure is denatured.

## pitfalls
Confusing DNA melting (helix-to-single-strand denaturation, a physical unwinding) with
chemical hydrolysis of the molecule into its nucleotide building blocks -- melting does not
break covalent bonds.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-50C9386652AC03

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-BACKBONE-BASEPAIRING-CHARGAFF

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleic acid backbone chemistry and base pairing

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p4 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q25: The melting temperature of DNA is the temperature at which: (answer: Half of the helical
structure of DNA is lost)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleic acid backbone chemistry and base pairing
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-582C17D77BF6D2

## label
The structural stability of the DNA double helix is mainly attributed to hydrogen bonding
between purine and pyrimidine bases

## canonical_key
dna.double-helix.stability-hydrogen-bonding

## definition
Per this source's teaching, the DNA double helix's structural stability is mainly attributed
to hydrogen bonding between complementary purine and pyrimidine bases (A-T, G-C) across the
two strands -- not bonding between two purines or two pyrimidines on the same or opposite
strands, which does not occur in normal Watson-Crick pairing. (Base-stacking between adjacent
bases also contributes to overall duplex stability, but this source keys the double helix's
stability specifically to purine-pyrimidine hydrogen bonding.)

## explicit_objective
State, per this source, that hydrogen bonding between purine and pyrimidine bases is mainly
responsible for the DNA double helix's structural stability.

## pitfalls
Choosing hydrogen bonding between two purines or two pyrimidines -- normal Watson-Crick
pairing only bonds a purine to a pyrimidine (A-T, G-C), never purine-purine or
pyrimidine-pyrimidine.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-7A93ACBD7DBE1D

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-BACKBONE-BASEPAIRING-CHARGAFF

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.5

## clinical_relevance
0.1

## academic_relevance
0.7

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleic acid backbone chemistry and base pairing

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p5 | O6U-IMB-104

## weight_confidence
0.45

## confidence
0.7

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q35: The structural stability of the double helix of DNA is mainly due to: (answer: Hydrogen
bonding between purine and pyrimidine bases)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.
confidence: Lowered from this module's usual 0.85-0.9 to 0.7 -- many texts attribute DNA
duplex stability mainly to base-stacking (hydrophobic/van der Waals) rather than H-bonding,
with H-bonding cited chiefly for pairing specificity. This source's printed key names
purine-pyrimidine H-bonding, which is a defensible, commonly-taught simplification and not
self-contradictory, so authored as keyed rather than held -- flagged here for a reviewer to
confirm against the department's own teaching emphasis.

## topic
Molecular Biology
## subtopic
Nucleic acid backbone chemistry and base pairing
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
Whether this module's course emphasises base-stacking over H-bonding for "duplex stability"
specifically -- flagged in field_notes above for reviewer confirmation.
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-21CA02B38F7B07

## label
cAMP is converted to 5' AMP by phosphodiesterase, not "phosphomonoesterase"

## canonical_key
camp.degradation.phosphodiesterase

## definition
Cyclic AMP (cAMP) is formed from ATP by adenylyl cyclase, activates protein kinase A, and its
level rises in response to hormones such as epinephrine acting through Gs-coupled receptors.
It is degraded to 5'-AMP by cAMP phosphodiesterase (PDE) -- an enzyme that hydrolyses a
phosphodiester bond -- not by a "phosphomonoesterase", which would act on a different bond
type; this misnaming is the incorrect statement in this source's four-option item.

## explicit_objective
Identify that cAMP is degraded to 5'-AMP by phosphodiesterase, correcting the distractor term
"phosphomonoesterase".

## pitfalls
Accepting "phosphomonoesterase" as the enzyme that degrades cAMP -- the correct enzyme name is
phosphodiesterase, reflecting the phosphodiester bond within cAMP's cyclic structure.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-08362DEFB183CF

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-COFACTOR-TRNA-CHROMATIN-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.25

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide/coenzyme identification and tRNA structure

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p1 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q4: As regards cAMP, one of the following is incorrect: (answer: It is converted to 5' AMP by
phosphomonoesterase -- correct enzyme is phosphodiesterase)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide/coenzyme identification and tRNA structure
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-794238DDB0B23A

## label
Coenzyme A acts as an acyl group carrier

## canonical_key
coenzyme-a.function.acyl-group-carrier

## definition
Coenzyme A's terminal thiol group forms high-energy thioester bonds with acyl groups (e.g.
acetyl-CoA), making it the cell's acyl group carrier -- not a methyl donor (SAM's role), a
sulphate donor (PAPS's role), or a hydrogen carrier (NAD+/FAD/NADP+'s role, from which CoA is
explicitly excluded despite being another adenine-nucleotide-derived coenzyme).

## explicit_objective
State that Coenzyme A functions as an acyl group carrier.

## pitfalls
Grouping Coenzyme A with the hydrogen-carrier coenzymes (NAD+, FAD, NADP+) because it too is
adenine-nucleotide derived -- CoA's specific job is carrying acyl groups, not hydrogen.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-938971E66CA9C6

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-COFACTOR-TRNA-CHROMATIN-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.15

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide/coenzyme identification and tRNA structure

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p2 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q7: Coenzyme A acts as: (answer: Acyl group carrier)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide/coenzyme identification and tRNA structure
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-84E706E8E86BFD

## label
mRNA carries genetic information from DNA in the nucleus to the ribosomes for protein
synthesis

## canonical_key
mrna.function.carries-genetic-code-to-ribosome

## definition
Messenger RNA (mRNA) is the RNA species that carries the genetic code copied from DNA in the
nucleus out to the ribosomes in the cytoplasm, where it is translated into protein. rRNA is a
ribosome structural/catalytic component, tRNA delivers amino acids during translation, and
"sRNA" is not the carrier of genetic information from DNA to ribosome in this role.

## explicit_objective
State that mRNA is the RNA species carrying genetic information from nuclear DNA to the
ribosomes for protein synthesis.

## pitfalls
Confusing mRNA's information-carrying role with rRNA's structural role in the ribosome or
tRNA's amino-acid-delivery role during translation.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-EECA70B939BB60

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-COFACTOR-TRNA-CHROMATIN-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide/coenzyme identification and tRNA structure

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p2 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q8: Which of the following types of RNA carries the genetic information from DNA in the
nucleus to the ribosomes for protein synthesis? (answer: mRNA)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide/coenzyme identification and tRNA structure
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-DD71D9C5AA8F60

## label
Histone H1 is not present within the core nucleosome

## canonical_key
nucleosome.core-histones.h1-is-linker-not-core

## definition
The core nucleosome (the histone octamer around which DNA wraps) is built from two copies
each of H2A, H2B, H3 and H4. Histone H1 is a separate "linker histone" that sits outside the
core octamer, binding linker DNA between nucleosomes and stabilising higher-order chromatin
folding -- it is not one of the four core histone types.

## explicit_objective
State that histone H1 is not part of the core nucleosome, distinguishing it from the four core
histones (H2A, H2B, H3, H4).

## pitfalls
Listing H1 among the core nucleosome's histones -- it is a linker histone outside the core
octamer, not one of its four constituent histone types.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-D42E28490167FC

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-COFACTOR-TRNA-CHROMATIN-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide/coenzyme identification and tRNA structure

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p2 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q10 (chapter numbering): One of the following proteins is not present within the core
nucleosome: (answer: H1)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.
provenance: This is chapter Q10's real content. The first-pass seed's bio104-q04 record cites
"Q10, p2" but its actual question text is chapter Q9 (melting temperature/GC content) --
that citation slip left Q10's real content (this fact) never authored under any key. Picked
up here as ch1-unselected-q10 rather than re-authoring the Q9 duplicate.

## topic
Molecular Biology
## subtopic
Nucleotide/coenzyme identification and tRNA structure
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-24C7F0C01AD9E1

## label
tRNA's cloverleaf structure does not have five loops plus a separate acceptor arm

## canonical_key
trna.structure.cloverleaf-not-five-loops

## definition
Mature tRNA folds into a cloverleaf secondary structure with an acceptor stem and three main
loops (D-loop, anticodon loop, TψC loop), sometimes with a small variable loop -- not five
loops plus a separate acceptor arm as one distractor claims. tRNA does form about 10-15% of
cellular RNA, contains unusual bases, and has a cloverleaf appearance; the "5 loops and an
acceptor arm" description is the false statement among these.

## explicit_objective
Identify that tRNA's cloverleaf structure has around three main loops (not five) plus an
acceptor stem, correcting the "5 loops and an acceptor arm" distractor.

## pitfalls
Overcounting tRNA's cloverleaf loops as five -- the standard cloverleaf has the D-loop,
anticodon loop and TψC loop as its three main loops, plus an acceptor stem (not itself a
loop).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-DBF48366CDD944

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-COFACTOR-TRNA-CHROMATIN-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide/coenzyme identification and tRNA structure

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p2 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q14: As regards tRNA, all of the following statements are correct EXCEPT: (answer: Has 5
loops and an acceptor arm)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide/coenzyme identification and tRNA structure
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-EECA70B939BB60

## label
The codon is found on mRNA, and the anticodon is found on tRNA

## canonical_key
translation.codon-anticodon.mrna-trna-location

## definition
A codon is a three-base sequence carried on mRNA, specifying an amino acid; its complementary
anticodon is carried on tRNA, where it base-pairs with the codon during translation to deliver
the correct amino acid. The reverse assignment (codon on tRNA, anticodon on mRNA) is
incorrect, as are pairings naming rRNA in either role.

## explicit_objective
State that the codon is located on mRNA and the anticodon is located on tRNA.

## pitfalls
Reversing which molecule carries the codon versus the anticodon -- the codon is on mRNA, the
complementary anticodon is on tRNA.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-84E706E8E86BFD

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-COFACTOR-TRNA-CHROMATIN-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide/coenzyme identification and tRNA structure

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p3 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q16: The codon is found on ___, and the anticodon is found on ___. (answer: mRNA, tRNA)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide/coenzyme identification and tRNA structure
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-F3CC00F33DB4D3

## label
A given tRNA molecule carries only its one specific amino acid, not any of the 20

## canonical_key
trna.function.one-specific-amino-acid

## definition
Each tRNA species is charged (aminoacylated) by its own specific aminoacyl-tRNA synthetase
with only the one amino acid matching its anticodon; it is not a generic carrier able to
deliver any of the 20 standard amino acids. tRNA does have a cloverleaf appearance, contains
unusual bases, and carries an anticodon -- the false statement is that a given tRNA "can carry
any of the 20 amino acids".

## explicit_objective
State that a specific tRNA molecule is charged with only one particular amino acid, not any of
the 20.

## pitfalls
Believing any single tRNA molecule can carry any of the 20 amino acids -- each tRNA species is
specific to one amino acid via its aminoacyl-tRNA synthetase.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-9B70431B1EA357

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-COFACTOR-TRNA-CHROMATIN-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.15

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide/coenzyme identification and tRNA structure

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p3 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q21: Which of the following is NOT a characteristic of transfer RNA? (answer: A given transfer
RNA can carry any of the 20 amino acids)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide/coenzyme identification and tRNA structure
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-D42E28490167FC

## label
Histones are basic proteins rich in lysine and arginine

## canonical_key
histones.composition.basic-lysine-arginine-rich

## definition
Histones are basic (positively charged) proteins, rich in the basic amino acids lysine and
arginine, which lets them bind electrostatically to the negatively charged phosphate backbone
of DNA. They are not acidic or negatively charged, and there are five main histone types
(H1, H2A, H2B, H3, H4), not four.

## explicit_objective
State that histones are basic proteins rich in lysine and arginine, enabling their
electrostatic binding to DNA.

## pitfalls
Calling histones "acidic" or "negatively charged" -- their basic, positively charged nature
(from abundant lysine/arginine) is what lets them bind DNA's negatively charged backbone.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-DD71D9C5AA8F60

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-COFACTOR-TRNA-CHROMATIN-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide/coenzyme identification and tRNA structure

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p3 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q23: As regards histones of chromatid: (answer: They are basic proteins rich in lysine and
arginine)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide/coenzyme identification and tRNA structure
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-D9F28422CD948C

## label
AMP is a purine nucleotide

## canonical_key
purine-nucleotides.identification.amp

## definition
AMP (adenosine monophosphate) contains adenine, a purine base, making it a purine nucleotide.
UMP and CMP contain uracil and cytosine respectively (pyrimidines), and TMP contains thymine
(also a pyrimidine) -- so among AMP, UMP, CMP and TMP, only AMP is a purine nucleotide.

## explicit_objective
Identify AMP as a purine nucleotide, distinguishing it from the pyrimidine nucleotides UMP,
CMP and TMP.

## pitfalls
Mistaking UMP, CMP or TMP for a purine nucleotide -- uracil, cytosine and thymine are all
pyrimidine bases; only adenine (in AMP) and guanine are purines.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-054DD72A261BD3

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-COFACTOR-TRNA-CHROMATIN-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide/coenzyme identification and tRNA structure

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p4 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q27: A purine nucleotide is: (answer: AMP)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide/coenzyme identification and tRNA structure
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-054DD72A261BD3

## label
UTP is the pyrimidine nucleotide acting as a high-energy intermediate

## canonical_key
pyrimidine-nucleotides.utp-high-energy-intermediate

## definition
Among the pyrimidine nucleotides, UTP is the one that functions as a high-energy intermediate
-- most notably by reacting with glucose-1-phosphate to form UDP-glucose, the activated sugar
donor for glycogen synthesis and other glycosylation reactions. ATP (the option distractor) is
a purine nucleotide, not a pyrimidine one; UDP-Glc is itself a downstream product of UTP, not
the high-energy intermediate being asked for; CMP is a low-energy pyrimidine monophosphate.

## explicit_objective
Identify UTP as the pyrimidine nucleotide serving as the high-energy intermediate (e.g. in
UDP-glucose formation).

## pitfalls
Choosing ATP -- despite also being a "high energy" nucleotide, ATP is a purine nucleotide, not
the pyrimidine one this question asks for.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-D9F28422CD948C

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-COFACTOR-TRNA-CHROMATIN-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.5

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide/coenzyme identification and tRNA structure

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p4 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q28: The pyrimidine nucleotide acting as the high energy intermediate is (answer: UTP)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide/coenzyme identification and tRNA structure
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-2881C8719F799E

## label
Every tRNA's base-paired stem terminates in the sequence CCA at its 3' terminus

## canonical_key
trna.structure.cca-3-prime-terminus

## definition
Despite differing in their internal nucleotide sequence, every mature tRNA carries a
conserved, unpaired CCA sequence at its 3' terminus (the free 3'-OH of the terminal adenosine
is where the amino acid is esterified during aminoacylation). This CCA end is not at the 5'
terminus, on the anticodon arm, or split across both termini.

## explicit_objective
State that all tRNA molecules carry the conserved CCA sequence at their 3' terminus.

## pitfalls
Placing the conserved CCA sequence at the 5' terminus or on the anticodon arm instead of the
3' terminus, where amino acid attachment actually occurs.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids

## related_concept_ids
CON-FND-F3CC00F33DB4D3

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-COFACTOR-TRNA-CHROMATIN-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide/coenzyme identification and tRNA structure

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p4 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q30: Although each specific tRNA differs from the others in its sequence of nucleotides, all
tRNA molecules contain a base paired stem that terminates in the sequence CCA at: (answer: 3'
Termini)

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Bio questions.pdf is not in the shared corpus extraction index; no citable
claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run against DIS-BIO-T06 siblings -- S4 pass owed.
moduleIds: No verified live O6U-IMB-104 module id supplied by the intake lane at time of
authoring; left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide/coenzyme identification and tRNA structure
## microtopic
[clear]
## nanotopic
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---
