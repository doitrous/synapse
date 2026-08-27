<!--
  Sparse updates for ASU-LOCO (Locomotor System, ASU_Y1 Term 2, Biochemistry) onto
  concept ids that exist only in other lanes' unimported batches, per LANE-BRIEF.md
  Section 6 minting ruling: a key hit outside live state is a sparse update written
  here, never a second full record. Two targets are Kasr Year 1 batches (collagen
  hydroxylation, scurvy, purine salvage, creatine phosphate); one is an Alexandria
  Year 1 batch (purine catabolism to uric acid) -- concept minting is
  university-blind, so the same medical idea keeps the one id regardless of which
  university's lane minted it first.

  Validate with:
    npm run medical:batch -- docs/Ain-Shams-Source-Imports/pending-live/ASU-LOCO-msk-biochemistry.md \
      --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
      --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-purine-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md \
      --with docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md

  Do not apply this file until the target file each record names is live.
-->

# Item

## id
CON-FND-96FF52D15F67AE

## label
Collagen synthesis hydroxylates some proline and lysine residues using vitamin C as cofactor, and attaches glucose and galactose to the resulting hydroxylysine residues, which is why collagen is considered a glycoprotein

## definition
During collagen synthesis, inside the lumen of the rough endoplasmic reticulum, some proline and some lysine residues of the procollagen α-chain are hydroxylated by hydroxylase enzymes that require vitamin C as a cofactor. Some of the resulting hydroxylysine residues are then glycosylated by the addition of glucose or galactose molecules — which is why collagen is considered a glycoprotein.

## explicit_objective
Name the vitamin cofactor collagen's hydroxylase enzymes require, and state which residue type carries the glucose/galactose that makes collagen a glycoprotein.

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the source concept record (102-INT-mcq-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md
asuTeaching: ASU Year 1 Locomotor Biochemistry (Term 2) tests this exact fact in `MCQs - Biochemistry Locomotor MCQs - CA1.pdf` (manifest src_e4a23646b45bcc340c70); no ASU-specific variance from the source text found.

---

# Item

## id
CON-FND-46C9A4425362B0

## label
Bleeding gums, falling teeth and wounds that will not heal are collagen failing, and the cause is vitamin C deficiency

## definition
The department book states that vitamin C deficiency — scurvy — is due to defective collagen synthesis, and that it presents with unhealed wounds and bleeding gums. Collagen is the fibre of repair: the fibroblast becomes active in injury and lays it down, so when it cannot be made properly the wound stays open and the tissue holding teeth and vessel walls together fails. The book names one other collagen disorder in the same place, keloid, where healing goes the other way and collagen is deposited to excess in a skin scar.

## explicit_objective
Recognise the clinical picture of defective collagen synthesis and name the vitamin whose deficiency causes it.

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the source concept record (101-ISK-mcq-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md
asuTeaching: ASU Year 1 Locomotor Biochemistry (Term 2) tests this exact fact in `MCQs - Biochemistry Locomotor MCQs - CA1.pdf` (manifest src_e4a23646b45bcc340c70); no ASU-specific variance from the source text found.

---

# Item

## id
CON-FND-92DD65D96E3FA1

## label
Purine catabolism in humans ends at uric acid, not urea or hypoxanthine

## definition
Humans lack uricase, so the purine bases adenine and guanine are degraded through hypoxanthine and xanthine to uric acid, which is excreted rather than oxidised further. Urea is the end product of amino-acid nitrogen disposal, a separate pathway.

## explicit_objective
State that uric acid, not urea or hypoxanthine, is the final excreted product of human purine catabolism, and explain why (uricase is absent in humans).

## arabic_label
حمض اليوريك كناتج نهائي لتكسير البيورينات

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the source concept record (AU-MED-102-biochem-molecular-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md
asuTeaching: ASU Year 1 Locomotor Biochemistry (Term 2) tests this exact fact in `MCQs - Biochemistry Locomotor MCQs - CA1.pdf` (manifest src_e4a23646b45bcc340c70); no ASU-specific variance from the source text found.

---

# Item

## id
CON-FND-DB8B4EFEB287DA

## label
Salvage returns a free purine base to the nucleotide pool in one step, and it is the major route in brain and red cell precursors

## definition
The salvage system rebuilds a purine nucleotide from a base that has already been made, and the book gives its significance as supplying purine nucleotides to tissues where de novo synthesis is not active — naming the brain and the precursors of red blood cells. It has two arms. Free bases are salvaged in a single step by transfer of the ribose phosphate of PRPP: adenine phosphoribosyl transferase makes AMP from adenine, and hypoxanthine-guanine phosphoribosyl transferase makes IMP from hypoxanthine and GMP from guanine, releasing pyrophosphate each time. Nucleosides are salvaged separately by adenosine kinase, which phosphorylates adenosine to AMP and deoxyadenosine to dAMP using ATP. Three bases, two transferases, one shared substrate.

## explicit_objective
Name the two tissues that depend on salvage, list the three salvageable free bases with their enzymes and products, and separate the free-base arm from the nucleoside arm by enzyme and phosphate donor.

## arabic_label
نظام إنقاذ البيورينات

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the source concept record (103-BMS-mcq-purine-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-purine-concepts.md
asuTeaching: ASU Year 1 Locomotor Biochemistry (Term 2) tests this exact fact in `MCQs - Biochemistry Locomotor MCQs - CA1.pdf` (manifest src_e4a23646b45bcc340c70); no ASU-specific variance from the source text found.

---

# Item

## id
CON-FND-6B7241CD9F3C42

## label
Cells do not store energy as ATP; creatine phosphate is the store, and the ATP–ADP cycle turns over in seconds

## definition
ATP is the product of catabolism and the fuel of anabolism, and it is what pays for mechanical work in muscle, electrical work in nerve, chemical work in biosynthesis and osmotic work in transport. The ATP a cell holds would keep it going for only a few seconds, so the ATP–ADP cycle turns over very fast and the cell does not store energy as ATP at all. Creatine phosphate is the major storage form of energy in muscle: in energy-rich states creatine kinase transfers the phosphate from ATP to creatine, and in energy-poor states the reaction runs the other way within two to seven seconds.

## explicit_objective
Name the storage form of high-energy phosphate in muscle, name the enzyme that makes and breaks it, and explain why ATP itself cannot be the store.

## arabic_label
دورة ATP-ADP وفوسفات الكرياتين كصورة تخزين الطاقة

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the source concept record (103-BMS-mcq-carbohydrate-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md
asuTeaching: ASU Year 1 Locomotor Biochemistry (Term 2) tests this exact fact in `MCQs - Biochemistry Locomotor MCQs - CA1.pdf` (manifest src_e4a23646b45bcc340c70); no ASU-specific variance from the source text found.
