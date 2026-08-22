<!--
  103 BMS · Biochemistry · the two library articles that teach the seven
  concepts named by the purine MCQs in ../question/103-BMS-MCQ-protein-heme.md.

    ART-103-BIO-PURINE-SYNTHESIS-AND-SALVAGE   → 3 concepts
    ART-103-BIO-URIC-ACID-AND-PURINE-DISORDERS → 4 concepts

  WHY TWO AND NOT ONE. A question's library_ids must name an article whose
  related_concepts lists that question's main_concept, and both article IDs were
  fixed before this file was written — the finished questions already name them.
  The split follows the department book's own chapter, which divides at the page
  where synthesis stops and catabolism begins: biosynthesis and salvage on PDF
  pages 126 to 128, uric acid and the disorders of purine metabolism on 129 to
  131. Every concept in ../concept/103-BMS-mcq-purine-concepts.md names exactly
  one of these two in its article_ids, and each article lists its own concepts
  back in related_concepts. Both directions.

  WHAT THESE ARTICLES DO NOT TEACH. Gout itself is already authored. The 2025
  end-of-year paper's Case (2) was gout, and ART-103-BIO-GOUT-AND-HYPERURICAEMIA
  in ./103-BMS-biochemistry.md carries the diagnosis and tophi, the alcohol and
  lactate mechanism, the two directions urate can be lowered, and allopurinol.
  Nothing here duplicates it; it is cross-referenced in related_articles from
  both articles, and the second article stops where that one begins.

  THE TOPHI DISAGREEMENT IS NOT RE-LITIGATED. The 2025 paper's stem places tophi
  "in urine" and the book places them in soft tissue. That conflict is already
  recorded on the live concept CON-REN-31708150F8B722 and is not repeated here.

  NO URICOSURIC DRUG IS NAMED. The department book prints the heading "Drugs
  increasing the excretion of uric acid (Uricosuric drugs)" and names no member
  of the class; the examiner's own model answer does the same. Where the second
  article reaches treatment it goes exactly as far as the book goes and stops.
  No member of the uricosuric class is supplied from any other source, and no
  brand name and no dose appears anywhere in this file. Both articles carry
  publication_gate needs_evidence and neither auto-publishes.

  ALL PROSE IS FROM ONE BOOK: src_300847a5fa64809d6c07, Dpt book Biochemistry
  103.pdf, chapter IX "Metabolism of Purines and Pyrimidines", PDF pages 126 to
  131 (printed 124 to 129). Nothing is asserted that the book does not say, and
  where the book is silent both the prose and evidence_gaps say so. The 391-item
  department question book (src_07f0a0ff41addf826c7f) establishes what is
  examined and is never cited as evidence that a statement is true — on two
  points it disagrees with the department's own textbook, and the disagreement
  is recorded rather than resolved.

  Import: Admin › Bulk import → article. Order: article → concept.
-->

# Item

## id
ART-103-BIO-PURINE-SYNTHESIS-AND-SALVAGE

## title
Purine nucleotide synthesis: building the ring from scratch, and salvaging it back

## arabic_title
تخليق نيوكليوتيدات البيورين: البناء الابتدائي ونظام الإنقاذ

## aliases
De novo purine synthesis
Purine salvage system
PRPP
Phosphoribosylamine
HGPRT
APRT
Sources of the atoms of the purine ring
Regulation of purine biosynthesis

## subject
fnd

## topic
Molecular biology

## subtopic
Biosynthesis of Purine Nucleotides

## microtopic
Biosynthesis of Purine Nucleotides

## nanotopic


## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T05

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
A cell gets its purine nucleotides two ways, and the whole chapter turns on the difference. De novo synthesis builds the ring atom by atom onto a ribose phosphate, drawing on five sources of which only three donate nitrogen, and it is expensive. Salvage takes a base the body has already made and returns it to the nucleotide pool in a single step, and in the brain and in red cell precursors it is the major route. One substrate, PRPP, feeds both, and it is where the pathway's brakes are set — which is why a defect in salvage raises uric acid from two directions at once.

