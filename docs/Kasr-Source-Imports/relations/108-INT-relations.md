<!--
  Typed concept relations for module 108 INT (Pathology + Pharmacology), Kasr Al
  Ainy Year 1.

  Sources: docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md (49
  concepts), 108-INT-concepts-pharmacology.md (40 concepts) and
  108-INT-concepts-pharmacology-updates.md (9 update rows against live
  concepts). Every edge below was named as "owed to a relations batch" on its
  source concept's own field_notes.relationships note at authoring time; this
  batch discharges those notes into typed edges now that the module has a
  claim and a citation for every one of its 89 new concepts
  (evidence/108-INT-claims.md, evidence/108-INT-citations.md).

  Evidence choice. Each edge's evidence_claim_ids/citation_ids point at the
  claim (and its citation(s)) belonging to whichever endpoint's own atomic
  claim most directly supports the assertion the edge makes -- usually the
  causal or defining side of the relation. Where one endpoint is a live
  concept being updated rather than a newly authored one (the nine
  CON-FND-... ids from 108-INT-concepts-pharmacology-updates.md, plus four
  live concepts outside this module's own concept files --
  CON-IMM-7EC2CFBC19A9E9, CON-NEU-7AE49F0DB2D418, CON-GIT-2D2709CD4D9A17,
  CON-DER-6665EA8EA687C3, each verified live against
  server/data/medical-library-v1.json before use), the claim from the
  authored side of the pair is used, since the live side has no new claim in
  this batch.

  Symmetric types (often_confused_with, contrasts_with, associated_with) are
  written as two rows, one per direction, per 03-relationships.md.

  Not written. A small number of field_notes hints were dropped rather than
  turned into edges:
    - CON-FND-E9DDE81591D0A7 and CON-FND-1712C0F57AAD45's own notes say
      explicitly that a typed edge here would be valueless or that no type in
      the 26 fits ("is the framework for").
    - CON-FND-0BE3CE88A36BB5: the book does not map disease classification
      onto the cell-injury records, so no edge was invented.
    - Two of CON-FND-70554B38361679 and CON-FND-2D8B89A2F75643's proposed
      often_confused_with edges named CON-FND-7650D31963FEBD ("live 101 ISK
      practical concepts" per the note) -- verified against live state and
      that id does not exist. Both edges were dropped rather than guessed at.
    - Where two concepts' own field_notes proposed two different relation
      types for the same source/target pair (a real inconsistency between how
      each side described the same fact -- e.g. CON-FND-42F34977A8DF23 called
      its edge to CON-FND-A1FC8CB691E6C5 prerequisite_of while
      CON-FND-A1FC8CB691E6C5's own note called the same pair caused_by), the
      more specific/causal type was kept and the vaguer duplicate was not
      written, to avoid two rows asserting different things about one pair.
    - "caused_by" is not one of the 26 relation types; every field_notes use
      of that word was inverted to a forward `causes` row.
-->

# Item

## source
CON-FND-D53E254A82F334

## type
prerequisite_of

## target
CON-FND-DF726F864C8BC3

## evidence_claim_ids
CLM-FND-CELL-STRESS-OUTCOMES-01

## citation_ids
CIT-108-CELL-STRESS-OUTCOMES-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D53E254A82F334

## type
prerequisite_of

## target
CON-FND-2DDF56DA42A0A8

## evidence_claim_ids
CLM-FND-CELL-STRESS-OUTCOMES-01

## citation_ids
CIT-108-CELL-STRESS-OUTCOMES-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D53E254A82F334

## type
prerequisite_of

## target
CON-FND-4CD77608FB35DF

## evidence_claim_ids
CLM-FND-CELL-STRESS-OUTCOMES-01

## citation_ids
CIT-108-CELL-STRESS-OUTCOMES-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D53E254A82F334

## type
prerequisite_of

## target
CON-FND-11D3CBC654E7F3

## evidence_claim_ids
CLM-FND-CELL-STRESS-OUTCOMES-01

## citation_ids
CIT-108-CELL-STRESS-OUTCOMES-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-063F60318B4D20

## type
is_a

## target
CON-FND-DF726F864C8BC3

## evidence_claim_ids
CLM-FND-BROWN-ATROPHY-01

## citation_ids
CIT-108-BROWN-ATROPHY-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8989A49BEBCF14

## type
causes

## target
CON-FND-375B9454502DE8

## evidence_claim_ids
CLM-FND-HYPOXIA-CAUSES-01

## citation_ids
CIT-108-HYPOXIA-CAUSES-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8989A49BEBCF14

## type
causes

## target
CON-FND-5285A9707E61CA

## evidence_claim_ids
CLM-FND-HYPOXIA-CAUSES-01

## citation_ids
CIT-108-HYPOXIA-CAUSES-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8989A49BEBCF14

## type
causes

## target
CON-FND-A0BC07E35554B1

## evidence_claim_ids
CLM-FND-HYPOXIA-CAUSES-01

## citation_ids
CIT-108-HYPOXIA-CAUSES-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-375B9454502DE8

## type
mechanism_step_before

## target
CON-FND-2DDF56DA42A0A8

## evidence_claim_ids
CLM-FND-ATP-DEPLETION-EFFECTS-01

## citation_ids
CIT-108-ATP-DEPLETION-EFFECTS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-375B9454502DE8

## type
mechanism_step_before

## target
CON-FND-2126819970522D

## evidence_claim_ids
CLM-FND-ATP-DEPLETION-EFFECTS-01

## citation_ids
CIT-108-ATP-DEPLETION-EFFECTS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-7B96FFE8FC4285

## type
causes

## target
CON-FND-2A370D3EF3EDCF

## evidence_claim_ids
CLM-FND-OXIDATIVE-STRESS-01

## citation_ids
CIT-108-OXIDATIVE-STRESS-01 | CIT-108-OXIDATIVE-STRESS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-7B96FFE8FC4285

## type
mechanism_step_before

## target
CON-FND-2126819970522D

## evidence_claim_ids
CLM-FND-OXIDATIVE-STRESS-01

## citation_ids
CIT-108-OXIDATIVE-STRESS-01 | CIT-108-OXIDATIVE-STRESS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-2126819970522D

## type
mechanism_step_before

## target
CON-FND-4CD77608FB35DF

## evidence_claim_ids
CLM-FND-REPERFUSION-FREE-RADICALS-01

## citation_ids
CIT-108-REPERFUSION-FREE-RADICALS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3B89025E2FB4E0

## type
part_of

## target
CON-FND-2DDF56DA42A0A8

## evidence_claim_ids
CLM-FND-STEATOSIS-DEFINITION-01

## citation_ids
CIT-108-STEATOSIS-DEFINITION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-4CD77608FB35DF

## type
often_confused_with

## target
CON-FND-11D3CBC654E7F3

## evidence_claim_ids
CLM-FND-NECROSIS-DEFINITION-01

## citation_ids
CIT-108-NECROSIS-DEFINITION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-11D3CBC654E7F3

## type
often_confused_with

## target
CON-FND-4CD77608FB35DF

## evidence_claim_ids
CLM-FND-APOPTOSIS-DEFINITION-01

## citation_ids
CIT-108-APOPTOSIS-DEFINITION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-4CD77608FB35DF

## type
causes

## target
CON-FND-33466CEBFC4EBA

## evidence_claim_ids
CLM-FND-NECROSIS-DEFINITION-01

## citation_ids
CIT-108-NECROSIS-DEFINITION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8DA30AD870AC1E

## type
part_of

## target
CON-FND-4CD77608FB35DF

## evidence_claim_ids
CLM-FND-NECROSIS-MORPHOLOGY-01

## citation_ids
CIT-108-NECROSIS-MORPHOLOGY-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8DA30AD870AC1E

## type
contrasts_with

## target
CON-FND-46B3AD5A2D8294

## evidence_claim_ids
CLM-FND-NECROSIS-MORPHOLOGY-01

## citation_ids
CIT-108-NECROSIS-MORPHOLOGY-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-46B3AD5A2D8294

## type
contrasts_with

## target
CON-FND-8DA30AD870AC1E

## evidence_claim_ids
CLM-FND-APOPTOSIS-MORPHOLOGY-01

## citation_ids
CIT-108-APOPTOSIS-MORPHOLOGY-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-5285A9707E61CA

## type
contrasts_with

## target
CON-FND-88508ABAB84A67

## evidence_claim_ids
CLM-FND-COAGULATIVE-NECROSIS-01

## citation_ids
CIT-108-COAGULATIVE-NECROSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-88508ABAB84A67

## type
contrasts_with

## target
CON-FND-5285A9707E61CA

## evidence_claim_ids
CLM-FND-LIQUEFACTIVE-NECROSIS-01

## citation_ids
CIT-108-LIQUEFACTIVE-NECROSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-5B3B6BA12670C7

## type
causes

## target
CON-FND-33466CEBFC4EBA

## evidence_claim_ids
CLM-FND-CASEATION-NECROSIS-01

## citation_ids
CIT-108-CASEATION-NECROSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-6626C19B61A23B

## type
causes

## target
CON-FND-33466CEBFC4EBA

## evidence_claim_ids
CLM-FND-FAT-NECROSIS-01

## citation_ids
CIT-108-FAT-NECROSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-6626C19B61A23B

## type
often_confused_with

## target
CON-FND-3B89025E2FB4E0

## evidence_claim_ids
CLM-FND-FAT-NECROSIS-01

## citation_ids
CIT-108-FAT-NECROSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3B89025E2FB4E0

## type
often_confused_with

## target
CON-FND-6626C19B61A23B

## evidence_claim_ids
CLM-FND-STEATOSIS-DEFINITION-01

## citation_ids
CIT-108-STEATOSIS-DEFINITION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-BA0739479AD0FC

## type
often_confused_with

## target
CON-FND-5CB8B822A9A6AF

## evidence_claim_ids
CLM-FND-FIBRINOID-NECROSIS-01

## citation_ids
CIT-108-FIBRINOID-NECROSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-5CB8B822A9A6AF

## type
often_confused_with

## target
CON-FND-BA0739479AD0FC

## evidence_claim_ids
CLM-FND-HYALINE-CHANGE-01

## citation_ids
CIT-108-HYALINE-CHANGE-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-11D3CBC654E7F3

## type
contrasts_with

## target
CON-IMM-7EC2CFBC19A9E9

## evidence_claim_ids
CLM-FND-APOPTOSIS-DEFINITION-01

## citation_ids
CIT-108-APOPTOSIS-DEFINITION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-IMM-7EC2CFBC19A9E9

## type
contrasts_with

## target
CON-FND-11D3CBC654E7F3

## evidence_claim_ids
CLM-FND-APOPTOSIS-DEFINITION-01

## citation_ids
CIT-108-APOPTOSIS-DEFINITION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-C6661CBD045436

## type
mechanism_step_before

## target
CON-FND-46B3AD5A2D8294

## evidence_claim_ids
CLM-FND-APOPTOSIS-CONTROL-01

## citation_ids
CIT-108-APOPTOSIS-CONTROL-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-C6661CBD045436

## type
part_of

## target
CON-FND-11D3CBC654E7F3

## evidence_claim_ids
CLM-FND-APOPTOSIS-CONTROL-01

## citation_ids
CIT-108-APOPTOSIS-CONTROL-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-A40D59DAB245EA

## type
associated_with

## target
CON-FND-D955408D228002

## evidence_claim_ids
CLM-FND-APOPTOSIS-CAUSES-01

## citation_ids
CIT-108-APOPTOSIS-CAUSES-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D955408D228002

## type
associated_with

## target
CON-FND-A40D59DAB245EA

## evidence_claim_ids
CLM-FND-AMYLOID-DEFINITION-01

## citation_ids
CIT-108-AMYLOID-DEFINITION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3B89025E2FB4E0

## type
part_of

## target
CON-FND-0A32C902A825AA

## evidence_claim_ids
CLM-FND-STEATOSIS-DEFINITION-01

## citation_ids
CIT-108-STEATOSIS-DEFINITION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3BB4FF8F2223FF

## type
part_of

## target
CON-FND-0A32C902A825AA

## evidence_claim_ids
CLM-FND-CHOLESTEROL-ACCUMULATION-01

## citation_ids
CIT-108-CHOLESTEROL-ACCUMULATION-01 | CIT-108-CHOLESTEROL-ACCUMULATION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-5CB8B822A9A6AF

## type
part_of

## target
CON-FND-0A32C902A825AA

## evidence_claim_ids
CLM-FND-HYALINE-CHANGE-01

## citation_ids
CIT-108-HYALINE-CHANGE-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-2D8B89A2F75643

## type
part_of

## target
CON-FND-0A32C902A825AA

## evidence_claim_ids
CLM-FND-GLYCOGEN-ACCUMULATION-01

## citation_ids
CIT-108-GLYCOGEN-ACCUMULATION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-2A370D3EF3EDCF

## type
part_of

## target
CON-FND-0A32C902A825AA

## evidence_claim_ids
CLM-FND-LIPOFUSCIN-01

## citation_ids
CIT-108-LIPOFUSCIN-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-AA9A76DBB4EE6B

## type
part_of

## target
CON-FND-0A32C902A825AA

## evidence_claim_ids
CLM-FND-MELANIN-01

## citation_ids
CIT-108-MELANIN-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-5DBC795B58DC74

## type
part_of

## target
CON-FND-0A32C902A825AA

## evidence_claim_ids
CLM-FND-HEMOSIDERIN-01

## citation_ids
CIT-108-HEMOSIDERIN-01 | CIT-108-HEMOSIDERIN-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-C96C66BC1A17DF

## type
part_of

## target
CON-FND-0A32C902A825AA

## evidence_claim_ids
CLM-FND-HEMOZOIN-01

## citation_ids
CIT-108-HEMOZOIN-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-57B12823E95B52

## type
is_a

## target
CON-FND-0A32C902A825AA

## evidence_claim_ids
CLM-FND-ANTHRACOSIS-01

## citation_ids
CIT-108-ANTHRACOSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-A0BC07E35554B1

## type
mechanism_step_before

## target
CON-FND-70554B38361679

## evidence_claim_ids
CLM-FND-HEPATIC-STEATOSIS-PATHOGENESIS-01

## citation_ids
CIT-108-HEPATIC-STEATOSIS-PATHOGENESIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-A0BC07E35554B1

## type
part_of

## target
CON-FND-3B89025E2FB4E0

## evidence_claim_ids
CLM-FND-HEPATIC-STEATOSIS-PATHOGENESIS-01

## citation_ids
CIT-108-HEPATIC-STEATOSIS-PATHOGENESIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-70554B38361679

## type
contrasts_with

## target
CON-FND-00024C3C0A7C4F

## evidence_claim_ids
CLM-FND-FATTY-LIVER-MORPHOLOGY-01

## citation_ids
CIT-108-FATTY-LIVER-MORPHOLOGY-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-00024C3C0A7C4F

## type
contrasts_with

## target
CON-FND-70554B38361679

## evidence_claim_ids
CLM-FND-HEPATIC-SPLENIC-AMYLOIDOSIS-01

## citation_ids
CIT-108-HEPATIC-SPLENIC-AMYLOIDOSIS-01 | CIT-108-HEPATIC-SPLENIC-AMYLOIDOSIS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-4354823564BAB3

## type
contrasts_with

## target
CON-FND-063F60318B4D20

## evidence_claim_ids
CLM-FND-MYOCARDIAL-FATTY-CHANGE-01

## citation_ids
CIT-108-MYOCARDIAL-FATTY-CHANGE-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-063F60318B4D20

## type
contrasts_with

## target
CON-FND-4354823564BAB3

## evidence_claim_ids
CLM-FND-BROWN-ATROPHY-01

## citation_ids
CIT-108-BROWN-ATROPHY-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3BB4FF8F2223FF

## type
prerequisite_of

## target
CON-FND-33466CEBFC4EBA

## evidence_claim_ids
CLM-FND-CHOLESTEROL-ACCUMULATION-01

## citation_ids
CIT-108-CHOLESTEROL-ACCUMULATION-01 | CIT-108-CHOLESTEROL-ACCUMULATION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-2A370D3EF3EDCF

## type
part_of

## target
CON-FND-063F60318B4D20

## evidence_claim_ids
CLM-FND-LIPOFUSCIN-01

## citation_ids
CIT-108-LIPOFUSCIN-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-AA9A76DBB4EE6B

## type
contrasts_with

## target
CON-DER-6665EA8EA687C3

## evidence_claim_ids
CLM-FND-MELANIN-01

## citation_ids
CIT-108-MELANIN-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-6665EA8EA687C3

## type
contrasts_with

## target
CON-FND-AA9A76DBB4EE6B

## evidence_claim_ids
CLM-FND-MELANIN-01

## citation_ids
CIT-108-MELANIN-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-AA9A76DBB4EE6B

## type
associated_with

## target
CON-FND-B9A3C8B28B1443

## evidence_claim_ids
CLM-FND-MELANIN-01

## citation_ids
CIT-108-MELANIN-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-B9A3C8B28B1443

## type
associated_with

## target
CON-FND-AA9A76DBB4EE6B

## evidence_claim_ids
CLM-FND-HAEMOCHROMATOSIS-01

## citation_ids
CIT-108-HAEMOCHROMATOSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-5DBC795B58DC74

## type
prerequisite_of

## target
CON-FND-B9A3C8B28B1443

## evidence_claim_ids
CLM-FND-HEMOSIDERIN-01

## citation_ids
CIT-108-HEMOSIDERIN-01 | CIT-108-HEMOSIDERIN-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-5DBC795B58DC74

## type
often_confused_with

## target
CON-FND-C96C66BC1A17DF

## evidence_claim_ids
CLM-FND-HEMOSIDERIN-01

## citation_ids
CIT-108-HEMOSIDERIN-01 | CIT-108-HEMOSIDERIN-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-C96C66BC1A17DF

## type
often_confused_with

## target
CON-FND-5DBC795B58DC74

## evidence_claim_ids
CLM-FND-HEMOZOIN-01

## citation_ids
CIT-108-HEMOZOIN-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-B9A3C8B28B1443

## type
is_a

## target
CON-FND-5DBC795B58DC74

## evidence_claim_ids
CLM-FND-HAEMOCHROMATOSIS-01

## citation_ids
CIT-108-HAEMOCHROMATOSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-33466CEBFC4EBA

## type
often_confused_with

## target
CON-FND-87392C49DB246C

## evidence_claim_ids
CLM-FND-DYSTROPHIC-CALCIFICATION-01

## citation_ids
CIT-108-DYSTROPHIC-CALCIFICATION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-87392C49DB246C

## type
often_confused_with

## target
CON-FND-33466CEBFC4EBA

## evidence_claim_ids
CLM-FND-METASTATIC-CALCIFICATION-01

## citation_ids
CIT-108-METASTATIC-CALCIFICATION-01 | CIT-108-METASTATIC-CALCIFICATION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D955408D228002

## type
often_confused_with

## target
CON-FND-5CB8B822A9A6AF

## evidence_claim_ids
CLM-FND-AMYLOID-DEFINITION-01

## citation_ids
CIT-108-AMYLOID-DEFINITION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-5CB8B822A9A6AF

## type
often_confused_with

## target
CON-FND-D955408D228002

## evidence_claim_ids
CLM-FND-HYALINE-CHANGE-01

## citation_ids
CIT-108-HYALINE-CHANGE-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8151AE03EA25C5

## type
prerequisite_of

## target
CON-FND-E3F496F6DDD7C3

## evidence_claim_ids
CLM-FND-AMYLOID-PROTEIN-TYPES-01

## citation_ids
CIT-108-AMYLOID-PROTEIN-TYPES-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-E3F496F6DDD7C3

## type
contrasts_with

## target
CON-FND-42A1BD1A1DAAE6

## evidence_claim_ids
CLM-FND-SYSTEMIC-AMYLOIDOSIS-01

## citation_ids
CIT-108-SYSTEMIC-AMYLOIDOSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-42A1BD1A1DAAE6

## type
contrasts_with

## target
CON-FND-E3F496F6DDD7C3

## evidence_claim_ids
CLM-FND-LOCALIZED-AMYLOIDOSIS-01

## citation_ids
CIT-108-LOCALIZED-AMYLOIDOSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-699152CE450385

## type
part_of

## target
CON-FND-E3F496F6DDD7C3

## evidence_claim_ids
CLM-FND-RENAL-AMYLOIDOSIS-01

## citation_ids
CIT-108-RENAL-AMYLOIDOSIS-01 | CIT-108-RENAL-AMYLOIDOSIS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-00024C3C0A7C4F

## type
part_of

## target
CON-FND-E3F496F6DDD7C3

## evidence_claim_ids
CLM-FND-HEPATIC-SPLENIC-AMYLOIDOSIS-01

## citation_ids
CIT-108-HEPATIC-SPLENIC-AMYLOIDOSIS-01 | CIT-108-HEPATIC-SPLENIC-AMYLOIDOSIS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-13BFC600597FD6

## type
part_of

## target
CON-FND-E3F496F6DDD7C3

## evidence_claim_ids
CLM-FND-CARDIAC-GI-AMYLOIDOSIS-01

## citation_ids
CIT-108-CARDIAC-GI-AMYLOIDOSIS-01 | CIT-108-CARDIAC-GI-AMYLOIDOSIS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-42A1BD1A1DAAE6

## type
contrasts_with

## target
CON-NEU-7AE49F0DB2D418

## evidence_claim_ids
CLM-FND-LOCALIZED-AMYLOIDOSIS-01

## citation_ids
CIT-108-LOCALIZED-AMYLOIDOSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-7AE49F0DB2D418

## type
contrasts_with

## target
CON-FND-42A1BD1A1DAAE6

## evidence_claim_ids
CLM-FND-LOCALIZED-AMYLOIDOSIS-01

## citation_ids
CIT-108-LOCALIZED-AMYLOIDOSIS-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D955408D228002

## type
diagnosed_by

## target
CON-FND-4867DD3814D088

## evidence_claim_ids
CLM-FND-CONGO-RED-01

## citation_ids
CIT-108-CONGO-RED-01 | CIT-108-CONGO-RED-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8151AE03EA25C5

## type
diagnosed_by

## target
CON-FND-4867DD3814D088

## evidence_claim_ids
CLM-FND-CONGO-RED-01

## citation_ids
CIT-108-CONGO-RED-01 | CIT-108-CONGO-RED-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-E3F496F6DDD7C3

## type
diagnosed_by

## target
CON-FND-4867DD3814D088

## evidence_claim_ids
CLM-FND-CONGO-RED-01

## citation_ids
CIT-108-CONGO-RED-01 | CIT-108-CONGO-RED-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-42A1BD1A1DAAE6

## type
diagnosed_by

## target
CON-FND-4867DD3814D088

## evidence_claim_ids
CLM-FND-CONGO-RED-01

## citation_ids
CIT-108-CONGO-RED-01 | CIT-108-CONGO-RED-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-699152CE450385

## type
diagnosed_by

## target
CON-FND-4867DD3814D088

## evidence_claim_ids
CLM-FND-CONGO-RED-01

## citation_ids
CIT-108-CONGO-RED-01 | CIT-108-CONGO-RED-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-00024C3C0A7C4F

## type
diagnosed_by

## target
CON-FND-4867DD3814D088

## evidence_claim_ids
CLM-FND-CONGO-RED-01

## citation_ids
CIT-108-CONGO-RED-01 | CIT-108-CONGO-RED-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-13BFC600597FD6

## type
diagnosed_by

## target
CON-FND-4867DD3814D088

## evidence_claim_ids
CLM-FND-CONGO-RED-01

## citation_ids
CIT-108-CONGO-RED-01 | CIT-108-CONGO-RED-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-4867DD3814D088

## type
prerequisite_of

## target
CON-FND-A69F39242D6698

## evidence_claim_ids
CLM-FND-CONGO-RED-01

## citation_ids
CIT-108-CONGO-RED-01 | CIT-108-CONGO-RED-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-699152CE450385

## type
prerequisite_of

## target
CON-FND-A69F39242D6698

## evidence_claim_ids
CLM-FND-RENAL-AMYLOIDOSIS-01

## citation_ids
CIT-108-RENAL-AMYLOIDOSIS-01 | CIT-108-RENAL-AMYLOIDOSIS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-13BFC600597FD6

## type
contrasts_with

## target
CON-FND-063F60318B4D20

## evidence_claim_ids
CLM-FND-CARDIAC-GI-AMYLOIDOSIS-01

## citation_ids
CIT-108-CARDIAC-GI-AMYLOIDOSIS-01 | CIT-108-CARDIAC-GI-AMYLOIDOSIS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-063F60318B4D20

## type
contrasts_with

## target
CON-FND-13BFC600597FD6

## evidence_claim_ids
CLM-FND-BROWN-ATROPHY-01

## citation_ids
CIT-108-BROWN-ATROPHY-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-6BB35F11EBD54B

## type
prerequisite_of

## target
CON-FND-584FCF6897C35E

## evidence_claim_ids
CLM-FND-PK-VS-PD-01

## citation_ids
CIT-108-PHARM-PK-VS-PD-01 | CIT-108-PHARM-PK-VS-PD-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-6BB35F11EBD54B

## type
prerequisite_of

## target
CON-FND-1A18E2FEA47B37

## evidence_claim_ids
CLM-FND-PK-VS-PD-01

## citation_ids
CIT-108-PHARM-PK-VS-PD-01 | CIT-108-PHARM-PK-VS-PD-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-584FCF6897C35E

## type
prerequisite_of

## target
CON-FND-F2DD5E50875917

## evidence_claim_ids
CLM-FND-SIMPLE-DIFFUSION-01

## citation_ids
CIT-108-PHARM-SIMPLE-DIFFUSION-01 | CIT-108-PHARM-SIMPLE-DIFFUSION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-584FCF6897C35E

## type
prerequisite_of

## target
CON-FND-CF40F32A8A74A0

## evidence_claim_ids
CLM-FND-SIMPLE-DIFFUSION-01

## citation_ids
CIT-108-PHARM-SIMPLE-DIFFUSION-01 | CIT-108-PHARM-SIMPLE-DIFFUSION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-584FCF6897C35E

## type
prerequisite_of

## target
CON-FND-040D2633B0A2FE

## evidence_claim_ids
CLM-FND-SIMPLE-DIFFUSION-01

## citation_ids
CIT-108-PHARM-SIMPLE-DIFFUSION-01 | CIT-108-PHARM-SIMPLE-DIFFUSION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-584FCF6897C35E

## type
prerequisite_of

## target
CON-FND-53FF18E42BC94B

## evidence_claim_ids
CLM-FND-SIMPLE-DIFFUSION-01

## citation_ids
CIT-108-PHARM-SIMPLE-DIFFUSION-01 | CIT-108-PHARM-SIMPLE-DIFFUSION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-584FCF6897C35E

## type
prerequisite_of

## target
CON-FND-88101C454AAF1D

## evidence_claim_ids
CLM-FND-SIMPLE-DIFFUSION-01

## citation_ids
CIT-108-PHARM-SIMPLE-DIFFUSION-01 | CIT-108-PHARM-SIMPLE-DIFFUSION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-584FCF6897C35E

## type
prerequisite_of

## target
CON-FND-67D5E471045317

## evidence_claim_ids
CLM-FND-SIMPLE-DIFFUSION-01

## citation_ids
CIT-108-PHARM-SIMPLE-DIFFUSION-01 | CIT-108-PHARM-SIMPLE-DIFFUSION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-584FCF6897C35E

## type
contrasts_with

## target
CON-FND-9D7D3A5B015805

## evidence_claim_ids
CLM-FND-SIMPLE-DIFFUSION-01

## citation_ids
CIT-108-PHARM-SIMPLE-DIFFUSION-01 | CIT-108-PHARM-SIMPLE-DIFFUSION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-9D7D3A5B015805

## type
contrasts_with

## target
CON-FND-584FCF6897C35E

## evidence_claim_ids
CLM-FND-CARRIER-TRANSPORT-01

## citation_ids
CIT-108-PHARM-CARRIER-TRANSPORT-01 | CIT-108-PHARM-CARRIER-TRANSPORT-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-9D7D3A5B015805

## type
prerequisite_of

## target
CON-FND-88101C454AAF1D

## evidence_claim_ids
CLM-FND-CARRIER-TRANSPORT-01

## citation_ids
CIT-108-PHARM-CARRIER-TRANSPORT-01 | CIT-108-PHARM-CARRIER-TRANSPORT-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-9D7D3A5B015805

## type
prerequisite_of

## target
CON-FND-01E59D0FD26046

## evidence_claim_ids
CLM-FND-CARRIER-TRANSPORT-01

## citation_ids
CIT-108-PHARM-CARRIER-TRANSPORT-01 | CIT-108-PHARM-CARRIER-TRANSPORT-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-ED16C95CE71A4B

## type
causes

## target
CON-FND-97E55D75DE9ED1

## evidence_claim_ids
CLM-FND-PKA-PH-IONIZATION-01

## citation_ids
CIT-108-PHARM-PKA-01 | CIT-108-PHARM-PKA-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-ED16C95CE71A4B

## type
mechanism_step_before

## target
CON-FND-F2DD5E50875917

## evidence_claim_ids
CLM-FND-PKA-PH-IONIZATION-01

## citation_ids
CIT-108-PHARM-PKA-01 | CIT-108-PHARM-PKA-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-97E55D75DE9ED1

## type
mechanism_step_before

## target
CON-FND-88101C454AAF1D

## evidence_claim_ids
CLM-FND-ION-TRAPPING-01

## citation_ids
CIT-108-PHARM-ION-TRAPPING-01 | CIT-108-PHARM-ION-TRAPPING-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-F2DD5E50875917

## type
mechanism_step_before

## target
CON-FND-CF40F32A8A74A0

## evidence_claim_ids
CLM-FND-ORAL-ABSORPTION-FACTORS-01

## citation_ids
CIT-108-PHARM-ORAL-ABSORPTION-01 | CIT-108-PHARM-ORAL-ABSORPTION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-F2DD5E50875917

## type
part_of

## target
CON-FND-3CC8853A7D6DA8

## evidence_claim_ids
CLM-FND-ORAL-ABSORPTION-FACTORS-01

## citation_ids
CIT-108-PHARM-ORAL-ABSORPTION-01 | CIT-108-PHARM-ORAL-ABSORPTION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-450B67836EBF1A

## type
causes

## target
CON-FND-CF40F32A8A74A0

## evidence_claim_ids
CLM-FND-ENZYME-INDUCTION-INHIBITION-01

## citation_ids
CIT-108-PHARM-INDUCTION-01 | CIT-108-PHARM-INDUCTION-02 | CIT-108-PHARM-INDUCTION-03

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-CF40F32A8A74A0

## type
prerequisite_of

## target
CON-FND-3CC8853A7D6DA8

## evidence_claim_ids
CLM-FND-BIOAVAILABILITY-01

## citation_ids
CIT-108-PHARM-BIOAVAILABILITY-01 | CIT-108-PHARM-BIOAVAILABILITY-02 | CIT-108-PHARM-BIOAVAILABILITY-03

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-040D2633B0A2FE

## type
prerequisite_of

## target
CON-FND-CBA2A73AE9A6D8

## evidence_claim_ids
CLM-FND-DISTRIBUTION-PATTERNS-01

## citation_ids
CIT-108-PHARM-DISTRIBUTION-PATTERNS-01 | CIT-108-PHARM-DISTRIBUTION-PATTERNS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-040D2633B0A2FE

## type
prerequisite_of

## target
CON-FND-43BED56FA9D1E9

## evidence_claim_ids
CLM-FND-DISTRIBUTION-PATTERNS-01

## citation_ids
CIT-108-PHARM-DISTRIBUTION-PATTERNS-01 | CIT-108-PHARM-DISTRIBUTION-PATTERNS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-040D2633B0A2FE

## type
prerequisite_of

## target
CON-FND-FD53CFAE6AAC72

## evidence_claim_ids
CLM-FND-DISTRIBUTION-PATTERNS-01

## citation_ids
CIT-108-PHARM-DISTRIBUTION-PATTERNS-01 | CIT-108-PHARM-DISTRIBUTION-PATTERNS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-53FF18E42BC94B

## type
prerequisite_of

## target
CON-FND-040D2633B0A2FE

## evidence_claim_ids
CLM-FND-DISTRIBUTION-FACTORS-01

## citation_ids
CIT-108-PHARM-DISTRIBUTION-FACTORS-01 | CIT-108-PHARM-DISTRIBUTION-FACTORS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-53FF18E42BC94B

## type
mechanism_step_before

## target
CON-FND-7F618A3D1F940B

## evidence_claim_ids
CLM-FND-DISTRIBUTION-FACTORS-01

## citation_ids
CIT-108-PHARM-DISTRIBUTION-FACTORS-01 | CIT-108-PHARM-DISTRIBUTION-FACTORS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3CECD012838275

## type
is_a

## target
CON-FND-53FF18E42BC94B

## evidence_claim_ids
CLM-FND-BARRIER-PASSAGE-01

## citation_ids
CIT-108-PHARM-BARRIER-BBB-01 | CIT-108-PHARM-BARRIER-BBB-02 | CIT-108-PHARM-BARRIER-PLACENTA-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-C3B843D7032C7F

## type
prerequisite_of

## target
CON-FND-44B6AE3E7DDA55

## evidence_claim_ids
CLM-FND-METABOLISM-SITES-01

## citation_ids
CIT-108-PHARM-METABOLISM-SITES-01 | CIT-108-PHARM-METABOLISM-SITES-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-C3B843D7032C7F

## type
part_of

## target
CON-FND-CF40F32A8A74A0

## evidence_claim_ids
CLM-FND-METABOLISM-SITES-01

## citation_ids
CIT-108-PHARM-METABOLISM-SITES-01 | CIT-108-PHARM-METABOLISM-SITES-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-44B6AE3E7DDA55

## type
prerequisite_of

## target
CON-FND-E34035C5B4FF80

## evidence_claim_ids
CLM-FND-METABOLISM-PHASES-01

## citation_ids
CIT-108-PHARM-METABOLISM-PHASES-01 | CIT-108-PHARM-METABOLISM-PHASES-02 | CIT-108-PHARM-METABOLISM-PHASES-03

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-E34035C5B4FF80

## type
prerequisite_of

## target
CON-FND-450B67836EBF1A

## evidence_claim_ids
CLM-FND-MICROSOMAL-ENZYMES-01

## citation_ids
CIT-108-PHARM-MICROSOMAL-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-450B67836EBF1A

## type
causes

## target
CON-FND-7F618A3D1F940B

## evidence_claim_ids
CLM-FND-ENZYME-INDUCTION-INHIBITION-01

## citation_ids
CIT-108-PHARM-INDUCTION-01 | CIT-108-PHARM-INDUCTION-02 | CIT-108-PHARM-INDUCTION-03

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-450B67836EBF1A

## type
causes

## target
CON-FND-A1FC8CB691E6C5

## evidence_claim_ids
CLM-FND-ENZYME-INDUCTION-INHIBITION-01

## citation_ids
CIT-108-PHARM-INDUCTION-01 | CIT-108-PHARM-INDUCTION-02 | CIT-108-PHARM-INDUCTION-03

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-01E59D0FD26046

## type
part_of

## target
CON-FND-88101C454AAF1D

## evidence_claim_ids
CLM-FND-RENAL-EXCRETION-01

## citation_ids
CIT-108-PHARM-RENAL-EXCRETION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-88101C454AAF1D

## type
prerequisite_of

## target
CON-FND-87C323BB0CE321

## evidence_claim_ids
CLM-FND-RENAL-EXCRETION-01

## citation_ids
CIT-108-PHARM-RENAL-EXCRETION-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-67D5E471045317

## type
mechanism_step_before

## target
CON-FND-9D89A82094F8AA

## evidence_claim_ids
CLM-FND-NON-RENAL-EXCRETION-01

## citation_ids
CIT-108-PHARM-NON-RENAL-01 | CIT-108-PHARM-NON-RENAL-02 | CIT-108-PHARM-NON-RENAL-03

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-67D5E471045317

## type
associated_with

## target
CON-FND-3CECD012838275

## evidence_claim_ids
CLM-FND-NON-RENAL-EXCRETION-01

## citation_ids
CIT-108-PHARM-NON-RENAL-01 | CIT-108-PHARM-NON-RENAL-02 | CIT-108-PHARM-NON-RENAL-03

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3CECD012838275

## type
associated_with

## target
CON-FND-67D5E471045317

## evidence_claim_ids
CLM-FND-BARRIER-PASSAGE-01

## citation_ids
CIT-108-PHARM-BARRIER-BBB-01 | CIT-108-PHARM-BARRIER-BBB-02 | CIT-108-PHARM-BARRIER-PLACENTA-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-BB7BEEC27836BE

## type
prerequisite_of

## target
CON-FND-955AD7B6FE6F03

## evidence_claim_ids
CLM-FND-FIRST-ZERO-ORDER-01

## citation_ids
CIT-108-PHARM-FIRST-ZERO-ORDER-01 | CIT-108-PHARM-FIRST-ZERO-ORDER-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-BB7BEEC27836BE

## type
prerequisite_of

## target
CON-FND-7A66C16BA5029C

## evidence_claim_ids
CLM-FND-FIRST-ZERO-ORDER-01

## citation_ids
CIT-108-PHARM-FIRST-ZERO-ORDER-01 | CIT-108-PHARM-FIRST-ZERO-ORDER-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-87C323BB0CE321

## type
causes

## target
CON-FND-955AD7B6FE6F03

## evidence_claim_ids
CLM-FND-PLASMA-HALF-LIFE-01

## citation_ids
CIT-108-PHARM-HALF-LIFE-01 | CIT-108-PHARM-HALF-LIFE-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-CBA2A73AE9A6D8

## type
causes

## target
CON-FND-955AD7B6FE6F03

## evidence_claim_ids
CLM-FND-PLASMA-HALF-LIFE-01

## citation_ids
CIT-108-PHARM-HALF-LIFE-01 | CIT-108-PHARM-HALF-LIFE-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-955AD7B6FE6F03

## type
prerequisite_of

## target
CON-FND-3D0ACE759233EC

## evidence_claim_ids
CLM-FND-PLASMA-HALF-LIFE-01

## citation_ids
CIT-108-PHARM-HALF-LIFE-01 | CIT-108-PHARM-HALF-LIFE-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3D0ACE759233EC

## type
prerequisite_of

## target
CON-FND-3CC86CC26BF549

## evidence_claim_ids
CLM-FND-HALF-LIFE-APPLICATIONS-01

## citation_ids
CIT-108-PHARM-HALF-LIFE-APPLICATIONS-01 | CIT-108-PHARM-HALF-LIFE-APPLICATIONS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3D0ACE759233EC

## type
causes

## target
CON-FND-7A66C16BA5029C

## evidence_claim_ids
CLM-FND-HALF-LIFE-APPLICATIONS-01

## citation_ids
CIT-108-PHARM-HALF-LIFE-APPLICATIONS-01 | CIT-108-PHARM-HALF-LIFE-APPLICATIONS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-7A66C16BA5029C

## type
prerequisite_of

## target
CON-FND-7F59EAD61B05E0

## evidence_claim_ids
CLM-FND-STEADY-STATE-01

## citation_ids
CIT-108-PHARM-STEADY-STATE-01 | CIT-108-PHARM-STEADY-STATE-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-1A18E2FEA47B37

## type
prerequisite_of

## target
CON-FND-38CD8C0BD5B4DE

## evidence_claim_ids
CLM-FND-DRUG-ACTION-MECHANISMS-01

## citation_ids
CIT-108-PHARM-MECHANISMS-01 | CIT-108-PHARM-MECHANISMS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-1A18E2FEA47B37

## type
prerequisite_of

## target
CON-FND-42F34977A8DF23

## evidence_claim_ids
CLM-FND-DRUG-ACTION-MECHANISMS-01

## citation_ids
CIT-108-PHARM-MECHANISMS-01 | CIT-108-PHARM-MECHANISMS-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-38CD8C0BD5B4DE

## type
often_confused_with

## target
CON-FND-17149EED384DCA

## evidence_claim_ids
CLM-FND-RECEPTOR-AFFINITY-01

## citation_ids
CIT-108-PHARM-RECEPTOR-DEF-01 | CIT-108-PHARM-RECEPTOR-DEF-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-17149EED384DCA

## type
often_confused_with

## target
CON-FND-38CD8C0BD5B4DE

## evidence_claim_ids
CLM-FND-POTENCY-VS-EFFICACY-01

## citation_ids
CIT-108-PHARM-POTENCY-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-38CD8C0BD5B4DE

## type
prerequisite_of

## target
CON-FND-4388E0D8A75FD4

## evidence_claim_ids
CLM-FND-RECEPTOR-AFFINITY-01

## citation_ids
CIT-108-PHARM-RECEPTOR-DEF-01 | CIT-108-PHARM-RECEPTOR-DEF-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-17149EED384DCA

## type
prerequisite_of

## target
CON-FND-138FC0AB7A3461

## evidence_claim_ids
CLM-FND-POTENCY-VS-EFFICACY-01

## citation_ids
CIT-108-PHARM-POTENCY-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-4388E0D8A75FD4

## type
is_a

## target
CON-FND-38CD8C0BD5B4DE

## evidence_claim_ids
CLM-FND-LIGAND-TYPES-01

## citation_ids
CIT-108-PHARM-LIGAND-TYPES-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-4388E0D8A75FD4

## type
prerequisite_of

## target
CON-FND-138FC0AB7A3461

## evidence_claim_ids
CLM-FND-LIGAND-TYPES-01

## citation_ids
CIT-108-PHARM-LIGAND-TYPES-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-138FC0AB7A3461

## type
prerequisite_of

## target
CON-FND-390F2D9EC3D6DC

## evidence_claim_ids
CLM-FND-COMPETITIVE-ANTAGONISM-01

## citation_ids
CIT-108-PHARM-COMPETITIVE-01 | CIT-108-PHARM-COMPETITIVE-02 | CIT-108-PHARM-COMPETITIVE-03 | CIT-108-PHARM-COMPETITIVE-04

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-390F2D9EC3D6DC

## type
is_a

## target
CON-FND-138FC0AB7A3461

## evidence_claim_ids
CLM-FND-IRREVERSIBLE-ANTAGONISM-01

## citation_ids
CIT-108-PHARM-IRREVERSIBLE-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-390F2D9EC3D6DC

## type
often_confused_with

## target
CON-FND-955AD7B6FE6F03

## evidence_claim_ids
CLM-FND-IRREVERSIBLE-ANTAGONISM-01

## citation_ids
CIT-108-PHARM-IRREVERSIBLE-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-955AD7B6FE6F03

## type
often_confused_with

## target
CON-FND-390F2D9EC3D6DC

## evidence_claim_ids
CLM-FND-PLASMA-HALF-LIFE-01

## citation_ids
CIT-108-PHARM-HALF-LIFE-01 | CIT-108-PHARM-HALF-LIFE-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-42F34977A8DF23

## type
causes

## target
CON-FND-A1FC8CB691E6C5

## evidence_claim_ids
CLM-FND-RECEPTOR-TYPES-01

## citation_ids
CIT-108-PHARM-RECEPTOR-TYPES-01 | CIT-108-PHARM-RECEPTOR-TYPES-02 | CIT-108-PHARM-RECEPTOR-TYPES-03 | CIT-108-PHARM-RECEPTOR-TYPES-04 | CIT-108-PHARM-RECEPTOR-TYPES-05 | CIT-108-PHARM-RECEPTOR-TYPES-06

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D957928472CA57

## type
prerequisite_of

## target
CON-FND-062BA29B028382

## evidence_claim_ids
CLM-FND-ADR-CLASSIFICATION-01

## citation_ids
CIT-108-PHARM-ADR-CLASS-01 | CIT-108-PHARM-ADR-CLASS-02 | CIT-108-PHARM-ADR-CLASS-03 | CIT-108-PHARM-ADR-CLASS-04

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D957928472CA57

## type
prerequisite_of

## target
CON-FND-7FFD028F1C7B58

## evidence_claim_ids
CLM-FND-ADR-CLASSIFICATION-01

## citation_ids
CIT-108-PHARM-ADR-CLASS-01 | CIT-108-PHARM-ADR-CLASS-02 | CIT-108-PHARM-ADR-CLASS-03 | CIT-108-PHARM-ADR-CLASS-04

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D957928472CA57

## type
prerequisite_of

## target
CON-FND-2A5DE8657047E4

## evidence_claim_ids
CLM-FND-ADR-CLASSIFICATION-01

## citation_ids
CIT-108-PHARM-ADR-CLASS-01 | CIT-108-PHARM-ADR-CLASS-02 | CIT-108-PHARM-ADR-CLASS-03 | CIT-108-PHARM-ADR-CLASS-04

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-062BA29B028382

## type
is_a

## target
CON-FND-D957928472CA57

## evidence_claim_ids
CLM-FND-ADR-TYPE-A-B-01

## citation_ids
CIT-108-PHARM-ADR-TYPE-A-01 | CIT-108-PHARM-ADR-TYPE-B-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-062BA29B028382

## type
often_confused_with

## target
CON-FND-7FFD028F1C7B58

## evidence_claim_ids
CLM-FND-ADR-TYPE-A-B-01

## citation_ids
CIT-108-PHARM-ADR-TYPE-A-01 | CIT-108-PHARM-ADR-TYPE-B-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-7FFD028F1C7B58

## type
often_confused_with

## target
CON-FND-062BA29B028382

## evidence_claim_ids
CLM-FND-ALLERGY-IDIOSYNCRASY-01

## citation_ids
CIT-108-PHARM-ALLERGY-01 | CIT-108-PHARM-ALLERGY-02 | CIT-108-PHARM-IDIOSYNCRASY-01 | CIT-108-PHARM-SUPERSENSITIVITY-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-A1FC8CB691E6C5

## type
causes

## target
CON-FND-57E821D46F016D

## evidence_claim_ids
CLM-FND-ACQUIRED-TOLERANCE-01

## citation_ids
CIT-108-PHARM-TOLERANCE-01 | CIT-108-PHARM-TOLERANCE-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-57E821D46F016D

## type
causes

## target
CON-FND-2A5DE8657047E4

## evidence_claim_ids
CLM-FND-DRUG-DEPENDENCE-01

## citation_ids
CIT-108-PHARM-DEPENDENCE-01 | CIT-108-PHARM-DEPENDENCE-02 | CIT-108-PHARM-DEPENDENCE-03 | CIT-108-PHARM-DEPENDENCE-04

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-7F618A3D1F940B

## type
prerequisite_of

## target
CON-FND-CE72B2E63A736B

## evidence_claim_ids
CLM-FND-DRUG-INTERACTION-TYPES-01

## citation_ids
CIT-108-PHARM-DI-TYPES-01 | CIT-108-PHARM-DI-TYPES-02 | CIT-108-PHARM-DI-TYPES-03 | CIT-108-PHARM-DI-TYPES-04

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-CE72B2E63A736B

## type
is_a

## target
CON-FND-7F618A3D1F940B

## evidence_claim_ids
CLM-FND-DRUG-COMBINATION-RESULTS-01

## citation_ids
CIT-108-PHARM-COMBINATION-01 | CIT-108-PHARM-COMBINATION-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-A1E2092A49359C

## type
contrasts_with

## target
CON-FND-138FC0AB7A3461

## evidence_claim_ids
CLM-FND-CHEMICAL-PHYSIOLOGICAL-ANTAGONISM-01

## citation_ids
CIT-108-PHARM-ANTAGONISM-01 | CIT-108-PHARM-ANTAGONISM-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-138FC0AB7A3461

## type
contrasts_with

## target
CON-FND-A1E2092A49359C

## evidence_claim_ids
CLM-FND-COMPETITIVE-ANTAGONISM-01

## citation_ids
CIT-108-PHARM-COMPETITIVE-01 | CIT-108-PHARM-COMPETITIVE-02 | CIT-108-PHARM-COMPETITIVE-03 | CIT-108-PHARM-COMPETITIVE-04

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-A1E2092A49359C

## type
is_a

## target
CON-FND-7F618A3D1F940B

## evidence_claim_ids
CLM-FND-CHEMICAL-PHYSIOLOGICAL-ANTAGONISM-01

## citation_ids
CIT-108-PHARM-ANTAGONISM-01 | CIT-108-PHARM-ANTAGONISM-02

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-BB0DBAE1BC802B

## type
prerequisite_of

## target
CON-FND-D957928472CA57

## evidence_claim_ids
CLM-FND-THERAPEUTIC-INDEX-01

## citation_ids
CIT-108-PHARM-THERAPEUTIC-INDEX-01 | CIT-108-PHARM-THERAPEUTIC-INDEX-02 | CIT-108-PHARM-THERAPEUTIC-INDEX-03

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-6A60CE8D2E7C5C

## type
prerequisite_of

## target
CON-FND-3CC8853A7D6DA8

## evidence_claim_ids
CLM-FND-ROUTES-ENUMERATED-01

## citation_ids
CIT-108-PHARM-ROUTES-01 | CIT-108-PHARM-ROUTES-02 | CIT-108-PHARM-ROUTES-03 | CIT-108-PHARM-ROUTES-04 | CIT-108-PHARM-ROUTES-05 | CIT-108-PHARM-ROUTES-06

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-6A60CE8D2E7C5C

## type
prerequisite_of

## target
CON-FND-6235934A8DD0FE

## evidence_claim_ids
CLM-FND-ROUTES-ENUMERATED-01

## citation_ids
CIT-108-PHARM-ROUTES-01 | CIT-108-PHARM-ROUTES-02 | CIT-108-PHARM-ROUTES-03 | CIT-108-PHARM-ROUTES-04 | CIT-108-PHARM-ROUTES-05 | CIT-108-PHARM-ROUTES-06

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-6235934A8DD0FE

## type
mechanism_step_before

## target
CON-FND-7A66C16BA5029C

## evidence_claim_ids
CLM-FND-IV-TYPES-01

## citation_ids
CIT-108-PHARM-IV-TYPES-01

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---
