<!--
  AU-MED-201 (Endocrine and Genitourinary Systems & Clinical Skills 3) —
  physiology department article, one record covering every physiology
  concept authored for this module so far, across sources.

  First pass built from "EOM MCQs - Mock exam EGU 2023-2024 answers.pdf"
  (src_a6e9adda1ad630d28a55): 18 concepts — adrenal/acid-base physiology (3),
  insulin and glucose physiology (2), anterior pituitary hormone physiology
  (4), renal tubular/nephron physiology (7), reproductive endocrinology (1),
  and adrenergic receptor signalling (1).

  Second pass (appended 2026-09-03) built from "EOM MCQs - EGU FINAL -27-
  (wafdeen).pdf" (src_de3dfe0928d063fd37f4): 16 new concepts from that
  paper's Physiology section — acid-base/GFR physiology (5), parathyroid and
  calcium homeostasis (2), micturition (1), adrenal disorders (2),
  reproductive/fetal endocrinology (4), renal tubular transport (2). Four
  more of that section's questions reuse a first-pass concept rather than
  duplicating it.

  Third pass (appended 2026-09-03) finishes that same paper's Physiology
  section: 17 new concepts from Q23-Q38 and Q40 (Q39 held, 3 printed
  options) — thyroid hormone/gland physiology (5), adrenal cortex and
  androgen physiology (2), acid-base/GFR physiology (4), pituitary/growth
  hormone physiology (2), insulin and pancreatic islet physiology (2),
  renal endocrine function (1), reproductive endocrinology (1). Every new
  concept searched via find-existing.mjs before minting; no live or pending
  match found for any of the 17. Q25's key (a pH-7.2 DKA blood gas labelled
  "compensated" despite the pH remaining frankly, not merely low-normal,
  acidotic) and Q38's stem (an atypical way to test GH's diabetogenic link)
  are both kept per LANE-CARD's printed-key convention and flagged on each
  concept's own conflicts field.

  Import: Admin › Bulk import → article.
-->

# Item

## id
ART-END-AU-MED-201-MOCK-PHYSIOLOGY

## title
Endocrine, renal and acid-base physiology of the EGU system

## arabic_title


## aliases
Aldosterone and acid-base physiology|Anterior pituitary hormone physiology|Renal tubular physiology|Insulin action

## subject
renal

## topic
Endocrine and renal physiology

## subtopic
Adrenal, pituitary, pancreatic and renal tubular physiology

## microtopic


## nanotopic


## primary_node_id
DIS-PHY-T06

## secondary_node_ids


## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 2 EGU module

## reading_time
22

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## universities
au

## years
AU_Y2

## module


## module_subject
AU-MED-201 > Physiology > Endocrine, Renal and Acid-Base Physiology

## summary
Alexandria's EGU exam papers pair each physiological mechanism with the specific alternative their own answer tables test it against: what aldosterone excess and insulin deficiency each do (and do not) to plasma potassium and glucose handling, why the bicarbonate buffer is powerful despite a pKa far from blood pH, which anterior pituitary hormone is lost first and which really are anterior-pituitary in origin, how each renal tubule segment's specific transport role differs from its neighbours, and — from the FINAL -27- (wafdeen) paper — the reference values (arterial pH, GFR, minimal urine pH, Tm PAH) and clinical distinctions (acute parathyroid loss vs. PTH excess, adrenal virilism vs. Cushing's vs. Conn's, fetal vs. pubertal testosterone action) that round out this module's endocrine and renal physiology.

