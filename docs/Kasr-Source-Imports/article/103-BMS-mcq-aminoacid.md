<!--
  103 BMS · Biochemistry · the two library articles that teach the eight
  concepts minted for the individual amino acid metabolism MCQs.

    ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN  → 4 concepts
    ART-103-BIO-SULFUR-AMINO-ACIDS                    → 4 concepts

  WHY TWO AND NOT MORE. Neither ID was chosen here. Both are already named in
  the library_ids of finished questions in ../question/103-BMS-MCQ-protein-heme.md,
  and a question's library_ids must name an article whose related_concepts lists
  that question's main_concept — so the split was fixed before this file was
  written. Two is also the number of book divisions the eight concepts fall into:
  the first three sections of chapter VI, and the Sulfur Containing Amino Acids
  division that follows them.

  Every concept in ../concept/103-BMS-mcq-aminoacid-concepts.md is listed by
  exactly the article it names in its own article_ids, in both directions.

  ALL PROSE IS FROM ONE BOOK: src_300847a5fa64809d6c07, Dpt book Biochemistry
  103.pdf, chapter VI "Individual Amino Acid Metabolism", printed pages 91 to 99
  and the Summary of Amino Acid Metabolism on printed page 106. Nothing is
  asserted that the book does not say, and where the book is silent the article
  says so — in the text, in evidence_gaps, and on the concept. The department
  question book (src_07f0a0ff41addf826c7f) establishes what is examined and is
  never cited as evidence that something is true.

  TWO SILENCES ARE RECORDED RATHER THAN FILLED. The book never mentions oxalate
  or glyoxylate, so the glycine-to-oxalate link the question book asks twice is
  marked in the prose as coming from the examiner and not from the textbook. And
  guanidinoacetate, the acceptor whose methylation makes creatine, is not in the
  book's transmethylation list either.

  THE CANCELLED SECTIONS. The department's 2025-2026 orientation cancels Alanine
  and Serine, Threonine, Aspartic acid, Arginine and Lysine, and Histidine and
  Proline from both exams. None of the material these two articles are built on
  is cancelled, but several derivative lists point into cancelled ground, and
  university_notes on each article says which arms those are.

  MEDIA. Assets are requested and none is supplied; this repository holds no
  medical images. No URL is invented anywhere, and `## media` is present and
  deliberately empty on both records with a field_notes reason: [clear] there
  would parse as a media block with no URL and be reported as one that would be
  dropped. `## published_summary` and `## published_sections` are empty for the
  same parsing reason and because nothing is published yet.

  Import: Admin › Bulk import → article. Articles land before concepts.
-->

# Item

## id
ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN

## title
Glycine, glutamate and the branched-chain amino acids: what each one builds, and where each pathway fails

## arabic_title
الجليسين وحمض الجلوتاميك والأحماض الأمينية متفرعة السلسلة

## aliases
Glycine
Glutamic acid
Branched chain amino acids
Maple syrup urine disease
Derivatives of glycine and glutamate
Valine leucine isoleucine

## subject
fnd

## topic
Amino acids and proteins

## subtopic
Individual amino acid Metabolism

## microtopic
Glycine, Glutamic Acid and Branched Chain Amino Acids

## nanotopic


## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T07

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
Three sections of the department's chapter on individual amino acids, and one habit of mind that gets a student through all of them. For each amino acid the book asks the same three questions — how is it made, what does it break down to, and what is it required to build — and the exam is almost entirely built from the third answer. Glycine and glutamate each carry a list of derivatives, and the lists overlap enough that the questions are written on the overlap: both are in glutathione, both feed purines, but heme is glycine's alone and GABA is glutamate's alone. The branched-chain trio is different in shape: three amino acids share one catabolic enzyme, which is exactly why one enzyme's failure spills all three into the urine and gives maple syrup urine disease its name.

## sections
### Definition
Chapter VI of the department book works through the amino acids one at a time, and it uses the same three headings for each: Synthesis, Catabolic Fate, and Functions and Derivatives. Reading the chapter as a set of answers to those three questions is worth more than reading it as a list of molecules, because the examiner asks the third question far more often than the other two.

**Glycine** is the smallest amino acid, non-essential and glucogenic. It is synthesised mainly from serine, by serine hydroxymethyl transferase.

**Glutamic acid** is non-essential and glucogenic. It is synthesised three ways: by the reversal of oxidative deamination, by the transamination reactions of ALT and AST, and from the catabolism of proline, arginine and histidine.

**Valine, leucine and isoleucine** are the branched-chain amino acids, and all three are essential — so there is no synthesis section for them to learn.

