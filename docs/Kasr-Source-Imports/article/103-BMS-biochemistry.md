<!--
  Library articles for 103 BMS · Biochemistry.

  Eleven articles, teaching the twenty-eight concepts in
  ../concept/103-BMS-biochemistry-concepts.md. Every concept there is taught by
  exactly one of these, because a written question's `library_ids` must name an
  article whose `related_concepts` lists the question's `main_concept`.

    ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE        → CON-FND-5F0DC4407DEC51, CON-FND-D8A41B5C23B148
    ART-103-BIO-HMP-PATHWAY-AND-G6PD           → CON-FND-B928DE79E08882, CON-HEM-A1EF4D20C85878,
                                                  CON-HEM-4F64967BBFBB6F
    ART-103-BIO-TCA-KEY-ENZYMES                → CON-FND-037BF052DDFC0D
    ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT   → CON-HEM-095C9C97B56CCA, CON-HEM-7FBB4829A4A4EC,
                                                  CON-HEM-6B557A065A8D90
    ART-103-BIO-PLASMA-LIPOPROTEINS            → CON-GIT-33EAF87333AAD5, CON-GIT-8C5125A491B189,
                                                  CON-GIT-38CC5CC7716DB7
    ART-103-BIO-KETOSIS                        → CON-END-CC450A236ABF50
    ART-103-BIO-NITROGEN-BALANCE               → CON-FND-B320D24EC35D30
    ART-103-BIO-PHENYLKETONURIA                → CON-FND-D7BB8C3AFB54CC, CON-FND-587B0A39D3C0BD,
                                                  CON-FND-1DF6B985CB77A1, CON-FND-81A4F3A9C51B7B
    ART-103-BIO-GOUT-AND-HYPERURICAEMIA        → CON-REN-0460ED67059E66, CON-REN-38B4BED80BC671,
                                                  CON-REN-31708150F8B722, CON-REN-E5BAEF03791C8F
    ART-103-BIO-JAUNDICE-AND-BILIRUBIN         → CON-GIT-A265DD7A7CC8EF, CON-GIT-4A2A86832F1FF2,
                                                  CON-HEM-F2B664C215C912
    ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS → CON-FND-46B9F239340ED9, CON-FND-C9E5128193029E,
                                                  CON-FND-1A4A49607783A9

  Four of those concept IDs are live records this batch updates rather than
  duplicates, so four of these articles list a live article beside themselves in the
  concept's `article_ids`. `medical:batch` will report those live article IDs as
  "authored nowhere in the batch directory"; that is the documented directory-scoped
  false alarm, and `medical:simulate` resolves them.

  All prose is from `Dpt book Biochemistry 103.pdf` (src_300847a5fa64809d6c07),
  pages 11–13, 17–19, 25–28, 34–37, 69–70, 75–80, 81–82, 100–104, 119–123, 126–131
  and 130–158. Nothing here is asserted that the book does not say; where the book is
  silent, the article says it is silent. The 2025 end-of-year paper
  (src_37f6c0daf3436096af19) appears only as curriculum signal — what was asked — and
  never as evidence that something is true.

  ── The three diagrams ──────────────────────────────────────────────────────
  Three questions on this paper are unanswerable without a diagram the student is
  handed, and this repository holds no medical images at all. One request is filed
  per diagram, on the article that teaches it, at `Priority: required`:

    Fate of H₂O₂                         → ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE
    BPG Shunt in Red Blood Cells         → ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT
    Metabolism of VLDL, IDL and LDL      → ART-103-BIO-PLASMA-LIPOPROTEINS

  All three are named in the Biochemistry department's own list of twenty-two
  "Diagrams to be studied", so they are not optional illustrations — they are the
  question. Sixteen further assets are requested across the eleven articles and none
  is supplied; the book's own figures are faculty teaching material, cited by
  locator and not reproduced. No URL is invented anywhere in this file, and `## media`
  is present and empty on every record with a `field_notes` reason.

  Import: Admin › Bulk import → article.
-->

# Item

## id
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE

## title
Reactive oxygen species and the defences against them

## arabic_title
أنواع الأكسجين التفاعلية والدفاعات ضدها

## aliases
Antioxidant defence
Mechanisms of combating free radicals
Fate of hydrogen peroxide
Substances that protect against ROS
Oxidative stress

## subject
fnd

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic
Mechanisms of combating free radicals

## nanotopic

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T08

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
Dr. Omar

## final_publisher
Admin team

## summary
Reactive oxygen species are a normal by-product of metabolism that damage cells when they accumulate. The body answers them twice over: it stops some being made, and it mops up the rest. Two of the moppers are metabolic waste — bilirubin and uric acid are antioxidants in their own right — which is the part students never expect. Hydrogen peroxide has its own disposal route, run by catalase and by glutathione peroxidase, and the glutathione arm of it consumes NADPH, which is why an apparently separate pathway of carbohydrate metabolism turns out to be what keeps a red cell alive.

## sections
### Definition
Reactive oxygen species are unstable, highly reactive oxygen-containing molecules that interact with other molecules in the cell. They are a normal by-product of cellular metabolism. When their level becomes too high the cell is in oxidative stress, and damage follows.

The book divides them in two. Radicals carry one or more unpaired electrons, which makes them reactive and inclined to steal electrons from other molecules; the examples given are the superoxide free radical, the hydroxyl free radical and nitric oxide. Non-radicals, or oxidants, have no unpaired electron and are reactive but less so; the examples are lipid hydroperoxyl, hypochlorous acid, hydrogen peroxide and ozone.

That taxonomy, and the four routes by which ROS are generated, are the material the Biochemistry department cancels from both the end-of-module and the final exam. They are given here because a defence makes no sense without knowing what it defends against, not because they are examinable.

### Mechanism
Two mechanisms combat free radicals, and the book keeps them apart.

The first is prevention of generation. Copper and iron are chelated onto ceruloplasmin, transferrin and albumin, so they cannot catalyse radical formation. Enzymes — catalase, the peroxidases, and glutathione peroxidase — remove the precursors.

The second is scavenging what already exists. Vitamins do it: ascorbic acid, the tocopherols, the carotenes and pyridoxine. One enzyme does it: superoxide dismutase, which is widely distributed in tissues. Proteins do it through their free thiol groups, derived from cysteine; cysteine itself is an antioxidant, and its derivative acetylcysteine is used therapeutically as one. And metabolic end products do it: bilirubin and uric acid function as antioxidants, and are oxidised into biliverdin and allantoin respectively.

Hydrogen peroxide, which is a normal metabolite produced either by flavoprotein oxidases or by the superoxide dismutase reaction, has a disposal route of its own with two branches. Catalase splits it into water and oxygen. Glutathione peroxidase, a selenium enzyme, reduces it to two molecules of water while oxidising two reduced glutathione into the disulphide, and glutathione reductase, an FAD enzyme, then reduces that disulphide back using NADPH+H⁺.

The glutathione arm therefore only runs for as long as NADPH keeps arriving, and the pathway that supplies the NADPH is the hexose monophosphate pathway.

### Key determinants
What ROS actually damage is worth holding, because it explains the clinical picture rather than decorating it. Reducing sugars glycate proteins and lipids, and oxidation of those adducts forms advanced glycation end-products — a slow, non-enzymatic process and a complication of diabetes. Polyunsaturated fatty acids in membrane phospholipids and in circulating lipoproteins, particularly LDL, are oxidised into lipid peroxides such as malondialdehyde, which start inflammatory reactions; oxidation of LDL is an important step in the pathogenesis of atherosclerosis. Proteins lose their tertiary structure as thiol groups are oxidised to disulphides and aromatic residues are cross-linked, so immunoglobulins lose function and endogenous proteins may become immunogenic. Nucleic acid bases are hydroxylated and cross-linked, and where repair is inadequate the result is mutation, carcinogenesis and autoimmune disease.

### Clinical significance
Two of this article's facts are load-bearing elsewhere in the course.

The first is that the NADPH-dependent branch of hydrogen peroxide disposal is exactly what fails in favism. A red cell without glucose 6-phosphate dehydrogenase cannot make enough NADPH, so glutathione reductase cannot regenerate reduced glutathione, so glutathione peroxidase cannot clear the peroxide, and an oxidant challenge lyses the cell.

The second is that bilirubin and uric acid are not only waste. A student meets bilirubin as the pigment of jaundice and uric acid as the crystal of gout, and both are diseases of too much. That the same two molecules are the body's own antioxidants is the fact the enumerate question is testing, and it is the one nobody revises.

Respiratory burst is the useful case of ROS being made on purpose: a leukocyte that has engulfed a microorganism generates superoxide, superoxide dismutase converts it to hydrogen peroxide, and myeloperoxidase converts that to hypochlorous acid, which kills the bacterium.

### Common misconceptions
Three cost marks. The first is treating antioxidant defence as a list of vitamins — the question asks for one enzyme and one metabolic end product, and neither is a vitamin. The second is naming glutathione reductase as the enzyme that destroys hydrogen peroxide; it does not touch the peroxide, and only regenerates the reduced glutathione afterwards. The third is assuming that because the ROS generation material is cancelled the whole topic is, when the department's own diagram list names the fate of hydrogen peroxide as examinable and the 2025 paper set it.

## published_summary

## published_sections

## hold_these
The two metabolic end products that act as antioxidants are bilirubin and uric acid, oxidised to biliverdin and allantoin.
Superoxide dismutase is the scavenger enzyme, and it is widely distributed in tissues.
Glutathione peroxidase destroys hydrogen peroxide; glutathione reductase only regenerates the glutathione, and it costs NADPH.
Catalase is the other route: it splits hydrogen peroxide into water and oxygen.
Oxidation of LDL by ROS is an important step in the pathogenesis of atherosclerosis.

## lose_the_mark
Naming a vitamin when the question asks for an enzyme or for a metabolic end product.
Writing glutathione reductase as the enzyme that removes hydrogen peroxide.
Assuming the whole ROS topic is cancelled because the generation half of it is.

## callout_evidence
### The two metabolic end products that act as antioxidants are bilirubin and uric acid, oxidised to biliverdin and allantoin.
Claims: CLM-FND-ROS-ANTIOXIDANT-DEFENCE-01
Citations: CIT-KA-BIO103-ROS-DEFENCE-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### Glutathione peroxidase destroys hydrogen peroxide; glutathione reductase only regenerates the glutathione, and it costs NADPH.
Claims: CLM-FND-H2O2-DISPOSAL-01
Citations: CIT-KA-BIO103-H2O2-FATE-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-FND-5F0DC4407DEC51 | CON-FND-D8A41B5C23B148

## related_articles
ART-103-BIO-HMP-PATHWAY-AND-G6PD: supplies the NADPH the glutathione arm of peroxide disposal runs on, and is where the failure of that arm becomes a disease
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS: vitamins C and E are the scavenger antioxidants named here, and the matching question tests which is water-soluble and which lipid-soluble

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-FND-ROS-ANTIOXIDANT-DEFENCE-01 | CLM-FND-H2O2-DISPOSAL-01

## span_ids
SPN-BIO-ROS-DEFENCE-01 | SPN-BIO-H2O2-FATE-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Reactive Oxygen Species (ROS)

## university_notes
kau: The Biochemistry department cancels "(Groups -Generation) of ROS" on pages 11 and 12 from both the end-of-module and the final exam, and in the same document lists "Fate of Hydrogen Peroxide (12/36)" among the twenty-two diagrams to be studied. The cancellation is of an item, not of a page range: the defences on page 13 and the peroxide diagram on page 12 are both examinable, and the 2025 end-of-year paper set both.

## annotations
### definition_of · CON-FND-5F0DC4407DEC51
Quote: And metabolic end products do it: bilirubin and uric acid function as antioxidants, and are oxidised into biliverdin and allantoin respectively.
Block: body

### definition_of · CON-FND-D8A41B5C23B148
Quote: Glutathione peroxidase, a selenium enzyme, reduces it to two molecules of water while oxidising two reduced glutathione into the disulphide, and glutathione reductase, an FAD enzyme, then reduces that disulphide back using NADPH+H⁺.
Block: body

## media

## media_recommendations
### diagram · Fate of hydrogen peroxide, both branches on one figure
Brief: The book's page 12 figure redrawn: hydrogen peroxide at the centre, the catalase branch going to water and oxygen, and the glutathione branch going to two molecules of water with 2 G–SH oxidised to G-S–S-G by glutathione peroxidase (marked Se), and glutathione reductase (marked FAD) closing the loop with NADP⁺ and NADPH+H⁺ on its arms
Purpose: Teaches CON-FND-D8A41B5C23B148, and it is the diagram the 2025 paper handed students for Diagram (1). Two of that question's five marks are for labelling the two enzymes on this figure, and the remaining four hang off the NADPH arrow leading out of it. Prose can name the enzymes; only the figure shows that one arm needs NADPH and the other does not, which is the whole reason a G6PD-deficient red cell dies.
Priority: required
Status: needed
Section: Mechanism
Kind: flowchart
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain
Notes: The book prints this figure twice, on page 12 with the catalase branch and on page 36 without it. The version needed here is the page 12 one, with both branches.

### diagram · The two classes of reactive oxygen species with one example structure each
Brief: A two-column figure, radicals against non-radicals, with the structures of superoxide anion, hydroxyl radical and nitric oxide on one side and hydrogen peroxide and hypochlorite ion on the other, unpaired electrons marked
Purpose: The distinction is about whether an electron is unpaired, which is a fact about a structure and cannot be seen in a name. Students who meet only the two lists memorise which molecule goes where and never see why the radicals are the more reactive group.
Priority: optional
Status: needed
Section: Definition
Kind: diagram
Source direction: openly licensed chemistry or biochemistry text
Rights: must be CC-BY or public domain
Notes: Low priority deliberately — this is the half of the topic the department cancels from the exam.

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter I "Bioenergetics", pages 11 to 13.
Section 1 of the 2025 end-of-year paper for module 103 BMS establishes that questions I-1 and Diagram (1) are examined, and is cited as curriculum signal only, never as evidence of medical fact.
The Biochemistry department's orientation document for 2025-2026 establishes which items are cancelled and which diagrams are examinable.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book asserts that bilirubin and uric acid "function as antioxidants" without giving the reactions, the conditions, or any measure of how much of total antioxidant capacity they account for. The claim is taught as the book states it and is not extended.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written to carry Section 1 question I-1 and Diagram (1) of the 2025 end-of-year paper. TPL-CONCEPT rather than TPL-CONDITION because the subject is a mechanism, not a disease; the diseases that follow from failure of these defences are taught in ART-103-BIO-HMP-PATHWAY-AND-G6PD. The cancelled generation material is included but explicitly flagged as non-examinable rather than omitted, because the defences read as arbitrary without it.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T01 for bioenergetics; the book's own section names are carried in module_subject, which is finer than any nanotopic here would be.
questionIds: No question record tests this article yet. The written question for Section 1 is a separate scope in CLAIMS.md and will add its ID; this file must not append to a file that scope owns.
media: No rights-cleared asset exists for any of this material. Two are requested in media_recommendations; the department book's own figures are faculty teaching material and are cited by locator, not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## title
The HMP pathway, G6PD and favism

## arabic_title
مسار أحادي فوسفات الهكسوز وإنزيم G6PD وأنيميا الفول

## aliases
Hexose monophosphate pathway
Pentose phosphate pathway
HMP
PPP
G6PD deficiency
Favism
Main source of NADPH
Uronic acid pathway
Synthesis of glucuronic acid

## subject
haem

## topic
Carbohydrate metabolism

## subtopic
Hexose Monophosphate Pathway

## microtopic
Favism

## nanotopic

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-HEM-T02 | SYS-FND-T06

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
Dr. Omar

## final_publisher
Admin team

## summary
The hexose monophosphate pathway is the second way to oxidise glucose, and unlike glycolysis it makes no ATP. What it makes is NADPH and ribose 5-phosphate. NADPH is the reducing power for building things and for keeping glutathione reduced, and G6PD is the enzyme that starts the pathway and controls it. Take G6PD away and a red cell can no longer clear hydrogen peroxide, so an oxidant — a fava bean, primaquine, aspirin, a sulfonamide — lyses it. That is favism, the commonest human enzymopathy, and it is one enzyme deficiency followed all the way to a clinical presentation.

## sections
### Definition
The pentose phosphate pathway is another route for glucose oxidation, with two major functions: the supply of NADPH and of ribose 5-phosphate. Its enzymes are cytosolic, and it is active in liver, thyroid, adrenal cortex, adipose tissue, gonads, retina, lactating mammary gland and red cells.

Favism is a genetic deficiency of glucose 6-phosphate dehydrogenase, and the book calls it the most common human enzymopathy.

### The other minor pathway: uronic acid
The book introduces the HMP pathway and one further pathway in the same breath, as the two "other pathways for oxidation" that exist to make glucose derivatives rather than energy. The second is the uronic acid pathway, and the book gives it a single line: it exists for the synthesis of glucuronic acid.

Nothing else about it is stated on this page — no enzyme, no intermediate, no regulation — which is itself worth knowing, because the department's own cancelled-items table removes the uronic acid pathway from both the end-of-module and the final exam while leaving the HMP pathway examinable. The two pathways share an opening sentence in the book and nothing else: a diagram question naming "other pathways of glucose oxidation" expects the HMP pathway in full and the uronic acid pathway only as a name and a product.

Glucuronic acid's best-supported use elsewhere in this book is conjugation: the liver attaches it to bilirubin, using glucuronyl transferase, to make bilirubin water-soluble and excretable — the step this book teaches fully in the heme chapter, not here.

### Mechanism
The pathway runs in two phases.

The oxidative phase is irreversible. Glucose 6-phosphate is dehydrogenated by glucose 6-phosphate dehydrogenase (G6PD) to 6-phosphogluconolactone, generating the first NADPH+H⁺; gluconolactone hydrolase opens it to 6-phosphogluconate; and 6-phosphogluconate dehydrogenase oxidatively decarboxylates that to ribulose 5-phosphate, generating the second NADPH+H⁺ and releasing CO₂. A keto-isomerase gives ribose 5-phosphate.

The non-oxidative phase is reversible. Ribose 5-phosphate can be converted back to glucose 6-phosphate by a series of reactions using two enzymes, transketolase and transaldolase. Muscle has low activity of the oxidative enzymes but can still make ribose 5-phosphate by running this phase backwards.

Regulation is short. NADPH is a feedback inhibitor of G6PD, and insulin induces the enzyme and increases its synthesis.

The mechanism of favism runs in four steps and is worth learning in that order. Red cells are liable to oxidative damage because of their role in oxygen transport, and hydrogen peroxide causes lipid peroxidation, which increases membrane fragility. The red cell's capacity to protect itself is markedly decreased because NADPH is low, and NADPH is what glutathione reductase needs to regenerate reduced glutathione for the removal of hydrogen peroxide by glutathione peroxidase. Exposure of red cells to oxidising agents then produces lysis and the development of haemolytic anaemia and jaundice. The oxidising agents the book names are the drugs primaquine, aspirin and sulfonamides, and fava beans, which contain oxidants.

### Key determinants
What the NADPH is spent on determines which tissues suffer when it is short. The book lists fatty acid synthesis in liver, adipose tissue and lactating mammary gland; steroid synthesis in liver, adrenal cortex, testis, ovaries and placenta; vision; NADPH oxidase, which is an essential antimicrobial defence mechanism; and maintaining glutathione in its reduced state in red cells and tissues.

The ribose 5-phosphate is required for the synthesis of nucleotides and nucleic acids, which is where this pathway meets purine metabolism.

One determinant is protective rather than harmful. G6PD deficiency is associated with resistance to malaria, because the plasmodium parasite requires reduced glutathione for its survival and cannot get enough of it in a deficient cell.

### Clinical significance
Treatment of favism, as the book states it, is avoidance and support: the only treatment is to avoid the precipitating factors, with blood transfusion during an attack of haemolysis. No drug is named to treat it, and none is supplied here.

The haemolysis produces jaundice, and that jaundice is unconjugated, because the bilirubin is being produced faster than the liver can conjugate and excrete it. G6PD deficiency appears in the book's own list of causes of haemolytic jaundice under "red cell enzyme deficiency", alongside pyruvate kinase, which is how this article connects to the jaundice article and to the third case on the 2025 paper.

Favism matters locally in a way a Western textbook does not convey. Fava beans are a staple of the Egyptian diet, so the exposure this article describes as an occasional trigger is, here, an everyday food. The department book gives no prevalence figure for Egypt and none is invented; a local figure should be attached before this article is published.

### Common misconceptions
Two. The first is thinking the deficient cell dies of an energy failure — G6PD makes no ATP, the red cell's ATP comes from glycolysis, and glycolysis is intact; what is lost is reducing power. The second is naming 6-phosphogluconate dehydrogenase as the key enzyme because it is the memorable step that releases CO₂; the key enzyme, the regulated one, and the one blocked in favism is G6PD, which comes first.

## published_summary

## published_sections

