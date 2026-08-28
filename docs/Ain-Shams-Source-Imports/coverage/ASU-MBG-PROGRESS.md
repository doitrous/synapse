# ASU-MBG progress ledger

Tracks status against the 12 concept clusters in `ASU-MBG-triage.md`. Update this file, do not
recreate it, as each cluster closes.

## Done (author4/author5, branch `asu-mbg-author5`)

| Cluster | Qs authored | Concepts | Notes |
|---|---:|---|---|
| 10 · DNA/nucleotide chemistry | 24 (1 unkeyed, blacked cell) | 2 new | author4, commit 9b14aa42 |
| 11 · DNA replication | (within the 24 above) | — | author4, commit 9b14aa42 |
| 12 · DNA repair | (within the 24 above) | — | author4, commit 9b14aa42 |
| 8 · Chromosomal/numerical disorders | 32 (with cluster 9) | 5 overlay rows + 2 live-tag fixes | author4, commit 7e83c6b3 |
| 9 · Cytogenetic diagnostic techniques | (within the 32 above) | 1 new | author4, commit 7e83c6b3 |
| 1 · RNA types/post-transcriptional processing (partial) | 3 (Q3,7,9 — capping/poly-A) | 0 new (overlay CON-FND-5FF8EB2DB4D662) | author5, this commit |
| 2 · Transcription mechanism (partial) | 15 (RNA pol I/II/III ×6, coding/template strand ×2, promoter/TATA/splicing ×4, tRNA-CCA aminoacylation ×4 minus 2 double-counted — see table below) | 0 new (4 overlays in Alexandria's AU-MED-102-biochem-molecular-concepts.md + 1 in Kasr's 102-INT-mcq-concepts.md) | author5, this commit |
| (reuse, no cluster) | 1 (Q36, topoisomerase shared enzyme) | 0 new — reused CON-FND-FFEE58EC9C0784, already ASU-tagged from author4 | author5, this commit |

Exact author5 question list (20 total, all from source file `EOM MCQs - Bg genetics final Mcqs
dr.Omar.pdf`, "RNA Structure & Transcription" chapter, Q1-106):

- mRNA processing (CON-FND-5FF8EB2DB4D662): Q3, Q7, Q9 — 3
- RNA polymerase I/II/III (CON-FND-412F3EDF118F44): Q16, Q32, Q45, Q64, Q65, Q94 — 6
- Coding vs template strand (CON-FND-D717E6E7EEA466): Q29, Q69 — 2
- Eukaryotic transcription elements/TATA/splicing (CON-FND-CC55F157021237): Q39, Q75, Q93, Q96 — 4
- tRNA 3'-CCA aminoacylation (CON-FND-CA2D65E688434A): Q8, Q11, Q18, Q19 — 4
- Topoisomerase, reused (CON-FND-FFEE58EC9C0784): Q36 — 1

Total = 20. Running lane total: 56 (author4) + 20 (author5) = **76 questions**.

## Real starting state found by author5 (git vs the dispatch brief)

The dispatch brief described "56 MCQs across 2 clusters" — confirmed exact by reading
`git log` on `origin/asu-mbg-author4` (commits `9b14aa42`, `7e83c6b3`) and the two question
files' line counts. No PROGRESS.md existed on the branch; this file is the first one.
`ASU-MBG-triage.md` (commit `0989b972`) is the authoritative remaining-scope source — it names
12 clusters, all sourced from the same 8-file S1 triage pass.

## Remaining (not yet authored)

All still sourced from `EOM MCQs - Bg genetics final Mcqs dr.Omar.pdf` unless noted.

| Cluster | Rough Qs left | Key concepts still needed | Status |
|---|---:|---|---|
| 1 · RNA types (superlatives) | Q1, Q2, Q10, Q12, Q14, Q15 (~6) | tRNA highest-modified-nt / mRNA most-heterogeneous / RNA alkali-lability / min-20-tRNA-types / cloverleaf base-pairing — none found live/pending; would need 1-2 new concepts, article = `ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS` (pending, Kasr) which substantively covers tRNA cloverleaf/RNA types already | authorable next |
| 2 · Transcription mechanism (prokaryotic apparatus) | Q35, Q37, Q48, Q49, Q58, Q76, Q80, Q81 (~8) | sigma factor, rho factor, Pribnow box (-10/-35), RNA-polymerase-holoenzyme — **zero hits anywhere** in live/pending search; no department-book article covers prokaryotic transcription (the two candidate articles, `ART-102-BIO-RNA-SYNTHESIS-TRANSCRIPTION` and `ART-FND-TRANSCRIPTION-CODE-TRANSLATION`, are both eukaryote-only). Needs either a new article authored from standard-textbook knowledge (field_notes disclosure, per 00-START-HERE §0/§5) or an Omar ruling on whether prokaryotic apparatus is in scope for this module | flagged — needs a new article, bigger lift |
| 3 · Genetic code properties | not yet mapped to specific Q#s in file 1 (they exist in "Genetic Code & Translation Q1-65" per triage, Q1-4 of a second numbering run visible on p.15 already) | `CON-FND-A1B0BFB9626438` (degenerate/unambiguous/non-overlapping/universal) already pending in Alexandria's file, directly reusable | authorable next |
| 4 · Mutation types & disease correlations | not yet mapped | `CON-FND-DF5E3014A149FC` (transition/transversion), frameshift facts already pending in Alexandria's file | authorable next |
| 5 · Translation/protein synthesis | not yet mapped | `CON-FND-09FACBDCBBF8FD` (AUG start), `CON-FND-906B844C9AEE7D` (anticodon-codon), `CON-FND-A1FC2FAF9F0211` (cystine/cysteine) already pending in Alexandria's file | authorable next |
| 6 · Gene expression regulation | ~16+ Q in file 1's "Regulation of Gene Expression" section | **answers physically blacked out/redacted in the source scan** — genuine unrecoverable-key case (confirmed again this pass on p.15's own table having 2 blacked cells, Q17/Q82, same hazard pattern). `MCQs - Formative Gene expression gene therapy.docx` (4 items) also 0/4 keyed (plain-text extraction strips highlighting) | **blocked** — log needs-Omar, do not force |
| 7 · Modes of inheritance | ~52 Q (file 1, "Mode of Inheritance" section, keys recovered per triage) | **new** concept cluster, subject `fnd`; zero hits anywhere for anticipation/imprinting/AD-AR-X-linked patterns | authorable next, largest remaining chunk |
| (misc) | "Collection Questions" Q1-27, LMS snippets ~15, file 1 pp.20-28/33-49 (~26pp not yet opened), file 8 (essay) page count/remainder | unmapped | not yet triaged in detail |

## Hazards confirmed this pass

- Q17 and Q82 of the RNA-Structure-&-Transcription answer table (p.15 of the PDF) are
  physically blacked-out/redacted cells, matching the same hazard already flagged for the
  Gene-Expression chapter — genuinely unrecoverable, not "not yet found". Both skipped.
- File-page-number citations in this batch use the PDF's own rendered page index (via
  `pdftoppm`), confirmed against three independent page renders (12, 14, 15) and
  cross-checked against the answer-key table's own internal consistency (Q25's calculation,
  Q29's and Q69's strand-direction derivations all matched the printed key) — high confidence
  the OCR/manual transcription is correct even though the source is a scanned photocopy.
