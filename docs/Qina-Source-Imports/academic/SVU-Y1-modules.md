<!--
  Qena Faculty of Medicine, South Valley University (SVU) — Year 1 academic structure.
  Module codes, weeks, points, hours and marks are quoted verbatim from the faculty's
  own bylaw PDF (00 Administration/Plans and Mark Distribution/Internal Bylaw 2023 -
  5+2 Credit-Point Program.pdf), cited by page below via
  node scripts/content/pagetext.mjs grep/show — not copied from the Desktop catalog note.
  Folder-name -> module-id mapping is derived from the locally organized
  Faculty of Medicine/Year 1/ tree (docs/Qina-Source-Imports/manifest/y1-sources.json).
  Import target: Academic Setup > Import. Module ids are SVU-local (SVU-<code>).
-->

# Year 1 (5+2 Credit-Point Program, 2023 bylaw)

SVU runs a credit-point curriculum with integrated modules named by function, not by
department (`PMM-101` "Principles of microscopic and macroscopic structures", not
"Anatomy 101") — the same pattern seen at FOMSCU and Assiut. The locally organized
source tree's department-subject folders (Anatomy, Biochemistry, Embryology, Histology,
Physiology) are this lane's own corpus organization, not an SVU-published subject list;
the bylaw awards points/marks per **module**, delivered jointly by the departments it
names.

## Semester 1 — 15 weeks, 27.5 points, 414 marks

| Module folder (observed) | Module name (bylaw) | Module id | Weeks | Points | Marks | Department(s) |
|---|---|---|--:|--:|--:|---|
| *(no matching folder)* | Principles of studying medicine | `SVU-PSM101` | 1 | 1.5 | 23 | Medical Education dept. + Depts of basic sciences |
| Anatomy, Embryology, Histology | Principles of microscopic and macroscopic structures | `SVU-PMM101` | 7 | 10.5 | 158 | Anatomy Department (incl. Embryology per department list, ANA001) + Histology and Cell Biology department (HIS002) |
| Biochemistry, Physiology | Cell biology and function | `SVU-CBF101` | 7 | 10.5 | 158 | Biochemistry department (MBC004) + Physiology department (PHY003) |
| *(no matching folder)* | Patient, Physician Professionalism, and ethics | `SVU-PPE101` | 10 h/wk, whole semester | 5 | 75 | Medical Education dept.* + Forensic and Toxicology dept.* + Neurology and Psychiatry dept.* |
| | **Total, Semester 1** | | 15 | 27.5 | 414 | |

## Semester 2 — 16 weeks, 29 points, 435 marks

| Module folder (observed) | Module name (bylaw) | Module id | Weeks | Points | Marks | Department(s) |
|---|---|---|--:|--:|--:|---|
| *(no matching folder)* | Infection and Immunity | `SVU-INI102` | 8 | 12 | 180 | Microbiology and Immunology dept. + Parasitology dept. |
| *(no matching folder)* | Mechanisms and principles of therapy of diseases | `SVU-MPT102` | 8 | 12 | 180 | Pharmacology dept. + Pathology dept. |
| *(no matching folder)* | History and Physical Examination | `SVU-HPE102` | 10 h/wk, whole semester | 5 | 75 | Internal medicine dept. + General Surgery dept. + Rheumatology dept. + Microbiology and Immunology dept. |
| | **Total, Semester 2** | | 16 | 29 | 435 | |

**Printed Year 1 total (2023 bylaw): 31 weeks, 56.5 points, 849 marks** (23+158+158+75 +
180+180+75). Matches the Desktop catalog note's totals exactly (414 + 435 = 849) —
independently re-verified against the primary PDF, not assumed from that note.

Source: `00 Administration/Plans and Mark Distribution/Internal Bylaw 2023 - 5+2
Credit-Point Program.pdf`, pp29–30, via
`node scripts/content/pagetext.mjs grep "<bylaw path>" "Anatomy|Histology|Physiology|Biochemistry|Embryology|PMM|CBF|PSM|PPE"`
and a direct `show --pages 29` / `show --pages 30`.

## Department list (p9, for the module→department mapping above)

Quoted from the bylaw's department roster: `ANA001` Human Anatomy and Embryology,
`HIS002` Histology and Cell Biology, `PHY003` Medical Physiology, `MBC004` Medical
Biochemistry and Molecular Biology. Embryology is not its own department — it sits
inside `ANA001` alongside gross anatomy, which is why the Embryology corpus folder is
mapped to `SVU-PMM101` rather than treated separately.

## Local corpus coverage

Only two of the seven Year 1 modules have any local source material: `SVU-PMM101`
(Anatomy 4 files + Embryology 4 `.pptx` + Histology 3 files = 11 sources) and
`SVU-CBF101` (Biochemistry 4 files + Physiology 4 files = 8 sources). **No source
material exists locally for `SVU-PSM101`, `SVU-PPE101`, `SVU-INI102`, `SVU-MPT102`, or
`SVU-HPE102`.** All local material is lecture/summary slides — no exam paper, question
bank, or department book for any module. Flagged **needs Omar sources** (Telegram
fetching is retired; nothing further to pull from the corpus root or `_Catalog`).

## For reference only — 2020 bylaw's older Year 1 (not the live map)

Older five-year (non credit-point) program, different codes/marks — do not mix into the
2023-bylaw folders above. Semester 1: Principles of studying medicine 15 marks;
Principles of microscopic and macroscopic structures 180 marks; Cell biology and
function 180 marks; vertical PPS 75 marks (30 points / 15 weeks). Semester 2:
Mechanisms and principles of therapy 188 marks; Infection and immunity 188 marks;
Introduction to Patient Care 75 marks (30 points / 16 weeks). Source: `Internal Bylaw
2020 - Five-Year Credit-Point Program.pdf` (not independently re-grepped page-by-page by
this lane — restated from the Desktop catalog note pending confirmation, since the 2023
bylaw is the live map and this table is reference-only).

## Source Evidence Used

- Manifest: `docs/Qina-Source-Imports/manifest/y1-sources.json`
- Bylaw grepped directly: `Internal Bylaw 2023 - 5+2 Credit-Point Program.pdf` pp9, 29-30
- Desktop source note read for context only (not treated as primary, restated against
  the PDF directly above): `_Catalog/Official Curriculum Completeness Check.md`,
  `Year 1/_Catalog/Year 1 Priority 4.md`
- Source files inventoried under `Year 1/`: 19 (+2 faculty-root bylaws)
