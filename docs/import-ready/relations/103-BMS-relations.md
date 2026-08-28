<!--
  103 BMS relations — anatomy (lower limb), biochemistry (bioenergetics,
  carbohydrate/lipid/amino-acid/nucleotide metabolism, heme), histology
  (cartilage/bone/muscle/skin structure) and physiology (membrane
  excitability, action-potential phases, neuromuscular transmission,
  excitation-contraction coupling).

  Every edge's evidence_claim_ids names a real claim belonging to one of
  its two endpoints (verified programmatically: each chosen claim's own
  concept_id equals either source or target, never a third concept).
  citation_ids + verification_status: verified are added only where that
  claim already has a citation in one of the 103 BMS evidence files;
  every other row is honestly needs_evidence, per 03-relationships.md's
  rule that setting verified without a citation is refused at import.

  No `## id` (derived as rel-<source>-<type>-<target>, idempotent).
  No `## field_notes` (relations carry no such column).
  Symmetric types (often_confused_with, contrasts_with, associated_with,
  accompanies) are written as two rows, one per direction, sharing the
  same evidence.

  Import: Admin > Relationships > Import.
-->

# Item

## source
CON-MSK-594BD65D8C0D7A

## type
part_of

## target
CON-MSK-59755B64721E3D

## evidence_claim_ids
CLM-A698944F73A9

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-700EC3AB121997

## type
part_of

## target
CON-MSK-59755B64721E3D

## evidence_claim_ids
CLM-4498DEABFD70

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-6F2C49EFF66B46

## type
part_of

## target
CON-MSK-59755B64721E3D

## evidence_claim_ids
CLM-6B0371685BB1

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-32B5B7A5CD2A27

## type
often_confused_with

## target
CON-MSK-C7BC26EBAF066B

## evidence_claim_ids
CLM-MSK-PERONEUS-LONGUS-01

## citation_ids
CIT-KA-ANAT-PERONEUS-LONGUS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-C7BC26EBAF066B

## type
often_confused_with

## target
CON-MSK-32B5B7A5CD2A27

## evidence_claim_ids
CLM-MSK-CPN-MOTOR-01

## citation_ids
CIT-KA-ANAT-CPN-MOTOR-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-959D95DCE2E022

## type
prerequisite_of

## target
CON-MSK-D30F43945FC3C2

## evidence_claim_ids
CLM-A4DA05E11F55

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-0696B3F764DABC

## type
part_of

## target
CON-MSK-9E550B805ACC9F

## evidence_claim_ids
CLM-MSK-POST-TIBIAL-BRANCHES-01

## citation_ids
CIT-KA-ANAT-POST-TIBIAL-BRANCHES-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-D622CBF981F879

## type
prerequisite_of

## target
CON-MSK-51EC648BDAF36B

## evidence_claim_ids
CLM-MSK-SCIATIC-COURSE-01

## citation_ids
CIT-KA-ANAT-SCIATIC-COURSE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-AB5318A9255811

## type
causes

## target
CON-MSK-C7BC26EBAF066B

## evidence_claim_ids
CLM-MSK-CPN-INJURY-01

## citation_ids
CIT-KA-ANAT-CPN-INJURY-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-016DE81C5919CE

## type
complication_of

## target
CON-MSK-AB5318A9255811

## evidence_claim_ids
CLM-MSK-CPN-DEFORMITY-01

## citation_ids
CIT-KA-ANAT-CPN-DEFORMITY-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-0351AAD4CAB1EE

## type
part_of

## target
CON-MSK-AB5318A9255811

## evidence_claim_ids
CLM-MSK-CPN-CUTANEOUS-01

## citation_ids
CIT-KA-ANAT-CPN-CUTANEOUS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-D622CBF981F879

## type
supplies

## target
CON-MSK-3EE23956EE2DDB

## evidence_claim_ids
CLM-MSK-SCIATIC-COURSE-01

## citation_ids
CIT-KA-ANAT-SCIATIC-COURSE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-51EC648BDAF36B

## type
supplies

## target
CON-MSK-3EE23956EE2DDB

## evidence_claim_ids
CLM-MSK-SCIATIC-BRANCHES-01

## citation_ids
CIT-KA-ANAT-SCIATIC-BRANCHES-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-BBBD5662711A93

## type
prerequisite_of

## target
CON-MSK-9B1204D74AF4FF

## evidence_claim_ids
CLM-1BE009330909

## citation_ids
CIT-BD30DBADD986

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-D30F43945FC3C2

## type
associated_with

## target
CON-MSK-9B1204D74AF4FF

## evidence_claim_ids
CLM-MSK-HIP-MOVEMENTS-01

## citation_ids
CIT-KA-ANAT-HIP-MOVEMENTS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-9B1204D74AF4FF

## type
associated_with

## target
CON-MSK-D30F43945FC3C2

## evidence_claim_ids
CLM-FC16C4FB3BD9

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-C4AD88B60ADDB8

## type
prerequisite_of

## target
CON-MSK-F5196760C3DB9C

## evidence_claim_ids
CLM-A34400222B6C

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-C4AD88B60ADDB8

## type
often_confused_with

## target
CON-MSK-016DE81C5919CE

## evidence_claim_ids
CLM-C943C3705409

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-016DE81C5919CE

## type
often_confused_with

## target
CON-MSK-C4AD88B60ADDB8

## evidence_claim_ids
CLM-MSK-CPN-DEFORMITY-01

## citation_ids
CIT-KA-ANAT-CPN-DEFORMITY-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-F5196760C3DB9C

## type
often_confused_with

## target
CON-MSK-C7BC26EBAF066B

## evidence_claim_ids
CLM-9E8ED03A1F03

## citation_ids
CIT-1F017A33657D

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-C7BC26EBAF066B

## type
often_confused_with

## target
CON-MSK-F5196760C3DB9C

## evidence_claim_ids
CLM-MSK-CPN-MOTOR-01

## citation_ids
CIT-KA-ANAT-CPN-MOTOR-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-F5196760C3DB9C

## type
often_confused_with

## target
CON-MSK-016DE81C5919CE

## evidence_claim_ids
CLM-D34C0CE08575

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-016DE81C5919CE

## type
often_confused_with

## target
CON-MSK-F5196760C3DB9C

## evidence_claim_ids
CLM-MSK-CPN-DEFORMITY-01

## citation_ids
CIT-KA-ANAT-CPN-DEFORMITY-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-32B5B7A5CD2A27

## type
part_of

## target
CON-MSK-F5196760C3DB9C

## evidence_claim_ids
CLM-MSK-PERONEUS-LONGUS-01

## citation_ids
CIT-KA-ANAT-PERONEUS-LONGUS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-47A1A46432D3E0

## type
often_confused_with

## target
CON-MSK-E812B745282A3A

## evidence_claim_ids
CLM-706B1DF2C6D9

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-E812B745282A3A

## type
often_confused_with

## target
CON-MSK-47A1A46432D3E0

## evidence_claim_ids
CLM-E2E8BAB4AB55

## citation_ids
CIT-AC28ACB1C756

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-47A1A46432D3E0

## type
part_of

## target
CON-MSK-E77A7FF7843CF2

## evidence_claim_ids
CLM-B4850F8B2DE2

## citation_ids
CIT-9A872DAA40B1

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-E812B745282A3A

## type
part_of

## target
CON-MSK-E77A7FF7843CF2

## evidence_claim_ids
CLM-E4FF5C61117B

## citation_ids
CIT-BC3221287D48

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DEV-EAF577AD3F3C53

## type
prerequisite_of

## target
CON-DEV-59689788046B4E

## evidence_claim_ids
CLM-CFA3FD4FC96D

## citation_ids
CIT-1897E0DA86D6

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DEV-EAF577AD3F3C53

## type
complication_of

## target
CON-DEV-7A9E2385A26A8B

## evidence_claim_ids
CLM-CEA595613485

## citation_ids
CIT-21F386994F36

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-7228237A5897B5

## type
mechanism_step_before

## target
CON-FND-6B7241CD9F3C42

## evidence_claim_ids
CLM-FND-HIGH-ENERGY-BONDS-01

## citation_ids
CIT-KA-BIO103-HIGH-ENERGY-BONDS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-6B7241CD9F3C42

## type
mechanism_step_before

## target
CON-FND-9D5F6458F68D4B

## evidence_claim_ids
CLM-FND-ATP-ADP-CYCLE-01

## citation_ids
CIT-KA-BIO103-ATP-ADP-CYCLE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-9D5F6458F68D4B

## type
mechanism_step_before

## target
CON-FND-8771AB893CA4C3

## evidence_claim_ids
CLM-FND-ANABOLISM-CATABOLISM-01

## citation_ids
CIT-KA-BIO103-ANABOLISM-CATABOLISM-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8771AB893CA4C3

## type
mechanism_step_before

## target
CON-FND-A3BC299ED2C7C9

## evidence_claim_ids
CLM-FND-REDOX-TERMINAL-ACCEPTOR-01

