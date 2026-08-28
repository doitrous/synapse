# Item

## id
CON-FND-6D0BFB1CD8B9A3

## label
Prokaryotic translation initiation binds the 30S subunit to the Shine-Dalgarno sequence by base pairing, and starts with formylmethionyl-tRNA entering the P site directly

## canonical_key
translation.initiation.prokaryotic-30s-shine-dalgarno-fmet

## aliases
Shine-Dalgarno sequence
fMet-tRNA
30S initiation complex
Prokaryotic translation initiation

## arabic_label
بدء الترجمة البكتيري وتسلسل شاين-دالجارنو

## arabic_aliases
تسلسل شاين-دالجارنو

## definition
In bacteria, translation initiation begins when the 30S ribosomal subunit binds directly to the mRNA — specifically to the Shine-Dalgarno sequence, a purine-rich stretch a few bases upstream of the AUG start codon that base-pairs (hydrogen bonds) with a complementary sequence near the 3' end of 16S rRNA. This positions the small subunit at the correct start codon without needing a 5' cap the way eukaryotes do. The initiating aminoacyl-tRNA in bacteria carries N-formylmethionine (fMet-tRNAfMet) rather than plain methionine, and — unlike every elongator aminoacyl-tRNA, which must first enter the A site — this initiator tRNA is loaded directly into the P site, together with the small subunit, before the 50S subunit joins to complete the 70S initiation complex.

## explicit_objective
State that prokaryotic initiation begins with 30S-subunit binding to the Shine-Dalgarno sequence by base pairing (hydrogen bonds) with 16S rRNA, and that the initiator fMet-tRNA enters the P site directly rather than via the A site.

## pitfalls
Assuming the bacterial initiator tRNA enters the ribosome the same way an elongator tRNA does, via the A site — the initiator tRNA (fMet-tRNAfMet) is the one exception, loaded straight into the P site during initiation. Also assuming bacteria use plain methionine to start translation the way eukaryotes do — bacteria initiate specifically with the formylated form.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Translation

## microtopic
Prokaryotic translation initiation

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-TRANSLATION-APPARATUS-DEEPENED

## related_article_ids
ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION

## related_concept_ids
CON-FND-CC6BAFEE04D3F8

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## atomic_claim_ids
CLM-FND-PROKARYOTIC-INITIATION-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The 1st amino acid in initiation of protein synthesis in E-coli is: a- N-formyl methionine."
"Initiation of protein synthesis in prokaryotes begins with binding of: a- 30S ribosomal unit on mRNA."
"What kind of interactions results in the binding of mRNA and the ribosome? d- Hydrogen bond."
"In case of prokaryotes the first initiator tRNA enters the ribosome in the: b- P site."
"The first amino acid to be incorporated in the prokaryotic polypeptide is: c- N-formyl methionine."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication. This concept rests on the module's tier-3 tutoring compilation only; the mechanism (Shine-Dalgarno base pairing, fMet-tRNA, direct P-site entry) is standard undergraduate molecular biology taught in every standard textbook (e.g. Lehninger, Molecular Biology of the Gene), but no specific textbook page has been verified and cited this pass.

## owner
Admin team

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
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored per this session's dispatch (resume-first: Translation chapter); this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "formylmethionine", "30S ribosomal subunit binds mRNA" and "Shine-Dalgarno" before minting (find-existing.mjs) — zero hits anywhere; the one existing initiation concept in the corpus (CON-FND-CC6BAFEE04D3F8) is explicitly eukaryotic-only and its own pitfalls note states formylmethionine "does not appear in this chapter's account" — genuinely untaught prokaryotic-side territory, not just under-detailed.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Related to CON-FND-CC6BAFEE04D3F8 (eukaryotic initiation) as the prokaryotic contrast half of the same initiation step.
scopeRuling: Authored this pass — 5 of the Translation chapter's 65 banked questions (Q10, Q28, Q38, Q39, Q40) test exactly this fact set (fMet, 30S/mRNA binding, hydrogen-bond mRNA-ribosome interaction, P-site entry) and no wider.

