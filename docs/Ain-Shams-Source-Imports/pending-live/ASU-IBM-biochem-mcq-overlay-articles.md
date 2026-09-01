<!--
  ASU-IBM · Biochemistry MCQ bank — pending-live sparse ARTICLE overlay
  (sibling ASU-IBM-biochem-mcq-overlay-concepts.md carries the concept half).

  Every ## id below targets an article that exists ONLY in an unimported batch
  from another lane. Two source files are involved:

    A. docs/Kasr-Source-Imports/article/102-INT-biochemistry.md — university
       `kau`, module `102 INT`.
    B. docs/Alexandria-Source-Imports/article/AU-MED-102-biochem-structural-articles.md
       — university `au`, module `AU-MED-102`.
    C. docs/Kasr-Source-Imports/article/101-ISK-histology-2.md — university
       `kau`, module `101 ISK` (Histology, not Biochemistry — see the sibling
       overlay-concepts.md file's Target C note).

  Per the article manual (04-library-articles.md): every university on a
  shared article needs all five of its own tags — `universities`, `years`,
  `module`, `module_subject`, `university_notes`. `universities` / `years` /
  `module` are true ID-list columns and take `+asu` / `+ASU_Y1` / `+ASU-IBM`;
  `module_subject` and `university_notes` are re-parsed whole on every write
  (no `+` form) — restate the source's existing line(s) plus ASU's own. Every
  row restates `## title` verbatim.

  Every fact below is tested by `MCQs - Bg MCQ of bio.pdf` (sourceId
  src_659d23529471fd1ee6c6) only. Simulate together with the source file each
  block targets, e.g.:
  npm run medical:simulate -- "docs/Ain-Shams-Source-Imports/pending-live/ASU-IBM-biochem-mcq-overlay-articles.md" \
    --with docs/Kasr-Source-Imports/article/102-INT-biochemistry.md \
    --with docs/Alexandria-Source-Imports/article/AU-MED-102-biochem-structural-articles.md \
    --emit /tmp/sim-ASU-IBM-biochem-overlay-articles.json
-->

# Item

## id
ART-FND-AU-MED-102-PROTEIN-CHEMISTRY

## subject
fnd

## topic
Biomolecules

## title
Protein chemistry: amino acids to quaternary structure

## summary
Alexandria's Biochemistry department examines amino acids as a set of overlapping classification axes held at once — chemical group, charge, essentiality, ring type — and tests each axis with its own exception (glutamine among the basic amino acids, threonine among the branched-chain ones, tyrosine among the essential ones). The second half of the chapter moves from single amino acids to structure: which bonds hold which level of a protein together, what denaturation does and does not touch, and the specific amino-acid substitution behind sickle cell disease.

## sections

## universities
+asu

## years
+ASU_Y1

## module
+ASU-IBM

## module_subject
AU-MED-102 > Biochemistry > Protein Chemistry
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## university_notes
au: Every fact in this article is drawn from the Biochemistry department's own Protein MCQ bank and, where cross-cited, the AFM master bank; no department book or lecture text beyond these assessment sources teaches protein chemistry in this corpus. Several of this bank's items (biological value Q22/66/70, histones Q34, sulfhydryl-group Q38, disulfide-bonds Q58) print no key in the source's own answer list; those facts are taught here as standard, independently verifiable undergraduate biochemistry rather than as reliant on the unkeyed item, and no question is authored from them.
asu: Taught in the ASU-IBM Protein Chemistry question bank (`MCQs - Bg MCQ of bio.pdf`, src_659d23529471fd1ee6c6), pp.1-15 — glycine's optical inactivity, essential/non-essential and sulfur-containing amino acid classification, biological value, isoelectric-point charge behaviour, primary/secondary/tertiary/quaternary structure, peptide bond formation and glutathione.

## field_notes
arabicTitle: The permitted local ASU-IBM source is English-only; no reviewed Arabic title was available to add for this university.

---

# Item

## id
ART-FND-AU-MED-102-CHO-CHEMISTRY

## subject
fnd

## topic
Biomolecules

## title
Carbohydrate chemistry: monosaccharides to glycosaminoglycans

## summary
Alexandria's Biochemistry department examines carbohydrate chemistry as a set of naming and classification rules — which isomerism relates two sugars, which bond joins two monosaccharides, which polysaccharide is which — rather than as a narrative. This article states each rule once, with the exception the department's own question banks actually test alongside it: inulin is a homopolysaccharide but not a glucosan, sucrose is the one non-reducing disaccharide, and keratan sulfate is the glycosaminoglycan whose repeat unit lacks a uronic acid.

## sections

## universities
+asu

## years
+ASU_Y1

## module
+ASU-IBM

## module_subject
AU-MED-102 > Biochemistry > CHO Chemistry
ASU-IBM > Biochemistry > Questions > Carbohydrates

## university_notes
au: Every fact in this article is drawn from the Biochemistry department's own CHO Chemistry MCQ bank and the module's End-of-Module exam papers (see `evidence/AU-MED-102-biochemistry-resources.md`); no department book or lecture text was found to teach carbohydrate chemistry beyond these assessment sources — see `coverage/AU-MED-102-biochemistry-triage.md` §5 for the gap this leaves and §6 for the search against Kasr's own biochemistry batches, none of which teaches this specific structural-chemistry ground at the same granularity.
asu: Taught in the ASU-IBM Carbohydrates question bank (`MCQs - Bg MCQ of bio.pdf`, src_659d23529471fd1ee6c6), pp.18-19 — the specific alpha-1,2/alpha-1,4/beta-1,4 glycosidic linkage naming sucrose, maltose and lactose.

## field_notes
arabicTitle: The permitted local ASU-IBM source is English-only; no reviewed Arabic title was available to add for this university.

---

# Item

## id
ART-FND-AU-MED-102-LIPID-CHEMISTRY

## subject
fnd

## topic
Biomolecules

## title
Lipid chemistry: fatty acids to steroids

## summary
Alexandria's Biochemistry department examines lipid chemistry the same way it examines carbohydrate chemistry — by naming and exception. Which lipid is not a phospholipid, which fatty acid is essential, which compound is not amphipathic: each fact is a single, separately tested claim, most of them keyed to a specific number (27 carbons, omega-15, 7-dehydrocholesterol) or a specific exclusion (cerebroside is the glycolipid among the phospholipids; interleukins are the one substance not made from arachidonic acid).

## sections

## universities
+asu

## years
+ASU_Y1

## module
+ASU-IBM

## module_subject
AU-MED-102 > Biochemistry > Lipid Chemistry
ASU-IBM > Biochemistry > Questions > Lipids & Biological Membrane

## university_notes
au: Every fact in this article is drawn from the Biochemistry department's own Lipid Chemistry MCQ bank and, where cross-cited, the AFM master bank and the module's EOM exam papers (see `evidence/AU-MED-102-biochemistry-resources.md`); no department book or lecture text beyond these assessment sources teaches lipid chemistry in this corpus.
asu: Taught in the ASU-IBM Lipids & Biological Membrane question bank (`MCQs - Bg MCQ of bio.pdf`, src_659d23529471fd1ee6c6), pp.25 — arachidonic acid as the eicosanoid precursor and triacylglycerol as the adipose storage lipid.

## field_notes
arabicTitle: The permitted local ASU-IBM source is English-only; no reviewed Arabic title was available to add for this university.

---

# Item

## id
ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE

## subject
fnd

## topic
Biochemistry

## title
Proteins of biological importance

## summary
A protein has up to four orders of structure, and only the first is held together by peptide bonds. Denaturation breaks every bond above the first and leaves the peptide backbone untouched — which is why a denatured protein is easier to digest rather than already digested. Six effects follow from that one sentence, and the department marks them as a list.

## sections

## universities
+asu

## years
+ASU_Y1

## module
+ASU-IBM

## module_subject
102 INT > Biochemistry > Proteins of Biological Importance
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## university_notes
kau: The Medical Biochemistry Department set "Effects of denaturation of protein" as a two-mark enumerate question on the 2025 end-of-year paper, in a section where the student chooses two items from a longer list and enumerates each.
asu: Taught in the ASU-IBM Protein Chemistry question bank (`MCQs - Bg MCQ of bio.pdf`, src_659d23529471fd1ee6c6), pp.1-14 — denaturation's agents and effects, tertiary-structure bonding, secondary-structure (alpha-helix) formation and disruption, primary-structure/terminal-residue identification, and quaternary structure via haemoglobin.

## field_notes
arabicTitle: The permitted local ASU-IBM source is English-only; no reviewed Arabic title was available to add for this university.

---

# Item

## id
ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE

## subject
fnd

## topic
Biochemistry

## title
Amino acids of biological importance

## summary
Twenty amino acids build the body's proteins, and the department classifies them four separate ways: by chemical structure, by the polarity of the side chain, by whether the diet has to supply them, and by their metabolic fate. The examiner tests two of those axes at once, so a single amino acid has to be placed twice in one answer — glycine is neutral aliphatic and non-essential, lysine is basic aliphatic and essential. Hold the two lists apart in your head and the matching question answers itself.

## sections

## universities
+asu

## years
+ASU_Y1

## module
+ASU-IBM

## module_subject
102 INT > Biochemistry > Amino Acids of Biological Importance
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## university_notes
kau: The Medical Biochemistry Department set this chapter as a five-mark matching question on the 2025 end-of-year paper, pairing each of glycine, lysine, cystine, isoleucine and glutamate with a description that names both its chemical group and its nutritional group.
asu: Taught in the ASU-IBM Protein Chemistry question bank (`MCQs - Bg MCQ of bio.pdf`, src_659d23529471fd1ee6c6), pp.8,15 — the peptide-bond condensation mechanism.

## field_notes
arabicTitle: The permitted local ASU-IBM source is English-only; no reviewed Arabic title was available to add for this university.

---

# Item

## id
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE

## subject
fnd

## topic
Biochemistry

## title
Carbohydrates of biological importance

## summary
Two carbohydrates in this chapter do their job by not being metabolised. Cellulose is glucose joined the wrong way round for human amylase, so it never leaves the gut lumen and works as bulk. Glycosaminoglycans carry fixed negative charge, so they hold water into a gel that can be squeezed and springs back. Both answers are structural arguments, and both are marked as mechanisms rather than as lists.

## sections

## universities
+asu

## years
+ASU_Y1

## module
+ASU-IBM

## module_subject
102 INT > Biochemistry > Carbohydrates of Biological Importance
ASU-IBM > Biochemistry > Questions > Carbohydrates

## university_notes
kau: The 2025 end-of-year paper put two questions on this chapter — "Importance of cellulose" as a two-mark enumerate, and "GAGs have shock absorbing property" as a three-mark explain-the-biochemical-basis. The second is marked as a mechanism, so a list of GAG functions does not answer it.
asu: Taught in the ASU-IBM Carbohydrates question bank (`MCQs - Bg MCQ of bio.pdf`, src_659d23529471fd1ee6c6), pp.16-19 — monosaccharide/disaccharide classification, isomer terminology (enantiomer/anomer/epimer), and starch/glycogen as storage polysaccharides.

## field_notes
arabicTitle: The permitted local ASU-IBM source is English-only; no reviewed Arabic title was available to add for this university.

---

# Item

## id
ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES

## subject
fnd

## topic
Biochemistry

## title
Chemistry of free nucleotides

## summary
Nucleotides build DNA and RNA, but the free ones do four other jobs, and the department examines the fourth. Four nucleotide-derived coenzymes carry hydrogen: NAD+ and NADP+, which are nicotinamide dinucleotides, and FMN and FAD, which are flavins. Each has an oxidised and a reduced form, and naming both halves of the pair is what the question is actually asking for. Coenzyme A is the fifth nucleotide coenzyme and carries something else entirely.

## sections

## universities
+asu

## years
+ASU_Y1

## module
+ASU-IBM

## module_subject
102 INT > Biochemistry > Chemistry of Free Nucleotides
ASU-IBM > Biochemistry > Questions > Carbohydrates

## university_notes
kau: The 2025 end-of-year paper asked this chapter as a two-mark enumerate — "Nucleosides that act as a hydrogen carriers" — in the section where a student chooses two items from a longer list. The department book's own heading for the material is "Coenzymes Components", under "Free Nucleosides and Nucleotides".
asu: Taught in the ASU-IBM Carbohydrates question bank (`MCQs - Bg MCQ of bio.pdf`, src_659d23529471fd1ee6c6), p20 — the N-glycosidic bond linking a nitrogenous base to ribose in a nucleotide.

## field_notes
arabicTitle: The permitted local ASU-IBM source is English-only; no reviewed Arabic title was available to add for this university.

---

# Item

## id
ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE

## subject
fnd

## topic
Biochemistry

## title
Lipids of biological importance

## summary
One membrane phospholipid, one enzyme that cuts it, and everything downstream follows. Phospholipase A2 releases arachidonic acid, and where the acid goes next decides both the physiology and the pharmacology: prostaglandin H synthase makes the cyclic eicosanoids, lipoxygenase makes the acyclic ones. The same enzyme in snake venom, acting on a red cell instead of a signalling pathway, produces haemolysis. Three drug classes act at three separate points of that one diagram, and which point they act at is the whole examinable answer.

## sections

## universities
+asu

## years
+ASU_Y1

## module
+ASU-IBM

## module_subject
102 INT > Biochemistry > Lipids of Biological Importance
ASU-IBM > Biochemistry > Questions > Lipids & Biological Membrane

## university_notes
kau: The 2025 end-of-year paper put three questions on this chapter. "Snake venom is toxic" was a three-mark explain-the-biochemical-basis. The six-mark diagram question printed the eicosanoid synthesis pathway with three enzymes blanked and then asked, one mark each, how SAIDs and NSAIDs are anti-inflammatory and how the leukotriene receptor antagonist treats bronchial asthmatic attacks. The paper prints the drug as "Singular", where the department book prints "Singulair".
asu: Taught in the ASU-IBM Lipids & Biological Membrane question bank (`MCQs - Bg MCQ of bio.pdf`, src_659d23529471fd1ee6c6), pp.21-25,27,28 — essential fatty acids, cholesterol's derivatives, omega-3/omega-6/monoenoic fatty acid classification, sphingomyelin formation, phosphatidic acid as the glycerophospholipid precursor, lecithin/cephalin's respective nitrogenous bases (choline/ethanolamine), the wax-vs-neutral-fat alcohol distinction (monohydric alcohol vs glycerol), and phosphatidylinositol's signal-transduction role.

## field_notes
arabicTitle: The permitted local ASU-IBM source is English-only; no reviewed Arabic title was available to add for this university.

---

# Item

## id
ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS

## subject
fnd

## topic
Biochemistry

## title
Chemistry of haemoproteins

## summary
A haemoprotein is a protein with haem bound to it as a prosthetic group, and the chapter is built on two of them: myoglobin, one chain and one haem, and haemoglobin, four chains and four haems. The clinical test the department examines comes out of the same structure. Glucose binds the N-terminal valine of the β chain without any enzyme, so the amount of glycated haemoglobin measures how much glucose the red cell has met across its whole 120-day life — an average, not a reading.

## sections

## universities
+asu

## years
+ASU_Y1

## module
+ASU-IBM

## module_subject
102 INT > Biochemistry > Chemistry of Hemoproteins
ASU-IBM > Biochemistry > Questions > Protein Chemistry

## university_notes
kau: The 2025 end-of-year paper asked this chapter as a three-mark explain-the-biochemical-basis question — "HbA1c is used as a test to determine the diabetic control of the patients during the last 3 months" — which quotes the department book's own sentence back at the student and marks the mechanism behind it rather than the sentence itself.
asu: Taught in the ASU-IBM Protein Chemistry question bank (`MCQs - Bg MCQ of bio.pdf`, src_659d23529471fd1ee6c6), pp.9,13 — the four-chain (alpha2-beta2) quaternary structure of haemoglobin.

## field_notes
arabicTitle: The permitted local ASU-IBM source is English-only; no reviewed Arabic title was available to add for this university.

---

# Item

## id
ART-101-HIS-THE-CELL

## subject
fnd

## topic
Cytology

## title
The cell and its plasma membrane

## summary
Almost every question filed on this leaf is a cell membrane question, and almost every one turns on a side: the carbohydrate coat is on the outside and the cytoskeleton is on the inside, integral proteins cross the bilayer and peripheral proteins rest on a face, the phospholipid heads face out and the tails face in. Learn the membrane as a structure with two distinguishable surfaces and the thickness, the stains, the receptors and the three kinds of endocytosis all follow.

## sections

## universities
+asu

## years
+ASU_Y1

## module
+ASU-IBM

## module_subject
101 ISK > Histology > Cytology > The cell
ASU-IBM > Biochemistry > Questions > Lipids & Biological Membrane

## university_notes
asu: Taught in the ASU-IBM Lipids & Biological Membrane question bank (`MCQs - Bg MCQ of bio.pdf`, src_659d23529471fd1ee6c6), p22 — the cell membrane's composition of structural lipids, proteins and a small amount of carbohydrate (the fluid mosaic model), reused from Kasr's Histology cytology chapter rather than re-minted as a Biochemistry-specific fact.

## field_notes
arabicTitle: The permitted local ASU-IBM source is English-only; no reviewed Arabic title was available to add for this university.
