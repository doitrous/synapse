# ASU-IMM triage — Phase 1

Module: **ASU-IMM** (Immunology), ASU_Y1, Term 1. Subject placement for every concept below: `imm`
(direct — the 20-list already has `imm`, LANE-BRIEF §6).

Manifest flags nearly every MCQ file `blocked`/`textLayer:none` — **wrong for all 5**, same hazard already
found in ASU-INF/ASU-MBG. All 5 are CamScanner photo-scans; `pdftotext` gives 0 words on 4 of them
(`part 2`, `Bg. MCQs immune`, `hegazy`, and `Bg Immune Dr.Ashraf mcq` — only "CamScanner" watermark text),
one (`cytokines.pdf`) has a genuine native text layer. Rendered pages at 150–200dpi + `tesseract` OCR
recovered all 5 in full; two printed-key pages were mis-OCR'd by tesseract's table logic and were read
directly as images instead (both are reproduced clean below).

## Papers read

| sourceId (fileName) | Manifest flag | Actual finding | Pages | Questions | Key |
|---|---|---|---|---|---|
| `MCQs - Bg Immune Dr.Ashraf mcq.pdf` ("Part 1": Intro/innate immunity + Antigens/self/CMI) | blocked | CamScanner scan, OCR'd clean | 14 | 17 + 26 = 43 | Printed key tables p.13, full for §II (26/26); §I only shows 1–16 (**Q17 unkeyed**, gap) |
| `MCQs - Bg Immune Dr.Ashraf mcq part 2.pdf` ("Part 2": Humoral / Exam I / Exam II / Extra) | blocked | CamScanner scan, OCR'd clean | 18 | 17+8+15+15 = 55 | Printed key table p.18, **100% complete**, all 4 sections |
| `MCQs - cytokines.pdf` | ready (correct) | Native text, clean | 2 | 8 | Printed key at foot, 100% complete |
| `MCQs - hegazy.pdf` | blocked | CamScanner scan, OCR'd; chaptered (Organs&cells / Innate immunity / Antigens&self / CMI / Humoral IR / Complement) | 24 | ~101 (running count resets per chapter, some pages duplicate a prior page's Qs+key verbatim — compiler artifact, not new content) | Per-chapter mini-key strips embedded after every 5–8 Qs — key coverage is dense, small gaps where a strip's rightmost cell is cut off in the scan (est. <5 Qs unkeyed) |
| `MCQs - Bg. MCQs immune.pdf` (generic external review bank, "ANSWERS OF IMMUNOLOGY MCQs", pp. stamped 107–150 of a larger source book) | blocked | CamScanner scan, OCR'd; continuous numbering, no chapter headers — topic drift only | 39 | 241 | Single consolidated key table, but it **only covers Q1–180** — the same key page is physically repeated 3× (pp.37–39 byte-identical, confirmed by md5) instead of a second page continuing 181–241. **61 questions (181–241) have no printed key anywhere in this file.** |

**Practical file** (`Bg Practical Immune Dr.Mohammed Ashraf.pdf`, 26pp, flagged blocked) not yet opened —
practicals come after the MCQ triage per LANE-BRIEF §4 step 4; noting it exists for Phase 2.

## Scope note (read before the tables)

Two of the five sources are large, generically-numbered external review banks (hegazy ~101 Qs across 6
chapters; the untitled 241-Q bank) with heavy topic-repetition and no lecture-specific framing — unlike
ASU-INF's single chaptered paper, these read like imported board-review question sets. Given the volume,
those two are triaged at **topic-block granularity** (block = chapter or contiguous topic run, with a
representative concept list and count) rather than one row per question; the two Ashraf "Microtutorials"
files and `cytokines.pdf` (113 Qs total) are small, ASU-specific, and fully keyed, so they get full
per-question concept mapping. Full per-question OCR text for the block-level files is preserved in
`/private/tmp/asu-ocr/imm/*.txt` for a deeper pass if the orchestrator wants it.

## A — Full per-question concepts (Ashraf Pt.1 + Pt.2 + cytokines, 113 Qs, fully keyed except Ashraf-I Q17)

Concepts merged wherever multiple questions test the same fact (noted "→ same as").

