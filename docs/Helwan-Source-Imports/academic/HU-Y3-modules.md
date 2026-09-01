# HU_Y3 modules

Reconciled against the old lane's 12-module catalogue and its six Year-3
triage lanes (`HANDOFF.md`, `TRIAGE-CHECKPOINT-2026-08-22.md` on
`claude/helwan-content-orchestration-8fe5ec`). No discrepancy: the same four
`HU_Y3` modules are on disk now — `GIT 301`, `URS 303`, `FTF 304`, `ORL 305`.

| Module ID | Faculty label | Subjects present (offline) | Marks / assessment data |
|---|---|---|---|
| `HU-GIT-301` | GIT 301 | Anatomy, Biochemistry, Histology, Parasitology, Pathology, Pharmacology, Physiology (+ All Subjects/Questions, two illustrated Anatomy practical PDFs) | Administration folder present but empty — no schedule/marks doc in corpus |
| `HU-URS-303` | URS 303 | Anatomy, Histology, Pathology, Pharmacology, Physiology, Past Exams and MCQs | **No schedule, marks, or orientation data exists** — `Administration/00 Source availability note.md` documents an authenticated Telegram search that returned none; only 3 past-question PDFs (2 MCQ, 1 EOM) surfaced |
| `HU-FTF-304` | FTF 304 | Forensic Medicine, Forensic Medicine and Toxicology (dept book, questions, revision), Toxicology (incl. plant toxicology) | 60-mark quiz: Family Medicine 15, Community Medicine 15, Forensic+Toxicology 30 (Forensic serology/identification/wounds/death/transport injuries/head injuries; Toxicology general/pesticides/corrosives/analgesics/gases). Module-work MCQ exam 14 May 2026. **Only the Forensic+Toxicology 30 marks have offline teaching/question content** — Family and Community Medicine sub-syllabi are named in the quiz allocation but have no corresponding source folder |
| `HU-ORL-305` | ORL 305 | ENT (Clinical Cases, Core Notes, Dept Books, Exam Guidance, Practical, Questions, Revision), Ophthalmology (Core Notes, Practical, Questions, Revision) | Administration folder present but empty — no schedule/marks doc in corpus |

## Catalogue gap (open, not fixed here)

No `oph`/`ent` subject ids exist in the platform catalogue. ORL 305's two
subjects (Ophthalmology, ENT) both fall to `mul` by elimination under the
current placement law — this is the same gap the old board flagged and
pre-ruled on (Ophthalmology accepted as `mul` with `field_notes` reason,
`module_subject` starting `ORL 305 > Ophthalmology > …`). Per this lane's
brief: note the gap, do not fix the catalogue.

## Richest module by evidence (drives triage-recovery pick, see `coverage/`)

`GIT 301` covers 7 subjects across two prior lanes (GIT-301-A anatomy/
histology/physiology, GIT-301-B pathology/pharmacology/parasitology/
biochemistry) — the broadest subject spread of any Year 3 module, ~962
questions triaged across both lanes in the old board's checkpoint table.
`FTF 304` is denser in raw question count (897) but only 2 subjects are
represented offline (Forensic Medicine, Toxicology) — Family and Community
Medicine, though named in its own mark allocation, have no source folder.
`GIT 301` is picked as the richest module for the recovery pass in
`coverage/HU-GIT-301-triage.md`.

## What changed since the 2026-08-22 board

- File count is 71 (Organization Summary and the fresh manifest at
  `manifest/y3-sources.json` agree), not the 70 the phase-0 brief cited from
  the old board.
- No new Year-3 module appeared and none disappeared — the same four.
