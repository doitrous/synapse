# Item

## id
CON-FND-06F6AE69D9BD8D

## label
Gene therapy inserts normal genes into human cells to correct a genetic disorder, and whether the change is heritable depends entirely on which cell line it targets — germline (heritable) or somatic (not heritable)

## canonical_key
genetherapy.definition.germline-vs-somatic-heritability

## aliases
Gene therapy definition
Germline gene therapy
Somatic gene therapy
Heritability of gene therapy

## arabic_label
تعريف العلاج الجيني والفرق بين العلاج الجيني للخلايا الجنسية والخلايا الجسدية من حيث التوريث

## arabic_aliases
العلاج الجيني
العلاج الجيني للخلايا الجنسية
العلاج الجيني للخلايا الجسدية

## definition
Gene therapy is the process of inserting a normal copy of a gene into human cells to correct a disorder caused by a defective or missing gene — distinct from live vector vaccines (which deliver antigens, not corrective genes), molecular cloning (which is a laboratory DNA-propagation technique, not a patient treatment), and stem cell therapy (which replaces cells rather than genes). Whether the correction can be passed to the next generation depends entirely on which cell line is targeted. Germline gene therapy modifies reproductive cells (sperm, eggs, or the early embryo), so the correction is heritable and passed to offspring. Somatic gene therapy modifies non-reproductive body cells, so the correction is confined to the treated individual and is not heritable — this is the only form of gene therapy currently used in clinical practice, precisely because germline modification's heritability raises safety and ethical concerns that somatic therapy does not.

## explicit_objective
Define gene therapy as gene insertion to correct a disorder, distinguish it from live vector vaccines, molecular cloning and stem cell therapy, and state which of germline vs somatic gene therapy is heritable.

## pitfalls
Confusing gene therapy with molecular cloning: cloning is the laboratory technique used to produce the corrective gene construct, while gene therapy is the clinical act of delivering it into a patient's cells. Reversing which line is heritable — germline changes are heritable because they alter the gametes/embryo that give rise to the next generation, while somatic changes, however extensive in the treated patient, die with that patient's own cells and are never transmitted.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S02 | DIS-GEN

## topic
Molecular biology

## subtopic
Gene Therapy

## microtopic
Gene therapy definition and germline vs somatic heritability

## nanotopic


## modules
ASU-MBG

## article_ids
ART-FND-GENE-THERAPY-AND-RECOMBINANT-DNA-TECHNOLOGY

## related_article_ids


## related_concept_ids
CON-FND-1C82888CCCC7FD

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.5

## exam_weight_by_year
ASU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
CLM-FND-GENETHERAPY-DEFINITION-GERMLINE-SOMATIC-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which process is used to insert normal gene into human cells to correct disorders? a) Gene therapy b) Live vector vaccines c) Molecular cloning d) Stem cell therapy" ANSWER: a
"Gene therapy targeting the germline is... a) Heritable b) Not heritable c) Sometimes heritable d) Unrelated to heritability" ANSWER: a
"Gene therapy targeting the Somatic line is... a) Heritable b) Not heritable c) Sometimes heritable d) Unrelated to heritability" ANSWER: b
"Which process is used to insert normal genes into human cells to correct disorders? a. Live vector vaccines b. Gene Editing c. Molecular cloning d. Gene therapy e. Stem cell therapy" ANSWER: d

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Gene Therapy chapter triage (coverage/ASU-MBG-triage.md Cluster 14); no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "gene therapy", "germline gene therapy" and "somatic gene therapy" before minting (find-existing.mjs + grep) — no hits; this fact is new.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same Gene Therapy batch. Linked to CON-FND-1C82888CCCC7FD (ADA-SCID first gene therapy) as the worked clinical example this record's definition sits behind.

---

# Item

## id
CON-FND-C444D428BE3E1D

## label
Restriction endonucleases are bacterial enzymes that recognise and cut DNA at specific palindromic sequences, and it is this specific recognition — not indiscriminate cutting — that makes them the basic tool of recombinant DNA technology

## canonical_key
restrictionendonuclease.origin-and-recognition.bacterial-source-palindromic-sites

## aliases
Restriction endonuclease
Restriction enzyme
Palindromic recognition site
Restriction site

## arabic_label
إنزيمات القطع المحدد وأصلها البكتيري وتعرفها على التتابعات المتناظرة

