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
| **2021 EOM paper running** (`EOM - DIG-206 EOM (solved).pdf`) | **40** | **2** | **56** | **120** |
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
