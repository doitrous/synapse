# Al-Azhar University Damietta Year 1 -- readability index (S1b)

Generated via `node scripts/content/pagetext.mjs index <dir> --out <file>`, one pass
per source PDF, cached by sha256 (`pdftotext -layout`). Raster `.jpeg`/`.jpg` schedule
images are not covered (PDF-only tool) and are not authorable content anyway (exam
*schedule* images, not exam content).

## The only content-bearing sources -- Faculty of Medicine/Year 1 Telegram archive

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| Musculoskeletal/_Telegram Year 1 Archive/Formative exam with answers.pdf | 5 | 1003 | 0 | 0 |
| Musculoskeletal/_Telegram Year 1 Archive/Anatomy prac.نظري.pdf | 5 | 1042 | 0 | 0 |
| Musculoskeletal/_Telegram Year 1 Archive/Mechanism of muscle contraction.pdf | 10 | 394 | 0 | 0 |
| Musculoskeletal/_Telegram Year 1 Archive/bone histo questions.pdf | 2 | 240 | 0 | 0 |
| Respiratory/_Telegram Year 1 Archive/S.G of respiratory module(3).pdf | 65 | 10988 | 0 | 0 |
| Respiratory/_Telegram Year 1 Archive/para respiratory.pdf | 22 | 2650 | 0 | 0 |
| Respiratory/_Telegram Year 1 Archive/patho respiratory.pdf | 16 | 1674 | 0 | 0 |
| Respiratory/_Telegram Year 1 Archive/فسيولوجي ..مديول Respiratory.pdf | 13 | 39 | 0 | 0 |
| Blood/_Telegram Year 1 Archive/تلخيص هستو موديول blood.pdf | 15 | 45 | 0 | 0 |
| Blood/_Telegram Year 1 Archive/ملخص فسيو blood.pdf | 7 | 21 | 0 | 0 |
| Blood/_Telegram Year 1 Archive/حل امتحان السوماتيف موديول blood .pdf | 5 | 15 | 0 | 0 |
| Blood/_Telegram Year 1 Archive/اساله البارا موديول blood .pdf | 3 | 9 | 0 | 0 |

**Read the "0 garbled pages" column with suspicion on five of these files.**
`pagetext.mjs`'s garbled flag only catches a genuinely 0-word page; a page that
extracts a handful of watermark/header words while the real content is a scanned
image reports "0 garbled" and a low word count at the same time (the same trap the
6 October lane's readability index names for `Bio questions.pdf`/`MBI final
exam.pdf`). All four `Blood/` files and `فسيولوجي ..مديول Respiratory.pdf` fall in
that trap: 3-15 pages producing only 9-45 native words is not ordinary printed text
at any font size -- these five are effectively image scans and need OCR before
anything in them can be read, despite showing 0 garbled pages.

The other seven files are genuinely native: `Formative exam with answers.pdf` and
`Anatomy prac.نظري.pdf` (~1000 words over 5 pages each -- normal MCQ/notes density),
`Mechanism of muscle contraction.pdf` (394 words/10 pages -- notes with figures),
`para respiratory.pdf` and `patho respiratory.pdf` (dense native prose), and
`S.G of respiratory module(3).pdf` (65p/10,988 words, by far the largest native
document in the corpus). `bone histo questions.pdf` is native but its extraction is
glyph-mangled (broken ligatures, e.g. "enumer atehi stol ogi cal" for "enumerate
histological") -- readable by a human, not cleanly by a naive keyword search.

**`Formative exam with answers.pdf` carries a fully recoverable printed key that
plain-text extraction cannot see at all.** `pagetext.mjs keys` (bold-marker
heuristic) found only 1 of 25 answers; rendering all 5 pages (200 dpi) shows every
question's correct option highlighted in solid yellow -- a full, unambiguous,
human-verified key for all 25 questions across four subjects (Biochemistry,
Anatomy, Histology, Physiology). See `coverage/AZD-MSK-triage.md` for the full
per-question recovery. This is the same "answer keys hide in highlights; textLayer
lies" hazard already logged for the Kasr PDF corpus -- confirmed again here on a
different university's material.

## The reference/admin tier -- Student Guide + shared university PDFs

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| Year 1/00 Administration/Program Guides/Student Guide - Year 1 - 2025-2026.pdf | 50 | 8099 | 4 | 0 |
| 00 University Administration/02 Academic Advising/Academic Advising - Years 1-3.pdf | 26 | 4421 | 0 | 0 |
| 00 University Administration/03 Program Documents/Integrated Medicine Program - Visual Guide.pdf | 15 | 0 | 15 | 0 |
| Year 1/Semester 1/00 Administration/Schedules/Teaching Schedule - Semester 1 - 2025-2026.pdf | 14 | 4948 | 0 | 0 |
| Year 1/Semester 1/00 Administration/Schedules/Teaching Schedule - Semester 1 Official Materials - 2025-2026.pdf | 14 | 4806 | 0 | 0 |
| Year 1/Semester 1/00 Administration/Schedules/Teaching Schedule - Biomedical Science and Principles of Diseases and Drug Therapy - 2025-2026.pdf | 7 | 2550 | 0 | 0 |
| Year 1/Semester 1/01 Normal Human Body/00 Module-wide/01 University Material/Teaching Schedule - Normal Human Body - 2025-2026.pdf | 6 | 1429 | 0 | 0 |
| Year 1/Semester 2/00 Administration/Schedules/Teaching Schedule - Semester 2 - 2025-2026.pdf | 15 | 5739 | 0 | 0 |
| Year 1/Semester 2/00 Administration/Schedules/Teaching Schedule and Practical Groups - Semester 2 - 2025-2026.pdf | 15 | 4996 | 0 | 0 |

The Student Guide is genuinely native and load-bearing (its p.21 marks table is
`academic/AZD-Y1-modules.md`'s primary source) but is reference material, not
authored from directly. `Integrated Medicine Program - Visual Guide.pdf` is fully
image-based (15p, 0 words, all 15 garbled) -- a marketing/overview PDF, not a
priority OCR target. All schedule PDFs are genuinely native and readable but are
schedules, not exam content.

## OCR priority scans performed

None run in this pass. The one file worth an OCR scan under S1b's "OCR priority
scans only" instruction -- `حل امتحان السوماتيف موديول blood .pdf` ("solved
formative exam", Blood/`AZD-HBI`) -- was deferred in favour of triaging
`Formative exam with answers.pdf` (Musculoskeletal/`AZD-MSK`) first, because the
latter's yellow-highlight key was confirmed fully recoverable by a single render
pass with zero OCR cost, while the Blood file needs a genuine OCR pass (5p, only 15
native words) before its key can even be attempted. See
`coverage/AZD-Y1-priority-sources.md` for the recommended OCR order.