## citation_ids
CIT-KA-BIO103-REDOX-TERMINAL-ACCEPTOR-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-A3BC299ED2C7C9

## type
mechanism_step_before

## target
CON-FND-0CA8047810DF78

## evidence_claim_ids
CLM-FND-ETC-COMPONENTS-01

## citation_ids
CIT-KA-BIO103-ETC-COMPONENTS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-0CA8047810DF78

## type
mechanism_step_before

## target
CON-FND-C3CB859E560A18

## evidence_claim_ids
CLM-FND-CHEMIOSMOSIS-01

## citation_ids
CIT-KA-BIO103-CHEMIOSMOSIS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-C3CB859E560A18

## type
mechanism_step_before

## target
CON-FND-5253967A0E3786

## evidence_claim_ids
CLM-FND-UNCOUPLERS-01

## citation_ids
CIT-KA-BIO103-UNCOUPLERS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-5253967A0E3786

## type
mechanism_step_before

## target
CON-FND-037BF052DDFC0D

## evidence_claim_ids
CLM-FND-SUBSTRATE-LEVEL-PHOSPHORYLATION-01

## citation_ids
CIT-KA-BIO103-SUBSTRATE-LEVEL-PHOSPHORYLATION-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-BCCBDEC637795A

## type
part_of

## target
CON-FND-037BF052DDFC0D

## evidence_claim_ids
CLM-FND-TCA-SITE-01

## citation_ids
CIT-KA-BIO103-TCA-SITE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8F8B3EF0763399

## type
part_of

## target
CON-FND-037BF052DDFC0D

## evidence_claim_ids
CLM-FND-TCA-OXALOACETATE-01

## citation_ids
CIT-KA-BIO103-TCA-OXALOACETATE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-9420F608039B74

## type
part_of

## target
CON-FND-037BF052DDFC0D

## evidence_claim_ids
CLM-FND-TCA-YIELD-01

## citation_ids
CIT-KA-BIO103-TCA-YIELD-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8ADE222FBB57B2

## type
part_of

## target
CON-FND-037BF052DDFC0D

## evidence_claim_ids
CLM-FND-TCA-AMPHIBOLIC-01

## citation_ids
CIT-KA-BIO103-TCA-AMPHIBOLIC-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-F9CE11670992CE

## type
part_of

## target
CON-FND-037BF052DDFC0D

## evidence_claim_ids
CLM-FND-TCA-INHIBITORS-01

## citation_ids
CIT-KA-BIO103-TCA-INHIBITORS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-037BF052DDFC0D

## type
mechanism_step_before

## target
CON-FND-A3BC299ED2C7C9

## evidence_claim_ids
CLM-FND-KREBS-KEY-ENZYMES-01

## citation_ids
CIT-KA-BIO103-KREBS-KEY-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-GIT-E43BAB1EBDEBE6

## type
mechanism_step_before

## target
CON-FND-E9C3C98FA0388C

## evidence_claim_ids
CLM-GIT-CARBOHYDRATE-DIGESTION-01

## citation_ids
CIT-KA-BIO103-CARBOHYDRATE-DIGESTION-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-E9C3C98FA0388C

## type
mechanism_step_before

## target
CON-FND-EA1BA37ACB643B

## evidence_claim_ids
CLM-FND-GLUCOSE-TRANSPORTERS-01

## citation_ids
CIT-KA-BIO103-GLUCOSE-TRANSPORTERS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-EA1BA37ACB643B

## type
mechanism_step_before

## target
CON-FND-853096A349FFBD

## evidence_claim_ids
CLM-FND-HEXOKINASE-GLUCOKINASE-01

## citation_ids
CIT-KA-BIO103-HEXOKINASE-GLUCOKINASE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-853096A349FFBD

## type
mechanism_step_before

## target
CON-FND-0F4A45886203EF

## evidence_claim_ids
CLM-FND-GLYCOLYSIS-COMMITTED-STEP-01

## citation_ids
CIT-KA-BIO103-GLYCOLYSIS-COMMITTED-STEP-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-853096A349FFBD

## type
prerequisite_of

## target
CON-FND-0D6BFD870813B7

## evidence_claim_ids
CLM-FND-GLYCOLYSIS-COMMITTED-STEP-01

## citation_ids
CIT-KA-BIO103-GLYCOLYSIS-COMMITTED-STEP-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-853096A349FFBD

## type
prerequisite_of

## target
CON-HEM-585B833F845F62

## evidence_claim_ids
CLM-FND-GLYCOLYSIS-COMMITTED-STEP-01

## citation_ids
CIT-KA-BIO103-GLYCOLYSIS-COMMITTED-STEP-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-0F4A45886203EF

## type
mechanism_step_before

## target
CON-FND-403D06D1FB129F

## evidence_claim_ids
CLM-FND-GLYCOLYSIS-YIELD-01

## citation_ids
CIT-KA-BIO103-GLYCOLYSIS-YIELD-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-403D06D1FB129F

## type
mechanism_step_before

## target
CON-FND-229C78C9EB0E78

## evidence_claim_ids
CLM-FND-ANAEROBIC-LACTATE-01

## citation_ids
CIT-KA-BIO103-ANAEROBIC-LACTATE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-229C78C9EB0E78

## type
mechanism_step_before

## target
CON-FND-037BF052DDFC0D

## evidence_claim_ids
CLM-FND-PDH-COMPLEX-01

## citation_ids
CIT-KA-BIO103-PDH-COMPLEX-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-229C78C9EB0E78

## type
contrasts_with

## target
CON-FND-CA0F9E019BC5BA

## evidence_claim_ids
CLM-FND-PDH-COMPLEX-01

## citation_ids
CIT-KA-BIO103-PDH-COMPLEX-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-CA0F9E019BC5BA

## type
contrasts_with

## target
CON-FND-229C78C9EB0E78

## evidence_claim_ids
CLM-FND-PYRUVATE-CARBOXYLASE-01

## citation_ids
CIT-KA-BIO103-PYRUVATE-CARBOXYLASE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-CA0F9E019BC5BA

## type
mechanism_step_before

## target
CON-FND-C2C88203E4A918

## evidence_claim_ids
CLM-FND-PYRUVATE-CARBOXYLASE-01

## citation_ids
CIT-KA-BIO103-PYRUVATE-CARBOXYLASE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-1FC7D932D7EFDC

## type
contrasts_with

## target
CON-FND-3905E3B98C2EC4

## evidence_claim_ids
CLM-FND-GLYCOGENESIS-UDP-GLUCOSE-01

## citation_ids
CIT-KA-BIO103-GLYCOGENESIS-UDP-GLUCOSE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3905E3B98C2EC4

## type
contrasts_with

## target
CON-FND-1FC7D932D7EFDC

## evidence_claim_ids
CLM-FND-GLYCOGENOLYSIS-PRODUCT-01

## citation_ids
CIT-KA-BIO103-GLYCOGENOLYSIS-PRODUCT-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-1FC7D932D7EFDC

## type
prerequisite_of

## target
CON-FND-CA74978B7B7ED1

## evidence_claim_ids
CLM-FND-GLYCOGENESIS-UDP-GLUCOSE-01

## citation_ids
CIT-KA-BIO103-GLYCOGENESIS-UDP-GLUCOSE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3905E3B98C2EC4

## type
prerequisite_of

## target
CON-FND-CA74978B7B7ED1

## evidence_claim_ids
CLM-FND-GLYCOGENOLYSIS-PRODUCT-01

## citation_ids
CIT-KA-BIO103-GLYCOGENOLYSIS-PRODUCT-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3905E3B98C2EC4

## type
prerequisite_of

## target
CON-FND-1BE461A57AB76D

## evidence_claim_ids
CLM-FND-GLYCOGENOLYSIS-PRODUCT-01

## citation_ids
CIT-KA-BIO103-GLYCOGENOLYSIS-PRODUCT-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-C2C88203E4A918

## type
prerequisite_of

## target
CON-FND-089E2C3E01031C

## evidence_claim_ids
CLM-FND-GLUCONEOGENESIS-KEY-ENZYMES-01

## citation_ids
CIT-KA-BIO103-GLUCONEOGENESIS-KEY-ENZYMES-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-089E2C3E01031C

## type
mechanism_step_before

## target
CON-FND-596FDA58EEEF0A

## evidence_claim_ids
CLM-FND-GLUCONEOGENIC-SUBSTRATES-01

## citation_ids
CIT-KA-BIO103-GLUCONEOGENIC-SUBSTRATES-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-089E2C3E01031C

## type
mechanism_step_before

## target
CON-FND-E7214B4A8D8835

## evidence_claim_ids
CLM-FND-GLUCONEOGENIC-SUBSTRATES-01

## citation_ids
CIT-KA-BIO103-GLUCONEOGENIC-SUBSTRATES-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-853096A349FFBD

## type
contrasts_with

## target
CON-FND-C2C88203E4A918

