<!--
  103 BMS · Biochemistry · the seven concepts the purine MCQs test, where
  nothing already authored covers them.

  SEVEN NEW CONCEPTS, and every one of their IDs was fixed before this file was
  written. Each is already named as the `main_concept` of a finished question in
  ../question/103-BMS-MCQ-protein-heme.md, so the IDs are copied from those
  questions verbatim and were not minted here. Three teach purine biosynthesis
  and salvage, four teach uric acid and the disorders of purine metabolism.

    CON-FND-265D369FD41B85  the five sources of the purine ring atoms
    CON-FND-DB8B4EFEB287DA  the salvage system and the tissues that live on it
    CON-FND-71EF720F840CA4  feedback inhibition at two shared sites
    CON-REN-4AAF042ABFB67E  the plasma urate reference ranges and urine pH
    CON-REN-D940C9B3140A40  what can and cannot cause gout
    CON-REN-BE40BFF23F3E76  hypouricaemia
    CON-IMM-10470076F1AF95  adenosine deaminase deficiency and SCID

  GOUT IS PARTLY AUTHORED ALREADY AND NOTHING HERE RE-AUTHORS IT. The 2025 end
  of year paper's Case (2) was gout, and ./103-BMS-biochemistry-concepts.md
  already carries the diagnosis and tophi (CON-REN-31708150F8B722), the alcohol
  and lactate mechanism (CON-REN-0460ED67059E66), the two directions urate can
  be lowered (CON-REN-38B4BED80BC671) and allopurinol's mechanism
  (CON-REN-E5BAEF03791C8F). Those four were read before a word of this file was
  written. What is minted here is deliberately what they do not hold: the
  reference ranges by sex with the pH-dependence of urate solubility, the full
  classification of what can and cannot cause gout, hypouricaemia, and the
  immune defect. Every near-miss is named in a rejected_merge_candidate_ids
  line with the reason it was not merged.

  THE TOPHI DISAGREEMENT IS NOT RE-LITIGATED. CON-REN-31708150F8B722 already
  records that the 2025 paper's stem says tophi were found "in urine" while the
  book puts them in soft tissue. That conflict stays on that record. No concept
  in this file repeats it.

  NO URICOSURIC DRUG IS NAMED, ANYWHERE. The department book prints the heading
  "Drugs increasing the excretion of uric acid (Uricosuric drugs)" and then names
  no member of the class — only the instruction to take them with plenty of fluid
  and alkalinisation of the urine. The examiner's own model answer does the same.
  Where treatment is touched below it is described exactly as far as the book
  goes and no further; no member of the uricosuric class is supplied from any
  other source, and no dose or brand name appears in this file.

  EVIDENCE. atomic_claim_ids is [clear] on every record with a field_notes
  reason. The evidence chain — claims, citations and spans — is a separate scope
  and is not authored by this batch. Every statement below is traceable to one
  book by locator:

    src_300847a5fa64809d6c07  Dpt book Biochemistry 103.pdf  160 pp
                              chapter IX, "Metabolism of Purines and Pyrimidines",
                              PDF pages 126 to 131 (printed 124 to 129)

  The 391-item department question book (src_07f0a0ff41addf826c7f) says what is
  examined and appears in exam_signal only. A question book is evidence about
  what a faculty asks, never evidence that something is medically true — and on
  two of these records it disagrees with the department's own textbook, which is
  recorded in `conflicts` rather than resolved here.

  Import: Admin › Concepts › Import. Order: article → concept.
-->

# Item

## label
The purine ring is assembled from five sources, and only three of them — glutamine, aspartate and glycine — donate nitrogen

## id
CON-FND-265D369FD41B85

## canonical_key
purine.de-novo-synthesis.nitrogen-donors

## aliases
De novo purine synthesis
Sources of the atoms of the purine ring
Nitrogen donors of the purine ring
Glutamine PRPP amidotransferase
Phosphoribosylamine
Committed step of purine synthesis

## arabic_label
مصادر ذرات حلقة البيورين في التخليق الابتدائي

## arabic_aliases
التخليق الابتدائي لنيوكليوتيدات البيورين
واهبات النيتروجين في حلقة البيورين

## definition
De novo synthesis builds the purine ring atom by atom onto a ribose phosphate. The hexose monophosphate pathway supplies ribose-5-phosphate, PRPP synthetase converts it to PRPP, and glutamine:PRPP amidotransferase then donates the amide nitrogen of glutamine to give 5-phosphoribosylamine — the step the book calls the key step of de novo purine nucleotide synthesis. The ring is completed to inosine monophosphate, and the book's figure names five sources for its nine atoms: the amide group of glutamine, aspartate, glycine, respiratory CO2 and N10-formyl-THF. Only the first three carry nitrogen. Glycine enters as an intact unit contributing carbon as well as nitrogen, and folate supplies two carbons — which is why folate antagonists such as methotrexate block purine and nucleic acid synthesis and so inhibit cell division.

## explicit_objective
Name the five sources of the purine ring atoms, pick out the three that donate nitrogen, and distinguish the amide nitrogen of glutamine from the α-amino nitrogen of glutamate.

## pitfalls
Answering glutamate instead of glutamine. Glutamate is the collector of amino acid nitrogen everywhere else in protein metabolism, so it is the name a student reaches for; but the donor here is the amide group of glutamine, and amide nitrogen and α-amino nitrogen are different chemistry. The second error is dropping glycine from the list because it is remembered as a carbon donor — it contributes an intact nitrogen-carbon-carbon unit and gives both.

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
SYS-FND-T06 | DIS-BIO-T05

