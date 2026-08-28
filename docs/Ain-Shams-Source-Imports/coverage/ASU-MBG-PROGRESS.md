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
| 1 · RNA types/post-transcriptional processing (partial) | 3 (Q3,7,9 — capping/poly-A) | 0 new (overlay CON-FND-5FF8EB2DB4D662) | author5, commit 1 |
| 2 · Transcription mechanism (partial — eukaryotic only, prokaryotic apparatus still open) | 15 (RNA pol I/II/III ×6, coding/template strand ×2, promoter/TATA/splicing ×4, tRNA-CCA aminoacylation ×4 minus 2 double-counted — see table below) | 0 new (4 overlays in Alexandria's AU-MED-102-biochem-molecular-concepts.md + 1 in Kasr's 102-INT-mcq-concepts.md) | author5, commit 1 |
| 3 · Genetic code properties (done) | 8 (Q1,2,3,5,34,39,40,47) | 0 new (overlay CON-FND-A1B0BFB9626438) | author5, commit 2 |
| 3 · Wobble/anticodon (done, was folded into cluster 3 in triage) | 2 (Q4, Q41) | 0 new (overlay CON-FND-FB17D0600C8D49) | author5, commit 2 |
| 4 · Mutation types & disease correlations (partial — transition/transversion/frameshift + nonsense/missense/silent done; other disease correlations e.g. Duchenne/thalassaemia/Huntington repeat-Qs from p.16-17 not yet authored) | 10 (Q6,23,24,29,43 on CON-FND-25E8976EFF0509; Q8,9,10,11,37 on CON-FND-4508AC0EA86F86) | 0 new (2 overlays, both in Kasr's 102-INT-mcq-concepts.md) | author5, commit 2 |
| 5 · Translation/protein synthesis (partial — start/stop codon recognition done; ribosome mechanics, peptidyl transferase, initiation factors etc. from "Translation Protein Synthesis Q1-59" not yet authored) | 4 (Q25,31,32,33) | 0 new (overlay CON-FND-09FACBDCBBF8FD) | author5, commit 2 |
| (reuse, no cluster) | 1 (Q36, topoisomerase shared enzyme) | 0 new — reused CON-FND-FFEE58EC9C0784, already ASU-tagged from author4 | author5, commit 1 |

Exact author5 question list (44 total, all from source file `EOM MCQs - Bg genetics final Mcqs
dr.Omar.pdf`):

Commit 1 ("RNA Structure & Transcription" chapter, Q1-106) — 20 questions:
- mRNA processing (CON-FND-5FF8EB2DB4D662): Q3, Q7, Q9 — 3
- RNA polymerase I/II/III (CON-FND-412F3EDF118F44): Q16, Q32, Q45, Q64, Q65, Q94 — 6
- Coding vs template strand (CON-FND-D717E6E7EEA466): Q29, Q69 — 2
- Eukaryotic transcription elements/TATA/splicing (CON-FND-CC55F157021237): Q39, Q75, Q93, Q96 — 4
- tRNA 3'-CCA aminoacylation (CON-FND-CA2D65E688434A): Q8, Q11, Q18, Q19 — 4
- Topoisomerase, reused (CON-FND-FFEE58EC9C0784): Q36 — 1

Commit 2 ("Genetic Codes" chapter, its own Q1-52, plus opening items of "Translation Protein
Synthesis" Q1-59) — 24 questions:
- Genetic code properties (CON-FND-A1B0BFB9626438): Q1, Q2, Q3, Q5, Q34, Q39, Q40, Q47 — 8
- Wobble/anticodon pairing (CON-FND-FB17D0600C8D49): Q4, Q41 — 2
- Transition/transversion/frameshift (CON-FND-25E8976EFF0509): Q6 (CF ΔF508), Q23, Q24, Q29, Q43 — 5
- Nonsense/missense/silent (CON-FND-4508AC0EA86F86): Q8, Q9, Q10, Q11, Q37 — 5
- AUG start/stop codon recognition (CON-FND-09FACBDCBBF8FD): Q25, Q31, Q32, Q33 — 4

Total = 20 + 24 = 44. Running lane total: 56 (author4) + 44 (author5) = **100 questions**.

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
| 1 · RNA types (superlatives) | Q1, Q2, Q10, Q12, Q14, Q15 (~6, "RNA Structure & Transcription" chapter) | tRNA highest-modified-nt / mRNA most-heterogeneous / RNA alkali-lability / min-20-tRNA-types / cloverleaf base-pairing — none found live/pending; would need 1-2 new concepts, article = `ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS` (pending, Kasr) which substantively covers tRNA cloverleaf/RNA types already | authorable next |
| 2 · Transcription mechanism (prokaryotic apparatus) | Q35, Q37, Q48, Q49, Q58, Q76, Q80, Q81 (~8, "RNA Structure & Transcription" chapter) | sigma factor, rho factor, Pribnow box (-10/-35), RNA-polymerase-holoenzyme — **zero hits anywhere** in live/pending search; no department-book article covers prokaryotic transcription (the two candidate articles, `ART-102-BIO-RNA-SYNTHESIS-TRANSCRIPTION` and `ART-FND-TRANSCRIPTION-CODE-TRANSLATION`, are both eukaryote-only). Needs either a new article authored from standard-textbook knowledge (field_notes disclosure, per 00-START-HERE §0/§5) or an Omar ruling on whether prokaryotic apparatus is in scope for this module | flagged — needs a new article, bigger lift |
| 3/4 · Genetic code remainder | Q7 (degenerate, redundant w/ Q1/Q2, skipped deliberately), Q12 (DMD→trinucleotide-repeat, wants a disease-correlation concept), Q13-22 (sickle-cell/thalassaemia/Huntington/DMD "mostly occur due to X mutation type" run, p.16-17), Q26-28, 30, 36, 38, 44-46 (codon-table lookups, mixed) | `CON-FND-4508AC0EA86F86` and `CON-FND-25E8976EFF0509` (both now +asu-tagged) cover most of these directly; Q13-16's specific disease→repeat-expansion mapping may want a new "trinucleotide repeat disease" concept — not yet searched | authorable next |
| 5 · Translation/protein synthesis remainder | "Translation Protein Synthesis" chapter Q7-59 (~53 Q): ribosome A/P/E sites, peptidyl transferase, initiation/elongation/termination factors, polysomes, post-translational modification (glycosylation, phosphorylation, ubiquitin) | Alexandria's `CON-FND-906B844C9AEE7D` (anticodon-codon), `CON-FND-A1FC2FAF9F0211` (cystine/cysteine) reusable for a couple; ribosome-mechanics/post-translational-modification concepts not yet searched — likely need a handful of new ones, or reuse of Kasr's 102-INT protein-synthesis concepts (same file already yielded 4 reusable concepts this pass, worth searching further before minting) | authorable next, largest remaining chunk in this file |
| 6 · Gene expression regulation | ~16+ Q in file 1's "Regulation of Gene Expression" section | **answers physically blacked out/redacted in the source scan** — genuine unrecoverable-key case (confirmed again this pass on p.15's own table having 2 blacked cells, Q17/Q82, same hazard pattern). `MCQs - Formative Gene expression gene therapy.docx` (4 items) also 0/4 keyed (plain-text extraction strips highlighting) | **blocked** — log needs-Omar, do not force |
| 7 · Modes of inheritance | ~52 Q (file 1, "Mode of Inheritance" section, keys recovered per triage) | **new** concept cluster, subject `fnd`; zero hits anywhere for anticipation/imprinting/AD-AR-X-linked patterns | authorable next, largest remaining chunk overall |
| (misc) | "Collection Questions" Q1-27, LMS snippets ~15, file 1 pp.33-49 (~17pp not yet opened — pp.20-28 now opened as the Genetic-Codes/Translation chapters), file 8 (essay) page count/remainder | unmapped | not yet triaged in detail |

## Page map confirmed this pass (PDF page index, via `pdftoppm`, cross-checked against printed page numbers where visible)

`EOM MCQs - Bg genetics final Mcqs dr.Omar.pdf`: pg1=cover, pg2=notes, pg3=Q1-9 (RNA Structure &
Transcription), pg4=Q10-17, pg5=Q18-25, pg6=Q26-34, pg7=Q35-43, pg8=Q44-52, pg9=Q53-61,
pg10=Q62-70, pg11=Q71-79, pg12=Q80-89(ish), pg13=Q90-98(ish), pg14=Q99-105, pg15=Q106 + the
RNA-Structure-&-Transcription answer table + Genetic Codes Q1-4, pg16=Genetic Codes Q5-12,
pg17=Q13-19 + codon table, pg18=Q20-27, pg19=Q28-35, pg20=Q36-44, pg21=Q45-52, pg22=Genetic
Codes answer table + Translation "Protein Synthesis" Q1-6, pg23=Q7-14, pg24=Q15-22, pg25=Q23-30,
pg26=Q31-37, pg27=Q38-45, pg28=Q46-52, pg29=Q53-59. The Translation chapter's own answer table
has not yet been located/read (needed before authoring cluster 5's remainder).

## Hazards confirmed this pass

- Q17 and Q82 of the RNA-Structure-&-Transcription answer table (p.15 of the PDF) are
  physically blacked-out/redacted cells, matching the same hazard already flagged for the
  Gene-Expression chapter — genuinely unrecoverable, not "not yet found". Both skipped.
- File-page-number citations in this batch use the PDF's own rendered page index (via
  `pdftoppm`), confirmed against three independent page renders (12, 14, 15) and
  cross-checked against the answer-key table's own internal consistency (Q25's calculation,
  Q29's and Q69's strand-direction derivations all matched the printed key) — high confidence
  the OCR/manual transcription is correct even though the source is a scanned photocopy.
