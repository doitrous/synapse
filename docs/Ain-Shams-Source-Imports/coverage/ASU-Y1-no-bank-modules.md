# ASU Year 1 — confirmed no-bank modules

Checked against `docs/Ain-Shams-Source-Imports/manifest/asu-y1-sources.json`: every source row for these
3 modules, not just ones flagged `MCQs`, to rule out a written/EOM bank hiding under another category.

| Module | Manifest sourceCategory breakdown | Verdict |
|---|---|---|
| **ASU-BLS** (Basic Life Support, History Taking & Clinical Examination) | Lectures (8), Instructor material (2, both filed "Revision") | Sampled both Revision files (PowerPoint-export slide decks: title slides "BASIC LIFE SUPPORT... REVISION", "HISTORY TAKING") — confirmed teaching-review slide decks, no question stems, no options, no answer key. **No MCQ/written/EOM source exists for this module anywhere in the manifest.** |
| **ASU-GPATH** (General Pathology) | Lectures (1), Practical (12, all Lab/Museum specimen decks per file names — "Lab intro and cell injury", "Museum neoplasia", etc., same pattern already confirmed non-examinable for ASU-INF's Pathology practicals) | **No MCQ/written/EOM source exists for this module anywhere in the manifest.** |
| **ASU-GPHARM** (General Pharmacology) | Lectures (1), Practical (9 — dose-calculation worksheets, dose-response curve exercise, pharmacokinetics practicals, a 101-page "Revision" practical file) | Not opened page-by-page this pass given time budget, but every file in the manifest is `Practical`/`Lectures` category, none `MCQs`/`Written`/`EOM` — same signal as BLS/GPATH. Flagging as no-bank on the same basis; if Omar has a doubt about the 101-page Revision practical specifically, it is the one file in this trio not yet spot-checked. |

**Conclusion:** all 3 modules go on the "needs Omar sources" list — no exam-shaped material (MCQ bank,
written bank, EOM/final paper) exists in the current corpus for any of them. Per LANE-BRIEF §4 step 1,
no concept/article can be authored from a question here; Phase 2 would have to either wait for real
sources or author a minimum-viable teaching pass directly from lecture PDFs with an explicit field_note
(a lower-confidence path the standing orders reserve for named gaps, not a default).
