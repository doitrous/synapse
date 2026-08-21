<!--
  103 BMS · Biochemistry · the 8 articles the MCQ batch
  ../question/103-BMS-MCQ-lipid-diabetes.md needs and which did not already
  exist. `library_ids` may not be empty — an MCQ with no article is the error
  "nothing teaches this question's answer" — so every one of these exists
  because a concept in ../concept/103-BMS-mcq-lipid-concepts.md needed teaching,
  not to fill a folder.

  WHAT WAS REUSED RATHER THAN WRITTEN. Twenty-two of the 79 MCQs point at
  articles that already exist, so this file is 8 records and not 11:

   · ART-103-BIO-KETOSIS          causes of ketosis            (pending, 103)
   · ART-103-BIO-PLASMA-LIPOPROTEINS  the particles and their disorders (pending)
   · ART-END-TOP-8B80E93DAE       Insulin and Diabetes Mellitus (live)

  Two of the eight are deliberately adjacent to a pending article rather than
  merged into it, because this lane does not own those files:

   · ART-103-BIO-KETONE-BODY-METABOLISM teaches where ketogenesis and ketolysis
     run and why; ART-103-BIO-KETOSIS teaches the pathological state and its
     causes. Different objectives, cross-linked.
   · ART-103-BIO-LIPOPROTEIN-MACHINERY teaches the proteins and enzymes that act
     on a lipoprotein; ART-103-BIO-PLASMA-LIPOPROTEINS teaches the particles
     themselves. Cross-linked from here; the reciprocal `related_articles` entry
     in the other file is OWED and is named in the hand-off report.

  ── TWO FIELDS THIS FILE CANNOT FILL ─────────────────────────────────────────

  `claim_ids` and `span_ids` are written `[clear]` on every record. All 28
  claims in ../evidence/103-BMS-biochemistry-claims.md were read and none
  asserts any of this content — they were authored for the eleven concepts taken
  from the 2025 end-of-year paper. §3 of the shared law forbids inventing an ID,
  and this lane was scoped to three files and mints no claim, citation or span
  IDs. `span_ids` is on the audit's must-carry-a-value list, so
  `articleData.spanIds missing` will be reported for all eight. That is a known
  failure for the lead to close, stated here rather than hidden, and the
  `evidence_basis` of each article names the exact book pages a span would quote.

  `[clear]` VERSUS AN EMPTY BLOCK. `[clear]` is a list directive, parsed only by
  parseList; on a text column it would be stored verbatim as four characters and
  would pass every gate while holding a wrong value. So in this file every
  deliberately empty LIST column is `[clear]` and every deliberately empty TEXT
  column is the key with an empty body. `last_reviewed` and `review_due` are
  text and are therefore empty, not `[clear]`.

  Three article columns are neither: `media`, `published_sections` and
  `published_summary` are parsed as BLOCKS, not as lists. Writing `[clear]` in
  `media` was tried and `medical:batch` reported "1 media block have no URL
  after "### type ·" and would be dropped" on all eight records — the four
  characters were being read as a malformed asset. They are therefore written as
  the key with an empty body, which is what the manual means by "leave present
  but empty" for an article that is not Published.

  ── WHAT THE DEPARTMENT TEXTBOOK DOES NOT CONTAIN ────────────────────────────

  Two of these articles rest wholly or largely on the department QUESTION book,
  because the department TEXTBOOK carries none of their material:

   · ART-103-BIO-EICOSANOIDS — "eicosanoid", "prostaglandin", "thromboxane" and
     "cyclooxygenase" appear on none of the textbook's 160 pages. Marked
     Supplementary and kept deliberately short.
   · ART-103-BIO-DIABETES-MELLITUS — the textbook has NO diabetes chapter at
     all. HbA1c, sorbitol, aldose reductase, ketoacidosis, hyperosmolar,
     metformin, sulfonylurea, GLP and even the phrase "insulin resistance"
     appear nowhere in it.

  Each says so in its own `university_notes` and `evidence_gaps`, naming the
  terms searched. The department examines this material through its question
  book and its orientation while its own textbook omits it; that is a finding
  for a faculty reviewer, recorded and not resolved here.

  ── PLACEMENT ───────────────────────────────────────────────────────────────

  ART-103-BIO-DIABETES-MELLITUS carries `module_subject` "103 BMS > Biochemistry"
  and stops there. The subject tree was built from the textbook's contents page
  and has no diabetes node. No node was invented and the article was not filed
  under Carbohydrate Metabolism to make it fit. A decision owed to a faculty
  reviewer; the reasoning is in that record's `notes`.

  ART-103-BIO-EICOSANOIDS stops at "Lipid Metabolism" for the same kind of
  reason: the chapter's six sections in the tree are real, and none of them
  covers eicosanoids.

  ART-103-BIO-FEED-STARVE-CYCLE resolves to the tree's own "Metabolic
  Integrations", but the department orientation cancels "Metabolic integration —
  109-114" from BOTH the 2025-2026 sittings, so it is marked Supplementary and
  its `university_notes` says a student can safely deprioritise it.

  All eight are `status: Draft` and `publication_gate: needs_evidence`. No dose
  appears anywhere in this file, because no source in this corpus states one;
  drug content names classes and mechanisms only.

  Import order: resource → article → concept → claim → citation → span →
  relation → practical → question. This file lands FIRST of the three this lane
  produced.
-->


# Item

## id
ART-103-BIO-FATTY-ACID-OXIDATION

## title
Oxidising a fatty acid: activation, the carnitine shuttle, and what a block does

## arabic_title
أكسدة الأحماض الدهنية: التنشيط ومكوك الكارنيتين وما يحدث عند إعاقتها

## aliases
Beta oxidation
Fatty acid oxidation
Carnitine shuttle
MCAD deficiency
Alpha oxidation

## subject
fnd

## topic
Lipid metabolism

## subtopic
Catabolism of depot fat

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T07

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

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
A fatty acid cannot be burned where it is found. It is activated to acyl-CoA in the cytosol at a cost of two high-energy bonds, carried across the inner mitochondrial membrane by carnitine, and then dismantled two carbons at a time in the matrix. Fatty acids that are too branched or too long for that machinery have their own routes. Every step is a place a disease can appear, and all of those diseases produce one syndrome: fasting hypoglycaemia with low ketones.

## sections
### Definition
Beta-oxidation is the stepwise removal of two-carbon units from a fatty acyl-CoA as acetyl-CoA, running in the mitochondrial matrix beside the citric acid cycle and the electron transport chain.

It is preceded by two preparatory steps that are often confused with it. Activation converts a free fatty acid to acyl-CoA. Transport carries long-chain acyl-CoA into the matrix. Neither is beta-oxidation, and both can fail on their own.

### Mechanism
Activation comes first and happens in the cytosol. Acyl-CoA synthetase, also called thiokinase, joins the fatty acid to coenzyme A using one ATP — but that ATP goes to AMP and pyrophosphate, and pyrophosphatase then hydrolyses the pyrophosphate, so two high-energy bonds are spent and the reaction is pulled irreversibly forward. This is why the book subtracts 2 from the gross ATP yield of palmitate.

Transport comes second and only matters for long chains. Fatty acids of fewer than 12 carbons cross the mitochondrial membranes freely. Longer ones cannot, and are carried by the carnitine shuttle: carnitine palmitoyl transferase I on the outer membrane exchanges CoA for carnitine, carnitine acyl-carnitine translocase in the inner membrane moves acyl-carnitine inwards against outgoing free carnitine, and CPT-II on the inner face swaps carnitine back for CoA. Carnitine is made from lysine and methionine in liver and kidney and stored in skeletal muscle, heart and brain — which is exactly where deficiency does its damage.

The spiral itself is four reactions repeated: oxidation by acyl-CoA dehydrogenase reducing FAD, hydration, oxidation by 3-hydroxyacyl-CoA dehydrogenase reducing NAD+, and thiolytic cleavage by beta-ketothiolase. Each turn releases one acetyl-CoA, one FADH2 and one NADH, and shortens the chain by two carbons.

### Key determinants
The arithmetic follows from the two-carbon step and is worth deriving rather than memorising. A chain of n carbons needs (n/2)-1 turns and yields n/2 acetyl-CoA, because the final turn splits a four-carbon acyl-CoA into two acetyl-CoA at once. Palmitate, C16, therefore takes 7 turns for 8 acetyl-CoA: 7 FADH2 and 7 NADH give 28 ATP, the 8 acetyl-CoA give 80 in the citric acid cycle, and 108 less 2 for activation is a net 106.

An odd-chain fatty acid runs out with a three-carbon residue instead. Propionyl-CoA carboxylase, a biotin enzyme, converts it to methylmalonyl-CoA and then to succinyl-CoA — the only part of a fatty acid that can become glucose, because succinyl-CoA enters the citric acid cycle before the irreversible pyruvate dehydrogenase step and acetyl-CoA enters after it.

Regulation is by energy state and by feeding state. High ATP inhibits the respiratory chain, so NAD+ and FAD are unavailable and the spiral stalls; high AMP stimulates oxidation. Insulin promotes lipogenesis and inhibits lipolysis, so less fatty acid is available; the anti-insulin hormones do the reverse.

Two shapes of fatty acid need other machinery. A methyl group on the beta carbon blocks beta-oxidation, so alpha-oxidation removes one carbon from the carboxyl end and shifts the obstruction; losing it accumulates phytanic acid. Peroxisomal beta-oxidation trims very-long-chain fatty acids to a length the mitochondrion accepts; losing the peroxisome accumulates long-chain fatty acids in tissues.

### Clinical significance
MCAD deficiency, primary carnitine deficiency, CPT-I deficiency and CPT-II deficiency block the pathway at four different points and produce one clinical picture, because the pathway is only as good as its slowest gate.

Hepatic fatty acid oxidation normally supplies the ATP that gluconeogenesis runs on, so gluconeogenesis fails. The body leans harder on glucose, so liver glycogen is stripped. And because the liver generates no acetyl-CoA, there is nothing to build ketone bodies from. The result is fasting hypoglycaemia with a LOW ketone level — the combination that names the diagnosis. Muscle weakness, myoglobinuria and cardiomyopathy follow from the ATP deficit, hyperammonaemia from increased protein catabolism, and fatty liver especially in CPT-I deficiency.

