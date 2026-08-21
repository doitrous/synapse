<!--
  The corpus sources module 108 INT's content is extracted from.

  This file is the piece the rest of the module's evidence chain was waiting on.
  A concept naming a `src_…` in `resource_ids`, and a citation naming one in
  `resource_id`, both need that source to exist as a record and not only as a
  manifest row: the manifest says the file is on disk, a resource record says
  the library knows what it is. Until this landed, 89 concepts in
  ../concept/108-INT-concepts-pathology.md and
  ../concept/108-INT-concepts-pharmacology.md carried a `field_notes` reason
  saying the source could not be cited, and `medical:presence` flagged every one
  of them for the two fields a note is not allowed to excuse.

  Every field here is copied from ../manifest/kasr-y1-sources.json, which is
  generated from the files themselves, and cross-checked against
  ./corpus-source-index.json, which is generated from that same manifest.
  Nothing is minted: the id is the first twenty hex of the file's own sha256,
  and a wrong one names no file.

  ELEVEN FILES, FOURTEEN MANIFEST ROWS. Filtering the manifest on
  moduleId "108 INT" and universityId "kau" returns fourteen rows, but three
  files are filed under two names each and so appear twice with one sha256
  between them:

    src_af30e4191cb4087f8d3f   DPT general pharma 108-2026 (2).pdf
                               Dpt book general pharma 108-2026.pdf
    src_e294bafc730fe7111b06   DPT intro patho 108-2026 (2).pdf
                               Dpt book intro patho 108-2026.pdf
    src_a2ffe25e8362fe840ceb   y1/108 INT/Practical/Dpt Book Pathology Practical [INT-108].pdf
                               y1/PRACTICAL FIRST YEAR/PATHOLOGY/DPT BOOK Pathology
                               Practical [INT-108] (4).pdf

  Those three records deliberately carry NO `source_relative_path`. It is a
  field left off on purpose, not one somebody forgot. The corpus index holds one
  entry per file — IDs are content-addressed — so it reports exactly one of the
  two names, and which one depends on the order the manifest rows were written.
  The validator compares `source_relative_path` against that single reported
  path and errors on a mismatch, so writing either name is a coin flip that
  flips again the next time the index is regenerated: another lane in this
  programme corrected such a record to match the index, merged, got a rebuilt
  index that had swapped, and failed on the same record with the error reversed.
  The sha256-derived id identifies the file unambiguously whichever name it is
  filed under, and the validator still refuses an id the corpus does not
  contain, so the check that matters is unaffected. The two names are recorded
  above and in each record's `qualification` instead, where nothing compares
  them.

  The other eight files have one path each and carry it normally.

  `processing_status` is the corpus index's own value — `extracted` where the
  file has a native text layer, `ocr_required` where it has none — rather than
  the manifest's `processingStatus`, which still reads `pending` on every 108 INT
  row because the manifest records the pipeline's intent and the index records
  what came out of it.

  ONE DISAGREEMENT WORTH RECORDING. The manifest calls
  src_af30e4191cb4087f8d3f, the general pharmacology book, `textLayer: native`,
  and the index therefore calls it `extracted`. Its cached page text at
  scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json was nevertheless
  produced with `"mode": "ocr"`, and reads like it: Arabic furniture in the
  footers, `2"4 messengers` for "2nd messengers", `latrogenic` for
  "Iatrogenic", `Inthe` for "In the". The record below says `extracted` because
  that is the corpus state, and its `qualification` says the text layer this
  module was actually read from is OCR, because that is what a reader quoting
  from it needs to know. ./108-INT-citations.md quotes this source sparingly and
  never for a drug name, a dose or a number.

  `is_assessment` is `yes` on the four EOY papers and the two department
  question banks. An exam paper is evidence of what this faculty examines, never
  evidence that something is medically true, and nothing downstream should treat
  it as the latter.

  Deliberately left out: `confidence`, which would be a number invented per
  file with nothing behind it, and `source_uri`, which none of these has — every
  one is a local PDF with no public URL.

  Import: Evidence › Import, before ./108-INT-claims.md and
  ./108-INT-citations.md.
-->