## evidence_claim_ids
CLM-FND-GLYCOLYSIS-COMMITTED-STEP-01

## citation_ids
CIT-KA-BIO103-GLYCOLYSIS-COMMITTED-STEP-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-C2C88203E4A918

## type
contrasts_with

## target
CON-FND-853096A349FFBD

## evidence_claim_ids
CLM-FND-GLUCONEOGENESIS-KEY-ENZYMES-01

## citation_ids
CIT-KA-BIO103-GLUCONEOGENESIS-KEY-ENZYMES-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-7B3B4F0BEBF198

## type
prerequisite_of

## target
CON-FND-F6450B9D5AB855

## evidence_claim_ids
CLM-FND-RECIPROCAL-REGULATION-01

## citation_ids
CIT-KA-BIO103-RECIPROCAL-REGULATION-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-END-0B615572003514

## type
regulates

## target
CON-FND-CA74978B7B7ED1

## evidence_claim_ids
CLM-END-BLOOD-GLUCOSE-HORMONES-01

## citation_ids
CIT-KA-BIO103-BLOOD-GLUCOSE-HORMONES-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-177A829022AC8F

## type
mechanism_step_before

## target
CON-FND-84BDACCA71AF45

## evidence_claim_ids
CLM-8ACA1F90794F

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-84BDACCA71AF45

## type
mechanism_step_before

## target
CON-FND-4C05D459E80AEF

## evidence_claim_ids
CLM-AF4BBB6CB074

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-84BDACCA71AF45

## type
contrasts_with

## target
CON-FND-F8FE239D334F4F

## evidence_claim_ids
CLM-AF4BBB6CB074

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-F8FE239D334F4F

## type
contrasts_with

## target
CON-FND-84BDACCA71AF45

## evidence_claim_ids
CLM-7C507DDF1E79

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-84BDACCA71AF45

## type
prerequisite_of

## target
CON-FND-A0F07BE6AD30A5

## evidence_claim_ids
CLM-D6704B5F4087

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-4C05D459E80AEF

## type
contrasts_with

## target
CON-FND-2F3A652B8E3104

## evidence_claim_ids
CLM-B954FA72F2C5

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-2F3A652B8E3104

## type
contrasts_with

## target
CON-FND-4C05D459E80AEF

## evidence_claim_ids
CLM-69DD7A4C68BC

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-FCFC1B5A95695E

## type
mechanism_step_before

## target
CON-FND-2F3A652B8E3104

## evidence_claim_ids
CLM-98E602EF0CC2

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-2F3A652B8E3104

## type
mechanism_step_before

## target
CON-FND-6B469645AE7DBC

## evidence_claim_ids
CLM-AB6D9217CAAF

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-6B469645AE7DBC

## type
mechanism_step_before

## target
CON-FND-69437CF1F5CCC0

## evidence_claim_ids
CLM-81F1D72BEEC6

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-1C668119B3C0BB

## type
regulates

## target
CON-FND-69437CF1F5CCC0

## evidence_claim_ids
CLM-A92364EEFA66

## citation_ids
CIT-BC2CBA49DD4A

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-GIT-6CB618DBA50596

## type
mechanism_step_before

## target
CON-GIT-ECB3C2F56DC72D

## evidence_claim_ids
CLM-6F2A6ED181BB

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-GIT-ECB3C2F56DC72D

## type
mechanism_step_before

## target
CON-GIT-99EF5E989B0C65

## evidence_claim_ids
CLM-7CEAF2400F45

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-A0F07BE6AD30A5

## type
prerequisite_of

## target
CON-END-2E748A37DA660A

## evidence_claim_ids
CLM-4350DFA32AB6

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-END-2E748A37DA660A

## type
prerequisite_of

## target
CON-END-CC450A236ABF50

## evidence_claim_ids
CLM-CAE83E86FF63

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-GIT-3A348EEAF118BD

## type
mechanism_step_before

## target
CON-GIT-E6AEB25F31B529

## evidence_claim_ids
CLM-2302ED136CCA

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-GIT-E6AEB25F31B529

## type
contrasts_with

## target
CON-GIT-8C5125A491B189

## evidence_claim_ids
CLM-DAB987DF8184

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-GIT-8C5125A491B189

## type
contrasts_with

## target
CON-GIT-E6AEB25F31B529

## evidence_claim_ids
CLM-GIT-LDL-RECEPTOR-DEFECT-01

## citation_ids
CIT-KA-BIO103-FAMILIAL-HYPERCHOL-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-END-0B615572003514

## type
prerequisite_of

## target
CON-END-85750744126501

## evidence_claim_ids
CLM-END-BLOOD-GLUCOSE-HORMONES-01

## citation_ids
CIT-KA-BIO103-BLOOD-GLUCOSE-HORMONES-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-END-85750744126501

## type
prerequisite_of

## target
CON-END-AC5B11BA2F2BCA

## evidence_claim_ids
CLM-F02C2381A55C

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-END-85750744126501

## type
causes

## target
CON-END-839E4F7D92FBEF

## evidence_claim_ids
CLM-F02C2381A55C

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-END-85750744126501

## type
causes

## target
CON-END-B41C6D0DFACFE4

## evidence_claim_ids
CLM-F02C2381A55C

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-END-85750744126501

## type
causes

## target
CON-END-F0182CA8A56EA7

## evidence_claim_ids
CLM-F02C2381A55C

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-END-5D8DA0351D0C94

## type
mechanism_step_before

## target
CON-END-F0182CA8A56EA7

## evidence_claim_ids
CLM-17DE1207D26F

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-END-85750744126501

## type
causes

## target
CON-END-68CC8CA610DF37

## evidence_claim_ids
CLM-F02C2381A55C

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-85583A59349A47

## type
mechanism_step_before

## target
CON-FND-61DA35C82C732F

## evidence_claim_ids
CLM-EFE8FEDFC1BE

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-61DA35C82C732F

## type
mechanism_step_before

## target
CON-FND-EFF5FB178CDDFA

## evidence_claim_ids
CLM-C43220BD1559

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-EFF5FB178CDDFA

## type
mechanism_step_before

## target
CON-FND-7F3A2AEFD5FF87

## evidence_claim_ids
CLM-AA897DE34CDF

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-7F3A2AEFD5FF87

## type
mechanism_step_before

## target
CON-FND-0741CE71FB0569

## evidence_claim_ids
CLM-7E891A283E93

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-1B027502822320

## type
prerequisite_of

## target
CON-FND-7F3A2AEFD5FF87

## evidence_claim_ids
CLM-A618124053E9

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-0741CE71FB0569

## type
prerequisite_of

## target
CON-END-CC450A236ABF50

## evidence_claim_ids
CLM-166367640D70

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8723D6C2BB6B32

## type
part_of

## target
CON-FND-F91310521FC982

## evidence_claim_ids
CLM-07DF491E5B59

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8507EE95B795A8

## type
part_of

## target
CON-FND-F91310521FC982

## evidence_claim_ids
CLM-0E93C6DA1C1C

## citation_ids
CIT-CD4094B69639

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8723D6C2BB6B32

## type
contrasts_with

## target
CON-FND-8507EE95B795A8

## evidence_claim_ids
CLM-07DF491E5B59

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8507EE95B795A8

## type
contrasts_with

## target
CON-FND-8723D6C2BB6B32

## evidence_claim_ids
CLM-0E93C6DA1C1C

## citation_ids
CIT-CD4094B69639

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-602DDE47BF8387

## type
associated_with

## target
CON-FND-83628BADCA3377

## evidence_claim_ids
CLM-C3C5B0EB71D3

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-83628BADCA3377

## type
associated_with

## target
CON-FND-602DDE47BF8387

## evidence_claim_ids
CLM-69B753F40E6B

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-F3A76A6F880190

## type
prerequisite_of

## target
CON-FND-3806EF570B0A1C

## evidence_claim_ids
CLM-0AD3D1D0BCF9

## citation_ids
CIT-0B6F580F021D

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-F3A76A6F880190

## type
prerequisite_of

## target
CON-FND-265D369FD41B85

## evidence_claim_ids
CLM-0AD3D1D0BCF9

## citation_ids
CIT-0B6F580F021D

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D0FFF93FC15672

## type
mechanism_step_before

## target
CON-FND-3806EF570B0A1C

## evidence_claim_ids
CLM-8ABB24E7E6B8

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D0FFF93FC15672

## type
associated_with

## target
CON-FND-8507EE95B795A8

## evidence_claim_ids
CLM-2A12BE73641A

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8507EE95B795A8

## type
associated_with

## target
CON-FND-D0FFF93FC15672

## evidence_claim_ids
CLM-0E93C6DA1C1C

## citation_ids
CIT-CD4094B69639

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-8507EE95B795A8

## type
associated_with

## target
CON-FND-5AB8B303F0D7B2

## evidence_claim_ids
CLM-B1849EB9C73D

## citation_ids
CIT-D37CD7DD5CDB

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-5AB8B303F0D7B2

