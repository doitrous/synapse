<!--
  103 BMS · Biochemistry · the three library articles that teach the nine
  concepts the Metabolism Of Heme MCQs test.

    ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA  → 3 concepts
    ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN    → 4
    ART-103-BIO-HYPERBILIRUBINAEMIA-SYNDROMES    → 2

  THE THREE IDS WERE NOT CHOSEN HERE. Nine finished questions in
  ../question/103-BMS-MCQ-protein-heme.md already name these three articles in
  their library_ids, and each names one of the nine concepts in main_concept. A
  question's library_ids must resolve to an article whose related_concepts lists
  that question's main_concept, so the three articles and the nine concepts in
  ../concept/103-BMS-mcq-heme-concepts.md are written to match, in both
  directions.

  THE FIRST ARTICLE IS ENTIRELY CANCELLED MATERIAL. The Biochemistry
  department's orientation for 2025-2026 cancels "Biosynthesis of heme &
  Porphyria (pp115-118)" from both the end-of-module and the final exam, and
  that is the whole of ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA. It is
  written anyway, because the question book still sets six items on it and a
  student who meets one needs somewhere to read — but it is marked
  Supplementary rather than Core, its cancellation is stated in
  university_notes and in notes, and the three concepts it teaches carry
  blueprint_weight 0.05 with weight_confidence 0.2 so that nothing in the batch
  claims the topic is examined. Heme catabolism, blood bilirubin and jaundice,
  printed pages 119 to 123, are NOT cancelled; those two articles are Core.

  NOTHING HERE DUPLICATES THE JAUNDICE ARTICLE ALREADY AUTHORED.
  ART-103-BIO-JAUNDICE-AND-BILIRUBIN in ./103-BMS-biochemistry.md was written
  from the 2025 end-of-year paper's Case (3) and owns the three-way
  classification of jaundice and the clay-stool-and-dark-urine picture. This
  batch writes no second classification. The third article here is about the
  two named syndromes the question book asks and that article does not
  cover — Crigler-Najjar type I and physiological neonatal jaundice — and it
  cross-references the existing article rather than restating it.

  ALL PROSE IS FROM ONE BOOK: src_300847a5fa64809d6c07, Dpt book Biochemistry
  103.pdf, chapter "VIII- METABOLISM OF HEME", printed pages 115 to 123.
  Nothing is asserted that the book does not say, and where the book is silent
  the article says so in the text and in evidence_gaps. The department question
  book (src_07f0a0ff41addf826c7f) establishes what is examined and is never
  cited as evidence that something is true.

  WHAT THE BOOK CANNOT SUPPORT. It teaches Gilbert syndrome and does not
  describe Crigler-Najjar at all; the third article says so in its own prose
  rather than passing the question book's content off as the textbook's. It
  also gives no enzyme change for haemolytic jaundice — its summary table on
  printed page 123 leaves that cell blank rather than writing "normal" — and
  nothing here fills it.

  EVIDENCE. claim_ids and span_ids are deliberately empty on all three
  articles. The evidence chain for this batch is a separate scope and no claim,
  citation or span file is authored beside it; inventing IDs to fill the
  columns is forbidden and attaching a neighbouring concept's live claim would
  be a near-miss binding. Each is recorded in field_notes and in evidence_gaps
  and is owed before any of these articles can be published.

  MEDIA. Six assets are requested across the three articles and none is
  supplied; this repository holds no medical images. No URL is invented
  anywhere, and `## media` is present and deliberately empty rather than
  written as [clear], which would parse as a media block with no URL and be
  reported as one that would be dropped.

  Import: Admin › Bulk import → article. Articles land before concepts.
-->

# Item

## id
ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA

## title
Haem biosynthesis and the porphyrias

## arabic_title
تخليق الهيم والبورفيريا

## aliases
Biosynthesis of heme
Heme synthesis
Porphyrias
Acute intermittent porphyria
Porphyria cutanea tarda
ALA synthase
Lead poisoning and heme

## subject
haem

## topic
Clinical biochemistry

## subtopic
Biosynthesis of Heme

## microtopic
Porphyrias

## nanotopic


## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-HEM-T01-S01 | SYS-DER-T01

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

## summary
Haem is built in eight steps from two very ordinary starting materials, glycine and succinyl-CoA, and almost everything worth knowing about the pathway is a statement about place. The two organs that make most of it are the two that need most of it. Inside the cell the pathway starts in the mitochondrion, moves to the cytosol, and returns to the mitochondrion for the last three steps — which is why a mature red cell, having lost its mitochondria, cannot make haem at all. And where a block falls decides what the patient looks like: before the porphyrinogen ring closes and the small neurotoxic precursors accumulate, after it closes and light-absorbing rings accumulate in the skin. Lead manages to block at both ends at once. This whole topic is cancelled from both of this year's examinations; it is here because the question book still asks it.

## sections
### Definition
Haem is the iron-porphyrin prosthetic group of haemoglobin, of myoglobin and of the cytochromes, and the body makes it rather than absorbing it. The department book treats its synthesis as a question of site before it treats it as a question of chemistry, and the site has two levels.

The major sites of heme biosynthesis are the erythrocyte-producing cells of the bone marrow, which are active in haemoglobin synthesis, and the liver, which synthesises several haem proteins and cytochrome P450 in particular. Those two organs are not an arbitrary pair: the marrow needs haem to fill new red cells, and the liver needs it to build the drug-metabolising cytochromes, and the two demands behave quite differently. Marrow synthesis is geared to erythropoiesis and is comparatively steady. Hepatic synthesis has to respond quickly, because cytochrome P450 is induced whenever the liver meets a new drug load — which is the mechanism behind the acute porphyric attack described later in this article.

