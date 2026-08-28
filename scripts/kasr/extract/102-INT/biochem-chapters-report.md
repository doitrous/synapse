# Module 102 INT — Biochemistry subject tree, from the department book

Source: `Department Book Module 102.pdf`, "Introduction to Biomedical Sciences (INT – 102)",
by staff of the Medical Biochemistry Department and the Physiology Department, Faculty of
Medicine, Cairo University. 167 physical pages, native text (no OCR guessing needed).
Manifest source ID `src_a488633802ec053c6325`.

Output: `biochem-chapters.json`, 14 records.

## The printed-to-physical page offset

**`physical = printed + 4`, across the whole of Part I.**

How it was proved, in three independent ways:

1. **The Contents against the first chapter.** The Contents on physical p3 gives Chapter I
   "Amino Acids of Biological Importance" as printed page 1. That chapter's title page is
   physical p5, and its running head carries the printed number `1`. So the offset is 4.
2. **Every running head.** Each page of Part I prints its own number at the right of the
   running head. Sampling across the whole part — physical p8→4, p9→5, p41→37, p49→45,
   p54→50, p65→61, p80→76, p102→98, p107→103 — the difference is 4 on every page. There is
   no drift and no second offset inside Part I, unlike the 101 book.
3. **The orientation's four cancelled printed pages.** Adding 4 to each lands on a page that
   actually carries the named heading:
   - printed 44 → physical p48, heading "VI- PROTEINS OF EXTRACELLULAR MATRIX"
   - printed 61 → physical p65, table headed "International Classification of Enzymes"
   - printed 76 → physical p80, heading "Genetic Terminology"
   - printed 98 → physical p102, heading "XIII- REGULATION OF GENE EXPRESSION"

   Four independent confirmations, from a document that is not the book.

The offset holds only for **Part I**. Part II (Physiology) restarts its own numbering and has
its own Contents on physical p113; it was not mapped here.

## What was found, and at what depth

**14 chapters, at depth 3:** `102 INT > Biochemistry > <Chapter>`.

**There is no part or unit level, so none was written.** The book's Contents on physical p3
is a flat Roman-numbered list of 14 chapter titles with no grouping headings, and no
intermediate heading appears anywhere in the running heads. Inventing an intermediate level
(a "Molecular Biology" bucket for chapters IX–XIV, say) would have been tidy and unsourced,
so the tree is deliberately two levels shallower than the 101 ISK precedent — 101's book
genuinely printed its parts and sections, this one does not.

The Biochemistry half is physical pages 2–111. Physical p112 opens "Part II / Physiology",
which is the other subject in this module and out of scope here.

## Things the book does that broke assumptions

- **Three chapter title pages disagree with the Contents.** The Contents is not simply a
  copy of the headings:

  | Contents (physical p3) | Chapter title page |
  |---|---|
  | VIII. Chemistry of **Free** Nucleotides | `VIII- CHEMISTRY OF NUCLEOTIDES` |
  | IX. **Chemistry of** Nucleic Acids | `IX- NUCLEIC ACIDS` |
  | X. DNA Synthesis (Replication) **and Repair** | `X- EUKARYOTIC DNA SYNTHESIS (REPLICATION)` |
  | XIV. Cell Cycle, Apoptosis, **and Tumor Suppressor Genes** | `XIV- CELL CYCLE, APOPTOSIS & TUMOR SUPPRESSOR GENES` |

  Chapter XIV's running head is shorter again — "Cell Cycle and Apoptosis". The convention
  chosen: `subjectPath` uses the **Contents** wording (it is the department's own naming of
  the shelf, and it matches the 101 precedent, which took its leaves from the LIST OF
  CONTENTS); `bookTitle` records the **chapter title page** heading verbatim; `evidence`
  names both so the disagreement is visible rather than silently resolved.

- **Two of the four cancelled items are sections, not chapters.** "Proteins Of Extracellular
  Matrix" (printed 44–49) and "Regulation Of Gene Expression" (printed 98–102) are each
  exactly one whole chapter, so those two carry `cancelledForExam: true`. But
  "International Classification of Enzymes" is a single **table** on printed 61 — the last
  page of a twelve-page Enzymes chapter — and "Genetic Terminology" is a heading on printed
  76, the last page of the eight-page Nucleic Acids chapter. Marking those two chapters
  cancelled would tell a student to skip about twenty examinable pages, so:

  **Enzymes and Chemistry of Nucleic Acids carry `cancelledForExam: false` with a non-null
  `cancelledNote`.** Anything consuming this file must read `cancelledNote` and not filter on
  the boolean alone. If a partial-cancellation flag is wanted, it needs a field that does not
  exist in the agreed shape, and that is a decision for whoever consumes this, not for me.

