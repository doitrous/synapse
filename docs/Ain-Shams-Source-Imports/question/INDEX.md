# ASU question index

Import target: Admin → Bulk import → question. Questions depend on their `main_concept` already existing
(live or in the same import batch) and on `library_ids` naming an article that covers it.

| Year | Canonical module | Topic slice | File | Items | Subject | Module subject | Status |
| --- | --- | --- | --- | ---: | --- | --- | --- |
| ASU_Y1 | `ASU-IMM` | Immunology MCQ bank — Ashraf Pt1 (Sections I+II) + cytokines.pdf | [ASU-IMM-immunology-mcq.md](ASU-IMM-immunology-mcq.md) | 51 | `imm` | `ASU-IMM > Immunology` | Every printed key verified by direct image read of the source's own answer-key tables (not OCR). One answer-key gap (Section I Q17) keyed editorially per the ANSWER-KEY GAPS ruling, field-noted. One printed-key oddity (Section II Q26) kept as printed, not silently corrected. `medical:batch` (`--with` concept/article/sources): 0 errors, fieldsUsed 49. Combined `medical:simulate`: `created: 51`, 0 errors. `medical:audit`: 0 errors on these ids. |

Dependency order: import `concept/ASU-IMM-immunology-concepts.md` and `article/ASU-IMM-immunology-articles.md`
first (plus the `perforin/granzyme` sparse update inside the concept file), then this file.

Owed, not yet authored: Ashraf Pt2 (Humoral + Exam I + Exam II + Extra, 62Q — fully OCR'd and keyed, see
the chief-of-staff report for this batch), and the two block-level banks (hegazy ~101Q, and the 241-Q
generic bank whose Q181-241 have no printed key anywhere in the source).