Treatment is to avoid fasting and strenuous exercise, to give a high-carbohydrate low-fat diet, and to give oral carnitine where carnitine is what is missing.

### Common misconceptions
Two errors dominate. The first is counting n/2 turns instead of (n/2)-1, which comes from forgetting that the last cut yields two acetyl-CoA. The second is expecting ketones to be high in a fatty acid oxidation defect, on the reasoning that the child is effectively fasting — which inverts the diagnosis, because the acetyl-CoA ketone bodies are made from is exactly what is missing.

## published_summary

## published_sections

## hold_these
Coenzyme A activates the fatty acid in the cytosol; carnitine transports it into the mitochondrion. Two different molecules, two different steps.
A chain of n carbons needs (n/2)-1 turns and gives n/2 acetyl-CoA, one FADH2 and one NADH per turn.
Every block in fatty acid oxidation gives fasting hypoglycaemia with LOW ketones.
Alpha-oxidation is for chains that are too branched; peroxisomal oxidation is for chains that are too long.

## lose_the_mark
Writing that acetyl-CoA activates the fatty acid, or that citrate carries it into the mitochondrion.
Answering seven turns for a C14 fatty acid — that is the acetyl-CoA count, not the turn count.
Importing the citric acid cycle yield into one beta-oxidation turn and answering three NADH.
Expecting high ketones in MCAD deficiency because the child has been fasting.

## callout_evidence

## related_concepts
CON-FND-177A829022AC8F | CON-FND-84BDACCA71AF45 | CON-FND-4C05D459E80AEF | CON-FND-F8FE239D334F4F | CON-FND-A0F07BE6AD30A5

## related_articles
ART-103-BIO-KETONE-BODY-METABOLISM: the acetyl-CoA this pathway produces is what ketone bodies are built from
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT: the opposite pathway, in the opposite compartment, with the opposite redox currency
ART-103-BIO-FEED-STARVE-CYCLE: the fasting states in which this pathway carries the body

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
kau: The Biochemistry department names the Carnitine Shuttle diagram on printed page 63 among its twenty-two "Diagrams to be studied", and lists Lipid metabolism among the six chapters of the end-of-module MCQ exam. Nothing in this article's material appears in the department's cancelled-items table.

## annotations
### mechanism_step_before · CON-FND-177A829022AC8F
Quote: Activation comes first and happens in the cytosol.
Block: body

### definition_of · CON-FND-84BDACCA71AF45
Quote: Each turn releases one acetyl-CoA, one FADH2 and one NADH, and shortens the chain by two carbons.
Block: body

## media

## media_recommendations
### diagram · Mechanism
Brief: The carnitine shuttle, showing CPT-I on the outer membrane, the translocase in the inner membrane and CPT-II on its inner face, with carnitine cycling in the opposite direction to acyl-carnitine
Purpose: Teaches CON-FND-177A829022AC8F. The exchange is spatial and directional — which enzyme sits in which membrane, and which molecule moves which way — and prose can assert it but only a section shows it. The department names this diagram as examinable.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed biochemistry text
Rights: must be CC-BY or public domain

### flowchart · Key determinants
Brief: One turn of the beta-oxidation spiral with the four enzymes named and FADH2 and NADH marked at their own steps, and the shortened acyl-CoA returning to the top
Purpose: Teaches CON-FND-84BDACCA71AF45. Students who cannot see the loop close cannot derive the turn count, and the two-carbon step is what the whole arithmetic rests on.
Priority: required
Status: needed
Section: Key determinants

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Department of Biochemistry book for module 103 (src_300847a5fa64809d6c07), file pages 63 to 68, read from the cached page text and confirmed against the rendered pages.
Kasr Al Ainy Department of Biochemistry MCQ book for modules 102 and 103 (src_07f0a0ff41addf826c7f), Lipid Metabolism chapter, printed pages 100 to 107, for what is examined and in what form.

## evidence_gaps
No claim or citation is attached to any sentence in this article yet; the evidence chain is owed and is named in the hand-off report.

## conflicts
The department book says long-chain acyl-CoA is transported "across the outer mitochondrial membrane" by the carnitine shuttle, while its own diagram on the same page places the translocase in the inner membrane. The diagram is the accurate reading and is what this article follows; the sentence is recorded here rather than silently corrected.

## last_reviewed

## review_due

## notes
Written to carry the fifteen beta-oxidation MCQs in ../question/103-BMS-MCQ-lipid-diabetes.md. Neither Refsum disease nor Zellweger syndrome is named in the department textbook, which describes only the mechanisms; the disease names come from the department question book and are flagged on the concept CON-FND-F8FE239D334F4F.

## field_notes
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this article where nothing else lives.
microtopicId: The canonical tree stops at topic level under DIS-BIO for the purposes of the validator, and the department book's own section name is carried by module_subject instead.
questionIds: Written [clear]. The 79 MCQs in ../question/103-BMS-MCQ-lipid-diabetes.md name this article in their library_ids, but question IDs are assigned at import and naming them here before they exist would be inventing IDs.
media: Written [clear]. No rights-cleared asset exists for any of this material; what is needed is requested in media_recommendations instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: Written [clear] and owed. All 28 claims in ../evidence/103-BMS-biochemistry-claims.md were read and none asserts this article's content; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files and mints no claim or citation IDs, so the evidence chain is owed and is named in the hand-off report.
spanIds: Written [clear] and owed, for the same reason as claimIds. A span must name the claim and citation it rests on, and neither exists yet. The audit will report articleData.spanIds missing; that is a known failure for the lead to close, not an oversight.

---

# Item

## id
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## title
Building fat and taking it apart: lipogenesis, triacylglycerol and the hormonal switch

## arabic_title
بناء الدهون وتكسيرها: تخليق الأحماض الدهنية والدهون الثلاثية والتحكم الهرموني

## aliases
Lipogenesis
Fatty acid synthesis
Acetyl-CoA carboxylase
Triacylglycerol synthesis
Lipolysis
Hormone-sensitive lipase
Citrate shuttle

## subject
fnd

## topic
Lipid metabolism

## subtopic
Synthesis of triacylglycerol

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T03

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

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
Fatty acid synthesis is not beta-oxidation run backwards. It happens in a different compartment, uses a different reducing currency, needs its carbon delivered by a shuttle, and turns on a single regulated enzyme. Storing the product as triacylglycerol needs glycerol-3-phosphate, which adipose tissue can only make from glucose. And one hormonal switch decides whether the whole apparatus runs forward or in reverse.

## sections
### Definition
Lipogenesis is the synthesis of fatty acids from acetyl-CoA derived from excess carbohydrate, in the cytosol of liver, adipose tissue and the lactating mammary gland. Triacylglycerol synthesis is the esterification of three fatty acids onto a glycerol-3-phosphate backbone. Lipolysis is the hydrolysis of stored triacylglycerol back to glycerol and free fatty acids.

The three are one system, and the same hormones that switch on the first two switch off the third.

### Mechanism
The carbon arrives by shuttle. Acetyl-CoA is made in the mitochondrion by pyruvate dehydrogenase and cannot cross the inner membrane, so it condenses with oxaloacetate to form citrate, a transporter carries citrate to the cytosol, and ATP-citrate lyase splits it back into acetyl-CoA and oxaloacetate. The oxaloacetate returns as malate or pyruvate, and malic enzyme generates NADPH on the way.

The committed step is a carboxylation. Acetyl-CoA carboxylase adds CO2 to acetyl-CoA to make malonyl-CoA, carrying biotin as the group that ferries the CO2. Malonyl-CoA is the two-carbon donor for every elongation, so palmitate needs seven malonyl-CoA and one acetyl-CoA. Fatty acid synthase, a complex of two identical chains bearing seven activities, then performs the seven cycles and releases palmitate, spending 14 NADPH from the hexose monophosphate pathway and from malic enzyme. Elongation beyond C16 happens in the microsomes.

Esterification needs glycerol-3-phosphate. Liver, kidney and intestinal mucosa make it from free glycerol using glycerol kinase. Adipose tissue lacks that enzyme and must reduce dihydroxyacetone phosphate from glycolysis instead — so adipose tissue can only build triacylglycerol when glucose is available and insulin is admitting it.

Lipolysis runs the other way through hormone-sensitive lipase, which is active when phosphorylated and inactive when dephosphorylated, with monoacylglycerol lipase completing the job.

### Key determinants
Acetyl-CoA carboxylase is the rate-limiting enzyme and every signal converges on it. It is active dephosphorylated and inactive phosphorylated; malonyl-CoA and palmityl-CoA inhibit it allosterically; insulin activates it and glucagon and adrenaline inactivate it.

Insulin acts at five points of lipogenesis at once, which the department book marks on its own citrate-shuttle diagram: glycolysis, pyruvate dehydrogenase, ATP-citrate lyase, acetyl-CoA carboxylase and fatty acid synthase expression, plus the HMP dehydrogenases that supply NADPH. Turning on substrate, enzyme and reducing power together is what makes insulin the answer to almost every question of the form "what stimulates this pathway".

On lipolysis the same hormones pull the opposite way. Glucagon and adrenaline raise cAMP and activate protein kinase A, which phosphorylates and activates the lipase; thyroxine and growth hormone activate the kinase directly; glucocorticoids increase synthesis of the enzyme. Insulin — the only hormone that inhibits lipolysis — stimulates phosphodiesterase to destroy cAMP and activates lipase phosphatase to dephosphorylate the enzyme. Caffeine increases lipolysis by inhibiting phosphodiesterase.

### Clinical significance
Depot fat and tissue fat are not one pool. Depot fat is adipose triacylglycerol, rich in saturated fatty acids, variable in amount, rising with overfeeding and falling with fasting, and it is the only fat drawn on for energy. Tissue fat is the phospholipid, glycolipid and cholesterol of membranes in every cell, rich in unsaturated fatty acids, constant, and never used as fuel. Fat is the right storage molecule because it is anhydrous and highly reduced: one gram yields about 9.3 kcal.

The liver is the primary site of triacylglycerol synthesis and exports the product as VLDL. When that export fails the triacylglycerol is stranded, and the result is a fatty liver — the mechanism behind the fatty liver of abetalipoproteinaemia and of CPT-I deficiency alike.

