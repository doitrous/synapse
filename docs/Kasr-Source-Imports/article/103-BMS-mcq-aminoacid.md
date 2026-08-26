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
ART-103-BIO-SULFUR-AMINO-ACIDS: the other half of this chapter — cysteine, which shares glutathione and bile salt conjugation with glycine, and methionine as the methyl donor
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
CLM-145DF72E15C6 | CLM-1675546C5D91 | CLM-4DBC92CEAAEE | CLM-6AB7956E7FC3

## span_ids
SPN-BIO-GLYCINE-GLUTAMATE-AND-01 | SPN-BIO-GLYCINE-GLUTAMATE-AND-02 | SPN-BIO-GLYCINE-GLUTAMATE-AND-03 | SPN-BIO-GLYCINE-GLUTAMATE-AND-04 | SPN-BIO-GLYCINE-GLUTAMATE-AND-05 | SPN-BIO-GLYCINE-GLUTAMATE-AND-06 | SPN-BIO-GLYCINE-GLUTAMATE-AND-07

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
nanotopicId: The canonical tree stops at DIS-BIO-T05 for this material; the book's own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
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

---

# Item

## id
ART-103-BIO-SULFUR-AMINO-ACIDS

## title
The sulfur amino acids: cysteine's six derivatives, methionine as the methyl donor, and the two diseases whose names look alike

## arabic_title
الأحماض الأمينية الكبريتية: السيستئين والميثيونين

## aliases
Sulfur containing amino acids
Cysteine
Methionine
S-adenosylmethionine
Homocystinuria
Cystinuria
Trans-sulfuration pathway

## subject
fnd

## topic
Amino acids and proteins

## subtopic
Individual amino acid Metabolism

## microtopic
Sulfur Containing Amino Acids (Cysteine and Methionine)

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
10

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
Two amino acids, one sulfur atom passed between them, and two diseases whose names are close enough to be confused and whose mechanisms are opposites. Methionine is essential and carries the sulfur in; cysteine is non-essential and is built from methionine's sulfur and serine's carbon skeleton by the trans-sulfuration pathway. Everything the department examines follows from that arrangement. Cysteine's six derivatives are six different uses of a thiol group. Methionine's one great function is to donate a methyl group as S-adenosylmethionine, which turns it into homocysteine and makes the whole thing a cycle. Block the cycle's exit and you get homocystinuria, a metabolic disease with an abnormal plasma. Break the kidney's dibasic transporter and you get cystinuria, a transport disease with a normal plasma and a stone. Learn them as a pair or you will swap them in the exam.

## sections
### Definition
The book groups cysteine and methionine together as the **sulfur containing amino acids**, and the grouping is not just chemical bookkeeping — the two are joined by a pathway that runs in one direction only.

**Methionine is essential.** Nothing in the body makes it, so all its sulfur is dietary. It is glucogenic, and its catabolism runs through cystathionine, homoserine and α-ketobutyrate to propionyl-CoA, which becomes succinyl-CoA and then glucose.

**Cysteine is non-essential**, because it is synthesised by the **trans-sulfuration pathway**: cystathionine synthase condenses homocysteine with serine to give cystathionine, and cystathionase splits cystathionine into homoserine and cysteine. Both enzymes require pyridoxal phosphate. Cysteine is glucogenic, being converted to pyruvate.

Read the direction: methionine's sulfur can become cysteine's sulfur, but cysteine's sulfur can never become methionine's. That one-way arrow is why methionine is essential and cysteine is not — and why, when the pathway is blocked, cysteine becomes essential too.

### Mechanism
**Cysteine's derivatives are six uses of one thiol group**, and the department book lists them in order.

Two molecules of cysteine are oxidised to form **cystine**, joined by a disulfide bond. The **thiol group** itself is a component of the active site of many enzymes. Cysteine provides the sulfate of **PAPS**, phosphoadenosyl-phosphosulfate or active sulfate, which is the sulfate donor for glycosaminoglycans, sulfolipids and detoxification reactions. It makes **thioethanolamine**, a component of coenzyme A. It makes **taurine**, mainly in liver cells, which — like glycine — is conjugated with bile acids and excreted in bile in the form of bile salts. And it is one of the three amino acids of **glutathione**, with glycine and glutamic acid.

Glutathione earns its own paragraph in the book. It exists in an oxidised form, GS-SG, and a reduced form, GSH, and glutathione reductase converts one to the other. It matters for amino acid absorption through the mucosal cells of the intestine by the γ-glutamyl cycle; it is a powerful antioxidant, with glutathione peroxidase and glutathione reductase protecting the cell against hydrogen peroxide; and it is a cofactor in many enzymatic reactions, including methionine adenosyl transferase — the enzyme that makes SAM. So cysteine's last derivative is a cofactor for methionine's first reaction.