---

# Item

## id
CON-FND-8C0EB47D70D27A

## label
The ribosome's third site, the E site, receives the deacylated tRNA vacated from the P site during translocation, and in a polysome the ribosome nearest the mRNA's 3' end has synthesized the longest peptide

## canonical_key
translation.elongation.e-site-and-polysome-directionality

## aliases
E site
Exit site
Polysome directionality

## arabic_label
موقع الخروج E وترتيب الريبوسومات في المتعدد الريبوسومي

## arabic_aliases
موقع الخروج

## definition
The elongating ribosome has three tRNA-binding sites, not two: the A (aminoacyl) site receives each new charged tRNA, the P (peptidyl) site holds the tRNA carrying the growing chain, and the E (exit) site is where the spent, deacylated tRNA sits immediately before it leaves the ribosome. During each translocation step the ribosome moves exactly one codon (three nucleotides) toward the mRNA's 3' end: the tRNA that had been in the A site (now carrying the peptide) moves into the P site, and, simultaneously, the tRNA that had been in the P site (now empty of its amino acid) moves into the E site, from which it then dissociates. Because translation reads the mRNA 5' to 3' and each ribosome that initiated earliest has moved furthest along the message, in a polysome (several ribosomes translating one mRNA at once) the ribosome positioned nearest the mRNA's 3' end is always the one that started first and therefore carries the longest, most nearly complete peptide chain; the ribosome nearest the 5' end has only just begun.

## explicit_objective
Name the E site as the third ribosomal tRNA-binding site and state what moves into it during translocation, and explain why the ribosome nearest a polysome's 3' end carries the longest peptide chain.

## pitfalls
Describing translocation as only a two-site (A-to-P) shift — a complete account also has the vacated P-site tRNA moving into the E site before it leaves the ribosome. Also reversing the polysome logic: the ribosome closest to the 5' end of the mRNA is the newest arrival and has the shortest chain, not the longest.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Translation

## microtopic
Ribosome elongation cycle and polysomes

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-TRANSLATION-APPARATUS-DEEPENED

## related_article_ids
ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION

## related_concept_ids
CON-FND-9A1437CD0A382C
CON-FND-4284C6B8667CD6

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.25

## exam_weight_by_year
ASU_Y1=0.25

## clinical_relevance
0.15

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.85

## atomic_claim_ids
CLM-FND-E-SITE-POLYSOME-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"In a polysome, which ribosomes will have synthesized the longest peptide chains at any one time: a- The ones nearest the 3' end of the mRNA molecule."
"Which of the following occurs as the ribosome shifts down the mRNA by a distance of three nucleotides? e- the tRNA that was in the P site moves into the E site."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication. This concept rests on the module's tier-3 tutoring compilation only; the three-site (A/P/E) elongation model and polysome directionality are standard undergraduate molecular biology, but no specific textbook page has been verified and cited this pass.

## owner
Admin team

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
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored per this session's dispatch; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "polysome" (found only a definitional histology concept, CON-FND-4284C6B8667CD6, with no directionality fact) and for "ribosome three sites A P E" / "E site" (zero hits anywhere) before minting.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Related to CON-FND-9A1437CD0A382C (Kasr's elongation-cycle concept, which covers A-to-P translocation but not the E site) as the completing half of the same elongation cycle, and to CON-FND-4284C6B8667CD6 (histology polysome definition) as the same structure viewed from a different angle.
scopeRuling: Authored this pass — 2 of the Translation chapter's 65 banked questions (Q6, Q47) test exactly this fact set (polysome chain-length directionality, P-to-E translocation) and no wider.

---

# Item

## id
CON-FND-E5354D98C97340