Because adipose tissue depends on glucose to make its glycerol-3-phosphate, the glycerol released during lipolysis cannot be reused locally; it leaves for the liver, which is why plasma glycerol marks lipolysis and why glycerol is anti-ketogenic.

### Common misconceptions
Answering "fatty acid synthase" when asked for the key enzyme of lipogenesis. It does most of the chemistry, but the regulated step is the first committed one, and that is acetyl-CoA carboxylase. The second is assuming that because exercise burns fat, exercise inhibits lipolysis; it raises adrenaline and lowers insulin, so it stimulates it.

## published_summary

## published_sections

## hold_these
Acetyl-CoA carboxylase is the key enzyme of lipogenesis, it needs biotin, and it makes malonyl-CoA.
Acetyl-CoA reaches the cytosol as citrate and is released there by ATP-citrate lyase.
Adipose tissue lacks glycerol kinase, so it can only store fat when glucose is available.
Insulin is the only hormone that inhibits lipolysis, and it does so by destroying cAMP and by activating lipase phosphatase.

## lose_the_mark
Naming fatty acid synthase as the rate-limiting enzyme because it does the most work.
Naming citrate synthase instead of citrate lyase as the enzyme that releases cytosolic acetyl-CoA.
Answering NADH for the reductant of fatty acid synthesis — it is NADPH.
Saying adipose tissue lacks glycerol-3-phosphate dehydrogenase; that is the enzyme it actually uses.

## callout_evidence

## related_concepts
CON-FND-2F3A652B8E3104 | CON-FND-FCFC1B5A95695E | CON-FND-6B469645AE7DBC | CON-FND-69437CF1F5CCC0 | CON-FND-1C668119B3C0BB | CON-FND-4C05D459E80AEF

## related_articles
ART-103-BIO-FATTY-ACID-OXIDATION: the catabolic mirror of this article, in the opposite compartment
ART-103-BIO-PLASMA-LIPOPROTEINS: how the triacylglycerol made here leaves the liver
ART-103-BIO-CHOLESTEROL-METABOLISM: the other anabolic pathway that starts from acetyl-CoA and is regulated the same way

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
kau: Lipid metabolism is one of the six chapters the Biochemistry department names for the end-of-module MCQ exam, and none of this article's material appears in its cancelled-items table.

## annotations
### definition_of · CON-FND-2F3A652B8E3104
Quote: Acetyl-CoA carboxylase adds CO2 to acetyl-CoA to make malonyl-CoA, carrying biotin as the group that ferries the CO2.
Block: body

### mechanism_step_before · CON-FND-FCFC1B5A95695E
Quote: The carbon arrives by shuttle.
Block: body

## media

## media_recommendations
### diagram · Mechanism
Brief: The citrate shuttle across the inner mitochondrial membrane, showing citrate out, ATP-citrate lyase splitting it, oxaloacetate reduced to malate and returning, and malic enzyme producing NADPH on the return limb
Purpose: Teaches CON-FND-FCFC1B5A95695E and CON-FND-4C05D459E80AEF together. The point students miss is that the same loop supplies both the carbon and part of the reducing power, and that only becomes visible when both limbs are drawn.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed biochemistry text
Rights: must be CC-BY or public domain

### comparison table · Clinical significance
Brief: Tissue fat against depot fat on four rows — site, main function, composition, and effect of diet
Purpose: Teaches CON-FND-69437CF1F5CCC0. The department book prints this as a table and the examiner sets the two against each other; prose loses the row-by-row contrast that makes it answerable.
Priority: strongly helpful
Status: needed
Section: Clinical significance

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Department of Biochemistry book for module 103 (src_300847a5fa64809d6c07), file pages 58 to 64.
Kasr Al Ainy Department of Biochemistry MCQ book (src_07f0a0ff41addf826c7f), Lipid Metabolism chapter, printed pages 102 to 104.

## evidence_gaps
No claim or citation is attached to any sentence in this article yet; the evidence chain is owed and is named in the hand-off report.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written to carry the eleven lipogenesis, triacylglycerol and lipolysis MCQs in ../question/103-BMS-MCQ-lipid-diabetes.md.

## field_notes
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this article where nothing else lives.
microtopicId: The canonical tree stops at topic level under DIS-BIO for the purposes of the validator, and the department book's own section name is carried by module_subject instead.
questionIds: Written [clear]. The 79 MCQs in ../question/103-BMS-MCQ-lipid-diabetes.md name this article in their library_ids, but question IDs are assigned at import and naming them here before they exist would be inventing IDs.
media: Written [clear]. No rights-cleared asset exists for any of this material; what is needed is requested in media_recommendations instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: Written [clear] and owed. All 28 claims in ../evidence/103-BMS-biochemistry-claims.md were read and none asserts this article's content; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files and mints no claim or citation IDs, so the evidence chain is owed and is named in the hand-off report.
spanIds: Written [clear] and owed, for the same reason as claimIds. A span must name the claim and citation it rests on, and neither exists yet. The audit will report articleData.spanIds missing; that is a known failure for the lead to close, not an oversight.

---

# Item

## id
ART-103-BIO-KETONE-BODY-METABOLISM

## title
Ketogenesis and ketolysis: why the liver makes ketone bodies it cannot use

## arabic_title
تخليق الأجسام الكيتونية واستهلاكها

## aliases
Ketogenesis
Ketolysis
Ketone bodies
HMG-CoA synthase
Thiophorase
Acetoacetate

## subject
endo

## topic
Lipid metabolism

## subtopic
Metabolism of ketone bodies

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T03

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

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
Ketone bodies are the body's way of making fat available to tissues that cannot use fat. The liver builds them and, uniquely, cannot burn them; every other tissue can. That division of labour rests on two enzymes the liver has and one it lacks, and it is what allows the brain to survive prolonged starvation on something other than glucose.

## sections
### Definition
The ketone bodies are acetoacetate, 3(beta)-hydroxybutyrate and acetone: small, water-soluble molecules built from acetyl-CoA. Ketogenesis is their synthesis, ketolysis their complete oxidation to CO2 and water.

Acetyl-CoA is not one of them. It is the raw material they are made from, and it is neither small enough nor soluble enough to do their job.

### Mechanism
Ketogenesis happens in the mitochondria of the liver, because HMG-CoA synthase and HMG-CoA lyase are found chiefly there. Two acetyl-CoA condense to acetoacetyl-CoA by ketothiolase; HMG-CoA synthase adds a third acetyl-CoA to give 3-hydroxy-3-methylglutaryl-CoA; HMG-CoA lyase cleaves it, releasing acetoacetate and returning one acetyl-CoA. Acetoacetate is then reduced to 3-hydroxybutyrate, a reaction driven by the NADH that heavy beta-oxidation generates, or decarboxylates spontaneously to acetone, which is volatile and leaves in the breath and urine.

Cholesterol synthesis passes through the same HMG-CoA, but in the cytosol and then by a reductase. The compartment is what decides whether HMG-CoA becomes a ketone body or a sterol.

Ketolysis happens in the mitochondria of extrahepatic tissues, because thiophorase — succinyl-CoA acetoacetate CoA-transferase — is active there and deficient in the liver. 3-hydroxybutyrate is oxidised back to acetoacetate, thiophorase activates it using succinyl-CoA from the citric acid cycle, and ketothiolase splits the product into two acetyl-CoA for the cycle. Ketolysis therefore depends on the citric acid cycle at both ends.

### Key determinants
The building unit is the acetyl-CoA that beta-oxidation supplies, and to a much lesser extent ketogenic amino acids. Ketogenesis accelerates whenever the anti-insulin to insulin ratio rises, for three reasons that act together: lipolysis releases more fatty acids to the liver; beta-oxidation raises acetyl-CoA, NADH, FADH2 and ATP, which inhibit glycolysis and the citric acid cycle; and gluconeogenesis drains the oxaloacetate that citrate synthase would need, so acetyl-CoA is diverted.

The energy yield is worth holding because it explains why the two useful ketone bodies differ: acetoacetate gives 19 ATP — 20 from two acetyl-CoA in the citric acid cycle, less one for activation — and 3-hydroxybutyrate gives 21.5, because oxidising it back to acetoacetate generates one extra NADH.

### Clinical significance
Ketone bodies matter because of what they let the brain do. Plasma fatty acids travel bound to albumin and cannot cross the blood–brain barrier, so the brain cannot burn fat at any stage. After five to six days of starvation it adapts to ketone bodies, taking about a third of its energy from them, and after several weeks they become its major fuel. Every gram of glucose the brain does not consume is a gram the liver does not have to make from muscle protein, so the switch spares body protein and is what makes prolonged starvation survivable.

Because they are water-soluble, ketone bodies need neither albumin nor a lipoprotein, so peripheral tissues take them up more easily than fatty acids.

The same pathway becomes pathological when it outruns ketolysis. Acetoacetate and 3-hydroxybutyrate are acids, so their accumulation produces acidosis, and in severe uncontrolled diabetes that is diabetic ketoacidosis.

### Common misconceptions
Naming acetyl-CoA as a ketone body, and assuming that the liver burns what it makes. It cannot, because it lacks thiophorase — and that inability is not a defect but the design, since a liver that consumed its own ketone bodies would export none.

## published_summary

## published_sections

## hold_these
The three ketone bodies are acetoacetate, 3-hydroxybutyrate and acetone; acetyl-CoA is not one of them.
Ketogenesis is hepatic because the liver has HMG-CoA synthase and lyase; ketolysis is extrahepatic because the liver lacks thiophorase.
HMG-CoA in the mitochondrion becomes a ketone body; in the cytosol it becomes cholesterol.
The brain cannot use fatty acids because they travel bound to albumin, which cannot cross the blood–brain barrier.

## lose_the_mark
Calling acetyl-CoA a ketone body.
Answering that ketone bodies are hydrophobic — their water solubility is the whole advantage.
Naming thiophorase and ketothiolase as the enzymes that make the liver ketogenic; thiophorase is the one the liver lacks.
Writing HMG-CoA reductase into the ketogenesis pathway; that is the cholesterol enzyme, in the cytosol.

## callout_evidence

## related_concepts
CON-END-2E748A37DA660A

