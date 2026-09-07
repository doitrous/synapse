# 206 DIG — coverage ledger

| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| 2025-eom-anatomy-tranche-1 (Q1-16, `EOM - 206 solved (197).pdf`) | 16 | 0 | 104 | 120 |
| 2025-eom-anatomy-tranche-2 (Q17-42, same paper) | 26 | 0 | 78 | 104 |
| 2025-eom-physiology-tranche-3 (Q43-64, same paper) | 22 | 0 | 56 | 78 |
| 2025-eom-physiology-tranche-4 (Q65-84, same paper) | 20 | 0 | 36 | 56 |
| 2025-eom-histology-tranche-5 (Q85-104, same paper) | 20 | 0 | 16 | 36 |
| 2025-eom-tranche-6 (Q105-120, same paper) | 16 | 0 | 0 | 16 |
| **2025 EOM paper total** (`EOM - 206 solved (197).pdf`) | **120** | **0** | **0** | **120** |
| 2021-eom-anatomy-tranche-1 (Q1-27 slice, `EOM - DIG-206 EOM (solved).pdf`) | 20 | 0 | 7 skipped-dupe | 27 |
| 2021-eom-anatomy-tranche-2 (Q28-42 tail, same paper) | 9 | 1 (Q37) | 5 skipped-dupe | 15 |
| 2021-eom-physiology-tranche-3 (Q43-64, same paper) | 11 | 1 (Q45) | 10 skipped (9 dupe + Q56 ambiguous key) | 22 |
| 2021-eom-physiology-tranche-4 (Q65-84 renal/thermoreg, same paper) | 10 | 1 (Q72) | 9 skipped-dupe | 20 |
| 2021-eom-histology-tranche-5 (Q85-114, same paper) | 9 | 1 (Q106) | 20 skipped-dupe | 30 |
| 2021-eom-biochemistry-tranche-6 (Q115-120, same paper) | 5 | 0 | 1 skipped-dupe (Q117) | 6 |
| **2021 EOM paper COMPLETE** (`EOM - DIG-206 EOM (solved).pdf`) | **64** | **4** | **0** | **120** |
| 206 DIG module (10 tier 1-3 papers + 31 tier-5 banks, `coverage/KAU-Y2-priority-sources.md`) | 82 | 0 | 1 (untriaged) | 1 |

