# HU-BMS-102 pathology + microbiology S1 triage

Status: `S1 TRIAGE — NOT APPROVED`. This is an assessment-evidence ledger only. It
creates no content records, IDs, or student-facing material.

## Family 1 — pathology department bank, Tutorial 102 core

### Source identity and scope boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_88169dc9b6ad00181a0d` |
| Manifest SHA-256 | `88169dc9b6ad00181a0d085489284934c5661fe950be822a59ef26ba5e6ae128` |
| Recomputed SHA-256 | `88169dc9b6ad00181a0d085489284934c5661fe950be822a59ef26ba5e6ae128` |
| File | `DPT BOOK MCQs - اسئلة كتاب القسم باثو College MCQs.pdf` |
| Manifest classification | Helwan `HU_Y1` · `HU-BMS-102` · Pathology · Questions/MCQs · department book · tier 1 |
| Container | 22 scanned pages; native text extraction is empty |
| This bounded family | printed pp. 242–248, physical PDF pp. 2–8 (`TUTORIAL 102`) |
| Read method | all 22 pages rendered at 180 dpi; family pages read from the rendered images, with OCR used only as a transcription aid |

The retained manifest path has one trailing space before `.pdf`; the current on-disk path
does not. The byte hash is identical, so this is a path-normalisation difference, not a
different source.

Physical PDF p. 1 is blank. Printed p. 256 begins `TUTORIAL 103`; physical pp. 16–22 are
therefore excluded from BMS-102 and left for the LCS-103 owner to assess. This file does
not silently turn the cross-module Tutorial 103 questions into BMS-102 evidence.

### Exact prompt and key counts

| Printed page | Scope | MCQ | Written / completion / T-F | Total |
|---:|---|---:|---:|---:|
| 242 | Introduction; adaptation and cell injury | 4 | 1 | 5 |
| 243 | Cell injury; inflammation | 4 | 5 | 9 |
| 244 | Infection; healing and repair | 4 | 4 | 8 |
| 245 | Healing; haemodynamic disorders; neoplasia essays 1–9 | 2 | 12 | 14 |
| 246 | Neoplasia essays 10–11; CBL 1–4 | 4 | 2 | 6 |
| 247 | CBL 5–9 | 5 | 0 | 5 |
| 248 | CBL 10–14 | 5 | 0 | 5 |
| **Family 1** |  | **28** | **24** | **52** |

The rendered source shows one unambiguous option mark: printed p. 243, Chapter 3 Q1,
option `c) immediate and early response to an injurious agent` is underlined. It is counted
as one visibly printed option key. No repeatable answer-marking convention and no answer
section exists on pp. 242–248; the other 51 prompts remain unkeyed. No answer below is
inferred from an option set.

Two prompts test the same source-distinct concept: the necrosis/apoptosis identification on
p. 242 and the explicit comparison on p. 243. Thus 52 printed prompts collapse to 51
tested-concept handles. Handles describe tested scope only; they are not proposed IDs and
do not assert an unprinted correct option.

### Search-before-mint register and semantic dispositions

Each row received four prescribed searches (distinctive term, alias, synonym, and
mechanism/structure): **51 handles / 204 required searches**. A further 78 narrower or
spelling-variant searches were run to resolve substring-heavy rows (282 search invocations
in all). Search scope was live state plus `docs/import-ready`,
`docs/questions-import-ready`, and every `docs/*-Source-Imports` root. `new` below means all
four required searches plus any targeted follow-up were absent or semantically rejected;
substring hits alone were not treated as matches.

| Handle / source evidence | Four required queries | Same-idea/same-scope result | Disposition | Placement if new |
|---|---|---|---|---|
| pathology-causal-mechanism-terminology — p242 Q1 | `pathogenesis`; `disease mechanism`; `etiology`; `morphologic change` | Disease-specific and congenital/acquired-classification hits do not define the asked causal-mechanism term. | new | `SYS-FND-T03` + `DIS-PAT` |
| untreated-disease-course-terminology — p242 Q2 | `natural history`; `disease course`; `untreated disease`; `clinical course` | No hit. | new | `SYS-FND-T03` + `DIS-PAT` |
| cellular-adaptation-definition — p242 Ch2 Q1 | `cellular adaptation`; `cell adaptation`; `adaptive response`; `reversible cellular change` | Pending `CON-FND-DF726F864C8BC3` defines adaptation as a new viable steady state and lists its four forms. | pending | — |
| cellular-atrophy-definition — p242 Ch2 Q2 | `atrophy`; `cell shrinkage`; `loss of cell substance`; `cellular atrophy definition` | Live skin-ageing atrophy and pending adaptation-family records do not define cellular atrophy as the prompt does. | new | `SYS-FND-T03-S01-M04` + `DIS-PAT-T01` |
| necrosis-versus-apoptosis — p242 Ch2 Q3; p243 Ch2 Q6 | `necrosis apoptosis`; `necrosis`; `apoptosis`; `cell death inflammation` | Pending `CON-FND-2CDE9A5C884133` compares cell size, membrane integrity, inflammation, cell number, and energy requirement. | pending | — |
| causes-of-cell-injury — p243 Ch2 Q4 | `cell injury causes`; `causes of cell injury`; `hypoxia chemical injury`; `cellular injury` | Pending `CON-FND-8989A49BEBCF14` enumerates the general-pathology causes and the routes to hypoxia. | pending | — |
| tissue-reactions-to-injury — p243 Ch2 Q5 | `tissue response injury`; `reaction to injury`; `cell injury response`; `adaptation necrosis` | No same-scope hit. | new | `SYS-FND-T03-S01-M01` + `DIS-PAT-T01` |
| acute-inflammation-characteristics — p243 Ch3 Q1 | `acute inflammation`; `acute inflammatory response`; `neutrophilic inflammation`; `immediate early response` | No same-scope hit; this is the sole visibly keyed family prompt. | new | `SYS-FND-T03-S02-M01` + `DIS-PAT-T02` |
| leukocyte-recruitment-stages — p243 Ch3 Q2 | `leukocyte recruitment`; `leukocyte adhesion`; `transmigration chemotaxis`; `rolling adhesion` | Live leukocyte-migration and chemokine facts are narrower and do not supply the rolling/adhesion/transmigration/chemotaxis sequence. | new | `SYS-FND-T03-S02-M01` + `DIS-PAT-T02` |
| inflammatory-pain-mediators — p243 Ch3 Q3 | `inflammatory pain`; `bradykinin PGE2`; `pain mediator`; `acute inflammation mediators` | Live renal-afferent vasodilator use of bradykinin/PGE is a different scope. | new | `SYS-FND-T03-S02-M01` + `DIS-PAT-T02` |
| bread-and-butter-pericarditis-pattern — p243 Ch3 Q4 | `bread and butter pericarditis`; `fibrinous pericarditis`; `pericardial fibrin`; `pericarditis morphology` | No hit. | new | `SYS-FND-T03-S02-M01` + `DIS-PAT-T02`; secondary `SYS-CVS` |
| inflammation-definition — p243 Complete Q1 | `inflammation definition`; `inflammatory response`; `injury response`; `vascular tissue reaction` | Live mediator and respiratory-pathogen response hits do not define inflammation. | new | `SYS-FND-T03-S02-M01` + `DIS-PAT-T02` |
| pus-composition — p243 Complete Q2 | `pus composition`; `purulent exudate`; `suppurative inflammation`; `neutrophils pus` | A live Gram-stain-of-pus observation and a pending liquefactive-necrosis fact do not give pus composition. | new | `SYS-FND-T03-S02-M01` + `DIS-PAT-T02` |
| actinomycosis-feature-exception — p244 Ch4 Q1 | `actinomycosis`; `actinomycotic infection`; `sulfur granules`; `infection spread` | Live `CON-INF-E5F0904F30665E` and `CON-INF-C9F6C2E233F44E` cover endogenous granulomatous infection, sulfur granules, and sites, not the prompt's spread/feature set. | new | `SYS-INF` + `DIS-MIC` |
| infective-granuloma-differential — p244 Ch4 Q2 | `infective granuloma`; `granulomatous inflammation`; `sarcoidosis granuloma`; `tuberculosis granuloma` | Live TB- and actinomycosis-specific granuloma facts do not provide the four-way infective/non-infective differential. | new | `SYS-FND-T03-S02-M02` + `DIS-PAT-T02` |
| pyaemia-definition — p244 Ch4 Q3 | `pyaemia`; `pyemia`; `septic emboli`; `bacteria blood` | No hit after both spellings and septic-embolus follow-up. | new | `SYS-INF` + `DIS-MIC` + `DIS-PAT-T03` |
| sarcoidosis-causes-of-death — p244 Complete Q1 | `sarcoidosis death`; `sarcoid mortality`; `pulmonary fibrosis sarcoidosis`; `cardiac sarcoidosis` | No hit. | new | `SYS-FND-T03-S02-M02` + `DIS-PAT-T02` |
| noncaseating-granuloma-differential — p244 Complete Q2 | `noncaseating granuloma`; `non-caseating granuloma`; `sarcoidosis`; `granuloma differential` | No same-scope hit. | new | `SYS-FND-T03-S02-M02` + `DIS-PAT-T02` |
| healing-definition — p244 Ch5 Q1 | `healing definition`; `tissue healing`; `repair regeneration`; `wound healing` | Hair-follicle stem-cell and haemostasis-citation hits do not define healing. | new | `SYS-FND-T03-S02-M03` + `DIS-PAT-T02` |
| labile-cells-definition — p244 Ch5 Q2 | `labile cells`; `continuously dividing cells`; `stem cell turnover`; `regenerative capacity` | Regenerative-capacity hits are organ-specific and do not define labile cells. | new | `SYS-FND-T03-S02-M03` + `DIS-PAT-T02` |
| macrophage-timing-incised-wound — p244 Ch5 Q3 | `macrophage incision 24 hours`; `wound macrophage timing`; `incised wound healing`; `macrophage wound` | No hit. | new | `SYS-FND-T03-S02-M03` + `DIS-PAT-T02` |
| fracture-healing-haematoma-stage — p245 Ch5 Q4 | `hematoma bone healing`; `haematoma fracture healing`; `fracture healing stage`; `bone repair hematoma` | Pending `CON-MSK-D95C0801FF59F3` explicitly sequences haematoma, soft callus, hard callus, and remodelling. | pending | — |
| homeostasis-definition — p245 Ch6 Q1 | `homeostasis definition`; `haemostasis definition`; `hemostasis`; `circulatory homeostasis` | The source visibly prints **Homeostasis**. Pending `CON-FND-3F97413E548647` gives the same definition scope; live haemostasis records are rejected homophones. | pending | — |
| oedema-definition — p245 Ch6 Q2 | `oedema definition`; `edema definition`; `interstitial fluid accumulation`; `body cavity fluid` | Pending oedema records teach mechanisms/distribution, not the asked definition; breast oedema is system-specific. | new | `DIS-PAT-T03`; secondary `SYS-CVS` |
| shock-classification — p245 Ch6 Q3 | `shock types`; `classification of shock`; `hypovolemic cardiogenic shock`; `circulatory shock` | All hits concern one shock subtype/mechanism; none supplies the general classification. | new | `DIS-PAT-T03`; secondary `SYS-CVS` |
| adherent-versus-circulating-intravascular-clot-terms — p245 Ch6 Q4 | `mural thrombus embolus`; `adherent clot floating clot`; `thrombus embolus`; `intravascular clot` | Left-atrial-appendage thrombus and anti-clotting article hits do not define the paired terms. | new | `DIS-PAT-T03`; secondary `SYS-HEM`/`SYS-CVS` |
| neoplasia-core-definitions — p245 Ch8 Q1 | `neoplasia grading staging`; `cancer dysplasia differentiation`; `tumour definitions`; `neoplasia definition` | No same-scope hit. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05` |
| benign-versus-malignant-tumour — p245 Ch8 Q2 | `benign malignant tumor`; `benign versus malignant`; `tumour differentiation invasion`; `neoplasm comparison` | No hit. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05` |
| antitumour-effector-mechanisms — p245 Ch8 Q3 | `antitumor immune mechanisms`; `anti-tumour effector`; `tumor immune response`; `cytotoxic T cell tumor` | Live `CON-IMM-9A17EF76A1CD03` is a narrower Th1-cytokine fact, not the requested effector-mechanism list. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T04` |
| tumour-immune-surveillance-and-escape — p245 Ch8 Q4 | `immune surveillance tumor`; `tumour immune escape`; `cancer immunoediting`; `tumor immunity` | Live `CON-IMM-65433E89EA5168` defines surveillance only; no record covers the combined surveillance-and-escape scope. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T04` |
| malignant-transformation-alterations — p245 Ch8 Q5 | `hallmarks of cancer`; `malignant transformation`; `essential alterations cancer`; `cancer hallmarks` | No hit. | new | `SYS-FND-T03-S03-M01` + `DIS-PAT-T05` |
| tumour-initiation-progression-heterogeneity — p245 Ch8 Q6 | `tumor initiation progression`; `tumour heterogeneity`; `cancer progression`; `clonal evolution` | No hit. | new | `SYS-FND-T03-S03-M01` + `DIS-PAT-T05` |
| multistep-carcinogenesis-invasion-metastasis — p245 Ch8 Q7 | `multistep carcinogenesis`; `invasion metastasis`; `molecular carcinogenesis`; `malignant progression` | No same-scope hit. | new | `SYS-FND-T03-S03-M01` + `DIS-PAT-T05` |
| routes-of-tumour-spread — p245 Ch8 Q8 | `routes of tumor spread`; `tumour metastasis routes`; `lymphatic hematogenous spread`; `cancer dissemination` | Live breast-cancer metastatic-site fact is system-specific and does not classify routes. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05` |
| scc-versus-bcc-morphology — p245 Ch8 Q9 | `squamous basal cell carcinoma`; `SCC BCC comparison`; `skin carcinoma morphology`; `basal versus squamous` | Basal-cell epithelial hits are homonyms; no carcinoma comparison exists. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05`; secondary `SYS-DER` |
| melanocytic-evolution — p246 Ch8 Q10 | `melanocytic evolution`; `melanoma progression`; `melanocytic lesion progression`; `nevus melanoma` | Live melanoma morphology records do not teach melanocytic evolution. | new | `SYS-FND-T03-S03-M01` + `DIS-PAT-T05`; secondary `SYS-DER` |
| scc-and-melanoma-grading-staging — p246 Ch8 Q11 | `SCC melanoma grading staging`; `melanoma staging`; `squamous carcinoma grading`; `skin cancer staging` | Live melanoma morphology records do not grade or stage either tumour. | new | `SYS-FND-T03-S03-M03` + `DIS-PAT-T05`; secondary `SYS-DER` |
| uterine-solid-mass-differential — p246 CBL Q1 | `uterine leiomyoma`; `fibroid uterine bleeding`; `well-defined uterine masses`; `myometrial benign tumor` | No hit. The handle does not select an unprinted option. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05`; secondary `SYS-GYN` |
| melanoma-risk-factor-identification — p246 CBL Q2 | `ultraviolet melanoma`; `UV melanoma risk`; `melanoma risk factor`; `sun exposure melanoma` | Live melanoma morphology does not state risk factors; no UV-risk hit. | new | `SYS-FND-T03-S03-M01` + `DIS-PAT-T05`; secondary `SYS-DER` |
| raised-everted-edge-lesion-differential — p246 CBL Q3 | `raised everted edge`; `everted ulcer SCC`; `squamous cell carcinoma ulcer`; `malignant ulcer edge` | No hit. The handle does not select an unprinted option. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05`; secondary `SYS-DER` |
| bcl2-associated-lymphoma-mechanism — p246 CBL Q4 | `BCL2 apoptosis`; `BCL-2 lymphoma`; `antiapoptotic BCL2`; `follicular lymphoma translocation` | Targeted `BCL-2`/`BCL2` follow-up finds pending `CON-FND-C6661CBD045436`, which teaches Bcl-2-family control of apoptosis. | pending | — |
| prostate-carcinoma-premalignant-lesion — p247 CBL Q5 | `prostatic intraepithelial neoplasia`; `prostate premalignant lesion`; `PIN prostate`; `prostate cancer precursor` | No hit. No option is treated as keyed. | new | `SYS-FND-T03-S03-M01` + `DIS-PAT-T05`; secondary `SYS-AND` |
| hamartoma-lesion-identification — p247 CBL Q6 | `hamartoma`; `osteochondroma hamartoma`; `developmental malformation`; `disorganized native tissue` | No hit. No option is treated as keyed. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05`; secondary `SYS-MSK` |
| afp-associated-tumour-differential — p247 CBL Q7 | `hepatocellular carcinoma AFP`; `alpha fetoprotein liver cancer`; `chronic alcoholism liver tumor`; `HCC tumour marker` | No hit. No diagnosis is inferred without a key. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05`; secondary `SYS-GIT` |
| connective-tissue-malignancy-nomenclature — p247 CBL Q8 | `sarcoma definition`; `connective tissue malignancy`; `mesenchymal malignant tumor`; `carcinoma versus sarcoma` | Live fibrosarcoma morphology is narrower and does not define the nomenclature. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05` |
| benign-tumour-characteristics — p247 CBL Q9 | `benign tumor differentiation`; `benign neoplasm cells normal`; `well differentiated tumour`; `benign tumor features` | No hit. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05` |
| tumour-grade-basis — p248 CBL Q10 | `tumor grade differentiation`; `grading degree differentiation`; `histologic tumor grade`; `neoplasm grading` | No hit. The handle does not select an unprinted option. | new | `SYS-FND-T03-S03-M03` + `DIS-PAT-T05` |
| paraneoplastic-syndrome-definition — p248 CBL Q11 | `paraneoplastic syndrome`; `tumor hormone effects`; `remote effects neoplasm`; `ectopic hormone cancer` | No hit. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05` |
| adhesion-molecule-loss-in-metastasis — p248 CBL Q12 | `E-cadherin metastasis`; `CDH1 invasion`; `reduced cell adhesion cancer`; `infiltrating duct carcinoma E-cadherin` | No hit. The handle does not select an unprinted molecule. | new | `SYS-FND-T03-S03-M01` + `DIS-PAT-T05`; secondary `SYS-GYN` |
| cancer-wasting-syndrome-terminology — p248 CBL Q13 | `cancer cachexia`; `tumor wasting`; `malignancy severe wasting`; `cachexia syndrome` | No hit. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05` |
| malignant-tumour-marker-pairing — p248 CBL Q14 | `CEA colon cancer`; `carcinoembryonic antigen`; `colon tumor marker`; `tumour markers` | `CEA` substring hits are Enterobacteriaceae/placenta noise; no tumour-marker-pair concept exists. No option is treated as keyed. | new | `SYS-FND-T03-S03-M02` + `DIS-PAT-T05` |

### Family-1 checkpoint

| Module / bounded family | Questions triaged | Printed keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| `HU-BMS-102` · Pathology Tutorial 102 pp. 242–248 | 52 | 1 | 51 | 0 | 6 | 45 |

Arithmetic: `0 + 6 + 45 = 51` dispositions; `28 + 24 = 52` prompts. This is only the
first bounded family and is not the consolidated HU-BMS-102 or Helwan Year-1 S1 table.

## Exact next debt

- The same source's printed pp. 249–255 contain **105 raw prompts**: 20 in the main
  question pool plus 17 in each of Models 1–5 (`20 + 5 × 17 = 105`).
- Source-first comparison confirms **20 repeated model-prompt occurrences** against the
  main pool. The 13 T/F repeats are pool Q1→Model 1 T/F Q1, Q2→M2 Q1,
  Q3→M3 Q1, Q4→M4 Q1, Q5→M5 Q1, Q6→M1 Q2, Q7→M2 Q2,
  Q8→M3 Q2, Q9→M4 Q2, Q10→M5 Q2, Q11→M1 Q3, Q12→M2 Q3,
  and Q13→M3 Q3. The seven MCQ repeats are pool Q14→M1 MCQ Q1,
  Q15→M2 Q1, Q16→M3 Q1 and independently →M5 Q2, Q17→M4 Q1,
  Q18→M5 Q1, and Q19→M1 Q2. Capitalisation, punctuation, the singular
  `transudate` in M2, and option order do not change those repeated stems.
- Pool Q20 is **not** counted as repeated: M2 MCQ Q2 asks about coagulative necrosis,
  whereas pool Q20 prints a fatty-change stem despite overlapping option language.
  No other model prompt repeats the main pool or another model at wording level. Thus
  `105 - 20 = 85` question records remain before concept collapse and search. None is
  included in the Family-1 totals above.
- Printed pp. 256–262 are explicitly headed `TUTORIAL 103` and remain excluded from
  BMS-102; route them to the LCS-103 owner as a cross-module source candidate.
- The rest of the pathology question rows and all microbiology evidence remain S1 debt.
- No S2 work is authorised until all Year-1 ranks are consolidated and `/root` replies
  with the literal `TRIAGE APPROVED`.

## Family 2 — pathology department bank, Tutorial 102 pool and models

### Source identity, boundary, and observed counts

This family continues the same tier-1 department source, `src_88169dc9b6ad00181a0d`.
The recomputed SHA-256 remains
`88169dc9b6ad00181a0d085489284934c5661fe950be822a59ef26ba5e6ae128`.
The bounded pages are printed pp. 249–255, physical PDF pp. 9–15. Every page was read
from the 180-dpi render. Printed p. 256 starts `TUTORIAL 103` and remains outside this
family and outside BMS-102.