The intracellular site is split. The initial reaction and the last three steps occur in mitochondria, and the intermediate steps of the biosynthetic pathway occur in the cytosol. That split has one consequence a student should be able to reach unaided: a mature erythrocyte has no mitochondria, so it cannot perform step 1 or steps 6, 7 and 8, and it cannot make haem. The cells that do are the nucleated precursors in the marrow. This is the same anatomical fact that leaves the mature red cell dependent on glycolysis for all of its ATP.

### Mechanism
The pathway runs in eight numbered steps, and it is worth reading them as three mitochondrial ones bracketing four cytosolic ones.

Step 1, in the mitochondrion, is the formation of δ-aminolevulinate by condensation of glycine and succinyl-CoA. The enzyme is δ-aminolevulinate synthase — ALA synthase — which is the key regulatory enzyme of the whole pathway and needs pyridoxal phosphate as its coenzyme.

Step 2, in the cytosol, condenses two molecules of ALA into porphobilinogen, by δ-aminolevulinate dehydratase. Step 3 condenses four molecules of porphobilinogen into the linear tetrapyrrole hydroxymethylbilane, by uroporphyrinogen I synthase. Step 4 cyclises hydroxymethylbilane by removing water to give uroporphyrinogen III, in the presence of uroporphyrinogen III synthase — this is the step at which the ring closes, and the article returns to it. Step 5 decarboxylates the four acetate side chains to four methyl groups, by uroporphyrinogen decarboxylase, giving coproporphyrinogen III.

Steps 6, 7 and 8 are back in the mitochondrion. Coproporphyrinogen oxidase converts two propionate side chains into vinyl groups to give protoporphyrinogen IX; protoporphyrinogen oxidase oxidises that to protoporphyrin IX; and finally ferrochelatase, also called haem synthase, inserts ferrous iron into the centre of the protoporphyrin ring to form haem.

### Key determinants
Two things control the pathway and one thing poisons it.

Control is exercised almost entirely at step 1. ALA synthase is allosterically inhibited by haem, the end product, and haem also represses the synthesis of the enzyme itself — so the pathway is regulated both on the minute scale and on the scale of protein turnover. That is end-product feedback inhibition working at two levels on the same enzyme.

In the opposite direction, many drugs induce ALA synthase and can precipitate acute attacks of porphyria; the book names barbiturates, oestrogens and sulfonamides. The connection to the liver made in the Definition is the reason: these are cytochrome P450 inducers, the liver responds by demanding more haem, and ALA synthase is what it turns up.

The poison is lead, and it is unusual in blocking at both ends of the pathway at once. In lead poisoning, lead inhibits ALA dehydratase and ferrochelatase enzymes. ALA dehydratase is step 2, so blocking it backs up ALA behind the second reaction; ferrochelatase is step 8, so blocking it leaves protoporphyrin IX unable to accept its iron. The book states this twice — once in the text of step 8 and once as a note of its own — and states nothing else about lead. The clinical corollary usually taught alongside it, that the resulting anaemia is microcytic and does not respond to iron, follows from a cell that divides normally but cannot fill itself with haemoglobin; it is standard haematology rather than this book's word, and it is flagged as such.

### Clinical significance
Porphyrias are caused by inherited, or occasionally acquired, defects in haem synthesis, resulting in the accumulation of porphyrins or porphyrin precursors in the tissues and their increased excretion in urine. They produce two clinical pictures, and the division between them is not arbitrary — it maps onto where the block sits relative to step 4, the closure of the porphyrinogen ring.

Neuropsychiatric manifestations are characterized by the accumulation of ALA or PBG, as a result of relative or absolute inhibition of the enzyme uroporphyrinogen I synthase together with increased activity of the enzyme ALA synthase. ALA and porphobilinogen are neurotoxic — they decrease ATPase activity in nerve cells — and they injure sympathetic nerves, giving abdominal pain, and somatic nerves, giving peripheral neuritis, skeletal muscle paralysis and neuropsychiatric symptoms. The book's example is acute intermittent porphyria, a uroporphyrinogen I synthase deficiency.

Photosensitivity is the other picture. Any enzyme defect after the synthesis of the porphyrinogen ring will lead to the accumulation of porphyrins in the skin. Porphyrins absorb light particularly at a wavelength of about 400 nm; the absorbed energy activates them to release free radicals, which damage lysosomes, and the lysosomal enzymes released destroy skin cells — so exposure to light produces skin damage and scarring. The book's example is porphyria cutanea tarda, a uroporphyrinogen decarboxylase deficiency.

One rule therefore answers the whole family: ask whether the accumulating molecule is a small linear precursor or a closed ring. Uroporphyrinogen III, coproporphyrinogen III and protoporphyrinogen are all rings, so all three belong to the photosensitive group, and none of them causes the neuropsychiatric picture.

A word on why this article is marked Supplementary. The department orientation for 2025-2026 cancels "Biosynthesis of heme & Porphyria (pp115-118)" from both the end-of-module and the final examination — the whole of this article. It is written because the department question book still sets six items on this material and a student meeting one needs somewhere to read it. Nothing in this batch weights any of it as examined.

## published_summary


## published_sections


## hold_these
The major sites of haem biosynthesis are the erythrocyte-producing cells of the bone marrow and the liver.
The initial reaction and the last three steps are mitochondrial; the intermediate steps are cytosolic — so a mature red cell cannot make haem.
ALA synthase is the key regulatory enzyme, needs pyridoxal phosphate, and is inhibited and repressed by haem.
Barbiturates, oestrogens and sulfonamides induce ALA synthase and can precipitate an acute porphyric attack.
Lead inhibits two enzymes at opposite ends of the pathway: ALA dehydratase and ferrochelatase.
A block before the porphyrinogen ring closes accumulates ALA and PBG and gives neuropsychiatric disease; a block after it closes accumulates porphyrinogens in skin and gives photosensitivity.
Acute intermittent porphyria is uroporphyrinogen I synthase deficiency; porphyria cutanea tarda is uroporphyrinogen decarboxylase deficiency.

