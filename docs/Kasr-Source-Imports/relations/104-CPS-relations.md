<!--
  Relations for 104 CPS -- Cardiopulmonary System, Year 1, Kasr Al Ainy (kau).

  305 relation records covering the module's three subjects: anatomy (thorax
  cage, intercostal spaces, mediastinum, pericardium/heart, lungs, great
  vessels, nerves, lymphatics, and heart/respiratory development), histology
  (vessel wall layers, capillary types, lymphoid organ structure, airway
  epithelium, alveolar cells, and the module's cytogenetics chapter), and
  physiology (cardiac cycle, conduction sequence, action potentials,
  hemodynamics, capillary exchange, ventilation mechanics, gas transport and
  chemoreceptor control), plus cross-domain `prerequisite_of` edges linking
  the anatomical/histological structure of a system to its own physiology.

  Every `source` and `target` is a concept already committed in this module's
  five concept files (concept/104-CPS-concepts.md,
  concept/104-CPS-anatomy-concepts.md, concept/104-CPS-histology-concepts.md,
  concept/104-CPS-physiology-concepts.md,
  concept/104-CPS-practical-concepts.md). No concept ID was minted here.

  Every `evidence_claim_ids` entry names a real claim from
  evidence/104-CPS-claims.md, evidence/104-CPS-physiology-claims.md or
  evidence/104-CPS-generated-claims.md, chosen because its own display_text
  states the specific fact the edge asserts (read against the concept's own
  claim set, not matched by keyword alone). Where the edge's claim also has a
  citation in evidence/104-CPS-citations.md, evidence/104-CPS-physiology-
  citations.md or evidence/104-CPS-generated-citations.md, `citation_ids` is
  set and `verification_status` is `verified`; the rest are `needs_evidence`
  (no citation exists yet for that specific claim -- a gap in the citations
  files, not in this batch's own reasoning).

  Symmetric types (`contrasts_with`, `associated_with`) are written as two
  rows, one per direction, each with its own evidence line per
  03-relationships.md. No `## id` field is set on any record -- every id
  derives as `rel-<source>-<type>-<target>`, which makes re-import
  idempotent. No `## field_notes` -- relations have no such column.

  No commentary before or after; produced by the 104 CPS relations lane.
-->

# Item

## source
CON-MSK-536842A4CEBF76

## type
part_of

## target
CON-MSK-54A6BFC89A697C

## evidence_claim_ids
CLM-E052363D9AFB

## citation_ids
CIT-82E512D4DD57

## verification_status
verified

---

# Item

## source
CON-MSK-6E1B99AFD7AA43

## type
part_of

## target
CON-MSK-54A6BFC89A697C

## evidence_claim_ids
CLM-D9B339DD968A

## verification_status
needs_evidence

---

# Item

## source
CON-RES-671ABF9D60BE19

## type
located_in

## target
CON-MSK-54A6BFC89A697C

## evidence_claim_ids
CLM-BE9F02C96E1F

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-1861B888CFF02D

## type
located_in

## target
CON-MSK-54A6BFC89A697C

## evidence_claim_ids
CLM-5DCF11A2E4CC

## verification_status
needs_evidence

---

# Item

## source
CON-RES-A774BB8400B802

## type
located_in

## target
CON-MSK-54A6BFC89A697C

## evidence_claim_ids
CLM-9A3ECAAE6B90

## verification_status
needs_evidence

---

# Item

## source
CON-RES-0BB6BDDB3E4413

## type
located_in

## target
CON-MSK-54A6BFC89A697C

## evidence_claim_ids
CLM-CC142E2D4EDF

## verification_status
needs_evidence

---

# Item

## source
CON-RES-0BB6BDDB3E4413

## type
supplies

## target
CON-RES-671ABF9D60BE19

## evidence_claim_ids
CLM-CC142E2D4EDF

## verification_status
needs_evidence

---

# Item

## source
CON-RES-0BB6BDDB3E4413

## type
supplies

## target
CON-RES-A774BB8400B802

## evidence_claim_ids
CLM-9A3ECAAE6B90

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-19E63D8A8E7EDA

## type
drains_into

## target
CON-CVS-D2307B39C55336

## evidence_claim_ids
CLM-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01

## citation_ids
CIT-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-19E63D8A8E7EDA

## type
located_in

## target
CON-MSK-54A6BFC89A697C

## evidence_claim_ids
CLM-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01

## citation_ids
CIT-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-CED26421AF8B39

## type
part_of

## target
CON-RES-7EDFFAB60101ED

## evidence_claim_ids
CLM-957D957C3DF1

## citation_ids
CIT-E25F71D15E58

## verification_status
verified

---

# Item

## source
CON-RES-B833146BBFCB26

## type
part_of

## target
CON-RES-CED26421AF8B39

## evidence_claim_ids
CLM-9BA340C27BF0

## verification_status
needs_evidence

---

# Item

## source
CON-RES-3AB5ED388161A2

## type
supplies

## target
CON-RES-CED26421AF8B39

## evidence_claim_ids
CLM-104-ANA-PLEURA-NERVE-SUPPLY-01

## citation_ids
CIT-104-ANA-PLEURA-NERVE-SUPPLY-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-7EDFFAB60101ED

## type
located_in

## target
CON-RES-CED26421AF8B39

## evidence_claim_ids
CLM-6897D9305481

## verification_status
needs_evidence

---

# Item

## source
CON-RES-6023E5A5A7161F

## type
part_of

## target
CON-RES-80C9B9E43B459B

## evidence_claim_ids
CLM-3224CFF02AF7

## citation_ids
CIT-545F7F1F360C

## verification_status
verified

---

# Item

## source
CON-RES-80C9B9E43B459B

## type
part_of

## target
CON-RES-6023E5A5A7161F

## evidence_claim_ids
CLM-3224CFF02AF7

## citation_ids
CIT-545F7F1F360C

## verification_status
verified

---

# Item

## source
CON-RES-449B5BD0266989

## type
supplies

## target
CON-RES-6023E5A5A7161F

## evidence_claim_ids
CLM-F63B9B08E0F9

## verification_status
needs_evidence

---

# Item

## source
CON-RES-AFCED19BA66ED2

## type
supplies

## target
CON-RES-449B5BD0266989

## evidence_claim_ids
CLM-D0FF5D75647D

## citation_ids
CIT-103B68CC89B7

## verification_status
verified

---

# Item

## source
CON-DEV-8265C9033E19B1

## type
causes

## target
CON-RES-A9AE09CC34A162

## evidence_claim_ids
CLM-E3EF1EF6FDE3

## verification_status
needs_evidence

---

# Item

## source
CON-RES-A9AE09CC34A162

## type
complication_of

## target
CON-DEV-8265C9033E19B1

## evidence_claim_ids
CLM-271814D76ED4

## verification_status
needs_evidence

---

# Item

## source
CON-RES-F360EFDEA84D58

## type
part_of

## target
CON-RES-F78FBA0BF1E673

## evidence_claim_ids
CLM-8734E1BA4D90

## citation_ids
CIT-CB587EAC99C2

## verification_status
verified

---

# Item

## source
CON-CVS-83DB0089BA4BD1

## type
part_of

## target
CON-RES-F78FBA0BF1E673

## evidence_claim_ids
CLM-979D2251A6F3

## verification_status
needs_evidence

---

# Item

## source
CON-RES-03AB23DA654BAF

## type
part_of

## target
CON-RES-F78FBA0BF1E673

## evidence_claim_ids
CLM-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01

## citation_ids
CIT-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-83DB0089BA4BD1

## type
contains

## target
CON-CVS-74C0F9BB0D3490

## evidence_claim_ids
CLM-195FADC8B461

## verification_status
needs_evidence

---

# Item

## source
CON-RES-F360EFDEA84D58

## type
contains

## target
CON-CVS-9C60987F3CB5A1

## evidence_claim_ids
CLM-3CEA2F79C942

## verification_status
needs_evidence

---

# Item

## source
CON-RES-F360EFDEA84D58

## type
contains

## target
CON-RES-A6B5E6793B2E5E

## evidence_claim_ids
CLM-3CEA2F79C942

## verification_status
needs_evidence

---

# Item

## source
CON-RES-03AB23DA654BAF

## type
contains

## target
CON-GIT-4E4EC465826CF2

## evidence_claim_ids
CLM-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01

## citation_ids
CIT-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-03AB23DA654BAF

## type
contains

## target
CON-HEM-9123D4493320A7

## evidence_claim_ids
CLM-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01

## citation_ids
CIT-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-03AB23DA654BAF

## type
contains

## target
CON-CVS-EEA29FB47CBB71

## evidence_claim_ids
CLM-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01

## citation_ids
CIT-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-03AB23DA654BAF

## type
contains

## target
CON-CVS-6BF9AE4B31AD3D

## evidence_claim_ids
CLM-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01

## citation_ids
CIT-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-4F6394A2A7C0C5

## type
complication_of

## target
CON-CVS-9C60987F3CB5A1

## evidence_claim_ids
CLM-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01

## citation_ids
CIT-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01-ANEURYSM

## verification_status
verified

---

# Item

## source
CON-CVS-3706498A4F8F97

## type
part_of

## target
CON-CVS-74C0F9BB0D3490

## evidence_claim_ids
CLM-A567B7E6803D

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-2DB020EDD28EB7

## type
supplies

## target
CON-CVS-3706498A4F8F97

## evidence_claim_ids
CLM-41DBF0164A87

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-32B764922AF233

## type
associated_with

## target
CON-CVS-3706498A4F8F97

## evidence_claim_ids
CLM-0F25D7757BA1

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-3706498A4F8F97

## type
associated_with

## target
CON-CVS-32B764922AF233

## evidence_claim_ids
CLM-CE6286A71E5F

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-6799821893D6D2

## type
part_of

## target
CON-CVS-42C907CE4749DC

## evidence_claim_ids
CLM-1BDD62F42A4F

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-42C907CE4749DC

## type
part_of

## target
CON-CVS-74C0F9BB0D3490

## evidence_claim_ids
CLM-1BDD62F42A4F

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-ECDC97B24BB5DE

## type
part_of

## target
CON-CVS-74C0F9BB0D3490

## evidence_claim_ids
CLM-2B403D070110

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-F997D0CCBA3161

## type
part_of

## target
CON-CVS-74C0F9BB0D3490

## evidence_claim_ids
CLM-AF4D5C27D092

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-B12EDEA332E53F

## type
supplies

## target
CON-CVS-74C0F9BB0D3490

## evidence_claim_ids
CLM-BB5373D110E7

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-82C57174816F98

## type
supplies

## target
CON-CVS-74C0F9BB0D3490

## evidence_claim_ids
CLM-CB90440788C3

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-929D9DDCB95482

## type
drains_into

## target
CON-CVS-42C907CE4749DC

## evidence_claim_ids
CLM-D244AC32AFDA

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-1F1AB4B70AB06D

## type
supplies

## target
CON-CVS-74C0F9BB0D3490

## evidence_claim_ids
CLM-60A8FC29C185

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-2A21F1B4F30B61

## type
supplies

## target
CON-CVS-74C0F9BB0D3490

## evidence_claim_ids
CLM-02F71C2B53FD

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-CFF45F193765C4

## type
part_of

## target
CON-CVS-1F1AB4B70AB06D

## evidence_claim_ids
CLM-104-ANA-CIRCUMFLEX-ORIGIN-END-01

## citation_ids
CIT-104-ANA-CIRCUMFLEX-ORIGIN-END-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-D02DE9B56C97B7

## type
connects_to

## target
CON-CVS-9C60987F3CB5A1

## evidence_claim_ids
CLM-1642ACF49DCE

## citation_ids
CIT-19E8DDEAE3ED

## verification_status
verified

---

# Item

## source
CON-CVS-9C60987F3CB5A1

## type
connects_to

## target
CON-CVS-EEA29FB47CBB71

## evidence_claim_ids
CLM-C6907C337D1A

## citation_ids
CIT-2E719C0D9035

## verification_status
verified

---

# Item

## source
CON-CVS-A723ADE6F4E726

## type
connects_to

## target
CON-RES-9E5D1C2A67CB5D

## evidence_claim_ids
CLM-467AEC52EB80

## citation_ids
CIT-6E03BB9779AE

## verification_status
verified

---

# Item

## source
CON-CVS-9CDFD3C60A2550

## type
connects_to

## target
CON-CVS-D2307B39C55336

## evidence_claim_ids
CLM-BF8CAFC6FEAC

## citation_ids
CIT-0AE922AF7D70

## verification_status
verified

---

# Item

## source
CON-CVS-19E63D8A8E7EDA

## type
connects_to

## target
CON-CVS-9CDFD3C60A2550

## evidence_claim_ids
CLM-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01

## citation_ids
CIT-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-E9CF510CBD01BC

## type
supplies

## target
CON-GIT-4E4EC465826CF2

## evidence_claim_ids
CLM-F6560BAB3901

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-E9CF510CBD01BC

## type
supplies

## target
CON-RES-9E5D1C2A67CB5D

## evidence_claim_ids
CLM-29A699960810

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-E9BA4A6C0E8392

## type
part_of

## target
CON-CVS-E9CF510CBD01BC

## evidence_claim_ids
CLM-3A5ADCD67A54

## citation_ids
CIT-3ACC85545803

## verification_status
verified

---

# Item

## source
CON-CVS-E9BA4A6C0E8392

## type
supplies

## target
CON-RES-A6B5E6793B2E5E

## evidence_claim_ids
CLM-4091F6B9D74D

## citation_ids
CIT-BA4340B38BFC

## verification_status
verified

---

# Item

## source
CON-CVS-6BF9AE4B31AD3D

## type
supplies

## target
CON-CVS-B12EDEA332E53F

## evidence_claim_ids
CLM-B686106E7846

## verification_status
needs_evidence

---

# Item

## source
CON-RES-A6B5E6793B2E5E

## type
connects_to

## target
CON-RES-16C7132ECAA7BF

## evidence_claim_ids
CLM-91DECCAE3D3A

## verification_status
needs_evidence

---

# Item

## source
CON-RES-16C7132ECAA7BF

## type
connects_to

## target
CON-RES-9E5D1C2A67CB5D

## evidence_claim_ids
CLM-17C3734AD8D0

## verification_status
needs_evidence

---

# Item

## source
CON-RES-9E5D1C2A67CB5D

## type
part_of

## target
CON-RES-69F499B794713C

## evidence_claim_ids
CLM-6D832EEC1D06

## verification_status
needs_evidence

---

# Item

## source
CON-RES-DC7CC9CC4757BE

## type
part_of

## target
CON-RES-69F499B794713C

## evidence_claim_ids
CLM-B4BDD261AC2A

## verification_status
needs_evidence

---

# Item

## source
CON-RES-2A560C53F8E712

## type
part_of

## target
CON-RES-DC7CC9CC4757BE

## evidence_claim_ids
CLM-54E0FE902FED

## verification_status
needs_evidence

---

# Item

## source
CON-RES-DC1111DA6DD151

## type
located_in

## target
CON-RES-69F499B794713C

## evidence_claim_ids
CLM-8F7AFF480ACE

## verification_status
needs_evidence

---

# Item

## source
CON-RES-CF9852282948CD

## type
supplies

## target
CON-RES-69F499B794713C

## evidence_claim_ids
CLM-968A1027874E

## verification_status
needs_evidence

---

# Item

## source
CON-RES-08EA4617DB3751

## type
drains_into

## target
CON-HEM-B7A01B9D061793

## evidence_claim_ids
CLM-23269A343910

## verification_status
needs_evidence

---

# Item

## source
CON-RES-491F7739C10120

## type
part_of

## target
CON-RES-69F499B794713C

## evidence_claim_ids
CLM-EE69EEE8C0A0

## verification_status
needs_evidence

---

# Item

## source
CON-HEM-B7A01B9D061793

## type
drains_into

## target
CON-HEM-9123D4493320A7

## evidence_claim_ids
CLM-8DF45E274A58

## citation_ids
CIT-64170EE455E2

## verification_status
verified

---

# Item

## source
CON-HEM-D7533F74F06758

## type
drains_into

## target
CON-CVS-9CDFD3C60A2550

## evidence_claim_ids
CLM-B34793DBDF2E

## citation_ids
CIT-424A61906DD4

## verification_status
verified

---

# Item

## source
CON-HEM-9123D4493320A7

## type
drains_into

## target
CON-CVS-9CDFD3C60A2550

## evidence_claim_ids
CLM-A3FE8F6B377E

## citation_ids
CIT-920A0EE19B7C

## verification_status
verified

---

# Item

## source
CON-DEV-4E02B436616DC0

## type
mechanism_step_before

## target
CON-DEV-13EE046ACBE541

## evidence_claim_ids
CLM-0F65CB3381D7

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-4E02B436616DC0

## type
mechanism_step_before

## target
CON-DEV-67A96150DDAFD9

## evidence_claim_ids
CLM-D604215192AF

## citation_ids
CIT-3EA59CEC7069

## verification_status
verified

---

# Item

## source
CON-DEV-13EE046ACBE541

## type
mechanism_step_before

## target
CON-DEV-67A96150DDAFD9

## evidence_claim_ids
CLM-C52E0D768511

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-67A96150DDAFD9

## type
mechanism_step_before

## target
CON-DEV-87CC6D0D2EF658

## evidence_claim_ids
CLM-572E690E0D52

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-FFBA6FA260E484

## type
mechanism_step_before

## target
CON-DEV-3A610A0FB2823C

## evidence_claim_ids
CLM-90D1C1F72ABC

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-3A610A0FB2823C

## type
mechanism_step_before

## target
CON-DEV-9A66BF99D1BD3D

## evidence_claim_ids
CLM-9CEF7258084D

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-3A610A0FB2823C

## type
mechanism_step_before

## target
CON-DEV-451A1EDF703FE4

## evidence_claim_ids
CLM-128B558F0D28

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-FFBA6FA260E484

## type
mechanism_step_before

## target
CON-DEV-B33D9F68392311

## evidence_claim_ids
CLM-5B5F6F6BF4E4

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-67A96150DDAFD9

## type
causes

## target
CON-DEV-B33D9F68392311

## evidence_claim_ids
CLM-85B1890C0770

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-87CC6D0D2EF658

## type
mechanism_step_before

## target
CON-DEV-B33D9F68392311

## evidence_claim_ids
CLM-85B1890C0770

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-9A66BF99D1BD3D

## type
mechanism_step_before

## target
CON-DEV-451A1EDF703FE4

## evidence_claim_ids
CLM-104-ANA-AORTIC-SAC-FATE-01

## citation_ids
CIT-104-ANA-AORTIC-SAC-FATE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-DEV-6697214B1AAC0D

## type
mechanism_step_before

## target
CON-DEV-FF2A00EA73BDF9

## evidence_claim_ids
CLM-E8D15F73686E

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-FF2A00EA73BDF9

## type
mechanism_step_before

## target
CON-RES-52A974515C690A

## evidence_claim_ids
CLM-5CE1D8F769C6

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-6697214B1AAC0D

## type
causes

## target
CON-DEV-01BCF61498D863

## evidence_claim_ids
CLM-96AC04EB45A1

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-01BCF61498D863

## type
complication_of

## target
CON-DEV-6697214B1AAC0D

## evidence_claim_ids
CLM-87A963C23BBD

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-01BCF61498D863

## type
associated_with

## target
CON-GIT-4E4EC465826CF2

## evidence_claim_ids
CLM-87A963C23BBD

## verification_status
needs_evidence

---

# Item

## source
CON-GIT-4E4EC465826CF2

## type
associated_with

## target
CON-DEV-01BCF61498D863

## evidence_claim_ids
CLM-87A963C23BBD

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-712BA581C8AF88

## type
composed_of

## target
CON-CVS-30053920BDC07F

## evidence_claim_ids
CLM-17F3B170BB7A

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-B29610035B568D

## type
composed_of

## target
CON-CVS-30053920BDC07F

## evidence_claim_ids
CLM-B66BFE4DE488

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-712BA581C8AF88

## type
contrasts_with

## target
CON-CVS-B29610035B568D

## evidence_claim_ids
CLM-F2C0CE6A462D

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-B29610035B568D

## type
contrasts_with

## target
CON-CVS-712BA581C8AF88

## evidence_claim_ids
CLM-F2C0CE6A462D

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-E6F658EEC11072

## type
part_of

## target
CON-CVS-712BA581C8AF88

## evidence_claim_ids
CLM-8DDA1A3D694D

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-9585A65D9EDA4D

## type
contrasts_with

## target
CON-CVS-132A76916FEC05

## evidence_claim_ids
CLM-104-HIS-CAPILLARY-CONTINUOUS-01

## citation_ids
CIT-104-HIS-CAPILLARY-CONTINUOUS-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-132A76916FEC05

## type
contrasts_with

## target
CON-CVS-9585A65D9EDA4D

## evidence_claim_ids
CLM-DDDE42F826A8

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-E8964EBC8F2357

## type
part_of

## target
CON-CVS-30053920BDC07F

## evidence_claim_ids
CLM-191010D2D6D8

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-7DA6E2CF7A3369

## type
composed_of

## target
CON-CVS-CC8835108F512C

## evidence_claim_ids
CLM-C5C88E97612A

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-CC8835108F512C

## type
contains

## target
CON-CVS-7DA6E2CF7A3369

## evidence_claim_ids
CLM-BAD4A9AC51CD

## verification_status
needs_evidence

---

# Item

## source
CON-HEM-A76AED7046089F

## type
part_of

## target
CON-HEM-D2143156B30A8A

## evidence_claim_ids
CLM-104-HIS-SECONDARY-FOLLICLE-01

## citation_ids
CIT-104-HIS-SECONDARY-FOLLICLE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-748293D5DA5D92

## type
part_of

## target
CON-HEM-D2143156B30A8A

## evidence_claim_ids
CLM-104-HIS-PARACORTEX-01

## citation_ids
CIT-104-HIS-PARACORTEX-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-E3D03CE92F1D92

## type
part_of

## target
CON-HEM-D2143156B30A8A

## evidence_claim_ids
CLM-104-HIS-LYMPH-NODE-MEDULLA-01

## citation_ids
CIT-104-HIS-LYMPH-NODE-MEDULLA-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-D2143156B30A8A

## type
contrasts_with

## target
CON-HEM-2F3CB0082551D1

## evidence_claim_ids
CLM-104-HIS-NODE-VS-SPLEEN-01

## citation_ids
CIT-104-HIS-NODE-VS-SPLEEN-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-2F3CB0082551D1

## type
contrasts_with

## target
CON-HEM-D2143156B30A8A

## evidence_claim_ids
CLM-104-HIS-NODE-VS-SPLEEN-01

## citation_ids
CIT-104-HIS-NODE-VS-SPLEEN-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-7B050DE7FE2B80

## type
part_of

## target
CON-HEM-2F3CB0082551D1

## evidence_claim_ids
CLM-104-HIS-WHITE-PULP-ZONES-01

## citation_ids
CIT-104-HIS-WHITE-PULP-ZONES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-594B1725902DAD

## type
part_of

## target
CON-HEM-2F3CB0082551D1

## evidence_claim_ids
CLM-104-HIS-RED-PULP-01

## citation_ids
CIT-104-HIS-RED-PULP-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-4D47090A0B7561

## type
part_of

## target
CON-HEM-2F3CB0082551D1

## evidence_claim_ids
CLM-104-HIS-SPLENIC-CIRCULATION-THEORIES-01

## citation_ids
CIT-104-HIS-SPLENIC-CIRCULATION-THEORIES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-4D47090A0B7561

## type
part_of

## target
CON-HEM-594B1725902DAD

## evidence_claim_ids
CLM-104-HIS-SPLENIC-CIRCULATION-THEORIES-01

## citation_ids
CIT-104-HIS-SPLENIC-CIRCULATION-THEORIES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-093013026B640A

## type
is_a

## target
CON-HEM-F0020DCB0BA8FD

## evidence_claim_ids
CLM-104-HIS-PALATINE-TONSIL-STRUCTURE-01

## citation_ids
CIT-104-HIS-PALATINE-TONSIL-STRUCTURE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-23C119B7E783BD

## type
is_a

## target
CON-HEM-F0020DCB0BA8FD

## evidence_claim_ids
CLM-104-HIS-PHARYNGEAL-TONSIL-01

## citation_ids
CIT-104-HIS-PHARYNGEAL-TONSIL-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-23C119B7E783BD

## type
contrasts_with

## target
CON-HEM-093013026B640A

## evidence_claim_ids
CLM-104-HIS-PHARYNGEAL-TONSIL-01

## citation_ids
CIT-104-HIS-PHARYNGEAL-TONSIL-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-093013026B640A

## type
contrasts_with

## target
CON-HEM-23C119B7E783BD

## evidence_claim_ids
CLM-104-HIS-PHARYNGEAL-TONSIL-01

## citation_ids
CIT-104-HIS-PHARYNGEAL-TONSIL-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-A165FFF2DDDE92

## type
part_of

## target
CON-HEM-F0020DCB0BA8FD

## evidence_claim_ids
CLM-104-HIS-TONSIL-FUNCTION-01

## citation_ids
CIT-104-HIS-TONSIL-FUNCTION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-10B2E783E164FD

## type
part_of

## target
CON-HEM-BA8773E5D84286

## evidence_claim_ids
CLM-104-HIS-HASSALL-CORPUSCLE-01

## citation_ids
CIT-104-HIS-HASSALL-CORPUSCLE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-02424D1AF8A169

## type
part_of

## target
CON-HEM-BA8773E5D84286

## evidence_claim_ids
CLM-104-HIS-THYMIC-EPITHELIAL-RETICULAR-CELLS-01

## citation_ids
CIT-104-HIS-THYMIC-EPITHELIAL-RETICULAR-CELLS-01-ORIGIN

## verification_status
verified

---

# Item

## source
CON-HEM-BB5A071CEEB78F

## type
part_of

## target
CON-HEM-BA8773E5D84286

## evidence_claim_ids
CLM-104-HIS-BLOOD-THYMIC-BARRIER-01

## citation_ids
CIT-104-HIS-BLOOD-THYMIC-BARRIER-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-3E38A04641F73C

## type
contrasts_with

## target
CON-HEM-D2143156B30A8A

## evidence_claim_ids
CLM-104-HIS-THYMUS-ABSENCES-01

## citation_ids
CIT-104-HIS-THYMUS-ABSENCES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-D2143156B30A8A

## type
contrasts_with

## target
CON-HEM-3E38A04641F73C

## evidence_claim_ids
CLM-104-HIS-THYMUS-ABSENCES-01

## citation_ids
CIT-104-HIS-THYMUS-ABSENCES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-D8B1BE3C6CFABD

## type
is_a

## target
CON-HEM-D1628423BE0844

## evidence_claim_ids
CLM-9D6C8373BC00

## verification_status
needs_evidence

---

# Item

## source
CON-RES-58840F56FB3A36

## type
part_of

## target
CON-RES-1FF74892D5B943

## evidence_claim_ids
CLM-F641FC6315DF

## verification_status
needs_evidence

---

# Item

## source
CON-RES-58840F56FB3A36

## type
contrasts_with

## target
CON-RES-38BA83C42FBE02

## evidence_claim_ids
CLM-104-HIS-OLFACTORY-EPITHELIUM-01

## citation_ids
CIT-104-HIS-OLFACTORY-EPITHELIUM-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-38BA83C42FBE02

## type
contrasts_with

## target
CON-RES-58840F56FB3A36

## evidence_claim_ids
CLM-104-HIS-OLFACTORY-EPITHELIUM-01

## citation_ids
CIT-104-HIS-OLFACTORY-EPITHELIUM-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-38BA83C42FBE02

## type
part_of

## target
CON-RES-7C79F2D68F1003

## evidence_claim_ids
CLM-FCA8EC690A3E

## verification_status
needs_evidence

---

# Item

## source
CON-RES-7C79F2D68F1003

## type
mechanism_step_before

## target
CON-RES-52A974515C690A

## evidence_claim_ids
CLM-D48796CB012A

## verification_status
needs_evidence

---

# Item

## source
CON-RES-94F66D51DB5B4D

## type
part_of

## target
CON-RES-ED5ADFB428C5BF

## evidence_claim_ids
CLM-5D34E9C7D86A

## verification_status
needs_evidence

---

# Item

## source
CON-RES-ED5ADFB428C5BF

## type
part_of

## target
CON-RES-52A974515C690A

## evidence_claim_ids
CLM-52160192B0FE

## verification_status
needs_evidence

---

# Item

## source
CON-RES-D8B1BE3C6CFABD

## type
located_in

## target
CON-RES-52A974515C690A

## evidence_claim_ids
CLM-9D6C8373BC00

## verification_status
needs_evidence

---

# Item

## source
CON-RES-099718106C38CD

## type
connects_to

## target
CON-RES-A6B5E6793B2E5E

## evidence_claim_ids
CLM-C79D7FDD6F6F

## verification_status
needs_evidence

---

# Item

## source
CON-RES-099718106C38CD

## type
part_of

## target
CON-RES-1FF74892D5B943

## evidence_claim_ids
CLM-C79D7FDD6F6F

## verification_status
needs_evidence

---

# Item

## source
CON-FND-9C205E44C3404D

## type
mechanism_step_before

## target
CON-FND-6DEB5A4F0F1675

## evidence_claim_ids
CLM-5D726723382B

## citation_ids
CIT-1B3700AAC438

## verification_status
verified

---

# Item

## source
CON-FND-6DEB5A4F0F1675

## type
contrasts_with

## target
CON-FND-685D573458A6D7

## evidence_claim_ids
CLM-A4E9EC9526A3

## verification_status
needs_evidence

---

# Item

## source
CON-FND-685D573458A6D7

## type
contrasts_with

## target
CON-FND-6DEB5A4F0F1675

## evidence_claim_ids
CLM-A4E9EC9526A3

## verification_status
needs_evidence

---

# Item

## source
CON-FND-918BBB81C26937

## type
prerequisite_of

## target
CON-FND-29D305EDFC022D

## evidence_claim_ids
CLM-BFA6E6F28617

## verification_status
needs_evidence

---

# Item

## source
CON-FND-29D305EDFC022D

## type
prerequisite_of

## target
CON-FND-C7C2723BD3BC8D

## evidence_claim_ids
CLM-CAC25DF4D63B

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-294FB8DDA40429

## type
diagnosed_by

## target
CON-FND-C7C2723BD3BC8D

## evidence_claim_ids
CLM-7AA73A72F47B

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-C5F7B1973F8049

## type
diagnosed_by

## target
CON-FND-C7C2723BD3BC8D

## evidence_claim_ids
CLM-7AA73A72F47B

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-C5F7B1973F8049

## type
diagnosed_by

## target
CON-FND-7FE32E35CA4C7F

## evidence_claim_ids
CLM-D606F34401F5

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-C2AC39B48A8F21

## type
causes

## target
CON-DEV-451A64C9445CAB

## evidence_claim_ids
CLM-104-HIS-ANEUPLOIDY-DEFINITION-01

## citation_ids
CIT-104-HIS-ANEUPLOIDY-DEFINITION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-DEV-294FB8DDA40429

## type
is_a

## target
CON-DEV-451A64C9445CAB

## evidence_claim_ids
CLM-0C6BD3AC29CB

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-C5F7B1973F8049

## type
is_a

## target
CON-DEV-451A64C9445CAB

## evidence_claim_ids
CLM-D606F34401F5

## verification_status
needs_evidence

---

# Item

## source
CON-DEV-D2BA4082190B3F

## type
contrasts_with

## target
CON-DEV-451A64C9445CAB

## evidence_claim_ids
CLM-6008DF5BAE4A

## citation_ids
CIT-83AB65FC8898

## verification_status
verified

---

# Item

## source
CON-DEV-451A64C9445CAB

## type
contrasts_with

## target
CON-DEV-D2BA4082190B3F

## evidence_claim_ids
CLM-B0BE3DB717C5

## verification_status
needs_evidence

---

# Item

## source
CON-FND-4699C7DBCE159A

## type
prerequisite_of

## target
CON-FND-A2E40256517389

## evidence_claim_ids
CLM-254976608DE5

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-34D3CB7F794801

## type
mechanism_step_before

## target
CON-CVS-0AD04EE46FD2C5

## evidence_claim_ids
CLM-104-PHY-PACEMAKER-PHASE4-01

## citation_ids
CIT-104-PHY-PACEMAKER-PHASE4-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-0AD04EE46FD2C5

## type
prerequisite_of

## target
CON-CVS-802E52B82883CD

## evidence_claim_ids
CLM-104-PHY-PACEMAKER-UPSTROKE-01

## citation_ids
CIT-104-PHY-PACEMAKER-UPSTROKE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-0AD04EE46FD2C5

## type
mechanism_step_before

## target
CON-CVS-11E581298A0B95

## evidence_claim_ids
CLM-104-PHY-CONDUCTION-VELOCITY-01

## citation_ids
CIT-104-PHY-CONDUCTION-VELOCITY-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-11E581298A0B95

## type
mechanism_step_before

## target
CON-CVS-818EC10C20A623

## evidence_claim_ids
CLM-104-PHY-CONDUCTION-VELOCITY-01

## citation_ids
CIT-104-PHY-CONDUCTION-VELOCITY-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-818EC10C20A623

## type
mechanism_step_before

## target
CON-CVS-5288011D93888B

## evidence_claim_ids
CLM-104-PHY-AP-PHASE2-01

## citation_ids
CIT-104-PHY-AP-PHASE2-01-BALANCE

## verification_status
verified

---

# Item

## source
CON-CVS-5288011D93888B

## type
mechanism_step_before

## target
CON-CVS-71212213BD80F3

## evidence_claim_ids
CLM-104-PHY-REFRACTORY-TETANUS-01

## citation_ids
CIT-104-PHY-REFRACTORY-TETANUS-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-71212213BD80F3

## type
mechanism_step_before

## target
CON-CVS-CEB3B0EC313DC9

## evidence_claim_ids
CLM-104-PHY-EC-COUPLING-01

## citation_ids
CIT-104-PHY-EC-COUPLING-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-AAAD34C16F9880

## type
regulates

## target
CON-CVS-34D3CB7F794801

## evidence_claim_ids
CLM-104-PHY-AUTONOMIC-CHRONOTROPY-01

## citation_ids
CIT-104-PHY-AUTONOMIC-CHRONOTROPY-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-7A8A04F61D44D1

## type
prerequisite_of

## target
CON-CVS-71212213BD80F3

## evidence_claim_ids
CLM-104-PHY-IONIC-PUMPS-01

## citation_ids
CIT-104-PHY-IONIC-PUMPS-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-BF82D6F52B72C9

## type
regulates

## target
CON-CVS-71212213BD80F3

## evidence_claim_ids
CLM-104-PHY-INOTROPY-LUSITROPY-01

## citation_ids
CIT-104-PHY-INOTROPY-LUSITROPY-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-71212213BD80F3

## type
causes

## target
CON-CVS-BE5C24D066F705

## evidence_claim_ids
CLM-104-PHY-TREPPE-01

## citation_ids
CIT-104-PHY-TREPPE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-A70930DB23A5B4

## type
part_of

## target
CON-CVS-8D34A57C987227

## evidence_claim_ids
CLM-104-PHY-EJECTION-PHASES-01

## citation_ids
CIT-104-PHY-EJECTION-PHASES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-A70930DB23A5B4

## type
mechanism_step_before

## target
CON-CVS-F8BD2261B8CBDA

## evidence_claim_ids
CLM-104-PHY-EJECTION-PHASES-01

## citation_ids
CIT-104-PHY-EJECTION-PHASES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-8D34A57C987227

## type
mechanism_step_before

## target
CON-CVS-43B32FA3653194

## evidence_claim_ids
CLM-104-PHY-CYCLE-PHASES-01

## citation_ids
CIT-104-PHY-CYCLE-PHASES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-CEB3B0EC313DC9

## type
prerequisite_of

## target
CON-CVS-D97F7FD5B9F824

## evidence_claim_ids
CLM-104-PHY-FRANK-STARLING-01

## citation_ids
CIT-104-PHY-FRANK-STARLING-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-D97F7FD5B9F824

## type
prerequisite_of

## target
CON-CVS-BDAE3CD8565D49

## evidence_claim_ids
CLM-104-PHY-CO-DEFINITION-01

## citation_ids
CIT-104-PHY-CO-DEFINITION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-BDAE3CD8565D49

## type
mechanism_step_before

## target
CON-CVS-73064071B3660C

## evidence_claim_ids
CLM-104-PHY-CO-CONDITIONS-01

## citation_ids
CIT-104-PHY-CO-CONDITIONS-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-CEB3B0EC313DC9

## type
prerequisite_of

## target
CON-CVS-C1D705743C07E3

## evidence_claim_ids
CLM-104-PHY-FRANK-STARLING-01

## citation_ids
CIT-104-PHY-FRANK-STARLING-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-D97F7FD5B9F824

## type
prerequisite_of

## target
CON-CVS-A99309543A270D

## evidence_claim_ids
CLM-104-PHY-CO-DEFINITION-01

## citation_ids
CIT-104-PHY-CO-DEFINITION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-B21C3D54DE291E

## type
prerequisite_of

## target
CON-CVS-D97F7FD5B9F824

## evidence_claim_ids
CLM-104-PHY-MSFP-VALUE-01

## citation_ids
CIT-104-PHY-MSFP-VALUE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-08B8764A5D501B

## type
prerequisite_of

## target
CON-CVS-B21C3D54DE291E

## evidence_claim_ids
CLM-104-PHY-THORACIC-PUMP-01

## citation_ids
CIT-104-PHY-THORACIC-PUMP-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-FA5FB57963DDF7

## type
prerequisite_of

## target
CON-CVS-78E74CAC3AE5E5

## evidence_claim_ids
CLM-104-PHY-HEMODYNAMICS-FLOW-01

## citation_ids
CIT-104-PHY-HEMODYNAMICS-FLOW-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-FA5FB57963DDF7

## type
prerequisite_of

## target
CON-CVS-A0579343614BCD

## evidence_claim_ids
CLM-104-PHY-HEMODYNAMICS-FLOW-01

## citation_ids
CIT-104-PHY-HEMODYNAMICS-FLOW-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-A0579343614BCD

## type
prerequisite_of

## target
CON-CVS-C3E60AC7A9EDB1

## evidence_claim_ids
CLM-104-PHY-HEMODYNAMICS-ABP-01

## citation_ids
CIT-104-PHY-HEMODYNAMICS-ABP-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-C3E60AC7A9EDB1

## type
mechanism_step_before

## target
CON-CVS-3D7B3647E1B8B2

## evidence_claim_ids
CLM-104-PHY-BARORECEPTOR-SITE-01

## citation_ids
CIT-104-PHY-BARORECEPTOR-SITE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-131F06D46D3B84

## type
mechanism_step_before

## target
CON-CVS-3D7B3647E1B8B2

## evidence_claim_ids
CLM-104-PHY-PERIPH-CHEMO-01

## citation_ids
CIT-104-PHY-PERIPH-CHEMO-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-3D7B3647E1B8B2

## type
mechanism_step_before

## target
CON-CVS-AAAD34C16F9880

## evidence_claim_ids
CLM-104-PHY-MEDULLARY-CENTERS-01

## citation_ids
CIT-104-PHY-MEDULLARY-CENTERS-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-8E2C7AEC68C4CB

## type
mechanism_step_before

## target
CON-CVS-BBAEB2E1A51102

## evidence_claim_ids
CLM-104-PHY-CNS-ISCHEMIC-01

## citation_ids
CIT-104-PHY-CNS-ISCHEMIC-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-C3E60AC7A9EDB1

## type
prerequisite_of

## target
CON-CVS-0143EA79851601

## evidence_claim_ids
CLM-104-PHY-BARORECEPTOR-SITE-01

## citation_ids
CIT-104-PHY-BARORECEPTOR-SITE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-230096C97EAB11

## type
contrasts_with

## target
CON-CVS-131F06D46D3B84

## evidence_claim_ids
CLM-104-PHY-CENTRAL-CHEMO-01

## citation_ids
CIT-104-PHY-CENTRAL-CHEMO-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-131F06D46D3B84

## type
contrasts_with

## target
CON-CVS-230096C97EAB11

## evidence_claim_ids
CLM-104-PHY-PERIPH-CHEMO-01

## citation_ids
CIT-104-PHY-PERIPH-CHEMO-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-56A68328FD03C7

## type
prerequisite_of

## target
CON-CVS-B29600F656A34B

## evidence_claim_ids
CLM-104-PHY-LOCAL-REGULATION-01

## citation_ids
CIT-104-PHY-LOCAL-REGULATION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-36B0211A4D9ACC

## type
regulates

## target
CON-CVS-AAAD34C16F9880

## evidence_claim_ids
CLM-104-PHY-AUTONOMIC-CHRONOTROPY-01

## citation_ids
CIT-104-PHY-AUTONOMIC-CHRONOTROPY-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-76412894FAD01C

## type
contrasts_with

## target
CON-CVS-56A68328FD03C7

## evidence_claim_ids
CLM-104-PHY-PULMONARY-CIRC-01

## citation_ids
CIT-104-PHY-PULMONARY-CIRC-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-56A68328FD03C7

## type
contrasts_with

## target
CON-CVS-76412894FAD01C

## evidence_claim_ids
CLM-104-PHY-PULMONARY-CIRC-01

## citation_ids
CIT-104-PHY-PULMONARY-CIRC-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-D3D1AF25EFA406

## type
prerequisite_of

## target
CON-CVS-98657F1E7D300D

## evidence_claim_ids
CLM-104-PHY-CAPILLARY-DIFFUSION-01

## citation_ids
CIT-104-PHY-CAPILLARY-DIFFUSION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-98657F1E7D300D

## type
causes

## target
CON-CVS-6D8E2D62A9F51E

## evidence_claim_ids
CLM-104-PHY-CAPILLARY-ISF-01

## citation_ids
CIT-104-PHY-CAPILLARY-ISF-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-2C65CCE1C08853

## type
prerequisite_of

## target
CON-CVS-6D8E2D62A9F51E

## evidence_claim_ids
CLM-104-PHY-CAPILLARY-LYMPH-01

## citation_ids
CIT-104-PHY-CAPILLARY-LYMPH-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-97B778DE471E7E

## type
prerequisite_of

## target
CON-RES-1BA6BE714676EC

## evidence_claim_ids
CLM-104-PHY-TRANSPULMONARY-01

## citation_ids
CIT-104-PHY-TRANSPULMONARY-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-4D4CBF3BB8AF1E

## type
decreases

## target
CON-RES-1BA6BE714676EC

## evidence_claim_ids
CLM-104-PHY-SURFACTANT-SOURCE-01

## citation_ids
CIT-104-PHY-SURFACTANT-SOURCE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-F9A8562032A469

## type
prerequisite_of

## target
CON-RES-317D54C114B246

## evidence_claim_ids
CLM-104-PHY-DEADSPACE-01

## citation_ids
CIT-104-PHY-DEADSPACE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-317D54C114B246

## type
associated_with

## target
CON-RES-4A773ABA9943BE

## evidence_claim_ids
CLM-104-PHY-VQ-01

## citation_ids
CIT-104-PHY-VQ-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-4A773ABA9943BE

## type
associated_with

## target
CON-RES-317D54C114B246

## evidence_claim_ids
CLM-104-PHY-PULM-SHUNT-01

## citation_ids
CIT-104-PHY-PULM-SHUNT-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-76412894FAD01C

## type
regulates

## target
CON-RES-317D54C114B246

## evidence_claim_ids
CLM-104-PHY-PULMONARY-CIRC-01

## citation_ids
CIT-104-PHY-PULMONARY-CIRC-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-C323EEF5DA30FF

## type
prerequisite_of

## target
CON-RES-228D7C6B6FDE80

## evidence_claim_ids
CLM-104-PHY-DIFFUSION-01

## citation_ids
CIT-104-PHY-DIFFUSION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-228D7C6B6FDE80

## type
prerequisite_of

## target
CON-RES-D95A9FD64ABF25

## evidence_claim_ids
CLM-104-PHY-O2CONTENT-01

## citation_ids
CIT-104-PHY-O2CONTENT-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-9D54E7538F395C

## type
prerequisite_of

## target
CON-RES-1488F775DCD49E

## evidence_claim_ids
CLM-104-PHY-CHLORIDESHIFT-01

## citation_ids
CIT-104-PHY-CHLORIDESHIFT-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-1488F775DCD49E

## type
contrasts_with

## target
CON-RES-D95A9FD64ABF25

## evidence_claim_ids
CLM-104-PHY-HALDANE-01

## citation_ids
CIT-104-PHY-HALDANE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-D95A9FD64ABF25

## type
contrasts_with

## target
CON-RES-1488F775DCD49E

## evidence_claim_ids
CLM-104-PHY-HALDANE-01

## citation_ids
CIT-104-PHY-HALDANE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-C6F65BAAC06FAA

## type
mechanism_step_before

## target
CON-RES-A54FECB95CBEBC

## evidence_claim_ids
CLM-104-PHY-CENTRALCHEMO-RESP-01

## citation_ids
CIT-104-PHY-CENTRALCHEMO-RESP-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-A54FECB95CBEBC

## type
mechanism_step_before

## target
CON-RES-B68E39C6B4178F

## evidence_claim_ids
CLM-104-PHY-RESPCENTER-01

## citation_ids
CIT-104-PHY-RESPCENTER-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-C6F65BAAC06FAA

## type
associated_with

## target
CON-CVS-131F06D46D3B84

## evidence_claim_ids
CLM-104-PHY-PERIPHCHEMO-RESP-01

## citation_ids
CIT-104-PHY-PERIPHCHEMO-RESP-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-131F06D46D3B84

## type
associated_with

## target
CON-RES-C6F65BAAC06FAA

## evidence_claim_ids
CLM-104-PHY-PERIPHCHEMO-RESP-01

## citation_ids
CIT-104-PHY-PERIPHCHEMO-RESP-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-C6F65BAAC06FAA

## type
associated_with

## target
CON-CVS-230096C97EAB11

## evidence_claim_ids
CLM-104-PHY-CENTRALCHEMO-RESP-01

## citation_ids
CIT-104-PHY-CENTRALCHEMO-RESP-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-230096C97EAB11

## type
associated_with

## target
CON-RES-C6F65BAAC06FAA

## evidence_claim_ids
CLM-104-PHY-CENTRALCHEMO-RESP-01

## citation_ids
CIT-104-PHY-CENTRALCHEMO-RESP-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-6799821893D6D2

## type
prerequisite_of

## target
CON-CVS-0AD04EE46FD2C5

## evidence_claim_ids
CLM-4905A5EAC0EF

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-6799821893D6D2

## type
prerequisite_of

## target
CON-CVS-802E52B82883CD

## evidence_claim_ids
CLM-4905A5EAC0EF

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-6799821893D6D2

## type
prerequisite_of

## target
CON-CVS-11E581298A0B95

## evidence_claim_ids
CLM-4905A5EAC0EF

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-CC8835108F512C

## type
prerequisite_of

## target
CON-CVS-71212213BD80F3

## evidence_claim_ids
CLM-15EAC759559D

## citation_ids
CIT-D422325DE0A6

## verification_status
verified

---

# Item

## source
CON-CVS-30053920BDC07F

## type
prerequisite_of

## target
CON-CVS-78E74CAC3AE5E5

## evidence_claim_ids
CLM-E30FB325FC5D

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-712BA581C8AF88

## type
prerequisite_of

## target
CON-CVS-FA5FB57963DDF7

## evidence_claim_ids
CLM-915B0B6018D8

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-9585A65D9EDA4D

## type
prerequisite_of

## target
CON-CVS-D3D1AF25EFA406

## evidence_claim_ids
CLM-104-HIS-CAPILLARY-CONTINUOUS-01

## citation_ids
CIT-104-HIS-CAPILLARY-CONTINUOUS-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-132A76916FEC05

## type
prerequisite_of

## target
CON-CVS-D3D1AF25EFA406

## evidence_claim_ids
CLM-DDDE42F826A8

## verification_status
needs_evidence

---

# Item

## source
CON-RES-52A974515C690A

## type
prerequisite_of

## target
CON-RES-C323EEF5DA30FF

## evidence_claim_ids
CLM-4E1D08498C2D

## citation_ids
CIT-2793456A42F1

## verification_status
verified

---

# Item

## source
CON-RES-ED5ADFB428C5BF

## type
prerequisite_of

## target
CON-RES-C323EEF5DA30FF

## evidence_claim_ids
CLM-52160192B0FE

## verification_status
needs_evidence

---

# Item

## source
CON-RES-94F66D51DB5B4D

## type
prerequisite_of

## target
CON-RES-4D4CBF3BB8AF1E

## evidence_claim_ids
CLM-875F35140519

## verification_status
needs_evidence

---

# Item

## source
CON-RES-7C79F2D68F1003

## type
prerequisite_of

## target
CON-RES-57BCE3B42BEF36

## evidence_claim_ids
CLM-D48796CB012A

## verification_status
needs_evidence

---

# Item

## source
CON-RES-A6B5E6793B2E5E

## type
prerequisite_of

## target
CON-RES-F9A8562032A469

## evidence_claim_ids
CLM-91DECCAE3D3A

## verification_status
needs_evidence

---

# Item

## source
CON-RES-16C7132ECAA7BF

## type
prerequisite_of

## target
CON-RES-F9A8562032A469

## evidence_claim_ids
CLM-52E34C24F9BF

## citation_ids
CIT-3E52E9DB8281

## verification_status
verified

---

# Item

## source
CON-RES-6023E5A5A7161F

## type
prerequisite_of

## target
CON-RES-1BA6BE714676EC

## evidence_claim_ids
CLM-3224CFF02AF7

## citation_ids
CIT-545F7F1F360C

## verification_status
verified

---

# Item

## source
CON-RES-449B5BD0266989

## type
prerequisite_of

## target
CON-RES-1BA6BE714676EC

## evidence_claim_ids
CLM-F63B9B08E0F9

## verification_status
needs_evidence

---

# Item

## source
CON-RES-CED26421AF8B39

## type
prerequisite_of

## target
CON-RES-97B778DE471E7E

## evidence_claim_ids
CLM-957D957C3DF1

## citation_ids
CIT-E25F71D15E58

## verification_status
verified

---

# Item

## source
CON-RES-B833146BBFCB26

## type
prerequisite_of

## target
CON-RES-97B778DE471E7E

## evidence_claim_ids
CLM-9BA340C27BF0

## verification_status
needs_evidence

---

# Item

## source
CON-RES-CF9852282948CD

## type
prerequisite_of

## target
CON-CVS-76412894FAD01C

## evidence_claim_ids
CLM-968A1027874E

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-A723ADE6F4E726

## type
prerequisite_of

## target
CON-CVS-76412894FAD01C

## evidence_claim_ids
CLM-467AEC52EB80

## citation_ids
CIT-6E03BB9779AE

## verification_status
verified

---

# Item

## source
CON-HEM-9123D4493320A7

## type
prerequisite_of

## target
CON-CVS-2C65CCE1C08853

## evidence_claim_ids
CLM-A3FE8F6B377E

## citation_ids
CIT-920A0EE19B7C

## verification_status
verified

---

# Item

## source
CON-HEM-B7A01B9D061793

## type
prerequisite_of

## target
CON-CVS-2C65CCE1C08853

## evidence_claim_ids
CLM-DABE66648BE0

## citation_ids
CIT-4BFE4907639D

## verification_status
verified

---

# Item

## source
CON-CVS-E9CF510CBD01BC

## type
prerequisite_of

## target
CON-CVS-AAAD34C16F9880

## evidence_claim_ids
CLM-F6560BAB3901

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-6BF9AE4B31AD3D

## type
prerequisite_of

## target
CON-CVS-AAAD34C16F9880

## evidence_claim_ids
CLM-B686106E7846

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-2A21F1B4F30B61

## type
prerequisite_of

## target
CON-CVS-B29600F656A34B

## evidence_claim_ids
CLM-02F71C2B53FD

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-1F1AB4B70AB06D

## type
prerequisite_of

## target
CON-CVS-B29600F656A34B

## evidence_claim_ids
CLM-60A8FC29C185

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-929D9DDCB95482

## type
prerequisite_of

## target
CON-CVS-B29600F656A34B

## evidence_claim_ids
CLM-D244AC32AFDA

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-D2307B39C55336

## type
prerequisite_of

## target
CON-CVS-43B32FA3653194

## evidence_claim_ids
CLM-B54A2317EE79

## citation_ids
CIT-EF30B4FF4B35

## verification_status
verified

---

# Item

## source
CON-RES-CED26421AF8B39

## type
prerequisite_of

## target
CON-RES-7EDFFAB60101ED

## evidence_claim_ids
CLM-957D957C3DF1

## citation_ids
CIT-E25F71D15E58

## verification_status
verified

---

# Item

## source
CON-MSK-54A6BFC89A697C

## type
prerequisite_of

## target
CON-RES-1BA6BE714676EC

## evidence_claim_ids
CLM-CF9A38CF0364

## citation_ids
CIT-B0D759BB221E

## verification_status
verified

---

# Item

## source
CON-RES-671ABF9D60BE19

## type
prerequisite_of

## target
CON-RES-1BA6BE714676EC

## evidence_claim_ids
CLM-BE9F02C96E1F

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-D02DE9B56C97B7

## type
located_in

## target
CON-CVS-83DB0089BA4BD1

## evidence_claim_ids
CLM-1642ACF49DCE

## citation_ids
CIT-19E8DDEAE3ED

## verification_status
verified

---

# Item

## source
CON-CVS-9CDFD3C60A2550

## type
located_in

## target
CON-RES-F360EFDEA84D58

## evidence_claim_ids
CLM-BF8CAFC6FEAC

## citation_ids
CIT-0AE922AF7D70

## verification_status
verified

---

# Item

## source
CON-CVS-D2307B39C55336

## type
located_in

## target
CON-RES-F360EFDEA84D58

## evidence_claim_ids
CLM-B54A2317EE79

## citation_ids
CIT-EF30B4FF4B35

## verification_status
verified

---

# Item

## source
CON-CVS-6BF9AE4B31AD3D

## type
located_in

## target
CON-RES-03AB23DA654BAF

## evidence_claim_ids
CLM-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01

## citation_ids
CIT-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-GIT-4E4EC465826CF2

## type
located_in

## target
CON-RES-03AB23DA654BAF

## evidence_claim_ids
CLM-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01

## citation_ids
CIT-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-EEA29FB47CBB71

## type
located_in

## target
CON-RES-03AB23DA654BAF

## evidence_claim_ids
CLM-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01

## citation_ids
CIT-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-9123D4493320A7

## type
located_in

## target
CON-RES-03AB23DA654BAF

## evidence_claim_ids
CLM-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01

## citation_ids
CIT-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-74C0F9BB0D3490

## type
located_in

## target
CON-CVS-83DB0089BA4BD1

## evidence_claim_ids
CLM-979D2251A6F3

## verification_status
needs_evidence

---

# Item

## source
CON-RES-A6B5E6793B2E5E

## type
located_in

## target
CON-RES-F360EFDEA84D58

## evidence_claim_ids
CLM-8734E1BA4D90

## citation_ids
CIT-CB587EAC99C2

## verification_status
verified

---

# Item

## source
CON-CVS-9C60987F3CB5A1

## type
located_in

## target
CON-RES-F360EFDEA84D58

## evidence_claim_ids
CLM-8734E1BA4D90

## citation_ids
CIT-CB587EAC99C2

## verification_status
verified

---

# Item

## source
CON-RES-AFCED19BA66ED2

## type
associated_with

## target
CON-DEV-8265C9033E19B1

## evidence_claim_ids
CLM-D0FF5D75647D

## citation_ids
CIT-103B68CC89B7

## verification_status
verified

---

# Item

## source
CON-DEV-8265C9033E19B1

## type
associated_with

## target
CON-RES-AFCED19BA66ED2

## evidence_claim_ids
CLM-D0FF5D75647D

## citation_ids
CIT-103B68CC89B7

## verification_status
verified

---

# Item

## source
CON-CVS-1F1AB4B70AB06D

## type
contrasts_with

## target
CON-CVS-2A21F1B4F30B61

## evidence_claim_ids
CLM-02F71C2B53FD

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-2A21F1B4F30B61

## type
contrasts_with

## target
CON-CVS-1F1AB4B70AB06D

## evidence_claim_ids
CLM-02F71C2B53FD

## verification_status
needs_evidence

---

# Item

## source
CON-RES-16C7132ECAA7BF

## type
associated_with

## target
CON-RES-491F7739C10120

## evidence_claim_ids
CLM-EE69EEE8C0A0

## verification_status
needs_evidence

---

# Item

## source
CON-RES-491F7739C10120

## type
associated_with

## target
CON-RES-16C7132ECAA7BF

## evidence_claim_ids
CLM-EE69EEE8C0A0

## verification_status
needs_evidence

---

# Item

## source
CON-RES-2A560C53F8E712

## type
part_of

## target
CON-RES-16C7132ECAA7BF

## evidence_claim_ids
CLM-52E34C24F9BF

## citation_ids
CIT-3E52E9DB8281

## verification_status
verified

---

# Item

## source
CON-CVS-42C907CE4749DC

## type
contains

## target
CON-CVS-6799821893D6D2

## evidence_claim_ids
CLM-4905A5EAC0EF

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-B12EDEA332E53F

## type
part_of

## target
CON-CVS-6BF9AE4B31AD3D

## evidence_claim_ids
CLM-B686106E7846

## verification_status
needs_evidence

---

# Item

## source
CON-RES-A9AE09CC34A162

## type
located_in

## target
CON-RES-6023E5A5A7161F

## evidence_claim_ids
CLM-3224CFF02AF7

## citation_ids
CIT-545F7F1F360C

## verification_status
verified

---

# Item

## source
CON-CVS-4F6394A2A7C0C5

## type
causes

## target
CON-CVS-E9BA4A6C0E8392

## evidence_claim_ids
CLM-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01

## citation_ids
CIT-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01-ANEURYSM

## verification_status
verified

---

# Item

## source
CON-CVS-E9BA4A6C0E8392

## type
complication_of

## target
CON-CVS-4F6394A2A7C0C5

## evidence_claim_ids
CLM-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01

## citation_ids
CIT-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01-ANEURYSM

## verification_status
verified

---

# Item

## source
CON-DEV-451A1EDF703FE4

## type
causes

## target
CON-GIT-4E4EC465826CF2

## evidence_claim_ids
CLM-031ED2506C31

## verification_status
needs_evidence

---

# Item

## source
CON-GIT-4E4EC465826CF2

## type
complication_of

## target
CON-DEV-451A1EDF703FE4

## evidence_claim_ids
CLM-031ED2506C31

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-CFF45F193765C4

## type
supplies

## target
CON-CVS-74C0F9BB0D3490

## evidence_claim_ids
CLM-A567B7E6803D

## verification_status
needs_evidence

---

# Item

## source
CON-RES-58840F56FB3A36

## type
located_in

## target
CON-DEV-6697214B1AAC0D

## evidence_claim_ids
CLM-E8D15F73686E

## verification_status
needs_evidence

---

# Item

## source
CON-HEM-3E38A04641F73C

## type
part_of

## target
CON-HEM-BA8773E5D84286

## evidence_claim_ids
CLM-104-HIS-THYMUS-LOBULATION-01

## citation_ids
CIT-104-HIS-THYMUS-LOBULATION-01-STROMA

## verification_status
verified

---

# Item

## source
CON-HEM-A165FFF2DDDE92

## type
prerequisite_of

## target
CON-HEM-093013026B640A

## evidence_claim_ids
CLM-104-HIS-PALATINE-TONSIL-STRUCTURE-01

## citation_ids
CIT-104-HIS-PALATINE-TONSIL-STRUCTURE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-A76AED7046089F

## type
prerequisite_of

## target
CON-HEM-748293D5DA5D92

## evidence_claim_ids
CLM-104-HIS-PARACORTEX-01

## citation_ids
CIT-104-HIS-PARACORTEX-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-D2143156B30A8A

## type
contains

## target
CON-HEM-A76AED7046089F

## evidence_claim_ids
CLM-104-HIS-SECONDARY-FOLLICLE-01

## citation_ids
CIT-104-HIS-SECONDARY-FOLLICLE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-D2143156B30A8A

## type
contains

## target
CON-HEM-748293D5DA5D92

## evidence_claim_ids
CLM-104-HIS-PARACORTEX-01

## citation_ids
CIT-104-HIS-PARACORTEX-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-D2143156B30A8A

## type
contains

## target
CON-HEM-E3D03CE92F1D92

## evidence_claim_ids
CLM-104-HIS-LYMPH-NODE-MEDULLA-01

## citation_ids
CIT-104-HIS-LYMPH-NODE-MEDULLA-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-2F3CB0082551D1

## type
contains

## target
CON-HEM-7B050DE7FE2B80

## evidence_claim_ids
CLM-104-HIS-WHITE-PULP-ZONES-01

## citation_ids
CIT-104-HIS-WHITE-PULP-ZONES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-2F3CB0082551D1

## type
contains

## target
CON-HEM-594B1725902DAD

## evidence_claim_ids
CLM-104-HIS-RED-PULP-01

## citation_ids
CIT-104-HIS-RED-PULP-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-4D47090A0B7561

## type
prerequisite_of

## target
CON-HEM-594B1725902DAD

## evidence_claim_ids
CLM-104-HIS-RED-PULP-01

## citation_ids
CIT-104-HIS-RED-PULP-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-BA8773E5D84286

## type
contains

## target
CON-HEM-10B2E783E164FD

## evidence_claim_ids
CLM-104-HIS-HASSALL-CORPUSCLE-01

## citation_ids
CIT-104-HIS-HASSALL-CORPUSCLE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-BA8773E5D84286

## type
contains

## target
CON-HEM-02424D1AF8A169

## evidence_claim_ids
CLM-104-HIS-THYMIC-EPITHELIAL-RETICULAR-CELLS-01

## citation_ids
CIT-104-HIS-THYMIC-EPITHELIAL-RETICULAR-CELLS-01-ORIGIN

## verification_status
verified

---

# Item

## source
CON-HEM-BA8773E5D84286

## type
contains

## target
CON-HEM-BB5A071CEEB78F

## evidence_claim_ids
CLM-104-HIS-BLOOD-THYMIC-BARRIER-01

## citation_ids
CIT-104-HIS-BLOOD-THYMIC-BARRIER-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-HEM-02424D1AF8A169

## type
prerequisite_of

## target
CON-HEM-BB5A071CEEB78F

## evidence_claim_ids
CLM-104-HIS-BLOOD-THYMIC-BARRIER-01

## citation_ids
CIT-104-HIS-BLOOD-THYMIC-BARRIER-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-D3D1AF25EFA406

## type
contains

## target
CON-CVS-9585A65D9EDA4D

## evidence_claim_ids
CLM-104-PHY-CAPILLARY-DIFFUSION-01

## citation_ids
CIT-104-PHY-CAPILLARY-DIFFUSION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-D3D1AF25EFA406

## type
contains

## target
CON-CVS-132A76916FEC05

## evidence_claim_ids
CLM-104-PHY-CAPILLARY-DIFFUSION-01

## citation_ids
CIT-104-PHY-CAPILLARY-DIFFUSION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-712BA581C8AF88

## type
contains

## target
CON-CVS-E6F658EEC11072

## evidence_claim_ids
CLM-915B0B6018D8

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-AAAD34C16F9880

## type
mechanism_step_before

## target
CON-CVS-73064071B3660C

## evidence_claim_ids
CLM-104-PHY-AUTONOMIC-CHRONOTROPY-01

## citation_ids
CIT-104-PHY-AUTONOMIC-CHRONOTROPY-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-56A68328FD03C7

## type
prerequisite_of

## target
CON-CVS-73064071B3660C

## evidence_claim_ids
CLM-104-PHY-CO-EXERCISE-01

## citation_ids
CIT-104-PHY-CO-EXERCISE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-D97F7FD5B9F824

## type
mechanism_step_before

## target
CON-CVS-A0579343614BCD

## evidence_claim_ids
CLM-104-PHY-CO-DEFINITION-01

## citation_ids
CIT-104-PHY-CO-DEFINITION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-A0579343614BCD

## type
mechanism_step_before

## target
CON-CVS-F8BD2261B8CBDA

## evidence_claim_ids
CLM-104-PHY-CYCLE-AORTICCURVE-01

## citation_ids
CIT-104-PHY-CYCLE-AORTICCURVE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-78E74CAC3AE5E5

## type
prerequisite_of

## target
CON-CVS-B21C3D54DE291E

## evidence_claim_ids
CLM-104-PHY-HEMODYNAMICS-VASCTREE-01

## citation_ids
CIT-104-PHY-HEMODYNAMICS-VASCTREE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-97B778DE471E7E

## type
prerequisite_of

## target
CON-RES-F9A8562032A469

## evidence_claim_ids
CLM-104-PHY-DEADSPACE-01

## citation_ids
CIT-104-PHY-DEADSPACE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-4A773ABA9943BE

## type
associated_with

## target
CON-RES-CF9852282948CD

## evidence_claim_ids
CLM-968A1027874E

## verification_status
needs_evidence

---

# Item

## source
CON-RES-CF9852282948CD

## type
associated_with

## target
CON-RES-4A773ABA9943BE

## evidence_claim_ids
CLM-968A1027874E

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-BDAE3CD8565D49

## type
causes

## target
CON-CVS-A0579343614BCD

## evidence_claim_ids
CLM-104-PHY-CO-CONDITIONS-01

## citation_ids
CIT-104-PHY-CO-CONDITIONS-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-AFCED19BA66ED2

## type
supplies

## target
CON-CVS-2DB020EDD28EB7

## evidence_claim_ids
CLM-41DBF0164A87

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-D2307B39C55336

## type
drains_into

## target
CON-CVS-42C907CE4749DC

## evidence_claim_ids
CLM-1BDD62F42A4F

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-2A21F1B4F30B61

## type
supplies

## target
CON-CVS-42C907CE4749DC

## evidence_claim_ids
CLM-B3923EF0E53D

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-A723ADE6F4E726

## type
supplies

## target
CON-RES-2A560C53F8E712

## evidence_claim_ids
CLM-54E0FE902FED

## verification_status
needs_evidence

---

# Item

## source
CON-RES-A774BB8400B802

## type
prerequisite_of

## target
CON-RES-0BB6BDDB3E4413

## evidence_claim_ids
CLM-9A3ECAAE6B90

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-1861B888CFF02D

## type
supplies

## target
CON-MSK-54A6BFC89A697C

## evidence_claim_ids
CLM-CCBCE64C8CE2

## verification_status
needs_evidence

---

# Item

## source
CON-RES-3AB5ED388161A2

## type
associated_with

## target
CON-CVS-E9CF510CBD01BC

## evidence_claim_ids
CLM-104-ANA-PLEURA-NERVE-SUPPLY-01

## citation_ids
CIT-104-ANA-PLEURA-NERVE-SUPPLY-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-E9CF510CBD01BC

## type
associated_with

## target
CON-RES-3AB5ED388161A2

## evidence_claim_ids
CLM-104-ANA-PLEURA-NERVE-SUPPLY-01

## citation_ids
CIT-104-ANA-PLEURA-NERVE-SUPPLY-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-6799821893D6D2

## type
prerequisite_of

## target
CON-CVS-34D3CB7F794801

## evidence_claim_ids
CLM-4905A5EAC0EF

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-A0579343614BCD

## type
prerequisite_of

## target
CON-CVS-BBAEB2E1A51102

## evidence_claim_ids
CLM-104-PHY-CUSHING-01

## citation_ids
CIT-104-PHY-CUSHING-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-97B778DE471E7E

## type
prerequisite_of

## target
CON-RES-B68E39C6B4178F

## evidence_claim_ids
CLM-104-PHY-HERINGBREUER-01

## citation_ids
CIT-104-PHY-HERINGBREUER-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-D97F7FD5B9F824

## type
prerequisite_of

## target
CON-CVS-8E2C7AEC68C4CB

## evidence_claim_ids
CLM-104-PHY-CNS-ISCHEMIC-01

## citation_ids
CIT-104-PHY-CNS-ISCHEMIC-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-CC8835108F512C

## type
prerequisite_of

## target
CON-CVS-CEB3B0EC313DC9

## evidence_claim_ids
CLM-15EAC759559D

## citation_ids
CIT-D422325DE0A6

## verification_status
verified

---

# Item

## source
CON-RES-38BA83C42FBE02

## type
prerequisite_of

## target
CON-RES-099718106C38CD

## evidence_claim_ids
CLM-FCA8EC690A3E

## verification_status
needs_evidence

---

# Item

## source
CON-HEM-D1628423BE0844

## type
prerequisite_of

## target
CON-HEM-2F3CB0082551D1

## evidence_claim_ids
CLM-71BFF3E49324

## verification_status
needs_evidence

---

# Item

## source
CON-HEM-D1628423BE0844

## type
prerequisite_of

## target
CON-HEM-BA8773E5D84286

## evidence_claim_ids
CLM-71BFF3E49324

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-8D34A57C987227

## type
prerequisite_of

## target
CON-CVS-BE5C24D066F705

## evidence_claim_ids
CLM-104-PHY-CYCLE-PHASES-01

## citation_ids
CIT-104-PHY-CYCLE-PHASES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-F9A8562032A469

## type
prerequisite_of

## target
CON-RES-4A773ABA9943BE

## evidence_claim_ids
CLM-104-PHY-DEADSPACE-01

## citation_ids
CIT-104-PHY-DEADSPACE-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-D3D1AF25EFA406

## type
prerequisite_of

## target
CON-CVS-6D8E2D62A9F51E

## evidence_claim_ids
CLM-104-PHY-CAPILLARY-DIFFUSION-01

## citation_ids
CIT-104-PHY-CAPILLARY-DIFFUSION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-71212213BD80F3

## type
prerequisite_of

## target
CON-CVS-BF82D6F52B72C9

## evidence_claim_ids
CLM-104-PHY-EC-COUPLING-01

## citation_ids
CIT-104-PHY-EC-COUPLING-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-8D34A57C987227

## type
prerequisite_of

## target
CON-CVS-B29600F656A34B

## evidence_claim_ids
CLM-104-PHY-CYCLE-PHASES-01

## citation_ids
CIT-104-PHY-CYCLE-PHASES-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-52A974515C690A

## type
prerequisite_of

## target
CON-RES-228D7C6B6FDE80

## evidence_claim_ids
CLM-4E1D08498C2D

## citation_ids
CIT-2793456A42F1

## verification_status
verified

---

# Item

## source
CON-CVS-71212213BD80F3

## type
prerequisite_of

## target
CON-CVS-BE5C24D066F705

## evidence_claim_ids
CLM-104-PHY-EC-COUPLING-01

## citation_ids
CIT-104-PHY-EC-COUPLING-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-C323EEF5DA30FF

## type
prerequisite_of

## target
CON-RES-1488F775DCD49E

## evidence_claim_ids
CLM-104-PHY-DIFFUSION-01

## citation_ids
CIT-104-PHY-DIFFUSION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-BF82D6F52B72C9

## type
prerequisite_of

## target
CON-CVS-BDAE3CD8565D49

## evidence_claim_ids
CLM-104-PHY-INOTROPY-LUSITROPY-01

## citation_ids
CIT-104-PHY-INOTROPY-LUSITROPY-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-1FF74892D5B943

## type
prerequisite_of

## target
CON-RES-58840F56FB3A36

## evidence_claim_ids
CLM-71947D809041

## verification_status
needs_evidence

---

# Item

## source
CON-CVS-D97F7FD5B9F824

## type
prerequisite_of

## target
CON-CVS-43B32FA3653194

## evidence_claim_ids
CLM-104-PHY-CO-DEFINITION-01

## citation_ids
CIT-104-PHY-CO-DEFINITION-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-RES-97B778DE471E7E

## type
prerequisite_of

## target
CON-RES-4D4CBF3BB8AF1E

## evidence_claim_ids
CLM-104-PHY-TRANSPULMONARY-01

## citation_ids
CIT-104-PHY-TRANSPULMONARY-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-CEB3B0EC313DC9

## type
prerequisite_of

## target
CON-CVS-BE5C24D066F705

## evidence_claim_ids
CLM-104-PHY-FRANK-STARLING-01

## citation_ids
CIT-104-PHY-FRANK-STARLING-01-LOCAL

## verification_status
verified

---

# Item

## source
CON-CVS-2C65CCE1C08853

## type
prerequisite_of

## target
CON-CVS-D3D1AF25EFA406

## evidence_claim_ids
CLM-104-PHY-CAPILLARY-LYMPH-01

## citation_ids
CIT-104-PHY-CAPILLARY-LYMPH-01-LOCAL

## verification_status
verified