## sections
### Definition
Dietary purines are not the source of the body's nucleotides. Nucleic acids in food, which are richest in liver and meat, are digested by pancreatic and intestinal nucleases to nucleotides, then to nucleosides, then to free bases and pentose-1-phosphate. Absorbed purines are oxidised in the liver to uric acid and excreted in the urine, and little or no dietary purine is incorporated into the body's own nucleic acids. Dietary nucleic acids and nucleotides are therefore not considered essential, because the human body can synthesise them endogenously.

Endogenous supply has two routes, and the book names them as the two halves of purine biosynthesis. **De novo synthesis** assembles the purine ring from small precursors onto a ribose phosphate. The **salvage system** re-attaches a ribose phosphate to a purine base that already exists. The first is how the ring comes into being; the second is how it is kept in circulation.

### Mechanism
De novo synthesis runs in six steps and the first three are the ones that are examined.

The hexose monophosphate pathway provides ribose-5-phosphate, and PRPP synthetase converts it to 5-phosphoribosyl-1-pyrophosphate, PRPP. This is not yet purine synthesis — PRPP is the shared substrate of de novo synthesis and of salvage both, which is what makes the two routes compete for it.

Then the ring begins. The amide group of glutamine is transferred onto PRPP to give 5-phosphoribosylamine, in a reaction catalysed by glutamine:PRPP amidotransferase, and the book calls this the key step in de novo purine nucleotide synthesis. It is the committed step: everything before it is shared chemistry, and everything after it is purine.

Atoms are then added to the amino group of phosphoribosylamine until the ring closes on the first purine, inosine monophosphate. The book's figure names five sources for the nine ring atoms: the amide group of glutamine, aspartate, glycine, respiratory CO2 and N10-formyl-THF. Only three of the five donate nitrogen — glutamine, aspartate and glycine — and glycine enters as an intact unit, contributing carbon as well as its nitrogen. The other two sources are carbon only.

IMP is a branch point rather than an end point. It goes on to GMP through XMP, and separately to AMP through adenylosuccinate. Nucleoside monophosphate kinase and nucleoside diphosphate kinase then raise these to the di- and triphosphates using ATP, and ribonucleotide reductase — an enzyme complex active only during DNA synthesis and inhibited mainly by dATP — reduces them to the deoxy forms when DNA is being made.

Salvage is the other half, and it is short. Its significance, in the book's own words, is to supply purine nucleotides to tissues where de novo synthesis is not active, and the two it names are the brain and the precursors of red blood cells. There are two systems. In the salvage of free purines the ribose phosphate of PRPP is transferred straight onto a base, releasing pyrophosphate: adenine phosphoribosyl transferase converts adenine to AMP, and hypoxanthine-guanine phosphoribosyl transferase converts hypoxanthine to IMP and guanine to GMP. Three bases, two enzymes. In the salvage of purine nucleosides, adenosine kinase phosphorylates adenosine to AMP and deoxyadenosine to dAMP, using ATP rather than PRPP — because a nucleoside already carries its ribose and needs only a phosphate, while a free base needs the whole ribose phosphate delivered to it.

### Key determinants
The book gives two controls, and they act at the same place.

The first is feedback. De novo purine nucleotide synthesis is the book's example of multiple-loops feedback inhibition: a high concentration of IMP, AMP, ADP, GMP and GDP produces feedback inhibition of the conversion of ribose-5-phosphate to IMP at two sites, PRPP synthetase and glutamine:PRPP amidotransferase. Read the list carefully, because the examiner does. It contains the branch-point nucleotide and the mono- and diphosphates of both branches; it does not contain the triphosphates, and GTP in particular is absent from it. Two sites rather than one is also deliberate: blocking only PRPP synthetase would leave the pathway open to PRPP arriving from elsewhere.

The second control is substrate availability. The rate of the glutamine:PRPP amidotransferase reaction is controlled by the intracellular concentration of PRPP and of glutamine. This is why the two routes are not independent of each other. Salvage consumes PRPP, so a cell salvaging briskly holds its PRPP pool down and its de novo synthesis low; a cell that cannot salvage leaves PRPP unconsumed, and de novo synthesis rises.

