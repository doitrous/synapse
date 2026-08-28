<!--
  AU-MED-103 Physiology · evidence sources (12-resources.md "B" schema — what a
  citation cites). Two kinds of source here:
  1. The Alexandria corpus's own Physiology practical sheet (a real `src_…` id,
     checked against docs/Alexandria-Source-Imports/evidence/corpus-source-index.json,
     which this folder already carries). Every field below is copied from that index,
     not typed from the file.
  2. The one catalogued standard textbook (RES-PHYS-GUYTON-14E), recorded as a source
     so a concept's `resource_ids` resolves against the evidence store — but never
     cited by a claim in this lane's evidence, because a citation's `support_span`
     must be the source's own words, quoted, and this lane cannot see the book's
     actual pages to quote them. `is_assessment: no` is not relevant to this one;
     `qualification` says what it is standing in for.
-->

# Item

## id
src_f5026e42c1d5c7361a7b

## title
Blood practical (Dr Eslam Abd-Elsalam)

## institution
Alexandria University Faculty of Medicine

## processing_status
native-text-extracted

## collection_id
au-y1

## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/Physiology/Practical/Dr Eslam/Blood practical  [from Alexandria University Updated].pdf

## source_uri

## media_type
application/pdf

## languages
en

## publication_date

## accessed_at

## page_count
50

## sha256
f5026e42c1d5c7361a7b2c27109a611b4ee00f62ee9bbd2dbc1feac99bbe5759

## rights
University teaching material (Physiology practical, AU-MED-103) held for internal extraction only. Not redistributable; no page image is published from it, only quoted teaching text within claim citations.

## qualification
The department's own Physiology practical instruction sheet for this module (CBC, ESR, haematocrit, blood grouping, bleeding time, coagulation time, PT/INR/aPTT) — the only Physiology-authored teaching text this module's corpus contains. Authoritative for the practical procedures and normal values it states; not a textbook of mechanism, which is why the mechanism-level concepts in this batch cite the general textbook resource instead.

## confidence
0.85

## is_assessment
no

---

# Item

## id
RES-PHYS-GUYTON-14E

## title
Guyton and Hall Textbook of Medical Physiology, 14th edition

## institution
Elsevier (John E. Hall, Michael E. Hall)

## processing_status
authoritative_article_level_reference

## collection_id

## source_relative_path

## source_uri

## media_type
application/pdf

## languages
en

## publication_date

## accessed_at

## page_count

## sha256

## rights
Copyrighted, commercially published textbook. Not held in the corpus; named here as a bibliographic reference only, never quoted.

## qualification
The standard, internationally used undergraduate physiology textbook, standing in for the department book this module's Physiology department does not have in the corpus. Authoritative at chapter level for the mechanisms it is named against (erythropoiesis/polycythaemia, haemoglobin-oxygen binding, blood-group/Rh mechanisms, natural anticoagulants, immunoglobulin classes) — no page-level claim is made from it anywhere in this lane's work, because the lane has not read the book's actual pages and cannot quote them verbatim. Every claim resting on this source alone is recorded `needs_evidence` with no citation, per 12-resources.md's own guidance for a source that cannot be quoted.

## confidence
0.5

## is_assessment
no

---

# Item

## id
src_49f438279b68a489aa42

## title
EOM - Blood End Egyptian 1 (Alexandria AU-MED-103 end-of-module paper)

## institution
Alexandria University Faculty of Medicine

## processing_status
native-text-extracted

## collection_id
au-y1

## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/Exams/EOM - Blood End Egyptian 1.pdf

## source_uri

## media_type
application/pdf

## languages
en

## publication_date

## accessed_at

## page_count
7

## sha256
49f438279b68a489aa42ad17f16d635eec05bc62ad5180e4c35c881aa1dc8ffe

## rights
University examination material held for internal extraction only. Not redistributable.

## qualification
An Alexandria University AU-MED-103 end-of-module examination paper (Egyptian stream). Curriculum-signal source: what the module actually examines, not an independent medical authority.

