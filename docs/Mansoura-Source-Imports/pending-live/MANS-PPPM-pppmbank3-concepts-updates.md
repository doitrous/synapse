<!--
  Sparse updates only. Every ## id below targets a concept that already exists in
  another university's pending batch -- none of these ids are in
  server/data/medical-library-v1.json yet. Apply each record ONLY after its
  target file (named per record) is live.

  Per this lane's own brief and the Alexandria AU-MED-103-histology.md precedent:
  `## label` is restated verbatim (a blank label on an update row would blank the
  live concept's real label on merge -- conceptFromRow defaults label to '' rather
  than undefined). `## canonical_key` is written too, as the discriminator.
  `## module_subject` is deliberately NOT written here -- it is not an append-safe
  column (a bare value replaces wholesale), and every target record below already
  carries its own real module_subject naming its home module; writing one here
  would silently erase that placement on merge. The Mansoura module attachment
  survives on `## modules` (a genuine append-safe list column) instead, and the
  Mansoura exam appearance (source, page, cluster) is recorded in `field_notes`
  `universityNotes:` prose, where it cannot collide with anything.

  `## universities`, `## modules` and `## learner_years` are append-safe list
  columns: `+mans`, `+MANS-PPPM`, `+1` add without disturbing the target record's
  existing kau/asu/aun tags. `applyListDirective` (src/data/importSemantics.ts)
  filters out values already present, so re-appending a tag this lane's own
  earlier cluster (pppmbank2) already added is a safe no-op, not a duplicate --
  CON-FND-DF726F864C8BC3 below is one such carry-forward, included here only to
  extend its universityNotes with this cluster's own new citations.

  Lane mans-pppm-author3 (cluster pppmbank3, Pathology p.18-27 of PPPM Exam
  Bank ( 61, 60, 59, 58).pdf, src_111bbd078054dc30d3af, continuing after lane 2's
  p.17 Q1-5). Gate is `medical:batch` with every target file named via --with --
  run once without --with (expect the "does not exist" refusal) and once with
  (expect a clean pass); these `## id`s are not live, so `medical:simulate`
  cannot resolve them yet and is not the gate here:

  node scripts/content/gate.mjs batch "docs/Mansoura-Source-Imports/pending-live/MANS-PPPM-pppmbank3-concepts-updates.md" \
    --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md \
    --with docs/Kasr-Source-Imports/concept/208-INT-concepts.md \
    --with docs/Assiut-Source-Imports/concept/AUN-MPT-104-concepts.md
-->

# Item

## id
CON-FND-88508ABAB84A67

## canonical_key
necrosis.liquefactive.cns-infarct-and-pus

## label
Liquefactive necrosis turns the dead tissue to fluid, in the brain and in pus

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.18 and p.22, tests this record twice in this lane's pppmbank3 cluster -- "which tissue is most susceptible to liquefactive necrosis following infarction" (p.18, keyed D, brain) and a stroke vignette asking the necrosis type of a well-developed brain infarction (p.22, keyed C, liquefactive) -- no new fact added.

---

# Item

## id
CON-FND-5285A9707E61CA

## canonical_key
necrosis.coagulative.ischaemic-protein-denaturation

## label
Coagulative necrosis keeps the cell outline because denaturation outruns autolysis

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.18 and p.25, tests this record twice in this lane's pppmbank3 cluster -- "coagulative necrosis usually results from" (p.18, keyed B, ischemia) and "which type of necrosis is most characteristic of ischemia involving the heart or kidney" (p.25, keyed B, coagulative) -- no new fact added.

---

# Item

## id
CON-FND-5CB8B822A9A6AF

## canonical_key
hyaline.change.intracellular-and-extracellular

## label
Hyaline change names a glassy pink appearance, not a single substance

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.18, tests this record's own extracellular hyaline-change example directly -- "which one of the following is considered as an example of vascular hyalinosis", keyed D, Atherosclerosis, read as pointing at the record's own 'arteriolar walls of long-standing hypertension and diabetes' example -- no new fact added.