# Item
## id
src_e294bafc730fe7111b06
## title
Dpt book intro patho 108-2026
## institution
Kasr Al Ainy Faculty of Medicine, Cairo University
## collection_id
kau-y1
## media_type
application/pdf
## languages
en
## page_count
22
## sha256
e294bafc730fe7111b060eb511b468a67f10a3682b74d1ee66b9c7f889fecfe0
## processing_status
extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image is published from it, and quotation is limited to the spans recorded in ./108-INT-citations.md.
## qualification
Department book for module 108 INT, 2026 — the pathology half of the module and the source of record for all 49 concepts in ../concept/108-INT-concepts-pathology.md. Two numbered teaching chapters, CELLULAR RESPONSE TO INJURY and INTRACELLULAR ACCUMULATION AND EXTRACELLULAR DEPOSITIONS, with 16 ILOs between them. Native text layer, quotable verbatim. Printed page number = cached page index + 1. Indexed in the corpus under two names — `DPT intro patho 108-2026 (2).pdf` and `Dpt book intro patho 108-2026.pdf` — with one content-addressed id, because the two are byte-identical; this record states no relative path, for the reason set out in the preamble. Local curriculum, not independent medical authority.
## is_assessment
false

---

# Item
## id
src_af30e4191cb4087f8d3f
## title
Dpt book general pharma 108-2026
## institution
Kasr Al Ainy Faculty of Medicine, Cairo University
## collection_id
kau-y1
## media_type
application/pdf
## languages
en
## page_count
34
## sha256
af30e4191cb4087f8d3f8240e224d21b449f8150fe679bceaf54255e201d7f00
## processing_status
extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image is published from it, and quotation is limited to the spans recorded in ./108-INT-citations.md.
## qualification
Department book for module 108 INT, 2026 — the pharmacology half of the module, covering kinetics, dynamics, adverse reactions, interactions and routes of administration. The manifest calls its text layer native and the corpus index therefore calls it extracted, but the committed page text was produced in OCR mode and carries OCR damage throughout: mangled Arabic footers, `2"4 messengers`, `latrogenic`, `Inthe`. It is quotable only where the extracted characters are unambiguous, and ./108-INT-citations.md quotes it for definitions and mechanisms and never for a drug name, a dose or a number. Printed page number = cached page index; index 0 is the cover. Indexed in the corpus under two names — `DPT general pharma 108-2026 (2).pdf` and `Dpt book general pharma 108-2026.pdf` — with one content-addressed id, because the two are byte-identical; this record states no relative path, for the reason set out in the preamble. Local curriculum, not independent medical authority.
## is_assessment
false

---

# Item
## id
src_b4f736e3bd809dbee187
## title
ORIENTATION PHARMA ILOs_General_Pharmacology_2026-June (3)
## institution
Kasr Al Ainy Faculty of Medicine, Cairo University
## collection_id
kau-y1
## source_relative_path
y1/108 INT/Orientation/ORIENTATION PHARMA ILOs_General_Pharmacology_2026-June (3).pdf
## media_type
application/pdf
## languages
en
## page_count
3
## sha256
b4f736e3bd809dbee187891779b7f788180d09a119e25e96cae6de01d7389b69
## processing_status
extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image is published from it, and quotation is limited to the spans recorded in ./108-INT-citations.md.
## qualification
The pharmacology department's own numbered ILO sheet for the first-year general pharmacology course, 2026, listing 55 objectives against SAQ, MCQ and OSPE columns and stating the mark split at the top. It is the faculty saying what it will teach and how it will ask about it, and it is the source of record for the scope and weighting of every concept in ../concept/108-INT-concepts-pharmacology.md. Native text, quotable verbatim; the tick columns extract as bare √ characters at end of line. It states objectives, not facts — an ILO establishes that the course teaches a thing, never that the thing is true — so citations against it carry curriculum-scope claims only. No printed page numbers; locators are the zero-based cached page index. Local curriculum, not independent medical authority.
## is_assessment
false

---