## related_articles
ART-103-BIO-KETOSIS: the pathological state this pathway produces when it outruns ketolysis, and its causes
ART-103-BIO-FATTY-ACID-OXIDATION: the source of the acetyl-CoA these molecules are built from
ART-103-BIO-FEED-STARVE-CYCLE: the starvation stage at which the brain switches to them

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
kau: The Biochemistry department names four diagrams from this section among its twenty-two "Diagrams to be studied" — Ketogenesis (printed 67), Ketolysis (68), Metabolism of Ketone Bodies (70) and, adjacent to them, Carnitine Shuttle (63). Nothing here is cancelled.

## annotations
### definition_of · CON-END-2E748A37DA660A
Quote: Ketolysis happens in the mitochondria of extrahepatic tissues, because thiophorase — succinyl-CoA acetoacetate CoA-transferase — is active there and deficient in the liver.
Block: body

## media

## media_recommendations
### flowchart · Mechanism
Brief: Ketogenesis and ketolysis side by side, the left panel in a liver mitochondrion naming HMG-CoA synthase and HMG-CoA lyase, the right panel in an extrahepatic mitochondrion naming thiophorase, with the blood between them carrying the ketone bodies one way only
Purpose: Teaches CON-END-2E748A37DA660A. The single hardest idea here is that the traffic is one-directional because of one missing enzyme, and a student cannot hold that from prose alone. The department names the ketogenesis and ketolysis diagrams as examinable.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed biochemistry text
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Department of Biochemistry book for module 103 (src_300847a5fa64809d6c07), file pages 69 to 72.
Kasr Al Ainy Department of Biochemistry MCQ book (src_07f0a0ff41addf826c7f), Lipid Metabolism chapter, printed pages 104 to 105.

## evidence_gaps
No claim or citation is attached to any sentence in this article yet; the evidence chain is owed and is named in the hand-off report.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written for CON-END-2E748A37DA660A, which is deliberately distinct from the existing CON-END-CC450A236ABF50 on the causes of ketosis. That concept is taught by ART-103-BIO-KETOSIS, a pending batch file this lane does not own; the back-link from that article to this concept is owed and is named in the hand-off report.

## field_notes
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this article where nothing else lives.
microtopicId: The canonical tree stops at topic level under DIS-BIO for the purposes of the validator, and the department book's own section name is carried by module_subject instead.
questionIds: Written [clear]. The 79 MCQs in ../question/103-BMS-MCQ-lipid-diabetes.md name this article in their library_ids, but question IDs are assigned at import and naming them here before they exist would be inventing IDs.
media: Written [clear]. No rights-cleared asset exists for any of this material; what is needed is requested in media_recommendations instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: Written [clear] and owed. All 28 claims in ../evidence/103-BMS-biochemistry-claims.md were read and none asserts this article's content; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files and mints no claim or citation IDs, so the evidence chain is owed and is named in the hand-off report.
spanIds: Written [clear] and owed, for the same reason as claimIds. A span must name the claim and citation it rests on, and neither exists yet. The audit will report articleData.spanIds missing; that is a known failure for the lead to close, not an oversight.

---

# Item

## id
ART-103-BIO-CHOLESTEROL-METABOLISM

## title
Cholesterol: making it, regulating it, and reading the plasma level

## arabic_title
أيض الكوليسترول: تخليقه وتنظيمه وقراءة مستواه في البلازما

## aliases
Cholesterol metabolism
HMG-CoA reductase
Hypercholesterolaemia
Statins
Bile acids
Plasma cholesterol

## subject
gi

## topic
Lipid metabolism

## subtopic
Cholesterol metabolism

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T07

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Cholesterol Metabolism

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
8

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
Cholesterol is made from acetyl-CoA in every nucleated cell, and one enzyme controls the rate. Because the body has no way of breaking the sterol ring down, the plasma level is set by how fast it is made and how fast it leaves in bile — which is why a thyroid disorder, a blocked bile duct and a defective receptor all show up in the same number.

## sections
### Definition
Cholesterol is a 27-carbon sterol, a constituent of plasma membranes, a component of lipoproteins, and the precursor of vitamin D3, of all the steroid hormones, and of the bile acids. It comes from the diet — brain, eggs, liver, kidney, butter and meat — and from endogenous synthesis, which uses acetyl-CoA as the source of every one of its carbons.

### Mechanism
Synthesis occurs in the cytosol and endoplasmic reticulum of all nucleated cells, and plasma cholesterol is made in liver and intestine. The pathway begins exactly as ketogenesis does, forming HMG-CoA from three acetyl-CoA — but in the cytosol rather than the mitochondrion, and the compartment is what decides the fate of the molecule.

The rate-limiting reaction follows: HMG-CoA reductase reduces HMG-CoA to mevalonate, consuming two NADPH. Mevalonate, a six-carbon molecule, then undergoes condensation and cyclisation through isoprenoid units and lanosterol to cholesterol.

Excretion is the other half of the balance, and there is no third option: the sterol ring is never degraded in humans. Cholesterol leaves in bile, as bile salts and as cholesterol itself. 7-alpha-hydroxylase catalyses the rate-limiting first step of bile acid synthesis, requires vitamin C, is activated by cholesterol and by thyroid hormones and inhibited by bile acids. Cholic and chenodeoxycholic acids are conjugated with glycine or taurine and secreted as sodium and potassium salts, which emulsify dietary fat; intestinal bacteria dehydroxylate them to the secondary bile acids, and more than 95% are reabsorbed in the ileum and returned to the liver.

### Key determinants
HMG-CoA reductase is where all the control sits, and it is regulated four ways. Covalently, it is active dephosphorylated and inactive phosphorylated, with AMP-activated protein kinase doing the phosphorylating — so a cell short of energy stops making cholesterol. Hormonally, insulin induces the gene and activates the protein phosphatase that dephosphorylates the enzyme, while glucagon represses the gene. Allosterically, cholesterol itself inhibits the enzyme. Transcriptionally, cholesterol also represses it.

Statins inhibit it competitively, because they are structural analogues of HMG-CoA.

The regulation is worth comparing directly with acetyl-CoA carboxylase in the fatty acid article: same phosphorylation logic, same hormonal directions, same principle that the first committed step is the regulated one.

### Normal values
Total plasma cholesterol ranges from 120 to 200 mg/dL, about two thirds as cholesteryl ester and one third free. Hypercholesterolaemia means a level above 200 mg/dL. Total fasting plasma lipid, after 12 hours, ranges from 400 to 700 mg/dL.

### Clinical significance
The department book names six causes of hypercholesterolaemia and each is a different point on the same balance. Diet rich in saturated fat, carbohydrate and cholesterol, and obesity, increase supply. Diabetes mellitus acts three ways at once — excess acetyl-CoA from increased fatty acid oxidation, increased hepatic triacylglycerol and VLDL synthesis, and reduced lipoprotein lipase activity. Hypothyroidism slows the conversion of cholesterol to bile acids. Obstructive jaundice blocks the only exit. And the familial hyperlipoproteinaemias, of which familial hypercholesterolaemia is the example, block hepatic LDL uptake.

The thyroid works in both directions, which is why it is examined in both: hyperthyroidism accelerates the conversion to bile acids and lowers plasma cholesterol, and hypothyroidism raises it.

The fraction that carries the excess is LDL, which is why hypercholesterolaemia means a high LDL and why LDL is called the bad cholesterol.

### Common misconceptions
Believing that cholesterol can be broken down for energy or otherwise degraded. It cannot: the ring leaves the body intact, in bile. Once that is held, obstructive jaundice, the thyroid effect and the action of the bile acid pathway all follow from one fact rather than three.

## published_summary

## published_sections

## hold_these
HMG-CoA reductase converting HMG-CoA to mevalonate is the rate-limiting step of cholesterol synthesis.
The enzyme is active dephosphorylated; insulin activates the phosphatase, glucagon represses the gene, cholesterol inhibits and represses it.
Cholesterol is never degraded in humans; it leaves only in bile, as bile salts or as cholesterol.
Hyperthyroidism lowers plasma cholesterol and hypothyroidism raises it, both through the rate of bile acid formation.

## lose_the_mark
Naming the formation of HMG-CoA as the regulatory step; it is a branch point, not a commitment.
Saying insulin activates the kinase that phosphorylates HMG-CoA reductase — it activates the phosphatase.
Answering that a cholesterol degradative pathway is impaired in familial hypercholesterolaemia; no such pathway exists.
Putting HMG-CoA reductase into the mitochondrial ketogenesis pathway.

## callout_evidence

## related_concepts
CON-GIT-3A348EEAF118BD | CON-GIT-E6AEB25F31B529

## related_articles
ART-103-BIO-PLASMA-LIPOPROTEINS: the particles that carry this cholesterol, and the receptor defect that raises it
ART-103-BIO-KETONE-BODY-METABOLISM: the other fate of HMG-CoA, decided by the compartment
ART-103-BIO-LIPOPROTEIN-MACHINERY: LCAT, which esterifies the cholesterol HDL collects

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
kau: The Biochemistry department names the Biosynthesis of Bile Acid diagram on printed page 74 among its examinable diagrams. Cholesterol metabolism is part of the Lipid metabolism chapter, which is one of the six named for the end-of-module MCQ exam, and none of it is in the cancelled-items table.

## annotations
### definition_of · CON-GIT-3A348EEAF118BD
Quote: The rate-limiting reaction follows: HMG-CoA reductase reduces HMG-CoA to mevalonate, consuming two NADPH.
Block: body

### causes · CON-GIT-E6AEB25F31B529
Quote: The thyroid works in both directions, which is why it is examined in both: hyperthyroidism accelerates the conversion to bile acids and lowers plasma cholesterol, and hypothyroidism raises it.
Block: body

## media

## media_recommendations
### diagram · Key determinants
Brief: HMG-CoA reductase in its active dephosphorylated and inactive phosphorylated states, with insulin and the protein phosphatase on one side, AMP-activated kinase and glucagon on the other, and cholesterol shown both inhibiting allosterically and repressing the gene
Purpose: Teaches CON-GIT-3A348EEAF118BD. Four control mechanisms act on one enzyme and students conflate them; only a single figure showing all four converging makes the arrangement legible.
Priority: required
Status: needed
Section: Key determinants
Source direction: openly licensed biochemistry text
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Department of Biochemistry book for module 103 (src_300847a5fa64809d6c07), file pages 73 to 76.
Kasr Al Ainy Department of Biochemistry MCQ book (src_07f0a0ff41addf826c7f), Lipid Metabolism chapter, printed pages 105 to 107.

