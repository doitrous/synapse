# ASU-MBG triage — Molecular Biology and Medical Genetics, Ain Shams Y1 Term 1

S1 triage only. Nothing minted. Read via the Read tool directly on every source regardless of
the manifest's `extractionDisposition`/`textLayer` flag (confirmed unreliable — several files
flagged `blocked`/`none` were fully readable).

## Sources read (8 of the manifest's `MCQs`-category rows for ASU-MBG, plus the module's essay paper)

| # | File | Format | Pages/items sampled | Chapters found | Keys |
|---|---|---|---:|---|---|
| 1 | `EOM MCQs - Bg genetics final Mcqs dr.Omar.pdf` | MCQ, 57pp, "Biochemistry Academy" (Bg) compiled revision booklet — **NOT an official sat EOM paper despite the filename**; hazard: filename says "EOM"+"final" but is a private tutoring compilation | pp.1-19, 29-32, 50-57 sampled (26pp — 20-28, 33-49 — NOT opened this pass, real gap) | RNA Structure & Transcription (Q1-106), Genetic Code & Translation (Q1-65, same numbering run), Regulation of Gene Expression (Q1-16+, continues past sampled range), Mode of Inheritance (Q1-52), Collection Questions (Q1-27), mixed LMS-exported single-mark questions (~15, pp.54-57) | RNA-Transcription 106/106 (table p.13); Genetic-Code/Translation 65/65 (table p.29); Gene-Expression 0/16+ (answers physically blacked out/redacted in this copy — genuine unrecoverable-key case); Mode-of-Inheritance 52/52 (table p.50); Collection 27/27 (table p.53); LMS snippets ~15/15 (boxed answer per item) |
| 2 | `MCQs - Bg MCQs revision Dr.Omar.pdf` | MCQ, 35pp, same academy, different compilation | pp.1-5, 30-35 sampled; pp.6-29 not opened but chapter-1's own answer table (p.30) spans Q1-149 and confirms existence+keys without needing every page image | Nucleotide chemistry-Replication-Repair (Q1-149), Chromosomal Aberrations (Q1-20), How to Study Chromosomes (Q1-12) | 149 keyed (1 blacked cell, Q46, unrecoverable) → 148/149; 20/20 (table); 12/12 (table) |
| 3 | `MCQs - Group (B) Formative_Summative_ DNS Structure, Repication and Repair MCQ 2020.pdf` | MCQ, 3pp | full | DNA Structure (4), DNA Replication (6), DNA Repair (3) | 13/13 inline |
| 4 | `MCQs - DEC_2022_Formative_Q_for enetic code Translation post translational.docx` | MCQ, 5 items | full (via `textutil -convert txt`, Read tool cannot open .docx directly) | tRNA/translation basics | **Duplicate of file 1, p.56** (identical stems) — not double-counted |
| 5 | `MCQs - Formative Gene expression  gene therapy.docx` | MCQ, 4 items | full | Regulation of gene expression (cis-elements, chromatin, splicing, demethylase) | 0/4 — plain-text extraction strips highlighting; would need image-rendered inspection, not done this pass |
| 6 | `MCQs - Formative McQ questions DNA structure.pdf` | MCQ, 3 items | full | Nucleic acid chemistry | 3/3 (colored text) |
| 7 | `MCQs - Genetics Lectures 5&6 Formative Qs.pdf` | MCQ (6) + short-answer (3) | full | Nucleotide/DNA chemistry, Chargaff's rule, double-helix features | 9/9 (highlighted/inline) |
| 8 | `EOM - Bg genetics final essay Dr.Omar.pdf` | Written essay Q&A, same academy | pp.1-3 only (page count and remainder NOT verified this pass — real gap) | Nucleotide/DNA structure, DNA Replication, DNA Repair | ≥8/8 sampled (model answers given for every item) |

Not checked at all this pass: `Bg genetics dr.omar gene regulation.pdf` (categorised `Lectures`, not `MCQs`, in the manifest — likely a slide deck, not an assessment; unverified).

## Totals (sampled, not exhaustive — see gaps above)

Questions triaged: **≈499** (281 + 181 + 13 + 4 + 3 + 9 + ~8; the 5-item docx duplicate excluded).
Keys recovered: **≈478** (265 + 180 + 13 + 0 + 3 + 9 + 8).
Real gaps not yet triaged: file 1 pp.20-28/33-49 (~26pp), file 8's page count/remainder, `Bg genetics dr.omar gene regulation.pdf` unopened.

## Distinct concept clusters (collapsed from the ~499 questions) and classification

`find-existing.mjs` run per shortest distinctive word; live = server/data/medical-library-v1.json hit,
pending = hit in another lane's unimported batch (named), new = no hit anywhere.