## topic
Molecular biology

## subtopic
Biosynthesis of Purine Nucleotides

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Biosynthesis of Purine Nucleotides

## article_ids
ART-103-BIO-PURINE-SYNTHESIS-AND-SALVAGE

## related_article_ids
ART-REN-TOP-AD3B2EA126

## related_concept_ids
CON-FND-DB8B4EFEB287DA | CON-FND-71EF720F840CA4 | CON-REN-13DF1A71B18999 | CON-FND-1A4A49607783A9

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.65

## exam_weight_by_year
KAU_Y1=0.7

## clinical_relevance
0.4

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p142 q1 | 103 BMS

## atomic_claim_ids
CLM-A5CE338AC1B1
CLM-D74CDD2BC2C5
CLM-5EFAFF3AA52D
CLM-3189B0DD6583
CLM-F75DC42F9667

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"N9 of the purine ring is provided by the amide group of glutamine forming 5-phosphoribosylamine. This reaction is catalyzed by an enzyme termed glutamine: PRPP amidotransferase. This is the key step in de novo purine nucleotide synthesis."
"The hexose monophosphate pathway provides ribose-5- phosphate which is converted to 5-phosphoribosyl-1-pyrophosphate (PRPP) by PRPP synthetase enzyme."
"Folic acid is important in the biosynthesis of purines (C-2 and C-8). Thus, folate antagonists (e.g., methotrexate) inhibit purine and nucleic acid synthesis, leading to inhibition of cell division, and hence their use in the treatment of some cancers"

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-REN-13DF1A71B18999 | CON-GIT-CCF2867DDC9E9C

## conflicts
[clear]

## uncertainty
The book's prose names only N9 as coming from glutamine's amide group; the assignment of every other ring atom is carried by a figure, and the cached page text renders that figure imperfectly. The atom-by-atom map is therefore read off the figure's labels rather than off a sentence, and a reviewer with the printed page should confirm the positions before this record is published.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached, and the per-atom positions rest on a figure rather than on prose.

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
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
id: Not minted here. The ID is copied verbatim from the `main_concept` of the finished question "In de novo synthesis of purine nucleotides, the donors of nitrogen atoms are:" in ../question/103-BMS-MCQ-protein-heme.md, which was authored first. mint-concept-id.mjs would produce a different hash from the canonical key above, and changing the ID would orphan the question.
microtopicId: The book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T06, which is where every live purine concept sits.
nanotopicId: No nanotopic exists below the microtopic level for purine metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain — claims, citations and spans — is a separate scope that this batch does not author, and no live claim asserts the sources of the purine ring atoms. Inventing a claim ID, or attaching a neighbouring one that does not say this, would be worse than an honest blank.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "purine", "PRPP", "nucleotide synthesis" and "de novo". Twenty-six records returned; none states the sources of the ring atoms.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. The Biochemistry cancelled-items table for 2025-2026 names nothing in the purines and pyrimidines chapter.
rejectedMergeCandidateIds: CON-REN-13DF1A71B18999 says dietary nucleic acids and nucleotides are non-essential because human tissues synthesise them — it asserts that de novo synthesis exists and is sufficient, not how the ring is built. CON-GIT-CCF2867DDC9E9C says dietary purines are poorly absorbed. Both are the dietary end of the same book section and neither names a ring atom; not merged.
relationships: Walked the 31 live concepts under DIS-BIO-T06, the 13 of them that concern purines, and the four gout records in ./103-BMS-biochemistry-concepts.md. Four loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file — and a prerequisite_of edge from this concept to CON-FND-71EF720F840CA4, plus a contrasts_with edge to CON-FND-DB8B4EFEB287DA, are owed.
uricosuricDrugs: Not applicable to this record; it touches no treatment. The class rule is stated in the file header and enforced on CON-REN-D940C9B3140A40 and CON-REN-BE40BFF23F3E76.

---

# Item

## label
Salvage returns a free purine base to the nucleotide pool in one step, and it is the major route in brain and red cell precursors

## id
CON-FND-DB8B4EFEB287DA

## canonical_key
purine.salvage.free-base-arm-and-dependent-tissues

## aliases
Purine salvage system
Salvage of free purines
HGPRT
Hypoxanthine-guanine phosphoribosyl transferase
APRT
Adenine phosphoribosyl transferase
Adenosine kinase
Salvage of purine nucleosides

## arabic_label
نظام إنقاذ البيورينات

## arabic_aliases
إنقاذ القواعد البيورينية الحرة
إنزيم هيبوكسانثين-جوانين فوسفوريبوزيل ترانسفيراز

## definition
The salvage system rebuilds a purine nucleotide from a base that has already been made, and the book gives its significance as supplying purine nucleotides to tissues where de novo synthesis is not active — naming the brain and the precursors of red blood cells. It has two arms. Free bases are salvaged in a single step by transfer of the ribose phosphate of PRPP: adenine phosphoribosyl transferase makes AMP from adenine, and hypoxanthine-guanine phosphoribosyl transferase makes IMP from hypoxanthine and GMP from guanine, releasing pyrophosphate each time. Nucleosides are salvaged separately by adenosine kinase, which phosphorylates adenosine to AMP and deoxyadenosine to dAMP using ATP. Three bases, two transferases, one shared substrate.

## explicit_objective
Name the two tissues that depend on salvage, list the three salvageable free bases with their enzymes and products, and separate the free-base arm from the nucleoside arm by enzyme and phosphate donor.