| Source block | Short note | T/F | Term | MCQ | Raw prompts | Wording repeats | Retained records |
|---|---:|---:|---:|---:|---:|---:|---:|
| Main pool Q1–20 | 0 | 13 | 0 | 7 | 20 | 0 | 20 |
| Model 1 | 5 | 6 | 4 | 2 | 17 | 5 | 12 |
| Model 2 | 5 | 6 | 4 | 2 | 17 | 4 | 13 |
| Model 3 | 5 | 6 | 4 | 2 | 17 | 4 | 13 |
| Model 4 | 5 | 6 | 4 | 2 | 17 | 3 | 14 |
| Model 5 | 5 | 6 | 4 | 2 | 17 | 4 | 13 |
| **Family 2** | **25** | **43** | **20** | **17** | **105** | **20** | **85** |

No option, answer line, or answer section on pp. 249–255 is visibly marked as a key.
Family 2 therefore contributes **0 printed keys**. The source's assertions and distractors
are recorded as tested scope only; none is silently treated as a correct answer.

### Source-assignment ledger — one row per observed prompt

`retain` means a question record survives wording dedupe. A `concept collapse` keeps the
question record but assigns it to an already counted Family-2 tested-scope handle. Only
the 20 rows marked `wording repeat` are excluded from the retained-record count.

| Source ref | Observed prompt, shortened without supplying an answer | Assignment |
|---|---|---|
| F2-P01 | Inflammation is a local tissue reaction to an injurious agent. | retain → `inflammation-definition` |
| F2-P02 | Radiation can cause inflammation. | retain → `radiation-inflammatory-cause` |
| F2-P03 | Redness and hotness are signs of acute inflammation. | retain → `acute-inflammation-cardinal-signs` |
| F2-P04 | Increased blood flow causes redness in acute inflammation. | retain → `acute-inflammation-redness-mechanism` |
| F2-P05 | Increased capillary permeability causes hotness in acute inflammation. | retain → `acute-inflammation-heat-mechanism` |
| F2-P06 | Exudate is leakage of blood outside vessels. | retain → `exudate-definition` |
| F2-P07 | Transudates occur late in inflammation. | retain → `transudate-inflammation-timing` |
| F2-P08 | Exudates coagulate on standing. | retain → `exudate-coagulability` |
| F2-P09 | Serofibrinous inflammation is associated with pus. | retain → `serofibrinous-suppurative-pattern` |
| F2-P10 | Serous inflammation occurs in burns. | retain → `serous-inflammation-burn` |
| F2-P11 | The prominent cell in acute inflammation is the neutrophil. | retain → `acute-inflammation-predominant-cell` |
| F2-P12 | The lymphocyte is prominent in parasitic infection. | retain → `parasitic-inflammation-predominant-cell` |
| F2-P13 | Eosinophils occur in acute and chronic inflammation. | retain → `eosinophils-acute-chronic-inflammation` |
| F2-P14 | Exudates are due to which listed mechanism? | retain → `exudate-permeability-mechanism` |
| F2-P15 | What is the function of neutrophils? | retain → `neutrophil-phagocytic-function` |
| F2-P16 | Which listed cell can produce histamine? | retain → `histamine-cellular-source` |
| F2-P17 | In which listed condition does localized suppurative inflammation occur? | retain → `localized-suppurative-example` |
| F2-P18 | Which listed cell population is not labile? | retain → `regenerative-cell-populations` |
| F2-P19 | Which listed item is not a complication of repair? | retain → `repair-complications` |
| F2-P20 | Which listed feature does not characterize fatty change? | retain → `fatty-change-characteristics` |
| F2-M1-SN01 | Causes of oedema. | retain → `oedema-causes` |
| F2-M1-SN02 | Clinical significance of haemorrhage. | retain → `haemorrhage-clinical-significance` |
| F2-M1-SN03 | Morphology of a tubercle. | retain → `tubercle-morphology` |
| F2-M1-SN04 | Acute diffuse suppurative appendicitis. | retain → `acute-suppurative-appendicitis` |
| F2-M1-SN05 | Pathological pigmentation. | retain → `pathological-pigments` |
| F2-M1-TF01 | Inflammation is a local tissue reaction to an injurious agent. | wording repeat → F2-P01; exclude |
| F2-M1-TF02 | Exudate is leakage of blood outside vessels. | wording repeat → F2-P06; exclude |
| F2-M1-TF03 | The prominent cell in acute inflammation is the neutrophil. | wording repeat → F2-P11; exclude |
| F2-M1-TF04 | Petechiae are larger haematomas over 3 mm. | retain → `petechiae-size-classification` |
| F2-M1-TF05 | Vitamin deficiency can impair repair. | retain → `repair-impairing-factors` |
| F2-M1-TF06 | Caseation is more marked in secondary than primary tuberculosis. | retain → `primary-secondary-tuberculosis` |
| F2-M1-TERM01 | Abnormal fluid accumulation in interstitial tissue or body cavities. | retain → `oedema-definition` |
| F2-M1-TERM02 | Inflammation of prolonged duration. | retain → `chronic-inflammation-definition` |
| F2-M1-TERM03 | Modification of cell morphology and function to a viable altered steady state. | retain → `cellular-adaptation-definition` |
| F2-M1-TERM04 | Fading of chromatin basophilia. | retain → `karyolysis-definition` |
| F2-M1-MCQ01 | Exudates are due to which listed mechanism? | wording repeat → F2-P14; exclude |
| F2-M1-MCQ02 | Which listed item is not a complication of repair? | wording repeat → F2-P19; exclude |
| F2-M2-SN01 | Distribution of oedema. | retain → `oedema-distribution` |
| F2-M2-SN02 | Definition and predisposing factors of thrombosis. | retain → `thrombosis-definition-risk` |
| F2-M2-SN03 | Fate of tuberculosis. | retain → `tuberculosis-outcomes` |
| F2-M2-SN04 | Morphology of chronic inflammation. | retain → `chronic-inflammation-morphology` |
| F2-M2-SN05 | Pathology of gout. | retain → `gout-pathology` |
| F2-M2-TF01 | Radiation can cause inflammation. | wording repeat → F2-P02; exclude |
| F2-M2-TF02 | Transudate occurs late in inflammation. | wording repeat → F2-P07; exclude |
| F2-M2-TF03 | The lymphocyte is prominent in parasitic infection. | wording repeat → F2-P12; exclude |
| F2-M2-TF04 | Pregnancy, oral contraceptives, and steroids increase thrombosis risk. | retain; concept collapse → `thrombosis-definition-risk` |
| F2-M2-TF05 | Obesity, starvation, and cortisone predispose to fatty liver. | retain → `fatty-liver-predisposition` |
| F2-M2-TF06 | Bronchial spread is the most important complication of secondary tuberculosis. | retain → `secondary-tb-bronchial-spread` |
| F2-M2-TERM01 | Compact mass of circulating blood elements formed in the cardiovascular system during life. | retain; concept collapse → `thrombosis-definition-risk` |
| F2-M2-TERM02 | Ingestion and destruction of particulate material. | retain → `phagocytosis-definition` |
| F2-M2-TERM03 | Transitory repair tissue composed of fibroblasts, capillaries, and inflammatory cells. | retain → `granulation-tissue-definition` |
| F2-M2-TERM04 | Fragmentation of a pyknotic nucleus. | retain → `karyorrhexis-definition` |
| F2-M2-MCQ01 | What is the function of neutrophils? | wording repeat → F2-P15; exclude |
| F2-M2-MCQ02 | Which listed feature does not characterize coagulative necrosis? | retain → `coagulative-necrosis-characteristics` |
| F2-M3-SN01 | Hyperaemia and congestion: definition and causes. | retain → `hyperaemia-versus-congestion` |
| F2-M3-SN02 | Outcome of thrombosis. | retain → `thrombosis-outcomes` |
| F2-M3-SN03 | Compare primary and secondary tuberculosis. | retain; concept collapse → `primary-secondary-tuberculosis` |
| F2-M3-SN04 | Pathogenesis of acute inflammation. | retain → `acute-inflammation-pathogenesis` |
| F2-M3-SN05 | Factors impairing repair. | retain; concept collapse → `repair-impairing-factors` |
| F2-M3-TF01 | Redness and hotness are signs of acute inflammation. | wording repeat → F2-P03; exclude |
| F2-M3-TF02 | Exudates coagulate on standing. | wording repeat → F2-P08; exclude |
| F2-M3-TF03 | Eosinophils occur in acute and chronic inflammation. | wording repeat → F2-P13; exclude |
| F2-M3-TF04 | Stable cells divide continuously while labile cells divide only when needed. | retain; concept collapse → `regenerative-cell-populations` |
| F2-M3-TF05 | Fibrinoid necrosis is seen in vessel walls in vasculitis. | retain → `fibrinoid-necrosis-vasculitis` |
| F2-M3-TF06 | Tuberculosis is more common in the left lung. | retain → `pulmonary-tb-laterality` |
| F2-M3-TERM01 | Coughing of blood. | retain → `haemoptysis-definition` |
| F2-M3-TERM02 | Thick turbid fluid rich in living and dead neutrophils in suppurative inflammation. | retain → `pus-definition-composition` |
| F2-M3-TERM03 | Replacement of damaged tissue by healthy tissue. | retain → `healing-definition` |
| F2-M3-TERM04 | Abnormal extracellular amyloid deposition in many tissues. | retain → `amyloidosis-definition` |
| F2-M3-MCQ01 | Which listed cell can produce histamine? | wording repeat → F2-P16; exclude |
| F2-M3-MCQ02 | Which listed organ is a site of primary tuberculosis? | retain → `primary-tb-organ-site` |
| F2-M4-SN01 | Definition, causes, and classification of haemorrhage. | retain → `haemorrhage-definition-classification` |
| F2-M4-SN02 | Definition and types of embolism. | retain → `embolism-definition-types` |
| F2-M4-SN03 | Classification of acute inflammation. | retain → `acute-inflammation-classification` |
| F2-M4-SN04 | Classes of tissue and cell response to injury. | retain → `tissue-injury-response-classes` |
| F2-M4-SN05 | Compare reversible and irreversible injury. | retain → `reversible-irreversible-cell-injury` |
| F2-M4-TF01 | Increased blood flow causes redness in acute inflammation. | wording repeat → F2-P04; exclude |
| F2-M4-TF02 | Serofibrinous inflammation is associated with pus. | wording repeat → F2-P09; exclude |
| F2-M4-TF03 | Nutritional and cardiac oedema are generalized. | retain → `generalized-oedema-patterns` |
| F2-M4-TF04 | Chronic inflammation has mononuclear infiltration and fibrous-tissue proliferation. | retain; concept collapse → `chronic-inflammation-morphology` |
| F2-M4-TF05 | Amyloid is stained red by Oil Red stain. | retain → `amyloid-staining` |
| F2-M4-TF06 | Blood spread is the most important complication of primary tuberculosis. | retain → `primary-tb-dissemination` |
| F2-M4-TERM01 | Haemorrhage in the peritoneum. | retain → `haemoperitoneum-definition` |
| F2-M4-TERM02 | Ischaemic necrosis caused by arterial or, rarely, venous occlusion. | retain → `infarction-definition` |
| F2-M4-TERM03 | Chronic inflammation with activated macrophages in nodular collections. | retain → `granulomatous-inflammation` |
| F2-M4-TERM04 | Nuclear shrinkage and increased basophilia. | retain → `pyknosis-definition` |
| F2-M4-MCQ01 | In which listed condition does localized suppurative inflammation occur? | wording repeat → F2-P17; exclude |
| F2-M4-MCQ02 | Which listed event is a complication of primary tuberculosis? | retain; concept collapse → `primary-tb-dissemination` |
| F2-M5-SN01 | Interstitial haemorrhage. | retain → `interstitial-haemorrhage` |
| F2-M5-SN02 | Morphology and fate of infarction. | retain → `infarction-morphology-fate` |
| F2-M5-SN03 | Cell types according to regenerative ability. | retain; concept collapse → `regenerative-cell-populations` |
| F2-M5-SN04 | Adaptation: definition and examples. | retain; concept collapse → `cellular-adaptation-definition` |
| F2-M5-SN05 | Granuloma: definition, causes, microscopic and gross picture. | retain; concept collapse → `granulomatous-inflammation` |
| F2-M5-TF01 | Increased capillary permeability causes hotness in acute inflammation. | wording repeat → F2-P05; exclude |
| F2-M5-TF02 | Serous inflammation occurs in burns. | wording repeat → F2-P10; exclude |
| F2-M5-TF03 | Inflammatory and lymphatic-obstruction oedema are pitting. | retain → `pitting-oedema-patterns` |
| F2-M5-TF04 | Chronic inflammation is followed by repair. | retain → `chronic-inflammation-repair-sequence` |
| F2-M5-TF05 | Metastatic calcification occurs in nonviable tissue with normal blood calcium. | retain → `dystrophic-metastatic-calcification` |
| F2-M5-TF06 | Tuberculosis is associated with poverty, crowding, old age, and debilitating disease. | retain → `tuberculosis-risk-context` |
| F2-M5-TERM01 | Generalized oedema with effusion of serous sacs. | retain → `anasarca-definition` |
| F2-M5-TERM02 | Detached intravascular solid, liquid, or gaseous material carried to a distant vessel. | retain; concept collapse → `embolism-definition-types` |
| F2-M5-TERM03 | Subintimal fibrosis thickening a vessel wall and narrowing its lumen. | retain → `subintimal-fibrosis-vessel-narrowing` |
| F2-M5-TERM04 | Increase in the absolute number of cells after a stimulus or persistent injury. | retain → `hyperplasia-definition` |
| F2-M5-MCQ01 | Which listed cell population is not labile? | wording repeat → F2-P18; exclude |
| F2-M5-MCQ02 | Which listed cell can produce histamine? | wording repeat → F2-P16; exclude |

Assignment arithmetic: 105 observed rows = 85 retained + 20 wording repeats. The 85
retained records map to 74 Family-2 tested-scope handles: nine multi-prompt clusters
contribute 11 concept collapses (`85 - 11 = 74`). The clusters are regenerative cell
populations (3 prompts); repair-impairing factors (2); primary/secondary tuberculosis (2);
cellular adaptation (2); thrombosis definition/risk (3); chronic-inflammation morphology
(2); embolism definition/types (2); primary-TB dissemination (2); and granulomatous
inflammation (2).

### Search-before-mint register and cross-family adjudication

Every one of the 74 handles received four required searches: distinctive term, alias,
synonym, and mechanism/structure (**296 required searches**). A further 53 broad-term,
spelling, and morphology searches resolved partial hits (**349 registered searches**).
Scope included live state, all pending import roots, and the accepted Family-1 ledger.
The four queries are shown in their executed order. `new` rejects substring, organ-specific,
or narrower facts; it does not mean the word was absent everywhere.