## hold_these
The HMP pathway makes NADPH and ribose 5-phosphate and no ATP at all.
G6PD is the key enzyme, it catalyses the first step, and NADPH inhibits it while insulin induces it.
In favism the red cell fails for want of NADPH, not for want of ATP.
The precipitants the book names are primaquine, aspirin, sulfonamides and fava beans.
G6PD deficiency confers resistance to malaria, because the parasite needs the reduced glutathione the deficient cell cannot supply.

## lose_the_mark
Answering "glycolysis" when asked for the main source of NADPH.
Naming 6-phosphogluconate dehydrogenase as the key enzyme instead of G6PD.
Explaining favism as a failure to make ATP.

## callout_evidence
### G6PD is the key enzyme, it catalyses the first step, and NADPH inhibits it while insulin induces it.
Claims: CLM-HEM-G6PD-HMP-KEY-ENZYME-01
Citations: CIT-KA-BIO103-G6PD-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### In favism the red cell fails for want of NADPH, not for want of ATP.
Claims: CLM-HEM-FAVISM-HAEMOLYSIS-01
Citations: CIT-KA-BIO103-FAVISM-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-FND-B928DE79E08882 | CON-HEM-A1EF4D20C85878 | CON-HEM-4F64967BBFBB6F | CON-FND-B7423F19A99029

## related_articles
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE: the peroxide-disposal route whose NADPH this pathway supplies
ART-103-BIO-JAUNDICE-AND-BILIRUBIN: where the haemolysis of favism ends up, as unconjugated hyperbilirubinaemia
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT: the other half of red cell carbohydrate metabolism, and the half that does make ATP

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-FND-HMP-NADPH-01 | CLM-HEM-G6PD-HMP-KEY-ENZYME-01 | CLM-HEM-FAVISM-HAEMOLYSIS-01

## span_ids
SPN-BIO-HMP-NADPH-01 | SPN-BIO-FAVISM-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)
103 BMS > Biochemistry > Carbohydrate Metabolism > Uronic Acid Pathway

