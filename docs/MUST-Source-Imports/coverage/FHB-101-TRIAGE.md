# MUST FHB 101 — S1 read-only triage checkpoint

## Scope and decision

This is an incomplete S1 checkpoint, not `TRIAGE APPROVED`.  It records only questions read from the completed deduplicated source family and does not mint IDs, author content, or choose module placement.  Every proposed new item has placement **TBD**.

## Evidence / reproducibility

The readiness selection is exactly the 115 inventory rows where `module=FHB 101` and category is `05 MCQs`, `06 EOM Exams`, `07 EOY Exams`, or `08 Midterm Exams`; it is 106 unique SHA-256s (nine duplicate rows).  Department split: Anatomy 27, Histology 57, Physiology 31; category split: MCQs 48, EOM 21, EOY 0, Midterm 46.

Run the following read-only ledger to obtain the exact selected path, SHA-256, size, page count, audit error, and current text-layer result for every one of the 115 rows (and thereby the exact remaining-file list below):

```text
node scripts/must/fhb101-triage.mjs --root='/Users/doitrous/Desktop/MUST' --inventory='/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/.codex/library_audit/must/inventory.tsv' --inspected='/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/.codex/library_audit/must/inspected-text.json' --text
```

The run returned 70 substantive-text, 6 sparse-text, and 39 empty-text source rows: Anatomy 22/1/4; Histology 28/3/26; Physiology 20/2/9.  `pdftotext` also reported malformed-flate warnings for `Anatomy/05 MCQs/MCQs - VIP Embryo MCQS ️▪️.pdf` and `Histology/05 MCQs/MCQs - Histo FHB101 Exam Night Questions & Notes.pdf`; sparse/empty extraction is not treated as an unread question or a missing key.

## Completed source subset (three inventory paths, one exact document)

| Inventory paths (all `05 MCQs`) | SHA-256 | pages | Printed questions read | Printed/official keys recovered |
|---|---|---:|---:|---:|
| `Year 1/Semester 101/FHB 101/Anatomy/05 MCQs/MCQs - Fhb exam 2026.pdf`; `Year 1/Semester 101/FHB 101/Histology/05 MCQs/MCQs - Fhb exam 2026.pdf`; `Year 1/Semester 101/FHB 101/Physiology/05 MCQs/MCQs - FHB101 Exam 2026.pdf` | `a87b09c5f33157263fb623fcfbc2eeb315f90633fdd1a5a8f9244a67c6313e95` | 14 | 36 | 8 |

The document has 28 MCQs without a printed MCQ key and eight written prompts with printed answers: Anatomy 9/2, Physiology 13/3, Histology 14/3 (questions/keys).  Repeated Anatomy and Physiology pages were collapsed before counting.

## Consolidated S1 table — completed subset only

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 101 (2026 duplicate family only) | 36 | 8 | 36 | 12 | 12 | 12 | TBD |

## Tested-concept search ledger

Each row was searched with the manual tool using both phrases shown (`node "Instruction Manual for Content Creation/tools/find-existing.mjs"`): its normal hit classification is deliberately not a proposed identifier.

| Department | Tested concept (search pair) | Result |
|---|---|---|
| Anatomy | amniotic fluid / amniotic volume | live-hit |
| Anatomy | gametogenesis / gamete chromosomes | pending-hit |
| Anatomy | endoderm / gastrointestinal epithelial lining | live-hit |
| Anatomy | fertilization ampulla / site fertilization | new — TBD |
| Anatomy | ectopic pregnancy / tubal implantation | live-hit |
| Anatomy | decidua basalis / maternal placenta | live-hit |
| Anatomy | primitive streak / gastrulation first sign | live-hit |
| Anatomy | surface ectoderm / ectoderm derivatives | new — TBD |
| Anatomy | sclerotome / vertebrae ribs | pending-hit |
| Physiology | macrocytic anaemia / gastrectomy anaemia | live-hit |
| Physiology | megakaryocyte / platelet formation | live-hit |
| Physiology | extrinsic pathway / factor VII | live-hit |
| Physiology | deep-vein thrombosis / postoperative thrombosis | pending-hit |
| Physiology | overhydration / iatrogenic fluid overload | new — TBD |
| Physiology | purpura / thrombocytopenia bleeding | pending-hit |
| Physiology | vitamin B12 / B12 nuclear division | live-hit |
| Physiology | erythropoiesis hypoxia / hypoxia red cells | new — TBD |
| Physiology | microcytic anaemia / hypochromic anaemia | pending-hit |
| Physiology | erythrocyte biconcavity / red-cell deformability | new — TBD |
| Physiology | fibrinogen factors / fibrinogen group | new — TBD |
| Physiology | polycythaemia / primary secondary polycythaemia | pending-hit |
| Physiology | anaemia classification / RBC-size anaemia | live-hit |
| Histology | FISH / fluorescence in-situ hybridisation | pending-hit |
| Histology | apocrine secretion / lactating mammary gland | live-hit |
| Histology | organ of Corti / sensory neuroepithelium | pending-hit |
| Histology | desmosome / pemphigus antibody | pending-hit |
| Histology | gap junction / smooth-muscle communication | live-hit |
| Histology | Barr body / sex chromatin | pending-hit |
| Histology | formalin fixation / 10% formal saline | new — TBD |
| Histology | bronchus epithelium / ciliated pseudostratified bronchus | new — TBD |
| Histology | vas deferens epithelium / vas deferens stereocilia | new — TBD |
| Histology | basal lamina collagen IV / type-IV collagen | pending-hit |
| Histology | chromosome aberration / structural chromosomal abnormality | new — TBD |
| Histology | mitosis phases / stages of mitosis | new — TBD |
| Histology | lysosome–peroxisome comparison / peroxisome lysosome difference | new — TBD |
| Histology | myoepithelial cell / myoepithelial secretion | pending-hit |

## Department hand-off split

Completed subset only: Anatomy 9 concepts (live 5, pending 2, new 2); Physiology 13 (5, 4, 4); Histology 14 (2, 6, 6).  This is a future authoring split, not permission to author or allocate canonical module IDs.

## Remaining sources / blocker

**Remaining file list:** all selected ledger rows except the three paths in the completed family above — 112 inventory paths / 105 further SHA-256s, including 39 empty-text and six sparse-text rows.  The command in Evidence is the authoritative exact, path-and-hash-bearing list and must be re-run against the root/Desktop evidence before a continuation claims any question count; no count for those unread sources is estimated here.

**BLOCKED — S1 cannot be approved:** the remaining 112 selected source paths have not had every printed question read, their official/printed keys have not been recovered, and their concepts have not been searched.  The durable evidence snapshot and literal `TRIAGE APPROVED` gate remain absent.  Next: render-and-read each remaining source family, beginning with the 70 substantive-text rows, then update this table from observed questions only.

## Continuation pass — Anatomy EOM written final, Fall 2025

The asserted starting remaining-hash checksum `91625c5786125418de014342444bb52bacea6d8e235c4b31414b3200fd55a3c8` was reproduced from the sorted, newline-joined (with **no** trailing newline) set of 105 hashes before this pass.  The next bounded source was selected from its 67 substantive-text rows: the highest-ranked unread two-page `06 EOM Exams` paper, ahead of keyed-exam and MCQ sources.  Both pages were rendered and read; the text layer is substantive.

| Department | Category | Source path | SHA-256 | Pages | Printed questions read | Printed answers recovered |
|---|---|---|---|---:|---:|---:|
| Anatomy | `06 EOM Exams` | `Year 1/Semester 101/FHB 101/Anatomy/06 EOM Exams/EOM - Embryology Written final exam FHB 101 Fall 2025.pdf` | `a569f3a6960887f8852b74db3a73a828f642b4857e68ccad9c81db8a3993fbec` | 2 | 3 | 3 |

| Page | Printed question read | Printed answer recovered (transcribed only) | Assigned tested concept | Manual multi-query result |
|---:|---|---|---|---|
| 1 | `Embryologic derivatives of the ectoderm include three parts:` | Surface ectoderm, neural tube, neural crest; the listed derivatives are also printed. | Ectodermal derivatives | `ectoderm derivatives` + `surface ectoderm`: new; matches the already-triaged new concept `surface ectoderm / ectoderm derivatives`. |
| 1–2 | `Derivatives of the intra embryonic mesoderm include …` | Paraxial, intermediate, and lateral plate mesoderm, with their listed derivatives. | Intraembryonic mesoderm subdivisions and derivatives | `intraembryonic mesoderm`: live-hit; `paraxial intermediate lateral plate mesoderm`: no match. |
| 2 | `Derivatives of the Endoderm include …` | Epithelial lining of the gastrointestinal tract; epithelial lining of the respiratory tracts; germ cells. | Endodermal derivatives | `endoderm`: live + pending hits; `gastrointestinal epithelial lining`: no match; classified live-hit and matches the already-triaged live endoderm concept. |

The source contributes three question-to-concept assignments but only one newly distinct ledger concept after cross-source deduplication (intraembryonic mesoderm).  Its search outcomes are live 2 / pending 0 / new 1 at assignment level; no answer was inferred or medically corrected.

## Consolidated S1 table — completed sources only

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 101 (completed sources: 2026 duplicate family + Anatomy EOM Fall 2025) | 39 | 11 | 37 | 13 | 12 | 12 | TBD |

## Remaining sources / blocker — after continuation pass

**Remaining file list:** 111 selected inventory paths / 104 unique SHA-256s.  Their sorted, newline-joined hash set (no trailing newline) checksum is `abae3dd35968a276f9c70c0c96480719e3b8d113c18c4afc5cf63b8366bcab04`.  It contains 66 substantive-text, six sparse-text, and 39 empty-text rows.  The ledger command in Evidence remains the authoritative exact path-and-hash list.