## type
associated_with

## target
CON-FND-8507EE95B795A8

## evidence_claim_ids
CLM-0CDB0F0EEFE4

## citation_ids
CIT-D44F5C2E0EE4

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-0C22ADD8295933

## type
mechanism_step_before

## target
CON-FND-037BF052DDFC0D

## evidence_claim_ids
CLM-FA1917862421

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-0C22ADD8295933

## type
mechanism_step_before

## target
CON-FND-2F3A652B8E3104

## evidence_claim_ids
CLM-675C203DC563

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-861450E9BAAA11

## type
mechanism_step_before

## target
CON-FND-45DCF7CE171F0B

## evidence_claim_ids
CLM-84103D0FA1BA

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-861450E9BAAA11

## type
part_of

## target
CON-FND-B4CECDDC9A8BEE

## evidence_claim_ids
CLM-84103D0FA1BA

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-B4CECDDC9A8BEE

## type
prerequisite_of

## target
CON-FND-6A2CCA2892E78C

## evidence_claim_ids
CLM-19AB3C5C25C0

## citation_ids
CIT-9571F92443C2

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-EB9951F01C7251

## type
prerequisite_of

## target
CON-FND-B4CECDDC9A8BEE

## evidence_claim_ids
CLM-140164F80899

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-6A2CCA2892E78C

## type
part_of

## target
CON-FND-129A247205D4D0

## evidence_claim_ids
CLM-5C25883FFC28

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-6A2CCA2892E78C

## type
prerequisite_of

## target
CON-FND-3806EF570B0A1C

## evidence_claim_ids
CLM-5C25883FFC28

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-3806EF570B0A1C

## type
mechanism_step_before

## target
CON-FND-129A247205D4D0

## evidence_claim_ids
CLM-89A887347268

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-880D165894A5EC

## type
prerequisite_of

## target
CON-FND-6A2CCA2892E78C

## evidence_claim_ids
CLM-8034A34066C2

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-880D165894A5EC

## type
associated_with

## target
CON-REN-744E6E6F75BEFA

## evidence_claim_ids
CLM-4AC17492997D

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-REN-744E6E6F75BEFA

## type
associated_with

## target
CON-FND-880D165894A5EC

## evidence_claim_ids
CLM-DB3FBEA6CB19

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D7BB8C3AFB54CC

## type
causes

## target
CON-FND-587B0A39D3C0BD

## evidence_claim_ids
CLM-FND-PKU-ENZYME-DEFECT-01

## citation_ids
CIT-KA-BIO103-PKU-ENZYME-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D2044E7265FB03

## type
contrasts_with

## target
CON-FND-265D369FD41B85

## evidence_claim_ids
CLM-CDB2B1E1FD6B

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-265D369FD41B85

## type
contrasts_with

## target
CON-FND-D2044E7265FB03

## evidence_claim_ids
CLM-5EFAFF3AA52D

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-265D369FD41B85

## type
prerequisite_of

## target
CON-FND-71EF720F840CA4

## evidence_claim_ids
CLM-A5CE338AC1B1

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-265D369FD41B85

## type
contrasts_with

## target
CON-FND-DB8B4EFEB287DA

## evidence_claim_ids
CLM-D74CDD2BC2C5

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-DB8B4EFEB287DA

## type
contrasts_with

## target
CON-FND-265D369FD41B85

## evidence_claim_ids
CLM-047EB1151E45

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-DB8B4EFEB287DA

## type
causes

## target
CON-REN-D940C9B3140A40

## evidence_claim_ids
CLM-3481A9D46A09

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-71EF720F840CA4

## type
contrasts_with

## target
CON-REN-091F22B55D3081

## evidence_claim_ids
CLM-3C1CD1882A24

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-REN-091F22B55D3081

## type
contrasts_with

## target
CON-FND-71EF720F840CA4

## evidence_claim_ids
CLM-3C1CD1882A24

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-REN-C4606D65B74F2E

## type
is_a

## target
CON-FND-71EF720F840CA4

## evidence_claim_ids
CLM-3C1CD1882A24

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-REN-4AAF042ABFB67E

## type
mechanism_step_before

## target
CON-REN-2926B6DCBB2134

## evidence_claim_ids
CLM-BC10B143AC03

## citation_ids
CIT-815587FD1CDB

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-REN-0460ED67059E66

## type
causes

## target
CON-REN-31708150F8B722

## evidence_claim_ids
CLM-REN-ALCOHOL-LACTATE-URATE-01

## citation_ids
CIT-KA-BIO103-ALCOHOL-URATE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-REN-31708150F8B722

## type
treated_by

## target
CON-REN-38B4BED80BC671

## evidence_claim_ids
CLM-REN-GOUT-TOPHI-DIAGNOSIS-01

## citation_ids
CIT-KA-BIO103-GOUT-TOPHI-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-REN-31708150F8B722

## type
treated_by

## target
CON-REN-E5BAEF03791C8F

## evidence_claim_ids
CLM-REN-GOUT-TOPHI-DIAGNOSIS-01

## citation_ids
CIT-KA-BIO103-GOUT-TOPHI-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-REN-B3AEE6F22A046A

## type
mechanism_step_before

## target
CON-REN-E5BAEF03791C8F

## evidence_claim_ids
CLM-REN-ALLOPURINOL-MECHANISM-01

## citation_ids
CIT-KA-BIO103-ALLOPURINOL-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-REN-BE40BFF23F3E76

## type
contrasts_with

## target
CON-REN-D940C9B3140A40

## evidence_claim_ids
CLM-C8291D17838E

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-REN-D940C9B3140A40

## type
contrasts_with

## target
CON-REN-BE40BFF23F3E76

## evidence_claim_ids
CLM-E77C74789A04

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-REN-0460ED67059E66

## type
causes

## target
CON-REN-D940C9B3140A40

## evidence_claim_ids
CLM-REN-ALCOHOL-LACTATE-URATE-01

## citation_ids
CIT-KA-BIO103-ALCOHOL-URATE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-REN-B9E0531973510E

## type
causes

## target
CON-REN-D940C9B3140A40

## evidence_claim_ids
CLM-669895936755

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-IMM-10470076F1AF95

## type
causes

## target
CON-REN-BE40BFF23F3E76

## evidence_claim_ids
CLM-55482753C7A8

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-3D75438A839FBD

## type
prerequisite_of

## target
CON-HEM-4C0C6A97CA8788

## evidence_claim_ids
CLM-A332413F2E38

## citation_ids
CIT-9190F95DD55F

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-26C990AD8F630C

## type
mechanism_step_before

## target
CON-HEM-7A26AE75471EF8

## evidence_claim_ids
CLM-700886110A61

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-7A26AE75471EF8

## type
mechanism_step_before

## target
CON-HEM-22375197AEE80D

## evidence_claim_ids
CLM-9D3716971751

## citation_ids
CIT-8F424BE4C3FF

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-7A26AE75471EF8

## type
prerequisite_of

## target
CON-HEM-20178168A8FCF0

## evidence_claim_ids
CLM-5F1E44733281

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-7A26AE75471EF8

## type
prerequisite_of

## target
CON-HEM-167E007FE3D9EC

## evidence_claim_ids
CLM-9D3716971751

## citation_ids
CIT-8F424BE4C3FF

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-C87C15A849F158

## type
prerequisite_of

## target
CON-GIT-4A2A86832F1FF2

## evidence_claim_ids
CLM-2A49E6383F24

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-GIT-4A2A86832F1FF2

## type
investigated_by

## target
CON-HEM-22375197AEE80D

## evidence_claim_ids
CLM-GIT-JAUNDICE-CLASSIFICATION-01

## citation_ids
CIT-KA-BIO103-JAUNDICE-TABLE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-20178168A8FCF0

## type
contrasts_with

## target
CON-HEM-167E007FE3D9EC

## evidence_claim_ids
CLM-B31198983C5C

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-167E007FE3D9EC

## type
contrasts_with

## target
CON-HEM-20178168A8FCF0

## evidence_claim_ids
CLM-70320725EFB4

## citation_ids
CIT-44657EA4307B

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-GIT-A265DD7A7CC8EF

## type
part_of

## target
CON-GIT-4A2A86832F1FF2

## evidence_claim_ids
CLM-GIT-OBSTRUCTIVE-JAUNDICE-STOOL-URINE-01

## citation_ids
CIT-KA-BIO103-OBSTRUCTIVE-JAUNDICE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-GIT-38CC5CC7716DB7

## type
causes

## target
CON-GIT-2D2709CD4D9A17

## evidence_claim_ids
CLM-GIT-LOW-VLDL-FATTY-LIVER-01

## citation_ids
CIT-KA-BIO103-LOW-VLDL-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-A1EF4D20C85878

## type
part_of

## target
CON-FND-B928DE79E08882

## evidence_claim_ids
CLM-HEM-G6PD-HMP-KEY-ENZYME-01

