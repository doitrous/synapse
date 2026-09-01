# Zagazig University Year 1 — source manifest summary

Generated from [`y1-sources.json`](y1-sources.json). 640 files inventoried, sha256-keyed; 0 exact-duplicate (same-sha256) twin(s) found and collapsed via `duplicateOf`.

## Corpus scope

| Corpus | Rows | What it is |
|---|---:|---|
| `faculty-admin` | 8 | `00 Administration/Plans and Mark Distribution/` — whole-program bylaws/handbooks, not year-scoped, cited in `academic/ZU-Y1-modules.md` |
| `year1` | 15 | The organized `Year 1/` tree — schedules, EOY, and the 6 modules that already have a promoted folder |
| `staging` | 617 | `_Staging/Telegram Year 1/Fakous Medical Data/` — Telegram-sourced dump, already split into 8 module folders and audited/prioritized by a prior pass (see `_Catalog/` on Desktop), but **provenance mixes Fakous and Zagazig** — flagged needs-Omar, see LANE-CARD |

## By extension

| ext | count |
|---|---:|
| pdf | 611 |
| pptx | 20 |
| ppt | 7 |
| jpg | 1 |
| md | 1 |

## By kind

| kind | count |
|---|---:|
| other | 413 |
| bank | 120 |
| paper | 49 |
| practical | 46 |
| lecture | 9 |
| dept-book | 3 |

## By module × kind

| Module | paper | bank | dept-book | lecture | practical | other | Total |
|---|--:|--:|--:|--:|--:|--:|--:|
| (unmapped) | 0 | 0 | 1 | 0 | 0 | 14 | 15 |
| ZU-MED-102 | 1 | 2 | 0 | 2 | 0 | 2 | 7 |
| ZU-MED-103 | 8 | 18 | 0 | 3 | 6 | 65 | 100 |
| ZU-MED-104 | 11 | 27 | 1 | 0 | 14 | 117 | 170 |
| ZU-MED-105 | 10 | 9 | 0 | 0 | 0 | 18 | 37 |
| ZU-MED-106 | 10 | 32 | 0 | 1 | 8 | 103 | 154 |
| ZU-MED-107 | 7 | 26 | 1 | 2 | 13 | 75 | 124 |
| ZU-MED-108 | 2 | 6 | 0 | 1 | 5 | 11 | 25 |
| ZU-UNI-101 | 0 | 0 | 0 | 0 | 0 | 8 | 8 |

Kind classification is filename/path heuristics (S0 survey precision) — refined per-file at S1 triage, not authoritative for authoring decisions yet.

## Known S0 gaps

- `Year 1/07 EOY/تحديدات فاينال - CPS كتاب القسم.pdf` (CPS = Cardio-Pulmonary System) sits under the `07 EOY` top folder, not a module folder, so the module-inference heuristic leaves it `(unmapped)`. It is `ZU-MED-106` (Cardiopulmonary) content by filename; confirm at S1.

- `year1` corpus module subfolders (`Cardiopulmonary/01 University Material`, `Human Rights/01 University Material`, `Professional Practice I/01 University Material`) exist as empty directory placeholders — 0 files promoted into them yet. All real content for those modules currently lives only in the `staging` corpus.

- No Year-2/Year-3 top-level folder name collides with a Year-1 module name (checked by directory listing: `Year 2` = CNS/Special Senses, Endocrine/Reproductive, Principles of Diseases and Drugs, PP III/IV, Systemic Pathology 1, Urinary; `Year 3` = Community Medicine, Infection and Immunity, PP V, Systemic Pathology 2) — no gross misfiling found at the folder level. Per-file exam-sitting-year verification (printed date on each paper) is an S1 task, not yet done here.