## evidence_gaps
No claim or citation is attached to any sentence in this article yet; the evidence chain is owed and is named in the hand-off report.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written to carry the four cholesterol MCQs. Statins are named as a class with a mechanism and no dose, because the department book states none; the article is Draft and must not auto-publish.

## field_notes
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this article where nothing else lives.
microtopicId: The canonical tree stops at topic level under DIS-BIO for the purposes of the validator, and the department book's own section name is carried by module_subject instead.
questionIds: Written [clear]. The 79 MCQs in ../question/103-BMS-MCQ-lipid-diabetes.md name this article in their library_ids, but question IDs are assigned at import and naming them here before they exist would be inventing IDs.
media: Written [clear]. No rights-cleared asset exists for any of this material; what is needed is requested in media_recommendations instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: Written [clear] and owed. All 28 claims in ../evidence/103-BMS-biochemistry-claims.md were read and none asserts this article's content; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files and mints no claim or citation IDs, so the evidence chain is owed and is named in the hand-off report.
spanIds: Written [clear] and owed, for the same reason as claimIds. A span must name the claim and citation it rests on, and neither exists yet. The audit will report articleData.spanIds missing; that is a known failure for the lead to close, not an oversight.

---

# Item

## id
ART-103-BIO-LIPOPROTEIN-MACHINERY

## title
Apolipoproteins and lipoprotein lipase: the labels on the particle and the enzyme that empties it

## arabic_title
البروتينات الدهنية الظاهرية وإنزيم ليباز البروتين الدهني

## aliases
Apolipoproteins
Lipoprotein lipase
Apo B-100
Apo A-I
Apo C-II
LCAT
Lipoprotein density
Lp(a)

## subject
gi

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T07

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

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
A lipoprotein is a lipid cargo wrapped in a protein address label. The labels decide which receptor takes the particle up and which enzyme is allowed to open it; the protein content decides the particle's density and therefore its name. Learn the labels and the density series, and most of this chapter answers itself.

## sections
### Definition
A lipoprotein carries the most hydrophobic lipids — triacylglycerol and cholesteryl ester — in a core, surrounded by a monolayer of amphipathic phospholipid and free cholesterol together with apolipoproteins. Integral apolipoproteins such as apo B cannot be removed; peripheral ones such as apo C and apo E can.

The classes are chylomicrons, VLDL, IDL, LDL and HDL, plus free fatty acid bound to albumin, which is separated in the same ultracentrifugation run but is not a lipoprotein.

### Mechanism
The apolipoproteins do four jobs. They are structural elements of the particle. They activate enzymes: apo C-II activates lipoprotein lipase. They bind cell-surface receptors and so direct the particle to its destination: apo B-100 to the LDL receptor, apo A-I to the hepatic HDL receptor, apo E for chylomicron remnant and IDL uptake. And they transfer lipid between particles, exchanging triacylglycerol for cholesteryl ester.

Lipoprotein lipase is anchored to the luminal surface of the capillary endothelium in extrahepatic tissues — adipose tissue above all, and also skeletal and cardiac muscle — facing the blood, because a lipoprotein particle is far too large to be taken into a cell whole. It hydrolyses core triacylglycerol into free fatty acids and glycerol, removing about 90% of a chylomicron's load and about 50% of VLDL's. Insulin induces it; apo C-II, lent by HDL, activates it; heparin displaces it from its anchor into the circulation.

LCAT completes reverse cholesterol transport. It transfers an acyl group from lecithin onto free cholesterol, and that single change traps the molecule: free cholesterol is amphipathic and sits in the surface where it could drift back out, while the ester is hydrophobic and sinks into the core. Discoidal HDL becomes spherical HDL, and the gradient that pulls more cholesterol off the tissues is maintained.

### Key determinants
Protein content orders the whole family, and because protein is the densest component the order of protein is the order of density: chylomicrons 2% protein and 98% lipid, mainly triacylglycerol; VLDL 10% and 90%, mainly triacylglycerol; IDL 10% and 90%; LDL 20% and 80%, mainly cholesteryl ester; HDL 45% and 55%, mainly phospholipid and cholesteryl ester. Size runs the other way, so the chylomicron is the largest and least dense.

Source and function follow from position. Chylomicrons are made by intestinal cells and carry dietary lipid; apo B-48 marks them and marks nothing else. VLDL is made by liver cells and carries hepatic triacylglycerol out; apo B-100 marks it and stays on the particle through IDL to LDL as apo C and apo E are progressively removed. LDL delivers cholesterol to tissues and is the bad cholesterol. HDL is made by liver and intestine, returns cholesterol to the liver, and is the good one.

### Clinical significance
Because apo B-100 is the ligand for the LDL receptor, a defective receptor leaves LDL uncleared and plasma cholesterol rises — familial hypercholesterolaemia. Because apo B is needed to build the particles at all, a failure to synthesise it gives abetalipoproteinaemia, with defective chylomicron formation producing fatty diarrhoea and defective VLDL formation producing fatty liver.

Because lipoprotein lipase is induced by insulin, insulin deficiency lowers its activity and triacylglycerol-rich lipoproteins are not cleared — the mechanism of diabetic dyslipidaemia.

Lipoprotein(a) is a modified LDL carrying apolipoprotein(a), which structurally resembles plasminogen. It competes with plasminogen without being convertible to plasmin, so it slows fibrinolysis, and it is a marker of raised coronary risk that links the lipid and coagulation halves of atherosclerosis.

### Common misconceptions
Knowing that apo E sits on HDL and concluding that apo E binds the HDL receptor. Being present on a particle is not the same as being the ligand for that particle's uptake — apo A-I does that job, and apo E clears remnants and IDL. The other frequent error is confusing lipoprotein lipase with hormone-sensitive lipase, which insulin moves in the opposite direction.

## published_summary

## published_sections

## hold_these
Apo B-48 marks a chylomicron and apo B-100 marks VLDL, IDL and LDL — the number says gut or liver.
Apo A-I binds the HDL receptor, apo B-100 the LDL receptor, apo E clears remnants, apo C-II activates lipoprotein lipase.
More protein means denser: chylomicron 2%, VLDL 10%, LDL 20%, HDL 45%.
LCAT esterifies cholesterol so it sinks into the HDL core, which is what keeps reverse cholesterol transport running.

## lose_the_mark
Naming apo E as the ligand for HDL uptake because apo E is present on HDL.
Confusing lipoprotein lipase with hormone-sensitive lipase; insulin induces the first and inhibits the second.
Answering "cholesterol" rather than "cholesterol esters" for what is exchanged with triacylglycerol — only core lipid is exchanged, and free cholesterol is not core lipid.
Saying heparin induces lipoprotein lipase synthesis; it displaces the existing enzyme from its endothelial anchor, which is why it acts in minutes.

## callout_evidence

## related_concepts
CON-GIT-6CB618DBA50596 | CON-GIT-ECB3C2F56DC72D | CON-GIT-99EF5E989B0C65

## related_articles
ART-103-BIO-PLASMA-LIPOPROTEINS: the particles themselves, their fates, and the disorders of them
ART-103-BIO-CHOLESTEROL-METABOLISM: where the cholesterol these particles carry is made and how it leaves
ART-103-BIO-DIABETES-MELLITUS: what happens to this machinery when insulin fails

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
kau: Three of the Biochemistry department's twenty-two examinable diagrams come from this section — Metabolism of chylomicron (printed 77), Metabolism of VLDL (78) and Metabolism of HDL (79). None of this material is cancelled. Note that the department textbook itself does not use the names LCAT, CETP or Lp(a); the department question book examines all three.

## annotations
### definition_of · CON-GIT-ECB3C2F56DC72D
Quote: Protein content orders the whole family, and because protein is the densest component the order of protein is the order of density: chylomicrons 2% protein and 98% lipid, mainly triacylglycerol; VLDL 10% and 90%, mainly triacylglycerol; IDL 10% and 90%; LDL 20% and 80%, mainly cholesteryl ester; HDL 45% and 55%, mainly phospholipid and cholesteryl ester.
Block: body

### mechanism_step_before · CON-GIT-6CB618DBA50596
Quote: Insulin induces it; apo C-II, lent by HDL, activates it; heparin displaces it from its anchor into the circulation.
Block: body

## media

## media_recommendations
### comparison table · Key determinants
Brief: The five lipoprotein classes in density order with four columns — protein percentage, lipid percentage and dominant lipid, source, and main function
Purpose: Teaches CON-GIT-ECB3C2F56DC72D. The department book prints this table and the examiner asks about relative density, protein content and function separately; the whole point is that they are one ordered series, which a table shows and prose does not.
Priority: required
Status: needed
Section: Key determinants
Source direction: openly licensed biochemistry text
Rights: must be CC-BY or public domain

### diagram · Mechanism
Brief: Reverse cholesterol transport — discoidal HDL accepting free cholesterol from a peripheral cell, LCAT esterifying it into a core, the particle becoming spherical, and apo A-I binding the hepatic receptor
Purpose: Teaches CON-GIT-99EF5E989B0C65. Why esterification traps the molecule is a spatial argument about the surface and the core, and a student cannot see it without the two forms of the particle drawn side by side.
Priority: required
Status: needed
Section: Mechanism

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Department of Biochemistry book for module 103 (src_300847a5fa64809d6c07), file pages 77 to 82, including the "Main Characteristics of Different Lipoproteins" table on file page 82.
Kasr Al Ainy Department of Biochemistry MCQ book (src_07f0a0ff41addf826c7f), Lipid Metabolism chapter, printed pages 104 to 107.

## evidence_gaps
No claim or citation is attached to any sentence in this article yet; the evidence chain is owed and is named in the hand-off report.

## conflicts
The department textbook attributes the transfer of triacylglycerol in exchange for cholesteryl esters to apo D; the department question book attributes the same exchange to cholesteryl ester transfer protein. Both describe the same reaction. This article states the exchange and names both attributions rather than choosing between two department sources.

## last_reviewed

## review_due