## label
Peptidyl transferase is a ribozyme — its catalytic activity is carried by ribosomal RNA (28S rRNA in the eukaryotic 60S subunit, 23S rRNA in the prokaryotic 50S subunit), not by a ribosomal protein

## canonical_key
translation.peptidyl-transferase.ribozyme-rrna-identity

## aliases
Ribozyme
28S rRNA peptidyl transferase
23S rRNA peptidyl transferase

## arabic_label
بيبتيديل ترانسفيراز كإنزيم ريبوزي

## arabic_aliases
الإنزيم الريبوزي

## definition
Peptidyl transferase, the enzymatic activity that forms every peptide bond during translation (and that later hydrolyses the finished polypeptide off its tRNA at termination), is not a protein enzyme. It is a ribozyme — its catalytic activity resides in ribosomal RNA itself, specifically the large-subunit rRNA: 28S rRNA in the eukaryotic 60S subunit, and the corresponding 23S rRNA in the prokaryotic 50S subunit. This makes peptidyl transferase, alongside ribonuclease P and self-splicing introns, one of the classic examples proving that RNA, not only protein, can catalyse biological reactions.

## explicit_objective
State that peptidyl transferase activity is RNA-based (a ribozyme), not protein-based, and name 28S rRNA (eukaryotic 60S) and 23S rRNA (prokaryotic 50S) as its molecular identity.

## pitfalls
Assuming peptidyl transferase must be a protein because it is an enzyme, or naming a ribosomal protein as its catalytic component. The correct answer is RNA catalysis — a ribozyme — carried inside the large subunit's rRNA, not a distinct protein enzyme.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Translation

## microtopic
Peptidyl transferase

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-TRANSLATION-APPARATUS-DEEPENED

## related_article_ids
ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION

## related_concept_ids
CON-FND-9A1437CD0A382C
CON-FND-38857DFD506559

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## atomic_claim_ids
CLM-FND-PEPTIDYL-TRANSFERASE-RIBOZYME-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Name the enzyme that forms the peptide bond during protein synthesis and define its chemical composition: c- Peptidyl transferase, RNA."
"Peptidyl transferase enzyme has which of the following RNA in Eukaryotes: c- 28S rRNA."
"Peptidyl transferase enzyme has which of the following RNA in Prokaryotes: b- 23S rRNA."
"Which of the following is a ribozyme? d- Peptidyl transferase."
"Regarding peptidyl transferase enzyme: c- It is an RNA that has inherent catalytic activity."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication. This concept rests on the module's tier-3 tutoring compilation only; the ribozyme identity of peptidyl transferase and its 28S/23S rRNA location are standard undergraduate molecular biology, but no specific textbook page has been verified and cited this pass.

## owner
Admin team

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
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored per this session's dispatch; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "peptidyl transferase" before minting — 8 hits found (see find-existing.mjs output), all covering peptidyl transferase's location (60S subunit) or its termination role, none naming the specific 28S/23S rRNA identity or explicitly framing it as a ribozyme distinct from a protein enzyme — genuinely untaught territory, not a duplicate of the existing 60S-location facts (which remain overlaid separately onto CON-FND-9A1437CD0A382C for the simpler subunit-location questions in this same chapter).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Related to CON-FND-9A1437CD0A382C (elongation cycle, states 60S location but not rRNA identity) and CON-FND-38857DFD506559 (termination, states 60S location but not rRNA identity) as the deeper molecular-identity fact underlying both.
scopeRuling: Authored this pass — 5 of the Translation chapter's 65 banked questions (Q23, Q24, Q27, Q53, Q64) test exactly this fact set (ribozyme nature, RNA composition, 28S/23S rRNA identity) and no wider.

---

# Item

## id
CON-FND-02E8733D78D5DC

## label
Aminoacyl-tRNA synthetases, not the ribosome itself, are the primary guarantee of translational fidelity — each of the 20 is specific for one amino acid and its cognate tRNA, a specificity sometimes called the "second genetic code," while the small ribosomal subunit's decoding center adds a further layer of codon-anticodon proofreading