| Handle · retained source refs | Four required queries | External disposition and semantic decision | Family-1 relation |
|---|---|---|---|
| inflammation-definition · P01 | `inflammation definition`; `inflammatory response`; `local tissue reaction`; `injurious agent reaction` | new; mediator and respiratory-response hits do not define inflammation | collapse to Family-1 `inflammation-definition` |
| radiation-inflammatory-cause · P02 | `radiation inflammation`; `radiation tissue injury`; `physical agents inflammation`; `ionizing radiation injury` | new; radiation-DNA and marrow hits are different scopes | delta |
| acute-inflammation-cardinal-signs · P03 | `acute inflammation signs`; `redness heat inflammation`; `cardinal signs inflammation`; `rubor calor` | new | delta |
| acute-inflammation-redness-mechanism · P04 | `inflammatory redness blood flow`; `rubor mechanism`; `vasodilation redness`; `acute inflammation hyperemia` | new; general vasodilation fact does not state the redness link | delta |
| acute-inflammation-heat-mechanism · P05 | `inflammatory heat mechanism`; `calor mechanism`; `hotness inflammation`; `acute inflammation temperature` | new | delta |
| exudate-definition · P06 | `exudate definition`; `inflammatory exudate`; `protein rich fluid`; `vascular leakage exudate` | new; respiratory exudate mention is disease-specific | delta |
| transudate-inflammation-timing · P07 | `transudate inflammation timing`; `transudate early inflammation`; `transudate versus exudate`; `low protein inflammatory fluid` | new | delta |
| exudate-coagulability · P08 | `exudate coagulates standing`; `exudate clotting`; `fibrinogen exudate`; `exudate coagulability` | new | delta |
| serofibrinous-suppurative-pattern · P09 | `serofibrinous inflammation pus`; `serofibrinous exudate`; `suppurative inflammation pattern`; `fibrinous versus purulent` | new | delta |
| serous-inflammation-burn · P10 | `serous inflammation burn`; `burn blister exudate`; `serous inflammatory pattern`; `skin burn inflammation` | new | delta |
| acute-inflammation-predominant-cell · P11 | `acute inflammation neutrophil`; `predominant acute inflammatory cell`; `neutrophilic infiltrate`; `acute inflammatory cellular response` | new; general neutrophil records do not state predominance in acute inflammation | delta |
| parasitic-inflammation-predominant-cell · P12 | `parasitic infection inflammatory cell`; `parasite eosinophil`; `helminth eosinophilia`; `lymphocyte parasitic infection` | new; `CON-IMM-1021F84F49EBE0` covers eosinophil helminth killing, not which inflammatory cell is predominant, and this unkeyed prompt cannot supply that answer | delta |
| eosinophils-acute-chronic-inflammation · P13 | `eosinophils acute chronic inflammation`; `eosinophilic inflammation`; `eosinophil inflammatory response`; `allergic parasitic inflammation` | new; helminth killing does not cover occurrence across acute and chronic patterns | delta |
| exudate-permeability-mechanism · P14 | `exudate capillary permeability`; `exudation mechanism`; `vascular permeability inflammation`; `protein leakage acute inflammation` | new; general permeability event is narrower than the exudate mechanism asked | delta |
| neutrophil-phagocytic-function · P15 | `neutrophil function phagocytosis`; `neutrophil bacteria ingestion`; `neutrophil microbicidal function`; `polymorph phagocytosis` | pending exact question linked to `CON-HEM-3899015C5024C0` in `AU-MED-103-histology-questions.md` | delta |
| histamine-cellular-source · P16 | `histamine basophil`; `histamine cellular source`; `mast cell histamine`; `inflammatory histamine release` | live `CON-IMM-075EC1A6A3022D` | delta |
| localized-suppurative-example · P17 | `localized suppurative inflammation boil`; `abscess boil`; `suppurative inflammation example`; `furuncle pathology` | new | delta |
| regenerative-cell-populations · P18, M3-TF04, M5-SN03 | `labile stable permanent cells`; `regenerative capacity cell types`; `labile cell examples`; `cell populations repair` | pending `CON-HEM-25C4304A1DB441` | collapse to Family-1 `labile-cells-definition` |
| repair-complications · P19 | `complications of repair`; `wound healing complications`; `keloid sinus repair`; `abnormal wound healing` | new | delta |
| fatty-change-characteristics · P20 | `fatty change characteristics`; `steatosis morphology`; `microvesicular macrovesicular`; `fatty degeneration cell injury` | pending `CON-FND-3B89025E2FB4E0` and `CON-FND-70554B38361679` together cover definition and morphology | delta |
| oedema-causes · M1-SN01 | `causes of oedema`; `edema mechanisms`; `hydrostatic oncotic edema`; `lymphatic obstruction oedema` | pending `CON-CVS-6D8E2D62A9F51E` | delta |
| haemorrhage-clinical-significance · M1-SN02 | `clinical significance hemorrhage`; `effects of blood loss`; `hemorrhage consequences`; `haemorrhage severity` | new | delta |
| tubercle-morphology · M1-SN03 | `tubercle morphology`; `tuberculous granuloma morphology`; `caseating granuloma`; `Langhans giant cell tubercle` | new; live TB granuloma formation is narrower than the requested morphology | delta |
| acute-suppurative-appendicitis · M1-SN04 | `acute suppurative appendicitis`; `appendicitis pathology morphology`; `neutrophils muscularis propria`; `diffuse suppurative inflammation appendix` | new | delta |
| pathological-pigments · M1-SN05 | `pathological pigmentation`; `pathologic pigments`; `endogenous exogenous pigments`; `lipofuscin hemosiderin melanin` | new | delta |
| petechiae-size-classification · M1-TF04 | `petechiae size`; `petechiae purpura ecchymosis`; `small hemorrhage classification`; `three millimeter petechiae` | new; thrombocytopenic-purpura hits mention petechiae but do not classify size | delta |
| repair-impairing-factors · M1-TF05, M3-SN05 | `factors impairing repair`; `vitamin deficiency wound healing`; `delayed healing factors`; `wound repair impairment` | new | delta |
| primary-secondary-tuberculosis · M1-TF06, M3-SN03 | `primary versus secondary tuberculosis`; `primary secondary TB comparison`; `caseation secondary TB`; `tuberculosis morphology comparison` | new; pending caseation definition does not compare primary and secondary disease | delta |
| oedema-definition · M1-TERM01 | `oedema definition`; `edema definition`; `interstitial fluid accumulation`; `body cavity fluid` | new externally | collapse to Family-1 `oedema-definition` |
| chronic-inflammation-definition · M1-TERM02 | `chronic inflammation definition`; `prolonged inflammation`; `weeks months inflammation`; `chronic inflammatory response` | new; organ-specific chronic-inflammation hits rejected | delta |
| cellular-adaptation-definition · M1-TERM03, M5-SN04 | `cellular adaptation`; `cell adaptation`; `adaptive response`; `new steady state viability` | pending `CON-FND-DF726F864C8BC3` | collapse to Family-1 `cellular-adaptation-definition` |
| karyolysis-definition · M1-TERM04 | `karyolysis definition`; `fading nuclear basophilia`; `nuclear dissolution necrosis`; `DNA degradation nucleus` | pending `CON-FND-8DA30AD870AC1E` plus glossary `karyolysis` | delta |
| oedema-distribution · M2-SN01 | `distribution of oedema`; `localized generalized edema`; `dependent edema distribution`; `oedema anatomic patterns` | pending `CON-CVS-A0176AF74ADE58` | delta |
| thrombosis-definition-risk · M2-SN02, M2-TF04, M2-TERM01 | `thrombosis definition risk factors`; `thrombus Virchow triad`; `predisposing factors thrombosis`; `intravascular blood clot during life` | new; venous-thrombosis Virchow-triad hit omits the general definition and full source scope | delta |
| tuberculosis-outcomes · M2-SN03 | `fate of tuberculosis`; `tuberculosis outcomes`; `healing progression TB`; `tuberculous lesion fate` | new | delta |
| chronic-inflammation-morphology · M2-SN04, M4-TF04 | `chronic inflammation morphology`; `mononuclear infiltrate fibrosis`; `chronic inflammatory cells`; `tissue destruction repair inflammation` | new | delta |
| gout-pathology · M2-SN05 | `gout pathology`; `gouty tophus morphology`; `urate crystal inflammation`; `monosodium urate tissue` | new; live gout-treatment record is a different scope | delta |
| fatty-liver-predisposition · M2-TF05 | `fatty liver predisposing factors`; `hepatic steatosis causes`; `obesity starvation fatty liver`; `corticosteroid steatosis` | pending `CON-FND-A0BC07E35554B1` covers starvation and corticosteroid routes | delta |
| secondary-tb-bronchial-spread · M2-TF06 | `secondary tuberculosis bronchial spread`; `postprimary TB complication`; `TB bronchogenic dissemination`; `secondary TB spread` | new | delta |
| phagocytosis-definition · M2-TERM02 | `phagocytosis definition`; `ingestion destruction particulate material`; `cellular engulfment particles`; `phagocytic process` | new; opsonisation and endocytosis hits do not define the full ingestion/destruction process | delta |
| granulation-tissue-definition · M2-TERM03 | `granulation tissue definition`; `repair fibroblasts capillaries`; `healing transitory tissue`; `new vessels wound repair` | new | delta |
| karyorrhexis-definition · M2-TERM04 | `karyorrhexis definition`; `fragmentation pyknotic nucleus`; `nuclear fragmentation necrosis`; `karyorrhectic debris` | pending `CON-FND-8DA30AD870AC1E` plus glossary `karyorrhexis` | delta |
| coagulative-necrosis-characteristics · M2-MCQ02 | `coagulative necrosis characteristics`; `coagulative necrosis morphology`; `preserved cell outlines`; `protein denaturation necrosis` | pending `CON-FND-5285A9707E61CA` | delta |
| hyperaemia-versus-congestion · M3-SN01 | `hyperemia congestion comparison`; `hyperaemia definition causes`; `active passive congestion`; `increased tissue blood volume` | new; physiology active-hyperaemia records do not compare congestion | delta |
| thrombosis-outcomes · M3-SN02 | `outcomes of thrombosis`; `fate of thrombus`; `propagation embolization organization`; `thrombus resolution recanalization` | new | delta |
| acute-inflammation-pathogenesis · M3-SN04 | `pathogenesis acute inflammation`; `acute inflammation vascular events`; `acute inflammatory sequence`; `leukocyte recruitment inflammation` | live `CON-IMM-0F12EDB7C7CC8E` | delta |
| fibrinoid-necrosis-vasculitis · M3-TF05 | `fibrinoid necrosis vasculitis`; `fibrinoid necrosis vessel wall`; `immune vascular injury morphology`; `bright pink vessel necrosis` | pending `CON-FND-BA0739479AD0FC` | delta |
| pulmonary-tb-laterality · M3-TF06 | `tuberculosis left lung`; `TB lung laterality`; `pulmonary tuberculosis site`; `right versus left lung TB` | new | delta |
| haemoptysis-definition · M3-TERM01 | `hemoptysis definition`; `haemoptysis coughing blood`; `coughing of blood`; `blood expectoration` | new; a live TB-complication citation mentions haemoptysis but does not define it | delta |
| pus-definition-composition · M3-TERM02 | `pus definition`; `pus composition`; `purulent exudate`; `neutrophils pus` | new externally | collapse to Family-1 `pus-composition` |
| healing-definition · M3-TERM03 | `healing definition`; `tissue healing`; `repair regeneration`; `replacement damaged tissue` | new externally | collapse to Family-1 `healing-definition` |
| amyloidosis-definition · M3-TERM04 | `amyloidosis definition`; `amyloid extracellular deposition`; `fibrillar protein deposition`; `systemic amyloid` | pending glossary `amyloidosis` and pathology article; subtype concepts alone were narrower | delta |
| primary-tb-organ-site · M3-MCQ02 | `primary tuberculosis organ site`; `primary TB intestine spleen`; `primary tuberculosis location`; `tuberculosis primary focus site` | new | delta |
| haemorrhage-definition-classification · M4-SN01 | `hemorrhage definition classification`; `haemorrhage causes types`; `bleeding pathology classification`; `blood escape vessel` | new | delta |
| embolism-definition-types · M4-SN02, M5-TERM02 | `embolism definition types`; `embolus definition`; `detached intravascular mass`; `solid liquid gaseous embolus` | new; organ- and subtype-specific embolism hits rejected | delta |
| acute-inflammation-classification · M4-SN03 | `classification acute inflammation`; `types acute inflammation`; `serous fibrinous suppurative`; `morphologic patterns acute inflammation` | new | delta |
| tissue-injury-response-classes · M4-SN04 | `tissue response injury`; `reaction to injury`; `cell injury response`; `adaptation necrosis` | new externally | collapse to Family-1 `tissue-reactions-to-injury` |
| reversible-irreversible-cell-injury · M4-SN05 | `reversible irreversible injury comparison`; `reversible cell injury`; `irreversible cell injury`; `point of no return cell injury` | new; pending earliest-reversible-change question is narrower | delta |
| generalized-oedema-patterns · M4-TF03 | `generalized oedema causes`; `nutritional cardiac edema`; `systemic edema patterns`; `anasarca cardiac malnutrition` | pending `CON-CVS-A0176AF74ADE58` | delta |
| amyloid-staining · M4-TF05 | `amyloid stain`; `Congo red amyloid`; `oil red amyloid`; `apple green birefringence` | pending `CON-FND-4867DD3814D088` | delta |
| primary-tb-dissemination · M4-TF06, M4-MCQ02 | `primary tuberculosis blood spread`; `primary TB complication`; `lymphohematogenous TB spread`; `primary tuberculosis dissemination` | new | delta |
| haemoperitoneum-definition · M4-TERM01 | `hemoperitoneum definition`; `haemoperitoneum`; `blood peritoneal cavity`; `intraperitoneal hemorrhage` | new | delta |
| infarction-definition · M4-TERM02 | `infarction definition`; `ischemic necrosis vascular occlusion`; `infarct definition`; `arterial occlusion tissue necrosis` | new; myocardial and renal infarct records are organ-specific | delta |
| granulomatous-inflammation · M4-TERM03, M5-SN05 | `granulomatous inflammation definition`; `granuloma morphology`; `activated macrophage nodules`; `epithelioid cell granuloma` | new; disease-specific TB and actinomycosis granulomas are narrower | delta |
| pyknosis-definition · M4-TERM04 | `pyknosis definition`; `nuclear shrinkage basophilia`; `pyknotic nucleus`; `chromatin condensation necrosis` | pending `CON-FND-8DA30AD870AC1E` plus glossary `pyknosis` | delta |
| interstitial-haemorrhage · M5-SN01 | `interstitial hemorrhage`; `haemorrhage into tissues`; `petechiae ecchymosis hematoma`; `tissue bleeding morphology` | new | delta |
| infarction-morphology-fate · M5-SN02 | `infarction morphology fate`; `infarct healing outcome`; `red white infarct morphology`; `ischemic necrosis repair` | new; organ-specific infarction hits rejected | delta |
| pitting-oedema-patterns · M5-TF03 | `pitting edema lymphatic obstruction`; `inflammatory oedema pitting`; `pitting versus nonpitting edema`; `lymphoedema physical sign` | pending `CON-CVS-6D8E2D62A9F51E`, which explicitly distinguishes longstanding lymphatic non-pitting oedema | delta |
| chronic-inflammation-repair-sequence · M5-TF04 | `chronic inflammation followed by repair`; `chronic inflammation fibrosis`; `inflammation repair sequence`; `persistent injury healing` | new | delta |
| dystrophic-metastatic-calcification · M5-TF05 | `dystrophic metastatic calcification`; `metastatic calcification viable tissue`; `normal calcium nonviable tissue`; `pathologic calcification comparison` | pending `CON-FND-718662116D90C4` (with `CON-FND-33466CEBFC4EBA`) | delta |
| tuberculosis-risk-context · M5-TF06 | `tuberculosis poverty crowding`; `TB risk factors old age`; `tuberculosis social determinants`; `debilitating disease TB` | new | delta |
| anasarca-definition · M5-TERM01 | `anasarca definition`; `generalized edema serous effusion`; `massive generalized oedema`; `widespread subcutaneous edema` | new | delta |
| subintimal-fibrosis-vessel-narrowing · M5-TERM03 | `subintimal fibrosis vessel narrowing`; `arteriosclerosis definition`; `intimal thickening lumen narrowing`; `vascular wall fibrosis` | new | delta |
| hyperplasia-definition · M5-TERM04 | `hyperplasia definition`; `increase absolute cell number`; `adaptive cell proliferation`; `cell number increase stimulus` | pending `CON-FND-022049C93C4CD0` | delta |

### Family-2 checkpoint and cumulative BMS-102 pathology

| Measure | Family 1 | Family 2 | Cumulative / delta rule |
|---|---:|---:|---:|
| Raw observed prompts | 52 | 105 | 157 |
| Printed keys | 1 | 0 | 1 |
| Retained question records after wording dedupe | 52 | 85 | 137 |
| Source-distinct tested concepts | 51 | 74 | — |
| External live / pending / no same-scope match | 0 / 6 / 45 | 2 / 18 / 54 | Family-local disposition |
| Family-2 concepts already represented in Family 1 | — | 7 | subtract from cumulative concept addition |
| Cross-family concept delta | 51 | 67 | `74 - 7 = 67` |
| **Cumulative distinct tested concepts** | **51** | **+67** | **118** |

The seven cross-family collapses are inflammation definition, regenerative cell
populations/labile cells, oedema definition, cellular adaptation, pus composition,
healing definition, and tissue reactions to injury. Two of those seven also have an
external pending concept; the external-disposition row and cross-family row are therefore
separate dimensions, not additive buckets. External arithmetic is `2 + 18 + 54 = 74`;
concept arithmetic is `85 retained - 11 within-family collapses = 74`, then
`51 + (74 - 7) = 118` cumulative concepts.

### Exact remaining debt after Family 2

- Printed pp. 242–255 of this source are now bounded in Families 1–2. No additional
  BMS-102 prompt remains in this PDF.
- Printed pp. 256–262 are still `TUTORIAL 103`; they remain excluded and should be routed
  to the LCS-103 owner as a cross-module source candidate.
- Other BMS-102 pathology question-source rows and all BMS-102 microbiology evidence
  remain S1 debt. No S2 work is authorised without literal `TRIAGE APPROVED` from `/root`.

## Family 3 — pathology continuous assessment, Circulatory 2 solved/unsolved pair

### Source selection, identity, and page boundary

After the tier-1 department-book Tutorial 102 pages were exhausted, the next bounded
exam-paper-first family is the manifest-paired, assessment-labelled Circulatory 2 MCQ
source. Both members are tier 3, but the solved companion prints a key immediately after
every prompt and is therefore stronger evidence than an unkeyed generic revision bank.
No Tutorial 103 page or LCS-owned source is included.

| Copy | Manifest source | Manifest and recomputed SHA-256 | Native pages | Source status |
|---|---|---|---:|---|
| Unsolved | `src_557920d8b7726db4f14b` | `557920d8b7726db4f14b89d1c9ee69ece6db28d037485355c39d129767e9f4ee` | 6 | Pathology · Questions/MCQs · tier 3; 28 printed prompts, no printed key |
| Solved | `src_2b465fab7f0bfd7dd687` | `2b465fab7f0bfd7dd687716d258a5e0f613132f974be6700fd588b33f96c5809` | 7 | Same paired family; `solvedCopy: true`; 30 prompts and 30 immediately printed keys |

All 13 native pages were rendered at 150 dpi and read visually, with native extraction
used only to check transcription. The unsolved copy prints Q1–21, Q23–26 and Q28–30;
Q22 and Q27 are absent, and its p. 6 is only the continuation of Q30's options. The
solved copy prints Q1–30. Thus the pair contains 58 observed prompt occurrences, not 60.

### Source-assignment ledger and printed keys

`F3-A` denotes the solved answer copy and `F3-Q` the unsolved copy. Each retained row
maps to one and only one search handle. The four repeated tested scopes are collapsed
only after the 30 retained records are assigned: Q2+Q4, Q3+Q26, Q13+Q29, and Q14+Q23.

| Ref | Observed prompt scope | Source-first assignment | Printed key |
|---|---|---|---|
| F3-A01 | Primary function of haemostasis | retain → `hemostasis-primary-function` | B · stop bleeding from ruptured vessels |
| F3-A02 | Main thrombosis cause in atherosclerosis | retain → `endothelial-injury-thrombosis` | B · endothelial injury |
| F3-A03 | Factor most associated with venous thrombosis | retain → `venous-stasis-thrombosis` | C · slow flow and stasis |
| F3-A04 | Condition most likely to produce a thrombus | retain; collapse → `endothelial-injury-thrombosis` | A · endothelial injury |
| F3-A05 | Vessel in which a red thrombus is most common | retain → `red-thrombus-venous-location` | B · veins |
| F3-A06 | Feature that is not characteristic of a thrombus | retain → `thrombus-morphologic-characteristics` | B · smooth surface |
| F3-A07 | Thrombus versus postmortem clot | retain → `thrombus-versus-postmortem-clot` | C · living person versus after death |
| F3-A08 | Item that is not a thrombosis risk | retain → `thrombosis-risk-factor-recognition` | D · high platelet count |
| F3-A09 | Appearance of Lines of Zahn | retain → `lines-of-zahn-appearance` | A · alternating white and red layers |
| F3-A10 | Primary cause of DIC | retain → `dic-systemic-coagulation-activation` | C · systemic activation of coagulation |
| F3-A11 | Common site of venous thrombosis | retain → `venous-thrombosis-common-site` | B · leg veins |
| F3-A12 | Complete obstruction of a small artery by thrombus | retain → `occlusive-thrombus-definition` | B · occlusive thrombus |
| F3-A13 | Embolism following DVT | retain → `dvt-pulmonary-embolism-pathway` | C · pulmonary embolism |
| F3-A14 | Condition commonly associated with fat embolism | retain → `fat-embolism-fracture-association` | B · bone fracture |
| F3-A15 | Embolism caused by air introduced into circulation | retain → `air-embolism-definition` | B · air embolism |
| F3-A16 | Phase associated with amniotic fluid embolism | retain → `amniotic-fluid-embolism-labor-timing` | B · uterine contractions during labour |
| F3-A17 | Key feature of septic embolism | retain → `septic-embolism-pyaemic-abscess` | C · pyaemic abscess at impaction |
| F3-A18 | Hypercoagulability from increased hepatic coagulation factors | retain → `malignancy-hypercoagulability` | B · tumours |
| F3-A19 | Embolism containing malignant cells | retain → `tumor-embolism-malignant-cells` | B · tumour embolism |
| F3-A20 | Cause of thromboembolism | retain → `thromboembolism-thrombus-detachment` | B · detachment of a thrombus |
| F3-A21 | Thrombus effect with good collateral circulation | retain → `thrombus-outcome-good-collaterals` | B · transient ischaemia |
| F3-A22 | Embolism that can cause a systemic issue | retain → `tumor-embolism-systemic-consequence` | B · tumour embolism |
| F3-A23 | Condition linked to fat embolism syndrome | retain; collapse → `fat-embolism-fracture-association` | C · bone fractures |
| F3-A24 | Result of embolism from a cardiac thrombus | retain → `cardiac-thrombus-systemic-embolism` | C · systemic arterial blockage |
| F3-A25 | Effect of an embolus in the portal vein | retain → `portal-venous-embolus-liver-infarction` | B · liver infarction |
| F3-A26 | Major factor in venous thrombosis | retain; collapse → `venous-stasis-thrombosis` | B · slow flow and stasis |
| F3-A27 | Embolism involving fat globules in blood | retain → `fat-embolism-definition` | C · fat embolism |
| F3-A28 | Common site for an arterial thrombus | retain → `arterial-thrombus-aneurysm-site` | B · aneurysms |
| F3-A29 | Destination event after a venous thrombus reaches the right heart | retain; collapse → `dvt-pulmonary-embolism-pathway` | A · pulmonary embolism |
| F3-A30 | Common cause of air embolism | retain → `air-embolism-large-vein-trauma` | C · trauma to large veins |
| F3-Q01 | Same wording as solved Q1 | cross-copy wording repeat → F3-A01; exclude | none |
| F3-Q02 | Same wording as solved Q2 | cross-copy wording repeat → F3-A02; exclude | none |
| F3-Q03 | Same wording as solved Q3 | cross-copy wording repeat → F3-A03; exclude | none |
| F3-Q04 | Same wording as solved Q4 | cross-copy wording repeat → F3-A04; exclude | none |
| F3-Q05 | Same wording as solved Q5 | cross-copy wording repeat → F3-A05; exclude | none |
| F3-Q06 | Same wording as solved Q6 | cross-copy wording repeat → F3-A06; exclude | none |
| F3-Q07 | Same wording as solved Q7 | cross-copy wording repeat → F3-A07; exclude | none |
| F3-Q08 | Same wording as solved Q8 | cross-copy wording repeat → F3-A08; exclude | none |
| F3-Q09 | Same wording as solved Q9 | cross-copy wording repeat → F3-A09; exclude | none |
| F3-Q10 | Same wording as solved Q10 | cross-copy wording repeat → F3-A10; exclude | none |
| F3-Q11 | Same wording as solved Q11 | cross-copy wording repeat → F3-A11; exclude | none |
| F3-Q12 | Same wording as solved Q12 | cross-copy wording repeat → F3-A12; exclude | none |
| F3-Q13 | Same wording as solved Q13 | cross-copy wording repeat → F3-A13; exclude | none |
| F3-Q14 | Same wording as solved Q14 | cross-copy wording repeat → F3-A14; exclude | none |
| F3-Q15 | Same wording as solved Q15 | cross-copy wording repeat → F3-A15; exclude | none |
| F3-Q16 | Same wording as solved Q16 | cross-copy wording repeat → F3-A16; exclude | none |
| F3-Q17 | Same wording as solved Q17 | cross-copy wording repeat → F3-A17; exclude | none |
| F3-Q18 | Same wording as solved Q18 | cross-copy wording repeat → F3-A18; exclude | none |
| F3-Q19 | Same wording as solved Q19 | cross-copy wording repeat → F3-A19; exclude | none |
| F3-Q20 | Same wording as solved Q20 | cross-copy wording repeat → F3-A20; exclude | none |
| F3-Q21 | Same wording as solved Q21 | cross-copy wording repeat → F3-A21; exclude | none |
| F3-Q23 | Same wording as solved Q23 | cross-copy wording repeat → F3-A23; exclude | none |
| F3-Q24 | Same wording as solved Q24 | cross-copy wording repeat → F3-A24; exclude | none |
| F3-Q25 | Same wording as solved Q25 | cross-copy wording repeat → F3-A25; exclude | none |
| F3-Q26 | Same wording as solved Q26 | cross-copy wording repeat → F3-A26; exclude | none |
| F3-Q28 | Same wording as solved Q28 | cross-copy wording repeat → F3-A28; exclude | none |
| F3-Q29 | Same wording as solved Q29 | cross-copy wording repeat → F3-A29; exclude | none |
| F3-Q30 | Same wording as solved Q30 | cross-copy wording repeat → F3-A30; exclude | none |

Assignment arithmetic is `30 solved + 28 unsolved = 58` observed rows; the 28 unsolved
rows are cross-copy wording repeats, leaving 30 retained records. Four within-family
tested-scope collapses then yield `30 - 4 = 26` source-distinct handles. All 30 keys above
are visibly printed in the solved companion; none is inferred for the unsolved copy.

### Search-before-mint register and prior-BMS-102 adjudication