## university_notes
kau: The Uronic Acid Pathway, which is the chapter section immediately after this one on page 38, is cancelled from both the end-of-module and the final exam by the Biochemistry department's own orientation. The HMP pathway itself is not cancelled and was examined in 2025 as parts (a) to (d) of Diagram (1). This article now also carries the uronic acid pathway's own one-line content directly (see the new subsection in ## sections), closing that subheading's coverage gap without a separate near-duplicate article.

## annotations
### definition_of · CON-FND-B928DE79E08882
Quote: The pentose phosphate pathway is another route for glucose oxidation, with two major functions: the supply of NADPH and of ribose 5-phosphate.
Block: body

### mechanism_step_before · CON-HEM-4F64967BBFBB6F
Quote: Exposure of red cells to oxidising agents then produces lysis and the development of haemolytic anaemia and jaundice.
Block: body

## media

## media_recommendations
### diagram · Oxidative phase of the HMP pathway with the favism block marked
Brief: Glucose 6-phosphate through 6-phosphogluconolactone and 6-phosphogluconate to ribulose 5-phosphate and ribose 5-phosphate, with G6PD and 6-phosphogluconate dehydrogenase labelled, both NADPH+H⁺ outputs shown, and an arrow marking "block in cases of favism" at the G6PD step
Purpose: Teaches CON-FND-B928DE79E08882 and CON-HEM-A1EF4D20C85878. Where the block sits determines everything downstream, and a student who has read the steps as a list cannot say which NADPH is lost. The book's own figure marks the block, and that mark is the teaching point.
Priority: required
Status: needed
Section: Mechanism
Kind: flowchart
Source direction: openly licensed biochemistry text
Rights: must be CC-BY or public domain

### clinical photograph · Peripheral blood film during a haemolytic crisis in G6PD deficiency
Brief: A stained blood film showing bite cells and Heinz bodies, with a normal film beside it for comparison
Purpose: Teaches CON-HEM-4F64967BBFBB6F. The mechanism is invisible until the cell is seen damaged; students who learn favism as a paragraph do not recognise it on a film in the practical exam.
Priority: strongly helpful
Status: needed
Section: Clinical significance
Kind: histology
Source direction: openly licensed haematology atlas
Rights: must be CC-BY or public domain
Notes: The department book does not print such a film; this request goes beyond the book deliberately and any caption must not be attributed to it.

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter III "Carbohydrate Metabolism", pages 35 to 37.
Section 1 of the 2025 end-of-year paper for module 103 BMS establishes that Diagram (1) parts (a) to (d) are examined, and is cited as curriculum signal only.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry or haematology reference has been attached.
The book calls G6PD deficiency "the most common human enzymopathy" and gives no prevalence, for Egypt or anywhere. Given that fava beans are an Egyptian staple, a local figure matters here more than usual and is missing.
The book states that the only treatment is avoidance and transfusion during a crisis. Whether that is still the department's teaching, and what it means for a patient already haemolysing, is treatment content and is not extended here.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written to carry Diagram (1) parts (a) to (d) of the 2025 end-of-year paper. Three concepts, two of which — CON-HEM-A1EF4D20C85878 and CON-HEM-4F64967BBFBB6F — are live records this batch updates rather than duplicates; both list ART-HEM-TOP-B697DE3AAD beside this article in their article_ids, and medical:batch will report that live ID as authored nowhere in the batch directory.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T03 for carbohydrate metabolism; the book's own section names are carried in module_subject.
questionIds: No question record tests this article yet. The written question for Section 1 is a separate scope in CLAIMS.md and will add its ID.
media: No rights-cleared asset exists for any of this material. Two are requested in media_recommendations; the department book's own figures are faculty teaching material and are cited by locator, not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-TCA-KEY-ENZYMES

## title
The key enzymes of the citric acid cycle and what turns them

## arabic_title
الإنزيمات المفتاحية لدورة حمض الستريك

## aliases
Key enzymes for Krebs cycle
Regulation of the citric acid cycle
Rate-controlling enzymes of the TCA cycle
Citrate synthase
Isocitrate dehydrogenase
Alpha-ketoglutarate dehydrogenase

## subject
fnd

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## microtopic
Regulation of Citric Acid Cycle

## nanotopic

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T02 | SYS-FND-T06

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
6

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Dr. Omar

## final_publisher
Admin team

## summary
Eight enzymes run the citric acid cycle and only three of them decide how fast it goes. Those three catalyse the cycle's irreversible steps — citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase — and every regulator the book gives acts on one or more of them. The pattern is simple once seen: the cycle is turned off by a high NADH/NAD⁺ ratio or a high ATP/ADP ratio, and turned on by the opposite, and by calcium when a muscle starts contracting.

## sections
### Definition
The citric acid cycle is a series of reactions responsible for the complete oxidation of the acetyl group of acetyl-CoA. It is the final common pathway for the oxidation of carbohydrates, lipids and proteins, because glucose, fatty acids and the carbon skeletons of all amino acids are metabolised to acetyl-CoA or to intermediates of the cycle. Its enzymes are in the mitochondrial matrix, except succinate dehydrogenase, which is bound to the inner mitochondrial membrane and forms complex II of the respiratory chain.

A key enzyme, in this chapter's sense, is a rate-controlling one. The cycle has three irreversible steps, and the enzymes that catalyse them are citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase.

### Mechanism
Each of the three is regulated, and the book gives five mechanisms.

Substrate availability acts on citrate synthase. Both oxaloacetate and acetyl-CoA must be available; carboxylation of pyruvate by pyruvate carboxylase into oxaloacetate is allosterically activated by acetyl-CoA, which ensures the supply, and a high concentration of oxaloacetate increases citrate synthase activity.

Product feedback acts through succinyl-CoA. A raised concentration of it causes feedback inhibition of citrate synthase and of α-ketoglutarate dehydrogenase.

The NADH/NAD⁺ ratio inhibits isocitrate dehydrogenase and α-ketoglutarate dehydrogenase when it is high. This is why the cycle is active only under aerobic conditions, where the electron transport chain is available to reoxidise NADH to NAD⁺.

The ATP/ADP ratio reflects the cell's need for ATP. A high ratio inhibits all three enzymes, and the rate of the cycle falls.

Calcium is the exception that turns everything up at once. During muscular exercise, calcium released from the sarcoplasmic reticulum to trigger contraction also activates citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase, supplying the contracting muscle with ATP.

### Key determinants
Two enzymes of the cycle can be inhibited from outside, and both are worth knowing because they are how the cycle is studied. Fluoroacetate, a rodenticide, is converted in the body to fluorocitrate, which inhibits aconitase. Arsenic compounds inhibit α-ketoglutarate dehydrogenase by forming a stable complex with the thiol groups of lipoic acid, making it unavailable.

The energy the cycle yields sets the scale of all this: oxidising one mole of the acetyl group of acetyl-CoA through the cycle yields 10 moles of ATP — 7.5 from three NADH+H⁺, 1.5 from FADH₂ and one by substrate-level phosphorylation.

### Clinical significance
The cycle is amphibolic, which is why regulating it matters beyond energy supply. Citrate exported to the cytosol is cleaved by ATP-citrate lyase to acetyl-CoA, the precursor of fatty acids and cholesterol. α-ketoglutarate is transaminated to glutamate. Succinyl-CoA is used for haem synthesis and for the oxidation of ketone bodies. Malate can be oxidatively decarboxylated by malic enzyme to pyruvate, and that is one of the sources of NADPH. Oxaloacetate is transaminated by AST to aspartate, and in the cytosol is converted by PEPCK to phosphoenolpyruvate, an important step in gluconeogenesis.

The connection that matters clinically is with ketosis. When gluconeogenesis is running hard, oxaloacetate is drawn away from citrate synthase, the cycle slows for want of it, and acetyl-CoA is diverted into ketogenesis. Regulation of the cycle and the causes of ketosis are the same story told from two ends.

### Common misconceptions
Listing all eight enzymes when asked for the key ones. "Key" means rate-controlling, and only three steps are irreversible. Succinate dehydrogenase is the memorable enzyme because it sits in the inner membrane and belongs to the respiratory chain as well, but it is not a regulatory step and naming it costs the mark.

## published_summary

## published_sections

## hold_these
The three key enzymes are citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase, and they are the three irreversible steps.
A high NADH/NAD⁺ ratio or a high ATP/ADP ratio turns the cycle off; the opposite turns it on.
Calcium activates all three during muscular exercise, which is how contraction pays for itself.
Succinyl-CoA feeds back on citrate synthase and α-ketoglutarate dehydrogenase.
One acetyl group through the cycle yields 10 ATP.

## lose_the_mark
Answering with all eight enzymes of the cycle instead of the three rate-controlling ones.
Naming succinate dehydrogenase as a key enzyme because it is the one in the membrane.
Saying the cycle runs anaerobically; it stops when NADH cannot be reoxidised.

## callout_evidence
### The three key enzymes are citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase, and they are the three irreversible steps.
Claims: CLM-FND-KREBS-KEY-ENZYMES-01
Citations: CIT-KA-BIO103-KREBS-KEY-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-FND-037BF052DDFC0D

## related_articles
ART-103-BIO-KETOSIS: what happens to acetyl-CoA when oxaloacetate is drawn away from citrate synthase
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT: the pathway that feeds the cycle, and the cell that has no cycle at all

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-FND-KREBS-KEY-ENZYMES-01

## span_ids
SPN-BIO-KREBS-KEY-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## university_notes
kau: The subject tree records the Citric acid cycle chapter with no children, because the department book prints no section headings inside it — only run-in labels (Definition, Site, Steps, Importance, Regulation). A module_subject path for this material therefore stops at the chapter, and the microtopic field carries the run-in label instead.

## annotations
### definition_of · CON-FND-037BF052DDFC0D
Quote: The cycle has three irreversible steps, and the enzymes that catalyse them are citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase.
Block: body

## media

## media_recommendations
### diagram · Regulation of the TCA cycle, with activators and inhibitors on the three key enzymes
Brief: The cycle drawn as a ring with the three key enzymes marked, and plus and minus arrows on each: acetyl-CoA and oxaloacetate and ADP and calcium as activators, ATP and NADH and succinyl-CoA as inhibitors, each arrow landing on the enzyme it acts on
Purpose: Teaches CON-FND-037BF052DDFC0D. The regulators are only memorable as a pattern — everything that means "plenty of energy" inhibits and everything that means "spend energy" activates — and a list of five mechanisms in prose hides that pattern completely. One ring with signed arrows shows it in a glance.
Priority: required
Status: needed
Section: Mechanism
Kind: flowchart
Source direction: openly licensed biochemistry text
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter II "Tricarboxylic Acid Cycle", pages 14 to 19.
Section 1 question I-2 of the 2025 end-of-year paper for module 103 BMS establishes that the key enzymes are examined, and is cited as curriculum signal only.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book's regulation diagram marks ADP and calcium as activators of citrate synthase while its prose gives the ATP/ADP ratio rather than ADP alone. The two are not reconciled in the source and are not reconciled here.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written to carry Section 1 question I-2 of the 2025 end-of-year paper. A single-concept article deliberately: the question asks for one thing, and padding the article with the eight steps of the cycle would make it a chapter rather than the answer to what was asked. The steps are summarised only where the regulation depends on them.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T03, and the department book prints no section headings inside the citric acid cycle chapter, so there is nothing finer to record.
questionIds: No question record tests this article yet. The written question for Section 1 is a separate scope in CLAIMS.md and will add its ID.
media: No rights-cleared asset exists for this material. One is requested in media_recommendations; the department book's own regulation figure is faculty teaching material and is cited by locator, not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT

## title
Glycolysis in the red cell and the BPG shunt

## arabic_title
تحلل الجلوكوز في كرات الدم الحمراء وتحويلة BPG

## aliases
BPG shunt
Rapoport-Luebering shunt
Importance of glycolysis for RBCs
2,3-bisphosphoglycerate
Substrate level phosphorylation in red cells

## subject
haem

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## microtopic
Importance of Glycolysis

## nanotopic

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-HEM-T01 | SYS-RES-T01

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
Dr. Omar

## final_publisher
Admin team

## summary
A red cell has no mitochondria, so glycolysis is the whole of its energy metabolism. It also runs a side loop off glycolysis, the BPG shunt, which produces 2,3-bisphosphoglycerate and costs the cell the one ATP-yielding step it bypasses. That looks like a bad bargain until you see what 2,3-BPG does: it binds haemoglobin, lowers its affinity for oxygen, and makes the cell better at the job it exists to do. The exam asks all three parts of this — why no ATP, why glycolysis matters, why the product matters — off one diagram.

## sections
### Definition
Glycolysis is the pathway from glucose to pyruvate, and under anaerobic conditions to lactate. In most cells it is one stage of a longer oxidation. In the red cell it is all of it.

The BPG shunt, drawn in the book as "BPG Shunt in Red Blood Cells", is a bypass around one step of glycolysis: 1,3-bisphosphoglycerate leaves the main line, becomes 2,3-bisphosphoglycerate, and rejoins as 3-phosphoglycerate.

### Mechanism
The main line first. In phase I of glycolysis two ATP are used, by glucokinase or hexokinase and by phosphofructokinase-1. In phase II four ATP are produced by substrate-level phosphorylation, two by phosphoglycerate kinase and two by pyruvate kinase, and two NADH+H⁺ are produced by glyceraldehyde 3-phosphate dehydrogenase. Aerobically those NADH yield five more ATP through the electron transport chain, so the net gain is seven ATP per glucose. Anaerobically the NADH is not oxidised by the chain and the net gain is two.

A red cell only ever gets the anaerobic figure, because it has no mitochondria and therefore no chain. As RBCs lack mitochondria, glycolysis is the only source of ATP through substrate level phosphorylation. That is the first reason glycolysis matters to them. The second is that the NADH+H⁺ generated at the glyceraldehyde 3-phosphate dehydrogenase step maintains the iron of haemoglobin in the ferrous state; ferrous iron oxidised to ferric makes methaemoglobin, which is inactive as an oxygen carrier.

Now the shunt. 2,3-bisphosphoglycerate mutase catalyses the conversion of 1,3-bisphosphoglycerate into 2,3-bisphosphoglycerate, bypassing the reaction catalysed by phosphoglycerate kinase, which is the site of ATP yield. 2,3-bisphosphoglycerate phosphatase then hydrolyses the product to 3-phosphoglycerate, releasing inorganic phosphate rather than transferring it to ADP. A molecule that takes the shunt therefore rejoins glycolysis below the step that would have paid it, and the cell gains no net ATP from the detour.

What it gains instead is the product. 2,3-BPG binds to haemoglobin and decreases its affinity for oxygen, favouring delivery of oxygen to the tissues.

### Key determinants
Two glycolytic enzymes are inhibited in ways worth holding, and both are laboratory facts before they are clinical ones. Glyceraldehyde 3-phosphate dehydrogenase is inhibited by arsenic and by iodoacetate, which block the thiol group in its active site — this is the mechanism of arsenic poisoning. Enolase is inhibited irreversibly by fluoride, which binds the magnesium in its active site, and that is why fluoride is added to blood samples before glucose estimation: it stops the sample glycolysing and gives an accurate reading.

The glycolytic intermediates matter beyond the red cell. Glucose 6-phosphate sits at the junction of glycolysis, gluconeogenesis, the pentose phosphate pathway, glycogenesis and glycogenolysis. Dihydroxyacetone phosphate can become glycerol 3-phosphate for triacylglycerol and phospholipid synthesis. 3-phosphoglycerate can become serine. Pyruvate has four fates: active acetate, oxaloacetate, alanine and lactate.

### Clinical significance
The red cell's dependence on glycolysis explains why a defect in it causes haemolysis. Pyruvate kinase deficiency appears in the book's own list of causes of haemolytic jaundice under "red cell enzyme deficiency", beside G6PD — one cell, two pathways, two ways to fail.

2,3-BPG is the reason a stored, transfused red cell delivers oxygen less well than a fresh one, and the reason anaemia and altitude are tolerated better than the numbers suggest. The Biochemistry book states the effect on affinity and stops there; the physiological consequences are not in any 103 BMS source and are deliberately not asserted in this article.

### Common misconceptions
Three. That the shunt consumes ATP — it does not, it simply makes none. That the bypassed enzyme is pyruvate kinase — it is phosphoglycerate kinase, and the diagram's own ADP-to-ATP arrow sits on it. And that 2,3-BPG helps haemoglobin take up oxygen; it does the opposite, and a student with that direction reversed will misread every compensation later in the course.

## published_summary

## published_sections

## hold_these
As RBCs lack mitochondria, glycolysis is the only source of ATP through substrate level phosphorylation.
The NADH from the glyceraldehyde 3-phosphate dehydrogenase step keeps haemoglobin iron ferrous and prevents methaemoglobin.
The shunt bypasses phosphoglycerate kinase, which is where glycolysis would have made its ATP.
2,3-BPG lowers haemoglobin's oxygen affinity, so oxygen is delivered to tissues.
Fluoride is added to a glucose sample because it inhibits enolase and stops the sample glycolysing.

## lose_the_mark
Saying the BPG shunt consumes ATP rather than producing none.
Naming pyruvate kinase as the bypassed enzyme.
Answering "for energy" alone when asked the importance of glycolysis for red cells, and leaving out methaemoglobin.
Saying 2,3-BPG increases haemoglobin's affinity for oxygen.

## callout_evidence
### As RBCs lack mitochondria, glycolysis is the only source of ATP through substrate level phosphorylation.
Claims: CLM-HEM-RBC-GLYCOLYSIS-ATP-01
Citations: CIT-KA-BIO103-RBC-GLYCOLYSIS-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### The shunt bypasses phosphoglycerate kinase, which is where glycolysis would have made its ATP.
Claims: CLM-HEM-BPG-SHUNT-NO-ATP-01
Citations: CIT-KA-BIO103-BPG-SHUNT-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### 2,3-BPG lowers haemoglobin's oxygen affinity, so oxygen is delivered to tissues.
Claims: CLM-HEM-BPG-OXYGEN-AFFINITY-01
Citations: CIT-KA-BIO103-BPG-AFFINITY-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-HEM-095C9C97B56CCA | CON-HEM-7FBB4829A4A4EC | CON-HEM-6B557A065A8D90

## related_articles
ART-103-BIO-HMP-PATHWAY-AND-G6PD: the other branch of red cell glucose metabolism, which makes reducing power instead of ATP
ART-103-BIO-TCA-KEY-ENZYMES: the pathway the red cell does not have, and the reason its yield stops at two ATP

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-HEM-RBC-GLYCOLYSIS-ATP-01 | CLM-HEM-BPG-SHUNT-NO-ATP-01 | CLM-HEM-BPG-OXYGEN-AFFINITY-01

## span_ids
SPN-BIO-RBC-GLYCOLYSIS-01 | SPN-BIO-BPG-SHUNT-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## university_notes
kau: "BPG Shunt in Red Blood Cells (26)" is one of the twenty-two diagrams the Biochemistry department names as examinable, and the 2025 end-of-year paper set it as Diagram (2) with the substrate and the bypassed enzyme as label marks. The book prints the shunt inside "Importance of Glycolysis" rather than as a section of its own, which is why the subject tree has no node for it.

## annotations
### definition_of · CON-HEM-095C9C97B56CCA
Quote: As RBCs lack mitochondria, glycolysis is the only source of ATP through substrate level phosphorylation.
Block: body

### definition_of · CON-HEM-7FBB4829A4A4EC
Quote: 2,3-bisphosphoglycerate mutase catalyses the conversion of 1,3-bisphosphoglycerate into 2,3-bisphosphoglycerate, bypassing the reaction catalysed by phosphoglycerate kinase, which is the site of ATP yield.
Block: body

### definition_of · CON-HEM-6B557A065A8D90
Quote: 2,3-BPG binds to haemoglobin and decreases its affinity for oxygen, favouring delivery of oxygen to the tissues.
Block: body

## media

## media_recommendations
### diagram · BPG shunt in red blood cells, drawn against the glycolytic main line
Brief: Glyceraldehyde 3-phosphate down to pyruvate as the main line, with 1,3-bisphosphoglycerate branching through bisphosphoglycerate mutase to 2,3-bisphosphoglycerate and back through 2,3-bisphosphoglycerate phosphatase to 3-phosphoglycerate; the phosphoglycerate kinase step on the main line labelled with its ADP → ATP arrow and Mg²⁺, and the Pi and H₂O on the phosphatase step
Purpose: Teaches CON-HEM-7FBB4829A4A4EC, and it is the diagram the 2025 paper handed students for Diagram (2). The answer to "why is there no net ATP" is a spatial fact — the shunt rejoins the line below the arrow that makes the ATP — and no sentence carries it as well as seeing the two paths side by side. Two of that question's four marks are for labelling the substrate and the bypassed enzyme on this figure.
Priority: required
Status: needed
Section: Mechanism
Kind: flowchart
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### graph · Oxygen dissociation curve with and without 2,3-BPG
Brief: Haemoglobin oxygen saturation against partial pressure, with a normal curve and a right-shifted curve at raised 2,3-BPG, and the difference in oxygen released at tissue partial pressure marked between them
Purpose: Teaches CON-HEM-6B557A065A8D90. "Decreases affinity" is a direction, and students reverse it constantly; the curve makes the direction and its consequence one picture. Prose can say oxygen is released more readily, but only the gap between two curves at tissue pO₂ shows how much.
Priority: strongly helpful
Status: needed
Section: Mechanism
Kind: graph
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain
Notes: The Biochemistry book does not print this curve and the 103 Physiology book does not cover the dissociation curve at all, so any caption must not be attributed to either.

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter III "Carbohydrate Metabolism", pages 25 to 27 and 37.
Section 1 Diagram (2) of the 2025 end-of-year paper for module 103 BMS establishes that the shunt and its product are examined, and is cited as curriculum signal only.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book gives no figure for what proportion of glycolytic flux takes the shunt, so the size of the ATP the red cell forgoes cannot be stated.
The physiological consequences of 2,3-BPG — the position of the oxygen dissociation curve, the rise in anaemia and at altitude, the fall in stored blood — are not stated in any 103 BMS source and are not asserted here.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written to carry Diagram (2) of the 2025 end-of-year paper. The three concepts stay in one article because the examiner's three parts are one argument: the shunt costs ATP, the cell can least afford it, and the product is worth it anyway. Splitting them would make the pay-off a cross-reference.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T03; the book prints the shunt inside a run-in heading rather than a section, so module_subject stops at Glycolysis and the microtopic carries the run-in label.
questionIds: No question record tests this article yet. The written question for Section 1 is a separate scope in CLAIMS.md and will add its ID.
media: No rights-cleared asset exists for any of this material. Two are requested in media_recommendations; the department book's own figures are faculty teaching material and are cited by locator, not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-PLASMA-LIPOPROTEINS

## title
Plasma lipoproteins: who carries what, and what happens when the carrier fails

## arabic_title
البروتينات الدهنية في البلازما

## aliases
Plasma lipids and lipoproteins
Chylomicrons
VLDL IDL LDL
Familial hypercholesterolaemia
Abetalipoproteinaemia
Metabolism of VLDL

## subject
gi

## topic
Lipid metabolism

## subtopic
Plasma Lipids and Lipoproteins

## microtopic
Disorders of plasma lipoproteins

## nanotopic

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
SYS-END-T07 | SYS-GIT-T06

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
Dr. Omar

## final_publisher
Admin team

## summary
Lipids do not dissolve in plasma, so they travel as lipoproteins: a hydrophobic core of triacylglycerol and cholesteryl ester wrapped in phospholipid, free cholesterol and apolipoproteins. Four classes matter, and each is defined by where it comes from and what it delivers. Chylomicrons take dietary lipid out of the gut, VLDL takes hepatic triacylglycerol out of the liver, LDL takes cholesterol to the tissues, HDL brings cholesterol back. The two disorders on the 2025 paper sit at opposite ends of that chain — one cannot clear LDL, the other cannot build the particle at all.

## sections
### Definition
Total fasting plasma lipid is 400 to 700 mg/dL after twelve hours: triacylglycerol 50 to 150, phospholipid 150 to 250, cholesterol 120 to 200, free fatty acids 10 to 20 carried on albumin, and minute amounts of other steroids, fat-soluble vitamins and carotenoids.

A lipoprotein arranges those so they can travel. The most hydrophobic lipids, triacylglycerol and cholesteryl esters, sit in the core; amphipathic lipids, phospholipids and cholesterol, surround them together with apolipoproteins. Apolipoproteins are integral, meaning they cannot be removed, like apo B, or peripheral, like apo C and apo E.

The classes, separated by ultracentrifugation according to density — the higher the fat content, the less dense the particle — are chylomicrons, VLDL, LDL, HDL and free fatty acids bound to albumin.

### Mechanism
Apolipoproteins do four jobs, and the third is the one that generates disease. They are a structural element of the particle. They activate enzymes: apo CII activates lipoprotein lipase. They interact with cell-surface receptors to direct the particle to its target, and apo B-100 on LDL is specific for uptake by the LDL receptor. And they transfer lipid between particles.

Chylomicrons are formed by intestinal cells and transport absorbed dietary lipids to the lymphatics and then to the systemic circulation. They are 98 per cent lipid, mainly triacylglycerol, and 2 per cent protein — apo B-48 and apo A in the nascent particle, which picks up apo C and apo E in the blood to become mature. Lipoprotein lipase hydrolyses about 90 per cent of the triacylglycerol to glycerol and free fatty acids, and the chylomicron remnants are taken up by the liver through apo E receptors.

VLDL is formed by liver cells and transports triacylglycerol from the liver to extrahepatic tissues. It is 90 per cent lipid, mainly triacylglycerol, and 10 per cent protein — apo B-100 in the nascent particle, which again picks up apo C and apo E. Lipoprotein lipase hydrolyses about 50 per cent of its triacylglycerol; hydrolysis and removal of apo C convert VLDL to IDL, and further hydrolysis and removal of apo E convert IDL to LDL.

LDL is 80 per cent lipid, mainly cholesteryl ester, and 20 per cent protein, all of it apo B-100. It transports cholesterol from the liver to different tissues, and it is called "bad cholesterol" because high levels lead to plaque formation in arteries. It binds specific apo B-100 receptors, 70 per cent in the liver and 30 per cent in extrahepatic tissues, and is endocytosed, releasing cholesterol for biosynthesis.

HDL is formed mainly by liver and small intestine, and its main function is removing cholesterol from tissues back to the liver — reverse cholesterol transport, the major protective mechanism against atherosclerosis, which is why it is "good cholesterol". It also acts as a reservoir of apo C and apo E and has anti-inflammatory, antioxidant and vasodilatory effects.

### Key determinants
The two disorders on the paper are the two ends of one chain.

Familial hypercholesterolaemia is a hyperlipoproteinaemia due to a defect in LDL receptors in the liver and other tissues, which produces a marked increase in LDL in blood. The particle is made normally and cannot be cleared.

Abetalipoproteinaemia is a hypolipoproteinaemia due to failure of synthesis of apo-B. Chylomicrons cannot be formed, which gives fatty diarrhoea; VLDL cannot be formed, which gives fatty liver; and LDL cannot be formed either. Here the particle is never built, and the consequence is not that lipid is absent but that it is stranded where it was made. A low plasma VLDL means the liver has no way to export the triacylglycerol it synthesises, and that is what a fatty liver is.

### Clinical significance
Reading a lipid result depends on remembering which particle is being measured and which direction it travels. High LDL is a hazard because the particle is delivering cholesterol to arteries; high HDL is protective because it is taking cholesterol away. That is one fact about direction, not two facts about good and bad.

A low VLDL is the counter-intuitive one, and it is why the examiner asked. Low blood lipid is not automatically good news: in abetalipoproteinaemia the lipid has simply not left the hepatocyte.

Oxidation of LDL by reactive oxygen species is an important step in the pathogenesis of atherosclerosis, which is where this article meets the ROS article — the particle has to be delivered to the artery wall and then oxidised for the plaque to form.

### Common misconceptions
Confusing apo B-48 with apo B-100. B-48 is intestinal and marks the chylomicron; B-100 is hepatic, marks VLDL and its descendants, and is what the LDL receptor recognises. Confusing familial hypercholesterolaemia with abetalipoproteinaemia is the other, and the book invites it by printing them on the same page as the two examples of opposite disorders — one raises lipoproteins by failing to clear them, the other lowers them by failing to make them.

## published_summary

## published_sections

## hold_these
Chylomicrons transport absorbed dietary lipids to the lymphatics and then to the systemic circulation; VLDLs transport triacylglycerol from the liver to extrahepatic tissues.
Apo B-48 is intestinal and apo B-100 is hepatic, and it is apo B-100 that the LDL receptor recognises.
Familial hypercholesterolaemia is a defect of the LDL receptor, so LDL cannot be cleared.
A low plasma VLDL means hepatic triacylglycerol cannot be exported, and the result is a fatty liver.
VLDL becomes IDL when apo C is removed, and IDL becomes LDL when apo E is removed.

## lose_the_mark
Answering "they transport fat" for both chylomicrons and VLDL, and giving neither direction.
Naming atherosclerosis as the disease caused by a defect in LDL uptake, when it is the consequence rather than the disease.
Reading a low plasma VLDL as harmless because blood lipids are low.

## callout_evidence
### Chylomicrons transport absorbed dietary lipids to the lymphatics and then to the systemic circulation; VLDLs transport triacylglycerol from the liver to extrahepatic tissues.
Claims: CLM-GIT-CHYLOMICRON-VLDL-FUNCTION-01
Citations: CIT-KA-BIO103-LIPOPROTEIN-FUNCTION-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### Familial hypercholesterolaemia is a defect of the LDL receptor, so LDL cannot be cleared.
Claims: CLM-GIT-LDL-RECEPTOR-DEFECT-01
Citations: CIT-KA-BIO103-FAMILIAL-HYPERCHOL-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### A low plasma VLDL means hepatic triacylglycerol cannot be exported, and the result is a fatty liver.
Claims: CLM-GIT-LOW-VLDL-FATTY-LIVER-01
Citations: CIT-KA-BIO103-LOW-VLDL-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-GIT-33EAF87333AAD5 | CON-GIT-8C5125A491B189 | CON-GIT-38CC5CC7716DB7

## related_articles
ART-GIT-TOP-E391F29EBF: the live fatty liver article, which covers the other routes to hepatic steatosis
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE: oxidation of LDL is the step that turns a delivered particle into a plaque

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-GIT-CHYLOMICRON-VLDL-FUNCTION-01 | CLM-GIT-LDL-RECEPTOR-DEFECT-01 | CLM-GIT-LOW-VLDL-FATTY-LIVER-01

## span_ids
SPN-BIO-LIPOPROTEIN-FUNCTION-01 | SPN-BIO-LOW-VLDL-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## university_notes
kau: Three of the twenty-two diagrams the Biochemistry department names as examinable come from this one section — Metabolism of chylomicron (77), Metabolism of VLDL (78) and Metabolism of HDL (79). The 2025 end-of-year paper set the VLDL one as Diagram (3), with apo B-100 and lipoprotein lipase as the two label marks.

## annotations
### definition_of · CON-GIT-33EAF87333AAD5
Quote: Chylomicrons are formed by intestinal cells and transport absorbed dietary lipids to the lymphatics and then to the systemic circulation.
Block: body

### definition_of · CON-GIT-8C5125A491B189
Quote: Familial hypercholesterolaemia is a hyperlipoproteinaemia due to a defect in LDL receptors in the liver and other tissues, which produces a marked increase in LDL in blood.
Block: body

### definition_of · CON-GIT-38CC5CC7716DB7
Quote: A low plasma VLDL means the liver has no way to export the triacylglycerol it synthesises, and that is what a fatty liver is.
Block: body

## media

## media_recommendations
### diagram · Metabolism of VLDL, IDL and LDL from liver to extrahepatic tissue
Brief: Nascent VLDL leaving the liver with apo B-100, acquiring apo C and apo E to become mature VLDL, lipoprotein lipase releasing free fatty acids and glycerol, apo C removed to give IDL, apo E removed to give LDL, and LDL returning to apo B-100 receptors marked 70 per cent liver and 30 per cent extrahepatic tissues
Purpose: Teaches CON-GIT-33EAF87333AAD5 and CON-GIT-8C5125A491B189, and it is the diagram the 2025 paper handed students for Diagram (3). The transformation of one particle into the next by losing named apolipoproteins is a sequence with two subtractions in it, and prose forces a student to hold the whole chain in working memory. Two of that question's five marks are for labelling apo B-100 and lipoprotein lipase on this figure.
Priority: required
Status: needed
Section: Mechanism
Kind: flowchart
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### diagram · Cross-section of a lipoprotein particle
Brief: One particle cut open: triacylglycerol and cholesteryl ester in the core, a surrounding monolayer of phospholipid and free cholesterol, and integral and peripheral apolipoproteins drawn differently and labelled as such
Purpose: The whole reason a lipoprotein exists is that a hydrophobic core needs an amphipathic shell, and that is a fact about arrangement in space. Students who meet only the percentage compositions memorise numbers without understanding why the particle has to be built this way.
Priority: strongly helpful
Status: needed
Section: Definition
Kind: diagram
Source direction: openly licensed biochemistry text
Rights: must be CC-BY or public domain

### comparison table · The five plasma lipoprotein classes side by side
Brief: A table of chylomicrons, VLDL, IDL, LDL and HDL against protein content, lipid content, source and main function, with the apolipoproteins of each named
Purpose: This is the article's densest set of facts and the section format forbids tables in prose. Four classes each with four attributes is exactly the material a comparison table carries and running text loses, and the exam asks students to distinguish two of them in one answer.
Priority: required
Status: needed
Section: Mechanism
Kind: comparison table
Source direction: openly licensed biochemistry text, or a redraw from the department book's own table on page 80 cited by locator
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter IV "Lipid Metabolism", pages 75 to 80.
Section 1 Diagram (3) of the 2025 end-of-year paper for module 103 BMS establishes that lipoprotein function and its two disorders are examined, and is cited as curriculum signal only.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book gives no inheritance pattern and no prevalence for familial hypercholesterolaemia, and no Egyptian epidemiology for dyslipidaemia. None is imported.
No treatment for either disorder is stated, because the book's lipoprotein chapter names no drug. Statins are not mentioned anywhere in it and are therefore not mentioned here.
The generalisation "low plasma VLDL causes fatty liver" is assembled from the book's account of VLDL function and its account of abetalipoproteinaemia; the book never writes the general sentence. The citation should quote both.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written to carry Diagram (3) of the 2025 end-of-year paper. HDL is included although the paper did not ask for it, because the reverse-transport direction is what makes the LDL direction meaningful and because the department names the HDL diagram as examinable too.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T04; the book's own section names are carried in module_subject and the microtopic carries the disorders sub-heading.
questionIds: No question record tests this article yet. The written question for Section 1 is a separate scope in CLAIMS.md and will add its ID.
media: No rights-cleared asset exists for any of this material. Three are requested in media_recommendations; the department book's own figures and its page 80 table are faculty teaching material and are cited by locator, not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-KETOSIS

## title
Ketone bodies and the causes of ketosis

## arabic_title
الأجسام الكيتونية وأسباب الكيتوزية

## aliases
Causes of ketosis
Ketonaemia and ketonuria
Ketogenesis and ketolysis
Diabetic ketoacidosis
Starvation ketosis

## subject
endo

## topic
Lipid metabolism

## subtopic
Metabolism of Ketone Bodies

## microtopic
Causes of Ketosis

## nanotopic

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
SYS-END-T06 | DIS-BIO-T07

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
Dr. Omar

## final_publisher
Admin team

## summary
Ketone bodies are the liver's way of sending fuel to tissues that cannot use fatty acids, and the brain lives on them after several days of starvation. Ketosis is what happens when the liver makes them faster than the tissues use them. The five causes the book lists look unrelated — starving, a fat-heavy diet, uncontrolled diabetes, anti-insulin hormones, hard prolonged exercise — until you notice that every one of them is a state in which the anti-insulin to insulin ratio is high. Learn the ratio and the list comes with it.

## sections
### Definition
Ketosis is a condition characterised by increased ketone bodies in the blood, which is ketonaemia, and in the urine, which is ketonuria. Blood ketone bodies are normally 0.5 to 3 mg/dL, and urinary output is normally less than 15 mg/day. Ketosis occurs in conditions where the rate of ketogenesis exceeds the rate of ketolysis.

### Mechanism
An increased anti-insulin to insulin ratio activates ketogenesis by three routes at once, and the book sets them out in order.

It increases the rate of lipolysis, releasing excess free fatty acids to the liver. It stimulates β-oxidation, which increases the availability of acetyl-CoA, NADH+H⁺, FADH₂ and ATP — and those in turn inhibit glycolysis and the TCA cycle. And the decrease in glucose oxidation together with the stimulation of gluconeogenesis decreases the availability of oxaloacetate for citrate synthase, so acetyl-CoA cannot enter the cycle and is diverted towards ketogenesis.

That third route is the one worth holding, because it explains why fasting and uncontrolled diabetes produce the same biochemistry: in both, the liver is making glucose, oxaloacetate is being consumed to do it, and the acetyl-CoA arriving from β-oxidation has nowhere else to go.

The causes follow from it. Ketosis occurs in starvation; on a low-carbohydrate, high-fat diet; in severe uncontrolled diabetes mellitus; on prolonged administration of anti-insulin hormones; and in prolonged and severe muscular exercise.

### Key determinants
The book divides substances into ketogenic and anti-ketogenic, which is a useful way to check any proposed cause. Ketogenic substances are fatty acids, ketogenic amino acids and anti-insulin hormones. Anti-ketogenic substances are carbohydrates, glucogenic amino acids, glycerol and insulin. A cause of ketosis is therefore anything that raises the first group or removes the second, and "low carbohydrate high fat diet" is one condition rather than two because it does both.

Ketone bodies are worth energy, which is why the body bothers. Oxidising one molecule of acetoacetate generates 19 ATP: 20 from two acetyl-CoA through the TCA cycle, minus one for activating the acetoacetate. Oxidising one molecule of 3-hydroxybutyrate generates one extra NADH, so 21.5 ATP.

### Clinical significance
After five to six days of starvation the brain adapts to use ketone bodies, which it cannot do with fatty acids, because those are bound to plasma albumin and cannot cross the blood-brain barrier. That adaptation reduces the need for gluconeogenesis and therefore the breakdown of tissue protein — ketosis in starvation is a protective mechanism before it is a pathological one.

The pathological end is acidosis. Increased production of 3-hydroxybutyrate and acetoacetate leads to acidosis and may lead to coma and death. The book states that and no more; the management of diabetic ketoacidosis is not in any 103 BMS source and is deliberately absent from this article.

### Common misconceptions
Writing "diabetes" without the qualifier. The book says severe uncontrolled diabetes mellitus, and a controlled diabetic is not in ketosis. Writing "high fat diet" alone is the other, because it is the absence of carbohydrate that permits the ketosis, not the presence of fat. And treating any ketosis as pathological misses that a starving person's brain is being kept alive by it.

## published_summary

## published_sections

## hold_these
Ketosis occurs whenever the rate of ketogenesis exceeds the rate of ketolysis.
The five causes are starvation, a low-carbohydrate high-fat diet, severe uncontrolled diabetes mellitus, prolonged anti-insulin hormones, and prolonged severe muscular exercise.
All five are states of high anti-insulin to insulin ratio.
Gluconeogenesis consumes oxaloacetate, so acetyl-CoA cannot enter the TCA cycle and goes to ketone bodies instead.
After five to six days of starvation the brain runs on ketone bodies, which spares tissue protein.

## lose_the_mark
Writing "diabetes mellitus" without "severe" and "uncontrolled".
Writing "high fat diet" and leaving out the low carbohydrate.
Treating ketosis as always pathological, when in starvation it is what protects the brain and the muscle.

## callout_evidence
### Ketosis occurs whenever the rate of ketogenesis exceeds the rate of ketolysis.
Claims: CLM-END-KETOSIS-CAUSES-01
Citations: CIT-KA-BIO103-KETOSIS-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-END-CC450A236ABF50

## related_articles
ART-103-BIO-TCA-KEY-ENZYMES: the cycle that stops for want of oxaloacetate, which is what diverts acetyl-CoA into ketogenesis
ART-103-BIO-NITROGEN-BALANCE: starvation appears in both, as a cause of ketosis and as a cause of negative nitrogen balance

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-END-KETOSIS-CAUSES-01

## span_ids
SPN-BIO-KETOSIS-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)