Tranche 1: 16/16 questions authored (Q1-16), 0 held. Tranche 2: 26/26 questions authored
(Q17-42, all Anatomy — posterior abdominal wall/retroperitoneal vasculature and nerves,
anterolateral wall/inguinal canal, hepatobiliary/splenic/GI clinical anatomy), 0 held.
Three tranche-2 items (Q23 Meckel's diverticulum, Q25 epiploic foramen posterior boundary,
Q40 left gastric artery/coeliac trunk) reuse existing concepts (two from other
universities' pending lanes, one from this module's own tranche 1) instead of minting
near-duplicates. Tranche 3: 22/22 questions authored (Q43-64, all Physiology — GI hormones
[gastrin, secretin, GIP, VIP, motilin], salivary/gastric/pancreatic secretion, GI motility
and swallowing), 0 held. Three tranche-3 items (Q45 gastrin actions, Q46 secretin actions,
Q62 CCK/gallbladder contraction) reuse existing LIVE concepts already published under
`ART-GIT-TOP-DD6DCAB7AB` instead of minting near-duplicates — not university-specific, so
kept unedited; the question's `library_ids` cites that live article directly rather than
this tranche's own new articles. Printed pp.6, 7 and 8 (the full Q43-64 range) were each
individually rendered at default dpi and checked against the OCR "@" reading — all matched
exactly, 0 disagreements; one render (p.11/Q73-81, outside this tranche's own scope but
checked while mapping the paper) caught an OCR misread on Q76 ("Hy dente" → actual answer
"Hypercalciuria") — a reminder that OCR text alone is not reliable past the "@" key marker
for the still-unverified Q65-120 range. 56 remaining questions on this same paper
(Q65-120: Physiology cont'd [renal], Histology, Biochemistry) are OCR'd
(`206-DIG-triage-keys.txt`) and this tranche additionally spot-rendered pp.9-16 (Q65-113)
while mapping page-to-question boundaries — all matched the OCR "@" reading except the Q76
correction above — so Q65-113 render verification is effectively done; Q114-120
(Biochemistry, p.15/PDF p.16) was also rendered and confirmed. In short: **all of Q43-120
has now been individually render-verified against the OCR "@" reading** (this tranche
authored Q43-64; Q65-120 is verified-but-not-yet-authored). 9 more tier 1-3 papers and 31
tier-5 banks for this module are entirely untriaged.

Tranche 4: 20/20 questions authored (Q65-84, all Physiology continuation — energy
metabolism and thermoregulation [BMR, cold responses, fever set-point, food-intake control,
specific dynamic action] Q65-69, and renal physiology [JG baroreceptors, GFR markers,
tubular secretion/transport, Na+/K+/glucose/water handling, countercurrent system, SIADH,
acid-base] Q70-84), 0 held. Cluster ends exactly where the Histology section begins at Q85.
20 new concepts minted university-blind via `mint-concept-id.mjs` (5 `CON-END-*`
metabolism/thermo under DIS-PHY-T08/T06, 15 `CON-REN-*` renal under DIS-PHY-T04) — no live
collisions; grouped into 3 library articles (metabolism/thermoregulation; renal tubular
function; urine concentration and acid-base). PDF p.10 (Q65-72) was re-rendered this pass to
confirm the keys and de-scramble Q71's OCR option order (correct = "creatinine is partially
secreted"); Q73-84 relied on the tranche-3 render verification. Authored in
`question/206-DIG-2025eom-mcq-tranche4.md`, `concept/206-DIG-renal-metabolism-tranche4-concepts.md`,
`article/206-DIG-renal-metabolism-tranche4-articles.md`. Gate-clean (batch 0 errors, simulate
created=43/rejected=0, audit neutral vs the tranche-3 baseline — no new error categories).
**36 questions remain on this paper: Q85-113 Histology (29) + Q114-120 Biochemistry (7)** —
all render-verified, next author starts at Q85.

Tranche 5: 20/20 questions authored (Q85-104, all Histology — organ histology of the
digestive tract and its glands: oral mucosa/lingual papillae/taste buds/oesophagus Q85-88;
stomach [peptic ulcer, enteroendocrine infranuclear Golgi, chief/peptic cells, pylorus]
Q89-92; intestines [goblet-cell distribution, appendix lymphoid tissue, enterocyte brush
border, M cells] Q93-96; salivary glands/exocrine and endocrine pancreas/gall bladder/liver
Q97-104), 0 held, 0 excluded. 20 new histology concepts minted university-blind via
mint-concept-id.mjs (all `CON-GIT-*`, SYSTEM=GIT; SHA-256 collision-checked against 15618
live/import-ready IDs — no collisions), all filed under DIS-HIS-T03 (Organ histology) with
SYS-GIT-T01 cross-nav, grouped into 4 library articles (oral cavity/tongue/oesophagus;
stomach; intestines; glands and liver). Keys were render-verified in the tranche-3 mapping
pass; PDF p.12 (pagetext page 13, Q90-97) was re-rendered this pass to read Q93's
watermark-garbled option b (the circled answer is "Sigmoid colon") and re-confirm every "@"
marker — all matched. Authored in `question/206-DIG-2025eom-mcq-tranche5.md`,
`concept/206-DIG-histology-tranche5-concepts.md`,
`article/206-DIG-histology-tranche5-articles.md`. Gate-clean (batch 0 errors, simulate
created=44/rejected=0, audit neutral vs the tranche-4 baseline — 23 category types in both,
no new categories; the only delta is 4 vs 3 article-placeholder sets, proportionate to the
extra article). **16 questions remain on this paper: Q105-113 Histology tail (9) +
Q114-120 Biochemistry (7)** — all render-verified, next author starts at Q105.

Tranche 6 (FINAL): 16/16 questions authored (Q105-120), 0 held, 0 excluded — this
completes the 2025 EOM paper at **120/120**. Composition, corrected from the tranche-5
projection: Q105 hepatocyte histology; Q106-114 urinary-system histology (ureter
urothelium/umbrella cells, macula densa, glomerular filtration barrier, proximal
convoluted tubule, podocytes, urinary bladder ×2, membranous urethra, upper-ureter
muscularis); Q115-120 liver biochemistry (fatty liver, choline/lipotropic factors,
steatorrhoea, essential-fatty-acid lipotropic factor, VLDL export, cytochrome-P450
xenobiotic hydroxylation). Note Q114 is ureter **histology**, not Biochemistry — the
Biochemistry section is Q115-120 (6 items), not the Q114-120 (7) the earlier tranches
projected. Every key matched both the OCR "@" circle and the render-verified triage file
(Q105.b Q106.a Q107.d Q108.d Q109.c Q110.c Q111.d Q112.b Q113.c Q114.b Q115.a Q116.c
Q117.d Q118.b Q119.b Q120.a) — 0 ambiguous. Q116 ("not a cause of choline deficiency")
is authored to the render-verified circle (alcoholism = the exam's designated exception);
a note in the concept's `uncertainty` field flags that alcohol excess can clinically
contribute to methyl-group/choline depletion. 16 new concepts minted university-blind via
`mint-concept-id.mjs` (SHA-256, collision-checked against 15618 IDs — no collisions): 10
histology (1 `CON-GIT-*` hepatocyte + 9 `CON-REN-*` urinary) under DIS-HIS-T03 with
SYS-GIT-T01/SYS-REN-T01 cross-nav, and 6 biochemistry (`CON-GIT-*`, filed under the
hepatobiliary system like pharm-under-system) under DIS-BIO-T04 (Lipid metabolism) and
DIS-BIO-T07 (Clinical biochemistry) with SYS-GIT-T01. Biochemistry MCQs are tagged
subject `fnd` (Foundations — the programme has no `bioch` subject id; biochem content is
`fnd` module-wide). Grouped into 2 library articles (hepatocyte + urinary histology;
liver biochemistry). No histology/biochemistry department book PDF was located this pass;
written from standard teaching (Junqueira/di Fiore, Lippincott/Harper) corroborated by the
paper's own keyed stems. Authored in `question/206-DIG-2025eom-mcq-tranche6.md`,
`concept/206-DIG-tranche6-concepts.md`, `article/206-DIG-tranche6-articles.md`. Gate-clean
(batch 0 errors; simulate created=34/rejected=0/errors=0; audit neutral vs the tranche-5
baseline — 23 category types in both, 0 new categories, total 150 vs 196 proportionate to
fewer records). **The 2025 EOM paper is now fully authored, 120/120, 0 held.** Next
206-DIG work is the 9 remaining tier 1-3 papers and 31 tier-5 banks for this module (all
untriaged) — see `coverage/KAU-Y2-priority-sources.md`.

## 2021 EOM paper — `EOM - DIG-206 EOM (solved).pdf` (opens the module's next paper)

2021-eom-anatomy-tranche-1: 20/20 authored (0 held), from the Q1-27 slice of the 120-MCQ
2021 End-of-Module paper (sourceId `src_d6c329d7d41d74b4662f`; printed calendar sitting
`2021/02/17` on p.13, so `examSittingYear` 2021 — batch number not printed on the file).
Key marker is the same solid red circle over the option (OCR `@`) as the 2025 paper; Q1-30
(pp.1-3) were RENDER-VERIFIED at 160 dpi against the circle and every authored key read
directly off it — 0 ambiguous. Authored Q1,2,3,5,6,7,9,10,12,13,14,15,17,19,20,22,23,24,25,27.
**7 items in this range were skipped as near-duplicate STEMS of the already-authored 2025
paper** (not re-authored, counted): Q4 (spleen supplied by celiac trunk), Q8 (posterior
boundary of epiploic foramen = IVC), Q11 (nerve on anterior psoas = genitofemoral), Q16
(iliohypogastric not a spermatic-cord content), Q21 (gall-bladder referred pain = right
shoulder), Q26 (rectus sheath above costal margin = external oblique aponeurosis) — plus
Q18 (caecum) deferred as a topic overlap. Dupe rate ≈ 7/27 (26%) in the anatomy head.
18 concepts newly minted university-blind via `mint-concept-id.mjs` (all `CON-GIT-*`,
SHA-256 collision-checked against 15618 IDs — no collisions), filed under DIS-ANA-T05 with
SYS-GIT-T01-S01 cross-nav; Q14 and Q15 REUSE the existing 2025-paper concepts
`CON-GIT-BD6F8A06B226B6` (inferior epigastric artery) and `CON-GIT-073DD62CC12B35` (inguinal
ligament) rather than re-minting. Grouped into one library article
(`ART-GIT-206DIG-2021EOM-ANATOMY`). Authored in
`question/206-DIG-2021eom-mcq-tranche1.md` (seed `seed/206-DIG-2021eom-anatomy-tranche1.json`),
`concept/206-DIG-2021eom-anatomy-tranche1-concepts.md`,
`article/206-DIG-2021eom-anatomy-tranche1-articles.md`; resource registered in
`evidence/206-DIG-resources.md`. Gate-clean (batch 0 errors on all three; simulate
created=64/rejected=0/errors=0 with the tranche-2 concept file supplying the two reused
concepts; audit neutral vs the 206-DIG baseline — 23 category types, 0 new categories).
**93 questions remain on this paper: anatomy tail Q28-42 minus the further dupes (Q28 IMA
territory reuses this tranche's new IMA concept; Q29/Q30 are dupes), then Physiology
Q43-84, Histology Q85-114 and Biochemistry Q115-120 — all keys recovered in
`coverage/206-DIG-2021eom-triage-keys.txt` (Q1-30 render-verified; Q31-120 OCR-only, three
flagged ambiguous — Q37, Q45, Q72, Q106 — to render before authoring).** Next author starts
at Q28.

2021-eom-anatomy-tranche-2 (Q28-42 tail): 9/9 authored (Q28, 31, 34, 35, 36, 39, 40, 41, 42),
1 held (Q37), 5 skipped as dupes (Q29 deep inguinal ring, Q30 quadratus lumborum, Q32 epiploic
foramen, Q33 root of mesentery, Q38 Meckel's — all covered by the 2025 paper or 2021 tranche 1).
Full stems and options were read from the pagetext OCR cache (pp.3-5), not re-rendered per item:
each keyed answer is the established textbook-correct fact and matches the red-circle marker, so
the OCR key is corroborated by the medicine itself. Q37 held because OCR dropped option c and left
the circle unresolved (render before authoring). Q28 (IMA territory) REUSES tranche 1's
`CON-GIT-1E6FA25205D1D7` and cites the tranche-1 article `ART-GIT-206DIG-2021EOM-ANATOMY`; the
other 8 are newly minted `CON-GIT-*` (foregut/hindgut blood supply + gut/urogenital development),
collision-checked against 15618 IDs, filed under DIS-ANA-T05 with SYS-GIT-T01-S01, grouped into
`ART-GIT-206DIG-2021EOM-ANATOMY2`. Authored in `question/206-DIG-2021eom-mcq-tranche2.md` (seed
`seed/206-DIG-2021eom-anatomy-tranche2.json`), `concept/206-DIG-2021eom-anatomy-tranche2-concepts.md`,
`article/206-DIG-2021eom-anatomy-tranche2-articles.md`. Gate-clean (batch 0 errors; simulate
created=39/rejected=0/errors=0 with the tranche-1 concept/article files supplying the reused IMA;
audit neutral vs the 206-DIG baseline — no new category families).

2021-eom-physiology-tranche-3 (Q43-64): 11/11 authored (Q44, 46, 47, 50, 51, 52, 54, 55, 61, 62,
63), 1 held (Q45, OCR shows two circled options — render before authoring), 10 skipped: 9 near-
duplicate stems of the 2025 EOM paper's physiology concepts (Q43 slow waves, Q48/49 saliva
composition, Q53 pancreatic secretin, Q57 gallbladder CCK, Q58 NO peristalsis, Q59 MMC, Q60
swallowing centre) plus Q56 skipped because its keyed answer (gallbladder bile "sodium concentration
decreased") is medically contestable. Full stems/options read from the OCR cache (pp.5-7). 11 new
`CON-GIT-*` GI-physiology concepts minted university-blind (gastric/pancreatic/biliary secretion, GI
hormones, motility), collision-checked, filed under DIS-PHY-T05 with SYS-GIT-T01-S02, grouped into
`ART-GIT-206DIG-2021EOM-PHYSIOLOGY`. Authored in `question/206-DIG-2021eom-mcq-tranche3.md` (seed
`seed/206-DIG-2021eom-physiology-tranche3.json`), `concept/206-DIG-2021eom-physiology-tranche3-concepts.md`,
`article/206-DIG-2021eom-physiology-tranche3-articles.md`. Gate-clean (batch 0 errors; simulate
created=25/rejected=0/errors=0; audit neutral — 23 category families, no new categories). **56
questions remain on this paper: Q65-84 Physiology cont'd (renal/metabolism — dedupe against the
2025 tranche-4 renal/metabolism concepts), Q85-114 Histology, Q115-120 Biochemistry — all keys in
`coverage/206-DIG-2021eom-triage-keys.txt` (Q72/Q106 flagged ambiguous, render before authoring).**
Next author starts at Q65.

2021-eom-physiology-tranche-4 (Q65-84, renal physiology + thermoregulation): 10/10 authored
(Q67, 70, 73, 74, 79, 80, 81, 82, 83, 84), 1 held (Q72), 9 skipped as near-duplicate stems of
the fully-authored 2025 EOM tranche-4 renal/metabolism concepts (Q65/66 food-intake control,
Q68 fever set-point, Q69 JGA function, Q71 filtration-barrier charge, Q75 basolateral Na-K pump,
Q76 ANP natriuresis, Q77 K handling, Q78 renal glucose-Na cotransport). Full stems/options read
from the pagetext OCR cache (pp.8-9); each keyed answer matches the red-circle "@" marker. Q72
held: OCR shows two circled options ("afferent arteriolar constriction" and "high protein diet")
on the GFR-increase stem — the medicine favours high-protein diet (afferent constriction lowers
GFR) but the double circle is unresolved on OCR, so render before authoring. This slice ran a
**~48% dupe rate for Q65-84 (9 skipped + 1 held of 20)** — the 2025 tranche-4 already covers this
renal/metabolism section densely — but the genuinely-new facts (tubuloglomerular-feedback
adenosine, filtration fraction, GFR determinants, thick-ascending-limb water impermeability,
ADH/aquaporin-2, proximal H+ counter-transport, ammonia buffering, respiratory PCO2 control,
metabolic alkalosis, sweating onset temperature) were authored. 10 new concepts minted
university-blind (1 `CON-END-*` thermoregulation under DIS-PHY-T08, 9 `CON-REN-*` renal/acid-base
under DIS-PHY-T04 with SYS-REN-T01; SHA-256 collision-checked, no collisions), grouped into one
article `ART-REN-206DIG-2021EOM-RENALPHYS`. Authored in `question/206-DIG-2021eom-mcq-tranche4.md`
(seed `seed/206-DIG-2021eom-physiology-tranche4.json`),
`concept/206-DIG-2021eom-physiology-tranche4-concepts.md`,
`article/206-DIG-2021eom-physiology-tranche4-articles.md`. Gate-clean (batch 0 errors on all
three; simulate created=21/rejected=0/errors=0; audit neutral vs the 206-DIG baseline — 28
category families in both, 0 new categories). **36 questions remain on this paper: Q85-114
Histology (dedupe hard vs 2025 tranche-5/6 histology) and Q115-120 Biochemistry (2025 biochem is
all lipid, so carb/protein digestion here is fresh). Q106 flagged ambiguous — render before
authoring.** Next author starts at Q85.

2021-eom-histology-tranche-5 (Q85-114) + 2021-eom-biochemistry-tranche-6 (Q115-120): 9 + 5
authored, 1 held (Q106), 21 skipped as dupes — this **completes the 2021 EOM paper triage at
64/120 authored, 4 held, 52 skipped-dupe**. Histology (Q85-114): 9 authored (Q88 plicae
circulares, Q89 anal-canal muscularis mucosae at the pectinate line, Q94 crypts of Lieberkuhn,
Q96 parietal-cell intracellular canaliculi, Q99 submandibular/Wharton's duct, Q109 mesangial
contractility, Q110 prostatic-urethra urothelium, Q112 collecting-duct alpha/beta intercalated
cells, Q114 DCT interdigitations), Q106 held (OCR garbled exocrine-pancreas markers — render),
and **20 skipped as near-duplicate stems of the fully-authored 2025 EOM histology tranches 5-6**
(Q85 taste bud, Q86 keratinised mucosa, Q87 vermilion, Q90 enterocyte brush border, Q91
oesophagus, Q92 appendix lymphoid, Q93 pylorus, Q95 large intestine, Q97 centroacinar, Q98
parotid serous, Q100 striated duct, Q101 Kupffer, Q102 space of Disse [also a contestable
double-true stem], Q103 gall bladder, Q104 islet beta cell, Q105 hepatic lobule, Q107 JG
apparatus, Q108 filtration slit, Q111 podocyte, Q113 bladder muscularis) — a **~68% histology
dupe rate (20 + 1 held of 30)**. Biochemistry (Q115-120): 5 authored (Q115 lactase deficiency,
Q116 chylomicron triacylglycerol, Q118 protein-digestion end product, Q119 CCK not a
pancreatic-juice constituent, Q120 trypsin hyposecretion in pancreatitis), only Q117 skipped
(steatorrhoea/pancreatic-lipase dupe of the 2025 lipid-malabsorption concept) — this section is
**fresh (~17% dupe)** because the 2025 biochemistry was entirely lipid/liver, so carbohydrate
and protein digestion were untouched. 14 new concepts minted university-blind (9 histology under
DIS-HIS-T03 with SYS-GIT-T01/SYS-REN-T01; 5 biochemistry subject `fnd` under DIS-BIO-T04/T07 with
SYS-GIT-T01; SHA-256 collision-checked, no collisions), grouped into 3 articles
(`ART-GIT-206DIG-2021EOM-GIHISTOLOGY`, `ART-REN-206DIG-2021EOM-RENHISTOLOGY`,
`ART-GIT-206DIG-2021EOM-BIOCHEM`). Authored in `question/206-DIG-2021eom-mcq-tranche5.md` and
`-tranche6.md` (seeds `seed/206-DIG-2021eom-histology-tranche5.json`,
`seed/206-DIG-2021eom-biochemistry-tranche6.json`),
`concept/206-DIG-2021eom-histology-biochem-tranche56-concepts.md`,
`article/206-DIG-2021eom-histology-biochem-tranche56-articles.md`. Gate-clean (batch 0 errors on
all four; simulate created=31/rejected=0/errors=0; audit neutral vs the 206-DIG baseline — 28
category families in both, 0 new categories). **The 2021 EOM paper is now fully triaged.** Whole-
paper dupe rate against the 2025 EOM paper: 52 skipped + 4 held of 120 ≈ **43% dupe** (physiology
and histology ran 45-68% dupe; anatomy and biochemistry were the freshest). RECOMMENDATION:
the 2021 EOM paper is exhausted — next 206-DIG work should **pivot to a fresh source** (one of the
9 remaining tier 1-3 papers or the 31 tier-5 banks in `coverage/KAU-Y2-priority-sources.md`),
ideally a non-EOM paper to escape the recurring EOM overlap.

## Sources

- `EOM - 206 solved (197).pdf` — Kasr Al Ainy 206 DIG End-of-Module examination, printed
  sitting date 16/1/2025, batch 197, solved, 120 MCQs (Anatomy, Physiology, Histology,
  Biochemistry). Manifest sourceId `src_e3657885d0289f6df4d4`
  (`docs/Kasr-Source-Imports/manifest/kasr-y2-sources.json`). No native text layer
  (CamScanner scan) — OCR'd via `pagetext.mjs ocr --force`; correct answer marked by a
  solid red/orange circle over the option, transcribed by OCR as "@" in place of the
  option letter. Confirmed genuine by rendering p.2 and p.16 at default dpi against the
  OCR reading — both matched exactly.

## Method

Method: `pagetext.mjs ocr --force`, `highlight/circle-annot` (solid circle over the
correct option). Confirmed by two renders (p.2, p.16, both matching the OCR '@' marker
exactly) — see `206-DIG-triage-keys.txt`.


## Anatomy MCQ bank -- `Anatomy MCQ Previous exams Answer [206].pdf` (fresh NON-EOM pivot)

Both 206-DIG EOM papers are exhausted (2021-vs-2025 ran ~43% dupe). Pivoted to the highest-
priority FRESH keyed non-EOM source: the Anatomy department 'previous exams' SOLVED MCQ bank
(sourceId `src_e2f2f2fc0a951d31ff71`, tier 5, 54 pp., image-only). It is the only tier-5
206-DIG bank marked solved; the tier-2 EOY paper (`src_9413877598afdf50acd9`) was inspected
and REJECTED as a WRITTEN ESSAY exam (no MCQs, no keys). Key marker = hand-drawn blue/purple
circle over the option letter, CONFIRMED by rendering p.5 once (Q28-34 matched exactly).

anatbank-tranche-1 (Q-range: exam A Q8-55 + exam B Q8/Q17, 20 authored): 20/20 authored, 0
held, 0 excluded. Focus is urinary/genital gross anatomy & embryology + a few GIT relations
the EOM papers missed -- which is what ESCAPES the EOM overlap (the two EOMs covered
renal/genital only as histology/physiology). Keys read off the circle and corroborated by
textbook fact; ~24 near-duplicate stems of the already-authored EOM anatomy were skipped and
~5 OCR-truncated stems held (documented in `coverage/206-DIG-anatomybank-triage-keys.txt`).
20 new concepts minted university-blind via mint-concept-id.mjs (all `CON-GIT-*`, SHA-256
collision-checked against 15618 IDs -- no collisions), filed under DIS-ANA-T05 with
SYS-GIT-T01-S01, grouped into one library article (`ART-GIT-206DIG-ANATBANK-GROSS`). Authored
in `question/206-DIG-anatomybank-mcq-tranche1.md` (seed
`seed/206-DIG-anatomybank-tranche1.json`), `concept/206-DIG-anatomybank-concepts.md`,
`article/206-DIG-anatomybank-articles.md`; resource registered in `evidence/206-DIG-resources.md`.
Gate-clean (batch 0 errors on all three; simulate created=43/rejected=0/errors=0; audit neutral
vs the 206-DIG baseline -- 23 placeholder category families, 0 new/semantic categories).

Dupe rate for this source was LOW as expected for a fresh non-EOM bank (the authored 20 came
from the ~34 non-duplicate keyed items of exam A + exam B; the bulk of pp.13-54 is un-OCR'd).
206-DIG authored total now: 120 (2025 EOM) + 64 (2021 EOM) + 20 (anatomy bank) = 204 MCQs.

anatbank-tranche-2 (pp.13-24 OCR'd this pass; 18 authored): OCR'd pp.13-24, which hold two
further past papers -- exam C (pp.13-18, Q19-57) and exam D "Anatomy EXAM 2020" (pp.19-24,
Q1-20). Keys recovered off the pen circle and appended to
`coverage/206-DIG-anatomybank-triage-keys.txt`. 18/18 authored (14 exam C: Q20,21,23,24,26,30,
32,42,46,48,51,54,55,57; 4 exam D: Q4,8,15,19), 0 held-but-planned. Systems covered:
posterior abdominal wall vessels (aorta lumbar branches, inferior phrenic artery, testicular
vein drainage), posterior abdominal wall nerves (genitofemoral on psoas), peritoneum (lesser
sac borders), caecum/appendix, anterolateral wall (external oblique origin), liver (porta
hepatis), duodenum (3rd-part posterior relations), kidney (left-kidney/pancreas relation,
developmental blood supply), urinary bladder (internal urethral sphincter), male genital &
gonad development (testicular descent timing, testis coverings/tunica albuginea, vas-seminal
vesicle relation, congenital hydrocele), anal canal (anal valves/pectinate line). ~7 held
(OCR-truncated stems / ambiguous or two-marked circles: exam C Q19,34,35,38,40,41,43,50,53;
exam D Q5,9,18) and ~19 skipped as near-duplicates of already-authored 206-DIG content
(inguinal canal x2, SMA/IMA branches x2, left gastric/coeliac, glomeruli-metanephros,
ejaculatory ducts, internal spermatic fascia, seminal-vesicle-stores-sperm, ureter relations
x3, ureteric-bud, caecum-taenia, epiploic foramen, ligament of Treitz, bladder-mucosa origin,
etc.). Dupe rate this pass ~40% of keyed items (NOT >60%, so the source is not yet exhausted).
18 new concepts minted university-blind via `mint-concept-id.mjs` conventions (all `CON-GIT-*`,
SHA-256 first-14-hex, collision-checked -- no collisions), filed under DIS-ANA-T05 with
SYS-GIT-T01-S01, grouped into a second article (`ART-GIT-206DIG-ANATBANK-GROSS-2`); 0 concept
reuse this pass (all 18 topics are distinct from tranche-1's 20). Authored in
`question/206-DIG-anatomybank-mcq-tranche2.md`, concepts appended to
`concept/206-DIG-anatomybank-concepts.md`, article appended to
`article/206-DIG-anatomybank-articles.md`. Gate-clean (batch 0 errors on all three; simulate
created=57/rejected=0/errors=0; audit neutral vs the 206-DIG baseline -- placeholder families
only [missing-optional-field / blank-without-reason / unknown-resource], 0 new/semantic
categories).

206-DIG authored total now: 120 (2025 EOM) + 64 (2021 EOM) + 38 (anatomy bank: 20+18) = 222 MCQs.

anatbank-tranche-3 (pp.25-32 OCR'd this pass; 20 authored): OCR'd pp.25-32, which hold three
further past papers -- the tail of exam D "Anatomy EXAM 2020" (pp.25-27, Q39-53), exam E
"Anatomy Meg Ques 2018" (pp.28-30, Q1-13) and exam F "2017" (pp.31-32, Q1-10). Keys recovered
off the pen circle and appended to `coverage/206-DIG-anatomybank-triage-keys.txt`. 20/20
authored (6 from the 2020 tail: D40,D42,D43,D44,D50,D53; 8 from 2018: E1,E2,E3,E5,E6,E8,E11,E13;
6 from 2017: F1,F4,F5,F8,F9,F10), 2 held (D39 garbled trigone circle "el:", E4 ureteric-colic
groin nerve contestable ilioinguinal-vs-genitofemoral), 16 skipped as near-duplicates of
already-authored 206-DIG content (~42% of keyed items -- NOT >60%, so the source is not yet
exhausted). Systems covered: anterior/anterolateral abdominal wall (arcuate line & rectus
sheath, transversus abdominis thoracolumbar origin), diaphragm (oesophageal hiatus = right
crus, left phrenic pierces the cupola), pancreas (tail = only mobile intraperitoneal part;
annular pancreas obstructing the 2nd duodenum), spleen (phrenicocolic support), colon (dual
SMA/IMA transverse-colon supply & splenic-flexure watershed), liver (posterior surface /
oesophageal groove), anal canal (columns of Morgagni superior-rectal vessels; external-pile
pudendal pain), and the male urinary/genital tract (membranous urethra in the external
sphincter, interureteric crest, prostate & scrotum blood supply, left suprarenal->left renal
vein, superior gluteal from the posterior division of the internal iliac, testis T10
innervation, vas deferens mesonephric origin). 20 new concepts minted university-blind via
`mint-concept-id.mjs` conventions (all `CON-GIT-*`, SHA-256 first-14-hex, collision-checked
against 15618 IDs -- no collisions; note the minter requires a hyphen-free first canonical-key
segment), filed under DIS-ANA-T05 with SYS-GIT-T01-S01, grouped into a third article
(`ART-GIT-206DIG-ANATBANK-GROSS-3`); 0 concept reuse this pass (all 20 topics distinct from
tranches 1-2). Authored in `question/206-DIG-anatomybank-mcq-tranche3.md`, concepts appended to
`concept/206-DIG-anatomybank-concepts.md`, article appended to
`article/206-DIG-anatomybank-articles.md`. Gate-clean (batch 0 errors on all three; simulate
created=79/rejected=0/errors=0; audit neutral vs the 206-DIG baseline -- 24 placeholder families
[missing-optional-field / blank-without-reason / unknown-resource], 0 new/semantic categories).

206-DIG authored total now: 120 (2025 EOM) + 64 (2021 EOM) + 58 (anatomy bank: 20+18+20) = 242 MCQs.
**Next 206-DIG source:** continue this SAME anatomy bank -- OCR the still-untouched pp.33-54
(the bank is NOT yet exhausted at ~42% dupe; pp.33+ likely hold yet more past exams), then the
unsolved GIT/physio/histo dept banks (need a key-recovery pass) -- see
`coverage/KAU-Y2-priority-sources.md`.

anatbank-tranche-4 (pp.33-54 OCR'd this pass -- END OF THE 54-pp BANK; 18 authored): OCR'd
pp.33-44 (already done by an earlier full-doc pass) + pp.45-54 (--force this pass; p54 = blank
end sheet). These hold seven further past papers: exam F "2017" tail (p33 Q11-14), exam G
"Anatomy Meg Ques 2016" (pp.34-36), exam H "2015" (pp.37-40), exam I "2014" (pp.41-43), exam J
"2013" (pp.44-45), exam K "2012" (pp.46-49), exam L "2011" (pp.50-51), exam M "2010" (pp.52-53).
Keys recovered off the pen circle and appended to `coverage/206-DIG-anatomybank-triage-keys.txt`.
18/18 authored (f11,f12,g01,g09,h06,h08,h13,i01,i04,i05,i06,j01,j03,j04,k02,k06,k11,l03), 2 held
(j02 urorectal-septum contestable phrasing; m05 hydrocele double-circle), 3 fresh-but-deferred to
keep the slice at 18 (i11 peritoneal-layers-to-ileal-artery, l06 first-part-duodenum posterior
relations, l08 diaphragm embryological origins). ~19 keyed items skipped as near-duplicates of
already-authored 206-DIG content (plus many intra-tranche repeats: foregut derivative x3, gastric
lymph x2, gastrosplenic-splenectomy x2, colon lymph x2, diaphragm-phrenic x2, four-lumbar x2, SMA
branches EXCEPT x4). Dupe rate this pass ~40% of DISTINCT keyed concepts (NOT >60%, consistent
with tranches 2-3). Two candidates were dropped as CONFIRMED dupes when their concept already
existed (h07 anterior-right-kidney reuses CON-GIT-7A3BB7294BC022; i07 cystic-artery reuses
CON-GIT-61894DAB693687), and m04/m07 dropped because portalvenoussystem.tributaries /
mainpancreaticduct.formation concepts already exist. Systems covered: anterior abdominal wall
(rectus-sheath contents/pyramidalis, external-oblique aponeurosis derivatives, medial umbilical
fold), abdominal aorta (median sacral dorsal branch) & renal hilum (VAP), stomach (all-coeliac
arterial supply, coeliac lymphatic drainage), pancreas/duodenum (CBD behind head, portal vein
behind neck, GDA behind duodenal cap), spleen (left-9th-11th-rib surface relation, gastrosplenic-
ligament vessels), liver (ligamentum teres = left umbilical vein), peritoneum (posterior gastric
ulcer -> lesser sac), colon lymphatics, and gut development (liver = foregut, midgut extent,
urachal cyst). 17 new concepts minted university-blind (SHA-256 first-14-hex, collision-checked --
no collisions) + 1 minted for j03 (conjoint-tendon, minted rather than reusing the not-yet-live
CON-GIT-BEBB5A0EE5F6D0 to keep the batch self-contained) = 18 new `CON-GIT-*`, filed under
DIS-ANA-T05 with SYS-GIT-T01-S01, grouped into a fourth article (`ART-GIT-206DIG-ANATBANK-GROSS-4`).
Authored in `question/206-DIG-anatomybank-mcq-tranche4.md`, concepts appended to
`concept/206-DIG-anatomybank-concepts.md`, article appended to
`article/206-DIG-anatomybank-articles.md`. Gate-clean (batch 0 errors on all three; simulate 3
files self-contained created=95/rejected=0/errors=0; audit neutral vs the 206-DIG baseline -- 27
placeholder families [blank-without-reason / missing-optional-field / unknown-resource], 0 new/
semantic categories).

206-DIG authored total now: 120 (2025 EOM) + 64 (2021 EOM) + 76 (anatomy bank: 20+18+20+18) = 260 MCQs.
**THE ANATOMY MCQ BANK IS NOW FULLY TRIAGED (pp.1-54, p54 blank).** Next 206-DIG source = the
unsolved GIT/physiology/histology department banks in `coverage/KAU-Y2-priority-sources.md` (need
a fresh key-recovery/OCR pass; no more circle-keyed material remains in this anatomy bank).

## Biochemistry department bank — `Bio MCQ [GIT].pdf` (first NON-anatomy department bank)

First non-anatomy 206-DIG bank authored (sourceId `src_a5284e5337d583b3ff25`, tier 5,
Biochemistry Dpt / MCQs folder). Native-text (OCR-clean via `pagetext show`), 30 single-best
items, **UNKEYED** (0 marked answers on every page, confirmed by `pagetext keys`) — answers
**expert-determined** by biochemical reasoning per the 2026-09-07 Omar ruling, with per-option
rationale in each item's `explanations` and `field_notes.keySource` = "expert-determined, no
source key; rationale in explanations". STATUS=Draft.

biochem-bank1-tranche-1 (Q1,Q2,Q5): 3 authored — carbohydrate transport (SGLT1, GLUT5, muscle
GLUT4), 3 new `CON-GIT-*` concepts under DIS-BIO-T03 (Carbohydrate metabolism) + SYS-GIT-T01,
1 article `ART-GIT-206DIG-BIOCHEM-CARB-ABSORPTION`. Held: Q3 (2 defensible glucose transporters
in small intestine), Q4 (multi-true: lactase and beta-galactosidase statements both correct).
biochem-bank1-tranche-2 (Q6-Q15): 8 authored — carbohydrate (GLUT4, dietary pentose, cellulose
fibre, salivary amylase; DIS-BIO-T03) and lipid digestion (chylomicron transport, TAG synthesis,
bile-salt emulsification, micelle orientation; DIS-BIO-T04), 8 new concepts, 1 article
`ART-GIT-206DIG-BIOCHEM-DIGESTION-BASICS`. Held Q10 (renal-threshold stem ambiguous); skipped
Q14 (steatorrhoea — dupe of tranche-6 lipid-malabsorption concept), Q16 (internal dupe of Q13).
biochem-bank1-tranche-3 (Q17-Q25): 6 authored — lipoprotein lipase, pancreatic lipase (DIS-BIO-T04),
L-amino-acid absorption, glutathione synthesis (DIS-BIO-T05), phase I / phase II detoxification
(DIS-BIO-T07), 6 new concepts, 1 article `ART-GIT-206DIG-BIOCHEM-LIPASE-PROTEIN-DETOX`. Held
Q26 (all four options can cause fatty liver — ambiguous), Q27 (which vitamin deficiency spares
fatty liver — controversial), Q28 (betaine and choline both methyl donors — ambiguous), Q29
(niacin-megadose fatty-liver mechanism — niche/uncertain). Skipped as dupes of the tranche-6
liver-biochemistry cluster: Q23 (lipotropic/fatty liver), Q30 (VLDL export capacity).

Bank total: **17 authored** (Q1-25 slice), 6 held, 4 skipped-dupe; Q26-30 fatty-liver/detox
tail is dupe-saturated vs the already-authored tranche-6 liver biochemistry, so the bank is
effectively complete. All 17 minted concepts collision-checked (15618 IDs, no collisions);
concept files use the `---` record separator (parseMarkdown splits on `---`, NOT `# Item` —
a missing separator silently drops all but the last item). Gate-clean per slice (batch 0 errors
×3); combined simulate 10 files created=40/rejected=0/errors=0.

206-DIG authored total now: 260 + 17 (biochemistry bank) = **277 MCQs**. Next 206-DIG source =
remaining Biochemistry Dpt banks (`Bio [McQs] last exams [GIT].pdf`, `Bio EXAMS DIG.pdf`,
`BIO MCQ by Dr.Hanan [GIT].pdf`), then Physiology Dpt `Physio MCQ [GIT]` banks, then Histology
Dpt `histo MCQ_DIG-206.pdf` — see `coverage/KAU-Y2-priority-sources.md`.

## Remaining Biochemistry Dpt banks — dupe-saturated, SKIPPED

Read this pass and skipped as dupe-saturated re-treads of the already-authored biochem-bank1
(`Bio MCQ [GIT]`, src_a5284e5337d583b3ff25) + tranche-6 liver biochemistry corpus:
`Bio [McQs] last exams [GIT].pdf` (src_73b6280e7cfd2b7f110c, 8 items = fatty liver / lipid
transport / phase I-II detox — 7 of 8 map to existing concepts, 1 ambiguous) and
`Bio EXAMS DIG.pdf` (src_be64445f622bc872c473, 27 items — a near-exact superset of biochem-bank1:
lactase, pepsinogen, lipotropic, xenobiotics, cellulose, chylomicrons, steatorrhoea, fatty liver,
phase I/II, pancreatic lipase, dietary pentose, GLUT2, L-amino acids, B3/fatty liver, vitamin
deficiency, VLDL, bile salts, methyl donor). `BIO MCQ by Dr.Hanan [GIT].pdf` is image-only (no
text layer, needs an OCR pass). The three department `Physio MCQ [GIT]` banks (2023 / main /
revision) are likewise image-only. Next fresh native-text bank taken instead: Physiology Dpt
`Physio Extra MCQ by Dr Effat [GIT]`.

## Physiology department bank — `Physio Extra MCQ by Dr Effat [GIT]` (first NON-anatomy physiology dept bank)

First native-text Physiology department 206-DIG bank (sourceId src_7b173a573b072b0b0702, tier 5,
Physiology Dpt / MCQs folder, 15 pages, GI physiology). Native-text and **KEYED** — the bank
carries an Answers section with per-question rationale, so authored answers are taken from the
source key (`field_notes.keySource` = "source answer key (Dr Effat bank Answers section) with
rationale"), STATUS=Draft. First block of 25 items mixes prose 4-option single-best questions
(authored) with multi-column matrix/grid statement-set items (Q5,Q6,Q10-Q13,Q15-Q18,Q22 — held
as statement-sets); a second block from page 8 overlaps the Pretest GI bank.

physio-effat-tranche-1 (bank Q1-Q3): 3 authored — duodenocolic (gastrocolic) reflex and the
post-prandial urge to defecate (DIS-PHY-T05, GI motility), terminal-ileum vitamin B12 absorption
(GI absorption), and GIP as the GI hormone released by all three macronutrients (GI hormones).
3 new `CON-GIT-*` concepts minted university-blind (SHA-256, collision-checked — no collisions;
the GIP concept cross-links the existing CON-GIT-646EF2853FF707), 1 library article
`ART-GIT-206DIG-PHYSIO-EFFAT`. Gate-clean (batch 0 errors). Authored in
`question/206-DIG-physio-effat-mcq-tranche1.md`, `concept/206-DIG-physio-effat-tranche1-concepts.md`,
`article/206-DIG-physio-effat-articles.md`, seed `seed/206-DIG-physio-effat-tranche1.json`.

206-DIG authored total now: 277 + 3 (physio Effat t1) = **280 MCQs**.
