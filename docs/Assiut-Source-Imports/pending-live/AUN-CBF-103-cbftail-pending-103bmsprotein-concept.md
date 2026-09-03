<!--
  Sparse overlay on one pending Kasr 103-BMS protein-metabolism concept,
  live only in that lane's unimported batch (docs/Kasr-Source-Imports/
  concept/103-BMS-mcq-protein-concepts.md, not yet mirrored to
  docs/import-ready/). Omar applies this file only after that Kasr batch is
  live -- id + canonical_key + only the overlay fields being appended
  (`+aun` / `+1` / `+AUN-CBF-103`), never a full record. Lane 4 (branch
  aun-cbf103-author4) reused CON-FND-880D165894A5EC (ammonia travels as
  glutamine from brain and alanine from muscle) for the brain-ammonia
  question.

  Apply after: the Kasr 103-BMS-mcq-protein-concepts.md batch above.
  Import: Admin > Concepts import. Then apply
  AUN-CBF-103-cbftail-pending-103bmsprotein-concept.md, then
  AUN-CBF-103-cbftail-pending-103bmsprotein-questions.md.
-->

# Item

## id
CON-FND-880D165894A5EC

## canonical_key
ammonia.transport-and-toxicity.glutamine-alanine-brain

## universities
+aun

## learner_years
+1

## modules
+AUN-CBF-103