## citation_ids
CIT-KA-BIO103-G6PD-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-B928DE79E08882

## type
prerequisite_of

## target
CON-FND-D8A41B5C23B148

## evidence_claim_ids
CLM-FND-HMP-NADPH-01

## citation_ids
CIT-KA-BIO103-HMP-NADPH-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-A1EF4D20C85878

## type
causes

## target
CON-HEM-4F64967BBFBB6F

## evidence_claim_ids
CLM-HEM-G6PD-HMP-KEY-ENZYME-01

## citation_ids
CIT-KA-BIO103-G6PD-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-4F64967BBFBB6F

## type
causes

## target
CON-HEM-F2B664C215C912

## evidence_claim_ids
CLM-HEM-FAVISM-HAEMOLYSIS-01

## citation_ids
CIT-KA-BIO103-FAVISM-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-4F64967BBFBB6F

## type
causes

## target
CON-GIT-4A2A86832F1FF2

## evidence_claim_ids
CLM-HEM-FAVISM-HAEMOLYSIS-01

## citation_ids
CIT-KA-BIO103-FAVISM-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-HEM-7FBB4829A4A4EC

## type
mechanism_step_before

## target
CON-HEM-6B557A065A8D90

## evidence_claim_ids
CLM-HEM-BPG-SHUNT-NO-ATP-01

## citation_ids
CIT-KA-BIO103-BPG-SHUNT-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-46B9F239340ED9

## type
contrasts_with

## target
CON-FND-C9E5128193029E

## evidence_claim_ids
CLM-FND-FAT-SOLUBLE-VITAMINS-01

## citation_ids
CIT-KA-BIO103-FAT-SOLUBLE-VIT-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-C9E5128193029E

## type
contrasts_with

## target
CON-FND-46B9F239340ED9

## evidence_claim_ids
CLM-FND-WATER-SOLUBLE-VITAMINS-01

## citation_ids
CIT-KA-BIO103-WATER-SOLUBLE-VIT-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-GIT-4952149F99782D

## type
causes

## target
CON-FND-C9E5128193029E

## evidence_claim_ids
CLM-7B6F55D3613A

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D7BB8C3AFB54CC

## type
treated_by

## target
CON-FND-81A4F3A9C51B7B

## evidence_claim_ids
CLM-FND-PKU-ENZYME-DEFECT-01

## citation_ids
CIT-KA-BIO103-PKU-ENZYME-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D7BB8C3AFB54CC

## type
often_confused_with

## target
CON-DER-6665EA8EA687C3

## evidence_claim_ids
CLM-FND-PKU-ENZYME-DEFECT-01

## citation_ids
CIT-KA-BIO103-PKU-ENZYME-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-6665EA8EA687C3

## type
often_confused_with

## target
CON-FND-D7BB8C3AFB54CC

## evidence_claim_ids
CLM-FND-PKU-ENZYME-DEFECT-01

## citation_ids
CIT-KA-BIO103-PKU-ENZYME-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-1DF6B985CB77A1

## type
often_confused_with

## target
CON-DER-6665EA8EA687C3

## evidence_claim_ids
CLM-FND-PKU-HYPOPIGMENTATION-01

## citation_ids
CIT-KA-BIO103-PKU-PIGMENT-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-6665EA8EA687C3

## type
often_confused_with

## target
CON-FND-1DF6B985CB77A1

## evidence_claim_ids
CLM-FND-PKU-HYPOPIGMENTATION-01

## citation_ids
CIT-KA-BIO103-PKU-PIGMENT-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-A6E502DCE4232F

## type
prerequisite_of

## target
CON-FND-D7BB8C3AFB54CC

## evidence_claim_ids
CLM-2BD89D21C068

## citation_ids
CIT-889340134146

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-A6E502DCE4232F

## type
prerequisite_of

## target
CON-FND-FA4D15805B9D02

## evidence_claim_ids
CLM-2BD89D21C068

## citation_ids
CIT-889340134146

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-634036621EB132

## type
mechanism_step_before

## target
CON-FND-49155E4E08617B

## evidence_claim_ids
CLM-5AA3A4149121

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-FA4D15805B9D02

## type
prerequisite_of

## target
CON-DER-6665EA8EA687C3

## evidence_claim_ids
CLM-13A7D1D3A13A

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-FA4D15805B9D02

## type
prerequisite_of

## target
CON-FND-1DF6B985CB77A1

## evidence_claim_ids
CLM-13A7D1D3A13A

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-49155E4E08617B

## type
contrasts_with

## target
CON-DER-6665EA8EA687C3

## evidence_claim_ids
CLM-0A7560C032CE

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
CON-FND-49155E4E08617B

## evidence_claim_ids
CLM-0A7560C032CE

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-49155E4E08617B

## type
contrasts_with

## target
CON-FND-D7BB8C3AFB54CC

## evidence_claim_ids
CLM-0A7560C032CE

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-FND-D7BB8C3AFB54CC

## type
contrasts_with

## target
CON-FND-49155E4E08617B

## evidence_claim_ids
CLM-FND-PKU-ENZYME-DEFECT-01

## citation_ids
CIT-KA-BIO103-PKU-ENZYME-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-6C4A6BDA725F0E

## type
mechanism_step_before

## target
CON-GIT-4952149F99782D

## evidence_claim_ids
CLM-F346B5971367

## citation_ids
CIT-FABBF492BD46

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-0EA979EBF9D434

## type
is_a

## target
CON-MSK-842FCAD0B94A8F

## evidence_claim_ids
CLM-9A38892CAD4C

## citation_ids
CIT-0C8E592A158F

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-0F4870E557FAF4

## type
is_a

## target
CON-MSK-842FCAD0B94A8F

## evidence_claim_ids
CLM-05E28D528DA3

## citation_ids
CIT-2FE8B638D70D

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-0EA979EBF9D434

## type
contrasts_with

## target
CON-MSK-0F4870E557FAF4

## evidence_claim_ids
CLM-A16136BC6C1D

## citation_ids
CIT-8C52A0B00068

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-0F4870E557FAF4

## type
contrasts_with

## target
CON-MSK-0EA979EBF9D434

## evidence_claim_ids
CLM-64F3E8D44DD6

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-9C7E37FE296254

## type
composed_of

## target
CON-MSK-0F4870E557FAF4

## evidence_claim_ids
CLM-7D913C16788D

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-E198B099DCA0C0

## type
mechanism_step_before

## target
CON-MSK-CB0E0F665E200B

## evidence_claim_ids
CLM-46C8E95B56BF

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-E198B099DCA0C0

## type
part_of

## target
CON-MSK-842FCAD0B94A8F

## evidence_claim_ids
CLM-B80307F76B60

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-CB0E0F665E200B

## type
part_of

## target
CON-MSK-842FCAD0B94A8F

## evidence_claim_ids
CLM-006BA8537300

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-FB07A439E2B324

## type
part_of

## target
CON-MSK-842FCAD0B94A8F

## evidence_claim_ids
CLM-ED7E795022CC

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-D137ADEEC56243

## type
part_of

## target
CON-MSK-967E873EEEACE0

## evidence_claim_ids
CLM-MSK-OSTEOBLAST-01

## citation_ids
CIT-KA-HIST-OSTEOBLAST-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-76CE11C6DCDC37

## type
part_of

## target
CON-MSK-967E873EEEACE0

## evidence_claim_ids
CLM-MSK-OSTEOCLAST-01

## citation_ids
CIT-KA-HIST-OSTEOCLAST-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-D137ADEEC56243

## type
contrasts_with

## target
CON-MSK-76CE11C6DCDC37

## evidence_claim_ids
CLM-MSK-OSTEOBLAST-01

## citation_ids
CIT-KA-HIST-OSTEOBLAST-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-76CE11C6DCDC37

## type
contrasts_with

## target
CON-MSK-D137ADEEC56243

## evidence_claim_ids
CLM-MSK-OSTEOCLAST-01

## citation_ids
CIT-KA-HIST-OSTEOCLAST-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-6C87364F2CE942

## type
part_of

## target
CON-MSK-967E873EEEACE0

## evidence_claim_ids
CLM-E53D21622484

## citation_ids
CIT-9B5558C67942

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-E2291B6BD6BBDF

## type
part_of

## target
CON-MSK-967E873EEEACE0

## evidence_claim_ids
CLM-17E6DBE434C4

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-E2291B6BD6BBDF

## type
mechanism_step_before

## target
CON-MSK-D137ADEEC56243

## evidence_claim_ids
CLM-3DAF8F560C73

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-D137ADEEC56243

## type
mechanism_step_before

## target
CON-MSK-6C87364F2CE942

## evidence_claim_ids
CLM-MSK-OSTEOBLAST-01

## citation_ids
CIT-KA-HIST-OSTEOBLAST-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-76CE11C6DCDC37

## type
contrasts_with

## target
CON-MSK-CAFCD73A40E6DC

## evidence_claim_ids
CLM-MSK-OSTEOCLAST-01