## arabic_aliases
إنزيمات القطع المقيدة
التتابع المتناظر (Palindromic)

## definition
Restriction endonucleases occur normally in bacteria, where they form part of a restriction-modification defence system that cuts up foreign (e.g. bacteriophage) DNA while the bacterium's own DNA is protected by methylation at the same sites. Each restriction endonuclease recognises a specific palindromic sequence — a double-stranded sequence that reads identically 5'→3' on both strands, so that its reverse complement equals itself (e.g. ACGGCCGT) — and cuts the DNA only at that sequence, which is why restriction enzymes are described as site-specific rather than random cutters. A restriction endonuclease is capable of recognising its specific site, cutting (breaking the covalent phosphodiester backbone) at that site, and — in the course of unwinding the double helix to reach the cut site — transiently breaking the hydrogen bonds holding the two strands together; this combination of properties is what makes them the foundational tool of molecular cloning and recombinant DNA technology.

## explicit_objective
State that restriction endonucleases are naturally bacterial, that they recognise specific palindromic sequences rather than cutting DNA randomly, and identify a palindromic sequence from its reverse complement.

## pitfalls
Assuming restriction endonucleases occur normally in the organism being engineered (virus, plant, or human cell) rather than in bacteria, where they evolved as a defence against foreign DNA. Assuming a "restriction site" can be any sequence rather than specifically a palindromic one — to test whether a given sequence is a genuine restriction site, take its reverse complement and check it against the original: only a sequence that equals its own reverse complement (e.g. ACGGCCGT reverse-complements to ACGGCCGT) is palindromic and can be a restriction site.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S02 | DIS-GEN

## topic
Molecular biology

## subtopic
Gene Therapy

## microtopic
Restriction endonuclease origin and palindromic recognition

## nanotopic


## modules
ASU-MBG

## article_ids
ART-FND-GENE-THERAPY-AND-RECOMBINANT-DNA-TECHNOLOGY

## related_article_ids


## related_concept_ids
CON-FND-744B37261093E4 | CON-FND-1F3840652F24F8 | CON-FND-3893485BBEEC06

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.5

## exam_weight_by_year
ASU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.9

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
CLM-FND-RESTRICTIONENDONUCLEASE-ORIGIN-RECOGNITION-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Restriction endonuclease are present Normally in a) Virus b) Bacteria c) Plant cell d) Human cell" ANSWER: b
"Restriction endonucleases can recognize a) Palindromic sequences b) Chimeric DNA c) DNA RNA HYBRIDS d) Homopolymer sequences" ANSWER: a
"Which of the following is a restriction site ? a) ACGGCCGT b) ACGCCGGT c) ACGGACGG d) ATCGGCTA" ANSWER: a
"Restriction endonuclease a) Makes two cuts b) Can break covalent bond c) Can break hydrogen bond d) Recognizes specific site e) All of the above." ANSWER: e
"Restriction endonucleases are enzymes: a) Capable of joining DNA molecules b) Capable of cutting DNA molecules c) Capable of adding nucleotides to the 3'OH end d) Capable of removing nucleotides from the 5'P end e) Capable of restricting protein synthesis." ANSWER: b

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
The printed key to "Restriction endonuclease [...] e) All of the above" treats "can break hydrogen bond" as a true property alongside making cuts, breaking covalent bonds, and recognising a specific site; this is defensible only via the transient strand-separation restriction enzymes perform while binding their site, not as their catalytic mechanism (which is phosphodiester, i.e. covalent, bond cleavage).

## evidence_gaps
Evidence must be attached before publication.

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Gene Therapy chapter triage (coverage/ASU-MBG-triage.md Cluster 14); no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "restriction endonuclease", "restriction enzyme" and "palindromic sequence" before minting (find-existing.mjs + grep) — no hits; this fact is new.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same Gene Therapy batch. Linked to CON-FND-744B37261093E4 (sticky vs blunt ends) and CON-FND-1F3840652F24F8 (fragment counting) as the two mechanical consequences of this record's recognition-and-cutting fact, and to CON-FND-3893485BBEEC06 (molecular cloning workflow) as the tool this record's enzyme is used inside.

---

# Item

## id
CON-FND-744B37261093E4

