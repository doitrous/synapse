# Alexandria University corpus — gap ledger (P0-C)

Lane P0-C, read-only against `/Users/doitrous/Desktop/Alexandria University/` (`y1/`, `y2/`,
`y3/`, `General Resources/`). No Chrome, no Telegram — this ledger is what the fetch lane
(§6 of `LANE-BRIEF.md`) works from. Nothing below was invented: every count comes from
`find`/`stat`/`shasum`/`pdfinfo`/`pdftotext`/`file`/`python3 zipfile` run directly against the
corpus, and every "book"/"native text"/"has a key" judgment against a specific module was
made by opening that file, not by pattern-matching its name alone.

## Method

- **Module** = the top-level `<CODE> - <name>` folder under `y1/`, `y2/`, `y3/` (23 of them,
  matching `academic/au-modules.md` exactly), plus four non-module containers this ledger
  also had to account for: `y2/EOY Exams`, `y3/EOY Exams`, `y3/Additional Curriculum`, and
  `General Resources/` at the corpus root.
- **Department** = the two-level path under the module (`<subject> / <department>`, e.g.
  `Musculoskeletal System / Anatomy`), which is what the corpus actually nests — a "subject"
  folder (the half of the module name before or after the `&`) containing the department
  folders (`Anatomy`, `Histology`, `Exams`, `General`, …). Files were counted recursively
  under each department regardless of how many `Dr_ X / topic / Boards` levels sit below it.
- **Category** by filename convention, checked against the corpus, not assumed: `Book` =
  starts `DPT BOOK -` and is not an atlas and not itself an MCQ set; `Atlas` = `DPT BOOK -`
  with "Atlas" in the name, or any filename with "Atlas" in it; `Slides` = `.pptx`/`.ppt`/
  `.ppsx` (including the mis-extensioned `.pptx_` — see Hazards); `MCQ` = starts `MCQs -`
  and is not tied to one sitting; `EOM` = starts `EOM -` (a written/mixed end-of-module
  paper); `EOMmcq` = starts `EOM MCQs -`; `EOY` = starts `EOY`; `Pract` = path contains
  `/Practical/` or filename contains "OSCE"; `Anki` = `.apkg`; everything else is `Other`
  (lecture handouts, tutor notes, mind maps, per-topic "book"-named files that turned out to
  be topical rather than complete — see below).
- **Distinct vs raw**: `Raw` is every file on disk in that row; `Distinct` collapses a file
  and its `<name> [from Alexandria University Updated]` twin to one record. All narrative
  counts in this ledger are **distinct** unless marked raw.
