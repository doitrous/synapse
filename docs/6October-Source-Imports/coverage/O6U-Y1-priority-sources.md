# 6 October University Year 1 -- priority source set (S2)

Scope: the seven Desktop module folders mapped in `academic/O6U-Y1-modules.md`
(`IBS-IBF` -> `O6U-IBS-101`+`O6U-IBF-102`, `IHI-HID` -> `O6U-IHI-103`, `IMI-MBI` ->
`O6U-IMB-104`, `MEN-IMN` -> `O6U-IMN-105`, `MIP` -> `O6U-IMP-106`, `GMD` ->
`O6U-IPA-107`, `DRG` -> `O6U-IPH-108`). `SKL`/`PRF`/`ELE` components have no Desktop
material at all -- needs Omar sources. Tier order follows the faculty's own
Priority 4 selection rule (papers first, then department/practical files, then
comprehensive banks, then narrower notes/case sets). Readability is from
`coverage/O6U-Y1-readability-index.md` (pages / native word count / garbled page
count). **Note on this corpus**: unlike a typical Desktop tree, every module folder
here holds exactly 4 pre-curated files (the prior local `Year 1 Priority 4.md`
pass already applied a 4-resource cap per module) -- there is no larger uncurated
pool sitting behind these files on Desktop.

## O6U-IBS-101 + O6U-IBF-102 (`IBS-IBF` folder)

| Tier | Source | Readability |
|--:|---|---|
| 1 | `mid module BOS 101 module 1 october.pdf` | 9p / 1106 words, 0 garbled -- **fully native, fully keyed**: Moodle quiz-export format states "`<pct>`% of respondents (`<n>` of `<total>`) answered this question correctly" per question, and one answer option's printed vote count equals `<n>` -- see `coverage/O6U-IBS-IBF-triage.md`. 25 questions, all recoverable. |
| 1 | `mid module BOS 101 module 2.pdf` | 9p / 1142 words, 0 garbled -- same Moodle-export format, 25 questions (largely the same question pool re-sat by a different cohort; one printed-key conflict at Q6, see triage doc). |
| 1 | `BOS final exam 20-21 (o6u bot).PDF` | 29p, fully garbled (0 words) -- OCR'd in full, triaged 2026-09-02: **no printed key**. It is one respondent's ("Ahmed's") own completed MS-Forms exam attempt, not a graded/official key -- at least 3 of the respondent's own marked answers are demonstrably wrong (primary-structure bond, mast-cell/anaphylaxis, phagocytosis-vs-facilitated-diffusion). Chief-of-staff ruling: do not author from it, do not invent editorial keys. Full inventory: `coverage/O6U-IBS-IBF-triage.md` §"BOS final exam". |
| 1 | `mid module BOS 4.pdf` | 5p, fully garbled (0 words) -- needs OCR, not yet triaged. |

## O6U-IPA-107 (`GMD` folder)

| Tier | Source | Readability |
|--:|---|---|
| 3 | `Pathology Q Bank.pdf` | 401p / 13,301 words, 0 garbled -- the single largest fully-native source in the whole corpus. Triaged and authored 2026-09-02: printed keys exist only in its 6 chapter-ending "True or False" sections (pages 246-248, 279-280, 299, 399-401 -- 9 of 401 pages, ~90 statements), each printing its own inline `( true )`/`( false )` answer, all independently cross-checked against fact. 40/~90 authored as single-best-answer questions (seed contract requires 4-5 options, so each T/F statement was recast with 3 author-constructed distractors around the one printed-key fact); 24 new concepts + 6 new articles minted, only 1 genuine reuse hit found (Kasr `208-INT` anaplasia, cross-year) despite the coordinator's steer toward `104-CPS`/`108-INT`/ASU-INF overlaps. The 392-page "choose the correct answer" MCQ portion between chapters remains unkeyed and unauthored. See `coverage/O6U-IPA-107-triage.md`. |
| 2 | `Practical & Oral patho (O6U bot).pdf` | 20p, fully garbled -- needs OCR. |
| 4 | `haemodynamic- رباب.pdf` | 7p, fully garbled -- needs OCR. |
| 4 | `neoplasia- رباب.pdf` | 9p, fully garbled -- needs OCR. |

## O6U-IPH-108 (`DRG` folder)

| Tier | Source | Readability |
|--:|---|---|
| 2 | `فارما د عبد المتعال 1.pdf` (dept book pt.1) | 123p / 28,350 words, 7 garbled -- dept book, not an exam/bank; not yet reviewed for question content. |
| 2 | `فارما د عبد المتعال 2.pdf` (dept book pt.2) | 156p / 33,698 words, 10 garbled -- same. |
| 3 | `pharma MCQs bank .pdf` | 223p, mostly garbled (208/223) -- needs OCR before use. |
| 2 | `all Practical pharma questions _compressed.pdf` | 246p, almost entirely garbled (244/246) -- needs OCR before use. |

