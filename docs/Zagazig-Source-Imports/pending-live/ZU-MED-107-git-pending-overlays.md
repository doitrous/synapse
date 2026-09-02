<!--
  ZU-MED-107 (GIT and Nutrition) — 11 sparse PENDING-LIVE concept overlays.

  Every ## id below targets a concept that exists ONLY in another lane's
  unimported batch — none is in server/data/medical-library-v1.json yet
  (checked directly against the live JSON). Apply this file ONLY after the
  named source file is live. See INDEX.md for the per-target apply-after
  list and simulate command.

  Per 00-START-HERE.md §4 ("A hit only in another lane's unimported batch →
  the same sparse update, written into <import root>/pending-live/<slug>.md")
  — same logic ZU-MED-106's pending-live overlay file applied. Most targets
  are Kasr's `103-BMS` biochemistry batch (docs/Kasr-Source-Imports/concept/
  103-BMS-*-concepts.md); one is Alexandria's AU-MED-103, one is Mansoura's
  MANS-HIS-203.

  `## label` restates the target's own live-record label verbatim (required
  discriminator). `## universities`/`## modules` are true ID-list columns —
  `+zu`/`+ZU-MED-107`, safe appends. `## module_subject` is a full-replacement
  path list (00-START-HERE.md §3) — every row restates the target's existing
  path plus ZU's own new line, ZU's own line listed first (same reasoning as
  ZU-MED-106's pending-overlay file: `gate.mjs batch` only checks
  `module_subject`'s very first segment against the modules this row
  *locally* declares). `## learner_years` is a plain-number ID-list field,
  already `1` on every target below (Year 1 on every source lane), so no
  addition is needed there.
-->

# Item

## id
CON-FND-D8A41B5C23B148

## label
Hydrogen peroxide is disposed of by catalase and by glutathione peroxidase, and the glutathione route runs on NADPH

## universities
+zu

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Antioxidant enzymes
103 BMS > Biochemistry > Free Radicals and Antioxidants

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q3, "Which of the following statements is true concerning peroxidase enzyme? d. It prevents the process of initiation of free radicals" (hand-drawn-ink key). Same underlying disposal-mechanism idea (catalase splits H2O2 into water and oxygen without needing a hydrogen donor, removing the substrate for radical initiation before it forms) tested from the mechanism-and-consequence angle rather than the two-route-disposal angle the live label states; close enough in scope (one record could answer both without becoming two stapled paragraphs) to overlay rather than mint a second record. Found by `find-existing.mjs "peroxidase"`.

---

# Item

## id
CON-FND-229C78C9EB0E78

## label
Pyruvate dehydrogenase is irreversible and needs five coenzymes, of which thiamine pyrophosphate is the one that fails first

## universities
+zu

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Carbohydrate metabolism
103 BMS > Biochemistry > Carbohydrate Metabolism

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q4, clinical vignette — alcoholic patient given thiamine then glucose; "Which of the following enzymes is thiamine-dependent and essential for glucose oxidation in the brain?" (answer: Pyruvate dehydrogenase, hand-drawn-ink key). Direct match — the live concept's own label states pyruvate dehydrogenase's thiamine-pyrophosphate dependence exactly. Found by `find-existing.mjs "pyruvate dehydrogenase"`.

---

# Item

## id
CON-FND-B928DE79E08882

## label
The hexose monophosphate pathway is the main source of NADPH, and its oxidative phase is irreversible

## universities
+zu

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Carbohydrate metabolism
103 BMS > Biochemistry > Carbohydrate Metabolism

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q5, "Hexose monophosphate pathway (HMP) is an important pathway in glucose metabolism. Which of the following statement is true? b. HMP is active in liver" (hand-drawn-ink key). Direct match — the live concept's own definition already names liver among the tissues running this pathway. Found by `find-existing.mjs "hexose monophosphate"`.

---

# Item

## id
CON-HEM-8F2329AD7AF440

## label
ALA synthase is the mitochondrial, rate-limiting enzyme that catalyses the first step of haem synthesis

