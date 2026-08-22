<!--
  AU-MED-103 Physiology · catalogue resource (12-resources.md "A" schema — what a
  student opens). This department has no teaching text of its own in the Alexandria
  corpus (no Department Book, no Lecture Slides row under departmentFolder ==
  "Physiology" for AU-MED-103 — see the triage). Per the chief-of-staff ruling on
  TRIAGE APPROVED, articles are authored against ONE catalogued standard physiology
  textbook instead, named by edition and chapter only — no page-level claim is made
  from it anywhere in this lane's evidence, because the lane cannot see the actual
  page to quote it verbatim.

  `npm run medical:batch` does not validate a catalogue-resource file (`detectKind`
  has no branch for it) — validate with `medical:simulate` only, per 12-resources.md.
  The `id` is not a corpus `src_…` (this book is not in the Alexandria corpus) and is
  therefore never checked against `corpus-source-index.json` — the validator's source
  check only fires on an id starting `src_`, exactly as it does for a `RES-WEB-…` id.
-->

# Item

## id
RES-PHYS-GUYTON-14E

## title
Guyton and Hall Textbook of Medical Physiology, 14th edition

## subject
haem

## type
Book

## source
Elsevier (John E. Hall, Michael E. Hall)

## status
Draft

## owner
Admin team

## url

## year
2020

## topics
SYS-HEM
SYS-IMM

## chapter
Unit VI: Blood Cells, Immunity, and Blood Clotting — Red Blood Cells, Anemia, and Polycythemia; Resistance of the Body to Infection: Leukocytes, Granulocytes, the Monocyte-Macrophage System, and Inflammation; Immunity and Allergy; Blood Types, Transfusion, and Tissue and Organ Transplantation; Hemostasis and Blood Coagulation

## module_ids
AU-MED-103

## module_subject
AU-MED-103 > Physiology > Erythropoiesis and polycythaemia
AU-MED-103 > Physiology > Haemoglobin and oxygen binding
AU-MED-103 > Physiology > Blood groups, Rh, and transfusion
AU-MED-103 > Physiology > Haemostasis: coagulation cascade and natural anticoagulants
AU-MED-103 > Physiology > Immunoglobulin classes and innate defence

## included_concepts
CON-HEM-F8EE5FA3992E35
CON-HEM-5F0CEC52166316
CON-RES-361A5D87C12875
CON-HEM-A6BFFFDC813515
CON-HEM-8C0923AA0B718D
CON-HEM-99E8611BE4DED9
CON-IMM-79639CC2596E3F
CON-IMM-0D43795424CC5C
CON-IMM-A8B9F9AD0FB5E4

## included_articles
ART-HEM-ERYTHROPOIESIS-RESPONSE
ART-RES-HB-OXYGEN-COORDINATION
ART-HEM-BLOODGROUPS-TRANSFUSION
ART-HEM-COAGULATION-CASCADE-BRAKES
ART-IMM-IMMUNOGLOBULIN-CLASSES

## concept_locations

## universities
au

## years
AU_Y1

## description
The standard, internationally used undergraduate physiology textbook, cited here by
edition and chapter only. This module's Physiology department has no department
book or lecture slides in the Alexandria corpus (confirmed against the manifest:
zero rows for departmentFolder "Physiology" carry category "Department Book" or
"Lecture Slides" under AU-MED-103) — only four practical protocol sheets, which
cover the laboratory-test topics (CBC, ESR, haematocrit, blood grouping, bleeding
and coagulation time) and are cited directly as Alexandria corpus sources instead
(see AU-MED-103-physiology-sources.md). This textbook covers the remaining
mechanism-level topics the module's exam papers test — erythropoiesis and
polycythaemia, haemoglobin's oxygen-binding chemistry, blood-group/Rh compatibility
mechanisms, natural anticoagulants, and immunoglobulin classes — for which no
Alexandria corpus text exists. No page-level locator is given anywhere against this
resource: the lane does not have the book's own pages in front of it to quote
verbatim, only its well-established chapter structure and content, so every claim
resting on it is recorded `needs_evidence` with no citation record, per
12-resources.md's own escape route ("record it in free text... weaker, but
honest") rather than inventing a page number or a quoted sentence.
