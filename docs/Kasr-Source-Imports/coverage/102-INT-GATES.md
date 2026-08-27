# 102 INT — gate ledger

This lane (article-coverage) does not commit; the file records the two-sided
coverage rewiring pass done against the working tree, HEAD `ea6b17d`, on
2026-08-23. This is a shared worktree; other lanes' uncommitted edits to
`103-BMS-*` and `101-ISK-histology*` files are present in the tree but
untouched by this pass.

## Two-sided coverage (2026-08-23)

Rule (from `HANDOFF.md`, 2026-08-23 01:30): a tested concept counts as
covered only when an article names it back in `related_concepts` — a
concept-side `article_ids` written by `build-article-links.ts` heuristics is
not coverage on its own. Measured with
`python3 scripts/kasr/check-two-sided-coverage.py "102 INT" --list`.

**Before this pass:** tested 164 | two-sided 48 | concept-side only 99 |
article-side only 17 | no link 0.
**After this pass:** tested 164 | two-sided 147 | concept-side only 0 |
article-side only 17 | no link 0.

The 99 concept-side-only rows were closed by reading each concept's own
`article_ids` suggestion (an existing chapter article in
`article/102-INT-biochemistry.md`, `-physiology.md` or
`-physiology-blood-ans.md` — none needed a new article; the nine
`102-INT-coverage.md` articles and the `ART-102-BIO-REGULATION-OF-GENE-
EXPRESSION` article were already fully wired to their 9+17 concepts by the
prior session), confirming the article's own `sections` text actually
teaches the fact, and adding the concept id to that article's
`related_concepts`. Six concepts carried more than one candidate article; a
text-match check on the candidate articles' `sections` field found four of
those six had one accurate target and one spurious one (the label's specific
fact — a normal RBC count, pelvic splanchnic outflow, sympathetic fibres to
the abdomen, ganglionic nicotinic receptors — was present in only one
candidate); the spurious link was not added. Detail in the "99 previously
concept-side-only" table below.

The remaining 17 (`article-side only`) are **not** closeable from the
article side: they were minted by the 2022-sitting concept batch with an
empty `article_ids` column (concept files are generated — this lane does not
edit them), so even though `102-INT-coverage.md`'s eight supplement articles
already name all 17 back correctly, the union check still shows
concept-side-empty. Two further concepts
(`CON-HEM-BDED630BBC87A3`, `CON-HEM-7F0EF6B0D6F2FB`) are two-sided already
(both carry a live article on `article_ids` via an update row) but the MCQ
rows testing them have a stale `library_ids` that doesn't include the newly
`+`-added article. All 19 are leaf-regeneration items for the orchestrator,
listed in the second table below with the exact question/written row each
touches.

### 99 previously concept-side-only — now two-sided