## lose_the_mark
Answering "liver and kidney" for the sites of haem synthesis — that pair is the site of L-amino acid oxidase.
Naming mature red blood cells as a site, when it is the nucleated marrow precursors that still have mitochondria.
Naming a closed ring — uroporphyrinogen III, coproporphyrinogen III, protoporphyrinogen — as the accumulating molecule in neuropsychiatric porphyria.
Expecting lead-poisoning anaemia to respond to iron, when it is the enzyme that inserts iron that is poisoned.
Calling the anaemia of lead poisoning megaloblastic; interference with haem synthesis gives a microcytic picture.

## callout_evidence


## related_concepts
CON-HEM-3D75438A839FBD | CON-HEM-66B1DEEC8ED961 | CON-HEM-4C0C6A97CA8788

## related_articles
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN: what happens to the haem this article builds, once the red cell carrying it reaches the end of its 120 days

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
103 BMS > Biochemistry > Heme Metabolism > Biosynthesis of Heme
103 BMS > Biochemistry > Heme Metabolism > Porphyrias

## university_notes
kau: The Biochemistry department's orientation for 2025-2026 cancels "Biosynthesis of heme & Porphyria (pp115-118)" from both the end-of-module and the final examination. That is the whole of this article. It is kept because the department question book still sets six items on the material, but no record in this batch weights any of it as examined.

## annotations
### definition_of · CON-HEM-3D75438A839FBD
Quote: The major sites of heme biosynthesis are the erythrocyte-producing cells of the bone marrow, which are active in haemoglobin synthesis, and the liver, which synthesises several haem proteins and cytochrome P450 in particular.
Block: body

### definition_of · CON-HEM-66B1DEEC8ED961
Quote: Neuropsychiatric manifestations are characterized by the accumulation of ALA or PBG, as a result of relative or absolute inhibition of the enzyme uroporphyrinogen I synthase together with increased activity of the enzyme ALA synthase.
Block: body

### definition_of · CON-HEM-4C0C6A97CA8788
Quote: In lead poisoning, lead inhibits ALA dehydratase and ferrochelatase enzymes.
Block: body

## media


## media_recommendations
### diagram · The eight steps of haem biosynthesis, drawn across the mitochondrial and cytosolic compartments
Brief: The book's printed page 117 figure redrawn: glycine and succinyl-CoA entering top right inside a mitochondrial boundary, ALA leaving to the cytosol, steps 2 to 5 in the cytosol, re-entry for steps 6 to 8, and haem at top left. Both lead inhibition arrows marked with a minus sign, at ALA dehydratase and at ferrochelatase.
Purpose: Teaches CON-HEM-3D75438A839FBD and CON-HEM-4C0C6A97CA8788. The whole of the intracellular-site concept is a statement about which side of a membrane each step is on, and prose can assert the split but cannot show a student the two crossings. The two lead blocks are only legible as "both ends" when the ends are drawn.
Priority: required
Status: needed
Section: Mechanism
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### flowchart · Where the block falls decides the porphyria
Brief: The book's page 118 flowchart redrawn: one box "abnormality of the enzymes of heme synthesis" splitting into two columns — left, accumulation of ALA and PBG leading to neuropsychiatric signs and symptoms; right, accumulation of porphyrinogens in skin and tissues, then spontaneous oxidation to porphyrins, then photosensitivity — with the porphyrinogen ring-closure step marked as the fork.
Purpose: Teaches CON-HEM-66B1DEEC8ED961. The concept is a branch point, and a branch drawn as a branch is retained where the same content read as two paragraphs is memorised as two unconnected lists.
Priority: required
Status: needed
Section: Clinical significance
Kind: flowchart
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter "VIII- METABOLISM OF HEME", printed pages 115 to 118 — BIOSYNTHESIS OF HEME and PORPHYRIAS.
The 391-item department question book (src_07f0a0ff41addf826c7f) establishes which of this material is asked and how, and is cited as curriculum signal only, never as evidence that a statement is medically true.
The Biochemistry department's cancelled-items orientation for 2025-2026 establishes that this material is examined in neither sitting, and is the basis for the Supplementary marking.

## evidence_gaps
No claim, citation or span is authored for this article; claim_ids and span_ids are deliberately empty and the evidence chain is owed before publication.
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book states that lead inhibits ALA dehydratase and ferrochelatase and says nothing further about lead poisoning — no blood lead threshold, no red cell morphology, no treatment. The microcytic, iron-unresponsive anaemia named in the Key determinants section is standard haematology and is not this book's word.
The book names two example porphyrias and does not list the rest, so the Clinical significance section states a rule and two instances, not a classification.
The book gives no figure for daily haem synthesis, although it gives one for daily turnover in the catabolism chapter.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Written to carry the six Metabolism Of Heme MCQs that fall on printed pages 115 to 118 of the department book. TPL-CONCEPT rather than TPL-CONDITION because the subject is a pathway and a rule about where blocks fall, not a disease. Marked Supplementary rather than Core because the department orientation cancels the whole of it from both examinations — the manual's high_yield scale is the field that carries "worth reading, not worth revising for this sitting", and using it here keeps the cancellation visible to a student without deleting material the question book still sets. Heme catabolism and the bilirubin syndromes are separate articles and are not cancelled.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T07 for this material; the book's own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
questionIds: The six MCQs that test this article are authored in ../question/103-BMS-MCQ-protein-heme.md and already name this article in their library_ids. The back-reference is owed and is listed in the hand-off report; it is left empty rather than filled with IDs before that file is applied.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book's own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
calloutEvidence: Present and deliberately empty. Every hold_these and lose_the_mark line above would be gated on a claim, and no claim is authored for this batch — see claimIds.
claimIds: Deliberately empty. The evidence chain for this batch is a separate scope; no claim file is authored beside it, inventing claim IDs is forbidden, and binding a neighbouring concept's live claim to these statements would be a near-miss attachment made to clear a validator.
spanIds: Deliberately empty for the same reason. A span ties one sentence to the claims that support it, so it cannot be authored before the claims are.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN

## title
Haem catabolism and bilirubin: three sites, one conjugation, and what reaches the stool

## arabic_title
هدم الهيم والبيليروبين

## aliases
Heme catabolism
Bilirubin metabolism
Blood bilirubin
Conjugated and unconjugated bilirubin
Cholebilirubin
Hemobilirubin
Stercobilinogen
Urobilinogen
Van den Bergh reaction

## subject
haem

## topic
Clinical biochemistry

## subtopic
Heme Catabolism

## microtopic
Blood Bilirubin

## nanotopic


## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-HEM-T01-S01 | SYS-GIT-T06

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
Six grams of haemoglobin turn over every day, and every gram yields about 35 mg of bilirubin. Following that pigment is the whole of this chapter, and it is easiest to follow as a journey through three places rather than as a list of reactions: the reticuloendothelial system makes bilirubin, the liver makes it excretable, and the intestine turns it into the pigment that colours stool. One chemical event separates the beginning of that journey from its end — the attachment of glucuronic acid — and every property that distinguishes the two forms of bilirubin follows from it. The kidney handles the products and is not part of the pathway.

## sections
### Definition
A human turns over approximately 6 g of haemoglobin per day, and it is estimated that 1 g of haemoglobin yields 35 mg of bilirubin. The book organises what happens to it by place: the formation of the bilirubin occurs subsequently in the reticuloendothelial system, the liver, and the intestine. That three-part sequence is the spine of the chapter and the answer to the commonest question set on it.

The kidney is deliberately absent from that list, and the distinction is worth stating plainly because it is easy to lose. The kidney excretes two water-soluble products that reach it in blood — the trace of urobilinogen that escapes the enterohepatic circulation and gives urine its normal colour, and conjugated bilirubin when that is abnormally raised — but it performs no step of the degradation. Excreting a product is not participating in the pathway that made it, which is the same distinction that separates liver from kidney in urea handling.

### Mechanism
**In the reticuloendothelial system.** After approximately 120 days in the circulation, the erythrocytes are taken up by the reticuloendothelial cells, where the haemoglobin is liberated. Globin is removed and undergoes proteolysis into amino acids. The first step in the degradation of haem is catalysed by the haem oxygenase system of the RE cells, in the presence of NADPH and oxygen: ferric iron and carbon monoxide are released, and the green pigment biliverdin is produced. Biliverdin reductase then reduces green biliverdin to yellow bilirubin. This bilirubin is only slightly soluble in plasma, so it travels bound to albumin; it is the chief bilirubin in blood, hence the name haemobilirubin, and it cannot be excreted in urine. If its plasma level exceeds the carrying capacity of albumin — about 20 mg/dL — it passes the blood-brain barrier because it is hydrophobic, and produces the brain damage called kernicterus.

**In the liver.** Unconjugated bilirubin is taken up by liver cells, where it dissociates from albumin. Conjugation of bilirubin with glucuronic acid is catalysed by the enzyme glucuronyl transferase, and the product is conjugated bilirubin. Conjugation increases the polarity and water solubility of bilirubin. Glucuronyl transferase is induced by certain drugs, phenobarbital among them, and by glucose — an inducibility the syndromes article turns on entirely. Excretion of conjugated bilirubin is principally through the bile, hence the name cholebilirubin, and only traces go back to the blood.

**In the intestine.** In the large intestine, by the action of enzymes derived from the intestinal bacterial flora, bilirubin is released from glucuronic acid and undergoes successive reductions ending in the formation of stercobilinogen, which is colourless. The majority is excreted in stools and spontaneously oxidised by the oxygen of the air to brown stercobilin, which gives stool its brown colour. About 10 per cent is absorbed from the intestines and returned via portal blood to the liver to be excreted again in bile — the enterohepatic circulation. Very little normally escapes to the systemic circulation and then to the kidneys as colourless urobilinogen, where it is converted to yellow urobilin on exposure to air, which gives urine its normal colour.

### Key determinants
Everything that separates the two forms of bilirubin is downstream of one property. Being water-soluble, conjugated bilirubin is not bound to plasma proteins; thus, it can be excreted in urine but does not pass the blood brain barrier. Read the book's nine-row comparison table with that sentence in hand and it stops being a table to memorise.

Unconjugated bilirubin is mostly non-polar and insoluble, is bound to albumin, is not excreted by the kidney, passes the blood-brain barrier above about 20 mg/dL and causes brain damage, and its normal serum range is 0.2 to 0.9 mg/dL. Conjugated bilirubin is mostly polar and soluble, is not bound to albumin, is excreted by the kidney, does not pass the blood-brain barrier and does not cause brain damage, and normally sits below 0.3 mg/dL. Total serum bilirubin is normally 0.2 to 1.2 mg/dL.

The Van den Bergh reaction sorts them, and the names it gives them are the ones a laboratory report uses. Serum bilirubin is coupled with a reagent to yield a violet dye. The water-soluble conjugated bilirubin, not being bound to proteins, reacts rapidly with the reagent within one minute and is said to be direct-reacting. The less soluble unconjugated bilirubin, bound to albumin, reacts only after the addition of a solvent such as methanol, at which point both forms react and the reading is total bilirubin. Indirect-reacting bilirubin, which corresponds to the unconjugated fraction, is obtained by subtracting the direct from the total.

The book's own summary table adds three disease rows to those properties, and one cell of it is left empty rather than filled: it records unconjugated bilirubin as raised and conjugated as normal in haemolytic jaundice, the reverse in obstructive jaundice, and both raised in hepatotoxic jaundice. The serum enzyme pattern that goes with each is the subject of a separate concept and is not restated here.