### Clinical significance
Folate supplies the C2 and C8 atoms of the purine ring. Folate antagonists such as methotrexate therefore inhibit purine and nucleic acid synthesis, which inhibits cell division — and that is the basis of their use in the treatment of some cancers. A pathway diagram is also a drug target map.

The tissues that live on salvage are the ones that suffer when it fails. Because the brain and red cell precursors depend on it, complete deficiency of hypoxanthine-guanine phosphoribosyl transferase — Lesch-Nyhan syndrome — is catastrophic there, and the neurological features of that disease sit alongside its hyperuricaemia rather than being explained by it. The hyperuricaemia itself has two mechanisms working at once, and this is the payoff of understanding PRPP as a shared substrate: bases that cannot be salvaged are oxidised to uric acid instead, and the PRPP that salvage would have consumed remains available to drive de novo synthesis. Less recycling and more manufacture, from one enzyme.

Partial deficiency of the same enzyme is one of the book's causes of primary metabolic gout, as are defects of PRPP synthetase in which the enzyme is superactive or resistant to feedback inhibition — the regulation described above, failing. Where those defects lead is the subject of the companion article.

### Common misconceptions
Glutamate is not glutamine. Glutamate collects amino acid nitrogen everywhere else in protein metabolism, so it is the name a student reaches for; but what is transferred here is the amide group of glutamine, and amide nitrogen and α-amino nitrogen are different chemistry.

Adenosine is not adenine. Adenine is a free base salvaged by adenine phosphoribosyl transferase using PRPP; adenosine is a nucleoside salvaged by adenosine kinase using ATP. The two arms need different enzymes for a structural reason, not a historical one.

A purine nucleotide is not automatically an inhibitor. The feedback list is closed, and GTP is not in it.

## published_summary


## published_sections


## hold_these
De novo synthesis builds the ring; salvage returns a base that already exists. Both spend PRPP.
Glutamine:PRPP amidotransferase converting PRPP to 5-phosphoribosylamine is the key step of de novo purine synthesis.
Five sources build the purine ring, and only glutamine, aspartate and glycine donate nitrogen.
Salvage is the major route in the brain and in red cell precursors, which is why HGPRT deficiency hurts the brain.
Three free bases are salvageable — adenine by APRT, hypoxanthine and guanine by HGPRT.
IMP, AMP, ADP, GMP and GDP inhibit at two sites: PRPP synthetase and glutamine:PRPP amidotransferase.

## lose_the_mark
Answering glutamate instead of glutamine as the nitrogen donor.
Leaving glycine off the list of nitrogen donors because it is remembered as a carbon source.
Putting adenosine kinase in the free-base arm of salvage, or adenine phosphoribosyl transferase in the nucleoside arm.
Naming only hypoxanthine and guanine as salvageable and forgetting that adenine has an enzyme of its own.
Adding GTP to the feedback inhibitor list because the other purine nucleotides are on it.

## related_concepts
CON-FND-265D369FD41B85 | CON-FND-DB8B4EFEB287DA | CON-FND-71EF720F840CA4

## related_articles
ART-103-BIO-URIC-ACID-AND-PURINE-DISORDERS: where the bases that are not salvaged go, and what a raised or lowered urate means
ART-103-BIO-GOUT-AND-HYPERURICAEMIA: the disease the failures of this pathway produce, already authored for the 2025 paper

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
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Biosynthesis of Purine Nucleotides

## university_notes
kau: The Biochemistry department's orientation for 2025-2026 cancels eleven items from the end-of-module and final exams. Nothing in the purines and pyrimidines chapter is on that list, and the department question book examines this material across six items on one page.

## annotations
### definition_of · CON-FND-265D369FD41B85
Quote: The book's figure names five sources for the nine ring atoms: the amide group of glutamine, aspartate, glycine, respiratory CO2 and N10-formyl-THF.
Block: body

### definition_of · CON-FND-DB8B4EFEB287DA
Quote: Its significance, in the book's own words, is to supply purine nucleotides to tissues where de novo synthesis is not active, and the two it names are the brain and the precursors of red blood cells.
Block: body

