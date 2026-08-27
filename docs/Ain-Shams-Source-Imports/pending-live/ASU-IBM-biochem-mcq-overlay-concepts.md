<!--
  ASU-IBM · Biochemistry MCQ bank — pending-live sparse CONCEPT overlay
  (sibling ASU-IBM-biochem-mcq-overlay-articles.md carries the article half;
  kept apart because detectKind reads only the first record in a file).

  Every ## id below targets a concept that exists ONLY in an unimported batch
  from another lane — none is in server/data/medical-library-v1.json yet
  (checked directly against the live JSON, not just via find-existing.mjs).
  Apply this file ONLY after the named source file is live. Two source files
  are involved, both the same "Biochemistry Academy"-style external question
  bank that clearly circulates across universities as the corpus itself (see
  coverage/ASU-IBM-triage.md):

    A. docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md — university
       `kau`, module `102 INT`.
    B. docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md
       — university `au`, module `AU-MED-102`.

  Each record below names which one (A/B) it targets. Per LANE-BRIEF §6 rule
  1/2 and the concepts manual (`## module_subject` fully replaces on every
  write — no `+` form): every row restates `## label` verbatim; `module_subject`
  restates the source's existing line(s) plus ASU's own. `## universities`,
  `## learner_years` and `## modules` are true ID-list columns and take
  `+asu` / `+1` / `+ASU-IBM`. Concepts have no `university_notes` column — the
  ASU source note goes in `field_notes` instead, per the manual.

  Every fact below is tested by `MCQs - Bg MCQ of bio.pdf` (sourceId
  src_659d23529471fd1ee6c6) only — Protein Chemistry pp.1-15, Carbohydrates
  pp.16-20, Lipids & Biological Membrane pp.21-28. Page numbers below are the
  PDF's own printed page numbers.

  Simulate together with the source file each block targets, e.g.:
  npm run medical:simulate -- "docs/Ain-Shams-Source-Imports/pending-live/ASU-IBM-biochem-mcq-overlay-concepts.md" \
    --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md \
    --emit /tmp/sim-ASU-IBM-biochem-overlay-concepts.json
-->

# Item

## id
CON-FND-3FF9CA93465562

## label
Glycine is the one amino acid with no asymmetric carbon, making it optically inactive and the shortest amino acid

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p1

## field_notes
asu: Tested as Q1, "All amino acids have enantiomer except" (answer: glycine), p1 of the ASU-IBM Protein Chemistry bank. Target B.

---

# Item

## id
CON-FND-2414B3639FD4D3

## label
Denaturation ruptures the bonds holding secondary, tertiary and quaternary structure, leaving the primary sequence intact but the protein insoluble, more viscous, more digestible and biologically dead

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p1-11

## field_notes
asu: The bank's single most repeated theme — tested from every angle across Q6, Q9, Q41, Q65, Q67, Q71, Q72, Q77 and Q91 (agents that do/don't cause it, what survives it, what results from it), pp.1-11 of the ASU-IBM Protein Chemistry bank. Target A.

---

# Item

## id
CON-FND-9F8AE7C57AFBA8

## label
Tertiary structure folds a polypeptide chain into a specific 3D globular shape, held by hydrophobic interactions between nonpolar side chains, electrostatic bonds between oppositely charged side chains, disulfide bonds between cysteines, hydrogen bonds involving hydroxyl/amide/carboxylic/ring-nitrogen groups, and weak Van der Waals interactions

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p1

## field_notes
asu: Tested as Q7 ("most important covalent bond that stabilizes tertiary structure" = disulfide bond) and Q35/Q60/Q73 (non-covalent bonds driving folding/2nd-3rd-quaternary structure = hydrogen, hydrophobic, ionic, van der Waals, never peptide bonds), pp.1,5,8,10 of the ASU-IBM Protein Chemistry bank. Target A.

---

# Item

## id
CON-FND-71648230D1D4E2

## label
An essential amino acid cannot be synthesised by the body and must come from the diet; tyrosine is non-essential (made from phenylalanine) despite resembling the essential aromatics

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p3-7

## field_notes
asu: Tested as Q19, Q28, Q30, Q46 and Q84 (naming essential vs non-essential amino acids from both directions), pp.3-7 of the ASU-IBM Protein Chemistry bank. Target B.

---

# Item

## id
CON-FND-8CF5D9C1E7D8B7

## label
Casein and albumin are proteins of high biological value; zein is low, largely because of its tryptophan deficiency

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p4-5

## field_notes
asu: Tested as Q29, Q31 and Q59 (naming high/low biological value dietary proteins), pp.4-5 of the ASU-IBM Protein Chemistry bank. Target B.

---

# Item

## id
CON-FND-73F58D943BB03B

## label
At its isoelectric point, an amino acid or protein carries zero net charge, shows maximum precipitability and minimum electrophoretic mobility

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p5-11

## field_notes
asu: Tested as Q32/Q57/Q78 (charge state and precipitability at pI) and Q33/Q34/Q81 (charge and migration direction above/below pI), pp.5-11 of the ASU-IBM Protein Chemistry bank. Target B.

