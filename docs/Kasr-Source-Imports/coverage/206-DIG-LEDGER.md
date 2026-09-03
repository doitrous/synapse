# 206 DIG — coverage ledger

| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| 2025-eom-anatomy-tranche-1 (Q1-16, `EOM - 206 solved (197).pdf`) | 16 | 0 | 104 | 120 |
| 2025-eom-anatomy-tranche-2 (Q17-42, same paper) | 26 | 0 | 78 | 104 |
| 206 DIG module (10 tier 1-3 papers + 31 tier-5 banks, `coverage/KAU-Y2-priority-sources.md`) | 42 | 0 | 1 (untriaged) | 1 |

Tranche 1: 16/16 questions authored (Q1-16), 0 held. Tranche 2: 26/26 questions authored
(Q17-42, all Anatomy — posterior abdominal wall/retroperitoneal vasculature and nerves,
anterolateral wall/inguinal canal, hepatobiliary/splenic/GI clinical anatomy), 0 held.
Three tranche-2 items (Q23 Meckel's diverticulum, Q25 epiploic foramen posterior boundary,
Q40 left gastric artery/coeliac trunk) reuse existing concepts (two from other
universities' pending lanes, one from this module's own tranche 1) instead of minting
near-duplicates. 78 remaining questions on this same paper (Q43-120: Physiology, Histology,
Biochemistry) are OCR'd (`206-DIG-triage-keys.txt`) but not individually re-verified by
render past Q42 — tranche 2 rendered pp.4, 5, 6, 7 and 10 (spot checks within Q17-42's own
range, all matching), so pp.8, 9, 11-16 (Q43-120) are still unverified by render. 9 more
tier 1-3 papers and 31 tier-5 banks for this module are entirely untriaged.

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