## citation_ids
CIT-KA-HIST-OSTEOCLAST-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-CAFCD73A40E6DC

## type
contrasts_with

## target
CON-MSK-76CE11C6DCDC37

## evidence_claim_ids
CLM-8F16BF78C33F

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-A67054CAEEE89E

## type
is_a

## target
CON-MSK-B55521FFEC2527

## evidence_claim_ids
CLM-44548C4B6456

## citation_ids
CIT-38486B33679A

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-0403FC429F118B

## type
is_a

## target
CON-MSK-B55521FFEC2527

## evidence_claim_ids
CLM-65EE5350F49B

## citation_ids
CIT-4B8FC39CD035

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-A67054CAEEE89E

## type
contrasts_with

## target
CON-MSK-0403FC429F118B

## evidence_claim_ids
CLM-6757D53BDA82

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-0403FC429F118B

## type
contrasts_with

## target
CON-MSK-A67054CAEEE89E

## evidence_claim_ids
CLM-9999996011EF

## citation_ids
CIT-F22EB9581A0C

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-C2EFE3D04B945A

## type
is_a

## target
CON-MSK-092F6F14307DB9

## evidence_claim_ids
CLM-80C6B156A9FF

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-745C364E5BDA5D

## type
is_a

## target
CON-MSK-092F6F14307DB9

## evidence_claim_ids
CLM-CDC794517A08

## citation_ids
CIT-30D353E51907

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-C2EFE3D04B945A

## type
contrasts_with

## target
CON-MSK-745C364E5BDA5D

## evidence_claim_ids
CLM-30656E41706E

## citation_ids
CIT-FA2A93124F44

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-745C364E5BDA5D

## type
contrasts_with

## target
CON-MSK-C2EFE3D04B945A

## evidence_claim_ids
CLM-03C4E67D7A0E

## citation_ids
CIT-DAFEC4EBDF42

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-745C364E5BDA5D

## type
mechanism_step_before

## target
CON-MSK-EBA37D8401180C

## evidence_claim_ids
CLM-CDC794517A08

## citation_ids
CIT-30D353E51907

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-89674D65B2316B

## type
associated_with

## target
CON-MSK-967E873EEEACE0

## evidence_claim_ids
CLM-CD5433342455

## citation_ids
CIT-9027A03FCF36

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-967E873EEEACE0

## type
associated_with

## target
CON-MSK-89674D65B2316B

## evidence_claim_ids
CLM-0E37672DB1DE

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-507DCD2CD12E15

## type
prerequisite_of

## target
CON-MSK-2493DDAE4798CE

## evidence_claim_ids
CLM-62D191A40C04

## citation_ids
CIT-AAE0641EC620

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-0824FE988ADA00

## type
part_of

## target
CON-MSK-2493DDAE4798CE

## evidence_claim_ids
CLM-7329F870BB61

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-740E240D62B9A5

## type
prerequisite_of

## target
CON-MSK-9D01E2358A65E2

## evidence_claim_ids
CLM-C3637B46B3B4

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-B60DAF01451E85

## type
part_of

## target
CON-DER-17748598BF7ECE

## evidence_claim_ids
CLM-B0D52B6C33F3

## citation_ids
CIT-BD8168429968

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-56784AB396C13E

## type
part_of

## target
CON-DER-17748598BF7ECE

## evidence_claim_ids
CLM-DER-DERMIS-LAYERS-01

## citation_ids
CIT-KA-HIST-DERMIS-LAYERS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-B60DAF01451E85

## type
contrasts_with

## target
CON-DER-56784AB396C13E

## evidence_claim_ids
CLM-B0D52B6C33F3

## citation_ids
CIT-BD8168429968

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-56784AB396C13E

## type
contrasts_with

## target
CON-DER-B60DAF01451E85

## evidence_claim_ids
CLM-DER-DERMIS-LAYERS-01

## citation_ids
CIT-KA-HIST-DERMIS-LAYERS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-743AA0CD69B8A4

## type
part_of

## target
CON-DER-B60DAF01451E85

## evidence_claim_ids
CLM-2661BE291F6D

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-1138A6D64D53B3

## type
part_of

## target
CON-DER-B60DAF01451E85

## evidence_claim_ids
CLM-81663776CCEB

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-867BD073CDD6D5

## type
part_of

## target
CON-DER-B60DAF01451E85

## evidence_claim_ids
CLM-F6B8A2E910C5

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-AB2A559A79ACB3

## type
part_of

## target
CON-DER-B60DAF01451E85

## evidence_claim_ids
CLM-674AEE571F7E

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-743AA0CD69B8A4

## type
mechanism_step_before

## target
CON-DER-1138A6D64D53B3

## evidence_claim_ids
CLM-E1C74910479D

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-1138A6D64D53B3

## type
mechanism_step_before

## target
CON-DER-867BD073CDD6D5

## evidence_claim_ids
CLM-81663776CCEB

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-867BD073CDD6D5

## type
mechanism_step_before

## target
CON-DER-AB2A559A79ACB3

## evidence_claim_ids
CLM-9F0F0D0DF034

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-8BE6D5C68517EC

## type
part_of

## target
CON-DER-867BD073CDD6D5

## evidence_claim_ids
CLM-F6B8A2E910C5

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-0A867D7DC2BEFC

## type
part_of

## target
CON-DER-B60DAF01451E85

## evidence_claim_ids
CLM-344AB109BCD2

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-71C980D8864B73

## type
part_of

## target
CON-DER-B60DAF01451E85

## evidence_claim_ids
CLM-69DE0BCF5A54

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-71C980D8864B73

## type
prerequisite_of

## target
CON-DER-B9BE859E905F44

## evidence_claim_ids
CLM-FFB56450544F

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-71C980D8864B73

## type
mechanism_step_before

## target
CON-DER-6665EA8EA687C3

## evidence_claim_ids
CLM-24B8DEB31900

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-0CE4E701A394EC

## type
connects_to

## target
CON-DER-B60DAF01451E85

## evidence_claim_ids
CLM-200FB3F76113

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-0CE4E701A394EC

## type
connects_to

## target
CON-DER-56784AB396C13E

## evidence_claim_ids
CLM-200FB3F76113

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-7B13D571066F63

## type
part_of

## target
CON-DER-17748598BF7ECE

## evidence_claim_ids
CLM-A36ED8D846E2

## citation_ids
CIT-312BEA6D7DF2

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-A4BD56E5027310

## type
part_of

## target
CON-DER-7B13D571066F63

## evidence_claim_ids
CLM-2AD276804DBB

## citation_ids
CIT-BDC66DF45DCC

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-406696F770DA63

## type
part_of

## target
CON-DER-7B13D571066F63

## evidence_claim_ids
CLM-0AAA22B820AE

## citation_ids
CIT-ABFDE63CC99D

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-9D049A8C76F844

## type
part_of

## target
CON-DER-17748598BF7ECE

## evidence_claim_ids
CLM-504233AF9E98

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-F4F6AA9BEAB1B6

## type
part_of

## target
CON-DER-9D049A8C76F844

## evidence_claim_ids
CLM-9C5594D84FD0

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-6C82312DEBED0A

## type
part_of

## target
CON-DER-9D049A8C76F844

## evidence_claim_ids
CLM-9C5594D84FD0

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-8F25CCE084AF16

## type
part_of

## target
CON-DER-9D049A8C76F844

## evidence_claim_ids
CLM-9C5594D84FD0

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-D09D3742DF2B67

## type
part_of

## target
CON-DER-9D049A8C76F844

## evidence_claim_ids
CLM-CC9D8768A632

## citation_ids
CIT-88D182BB3310

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-DER-34D2463B0EAFFE

## type
part_of

## target
CON-DER-B60DAF01451E85

## evidence_claim_ids
CLM-55D0AB1DADC2

## citation_ids
CIT-72888AB400E6

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-0DEAF126DF8F2E

## type
contrasts_with

## target
CON-MSK-888DFA3AA4E974

## evidence_claim_ids
CLM-MSK-INTERCALATED-DISC-01

## citation_ids
CIT-KA-HIST-INTERCALATED-DISC-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-888DFA3AA4E974

## type
contrasts_with

## target
CON-MSK-0DEAF126DF8F2E

## evidence_claim_ids
CLM-MSK-SMOOTH-MUSCLE-EM-01

## citation_ids
CIT-KA-HIST-SMOOTH-MUSCLE-EM-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-888DFA3AA4E974

## type
contrasts_with

## target
CON-MSK-E36936D62038BF

## evidence_claim_ids
CLM-MSK-SMOOTH-MUSCLE-EM-02

## citation_ids
CIT-KA-HIST-SMOOTH-MUSCLE-EM-02

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-E36936D62038BF

## type
contrasts_with

## target
CON-MSK-888DFA3AA4E974

## evidence_claim_ids
CLM-73C72344C9E1

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-1D5DC2D67A5291

## type
contrasts_with

## target
CON-NEU-75498C01CA1857