### Mechanism
**Glycine's catabolism runs two ways.** The main route is the glycine cleavage system, which splits glycine into ammonia, carbon dioxide and methylene-tetrahydrofolate — so the molecule's middle carbon goes straight into the one-carbon pool. The second route converts glycine to serine by serine hydroxymethyl transferase, and serine dehydratase then deaminates serine to pyruvate. That second route is the whole reason glycine counts as glucogenic.

Its list of synthetic roles is the examinable part, and the book gives six plus a seventh contribution. Glycine is required for the synthesis of **serine**, **glutathione**, **heme**, **purines**, **creatine**, and **bile salts** — it conjugates with bile acids so that they are excreted in bile as bile salts. It also gives formyl-THF and methylene-THF to one-carbon metabolism. Two things sit outside the list: glycine is an essential component of some proteins, collagen among them, and it is an inhibitory chemical transmitter in its own right.

**Glutamate's catabolism is a single sentence** — it gives α-ketoglutarate, by either transamination or oxidative deamination — and its derivative list is the examinable part again. Glutamate is decarboxylated by glutamate decarboxylase, with pyridoxal phosphate, to **GABA**. It is one of the three amino acids of **glutathione**, with cysteine and glycine. Its carbon skeleton makes **arginine and proline**. Glutamine synthetase adds ammonia to it as an amide to make **glutamine**, which is the major mechanism for removing ammonia in the brain, and whose amide group is then spent on asparagine, on purines and pyrimidines, on amino sugars, and on converting nicotinic acid to nicotinamide for NAD+ and NADP+. Finally, glutamate is γ-carboxylated, and that carboxylation is what activates the blood clotting factors and the osteocalcin of bone — the vitamin K-dependent step.

**The branched-chain three share one pathway, in two steps.** First each is transaminated to its corresponding α-keto acid. Then that keto acid is oxidatively decarboxylated by **branched-chain α-keto acid dehydrogenase**, which requires the same five factors as every other α-keto acid dehydrogenase — thiamine pyrophosphate, FAD, lipoate, NAD+ and coenzyme A — and yields the corresponding lower-chain acyl-CoA. Where those acyl-CoAs go decides each amino acid's classification: valine gives succinyl-CoA and is glucogenic; leucine gives acetyl-CoA and acetoacetate and is ketogenic; isoleucine gives both and is mixed.

### Key determinants
What decides whether a student gets these marks is not the two lists but the **overlap between them**, and it is worth writing out where they intersect.

Glutathione contains glycine *and* glutamate, along with cysteine. Purines receive a contribution from glycine — an intact N-C-C unit — and also from glutamate, by way of glutamine's amide nitrogen. So neither of those two discriminates. What discriminates is the pair at the edges: **heme is glycine's and not glutamate's**, because heme begins with glycine condensing with succinyl-CoA; and **GABA is glutamate's and not glycine's**, because glutamate decarboxylase makes it. GABA is the trap, because GABA and glycine are both inhibitory transmitters, so a student matching on function rather than on synthesis takes it.

Three more molecules are regularly offered and belong to nobody in this article. Lecithin is phosphatidylcholine, and the amino acids behind it are serine, an important constituent of phospholipids, and methionine, whose SAM methylates ethanolamine to choline. Melatonin comes from tryptophan. Glutamine comes from glutamate, not from glycine, and is easily misread as glutathione under time pressure.

For the branched-chain group the determinant is different, and simpler: **one enzyme serves all three amino acids**. That single fact predicts the entire disease. It also predicts where the block sits — at the *second* step, not the transamination — which is why the amino acids themselves rise along with their keto acids rather than only the keto acids.

### Clinical significance
**Maple syrup urine disease** is a genetic deficiency of branched-chain α-keto acid dehydrogenase. All three branched-chain amino acids and all three of their corresponding α-keto acids accumulate in the body fluids and are excreted, giving the urine the characteristic odour of maple syrup or burnt sugar. The α-keto acids are neurotoxic and lead to mental retardation, and treatment is a diet restricted in branched-chain amino acids. When an exam item asks what *type* of amino acid accumulates, the answer is branched chain — not basic, which is the dibasic group of cystinuria and has no odour, and not neutral, which is Hartnup disease and also has no odour.