---

# Item

## id
CON-FND-342EB8A955CCAE

## canonical_key
suppurativeinflammation.types.cellulitis-vs-abscess-vs-pseudomembranous

## label
Localized suppurative inflammation (abscess, boil, carbuncle) is walled off by staphylococcal coagulase, while diffuse suppurative inflammation (cellulitis) spreads via streptococcal fibrinolysin and hyaluronidase

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.18, p.21, p.22 and p.25, tests this record five times in this lane's pppmbank3 cluster -- "which of the following describes an abscess" (p.18, keyed D), "which organisms can cause suppurative inflammation" (p.18, keyed E, staphylococci), "phlegmonous inflammation... collection of dead & dying polymorphs" (p.21, keyed C, read against the record's own diffuse-suppurative/cellulitis clause), "acute suppurative inflammation... carbuncle" (p.22, keyed E), and "example of purulent inflammation... lung abscess" (p.25, keyed C) -- no new fact added.

---

# Item

## id
CON-FND-DF726F864C8BC3

## canonical_key
cell.adaptation.hypertrophy-hyperplasia-atrophy-metaplasia

## label
Adaptation takes four forms: hypertrophy, hyperplasia, atrophy and metaplasia

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.19, p.21 and p.24, tests three more branches of this record in this lane's pppmbank3 cluster (lane mans-pppm-author2's pppmbank2 cluster already tagged this record for the hypertrophy-definition angle) -- "bulging muscles of bodybuilders" (p.19, keyed D, hypertrophy applied example), "increased number of cellular elements" (p.21, keyed D, hyperplasia), and "epithelium develops in metaplasia of the tracheal mucosa" (p.24, keyed E, squamous) -- no new fact added.

---

# Item

## id
CON-FND-9853F779478D1A

## canonical_key
granulationtissue.composition.fibroblasts-and-new-capillaries

## label
Granulation tissue is proliferating capillaries and fibroblasts, moist red and easily bleeding, formed early in healing by fibrosis

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.19 and p.23, tests this record's own pitfalls text (avascular scar vs vascular granulation tissue) and its definitional maturation timeline directly -- "what is a scar tissue" (p.19, keyed A, avascular strong fibrous tissue, with granulation tissue itself as the key distractor) and the caesarian-section day-3 wound-site vignette (p.23, keyed A, granulation tissue) -- no new fact added.

---

# Item

## id
CON-FND-323905D76583CF

## canonical_key
neoplasia.papilloma.benign-non-glandular-epithelial-tumour

## label
Papilloma is the benign epithelial tumour of non-glandular surfaces

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.19, tests this record directly -- "which of the following is a benign tumour of surface epithelium", keyed D, papilloma -- no new fact added. A cohort-repeat of the identical question at p.23 (Q36) is held as a duplicate, not re-tagged.

---

# Item

## id
CON-FND-063F60318B4D20

## canonical_key
atrophy.heart.brown-atrophy-with-lipofuscin

## label
Brown atrophy is a small brown senile heart loaded with lipofuscin

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.20, tests this record's exact vignette directly -- "dead old patient was found to have a small brown heart... yellow refractile pigment... the pigment is most likely to be", keyed D, lipofuscin -- no new fact added.

---

# Item

## id
CON-FND-759929134FF959

## canonical_key
acuteinflammation.cellularevents.margination-rolling-integrin-emigration-sequence

## label
Leukocyte recruitment in acute inflammation follows a fixed sequence — margination and rolling (selectins), pavementing/adhesion (integrins), then emigration and chemotaxis — with neutrophils arriving before monocytes

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.20, tests the chemotaxis branch of this record's own sequence directly -- "term describes directional movement of leucocytes towards the irritant", keyed A, chemotaxis -- no new fact added.

---

# Item

## id
CON-FND-DA7931EDFB7CDF