**Methionine's function is to donate a methyl group.** Methionine adenosyl transferase, using ATP and glutathione, converts methionine to **S-adenosylmethionine**, the active form. A methyl transferase then hands SAM's methyl group to an acceptor, and the acceptor becomes the methylated product. The book's transmethylation examples are three: **ethanolamine → choline**, **noradrenaline → adrenaline**, and **N-acetylserotonin → melatonin**.

Having given up its methyl group, SAM becomes S-adenosylhomocysteine, and a hydrolase releases adenosine from it to leave **homocysteine**. **Methionine synthase** then remethylates homocysteine back to methionine, using methylcobalamin and methyl-tetrahydrofolate — so the cycle closes, and the reason vitamin B12 and folate deficiency both raise homocysteine is that they both stall this one step. Methionine's other role is in the synthesis of protein and of the polyamines spermine and spermidine, which stabilise DNA and RNA by their multiple positive charges, participate in gene expression and act as growth factors in cell culture.

### Key determinants
Homocysteine sits at a **fork**, and everything clinical in this article is decided there. It can be remethylated back to methionine by methionine synthase, using B12 and THF. Or it can be committed onward down the trans-sulfuration pathway by cystathionine synthase, using PLP. Which arm fails decides which biochemical picture the patient has, and the discriminator is a single number.

Block **cystathionine synthase** — by a defect in the enzyme, or by vitamin B6 deficiency — and homocysteine backs up. Because it cannot go forward, it is pushed back up the remethylation arm, so **methionine rises too**, and because the forward route is the only source of cysteine's carbon-plus-sulfur assembly, **cysteine falls** and becomes an essential amino acid in these patients.

Block **methionine synthase** — by a defect in the enzyme, or by folate or B12 deficiency — and homocysteine also rises, but nothing pushes methionine up, so **plasma methionine is normal**. Both conditions excrete large amounts of homocystine, two homocysteine molecules joined by a disulfide linkage, and both are therefore called homocystinuria.

For a SAM question the determinant is grammatical rather than metabolic: **name the acceptor, not the product**. Adrenaline, melatonin and choline are outputs; noradrenaline, N-acetylserotonin and ethanolamine are the inputs a question asking for "precursors" wants. A distractor list that mixes the two halves is the standard trap, and phosphatidylcholine offered as choline's precursor is the same error run backwards.

### Clinical significance
**Homocystinuria** is a group of autosomal recessive diseases involving defects in the metabolism of homocysteine, and the commonest cause is a cystathionine synthase defect. Raised homocysteine modifies LDL and collagen, and from those two modifications the book derives the whole clinical picture: endothelial injury, atherogenesis, coronary artery disease, thromboembolic disorders and hypertension; and osteoporosis, mental retardation, and dislocation or complete detachment of the eye lens. Treatment is restriction of methionine intake, a diet rich in cysteine, and supplementation with vitamins B6, B12 and folate — three vitamins because both arms of the fork are being supported at once. Homocysteinaemia short of the inherited disease carries the same vascular association, which is why the plasma level is measured at all.

**Cystinuria** is the most common genetic error of amino acid transport, and it is not a disease of this pathway at all — it only looks like one. A genetic defect in the transporter of the **dibasic** amino acids means cystine, arginine, ornithine and lysine are not reabsorbed across the renal proximal tubules and are excreted in the urine. Cystine is the least soluble of the four, so it precipitates in the tubules, crystallises as the characteristic hexagonal crystals, and forms stones. The treatment is read straight off the mechanism: alkalinisation of the urine and plenty of fluids make cystine more soluble, so it is washed out rather than deposited.

Hold the two side by side, because the exam does. **Homocystinuria is metabolic and the plasma is abnormal; cystinuria is transport and the plasma is normal.** Methionine is the amino acid behind the first and is the one amino acid conspicuously *absent* from the urine in the second — it is neutral, not dibasic, and a different transporter carries it. And a cystine stone forms because something soluble is not reabsorbed, which is the opposite of the oxalate and urate stones that form because something insoluble is overproduced.

## published_summary


## published_sections