**BLOCKED — S1 cannot be approved:** the remaining 111 selected source paths have not had every printed question read, their official/printed keys have not been recovered, and their concepts have not been searched.  The durable evidence snapshot and literal `TRIAGE APPROVED` gate remain absent.  Next: render-and-read the next unread `06 EOM Exams` source family, then update from observed questions only.

## Continuation pass — final revision MCQs, Fall 2023–2024 answered duplicate family

The asserted starting remaining-hash checksum `abae3dd35968a276f9c70c0c96480719e3b8d113c18c4afc5cf63b8366bcab04` was reproduced from the sorted, newline-joined (with **no** trailing newline) set of 104 hashes before this pass.  The next selected unread substantive EOM family is the exact two-path duplicate below.  All ten pages were rendered and read; grey highlighting identifies every printed answer, so all 48 keys below are transcribed from the page rather than inferred.

| Inventory paths (both `06 EOM Exams`) | SHA-256 | Pages | Printed questions read | Printed keys recovered |
|---|---|---:|---:|---:|
| `Year 1/Semester 101/FHB 101/Anatomy/06 EOM Exams/EOM MCQs - FHB revision (Final Fall 2023-2024) - answered (2).pdf`; `Year 1/Semester 101/FHB 101/Physiology/06 EOM Exams/EOM MCQs - FHB revision (Final Fall 2023-2024) - answered (2).pdf` | `349ca7a6f8d6fb2622384456c8ecc03a3b8088c1cd09b8fd58d41af4eaa8b54f` | 10 | 48 | 48 |

Although carried in both departmental inventory folders, this is one exact document and is counted once.  Its printed content is blood/erythropoiesis physiology; no Anatomy-specific item was manufactured from the duplicate path.

| Q | Printed answer recovered | Assigned tested concept |
|---:|---|---|
| 1 | `d. Late erythroblast` | Haemoglobin accumulation during erythroblast maturation |
| 2 | `d. Third trimester of intrauterine life` | Fetal-to-medullary haematopoietic-site transition |
| 3 | `a. Ferritin` | Intracellular ferric-iron storage |
| 4 | `b. It enhances formation and docking of ferroportin` | Hepcidin–ferroportin regulation of iron export |
| 5 | `d. It increases hepcidin formation and secretion` | Erythroferrone regulation of hepcidin |
| 6 | `b. Intrinsic factor` | Intrinsic-factor-dependent vitamin B12 absorption |
| 7 | `d. Newly born infants` | Physiological polycythaemia / neonatal haemoglobin |
| 8 | `c. Acid-base buffer` | Globin moiety and haemoglobin buffering |
| 9 | `b. Carriage of oxygen molecules` | Heme moiety and oxygen binding |
| 10 | `d. Glycosylated hemoglobin` | HbA1c as glycaemic-control marker |
| 11 | `a. Eryptosis` | Programmed erythrocyte death |
| 12 | `c. Sepsis` | Sepsis as an eryptosis-promoting factor |
| 13 | `a. Hyperdynamic circulation` | Clinical effects of polycythaemia / raised viscosity |
| 14 | `a. Normocytic normochromic` | Acute blood-loss anaemia pattern |
| 15 | `a. 85-90 femtoliter` | Normal mature-red-cell volume (MCV) |
| 16 | `d. Rouleaux formation` | Rouleaux formation |
| 17 | `a. Spleen` | Reticuloendothelial clearance of old erythrocytes |
| 18 | `d. High barometric pressure increases erythrocyte count in peripheral blood` | Physiological polycythaemia / neonatal haemoglobin |
| 19 | `b. Determination of blood grouping` | Erythrocyte-membrane versus cytoplasmic functions |
| 20 | `c. It is impermeable to ions and inorganic solutes` | Erythrocyte-membrane properties |
| 21 | `d. Hemoglobin content is decrease by ≥ 50% normal` | Severe-anaemia transfusion threshold (as printed) |
| 22 | `d. Reticulocyte` | Reticulocytes in marrow and peripheral blood |
| 23 | `c. Testosterone` | Testosterone stimulation of erythropoiesis |
| 24 | `c. It is downregulated by erythroferrone` | Hepcidin–ferroportin regulation of iron export |
| 25 | `d. It increases hepcidin formation and secretion` | Erythroferrone regulation of hepcidin |
| 26 | `d. Chronic inflammation` | Hepcidin–ferroportin regulation of iron export |
| 27 | `c. Erythropoietin (EPO)` | Erythropoietin-stimulated erythropoiesis |
| 28 | `c. Calcium salts` | Dietary calcium and intestinal iron absorption |
| 29 | `b. Folic acid is important to RBC maturation` | Folate in erythroid maturation (printed wrong-statement choice) |
| 30 | `d. Vitamin B12 (Cobalamin)` | Vitamin B12 dietary source |
| 31 | `d. Red bone marrow of irregular bones` | Age-related distribution of active red marrow |
| 32 | `a. Anemia caused by BM depression is characterized by low MVC & low MCH` | Bone-marrow-depression anaemia pattern (printed incorrect-statement choice) |
| 33 | `a. 2 alpha and 2 beta chains` | Adult haemoglobin globin-chain composition |
| 34 | `b. Red bone marrow` | Age-related distribution of active red marrow |
| 35 | `a. Vitamin B12 deficiency` | Vitamin-B12 deficiency and defective erythrocyte maturation |
| 36 | `c. Mean corpuscular volume (MCV) is about 87 cubic µm` | Normal mature-red-cell volume (MCV) |
| 37 | `b. Is produced by the gastric parietal cells` | Intrinsic-factor-dependent vitamin B12 absorption |
| 38 | `a. It is not found in the vertebrae of adults` | Age-related distribution of active red marrow |
| 39 | `d. Is decreased if the stomach loses the ability to produce a normal gastric juice` | Intrinsic-factor-dependent vitamin B12 absorption |
| 40 | `d. Hypertension` | Incompatible-transfusion consequences |
| 41 | `b. Group O Rh -ve` | ABO/Rh blood compatibility |
| 42 | `c. Carbon monoxide` | Carbon-monoxide affinity for haemoglobin |
| 43 | `d. Iron is present in adult normal hemoglobin in ferric form` | Haemoglobin iron oxidation state (printed incorrect-statement choice) |
| 44 | `d. Living at high altitudes` | Physiological polycythaemia / neonatal haemoglobin |
| 45 | `b. Iron deficiency anemia is microcytic` | Iron-deficiency microcytic anaemia |
| 46 | `b. They are responsible for the major part of blood viscosity` | Erythrocyte contribution to blood viscosity |
| 47 | `b. Takes place in the reticuloendothelial system` | Reticuloendothelial clearance of old erythrocytes |
| 48 | `c. It produces aplastic anemia` | Vitamin-B12 deficiency and defective erythrocyte maturation |

The family yields 33 distinct source concepts after within-paper collapse.  Six map to concepts already represented in the completed sources (intrinsic-factor/B12 absorption; polycythaemia; MCV/anaemia classification; erythropoietic response to hypoxia/EPO; B12-dependent maturation; iron-deficiency microcytosis), so it adds 27 cumulative distinct concepts.

## Tested-concept search ledger — Fall 2023–2024 family

Every source-distinct concept was checked with the manual search tool against both its compact distinctive term and a separate synonym/phrase recorded in the table.  `live-hit` and `pending-hit` mean the tool returned a live or unimported record respectively; no identifier is proposed here.

| Tested concept (two search phrases) | Result |
|---|---|
| Haemoglobin accumulation during erythroblast maturation (`late erythroblast`; `erythroblast hemoglobin`) | new — TBD |
| Fetal-to-medullary haematopoietic-site transition (`fetal hematopoiesis`; `marrow third trimester`) | new — TBD |
| Intracellular ferric-iron storage (`ferritin`; `intracellular iron`) | pending-hit |
| Hepcidin–ferroportin regulation of iron export (`hepcidin`; `ferroportin`) | pending-hit |
| Erythroferrone regulation of hepcidin (`erythroferrone`; `erythroferrone hepcidin`) | new — TBD |
| Intrinsic-factor-dependent vitamin B12 absorption (`intrinsic factor`; `cobalamin gastric`) | pending-hit; already represented in the completed-source ledger |
| Physiological polycythaemia / neonatal haemoglobin (`neonatal hemoglobin`; `physiological polycythemia`) | pending-hit through the earlier `polycythaemia` result |
| Globin moiety and haemoglobin buffering (`globin buffer`; `hemoglobin acid-base`) | new — TBD |
| Heme moiety and oxygen binding (`heme oxygen`; `haem oxygen`) | pending-hit |
| HbA1c as glycaemic-control marker (`glycosylated hemoglobin`; `HbA1c`) | pending-hit |
| Programmed erythrocyte death / its sepsis trigger (`eryptosis`; `sepsis eryptosis`) | new — TBD |
| Acute blood-loss anaemia pattern (`acute blood loss`; `normocytic anemia`) | live-hit |
| Normal mature-red-cell volume (MCV) (`mean corpuscular volume`; `MCV`) | pending-hit; already represented in the completed-source ledger |
| Rouleaux formation (`rouleaux`; `red cell aggregation`) | pending-hit |
| Reticuloendothelial clearance of old erythrocytes (`erythrocyte breakdown`; `reticuloendothelial`) | live-hit |
| Erythrocyte-membrane functions and properties (`erythrocyte membrane`; `RBC membrane`) | live-hit |
| Severe-anaemia transfusion threshold (`blood transfusion threshold`; `anemia transfusion`) | new — TBD |
| Reticulocytes in marrow and peripheral blood (`reticulocyte`; `circulating reticulocytes`) | live-hit |
| Testosterone stimulation of erythropoiesis (`testosterone erythropoiesis`; `androgen erythropoiesis`) | new — TBD |
| Erythropoietin-stimulated erythropoiesis (`erythropoietin`; `EPO erythroid`) | pending-hit; already represented in the completed-source ledger |
| Dietary calcium and intestinal iron absorption (`calcium iron`; `iron absorption calcium`) | new — TBD |
| Folate in erythroid maturation (`folate`; `folic acid`) | pending-hit |
| Vitamin B12 dietary source (`vitamin B12`; `cobalamin`) | pending-hit |
| Age-related distribution of active red marrow (`active marrow`; `red marrow distribution`) | new — TBD |
| Bone-marrow-depression anaemia pattern (`bone marrow depression anemia`; `marrow failure anemia`) | new — TBD |
| Adult haemoglobin globin-chain composition (`adult hemoglobin`; `alpha beta globin`) | live-hit |
| Vitamin-B12 deficiency and defective erythrocyte maturation (`B12 maturation`; `megaloblastic`) | pending-hit; already represented in the completed-source ledger |
| Incompatible-transfusion consequences (`incompatible transfusion`; `transfusion reaction`) | live-hit |
| ABO/Rh blood compatibility (`blood compatibility`; `ABO Rh`) | new — TBD |
| Carbon-monoxide affinity for haemoglobin (`carbon monoxide`; `carboxyhemoglobin`) | live-hit |
| Haemoglobin iron oxidation state (`ferrous iron`; `hemoglobin iron`) | new — TBD |
| Iron-deficiency microcytic anaemia (`iron deficiency`; `microcytic`) | live-hit; already represented in the completed-source ledger |
| Erythrocyte contribution to blood viscosity (`erythrocyte viscosity`; `hematocrit viscosity`) | new — TBD |