## university_notes
kau: Three of the twenty-two diagrams the Biochemistry department names as examinable come from this section — Ketogenesis (67), Ketolysis (68) and Metabolism of Ketone Bodies (70) — and the 2025 end-of-year paper examined the causes of ketosis as one of the five enumerate items rather than as a diagram.

## annotations
### definition_of · CON-END-CC450A236ABF50
Quote: Ketosis occurs in conditions where the rate of ketogenesis exceeds the rate of ketolysis.
Block: body

## media

## media_recommendations
### diagram · Metabolism of ketone bodies between adipose tissue, liver and extrahepatic tissue
Brief: Three labelled compartments — adipose tissue, blood, liver and extrahepatic tissue — with lipolysis releasing free fatty acids, β-oxidation to acetyl-CoA in the liver, ketogenesis producing ketone bodies, transport in blood, and ketolysis back to acetyl-CoA in muscle and brain; the increased anti-insulin to insulin ratio marked as the trigger on the adipose step
Purpose: Teaches CON-END-CC450A236ABF50. The causes of ketosis are only memorable as one hormonal state acting on a three-organ circuit, and prose has to describe the organs one at a time, which is exactly what hides the circuit. The department names this figure as examinable in its own right.
Priority: required
Status: needed
Section: Mechanism
Kind: flowchart
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### comparison table · Ketogenic against anti-ketogenic substances
Brief: Two columns — fatty acids, ketogenic amino acids and anti-insulin hormones on one side; carbohydrates, glucogenic amino acids, glycerol and insulin on the other
Purpose: The check that catches a wrong answer: any proposed cause of ketosis must raise the left column or remove the right. The section format forbids tables in prose, and a two-column list read as a sentence loses the pairing that makes it useful.
Priority: strongly helpful
Status: needed
Section: Key determinants
Kind: comparison table
Source direction: redraw from the department book's own note on page 70, cited by locator
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter IV "Lipid Metabolism", pages 69 to 70.
Section 1 question I-5 of the 2025 end-of-year paper for module 103 BMS establishes that the causes of ketosis are examined, and is cited as curriculum signal only.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book gives no threshold at which ketonaemia becomes ketoacidosis, and no definition of how prolonged or how severe the exercise must be. Neither is inferred.
No treatment is stated. Management of diabetic ketoacidosis is emergency content, is not in any 103 BMS source, and is not written here.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written to carry Section 1 question I-5 of the 2025 end-of-year paper. A single-concept article: the enumerate question asks for a list, and the value this article adds is the single hormonal state that makes the list one idea rather than five.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T04; the book's own section name is carried in module_subject and the microtopic carries its sub-heading.
questionIds: No question record tests this article yet. The written question for Section 1 is a separate scope in CLAIMS.md and will add its ID.
media: No rights-cleared asset exists for this material. Two are requested in media_recommendations; the department book's own figures are faculty teaching material and are cited by locator, not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-NITROGEN-BALANCE

## title
Nitrogen balance and the three ways it goes negative

## arabic_title
الميزان النيتروجيني وأسباب سلبيته

## aliases
Nitrogen balance
Negative nitrogen balance
Reasons for negative protein balance
Protein turnover
Biological value of proteins

## subject
fnd

## topic
Amino acids and proteins

## subtopic
General protein Metabolism

## microtopic
Nitrogen Balance

## nanotopic

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
DIS-BIO-T08 | SYS-FND-T06

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
6

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Dr. Omar

## final_publisher
Admin team

## summary
Nitrogen is about 16 per cent of protein, and almost all the nitrogen a person eats is protein while almost all the nitrogen they excrete comes from protein breakdown. So comparing the two measures whether the body is building protein or losing it. Three states exist, and the negative one has exactly three causes: too little coming in, too much leaking out, too much being broken down. Every clinical example the book gives fits under one of those three headings, which is what makes the answer to this question a structure rather than a list.

## sections
### Definition
Nitrogen forms about 16 per cent of proteins. Nitrogen balance is the quantitative difference between nitrogen intake and nitrogen output, and since most dietary nitrogen is protein nitrogen and most nitrogenous excretory products derive from protein catabolism, the balance between the two represents the balance between protein anabolism and catabolism.

Three states exist. Nitrogen equilibrium, where output equals intake, which is the normal healthy adult on an adequate diet. Positive nitrogen balance, where intake exceeds output, which occurs whenever new tissue is being built — growth, pregnancy, muscular training, and convalescence from a state of negative balance. And negative nitrogen balance, where output exceeds intake.

### Mechanism
Negative nitrogen balance has three causes, and the book gives clinical examples under each.

Inadequate protein intake. This occurs in starvation, in malnutrition, in deficiency of one or more of the essential amino acids, and in gastrointestinal disease.

Loss of protein. This occurs in chronic haemorrhage, in albuminuria, and during lactation on an inadequate diet.

Increased protein catabolism. This occurs in diabetes mellitus, Cushing's syndrome, hyperthyroidism, and infectious fevers.

The reason a deficiency of a single essential amino acid produces the same picture as eating no protein at all is that protein synthesis needs every one of its amino acids present at once; a diet lacking one cannot build protein, whatever the total nitrogen it delivers.

### Key determinants
Biological value is what sets whether an intake is adequate. A high biological value protein is easily digested and contains all the essential amino acids in adequate amounts. Animal proteins — eggs, milk and its products, meat, fish, poultry — are generally of high biological value. Plant proteins — legumes, cereals, nuts — are generally lower, but a mixture of low biological value proteins may give a diet of high biological value. That last clause matters where animal protein is expensive.

The caloric value of protein is 4 kcal/g, close to carbohydrate and less than half that of fat at 9 kcal/g. Carbohydrate and fat in the diet spare protein from being oxidised for energy, which is why an adequate protein intake is not sufficient on its own if total energy is short.

Protein turnover runs continuously: cellular proteins are degraded and resynthesised, about 75 per cent of amino acids are reutilised, and the rest are rapidly degraded. That is the background against which balance is measured.

### Clinical significance
Every cause on the list is met on the wards. Chronic haemorrhage and albuminuria are the two protein-losing states a first-year student will see soonest, in a bleeding gastrointestinal lesion and in nephrotic-range proteinuria. Diabetes mellitus, Cushing's syndrome and hyperthyroidism are the three endocrine catabolic states, and infectious fever is the commonest of all.

The book's own connection is between negative balance and the fate of the nitrogen removed: catabolism cleaves amino acids into ammonia and a carbon skeleton, the ammonia is converted mostly to urea and excreted in urine, and the carbon skeleton becomes glucose, ketone bodies, or carbon dioxide and water. A rising urea in a catabolic patient is that pathway made visible.

Local context is worth stating plainly. Where animal protein is costly, the book's own note that a mixture of low biological value plant proteins can together be of high biological value is the practical teaching point, not a footnote.

### Common misconceptions
Answering with examples rather than causes — "starvation, bleeding, fever" — which is six items in no order where the mark scheme wants three headings. The other is treating positive balance as always desirable and negative as always pathological: convalescence is positive, and a growing child in positive balance and an adult in equilibrium are both normal.

## published_summary

## published_sections

## hold_these
Negative nitrogen balance exists when output exceeds intake, and it has three causes: inadequate intake, loss of protein, and increased catabolism.
Nitrogen is about 16 per cent of protein, which is what makes the comparison possible at all.
Deficiency of one essential amino acid produces negative balance even when total protein intake looks adequate.
A mixture of low biological value plant proteins can together give a diet of high biological value.
Carbohydrate and fat spare protein from oxidation, so an adequate protein intake still fails if total energy is short.

## lose_the_mark
Listing clinical examples instead of the three causes they belong under.
Forgetting that lactation on an inadequate diet is a protein-losing state.
Assuming negative balance always means the patient is not eating.

## callout_evidence
### Negative nitrogen balance exists when output exceeds intake, and it has three causes: inadequate intake, loss of protein, and increased catabolism.
Claims: CLM-FND-NEGATIVE-NITROGEN-BALANCE-01
Citations: CIT-KA-BIO103-NITROGEN-BALANCE-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-FND-B320D24EC35D30

## related_articles
ART-103-BIO-KETOSIS: starvation appears in both, and the ketone bodies are what spare the tissue protein
ART-103-BIO-PHENYLKETONURIA: the case where restricting one amino acid is the treatment rather than the disease

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-FND-NEGATIVE-NITROGEN-BALANCE-01

## span_ids
SPN-BIO-NITROGEN-BALANCE-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > General protein Metabolism

## university_notes
kau: The subject tree lists General protein Metabolism with three children — Removal of Amino Acid Nitrogen, Metabolism of Ammonia and Urea Cycle — and nitrogen balance is not among them, because the book prints it as a run-in heading before those sections begin. A module_subject path for this material therefore stops at the chapter, and the microtopic field carries the run-in heading.

## annotations
### definition_of · CON-FND-B320D24EC35D30
Quote: Nitrogen balance is the quantitative difference between nitrogen intake and nitrogen output, and since most dietary nitrogen is protein nitrogen and most nitrogenous excretory products derive from protein catabolism, the balance between the two represents the balance between protein anabolism and catabolism.
Block: body

## media

## media_recommendations
### diagram · Overall protein metabolism, from dietary protein to the amino acid pool and out
Brief: Dietary protein and body protein feeding one amino acid pool, with anabolic arrows to tissue and plasma proteins and to haem, creatine, purines, pyrimidines, neurotransmitters and hormones, and catabolic arrows to ammonia and urea and to the carbon skeleton splitting into glucogenic and ketogenic routes
Purpose: Teaches CON-FND-B320D24EC35D30 by showing what "intake" and "output" actually name. Balance is a statement about a pool with arrows in and arrows out, and a student who has only read the definition cannot say which arrows count. The department names this figure as examinable in its own right.
Priority: required
Status: needed
Section: Definition
Kind: flowchart
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### comparison table · The three states of nitrogen balance with their causes
Brief: Three rows — equilibrium, positive, negative — against the relation of intake to output and the conditions in which each occurs, with the negative row broken into the three causes and their clinical examples
Purpose: The examiner's mark scheme is a structure of three headings with examples underneath, and the section format forbids tables in prose. A student revising this needs to see the three-under-one shape, which running text flattens.
Priority: strongly helpful
Status: needed
Section: Mechanism
Kind: comparison table
Source direction: redraw from the department book's own text on pages 81 to 82, cited by locator
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter V "General Aspects of Protein Metabolism", pages 81 to 82.
Section 1 question I-3 of the 2025 end-of-year paper for module 103 BMS establishes that the reasons for negative protein balance are examined, and is cited as curriculum signal only.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry or nutrition reference has been attached.
The book gives no figure for an adequate protein intake and no Egyptian reference intake exists in the corpus, so none is quoted.
The book lists lactation under loss of protein while listing pregnancy under positive balance, without reconciling the two. That is left as the book has it.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written to carry Section 1 question I-3 of the 2025 end-of-year paper. Biological value and the protein-sparing effect are included although the paper did not ask for them, because "inadequate intake" is not a usable cause without them.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T05, and the subject tree's children of this chapter do not include nitrogen balance, so there is nothing finer to record than the microtopic.
questionIds: No question record tests this article yet. The written question for Section 1 is a separate scope in CLAIMS.md and will add its ID.
media: No rights-cleared asset exists for this material. Two are requested in media_recommendations; the department book's own figure is faculty teaching material and is cited by locator, not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-PHENYLKETONURIA

## title
Phenylketonuria: one missing enzyme followed to the clinic

## arabic_title
بيلة الفينيل كيتون

## aliases
Phenylketonuria
PKU
Phenylalanine hydroxylase deficiency
Mousy urine odour
Hypopigmentation in PKU
Metabolic disorder of phenylalanine metabolism

## subject
fnd

## topic
Amino acids and proteins

## subtopic
Aromatic Amino Acids

## microtopic
Metabolic Disorder of Phenylalanine and Tyrosine Metabolism

## nanotopic

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-FND-T02 | SYS-NEU-T02

## template_id
TPL-CONDITION

## archetype
condition

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
Dr. Omar

## final_publisher
Admin team

## summary
Phenylalanine hydroxylase turns phenylalanine into tyrosine. Take it away and two things happen at once: phenylalanine piles up and is diverted into metabolites that give the urine a mousy smell, and tyrosine is never made, so everything downstream of tyrosine fails. That single fork explains the whole presentation — the mental retardation, the pale skin, the smell — and it explains the treatment, which is to take the substrate out of the diet and put the product back in.

## sections
### Definition
Phenylketonuria is a metabolic disorder of phenylalanine and tyrosine metabolism in which phenylalanine cannot be hydroxylated to tyrosine. Phenylalanine is an essential amino acid; tyrosine is non-essential only because it is normally made from phenylalanine, by phenylalanine hydroxylase (PAH), which requires tetrahydrobiopterin (BH4) as its coenzyme and hydrogen donor.

### Classification
The book divides cases by which molecule is missing. Most cases of PKU are due to deficiency of the enzyme phenylalanine hydroxylase itself. About 1 to 2 per cent are due to deficiency of tetrahydrobiopterin, the coenzyme. The distinction is not academic: it changes the treatment.

### Epidemiology
The department book gives no incidence for phenylketonuria, in Egypt or anywhere, and no statement about newborn screening. Neither figure is supplied here, and neither should be imported from a foreign source without a local review. What the book does say is that early diagnosis is important to avoid mental retardation, which presupposes that cases are found before they present — how that happens in practice in Egypt is not addressed by any source in this corpus.

### Aetiology and risk factors
Deficiency of phenylalanine hydroxylase, or in the minority of cases deficiency of its coenzyme tetrahydrobiopterin. The book describes PKU as one of the metabolic disorders of this pathway alongside alkaptonuria, which is deficiency of homogentisate oxidase, and albinism, which is lack of tyrosinase. It gives no other risk factor.

### Pathophysiology
Everything follows from the blocked step, and it is worth tracing in the book's own order.

Phenylalanine accumulates. Since it cannot be converted to tyrosine, it is metabolised instead to phenylpyruvate and phenyl-lactate, and the pathway diagram also carries phenylacetate and phenyl-acetylglutamine. Phenylalanine and its metabolites appear in elevated concentration in tissues, plasma and urine, and these metabolites give urine a characteristic musty, mousy odour.

The nervous system is damaged in two ways, neither of them direct toxicity. The elevated phenylalanine and its metabolites interfere with the transport of tyrosine and tryptophan to the brain, leading to their deficiency there. And the low tyrosine leads to impaired neurotransmitter synthesis in the brain — tyrosine is hydroxylated to DOPA, and DOPA is the precursor of dopamine, noradrenaline and adrenaline. The book offers this as the explanation for why an untreated patient shows mental retardation, manifest by the age of one year, and it hedges the claim with "may explain".

The skin, hair and iris are hypopigmented, and here too there are two mechanisms. Melanin is made from DOPA in melanocytes by tyrosinase, so a shortage of tyrosine is a shortage of the substrate. On top of that, high levels of phenylalanine competitively inhibit tyrosinase itself.

### Clinical picture
The 2025 case describes it exactly: an infant with hypopigmented skin compared with the siblings, a mousy urine odour, elevated phenylpyruvate and phenylacetate, and mental retardation. Pallor relative to unaffected siblings is the useful clinical detail, because it makes hypopigmentation a comparison rather than an absolute.

### Investigation
The book names the biochemical findings rather than a test protocol: phenylalanine and its metabolites elevated in tissues, plasma and urine. It gives no assay, no cut-off, and no screening method, and none is invented here.

### Management
Early diagnosis of PKU is important to avoid mental retardation, as the disease is treatable by dietary means.

The treatment of classic PKU consists of dietary restriction of phenylalanine, using a phenylalanine-free milk formula, with tyrosine supplementation. Tyrosine has to be supplied because this patient cannot make it — for them it has become an essential amino acid.

In the rare cases due to BH4 deficiency, the treatment is both dietary and supplementation of BH4.

That is the whole of what the department book says about treatment, and this article says no more. No target blood level, no age at which the diet may be relaxed, no statement about diet in pregnancy, and no product name: the availability and cost of a phenylalanine-free formula in Egypt is not stated in any source in this corpus.

### Complications and prognosis
Untreated, the mental retardation is manifest by the age of one year, which is the book's own statement of the time available. It gives no prognosis for treated patients and no long-term outcome data, so none is stated.

### Prevention
The book's only preventive statement is that early diagnosis avoids the mental retardation. It does not describe a screening programme.

## published_summary

## published_sections

## hold_these
The deficient enzyme is phenylalanine hydroxylase, and its coenzyme is tetrahydrobiopterin.
The mousy odour comes from the metabolites phenylalanine is diverted into when it cannot become tyrosine.
The neurological damage is deprivation, not toxicity: tyrosine and tryptophan are kept out of the brain and tyrosine is low to begin with.
Hypopigmentation has two causes at once — too little tyrosine to make melanin from, and phenylalanine competitively inhibiting tyrosinase.
Treatment is dietary restriction of phenylalanine with tyrosine supplementation, and BH4 as well in the rare coenzyme-deficient cases.

## lose_the_mark
Naming tyrosinase as the deficient enzyme because the child is pale; that is albinism.
Saying phenylalanine is directly toxic to neurones instead of giving the transport and neurotransmitter mechanism.
Giving only the tyrosine-deficiency half of the hypopigmentation and leaving out tyrosinase inhibition.
Writing "protein-free diet" when the restriction is of one amino acid, which an infant still needs some of.

## callout_evidence
### The deficient enzyme is phenylalanine hydroxylase, and its coenzyme is tetrahydrobiopterin.
Claims: CLM-FND-PKU-ENZYME-DEFECT-01
Citations: CIT-KA-BIO103-PKU-ENZYME-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### The neurological damage is deprivation, not toxicity: tyrosine and tryptophan are kept out of the brain and tyrosine is low to begin with.
Claims: CLM-FND-PKU-NEUROLOGICAL-01
Citations: CIT-KA-BIO103-PKU-CNS-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### Hypopigmentation has two causes at once — too little tyrosine to make melanin from, and phenylalanine competitively inhibiting tyrosinase.
Claims: CLM-FND-PKU-HYPOPIGMENTATION-01
Citations: CIT-KA-BIO103-PKU-PIGMENT-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### Treatment is dietary restriction of phenylalanine with tyrosine supplementation, and BH4 as well in the rare coenzyme-deficient cases.
Claims: CLM-FND-PKU-DIETARY-TREATMENT-01
Citations: CIT-KA-BIO103-PKU-TREATMENT-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-FND-D7BB8C3AFB54CC | CON-FND-587B0A39D3C0BD | CON-FND-1DF6B985CB77A1 | CON-FND-81A4F3A9C51B7B

## related_articles
ART-103-BIO-NITROGEN-BALANCE: why removing one essential amino acid from a diet is a serious intervention rather than a simple one
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS: tetrahydrobiopterin is a coenzyme like the vitamin-derived ones, and the same distinction between missing enzyme and missing coenzyme applies

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-FND-PKU-ENZYME-DEFECT-01 | CLM-FND-PKU-NEUROLOGICAL-01 | CLM-FND-PKU-HYPOPIGMENTATION-01 | CLM-FND-PKU-DIETARY-TREATMENT-01

## span_ids
SPN-BIO-PKU-ENZYME-01 | SPN-BIO-PKU-TREATMENT-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

## university_notes
kau: The Biochemistry department cancels eight of the individual amino acids from both exams — alanine, serine, threonine, aspartic acid, arginine, lysine, histidine and proline — but not the aromatic amino acids, and the 2025 end-of-year paper set PKU as Case (1). The paper letters that case a, b, b, c, d, with the letter b used twice and no e; the question record for it must decide whether to reproduce the mislettering or renumber, and must not assume five cleanly lettered subparts.

## annotations
### definition_of · CON-FND-D7BB8C3AFB54CC
Quote: Phenylketonuria is a metabolic disorder of phenylalanine and tyrosine metabolism in which phenylalanine cannot be hydroxylated to tyrosine.
Block: body

### definition_of · CON-FND-1DF6B985CB77A1
Quote: On top of that, high levels of phenylalanine competitively inhibit tyrosinase itself.
Block: body

### definition_of · CON-FND-81A4F3A9C51B7B
Quote: The treatment of classic PKU consists of dietary restriction of phenylalanine, using a phenylalanine-free milk formula, with tyrosine supplementation.
Block: body

## media