## canonical_key
translation.fidelity.synthetase-specificity-and-decoding-center

## aliases
Second genetic code
Aminoacyl-tRNA synthetase specificity
Translational fidelity
Decoding center

## arabic_label
دقة الترجمة وخصوصية إنزيم شحن الحمض الأميني

## arabic_aliases
الشفرة الوراثية الثانية

## definition
Faithful translation of the genetic code depends on more than the ribosome alone. The primary safeguard is each aminoacyl-tRNA synthetase's own specificity: there are 20 different synthetases, one per amino acid, and each recognises both its one amino acid and its one matching tRNA with very high accuracy before charging them together — a specificity so central to translational accuracy that it is sometimes called the "second genetic code," because an error made here (attaching the wrong amino acid to a tRNA) would be invisible to every downstream step, which reads only the anticodon, not the amino acid actually carried. A second, smaller safeguard operates at the ribosome itself: the small (40S/30S) ribosomal subunit's decoding center monitors how well each incoming aminoacyl-tRNA's anticodon pairs with the mRNA codon in the A site, rejecting poor matches before a peptide bond can form.

## explicit_objective
Identify aminoacyl-tRNA synthetase specificity as the main determinant of translational fidelity (the "second genetic code"), and the small ribosomal subunit as the site of additional codon-anticodon proofreading.

## pitfalls
Crediting the large ribosomal subunit, or peptidyl transferase, with accuracy-checking — the large subunit's job is peptide bond formation, not fidelity. Codon-anticodon monitoring happens at the small subunit's decoding center, and the deeper safeguard is the synthetase's own specificity before the tRNA ever reaches the ribosome.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Translation

## microtopic
Translational fidelity

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-TRANSLATION-APPARATUS-DEEPENED

## related_article_ids
ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION

## related_concept_ids
CON-FND-89278C7DEE1C9C

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## atomic_claim_ids
CLM-FND-SYNTHETASE-FIDELITY-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following has a proofreading activity? e- all the above [including aminoacyl-tRNA synthetase]."
"Which part is responsible for accuracy of translation: c- Small subunit of ribosome."
"Regarding aminoacyl-tRNA synthetases: e- Its specificity is responsible for the high fidelity of translation of genetic code."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication. This concept rests on the module's tier-3 tutoring compilation only; synthetase specificity and small-subunit decoding are standard undergraduate molecular biology, but no specific textbook page has been verified and cited this pass.

## owner
Admin team

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
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored per this session's dispatch; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "aminoacyl-tRNA synthetase specificity fidelity" and "second genetic code" and "proofreading" before minting — the only proofreading hits found were DNA-polymerase replication-fidelity concepts; the phrase "second genetic code" and any aminoacyl-tRNA-synthetase-proofreading framing appear nowhere in the corpus — genuinely untaught territory. CON-FND-89278C7DEE1C9C (already overlaid separately for this module's charging-mechanism questions) states the 20-synthetases fact but not their fidelity role, so this is not a duplicate.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Related to CON-FND-89278C7DEE1C9C (states there are 20 synthetases but not their fidelity role) as the accuracy dimension of the same enzyme family.
scopeRuling: Authored this pass — 4 of the Translation chapter's 65 banked questions (Q20, Q26, Q54, Q62) test exactly this fact set (synthetase specificity/fidelity, proofreading, decoding-center accuracy) and no wider.

---

# Item

## id
CON-FND-E8FDAF79A38797

## label
Elongation spends four high-energy phosphate bonds per amino acid added — two to activate the amino acid onto its tRNA and one GTP each for aminoacyl-tRNA delivery to the A site and for translocation — while peptide bond formation itself, catalysed by peptidyl transferase, consumes no additional energy

## canonical_key
translation.energetics.four-bonds-per-residue

## aliases
Energetics of translation
High-energy phosphate bonds in protein synthesis
ATP and GTP cost of translation

