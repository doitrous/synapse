# ASU-MBG progress ledger

Tracks status against the 12 concept clusters in `ASU-MBG-triage.md`. Update this file, do not
recreate it, as each cluster closes.

## Done (author6, branch `asu-mbg-author6`, base `asu-mbg-author5` @ 2e8f8145)

**Cluster 7 · Modes of inheritance — CLOSED, all 52 questions authored.**

12 new concepts (subject `fnd`, zero live/pending hits found on search — genuinely new per triage),
2 new `TPL-CONCEPT` articles teaching all 12, full evidence chain (12 claims, 12 citations, 2 spans),
and one resource record closing a real gap (see below). All 52 questions from the "Mode of
Inheritance" chapter authored, keys recovered from the chapter's own answer table (PDF p.50).

| Concept | ID | Qs |
|---|---|---:|
| Genotype/phenotype/allele | `CON-FND-C37775BB2D8741` | Q4-7 |
| Zygosity states | `CON-FND-9D8C8CCF783D24` | Q8-13 |
| Autosomal dominant pattern | `CON-FND-398856B4B32D8E` | Q2, Q14, Q28, Q31, Q33, Q40, Q45, Q51 |
| New mutation → sporadic AD | `CON-FND-B8CDB276EC9E25` | Q3, Q50 |
| Autosomal recessive pattern | `CON-FND-87B8D24E724816` | Q22, Q27, Q32, Q34, Q35, Q44 |
| X-linked dominant pattern | `CON-FND-70936F91A4C8E5` | Q23, Q26, Q36 (shared), Q46 |
| X-linked recessive pattern | `CON-FND-592065F09E7EC8` | Q21, Q24, Q25, Q36 (shared), Q37, Q41, Q47, Q49 |
| Y-linked (holandric) | `CON-FND-613ADDD5AAE5EA` | Q38, Q39 |
| Mitochondrial pattern | `CON-FND-2ECC10B655DD47` | Q15-17 |
| Genomic imprinting (PWS/Angelman) | `CON-FND-12961F079B4C89` | Q18, Q19, Q29 |
| Trinucleotide repeat/anticipation | `CON-FND-A385468E42B123` | Q20, Q30, Q42, Q48, Q52 |
| Multifactorial risk factors | `CON-FND-D1119AD6424AF0` | Q43 |
| (reused, no new concept) | `CON-DEV-451A64C9445CAB` (author4's euploidy/aneuploidy concept) | Q1 (triploid ploidy arithmetic) |

Articles: `ART-FND-MENDELIAN-INHERITANCE-PATTERNS` (9 concepts), `ART-FND-NON-MENDELIAN-INHERITANCE-PATTERNS`
(3 concepts). Files: `concept/ASU-MBG-modes-of-inheritance-concepts.md`, `article/ASU-MBG-modes-of-
inheritance-articles.md`, `question/ASU-MBG-modes-of-inheritance-mcq.md`, `evidence/ASU-MBG-modes-of-
inheritance-{claims,citations,spans}.md`.

**Side fix, not a triage cluster:** `src_d83a3017c760e2770c22` — the resource id for the whole
`EOM MCQs - Bg genetics final Mcqs dr.Omar.pdf` source, already cited by author5 on 24+ live-pending
RNA/genetic-code questions and one concept — had never been registered in the evidence store (no
`## processing_status`/`## institution` record existed anywhere). Registered it in
`evidence/ASU-MBG-molecular-genetics-sources.md`. The repo's `evidence/corpus-source-index.json` was
also stale (1362 sources, missing this one and others); regenerated via
`node --experimental-strip-types scripts/asu/build-source-index.ts` → 1965 sources, all three ASU-year
manifests merged. Any ASU citation that previously failed `medical:batch` with "not a source the
corpus contains" should be re-checked against the fresh index before assuming it's still broken.

Gates (full chain, all four files together): `medical:batch` clean with `--with` naming the concept/
article/resource siblings plus the Kasr `104-CPS-histology{,-concepts}.md` + ASU `pending-live/
ASU-MBG-molecular-genetics.md` files (needed to resolve the reused `CON-DEV-451A64C9445CAB`);
`medical:simulate` (positional, apply order) `delta: {articles:2, concepts:12, claims:12, citations:12,
resources:1, articleSpans:2, questions:52}`, `skipped: []`, `errors: []`; `medical:audit --source`
0 errors traceable to any of these 12 concepts, 2 articles or 52 questions by exact-id filtering (the
349 total errors on the full simulated state are pre-existing gaps in the Kasr/pending-live sibling
files pulled in only to resolve the Q1 dependency — not introduced by this batch). Difficulty mix
across the 52: Easy 33% / Moderate 44% / Hard 19% / Challenging 4% (within the 15pp drift band of the
bank target, so `medical:batch` raised no note).

**Traceable share:** 52/52 questions traceable to a `main_concept` that is covered by one of the two
new articles (or, for Q1, by the pre-existing `ART-104-HIS-NUMERICAL-ABERRATIONS`) — 100%.

Commits on `asu-mbg-author6`: `92b60f7e` (concepts+articles+evidence+resource-registry-fix),
`029526a5` (Q1-13), `36eca534` (Q14-26), `e241f3f5` (Q27-39), `d794444c` (Q40-52). Pushed to origin.

**Ruling applied (chief-of-staff, this session's brief):** Cluster 6 (Gene expression regulation)
left alone per ruling — unrecoverable blacked-out key, not re-triaged, not touched.

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
| 5 · Translation/protein synthesis (whole chapter — corrected count) | "Translation Protein Synthesis" chapter is its own Q1-65 (not ~59 as previously estimated), fully separate numbering from "Genetic Codes." **None of it authored yet** — the four questions author5 tagged Q25/31/32/33 onto `CON-FND-09FACBDCBBF8FD` are Genetic-Codes-chapter numbers (p.16-17, before the Genetic Codes table on p.22), not Translation-chapter numbers, so that overlay does not reduce this count. Ribosome A/P/E sites, peptidyl transferase, aminoacyl-tRNA synthetases, initiation (Shine-Dalgarno, formyl-Met, 5' cap recognition), elongation/translocation, termination, polycistronic mRNA, post-translational modification (phosphorylation/ubiquitylation/glycosylation/acetylation/hydroxylation) — a genuinely large concept set, comparable in size to Cluster 7. | **Answer table now located** this pass: PDF page 30 (printed "29"), "Answers of RNA Translation," a single table covering Q1-65 in one block (not split). Not authored this session — full authoring deferred per "stop after 1-2 clusters"; this is the resume-first target. Alexandria's `CON-FND-906B844C9AEE7D` (anticodon-codon), `CON-FND-A1FC2FAF9F0211` (cystine/cysteine) reusable for a couple of items; not otherwise searched this pass. |
| 6 · Gene expression regulation | ~16+ Q in file 1's "Regulation of Gene Expression" section | **answers physically blacked out/redacted in the source scan** — genuine unrecoverable-key case (confirmed again this pass on p.15's own table having 2 blacked cells, Q17/Q82, same hazard pattern). `MCQs - Formative Gene expression gene therapy.docx` (4 items) also 0/4 keyed (plain-text extraction strips highlighting) | **blocked** — log needs-Omar, do not force. Do not re-triage per chief-of-staff ruling this session. |
| 7 · Modes of inheritance | **CLOSED this pass (author6) — see the "Done" section above.** | — | done |
| (misc) | "Collection Questions" Q1-27, LMS snippets ~15, file 1 pp.33-49 (~17pp not yet opened — pp.20-28, 30 now opened as the Genetic-Codes/Translation chapters and its answer table; pp.33-52 opened this pass while authoring cluster 7, no unrelated content of note beyond the "Molecular Biology of Cancer" chapter noted below), file 8 (essay) page count/remainder | unmapped | not yet triaged in detail |
| (new finding, unmapped) | A "Molecular Biology of Cancer" chapter sits between "Regulation of Gene Expression" and "Mode of Inheritance" in file 1 (PDF pp.~34-42ish; its own "Answers of Gene Therapy" table seen on PDF p.44/printed "42" covers only a CRISPR/gene-therapy sub-section, Q1-24 — the earlier cancer-biology items, e.g. p53/Rb/apoptosis/retrovirus questions seen on PDF p.40, printed "39," numbered ~Q37-44, must have their own earlier table not yet located). Not in the original 8-source triage's cluster list at all. | Not triaged, not authored, not keyed. | needs full S1 triage before any authoring |

## Page map confirmed this pass (PDF page index, via `pdftoppm`, cross-checked against printed page numbers where visible)

`EOM MCQs - Bg genetics final Mcqs dr.Omar.pdf`: pg1=cover, pg2=notes, pg3=Q1-9 (RNA Structure &
Transcription), pg4=Q10-17, pg5=Q18-25, pg6=Q26-34, pg7=Q35-43, pg8=Q44-52, pg9=Q53-61,
pg10=Q62-70, pg11=Q71-79, pg12=Q80-89(ish), pg13=Q90-98(ish), pg14=Q99-105, pg15=Q106 + the
RNA-Structure-&-Transcription answer table + Genetic Codes Q1-4, pg16=Genetic Codes Q5-12,
pg17=Q13-19 + codon table, pg18=Q20-27, pg19=Q28-35, pg20=Q36-44, pg21=Q45-52, pg22=Genetic
Codes answer table + Translation "Protein Synthesis" Q1-6, pg23=Q7-14, pg24=Q15-22, pg25=Q23-30,
pg26=Q31-37, pg27=Q38-45, pg28=Q46-52, pg29=Q53-59. The Translation chapter's own answer table
has not yet been located/read (needed before authoring cluster 5's remainder).

## Page map extended this pass (author6)

pg30 = Translation "RNA Translation" chapter's own answer table, Q1-65 (corrects the previous
"~59" guess — the chapter runs one number higher and the table is a single unsplit block).
pg33 = tail of "Regulation of Gene Expression" (Q17-24, cis/trans-acting elements, histone
acetylation) with "Answers of Regulation of Gene expression" bleeding through as ghost text from
the next page — that gene-expression answer table itself was not re-opened this pass (already
flagged blacked-out/unrecoverable by the prior pass, see Hazards). pg34-43ish = a "Molecular
Biology of Cancer" chapter not in the original 8-source triage at all (p53, Rb, retroviruses,
apoptosis, CRISPR/gene therapy) — pg40 (printed "39") showed Q37-44 on p53/apoptosis/retroviruses,
pg44 (printed "42") showed Q18-24 on CRISPR/gene editing with its own "Answers of Gene Therapy"
table (Q1-24) — meaning the cancer-biology sub-section (Q1-~36ish) has an earlier table not yet
located, and the whole chapter is unmapped and untriaged. pg44 (printed "43") = Mode of Inheritance
Q1-9, confirming this chapter's own start; pg44-50 covers all 52 of its questions plus its own
answer table on pg50 (see the "Done" section above for the full breakdown).

## Hazards confirmed this pass

- Q17 and Q82 of the RNA-Structure-&-Transcription answer table (p.15 of the PDF) are
  physically blacked-out/redacted cells, matching the same hazard already flagged for the
  Gene-Expression chapter — genuinely unrecoverable, not "not yet found". Both skipped.
- File-page-number citations in this batch use the PDF's own rendered page index (via
  `pdftoppm`), confirmed against three independent page renders (12, 14, 15) and
  cross-checked against the answer-key table's own internal consistency (Q25's calculation,
  Q29's and Q69's strand-direction derivations all matched the printed key) — high confidence
  the OCR/manual transcription is correct even though the source is a scanned photocopy.
