<!--
  6 October University Year 1 academic structure.
  Derived from the faculty's own official document (Internal Bylaw 2023 - 5+2
  Credit-Hour Program) plus the Desktop folder hierarchy under
  /Users/doitrous/Desktop/Universities/6 October University/Faculty of Medicine.
  No mark, code, or semester fact below was inferred -- every figure cites the
  page it was read from. Silent items are marked "unknown -- needs Omar".
  Import target: Academic Setup > Import. Review module IDs before applying;
  they are O6U-local IDs (O6U-<CODE>).
-->

# Year 1 (O6U_Y1)

Source: `00 Administration/Plans and Mark Distribution/Internal Bylaw 2023 - 5+2
Credit-Hour Program.pdf`, p.17 ("Article 5: Distribution of courses, hours and
marks"). This 25-page bylaw contains exactly one course table (Article 5), and it
covers exactly Semester 1 + Semester 2 -- the program's Article 4 (p.15) states the
whole degree is 10 semesters (5 pre-clinical + 5 clinical); no later-year table
exists in this document, so there is no risk of a Year-2 course being read as Year
1 here (verified by `pagetext.mjs grep` for "Year"/"Semester 3" etc. -- no hits).

## Semester 1 -- 20 credit hours / 450 marks

| Module | Name | Credit hours | Mod-work | Mid-Module | End-Module | Pract & Clin | Total marks |
|---|---|--:|--:|--:|--:|--:|--:|
| `O6U-IBS-101` | Introduction to Body Structure | 5 | 12 | 25 | 50 | 38 | 125 |
| `O6U-IBF-102` | Introduction to Body Function | 4 | 10 | 20 | 40 | 30 | 100 |
| `O6U-IHI-103` | Introduction to Haemato-Immunology | 5 | 12 | 25 | 50 | 38 | 125 |
| `O6U-IMB-104` | Introduction to Molecular Biology | 3 | 7 | 15 | 30 | 23 | 75 |
| `O6U-SKL-1` | Skills 1 | 1 | -- | -- | -- | 25 | 25 |
| `O6U-PRF-1` | Professionalism 1 | 1 | -- | -- | Pass/Fail | -- | -- |
| `O6U-ELE-1` | Elective 1 | 1 | -- | -- | Pass/Fail | -- | -- |

## Semester 2 -- 20 credit hours / 450 marks

| Module | Name | Credit hours | Mod-work | Mid-Module | End-Module | Pract & Clin | Total marks |
|---|---|--:|--:|--:|--:|--:|--:|
| `O6U-IMN-105` | Introduction to Metabolism & Nutrition | 4 | 10 | 20 | 40 | 30 | 100 |
| `O6U-IMP-106` | Introduction to Microbial & Parasitic agents | 4 | 10 | 20 | 40 | 30 | 100 |
| `O6U-IPA-107` | Introduction to Pathology | 5 | 12 | 25 | 50 | 38 | 125 |
| `O6U-IPH-108` | Introduction to Pharmacology | 4 | 10 | 20 | 40 | 30 | 100 |
| `O6U-SKL-2` | Skills 2 | 1 | -- | -- | -- | 25 | 25 |
| `O6U-PRF-2` | Professionalism 2 | 1 | -- | -- | Pass/Fail | -- | -- |
| `O6U-ELE-2` | Elective 2 | 1 | -- | -- | Pass/Fail | -- | -- |

## Progression rule

Cited from the pre-existing `_Catalog/Official Curriculum Completeness Check.md`
note (faculty-sourced): 1 credit hour = 25 marks except electives/professionalism
(pass/fail); 200 credit hours total for the whole program (the same note flags the
evaluation page also saying 213 -- not reconciled). Not independently re-verified
against a bylaw page in this pass -- flagged for confirmation, not restated as an
unread fact.

## Desktop folder correspondence

| Desktop folder (`Year 1/<folder>`) | Files | Maps to | Confidence |
|---|--:|---|---|
| `IBS-IBF` | 4 | `O6U-IBS-101` + `O6U-IBF-102` (combined) | Folder combines both -- see "Split note" below. |
| `IHI-HID` | 4 | `O6U-IHI-103` | Folder name uses the old block code `HID`; content (histology, hemato-immunology, blood physiology) matches IHI-103's scope. |
| `IMI-MBI` | 4 | `O6U-IMB-104` | Folder name uses the old block code `MBI` (Molecular Biology); content (cytogenetics, bio questions) matches IMB-104. |
| `MEN-IMN` | 4 | `O6U-IMN-105` | Folder name uses the old block code `MEN` (Metabolism & Nutrition); content matches IMN-105 exactly. |
| `MIP` | 4 | `O6U-IMP-106` | Direct match -- microbiology & parasitology. |
| `GMD` | 4 | `O6U-IPA-107` | Folder name is the old block code for pathology; content (pathology Q bank, haemodynamics, neoplasia) matches IPA-107. |
| `DRG` | 4 | `O6U-IPH-108` | Folder name is the old block code for pharmacology (`فارما` = pharma in file titles); content matches IPH-108. |
| `00 Administration` | 5 (2 faculty-level + 1 Year-1-level bylaw/schedule set counted once, see manifest) | schedules / bylaws / tutor guide, not a module | Reference material only. |
| `_Catalog` | 2 | pre-existing lane notes | Not import content. |

**Split note on `IBS-IBF`:** the folder's 4 files (`BOS final exam 20-21`, three
`mid module BOS 101` papers) are not separable file-by-file between `IBS 101`
(Body Structure) and `IBF 102` (Body Function) -- all four are branded "BOS 101"
(the old combined course name for both). `manifest/y1-sources.json` records these
under the bookkeeping label `O6U-IBS-101+IBF-102`, not a minted module id. Whether
to author under one code, split by question content, or treat as one authoring
unit is an open call for S2 -- flagged, not resolved here.