## notes
Written to carry the twelve lipoprotein and apolipoprotein MCQs. It is deliberately distinct from ART-103-BIO-PLASMA-LIPOPROTEINS, which is a pending batch file this lane does not own: that article teaches the particles and their disorders, this one teaches the proteins and enzymes that act on them. Cross-links exist from here; the reciprocal related_articles entry there is owed.

## field_notes
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this article where nothing else lives.
microtopicId: The canonical tree stops at topic level under DIS-BIO for the purposes of the validator, and the department book's own section name is carried by module_subject instead.
questionIds: Written [clear]. The 79 MCQs in ../question/103-BMS-MCQ-lipid-diabetes.md name this article in their library_ids, but question IDs are assigned at import and naming them here before they exist would be inventing IDs.
media: Written [clear]. No rights-cleared asset exists for any of this material; what is needed is requested in media_recommendations instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: Written [clear] and owed. All 28 claims in ../evidence/103-BMS-biochemistry-claims.md were read and none asserts this article's content; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files and mints no claim or citation IDs, so the evidence chain is owed and is named in the hand-off report.
spanIds: Written [clear] and owed, for the same reason as claimIds. A span must name the claim and citation it rests on, and neither exists yet. The audit will report articleData.spanIds missing; that is a known failure for the lead to close, not an oversight.

---

# Item

## id
ART-103-BIO-EICOSANOIDS

## title
Eicosanoids: what arachidonic acid becomes, and where aspirin acts

## arabic_title
الإيكوسانويدات: مشتقات حمض الأراكيدونيك وموضع تأثير الأسبرين

## aliases
Eicosanoids
Prostaglandins
Thromboxane
Leukotrienes
Cyclooxygenase
Arachidonic acid

## subject
fnd

## topic
Lipid metabolism

## subtopic
Eicosanoids

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T07

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
5

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
Eicosanoids are twenty-carbon signalling lipids made from one precursor down two branches. Knowing which branch a drug acts on explains why aspirin stops pain and platelet aggregation but can worsen asthma, and why a steroid does something broader. This is a short article because the department textbook carries none of this material and the question book examines it.

## sections
### Definition
Eicosanoids are twenty-carbon signalling lipids — the name is from the Greek eikosi, twenty — derived from arachidonic acid. They comprise the prostaglandins, thromboxanes and prostacyclin from one branch, and the leukotrienes from the other.

They are not stored. They are made on demand from membrane phospholipid, act locally, and are degraded quickly.

### Mechanism
Arachidonic acid is released from membrane phospholipid by phospholipase A2, and this is the step that decides how much substrate is available. It then takes one of two branches. The cyclooxygenase branch produces prostaglandins, thromboxanes and prostacyclin. The lipoxygenase branch produces leukotrienes.

Drugs act at three different levels of that scheme, and the level is what distinguishes them. Aspirin inhibits cyclooxygenase, so it blocks the first branch and leaves the second intact. Glucocorticoids inhibit phospholipase A2, upstream of the split, so arachidonic acid is never released and both branches are shut down. Montelukast blocks the leukotriene receptor, downstream of synthesis on the second branch.

### Key determinants
Thromboxane, made by platelets, promotes platelet aggregation and vasoconstriction; prostacyclin, made by endothelium, does the opposite. Prostaglandins mediate pain, fever and inflammation. Leukotrienes mediate bronchoconstriction and are central to asthma.

The branch structure is what makes the pharmacology predictable. Because aspirin blocks only the cyclooxygenase side, arachidonic acid can be shunted towards the lipoxygenase side, which is one explanation for aspirin-sensitive asthma.

### Clinical significance
The antiplatelet effect of aspirin follows directly from the pathway: platelets make thromboxane through cyclooxygenase, thromboxane promotes aggregation, and inhibiting the enzyme reduces it. The anti-inflammatory and antipyretic effects follow from the loss of prostaglandins.

This is also the clearest example on the syllabus of why the level at which a drug acts matters more than the pathway it belongs to: three drugs, one pathway, three different clinical profiles.

### Common misconceptions
Sorting these molecules by whether they sound like lipids. Gangliosides and ceramide are sphingolipids and structural; choline is a phospholipid head group. Only a twenty-carbon derivative of arachidonic acid is an eicosanoid, and the name itself says so.

## published_summary

## published_sections

## hold_these
Arachidonic acid is the precursor; cyclooxygenase gives prostaglandins and thromboxanes, lipoxygenase gives leukotrienes.
Aspirin inhibits cyclooxygenase; a glucocorticoid inhibits phospholipase A2 upstream and shuts down both branches.
Thromboxane is made by platelets and promotes aggregation, which is why a cyclooxygenase inhibitor is antiplatelet.
Eicosa means twenty: if it is not a twenty-carbon derivative of arachidonic acid it is not an eicosanoid.

## lose_the_mark
Naming a leukotriene receptor antagonist as a cyclooxygenase inhibitor because both concern eicosanoids.
Calling a ganglioside or ceramide an eicosanoid because it is a lipid.
Answering that steroids inhibit cyclooxygenase; they act one step earlier, on phospholipase A2.

## callout_evidence

## related_concepts
CON-FND-90496D64322904

## related_articles
ART-103-BIO-LIPOPROTEIN-MACHINERY: the other half of the lipid chapter the question book examines beyond the textbook

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
kau: This material appears NOWHERE in the Kasr Al Ainy Department of Biochemistry book for module 103 — its 160 pages were searched for "eicosanoid", "prostaglandin", "thromboxane" and "cyclooxygenase" and none of the four occurs. The department QUESTION book examines it in two items. A faculty reviewer must decide whether this is examinable material the textbook omits, or question-book material outside the 103 syllabus.

## annotations
### definition_of · CON-FND-90496D64322904
Quote: The cyclooxygenase branch produces prostaglandins, thromboxanes and prostacyclin. The lipoxygenase branch produces leukotrienes.
Block: body

## media

## media_recommendations
### flowchart · Mechanism
Brief: Membrane phospholipid to arachidonic acid by phospholipase A2, then the split into the cyclooxygenase and lipoxygenase branches with their products, and the three drug classes arrowed to the exact step each blocks
Purpose: Teaches CON-FND-90496D64322904. The whole clinical point is which step each drug acts on, and a branching diagram with three labelled arrows carries that where a paragraph cannot.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology or biochemistry text
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Department of Biochemistry MCQ book (src_07f0a0ff41addf826c7f), Lipid Metabolism chapter, printed page 104, items 28 and 29 — the only department source in this corpus that carries this material at all.

## evidence_gaps
The department textbook contains none of this material, so nothing in this article can be cited to it. No claim or citation is attached to any sentence in this article yet; the evidence chain is owed and is named in the hand-off report.

## conflicts
The department's two sources disagree by omission: the question book examines eicosanoids and the textbook does not mention them. Recorded rather than resolved.

## last_reviewed

## review_due

## notes
Deliberately short and marked Supplementary rather than Core. It exists because two MCQs need an article that teaches their concept, and library_ids may not be empty; it does not claim more coverage than the sources support. Drug mechanisms only — no dose appears, because no source in this corpus states one.

## field_notes
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this article where nothing else lives.
microtopicId: The canonical tree stops at topic level under DIS-BIO for the purposes of the validator, and the department book's own section name is carried by module_subject instead.
questionIds: Written [clear]. The 79 MCQs in ../question/103-BMS-MCQ-lipid-diabetes.md name this article in their library_ids, but question IDs are assigned at import and naming them here before they exist would be inventing IDs.
media: Written [clear]. No rights-cleared asset exists for any of this material; what is needed is requested in media_recommendations instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: Written [clear] and owed. All 28 claims in ../evidence/103-BMS-biochemistry-claims.md were read and none asserts this article's content; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files and mints no claim or citation IDs, so the evidence chain is owed and is named in the hand-off report.
spanIds: Written [clear] and owed, for the same reason as claimIds. A span must name the claim and citation it rests on, and neither exists yet. The audit will report articleData.spanIds missing; that is a known failure for the lead to close, not an oversight.

---

# Item

## id
ART-103-BIO-FEED-STARVE-CYCLE

## title
The feed–starve cycle: four stages and the fuel each one runs on

## arabic_title
دورة الشبع والصيام: أربع مراحل ووقود كل منها

## aliases
Feed-starve cycle
Metabolic integration
Well-fed state
Fasting state
Starvation
Glucose-alanine cycle

## subject
fnd

## topic
Metabolic integration

## subtopic
Feed-starve cycle

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T04

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolic Integrations

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

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
Every pathway in the biochemistry course meets here. The feed–starve cycle is four stages, and each is defined by one fuel, one dominant hormone and one source of blood glucose. Read as a sequence — dietary glucose, hepatic glycogen, fatty acids, ketone bodies — it turns the whole of metabolism into a single story with a clear plot.

## sections
### Definition
The feed–starve cycle is the integration of carbohydrate, lipid and protein metabolism across liver, adipose tissue, muscle and brain, through four stages: well-fed (0–4 hours), early fasting (4–18 hours), late fasting (18–48 hours) and starvation (beyond 48 hours). Its goals are ATP production and glucose homeostasis.

### Mechanism
In the well-fed state the meal breaks down to glucose, amino acids and fatty acids; water-soluble products enter the blood directly and insoluble ones arrive as chylomicrons through the lymph. Insulin rises and glucagon falls. Muscle and adipose tissue take glucose up through GLUT-4; the liver takes it up through GLUT-2 in proportion to how much arrives. Liver increases glycolysis, glycogenesis, lipogenesis and cholesterol synthesis; muscle increases glycolysis, glycogenesis and amino acid incorporation into protein; adipose tissue increases glycolysis and lipogenesis and decreases lipolysis.

In early fasting glucose falls, insulin falls and glucagon rises. Blood glucose is maintained first by hepatic glycogenolysis, and free fatty acid release from adipose tissue begins to fuel other tissues. Glycogen is used first because it is already glucose — fast, and almost free.

In late fasting the anti-insulin hormones predominate, glycogen is significantly depleted, and the body switches from glucose-burning to fat-burning. Gluconeogenesis maintains blood glucose; lipolysis and hepatic beta-oxidation dominate; ketogenesis begins.

In starvation the liver makes large amounts of ketone bodies. The kidney becomes an important site of gluconeogenesis, contributing as much as half the blood glucose, and circulating glucose does not fall below 70 mg/dL.