## evidence_claim_ids
CLM-A51D3BFE5677

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-75498C01CA1857

## type
contrasts_with

## target
CON-NEU-1D5DC2D67A5291

## evidence_claim_ids
CLM-686DC2E33F11

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-1E66BE533E894C

## type
part_of

## target
CON-NEU-8319D639D05322

## evidence_claim_ids
CLM-NEU-SODIUM-POTASSIUM-PUMP-01

## citation_ids
CIT-KA-PHYS-SODIUM-POTASSIUM-PUMP-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-1E66BE533E894C

## type
is_a

## target
CON-NEU-75498C01CA1857

## evidence_claim_ids
CLM-NEU-SODIUM-POTASSIUM-PUMP-01

## citation_ids
CIT-KA-PHYS-SODIUM-POTASSIUM-PUMP-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-8319D639D05322

## type
prerequisite_of

## target
CON-NEU-763D2F7A1571C9

## evidence_claim_ids
CLM-BBFC7B921505

## citation_ids
CIT-DCF2E597398C

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-8319D639D05322

## type
prerequisite_of

## target
CON-NEU-A6D30CFB5F997B

## evidence_claim_ids
CLM-BBFC7B921505

## citation_ids
CIT-DCF2E597398C

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-763D2F7A1571C9

## type
prerequisite_of

## target
CON-NEU-8CC845C16CE133

## evidence_claim_ids
CLM-8FB1F8B7E337

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-FE158971E5522D

## type
prerequisite_of

## target
CON-NEU-8CC845C16CE133

## evidence_claim_ids
CLM-8FB1F8B7E337

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-751C4921A154CC

## type
prerequisite_of

## target
CON-NEU-7A30FECF042995

## evidence_claim_ids
CLM-7D4484B8876A

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-751C4921A154CC

## type
prerequisite_of

## target
CON-NEU-2235199E9F4373

## evidence_claim_ids
CLM-047A9A5C8B56

## citation_ids
CIT-F11D4B91843F

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-751C4921A154CC

## type
prerequisite_of

## target
CON-NEU-DD9033DCA3AAF1

## evidence_claim_ids
CLM-3F38F4328525

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-751C4921A154CC

## type
prerequisite_of

## target
CON-NEU-F119674A8DFD8D

## evidence_claim_ids
CLM-7D4484B8876A

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-7A30FECF042995

## type
mechanism_step_before

## target
CON-NEU-DD9033DCA3AAF1

## evidence_claim_ids
CLM-NEU-AP-DEPOLARIZATION-01

## citation_ids
CIT-KA-PHYS-AP-DEPOLARIZATION-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-DD9033DCA3AAF1

## type
causes

## target
CON-NEU-F119674A8DFD8D

## evidence_claim_ids
CLM-NEU-REPOLARISATION-01

## citation_ids
CIT-KA-PHYS-REPOLARISATION-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-7E784A50D2BBAF

## type
prerequisite_of

## target
CON-NEU-7A30FECF042995

## evidence_claim_ids
CLM-NEU-LOCAL-RESPONSE-01

## citation_ids
CIT-KA-PHYS-LOCAL-RESPONSE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-2235199E9F4373

## type
often_confused_with

## target
CON-NEU-F119674A8DFD8D

## evidence_claim_ids
CLM-NEU-REFRACTORY-ABSOLUTE-01

## citation_ids
CIT-KA-PHYS-REFRACTORY-ABSOLUTE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-F119674A8DFD8D

## type
often_confused_with

## target
CON-NEU-2235199E9F4373

## evidence_claim_ids
CLM-NEU-REFRACTORY-RELATIVE-01

## citation_ids
CIT-KA-PHYS-REFRACTORY-RELATIVE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-2235199E9F4373

## type
contrasts_with

## target
CON-NEU-F119674A8DFD8D

## evidence_claim_ids
CLM-NEU-REFRACTORY-ABSOLUTE-01

## citation_ids
CIT-KA-PHYS-REFRACTORY-ABSOLUTE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-F119674A8DFD8D

## type
contrasts_with

## target
CON-NEU-2235199E9F4373

## evidence_claim_ids
CLM-NEU-REFRACTORY-RELATIVE-01

## citation_ids
CIT-KA-PHYS-REFRACTORY-RELATIVE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-18D07BA4202CDA

## type
contrasts_with

## target
CON-NEU-751C4921A154CC

## evidence_claim_ids
CLM-NEU-COMPOUND-AP-01

## citation_ids
CIT-KA-PHYS-COMPOUND-AP-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-751C4921A154CC

## type
contrasts_with

## target
CON-NEU-18D07BA4202CDA

## evidence_claim_ids
CLM-047A9A5C8B56

## citation_ids
CIT-F11D4B91843F

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-8E195C4C7D9BFF

## type
often_confused_with

## target
CON-NEU-18D07BA4202CDA

## evidence_claim_ids
CLM-NEU-BIPHASIC-AP-01

## citation_ids
CIT-KA-PHYS-BIPHASIC-AP-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-18D07BA4202CDA

## type
often_confused_with

## target
CON-NEU-8E195C4C7D9BFF

## evidence_claim_ids
CLM-NEU-COMPOUND-AP-01

## citation_ids
CIT-KA-PHYS-COMPOUND-AP-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-BC5C6F99B13676

## type
contains

## target
CON-NEU-105A7842809DC1

## evidence_claim_ids
CLM-B00A8AC134A2

## citation_ids
CIT-13BCFA6B92FF

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-2DFEA8FD9919EA

## type
contrasts_with

## target
CON-NEU-18D07BA4202CDA

## evidence_claim_ids
CLM-13D3D4D0B959

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-18D07BA4202CDA

## type
contrasts_with

## target
CON-NEU-2DFEA8FD9919EA

## evidence_claim_ids
CLM-NEU-COMPOUND-AP-01

## citation_ids
CIT-KA-PHYS-COMPOUND-AP-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-2DFEA8FD9919EA

## type
contrasts_with

## target
CON-NEU-7E784A50D2BBAF

## evidence_claim_ids
CLM-18F5DFE2E514

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-7E784A50D2BBAF

## type
contrasts_with

## target
CON-NEU-2DFEA8FD9919EA

## evidence_claim_ids
CLM-NEU-LOCAL-RESPONSE-01

## citation_ids
CIT-KA-PHYS-LOCAL-RESPONSE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-2DFEA8FD9919EA

## type
contrasts_with

## target
CON-MSK-AF4E727C85510D

## evidence_claim_ids
CLM-13D3D4D0B959

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-AF4E727C85510D

## type
contrasts_with

## target
CON-NEU-2DFEA8FD9919EA

## evidence_claim_ids
CLM-B6FC34BA2BB5

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-5664D7AB68AD8D

## type
prerequisite_of

## target
CON-NEU-A0C8307D2825A6

## evidence_claim_ids
CLM-NEU-MYELINATION-01

## citation_ids
CIT-KA-PHYS-MYELINATION-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-A0C8307D2825A6

## type
contrasts_with

## target
CON-NEU-76D490DA0BA0E6

## evidence_claim_ids
CLM-NEU-SALTATORY-CONDUCTION-01

## citation_ids
CIT-KA-PHYS-SALTATORY-CONDUCTION-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-76D490DA0BA0E6

## type
contrasts_with

## target
CON-NEU-A0C8307D2825A6

## evidence_claim_ids
CLM-38B1AE815800

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-72BF46A68C48A6

## type
prerequisite_of

## target
CON-NEU-5664D7AB68AD8D

## evidence_claim_ids
CLM-BA712A18CBF9

## citation_ids
CIT-C9EC582A591F

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-5664D7AB68AD8D

## type
prerequisite_of

## target
CON-NEU-3F92C1DEAFFF01

## evidence_claim_ids
CLM-NEU-MYELINATION-01

## citation_ids
CIT-KA-PHYS-MYELINATION-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-273E2C22C11A97

## type
prerequisite_of

## target
CON-MSK-77D955AAB4D0FA

## evidence_claim_ids
CLM-D5F3ABEFB402

## citation_ids
CIT-38A48C09E2F8

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-64B329335E9489

## type
prerequisite_of

## target
CON-MSK-5C2B5DD83C1805

## evidence_claim_ids
CLM-7F7F932A53D4

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-B1F2748F1E9357

## type
associated_with

## target
CON-MSK-77D955AAB4D0FA

## evidence_claim_ids
CLM-CAABE164481A

## citation_ids
CIT-D93C8CAC1242

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-77D955AAB4D0FA

## type
associated_with

## target
CON-NEU-B1F2748F1E9357

## evidence_claim_ids
CLM-MSK-NMJ-TRANSMISSION-01

## citation_ids
CIT-KA-PHYS-NMJ-TRANSMISSION-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-77D955AAB4D0FA

## type
mechanism_step_before

## target
CON-MSK-3013AA61E917B7

## evidence_claim_ids
CLM-MSK-NMJ-TRANSMISSION-01