## label
A restriction endonuclease produces sticky ends when its cut leaves overlapping (complementary single-stranded overhang) fragment ends, and blunt ends when the cut leaves non-overlapping, flush fragment ends

## canonical_key
restrictiondigestion.fragment-ends.sticky-vs-blunt

## aliases
Sticky ends
Blunt ends
Cohesive ends
Overhang ends

## arabic_label
النهايات اللزجة والنهايات الحادة الناتجة عن إنزيمات القطع المحدد

## arabic_aliases
النهايات اللزجة (Sticky ends)
النهايات الحادة (Blunt ends)

## definition
When a restriction endonuclease cuts a double-stranded DNA fragment, the two resulting ends are described by whether they overlap. Sticky (cohesive) ends occur when the enzyme cuts the two strands at staggered positions, leaving a short single-stranded overhang on each fragment; because the two overhangs from any DNA cut by the same enzyme are complementary to each other, the ends of a double-stranded fragment are overlapping and can re-anneal (or anneal to a foreign fragment cut with the same enzyme) by base-pairing — this is exactly why sticky-end cutters are preferred for molecular cloning, since they let a target gene and a vector cut with the same enzyme join specifically. Blunt ends occur when the enzyme cuts both strands at the same position, leaving no overhang; the ends of a double-stranded fragment are non-overlapping (flush), and joining two blunt ends relies on non-specific ligation rather than complementary base-pairing.

## explicit_objective
State that sticky ends have overlapping (overhang) fragment ends and blunt ends have non-overlapping (flush) fragment ends, and explain why sticky ends are useful for directional cloning.

## pitfalls
Reversing the two definitions — sticky ends are the overlapping/overhang ends, blunt ends are the non-overlapping/flush ends, not the other way round. Misreading "the DNA strands stick to the restriction endonuclease" as the definition of sticky ends, when the name instead refers to the overhanging single strands of one cut fragment being able to stick (base-pair) to a complementary overhang on another fragment, with the enzyme itself no longer involved once the cut is made.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S02 | DIS-GEN

## topic
Molecular biology

## subtopic
Gene Therapy

## microtopic
Sticky vs blunt restriction-fragment ends

## nanotopic


## modules
ASU-MBG

## article_ids
ART-FND-GENE-THERAPY-AND-RECOMBINANT-DNA-TECHNOLOGY

## related_article_ids


## related_concept_ids
CON-FND-C444D428BE3E1D | CON-FND-3893485BBEEC06

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.4

## exam_weight_by_year
ASU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.9

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
CLM-FND-STICKY-VS-BLUNT-ENDS-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"In sticky ends produced by restriction endonucleases a) The 2 strands of DNA are joined to each other b) The DNA strands stick to the restriction endonuclease c) The ends of a double stranded fragment are overlapping d) The ends of a double stranded fragment are non overlapping." ANSWER: c
"In blunt ends produced by restriction endonucleases a) The 2 strands of DNA are joined to each other b) The DNA strands stick to the restriction endonuclease c) The ends of a double stranded fragment are overlapping d) The ends of a double stranded fragment are non overlapping." ANSWER: d

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Gene Therapy chapter triage (coverage/ASU-MBG-triage.md Cluster 14); no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "sticky ends" and "blunt ends" before minting (find-existing.mjs + grep) — no hits; this fact is new.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same Gene Therapy batch. Linked to CON-FND-C444D428BE3E1D (restriction endonuclease recognition) as the enzyme this record's two cut-end types come from, and to CON-FND-3893485BBEEC06 (molecular cloning workflow) as the reason sticky ends matter for directional cloning.

---

# Item

## id
CON-FND-1F3840652F24F8

## label
A restriction enzyme cutting a linear DNA molecule at n sites produces n+1 fragments, but the same enzyme cutting a circular DNA molecule (e.g. a plasmid) at n sites produces exactly n fragments

## canonical_key
restrictiondigestion.fragment-count.linear-vs-circular-dna

## aliases
Restriction fragment counting
Linear vs circular DNA digestion
Plasmid digestion fragment number

## arabic_label
حساب عدد القطع الناتجة عن القطع المحدد في الدنا الخطي والدائري

## arabic_aliases
عدد القطع في الدنا الخطي
عدد القطع في الدنا الدائري (البلازميد)