## media_recommendations
### diagram · The phenylalanine to tyrosine fork, with the PKU block and both branches marked
Brief: Phenylalanine at the top with phenylalanine hydroxylase and BH4 to tyrosine on one branch, marked "blocked in phenylketonuria"; the diverted branch to phenylpyruvate, phenyl-lactate, phenylacetate and phenyl-acetylglutamine below it; and from tyrosine the three downstream products — DOPA to catecholamines, DOPA to melanin by tyrosinase, and thyroid hormones
Purpose: Teaches CON-FND-D7BB8C3AFB54CC, CON-FND-587B0A39D3C0BD and CON-FND-1DF6B985CB77A1 at once. Every symptom of PKU is a branch of this fork, and the whole point of the disease is that one block has consequences in three directions. Prose has to walk the branches one at a time, which is precisely what stops a student seeing that they share a cause.
Priority: required
Status: needed
Section: Pathophysiology
Kind: flowchart
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figures on pages 100 and 101 cited by locator
Rights: must be CC-BY or public domain

### clinical photograph · Hypopigmentation in an affected infant beside an unaffected sibling
Brief: A child with PKU photographed with an unaffected sibling, showing the relative difference in skin, hair and iris pigmentation, with consent and identity protection
Purpose: Teaches CON-FND-1DF6B985CB77A1. The presentation is comparative — "hypopigmented skin compared to siblings", as the exam stem puts it — and a comparison is not conveyable in words to a student who has never seen one. Priority is deliberately not "required": this is a photograph of an identifiable child and it must not be sourced without proper consent.
Priority: optional
Status: needed
Section: Clinical picture
Kind: clinical photograph
Source direction: openly licensed paediatric or metabolic medicine atlas, consent documented
Rights: must be CC-BY or public domain, and consent for publication must be on record

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter VI "Individual Amino Acid Metabolism", pages 100 to 102.
Section 1 Case (1) of the 2025 end-of-year paper for module 103 BMS establishes that the diagnosis, the enzyme, both mechanisms and the treatment are examined, and is cited as curriculum signal only. The model answers to that case do not extract from the solved copy's text layer and were read visually from the render; they reproduce the book's sentences word for word.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry or metabolic medicine reference has been attached.
Epidemiology is absent entirely: the book gives no incidence and no screening statement, and no foreign figure is substituted.
The Management section is treatment content and must not auto-publish. CLM-FND-PKU-DIETARY-TREATMENT-01 is to be written with risk_class treatment_or_action. No dose, no target level and no product name is given, because the book gives none and local availability could not be verified.
The book states the neurological mechanism tentatively — "this may explain why" — and the article keeps that hedge rather than reporting it as settled.

## conflicts
The exam stem names phenylacetate among the raised metabolites; the book's prose names phenylpyruvate and phenyl-lactate and shows phenylacetate only on its pathway diagram. The two agree in substance and differ in which metabolites each chooses to name. Both are recorded rather than one being preferred silently.

## last_reviewed

## review_due

## notes
Written to carry Section 1 Case (1) of the 2025 end-of-year paper. TPL-CONDITION rather than TPL-CONCEPT because the examiner asked it as a case, with a diagnosis, two mechanisms and a treatment, which is the shape of a condition article. Epidemiology and Investigation are present and say what the book does not cover, rather than being filled from elsewhere.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T05; the book's section title is carried by the microtopic and the subject tree's leaf by module_subject.
questionIds: No question record tests this article yet. The written question for Section 1 Case (1) is a separate scope in CLAIMS.md and will add its ID.
media: No rights-cleared asset exists for this material. Two are requested in media_recommendations, one of them deliberately at low priority because it would be a photograph of an identifiable child. The department book's own figures are faculty teaching material and are cited by locator, not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-GOUT-AND-HYPERURICAEMIA

## title
Gout and hyperuricaemia: too much made, or too little excreted

## arabic_title
النقرس وفرط حمض البوليك في الدم

## aliases
Gout
Hyperuricaemia
Tophi
Uric acid
Allopurinol
Uricosuric drugs
Disorders of purine metabolism

## subject
renal

## topic
Molecular biology

## subtopic
Disorders of Purine Metabolism

## microtopic
Hyperuricemia

## nanotopic

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-MSK-T04 | SYS-REN-T06

## template_id
TPL-CONDITION

## archetype
condition

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
Dr. Omar

## final_publisher
Admin team

## summary
Uric acid is the end product of purine catabolism in the human liver, and it is barely soluble. Raise it and it crystallises — in a joint as gout, in soft tissue as a tophus, in the urinary tract as a stone. There are only two ways to raise it: make more, or excrete less. Every cause the book lists, including the alcohol one the 2025 paper asked about, sorts into one of those two, and so does every drug that lowers it.

## sections
### Definition
Uric acid is the main end product of purine catabolism in the human liver. Plasma urate is 4 to 7 mg/dL in men and 3 to 6 mg/dL in women during fasting, and normal adults excrete about 400 to 600 mg a day.

Hyperuricaemia is an elevated serum urate, resulting from overproduction, which the book calls metabolic, or from decreased excretion, which it calls renal.

Gout is a painful inflammation in one or more joints, characterised by deposition of nodular masses of uric acid crystals — tophi — in different soft-tissue areas of the body. In the joints they are found most often as hard nodules around the fingers, at the tips of the elbows, and around the big toe, causing arthritis. Precipitation of urates in the urinary tract may lead to renal stones.

### Classification
Increased production has two branches. Dietary, from excess intake of a nucleoprotein-rich diet — meat, liver, kidney. And metabolic, which is primary when genetic and secondary when driven by disease. Primary metabolic gout covers defects of PRPP synthetase, where mutation makes the enzyme superactive or resistant to feedback inhibition; partial deficiency of HGPRTase of the purine salvage system; Lesch-Nyhan syndrome, which is complete HGPRTase deficiency; and Von Gierke's disease, glucose 6-phosphatase deficiency, through enhanced purine synthesis and degradation with decreased urate excretion. Secondary metabolic gout is due to diseases that increase purine catabolism — cancer, leukaemia and psoriasis.

Decreased excretion, renal gout, is primary when the renal disease is congenital, secondary when acquired, and also occurs with alcohol intake.

### Epidemiology
The department book gives no prevalence for gout, in Egypt or anywhere, and no age or sex distribution beyond the different normal urate ranges for men and women. No figure is imported. Alcohol intake, which is the mechanism the 2025 paper asked about, is uncommon in much of the Egyptian patient population, and the same mechanism — a raised blood lactate competing for the renal transporter — reaches a patient through exercise or hypoxia without any alcohol at all.

### Aetiology and risk factors
The alcohol route is worth following step by step, because the paper asked for it twice, once as alcohol and once as lactate.

Oxidation of alcohol to acetaldehyde generates a significant amount of NADH. The increase in the NADH/NAD⁺ ratio shifts the lactate dehydrogenase reaction toward lactate formation. The elevation of blood lactate decreases the excretion of uric acid from the kidneys, because both lactic acid and uric acid occupy the same transporter in the renal tubules. Lactate, being higher in concentration and more soluble, succeeds in binding the transporter in favour of uric acid, which is retained, causing gout. Alcohol intake also causes dehydration.

Note where the mechanism sits: this is decreased excretion, not increased production. It is a renal cause with a hepatic first step.

### Pathophysiology
Solubility is the whole of it. Urate salts are more soluble than uric acid, so the pH of the urine influences how much dissolves: urine at pH 5 can dissolve only about a tenth as much as urine at pH 7, and alkalinisation of urine markedly increases the solubility of uric acid. That single fact explains the stones, and it explains why alkalinisation is part of the advice attached to the uricosuric drugs.

Upstream, uric acid comes from AMP and GMP through the nucleotidases to adenosine and guanosine, then to inosine and guanine, then to hypoxanthine and xanthine, and finally to uric acid — the last two steps both catalysed by xanthine oxidase. That enzyme is the target of the drug.

### Clinical picture
The 2025 case gives it: inflammation around joints, especially the big toe, a high blood uric acid concentration, and tophi. Podagra — the big toe — is the presentation to recognise.

### Investigation
The book's investigation is the plasma urate against its reference range, and the daily urinary excretion. It describes no joint aspiration and no crystal microscopy, so neither is claimed here.

### Management
Diet first. Restriction of a nucleoprotein-rich diet — meat, liver and kidney — with non-cellular proteins such as milk and its products being the best. Maintaining adequate fluid intake, which helps decrease the risk of kidney stone formation. And avoiding alcohol intake.

Then drugs, in three groups.

Anti-inflammatory agents are used to decrease joint inflammation and to relieve pain. They do not lower urate, and the examiner's question excludes them.

Drugs decreasing the production of uric acid. Allopurinol is the drug of choice. It has a structural similarity to hypoxanthine; it is oxidised by xanthine oxidase to oxypurinol, and oxypurinol binds tightly to xanthine oxidase, inhibiting its ability to oxidise hypoxanthine and xanthine, and so decreasing uric acid formation. The reaction of allopurinol with PRPP also decreases PRPP levels and therefore de-novo purine synthesis. Two points of action, one drug.

Drugs increasing the excretion of uric acid, the uricosuric drugs. These medications should be taken with plenty of fluid accompanied by alkalinisation of urine, to prevent the formation of renal stones.

The department book names no member of that last class, and neither does the examiner's own model answer, which had to be read visually because it does not extract from the solved copy. No drug name is supplied here from any other source, and no dose and no brand name appears anywhere in this article: availability in Egypt could not be verified from any source in this corpus.

### Complications and prognosis
Precipitation of urates in the urinary tract may lead to renal stones, and chronic deposition gives the tophi that define chronic gout. The book states no prognosis and no rate of progression, so none is given.

### Prevention
The dietary and fluid measures above are the book's only preventive statements, and it makes no distinction between preventing a first attack and preventing recurrence.

## published_summary

## published_sections

## hold_these
Hyperuricaemia is either overproduction (metabolic) or decreased excretion (renal), and every cause sorts into one of the two.
Alcohol raises urate through lactate: NADH rises, lactate rises, and lactate takes the shared renal transporter in preference to uric acid.
Allopurinol is a xanthine oxidase inhibitor that acts through its metabolite oxypurinol, and it also lowers PRPP.
Urine at pH 5 dissolves about a tenth as much uric acid as urine at pH 7, which is why alkalinisation matters.
Anti-inflammatory drugs treat the attack and do not lower the urate.

## lose_the_mark
Explaining alcohol's effect as a purine load from the drink, when the book's mechanism is entirely renal.
Offering colchicine as a urate-lowering drug.
Answering "hyperuricaemia" alone when asked for the diagnosis in a patient with an inflamed toe and tophi.
Saying allopurinol increases urate excretion.

## callout_evidence
### Alcohol raises urate through lactate: NADH rises, lactate rises, and lactate takes the shared renal transporter in preference to uric acid.
Claims: CLM-REN-ALCOHOL-LACTATE-URATE-01
Citations: CIT-KA-BIO103-ALCOHOL-URATE-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### Allopurinol is a xanthine oxidase inhibitor that acts through its metabolite oxypurinol, and it also lowers PRPP.
Claims: CLM-REN-ALLOPURINOL-MECHANISM-01
Citations: CIT-KA-BIO103-ALLOPURINOL-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-REN-0460ED67059E66 | CON-REN-38B4BED80BC671 | CON-REN-31708150F8B722 | CON-REN-E5BAEF03791C8F

## related_articles
ART-REN-TOP-AD3B2EA126: the live purine and pyrimidine metabolism article, which carries the synthesis and salvage pathways this one only summarises
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE: uric acid is an antioxidant as well as a crystal, which is the same molecule seen from the other end

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-REN-ALCOHOL-LACTATE-URATE-01 | CLM-REN-URICOSURIC-DRUGS-01 | CLM-REN-GOUT-TOPHI-DIAGNOSIS-01 | CLM-REN-ALLOPURINOL-MECHANISM-01

## span_ids
SPN-BIO-ALCOHOL-URATE-01 | SPN-BIO-GOUT-DRUGS-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Disorders of Purine Metabolism

## university_notes
kau: Nothing in the purines and pyrimidines chapter appears in the Biochemistry department's cancelled-items table, and the 2025 end-of-year paper set gout as Case (2) with four parts, including the mechanism of the alcohol effect and the drugs that lower urate. The department's own model answer for the drug part names allopurinol and reproduces the bare heading for the uricosuric class without naming a member.

## annotations
### definition_of · CON-REN-31708150F8B722
Quote: Gout is a painful inflammation in one or more joints, characterised by deposition of nodular masses of uric acid crystals — tophi — in different soft-tissue areas of the body.
Block: body

### definition_of · CON-REN-0460ED67059E66
Quote: The elevation of blood lactate decreases the excretion of uric acid from the kidneys, because both lactic acid and uric acid occupy the same transporter in the renal tubules.
Block: body

### treated_by · CON-REN-E5BAEF03791C8F
Quote: It has a structural similarity to hypoxanthine; it is oxidised by xanthine oxidase to oxypurinol, and oxypurinol binds tightly to xanthine oxidase, inhibiting its ability to oxidise hypoxanthine and xanthine, and so decreasing uric acid formation.
Block: body

## media

## media_recommendations
### diagram · Catabolism of purine nucleotides to uric acid, with the allopurinol block marked
Brief: AMP and GMP down through the nucleotidases, adenosine and guanosine, inosine and guanine, to hypoxanthine and xanthine and finally uric acid, with xanthine oxidase labelled on both of its steps and allopurinol drawn inhibiting it at both
Purpose: Teaches CON-REN-E5BAEF03791C8F. Xanthine oxidase catalyses two consecutive steps, and that is why inhibiting it works so well — a fact about position in a pathway that a sentence cannot show. The book's own figure marks the inhibition twice, and the double mark is the teaching point.
Priority: required
Status: needed
Section: Pathophysiology
Kind: flowchart
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure on page 127 cited by locator
Rights: must be CC-BY or public domain

### clinical photograph · Tophi around the first metatarsophalangeal joint and the elbow
Brief: Tophaceous deposits photographed at the big toe and at the tip of the elbow, the two sites the book names, with identity protected
Purpose: Teaches CON-REN-31708150F8B722. "Nodular masses in soft tissue" is a description a student cannot convert into recognition, and the diagnosis in the 2025 case turns on recognising the sign. The distribution — big toe, finger, elbow tip — is itself diagnostic and is a spatial fact.
Priority: strongly helpful
Status: needed
Section: Clinical picture
Kind: clinical photograph
Source direction: openly licensed rheumatology atlas, consent documented
Rights: must be CC-BY or public domain

### flowchart · Causes of hyperuricaemia sorted into overproduction and decreased excretion
Brief: A two-branch tree, increased production against decreased excretion, with dietary and primary and secondary metabolic causes under the first, and primary renal, secondary renal and alcohol under the second
Purpose: The classification is the answer to most of what this topic asks, and the section format forbids a table or a nested list in prose. Written out as sentences the two-level structure disappears, and it is exactly the structure a mark scheme rewards.
Priority: required
Status: needed
Section: Classification
Kind: flowchart
Source direction: redraw from the department book's own text on page 128, cited by locator
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter IX "Metabolism of Purines and Pyrimidines", pages 127 to 129.
Section 1 Case (2) of the 2025 end-of-year paper for module 103 BMS establishes that the diagnosis, the alcohol and lactate mechanisms and the urate-lowering drugs are examined, and is cited as curriculum signal only. Its model answers do not extract from the solved copy's text layer and were read visually from the render.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry or rheumatology reference has been attached.
The Management section is treatment content and must not auto-publish. CLM-REN-ALLOPURINOL-MECHANISM-01 and CLM-REN-URICOSURIC-DRUGS-01 are both to be written with risk_class treatment_or_action.
No member of the uricosuric class is named, because neither the department book nor the examiner's own model answer names one. Nothing is supplied from elsewhere.
No dose appears for any drug, because the book states none. No brand name appears, because availability in Egypt could not be verified from any source in this corpus.
The book does not identify the shared renal transporter that lactate and urate compete for, so it is not named.
Epidemiology is absent: no prevalence, and no local data on alcohol-related gout in Egypt.
The live concept CON-REN-E5BAEF03791C8F carries a caution about impaired kidney function that this book does not state. It is retained from the live record and its source should be traced before publication.

## conflicts
The exam stem places the tophi crystals "in urine", while the book describes tophi as soft-tissue deposits and says that urate precipitating in the urinary tract forms renal stones. The paper's wording is recorded as printed in the concept's original_wording; the book's account is what this article teaches.

## last_reviewed

## review_due

## notes
Written to carry Section 1 Case (2) of the 2025 end-of-year paper. Two of its four concepts are live records this batch updates rather than duplicates, and both list ART-REN-TOP-AD3B2EA126 beside this article; medical:batch will report that live ID as authored nowhere in the batch directory. The purine synthesis and salvage pathways are deliberately left to the live article rather than restated here.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T06, which is where every live purine concept sits; the book's own section names are carried by the microtopic and by module_subject.
questionIds: No question record tests this article yet. The written question for Section 1 Case (2) is a separate scope in CLAIMS.md and will add its ID.
media: No rights-cleared asset exists for this material. Three are requested in media_recommendations; the department book's own figures are faculty teaching material and are cited by locator, not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-JAUNDICE-AND-BILIRUBIN

## title
Jaundice: reading the stool, the urine and the enzymes

## arabic_title
اليرقان: قراءة البراز والبول والإنزيمات

## aliases
Jaundice
Icterus
Hyperbilirubinaemia
Obstructive jaundice
Haemolytic jaundice
Hepatocellular jaundice
Conjugated and unconjugated bilirubin

## subject
gi

## topic
Clinical biochemistry

## subtopic
Jaundice

## microtopic
Blood Bilirubin

## nanotopic

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-GIT-T07 | SYS-HEM-T02

## template_id
TPL-CONDITION

## archetype
condition

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
Dr. Omar

## final_publisher
Admin team

## summary
Bilirubin leaves the reticuloendothelial system unconjugated and albumin-bound, is conjugated in the liver, and leaves in bile to become the pigment that colours stool. Everything you can observe in a jaundiced patient follows from where that journey was interrupted. Before the liver, the unconjugated fraction rises and the urine stays clear. After it, the conjugated fraction rises, the urine darkens and the stool pales. In the liver, both rise. Add the enzymes — ALP for obstruction, ALT and AST for cell damage — and the three-by-three table on the 2025 paper writes itself.

## sections
### Definition
Jaundice, or icterus, is the yellow colour of skin, nails and sclerae due to elevation of serum bilirubin above 2 mg/dL. Normally total serum bilirubin is 0.2 to 1.2 mg/dL, indirect 0.2 to 0.9, and direct less than 0.3.

### Classification
Jaundice is classified by the predominant form of bilirubin in serum: unconjugated hyperbilirubinaemia, conjugated hyperbilirubinaemia, or both together, which is the mixed type.

Unconjugated hyperbilirubinaemia covers haemolytic jaundice, physiological neonatal jaundice and Gilbert syndrome. Conjugated hyperbilirubinaemia is obstructive jaundice. The mixed type is hepatocellular jaundice, which the book also calls toxic hyperbilirubinaemia and, in its summary table, hepatotoxic jaundice.

### Epidemiology
The department book gives no incidence for any type of jaundice and no local data. None is imported. The only quantitative statements it makes are the reference ranges above, the 20 mg/dL albumin-binding threshold above which unconjugated bilirubin crosses the blood-brain barrier, and the 13 mg/dL that physiological neonatal jaundice usually does not reach.

### Aetiology and risk factors
Haemolytic jaundice follows increased haemolysis, and the book's causes are abnormal haemoglobin, in sickle cell anaemia and the thalassaemias; red cell enzyme deficiency, G6PD and pyruvate kinase; red cell antibodies, in incompatible transfusion and erythroblastosis fetalis; and some infections, such as malaria.

Obstructive jaundice follows obstruction of the biliary passages — gallstones, cancer of the head of the pancreas, or inflammation of the pancreas or of the passages.

Hepatocellular jaundice is usually due to viral hepatitis, and may be caused by toxins such as paracetamol and chloroform.

### Pathophysiology
Start with the normal journey, because every abnormality is a break in it.

After about 120 days the erythrocyte is taken up by reticuloendothelial cells. Haem oxygenase, with NADPH and oxygen, releases ferric iron and carbon monoxide and produces the green pigment biliverdin; biliverdin reductase reduces that to yellow bilirubin. This bilirubin is only slightly soluble in plasma, so it travels on albumin. It is the chief bilirubin in blood, called hemobilirubin or unconjugated bilirubin, and it cannot be excreted in urine. If it exceeds the carrying capacity of albumin, about 20 mg/dL, it crosses the blood-brain barrier and produces kernicterus.

In the liver, unconjugated bilirubin dissociates from albumin and glucuronyltransferase conjugates it with glucuronic acid. Conjugation increases polarity and water solubility. Conjugated bilirubin, or cholebilirubin, is excreted principally in bile; being water-soluble and not protein-bound, it can be excreted in urine and does not cross the blood-brain barrier.