### definition_of · CON-FND-71EF720F840CA4
Quote: De novo purine nucleotide synthesis is the book's example of multiple-loops feedback inhibition: a high concentration of IMP, AMP, ADP, GMP and GDP produces feedback inhibition of the conversion of ribose-5-phosphate to IMP at two sites, PRPP synthetase and glutamine:PRPP amidotransferase.
Block: body

## media


## media_recommendations
### diagram · The nine atoms of the purine ring with their five sources labelled
Brief: The book's page 127 figure redrawn: the fused purine ring with all nine positions numbered, each atom joined by a leader line to its source — respiratory CO2 to C6, aspartate to N1, N10-formyl-THF to C2 and C8, glycine to N7-C4-C5 shown as one bracketed unit, and the amide group of glutamine to N3 and N9 — with the three nitrogen donors picked out from the two carbon-only sources
Purpose: Teaches CON-FND-265D369FD41B85. The question asks which sources donate nitrogen, and that is a fact about positions on a ring; prose has to assert the mapping where the figure lets a student read it off, and the cached page text of the department's own figure is partly garbled.
Priority: required
Status: needed
Section: Mechanism
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### comparison table · The two arms of purine salvage side by side
Brief: A four-column table — substrate, enzyme, phosphate donor, product — with three free-base rows (adenine / APRT / PRPP / AMP; hypoxanthine / HGPRT / PRPP / IMP; guanine / HGPRT / PRPP / GMP) and two nucleoside rows (adenosine / adenosine kinase / ATP / AMP; deoxyadenosine / adenosine kinase / ATP / dAMP)
Purpose: Teaches CON-FND-DB8B4EFEB287DA. Four of the six examined items on this page turn on telling the two arms apart by enzyme and phosphate donor, and a student who has read them as two separate diagrams never sees the one distinction that answers all four.
Priority: strongly helpful
Status: needed
Section: Mechanism
Kind: comparison table
Source direction: original table built from the department book's own two salvage schemes
Rights: original work

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter IX "Metabolism of Purines and Pyrimidines", PDF pages 126 to 128 (printed 124 to 126).
The 391-item department question book (src_07f0a0ff41addf826c7f), chapter Metabolism Of Purines And Pyrimidines, PDF pages 142 to 143, establishes which of this material is examined and how. It is cited as curriculum signal only, never as evidence that a statement is medically true.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The atom-by-atom map of the purine ring is carried by a figure rather than by prose; only N9 is assigned to glutamine's amide group in a sentence. A reviewer with the printed page should confirm the remaining positions.
The salvage reactions are printed as schemes, not sentences, so the enzyme, substrate and product of each step are read off the diagrams; the significance sentence is the only prose the section carries.
The book states the five feedback inhibitors and the two sites without saying whether the inhibition is allosteric or competitive, and without giving any concentration at which it operates.
The branch-specific allosteric inhibitors the question book examines — AMP on adenylosuccinate synthetase and GMP on IMP dehydrogenase — are not in this department textbook at all. They are deliberately not taught here as its content.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Written to carry the six purine biosynthesis MCQs on PDF pages 142 and 143 of the department question book, and to give the three concepts minted for them a home. TPL-CONCEPT rather than TPL-CONDITION because the subject is a pathway and its regulation, not a disease. The catabolic half of the same book chapter is a separate article because it carries the reference ranges and every disorder, which is a different kind of material and a different set of questions. Gout itself is deliberately not taught here — ART-103-BIO-GOUT-AND-HYPERURICAEMIA already holds it.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T06 for this material; the book's own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
questionIds: The six MCQs that test this article are authored in ../question/103-BMS-MCQ-protein-heme.md and name this article in their library_ids. The back-reference is owed and is listed in the hand-off report; the field is written as a deliberate empty list rather than filled with IDs before that file is applied.
claimIds: Deliberately empty. The evidence chain — claims, citations and spans — is a separate scope that this batch does not author, and no live claim asserts anything in this article. Naming an ID that does not exist would be worse than an honest empty list.
spanIds: Deliberately empty for the same reason. A span binds one sentence to the claims that support it, so it cannot be authored before the claims are.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book's own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-URIC-ACID-AND-PURINE-DISORDERS