---

# Item

## id
CON-FND-99CEF760A9D2CC

## label
Secondary structure is mainly α-helix or β-pleated sheet; the α-helix coils the chain along its long axis and is held by intra-chain hydrogen bonds between NH and C=O of different peptide bonds, with R-groups projecting outward, and is disrupted by ionic-bond-forming or ring-structure side chains — while collagen forms its own left-handed helix rather than the ordinary right-handed one

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p2-9

## field_notes
asu: Tested as Q8 (proline disrupts alpha helix), Q14, Q37, Q60 and Q61 (what stabilises/exemplifies secondary structure), pp.2-9 of the ASU-IBM Protein Chemistry bank. Target A.

---

# Item

## id
CON-FND-BE919386760579

## label
Primary structure is the amino acid sequence held together by peptide bonds, running from an N-terminus amino acid on the left to a C-terminus amino acid on the right, synthesized in that same N-to-C direction, and it is the first of the four orders that the higher orders are built from

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p11-14

## field_notes
asu: Tested as Q89 (primary structure = amino acid sequence) and Q11/Q80/Q95/Q101 (N-terminal/C-terminal identification in a peptide/tripeptide), pp.11-14 of the ASU-IBM Protein Chemistry bank. Target A.

---

# Item

## id
CON-FND-B97BF0F6CCF322

## label
Cysteine, methionine and homocysteine are sulfur-containing amino acids; of these, methionine alone is essential

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p2-13

## field_notes
asu: Tested as Q12, Q26, Q50, Q70 and Q92 (identifying the sulfhydryl/sulfur-containing amino acids), pp.2-13 of the ASU-IBM Protein Chemistry bank. Target B.

---

# Item

## id
CON-HEM-B9017F150AF212

## label
Myoglobin is one heme on one 153-residue chain while hemoglobin is four hemes on four chains (two 141-residue alpha, two 146-residue beta), so the two proteins share the same globular tertiary fold but never the same primary structure

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p9-13

## field_notes
asu: Tested as Q63 and Q94 (the four-subunit alpha2-beta2 structure of Hb represents quaternary structure), pp.9,13 of the ASU-IBM Protein Chemistry bank. Target A.

---

# Item

## id
CON-FND-7C8A02831B3243

## label
A peptide bond forms by condensation of the carboxylic group of one amino acid with the amino group of the next, releasing one molecule of water

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p8-15

## field_notes
asu: Tested as Q58 (peptide bond formation removes H2O) and Q104 (the diagram process is condensation), pp.8,15 of the ASU-IBM Protein Chemistry bank. Target A.

---

# Item

## id
CON-FND-E2CB20749CB547

## label
Glutathione is the tripeptide glutamate-cysteine-glycine, and its active group is cysteine's sulfhydryl

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p6-15