## pitfalls
Naming only the two bases in HGPRT's own name and forgetting that a second transferase exists for adenine — the commonest way to get "which free purine bases can be salvaged" wrong. The other error is putting adenosine kinase in the free-base arm: a nucleoside already carries its ribose and needs a kinase, while a free base needs a phosphoribosyl transferase and PRPP, which is why the two arms cannot share an enzyme.

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
SYS-FND-T06 | SYS-HEM-T02

## topic
Molecular biology

## subtopic
Biosynthesis of Purine Nucleotides

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Biosynthesis of Purine Nucleotides

## article_ids
ART-103-BIO-PURINE-SYNTHESIS-AND-SALVAGE

## related_article_ids
ART-REN-TOP-AD3B2EA126

## related_concept_ids
CON-FND-265D369FD41B85 | CON-FND-71EF720F840CA4 | CON-REN-D940C9B3140A40 | CON-HEM-095C9C97B56CCA

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.8

## exam_weight_by_year
KAU_Y1=0.8

## clinical_relevance
0.6

## academic_relevance
0.95

## weight_confidence
0.5

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p142 q3, q4, q5 and q6 | 103 BMS

## atomic_claim_ids
CLM-047EB1151E45
CLM-3481A9D46A09
CLM-25F1EDCF777F
CLM-B5A5DB6A03B6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The significance of the purine salvage system is to supply purine nucleotides to tissues where the de novo synthesis is not active e.g., brain and precursors of red blood cells. There are two systems for purine salvage:"
"I- Salvage of free purines"
"II- Salvage of purine nucleosides"

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-HEM-095C9C97B56CCA | CON-REN-13DF1A71B18999

## conflicts
[clear]

## uncertainty
The book names the brain and red cell precursors as the salvage-dependent tissues with "e.g.", so the list is illustrative rather than complete, and it gives no measure of how much of each tissue's nucleotide supply salvage actually provides. It also does not say why de novo synthesis is inactive in those tissues.

## evidence_gaps
Supported by the department book only. The book carries the salvage reactions as diagrams rather than prose, so the enzyme, substrate and product of each step are read off the schemes; the significance sentence is the only prose statement. No independent verification has been attached.

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
id: Not minted here. The ID is copied verbatim from the `main_concept` of four finished questions in ../question/103-BMS-MCQ-protein-heme.md, beginning with "Which of the following cells uses salvage of free bases as its major form of nucleotide generation?". Re-minting from the canonical key above would produce a different hash and orphan all four.
microtopicId: The book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T06.
nanotopicId: No nanotopic exists below the microtopic level for purine metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain is a separate scope this batch does not author, and no live claim asserts the salvage reactions or the tissues that depend on them.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "salvage", "purine", "HGPRT" and "hypoxanthine". "Salvage" returns only a cardiovascular alias, myocardial salvage, and four pending questions; no live record covers purine salvage.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. Nothing in the purines and pyrimidines chapter is on the department's cancelled-items list.
rejectedMergeCandidateIds: CON-HEM-095C9C97B56CCA states that glycolysis is the red cell's only source of ATP because it has no mitochondria. Not merged — it is about ATP supply in the mature red cell, while this concept is about nucleotide supply in the red cell precursor, and the two cells are at different stages. CON-REN-13DF1A71B18999 says dietary nucleotides are non-essential because tissues synthesise them; that is the de novo argument and it is silent on salvage.
relationships: Walked the 13 live purine concepts under DIS-BIO-T06 and the four gout records in ./103-BMS-biochemistry-concepts.md. Four loose neighbours are in related_concept_ids. No typed edges are written; a contrasts_with edge to CON-FND-265D369FD41B85 and a causes edge from failed salvage to CON-REN-D940C9B3140A40 are owed to a relations file this batch does not author.
uricosuricDrugs: Not applicable to this record; it touches no treatment.

---

# Item

## label
Purine synthesis is braked at two shared sites by five nucleotides — IMP, AMP, ADP, GMP and GDP — and GTP is not one of them

## id
CON-FND-71EF720F840CA4

## canonical_key
purine.regulation.feedback-inhibition-two-sites

## aliases
Regulation of purine nucleotide biosynthesis
Feedback inhibition of PRPP synthetase
Multiple loops feedback inhibition
Glutamine PRPP amidotransferase regulation
Substrate availability in purine synthesis

## arabic_label
التنظيم بالتثبيط المرتد لتخليق نيوكليوتيدات البيورين

## arabic_aliases
تثبيط إنزيم بي آر بي بي سينثيتيز
تنظيم إنزيم جلوتامين-بي آر بي بي أميدوترانسفيراز

## definition
De novo purine synthesis is the book's example of multiple-loops feedback inhibition. A high concentration of IMP, AMP, ADP, GMP or GDP inhibits the conversion of ribose-5-phosphate to IMP at two sites: PRPP synthetase and glutamine:PRPP amidotransferase. Five nucleotides, two enzymes, and the list is exact — GTP is absent from it. The pathway's second control is substrate availability: the rate of the glutamine:PRPP amidotransferase reaction is set by the intracellular concentrations of PRPP and glutamine. Both branch products therefore report back to the shared beginning, which is what keeps one branch from running away with the common precursor.

## explicit_objective
Recall the five nucleotides that feedback-inhibit purine synthesis and the two enzymes they act on, and state the second control the book gives — the intracellular availability of PRPP and glutamine.

## pitfalls
Assuming that any purine nucleotide inhibits the pathway and answering GTP. The book's list is a closed one of mono- and diphosphates plus the branch-point nucleotide IMP; the triphosphates are not in it. The second error is treating the two sites as one — a student who remembers only PRPP synthetase cannot explain why the block still works when PRPP is supplied from elsewhere.

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
SYS-FND-T06 | DIS-BIO-T05