## title
Uric acid and the disorders of purine metabolism: which way the urate moves

## arabic_title
حمض البوليك واضطرابات أيض البيورين

## aliases
Catabolism of purine nucleotides
Uric acid
Plasma urate reference range
Hyperuricaemia
Hypouricemia
Causes of gout
Xanthine oxidase
Adenosine deaminase deficiency
SCID

## subject
renal

## topic
Molecular biology

## subtopic
Disorders of Purine Metabolism

## microtopic
Catabolism of Purine Nucleotides

## nanotopic


## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-REN-T06 | SYS-MSK-T04

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
Purine catabolism ends in one molecule, uric acid, and almost every question in this half of the chapter is really asking which way it has moved. A raised urate is hyperuricaemia and its causes divide cleanly into two — too much made, or too little excreted. A lowered urate is hypouricaemia, and its causes are blocks in the catabolic route before uric acid can be formed. Reading a purine enzyme defect correctly means asking that one question first, because the three most severe defects in the chapter point in different directions: HGPRT deficiency raises urate and damages the brain, and adenosine deaminase deficiency lowers it and destroys the immune system.

## sections
### Definition
Uric acid is the main end product of purine catabolism in the human liver. The route to it is a short cascade shared by both purine nucleotides. AMP and GMP are stripped of their phosphate by nucleotidases to adenosine and guanosine. Adenosine deaminase converts adenosine to inosine, releasing ammonia. Purine nucleoside phosphorylase then removes the ribose from inosine to give hypoxanthine and from guanosine to give guanine, and guanase converts guanine to xanthine, again releasing ammonia. The last two oxidations belong to a single enzyme: xanthine oxidase converts hypoxanthine to xanthine, and xanthine to uric acid.

That the final two steps share one enzyme is the fact the whole chapter hangs on. Inhibit xanthine oxidase and urate falls; lose it and urate falls further; everything upstream that raises the flow of bases into it raises urate instead.

### Normal values
Plasma uric acid, or urate, is 4–7 mg/dL for males and 3–6 mg/dL for females during fasting. In normal adult humans the daily excretion of uric acid is about 400–600 mg.

One further number belongs with those two, because it governs what happens to the uric acid once it is in the urine. Urate salts are more soluble than uric acid itself, so the pH of the urine influences the solubility of uric acid: urine at pH 5 can dissolve only about one tenth as much as urine at pH 7. Alkalinisation of the urine therefore markedly increases the solubility of uric acid. The three figures are one clinical argument rather than three facts — the range says when urate is high, the excretion figure says how much has to leave each day, and the pH figure says whether what leaves stays dissolved on the way out.

### Mechanism
Hyperuricaemia, an elevated serum urate, results from overproduction — the book calls this metabolic — or from decreased excretion, which it calls renal. Gout is the disease that follows: a painful inflammation in one or more joints, characterised by deposits of nodular masses of uric acid crystals, the tophi, in soft-tissue areas of the body, and by precipitation of urates in the urinary tract as renal stones. The disease itself is taught in the companion article; what this section carries is the list of what causes it.

**Overproduction.** The dietary cause is excess intake of a nucleoprotein-rich diet — meat, liver and kidney. Primary metabolic gout is genetic, and the book gives four entries: defects of PRPP synthetase, in which the enzyme is either superactive or resistant to feedback inhibition; partial deficiency of HGPRT of the purine salvage system; Lesch-Nyhan syndrome, which is complete deficiency of the same enzyme; and Von Gierke's disease, glucose-6-phosphatase deficiency, in which purine synthesis and degradation are enhanced and uric acid excretion is decreased. Secondary metabolic gout is due to diseases that increase purine catabolism, such as cancer, leukaemia and psoriasis.

**Decreased excretion — renal gout.** Primary renal gout is due to primary or congenital renal disease; secondary renal gout to acquired renal disease. Alcohol belongs here and not with the dietary causes, by a mechanism the companion article carries in full: oxidising ethanol raises NADH, the raised ratio drives lactate formation, and lactate outcompetes uric acid for the transporter they share in the renal tubules.