## sections
### Definition
Primary hyperaldosteronism (high circulating aldosterone with hypertension) classically produces hypokalemia, from aldosterone-driven renal Na+ reabsorption in exchange for K+ and H+ secretion at the collecting duct principal cells. Insulin deficiency in type I diabetes mellitus inhibits glycogenesis specifically (insulin's own anabolic action), while disinhibiting glycogenolysis, gluconeogenesis and ketogenesis; conversely, when present, insulin increases adipose fatty acid synthesis, lowers plasma potassium, increases cellular amino acid uptake, and inhibits hepatic gluconeogenesis. The bicarbonate buffer system's defining physiological strength is that its two components — CO2 (lungs) and HCO3- (kidneys) — can be independently regulated by two different organs, an "open system" property distinct from its pKa (~6.1, not close to blood pH 7.4). Among anterior pituitary hormones, growth hormone (GH) is classically the first lost in progressive partial pituitary insufficiency; FSH is a genuine anterior pituitary hormone, distinct from the hypothalamic releasing hormones CRH/TRH and from the posterior-pituitary-released ADH; and prolactin is the one protein/peptide hormone among catecholamine (amine), thyroxine (amino-acid derivative) and testosterone (steroid). Along the nephron, the distal convoluted tubule reabsorbs Na+ in exchange for K+/H+ secretion, collecting duct principal cells carry the ADH-dependent aquaporin-2 water channels, the vasa recta maintain (not create) the medullary osmotic gradient the loop of Henle establishes, and renal blood flow is approximately one-quarter of cardiac output.

### Mechanism
Aldosterone's mineralocorticoid receptor action at collecting duct principal cells increases apical Na+ channel and basolateral Na+/K+-ATPase activity, driving Na+ reabsorption (raising blood pressure via volume expansion) coupled to K+ and H+ secretion — hypokalemia and (typically) mild metabolic alkalosis, not acidosis, and no fall in cardiac output. Alpha-1 adrenergic receptors are Gq-coupled: catecholamine binding activates phospholipase C, generating IP3/DAG from membrane phosphatidylinositol and raising intracellular calcium — the a1 receptor's messenger system, distinct from beta receptors' Gs/cAMP-raising and alpha-2 receptors' Gi/cAMP-lowering pathways. This source's own printed key attributes ADH-deficiency water loss to the distal convoluted tubule specifically, where most texts describe the late distal tubule together with the collecting duct as the functional ADH-sensitive unit — the key is kept per this lane's sourcing convention, with the discrepancy flagged on that concept's own record. A substance that is freely filtered but neither reabsorbed nor secreted has its excretion rate fixed entirely by its filtered load (GFR x plasma concentration), since no tubular transport factor (medullary gradient, carrier number, hormonal control) can act on a substance undergoing no reabsorption or secretion. Intratesticular testosterone, concentrated locally by Sertoli cells via androgen-binding protein, is the direct hormonal driver of primary-to-secondary spermatocyte meiosis, with LH acting only indirectly (upstream, via Leydig cell testosterone production).

### Key determinants
A proportionate short-stature adolescent with normal cognition and hypogonadism fits combined GH and GnRH/gonadotropin deficiency (GH deficiency causing the growth failure without affecting intelligence, unlike thyroid deficiency; GnRH/gonadotropin deficiency causing the hypogonadism) rather than isolated GH deficiency (would not explain the hypogonadism) or thyroid/insulin deficiency alone. The distal convoluted tubule's Na+/K+/H+ exchange function is distinguished from the collecting duct's "final urine composition" role, the proximal tubule's dominant H+-secretion mechanism, and the proximal tubule's ~65% (not ~50%) obligatory water reabsorption. A diabetic patient in ketoacidosis with low HCO3-, low-normal pH and low PaCO2 (with clinical hyperventilation) fits compensated metabolic acidosis: the primary disturbance is metabolic (ketoacid accumulation lowering HCO3-), and the low PaCO2 reflects appropriate respiratory compensation, not a primary respiratory process.

### Reference values and clinical distinctions (FINAL -27- wafdeen, Physiology)
Normal arterial pH is approximately 7.40 and normal adult GFR is approximately 125 mL/min; the kidney's maximal urinary acidifying capacity reaches a floor of about pH 4.5, below which tubular H+ secretion cannot continue, and this source's own key gives the maximal tubular secretory capacity (Tm) for PAH as 75 mg/min. GFR itself rises with an increased filtration coefficient but falls with afferent arteriole constriction, efferent arteriole dilation or sympathetic stimulation. The thick ascending limb ("diluting segment") reabsorbs sodium and chloride without water, while the proximal convoluted tubule reabsorbs essentially all filtered glucose; ADH increases the distal tubule/collecting duct's water permeability, and the vasa recta maintain (not create) the medullary gradient established by the loop of Henle — the basic micturition reflex arc is itself spinal, modulated but not generated by higher centres. Acute loss of all parathyroid tissue causes hypocalcemic tetany, the opposite clinical picture from PTH's own net effect of increasing bone resorption to raise plasma calcium; erythropoietin deficiency, not hemolysis, causes the anemia of chronic renal insufficiency. Adrenal virilism manifests as hirsutism, distinct from a cortisol-secreting adrenal tumour's primary Cushing syndrome (hyperglycemia, hypertension, purple striae) and from aldosterone hypersecretion's own mild metabolic alkalosis. In fetal life testosterone (via DHT) drives development of the penis, scrotum and testis, a distinct action from its later pubertal effects; this source's key also attributes the ovulation-triggering LH surge to 48 hours before ovulation (more commonly cited as ~36 hours elsewhere), and names hCG as the pregnancy hormone detected in a standard urine test.

### Thyroid, adrenal, pituitary and reproductive physiology (FINAL -27- wafdeen, Physiology Q23-40)
Thyroxine, normally mildly anabolic for protein, becomes net catabolic in large/excess doses, driving the muscle wasting of thyrotoxicosis; the thyroid gland itself lies opposite vertebral levels C5-T1, and primary hyperthyroidism (Graves' disease) produces elevated T3/T4 with suppressed TSH, increased GI motility, and weight loss despite normal or increased appetite. The kidney's own secreted hormone is erythropoietin (not angiotensin, angiotensinogen or ANP); renal failure, not vomiting or high altitude, is a cause of metabolic acidosis, and hyperventilation (not hypoventilation or bicarbonate/H+ excretion) is its respiratory compensation; strong sympathetic stimulation, unlike mild efferent constriction, afferent dilation or hypoproteinemia, decreases rather than increases GFR. A severe diabetic-coma blood gas (pH 7.2, PaCO2 20, HCO3- 18) is labelled by this source's own key as compensated metabolic acidosis despite the pH remaining frankly low. Acromegaly (adult GH excess) causes insulin-resistant hyperglycemia, not hypoglycemia, mental retardation or pigmentation; cortisol excess increases bone resorption; somatostatin inhibits both insulin and glucagon secretion; parasympathetic (vagal) stimulation is a physiological stimulus of insulin secretion; and hCG, not relaxin, LH or FSH, rescues the corpus luteum from involution after fertilization. Precocious beard growth in a child reflects androgen-driven virilism, distinct from acromegaly, Graves' disease or cretinism.

### Clinical significance
Recognising hyperaldosteronism's hypokalemia (not decreased cardiac output or acidosis) is central to working up resistant hypertension. Understanding type I diabetes's selective inhibition of glycogenesis (with disinhibited ketogenesis, gluconeogenesis and glycogenolysis) explains the hyperglycemia and ketoacidosis of untreated disease, while insulin's opposite, anabolic actions (increased adipose lipogenesis, lowered plasma K+, increased amino acid uptake, inhibited gluconeogenesis) explain both its therapeutic effect and the risk of iatrogenic hypokalemia with insulin therapy. The bicarbonate buffer's organ-independent regulability is why clinicians can separately assess and treat respiratory versus metabolic acid-base derangements. Knowing GH is classically lost first in progressive hypopituitarism guides which axis to test earliest when a pituitary mass is suspected, and distinguishing genuine anterior pituitary hormones from hypothalamic releasing hormones and posterior-pituitary ADH avoids diagnostic confusion when interpreting a low hormone level. Along the nephron, distinguishing each segment's specific transport role (DCT's Na+/K+/H+ exchange, collecting duct principal cells' ADH-dependent water reabsorption, the vasa recta's gradient-preserving rather than gradient-creating role) underlies interpreting diuretic mechanisms and diabetes insipidus. And recognising a compensated-versus-uncompensated, metabolic-versus-respiratory acid-base picture (as in this DKA vignette) is a core bedside skill for interpreting arterial blood gases. Distinguishing hyperthyroidism's weight-loss/hypermotility/elevated-T3-T4-suppressed-TSH picture from hypothyroidism's opposite findings, recognising GH excess's insulin-resistant hyperglycemia, and knowing that strong sympathetic stimulation lowers GFR are all core bedside skills for this module's endocrine and renal physiology.

## published_summary


## published_sections


## hold_these
Hyperaldosteronism = hypokalemia (not decreased cardiac output, not acidosis, not hypercalcemia).
Insulin deficiency (type I DM) inhibits glycogenesis; ketogenesis, gluconeogenesis and glycogenolysis are all DISINHIBITED (enhanced) instead.
Bicarbonate buffer's key strength = independently regulated components (lungs/CO2, kidneys/HCO3-), not a pKa close to blood pH.
This source's key: ADH deficiency water loss occurs through the distal convoluted tubule (most texts say DCT + collecting duct together) — kept per printed-key convention, discrepancy flagged.
Alpha-1 adrenergic receptors signal via calcium/phosphatidylinositol (Gq), NOT cAMP; beta receptors raise cAMP (Gs), alpha-2 receptors lower it (Gi).
GH is classically the FIRST anterior pituitary hormone lost in progressive partial pituitary insufficiency.
ADH's target organ = kidney (distal tubule/collecting duct); FSH is a genuine anterior pituitary hormone (CRH/TRH are hypothalamic, ADH is posterior pituitary).
Proportionate short stature + normal cognition + hypogonadism = combined GH + GnRH/gonadotropin deficiency.
DCT reabsorbs Na+ in exchange for K+/H+ secretion (aldosterone-sensitive); this is distinct from the collecting duct's "final composition" role and the proximal tubule's ~65% water reabsorption/H+ secretion mechanism.
Freely filtered, non-reabsorbed, non-secreted substance: excretion rate = filtered load, unaffected by medullary gradient/carrier number/hormonal control.
Testosterone (concentrated by Sertoli cells) directly drives primary-to-secondary spermatocyte meiosis; LH acts only indirectly, via Leydig cell testosterone production.
Renal blood flow ≈ 1/4 (25%) of cardiac output.
Vasa recta MAINTAIN (not create) the medullary interstitial osmotic gradient via countercurrent exchange.
Collecting duct principal cells carry the ADH-dependent aquaporin-2 water channels — the cell type affected in low-ADH states, not podocytes, vasa recta endothelium, or juxtaglomerular cells.
Insulin increases adipose fatty acid synthesis, LOWERS plasma K+, INCREASES amino acid uptake, and INHIBITS hepatic gluconeogenesis.
DKA blood gas (low HCO3-, low-normal pH, low PaCO2, clinical hyperventilation) = compensated metabolic acidosis.
Prolactin is the one protein/peptide hormone among catecholamine (amine), thyroxine (amino-acid derivative) and testosterone (steroid).
Normal arterial pH ≈ 7.40; normal adult GFR ≈ 125 mL/min.
GFR rises with an increased filtration coefficient; it FALLS with afferent constriction, efferent dilation, or sympathetic stimulation.
The kidney's maximal urinary acidification reaches a floor of ~pH 4.5, below which H+ secretion stops.
This source's key: Tm PAH = 75 mg/min (some texts cite ~80 mg/min).
The diluting segment (thick ascending limb) reabsorbs Na+/Cl- WITHOUT water — this is what dilutes the tubular fluid.
The proximal convoluted tubule reabsorbs essentially ALL filtered glucose (via SGLT2/SGLT1), not the DCT, loop of Henle or collecting duct.
The basic micturition reflex arc is SPINAL (S2-S4), modulated but not generated by the cortex or brain stem.
Sudden loss of the parathyroid glands causes ACUTE HYPOCALCEMIC TETANY, not bone fractures (that is chronic PTH excess).
PTH's net skeletal effect is to INCREASE bone resorption (raising plasma calcium) and DECREASE urinary calcium loss.
Erythropoietin deficiency, not hemolysis, causes the anemia of chronic renal insufficiency.
Adrenal virilism manifests as HIRSUTISM, distinct from Cushing's moon face or Addison's pigmentation.
A cortisol-secreting ADRENAL tumour with hyperglycemia/hypertension/purple striae is PRIMARY (not secondary/pituitary) Cushing syndrome.
Fetal testosterone (via DHT) drives development of the penis, scrotum and testis — a distinct action from its pubertal effects (penile enlargement, bone growth).
This source's key: the LH surge occurs ~48h before ovulation (commonly cited elsewhere as ~36h) and is ovulation's trigger, not a consequence like corpus luteum formation.
hCG, not hCS/LH/progesterone, is the pregnancy hormone detected by a standard urine test.
Thyroxine in large/excess doses is protein-CATABOLIC (opposite of its mild anabolic effect at physiological levels).
The kidney's own secreted hormone (among the options) is ERYTHROPOIETIN, not angiotensin, angiotensinogen or ANP.
This source's key: a DKA blood gas with pH 7.2/PaCO2 20/HCO3- 18 is COMPENSATED metabolic acidosis, even though the pH remains frankly, not merely low-normal, acidotic.
Renal failure, not vomiting or high altitude, CAUSES metabolic acidosis; hyperventilation, not hypoventilation or HCO3-/H+ excretion, COMPENSATES for it.
Acromegaly causes insulin-resistant HYPERGLYCEMIA, not hypoglycemia, mental retardation or pigmentation.
Parasympathetic (vagal) stimulation STIMULATES insulin secretion; hypoglycemia and falling amino acids do not.
Strong sympathetic stimulation DECREASES GFR; mild efferent constriction, afferent dilation and hypoproteinemia all INCREASE it.
hCG, not relaxin, LH or FSH, RESCUES the corpus luteum from involution after fertilization.
The thyroid gland lies opposite vertebral levels C5-T1.
Hyperthyroidism (Graves') = elevated T3/T4 + SUPPRESSED TSH, increased GI motility, and weight loss.
Cortisol INCREASES bone resorption and suppresses osteoblast activity — net bone loss.
Somatostatin INHIBITS both insulin and glucagon secretion.
Among PTH/androgen/aldosterone/GH, only GH has a genuine diabetogenic link to DM (this source's key).
Precocious beard growth in a child = VIRILISM (androgen excess), not acromegaly, Graves' or cretinism.

## lose_the_mark
Attributing decreased cardiac output, acidosis, or hypercalcemia to hyperaldosteronism instead of hypokalemia.
Assuming ketogenesis, gluconeogenesis or glycogenolysis is inhibited (not enhanced) by insulin deficiency.
Believing the bicarbonate buffer's pKa sits close to blood pH, or that it needs 1-2 days to act.
Selecting the descending or ascending limb of Henle, or the proximal convoluted tubule, over the distal convoluted tubule for this source's ADH-deficiency water-loss key.
Assuming alpha-1 receptors signal through cAMP like beta receptors.
Naming ACTH or TSH, rather than GH, as the first hormone lost in progressive pituitary insufficiency.
Classifying CRH, TRH or ADH as anterior pituitary hormones instead of FSH.
Choosing isolated GH deficiency or thyroid/insulin deficiency alone over combined GH+GnRH deficiency for a proportionate-short-stature-plus-hypogonadism vignette.
Attributing "final urine composition," proximal-tubule H+ secretion, or ~50% water reabsorption to the distal convoluted tubule instead of its own Na+/K+/H+ exchange function.
Attributing excretion-rate changes to medullary gradient, carrier number, or hormonal control for a substance with no net tubular transport.
Crediting LH directly (rather than testosterone) with driving primary-to-secondary spermatocyte meiosis.
Choosing 1/5, 1/3 or 1/2 of cardiac output instead of ~1/4 for renal blood flow.
Crediting the vasa recta with CREATING the medullary gradient rather than maintaining it.
Selecting podocytes, vasa recta endothelium, or juxtaglomerular cells over collecting duct principal cells as the ADH-affected cell type.
Assuming insulin elevates plasma K+, decreases amino acid uptake, or stimulates gluconeogenesis.
Misclassifying a low-HCO3-/low-PaCO2/low-normal-pH picture as a primary respiratory disturbance or as uncompensated.
Classifying testosterone or thyroxine as protein hormones instead of prolactin.
Naming a value other than ~7.40 (arterial pH) or ~125 mL/min (GFR) as the normal reference.
Assuming afferent constriction, efferent dilation or sympathetic stimulation RAISE GFR — each lowers it.
Choosing a less-acidic urine pH than ~4.5 as the kidney's true acidifying floor.
Selecting a Tm PAH value other than this source's own 75 mg/min key.
Assuming the diluting segment reabsorbs water, or that glucose is mostly reabsorbed outside the PCT.
Attributing the micturition reflex arc to the cortex, brain stem or "sacral plexus" rather than the spinal cord level.
Confusing acute parathyroid loss (hypocalcemic tetany) with chronic PTH excess (bone fractures), or crediting PTH with bone mineralization/increased urinary calcium loss.
Attributing renal anemia to hemolysis, decreased renin or increased cortisol instead of erythropoietin deficiency.
Attributing moon face, pigmentation or tetany (rather than hirsutism) to adrenal virilism.
Calling an adrenal-tumour Cushing picture "secondary," or confusing it with Addison's disease or Conn's syndrome.
Crediting fetal testosterone with scalp hair growth, bone growth or pubertal penile enlargement instead of external genital development.
Selecting corpus luteum formation, progesterone secretion or the oocyte's second meiotic division as the CAUSE of ovulation rather than its consequence.
Naming hCS, LH or progesterone instead of hCG as the urine pregnancy test hormone.
Assuming thyroxine stays anabolic for protein at large/excess doses instead of becoming catabolic.
Naming angiotensin, angiotensinogen or ANP instead of erythropoietin as the kidney's own secreted hormone.
Calling a pH-7.2/PaCO2-20/HCO3--18 blood gas uncompensated or a primary respiratory disturbance instead of this source's own "compensated metabolic acidosis" key.
Naming vomiting, high altitude or hyperaldosteronism instead of renal failure as a cause of metabolic acidosis, or hypoventilation/HCO3--excretion/H+-excretion instead of hyperventilation as its compensation.
Attributing hypoglycemia, mental retardation or pigmentation instead of hyperglycemia to acromegaly.
Missing parasympathetic stimulation as an insulin secretagogue, or choosing hypoglycemia/falling amino acids (which suppress insulin) instead.
Choosing mild efferent constriction, afferent dilation or hypoproteinemia (which all raise GFR) instead of sympathetic stimulation for a GFR-decreasing factor.
Naming relaxin, LH or FSH instead of hCG for corpus-luteum rescue after fertilization.
Misremembering the thyroid gland's vertebral level as other than C5-T1.
Attributing constipation, weight gain or hypercholesterolemia (hypothyroid features) to hyperthyroidism instead of increased GI motility/weight loss, or reversing the elevated-T3/T4-suppressed-TSH pattern.
Crediting cortisol with increased bone formation or osteoblast activation instead of increased resorption.
Assuming somatostatin increases GIT hormones or stomach motility instead of inhibiting insulin and glucagon.
Naming PTH, androgen or aldosterone instead of GH for this source's diabetogenic-hormone key.
Attributing a child's precocious beard growth to acromegaly, Graves' disease or cretinism instead of virilism.

## related_concepts
CON-END-01B09375D83562
CON-END-97D315F3E6ECFB
CON-REN-DA107AD8D88297
CON-REN-106A6BC5BA462A
CON-END-25A36EB94A8DD9
CON-END-7B88E785BB0EC2
CON-REN-6E832B8233EAD8
CON-END-E1FD6C9CCEAD58
CON-REN-27C6829FF375F7
CON-END-47B1788A21BEF9
CON-REN-B6BAE6F9DD9FFC
CON-AND-4F44607C7D0887
CON-REN-7CE7E3F88F63B2
CON-REN-0469D3CFE51413
CON-REN-429D791D6700C3
CON-END-32FB548D24C504
CON-REN-25DD9CCD2FC30A
CON-END-61DD0E91A0712A
CON-REN-BF229B77020A8E
CON-REN-58DBAB5742EB40
CON-END-B57EA69D5270D4
CON-REN-F4D6712E62A2AD
CON-REN-FAACB2125F21E4
CON-REN-B5F079F8DD9A0E
CON-REN-A20B7C25BAE2CE
CON-REN-C0FDC61645A4AF
CON-END-3E75A010AA9328
CON-AND-456E6F71026FD4
CON-END-533D0B097AA3E8
CON-REN-FB907C32CBA343
CON-REN-6F11A6D8DE63FA
CON-GYN-55E3B5F3A33704
CON-END-23C50164AD3F84
CON-GYN-2C117B27F10ECB
CON-END-9FFB74F21B2921
CON-REN-85DEDE700E9742
CON-REN-4BCF86E8BB9B2F
CON-REN-C2433855E262E0
CON-END-570F8B003A0CD8
CON-END-7612B4242FDB61
CON-REN-93A8BE3D2F0664
CON-REN-0BF1F94D1317F5
CON-GYN-F618825ECB3FE7
CON-END-6F425357E939AB
CON-END-4DE31C5B00165D
CON-END-73064D04EA93C0
CON-END-DE240B6530E54C
CON-END-6CD126ACAE4B79
CON-END-9C2E4611D24880
CON-END-72C010178E3605
CON-END-CE1567D211A3C3

## related_articles


## notes
Searched before creating: 18 endocrine/renal/acid-base physiology facts from AU-MED-201's Mock exam EGU 2023-2024 (src_a6e9adda1ad630d28a55, answers file, twinPreferred=true), each read against its own printed "The correct answer is: …" line. All 18 concepts were searched via find-existing.mjs plus a grep pass across docs/*-Source-Imports/concept/*.md before minting; several near-misses were checked and ruled not genuine hits (hyperaldosteronism/hypokalemia hit only Bartter-syndrome/alkalosis-driven mechanisms; ADH hits were SIADH/thiazide-mechanism facts; adrenergic hits were cardiovascular cAMP facts unrelated to the a1/IP3 pathway) — no closer live or pending match exists for any of the 18.

Q4's printed key (distal convoluted tubule, over the more commonly cited collecting duct) is kept per LANE-CARD's "printed keys stand, note doubts" rule; the discrepancy is flagged on that concept's own conflicts field rather than silently corrected.

Second pass (2026-09-03): 16 endocrine/renal physiology facts from AU-MED-201's FINAL -27- (wafdeen) paper (src_de3dfe0928d063fd37f4, native text, Physiology section, keyed on p8), each read against its own printed answer table. All 16 concepts were searched via find-existing.mjs before minting; four near-misses (erythropoietin, testosterone, Cushing/"Cushing reflex") were checked and ruled not genuine hits — different fact/mechanism/module context in each case — so no closer live or pending match exists for any of the 16. Four questions in this section (Q3, Q5, Q6, Q19) instead reuse an existing first-pass concept, since each tests the same underlying fact from a different stem; see each reused question's field_notes for the specific reasoning. Q10's key (Tm PAH = 75 mg/min, over the more commonly cited ~80 mg/min) and Q18's key (LH surge 48h before ovulation, over the more commonly cited ~36h) are both kept per the same printed-key convention and flagged on their own concepts' conflicts fields.

Third pass (2026-09-03): 17 endocrine/renal physiology facts finishing the FINAL -27- (wafdeen) paper's Physiology section (Q23-Q38, Q40; Q39 held, 3 printed options), each read against the section's own printed answer table (p8). All 17 concepts were searched via find-existing.mjs before minting, including a specific check against Q25's Mock-exam DKA sibling concept (CON-REN-25DD9CCD2FC30A, pH 7.35) — ruled not a genuine merge candidate since that concept's own definition text explicitly distinguishes a low-normal pH from a frankly abnormal one, which this paper's own pH-7.2 vignette would contradict if merged; a new concept was minted instead. No other genuine live or pending match was found for any of the 17. Q25's key (pH 7.2 labelled "compensated" despite being frankly acidotic) and Q38's stem (GH credited as the diabetes-linked hormone among PTH/androgen/aldosterone/GH, an atypically indirect way to test that fact) are both kept per the printed-key convention and flagged on their own concepts' conflicts fields.

## field_notes
arabicTitle: No standard Arabic term for this chapter is in undergraduate use separate from the English technical vocabulary.
subtopicId: No SUB_ identifier exists for this module in the curriculum overlay; module_subject carries the department's own chapter position instead.
microtopicId: The canonical placement (DIS-PHY-T06) and module_subject are already as fine as the source material distinguishes.
nanotopicId: The microtopic level is unused here, so a nanotopic beneath it would be finer than anything examined.
questionIds: question/AU-MED-201-mock-mcq.md and question/AU-MED-201-final27w-mcq.md carry the reciprocal question-to-concept links for this article's concepts.
media: No medical image exists in this repository for any of this article's items; none required one.
module: No verified live AU-MED-201 module id has been confirmed in server data yet; module_subject carries curriculum mapping instead.
lastReviewed: New record; not yet reviewed by faculty, which is why the publication gate is needs_evidence.
reviewDue: Set when the first faculty review completes.