## Consolidated S1 table — completed sources only

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 101 (completed sources: 2026 duplicate family + Anatomy EOM Fall 2025 + Fall 2023–2024 answered duplicate family) | 87 | 59 | 64 | 19 | 20 | 25 | TBD |

**Observed delta:** +48 questions, +48 printed keys, +33 source-distinct tested concepts / +27 after cross-source deduplication.  The cumulative search buckets reconcile exactly: `19 + 20 + 25 = 64`; no module ID, content record, or placement was created.

## Remaining sources / blocker — after Fall 2023–2024 family

**Remaining file list:** 109 selected inventory paths / 103 unique SHA-256s.  Their sorted, newline-joined hash set (no trailing newline) checksum is `ac1ee45623f6a35a97b87170181f14bf12e50b512c8f6be2c668ab5cca8f7291`.  It contains 64 substantive-text, six sparse-text, and 39 empty-text rows.  The ledger command in Evidence remains the authoritative exact path-and-hash list.

**BLOCKED — S1 cannot be approved:** the remaining 109 selected source paths have not had every printed question read, their official/printed keys have not been recovered, and their concepts have not been searched.  The durable evidence snapshot and literal `TRIAGE APPROVED` gate remain absent.  Next: render-and-read the next unread substantive `06 EOM Exams` source family, then update from observed questions only.

## Continuation pass — General Embryology final-night / Fall final 2025 family

The asserted starting remaining-hash checksum `ac1ee45623f6a35a97b87170181f14bf12e50b512c8f6be2c668ab5cca8f7291` was reproduced from the sorted, newline-joined (with **no** trailing newline) set of 103 hashes before this pass.  The next evidence-ranked unread substantive `06 EOM Exams` source was selected because it is an EOM-family paper with its printed `Model Answers of Embryology FHB` page, including a separately labelled Fall final 2025 key.  All eleven pages were rendered and read; its text layer is substantive.

| Department | Category | Source path | SHA-256 | Pages | Printed questions read | Printed keys recovered |
|---|---|---|---|---:|---:|---:|
| Anatomy | `06 EOM Exams` | `Year 1/Semester 101/FHB 101/Anatomy/06 EOM Exams/EOM MCQs - General Embryology 101 Final night exams questions.pdf` | `3185bf1cbb970c279afdc5bc0a36f9aef98fc50198a30619e940198105b08d6a` | 11 | 78 | 77 |

The 78 questions comprise 65 numbered `Final M.C.Qs` (the printed series skips 44), five matching prompts, seven Fall final 2025 MCQs, and one Fall final 2025 essay.  The printed key supplies 64 option keys for the 65-numbered MCQs: item 27 is explicitly marked `سؤال غلط` ("wrong question") instead of an answer option.  The five matching keys, seven Fall-final option keys, and the one printed essay answer were transcribed as printed; no answer was inferred or medically corrected.

### Question/key assignment ledger

`M` denotes the five printed matching prompts; `F` denotes Fall final 2025 MCQs; `E` denotes its written prompt.  Every printed question is represented below, while repeated prompts are collapsed only for the assigned tested concept.

| Printed question(s) read | Printed answer(s) recovered, transcribed only | Assigned tested concept |
|---|---|---|
| 1 | `a. Endometrium` | Endometrial uterine lining |
| 2, 26 | `2 b. Umbilical vesicle`; `26 b. Endoderm` | Primordial-germ-cell origin and migration |
| 3, 6, 7, 65 | `3 b. Uterine tube`; `6 a. Fertilization`; `7 b. Ampulla`; `65 c. Ampulla of the uterine tube` | Fertilization: definition and usual tubal/ampullary site |
| 4, 60, F2 | `4 c. Gametogenesis`; `60 c. 22 autosomes and one sex chromosome`; `F2 E. Female gamete contains 22 autosomes and one sex chromosome` | Gametogenesis and gamete chromosome complement |
| 5 | `b. Secondary oocyte` | Secondary oocyte as the female gamete |
| 8, 10, 30, F4 | `8 a. Blastogenesis`; `10 c. Blastocyst`; `30 c. about 600 blastomeres`; `F4 A. 1st week` | Morula-to-blastocyst development and timing |
| 9, 61, F3 | `9 c. Epiblast`; `61 b. Epiblast`; `F3 B. Epiblast` | Epiblast as the floor of the amniotic cavity |
| 11, 12 | `11 c. 500 gm`; `12 d. The fetal surface is rough` | Full-term placenta: weight and gross surfaces |
| 13, 34, 64 | `13 a. Neural crest`; `34 a. Neural crest`; `64 b. Neural crest` | Neural-crest derivatives |
| 14, 33, 63, M3 | `14 d. It gives somites`; `33 b. Neural tube`; `63 a. Brain`; `M3 a. Spinal cord` | Neural-tube derivatives |
| 15, 31, 57, M5, F6 | `15 c. Trophoblast`; `31 a. Epiblast`; `57 b. Epiblast`; `M5 b. Epiblast`; `F6 D. Epiblast` | Embryonic germ layers and their epiblast source |
| 16, 17 | `16 b. Syncytiotrophoblast`; `17 c. Cytotrophoblast` | Trophoblast layers |
| 18, 19, 20, 28, 62 | `18 c. Implantation`; `19 a. Upper posterior wall`; `20 b. 10th day`; `28 d. usually followed by cleavage`; `62 d. Upper posterior wall` | Implantation: process, timing, site, and features |
| 23, 24, 56 | `23 b. Notochord`; `24 b. Nucleus pulposus`; `56 b. Remnants of notochord` | Notochord and nucleus-pulposus derivative |
| 25, 42 | `25 b. Folding`; `42 a. Formation of the umbilical ring` | Embryonic folding and umbilical-ring formation |
| 27 | Printed `سؤال غلط` (wrong question); no answer option is printed. | Cleavage |
| 29 | `a. Formation of notochord` | Outcomes of fertilization |
| 32 | `c. Ectoderm` | Surface-ectoderm derivative |
| 35, M2 | `35 c. Somites`; `M2 c. Somites` | Somite formation from paraxial mesoderm |
| 36, 41 | `36 b. 44`; `41 b. Their number is about 14` | Somite number |
| 37 | `b. Bones & cartilage` | Sclerotome derivatives |
| 38, 39 | `38 a. Muscles`; `39 c. Dermis of skin` | Myotome and dermatome derivatives |
| 40 | `c. Urinary system` | Intermediate-mesoderm urinary-system derivative |
| 45 | `b. Placenta` | Placental nutrition and gas-exchange function |
| 46 | `c. 2` | Number of placental membranes late in pregnancy |
| 47 | `b. Placenta praevia` | Placenta praevia |
| 48 | `a. 2 arteries, 1 vein` | Umbilical-cord vessels |
| 49 | `b. 50 cm` | Umbilical-cord length |
| 50 | `a. One zygote` | Monozygotic twinning |
| 51, 52 | `51 b. Embryo`; `52 c. Fetus` | Embryonic and fetal periods |
| 53 | `b. Polyhydramnios` | Polyhydramnios |
| 54 | `c. Uterine tube` | Ectopic pregnancy: usual tubal site |
| 21, 22, 55 | `21 b. Gastrulation`; `22 a. Primitive streak`; `55 c. Primitive streak` | Gastrulation and primitive streak |
| 58 | `b. Peritoneal cavity` | Intraembryonic coelom derivative |
| 43, 59, M1, F5, E | `43 a. Lining of GIT`; `59 b. Endoderm`; `M1 e. Epithelium of G.I.T.`; `F5 B. Endoderm`; `E: epithelial lining of gastrointestinal and respiratory tracts; germ cells` | Endodermal derivatives |
| 66, M4, F7 | `66 a. Chorion frondosum`; `M4 d. Decidua basalis`; `F7 A. Decidua basalis` | Placental fetal and maternal components |
| F1 | `B. Testes` | Male primary sex organ |

### Tested-concept search ledger — General Embryology family

Each source-distinct concept was searched with the manual tool using the two recorded phrases.  `live-hit` takes precedence when either query returns live state; otherwise a pending result is retained.  `Already triaged` means question-to-concept deduplication against an earlier completed FHB source, not a proposed identifier or placement.

