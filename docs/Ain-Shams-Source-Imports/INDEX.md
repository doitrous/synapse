# Ain Shams source imports

Shared source foundation and audited production batches for Ain Shams Years 1, 2 and 3. Generated from `/Users/doitrous/Desktop/ain shams` without OCR, web facts, import, commit, push or publication.

Nothing in this folder has been imported. Local ASU curriculum claims are intentionally labelled `needs_evidence`, and their citations are local-curriculum, non-counting support; do not describe them as verified or publication-ready.

## Foundation files

| Year | Sources | Ready | Blocked | Duplicate | Media-only | Manifest | Academic | Coverage |
| --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| ASU_Y1 | 238 | 180 | 52 | 6 | 0 | [manifest](manifest/asu-y1-sources.json) | [academic](academic/asu-y1-structure.md) | [coverage](coverage/asu-y1-coverage.md) |
| ASU_Y2 | 501 | 310 | 164 | 21 | 6 | [manifest](manifest/asu-y2-sources.json) | [academic](academic/asu-y2-structure.md) | [coverage](coverage/asu-y2-coverage.md) |
| ASU_Y3 | 1403 | 872 | 347 | 150 | 34 | [manifest](manifest/asu-y3-sources.json) | [academic](academic/asu-y3-structure.md) | [coverage](coverage/asu-y3-coverage.md) |

Readable source index: [corpus-source-index.json](evidence/corpus-source-index.json), 1,965 source IDs (regenerated 2026-08-28 from `scripts/asu/build-source-index.ts`, which includes every manifest source — blocked/OCR'd ones too — not just the "readable" subset the stale checked-in file had; that staleness had been silently rejecting scanned-source citations, including Embryo 1's own already-shipped ASU-AE source, as "not a source the corpus contains").

## Production batches now present

