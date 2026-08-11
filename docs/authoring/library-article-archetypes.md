# Reference · Article archetypes and their sections

Every node in the canonical taxonomy carries a `templateId`. This is what those
IDs mean. Pick the archetype first — it fixes your section headings, and using
them verbatim is what makes 1,000 articles feel like one library.

Source of truth: `src/data/articleTemplates.ts`. If this file and that file
disagree, the code wins — run `npm run medical:validate:authoring`.

---

## Prompt

```
You are choosing the archetype for a Synapse library article and laying out its
sections.

Decide by asking what the article IS, not what it mentions:

- Is it a named disease?                     -> TPL-CONDITION
- Is it something a patient complains of?    -> TPL-PRESENTATION
- Is it a mechanism or principle?            -> TPL-CONCEPT
- Is it a structure or region?               -> TPL-ANATOMY
- Is it a test or imaging modality?          -> TPL-INVESTIGATION
- Is it a drug or drug class?                -> TPL-DRUG
- Is it something you DO to a patient?       -> TPL-SKILL
- Is it a pathogen?                          -> TPL-ORGANISM
- Is it time-critical, ordered by priority?  -> TPL-EMERGENCY
- Is it about populations, not patients?     -> TPL-PUBLIC-HEALTH

Then:
1. Use the required headings VERBATIM, in the listed order. Do not rename,
   merge, reorder, or translate them.
2. Add optional headings only when you have real content for them.
3. Never invent a heading. If your content has no home in the archetype, you
   have probably chosen the wrong archetype — or the content belongs in a
   different article.
4. NEVER write a "Components and relations" section. That generated appendix was
   removed when articles became continuous prose, and the field audit rejects any
   article still carrying one. Concept links live in `related_concepts`.

If an article genuinely spans two archetypes, it is usually two articles. Split
it and link them.
```

---

## Choosing between near-misses

| If you are torn between | Choose | Because |
|---|---|---|
| Condition vs Presentation | Is there a diagnosis in the title? `Pulmonary embolism` is a condition; `Breathlessness` is a presentation. | A presentation ends in a differential; a condition ends in management. |
| Condition vs Emergency | Emergency if the article's *order* is driven by what must happen in the first minutes. | `Asthma` is a condition; `Acute severe asthma` is an emergency. |
| Concept vs Anatomy | Anatomy if the answer to "what is it?" is a structure. | `Coronary circulation` is anatomy; `Myocardial oxygen supply and demand` is a concept. |
| Drug vs Concept | Drug if you could prescribe from it. | `Loop diuretics` is a drug article; `Tubular sodium handling` is a concept. |
| Skill vs Investigation | Skill if the article is about performing it; Investigation if it is about reading it. | `Arterial blood gas sampling` is a skill; `Arterial blood gas interpretation` is an investigation. |
| Organism vs Condition | Organism if the article is organised around the pathogen. | `Mycobacterium tuberculosis` is an organism; `Pulmonary tuberculosis` is a condition. |

---

## The ten archetypes

### TPL-CONCEPT · Concept / mechanism

Archetype: `concept` · A single mechanism, principle, or process that other articles build on.

Required sections, in order:
1. Definition
2. Mechanism
3. Key determinants
4. Clinical significance

Optional: `Normal values`, `Applied physiology`, `Common misconceptions`

Expected relations: `is_a`, `part_of`, `mechanism_step_before`, `causes`, `increases`, `decreases`, `regulates`, `prerequisite_of`, `often_confused_with`

### TPL-CONDITION · Condition / disease

Archetype: `condition` · A named disease or syndrome, from cause through management.

Required sections, in order:
1. Definition
2. Epidemiology
3. Aetiology and risk factors
4. Pathophysiology
5. Clinical picture
6. Investigation
7. Management
8. Complications and prognosis

Optional: `Classification`, `Prevention`, `Egyptian context`

Expected relations: `is_a`, `causes`, `presents_as`, `diagnosed_by`, `investigated_by`, `treated_by`, `complication_of`, `differential_of`, `associated_with`

### TPL-PRESENTATION · Presentation / symptom

Archetype: `presentation` · A patient-facing complaint, worked from the symptom toward a differential.

Required sections, in order:
1. Definition
2. Mechanisms
3. Differential diagnosis
4. Focused history
5. Focused examination
6. Initial investigation
7. Red flags
8. Immediate approach

Optional: `Age and context variation`, `Common misdiagnoses`

Expected relations: `presents_as`, `differential_of`, `causes`, `investigated_by`, `associated_with`, `often_confused_with`

### TPL-ANATOMY · Anatomy / structure

Archetype: `anatomy` · A structure or region: what it is, where it is, and what it connects to.

