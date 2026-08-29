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