- **The duplicate-checksum check the brief asked for**: 1,426 files carry the `[from
  Alexandria University Updated]` marker; 1,334 of them pair by name with a non-marked
  twin (92 are marker-only, no plain counterpart — sampled and confirmed these are cases
  where the plain file's name has a trailing-space/typo difference, not a missing pair).
  A random sample of 20 paired files was hashed with `shasum -a 256`: **0 of 20 were
  byte-identical.** Every pair differs in file size by 1–8%, the "Updated" copy almost
  always slightly *smaller*. Spot-checking one pair (`Lipid Chemistry 2.pdf`, MED 102
  Biochemistry) found identical page count (2) and identical `Producer` metadata but
  different extracted text — the base file's OCR text was garbled-but-present, the
  "Updated" copy's text layer extracted empty. **This contradicts the brief's §5 assumption
  that duplicates are identical by content hash.** They are the same source document
  re-compressed or re-exported, not byte-for-byte copies — see Hazards.

## (i) Per-year summary

| Year | Modules on disk | Distinct files | Raw files | Dept. books (`DPT BOOK -`) | EOM papers | EOM MCQ sets | MCQ banks | Practical items | Lecture slide decks | Orientation/schedule files |
|---|---|---|---|---|---|---|---|---|---|---|
| Year 1 (`y1`) | 7 (2 empty: MED 101, UNI 107) | 427 | 740 | 0 | 8 | 5 | 35 | 34 | 44 | 0 |
| Year 2 (`y2`) | 5 modules + `EOY Exams` (2 EOY files, folded into this row's totals) | 1,488 | 2,337 | 5 | 23 | 51 | 234 | 107 | 128 | 0 |
| Year 3 (`y3`) | 9 modules + `EOY Exams` + `Additional Curriculum` (1 EOY file + 1 book, folded into this row's totals) | 365 | 537 | 6 | 10 | 5 | 48 | 15 | 37 | 0 |
| Root | `General Resources` | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **Total** | 27 folders counted | **2,281** | **3,615** | **11** | **41** | **61** | **317** | **156** | **209** | **0** |

(EOY papers themselves total 3 — 2 in `y2/EOY Exams`, 1 in `y3/EOY Exams` — and are folded
into each year's row above rather than broken out as their own column; see the per-module
tables below for exactly where they sit. Atlas/reference files total 9 (3 in y1, 6 in y2)
and `.apkg` Anki decks total 6, all in y2 (MED 201 x4, MED 203 x2) — both omitted from this
summary row for space, see (ii) for exact placement. Note the MED 203 pair is filed under
that module's `Pract` column below, not a separate Anki column, because both files sit in a
`.../Practical/Questions/Anki/` path and this ledger's categoriser matched "Practical" first
— they are Anki decks in substance regardless of which column counts them.)

Two things this table already shows that the per-module tables below make module-specific:

- **Zero orientation, syllabus, or exam-blueprint files exist anywhere in the corpus** — not
  one file across 2,281 distinct records matched "orientation" or "schedule" in its name or
  path (`grep -i` across the full file list). This is a corpus-wide absence, not a
  module-specific one; item (e) of the brief's five-signal test ("an orientation or
  syllabus that says what is examined") is **absent for every module without exception**.
  Compare Helwan's organisation summary, which has explicit schedules/orientation files for
  every module it covers — Alexandria has none. This is the single biggest cross-cutting
  gap and belongs on the fetch list for every module, not just the near-empty ones.
- **`DPT BOOK -`-prefixed department books are rare and unevenly spread**: 11 distinct across
  the whole corpus (Communication step-2 book; Professionalism book; GIT "General" book;
  Concept-2 Pathology + Pharmacology; Concept-3 Pathology + Pharmacology; Infection-1
  Microbiology + Parasitology + Pharmacology; Additional Curriculum's Community book). All
  of Year 1 (MED 102/103/105/106) and MED 201, MED 204, MED 301's General department, and
  every Year-3 near-empty module have **zero** `DPT BOOK -` files. Some of those gaps are
  filled by an unlabelled but genuine complete text (see Tier 1/2 detail below); most are
  filled only by scattered per-topic tutor notes.

## (ii) Per-(module, department) table

Counts are **distinct** files. `—` means zero. Columns: Book = `DPT BOOK -` (non-atlas,
non-MCQ); Atlas = atlas/reference plates; Slides = pptx/ppt/ppsx; MCQ = standing MCQ bank;
EOM = end-of-module written paper; EOMmcq = end-of-module MCQ paper; EOY = end-of-year
paper; Pract = practical/OSCE material; Anki = `.apkg` decks; Other = everything else
(the bulk of the corpus — per-topic lecture notes, tutor handouts, mind maps, revision
sheets, "board" exam-style long-answer sheets).

### MED 101 - Medical School Orientation  (y1)

*No files at all except a stray `.DS_Store` — see Tier list.*

### MED 102 - Foundation of Basic Medical Sciences & Medical Terminology  (y1)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Foundation of Basic Medical Sciences / Anatomy | 13 | 26 | — | — | — | 3 | — | — | — | 1 | — | 9 |
| Foundation of Basic Medical Sciences / Biochemistry | 45 | 85 | — | — | 2 | 8 | — | — | — | — | — | 35 |
| Foundation of Basic Medical Sciences / Embryology | 12 | 24 | — | — | — | — | — | — | — | — | — | 12 |
| Foundation of Basic Medical Sciences / Exams | 5 | 5 | — | — | — | — | 5 | — | — | — | — | — |
| Foundation of Basic Medical Sciences / General | 3 | 3 | — | — | — | — | — | 3 | — | — | — | — |
| Foundation of Basic Medical Sciences / Histology | 5 | 8 | — | — | — | — | — | — | — | — | — | 5 |
| Foundation of Basic Medical Sciences / Physiology | 1 | 1 | — | — | — | — | — | — | — | — | — | 1 |
| Foundation of Basic Medical Sciences / **Pathology (Genetics)** | **0** | 0 | — | — | — | — | — | — | — | — | — | — |
| Medical Terminology / Terminology | 8 | 12 | — | — | — | 6 | — | — | — | — | — | 2 |

*Pathology (Genetics) is a real folder in the tree with zero files — a skeleton gap, not a
naming quirk.* No `DPT BOOK -` anywhere in this module; however `Medical Terminology /
Terminology / General / terminology book final.pdf` (38pp, native text) is an unlabelled but
genuine complete text for that subject — a real (a)-signal, just not named per convention.
Physiology has exactly 1 file total — effectively unusable as a department. No EOM paper
carries an explicit answer-key marker in its filename; all 5 in `Exams` are
"unknown — needs the manifest probe."

### MED 103 - Blood and Immune System & Medical Terminology  (y1)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Blood and Immune System / **Anatomy** | **0** | 0 | — | — | — | — | — | — | — | — | — | — |
| Blood and Immune System / Biochemistry | 17 | 32 | — | — | — | 2 | — | — | — | — | — | 15 |
| Blood and Immune System / Exams | 3 | 3 | — | — | — | — | 3 | — | — | — | — | — |
| Blood and Immune System / General | 3 | 5 | — | — | — | 3 | — | — | — | — | — | — |
| Blood and Immune System / Histology | 6 | 8 | — | — | — | — | — | — | — | 2 | — | 4 |
| Blood and Immune System / Physiology | 5 | 7 | — | — | — | — | — | — | — | 5 | — | — |
| **Medical Terminology / (no department subfolder at all)** | **0** | 0 | — | — | — | — | — | — | — | — | — | — |

*Anatomy is an empty skeleton folder — Blood/Immune anatomy content does not exist in this
corpus at all.* **The `Medical Terminology` subject folder for MED 103 is entirely empty —
not even a department subfolder exists under it**, unlike MED 102's `Medical Terminology /
Terminology` which does have 8 files. MED 103 is the only module where half the module name
(its own Medical Terminology component) has literally nothing behind it. No `DPT BOOK -`,
no lecture slides, in the entire module. The 3 EOM papers have no explicit key marker —
unknown.

### MED 105 - Musculoskeletal System & Communication and Basic Clinical Skills (1)  (y1)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Communication and Basic Clinical Skills (1) / Communication | 5 | 5 | — | — | 4 | — | — | — | — | — | — | 1 |
| Musculoskeletal System / Anatomy | 87 | 153 | — | 2 | 12 | 4 | — | 1 | — | 3 | — | 65 |
| Musculoskeletal System / **Biochemistry** | **0** | 0 | — | — | — | — | — | — | — | — | — | — |
| Musculoskeletal System / General | 4 | 4 | — | — | — | 2 | — | — | — | — | — | 2 |
| Musculoskeletal System / Histology | 21 | 34 | — | — | 5 | 1 | — | — | — | 4 | — | 11 |
| Musculoskeletal System / Physiology | 24 | 45 | — | — | 2 | 1 | — | — | — | 3 | — | 18 |

*Biochemistry is an empty skeleton folder.* No `DPT BOOK -` anywhere; but
`Dr_ Gawad book.pdf` (Physiology, 40pp) and `Dr_ Aliaa book.pdf` (Physiology, 27pp) are
unlabelled complete-ish texts scoped to MSK physiology specifically — real substance, not
full-department in scope (they don't cover Anatomy/Histology). No EOM paper in this module
at all — no exam paper to check for a key.

### MED 106 - Cardiorespiratory System & Communication and Basic Clinical Skills (2)  (y1)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cardiorespiratory System / Anatomy | 11 | 13 | — | 1 | 9 | — | — | — | — | 1 | — | — |
| Cardiorespiratory System / Anatomy and Embryology | 22 | 43 | — | — | — | — | — | — | — | — | — | 22 |
| Cardiorespiratory System / Biochemistry | 14 | 25 | — | — | 1 | — | — | — | — | 4 | — | 9 |
| Cardiorespiratory System / General | 5 | 8 | — | — | — | 5 | — | — | — | — | — | — |
| Cardiorespiratory System / Histology | 11 | 21 | — | — | 1 | — | — | — | — | 3 | — | 7 |
| Cardiorespiratory System / Physiology | 80 | 149 | — | — | 4 | — | — | — | — | 8 | — | 68 |
| Communication and Basic Clinical Skills (2) / Clinical Skills | 15 | 18 | — | — | 4 | — | — | — | — | — | — | 11 |

*"Anatomy" and "Anatomy and Embryology" are separate sibling folders with different content
— see Hazards; a query for one alone will miss the other.* No `DPT BOOK -`. **No EOM/EOY
paper anywhere in this module** — MED 106 has zero exam papers of any kind on disk.
`Skill lab book first year final edition.pdf` (Clinical Skills, 44pp, native) is a genuine
complete substitute text for the Communication/Clinical Skills half of the module.

### UNI 104 - English  (y1)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| General / English | 2 | 3 | — | — | — | — | — | 1 | — | — | — | 1 |

Non-medical — see out-of-scope table (iv). `English Book.PDF` (unlabelled but a genuine
complete text) plus one EOM MCQ paper.

### UNI 107 - Social Issues  (y1)

*No files at all — see out-of-scope table (iv) and Tier list.*

### y2/EOY Exams (year-level, not a module)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| General | 2 | 2 | — | — | — | — | — | — | 2 | — | — | — |

Both files are `.docx` (`EOY - 2nd Year Exams.docx`, `EOY - Histology practical Exams 1st &
2nd years.docx`) — student-made lists/notes about what came up, not exam papers themselves.
This is the entire EOY presence for the whole of Year 2.

### MED 201 - Endocrine and Genitourinary Systems & Communication and Basic Clinical Skills (3)  (y2)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Communication and Basic Clinical Skills (3) / Communication | 7 | 7 | 1 | — | 2 | 1 | — | 1 | — | — | — | 2 |
| Endocrine and Genitourinary Systems / Anatomy | 3 | 3 | — | — | — | 3 | — | — | — | — | — | — |
| Endocrine and Genitourinary Systems / Anatomy and Embryology | 94 | 153 | — | 3 | 13 | 15 | — | — | — | — | — | 63 |
| Endocrine and Genitourinary Systems / Biochemistry | 34 | 51 | — | — | 11 | 7 | — | — | — | 4 | — | 12 |
| Endocrine and Genitourinary Systems / Exams | 3 | 3 | — | — | — | — | 3 | — | — | — | — | — |
| Endocrine and Genitourinary Systems / General | 15 | 22 | — | — | — | 7 | — | 4 | — | — | 4 | — |
| Endocrine and Genitourinary Systems / Histology | 50 | 84 | — | — | 6 | 5 | — | — | — | 7 | — | 32 |
| Endocrine and Genitourinary Systems / Physiology | 167 | 271 | — | — | 2 | 33 | — | 8 | — | 15 | — | 109 |

Best-covered module in the corpus by volume (373 distinct files). `DPT BOOK - Step 2
Communication 2024-2025.pdf` covers Communication only. Anatomy/Physiology rely on
per-topic "book"-named tutor notes (Endocrine/Genital/Urinary split, several different
tutors) rather than one department text — real content, fragmented. 4 `.apkg` Anki decks
present (Endocrine/Genital/Urinary/a combined "Medicine School 2nd Year" deck) — a resource
type outside the brief's five-signal list worth flagging to the content lane. The 3 EOM
papers (`Exams`) carry cohort/stream labels (EGU END 2028 وافدين/مصريين) but no explicit
answer-key marker — unknown.

### MED 202 - Gastrointestinal System and Nutrition & Communication and Basic Clinical Skills (4)  (y2)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Communication and Basic Clinical Skills (4) / Clinical Skills | 14 | 22 | — | — | — | 2 | — | — | — | — | — | 12 |
| Gastrointestinal System and Nutrition / **Anatomy** | **0** | 0 | — | — | — | — | — | — | — | — | — | — |
| Gastrointestinal System and Nutrition / Anatomy and Embryology | 135 | 226 | — | 1 | 7 | 16 | — | — | — | 4 | — | 107 |
| Gastrointestinal System and Nutrition / Biochemistry | 32 | 46 | — | — | — | 5 | — | — | — | 3 | — | 24 |
| Gastrointestinal System and Nutrition / Exams | 7 | 11 | — | — | — | — | 7 | — | — | — | — | — |
| Gastrointestinal System and Nutrition / General | 26 | 36 | 1 | — | — | 17 | — | 6 | — | — | — | 2 |
| Gastrointestinal System and Nutrition / Histology | 31 | 52 | — | — | — | 5 | — | — | — | 2 | — | 24 |
| Gastrointestinal System and Nutrition / Physiology | 104 | 179 | — | — | 8 | 11 | — | — | — | 3 | — | 82 |

*Anatomy is an empty sibling of the populated "Anatomy and Embryology" — same hazard
pattern as MED 106/201/203.* `General` holds the one `DPT BOOK -` plus a 64MB
`Histology practical GIT book.pdf` (image-heavy practical atlas, not checked page-by-page
but clearly substantial). 7 EOM papers exist; 2 explicitly say "with answers" (`GIT
formative alex with answers`, `Mock with answers`) and 1 is explicitly formative
(`Formative Exam (24-25)`) — the rest are unknown. Cohort labels present: 2028, 2029,
23-24, 24-25.

### MED 203 - Nervous System & Professionalism, Medical Law and Ethics  (y2)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nervous System / Anatomy | 26 | 35 | — | 1 | 9 | 8 | — | — | — | 6 | — | 2 |
| Nervous System / Anatomy and Embryology | 102 | 172 | — | 1 | 11 | — | — | — | — | — | — | 90 |
| Nervous System / Biochemistry | 5 | 7 | — | — | 1 | 2 | — | — | — | — | — | 2 |
| Nervous System / Exams | 5 | 7 | — | — | — | — | 4 | 1 | — | — | — | — |
| Nervous System / **Forensics and Toxicology** | **0** | 0 | — | — | — | — | — | — | — | — | — | — |
| Nervous System / General | 40 | 64 | — | — | — | 18 | — | 16 | — | 2 | — | 4 |
| Nervous System / Histology | 40 | 66 | — | — | 6 | 3 | — | — | — | 7 | — | 24 |
| Nervous System / Physiology | 162 | 254 | — | — | 31 | 13 | 1 | 3 | — | 14 | — | 100 |
| Professionalism, Medical Law and Ethics / Professionalism | 34 | 43 | 1 | — | 4 | 21 | — | 1 | — | — | — | 7 |

*Forensics and Toxicology is an empty skeleton — see the cross-cutting note below, this
folder is empty in all three modules that carry it.* 2 `.apkg` Anki decks (CNS Anatomy,
CNS Histology) in the Practical/Anki subfolder. Several EOM/EOM-MCQ files explicitly say
"answers"/"with answers"/"without answers" (Mock 2027, mock CNS) — a genuinely mixed
picture where some sittings are keyed and others (same mock, different copy) are not;
flagged unknown only for the plain-titled ones. Cohort label: 2027 (مصريين/وافدين).

### MED 204 - Concept of Health and Disease (1) & Professionalism, Medical Law and Ethics  (y2)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Concept of Health and Disease (1) / Exams | 4 | 4 | — | — | — | — | 4 | — | — | — | — | — |
| Concept of Health and Disease (1) / **Forensic and Toxicology** | **0** | 0 | — | — | — | — | — | — | — | — | — | — |
| Concept of Health and Disease (1) / General | 17 | 21 | — | — | — | 8 | — | 7 | — | 1 | — | 1 |
| Concept of Health and Disease (1) / Genetics | 32 | 48 | — | — | 2 | 4 | — | — | — | 2 | — | 24 |
| Concept of Health and Disease (1) / Pathology | 97 | 162 | — | — | 7 | 8 | — | — | — | 9 | — | 73 |
| Concept of Health and Disease (1) / Pharmacology | 77 | 100 | — | — | 8 | 6 | — | — | — | 10 | — | 53 |
| Professionalism, Medical Law and Ethics (no files found in MED 204's own copy of this subject) | 0 | 0 | | | | | | | | | | |

**No `DPT BOOK -` at all in this module** — the only Year-2 "Concept of Health and Disease"
module without one (Concept 2 and Concept 3 both have Pathology + Pharmacology books;
Concept 1 has neither). Two EOM papers are explicitly labelled with stream + answer status
(`Concept 1 final 2023 Answers وافدين`, `answers مصريين`); the corresponding "questions"
files for both streams also exist — this is the clearest keyed pair in the whole y1/y2/y3
corpus outside MED 202/203.

### MED 205 - Concept of Health and Disease (2) & Professionalism, Medical Law and Ethics  (y2)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Concept of Health and Disease (2) / Exams | 4 | 5 | — | — | — | — | 4 | — | — | — | — | — |
| Concept of Health and Disease (2) / **Forensics and Toxicology** | **0** | 0 | — | — | — | — | — | — | — | — | — | — |
| Concept of Health and Disease (2) / General | 8 | 11 | — | — | — | 1 | — | 4 | — | 3 | — | — |
| Concept of Health and Disease (2) / Genetics | 8 | 10 | — | — | — | 1 | — | — | — | 4 | — | 3 |
| Concept of Health and Disease (2) / Pathology | 51 | 82 | 1 | — | — | 5 | — | — | — | 5 | — | 40 |
| Concept of Health and Disease (2) / Pharmacology | 52 | 78 | 1 | — | — | 9 | — | — | — | 6 | — | 36 |

Both Pathology and Pharmacology have `DPT BOOK -` texts. `Mock 28 Concept 2 answered.pdf`
and `... without answers.pdf` are an explicit keyed pair (cohort "28" = 2028). Forensics and
Toxicology is again an empty skeleton — the third and last of the three Year-2 modules that
carry this department, and the third time it is completely empty.

**Cross-cutting finding: Forensic Medicine and Toxicology has zero files anywhere in Year 2**,
despite the folder skeleton existing in all three modules that reference it (MED 203, 204,
205). Helwan's own summary lists a populated Forensic/Toxicology library for its Year-3
equivalent (FTF 304) — Alexandria's Year 2 has the folder and nothing in it.

### y3/Additional Curriculum (year-level container, not a module)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Community Medicine / General | 1 | 1 | 1 | — | — | — | — | — | — | — | — | — |

One file total: `DPT BOOK - Community.pdf`. No module ID owns this in `au-modules.md` —
flagged in the BLOCKED-adjacent note below, not actually blocking since it is small and
out of scope for this ledger's tier list either way.

### E 304 - Elective 1 / E 306 - Elective 2  (y3)

*No files at all in either — see out-of-scope table (iv).*

### y3/EOY Exams (year-level, not a module)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| General | 1 | 1 | — | — | — | — | — | — | 1 | — | — | — |

One file: `EOY - ESB EXAM JULY 2026.pdf`. This is the entire EOY presence for Year 3.

### MED 301 - Infection 1  (y3)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Infection 1 / **Community Medicine** | **0** | 0 | — | — | — | — | — | — | — | — | — | — |
| Infection 1 / General | 4 | 7 | — | — | — | — | 4 | — | — | — | — | — |
| Infection 1 / Microbiology | 97 | 142 | 1 | — | 11 | 16 | — | — | — | 3 | — | 66 |
| Infection 1 / Parasitology | 56 | 75 | 1 | — | 3 | 11 | 1 | 2 | — | 3 | — | 35 |
| Infection 1 / **Pathology** | **0** | 0 | — | — | — | — | — | — | — | — | — | — |
| Infection 1 / Pharmacology | 50 | 74 | 1 | — | 2 | 4 | — | — | — | — | — | 43 |

The best-covered module in Year 3 (207 distinct files) is still missing two of its six
department skeletons entirely (Community Medicine, Pathology). Microbiology, Parasitology
and Pharmacology each have their own `DPT BOOK -`. Parasitology has an explicit keyed pair:
`EOM MCQs - Parasitology infectious 1 Exam answers.pdf` / `... without answer.pdf` — one of
the clearest examples of a paired key+no-key set in the corpus.

### MED 302 - Infection 2  (y3) — TIER 1

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Infection 2 / Community Medicine | 0 | 0 | | | | | | | | | | |
| Infection 2 / General | 1 | 2 | — | — | — | — | — | — | — | — | — | 1 |
| Infection 2 / Microbiology | 0 | 0 | | | | | | | | | | |
| Infection 2 / Parasitology | 0 | 0 | | | | | | | | | | |
| Infection 2 / Pathology | 0 | 0 | | | | | | | | | | |
| Infection 2 / Pharmacology | 0 | 0 | | | | | | | | | | |
| Infection 2 / Tropical Medicine | 0 | 0 | | | | | | | | | | |

The full department skeleton exists (mirroring MED 301's six departments plus Tropical
Medicine) and every one of the six real departments is completely empty. The single file
present, `ID2 revision 2025-2026.pdf`, is a student revision note, not a teaching text, an
exam paper, or an MCQ bank. **This is a total module collapse**, not a partial gap.

### MED 303 - Concept of Health and Disease (3)  (y3)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Concept of Health and Disease (3) / General | 2 | 3 | — | — | — | 1 | 1 | — | — | — | — | — |
| Concept of Health and Disease (3) / Pathology | 65 | 108 | 1 | — | — | 14 | — | 2 | — | — | — | 48 |
| Concept of Health and Disease (3) / Pharmacology | 23 | 39 | 1 | — | — | 2 | — | — | — | — | — | 20 |

Both Pathology and Pharmacology have `DPT BOOK -` books, matching the Concept 2 pattern.
Only one EOM paper in the whole module (`EOM - C.3 Mock Exam.pdf`), no explicit key marker.
No lecture slides, no practical material, no atlas at all in this module.

### MED 305 - Medicine  (y3) — TIER 1

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| General / Internal Medicine | 19 | 23 | — | — | 12 | — | — | — | — | — | — | 7 |

By raw file count this is the brief's "23" module and file-count alone undersells it: four
of the "Other" files are unlabelled but genuine complete texts, verified by opening them —
`WAQF Clinical examination (IM I).pdf` (119pp), `WAQF Clinical methods-(IM).pdf` (57pp),
`.Clinical examination AFM book.pdf` (160pp), `.Clinical methods AFM book.pdf` (78pp), and
`Internal Medicine Basics modified.pdf` (198pp). Together these substantially cover
clinical-examination technique — a real (a)-signal, just filed as "Other" because none
carries the `DPT BOOK -` prefix. The 12 lecture slide decks (all native-text `.pptx`/`.ppt`,
confirmed by extracting slide XML) are a genuine substitute for topic coverage where no book
exists. **What is completely absent: any EOM/EOY exam paper, any MCQ bank, and any
orientation/schedule.** MED 305 has teaching material but zero assessment material of any
kind — the opposite gap profile from MED 302.

### MED 307 - Investigative Medicine  (y3) — TIER 1

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| General / Clinical Pathology | 2 | 2 | — | — | — | — | 1 | — | — | — | — | 1 |
| General / Radiology | 5 | 6 | — | — | 1 | — | 2 | — | — | — | — | 2 |

`WAQF Clinical pathology.pdf` (165pp, unlabelled but a genuine complete text) covers
Clinical Pathology reasonably well on its own — verified by opening it. Radiology has only
`Radio collection final.pdf` (14pp) and `Radiology key points..pdf` (5pp) plus one native
pptx — thin, not a substitute for a full department text. 3 EOM papers exist across the two
departments (`Clinical Pathology End & Practical of Rotations`, `Radiology End & Practical
of all rotations`, `Radiology exam 12,3,2026`) — none has an explicit answer-key marker in
its name; the last one's filename ("12,3,2026") reads like an actual sitting date rather
than a cohort label, but per the brief's rule that is a signal, not a confirmed sitting year,
until the paper's own header is read. No MCQ bank, no practical material, no orientation for
either department.

### MED 308 - Research  (y3) — TIER 1 (by file count; not by page volume — see note)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| General / Research | 13 | 19 | — | — | — | — | 1 | 1 | — | — | — | 11 |

MED 308 has the lowest file count of the "near-empty" tier (13 distinct) but, opened, is
the best-covered of the five by page volume: `.Research book.pdf` (60pp) and
`.Biostatistics book.pdf` (54pp) are genuine complete texts (verified — both are Word-export
PDFs with normal running text, not scans), and `1. Research method part 1 full
PowerPoint.pdf` (603pp) / `2. Biostatistics part 2 full PowerPoint.pdf` (309pp) are full
lecture-deck exports. **File count is a misleading signal for this module specifically** —
report it to the content lane as "thin on discrete files, not thin on teaching text." What
is genuinely missing: any MCQ bank, any practical material, and a confirmed answer key for
either of the two exam files present (`EOM - TMI Labs - Research Exam Smart Guide (2026
Edition).pdf`, `EOM MCQs - Research end of round by MCQs.pdf` — neither name says "answers").

### MED 309 - Surgery  (y3) — TIER 1

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| General / Surgery | 26 | 35 | — | — | 8 | — | — | — | — | 9 | — | 9 |

`Part 1 Surgery AFM book.pdf` (130pp, native text, verified) is a genuine teaching text —
but it is explicitly labelled "Part 1," implying a Part 2 (and possibly more) was never
supplied. 9 OSCE checklists exist under `الشاملة - Surgery OSCE/` (Swelling, Lipoma/
Sebaceous cyst, Ulcers, Thyroid, Hernia, Abdominal examinations, plus a general checklist
and an MCQ-style OSCE question set) — genuine practical/OSCE material, one of the
better-populated practical sets outside Year 1/2. **What is completely absent: any EOM/EOY
exam paper of any kind, any MCQ bank, and Part 2+ of the AFM book.**

### UNI 310 - Entrepreneurship / UNI 311 - Critical Thinking  (y3)

*No files at all in either — see out-of-scope table (iv).*

### General Resources (root, not a module)

| Department | Distinct | Raw | Book | Atlas | Slides | MCQ | EOM | EOMmcq | EOY | Pract | Anki | Other |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| University Regulations | 1 | 1 | — | — | — | — | — | — | — | — | — | 1 |

One file: `اللائحة الداخلية برنامج بكالوريوس الطب و الجراحة2023.pdf` (the 2023 internal
bylaws — same document `academic/bylaws-2023-extract.md` was built from). Not
module-specific; not on the fetch list.

## Cohort / sitting-year signals recorded

Per §5 of the brief, a four-digit number in a filename is the **graduating cohort**, not the
sitting year, and a stream marker is not a second year. Signals actually seen, by module
(sitting year itself is not recorded anywhere — no paper's header was read as part of this
ledger; that is the manifest lane's job):

| Module | Cohort labels seen | Academic-year labels seen | Stream markers seen |
|---|---|---|---|
| MED 102 | 2030 | — | مصريين (Egyptian), وافدين (wafdeen) |
| MED 103 | — (Egyptian/wafdeen labelled by name only, no year) | — | مصريين, وافدين |
| MED 201 | 2028 | — | مصريين, وافدين |
| MED 202 | 2028, 2029 | 23-24, 24-25 | — |
| MED 203 | 2027 | — | مصريين, وافدين |
| MED 204 | — | 2023 | مصريين, وافدين |
| MED 205 | 2028 ("Mock 28") | — | — |
| MED 301 | — | 2022, 2023 | — |
| MED 307 | a filename date "12,3,2026" (not a cohort — reads as an actual sitting date; unverified until the header is read) | — | — |
| MED 308 | 2026 ("Smart Guide (2026 Edition)"), 2028 ("WAQF Res PT1 Improved 2028") | — | — |
| MED 302, 305, 309 | none found | none found | none found |

## (iii) Telegram fetch list

Every row below is something this lane could not find in the corpus and cannot go and get
(§6 — only the orchestrator's fetch lane touches Telegram). "Why it matters" states the
content-authoring consequence, not just the absence.

### Tier 1 — empty or near-empty medical modules (module-level collapse)

| # | Module · department | What's needed | Why it matters |
|---|---|---|---|
| 1 | **MED 101** Medical School Orientation — entire module | Anything: the module folder has zero files (not even a `.DS_Store` with content). An orientation module with no orientation document is the sharpest version of the corpus-wide orientation gap. | No content lane can author a single concept, article, or question for MED 101 without a source. Currently 100% blocked. |
| 2 | **MED 302** Infection 2 — Community Medicine, Microbiology, Parasitology, Pathology, Pharmacology, Tropical Medicine (all six) | A department book or lecture set for each of the six departments; at minimum one EOM paper with key; one MCQ bank. Right now: 1 file, a revision note, in the whole module. | Infection 2 is a full taught module with a real folder skeleton and effectively nothing in it — the largest single content gap in the corpus by department count. |
| 3 | **MED 305** Medicine — exam material | An EOM/EOY paper (with key) and an MCQ bank for Internal Medicine. Teaching text is actually adequate (5 book-length PDFs found, see module note above) — the gap is assessment material only. | The manual's standing order is "concepts + articles first, questions second" but with zero exam papers there is nothing to derive question stems or difficulty calibration from, and no way to validate that authored concepts match what MED 305 actually examines. |
| 4 | **MED 307** Investigative Medicine — Radiology department specifically; answer keys for all 3 EOM papers | Radiology needs a real department text (currently 14pp + 5pp + one pptx); Clinical Pathology and Radiology both need confirmation of which of their EOM papers (if any) carry keys. | Radiology is one thin folder standing in for an entire discipline; Clinical Pathology is better served (165pp WAQF text) but its exam material is unverified. |
| 5 | **MED 308** Research — MCQ bank, practical material, and a confirmed key for either exam file present | Teaching text is good (book-length Research + Biostatistics texts, full lecture-deck exports) — the gap is entirely in assessment: no MCQ bank at all, no practical/data-interpretation exercises beyond the "Practice exercises" AFM handouts, and neither `EOM -` file states whether it carries a key. | Cannot build the question layer per the manual's floor (MCQ ≥ 46/50) from zero MCQ-bank source material — the two `EOM` items are single sittings, not a bank. |
| 6 | **MED 309** Surgery — any EOM/EOY paper, any MCQ bank, Part 2+ of the AFM book | Part 1 of the AFM surgery book exists (130pp) but is explicitly labelled Part 1 with no Part 2 anywhere in the corpus; OSCE checklists cover practical but there is zero written/MCQ assessment material. | Teaching text is half-complete by the source's own labelling, and there is no exam material of any kind to calibrate question difficulty or confirm exam scope. |

### Tier 2 — a department with slides but no book, or papers with no confirmed key

| # | Module · department | What's needed | Why it matters |
|---|---|---|---|
| 7 | **MED 106** Cardiorespiratory System & Communication and Basic Clinical Skills (2) — entire module | Any EOM/EOY paper. Zero exam papers exist anywhere in this module (the only Year-1 medical module with that gap). | Same "no assessment source" problem as MED 305/308/309 but in Year 1, where the manual's floor still applies. |
| 8 | **MED 103** Blood/Immune — Anatomy department, and the entire **Medical Terminology** subject (no department subfolder exists at all) | A department text or lecture set for Blood/Immune anatomy, and any Medical Terminology material for MED 103 specifically (MED 102's own Medical Terminology component does have a book — MED 103's does not, and has no subfolder to put one in). | Without it, Blood/Immune anatomy concepts have no source at all; Medical Terminology content for MED 103 would have to either borrow MED 102's terminology book wholesale or go unauthored. |
| 9 | **MED 105** Musculoskeletal — Biochemistry department | Same as above for MSK Biochemistry — zero files in an otherwise well-covered module. | Same authoring blocker, narrower scope. |
| 10 | **MED 102** Foundation — Pathology (Genetics) department | Zero files; the module otherwise has reasonable Anatomy/Biochemistry/Histology coverage. | Genetics pathology at foundation level has no source at all in y1. |
| 11 | **MED 301** Infection 1 — Community Medicine and Pathology departments | Both are empty skeletons in an otherwise strong module (207 distinct files across the other four departments). | Two of six departments in the corpus's best-covered Year-3 module are completely dark. |
| 12 | **MED 203 / MED 204 / MED 205** — Forensics and Toxicology (all three; same department name, same emptiness, in all three Year-2 modules that carry it) | Any Forensic Medicine/Toxicology teaching or exam material for Year 2. | This is the same empty folder recurring three times — worth fetching once and populating all three, not chasing separately. Confirmed zero files in all three; Helwan's own corpus has populated Forensic/Toxicology material for comparison. |
| 13 | Every module, all years — **orientation/syllabus documents** | A module orientation, schedule, or "what is examined" statement. Zero exist anywhere in 2,281 distinct files. | Per the manual and the 104-CPS worked example, the orientation file is "the module's own statement of how it is examined and the most load-bearing document in the corpus" — Alexandria has none, for any module. This is the single highest-value, lowest-file-count fetch item on this whole list. |
| 14 | EOM papers without a confirmed key, across essentially all of y1 and y3 (y2 has a mixed but partially-keyed picture — see per-module notes) | Confirmation, per paper, of whether an answer key exists (separate file, highlight, or embedded) — 38 EOM + 3 EOY papers total, only a handful of which say "answers"/"without answers" in their own filename. | The manual's decision procedure for recovering a key only applies once a paper is confirmed to need one; right now most Year-1/Year-3 EOM papers are simply unknown, and a question batch cannot cite a key that was never verified to exist. |

### Tier 3 — nice-to-have (extra sittings, practical banks, atlases)

| # | Item | Why it matters (lower priority) |
|---|---|---|
| 15 | Additional sittings/cohorts for MED 102 (only cohort "2030" represented), MED 201 (only "2028"), MED 203 (only "2027") | More sittings improve question variety and cross-checking but the modules already have a working base. |
| 16 | Atlas/reference material beyond the 9 distinct atlas files found (all concentrated in MED 105/106/201/202/203 Anatomy) | Useful for image-referenced concepts but not blocking; every other Year-1/2/3 Anatomy department has none and still functions on lecture notes. |
| 17 | Practical/OSCE banks for modules with thin practical coverage (MED 103, MED 302, MED 305, MED 307, MED 308) | Lower priority than the exam-paper and book gaps above; practical content is supplementary to the concept/article/MCQ core the manual prioritises. |
| 18 | `.apkg` Anki decks — only 6 exist corpus-wide (MED 201 x4, MED 203 x2); more would help but are not a manual-recognised source type. | Anki decks are a nonstandard input; useful cross-check material, not required. |

## (iv) Out of scope for the medical library

Per `LANE-BRIEF.md` §1, these carry non-`MED` codes and are explicitly not part of the
medical content programme. Listed here so the fetch lane does not chase them.

| Module | Files (distinct) | Corpus state |
|---|---|---|
| UNI 104 - English | 2 | English Book + 1 EOM MCQ paper |
| UNI 107 - Social Issues | 0 | Empty |
| UNI 310 - Entrepreneurship | 0 | Empty |
| UNI 311 - Critical Thinking | 0 | Empty |
| E 304 - Elective 1 | 0 | Empty |
| E 306 - Elective 2 | 0 | Empty |

## (v) Hazards found

Recorded here so the manifest/intake lane does not have to rediscover any of these.

1. **Duplicate pairs are not byte-identical.** 20/20 sampled `X` / `X [from Alexandria
   University Updated]` pairs failed a `shasum -a 256` match (0 identical). Sizes differ by
   1–8%, consistently in the same direction (the "Updated" copy is usually smaller). One
   pair was opened and compared: identical page count and PDF producer, but different OCR
   text extraction outcome (base file: garbled-but-present text; "Updated" copy: empty text
   layer). **A later lane must dedupe by page count + extracted-text comparison, not
   checksum**, and should keep whichever copy of a pair actually yields usable text rather
   than assuming they are interchangeable.
2. **92 files carry the "Updated" marker with no plain-name counterpart in the same folder.**
   Spot-checked: these are not orphans — the "missing" counterpart exists but differs by a
   trailing space or minor punctuation in its name (e.g. `MCQs - Prof Mcq Ch 1-20 .pdf` vs
   `MCQs - Prof Mcq Ch 1-20  [from Alexandria University Updated].pdf`). A strict
   string-match dedupe will undercount; a later lane needs fuzzy (whitespace/punctuation
   -insensitive) matching.
3. **Sibling folders with overlapping scope, one populated and one empty or thin.** "Anatomy"
   vs "Anatomy and Embryology" exist as separate department folders under the same subject
   in MED 106 (Anatomy=11 files, Anatomy and Embryology=22), MED 201 (Anatomy=3,
   Anatomy and Embryology=94), MED 202 (Anatomy=**0**, Anatomy and Embryology=135), and
   MED 203 (Anatomy=26, Anatomy and Embryology=102). A tool or lane that queries only
   "Anatomy" will silently miss most of the content in three of these four modules and all
   of it in MED 202.
4. **Odd extensions are genuine, mangled-only.** No zero-byte files exist anywhere in the
   corpus. `file` confirms: 28 files ending `.pdf_`, 2 ending `.pd`, 2 ending `.df`, and 1
   ending `.pptx_` are ordinary PDF/PPTX documents with a truncated or corrupted extension
   (verified with `file` — e.g. "PDF document, version 1.5, 26 pages"). They will fail any
   `*.pdf` glob and need to be picked up by content-sniffing, not extension matching.
5. **Numbered files with no extension at all are genuine per-page/segment PDFs.** 60+ files
   named like `Board Aliaa lec.1` … `.15` or `Lec.7` … `.13` (MED 201 Physiology/Anatomy,
   MED 202 Physiology "Boards" folders) carry no extension whatsoever but are individually
   valid PDF documents (confirmed with `file`), some as large as 54MB for a single page —
   large embedded phone-photo images rather than scanned multi-page documents. These will
   not be found by any `*.pdf`/`*.pptx` glob.
6. **`.apkg` Anki decks (6 total) and one `.doc`/one `.xlsx` exist outside the five
   recognised source types** (book, slides, MCQ bank, EOM/EOY paper, practical/atlas). Anki
   decks in particular carry real MCQ-equivalent content (verified present in MED 201 and
   MED 203) that the standard PDF/PPTX pipeline will not touch.
7. **Legacy `.ppt` binary files (23 total) were not individually verified for native text**
   — `strings` on macOS lacks the `-e` flag needed to check UTF-16LE runs directly; per the
   brief's own instruction (§5) these must go through `libreoffice --headless --convert-to
   pdf` or `python-pptx`-equivalent extraction rather than being read by hand, and this
   ledger did not do that conversion for all 23. All 186 modern `.pptx` files sampled (15 at
   random, spread across 6 modules) *were* verified to carry substantial native slide text
   (55–305 characters/slide average) via direct `zipfile`/XML inspection — the corpus's
   slide decks are not scanned images.
8. **Zero orientation/schedule files anywhere** (see per-year summary) — flagged as a hazard
   as well as a fetch item because a lane building a module subject tree or assessment
   blueprint (`01-subjects-and-topics.md`) will otherwise assume this data exists somewhere
   in the corpus and waste time searching for it.
9. **`y3/Additional Curriculum/Community Medicine` and `y2/y3 EOY Exams` are year-level
   containers, not modules**, and have no `module_id` in `academic/au-modules.md`. This
   ledger counted them separately (not folded into any MED module) so their file counts are
   not silently lost, but a later lane should not try to file their content under a MED
   code that doesn't own it — flag to the orchestrator for a decision on where the single
   `DPT BOOK - Community.pdf` and the 3 EOY files belong before authoring against them.
10. **Egyptian/wafdeen stream markers and cohort-year labels are inconsistently applied.**
    Some EOM pairs label both stream and cohort (`EOM - EGU END 2028 (وافدين).pdf`), others
    label only stream with no year, others only a bare "Mock" with no signal at all. A
    manifest probe cannot assume every paper carries enough metadata in its filename alone
    to resolve sitting year or stream — most will need their own header read.

## BLOCKED

None. The corpus layout matches the brief closely enough to complete this ledger without
escalation — the only deviations found (MED 101 truly empty, Forensics/Toxicology empty in
three modules, MED 302 a near-total collapse, duplicate pairs not byte-identical) are gap
findings this ledger exists to report, not contradictions that require a decision before
proceeding.

## Report

```
LANE: P0-C (gap ledger)
SCOPE: whole Alexandria University corpus (y1, y2, y3, General Resources) · read-only · no Telegram
OUTPUT: docs/Alexandria-Source-Imports/coverage/00-gap-ledger.md
COUNTS: 3,615 raw files / 2,281 distinct files across 23 modules + 4 non-module containers.
  0 zero-byte files. 0/20 sampled duplicate pairs were byte-identical (0% — see Hazards #1).
  11 distinct DPT BOOK- files, 41 EOM papers, 61 EOM MCQ papers, 3 EOY papers, 317 MCQ banks,
  209 lecture slide decks, 9 atlas/reference files, 6 .apkg Anki decks (4 tagged separately,
  2 filed under Practical — see per-year note), 156 practical items, 0 orientation files.
  This is a coverage/gap document, not an authored batch — no medical:batch/simulate/audit
  gates apply (nothing here is concept/article/question content).
OWED: 18 Tier 1-3 fetch-list rows handed to the Telegram fetch lane (§6); the manifest lane
  owes answer-key confirmation for ~35 EOM/EOY papers marked "unknown" in this ledger; the
  orchestrator owes a decision on where Additional Curriculum/Community Medicine and the
  two EOY-Exams containers file against `academic/au-modules.md` (no module_id currently
  owns them).
HAZARDS: 10 items in §(v) above — duplicate pairs not byte-identical; 92 "Updated" files with
  no exact-name counterpart; Anatomy/Anatomy-and-Embryology sibling-folder split in 4
  modules; mangled extensions (.pdf_, .pd, .df, .pptx_) and extensionless numbered PDFs that
  will not glob-match; .apkg/.doc/.xlsx outside the five recognised source types; 23
  unverified legacy .ppt files; zero orientation files corpus-wide; two year-level
  containers with no module_id; inconsistent cohort/stream labelling in filenames.
BLOCKED: none
```
