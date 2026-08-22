<!--
  AU-MED-103 Physiology · evidence source (12-resources.md "B" schema — what a
  citation cites, EVIDENCE_IMPORT_FIELDS.resource, 17 columns). Same id this
  lane's articles and concepts already cite as `resource_ids`: RES-PHYS-GUYTON-14E
  (grep confirms it in concept/AU-MED-103-physiology-concepts.md and
  article/AU-MED-103-physiology-articles.md) — unchanged.

  This file previously carried the "A" catalogue schema instead (subject/type/
  module_ids/included_concepts/topics/…, IMPORT_SCHEMAS.resource — what a
  student opens, imported at Bulk import -> resource). `detectBatchKind`
  (src/data/batchKind.ts) has no branch that shape can ever satisfy: it only
  returns 'resource' for `institution` + `processing_status`, which a catalogue
  row never carries. Every catalogue-shaped row therefore comes back 'unknown'
  from both `medical:batch` and `medical:simulate` (they share one detector),
  and since the row carries an `id`, simulate treats it as content nobody could
  place rather than a harmless skip — the "applies none of it — but it carries
  1 row(s)" error this file was raised over. Not a defect in the content, a
  schema mismatch: this folder (`docs/Alexandria-Source-Imports/evidence/`)
  is the "B" store, exactly as every sibling `*-resources.md` file here already
  is (AU-MED-102/103 biochemistry, embryology, histology, terminology).

  Rewritten below in that schema. It duplicates the RES-PHYS-GUYTON-14E record
  already carried in AU-MED-103-physiology-sources.md field for field (same
  book, same id) — both files upsert the same evidence-store entry, which is
  safe and by design (12-resources.md: "one PDF, one ID, two records" covers a
  shared id across records; an evidence source may equally be named from more
  than one department's evidence file without conflict, since import is
  id-keyed upsert, not append). The catalogue-only fields the original draft
  carried (`topics: SYS-HEM, SYS-IMM`; `included_concepts`: the nine physiology
  concepts CON-HEM-F8EE5FA3992E35, CON-HEM-5F0CEC52166316, CON-RES-361A5D87C12875,
  CON-HEM-A6BFFFDC813515, CON-HEM-8C0923AA0B718D, CON-HEM-99E8611BE4DED9,
  CON-IMM-79639CC2596E3F, CON-IMM-0D43795424CC5C, CON-IMM-A8B9F9AD0FB5E4;
  `included_articles`: ART-HEM-ERYTHROPOIESIS-RESPONSE, ART-RES-HB-OXYGEN-
  COORDINATION, ART-HEM-BLOODGROUPS-TRANSFUSION, ART-HEM-COAGULATION-CASCADE-
  BRAKES, ART-IMM-IMMUNOGLOBULIN-CLASSES; the `module_subject` paths under
  AU-MED-103 > Physiology) have no home in this 17-column contract — that
  content belongs to the separate catalogue-resource record (Bulk import ->
  resource, a different store, a different import page) this evidence pipeline
  does not author or validate. It is recorded here in prose, not lost, so
  whoever authors that catalogue record has the concept/article list in hand;
  it is not invented from scratch a second time.

  The `id` does not start `src_`, so it is never checked against
  `corpus-source-index.json` — same as a `RES-WEB-…` id, and correct: this
  book is not in the Alexandria corpus.
-->

# Item

## id
RES-PHYS-GUYTON-14E

## title
Guyton and Hall Textbook of Medical Physiology, 14th edition

## institution
Elsevier (John E. Hall, Michael E. Hall)

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

## processing_status
authoritative_article_level_reference

## rights
Copyrighted, commercially published textbook. Not held in the corpus; named here as a bibliographic reference only, never quoted.

## qualification
The standard, internationally used undergraduate physiology textbook, standing in for the department book this module's Physiology department does not have in the corpus (confirmed against the manifest: zero rows for departmentFolder "Physiology" carry category "Department Book" or "Lecture Slides" under AU-MED-103 — only four practical protocol sheets exist, which cover the laboratory-test topics instead and are cited directly as Alexandria corpus sources; see AU-MED-103-physiology-sources.md). Authoritative at chapter level for the mechanisms it is named against — erythropoiesis and polycythaemia, haemoglobin's oxygen-binding chemistry, blood-group/Rh compatibility mechanisms, natural anticoagulants, and immunoglobulin classes — for which no Alexandria corpus text exists. No page-level claim is made from it anywhere in this lane's evidence, because the lane cannot see the book's actual pages to quote them verbatim; every claim resting on it alone is recorded `needs_evidence` with no citation, per 12-resources.md's own guidance for a source that cannot be quoted. Named by this id in `resource_ids` on nine physiology concepts and five physiology articles in this module (see header note for the full list) — that catalogue-facing linkage is recorded here in prose because this 17-column evidence contract has no `included_concepts`/`included_articles`/`topics` columns to carry it in.

## confidence
0.5

## is_assessment
no