In the large intestine, bacterial enzymes release bilirubin from glucuronic acid and reduce it to stercobilinogen. Most is excreted in stool and oxidised by air to brown stercobilin, which gives stool its colour. About 10 per cent is reabsorbed to the liver and re-excreted in bile — the enterohepatic circulation. A very little escapes to the systemic circulation and the kidneys as colourless urobilinogen, oxidised in air to yellow urobilin, which gives urine its normal colour.

Now the three interruptions.

In haemolytic jaundice there is increased haemolysis, producing bilirubin beyond the liver's excretory capacity. Serum bilirubin rises, mainly unconjugated. Stercobilin increases in the faeces, which becomes dark brown. Since unconjugated bilirubin is bound to plasma albumin, it cannot be excreted in the urine, hence the name acholuric jaundice.

In obstructive jaundice, conjugated bilirubin regurgitates into the blood. Serum bilirubin rises, mainly conjugated. Stercobilin disappears from the faeces leading to clay coloured stool. Conjugated bilirubin becomes excreted in the urine, which becomes dark brown in colour, and the urine also contains bile salts. Due to biliary obstruction, serum alkaline phosphatase is elevated.

In hepatocellular jaundice the capacity of the liver to conjugate decreases, giving unconjugated hyperbilirubinaemia, and swollen liver cells block the biliary canaliculi, giving conjugated hyperbilirubinaemia as well. Stercobilin in the faeces usually decreases, so the stool is faint rather than clay coloured. Conjugated bilirubin appears in the urine, which becomes dark brown. Due to liver cell damage, serum ALT and AST are elevated.

### Clinical picture
The 2025 case is the classic obstructive presentation: an older woman who ate a fatty meal, then abdominal pain proven to be gallstones, yellow skin and sclerae, dark brown urine and clay coloured stool. Each of those four findings is a step of the pathophysiology made visible, which is why the case can be answered from the mechanism rather than from memory.

### Investigation
Serum bilirubin is estimated by the Van den Bergh reaction, in which bilirubin is coupled with a reagent to yield a violet dye. The water-soluble conjugated bilirubin, not being protein-bound, reacts rapidly within one minute and is called direct reacting. The less soluble unconjugated bilirubin, bound to albumin, reacts only after a solvent such as methanol is added, at which point both fractions react and give the total bilirubin. Indirect-reacting bilirubin, which corresponds to the unconjugated fraction, is obtained by subtracting the direct from the total.

That is why "direct" and "conjugated" are the same thing, and why "indirect" is a subtraction rather than a measurement.

The enzymes complete the picture. Alkaline phosphatase is raised in obstruction. ALT and AST are raised in hepatocellular damage. The book records no enzyme change for haemolytic jaundice, and none is invented to fill that cell of the table.

### Management
The department book states treatment only for physiological neonatal jaundice: exposure to blue fluorescent light, which converts insoluble unconjugated bilirubin to more soluble photoisomers that can be excreted in bile without conjugation, and phenobarbital, which induces glucuronyltransferase. It states no treatment for obstructive or hepatocellular jaundice, and none is supplied here. Anything beyond phototherapy and enzyme induction is outside what any 103 BMS source says.

### Complications and prognosis
Kernicterus is the complication the book names: unconjugated bilirubin above about 20 mg/dL crosses the blood-brain barrier and produces brain damage. Conjugated bilirubin does not cross it and does not cause brain damage. No prognosis is given for any type.

## published_summary

## published_sections

## hold_these
Unconjugated bilirubin is albumin-bound and cannot appear in urine; conjugated bilirubin is water-soluble and can.
Clay coloured stool means no stercobilin is reaching the gut, which means the bile is not getting there.
Alkaline phosphatase rises in obstruction; ALT and AST rise in liver cell damage; the book records no enzyme change in haemolytic jaundice.
Direct-reacting and conjugated are the same fraction; indirect is the total minus the direct.
Only unconjugated bilirubin crosses the blood-brain barrier, and only above about 20 mg/dL, which is why kernicterus is a disease of the unconjugated fraction.

## lose_the_mark
Explaining dark urine in any jaundice as unconjugated bilirubin being excreted.
Filling the enzyme cell for haemolytic jaundice with something the book does not state.
Writing ALP for every jaundice that involves the biliary tree, when it marks obstruction specifically.
Calling the hepatocellular stool clay coloured; the book says faint, because some stercobilin still gets through.

## callout_evidence
### Clay coloured stool means no stercobilin is reaching the gut, which means the bile is not getting there.
Claims: CLM-GIT-OBSTRUCTIVE-JAUNDICE-STOOL-URINE-01
Citations: CIT-KA-BIO103-OBSTRUCTIVE-JAUNDICE-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### Alkaline phosphatase rises in obstruction; ALT and AST rise in liver cell damage; the book records no enzyme change in haemolytic jaundice.
Claims: CLM-GIT-JAUNDICE-CLASSIFICATION-01
Citations: CIT-KA-BIO103-JAUNDICE-TABLE-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### Unconjugated bilirubin is albumin-bound and cannot appear in urine; conjugated bilirubin is water-soluble and can.
Claims: CLM-HEM-HAEMOLYTIC-JAUNDICE-BILIRUBIN-01
Citations: CIT-KA-BIO103-HAEMOLYTIC-JAUNDICE-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-GIT-A265DD7A7CC8EF | CON-GIT-4A2A86832F1FF2 | CON-HEM-F2B664C215C912

## related_articles
ART-HEM-TOP-B697DE3AAD: the live anaemia classification article, where the haemolysis that causes the first row of the table is set out
ART-103-BIO-HMP-PATHWAY-AND-G6PD: G6PD deficiency is one of the book's own causes of haemolytic jaundice, and the point at which the two articles meet

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-GIT-OBSTRUCTIVE-JAUNDICE-STOOL-URINE-01 | CLM-GIT-JAUNDICE-CLASSIFICATION-01 | CLM-HEM-HAEMOLYTIC-JAUNDICE-BILIRUBIN-01

## span_ids
SPN-BIO-OBSTRUCTIVE-JAUNDICE-01 | SPN-BIO-JAUNDICE-TABLE-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Jaundice (Icterus or Hyperbilirubinemia)
103 BMS > Biochemistry > Heme Metabolism > Blood Bilirubin

## university_notes
kau: The Biochemistry department cancels "Biosynthesis of heme & Porphyria" on pages 115 to 118 from both exams, which is the first half of the Heme Metabolism chapter. Heme catabolism, blood bilirubin and jaundice on pages 119 to 123 are not cancelled, "Different stages of heme catabolism (120)" is named among the examinable diagrams, and the 2025 end-of-year paper set jaundice as Case (3). The paper spells the rows "Obstructive juandice" and "Hepatocelluler juandice"; the book's summary table calls the third one "Hepatotoxic Jaundice" and its prose calls it hepatocellular.

## annotations
### definition_of · CON-GIT-4A2A86832F1FF2
Quote: Jaundice is classified by the predominant form of bilirubin in serum: unconjugated hyperbilirubinaemia, conjugated hyperbilirubinaemia, or both together, which is the mixed type.
Block: body

### definition_of · CON-GIT-A265DD7A7CC8EF
Quote: Stercobilin disappears from the faeces leading to clay coloured stool.
Block: body

### definition_of · CON-HEM-F2B664C215C912
Quote: Since unconjugated bilirubin is bound to plasma albumin, it cannot be excreted in the urine, hence the name acholuric jaundice.
Block: body

## media

## media_recommendations
### diagram · The stages of haem catabolism across the three compartments
Brief: Reticuloendothelial system, blood, liver and intestine drawn as bands: haem through haem oxygenase to biliverdin and biliverdin reductase to bilirubin; albumin-bound hemobilirubin in blood; glucuronyl transferase in the liver to cholebilirubin; stercobilinogen in the gut splitting to stercobilin in stool, enterohepatic recirculation, and urobilinogen to the kidney and urobilin in urine
Purpose: Teaches CON-GIT-4A2A86832F1FF2 and CON-GIT-A265DD7A7CC8EF. Where a jaundice sits is literally a position on this diagram, and the pale stool and dark urine are two endpoints of it. A student who has read the sequence as prose can recite the steps and still not say which one an obstruction blocks. The department names this figure as examinable in its own right.
Priority: required
Status: needed
Section: Pathophysiology
Kind: flowchart
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure on page 120 cited by locator
Rights: must be CC-BY or public domain

### comparison table · Conjugated against unconjugated bilirubin on nine properties
Brief: Two columns, unconjugated and conjugated, against serum level, other name, Van den Bergh reaction, polarity, water solubility, renal excretion, albumin binding, blood-brain barrier, and the direction of change in haemolytic, obstructive and hepatotoxic jaundice
Purpose: Teaches CON-GIT-4A2A86832F1FF2, and it is the shape of the answer the 2025 paper asked for — a table. The section format forbids tables in prose, so without this asset the article has to narrate nine paired contrasts in sentences, which is exactly the form that loses the pairing.
Priority: required
Status: needed
Section: Investigation
Kind: comparison table
Source direction: redraw from the department book's own table on page 123, cited by locator
Rights: must be CC-BY or public domain

### clinical photograph · Scleral icterus, clay coloured stool and dark urine
Brief: Three panels — yellow sclera, a pale stool sample, and dark brown urine beside a normal one for comparison
Purpose: All three findings are colours, and colour is the one thing prose can never carry. The 2025 case names all three, and a student who has only read the words "clay coloured" will not recognise the sample.
Priority: strongly helpful
Status: needed
Section: Clinical picture
Kind: clinical photograph
Source direction: openly licensed gastroenterology or hepatology atlas, consent documented
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter VIII "Heme Metabolism", pages 119 to 123.
Section 1 Case (3) of the 2025 end-of-year paper for module 103 BMS establishes that the diagnosis, the stool and urine mechanism and the three-by-three table are examined, and is cited as curriculum signal only.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry or hepatology reference has been attached.
The book leaves the enzyme cell for haemolytic jaundice empty rather than writing "no change" or naming LDH. Nothing is supplied to fill it.
No epidemiology of any kind, and no local data on gallstone disease or on viral hepatitis in Egypt, which matters here because hepatitis C prevalence is materially different from Western figures and the book offers nothing.
Treatment is stated only for physiological neonatal jaundice. Nothing is written about the management of biliary obstruction, which is surgical and outside every 103 BMS source.

## conflicts
The book's summary table on page 123 labels the mixed type "Hepatotoxic Jaundice"; its prose on page 122 calls the same entity hepatocellular jaundice and toxic hyperbilirubinaemia; and the exam paper prints "Hepatocelluler juandice". All three name one thing. The article uses hepatocellular, which is the book's prose term and the closest to the paper's spelling, and records the other two rather than choosing silently.

## last_reviewed

## review_due

## notes
Written to carry Section 1 Case (3) of the 2025 end-of-year paper. One of its three concepts, CON-HEM-F2B664C215C912, is a live record this batch updates rather than duplicates, and it lists ART-HEM-TOP-B697DE3AAD beside this article. The physiological neonatal and Gilbert types are included although the paper did not ask for them, because the classification is not usable with two of its five members missing.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T07; the book's two sections are both named in module_subject and the microtopic carries the second of them.
questionIds: No question record tests this article yet. The written question for Section 1 Case (3) is a separate scope in CLAIMS.md and will add its ID.
media: No rights-cleared asset exists for this material. Three are requested in media_recommendations; the department book's own figure and its page 123 table are faculty teaching material and are cited by locator, not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## title
Vitamins: the active form, the reaction, the deficiency

## arabic_title
الفيتامينات: الشكل النشط والتفاعل ونقصه

## aliases
Vitamins
Fat soluble vitamins
Water soluble vitamins
Summary table for vitamins
Folate antagonists
Folate trap
Coenzyme forms of the B vitamins

## subject
fnd

## topic
Nutrition

## subtopic
Vitamins

## microtopic
Summary Table for Vitamins

## nanotopic

## primary_node_id
DIS-BIO-T08

## secondary_node_ids
SYS-HEM-T02 | SYS-FND-T04

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
Dr. Omar

## final_publisher
Admin team

## summary
A vitamin is examined as a triple: the active form, the reaction it runs, and what goes wrong without it. Learn the triple and a matching question is arithmetic. The division into fat-soluble and water-soluble is not a filing convenience either — it predicts storage, toxicity, and how fast a deficiency shows. Two vitamins in this chapter also have drugs built against them, and folate is the one where blocking the vitamin is the whole point of the treatment.

## sections
### Definition
Vitamins are organic compounds present in small quantities in natural food, as such or as precursors, required in trace amounts, essential for normal growth and health, mostly not synthesisable in the animal body, and not energy substrates although they may be required for energy generation. Their deficiency is manifested by characteristic clinical symptoms and signs. The recommended dietary allowance is the average daily intake sufficient to meet the requirements of healthy individuals.

They divide by solubility. Fat-soluble: A, D, E and K. Water-soluble: C and the B complex.

### Mechanism
The division predicts almost everything else. Fat-soluble vitamins are absorbed with dietary fats in chylomicrons, require a carrier protein in blood, are stored in liver and adipose tissue, carry a higher toxicity risk because they are stored and cannot be excreted in urine, and their deficiencies appear late, only when stores are depleted. Water-soluble vitamins are absorbed directly into the blood, need no carrier, are not stored except folate and B12, carry a lower toxicity risk because excess is excreted in urine, and their deficiencies appear rapidly.

Now the individual triples, which is what a matching question tests.

Vitamin A, active as retinol, retinal and retinoic acid, maintains healthy epithelium, vision, reproduction and gene expression. Deficiency gives night blindness, in which the dark adaptation time is increased, and xerophthalmia and impaired growth.

Vitamin D is hydroxylated in the liver by 25-hydroxylase to calcidiol and in the kidney by 1-hydroxylase to calcitriol, which is the active form. It maintains plasma calcium and the calcification of bone. Deficiency gives rickets in children and osteomalacia in adults.

Vitamin E, active as α-tocopherol, is the antioxidant. Deficiency increases red cell fragility and leads to anaemia.

Vitamin K, active as the hydroquinone, γ-carboxylates glutamate residues of the blood clotting factors and other proteins. Deficiency gives bleeding.

Vitamin C, active as L-ascorbic acid, is a coenzyme for prolyl and lysyl hydroxylases in collagen synthesis, for homogentisate oxidase, for 7-α-hydroxylase in bile acid synthesis, for steroid hydroxylases and for dihydrofolate reductase; it is a reducing agent that keeps iron ferrous for absorption; and it is a highly efficient water-soluble antioxidant. Deficiency is scurvy.

Thiamine, active as thiamine pyrophosphate, runs the oxidative decarboxylation of α-keto acids and the transketolase reaction. Deficiency is beriberi.

Riboflavin, as FMN and FAD, and niacin, as NAD⁺ and NADP⁺, are hydrogen carriers. Niacin deficiency is pellagra — dermatitis, diarrhoea and dementia.

Pantothenic acid is the vitamin of coenzyme A and is the acyl carrier. Deficiency is rare and manifests as fatty liver.

Pyridoxine, active as pyridoxal phosphate, is the coenzyme of amino acid metabolism — transamination, all amino acid decarboxylations, ALA synthase, kynureninase — and muscle glycogen phosphorylase has a pyridoxal phosphate at each catalytic site. Deficiency gives hypochromic anaemia, peripheral neuritis, convulsions and pellagra-like manifestations.

Biotin, as enzyme-bound biotin, runs carboxylation reactions, which is CO₂ fixation. Deficiency gives dermatitis, atrophic glossitis, anorexia and loss of hair.

Folic acid, as tetrahydrofolate, transfers one-carbon units for the synthesis of methionine, purines and pyrimidines. Deficiency gives megaloblastic anaemia and neural tube defects.

Cobalamin, as methylcobalamin and deoxyadenosylcobalamin, converts homocysteine to methionine and methylmalonyl-CoA to succinyl-CoA. Deficiency gives pernicious anaemia with gastrointestinal and neurological manifestations, including subacute combined degeneration of the lateral and posterior columns of the spinal cord.

### Key determinants
Folate and B12 are locked together, and it is the one pairing worth the effort. The different forms of folate are interconvertible except methyl-THF, whose production is irreversible; the only way to regenerate THF from it is mediated by cobalamin. So in B12 deficiency, folate is trapped as methyl-THF — the folate trap — and the patient has a functional folate deficiency on top of the B12 one. That is why B12 deficiency produces a megaloblastic anaemia indistinguishable from folate deficiency, and why treating such a patient with folic acid alone corrects the anaemia while the neurological damage goes on and becomes irreversible.

The neurological damage itself is explained by the other B12 reaction. Methylmalonyl-CoA accumulates; it competes with malonyl-CoA and inhibits fatty acid biosynthesis, which the myelin sheath needs; and it can substitute for malonyl-CoA, producing branched-chain fatty acids that disrupt membrane structure.

Two drug classes are built on folate. Sulfonamides are competitive inhibitors of the enzyme that incorporates PABA to form folic acid in bacteria, so bacterial multiplication stops; they do not affect human DNA or RNA synthesis, because mammalian cells cannot synthesise folic acid at all. Methotrexate is an anticancer drug and a competitive inhibitor of dihydrofolate reductase, so folic acid is not activated, and DNA synthesis and cell division of malignant cells stop — the conversion of dUMP to dTMP requires methylene-THF. Treatment with methotrexate is itself one of the book's listed causes of folate deficiency, which is the same mechanism seen as a side effect.

### Clinical significance
B12 absorption is where the clinical cases come from. B12 needs intrinsic factor, a glycoprotein from gastric parietal cells, because of its size; the complex binds receptors on ileal mucosa. So failure of absorption — malabsorption disease, gastrectomy, or autoimmune destruction of parietal cells — is far commoner than dietary deficiency, which is rare except among vegetarians. Any patient with megaloblastic anaemia should have a neurological examination and a B12 assessment before folate is given.

Vitamin K deficiency and the coumarin anticoagulants are the same biochemistry from two directions: the vitamin γ-carboxylates the clotting factors, and coumarins competitively inhibit it.

Local context matters for two of these. Vitamin D deficiency is common in Egypt despite the sunshine, and the book supplies no local figure. And a diet built on legumes and cereals rather than animal protein raises the question of B12 status, which the book raises only in the abstract phrase "except among vegetarians".

### Common misconceptions
Three recur. Choosing niacin for the oxidative decarboxylation of α-keto acids because both involve NAD⁺ — the coenzyme there is thiamine pyrophosphate, and niacin's answer is pellagra. Pairing folate with the spinal cord option — folate's neurological answer is neural tube defects in the newborn, and subacute combined degeneration is B12. And treating "antioxidant" as one answer when there are two, separated only by the words lipid-soluble, which is vitamin E, and water-soluble, which is vitamin C.

## published_summary

## published_sections

## hold_these
A vitamin is examined as a triple: active form, reaction, deficiency.
Fat-soluble vitamins are stored, so they are more toxic and their deficiencies appear late; water-soluble ones are not stored except folate and B12, so their deficiencies appear fast.
Calcitriol is the active form of vitamin D and it is made in the kidney by 1-hydroxylase.
Thiamine pyrophosphate runs the oxidative decarboxylation of α-keto acids; biotin runs carboxylation; pantothenic acid is the vitamin of coenzyme A.
In B12 deficiency folate is trapped as methyl-THF, so folate alone corrects the anaemia and lets the neurological damage continue.
Sulfonamides block bacterial folate synthesis, which humans do not have; methotrexate blocks dihydrofolate reductase, which humans do.

## lose_the_mark
Choosing niacin for oxidative decarboxylation of α-keto acids because both involve NAD⁺.
Pairing folate with subacute combined degeneration of the cord instead of B12.
Answering "antioxidant" without checking whether the option says lipid-soluble or water-soluble.
Explaining the selectivity of sulfonamides as poor uptake by human cells rather than as an absent pathway.

## callout_evidence
### Calcitriol is the active form of vitamin D and it is made in the kidney by 1-hydroxylase.
Claims: CLM-FND-FAT-SOLUBLE-VITAMINS-01
Citations: CIT-KA-BIO103-FAT-SOLUBLE-VIT-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### In B12 deficiency folate is trapped as methyl-THF, so folate alone corrects the anaemia and lets the neurological damage continue.
Claims: CLM-FND-WATER-SOLUBLE-VITAMINS-01
Citations: CIT-KA-BIO103-WATER-SOLUBLE-VIT-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### Sulfonamides block bacterial folate synthesis, which humans do not have; methotrexate blocks dihydrofolate reductase, which humans do.
Claims: CLM-FND-FOLATE-ANTAGONISTS-01
Citations: CIT-KA-BIO103-FOLATE-ANTAGONISTS-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-FND-46B9F239340ED9 | CON-FND-C9E5128193029E | CON-FND-1A4A49607783A9

## related_articles
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE: where vitamins C and E appear as scavenger antioxidants, and where the two are told apart
ART-103-BIO-PHENYLKETONURIA: tetrahydrobiopterin is a coenzyme like these, and the same distinction between a missing enzyme and a missing coenzyme decides the treatment

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-FND-FAT-SOLUBLE-VITAMINS-01 | CLM-FND-WATER-SOLUBLE-VITAMINS-01 | CLM-FND-FOLATE-ANTAGONISTS-01

