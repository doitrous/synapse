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

## Cluster 13 · Molecular Biology of Cancer (author11 this pass) — new chapter, not in the S1 list above

Found sitting inside file 1 (`EOM MCQs - Bg genetics final Mcqs dr.Omar.pdf`), between "Regulation of
Gene Expression" (Cluster 6, blacked-out key, left alone) and "Mode of Inheritance" (Cluster 7,
closed). Never triaged before this pass — author6/7's notes only spotted its existence and mis-guessed
its table location. Read directly (rendered `pdftoppm -r 150`, all 6 pages checked page-by-page against
the printed table, no highlight/blackout hazard on this chapter — clean scan throughout).

**Page map (PDF page index):** pg35=Q1-5, pg36=Q6-13, pg37=Q14-21, pg38=Q22-28, pg39=Q29-36,
pg40=Q37-44, pg41="Answers of molecular biology of cancer" table (Q1-44, all 44 cells present, none
blacked out) — then a new heading "Gene Therapy" starts its own separate Q1-8+ run immediately below
the same page, confirming the two chapters are printed back-to-back but are **separate answer-keyed
units**. Gene Therapy is **out of scope for this pass** (not named in this session's orders; flagged
below as a new open item for the next dispatch, not triaged or authored here).

**44/44 questions recovered with keys**, cross-checked for internal consistency against independent
priors (Q7 Philadelphia=9:22 not the AML 15:17 or CML-mimic distractors; Q28 caspases=cysteine
proteases not aspartate; Q40 retrovirus enzyme=reverse transcriptase; Q42 effector caspase=Caspase-3
alone, not the "9 and 3"/"8 and 3" combination distractors) — all logically consistent with the
printed table, high confidence.

### Per-question table

