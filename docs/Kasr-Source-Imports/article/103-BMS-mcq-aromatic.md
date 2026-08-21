<!--
  103 BMS · Biochemistry · the two library articles that teach the seven concepts
  minted for the aromatic and heterocyclic amino acid MCQs.

    ART-103-BIO-PHENYLALANINE-AND-TYROSINE  → 4 concepts
    ART-103-BIO-TRYPTOPHAN-AND-HISTIDINE    → 3 concepts

  WHY TWO AND NOT MORE. A question's library_ids must name an article whose
  related_concepts lists that question's main_concept. Nineteen items of the
  department question book's "Individual Amino Acid Metabolism" chapter, printed
  pages 121 to 124, land on these seven concepts, and the department book itself
  splits the material into exactly two runs of pages: the aromatic pair on printed
  pages 100 to 103, and the heterocyclic pair on printed pages 103 to 105.

  PHENYLKETONURIA IS NOT HERE. The 2025 end-of-year paper's Case (1) was a PKU
  infant, and ART-103-BIO-PHENYLKETONURIA in ./103-BMS-biochemistry.md already
  carries four concepts for it — the enzyme defect, the neurological mechanism,
  the hypopigmentation and the dietary treatment. Nothing in this file repeats
  them. The first article teaches the normal hydroxylation those four presuppose,
  what tyrosine is made into and broken down to, and the one tyrosine disorder the
  2025 lane never reached, alkaptonuria. Each near-miss is cross-referenced from
  the concept that touches it and recorded in its rejected_merge_candidate_ids.

  ALL PROSE IS FROM ONE BOOK: src_300847a5fa64809d6c07, Dpt book Biochemistry
  103.pdf, chapter "Individual Amino Acid Metabolism", printed pages 100 to 105
  (file pages 101 to 106). Nothing is asserted that the book does not say, and
  where the book is silent the article says so — in the text, in evidence_gaps and
  on the concept. The department question book (src_07f0a0ff41addf826c7f)
  establishes what is examined and is never cited as evidence that something is
  medically true.

  WHAT THE BOOK DOES NOT SUPPORT, and is therefore flagged rather than written as
  teaching: the individual steps from DOPA to dopamine to noradrenaline to
  adrenaline; the SAM-dependent N-methylation that makes adrenaline; tyrosinaemia
  and the name fumarylacetoacetate hydrolase, which the question book uses as a
  distractor and this book prints only as "Hydrolase"; and the convergence claim
  that one BH4 defect blocks three hydroxylations at once, which is assembled from
  three separate sentences rather than stated.

  MEDIA. Four assets are requested across the two articles and none is supplied;
  this repository holds no medical images. `## media` is present and empty on both
  records with a field_notes reason: [clear] there would parse as a media block
  with no URL and be reported as one that would be dropped.

  Import: Admin › Bulk import → article. Articles land before concepts.
-->

# Item

## id
ART-103-BIO-PHENYLALANINE-AND-TYROSINE

## title
Phenylalanine and tyrosine: one hydroxylation, three derivatives, and three diseases on one tree

## arabic_title
الأحماض الأمينية العطرية: الفينيل ألانين والتيروسين

## aliases
Aromatic amino acids
Phenylalanine
Tyrosine
Phenylalanine hydroxylase
Tetrahydrobiopterin
Catecholamine synthesis
Melanin synthesis
Alkaptonuria
Ochronosis

## subject
fnd

## topic
Amino acids and proteins

## subtopic
Aromatic Amino Acids

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-FND-T02 | SYS-NEU-T02

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

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
Core

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

## summary
Two amino acids, one arrow between them, and almost everything else in the chapter hangs off that arrow. Phenylalanine is essential; tyrosine is not, because phenylalanine hydroxylase makes it — using tetrahydrobiopterin, a coenzyme that turns up again at the head of catecholamine synthesis and again at the head of serotonin synthesis. Downstream, tyrosine goes three ways as a precursor and one way as a fuel, and three named diseases sit at three different points of the same tree: one before tyrosine, one on the branch to pigment, one on the branch to fumarate and acetoacetate. Learn the tree and the diseases stop being three names to memorise.

## sections
### Definition
Phenylalanine is an **essential** amino acid. Tyrosine is a **non-essential** one, synthesised from phenylalanine by **phenylalanine hydroxylase (PAH)**, which requires **tetrahydrobiopterin (BH4)** as its coenzyme and hydrogen donor.

The reaction is worth reading as four moving parts rather than one arrow. Molecular oxygen supplies the hydroxyl group that goes onto the ring. BH4 supplies the hydrogen and is oxidised to BH2 in doing so. NADPH reduces BH2 back to BH4, so the coenzyme cycles rather than being consumed. And water leaves. A question that asks what the hydroxylation "requires" is asking for BH4; a question that asks what is regenerated is asking about NADPH.

