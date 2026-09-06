# 317 FMT — coverage ledger (Year 3, Forensic Medicine & Toxicology)

| cluster | authored | held | excluded | remaining | total |
|---|---:|---:|---:|---:|---:|
| abolmagd-r2 Forensic MCQ (Q32-51, `Forensic & Toxo Round 2 (197) SOLVED.pdf`) | 20 | 0 | 0 | 0 | 20 |
| abolmagd-r2 Clinical Toxicology MCQ (Q79-96, same paper) | 17 | 0 | 1 | 0 | 18 |
| **abolmagd-r2 cluster total** | **37** | **0** | **1** | untriaged | — |
| 317 FMT module (Forensic Medicine + Clinical Toxicology sub-corpora) | 37 | 0 | 1 | untriaged | — |

## Module opened

This is the FIRST authored content in Kasr Al Ainy **Year 3**, module **317 FMT**
(Forensic Medicine & Toxicology). Best solved paper picked from the 317 sources: the
student "Round 2 (197)" revision compilation by Abolmagd, `Forensic & Toxo Round 2 (197)
SOLVED.pdf` (manifest sourceId `src_2ef422afa7aa0aac43dc`, sha256
2ef422afa7aa0aac43dc3767708c61465850d41b84956961d806ffdf56556895; native text layer, 7
pages). The module's EOY papers (`EOY - Answers Final Forensic - Toxic 2024/2025`, the
`Forensic 197 final exam`) are essay/written model-answer exams, not MCQ, so they were not
used for this MCQ-authoring pass; the SOLVED Round-2 compilation is the best MCQ source with
recoverable keys. **Sitting year: none** — a Round-2 revision compilation tagged batch 197,
not a single dated sitting (manifest `examSittingYear`=null; a batch-197 EOY under the Y3 k=3
rule would be 197+1826+3 = 2026, recorded as a hint only). Field contract mirrors the opened
Year 3 module 310 PAT and the completed Year 2 modules.

## Answer-key method

Native text layer (no OCR). The correct answer is the option carrying a **YELLOW HIGHLIGHT
FILL**; detected with `node scripts/content/pagetext.mjs keys`, then **render-verified at
160-170 dpi** (mark-garbled → render → unmark) against pp.3-4 by eye. Every keyed answer is a
SINGLE yellow-highlighted option. Detector output across the MCQ pages: **37 keyed / 0
ambiguous / 0 unmarked**; render match on p3 (Q32-43) and p4 (Q44-51) was exact — **0
double-marks, 0 unmarked, 0 exclusions in the authored range Q32-51**. Recovered keys: see
`coverage/317-FMT-triage-keys.txt`.

## Paper structure

- Part A) Forensic Medicine — True/False Q1-31 (A/B boxes) — NOT authored (needs visual
  box-tick detection; deferred).
- Part B) Forensic Medicine — MCQ **Q32-51** (pp.3-4) — **this tranche, 20/20 authored**.
- Toxicology True/False Q52-78 (p.5) — not authored this pass.
- Part E) Clinical Toxicology — MCQ **Q79-90 (p6), Q92-96 (p7)** — **17/17 authored** this pass
  (`question/317-FMT-abolmagd-r2-toxicology-mcq.md`). Keys render-verified pp.6-7 at 165 dpi
  (yellow-highlight fill), 0 double-marks, 0 unmarked, 0 ambiguous.
- Part F) Antidote/drug matching Q97-100 — not MCQ, out of scope. **Q91 is absent from the
  paper** (numbering jumps 90→92; render-confirmed on p6/p7), recorded as 1 excluded (absent),
  not a missing key.

## Cluster — abolmagd-r2 forensic (Q32-51)

20/20 questions authored, **0 excluded, 0 held**. 20 new concepts minted university-blind
(`CON-FND-` + first 14 hex of SHA-256 of the canonical key, uppercased): one atomic fact per
question, no in-batch reuse. Collision-checked against 15618 corpus concept IDs — **no
collisions, no in-batch duplicates**. Forensic medicine has no body-system home, so the concept
system prefix is `FND` and the `## subject` is `fnd`; concepts are filed under the forensic
discipline nodes `DIS-FOR-T01` (Death and injury, 14), `DIS-FOR-T02` (Identification, 2),
`DIS-FOR-T03` (Sexual and child abuse, 1) and `DIS-FOR-T04` (Medical law, 3). Grouped into two
cross-linked library articles: `ART-FMT-317-FORENSIC-INJURY` (14 concepts) and
`ART-FMT-317-FORENSIC-LAWID` (6 concepts). Written from standard forensic-medicine teaching
corroborated by this paper's own yellow-highlight-keyed stems and options (render-verified
pp.3-4); no department book PDF was located/read this pass. All records carry
`publication_status=needs_evidence` / `status=Draft` pending attachment of a department source.

## Clinical Toxicology cluster — abolmagd-r2 toxicology (Q79-96)

17/17 MCQ authored (`question/317-FMT-abolmagd-r2-toxicology-mcq.md`, seed
`coverage/seeds/317-FMT/abolmagd-r2-toxicology.json`), **0 held, 1 excluded** (Q91 absent from
the paper). 17 new concepts minted university-blind (`CON-MUL-` + first 14 hex of SHA-256 of the
canonical key, uppercased), one atomic fact per question, subject `mul`, primary_node
`DIS-FOR-T05` (Clinical toxicology). Collision-checked against 9167 corpus concept IDs — **no
collisions, no in-batch duplicates**. Grouped into one new library article
`ART-FMT-317-TOXICOLOGY` (17 concepts; cross-linked to the two forensic articles). Keys
render-verified pp.6-7. All records `publication_status=needs_evidence` / `status=Draft` pending a
department source. Gate-clean (batch/simulate errors=0, rejected=0); audit adds **no new category
type** vs the 317-FMT baseline (all findings are the module-wide `needs_evidence` placeholders).

## Next cluster

Same paper, remaining sections need **visual box-tick detection** (not native-text keys):
Forensic True/False Q1-31 (p1-2), Toxicology True/False Q52-78 (p5), and the antidote/drug
matching Q97-100 (p7, not MCQ). The module's other papers (`EOY - Answers Final Forensic - Toxic
2024/2025`, `Forensic 197 final exam`) are essay/model-answer exams and remain untriaged for MCQ.
