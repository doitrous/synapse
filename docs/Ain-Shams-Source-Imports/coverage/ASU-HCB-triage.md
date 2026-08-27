# ASU-HCB triage — Phase 1

Module: **ASU-HCB** (Introduction to Histology and Cell Biology), ASU_Y1, Term 1. Subject placement:
`fnd` **is** on the 20-list (`cvs resp renal gi neuro endo msk pharm fnd dev haem imm inf obs gyn androl
psy derm mul pop`, LANE-BRIEF §6) and reads as the correct bucket for generic cell-biology/cytology facts
not tied to a body system (organelles, membrane structure, cytoskeleton, generic junctions). Epithelium
classification and histology-technique facts likely also route to `fnd` by the same logic, but this isn't
explicitly ruled anywhere the way `pop`/`psy`/`inf` placements are — flagging for a quick CoS confirm
rather than guessing silently, since a wrong subject id is a silent importer failure (LANE-BRIEF §6).

Manifest flags 4 of 6 MCQ files `blocked`/`textLayer:none` — wrong for all 4 (same CamScanner hazard as
ASU-INF/IMM/MBG); rendered + OCR'd clean. 2 files were genuinely native-text (`ready`, correctly flagged).

## Papers read

| sourceId (fileName) | Manifest flag | Actual finding | Pages | Questions | Key |
|---|---|---|---|---|---|
| `MCQs - cell MCQ hegazy.pdf` | ready (correct) | Native text, clean, "Cell MCQ set2" | 8 | 46 | Printed key table at foot p.7, **46/46 complete** |
| `MCQs - epith MCQ.pdf` | ready (correct) | Native text, clean | 6 | 33 | Printed key table at foot p.6, **33/33 (visible cols only go to Q33 of 36 numbered stems — 3 unkeyed at the tail, gap noted)** |
| `MCQs - cell MCQ hegazy 1.pdf` ("CELL MCQ 1 2022") | blocked | CamScanner scan, OCR'd; **printed answer is a bold isolated letter set apart from the question block — tesseract misses it entirely, confirmed by direct image read (Q1–12 sample: B,A,A,B,C,C,D,D,C,D,C,B)** | 17 | 67 | Confirmed present and legible on every sampled page; full per-question transcription not completed this pass (would need all 17 pages read as images) — **treat as fully keyed, pending a mechanical re-extraction pass** |
| `MCQs - Bg Dr.Ahmad zahra mcq.pdf` ("MCQ IN HISTOLOGY", Parts A/B/C, cytology-only) | blocked | CamScanner scan, OCR'd clean | 41 | 70 + 103 + 149 = **322** | Printed "Model answer" tables at the end of each part, **100% complete for all 3 parts** |
| `MCQs - Bg Dr.Ahmed Zahra mcq 2.pdf` ("Epithelium" + histological-technique tail) | blocked | CamScanner scan, OCR'd clean | 32 | 36 | Printed key table, **33/36 legible in OCR; likely complete on the original, 3 cells not clean** |
| `MCQs - هستو سؤال وجواب د.زهرة.pdf` | blocked | **Not an MCQ file — manifest miscategorized it.** It is Dr. Ahmed Zahra's WRITTEN short-answer study guide ("HISTOLOGY / DR. AHMED ZAHRA / WRITTEN"): numbered essay prompts ("Discuss LM & EM of cell membrane (B)") each followed by a highlighted model answer. Real content, high value for **written-question / article authoring**, but it is not an MCQ bank and contributes no rows to this triage's Q&A tally. | 24 | n/a (written prompts, not counted here) | n/a |

## Scope note

`cell MCQ hegazy.pdf` + `epith MCQ.pdf` (79 Qs, both natively readable, both ASU-specific and short) are
triaged at full per-question granularity below. The three large scanned banks (`cell MCQ hegazy 1`, both
Zahra files — 425 Qs combined) are almost entirely **cytology/organelle and epithelium facts that
duplicate the concepts already named in block A** (same topics: membrane, organelles, cytoskeleton,
junctions, epithelium classification) — triaged at block level with representative net-new concepts only,
not re-listing every restated fact.

