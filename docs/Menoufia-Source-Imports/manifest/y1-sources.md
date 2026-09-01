# Menoufia University Year 1 — S0 source inventory

Generated 2026-09-01 from `/Users/doitrous/Desktop/Universities/Menoufia University/Faculty of Medicine/Current Basic 5-Year M.B.B.Ch/Year 1`.

Total files scanned (junk excluded — `.DS_Store`, `Icon` files, Telegram thumbnail cache): **1093**.

Exact-duplicate (sha256) twin groups: **0**, extra twin copies collapsed: **0**.

## Drift reconciliation vs `CLAUDE-HANDOVER.md`

The handover claims "Direct module scan found 1,093 academic files" across MED101–106, and separately notes a "1,089 vs 1,093" four-file catalog drift.

Recomputed directly from the live tree (this scan), file counts per populated module, junk excluded:

| Module | Files |
|---|---:|
| MU-MED101 | 215 |
| MU-MED102 | 261 |
| MU-MED103 | 11 |
| MU-MED104 | 334 |
| MU-MED105 | 233 |
| MU-MED106 | 39 |
| **Total (six populated modules)** | **1093** |

**Verdict: 1,093 is correct.** This scan reproduces it exactly, module by module (215/261/11/334/233/39), matching the handover's own recomputed figure. The "1,089" number is a stale earlier snapshot; do not use it. There are no additional Year-level or per-module `00 Administration` files beyond these 1093 (the `00 Administration` subfolders under Year 1, Semester 1/2, and the five empty module shells contain no non-junk files as of this scan) — so this manifest's total (1093) equals the six-module academic total exactly. The eleven-shell curriculum facts (marks, credits, semester) come from the faculty-level `00 Administration/Plans and Mark Distribution/Official Curriculum Map.csv`, one level above Year 1, which is out of scope for this per-file source manifest but is cited directly in `academic/MU-Y1-modules.md`.

## Counts by module x kind (twins collapsed logically — counted once each; the manifest still lists every twin copy with `twinPreferred`/`nameTwinOf`)

| Module | paper | bank | dept-book | lecture | practical | other | Total |
|---|--:|--:|--:|--:|--:|--:|--:|
| MU-MED101 | 11 | 98 | 5 | 87 | 9 | 5 | 215 |
| MU-MED102 | 12 | 98 | 4 | 86 | 61 | 0 | 261 |
| MU-MED103 | 0 | 4 | 1 | 3 | 0 | 3 | 11 |
| MU-MED104 | 27 | 57 | 9 | 136 | 47 | 58 | 334 |
| MU-MED105 | 4 | 73 | 6 | 36 | 56 | 58 | 233 |
| MU-MED106 | 1 | 8 | 0 | 18 | 0 | 12 | 39 |

## Five empty shells

E101, UNI101, MED107, UNI102, E102 each have **0 files** in the current Desktop tree — confirmed by direct scan, matching the handover. No sources exist for these; they are academic shells only (S1 curriculum doc lists them "no sources").

## Duplicate twin groups (sha256 exact matches, >1 file)

None found.