## O6U-IMP-106 (`MIP` folder)

| Tier | Source | Readability |
|--:|---|---|
| 3 | `Micro q bank.pdf` | 251p / 7,046 words, 0 garbled -- second-largest native bank in the corpus, but a scan for `answer`/`correct`/T-F markers found only 16 hits across 251 pages -- printed keys look sparse, not absent; not yet triaged. |
| 1 | `Micro & Para MCQ Final 19..#Diaa (O6U bot)..pdf` | 19p, fully garbled -- needs OCR. |
| 3 | `Para QBANK.pdf` | 120p, fully garbled -- needs OCR. |
| 4 | `microbiology lectures mcqs updated .pdf` | 68p, fully garbled -- needs OCR. |

## O6U-IHI-103 (`IHI-HID` folder)

| Tier | Source | Readability |
|--:|---|---|
| 4 | `5- Blood. Dr.Ahmad.Alarabi. 2016-2017 .pdf` | 42p / 8,925 words, 0 garbled -- department-staff physiology notes, not a keyed question set. |
| 3 | `HID Physiology MCQ #Diaa (O6U Med Bot).pdf` | 16p, fully garbled -- needs OCR. |
| 3 | `Histology MCQ HID.pdf` | 7p / 573 words, 0 garbled -- triaged and authored 2026-09-02: page 7 prints a plain "Key answer" table for all 22 questions, cross-checked with no contradictions found (`pagetext.mjs keys`' 6 "red-text" hits on this file were a false positive from a page-footer-attribution bug in `pdf_visual_keys.py`, unrelated to the real key). 22/22 authored, 0 held. See `coverage/O6U-IHI-103-triage.md`. |
| 1 | `HID Quiz & Mid Module 2019(O6U Med Bot).docx` | Not covered by the PDF readability indexer (`.docx`); not yet opened. |

## O6U-IMB-104 (`IMI-MBI` folder)

| Tier | Source | Readability |
|--:|---|---|
| 3 | `Bio questions.pdf` | 25p / 75 words, 0 garbled -- very low native word count for 25 pages despite "not garbled"; likely image-heavy MCQ layout, needs a visual check before trusting the "clean" reading. |
| 3 | `CYTOGENETICS MCQ UNIT 1.pdf` | 7p, fully garbled -- needs OCR. |
| 1 | `MBI final exam.pdf` | 6p / 18 words, 0 garbled -- same image-heavy caveat as `Bio questions.pdf`. |
| 4 | `Strange terms and important notes in MBI module.pdf` | 6p / 412 words, 0 garbled -- small notes set. |

## O6U-IMN-105 (`MEN-IMN` folder)

| Tier | Source | Readability |
|--:|---|---|
| 1 | `Collection of Final meta Exams ( O6U).pdf` | 12p, fully garbled -- needs OCR. |
| 1 | `Metabolism mid exam -_-20-21 #Diaa (O6U bot)(2).pdf` | 15p / 122 words, 0 garbled -- mostly sparse text, needs a closer read to see if it is genuinely native or another image-heavy layout. |
| 3 | `Metabolism MCQ+20-21 #Diaa (O6U).pdf` | 10p, fully garbled -- needs OCR. |
| 4 | `Metabolism cases ++ Ro Tele.pdf` | 3p, fully garbled -- needs OCR. |

## Recommended next-triage order

1. `O6U-IPA-107` -- `Pathology Q Bank.pdf`'s six T/F sections (9 pages total, keys
   printed inline) are the next cheapest fully-keyed win after the module chosen
   for S3 below; the 392-page MCQ portion needs a different key-recovery method
   (OCR of a colour/bold cue, or an external key) before it is worth reading.
2. `O6U-IHI-103` -- `Histology MCQ HID.pdf` (7p, 0 garbled, small) and the `.docx`
   quiz once opened.
3. OCR budget: `Micro & Para MCQ Final 19` (MIP final exam, 19p) and `BOS final
   exam 20-21` (IBS-IBF final exam, 29p) are the two real final-exam papers in the
   whole corpus and are both fully scanned -- highest-value OCR targets once
   authoring moves past S1 triage.
4. `Bio questions.pdf` / `MBI final exam.pdf` (IMB-104) and `Metabolism mid exam
   (2).pdf` (IMN-105) need a visual page check (not just the word-count heuristic)
   before they can be trusted as "clean" -- their word counts are too low for their
   page counts to be ordinary printed text.
