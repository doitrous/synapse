# O6U-IHI-103 -- Histology MCQ HID.pdf triage (S3)

Source folder: `Year 1/IHI-HID/_Telegram O6U Med Bot/`. One file triaged in full:
`Histology MCQ HID.pdf` (7p, 22 questions on blood and hemopoiesis), native text throughout
(0 garbled pages, no OCR needed), read page-by-page via `pagetext.mjs show`.

## Why this file, and a toolchain trap found along the way

Selected per `coverage/O6U-Y1-priority-sources.md`'s recommended next-triage order (item 2,
`IHI-103` -- small, clean, not yet triaged) after `BOS final exam 20-21 (o6u bot).PDF` (the
IBS-IBF final exam, see the sibling `O6U-IBS-IBF-triage.md`) turned out to carry no printed
key.

Running `pagetext.mjs keys` on this file reported 6 "keyed" questions (Q3, Q7, Q11, Q15, Q19,
Q22), each flagging option D with reason `red-text`. **This was a false positive**, traced to
a bug in `scripts/content/pdf_visual_keys.py`: on the last option of the last question on a
page, nothing closes the "current option" the script is accumulating lines into, so the
page's footer/signature text (`"N | Page"`, `"Mohamed El Araby"`, gray 0x7f7f7f) gets
misattributed to that option, and the footer's gray colour trips the same
`color_distance_from_black > 60` check the script uses for genuine red/coloured text --
mislabelled "red-text" despite being neither red nor a real answer mark. Confirmed three
ways: rendering pages 1-2 shows plain black text throughout, no colour anywhere; PyMuPDF span
inspection shows every real option span has `color=0`; and the detector's own flagged option
for Q7 (D, "Basophilic erythroblast") is medically wrong -- the true answer (confirmed by the
file's own printed key, see below) is C, "Orthochromatophilic erythroblast". Filed as a
toolchain bug for a separate fix (spawn_task `task_5e2890c5`); this tool is shared across
every university content lane, so other lanes' "keyed" verdicts on footer-bearing PDFs are
worth a second look.

Despite that false start, the file turned out to be **genuinely, fully keyed**: page 7 prints
a plain "Key answer" table giving the correct letter for all 22 questions, no colour or
highlighting needed. Every one of the 22 printed answers was independently cross-checked
against standard undergraduate histology fact (nuclear shapes, granule staining, maturation
stages, marrow stroma roles, lineage facts) with **no contradictions found** -- a materially
different and more trustworthy evidentiary basis than either of the two prior 6-October
sources this lane has triaged (the Moodle respondent-count method, and the BOS final exam's
single-respondent MS-Forms marks, held as unkeyed).

## Per-question key recovery

All 22 answers below are read directly from the printed "Key answer" table on page 7, cross-
checked against standard histology fact (see triage-keys.txt for the concept-level
find-existing results).

| # | Question (short) | Printed answer | Fact-check |
|--:|---|---|---|
| 1 | Neutrophil nucleus is | C: Multilobed | matches fact |
| 2 | Reticulocytes, EXCEPT | B: ~10% of total erythrocytes (the false one; true figure ~1%) | matches fact |
| 3 | Erythrocyte adaptations | D: All of the above | matches fact |
| 4 | Erythrocyte circulating lifespan | D: 4 months (~120 days) | matches fact |
| 5 | Granules with crystalline core | B: Eosinophils | matches fact |
| 6 | How granular leukocytes differ | D: All of the above | matches fact |
| 7 | Mainly acidophilic cytoplasm | C: Orthochromatophilic erythroblast | matches fact |
| 8 | Active bone marrow | A: Red | matches fact |
| 9 | Cell with no granules | B: Myeloblast | matches fact |
| 10 | Cell found only in bone marrow | C: Megakaryocytes | matches fact |
| 11 | Leukocytosis definition | A: Increase of WBC count | matches fact |
| 12 | Origin of T&B lymphocyte stem cells | A: Bone marrow | matches fact |
| 13 | RBC maturation changes, EXCEPT | B: nucleus "...lobulated" (the false one; nucleus is extruded, not lobulated) | matches fact |
| 14 | Megakaryocyte facts (5-option) | E: None of the above | matches fact |
| 15 | Stimulates stem cell to form blood cell | A: Reticular cell | matches fact |
| 16 | Local fuel for hemopoiesis | C: Fat cell | matches fact |
| 17 | Basophil statements, EXCEPT | C: "central rounded nuclei" (the false one; nucleus is bilobed/obscured) | matches fact |
| 18 | Why "reticulocyte" is named | D: Polyribosomes | matches fact |
| 19 | Megakaryocyte facts (4-option) | D: None of the above | matches fact |
| 20 | Neutrophil identifying feature | D: Multilobed nuclei | matches fact |
| 21 | Eosinophil identifying feature | A: Acidophilic granules | matches fact |
| 22 | Monocyte identifying feature | B: Phagocytic function | matches fact |

Questions triaged: **22**. Keys recovered: **22** (all, from the printed table). Zero holds.

## Concept table

| Concept | Search term used | Result |
|---|---|---|
| Neutrophil nucleus is multilobed | `neutrophil`, `multilobed` | **new** (near-miss: a pending "single multilobed nucleus" hit was about the megakaryocyte, a different cell -- not reused) |
| Reticulocytes are ~1% of erythrocytes, not 10% | `reticulocyte` | **new** |
| Erythrocyte adaptations (anucleate, biconcave, flexible) | `biconcave` | **live** (`CON-HEM-DC720AB51077EE`, `CON-HEM-23E454BD997B29`) |
| Erythrocyte lifespan ~120 days | `erythrocyte lifespan` | **live** (`CON-HEM-60C24B6F5C0EC2`) |
| Eosinophil crystalline-core granules, bilobed nucleus | `eosinophil` | **new** |
| Granulocytes differ by nucleus/percentage/granule staining | `granulocyte classification...` | **new** |
| Orthochromatophilic erythroblast = acidophilic stage | `orthochromatophilic` | **new** |
| Red marrow = active, yellow = inactive | `yellow marrow` | **live** (`CON-HEM-6E7493F79E9DF7`) |
| Myeloblast = agranular, earliest precursor | `myeloblast` | **new** |
| Megakaryocyte identifies bone marrow | `multilobed` (near-miss led to this hit) | **pending** (Kasr `101-ISK-practical-concepts`, `CON-HEM-CF325DABA0EA62`) |
| Leukocytosis = raised WBC count, 4,000-10,000/mm3 | `leukocytosis` | **pending** (Alexandria `AU-MED-103-physiology-concepts`, `CON-HEM-09BC500E55C1AA`) |
| T&B lymphocyte stem cells originate in bone marrow | `lymphocyte precursor bone marrow` | **new** |
| RBC nuclear condensation & extrusion, not lobulation | `condensed nucleus` (near-miss: sperm-head concept) | **new** |
| Megakaryocytes: polyploid, platelet precursor, bone-marrow located | `megakaryocyte` | **live** (`CON-HEM-3DC3EAA5D4D84B`) |
| Reticular cells stimulate hemopoietic stem cells | `reticular cell` | **new** (near-miss: pending hits were about the reticular cell's *fibre-secreting* structural role, a different specific claim) |
| Fat cells are the local fuel reserve for hemopoiesis | `adipocyte` | **new** (near-miss: a live hit, `CON-HEM-7EBD069E615270`, states fat cells are the *largest* cells in marrow -- a different specific claim; cited as `related_concept_ids`) |
| Basophil nucleus is bilobed/obscured, not rounded | `basophil` | **new** |
| Reticulocyte named for polyribosome remnants under supravital stain | `supravital` | **pending** (Kasr `101-ISK-mcq-concepts`, `CON-FND-5EFDEADAA559B8`) |
| Monocyte: agranular, phagocytic, myeloid lineage | `monocyte phagocytic` | **new** |

## Checkpoint table

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| O6U-IHI-103 | 22 | 22 | 19 | 5 | 3 | 12 (some concepts collapsed across duplicate-fact questions, e.g. Q1/Q20 neutrophil, Q5/Q21 eosinophil, Q14/Q19 megakaryocyte) | fnd/haem: all 12 (blood/hemopoiesis histology) |

Live-hit rate (5/19 = 26%) and pending-hit rate (3/19 = 16%) together account for 8 of 19
searched concepts (42%) landing on existing Kasr/Alexandria material.

## Authored

All 22 questions authored, 0 held. Seed: `coverage/seeds/O6U-IHI-103/HID-histology.json`.
Batch: `question/O6U-IHI-103-HID-mcq.md`. New concepts: `concept/O6U-IHI-103-new-concepts.md`
(12). New articles: `article/O6U-IHI-103-new-articles.md` (4). Pending-live overlay: 3
concepts + 2 articles. Live overlay: 5 concepts + 3 articles. Resource:
`resource/O6U-IHI-103-resources.md` (`src_f901593a04363855b4aa`).