Each of the 26 handles received four required searches (distinctive wording, alias,
synonym, and mechanism/structure): **104 required searches**. Targeted exact follow-ups
resolved primary haemostasis, Virchow triad, DIC, DVT/pulmonary embolism, embolism
subtypes, and the live large-vein air-entry record. Scope was live state, all pending
roots searched by `find-existing.mjs`, and Families 1–2 of this BMS-102 ledger. A broad
article or parent topic was rejected unless it stated the tested proposition.

| Handle · retained refs | Four required queries | External disposition and decision | Prior BMS-102 relation |
|---|---|---|---|
| `hemostasis-primary-function` · A01 | `hemostasis primary function`; `haemostasis purpose`; `stop bleeding ruptured vessels`; `vascular injury blood loss` | pending `CON-HEM-C62DE76BB2BDCD`; its primary-haemostasis objective explicitly ends in arresting bleeding | delta |
| `endothelial-injury-thrombosis` · A02,A04 | `endothelial injury thrombosis`; `atherosclerosis thrombus cause`; `endothelial damage clot`; `Virchow triad endothelium` | pending `CON-CVS-1DBCD5D81337B5` | collapse to Family-2 `thrombosis-definition-risk` |
| `venous-stasis-thrombosis` · A03,A26 | `venous thrombosis stasis`; `slow blood flow thrombus`; `venous stasis clot`; `Virchow triad abnormal flow` | pending `CON-CVS-1DBCD5D81337B5` | collapse to Family-2 `thrombosis-definition-risk` |
| `red-thrombus-venous-location` · A05 | `red thrombus veins`; `venous red thrombus`; `red clot vessel type`; `erythrocyte rich thrombus` | new; no same-scope record | delta |
| `thrombus-morphologic-characteristics` · A06 | `thrombus morphology`; `firm friable thrombus`; `adherent thrombus wall`; `thrombus surface appearance` | new; organ-specific thrombus mentions do not supply the morphology set | delta |
| `thrombus-versus-postmortem-clot` · A07 | `thrombus postmortem clot`; `antemortem versus postmortem clot`; `thrombus formed during life`; `postmortem blood clot` | new externally | related but not same scope as Family-2 `thrombosis-definition-risk`: Family 2 tests formation during life, while this handle tests the full antemortem-versus-postmortem comparison; delta |
| `thrombosis-risk-factor-recognition` · A08 | `thrombosis risk factors`; `bed rest smoking thrombosis`; `heart disease thrombus risk`; `platelet count thrombosis risk` | pending `CON-CVS-1DBCD5D81337B5`; it assigns thrombosis risks to Virchow-triad arms | collapse to Family-2 `thrombosis-definition-risk` |
| `lines-of-zahn-appearance` · A09 | `lines of Zahn`; `Zahn lines thrombus`; `alternating pale red layers`; `laminated thrombus` | new | delta |
| `dic-systemic-coagulation-activation` · A10 | `DIC systemic coagulation activation`; `disseminated intravascular coagulation cause`; `consumption coagulopathy mechanism`; `widespread microthrombi` | pending `CON-HEM-33CFB175D5114C`, which states widespread clotting with consumptive bleeding | delta |
| `venous-thrombosis-common-site` · A11 | `venous thrombosis common site`; `deep leg vein thrombosis`; `DVT lower limb`; `leg veins thrombus` | pending `ART-CVS-DVT`; its definition states deep vein thrombosis is most commonly in the lower limb | delta |
| `occlusive-thrombus-definition` · A12 | `occlusive thrombus definition`; `small artery complete occlusion`; `mural versus occlusive thrombus`; `thrombus vessel lumen obstruction` | new; coronary occlusive-thrombus mentions are disease-specific | delta |
| `dvt-pulmonary-embolism-pathway` · A13,A29 | `DVT pulmonary embolism`; `venous thrombus right heart lung`; `deep vein thromboembolism`; `pulmonary embolus source` | pending `ART-CVS-DVT` and the pending pulmonary-embolism-after-bed-rest question; both state the DVT-to-pulmonary-circulation route | delta |
| `fat-embolism-fracture-association` · A14,A23 | `fat embolism bone fracture`; `fracture fat embolism syndrome`; `long bone fracture embolus`; `marrow fat bloodstream` | new | delta |
| `air-embolism-definition` · A15 | `air embolism definition`; `air introduced circulation`; `gas embolus bloodstream`; `intravascular air` | new; live `CON-FND-8419792B7B2569` is the external-jugular injury mechanism, not the general definition | delta; Family-2 `embolism-definition-types` is a broader parent scope, not this subtype proposition |
| `amniotic-fluid-embolism-labor-timing` · A16 | `amniotic fluid embolism labor`; `amniotic embolism uterine contractions`; `obstetric embolism timing`; `amniotic fluid circulation childbirth` | new | delta |
| `septic-embolism-pyaemic-abscess` · A17 | `septic embolism pyaemic abscess`; `pyemic abscess embolus`; `infected embolus impaction`; `septic emboli metastatic abscess` | new externally | collapse to Family-1 `pyaemia-definition` |
| `malignancy-hypercoagulability` · A18 | `malignancy hypercoagulability`; `tumor coagulation factor synthesis`; `cancer thrombosis risk`; `Trousseau syndrome mechanism` | new; Virchow-triad pending record names malignancy as a risk but does not state increased hepatic coagulation-factor production | delta |
| `tumor-embolism-malignant-cells` · A19 | `tumor embolism malignant cells`; `malignant cell embolus`; `cancer cells bloodstream embolism`; `neoplastic emboli` | new | delta |
| `thromboembolism-thrombus-detachment` · A20 | `thromboembolism thrombus detachment`; `detached thrombus embolus`; `thromboembolus origin`; `embolism from thrombus` | new externally; a DVT article alias does not define general thromboembolism | collapse to Family-2 `embolism-definition-types`, whose retained definition begins with detached intravascular material |
| `thrombus-outcome-good-collaterals` · A21 | `thrombus good collateral circulation`; `collaterals transient ischemia`; `thrombus outcome ischemia`; `vascular occlusion collateral flow` | new | related but not same scope as Family-2 `thrombosis-outcomes`, which tests thrombus fate rather than the tissue effect of collaterals; delta |
| `tumor-embolism-systemic-consequence` · A22 | `tumor embolism systemic issue`; `systemic tumor emboli`; `malignant embolism consequence`; `neoplastic vascular dissemination` | new | delta |
| `cardiac-thrombus-systemic-embolism` · A24 | `cardiac thrombus systemic embolism`; `heart thrombus arterial blockage`; `left heart embolus systemic circulation`; `cardioembolic arterial occlusion` | new; myocardial mural-thrombus mentions do not state this complete route | delta |
| `portal-venous-embolus-liver-infarction` · A25 | `portal vein embolus liver infarction`; `portal embolism hepatic infarct`; `portal venous occlusion liver`; `embolus portal circulation` | new | delta |
| `fat-embolism-definition` · A27 | `fat embolism definition`; `fat globules bloodstream`; `marrow fat embolus`; `circulating fat droplets` | new; broader embolism-type records do not state this subtype proposition | delta |
| `arterial-thrombus-aneurysm-site` · A28 | `arterial thrombus aneurysm`; `arterial thrombosis common site`; `aneurysm thrombus formation`; `abnormal flow arterial clot` | new; Laplace/aneurysm-growth records are different scope | delta |
| `air-embolism-large-vein-trauma` · A30 | `air embolism large vein trauma`; `large vein injury air entry`; `external jugular air embolism`; `venous trauma gas embolus` | new; live `CON-FND-8419792B7B2569` is specific to the external jugular at its fascial piercing and does not cover the source's general large-vein-trauma scope | delta |

### Family-3 checkpoint and cumulative BMS-102 pathology

| Measure | Family 3 | Cumulative after Family 3 |
|---|---:|---:|
| Raw observed prompt occurrences | 58 | 215 |
| Printed keys | 30 | 31 |
| Retained question records after wording dedupe | 30 | 167 |
| Source-distinct tested concepts | 26 | — |
| External live / pending / no same-scope match | 0 / 7 / 19 | family-local disposition |
| Family-3 handles already represented in Families 1–2 | 5 | subtract from Family-3 concept addition |
| Cross-family concept delta | 21 | `26 - 5 = 21` |
| **Cumulative distinct tested concepts** | **+21** | **139** |

External arithmetic is `0 + 7 + 19 = 26`. The five prior-BMS-102 overlaps are three
handles already represented by Family-2 `thrombosis-definition-risk`, one by Family-2
`embolism-definition-types`, and one by Family-1 `pyaemia-definition`. They are separate
from external disposition: several prior overlaps also have an external pending record.
Cumulative arithmetic is `157 + 58 = 215` observed prompts, `1 + 30 = 31` printed keys,
`137 + 30 = 167` retained records, and `118 + (26 - 5) = 139` distinct concepts.

### Exact remaining debt after Family 3

- The Circulatory 2 solved/unsolved pair is fully bounded: all 13 native pages were read,
  all 58 prompt occurrences assigned, and all 30 printed keys counted once.
- The remaining tier-3 BMS-102 pathology question rows include the other continuous-
  assessment topics (for example Neoplasia 4) and other local question/revision banks.
- All BMS-102 microbiology evidence remains S1 debt.
- Tutorial 103/LCS material remains explicitly excluded from this lane. No S2 content,
  IDs, imports, catalogue changes, or readiness claims are authorised without literal
  `TRIAGE APPROVED` from `/root`.

## Family 4 — pathology continuous assessment, Neoplasia 4 solved/unsolved pair

### Source selection, identity, and page boundary

After the Tutorial 102 department-book pages and the Circulatory 2 assessment pair were
bounded, the next exam-paper-first local family is the tier-3 Neoplasia 4 continuous-
assessment pair. The unsolved copy contributes an exact duplicate of the first 40
questions in the solved companion; the solved companion then adds a separate 30-question
Tumor Growth and Kinetics / angiogenesis / progression / host-response / tumour-antigen
block. No Tutorial 103 or LCS-owned source is included.

| Copy | Manifest source | Manifest and recomputed SHA-256 | Native pages | Source status |
|---|---|---|---:|---|
| Unsolved | `src_e1aac4e34bf9379bb178` | `e1aac4e34bf9379bb178edcc7d328b96ed8ca5f49ac912cf010ab240e42433d6` | 9 | Pathology · Questions/MCQs · tier 3; 40 prompts, no printed keys |
| Solved | `src_83c77a2c46ce746c1981` | `83c77a2c46ce746c19816a5f4b67b99adc035c61691b3f32c1c5090ccaef4961` | 16 | Paired answer copy; `solvedCopy: true`; 70 prompts and 70 printed keys |

All 25 native pages were rendered at 150 dpi and read visually, with native extraction
used only to check transcription. A few question-number glyphs are clipped or absent
(unsolved A1; both copies B1, B11, and B13), but the ordered stems, option blocks, answer
lines, and section boundaries make the 10 + 30 + 30 structure unambiguous.

### Source-assignment ledger and printed keys

`F4-A` is the first specific 10-question block in the solved copy, `F4-B` the following
30-question paraphrase/general block, and `F4-C` the separate marked 30-question block.
`F4-UA` and `F4-UB` are the exact unsolved-copy occurrences. Every retained record maps
to one search handle. Sixteen retained records collapse at identical tested scope only
after assignment: B01–B10 into A01–A10; C03 into A02/B02; C16 into B11; B22 into B13;
C18 into B25; C26 into C01; and C27 into C05.

| Ref | Observed prompt scope | Source-first assignment | Printed key |
|---|---|---|---|
| F4-A01 | FAP mutation | retain → `fap-apc-cell-cycle-control` | APC |
| F4-A02 | Limitless replication hallmark | retain → `telomerase-limitless-replication` | telomerase |
| F4-A03 | Small-cell lung/neuroendocrine oncogene | retain → `small-cell-lung-myc-cell-cycle` | MYC |
| F4-A04 | Late suppressor loss in colon progression | retain → `colon-cancer-late-tp53-apoptosis` | TP53 |
| F4-A05 | Malignancy associated with chronic HBV | retain → `hepatitis-b-hepatocellular-carcinoma` | hepatocellular carcinoma |
| F4-A06 | Process promoted by VEGF | retain → `tumor-angiogenic-factor-process` | angiogenesis |
| F4-A07 | Burkitt lymphoma alteration | retain → `burkitt-lymphoid-translocation-proliferation` | t(8;14) |
| F4-A08 | Li-Fraumeni tumour spectrum | retain → `li-fraumeni-soft-tissue-breast-cancers` | sarcomas and breast cancers |
| F4-A09 | Consequence of E-cadherin loss | retain → `adhesion-loss-metastatic-potential` | increased metastatic potential |
| F4-A10 | Malignancy associated with BCL2 overexpression | retain → `bcl2-follicular-lymphoma` | follicular lymphoma |
| F4-B01 | FAP condition mechanism | retain; collapse → `fap-apc-cell-cycle-control` | mutations affecting cell-cycle control |
| F4-B02 | Enzyme class enabling limitless replication | retain; collapse → `telomerase-limitless-replication` | enzymes maintaining chromosome ends |
| F4-B03 | Small-cell lung pathway | retain; collapse → `small-cell-lung-myc-cell-cycle` | cell-cycle dysregulation |
| F4-B04 | Late colon-progression function loss | retain; collapse → `colon-cancer-late-tp53-apoptosis` | control of programmed cell death |
| F4-B05 | Chronic viral hepatitis malignancy | retain; collapse → `hepatitis-b-hepatocellular-carcinoma` | liver cancer |
| F4-B06 | Process driven by angiogenic factors | retain; collapse → `tumor-angiogenic-factor-process` | angiogenesis |
| F4-B07 | Aggressive lymphoid malignancy mechanism | retain; collapse → `burkitt-lymphoid-translocation-proliferation` | chromosomal translocations causing proliferation |
| F4-B08 | Inherited syndrome tumour combination | retain; collapse → `li-fraumeni-soft-tissue-breast-cancers` | soft-tissue and breast cancers |
| F4-B09 | Consequence of tumour-cell adhesion loss | retain; collapse → `adhesion-loss-metastatic-potential` | increased metastatic potential |
| F4-B10 | Excess anti-apoptotic protein malignancy | retain; collapse → `bcl2-follicular-lymphoma` | blood cancer |
| F4-B11 | Immune cell that detects and eliminates tumour cells | retain → `cytotoxic-lymphocyte-tumor-killing` | cytotoxic lymphocytes |
| F4-B12 | Receptor-blocker resistance mechanism | retain → `targeted-therapy-bypass-resistance` | alternative signalling pathways |
| F4-B13 | Tumour avoidance of immune detection | retain → `immune-checkpoint-tumor-evasion` | immune-checkpoint upregulation |
| F4-B14 | Process enabling invasion and metastasis | retain → `extracellular-matrix-degradation-metastasis` | extracellular-matrix degradation |
| F4-B15 | TKI-resistance mechanism | retain → `tyrosine-kinase-inhibitor-secondary-mutation-resistance` | secondary mutations |
| F4-B16 | EMT-associated characteristic | retain → `emt-apoptosis-resistance` | resistance to apoptosis |
| F4-B17 | Cancer-cachexia mechanism | retain → `cancer-cachexia-systemic-catabolism` | systemic inflammation and catabolism |
| F4-B18 | Hereditary-cancer-syndrome basis | retain → `hereditary-cancer-germline-tumor-suppressors` | germline tumour-suppressor mutations |
| F4-B19 | Trigger for tumour angiogenesis | retain → `hypoxia-driven-tumor-angiogenesis` | decreased oxygen / hypoxia |
| F4-B20 | Basis of genomic instability | retain → `dna-repair-loss-genomic-instability` | impaired DNA repair |
| F4-B21 | Defining malignant-versus-benign feature | retain → `malignant-versus-benign-invasion` | invasion |
| F4-B22 | Resistance to immune-mediated destruction | retain; collapse → `immune-checkpoint-tumor-evasion` | checkpoint molecules |
| F4-B23 | Treatment for a mutation-driven tumour | retain → `mutation-targeted-therapy-selection` | targeted therapy |
| F4-B24 | Tumour-suppressor function | retain → `tumor-suppressor-protein-function` | prevent uncontrolled growth |
| F4-B25 | Microenvironmental immune suppression | retain → `immunosuppressive-cytokine-tumor-escape` | immunosuppressive cytokines |
| F4-B26 | Dormant tumour-cell survival | retain → `tumor-dormancy-low-metabolism` | decreased metabolic activity |
| F4-B27 | Primary EMT function | retain → `emt-promotes-metastasis` | metastasis |
| F4-B28 | Targeting cancer metabolism | retain → `glycolysis-targeted-cancer-metabolism` | block glycolysis |
| F4-B29 | HIF metabolic effect | retain → `hif-glycolytic-enzyme-upregulation` | upregulates glycolytic enzymes |
| F4-B30 | Cancer-stem-cell recurrence mechanism | retain → `cancer-stem-cell-treatment-resistance-recurrence` | chemotherapy/radiation resistance |
| F4-C01 | Cancer initiation | retain → `cancer-initiation-irreversible-dna-damage` | irreversible genetic changes |
| F4-C02 | Cancer promotion | retain → `tumor-promotion-clonal-expansion` | clonal expansion |
| F4-C03 | Mechanism of cellular immortality | retain; collapse → `telomerase-limitless-replication` | telomerase |
| F4-C04 | Growth-fraction definition | retain → `tumor-growth-fraction-definition` | percentage of proliferating tumour cells |
| F4-C05 | Consequence of high growth fraction | retain → `growth-fraction-chemotherapy-sensitivity` | increased chemotherapy sensitivity |
| F4-C06 | Least contributor to decreased tumour-cell loss | retain → `tumor-cell-loss-factor-exception` | Bcl2 overexpression |
| F4-C07 | Factor not directly influencing doubling time | retain → `tumor-doubling-time-determinants` | angiogenesis |
| F4-C08 | Tumour-heterogeneity definition | retain → `tumor-heterogeneity-definition` | genetic and phenotypic variability |
| F4-C09 | Maximum avascular tumour size | retain → `avascular-tumor-size-limit-2mm` | 2 mm |
| F4-C10 | Tumour-cell angiogenic factor | retain → `fgf-tumor-angiogenic-factor` | FGF |
| F4-C11 | Macrophage-secreted angiogenic factor | retain → `macrophage-tgf-alpha-tumor-angiogenesis` | TGF-alpha |
| F4-C12 | Why angiogenesis is critical | retain → `angiogenesis-oxygen-nutrient-supply` | oxygen and nutrient supply |
| F4-C13 | Tumour-progression definition | retain → `tumor-progression-acquired-malignant-characteristics` | acquired malignant characteristics over time |
| F4-C14 | Cause of tumour heterogeneity | retain → `mutation-accumulation-tumor-heterogeneity` | mutation accumulation |
| F4-C15 | Gene loss causing genetic instability | retain → `p53-loss-genetic-instability` | p53 |
| F4-C16 | Cell responsible for direct tumour killing | retain; collapse → `cytotoxic-lymphocyte-tumor-killing` | cytotoxic T lymphocyte |
| F4-C17 | Innate antitumour cell | retain → `natural-killer-innate-antitumor-immunity` | natural killer cell |
| F4-C18 | Tumour immune-escape mechanism | retain; collapse → `immunosuppressive-cytokine-tumor-escape` | TGF-beta secretion |
| F4-C19 | Evidence for immune surveillance | retain → `spontaneous-regression-immune-surveillance` | spontaneous tumour regression |
| F4-C20 | Exception among antitumour effectors | retain → `antitumor-effector-mechanisms-exception` | neutrophils |
| F4-C21 | Antigen exclusive to tumour cells | retain → `tumor-specific-antigen-exclusivity` | tumour-specific antigen |
| F4-C22 | Antigen on tumour and some normal cells | retain → `tumor-associated-antigen-normal-tumor-expression` | tumour-associated antigen |
| F4-C23 | Marker in normal and neoplastic prostate | retain → `psa-normal-neoplastic-prostate` | PSA |
| F4-C24 | Tumour associated with elevated AFP | retain → `afp-hepatocellular-carcinoma` | hepatocellular carcinoma |
| F4-C25 | Tumour monitored with CEA | retain → `cea-colon-cancer-monitoring` | colon adenocarcinoma |
| F4-C26 | Initiation-stage transformation | retain; collapse → `cancer-initiation-irreversible-dna-damage` | DNA damage |
| F4-C27 | Chemotherapy-resistant growth pattern | retain; collapse → `growth-fraction-chemotherapy-sensitivity` | low growth fraction |
| F4-C28 | Mechanism reducing apoptosis | retain → `bcl2-reduced-tumor-cell-loss-apoptosis` | Bcl2 overexpression |
| F4-C29 | Final stage in tumour progression | retain → `metastasis-final-stage` | metastasis |
| F4-C30 | Unchecked replication despite DNA damage | retain → `p53-inactivation-dna-damage-checkpoint` | p53 inactivation |
| F4-UA01 | Exact unsolved copy of solved A01 | cross-copy wording repeat → F4-A01; exclude | none |
| F4-UA02 | Exact unsolved copy of solved A02 | cross-copy wording repeat → F4-A02; exclude | none |
| F4-UA03 | Exact unsolved copy of solved A03 | cross-copy wording repeat → F4-A03; exclude | none |
| F4-UA04 | Exact unsolved copy of solved A04 | cross-copy wording repeat → F4-A04; exclude | none |
| F4-UA05 | Exact unsolved copy of solved A05 | cross-copy wording repeat → F4-A05; exclude | none |
| F4-UA06 | Exact unsolved copy of solved A06 | cross-copy wording repeat → F4-A06; exclude | none |
| F4-UA07 | Exact unsolved copy of solved A07 | cross-copy wording repeat → F4-A07; exclude | none |
| F4-UA08 | Exact unsolved copy of solved A08 | cross-copy wording repeat → F4-A08; exclude | none |
| F4-UA09 | Exact unsolved copy of solved A09 | cross-copy wording repeat → F4-A09; exclude | none |
| F4-UA10 | Exact unsolved copy of solved A10 | cross-copy wording repeat → F4-A10; exclude | none |
| F4-UB01 | Exact unsolved copy of solved B01 | cross-copy wording repeat → F4-B01; exclude | none |
| F4-UB02 | Exact unsolved copy of solved B02 | cross-copy wording repeat → F4-B02; exclude | none |
| F4-UB03 | Exact unsolved copy of solved B03 | cross-copy wording repeat → F4-B03; exclude | none |
| F4-UB04 | Exact unsolved copy of solved B04 | cross-copy wording repeat → F4-B04; exclude | none |
| F4-UB05 | Exact unsolved copy of solved B05 | cross-copy wording repeat → F4-B05; exclude | none |
| F4-UB06 | Exact unsolved copy of solved B06 | cross-copy wording repeat → F4-B06; exclude | none |
| F4-UB07 | Exact unsolved copy of solved B07 | cross-copy wording repeat → F4-B07; exclude | none |
| F4-UB08 | Exact unsolved copy of solved B08 | cross-copy wording repeat → F4-B08; exclude | none |
| F4-UB09 | Exact unsolved copy of solved B09 | cross-copy wording repeat → F4-B09; exclude | none |
| F4-UB10 | Exact unsolved copy of solved B10 | cross-copy wording repeat → F4-B10; exclude | none |
| F4-UB11 | Exact unsolved copy of solved B11 | cross-copy wording repeat → F4-B11; exclude | none |
| F4-UB12 | Exact unsolved copy of solved B12 | cross-copy wording repeat → F4-B12; exclude | none |
| F4-UB13 | Exact unsolved copy of solved B13 | cross-copy wording repeat → F4-B13; exclude | none |
| F4-UB14 | Exact unsolved copy of solved B14 | cross-copy wording repeat → F4-B14; exclude | none |
| F4-UB15 | Exact unsolved copy of solved B15 | cross-copy wording repeat → F4-B15; exclude | none |
| F4-UB16 | Exact unsolved copy of solved B16 | cross-copy wording repeat → F4-B16; exclude | none |
| F4-UB17 | Exact unsolved copy of solved B17 | cross-copy wording repeat → F4-B17; exclude | none |
| F4-UB18 | Exact unsolved copy of solved B18 | cross-copy wording repeat → F4-B18; exclude | none |
| F4-UB19 | Exact unsolved copy of solved B19 | cross-copy wording repeat → F4-B19; exclude | none |
| F4-UB20 | Exact unsolved copy of solved B20 | cross-copy wording repeat → F4-B20; exclude | none |
| F4-UB21 | Exact unsolved copy of solved B21 | cross-copy wording repeat → F4-B21; exclude | none |
| F4-UB22 | Exact unsolved copy of solved B22 | cross-copy wording repeat → F4-B22; exclude | none |
| F4-UB23 | Exact unsolved copy of solved B23 | cross-copy wording repeat → F4-B23; exclude | none |
| F4-UB24 | Exact unsolved copy of solved B24 | cross-copy wording repeat → F4-B24; exclude | none |
| F4-UB25 | Exact unsolved copy of solved B25 | cross-copy wording repeat → F4-B25; exclude | none |
| F4-UB26 | Exact unsolved copy of solved B26 | cross-copy wording repeat → F4-B26; exclude | none |
| F4-UB27 | Exact unsolved copy of solved B27 | cross-copy wording repeat → F4-B27; exclude | none |
| F4-UB28 | Exact unsolved copy of solved B28 | cross-copy wording repeat → F4-B28; exclude | none |
| F4-UB29 | Exact unsolved copy of solved B29 | cross-copy wording repeat → F4-B29; exclude | none |
| F4-UB30 | Exact unsolved copy of solved B30 | cross-copy wording repeat → F4-B30; exclude | none |