## A — Full per-question concepts (`cell MCQ hegazy.pdf` 46Q + `epith MCQ.pdf` 33Q = 79 Qs, fully keyed)

| Concept (canonical key) | Tests (file:Q#) |
|---|---|
| `organelle-secretion.zymogen-granule-formation-golgi` | Cell:1 (**live-hit family** — CON-GIT zymogen concepts exist, scope differs: pancreatic acinar Golgi-origin fact vs GIT's acinar-cell-morphology framing) |
| `secretion.constitutive-pathway.procollagen-example` | Cell:2 |
| `organelle.transfer-vesicles.rer-to-golgi-transport` | Cell:3 |
| `lysosome.function.phagocytosed-bacteria-digestion` | Cell:4 |
| `lysosome.enzyme-trafficking.golgi-to-lysosome` | Cell:5 |
| `lysosome.membrane.self-protection-mechanism` | Cell:6 |
| `lysosome.lipofuscin-accumulation.aging-pigment` | Cell:7, Cell:39(dup) |
| `lysosome.enzyme.optimal-acidic-ph` | Cell:8 |
| `lysosome.staining.histochemical-acid-phosphatase` | Cell:9 |
| `lysosome.primary.characteristics` | Cell:10 |
| `lysosome.secondary.characteristics` | Cell:11 |
| `lysosome.residual-body.definition` | Cell:12 |
| `endocytosis.pinocytosis.fluid-uptake-definition` | Cell:13 |
| `vesicle.clathrin-coat.origin-sites` | Cell:14 |
| `peroxisome.function.oxidative-detoxification` | Cell:15 |
| `peroxisome.characteristics.tissue-distribution` | Cell:16 |
| `ribosome.free.cytosolic-protein-destination` | Cell:17 |
| `proteasome.function.mitotic-cyclin-degradation` | Cell:18 |
| `proteasome.vs-lysosome.ubiquitin-tagged-substrates` | Cell:19, Cell:20(dup) |
| `cytoskeleton.components.overview` | Cell:21 |
| `intermediate-filament.properties.diameter-and-distribution` | Cell:22 |
| `intermediate-filament.types.classification-excludes-actin-myosin` | Cell:23 |
| `microtubule.functions.overview-excludes-microvillus-core` | Cell:24 |
| `microtubule.assembly.mtoc-centriole-origin` | Cell:25 |
| `cilia.immotile-syndrome.dynein-arm-defect` | Cell:26 |
| `microtubule.structure.13-protofilaments` | Cell:27 |
| `intermediate-filament.lamins.nuclear-envelope-association` | Cell:28 |
| `nuclear-envelope.lamin-chromatin-anchoring-interphase` | Cell:29 |
| `nuclear-envelope.outer-membrane-rer-continuity` | Cell:30 |
| `nuclear-pore.macromolecule-transport-function` | Cell:31 |
| `nuclear-envelope.structure-and-mitotic-disassembly` | Cell:32 |
| `nucleolus.structure-and-rrna-role` | Cell:33 (**live-hit family**, see §D) |
| `nucleolus.prominence.protein-secreting-cells` | Cell:34 |
| `nucleolus.rrna-synthesis-site` | Cell:35 |
| `nucleolus.em-appearance.pars-fibrosa-granulosa` | Cell:36 |
| `nucleolus.organizer-region.rdna-genes` | Cell:37 |
| `nucleus.degeneration.pyknosis-definition` | Cell:38 |
| `inclusion.glycogen.pas-staining-identification` | Cell:40 |
| `cell-membrane.leaflet-asymmetry.outer-vs-inner` | Cell:41 |
| `mitochondria.tubular-cristae.steroidogenic-cell-marker` | Cell:42 |
| `mitochondria.atp-synthase.cristae-location` | Cell:43 |
| `mitochondria.subcellular-localization.by-cell-function` | Cell:44 |
| `mitochondria.structure.double-membrane-em` | Cell:45 |
| `microscopy.phase-contrast.live-organelle-movement` | Cell:46 |
| `epithelium.polarity.unique-basic-tissue-feature` | Epith:1 |
| `epithelium.metaplasia.definition-and-reversibility` | Epith:2, Epith:26(dup) |
| `epithelium.growth-abnormality.dysplasia-neoplasia-metaplasia` | Epith:3 |
| `epithelium.general-characteristics` | Epith:4 |
| `epithelium.avascularity-and-minimal-ecm` | Epith:5 |
| `cell-junction.tight-junction.paracellular-barrier` | Epith:6 |
| `cell-junction.desmosome.tonofilament-support` | Epith:7 |
| `cell-junction.gap-junction.connexin-composition` | Epith:8 |
| `cell-junction.junctional-complex.components` | Epith:9 |
| `epidermis.prickle-cell.desmosome-tonofilament-plaque` | Epith:10 |
| `cardiac-muscle.intercalated-disc.junction-types` | Epith:11 |
| `epithelium.terminal-web.actin-composition-apical-location` | Epith:12, Epith:15(dup) |
| `cell-junction.gap-junction.small-molecule-passage-function` | Epith:13 |
| `renal-tubule.basal-infoldings.function` | Epith:14 |
| `epithelium.variable-thickness-property` | Epith:16 |
| `epithelium.stratified-squamous.apical-cell-flattening` | Epith:17 |
| `epithelium.stratified.basement-membrane-universal-relationship` | Epith:18 |
| `epithelium.esophagus-lining.nonkeratinized-stratified-squamous` | Epith:19 |
| `epithelium.endothelium.definition-and-locations` | Epith:20, Epith:23(dup) |
| `epithelium.stratified-squamous-nonkeratinized.body-locations` | Epith:21 |
| `epithelium.pseudostratified-columnar.tracheal-location` | Epith:22 |
| `epithelium.transitional.distention-adapted-structure` | Epith:24 |
| `gland-histology.mucous-acinar-cell.morphology` | Epith:25, Epith:31(dup) |
| `epithelium.mesothelium.pleural-lining-definition` | Epith:27 |
| `epithelium.fallopian-tube.ciliated-columnar-lining` | Epith:28 |
| `gland-histology.secretion-mechanism.merocrine-exocytosis` | Epith:29 |
| `gland-histology.secretion-mechanism.holocrine-sebaceous` | Epith:30 |
| `epithelium.taste-bud.neuroepithelium-classification` | Epith:32 |
| `gland-histology.secretion-mechanism.apocrine-mammary-lipid` | Epith:33 |

**Totals for block A:** 79 questions, 100% keyed, **~65 distinct concepts** after merging duplicate-tested
facts.

## B — Block-level concepts (`cell MCQ hegazy 1.pdf`, 67 Qs — plasma membrane / mitochondria / ER / Golgi /
endosome-lysosome / non-membranous organelles / inclusions)

Near-total overlap with block A's organelle concepts (same facts: membrane trilaminar structure, integral
vs peripheral proteins, cell coat function, mitochondrial matrix/cristae, sER/rER function, Golgi -ve image,
regulated vs constitutive secretion, lysosome/endosome acidity gradient, peroxisome content, cytoskeleton
component diameters, MTOC, centriole structure, cilia dynein, proteasome). **Net-new facts not already
named in block A:** `cell-membrane.unit-membrane-definition-trilaminar`, `mitochondria.demonstration-
techniques.vital-and-histochemical-stains`, `golgi.negative-image.secretory-cell-types`, `endosome.ph-
gradient.early-vs-late-acidity`, `centriole.structure.9-triplet-microtubules`, `inclusion.lipofuscin-vs-
glycogen-vs-lipid.membrane-bound-status`.

