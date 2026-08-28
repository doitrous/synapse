<!--
  AU-MED-102 · Biochemistry · sub-lane C. Four articles teaching the 13 NEW concepts minted
  in concept/AU-MED-102-biochem-nitrogen-blood-concepts.md. Every concept's article_ids
  names exactly one of these four, and every article's related_concepts lists every concept
  it teaches back — both directions checked before hand-over.

  Import: Admin › Bulk import (article). Order: article → concept (same batch hand-over as
  the concept file).
-->

# Item

## id
ART-HEM-AU102-HEME-BIOSYNTHESIS

## title
Haem biosynthesis: the pathway and its rate-limiting step

## arabic_title
تخليق الهيم الحيوي: المسار والخطوة المحددة لسرعته

## aliases
Heme biosynthesis pathway
ALA synthase and heme precursors

## subject
haem

## topic
Clinical biochemistry

## subtopic
Biosynthesis of Heme

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-HEM-T01-S01 | SYS-HEM-T02

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1-3 foundation

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
Medical team, Admin team

## final_publisher
Admin team

## summary
Haem is built from glycine and succinyl-CoA through a mitochondrial-and-cytosolic pathway whose committed, rate-limiting step is ALA synthase. Recognising the pathway's true intermediates — and telling them apart from urobilinogen, which belongs to haem's breakdown rather than its making — is what an Alexandria Biochemistry exam question on this chapter actually tests.

## sections
### Definition
Haem biosynthesis is the eight-step pathway, split between the mitochondrion and the cytosol, that builds the iron-porphyrin cofactor haem from glycine and succinyl-CoA. The first and rate-limiting step is catalysed by delta-aminolevulinate (ALA) synthase.

### Mechanism
ALA synthase condenses glycine with succinyl-CoA to form delta-aminolevulinic acid (ALA), releasing CO2 and free coenzyme A. The reaction absolutely requires pyridoxal phosphate (the active form of vitamin B6) as coenzyme, proceeding through a PLP-glycine Schiff base exactly as in other amino-acid-handling PLP enzymes. Two molecules of ALA then condense to form porphobilinogen, which is built up through several further intermediates — uroporphyrinogen, then protoporphyrinogen — before ferrochelatase inserts ferrous iron to complete the molecule.
Urobilinogen is not one of these intermediates. It sounds like a member of the same "-ogen" family by name alone, but it belongs to the opposite process: it is formed in the gut from bilirubin after haem has already been made, used, and broken down.

### Key determinants
ALA synthase's activity is the pathway's control point — the whole synthesis rate rises and falls with it, which is exactly why questions on this chapter focus on naming its substrates and coenzyme rather than any later step.

### Clinical significance
A pathway this tightly controlled at one enzyme is also where a toxin or a genetic defect does the most damage: lead poisoning, for instance, inhibits two different enzymes further down this same pathway (ALA dehydratase and ferrochelatase), which is why it produces a microcytic anaemia that iron supplementation cannot correct.

## published_summary

## published_sections

## hold_these
ALA synthase condenses glycine (not alanine, cysteine or serine) with succinyl-CoA, and needs pyridoxal phosphate (not TPP, ATP or PABA) to do it.
Porphobilinogen, uroporphyrinogen and protoporphyrinogen are the true pathway intermediates; urobilinogen is a breakdown product, not one of them, despite the shared "-ogen" ending.

## lose_the_mark
Naming thiamine pyrophosphate (TPP) as ALA synthase's coenzyme because TPP is the reflexive answer for other condensation/decarboxylation reactions in metabolism — this one specifically needs pyridoxal phosphate.
Grouping urobilinogen with the biosynthetic "-ogen" intermediates by name pattern rather than by which direction of haem's life cycle it actually belongs to.

## callout_evidence
### ALA synthase condenses glycine (not alanine, cysteine or serine) with succinyl-CoA, and needs pyridoxal phosphate (not TPP, ATP or PABA) to do it.
Claims: CLM-AU102-HEM-ALA-SYNTHASE-01
Citations: CIT-AU102-HEM-ALA-SYNTHASE-01
Reviewed by: Claude
Reviewed at: 2026-08-22