| Tested concept (two search phrases) | Result |
|---|---|
| Endometrial uterine lining (`endometrium`; `uterine lining`) | pending-hit |
| Primordial-germ-cell origin and migration (`primordial germ cell`; `umbilical vesicle`) | new — TBD |
| Fertilization: definition and usual tubal/ampullary site (`fertilization ampulla`; `site fertilization`) | new — TBD; already triaged as a new FHB concept |
| Gametogenesis and gamete chromosome complement (`gametogenesis`; `gamete chromosomes`) | pending-hit; already triaged |
| Secondary oocyte as the female gamete (`secondary oocyte`; `female gamete`) | live-hit |
| Morula-to-blastocyst development and timing (`blastocyst`; `morula cavity`) | live-hit |
| Epiblast as the floor of the amniotic cavity (`epiblast`; `amniotic cavity`) | live-hit |
| Full-term placenta: weight and gross surfaces (`full term placenta`; `placental fetal surface`) | new — TBD |
| Neural-crest derivatives (`neural crest`; `suprarenal medulla`) | pending-hit |
| Neural-tube derivatives (`neural tube`; `brain spinal cord`) | live-hit |
| Embryonic germ layers and their epiblast source (`three germ layers`; `epiblast`) | pending-hit |
| Trophoblast layers (`syncytiotrophoblast`; `cytotrophoblast`) | live-hit |
| Implantation: process, timing, site, and features (`implantation day`; `implantation site`) | new — TBD |
| Notochord and nucleus-pulposus derivative (`notochord`; `nucleus pulposus`) | pending-hit |
| Embryonic folding and umbilical-ring formation (`embryonic folding`; `umbilical ring`) | live-hit |
| Cleavage (`cleavage`; `morula`) | pending-hit |
| Outcomes of fertilization (`fertilization outcomes`; `diploid chromosomes`) | new — TBD |
| Surface-ectoderm derivative (`surface ectoderm`; `ectoderm derivatives`) | new — TBD; already triaged as a new FHB concept |
| Somite formation from paraxial mesoderm (`somites`; `paraxial mesoderm`) | live-hit |
| Somite number (`somite number`; `fifth week somites`) | pending-hit |
| Sclerotome derivatives (`sclerotome`; `vertebrae ribs`) | pending-hit; already triaged |
| Myotome and dermatome derivatives (`myotome`; `dermatome`) | live-hit |
| Intermediate-mesoderm urinary-system derivative (`intermediate mesoderm`; `urinary system embryology`) | new — TBD |
| Placental nutrition and gas-exchange function (`placenta gas exchange`; `placental function`) | new — TBD |
| Number of placental membranes late in pregnancy (`placental membranes`; `placental membrane`) | pending-hit |
| Placenta praevia (`placenta previa`; `lower uterine segment placenta`) | live-hit |
| Umbilical-cord vessels (`umbilical cord vessels`; `two arteries one vein`) | new — TBD |
| Umbilical-cord length (`umbilical cord length`; `fifty centimetres cord`) | new — TBD |
| Monozygotic twinning (`monozygotic twins`; `identical twins`) | live-hit |
| Embryonic and fetal periods (`embryonic period`; `fetal period`) | live-hit |
| Polyhydramnios (`polyhydramnios`; `amniotic fluid excess`) | pending-hit |
| Ectopic pregnancy: usual tubal site (`ectopic pregnancy`; `tubal implantation`) | live-hit; already triaged |
| Gastrulation and primitive streak (`primitive streak`; `gastrulation first sign`) | live-hit; already triaged |
| Intraembryonic coelom derivative (`intraembryonic coelom`; `peritoneal cavity`) | live-hit |
| Endodermal derivatives (`endoderm`; `gastrointestinal epithelial lining`) | live-hit; already triaged |
| Placental fetal and maternal components (`decidua basalis`; `maternal placenta`) | live-hit; already triaged |
| Male primary sex organ (`male primary sex organ`; `testes`) | live-hit |

The family has 37 source-distinct tested concepts.  Eight reproduce already-triaged FHB concepts (fertilization site, gametogenesis/gamete complement, surface ectoderm, sclerotome, ectopic pregnancy, gastrulation/primitive streak, endodermal derivatives, and placental components), so it adds 29 cumulative distinct concepts.  At source-concept level its result split is live 17 / pending 10 / new 10; the non-duplicated delta is live 13 / pending 8 / new 8.

## Consolidated S1 table — completed sources only

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 101 (completed sources: 2026 duplicate family + Anatomy EOM Fall 2025 + Fall 2023–2024 answered duplicate family + General Embryology final-night/Fall final 2025 family) | 165 | 136 | 93 | 32 | 28 | 33 | TBD |

**Observed delta:** +78 questions, +77 printed keys, +37 source-distinct tested concepts / +29 after cross-source deduplication.  The cumulative search buckets reconcile exactly: `32 + 28 + 33 = 93`; no module ID, content record, or placement was created.

## Remaining sources / blocker — after General Embryology family

**Remaining file list:** 108 selected inventory paths / 102 unique SHA-256s.  Their sorted, newline-joined hash set (no trailing newline) checksum is `3084eb6d68a52f0d4954d50f0f5b9c23b0e17dcedcf2da2abb3894254cc7e1ca`.  It contains 63 substantive-text, six sparse-text, and 39 empty-text rows.  The ledger command in Evidence remains the authoritative exact path-and-hash list.

**BLOCKED — S1 cannot be approved:** the remaining 108 selected source paths have not had every printed question read, their official/printed keys have not been recovered, and their concepts have not been searched.  The durable evidence snapshot and literal `TRIAGE APPROVED` gate remain absent.  Next: render-and-read the next unread substantive `06 EOM Exams` source family, then update from observed questions only.

## Continuation pass — SOLO final Anatomy clean-test / answered family

The asserted starting remaining-hash checksum `3084eb6d68a52f0d4954d50f0f5b9c23b0e17dcedcf2da2abb3894254cc7e1ca` was reproduced from the sorted, newline-joined (with **no** trailing newline) set of 102 hashes before this pass.  The next evidence-ranked unread substantive `06 EOM Exams` family is the paired final-Anatomy paper below: an unmarked clean-test copy with a printed terminal answer-key page and a separately labelled answered copy.  All 19 pages were rendered and read.

| Inventory source path | SHA-256 | Pages | Printed questions read | Printed keys recovered |
|---|---|---:|---:|---:|
| `Year 1/Semester 101/FHB 101/Anatomy/06 EOM Exams/EOM MCQs - SOLO_MCQS_Final_Anatomy_Clean_Test_Version (2).pdf` | `e52ac69820eff5407e033622c6163130ce2e52f1624eade5a46ee3e3fb266bcb` | 10 | 50 | — |
| `Year 1/Semester 101/FHB 101/Anatomy/06 EOM Exams/EOM MCQs - [Answers] SOLO MCQS - Final Anatomy.pdf` | `5606f1829f2868ca94669174e185a385aebc3ba38c913b1921cfc769add2ed56` | 9 | duplicate questions | 50 |

The answered copy visibly highlights one printed option for every item; its 50 highlighted options are transcribed below.  The clean-test copy's terminal typed `ANSWER KEY` is also printed evidence, but it has a bare `Q9: b` followed by a visibly shifted Q10–Q51 sequence for the fifty-question paper.  That misalignment was recorded and not used for the key transcriptions below.

### Question/key assignment ledger

| Printed question(s) read | Printed answer(s) recovered, transcribed only | Assigned tested concept |
|---|---|---|
| 1 | `b. Ovaries` | Female primary sex organs |
| 2 | `c. Three` | Uterine wall layers |
| 3, 31 | `3 c. Uterine tubes`; `31 b. Site of fertilization` | Fertilization site in the uterine tube |
| 4 | `b. Uterine tubes` | Sex-specific anatomy of the male reproductive system |
| 5, 43 | `5 b. Metabolism`; `43 b. Synthesize glycogen and fatty acids` | Placental metabolic functions |
| 6 | `a. Excess amniotic fluid` | Polyhydramnios |
| 7 | `b. Fetal abnormalities` | Single umbilical artery as a fetal-abnormality signal |
| 8 | `b. Maintain corpus luteum` | hCG maintenance of the corpus luteum |
| 9 | `b. Abnormal implantation in the endometrium` | Placenta praevia |
| 10 | `b. 50 cm` | Umbilical-cord length at term |
| 11 | `c. Secondary oocyte` | Secondary oocyte as the female gamete |
| 12 | `b. 23` | Haploid gamete chromosome complement |
| 13 | `c. Sperm` | Sperm as the male gamete |
| 14 | `b. Abnormal gametes` | Effects of meiotic disturbance on gametes |
| 15 | `b. Changes in the ovaries` | Ovarian cycle |
| 16 | `b. Changes in the endometrium` | Menstrual-cycle endometrial change |
| 17 | `b. Abnormal implantation in the uterine tube` | Ectopic pregnancy: tubal implantation |
| 18 | `c. Contract during labor` | Myometrial contraction in labour |
| 19, 40 | `19 b. Nourish the embryo`; `40 a. Support fetal development` | Endometrial support of early pregnancy |
| 20 | `b. Produce seminal fluid` | Seminal-vesicle secretion |
| 21 | `b. Store and mature sperm` | Epididymal sperm storage and maturation |
| 22 | `b. Produce seminal fluid` | Prostatic secretion |
| 23 | `d. All of the above` | Vaginal functions |
| 24, 25 | `24 d. Both a and b`; `25 c. Both a and b` | Gonadal endocrine and gamete-producing functions |
| 26 | `a. Protect the uterus` | Perimetrium as the outer uterine layer |
| 27, 29, 35 | `27 a. Protect the fetus`; `29 d. All of the above`; `35 d. All of the above` | Fetal-membrane functions (amnion and chorion) |
| 28 | `a. Connect fetus to placenta` | Umbilical-cord connection of fetus and placenta |
| 30 | `b. Abnormal invasion of the placenta` | Placenta accreta |
| 32 | `b. Produce hormones` | Corpus-luteum hormonal function |
| 33 | `b. Form the digestive system` | Endodermal digestive-system derivative |
| 34, 47 | `34 b. Transfer nutrients and oxygen`; `47 c. Both a and b` | Placental nutrient and gas transfer |
| 36, 37 | `36 b. Carry oxygenated blood to the fetus`; `37 b. Carry deoxygenated blood from the fetus` | Umbilical-cord circulation |
| 38 | `a. Protect the fetus` | Protective functions of amniotic fluid |
| 39 | `a. Produce hormones` | Placental endocrine secretion |
| 41, 42 | `41 a. Provide genetic material`; `42 a. Provide genetic material` | Gamete genetic contribution to fertilization |
| 44 | `a. Pump blood` | Fetal cardiac pumping function |
| 45 | `c. Both a and b` | Maternal blood supply in pregnancy |
| 46 | `a. Oxygenate blood` | Fetal-lung function (printed key retained as printed) |
| 48 | `b. Remove waste` | Fetal-kidney waste removal |
| 49 | `b. Metabolize nutrients` | Fetal-liver metabolic function |
| 50 | `a. Control body functions` | Fetal-brain control of body functions |

