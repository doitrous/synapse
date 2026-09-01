# Fayoum University — Year 1 source manifest (S0)

Generated 2026-09-02 from `/Users/doitrous/Desktop/Universities/Fayoum University/Faculty of Medicine/Year 1`
(Desktop tree only — nothing downloaded, nothing moved). Full per-file record:
[`y1-sources.json`](y1-sources.json).

**16 files, 16 distinct sha256 — zero exact-duplicate twins.** Every file sits inside a
`_Telegram FYM Bots` subfolder per module (already downloaded before Telegram fetching was
retired 2026-08-27; no new fetch was performed here). A companion note at
`Year 1/_Catalog/Year 1 Priority 4.md` (Omar's own prior selection pass, dated 2026-08-31)
independently confirms these same 16 files as the four-per-module priority set and reports
the same zero-duplicate result.

## Counts by module × kind

| Module | dept-book | practical | bank | paper | lecture | other | Files |
|---|--:|--:|--:|--:|--:|--:|--:|
| FU-NS101 (Normal Structure I) | 1 | 0 | 0 | 0 | 0 | 0 | 1 |
| FU-NS2 (Normal Structure II) | 1 | 0 | 0 | 0 | 1 | 0 | 2 |
| FU-NS-unconfirmed | 1 | 0 | 0 | 0 | 0 | 0 | 1 |
| FU-DM1 (Disease Mechanism I) | 1 | 0 | 0 | 0 | 0 | 0 | 1 |
| FU-DM2 (Disease Mechanism II) | 1 | 0 | 0 | 0 | 0 | 0 | 1 |
| FU-DM-unconfirmed | 1 | 0 | 1 | 0 | 0 | 0 | 2 |
| FU-MSK1 (Musculoskeletal I) | 1 | 1 | 0 | 0 | 0 | 0 | 2 |
| FU-MSK2 (Musculoskeletal II) | 1 | 1 | 0 | 0 | 0 | 0 | 2 |
| FU-NEURO1 (Neuroscience I) | 1 | 0 | 2 | 1 | 0 | 0 | 4 |
| **Total** | **9** | **2** | **3** | **1** | **1** | **0** | **16** |

## Tier distribution (tier ≤ 5: real exam papers → department files → notes → textbooks)

| Tier | Meaning (this lane) | Files |
|--:|---|--:|
| 1 | Real exam paper | 1 — `امتحانات فارما عملي.pdf` (scanned, currently unreadable) |
| 2 | Department-authored file (book/practical/keyed bank) | 13 |
| 3 | Notes / supplementary handout / unkeyed bank | 2 — `هستو (1).pdf`, `7- Physiology MCQ of Autonomic Nervous System.pdf` |
| 4 | Third-party textbook/bank excerpt (not Fayoum-authored) | 1 — `10 Anatomy MCQs Head & neck.pdf` |
| 5 | Other | 0 |

## Readability at a glance (see `coverage/FU-Y1-readability-index.md` for the full per-file table)

- **14 native-text files** — clean `pdftotext -layout` extraction.
- **1 native-but-garbled file** — `10 Anatomy MCQs Head & neck.pdf` (broken word-spacing from
  the source scan; a per-question single-letter answer key survives inline despite the
  garbling).
- **1 scanned, not yet OCR'd** — `_physiology of normal structure module 2023.pdf` (dept
  book, not a priority exam paper/bank, so left un-OCR'd per S1b scope).
- **1 scanned, OCR attempted and failed** — `امتحانات فارما عملي.pdf` (tesseract at 300dpi,
  psm 6/4, returns 0 or non-language garbage words on all 15 pages).

## Flags for Omar / the triage checkpoint

- `10 Anatomy MCQs Head & neck.pdf` is a scanned excerpt of a **third-party commercial**
  question bank ("Gross Anatomy & Embryology: 2000 Multiple-Choice Questions & Answers",
  Biotest Inc., copyright 1999) distributed through the Telegram bot, not Fayoum-authored.
  It also mixes chapters: the sampled early pages (1–4) are Abdomen/GI-autonomic questions
  plus a "GROSS ANATOMY: THORAX" chapter header — out of Neuroscience scope — while sampled
  pages 20 and 30 are genuine Head & Neck / cranial-nerve content, in scope. **Needs an Omar
  ruling before any authoring touches it**, both on the copyright question and on where the
  in-scope page range actually starts and ends.
- Two files could not be confidently placed as Disease Mechanism I vs II from their own text
  (`Para department book .pdf`, `Important Q.pdf`) — logged as `FU-DM-unconfirmed`, see
  `academic/FU-Y1-modules.md`.
- One file could not be confidently placed as Normal Structure I vs II
  (`_physiology of normal structure module 2023.pdf`, scanned and unread) — logged as
  `FU-NS-unconfirmed`.