## arabic_label
الطاقة اللازمة لتصنيع البروتين

## arabic_aliases

## definition
Building a polypeptide costs energy at defined steps, not continuously. Activating a single amino acid onto its tRNA consumes two high-energy phosphate bonds, because aminoacyl-tRNA synthetase hydrolyses ATP all the way to AMP and pyrophosphate (PPi), and the subsequent hydrolysis of that pyrophosphate makes the reaction irreversible — chemically equivalent to spending two ATP-equivalent bonds, not one. Two further GTP molecules are spent for every amino acid added during elongation: one GTP is hydrolysed when the elongation factor delivers the charged aminoacyl-tRNA to the ribosome's A site, and a second GTP is hydrolysed to drive translocation, the step that shifts the ribosome one codon along the mRNA. That totals four high-energy phosphate bonds spent per amino acid incorporated during elongation. Peptide bond formation itself, catalysed by peptidyl transferase, needs no additional energy input at that step — the energy for that bond was already stored earlier, in the high-energy ester bond linking the amino acid to its tRNA. Because the initiating amino acid is activated but not itself added by an elongation cycle, this department's own worked total for a short polypeptide sometimes follows a simplified convention of three bonds per residue (two for activation plus one GTP for ribosome entry, without separately re-counting translocation's GTP) rather than the fuller four-bonds-per-residue tally — for example, arriving at 30 high-energy bonds for a 10-amino-acid chain under the simplified count, versus a higher total under the fuller one. Both conventions appear in different teaching sources; a student should recognise which the question intends from the numbers offered.

## explicit_objective
State that amino acid activation spends two high-energy phosphate bonds, that elongation spends two further GTP per residue (A-site delivery and translocation) for a total of four bonds per amino acid added, and that peptide bond formation itself needs no separate energy input.

## pitfalls
Crediting the peptide-bond-formation step with its own separate energy cost — that step's energy was already paid for when the amino acid was first activated onto its tRNA. Also collapsing the two GTP-consuming steps (A-site delivery and translocation) into one, or omitting activation's two bonds when totalling a chain's energy cost.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Translation

## microtopic
Energetics of translation

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-TRANSLATION-ENERGETICS-GENE-STRUCTURE

## related_article_ids
ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION

## related_concept_ids
CON-FND-89278C7DEE1C9C

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.75

## weight_confidence
0.25

## confidence
0.7

## atomic_claim_ids
CLM-FND-TRANSLATION-ENERGETICS-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"During protein synthesis high energy phosphate bonds are required for the following EXCEPT: a- Peptidyl transferase formation of peptide bond."
"The number of high energy phosphate bonds spent for add one amino acid of proteins is: d- Four."
"The total energy needed to synthesize a polypeptide chain formed from 10 amino acids in prokaryotes is: c- 30."
"Guanosine triphosphate (GTP) is required by which of the following steps in protein synthesis? c- Binding of aminoacyl tRNA to A site."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
The exact arithmetic convention behind the "10 amino acids = 30 bonds" answer key value is not independently verified against a named textbook; the department's key is followed as the local exam-signal source, with the discrepancy against the fuller 4-bonds-per-residue count disclosed rather than silently resolved.

## evidence_gaps
Evidence must be attached before publication. This concept rests on the module's tier-3 tutoring compilation only; the qualitative energy-accounting facts (2 bonds for activation, 2 GTP for elongation, no extra cost for peptide bond formation) are standard undergraduate molecular biology, but the specific "30 bonds for a 10-mer" numeric convention has not been cross-checked against a named textbook this pass.

## owner
Admin team

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
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored per this session's dispatch; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "high energy phosphate bond ATP amino acid activation" before minting — zero hits; the closest existing concept, CON-FND-89278C7DEE1C9C, states the 2-step ATP→AMP+PPi charging mechanism but not the cumulative per-residue or per-chain energy tally, so this is not a duplicate (that concept remains the overlay target for the charging-mechanism-only questions in this chapter).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Related to CON-FND-89278C7DEE1C9C (states the 2-step activation mechanism this concept's energy tally builds on).
scopeRuling: Authored this pass — 4 of the Translation chapter's 65 banked questions (Q1, Q16, Q17, Q30) test exactly this fact set (energy accounting for translation) and no wider. The internal inconsistency between Q16's 4-bonds-per-residue answer and Q17's 30-bonds-for-10-residues answer is the source's own, not introduced here; both are disclosed in the definition and reflected honestly in each question's explanation rather than silently forced to agree.