The book then says something easy to read past. **Tyrosine hydroxylase**, which begins catecholamine synthesis, "needs the same factors as those for phenylalanine hydroxylase", and **tryptophan hydroxylase**, two pages later, is BH4-dependent as well. One coenzyme therefore stands at the head of three separate hydroxylations — of phenylalanine, of tyrosine and of tryptophan. The book does not draw that convergence in one place and does not say what a BH4 defect does to all three at once; it says only that about 1–2 per cent of phenylketonuria is caused by BH4 deficiency, and that those cases need BH4 supplementation as well as diet.

### Mechanism
Tyrosine is a **mixed** amino acid — glucogenic and ketogenic at once — and the reason is visible at the bottom of its catabolic pathway, which runs in four enzymatic steps.

**Tyrosine aminotransferase**, a PLP enzyme, transaminates tyrosine with α-ketoglutarate to give **p-hydroxyphenylpyruvate** and glutamate. **p-Hydroxyphenylpyruvate hydroxylase**, which needs **vitamin C and Cu²⁺** and molecular oxygen, converts it to **homogentisate** and releases CO2. **Homogentisate oxidase**, which needs **vitamin C and Fe²⁺** and molecular oxygen, opens the ring to **maleylacetoacetate**. An isomerase and then a hydrolase finish the job, splitting the molecule into **fumarate**, which is glucogenic, and **acetoacetate**, which is ketogenic.

Two things follow. The first is that the summary table's classification of tyrosine as mixed is not an arbitrary label — it is the two end products. The second is that phenylalanine's own classification as mixed is inherited: phenylalanine is catabolised only after it has been converted to tyrosine, so it enters the citric acid cycle as fumarate, by this route and no other.

Notice how close together the two hydroxylases in this pathway sit, and how different their cofactors are. PAH runs on BH4. p-Hydroxyphenylpyruvate hydroxylase runs on vitamin C and copper. Homogentisate oxidase runs on vitamin C and iron. Three hydroxylations within two printed pages, three different cofactor sets — which is exactly the near-neighbour confusion an examiner builds an option list out of.

### Key determinants
Tyrosine's other career is as a precursor, and it has three products.

**Catecholamines.** Tyrosine hydroxylase converts tyrosine to **dihydroxyphenylalanine (DOPA)**, using the same factors as PAH. DOPA is the precursor of **dopamine, noradrenaline and adrenaline**. The book names the three and stops there; it prints no individual step between DOPA and adrenaline.

**Melanin.** DOPA produced **in melanocytes** is used instead for the synthesis of melanin, by **tyrosinase**. Melanin is the dark brown pigment of skin, hair and iris. So DOPA is a genuine branch point: the same intermediate feeds the transmitter pathway in one tissue and the pigment pathway in another, and which branch a question is about is decided by the enzyme it names — tyrosine hydroxylase makes DOPA, tyrosinase consumes it.

**Thyroid hormones.** These come from tyrosine, but not through DOPA at all. Tyrosine residues of thyroglobulin, the protein of the thyroid gland, are iodinated to monoiodotyrosine (MIT) and then diiodotyrosine (DIT); two DIT couple to tetraiodothyronine (T4), one DIT and one MIT couple to triiodothyronine (T3).

Hold the three products together and the negative answers come free. Serotonin is not on this list, and neither is melatonin — both belong to tryptophan. GABA is not on it either; that is glutamate.

### Clinical significance
Three diseases sit on this tree at three different points, and the point is what tells them apart.

**Phenylketonuria** is a block *before* tyrosine, at phenylalanine hydroxylase. It is taught in full in its own article, and nothing about it is repeated here beyond the one fact this article's mechanism supplies: that 1–2 per cent of cases are a deficiency not of the enzyme but of BH4, and those cases need BH4 as well as diet.

**Albinism** is a block on the *synthetic* branch, at **tyrosinase**. Hair, skin and the choroid cells lining the eye-globe are devoid of melanin, and the skin becomes sensitive to ultraviolet rays.

**Alkaptonuria** is a block on the *catabolic* branch, at **homogentisate oxidase**. Homogentisate accumulates in the tissues and is excreted in the urine, where it auto-oxidises into deep brown **quinones**. That is why the history matters more than the finding: the child voids urine of normal colour and it darkens to black only as it stands, because the oxidation happens in air. The same quinones give the tissues — particularly **bone and cartilage** — a brown colour, a condition called **ochronosis**, and the patient suffers arthritis.

Set the three side by side and every distractor in this chapter's option lists becomes an adjacent enzyme rather than a random name. A child with black urine has a defect one step past homogentisate, not one step before it and not on the pigment branch at all.