**The other direction.** Hypouricaemia is the mirror image, and every cause of it is a block in the same cascade before uric acid can be formed. The department textbook names one: adenosine deaminase deficiency. The department question book's printed key names another: xanthine oxidase deficiency, which removes the final two oxidations so that uric acid cannot be made at all, and the more soluble hypoxanthine and xanthine are excreted instead. Both genuinely lower plasma urate. The two departmental sources are recorded here as disagreeing rather than reconciled, because a student who has learned the textbook sentence will look for adenosine deaminase in an option list and not find it.

### Key determinants
The question to ask of any purine enzyme defect is which way it moves urate, and the answer is set by where in the cascade the block sits.

A block **downstream**, at xanthine oxidase, prevents uric acid being made and lowers urate. A block **upstream**, at adenosine deaminase or purine nucleoside phosphorylase, prevents bases reaching xanthine oxidase and lowers urate too — but it also causes a substrate to pile up behind it, and that accumulation is what does the damage. A block in **salvage**, at HGPRT, sends bases into the catabolic route that would otherwise have been recycled, and simultaneously spares the PRPP those salvage reactions would have consumed, so de novo synthesis rises. Urate goes up from both ends.

That is the whole logic, and it explains the pairing that a question can be built on: an enzyme block that a drug is designed to imitate cannot be a cause of the disease that drug treats.

### Clinical significance
Lesch-Nyhan syndrome is the severe end of the overproduction branch, and its features are not all explained by urate. The dystonia, the developmental delay and the self-injurious behaviour follow from the brain's dependence on salvage for its purine nucleotides, which is a supply failure rather than a crystal deposition; the hyperuricaemia sits alongside them.

Adenosine deaminase deficiency is the severe end of the other branch. The enzyme's absence leaves high levels of dATP, which inhibit ribonucleotide reductase, which inhibits DNA synthesis. White blood cells therefore cannot proliferate, T-cell and B-cell function is impaired, and the condition is associated with severe combined immunodeficiency. A purine question with an immunology answer is not a mistake in the paper — it is this.

Treatment of gout follows the same two directions the causes did, and the book is careful about how far it goes. Diet comes first: restriction of nucleoprotein-rich foods, with non-cellular proteins such as milk and its products preferred; adequate fluid intake to reduce the risk of stone formation; and avoidance of alcohol. Then three groups of drugs. Anti-inflammatory agents decrease joint inflammation and relieve pain, and do nothing to urate. Drugs decreasing the production of uric acid, of which allopurinol is the drug of choice — it resembles hypoxanthine closely enough that xanthine oxidase oxidises it to oxypurinol, and oxypurinol then binds tightly to the enzyme, so hypoxanthine and xanthine can no longer be oxidised and less uric acid is formed; allopurinol also reacts with PRPP, lowering the PRPP pool and so decreasing de novo purine synthesis. And drugs increasing the excretion of uric acid, the uricosuric drugs, which the book heads as a class and leaves without a named member, adding only that they must be taken with plenty of fluid accompanied by alkalinisation of the urine to prevent the formation of renal stones. No member of that class is named here, because the department book names none and neither does the examiner's model answer; a student answering this paper is expected to name the class and its precaution, not a drug.

### Common misconceptions
That a purine enzyme defect must mean gout. Three of the defects in this chapter lower urate.

That hyperuricaemia and gout are the same word. A raised urate is a laboratory finding; gout is the inflamed joint and the tophi that go with it.

That alkalinising the urine lowers the uric acid. It changes only whether what is excreted stays in solution; production and plasma level are untouched.

That Von Gierke's disease is a cause of decreased excretion because the book's sentence ends with excretion. The book lists it under increased production, and it does both.

## published_summary


## published_sections