## definition
Counting the fragments a restriction enzyme produces depends on whether the starting DNA molecule is linear or circular. A linear piece of DNA already has two free ends before any cut is made, so each additional cut at one of the enzyme's n recognition sites adds one more fragment: n cut sites produce n+1 fragments (three sites on a linear molecule give four fragments). A circular piece of DNA (such as a bacterial plasmid, which is the standard cloning vector) has no free ends to start with, so every cut both creates a new fragment and closes off the fragment before it; n cut sites on a circular molecule therefore produce exactly n fragments (three sites on a circular molecule give three fragments, not four).

## explicit_objective
Calculate the number of fragments produced by a restriction enzyme cutting at n sites, applying the linear rule (n+1 fragments) and the circular rule (n fragments) correctly to the shape of molecule given.

## pitfalls
Applying the linear-molecule rule (n+1) to a circular molecule such as a plasmid, which instead follows the n-fragments rule because it has no free ends before the first cut. The number of fragments is always predictable once the molecule's topology (linear vs circular) and the enzyme's number of recognition sites are both known — it is never "impossible to predict," a distractor this question set includes as a deliberately wrong option.

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
SYS-FND-T01-S02 | DIS-GEN

## topic
Molecular biology

## subtopic
Gene Therapy

## microtopic
Restriction-fragment counting for linear vs circular DNA

## nanotopic


## modules
ASU-MBG

## article_ids
ART-FND-GENE-THERAPY-AND-RECOMBINANT-DNA-TECHNOLOGY

## related_article_ids


## related_concept_ids
CON-FND-C444D428BE3E1D | CON-FND-3893485BBEEC06

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.4

## exam_weight_by_year
ASU_Y1=0.4

## clinical_relevance
0.1

## academic_relevance
0.9

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
CLM-FND-FRAGMENT-COUNT-LINEAR-CIRCULAR-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"If a linear piece of DNA has three sites for a particular restriction enzyme, into how many fragments will that restriction enzyme cut the DNA? a) 2 b) 4 c) 3 d) 5" ANSWER: b
"If a circular piece of DNA has three sites for a particular restriction enzyme, into how many fragments will that restriction enzyme cut the DNA? a) 2 b) 4 c) 3 d) 5 e) The answer cannot be predicted." ANSWER: c

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Gene Therapy chapter triage (coverage/ASU-MBG-triage.md Cluster 14); no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "restriction fragment" and "circular DNA digestion" before minting (find-existing.mjs + grep) — no hits; this fact is new.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same Gene Therapy batch. Linked to CON-FND-C444D428BE3E1D (restriction endonuclease recognition) as the enzyme this record's counting rule applies to, and to CON-FND-3893485BBEEC06 (molecular cloning workflow) since plasmid vectors are the worked circular-DNA case.

---

# Item

## id
CON-FND-3893485BBEEC06

## label
Molecular cloning joins a target DNA segment cut out by a restriction enzyme into a circular double-stranded plasmid vector to form chimeric (recombinant) DNA, which is then transfected into a host cell and selected for using the vector's marker gene

## canonical_key
molecularcloning.workflow.chimeric-dna-and-vectors

## aliases
Molecular cloning workflow
Chimeric DNA
Recombinant DNA
Bacterial plasmid vector
Vector essential features

## arabic_label
مراحل الاستنساخ الجزيئي وتكوين الدنا الهجين ومتجهات البلازميد

## arabic_aliases
الدنا الهجين (Chimeric DNA)
البلازميد الناقل (Vector)
الاستنساخ الجزيئي

## definition
Molecular cloning is a laboratory DNA technology, distinct from gene therapy, CRISPR gene editing and PCR, in which a target DNA segment is joined to a vector to form chimeric DNA — a gene formed by joining DNA segments from two different sources, also called a hybrid or recombinant gene (all three terms describe the same product). The standard vector is a bacterial plasmid, a double-stranded circular DNA molecule (not single-stranded and not linear); a functional vector must additionally be capable of replicating inside the host cell, contain a restriction site recognised by restriction endonucleases so target DNA can be inserted, and carry a marker gene for selecting successfully transformed host cells — being circular is typical of a plasmid vector but is not itself one of these three essential features, since some vectors (viral vectors) are not circular. The correct sequence of the cloning workflow is: (1) use a restriction endonuclease to isolate/excise the target DNA, (2) join it to the cut vector to form chimeric DNA, (3) transfect the chimeric DNA into a host cell, and (4) select the successfully transformed host cells by their marker gene. Separately, molecular cloning technology is also the basis for producing monoclonal antibodies used in diagnostic tests, via hybridoma cloning of antibody-producing cells.

