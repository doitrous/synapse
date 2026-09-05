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