### Key determinants
Two rules constrain everything and both are examined directly.

The brain is never affected by falling insulin, because its glucose uptake is insulin-independent — which is why glucose must be maintained for it at every stage, and why the whole cycle is organised around protecting it.

Muscle glycogenolysis cannot contribute directly to plasma glucose, because muscle has no glucose-6-phosphatase. What muscle exports instead is alanine: pyruvate from glycolysis is transaminated with the amino groups of degraded muscle protein, and the alanine travels to the liver, where it is transaminated back to pyruvate and rebuilt into glucose while its nitrogen enters the urea cycle. That is the glucose–alanine cycle, and it does two jobs with one carrier — moving gluconeogenic carbon and disposing of waste nitrogen without free ammonia in the blood. Lactate returns by the parallel Cori cycle.

And fatty acids never supply carbon for glucose. Acetyl-CoA cannot become glucose because pyruvate dehydrogenase is irreversible; fat supports gluconeogenesis energetically, by supplying ATP, and contributes carbon only through the glycerol backbone and the propionyl-CoA of an odd-chain fatty acid.

### Clinical significance
After two to five days of starvation the brain begins to take about a third of its energy from ketone bodies and the heart does the same, so gluconeogenesis from protein is reduced. After several weeks ketone bodies become the brain's major fuel.

That adaptation is protein-sparing, and protein-sparing is what determines survival. Survival time is set by the size of the triacylglycerol depot; once it is exhausted, protein is the only fuel left, degradation accelerates, and death follows from loss of respiratory, cardiac, hepatic or renal function.

### Common misconceptions
Believing that fat can be converted to glucose, and believing that muscle releases glucose into the blood. Both are stated wrongly in the same exam question year after year, and both are ruled out by a single enzyme — pyruvate dehydrogenase being irreversible, and muscle lacking glucose-6-phosphatase.

## published_summary

## published_sections

## hold_these
Four stages, four fuels: dietary glucose, hepatic glycogen, fatty acids, ketone bodies.
Muscle glycogenolysis cannot contribute directly to plasma glucose; muscle exports alanine instead.
Fat contributes no carbon to glucose except the glycerol backbone and the propionyl-CoA of an odd-chain fatty acid.
The brain's glucose uptake is insulin-independent, which is why it is unaffected by falling insulin.

## lose_the_mark
Writing that fatty acids released from adipose tissue provide carbon for the synthesis of glucose.
Writing that muscles convert amino acids to blood glucose — the conversion happens in the liver.
Naming ketone bodies as a gluconeogenic substrate; they are a product of the same acetyl-CoA that cannot become glucose.
Naming lysine as a glucogenic amino acid; it and leucine are the only two that are purely ketogenic.

## callout_evidence

## related_concepts
CON-FND-85583A59349A47 | CON-FND-1B027502822320

## related_articles
ART-103-BIO-KETONE-BODY-METABOLISM: the fuel the brain switches to, and why it can
ART-103-BIO-FATTY-ACID-OXIDATION: the pathway that carries the late fasting state
ART-103-BIO-KETOSIS: what happens when this cycle is pushed further than starvation pushes it

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
kau: Row 10 of the Biochemistry department's cancelled-items table for 2025-2026 reads "Metabolic integration — 109-114", cancelled from BOTH the end-of-module and the final exam, and those printed pages are exactly this chapter of the department book. The material is taught and appears in the department question book, so it is written here, but it is marked Supplementary and its concepts carry a weight_confidence of 0.15. A student revising for either 2025-2026 sitting can safely deprioritise it.

## annotations
### definition_of · CON-FND-85583A59349A47
Quote: In late fasting the anti-insulin hormones predominate, glycogen is significantly depleted, and the body switches from glucose-burning to fat-burning.
Block: body

### mechanism_step_before · CON-FND-1B027502822320
Quote: That is the glucose–alanine cycle, and it does two jobs with one carrier — moving gluconeogenic carbon and disposing of waste nitrogen without free ammonia in the blood.
Block: body

## media

## media_recommendations
### diagram · Mechanism
Brief: The four stages arranged around a clock from food consumption at 0 hours, each quadrant labelled with its hours, its main fuel, its dominant hormone and its source of blood glucose
Purpose: Teaches CON-FND-85583A59349A47. The department book draws the cycle this way, and the examinable content is the correspondence between an hour and a fuel — which a circular figure holds and a list of four paragraphs does not.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed biochemistry text
Rights: must be CC-BY or public domain

### diagram · Key determinants
Brief: The glucose-alanine cycle between muscle and liver, showing pyruvate transaminated to alanine in muscle, alanine crossing in the blood, and in the liver alanine giving pyruvate for gluconeogenesis and nitrogen for the urea cycle
Purpose: Teaches CON-FND-1B027502822320. The idea that one molecule carries two different things in the same direction is exactly what students miss, and it needs both destinations drawn on the liver side.
Priority: strongly helpful
Status: needed
Section: Key determinants

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Department of Biochemistry book for module 103 (src_300847a5fa64809d6c07), file pages 112 to 116, and the Blood Glucose section on file pages 53 to 57.
Kasr Al Ainy Department of Biochemistry MCQ book (src_07f0a0ff41addf826c7f), Metabolic integration chapter, printed pages 128 to 129.
Kasr Al Ainy Department of Biochemistry orientation for 2025-2026 (src_90b75d63a73cfc7649b9), cancelled-items table row 10, for exam status only.

## evidence_gaps
No claim or citation is attached to any sentence in this article yet; the evidence chain is owed and is named in the hand-off report.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written to carry the seven metabolic-integration MCQs. Marked Supplementary and given low weights throughout because the department cancels the topic from both 2025-2026 sittings; that is a statement about examinability, not about whether the material is taught.

## field_notes
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this article where nothing else lives.
microtopicId: The canonical tree stops at topic level under DIS-BIO for the purposes of the validator, and the department book's own section name is carried by module_subject instead.
questionIds: Written [clear]. The 79 MCQs in ../question/103-BMS-MCQ-lipid-diabetes.md name this article in their library_ids, but question IDs are assigned at import and naming them here before they exist would be inventing IDs.
media: Written [clear]. No rights-cleared asset exists for any of this material; what is needed is requested in media_recommendations instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: Written [clear] and owed. All 28 claims in ../evidence/103-BMS-biochemistry-claims.md were read and none asserts this article's content; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files and mints no claim or citation IDs, so the evidence chain is owed and is named in the hand-off report.
spanIds: Written [clear] and owed, for the same reason as claimIds. A span must name the claim and citation it rests on, and neither exists yet. The audit will report articleData.spanIds missing; that is a known failure for the lead to close, not an oversight.

---

# Item

## id
ART-103-BIO-DIABETES-MELLITUS

## title
Diabetes mellitus: the biochemistry the question book examines

## arabic_title
داء السكري: الكيمياء الحيوية التي يمتحن فيها كتاب الأسئلة

## aliases
Diabetes mellitus
Type 1 diabetes
Type 2 diabetes
HbA1c
Diabetic ketoacidosis
Hyperosmolar coma
Polyol pathway
Diagnosis of diabetes

## subject
endo

## topic
Insulin and diabetes mellitus

## subtopic
Diabetes mellitus

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
DIS-BIO-T03

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
11

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
Almost everything in diabetes follows from one sentence: every anabolic action of insulin is lost and every process insulin restrains is released. That single principle predicts the metabolic disturbance, the acute crises, the lipid profile and the chronic complications. This article assembles the material the department question book examines — much of which its own textbook does not contain.

## sections
### Definition
Diabetes mellitus is hyperglycaemia with reduced glucose tolerance, caused by impaired insulin secretion, impaired insulin action, or both.

Type 1 is an absolute deficiency following beta-cell destruction. Type 2 is insulin resistance with a relative and progressive secretory failure. The distinction is between a problem of supply and a problem of action, and every other difference follows from it.

### Mechanism
Insulin is a two-chain protein of 51 amino acids — an A chain of 21 and a B chain of 30 — joined by two interchain disulphide bridges with a third inside the A chain, produced by excising C-peptide from single-chain proinsulin. It is secreted biphasically: a sharp first phase from granules already docked at the membrane, then a slower sustained second phase. Its receptor is an alpha-2 beta-2 tetramer, the extracellular alpha subunits binding the hormone and the transmembrane beta subunits carrying tyrosine kinase activity. Its half-life is about 3 to 5 minutes, because liver, kidney and placenta degrade it by disulphide reduction and proteolysis — a short half-life being what lets the plasma level track the glucose in near real time.

When insulin is absent or ineffective, the direction of every insulin-sensitive process reverses. Glycogenesis and lipogenesis fall. Glycogenolysis, gluconeogenesis, lipolysis, proteolysis and ketogenesis rise. Glucose uptake through GLUT-4 into muscle and adipose tissue falls, while the brain, whose uptake is insulin-independent, is unaffected.

### Normal values
The department book gives normal fasting plasma glucose, after 8 to 12 hours, as 70 to under 100 mg/dL, returning to under 140 mg/dL two hours after feeding. The renal threshold is 180 mg/dL: above it, glucose appears in the urine. A fall below 45 to 50 mg/dL may be fatal.

A fasting glucose of 100 to 125 mg/dL is impaired fasting glucose, or pre-diabetes. Diabetes is diagnosed by any one of four criteria: fasting glucose 126 mg/dL or above; 2-hour value 200 mg/dL or above on an oral glucose tolerance test; HbA1c 6.5% or above; or random glucose 200 mg/dL or above with the classical symptoms.

### Key determinants
HbA1c is glucose attached non-enzymatically and irreversibly to the N-terminal valine of the haemoglobin beta chain. Because nothing regulates the reaction and the label is carried for the remaining life of the cell, the value reports average glucose exposure over roughly the preceding 8 to 12 weeks, set by the red cell lifespan. It serves both for diagnosis and for follow-up, and it is falsely lowered by anything that shortens red cell survival — in which case fructosamine, glycated albumin reporting on 2 to 3 weeks, is used instead.

Diabetic dyslipidaemia is production up and clearance down at once. Increased lipolysis and fatty acid oxidation leave excess acetyl-CoA for cholesterol synthesis; the rise in plasma fatty acids drives hepatic triacylglycerol and therefore VLDL synthesis; and lipoprotein lipase, which insulin induces, becomes less active, so triacylglycerol-rich lipoproteins are not cleared.