| Concept id | Label (truncated) | Article now naming it back | Verification |
|---|---|---|---|
| CON-FND-028C50A610B2A2 | Km is the substrate concentration that gives half the maximal velocity | ART-102-BIO-ENZYMES | verified (chapter-matched) |
| CON-FND-08650B3DDFE948 | Plasmalogens resemble lecithin and cephalin but carry a fatty alcohol  | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-0958D1436FD2E7 | Phosphatidylinositol acts as a second messenger to many chemical trans | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-1DFF2BB6521B64 | Cis fatty acids split into monoenoic (one double bond, e.g. oleic acid | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-21029C98FEA19F | Hydrolysis breaks a nucleotide down to a nucleoside plus phosphate, an | ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES | verified (chapter-matched) |
| CON-FND-25E8976EFF0509 | Base substitutions are transitions (purine for purine, or pyrimidine f | ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION | verified (chapter-matched) |
| CON-FND-268703EAF31C9D | Fatty acid joins sphingosine by an amide bond to form ceramide, and ce | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-2BD334DFDAE34C | Monosaccharides form five kinds of derivative — sugar acids, sugar alc | ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-30D2E317144DDF | Lipids are classified by composition into simple lipids (fatty acid +  | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-31F96EC2F609C9 | Collagen and elastin share hydroxyproline residues, but differ in near | ART-102-BIO-PROTEINS-OF-EXTRACELLULAR-MATRIX | verified (chapter-matched) |
| CON-FND-327EF635E45CB6 | By side-chain polarity, amino acids fall into nonpolar/hydrophobic, un | ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-32A72B4F49EC2B | The cell cycle divides into G1, S, G2 and M phases of active division, | ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES | verified (removed spurious 2nd link) |
| CON-FND-358E18A31D89FC | Monosaccharides related to each other show four distinct kinds of isom | ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-3660CDEFA054C3 | Histones are lysine- and arginine-rich basic proteins that condense DN | ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS | verified (chapter-matched) |
| CON-FND-38F8E2264D46B1 | Mannitol is the sugar alcohol of mannose, and because the body neither | ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-4128FE1AD6819C | Carbohydrates are classified by their hydrolysis products into monosac | ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-42EE1863F04920 | Irreversible inhibitors permanently disable an enzyme, either by block | ART-102-BIO-ENZYMES | verified (chapter-matched) |
| CON-FND-46D33A24F4AE03 | mRNA editing changes the coding information of an mRNA after transcrip | ART-102-BIO-RNA-SYNTHESIS-TRANSCRIPTION | verified (chapter-matched) |
| CON-FND-4706C1246E4B76 | Starch is the storage polysaccharide of chlorophyll-containing plants  | ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-47766D8DAC7503 | Eukaryotic chromosomes replicate from many AT-rich origins at once, ea | ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR | verified (chapter-matched) |
| CON-FND-4DCC3E30FD4C86 | The tRNA cloverleaf has four named arms plus an extra arm, each with i | ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS | verified (chapter-matched) |
| CON-FND-4EA3F93C091334 | By metabolic fate amino acids are pure glucogenic (most of them), pure | ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-5846431203789F | The enzyme's active site catalyses the reaction by lowering the activa | ART-102-BIO-ENZYMES | verified (chapter-matched) |
| CON-FND-5C05062976F311 | Amino acids are classified four ways — chemical, polar/non-polar, nutr | ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-5C3202473D16EA | Glycolipids — ceramide joined to a carbohydrate, including cerebroside | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-6A58FA1680290F | Reversible phosphorylation/dephosphorylation is a covalent modificatio | ART-102-BIO-ENZYMES | verified (chapter-matched) |
| CON-FND-6BBAC69900B22F | Allosteric effectors bind a site distinct from the catalytic site and  | ART-102-BIO-ENZYMES | verified (chapter-matched) |
| CON-FND-70E5BD77E8FE49 | Caspases are cysteine proteases activated by two apoptotic pathways —  | ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES | verified (chapter-matched) |
| CON-FND-75C487BD0973FA | DNA polymerases cannot begin synthesizing a new strand without a short | ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR | verified (chapter-matched) |
| CON-FND-7C8A02831B3243 | A peptide bond forms by condensation of the carboxylic group of one am | ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-81A17C5BF7ED85 | A replication fork is made by two proteins working together — helicase | ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR | verified (chapter-matched) |
| CON-FND-837C223B0C4E69 | Trimming removes a segment from an inactive protein precursor by prote | ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION | verified (chapter-matched) |
| CON-FND-889417DDD8A661 | Amino acids are amphoteric — positively charged in acid, negatively ch | ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-89278C7DEE1C9C | Translation requires all three RNA classes, activated amino acids, ene | ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION | verified (chapter-matched) |
| CON-FND-89C28B312B15FC | Proteins in their native state are three-dimensional; a protein built  | ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-96FF52D15F67AE | Collagen synthesis hydroxylates some proline and lysine residues using | ART-102-BIO-PROTEINS-OF-EXTRACELLULAR-MATRIX | verified (chapter-matched) |
| CON-FND-99CEF760A9D2CC | Secondary structure is mainly α-helix or β-pleated sheet; the α-helix  | ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-9A1437CD0A382C | Elongation is a 3-step cycle — aminoacyl-tRNA binds the A site, peptid | ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION | verified (chapter-matched) |
| CON-FND-9F8AE7C57AFBA8 | Tertiary structure folds a polypeptide chain into a specific 3D globul | ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-A37A5AA8733ACE | Proteins are high molecular weight organic compounds built from 20 ami | ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-A5CFD23270ACE3 | DNA replication is semi-conservative: each daughter molecule keeps one | ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR | verified (chapter-matched) |
| CON-FND-A734203535EAA1 | Of the three nuclear RNA polymerases, I and III mainly make rRNA and t | ART-102-BIO-RNA-SYNTHESIS-TRANSCRIPTION | verified (chapter-matched) |
| CON-FND-ABEA43BF07B408 | Monosaccharides are classed as aldoses or ketoses by their carbonyl gr | ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-ADBBD5E030ECA6 | Telomeres are the repetitive TTAGGG sequence and protective loop at ch | ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR | verified (chapter-matched) |
| CON-FND-B66BA480F8FD19 | Apoptosis is programmed, genetically directed cell death that eliminat | ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES | verified (chapter-matched) |
| CON-FND-BA7E60E9E6800B | Enzymes are protein biocatalysts, produced by living cells, needed in  | ART-102-BIO-ENZYMES | verified (chapter-matched) |
| CON-FND-BDF683EF5CD960 | mRNA (~5% of cellular RNA) carries the codon sequence read during tran | ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS | verified (chapter-matched) |
| CON-FND-BE919386760579 | Primary structure is the amino acid sequence held together by peptide  | ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-BEB66C74781AF0 | Depending on their conformation, proteins are classified as fibrous —  | ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-C5D9467CA2A949 | Nucleic acids are polymers whose nucleotide units are joined by phosph | ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS | verified (chapter-matched) |
| CON-FND-C672878EA48528 | The base attaches to the pentose by an N-glycosidic bond, phosphate es | ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES | verified (chapter-matched) |
| CON-FND-CB55EE69768E2E | RNA differs from DNA in its sugar (ribose vs deoxyribose), its pyrimid | ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS | verified (chapter-matched) |
| CON-FND-CB8584ED2F3C49 | A competitive inhibitor resembles the substrate closely enough to occu | ART-102-BIO-ENZYMES | verified (chapter-matched) |
| CON-FND-CC6BAFEE04D3F8 | Eukaryotic translation initiates when IF-4 brings mRNA to the 40S subu | ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION | verified (chapter-matched) |
| CON-FND-CD24D4572D101B | Each named GAG has its own biomedical role: hyaluronic acid cushions a | ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-CDAB433363C64E | Only the template strand of DNA is transcribed; RNA is complementary a | ART-102-BIO-RNA-SYNTHESIS-TRANSCRIPTION | verified (chapter-matched) |
| CON-FND-CEDE8978E2DE3A | Lecithin (phosphatidylcholine) provides choline for acetylcholine synt | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-D0969A4C2C03CE | Essential fatty acids — α-linolenic and linoleic acid, plus arachidoni | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-D1FDD52629718C | Membrane fluidity is set by how closely the phospholipid tails can pac | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-D5D15A190D88AE | Phosphatidic acid (diacylglycerol phosphate) carries a saturated fatty | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-D6DFABFBA0BA5E | Free nucleotides do six different jobs — carry energy, signal as secon | ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES | verified (chapter-matched) |
| CON-FND-DB5CF51C91F866 | Replication finishes when RNase H removes the RNA primers, a DNA polym | ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR | verified (chapter-matched) |
| CON-FND-E4551E87D19A8F | Translation takes place at the rough endoplasmic reticulum in the cyto | ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION | verified (chapter-matched) |
| CON-FND-E48C83F7BD0E6A | Cardiolipin (diphosphatidylglycerol) is two phosphatidic acid molecule | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-E618B54C3E216C | Simple lipids split into neutral fats (triacylglycerol, three fatty ac | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-E6C216AED80ED8 | Bone protein is mainly type I collagen and cartilage protein is mainly | ART-102-BIO-PROTEINS-OF-EXTRACELLULAR-MATRIX | verified (chapter-matched) |
| CON-FND-E77FD4A4D78884 | Cholesterol matters because almost nothing else can be made without it | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-E84660F1CEC3AE | Heteropolysaccharides contain more than one monosaccharide type, and t | ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-EDE6D8E401EB10 | Ribose and deoxyribose are the pentoses of RNA and DNA, and glucose, f | ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-EEEEDA8F5EA739 | The 5' cap and the 3' poly(A) tail both protect mRNA from ribonuclease | ART-102-BIO-RNA-SYNTHESIS-TRANSCRIPTION | verified (chapter-matched) |
| CON-FND-F2A54F8809C051 | A nucleotide is base + pentose + phosphate; applying this, uridylic ac | ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES | verified (chapter-matched) |
| CON-FND-F5627F4531F391 | Three checkpoints police the cell cycle: the G1 checkpoint checks cell | ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES | verified (chapter-matched) |
| CON-FND-F5D38D496B7D0D | Fatty acids are saturated (no double bonds, e.g. palmitic and stearic  | ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-F6E154FA6FF42A | A zymogen (proenzyme) is an inactive enzyme precursor, activated by pr | ART-102-BIO-ENZYMES | verified (chapter-matched) |
| CON-FND-F7408686F4736E | The genetic code is specific (one codon, one amino acid), degenerate ( | ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION | verified (chapter-matched) |
| CON-FND-F7B968019AB64C | Proteins containing all the essential amino acids are of high biologic | ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-FAA25760657211 | β-pleated sheets form when chain segments line up side by side — withi | ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-FB17D0600C8D49 | Codon and anticodon pair antiparallel, 5' to 3'; the wobble hypothesis | ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION | verified (chapter-matched) |
| CON-FND-FB99DCB7F61A0E | A codon is a 3-base code word on mRNA for one amino acid; AUG is the s | ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION | verified (chapter-matched) |
| CON-FND-FC888FB7A7D8A8 | Maltose, lactose and sucrose are distinguished by their component mono | ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE | verified (chapter-matched) |
| CON-FND-FF40DB9ED068F9 | Growth-factor binding starts the cell cycle by inducing cyclins, which | ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES | verified (chapter-matched) |
| CON-HEM-0C20B87FDE8B31 | Myoglobin sits in cardiac and skeletal muscle as an oxygen reservoir,  | ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS | verified (chapter-matched) |
| CON-HEM-0E5FE994670D4A | The globin chain is what makes haem usable: it dissolves it, keeps its | ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS | verified (chapter-matched) |
| CON-HEM-208821E5E203D5 | Hemoproteins are conjugated proteins built around a heme prosthetic gr | ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS | verified (chapter-matched) |
| CON-HEM-3767DA0A153B4C | Chronic blood loss causes iron-deficiency anaemia | ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA | verified (chapter-matched) |
| CON-HEM-603D2DB3DED602 | Aspirin prevents myocardial infarction because it inhibits cyclooxygen | ART-102-PHY-PLATELETS-AND-HAEMOSTASIS | verified (chapter-matched) |
| CON-HEM-8EC1CD48F9DB41 | The intrinsic pathway starts inside the vessel from exposed collagen,  | ART-102-PHY-ABNORMALITIES-OF-HAEMOSTASIS + ART-102-PHY-PLATELETS-AND-HAEMOSTASIS | verified (chapter-matched) |
| CON-HEM-9D7110C869FBDF | Heme is a ferrous (Fe2+), not ferric, protoporphyrin IX ring that sits | ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS | verified (chapter-matched) |
| CON-HEM-B9017F150AF212 | Myoglobin is one heme on one 153-residue chain while hemoglobin is fou | ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS | verified (chapter-matched) |
| CON-HEM-BEF9577989EAF4 | Sickle cell hemoglobin (HbS) is caused by a single point mutation in t | ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS | verified (chapter-matched) |
| CON-HEM-C62DE76BB2BDCD | Platelets adhere to exposed collagen and von Willebrand factor, activa | ART-102-PHY-PLATELETS-AND-HAEMOSTASIS | verified (chapter-matched) |
| CON-HEM-E172B2F684099D | Hemoglobin's chain composition changes across development — embryonic  | ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS | verified (chapter-matched) |
| CON-HEM-E3063003DB0FDD | The normal RBC count is 5–5.5 million/mm3 in males and 4–4.5 million/m | ART-102-PHY-RED-BLOOD-CELLS-AND-HAEMOGLOBIN | verified (removed spurious 2nd link) |
| CON-NEU-2FB725F305BDB1 | Noradrenaline is synthesised from tyrosine through DOPA and dopamine,  | ART-102-PHY-CHEMICAL-TRANSMISSION-AT-AUTONOMIC-JUNCTIONS-AND-AUTONOMIC-RECEPTORS | verified (chapter-matched) |
| CON-NEU-489FA78A649E37 | Cranial nerves III, VII and IX carry the parasympathetic supply to the | ART-102-PHY-PARASYMPATHETIC-NERVOUS-SYSTEM | verified (chapter-matched) |
| CON-NEU-5B28B080597460 | Nicotinic receptors sit in the autonomic ganglia and adrenal medulla,  | ART-102-PHY-CHEMICAL-TRANSMISSION-AT-AUTONOMIC-JUNCTIONS-AND-AUTONOMIC-RECEPTORS | verified (removed spurious 2nd link) |
| CON-NEU-6CC8F7E6DC2871 | Parasympathetic outflow to the pelvis leaves the cord as the pelvic sp | ART-102-PHY-PARASYMPATHETIC-NERVOUS-SYSTEM | verified (removed spurious 2nd link) |
| CON-NEU-7200808D45CA8C | Sympathetic stimulation dilates the pupil, widens the eyelids, secrete | ART-102-PHY-SYMPATHETIC-NERVOUS-SYSTEM | verified (chapter-matched) |
| CON-NEU-7D2786E349DE45 | Sympathetic fibres to the abdomen leave the paravertebral chain as spl | ART-102-PHY-SYMPATHETIC-NERVOUS-SYSTEM | verified (removed spurious 2nd link) |

### 19 leaf-regeneration rows (article-side already correct; concept `article_ids` / question `library_ids` need a leaf rebuild, not an article edit)

| Concept id | Label (truncated) | Article that names it (related_concepts) | Question/written rows needing library_ids |
|---|---|---|---|
| CON-FND-12CE1BF1D6C77C | A hormone that cannot enter the cell hands its message to ad | ART-102-BIO-NUCLEOTIDES-AND-NUCLEIC-ACIDS-SUPPLEMENT | QW-102-30AB2CC9B71C (102-INT-BAQOON-2022-written.md); QW-102-A72E33291CDF (102-INT-EOY-2022-written.md) |
| CON-FND-2AA1E4F3853330 | Linoleic and alpha-linolenic acids are the two fatty acids t | ART-102-BIO-CARBOHYDRATES-AND-LIPIDS-SUPPLEMENT | QW-102-99C59FBABF3A (102-INT-BAQOON-2022-written.md); QW-102-32E5030318C9 (102-INT-EOY-2022-written.md) |
| CON-FND-3BF934540F73CD | A mutation starts either as a replication mistake or as chem | ART-102-BIO-DNA-REPAIR-MUTATIONS-AND-GENETIC-CODE-SUPPLEMENT | QW-102-FD8773E1EFB2 (102-INT-BAQOON-2022-written.md) |
| CON-FND-3D6B24CAA42AC2 | Cysteine and methionine are the two sulfur-containing amino  | ART-102-BIO-AMINO-ACIDS-BASIC-AND-SULFUR-SUPPLEMENT | QW-102-175412D14C96 (102-INT-EOY-2022-written.md) |
| CON-FND-57DC83CE4A718B | Lysine, arginine and histidine are the book's basic (diamino | ART-102-BIO-AMINO-ACIDS-BASIC-AND-SULFUR-SUPPLEMENT | QW-102-150A9C7C6D8C (102-INT-BAQOON-2022-written.md) |
| CON-FND-B4916A9B4C980C | Starch and glycogen are the two homopolysaccharides the book | ART-102-BIO-CARBOHYDRATES-AND-LIPIDS-SUPPLEMENT | QW-102-8C633564003D (102-INT-BAQOON-2022-written.md); QW-102-1B83C9FAA274 (102-INT-EOY-2022-written.md) |
| CON-FND-C04259379794DA | A competitive inhibitor squats in the active site and loses  | ART-102-BIO-ENZYME-INHIBITION-AND-ISOENZYMES-SUPPLEMENT | QW-102-332477E17821 (102-INT-EOY-2022-written.md) |
| CON-FND-D23183EAACF5B7 | The genetic code is specific and degenerate at once — one co | ART-102-BIO-DNA-REPAIR-MUTATIONS-AND-GENETIC-CODE-SUPPLEMENT | QW-102-2B2ECE0FF1EC (102-INT-EOY-2022-written.md) |
| CON-FND-DD3EE5EC8C07D1 | answer: not established — the assigned department book does  | ART-102-BIO-ENZYME-INHIBITION-AND-ISOENZYMES-SUPPLEMENT | QW-102-D023A1E0F54A (102-INT-BAQOON-2022-written.md) |
| CON-FND-DEE7732AEC0F74 | DNA repair is a four-step assembly line — cut, remove, refil | ART-102-BIO-DNA-REPAIR-MUTATIONS-AND-GENETIC-CODE-SUPPLEMENT | QW-102-A61BD40136DE (102-INT-EOY-2022-written.md) |
| CON-FND-E50700FFFCF367 | DNA and RNA differ in every dimension the book tabulates — b | ART-102-BIO-NUCLEOTIDES-AND-NUCLEIC-ACIDS-SUPPLEMENT | QW-102-D1D0101D7B2C (102-INT-BAQOON-2022-written.md); QW-102-6D62C49C96B5 (102-INT-EOY-2022-written.md) |
| CON-HEM-3B1C5DBC2DB666 | Sickle cell anemia and thalassemia are the book's two named  | ART-102-BIO-HEMOPROTEINS-MYOGLOBIN-HEMOGLOBIN-SUPPLEMENT | QW-102-CF55923BD16A (102-INT-BAQOON-2022-written.md); QW-102-102681ACC4FA (102-INT-EOY-2022-written.md) |
| CON-HEM-741FE61E6062DB | Myoglobin is a one-heme oxygen store built for muscle, hemog | ART-102-BIO-HEMOPROTEINS-MYOGLOBIN-HEMOGLOBIN-SUPPLEMENT | QW-102-BA60FC42C66A (102-INT-BAQOON-2022-written.md); QW-102-66621E126F59 (102-INT-EOY-2022-written.md) |
| CON-HEM-E20402B19F5D30 | The platelet release reaction empties the dense and alpha gr | ART-102-PHY-PLATELET-RELEASE-REACTION-SUPPLEMENT | QW-102-7C50AA3E6982 (102-INT-EOY-2022-written.md) |
| CON-NEU-1B57CDAD7DEBCF | Three cranial nerves — III, VII and IX — carry the parasympa | ART-102-PHY-AUTONOMIC-OUTFLOW-AND-TRANSMISSION-SUPPLEMENT | QW-102-8C2C584D98E4 (102-INT-BAQOON-2022-written.md) |
| CON-NEU-ACE8344E6D9D43 | Acetylcholine is destroyed at once by acetylcholinesterase,  | ART-102-PHY-AUTONOMIC-OUTFLOW-AND-TRANSMISSION-SUPPLEMENT | QW-102-C15FC70FB01A (102-INT-EOY-2022-written.md) |
| CON-NEU-EF92EEB546EA99 | The sympathetic outflow to the gut and pelvis leaves the cor | ART-102-PHY-AUTONOMIC-OUTFLOW-AND-TRANSMISSION-SUPPLEMENT | QW-102-A4328FB547B3 (102-INT-BAQOON-2022-written.md) |
| CON-HEM-BDED630BBC87A3 | Low dietary iron causes iron-deficiency anemia | ART-102-PHY-IRON-METABOLISM (own) + ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA (update row) | QM-102-069A43B13AA5 (question/102-INT-mcq.md) — library_ids has IRON-METABOLISM only, missing ANAEMIA-AND-POLYCYTHEMIA |
| CON-HEM-7F0EF6B0D6F2FB | Iron-deficiency anemia is microcytic and hypochromic | ART-102-PHY-VITAMIN-B12-AND-FOLIC-ACID (own) + ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA (update row) | QM-102-FC157B634936 (question/102-INT-mcq.md) — library_ids has VITAMIN-B12-AND-FOLIC-ACID only, missing ANAEMIA-AND-POLYCYTHEMIA |

## Gate summary — 2026-08-23, HEAD `ea6b17d`

| Gate | Result |
|---|---|
| `check-two-sided-coverage.py "102 INT"` | concept-side only 99 → 0; two-sided 48 → 147; article-side only 17 (leaf-fix, see above); no link 0 |
| `medical:batch` on the 4 edited/authored article files, each `--with` all 3 concept + 4 article `102-INT-*` files | 4/4 `errors: []` |
| `check-column-parsers.ts docs/Kasr-Source-Imports/article/102-INT-coverage.md` | `sentinelInTextColumn: 0, blankInListColumn: 0` |
| `medical:presence` | 102-INT-concepts.md: pre-existing `articleIds`/`relatedArticleIds`/`atomicClaimIds` unpopulated (17) — the leaf-fix set above, not new; 102-INT-coverage.md: fixed 3× `related_articles`, 9× `question_ids`, 9× `claim_ids`, 9× `span_ids` blank-list-column notes (reverted `related_articles` back to blank after `[clear]` there tripped a real "unknown related article" batch error — see BLOCKED) |
| `medical:simulate` (3 concept files + 4 article files together, one call) | `errors: []`; created 41 articles + 180 concepts, updated 72 concepts (31 + 41 across the two mcq/physiology concept files); 0 rejected |
| `medical:audit -- --source <emit>` | 0 concept/article-id errors after including the concept files in the same simulate call (the concept files must be simulated together with the articles, not after — see BLOCKED); 51 pre-existing `unknown claim`/`unknown span` lines remain, all referencing `claim_ids`/`span_ids`/`callout_evidence` this lane did not touch — evidence pass (S5) has not started for 102 INT biochemistry/physiology, exactly as `102-INT-coverage.md`'s own header `field_notes` already states |

## Leaf-regeneration close-out and publish staging — 2026-08-27, HEAD `7c313d7` + this session

The 19 leaf-regeneration rows from the table above (17 "article-side only"
concepts, plus the 2 already-two-sided concepts whose MCQ-route
`library_ids` was stale) are closed. Fix, not a hand edit: 19 entries added
to `scripts/kasr/seeds/articles.ts` (`CON-* -> ART-102-*`, the map
`build-batches.ts` falls back to when a module has no evidence-pass `links`
for a concept id), then `node --experimental-strip-types scripts/kasr/
build-batches.ts "102 INT"` regenerated the batches. `git diff` after
regeneration touched exactly 4 files — `concept/102-INT-concepts.md` (19
`## article_ids` additions, each concept's own `## related_article_ids`
"further reading" list derived from the same lookup) and 2 written batches
(`102-INT-BAQOON-2022-written.md`, `102-INT-EOY-2022-written.md`, 22
`## library_ids` additions total across the two files) — nothing else
moved; confirmed by running the unmodified generator first (byte-identical
to the committed tree) before adding the 19 map entries.

`check-two-sided-coverage.py "102 INT"`: **`tested 164 | two-sided 164 |
concept-side only 0 | article-side only 0 | no link 0`.** The 164-coverage
gap that blocked hand-over is closed.

Two hand-authored article files also carried a `Dr. Omar` placeholder in
both `reviewer` and `final_publisher` on all 19 of their articles
(`article/102-INT-physiology.md`, 8; `-physiology-blood-ans.md`, 11) —
neither file carries a `Generated by` header, so both were edited directly.
Replaced with the standing ruling's values, `Medical team, Admin team` /
`Admin team`, same as 101 ISK and 108 INT. `biochemistry.md` and
`coverage.md`'s 22 articles already carried the correct values before this
session.

**Chained `medical:simulate`, checklist order, 10 steps** (resources →
articles → concepts → claims → citations → spans → relations → question →
written), each step's `--source` the previous step's `--emit`, against the
live snapshot (`server/data/medical-library-v1.json`): `errors: []` at
every step, 0 rejected. Totals: 69 resources, 41 articles, 180 new concepts
+ 72 updates, 138 claims, 113 citations, 114 spans, 150 relations, 22+421
MCQ + 71 written questions.

**Combined-folder simulate** — 101 ISK + 108 INT + 102 INT + every
pre-existing CVS/REN/RES batch under `docs/import-ready/`, one
`medical:simulate` call in per-kind order: 129 batches, 7,184 created, 0
rejected, **`errors: []`**. Only `academic/kau-modules.md` and
`academic/au-modules.md` are skipped, both by design (not a medical-content
kind, same as 101/108's combined runs).

`medical:batch` per 102 file (`--with` every sibling concept/article file):
clean except two pre-existing items, neither introduced this session —
`QW-102-D023A1E0F54A` (LDH/CK isoenzymes; the department book does not
cover the topic, `102-INT-OWED.md` §4, needs a faculty ruling) and 10 MCQ
rows whose `library_ids` names only one of two teaching articles (same
single-`articleId`-per-leaf shape as the 2 just fixed; concept-level
164/164 coverage is unaffected either way). Left as a known, documented gap
rather than a shared-toolchain change for 10 rows.

`medical:audit` against the combined emit: 102-specific findings are the
same editorial classes 101/108 already carry on their own not-yet-evidenced
articles — `relatedArticleIds`/`claimIds`/`spanIds` missing and
`microtopicId`/`nanotopicId`/`media`/`lastReviewed`/`reviewDue`
blank-without-reason on the 9 supplement/coverage articles. None block
import or visibility (every 102 record is `status: Draft`). No reviewer or
publisher finding anywhere in the 102 audit output.

**Staged to `docs/import-ready/` this session**: 21 files across 5 folders
(evidence 7, article 4, concept 3, relations 1, question 6 — the 4 written
papers land in `question/`, same convention as 101/108). Apply order and
full gate narrative in `docs/import-ready/INDEX.md`'s "Kasr Al Ainy 102
INT" section.

**Not touched this session, and why**: the 504 unauthored banked MCQ rows
and the 9 unseeded sittings are real authoring programmes (thousands of
lines each), not mechanical fixes — quantified and left as a split plan in
`docs/import-ready/INDEX.md` rather than started partially. No `practical/`
or `glossary/` batch exists for 102 yet.