## citation_ids
CIT-KA-PHYS-NMJ-TRANSMISSION-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-3013AA61E917B7

## type
mechanism_step_before

## target
CON-MSK-B2B106C1D81C30

## evidence_claim_ids
CLM-MSK-EC-COUPLING-01

## citation_ids
CIT-KA-PHYS-EC-COUPLING-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-B2B106C1D81C30

## type
often_confused_with

## target
CON-MSK-70448A9B07D24A

## evidence_claim_ids
CLM-MSK-TENSION-CROSS-BRIDGE-01

## citation_ids
CIT-KA-PHYS-TENSION-CROSS-BRIDGE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-70448A9B07D24A

## type
often_confused_with

## target
CON-MSK-B2B106C1D81C30

## evidence_claim_ids
CLM-MSK-TENSION-CROSS-BRIDGE-01

## citation_ids
CIT-KA-PHYS-TENSION-CROSS-BRIDGE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-AC42FE7AB41DF2

## type
causes

## target
CON-MSK-6087C9C091ED85

## evidence_claim_ids
CLM-MSK-CROSS-BRIDGE-ATP-01

## citation_ids
CIT-KA-PHYS-CROSS-BRIDGE-ATP-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-A22F7D478A747E

## type
contrasts_with

## target
CON-MSK-B2B106C1D81C30

## evidence_claim_ids
CLM-MSK-SMOOTH-FACTORS-01

## citation_ids
CIT-KA-PHYS-SMOOTH-FACTORS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-B2B106C1D81C30

## type
contrasts_with

## target
CON-MSK-A22F7D478A747E

## evidence_claim_ids
CLM-MSK-TENSION-CROSS-BRIDGE-01

## citation_ids
CIT-KA-PHYS-TENSION-CROSS-BRIDGE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-D97EA196E6719C

## type
often_confused_with

## target
CON-CVS-C9E53B5A691D19

## evidence_claim_ids
CLM-MSK-SMOOTH-SPONTANEOUS-01

## citation_ids
CIT-KA-PHYS-SMOOTH-SPONTANEOUS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-CVS-C9E53B5A691D19

## type
often_confused_with

## target
CON-MSK-D97EA196E6719C

## evidence_claim_ids
CLM-MSK-SMOOTH-SPONTANEOUS-01

## citation_ids
CIT-KA-PHYS-SMOOTH-SPONTANEOUS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-A22F7D478A747E

## type
prerequisite_of

## target
CON-MSK-18743CBD569602

## evidence_claim_ids
CLM-MSK-SMOOTH-FACTORS-01

## citation_ids
CIT-KA-PHYS-SMOOTH-FACTORS-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-CF9EFE4EA3C90B

## type
contrasts_with

## target
CON-MSK-3013AA61E917B7

## evidence_claim_ids
CLM-08871F0928CA

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-3013AA61E917B7

## type
contrasts_with

## target
CON-MSK-CF9EFE4EA3C90B

## evidence_claim_ids
CLM-MSK-EC-COUPLING-01

## citation_ids
CIT-KA-PHYS-EC-COUPLING-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-A10AC6BAF27F00

## type
mechanism_step_before

## target
CON-MSK-CF9EFE4EA3C90B

## evidence_claim_ids
CLM-4E701154ACFB

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-62FCA91F4981B2

## type
mechanism_step_before

## target
CON-MSK-A10AC6BAF27F00

## evidence_claim_ids
CLM-8CFAA9DB2EF8

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-62FCA91F4981B2

## type
prerequisite_of

## target
CON-MSK-D97EA196E6719C

## evidence_claim_ids
CLM-EFE3AA704A29

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-43CD79301071ED

## type
prerequisite_of

## target
CON-MSK-287D88DF2F6B8C

## evidence_claim_ids
CLM-E09208580AAA

## citation_ids
CIT-A682C4267240

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-287D88DF2F6B8C

## type
prerequisite_of

## target
CON-MSK-3013AA61E917B7

## evidence_claim_ids
CLM-B4CEFB7A10E8

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-287D88DF2F6B8C

## type
prerequisite_of

## target
CON-MSK-B2B106C1D81C30

## evidence_claim_ids
CLM-7E54BC98332E

## citation_ids
CIT-15EC6178C4DD

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-43CD79301071ED

## type
prerequisite_of

## target
CON-MSK-3B9143FBE075E4

## evidence_claim_ids
CLM-E09208580AAA

## citation_ids
CIT-A682C4267240

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-3B9143FBE075E4

## type
prerequisite_of

## target
CON-MSK-AF4E727C85510D

## evidence_claim_ids
CLM-EBF22E7ED6AC

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-3B9143FBE075E4

## type
prerequisite_of

## target
CON-MSK-B2B106C1D81C30

## evidence_claim_ids
CLM-9A99A18A87E2

## citation_ids
CIT-F8FFE5F73BE4

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-AF4E727C85510D

## type
prerequisite_of

## target
CON-MSK-C14F65CD68F720

## evidence_claim_ids
CLM-773868A44D72

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-AF4E727C85510D

## type
prerequisite_of

## target
CON-MSK-242998842BE25C

## evidence_claim_ids
CLM-773868A44D72

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-242998842BE25C

## type
prerequisite_of

## target
CON-MSK-C14F65CD68F720

## evidence_claim_ids
CLM-BDA879CD36D1

## citation_ids
CIT-DA8B72AB30D6

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-87D5C5A48AB5D9

## type
prerequisite_of

## target
CON-MSK-8CD0C1C03D5333

## evidence_claim_ids
CLM-D38FA480D743

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-8CD0C1C03D5333

## type
prerequisite_of

## target
CON-MSK-B7A8FEB348BC9E

## evidence_claim_ids
CLM-05B9227EAD93

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-01E9132FDDF9F2

## type
prerequisite_of

## target
CON-MSK-B7A8FEB348BC9E

## evidence_claim_ids
CLM-B5A610169554

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-B2B106C1D81C30

## type
prerequisite_of

## target
CON-MSK-01E9132FDDF9F2

## evidence_claim_ids
CLM-MSK-TENSION-CROSS-BRIDGE-01

## citation_ids
CIT-KA-PHYS-TENSION-CROSS-BRIDGE-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-3E5F54D8D58E9C

## type
associated_with

## target
CON-MSK-C14F65CD68F720

## evidence_claim_ids
CLM-MSK-FIBRE-TYPES-01

## citation_ids
CIT-KA-PHYS-FIBRE-TYPES-01

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-C14F65CD68F720

## type
associated_with

## target
CON-MSK-3E5F54D8D58E9C

## evidence_claim_ids
CLM-FBC1778A94B1

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-9A2D57D133DB52

## type
prerequisite_of

## target
CON-MSK-2E4061334D52EA

## evidence_claim_ids
CLM-547CE8A88F65

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-2E4061334D52EA

## type
associated_with

## target
CON-NEU-64B329335E9489

## evidence_claim_ids
CLM-BEC978191158

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-64B329335E9489

## type
associated_with

## target
CON-MSK-2E4061334D52EA

## evidence_claim_ids
CLM-3B4F4DE95C63

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-9A2D57D133DB52

## type
prerequisite_of

## target
CON-MSK-6087C9C091ED85

## evidence_claim_ids
CLM-D633C1D66DCB

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-2A62AFCCE09E9F

## type
associated_with

## target
CON-MSK-1030B9F3A5996A

## evidence_claim_ids
CLM-7B0D0CF7D48B

## citation_ids
CIT-37B4C03F28DA

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-1030B9F3A5996A

## type
associated_with

## target
CON-MSK-2A62AFCCE09E9F

## evidence_claim_ids
CLM-EE237BC95D56

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-2A62AFCCE09E9F

## type
associated_with

## target
CON-MSK-7253D390093A21

## evidence_claim_ids
CLM-7B0D0CF7D48B

## citation_ids
CIT-37B4C03F28DA

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-7253D390093A21

## type
associated_with

## target
CON-MSK-2A62AFCCE09E9F

## evidence_claim_ids
CLM-0ABF10E8BF71

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-7253D390093A21

## type
associated_with

## target
CON-MSK-1030B9F3A5996A

## evidence_claim_ids
CLM-0ABF10E8BF71

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-1030B9F3A5996A

## type
associated_with

## target
CON-MSK-7253D390093A21

## evidence_claim_ids
CLM-1F9918938DD4

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-MSK-1030B9F3A5996A

## type
associated_with

## target
CON-NEU-64B329335E9489

## evidence_claim_ids
CLM-22509C974C38

## verification_status
needs_evidence

## reviewer
Medical team, Admin team

---

# Item

## source
CON-NEU-64B329335E9489

## type
associated_with

## target
CON-MSK-1030B9F3A5996A

## evidence_claim_ids
CLM-F1970A35E3EA

## citation_ids
CIT-3C7169149B0A

## verification_status
verified

## reviewed_at
2026-08-22

## reviewer
Medical team, Admin team

