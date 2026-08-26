<!--
  Evidence-source records for every source lane W1-103-BIOC cites: the module's three EOM
  papers (Exams), the department's own two MCQ&Essay banks, the Biochemistry section of the
  shared General practical bank, and the department's two comprehensive teaching notes
  ("Blood - Bio - Agha", "CHO Metabolism - Agha").

  Every field is copied from `docs/Alexandria-Source-Imports/evidence/corpus-source-index.json`
  (confirmed present for all 8 ids) and `docs/Alexandria-Source-Imports/manifest/au-y1-sources.json`.
  Nothing is minted: the id is the first 20 hex of the file's own sha256.
-->

# Item
## id
src_4e9f6eb8be5aeedd4cf4
## title
Blood - Bio - Agha
## institution
Faculty of Medicine, Alexandria University
## collection_id
au-y1
## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/Biochemistry/Dr_ Agha/Blood/Blood - Bio - Agha.pdf
## media_type
application/pdf
## languages
en
## page_count
23
## sha256
4e9f6eb8be5aeedd4cf43fa8d8225a1b7b8372d55687c04ccc28fdfebd3334e2
## processing_status
native-text-extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image or verbatim passage is published from it.
## qualification
Dr Mohamed Agha's comprehensive Biochemistry-of-Blood lecture notes for AU-MED-103 — the department's own teaching text, contents page: Haemoglobin structure, Types of normal Hb, Types of abnormal Hb, Haem biosynthesis, Haemoglobin catabolism, Folic acid, Cobalamin, Vitamin K, Iron, Immunoglobulins.
## confidence
0.85

## is_assessment
false

---

# Item
## id
src_afc87efebd1aaf64f595
## title
CHO Metabolism - Agha
## institution
Faculty of Medicine, Alexandria University
## collection_id
au-y1
## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/Biochemistry/Dr_ Agha/CHO metabolism/CHO Metabolism - Agha.pdf
## media_type
application/pdf
## languages
en
## page_count
25
## sha256
afc87efebd1aaf64f5956ccf0bbd00204d33ad2a7f8eab06c709c709938bba51
## processing_status
native-text-extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image or verbatim passage is published from it.
## qualification
Dr Mohamed Agha's comprehensive CHO Metabolism lecture notes for AU-MED-103, companion to `src_4e9f6eb8be5aeedd4cf4` — contents page: Glycolysis, Pyruvate metabolism, Citric acid cycle, HMP pathway, Uronic acid pathway, Gluconeogenesis, Glycogenesis, Glycogenolysis, Fructose metabolism, Galactose metabolism.
## confidence
0.85

## is_assessment
false

---

# Item
## id
src_49f438279b68a489aa42
## title
EOM - Blood End Egyptian 1
## institution
Faculty of Medicine, Alexandria University
## collection_id
au-y1
## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/Exams/EOM - Blood End Egyptian 1.pdf
## media_type
application/pdf
## languages
en | ar
## page_count
7
## sha256
49f438279b68a489aa42ad17f16d635eec05bc62ad5180e4c35c881aa1dc8ffe
## processing_status
native-text-extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image or verbatim passage is published from it.
## qualification
End-of-Module written exam for AU-MED-103 (35 items, answer table on p7), Egyptian stream per filename (manifest examSignals.streamSignal recorded null despite the filename — noted in the department triage, not corrected here). No printed sitting date found in the extracted text; sittingYear left empty.
## confidence
0.9

## is_assessment
true

---

# Item
## id
src_56bc398ce32f0140fc29
## title
EOM - Blood Final Egyptian final
## institution
Faculty of Medicine, Alexandria University
## collection_id
au-y1
## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/Exams/EOM - Blood Final Egyptian final.pdf
## media_type
application/pdf
## languages
en
## page_count
16
## sha256
56bc398ce32f0140fc292f2ab11921253b84bd65ce4fad4f9da5091225ae55a8
## processing_status
native-text-extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image or verbatim passage is published from it.
## qualification
End-of-Module written exam for AU-MED-103 (70 items, answer table on p16), Egyptian stream per filename. The source's own answer key leaves Q13 unresolved (printed `13.xx`) — recorded unkeyed in the department triage, not guessed. No printed sitting date found; sittingYear left empty.
## confidence
0.9

