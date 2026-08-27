<!--
  Throwaway fixture article for the scripts/asu toolchain proof. Never a real
  Ain Shams article — never move this into docs/Ain-Shams-Source-Imports/.
  See scripts/asu/README.md.
-->

# Item
## id
ART-FIX-0000000000
## title
What a fixture record is, and why this toolchain mints one
## subject
fnd
## status
Draft
## owner
Claude
## topic
Toolchain proof
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
asu
## years
Year 1
## module
ASU-FIXTURE
## module_subject
ASU-FIXTURE > Foundations > Fixture Topic
## primary_node_id
SYS-FND-T01
## secondary_node_ids
[clear]
## related_concepts
CON-FND-A9A4D15983C214 | CON-FND-7D20B6C6A6B3C1
## related_articles

## aliases
Fixture article | Toolchain proof article
## reading_time
2
## summary
This article exists only to prove that the scripts/asu toolchain can build, validate and simulate a full concept-article-question authoring set for a stub module before any real Ain Shams content is authored. It is never imported into the live library.
## sections
### Definition
A fixture record in this toolchain is a deliberately throwaway concept, article or question, minted against the stub module `ASU-FIXTURE`, used only to prove the pipeline mints valid batches, that a second build is byte-identical to the first, and that the concept ID salt change (canonical key alone, no module or university) reproduces exactly what `tools/mint-concept-id.mjs` computes for the same input.

### Mechanism
`build-batches.ts` reads a fixture paper seed and a fixture MCQ leaf from `scripts/asu/fixtures/`, mints a concept ID for each canonical key, and emits either a full concept record or a sparse update record depending on whether that ID already has a home elsewhere. This article is the fixture's own "1 article" — referenced by `related_concepts` so the concept batch and the article batch are proven together, the way the manual requires: concepts, articles and questions are one authoring set, not three phases.

### Key determinants
There is nothing to determine — this is a fixture, not a teaching article. The section exists because `TPL-CONCEPT` requires it, and the fixture's job is to exercise the validator's real requirements rather than to dodge them.

### Clinical significance
None. A fixture record carries no clinical content and is never imported into the live library — see `scripts/asu/README.md` for how this file is used and torn down.
## field_notes
arabicTitle: Not researched — this is a throwaway fixture, never a real article, so Arabic terminology is deliberately not written for it.
