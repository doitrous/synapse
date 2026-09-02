<!--
  Repair pass (chief-of-staff ruling): lane 5's chapter-5 concept file
  originally minted three AUN-INI-105 concepts -- selective toxicity
  (CON-INF-BCEB5307771256), carrier state (CON-INF-B1C6C40BD3A509) and
  opportunistic pathogen (CON-INF-8B02B0EFEE96F5) -- after its own
  find-existing.mjs search turned up a same-grain pending sibling for each
  and recorded the sibling under `rejected_merge_candidate_ids` "to keep a
  single ASU-INF dependency." That is not what rejected-merge is for: a
  genuine duplicate is an overlay, not a rejected-merge note, and a
  module's pending-dependency list simply grows as needed. All three
  siblings were re-read this pass and confirmed genuinely the same concept
  as the twin AUN mint (same core fact, same grain -- see each row's
  canonical_key below); the three AUN twins have been deleted from
  concept/AUN-INI-105-ch5-concepts.md and article/AUN-INI-105-ch5-article.md
  (their annotation blocks and related_concepts/related_concept_ids entries
  removed or repointed to the sibling id), and the six ch5 questions that
  referenced them (Q4, Q28, Q43, Q50 -- selective toxicity; Q36 main +
  Q38 contextual -- carrier state; Q39 -- opportunistic pathogen) are
  repointed onto the sibling ids in coverage/seeds/AUN-INI-105/
  ini-mcq-ch5-part1.json and re-emitted into
  question/AUN-INI-105-ch5-mcq.md.

  Sparse overlay only -- id + canonical_key + the overlay fields being
  appended (`+aun` / `+1` / `+AUN-INI-105`), never a full record, never a
  short `module_subject`.

  Apply after: 1) docs/Helwan-Source-Imports/concept/
  HU-BMS-102-microbiology-family11-part1-concepts.md (selective toxicity,
  row 1), 2) docs/MUST-Source-Imports/concept/
  FHB-102-2-microbiology-introduction-concepts.md (carrier state and
  opportunistic pathogen, rows 2-3). Import: Admin > Concepts import. Then
  apply this file. The already-applied AUN-INI-105-ch5-mcq.md batch (or,
  if not yet applied, apply it after this file) then carries the repointed
  concept_ids for Q4/Q28/Q36/Q38/Q39/Q43/Q50 automatically -- no separate
  question re-import needed beyond the normal ch5 chain.
-->

# Item

## id
CON-INF-05D590078F3DCC

## canonical_key
antimicrobial-selective-toxicity-definition

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-C4C74A0874FF61

## canonical_key
microbiology.infection.carrier-state-asymptomatic-shedding

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-17893AA3303251

## canonical_key
microbiology.opportunism.opportunistic-pathogen-definition

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---
