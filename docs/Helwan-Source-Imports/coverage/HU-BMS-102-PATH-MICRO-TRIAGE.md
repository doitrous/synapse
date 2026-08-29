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
