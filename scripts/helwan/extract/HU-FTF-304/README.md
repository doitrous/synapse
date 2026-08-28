# HU-FTF-304 extraction notes

`mcq-bank.json` — every MCQ and True/False item in `MCQs - Forensic & Toxo MCQ
by Dr. Shehab 2026 .pdf` (src_676bccfcde4ab3e021e6, 127 pages, native text
layer), parsed from a `pdftotext -layout` dump. 897 items, 843 with a recovered
answer key (94%). Each record carries `part`, `chapter` (the book's own chapter
title), `number` (in-chapter, MCQ and T/F share one running numbering per
chapter), `format` (`mcq` | `tf`), `stem`, `options` (MCQ only), `recovered_key`,
`page`, `quiz_assessed_chapter` (whether the department's quiz-mark-allocation
post names this chapter as tested), and a chapter-level `proposed_subject_placement`
— a first pass for the body-system re-filing law in `LANE-BRIEF.md`, to be
confirmed or overridden per item during concept authoring, not a final
placement.

The department book (`DPT BOOK - Toxo & Forensic Dep. Book.pdf`,
src_9a61c95602d771ad889a, OCR'd in full, cached at
`scripts/helwan/extract/pagetext/src_9a61c95602d771ad889a.json`) carries no
embedded MCQs of its own — its only lettered lines are classification lists
("A. Neurogenic shock", "B. ..."), confirmed by a full-text scan for
`Multiple Choice` / `MCQ` / four-way `A./B./C./D.` option runs, which returned
zero genuine question blocks. So "every MCQ … and any in-book questions" (the
brief's phrase) resolves to the Shehab bank alone for this module.

## Known parsing gaps

- **54 of 897 items have no recovered key.** The per-chapter "Answers" tables
  print 2–3 `Question / Answer` pairs per printed line, and a small number of
  lines still failed to match (mostly in Toxidromes, Asphyxia, Pesticides,
  Corrosives, General Toxicology, Thermal Injuries) — likely OCR/column
  artefacts from `pdftotext -layout` rather than genuinely unanswered
  questions in the source. Re-render and read by eye before authoring a
  question from one of these; do not guess the key.
- **Chapter attribution** comes from the running page footer
  (`Forensic|Toxicology <page> <Chapter Title>`), which appears once per
  printed page — so it is exact per page, and any question whose stem wraps
  across a page boundary is still attributed correctly (footer trails the
  content of the page it closes).
- **`proposed_subject_placement`** is a chapter default, not an item-level
  ruling — several chapters mix several eventual homes (Toxidromes: cholinergic
  → `mul`, sympathomimetic → `cvs`, anticholinergic → `neuro`; Medical
  Toxicology: drug class decides the organ). Read the field as "where most of
  this chapter's items will land", not as an audit-ready placement.
- The book's own chapter names differ slightly from the MCQ bank's shorter
  titles in a few places (dept book: "Medico Legal Aspects of Death/Wounds/
  Asphyxia/Sexual Assaults/Obstetrics"; MCQ bank: "Death/Wounds/Asphyxia/
  Sexual Assaults/Obstetrics"). `mcq-bank.json` keeps the MCQ bank's own
  chapter strings; `academic/FTF-304-structure.md` keeps the department book's
  fuller names as the tree's own node labels. Both name the same fourteen
  Forensic + seven examinable Toxicology chapters — cross-checked page by
  page, nothing renamed to force a match.

## Re-running the parse

The parser (`pdftotext -layout` → chapter/format state machine → per-chapter
answer-table join) is scratch work, not committed to `scripts/helwan/`, because
it is a one-off transform over one source file rather than a reusable module
tool. If it needs re-running, rebuild it from this description rather than
assuming a script survives outside the worktree's own scratchpad.