## span_ids
SPN-BIO-VITAMINS-SUMMARY-01 | SPN-BIO-FOLATE-ANTAGONISTS-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Summary Table for Vitamins
103 BMS > Biochemistry > Vitamins > Vitamin B9 (Folic acid, Pteroyl glutamate)

## university_notes
kau: The Biochemistry final exam covers "All chapters from Bioenergetics to vitamins" except the cancelled items, and no vitamin appears in the cancelled table. The 2025 end-of-year paper set an extended matching question of ten vitamins against twelve functions; the solved copy leaves exactly two options unnumbered — "Water soluble antioxidant" and "Muscle glycogen phosphorylase" — which are the functions of vitamin C and of pyridoxine, neither of which is among the ten stems. They are the distractors, and the department's own key is what establishes that.

## annotations
### definition_of · CON-FND-46B9F239340ED9
Quote: Vitamin D is hydroxylated in the liver by 25-hydroxylase to calcidiol and in the kidney by 1-hydroxylase to calcitriol, which is the active form.
Block: body

### definition_of · CON-FND-C9E5128193029E
Quote: Thiamine, active as thiamine pyrophosphate, runs the oxidative decarboxylation of α-keto acids and the transketolase reaction.
Block: body

### definition_of · CON-FND-1A4A49607783A9
Quote: Methotrexate is an anticancer drug and a competitive inhibitor of dihydrofolate reductase, so folic acid is not activated, and DNA synthesis and cell division of malignant cells stop — the conversion of dUMP to dTMP requires methylene-THF.
Block: body

## media

## media_recommendations
### comparison table · Summary table of all thirteen vitamins
Brief: One table of vitamin, active form, main function and deficiency manifestations, split into fat-soluble and water-soluble halves, covering A, D, E, K, C, thiamine, riboflavin, niacin, pantothenic acid, pyridoxine, biotin, folic acid and cobalamin
Purpose: Teaches CON-FND-46B9F239340ED9 and CON-FND-C9E5128193029E, and it is the exact form the 2025 matching question tests. Thirteen vitamins times three attributes is thirty-nine facts, and the section format forbids tables in prose, so without this asset the article must narrate them as thirty-nine sentences — which is the form in which nobody can revise them or match across them.
Priority: required
Status: needed
Section: Mechanism
Kind: comparison table
Source direction: redraw from the department book's own summary table on pages 157 to 158, cited by locator
Rights: must be CC-BY or public domain

### diagram · The folate trap in B12 deficiency
Brief: Methylene-THF through reductase to methyl-THF, and methyl-THF back to THF only via cobalamin and methylcobalamin, with the homocysteine to methionine conversion on the same step and the return arrow marked as blocked when B12 is absent
Purpose: Teaches CON-FND-C9E5128193029E. The trap is a one-way arrow with only one exit, and that is a fact about the shape of the pathway. It explains in one picture why B12 deficiency looks like folate deficiency and why giving folate is dangerous — the clinical point the book warns about in a note.
Priority: required
Status: needed
Section: Key determinants
Kind: flowchart
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure on page 153 cited by locator
Rights: must be CC-BY or public domain

### diagram · Where sulfonamides and methotrexate block the folate pathway
Brief: Two panels side by side — pteridine plus PABA to folic acid in bacteria, with sulfonamide inhibiting that step and its structural similarity to PABA shown; and folic acid to THF in humans by DHF reductase, with methotrexate inhibiting that step and the THF outputs to amino acid, purine and TMP synthesis
Purpose: Teaches CON-FND-1A4A49607783A9. The selectivity of sulfonamides is entirely a matter of which step exists in which organism, and putting the two pathways side by side is the only way to show that the human panel simply has no left-hand half.
Priority: required
Status: needed
Section: Key determinants
Kind: diagram
Source direction: openly licensed biochemistry or pharmacology text, or a redraw commissioned from the department figure on page 154 cited by locator
Rights: must be CC-BY or public domain

### diagram · One-carbon metabolism and where each source and sink connects
Brief: The THF one-carbon carousel — formimino-THF, methenyl-THF, methylene-THF, methyl-THF, formyl-THF — with serine, glycine, histidine and tryptophan feeding in and pyrimidine (TMP), purine C2 and C8, and methionine coming out
Purpose: Folate's function is "transfer of one-carbon units", which is a phrase rather than an explanation until the units are seen going somewhere. This also shows why a folate deficiency hits dividing cells first, which is the link to the megaloblastic anaemia.
Priority: strongly helpful
Status: needed
Section: Mechanism
Kind: flowchart
Source direction: openly licensed biochemistry text
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter X "Vitamins", pages 130 to 158, with the summary table on pages 157 to 158 and the folate antagonists on page 154.
Section 1 question I-4 and Section 1 IV, the extended matching question, of the 2025 end-of-year paper for module 103 BMS establish that the folate antagonists and the vitamin functions are examined, and are cited as curriculum signal only. The matching key does not extract from the solved copy's text layer and was read visually from the render.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry or nutrition reference has been attached.
The book's RDA figures are given without stating whose recommendation they are, or for what age and sex, so they are not reproduced as authoritative.
No Egyptian prevalence data exists in the corpus for any vitamin deficiency, and vitamin D and B12 are the two where a local figure would change what a student should expect. None is imported.
The book names the bacterial enzyme sulfonamides inhibit only as "the enzyme needed to incorporate PABA to form folic acid", so no enzyme name is given. No dose is stated for either drug and none is written.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Written to carry Section 1 question I-4 and the whole of Section 1 IV, the extended matching question, of the 2025 end-of-year paper. The matching question is not authored by this scope, but its answers are all concepts and all needed an article, which is why the article covers thirteen vitamins rather than the ten in the stem — the two distractors are only recognisable as distractors if vitamin C and pyridoxine are taught too.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T08; the book's per-vitamin sections are carried by module_subject and the microtopic.
questionIds: No question record tests this article yet. The extended matching question is a separate scope in CLAIMS.md, "103 BMS · Biochemistry · EOY 2025 matching", and will add its ID; this file must not append to a file that scope owns.
media: No rights-cleared asset exists for any of this material. Four are requested in media_recommendations; the department book's own summary table and figures are faculty teaching material and are cited by locator, not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-ALANINE-SERINE-THREONINE

## title
Alanine, serine and threonine: three amino acids the department cancels but the book still teaches

## arabic_title
الألانين والسيرين والثريونين

## aliases
Alanine
Serine
Threonine
Hydroxyl containing aliphatic amino acids
Glucose-alanine cycle

## subject
fnd

## topic
Amino acids and proteins

## subtopic
Individual amino acid Metabolism

## microtopic
Alanine, Serine and Threonine

## nanotopic


## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T03

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
Supporting

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Dr. Omar

## final_publisher
Admin team

## summary
Three amino acids, one book heading each, and the department's own orientation cancels every one of them from both exams. They are taught here because the book teaches them and a student may still meet them, not because they are examined. Alanine's whole identity is the glucose-alanine cycle. Serine and threonine share one property, a hydroxyl group that lets a protein be switched on and off by phosphorylation, and the book pairs them under that one heading for exactly that reason.

## sections
### Definition
The book gives three amino acids in a row, and none of the three carries a metabolic disorder the way phenylketonuria follows phenylalanine or homocystinuria follows methionine. Each is a short entry: how it is made, what it is (glucogenic or not, essential or not), and one function.

Alanine is nonessential, made by transamination of pyruvate with glutamate through alanine aminotransferase (ALT), and also arises as a by-product of tryptophan catabolism. Serine and threonine are grouped by the book under one sub-heading, "Hydroxyl Containing Aliphatic Amino Acids", because both carry a hydroxyl group that does the same job in a protein. Serine is nonessential; threonine is essential, and the book states no synthetic route for it at all, consistent with that.

### Mechanism
Alanine's synthesis is one step: pyruvate plus glutamate, by ALT, gives alanine plus α-ketoglutarate. Run the reaction backward and alanine gives pyruvate straight back, which is why it is glucogenic and nothing else.

Serine has two synthetic routes, and the book gives both. The first is from glycine, by serine hydroxymethyl transferase — the same enzyme that makes glycine from serine, run in the other direction. The second starts inside glycolysis: 3-phosphoglycerate is oxidised to 3-phosphohydroxypyruvate, transaminated to phosphoserine, and dephosphorylated to serine. Serine is deaminated back to pyruvate by serine dehydratase, so it too is glucogenic only.

Threonine's page states no synthesis, because it is essential; the diet is its only source. Its catabolic fate is glucogenic, stated without the intermediate steps the branched-chain amino acids are given a few lines later.

### Key determinants
The hydroxyl group is the fact that ties serine and threonine together, and it is worth stating precisely: both let a protein be reversibly phosphorylated and dephosphorylated, which is how some enzymes are switched active or inactive. Serine's hydroxyl group is additionally the site of glycosylation on some proteins, and serine is a major constituent of phospholipids. Serine also supplies the carbon skeleton of cysteine and continues into one-carbon unit metabolism, which is where folate and vitamin B12 pick it up later in the course.

Alanine has one job outside its own synthesis: the glucose-alanine cycle carries nitrogen released by muscle protein breakdown to the liver, as alanine, where transamination releases the ammonia for the urea cycle and returns the carbon skeleton, as pyruvate, to gluconeogenesis. This is not a side note — the book's late-fasting-state figure names this cycle explicitly as the route by which fasting muscle unloads nitrogen.

### Clinical significance
None of the three carries a named disease in this book. That absence is itself the fact worth holding: a question that expects a metabolic disorder for one of these three is testing whether the student can tell the difference between an amino acid page that has one (phenylalanine, methionine, the branched-chain amino acids) and one that does not.

Where these three amino acids matter clinically in this course is indirectly — alanine through the glucose-alanine cycle in fasting and exercise, and serine and threonine through the general principle of reversible phosphorylation, which recurs across the whole of metabolic regulation (glycogen phosphorylase, hormone-sensitive lipase, pyruvate dehydrogenase) without either amino acid being named again by the book in that context.

### Common misconceptions
Assuming alanine must be at least partly ketogenic, by analogy with the branched-chain amino acids nearby in the chapter — it is not; the book states it is glucogenic only, with no exception.

Learning only one of serine's two synthetic routes. The glycine route is the one students remember; the 3-phosphoglycerate route is the one that is actually being tested when a question calls it "glycolytic" or "glycolysis-derived".

Inventing content for threonine that the book does not supply. Its entry is three lines, and a question on threonine draws from exactly those three lines: essential, glucogenic, and the hydroxyl-group regulatory role shared with serine.

## published_summary


## published_sections


## hold_these
Alanine is made from pyruvate and glutamate by ALT, and it is glucogenic only.
The glucose-alanine cycle carries muscle nitrogen to the liver as alanine.
Serine has two synthetic routes: from glycine, and from 3-phosphoglycerate of glycolysis.
Serine and threonine share one property, a hydroxyl group used for reversible phosphorylation of proteins.
Threonine is essential; the book gives it no synthetic route and no named disorder.

## lose_the_mark
Calling alanine ketogenic or partly ketogenic.
Naming only one of serine's two synthetic routes when the question asks for both.
Inventing a metabolic disorder for threonine that the book does not name.

## callout_evidence


## related_concepts
CON-FND-8723D6C2BB6B32 | CON-FND-602DDE47BF8387 | CON-FND-83628BADCA3377

## related_articles
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE: the liver side of the glucose-alanine cycle this article states from the muscle side
ART-103-BIO-METABOLIC-INTEGRATION-STAGES: the late fasting state, where the glucose-alanine cycle is shown running

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
103 BMS > Biochemistry > Individual amino acid Metabolism > Alanine
103 BMS > Biochemistry > Individual amino acid Metabolism > Serine
103 BMS > Biochemistry > Individual amino acid Metabolism > Threonine

## university_notes
kau: The Biochemistry department's orientation for 2025-2026 (src_90b75d63a73cfc7649b9, page 1) cancels "Alanine & Serine" (row 5) from both the end-of-module and the final exam, and a question record elsewhere in this module independently states that threonine is one of the same eight cancelled amino acids (row 6, dropped by an OCR run-on in the orientation scan). All three are kept here because the department book still teaches them and a student may still meet them in class; blueprint_weight and exam_weight_by_year on the three concepts are written low and do not claim they are examined.

## annotations


## media


## media_recommendations


## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter VI "Individual amino acid Metabolism", pages 92 to 93.
The Biochemistry department's orientation document for 2025-2026 establishes which items are cancelled.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book gives no metabolic disorder for any of these three amino acids, unlike most of their neighbours in the chapter; none is invented here.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Written to close three subheading gaps the coverage table found: Alanine, Serine and Threonine had book text and cancelled-exam status but no concept and no article. TPL-CONCEPT rather than TPL-CONDITION because none of the three carries a disease.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T05 for amino acids and proteins; the book's own three headings are carried in module_subject.
questionIds: No question record tests these three amino acids specifically; the mcq-aminoacid and mcq-protein-heme question files test the amino acids that do carry disorders. None is claimed here.
media: No rights-cleared asset exists for this material, and none is requested — none of the book's three entries carries a figure of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: This lane owns concept/ and article/ files only; no claim, citation or span record is authored in this batch, so claim_ids and span_ids are left [clear] rather than forward-referenced on the article, where medical:presence does not require them populated the way it requires atomic_claim_ids on the concept.

---

# Item

## id
ART-103-BIO-ASPARTATE-ARGININE-LYSINE-PROLINE

## title
Aspartate, arginine, lysine and proline: a nitrogen donor, a urea-cycle amino acid, and two that build collagen

## arabic_title
الأسبارتات والأرجينين والليسين والبرولين

## aliases
Aspartic acid
Aspartate
Arginine
Lysine
Proline
Acidic and basic aliphatic amino acids
Collagen crosslinking amino acids

## subject
fnd

## topic
Amino acids and proteins

## subtopic
Individual amino acid Metabolism

## microtopic
Aspartic Acid, Arginine, Lysine and Proline

## nanotopic


## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T06

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
Supporting

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Dr. Omar

## final_publisher
Admin team

## summary
Four amino acids, cancelled from both exams by the department's own table, but each earns its keep somewhere else in this course. Aspartate feeds three different pathways at once — asparagine, urea, and the purine and pyrimidine rings. Arginine is both the last step of the urea cycle and the source of nitric oxide. Lysine and proline are the two amino acids collagen is built from and crosslinked by, and lysine needs vitamin C to get there.

## sections
### Definition
The book pairs these four under two headings: "Acidic Amino Acids" gives glutamic acid and aspartic acid together (glutamic acid is taught elsewhere in this file), and "Basic Aliphatic Amino Acids" gives arginine and lysine together. Proline sits on its own, three lines long, straight after histidine.

Aspartate is nonessential, made from oxaloacetate by transamination with glutamate, using AST. Arginine is semi-essential, made from the carbon skeleton of ornithine. Lysine is essential; the book states no synthesis for it. Proline is nonessential, made from glutamate.

### Mechanism
Aspartate's synthesis runs in one transamination step, and its catabolic fate runs straight back to oxaloacetate, which is why it is glucogenic. Three synthetic pathways draw on it from there: asparagine synthetase converts it to asparagine, using glutamine as the amide donor, and asparagine is the site of glycosylation on many proteins; it donates one of the two nitrogen atoms of urea; and it feeds purine and pyrimidine ring synthesis, the fact this article's sibling on pyrimidine metabolism states in full.

Arginine's own synthesis, from ornithine's carbon skeleton, sits inside the urea cycle itself. Arginase is the enzyme that splits arginine into urea and ornithine, which is the cycle's last step; ornithine then becomes glutamate. Outside the cycle, arginine has two further named uses: nitric oxide synthase converts it to nitric oxide, a neurotransmitter, vasodilator and smooth-muscle relaxant, and it shares in creatine synthesis.

Lysine's catabolic fate is ketogenic, forming acetoacetyl-CoA, with no intermediate steps stated. Its two functions are structural: lysyl hydroxylase converts lysine residues of collagen and elastin to hydroxylysine, using vitamin C as cofactor, and hydroxylysine forms the crosslinks that stabilise collagen's fibril structure; and separately, acetylation of the lysine residues of histones is a mechanism of chromatin remodelling, regulating gene expression.

Proline is interconvertible with glutamate semialdehyde, which is why it is glucogenic, and the book gives it one function: it is needed in protein synthesis, particularly collagen.

### Key determinants
Two of these four converge on collagen from opposite directions. Lysine supplies the crosslinking hydroxylysine, dependent on vitamin C; proline supplies the amino acid collagen's triple helix is built from at every third position. Neither fact alone explains why scurvy weakens connective tissue; together they do — without vitamin C, lysyl and prolyl hydroxylation both fail, and collagen cannot form its stable structure even though the amino acids themselves are present in normal amounts.

Aspartate's three pathways are worth holding as a set rather than separately, because a matching question can ask which of urea, asparagine or nucleotide synthesis a stem is describing, and the answer is often "all three, from the same amino acid".

### Clinical significance
None of these four carries a metabolic disorder of its own in this book, unlike cysteine, methionine or phenylalanine. Their clinical relevance in this course is indirect: arginine and aspartate through the urea cycle, whose failure is uraemia and hyperammonaemia, taught fully elsewhere in this file; lysine through collagen disease, where its role is a supporting fact rather than the primary lesion; and proline through the same collagen chemistry.

### Common misconceptions
Treating arginine's urea-cycle role as its only function and missing the nitric oxide and creatine roles, which are separate marks in a matching question.

Forgetting that lysine's collagen role needs vitamin C specifically — a student who knows lysyl hydroxylase exists but not its cofactor cannot connect this page to the vitamin C page or to scurvy.

Assuming proline, like several amino acids nearby in the chapter, must have a named metabolic disorder. It does not; the book gives it three lines and no disease.

## published_summary


## published_sections


## hold_these
Aspartate feeds three pathways: asparagine synthesis, urea nitrogen, and purine/pyrimidine synthesis.
Arginase splits arginine into urea and ornithine — the urea cycle's last step.
Arginine is also the substrate for nitric oxide synthase and shares in creatine synthesis.
Lysine's collagen crosslinking, through lysyl hydroxylase, needs vitamin C as cofactor.
Proline and lysine are collagen's two amino acid contributions in this chapter — one structural, one crosslinking.

## lose_the_mark
Naming only one of aspartate's three synthetic destinations.
Describing arginine only as a urea-cycle intermediate and missing nitric oxide and creatine.
Forgetting vitamin C as lysyl hydroxylase's cofactor.

## callout_evidence


## related_concepts
CON-FND-F3A76A6F880190 | CON-FND-D0FFF93FC15672 | CON-FND-8507EE95B795A8 | CON-FND-5AB8B303F0D7B2

## related_articles
ART-103-BIO-UREA-CYCLE: the full cycle arginine and aspartate both belong to
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS: vitamin C's own hydroxylase cofactor role, stated in full

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
103 BMS > Biochemistry > Individual amino acid Metabolism > Aspartic Acid
103 BMS > Biochemistry > Individual amino acid Metabolism > Arginine
103 BMS > Biochemistry > Individual amino acid Metabolism > Lysine
103 BMS > Biochemistry > Individual amino acid Metabolism > Proline

## university_notes
kau: The Biochemistry department's orientation for 2025-2026 (src_90b75d63a73cfc7649b9, page 1) cancels "Aspartic acid" (row 7), "Arginine & lysine" (row 8) and "Histidine & proline" (row 9) from both the end-of-module and the final exam. All four are kept here because the department book still teaches them and a student may still meet them in class; blueprint_weight and exam_weight_by_year on the four concepts are written low and do not claim they are examined.

## annotations


## media


## media_recommendations


## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter VI "Individual amino acid Metabolism", pages 95, 96 and 105.
The Biochemistry department's orientation document for 2025-2026 establishes which items are cancelled.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book does not state which of the two urea nitrogen atoms aspartate contributes, nor the enzyme interconverting proline and glutamate semialdehyde; neither is invented here.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Written to close four subheading gaps the coverage table found: Aspartic Acid, Arginine, Lysine and Proline had book text and cancelled-exam status but no concept and no article. Grouped as one article because the book itself pairs three of the four under two shared headings and the fourth, proline, shares their collagen theme with lysine.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T05 for amino acids and proteins; the book's own four headings are carried in module_subject.
questionIds: No question record tests these four amino acids specifically. None is claimed here.
media: No rights-cleared asset exists for this material, and none is requested — none of the book's four entries carries a figure of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: This lane owns concept/ and article/ files only; no claim, citation or span record is authored in this batch, so claim_ids and span_ids are left [clear].

---

# Item

## id
ART-103-BIO-AMINO-ACID-SUMMARY-AND-ACTIVE-ACETATE

## title
The chapter's own two summaries: which amino acids are glucogenic or ketogenic, and where active acetate goes

## arabic_title
ملخصا الفصل: تصنيف الأحماض الأمينية ومسارات الأسيتات النشط