## is_assessment
true

---

# Item
## id
src_c9c9ca53cfa1321d0508
## title
EOM - Blood end wafdeen final
## institution
Faculty of Medicine, Alexandria University
## collection_id
au-y1
## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/Exams/EOM - Blood end wafdeen final.pdf
## media_type
application/pdf
## languages
en
## page_count
11
## sha256
c9c9ca53cfa1321d0508356be4953144d6fa13812f8a82466f0c0c310538f213
## processing_status
native-text-extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image or verbatim passage is published from it.
## qualification
End-of-Module written exam for AU-MED-103 (40 items, answer table on p11), international/wafdeen stream per filename (manifest examSignals.streamSignal recorded null despite the filename). No printed sitting date found; sittingYear left empty.
## confidence
0.9

## is_assessment
true

---

# Item
## id
src_c757d47d9f689de66b5d
## title
MCQs - Blood Agha MCQ
## institution
Faculty of Medicine, Alexandria University
## collection_id
au-y1
## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/Biochemistry/Questions/MCQs - Blood Agha MCQ.pdf
## media_type
application/pdf
## languages
en
## page_count
15
## sha256
c757d47d9f689de66b5d9975c213d1385756db54457cb651b91701c9688de927
## processing_status
native-text-extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image or verbatim passage is published from it.
## qualification
Department question bank, "The Genius in Biochemistry" (Dr Mohamed Agha) — 73 MCQs + 33 essay questions on the Blood chapter. The printed answer table (p15) is a 9-column layout that `pdftotext` flattens out of order; the full key was recovered by rendering p15 at 200 dpi and reading the table by eye (method recorded in the department triage) — no digit guessed.
## confidence
0.85

## is_assessment
true

---

# Item
## id
src_97aa282c2fde6f6025a2
## title
MCQs - CHO Metabolism MCQs (1)
## institution
Faculty of Medicine, Alexandria University
## collection_id
au-y1
## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/Biochemistry/Questions/MCQs - CHO Metabolism MCQs (1).pdf
## media_type
application/pdf
## languages
en | ar
## page_count
24
## sha256
97aa282c2fde6f6025a2764bb2b692e72d0c68135ac4c0797743b37d8cf798ae
## processing_status
native-text-extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image or verbatim passage is published from it.
## qualification
Same series, CHO Metabolism chapter — 111 MCQs + essay questions. 14 of 111 printed answer-key entries read as a bare "0" in the extracted text (a glyph confusion, not a scan artifact); the full key was recovered by rendering the answer-table pages (p20–21) at 200 dpi and reading by eye — every one resolved to "c", method recorded in the department triage.
## confidence
0.85

## is_assessment
true

---

# Item
## id
src_5309ee19e1149a5bbe9d
## title
MCQs - Practical Blood Questions_20240329_051349_0000
## institution
Faculty of Medicine, Alexandria University
## collection_id
au-y1
## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/General/Practical/Questions/MCQs - Practical Blood Questions_20240329_051349_0000 [from Alexandria University Updated].docx
## media_type
application/vnd.openxmlformats-officedocument.wordprocessingml.document
## languages
en
## page_count

## sha256
5309ee19e1149a5bbe9d59f19bc3d24db41270ae9fc8b29ef1da39bf0271e0b1
## processing_status
docx-extracted
## rights
University teaching material held for internal extraction only. Not redistributable; no page image or verbatim passage is published from it.
## qualification
The module's cross-departmental practical exam bank (Histology 9 spots, Physiology 10 spots, Biochemistry 13 spots) shared by every department lane. `pagetext.py` has no docx path; this lane extracted it directly with `python-docx` into its own working notes (not into `scripts/alexandria/pagetext/`) and cross-checked it word for word against its non-preferred `.pdf` twin `src_4b9b0c4cf94fde15b14a` — identical content, confirming the earlier triage's substitution was safe.
## confidence
0.85

## is_assessment
true
