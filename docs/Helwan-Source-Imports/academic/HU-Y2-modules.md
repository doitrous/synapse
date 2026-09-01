# HU_Y2 modules

Reconciled against the old lane's 12-module catalogue (`INDEX.md` on
`claude/helwan-content-orchestration-8fe5ec`, source `2024-2029 FMHU Batch`
Telegram channel via `00 Organization Summary.md`, checked 22 Aug 2026). No
discrepancy: the same four `HU_Y2` modules are on disk now, with real content
under three of them and administration-only content under the fourth.

| Module ID | Faculty label | Subjects present (offline) | Theory marks | Modular-work quiz marks |
|---|---|---|---|--:|
| `HU-INH-201` | INH 201 | Microbiology, Parasitology, Pathology, Physiology (+ All Subjects/Assessments) | MCQ 95 + short essay 49 (Micro 15, Para 9, Biochem 5, Pharm ~5, Path ~5, Histo 5, Physio ~5) | 77 (Micro 31, Path 5, Para 18, Pharm 10, Biochem 3, Physio 6, Histo 4) |
| `HU-Community-202` | Community 202 | **Administration only** — no subject-level teaching/question material found (Community Medicine folder holds only its own Administration subfolder) | not stated in corpus (Arabic mark PDFs held, not yet read for values) | not stated in corpus |
| `HU-NSS-203` | NSS 203 | Anatomy, Biochemistry, Clinical Skills, Histology, Pathology, Pharmacology, Physiology | MCQ 43 + short essay 35 (Pharm 5/3q, Histo 5) | not itemised beyond theory split |
| `HU-CRS-204` | CRS 204 | Anatomy, Biochemistry, Clinical Skills, Histology, Pathology, Pharmacology, Physiology | MCQ 48 + short essay 36 (Pharm 5, Physio ~5–6, Histo 5, Micro 5; Biochem+Path linked, no numeric split stated) | not itemised beyond theory split |

Marks source: `Year 2/INH 201/Administration/Assessments and Marks/Mark
allocation — INH 201, NSS 203, and CRS 204.md` (a name-twin of the copy filed
under CRS 204 and NSS 203 — same sha256, one fact, three folders). Community
202's numeric marks live only in Arabic-titled result/mark-roster PDFs
(`رصد أعمال موديول 202...`, `EOM - نتيجة امتحان الموديول...`) that have not
been OCR'd/rendered in this pass — flagged as a readability-index priority,
not fabricated here.

## Catalogue gap note

No `oph`/`ent` subject ids exist in the platform catalogue (same gap the old
Year-3 board flagged for ORL 305). It does not affect Year 2 — none of the
four Y2 modules touch ophthalmology or ENT. Not fixed here per standing
instruction (catalogue changes are not a phase-0 lane's call).

## What changed since the 2026-08-22 board

- The old board's `00 Organization Summary.md` predecessor said Year 2 had no
  offline sources. The current one (dated 22 Aug 2026, same date as the old
  freeze) already lists 75 Year 2 files including real subject teaching
  content for three of the four modules — this was evidently written the same
  day the lane paused, and the Desktop tree was populated after. Re-verify:
  confirmed by direct listing (`find Year 2 -maxdepth 3 -type d`) and the
  manifest at `manifest/y2-sources.json` (75 rows, 2 twin groups).
- File count is 75, not the 68 the phase-0 brief cited from the old board —
  Organization Summary and the fresh manifest agree at 75; treat 68 as
  superseded.