| Q | Stem (short) | Key | Concept | Classification |
|---:|---|---|---|---|
| 1 | Occurs in G1's restriction point | d) RB protein is phosphorylated | Rb/E2F restriction-point control | new |
| 2 | Occurs during G1/S transition | e) Rb hyperphosphorylated | Rb/E2F restriction-point control | new |
| 3 | Proto-oncogenes NOT converted to oncogene by | d) Proto-oncogene deletion | Proto-oncogene activation mechanisms | new |
| 4 | Apoptosis is | a) Essential to normal development | Apoptosis causes (physiological/pathological) | pending-hit `CON-FND-A40D59DAB245EA` |
| 5 | Rb and p53 both regulate transition from | e) G1 to S | Rb/E2F restriction-point control | new |
| 6 | FALSE regarding cell cycle | d) Rb gene drives cells into cycle (false — it restrains) | Rb/E2F restriction-point control | new |
| 7 | Philadelphia chromosome translocation between | a) 9:22 chromosomes | Structural chromosomal aberrations (reused, already ASU-tagged) | **live-tagged-by-this-lane** `CON-DEV-D2BA4082190B3F` |
| 8 | RB gene is a/an | a) Tumor suppressor gene | Proto-oncogene/TSG definitions | new |
| 9 | Inactivation of ___ leads to cancer | a) tumor suppressor genes | Proto-oncogene/TSG definitions | new |
| 10 | All true about Apoptosis EXCEPT | a) Inflammation is present | Apoptosis morphology | pending-hit `CON-FND-46B3AD5A2D8294` |
| 11 | Similarity proto-oncogene/TSG | a) Both control cell division | Proto-oncogene/TSG definitions | new |
| 12 | NOT a tumor suppressor gene | d) Cyclin | Proto-oncogene/TSG definitions | new |
| 13 | NOT an oncogene | c) CDKIs | Proto-oncogene/TSG definitions | new |
| 14 | Function of RB gene protein | e) A regulator of the cell cycle | Rb/E2F restriction-point control | new |
| 15 | A cancer cell is characterized by | e) All of these | Cancer-cell hallmark features | new |
| 16 | All true about proto-oncogenes EXCEPT | d) Expressed only when transformed (false) | Proto-oncogene/TSG definitions | new |
| 17 | Proto-onc→oncogene by all EXCEPT | a) Elimination of start signals | Proto-oncogene activation mechanisms | new |
| 18 | TSG best described by | b) Loss-of-function → uncontrolled proliferation | Proto-oncogene/TSG definitions | new |
| 19 | All true about p53 EXCEPT | b) Causes G1-S transition (false — it halts it) | p53 DNA-damage response | new |
| 20 | Can result in tumor suppression EXCEPT | e) Hyperphosphorylation of Rb | Rb/E2F restriction-point control | new |
| 21 | Checkpoint halted if DNA damaged | d) G1-S | p53 DNA-damage response | new |
| 22 | Mechanism does NOT activate proto-oncogene | e) Promotor deletion | Proto-oncogene activation mechanisms | new |
| 23 | Kinase phosphorylating many proteins through cycle | b) Cyclins (cyclin-CDK) | Cyclin-CDK/restriction point (reused) | pending-hit `CON-FND-FF40DB9ED068F9` |
| 24 | Correct statement about Rb protein | b) Binds E2F, mitogenic signal releases it → S phase | Rb/E2F restriction-point control | new |
| 25 | Accurately compares TSG and proto-oncogenes | a) Proto-onc code growth factors; TSG inhibit division | Proto-oncogene/TSG definitions | new |
| 26 | Can stimulate cell cycle | e) Growth factor | Proto-oncogene/TSG definitions | new |
| 27 | NOT a character of apoptotic cell | d) It swells and ruptures | Apoptosis morphology | pending-hit `CON-FND-46B3AD5A2D8294` |
| 28 | Caspase enzymes means | d) Contain cysteine in active site | Caspases general (reused) | pending-hit `CON-FND-70E5BD77E8FE49` |
| 29 | Initiator caspase, intrinsic pathway | c) Caspase 9 | Caspase cascade — initiator/effector/apoptosome | new |
| 30 | Initiator caspase, extrinsic pathway | b) Caspase 8 | Caspase cascade — initiator/effector/apoptosome | new |
| 31 | Effector caspase, extrinsic pathway | a) Caspase 3 | Caspase cascade — initiator/effector/apoptosome | new |
| 32 | Effector caspase, intrinsic pathway | a) Caspase 3 | Caspase cascade — initiator/effector/apoptosome | new |
| 33 | Apoptosome contains all EXCEPT | c) Procaspase 8 | Caspase cascade — initiator/effector/apoptosome | new |
| 34 | Direct activator of procaspase 8 | c) Adaptor protein | Caspase cascade — initiator/effector/apoptosome | new |
| 35 | NOT an example of apoptosis | d) Myocardial infarction | Apoptosis causes (physiological/pathological) | pending-hit `CON-FND-A40D59DAB245EA` |
| 36 | NOT in intrinsic apoptotic pathway | d) Caspase 8 | Caspase cascade — initiator/effector/apoptosome | new |
| 37 | NOT true about p53 | e) Activates antiapoptotic gene (false — it's pro-apoptotic) | p53 DNA-damage response | new |
| 38 | p53 property preventing cancer | a) Prevents replication of damaged-DNA cells | p53 DNA-damage response | new |
| 39 | Retroviruses produce a tumor cell by | d) Promotor insertion | Retroviral oncogenesis | new |
| 40 | Enzyme retroviruses need to produce a tumor cell | a) Reverse transcriptase | Retroviral oncogenesis | new (contextual reuse: Alexandria `CON-FND-874F418DFB12AF`) |
| 41 | Correct statement about Rb protein | a) Binds E2F, prevents S-phase entry | Rb/E2F restriction-point control | new |
| 42 | Effector caspase(s) that initiate cell death | c) Caspase-3 | Caspase cascade — initiator/effector/apoptosome | new |
| 43 | Components of apoptosome | b) Cytochrome C, Apaf-1, procaspase-9 | Caspase cascade — initiator/effector/apoptosome | new |
| 44 | Mechanism of p53 as cell-cycle regulator | c) Activation of p21 gene expression | Cell-cycle/apoptosis regulators (reused) | pending-hit `CON-FND-1F66060A9C2625` |