## related_concepts
CON-HEM-6BA5D04F841FBA
CON-HEM-E37BFF798CC937

## related_articles
ART-HEM-AU102-HEMOGLOBIN-TYPES: the haem this pathway builds is the cofactor that gives every haemoglobin variant its oxygen-carrying chemistry.

## resource_ids
src_01ab4268402d32d4d111

## universities
au

## years
AU_Y1

## article_source_ids
src_01ab4268402d32d4d111

## question_ids

## module

## module_subject
AU-MED-102 > Biochemistry > Heme Metabolism > Biosynthesis of Heme

## annotations
### definition_of · CON-HEM-6BA5D04F841FBA
Quote: The first and rate-limiting step is catalysed by delta-aminolevulinate (ALA) synthase.
Block: body

### definition_of · CON-HEM-E37BFF798CC937
Quote: Urobilinogen is not one of these intermediates.
Block: body

## media

## media_recommendations
### diagram · Haem biosynthesis pathway from glycine and succinyl-CoA to haem
Purpose: A student cannot hold eight sequential intermediates and which two enzymes are targeted by lead from prose alone, and every exam question on this chapter depends on placing ALA synthase, ALA dehydratase and ferrochelatase correctly on the sequence.
Priority: strongly helpful
Status: needed
Section: Mechanism
Source direction: openly licensed biochemistry pathway diagram
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Alexandria University Faculty of Medicine Biochemistry Department's own AFM question bank (src_01ab4268402d32d4d111), Blood section, questions 1, 2, 15 and 16, read directly from the extracted page text.

## claim_ids
CLM-AU102-HEM-ALA-SYNTHASE-01 | CLM-AU102-HEM-PRECURSORS-01

## span_ids
SPN-HEM-AU102-ALA-SYNTHASE-01 | SPN-HEM-AU102-PRECURSORS-01

## evidence_gaps
[clear]

## conflicts

## last_reviewed

## review_due

## notes
Written to teach the two heme-biosynthesis concepts this lane minted (CON-HEM-6BA5D04F841FBA, CON-HEM-E37BFF798CC937). Kasr's pending 103-BMS article ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA covers the same pathway's lead-inhibition and porphyria-pattern facts from a different, already-authored angle; this lane did not edit that file (out of scope) and instead wrote this article specifically for the rate-limiting-step and precursor-identification facts the Alexandria bank tests that the Kasr article does not already own.

## field_notes
arabicTitle: Researched and written; no further verification step is available to this lane.
aliases: Filled above.
moduleIds: No verified AU-MED-102 subject-tree module ID exists yet (the academic lane has not authored one for this module); module_subject is written as free text per the manual, and will resolve once that tree exists.
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
media: No rights-cleared asset exists yet; one is requested in media_recommendations.
questionIds: The questions that test these two concepts are in question/AU-MED-102-biochem-nitrogen-blood-mcq.md, authored in the same hand-over; this field is left for the import step to populate.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-HEM-AU102-HEMOGLOBIN-TYPES

## title
Haemoglobin types: HbA, HbF and HbA2

## arabic_title
أنواع الهيموغلوبين: HbA وHbF وHbA2

## aliases
Fetal versus adult haemoglobin
Haemoglobin variants

## subject
haem

## topic
Clinical biochemistry

## subtopic
Haemoglobin structure and function

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
Years 1-3 foundation

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
Medical team, Admin team

## final_publisher
Admin team

## summary
Adult and fetal haemoglobin are told apart by which second globin chain pairs with the two constant alpha chains — beta for HbA, gamma for HbF, delta for the minor adult form HbA2 — and that single difference in HbF's gamma chain is also the reason HbF holds oxygen more tightly than HbA.

## sections
### Definition
The three human haemoglobins compared in this chapter share two alpha chains and differ in their second pair: HbA (α2β2) is the major adult form, HbF (α2γ2) is the form that predominates before birth, and HbA2 (α2δ2) is a minor adult form.

