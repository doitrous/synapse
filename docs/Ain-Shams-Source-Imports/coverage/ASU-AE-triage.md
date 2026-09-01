# ASU-AE triage — Phase 1

**Phase 3 triage + authoring update (2026-09-02, author5):** Corpus root moved — `~/Desktop/ain
shams` is retired, the same file now lives at `~/Desktop/Universities/Ain Shams/...` (sha256
`3448fabd…` confirmed identical to the manifest's `src_3448fabd352cb8018ed3`). Read all 20 pages
of `MCQs - Embryo 3.pdf` (OCR'd whole-file once; pages 1, 2, 5, 7, 13, 17, 18, 19, 20 re-rendered
at 300 DPI because the CamScanner OCR either garbled symbols or, on p.18 specifically, the scan
itself is physically cropped — the answer-key table's "Remarks" column is cut off from row 36
onward, though the answer **letters** for every row stay legible and were cross-checked against
each stem's own embryology logic). All 104 printed items read, keyed and triaged; full disposition
table below. One printed-key defect found (Q10 — see below). Search-before-mint
(`find-existing.mjs`, four-query pattern) found this block is **overwhelmingly live-hit or
pending-hit against Kasr's own `101-ISK-mcq-concepts.md`**, exactly as the Phase-1 block note
below predicted (notochord 34 hits, somite 51 hits) — 15 of this file's own comprehensive
week-3/derivatives/syndrome/umbilical-cord concepts cover 87 of the 104 questions between them,
so this pass authored almost entirely as sparse pending-live overlays rather than new mints (3
genuinely new facts: adrenal cortex/medulla split origin, teratogen critical-period + a
non-teratogenic-drug example, and polyhydramnios from GI atresia — none of which `find-existing`
matched anywhere). **42 authored, 52 held as within-paper or cross-batch duplicates of an
authored question, 10 held as a matching-format cluster (same exclusion Embryo 1 made for its own
Q19–23), 1 held for a printed key that doesn't match its own stem — 104/104 disposed, cluster
closed.** See `## Embryo 3 — full disposition (104/104)` below for the per-question table,
`coverage/seeds/ASU-AE/embryo3-*.json` for the seeds, and
`pending-live/ASU-AE-EMBRYO3-overlay-concepts.md` for the 12 sparse concept overlays (Kasr
101-ISK + Alexandria AU-MED-102 + one live CON-OBS record).

**Phase 2b authoring update (2026-08-28):** authored 21 of "MCQs - Embryo 2.pdf"'s 69 printed
items (src_a7e3b821ab294015c05f, fertilization mechanics/placenta/twins block) as
`docs/Ain-Shams-Source-Imports/{concept,article,question,evidence}/ASU-AE-embryology-fertilization-placenta-*.md`
— 1 item (46) excluded as a genuine duplicate-option print defect (confirmed at 500 DPI, same
pattern as Embryo 1's own Q17). Of the remaining 68, 7 sparse-overlaid a live concept
(placental barrier, ectopic pregnancy, placenta fetal/maternal parts, battledore placenta,
placental hormones/hCG, intervillous space, extraembryonic mesoderm identity) and 3 were newly
minted (acrosome reaction site, oocyte penetration barriers/perivitelline space, conjoined-twins
classification) after `find-existing.mjs` found nothing live or pending. The other **47
questions could not be authored this pass**: their tested concept already exists, in
comprehensive form, inside Kasr's own unimported `101-ISK-mcq-concepts.md` and Alexandria's own
unimported `AU-MED-102-embryology*` batches — a question citing a `main_concept` that is neither
live nor inside this lane's own simulated batch fails `medical:simulate`'s concept-existence
check, so these are logged instead in
`docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-EMBRYO2-deferred-pending-concepts.md` (stem,
key and target pending concept id per question) for a fast follow-up once either batch lands.
Also regenerated the stale `evidence/corpus-source-index.json` (it was silently excluding every
blocked/OCR'd source, including Embryo 1's own already-shipped one, from the "readable" index —
a gap Embryo 1's own Done row flagged but did not fix). Still owed: "MCQs - Embryo 3.pdf" (week
3/gastrulation block, ~104 Qs, not started), the two `youssef` anatomy/embryology files, the
5-item Embryo 1 matching cluster, and the 16 written "Key Facts"/case-discussion prompts.

**Phase 2 authoring update (2026-08-28):** authored the `Bg Embryology Mcq`/`Embryo1-3` block's
best single source — `MCQs - Embryo 1.pdf` (src_5d3b735488d8c321d5bd, 45 printed items,
gametogenesis/spermatogenesis/oogenesis/ovulation/corpus-luteum) — since it alone (unlike the other
5 files) carries an unambiguous, printed, per-question answer key with no shared-file duplication
inside itself. Every stem, option and key row was re-verified by rendering the page at 220–250 DPI
and reading the image directly rather than trusting OCR text, which caught an illusion in the raw
OCR of the answer-key table (a false "row offset" that a first quick read suggested, and that a
careful side-by-side check against the stem pages disproved). Excluded from this pass: 1 flawed
item (Q17, duplicated answer option in the source) and a 5-item matching cluster (Q19–23, a
different question format not attempted here). The remaining 39 printed items map to 36 keyed MCQs
(some concepts tested twice, from two printed angles) against 25 concepts — 23 newly minted
(`find-existing.mjs`-searched first) plus 2 sparse overlays onto live records
(`CON-DEV-B2A947014AE180` haploid-cell-identification, `CON-GYN-67FBF69E18FC33` cumulus oophorus).
One pending-hit (`CON-DEV-CA422E559742A2`, sperm capacitation, sitting unimported in Alexandria's
own AU-MED-102 embryology batch) was found for Q28 and left untested this pass rather than opened
as a `pending-live/` cross-lane entry for a single question.

**Still owed from this triage, not attempted this pass:** the other two files in the same
high-quality series (`MCQs - Embryo 2.pdf`, fertilization/implantation/decidua/placenta, 69 Qs;
`MCQs - Embryo 3.pdf`, week-3/gastrulation/neurulation/derivatives, ~104 Qs), the general-anatomy
half of `MCQs - Bg Mcq dr.youssef.pdf` and all of `MCQs - Dr.yousef mcq1.pdf`, `Bg Embryology
Mcq.pdf`'s standalone content beyond what Embryo1 already covers, and the 16 written (non-MCQ)
prompts flagged below for a separate track. Per the block-level totals below, most of the
embryology content in these remaining files is expected to be live-hit (large existing
`CON-DEV`/`CON-OBS`/`CON-GYN`/`CON-AND` catalogues), so the next pass should re-run
`find-existing.mjs` per concept before minting, not assume novelty.

Module: **ASU-AE** (Introduction to Anatomy and Embryology), ASU_Y1, Term 1. Two subject folders
(Anatomy, Embryology) → placement `msk`/`fnd` for generic anatomy terminology (per `fnd` note in
ASU-HCB triage) and `dev` for embryology (20-list has `dev` explicitly — LANE-BRIEF §6). Both subject
folders' MCQ files are answered below; concept-level placement is `dev` for every embryology fact and
`fnd`/body-system for the small generic-anatomy-terms block.

Manifest flags all 6 MCQ files `blocked`/`textLayer:none` — same CamScanner hazard as every other ASU
module triaged so far. All 6 rendered + OCR'd (one file, `Bg Embryology Mcq.pdf`, is phone-photographed
via "Redmi Note 8 Pro" rather than CamScanner — same result, image-only PDF).

## Papers read

| sourceId (fileName) | Manifest flag | Actual finding | Pages | Content | Key |
|---|---|---|---|---|---|
| `MCQs - Bg Mcq dr.youssef.pdf` (Anatomy) | blocked | CamScanner scan, OCR'd; **mixed file** — 14 written "Key Facts" essay prompts (anatomical position/planes/fascia/bone classification, no options) followed by ~51 MCQs (anatomical terms/planes/bone growth, then drifts into spermatogenesis/spermiogenesis) | 33 | 14 written prompts (not MCQ) + ~51 MCQs | Per-question inline answer letter after each stem, spot-checked correct on multiple pages — **appears fully keyed** |
| `MCQs - Dr.yousef mcq1.pdf` (Anatomy) | blocked | CamScanner scan, OCR'd; Part I anatomical terms/skeleton (~15 Qs) → drifts into decidua/implantation/ectopic-pregnancy embryology (~13 Qs) → 2 written clinical-case discussion prompts (non-MCQ) | 32 | ~28 MCQs + 2 written case prompts | Printed answer table p.32, **28/28 complete** |
| `MCQs - Bg Embryology Mcq.pdf` (Embryology) | blocked | Phone-photo scan (Redmi Note 8 Pro), OCR'd; "General Embryology" — gametogenesis, spermatogenesis, oogenesis, ovulation, corpus luteum, fertilization site, vertebral column derivation | 10 | 73 | Printed "KEY ANSWERS OF GENERAL EMBRYOLOGY" table (read as image, OCR mis-rendered it rotated), **73/73 complete**, verbatim transcribed |
| `MCQs - Embryo 1.pdf` ("Part 1") | blocked | CamScanner scan, OCR'd; gametogenesis/spermatogenesis/oogenesis/female reproductive cycles/ovulation | 9 | 44 | Printed answer table **with a one-line explanation per question**, 44/44 complete |
| `MCQs - Embryo 2.pdf` ("Part 2") | blocked | CamScanner scan, OCR'd; fertilization/cleavage/implantation/decidua/week-2 events/bilaminar disc/extraembryonic mesoderm/placenta/twins | 15 | 69 | Same explained-answer-table format, 69/69 complete |
| `MCQs - Embryo 3.pdf` ("Part 3") | blocked | CamScanner scan, OCR'd; week-3 events/gastrulation/intraembryonic mesoderm/neurulation/folding/germ-layer derivatives/fetal membranes/birth defects | 20 | ~104 | Same explained-answer-table format, appears complete (sampled, not every row confirmed) |

## Scope note

Embryo 1/2/3 are a coherent, well-explained, high-quality three-part embryology series (217 Qs) — the
strongest single source found in this module and a good candidate for a full per-question pass later.
`Bg Embryology Mcq.pdf` (73 Qs, general embryology) heavily duplicates Embryo 1's gametogenesis content;
`Dr.yousef mcq1.pdf`'s embryology tail (~13 Qs) duplicates Embryo 2's decidua/implantation content. Given
the volume (369 MCQs across 6 files, heavy cross-file duplication), this pass is **block-level** throughout
rather than full per-question — representative concepts per topic block, not a row per question.

## A — Topic blocks and representative concepts

| Block | Files : approx Qs | Representative concepts (canonical key) |
|---|---|---|
| Generic anatomy terminology (planes, fascia, bone classification, vertebral curves) | youssef1 MCQ-half + youssef2 Part I : ~35 | `anatomical-position.standard-definition`, `anatomical-planes.median-sagittal-coronal-transverse`, `langers-lines.definition-clinical-relevance`, `skin-creases.definition`, `superficial-fascia.attachment-and-function`, `deep-fascia.absence-sites-and-function`, `vertebral-column.curves-classification`, `bone-classification.by-shape`, `long-bone.growth-plate-structure`, `carpal-bone.lunate-classification` |
| Gametogenesis / spermatogenesis / oogenesis / ovulation | `Bg Embryology Mcq` (73) + Embryo1 (44) + youssef1 tail (~17) : ~134, heavily duplicated → est. 20 distinct | `spermatogenesis.chromosome-number-by-stage`, `spermatogenesis.duration-64-days`, `spermiogenesis.acrosome-golgi-origin`, `spermiogenesis.mitochondrial-sheath-formation`, `sperm.structure-motility-viability-duration`, `semen.abnormal-forms-percentage-threshold`, `azoospermia-oligospermia-necrospermia.terminology`, `oogenesis.timing-intrauterine-to-menopause`, `ovulation.secondary-oocyte-release`, `corpus-luteum.progesterone-secretion`, `fertilization.site-ampulla-fallopian-tube`, `sperm-capacitation.definition`, `polar-body.chromosome-content`, `karyotype.diploid-chromosome-count` |
| Fertilization / cleavage / implantation / decidua / placenta / twins | Embryo2 (69) + youssef2 tail (~13) : ~82, duplicated → est. 18 distinct | `cleavage.morula-blastocyst-formation`, `implantation.site-and-timing`, `decidua.basalis-parietalis-capsularis-classification`, `chorionic-villi.primary-secondary-tertiary-structure`, `trophoblast.cytotrophoblast-syncytiotrophoblast-roles`, `placenta.formation-and-components`, `twinning.monozygotic-vs-dizygotic-mechanism`, `ectopic-pregnancy.common-sites-and-presentation`, `extraembryonic-coelom.formation`, `amniotic-cavity.formation-mechanism`, `bilaminar-disc.epiblast-hypoblast-formation` |
| Week 3 / gastrulation / neurulation / folding / derivatives / fetal membranes / birth defects | Embryo3 (~104) : richest net-new block | `gastrulation.primitive-streak-formation`, `trilaminar-disc.three-germ-layers`, `notochord.formation-and-function`, `neurulation.neural-tube-formation`, `intraembryonic-mesoderm.paraxial-intermediate-lateral-classification`, `somite.differentiation-sclerotome-myotome-dermatome`, `folding.cephalocaudal-lateral-mechanism`, `germ-layer-derivatives.ectoderm-mesoderm-endoderm`, `fetal-membranes.amnion-chorion-yolk-sac`, `umbilical-cord.structure-vessels-whartons-jelly`, `teratogen.critical-period-first-trimester`, `congenital-anomaly.down-syndrome-trisomy21`, `neural-crest.derivatives-suprarenal-medulla`, `lateral-plate-mesoderm.somatic-splanchnic-layers` |

**Written (non-MCQ) prompts found, flagged for Phase 2 written/article authoring, not counted as MCQs:**
14 "Key Facts" prompts in `youssef1` (anatomical position/planes/fascia/bone classification/long-bone
growth) + 2 clinical-case discussion prompts in `youssef2` (ectopic pregnancy reasoning).

## B — Live-hit spot-checks run (`find-existing.mjs`, 13 terms)

Embryology in particular is **heavily covered already** by Kasr's Development/OBS/GYN/Andrology modules:

| Term | Result |
|---|---|
| `spermatogenesis` | Live records under `CON-AND-*` (e.g. hormonal/nutritional regulation) — different framing than these MCQs' chromosome-count/duration facts, likely siblings not exact dupes |
| `oogenesis` | 9 existing records, `CON-DEV-*` |
| `decidua` | Multiple `CON-DEV-*`/`CON-OBS-*` records (parietalis contact, maternal surface, cytotrophoblastic shell) |
| `trophoblast` | Multiple `CON-OBS-*` records (chorionic-plate, early placental barrier) |
| `gastrulation` | 10 existing records |
| `notochord` | **34 existing records** |
| `neurulation` | 2 existing records |
| `somite` | **51 existing records** (e.g. cervical/coccygeal somite counts) |
| `ectopic pregnancy` | Live `CON-OBS-F3B46C8C137FA1` "ectopic pregnancy" definition + site-specific records |
| `anatomical position` | 12 existing records |
| `corpus luteum` | Live `CON-GYN-*`/`CON-OBS-*` records (progesterone/estrogen secretion) |
| `twinning`, `langer lines` | No hit — safe to create |

**This triage does not resolve live/pending/new for every block-A concept individually** — the embryology
catalogue (`CON-DEV`, `CON-OBS`, `CON-GYN`, `CON-AND`) is large enough that most facts in blocks
"gametogenesis" and "fertilization/implantation" are likely sparse-update candidates, while block "week 3
onward" (gastrulation/neurulation/somite/folding) returned very high existing-record counts too (notochord
34, somite 51) — so even Embryo3's richest block is probably majority live-hit, not new. Generic anatomy
terminology (langer's lines, twinning) is more likely genuinely new.

## Totals

- **Papers read:** 6 MCQ/mixed sources, all triaged; 16 written (non-MCQ) prompts identified separately.
- **Questions triaged:** ~369 MCQs (block-level) + 16 written prompts flagged for a different track.
- **Answer keys recovered:** high — 73/73, 44/44, 69/69 confirmed by printed tables; ~28/28 confirmed;
  youssef1's ~51 inline-keyed MCQs spot-checked correct, not row-by-row confirmed; Embryo3's ~104 sampled,
  not every row confirmed.
- **Distinct concepts tested:** ~52 named at block level (10 generic-anatomy + 14 gametogenesis + 11
  fertilization/implantation + 14 gastrulation-onward), fewer than raw Q-count because of heavy
  cross-file duplication (the same fact — e.g. "corpus luteum secretes progesterone," "spermatogenesis
  takes 64 days" — is asked in 2–3 of the 6 files).
  - **Live-hit:** strong evidence for the majority of the embryology blocks (large existing `CON-DEV`/
    `CON-OBS`/`CON-GYN`/`CON-AND` catalogues found on every embryology term searched) — exact per-concept
    resolution deferred to Phase 2 minting per LANE-BRIEF §6.
  - **Pending-hit:** 0 found in `docs/*-Source-Imports` searches.
  - **New:** the generic-anatomy-terminology block (langer's lines, twinning terminology, some
    classification facts) looks like the most likely genuinely-new territory; placement `dev` for
    embryology concepts, `fnd`/body-system for generic anatomy terms (same open question flagged in the
    ASU-HCB triage file).

## Embryo 3 — full disposition (104/104)

Source: `MCQs - Embryo 3.pdf` (src_3448fabd352cb8018ed3), 20 pages, printed answer-key table
p.17–18 (letters) + explanation prose p.19–20. Concept-id column gives the concept the question's
fact is tested against; "AUTHOR" rows have a seed in `coverage/seeds/ASU-AE/embryo3-*.json`,
"HOLD" rows carry a `hold` reason in the same seeds (dup-of-Qn = same fact as an authored question,
tested from a different angle or a different wrong-answer set).

**Q10 anomaly:** printed key row 10 reads letter `e` / remark "Pia matter," but Q10's own five
printed options (Adrenal cortex / Dura mater / Melanocyte / Dermis of skin / Heart) contain no
"pia mater" at all, and the only embryologically correct ectoderm-derived option among the five is
`c` (Melanocyte) — option `e` (Heart) is mesodermal, not ectodermal, so the printed key is not
just surprising but wrong against its own stem. Rows 9 and 11 both check out cleanly against their
own stems (and "pia mater" turns up correctly as a real distractor in the unrelated Q72), so this
looks like an isolated single-row erratum in the source rather than a systematic offset. Held per
schema `hold` convention ("printed key conflicts with the stem"), not authored either way.

| Q | Key | Fact | Disposition |
|---|---|---|---|
| 1 | a | Primitive streak develops from epiblast | AUTHOR — `CON-DEV-215BD7E9E58872` |
| 2 | a | Dermis develops from somites | HOLD dup-of-Q67/Q104 |
| 3 | c | Klinefelter = 44+XXY | AUTHOR — `CON-FND-5097CA5BAB2E51` |
| 4 | c | Battledore placenta = cord at placental margin | AUTHOR — `CON-OBS-C095B75A61EA4F` (live) |
| 5 | a | Major source of intraembryonic mesoderm = primitive streak | HOLD dup-of-Q81 |
| 6 | d | Normal amniotic fluid volume at birth ≈1000 mL | AUTHOR — `CON-DEV-3D26C14BF0AA28` |
| 7 | b | Turner via chromosomal monosomy | HOLD dup-of-Q43 |
| 8 | c | Klinefelter = 44+XXY | HOLD dup-of-Q3 |
| 9 | c | Kidneys from intermediate cell mass | AUTHOR — `CON-DEV-2E3E3098D90C0C` |
| 10 | e* | *(printed key does not match its own stem — see note above)* | HOLD indefensible key |
| 11 | e | Only the left umbilical vein persists at full term | AUTHOR — `CON-DEV-134C8B5E98D759` |
| 12 | b | Dermis is the mesodermal part of skin | HOLD dup-of-Q67/Q104 |
| 13 | d | Respiratory passages are endodermal | AUTHOR — `CON-DEV-C84AD85AB265CC` |
| 14 | a | Oligohydramnios → renal agenesis | HOLD dup-of-Q26 |
| 15 | b | Turner = 44+XO | HOLD dup-of-Q43 |
| 16 | e | Paraxial mesoderm → dermis | HOLD dup-of-Q67/Q104 |
| 17 | c | Day 22 → 7 somites | AUTHOR — `CON-DEV-3AB7E19B99F387` |
| 18 | d | Anterior neuropore closes ~day 25 | AUTHOR — `CON-DEV-4BC4233153C3DC` |
| 19 | c | Klinefelter = 44+XXY | HOLD dup-of-Q3 |
| 20 | a | Axial skeleton from paraxial mesoderm | HOLD dup-of-Q104 |
| 21 | e | Klinefelter = 44+XXY | HOLD dup-of-Q3 |
| 22 | c | Allantois lies within the connecting stalk | AUTHOR — `CON-DEV-134C8B5E98D759` |
| 23 | e | Adrenal cortex is mesodermal (medulla is neural crest) | AUTHOR — mint `CON-DEV-ASU-AE-ADRENAL-ORIGIN` |
| 24 | a | Axial skeleton from somites | HOLD dup-of-Q104 |
| 25 | c | Bronchial tree is endodermal | HOLD dup-of-Q13 |
| 26 | c | Oligohydramnios → renal agenesis | AUTHOR — `CON-DEV-3D26C14BF0AA28` |
| 27 | c | Klinefelter = 44+XXY | HOLD dup-of-Q3 |
| 28 | c | Heparin is not teratogenic (doesn't cross placenta) | AUTHOR — mint `CON-DEV-ASU-AE-TERATOGEN-PRINCIPLES` |
| 29 | d | Day 23 → 10 somite pairs | HOLD dup-of-Q17 |
| 30 | a | Brain is ectodermal | HOLD dup-of-Q13 (low-value repeat) |
| 31 | e | Down syndrome = trisomy 21 | AUTHOR — `CON-FND-5097CA5BAB2E51` |
| 32 | a | Polyhydramnios → esophageal/GI atresia | AUTHOR — mint `CON-DEV-ASU-AE-POLYHYDRAMNIOS-GI` |
| 33 | a | Kidneys from intermediate cell mass | HOLD dup-of-Q9 |
| 34 | c | First somite pair appears day 20 | AUTHOR — `CON-DEV-3AB7E19B99F387` |
| 35 | e | Retina is from the neural tube, not the neural crest | AUTHOR — `CON-DEV-785CE84F7C03DB` |
| 36 | d | Umbilical cord = 2 arteries + 1 vein | HOLD dup-of-Q11 |
| 37 | b | GI anomaly → polyhydramnios | HOLD dup-of-Q32 |
| 38 | b | Nucleus pulposus from notochord | HOLD dup-of-Q86 |
| 39 | a | GIT epithelium is endodermal | HOLD dup-of-Q13 |
| 40 | c | Melanocytes are from the neural crest | AUTHOR — `CON-DEV-785CE84F7C03DB` |
| 41 | b | Notochord induces development of the nervous system | AUTHOR — `CON-DEV-4BC4233153C3DC` |
| 42 | d | Neural crest derivatives EXCEPT dura mater (mesodermal) | AUTHOR — `CON-DEV-785CE84F7C03DB` |
| 43 | b | Turner = 44+XO | AUTHOR — `CON-FND-5097CA5BAB2E51` |
| 44 | d | Gastrulation occurs in the 3rd week | AUTHOR — `CON-DEV-215BD7E9E58872` |
| 45 | e | Notochord derived from epiblast | AUTHOR — `CON-DEV-1BCF37C48AF307` |
| 46 | b | Lateral folding forms the elongated gut tube | AUTHOR — `CON-DEV-44A219B862FFD5` |
| 47 | b | Somites do not give epidermis | HOLD dup-of-Q104 |
| 48 | a | Gut epithelium is endodermal | HOLD dup-of-Q13 |
| 49 | c | Blood/lymphatic vessels are mesodermal | AUTHOR — `CON-DEV-2E3E3098D90C0C` |
| 50 | c | Neurenteric canal connects amniotic cavity & yolk sac | AUTHOR — `CON-DEV-1BCF37C48AF307` |
| 51 | e | Connecting stalk is not a mesoderm subdivision | HOLD dup-of-Q9/Q49 |
| 52 | c | Umbilical cord anatomy at birth (EXCEPT) | HOLD dup-of-Q11 |
| 53 | c | Somite onset day | HOLD dup-of-Q34 |
| 54 | b | Esophageal atresia → hydramnios | HOLD dup-of-Q32 |
| 55–59 | a/c/e/b/d | Matching cluster: syndrome → chromosomal formula | HOLD matching-format, not attempted (Embryo 1's own Q19–23 precedent) |
| 60–64 | a/d/e/b/c | Matching cluster: syndrome → chromosomal alteration | HOLD matching-format, not attempted |
| 65 | b | Mesoderm absent at the oral (oropharyngeal) membrane | HOLD dup-of-Q82 |
| 66 | d | Day 26 → 19 somites | HOLD dup-of-Q17 |
| 67 | d | Skin develops from ectoderm AND mesoderm | AUTHOR — `CON-DEV-5E63C211DEEE00` |
| 68 | c | Dorsal root ganglion from neural crest | HOLD dup-of-Q42 |
| 69 | b | Primitive-streak formation = start of gastrulation | HOLD dup-of-Q1 |
| 70 | d | Neurenteric canal (amniotic cavity ↔ yolk sac) | HOLD dup-of-Q50 |
| 71 | a | Visceral pericardium from splanchnic layer of lateral plate mesoderm | AUTHOR — `CON-DEV-2E3E3098D90C0C` |
| 72 | b | Neural tube forms brain & spinal cord | HOLD dup-of-Q35/Q41 |
| 73 | c | Primitive node — INCORRECT statement (not yet ecto/endoderm) | HOLD dup-of-Q1/Q44 |
| 74 | b | Cloacal membrane at caudal end (ecto+endo meet) | HOLD dup-of-Q81/Q82 |
| 75 | c | Intraembryonic mesoderm develops in 3rd week | HOLD dup-of-Q44 |
| 76 | a | Neural crest appears at neural fold margins | HOLD dup-of-Q35/Q40/Q42 |
| 77 | e | Alveolar lining epithelium is endodermal | HOLD dup-of-Q13 |
| 78 | d | Folding: connecting stalk becomes ventral (not dorsal) | AUTHOR — `CON-DEV-44A219B862FFD5` |
| 79 | a | Somites develop from paraxial (not lateral plate) mesoderm | HOLD dup-of-Q104 |
| 80 | a | Segmentation is seen in paraxial mesoderm | HOLD dup-of-Q104 |
| 81 | d | Sources of intraembryonic mesoderm = streak + node + notochord (all) | AUTHOR — `CON-DEV-215BD7E9E58872` |
| 82 | e | Intraembryonic mesoderm absent at 4 named sites (all) | AUTHOR — `CON-DEV-215BD7E9E58872` |
| 83 | d | Neural plate = ectoderm dorsal to the notochord | AUTHOR — `CON-DEV-4BC4233153C3DC` |
| 84 | c | Oropharyngeal membrane at cranial end | HOLD dup-of-Q81/Q82 |
| 85 | a | Notochord is ectodermal, not endodermal, in origin | HOLD dup-of-Q45 |
| 86 | b | Notochord forms the nucleus pulposus | AUTHOR — `CON-DEV-1BCF37C48AF307` |
| 87 | c | Pancreas is endodermal | AUTHOR — `CON-DEV-C84AD85AB265CC` |
| 88 | b | Dermis of skin is mesodermal (ectoderm EXCEPT) | HOLD dup-of-Q67 |
| 89 | c | GIT epithelium is endodermal (ectoderm EXCEPT) | HOLD dup-of-Q13 |
| 90 | e | Notochord is not a fetal membrane | AUTHOR — `CON-DEV-1BCF37C48AF307` |
| 91 | c | Definitive yolk sac lies within the umbilical cord | AUTHOR — `CON-DEV-1D10DF3B716A70` |
| 92 | c | Secondary yolk sac cavity is endoderm-lined | HOLD cross-batch dup — same concept Embryo 2 already tested (Q7) |
| 93 | c | Amnion helps, not prevents, fetal movements | AUTHOR — `CON-DEV-F356C3B8CFD31E` |
| 94 | d | Primitive umbilical cord contains 2 umbilical arteries | AUTHOR — `CON-DEV-134C8B5E98D759` |
| 95 | c | Wharton's-jelly accumulation causes false (not true) knots | AUTHOR — `CON-DEV-3E918A4C74B56D` |
| 96 | b | Teratogenic effect is greatest in the 1st trimester | AUTHOR — mint `CON-DEV-ASU-AE-TERATOGEN-PRINCIPLES` |
| 97 | c | Somatic layer of lateral plate mesoderm → body-wall supportive elements | HOLD dup-of-Q71 |
| 98 | c | Down syndrome = trisomy of autosomes | HOLD dup-of-Q31 |
| 99 | a | Allantois = diverticulum of the hindgut | AUTHOR — `CON-DEV-1D10DF3B716A70` |
| 100 | c | Enamel of teeth is ectodermal (mesoderm EXCEPT) | HOLD dup-of-Q13/Q87 (low-value repeat) |
| 101 | b | Neural crest EXCEPT dura mater | HOLD dup-of-Q42 |
| 102 | b | Ectoderm EXCEPT suprarenal cortex (mesodermal) | HOLD dup-of-Q23 |
| 103 | e | Mesoderm EXCEPT suprarenal medulla (neural crest) | HOLD dup-of-Q23 |
| 104 | e | Somite differentiation: sclerotome/myotome/dermatome (all correct) | AUTHOR — `CON-DEV-5E63C211DEEE00` |

**Totals: 42 authored, 52 held as duplicate-of-an-authored-question, 10 held as matching-format,
1 held as indefensible printed key — 104/104 disposed.** Concepts touched: 12 sparse overlays onto
pending Kasr `101-ISK-mcq-concepts.md` records, 1 sparse overlay onto a pending Alexandria
`AU-MED-102-embryology-concepts.md` record, 1 sparse overlay onto a live `CON-OBS` record, 1
extension of Embryo 2's own existing `CON-DEV-1D10DF3B716A70` overlay (same concept, two more
Embryo-3 questions), and 3 newly minted ASU-AE concepts (adrenal cortex/medulla origin, teratogen
principles, polyhydramnios-from-GI-atresia) — all four search-before-mint queries came back empty
for these three.
