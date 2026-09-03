<!--
  O6U-IMB-104 -- 34 genuinely new concepts (search-before-mint per
  00-START-HERE.md §4: broad grep across docs/*-Source-Imports/concept/ for
  each fact before minting). One near-exact hit was found for the GC-content/
  melting-temperature fact -- CON-FND-AF09E96F70832F in Ain Shams's own
  ASU-MBG-nucleic-acid-chemistry-concepts.md -- but its own defining article
  sits in a second, Kasr-owned import-ready file (a two-hop cross-university
  pending chain outside this dispatch's --with scope), so it was minted fresh
  here instead, with the near-miss noted in field_notes rather than merged.
  All test facts from Bio questions.pdf's five-chapter molecular biology MCQ
  practice book, keyed by its own per-chapter printed "MCQ Answers" tables
  (coverage/O6U-IMB-104-triage.md).

  atomic_claim_ids is left blank with a field_notes reason on every record:
  this PDF is not in the shared corpus extraction index, so no citable src_
  claim exists yet -- an S5 evidence pass is flagged as follow-up work
  rather than invented, per 02-concepts.md's three honest options (option 3,
  "say so and stop"). This does not block medical:batch or medical:simulate;
  it will block medical:audit, out of scope for this dispatch.

  §4 relationship discovery (typed edges to same-node siblings) is deferred
  to a later pass, and Arabic fields are blank with a field_notes reason (no
  verification pass run this session).
-->

# Item

## id
CON-FND-08362DEFB183CF

## label
S-Adenosyl methionine (SAM, "active methionine") is the cell's universal methyl donor

## canonical_key
sam.function.universal-methyl-donor

## definition
S-Adenosyl methionine (SAM), formed from methionine and ATP, is often called "active
methionine" because its sulfonium centre makes the attached methyl group highly reactive.
Enzymes that methylate DNA, RNA, proteins, phospholipids and small-molecule neurotransmitters
(e.g. noradrenaline to adrenaline) all draw on SAM as the methyl donor, releasing
S-adenosylhomocysteine (SAH) in the process. SAM is not a sulphate, hydrogen or oxygen donor
-- those roles belong to other adenine nucleotides (PAPS, NAD/FAD, and none respectively).

## explicit_objective
State that SAM (active methionine) acts as the cell's methyl donor, not a sulphate, hydrogen
or oxygen donor.

## pitfalls
Confusing SAM with PAPS -- both are adenine-containing activated carriers, but SAM carries a
methyl group while PAPS carries an activated sulphate group.

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
CON-FND-21B4682EB8AECF

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-GROUP-TRANSFER-COFACTORS

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.65

## clinical_relevance
0.3

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide coenzymes and group transfer

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
Q1: Active methionine (SAM) acts as: (answer: Methyl donor)

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
Nucleotide coenzymes and group transfer
## microtopic
[clear]
## nanotopic
[clear]
## aliases
Active methionine
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
CON-FND-21B4682EB8AECF

## label
PAPS (3'-phosphoadenosine-5'-phosphosulphate) is the cell's activated sulphate donor

## canonical_key
paps.function.activated-sulphate-donor

## definition
PAPS is the adenine-nucleotide-derived "active sulphate", built by attaching an activated
sulphate group to adenosine 3'-phosphate 5'-phosphate. Sulfotransferase enzymes use PAPS to
transfer that sulphate group onto acceptors such as glycosaminoglycans, steroids, drugs and
xenobiotics during phase II conjugation, and onto tyrosine residues in some proteins. PAPS is
not a methyl, hydrogen or CO2 donor -- those are SAM, NAD(P)/FAD, and biotin-dependent
carboxylases respectively.

## explicit_objective
State that PAPS is the activated sulphate donor, distinguishing its role from SAM's methyl-
donor role.

## pitfalls
Swapping SAM and PAPS in a "which donates what" question -- both are adenine-based activated
carriers, but only PAPS carries sulphate.

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
ART-O6U-IMB-GROUP-TRANSFER-COFACTORS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.3

## academic_relevance
0.7

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide coenzymes and group transfer

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
Q3: 3' phosphoadenosine 5' phosphosulphate (PAPS), acts as: (answer: Sulphate donor)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide coenzymes and group transfer
## microtopic
[clear]
## nanotopic
[clear]
## aliases
Active sulphate
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
CON-FND-938971E66CA9C6

## label
NAD+, FAD and NADP+ are hydrogen carriers; coenzyme A is not

## canonical_key
hydrogen-carriers.nad-fad-nadp-not-coa

## definition
NAD+, FAD and NADP+ each accept a hydride/hydrogen equivalent during an oxidation reaction
and carry it to another reaction (or to the electron transport chain), making them the
classic hydrogen-carrier coenzymes. Coenzyme A, despite also being an adenine-nucleotide-
derived coenzyme, carries acyl groups on its terminal thiol rather than hydrogen -- it is an
acyl-group carrier, not a hydrogen carrier.

## explicit_objective
List NAD+, FAD and NADP+ as hydrogen-carrier coenzymes, and state that coenzyme A is an
acyl-group carrier instead.

## pitfalls
Grouping coenzyme A with NAD/FAD/NADP because all four are adenine-nucleotide coenzymes --
only the first three carry hydrogen; CoA's job is acyl-group transfer.

## concept_type
classification

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-GROUP-TRANSFER-COFACTORS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.2

## academic_relevance
0.7

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide coenzymes and group transfer

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
Q6: One of the following is not a hydrogen carrier: (answer: Coenzyme A). Q7: Coenzyme A
acts as: (answer: Acyl group carrier) -- same fact tested twice.

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide coenzymes and group transfer
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
CON-FND-E6CADF8C89A03C

## label
dUMP is not a nucleotide found in DNA

## canonical_key
dna.nucleotides.dump-not-present

## definition
DNA's four deoxyribonucleotides are dAMP, dGMP, dCMP and dTMP; dUMP (deoxyuridine
monophosphate) is not one of them, because uracil is excluded from DNA in favour of its
methylated form, thymine. dUMP does appear as a transient intermediate in thymidylate
synthesis, where thymidylate synthase methylates it to dTMP, but it is not itself
incorporated into the finished DNA strand.

## explicit_objective
State that dUMP is not a DNA nucleotide, distinguishing DNA's four bases (A, G, C, T) from
RNA's use of uracil.

## pitfalls
Assuming any deoxyribonucleotide with a pyrimidine base belongs in DNA -- dUMP is
deoxyribose-based but is excluded because DNA uses thymine, not uracil.

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
CON-FND-8D4C1563D94532

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-NUCLEOTIDE-CATABOLISM-COMPOSITION

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.2

## academic_relevance
0.7

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide structure, tRNA and catabolism

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
Q13: One of the following nucleotides is not found in DNA: (answer: d(UMP)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide structure, tRNA and catabolism
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
CON-FND-DBF48366CDD944

## label
The D-arm of tRNA is named for its unusual base, dihydrouracil

## canonical_key
trna.d-arm.dihydrouracil

## definition
Transfer RNA's cloverleaf secondary structure has four main arms besides the acceptor stem:
the D-arm, the anticodon arm, the variable (extra) arm, and the TψC arm. The D-arm takes its
name from dihydrouracil, an unusual (modified) base concentrated in that arm's loop, produced
by reducing one of uracil's ring double bonds -- one of several post-transcriptional base
modifications that make mature tRNA structurally distinctive from ordinary RNA.

## explicit_objective
Name the D-arm of tRNA as the arm containing the unusual base dihydrouracil.

## pitfalls
Confusing the D-arm (dihydrouracil) with the TψC arm (named for thymine-pseudouridine-
cytosine) -- both carry unusual bases, but different ones.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-NUCLEOTIDE-CATABOLISM-COMPOSITION

## learner_years
1

## universities
o6u

## blueprint_weight
0.35

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.65

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide structure, tRNA and catabolism

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p3 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q17: The arm of tRNA which contains the unusual base dihydrouracil is the: (answer: D-arm)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide structure, tRNA and catabolism
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
CON-FND-8D4C1563D94532

## label
Uracil is found in RNA, not DNA

## canonical_key
rna.bases.uracil-not-in-dna

## definition
RNA's four bases are adenine, guanine, cytosine and uracil; DNA substitutes thymine (5-
methyluracil) for uracil. Uracil is the base actually paired opposite adenine during
transcription, and it is one of the standard cues distinguishing an RNA nucleic-acid base
list from a DNA one on an exam.

## explicit_objective
State that uracil is found in RNA but not DNA, which uses thymine instead.

## pitfalls
Listing uracil among DNA's bases by analogy with thymine's role -- DNA uses thymine
specifically, not its non-methylated relative uracil.

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
CON-FND-E6CADF8C89A03C

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-NUCLEOTIDE-CATABOLISM-COMPOSITION

## learner_years
1

## universities
o6u

## blueprint_weight
0.35

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.65

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide structure, tRNA and catabolism

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
Q29: The nucleic acid base found in mRNA but not in DNA is: (answer: Uracil)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide structure, tRNA and catabolism
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
CON-FND-9C7B14B68F0312

## label
Gout is characterized by increased plasma uric acid

## canonical_key
gout.biochemistry.hyperuricemia

## definition
Gout is a crystal arthropathy driven by hyperuricemia -- an increased plasma level of uric
acid, the end product of purine catabolism in humans, who (unlike most other mammals) lack
uricase and so cannot oxidise uric acid further. When plasma urate exceeds its solubility
limit, monosodium urate crystals deposit in joints and soft tissue, triggering the
inflammatory attacks characteristic of gout; urea, creatine and creatinine are unrelated
nitrogen-waste or muscle-metabolite measures, not the marker raised in gout.

## explicit_objective
State that gout is characterized by increased plasma uric acid, the end product of purine
catabolism.

## pitfalls
Confusing uric acid with urea or creatinine -- all three are nitrogenous waste products, but
only uric acid (from purine breakdown) is the marker raised in gout.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-NUCLEOTIDE-CATABOLISM-COMPOSITION

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.75

## clinical_relevance
0.7

## academic_relevance
0.6

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide structure, tRNA and catabolism

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p5 | O6U-IMB-104

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
Q33: Gout is characterized by increased plasma levels of: (answer: Uric acid)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Nucleotide structure, tRNA and catabolism
## microtopic
[clear]
## nanotopic
[clear]
## aliases
Hyperuricemia
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
CON-FND-50C9386652AC03

## label
GC-rich DNA melts at a higher temperature than AT-rich DNA

## canonical_key
dna.melting-temperature.gc-content-raises-tm

## definition
Denaturing (melting) DNA means breaking the hydrogen bonds holding its two strands together.
A guanine-cytosine base pair is held by three hydrogen bonds, one more than an adenine-
thymine pair's two, so a DNA region richer in G and C requires more thermal energy -- a higher
melting temperature -- to denature than an equally long region richer in A and T. Sugar and
phosphate content do not vary between DNA molecules the way base composition does, so they do
not explain differences in melting temperature.

## explicit_objective
State that DNA's melting temperature rises with its guanine-cytosine content, because of the
extra hydrogen bond in each G-C pair.

## pitfalls
Attributing the melting-temperature difference to sugar or phosphate content instead of base
composition -- every DNA molecule has the same sugar-phosphate backbone chemistry; only base
composition (and so hydrogen-bond count) varies.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-NUCLEOTIDE-CATABOLISM-COMPOSITION

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.15

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Nucleotide structure, tRNA and catabolism

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p5 | O6U-IMB-104

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
Q10: The melting temperature of DNA is increased by its: (answer: G and C content)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.
searchBeforeMint: a near-exact hit was found, CON-FND-AF09E96F70832F in Ain Shams's own
ASU-MBG-nucleic-acid-chemistry-concepts.md (same fact, "GC-rich DNA melts at a higher
temperature than AT-rich DNA"), not reused because its own defining article sits in a
second, Kasr-owned import-ready file (docs/import-ready/article/102-INT-biochemistry.md) --
a two-hop cross-university pending chain outside this dispatch's --with scope. Flagged as a
likely merge candidate for a future consolidation pass rather than risking an incorrect
overlay dependency here.

## topic
Molecular Biology
## subtopic
Nucleotide structure, tRNA and catabolism
## microtopic
[clear]
## nanotopic
[clear]
## aliases
GC content and DNA melting temperature
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
CON-FND-AF09E96F70832F
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-8CFC428EE3A8A3

## label
Z-DNA is the left-handed double helix form of DNA

## canonical_key
dna.forms.z-dna-left-handed

## definition
DNA can adopt several helical conformations depending on sequence, hydration and ionic
conditions. B-DNA, the standard right-handed form, predominates under physiological
conditions; A-DNA is a shorter, wider right-handed form seen in dehydrated fibres and in
RNA-DNA hybrids; Z-DNA is distinctive as the only common left-handed form, favoured by
alternating purine-pyrimidine sequences (e.g. GC repeats) and thought to play a role in gene
regulation.

## explicit_objective
Identify Z-DNA as the left-handed double helix form, distinguishing it from the right-handed
A- and B-DNA forms.

## pitfalls
Assuming all DNA helices are right-handed like the familiar B-DNA -- Z-DNA is the exception.

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
CON-FND-921CE703EE0C22

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-DNA-STRUCTURAL-VARIANTS

## learner_years
1

## universities
o6u

## blueprint_weight
0.35

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.1

## academic_relevance
0.65

## module_subject
O6U-IMB-104 > Molecular Biology > DNA structural variants

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p5 | O6U-IMB-104

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
Q34: Left handed double helix is present in: (answer: Z-DNA)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
DNA structural variants
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
CON-FND-921CE703EE0C22

## label
Mitochondrial DNA is double-stranded and circular, unlike nuclear DNA's linear chromosomes

## canonical_key
mitochondrial-dna.structure.double-stranded-circular

## definition
Mitochondrial DNA is a small, double-stranded circular molecule -- structurally more like
bacterial DNA than the linear, histone-packaged chromosomes of the nucleus, consistent with
mitochondria's endosymbiotic bacterial origin. It is maternally inherited, makes up roughly
0.3-1% of total cellular DNA, and its mutations are associated with certain myopathies and
neurological disorders because of the tissue's high energy demand.

## explicit_objective
State that mitochondrial DNA is double-stranded and circular, distinguishing it from linear
nuclear DNA.

## pitfalls
Assuming mitochondrial DNA is single-stranded because it is unusual -- it is double-stranded,
its unusual feature is being circular rather than linear.

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
CON-FND-8CFC428EE3A8A3

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-DNA-STRUCTURAL-VARIANTS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.4

## academic_relevance
0.65

## module_subject
O6U-IMB-104 > Molecular Biology > DNA structural variants

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p6 | O6U-IMB-104

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
Q36: The mitochondrial DNA is: (answer: Double stranded, circular)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
DNA structural variants
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
CON-FND-159761C753EAAD

## label
DNA replication is semiconservative: each daughter duplex keeps one parental strand

## canonical_key
replication.mechanism.semiconservative

## definition
Meselson and Stahl's classic experiment established that DNA replication is semiconservative:
the parental double helix unwinds as hydrogen bonds between complementary base pairs break,
and each new daughter duplex is built from one original (conserved) parental strand paired
with one newly synthesised strand -- not two entirely new strands, and not a base-by-base
pairing of "like with like" (each base pairs with its complementary partner, not an identical
copy of itself).

## explicit_objective
State that DNA replication is semiconservative, with each daughter molecule retaining one
original parental strand.

## pitfalls
Describing replication as each base pairing "with another base exactly like it" -- bases pair
with their complementary partner (A-T, G-C), not with an identical base.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-DNA-REPLICATION-MACHINERY

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.75

## clinical_relevance
0.15

## academic_relevance
0.8

## module_subject
O6U-IMB-104 > Molecular Biology > DNA replication machinery

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p7 | O6U-IMB-104

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
Q1: Which of the following statements about DNA replication is NOT correct? (answer:
Replication occurs as each base is paired with another base exactly like it -- the false
statement; replication is semiconservative and pairs complementary, not identical, bases)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
DNA replication machinery
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
CON-FND-4A6E756909C898

## label
Topoisomerases remove supercoiling ahead of the replication fork

## canonical_key
replication.topoisomerase.removes-supercoiling

## definition
Unwinding the DNA double helix ahead of an advancing replication fork introduces positive
supercoiling downstream, which would otherwise stall the fork. Topoisomerases relieve this
strain by transiently cutting one strand (type I) or both strands (type II) of the DNA,
allowing controlled rotation or strand passage, and then resealing the break -- distinct from
helicases (which unwind the duplex itself) and primases (which lay down RNA primers).

## explicit_objective
State that topoisomerases relieve supercoiling ahead of the replication fork by transiently
cutting and resealing DNA strands.

## pitfalls
Confusing topoisomerase's role with helicase's -- helicase unwinds the double helix at the
fork, while topoisomerase relieves the supercoiling that unwinding generates further ahead.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-DNA-REPLICATION-MACHINERY

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.15

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > DNA replication machinery

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p7 | O6U-IMB-104

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
Q4: Which enzymes remove supercoiling in replicating DNA ahead of the replication fork?
(answer: Topoisomerases)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
DNA replication machinery
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
CON-FND-AF995E4E4F2632

## label
Okazaki fragments are the short DNA segments formed during lagging-strand synthesis

## canonical_key
replication.lagging-strand.okazaki-fragments

## definition
Because DNA polymerase synthesises only 5' to 3', the lagging strand cannot be copied
continuously toward the fork the way the leading strand is; instead it is made
discontinuously, as a series of short DNA fragments (Okazaki fragments), each primed by its
own short RNA primer, that are later joined by DNA ligase after the primers are removed and
replaced with DNA. Okazaki fragments are DNA (once RNA primers are replaced), not RNA or a
mixture requiring no further processing.

## explicit_objective
State that Okazaki fragments are the short, discontinuously synthesised segments of the
lagging strand, each requiring its own RNA primer.

## pitfalls
Thinking Okazaki fragments occur on the leading strand too -- only the lagging strand is
synthesised discontinuously; the leading strand is made continuously.

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
CON-FND-D59A3CF709A33F

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-DNA-REPLICATION-MACHINERY

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.15

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > DNA replication machinery

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p8 | O6U-IMB-104

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
Q9: Okasaki fragments are formed during the synthesis of: (answer: DNA)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
DNA replication machinery
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
CON-FND-CC3CBABC81CEEF

## label
Telomerase is not involved in prokaryotic replication

## canonical_key
replication.telomerase.absent-in-prokaryotes

## definition
Telomerase solves the "end-replication problem" created by linear eukaryotic chromosomes,
extending the repetitive telomeric sequence at chromosome ends so the lagging strand has room
to be primed and completed. Prokaryotic chromosomes are circular and so have no ends to
erode, meaning prokaryotic replication has no need for -- and does not use -- telomerase; the
enzymes prokaryotic replication does depend on include DNA polymerase III (the main
replicase), DNA polymerase I (primer removal/gap filling) and primase.

## explicit_objective
State that telomerase is absent from prokaryotic replication because circular prokaryotic
chromosomes have no ends to protect.

## pitfalls
Assuming every eukaryotic-replication enzyme has a prokaryotic counterpart -- telomerase is
specific to linear chromosomes and so is absent in prokaryotes entirely, not merely renamed.

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
CON-FND-4494B4E0E50179

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-DNA-REPLICATION-MACHINERY

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.2

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > DNA replication machinery

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p8 | O6U-IMB-104

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
Q11: One of the following is not involved in prokaryotic replication: (answer: Telomerase)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
DNA replication machinery
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
CON-FND-4494B4E0E50179

## label
Telomerase is a eukaryotic reverse transcriptase carrying its own RNA template

## canonical_key
replication.telomerase.rna-template-reverse-transcriptase

## definition
Telomerase is a ribonucleoprotein enzyme present only in eukaryotic cells that carries its
own internal RNA template and uses reverse-transcriptase activity to extend the 3' end of the
lagging-strand template at chromosome ends with new telomeric repeats. It does not simply
"elongate the leading strand" -- its job is specifically to lengthen the 3' overhang that the
lagging strand's own machinery cannot complete, solving the end-replication problem rather
than substituting for ordinary leading-strand synthesis.

## explicit_objective
List telomerase's true characteristics (eukaryote-only, carries an RNA template, acts as
reverse transcriptase) and reject the false one commonly paired with them (that it elongates
the leading strand).

## pitfalls
Assuming telomerase elongates "the leading strand" because it is associated with chromosome
ends -- it specifically addresses the lagging-strand end-replication problem, not leading-
strand synthesis.

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
CON-FND-CC3CBABC81CEEF, CON-FND-698A8FBBAD3E4C

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-DNA-REPLICATION-MACHINERY

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.25

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > DNA replication machinery

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p8 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q12: One of the following is not a characteristic of telomerase: (answer: Elongates the
leading strand -- the false statement; the true characteristics are eukaryote-only, carries a
single-stranded RNA template, and acts as a reverse transcriptase)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
DNA replication machinery
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
CON-FND-D59A3CF709A33F

## label
DNA ligase joins the nicks left between DNA fragments

## canonical_key
replication.dna-ligase.joins-nicks

## definition
DNA ligase catalyses formation of a phosphodiester bond between a free 3'-OH and an adjacent
5'-phosphate, sealing the nick that remains after Okazaki fragments are joined (once their
RNA primers are removed and replaced with DNA) or after DNA repair fills a gap. Without
ligase, the lagging strand would remain a series of unconnected fragments rather than a
continuous strand.

## explicit_objective
State that DNA ligase seals nicks by forming a phosphodiester bond between adjacent DNA
fragments.

## pitfalls
Confusing DNA ligase's nick-sealing role with DNA polymerase's role of filling gaps with new
nucleotides -- ligase seals the final bond once the gap is already filled.

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
CON-FND-AF995E4E4F2632

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-DNA-REPLICATION-MACHINERY

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.15

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > DNA replication machinery

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p9 | O6U-IMB-104

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
Q19: The enzyme used to join nicks of DNA is: (answer: DNA ligase)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
DNA replication machinery
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
CON-FND-698A8FBBAD3E4C

## label
The telomere is the repetitive DNA stretch at the tips of eukaryotic chromosomes

## canonical_key
chromosome.telomere.definition

## definition
Telomeres are repetitive, non-coding DNA sequences (in humans, TTAGGG repeats) capping both
ends of every linear eukaryotic chromosome. They protect coding sequence from the end-
replication problem and from being mistaken for a double-strand break by DNA-repair
machinery; they shorten with each round of replication in most somatic cells (since ordinary
replication cannot fully copy the very end of a linear template) unless telomerase is active
to replenish them.

## explicit_objective
Identify the telomere as the repetitive DNA sequence at the tips of eukaryotic chromosomes,
distinct from the centromere or kinetochore.

## pitfalls
Confusing the telomere (chromosome-end sequence) with the centromere (spindle-attachment
site) -- both are specialised chromosomal regions, but only the telomere sits at the tips.

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
CON-FND-4494B4E0E50179

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-DNA-REPLICATION-MACHINERY

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.2

## academic_relevance
0.7

## module_subject
O6U-IMB-104 > Molecular Biology > DNA replication machinery

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p10 | O6U-IMB-104

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
Q22: What is the name of the unusual repeated stretch of DNA localized at the tips of all
eukaryotic chromosomes? (answer: Telomere)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
DNA replication machinery
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
CON-FND-C04D07F4DF56F9

## label
mRNA is synthesised complementary to one strand of DNA (the template strand)

## canonical_key
transcription.mrna.complementary-to-template-strand

## definition
RNA polymerase reads one strand of the DNA duplex -- the template (antisense) strand -- 3' to
5', synthesising mRNA 5' to 3' as the complement of that template. The resulting mRNA
sequence is therefore identical to the other, non-template (coding/sense) strand, except with
uracil replacing thymine; only one DNA strand is copied per gene, not both, and the mRNA is
not identical to the parental DNA duplex.

## explicit_objective
State that mRNA is synthesised complementary to the DNA template strand, and matches the
coding strand's sequence (U for T).

## pitfalls
Saying mRNA is "identical to the parent DNA" -- it is complementary to the template strand
and only sequence-identical (U for T) to the non-template coding strand.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSCRIPTION-MECHANISM

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.75

## clinical_relevance
0.15

## academic_relevance
0.8

## module_subject
O6U-IMB-104 > Molecular Biology > Transcription mechanism

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p12 | O6U-IMB-104

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
Q1: In transcription (answer: The mRNA produced is complementary to one strand of the DNA)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Transcription mechanism
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
CON-FND-D3FBC7B48EAA6A

## label
A promoter is the specific DNA sequence to which RNA polymerase binds

## canonical_key
transcription.promoter.rna-polymerase-binding-site

## definition
A promoter is a defined DNA sequence, typically upstream of a gene's transcription start
site, that RNA polymerase (in eukaryotes, with the help of general transcription factors)
recognises and binds to initiate transcription. It is not the binding site for DNA polymerase
(which acts in replication) or for a restriction endonuclease (a laboratory/bacterial
defence enzyme unrelated to normal transcription).

## explicit_objective
Define a promoter as the DNA sequence to which RNA polymerase binds to begin transcription.

## pitfalls
Confusing the promoter (an RNA-polymerase binding site) with an origin of replication (a DNA-
polymerase-associated site) -- both are functional DNA sequences but serve different enzymes.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSCRIPTION-MECHANISM

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.1

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Transcription mechanism

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p12 | O6U-IMB-104

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
Q3: What is a promoter? (answer: A specific sequence of DNA to which RNA polymerase binds)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Transcription mechanism
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
CON-FND-38425D0DF4BCF8

## label
The rho factor recognises the termination signal for prokaryotic transcription

## canonical_key
transcription.termination.rho-factor-prokaryotic

## definition
Prokaryotic transcription termination is either rho-independent (a GC-rich hairpin followed
by a U-rich stretch destabilises the RNA-DNA hybrid) or rho-dependent, in which the protein
rho factor tracks along the nascent mRNA, catches up to a paused RNA polymerase at a
termination signal, and unwinds the RNA-DNA hybrid to release the transcript. Rho factor,
not the polymerase's alpha or beta subunit, is the component that specifically recognises
this class of termination signal.

## explicit_objective
State that rho factor recognises the termination signal in rho-dependent prokaryotic
transcription termination.

## pitfalls
Attributing termination recognition to the RNA polymerase's core subunits (alpha/beta)
instead of rho -- those subunits carry out catalysis, not rho-dependent termination
recognition.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSCRIPTION-MECHANISM

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.1

## academic_relevance
0.7

## module_subject
O6U-IMB-104 > Molecular Biology > Transcription mechanism

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p12 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q5: The termination signal for prokaryotic transcription is recognized by: (answer: Rho
factor)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Transcription mechanism
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
CON-FND-B36D3CE92611F0

## label
RNA polymerase II synthesises mRNA in eukaryotes

## canonical_key
transcription.eukaryotic-rna-polymerases.pol-ii-mrna

## definition
Eukaryotic cells split transcription across three nuclear RNA polymerases by product: RNA
polymerase I makes the large ribosomal RNAs (28S, 18S, 5.8S), RNA polymerase II makes mRNA
(and some small nuclear RNAs), and RNA polymerase III makes tRNA, 5S rRNA and other small
RNAs. Only RNA polymerase II is sensitive to low-dose alpha-amanitin, a distinguishing
pharmacological feature reflecting its unique role in protein-coding gene transcription.

## explicit_objective
State that RNA polymerase II is the eukaryotic enzyme responsible for synthesising mRNA.

## pitfalls
Mixing up which polymerase makes which RNA class -- remembering "I is for the big rRNAs, II
is for mRNA, III is for the small RNAs" avoids the swap.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSCRIPTION-MECHANISM

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.75

## clinical_relevance
0.2

## academic_relevance
0.8

## module_subject
O6U-IMB-104 > Molecular Biology > Transcription mechanism

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p13 | O6U-IMB-104

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
Q8: In eukaryotes, synthesis of mRNA is catalyzed by: (answer: RNA polymerase II)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Transcription mechanism
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
CON-FND-281410B07A099F

## label
mRNA splicing removes introns and joins exons

## canonical_key
transcription.mrna-processing.splicing-removes-introns

## definition
Splicing is a post-transcriptional processing step, carried out by the spliceosome on pre-
mRNA in the nucleus, that excises non-coding intron sequences and ligates the flanking coding
exon sequences together. It is the reverse of a common misreading (which swaps intron and
exon): introns are cut out, exons are joined, not the other way round, and splicing does not
itself require DNA ligase (an enzyme used in DNA repair/replication, not RNA processing).

## explicit_objective
State that mRNA splicing removes introns and joins exons together.

## pitfalls
Swapping "intron" and "exon" in describing splicing -- introns are the pieces removed, exons
are the pieces joined.

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
CON-FND-078CD69F4559A5

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSCRIPTION-MECHANISM

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.2

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Transcription mechanism

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p13 | O6U-IMB-104

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
Q10: mRNA splicing: (answer: It is cutting of introns and joining of exons)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Transcription mechanism
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
CON-FND-8F65FF7C5FF030

## label
Actinomycin D inhibits transcription

## canonical_key
transcription.inhibitors.actinomycin-d

## definition
Actinomycin D intercalates into double-stranded DNA at GC-rich sites, physically blocking RNA
polymerase from moving along the template and so inhibiting transcription (at higher doses it
can also block DNA replication). It is used experimentally to distinguish transcription-
dependent processes from those that do not require new RNA synthesis, and clinically as an
antineoplastic agent for certain paediatric and gestational tumours.

## explicit_objective
State that actinomycin D inhibits transcription by intercalating into DNA and blocking RNA
polymerase.

## pitfalls
Confusing actinomycin D (a transcription inhibitor) with translation inhibitors such as
puromycin or protein synthesis-blocking antibiotics.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSCRIPTION-MECHANISM

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.4

## academic_relevance
0.6

## module_subject
O6U-IMB-104 > Molecular Biology > Transcription mechanism

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p14 | O6U-IMB-104

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
Q16: Actinomycin D is an inhibitor of: (answer: Transcription)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Transcription mechanism
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
CON-FND-078CD69F4559A5

## label
The spliceosome is the macromolecular complex that carries out mRNA splicing

## canonical_key
transcription.mrna-processing.spliceosome

## definition
The spliceosome is a large ribonucleoprotein complex, assembled from five small nuclear
ribonucleoproteins (snRNPs: U1, U2, U4, U5, U6) plus associated proteins, that recognises
intron-exon boundaries on pre-mRNA and catalyses the two transesterification reactions that
excise the intron and join the flanking exons. It associates transiently with each intron as
splicing proceeds, distinct from the ribosome (translation) or a generic "nuclear body".

## explicit_objective
Identify the spliceosome as the complex responsible for mRNA splicing.

## pitfalls
Confusing the spliceosome (splices pre-mRNA in the nucleus) with the ribosome (translates
mRNA in the cytoplasm) -- both are large RNA-protein complexes but act at different stages.

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
CON-FND-281410B07A099F

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSCRIPTION-MECHANISM

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.15

## academic_relevance
0.7

## module_subject
O6U-IMB-104 > Molecular Biology > Transcription mechanism

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p14 | O6U-IMB-104

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
Q22: What is the macromolecular complex that associates with introns during mRNA splicing?
(answer: Spliceosomes)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Transcription mechanism
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
CON-FND-BBF949779FBADE

## label
Translation does not occur in the eukaryotic cell nucleus

## canonical_key
translation.location.not-in-nucleus

## definition
Eukaryotic gene expression is spatially split: transcription, intron removal (splicing) and
DNA replication all occur inside the nucleus, but translation -- decoding mature mRNA into
protein on ribosomes -- happens after the mRNA is exported to the cytoplasm (or, for secreted/
membrane proteins, at the rough endoplasmic reticulum). This nuclear/cytoplasmic separation
is a defining feature distinguishing eukaryotic from prokaryotic gene expression, where
transcription and translation are not separated and can occur simultaneously.

## explicit_objective
State that translation occurs in the cytoplasm, not the eukaryotic nucleus, unlike
transcription, splicing and replication.

## pitfalls
Assuming all steps of gene expression happen in the nucleus because DNA is nuclear --
translation specifically requires cytoplasmic ribosomes and does not occur in the nucleus.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSLATION-AND-MUTATION

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.15

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Translation and mutation

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p17 | O6U-IMB-104

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
Q1: One of the following processes DOES NOT occur in the eukaryotic cell nucleus: (answer:
translation)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Translation and mutation
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
CON-FND-E8E7F8C31A3828

## label
AUG is the polypeptide chain-initiating codon (coding for methionine)

## canonical_key
translation.codons.aug-initiation

## definition
AUG is both the codon for methionine and, positioned appropriately relative to the ribosome
binding site, the signal that initiates translation -- ribosomes assemble at an AUG start
codon and begin reading the mRNA in that frame. AUG is not a releasing/terminating codon (that
role belongs to UAA, UAG, UGA) and is not itself a tRNA recognition site independent of its
codon-anticodon pairing role.

## explicit_objective
State that AUG, the codon for methionine, is the polypeptide chain-initiating codon.

## pitfalls
Confusing AUG's initiating role with a terminating role -- termination uses the three stop
codons (UAA, UAG, UGA), none of which is AUG.

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
CON-FND-3946D5DB4E7374

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSLATION-AND-MUTATION

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.75

## clinical_relevance
0.15

## academic_relevance
0.8

## module_subject
O6U-IMB-104 > Molecular Biology > Translation and mutation

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p17 | O6U-IMB-104

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
Q3: AUG, the only codon for methionine is important as: (answer: A polypeptide chain
initiating codon)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Translation and mutation
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
CON-FND-3946D5DB4E7374

## label
UAA, UAG and UGA are the three chain-terminating (stop) codons

## canonical_key
translation.codons.stop-codons-uaa-uag-uga

## definition
Three of the genetic code's 64 codons -- UAA, UAG and UGA -- do not specify an amino acid and
instead signal the ribosome to terminate translation, releasing the completed polypeptide (no
tRNA normally recognises these codons; release factors bind them instead). All three, not
just one, function as stop codons, distinguishing them from the single AUG start codon.

## explicit_objective
List UAA, UAG and UGA as the three chain-terminating codons in protein biosynthesis.

## pitfalls
Assuming there is only one stop codon by analogy with the single AUG start codon -- there are
three (UAA, UAG, UGA), each recognised by release factors rather than a tRNA.

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
CON-FND-E8E7F8C31A3828

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSLATION-AND-MUTATION

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.15

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Translation and mutation

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p17 | O6U-IMB-104

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
Q4: In biosynthesis of proteins the chain terminating codons are: (answer: UAA, UAG and UGA)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Translation and mutation
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
CON-FND-9B70431B1EA357

## label
Transfer RNA carries amino acids from the cytosol to the ribosome

## canonical_key
translation.trna.amino-acid-delivery

## definition
Each aminoacyl-tRNA synthetase charges a specific tRNA with its matching amino acid in the
cytosol; that charged tRNA then delivers the amino acid to the ribosome, where its anticodon
pairs with the corresponding mRNA codon so the amino acid can be added to the growing
polypeptide chain. tRNA does not carry information from DNA to the ribosome (mRNA does that)
and does not carry finished proteins away from the ribosome.

## explicit_objective
State that tRNA's role is delivering amino acids from the cytosol to the ribosome, matched to
mRNA codons via its anticodon.

## pitfalls
Confusing tRNA's amino-acid-delivery role with mRNA's information-carrying role -- mRNA
carries the DNA-derived sequence information, tRNA carries the amino acids.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSLATION-AND-MUTATION

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.15

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Translation and mutation

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p17 | O6U-IMB-104

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
Q7: Transfer RNA transfers: (answer: Amino acids from cytosol to ribosomes)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Translation and mutation
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
CON-FND-C385DC83D44478

## label
Sickle cell anaemia is caused by a missense mutation

## canonical_key
mutation.sickle-cell.missense

## definition
Sickle cell anaemia results from a single point mutation in the beta-globin gene (GAG to GTG)
that changes codon 6 from glutamic acid to valine -- a missense mutation, since the codon
still specifies an amino acid, just a different one. This single amino-acid substitution
changes haemoglobin's surface chemistry enough to make deoxygenated haemoglobin S polymerise,
producing the sickle-shaped red cells that define the disease.

## explicit_objective
State that sickle cell anaemia is caused by a missense mutation substituting valine for
glutamic acid at position 6 of beta-globin.

## pitfalls
Calling the sickle-cell mutation "nonsense" because it changes the protein's behaviour
drastically -- a nonsense mutation creates a premature stop codon, which is not what happens
here; the codon still encodes an amino acid (just the wrong one), making it missense.

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
CON-FND-740DFBCB79F5FD

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSLATION-AND-MUTATION

## learner_years
1

## universities
o6u

## blueprint_weight
0.55

## exam_weight_by_year
O6U_Y1=0.8

## clinical_relevance
0.7

## academic_relevance
0.7

## module_subject
O6U-IMB-104 > Molecular Biology > Translation and mutation

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p18 | O6U-IMB-104

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
Q10: Sickle cell anemia is due to: (answer: Missense mutation)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Translation and mutation
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
CON-FND-740DFBCB79F5FD

## label
A silent mutation does not change the encoded protein's amino acid sequence

## canonical_key
mutation.types.silent-no-sequence-change

## definition
A silent mutation changes a base in a codon but, because the genetic code is degenerate (most
amino acids have more than one codon), the new codon still specifies the same amino acid --
so the resulting protein's sequence is unchanged. This distinguishes silent mutations from
missense (different amino acid), nonsense (premature stop) and frame-shift (reading-frame
disruption) mutations, all of which do alter the protein.

## explicit_objective
State that a silent mutation leaves the encoded protein's amino acid sequence unchanged,
because the genetic code's degeneracy allows a different codon for the same amino acid.

## pitfalls
Assuming any base change must alter the protein -- codon degeneracy means a silent mutation
changes the DNA/mRNA sequence without changing the amino acid sequence.

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
CON-FND-C385DC83D44478

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSLATION-AND-MUTATION

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.2

## academic_relevance
0.75

## module_subject
O6U-IMB-104 > Molecular Biology > Translation and mutation

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p18 | O6U-IMB-104

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
Q12: The amino acid sequence of the encoded protein is not changed in: (answer: Silent
mutation)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Translation and mutation
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
CON-FND-ED491160A0F62F

## label
A codon is the three-base genetic code word on mRNA specifying one amino acid

## canonical_key
translation.codon.definition

## definition
A codon is a sequence of three consecutive mRNA bases that specifies either a single amino
acid or a stop signal during translation; with 4 possible bases per position, there are 4^3 =
64 possible codons, covering the 20 standard amino acids (with redundancy/degeneracy) plus
the three stop codons. A codon is not a protein, not a free-floating base, and not the
hydrogen bond between two paired bases -- it is specifically the three-base mRNA unit read by
the ribosome/tRNA.

## explicit_objective
Define a codon as the three-base sequence on mRNA that specifies one amino acid (or a stop
signal).

## pitfalls
Describing a codon as a bond or a single base -- a codon is specifically a three-base
sequence, not a bond or an isolated nucleotide.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-TRANSLATION-AND-MUTATION

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.75

## clinical_relevance
0.15

## academic_relevance
0.8

## module_subject
O6U-IMB-104 > Molecular Biology > Translation and mutation

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p20 | O6U-IMB-104

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
Q25: Which defines a codon? (answer: The genetic code word of three bases on mRNA that
specify one amino acid)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Translation and mutation
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
CON-FND-EA96433F08AA98

## label
Nucleosomes affect transcription by recruiting histone- and DNA-modifying enzymes

## canonical_key
gene-regulation.nucleosome.recruits-modifying-enzymes

## definition
Nucleosome formation on genomic DNA does not simply block transcription outright; instead,
nucleosomes recruit histone-modifying enzymes (e.g. histone acetyltransferases/deacetylases)
and DNA-modifying enzymes (e.g. DNA methyltransferases), and it is the actions of those
recruited enzymes -- loosening or tightening chromatin -- that in turn determine how
accessible the DNA is to the transcription machinery. Nucleosomes do not induce DNA
degradation at histone-contact points, and their effect on transcription is regulatory, not a
uniform, unconditional block.

## explicit_objective
State that nucleosomes influence transcription indirectly, by recruiting histone- and DNA-
modifying enzymes whose activity then affects chromatin accessibility.

## pitfalls
Assuming nucleosomes simply and always block all transcription machinery access -- their real
effect is mediated through the modifying enzymes they recruit, which can open as well as
close chromatin.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-GENE-EXPRESSION-REGULATION

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.15

## academic_relevance
0.7

## module_subject
O6U-IMB-104 > Molecular Biology > Gene expression regulation

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p23 | O6U-IMB-104

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_15a36a801ec0b4a6705d

## related_article_ids
[clear]

## original_wording
Q1: How does nucleosome formation on genomic DNA affect the initiation and/or elongation
phases of transcription? (answer: Nucleosomes recruit histone and DNA modifying enzymes, and
the actions of these recruited enzymes affect the access of transcription proteins to DNA)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Gene expression regulation
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
CON-FND-EAC8B4F85820B3

## label
The 5' untranslated region (5'UTR) spans from the mRNA cap to the AUG initiation codon

## canonical_key
gene-regulation.mrna.5utr-definition

## definition
Mature eukaryotic mRNA carries a 5' untranslated region (5'UTR) between its 5' 7-
methylguanosine cap and the AUG start codon -- sequence that is transcribed and remains in
the mature transcript but is not itself translated into protein. It often contains regulatory
elements (e.g. upstream ORFs, internal ribosome entry sites, iron-response elements) that
influence how efficiently the downstream coding sequence is translated, distinct from the 3'
untranslated region that follows the stop codon.

## explicit_objective
Identify the 5'UTR as the sequence between the mRNA cap and the AUG initiation codon.

## pitfalls
Confusing the 5'UTR (before the start codon) with the 3'UTR (after the stop codon, before the
poly-A tail) -- both are untranslated but sit on opposite ends of the coding sequence.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-GENE-EXPRESSION-REGULATION

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.15

## academic_relevance
0.7

## module_subject
O6U-IMB-104 > Molecular Biology > Gene expression regulation

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p23 | O6U-IMB-104

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
Q4: Which sequences extend between the 5'methylguanosine cap present on a eukaryotic mRNAs to
the AUG initiation codon? (answer: 5'UTR)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Gene expression regulation
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
CON-FND-FE453FEC0616A5

## label
microRNAs silence gene expression; they do not increase target mRNA expression

## canonical_key
gene-regulation.mirna.silencing-not-increasing-expression

## definition
MicroRNAs (miRNAs) are small (~22-nucleotide) non-coding RNAs, produced from their own genes
or from introns, that mediate RNA silencing and post-transcriptional gene regulation: by
base-pairing (often imperfectly) with complementary sequences in target mRNAs, a single miRNA
can bind and regulate several hundred different mRNAs, typically decreasing their stability or
translation. A miRNA does not increase its target's expression -- that reverses its
characteristic silencing function.

## explicit_objective
State that miRNAs decrease (silence), not increase, expression of the target mRNAs they bind.

## pitfalls
Assuming miRNA binding always increases target expression because it is a regulatory
interaction -- miRNA-mediated regulation is characteristically silencing/repressive, not
activating.

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
[clear]

## modules
O6U-IMB-104

## article_ids
ART-O6U-IMB-GENE-EXPRESSION-REGULATION

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.25

## academic_relevance
0.65

## module_subject
O6U-IMB-104 > Molecular Biology > Gene expression regulation

## exam_signal
src_15a36a801ec0b4a6705d | paper | | p24 | O6U-IMB-104

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
Q9: Concerning micro RNAs (miRNAs) one of the following statements is Incorrect: (answer:
Each miRNA can interact with several hundred mRNAs increasing expression of the target mRNA
-- the false statement; miRNAs silence/decrease, not increase, target expression)

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
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
Molecular Biology
## subtopic
Gene expression regulation
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