Assignment arithmetic is `40 unsolved + 70 solved = 110` observed occurrences. The 40
unsolved rows are exact cross-copy wording repeats, leaving 70 retained records. The 16
within-family tested-scope collapses above yield `70 - 16 = 54` source-distinct handles.
The solved A+B block prints 40 answer lines and the solved C block prints 30 marked
answers, so all 70 keys are printed; none is inferred for an unsolved occurrence.

### Search-before-mint register and prior-BMS-102 adjudication

Each of the 54 handles received four required searches (distinctive wording, alias,
synonym, and mechanism/structure): **216 required searches**. Targeted follow-ups covered
FAP/APC, telomerase, MYC/small-cell lung carcinoma, Li-Fraumeni, E-cadherin, BCL2,
tumour immunity/checkpoints, EMT, cachexia, growth fraction/heterogeneity, p53, tumour
antigens and tumour markers. Scope included live state, all pending import roots, and
Families 1–3 of this BMS-102 ledger. Parent-topic and two-record composites were rejected
unless one record directly stated the tested proposition.

| Handle · retained refs | Four required queries | External disposition and exact-scope decision | Prior BMS-102 relation |
|---|---|---|---|
| `fap-apc-cell-cycle-control` · A01,B01 | `familial adenomatous polyposis APC`; `FAP APC mutation`; `APC cell cycle control`; `colonic epithelium uncontrolled proliferation` | new; no same-scope record | delta |
| `telomerase-limitless-replication` · A02,B02,C03 | `telomerase limitless replication`; `tumor cell immortality`; `chromosome end maintenance cancer`; `telomere shortening neoplasm` | pending `CON-FND-73C77966B56FED`; it states telomerase extends chromosome-end repeats to offset replication loss | delta |
| `small-cell-lung-myc-cell-cycle` · A03,B03 | `small cell lung MYC`; `small blue neuroendocrine tumor MYC`; `MYC amplification lung carcinoma`; `small cell lung cell cycle dysregulation` | new; no same-scope record | delta |
| `colon-cancer-late-tp53-apoptosis` · A04,B04 | `colon cancer late TP53`; `adenoma carcinoma sequence p53`; `late loss programmed cell death colon`; `colorectal progression apoptosis control` | new; general p53 records do not state its late colon-progression position | delta |
| `hepatitis-b-hepatocellular-carcinoma` · A05,B05 | `hepatitis B hepatocellular carcinoma`; `HBV liver cancer`; `chronic hepatitis B malignancy`; `viral integration hepatocarcinogenesis` | new; no same-scope record | delta |
| `tumor-angiogenic-factor-process` · A06,B06 | `tumor angiogenic factors`; `VEGF angiogenesis cancer`; `blood vessel formation tumor`; `neoplastic angiogenesis` | new; no same-scope record | delta |
| `burkitt-lymphoid-translocation-proliferation` · A07,B07 | `Burkitt t(8;14)`; `Burkitt MYC translocation`; `aggressive lymphoid chromosomal translocation`; `lymphoid malignancy increased proliferation` | new; no same-scope record | delta |
| `li-fraumeni-soft-tissue-breast-cancers` · A08,B08 | `Li-Fraumeni sarcoma breast cancer`; `TP53 inherited cancer syndrome`; `soft tissue breast cancer predisposition`; `Li Fraumeni tumor spectrum` | new; no same-scope record | delta |
| `adhesion-loss-metastatic-potential` · A09,B09 | `E-cadherin loss metastasis`; `cell adhesion loss tumor invasion`; `adhesion molecule metastatic potential`; `CDH1 cancer spread` | new externally | collapse to Family-1 `adhesion-molecule-loss-in-metastasis` |
| `bcl2-follicular-lymphoma` · A10,B10 | `BCL2 follicular lymphoma`; `t(14;18) antiapoptotic lymphoma`; `Bcl-2 blood cancer`; `anti-apoptotic protein lymphoid malignancy` | new externally; pending Bcl-2 records do not identify follicular lymphoma | collapse to Family-1 `bcl2-associated-lymphoma-mechanism` |
| `cytotoxic-lymphocyte-tumor-killing` · B11,C16 | `cytotoxic lymphocyte tumor killing`; `CTL anti-tumor immunity`; `cytotoxic T cell cancer cell death`; `direct killing tumor cells lymphocyte` | live `CON-IMM-019A95FA52738F`; it directly states MHC-I tumour-antigen recognition and tumour-cell killing | delta |
| `targeted-therapy-bypass-resistance` · B12 | `targeted therapy bypass resistance`; `alternative signaling pathway resistance`; `growth factor receptor inhibitor resistance`; `oncogenic pathway bypass` | new; no same-scope record | delta |
| `immune-checkpoint-tumor-evasion` · B13,B22 | `immune checkpoint tumor evasion`; `checkpoint molecule immune destruction resistance`; `cancer immune checkpoint expression`; `T cell inhibition tumor escape` | new; broad immune-escape records do not state checkpoint upregulation | delta |
| `extracellular-matrix-degradation-metastasis` · B14 | `extracellular matrix degradation metastasis`; `proteolytic enzyme tumor invasion`; `ECM breakdown cancer spread`; `matrix remodeling metastasis` | new; no same-scope record | delta |
| `tyrosine-kinase-inhibitor-secondary-mutation-resistance` · B15 | `tyrosine kinase inhibitor secondary mutation`; `TKI resistance target mutation`; `lung cancer acquired kinase inhibitor resistance`; `secondary mutation targeted drug resistance` | new; no same-scope record | delta |
| `emt-apoptosis-resistance` · B16 | `EMT apoptosis resistance`; `epithelial mesenchymal transition cell death`; `EMT therapy resistance`; `mesenchymal transition antiapoptotic` | new; no same-scope record | delta |
| `cancer-cachexia-systemic-catabolism` · B17 | `cancer cachexia systemic inflammation`; `tumor cachexia catabolic pathways`; `malignancy muscle fat breakdown`; `cancer wasting cytokines` | new; no same-scope mechanism record | related but narrower than Family-1 cachexia terminology; delta |
| `hereditary-cancer-germline-tumor-suppressors` · B18 | `hereditary cancer germline tumor suppressor`; `inherited cancer syndrome suppressor gene`; `germline mutation malignancy predisposition`; `autosomal dominant cancer susceptibility` | new; no same-scope record | delta |
| `hypoxia-driven-tumor-angiogenesis` · B19 | `hypoxia tumor angiogenesis`; `low oxygen angiogenic factor secretion`; `decreased oxygen cancer blood vessels`; `hypoxic neoplasm vascularization` | new; no same-scope record | delta |
| `dna-repair-loss-genomic-instability` · B20 | `DNA repair loss genomic instability`; `impaired DNA damage repair cancer`; `mutation accumulation repair defect tumor`; `genome instability neoplasm` | new; generic DNA-repair records do not state this neoplastic consequence | delta |
| `malignant-versus-benign-invasion` · B21 | `malignant benign invasion`; `tumor invasion distinguishes malignancy`; `benign versus malignant localized`; `surrounding tissue invasion neoplasm` | new externally | collapse to Family-1 `benign-versus-malignant-tumour` |
| `mutation-targeted-therapy-selection` · B23 | `driver mutation targeted therapy`; `genetic mutation cancer treatment selection`; `molecularly targeted therapy tumor`; `oncogenic driver precision treatment` | new; no same-scope record | delta |
| `tumor-suppressor-protein-function` · B24 | `tumor suppressor protein function`; `prevent uncontrolled cell growth`; `growth inhibitor cancer gene`; `cell cycle restraint tumor suppressor` | pending Kasr glossary `tumor suppressor gene` and `ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES`; both directly state cycle arrest/death/repair as the cancer brake | delta |
| `immunosuppressive-cytokine-tumor-escape` · B25,C18 | `immunosuppressive cytokine tumor escape`; `TGF beta cancer immune evasion`; `tumor microenvironment immune suppression`; `cancer stromal cytokine immune attack` | new; no same-scope record | delta |
| `tumor-dormancy-low-metabolism` · B26 | `tumor dormancy low metabolism`; `quiescent cancer cell metastasis`; `dormant tumor cell survival`; `metastatic dormancy metabolic activity` | new; no same-scope record | delta |
| `emt-promotes-metastasis` · B27 | `EMT promotes metastasis`; `epithelial mesenchymal transition invasion`; `mesenchymal motility tumor progression`; `cancer cellular plasticity spread` | new; no same-scope record | delta |
| `glycolysis-targeted-cancer-metabolism` · B28 | `cancer metabolism blocking glycolysis`; `Warburg effect targeted therapy`; `glycolysis inhibitor tumor`; `aerobic glycolysis treatment` | new; general glycolysis records do not state cancer-treatment targeting | delta |
| `hif-glycolytic-enzyme-upregulation` · B29 | `HIF glycolytic enzymes`; `hypoxia inducible factor cancer glycolysis`; `HIF metabolic adaptation tumor`; `hypoxia upregulates glycolysis` | new; no same-scope record | delta |
| `cancer-stem-cell-treatment-resistance-recurrence` · B30 | `cancer stem cell treatment resistance recurrence`; `tumor initiating cell chemotherapy radiation`; `self renewal cancer relapse`; `cancer stemness therapy resistance` | new; no same-scope record | delta |
| `cancer-initiation-irreversible-dna-damage` · C01,C26 | `cancer initiation irreversible DNA damage`; `neoplastic transformation initiation stage`; `growth regulatory gene mutation initiation`; `tumor natural history initiation` | new; no same-scope record | related but narrower than Family-1 initiation/progression/heterogeneity outline; delta |
| `tumor-promotion-clonal-expansion` · C02 | `tumor promotion clonal expansion`; `promotion phase transformed cells`; `cancer development promotion`; `neoplastic promoter proliferation` | new; no same-scope record | delta |
| `tumor-growth-fraction-definition` · C04 | `tumor growth fraction definition`; `percentage proliferating tumor cells`; `growth fraction neoplasm`; `cell kinetics proliferative fraction` | new; no same-scope record | delta |
| `growth-fraction-chemotherapy-sensitivity` · C05,C27 | `growth fraction chemotherapy sensitivity`; `high growth fraction chemo response`; `low growth fraction drug resistance`; `tumor kinetics chemotherapy` | new; no same-scope record | delta |
| `tumor-cell-loss-factor-exception` · C06 | `tumor cell loss factor exception`; `least contributes decreased cell loss tumors`; `increased apoptosis Bcl-2 telomerase tumor cell loss`; `tumor production cell loss ratio` | new; no same-scope record. The printed Bcl2 key conflicts with the pending record's anti-apoptotic role, so the key is preserved as source evidence but is neither corrected nor treated as an external match | delta |
| `bcl2-reduced-tumor-cell-loss-apoptosis` · C28 | `BCL2 reduced tumor cell loss`; `Bcl-2 overexpression apoptosis cancer`; `antiapoptotic tumor survival`; `decreased apoptosis neoplasm` | pending `CON-FND-1F66060A9C2625`; it directly classifies Bcl-2 as anti-apoptotic | delta |
| `tumor-doubling-time-determinants` · C07 | `tumor doubling time determinants`; `growth fraction cell loss doubling`; `neoplasm cell cycle duration`; `tumor kinetics doubling time` | new; no same-scope record | delta |
| `tumor-heterogeneity-definition` · C08 | `tumor heterogeneity definition`; `genetic phenotypic variability tumor cells`; `intratumoral heterogeneity`; `neoplastic cell variability` | new; no same-scope record | related but narrower than Family-1 initiation/progression/heterogeneity outline; delta |
| `avascular-tumor-size-limit-2mm` · C09 | `tumor size without angiogenesis 2 mm`; `avascular tumor maximum size`; `diffusion limit neoplasm 2mm`; `angiogenic switch size threshold` | new; no same-scope record | delta |
| `fgf-tumor-angiogenic-factor` · C10 | `FGF tumor angiogenesis`; `fibroblast growth factor neovascularization cancer`; `angiogenic factor tumor cell FGF`; `cancer blood vessel growth factor` | new; no same-scope record | delta |
| `macrophage-tgf-alpha-tumor-angiogenesis` · C11 | `macrophage TGF alpha tumor angiogenesis`; `tumor invading macrophage angiogenic factor`; `TGF-alpha neoplastic vascularization`; `macrophage secretion cancer blood vessels` | new; no same-scope record | delta |
| `angiogenesis-oxygen-nutrient-supply` · C12 | `tumor angiogenesis oxygen nutrient supply`; `cancer blood vessels progression`; `neoplasm vascular nutrition`; `angiogenesis supports tumor growth` | new; no same-scope record | delta |
| `tumor-progression-acquired-malignant-characteristics` · C13 | `tumor progression acquired malignant characteristics`; `neoplastic progression definition`; `malignant evolution over time`; `cancer progression phenotype` | new; no same-scope record | related but narrower than Family-1 initiation/progression/heterogeneity outline; delta |
| `mutation-accumulation-tumor-heterogeneity` · C14 | `mutation accumulation tumor heterogeneity`; `genetic instability intratumor diversity`; `cancer clonal evolution variability`; `neoplastic heterogeneity mechanism` | new; no same-scope record | delta |
| `p53-loss-genetic-instability` · C15 | `p53 loss genetic instability`; `TP53 genome stability tumor`; `p53 mutation accumulation cancer`; `tumor suppressor DNA instability` | pending `ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES`; its clinical-significance section explicitly states that p53 mutation causes genomic instability | delta |
| `natural-killer-innate-antitumor-immunity` · C17 | `natural killer innate antitumor immunity`; `NK cells cancer response`; `innate immune cell tumor killing`; `natural killer neoplasm surveillance` | new; separate live records identify NK cells as innate and as tumour killers, but no single same-scope record states the complete tested proposition | delta |
| `spontaneous-regression-immune-surveillance` · C19 | `spontaneous tumor regression immune surveillance`; `cancer immune surveillance evidence`; `immune system detects tumors regression`; `neoplasm surveillance theory` | new; surveillance records do not state spontaneous regression as evidence | delta |
| `antitumor-effector-mechanisms-exception` · C20 | `antitumor effector mechanisms`; `tumor immunity cytotoxic T NK macrophage`; `neutrophils anti-cancer immunity exception`; `immune effector cancer cells` | new externally | collapse to Family-1 `antitumour-effector-mechanisms` |
| `tumor-specific-antigen-exclusivity` · C21 | `tumor specific antigen exclusively tumor cells`; `TSA cancer antigen`; `unique neoplastic antigen`; `tumor antigen classification` | new; live tumour-antigen records do not define TSA exclusivity | delta |
| `tumor-associated-antigen-normal-tumor-expression` · C22 | `tumor associated antigen normal tumor cells`; `TAA cancer normal tissue`; `shared neoplastic antigen`; `tumor associated antigen definition` | new; no same-scope definition | delta |
| `psa-normal-neoplastic-prostate` · C23 | `PSA normal neoplastic prostate`; `prostate specific antigen tumor marker expression`; `PSA prostate tissue cancer`; `prostate marker normal malignant` | new; no same-scope record | delta |
| `afp-hepatocellular-carcinoma` · C24 | `AFP hepatocellular carcinoma`; `alpha fetoprotein liver cancer`; `HCC tumor marker AFP`; `hepatoma fetal protein marker` | new externally | collapse to Family-1 `afp-associated-tumour-differential` |
| `cea-colon-cancer-monitoring` · C25 | `CEA colon cancer monitoring`; `carcinoembryonic antigen colorectal follow-up`; `colon adenocarcinoma tumor marker`; `CEA surveillance malignancy` | new externally | collapse to Family-1 `malignant-tumour-marker-pairing` |
| `metastasis-final-stage` · C29 | `metastasis final stage cancer`; `tumor natural history metastatic stage`; `neoplasm progression final phase`; `cancer invasion progression metastasis` | new; no same-scope record | delta |
| `p53-inactivation-dna-damage-checkpoint` · C30 | `p53 inactivation DNA damage checkpoint`; `unchecked replication damaged DNA tumor`; `TP53 cell cycle arrest cancer`; `genome damage tumor suppressor checkpoint` | pending `CON-FND-1F66060A9C2625` and Kasr glossary `p53`; both state p53 arrests the cycle after DNA damage | delta |

### Family-4 checkpoint and cumulative BMS-102 pathology

| Measure | Family 4 | Cumulative after Family 4 |
|---|---:|---:|
| Raw observed prompt occurrences | 110 | 325 |
| Printed keys | 70 | 101 |
| Retained question records after wording dedupe | 70 | 237 |
| Source-distinct tested concepts | 54 | — |
| External live / pending / no same-scope match | 1 / 5 / 48 | family-local disposition |
| Family-4 handles already represented in Families 1–3 | 6 | subtract from Family-4 concept addition |
| Cross-family concept delta | 48 | `54 - 6 = 48` |
| **Cumulative distinct tested concepts** | **+48** | **187** |