## explicit_objective
Describe the correct order of the molecular cloning workflow (cut target DNA, form chimeric DNA, transfect host, select by marker), state that a bacterial plasmid vector is double-stranded circular DNA, and list the three essential features of a vector.

## pitfalls
Ordering the cloning steps by the sequence they are listed in a question rather than their true biological order — restriction digestion of the target DNA always comes first, transfection always comes after chimeric DNA has been formed, and marker-based selection always comes last, after transfection. Naming "must be circular" as an essential vector feature — replication capacity, a restriction site, and a marker gene are the three essential features; being circular is typical of plasmid vectors specifically but not a universal requirement (viral vectors are not circular). Confusing "hybrid gene," "chimeric gene" and "recombinant gene" as three different things rather than three names for the same DNA-segment-from-two-sources product.

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
SYS-FND-T01-S02 | DIS-GEN

## topic
Molecular biology

## subtopic
Gene Therapy

## microtopic
Molecular cloning workflow, chimeric DNA and vector features

## nanotopic


## modules
ASU-MBG

## article_ids
ART-FND-GENE-THERAPY-AND-RECOMBINANT-DNA-TECHNOLOGY

## related_article_ids


## related_concept_ids
CON-FND-C444D428BE3E1D | CON-FND-744B37261093E4 | CON-FND-1F3840652F24F8

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.5

## exam_weight_by_year
ASU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.9

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
CLM-FND-MOLECULARCLONING-WORKFLOW-CHIMERIC-VECTOR-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Bacterial plasmid used in molecular cloning is a a) Single stranded linear DNA b) Single stranded circular DNA c) Double stranded linear DNA d) Double stranded circular DNA." ANSWER: d
"Cloning technology involves the formation of chimeric DNA, that means a) Plasmid b) A target DNA segment c) Coupling human and bacterial DNAs together d) Bacterial DNA." ANSWER: c
"Monoclonal antibodies which are needed for different diagnostic tests are prepared by which of the following DNA technologies: a) Molecular cloning b) Polymerase Chain Reaction c) Gene therapy d) Gene editing." ANSWER: a
"All of the following is essential features of vector except a) Capable of replication inside host cell. b) Contain restriction site recognized by restriction endonucleases. c) Contain a marker gene d) Must be circular" ANSWER: d
"The true sequence of the following steps of cloning is 1-Transfection to host cell 2- Formation of chimeric DNA 3- Select the host cell by marker 4- Use restriction endonuclease to isolate target DNA a) 4-3-2-1 b) 4-2-1-3 c) 4-1-2-3 d) 4-3-1-2" ANSWER: b (4-2-1-3)
"A vector in genetic engineering is a : a) restriction endonuclease. b) CRISPR is an example. c) An organism that can carry a disease to a host. d) Plasmid or virus that carries modified genetic material. e) A host organism that is used to grow up lots of copies of transfected DNA." ANSWER: d
"The gene formed by the joining of DNA segments from two different sources are called as ___. a) Hybrid gene. b) Chimeric gene. c) Recombinant gene. d) All of these. e) None of these." ANSWER: d

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Gene Therapy chapter triage (coverage/ASU-MBG-triage.md Cluster 14); no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "molecular cloning", "chimeric DNA", "plasmid vector" and "monoclonal antibody" before minting (find-existing.mjs + grep) — no hits; this fact is new.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same Gene Therapy batch. Linked to CON-FND-C444D428BE3E1D, CON-FND-744B37261093E4 and CON-FND-1F3840652F24F8 as the restriction-enzyme mechanics this record's cloning workflow depends on.
q16OptionLettering: The source page prints the four cloning-order options as "a) 4-3-2-1 / b) 4-2-1-3" on the first row and "b) 4-1-2-3 / d) 4-3-1-2" on the second row — the third option is mislabelled "b" again rather than "c" (a printing error, confirmed against the printed answer table which keys this question "b" pointing unambiguously at "4-2-1-3", the only order that puts restriction digestion first, chimeric-DNA formation second, transfection third and marker-selection last). The emitted question therefore normalises the four options to A) 4-3-2-1, B) 4-2-1-3, C) 4-1-2-3, D) 4-3-1-2, with correct = B.

