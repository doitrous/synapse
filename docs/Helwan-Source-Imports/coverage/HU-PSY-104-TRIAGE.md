# HU-PSY-104 psychology S1 triage

Status: **Family 1 complete; module checkpointed with insufficient assessment authority.**
This is source triage only. It creates no ID or student-facing content and does not authorise
S2 without a fresh literal `TRIAGE APPROVED` for Helwan Year 1.

## Family 1 — local Psychology Questions study bank

### Source identity, authority and read method

| Field | Verified value |
|---|---|
| Manifest source | `src_249d76e2f57b04d497a5` |
| Manifest SHA-256 | `249d76e2f57b04d497a5fc5ba1847736ad83e1b508bb81497c2a2c2a65911297` |
| Recomputed SHA-256 | `249d76e2f57b04d497a5fc5ba1847736ad83e1b508bb81497c2a2c2a65911297` |
| File | `Psychology Questions.pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/PSY 104/Psychology/Questions/Psychology Questions.pdf` |
| Manifest classification | Helwan `HU_Y1` · `HU-PSY-104` · Psychology · Questions |
| Container | 17 native-text, unencrypted letter-size PDF pages |
| Source authority | Tier 9 local ungraded study bank; no printed Helwan/faculty/department, exam type, sitting, academic year, marks or official-key claim |
| Read method | SHA and PDF metadata checked; `pdftotext -layout` and raw extraction checked against all 17 pages rendered at 150 dpi |

The title and organised path support local HU-PSY-104 relevance, but not official assessment
authority. Page 15 calls its red table `Key Answers`, and pages 16–17 call their red prose
`Short essay answers`; those are genuinely printed **study-bank answers**. They are counted
as answer occurrences, but are not promoted to official keys. No answer is inferred from
medical knowledge or from colour elsewhere.

### Complete prompt and printed-answer inventory

| Source block | Physical pages | Complete prompt occurrences | Genuinely printed answers | Treatment |
|---|---:|---:|---:|---|
| Numbered MCQs Q1–Q66 | 1–13 | 66 | 66 red letter entries on p. 15 | Count every occurrence and every printed study-bank key |
| Numbered short essays S1–S12 | 14 | 12 | 12 numbered red answer blocks on pp. 16–17 | Count every prompt and immediate printed answer block |
| **Family 1** | **1–17** | **78** | **78** | **66 MCQ + 12 written** |

The extracted numbering is complete: MCQs form the set 1–66, short essays form the sequence
1–12, the three-column key table contains 66 unique numbered entries covering 1–66, and the
short-answer section contains 12 sequential answer blocks. The printed MCQ table is:

```text
1-D 2-D 3-D 4-B 5-B 6-D 7-C 8-A 9-D 10-C 11-A 12-B 13-A 14-D 15-A 16-C 17-C 18-C 19-B 20-C 21-D 22-D
23-C 24-C 25-B 26-A 27-C 28-D 29-A 30-D 31-D 32-B 33-B 34-A 35-D 36-C 37-D 38-C 39-D 40-B 41-B 42-A 43-B 44-A
45-A 46-A 47-C 48-A 49-B 50-C 51-B 52-B 53-C 54-C 55-B 56-A 57-B 58-C 59-A 60-C 61-C 62-D 63-C 64-B 65-D 66-C
```

Two pairs are literal repeated MCQ forms: Q11 = Q13 and Q12 = Q14, with identical stem,
options and option order. Q11/Q13 both print `A`; Q12 prints `B` while its exact repeat Q14
prints `D`. The disagreement is preserved as a source conflict and is not reconciled. Thus
78 observed prompt occurrences minus two exact repeat forms leave **76 retained question
forms**. Further same-tested-scope assignments collapse those retained forms to **48 tested
concept handles**; the arithmetic is `78 - 2 exact repeats - 28 repeated-scope assignments = 48`.

Other source-quality risks remain literal evidence rather than S1 corrections: Q4 offers
several commonly classified basic emotions but prints `B`; Q49 prints `B` for distortion;
Q62 prints `D` for prototype; and short essay S10 asks for Maslow's basic needs but its answer
lists only physiological needs. None is treated as an authoritative medical correction.

### Source-first one-to-one assignment