External arithmetic is `1 + 5 + 48 = 54`. The five pending handles are telomerase,
tumour-suppressor function, Bcl2-mediated apoptosis reduction, p53-loss genomic
instability, and p53 DNA-damage checkpoint function. The six prior-BMS-102 overlaps are
adhesion loss/metastasis, BCL2-associated lymphoma, benign-versus-malignant invasion,
the antitumour-effector exception set, AFP/HCC, and CEA/colon cancer. External and prior-
family dispositions are separate dimensions. Cumulative arithmetic is
`215 + 110 = 325` observed prompts, `31 + 70 = 101` printed keys,
`167 + 70 = 237` retained records, and `139 + (54 - 6) = 187` distinct concepts.

### Exact remaining debt after Family 4

- The Neoplasia 4 pair is fully bounded: all 25 native pages, 110 prompt occurrences,
  and 70 printed keys have been assigned; the unsolved copy adds no unique wording.
- Remaining tier-3 pathology rows include the other local continuous-assessment and
  revision-bank families (including the general neoplasia, Circulatory 1, and infection
  banks) and must be ranked source-by-source before use.
- All BMS-102 microbiology question evidence remains S1 debt.
- Tutorial 103/LCS material remains excluded. No S2 content, IDs, imports, catalogue,
  readiness, claim, download, commit, or push action is authorised in this lane.

## Family 5 — general neoplasia continuous-assessment solved/unsolved pair

### Source identity, page boundary, and observed counts

This family is the next tier-3 pathology pair after Neoplasia 4. Both files were read in
full from 150-dpi page renders; native text was used only to check transcription and count
the visibly printed `Answer:` lines.

| Copy | Manifest source | Verified SHA-256 | Native pages | Role |
|---|---|---|---:|---|
| unsolved | `src_8863ae6cda793e477301` · `MCQs - College MCQs continous assessement neoplasia.pdf` | `8863ae6cda793e477301523895a1030ba3215ee78f603f2a14d8d62eb256a10b` | 14 | exact question copy; no printed keys |
| solved | `src_eda268c7a75eb1930662` · `MCQs - College MCQs continous assessement neoplasia answer.pdf` | `eda268c7a75eb1930662b241c7b167f3a3ae3b62503cc9e5c67d6cb31ab059cd` | 14 | authoritative keyed copy |

The solved copy has three blocks: A has 25 general MCQs, B has 18 clinical MCQs, and C
has 19 further clinical/general MCQs (`25 + 18 + 19 = 62`). The unsolved copy contains
the same 62 stems and option sets. Its later printed numbering is malformed: two section
headings are numbered as questions (`28` and `32`), the stage-IV item is unnumbered, and
printed Q25 is repeated. Those artefacts create 63 numeric-looking lines but not 63
questions. Page-by-page pairing establishes **62 actual unsolved prompts**, all exact
cross-copy repeats of the 62 solved prompts.

Thus the pair contains `62 + 62 = 124` observed prompt occurrences, `62` cross-copy
wording repeats, and `62` retained solved records. The solved copy visibly prints one
answer after each prompt: **62 printed keys**. No unsolved answer and no correction to a
printed answer is inferred. In particular, A01 (`dysplasia` versus `carcinoma in situ`)
prints `basement membrane invasion`, and A16 (well-differentiated gland formation without
invasion) prints `carcinoma in situ`; both are retained as source-key evidence and flagged
as questionable rather than silently repaired.

### Source-assignment ledger

`retain` means the solved occurrence is the one retained question record. A handle is a
tested-scope search label, not a proposed ID. Four scope-tight within-copy collapses are
explicit: C06→A10 (grade/differentiation), C09→A04 (anaplasia), C11→B11
(PTHrP-associated hypercalcaemia), and C15→B15 (APC/FAP). No other similar-looking
diagnosis, route, site, syndrome, or source-key proposition is collapsed.

| Ref | Observed solved prompt → visibly printed key | Assignment | Search handle |
|---|---|---|---|
| F5-A01 | Dysplasia versus carcinoma in situ → basement-membrane invasion | retain; questionable printed key preserved | `dysplasia-versus-carcinoma-in-situ-source-key` |
| F5-A02 | Lung tumour with pleomorphism, hyperchromasia and mitoses → poorly differentiated carcinoma | retain | `poorly-differentiated-lung-carcinoma-morphology` |
| F5-A03 | Invasive gland-forming tumour → adenocarcinoma | retain | `invasive-gland-forming-adenocarcinoma` |
| F5-A04 | Anaplasia → poor differentiation with high mitotic activity | retain; also C09 | `anaplasia-definition-morphology` |
| F5-A05 | Mixed epithelial/mesenchymal parotid tumour → pleomorphic adenoma | retain | `pleomorphic-adenoma-mixed-parotid-tissue` |
| F5-A06 | Hepatocellular-carcinoma marker → AFP | retain | `afp-hepatocellular-carcinoma-marker` |
| F5-A07 | Malignant mesenchymal tumour → sarcoma | retain | `sarcoma-mesenchymal-malignancy` |
| F5-A08 | Feature indicating malignancy → invasion of adjacent tissue | retain | `invasion-indicates-malignancy` |
| F5-A09 | Totipotent tumour with three germ layers → teratoma | retain | `teratoma-three-germ-layers` |
| F5-A10 | Tumour grade/aggressiveness → degree of differentiation | retain; also C06 | `tumor-grade-degree-differentiation` |
| F5-A11 | Tumour class spreading haematogenously → sarcoma | retain | `sarcoma-hematogenous-metastasis-route` |
| F5-A12 | Tumour-suppressor example → TP53 | retain | `tp53-tumor-suppressor-example` |
| F5-A13 | Malignant-transformation hallmark → loss of contact inhibition | retain | `loss-contact-inhibition-malignant-transformation` |
| F5-A14 | TNM → tumour size, nodes and metastases | retain | `tnm-staging-components` |
| F5-A15 | Paraneoplastic syndrome → systemic effects of tumour-secreted substances | retain | `paraneoplastic-syndrome-systemic-secretions` |
| F5-A16 | Well-differentiated glandular non-invasive lesion → carcinoma in situ | retain; questionable printed key preserved | `gland-forming-noninvasive-carcinoma-in-situ-source-key` |
| F5-A17 | Reflux-associated metaplasia → squamous-to-glandular change | retain | `barrett-squamous-to-glandular-metaplasia` |
| F5-A18 | NOT a dysplasia feature → basement-membrane invasion | retain | `dysplasia-excludes-basement-membrane-invasion` |
| F5-A19 | Usual carcinoma-spread route → lymphatic | retain | `carcinoma-lymphatic-metastasis-route` |
| F5-A20 | Wilms tumour → paediatric nephroblastoma | retain | `wilms-tumor-pediatric-nephroblastoma` |
| F5-A21 | Benign-tumour feature → encapsulation | retain | `benign-tumor-encapsulation` |
| F5-A22 | Tumour angiogenesis → VEGF | retain | `vegf-promotes-tumor-angiogenesis` |
| F5-A23 | Asbestos-associated malignancy → mesothelioma | retain | `asbestos-mesothelioma-risk` |
| F5-A24 | Polyp → projection from a mucosal surface | retain | `polyp-mucosal-surface-projection` |
| F5-A25 | Oncogene → mutated gene promoting uncontrolled growth | retain | `oncogene-mutated-growth-promoting-gene` |
| F5-B01 | Smoking-associated gland/mucin lung tumour → lung adenocarcinoma | retain | `lung-adenocarcinoma-glandular-mucin-morphology` |
| F5-B02 | Postmenopausal atypical glands invading myometrium → endometrial adenocarcinoma | retain | `endometrial-adenocarcinoma-glandular-myometrial-invasion` |
| F5-B03 | Lower-lip ulcer with keratin pearls → squamous-cell carcinoma | retain | `lower-lip-squamous-cell-carcinoma-keratin-pearls` |
| F5-B04 | Circumscribed biphasic breast mass → fibroadenoma | retain | `fibroadenoma-biphasic-breast-mass` |
| F5-B05 | Distal-femur sunburst lesion with malignant osteoid → osteosarcoma | retain | `osteosarcoma-sunburst-malignant-osteoid` |
| F5-B06 | Child's orbital rhabdomyoblasts/cross-striations → rhabdomyosarcoma | retain | `orbital-rhabdomyosarcoma-cross-striations` |
| F5-B07 | Flushing, diarrhoea and wheeze with intestinal chromogranin-positive tumour → carcinoid | retain | `carcinoid-syndrome-chromogranin-intestinal-tumor` |
| F5-B08 | B symptoms with Reed–Sternberg cells → Hodgkin lymphoma | retain | `hodgkin-lymphoma-reed-sternberg` |
| F5-B09 | Bone pain/infections, M spike and marrow plasma cells → multiple myeloma | retain | `multiple-myeloma-m-spike-plasma-cells` |
| F5-B10 | Smoker with weakness/ptosis and lung mass → Lambert–Eaton syndrome | retain | `lambert-eaton-lung-cancer-paraneoplastic` |
| F5-B11 | Lung mass with hypercalcaemia → PTHrP | retain; also C11 | `pthrp-lung-cancer-hypercalcemia` |
| F5-B12 | Pancreatic-cancer metastatic site → liver | retain | `pancreatic-cancer-liver-metastasis-site` |
| F5-B13 | Lytic-bone-lesion primary → breast | retain | `breast-primary-lytic-bone-metastasis` |
| F5-B14 | Lung-adenocarcinoma metastatic site → adrenal | retain | `lung-adenocarcinoma-adrenal-metastasis-site` |
| F5-B15 | APC-mutation syndrome → familial adenomatous polyposis | retain; also C15 | `apc-familial-adenomatous-polyposis` |
| F5-B16 | PTEN with breast fibroadenomas and thyroid nodules → Cowden syndrome | retain | `pten-cowden-syndrome` |
| F5-B17 | Colon tumour into muscularis propria, no nodes → T2N0M0 | retain | `colon-tumor-muscularis-propria-t2n0m0` |
| F5-B18 | ER/PR-positive, HER2-negative, node-negative breast tumour → surgery plus hormonal therapy | retain | `erpr-positive-her2-negative-breast-treatment` |
| F5-C01 | Colon cancer with multiple liver lesions → haematogenous spread through portal circulation | retain | `colon-cancer-liver-portal-hematogenous-spread` |
| F5-C02 | Ovarian cancer with ascites/peritoneal cells → transcoelomic spread | retain | `ovarian-carcinoma-transcoelomic-spread` |
| F5-C03 | Lung cancer with adrenal mass → haematogenous spread | retain | `lung-cancer-adrenal-hematogenous-route` |
| F5-C04 | Virchow node → gastric carcinoma | retain | `virchow-node-gastric-carcinoma` |
| F5-C05 | Breast-to-spine spread → Batson venous plexus | retain | `breast-spine-metastasis-batson-plexus` |
| F5-C06 | Tumour grade → differentiation | collapse to F5-A10 | `tumor-grade-degree-differentiation` |
| F5-C07 | Stage-IV lung cancer → distant spread | retain | `stage-four-lung-cancer-distant-metastasis` |
| F5-C08 | Gleason score 9 → highly aggressive prostate cancer | retain | `gleason-nine-aggressive-prostate-cancer` |
| F5-C09 | Giant hyperchromatic nuclei and no tissue resemblance → anaplastic | collapse to F5-A04 | `anaplasia-definition-morphology` |
| F5-C10 | Carcinoma in situ → malignant cells confined to epithelium | retain | `carcinoma-in-situ-confined-epithelium` |
| F5-C11 | Hypercalcaemia without bone metastasis → PTHrP | collapse to F5-B11 | `pthrp-lung-cancer-hypercalcemia` |
| F5-C12 | Lung cancer with hyponatraemia → SIADH | retain | `siadh-lung-cancer-hyponatremia` |
| F5-C13 | HCC with polycythaemia → increased erythropoietin | retain | `hcc-polycythemia-erythropoietin` |
| F5-C14 | Retinoblastoma mechanism → tumour-suppressor inactivation | retain | `retinoblastoma-tumor-suppressor-inactivation` |
| F5-C15 | Inherited APC mutation → familial adenomatous polyposis | collapse to F5-B15 | `apc-familial-adenomatous-polyposis` |
| F5-C16 | Retinoblastoma survivor with osteosarcoma → RB mutation | retain | `retinoblastoma-survivor-osteosarcoma-rb-mutation` |
| F5-C17 | H. pylori association → gastric adenocarcinoma | retain | `helicobacter-pylori-gastric-adenocarcinoma` |
| F5-C18 | HPV16 oncogenesis → E6/E7 inhibition of p53/RB | retain | `hpv16-e6-e7-p53-rb-inhibition` |
| F5-C19 | HBV/HCC mechanism → viral integration into host DNA | retain | `hbv-integration-hepatocellular-carcinoma` |

Every unsolved occurrence is assigned separately below; none contributes a key or another
retained record.

| Unsolved ref | Assignment | Unsolved ref | Assignment |
|---|---|---|---|
| F5-UA01 | exact copy repeat → F5-A01 | F5-UA02 | exact copy repeat → F5-A02 |
| F5-UA03 | exact copy repeat → F5-A03 | F5-UA04 | exact copy repeat → F5-A04 |
| F5-UA05 | exact copy repeat → F5-A05 | F5-UA06 | exact copy repeat → F5-A06 |
| F5-UA07 | exact copy repeat → F5-A07 | F5-UA08 | exact copy repeat → F5-A08 |
| F5-UA09 | exact copy repeat → F5-A09 | F5-UA10 | exact copy repeat → F5-A10 |
| F5-UA11 | exact copy repeat → F5-A11 | F5-UA12 | exact copy repeat → F5-A12 |
| F5-UA13 | exact copy repeat → F5-A13 | F5-UA14 | exact copy repeat → F5-A14 |
| F5-UA15 | exact copy repeat → F5-A15 | F5-UA16 | exact copy repeat → F5-A16 |
| F5-UA17 | exact copy repeat → F5-A17 | F5-UA18 | exact copy repeat → F5-A18 |
| F5-UA19 | exact copy repeat → F5-A19 | F5-UA20 | exact copy repeat → F5-A20 |
| F5-UA21 | exact copy repeat → F5-A21 | F5-UA22 | exact copy repeat → F5-A22 |
| F5-UA23 | exact copy repeat → F5-A23 | F5-UA24 | exact copy repeat → F5-A24 |
| F5-UA25 | exact copy repeat → F5-A25 | F5-UB01 | exact copy repeat → F5-B01 |
| F5-UB02 | exact copy repeat → F5-B02 | F5-UB03 | exact copy repeat → F5-B03 |
| F5-UB04 | exact copy repeat → F5-B04 | F5-UB05 | exact copy repeat → F5-B05 |
| F5-UB06 | exact copy repeat → F5-B06 | F5-UB07 | exact copy repeat → F5-B07 |
| F5-UB08 | exact copy repeat → F5-B08 | F5-UB09 | exact copy repeat → F5-B09 |
| F5-UB10 | exact copy repeat → F5-B10 | F5-UB11 | exact copy repeat → F5-B11 |
| F5-UB12 | exact copy repeat → F5-B12 | F5-UB13 | exact copy repeat → F5-B13 |
| F5-UB14 | exact copy repeat → F5-B14 | F5-UB15 | exact copy repeat → F5-B15 |
| F5-UB16 | exact copy repeat → F5-B16 | F5-UB17 | exact copy repeat → F5-B17 |
| F5-UB18 | exact copy repeat → F5-B18 | F5-UC01 | exact copy repeat → F5-C01 |
| F5-UC02 | exact copy repeat → F5-C02 | F5-UC03 | exact copy repeat → F5-C03 |
| F5-UC04 | exact copy repeat → F5-C04 | F5-UC05 | exact copy repeat → F5-C05 |
| F5-UC06 | exact copy repeat → F5-C06 | F5-UC07 | exact copy repeat → F5-C07 |
| F5-UC08 | exact copy repeat → F5-C08 | F5-UC09 | exact copy repeat → F5-C09 |
| F5-UC10 | exact copy repeat → F5-C10 | F5-UC11 | exact copy repeat → F5-C11 |
| F5-UC12 | exact copy repeat → F5-C12 | F5-UC13 | exact copy repeat → F5-C13 |
| F5-UC14 | exact copy repeat → F5-C14 | F5-UC15 | exact copy repeat → F5-C15 |
| F5-UC16 | exact copy repeat → F5-C16 | F5-UC17 | exact copy repeat → F5-C17 |
| F5-UC18 | exact copy repeat → F5-C18 | F5-UC19 | exact copy repeat → F5-C19 |

Assignment arithmetic is `62 solved + 62 unsolved = 124` observed occurrences. The 62
unsolved occurrences are all exact copy repeats, leaving 62 retained records. The four
explicit tested-scope collapses yield `62 - 4 = 58` source-distinct handles.

### Search-before-mint register and prior-BMS-102 adjudication

Each of the 58 assignment handles received four required searches (distinctive wording,
alias, synonym, and mechanism/structure): **232 required searches**. Follow-ups inspected
the full pending bodies for p53/tumour suppressors, multiple myeloma, breast skeletal
metastasis, Barrett metaplasia, carcinoid, viral oncogenesis, HPV and HBV. Scope included
live state, all pending import roots, and Families 1–4 of this ledger. Disease-adjacent,
generic-parent, anatomical-route-only, and multi-record composites were not credited as
same-scope matches.