# Item
## id
src_a2ffe25e8362fe840ceb
## title
Dpt Book Pathology Practical [INT-108]
## institution
Kasr Al Ainy Faculty of Medicine, Cairo University
## collection_id
kau-y1
## media_type
application/pdf
## languages
en
## page_count
12
## sha256
a2ffe25e8362fe840cebb31d203b9d03b69359417acbd0c37c91899dd11d160c
## processing_status
extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image is published from it, and quotation is limited to the spans recorded in ./108-INT-citations.md.
## qualification
The pathology department's practical book for 108 INT — the slide-by-slide atlas the OSPE is set from, giving gross and microscopic descriptions of the specimens students are shown. Native text. It teaches the same lesions as the theoretical book and states their morphology in the department's own words, which is why it supports the morphology concepts alongside the theoretical book. Indexed in the corpus under two names — `y1/108 INT/Practical/Dpt Book Pathology Practical [INT-108].pdf` and `y1/PRACTICAL FIRST YEAR/PATHOLOGY/DPT BOOK Pathology Practical [INT-108] (4).pdf` — with one content-addressed id, because the two are byte-identical; this record states no relative path, for the reason set out in the preamble. Local curriculum, not independent medical authority.
## is_assessment
false

---

# Item
## id
src_bd1595e59d116b78436a
## title
EOY 108 exam 199 [solved] (2)
## institution
Kasr Al Ainy Faculty of Medicine, Cairo University
## collection_id
kau-y1
## source_relative_path
y1/108 INT/EOY/EOY 108 exam 199 [solved] (2).pdf
## media_type
application/pdf
## languages
en
## page_count
15
## sha256
bd1595e59d116b78436a52acfc81d261a30c7d8a116ba3d3887309cd27fbfe6a
## processing_status
extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image is published from it, and quotation is limited to the spans recorded in ./108-INT-citations.md.
## qualification
End-of-year paper for module 108 INT, batch 199, sat 2025. Native text, so the question wording is preserved exactly as printed and is quotable. The filename claims the paper is solved and it is not: the manifest records that 0 of 102 answer rules over 34 questions carry any text, so nothing here is an answer key and no claim in ./108-INT-claims.md rests on one. Curriculum signal — evidence of what this faculty asks — never evidence that a stated fact is medically true.
## is_assessment
true

---

# Item
## id
src_26907f7ae5f2763e89f0
## title
EOY 108 exam 199 [unsolved] (2)
## institution
Kasr Al Ainy Faculty of Medicine, Cairo University
## collection_id
kau-y1
## source_relative_path
y1/108 INT/EOY/EOY 108 exam 199 [unsolved] (2).pdf
## media_type
application/pdf
## languages
en
## page_count
15
## sha256
26907f7ae5f2763e89f0269da54f83c6c71df047940d8607a119e20f37c1c044
## processing_status
extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image is published from it, and quotation is limited to the spans recorded in ./108-INT-citations.md.
## qualification
End-of-year paper for module 108 INT, batch 199, sat 2025 — the unsolved copy of the same sitting as src_bd1595e59d116b78436a, kept as a separate record because the two files differ in bytes and therefore in id. Native text. Curriculum signal only; it carries questions and no answers, and no claim rests on it as a statement of fact.
## is_assessment
true

---

# Item
## id
src_a2e82550c5fffe1b8bfd
## title
EOY Exam {INT-108} 198 (3)
## institution
Kasr Al Ainy Faculty of Medicine, Cairo University
## collection_id
kau-y1
## source_relative_path
y1/108 INT/EOY/EOY Exam {INT-108} 198 (3).pdf
## media_type
application/pdf
## languages
en
## page_count
11
## sha256
a2e82550c5fffe1b8bfd52fedfbe6e2b383578b9e2e8cfabfdceca103406d89c
## processing_status
extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image is published from it, and quotation is limited to the spans recorded in ./108-INT-citations.md.
## qualification
End-of-year paper for module 108 INT, batch 198, sat 2024. Native text, question wording preserved verbatim. Curriculum signal — what the faculty asked in a previous sitting — never medical authority.
## is_assessment
true

---