### Clinical significance
Because all faecal stercobilinogen comes from bilirubin delivered in bile, the amount in stool is a measure of delivery rather than of concentration in blood — and that is what makes it discriminating. In haemolytic jaundice, red cells are destroyed faster than normal, far more bilirubin is produced, the liver conjugates and secretes as much as it can, and stercobilin increases in feces, which becomes dark brown. In hepatocellular jaundice the damaged liver secretes less and swollen cells block the canaliculi, so stercobilin in the faeces usually decreases and the stool is faint. In obstruction none arrives at all, so stercobilin disappears from the faeces and the stool is clay coloured.

The urine completes the pattern and completes it differently, because the urine reports the *serum* fraction. In haemolysis the excess in serum is unconjugated and albumin-bound, so it cannot be filtered — the book calls this acholuric jaundice — while the larger load returning through the enterohepatic circulation means more urobilinogen escapes to the kidney. Dark stool, with urine positive for urobilinogen but negative for bilirubin, is therefore the fingerprint of haemolysis. That last inference about urinary urobilinogen is reasoning from the book's own enterohepatic account rather than a sentence it prints, and it is flagged in the evidence gaps.

Two practical consequences of the conjugation step close the chapter. The first is that a rise in conjugated bilirubin is the only kind that can appear in urine, so bilirubinuria always means a lesion at or after conjugation. The second is that glucuronyl transferase is inducible, which is what makes phenobarbital a treatment where the enzyme is present but underperforming — and what makes it useless where the enzyme is absent. The two named syndromes that turn on exactly that difference are covered in the hyperbilirubinaemia article.

## published_summary


## published_sections


## hold_these
Bilirubin is formed successively in three places: the reticuloendothelial system, the liver and the intestine. The kidney is not one of them.
Haem oxygenase, needing NADPH and oxygen, releases ferric iron and carbon monoxide and leaves green biliverdin; biliverdin reductase makes yellow bilirubin.
The liver conjugates bilirubin with glucuronic acid, using glucuronyl transferase, and that enzyme is induced by phenobarbital and by glucose.
Being water-soluble, conjugated bilirubin is not bound to plasma proteins; thus, it can be excreted in urine but does not pass the blood brain barrier.
Unconjugated bilirubin crosses the blood-brain barrier and causes kernicterus once it exceeds the albumin carrying capacity of about 20 mg/dL.
Conjugated bilirubin is direct-reacting in the Van den Bergh reaction; unconjugated is indirect and needs methanol.
Faecal stercobilinogen rises in haemolysis, falls in hepatocellular jaundice and disappears in obstruction, because it measures what reached the gut.

## lose_the_mark
Counting the kidney as an organ of haem catabolism because urobilinogen and bilirubin appear in urine.
Naming hyaluronic acid or galacturonic acid as the conjugating partner because both end in "-uronic acid".
Saying conjugated bilirubin causes kernicterus — only the unconjugated, hydrophobic form crosses into the brain.
Expecting conjugated bilirubin to rise in haemolytic anaemia; the book's table records it as normal there.
Reasoning about stercobilinogen from the serum bilirubin instead of from how much bilirubin reached the intestine.
Expecting bilirubin in the urine of a haemolytic patient — the excess is albumin-bound and unfilterable, which is why that jaundice is acholuric.

## callout_evidence


## related_concepts
CON-HEM-26C990AD8F630C | CON-HEM-7A26AE75471EF8 | CON-HEM-C87C15A849F158 | CON-HEM-22375197AEE80D

## related_articles
ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA: where the haem being degraded here came from, and why a mature red cell can destroy neither
ART-103-BIO-HYPERBILIRUBINAEMIA-SYNDROMES: the two named syndromes that turn on whether glucuronyl transferase is present to induce
ART-103-BIO-JAUNDICE-AND-BILIRUBIN: the three-way classification of jaundice by bilirubin fraction and serum enzyme, already authored from the 2025 end-of-year paper and deliberately not repeated here

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
103 BMS > Biochemistry > Heme Metabolism > Heme Catabolism
103 BMS > Biochemistry > Heme Metabolism > Blood Bilirubin

## university_notes
kau: The Biochemistry department's cancelled-items orientation for 2025-2026 leaves this material examinable — the cancellation covers "Biosynthesis of heme & Porphyria (pp115-118)" only, and the department's own list of examinable diagrams names "Different stages of heme catabolism (120)", which is the figure this article's Mechanism section follows.

## annotations
### definition_of · CON-HEM-26C990AD8F630C
Quote: That three-part sequence is the spine of the chapter and the answer to the commonest question set on it.
Block: body

### definition_of · CON-HEM-7A26AE75471EF8
Quote: Conjugation of bilirubin with glucuronic acid is catalysed by the enzyme glucuronyl transferase, and the product is conjugated bilirubin.
Block: body

### definition_of · CON-HEM-C87C15A849F158
Quote: Being water-soluble, conjugated bilirubin is not bound to plasma proteins; thus, it can be excreted in urine but does not pass the blood brain barrier.
Block: body

### definition_of · CON-HEM-22375197AEE80D
Quote: Because all faecal stercobilinogen comes from bilirubin delivered in bile, the amount in stool is a measure of delivery rather than of concentration in blood — and that is what makes it discriminating.
Block: body

## media