| Evidence block | Assignment in source order |
|---|---|
| Q1–Q10 | `Q1→triangular-theory-of-love`; `Q2→observational-social-learning`; `Q3→stress-model-mind-body`; `Q4→primary-emotions`; `Q5→kretschmer-body-types`; `Q6→sensory-deprivation-risk`; `Q7→psychosexual-fixation-stages`; `Q8→cloninger-character-temperament-dimensions`; `Q9→freudian-structural-personality-components`; `Q10→erikson-psychosocial-stages` |
| Q11–Q20 | `Q11→maternal-bonding`; `Q12→attachment-styles`; `Q13→maternal-bonding` (**exact Q11 repeat**); `Q14→attachment-styles` (**exact Q12 repeat; conflicting printed key**); `Q15→kohlberg-moral-development-levels`; `Q16→prejudice-contact-interdependence`; `Q17→social-facilitation-audience-performance`; `Q18→prejudice-contact-interdependence`; `Q19→social-influence-types`; `Q20→parenting-styles-responsiveness-demandingness` |
| Q21–Q30 | `Q21→sleep-wake-serotonergic-rem-off`; `Q22→dissociative-disorder-memory-retrieval`; `Q23→thinking-types-logical-magical`; `Q24→induced-motion-perception`; `Q25→broca-wernicke-language-deficits`; `Q26→maslow-basic-needs-hierarchy`; `Q27→intelligence-quotient-mental-age`; `Q28→operant-conditioning-reinforcement-punishment`; `Q29→classical-conditioning-conditioned-response`; `Q30→observational-social-learning` |
| Q31–Q40 | `Q31→psychotherapy-schools`; `Q32→imprinting-critical-period-language`; `Q33→rogers-ideal-self`; `Q34→attribution-errors`; `Q35→prejudice-contact-interdependence`; `Q36→social-influence-types`; `Q37→parenting-styles-responsiveness-demandingness`; `Q38→kubler-ross-coping-stages`; `Q39→stress-model-mind-body`; `Q40→psychosexual-fixation-stages` |
| Q41–Q50 | `Q41→freudian-structural-personality-components`; `Q42→erikson-psychosocial-stages`; `Q43→attachment-styles`; `Q44→transitional-object`; `Q45→kohlberg-moral-development-levels`; `Q46→cloninger-character-temperament-dimensions`; `Q47→defence-mechanism-types`; `Q48→black-white-cognitive-distortion`; `Q49→defence-mechanism-types`; `Q50→perception-definition` |
| Q51–Q60 | `Q51→sleep-wake-cholinergic-rem-on`; `Q52→operant-conditioning-reinforcement-punishment`; `Q53→operant-conditioning-reinforcement-punishment`; `Q54→cloninger-character-temperament-dimensions`; `Q55→attribution-errors`; `Q56→suprachiasmatic-nucleus-circadian-clock`; `Q57→anxiety-memory-encoding`; `Q58→thinking-types-logical-magical`; `Q59→broca-wernicke-language-deficits`; `Q60→operant-conditioning-reinforcement-punishment` |
| Q61–Q66 | `Q61→psychotherapy-schools`; `Q62→cognitive-prototype-schema`; `Q63→erikson-psychosocial-stages`; `Q64→piaget-cognitive-development-stages`; `Q65→social-influence-types`; `Q66→kubler-ross-coping-stages` |
| S1–S12 | `S1→attention-definition`; `S2→alertness-definition`; `S3→instinct-definition`; `S4→perception-definition`; `S5→learning-definition`; `S6→stigma-definition`; `S7→social-exchange-theory`; `S8→drives-versus-incentives`; `S9→kubler-ross-coping-stages`; `S10→maslow-basic-needs-hierarchy`; `S11→defence-mechanism-types`; `S12→gardner-multiple-intelligences` |

Every observed prompt is assigned once. A repeated handle means the source tests another
facet of the same teachable objective; it is not an omitted question.

### Search-before-mint disposition ledger

Each of the 48 handles received four separate `find-existing.mjs` queries: **192 required
invocations**. That tool searched `server/data/medical-library-v1.json`, `docs/import-ready`,
`docs/questions-import-ready` and every `docs/*-Source-Imports` root. The same 192 literal
queries were then checked across full prose in 745 import/content files, and the three prior
accepted HU Year-1 triage ledgers were checked for exact prior handles. A broad word or
incidental sentence is not a same-idea/same-scope hit.