### Common misconceptions
The first is answering "essential" for tyrosine because a child with PKU must be given it. The book's summary table lists tyrosine as **non-essential**, and that is what the question asks; the dietary requirement in PKU is a consequence of the missing enzyme, not a property of the amino acid. Note that the book itself never bridges those two statements — it makes both and leaves them apart.

The second is reaching for tyrosinase whenever a question mentions pigment. Tyrosinase deficiency is albinism, which is *too little* pigment; alkaptonuria is *too much* of a different pigment, and tyrosinase is not involved in it.

The third is picking the enzyme one step too late. Fumarylacetoacetate hydrolase — which this book prints only as "Hydrolase" — acts *after* homogentisate oxidase, so a block there lets no homogentisate accumulate and produces no black urine. The name, and the disease it belongs to, are not in this textbook at all.

## published_summary

## published_sections

## hold_these
Phenylalanine hydroxylase requires tetrahydrobiopterin (BH4) as coenzyme and hydrogen donor; O2 supplies the hydroxyl and NADPH regenerates BH4.
Tyrosine hydroxylase needs the same factors as phenylalanine hydroxylase, and tryptophan hydroxylase is BH4-dependent too.
Tyrosine is non-essential and mixed; its catabolism ends in fumarate (glucogenic) and acetoacetate (ketogenic).
Phenylalanine enters the citric acid cycle as fumarate, because it is catabolised only after conversion to tyrosine.
Tyrosine's three derivatives are the catecholamines, melanin and the thyroid hormones. Serotonin and melatonin are not among them.
DOPA is the branch point: tyrosine hydroxylase makes it, tyrosinase turns it into melanin.
Alkaptonuria is deficiency of homogentisate oxidase; the urine is normal when passed and blackens on standing.
Ochronosis is the brown staining of bone and cartilage by the same quinones, and it causes arthritis.

## lose_the_mark
Answering SAM, glutathione or Cu²⁺ for the coenzyme of phenylalanine hydroxylase.
Calling tyrosine essential because it is supplemented in PKU.
Assigning serotonin, melatonin or GABA to tyrosine.
Naming tyrosinase for a child with black urine, or the hydrolase one step past the true block.

## callout_evidence

## related_concepts
CON-FND-A6E502DCE4232F | CON-FND-634036621EB132 | CON-FND-FA4D15805B9D02 | CON-FND-49155E4E08617B

## related_articles
ART-103-BIO-PHENYLKETONURIA: the block before tyrosine, authored from the 2025 end-of-year paper — the enzyme defect, the neurological mechanism, the hypopigmentation and the treatment
ART-103-BIO-TRYPTOPHAN-AND-HISTIDINE: the other aromatic hydroxylase that runs on BH4, and the two derivatives students most often misfile under tyrosine
ART-103-BIO-CITRIC-ACID-CYCLE: where the fumarate at the end of tyrosine catabolism goes

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07 | src_07f0a0ff41addf826c7f

## article_source_ids
src_300847a5fa64809d6c07 | src_07f0a0ff41addf826c7f

## claim_ids
[clear]

## span_ids
[clear]

## universities
kau

## years
KAU_Y1

## university_notes
kau: The Biochemistry department's orientation for 2025-2026 cancels eleven items from the end-of-module and final exams. Nothing taught in this article is on that list — the cancelled amino acid entry is "Histidine & proline (p105)", which belongs to the sibling article. The department question book examines this article's material across nine items on printed pages 122 to 124.

## annotations
### definition_of · CON-FND-A6E502DCE4232F
Quote: Tyrosine is a **non-essential** one, synthesised from phenylalanine by **phenylalanine hydroxylase (PAH)**, which requires **tetrahydrobiopterin (BH4)** as its coenzyme and hydrogen donor.
Block: body

### definition_of · CON-FND-634036621EB132
Quote: An isomerase and then a hydrolase finish the job, splitting the molecule into **fumarate**, which is glucogenic, and **acetoacetate**, which is ketogenic.
Block: body

### definition_of · CON-FND-FA4D15805B9D02
Quote: So DOPA is a genuine branch point: the same intermediate feeds the transmitter pathway in one tissue and the pigment pathway in another, and which branch a question is about is decided by the enzyme it names — tyrosine hydroxylase makes DOPA, tyrosinase consumes it.
Block: body

### definition_of · CON-FND-49155E4E08617B
Quote: That is why the history matters more than the finding: the child voids urine of normal colour and it darkens to black only as it stands, because the oxidation happens in air.
Block: body

## media