The 50 questions collapse to 41 source-distinct tested concepts.  Eleven reproduce concepts already represented in completed FHB sources: fertilization site, polyhydramnios, placenta praevia, umbilical-cord length, secondary oocyte, gametogenesis/gamete chromosome complement, ectopic pregnancy, endometrial lining, endodermal derivatives, placental nutrient/gas transfer, and amniotic fluid.  The family therefore adds 30 cumulative distinct concepts.  No printed answer was medically corrected; Q46 in particular remains recorded only as its highlighted printed answer.

### Tested-concept search ledger — SOLO final Anatomy family

Each source-distinct concept was checked with the manual search tool using both phrases shown.  A live result takes precedence over pending.  `Already triaged` records cross-source question-to-concept collapse only; it is not an identifier or a placement.

| Tested concept (two search phrases) | Result |
|---|---|
| Female primary sex organs (`female primary sex organ`; `ovaries`) | pending-hit |
| Uterine wall layers (`uterine wall layers`; `uterine layers`) | new — TBD |
| Fertilization site in the uterine tube (`fertilization ampulla`; `uterine tube fertilization`) | new — TBD; already triaged as a new FHB concept |
| Sex-specific anatomy of the male reproductive system (`male reproductive system`; `male reproductive organs`) | live-hit |
| Placental metabolic functions (`placenta metabolism`; `placental metabolic function`) | new — TBD |
| Polyhydramnios (`polyhydramnios`; `amniotic fluid excess`) | pending-hit; already triaged |
| Single umbilical artery as a fetal-abnormality signal (`single umbilical artery`; `umbilical artery anomaly`) | pending-hit |
| hCG maintenance of the corpus luteum (`human chorionic gonadotropin`; `hCG corpus luteum`) | live-hit |
| Placenta praevia (`placenta previa`; `placenta praevia`) | live-hit; already triaged |
| Umbilical-cord length at term (`umbilical cord length`; `fifty centimetres cord`) | new — TBD; already triaged as a new FHB concept |
| Secondary oocyte as the female gamete (`secondary oocyte`; `female gamete`) | live-hit; already triaged |
| Haploid gamete chromosome complement (`gametogenesis`; `gamete chromosomes`) | pending-hit; already triaged |
| Sperm as the male gamete (`sperm male gamete`; `male gamete`) | live-hit |
| Effects of meiotic disturbance on gametes (`meiosis abnormal gametes`; `meiotic disturbance`) | new — TBD |
| Ovarian cycle (`ovarian cycle`; `ovary cyclical changes`) | live-hit |
| Menstrual-cycle endometrial change (`menstrual cycle endometrium`; `endometrial cycle`) | new — TBD |
| Ectopic pregnancy: tubal implantation (`ectopic pregnancy`; `tubal implantation`) | live-hit; already triaged |
| Myometrial contraction in labour (`myometrium contraction`; `uterine muscle labor`) | new — TBD |
| Endometrial support of early pregnancy (`endometrium`; `endometrial pregnancy support`) | pending-hit; already triaged through endometrial uterine lining |
| Seminal-vesicle secretion (`seminal vesicles`; `seminal fluid`) | live-hit |
| Epididymal sperm storage and maturation (`epididymis`; `sperm maturation`) | live-hit |
| Prostatic secretion (`prostate gland secretion`; `prostate seminal fluid`) | new — TBD |
| Vaginal functions (`vagina functions`; `vaginal childbirth`) | new — TBD |
| Gonadal endocrine and gamete-producing functions (`ovaries hormones gametes`; `testes hormones gametes`) | new — TBD |
| Perimetrium as the outer uterine layer (`perimetrium`; `outer uterine layer`) | new — TBD |
| Fetal-membrane functions (amnion and chorion) (`amnion fetal protection`; `fetal membranes function`) | new — TBD |
| Umbilical-cord connection of fetus and placenta (`umbilical cord connection`; `fetus placenta connection`) | new — TBD |
| Placenta accreta (`placenta accreta`; `abnormal placental invasion`) | pending-hit |
| Corpus-luteum hormonal function (`corpus luteum`; `corpus luteum function`) | live-hit |
| Endodermal digestive-system derivative (`endoderm digestive system`; `endoderm derivatives`) | live-hit; already triaged through endodermal derivatives |
| Placental nutrient and gas transfer (`placental nutrient oxygen transfer`; `placenta gas exchange`) | new — TBD; already triaged as a new FHB concept |
| Umbilical-cord circulation (`umbilical vein oxygenated blood`; `umbilical artery deoxygenated blood`) | new — TBD |
| Protective functions of amniotic fluid (`amniotic fluid protection`; `amniotic fluid`) | live-hit; already triaged |
| Placental endocrine secretion (`placental endocrine secretion`; `placenta hormones`) | new — TBD |
| Gamete genetic contribution to fertilization (`gamete genetic material`; `sperm egg genetic material`) | new — TBD |
| Fetal cardiac pumping function (`fetal heart pump blood`; `fetal cardiac function`) | new — TBD |
| Maternal blood supply in pregnancy (`maternal blood supply pregnancy`; `maternal placental circulation`) | new — TBD |
| Fetal-lung function (`fetal lung oxygenation`; `fetal lungs function`) | new — TBD |
| Fetal-kidney waste removal (`fetal kidney waste removal`; `fetal renal function`) | new — TBD |
| Fetal-liver metabolic function (`fetal liver metabolism`; `fetal hepatic function`) | new — TBD |
| Fetal-brain control of body functions (`fetal brain body functions`; `fetal brain function`) | new — TBD |

At source-concept level this family is live 12 / pending 6 / new 23.  After cross-source deduplication, its cumulative delta is live 7 / pending 3 / new 20.  No module ID, content record, or placement was created.

## Consolidated S1 table — completed sources only

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 101 (completed sources: 2026 duplicate family + Anatomy EOM Fall 2025 + Fall 2023–2024 answered duplicate family + General Embryology final-night/Fall final 2025 family + SOLO final Anatomy family) | 215 | 186 | 123 | 39 | 31 | 53 | TBD |

**Observed delta:** +50 questions, +50 printed keys, +41 source-distinct tested concepts / +30 after cross-source deduplication.  The cumulative search buckets reconcile exactly: `39 + 31 + 53 = 123`; no module ID, content record, or placement was created.

## Remaining sources / blocker — after SOLO final Anatomy family

**Remaining file list:** 106 selected inventory paths / 100 unique SHA-256s.  Their sorted, newline-joined hash set (no trailing newline) checksum is `226fc42be94f6b996c8134be81601e7696133184b5b6af0a290dec39416b8918`.  It contains 61 substantive-text, six sparse-text, and 39 empty-text rows.  The ledger command in Evidence remains the authoritative exact path-and-hash list.

**BLOCKED — S1 cannot be approved:** the remaining 106 selected source paths have not had every printed question read, their official/printed keys have not been recovered, and their concepts have not been searched.  The durable evidence snapshot and literal `TRIAGE APPROVED` gate remain absent.  Next: render-and-read the next unread substantive `06 EOM Exams` source family, then update from observed questions only.

## Continuation pass — Histology final written / expected-answer family

The asserted starting remaining-hash checksum `226fc42be94f6b996c8134be81601e7696133184b5b6af0a290dec39416b8918` was reproduced from the sorted, newline-joined (with **no** trailing newline) set of 100 hashes before this pass.  Its pinned triage text classification was 61 substantive-text, six sparse-text, and 39 empty-text rows across 106 inventory paths.  The next evidence-ranked unread substantive `06 EOM Exams` family is the bounded Histology final-written paper: a two-page clean question sheet plus a three-page expected-answer version (also held at one exact-duplicate path).  All five pages of the two unique documents were rendered and read.  The answered document prints the same eleven prompts and their model answers; no answer was inferred, corrected, or supplied from outside the family.

| Inventory source path | SHA-256 | Pages | Printed questions read | Printed answers recovered |
|---|---|---:|---:|---:|
| `Year 1/Semester 101/FHB 101/Histology/06 EOM Exams/EOM MCQs - Histology 101 final written.pdf` | `14aca09deac964563bef09fe2f12b651db40c7d789bad98527d56f90d74f8668` | 2 | 11 | — |
| `Year 1/Semester 101/FHB 101/Histology/06 EOM Exams/EOM MCQs - Histology 101 final written-1.pdf`; `_Exact Duplicates/Year 1/Semester 101/FHB 101/Histology/06 EOM Exams/EOM MCQs - Histology 101 final written (Answers).pdf` | `441ea28e2179fa0488d8afed03d595aae31e97087607c13d16c929fe0db62906` | 3 | duplicate questions | 11 |

The second row is one byte-identical answer document represented by two inventory paths; it is counted once.  The clean document confirms all eleven prompts, while the answer document is the printed-key evidence.