| Year | Canonical module | Topic slice | Source basis | Folder files and item counts | Validation/evidence status |
| --- | --- | --- | --- | --- | --- |
| ASU_Y1 | `ASU-IBM` | Enzyme lecture 1 / medical enzymology | Native-text lecture source | evidence 1 source + 8 claims + 8 citations + 8 spans; resource 1 catalogue row; concept 4; article 2 | Batch validators reported 0 errors for supported files; article simulate/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting local curriculum support. |
| ASU_Y1 | `ASU-HCB` | Lysosomal membrane, acidification, formation and autophagy | Native-text Histology and Cell Biology lecture | evidence 1 source + 4 claims + 4 citations + 4 spans; resource 1 catalogue row; concept 4; article 2 | Cross-reviewed after metadata/duplicate-note repairs; supported validators and full simulation/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting. |
| ASU_Y1 | `ASU-GPHARM` | Enteral routes and oral dosage-form foundations | Native-text General Pharmacology practical slides | evidence 1 source + 5 claims + 5 citations + 5 spans; resource 1 catalogue row; concept 5; article 2 | Literal raw-page checks, dependency-aware validators and simulation/audit reported 0 errors for supported files. Claims are `needs_evidence`; citations are non-counting local curriculum support. |
| ASU_Y2 | `ASU-BLOOD` | Bleeding time, PT and aPTT pathway screens | Native-text Blood physiology practical lecture | evidence 1 source + 3 claims + 3 citations + 3 spans; resource 1 catalogue row; concept 3; article 2 | Reciprocal article links repaired; dependency-aware validators and full simulation/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting local curriculum support. |
| ASU_Y2 | `ASU-CVS` | Cardiac muscle ultrastructure | Native-text cardiovascular histology lecture | evidence 1 source + 3 claims + 3 citations + 3 spans; resource 1 catalogue row; concept 3; article 2 | Cross-reviewed after concept/article ownership repair; supported validators and full simulation/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting. |
| ASU_Y3 | `ASU-RES-METH-3` | Hypothesis testing, p-value decisions and errors | Native-text research-methodology department handouts | evidence 2 sources + 4 claims + 4 citations + 4 spans; resource 2 catalogue rows; concept 4; article 2 | Dependency-aware validators and full simulation/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting local curriculum support. |
| ASU_Y3 | `ASU-COMM` | Active and reflective listening | Native-text Communication Skills lecture | evidence 1 source + 4 claims + 4 citations + 4 spans; resource 1 catalogue row; concept 4; article 2 | Cross-reviewed after evidence-gap repair; supported validators and full simulation/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting. |
| ASU_Y1 | `ASU-AE` | Joint classification, synovial-joint structure and synovial-fluid functions | Native-text anatomy lecture | evidence 1 source + 3 claims + 3 citations + 3 spans; resource 1 catalogue row; concept 3; article 2 | Cross-reviewed; raw citations, all supported batch validators and full simulation/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting. |
| ASU_Y1 | `ASU-IMM` | Primary and secondary lymphoid organs | Native-text immunology lecture | evidence 1 source + 2 claims + 2 citations + 2 spans; resource 1 catalogue row; concept 2; article 2 | Cross-reviewed after article-template, candidate-pointer and reciprocal related-article repairs; all supported validators and full simulation/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting. |
| ASU_Y2 | `ASU-RESP` | Airway patency: tracheal/bronchial cartilage and bronchioles | Native-text respiratory histology practical lecture | evidence 1 source + 3 claims + 3 citations + 3 spans; resource 1 catalogue row; concept 3; article 2 | Independently cross-reviewed; raw citations, all supported validators and full simulation/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting. |
| ASU_Y3 | `ASU-UG` | Kidney external orientation and renal hilum arrangement | Native-text urogenital anatomy lecture | evidence 1 source + 4 claims + 4 citations + 4 spans; resource 1 catalogue row; concept 4; article 2 | Cross-reviewed after annotation and blank-review-reason repairs; raw citations, all supported validators and full simulation/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting. |
| ASU_Y1 | `ASU-BLS` | Presenting complaint, current illness, past history and social history | Native-text Clinical Skills history-taking lecture | evidence 1 source + 4 claims + 4 citations + 4 spans; resource 1 catalogue row; concept 4; article 2 | Exact raw-page checks, all dependency-aware validators and simulation/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting local curriculum support. |
| ASU_Y1 | `ASU-GPATH` | Low-power tissue observation and hyperplasia practical foundations | Native-text General Pathology practical slide deck | evidence 1 source + 3 claims + 3 citations + 3 spans; resource 1 catalogue row; concept 3; article 2 | Text-only slice; literal raw-page checks, dependency-aware validators and simulation/audit reported 0 errors. No diagnosis was derived from images. Claims are `needs_evidence`; citations are non-counting. |
| ASU_Y1 | `ASU-MBG` | Cytogenetic diagnostic techniques: karyotype, FISH and microarray | Native-text Molecular Biology and Medical Genetics lecture | evidence 1 source + 4 claims + 4 citations + 4 spans; resource 1 catalogue row; concept 4; article 2 | Literal raw-page checks, all dependency-aware validators and simulation/audit reported 0 errors for supported files. Claims are `needs_evidence`; citations are non-counting local curriculum support. |
| ASU_Y1 | `ASU-INF` | Sabouraud dextrose agar and MacConkey agar | Native-text microbiology practical deck | evidence 1 source + 2 claims + 2 citations + 2 spans; resource 1 catalogue row; concept 2; article 2 | Pending selective-media duplicate was removed after cross-review; taxonomy, literal raw-page checks, dependency-aware validators and simulation/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting local curriculum support. |
| ASU_Y1 | `ASU-LOCO` | Jobe supraspinatus test and cervical-lordosis inspection | Native-text locomotor clinical-medicine practical deck | evidence 1 source + 2 claims + 2 citations + 2 spans; resource 1 catalogue row; concept 2; article 2 | Cross-reviewed for source-only procedural wording; literal raw-page checks, dependency-aware validators and simulation/audit reported 0 errors. Claims are `needs_evidence`; citations are non-counting local curriculum support. |
| ASU_Y2 | `ASU-CNS-2` | MRC power grading and UMN/LMN examination patterns | Native-text official CNS faculty lecture | evidence 1 source + 2 claims + 2 citations + 2 spans; resource 1 catalogue row; concept 2; article 2 | Doubly indexed source handled without an unstable path; evidence-chain and clinical-skill placement repairs passed literal raw-page checks, dependency-aware validators and simulation/audit with 0 errors. |
| ASU_Y2 | `ASU-ENDO-2` | Thyroid follicle morphology, thyroglobulin cycling and C-cells | Native-text endocrine histology lecture | evidence 1 source + 3 claims + 3 citations + 3 spans; resource 1 catalogue row; concept 3; article 2 | Normal histology is placed under histology with endocrine-root cross-navigation, not a disease node; literal raw-page checks, dependency-aware validators and simulation/audit reported 0 errors. |
| ASU_Y1 | `ASU-AE` | Gametogenesis: spermatogenesis, oogenesis, ovulation, corpus luteum/pregnancy hormone support | Scanned/OCR'd MCQ answer bank, stems/options/key visually re-verified against rendered page images | evidence 1 source + 23 claims + 23 citations + 23 spans; resource 1 catalogue row; concept 25 (23 new + 2 sparse live overlays); article 3; question 36 | Triage flagged every MCQ source as scanned; picked the single best-keyed source and re-verified its answer key by rendering pages rather than trusting OCR (caught a row-offset illusion in the printed key table). Full 8-file simulation/audit reported 0 errors; question fieldsUsed 49/50, 0% explanations under 3 sentences. |
| ASU_Y1 | `ASU-AE` | Fertilization mechanics, placenta, twins (from the same MCQ series' "Embryo 2" file) | Scanned/OCR'd MCQ answer bank, stems/options/key visually re-verified against rendered page images at 230-500 DPI | evidence 1 source + 3 claims + 3 citations + 3 spans; resource 1 catalogue row; concept 10 (3 new + 7 sparse live overlays); article 2; question 21 | Of 68 usable items (1 excluded as a confirmed duplicate-option print defect), 47 resolved only to concepts already sitting in Kasr's or Alexandria's own unimported batches and were deferred (logged with stem/key/target id in `pending-live/ASU-AE-EMBRYO2-deferred-pending-concepts.md`) rather than authored against a concept id `medical:simulate` cannot resolve. Full 8-file simulation/audit reported 0 errors; question fieldsUsed 49/50, 0% explanations under 3 sentences. Also regenerated the stale `evidence/corpus-source-index.json` (see readable-source-index note above). |

## Import order

The root-level dependency order mirrors the manual and the Kasr analogue:

1. [`academic/`](academic/) — module-subject structures first.
2. [`evidence/`](evidence/) source rows — source IDs become checkable against the ASU corpus index.
3. [`resource/`](resource/) catalogue rows — preview in Bulk import → resource; see the validator limitation below.
4. [`concept/`](concept/) — concept IDs and module scope.
5. [`article/`](article/) — article records and reciprocal concept links.
6. [`evidence/`](evidence/) claims, citations, then spans — all local ASU claims stay `needs_evidence`; citations stay non-counting.
7. Run the full simulation/audit over the lane before any real import.

Catalogue-resource limitation: the current `medical:batch` kind detector reports these `resource/` files as `unknown`/catalogue-resource even though they are intended for Bulk import → resource. Check them by manual schema review and the import wizard preview until that validator branch is fixed.

## Folder map

| Folder | Holds | Local index |
| --- | --- | --- |
| [`manifest/`](manifest/) | ASU source manifests by year | [manifest/INDEX.md](manifest/INDEX.md) |
| [`academic/`](academic/) | Academic Setup import outlines | [academic/INDEX.md](academic/INDEX.md) |
| [`coverage/`](coverage/) | Coverage/blocker ledgers | [coverage/INDEX.md](coverage/INDEX.md) |
| [`evidence/`](evidence/) | Source rows, claims, citations, spans, and the corpus source index | [evidence/INDEX.md](evidence/INDEX.md) |
| [`resource/`](resource/) | Catalogue resource rows for Bulk import → resource | [resource/INDEX.md](resource/INDEX.md) |
| [`concept/`](concept/) | Concept import batches | [concept/INDEX.md](concept/INDEX.md) |
| [`article/`](article/) | Library article import batches | [article/INDEX.md](article/INDEX.md) |
| [`question/`](question/) | MCQ question import batches | (no per-folder INDEX.md yet, matching Alexandria/Kasr's own question folders) |

## Blockers and exclusions

- Scanned PDFs and corrupt/unreadable files stay blocked because OCR is out of scope.
- Media-only files are inventoried but omitted from the readable source index.
- Academic structures are folder/schedule-derived only; they do not claim chapter-level medical content.
- Learner-facing resource approval/deep links are rights-deferred where the resource rows say so.