## media_recommendations
### diagram · The three stages of haem catabolism across RES, blood, liver, intestine and kidney
Brief: The book's printed page 120 figure redrawn as five labelled bands — RES, blood, liver, intestines, kidney — with haem entering top left, the haem oxygenase step consuming NADPH and oxygen and releasing carbon monoxide and ferric iron, biliverdin to bilirubin by biliverdin reductase, albumin-bound haemobilirubin crossing the blood band, two UDP-glucuronic acid molecules entering at the liver to give cholebilirubin, bile to intestine, stercobilinogen splitting three ways into stool, enterohepatic return and the kidney arm ending in urobilin.
Purpose: Teaches CON-HEM-26C990AD8F630C and CON-HEM-22375197AEE80D. The claim that the kidney is not a site of catabolism is a claim about which band an arrow ends in, and the three fates of stercobilinogen are a branch — prose can name them in sequence but cannot show a student that they are one pool divided three ways. This is also the figure the department names on its own examinable-diagram list.
Priority: required
Status: needed
Section: Mechanism
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### comparison table · Unconjugated versus conjugated bilirubin, nine rows
Brief: Two columns, unconjugated and conjugated, with rows for serum level, other name, Van den Bergh behaviour, polarity, water solubility, renal excretion, albumin binding, blood-brain barrier, and the three jaundice rows. The enzyme cell for haemolytic jaundice must be left empty, as the department book leaves it, not filled with "normal".
Purpose: Teaches CON-HEM-C87C15A849F158. The concept is that eight rows follow from one, and a reader can only see that when the rows are beside each other; read as prose the table becomes eight facts to memorise instead of one to derive.
Priority: required
Status: needed
Section: Key determinants
Kind: comparison table
Source direction: original table built from the department book's own printed page 123 summary
Rights: original work

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter "VIII- METABOLISM OF HEME", printed pages 119 to 123 — HEME CATABOLISM, BLOOD BILIRUBIN, and the comparison table.
The 391-item department question book (src_07f0a0ff41addf826c7f) establishes which of this material is asked and how, and is cited as curriculum signal only, never as evidence that a statement is medically true.

## evidence_gaps
No claim, citation or span is authored for this article; claim_ids and span_ids are deliberately empty and the evidence chain is owed before publication.
Every statement rests on one source, the department book. No independent verification against an international clinical chemistry reference has been attached.
The book does not state in so many words that the kidney is not involved in haem catabolism; that is read off its own three-site list together with its separate account of renal excretion.
The rise in urinary urobilinogen in haemolysis is reasoned from the book's enterohepatic account and is not a sentence the book prints.
The stoichiometry of two UDP-glucuronic acid molecules per bilirubin appears only in the book's figure on printed page 120, not in its prose.
The book prints the conjugating enzyme's name three different ways across two pages, one of which is a typographical slip; which form a marker expects is not settled by this source.
The book's summary table on printed page 123 leaves the serum enzyme cell for haemolytic jaundice blank rather than writing "normal", and nothing here fills it.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Written to carry the Metabolism Of Heme MCQs that fall on printed pages 119 to 123 of the department book, including the stercobilinogen item, which the question book files under Jaundice but whose reasoning is the intestinal stage of catabolism — which is why its concept lives here and why its library_ids already name this article. TPL-CONCEPT rather than TPL-CONDITION because the subject is a pathway and the properties of a molecule, not a disease. The three-way classification of jaundice is deliberately absent: it is owned by ART-103-BIO-JAUNDICE-AND-BILIRUBIN, already authored from the 2025 end-of-year paper, and this article cross-references it rather than restating it.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T07 for this material; the book's own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
questionIds: The MCQs that test this article are authored in ../question/103-BMS-MCQ-protein-heme.md and already name this article in their library_ids. The back-reference is owed and is listed in the hand-off report; it is left empty rather than filled with IDs before that file is applied.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book's own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
calloutEvidence: Present and deliberately empty. Every hold_these and lose_the_mark line above would be gated on a claim, and no claim is authored for this batch — see claimIds.
claimIds: Deliberately empty. The evidence chain for this batch is a separate scope; no claim file is authored beside it, inventing claim IDs is forbidden, and binding a neighbouring concept's live claim to these statements would be a near-miss attachment made to clear a validator.
spanIds: Deliberately empty for the same reason. A span ties one sentence to the claims that support it, so it cannot be authored before the claims are.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-HYPERBILIRUBINAEMIA-SYNDROMES

## title
Named hyperbilirubinaemia syndromes: the newborn, Gilbert, and Crigler-Najjar

## arabic_title
متلازمات فرط بيليروبين الدم المسماة

## aliases
Hyperbilirubinaemia syndromes
Physiological neonatal jaundice
Neonatal jaundice
Crigler-Najjar syndrome
Gilbert syndrome
Phototherapy
Kernicterus
Phenobarbital in jaundice

## subject
haem

## topic
Clinical biochemistry

## subtopic
Jaundice (Icterus or Hyperbilirubinemia)

## microtopic
Physiological neonatal jaundice

## nanotopic


## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-HEM-T01-S01 | SYS-GIT-T06

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
Three named conditions raise unconjugated bilirubin without any obstruction and without any haemolytic disease worth the name, and all three are failures of the same step: conjugation. What separates them is how much glucuronyl transferase is left. In the newborn the enzyme is immature and will mature. In Gilbert syndrome uptake and conjugation are mildly defective and the condition is benign. In Crigler-Najjar the enzyme is deficient — partially in type II, essentially completely in type I — and that last distinction decides whether an inducing drug can do anything at all. Reading the group this way turns four remembered lists into one question asked four times: how much enzyme is there?

## sections
### Definition
Jaundice is the yellow colour of skin, nails and sclerae due to elevation of serum bilirubin above 2 mg/dL, and the department book classifies it by the predominant form of bilirubin in serum: unconjugated, conjugated, or both. This article is about three named conditions that sit inside the first of those categories and are not caused by increased production. In each, bilirubin is made at a normal or near-normal rate and the liver cannot conjugate it fast enough.

The book teaches two of them. Physiological neonatal jaundice is a transient condition that occurs in the first few days of life. Gilbert syndrome is a benign condition caused by a defect in the uptake of unconjugated bilirubin by the liver and in the conjugation pathways, and the book notes that newborns have mild hyperbilirubinaemia. The third, Crigler-Najjar, is set by the department question book and is not described in the department textbook at all — a gap this article states rather than papers over, and one recorded on the concept and in the evidence gaps below.