### Question/key assignment ledger

| Q | Printed question read | Printed answer recovered (transcribed only) | Assigned tested concept |
|---:|---|---|---|
| 1 | `List three general characteristics of the epithelial tissue.` | All germ layers; surface/cavity covering; basement-membrane attachment; avascular but innervated; highly regenerative. | General characteristics of epithelial tissue |
| 2 | `Comment on myoepithelium and neuroepithelium.` | Myoepithelial cells are contractile actin/myosin-containing cells between secretory cells and their basement membrane that squeeze secretion into ducts; neuroepithelial cells are sensory receptors, with taste buds and organ of Corti printed as examples. | Myoepithelium and sensory neuroepithelium |
| 3 | `Define telomeres and explain their influence on the chromosome’s structure.` | Repeated non-coding sequence at chromosome ends; protects and stabilises against destruction/fusion; printed text also says it limits cell division and has a role in ageing, ending with the incomplete phrase `and can`. | Telomeres and chromosome-end protection |
| 4 | `Comment briefly on the Barr body.` | Dark chromatin mass at the inner nuclear envelope in female-cell nuclei/drumstick-like in female neutrophils; represents the inactive coiled X chromosome while the other X is active. | Barr body (sex chromatin) |
| 5 | `Compare between mitosis and meiosis` | Printed table contrasts somatic/germ cells, one/two divisions and stages, absent/present crossing over, interphase S phase, and two identical diploid/four varied haploid daughter cells. | Mitosis versus meiosis |
| 6 | `Compare between necrosis and apoptosis.` | Printed table contrasts pathological injury-associated necrosis with programmed cell death, and their nuclear changes, light-microscopy appearance, and fate. | Necrosis versus apoptosis |
| 7 | `Compare between euploidy and aneuploidy` | Printed table contrasts added haploid sets with gain/loss of one chromosome, causes, and listed triploidy/tetraploidy versus trisomy/monosomy examples. | Euploidy versus aneuploidy |
| 8 | `Mention the chromosomal aberrations (numerical and structural)` | Numerical table names euploidy, aneuploidy, and mosaicism; printed structural list is deletion, translocation, inversion, ring chromosome, isochromosomes, and duplication. | Numerical and structural chromosomal aberrations |
| 9 | `Compare between sER and rER` | Printed table contrasts protein-forming/basophilic ribosome-bearing parallel rER with lipid-forming/acidophilic ribosome-free anastomosing sER, including their listed functions. | Smooth versus rough endoplasmic reticulum |
| 10 | `Comment on mitochondria` | Location in active cell regions; listed light/electron-microscopy features, double membranes/cristae/matrix, ATP generation by oxidative phosphorylation, protein formation, and self-replication. | Mitochondrial structure and functions |
| 11 | `Comment on ribosomes` | Non-membranous electron-dense organelles of rRNA/protein; printed structure, basophilia, small/large subunits, free/polyribosome forms, and rER attachment through ribophorins. | Ribosome structure and forms |

The eleven questions yield eleven source-distinct tested concepts.  Two are already represented in the completed FHB ledger: the specialised epithelial-cell prompt covers the prior myoepithelial and sensory-neuroepithelium concepts, and the chromosomal-aberration prompt covers the earlier structural-chromosomal-abnormality concept.  This family therefore adds nine cumulative distinct concepts.

### Tested-concept search ledger — Histology final-written family

Each source-distinct concept was searched with the manual tool using both listed phrases.  `pending-hit` records the tool's current result; the two cross-source duplicates add no new cumulative bucket even where their earlier FHB record carried a different historical classification.

| Tested concept (two search phrases) | Result |
|---|---|
| General characteristics of epithelial tissue (`epithelial tissue`; `basement membrane epithelium`) | pending-hit |
| Myoepithelium and sensory neuroepithelium (`myoepithelium`; `neuroepithelium`) | pending-hit; already triaged through the FHB myoepithelial and organ-of-Corti/neuroepithelium concepts |
| Telomeres and chromosome-end protection (`telomeres`; `chromosome ends`) | pending-hit |
| Barr body (sex chromatin) (`Barr body`; `sex chromatin`) | pending-hit |
| Mitosis versus meiosis (`mitosis`; `meiosis`) | pending-hit |
| Necrosis versus apoptosis (`necrosis`; `apoptosis`) | pending-hit |
| Euploidy versus aneuploidy (`euploidy`; `aneuploidy`) | pending-hit |
| Numerical and structural chromosomal aberrations (`chromosomal aberrations`; `structural chromosomal abnormalities`) | pending-hit; already triaged in FHB as the structural-chromosomal-abnormality concept |
| Smooth versus rough endoplasmic reticulum (`smooth endoplasmic reticulum`; `rough endoplasmic reticulum`) | pending-hit |
| Mitochondrial structure and functions (`mitochondria`; `mitochondrial structure`) | pending-hit |
| Ribosome structure and forms (`ribosomes`; `ribosome structure`) | pending-hit |

At source-concept level this family is live 0 / pending 11 / new 0.  After cross-source deduplication, its cumulative delta is live 0 / pending 9 / new 0.  No module ID, content record, or placement was created.

## Consolidated S1 table — completed sources only

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 101 (completed sources: 2026 duplicate family + Anatomy EOM Fall 2025 + Fall 2023–2024 answered duplicate family + General Embryology final-night/Fall final 2025 family + SOLO final Anatomy family + Histology final-written family) | 226 | 197 | 132 | 39 | 40 | 53 | TBD |

**Observed delta:** +11 questions, +11 printed answers, +11 source-distinct tested concepts / +9 after cross-source deduplication.  The cumulative search buckets reconcile exactly: `39 + 40 + 53 = 132`; no module ID, content record, or placement was created.

## Remaining sources / blocker — after Histology final-written family

**Remaining file list:** 103 selected inventory paths / 98 unique SHA-256s.  Their sorted, newline-joined hash set (no trailing newline) checksum is `dbcea142ee933fda95f915ee8801a89ada6031098c0942e378097988d42bb6da`.  By the pinned triage text classification, it contains 58 substantive-text, six sparse-text, and 39 empty-text rows.  The ledger command in Evidence remains the authoritative exact path-and-hash list.

**BLOCKED — S1 cannot be approved:** the remaining 103 selected source paths have not had every printed question read, their official/printed keys have not been recovered, and their concepts have not been searched.  The durable metadata-only evidence snapshot exists; the literal `TRIAGE APPROVED` gate remains absent.  Next: render-and-read the next unread substantive `06 EOM Exams` source family, then update from observed questions only.

## Continuation pass — Physiology final highlighted-answer family

The asserted starting remaining-hash checksum `dbcea142ee933fda95f915ee8801a89ada6031098c0942e378097988d42bb6da` was reproduced from the sorted, newline-joined (with **no** trailing newline) set of 98 hashes before this pass.  The next evidence-ranked unread substantive `06 EOM Exams` source is an explicitly titled final-question paper whose answer options are visibly highlighted.  All thirteen pages were rendered and read.  Every answer below is a transcription of the green-highlighted printed option; none was inferred, corrected, or supplied from another source.

| Department | Category | Source path | SHA-256 | Pages | Printed questions read | Printed keys recovered |
|---|---|---|---|---:|---:|---:|
| Physiology | `06 EOM Exams` | `Year 1/Semester 101/FHB 101/Physiology/06 EOM Exams/EOM MCQs - FHB FINAL QUESTIONS Answers.pdf` | `56137b8483844ab6aa52d12ee164beaac03207d97195414019bf70a4350dfeb4` | 13 | 100 | 100 |

### Printed-key ledger

Each letter is the visibly highlighted option for the numbered printed question in that ten-question range.

| Questions | Printed keys |
|---|---|
| 1–10 | `D C B D C B C C B C` |
| 11–20 | `C D B C B C C B C C` |
| 21–30 | `B B C B C C D B C B` |
| 31–40 | `B C C B B C C D B D` |
| 41–50 | `C B B C C C C C B C` |
| 51–60 | `C C B B B C B C B C` |
| 61–70 | `B C B B B B A D C B` |
| 71–80 | `B C C B B B B C C B` |
| 81–90 | `B C C C B C B B C C` |
| 91–100 | `C C C B B B C C B B` |

### Question-to-concept and search ledger

Every source-distinct tested concept was searched with both phrases shown using the manual tool.  `Already triaged` is only cross-source question-to-concept deduplication; it does not name an identifier, placement, or new content record.