# Item
## id
src_3deab75f7f81cc5f5260
## title
EOY Exam {INT-108} 198 (Solved) (3)
## institution
Kasr Al Ainy Faculty of Medicine, Cairo University
## collection_id
kau-y1
## source_relative_path
y1/108 INT/EOY/EOY Exam {INT-108} 198 (Solved) (3).pdf
## media_type
application/pdf
## languages
en
## page_count
11
## sha256
3deab75f7f81cc5f5260639c05534fc0e4ea85034a5ce47155af76f29ccafb44
## processing_status
extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image is published from it, and quotation is limited to the spans recorded in ./108-INT-citations.md.
## qualification
End-of-year paper for module 108 INT, batch 198, sat 2024. The filename claims solved and the file is blank: the manifest records 0 of 148 answer rules over 40 questions carrying any text. Treated exactly as the unsolved copy is — question wording only. Curriculum signal, not medical authority.
## is_assessment
true

---

# Item
## id
src_9aecfa4812d20259fe5a
## title
PHARMA WRITTEN Crash Kinetics Highlighted . 2026 docx (2)
## institution
Kasr Al Ainy Faculty of Medicine, Cairo University
## collection_id
kau-y1
## source_relative_path
y1/108 INT/Written Questions/PHARMA WRITTEN Crash Kinetics Highlighted . 2026 docx (2).pdf
## media_type
application/pdf
## languages
en
## page_count
4
## sha256
9aecfa4812d20259fe5a7ecbe214da046d70ad76cffca4c637345b05cd726727
## processing_status
extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image is published from it, and quotation is limited to the spans recorded in ./108-INT-citations.md.
## qualification
A four-page written-question sheet on pharmacokinetics for 108 INT, 2026, filed under Written Questions. Native text. It is a revision compilation rather than a faculty document — nothing on it identifies a department author — so it is recorded here as a source the module contains and is used for weighting only. No claim in ./108-INT-claims.md rests on it and no span is quoted from it.
## is_assessment
true

---

# Item
## id
src_3f8527b376185eb3c2eb
## title
IMPORTANT Pathology - INT mcq (2)
## institution
Kasr Al Ainy Faculty of Medicine, Cairo University
## collection_id
kau-y1
## source_relative_path
y1/108 INT/Department Questions/IMPORTANT Pathology - INT mcq (2).pdf
## media_type
application/pdf
## languages
en
## page_count
16
## sha256
3f8527b376185eb3c2eb99c101ba1f3789d543d2f9849e71dadf15befd8f6ca4
## processing_status
ocr_required
## rights
Student compilation carrying "For personal use only, No other uses without permission. Copyright (c) 2025. All rights reserved". NOT CLEARED FOR PUBLICATION. No stem, option or distractor from it is reproduced anywhere in this programme, in a support_span or otherwise.
## qualification
A student-compiled pathology question bank for 108 INT, 126 rows, 58 of them pathology. No text layer at all — the manifest records `textLayer: none` and the corpus index therefore holds it as ocr_required. It is used as evidence of WHAT IS EXAMINED and nothing else: 25 of its pathology rows turn on necrosis, which is why necrosis carries the heaviest weights in ../concept/108-INT-concepts-pathology.md. It is neither a faculty document nor quotable, and no citation in ./108-INT-citations.md names it.
## is_assessment
true

---

# Item
## id
src_ec50845c4498e17b9b6b
## title
IMPORTANT Pharmacology - INT mcq (2)
## institution
Kasr Al Ainy Faculty of Medicine, Cairo University
## collection_id
kau-y1
## source_relative_path
y1/108 INT/Department Questions/IMPORTANT Pharmacology - INT mcq (2).pdf
## media_type
application/pdf
## languages
en
## page_count
16
## sha256
ec50845c4498e17b9b6bc19dc429045cb7a0e4e847cf465f84f7e5b8c79e9310
## processing_status
ocr_required
## rights
Student compilation, same copyright line as src_3f8527b376185eb3c2eb. NOT CLEARED FOR PUBLICATION. No stem, option or distractor from it is reproduced anywhere in this programme.
## qualification
The pharmacology companion to src_3f8527b376185eb3c2eb — a student-compiled question bank for 108 INT with no text layer. Recorded so the module's source list is complete and so weighting can name it; used as evidence of what is examined, never quoted, and named by no citation.
## is_assessment
true