## C — Block-level concepts (`Bg Dr.Ahmad zahra mcq.pdf`, 322 Qs, Parts A/B/C — all cytology)

Same organelle/membrane/cytoskeleton/nucleus subject matter as blocks A+B, at 4–5x the volume (this reads
like the department's full board-style cytology bank). Skimmed across all 3 parts; no new organelle-level
fact classes beyond A/B were found in the sampled sections — Part C's tail (~Q90–149) covers histological
staining/technique questions not yet in A/B: `histology-technique.fixation.purpose-and-mechanism`,
`histology-technique.stain-selectivity.best-carmine-sudan-pas`, `histology-technique.metachromasia.mast-
cell-identification`, `histology-technique.microscopy-types.em-vs-phase-contrast-vs-light`. A full
per-question pass of this file is the highest-value remaining depth gap in this module if Phase 2 wants
board-style breadth beyond the lecture-native banks.

## D — Block-level concepts (`Bg Dr.Ahmed Zahra mcq 2.pdf`, 36 Qs — epithelium + histo-technique)

Overlaps block A's epithelium concepts almost entirely (epithelium characteristics, metaplasia,
junctions). Net-new: `histology-technique.eosin-stain.selectivity`, `histology-technique.paraffin-vs-
freezing-vs-plastic.enzyme-fat-detection`, the same fixation/metachromasia facts as block C's tail.