- **The two cancelled sections could have been leaf nodes.** Both are printed headings, so
  both would have satisfied the evidence bar. They were not made nodes because the book does
  not name them in the Contents and no other chapter is broken down to that level — adding
  them would have produced a tree that is section-deep in exactly two places and
  chapter-deep everywhere else.

## Cross-check against the orientation's 16 expected topics

All 16 items listed on p2 of `BIO ORIENTATION 102.pdf` (`src_64d31fe6569b4ff499c6`) name a
chapter or a section that exists in the mapped chapters. Where the orientation's OCR
preserved a page number, it agrees with the offset:

| # | Orientation item | Lands in | Evidence |
|---|---|---|---|
| 1–2 | Bonds of 3ry structure; levels of protein structure | II Proteins | "Different Levels of Protein Structure", physical p11 |
| 3–4 | Lipid bilayer; eicosanoid synthesis | IV Lipids | physical p34; "EICOSANOIDS" physical p38 |
| 5 | Thermodynamic changes | VII Enzymes | "2) Thermodynamic changes", physical p56 |
| 6 | Relative affinity of substrate and inhibitor (orientation says p55) | VII Enzymes | physical p59 = printed 55 ✓ |
| 7 | Catalytic / allosteric site (orientation says p56) | VII Enzymes | physical p60 = printed 56 ✓ |
| 8 | cAMP as second messenger | VIII Nucleotides | "2- Signaling Second Messengers", physical p69 |
| 9–11 | Polynucleotide chain; tRNA; mRNA | IX Nucleic Acids | physical p73, p77, p78 |
| 12 | Leading and lagging strands (orientation says p79) | X Replication | physical p83 = printed 79 ✓ |
| 13–15 | Transcriptional unit; post-transcriptional modification; alternative splicing | XI Transcription | physical p86, p90, p91 |
| 16 | Missense, nonsense, silent mutation | XII Translation | "Gene Mutations", physical p100 |

Nothing on that list falls outside the 14 chapters, and nothing on it falls inside a
cancelled range.

The solved question book (`src_62ce633e85fb73732e35`, 44 pages) corroborates the chapter
names independently: its section headings read Carbohydrate, Lipids, Protein, Enzyme, ECM,
Hemoprotein, "Chemistry of Nucleotides & Nucleic acids", Replication, Transcription,
Translation. It combines chapters VIII and IX into one heading and has no section for
Regulation of Gene Expression or for Cell Cycle — that is a question-book editorial choice
and was **not** treated as evidence about the book's structure. The short companion PDF
(`src_6305bb47646c842e2f7a`, 8 pages) is a students' answer sheet for the "explain" questions
and names no chapters; it contributed nothing to the tree.

## What could not be determined

- **Marks.** No source read here states a mark allocation for the Biochemistry half. The
  orientation gives question types (short essay: "Explain on biochemical basis", "Extended
  matching") and a worked diagram example, but no marks. Unlike 101 ISK, where Anatomy's 60
  marks came from an orientation, there is nothing to record, so nothing was recorded.
- **Whether the Contents titles or the chapter-page titles are the department's preferred
  label.** Both are printed by the book and they disagree for four chapters. The choice above
  is a convention, not a finding; a human who knows the department's habit may want to flip
  it.
- **The exam status of "Cell Cycle, Apoptosis, and Tumor Suppressor Genes".** It is not on
  the cancelled list and it is in the ILOs on physical p4, so it is treated as examinable —
  but it is also absent from the solved question book, which is the one weak signal pointing
  the other way. Not resolved from the sources available.
- **Nothing was unreadable.** The book is native text throughout Part I and every page from
  physical p3 to p111 yielded a legible running head and printed page number. The only OCR
  source used was the orientation itself, whose p2 page-number column is largely lost — three
  numbers survived (55, 56, 79) and all three check out against the offset, but the other
  thirteen items were matched by heading text rather than by page number.

## Not done, by instruction

No `git commit`, no `git push`, no import. Nothing outside
`scripts/kasr/extract/102-INT/` was touched; `scripts/kasr/extract/deptbook.py` was read
only.