**Oxalate stones** are the department's other clinical use of this material, and the honest position on them has to be stated. The question book asks twice, in the same chapter, which amino acid's degradation defect produces urinary oxalate, and its key is glycine: a defect in glycine degradation diverts it towards glyoxylate and then to oxalate, calcium oxalate is poorly soluble, and the result is recurrent stones, nephrocalcinosis and progressive renal failure. **The department textbook does not teach this.** The words oxalate and glyoxylate do not appear anywhere in it, and its Summary of Amino Acid Metabolism prints a dash where glycine's metabolic error would go. The mechanism is worth holding all the same, because it is the counterpart of cystinuria: an oxalate stone forms because something insoluble is *overproduced*, and a cystine stone forms because something soluble is *not reabsorbed*.

**Glutamate's clinical reach is mostly through GABA and glutamine.** The book blames the convulsions of ammonia intoxication on deficiency of GABA, the inhibitory transmitter glutamate decarboxylase makes; and it names the glutamine accumulating in astrocytes as a cause of osmotic brain oedema in the same condition. Both are the same chemistry read from opposite ends: the brain's only way of detoxifying ammonia is to fix it onto glutamate and then onto glutamine, so the organ that mops ammonia up is the one damaged by having to.

## published_summary


## published_sections


## hold_these
Glycine is required for serine, glutathione, heme, purines, creatine and bile salts, and it gives formyl-THF and methylene-THF to one-carbon metabolism.
Glutamate gives GABA, glutathione, arginine, proline and glutamine, and is γ-carboxylated to activate clotting factors and osteocalcin.
Heme is glycine's, not glutamate's. GABA is glutamate's, not glycine's.
Maple syrup urine disease is a deficiency of branched-chain α-keto acid dehydrogenase, and all three branched-chain amino acids and their keto acids are excreted.
The branched-chain dehydrogenase needs the same five cofactors as pyruvate dehydrogenase: TPP, FAD, lipoate, NAD+ and CoASH.
Valine is glucogenic, leucine is ketogenic, isoleucine is mixed.
Glycine is glucogenic, because it becomes serine and then pyruvate.

## lose_the_mark
Choosing heme as a derivative of glutamic acid.
Choosing GABA as something glycine makes, because both are inhibitory transmitters.
Reading glutamine for glutathione, or the reverse.
Placing the maple syrup urine disease block at the transamination step instead of the oxidative decarboxylation.
Answering "basic" or "neutral" for the amino acids that accumulate in maple syrup urine disease.
Calling glycine ketogenic.

## callout_evidence


## related_concepts
CON-FND-38F3A09255526F | CON-REN-339CFAB4C81D12 | CON-FND-58FAD64EEA965B | CON-NEU-46F59E9C3EA406

## related_articles
ART-103-BIO-PHENYLKETONURIA: the other inborn error of amino acid metabolism this course teaches, and the one whose damage is neurological rather than renal
ART-103-BIO-NITROGEN-BALANCE: where the amino group goes once transamination has moved it onto glutamate
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS: the one-carbon pool glycine feeds, and the folate coenzymes that carry it

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
[clear]

## span_ids
[clear]

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Glycine

## university_notes
kau: The Biochemistry department's 2025-2026 orientation cancels eleven items from the end-of-module and the final exam. None of the three sections this article is built on is among them — Glycine on printed page 91, the Branched Chain Amino Acids on printed pages 93 and 94, and Glutamic Acid on printed pages 94 and 95 are all still examinable, and the department question book asks all three. Three arms of the derivative lists do point into cancelled ground and should not be revised as though they were examinable in their own right: heme synthesis, cancelled outright; creatine, because it is built with arginine, cancelled on printed page 96 together with lysine; and glutamate's conversion to arginine and to proline, proline being cancelled on printed page 105. Serine, which glycine both makes and is made from, is cancelled on printed page 92 as well.

## annotations
### definition_of · CON-FND-38F3A09255526F
Quote: Glycine is required for the synthesis of **serine**, **glutathione**, **heme**, **purines**, **creatine**, and **bile salts** — it conjugates with bile acids so that they are excreted in bile as bile salts.
Block: body

### definition_of · CON-NEU-46F59E9C3EA406
Quote: Glutamate is decarboxylated by glutamate decarboxylase, with pyridoxal phosphate, to **GABA**. It is one of the three amino acids of **glutathione**, with cysteine and glycine. Its carbon skeleton makes **arginine and proline**.
Block: body

### definition_of · CON-FND-58FAD64EEA965B
Quote: **Maple syrup urine disease** is a genetic deficiency of branched-chain α-keto acid dehydrogenase. All three branched-chain amino acids and all three of their corresponding α-keto acids accumulate in the body fluids and are excreted, giving the urine the characteristic odour of maple syrup or burnt sugar.
Block: body

### definition_of · CON-REN-339CFAB4C81D12
Quote: a defect in glycine degradation diverts it towards glyoxylate and then to oxalate, calcium oxalate is poorly soluble, and the result is recurrent stones, nephrocalcinosis and progressive renal failure.
Block: body