`O6U-SKL-1`, `O6U-SKL-2` (Skills), and all four `PRF`/`ELE` (Professionalism/
Elective, pass-fail) components have **no matching folder at all** on Desktop --
no source material was found for them in this pass. Needs Omar sources (Telegram
is retired for fetching per standing orders).

## Do not mix

- The faculty's `Official Curriculum Completeness Check.md` note explicitly warns:
  "Two undergraduate maps are published; do not merge them." An older 2018/2020
  block map (`Internal Bylaw 2018 amended 2020 - 5+2 Credit-Hour Program.pdf`) uses
  different course codes for what is functionally the same Year 1 content -- `BOS
  101`, `GMD 102`, `MIP 103`, `DRG 104`, `MET 105` for Block 1, and `MBI`/`MUS`/
  `HID`/`CTX`/`CSC` for Block 2. This older map was **not** independently paged
  through in this pass (the 2023 map is current per the completeness-check note),
  but its course codes are exactly the ones the prior local curator used to name
  the Desktop folders (`GMD`, `MIP`, `DRG`, `HID`, `MBI`, `MEN` for `MET`) --
  explaining the folder-vs-2023-code mismatch resolved in the correspondence table
  above. `CTX` (clinical toxicology) and `CSC` are excluded here per the
  pre-existing `Year 1 Priority 4.md` note, which found CTX is not a Year 1 course
  in the current map; `CSC` was not found as a folder or a 2023-map code and is
  unaccounted for -- needs Omar.
- Telegram fetching is retired. All 28 module files here were already resident on
  Desktop from a prior local pass before this lane started; no new fetch was
  performed.

## Source Evidence Used

- Manifest: `docs/6October-Source-Imports/manifest/y1-sources.json`
- Primary source: `Internal Bylaw 2023 - 5+2 Credit-Hour Program.pdf`, pp.14-17
  (read directly via `pagetext.mjs show`, not restated from the pre-existing
  catalog note)
- Secondary source (progression rule, folder correspondence cross-check, not
  independently re-verified): `_Catalog/Official Curriculum Completeness Check.md`
  and `Year 1/_Catalog/Year 1 Priority 4.md`
- Source files inventoried under `Year 1/`: 30 (28 curated module files + 2
  Year-1-level admin/catalog files); faculty-level `00 Administration`/`_Catalog`:
  5 more files, counted separately in the manifest.