## canonical_key
teaching.pathology.wound-healing.first-vs-second-intention

## label
Healing by first intention (apposed edges, low complications) versus second intention (tissue defect, more granulation tissue and complications)

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.20 and p.24, tests this record twice in this lane's pppmbank3 cluster -- "feature of healing by primary intention" (p.20, keyed D, rapid healing) and "type of healing in surgical wounds" (p.24, keyed D, primary intention) -- no new fact added.

---

# Item

## id
CON-FND-2DDF56DA42A0A8

## canonical_key
cell.injury.reversible-cloudy-swelling-hydropic-fatty

## label
Reversible injury shows as cloudy swelling first, then hydropic change, then fatty change

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.21 and p.26, tests this record twice in this lane's pppmbank3 cluster -- "key cellular organelle responsible for the pathogenesis of cloudy swelling" (p.21, keyed C, mitochondria, read against the record's own sodium-pump-failure mechanism) and "effect of cloudy swelling on the nuclei of cells" (p.26, keyed D, no change, read against the record's own reversible-vs-necrosis distinction) -- no new fact added.

---

# Item

## id
CON-FND-33466CEBFC4EBA

## canonical_key
calcification.dystrophic.damaged-tissue-normal-calcium

## label
Dystrophic calcification is calcium laid down in already damaged tissue at a normal serum calcium

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.22, tests this record directly -- "dystrophic calcification", keyed A, occurs in areas of necrosis -- no new fact added.

---

# Item

## id
CON-FND-2129BD0D77EC62

## canonical_key
granuloma.definition.macrophage-aggregate

## label
A granuloma is a specific pattern of chronic inflammation defined by a localized aggregation of activated macrophages (epithelioid cells), not by cholesterol clefts, endothelial-fibroblast proliferation, or hemosiderin pigment

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.24 and p.26, tests three facts within this record's own definition text in this lane's pppmbank3 cluster -- "which of the following describes granuloma" (p.24, keyed D, chronic specific inflammation), "multinucleated giant cells originate by fusion of which type of cells" (p.24, keyed C, macrophages, matching the record's own giant-cell-fusion clause), and "main cell in the granuloma" (p.26, keyed D, histiocytes, matching the record's own epithelioid-transformation clause) -- no new fact added.

---

# Item

## id
CON-FND-F9DB9176CB94DF

## canonical_key
neoplasia.adenoma.benign-glandular-tumour

## label
Adenoma is the benign tumour of glandular epithelium

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.23, tests this record directly -- "adenoma is defined as", keyed A, benign epithelial neoplasm -- no new fact added.

---

# Item

## id
CON-FND-E3F496F6DDD7C3

## canonical_key
amyloidosis.systemic.primary-secondary-senile

## label
Systemic amyloidosis is primary, secondary or senile, and each has its own protein

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.23, tests the systemic side of this record directly against its sibling localised-amyloid record's named examples -- "one of the common examples of systemic amyloidosis", keyed C, multiple myeloma -- no new fact added.

---

# Item

## id
CON-FND-BA4E3D79017392

## canonical_key
atrophy.causes.localized

## label
Pathological localized atrophy has five named causes -- hormonal, vascular, pressure, neuropathic and disuse -- distinct from generalized atrophy's causes (malnutrition, cachexia, thyrotoxicosis)

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.24, tests the vascular branch of this record's five named localised-atrophy causes directly -- "example of local atrophy", keyed B, ischemic atrophy -- no new fact added.

---

# Item

## id
CON-FND-D1D48A5564E978

## canonical_key
carcinogen.chemical.aflatoxin-hepatocellular-carcinoma

## label
Aflatoxin, a chemical carcinogen from Aspergillus flavus, causes hepatocellular carcinoma

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.27, tests this record directly -- "exposure to aflatoxin is a predisposing factor for which of the following tumors", keyed C, hepatocellular carcinoma -- no new fact added.