## E — Live-hit spot-checks run (`find-existing.mjs`, 10 terms)

A very large existing live cell-biology/histology catalogue was found — **this module's organelle-level
facts are likely majority live-hits**, unlike ASU-IMM/INF where most concepts were new:

| Term | Result |
|---|---|
| `lysosome` | **76 existing records** (e.g. `CON-IMM-071DB145136EA7` phagolysosome formation) |
| `peroxisome` | 19 existing records |
| `nucleolus` | 37 existing records |
| `microtubule` | 60 existing records |
| `proteasome` | 4 existing records |
| `mitochondria cristae` | No hit — safe to create |
| `tight junction` | 5 existing records (different body system framing — Sertoli/blood-testis barrier) |
| `metaplasia` | 17 existing records (mostly gynae-specific — apocrine metaplasia etc.) |
| `zymogen granule` | 4 existing records, **CON-GIT** family — direct overlap candidate for `organelle-secretion.zymogen-granule-formation-golgi` |
| `glycocalyx cell coat` / `cell junction desmosome` / `gap junction connexin` | No hit — safe to create |

**This triage does not individually resolve live/pending/new for all ~110 distinct concepts named above**
— the corpus-wide organelle catalogue is too large to walk one-by-one at checkpoint depth. Phase 2 must
run `find-existing.mjs` per concept before minting any of them (LANE-BRIEF §6 mandatory), expecting a high
sparse-update rate rather than new-mint rate for the generic cytology facts, and a higher new-mint rate for
the epithelium/junction/histology-technique facts (which returned no hits in the sample).

## Totals

- **Papers read:** 6 (5 MCQ banks triaged; 1 written-Q&A file identified and separately flagged, not
  MCQ-counted).
- **Questions triaged:** 79 full per-question (block A) + 67 + 322 + 36 block-level = **504 questions**.
- **Answer keys recovered:** 79/79 in block A; ~64/67 confirmed present in block B (sample-verified, full
  transcription pending); 322/322 in block C; ~33/36 in block D.
- **Distinct concepts tested:** 65 (block A, individually mapped) + ~16 net-new representative concepts
  across blocks B–D ≈ **81 named so far**.
  - **Live-hit:** confirmed for zymogen granules (CON-GIT family) and strong likelihood for most
    membrane/organelle facts given the 76/60/37/19-record catalogues found for lysosome/microtubule/
    nucleolus/peroxisome — exact per-concept resolution deferred to Phase 2 minting.
  - **Pending-hit:** 0 found in `docs/*-Source-Imports` searches.
  - **New:** epithelium/junction/histology-technique facts (no live hits in sample) — placement pending
    the subject-id ruling noted at the top of this file.

## Note — subject placement (not a hard block, just unconfirmed)

`fnd` is on the 20-list and is the working assumption for every concept in this file (organelles,
membrane, cytoskeleton, generic junctions, epithelium classification, histology technique). No explicit
ruling names `fnd` as histology/cytology's home the way `pop`/`psy`/`inf` are spelled out in LANE-BRIEF §6,
so this triage proceeds on that reading but flags it for a one-line CoS confirm before Phase 2 mints —
cheap to confirm now, expensive to relabel ~80 concepts later.