| Printed Q | Assigned tested concept (two search phrases) | Result |
|---:|---|---|
| 1, 2, 4 | Body-water compartment proportions (`total body water`; `intracellular extracellular fluid`) | pending-hit |
| 3 | Intracellular-fluid electrolyte composition (`intracellular ions`; `potassium phosphate magnesium`) | new — TBD |
| 5–7 | Negative water balance and dehydration (`negative water balance`; `dehydration extracellular fluid`) | new — TBD |
| 8 | Overhydration and cardiac pressure (`overhydration`; `fluid overload heart`) | new; already triaged through the FHB overhydration concept |
| 9 | Blood viscosity and arterial pressure (`blood viscosity`; `arterial blood pressure`) | live-hit |
| 10 | Normal adult-male red-cell count (`red blood cell count`; `adult male RBC count`) | new — TBD |
| 11 | Biconcave red-cell surface area (`biconcave erythrocyte`; `red cell surface area`) | new; already triaged through red-cell biconcavity/deformability |
| 12 | Anucleate nature of mature red cells (`mature erythrocyte nucleus`; `anucleate red blood cell`) | pending-hit |
| 13 | Red-cell cytoskeleton and shape (`erythrocyte cytoskeleton`; `RBC shape`) | new — TBD |
| 14 | Red-cell lifespan (`erythrocyte lifespan`; `red cell 120 days`) | live-hit |
| 15 | Reticuloendothelial clearance of old red cells (`erythrocyte breakdown`; `reticuloendothelial`) | live-hit; already triaged |
| 16 | Haematocrit definition (`hematocrit`; `red cell volume whole blood`) | live-hit |
| 17 | Normal female haemoglobin concentration (`female hemoglobin`; `normal haemoglobin concentration`) | new — TBD |
| 18 | Carbonic anhydrase in carbon-dioxide transport (`carbonic anhydrase`; `carbon dioxide transport red cell`) | live-hit |
| 19, 20 | Haemoglobin oxygen-carrying capacity (`hemoglobin oxygen capacity`; `one gram hemoglobin oxygen`) | new — TBD |
| 21 | Adult haemoglobin globin-chain composition (`adult hemoglobin`; `alpha beta globin`) | live-hit; already triaged |
| 22 | Fetal haemoglobin gamma chains (`fetal hemoglobin`; `HbF gamma chains`) | live-hit |
| 23 | Fetal-to-adult haemoglobin transition (`fetal haemoglobin transition`; `HbF replaced by HbA`) | new — TBD |
| 24, 81 | Bohr effect: reduced pH and oxygen affinity (`Bohr effect`; `low pH hemoglobin affinity`) | live-hit |
| 25 | 2,3-DPG modulation of haemoglobin affinity (`haemoglobin affinity 2,3-DPG`; `2,3-DPG hemoglobin`) | new — TBD |
| 26 | Carbon dioxide carriage as carbaminohaemoglobin (`carbaminohemoglobin`; `carbon dioxide hemoglobin`) | pending-hit |
| 27 | Carbon-monoxide affinity for haemoglobin (`carbon monoxide`; `carboxyhemoglobin`) | live-hit; already triaged |
| 28 | Haemoglobin iron oxidation state / methemoglobin (`ferrous iron`; `methemoglobin ferric`) | live-hit; already triaged |
| 29, 30 | Plasma volume and chief plasma cation (`plasma volume`; `plasma sodium`) | live-hit |
| 31, 96 | Albumin and plasma oncotic pressure (`albumin oncotic pressure`; `plasma protein edema`) | new — TBD |
| 32 | Gamma-globulin source (`gamma globulins`; `lymphocyte gamma globulin`) | live-hit |
| 33 | Albumin/globulin ratio (`albumin globulin ratio`; `A/G ratio`) | new — TBD |
| 34 | Plasma-protein synthesis and breakdown (`plasma protein synthesis`; `plasma protein breakdown`) | new — TBD |
| 35 | Rouleaux formation (`rouleaux`; `red cell aggregation`) | pending-hit; already triaged |
| 36 | Normal adult-male ESR (`normal ESR`; `adult male ESR`) | new — TBD |
| 37–39, 86 | Osmotic fragility and red-cell shrinkage (`osmotic fragility`; `hypertonic red blood cells`) | pending-hit |
| 40 | Adult site of erythropoiesis (`erythropoiesis bone marrow`; `adult red marrow erythropoiesis`) | new — TBD |
| 41, 42, 98 | Renal erythropoietin response to hypoxia (`erythropoietin`; `EPO erythroid`) | pending-hit; already triaged |
| 43 | Normoblast haemoglobin synthesis (`normoblast`; `erythroblast hemoglobin`) | pending-hit; already triaged through erythroblast haemoglobin accumulation |
| 44 | Reticulocyte residual intracellular structures (`reticulocyte`; `reticulocyte residual RNA`) | live-hit; already triaged |
| 45 | Body-iron distribution in haemoglobin (`body iron hemoglobin`; `iron distribution hemoglobin`) | new — TBD |
| 46 | Ferritin as iron storage form (`ferritin`; `intracellular iron`) | pending-hit; already triaged |
| 47, 48 | Reduction and gastric-HCl roles in iron absorption (`iron absorption`; `gastric hydrochloric acid iron`) | live-hit |
| 49, 52, 82 | Intrinsic-factor-dependent B12 absorption and pernicious anaemia (`intrinsic factor`; `pernicious anemia`) | live-hit; already triaged |
| 50, 80 | Folate/B12-dependent nuclear maturation and macrocytic anaemia (`folate`; `nuclear maturation anemia`) | live-hit; already triaged |
| 51 | Iron-deficiency microcytic anaemia (`iron deficiency`; `microcytic anemia`) | live-hit; already triaged |
| 53, 99 | Aplastic anaemia from marrow depression (`aplastic anemia`; `bone marrow depression anemia`) | live-hit; already triaged |
| 54 | Acute blood-loss anaemia pattern (`acute blood loss`; `normocytic anemia`) | live-hit; already triaged |
| 55 | Anaemia, reduced viscosity, and cardiac work (`anemia viscosity`; `anemia cardiac work`) | new — TBD |
| 56, 57, 77, 90, 97 | Primary/secondary and physiological polycythaemia (`polycythemia`; `hypoxia polycythemia`) | pending-hit; already triaged |
| 58 | Normal platelet count (`normal platelet count`; `platelet count`) | pending-hit |
| 59 | Megakaryocyte origin of platelets (`megakaryocyte`; `platelet formation`) | live-hit; already triaged |
| 60 | Platelet lifespan (`platelet lifespan`; `platelet life span`) | new — TBD |
| 61 | Von Willebrand factor in platelet adhesion (`von Willebrand factor`; `platelet adhesion collagen`) | pending-hit |
| 62 | Platelet dense granules (`platelet dense granules`; `ADP serotonin platelets`) | new — TBD |
| 63, 65, 85 | Extrinsic coagulation pathway (`extrinsic pathway`; `tissue thromboplastin`) | live-hit; already triaged through factor VII/extrinsic pathway |
| 64 | Vitamin-K-dependent clotting factors (`vitamin K clotting`; `factors II VII IX X`) | new — TBD |
| 66 | Intrinsic coagulation-pathway steps (`intrinsic pathway`; `intrinsic coagulation pathway`) | pending-hit |
| 67 | Common-pathway thrombin generation (`common coagulation pathway`; `prothrombin thrombin`) | new — TBD |
| 68 | Factor-XIII fibrin stabilisation (`factor XIII`; `fibrin stabilization`) | live-hit |
| 69, 94 | Antithrombin III and heparin (`antithrombin III`; `heparin antithrombin`) | live-hit |
| 70, 92 | Prostacyclin and thromboxane platelet effects (`prostacyclin`; `thromboxane platelet`) | live-hit |
| 71, 95 | Thrombocytopenic petechiae (`thrombocytopenia`; `petechiae`) | pending-hit; already triaged through purpura/thrombocytopenic bleeding |
| 72 | X-linked haemophilia (`hemophilia`; `X linked recessive`) | pending-hit |
| 73 | Disseminated intravascular coagulation (`disseminated intravascular coagulation`; `DIC bleeding clotting`) | pending-hit |
| 74 | Albumin urinary loss (`albuminuria`; `albumin loss urine`) | pending-hit |
| 75 | Plasma-protein buffering (`plasma protein buffer`; `Na proteinate`) | new — TBD |
| 76 | Immunoglobulin effect on ESR (`ESR immunoglobulins`; `immunoglobulins erythrocyte sedimentation`) | new — TBD |
| 78 | Macrophage iron recycling (`iron recycling`; `spleen macrophage iron`) | new — TBD |
| 79 | Copper cofactors in haemoglobin formation (`copper deficiency`; `hemoglobin formation copper`) | new — TBD |
| 83 | Platelet factor 3 as catalytic phospholipid surface (`platelet factor 3`; `platelet phospholipid surface`) | live-hit |
| 84 | Serum consumption of factor II (`serum clotting factors`; `prothrombin serum`) | new — TBD |
| 87 | Fibrinogen shape and blood viscosity (`fibrinogen viscosity`; `fibrinogen elongated shape`) | new — TBD |
| 88 | Haemoglobinopathies and abnormal globin chains (`hemoglobinopathy`; `abnormal globin chains`) | pending-hit |
| 89 | HbS formation in sickle-cell anaemia (`HbS`; `sickle cell HbS`) | pending-hit |
| 93 | Factor-XII contact activation (`factor XII`; `contact activation collagen`) | live-hit |
| 100 | Hemosiderosis (`hemosiderosis`; `iron tissue deposition`) | pending-hit |

The 100 questions collapse to 72 source-distinct tested concepts.  Twenty reproduce concepts already represented in completed FHB sources (overhydration, biconcavity, red-cell clearance, HbA composition, carbon-monoxide and methemoglobin items, rouleaux, erythropoietin, normoblast maturation, reticulocytes, ferritin, intrinsic factor/B12, folate/B12 maturation, iron deficiency, aplastic and acute-blood-loss anaemia, polycythaemia, megakaryocytes, the extrinsic pathway, and thrombocytopenic bleeding).  This family therefore adds 52 cumulative distinct concepts.

## Consolidated S1 table — completed sources only

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 101 (completed sources include the Physiology final highlighted-answer family) | 326 | 297 | 184 | 53 | 53 | 78 | TBD |

**Observed delta:** +100 questions, +100 printed keys, +72 source-distinct tested concepts / +52 after cross-source deduplication.  The cumulative search buckets reconcile exactly: `53 + 53 + 78 = 184`; no module ID, content record, placement, source, or catalogue entry was created.

## Remaining sources / blocker — after Physiology final highlighted-answer family

**Remaining file list:** 102 selected inventory paths / 97 unique SHA-256s.  Their sorted, newline-joined hash set (no trailing newline) checksum is `4b16c89641807c8b7d6432125f8fb25bdad96ec23c5a35e841e15ffc3928475c`.  By the pinned triage text classification, it contains 57 substantive-text, six sparse-text, and 39 empty-text rows.  The ledger command in Evidence remains the authoritative exact path-and-hash list.

