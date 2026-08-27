<!--
  Coverage articles for 102 INT — hand-authored, not a build-batches.ts output.

  Nine articles closing the article-coverage gap the validator's union rule
  reports for 102 INT (concept `article_ids` ∪ article `related_concepts`,
  intersected against a question's own `library_ids`; see
  `Instruction Manual for Content Creation/05-questions.md`'s coverage rule and
  `scripts/validate-content-batch.mjs` around the foldInSiblings merge and the
  per-question "main concept X is not covered by any article in library_ids"
  check). Two groups of concept needed this:

  1. ART-102-BIO-REGULATION-OF-GENE-EXPRESSION — the one chapter of the
     Biochemistry part with no article at all. Six concepts in
     ../concept/102-INT-mcq-concepts.md already carry this exact ID on their
     own `article_ids`, and thirteen questions in
     ../question/102-INT-mcq.md already carry it on `library_ids` — the ID was
     pre-assigned by the generator that minted those records; this article
     exists to be the file that ID actually names. No leaf change is needed
     for this one: writing the article with this ID is sufficient.

  2. Seventeen concepts that only the 2022 sittings
     (../written/102-INT-BAQOON-2022-written.md and
     ../written/102-INT-EOY-2022-written.md) test. They were minted with an
     empty `article_ids` column — no article existed yet for 2022-specific
     material on a chapter the 2024/2025 papers touched differently — and
     their written items' `library_ids` are correspondingly empty. Eight
     small articles here, one per topic group of one department-book chapter
     or two adjoining ones, each carrying a fresh ID (the existing
     ART-102-BIO-*/ART-102-PHY-* chapter articles already exist for different,
     2024/2025-sourced concepts on the same chapters and are left untouched —
     this file only adds `related_concepts` from the article side, per the
     union rule, rather than editing a sibling lane might also be touching).

  A further two concepts (CON-HEM-BDED630BBC87A3, CON-HEM-7F0EF6B0D6F2FB) are
  NOT covered by any article here: they already carry a real article on their
  own `article_ids` (ART-102-PHY-IRON-METABOLISM /
  ART-102-PHY-VITAMIN-B12-AND-FOLIC-ACID, both live), but the corresponding
  MCQ rows' `library_ids` field is empty or partial, generated before that
  link existed. That is a leaf-regeneration fix, not a missing article — see
  the coverage report's LEAF FIXES NEEDED section.

  Source of record for every claim below, from ../manifest/kasr-y1-sources.json:

    src_a488633802ec053c6325 — "Introduction to Biomedical Sciences (INT - 102)",
      Department Book Module 102, 167 pages, Faculty of Medicine, Cairo
      University. Part I is Medical Biochemistry and Molecular Biology and
      restarts its own page numbering (printed = physical - 4). Part II is
      Physiology and restarts again (printed = physical - 113). Every page
      citation below is PHYSICAL (the pagetext cache's own index), with the
      printed number given alongside it, matching the convention
      ../article/102-INT-biochemistry.md and ../article/102-INT-physiology.md
      already use.

  Everything taught here is the department book's own wording, paraphrased.
  Where a concept's own label already states the book does not cover a topic
  (CON-FND-DD3EE5EC8C07D1, LDH/CK isoenzymes), this file does not invent
  content — see the Enzyme inhibition article's Clinical significance section
  and its `evidence_gaps`.

  No claim, citation or span record has been authored for any article here —
  evidence pass (S5) has not started for this module's 2022-sitting content,
  same as ../article/102-INT-biochemistry.md's own `field_notes`. No medical
  image exists in this repository; nothing here downloads, generates or
  attaches one, and no `media_recommendations` block was written because
  every fact taught is text- and table-shaped in the book itself (comparison
  tables, lists, codon tables), not a figure a student must see to answer the
  banked questions.

  Stage: S4 (concepts, articles and their evidence_basis/related_concepts
  links are in place) for all nine articles. Not yet S5 (no claims/citations/
  spans authored) or S7 (no independent completeness/dup pass run beyond this
  lane's own gates, pasted under GATES in ../../.. report A1b-102-coverage.md).
-->

# Item
## id
ART-102-BIO-REGULATION-OF-GENE-EXPRESSION
## title
Regulation of gene expression
## arabic_title

## aliases
Pre-transcriptional regulation | Transcriptional regulation | Post-transcriptional regulation | Translational regulation | Post-translational regulation | Epigenetic regulation of gene expression
## subject
fnd
## topic
Biochemistry
## subtopic
Regulation of Gene Expression
## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T06
## secondary_node_ids
[clear]
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Year 1 foundation
## reading_time
8
## high_yield
High
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## universities
kau
## years
Year 1
## module
102 INT
## module_subject
102 INT > Biochemistry > Regulation of Gene Expression
## summary
Eukaryotic gene expression is switched on and off at five separate levels, in the order a gene's information actually flows through them: pre-transcriptional (which DNA is even available), transcriptional (whether RNA polymerase is invited to start), post-transcriptional (what happens to the raw transcript before it leaves the nucleus), translational (whether the ribosome is allowed to work) and post-translational (what happens to the finished protein). The question books test this chapter almost entirely as classification — given a named mechanism, place it at the correct one of the five levels — so the five levels are taught here as one ordered chart rather than as five separate topics.
## sections
### Definition
Gene expression is the process by which the information in a gene becomes a functional product, RNA or protein, and the cell must regulate this strictly so that it makes the right amount of each protein at the right time (physical p102, printed p98). Genes come in two kinds. Unregulated, constitutive or housekeeping genes are expressed continually at a fixed rate for basic cellular functions the book's example is the β-actin gene. Regulated genes are the majority and are expressed only when needed, such as the globin genes. Regulation happens at multiple points, but mainly at the level of transcription, and the book organises the whole chapter around five levels in the order a transcript passes through them: pre-transcriptional, transcriptional, post-transcriptional, translational and post-translational (physical p102, printed p98).

### Mechanism
Pre-transcriptional regulation acts on the DNA itself, before any RNA is made, in three ways (physical p103-104, printed p99-100). Epigenetic mechanisms change gene activity without changing the DNA sequence: DNA methylation adds a methyl group to a cytosine next to a guanine (a CpG island), usually in a promoter, and silences that gene, while demethylation reverses it; chromatin remodeling changes how tightly histones package the DNA, for example histone acetyltransferases (HATs) add acetyl groups to histone lysines, loosening the DNA-histone grip and switching the gene on, while histone deacetylases (HDACs) remove them and switch it back off. The amount of DNA can also change: gene amplification increases gene copy number, and the book's example is malignant cells amplifying the dihydrofolate reductase (DHFR) gene to resist methotrexate, an anti-folate chemotherapy drug that inhibits DHFR; gene diminution decreases copy number, seen as RBCs mature and lose their genes entirely. Gene rearrangement recombines DNA segments, and the book's example is immunoglobulin heavy- and light-chain genes rearranging to generate millions of different antibodies from a few hundred starting gene segments.

Transcriptional regulation works through cis-acting and trans-acting elements (physical p105, printed p101). Cis-acting elements are DNA sequences that only affect genes on the same chromosome: the promoter (carrying the TATA box, CAAT box and GC box), enhancers and silencers (which can sit far from the promoter, on either strand, and respectively promote or inhibit transcription by binding proteins), and hormone-response elements, which let a hormone-receptor complex bind DNA directly (steroid and thyroid hormones are the book's examples). Trans-acting elements are regulatory molecules made elsewhere in the cell that diffuse to the DNA-binding site — the book's example is a trans-acting molecule transcribed from a gene on chromosome 11 regulating a gene on chromosome 6.

Post-transcriptional regulation covers what happens to the primary transcript: capping, poly-A tailing and splicing (taught in the transcription chapter) and microRNAs (miRNAs), non-coding RNAs that reduce a target mRNA's expression either by triggering its degradation or by blocking its translation (physical p105, printed p101).

### Key determinants
Translational regulation is a single named mechanism: phosphorylation of some initiation factors (IFs) by protein kinases that activate under cellular stress or when energy for protein synthesis would be wasteful, such as starvation blocks protein synthesis (physical p106, printed p102). Post-translational regulation (trimming and covalent modification of the finished protein) is taught in full in the translation chapter and only named here as the fifth level (physical p106, printed p102). Holding the five levels in this fixed order is what a classification question actually tests: a mechanism is placed by asking whether it acts on DNA before transcription starts (pre-transcriptional), on the decision to start transcribing (transcriptional), on the raw transcript (post-transcriptional), on the ribosome (translational) or on the finished protein (post-translational) — not by how familiar the mechanism sounds.

### Clinical significance
Two of the five levels carry a named clinical example the papers can ask for directly. Gene amplification of DHFR is the mechanism of acquired methotrexate resistance in malignant cells, tying pre-transcriptional regulation to chemotherapy failure. Immunoglobulin gene rearrangement is what gives the adaptive immune system enough antibody diversity to recognise antigens it has never met, tying pre-transcriptional regulation to normal immune function rather than disease. Both are testable as "which level of regulation explains this clinical observation" questions, which is the same skill as the pure classification questions above, applied to a stem.
## published_summary

## published_sections

## hold_these
Gene expression is regulated at five levels, in the order a transcript passes through them: pre-transcriptional, transcriptional, post-transcriptional, translational, post-translational.
Pre-transcriptional regulation covers epigenetic mechanisms (DNA methylation, chromatin remodeling), the amount of DNA (amplification, diminution) and gene rearrangement.
DNA methylation silences a gene; histone acetylation (by HATs) activates it, histone deacetylation (by HDACs) silences it again.
Malignant cells amplify the DHFR gene to resist methotrexate; RBCs lose their genes entirely as they mature (gene diminution).
Immunoglobulin genes are rearranged to generate antibody diversity.
Transcriptional regulation works through cis-acting elements (promoter, enhancers, silencers, hormone-response elements) and trans-acting elements (diffusible regulatory molecules).
Post-transcriptional regulation includes capping, poly-A tailing, splicing and miRNAs, which degrade or block translation of a target mRNA.
Translational regulation is phosphorylation of initiation factors, which blocks protein synthesis under stress or starvation.
Post-translational regulation is trimming and covalent modification of the finished protein.
## lose_the_mark
Sorting a post-transcriptional mechanism (capping, poly-A tailing, splicing, miRNA) into pre-transcriptional or translational. All four are post-transcriptional: they act on the transcript, not on DNA or on the ribosome.
Calling DNA methylation an activating mark. It silences the gene; histone acetylation is the activating mark, not methylation.
Treating gene amplification and gene rearrangement as the same mechanism. Amplification changes copy number of one gene (DHFR); rearrangement recombines many gene segments (immunoglobulins) — they answer different exam stems.
Placing hormone-response elements at the translational level because a hormone is a signalling molecule. They are cis-acting DNA elements, acting at the transcriptional level, not at the ribosome.
Calling miRNA a transcriptional regulator. It acts after the transcript is made — post-transcriptional, by the book's own ordering.
## related_concepts
CON-FND-94381B5F0910E5
CON-FND-4C59A8FA82E031
CON-FND-8AA415B9264E77
CON-FND-188C3491E290C4
CON-FND-CCAFC81D7A7486
CON-FND-3873490E96F864
CON-FND-344140D2457FBB
CON-FND-27013C64915C7E
CON-FND-CC55F157021237
## related_articles


## question_ids
[clear]

## resource_ids
src_a488633802ec053c6325
## article_source_ids
src_a488633802ec053c6325
## claim_ids
[clear]

## span_ids
[clear]

## university_notes
kau: Thirteen questions across the question books test this chapter, all as classification (place a named mechanism at its level) — the highest question count of any chapter this article set closes coverage for.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department Book Module 102 (src_a488633802ec053c6325), Part I Medical Biochemistry and Molecular Biology, chapter XIII "Regulation of Gene Expression", physical pages 102-106 (printed pages 98-102) — the two gene types, the five-level chart, epigenetic mechanisms (DNA methylation, chromatin remodeling), gene amplification/diminution, gene rearrangement, cis- and trans-acting elements, post-transcriptional miRNA, translational IF phosphorylation, and post-translational trimming/covalent modification (cross-referenced to the translation chapter).
## evidence_gaps
The book states DHFR-gene amplification confers methotrexate resistance but gives no figure for how many extra copies are typically seen, and none is supplied here.
No claim record and no evidence span has been authored for any sentence in this article yet — the evidence pass for 2022-sitting-sourced 102 INT content has not started.
The book gives no Arabic terminology for any of the five regulation levels, and none is written here.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written from the department book's own chapter XIII. Searched before creating: no live or pending article named this ID; six concepts in ../concept/102-INT-mcq-concepts.md and thirteen MCQ rows in ../question/102-INT-mcq.md already carry ART-102-BIO-REGULATION-OF-GENE-EXPRESSION on `article_ids`/`library_ids` respectively, pre-assigned by the generator — this article supplies the file that ID was always meant to name, so no leaf change is needed for this chapter. Three further concepts (CON-FND-344140D2457FBB, CON-FND-27013C64915C7E, CON-FND-CC55F157021237) also name this article on their own `article_ids` as a secondary reference from the Translation/Transcription chapters; they are already covered by their own chapter's dedicated article, and are named in `related_concepts` here only to keep the link consistent from both sides.
## field_notes
arabicTitle: Teaching at Kasr Alainy is in English and the department book prints no Arabic term for this chapter; not transliterated, matching the position taken across ../concept/102-INT-concepts.md and ../article/102-INT-biochemistry.md.
subtopicId: No SUB_ identifier exists for this module in the curriculum overlay; module_subject carries the position instead.
microtopicId / nanotopicId: No MIC_/NAN_ identifiers exist for first-year basic science material.
secondaryNodeIds: This chapter has no secondary system placement beyond its own biochemistry node.
questionIds: The reciprocal link from question to article is carried on the question's own `library_ids`; no separate reverse index is authored here.
media / mediaRecommendations: The repository holds no medical image. Every fact this chapter tests (the five-level order, cis/trans classification, DHFR amplification) is table- or list-shaped in the book, not a figure a student must see to answer a banked question, so no media request was filed.
claimIds / spanIds: No claim or span record exists for this module's 2022-sitting content; the evidence pass follows once the concept/article set is complete.
lastReviewed / reviewDue: New record; not yet reviewed by faculty.

---

# Item
## id
ART-102-BIO-NUCLEOTIDES-AND-NUCLEIC-ACIDS-SUPPLEMENT
## title
Cyclic nucleotide second messengers, and DNA versus RNA
## arabic_title

## aliases
cAMP signaling | Second messenger systems | DNA and RNA comparison
## subject
fnd
## topic
Biochemistry
## subtopic
Chemistry of Free Nucleotides | Chemistry of Nucleic Acids
## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T01
## secondary_node_ids
DIS-BIO-T06
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Year 1 foundation
## reading_time
7
## high_yield
Supplementary
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## universities
kau
## years
Year 1
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Free Nucleotides
102 INT > Biochemistry > Chemistry of Nucleic Acids
## summary
Two 2022-sitting questions sit on two different chapters that share nothing except being about nucleotides: how a hormone that cannot cross the cell membrane still changes what a cell does (cAMP as a second messenger, relaying glucagon, epinephrine and insulin's opposite signals to protein kinase A), and how DNA and RNA differ across every dimension the book tabulates side by side (bases, sugar, strandedness, type and location). They are taught together here because each is a single, self-contained fact pattern too short to be its own article.
## sections
### Definition
Cyclic 3',5'-adenosine monophosphate (cAMP) is a signaling second messenger formed from ATP by adenylyl cyclase and broken down to AMP by phosphodiesterase (physical p69, printed p65). Deoxyribonucleic acid (DNA) and ribonucleic acid (RNA) are the two nucleic acids the book compares directly, on six axes: nitrogenous bases, sugar, strand shape, type, cellular site and function (physical p79, printed p75).

### Mechanism
A hormone that cannot enter the cell (a peptide hormone, for example) binds a cell-membrane receptor, which activates a G protein, which activates adenylyl cyclase, which converts ATP to cAMP. cAMP then activates protein kinase A (PKA): PKA is a tetramer of two regulatory (R) and two catalytic (C) subunits, and binding of two cAMP molecules to each regulatory subunit releases the two catalytic subunits, which are now active and phosphorylate their target enzymes. Phosphorylation activates some enzymes (the book's example is glycogen phosphorylase kinase) and inactivates others (glycogen synthase). A protein phosphatase reverses the process by dephosphorylating those enzymes. Glucagon and epinephrine both work through this cascade: they activate adenylyl cyclase and raise cAMP, which in turn inhibits protein phosphatase, so phosphorylated (activated glycogen breakdown) enzymes stay phosphorylated. Insulin does the opposite: it activates protein phosphatase and phosphodiesterase, lowering cAMP, which reverses glucagon and epinephrine's effect and favours glycogen synthesis over breakdown (physical p69-70, printed p65-66).

DNA and RNA differ on every axis the book draws, and the differences are internally consistent rather than arbitrary. Bases: both carry adenine, guanine and cytosine, but DNA carries thymine and no uracil, while RNA carries uracil (and thymine only as a minor base in tRNA). Sugar: DNA uses 2-deoxyribose, RNA uses ribose — the "deoxy" in DNA's name is exactly this missing 2'-hydroxyl. Strand shape: DNA is a double helix, RNA is single-stranded (physical p79, printed p75).

### Key determinants
Type and site follow from the strandedness difference. DNA exists as linear or circular molecules and is found in the nucleus and mitochondria, carrying and passing on genetic information and directing RNA synthesis. RNA exists as several distinct types built for different jobs — mRNA, tRNA, rRNA — and is found mainly in the cytosol, less commonly in the nucleus and mitochondria, carrying out protein synthesis rather than storing the genetic record (physical p79, printed p75).

### Clinical significance
cAMP's opposite regulation by glucagon/epinephrine versus insulin is the biochemical basis of how the body switches between building up and breaking down glycogen stores from one hormonal signal, and is the same cascade logic (G protein → cyclase → cyclic nucleotide → protein kinase) that many other peptide hormones and drugs reuse, including cGMP-mediated smooth muscle relaxation by nitric oxide and vasodilators, which the book treats immediately after cAMP as the same family of mechanism (physical p70, printed p66). The DNA/RNA comparison underlies why RNA (single-stranded, with uracil and ribose) is chemically less stable than DNA and why only DNA is the long-term store of genetic information across both nuclear and mitochondrial compartments.
## published_summary

## published_sections

## hold_these
cAMP is made from ATP by adenylyl cyclase and broken down to AMP by phosphodiesterase.
Glucagon and epinephrine raise cAMP (via adenylyl cyclase) and inhibit protein phosphatase; insulin lowers cAMP (via phosphodiesterase) and activates protein phosphatase.
Protein kinase A is a tetramer of two regulatory and two catalytic subunits; cAMP binding to the regulatory subunits releases the active catalytic subunits.
DNA has thymine and no uracil, 2-deoxyribose, and is double-stranded; RNA has uracil (thymine only in tRNA), ribose, and is single-stranded.
DNA is found in the nucleus and mitochondria and carries genetic information; RNA is mainly cytosolic (mRNA, tRNA, rRNA) and carries out protein synthesis.
## lose_the_mark
Saying insulin raises cAMP because it "activates" something. Insulin activates phosphodiesterase and protein phosphatase, both of which lower cAMP and reverse glucagon/epinephrine's effect.
Reversing which subunit of protein kinase A is released by cAMP. cAMP binds the regulatory subunits; the catalytic subunits are what is released and made active.
Giving RNA a double helix or DNA a single strand. The book's own comparison table has this as the "Shape of strand" row precisely because it is the row students reverse under exam pressure.
Forgetting that RNA does carry thymine, as a minor base in tRNA — "RNA has no thymine" is an overstatement of the book's own row, which says "as minor base in tRNA," not "never."
## related_concepts
CON-FND-12CE1BF1D6C77C
CON-FND-E50700FFFCF367
## related_articles
ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES: the chapter this cAMP mechanism is drawn from, covering the rest of the nucleotide chapter's 2024/2025-tested content.
ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS: the chapter this DNA/RNA comparison is drawn from, covering the rest of the nucleic-acid chapter's 2024/2025-tested content.
## question_ids
[clear]

## resource_ids
src_a488633802ec053c6325
## article_source_ids
src_a488633802ec053c6325
## claim_ids
[clear]

## span_ids
[clear]

## university_notes
kau: Both concepts were asked on the 2022 end-of-year and Baqoon (resit) papers as short compare/explain items, not on the 2024 or 2025 papers, which is why they sat uncovered until this article.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department Book Module 102 (src_a488633802ec053c6325), Part I Medical Biochemistry and Molecular Biology, "Chemistry of Nucleotides" section 2 (Signaling Second Messengers), physical pages 69-70 (printed pages 65-66) — cAMP synthesis and breakdown, the G-protein/adenylyl cyclase/PKA cascade, and glucagon/epinephrine versus insulin's opposite regulation. "Chemistry of Nucleic Acids", the DNA-versus-RNA comparison table, physical page 79 (printed page 75).
## evidence_gaps
The book gives no plasma or tissue concentration figure for cAMP, and none is supplied here.
No claim record and no evidence span has been authored for either sentence group in this article yet.
The book gives no Arabic terminology for either topic, and none is written here.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written from the department book alone. Searched before creating: no live or pending article covers cAMP signaling or the DNA/RNA comparison table for 102 INT; the existing ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES and ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS articles cover different concepts from the same two chapters (2024/2025-sourced) and are named in related_articles rather than edited.
## field_notes
arabicTitle: Teaching at Kasr Alainy is in English; the book prints no Arabic term for either topic.
subtopicId / microtopicId / nanotopicId: No identifiers exist at these levels for first-year basic science; module_subject carries the position.
secondaryNodeIds: DIS-BIO-T06 (nucleic acid chemistry) is carried as secondary because this article's primary placement follows the nucleotide-signaling concept.
questionIds: Carried on the question side (library_ids), not indexed in reverse here.
media / mediaRecommendations: No medical image is held; both topics are table- and pathway-diagram content already present as prose/tables in the book, not requiring a new asset to answer the banked short-answer items.
claimIds / spanIds: Evidence pass not yet started for 2022-sitting 102 INT content.
lastReviewed / reviewDue: New record; not yet reviewed.

---

# Item
## id
ART-102-BIO-HEMOPROTEINS-MYOGLOBIN-HEMOGLOBIN-SUPPLEMENT
## title
Myoglobin versus hemoglobin, and the hemoglobinopathies
## arabic_title

## aliases
Myoglobin and hemoglobin comparison | Sickle cell anemia | Thalassemia | Hemoglobinopathy
## subject
haem
## topic
Biochemistry
## subtopic
Chemistry of Hemoproteins
## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T05
## secondary_node_ids
SYS-HEM-T01
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Year 1 foundation
## reading_time
8
## high_yield
Supplementary
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## universities
kau
## years
Year 1
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Hemoproteins
## summary
Myoglobin and hemoglobin are built from the same heme-binding chemistry but built for opposite jobs — one heme ring stores oxygen inside a muscle cell, four heme rings ferry it around the blood — and the book's own side-by-side table is the exam's favourite way to ask about both at once. Sickle cell anemia and thalassemia are the two named hemoglobinopathies the book draws in full: one from a single wrong amino acid, one from too little of a chain being made at all.
## sections
### Definition
Myoglobin and hemoglobin are both hemoproteins, built around the same heme ring, but differ in exactly how many chains and heme groups they carry and where they work. Myoglobin sits in cardiac and skeletal muscle as one polypeptide chain (apomyoglobin, 153 amino acids, 8 helices) binding one heme ring. Hemoglobin A1 sits in red blood cells as four chains (α2β2: each α chain 141 amino acids/7 helices, each β chain 146 amino acids/8 helices) binding four heme rings (physical p46, printed p42). Hemoglobinopathies are a family of disorders from either structurally abnormal globin chains (sickle cell anemia) or an abnormally reduced amount of a normal chain (thalassemia) (physical p47, printed p43).

### Mechanism
Myoglobin's job is oxygen storage in muscle, releasing it during severe muscular exercise; it has a higher affinity for oxygen at low pO2 than hemoglobin does, which is exactly what lets it hold onto oxygen that hemoglobin has already released to the tissue. Hemoglobin's job is oxygen transport from lung to tissue, carbon dioxide removal from tissue, and acting as a buffer; unlike myoglobin, its affinity for oxygen changes with location — higher at the lung, lower at the tissue — which is what lets it load in the lung and unload in the tissue rather than simply holding on (physical p46, printed p42).

Sickle cell anemia is caused by a single point mutation in the β-globin gene, replacing polar glutamate with nonpolar valine at position six. That nonpolar residue creates a hydrophobic "sticky patch" on the β subunit of both oxy- and deoxy-HbS, and both HbA and HbS carry a complementary "sticky receptor" on their β subunits, but only in the deoxygenated state. At low pO2, deoxy-HbS molecules polymerise into long insoluble fibres, producing rigid, misshapen (sickled) red cells that block flow in narrow capillaries, causing localised anoxia, pain and infarction; the spleen removes sickled cells faster than normal ones, causing haemolytic anaemia (physical p47, printed p43).

### Key determinants
Thalassemia is defective production of either the α-chain (α-thalassemia) or the β-chain (β-thalassemia) — a quantity problem, not a structural one like sickle cell disease. Its severity depends on how many of the relevant genes are affected, ranging from very mild disease to severe anaemia or death of the fetus before or immediately after birth (physical p47, printed p43). Holding the two hemoglobinopathies apart is the exam's actual test: sickle cell anemia is a structural defect from a point mutation, present as HbS; thalassemia is a quantity defect from reduced or absent chain synthesis, present as reduced HbA.

### Clinical significance
The myoglobin/hemoglobin split maps directly onto how each protein is used diagnostically: myoglobin is a blood marker of muscle damage, released when muscle is injured, while HbA1c (glycated Hb, formed by non-enzymatic glucose binding to the β chain's N-terminal valine, 4-6.5% of HbA normally) is used to track a diabetic patient's glucose control over roughly the preceding three months — a different molecule, a different chain, a different clinical question (physical p44, printed p40). Sickle cell disease's whole downstream pathology (vaso-occlusion, pain crises, hemolytic anaemia) traces to the single glutamate-to-valine substitution; thalassemia's traces to gene dosage, which is why the two diseases are taught and tested as a structural-versus-quantity pair rather than as interchangeable "hemoglobin disorders."
## published_summary

## published_sections

## hold_these
Myoglobin: one chain, one heme, in muscle, stores oxygen, higher affinity at low pO2. Hemoglobin A1: four chains (α2β2), four hemes, in RBCs, transports oxygen, affinity varies by location (higher at lung, lower at tissue).
HbA1c is glycated hemoglobin (glucose bound to the β chain's N-terminal valine) and tracks diabetic control over about three months; myoglobin is a blood marker of muscle damage.
Sickle cell anemia is a point mutation (glutamate → valine at β6) causing a structural hemoglobinopathy (HbS); it polymerises at low pO2 and sickles the red cell.
Thalassemia is defective production of the α- or β-globin chain — reduced amount, not abnormal structure — with severity depending on how many genes are affected.
Hemoglobinopathies are structurally abnormal globin chains (sickle cell) or abnormally reduced globin amount (thalassemia).
## lose_the_mark
Calling sickle cell anemia a quantity defect. It is structural: a single amino-acid substitution, not reduced production.
Calling thalassemia a structural defect. It is a quantity defect: reduced or absent chain synthesis, not an abnormal amino acid.
Reversing myoglobin's and hemoglobin's oxygen-affinity behaviour. Myoglobin's affinity is fixed and high at low pO2; hemoglobin's affinity changes with location, which is what makes it a transporter rather than a store.
Using myoglobin and HbA1c interchangeably as "diabetes markers." Only HbA1c tracks glycaemic control; myoglobin is a muscle-damage marker.
## related_concepts
CON-HEM-741FE61E6062DB
CON-HEM-3B1C5DBC2DB666
## related_articles


## question_ids
[clear]

## resource_ids
src_a488633802ec053c6325
## article_source_ids
src_a488633802ec053c6325
## claim_ids
[clear]

## span_ids
[clear]

## university_notes
kau: Both concepts were asked as compare/explain items on the 2022 end-of-year and Baqoon papers, not on 2024/2025, which is why they sat uncovered until this article.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department Book Module 102 (src_a488633802ec053c6325), Part I Medical Biochemistry and Molecular Biology, "Chemistry of Hemoproteins", physical pages 44-47 (printed pages 40-43) — globin structure, HbA1c, the myoglobin-versus-hemoglobin comparison table, and the Hemoglobinopathies section (sickle cell anemia mechanism, thalassemia).
## evidence_gaps
The book gives no population-frequency figure for sickle cell trait or thalassemia carriage, and none is supplied here.
No claim record and no evidence span has been authored for any sentence in this article yet.
The book gives no Arabic terminology for either disease, and none is written here.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written from the department book alone. Searched before creating: no live or pending article covers this comparison or the hemoglobinopathies for 102 INT; the existing ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS article covers different, 2024/2025-sourced concepts from the same chapter and is left untouched.
## field_notes
arabicTitle: Teaching at Kasr Alainy is in English; the book prints no Arabic term for either topic.
subtopicId / microtopicId / nanotopicId: No identifiers exist at these levels for first-year basic science; module_subject carries the position.
secondaryNodeIds: SYS-HEM-T01 matches the system placement both source concepts already carry.
questionIds: Carried on the question side (library_ids).
media / mediaRecommendations: No medical image is held; the sickling mechanism and the comparison table are both already prose/table content in the book.
claimIds / spanIds: Evidence pass not yet started for 2022-sitting 102 INT content.
lastReviewed / reviewDue: New record; not yet reviewed.

---

# Item
## id
ART-102-BIO-CARBOHYDRATES-AND-LIPIDS-SUPPLEMENT
## title
Storage homopolysaccharides, and the essential fatty acids
## arabic_title

## aliases
Starch and glycogen | Essential fatty acids | Linoleic and linolenic acid
## subject
fnd
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance | Lipids of Biological Importance
## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T01
## secondary_node_ids
DIS-BIO-T04
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Year 1 foundation
## reading_time
6
## high_yield
Supplementary
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## universities
kau
## years
Year 1
## module
102 INT
## module_subject
102 INT > Biochemistry > Carbohydrates of Biological Importance
102 INT > Biochemistry > Lipids of Biological Importance
## summary
Starch and glycogen are the book's two named homopolysaccharides built entirely of glucose, one for plants and one for animals, differing mainly in how branched each one is. Linoleic and α-linolenic acid are the two fatty acids the body cannot make at all and must get from the diet — the essential fatty acids — and arachidonic acid joins them conditionally, only when linoleic acid runs short.
## sections
### Definition
A homopolysaccharide is a polysaccharide (more than 10 monosaccharide units) built entirely from one type of monosaccharide; glucans are the glucose-built ones, and starch, glycogen and cellulose are the book's three named glucans (physical p23, printed p19). Essential fatty acids are fatty acids the body cannot synthesise, so diet must supply them; the book names two, linoleic acid and α-linolenic acid (physical p31, printed p27).

### Mechanism
Starch is the storage carbohydrate of chlorophyll-containing plants, found in cereals (rice, wheat), tubers (potatoes) and legumes (beans), and exists as two forms inside a starch granule: amylose, a linear unbranched chain of glucose units joined by α1,4-glucosidic bonds, and amylopectin, a branched molecule with α1,4 bonds within its branches and α1,6 bonds at the branch points. Glycogen is the storage carbohydrate of animals ("animal starch"), concentrated in skeletal muscle and liver as a store of excess glucose, and is built the same way as amylopectin — α1,4 bonds within branches, α1,6 bonds at branch points — but is more highly branched than amylopectin (physical p23-24, printed p19-20).

Linoleic acid (an ω6 polyunsaturated fatty acid) and α-linolenic acid (an ω3 polyunsaturated fatty acid) cannot be made in the body and must come from the diet. Arachidonic acid is normally synthesised in the body from linoleic acid, but if linoleic acid intake is insufficient, arachidonic acid itself becomes essential, because the pathway that would make it has no starting material. Essential fatty acids build healthy cell membranes, supply arachidonic acid for eicosanoid synthesis, and are components of lipotropic factors; their deficiency is rare but causes dermatitis, fatty liver and growth retardation, particularly in children (physical p31, printed p27).

### Key determinants
The distinguishing fact between starch and glycogen is branching, not composition — both are pure glucose polymers with the same two bond types (α1,4 within a chain, α1,6 at a branch point); glycogen is simply more branched than amylopectin, its plant equivalent, matching the animal cell's need to mobilise glucose quickly. The distinguishing fact for essential fatty acids is that "essential" here means literally cannot be synthesised, not merely important — non-essential fatty acids are also biologically important but are made from carbohydrate in adequate amounts, so diet is not the limiting factor for them (physical p31, printed p27).

### Clinical significance
Because glycogen is the body's fast-access glucose reserve in liver and muscle, its high branching (faster mobilisation from more chain ends per molecule than a less-branched polymer) is the direct structural reason it functions as a short-term energy store rather than a long-term one, unlike the more slowly accessed plant starch a diet supplies instead. Essential fatty acid deficiency's clinical triad — dermatitis, fatty liver, growth retardation — is rare in practice because linoleic and α-linolenic acid are common in ordinary dietary fat, but the arachidonic-acid dependency (essential only if linoleic acid is short) is the detail an exam question is most likely to test, since it is the one place the "two essential fatty acids" rule has a conditional exception.
## published_summary

## published_sections

## hold_these
Starch (plant) and glycogen (animal) are both glucose homopolysaccharides with α1,4 bonds within chains and α1,6 bonds at branch points; glycogen is more branched than amylopectin.
Amylose is starch's unbranched form; amylopectin is starch's branched form.
Linoleic acid and α-linolenic acid are the two essential fatty acids — not synthesised in the body, must be supplied in the diet.
Arachidonic acid is normally made from linoleic acid, but becomes essential itself if linoleic acid is deficient.
Essential fatty acid deficiency causes dermatitis, fatty liver and growth retardation.
## lose_the_mark
Calling starch and glycogen chemically different. They are built from the same monosaccharide (glucose) with the same two glycosidic bond types; only the degree of branching differs.
Naming arachidonic acid as an essential fatty acid outright. It is conditionally essential — essential only when linoleic acid, its precursor, is deficient.
Listing more than two fatty acids as essential. The book names exactly two: linoleic and α-linolenic acid.
Confusing cellulose with starch or glycogen as an energy-storage polysaccharide. Cellulose is structural (plant cell wall) and is not digested by human amylase, unlike starch.
## related_concepts
CON-FND-B4916A9B4C980C
CON-FND-2AA1E4F3853330
## related_articles


## question_ids
[clear]

## resource_ids
src_a488633802ec053c6325
## article_source_ids
src_a488633802ec053c6325
## claim_ids
[clear]

## span_ids
[clear]

## university_notes
kau: Both concepts were asked as short compare/name items on the 2022 end-of-year and Baqoon papers, not on 2024/2025, which is why they sat uncovered until this article.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department Book Module 102 (src_a488633802ec053c6325), Part I Medical Biochemistry and Molecular Biology, "Carbohydrates of Biological Importance", homopolysaccharides section, physical pages 23-24 (printed pages 19-20) — starch (amylose, amylopectin) and glycogen. "Lipids of Biological Importance", nutritional classification, physical page 31 (printed page 27) — essential and non-essential fatty acids.
## evidence_gaps
The book gives no dietary intake figure (grams/day) for either essential fatty acid, and none is supplied here.
No claim record and no evidence span has been authored for any sentence in this article yet.
The book gives no Arabic terminology for either topic, and none is written here.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written from the department book alone. Searched before creating: no live or pending article covers this pairing for 102 INT; the existing ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE and ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE articles cover different, 2024/2025-sourced concepts from the same two chapters and are left untouched.
## field_notes
arabicTitle: Teaching at Kasr Alainy is in English; the book prints no Arabic term for either topic.
subtopicId / microtopicId / nanotopicId: No identifiers exist at these levels for first-year basic science; module_subject carries the position.
secondaryNodeIds: DIS-BIO-T04 (lipid chemistry) is carried as secondary because this article's primary placement follows the carbohydrate concept.
questionIds: Carried on the question side (library_ids).
media / mediaRecommendations: No medical image is held; both structures are already drawn as prose/structural diagrams in the book text itself.
claimIds / spanIds: Evidence pass not yet started for 2022-sitting 102 INT content.
lastReviewed / reviewDue: New record; not yet reviewed.

---

# Item
## id
ART-102-BIO-ENZYME-INHIBITION-AND-ISOENZYMES-SUPPLEMENT
## title
Competitive versus allosteric enzyme inhibition
## arabic_title

## aliases
Competitive inhibition | Allosteric inhibition | Reversible enzyme inhibition
## subject
fnd
## topic
Biochemistry
## subtopic
Enzymes
## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T02
## secondary_node_ids
[clear]
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Year 1 foundation
## reading_time
7
## high_yield
Supplementary
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## universities
kau
## years
Year 1
## module
102 INT
## module_subject
102 INT > Biochemistry > Enzymes
## summary
A competitive inhibitor and an allosteric inhibitor both slow an enzyme down, but by opposite mechanics: a competitive inhibitor squats in the active site itself and loses a fair fight against more substrate, while an allosteric inhibitor binds a separate site, changes the enzyme's shape, and cannot be out-competed by substrate at any concentration. A second, unrelated 2022 question asked to compare lactate dehydrogenase and creatine kinase isoenzymes — a topic this department book does not cover anywhere in its 167 pages, and this article says so rather than inventing an answer.
## sections
### Definition
An inhibitor is any substance that diminishes the velocity of an enzyme-catalysed reaction. Reversible inhibition's two commonest forms are competitive and allosteric inhibition (physical p59, printed p55). A competitive inhibitor is structurally similar to the substrate and competes with it, reversibly, for the same active (catalytic) site. An allosteric inhibitor is usually a small molecule that binds a separate site away from the active site (physical p59-60, printed p55-56).

### Mechanism
Because a competitive inhibitor and the substrate are competing for the same site, the degree of inhibition depends on the ratio of inhibitor to substrate concentration (and their relative affinities for the enzyme), not on either one's absolute concentration. Raising substrate concentration reverses the inhibition: at a sufficiently high [S], the reaction velocity still reaches the same Vmax seen without the inhibitor present — the inhibitor cannot lower the ceiling, only make the enzyme need more substrate to approach it (raising the apparent Km). The book's three named examples are allopurinol (a structural analogue of hypoxanthine, inhibiting xanthine oxidase in gout treatment), sulfonamides (structural analogues of PABA, inhibiting the bacterial enzyme that makes folic acid from it), and dicumarol/warfarin (structural analogues of a vitamin K derivative, used as anticoagulants) (physical p59-60, printed p55-56).

An allosteric inhibitor binds away from the active site and produces a conformational change in the enzyme's structure that reduces its activity — the book's example is ATP inhibiting phosphofructokinase-1. Because the inhibitor is not competing for the same site as the substrate, it cannot be reversed by adding more substrate: it decreases the enzyme's affinity for substrate (raises Km), decreases the maximal catalytic activity (lowers Vmax), or both. Feedback inhibition is the clinically important form of this: the end product of a metabolic pathway binds the allosteric site of an early, rate-limiting (usually the first, irreversible) enzyme in its own pathway and shuts it down, preventing the pathway from over-producing its own end product; branched pathways can carry several such feedback loops onto a shared early enzyme at once (physical p60-61, printed p56-57).

### Key determinants
The single fact that separates the two mechanisms is whether more substrate can rescue enzyme activity. It can for a competitive inhibitor (same Vmax reached eventually, only Km rises) because the inhibitor and substrate are rivals for one seat. It cannot for an allosteric inhibitor (Vmax itself can fall) because the inhibitor is not in that seat at all — it is reshaping the enzyme from elsewhere, which no amount of substrate can out-compete.

### Clinical significance
Three drug classes are built directly on competitive inhibition: allopurinol for gout, sulfonamides as antibacterials, and dicumarol/warfarin as anticoagulants, all working because a drug can be designed to resemble a substrate closely enough to occupy its enzyme's active site. Feedback inhibition (the physiological, allosteric case) is the mechanism that keeps a cell's own biosynthetic pathways from wasting resources once their product is abundant, without needing any external signal.

A second, unrelated concept was also asked on the same 2022 paper: a four-mark question to compare lactate dehydrogenase (LDH) and creatine kinase (CK) isoenzymes. The assigned department book (src_a488633802ec053c6325, all 167 pages, both the Biochemistry and Physiology parts) does not mention lactate dehydrogenase, creatine kinase, isoenzymes, or cardiac/muscle enzyme markers anywhere. Per the sourcing rule that an answer comes only from the book or an official key, no book-sourced teaching content is written for this pairing here; CON-FND-DD3EE5EC8C07D1's own definition already records the same absence, and this article's `evidence_gaps` repeats it as the reason no LDH/CK section exists.
## published_summary

## published_sections

## hold_these
A competitive inhibitor binds the active site, competes with substrate, is reversed by more substrate (same Vmax, higher Km).
An allosteric inhibitor binds a separate site, changes enzyme conformation, cannot be reversed by more substrate (Km up, Vmax down, or both).
Allopurinol, sulfonamides and dicumarol/warfarin are the book's three competitive-inhibitor drug examples, each a structural analogue of the natural substrate.
Feedback inhibition is an allosteric mechanism: a pathway's end product inhibits an early, rate-limiting enzyme in its own pathway.
The department book does not cover LDH or CK isoenzymes anywhere in its 167 pages; no book-sourced answer exists for that comparison.
## lose_the_mark
Saying a competitive inhibitor lowers Vmax. It does not — Vmax is unchanged, only reached at a higher substrate concentration (higher apparent Km).
Saying an allosteric inhibitor can be reversed by adding more substrate. It cannot, because it is not competing for the active site.
Calling feedback inhibition a competitive mechanism. It is allosteric: the end product binds a regulatory site, not the active site.
Inventing an LDH/CK isoenzyme answer from outside knowledge. The department book is silent on this topic; the honest answer is that it is not established from the assigned source, not a fabricated comparison.
## related_concepts
CON-FND-C04259379794DA
CON-FND-DD3EE5EC8C07D1
## related_articles
ART-102-BIO-ENZYMES: the chapter this inhibition mechanism is drawn from, covering the rest of the enzyme chapter's 2024/2025-tested content.
## question_ids
[clear]

## resource_ids
src_a488633802ec053c6325
## article_source_ids
src_a488633802ec053c6325
## claim_ids
[clear]

## span_ids
[clear]

## university_notes
kau: Competitive-versus-allosteric inhibition and the LDH/CK question both come from the 2022 Baqoon (resit) paper.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department Book Module 102 (src_a488633802ec053c6325), Part I Medical Biochemistry and Molecular Biology, "Enzymes", Enzyme Inhibition section, physical pages 59-61 (printed pages 55-57) — competitive inhibitors (mechanism, Km/Vmax behaviour, allopurinol, sulfonamides, dicumarol/warfarin) and allosteric inhibitors (mechanism, feedback inhibition, branched-pathway feedback).
## evidence_gaps
The book gives no comparison of lactate dehydrogenase or creatine kinase isoenzymes anywhere in its 167 pages — searched across both the Biochemistry and Physiology parts — so CON-FND-DD3EE5EC8C07D1 is named in `related_concepts` with no corresponding teaching section; its own concept record already states the same absence.
No claim record and no evidence span has been authored for any sentence in this article yet.
The book gives no Arabic terminology for either inhibition type, and none is written here.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written from the department book alone. Searched before creating: no live or pending article covers competitive/allosteric inhibition specifically for 102 INT; the existing ART-102-BIO-ENZYMES article covers different, 2024/2025-sourced concepts from the same chapter and is left untouched. LDH/CK isoenzymes were searched for across the full 167-page text (both parts) and are absent; no article section was written for them, consistent with the concept's own recorded absence.
## field_notes
arabicTitle: Teaching at Kasr Alainy is in English; the book prints no Arabic term for either topic.
subtopicId / microtopicId / nanotopicId: No identifiers exist at these levels for first-year basic science; module_subject carries the position.
secondaryNodeIds: Both source concepts share DIS-BIO-T02 as primary; no secondary placement applies.
questionIds: Carried on the question side (library_ids).
media / mediaRecommendations: No medical image is held; the Km/Vmax behaviour and feedback-loop diagrams are already prose/chart content in the book.
claimIds / spanIds: Evidence pass not yet started for 2022-sitting 102 INT content.
lastReviewed / reviewDue: New record; not yet reviewed.

---

# Item
## id
ART-102-BIO-AMINO-ACIDS-BASIC-AND-SULFUR-SUPPLEMENT
## title
Basic and sulfur-containing amino acids
## arabic_title

## aliases
Basic amino acids | Sulfur-containing amino acids | Diamino-monocarboxylic amino acids
## subject
fnd
## topic
Biochemistry
## subtopic
Amino Acids of Biological Importance
## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T05
## secondary_node_ids
[clear]
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Year 1 foundation
## reading_time
6
## high_yield
Supplementary
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## universities
kau
## years
Year 1
## module
102 INT
## module_subject
102 INT > Biochemistry > Amino Acids of Biological Importance
## summary
The 2022 papers asked for two of the same twenty amino acids' subgroups the 2025 paper asked about differently: the three basic (diamino-monocarboxylic) amino acids — lysine, arginine and histidine — and the two sulfur-containing amino acids — cysteine and methionine. Both groups are chemistry, not nutrition: basic and sulfur-containing describe the side chain, not whether the diet must supply the amino acid.
## sections
### Definition
Basic amino acids (diamino-monocarboxylic acids — two amino groups, one carboxyl group) are the amino acids whose side chain carries a positive charge at physiological pH. The book names three: lysine, arginine and histidine (physical p7-8, printed p3-4). Sulfur-containing amino acids are the amino acids whose side chain carries a sulfur atom. The book names two: cysteine (an SH, thiol, group) and methionine (a thioether, S-CH3, group) (physical p6, printed p2).

### Mechanism
Lysine and arginine are basic aliphatic amino acids — their charged amino group sits on a straight side chain. Histidine is a basic heterocyclic amino acid — its charged nitrogen sits inside an imidazole ring — and the book states this explicitly as a note, because histidine is otherwise classified with the heterocyclic amino acids (alongside proline) rather than with the aliphatic ones, even though all three are grouped together under "charged R groups: basic amino acids" (physical p7-8, printed p3-4). Cysteine's SH group and methionine's S-CH3 group are both classified among the "neutral aliphatic, hydroxyl/sulfur-containing" amino acids, alongside the hydroxyl-containing serine and threonine, because none of the three (hydroxyl or sulfur side chains) carries a net charge at physiological pH (physical p6, printed p2).

### Key determinants
Two cysteine molecules can join by a disulfide bond, formed by removing two hydrogen atoms, to form cystine; cystine is not counted as a twenty-first amino acid, and it inherits cysteine's classification (sulfur-containing) and cysteine's nutritional status rather than methionine's. Of the two sulfur-containing amino acids, methionine is essential (must come from the diet) and cysteine is not — so cystine, being two cysteines, is not essential either, even though methionine (the other sulfur-containing amino acid) is (physical p6, printed p2). Of the three basic amino acids, lysine is essential, arginine is half-essential (the body makes enough for an adult but not for a growing child), and histidine is essential — all three basic amino acids are needed from the diet at some point in life, unlike the sulfur-containing pair, where only one of two is essential.

### Clinical significance
The chemical grouping (basic, sulfur-containing) and the nutritional grouping (essential, half-essential, non-essential) are independent facts about the same molecule, and holding both at once for a named amino acid is the skill the department's matching questions actually test — the same skill the existing ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE article teaches for the 2025 paper's five amino acids (glycine, lysine, cystine, isoleucine, glutamate). This article extends the same two-axis reading to the three basic and two sulfur-containing amino acids the 2022 papers asked about instead.
## published_summary

## published_sections

## hold_these
The three basic amino acids are lysine, arginine and histidine; lysine and arginine are basic aliphatic, histidine is basic heterocyclic.
The two sulfur-containing amino acids are cysteine (SH group) and methionine (S-CH3 group).
Cystine is two cysteine molecules joined by a disulfide bond (loss of two hydrogen atoms); it inherits cysteine's sulfur-containing classification and its non-essential status.
Of the basic amino acids: lysine is essential, arginine is half-essential, histidine is essential.
Of the sulfur-containing amino acids: methionine is essential, cysteine (and therefore cystine) is not.
## lose_the_mark
Classifying histidine as basic aliphatic. It is basic heterocyclic — the book states this as an explicit note precisely because it is the exception students misplace.
Calling cystine essential because methionine, the other sulfur-containing amino acid, is. Methionine is essential; cysteine and its dimer cystine are not.
Listing only two basic amino acids. There are three: lysine, arginine and histidine.
Calling arginine non-essential outright. It is half-essential — enough is made for an adult but not for a growing child, a distinct third category from essential and non-essential.
## related_concepts
CON-FND-57DC83CE4A718B
CON-FND-3D6B24CAA42AC2
## related_articles
ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE: the chapter this classification is drawn from, teaching the same two-axis (chemical + nutritional) reading for the 2025 paper's five named amino acids.
## question_ids
[clear]

## resource_ids
src_a488633802ec053c6325
## article_source_ids
src_a488633802ec053c6325
## claim_ids
[clear]

## span_ids
[clear]

## university_notes
kau: Both groupings were asked as short list/name items on the 2022 Baqoon (resit) paper, not on the 2025 matching question this module's other amino-acid article was built to answer.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department Book Module 102 (src_a488633802ec053c6325), Part I Medical Biochemistry and Molecular Biology, "Amino Acids of Biological Importance", physical pages 6-8 (printed pages 2-4) — the sulfur-containing amino acids (cysteine, methionine, cystine) and the basic amino acids (lysine, arginine, histidine), their chemical classification and their essential/half-essential/non-essential status.
## evidence_gaps
No claim record and no evidence span has been authored for any sentence in this article yet.
The book gives no Arabic terminology for either amino-acid group, and none is written here.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written from the department book alone. Searched before creating: no live or pending article covers this specific pairing for 102 INT; the existing ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE article already teaches the full twenty-amino-acid classification chart (including these same five amino acids) for a different, 2025-sourced concept, and is named in related_articles rather than edited, since a second lane may also be touching that file.
## field_notes
arabicTitle: Teaching at Kasr Alainy is in English; the book prints no Arabic term for either topic.
subtopicId / microtopicId / nanotopicId: No identifiers exist at these levels for first-year basic science; module_subject carries the position.
secondaryNodeIds: Both source concepts share DIS-BIO-T05 as primary; no secondary placement applies.
questionIds: Carried on the question side (library_ids).
media / mediaRecommendations: No medical image is held; the structural formulae for all five amino acids are already prose/structural-diagram content in the book.
claimIds / spanIds: Evidence pass not yet started for 2022-sitting 102 INT content.
lastReviewed / reviewDue: New record; not yet reviewed.

---

# Item
## id
ART-102-BIO-DNA-REPAIR-MUTATIONS-AND-GENETIC-CODE-SUPPLEMENT
## title
DNA repair, gene mutation, and the genetic code
## arabic_title

## aliases
DNA repair mechanism | Xeroderma pigmentosum | Types of mutation | Point mutation | Frameshift mutation | Genetic code characteristics
## subject
fnd
## topic
Biochemistry
## subtopic
DNA Synthesis (Replication) and Repair | Protein Synthesis (Translation)
## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T06
## secondary_node_ids
SYS-FND-T02-S01
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Year 1 foundation
## reading_time
9
## high_yield
Supplementary
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## universities
kau
## years
Year 1
## module
102 INT
## module_subject
102 INT > Biochemistry > DNA Synthesis (Replication) and Repair
102 INT > Biochemistry > Protein Synthesis (Translation)
## summary
Three 2022-sitting facts sit across two adjoining chapters and one shared thread — what happens when DNA goes wrong, and how the cell reads what is left. DNA repair is a four-step assembly line (recognise, excise, fill, seal) whose failure produces a genetic disease like xeroderma pigmentosum. A mutation itself starts as either an uncorrected replication error or damage to the DNA (chemical, radiation, or oxidative), and sorts into a small number of named types. The genetic code that translates a gene's message is simultaneously specific (one codon, one amino acid) and degenerate (most amino acids, more than one codon) — properties that sound contradictory until read as two separate axes of the same code.
## sections
### Definition
DNA repair is the process that corrects damage to DNA before it becomes a permanent mutation; replication itself makes roughly one error per 30,000 bases, and DNA is separately subject to environmental damage from radiation and chemicals (physical p85, printed p81). A mutation is a permanent change in a DNA sequence (physical p100, printed p96). The genetic code is the nucleotide sequence of mRNA that represents the code words for amino acids, named "genetic" because the code words originate from DNA genes; each codon is three successive bases, giving 4³ = 64 possible codons (physical p92, printed p88).

### Mechanism
DNA repair proceeds in four broad steps: recognition of the lesion by an endonuclease, which cleaves the damaged strand to form a nick; excision of the damaged DNA by an exonuclease; filling the resulting gap, catalysed by repair DNA polymerase β; and ligation, catalysed by DNA ligase. A defect anywhere in this repair mechanism causes disease — the book's named example is xeroderma pigmentosum, a genetic disease of defective DNA repair causing hypersensitivity to sunlight/UV, increased skin cancer risk, and premature ageing and death (physical p85, printed p81).

Mutations arise two ways: errors in replication, where a non-complementary base is added and not repaired, or damage to the DNA nucleotides themselves, which the book splits into three causes — chemical mutagens (e.g. carcinogens in cigarette smoke), irradiation (UV light, or ionising X-rays and gamma rays), and oxidative damage (implicated in neurological disease, cancer and ageing). Regardless of cause, mutations sort into a limited number of types. Base substitutions (point mutations, the commonest type) are either a transition (purine replaced by purine, or pyrimidine by pyrimidine) or a transversion (purine replaced by pyrimidine, or vice versa); in a coding region, a base substitution produces a missense mutation (changed codon, changed amino acid — the book's example is sickle cell anaemia), a nonsense mutation (an amino-acid codon becomes a stop codon, prematurely terminating translation — the book's example is thalassemia), or a silent mutation (a synonym codon, no amino-acid change). Deletion or insertion of bases is the other category: if the number deleted or inserted is not a multiple of three, it is a frameshift mutation, shifting the reading frame and usually producing a non-functional product; if it is a multiple of three, the reading frame is preserved and only one or more amino acids are added or removed, a less severe change than a frameshift (physical p100-101, printed p96-97).

The genetic code's codon table assigns 61 codons to amino acids, one codon (AUG) as the initiation codon, and three (UAA, UAG, UGA) as termination (stop) codons that code for no amino acid (physical p92, printed p88).

### Key determinants
The genetic code has four defining characteristics. Specificity: a given codon always codes for only one amino acid (UUU codes only for phenylalanine). Degeneracy: an amino acid can be coded by more than one codon (synonym codons) — phenylalanine, for instance, has two. Universality: the code is nearly the same in all organisms. Reading frame: codons are read from a fixed starting point (the initiation codon) as a continuous, non-overlapping sequence taken three bases at a time — which is exactly why a frameshift mutation (an insertion/deletion not a multiple of three) is so disruptive: it shifts every codon downstream of the lesion, not just the one base that changed (physical p92, printed p88).

### Clinical significance
Xeroderma pigmentosum is the direct clinical consequence of a broken DNA-repair assembly line: without the recognise-excise-fill-seal sequence working, UV-induced DNA damage accumulates uncorrected, driving the skin cancer risk and premature ageing that define the disease. Missense mutation causing sickle cell anaemia and nonsense mutation causing thalassemia are two of this article's own worked examples (also taught in full in the myoglobin/hemoglobin and hemoglobinopathies article above), and both are point mutations — showing that the type of mutation (missense vs nonsense), not simply "a mutation occurred," is what determines whether a wrong amino acid or a truncated, non-functional protein results. The genetic code's degeneracy is part of why some point mutations are silent (a synonym codon substitutes without changing the amino acid) while others, hitting a codon with no synonym, are not.
## published_summary

## published_sections

## hold_these
DNA repair is four steps: recognise (endonuclease nicks), excise (exonuclease removes), fill (DNA polymerase β), ligate (DNA ligase). Its failure causes xeroderma pigmentosum.
Mutations arise from replication errors or DNA damage (chemical mutagens, irradiation, oxidative damage).
Base substitutions are transitions (purine↔purine or pyrimidine↔pyrimidine) or transversions (purine↔pyrimidine); in a coding region they cause missense (sickle cell anemia), nonsense (thalassemia), or silent mutations.
A frameshift mutation is an insertion/deletion NOT a multiple of three bases; a multiple-of-three change preserves the reading frame and is less severe.
The genetic code is specific (one codon → one amino acid), degenerate (most amino acids have more than one codon), nearly universal, and read in a fixed, non-overlapping reading frame from the initiation codon.
## lose_the_mark
Treating "damage to the nucleotides" as one single mutation cause. The book splits it into three: chemical mutagens, irradiation, and oxidative damage, alongside the separate cause of an uncorrected replication error.
Confusing missense and nonsense mutations. Missense changes the amino acid (sickle cell anemia); nonsense creates a premature stop codon (thalassemia) — different mechanisms, different named diseases.
Calling any insertion/deletion a frameshift. Only a non-multiple-of-three insertion/deletion shifts the reading frame; a multiple-of-three change adds or removes whole amino acids without a frameshift.
Treating specificity and degeneracy as contradictory. They describe two different directions of the same code: specificity is codon→amino acid (one-to-one), degeneracy is amino acid→codon (one-to-many).
## related_concepts
CON-FND-DEE7732AEC0F74
CON-FND-3BF934540F73CD
CON-FND-D23183EAACF5B7
## related_articles
ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR: the chapter DNA repair is drawn from, covering the rest of the replication chapter's 2024/2025-tested content.
ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION: the chapter mutation types and the genetic code are drawn from, covering the rest of the translation chapter's 2024/2025-tested content.
## question_ids
[clear]

## resource_ids
src_a488633802ec053c6325
## article_source_ids
src_a488633802ec053c6325
## claim_ids
[clear]

## span_ids
[clear]

## university_notes
kau: All three concepts were asked as short list/explain items on the 2022 end-of-year and Baqoon papers, not on 2024/2025, which is why they sat uncovered until this article.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department Book Module 102 (src_a488633802ec053c6325), Part I Medical Biochemistry and Molecular Biology, "DNA Synthesis (Replication) & Repair", the DNA Repair section, physical page 85 (printed page 81) — replication error rate, the four repair steps, xeroderma pigmentosum. "Protein Synthesis (Translation)", Gene Mutations section, physical pages 100-101 (printed pages 96-97) — causes and types of mutation. "Protein Synthesis (Translation)", Genetic Code section, physical page 92 (printed page 88) — the codon table and the code's four characteristics.
## evidence_gaps
No claim record and no evidence span has been authored for any sentence in this article yet.
The book gives no Arabic terminology for any of the three topics, and none is written here.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written from the department book alone. Searched before creating: no live or pending article covers DNA repair, mutation types or the genetic code specifically for 102 INT; the existing ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR and ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION articles cover different, 2024/2025-sourced concepts from the same two chapters and are left untouched.
## field_notes
arabicTitle: Teaching at Kasr Alainy is in English; the book prints no Arabic term for any of the three topics.
subtopicId / microtopicId / nanotopicId: No identifiers exist at these levels for first-year basic science; module_subject carries the position.
secondaryNodeIds: SYS-FND-T02-S01 matches the system placement two of the three source concepts already carry.
questionIds: Carried on the question side (library_ids).
media / mediaRecommendations: No medical image is held; the repair-step list, mutation-type list and codon table are all already prose/table content in the book.
claimIds / spanIds: Evidence pass not yet started for 2022-sitting 102 INT content.
lastReviewed / reviewDue: New record; not yet reviewed.

---

# Item
## id
ART-102-PHY-AUTONOMIC-OUTFLOW-AND-TRANSMISSION-SUPPLEMENT
## title
Sympathetic and parasympathetic outflow, and transmitter removal
## arabic_title

## aliases
Sympathetic outflow to abdomen and pelvis | Splanchnic nerves | Collateral ganglia | Parasympathetic cranial nerve outflow | Acetylcholinesterase | Noradrenaline reuptake
## subject
neuro
## topic
Physiology
## subtopic
Sympathetic nervous system | Parasympathetic nervous system | Chemical transmission at autonomic junctions and autonomic receptors
## microtopic

## nanotopic

## primary_node_id
DIS-PHY-T07
## secondary_node_ids
SYS-NEU-T01-S02
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Year 1 foundation
## reading_time
9
## high_yield
Supplementary
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## universities
kau
## years
Year 1
## module
102 INT
## module_subject
102 INT > Physiology > Autonomic nervous system > Sympathetic nervous system
102 INT > Physiology > Autonomic nervous system > Parasympathetic nervous system
102 INT > Physiology > Autonomic nervous system > Chemical transmission at autonomic junctions and autonomic receptors
## summary
Three 2022-sitting facts about the autonomic nervous system's wiring and its two transmitters. The sympathetic supply to the gut and pelvis leaves the spinal cord as splanchnic nerves and relays in collateral ganglia in front of the aorta, not in the paravertebral chain the way most sympathetic fibres do. Three cranial nerves — III, VII and IX — carry the entire parasympathetic supply to the head and neck, each with its own brainstem nucleus, relay ganglion and target. And acetylcholine and noradrenaline, the two autonomic transmitters, are cleared from the synapse by almost opposite means: acetylcholine is destroyed on the spot in a fraction of a second, noradrenaline is mostly recaptured intact by the nerve ending that released it.
## sections
### Definition
Sympathetic preganglionic fibres to the abdominal and pelvic viscera leave the spinal cord's lateral horn cells (T5-L2) and, unlike the sympathetic supply to the head, neck and thorax, do not relay in the paravertebral chain; they pass through it without synapsing and leave as splanchnic nerves to relay in collateral (prevertebral) ganglia instead (physical p156-157, printed p43-44). Parasympathetic outflow to the head and neck travels entirely in three cranial nerves — III (oculomotor), VII (facial) and IX (glossopharyngeal) (physical p159, printed p46). Acetylcholine and noradrenaline are the two chemical transmitters at autonomic synapses; nerve fibres are classed cholinergic or adrenergic by which one they release (physical p162, printed p49).

### Mechanism
Three named splanchnic nerves carry the abdominal sympathetic outflow. The greater splanchnic nerve (from T5-T9) terminates on the celiac and superior mesenteric ganglia. The lesser splanchnic nerve (from T10-T11) terminates on the aorticorenal and superior mesenteric ganglia. The least splanchnic nerve (from T12) relays in the aorticorenal ganglion. For the pelvis, preganglionic fibres to the gastrointestinal tract pass through the chain unrelayed as the lumbar splanchnic nerve to the inferior mesenteric ganglion, while fibres to the bladder and external genitalia leave through the sacral ganglia as sacral splanchnic nerves. Postganglionic fibres from all these ganglia then travel with blood vessels to reach their target organ (physical p156-157, printed p43-44).

Each of the three parasympathetic cranial nerves to the head follows the same three-part pattern — a brainstem nucleus of origin, a relay ganglion, a target — but no two share a ganglion. The oculomotor nerve (III) originates in the Edinger-Westphal nucleus of the midbrain, relays in the ciliary ganglion, and its postganglionic fibres (as short ciliary nerves) constrict the pupil and thicken the lens for near vision. The facial nerve (VII) originates in the superior salivary nucleus of the lower pons; some fibres relay in the sphenopalatine ganglion to supply the lacrimal and nasal glands, others travel in the chorda tympani to relay in the submandibular ganglion and supply the submandibular and sublingual glands — both are secretomotor and vasodilator. The glossopharyngeal nerve (IX) originates in the inferior salivary nucleus (pons-medulla junction), relays in the otic ganglion, and supplies the parotid gland, also secretomotor and vasodilator (physical p159, printed p46).

Acetylcholine, once released, is split within a fraction of a second into acetate and choline by acetylcholinesterase — either the specific ("true") form concentrated at cholinergic nerve endings, or the non-specific ("pseudo") form in plasma acting on acetylcholine that diffuses away; the released choline is transported back into the nerve ending to make new acetylcholine. Noradrenaline is cleared over a few seconds by three routes instead of enzymatic destruction on the spot: active re-uptake back into the adrenergic nerve ending itself (accounting for 50-80% of the released transmitter), diffusion away into surrounding fluid and blood, and destruction by monoamine oxidase (MAO, on the outer mitochondrial membrane, widely distributed) or catechol-O-methyl-transferase (COMT, present in all tissues except adrenergic nerve endings themselves) (physical p163-164, printed p50-51).

### Key determinants
What separates the sympathetic supply to the abdomen/pelvis from the sympathetic supply to the thorax, head and neck is exactly where the preganglionic fibre first synapses: in the paravertebral chain itself for the thorax/head/neck, or unrelayed through the chain and out as a splanchnic nerve to a collateral ganglion for the abdomen/pelvis. What separates the three parasympathetic cranial nerves from each other is which brainstem nucleus, which named ganglion, and which target gland or muscle — memorised as three parallel three-part chains, not three examples of one pattern. What separates acetylcholine's and noradrenaline's removal is destruction versus recycling: acetylcholine is destroyed and its building block reused, noradrenaline is mostly reused intact by reuptake, with enzymatic destruction (MAO/COMT) as the minority route.

### Clinical significance
Because 50-80% of released noradrenaline is cleared by reuptake rather than destruction, drugs that block that reuptake transporter prolong noradrenaline's action at the synapse — the same clearance-route logic that predicts why acetylcholinesterase inhibitors (which block the dominant clearance route for acetylcholine instead) prolong cholinergic transmission. The parasympathetic cranial nerve chains are the anatomical basis for pupillary and salivary/lacrimal reflex testing: a lesion at the Edinger-Westphal nucleus, the ciliary ganglion, or the short ciliary nerves each produces a pupillary defect at a different point along the same named III-nerve chain described above.
## published_summary

## published_sections

## hold_these
Sympathetic fibres to abdomen/pelvis leave the paravertebral chain unrelayed as splanchnic nerves (greater T5-9→celiac/superior mesenteric, lesser T10-11→aorticorenal/superior mesenteric, least T12→aorticorenal, lumbar→inferior mesenteric, sacral→bladder/genitalia) to synapse in collateral ganglia.
Parasympathetic head/neck supply is three cranial nerves: III (Edinger-Westphal→ciliary ganglion→pupil constriction/lens accommodation), VII (superior salivary nucleus→sphenopalatine/submandibular ganglia→lacrimal/nasal/submandibular/sublingual glands), IX (inferior salivary nucleus→otic ganglion→parotid gland).
Acetylcholine is destroyed within a fraction of a second by acetylcholinesterase (true, at nerve endings; pseudo, in plasma); choline is recycled.
Noradrenaline is cleared over seconds mainly by active reuptake (50-80%) into the releasing nerve ending, with diffusion and MAO/COMT destruction as minor routes.
## lose_the_mark
Saying sympathetic fibres to the abdomen relay in the paravertebral chain the same way head/neck fibres do. They pass through unrelayed and synapse instead in collateral (prevertebral) ganglia after leaving as splanchnic nerves.
Mixing up which cranial nerve supplies which gland. III is pupil/lens only (no gland); VII supplies lacrimal, nasal, submandibular and sublingual; IX supplies only the parotid.
Saying acetylcholine is mostly recycled by reuptake. That is noradrenaline's clearance route; acetylcholine is destroyed on the spot by acetylcholinesterase, and only its choline fragment is recycled.
Calling MAO and COMT the main route of noradrenaline clearance. Reuptake accounts for the majority (50-80%); enzymatic destruction is a minority route.
## related_concepts
CON-NEU-EF92EEB546EA99
CON-NEU-1B57CDAD7DEBCF
CON-NEU-ACE8344E6D9D43
## related_articles
ART-102-PHY-SYMPATHETIC-NERVOUS-SYSTEM: the chapter the abdominal/pelvic splanchnic-nerve outflow is drawn from, covering the rest of the sympathetic chapter's 2024/2025-tested content.
ART-102-PHY-PARASYMPATHETIC-NERVOUS-SYSTEM: the chapter the cranial-nerve outflow is drawn from, covering the rest of the parasympathetic chapter's 2024/2025-tested content.
ART-102-PHY-CHEMICAL-TRANSMISSION-AT-AUTONOMIC-JUNCTIONS-AND-AUTONOMIC-RECEPTORS: the chapter transmitter removal is drawn from, covering synthesis, release and receptor content from the same chapter.
## question_ids
[clear]

## resource_ids
src_a488633802ec053c6325
## article_source_ids
src_a488633802ec053c6325
## claim_ids
[clear]

## span_ids
[clear]

## university_notes
kau: All three concepts were asked as short list/explain items on the 2022 Baqoon and end-of-year papers, not on 2024/2025, which is why they sat uncovered until this article.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department Book Module 102 (src_a488633802ec053c6325), Part II Physiology, "Autonomic Nervous System", Sympathetic System on Abdominal and Pelvic Viscera, physical pages 156-157 (printed pages 43-44) — splanchnic nerves and collateral ganglia. Parasympathetic Nervous System, Functions on Head and Neck, physical page 159 (printed page 46) — cranial nerves III, VII, IX. Chemical Transmission at Autonomic Junctions, Removal of Acetylcholine and Removal of Noradrenaline, physical pages 163-164 (printed pages 50-51).
## evidence_gaps
No claim record and no evidence span has been authored for any sentence in this article yet.
The book gives no Arabic terminology for any of the three topics, and none is written here.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written from the department book alone. Searched before creating: no live or pending article covers these three specific facts for 102 INT; the existing ART-102-PHY-SYMPATHETIC-NERVOUS-SYSTEM, ART-102-PHY-PARASYMPATHETIC-NERVOUS-SYSTEM and ART-102-PHY-CHEMICAL-TRANSMISSION-AT-AUTONOMIC-JUNCTIONS-AND-AUTONOMIC-RECEPTORS articles cover different, 2024/2025-sourced concepts from the same three chapters and are left untouched.
## field_notes
arabicTitle: Teaching at Kasr Alainy is in English; the book prints no Arabic term for any of the three topics.
subtopicId / microtopicId / nanotopicId: No identifiers exist at these levels for first-year basic science; module_subject carries the position.
secondaryNodeIds: SYS-NEU-T01-S02 matches the system placement all three source concepts already carry.
questionIds: Carried on the question side (library_ids).
media / mediaRecommendations: No medical image is held; the splanchnic-nerve routing, cranial-nerve chains and transmitter-clearance pathways are already prose/figure-captioned content in the book.
claimIds / spanIds: Evidence pass not yet started for 2022-sitting 102 INT content.
lastReviewed / reviewDue: New record; not yet reviewed.

---

# Item
## id
ART-102-PHY-PLATELET-RELEASE-REACTION-SUPPLEMENT
## title
The platelet release reaction
## arabic_title

## aliases
Platelet granule release | Dense granules | Alpha granules
## subject
haem
## topic
Physiology
## subtopic
Platelets and haemostasis
## microtopic

## nanotopic

## primary_node_id
DIS-PHY-T02
## secondary_node_ids
SYS-HEM-T03
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Year 1 foundation
## reading_time
6
## high_yield
Supplementary
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## universities
kau
## years
Year 1
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Platelets and haemostasis
## summary
The platelet release reaction is the step, between adhesion and aggregation, where an activated platelet empties both of its granule types — and it is exactly this step that turns a platelet that has merely stuck to the vessel wall into one that recruits and binds its neighbours.
## sections
### Definition
The platelet release reaction is a calcium-dependent step in primary haemostasis in which an activated platelet discharges the contents of its dense granules and its alpha granules (physical p135, printed p22).

### Mechanism
Dense granule contents are released first in the sequence the book describes: calcium (which drives further release, making the reaction self-amplifying), ADP (which activates, aggregates and fuses further platelets) and serotonin (which reinforces and maintains vasoconstriction of the injured vessel). Alpha granule contents released alongside them are coagulation factors (fibrinogen, factor V, von Willebrand factor and factor XIII), platelet-derived growth factor (PDGF, which stimulates vessel-wall repair by driving proliferation of endothelium, smooth muscle and fibroblasts), platelet activating factor (PAF, which stimulates platelet aggregation), and thromboxane A2 (TXA2, synthesised from arachidonic acid by cyclooxygenase in the activated platelet membrane) (physical p135, printed p22).

TXA2 itself is a vasoconstrictor, a stimulator of further platelet release, and a powerful stimulant of platelet aggregation — three separate pro-clotting actions from one released mediator. Prostacyclin, made from arachidonic acid by cyclooxygenase in the endothelium rather than the platelet, has the opposite three actions: a powerful vasodilator, an inhibitor of platelet release, and an inhibitor of platelet aggregation. Because their actions are opposite, prostacyclin is what keeps the platelet plug localised to the site of injury rather than propagating along healthy vessel wall (physical p136, printed p23).

### Key determinants
The release reaction sits in the platelet's step-by-step activation sequence between platelet activation (which it is triggered by, itself enhanced by ADP and thrombin) and platelet aggregation (which it triggers, since the ADP and TXA2 it releases are what cause platelets to bind each other via fibrinogen receptors). This ordering — adhesion, activation, release, aggregation, pro-coagulant activity, fusion — is what makes the release reaction the amplifying step: everything the platelet releases here recruits more platelets into the same self-propagating cascade.

### Clinical significance
Aspirin's antiplatelet effect works directly on this mechanism: aspirin inhibits cyclooxygenase, reducing production of both TXA2 (pro-aggregatory) and prostacyclin (anti-aggregatory) together. The clinical benefit survives that dual inhibition because endothelial cells (which make prostacyclin) synthesise new cyclooxygenase within hours, while platelets (which make TXA2) cannot manufacture new enzyme at all once aspirin has acetylated theirs — so a low, prolonged aspirin dose suppresses TXA2 far more durably than prostacyclin, net-reducing clot formation, which is the pharmacological basis for its use in preventing myocardial infarction (physical p136, printed p23).
## published_summary

## published_sections

## hold_these
The platelet release reaction is calcium-dependent and empties both dense granules (calcium, ADP, serotonin) and alpha granules (coagulation factors, PDGF, PAF, TXA2).
TXA2 (from platelets, via cyclooxygenase) is a vasoconstrictor and promotes release and aggregation; prostacyclin (from endothelium, via cyclooxygenase) has the opposite three actions.
The release reaction sits between platelet activation and platelet aggregation, and is what makes platelet recruitment self-amplifying.
Aspirin inhibits cyclooxygenase in both platelets and endothelium, but platelets cannot resynthesise the enzyme while endothelium can within hours, giving aspirin a net antithrombotic effect.
## lose_the_mark
Swapping TXA2's and prostacyclin's actions. TXA2 (platelet-derived) promotes vasoconstriction, release and aggregation; prostacyclin (endothelium-derived) opposes all three.
Placing the release reaction after aggregation. It comes before aggregation in the sequence and is what drives it, via the ADP and TXA2 it releases.
Saying aspirin only blocks TXA2. It inhibits cyclooxygenase in both platelets and endothelium; the antithrombotic effect comes from the asymmetry in how fast each cell type can replace the enzyme, not from a selective drug action.
Listing fibrinogen as a dense-granule product. It is released from alpha granules, alongside factor V, von Willebrand factor and factor XIII; calcium, ADP and serotonin are the dense-granule contents.
## related_concepts
CON-HEM-E20402B19F5D30
## related_articles
ART-102-PHY-PLATELETS-AND-HAEMOSTASIS: the chapter this release reaction is drawn from, covering the rest of the platelet chapter's 2024/2025-tested content (adhesion, aggregation, pro-coagulant activity, fusion).
## question_ids
[clear]

## resource_ids
src_a488633802ec053c6325
## article_source_ids
src_a488633802ec053c6325
## claim_ids
[clear]

## span_ids
[clear]

## university_notes
kau: This concept was asked as a short list item on the 2022 end-of-year paper, not on 2024/2025, which is why it sat uncovered until this article.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department Book Module 102 (src_a488633802ec053c6325), Part II Physiology, "Hemopoietic System", Formation of Temporary Hemostatic Plug, Platelet Release Reaction, physical page 135 (printed page 22) — dense and alpha granule contents; TXA2 and prostacyclin, physical page 136 (printed page 23) — including the aspirin mechanism.
## evidence_gaps
No claim record and no evidence span has been authored for any sentence in this article yet.
The book gives no Arabic terminology for this topic, and none is written here.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written from the department book alone. Searched before creating: no live or pending article covers the platelet release reaction specifically for 102 INT; the existing ART-102-PHY-PLATELETS-AND-HAEMOSTASIS article covers different, 2024/2025-sourced concepts from the same chapter and is left untouched.
## field_notes
arabicTitle: Teaching at Kasr Alainy is in English; the book prints no Arabic term for this topic.
subtopicId / microtopicId / nanotopicId: No identifiers exist at these levels for first-year basic science; module_subject carries the position.
secondaryNodeIds: SYS-HEM-T03 matches the system placement the source concept already carries.
questionIds: Carried on the question side (library_ids).
media / mediaRecommendations: No medical image is held; the granule-release sequence and the TXA2/prostacyclin balance are already prose/figure-captioned content in the book.
claimIds / spanIds: Evidence pass not yet started for 2022-sitting 102 INT content.
lastReviewed / reviewDue: New record; not yet reviewed.
