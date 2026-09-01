<!--
  Catalogue resource records for the Kasr Alainy Year 1 department books that
  question batches in docs/Kasr-Source-Imports/question/ refer to in prose as
  "the department book". That prose is being retired in favour of `resource_ids`
  pointing at real catalogue rows, and today no such rows exist — the books
  live only as evidence-store manifest entries (docs/Kasr-Source-Imports/evidence/).

  Each `id` below is deliberately the SAME `src_…` id the book already carries
  in the evidence store, not a freshly minted one. That is the convention
  already in use in docs/Ain-Shams-Source-Imports/resource/ (e.g.
  ASU-CVS-foundations-resources.md, id src_91c09abf6b30acb2e4cb, is the same id
  as its evidence-store counterpart) — a catalogue resource "promotes" the
  evidence-store row under an unchanged id, so a `resource_ids` cell naming
  that same `src_…` string resolves once this batch is imported, without
  renaming anything a citation or claim already points at.

  Titles, institution, and qualification are carried over from the manifest
  entries in docs/Kasr-Source-Imports/evidence/*-resources.md and
  *-sources.md (generated from docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json).
  Nothing here is invented: every book below is one this programme's evidence
  store already documents as a real, named department textbook, and every one
  is substantiated by an actual "the department book" reference in the
  question batch(es) mapped to it (see the mapping table in the authoring
  report, not reproduced here).

  Left blank rather than guessed: `url` (none of these has a public URL — all
  are offline PDFs held for internal extraction only), `topics` and
  `included_concepts` (populating these accurately needs a concept-by-concept
  pass this batch does not attempt — the resource editor is the place to add
  precise page/timestamp deep-links per the schema's own guidance), and `year`
  wherever the source manifest entry does not state one.

  Status is Draft throughout, matching every other resource batch in this
  programme (docs/Ain-Shams-Source-Imports/resource/) and the Kasr question
  and article batches' own new-content status.

  Import: Bulk import → resource. Land this before the question batches are
  edited to add `resource_ids` naming these ids.
-->

# Item

## id
src_b1e6dc481eaf337268d0

## title
Department Book Module 101

## subject
msk

## status
Draft

## owner
Claude

## type
Book

## source
Kasr Alainy — Faculty of Medicine, Cairo University

## url

## module_ids
101 ISK

## module_subject
101 ISK > Anatomy & Histology

## universities
kau

## years
Year 1

## description
The 101 ISK department book, written jointly by the Histology and Anatomy Departments of the Faculty of Medicine, Cairo University, who both teach this module and set its papers. It is the authority of record for this module's local curriculum — upper limb osteology, joints and myology, and the histology paired with it — not a substitute for an international reference on a question of general medical fact. 291 pages.

---

# Item

## id
src_07f0a0ff41addf826c7f

## title
Department question book — Biochemistry MCQs for modules 102 INT and 103 BMS

## subject
fnd

## status
Draft

## owner
Claude

## type
Book

## source
Kasr Alainy — Faculty of Medicine, Cairo University

## url

## module_ids
102 INT | 103 BMS

## module_subject
102 INT > Biochemistry
103 BMS > Biochemistry

## universities
kau

## years
Year 1

## description
The Medical Biochemistry and Molecular Biology department's own multiple-choice question book, shared between modules 102 INT and 103 BMS. Its module divider pages assign each chapter to a module, which is how items taught by 103 were separated from 102's. It carries a printed answer key per chapter and is assessment material — curriculum signal about what this faculty asks, not independent medical authority — but is referred to as "the department book" in this programme's 102 INT question prose and is the book several 103 BMS biochemistry items were extracted from. 154 pages.

---

# Item

## id
src_300847a5fa64809d6c07

## title
Medical Biochemistry (BMS 103) — Kasr Al Ainy department book

## subject
fnd

## status
Draft

## owner
Claude

## type
Book

## source
Kasr Alainy — Faculty of Medicine, Cairo University

## url

## module_ids
103 BMS

## module_subject
103 BMS > Biochemistry

## universities
kau

## years
Year 1

## description
Written by staff members of the Medical Biochemistry and Molecular Biology Department, Faculty of Medicine, Cairo University, and set as the biochemistry text for module 103 BMS. It is the department's own statement of what it teaches and examines — carbohydrate, lipid, amino acid and nitrogen metabolism, vitamins — and is the authority of record for this module's local curriculum, not a substitute for an international reference on a question of general medical fact. 160 pages.

---

# Item

## id
src_59643edb9d371bcefa2c

## title
Physiology of Nerve and Muscle (BMS 103) — Kasr Al Ainy department book

## subject
neuro

## status
Draft

## owner
Claude

## type
Book

## source
Kasr Alainy — Faculty of Medicine, Cairo University

## url

## module_ids
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle

## universities
kau

## years
Year 1

## description
Written by staff members of the Physiology Department, Faculty of Medicine, Cairo University, and set as the physiology text for module 103 BMS. Covers the nerve and muscle action potential, and isometric versus isotonic contraction among other topics. It is the department's own statement of what it teaches and examines, so it is the authority of record for this module's local curriculum. 51 pages.

---

# Item

## id
src_18d3a953df4ca83c4e74

## title
Dpt Book Book of Histology (CPS 104) 2026 1st Year

## subject
fnd

## status
Draft

## owner
Claude

## type
Book

## source
Kasr Alainy — Faculty of Medicine, Cairo University

## url

## year
2026

## module_ids
104 CPS

## module_subject
104 CPS > Histology

## universities
kau

## years
Year 1

## description
The 104 CPS department book for histology, 2026 printing — covers the respiratory system, the cardiovascular A-V connections, the lymphatic and macrophage system, and cytogenetics/the cell cycle among the topics this programme's 104 CPS question batch draws on and refers to in prose as "the department book". 104 CPS also has separate department books for physiology and anatomy (see the evidence manifest); this record covers only the histology volume, the one actually cited in the current question batch. 53 pages.

---

# Item

## id
src_e294bafc730fe7111b06

## title
Dpt book intro patho 108-2026

## subject
fnd

## status
Draft

## owner
Claude

## type
Book

## source
Kasr Alainy — Faculty of Medicine, Cairo University

## url

## year
2026

## module_ids
108 INT

## module_subject
108 INT > Pathology

## universities
kau

## years
Year 1

## description
Department book for module 108 INT, 2026 — the pathology half of the module. Two numbered teaching chapters, Cellular Response to Injury and Intracellular Accumulation and Extracellular Depositions. Native text layer, quotable verbatim. Indexed in the corpus under two byte-identical filenames; this record follows the evidence-store row in stating no single relative path. Local curriculum, not independent medical authority.

---

# Item

## id
src_af30e4191cb4087f8d3f

## title
Dpt book general pharma 108-2026

## subject
pharm

## status
Draft

## owner
Claude

## type
Book

## source
Kasr Alainy — Faculty of Medicine, Cairo University

## url

## year
2026

## module_ids
108 INT

## module_subject
108 INT > Pharmacology

## universities
kau

## years
Year 1

## description
Department book for module 108 INT, 2026 — the pharmacology half of the module: kinetics, dynamics, adverse reactions, interactions and routes of administration. The evidence-store record notes the committed page text was produced in OCR mode and carries some OCR damage despite a nominally native text layer, so quotation from it is limited to unambiguous spans. Local curriculum, not independent medical authority.