### Mechanism
HbF's gamma chain lacks the specific residues the beta chain offers for binding 2,3-bisphosphoglycerate (2,3-BPG), the red-cell metabolite that normally lowers haemoglobin's oxygen affinity by stabilising its low-affinity conformation. Because HbF cannot bind 2,3-BPG as effectively as HbA, it is not pulled toward that low-affinity state, and so it holds oxygen more tightly at the same partial pressure — the mechanism that lets the fetal circulation draw oxygen across the placenta from the maternal side.

### Key determinants
The chain-pairing is the whole determinant here: memorising "beta for HbA, gamma for HbF, delta for HbA2" is what lets a student answer a composition question correctly, and the 2,3-BPG-binding difference is what lets them explain the affinity difference rather than simply asserting it.

### Clinical significance
HbF's persistence, or its reactivation, is clinically significant in conditions such as sickle-cell disease, where a higher HbF fraction dilutes the sickling HbS and is protective — a fact that follows directly from HbF being a genuinely different molecule, not simply "young HbA".

## published_summary

## published_sections

## hold_these
HbA is α2β2, HbF is α2γ2, HbA2 is α2δ2 — the second chain is the only thing that changes between them.
HbF's higher oxygen affinity is a downstream consequence of poor 2,3-BPG binding, not an intrinsic property of the gamma chain's own oxygen chemistry.

## lose_the_mark
Swapping gamma and delta when asked which chain pairs with alpha in HbF versus HbA2 — both are "the other, minor haemoglobin" in a student's mental list, which is exactly why they get confused.
Explaining HbF's higher oxygen affinity as "because it is fetal" without naming the 2,3-BPG mechanism that actually produces it.

## callout_evidence
### HbA is α2β2, HbF is α2γ2, HbA2 is α2δ2 — the second chain is the only thing that changes between them.
Claims: CLM-AU102-HEM-HBF-HBA-01
Citations: CIT-AU102-HEM-HBF-HBA-01
Reviewed by: Claude
Reviewed at: 2026-08-22

## related_concepts
CON-HEM-25332F0339A5B2
CON-HEM-799C0064D0EB21

## related_articles
ART-HEM-AU102-HEME-BIOSYNTHESIS: the biosynthetic pathway that builds the haem every one of these haemoglobin variants carries.

## resource_ids
src_01ab4268402d32d4d111

## universities
au

## years
AU_Y1

## article_source_ids
src_01ab4268402d32d4d111

## question_ids

## module

## module_subject
AU-MED-102 > Biochemistry > Haemoglobin > Haemoglobin Variants

## annotations
### definition_of · CON-HEM-25332F0339A5B2
Quote: HbF's gamma chain lacks the specific residues the beta chain offers for binding 2,3-bisphosphoglycerate (2,3-BPG), the red-cell metabolite that normally lowers haemoglobin's oxygen affinity by stabilising its low-affinity conformation.
Block: body

### definition_of · CON-HEM-799C0064D0EB21
Quote: HbA2 (α2δ2) is a minor adult form.
Block: body

## media

## media_recommendations
### comparison table · HbA, HbF and HbA2 chain composition and relative abundance
Purpose: A student cannot hold the three chain-pairings and their abundances (HbA ~97%, HbA2 ~2.5%, HbF <1% in adults) from prose alone, and confusing gamma with delta is the single most common error on this chapter.
Priority: strongly helpful
Status: needed
Section: Definition
Source direction: openly licensed haematology reference table
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Alexandria University Faculty of Medicine Biochemistry Department's own AFM question bank (src_01ab4268402d32d4d111), Blood section, questions 3, 13 and 14, read directly from the extracted page text.

## claim_ids
CLM-AU102-HEM-HBF-HBA-01 | CLM-AU102-HEM-HBA2-01

## span_ids
SPN-HEM-AU102-HBF-HBA-01 | SPN-HEM-AU102-HBA2-01

## evidence_gaps
[clear]

## conflicts

## last_reviewed

## review_due