## hold_these
Uric acid is the main end product of purine catabolism in the human liver, and xanthine oxidase makes the last two steps of it.
Plasma urate is 4–7 mg/dL in males and 3–6 mg/dL in females during fasting; daily excretion is about 400–600 mg.
Urine at pH 5 dissolves about one tenth as much uric acid as urine at pH 7.
Hyperuricaemia is either overproduction (metabolic) or decreased excretion (renal). There is no third mechanism.
A block before uric acid is formed lowers urate; a block in salvage raises it from two directions at once.
Adenosine deaminase deficiency raises dATP, inhibits ribonucleotide reductase, stops DNA synthesis and gives severe combined immunodeficiency.
The book names allopurinol and heads the uricosuric class without naming a member of it.

## lose_the_mark
Calling xanthine oxidase deficiency a cause of gout. It is the block allopurinol imitates, and it lowers urate.
Quoting one plasma urate range for both sexes, so that 6.5 mg/dL is read as normal in a woman.
Filing Von Gierke's disease under decreased excretion because the book's sentence ends with excretion.
Answering HGPRT for the immune defect. HGPRT deficiency damages the brain and raises urate; adenosine deaminase deficiency damages the immune system and lowers it.
Naming a uricosuric drug in an answer. The department book names none, and neither does the model answer.

## related_concepts
CON-REN-4AAF042ABFB67E | CON-REN-D940C9B3140A40 | CON-REN-BE40BFF23F3E76 | CON-IMM-10470076F1AF95

## related_articles
ART-103-BIO-PURINE-SYNTHESIS-AND-SALVAGE: where the bases come from, and why failed salvage raises urate twice over
ART-103-BIO-GOUT-AND-HYPERURICAEMIA: gout itself — the diagnosis, the tophi, the alcohol mechanism and allopurinol, already authored for the 2025 paper

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-BC10B143AC03 | CLM-D107D2066B36 | CLM-E9632946C53D

## span_ids
SPN-BIO-URIC-ACID-AND-01 | SPN-BIO-URIC-ACID-AND-02 | SPN-BIO-URIC-ACID-AND-03

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Catabolism of Purine Nucleotides
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Disorders of Purine Metabolism

## university_notes
kau: The Biochemistry department's orientation for 2025-2026 cancels eleven items from the end-of-module and final exams. Nothing in the purines and pyrimidines chapter is on that list. The 2025 end-of-year paper set gout as Case (2), which is why the disease itself is taught in a separate article and this one carries the reference ranges and the classification.

## annotations
### definition_of · CON-REN-4AAF042ABFB67E
Quote: Plasma uric acid, or urate, is 4–7 mg/dL for males and 3–6 mg/dL for females during fasting.
Block: body

### definition_of · CON-REN-D940C9B3140A40
Quote: Hyperuricaemia, an elevated serum urate, results from overproduction — the book calls this metabolic — or from decreased excretion, which it calls renal.
Block: body

### definition_of · CON-REN-BE40BFF23F3E76
Quote: Hypouricaemia is the mirror image, and every cause of it is a block in the same cascade before uric acid can be formed.
Block: body

### definition_of · CON-IMM-10470076F1AF95
Quote: The enzyme's absence leaves high levels of dATP, which inhibit ribonucleotide reductase, which inhibits DNA synthesis.
Block: body

## media


## media_recommendations
### diagram · The purine catabolic cascade with the two xanthine oxidase steps marked
Brief: The book's page 129 scheme redrawn: AMP and GMP in two parallel columns down to adenosine and guanosine, adenosine deaminase to inosine, purine nucleoside phosphorylase to hypoxanthine and to guanine, guanase to xanthine, and the two xanthine oxidase arrows converging on uric acid — with the point of allopurinol inhibition marked on both xanthine oxidase steps and each named enzyme deficiency flagged beside the reaction it blocks
Purpose: Teaches CON-REN-BE40BFF23F3E76 and CON-REN-D940C9B3140A40. Whether a defect raises or lowers urate is a fact about position in a cascade, and a student reading the enzymes as a list cannot see that adenosine deaminase and xanthine oxidase sit on the same line while HGPRT sits off it.
Priority: required
Status: needed
Section: Mechanism
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### comparison table · Which way does the urate move
Brief: One column per named disorder — dietary excess, PRPP synthetase defect, partial HGPRT deficiency, Lesch-Nyhan, Von Gierke's, cancer and leukaemia and psoriasis, congenital and acquired renal disease, alcohol, xanthine oxidase deficiency, adenosine deaminase deficiency — against three rows: direction of plasma urate, the book's mechanism in one clause, and the organ damaged if any
Purpose: Teaches CON-REN-D940C9B3140A40. Two of the examined items are "which cannot cause gout" and "hypouricaemia occurs in", and both are answerable only by holding the whole list with its directions at once; prose forces a student to reconstruct the grid from three separate paragraphs.
Priority: strongly helpful
Status: needed
Section: Key determinants
Kind: comparison table
Source direction: original table built from the department book's own cause lists
Rights: original work

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter IX "Metabolism of Purines and Pyrimidines", PDF pages 129 to 131 (printed 127 to 129).
The 391-item department question book (src_07f0a0ff41addf826c7f), chapter Metabolism Of Purines And Pyrimidines, PDF pages 143 to 144, establishes which of this material is examined and how. It is cited as curriculum signal only, never as evidence that a statement is medically true, and on hypouricaemia it disagrees with the textbook.

