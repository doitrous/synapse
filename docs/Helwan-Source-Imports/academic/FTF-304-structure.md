<!--
  Module FTF 304 — the subject tree for Forensic Medicine and Toxicology, taken
  from the department book's own table of contents and chapter headings.

  Source: `DPT BOOK - Toxo & Forensic Dep. Book.pdf`, manifest source ID
  src_9a61c95602d771ad889a (docs/Helwan-Source-Imports/manifest/helwan-y1-3-sources.json).
  214 pages, textLayer: ocr-needed. Chapter headings read by eye off rendered
  pages (`pdftoppm` + `tesseract`), not off a text layer — this book carries none
  usable. Pages cited below are the PDF's own printed page numbers, read off the
  rendered image, not the PDF page-1 count.

  The book is bound as two parts, in this order: "Part I — Clinical Toxicology"
  (cover, page ~2) then "Part II — Forensic Medicine" (cover, page 83). Its own
  contents pages:

    Part I contents (rendered page 3): Chapter 1 General Toxicology (p.1),
    2 Toxidromes (p.14), 3 Corrosives (p.29), 4 Medical Toxicology (p.36),
    5 Pesticides (p.51), 6 Toxic Gases & Volatiles (p.61), 7 Food and Animal
    Poisoning (p.72), 8 Substance of Dependence and Abuse (p.78), 9 References.

    Part II contents (rendered page 86): Chapter 1 Identification, 2 Medico
    Legal Aspects of Death, 3 Postmortem Changes, 4 Medico Legal Aspects of
    Wounds, 5 Injuries of Special Organs, 6 Head Injuries, 7 Firearm Injuries,
    8 Thermal Injuries, 9 Transportation Injuries, 10 Medico Legal Aspects of
    Asphyxia, 11 Medico Legal Aspects of Sexual Assaults, 12 Medico Legal
    Aspects of Obstetrics, 13 Suspicious Infant Deaths, 14 Violation of Human
    Rights, References.

  Cross-checked against the independent table of contents printed inside
  `MCQs - Forensic & Toxo MCQ by Dr. Shehab 2026 .pdf` (src_676bccfcde4ab3e021e6,
  native text layer, pages 1 and 72), which lists the same fourteen Forensic
  chapters and the same seven examinable Toxicology chapters (it has no
  "Substance of dependence and abuse" or "References" chapter, because it is a
  question bank, not a syllabus). The two sources agree; nothing here is
  invented or reconciled from a third guess.

  `References` and, in Toxicology, `Substance of dependence and abuse` are
  deliberately omitted as subject-tree nodes: `Toxicology scope and exam
  guidance.md` (src_4add98b6662e82f54e78) states "Excluded: hydrocarbon
  toxicity, drug dependency and neuroleptics", and `References` is the book's
  own apparatus, not teaching content, the same reasoning 108-int-structure.md
  used for its pathology chapter's `Formative Assessment` and `References`
  headings.

  Chapter-internal sub-headings (the level below each chapter title) are not
  yet transcribed here — that is chapter-by-chapter work for the concept and
  article authoring pass, done against the OCR'd chapter text rather than
  guessed from a chapter title. This file carries chapter-level nodes only,
  which is what the question-led triage in step 2 resolves questions against.

  Marks: the department's own quiz-mark-allocation post
  (`FTF 304 quiz mark allocation and assessed content.md`,
  src_b9a48699a7dd2b7578d6) states the module's 60-mark quiz splits
  Family Medicine 15 / Community Medicine 15 / "Forensic Medicine and Clinical
  Toxicology" 30 — combined, not split between the two subjects. No source in
  this lane's manifest gives a Forensic-only or Toxicology-only mark figure, so
  none is recorded at the subject level; recording one would be arithmetic, not
  a source, the same caution 108-int-structure.md made about its own pharmacology
  split.

  The same post also names which of these chapters the 60-mark quiz actually
  draws on — a subset of the tree below, not the whole department book:

    Forensic Medicine (quiz-assessed): Forensic serology (→ Identification
    chapter, forensic genetics/serology/DNA lecture), Identification, Wounds
    and trauma, Death, Transportation injuries, Head injuries.

    Toxicology (quiz-assessed): General toxicology, Pesticides, Corrosives,
    Analgesic poisoning (→ Medical Toxicology chapter), Toxic gases.

  That list is quiz scope, not module scope — `Toxicology scope and exam
  guidance.md` separately says a question book and a practical file/review were
  "expected before the final rather than the quiz", i.e. the final draws on
  more of the book than the quiz does. Every chapter below stays in the tree;
  the quiz subset is recorded here as a fact about assessment, not as a filter
  on which chapters get authored.

  Import: Academic Setup › Import, HU as the target university. `[FTF 304]`
  resolves onto the catalogue's `HU-FTF-304`; it does not create a second
  module.
-->

# Year 3
## Term 2
<!-- The schedule (`Helwan University (renamed Capital University) - FTF 304
     module schedule - 2025-2026.pdf`, src_ea42a128e578e729d42a) runs the
     rotation 29 March – 14 May 2026, which is Egypt's second semester. No
     source in this module names the term explicitly; this is the same
     placement other HU_Y3 lanes are using for a spring rotation, stated here
     rather than left silent. -->
- FTF 304 [HU-FTF-304] (quiz 60 marks total: Family Medicine 15, Community Medicine 15, Forensic Medicine and Clinical Toxicology 30 combined)
  - Forensic Medicine
    - Identification
    - Medico Legal Aspects of Death
    - Postmortem Changes
    - Medico Legal Aspects of Wounds
    - Injuries of Special Organs
    - Head Injuries
    - Firearm Injuries
    - Thermal Injuries
    - Transportation Injuries
    - Medico Legal Aspects of Asphyxia
    - Medico Legal Aspects of Sexual Assaults
    - Medico Legal Aspects of Obstetrics
    - Suspicious Infant Deaths
    - Violation of Human Rights
  - Toxicology
    - General Toxicology
    - Toxidromes
    - Corrosives
    - Medical Toxicology
    - Pesticides
    - Toxic Gases and Volatiles
    - Food and Animal Poisoning