| Handle · retained refs | Four required queries | External disposition and exact-scope decision | Prior BMS-102 relation |
|---|---|---|---|
| `dysplasia-versus-carcinoma-in-situ-source-key` · A01 | `dysplasia carcinoma in situ basement membrane invasion`; `dysplasia versus CIS`; `intraepithelial neoplasia distinction`; `basement membrane neoplastic progression` | new; no record carries this source-key proposition; key conflict preserved | delta |
| `poorly-differentiated-lung-carcinoma-morphology` · A02 | `poorly differentiated lung carcinoma pleomorphism`; `lung mass hyperchromatic frequent mitoses`; `anaplastic lung tumor morphology`; `pleomorphic carcinoma differentiation` | new; live melanoma morphology is wrong organ/scope | delta |
| `invasive-gland-forming-adenocarcinoma` · A03 | `invasive gland forming adenocarcinoma`; `glandular malignant tumor invasion`; `adenocarcinoma morphology`; `well differentiated glands surrounding tissue` | new | delta |
| `anaplasia-definition-morphology` · A04,C09 | `anaplasia definition`; `anaplastic tumor giant nuclei`; `loss of differentiation neoplasm`; `poor differentiation high mitotic activity` | new | delta; narrower than Family-1 composite core-definition prompt |
| `pleomorphic-adenoma-mixed-parotid-tissue` · A05 | `pleomorphic adenoma parotid mixed tissue`; `mixed tumor salivary gland`; `epithelial mesenchymal parotid mass`; `benign mixed salivary neoplasm` | new; parotid histology hits do not identify this tumour | delta |
| `afp-hepatocellular-carcinoma-marker` · A06 | `AFP hepatocellular carcinoma marker`; `alpha fetoprotein HCC`; `liver cancer tumor marker`; `hepatoma fetal protein` | new externally | collapse to Family-4 `afp-hepatocellular-carcinoma` / Family-1 AFP handle |
| `sarcoma-mesenchymal-malignancy` · A07 | `sarcoma mesenchymal malignant tumor`; `connective tissue malignancy nomenclature`; `malignant mesenchymal neoplasm`; `carcinoma versus sarcoma origin` | new externally | collapse to Family-1 `connective-tissue-malignancy-nomenclature` |
| `invasion-indicates-malignancy` · A08 | `invasion indicates malignancy`; `adjacent tissue invasion tumor`; `malignant versus benign invasion`; `infiltrative neoplasm feature` | new externally | collapse to Family-4 `malignant-versus-benign-invasion` |
| `teratoma-three-germ-layers` · A09 | `teratoma three germ layers`; `totipotent germ cell tumor`; `ectoderm mesoderm endoderm neoplasm`; `germ cell mixed tissues` | new; pending embryology question is not a same-scope concept record | delta |
| `tumor-grade-degree-differentiation` · A10,C06 | `tumor grade degree differentiation`; `histologic grading aggressiveness`; `poor differentiation tumor grade`; `grading versus staging neoplasm` | new externally | collapse to Family-1 `tumour-grade-basis` |
| `sarcoma-hematogenous-metastasis-route` · A11 | `sarcoma hematogenous metastasis`; `mesenchymal tumor blood spread`; `sarcoma route of spread`; `hematogenous dissemination neoplasm` | new | delta; narrower than Family-1 general spread-routes prompt |
| `tp53-tumor-suppressor-example` · A12 | `TP53 tumor suppressor gene`; `p53 anti-oncogene example`; `tumor suppressor versus oncogene`; `p53 growth restraint` | pending `ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES`; it explicitly names p53 as a tumour-suppressor/anti-oncogene example | delta; example differs from prior function/mechanism handles |
| `loss-contact-inhibition-malignant-transformation` · A13 | `loss contact inhibition malignant transformation`; `cancer hallmark contact inhibition`; `tumor cells density dependent inhibition`; `neoplastic uncontrolled growth contact` | new | delta; narrower than Family-1 alterations outline |
| `tnm-staging-components` · A14 | `TNM tumor size nodes metastasis`; `TNM staging components`; `tumor node metastasis classification`; `cancer anatomic stage system` | new | delta |
| `paraneoplastic-syndrome-systemic-secretions` · A15 | `paraneoplastic syndrome tumor secretions`; `remote systemic effects cancer`; `ectopic hormone neoplasm`; `tumor secreted substances syndrome` | new externally | collapse to Family-1 `paraneoplastic-syndrome-definition` |
| `gland-forming-noninvasive-carcinoma-in-situ-source-key` · A16 | `gland forming noninvasive carcinoma in situ`; `well differentiated glandular tumor lacks invasion`; `adenoma versus carcinoma in situ`; `noninvasive glandular neoplasm` | new; no record carries this questionable printed-key scope | delta |
| `barrett-squamous-to-glandular-metaplasia` · A17 | `Barrett squamous to glandular metaplasia`; `chronic acid reflux metaplasia`; `esophageal intestinal metaplasia`; `GERD columnar epithelium` | new; pending `CON-FND-5AD09BF9FC2420` defines metaplasia generally but not reflux/Barrett change | delta |
| `dysplasia-excludes-basement-membrane-invasion` · A18 | `dysplasia basement membrane invasion exception`; `dysplasia characteristics pleomorphism polarity mitosis`; `preinvasive dysplasia morphology`; `dysplasia versus invasive carcinoma` | new | delta |
| `carcinoma-lymphatic-metastasis-route` · A19 | `carcinoma lymphatic metastasis route`; `epithelial malignancy lymphatic spread`; `carcinoma common dissemination`; `lymph node spread cancer` | new; anatomy drainage records are not the neoplastic proposition | delta; narrower than Family-1 general route classification |
| `wilms-tumor-pediatric-nephroblastoma` · A20 | `Wilms tumor pediatric nephroblastoma`; `nephroblastoma childhood renal tumor`; `Wilms neoplasm classification`; `embryonal kidney malignancy` | new | delta |
| `benign-tumor-encapsulation` · A21 | `benign tumor encapsulation`; `well circumscribed neoplasm`; `benign versus malignant border`; `tumor capsule feature` | new externally | collapse to Family-1 `benign-tumour-characteristics` |
| `vegf-promotes-tumor-angiogenesis` · A22 | `VEGF promotes tumor angiogenesis`; `vascular endothelial growth factor cancer`; `neoplastic blood vessel formation`; `angiogenic factor secretion tumor` | new externally; platelet-VEGF hits are not tumour angiogenesis | collapse to Family-4 `tumor-angiogenic-factor-process` |
| `asbestos-mesothelioma-risk` · A23 | `asbestos mesothelioma risk`; `occupational asbestos pleural tumor`; `mesothelioma carcinogen`; `asbestos associated malignancy` | new | delta |
| `polyp-mucosal-surface-projection` · A24 | `polyp mucosal surface projection`; `polyp definition`; `mucosal protruding mass`; `pedunculated sessile lesion` | new | delta |
| `oncogene-mutated-growth-promoting-gene` · A25 | `oncogene mutated growth promoting gene`; `oncogene definition`; `proto-oncogene activation cancer`; `dominant cancer gene uncontrolled growth` | new; viral-oncogene and tumour-suppressor records do not define a cellular oncogene | delta |
| `lung-adenocarcinoma-glandular-mucin-morphology` · B01 | `lung adenocarcinoma glandular mucin`; `pulmonary gland forming carcinoma`; `mucin producing lung tumor`; `adenocarcinoma histology lung` | new | delta |
| `endometrial-adenocarcinoma-glandular-myometrial-invasion` · B02 | `endometrial adenocarcinoma myometrial invasion`; `postmenopausal bleeding atypical glands`; `uterine glandular malignancy`; `endometrial cancer histology` | new | delta |
| `lower-lip-squamous-cell-carcinoma-keratin-pearls` · B03 | `lower lip squamous carcinoma keratin pearls`; `SCC nonhealing lip ulcer`; `keratinizing epithelial malignancy`; `oral squamous cell carcinoma morphology` | new; live `CON-DER-B279F9E965B29A` is cutaneous SCC without the lip/keratin-pearl pattern | delta |
| `fibroadenoma-biphasic-breast-mass` · B04 | `fibroadenoma glandular stromal breast mass`; `biphasic benign breast tumor`; `young woman well circumscribed breast mass`; `fibroepithelial breast neoplasm` | new | delta |
| `osteosarcoma-sunburst-malignant-osteoid` · B05 | `osteosarcoma sunburst malignant osteoid`; `distal femur osteoid tumor`; `bone sarcoma radiology histology`; `osteogenic sarcoma diagnosis` | new | delta |
| `orbital-rhabdomyosarcoma-cross-striations` · B06 | `orbital rhabdomyosarcoma cross striations`; `child orbit rhabdomyoblasts`; `skeletal muscle malignant tumor`; `pediatric soft tissue sarcoma` | new | delta |
| `carcinoid-syndrome-chromogranin-intestinal-tumor` · B07 | `carcinoid syndrome chromogranin intestinal tumor`; `flushing diarrhea wheezing neuroendocrine`; `small bowel carcinoid`; `neuroendocrine tumor nests` | new; pending `CON-GIT-4952149F99782D` covers serotonin/5-HIAA/pellagra, not this clinical-morphologic diagnosis | delta |
| `hodgkin-lymphoma-reed-sternberg` · B08 | `Hodgkin lymphoma Reed Sternberg`; `painless lymphadenopathy B symptoms`; `Reed-Sternberg cell diagnosis`; `classical Hodgkin disease` | new | delta |
| `multiple-myeloma-m-spike-plasma-cells` · B09 | `multiple myeloma M spike plasma cells`; `bone pain recurrent infection monoclonal protein`; `plasma cell malignancy diagnosis`; `serum electrophoresis M protein` | pending `ART-108-PAT-AMYLOIDOSIS`; it directly identifies myeloma as a marrow plasma-cell tumour producing a monoclonal immunoglobulin/light chain | delta |
| `lambert-eaton-lung-cancer-paraneoplastic` · B10 | `Lambert Eaton lung cancer paraneoplastic`; `smoker weakness ptosis lung mass`; `presynaptic calcium channel syndrome tumor`; `small cell lung neuromuscular syndrome` | new; general neuromuscular-transmission records do not identify the syndrome/cancer link | delta |
| `pthrp-lung-cancer-hypercalcemia` · B11,C11 | `PTHrP lung cancer hypercalcemia`; `paraneoplastic hypercalcemia no bone metastasis`; `PTH related peptide squamous lung`; `malignancy calcium humoral syndrome` | new; pending calcification material says ectopic PTH generally, not lung-cancer PTHrP | delta |
| `pancreatic-cancer-liver-metastasis-site` · B12 | `pancreatic cancer liver metastasis`; `pancreatic mass jaundice secondary site`; `pancreatic adenocarcinoma spread liver`; `pancreas metastatic pattern` | new | delta |
| `breast-primary-lytic-bone-metastasis` · B13 | `breast cancer lytic bone metastasis`; `lytic lesion hypercalcemia primary breast`; `breast carcinoma skeletal spread`; `bone metastasis primary malignancy` | pending `CON-FND-87392C49DB246C`; it directly names diffuse skeletal metastasis from breast cancer as a cause of destructive bone loss | delta |
| `lung-adenocarcinoma-adrenal-metastasis-site` · B14 | `lung adenocarcinoma adrenal metastasis`; `lung cancer common adrenal site`; `pulmonary carcinoma adrenal mass`; `adrenal secondary lung primary` | new | delta |
| `apc-familial-adenomatous-polyposis` · B15,C15 | `APC familial adenomatous polyposis`; `inherited APC mutation FAP`; `colorectal polyposis syndrome`; `APC tumor suppressor colon` | new externally | collapse to Family-4 `fap-apc-cell-cycle-control` |
| `pten-cowden-syndrome` · B16 | `PTEN Cowden syndrome`; `breast fibroadenomas thyroid nodules PTEN`; `hamartoma tumor syndrome`; `Cowden cancer predisposition` | new | delta |
| `colon-tumor-muscularis-propria-t2n0m0` · B17 | `colon tumor muscularis propria T2N0M0`; `colorectal TNM muscle invasion`; `T2 colon cancer no nodes`; `colon carcinoma stage depth` | new | delta |
| `erpr-positive-her2-negative-breast-treatment` · B18 | `ER PR positive HER2 negative breast treatment`; `node negative hormone receptor breast cancer surgery`; `breast cancer hormonal therapy selection`; `luminal breast tumor management` | new; live receptor-prevalence record does not state treatment | delta |
| `colon-cancer-liver-portal-hematogenous-spread` · C01 | `colon cancer liver portal hematogenous spread`; `colorectal metastasis portal vein`; `colon carcinoma hepatic metastases route`; `portal drainage cancer dissemination` | new | delta |
| `ovarian-carcinoma-transcoelomic-spread` · C02 | `ovarian carcinoma transcoelomic spread`; `malignant ascites peritoneal seeding`; `ovarian cancer implantation metastasis`; `peritoneal fluid tumor cells` | new | delta |
| `lung-cancer-adrenal-hematogenous-route` · C03 | `lung cancer adrenal hematogenous route`; `pulmonary carcinoma blood spread adrenal`; `right adrenal metastasis pathway`; `lung tumor systemic dissemination` | new; site-only B14 is a different proposition | delta |
| `virchow-node-gastric-carcinoma` · C04 | `Virchow node gastric carcinoma`; `left supraclavicular node stomach cancer`; `Troisier sign malignancy`; `gastric lymphatic metastasis` | new; anatomy lymphatic records do not state this diagnostic link | delta |
| `breast-spine-metastasis-batson-plexus` · C05 | `breast spine metastasis Batson plexus`; `vertebral metastasis venous plexus`; `breast cancer vertebral collapse route`; `valveless paravertebral veins tumor` | new | delta |
| `stage-four-lung-cancer-distant-metastasis` · C07 | `stage IV lung cancer distant metastasis`; `lung carcinoma stage four meaning`; `metastatic lung cancer stage`; `cancer spread beyond lung` | new | delta |
| `gleason-nine-aggressive-prostate-cancer` · C08 | `Gleason score 9 aggressive prostate cancer`; `high grade prostate tumor`; `Gleason grading prognosis`; `prostate adenocarcinoma score nine` | new | delta |
| `carcinoma-in-situ-confined-epithelium` · C10 | `carcinoma in situ confined epithelium`; `CIS intact basement membrane`; `preinvasive epithelial malignancy`; `full thickness atypia no invasion` | new | delta; narrower than Family-1 composite definitions |
| `siadh-lung-cancer-hyponatremia` · C12 | `SIADH lung cancer hyponatremia`; `paraneoplastic ADH pulmonary tumor`; `small cell carcinoma low sodium`; `euvolemic hyponatremia malignancy` | new | delta |
| `hcc-polycythemia-erythropoietin` · C13 | `hepatocellular carcinoma polycythemia erythropoietin`; `HCC paraneoplastic EPO`; `liver cancer erythrocytosis`; `tumor hormone red cell increase` | new; pending `CON-HEM-5F0CEC52166316` defines secondary EPO-driven polycythaemia but does not link HCC to EPO | delta |
| `retinoblastoma-tumor-suppressor-inactivation` · C14 | `retinoblastoma tumor suppressor inactivation`; `RB1 two hit hypothesis`; `retinal tumor anti-oncogene loss`; `retinoblastoma genetic mechanism` | new; generic tumour-suppressor and viral-inactivation records do not state RB1/retinoblastoma | delta |
| `retinoblastoma-survivor-osteosarcoma-rb-mutation` · C16 | `retinoblastoma survivor osteosarcoma RB mutation`; `RB1 second primary bone cancer`; `hereditary retinoblastoma osteogenic sarcoma`; `childhood retinal tumor cancer risk` | new | delta |
| `helicobacter-pylori-gastric-adenocarcinoma` · C17 | `Helicobacter pylori gastric adenocarcinoma`; `H pylori stomach cancer risk`; `chronic gastritis malignancy`; `bacterial carcinogenesis gastric` | new | delta |
| `hpv16-e6-e7-p53-rb-inhibition` · C18 | `HPV16 E6 E7 p53 RB inhibition`; `cervical oncogenesis mechanism`; `papillomavirus tumor suppressor degradation`; `viral oncoproteins cervical cancer` | new; pending `CON-INF-2AFE43527FBBCC` is generic viral suppressor inactivation and does not name HPV16/E6/E7/p53/RB | delta |
| `hbv-integration-hepatocellular-carcinoma` · C19 | `HBV integration hepatocellular carcinoma`; `hepatitis B host DNA oncogenesis`; `chronic HBV liver cancer mechanism`; `viral integration hepatocarcinogenesis` | new; retroviral-integrase records are wrong virus/mechanism | delta; mechanism is narrower than Family-4 HBV/HCC association |

### Family-5 checkpoint and cumulative BMS-102 pathology

| Measure | Family 5 | Cumulative after Family 5 |
|---|---:|---:|
| Raw observed prompt occurrences | 124 | 449 |
| Printed keys | 62 | 163 |
| Retained question records after wording dedupe | 62 | 299 |
| Source-distinct tested concepts | 58 | — |
| External live / pending / no same-scope match | 0 / 3 / 55 | family-local disposition |
| Family-5 handles already represented in Families 1–4 | 8 | subtract from Family-5 concept addition |
| Cross-family concept delta | 50 | `58 - 8 = 50` |
| **Cumulative distinct tested concepts** | **+50** | **237** |

External arithmetic is `0 + 3 + 55 = 58`. The three pending handles are p53 as a
tumour-suppressor example, multiple myeloma as a monoclonal plasma-cell tumour, and breast
carcinoma as a destructive skeletal-metastasis primary. The eight prior-BMS-102 overlaps
are AFP/HCC, sarcoma nomenclature, invasion as malignancy, grade/differentiation,
paraneoplastic-syndrome definition, benign-tumour characteristics/encapsulation,
VEGF/tumour angiogenesis, and APC/FAP. External and prior-family dispositions are separate
dimensions. Cumulative arithmetic is `325 + 124 = 449` observed prompts,
`101 + 62 = 163` printed keys, `237 + 62 = 299` retained records, and
`187 + (58 - 8) = 237` distinct concepts.

### Exact remaining debt after Family 5

- The general neoplasia pair is fully bounded: all 28 native pages, 124 observed prompt
  occurrences, 62 exact cross-copy repeats, 62 retained keyed questions and 58 tested
  handles have been assigned.
- The next evidence-ranked local pathology family is the tier-3 `Circulatory 1`
  solved/unsolved continuous-assessment pair; it must be rendered and adjudicated
  source-first before any lower-ranked pathology bank.
- Remaining pathology infection/revision-bank families and all BMS-102 microbiology
  assessment evidence remain S1 debt.
- Tutorial 103/LCS material remains excluded. No S2 content, IDs, imports, catalogue,
  readiness, claim, download, commit, or push action is authorised in this lane.

## Family 6 — Circulatory 1 continuous-assessment solved/unsolved pair

### Source identity, page boundary, and observed counts

This is the next evidence-ranked tier-3 pathology pair after the general-neoplasia pair.
Both local files were read in full from 150-dpi renders. The DOCX was rendered through a
temporary PDF solely to establish its four-page visual boundary; the source files and the
repository corpus were not changed.

| Copy | Manifest source | Verified SHA-256 | Rendered/native pages | Role |
|---|---|---|---:|---|
| unsolved | `src_16f3e72b07c1848bea17` · `MCQs - College MCQs continous self assessement circulatory 1.docx` | `16f3e72b07c1848bea1715628719383222b5b2510cc65775423b87dc356001a8` | 4 rendered | 40-prompt unkeyed question copy |
| solved | `src_ece98ba3324ee657c538` · `MCQs - College MCQs continous self assessement circulatory 1 answers.pdf` | `ece98ba3324ee657c53854561eb805b59feaf1dcc23eb499382f97adcf144c39` | 9 native | malformed partial keyed copy plus answer section |

The unsolved DOCX has 40 prompts: a 20-prompt general block (`10 MCQ + 5 true/false +
5 short-answer`) and a 20-prompt clinical block (`10 MCQ + 5 true/false + 5
short/case`). It prints no answer. The solved PDF is not a simple keyed twin. It contains:

- seven initially keyed prompts (`S-K01..S-K07`);
- the same seven prompts repeated in a malformed numbered block (`S-R01..S-R07`),
  where only `S-R06` repeats an `Answer:` line;
- an unkeyed exact copy of all 20 general DOCX prompts;
- 19 printed prompts from the clinical DOCX block: 18 exact copies, plus clinical Q7
  changed from the DOCX's anatomically questionable `lower limb` after mastectomy to
  `upper limb`; clinical MCQ10 is absent from the solved question pages; and
- a later 20-answer clinical section, including a visibly printed answer for that absent
  clinical MCQ10.

Therefore observed prompt arithmetic is `40 + 7 + 7 + 20 + 19 = 93`. Exact wording
repeats are `7 malformed-bank + 20 general-copy + 18 clinical-copy = 45`, leaving
`93 - 45 = 48` retained wording records. Printed-key arithmetic is `7 initial Answer:
lines + 1 repeated Answer: line + 20 clinical answers = 28` key occurrences. Those 28
occurrences cover 27 retained prompt scopes because the key for `S-K06` is printed twice.
No key is inferred for an unkeyed prompt, and no questionable source wording or key is
silently repaired.

### Source-assignment ledger

`retain` marks the wording record kept after exact-copy dedupe. A handle is a tested-scope
search label, not a proposed ID. Seven scope-tight collapse groups reduce the 48 retained
wordings by nine: `SK01+UG02`, `SK04+UG04`, `SK05+UG01`, `SK06+UG05+UC14`,
`SK07+UG08+UC03`, `UC07+SC07`, and `UG11+UC08`. Broad comparisons are not collapsed
into single-disease examples, and disease-specific mechanisms are not collapsed into a
generic parent.

