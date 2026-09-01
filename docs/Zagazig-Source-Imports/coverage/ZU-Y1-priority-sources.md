# Zagazig University Year 1 -- S2 priority source set

Built from a prior Desktop-side curation (`Year 1/_Catalog/Year 1 Priority 4.md`, last verified 2026-08-31) that selected 4 high-yield resources per module from the 617-file staging corpus, all integrity-checked. Cross-checked here against `manifest/y1-sources.json` (31/32 matched by exact filename; the 32nd matched after a Unicode-normalization mismatch in the check script, not a missing file -- confirmed present by `find`). Kind/tier below are the manifest's own classification, not re-derived.

Two faculty-wide administrative sources are added ahead of every module set, since they are the only source for module codes/marks (`academic/ZU-Y1-modules.md`):

| File | Corpus | Kind | Tier | sha256 (12) |
|---|---|---|--:|---|
| Internal Bylaw 2023 - 5+2 Credit-Point Program.pdf | faculty-admin | other | 9 | `14e19dbefaab` |
| Academic Advising Guide 2025-2026.pdf | faculty-admin | other | 9 | `e8030ec43254` |

## ZU-MED-106 Cardiopulmonary

| File | Kind | Tier | sha256 (12) |
|---|---|--:|---|
| Cardio-Pulmonary Module Final (4).pdf | paper | 1 | `970742aa4439` |
| Cardio-Pulmonary Module Final ---Part 2-1.pdf | paper | 1 | `ade726d7a165` |
| all Previous Years ospe Cardiopulmonary  (1).pdf | paper | 1 | `77b8ab268e0e` |
| Fakous CPS Final 2024.pdf | paper | 1 | `d317235aa4f2` |

## ZU-MED-107 GIT and Nutrition

| File | Kind | Tier | sha256 (12) |
|---|---|--:|---|
| Fakous GIT final 2024.pdf | paper | 1 | `1522efbc9239` |
| GIT Module - Practical revision 2.pdf | practical | 2 | `df0327f0f846` |
| GIT HAND OUT  (1).pdf | lecture | 2 | `2ed1899339e0` |
| تحديدات_فاينال_GIT_كتاب_القسم_المُرتب_.pdf | other | 9 | `4fca6ff1c08e` |

## ZU-UNI-101 Human Rights and Community Issues

| File | Kind | Tier | sha256 (12) |
|---|---|--:|---|
| مقرر القضايا المجتمعيه 2024.pdf | other | 9 | `44968090bc8f` |
| القضيه الاولي الزياده السكانيه.ppt | other | 9 | `7d6d3b446399` |
| القضيه الثانيه (1).ppt | other | 9 | `7e94243f74f0` |
| القضيه الثالثه (1).ppt | other | 9 | `24bdefd45e48` |

## ZU-MED-102 Medical Terminology

| File | Kind | Tier | sha256 (12) |
|---|---|--:|---|
| Fakous Medical Terminology Final 2024.pdf | paper | 1 | `140e202a153b` |
| Medical_terms MCQ.pdf | bank | 2 | `1957839d179e` |
| Terminology (1) Dr Abdalla Elsamahy 5.pdf | other | 9 | `ceedc0432301` |
| terminology dr. wagih.pdf | other | 9 | `e1278ce45545` |

## ZU-MED-104 Musculoskeletal

| File | Kind | Tier | sha256 (12) |
|---|---|--:|---|
| Fakous MSK Final 2024.pdf | paper | 1 | `3edc2907cfa4` |
| 1st  role  FAKOS OSPE MSK exam cr 2024-2025.pdf | practical | 2 | `e36c3c74065e` |
| Musculoskeleal Module book 2023-2024.pdf | dept-book | 2 | `0727b45e656e` |

## ZU-MED-105 Professional Practice I

| File | Kind | Tier | sha256 (12) |
|---|---|--:|---|
| Fakous P.P1 Final 2024.pdf | paper | 1 | `36e2af96fa83` |
| Zag P.P1 Final 2024.pdf | paper | 1 | `a7308cd463e8` |
| امتحانات سابقه.pdf | paper | 1 | `19c07b3bc276` |
| mcq شامل.pdf | bank | 2 | `d1133b50d2ae` |

## ZU-MED-108 Professional Practice II

| File | Kind | Tier | sha256 (12) |
|---|---|--:|---|
| Fakous P.P2 Final 2024.pdf | paper | 1 | `82774d812f46` |
| OSPE “Answers” Yousef Amr.pdf | practical | 2 | `663edb2b52f2` |
| Final Hamdy 1 - 1st year.pdf | paper | 1 | `3a39ec7afade` |
| Basic clinical skills 1.pdf | practical | 2 | `49b325d17635` |

## ZU-MED-103 Structure and Function

| File | Kind | Tier | sha256 (12) |
|---|---|--:|---|
| Final S&F 2024 .pdf | paper | 1 | `42181581651f` |
| examsssss (1).pdf | other | 9 | `ca670dd3dfc9` |
| Hand out Module 1 st year-signed.pdf | lecture | 2 | `53c0e2173815` |
| Previous exams Physio 2024.pdf | paper | 1 | `e7b3fe582d59` |

## Notes

- Every priority file above sits in the `staging` corpus (Telegram-sourced, Fakous/Zagazig provenance flag -- see `academic/ZU-Y1-modules.md`) -- the organized `Year 1/` tree has no Final-exam-grade material of its own yet (see the "Known S0 gaps" note in `manifest/y1-sources.md`: most `year1`-corpus module subfolders are empty placeholders).

- ZU-MED-106 (Cardiopulmonary) was chosen as the S3 first-module triage target -- see `coverage/ZU-MED-106-triage.md` for why and what was found, including a corpus-wide key-recovery trap (hand-drawn ink marks, not detected by `pagetext.mjs keys`) that likely applies to other modules' `Final`-named papers too.

- This is a priority **set**, not a priority **order** -- no ranking across modules is asserted here beyond "Cardiopulmonary triaged first" (S3 §above). A full priority ranking across all 8 modules would need at minimum a `keys` pass on each module's Final-named paper, not done for the other 7 modules this pass.
