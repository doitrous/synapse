# ASU-IBM triage — Phase 1

Module: **ASU-IBM** (Introduction to Medical Biochemistry, faculty code "-1"), ASU_Y1, Term 1. Subject
placement: `pharm`/`fnd` per LANE-BRIEF §6 note ("pharm concepts take FND or INF as the CON- body-system
code") — biochemistry-of-metabolism concepts with no body-system anchor route to `fnd`, same open
placement question flagged in the ASU-HCB and ASU-AE triage files.

Only **one** MCQ source exists for this module in the manifest (`MCQs - Bg MCQ of bio.pdf`, 28pp,
flagged blocked — wrong, CamScanner scan, OCR'd/visually confirmed). It turned out to be far larger than
its page count suggests: three separately-keyed sections from a branded "Biochemistry Academy" external
bank, back-to-back in one PDF.

## Papers read

| sourceId (fileName) | Manifest flag | Actual finding | Pages | Questions | Key |
|---|---|---|---|---|---|
| `MCQs - Bg MCQ of bio.pdf`, section 1 "Protein Chemistry" | blocked | CamScanner scan; tesseract failed on most pages (low-contrast gray scan defeats OCR even after grayscale/contrast preprocessing) — **read directly as images instead**, visually confirmed clean and legible | pp.1–15 | 105 | "Answers of Protein" table p.15, **105/105 complete** |
| same file, section 2 "Carbohydrates" | blocked | Same scan quality; text pages OCR'd fine here (better scan pass for this section), only the last page needed a visual read | pp.16–20 | 39 | "Answers of Carbohydrates" table, **39/39 complete** (OCR captured it directly this time) |
| same file, section 3 "Lipids & Biological Membrane" | blocked | Visually read (same OCR-defeating scan as section 1) | pp.21–28 | 57 | "Answers of lipids & Biological Membrane" table p.28, **57/57 complete** |

**Hazard for the toolchain lane:** roughly half this file's pages defeat `pdftotext` (0 words, expected —
CamScanner) **and** `tesseract` (near-0 words despite clearly legible text to the eye) even after
grayscale/autocontrast/binarize preprocessing and a 300dpi re-render — a paper-texture/gray-cast scan that
neither pipeline handles. Only direct image reads recovered it. Worth a note for whoever owns the OCR step
in `scripts/asu/extract/` — this failure mode is different from the "CamScanner watermark only" case seen
elsewhere and from the "isolated bold answer letter" case seen in ASU-HCB.

## Lecture-only topics with no MCQ coverage

The manifest's IBM lecture list includes 5 enzyme lectures, 2 glycolysis lectures, 2 "Introduction to
Metabolism" lectures, and a biochemistry-orientation lecture — **none of these have a matching MCQ, written,
or practical assessment file** anywhere in the ASU-IBM manifest rows. Per LANE-BRIEF §4 step 1
("assessments are the source of truth... invented items only fill a gap you can name"), these topics
cannot seed a triage row from a question. Flagging as **needs Omar sources** (no exam-shaped material) —
Phase 2 would have to author minimum-viable teaching concepts from the lecture PDFs directly with a
field_note, or wait for a real assessment.

## A — Block-level concepts (all 201 Qs, 3 sections)

| Block | Qs | Representative concepts (canonical key) |
|---|---|---|
| Protein Chemistry | 105 | `amino-acid.enantiomer-exceptions-glycine`, `amino-acid.solubility.charge-polarity-dependence`, `protein.uv-absorbance.tryptophan-280nm`, `amino-acid.non-standard-no-genetic-code`, `protein.denaturation.agents-and-effects`, `protein-structure.tertiary.disulfide-bond-stabilization`, `amino-acid.essential-vs-nonessential.classification`, `protein.biological-value.low-value-examples`, `amino-acid.isoelectric-point.charge-behavior`, `amino-acid.ph-above-below-pi.charge-and-migration`, `protein-folding.noncovalent-bonds.hydrophobic-and-hydrogen`, `protein-structure.secondary.alpha-helix-stabilization`, `protein-structure.primary.amino-acid-sequence-definition`, `protein-structure.secondary.disruption-by-proline`, `protein-folding.chaperone-function`, `amino-acid.sulfhydryl-containing.cysteine-methionine`, `prion-disease.misfolding-mechanism-mad-cow`, `hemoglobin.quaternary-structure.alpha-beta-chains`, `peptide-bond.formation-mechanism.condensation`, `peptide-bond.structural-properties.planarity-trans-configuration`, `disulfide-bond.formation-mechanism.oxidation`, `glutathione.tripeptide-structure`, `amino-acid.n-terminal-c-terminal.peptide-orientation` |
| Carbohydrates | 39 | `monosaccharide.minimum-carbon-requirement`, `disaccharide.glycosidic-bond-type`, `glucose-fructose.isomerism-classification`, `nucleotide.n-glycosidic-bond-ribose-base`, `monosaccharide.aldose-ketose-classification`, `carbohydrate.general-chemical-formula`, `ketohexose.identification-fructose`, `disaccharide.glycosidic-linkage.sucrose-alpha1-2`, `disaccharide.glycosidic-linkage.lactose-beta1-4`, `disaccharide.glycosidic-linkage.maltose-alpha1-4`, `carbohydrate.chiral-carbon.dihydroxyacetone-exception`, `glycogen.polysaccharide-classification`, `sugar-pair.epimer-vs-anomer-vs-enantiomer-terminology` |
| Lipids & Biological Membrane | 57 | `fatty-acid.essential-vs-nonessential.classification`, `prostaglandin.precursor-arachidonic-acid`, `cholesterol.precursor-role.steroid-bile-vitd-exception-tag`, `lipid.storage-form.triacylglycerol`, `fatty-acid.saturation-classification.monounsaturated-oleic`, `phospholipid.classification.sphingo-vs-glycero`, `antiphospholipid-syndrome.autoimmune-target`, `respiratory-distress-syndrome.surfactant-deficiency-dppc`, `fatty-acid.omega-3-classification.linolenic`, `fatty-acid.omega-6-classification.linoleic` |

## B — Live-hit spot-checks run (`find-existing.mjs`, 8 terms)

| Term | Result |
|---|---|
| `amino acid isoelectric point` | No hit — safe to create |
| `peptide bond` | 19 existing records |
| `alpha helix` | 2 existing records |
| `glycosidic bond` | 7 existing records |
| `sphingomyelin` | **29 existing records** |
| `omega-3 fatty acid` | 2 existing records |
| `chaperone protein folding` | No hit — safe to create |
| `denaturation protein` | No hit — safe to create |

Mixed picture, unlike ASU-HCB's near-universal overlap: general biochemistry building-block facts
(peptide bond, glycosidic bond, sphingomyelin, alpha helix) have real live coverage already (likely from
Kasr's biochemistry modules), while the more clinically-flavored or terminology-specific facts (isoelectric
point behavior, chaperone function, denaturation mechanism, prostaglandin precursor, antiphospholipid
syndrome) look genuinely new. Full per-concept resolution deferred to Phase 2 minting per LANE-BRIEF §6.

## Totals

- **Papers read:** 1 MCQ source (all 3 internal sections triaged); lecture-only enzyme/glycolysis/
  metabolism topics flagged as no-assessment.
- **Questions triaged:** 201 (105 + 39 + 57), block-level.
- **Answer keys recovered:** 201/201 — all three sections fully keyed via printed answer tables.
- **Distinct concepts tested:** 23 (protein) + 13 (carbohydrate) + 10 (lipid) = **46 named**, fewer than
  raw Q-count because many questions in each section retest the same fact from a different angle (e.g.
  omega-3/omega-6 classification asked twice, peptide-bond formation asked via two near-identical diagrams).
  - **Live-hit:** confirmed for peptide bond, glycosidic bond, sphingomyelin, alpha helix, omega-3 fatty
    acid families (5 of 46).
  - **Pending-hit:** 0 found in `docs/*-Source-Imports` searches.
  - **New:** the remainder, mostly protein-folding/denaturation mechanism facts and the lipid clinical
    correlations (RDS/antiphospholipid syndrome) — placement `fnd`/`pharm` pending the same subject-id
    confirm flagged in the ASU-HCB and ASU-AE triage files.
- **Needs Omar sources:** enzyme kinetics/inhibition, glycolysis, and general-metabolism lecture topics —
  no MCQ, written, or practical assessment exists anywhere in the ASU-IBM manifest for them.