| Ref | Observed prompt → visibly printed key, where present | Assignment | Search handle |
|---|---|---|---|
| F6-SK01 | NOT a cause of generalized oedema → venous obstruction | retain; also UG02 | `generalized-edema-causes-localized-venous-obstruction` |
| F6-SK02 | Primary mechanism of inflammatory oedema → increased vascular permeability | retain | `inflammatory-edema-increased-permeability` |
| F6-SK03 | Condition commonly associated with pitting oedema → congestive heart failure | retain | `pitting-edema-congestive-heart-failure` |
| F6-SK04 | Most likely non-pitting oedema cause → filariasis | retain; also UG04 | `lymphatic-obstruction-nonpitting-edema` |
| F6-SK05 | Hyperaemia versus congestion → active versus passive | retain; also UG01 | `hyperemia-versus-congestion-active-passive` |
| F6-SK06 | Chronic passive liver congestion → nutmeg appearance | retain; also UG05, UC14; key also printed at SR06 | `chronic-passive-liver-congestion-nutmeg-appearance` |
| F6-SK07 | Mitral-stenosis pulmonary congestion microscopy → heart-failure cells | retain; also UG08, UC03 | `pulmonary-congestion-heart-failure-cells` |
| F6-UG01 | Main difference between hyperaemia and congestion | retain; collapse to SK05 | `hyperemia-versus-congestion-active-passive` |
| F6-UG02 | Cause of generalized oedema | retain; collapse to SK01 | `generalized-edema-causes-localized-venous-obstruction` |
| F6-UG03 | Pulmonary oedema effects: hypoxia, infection risk and impaired gas exchange | retain; unkeyed | `pulmonary-edema-complications` |
| F6-UG04 | Oedema associated with lymphatic obstruction | retain; collapse to SK04 | `lymphatic-obstruction-nonpitting-edema` |
| F6-UG05 | Classic chronic passive liver-congestion feature | retain; collapse to SK06 | `chronic-passive-liver-congestion-nutmeg-appearance` |
| F6-UG06 | Cause of cardiogenic shock | retain; unkeyed | `myocardial-infarction-cardiogenic-shock` |
| F6-UG07 | Haemorrhage within peritoneal cavity term | retain; unkeyed | `hemoperitoneum-definition` |
| F6-UG08 | Condition with heart-failure cells | retain; collapse to SK07 | `pulmonary-congestion-heart-failure-cells` |
| F6-UG09 | Primary mediator of anaphylactic shock | retain; unkeyed | `histamine-anaphylactic-shock-mediator` |
| F6-UG10 | NOT a septic-shock feature | retain; unkeyed | `septic-shock-features-bradycardia-exception` |
| F6-UG11 | Hypovolaemic shock from blood/plasma loss | retain; also UC08 | `hypovolemic-shock-blood-loss` |
| F6-UG12 | Petechial haemorrhage larger than ecchymosis | retain; unkeyed | `petechiae-versus-ecchymosis-size` |
| F6-UG13 | Neurogenic shock from spinal injury/severe pain and lost vascular tone | retain; unkeyed | `neurogenic-shock-loss-vascular-tone` |
| F6-UG14 | Thrombus as clot formed and remaining inside vessel | retain; unkeyed | `thrombus-intravascular-remains-definition` |
| F6-UG15 | Haemostasis and homeostasis have the same meaning | retain; unkeyed | `hemostasis-versus-homeostasis-distinction` |
| F6-UG16 | Differences between pitting and non-pitting oedema | retain; unkeyed | `pitting-versus-nonpitting-edema` |
| F6-UG17 | Three stages of shock progression and characteristics | retain; unkeyed | `shock-progression-three-stages` |
| F6-UG18 | Nutmeg-liver macroscopic and microscopic features | retain; unkeyed | `nutmeg-liver-macro-microscopic-features` |
| F6-UG19 | Four haemorrhage types classified by location | retain; unkeyed | `hemorrhage-location-classification` |
| F6-UG20 | Major embolism causes and progression to infarction | retain; unkeyed | `embolism-causes-infarction-mechanism` |
| F6-UC01 | CHF, crackles and leg oedema → increased capillary hydrostatic pressure | retain; later printed clinical key | `heart-failure-edema-hydrostatic-pressure` |
| F6-UC02 | Painful unilateral leg swelling after knee replacement → DVT | retain; later printed clinical key | `postoperative-dvt-diagnosis` |
| F6-UC03 | Mitral stenosis and pulmonary congestion → haemosiderin alveolar macrophages | retain; later printed key; collapse to SK07 | `pulmonary-congestion-heart-failure-cells` |
| F6-UC04 | Nephrotic periorbital oedema → reduced plasma oncotic pressure | retain; later printed clinical key | `nephrotic-edema-reduced-oncotic-pressure` |
| F6-UC05 | Swollen calf, hypoxia, haemoptysis and chest pain → pulmonary embolism | retain; later printed clinical key | `dvt-pulmonary-embolism-clinical-pathway` |
| F6-UC06 | Atherosclerotic patient with ischaemic stroke → thromboembolism | retain; later printed clinical key | `thromboembolic-ischemic-stroke` |
| F6-UC07 | Postmastectomy swollen erythematous **lower limb** | retain unkeyed wording; questionable source anatomy preserved; also SC07 | `postmastectomy-lymphedema-lymphatic-obstruction` |
| F6-UC08 | Trauma, 70/40, tachycardia, cold clammy skin → hypovolaemic shock | retain; later printed clinical key; collapse with UG11 | `hypovolemic-shock-blood-loss` |
| F6-UC09 | Cirrhotic ascites → raised hydrostatic and reduced oncotic pressure | retain; later printed clinical key | `cirrhotic-ascites-hydrostatic-oncotic-pressure` |
| F6-UC10 | Bee-sting hypotension and bronchospasm → epinephrine | retain; prompt occurs only in DOCX; answer visibly printed in solved answer section | `anaphylactic-shock-epinephrine-treatment` |
| F6-UC11 | DVT plus PFO permits paradoxical embolism → true | retain; later printed clinical key | `paradoxical-embolism-pfo` |
| F6-UC12 | Right failure causes pulmonary and left failure systemic congestion → false | retain; later printed clinical key | `heart-failure-sided-congestion-reversal` |
| F6-UC13 | IgE anaphylaxis causes systemic vasodilatation/permeability → true | retain; later printed clinical key | `anaphylactic-shock-ige-vasodilation-permeability` |
| F6-UC14 | Chronic liver venous congestion produces nutmeg appearance → true | retain; later printed key; collapse to SK06 | `chronic-passive-liver-congestion-nutmeg-appearance` |
| F6-UC15 | Early septic shock has warm extremities from `compensatory vasodilation` → true | retain; questionable printed rationale preserved | `early-septic-shock-warm-extremities` |
| F6-UC16 | Sudden painful pale pulseless leg → acute limb ischaemia from embolus/thrombus; heparin, imaging and revascularisation | retain; later printed clinical key | `acute-limb-ischemia-embolism-management` |
| F6-UC17 | AF with pain out of proportion → mesenteric embolic ischaemia; CT angiography | retain; later printed clinical key | `atrial-fibrillation-mesenteric-ischemia` |
| F6-UC18 | Chronic leg swelling and ankle pigmentation → venous insufficiency from valve failure | retain; later printed clinical key | `chronic-venous-insufficiency-valve-failure` |
| F6-UC19 | Dyspnoea after long-haul flight → DVT-derived PE from immobility/stasis | retain; later printed clinical key | `long-haul-flight-dvt-pulmonary-embolism` |
| F6-UC20 | Refractory haemorrhagic shock with coagulopathy → DIC with microthrombi/factor consumption | retain; later printed clinical key | `dic-hemorrhagic-shock-consumption-coagulopathy` |
| F6-SC07 | Postmastectomy swollen erythematous **upper limb** → lymphatic obstruction | retain as changed wording with later printed clinical key; collapse to UC07 | `postmastectomy-lymphedema-lymphatic-obstruction` |

Every excluded occurrence remains assigned below. `S-R06` is both an exact prompt repeat
and the one repeat carrying a second printed key occurrence.

| Repeat block | Assignment |
|---|---|
| F6-SR01..SR07 | seven exact repeats → SK01..SK07; only SR06 repeats its `Answer:` line |
| F6-SG01..SG20 | 20 exact repeats of DOCX general prompts → UG01..UG20; no printed keys |
| F6-SC01..SC06, SC08..SC09, SC11..SC20 | 18 exact repeats → UC01..UC06, UC08..UC09, UC11..UC20; no inline keys |

Assignment is one-to-one: `48 retained + 45 exact repeats = 93` observed occurrences.
The seven explicit collapse groups reduce 48 retained wordings by nine, yielding
**39 source-distinct tested handles**.

### Search-before-mint register and prior-BMS-102 adjudication

Each of the 39 handles received four required searches (distinctive wording, alias,
synonym, and mechanism/structure): **156 required searches** across live state, all pending
import roots, and Families 1–5 of this ledger. Follow-ups inspected full pending records
for oedema, post-MI shock, DVT, atrial septal defect/PFO, heart-failure cells, anaphylaxis,
right/left heart failure, peripheral arterial disease, chronic venous insufficiency, septic
shock and DIC. A disease-adjacent record, generic parent, multi-record inference, or record
that omits a tested qualifier is not credited as same scope.

| Handle · retained refs | Four required queries | External disposition and exact-scope decision | Prior BMS-102 relation |
|---|---|---|---|
| `hyperemia-versus-congestion-active-passive` · SK05,UG01 | `hyperemia congestion active passive`; `hyperaemia versus congestion`; `active arterial flow passive venous stasis`; `congestion tissue hypoxia` | new; acute-heart-failure congestion is not this comparison | collapse to F2 `hyperaemia-versus-congestion` |
| `generalized-edema-causes-localized-venous-obstruction` · SK01,UG02 | `generalized edema causes venous obstruction`; `generalized versus localized oedema`; `cardiac failure generalized edema`; `venous obstruction localized edema` | pending `ART-CVS-OEDEMA`; it explicitly separates bilateral/generalised causes from unilateral local venous obstruction | collapse to F2 `generalized-oedema-patterns` |
| `pulmonary-edema-complications` · UG03 | `pulmonary edema hypoxia gas exchange infection`; `pulmonary oedema complications`; `alveolar fluid impaired oxygenation`; `lung edema clinical effects` | new; acute-heart-failure records support hypoxia but not the full hypoxia/infection/gas-exchange set | delta |
| `lymphatic-obstruction-nonpitting-edema` · SK04,UG04 | `lymphatic obstruction non-pitting edema`; `filariasis nonpitting oedema`; `lymphedema pitting pattern`; `protein rich lymphatic edema` | pending `ART-CVS-OEDEMA`; it states lymphatic obstruction including filariasis and non-pitting lymphoedema | collapse to F2 `pitting-oedema-patterns` |
| `chronic-passive-liver-congestion-nutmeg-appearance` · SK06,UG05,UC14 | `chronic passive congestion nutmeg liver`; `nutmeg liver venous congestion`; `centrilobular hepatic congestion`; `congestive hepatopathy morphology` | new | delta |
| `myocardial-infarction-cardiogenic-shock` · UG06 | `myocardial infarction cardiogenic shock`; `cardiogenic shock pump failure`; `acute MI shock cause`; `ventricular dysfunction hypotension` | pending `ART-CVS-POST-MI-COMPLICATIONS`; it directly links large myocardial loss/pump failure to cardiogenic shock | delta |
| `hemoperitoneum-definition` · UG07 | `hemoperitoneum definition`; `haemoperitoneum blood peritoneal cavity`; `intraperitoneal hemorrhage term`; `blood in abdomen pathology` | new | collapse to F2 `haemoperitoneum-definition` |
| `pulmonary-congestion-heart-failure-cells` · SK07,UG08,UC03 | `pulmonary congestion heart failure cells`; `hemosiderin laden alveolar macrophages`; `mitral stenosis siderophages`; `chronic lung congestion macrophages` | pending `ART-108-PAT-PATHOLOGICAL-PIGMENTS` and `CON-RES-D8B1BE3C6CFABD`; both directly tie chronic pulmonary congestion to haemosiderin-laden alveolar macrophages | delta |
| `histamine-anaphylactic-shock-mediator` · UG09 | `histamine anaphylactic shock mediator`; `anaphylaxis primary mediator`; `mast cell histamine hypotension`; `IgE shock vasoactive amine` | pending `CON-FND-7D406E91EA3BF2` and the connective-tissue-cell article; allergen-bound IgE releases mast-cell histamine causing anaphylactic hypotension | delta |
| `septic-shock-features-bradycardia-exception` · UG10 | `septic shock bradycardia exception`; `septic shock features hypotension warm extremities`; `early sepsis tachycardia vasodilation`; `multi organ dysfunction septic shock` | new; `ART-INF-EXOTOXIN-ENDOTOXIN-SHOCK` has hypotension/multiorgan dysfunction but not the full feature set or bradycardia exception | delta |
| `hypovolemic-shock-blood-loss` · UG11,UC08 | `hypovolemic shock blood plasma loss`; `hemorrhage volume depletion shock`; `trauma cold clammy hypotension`; `low circulating volume shock` | new | delta |
| `petechiae-versus-ecchymosis-size` · UG12 | `petechiae ecchymosis size`; `petechial hemorrhage smaller ecchymosis`; `purpura size classification`; `skin hemorrhage diameter` | new | collapse to F2 `petechiae-size-classification` |
| `neurogenic-shock-loss-vascular-tone` · UG13 | `neurogenic shock loss vascular tone`; `spinal cord injury shock vasodilation`; `severe pain neurogenic shock`; `sympathetic tone hypotension` | new | delta |
| `thrombus-intravascular-remains-definition` · UG14 | `thrombus clot inside vessel remains`; `thrombus definition intravascular clot`; `antemortem adherent blood clot`; `thrombosis during life vessel` | new; platelet/haemostasis material does not carry the full definition | collapse to F2 `thrombosis-definition-risk` |
| `hemostasis-versus-homeostasis-distinction` · UG15 | `hemostasis homeostasis distinction`; `haemostasis versus homeostasis`; `stop bleeding versus physiologic equilibrium`; `medical terminology hemostasis` | new | delta; no prior single handle tests the terminology distinction |
| `pitting-versus-nonpitting-edema` · UG16 | `pitting versus non-pitting edema`; `pitting oedema clinical comparison`; `dependent indentation lymphatic edema`; `edema physical sign difference` | pending `ART-CVS-OEDEMA`; its examination section directly distinguishes mobile pitting fluid from non-pitting lymphoedema/myxoedema | collapse to F2 `pitting-oedema-patterns` |
| `shock-progression-three-stages` · UG17 | `shock progression three stages`; `nonprogressive progressive irreversible shock`; `compensated decompensated shock`; `shock stage characteristics` | new | delta |
| `nutmeg-liver-macro-microscopic-features` · UG18 | `nutmeg liver macroscopic microscopic features`; `centrilobular congestion necrosis liver`; `red brown mottled congestive liver`; `chronic passive hepatic congestion histology` | new | delta; broader morphology than the appearance-only handle |
| `hemorrhage-location-classification` · UG19 | `hemorrhage classified by location`; `hemothorax hemopericardium hemoperitoneum hemarthrosis`; `bleeding body cavity types`; `localized hemorrhage terminology` | new | delta; the earlier single-term handle is not the four-term classification |
| `embolism-causes-infarction-mechanism` · UG20 | `embolism causes infarction`; `embolus vascular occlusion ischemic necrosis`; `types embolism tissue infarct`; `embolism pathophysiology organ injury` | new; cardiovascular hits are organ-specific or omit the requested cause-to-infarction account | delta |
| `heart-failure-edema-hydrostatic-pressure` · UC01 | `heart failure edema increased hydrostatic pressure`; `congestive heart failure pitting edema mechanism`; `venous pressure fluid transudation`; `cardiac edema Starling force` | pending `ART-CVS-OEDEMA`; it directly assigns heart-failure oedema to raised capillary hydrostatic pressure | delta; narrower than F2 generic oedema mechanisms |
| `postoperative-dvt-diagnosis` · UC02 | `postoperative deep vein thrombosis diagnosis`; `knee replacement unilateral leg swelling`; `surgery venous stasis DVT`; `painful swollen leg thrombus` | pending `ART-CVS-DVT`; it names orthopaedic surgery, unilateral painful swelling and DVT investigation | delta; not the same as generic prior risk recognition |
| `nephrotic-edema-reduced-oncotic-pressure` · UC04 | `nephrotic syndrome edema decreased oncotic pressure`; `proteinuria hypoalbuminemia periorbital edema`; `renal edema plasma protein loss`; `low colloid osmotic pressure nephrosis` | pending `ART-CVS-OEDEMA`; it directly assigns nephrotic oedema to reduced plasma oncotic pressure | delta; narrower than F2 generic oedema causes |
| `dvt-pulmonary-embolism-clinical-pathway` · UC05 | `DVT pulmonary embolism calf swelling hemoptysis`; `venous thrombus embolizes lungs`; `pulmonary thromboembolism hypoxia chest pain`; `deep vein clot pulmonary circulation` | pending `ART-CVS-DVT`; it states DVT embolises to pulmonary circulation and lists breathlessness, pleuritic pain, haemoptysis and hypoxia | collapse to F3 `dvt-pulmonary-embolism-pathway` |
| `thromboembolic-ischemic-stroke` · UC06 | `thromboembolism ischemic stroke atherosclerosis`; `carotid cardiac embolic stroke`; `arterial thromboembolus cerebral infarction`; `sudden focal deficit vascular occlusion` | new; available cardiovascular records mention stroke without this tested atherosclerotic thromboembolic mechanism | delta |
| `postmastectomy-lymphedema-lymphatic-obstruction` · UC07,SC07 | `postmastectomy lymphedema lymphatic obstruction`; `radical mastectomy swollen arm`; `axillary lymph disruption edema`; `breast surgery nonpitting edema` | new; oedema and breast-drainage records would require a multi-record inference and neither states postmastectomy lymphoedema | delta |
| `cirrhotic-ascites-hydrostatic-oncotic-pressure` · UC09 | `cirrhosis ascites hydrostatic oncotic pressure`; `portal hypertension hypoalbuminemia ascites`; `liver failure fluid accumulation mechanism`; `cirrhotic edema dual Starling forces` | new; `ART-CVS-OEDEMA` mentions low albumin in liver disease but does not state the tested dual portal-hydrostatic plus oncotic mechanism | delta |
| `anaphylactic-shock-epinephrine-treatment` · UC10 | `anaphylactic shock epinephrine treatment`; `bee sting hypotension bronchospasm immediate management`; `intramuscular adrenaline anaphylaxis`; `IgE emergency vasopressor` | pending `PRA-REN-CASE-ANAPHYLAXIS`; it directly teaches adrenaline as first-line treatment of anaphylaxis with airway and circulatory compromise | delta |
| `paradoxical-embolism-pfo` · UC11 | `paradoxical embolism patent foramen ovale`; `venous thrombus systemic circulation PFO`; `right to left shunt embolus`; `DVT bypass lungs embolization` | pending `ART-CVS-ASD`; it states a venous thrombus can bypass the pulmonary filter during transient right-to-left reversal and identifies PFO | delta |
| `heart-failure-sided-congestion-reversal` · UC12 | `right left heart failure congestion reversal`; `right heart systemic venous congestion left pulmonary`; `sided heart failure circulation`; `heart failure congestion distribution` | pending right-/acute-heart-failure articles; they directly distinguish systemic venous congestion on the right from pulmonary congestion on the left | delta |
| `anaphylactic-shock-ige-vasodilation-permeability` · UC13 | `anaphylactic shock IgE vasodilation permeability`; `type one hypersensitivity shock mechanism`; `mast cell systemic vascular leak`; `anaphylaxis distributive shock pathophysiology` | pending `ART-101-HIS-CONNECTIVE-TISSUE-CELLS`; it explicitly traces allergen-IgE mast-cell discharge to severe vasodilatation, permeability and hypotension | delta |
| `early-septic-shock-warm-extremities` · UC15 | `early septic shock warm extremities`; `warm shock peripheral vasodilation`; `sepsis early hyperdynamic phase`; `septic shock warm then cold` | new; septic-shock records do not carry the early warm-extremity phase | delta |
| `acute-limb-ischemia-embolism-management` · UC16 | `acute limb ischemia embolism heparin thrombectomy`; `pain pallor pulseless leg management`; `arterial occlusion immediate anticoagulation`; `acute extremity ischemia vascular imaging` | new; `ART-CVS-PERIPHERAL-ARTERIAL-DISEASE` recognises the emergency but omits the tested embolus/thrombus plus immediate heparin/revascularisation scope | delta |
| `atrial-fibrillation-mesenteric-ischemia` · UC17 | `atrial fibrillation mesenteric ischemia`; `abdominal pain out of proportion embolism`; `superior mesenteric artery embolus CTA`; `acute bowel ischemia cardioembolic` | new | delta |
| `chronic-venous-insufficiency-valve-failure` · UC18 | `chronic venous insufficiency valve failure`; `leg edema hyperpigmentation venous stasis`; `venous ulcer compression therapy`; `chronic lower limb venous hypertension` | pending `ART-CVS-VENOUS-INSUFFICIENCY` and `CON-CVS-C0C6010B529BF8`; both directly state failed valves, ambulatory venous hypertension, oedema and pigmentation | delta |
| `long-haul-flight-dvt-pulmonary-embolism` · UC19 | `long haul flight DVT pulmonary embolism`; `immobility venous stasis air travel`; `flight shortness breath thromboembolism`; `travel associated pulmonary embolus` | pending `ART-CVS-DVT`; it names long-haul immobility as stasis and DVT embolisation to the pulmonary circulation | delta; the travel precipitant makes this narrower than F3's generic DVT-to-PE route |
| `dic-hemorrhagic-shock-consumption-coagulopathy` · UC20 | `DIC hemorrhagic shock consumption coagulopathy`; `microthrombi clotting factor consumption bleeding`; `disseminated intravascular coagulation trauma`; `refractory shock coagulopathy organ failure` | pending `CON-HEM-33CFB175D5114C`; it explicitly states shock-triggered widespread clotting with platelet/factor consumption and bleeding | collapse to F3 `dic-systemic-coagulation-activation` |
| `pitting-edema-congestive-heart-failure` · SK03 | `pitting edema congestive heart failure`; `cardiac edema indentation`; `dependent pitting oedema CHF`; `heart failure fluid sign` | pending `ART-CVS-OEDEMA`; one record identifies cardiac oedema and distinguishes pitting fluid on examination | delta; CHF association is not F2's inflammatory/lymphatic pattern |
| `inflammatory-edema-increased-permeability` · SK02 | `inflammatory edema increased vascular permeability`; `inflammation capillary leak edema`; `protein rich exudate swelling`; `vascular permeability inflammatory fluid` | pending `ART-CVS-OEDEMA`; it directly assigns inflammatory oedema to increased capillary permeability | delta; narrower than F2 generic oedema causes |

### Family-6 checkpoint and cumulative BMS-102 pathology

| Measure | Family 6 | Cumulative after Family 6 |
|---|---:|---:|
| Raw observed prompt occurrences | 93 | 542 |
| Printed key occurrences | 28 | 191 |
| Retained question records after exact-wording dedupe | 48 | 347 |
| Source-distinct tested concepts | 39 | — |
| External live / pending / no same-scope match | 0 / 19 / 20 | family-local disposition |
| Family-6 handles already represented in Families 1–5 | 9 | subtract from Family-6 concept addition |
| Cross-family concept delta | 30 | `39 - 9 = 30` |
| **Cumulative distinct tested concepts** | **+30** | **267** |

External arithmetic is `0 + 19 + 20 = 39`. The nine prior-BMS-102 overlaps are
hyperaemia/congestion, generalized-oedema patterns, lymphatic/non-pitting pattern,
haemoperitoneum, petechiae size, thrombus definition, pitting/non-pitting comparison,
DVT-to-PE, and DIC systemic activation. External and prior-family dispositions remain
separate dimensions. Cumulative arithmetic is `449 + 93 = 542` observed prompts,
`163 + 28 = 191` printed key occurrences, `299 + 48 = 347` retained question records,
and `237 + (39 - 9) = 267` distinct tested concepts.

### Exact remaining debt after Family 6

- The Circulatory 1 pair is fully bounded: all 13 rendered/native pages, 93 observed
  prompt occurrences, 45 exact repeats, 48 retained wordings, 28 printed key occurrences
  and 39 tested handles have an assignment and a search row.
- The next evidence-ranked local pathology question family is the tier-3 seven-page
  `src_f4017e73dcc32d5e9934` · `MCQs - INFECTION MCQs.pdf`; it must be rendered and
  adjudicated source-first before lower-ranked pathology material.
- Other remaining pathology revision/assessment banks and all BMS-102 microbiology
  assessment evidence remain S1 debt.
- Tutorial 103/LCS material remains excluded. No S2 content, IDs, imports, catalogue,
  readiness, claim, download, commit, or push action is authorised in this lane.