## confidence
0.9

## is_assessment
yes

---

# Item

## id
src_56bc398ce32f0140fc29

## title
EOM - Blood Final Egyptian final (Alexandria AU-MED-103 end-of-module paper)

## institution
Alexandria University Faculty of Medicine

## processing_status
native-text-extracted

## collection_id
au-y1

## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/Exams/EOM - Blood Final Egyptian final.pdf

## source_uri

## media_type
application/pdf

## languages
en

## publication_date

## accessed_at

## page_count
16

## sha256
56bc398ce32f0140fc292f2ab11921253b84bd65ce4fad4f9da5091225ae55a8

## rights
University examination material held for internal extraction only. Not redistributable.

## qualification
An Alexandria University AU-MED-103 end-of-module examination paper (Egyptian stream). Curriculum-signal source, not an independent medical authority.

## confidence
0.9

## is_assessment
yes

---

# Item

## id
src_c9c9ca53cfa1321d0508

## title
EOM - Blood end wafdeen final (Alexandria AU-MED-103 end-of-module paper)

## institution
Alexandria University Faculty of Medicine

## processing_status
native-text-extracted

## collection_id
au-y1

## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/Exams/EOM - Blood end wafdeen final.pdf

## source_uri

## media_type
application/pdf

## languages
en

## publication_date

## accessed_at

## page_count
11

## sha256
c9c9ca53cfa1321d0508356be4953144d6fa13812f8a82466f0c0c310538f213

## rights
University examination material held for internal extraction only. Not redistributable.

## qualification
An Alexandria University AU-MED-103 end-of-module examination paper (international/wafdeen stream). Curriculum-signal source, not an independent medical authority.

## confidence
0.9

## is_assessment
yes

---

# Item

## id
src_3e62e4d388493af88dbe

## title
MCQs - Blood practical

## institution
Alexandria University Faculty of Medicine

## processing_status
native-text-extracted

## collection_id
au-y1

## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/General/Practical/Questions/MCQs - Blood practical.pdf

## source_uri

## media_type
application/pdf

## languages
en

## publication_date

## accessed_at

## page_count
29

## sha256
3e62e4d388493af88dbe8b2814bc6832ddd3ccabd1d7656eba6d90f0409040cf

## rights
University examination material held for internal extraction only. Not redistributable.

## qualification
AU-MED-103's own Practical department-question bank, exported as an MS-Forms results review (each item shown with the student's marked answer and, on open items, the printed correct answer beneath it). Curriculum-signal source for real practical/department exam demand, not an independent medical authority — every fact this lane cites from it is corroborated by the department's own Physiology practical sheet (src_f5026e42c1d5c7361a7b) or a standard textbook.

## confidence
0.85

## is_assessment
yes

---

# Item

## id
src_4b9b0c4cf94fde15b14a

## title
MCQs - Practical Blood Questions

## institution
Alexandria University Faculty of Medicine

## processing_status
native-text-extracted

## collection_id
au-y1

## source_relative_path
y1/MED 103 - Blood and Immune System & Medical Terminology/Blood and Immune System/General/Practical/Questions/MCQs - Practical Blood Questions_20240329_051349_0000.pdf

## source_uri

## media_type
application/pdf

## languages
en

## publication_date

## accessed_at

## page_count
18

## sha256
4b9b0c4cf94fde15b14af087857c31ed3d5437ba1b5e88ba35ab076fcd9cbe77

## rights
University examination material held for internal extraction only. Not redistributable.

## qualification
AU-MED-103's own Practical "spot" department-question bank (three repeated sittings of ~9–13 numbered spot stations each, Physiology and other sections, each with a printed answer key). Curriculum-signal source for real practical exam demand, not an independent medical authority. Several spot items depend on a station image not available in this pass; only the image-independent sub-parts of each item are cited.

## confidence
0.85

## is_assessment
yes