## topic
Molecular biology

## subtopic
Biosynthesis of Purine Nucleotides

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Biosynthesis of Purine Nucleotides

## article_ids
ART-103-BIO-PURINE-SYNTHESIS-AND-SALVAGE

## related_article_ids
ART-REN-TOP-AD3B2EA126

## related_concept_ids
CON-REN-091F22B55D3081 | CON-FND-265D369FD41B85 | CON-FND-DB8B4EFEB287DA | CON-REN-C4606D65B74F2E

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.35

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.85

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p143 q7 and q8 | 103 BMS

## atomic_claim_ids
CLM-3C1CD1882A24
CLM-A5BCB5EDD051
CLM-1691404BAE7D
CLM-3EC35AF0F78B
CLM-D444AFBFE4D1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"De novo purine nucleotide synthesis is a good example for multiple loops feedback inhibition. High concentration of IMP, AMP, ADP, GMP and GDP produce feedback inhibition of conversion of ribose-5-phosphate to IMP at two sites, PRPP synthetase and glutamine:PRPP- amidotransferase."
"The rate of the reaction catalyzed by glutamine: PRPP-amidotransferase is controlled by the intracellular concentration of PRPP and glutamine."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-REN-091F22B55D3081 | CON-REN-C4606D65B74F2E

## conflicts
[clear]

## uncertainty
The book states the five inhibitors and the two sites without saying whether the inhibition is competitive or allosteric, and without giving any concentration at which it operates. It also does not explain why GTP is excluded from the list; the explanation offered in the question bank — that GTP is the energy source driving the IMP-to-AMP branch — is a reason for the exclusion, not a statement the book makes about it.

## evidence_gaps
Supported by the department book only for the five inhibitors and the two sites. The branch-specific allosteric inhibitors that the question book examines alongside them — AMP on adenylosuccinate synthetase and GMP on IMP dehydrogenase — are not in this department textbook at all, and rest on the question book's printed key and on standard references. They are deliberately not asserted as this book's teaching.

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
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
id: Not minted here. The ID is copied verbatim from the `main_concept` of the finished questions "One of the following does not produce feedback inhibition of PRPP synthetase:" and "An allosteric inhibitor of adenylosuccinate synthetase is:" in ../question/103-BMS-MCQ-protein-heme.md.
microtopicId: The book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T06.
nanotopicId: No nanotopic exists below the microtopic level for purine metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain is a separate scope this batch does not author. The nearest live claim, CLM-REN-091F22B55D3081, asserts the ATP/GTP cross-regulation of the two branches, which is a different statement; attaching it to clear a validator would be the wrong trade.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "PRPP", "feedback", "purine" and "regulation". Eight records returned for PRPP; the two nearest are named in rejected_merge_candidate_ids and neither states the feedback list.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. Nothing in the purines and pyrimidines chapter is on the department's cancelled-items list.
rejectedMergeCandidateIds: CON-REN-091F22B55D3081 says ATP drives GMP formation and GTP drives AMP formation, cross-regulating balanced purine synthesis. Not merged — that is the cross-regulation between the two branches downstream of IMP, while this concept is the feedback brake on the shared stem upstream of it; the question that tests this one turns on GTP being absent from the inhibitor list, which the live record does not say. CON-REN-C4606D65B74F2E is the pyrimidine equivalent, carbamoyl-phosphate synthetase II inhibited by UTP and activated by PRPP and ATP; a parallel arrangement in the other pathway, deliberately kept separate.
relationships: Walked the 13 live purine concepts under DIS-BIO-T06 and the two concepts minted beside this one. Four loose neighbours are in related_concept_ids. No typed edges are written; a contrasts_with edge to CON-REN-091F22B55D3081 and an is_a edge from CON-REN-C4606D65B74F2E are owed.
uricosuricDrugs: Not applicable to this record; it touches no treatment.

---

# Item

## label
Fasting plasma urate is 4–7 mg/dL in men and 3–6 mg/dL in women, and how much of it stays dissolved depends on the pH of the urine

## id
CON-REN-4AAF042ABFB67E

## canonical_key
urate.plasma-reference-range.sex-difference-and-urine-ph

## aliases
Plasma uric acid level
Normal serum urate
Uric acid reference range
Urinary excretion of uric acid
Solubility of uric acid and urine pH
Alkalinisation of urine

## arabic_label
المستوى الطبيعي لحمض البوليك في البلازما

## arabic_aliases
حمض اليوريك في الدم للرجال والنساء
تأثير درجة حموضة البول على ذوبان حمض البوليك

## definition
Uric acid is the main end product of purine catabolism in the human liver, and the book gives its fasting plasma level as 4–7 mg/dL in males and 3–6 mg/dL in females. A normal adult excretes about 400–600 mg of it a day. Urate salts are more soluble than uric acid itself, so urine pH governs how much stays in solution: urine at pH 5 dissolves only about one tenth as much as urine at pH 7, and alkalinisation therefore increases the solubility of uric acid markedly. The three figures belong together — the reference range says when urate is high, and the solubility behaviour says what happens to it once it is.

## explicit_objective
State the male and female fasting plasma urate ranges and the normal daily urinary excretion, and predict the effect of lowering or raising urine pH on the solubility of uric acid.

## pitfalls
Reading the sex difference as trivial and quoting one range for both. The male and female ranges overlap but do not coincide, and a value of 6.5 mg/dL is normal in a man and above range in a woman. The second error is confusing urate solubility with urate production — alkalinising the urine changes neither how much uric acid is made nor the plasma level; it changes only whether what is excreted stays dissolved.