### Concept classification summary

| # | Concept cluster | Qs | Classification | Evidence / disposition |
|---|---|---:|---|---|
| 13.1 | Rb/E2F control of the G1 restriction point | 1,2,5,6,14,20,24,41 (8) | **new** | `find-existing.mjs "Rb E2F"` / "restriction point" (latter hit only the CDK-cyclin concept below, not Rb-specific) — no hit. Mint `CON-FND-05748BDCBE10A5` (`rb.e2f.restriction-point-control`) |
| 13.2 | Proto-oncogene vs tumor-suppressor-gene definitions & examples | 8,9,11,12,13,16,18,25,26 (9) | **new** | `find-existing.mjs "proto-oncogene"`, "tumor suppressor" (only hit an article alias + glossary term, not a teaching concept), "loss of function tumor suppressor", "gain of function oncogene" — all no concept hit. Mint `CON-FND-1BCB86AE1C6B66` (`oncogene.proto-oncogene-vs-tumor-suppressor-gene.definitions`) |
| 13.3 | Proto-oncogene→oncogene activation mechanisms (translocation/amplification/insertion/point mutation, not deletion) | 3,17,22 (3) | **new** | `find-existing.mjs "proto-oncogene activation mechanisms"`, "chromosomal translocation cancer" — no hit. Mint `CON-FND-76604784CC143B` (`oncogene.activation.proto-to-active-mechanisms`) |
| 13.4 | Retroviral oncogenesis (promoter insertion + reverse transcriptase requirement) | 39,40 (2) | **new** | `find-existing.mjs "retrovirus oncogene"` no hit; "reverse transcriptase" hit only Alexandria's generic RT-mechanism concept (`CON-FND-874F418DFB12AF`, DNA-replication framing, no retrovirus-oncogenesis objective) — linked as `related_concept_ids`, not reused as main. Mint `CON-FND-4A768CDB232E77` (`retrovirus.oncogenesis.promoter-insertion-mechanism`) |
| 13.5 | p53 as guardian of the genome — DNA-damage response (Mdm2, DNA-repair activation, G1-S checkpoint halt, apoptosis if irreparable) | 19,21,37,38 (4) | **new** | `find-existing.mjs "p53"` hit only the broad pending cell-cycle/apoptosis-regulators concept (below), whose own definition has no Mdm2/DNA-repair/"guardian" clause — the granular DNA-damage-response facts these 4 questions test are absent from it. Mint `CON-FND-B03C1C16A79323` (`p53.dna-damage-response.guardian-of-genome`) |
| 13.6 | Caspase cascade — initiator/effector caspases per pathway + apoptosome composition + FADD/adaptor activation | 29,30,31,32,33,34,36,42,43 (9) | **new** | `find-existing.mjs "initiator caspase"`, "effector caspase", "apoptosome Apaf-1" — all no hit; the pending general-caspase concept (below) never numbers caspases or lists apoptosome components. Mint `CON-FND-BBCC9BC05C8C5F` (`apoptosis.caspase-cascade.initiator-effector-apoptosome`) |
| 13.7 | Cancer-cell hallmark features (uncontrolled division, invasion, metastasis, apoptosis resistance) | 15 (1) | **new** | `find-existing.mjs "cancer cell characteristics hallmarks"` — no hit. Mint `CON-FND-CF3FFDEA6D271F` (`cancer.cell-hallmarks.phenotype`) |
| 13.8 | Cell-cycle/apoptosis regulatory proteins (cyclin-CDK, p53→p21/Bax, Bcl-2 family, TNF/FAS) | 44 (1) | **pending-hit** | `CON-FND-1F66060A9C2625`, `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` — sparse update (`+asu`), written to `pending-live/` |
| 13.9 | Cyclin-CDK complexes / restriction-point control (mechanism level) | 23 (1) | **pending-hit** | `CON-FND-FF40DB9ED068F9`, same file — sparse update to `pending-live/` |
| 13.10 | Caspases general (cysteine proteases, extrinsic/intrinsic pathways, CADase) | 28 (1) | **pending-hit** | `CON-FND-70E5BD77E8FE49`, same file — sparse update to `pending-live/` |
| 13.11 | Apoptosis morphology (shrinkage, intact membrane, blebs/bodies; not swelling/rupture) | 10,27 (2) | **pending-hit** | `CON-FND-46B3AD5A2D8294`, `docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md` — sparse update to `pending-live/` |
| 13.12 | Apoptosis causes (physiological: embryogenesis/menstruation/breast-involution; pathological: viral-infected-cell death) | 4,35 (2) | **pending-hit** | `CON-FND-A40D59DAB245EA`, same file — sparse update to `pending-live/` |
| 13.13 | Structural chromosomal aberrations / Philadelphia chromosome (9;22 reciprocal translocation) | 7 (1) | **reused, already ASU-tagged** | `CON-DEV-D2BA4082190B3F` already carries `+asu`/`+ASU_Y1`/`+ASU-MBG` from this lane's own Cluster 8/9 pass — plain reuse, no new overlay row needed |

