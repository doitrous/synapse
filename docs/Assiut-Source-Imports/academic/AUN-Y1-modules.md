<!--
  Assiut University Year 1 academic structure.
  Derived from the faculty's own official documents (Internal Bylaw 2023 - 5+2
  Credit-Point Program) plus the Desktop folder hierarchy under
  /Users/doitrous/Desktop/Universities/Assiut University/Faculty of Medicine/Year 1.
  No mark, code, or semester fact below was inferred -- every figure cites the
  page it was read from. Silent items are marked "unknown -- needs Omar".
  Import target: Academic Setup > Import. Review module IDs before applying;
  they are AUN-local IDs (AUN-<CODE>).
-->

# Year 1 (AUN_Y1)

Source: `00 Administration/Plans and Mark Distribution/Internal Bylaw 2023 - 5+2
Credit-Point Program.pdf`, pp.19-20 ("Annex 1: Curriculum Map").

## Semester 1 -- 15 weeks / 30 points / 450 marks

| Module | Name | Points | Marks | Written-exam hours | Responsible department(s) |
|---|---|--:|--:|--:|---|
| `AUN-PSM-101` | Principles of studying medicine | 1 | 15 | 0.5 | Assiut University medical education development & training center |
| `AUN-PMS-102` | Principles of microscopic and macroscopic structures | 12 | 180 | 3 | Human anatomy & embryology; Histology |
| `AUN-CBF-103` | Cell biology and function | 12 | 180 | 3 | Medical Physiology; Medical Biochemistry |
| `AUN-PPS-132` | Patient, Physician & Society | 5 | 75 | 1.5 | Forensic medicine & clinical Toxicology; Neurology & psychiatry |

`AUN-PPS-132` bundles three named components on the same page (p.19): "Introduction to
being a Physician", "Ethics, Law & Professionalism", "Behavioral Medicine" -- no
sub-codes are given for these three in the bylaw text.

## Semester 2 -- 16 weeks / 30 points / 450 marks

| Module | Name | Points | Marks | Written-exam hours | Responsible department(s) |
|---|---|--:|--:|--:|---|
| `AUN-INI-105` | Infection and immunity | 12.5 | 187.5 | 3 | Medical microbiology & immunology; Medical Parasitology |
| `AUN-MPT-104` | Mechanisms and principles of diseases & therapy | 12.5 | 187.5 | 3 | Pathology; Medical pharmacology |
| `AUN-IPC-133` | Introduction to Patient Care 1 | 5 | 75 | 1.5 | Assiut University medical education development & training center |

`AUN-IPC-133` bundles "Medical Interviewing", "Introduction to Physical Examination 1",
"Clinical Experiences 1" (p.20) -- no sub-codes given.

## Progression rule

Cited from the pre-existing `_Catalog/Official Curriculum Completeness Check.md` note
(faculty-sourced, 2023 bylaw + 2022-2023 handbook): pass a unit at 60% of its final
marks and 40% of its theory exam; a student sits finals after completing 75% of the
module's credit points. Not independently re-verified against a bylaw page in this pass
-- flagged for confirmation, not restated as an unread fact.

## Desktop folder correspondence

| Desktop folder (`Year 1/<folder>`) | Files | Maps to | Confidence |
|---|--:|---|---|
| `PMS` | 10 | `AUN-PMS-102` | Folder name is a direct code match. |
| `CBF` | 4 | `AUN-CBF-103` | Folder name is a direct code match. |
| `INI` | 4 | `AUN-INI-105` | Folder name is a direct code match. |
| `MPT` | 185 | `AUN-MPT-104` | Folder name is a direct code match. |
| `Terminology` | 6 | unknown -- needs Omar | No block on p.19-20 is named "Terminology"; most plausibly a component of `AUN-PSM-101` (a short intro block), but the bylaw text does not say so. |
| `Psychology` | 2 | unknown -- needs Omar | No block on p.19-20 is named "Psychology"; most plausibly folded into `AUN-PPS-132`'s "Behavioral Medicine" or "Neurology & psychiatry" component, but the bylaw text does not say so. The retired 2016-2017 six-year program did carry a standalone `AMed09 Psychology` course (`Program Specifications 2016-2017 - Six Year.pdf`, p.13) -- **do not** reuse that old-system code; the 2023 bylaw explicitly supersedes it (see "Do not mix" below). |
| `Ethics` | 3 | unknown -- needs Omar | `AUN-PPS-132` names an "Ethics, Law & Professionalism" component (p.19) -- the closest match, but no sub-code is given, so this is a placement guess, not a confirmed code. |
| `00 Administration` | 9 | schedules / bylaws / handbook, not a module | Reference material only. |
| `_Catalog` | 1 | pre-existing lane notes | Not import content. |

`AUN-PSM-101`, `AUN-PPS-132` and `AUN-IPC-133` have **no matching folder at all** on
Desktop -- no source material was found for them in this pass. Needs Omar sources
(Telegram is retired for fetching per standing orders).

## Do not mix

- **CVS, GIT and RRS folders physically sit under this `Year 1` Desktop tree, but they
  are not Year 1.** The same bylaw (pp.21-22, "Second year/Third semester" and "Second
  year/Fourth semester") gives them the codes `CVS-206`, `GIT-207`, `RRS-209` --
  Cardiovascular system, GIT/Gastrointestinal system, and Respiratory and renal systems,
  all under the Second-year organ-system block. The pre-existing `_Catalog/Year 1
  Priority 4.md` note treats these three folders as if they were Year 1 modules ("Seven
  Year 1 modules are covered: PMS, CBF, INI, MPT, CVS, RRS, and GIT") -- that note is
  **wrong on this point** against the bylaw's own curriculum map and should not be relied
  on for module-year assignment. They are inventoried in `manifest/y1-sources.json` as
  `AUN-CVS-MISFILED-Y2` / `AUN-GIT-MISFILED-Y2` / `AUN-RRS-MISFILED-Y2` and are out of
  scope for this Year 1 lane's S2/S3 work; they belong to whichever lane later runs
  Assiut Year 2.
- The 2016-2017 program spec (`Program Specifications 2016-2017 - Six Year.pdf`) is the
  old **6-year** curriculum map (`AMed01 Anatomy 1`, etc. -- p.13) and does not describe
  the current program.
- The 2019 Arabic bylaw (`Internal Bylaw 2019 - Arabic.pdf`) has no English module-code
  annex.

## Source Evidence Used

- Manifest: `docs/Assiut-Source-Imports/manifest/y1-sources.json`
- Primary source: `Internal Bylaw 2023 - 5+2 Credit-Point Program.pdf`, pp.19-22
- Secondary source (progression rule, not independently re-verified): `_Catalog/Official
  Curriculum Completeness Check.md`
- Source files inventoried under `Year 1/`: 892 (includes the misfiled Year 2 folders
  above); confirmed Year 1 module folders (`PMS`, `CBF`, `INI`, `MPT`): 203 files