## concept_type
investigation

## status
under review

## support_mode
direct_statement

## subject
renal

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-REN-T06 | SYS-MSK-T04

## topic
Molecular biology

## subtopic
Catabolism of Purine Nucleotides

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Catabolism of Purine Nucleotides

## article_ids
ART-103-BIO-URIC-ACID-AND-PURINE-DISORDERS

## related_article_ids
ART-REN-TOP-AD3B2EA126 | ART-103-BIO-GOUT-AND-HYPERURICAEMIA

## related_concept_ids
CON-REN-D940C9B3140A40 | CON-REN-BE40BFF23F3E76 | CON-REN-90F0EB9115E7CA | CON-REN-2926B6DCBB2134

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.7

## exam_weight_by_year
KAU_Y1=0.7

## clinical_relevance
0.8

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p143 q11 | 103 BMS

## atomic_claim_ids
CLM-BC10B143AC03
CLM-E9632946C53D
CLM-D107D2066B36
CLM-353C04D380F9

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Uric acid is the main end product of purine catabolism in the human liver."
"Plasma uric acid (urate) levels are 4-7 mg/dL for males and 3-6 mg/dL for females during fasting."
"In normal adult humans, the daily excretion of uric acid is about 400-600 mg. Urate salts are more soluble than uric acid. So, the pH of urine influences the solubility of uric acid e.g., urine at pH 5 can dissolve only about one-tenth as much as urine at pH 7. Therefore, alkalization of urine markedly increases the solubility of uric acid."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-REN-31708150F8B722 | CON-REN-2926B6DCBB2134

## conflicts
[clear]

## uncertainty
The book gives the sex difference as a bare pair of ranges and offers no reason for it, no age dependence, and no separate range for the postmenopausal woman — in whom the difference is known clinically to narrow. It also does not say whether the figures are enzymatic or colorimetric assay values, and laboratories using different methods report slightly different limits.

## evidence_gaps
Supported by the department book only, and the ranges are the department's own; no local Egyptian laboratory reference interval has been attached, and the article should not be published against an international range without one.

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
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
id: Not minted here. The ID is copied verbatim from the `main_concept` of the finished question "Plasma uric acid level in males is ………, whereas its level in females is …….." in ../question/103-BMS-MCQ-protein-heme.md.
microtopicId: The book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T06.
nanotopicId: No nanotopic exists below the microtopic level for purine metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain is a separate scope this batch does not author, and no live claim states the reference ranges.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "uric acid", "urate", "reference range" and "hyperuricaemia" — never by subject, because CON-REN- records sit under a legacy subject and a subject search reports zero on a full branch. Fourteen records returned for "uric acid"; none is a reference range.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. Nothing in the purines and pyrimidines chapter is on the department's cancelled-items list.
rejectedMergeCandidateIds: CON-REN-31708150F8B722 is the live gout-and-tophi record, and its definition carries "plasma urate is normally 4–7 mg/dL in men and 3–6 mg/dL in women" as a closing aside. Not merged, and this is the closest call in the batch: that record's claim is the disease — tophi in soft tissue, urate stones in the urinary tract — with the range as context, while this record is the reference interval itself together with the excretion figure and the pH-dependence of solubility, which that record does not carry and which a question tests on its own. A reviewer who disagrees should fold this into the live record rather than the other way round, because the live record is the older one. CON-REN-2926B6DCBB2134 says a low urine pH leads to uric acid and cystine stone formation; that is the stone-forming consequence, and this record is the solubility rule behind it — adjacent, not the same.
relationships: Walked the 13 live purine concepts under DIS-BIO-T06, the four gout records in ./103-BMS-biochemistry-concepts.md, and the 22 records that "gout" returns by label. Four loose neighbours are in related_concept_ids. No typed edges are written; a mechanism_step_before edge from this concept to CON-REN-2926B6DCBB2134 is owed.
uricosuricDrugs: This record states the book's alkalinisation-of-urine rule but names no drug of any class. The book's own treatment section heads the uricosuric class without naming a member, and nothing is supplied here from outside it.

---

# Item

## label
Every cause of gout either makes more urate or excretes less of it, so a block at xanthine oxidase — which makes less — cannot be one

## id
CON-REN-D940C9B3140A40

## canonical_key
gout.causes.overproduction-versus-underexcretion

## aliases
Causes of gout
Primary metabolic gout
Secondary metabolic gout
Renal gout
Hyperuricaemia classification
Von Gierke's disease and gout
Partial HGPRT deficiency

## arabic_label
أسباب النقرس: زيادة الإنتاج أو نقص الإخراج

## arabic_aliases
النقرس الأيضي الأولي والثانوي
النقرس الكلوي

## definition
The book splits hyperuricaemia, and with it gout, into exactly two mechanisms. Overproduction covers a diet rich in nucleoprotein such as meat, liver and kidney; primary metabolic gout from genetic disorders — defects of PRPP synthetase that leave the enzyme superactive or resistant to feedback inhibition, partial deficiency of HGPRT, Lesch-Nyhan syndrome from complete HGPRT deficiency, and Von Gierke's disease, in which glucose-6-phosphatase deficiency enhances purine synthesis and degradation while decreasing uric acid excretion; and secondary metabolic gout from diseases that raise purine catabolism, such as cancer, leukaemia and psoriasis. Decreased excretion — renal gout — covers primary or congenital renal disease, acquired renal disease, and alcohol. Because uric acid is made by xanthine oxidase, a deficiency of that enzyme moves urate in the opposite direction and cannot be a cause of gout; it is the exception that shows the classification is about the direction urate moves.

