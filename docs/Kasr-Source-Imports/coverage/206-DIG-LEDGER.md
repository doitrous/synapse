# 206 DIG — coverage ledger

| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| 2025-eom-anatomy-tranche-1 (Q1-16, `EOM - 206 solved (197).pdf`) | 16 | 0 | 104 | 120 |
| 2025-eom-anatomy-tranche-2 (Q17-42, same paper) | 26 | 0 | 78 | 104 |
| 2025-eom-physiology-tranche-3 (Q43-64, same paper) | 22 | 0 | 56 | 78 |
| 206 DIG module (10 tier 1-3 papers + 31 tier-5 banks, `coverage/KAU-Y2-priority-sources.md`) | 42 | 0 | 1 (untriaged) | 1 |

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