**Totals: distinct concepts touched 13 · new (mint) 7 · pending-hit (sparse update) 5 · reused/already-ASU-tagged 1.**
All 44 questions map to a named concept — 0 unmapped, 0 deferred within this chapter.

### Article homes

Neither existing pending article the reused concepts point to (`ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-
TUMOR-SUPPRESSOR-GENES` for 13.8/13.9/13.10; `ART-108-PAT-APOPTOSIS` for 13.11/13.12) teaches Rb/E2F,
oncogene/TSG definitions, activation mechanisms, retroviral oncogenesis, p53's DNA-damage-response
detail, cancer-cell hallmarks, or numbered initiator/effector caspases + apoptosome composition — the
7 new concepts need teaching homes. Plan: two new minimal `TPL-CONCEPT` articles, cross-linked to the
three existing pending articles above plus `ART-104-HIS-STRUCTURAL-ABERRATIONS` (Philadelphia):
- `ART-FND-ONCOGENES-AND-TUMOR-SUPPRESSOR-GENES` — teaches 13.1-13.5 and 13.7 (Rb/E2F, proto-onc/TSG
  definitions, activation mechanisms, retroviral oncogenesis, p53 DNA-damage response, cancer hallmarks).
- `ART-FND-CASPASE-CASCADE-AND-APOPTOSOME` — teaches 13.6 (initiator/effector caspases, apoptosome).

Placement: subject `fnd` (general cancer-genetics principles, not organ-system-specific), module_subject
`ASU-MBG > Medical Genetics and Molecular Biology > Lectures > Molecular Biology of Cancer`.

### New finding, not yet triaged (next dispatch)

A **"Gene Therapy" chapter** starts immediately after this chapter's own answer table on the same PDF
page (pg41), with its own separate "Answers of Gene Therapy" table located later (pg44 per author6's
earlier page-map note) covering its own Q1-24 (germline vs somatic gene therapy, restriction
endonucleases, palindromic sequences, molecular cloning, plasmids). Not named in this session's
dispatch orders, not triaged, not authored. `find-existing.mjs` spot-checks ("restriction endonuclease
palindromic", "gene therapy germline somatic") returned no hits — likely fully new content, flagged for
the orchestrator to scope into a future dispatch.

### TRIAGE — self-consistent, proceeding to Phase 2 authoring per this session's explicit dispatch order
("Triage... first... [then] Author its questions" — one task, no external approval gate named for this
chapter). No `Cluster 6`-style hazard found on this chapter (clean scan throughout, full 44/44 keyed).