## media_recommendations
### diagram · The phenylalanine–tyrosine tree with the three blocks marked
Brief: One tree redrawn from the book's printed pages 100 to 102: phenylalanine at the top with the PAH arrow to tyrosine and the BH4/BH2–NADPH cycle drawn on it; from tyrosine, one branch up through tyrosine hydroxylase to DOPA and then forking to catecholamines and, in melanocytes, through tyrosinase to melanin; a second branch to thyroglobulin, MIT, DIT, T3 and T4; a third branch down through tyrosine aminotransferase, p-hydroxyphenylpyruvate, homogentisate, maleylacetoacetate to fumarate and acetoacetate. Three red bars: phenylketonuria at PAH, albinism at tyrosinase, alkaptonuria at homogentisate oxidase
Purpose: Teaches CON-FND-FA4D15805B9D02 and CON-FND-49155E4E08617B. Every distractor in this chapter's option lists is an adjacent enzyme on this tree, and telling three diseases apart is a spatial judgement — which branch, and how far down it. Prose can assert the order; only the figure lets a student read the answer off the position.
Priority: required
Status: needed
Section: Clinical significance
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figures cited by locator
Rights: must be CC-BY or public domain

### comparison table · The three hydroxylations and their cofactors
Brief: Three rows — phenylalanine hydroxylase / BH4 and O2, with NADPH regenerating BH4; p-hydroxyphenylpyruvate hydroxylase / vitamin C, Cu²⁺ and O2; homogentisate oxidase / vitamin C, Fe²⁺ and O2 — with the substrate and product of each in adjacent columns
Purpose: Teaches CON-FND-A6E502DCE4232F. Three hydroxylases sit within two printed pages with three different cofactor sets, and the department question book builds its distractors out of exactly that adjacency. A student who has met them as separate sentences has no way to see them as a set of three that must be told apart.
Priority: strongly helpful
Status: needed
Section: Mechanism
Kind: comparison table
Source direction: original table built from the department book's own reaction schemes
Rights: original work

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter "Individual Amino Acid Metabolism", printed pages 100 to 103 (file pages 101 to 104), read from the cached page text scripts/kasr/extract/pagetext/src_300847a5fa64809d6c07.json.
Kasr Al Ainy Biochemistry department question book for modules 102 and 103 (src_07f0a0ff41addf826c7f), same chapter, printed pages 122 to 124, for what is examined and in what form. It is curriculum signal only and is never cited as evidence that a statement is medically true.

## evidence_gaps
No claim or citation is attached to any sentence in this article yet; the evidence chain is owed and is named in the hand-off report.
Every statement rests on one textbook, the department book. No independent verification against an international biochemistry reference has been attached.
The book names DOPA as the precursor of dopamine, noradrenaline and adrenaline and prints no step between them. The SAM-dependent N-methylation of noradrenaline to adrenaline, which the question book's explanations use, is not in this textbook and is not taught here.
The book never names tyrosinaemia, and prints the last enzyme of tyrosine catabolism only as "Hydrolase" — not as fumarylacetoacetate hydrolase, which the question book offers as a distractor. The misconceptions section says only what a block there would not produce, and asserts nothing about the disease.
The convergence of three hydroxylases on one coenzyme is assembled from three separate sentences on three pages; the book never states it as a single fact and never says what a BH4 defect does to all three pathways at once.
The book gives alkaptonuria no inheritance pattern, no incidence and no treatment.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written to carry the nine MCQs of the department question book's Individual Amino Acid Metabolism chapter that fall on phenylalanine and tyrosine and are not already served by ART-103-BIO-PHENYLKETONURIA — printed page 122 questions 17, 18 and 19, printed page 123 questions 20, 21, 23, 25 and 26, and printed page 124 question 27. TPL-CONCEPT rather than TPL-CONDITION because the subject is a pathway with three diseases hanging off it, not a disease. Phenylketonuria is deliberately not re-taught; the four concepts it owns are cross-referenced from this article's concepts and recorded in their rejected_merge_candidate_ids.

## field_notes
microtopicId: The overlay tree has no child below "Aromatic Amino Acids", and the department book's own section name is carried by module_subject, which is finer than any microtopic here would be. The four pending 2025-lane phenylketonuria concepts use the same placement, and this article is deliberately filed beside them.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this article where nothing else lives.
questionIds: Written [clear]. The nineteen MCQs in ../question/103-BMS-MCQ-protein-heme.md that touch this material name this article in their library_ids, but question IDs are assigned at import and naming them here before they exist would be inventing IDs. The back-reference is owed and is listed in the hand-off report.
media: The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped. No rights-cleared asset exists for any of this material; what is needed is requested in media_recommendations, and the department book's own figures are faculty teaching material, cited by locator and not reproduced.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
calloutEvidence: Present and empty. Every callout in hold_these would need a claim and a citation to carry, and this lane authors neither; a callout naming an invented claim ID would be worse than none.
claimIds: Written [clear] and owed. The 28 claims in ../evidence/103-BMS-biochemistry-claims.md were read and none asserts this article's content — they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to an article file and a concept file and mints no claim or citation IDs.
spanIds: Written [clear] and owed, for the same reason as claimIds. A span must name the claim and the citation it rests on, and neither exists yet.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---