| # | Prompt refs → tested handle | Four-query bundle | Same-scope result | Disposition / placement |
|---:|---|---|---|---|
| 1 | Q1 → `triangular-theory-of-love` | `triangular theory of love`; `Sternberg`; `romantic love`; `consummate love` | `Sternberg` only hits Reed–Sternberg pathology in prior HU triage. | new · `SYS-PSY` / `psy` |
| 2 | Q2,Q30 → `observational-social-learning` | `social learning`; `observational learning`; `modelling`; `Bandura` | `modelling` only hits biological/structural *remodelling* text. | new · `SYS-PSY` / `psy` |
| 3 | Q3,Q39 → `stress-model-mind-body` | `stress model`; `psychosomatic`; `stress-related illness`; `mind body` | No result. | new · `SYS-PSY` / `psy` |
| 4 | Q4 → `primary-emotions` | `primary emotions`; `basic emotions`; `Plutchik`; `fear emotion` | No result. | new · `SYS-PSY` / `psy` |
| 5 | Q5 → `kretschmer-body-types` | `Kretschmer`; `pyknic`; `asthenic`; `constitutional personality` | `asthenic` only occurs inside *myasthenic*. | new · `SYS-PSY` / `psy` |
| 6 | Q6 → `sensory-deprivation-risk` | `sensory deprivation`; `deprivation syndrome`; `ICU sensory`; `institutionalized geriatric` | No result. | new · `SYS-PSY` / `psy` |
| 7 | Q7,Q40 → `psychosexual-fixation-stages` | `psychosexual fixation`; `oral fixation`; `anal fixation`; `psychosexual stages` | No result. | new · `SYS-PSY` / `psy` |
| 8 | Q8,Q46,Q54 → `cloninger-character-temperament-dimensions` | `Cloninger`; `novelty seeking`; `self transcendence`; `temperament character` | No result. | new · `SYS-PSY` / `psy` |
| 9 | Q9,Q41 → `freudian-structural-personality-components` | `id ego superego`; `structural model`; `ego component`; `Freudian personality` | No result. | new · `SYS-PSY` / `psy` |
| 10 | Q10,Q42,Q63 → `erikson-psychosocial-stages` | `Erikson`; `identity diffusion`; `generativity stagnation`; `integrity despair` | No result. | new · `SYS-PSY` / `psy` |
| 11 | Q11,Q13 → `maternal-bonding` | `maternal bonding`; `mother infant bond`; `bonding attachment`; `maternal emotional relationship` | No result. | new · `SYS-PSY` / `psy` |
| 12 | Q12,Q14,Q43 → `attachment-styles` | `attachment styles`; `anxious resistant`; `anxious avoidant`; `disorganised attachment` | No result. | new · `SYS-PSY` / `psy` |
| 13 | Q15,Q45 → `kohlberg-moral-development-levels` | `Kohlberg`; `preconventional`; `postconventional`; `moral development levels` | No result. | new · `SYS-PSY` / `psy` |
| 14 | Q16,Q18,Q35 → `prejudice-contact-interdependence` | `contact hypothesis`; `intergroup contact`; `interdependence prejudice`; `prejudice reduction` | No result. | new · `SYS-PSY` / `psy` |
| 15 | Q17 → `social-facilitation-audience-performance` | `social facilitation`; `audience performance`; `presence of others`; `Zajonc` | No result. | new · `SYS-PSY` / `psy` |
| 16 | Q19,Q36,Q65 → `social-influence-types` | `conformity`; `compliance social influence`; `obedience`; `resistance social influence` | No same-scope concept or article. | new · `SYS-PSY` / `psy` |
| 17 | Q20,Q37 → `parenting-styles-responsiveness-demandingness` | `parenting styles`; `authoritative parenting`; `indulgent parenting`; `neglectful parenting` | No result. | new · `SYS-PSY` / `psy` |
| 18 | Q21 → `sleep-wake-serotonergic-rem-off` | `REM off`; `serotonergic neurons`; `raphe nuclei sleep`; `serotonin REM` | No result. | new · `SYS-PSY` / `psy`; secondary `SYS-NEU` candidate |
| 19 | Q22 → `dissociative-disorder-memory-retrieval` | `dissociative amnesia`; `dissociative memory`; `memory retrieval`; `retrieval failure` | No result. | new · `SYS-PSY` / `psy`; secondary `SYS-NEU` candidate |
| 20 | Q23,Q58 → `thinking-types-logical-magical` | `logical thinking`; `magical thinking`; `heuristic thinking`; `autistic thinking` | No result. | new · `SYS-PSY` / `psy` |
| 21 | Q24 → `induced-motion-perception` | `induced motion`; `relative motion illusion`; `visual induced movement`; `stationary object seems moving` | No result. | new · `SYS-PSY` / `psy`; secondary `SYS-NEU` candidate |
| 22 | Q25,Q59 → `broca-wernicke-language-deficits` | `Broca area`; `Wernicke area`; `expressive aphasia`; `receptive aphasia` | No result. | new · `SYS-PSY` / `psy`; secondary `SYS-NEU` candidate |
| 23 | Q26,S10 → `maslow-basic-needs-hierarchy` | `Maslow`; `physiological needs`; `hierarchy of needs`; `self actualization` | No result. | new · `SYS-PSY` / `psy` |
| 24 | Q27 → `intelligence-quotient-mental-age` | `intelligence quotient`; `mental age`; `chronological age IQ`; `IQ formula` | No result. | new · `SYS-PSY` / `psy` |
| 25 | Q28,Q52,Q53,Q60 → `operant-conditioning-reinforcement-punishment` | `operant conditioning`; `positive punishment`; `negative punishment`; `positive reinforcement` | No result. | new · `SYS-PSY` / `psy` |
| 26 | Q29 → `classical-conditioning-conditioned-response` | `classical conditioning`; `conditioned response`; `Pavlovian`; `stimulus association` | No result. | new · `SYS-PSY` / `psy` |
| 27 | Q31,Q61 → `psychotherapy-schools` | `psychoanalytic psychotherapy`; `humanistic psychotherapy`; `cognitive therapy school`; `behavioural psychotherapy` | No result. | new · `SYS-PSY` / `psy` |
| 28 | Q32 → `imprinting-critical-period-language` | `imprinting`; `critical period language`; `language acquisition puberty`; `sensitive period language` | No result. | new · `SYS-PSY` / `psy` |
| 29 | Q33 → `rogers-ideal-self` | `ideal self`; `real self`; `Rogers self concept`; `self congruence` | No result. | new · `SYS-PSY` / `psy` |
| 30 | Q34,Q55 → `attribution-errors` | `attribution error`; `ultimate attribution error`; `fundamental attribution error`; `out-group attribution` | No result. | new · `SYS-PSY` / `psy` |
| 31 | Q38,Q66,S9 → `kubler-ross-coping-stages` | `Kubler Ross`; `denial anger bargaining`; `terminal illness coping`; `stages of grief` | No result. | new · `SYS-PSY` / `psy` |
| 32 | Q44 → `transitional-object` | `transitional object`; `Winnicott`; `comfort object`; `maternal absence toy` | No result. | new · `SYS-PSY` / `psy` |
| 33 | Q47,Q49,S11 → `defence-mechanism-types` | `rationalization defence`; `distortion defence mechanism`; `mature defence mechanisms`; `suppression sublimation humour` | Pathology text mentions defence generically, but no psychological same-scope record exists. | new · `SYS-PSY` / `psy` |
| 34 | Q48 → `black-white-cognitive-distortion` | `black and white thinking`; `all or nothing thinking`; `dichotomous thinking`; `cognitive distortion splitting` | No result. | new · `SYS-PSY` / `psy` |
| 35 | Q50,S4 → `perception-definition` | `perception`; `sensory integration`; `perceptual process`; `stimuli same modality` | Live auditory-cortex pitch perception and pending communication-perception wording are narrower/different scopes. | new · `SYS-PSY` / `psy`; secondary `SYS-NEU` candidate |
| 36 | Q51 → `sleep-wake-cholinergic-rem-on` | `REM on`; `cholinergic neurons`; `pons cholinergic`; `acetylcholine REM` | Autonomic acetylcholine prose is not REM-on neuronal scope. | new · `SYS-PSY` / `psy`; secondary `SYS-NEU` candidate |
| 37 | Q56 → `suprachiasmatic-nucleus-circadian-clock` | `suprachiasmatic nucleus`; `biological clock`; `circadian pacemaker`; `SCN neurons` | No result. | new · `SYS-PSY` / `psy`; secondary `SYS-NEU` candidate |
| 38 | Q57 → `anxiety-memory-encoding` | `anxiety memory`; `anxiety encoding`; `stress memory registration`; `working memory anxiety` | No result. | new · `SYS-PSY` / `psy`; secondary `SYS-NEU` candidate |
| 39 | Q62 → `cognitive-prototype-schema` | `cognitive prototype`; `cognitive schema`; `mental prototype`; `cognitive construct` | No result. | new · `SYS-PSY` / `psy` |
| 40 | Q64 → `piaget-cognitive-development-stages` | `Piaget`; `formal operational`; `concrete operational`; `sensorimotor stage` | No result. | new · `SYS-PSY` / `psy` |
| 41 | S1 → `attention-definition` | `selective attention`; `attention psychology`; `attentional selection`; `select stimuli` | No result. | new · `SYS-PSY` / `psy`; secondary `SYS-NEU` candidate |
| 42 | S2 → `alertness-definition` | `alertness`; `arousal awareness`; `state of awareness`; `vigilance` | Sympathetic-system text only says it raises mental alertness; it does not define the tested scope. | new · `SYS-PSY` / `psy`; secondary `SYS-NEU` candidate |
| 43 | S3 → `instinct-definition` | `instinct`; `innate behaviour`; `inborn behaviour`; `fixed action pattern` | Ordinary-prose uses of “instinct” are near-misses. | new · `SYS-PSY` / `psy` |
| 44 | S5 → `learning-definition` | `learning psychology`; `behaviour change experience`; `learning process`; `experience changes behaviour` | No result. | new · `SYS-PSY` / `psy` |
| 45 | S6 → `stigma-definition` | `stigma`; `social disapproval`; `stigmatisation`; `social norms stigma` | No result. | new · `SYS-PSY` / `psy` |
| 46 | S7 → `social-exchange-theory` | `social exchange theory`; `relationship costs benefits`; `exchange theory interpersonal`; `cost benefit relationship` | No result. | new · `SYS-PSY` / `psy` |
| 47 | S8 → `drives-versus-incentives` | `drives incentives`; `drive theory`; `incentive theory`; `internal drive external reward` | No result. | new · `SYS-PSY` / `psy` |
| 48 | S12 → `gardner-multiple-intelligences` | `multiple intelligences`; `Gardner`; `spatial intelligence`; `interpersonal intelligence` | No result. | new · `SYS-PSY` / `psy` |

