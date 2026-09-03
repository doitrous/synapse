# 206 DIG — coverage ledger

| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| 2025-eom-anatomy-tranche-1 (Q1-16, `EOM - 206 solved (197).pdf`) | 16 | 0 | 104 | 120 |
| 206 DIG module (10 tier 1-3 papers + 31 tier-5 banks, `coverage/KAU-Y2-priority-sources.md`) | 16 | 0 | 1 (untriaged) | 1 |

16/16 questions authored from this pass's scope (Q1-16 of the paper), 0 held. 104
remaining questions on this same paper are OCR'd (`206-DIG-triage-keys.txt`) but not
individually re-verified by render past Q16. 9 more tier 1-3 papers and 31 tier-5 banks
for this module are entirely untriaged.

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