## hold_these
Cysteine's six derivatives: cystine, enzyme thiol groups, the sulfate of PAPS, thioethanolamine of coenzyme A, taurine, and glutathione.
Taurine and glycine are both conjugated with bile acids to make bile salts.
Glutathione is glycine, cysteine and glutamic acid, and glutathione reductase interconverts GSH and GS-SG.
SAM's three transmethylation examples: ethanolamine to choline, noradrenaline to adrenaline, N-acetylserotonin to melatonin.
Methionine synthase remethylates homocysteine using vitamin B12 and methyl-THF, which is why B12 and folate deficiency raise homocysteine.
Cystathionine synthase deficiency raises homocysteine AND methionine; methionine synthase deficiency raises homocysteine with methionine normal.
Cystinuria is a defect of the dibasic amino acid transporter — cystine, arginine, ornithine and lysine in the urine, cystine stones, hexagonal crystals.
Cystinuria is treated by alkalinising the urine and drinking plenty of fluids.

## lose_the_mark
Naming a methylated product where the question asks for the SAM acceptor.
Confusing cystinuria with homocystinuria.
Expecting methionine in the urine in cystinuria — it is neutral, not dibasic.
Forgetting that plasma methionine is normal when the block is at methionine synthase.
Choosing glutathione reductase as the enzyme behind raised homocysteine.
Answering that cysteine is essential — it is essential only once the trans-sulfuration pathway is blocked.

## callout_evidence


## related_concepts
CON-FND-11F38A2B3E9B67 | CON-FND-3622E11F05032C | CON-FND-E8A570D41E7B8F | CON-REN-3DD1CADB68BB1B

## related_articles
ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN: the other half of this chapter — glycine, which shares glutathione and bile salt conjugation with cysteine, and the branched-chain group
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS: B6, B12 and folate, the three vitamins this pathway fails without and the three the treatment supplies
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE: where glutathione's antioxidant role is taught, with glutathione peroxidase and reductase

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-D4FA465857ED

## span_ids
SPN-BIO-SULFUR-AMINO-ACIDS-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Cysteine

## university_notes
kau: The Biochemistry department's 2025-2026 orientation cancels eleven items from the end-of-module and the final exam. Neither Cysteine (printed pages 96 to 97) nor Methionine (printed pages 98 to 99) is among them, and the department question book examines both heavily — nine of the chapter's sixteen items sit on this article. Two arms of the material touch cancelled ground and should not be revised as though examinable in their own right: serine, which supplies cysteine's carbon skeleton, is cancelled with alanine on printed page 92; and arginine and lysine, two of the four amino acids the cystinuria transporter carries, are cancelled on printed page 96. Neither cancellation reaches the disorders themselves.

## annotations
### definition_of · CON-FND-11F38A2B3E9B67
Quote: It makes **taurine**, mainly in liver cells, which — like glycine — is conjugated with bile acids and excreted in bile in the form of bile salts. And it is one of the three amino acids of **glutathione**, with glycine and glutamic acid.
Block: body

### definition_of · CON-FND-3622E11F05032C
Quote: A methyl transferase then hands SAM's methyl group to an acceptor, and the acceptor becomes the methylated product. The book's transmethylation examples are three: **ethanolamine → choline**, **noradrenaline → adrenaline**, and **N-acetylserotonin → melatonin**.
Block: body

### definition_of · CON-FND-E8A570D41E7B8F
Quote: Block **cystathionine synthase** — by a defect in the enzyme, or by vitamin B6 deficiency — and homocysteine backs up.
Block: body

### definition_of · CON-REN-3DD1CADB68BB1B
Quote: A genetic defect in the transporter of the **dibasic** amino acids means cystine, arginine, ornithine and lysine are not reabsorbed across the renal proximal tubules and are excreted in the urine.
Block: body

## media


## media_recommendations
### diagram · The methionine cycle with the fork at homocysteine
Brief: A closed loop: methionine to SAM by methionine adenosyl transferase with ATP and glutathione; SAM to S-adenosylhomocysteine through a methyl transferase, with the three acceptor-product pairs branching off; SAH hydrolysed to homocysteine plus adenosine; and then the fork — one arrow back to methionine through methionine synthase labelled B12 and methyl-THF, one arrow forward to cystathionine through cystathionine synthase labelled PLP and serine. Each arm labelled with what its failure does to plasma methionine
Purpose: Teaches CON-FND-3622E11F05032C and CON-FND-E8A570D41E7B8F together. That plasma methionine separates the two causes of homocystinuria is a consequence of where the block sits on a loop, and a reader who has only prose has to reconstruct the loop before the rule makes sense.
Priority: required
Status: needed
Section: Key determinants
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figures on printed pages 98 and 99, cited by locator
Rights: must be CC-BY or public domain

