# 207 END — coverage ledger

| cluster | authored | held | excluded | remaining | total |
|---|---:|---:|---:|---:|---:|
| 2024-eom-histology-tranche-1 (Q1-26, `EOM - END-207 2024 ANS.pdf`) | 25 | 0 | 1 | 82 | 108 |
| **2024 EOM paper total** (`EOM - END-207 2024 ANS.pdf`) | **25** | **0** | **1** | **82** | **108** |
| 207 END module (10 tier 1-3 papers + 3 dept books + 6 banks, `coverage/KAU-Y2-priority-sources.md`) | 25 | 0 | 1 | untriaged | — |

## Module opened

This is the first tranche of the 207 END module (Kasr Al Ainy Year 2, "Endocrine &
Reproductive Systems"). Best solved tier-2 paper picked from the 207 END section of
`coverage/KAU-Y2-priority-sources.md`: `EOM - END-207 2024 ANS.pdf` (manifest sourceId
`src_2d00db5decd243a861ea`, sha256 2d00db5decd243a861ea82701e8208db547c5ed5a3b841fced9128792b189832;
EOM, printed exam date 16/4/2024, solved, 108 MCQs, 11 pages, 54 marks). **Sitting year
2024** (calendar label on the file; manifest `examSittingYear`=2024). Field contract mirrors
the completed 206 DIG module.

## Answer-key method

No native text layer (scanned PDF) — OCR'd at default settings via
`scripts/content/pagetext.mjs ocr --force`. The correct answer is a **solid red/orange
circle drawn over the option letter**; the OCR transcribes the circled letter as `@`.
Confirmed genuine by rendering pp.1, 2 and 3 (the whole Q1-26 range of this tranche) at
170 dpi and checking every circled option against the OCR `@` markers by eye — **all three
pages matched exactly, 0 disagreements**, with one genuine double-mark caught (Q10, below).
Recovered keys (26/26 read; 25 clean, 1 ambiguous): see `coverage/207-END-triage-keys.txt`.

## Section map of the paper

Q1-26 **Histology** (endocrine glands Q1-8, male reproductive Q9-16, female reproductive
Q17-26); **Anatomy** begins at Q27 (p.4). This tranche authored the Histology section only.

## Tranche 1 — Histology (Q1-26)

25/26 questions authored (Q1-9, Q11-26), **1 excluded**: **Q10** is a genuine double-mark —
two options are circled in red on the paper (c. Tubuli recti AND d. Ejaculatory ducts; OCR
reads "@ Tubuli recti @ Ejaculatory ducts"). The single-best-answer key is therefore
ambiguous, so per protocol Q10 is excluded rather than guessed. 0 held.

25 new concepts minted university-blind via `mint-concept-id.mjs` (8 `CON-END-*` endocrine-
gland, 7 `CON-AND-*` male reproductive, 10 `CON-GYN-*` female reproductive), checked against
15618 live/import-ready IDs — no collisions, no duplicates in-batch. Filed under
`DIS-HIS-T03` (Organ histology) with `SYS-END` / `SYS-AND` / `SYS-GYN` (and `SYS-OBS-T01`
for the placenta concept) system cross-nav. Grouped into three library articles by system.
No Histology department book PDF was located/read this pass; concepts and articles are
written from standard teaching (Junqueira/di Fiore level) corroborated by this exam paper's
own keyed stems and options (render-verified against the OCR `@` reading).

Authored in `question/207-END-2024eom-histology-mcq.md`,
`concept/207-END-histology-concepts.md`, `article/207-END-histology-articles.md`. Source
registered in `evidence/207-END-resources.md`. Gate-clean (batch 0 errors; simulate
created=25/rejected=0; audit neutral vs the module baseline — no new error category).

## Next cluster

**82 questions remain on this paper: Q27-108.** Next author starts at **Q27 (Anatomy,
p.4)** — Q27-38 Anatomy are on pp.4; the paper then continues with Anatomy and Physiology
across pp.5-11. Q27-108 are OCR'd but **not yet individually render-verified** — spot-render
each page against the OCR `@` reading before trusting it (see the OCR-misread caution in the
206 DIG ledger). 9 more tier 1-3 papers, 3 department books and 6 banks for this module are
entirely untriaged.