---

# Item

## id
CON-FND-175BC0480CCD48

## label
Prokaryotic genes are typically polycistronic, and their mRNA carries more than one protein-coding region translated together, while eukaryotic genes are monocistronic, contain introns, and are regulated in part by enhancers

## canonical_key
gene-expression.polycistronic-versus-monocistronic-mrna

## aliases
Polycistronic mRNA
Monocistronic mRNA
Operon

## arabic_label
الرنا المرسال متعدد السيسترونات مقابل أحادي السيسترون

## arabic_aliases
متعدد السيسترونات

## definition
A prokaryotic operon is typically transcribed as one polycistronic mRNA molecule, meaning that single transcript carries more than one protein-coding region and can direct ribosomes to synthesise several different, functionally related proteins from one piece of mRNA. Eukaryotic genes work differently: eukaryotic mRNA is monocistronic, carrying only one protein-coding region per transcript, so eukaryotic translation typically produces only one polypeptide per mRNA molecule. Consistent with this more elaborate, individually regulated gene structure, eukaryotic genes also contain introns (non-coding sequences removed by splicing before translation) and are commonly regulated by enhancers, DNA elements that can act at a distance to influence transcription — features that prokaryotic, polycistronic operons generally lack.

## explicit_objective
Contrast prokaryotic polycistronic mRNA (multiple coding regions per transcript) with eukaryotic monocistronic mRNA (one coding region per transcript, introns present, enhancer-regulated).

## pitfalls
Reversing which domain is polycistronic — it is the prokaryotic operon that packages several coding regions onto one mRNA; eukaryotic genes are monocistronic, one coding region per transcript, plus introns and enhancers that prokaryotic operons generally lack.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Gene expression

## microtopic
Polycistronic and monocistronic mRNA

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-TRANSLATION-ENERGETICS-GENE-STRUCTURE

## related_article_ids

## related_concept_ids

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.15

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.85

## atomic_claim_ids
CLM-FND-POLYCISTRONIC-MONOCISTRONIC-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Eukaryotic mRNA generally codes for a single protein because the eukaryotic translation includes: b- Mono-cistronic codons."
"Which of the following about the differences between the prokaryotic and eukaryotic genes are true? d- Eukaryotic genes are large, monocistronic and contain introns."
"Which one of the following phrases best describes polycistronic mRNA? d- Having more than one protein coding regions."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication. This concept rests on the module's tier-3 tutoring compilation only; polycistronic-versus-monocistronic mRNA structure is standard undergraduate molecular biology, but no specific textbook page has been verified and cited this pass.

## owner
Admin team

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
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored per this session's dispatch; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "monocistronic polycistronic mRNA" before minting — zero hits anywhere in the corpus; a live concept (CON-FND-61E39EDAE8CEB8) covers enhancers generically but not the mono/polycistronic contrast, so not a duplicate.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: No typed-edge relations batch written this pass; deferred to a follow-up relations pass. The live enhancers concept (CON-FND-61E39EDAE8CEB8) is thematically adjacent but not linked here since it is a live record outside this batch's scope to edit.
scopeRuling: Authored this pass — 3 of the Translation chapter's 65 banked questions (Q42, Q49, Q65) test exactly this fact set (polycistronic vs monocistronic mRNA/gene structure) and no wider.