## aliases
Amino acid classification table
Glucogenic ketogenic essential amino acids
Active acetate sources and fates
Acetyl-CoA metabolic hub

## subject
fnd

## topic
Amino acids and proteins

## subtopic
Individual amino acid Metabolism

## microtopic
Summary of Amino Acid Metabolism; Summary for the Metabolic Pathways of Active Acetate

## nanotopic


## primary_node_id
DIS-BIO-T05

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T04

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
Dr. Omar

## final_publisher
Admin team

## summary
Chapter VI ends the way the vitamins chapter does, with a table, and then adds a second summary that has nothing to do with amino acids by name: where active acetate, the acetyl-CoA hub, comes from and where it goes. The first table sorts sixteen amino acids by two axes at once. The second traces the one molecule that ties carbohydrate, fat and protein metabolism into a single diagram.

## sections
### Definition
Two summaries close chapter VI, back to back, and the book gives each its own heading. The first is the amino acid classification table: every amino acid taught in the chapter, sorted as glucogenic, ketogenic or mixed, and as essential, non-essential or semi-essential. The second is titled "Summary for the Metabolic Pathways of Active Acetate", and it steps outside amino acids entirely to trace acetyl-CoA across all three foodstuffs.

### Mechanism
The classification table has two purely ketogenic amino acids: leucine and lysine. It has three mixed amino acids, glucogenic and ketogenic at once: isoleucine, phenylalanine and tyrosine. Every other amino acid the chapter teaches — glycine, alanine, serine, threonine, valine, glutamic acid, aspartic acid, arginine, cysteine, methionine, tryptophan, histidine and proline — is glucogenic only. On essentiality, threonine, valine, leucine, isoleucine, lysine, methionine, phenylalanine, tryptophan and histidine are essential; arginine is semi-essential; the rest are non-essential.

Active acetate's sources are four. Carbohydrates supply it through glycolysis to pyruvate, then pyruvate dehydrogenase. Triacylglycerol supplies it two ways: glycerol, through triose phosphate and glycolysis, and fatty acids, through beta-oxidation. Amino acids supply it directly if ketogenic, or indirectly through pyruvate if glucogenic. Ketone bodies supply it through ketolysis in extrahepatic tissue.

Its fates are five. The citric acid cycle oxidises it for energy. Lipogenesis uses it to build fatty acids. Cholesterol synthesis uses it, through HMG-CoA. Ketogenesis uses it, in liver mitochondria, when fatty acid oxidation is excessive. And a set of acetylation reactions uses it directly: acetylcholine synthesis, N-acetylserotonin formation on the way to melatonin, N-acetylglutamate synthesis, and N-acetylamino sugar synthesis.

### Key determinants
The classification table's real trap is not the mixed group, which students expect, but the size of the "glucogenic only" group, which is larger than most students predict — thirteen of sixteen amino acids. Only two, leucine and lysine, are purely ketogenic, and holding that pair is more useful than trying to memorise the glucogenic list, which is everything else.

The active acetate summary is the fact that makes the rest of the chapters in this book cohere. A question that seems to be about lipogenesis, or about the citric acid cycle, or about ketogenesis, is often testing whether a student sees that all three start from the same molecule, arriving by different routes.

### Clinical significance
The classification table has clinical weight through the amino acids it flags: a deficiency of branched-chain α-keto acid dehydrogenase, maple syrup urine disease, affects one purely essential, mixed-classification group (valine, leucine, isoleucine) at once, which is why the table groups them together rather than teaching each alone.

The active acetate summary explains, in one diagram, why a ketogenic diet raises ketone bodies (fat oxidation floods the pathway with acetyl-CoA faster than the citric acid cycle or lipogenesis can use it, so ketogenesis absorbs the excess) and why uncontrolled diabetes does the same by a different route (glucose cannot enter cells, so fat is oxidised instead).

### Common misconceptions
Assuming an amino acid's classification can be read off its structure. It cannot reliably; the table is what the book examines, and leucine and lysine's status as the only two purely ketogenic amino acids is a fact to memorise, not derive.

Treating the active acetate summary as a repeat of the citric acid cycle page. The cycle is one of five fates listed here, not the whole of the topic; a question on this page is usually testing one of the other four.

## published_summary


## published_sections


## hold_these
Leucine and lysine are the only two purely ketogenic amino acids in the chapter.
Isoleucine, phenylalanine and tyrosine are mixed, glucogenic and ketogenic.
Every other amino acid taught in the chapter is glucogenic only.
Active acetate has four sources — carbohydrate, triacylglycerol, amino acids, ketone bodies — and five fates — TCA cycle, lipogenesis, cholesterol synthesis, ketogenesis, acetylation.

## lose_the_mark
Guessing an amino acid's classification instead of citing the table.
Forgetting that active acetate's fates include acetylation reactions, not only the three big pathways.

## callout_evidence


## related_concepts
CON-FND-F91310521FC982 | CON-FND-0C22ADD8295933

## related_articles
ART-103-BIO-TCA-KEY-ENZYMES: the fate this summary names first, taught in full
ART-103-BIO-KETONE-BODY-METABOLISM: the fate that absorbs excess active acetate in fasting and in diabetes

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
103 BMS > Biochemistry > Individual amino acid Metabolism > Summary of Amino Acid Metabolism
103 BMS > Biochemistry > Individual amino acid Metabolism > Summary for the Metabolic Pathways of Active Acetate

## university_notes
kau: Neither summary appears in the Biochemistry department's cancelled-items table; both are taken as examinable.

## annotations


## media


## media_recommendations


## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter VI "Individual amino acid Metabolism", pages 106 to 108.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The classification table's metabolic-error column is not reproduced in full here, since each disorder it names already has its own concept and article elsewhere in this file.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Written to close two subheading gaps the coverage table found: the chapter's own two closing summaries had book text but no concept and no article. Paired in one article because the book prints them on consecutive pages as the chapter's own two-part close.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T05 for amino acids and proteins; the book's own two headings are carried in module_subject.
questionIds: No question record tests these two summaries specifically. None is claimed here.
media: No rights-cleared asset exists for either table; both would benefit from a redrawn figure, but none is requested here to keep this batch within its concept-and-article scope.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: This lane owns concept/ and article/ files only; no claim, citation or span record is authored in this batch, so claim_ids and span_ids are left [clear].

---

# Item

## id
ART-103-BIO-METABOLIC-INTEGRATION-STAGES

## title
The feed-starve cycle, stage by stage: well-fed, early fasting, late fasting and starvation

## arabic_title
دورة التغذية والصيام: مراحلها الأربع

## aliases
Well-fed state
Early fasting state
Late fasting state
Starvation state
Metabolic integration stages
Feed-starve cycle tissue panels

## subject
fnd

## topic
Metabolic integration

## subtopic
Metabolic Integrations

## microtopic
Metabolism in the Well-Fed State; Early, Late Fasting and Starvation States

## nanotopic


## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-END-T06 | DIS-BIO-T04

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
12

## high_yield
Supporting

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Dr. Omar

## final_publisher
Admin team

## summary
The department cancels this whole chapter from both exams, and the book still gives it six pages and four figures, one tissue-by-tissue panel per stage. The four stages are not four separate topics; they are one continuous story, told through the same five organs — brain, muscle, liver, pancreas, adipose tissue — as the insulin-to-glucagon ratio falls and the fuel supply shifts from dietary glucose, to hepatic glycogen, to adipose fat, to the body's own protein.

## sections
### Definition
The feed-starve cycle answers one question across four stages: where does the next unit of ATP come from, now that the last meal is further and further away? The book gives four named stages with named hour ranges: well-fed, 0 to 4 hours; early fasting, 4 to 18 hours; late fasting, 18 to 48 hours; starvation, beyond 48 hours. Each stage gets its own figure, five panels — brain, muscle, liver, pancreas, adipose tissue — and its own one-line summary of the dominant fuel and hormone.

### Mechanism
In the well-fed state, insulin rises and glucagon falls as blood glucose increases from the meal. Muscle and adipose tissue increase glucose uptake through GLUT-4 and increase glycolysis; muscle also builds glycogen and takes up amino acids for protein synthesis, and adipose tissue builds fat. The liver increases glucose uptake, glycolysis, glycogenesis, lipogenesis and cholesterol synthesis. Glucose is the fuel, insulin the hormone.

Early fasting, 4 to 18 hours out, reverses the ratio: insulin falls, glucagon rises. The brain is unaffected and keeps using glucose by glycolysis. Muscle switches off glucose uptake and glycogenesis, and turns on beta-oxidation. The liver switches off glucose uptake, glycolysis, glycogenesis and lipogenesis, and turns on glycogenolysis, gluconeogenesis and beta-oxidation. Adipose tissue turns off lipogenesis and turns on lipolysis. One exception matters here: muscle glycogenolysis cannot supply plasma glucose directly, because muscle lacks glucose-6-phosphatase; it fuels muscle itself, mainly during exercise, not fasting. Glucose from hepatic glycogenolysis is the fuel, glucagon the hormone.

Late fasting, 18 to 48 hours, is where the switch from glucose-burning to fat-burning completes. Glycogen stores are significantly depleted, so gluconeogenesis takes over blood glucose maintenance, and lipolysis, beta-oxidation, ketogenesis and ketolysis all rise. Muscle increases beta-oxidation and starts breaking down its own protein, transaminating the resulting pyruvate to alanine for the liver, through the glucose-alanine cycle. The liver increases gluconeogenesis, beta-oxidation and ketogenesis. Fatty acids from adipose lipolysis are the fuel, and anti-insulin hormones — glucagon, catecholamines, cortisol, growth hormone — now predominate together.

Starvation, beyond 48 hours, has two priorities in order: first, enough glucose for the brain; second, sparing protein, by substituting fatty acids and ketone bodies. The kidney joins the liver as a gluconeogenic organ, contributing up to half of blood glucose, which itself does not fall below 70 mg/dL. After two to five days, the liver makes large amounts of ketone bodies, gluconeogenesis from protein decreases, and the brain begins drawing roughly a third of its energy from ketone bodies. After several weeks, ketone bodies become the brain's major fuel, and survival time is set by the size of the triacylglycerol depot; once fat is exhausted, protein is the only fuel left, its breakdown accelerates, and death follows organ failure.

### Key determinants
Two threads run through all four panels and are worth tracking across the whole cycle rather than stage by stage. The insulin/glucagon ratio falls monotonically from well-fed to starvation, and every other change in the four figures follows from that one number. And the brain's fuel source is the story's real arc: glucose throughout the first three stages, unconditionally, then increasingly ketone bodies from the second half of starvation onward — the single change that finally allows the body to slow, though never stop, its own protein breakdown.

### Clinical significance
This chapter is where fasting hypoglycaemia, diabetic ketoacidosis and starvation ketosis all become the same biochemistry seen at different settings of one dial. A diabetic in ketoacidosis is, metabolically, stuck in a late-fasting or starvation pattern despite having just eaten, because insulin cannot signal the well-fed state to the tissues; the panels in this article are the reference to check a case against.

Post-surgical and critically ill patients move through these same stages faster and under added catabolic stress from cortisol and catecholamines, which is why the muscle-protein-breakdown step of late fasting is not a curiosity but the mechanism behind ICU muscle wasting.

### Common misconceptions
Treating the four stages as four unrelated topics to memorise separately rather than one falling insulin/glucagon ratio with four snapshots taken along the way.

Assuming muscle glycogen helps maintain blood glucose. It cannot — the book states this exception explicitly for exactly this reason.

Placing ketosis proper in late fasting rather than starvation. Beta-oxidation and ketogenesis begin rising in late fasting, but the book's own "state of ketosis" language is attached to starvation, after two to five days, not to the 18-to-48-hour stage.

## published_summary


## published_sections


## hold_these
Well-fed (0-4h): insulin up, glucose the fuel, storage everywhere.
Early fasting (4-18h): glucagon up, hepatic glycogenolysis the fuel; muscle glycogen cannot supply plasma glucose.
Late fasting (18-48h): glycogen depleted, gluconeogenesis takes over, glucose-alanine cycle carries muscle nitrogen to the liver.
Starvation (48h+): kidney joins the liver making glucose; ketone bodies gradually become the brain's main fuel, sparing protein.

## lose_the_mark
Mixing up which stage muscle glycogenolysis can and cannot supply plasma glucose in.
Placing full ketosis in late fasting instead of starvation.
Forgetting the kidney's gluconeogenic role, which is unique to starvation.

## callout_evidence


## related_concepts
CON-FND-61DA35C82C732F | CON-FND-EFF5FB178CDDFA | CON-FND-7F3A2AEFD5FF87 | CON-FND-0741CE71FB0569

## related_articles
ART-103-BIO-FEED-STARVE-CYCLE: the chapter-level overview and the glucose-alanine cycle from the liver's side
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE: the pathway that carries every stage past early fasting
ART-103-BIO-KETONE-BODY-METABOLISM: the fate that dominates by starvation

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
103 BMS > Biochemistry > Metabolic Integrations > Metabolism in the Well-Fed State
103 BMS > Biochemistry > Metabolic Integrations > Metabolism in Early Fasting State
103 BMS > Biochemistry > Metabolic Integrations > Metabolism in Late Fasting State
103 BMS > Biochemistry > Metabolic Integrations > Metabolism in Starvation State

## university_notes
kau: The Biochemistry department's orientation for 2025-2026 (src_90b75d63a73cfc7649b9, page 1) cancels "Metabolic integration" (row 10), citing the department book's own pages 109-114 — exactly this chapter — from both the end-of-module and the final exam. Six question records elsewhere in this module test these four stages regardless (fasting hypoglycaemia, starvation fuel sources, the glucose-alanine cycle), which is why this article and its four concepts are authored despite the cancellation: a cancelled topic still appears in the question book and a student may still meet it. blueprint_weight and exam_weight_by_year on the four concepts are written low and do not claim they are examined.

## annotations


## media


## media_recommendations
### diagram · The feed-starve cycle's four stages on one clock face
Brief: The book's own circular figure redrawn: Well-Fed State at 0 hours, Early Fasting at 4-18 hours, Late Fasting at 18-48 hours, and Starvation from 48 hours onward, arranged clockwise around a clock face with Food Consumption marked at the top
Purpose: Teaches all four concepts in this article at once. The book's own figure is this exact clock layout; a linear list of four stages loses the cyclical framing that makes clear the cycle restarts at the next meal.
Priority: strongly helpful
Status: needed
Section: Definition
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter VII "Metabolic Integrations", pages 110 to 114.
The Biochemistry department's orientation document for 2025-2026 establishes that this chapter is cancelled from both exams, cited as curriculum signal only.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book gives 'about a third' for the brain's early ketone-body energy share in starvation and no figure at all for the later, major-fuel stage; only the figure the book states is repeated here.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Written to close four subheading gaps the coverage table found: all four named stages of the feed-starve cycle had book text and six waiting questions but no concept or article carrying their own tissue-by-tissue detail — only the chapter-level overview existed. TPL-CONCEPT rather than TPL-CONDITION because the subject is physiological adaptation, not disease.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T03 for carbohydrate/metabolic integration; the book's own four stage headings are carried in module_subject.
questionIds: Six question records in this module (103-BMS-MCQ-lipid-diabetes.md) test these four stages already, by main_concept id or by topic; this lane does not own the question file and does not edit it, so no question_ids are claimed here — that cross-link is for the question lane to complete by pointing at these four new concept ids and this article.
media: No rights-cleared asset exists for the clock-face figure requested above; the department book's own figure is faculty teaching material and is cited by locator, not reproduced.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: This lane owns concept/ and article/ files only; no claim, citation or span record is authored in this batch, so claim_ids and span_ids are left [clear].

---

# Item

## id
ART-103-BIO-PYRIMIDINE-METABOLISM

## title
Pyrimidine nucleotide metabolism: two donors build the ring, and its catabolism never causes gout

## arabic_title
استقلاب البيريميدين

## aliases
Pyrimidine ring synthesis
Pyrimidine catabolism
Beta-alanine beta-aminoisobutyrate
Why pyrimidine catabolism does not cause gout

## subject
fnd

## topic
Molecular biology

## subtopic
Metabolism of purines and pyrimidines

## microtopic
Pyrimidine Metabolism

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
Years 1–3 foundation

## reading_time
6

## high_yield
Supporting

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Dr. Omar

## final_publisher
Admin team

## summary
After several pages on purine synthesis, salvage and disorders, the book gives pyrimidine metabolism one diagram and one paragraph. That imbalance is deliberate, not an omission: the whole clinical weight of this section of the chapter is on the purine side, where catabolism ends in poorly soluble uric acid and gout. Pyrimidine catabolism ends somewhere entirely different, in small, freely soluble pieces, and that single contrast is the fact this short page exists to teach.

## sections
### Definition
The book's pyrimidine section is compressed into a labelled diagram of the ring's atom sources and one sentence on catabolism, set against several pages on purines a few pages earlier in the same chapter.

### Mechanism
The pyrimidine ring's six atoms come from only two sources: the amide group of glutamine contributes nitrogen and carbon at three ring positions, and aspartate contributes the rest, with one carbon supplied by CO2. This is simpler than the purine ring, which the book gives five different atomic sources across four donor molecules a few pages earlier — glycine, glutamine, aspartate, CO2 and a formyl group from the folate pool.

Catabolism of the pyrimidine ring ends in products that are all small and freely water-soluble: carbon dioxide, ammonia, and either beta-alanine, from uracil and cytosine, or beta-aminoisobutyrate, from thymine. All are easily excreted.

### Key determinants
The determinant that matters here is solubility, and it is the reason this section exists at all next to the purine disorders section. Purine catabolism ends in uric acid, which is poorly soluble and crystallises in joints and the urinary tract, causing gout and renal stones — the subject of several pages and a named clinical syndrome elsewhere in this chapter. Pyrimidine catabolism ends in beta-alanine or beta-aminoisobutyrate, both of which are ordinary, freely soluble metabolites with no crystallisation problem and no named disease attached to their excess.

### Clinical significance
The book names no disorder of pyrimidine metabolism at all, in contrast to the purine section's gout, Lesch-Nyhan syndrome and severe combined immunodeficiency. That silence is itself the teaching point for this course: a question that asks which of the two nucleotide classes is linked to a crystal arthropathy has only one correct answer, and it is not pyrimidines.

### Common misconceptions
Expecting a pyrimidine equivalent of gout. There is not one in this book, and inventing one is the single most likely error on this page — the solubility of the catabolic end products is exactly why no such disease exists to name.

Confusing the two rings' atom-source counts. Five sources for purines, two for pyrimidines, is a fact worth holding as a pair, because a matching question is likely to test exactly this asymmetry.

## published_summary


## published_sections


## hold_these
The pyrimidine ring's atoms come from only two sources: glutamine's amide group and aspartate.
Pyrimidine catabolism ends in CO2, NH3, and beta-alanine (uracil, cytosine) or beta-aminoisobutyrate (thymine).
Those end products are freely water-soluble, which is why pyrimidine catabolism does not cause a gout-like disease.

## lose_the_mark
Naming a pyrimidine equivalent of gout that the book does not give.
Mixing up the atom-source counts for the two rings.

## callout_evidence


## related_concepts
CON-FND-D2044E7265FB03

## related_articles
ART-103-BIO-PURINE-SYNTHESIS-AND-SALVAGE: the purine ring's five sources, for the contrast this article draws
ART-103-BIO-URIC-ACID-AND-PURINE-DISORDERS: the gout the pyrimidine side of the chapter does not have an equivalent of

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
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Pyrimidine Metabolism

## university_notes
kau: Pyrimidine metabolism does not appear in the Biochemistry department's cancelled-items table; it is taken as examinable, unlike several of its neighbouring subheadings in this chapter and the next.

## annotations


## media


## media_recommendations


## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS, chapter IX "Metabolism of purines and pyrimidines", page 129.

## evidence_gaps
Every statement rests on one source, the department book, and the book itself gives very little on pyrimidine synthesis specifically — one diagram and one sentence on catabolism — compared with several pages on purines; that asymmetry is the book's own, not an omission in this article.
No independent verification against an international biochemistry reference has been attached.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Written to close one subheading gap the coverage table found: Pyrimidine Metabolism had book text but no concept or article, despite Biosynthesis, Catabolism and Disorders of Purine Nucleotides all being covered elsewhere in this module's batches. A live, general-purpose article on purine and pyrimidine metabolism exists in the platform (ART-REN-TOP-AD3B2EA126) but is not cited to this department book and carries no 103 BMS module_subject, so it is not a duplicate of this book-specific record.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T06 for molecular biology; the book's own heading is carried in module_subject.
questionIds: No question record tests pyrimidine metabolism specifically in this module's batches. None is claimed here.
media: No rights-cleared asset exists for the ring-atom-sources diagram; the book's own figure is faculty teaching material and is cited by locator, not reproduced. None is requested given how little the book itself provides to illustrate.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
claimIds: This lane owns concept/ and article/ files only; no claim, citation or span record is authored in this batch, so claim_ids and span_ids are left [clear].