The polyol pathway explains the tissues that are damaged. Aldose reductase reduces glucose to sorbitol using NADPH, and sorbitol dehydrogenase oxidises sorbitol to fructose. The enzyme has a high Km, so it only handles much glucose when glucose is high, and it operates in tissues whose uptake is insulin-independent — lens, retina, kidney, Schwann cells, peripheral nerve. Those tissues cannot protect themselves by reducing uptake. Sorbitol is polar, poorly membrane-permeant and therefore trapped; it accumulates and draws water in osmotically, and the pathway consumes NADPH, weakening glutathione-dependent antioxidant defence.

### Clinical significance
Three acute crises must be told apart. Hypoglycaemia produces a sympatho-adrenal discharge over minutes — wet, cool skin with tremor, tachycardia, hunger and confusion. Diabetic ketoacidosis develops over hours to days in absolute insulin deficiency: unrestrained lipolysis and ketogenesis produce acidosis, with Kussmaul breathing, ketonuria, a fruity breath and dry skin from the osmotic diuresis. Hyperosmolar coma occurs with extreme hyperglycaemia and enough residual insulin to prevent ketosis, and consciousness is depressed by hyperosmolarity and cellular dehydration rather than by acid. Wet skin means hypoglycaemia; dry skin means one of the hyperglycaemic comas.

The chronic complications are vascular and divide by vessel calibre. Microvascular — retinopathy, nephropathy, peripheral neuropathy — tracks glycaemic control most closely. Macrovascular — coronary, cerebrovascular and peripheral arterial disease — is additionally driven by the dyslipidaemia and by glycation of vessel-wall proteins, so it also needs the lipids and the blood pressure treated.

Treatment follows the mechanism. Type 1 requires insulin, injected because a 51-amino-acid protein would be digested if swallowed, and no oral secretagogue can work on beta cells that no longer exist. In type 2, diet and exercise reduce insulin resistance; sulphonylureas stimulate secretion and can therefore cause hypoglycaemia; metformin and the thiazolidinediones improve sensitivity and do not; GLP-1 agonists augment insulin release only when glucose is high, and reduce appetite; acarbose slows carbohydrate digestion in the gut.

### Common misconceptions
Reversing the direction of an insulin action under insulin resistance — expecting lipolysis to be inhibited, or gluconeogenesis reduced. Work from the principle instead: whatever insulin normally does is blunted, whatever it normally restrains is released.

## published_summary

## published_sections

## hold_these
Type 1 is absolute insulin deficiency; type 2 is insulin resistance with progressive secretory failure.
Normal fasting glucose 70 to under 100; pre-diabetes 100 to 125; diabetes 126 or above.
HbA1c reports 8 to 12 weeks because the red cell lives about 120 days and the glycation is irreversible.
Wet skin means hypoglycaemia; both hyperglycaemic comas dehydrate and leave the skin dry.
The polyol pathway damages exactly those tissues whose glucose uptake is insulin-independent.

## lose_the_mark
Saying insulin resistance inhibits lipolysis — insulin inhibits lipolysis, so resistance releases it.
Calling HbA1c glycation enzymatic; it is spontaneous, which is why it records average exposure.
Classifying nephropathy or retinopathy as macrovascular.
Giving a sulphonylurea as the answer for type 1 diabetes; there are no beta cells left to stimulate.
Reading 117 mg/dL fasting as diabetes; the diagnostic threshold is 126.

## callout_evidence

## related_concepts
CON-END-83E98BC1F9E93E | CON-END-85750744126501 | CON-END-AC5B11BA2F2BCA | CON-END-839E4F7D92FBEF | CON-END-B41C6D0DFACFE4 | CON-END-F0182CA8A56EA7 | CON-END-5D8DA0351D0C94 | CON-END-68CC8CA610DF37

## related_articles
ART-END-TOP-8B80E93DAE: the live insulin and diabetes article whose ten concepts this batch reuses rather than duplicating
ART-103-BIO-KETOSIS: the ketosis this disease produces when insulin deficiency is severe
ART-103-BIO-LIPOPROTEIN-MACHINERY: the lipoprotein lipase whose loss produces the diabetic lipid profile
ART-103-BIO-CHOLESTEROL-METABOLISM: the department book's own three mechanisms linking diabetes to hypercholesterolaemia

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
kau: The Kasr Al Ainy Department of Biochemistry book for module 103 HAS NO DIABETES CHAPTER. Its diabetes material is confined to the Blood Glucose section of the carbohydrate chapter, file pages 53 to 57, and its 160 pages contain none of the following, all of which were searched for in the cached page text: HbA1c, glycated, glycosylated, sorbitol, aldose reductase, ketoacidosis, DKA, hyperosmolar, metformin, sulfonylurea, GLP, or the phrase "insulin resistance". The department QUESTION book has a 22-item "Biochemistry Of Diabetes Mellitus" chapter, and the department orientation sets seven "Mention", five "explain on biochemical basis" and four "Compare" written questions on diabetes. So the department examines this material through two of its own sources while its textbook does not carry it. A faculty reviewer must resolve that, and must also decide where diabetes belongs in the subject tree — see the notes field.

## annotations
### definition_of · CON-END-85750744126501
Quote: Type 1 is an absolute deficiency following beta-cell destruction. Type 2 is insulin resistance with a relative and progressive secretory failure.
Block: body

### mechanism_step_before · CON-END-5D8DA0351D0C94
Quote: Sorbitol is polar, poorly membrane-permeant and therefore trapped; it accumulates and draws water in osmotically, and the pathway consumes NADPH, weakening glutathione-dependent antioxidant defence.
Block: body

### diagnosed_by · CON-END-AC5B11BA2F2BCA
Quote: A fasting glucose of 100 to 125 mg/dL is impaired fasting glucose, or pre-diabetes.
Block: body

## media

## media_recommendations
### comparison table · Clinical significance
Brief: Hypoglycaemic coma, diabetic ketoacidosis and hyperosmolar coma in three columns, with rows for speed of onset, skin, breathing, blood glucose, ketones and the mechanism that depresses consciousness
Purpose: Teaches CON-END-68CC8CA610DF37. The department sets two written comparisons on exactly these three states, and the discriminating features are only useful held side by side; prose forces a student to reassemble the table themselves and they reassemble it wrongly.
Priority: required
Status: needed
Section: Clinical significance
Source direction: openly licensed clinical biochemistry text
Rights: must be CC-BY or public domain

### flowchart · Key determinants
Brief: The polyol pathway — glucose to sorbitol by aldose reductase consuming NADPH, sorbitol to fructose by sorbitol dehydrogenase — with the insulin-independent tissues named beside it and sorbitol marked as membrane-impermeant
Purpose: Teaches CON-END-5D8DA0351D0C94. Why these particular tissues are damaged is an argument with three steps, and seeing the trapped intermediate next to the list of tissues is what makes it stick.
Priority: required
Status: needed
Section: Key determinants

### graph · Mechanism
Brief: Biphasic insulin secretion after a glucose load, plotting a normal response against one with the first phase lost
Purpose: Teaches CON-END-83E98BC1F9E93E. The clinically important fact is that first-phase loss precedes an abnormal fasting glucose, and that is a statement about the shape of a curve.
Priority: strongly helpful
Status: needed
Section: Mechanism

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Department of Biochemistry book for module 103 (src_300847a5fa64809d6c07), Blood Glucose section, file pages 53 to 57, and the diabetes mechanisms under hypercholesterolaemia on file page 75 — the only diabetes material the textbook contains.
Kasr Al Ainy Department of Biochemistry MCQ book (src_07f0a0ff41addf826c7f), "Biochemistry Of Diabetes Mellitus" chapter, printed pages 109 to 112, and its printed answer key on printed page 112.
Kasr Al Ainy Department of Biochemistry orientation for 2025-2026 (src_90b75d63a73cfc7649b9), sections II, III and IV, for the written questions the department sets on diabetes.

## evidence_gaps
Most of this article rests on the department question book and orientation rather than on the textbook, which has no diabetes chapter. Every figure that comes from the question book alone is marked as such in the concepts it teaches. No claim or citation is attached to any sentence in this article yet; the evidence chain is owed and is named in the hand-off report.

## conflicts
The question book is internally inconsistent about HbA1c: its item 10 offers "4 weeks" as a wrong option while its item 18 states "8 - 10 weeks" in the stem. Neither figure appears in the textbook, so neither can be checked against it. Recorded rather than resolved.

## last_reviewed

## review_due

## notes
PLACEMENT IS A DECISION OWED TO A FACULTY REVIEWER. module_subject is written "103 BMS > Biochemistry" and stops there. The subject tree in ../academic/103-BMS-structure.md was built from the department textbook's contents page, and that book has no diabetes chapter; the question book has its own eleven-chapter structure and does. No node was invented, and this article was not filed under Carbohydrate Metabolism or Lipid Metabolism to make it fit. Either the tree gains a node the textbook does not name, or this material stays at subject level. Ten live concepts on insulin and diabetes already exist under ART-END-TOP-8B80E93DAE and are reused by the question batch rather than duplicated here; this article teaches the eight that did not exist. All treatment content is Draft, names classes and mechanisms only, and states no dose anywhere, because no source in this corpus states one.

## field_notes
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this article where nothing else lives.
microtopicId: The canonical tree stops at topic level under DIS-BIO for the purposes of the validator, and the department book's own section name is carried by module_subject instead.
questionIds: Written [clear]. The 79 MCQs in ../question/103-BMS-MCQ-lipid-diabetes.md name this article in their library_ids, but question IDs are assigned at import and naming them here before they exist would be inventing IDs.
media: Written [clear]. No rights-cleared asset exists for any of this material; what is needed is requested in media_recommendations instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: Written [clear] and owed. All 28 claims in ../evidence/103-BMS-biochemistry-claims.md were read and none asserts this article's content; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files and mints no claim or citation IDs, so the evidence chain is owed and is named in the hand-off report.
spanIds: Written [clear] and owed, for the same reason as claimIds. A span must name the claim and citation it rests on, and neither exists yet. The audit will report articleData.spanIds missing; that is a known failure for the lead to close, not an oversight.