---

# Item

## id
CON-FND-16C60870619649

## label
CRISPR-Cas9 is a gene-editing (not gene-therapy, gene-cloning, or in-vitro-amplification) technology, in which the Cas9 enzyme performs the DNA-cutting step

## canonical_key
crispr.mechanism.cas9-gene-editing

## aliases
CRISPR-Cas9
Cas9 enzyme
Gene editing vs gene therapy
Gene editing strategies

## arabic_label
تقنية كريسبر كاس 9 كأداة لتحرير الجينات وإنزيم Cas9

## arabic_aliases
كريسبر (CRISPR)
إنزيم كاس 9 (Cas9)
تحرير الجينات

## definition
CRISPR-cas9 is classified as a gene editing strategy — distinct from recombinant DNA (molecular cloning), gene cloning, in vitro DNA amplification (PCR), and gene therapy, even though these related technologies are often tested against each other as options. Cas9 is the enzyme CRISPR-cas9 uses to cut the target DNA at a site specified by a guide RNA, and it is Cas9 by name, not Cas3, Cas5, Cpr9 or "Rna5," that a question testing this fact expects.

## explicit_objective
Classify CRISPR-cas9 correctly as a gene-editing strategy and name Cas9 as the cutting enzyme it uses.

## pitfalls
Selecting a plausible-sounding but incorrect enzyme name — Cas3, Cas5, and "Cpr9" are constructed distractors, not real CRISPR components, and "Rna5" confuses the guide RNA component's name with the enzyme. Classifying CRISPR-cas9 as "gene therapy" because it can in principle correct a disease-causing sequence — in this course's classification scheme CRISPR-cas9 is tested specifically as gene editing, a distinct category from gene therapy, recombinant DNA/cloning, and PCR-based amplification.

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
SYS-FND-T01-S02 | DIS-GEN

## topic
Molecular biology

## subtopic
Gene Therapy

## microtopic
CRISPR-Cas9 classification and enzyme

## nanotopic


## modules
ASU-MBG

## article_ids
ART-FND-GENE-THERAPY-AND-RECOMBINANT-DNA-TECHNOLOGY

## related_article_ids


## related_concept_ids
CON-FND-06F6AE69D9BD8D | CON-FND-3893485BBEEC06

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.4

## exam_weight_by_year
ASU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
CLM-FND-CRISPR-CAS9-GENE-EDITING-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"What enzyme is used in CRISPR gene editing? a) Rna5. b) Cas 5 c) Cas3. d) Cpr 9. e) Cas 9." ANSWER: e
"Which of the following gene strategies applies to CRISPR-cas9? a. Recombinant DNA b. Gene editing c. Gene cloning d. In vitro DNA amplification e. Gene therapy" ANSWER: b

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Gene Therapy chapter triage (coverage/ASU-MBG-triage.md Cluster 14); no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "CRISPR" and "Cas9" before minting (find-existing.mjs + grep) — no hits; this fact is new.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same Gene Therapy batch. Linked to CON-FND-06F6AE69D9BD8D (gene therapy definition) as the sibling category CRISPR-cas9 is contrasted against, and to CON-FND-3893485BBEEC06 (molecular cloning) as another sibling category in the same classification question.

---

# Item

## id
CON-FND-1C82888CCCC7FD

## label
Adenosine deaminase (ADA) deficiency, a severe combined immunodeficiency, was the first disorder researchers treated with gene therapy, and gene therapy to replace the ADA gene — not any form of blood-product transfusion — is the treatment that can permanently cure it

## canonical_key
adascid.treatment.first-successful-gene-therapy

## aliases
ADA-SCID gene therapy
First gene therapy trial
Gene therapy for ADA deficiency

## arabic_label
العلاج الجيني لعوز نازعة أمين الأدينوزين كأول اضطراب عولج بالعلاج الجيني

## arabic_aliases
العلاج الجيني لعوز ADA
أول تجربة علاج جيني