Disposition arithmetic is `0 live + 0 pending + 48 new = 48`. No prior HU-BMS-101,
HU-BMS-102 or HU-LCS-103 handle owns any psychology scope above. `SYS-PSY` is the reviewed
canonical behavioural-health root and `psy` is the current curriculum subject. Secondary
`SYS-NEU` candidates are recorded only for the obvious neurobehavioural overlap; no exact
taxonomy leaf or ID is minted at S1.

## Family-1 checkpoint

| Module / bounded family | Questions triaged | Printed answers recovered | Retained question forms | Distinct concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| `HU-PSY-104` · local Psychology Questions bank | 78 | 78 | 76 | 48 | 0 | 0 | 48 |

The answer total is `66 MCQ key letters + 12 short-answer blocks = 78`; it is not a claim
of 78 official keys. All 78 records are question-traceable S1 evidence. No article, question,
written, practical, relation, ID, catalogue change or import batch was created.

## Exact remaining debt and blocker

- The only manifest row classified as `Questions` for HU-PSY-104 is now fully read and
  closed; there is no second local question-category source to dispatch.
- The other 21 HU-PSY-104 manifest paths are administration/teaching context: one portfolio,
  ten lecture-category paths, eight case-scenario paths and two notes/summaries. SHA dedupe reduces
  those 21 paths to 15 unique local files. They may explain a banked scope after an authority
  review, but they do not create additional assessment occurrences.
- This bank supplies no official exam/sitting/mark/repetition signal, and its study-bank
  answers include an exact-repeat key conflict. Therefore the module is **not** presented as
  adequate official assessment coverage. The chief of staff should record `needs Omar
  sources`: an actual Helwan PSY-104 paper, official/department question bank, or official key.
- Browser escalation is not attempted in this family. Until stronger evidence arrives, the
  48-handle table is a complete bounded S1 checkpoint, not authority to enter S2.