## media


## media_recommendations
### comparison table · What glycine makes and what glutamate makes, with the overlap marked
Brief: Two columns, glycine and glutamate. Glycine: serine, glutathione, heme, purines, creatine, bile salts, formyl-THF and methylene-THF. Glutamate: GABA, glutathione, arginine, proline, glutamine, γ-carboxyglutamate. Glutathione and purines shaded across both columns to show they are shared; heme and GABA boxed as the two that belong to one column only
Purpose: Teaches CON-FND-38F3A09255526F and CON-NEU-46F59E9C3EA406. The whole difficulty of both examined items is where the two lists intersect, and two lists printed as prose one after the other is exactly what produces the error. A reader has to see the columns side by side to see the exception.
Priority: required
Status: needed
Section: Key determinants
Kind: comparison table
Source direction: original table built from the department book's own two lists on printed pages 91 and 94 to 95
Rights: original work

### diagram · The branched-chain pathway, three amino acids through one enzyme
Brief: Three parallel columns headed Valine, Leucine, Isoleucine, each running down through a transaminase step to its corresponding branched-chain α-keto acid, then through a single shared box labelled branched-chain α-keto acid dehydrogenase (TPP, FAD, lipoate, NAD+, CoASH) to the lower-chain acyl-CoAs — propionyl-CoA to succinyl-CoA for valine, HMG-CoA to acetyl-CoA and acetoacetate for leucine, both for isoleucine. The shared box marked as the lesion in maple syrup urine disease
Purpose: Teaches CON-FND-58FAD64EEA965B. That one enzyme serves three amino acids is the fact that explains the disease, and it is a statement about the shape of the pathway. Prose can assert it; only the figure shows it.
Priority: required
Status: needed
Section: Mechanism
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure on printed page 93, cited by locator
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter VI "Individual Amino Acid Metabolism", printed pages 91, 93, 94 and 95 (file pages 93, 95, 96 and 97), together with the Summary of Amino Acid Metabolism on printed page 106.
The 391-item department question book (src_07f0a0ff41addf826c7f) establishes which of this material is examined and how — printed page 120, questions 1 to 6 — and is cited as curriculum signal only, never as evidence that a statement is medically true.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The oxalate paragraph in Clinical significance is NOT supported by the department book. The strings "oxalate" and "glyoxylate" occur on none of the book's 160 pages, and the Summary of Amino Acid Metabolism records no metabolic error for glycine. That paragraph rests on the department question book's two items and their printed key, and is marked as such in the prose. A faculty reviewer should decide whether it stays.
The book gives no reaction for glutamate's conversion to arginine or to proline, only that it happens.
The book gives no incidence, inheritance pattern, age of presentation or acute management for maple syrup urine disease beyond the restricted diet.
The book does not describe glutamate as an excitatory neurotransmitter, and this article does not assert it.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Written to carry questions 1 to 6 of the Individual Amino Acid Metabolism chapter of the department question book. TPL-CONCEPT rather than TPL-CONDITION because the subject is three amino acids and what they build, with the two disorders as consequences rather than as the article's subject; maple syrup urine disease and the oxalate stone disorder are each carried by a concept and may later earn their own TPL-CONDITION article if the department deepens them. The sulfur amino acids are a separate article because the book gives them their own division and because the finished questions already name a separate ID for them.

## field_notes
nanotopic: The canonical overlay stops at DIS-BIO-T05, whose only children are Core principles, Applied / clinical correlations and Practical and assessment. The book's own chapter and section names are carried by module_subject and by microtopic, which are finer than anything the tree offers below this point.
questionIds: The six MCQs that test this article are authored in ../question/103-BMS-MCQ-protein-heme.md and already name this article in their library_ids. The back-reference is owed and is left as [clear] rather than filled with IDs before that file is applied.
claimIds: Deliberately empty. The claim, citation and span chain for the Individual Amino Acid Metabolism chapter is a separate scope and is not authored in this batch; naming claim IDs here would point at records nothing creates.
spanIds: Empty for the same reason as claimIds.
calloutEvidence: Present and deliberately empty. Every callout in hold_these and lose_the_mark is evidenced by the book pages named in evidence_basis, but a callout_evidence block must name a claim and a citation ID, and this batch authors neither. Filling it with invented IDs would be worse than leaving the evidence chain visibly owed.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book's own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
moduleSubject: The article spans three of the book's sections and the field takes one path, so it carries Glycine, the section the first and largest group of concepts sits under. Each concept carries its own exact path.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