## explicit_objective
Sort a named disorder into overproduction or decreased excretion of urate, and explain why xanthine oxidase deficiency belongs to neither.

## pitfalls
Treating "a purine enzyme defect" as automatically a cause of gout. The classification is not about which enzyme is affected but about which way urate moves, and three of the enzyme defects in this chapter — xanthine oxidase, adenosine deaminase and purine nucleoside phosphorylase — lower it. The second error is filing Von Gierke's disease under decreased excretion because the book's sentence ends with excretion; the book lists it under increased production, and it does both.

## concept_type
classification

## status
under review

## support_mode
inferred

## subject
renal

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-REN-T06 | SYS-MSK-T04

## topic
Molecular biology

## subtopic
Disorders of Purine Metabolism

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Disorders of Purine Metabolism

## article_ids
ART-103-BIO-URIC-ACID-AND-PURINE-DISORDERS

## related_article_ids
ART-REN-TOP-AD3B2EA126 | ART-103-BIO-GOUT-AND-HYPERURICAEMIA

## related_concept_ids
CON-REN-BE40BFF23F3E76 | CON-REN-4AAF042ABFB67E | CON-REN-B9E0531973510E | CON-REN-0460ED67059E66

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.85

## exam_weight_by_year
KAU_Y1=0.85

## clinical_relevance
0.85

## academic_relevance
0.9

## weight_confidence
0.5

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p143 q12 and q13 | 103 BMS

## atomic_claim_ids
CLM-669895936755
CLM-E77C74789A04
CLM-955A16F904A6
CLM-A0A2466029B5

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Hyperuricemia or elevated serum urate levels results from over production (metabolic) or decreased excretion (renal)."
"a- Defects of PRPP synthetase: Due to genetic mutation, the enzyme is either superactive or resistant to feedback inhibition. b- Partial deficiency of HGPRTase of purine salvage system. c- Lesch-Nyhan Syndrome: Complete deficiency of HGPRTase. d- Von Gierke's disease (Glucose 6-phosphatase deficiency) due to enhanced synthesis and degradation of purine and decreased excretion of uric acid"
"1) Primary Renal Gout: It is due to primary or congenital renal disease. 2) Secondary Renal Gout: It is due to acquired renal disease."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-REN-B9E0531973510E | CON-REN-31708150F8B722

## conflicts
[clear]

## uncertainty
The book gives no relative frequency for the causes it lists, so a student cannot tell from it whether primary metabolic gout is common or rare beside dietary and renal causes. It also does not say how much residual HGPRT activity separates "partial deficiency" from Lesch-Nyhan.

## evidence_gaps
The classification and every listed cause are the book's own. The exception — that xanthine oxidase deficiency cannot cause gout — is not in the book, which never names the deficiency as an entity; it is inferred from the book's own catabolic diagram, in which xanthine oxidase makes uric acid, and from its account of allopurinol as a deliberate partial version of the same block. The inference rests additionally on the question book's printed key, which is curriculum signal rather than evidence, and support_mode is recorded as inferred for that reason.

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
id: Not minted here. The ID is copied verbatim from the `main_concept` of the finished questions "One of the following disorders cannot be considered a cause of gout:" and "Which gene is defective in patients with Lesch-Nyhan syndrome?" in ../question/103-BMS-MCQ-protein-heme.md.
microtopicId: The book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T06.
nanotopicId: No nanotopic exists below the microtopic level for purine metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain is a separate scope this batch does not author. CLM-REN-B9E0531973510E covers only the secondary metabolic branch and does not assert the classification, so it is not attached.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "gout", "hyperuricaemia", "Lesch-Nyhan" and "xanthine oxidase" — by label and never by subject, because the CON-REN- branch reports zero under its own subject while being full. "Xanthine oxidase" returns nothing live at all; the five live gout records are the classification's parts, not the classification.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. Nothing in the purines and pyrimidines chapter is on the department's cancelled-items list.
rejectedMergeCandidateIds: CON-REN-B9E0531973510E says cancer, leukaemia and psoriasis cause secondary metabolic gout through increased purine catabolism. Not merged — it is one leaf of this classification, and a question can test it without the rest. CON-REN-31708150F8B722, the live gout-and-tophi record, closes with "comes either from overproduction (metabolic) or from decreased excretion (renal)"; that one clause overlaps this concept's opening, but the record is the disease and its deposits, not the enumerated causes, and it says nothing about which disorders belong where.
relationships: Walked the 13 live purine concepts under DIS-BIO-T06, the four gout records in ./103-BMS-biochemistry-concepts.md and the 22 records "gout" returns by label. Four loose neighbours are in related_concept_ids. No typed edges are written; causes edges from CON-REN-0460ED67059E66 and CON-REN-B9E0531973510E into this concept, and a contrasts_with edge to CON-REN-BE40BFF23F3E76, are owed.
uricosuricDrugs: This record touches treatment only through allopurinol's mechanism, which the book states in full and which is already authored on the live record CON-REN-E5BAEF03791C8F. No uricosuric drug is named, because the book names none — it prints the class heading "Drugs increasing the excretion of uric acid (Uricosuric drugs)" and stops there, and so does the examiner's model answer. publication_status is needs_evidence and this record does not auto-publish.

---

# Item

## label
Hypouricaemia is a block in purine catabolism, and the department's textbook and its question book name different enzymes for it

## id
CON-REN-BE40BFF23F3E76