**BLOCKED — S1 cannot be approved:** the remaining 102 selected source paths have not had every printed question read, their official/printed keys have not been recovered, and their concepts have not been searched.  The durable metadata-only evidence snapshot exists; the literal `TRIAGE APPROVED` gate remains absent.  Next: render-and-read the next unread substantive `06 EOM Exams` source family, then update from observed questions only.

## Continuation pass — Physiology night-final 2026 highlighted-answer family

The asserted starting remaining-hash checksum `4b16c89641807c8b7d6432125f8fb25bdad96ec23c5a35e841e15ffc3928475c` was reproduced from the sorted, newline-joined (with **no** trailing newline) set of 97 hashes before this pass.  The next evidence-ranked unread substantive `06 EOM Exams` source is the seven-page 2026 night-final paper.  All seven pages were rendered and read.  Yellow highlighting marks the printed MCQ answer options; every MCQ key below is transcribed from that highlighting.  The page-five to page-seven written prompts carry their printed model answers on the same pages.  No key was inferred or medically corrected.

| Department | Category | Source path | SHA-256 | Pages | Printed questions read | Printed keys / answers recovered |
|---|---|---|---|---:|---:|---:|
| Physiology | `06 EOM Exams` | `Year 1/Semester 101/FHB 101/Physiology/06 EOM Exams/EOM MCQs - Night exam physio 101 final 2026.pdf` | `5a363e2f09c2b2ac7d13d5a29adf9a6a0d1e97dfe70f74f885529285516aaf76` | 7 | 29 | 29 |

### Printed-question / key ledger

The paper repeats printed number `11` for absolute and relative refractory periods and repeats printed number `13` for local anaesthesia and myosin ATPase.  Both visible prompts are distinct source references.  The curve's nine labels are the printed answer to one page-five prompt, not nine extra prompts.

| Source ref | Printed question read | Directly aligned printed key / answer (transcribed only) | Assigned tested concept |
|---|---|---|---|
| P1-Q1 | Resting potential of a type-B nerve fibre measured by CRO | `b. –70` | Resting membrane potential: value, fibre type, and causes |
| P1-Q2 | Definition of chronaxie | `b. Duration needed … at double rheobase (2R)` | Chronaxie |
| P1-Q3 | Nerve-fibre type most sensitive to hypoxia | `c. B` | Hypoxia effects on nerve fibres and excitability |
| P1-Q4 | Normal nerve membrane potential | `c. 105` | Resting membrane potential: value, fibre type, and causes |
| P1-Q5 | Hypoxia and nerve excitability | `b. decrease in excitability` | Hypoxia effects on nerve fibres and excitability |
| P2-Q6 | Increased calcium at nerve gates: membrane potential and excitability | `b. decreases, increases` | Ionic modulation of nerve membrane potential and excitability |
| P2-Q7 | Increased extracellular potassium: membrane potential and excitability | `a. increases, decreases` | Ionic modulation of nerve membrane potential and excitability |
| P2-Q8 | Increased extracellular potassium with potassium influx | `b. decreases, increases` | Ionic modulation of nerve membrane potential and excitability |
| P2-Q9 | Increased intracellular potassium with potassium efflux | `a. increases, decreases` | Ionic modulation of nerve membrane potential and excitability |
| P2-Q10 | Increased intracellular potassium: membrane potential and excitability | `b. decreases, increases` | Ionic modulation of nerve membrane potential and excitability |
| P3-Q11a | Absolute refractory period: stimulus capable of excitation | `e. No stimuli whatever the strength` | Absolute and relative refractory periods, including anodal block |
| P3-Q11b | Relative refractory period: stimulus capable of excitation | `c. Supra-threshold` | Absolute and relative refractory periods, including anodal block |
| P3-Q12 | States not stimulated by maximal suprathreshold current | `e. Both A and B` | Absolute and relative refractory periods, including anodal block |
| P3-Q13a | Local anaesthesia mechanism | `a. Na+ stabilization through increasing the positive charges outside the nerve, so membrane potential increases and excitability decreases` | Local-anaesthetic sodium stabilisation |
| P4-Q13b | Muscle component with ATPase activity | `a. Myosin head` | Skeletal-muscle excitation–contraction coupling and cross-bridge cycling |
| P4-Q14 | Conduction in an unmyelinated fibre | `a. Sweeping conduction` | Continuous conduction in an unmyelinated nerve fibre |
| P4-Q15 | Calcium-binding component during contraction | `a. troponin C` | Skeletal-muscle excitation–contraction coupling and cross-bridge cycling |
| P4-Q16 | Tropomyosin function during contraction | `a. prevent binding of myosin to Actin` | Skeletal-muscle excitation–contraction coupling and cross-bridge cycling |
| P4-Q17 | Route of muscle action-potential entry | `a. T-Tubule` | Skeletal-muscle excitation–contraction coupling and cross-bridge cycling |
| P4-Q18 | Motor-end-plate neurotransmitter | `a. Acetylcholine` | Neuromuscular transmission |
| P4-Q19 | Basis of myasthenia-gravis symptoms | `a. Autoimmune response` | Myasthenia gravis: autoimmune mechanism and anticholinesterase relief |
| P4-Q20 | Drug likely to alleviate myasthenia-gravis symptoms | `c. Prostigmine` | Myasthenia gravis: autoimmune mechanism and anticholinesterase relief |
| P5-W1 | Enumerate points numbered in the action-potential curve | `1 stimulus artifact; 2 latent period; 3 gradual depolarization; 4 rapid depolarization; 5 repolarization; 6 overshooting; 7 negative after potential; 8 hyper polarization; 9 firing level` | Action-potential waveform landmarks and phases |
| P5-W2 | Define chronaxie | `Minimum time required for a stimulus of double the rheobase strength to excite a tissue` | Chronaxie |
| P5-W3 | Mention causes of RMP | `Selective permeability; Na–K ATPase pump` | Resting membrane potential: value, fibre type, and causes |
| P5-W4 | Write down mechanism of neuromuscular transmission | Printed sequence: nerve impulse → terminal Ca2+ entry → acetylcholine release → nicotinic receptor/end-plate potential → cholinesterase hydrolysis | Neuromuscular transmission |
| P6-W5 | Explain mechanism of muscle contraction | Printed sequence: end-plate potential/action potential → T-tubules/SR Ca2+ release → troponin C/tropomyosin → cross-bridge cycling and relaxation | Skeletal-muscle excitation–contraction coupling and cross-bridge cycling |
| P7-W6 | Phases of action potential | `1 latent period; 2 depolarization; 3 repolarization; 4 hyperpolarization` | Action-potential waveform landmarks and phases |
| P7-W7 | Absolute refractory period versus relative refractory period | Printed ARP/RRP comparison table | Absolute and relative refractory periods, including anodal block |

### Tested-concept search ledger — Physiology night-final 2026 family

Each source-distinct concept was searched through the manual tool using both phrases shown, across live state and every pending import root.  A live result takes precedence over pending.  There is no cross-source duplicate in this family against the completed FHB ledger.

| Tested concept (two search phrases) | Result |
|---|---|
| Resting membrane potential: value, fibre type, and causes (`resting membrane potential nerve fiber`; `resting membrane potential`) | live-hit |
| Chronaxie (`chronaxie`; `strength duration curve`) | live-hit |
| Hypoxia effects on nerve fibres and excitability (`nerve fiber hypoxia`; `nerve excitability hypoxia`) | new — TBD |
| Ionic modulation of nerve membrane potential and excitability (`calcium nerve excitability`; `potassium membrane potential`) | new — TBD |
| Absolute and relative refractory periods, including anodal block (`absolute refractory period`; `relative refractory period`) | pending-hit |
| Local-anaesthetic sodium stabilisation (`local anaesthesia nerve membrane`; `sodium stabilisation`) | new — TBD |
| Skeletal-muscle excitation–contraction coupling and cross-bridge cycling (`excitation contraction coupling`; `troponin C`) | pending-hit |
| Continuous conduction in an unmyelinated nerve fibre (`unmyelinated conduction`; `continuous conduction`) | pending-hit |
| Neuromuscular transmission (`neuromuscular transmission`; `acetylcholine motor end plate`) | live-hit |
| Myasthenia gravis: autoimmune mechanism and anticholinesterase relief (`myasthenia gravis`; `Prostigmine myasthenia`) | pending-hit |
| Action-potential waveform landmarks and phases (`action potential phases`; `depolarization repolarization`) | new — TBD |

At source-concept level this family is live 3 / pending 4 / new 4.  The 29 printed questions collapse to 11 source-distinct tested concepts, so its cumulative delta is also live 3 / pending 4 / new 4.  No module ID, content record, placement, source, or catalogue entry was created.

## Consolidated S1 table — completed sources only

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 101 (completed sources include the Physiology night-final 2026 family) | 355 | 326 | 195 | 56 | 57 | 82 | TBD |

**Observed delta:** +29 questions, +29 printed keys/answers, +11 source-distinct tested concepts / +11 after cross-source deduplication.  The cumulative search buckets reconcile exactly: `56 + 57 + 82 = 195`; no module ID, content record, placement, source, or catalogue entry was created.

## Remaining sources / blocker — after Physiology night-final 2026 family

**Remaining file list:** 101 selected inventory paths / 96 unique SHA-256s.  Their sorted, newline-joined hash set (no trailing newline) checksum is `214570ae28dbef1ba4e2ff6e580e3f27dd0f5e4dee0fb522bd71d20b8fe9c938`.  By the pinned triage text classification, it contains 56 substantive-text, six sparse-text, and 39 empty-text rows.  The ledger command in Evidence remains the authoritative exact path-and-hash list.

**BLOCKED — S1 cannot be approved:** the remaining 101 selected source paths have not had every printed question read, their official/printed keys have not been recovered, and their concepts have not been searched.  The durable metadata-only evidence snapshot exists; the literal `TRIAGE APPROVED` gate remains absent.  Next: render-and-read the next unread substantive `06 EOM Exams` source family, then update from observed questions only.
