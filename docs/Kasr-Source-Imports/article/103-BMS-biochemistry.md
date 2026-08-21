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
CON-FND-B928DE79E08882 | CON-HEM-A1EF4D20C85878 | CON-HEM-4F64967BBFBB6F

## related_articles
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE: the peroxide-disposal route whose NADPH this pathway supplies
ART-103-BIO-JAUNDICE-AND-BILIRUBIN: where the haemolysis of favism ends up, as unconjugated hyperbilirubinaemia
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT: the other half of red cell carbohydrate metabolism, and the half that does make ATP

## question_ids

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

## university_notes
kau: The Uronic Acid Pathway, which is the chapter section immediately after this one on page 38, is cancelled from both the end-of-module and the final exam by the Biochemistry department's own orientation. The HMP pathway itself is not cancelled and was examined in 2025 as parts (a) to (d) of Diagram (1).

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
