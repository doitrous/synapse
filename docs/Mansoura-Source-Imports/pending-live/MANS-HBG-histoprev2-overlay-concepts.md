<!--
  Sparse updates only. Every ## id below targets a concept that exists ONLY in an
  unimported Kasr, Ain Shams, Alexandria or FOMSCU batch (checked directly, none of
  these ids is live in server/data/medical-library-v1.json yet). Apply each record
  ONLY after its target file (named per record) is live.

  Per the MANS-HIS-203 lane's precedent (pending-live/MANS-HIS-203-concepts.md,
  2026-09-02) and the Alexandria lane's precedent it in turn follows: `## label` is
  written on every row (a filled label makes the batch validator's stub-create check
  treat the row as a full authoring attempt rather than an update, and an update row
  silent on `## label` blanks the live concept's real label on merge). `## canonical_key`
  is written too, as the discriminator.

  `## module_subject` is OMITTED on every row, deliberately. An earlier draft of
  this file restated it in full (base path(s) kept, MANS-HBG's own path appended)
  on the theory that dropping it would silently blank the target's real placement.
  That theory was wrong in a way that only shows up at the gate: `validate-content-
  batch.mjs`'s `catalogueErrors` requires `module_subject`'s FIRST segment to be a
  module named in the row's own `## modules` — and an append row's `## modules` is
  just `+MANS-HBG` (the delta, not the merged live value), so a restated base-first
  path always reads as declaring a module the row does not carry. Confirmed against
  the lane's own already-landed precedent (`pending-live/MANS-HIS-203-concepts.md`,
  commit `1f2c4d2c` and earlier on `main`): `gate.mjs batch` on that file fails 11/15
  items on this exact check, unnoticed because it was never gated after landing.
  Leaving `module_subject` off an update row is the actually gate-clean form of a
  sparse update — the target's real placement is untouched (nothing to blank), and
  MANS-HBG's own discovery path for each reused concept lives on the *question*
  records instead, which already carry their own full `module_subject`.

  `## universities`, `## modules` and `## learner_years` are genuine append-safe
  list columns (optionalList/importList): `+mans`, `+MANS-HBG` and `+1` add without
  disturbing kau/au/asu/scu or the existing module tags, or existing learner years.

  Lane mans-hbg-author2, cluster histoprev2. Gate is `gate.mjs batch` with every
  target file named via --with -- run once without --with (expect the "does not
  exist" refusal) and once with (expect a clean pass); these `## id`s are not live,
  so `gate.mjs simulate` cannot resolve them yet and is not the gate for this file
  alone (it is exercised together with the question/concept/article files in the
  full dependency-chain simulate run, see the lane report).

  node scripts/content/gate.mjs batch "docs/Mansoura-Source-Imports/pending-live/MANS-HBG-histoprev2-overlay-concepts.md" \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md \
    --with docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md \
    --with docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md \
    --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md \
    --with docs/Ain-Shams-Source-Imports/concept/ASU-HCB-zahra1-mcq-concepts.md \
    --with docs/Ain-Shams-Source-Imports/concept/ASU-UG-eom-ug-final2-collection-concepts.md \
    --with docs/Ain-Shams-Source-Imports/concept/ASU-AE-embryo1-new-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md \
    --with docs/FOMSCU-Source-Imports/concept/SCU-FBS102-s2-mint-concepts.md
-->

# Item

## id
CON-FND-5097CA5BAB2E51

## canonical_key
chromosomal-abnormalities-and-the-syndromes-they-cause

## label
Named syndromes follow from a specific extra chromosome, missing sex chromosome or deleted arm

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested four times in this cluster — as main concept in q43 (Down syndrome's extra chromosome number, p10) and q60 (Turner's syndrome karyotype 45,XO via a case vignette, p14), and as a contextual concept in q46 (reading a 47,XY+21 karyotype as Down syndrome, p11) and q61 (Wolf syndrome as a structural, not numerical, abnormality, p15) — all against this concept's own Down/Turner/Klinefelter/cri-du-chat facts.

---

# Item

## id
CON-DEV-4BD2C365E259E2

## canonical_key
somatic-cell.chromosome-number.44-autosomes-plus-2-sex-chromosomes

## label
The normal human somatic cell has 44 autosomes plus 2 sex chromosomes, which may be the same or different

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q44 (autosome count in human sperm, p10) — this concept's own definition states the halved, haploid gamete formula (22 autosomes plus a single sex chromosome) that the question tests directly.

---

# Item

## id
CON-GYN-40648C1EFC7C3F

## canonical_key
genetics.oocyte-meiosis-i-nondisjunction-down-syndrome

## label
Failure of chromosome separation during the first meiotic division of the primary oocyte classically produces Down syndrome (trisomy 21)

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested twice — q46 (reading a 47,XY+21 karyotype as Down syndrome, p11) and q47 (naming maternal meiosis I nondisjunction as the commonest mechanism, p11).

---

# Item

## id
CON-FND-AB1858FD6C0F61

## canonical_key
mitosis-vs-meiosis.comparison

## label
Mitosis is one division producing two identical diploid daughter cells; meiosis is two divisions with crossing over, producing four genetically varied haploid ones

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q49 (naming crossing over as the process that exchanges maternal and paternal chromosome material, p11).

---

# Item

## id
CON-FND-685D573458A6D7

## canonical_key
meiosis.two-successive-divisions-and-crossing-over

## label
Meiosis is two successive divisions without an intervening S-phase, producing four haploid germ cells with crossing over

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q50 (meiosis involves one cycle of DNA replication feeding two divisions, p11).

---

# Item

## id
CON-FND-8DA30AD870AC1E

## canonical_key
necrosis.morphology.nuclear-and-cytoplasmic-changes

## label
Necrosis is recognised by karyolysis, pyknosis and karyorrhexis with a pinker cytoplasm

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q51 (describing pyknosis as nuclear shrinkage into a smaller, darker, eccentric mass, p12) — a Year-1 cytology naming question reusing the same necrosis-morphology concept the ASU-HCB lane already reused from module 108 INT.

---

# Item

## id
CON-DEV-E9C307421DE375

## canonical_key
chromosomal-aberration.general-causes

## label
Radiation, viral infection, advanced maternal age, cytotoxic drugs and autoimmune disease all predispose to chromosomal aberration, each by a different route

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested twice — q52 (chromosomal condensation peaks at metaphase, p12) and q62 (karyotyping arrests mitosis at metaphase via colchicine, p15) — both against this concept's own colchicine/metaphase-arrest fact.

---

# Item

## id
CON-FND-F4B7458F8B8265

## canonical_key
plasma-membrane-unit-membrane-em-and-thickness

## label
The plasma membrane is a 7.5–10 nm trilaminar unit membrane, invisible in H&E and shown only by silver or PAS

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q54 (EM shape of the cell membrane = trilaminar, p13).

---

# Item

## id
CON-FND-29AD7E837E1E1E

## canonical_key
mitochondrion-ultrastructure-and-staining

## label
A mitochondrion is two membranes — a smooth outer one with porins and an inner one folded into cristae — around a matrix that holds its own DNA

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q55 (identifying the mitochondrion as the double-membranous organelle, p13) — reusing the same concept the ASU-HCB lane already tagged.

---

# Item

## id
CON-FND-C38F8E29E9FA1D

## canonical_key
histology.smooth-er.calcium-regulation-function

## label
Smooth endoplasmic reticulum regulates intracellular calcium concentration

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q56 (alcohol detoxification as an SER function, p13) — this concept's own definition names drug/toxin detoxification alongside calcium regulation among SER's cell-type-dependent jobs.

---

# Item

## id
CON-FND-73F10C624D4BE1

## canonical_key
microtubules-vs-microfilaments-comparison

## label
Microtubules and microfilaments differ in diameter, in protein and in what they build

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q58 (tubulin as the mitotic spindle's protein, p14).

---

# Item

## id
CON-FND-6DEB5A4F0F1675

## canonical_key
mitosis.four-stages-prophase-to-telophase

## label
Mitosis is prophase, metaphase, anaphase and telophase, producing two genetically identical daughter cells

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q59 (the nuclear envelope dissolves at prophase, p14).

---
# Item

## id
CON-CVS-7FC4E8F3FBEFFE

## canonical_key
cardiac-muscle.functional-syncytium-and-intercalated-discs

## label
Cardiac muscle behaves as a functional, not a true, syncytium — individual myocytes stay anatomically separate but are electrically coupled through the low-resistance gap junctions of the intercalated discs

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q64 (Where gap junctions are found among the listed tissues, p15).

---

# Item

## id
CON-DER-406696F770DA63

## canonical_key
sebaceous-glands.structure-holocrine-secretion-function

## label
Sebaceous glands are holocrine acinar glands, usually attached to hair, whose cells die to release sebum

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q42 (Where the sebaceous gland duct opens, p10).

---

# Item

## id
CON-DER-ACDEAF318B290B

## canonical_key
skin.thin.definition-sites-and-comparison-with-thick-skin

## label
Thin (hairy) skin covers most of the body and differs from thick skin in every epidermal layer, its appendages, and its dermal papillae

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q84 (A feature of thick skin, p21).

---

# Item

## id
CON-FND-2560DB7970AF40

## canonical_key
organelles-inclusions-and-the-membranous-classification

## label
Organelles are living and essential, inclusions are not, and organelles divide into membranous and non-membranous

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested 3 times in this cluster - q67 (Identifying a cell inclusion, p16), q72 (The organelle without a limiting membrane, p18), q74 (Identifying an exogenous pigment, p18).

---

# Item

## id
CON-FND-29D305EDFC022D

## canonical_key
chromosome-classification.by-gene-content-centromere-position-and-length

## label
Chromosomes are classed by gene content into autosomes and sex chromosomes, by centromere position into four shapes, and by length into seven groups

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q68 (Chromosomes carrying a secondary constriction, p16).

---

# Item

## id
CON-FND-2EAD7BC676C215

## canonical_key
zonula-occludens-seals-the-space-between-cells

## label
The zonula occludens fuses adjacent membranes at points, encircles the apex of the cell, and seals the space between cells

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q71 (The junction that prevents flow between luminal and intercellular fluids, p18).

---

# Item

## id
CON-FND-30573B6D0A9AFD

## canonical_key
nucleolus-parts-and-ribosome-formation

## label
The nucleolus is an unbounded basophilic mass whose three dark parts are the rRNA gene, the new rRNA and the mature rRNA

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q89 (The function of the nucleolus, p22).

---

# Item

## id
CON-FND-3E3303864A3CE8

## canonical_key
loose-areolar-connective-tissue-identification

## label
Loose areolar connective tissue is identified by both fibre types and scattered cells in an open matrix

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q69 (The connective tissue type that shows areolae, p17).

---

# Item

## id
CON-FND-56B72DE04F5FED

## canonical_key
golgi-apparatus-structure-function-staining

## label
The Golgi apparatus is invisible in H&E and has to be silvered to be seen at all

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q86 (A true statement about the Golgi apparatus, p22).

---

# Item

## id
CON-FND-5978F4DEFD32DC

## canonical_key
cell.centriole.self-replication

## label
Centrioles are self-replicating, non-membranous organelles, unlike the Golgi complex

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q77 (The organelle that divides to increase its own number, p20).

---

# Item

## id
CON-FND-60953640114635

## canonical_key
free-versus-attached-ribosomes-and-cytoplasmic-basophilia

## label
Free ribosomes make protein the cell keeps; attached ribosomes make protein it exports — and both together are why cytoplasm is basophilic

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q78 (Which ribosomes make protein the cell keeps, p20).

---

# Item

## id
CON-FND-6268E97A4A9F26

## canonical_key
intermediate-filament-types-and-tumour-diagnosis

## label
Intermediate filaments are supportive, 8-10 nm, and each tissue has its own protein - which is what makes them diagnostic

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q73 (The diameter of intermediate filaments, p18).

---

# Item

## id
CON-FND-6913B2CF5EFC7C

## canonical_key
transitional-epithelium-dome-cells-and-a-changing-layer-count

## label
Transitional epithelium - urothelium - has dome-shaped superficial cells with rigid plaques, and it thins from 6-8 layers to 3-4 as the bladder fills

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q88 (Cell layers of the full urinary bladder, p22).

---

# Item

## id
CON-FND-7D406E91EA3BF2

## canonical_key
mast-cell-granule-contents-and-the-anaphylactic-reaction

## label
The mast cell stores heparin and histamine and releases them when allergen binds its IgE - which is what an anaphylactic reaction is

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q82 (The connective tissue cell that secretes SRS-A, p21).

---

# Item

## id
CON-FND-85CC08A33D0A88

## canonical_key
plasma-membrane-molecular-components-and-fluid-mosaic

## label
The cell membrane is a phospholipid bilayer with cholesterol, peripheral and integral proteins, and carbohydrate on its outer face

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q66 (A true statement about cell membrane structure, p16).

---

# Item

## id
CON-FND-AEAB45FAA2C33D

## canonical_key
nucleus-shape-position-and-number-identify-the-cell

## label
A cell is named from the number, position, shape and staining of its nucleus

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q90 (The connective tissue cell with a chart-wheel nucleus, p22).

---

# Item

## id
CON-FND-CDD48AD3D28954

## canonical_key
cell.chromatin.euchromatin-properties

## label
Euchromatin is the extended, transcriptionally active form of chromatin, pale and not distinctly resolved by light microscopy

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q79 (What euchromatin represents, p20).

---

# Item

## id
CON-FND-E6C216AED80ED8

## canonical_key
bone-and-cartilage-matrix-protein-composition

## label
Bone protein is mainly type I collagen and cartilage protein is mainly type II collagen, and bone's major non-collagenous protein, osteocalcin, needs vitamin K to gamma-carboxylate its glutamate residues so they can bind hydroxyapatite

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q75 (The collagen fibre type present in bone, p19).

---

# Item

## id
CON-HEM-D1628423BE0844

## canonical_key
mononuclear-phagocyte-system.definition-origin-and-distribution

## label
The mononuclear phagocyte system is monocyte-derived phagocytes distributed under different names across almost every organ

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q41 (Skin macrophage of the epidermis, p10).

---

# Item

## id
CON-NEU-7C20A38BB4B865

## canonical_key
nerve.coverings.perineurium-blood-nerve-barrier

## label
The perineurium, a sleeve of layered flattened cells joined by tight junctions around each nerve fascicle, forms the blood-nerve barrier

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q70 (Connective tissue surrounding a single nerve fibre, p17).

---

# Item

## id
CON-NEU-93CD087BDE3F7B

## canonical_key
neuroglia.cell-functions.astrocyte-microglia-oligodendrocyte-ependymal

## label
Astrocytes form the blood-brain barrier, microglia phagocytose as the CNS's resident monocyte-derived cell, oligodendrocytes myelinate CNS axons, and ependymal cells line the CSF-filled cavities

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q83 (A true statement about ependymal cells, p21).

---

# Item

## id
CON-RES-38BA83C42FBE02

## canonical_key
conducting-portion-epithelium.five-cell-types

## label
The conducting portion's epithelium has five cell types: ciliated, goblet, brush, basal and small granule cells

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q80 (Epithelium lining the upper respiratory tract, p20).

---