## definition
Adenosine deaminase (ADA) deficiency is an autosomal recessive severe combined immunodeficiency in which bone marrow lymphoblasts cannot replicate to generate immune-competent lymphocytes (the underlying biochemical mechanism — dATP accumulation inhibiting ribonucleotide reductase — is covered separately). ADA deficiency holds a specific historical distinction in this chapter: it was the first disorder researchers treated with gene therapy. For a patient with ADA-SCID whose bone marrow lymphoblasts cannot replicate, transfusion-based treatments (blood, plasma, lymphocyte, or platelet transfusion from a healthy donor) can only provide temporary, passive replacement — they do not correct the underlying genetic defect and so cannot permanently cure the patient. Gene therapy to replace the defective ADA gene is the treatment option that would permanently cure the patient, because it corrects the defect in the patient's own lymphoblasts rather than substituting donor cells or products from outside.

## explicit_objective
State that ADA deficiency was the first disorder treated with gene therapy, and explain why gene therapy to replace the ADA gene — rather than any transfusion of donor blood products — is the option that can permanently cure ADA-SCID.

## pitfalls
Selecting a transfusion-based option (blood, plasma, lymphocyte, or platelet transfusion) as a permanent cure for ADA-SCID — every transfusion option supplies donor material temporarily and does not correct the patient's own genetic defect, so none of them is curative in the way gene replacement is. Confusing this chapter's historical fact (ADA deficiency was the first disorder treated with gene therapy) with a different immunodeficiency such as cystic fibrosis, sickle cell anaemia, OTC deficiency, or Duchenne muscular dystrophy, which are distractors in the same question and were not the first gene-therapy target.

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
SYS-FND-T01-S02 | DIS-IMU-T05

## topic
Molecular biology

## subtopic
Gene Therapy

## microtopic
ADA-SCID as the first gene-therapy success

## nanotopic


## modules
ASU-MBG

## article_ids
ART-FND-GENE-THERAPY-AND-RECOMBINANT-DNA-TECHNOLOGY

## related_article_ids


## related_concept_ids
CON-FND-06F6AE69D9BD8D | CON-IMM-10470076F1AF95

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.5

## exam_weight_by_year
ASU_Y1=0.5

## clinical_relevance
0.7

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
CLM-FND-ADASCID-FIRST-GENE-THERAPY-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A patient suffers from adenosine deaminase (ADA) deficiency, an autosomal recessive immune deficiency in which bone marrow lymphoblasts cannot replicate to generate immune-competent lymphocytes. The treatment option that would permanently cure the patient is a) Blood transfusion from a healthy donor b) Plasma transfusion from a healthy donor c) Lymphocytes transfusion from a healthy donor d) Platelet transfusion from a healthy donor e) Gene therapy to replace ADA gene." ANSWER: e
"Which deficiency of the immune system was the first disorder researchers treated with gene therapy? a) Adenosine deaminase deficiency (ADA). b) Cystic Fibrosis (CF). c) Sickle Cell Anemia (SCA). d) Ornithine transcarbamylase (OTC). e) Duchenne muscular dystrophy (DMD)." ANSWER: a

## merge_ids

## rejected_merge_candidate_ids
CON-IMM-10470076F1AF95 (adenosine deaminase deficiency and SCID, Kasr live/pending) — that record teaches the biochemical mechanism (dATP accumulation inhibiting ribonucleotide reductase) and does not mention gene therapy as a treatment at all; this record's tested facts (ADA-SCID as the first gene-therapy target, gene replacement as the only curative option among transfusion distractors) are a different, therapy-history angle on the same disease, so linked as a related concept rather than merged into.

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication.

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
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the ASU-MBG Gene Therapy chapter triage (coverage/ASU-MBG-triage.md Cluster 14); no corpus pipeline-extraction record exists for this chapter.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "adenosine deaminase deficiency gene therapy" and "ADA-SCID" before minting (find-existing.mjs + grep) — grep hit CON-IMM-10470076F1AF95 (docs/Kasr-Source-Imports/concept/103-BMS-mcq-purine-concepts.md), which covers the biochemical mechanism only, not gene therapy as treatment; kept as a related concept, not merged into or overlaid (see rejected_merge_candidate_ids).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 7 concepts minted for this same Gene Therapy batch. Linked to CON-FND-06F6AE69D9BD8D (gene therapy definition) as the general concept this record's worked clinical example sits behind, and to CON-IMM-10470076F1AF95 (Kasr, ADA deficiency biochemical mechanism) as the companion record covering why ADA deficiency causes SCID in the first place.