## universities
+zu

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Haem synthesis
MANS-HIS-203 > Histology > Haem Synthesis

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7). Three SBA items on this one paper all land on this concept: Q6, "What is the key regulatory enzyme in hemoglobin synthesis?" (answer: delta-amino levulinic acid synthase, hand-drawn-ink key) — direct match to the live label. Q9, "Along with succinyl CoA which of the following amino acid serve as starting material in heme synthesis?" (answer: Glycine, hand-drawn-ink key) — direct match, the live definition names "condenses glycine with succinyl-CoA" explicitly. Q13, "Which out of the following enzymes catalyze the incorporation of ferrous ion into protoporphyrin III?" (answer: Ferrochelatase, hand-drawn-ink key; the paper's own stem prints "III", almost certainly a typo for the true substrate protoporphyrin IX — kept as printed in the question, per source fidelity) — the live definition's own text ("ferrochelatase's insertion of iron into protoporphyrin IX") covers this fact too, distinguishing it from ALA synthase (first step) as the pitfalls field already does. All three questions test different sentences of the same one paragraph; overlay, not three separate concepts. Found by `find-existing.mjs "ALA synthase"` (Q6/Q9) and `find-existing.mjs "heme synthesis"` (Q13, via a Mansoura pending-live row referencing the same concept).

---

# Item

## id
CON-FND-EA1BA37ACB643B

## label
Hexokinase has a low Km and works everywhere; glucokinase has a high Km, sits in liver and β-cells, and is induced by insulin

## universities
+zu

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Carbohydrate metabolism
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q12, "Which of the following is the true statement concerning glucokinase? c. Has a higher km for glucose than does hexokinase" (hand-drawn-ink key). Direct match — the live concept's own label states exactly this Km contrast. Found by `find-existing.mjs "glucokinase"`.

---

# Item

## id
CON-FND-1BE461A57AB76D

## label
Von Gierke's disease is glucose 6-phosphatase deficiency, and every feature follows from glucose 6-phosphate that cannot be dephosphorylated

## universities
+zu

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Glycogen storage disease
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q14, "Which one of the following enzymes is deficient in Von Gierke's disease? a. Glucose-6-phosphatase" (hand-drawn-ink key). Direct match. Found by `find-existing.mjs "von Gierke"`.

---

# Item

## id
CON-FND-0189D5EC600BC7

## label
Debranching enzyme removes the last glucose at a branch point by hydrolysis, the one step glycogen phosphorylase cannot do

## universities
+zu

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Glycogen metabolism
AU-MED-103 > Biochemistry > Carbohydrate Metabolism

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q16, "During glycogenolysis, free glucose is produced by which of the following? b. Debranching enzyme" (hand-drawn-ink key). Direct match — the live label already states this is the one step glycogen phosphorylase cannot do (releasing free glucose at a branch point), exactly what ZU's question tests. Found by `find-existing.mjs "debranching enzyme"`.

---

# Item

## id
CON-FND-45DCF7CE171F0B

## label
Glutamate dehydrogenase does the deamination that matters; L-amino acid oxidase is a low-activity liver and kidney enzyme

## universities
+zu

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Amino acid metabolism
103 BMS > Biochemistry > Nitrogen Metabolism

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q17, "L-Glutamate dehydrogenase is an enzyme for deamination reaction. Which of the following is a character of this reaction? a. Produce ammonia and alpha-keto glutaric acid" (hand-drawn-ink key). Direct match — glutamate dehydrogenase's deamination product (ammonia + alpha-ketoglutarate) is the physiological product the live concept identifies this enzyme by. Found by `find-existing.mjs "glutamate dehydrogenase"`.

---

# Item

## id
CON-FND-3806EF570B0A1C

## label
Ammonia and aspartate donate the two nitrogen atoms of urea, three ATP pay for one turn, and N-acetylglutamate is what commits carbamoyl phosphate synthetase I

## universities
+zu

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Urea cycle
103 BMS > Biochemistry > Nitrogen Metabolism > Urea Cycle

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q18, "Which one of the following is the rate-limiting enzyme in Urea cycle? c. Carbonyl phosphate synthase I" (hand-drawn-ink key; the paper's own stem/option print "Carbonyl", almost certainly a typo for "Carbamoyl" — kept as printed in the question, per source fidelity). Direct match — the live concept's own label names carbamoyl phosphate synthetase I as the enzyme N-acetylglutamate commits, i.e. the rate-limiting/committed step ZU's question tests. Found by `find-existing.mjs "N-acetylglutamate"` after an exact-spelling search on "carbamoyl phosphate synthase" (matching the printed stem) returned nothing.

---

# Item

## id
CON-GIT-6CB618DBA50596

## label
Lipoprotein lipase empties triacylglycerol-rich particles at the capillary wall; apo C-II activates it, insulin induces it, and heparin displaces it

## universities
+zu

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Lipid metabolism
103 BMS > Biochemistry > Lipid Metabolism

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q19, "Lipoprotein lipase secreted post-prandial helping digestion of lipids. This enzyme is characterized by which of the following? d. Hydrolyses TAG in chylomicrons" (hand-drawn-ink key). Direct match — the live concept's own label states this enzyme empties triacylglycerol-rich particles (chylomicrons among them) at the capillary wall. Found by `find-existing.mjs "lipoprotein lipase"`.

---

# Item

## id
CON-FND-880D165894A5EC

## label
Ammonia travels as glutamine from brain and as alanine from muscle, and it injures the brain three ways when the liver cannot clear it

## universities
+zu

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Amino acid metabolism
103 BMS > Biochemistry > Nitrogen Metabolism

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q7, "Ammonia (NH3) is detoxified in the brain in the form of which of the following? b. Glutamine" (hand-drawn-ink key). Direct match — the live concept's own label states ammonia travels as glutamine from brain exactly. Found by `find-existing.mjs "glutamine"`.