| Concept (canonical key) | Tests (file:Q#) |
|---|---|
| `bone-marrow.functions.hematopoiesis-and-b-not-t-maturation` | Ashraf1-I:1 |
| `lymphoid-organ.spleen.blood-filter-function` | Ashraf1-I:2 |
| `phagocytosis.steps.recognition-ingestion-oxidative-killing` | Ashraf1-I:3 |
| `cytokine.pro-inflammatory.acute-phase-and-recruitment-effects` | Ashraf1-I:4, Ashraf1-I:15 |
| `microbiome.normal-flora.innate-barrier-competition-role` | Ashraf1-I:5 (live-hit candidate, see §D) |
| `eosinophil.identification.allergic-parasitic-marker` | Ashraf1-I:6, ExamI:1 |
| `innate-immunity.prr-pamp-recognition-mechanism` | Ashraf1-I:7 |
| `innate-immunity.characteristics.rapid-nonspecific-repeatable-response` | Ashraf1-I:8 |
| `hypersensitivity.type-i.mast-cell-histamine-mechanism` | Ashraf1-I:9 |
| `cytokine.endothelial-adhesion-molecule-induction` | Ashraf1-I:10 |
| `innate-immunity.cell-types.non-phagocytic-basophil` | Ashraf1-I:11 |
| `innate-immunity.components.excludes-adaptive-antibody-production` | Ashraf1-I:12 |
| `macrophage.functions.phagocytosis-presentation-cytokines` | Ashraf1-I:13 |
| `inflammation.definition.tissue-damage-pathogen-entry-trigger` | Ashraf1-I:14 |
| `immune-regulation.cell-types.non-regulatory-mast-cell` | Ashraf1-I:16 |
| `neutrophil.recruitment.chemotactic-mediators` | Ashraf1-I:17 (**unkeyed — no printed answer**) |
| `antigen.immunogenicity.size-and-epitope-determinants` | Ashraf1-II:1 |
| `mhc.class-i.general-features-and-genetics` | Ashraf1-II:2 |
| `t-cell.antigen-recognition.mhc-restricted-surface-presentation` | Ashraf1-II:3 |
| `t-cell.cd8.mhc-class-i-restriction` | Ashraf1-II:4, ExamI:5 |
| `mhc.class-i.function-viral-resistance` | Ashraf1-II:5 |
| `t-cell.costimulation.b7-cd28-second-signal` | Ashraf1-II:6, ExamI:6 |
| `dendritic-cell.function.naive-t-cell-activation` | Ashraf1-II:7 |
| `cytokine.il-2.t-cell-proliferation-role` | Ashraf1-II:8 |
| `macrophage.activation.ifn-gamma-mediated-intracellular-killing` | Ashraf1-II:9 |
| `cytotoxic-t-cell.killing-mechanism.perforin-granzyme` | Ashraf1-II:10, Ashraf1-II:25, ExamI:8 |
| `t-helper.subsets.th1-th2-cytokine-functions` | Ashraf1-II:11, ExamI:7 |
| `t-lymphocyte.properties.recirculation` | Ashraf1-II:12 |
| `mhc.class-i.beta2-microglobulin-role` | Ashraf1-II:13 |
| `mhc.expression.class-i-only-cells-fibroblast` | Ashraf1-II:14 |
| `t-cell.cd8.antigen-source-mhc-i` | Ashraf1-II:15 |
| `antigen.epitope.definition` | Ashraf1-II:16, ExamI:4 |
| `superantigen.mechanism.tcr-vbeta-mhc-ii-crosslink` | Ashraf1-II:17, Ashraf1-II:26 |
| `autoimmunity.molecular-mimicry-mechanism` | Ashraf1-II:18 |
| `t-cell.markers.cd4-helper-identification` | Ashraf1-II:19 |
| `mhc.expression.absent-on-erythrocytes` | Ashraf1-II:20 |
| `antigen.hapten.definition-and-carrier-requirement` | Ashraf1-II:21 |
| `tumor-immunology.immune-evasion.pd-l1-upregulation` | Ashraf1-II:22 |
| `t-cell.regulation.ctla-4-inhibitory-signal` | Ashraf1-II:23 |
| `immune-response.secondary-vs-primary-features` | Ashraf1-II:24, HumoralPt2:10 |
| `humoral-immunity.role-vs-extracellular-pathogens` | HumoralPt2:1 |
| `b-cell.activation.thymus-independent-differentiation` | HumoralPt2:2 |
| `antibody.structure.specificity-hypervariable-region` | HumoralPt2:3 |
| `antibody.class-switch.definition-and-scope` | HumoralPt2:4 |
| `antibody.hybridoma.myeloma-fusion-technique` | HumoralPt2:5 |
| `antibody.igm.complement-activation-function` | HumoralPt2:6 |
| `antibody.class-switch.cd40-cd40l-requirement` | HumoralPt2:7 |
| `antibody.structure.antigen-binding-site-location` | HumoralPt2:8 |
| `antibody.isotypes.function-summary-table` | HumoralPt2:9 |
| `antibody.complement-binding.c1q-igm-igg` | HumoralPt2:11 |
| `b-cell.receptor.iga-igb-signal-transduction` | HumoralPt2:12 |
| `b-cell.maturation.bone-marrow-selection-process` | HumoralPt2:13 |
| `b-cell.receptor.vs-t-cell-receptor-comparison` | HumoralPt2:14 |
| `antigen.thymus-dependent-vs-independent-properties` | HumoralPt2:15 |
| `antibody.neonatal-passive-immunity.igg-transplacental-iga-milk` | HumoralPt2:16 |
| `antibody.colostrum.iga-predominance` | HumoralPt2:17 |
| `pamp.examples-and-non-examples` (defensins excluded) | ExamI:2 |
| `phagocytosis.opsonin-stimulated-recognition` | ExamI:3 |
| `t-cell.cd4.th1-th2-correct-vs-incorrect-statements` | ExamII:1–8 (block; case-style, all Th1/Th2/CTL variants of concepts already listed above) |
| `t-cell.superantigen.false-statement-identification` | Extra:1–15 (block; largely re-tests IFN-γ, Th subsets, CD3/CD4/CD8 markers, T-independent activation — see concepts above; 2 net-new facts: `cytokine.ifn-gamma.pleiotropic-sources-and-actions`, `t-cell.clonal-expansion.rationale` ) |

**Totals for block A:** 113 questions, 2 unkeyed (Ashraf1-I:17, and none in the rest of Part 1/2/cytokines
— Exam II and Extra are 100% keyed per the p.18 table), **46 distinct concepts**.

## B — Topic-block concepts (hegazy.pdf, 6 chapters — revised after a full per-question read this sitting)

The original block-level pass below under-counted every chapter — a full page-image read (asu-imm-author7,
2026-09-02) of all 24 pages found real per-chapter totals well above the original "~101 Qs" estimate:

| Block | Qs (actual, this sitting's read) | Representative concepts (canonical key) | Status |
|---|---|---|---|
| Ch1 Organs & cells | **12** (Q1–12) | `lymphnode.function.not-b-cell-maturation-site`, `thymus.function.t-lymphocyte-generation-dependency`, `neutrophil.count.rises-in-acute-bacterial-infection`, `lymphocyte.count.rises-in-viral-infection`, `neutrophil.killing.lysosomal-enzyme-mechanism`, `hematopoieticstemcell.property.pluripotency` (6 new); reused `CON-IMM-73557EF9FDCC99` (primary lymphoid organs, Q1/Q11), `spleen.function.blood-filter-role` (Q5), `eosinophil.identification.allergic-parasitic-marker` (Q7), `monocyte.differentiation.tissue-macrophage` (Q8), the dendritic-cell/naive-T-cell concept (Q9) | **12/12 fully keyed, 12/12 authored** this sitting — `question/ASU-IMM-hegazy-ch1-mcq.md` |
| Ch2 Innate immunity | **32** (Q1–32) | Q1–9 and Q19–32 keyed (bacteria-killing mechanisms, phagocytosis, acute-phase proteins, PAMPs, oxidase enzyme, NK cells, innate-vs-adaptive contrasts); Q10 and Q11–18 concepts not yet triaged into canonical keys (held, see below) | **23/32 keyed** (Q1–9 = a,a,b,a,d,a,e,d,e; Q19–27 = b,c,b,c,e,d,c,d,b; Q28–32 = b,d,a,c,d) — **9/32 held**: Q10 has no visible printed key; Q11–18's key row straddles the page 5→6 scan boundary and is not reliably readable (OCR and image both garbled at that join) — not authored |
| Ch3 Antigens & self molecules | **22** (Q1–22) | Heavy overlap with Block A's Ashraf1-II MHC/antigen/hapten/epitope concepts (MHC class I/II function, MHC restriction, hapten, epitope, codominant expression, maternal-fetal MHC tolerance, HLA-disease linkage) plus a few net-new ASU-specific framings (antigenic-determinant terminology, T-independent-lymphocyte-activation-site question) | **22/22 fully keyed** (Q1–9 = d,e,e,d,d,d,d,d,b; Q10–18 = d,b,e,c,c,b,a,d,a; Q19–22 = c,c,b,b) — **not yet authored**, next in line |
| Ch4 Cell-mediated immunity | **~42** (Q1–42, pages 11–15) | T-cell activation/anergy/positive-negative selection, CTL/NK killing mechanisms, cytokine sources, superantigen mechanism, MHC-restricted antigen recognition | Read via OCR only this sitting (not page-image verified); key strips not yet transcribed — **not yet triaged to per-question level** |
| Ch4-tail "Cytokines" mini-section | **15** (own Q1–15, pages 16–17) | Th1/Th2 cytokine sources, IFN-γ, IL-10, type I interferon, MHC-II upregulation | Q1–15 keyed via OCR only (last row read `a,b,a,c,a,e,c,d,e,d,d,e,c,a,d` — **needs page-image confirmation**, not authored |
| Ch5 Humoral IR | **~38** (Q1–38, pages 18–22) | Ig isotype function, Fc/Fab structure, class switching, secondary response kinetics, opsonization, BCR vs TCR, Th2/antibody-help cytokines | Read via OCR only this sitting; key strips not yet transcribed — **not yet triaged to per-question level** |
| Ch6 Complement | **17** (Q1–17, pages 23–24) | Classical/alternative/MBL pathway order, MAC composition, C3a/C5a anaphylatoxins, CD59/DAF regulation, complement-deficiency susceptibility (C3, C5-9/Neisseria) | Read via OCR only this sitting; key strips not yet transcribed — **not yet triaged to per-question level** |

**Grand total this pass: ≈178 questions actually present in the file** (not ~101 as the original block-level
estimate had it) — Ch1–3 (66 Qs) got a full page-image read and per-question key transcription this sitting;
Ch4–6 (≈112 Qs) were only OCR-skimmed for chapter boundaries and still need the same page-image treatment
before any of them can be triaged or authored. `/tmp/asu-ocr` from the original triage pass no longer exists
(private tmp cleared between sittings) — OCR text for Ch4–6 was regenerated this sitting via
`pagetext.mjs ocr` and is not separately archived; re-run it fresh next sitting rather than searching for a
stale cache.

Keys for Ch1 and Ch3: embedded mini-tables read directly from 300dpi page-image renders (not OCR, which is
heavily garbled on this file — tesseract's table logic scrambles the printed answer-key grids into noise).
Ch2's Q11–18 key table is a genuine scan defect, not an OCR failure: the answer row is physically split across
the page 5→6 boundary and the surviving fragments do not align to columns with confidence — held per the
never-guess-a-key rule rather than reconstructed from partial fragments.

## C — Topic-block concepts (`Bg. MCQs immune.pdf`, 241 Qs, generic external bank)

Read continuously by topic drift (no headers); block boundaries are approximate.

| Block | Q range (approx) | Representative concepts |
|---|---|---|
| Tissues/cells & innate | 1–30 | `spleen.function.blood-filtration`, `lymphoid-organ.adhesion-molecule-rolling-e-selectin`, `lymphoid-organ.primary-vs-secondary-processes`, `dendritic-cell.professional-apc-identification`, `nk-cell.ifn-gamma-directed-cytolysis`, `perforin-granzyme-deficiency.nk-ctl-dysfunction` |
| Antigens/MHC | ~31–70 | overlaps heavily with block A's MHC/antigen concepts |
| Humoral | ~71–110 | overlaps block A humoral concepts; net-new: `antibody.affinity-maturation.somatic-hypermutation` |
| Cell-mediated / cytokines | ~111–150 | `cytokine.chemokine-vs-cytokine-distinction`, `t-cell.memory.central-vs-effector` |
| Hypersensitivity (types I–IV) | ~151–190 | `hypersensitivity.type-ii.antibody-mediated-cytotoxicity`, `hypersensitivity.type-iii.immune-complex-deposition`, `hypersensitivity.type-iv.delayed-tuberculin-reaction`, `hypersensitivity.fetal-maternal-antigen-reaction` |
| Autoimmunity / transplant | ~191–225 | `autoimmunity.mechanisms.loss-of-tolerance`, `transplant.rejection.hyperacute-vs-acute-vs-chronic`, `graft-vs-host-disease.mechanism` (graft rejection is a **live-hit**, see §D) |
| Immunodeficiency | ~226–241 | `immunodeficiency.common-variable.recurrent-sinopulmonary-infection`, `immunodeficiency.c8-deficiency.neisseria-susceptibility`, `immunodeficiency.digeorge.thymic-aplasia`, `immunodeficiency.selective-iga.presentation`, `immunodeficiency.scid.presentation` — **all in the unkeyed 181–241 range**, so none of this block's questions can be answer-validated from this source. |

**Hazard to flag for a ruling:** 61 of 241 questions (the entire hypersensitivity tail + autoimmunity +
transplant + immunodeficiency blocks) have no printed key in this file. Per Standing Order 4 ("missing
key → key editorially with field_note"), these need either (a) cross-checking against the hegazy/Ashraf
overlap where the same fact is asked and keyed elsewhere, or (b) an editorial key with field_note,
decided at authoring time — flagging now so triage approval can rule on it rather than Phase 2 discovering
it mid-batch.

## D — Live-hit / pending-hit spot-checks run (`find-existing.mjs`, 15 representative terms)

| Term searched | Result |
|---|---|
| `hapten`, `superantigen`, `class switch`, `complement c3`, `IgA colostrum`, `perforin granzyme`, `Th1 Th2`, `hypersensitivity type`, `autoimmune tolerance`, `primary immunodeficiency`, `tumor immune evasion`, `beta2-microglobulin` | No existing record — safe to create (12 terms) |
| `CD40` | **Live-hit** — `CON-IMM-162267AD1BF293` "Activated helper-T-cell CD40 ligand helps activate B cells and macrophages through CD40" — overlaps `antibody.class-switch.cd40-cd40l-requirement` (partial: live concept is CD40L-macrophage-activation framing, not the isotype-switch framing our questions test — likely a sibling, not exact dup) |
| `graft rejection` | **Live-hit**, 4 records — `CON-IMM-4737BC8D3348BE` (ABO/MHC/minor-antigen causes), `CON-IMM-916974BABF2573` (acute rejection timing) + 2 more — directly covers the transplant block's rejection-type concepts |
| `opsonization` | **Live-hit**, 5 records — `CON-IMM-5AE67E0CE9228C`, `CON-IMM-6925E1394097CF` + 3 more — directly covers `phagocytosis.opsonin-stimulated-recognition` and `antibody.opsonization.major-opsonin-igg` |

**Not yet searched individually:** the remaining ~55 distinct concepts in §A/B/C — a live IMM concept
catalogue clearly already exists (evidently from a prior Kasr/Alexandria immunology pass), so Phase 2
authoring must re-run `find-existing.mjs` per concept before minting any of them, per LANE-BRIEF §6. This
triage pass surfaces the candidate concept list and 3 confirmed live-hit families; it does not clear every
row for new-mint.

## Totals

- **Papers read:** 5 MCQ sources (all triaged) + 1 practical file noted, not opened.
- **Questions triaged:** 113 full per-question (block A) + ~101 block-level (hegazy) + 241 block-level
  (generic bank) = **~455 questions**.
- **Answer keys recovered:** 112/113 in block A (1 gap, Ashraf1-I:17); dense in hegazy (small gaps);
  **180/241 in the generic bank — 61 unkeyed, flagged above for a ruling.**
- **Distinct concepts tested:** 46 (block A, individually mapped) + ~40 more representative concepts
  named in blocks B/C (not exhaustively enumerated at this pass) ≈ **86 named so far**, more will surface
  on a full per-question pass of blocks B/C if the orchestrator wants that depth.
  - **Live-hit:** 3 confirmed families (CD40 partial, graft rejection, opsonization) covering ~6 of the
    46 block-A concepts plus the transplant/opsonization concepts in blocks B/C.
  - **Pending-hit:** 0 found in `docs/*-Source-Imports` searches run so far (INF's culture-media/immune
    evasion pending file does not overlap immunology-specific facts).
  - **New:** the remainder — most of the 86, placement `imm` for every one.