## field_notes
asu: Tested as Q39, Q55 and Q105 (glutathione's tripeptide composition, N-/C-terminal residues, structural diagram), pp.6,8,15 of the ASU-IBM Protein Chemistry bank. Target B.

---

# Item

## id
CON-FND-ABEA43BF07B408

## label
Monosaccharides are classed as aldoses or ketoses by their carbonyl group, and as trioses through hexoses by carbon count, with glyceraldehyde as the aldose precursor and dihydroxyacetone as the simplest ketose

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Carbohydrates

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p17-19

## field_notes
asu: Tested as Q10/Q11 (triose/pentose identification), Q19/Q27/Q29 (keto-triose/keto-hexose identification: fructose), Q35 (minimum 3 carbons) and Q38 (glucose/fructose isomerism is aldose-vs-ketose), pp.17-19 of the ASU-IBM Carbohydrates bank. Target A.

---

# Item

## id
CON-FND-FC888FB7A7D8A8

## label
Maltose, lactose and sucrose are distinguished by their component monosaccharides, their glycosidic linkage, and whether a free carbonyl group survives to make them reducing sugars

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Carbohydrates

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p16-20

## field_notes
asu: Tested as Q1/Q2 (sucrose/lactose properties), Q3 (glycosidic bond definition), Q8 (reducing sugars) and Q36 (O-glycosidic linkage joins disaccharide units), pp.16,20 of the ASU-IBM Carbohydrates bank. Target A.

---

# Item

## id
CON-FND-C672878EA48528

## label
The base attaches to the pentose by an N-glycosidic bond, phosphate esterifies to the pentose's 5' carbon, and only DNA nucleotides use 2-deoxyribose in place of ribose

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Carbohydrates

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p20

## field_notes
asu: Tested as Q39 (the bond between ribose and the non-sugar base in a nucleotide is N-glycosidic), p20 of the ASU-IBM Carbohydrates bank. Target A.

---

# Item

## id
CON-FND-02FBBE4CD4CAC1

## label
The three common disaccharides are told apart by their two component sugars and their linkage: maltose is glucose+glucose by alpha-1,4; lactose is galactose+glucose by beta-1,4; sucrose is glucose+fructose by alpha-1,2 (=beta-2,1)

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Carbohydrates

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p18-19

## field_notes
asu: Tested as Q20/Q21/Q22 (component sugars of sucrose/maltose/lactose) and Q23/Q30/Q31/Q32 (the specific alpha-1,2/alpha-1,4/beta-1,4 linkage of each), pp.18-19 of the ASU-IBM Carbohydrates bank. Target B.

---

# Item

## id
CON-FND-4706C1246E4B76

## label
Starch is the storage polysaccharide of chlorophyll-containing plants and glycogen the storage polysaccharide of animals, both branched or unbranched polymers of D-glucose linked by alpha1,4 (and, where branched, alpha1,6) glucosidic bonds

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Carbohydrates

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p17-19

## field_notes
asu: Tested as Q13 (linear homopolysaccharide = cellulose), Q14 (highly branched homopolysaccharide = glycogen) and Q34 (glycogen is a polysaccharide, not a glycolipid/protein/fat store), pp.17,19 of the ASU-IBM Carbohydrates bank. Target A.

---

# Item

## id
CON-FND-358E18A31D89FC

## label
Monosaccharides related to each other show four distinct kinds of isomerism — enantiomers, anomers, epimers and functional-group (aldose-ketose) isomers

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Carbohydrates

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p16-19

## field_notes
asu: Tested as Q4 (isomer types overview), Q6 (galactose/glucose = epimers), Q15/Q16/Q17 (epimer vs anomer terminology by carbon position) and Q24/Q25/Q26 (D/L-glucose = enantiomers; alpha/beta-glucose = anomers; glucose/galactose = epimers), pp.16-19 of the ASU-IBM Carbohydrates bank. Target A.

---

# Item

## id
CON-FND-D0969A4C2C03CE

## label
Essential fatty acids — α-linolenic and linoleic acid, plus arachidonic acid when linoleic is absent — cannot be made by the body and must come from the diet; their deficiency is rare but causes dermatitis, fatty liver and growth retardation

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Lipids & Biological Membrane

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p25

## field_notes
asu: Tested as Q33 (all are non-essential fatty acids except linoleic), p25 of the ASU-IBM Lipids & Biological Membrane bank. Target A.

---

# Item

## id
CON-FND-6356E5CF325B76

## label
Prostaglandins, thromboxanes and lipoxins are synthesised from arachidonic acid; interleukins are not

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Lipids & Biological Membrane

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p25

## field_notes
asu: Tested as Q34 (precursor of prostaglandins = arachidonic acid), p25 of the ASU-IBM Lipids & Biological Membrane bank. Target B.

---

# Item

## id
CON-FND-E77FD4A4D78884

## label
Cholesterol matters because almost nothing else can be made without it — the bile acids, every steroid hormone and vitamin D3 all come from it, and it is the constituent that controls the fluidity of the cell membrane

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Lipids & Biological Membrane

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p21-25

## field_notes
asu: Tested as Q2 and Q10 (cholesterol is the precursor of steroid hormones/bile acids/vitamin D, but not of glycerol) and Q35 (cholesterol is a precursor for all except triacylglycerol), pp.21,22,25 of the ASU-IBM Lipids & Biological Membrane bank. Target A.

---

# Item

## id
CON-FND-A143E2775DED7A

## label
Triacylglycerol, not phospholipid, cholesterol or sphingolipid, is the major fat stored in adipose tissue

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Lipids & Biological Membrane

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p25

## field_notes
asu: Tested as Q36 (storage form of lipid = triacylglycerol), p25 of the ASU-IBM Lipids & Biological Membrane bank. Target B.

---

# Item

## id
CON-FND-1DFF2BB6521B64

## label
Cis fatty acids split into monoenoic (one double bond, e.g. oleic acid) and polyenoic/PUFA (more than one, the ω3 family such as α-linolenic acid and the ω6 family such as linoleic and arachidonic acid, the last of which carries four double bonds)

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Lipids & Biological Membrane

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p21-28

## field_notes
asu: Tested as Q5/Q57 (linoleic acid = parent of omega-6 family), Q21/Q29/Q30/Q31/Q32/Q37 (di-/tri-/tetra-enoic and monoenoic fatty acid identification), and Q27/Q56 (alpha-linolenic acid = omega-3 fatty acid), pp.21-24,28 of the ASU-IBM Lipids & Biological Membrane bank. Target A.

---

# Item

## id
CON-FND-268703EAF31C9D

## label
Fatty acid joins sphingosine by an amide bond to form ceramide, and ceramide joined to phosphocholine forms sphingomyelin — a phospholipid found in the cell membranes of lung and brain, mainly the myelin sheath

## universities
+asu

## learner_years
+1

## modules
+ASU-IBM

## module_subject
ASU-IBM > Biochemistry > Questions > Lipids & Biological Membrane

## exam_signal
src_659d23529471fd1ee6c6 | mcq_bank | | p21-25

## field_notes
asu: Tested as Q4 (sphingomyelin is not a glycerophospholipid), Q11 (major surfactant component contrast) and Q38 (sphingomyelin is the sphingo-phospholipid, distinct from the glycerophospholipids), pp.21,22,25 of the ASU-IBM Lipids & Biological Membrane bank. Target A.

---