## evidence_gaps
Every statement rests on one source, the department book, except where the text says otherwise. No independent verification against an international biochemistry reference has been attached.
The book gives no reason for the sex difference in the plasma urate range, no age dependence, and no separate figure for the postmenopausal woman. No local Egyptian laboratory reference interval has been attached, and the reference range must not be published against an international one without it.
The book never names a xanthine oxidase deficiency as an entity. That it lowers urate and therefore cannot cause gout is inferred from the book's own catabolic scheme and from its account of allopurinol; the question book's key is curriculum signal, not evidence.
Purine nucleoside phosphorylase deficiency as a cause of immune dysfunction is in the question book's key and not in this textbook. It is named in this article only as the question book's addition and is not taught as the department's content.
The book does not spell out the step between adenosine deaminase deficiency and dATP — that deoxyadenosine is spared and phosphorylated — and gives no age of onset, inheritance pattern or treatment for the condition.
The book names no member of the uricosuric class, and none is supplied here from any other source. The class, its purpose and its fluid-and-alkalinisation precaution are all this article asserts about it.

## conflicts
Hypouricaemia: the department textbook states it "is caused mainly by adenosine deaminase (ADA) deficiency" and names no other cause, while the department question book's printed key for the same question gives xanthine oxidase deficiency and does not offer adenosine deaminase among its options. Both enzyme blocks genuinely lower plasma urate; which the faculty expects is not settled by either document, and the article teaches both positions rather than choosing one.

## last_reviewed


## review_due


## notes
Written to carry the purine catabolism and disorders MCQs on PDF pages 143 and 144 of the department question book, and to give the four concepts minted for them a home. TPL-CONCEPT with the optional Normal values section, because the reference ranges are examined as a unit with the pH-dependence of urate solubility. Gout as a disease is deliberately not taught here: ART-103-BIO-GOUT-AND-HYPERURICAEMIA already carries the diagnosis, the tophi, the alcohol and lactate mechanism and allopurinol, all authored from the 2025 end-of-year paper, and the conflict between that paper's "tophi in urine" and the book's soft-tissue account is recorded on CON-REN-31708150F8B722 and is not repeated here. The uricosuric class is named as a class only; that restriction is deliberate and is the book's own.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T06 for this material; the book's own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
questionIds: The MCQs that test this article are authored in ../question/103-BMS-MCQ-protein-heme.md and name this article in their library_ids. The back-reference is owed and is listed in the hand-off report; the field is written as a deliberate empty list rather than filled with IDs before that file is applied.
claimIds: Deliberately empty. The evidence chain — claims, citations and spans — is a separate scope that this batch does not author, and an article whose hypouricaemia section rests on two disagreeing departmental sources should not be given a claim before a reviewer settles which one the department teaches.
spanIds: Deliberately empty for the same reason. A span binds one sentence to the claims that support it, so it cannot be authored before the claims are.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book's own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
publishedSummary: Nothing is published yet, and this article must not be published while the hypouricaemia conflict is open.
publishedSections: Nothing is published yet, for the same reason.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
