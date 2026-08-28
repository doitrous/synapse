# AU-MED-103 · Histology — question-led triage

Lane W1-103-HIST. Module `AU-MED-103` (`MED 103 - Blood and Immune System & Medical
Terminology`), department `Histology`, year `AU_Y1`. GUARD = paper (3 EOM papers in `Exams`,
plus the module's `General` bank rows). Step 1 only — no concepts, articles or questions
authored below. Ends at the LANE-BRIEF §8 checkpoint.

## Counts

| questions triaged | keyed | unkeyed | distinct concepts tested (Histology) | hit-live | hit-pending | new |
|---:|---:|---:|---:|---:|---:|---:|
| 145 (35+70+40 EOM papers) + 2 practical banks (9 Histology spots + partial) | 144 | 1 (EOM2 Q13) + 1 truncated (practical spot 73+) | 23 | 5 | 7 | 11 |

Of the 145 EOM questions, **19 are this department's** (Histology-taught ideas); the rest are
Biochemistry or Physiology. The two General practical banks contribute a further 9 keyed
Histology "spot" items (3 sub-parts each) plus one truncated, unkeyed item. Every row below
traces to a specific question; nothing is authored from the department book alone.

## Sources read

| sourceId | file | category | mode | key status found |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | `Exams/EOM - Blood End Egyptian 1.pdf` | End of Module paper | native, 7p | answer block at foot of last page, Q1–35 |
| `src_56bc398ce32f0140fc29` | `Exams/EOM - Blood Final Egyptian final.pdf` | End of Module paper | native, 16p | answer block at foot of last page, Q1–70, **Q13 = `xx`** (examiner left it unresolved — recorded unkeyed, not guessed) |
| `src_c9c9ca53cfa1321d0508` | `Exams/EOM - Blood end wafdeen final.pdf` | End of Module paper | native, 11p | answer block at foot of last page, Q1–40, all keyed |
| `src_3e62e4d388493af88dbe` | `General/.../MCQs - Blood practical.pdf` (twinPreferred) | Department Questions | native, 29p | phone-screenshot capture of a Microsoft Forms quiz; "Correct answers" printed per item; **file ends mid-item at Q73** ("Histology practical Questions" section barely starts, no answer visible — page 29 is the last page) |
| `src_4b9b0c4cf94fde15b14a` | `General/.../MCQs - Practical Blood Questions_...pdf` (twin of preferred `src_5309ee19e1149a5bbe9d`, a `.docx` not yet in `scripts/alexandria/pagetext/`) | Department Questions | native, 18p | clean "Spot 1–9 (Histology) / Spot 1–13 (Biochemistry) / Spot 1–10 (Physiology)" bank with a dedicated answer page per section; all 9 Histology spots keyed |

**Department files read** (Histology, non-practical; extracted myself via
`scripts/alexandria/extract/pagetext.py`, not a paper, so this was mine to run):
`src_31fc3d2567adf6ff8074` (*2-Blood مذكرة dr Iman*, 28p — "Histology of the Blood, Immune &
Lymphoid system", Prof. Dr. Iman Nabil — the department's own comprehensive notes, covering
blood composition through tonsils), `src_760a8fa248b6fb2066da` (*Blood Revision*, 29p),
`src_aa3eed79d992b72381aa` (*Lymphoid revision*, 18p) — all three are revision condensates of
the same notes; read for chapter/lecture grouping, not cited individually below.

**Not read, out of scope for this lane**: `src_d492d97e288a6b99551b` /
`src_6a68d5d3211779c1effe` (`Histology/Practical/Slides/Histo Blood practical G` — 2 files, 1
distinct twin pair) — these are the department's practical slide set, not a question source.
Per dispatch: "note them for a later practical lane, do not author practicals now." Recorded
under OWED.

**Substitution note**: `src_5309ee19e1149a5bbe9d` (the manifest's `twinPreferred: true` copy of
the "Practical Blood Questions" bank, a `.docx`) is not yet in
`scripts/alexandria/pagetext/`. I read its non-preferred `.pdf` twin (`src_4b9b0c4cf94fde15b14a`,
same `nameTwinOf` group, same content by cross-check of the two available twins' overlapping
pages) instead of waiting, since it was already cached and this is a triage pass, not the
final citation. **Step 2 should re-open the preferred `.docx` once cached and cite that one**,
per the manifest's own rule ("read the preferred one, cite the one you read").

## Questions this department teaches, grouped by department-book chapter

Chapter headings follow *Histology of the Blood, Immune & Lymphoid System* (Dr. Iman Nabil),
the only Histology department book/notes present for this module.

### Red blood cells

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_c9c9ca53cfa1321d0508` | p1 | Distribution of Hb in the RBC (peripheral rim vs central) | keyed (a) | stream: wafdeen (filename) |
| `src_49f438279b68a489aa42` | p6 | What gives the RBC membrane its flexibility (Q30) | keyed (c) | stream: Egyptian (filename) |

### Reticulocytes

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_c9c9ca53cfa1321d0508` | p7 | Organelle responsible for the reticulate pattern on cresyl blue (Q23) | keyed (a) | stream: wafdeen |
| `src_56bc398ce32f0140fc29` | p11 | Which cell rises with accelerated erythropoiesis (Q62, reticulocyte) | keyed (a) | stream: Egyptian |

### Erythropoiesis

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_56bc398ce32f0140fc29` | p11 | Stage at which Hb synthesis is completed (Q46) | keyed (a, normoblast) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p11 | Last erythropoiesis stage capable of division (Q47) | keyed (c) | stream: Egyptian |

### Granulopoiesis / neutrophils

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_56bc398ce32f0140fc29` | p14 | Stage at which specific granules of granulocytes appear (Q45) | keyed (b, myelocyte) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p5 | Main function of neutrophils (Q23) | keyed (b) | stream: Egyptian |
| `src_4b9b0c4cf94fde15b14a` | Histology Spot 4 | Name the process / pointed cells (granulopoiesis diagram: promyelocyte, band neutrophil) | keyed | practical bank, diagram question |

### Eosinophils

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_c9c9ca53cfa1321d0508` | p6 | EM appearance of eosinophil specific granules (Q22) | keyed (d) | stream: wafdeen |

### Platelets

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | p6 | Function of circumferential microtubules in platelets (Q29) | keyed (a) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p12 | Correct statement re: platelet structure (biconvex, non-nucleated) (Q48) | keyed (b) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p12 | Open canalicular system (Q49) | keyed (a) | stream: Egyptian |
| `src_c9c9ca53cfa1321d0508` | p2 | Histological feature of platelet granulomere (Q5) | keyed (c) | stream: wafdeen |
| `src_4b9b0c4cf94fde15b14a` | Histology Spot 2, 9 | RBC membrane cytoskeleton diagram (actin); alpha granules / dense tubular system | keyed | practical bank, diagram questions |

### Lymphocytes and cells of the immune system

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | p1 | Which cell is an antigen-presenting cell, T- vs B-lymphocyte (Q6) | keyed (d — cut off in extracted text, confirm against key block) | stream: Egyptian — **field-boundary note**: could equally be filed as Physiology/Immunology; kept here because the department book's "cells of the immune system" section is the only place this module teaches it |
| `src_56bc398ce32f0140fc29` | p11 | Function of T helper cells (Q50) | keyed (a, secrete lymphokines) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p12 | Function of natural killer cells (Q51) | keyed (d, nonspecific immune response) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p12 | Most differentiated lymphocyte form (Q54, small lymphocytes) | keyed (d) | stream: Egyptian |

### Lymphoid organs — classification and lymphopoiesis

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_c9c9ca53cfa1321d0508` | p2 | Where lymphopoiesis takes place (Q6, primary lymphoid organs) | keyed (c) | stream: wafdeen |

### Thymus

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | p6 | What is in the medulla of the thymus (Q28) | keyed (c) | stream: Egyptian |
| `src_49f438279b68a489aa42` | p7 | How thymus differs histologically from lymph node (Q34) | keyed (d) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p14 | Function of epithelial reticular cells in the thymus (Q63) | keyed (b) | stream: Egyptian |
| `src_c9c9ca53cfa1321d0508` | p4 | Cells of the inner cortex (thymocyte precursors) (Q13) | keyed (c) | stream: wafdeen |
| `src_c9c9ca53cfa1321d0508` | p4 | Components of the blood-thymic barrier (Q14) | keyed (c) | stream: wafdeen |
| `src_4b9b0c4cf94fde15b14a` | Histology Spot 2 | Identify slide (Thymus, H&E) | keyed | practical bank, diagram question |

### Lymph node

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_56bc398ce32f0140fc29` | p12 | Main cell population of the paracortical area (Q53) | keyed (a) | stream: Egyptian |
| `src_4b9b0c4cf94fde15b14a` | Histology Spot 1, 5, 9 | Identify slide/cell (Lymph node, H&E); paracortical area; medullary lymph sinuses | keyed | practical bank, diagram questions |

### Spleen

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_56bc398ce32f0140fc29` | p12 | Thymus-dependent (T-cell) area of the spleen (Q52, periarterial lymphoid sheath) | keyed (c) | stream: Egyptian |
| `src_4b9b0c4cf94fde15b14a` | Histology Spot 3, 6, 8 | Spleen germinal centre / marginal zone; spleen silver stain; splenic cords / central artery | keyed | practical bank, diagram questions |

### Tonsils

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_c9c9ca53cfa1321d0508` | p6 | Histological structures of the palatine tonsil capsule (Q21, mucous acini) | keyed (b) | stream: wafdeen |
| `src_4b9b0c4cf94fde15b14a` | Histology Spot 5, 6 | Palatine tonsil (H&E); secondary tonsillar crypt / mucous acini | keyed | practical bank, diagram questions |

### Reticulo-endothelial system

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | p5 | Role of the reticulo-endothelial system (Q25, defenses) | keyed (a) | stream: Egyptian |

### Unkeyed / unresolved

| sourceId | page | stem | why unkeyed |
|---|---|---|---|
| `src_56bc398ce32f0140fc29` | p16 (key block) | Q13 — coenzyme for pyruvate dehydrogenase (Biochemistry, not this department, listed for completeness of the unkeyed count) | printed key is literally `13.xx` — the examiner's own answer sheet leaves it unresolved. Not guessed. |
| `src_3e62e4d388493af88dbe` | p29 (last page) | Q73 — "Histology practical Questions… 1-Mention the name of the organ. 2-Identify the pointed [structure]" | file ends here — no answer visible, no further page. Possibly continued in the un-cached `.docx` bank; flagged, not reconstructed. |

## Cohort / stream signals — a manifest gap found here

All three `Exams` rows and all `General` rows for AU-MED-103 carry
`examSignals: {cohortSignal: null, streamSignal: null, sittingYear: null, ...}` in
`au-y1-sources.json`, **despite two of the three EOM filenames stating the stream outright**
(`EOM - Blood End Egyptian 1.pdf`, `EOM - Blood Final Egyptian final.pdf` → Egyptian stream;
`EOM - Blood end wafdeen final.pdf` → wafdeen/international stream). Per the manifest README,
`streamSignal` is meant to be set from "the filename or header" — unlike `sittingYear`, which
must come from the page. This looks like the same `manifest.py` class of defect already
logged in `SHARED-TOOLCHAIN.md` ("Manifest defects: five more, one generator"): the stream
classifier did not fire on these three filenames even though the tokens are present and
unambiguous. Recorded above as a filename-derived signal, not as the manifest's own field,
and flagged for the manifest-owning lane. No sitting year is stated on any of the three
papers' pages themselves (checked — none of the extracted pages carry a dated header), so
year stays empty, correctly.

## Ordered list of distinct ideas tested → concept candidates

In department-book chapter order. Key search run per idea: `find-existing.mjs` with the
queries listed, plus `grep -ril "<term>" docs/*-Source-Imports/concept/`.

| # | Idea (as tested) | Search terms used | Classification | Evidence |
|---|---|---|---|---|
| 1 | RBC membrane flexibility (no nucleus/organelles, biconcave shape, cytoskeleton, glycocalyx — which explains it) | biconcave; RBC membrane | **HIT-LIVE** | `CON-HEM-23E454BD997B29` "Biconcavity increases flexibility through small capillaries" — same idea |
| 2 | Hb distribution within the RBC (peripheral concentration) | hemoglobin distribution; biconcave | **NEW** (overlapping ground with #1's live biconcavity cluster — Step 2 tiebreaker: distinct objective, "where is Hb" vs "why is the cell flexible") | no direct hit |
| 3 | RBC glycocalyx carries blood-group antigens | glycocalyx | **HIT-LIVE** | `CON-HEM-9D43F05669BB37` "Erythrocyte glycocalyx carries ABO and Rh blood-group antigenic sites" |
| 4 | Reticulocyte identified by cresyl blue precipitating ribosomal remnants | reticulocyte; cresyl blue | **HIT-LIVE** + HIT-PENDING | live `CON-HEM-D86697439C5923`; also pending in `101-ISK-mcq-concepts.md`, `101-ISK-practical-concepts.md` |
| 5 | Erythropoiesis stages / stage Hb synthesis completes / last dividing stage | erythropoiesis; normoblast; proerythroblast; polychromatophilic | **NEW** | no hit on any of 4 queries |
| 6 | Granulopoiesis stages / stage specific granules appear | granulopoiesis; myelocyte; promyelocyte; specific granules | **NEW** (one adjacent pending hit: `101-ISK-mcq.md` question "specific granules of granulomere" — that's the *platelet* granulomere, a different structure; not a match) | no concept-level hit |
| 7 | Myeloid tissue stroma / stromal reticular cells | stromal cells; myeloid tissue | **NEW** | no hit |
| 8 | Megakaryocyte / thrombopoiesis (demarcation channels, platelet ribbons) | megakaryocyte; thrombopoiesis | **HIT-LIVE** + HIT-PENDING | live `CON-HEM-D9F4B28BC391FD`, `CON-HEM-C1B8D69FDABED2`, `CON-HEM-3DC3EAA5D4D84B`; pending `101-ISK-mcq-concepts.md`, `101-ISK-practical-concepts.md` |
| 9 | Neutrophil function — first line of defence, microphage | neutrophil; microphage | **HIT-PENDING** | `101-ISK-mcq-concepts.md` "The neutrophil carries two granule populations and is the first line of non-specific defence" |
| 10 | Eosinophil EM ultrastructure (large electron-dense crystalloid-core granules) | eosinophil | **NEW** (adjacent HIT-PENDING at a different grain — LM granule staining, not EM ultrastructure: `101-ISK-concepts.md` "bilobed nucleus behind large acidophilic granules") | grain mismatch, flag for Step 2 tiebreaker |
| 11 | T helper cell function (secretes lymphokines, not phagocytosis) | T helper; lymphokines | **NEW** (overlaps live `CON-IMM-37793AE332D7E6` "cytokines from lymphocytes are lymphokines" — different grain, cell-type function vs terminology) | Step 2 tiebreaker |
| 12 | NK cell function (nonspecific immune response) | natural killer | **NEW** (overlaps live `CON-IMM-50269E374FCFE9`, a classification concept, not a function one) | Step 2 tiebreaker |
| 13 | Antigen-presenting cell identity | antigen presenting cell | **HIT-PENDING** | 4 questions in `101-ISK-mcq.md` test this; no dedicated concept record surfaced yet — check that batch's concept file directly in Step 2 |
| 14 | Platelet LM structure: granulomere/hyalomere, biconvex, non-nucleated | granulomere; hyalomere | **HIT-PENDING** | `101-ISK-mcq-concepts.md`, `101-ISK-concepts.md` |
| 15 | Platelet circumferential microtubules maintain discoid shape | platelet microtubules; hyalomere | **HIT-PENDING** | `101-ISK-concepts.md` "The hyalomere's microtubules and canalicular system carry out the platelet's shape change and release" |
| 16 | Open canalicular system | open canalicular system | **HIT-LIVE** | `CON-HEM-CCD8EB004C7E24` |
| 17 | Alpha granules / dense tubular system (platelet EM, from the practical bank) | alpha granules platelet; dense tubular system | **NEW** | no hit on either query |
| 18 | Primary vs secondary lymphoid organs; lymphopoiesis site | primary lymphoid organs; lymphoid organs | **NEW** | no hit |
| 19 | Thymus structure: Hassall's corpuscles, blood-thymic barrier, epithelial reticular cells, inner cortex, medulla contents | Hassall; blood-thymic barrier; epithelial reticular cells; thymic cortex | **HIT-PENDING** (all four) | all four in `104-CPS-practical-concepts.md` (and article `104-CPS-articles.md`) |
| 20 | Lymph node paracortical area / medullary sinuses | paracortical; medullary lymph sinus | **NEW** | no hit on either query |
| 21 | Spleen structure and circulation (PALS, marginal zone, splenic cords, central artery) | spleen; marginal zone spleen; splenic cords | **HIT-PENDING** for general spleen structure/circulation (`104-CPS-practical-concepts.md`: "Histological structure of the spleen", "Blood circulation in the spleen") — **NEW** for the specific PALS/marginal-zone/splenic-cords sub-ideas, which did not surface as their own records | mixed — verify in Step 2 whether the pending spleen-structure record already covers PALS/marginal zone before minting anything |
| 22 | Palatine and pharyngeal tonsil histology | palatine tonsil | **HIT-PENDING** | extensive: `104-CPS-articles.md`, `104-CPS-concepts.md`, `104-CPS-practical-concepts.md`, `104-CPS-mcq.md` |
| 23 | Reticulo-endothelial system — general definition/role (defence) | reticuloendothelial system | **NEW** (one hit, but it is `103-BMS-mcq-heme-concepts.md`'s bilirubin-formation-site concept — a different idea, not the RE system's general defensive role) | grain mismatch, not a duplicate |

**Table total: 23 distinct ideas** — 5 HIT-LIVE (rows 1, 3, 4, 8, 16 — two of which, 4 and 8,
also have a HIT-PENDING duplicate that Step 2 should ignore in favour of the live record), 7
HIT-PENDING (rows 9, 13, 14, 15, 19, 21, 22), 11 NEW (rows 2, 5, 6, 7, 10, 11, 12, 17, 18, 20,
23 — several of these overlap live/pending ground at a different grain and are flagged for a
Step 2 tiebreaker rather than being pre-judged as either a duplicate or genuinely distinct).

## HAZARDS

- **`streamSignal` manifest gap** (above) — affects at minimum these three AU-MED-103 `Exams`
  rows; worth a targeted check across the rest of the y1 manifest by whichever lane owns it.
- **General MCQ bank count mismatch.** The dispatch note said "3 MCQ banks in General"; the
  manifest shows only 2 distinct twin-groups there (`MCQs - Blood practical`, 2 files; `MCQs -
  Practical Blood Questions`, 3 files across docx/docx/pdf). I read both. If a third bank
  exists elsewhere I have not found it — flagging rather than assuming the guard note is wrong.
- **`MCQs - Blood practical.pdf` is a phone-screenshot capture of a Microsoft Forms quiz**,
  not a typeset paper — OCR-adjacent artefacts throughout (garbled numbers, UI chrome like
  "9:57", battery/wifi icons captured as text). It is native-text per the manifest (real text
  layer from the PDF export), but readability is poor in the CBC-table sections. I did not
  attempt to reconstruct any of the garbled numeric tables; the Histology-relevant tail
  (Q73+) is simply missing, not misread.
- **The `.docx` twin `src_5309ee19e1149a5bbe9d`** (the manifest's preferred copy of "Practical
  Blood Questions") is still uncached. I substituted its non-preferred `.pdf` twin
  (`src_4b9b0c4cf94fde15b14a`) for this triage. Someone should diff the two once the `.docx`
  is cached — the manifest's own finding is that these twins are **not** always byte-identical
  even across format, so Step 2 should re-verify wording against the preferred copy before
  citing it.
- **Q6 of `src_49f438279b68a489aa42`** (antigen-presenting T- vs B-lymphocyte) sits on the
  Histology/Physiology boundary; I kept it in this triage because the department book teaches
  it, but the eventual `main_concept` placement should be re-checked against whatever the
  Physiology lane finds, in case of overlap.
- **9 Histology "spot" items in the practical bank are diagram questions** (slide/diagram
  identification) — per `05-questions.md`'s rule, these stay diagram questions with a media
  request, never rewritten into prose stems.

## OWED

- **2 practical files, noted not authored**: `src_d492d97e288a6b99551b` /
  `src_6a68d5d3211779c1effe` (`Histology/Practical/Slides/Histo Blood practical G`). For the
  later practical lane.
- **Physiology and Biochemistry departments** of this same module will need their own triage
  against the same 3 EOM papers and the same 2 General banks — I have only pulled the
  Histology-relevant rows above; the remaining ~126 EOM questions and biochemistry/physiology
  practical spots are theirs.
- **`src_5309ee19e1149a5bbe9d`** (.docx) — re-read once cached; re-confirm the 9 Histology spot
  answers against it before Step 2 citations are finalised.
- Spot-check needed in Step 2: does the pending `104-CPS-practical-concepts.md` spleen-structure
  record already cover PALS / marginal zone / splenic cords, or are those genuinely separate
  concepts needing their own records (item 21 above).

## BLOCKED

none — all sources needed for this department's triage were either pre-cached by the tooling
lane or safely extractable by me (department book, not a shared paper).