### Mechanism
Physiological neonatal jaundice has two causes running at once, and it is the pairing that makes it transient rather than either half alone. It results partly from increased hemolysis and partly from immaturity of the enzyme UDP-glucuronyltransferase. The newborn is breaking down the large fetal red cell mass, so production is high; the conjugating enzyme is not yet fully expressed, so disposal is slow. Neither state persists. Serum bilirubin usually does not reach 13 mg/dL.

That threshold is the useful part, and it is useful because of a second number from the catabolism chapter. Unconjugated bilirubin is hydrophobic and albumin-bound, and if its plasma level exceeds the carrying capacity of albumin — about 20 mg/dL — it crosses the blood-brain barrier and produces kernicterus. So a transient jaundice appearing in the first few days and staying below about 13 mg/dL fits the physiological picture, while a bilirubin climbing past it is heading towards the line where brain damage begins and demands a cause.

Crigler-Najjar is the same failure taken to its limit, and the pair of types is best read as a single question about how much enzyme survives. Type II is a partial deficiency of UDP-glucuronyl transferase with residual activity, and serum unconjugated bilirubin generally does not exceed 20 mg/dL, so kernicterus is unusual. Type I is a complete or near-complete absence, inherited as an autosomal recessive disease — which fits, since two defective alleles are needed to abolish activity where one working allele would leave the residual enzyme of type II — the bilirubin rises past the albumin threshold, and kernicterus is the expected outcome.

### Key determinants
One enzyme property decides the treatment of every condition in this article: glucuronyl transferase is induced by certain drugs, e.g., phenobarbital, and by glucose.

Induction increases the amount of an enzyme the cell can still make. That is why phenobarbital may be used in physiological neonatal jaundice, to induce the synthesis of the enzyme whose immaturity is half the problem, and why it works in Crigler-Najjar type II, where some enzyme is present. It is also exactly why patients with Crigler-Najjar type I do not respond to phenobarbital therapy: there is essentially no functional enzyme to induce, and an inducer has nothing to work on. That single fact is the most useful discriminator between the two types, because it converts a memorised pair into a piece of reasoning — if the defect is complete, an inducer cannot help.

The other treatment does not depend on the enzyme at all, which is why it still works when phenobarbital does not. Exposure to blue, fluorescent light — phototherapy — helps conversion of the insoluble form of unconjugated bilirubin to the more soluble photoisomers that can be excreted into the bile without conjugation to glucuronic acid. It bypasses the broken step rather than accelerating it.

### Clinical significance
The question worth asking of any jaundice in this group is not which syndrome it is but where the lesion sits relative to conjugation, because that fixes everything else. Any lesion before or at conjugation — increased production as in haemolysis, or failed uptake or conjugation as in Gilbert and Crigler-Najjar — gives unconjugated hyperbilirubinaemia, which cannot appear in urine because the pigment is albumin-bound. Any lesion after conjugation gives conjugated hyperbilirubinaemia, which can. The three-way classification of jaundice by bilirubin fraction and by serum enzyme is authored separately and is not restated here.

Kernicterus is the outcome this whole group is watched for, and deciding whether a given jaundice can produce it takes two questions rather than a memorised list: does it raise the *unconjugated* fraction, and does it raise it far enough to pass the albumin carrying capacity of about 20 mg/dL? Crigler-Najjar type I answers yes to both, which is why it is the condition in this article that reliably causes it. Physiological neonatal jaundice usually answers no to the second, which is what the 13 mg/dL figure is telling a clinician.

A note on what this article rests on. The department textbook supports the neonatal condition, Gilbert syndrome, the inducibility of glucuronyl transferase and the 20 mg/dL kernicterus threshold, and it says nothing whatever about Crigler-Najjar. The two types, their inheritance and their phenobarbital responses come from the department question book and its printed answer key. That is a real gap in the evidence for a topic the department nonetheless asks about, and it is recorded here, on the concept, and in the evidence gaps rather than presented as the book's teaching.

## published_summary


## published_sections


## hold_these
Physiological neonatal jaundice results partly from increased haemolysis and partly from immaturity of UDP-glucuronyl transferase.
Serum bilirubin in physiological neonatal jaundice usually does not reach 13 mg/dL.
Phototherapy converts insoluble unconjugated bilirubin into soluble photoisomers excreted in bile without conjugation, so it bypasses the broken step.
Phenobarbital works by inducing glucuronyl transferase, so it helps only where some enzyme remains.
Crigler-Najjar type I is a complete deficiency, autosomal recessive, bilirubin above 20 mg/dL, and does not respond to phenobarbital; type II is partial, stays below 20 mg/dL, and does respond.
Kernicterus follows when unconjugated bilirubin exceeds the albumin carrying capacity of about 20 mg/dL.
Gilbert syndrome is a benign defect of hepatic uptake and conjugation of unconjugated bilirubin.

## lose_the_mark
Reading the 13 mg/dL figure as a level physiological neonatal jaundice usually exceeds, rather than one it usually does not reach.
Calling Crigler-Najjar type I autosomal dominant; a complete loss of activity needs two defective alleles.
Attributing the partial enzyme deficiency to type I when it belongs to type II.
Expecting phenobarbital to work in a complete enzyme deficiency, when induction can only increase an enzyme the cell can still make.
Thinking phototherapy assists conjugation; it produces photoisomers excreted without conjugation at all.
Expecting conjugated bilirubin to be the fraction that causes kernicterus.

## callout_evidence


## related_concepts
CON-HEM-20178168A8FCF0 | CON-HEM-167E007FE3D9EC

