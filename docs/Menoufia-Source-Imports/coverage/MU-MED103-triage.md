# MU-MED103 (Communication Skills / Vertical Integration 1) — lane-1 triage

## Tier-1 inventory sampled

MED103's local corpus is 11 files (per `docs/Menoufia-Source-Imports/CLAUDE-HANDOVER.md`), all under
`Family Medicine/`:

| Sub-folder | File | Kind | Text layer | Disposition |
|---|---|---|---|---|
| 03 Questions and QBank | Telegram 11687 - MCQ - Dr Mahmoud Attia.pdf (9p) | 25 SBA-format MCQs (Q1-25) + 44-item True/False block | none (CamScanner scan) — OCR'd via `pdftoppm -r 300` + `tesseract`, cross-checked by direct page render against the answer-key table (p5) | **chosen — 24/25 SBA items authored this round, 1 held (self-contradictory)** |
| 03 Questions and QBank | Telegram 11685 - Department Questions and Answers.pdf | short-answer/essay Q&A study notes (26 numbered prompts, no options) | native text (pdftotext -layout clean) | not an MCQ source — no options to hold or author; read for background only, not cited |
| 03 Questions and QBank | Telegram 11682 - Final Exam.pdf | short-answer/enumerate exam ("Support 43") | native text (pdftotext -layout clean) | not an MCQ source — free-recall/enumerate format, no options |
| 03 Questions and QBank | Telegram 11684 - Questions Without Answers.pdf | unknown (filename states no key) | none (pdftotext empty; not OCR'd this round) | **not authored — no key by definition; would need a matching answer elsewhere in-corpus to unblock, not found this round** |
| 00 Module-wide / 02 Department Books | Telegram 11656 - Department Book.pdf | textbook | not inspected this round | background only |
| 01 University Material | Telegram 11659/11662/11665 - Lecture 1/2/3 Support.pdf (3 files) | lecture slides/notes | not inspected this round | background only |
| 05 Notes and Textbooks | Telegram 11675 - Notes - Dr Mahmoud Attia.pdf, 11696 - Summary - Support 41.pdf, 11698 - Student Summary.pdf | notes | not inspected this round | background only |

## Why the MCQ QBank was chosen, and how it was keyed without a text layer

`pdftotext -layout` returned **empty** for the MCQ PDF (11687) and for the "Questions Without Answers"
PDF (11684) — both are CamScanner phone-scan image PDFs with no embedded text layer, unlike 11685/11682
which extracted cleanly as plain prose. Per the infra note (subagent sandboxes can read Desktop PDFs and
do text/OCR extraction, but PDF→image render for visual key-recovery may be unreliable), the MCQ PDF was
rasterized at 300dpi with `pdftoppm` and OCR'd with `tesseract`; render **did** work in this sandbox, so
every page (1-5) was also read directly as an image to visually confirm each circled/handwritten answer
against the OCR transcript and against the paper's own separate answer-key table (page 5, "Question
number | Answers"). All 25 SBA items' circled options match the table exactly, so the paper is internally
consistent except for Q3 (see Held, below).

## Structure

The MCQ PDF is one compiled QBank: 25 four-option SBA items (p1-4, titled "CHE 1st grade question bank
MCQ"), an answer-key table for those 25 (p5), then a separate 44-item True/False block (p6-8, titled
"CHE 1st grade question bank T&F") with its own answer-key table (p9). Only the SBA block meets this
lane's ≥4-option floor; the True/False block is out of scope by definition (2 options: True/False), not
"held" or "remaining" work.

## SBA block (Q1-25) — authored this round, 24/25

24 of 25 items keyed and authored across 7 subtopic clusters (foundations of communication, listening
skills, communication barriers, consultation skills, health education, presentation skills, patient
instructions/information gathering). Concept search: grepped every existing concept file repo-wide for
communication-skills terms first; found `docs/Ain-Shams-Source-Imports/concept/ASU-COMM-foundations-concepts.md`
(4 concepts, a different ASU Year-3 lecture slice: active listening as two-step reflection, reflective
listening, listening-skills contact/silence/environment, reflecting content-and-feeling) — no exact-fact
overlap with this Year-1 MU QBank's 24 facts, so all 24 concepts are new mints, not overlays.

**Held: Q3** ("Developing idea by the sender is:") — the printed table key (p5) is D ("(a+b)"), but a red
handwritten correction crosses out D and writes "a,c" labelled "الجواب الصحيح والنهائي" (the correct and
final answer). No printed option states "a+c"; the only combined option printed is "(a+b)" (option d).
The correction cannot be bound to any single printed option without inventing one that is not on the
page — held for self-contradiction rather than guessed.

## Condition check (chief-of-staff standing order)

24/25 SBA items in the chosen source are keyed and authored (96%), comfortably clearing the ≥60% bar;
the one hold is an explicitly-reasoned self-contradiction, not an unmarked/unexplained gap. Proceeding
per the chief-of-staff's conditional-approval rule (this lane applies the ≥60% bar itself, matching the
precedent set by MU-MED101/102/105).

## Next resume-first

- The True/False block (p6-8, 44 items) is out of scope for this SBA-only rule and was not triaged
  page-by-page beyond confirming it is genuinely 2-option.
- `Telegram 11684 - Questions Without Answers.pdf` has no text layer either; not OCR'd/rendered this
  round. A future pass could OCR it and check whether its items overlap 1:1 with the keyed MCQ QBank
  (11687) closely enough to safely borrow a key — not attempted here to avoid inventing a key match.
- The Department Book (11656), the three Lecture Support files, and the three Notes/Summary files were
  not inspected this round; any of them could hold further MCQ-format content or could serve as an
  independent citation to raise the current single-source (0.7-0.8 confidence) evidence chain.
EOF
