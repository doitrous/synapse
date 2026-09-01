# MUST Year 2 — source manifest summary

Generated from [`y2-sources.json`](y2-sources.json) by
`scripts/must/intake/manifest_y2.py`. 1,583 files inventoried, sha256-keyed,
under `/Users/doitrous/Desktop/Universities/MUST/Year 2/` (Semester 201 +
Semester 202). **37 exact-duplicate (same-sha256) twin groups, 80 files**
collapsed via `duplicateOf` (no cross-year or near-duplicate/name-twin pass
has been run yet — sha256 identity only).

## By extension (1,583 rows)

| ext | count |
|---|---:|
| pdf | 1,334 |
| pptx | 120 |
| jpeg | 48 |
| jpg | 36 |
| ppt | 15 |
| png | 13 |
| docx | 11 |
| doc | 4 |
| tsv | 2 |

The two `tsv` rows are Google-Drive-provenance manifests dropped by the
organizing pass (`00 Source Manifest - 201.tsv` / `- 202.tsv`, file_id →
destination-path mappings) — administrative, not curriculum content;
`kind: other`, `sourceTier: 9`.

## By module × kind (1,568 rows in a module; 15 administration rows excluded)

| Module | lecture | book | practical | summary | bank | paper | Total |
|---|--:|--:|--:|--:|--:|--:|--:|
| `MUST-CVS-201` | 71 | 5 | 49 | 6 | 87 | 23 | 241 |
| `MUST-DHB-202-1` | 100 | 4 | 39 | 7 | 38 | 18 | 206 |
| `MUST-DHB-202-2` | 133 | 0 | 54 | 0 | 61 | 41 | 289 |
| `MUST-END-202` | 46 | 3 | 41 | 4 | 43 | 29 | 166 |
| `MUST-HIM-201` | 76 | 4 | 59 | 6 | 50 | 18 | 213 |
| `MUST-INCISION-201` | 14 | 0 | 0 | 0 | 0 | 0 | 14 |
| `MUST-METABOLISM-I` | 7 | 0 | 5 | 3 | 32 | 7 | 54 |
| `MUST-METABOLISM-II` | 3 | 0 | 2 | 0 | 17 | 8 | 30 |
| `MUST-PCD-200` | 8 | 0 | 0 | 0 | 5 | 2 | 15 |
| `MUST-RES-201` | 67 | 4 | 46 | 5 | 73 | 27 | 222 |
| `MUST-RESEARCH-METHODOLOGY` | 10 | 0 | 0 | 0 | 8 | 1 | 19 |
| `MUST-SEMESTER-WIDE-RESOURCES` | 51 | 4 | 6 | 0 | 23 | 15 | 99 |

`kind` legend: `bank` = MCQs folder (tier 2); `paper` = EOM/EOY/Midterm exam
folder (tier 1 for EOM/EOY, tier 2 for Midterm); `book` = department book
(tier 3); `lecture` = "01 University Material" (tier 4); `practical` =
Practical/OSPE (tier 4); `summary` = Summaries and Revision (tier 5).

**`MUST-CVS-201` is the exam-richest module** — 87 MCQ-bank files + 23 papers
= 110 exam-signal sources, ahead of `MUST-DHB-202-2` (61 + 41 = 102) and
`MUST-RES-201` (73 + 27 = 100) — see the first-module triage rationale in
`../coverage/MUST-CVS-201-triage.md`.

## Notes

- **`MUST-INCISION-201`** (14 lecture-kind files, all "01 University Material"
  under a single `Incision` subject folder — clinical/procedural skills such
  as capillary blood sampling) does **not** appear as a graded module in
  `/Users/doitrous/Desktop/Universities/MUST/00 Modules and Marks Reference.md`'s
  Semester 201 table (CVS 201, HIM 201, RES 201, Metabolism I only). Flagged
  **needs Omar** — confirm whether Incision 201 carries its own marks/exam or
  is ungraded skills training folded into another module's OSPE.
- **`MUST-SEMESTER-WIDE-RESOURCES`** (99 files, present under both Semester
  201 and Semester 202) is a shared-material pool organized by subject
  (Anatomy, Biochemistry, Histology, Microbiology, Parasitology, Pathology,
  Pharmacology), not a gradable module of its own — no module id maps to it in
  the marks reference. Kept as its own bucket (`moduleId: null` would have
  hidden it); do not confuse with a Semester-201/202-specific module.
- Administration (15 rows: plans, schedules) is `moduleId: null`, `kind:
  admin`, `sourceTier: 9` — cited directly in
  [`../academic/MUST-Y2-modules.md`](../academic/MUST-Y2-modules.md), not part
  of the module × kind table above.
- Both semesters' Plan-and-Marks-Distribution PDFs are scanned/garbled
  (`pagetext.mjs status`: 0 words on every page) — already transcribed by
  `00 Modules and Marks Reference.md` ("PentaGram bot's MUST plan sheets");
  the academic doc cites that transcription rather than re-OCRing an
  already-solved source.
