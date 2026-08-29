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
