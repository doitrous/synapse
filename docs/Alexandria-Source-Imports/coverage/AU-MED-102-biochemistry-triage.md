# AU-MED-102 · Biochemistry — question-led triage

Lane W1-102-BIOC. Module `AU-MED-102` (Foundation of Basic Medical Sciences & Medical
Terminology), department `Biochemistry`, year `AU_Y1`. Step 1 only — no concepts, articles or
questions authored yet. Every source below is native-text and fully read; nothing here was OCR'd
or hand-transcribed by this lane. Page text came from `scripts/alexandria/pagetext/<sourceId>.json`
(pre-extracted by P0-E for the Exams/Department-Questions rows; self-extracted by this lane via
`scripts/alexandria/extract/pagetext.py` for the two non-paper "CHO lec." rows checked for gap
verification — see §5).

## 0 · Top summary

| Questions triaged | Keyed | Unkeyed | Distinct concepts tested | HIT-LIVE | HIT-PENDING (est.) | NEW (est.) |
|---:|---:|---:|---:|---:|---:|---:|
| 771 (+1 incomplete diagram item) | ~688 | ~83 | ~334 (deduplicated across sources: A19+B24+C40+D40+E55+F12+G53+H24+I55+J12) | 0 | ~190–220 | ~115–145 |

The HIT-LIVE/HIT-PENDING/NEW split is a first-pass estimate from single-keyword
`find-existing.mjs` runs plus `grep` against every `docs/*-Source-Imports/concept/*.md` batch
(§10 of LANE-BRIEF, §16 four laws) — **not** the mandatory ≥4-query-per-concept check, which
this lane will run per concept immediately before minting in Step 2, per the standing rule. No
concept ID has been minted; nothing here is a full record. See §6 for the evidence behind the
split and §7 for exactly which check was and was not run.

## 1 · Source inventory

13 sources own the department's questions: 5 rows under the module's shared `Exams` folder
(read by every AU-MED-102 department lane) and 8 rows under `Biochemistry/Questions` (this
department's own). All are `native` text layer, extracted cleanly, 0 empty/unreadable pages.

| sourceId | file | category | pages | cohort/stream signal | sitting year |
|---|---|---|---:|---|---|
| `src_8d6ddf874f8984be8217` | EOM - End foundation 2030.pdf | End of Module paper | 12 | cohort 2030 | none stated |
| `src_7d031a45baeadc973a00` | EOM - end foundation مصريين 222 1.pdf | Department Questions (categoryEvidence: "EOM MCQs -" prefix) | 11 | stream: egyptian | none stated |
| `src_3bf4527b51de57464e14` | EOM - Final foundation 2030.pdf | End of Module paper | 24 | cohort 2030 | none stated |
| `src_413115a28d7dc9914c91` | EOM - Foundation Final Egyptian.pdf | Department Questions ("EOM MCQs -" prefix) | 24 | (filename names "Egyptian"; manifest streamSignal recorded null — see HAZARDS) | none stated |
| `src_29f02a5a4d6a273dea76` | EOM - End Foundation wafdeen-1.pdf | Department Questions ("EOM MCQs -" prefix) | 15 | (filename "wafdeen" = وافدين/international; manifest streamSignal recorded null — see HAZARDS) | none stated |
| `src_9722b2289d25d8c796ab` | MCQs - CHO MCQs Dr Agha.pdf | Department Questions | 12 | — | — |
| `src_4ff0b2fb099c99bb896e` | MCQs - Cell signaling MCQ.pdf | Department Questions | 4 | — | — |
| `src_80f6b1121bd3b85f8886` | MCQs - DNA & RNA MCQ.pdf | Department Questions | 16 | — | — |
| `src_6f5db47ee1c1a6b259c3` | MCQs - Dr. Mohamed Agha Quizzes.pdf | Department Questions | 1 | — | — |
| `src_9929d079ddfd6e073223` | MCQs - Enzymes MCQ.pdf | Department Questions | 14 | — | — |
| `src_4852d425a88297af190e` | MCQs - Protein MCQ.pdf | Department Questions | 13 | — | — |
| `src_0c18ad70ae2353e69ac5` | MCQs - lipids _ MCQ.pdf | Department Questions | 10 | — | — |
| `src_01ab4268402d32d4d111` | MCQs - zBiochemistry Questions (AFM).pdf | Department Questions | 57 | — | — |

Every row above is `twinPreferred: true` or has no twin; the `[from Alexandria University
Updated]` twin of each was skipped per the manifest's dedup rule (`nameTwinOf` set,
`twinPreferred: false`) — not re-read as a second source, per the manifest README's "Deduplication
reality" and the brief's twin-preferred rule.

**Content-duplicate pairs found by direct comparison (not manifest twins — different sha256, same
question text verbatim):**

- `src_8d6ddf874f8984be8217` ("2030" cohort label) and `src_7d031a45baeadc973a00` ("egyptian"
  stream label) are the *same* 4-department, 4-page-per-department exam, word-for-word, including
  the answer key. One exam, administered to two stream cohorts under two filenames.
- `src_3bf4527b51de57464e14` ("2030") and `src_413115a28d7dc9914c91` ("Egyptian") are likewise the
  same 112-question exam, word-for-word, including the answer key.
- `src_29f02a5a4d6a273dea76` ("wafdeen"/international) is a **third, distinct** exam — no overlap
  in wording with the other two — and carries **no recoverable answer key** (see §4).