## related_articles
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN: the conjugation step these syndromes fail at, and where the 20 mg/dL albumin threshold comes from
ART-103-BIO-JAUNDICE-AND-BILIRUBIN: the three-way classification of jaundice by bilirubin fraction and serum enzyme, already authored from the 2025 end-of-year paper and deliberately not repeated here

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
103 BMS > Biochemistry > Heme Metabolism > Jaundice (Icterus or Hyperbilirubinemia)

## university_notes
kau: The Biochemistry department's cancelled-items orientation for 2025-2026 leaves this material examinable; the cancellation covers "Biosynthesis of heme & Porphyria (pp115-118)" only. Note separately that the department book teaches Gilbert syndrome and not Crigler-Najjar, while the department question book sets three items on Crigler-Najjar — a mismatch between the two departmental sources that a faculty reviewer should resolve before this article is published.

## annotations
### definition_of · CON-HEM-167E007FE3D9EC
Quote: It results partly from increased hemolysis and partly from immaturity of the enzyme UDP-glucuronyltransferase.
Block: body

### definition_of · CON-HEM-20178168A8FCF0
Quote: It is also exactly why patients with Crigler-Najjar type I do not respond to phenobarbital therapy: there is essentially no functional enzyme to induce, and an inducer has nothing to work on.
Block: body

## media


## media_recommendations
### comparison table · Crigler-Najjar type I, Crigler-Najjar type II and Gilbert syndrome
Brief: Three columns with rows for the defect, the enzyme activity remaining, the usual serum bilirubin level, the inheritance, the response to phenobarbital and the risk of kernicterus. The Crigler-Najjar columns must be marked as sourced from the department question book rather than the department textbook.
Purpose: Teaches CON-HEM-20178168A8FCF0. The concept is that every row is derived from the first one, and only a table read across shows a student that the six rows are one variable seen six ways. Read as prose it becomes eighteen facts.
Priority: required
Status: needed
Section: Mechanism
Kind: comparison table
Source direction: original table built from the department question book's own compare-between item, with the two supporting mechanisms from the department textbook
Rights: original work

### diagram · Phototherapy bypasses conjugation; phenobarbital accelerates it
Brief: Two parallel routes out of unconjugated bilirubin — one through glucuronyl transferase to conjugated bilirubin and bile, marked with an upward arrow labelled phenobarbital induction; the other from unconjugated bilirubin straight to photoisomers under blue light, marked as reaching bile without conjugation. The enzyme box crossed out on the second route.
Purpose: Teaches CON-HEM-167E007FE3D9EC and answers the type I question in the Key determinants section. Students learn the two treatments as a pair of names and cannot say why phototherapy still works when the enzyme is absent; drawing the bypass is what makes that difference legible.
Priority: required
Status: needed
Section: Key determinants
Kind: diagram
Source direction: original diagram built from the department book's own account of phototherapy and of enzyme induction
Rights: original work

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), printed pages 119 and 122 — the inducibility of glucuronyl transferase, the 20 mg/dL albumin carrying capacity and kernicterus, physiological neonatal jaundice with its mechanism, threshold and both treatments, and Gilbert syndrome.
The 391-item department question book (src_07f0a0ff41addf826c7f) is the only source held here for Crigler-Najjar itself. It establishes what the department asks and is not evidence that a statement is medically true; everything in this article that comes from it alone is marked as such in the prose and in evidence_gaps.

## evidence_gaps
No claim, citation or span is authored for this article; claim_ids and span_ids are deliberately empty and the evidence chain is owed before publication.
The department textbook does not describe Crigler-Najjar syndrome at all. The two types, the completeness of each deficiency, the autosomal recessive inheritance of type I and the phenobarbital responses rest on the department question book and its printed key, and no clinical reference has been attached for them. This is the largest gap in the batch.
The book gives 13 mg/dL as the level physiological neonatal jaundice usually does not reach, and gives no management threshold, so nothing here states when phototherapy should be started.
The book says "the first few days of life" without a day of onset or a duration, and says nothing about preterm infants.
The book's account of Gilbert syndrome is two sentences long and gives no bilirubin range, no inheritance and no trigger.

## conflicts
The department textbook and the department question book do not agree on what this topic contains. The textbook's list of inherited unconjugated hyperbilirubinaemias stops at Gilbert syndrome; the question book sets three items on Crigler-Najjar, including a compare-between item on its own printed page 133. Neither position is overruled here: the article teaches the question book's content, states that the textbook does not carry it, and leaves the reconciliation to a faculty reviewer.

## last_reviewed


## review_due


## notes
Written to carry the Metabolism Of Heme MCQs on the named unconjugated hyperbilirubinaemia syndromes — Crigler-Najjar type I, physiological neonatal jaundice, and the kernicterus item that turns on both. Separated from ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN because the syndromes are conditions and the catabolism article is a pathway, and separated from the already-authored ART-103-BIO-JAUNDICE-AND-BILIRUBIN because that article owns the three-way laboratory classification and this one owns the named conditions. TPL-CONCEPT rather than TPL-CONDITION: TPL-CONDITION would require an epidemiology and a prognosis section for three conditions the department book gives no figures for at all, and filling them would mean inventing.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T07 for this material; the book's own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
questionIds: The MCQs that test this article are authored in ../question/103-BMS-MCQ-protein-heme.md and already name this article in their library_ids. The back-reference is owed and is listed in the hand-off report; it is left empty rather than filled with IDs before that file is applied.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
calloutEvidence: Present and deliberately empty. Every hold_these and lose_the_mark line above would be gated on a claim, and no claim is authored for this batch — see claimIds. The Crigler-Najjar lines could not be gated in any case until a source for the syndrome is in the evidence store.
claimIds: Deliberately empty. The evidence chain for this batch is a separate scope; no claim file is authored beside it, and inventing claim IDs is forbidden.
spanIds: Deliberately empty for the same reason. A span ties one sentence to the claims that support it, so it cannot be authored before the claims are.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