## canonical_key
urate.hypouricaemia.catabolic-enzyme-blocks

## aliases
Hypouricemia
Low plasma uric acid
Xanthine oxidase deficiency
Adenosine deaminase deficiency and low urate
Xanthinuria

## arabic_label
نقص حمض البوليك في الدم

## arabic_aliases
نقص إنزيم أكسيداز الزانثين
نقص إنزيم نازعة أمين الأدينوزين

## definition
Hypouricaemia is a plasma urate below the fasting reference range, and every cause in this chapter is a block in the catabolic route before uric acid is formed. The department textbook gives one cause: adenosine deaminase deficiency, which stops adenosine becoming inosine, raises dATP and produces severe combined immunodeficiency. The department question book's printed key gives another: xanthine oxidase deficiency, which removes the two final oxidations — hypoxanthine to xanthine and xanthine to uric acid — so uric acid cannot be formed and the more soluble precursors are excreted instead. Both are genuine, and the direction is what matters: a block upstream of uric acid lowers urate, while every cause of gout raises it.

## explicit_objective
Name the catabolic enzyme blocks that lower plasma urate, explain in each case why urate falls, and separate them from the causes of gout by the direction urate moves.

## pitfalls
Reading a purine enzyme deficiency as automatically a cause of gout. Complete HGPRT deficiency raises urate and adenosine deaminase deficiency lowers it, and both are deficiencies in the same chapter. The other error is expecting the textbook's answer on a question paper: a student who has learned the book's sentence looks for adenosine deaminase among the options and does not find it, because the question book keys this to xanthine oxidase instead.

## concept_type
classification

## status
under review

## support_mode
inferred

## subject
renal

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-REN-T06 | DIS-IMU-T05

## topic
Molecular biology

## subtopic
Disorders of Purine Metabolism

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Disorders of Purine Metabolism

## article_ids
ART-103-BIO-URIC-ACID-AND-PURINE-DISORDERS

## related_article_ids
ART-REN-TOP-AD3B2EA126

## related_concept_ids
CON-IMM-10470076F1AF95 | CON-REN-D940C9B3140A40 | CON-REN-4AAF042ABFB67E | CON-REN-E5BAEF03791C8F

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.55

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.6

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p144 q16 | 103 BMS

## atomic_claim_ids
CLM-31A6646A964C
CLM-6EFB082FD724
CLM-C8291D17838E
CLM-8942A21AD321

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"II- Hypouricemia — It is caused mainly by adenosine deaminase (ADA) deficiency."
"The high levels of dATP inhibit ribonucleotide reductase, which inhibits DNA synthesis."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-REN-B3AEE6F22A046A | CON-REN-42ED4D5025FB7B

## conflicts
The department textbook states that hypouricaemia "is caused mainly by adenosine deaminase (ADA) deficiency" and names no other cause.
The department question book's printed key for the same question gives xanthine oxidase deficiency, and adenosine deaminase deficiency is not among the four options it offers.

## uncertainty
Whether the two departmental sources actually disagree, or whether the question book is simply testing a second cause the textbook omits, cannot be settled from either document. Both enzyme blocks genuinely lower plasma urate, so both keys are defensible; what is unclear is which the faculty expects when the two appear in the same option list, and neither source says how far below the reference range a plasma urate must fall to be called hypouricaemic.

## evidence_gaps
The adenosine deaminase half is stated outright by the department book. The xanthine oxidase half is not in the book at all — the book never names a xanthine oxidase deficiency as an entity — and rests on the question book's printed key together with the book's own catabolic diagram, in which xanthine oxidase performs the last two oxidations. support_mode is recorded as inferred for that reason, and the record must not be published until a faculty reviewer decides which cause the department teaches.

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
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
id: Not minted here. The ID is copied verbatim from the `main_concept` of the finished question "Hypouricemia can occur in:" in ../question/103-BMS-MCQ-protein-heme.md.
microtopicId: The book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T06.
nanotopicId: No nanotopic exists below the microtopic level for purine metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain is a separate scope this batch does not author, and a record whose two halves come from two disagreeing sources should not be given a claim before the disagreement is settled.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "hypouricemia", "hypouricaemia", "xanthine oxidase" and "low uric acid". Nothing live matches any of them; the only hit anywhere is the pending question this concept serves.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. Nothing in the purines and pyrimidines chapter is on the department's cancelled-items list.
rejectedMergeCandidateIds: CON-REN-B3AEE6F22A046A says allopurinol has structural similarity to hypoxanthine, and CON-REN-42ED4D5025FB7B says its reaction with PRPP lowers the PRPP pool. Both concern the same enzyme from the drug's side and both were examined against this record; neither is merged, because a drug that inhibits xanthine oxidase on purpose is not the same idea as a disease state in which the enzyme is missing, and a question tests each without the other.
relationships: Walked the 13 live purine concepts under DIS-BIO-T06, the four gout records in ./103-BMS-biochemistry-concepts.md and the records "gout" and "uric acid" return by label. Four loose neighbours are in related_concept_ids. No typed edges are written; a contrasts_with edge to CON-REN-D940C9B3140A40 and a causes edge to CON-IMM-10470076F1AF95 are owed.
uricosuricDrugs: The record names allopurinol only as the deliberate counterpart of the xanthine oxidase block, which is what the book itself says. No uricosuric drug is named, because the book names none. publication_status is needs_evidence and this record does not auto-publish.

---

# Item

## label
Adenosine deaminase deficiency raises dATP, which shuts down ribonucleotide reductase and leaves lymphocytes unable to divide — severe combined immunodeficiency