Required sections, in order:
1. Overview and position
2. Structure
3. Relations
4. Blood supply, innervation and lymphatics
5. Development
6. Surface and imaging anatomy
7. Clinical correlations

Optional: `Histology`, `Variations and anomalies`

Expected relations: `part_of`, `located_in`, `supplies`, `drains_into`, `contains`, `composed_of`, `connects_to`, `accompanies`

### TPL-INVESTIGATION · Investigation / interpretation

Archetype: `investigation` · A test or imaging modality and how to read it.

Required sections, in order:
1. Purpose and indications
2. Principle
3. How it is performed
4. Normal findings
5. Abnormal findings and interpretation
6. Limitations and pitfalls

Optional: `Contraindications`, `Patient preparation`, `Availability and cost in Egypt`

Expected relations: `investigated_by`, `diagnosed_by`, `is_a`, `contrasts_with`, `associated_with`

### TPL-DRUG · Drug / therapeutics

Archetype: `drug` · A drug or therapeutic class, safe to prescribe from.

Required sections, in order:
1. Class and members
2. Mechanism of action
3. Pharmacokinetics
4. Indications
5. Dosing principles
6. Adverse effects
7. Contraindications and cautions
8. Interactions
9. Monitoring

Optional: `Use in pregnancy and lactation`, `Use in renal or hepatic impairment`, `Cost and availability in Egypt`

Expected relations: `treated_by`, `is_a`, `contraindicates`, `decreases`, `increases`, `regulates`, `often_confused_with`

> Drug articles are the highest-risk content in the library. Doses and
> recommendations never auto-publish, and a drug article without a cited source
> for its dosing section must not leave `Draft`.

### TPL-SKILL · Skill / procedure

Archetype: `skill` · An observable, examinable clinical skill or procedure.

Required sections, in order:
1. Purpose and indications
2. Preparation and consent
3. Equipment
4. Step-by-step procedure
5. Safety and complications
6. Communication points
7. Assessment criteria

Optional: `Contraindications`, `Documentation`, `Common OSCE errors`

Expected relations: `part_of`, `prerequisite_of`, `investigated_by`, `treated_by`, `associated_with`

> `Assessment criteria` should line up with the mark scheme of any OSCE station
> that tests this skill. See [practical.md](practical.md).

### TPL-ORGANISM · Organism / infection

Archetype: `organism` · A pathogen and the disease it causes.

Required sections, in order:
1. Classification and structure
2. Epidemiology and transmission
3. Pathogenesis and virulence
4. Clinical syndromes
5. Laboratory diagnosis
6. Treatment
7. Prevention and control

Optional: `Endemicity in Egypt`, `Antimicrobial resistance`

Expected relations: `is_a`, `causes`, `presents_as`, `diagnosed_by`, `treated_by`, `associated_with`

> Use `Endemicity in Egypt` wherever local burden differs materially from the
> Western source you are working from.

### TPL-EMERGENCY · Emergency / acute care

Archetype: `emergency` · A time-critical presentation, ordered by what must happen first.

Required sections, in order:
1. Recognition
2. Immediate priorities
3. Initial management
4. Definitive management
5. Escalation and referral
6. Reassessment and disposition
7. Pitfalls

Optional: `Paediatric differences`, `Pre-hospital considerations`

Expected relations: `presents_as`, `causes`, `treated_by`, `complication_of`, `differential_of`

> The section order *is* the teaching. Do not move `Definitive management` above
> `Immediate priorities` because it reads better.

### TPL-PUBLIC-HEALTH · Public health / prevention

Archetype: `public-health` · A population-level problem, intervention, or health-system topic.

Required sections, in order:
1. Definition and scope
2. Burden and determinants
3. Evidence base
4. Interventions and levels of prevention
5. Measurement and indicators
6. Policy and health-system context

Optional: `Egyptian national programmes`, `Equity considerations`

Expected relations: `causes`, `decreases`, `increases`, `associated_with`, `is_a`, `part_of`

---

## Legacy template IDs

The supplied blueprint spreadsheet uses `TPL-PUBLIC` on 101 nodes while the
reviewed additions use `TPL-PUBLIC-HEALTH` on 10. They mean the same thing.
`TPL-PUBLIC-HEALTH` is canonical because it matches the archetype name;
`TPL-PUBLIC` resolves to it via `ARTICLE_TEMPLATE_ALIASES` and should not be used
in new records.

## Reject if

- You needed a heading the archetype does not offer, and you added it anyway.
- The article's headings are in a different order from the list.
- The article carries a "Components and relations" section.
- You chose an archetype because it was easiest to fill rather than because it
  describes what the article is.