| # | Concept cluster | Classification | Evidence |
|---|---|---|---|
| 1 | RNA types/structure & post-transcriptional processing (capping, splicing, poly-A) | pending | overlaps `docs/Kasr-Source-Imports/102-INT-*`, `docs/Alexandria-Source-Imports/.../AU-MED-102-biochem-molecular-concepts.md` |
| 2 | Transcription mechanism (RNA pol I/II/III, promoters, TATA box, termination) | pending | AU-MED-102-biochem-molecular covers promoter/TFIIH mechanics |
| 3 | Genetic code properties (degeneracy, wobble, universality) | pending | `wobble` hit: `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` (wobble-hypothesis-and-anticodon-pairing) |
| 4 | Mutation types & disease correlations (frameshift, nonsense, missense; sickle cell/thalassemia/CF/DMD/Huntington) | pending | `frameshift` hit: AU-MED-102-biochem-molecular |
| 5 | Translation/protein synthesis (ribosome, tRNA charging, peptidyl transferase, aminoacyl-tRNA synthetase, polycistronic mRNA) | pending | `peptidyl transferase`, `okazaki`-adjacent hits: AU-MED-102-biochem-molecular |
| 6 | Gene expression regulation (methylation, enhancers/silencers, alternative splicing, epigenetics) | pending | `alternative splicing` hit: AU-MED-102-biochem-molecular, Kasr 102-INT article |
| 7 | Modes of inheritance (AD/AR/X-linked/mitochondrial/multifactorial, anticipation, genomic imprinting, pedigree probability) | **new** | `anticipation`, `autosomal dominant`, `imprinting` — zero hits anywhere |
| 8 | Chromosomal/numerical disorders (trisomies, monosomy, translocation, non-disjunction, karyotype notation e.g. 46,XY,+16) | live + pending mix | `trisomy` is live (`CLM-DEV-243DD717D2FDA3`, Down syndrome); other numerical-disorder items (Turner/Klinefelter/cri-du-chat specifics) not individually re-checked |
| 9 | Cytogenetic diagnostic techniques (conventional/high-res karyotyping, FISH, microarray) | **pending-hit, same lane** | `docs/Ain-Shams-Source-Imports/concept/ASU-MBG-chromosome-analysis-concepts.md` + `.../article/ASU-MBG-chromosome-analysis-articles.md` already cover this exact topic |
| 10 | DNA/nucleotide chemistry & structure (Chargaff's rule, B/A/Z-DNA forms, nucleosome/histone structure) | pending | overlaps AU-MED-102-biochem-molecular / Kasr biochemistry batches (not individually re-verified per sub-topic) |
| 11 | DNA replication mechanism (helicase/primase/ligase/pol I & III, leading/lagging strand, proofreading, telomerase) | pending | `okazaki`, `telomerase` hits: AU-MED-102-biochem-molecular |
| 12 | DNA repair systems (base excision repair, mismatch repair) | pending | `mismatch repair` hit: AU-MED-102-biochem-molecular |

**Totals: distinct concepts 12 · live-hit 1 (partial — cluster 8 is mixed) · pending-hit 10 · new 1.**
(Cluster counts, not raw-question counts, per the manual's dedupe rule — many of the ~499 sampled
questions are near-duplicate probes of the same fact, especially across files 1 and 2 which share
an author/academy and cover the same curriculum twice.)

## Placement for the new concept

Cluster 7 (Modes of inheritance / clinical genetics patterns) → subject `fnd` (general
genetics principles, not organ-system-specific) per the 20-subject list and LANE-BRIEF placement
guidance; sits under `ASU-MBG > Medical Genetics and Molecular Biology > Modes of inheritance`.

## Hazards hit this pass

- Two files literally named "EOM ... final" are private "Biochemistry Academy" (Bg) revision
  compilations, not official sat papers — filename-based tier assumptions are unsafe here.
- One chapter's answers are physically blacked out/redacted in the scanned copy (Regulation of
  Gene Expression, file 1) — a genuine no-recoverable-key case distinct from "not yet found".
- `.docx` files are not readable by the Read tool directly; `textutil -convert txt -stdout` on
  macOS works but strips highlighting, so a docx-only key (color/highlight-marked) cannot be
  confirmed without opening it some other way — flagged, not guessed.
- File 4 is a byte-for-byte duplicate (same stems) of content already inside file 1 — a de-facto
  name-twin across different source folders, not caught by the manifest's twin detector because
  the twin logic only compares files within the same folder tree.

## Not yet triaged (real gaps, not padded)

- File 1 pages 20-28 and 33-49 (≈26 pages, likely more Regulation-of-Gene-Expression + a bridge
  chapter into Mode-of-Inheritance).
- File 8's total page count and any content after page 3.
- `Bg genetics dr.omar gene regulation.pdf` (categorised as a lecture, not opened).