## notes
Written to teach CON-HEM-25332F0339A5B2 and CON-HEM-799C0064D0EB21. Cross-references the live obstetric concept CON-OBS-A94183DB543092 (fetal haemoglobin's placental-physiology angle) without editing it, since that record sits outside this lane's scope.

## field_notes
arabicTitle: Researched and written; no further verification step is available to this lane.
moduleIds: No verified AU-MED-102 subject-tree module ID exists yet.
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
media: No rights-cleared asset exists yet; one is requested in media_recommendations.
questionIds: Left for the import step; the testing questions are in this hand-over's question file.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## title
Blood-relevant vitamins and iron: vitamin K, vitamin B12 and dietary iron

## arabic_title
الفيتامينات والحديد المرتبطة بالدم: فيتامين ك وفيتامين ب12 والحديد الغذائي

## aliases
Vitamin K and coagulation
B12 and methylmalonic acid
Dietary iron sources

## subject
haem

## topic
Nutrition

## subtopic
Blood-relevant vitamins and iron

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T08

## secondary_node_ids
SYS-HEM-T02 | SYS-HEM-T03

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1-3 foundation

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
Three nutrients converge on blood biochemistry through three separate mechanisms: vitamin K carboxylates clotting factors so they can bind calcium, vitamin B12 (cobalamin, named for its cobalt centre) supports the enzyme that clears methylmalonic acid, and dietary iron is simply scarcer in some common foods — milk among them — than in others.

## sections
### Definition
Vitamin K, vitamin B12 and dietary iron each matter to blood biochemistry for a distinct reason: vitamin K is required for hemostasis, vitamin B12 for both haemoglobin synthesis and a specific detoxification step, and iron for haemoglobin itself.

### Mechanism
Vitamin K is the cofactor for gamma-carboxylation of specific glutamate residues on clotting factors II, VII, IX and X, converting them to Gla residues that can chelate calcium and anchor the factors to phospholipid surfaces during coagulation. Without this carboxylation the factors exist but cannot function, so deficiency — from malabsorption or from a vitamin K antagonist — presents as prolonged coagulation time, not accelerated clotting.
Vitamin B12, as adenosylcobalamin, is the coenzyme for methylmalonyl-CoA mutase, converting methylmalonyl-CoA to succinyl-CoA on the pathway that clears propionyl-CoA generated from odd-chain fatty-acid oxidation and several amino acids. B12 deficiency blocks this step, so methylmalonic acid accumulates and is excreted in urine — the specific biochemical marker that distinguishes B12 deficiency from folate deficiency, since both impair DNA synthesis and cause the same macrocytic anaemia but only B12 deficiency raises methylmalonic acid. B12 itself is named cobalamin for the cobalt ion at the centre of its corrin ring.
Dietary iron is unevenly distributed across common foods: cereals (rice, wheat) and pulses supply meaningfully more than milk, which is a notably poor source — part of why prolonged, exclusive milk feeding without iron-fortified weaning foods is a recognised route to iron-deficiency anaemia in infants.

### Key determinants
For vitamin K, the determinant is which clotting factors carry the carboxylation-dependent glutamate residues (II, VII, IX, X). For B12, it is the single enzyme step (methylmalonyl-CoA mutase) whose product accumulates and becomes the diagnostic marker. For iron, it is simply which foods supply it and which do not.

### Clinical significance
A prolonged coagulation time with normal platelets points toward a vitamin K problem; a macrocytic anaemia with raised urinary methylmalonic acid points specifically toward B12 rather than folate deficiency; and an iron-deficiency picture in a milk-fed infant points toward diet rather than occult blood loss as the first thing to check.

## published_summary

## published_sections

## hold_these
Vitamin K's job is gamma-carboxylation of clotting-factor glutamate residues, not activation of the coagulation cascade itself and not an antioxidant action.
Methylmalonic acid excretion, not homocysteine or FIGLU, is the marker that specifically implicates B12 (not folate) deficiency.
Milk is a poor source of dietary iron; cereals and pulses are better sources.

## lose_the_mark
Naming "conversion of prothrombin to thrombin" as vitamin K's biochemical function — that is a separate, unrelated proteolytic step in the cascade, not what vitamin K itself does.
Answering "biotin" for a propionate-accumulation question that is actually testing the later, B12-dependent step (methylmalonyl-CoA mutase) rather than the earlier, biotin-dependent carboxylase step.
Assuming milk is nutritionally complete because it is the default infant food, rather than recognising it as specifically iron-poor.

## callout_evidence
### Vitamin K's job is gamma-carboxylation of clotting-factor glutamate residues, not activation of the coagulation cascade itself and not an antioxidant action.
Claims: CLM-AU102-HEM-VITK-01
Citations: CIT-AU102-HEM-VITK-01
Reviewed by: Claude
Reviewed at: 2026-08-22

### Methylmalonic acid excretion, not homocysteine or FIGLU, is the marker that specifically implicates B12 (not folate) deficiency.
Claims: CLM-AU102-HEM-B12-MMA-01
Citations: CIT-AU102-HEM-B12-MMA-01
Reviewed by: Claude
Reviewed at: 2026-08-22

## related_concepts
CON-HEM-A8349B0F9F93BF
CON-HEM-6BB1F814D007D1
CON-HEM-351861BC9102DA
CON-HEM-9E0A054961D86A

## related_articles
ART-HEM-AU102-HEME-BIOSYNTHESIS: the iron this article follows into the diet is the same iron ferrochelatase inserts into haem at the end of that pathway.

## resource_ids
src_01ab4268402d32d4d111

## universities
au

## years
AU_Y1

## article_source_ids
src_01ab4268402d32d4d111

## question_ids

## module

## module_subject
AU-MED-102 > Biochemistry > Vitamins > Vitamin K, Vitamin B12 and Iron

## annotations
### definition_of · CON-HEM-A8349B0F9F93BF
Quote: Vitamin K is the cofactor for gamma-carboxylation of specific glutamate residues on clotting factors II, VII, IX and X, converting them to Gla residues that can chelate calcium and anchor the factors to phospholipid surfaces during coagulation.
Block: body

### definition_of · CON-HEM-6BB1F814D007D1
Quote: B12 deficiency blocks this step, so methylmalonic acid accumulates and is excreted in urine — the specific biochemical marker that distinguishes B12 deficiency from folate deficiency, since both impair DNA synthesis and cause the same macrocytic anaemia but only B12 deficiency raises methylmalonic acid.
Block: body

### definition_of · CON-HEM-351861BC9102DA
Quote: B12 itself is named cobalamin for the cobalt ion at the centre of its corrin ring.
Block: body

### definition_of · CON-HEM-9E0A054961D86A
Quote: Dietary iron is unevenly distributed across common foods: cereals (rice, wheat) and pulses supply meaningfully more than milk, which is a notably poor source
Block: body

## media

## media_recommendations
### flowchart · Propionate and methylmalonate clearance, biotin's step versus B12's step
Purpose: The question this article is built around depends on telling apart the biotin-dependent carboxylase step from the B12-dependent mutase step, and a student cannot hold two sequential enzyme steps and their two different vitamin cofactors from prose alone.
Priority: strongly helpful
Status: needed
Section: Mechanism
Source direction: openly licensed biochemistry pathway diagram
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Alexandria University Faculty of Medicine Biochemistry Department's own AFM question bank (src_01ab4268402d32d4d111), Blood section, questions 5, 6, 9, 11, 17, 19 and 25, read directly from the extracted page text.

## claim_ids
CLM-AU102-HEM-VITK-01 | CLM-AU102-HEM-B12-MMA-01 | CLM-AU102-HEM-B12-COBALT-01 | CLM-AU102-HEM-IRON-MILK-01

## span_ids
SPN-HEM-AU102-VITK-01 | SPN-HEM-AU102-B12-MMA-01 | SPN-HEM-AU102-B12-COBALT-01 | SPN-HEM-AU102-IRON-MILK-01

## evidence_gaps
[clear]

## conflicts
Q5 of the source bank names "following gastrectomy" as the one condition that does NOT typically cause vitamin K deficiency, which sits uneasily beside wider clinical teaching that gastrectomy can impair fat-soluble-vitamin absorption generally. Recorded as printed rather than silently corrected, per the concept's own field_notes.

## last_reviewed

## review_due

## notes
Written to teach the four vitamin/iron concepts this lane minted for the Blood-section questions that were not already covered by an existing Kasr concept. H6, H7 and H9 (methotrexate, folate deficiency, thymidylate synthesis) and D37 (the biotin/carboxylase pairing) are HIT-PENDING against Kasr's own vitamin articles instead — see pending-live/AU-MED-102-biochem-nitrogen-blood.md — and are deliberately not repeated here.

## field_notes
arabicTitle: Researched and written; no further verification step is available to this lane.
moduleIds: No verified AU-MED-102 subject-tree module ID exists yet.
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
media: No rights-cleared asset exists yet; one is requested in media_recommendations.
questionIds: Left for the import step; the testing questions are in this hand-over's question file.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-IMM-AU102-IMMUNOGLOBULIN-CLASSES

## title
Immunoglobulin classes and structure

## arabic_title
فئات وبنية الغلوبيولينات المناعية

## aliases
Antibody classes
IgG, IgA, IgM and IgE compared

## subject
imm

## topic
Immunology

## subtopic
Immunoglobulin classes

## microtopic

## nanotopic

## primary_node_id
DIS-IMU-T02

## secondary_node_ids
SYS-IMM | DIS-IMU

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1-3 foundation

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
The five immunoglobulin classes are told apart by structure and by role: the heavy chain's extra constant domains set the class, IgM is the pentameric first responder, IgG is the most abundant in plasma, IgA is the secretory antibody in milk and mucus, and IgE is the scarce, allergy-mediating, non-placenta-crossing class.

## sections
### Definition
An immunoglobulin is built of two identical heavy chains and two identical light chains. Each light chain carries one variable and one constant domain; each heavy chain carries one variable domain and three constant domains (a fourth replaces the hinge in IgM and IgE) — it is this heavy-chain domain set that determines which of the five classes (IgG, IgM, IgA, IgD, IgE) an antibody belongs to.

### Mechanism
IgM is assembled as a pentamer joined at a J chain, which gives it high avidity despite modest per-site affinity, and it predominates early in a primary immune response before class switching produces IgG — but it is not the class that mediates allergic reactions; that role belongs to IgE, which binds high-affinity Fc receptors on mast cells and basophils so that allergen cross-linking triggers degranulation. IgA is exported into secretions — milk, saliva, mucus — as a dimer protected from proteolysis, which is why it, not IgG, is the antibody found in milk. IgG, meanwhile, is present in plasma at the highest concentration of the five classes and is the class that crosses the placenta; IgE specifically does not.

### Key determinants
Which compartment a question specifies (plasma versus a secretion) changes the correct class — IgG for plasma abundance, IgA for milk and mucosal secretions. Which property is asked about (structure, kinetics, or an exclusion) also changes the correct class — the heavy-chain domain count is a structural fact common to every IgG-type antibody, while pentamer/primary-response/no-allergy is IgM-specific and allergy/placenta-crossing is IgE-specific.

### Clinical significance
IgE's inability to cross the placenta means a fetus is not passively sensitised by maternal IgE the way it can be passively protected (or, in Rh disease, harmed) by maternal IgG. IgA's secretory role is why breastfeeding transfers passive mucosal immunity that plasma antibody levels alone would not predict.

## published_summary

## published_sections

## hold_these
Each heavy chain carries 1 variable + 3 constant domains; each light chain carries 1 variable + 1 constant domain — the asymmetry is the point, not the numbers alone.
IgM is a pentamer and the primary-response antibody, but it does not mediate allergic reactions — that is IgE.
IgG is highest in plasma; IgA is the antibody of secretions such as milk; IgE is the least abundant and does not cross the placenta.

## lose_the_mark
Applying the light chain's 1-variable/1-constant domain count to the heavy chain, rather than recognising the heavy chain carries the extra constant domains that encode class and effector function.
Assuming every immunoglobulin behaves like IgG with respect to the placenta, when IgE specifically does not cross it.
Defaulting to "IgG is the main antibody" for a question that specifically names a secretion (milk) rather than plasma, where IgA is the correct answer instead.

## callout_evidence
### Each heavy chain carries 1 variable + 3 constant domains; each light chain carries 1 variable + 1 constant domain — the asymmetry is the point, not the numbers alone.
Claims: CLM-AU102-IMM-HEAVY-CHAIN-01
Citations: CIT-AU102-IMM-HEAVY-CHAIN-01
Reviewed by: Claude
Reviewed at: 2026-08-22

### IgM is a pentamer and the primary-response antibody, but it does not mediate allergic reactions — that is IgE.
Claims: CLM-AU102-IMM-IGM-01
Citations: CIT-AU102-IMM-IGM-01
Reviewed by: Claude
Reviewed at: 2026-08-22

## related_concepts
CON-IMM-7B24522E4AA746
CON-IMM-C654630EE8FAC7
CON-IMM-6EFE000F60C739
CON-IMM-88E230DE36ABFA
CON-IMM-3A081F9C7FBB9D

## related_articles
ART-HEM-AU102-BLOOD-VITAMINS-IRON: both are Blood-chapter topics tested by the same AFM question-bank section this lane drew from.

## resource_ids
src_01ab4268402d32d4d111

## universities
au

## years
AU_Y1

## article_source_ids
src_01ab4268402d32d4d111

## question_ids

## module

## module_subject
AU-MED-102 > Biochemistry > Blood > Immunoglobulins

## annotations
### definition_of · CON-IMM-7B24522E4AA746
Quote: each heavy chain carries one variable domain and three constant domains (a fourth replaces the hinge in IgM and IgE)
Block: body

### definition_of · CON-IMM-C654630EE8FAC7
Quote: IgM is assembled as a pentamer joined at a J chain, which gives it high avidity despite modest per-site affinity, and it predominates early in a primary immune response before class switching produces IgG — but it is not the class that mediates allergic reactions
Block: body

### definition_of · CON-IMM-6EFE000F60C739
Quote: IgG, meanwhile, is present in plasma at the highest concentration of the five classes
Block: body

### definition_of · CON-IMM-88E230DE36ABFA
Quote: which is why it, not IgG, is the antibody found in milk
Block: body

### definition_of · CON-IMM-3A081F9C7FBB9D
Quote: that role belongs to IgE, which binds high-affinity Fc receptors on mast cells and basophils so that allergen cross-linking triggers degranulation
Block: body

## media

## media_recommendations
### diagram · The five immunoglobulin classes compared by structure, plasma abundance and role
Purpose: A student cannot hold five classes' structural and functional distinctions from prose alone, and every exam question on this chapter depends on correctly matching a property to its one specific class rather than to immunoglobulins generally.
Priority: strongly helpful
Status: needed
Section: Mechanism
Source direction: openly licensed immunology reference diagram
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Alexandria University Faculty of Medicine Biochemistry Department's own AFM question bank (src_01ab4268402d32d4d111), Blood section, questions 18, 20, 21, 22 and 24, read directly from the extracted page text.

## claim_ids
CLM-AU102-IMM-HEAVY-CHAIN-01 | CLM-AU102-IMM-IGM-01 | CLM-AU102-IMM-IGG-RANKING-01 | CLM-AU102-IMM-IGA-SECRETORY-01 | CLM-AU102-IMM-IGE-01

## span_ids
SPN-IMM-AU102-HEAVY-CHAIN-01 | SPN-IMM-AU102-IGM-01 | SPN-IMM-AU102-IGG-RANKING-01 | SPN-IMM-AU102-IGA-SECRETORY-01 | SPN-IMM-AU102-IGE-01

## evidence_gaps
[clear]

## conflicts

## last_reviewed

## review_due

## notes
Written to teach the five immunoglobulin concepts this lane minted. H18 (light-chain properties, Q23) is a sparse update to the already-live CON-IMM-8F37F8822F1157 instead, recorded directly in the concept file rather than here, since that concept already has a live teaching article this lane does not own.

## field_notes
arabicTitle: Researched and written; no further verification step is available to this lane.
moduleIds: No verified AU-MED-102 subject-tree module ID exists yet.
microtopicId: No finer canonical node exists for this idea.
nanotopicId: No nanotopic exists below this level.
media: No rights-cleared asset exists yet; one is requested in media_recommendations.
questionIds: Left for the import step; the testing questions are in this hand-over's question file.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
