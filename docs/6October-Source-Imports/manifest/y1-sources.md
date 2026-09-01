# 6 October University Year 1 -- source manifest (S0 inventory)

Generated: 2026-09-02 | corpus root: `/Users/doitrous/Desktop/Universities/6 October University/Faculty of Medicine`

Total files inventoried: **35** | exact-duplicate twins collapsed: **0** | distinct files: **35**

The Desktop tree for this university is much smaller than Assiut's: a prior local pass
(`Year 1/_Catalog/Year 1 Priority 4.md`, dated 2026-08-31) had already curated Year 1's
module material down to 28 files across 7 combined module folders, all sourced from the
Telegram bot `@O6Umed_Diaa_bot`. No new Telegram fetch was performed in this pass --
Telegram fetching is retired; these 28 files were already resident on Desktop before this
lane started. No misfiled-year folders were found: the current 2023 Internal Bylaw's course
table (p.17) is the *only* course table in that 25-page document, and it covers exactly
Semester 1 + Semester 2 -- i.e. Year 1 of the program's 10-semester structure (p.15, "5
pre-clinical + 5 clinical semesters"). Nothing under `Year 1/` maps to a later year.

## Counts by module x kind (twins collapsed)

| Module | paper | dept-book | bank | lecture | practical | other | Total |
|---|--:|--:|--:|--:|--:|--:|--:|
| O6U-IBS-101+IBF-102 | 4 | 0 | 0 | 0 | 0 | 0 | 4 |
| O6U-IMP-106 | 0 | 0 | 4 | 0 | 0 | 0 | 4 |
| O6U-IHI-103 | 1 | 0 | 2 | 0 | 0 | 1 | 4 |
| O6U-IMB-104 | 1 | 0 | 1 | 0 | 0 | 2 | 4 |
| O6U-IMN-105 | 2 | 0 | 1 | 0 | 0 | 1 | 4 |
| O6U-IPA-107 | 0 | 0 | 1 | 0 | 1 | 2 | 4 |
| O6U-IPH-108 | 0 | 0 | 1 | 0 | 1 | 2 | 4 |
| O6U-ADMIN | 0 | 0 | 0 | 0 | 0 | 5 | 5 |
| O6U-CATALOG | 0 | 0 | 0 | 0 | 0 | 2 | 2 |

No `dept-book` or `lecture` kind was auto-detected in the 28 curated module files --
this reflects the Priority 4 selection rule (exams, department-staff question sets,
comprehensive/core banks; no lecture-slide recordings or plain lecture PDFs were kept),
not a gap in this pass's classification. Several files classified `other` are still
high-value department-staff question sets (e.g. `haemodynamic- رباب.pdf`,
`neoplasia- رباب.pdf` under `O6U-IPA-107`; `Strange terms and important notes in MBI
module.pdf` under `O6U-IMB-104`) -- see `coverage/O6U-Y1-priority-sources.md` for the
per-file tier reasoning.

## Notes

- `O6U-IBS-101+IBF-102`, `O6U-IHI-103`, `O6U-IMB-104`, `O6U-IMN-105`, `O6U-IMP-106`,
  `O6U-IPA-107`, `O6U-IPH-108` are the seven Desktop module folders (`IBS-IBF`, `IHI-HID`,
  `IMI-MBI`, `MEN-IMN`, `MIP`, `GMD`, `DRG`) mapped to the current (2023 bylaw) module
  codes per `academic/O6U-Y1-modules.md`. `O6U-IBS-101+IBF-102` is a bookkeeping label,
  not a minted module id: the `IBS-IBF` folder's 4 files are not separable file-by-file
  between `IBS 101` (Body Structure) and `IBF 102` (Body Function) -- both are BOS-branded
  exam papers covering the old combined "BOS 101" course. Needs Omar (or S2 authoring
  judgement) on whether to split by content or keep as one authoring unit.
- `O6U-ADMIN` = `00 Administration` (both faculty-level and `Year 1/00 Administration`) --
  bylaws, tutor guide, schedules. Reference material only, not import content.
- `O6U-CATALOG` = pre-existing `_Catalog` notes (`Year 1 Priority 4.md`, `Official
  Curriculum Completeness Check.md`) -- prior local survey notes, not import content, but
  load-bearing evidence for this manifest's module mapping and scope decisions.
- Two SKL (Skills) and four PRF/ELE (Professionalism/Elective, pass-fail) components exist
  on the bylaw's course table but have **no matching folder at all** on Desktop -- no
  source material was found for them in this pass. Needs Omar sources (Telegram is retired
  for fetching per standing orders).
- Tiering follows the faculty's own Priority 4 selection intent, reapplied per file: 1 =
  real exam papers (finals, mid-modules), 2 = practical/oral exam material, 3 =
  comprehensive/core MCQ or question banks, 4 = narrower notes, topic-specific sets, or
  case collections, 5 = admin/reference (not authored from).