## id
CON-IMM-10470076F1AF95

## canonical_key
purine.adenosine-deaminase-deficiency.severe-combined-immunodeficiency

## aliases
ADA deficiency
Adenosine deaminase deficiency
Severe combined immunodeficiency
SCID
dATP and ribonucleotide reductase
Purine enzyme immunodeficiency

## arabic_label
عوز نازعة أمين الأدينوزين والعوز المناعي المشترك الشديد

## arabic_aliases
نقص إنزيم ADA
العوز المناعي المشترك الشديد

## definition
Adenosine deaminase converts adenosine to inosine at the start of purine catabolism. When it is deficient the substrate accumulates and is phosphorylated onward, and the resulting high levels of dATP inhibit ribonucleotide reductase — the enzyme complex that makes deoxyribonucleotides and is active only during DNA synthesis. DNA synthesis then fails, so white blood cells cannot proliferate, T-cell and B-cell function is impaired, and the condition is associated with severe combined immunodeficiency. Plasma urate falls at the same time, because catabolism is blocked before uric acid can be formed: this is a purine defect whose damage is immunological rather than articular.

## explicit_objective
Trace the chain from adenosine deaminase deficiency through dATP and ribonucleotide reductase to failed lymphocyte proliferation, and say why plasma urate falls rather than rises.

## pitfalls
Assuming a defect in the purine pathway must present as gout, and answering HGPRT. HGPRT deficiency is the other severe purine enzyme defect in this chapter, but its extra-articular damage is neurological and its urate goes up; adenosine deaminase deficiency damages the immune system and its urate goes down. The second error is calling ribonucleotide reductase a purine enzyme — it reduces both purine and pyrimidine ribonucleotides, which is why losing it stops DNA synthesis outright rather than starving the cell of one base.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
imm

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
DIS-IMU-T05 | SYS-FND-T06

## topic
Molecular biology

## subtopic
Disorders of Purine Metabolism

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Disorders of Purine Metabolism

## article_ids
ART-103-BIO-URIC-ACID-AND-PURINE-DISORDERS

## related_article_ids
ART-REN-TOP-AD3B2EA126

## related_concept_ids
CON-REN-BE40BFF23F3E76 | CON-REN-D940C9B3140A40 | CON-FND-DB8B4EFEB287DA | CON-IMM-8B814364875357

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.75

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p144 q17 | 103 BMS

## atomic_claim_ids
CLM-7EF1FC7216A3
CLM-244C78FC991F
CLM-5F894B8789D8
CLM-55482753C7A8

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"It is caused mainly by adenosine deaminase (ADA) deficiency. The high levels of dATP inhibit ribonucleotide reductase, which inhibits DNA synthesis. Therefore, white blood cells cannot proliferate resulting in impairment of T-cell and B-cell functions. It is associated with severe combined immunodeficiency (SCID)."
"This is catalyzed by an enzyme complex termed ribonucleotide reductase which is active only during DNA synthesis and inhibited mainly by dATP."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-IMM-8B814364875357 | CON-IMM-1E25459BC1C1E0

## conflicts
[clear]

## uncertainty
The book says dATP accumulates but does not spell out the intermediate step — that it is deoxyadenosine, spared by the missing deaminase and phosphorylated by adenosine kinase, that becomes dATP. It also gives no age of onset, no inheritance pattern and no treatment for the condition, and does not say whether the immunodeficiency or the hypouricaemia presents first.

## evidence_gaps
The whole mechanism is stated outright by the department book, and it is the one record in this batch that needs no inference. What the book does not carry is purine nucleoside phosphorylase deficiency, which the question book's key names alongside adenosine deaminase as a second cause of immune dysfunction; that half rests on the question book and on standard references and is deliberately not asserted here as this book's teaching. No independent verification against an immunology reference has been attached.

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
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
id: Not minted here. The ID is copied verbatim from the `main_concept` of the finished question "Immune dysfunctions are associated with a defective of:" in ../question/103-BMS-MCQ-protein-heme.md. The IMM system code on a biochemistry concept is not an error — the concept's claim is an immunodeficiency, and the question's own options turn on separating it from the neurological and articular purine defects.
microtopicId: The book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T06.
nanotopicId: No nanotopic exists below the microtopic level for purine metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain is a separate scope this batch does not author, and no live claim asserts the adenosine deaminase mechanism.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "adenosine deaminase", "severe combined immunodeficiency", "SCID" and "immunodeficiency" — by label and never by subject, because the CON-IMM- branch reports zero under a subject search while holding 133 live records. The first three return nothing at all; the immunodeficiency records that do exist are named in rejected_merge_candidate_ids.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. Nothing in the purines and pyrimidines chapter is on the department's cancelled-items list.
rejectedMergeCandidateIds: CON-IMM-8B814364875357 lists the chronic causes of secondary immunodeficiency. Not merged — adenosine deaminase deficiency is a primary, inherited, metabolic immunodeficiency and belongs to neither that list nor its mechanism. CON-IMM-1E25459BC1C1E0 covers avoidance measures that minimise infection in immunodeficient patients; that is management of the consequence and says nothing about the cause.
relationships: Walked the 13 live purine concepts under DIS-BIO-T06 and the 13 live concepts under DIS-IMU-T05, the immunodeficiency node. This is the only record in either place that joins a purine enzyme to an immune defect. Four loose neighbours are in related_concept_ids. No typed edges are written; a causes edge from this concept to a hypouricaemia record and an is_a edge into the primary immunodeficiency branch are owed.
uricosuricDrugs: Not applicable to this record; it touches no treatment.