### comparison table · Cystinuria against homocystinuria
Brief: Two columns with rows for mechanism (transport versus metabolic), plasma amino acids (normal versus abnormal), urine finding (cystine, arginine, ornithine, lysine with hexagonal crystals versus homocystine), organ damage (renal stones versus vascular, skeletal, ocular, neurological), and treatment (alkalinisation and fluids versus methionine restriction with B6, B12 and folate)
Purpose: Teaches CON-REN-3DD1CADB68BB1B against CON-FND-E8A570D41E7B8F. The two are confused because of their names, and a side-by-side table is the only presentation in which the opposition of the mechanisms is the first thing a reader sees.
Priority: required
Status: needed
Section: Clinical significance
Kind: comparison table
Source direction: original table built from the department book's own two disorder entries on printed pages 97 and 99
Rights: original work

### diagram · Cysteine's six derivatives from one thiol group
Brief: Cysteine at the centre with six arrows: to cystine via a disulfide bond drawn between two cysteines; to an enzyme active-site SH; to PAPS labelled active sulfate, with GAGs, sulfolipids and detoxification beyond it; to thioethanolamine and on to coenzyme A; to taurine and on to bile salts, with glycine shown joining the same bile salt arrow; and to glutathione, drawn as the tripeptide with glycine and glutamic acid
Purpose: Teaches CON-FND-11F38A2B3E9B67. The examined point is that six unrelated-looking molecules are all one atom's worth of chemistry, and a radial figure carries that where a numbered list reads as six things to memorise separately.
Priority: strongly helpful
Status: needed
Section: Mechanism
Kind: diagram
Source direction: original diagram built from the department book's list on printed page 97
Rights: original work

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter VI "Individual Amino Acid Metabolism", the Sulfur Containing Amino Acids division, printed pages 96 to 99 (file pages 98 to 101), together with the Summary of Amino Acid Metabolism on printed pages 106 and 107.
The 391-item department question book (src_07f0a0ff41addf826c7f) establishes which of this material is examined and how — printed pages 121 and 122, questions 8 to 16 — and is cited as curriculum signal only, never as evidence that a statement is medically true.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book does not print guanidinoacetate anywhere, so the SAM reaction that makes creatine — which the question book asks and keys — is not in this article's transmethylation list. The book's list is the three reactions it prints, and the gap is recorded on CON-FND-3622E11F05032C rather than filled here.
The book names cystinuria's transporter only as "the transporter of dibasic amino acids": no gene, no protein, no inheritance pattern, and no statement about the intestine.
It gives no incidence for cystinuria despite calling it the most common genetic error of amino acid transport, and no incidence, age of presentation or genetic detail for homocystinuria beyond autosomal recessive.
The claim that raised homocysteine causes atherogenesis is stated on the page and not evidenced there; no outcome data supports it in this source.
The book does not say in words which atom of cysteine comes from serine and which from homocysteine; it prints the reaction and leaves the attribution to the reader.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Written to carry questions 8 to 16 of the Individual Amino Acid Metabolism chapter of the department question book — nine of the chapter's sixteen items, which is why this article is longer than its sibling. TPL-CONCEPT rather than TPL-CONDITION even though two named diseases sit in it: the article's subject is the sulfur pathway, and both disorders are taught by the book as consequences of it, under a "Metabolic Disorder of…" subheading rather than as chapters of their own. If the department later deepens either one, homocystinuria and cystinuria are each already carried by a concept and can be lifted into TPL-CONDITION articles without disturbing this one.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T05 for this material; the book's own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
nanotopic: The canonical overlay stops at DIS-BIO-T05, whose only children are Core principles, Applied / clinical correlations and Practical and assessment. The book's own division and section names are carried by module_subject and microtopic, which are finer than anything the tree offers below this point.
questionIds: The nine MCQs that test this article are authored in ../question/103-BMS-MCQ-protein-heme.md and already name this article in their library_ids. The back-reference is owed and is left as [clear] rather than filled with IDs before that file is applied.
claimIds: Deliberately empty. The claim, citation and span chain for the Individual Amino Acid Metabolism chapter is a separate scope and is not authored in this batch; naming claim IDs here would point at records nothing creates.
spanIds: Empty for the same reason as claimIds.
calloutEvidence: Present and deliberately empty. Every line in hold_these and lose_the_mark is carried by the book pages named in evidence_basis, but a callout_evidence block must name a claim and a citation ID and this batch authors neither. Leaving the chain visibly owed is better than inventing IDs to fill it.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book's own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
moduleSubject: The article spans the book's two sulfur amino acid sections and the field takes one path, so it carries Cysteine, the section the book opens the division with. Each concept carries its own exact path.
spelling: British throughout — homocysteinaemia, cystinuria, alkalinisation, crystallises. The book itself prints American forms in places; the record follows house style rather than the book's orthography, and no quoted wording is altered.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