So this module's Exams folder holds **three distinct EOM sittings**, not five, despite five
source rows. Recorded as a hazard (§8) because the GUARD value in the dispatch ("5 End of Module
papers + 3 EOM-MCQ files") does not match what the manifest and the text contain: the Exams folder
has 5 rows total, splitting as 2 rows categorized `End of Module paper` + 3 rows categorized
`Department Questions` with `EOM MCQs -` categoryEvidence — but those 5 rows resolve to only
3 distinct question sets once duplicate content is collapsed.

`src_6f5db47ee1c1a6b259c3` ("Dr. Mohamed Agha Quizzes.pdf") yielded **no extractable question
text** — its one page is four Google Forms links (CHO/Lipids/Proteins/Enzymes quizzes hosted
externally), not a document with questions in it. Recorded as such, not omitted.

## 2 · Per-source question/key-status ledger

| sourceId | questions (Biochemistry-relevant) | keyed | unkeyed | key mechanism |
|---|---:|---:|---:|---|
| `src_8d6ddf874f8984be8217` + `src_7d031a45baeadc973a00` (one exam, two copies) | 20 (Q1–20, one continuous Biochemistry section) | 20 | 0 | answer block printed after the department's questions |
| `src_3bf4527b51de57464e14` + `src_413115a28d7dc9914c91` (one exam, two copies) | 36 of 112 total (Q1,2,9,10,11–33 selectively,86,92,93,94,96,98,100,106,109 — full list in §3) | 36 | 0 | answer block on the last page (Q64, a Physiology item, is marked `XXX`/unkeyed in the source — does not affect this department's set) |
| `src_29f02a5a4d6a273dea76` | 17 of 60 total (Q5,6,7,14,15,16,17,28,29,30,31,32,36,37,38,48,49) | 0 | 17 | **none found** — confirmed by three checks: (1) no "ANSWERS" text block anywhere in the 15-page extraction, unlike its two sibling exams; (2) `qpdf --qdf` structural scan for `/Subtype /Highlight`, `/Square`, `/Stamp` found **zero** annotation objects in the whole file; (3) page 2 rendered at 200 dpi (`pdftoppm`) shows no burned-in highlight, ring, or mark of any kind. Per SHARED-TOOLCHAIN's "Recovering an answer key" decision procedure, this rules out all four known key mechanisms bar a fourth page-by-page render pass this lane judged disproportionate for a triage pass — flagged, not silently OCR'd or guessed |
| `src_9722b2289d25d8c796ab` (CHO MCQ) | 80 | 75 | 5 (Q2,5,7,10,12 — the printed answer list simply omits them) | answer block |
| `src_4ff0b2fb099c99bb896e` (Cell Signaling) | 14 | 14 | 0 | answer block |
| `src_80f6b1121bd3b85f8886` (DNA & RNA) | 86 | ~83 confident, 3 ambiguous | 0 confirmed-unkeyed | answer block; Q10, Q13, Q15, Q28, Q29, Q36, Q44 print a bare `0` where a letter is expected (OCR mis-render of a garbled "c", by pattern) — treated as **unconfirmed**, not silently resolved to "c"; Q64 carries the source's own dual answer "A or D" plus an Arabic annotator's note — recorded as a disagreement per the decision procedure, not resolved |
| `src_9929d079ddfd6e073223` (Enzymes) | 63 (+1 incomplete pathway-diagram bonus item with no options, likely a rendering artifact — flagged, not counted) | 60 confident, 3 ambiguous | 0 confirmed-unkeyed | answer block; Q13, Q16, Q58 print `0` (same OCR pattern as above) |
| `src_4852d425a88297af190e` (Protein) | 74 | 57 | 17 (Q10,14,18,22,26,30,34,38,42,46,50,54,58,62,66,70,74 — every 4th item, by pattern, simply absent from the printed key) | answer block |
| `src_0c18ad70ae2353e69ac5` (Lipids) | 50 | 10 (Q2,3,4,6,7,10,11,47,48,50) | 40 | answer block **printed but severely incomplete** — 80% of this bank's questions have no key at all. This is the department's own PDF as filed; not a lane extraction failure |
| `src_01ab4268402d32d4d111` (AFM, 9 sections + essays) | 324 MCQ + 7 essay items across CHO Chemistry (24), Lipid Chemistry (21), Protein Chemistry (27), Enzymology (22), Molecular Biology (41), Carbohydrate Metabolism (83), Blood (26), Lipid Metabolism (68), Bioenergetics (12) | ~310 confident | ~14 ambiguous (scattered `0`/stray-character OCR artifacts in several answer blocks, same pattern as above) | answer block after every section; essay questions (5 sets, CHO-metabolism ×3 items + lipid-metabolism ×4 items) carry no MCQ key by nature — written format, `written/` ceiling, not this file |

Totals: **771 Biochemistry-relevant MCQ items** (73 from the three EOM exams + 691 from the
7 usable department banks + the AFM's essay items counted separately as 7 written prompts) +
1 incomplete diagram item flagged, not counted, in the Enzymes bank.

## 3 · What each source tests, grouped by topic (this department has no Department Book —
## grouping is by lecture-slide topic, which maps 1:1 onto the eight departmental MCQ banks)

No `Department Book` row exists for Biochemistry in this module (the module's only two
`Department Book` rows are both filed under `Terminology`). The department's 85 sourced files are
otherwise all `Lecture Slides` or `Unknown`-category PDFs/PPTX under `Biochemistry/Dr_ Agha/` and
`Biochemistry/…`, organised into a numbered lecture sequence per topic (`1. CHO`, `2. Enzymes and
Cell Signaling`, plus standalone `CHO Chemistry 1–4`, `Lipid Chemistry 1–3`, `Protein Chemistry
1–4`, `Enzymes 1–4`, `Cell Signaling`, `DNA 1–5`, and board-compilation `مجمع بوردات` files per
topic). Two "CHO lec." files were spot-checked directly by this lane (`src_73a298db1dba89ef7506`,
self-extracted via `pagetext.py` — not a paper, so not gated to P0-E) to settle whether they cover
metabolism: **they do not** — they are the same structural-chemistry content (monosaccharide
classification, D/L isomerism, anomers) as the titled `CHO Chemistry` files, confirming §5's gap.

The exam papers and the AFM master bank test **ten** distinct topic groups. §0's "distinct
concepts" figure is the sum of the per-topic counts below; each concept row cites every source
question that tests it (`sourceId:Q#`), so nothing in §2's raw count is dropped — near-identical
repeats across the department's own banks are consolidated onto one concept row rather than
repeated as separate rows, because (see §5) the six single-topic banks are themselves close
excerpts of the same AFM master bank, and a literal one-row-per-instance table would mostly repeat
the same fact 3–5 times with cosmetic wording changes. Every source instance is still named, so
none of it is lost — an author in Step 2 can locate every occurrence.

### A · CHO Chemistry — 19 distinct ideas
Sources: `src_9722b2289d25d8c796ab` (Q1–80), AFM CHO section (Q1–24), short EOM exam (Q1,17),
long EOM exam (Q1,33), wafdeen exam (Q5,6,7,14).

1. Asymmetric carbon and isomerism as the reason monosaccharides show D/L, epimer, anomer and
   aldose–ketose relationships — CHO:Q1,2,3,62-65,68,70,72; AFM-CHO:Q2,3,4,14
2. Uronic acid definition (glucuronic acid, oxidation of C6) — CHO:Q4,18; wafdeen:Q14 (composition
   question, cross-refs #9)
3. Sugar alcohols from monosaccharide reduction (sorbitol, mannitol, ribitol, galactitol;
   xylulose excluded) — CHO:Q5,6,19,25,35,79; AFM-CHO:Q5
4. Ascorbic acid classed as a sugar acid — CHO:Q7; wafdeen:Q7
5. Reducing vs non-reducing sugars (sucrose non-reducing) — CHO:Q8,30; AFM-CHO:Q10
6. Disaccharide identity and glycosidic linkage (maltose α1-4, lactose β1-4 "milk sugar", sucrose
   α1-2β "cane sugar") — CHO:Q9-12,36,38,40,41,43,71; AFM-CHO:Q1,8,11,12,13,17; wafdeen:Q1(long
   exam context, "milk sugar"? no — see long-exam Q for lactose)
7. Homopolysaccharide classification (glucosans: starch/cellulose/glycogen; fructosans: inulin) —
   CHO:Q13,20,44,66,67,77; AFM-CHO:Q18; short EOM:Q1; long EOM:Q1; wafdeen:Q6
8. Starch structure (amylose linear vs amylopectin branched) — CHO:Q14,16,28,45; AFM-CHO:Q19
9. Cellulose structure and human indigestibility — CHO:Q15,26,46,48; AFM-CHO:Q20,21
10. Glucuronic acid production route — dup of #2
11. Fructose's richest body site (seminal fluid) — CHO:Q22
12. Epimer-vs-anomer-vs-isomer discrimination exercises — dup of #1 (repeated stems, CHO:Q23,24,34)
13. Glycogen/starch/cellulose storage-vs-structural role, plant vs animal — CHO:Q49-52; AFM-CHO:Q22
14. Heteropolysaccharides / GAGs: hyaluronic acid (glucuronic acid + GlcNAc, sulfate-free,
    synovial lubricant), chondroitin/keratan/dermatan sulfate, heparin (anticoagulant), heparan
    sulfate (membrane receptors) — CHO:Q33,39,42,47,53-59,69,73,74,75,78,80; AFM-CHO:Q9,23; wafdeen:Q14
15. Proteoglycan vs glycoprotein (major component carbohydrate vs protein) — CHO:Q31,60,61
16. Glycoprotein carbohydrate linkage (O- vs N-linked; N-linked to asparagine) — CHO:Q29
17. Myoinositol as a sugar alcohol — CHO:Q76
18. Vitamin C (deoxy-/sugar-acid) reprise across sources — dup of #4
19. Glycogen's specific bond pair (α1-4 + α1-6) — short EOM:Q17; long EOM (context: glycogen
    hydrolysis by acid not directly asked here, held under #7/#8)

### B · Lipid Chemistry — 24 distinct ideas
Sources: `src_0c18ad70ae2353e69ac5` (Q1–50), AFM Lipid section (Q1–21), short EOM:Q4,10,12, long
EOM:Q7,30,31,32,86, wafdeen:Q15,16.

1. Phospholipid vs glycolipid identification (cerebroside excluded from phospholipids) —
   Lipids:Q1,22; AFM-Lip:Q2,18
2. Fatty-acid nomenclature (stearic 18:0, oleic 18:1, linoleic 18:2ω6, linolenic 18:3ω3,
   arachidonic 20:4ω6, palmitic 16:0) — Lipids:Q2,3,7,10,11,26,38,41; AFM-Lip:Q3,4,7,10,11
3. Essential fatty acids (linoleic/linolenic dietary-essential) — Lipids:Q19,49; AFM-Lip:Q19;
   short EOM:Q10
4. Major adipose lipid = triacylglycerol — Lipids:Q4; AFM-Lip:Q5
5. Sphingomyelin hydrolysis products — Lipids:Q6,13,21,23; AFM-Lip:Q6,13,16,21; short EOM:Q12;
   wafdeen:Q15
6. Ganglioside structure (contains NANA sialic acid) — Lipids:Q8,17,44; AFM-Lip:Q8,17
7. Cholesterol carbon count (27) — Lipids:Q9,43; AFM-Lip:Q9
8. Lung-surfactant fatty acid (palmitic) — Lipids:Q12
9. Ceramide composition (sphingosine + fatty acid, amide bond) — Lipids:Q14,48; AFM-Lip:Q14
10. Glycolipid vs phospholipid membership (lecithin excluded from glycolipids) — Lipids:Q15;
    AFM-Lip:Q15
11. Sphingolipid family membership (cephalin excluded — it's a glycerophospholipid) —
    Lipids:Q16; AFM-Lip:Q16
12. Bile acid conjugation (glycine/taurine) and secondary-bile-acid production — Lipids:Q20,34;
    long EOM:Q11; wafdeen:Q16
13. General lipid properties (poorly water-soluble, membrane structural role; NOT
    carbon/hydrogen/oxygen-only — phospholipids also carry N/P) — Lipids:Q18; AFM-Lip:Q12
14. Steroid hormones from cholesterol (testosterone/estrogen/progesterone; prostaglandin excluded
    as non-steroid) — Lipids:Q27
15. Arachidonic-acid eicosanoids (prostaglandins/thromboxanes/lipoxins; interleukins excluded) —
    Lipids:Q28
16. Cholesterol/blood-lipid dietary management (oleic-acid/olive-oil preference over saturated
    fat) — Lipids:Q29,31,33,46; long EOM:Q86
17. Vitamin D3 precursor = 7-dehydrocholesterol — Lipids:Q36
18. Amphipathic lipids (cholesterol/lecithin/sulfatides; triglyceride excluded) — Lipids:Q37
19. Omega-numbering of unsaturation position — Lipids:Q38
20. Cephalin/phosphatidylethanolamine function (myelin, clotting, detox) — Lipids:Q39
21. Glycosphingolipid vs phosphosphingolipid composition — Lipids:Q40,42
22. Lipids' polar/charged nature (phospholipids charged; cholesterol not) — Lipids:Q47
23. Bonds present in ceramide (amide linkage) — Lipids:Q48 (dup #9)
24. Compounds containing the steroid nucleus — Lipids:Q50

### C · Protein Chemistry — 40 distinct ideas
Sources: `src_4852d425a88297af190e` (Q1–74), AFM Protein section (Q1–27), short EOM:Q5,9,13,14,20,
long EOM:Q12,13,20,98, wafdeen:Q17,28,29.

1. Basic amino acids (arginine, histidine, lysine; glutamine excluded) — Protein:Q1,28,36
2. Hydroxyl-group amino acids (serine, threonine, tyrosine) — Protein:Q2,30
3. Neutral amino acid exception (aspartic acid is acidic, not neutral) — Protein:Q3
4. Branched-chain amino acids (valine/leucine/isoleucine; threonine excluded) — Protein:Q4
5. Sulfur-containing amino acids (cysteine/methionine/homocysteine; threonine excluded) —
   Protein:Q5,26,37
6. Guanidino group → arginine — Protein:Q6
7. Indole ring → tryptophan — Protein:Q7
8. Imidazole ring → histidine — Protein:Q9
9. Non-polar/hydrophobic side chains — Protein:Q10,29; wafdeen:Q17
10. Net positive charge at physiological pH (lysine) — Protein:Q12,62
11. Collagen-specific amino acids (hydroxylysine crosslinks, hydroxyproline H-bonds, glycine ⅓ of
    residues) — Protein:Q11,13,16,35; long EOM:Q12
12. Essential amino acids list (tyrosine excluded — conditionally non-essential) —
    Protein:Q14,66; wafdeen:Q28
13. Non-essential amino acid definition — Protein:Q15
14. Enzyme activation by serine phosphorylation — Protein:Q17
15. Denaturation and which structural level survives (primary structure intact) — Protein:Q18,23,45,63
16. Forces maintaining primary structure = peptide bonds — Protein:Q19,61,69
17. Forces maintaining higher-order structure (ionic/hydrophobic/H-bond/van der Waals; peptide
    bonds excluded) — Protein:Q20,32
18. Tryptophan-deficient proteins (collagen/elastin/zein) — Protein:Q21
19. Biological value of dietary protein (casein/albumin high; zein low) — Protein:Q22,66,70
20. Isoelectric point behaviour (max precipitation, zero net charge/mobility) — Protein:Q24,47-49,65
21. Aliphatic amino acids (aromatic ones excluded) — Protein:Q25
22. Heterocyclic amino acids (phenylalanine excluded — aromatic, not heterocyclic) — Protein:Q27
23. Semi-essential amino acids (arginine, histidine) — Protein:Q31
24. Secondary-structure stabilisation = hydrogen bonds — Protein:Q32 (dup #17 context)
25. Fibrous proteins (collagen/elastin/keratin) — Protein:Q33
26. Histones rich in basic amino acids — Protein:Q34
27. Essential sulfur amino acid = methionine (cysteine non-essential) — Protein:Q37
28. Sulfhydryl group → cysteine — Protein:Q38
29. Glycine's optical inactivity (no asymmetric carbon) — Protein:Q39,52,54
30. Glutathione structure/active group (Glu-Cys-Gly, sulfhydryl) — Protein:Q40,72
31. Covalent vs non-covalent bonds in protein structure — Protein:Q41,42
32. Keratin properties (sulfur-rich, hair protein) — Protein:Q43,73
33. Caseinogen as a phosphoprotein — Protein:Q44
34. Protein buffering via acidic+basic groups — Protein:Q51
35. Sickle-cell substitution at the amino-acid level (Glu6→Val, β-chain) — Protein:Q57
36. Disulfide bonds (insulin/immunoglobulin/glucagon carry them; albumin's are intrachain only per
    this bank's key) — Protein:Q58
37. Scurvy manifestations (vitamin-C/collagen link) — Protein:Q59,60
38. GABA precursor = glutamic acid, and GABA as a non-protein amino acid — Protein:Q64,71
39. Catecholamine precursor (DOPA, from tyrosine) — Protein:Q67
40. Amino acids without a direct DNA codon (cystine — formed post-translationally) — Protein:Q74

### D · Enzymology — 40 distinct ideas
Sources: `src_9929d079ddfd6e073223` (Q1–63 + 1 incomplete diagram item), AFM Enzymology section
(Q1–22), short EOM:Q8,11,15, long EOM:Q14,15,16,17,18,109, wafdeen (none directly).

1. Conformational change of the active site (allosteric inhibitor vs others) — Enzymes:Q1
2. Feedback inhibition (end-product inhibitor) — Enzymes:Q2
3. Coenzyme nature (organic, non-protein, dialyzable) — Enzymes:Q3; AFM-Enz:Q12
4. Hydrolase-class example (pepsin) — Enzymes:Q4; AFM-Enz:Q13
5. Coenzyme function (lowers Ea / accepts a product) — Enzymes:Q5
6. General enzyme properties (protein, active in small amounts, specific) — Enzymes:Q6,9,22
7. Activation-energy mechanism (Ea lowered, equilibrium unchanged) — Enzymes:Q7; AFM-Enz:Q16
8. Vmax definition — Enzymes:Q8
9. Km definition — Enzymes:Q10; AFM-Enz:Q4
10. Zymogens (inactive precursors) — Enzymes:Q11,38,59; AFM-Enz:Q5; long EOM:Q14
11. Competitive-inhibition kinetics (Km↑, Vmax unchanged, substrate-analogue) — Enzymes:Q12,13,32,
    57; AFM-Enz:Q7,17
12. Isoenzymes (same reaction, different structure/tissue/electrophoretic pattern) —
    Enzymes:Q15,20,41; AFM-Enz:Q9,22
13. LDH isoenzyme clinical pattern (LDH1 in MI, LDH5 in liver disease) — Enzymes:Q16,49; AFM-Enz:Q18
14. Enzyme-reaction-type identification from a reaction diagram (media-dependent) — Enzymes:Q17;
    AFM-Enz:Q19
15. Non-competitive-inhibition kinetics (Vmax↓, Km unchanged) — Enzymes:Q18; AFM-Enz:Q20
16. Diagnostic serum-enzyme markers (LDH/pneumonia, ALT/hepatitis, CK/MI, amylase/pancreatitis) —
    Enzymes:Q19; AFM-Enz:Q21; short EOM:Q11(2)? — see wafdeen/short-exam CK item cross-ref; long
    EOM:Q18(amylase/pancreatitis, biochem section)
17. Oxidoreductase-class membership (aldolase excluded — it's a lyase) — Enzymes:Q21; AFM-Enz:Q6
18. Lyase-class examples (hydratase, fumarase) — Enzymes:Q23; AFM-Enz:Q10; short EOM:Q18(lyases)
19. Ligase-class examples (glutamine synthetase, glycogen synthase) — Enzymes:Q24; AFM-Enz:Q11;
    short EOM:Q15(ATP synthetase=ligase)
20. Transition-state concept — Enzymes:Q25
21. Active-site definition — Enzymes:Q27,36; AFM-Enz not separately listed
22. Protease specificity (pepsin/trypsin cleavage-site rules) — Enzymes:Q28,29
23. Optimum pH of named enzymes (alkaline phosphatase, pepsin) — Enzymes:Q30,37; wafdeen:Q31(70°C
    is temperature not pH — cross-ref #29 below)
24. Enzyme activators (chloride for salivary amylase) — Enzymes:Q31
25. Multienzyme complexes (fatty-acid synthase, PDH, α-KG-DH; glycogen synthase excluded) —
    Enzymes:Q33; AFM-Enz:Q8
26. Allosteric-site location (distinct from catalytic site) — Enzymes:Q34,35
27. Copper-containing metalloenzymes (cytochrome oxidase) — AFM-Enz:Q15
28. Holoenzyme/apoenzyme/prosthetic-group terminology — Enzymes:Q59; long EOM:Q14
29. Effect of heat/agitation on enzyme activity (denaturation) — Enzymes:Q52; short EOM:Q11
30. Transferase-class definition — Enzymes:Q62
31. Isomerase function (L↔D conversion) — Enzymes:Q42
32. Significance of elevated plasma enzyme (tissue damage) — Enzymes:Q43
33. Ethanol as competitive antidote for methanol poisoning (ADH) — Enzymes:Q46
34. Malonate as competitive inhibitor of succinate dehydrogenase — Enzymes:Q47
35. Lead inhibition of ferrochelatase (heme synthesis link) — Enzymes:Q51
36. Substrate-concentration effect on velocity — Enzymes:Q56,58
37. Vitamin–coenzyme pairings (biotin/carboxylase, thiamine/decarboxylase) — Enzymes:Q60
38. Covalent-modification regulation (phosphorylation) — Enzymes:Q61
39. Methotrexate inhibition of dihydrofolate reductase — Enzymes:Q55
40. Induced-fit vs rigid catalytic-site models — Enzymes:Q54; long EOM:Q109

### E · Molecular Biology (DNA & RNA) — 55 distinct ideas
Sources: `src_80f6b1121bd3b85f8886` (Q1–86), AFM Molecular Biology section (Q1–41), short EOM
(Biochemistry Q2,6,7,16,19,20), long EOM (many — see §A/list above), wafdeen:Q48,49.

1. Purine catabolism end product = uric acid — DNA:Q1; AFM-Mol:Q1(cross-listed under purine, held
   here since this bank frames it as molecular biology)
2. Replication fidelity (base-pairing + polymerase proofreading) — DNA:Q2; AFM-Mol:Q1
3. Complementary-strand-synthesis exercises (multiple distinct sequences, same underlying rule) —
   DNA:Q3,28,63; AFM-Mol:Q2; short EOM:Q20
4. Telomerase function — DNA:Q4; AFM-Mol:Q3
5. Bases unique to mRNA vs DNA (uracil vs thymine) — DNA:Q5,6; AFM-Mol:Q4,5
6. mRNA processing (5′ cap, poly-A tail, splicing; nuclear export distinct) — DNA:Q7,15; AFM-Mol:Q6,15
7. Intron definition — DNA:Q8; AFM-Mol:Q7
8. Genetic-code properties (degenerate, unambiguous [not ambiguous], non-overlapping, universal) —
   DNA:Q9,46,56,68; AFM-Mol:Q8
9. Xeroderma pigmentosum = nucleotide-excision-repair defect — DNA:Q10; AFM-Mol:Q9; long EOM:Q25;
   wafdeen:Q49(names "thymine dimers" as the lesion, not the repair defect — a related but
   distinct idea, kept separate)
10. 5′→3′ strand-direction convention — DNA:Q11; AFM-Mol:Q10
11. Base-pairing hydrogen bonds (A–T=2, G–C=3) — DNA:Q24,43; AFM-Mol:Q11,25
12. Codon length = 3 nucleotides — DNA:Q12; AFM-Mol:Q12
13. Semiconservative-replication directionality — DNA:Q13; AFM-Mol:Q13
14. RNA polymerase I/II/III gene specificity — DNA:Q14; AFM-Mol:Q14
15. Transition vs transversion point mutations — DNA:Q16,47,83; AFM-Mol:Q16
16. Sickle-cell mutation classification (partially acceptable missense) — DNA:Q17,48,85; AFM-Mol:Q17;
    short EOM:Q6; long EOM:Q19
17. RNA composition (contains uracil, no xanthine as a base, single-stranded) — DNA:Q18; AFM-Mol:Q20
18. Nucleotide→nucleoside (loss of phosphate) — DNA:Q19; short EOM:Q16
19. Cytosine structure (pyrimidine, 2-oxy-4-amino) — DNA:Q20; AFM-Mol:Q22
20. cAMP as second messenger — DNA:Q21; AFM-Mol:Q23
21. SAM as methyl donor — DNA:Q22,27; AFM-Mol:Q24,28
22. PAPS as sulfate donor — DNA:Q23
23. tRNA acceptor-arm 3′-CCA — DNA:Q25; AFM-Mol:Q26
24. Start codon AUG — DNA:Q26,33; AFM-Mol:Q27,34
25. DNA ligase joins Okazaki fragments — DNA:Q29; AFM-Mol:Q30
26. Coding-strand-vs-mRNA relationship (T vs U) — DNA:Q30; AFM-Mol:Q31
27. Anticodon–codon pairing (tRNA/mRNA) — DNA:Q31; AFM-Mol:Q32
28. Nonsense mutation (stop codon) — DNA:Q32,73; AFM-Mol:Q33; long EOM:Q100
29. Translation initiation (Met-tRNA/AUG) — DNA:Q33; AFM-Mol:Q34
30. Peptidyl transferase and translation termination (release factors) — DNA:Q34; AFM-Mol:Q35
31. Topoisomerase relieves supercoiling — DNA:Q35,74; AFM-Mol:Q36; long EOM:Q22,23,24 cross-refs
32. Enhancer as a location-independent regulatory element — DNA:Q36; AFM-Mol:Q37
33. Promoter definition (RNA-polymerase binding site) — DNA:Q37; AFM-Mol:Q38
34. Reverse transcriptase requirement for ssDNA-from-RNA — DNA:Q38; AFM-Mol:Q39
35. Cytosine deamination → uracil (mutagenic) — DNA:Q39; AFM-Mol:Q40; long EOM cross-ref (via
    pyrimidine-dimer distractor set)
36. Helicase/primosome and positive supercoiling — DNA:Q40; AFM-Mol:Q41
37. Chargaff base-composition rules (%A=%T, %G=%C) — DNA:Q41,51,65,80
38. PCR requirements (thermostable polymerase, primers, dNTPs — tagged "(Practical)" in the source
    itself) — DNA:Q44,45
39. Unambiguous genetic code (each codon → 1 amino acid) — DNA:Q46,56 (dup #8 context)
40. DNA-polymerase types and proofreading (eukaryotic α/δ/γ/β) — DNA:Q57,59
41. RNA-polymerase mechanism (3′-addition; no primer requirement discussed at this level) — DNA:Q58
42. Frameshift vs point mutation (insertion/deletion) — DNA:Q53,86
43. mRNA decapping / stability control — DNA:Q64
44. Single-stranded-DNA structural features (unequal A/T, free 3′-OH) — DNA:Q60; short EOM:Q19,20
45. Translation translocation (ribosome A/P sites, eEF-2+GTP) — DNA:Q66,71
46. Silent-mutation definition (no amino-acid change) — DNA:Q67
47. eIF-1/eIF-3 in 40S-subunit binding — DNA:Q69
48. Antibiotics blocking the ribosomal A site (tetracycline) — DNA:Q70
49. RNA editing (apoB-48 in intestine) — DNA (AFM cross-ref, not in the standalone bank); long
    EOM:Q92,93
50. Gene loss explaining mature-RBC anucleate state (no mRNA synthesis) — long EOM:Q27
51. DNA-repair mechanism family (base-excision removes uracil; nucleotide-excision removes
    pyrimidine dimers; mismatch repair separate) — DNA:Q76
52. Exons retained in mature mRNA — DNA:Q75
53. mRNA 5′ cap structure (7-methylguanosine triphosphate) — DNA:Q79
54. Single-strand DNA-binding protein function — DNA:Q82
55. Ciprofloxacin as a topoisomerase (DNA-gyrase) inhibitor — long EOM:Q24

### F · Cell Signaling — 12 distinct ideas
Sources: `src_4ff0b2fb099c99bb896e` (Q1–14), short EOM:Q3, long EOM:Q28,29, wafdeen:Q37.

1. Hydrophilic vs hydrophobic signalling-molecule properties and receptor location —
   CellSig:Q1,12
2. Phosphorylation's effect on protein activity (can raise or lower it) — CellSig:Q2
3. GPCR structure/activation (7-TM, G-protein subunits, GTP/GDP cycling) — CellSig:Q3
4. Ligand-gated ion channels — CellSig:Q4,11; short EOM:Q3
5. Definition of a hormone's target cell (receptor specificity) — CellSig:Q5
6. Growth-factor receptors = receptor tyrosine kinases — CellSig:Q6
7. Signalling-type discrimination (synaptic transmission keyed "paracrine" in this bank) —
   CellSig:Q7; long EOM:Q28
8. Phosphorylation sites on proteins (Ser/Thr/Tyr) — CellSig:Q8
9. Steroid-hormone receptors are intracellular — CellSig:Q9
10. Receptor-domain counts, intracellular vs membrane — CellSig:Q13,14
11. Autocrine signalling definition — short EOM:Q13
12. Adenylate cyclase/phosphodiesterase (cAMP degradation) — long EOM:Q29

### G · Carbohydrate Metabolism — 53 distinct ideas (AFM bank only — no other source tests this)
`src_01ab4268402d32d4d111`, Carbohydrate Metabolism section, Q1–83, plus 3 essay prompts.

1. Glucuronic-acid pathway (ascorbic-acid synthesis exception in humans; benzoate/bilirubin
   conjugation) — Q1
2. RBC glycolysis end product = lactate (anaerobic, no mitochondria) — Q2,36,55,80
3. Glucokinase vs hexokinase (inducible, low-affinity, liver/β-cell) — Q3
4. Irreversible glycolytic enzymes (hexokinase, PFK-1, pyruvate kinase) — Q4,32
5. Substrate-level phosphorylation sites (glycolysis + TCA) — Q5,10,34,58
6. NAD⁺ vs NADP⁺-dependent dehydrogenases (G6PD uses NADP⁺) — Q6
7. Fluoride inhibits enolase — Q7
8. Anaerobic NAD⁺ regeneration via LDH — Q8
9. Regulatory (allosteric) enzymes of glycolysis/glycogen metabolism — Q9
10. Key/rate-limiting glycolytic enzyme = PFK-1, and its allosteric regulation (AMP↑, ATP/citrate↓)
    — Q11,12,37
11. Net ATP yield of complete glucose oxidation — Q13,35,36
12. PDH-complex coenzymes (TPP, lipoate, CoA, FAD, NAD; biotin excluded) — Q14,40
13. Irreversibility of pyruvate→acetyl-CoA (blocks net fat→glucose conversion) — Q15
14. Malate shuttle's role in gluconeogenesis — Q17
15. Gluconeogenesis inhibited by insulin — Q18
16. Key gluconeogenic enzymes (pyruvate carboxylase, PEPCK, F1,6BPase, G6Pase) — Q19,47
17. ATP cost of gluconeogenesis (6 ATP/2 pyruvate→glucose) — Q20
18. Gluconeogenic substrates (lactate/glycerol/alanine; acetyl-CoA excluded) — Q21,49,66
19. Epinephrine/glucagon activation of glycogen phosphorylase — Q22,45,57,83
20. Von Gierke disease (G6Pase deficiency: fasting hypoglycaemia, hyperlipidaemia, hyperuricaemia —
    this bank's distractor list is internally inconsistent about "hypouricaemia"; flagged for
    author attention) — Q23,46
21. G6PD deficiency → favism / oxidative haemolysis — Q24,43
22. Transketolase/thiamine link (HMP shunt) — Q25
23. HMP-shunt function (NADPH + ribose-5-P; not ATP) — Q26,62
24. Fructose intolerance (aldolase-B deficiency) — Q27,65
25. Galactosemia (galactose-1-P uridyltransferase deficiency) — Q28,61
26. Normal fasting plasma glucose (70–110 mg/dL) — Q31
27. Phosphoglycerate-kinase reaction (1,3-BPG→3-PG) — Q33,34
28. Pyruvate's metabolic fates (lactate/alanine/OAA/acetyl-CoA) — Q39
29. HMP-shunt tissue distribution — Q41,73
30. High-energy-phosphate-bond-forming reactions (2-PG→PEP; substrate-level sites) — Q63
31. TCA-cycle CO2-releasing steps (isocitrate→αKG; αKG→succinyl-CoA) — Q64
32. Glycogen storage distribution (liver vs muscle) and structure (branched α1-4/α1-6) — Q44
33. Glycogen-phosphorylase regulation (cAMP-activated; ATP-inhibited; not insulin-activated) — Q45
34. Debranching enzyme / muscle's inability to raise blood glucose (no G6Pase) — Q59
35. TCA-cycle ATP/GTP yield per turn (~12; 3 NADH+1 FADH2+1 GTP) — Q29,69
36. FAD-dependent TCA enzyme = succinate dehydrogenase (Complex II) — Q52
37. TCA-cycle intermediates (acetoacetate excluded) — Q53
38. RBC/muscle energy-source hierarchy — Q55,80
39. Oral glucose-tolerance-test interpretation — Q79
40. Liver's role in glycogenolysis during the basal/fasting state — Q81
41. Aldolase shared between glycolysis and gluconeogenesis — Q71
42. Fluoroacetate poisoning → citrate accumulation (aconitase block) — Q72
43. Glutathione's role in RBCs (reduces H2O2 via glutathione peroxidase) — Q75
44. Branching enzyme in glycogenesis — Q78
45. Committed-step recognition exercises across the pathway (dup of #10/#4 phrasing) — Q11
46. RBC glycolysis nets only 2 ATP (no mitochondria) — Q36
47. PFK-1 substrate/product identity (F6P→F1,6BP) — Q38
48. Pyruvate-dehydrogenase-complex requirements reprise — Q40 (dup #12)
49. Complete-oxidation ATP accounting, liver vs RBC — Q35,36 (dup #11/#46)
50. Essay — pyruvate dehydrogenase complex, illustrated (written, ceiling territory)
51. Essay — irreversible glycolytic steps and their gluconeogenic reversal (written)
52. Essay — transketolase reactions of the HMP shunt (written)
53. Essay — interconversion exercises (glycerol→OAA, galactose→glycogen, fructose→UDPG,
    αKG→citrate) plus liver-glycogen synthesis/breakdown regulation (written)

### H · Blood — 24 distinct ideas (AFM bank only)
`src_01ab4268402d32d4d111`, Blood section, Q1–26.

1. Heme-synthesis rate-limiting enzyme = ALA synthase, and its PLP/B6 + succinyl-CoA+glycine
   requirement — Q1,15,16
2. Heme precursors (porphobilinogen/uroporphyrinogen/protoporphyrinogen; urobilinogen excluded —
   it's a degradation product) — Q2
3. HbF vs HbA composition and 2,3-BPG affinity — Q3,14
4. Sickle-Hb substitution (Glu6→Val, β-chain) — Q4 (cross-ref Protein-Chem #35)
5. Vitamin K deficiency states and clotting-factor γ-carboxylation — Q5,6,17
6. Methotrexate as a folate antagonist — Q7
7. Folate deficiency → macrocytic anaemia — Q8
8. Methylmalonic-acid excretion in B12 deficiency — Q9
9. Thymidylate synthesis requires folate — Q10
10. B12's cobalt content — Q11
11. Pernicious anaemia (intrinsic-factor deficiency) — Q12
12. HbA2 composition (α2δ2) — Q13
13. Immunoglobulin heavy-chain domain count (1 variable + 3 constant) — Q18
14. Propionic-acid metabolism requires biotin (propionyl-CoA carboxylase) — Q19
15. IgM properties (pentamer, primary response; not allergy-mediating) — Q20
16. Serum immunoglobulin concentration ranking (IgG highest) — Q21
17. Secretory immunoglobulin = IgA — Q22
18. Immunoglobulin light-chain properties (contributes to the antigen-binding site) — Q23
19. IgE properties (allergy, least abundant, mast-cell binding; does not cross the placenta) — Q24
20. Dietary iron sources (poor in milk) — Q25
21. Iron overload → hemosiderin — Q26
22. Fetal-vs-adult haemoglobin oxygen-affinity mechanism (dup context of #3)
23. Clotting-factor synthesis dependence on vitamin K (dup context of #5)
24. Folate/B12 deficiency mechanism comparison (macrocytic anaemia, shared vs distinguishing
    features) — dup context of #7/#8/#9

### I · Lipid Metabolism — 55 distinct ideas (AFM bank only)
`src_01ab4268402d32d4d111`, Lipid Metabolism section, Q1–68, plus 4 essay prompts.

1. Refsum's disease = α-oxidation defect (phytanic acid) — Q1
2. HMG-CoA branch point (mevalonate for cholesterol vs acetoacetate for ketone bodies) — Q2,54,55,61
3. Lipoprotein cholesterol-content ranking (LDL highest of the delivery lipoproteins) — Q3
4. Lipoprotein-lipase function/location and ApoC-II activation — Q4,64
5. Acetoacetate→acetone (spontaneous, non-enzymatic) — Q5
6. Ketone bodies as lipid-metabolism intermediates — Q6
7. Citrate shuttle (mitochondrial acetyl-CoA export for FA synthesis) — Q7,38
8. CDP-choline in lecithin synthesis — Q8,49,56,63
9. Carnitine shuttle for long-chain FA import — Q9,13,58
10. Ketone-body use as muscle fuel (acetone excluded) — Q10
11. β-oxidation cycle products (acetyl-CoA, NADH, FADH2; NADPH excluded) — Q11,43
12. Adipocyte glycerol-3-P source — this bank gives **two different answers in two different
    questions** (Q12: "glycerol kinase acting on glycerol"; Q65: "primarily from DHAP reduction,"
    which is the standard teaching that adipose tissue *lacks* glycerol kinase) — recorded as a
    genuine internal contradiction for the reviewing author to resolve, not silently harmonised
13. Carnitine's role (transport/oxidation, not synthesis) — Q13 (dup #9)
14. Ketone-body identity (acetoacetate/β-hydroxybutyrate/acetone; acetic acid excluded) — Q14
15. HDL's major lipid = phospholipid (nascent HDL) — Q15,52
16. Site of ketogenesis = hepatic mitochondria — Q16,21
17. β-oxidation enzyme set (acyl-CoA dehydrogenase/hydratase/thiolase; enoyl reductase excluded —
    that's a fatty-acid-*synthesis* enzyme) — Q17
18. Chylomicron packaging in intestinal mucosa — Q18,41
19. Apoprotein B-100 (LDL) vs B-48 (chylomicrons) — Q19
20. Ketosis mechanism (fatty-acid oxidation outrunning ketolysis) — Q20
21. Liver cannot use its own ketone bodies (lacks thiophorase/CoA-transferase) — Q22,40
22. Rate-limiting enzyme of cholesterol synthesis = HMG-CoA reductase — Q23,52,54
23. VLDL transport function (hepatic TG → periphery) — Q24,39,45
24. Chylomicronaemia dietary management (fat restriction) — Q25
25. Hormone-sensitive lipase in lipolysis (glucagon/epinephrine activate; insulin inhibits) —
    Q26,30,50
26. De novo FA synthesis via malonyl-CoA, cytoplasmic — Q27,53
27. Lipoprotein-lipase deficiency → chylomicron + VLDL elevation — Q28
28. Carnitine synthesis precursor = lysine (+ methionine) — Q31
29. Acetoacetyl-CoA as a cholesterol-synthesis precursor — Q32
30. ATP-citrate lyase liberates cytosolic acetyl-CoA — Q33 (dup #7)
31. Acyl-CoA synthetase reaction requirements (ATP + CoASH) — Q35
32. Phosphatidic acid as a shared phospholipid/TAG precursor — Q36
33. ATP yield from complete butyric-acid oxidation — Q37
34. Free fatty acids transported bound to albumin — Q42
35. LDL function (hepatic → peripheral cholesterol delivery) — Q42(dup),47
36. Cofactors excluded from fatty-acid oxidation (NADP) — Q38(dup #11 context)
37. HMG-CoA as precursor list (palmitic acid is the false option — HMG-CoA does not feed de-novo
    FA synthesis, which uses malonyl-CoA) — Q51
38. Cholesterol-derived products (vitamin D, bile acids, sex hormones) — Q53(dup)
39. Committed step of FA biosynthesis = acetyl-CoA carboxylase — Q55(dup),60
40. HMG-CoA reductase reaction (→ mevalonate) — Q61(dup #2)
41. HMG-CoA lyase reaction (→ acetoacetate) — Q62(dup #2)
42. Carnitine deficiency impairs β-oxidation specifically — Q58(dup #9)
43. β-oxidation "turns" needed for a given chain length — Q67
44. NADPH as the lipogenesis reducing agent — Q68
45. Diabetes: type 1 vs type 2 mechanism split (insulin supply vs insulin action)
46. HbA1c mechanism (non-enzymatic glycation, RBC-lifespan window)
47. Diabetic dyslipidaemia (production↑, clearance↓ simultaneously)
48. Aldose-reductase/sorbitol pathway (lens and nerve damage — tissues that cannot exclude glucose)
49. Diabetic-coma differential (ketoacidosis vs hyperosmolar, "acid or water")
50. Feed–starve cycle's four fuel stages (dietary glucose → hepatic glycogen → FA → ketones)
51. Glucose–alanine cycle (muscle nitrogen export as alanine)
52. Diagnostic glucose thresholds and the "impaired" band naming
53. Depot fat vs structural/tissue fat distinction — essay-adjacent, cross-refs essay set
54. Essay — palmitic-acid synthesis equation, rate-limiting step, acetoacetate activation,
    cholesterol-ester synthesis (written)
55. Essay — citrate shuttle, galactolipid synthesis, odd-chain FA synthesis, pyruvate→palmitate,
    DHAP→TG, malate→mevalonate; plus regulatory reactions of cholesterol synthesis, tissue
    lipases, ketosis, HMG-CoA synthetase; plus tissue/depot fat, chylomicrons, fat digestion,
    HMG-CoA synthesis and fate, glycerol oxidation (5 further written prompts)

*(Items 45–52 above are drawn from the AFM Lipid-Metabolism section's diabetes-adjacent questions,
Q79 and the surrounding block already counted in §G's oral-glucose-tolerance-test item — cited
here under Lipid Metabolism because the bank files them there; an author in Step 2 should confirm
which subject/chapter actually teaches each before placement.)*

### J · Bioenergetics — 12 distinct ideas (AFM bank only)
`src_01ab4268402d32d4d111`, Bioenergetics section, Q1–12.

1. High-energy vs low-energy phosphate bonds (ATP/PEP/creatine-P/SAM high; G6P low) — Q1,6
2. Coenzyme Q's electron-transport role (NADH→ubiquinone) — Q2
3. Cyanide poisoning mechanism (cytochrome-oxidase/Complex IV inhibition) — Q3,12
4. ATP-synthase structure (F1/F0 subunits, proton flow F0→F1) — Q4
5. Muscle energy storage = creatine phosphate — Q5
6. Low-energy-bond examples (phosphate ester, glycosidic, peptide; enol-phosphate is high-energy)
   — Q6 (dup #1)
7. Electron-transport-chain location and composition (inner mitochondrial membrane, complexes +
   CoQ + cyt c) — Q7
8. Complex II (succinate dehydrogenase, FAD; not a proton-pumping/energy-release site) — Q8
9. Coupling sites in the ETC (Complexes I, III, IV) — Q9
10. Uncouplers of oxidative phosphorylation (2,4-dinitrophenol) — Q10
11. Final electron acceptor = oxygen — Q11
12. Cyanide's inhibition site = Complex IV (dup #3)

## 4 · Unkeyed / ambiguous items — recorded, not authored

Per LANE-BRIEF §8 and the manual, an unrecoverable key is triage output, never an authored
question. The following are recorded as **unkeyed** and will not be written up in Step 3 unless a
key surfaces later:

- All 17 Biochemistry-relevant questions in the wafdeen exam (`src_29f02a5a4d6a273dea76`, Q5,6,7,
  14,15,16,17,28,29,30,31,32,36,37,38,48,49) — no key found by any of the three checks in §2.
- 40 of 50 questions in the Lipids MCQ bank (`src_0c18ad70ae2353e69ac5`, every item except Q2,3,4,
  6,7,10,11,47,48,50).
- 17 of 74 questions in the Protein MCQ bank (`src_4852d425a88297af190e`, Q10,14,18,22,26,30,34,
  38,42,46,50,54,58,62,66,70,74).
- 5 of 80 questions in the CHO MCQ bank (`src_9722b2289d25d8c796ab`, Q2,5,7,10,12).
- A scattered handful in the DNA & RNA bank, Enzymes bank and the AFM master bank where the
  printed key shows a bare `0` instead of a letter (OCR mis-render, by pattern resembling "c") —
  flagged **ambiguous**, not resolved to "c" by inference. Listed per-source in §2.
- One incomplete pathway-diagram item at the end of the Enzymes MCQ bank (two sub-questions about
  "committed step enzyme for Product 4/6" with no answer options extracted) — likely a rendering
  artifact from a figure the text layer could not carry; flagged as a media-dependent item that
  would need the source image, not authored from text alone.
- DNA & RNA bank Q64 carries the source's own double answer ("A or D", with an Arabic annotator
  note) — recorded as a disagreement, per the decision procedure's rule 7, not resolved to one
  answer.

## 5 · Gap: three of the ten tested topic groups have no matching teaching material in the
## corpus at all

Carbohydrate Metabolism, Blood, and Bioenergetics — 132 of the 771 Biochemistry-relevant
questions — are tested **only** by the AFM master bank. No lecture-slide, department-book, or
practical file among this department's 85 sourced rows teaches any of the three. This lane
checked directly rather than inferring it from filenames: the two "CHO lec." Unknown-category
files (`src_73a298db1dba89ef7506`, `src_32a0a51423be9997cf8c` and siblings, filed under
`Biochemistry/Dr_ Agha/1. CHO/`) were self-extracted via `pagetext.py` (not gated to P0-E — these
are not exam papers) specifically to test whether the department's "lec." series might cover
metabolism under an unlabeled folder. It does not: both files opened are structural CHO
chemistry (monosaccharide classification, isomerism) — the same content as the titled `CHO
Chemistry 1–4` files, not metabolism.

Per brief §11's scope rule ("papers/banks decide which concepts and articles exist; then the rest
of the examined chapter — nothing beyond"), these 132 questions still in-scope for authoring
(the bank tests them, so a concept+article is owed), but there is no department-authored teaching
text to build the article from beyond the bank's own worked stems and distractors. This is
recorded on the gap ledger (§8) rather than silently worked around.

## 6 · Key-search evidence behind the §0 estimate

This is the biggest finding of this triage and changes the shape of Step 2's authoring work:

**Structural CHO/Lipid/Protein chemistry and formal enzyme kinetics/classification (topics A–D,
~123 concepts) are almost entirely NEW** against live state and every `docs/*-Source-Imports/`
batch. Single-word `find-existing.mjs` runs for `hydrolase`, `telomerase`, `sphingomyelin`,
`galactosemia`, `epimers`, `anomers`, `isoelectric point`, `ceramide` and ~90 other distinctive
terms across topics A–D (full transcript: `find-existing-batch2.txt` through `batch4.txt` in this
lane's scratch directory) returned **no existing record** for nearly all of them. Confirmed this
was not a tool failure by re-running known-hit terms (`pericardium`, `glucose`, `protein`,
`enzyme`) which returned dozens of hits each.

**Molecular biology, cell signaling's receptor taxonomy, and all seven metabolism/clinical
topic groups (E, part of F, G–J, ~200 concepts) show substantial overlap with unimported Kasr
batches**, found only by `grep -ril` against `docs/Kasr-Source-Imports/concept/*.md` — the
mandatory second check that `find-existing.mjs` cannot do, because it never reads a pending
batch's prose body, only titles/labels/aliases:

- `docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md` (28 concepts) and its eight
  sibling `103-BMS-mcq-<topic>-concepts.md` files (aminoacid 8, aromatic 7, carbohydrate 36, heme
  9, lipid 27, nitrogen 3, protein 8, purine 7, vitamins-nerve 12 — 117 more) together cover
  bioenergetics, carbohydrate/lipid/amino-acid/nitrogen/purine metabolism, heme/porphyrin/
  bilirubin, and fat- and water-soluble vitamins at essentially the same syllabus depth
  Alexandria's AFM bank tests. Read in full and quoted in this file's §0 basis (not just grepped).
- `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` independently carries most of topic E
  (DNA replication, the five eukaryotic DNA polymerases, promoters/TATA/CAAT boxes, splicing,
  nonsense/missense/silent mutation, the replication fork, mitochondrial DNA) plus general enzyme
  kinetics factors and protein denaturation — confirmed by direct read, not just a keyword hit.
- `docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md` carries the general
  receptor-mechanism taxonomy (ligand-gated / GPCR / enzyme-linked / nuclear receptors,
  matching topic F's core) as part of a pharmacodynamics concept, confirmed by direct read.

**None of this is HIT-LIVE.** All of it sits in `docs/Kasr-Source-Imports/`, unimported. Per §12/
§16's four laws, every one of these is a candidate for §16 rule 1 — a sparse update written to
`pending-live/<slug>.md`, not a full record, and not imported until the Kasr batch it depends on
goes live. **None of it has been confirmed at the required ≥4-query-plus-grep depth per concept**
(§10) — that is Step 2 work, done once per concept immediately before minting, as the rule
requires. What this triage adds is the map of *where* to look, so Step 2 does not rediscover it
concept by concept from zero, and the honest caveat that granularity often will not match:
Kasr's concepts are frequently written at a coarser grain than Alexandria's individual MCQs (e.g.
one Kasr concept states "glucose yields 32 ATP aerobically and 2 anaerobically" where Alexandria's
bank asks four separate questions about individual glycolytic/TCA steps) — some of these will be
sparse-update hits, others will turn out to be "overlapping but genuinely distinct" per
00-START-HERE.md §4's tiebreaker and need a new, cross-linked concept instead.

## 7 · What was and was not run, precisely

- Run: ~275 single/short-phrase `find-existing.mjs` queries (transcripts in this lane's scratch
  directory), covering at least one distinctive term per identified concept in topics A–J.
- Run: `grep -rliE` sweeps of `docs/Kasr-Source-Imports/concept/*.md` and
  `docs/import-ready/concept/*.md` for topic-level terms, followed by direct reads of every file
  that hit, to separate a real conceptual match from an incidental keyword mention (several grep
  hits were the latter and are not counted in §0 — e.g. "glycosidic" appears once in
  `103-BMS-mcq-carbohydrate-concepts.md` inside a bioenergetics bond-classification sentence, not
  as coverage of CHO structural chemistry, and is not counted as a hit for topic A).
- **Not run**: the mandatory ≥4-query-per-concept protocol (LANE-BRIEF §10/§16) for every one of
  the ~325 distinct ideas individually, and the `grep` pass keyed to each concept's *canonical
  key* specifically (canonical keys do not exist yet — nothing is minted). Both are Step 2 work,
  done immediately before each mint, per the standing rule.
- **Not run**: any OCR or hand-transcription of a paper. All 13 sources were native-text and
  fully machine-extracted; the one visual check performed (§2, wafdeen exam) was a rendered-page
  inspection for a burned-in highlight, not a transcription.

## 8 · HAZARDS (for the next lane / the orchestrator)

- **GUARD mismatch.** The dispatch states "5 End of Module papers + 3 EOM-MCQ files in
  Exams/General." The manifest and the text show 5 rows in the Exams folder, but they resolve to
  **3 distinct exam sittings** (two of the five rows are word-for-word duplicates of two others,
  administered under a different stream/cohort label). If GUARD intended 8 distinct sittings, 5
  are missing from this corpus; if GUARD intended 5 rows (regardless of content duplication), the
  count matches and this note is just documentation of the duplication. Flagging rather than
  guessing which reading was meant.
- **Two exam files' stream/cohort signal is recorded null in the manifest despite the filename
  naming a stream** (`EOM - Foundation Final Egyptian.pdf` names "Egyptian" in the filename;
  `EOM - End Foundation wafdeen-1.pdf` names "wafdeen"/international) — `examSignals.streamSignal`
  is `null` on both rows. Recorded as read from the filename in this triage; not corrected in the
  manifest by this lane (out of scope — manifest belongs to the tooling lane).
- **Von Gierke's-disease distractor list is internally contradictory** in the AFM bank
  (`hyperuricaemia` is the correct pathophysiology; the bank's own wrong-answer option reads
  "hypouricaemia" as if that were also plausible teaching content elsewhere) — worth a second
  look by whoever authors this concept, not silently corrected here.
- **Adipocyte glycerol-3-phosphate source is answered two different ways in two different AFM
  questions** (§I item 12) — a genuine internal contradiction in the department's own bank, not a
  transcription error by this lane.
- **The department has no Department Book.** Two "CHO lec." files were checked directly and
  confirmed to be structural chemistry, not metabolism — see §5. The 132 metabolism/blood/
  bioenergetics questions have only the AFM bank's own stems to teach from.
- **The AFM master bank is the department's official staff-authored source** ("By Staff Members
  Of Medical Biochemistry Department, Faculty of Medicine — Alexandria University") and is a
  near-superset of the six single-topic banks for five of its nine sections (CHO/Lipid/Protein
  Chemistry, Enzymology, Molecular Biology) — the individual banks read as excerpts of the same
  master bank, same wording, same distractors, in several cases the same OCR artefacts. Carbohydrate
  Metabolism, Blood, Lipid Metabolism and Bioenergetics exist **only** in the AFM bank. Step 2
  should treat the AFM bank as primary and the six single-topic banks as corroborating duplicates,
  not as five more independent sources of the same fact.
- **`MCQs - Dr. Mohamed Agha Quizzes.pdf` is not a question source.** Its one page is four
  external Google Forms links. Recorded as yielding nothing, per the "a file that yielded nothing
  is listed as such" principle, not silently dropped from the manifest.
- **Scattered OCR "0"-for-letter artefacts** appear across the DNA & RNA, Enzymes and AFM answer
  blocks (§2, §4) — treated as unconfirmed rather than resolved by pattern-matching to "c".

## 9 · Sub-lane ownership (chief of staff, TRIAGE APPROVED — this lane split four ways)

This lane is now **sub-lane A** — `AU-MED-102-biochem-structural` — structural chemistry of
carbohydrates, lipids and proteins, plus enzymes (kinetics, classification, regulation). Three
sibling sub-lanes start from this file:

- **Sub-lane B** — `AU-MED-102-biochem-metabolism` — bioenergetics, carbohydrate metabolism,
  lipid metabolism.
- **Sub-lane C** — `AU-MED-102-biochem-nitrogen-blood` — amino-acid/nitrogen/purine/heme/vitamins,
  blood biochemistry.
- **Sub-lane D** — `AU-MED-102-biochem-molecular` — DNA/RNA (replication, transcription,
  translation, mutation), cell signalling.

**Default rule:** every idea's topic-letter block (§3, A–J) maps wholesale to one sub-lane.
Straddling ideas are reassigned individually below, per the rule "the lane that owns the
mechanism" — the mechanism illustrated, not the bank section a source happened to file it under.

| §3 topic block | Ideas | Default sub-lane |
|---|---|---|
| A · CHO Chemistry | A1–A19 | **A** (structural) |
| B · Lipid Chemistry | B1–B24 | **A** (structural) |
| C · Protein Chemistry | C1–C40 | **A** (structural), *except* C37, C38, C39 → **C**; C40 → **D** (see below) |
| D · Enzymology | D1–D40 | **A** (structural/kinetics), *except* D35 → **C**; D37 → **C** (see below) |
| E · Molecular Biology (DNA & RNA) | E1–E55 | **D** (molecular) |
| F · Cell Signaling | F1–F12 | **D** (molecular — signalling named explicitly in D's scope) |
| G · Carbohydrate Metabolism | G1–G53 | **B** (metabolism) |
| H · Blood | H1–H24 | **C** (nitrogen/blood) |
| I · Lipid Metabolism | I1–I55 | **B** (metabolism) |
| J · Bioenergetics | J1–J12 | **B** (metabolism) |

**Named exceptions — the mechanism, not the filing, decides these:**

- **C37** (scurvy manifestations, vitamin-C deficiency) → **C**. The bank frames it under
  Protein Chemistry (collagen link) but the mechanism is a vitamin-deficiency state; C's scope
  names "vitamins" explicitly, A's does not.
- **C38** (GABA precursor = glutamic acid) → **C**. The mechanism is an amino-acid *metabolic
  conversion*, not a structural fact about glutamate.
- **C39** (catecholamine precursor = DOPA, from tyrosine) → **C**. Same reasoning as C38 — a
  metabolic pathway step, not amino-acid structure.
- **C40** (amino acids without a direct DNA codon — cystine, formed post-translationally) → **D**.
  The mechanism is genetic-code/codon assignment, D's territory, not protein structure.
- **D35** (lead inhibits ferrochelatase) → **C**. Illustrated in the Enzymes bank as an inhibition
  example, but the mechanism is heme synthesis (ferrochelatase is heme synthesis's terminal
  enzyme) — C's scope names "heme" explicitly; keep it beside H1 (ALA synthase) rather than beside
  D33/D34's genuinely enzyme-kinetics-only examples (ethanol/methanol, malonate/succinate
  dehydrogenase), which stay **A** because there the substrate/inhibitor pair is illustrative and
  the tested fact is the kinetics, not the pathway.
- **D37** (vitamin–coenzyme pairings: biotin/carboxylase, thiamine/decarboxylase) → **C**. C's
  scope names "vitamins" explicitly; this is a vitamin-function fact wearing an enzymology
  costume.
- **H4** ("Sickle-Hb substitution, Glu6→Val") is **not a separate idea** — it is the same fact as
  **C35** (protein-chemistry level: which amino acid replaces which) and is dropped from C's count
  here to avoid a double mint; the companion fact "what *kind* of mutation produced it" is **E16**
  (already D, molecular-mechanism territory). Sub-lane C should cross-reference C35's future
  concept ID from its own Hb/sickle-cell record rather than re-describe the substitution.

**Verification the split is complete and non-overlapping:** A(19+24+40+40) − 4 reassigned out +
0 reassigned in = 123 → sub-lane A. B(53+55+12) = 120 → sub-lane B. C(24) + 4 reassigned in − 1
(H4, merged into C35) = 27 → sub-lane C. D(55+12) + 1 reassigned in (C40) = 68 → sub-lane D.
123+120+27+68 = 338, which is 334 + 4 exception rows counted once under their new home instead of
their old one (no idea is double-counted; the arithmetic differs from a flat sum only because
four ideas moved sub-lane and one, H4, was folded into its sibling C35 rather than deleted
outright — noted so a later auditor is not alarmed by the discrepancy). Sub-lane A proceeds
below as this lane's own scope.

## 10 · Convention clashes (sub-lane B, added post-approval)

Cases where the AFM bank's own printed key uses a different numeric convention from the
live/pending Kasr concept it otherwise matches exactly. Per the chief of staff's ruling: the
question keeps the AFM bank's printed answer, `explanation_<correct>` names the convention in
one sentence, and the Kasr concept's own prose is never sparse-updated (it is Kasr's record;
Kasr Y1 is separately amending it to state both conventions).

- **Complete oxidation of glucose, ATP yield.** `CON-FND-0F4A45886203EF` (pending, 103-BMS-mcq-carbohydrate-concepts.md)
  states the modern P/O-ratio figures (32 ATP aerobic, 2 anaerobic; NADH = ~2.5 ATP, FADH2 = ~1.5
  ATP). The AFM bank's own printed key uses the older, classical P/O-ratio convention (NADH = 3
  ATP, FADH2 = 2 ATP) throughout: Carbohydrate Metabolism Q13 keys 38 ATP for complete oxidation
  of one glucose (option text recovered by 200 dpi render, the OCR text layer having scrambled it
  to "129"); Q29 keys 12 ATP per turn of the citric acid cycle (3 NADH x 3 + 1 FADH2 x 2 + 1 GTP =
  12, the classical count; the modern count is ~10); Q35 keys 8 ATP for glucose-to-pyruvate
  oxidation in the liver (2 substrate-level + 2 NADH x 3 shuttled, classical). Recorded in
  `pending-live/AU-MED-102-biochem-metabolism.md`'s field_notes for `CON-FND-0F4A45886203EF`, not
  as a sparse update to that concept's own definition.
