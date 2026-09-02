> **Not a reliable coverage read for tranche 1.** `ledger.mjs` walks a seed-JSON
> directory (`coverage/seeds/MUST-CVS-201/`, empty here) and infers cluster
> names from `--triage`'s own `<key>-qNN` lines. Tranche 1 is 19 hand-authored
> **written** question records (structured_written / short_answer format), not
> the seed → emit-mcq route — same situation the MUST Y1 lane card documents
> for its own written-question work ("No seed-JSON directory exists here …
> `content:ledger` will find nothing"). `-triage-keys.txt` is prose, not
> `key-qNN` lines, so every line below became its own one-row "cluster" with
> `remaining=1` — none of that reflects real state. **Actual tranche-1 status:
> 19/19 authored** — 10 in `question/MUST-CVS-201-eom-written.md` (concepts
> live or minted this batch) + 9 in
> `pending-live/MUST-CVS-201-questions.md` (concepts pending in another
> lane's unimported batch, per `pending-live/INDEX.md`); 0 held; 0 remaining
> from this tranche. See `docs/MUST-Source-Imports/coverage/MUST-CVS-201-
> triage.md` and this commit's own report for the real count. Run kept here
> only because the lane brief calls for it before every commit.

| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| "amiodarone" -> no hit -> NEW | 0 | 0 | 1 | 1 |
| "anterior interventricular artery" -> 7 hits, pending (Kasr 104-CPS-anatomy-concepts.md, import-ready/question/SYS-CVS-QUESTION-003.md) | 0 | 0 | 1 | 1 |
| "arterial blood pressure regulation" (broadened) -> no hit -> NEW (confirmed) | 0 | 0 | 1 | 1 |
| "atherosclerosis risk factors" -> no hit | 0 | 0 | 1 | 1 |
| "atherosclerosis" (broadened) -> no hit -> NEW (confirmed) | 0 | 0 | 1 | 1 |
| "autoregulation" -> 9 hits, pending (Kasr 104-CPS-physiology-concepts.md, local-blood-flow-regulation + coronary-circulation canonical_keys) | 0 | 0 | 1 | 1 |
| "cardiac tamponade" -> 3 hits, pending (import-ready/article/SYS-CVS-ARTICLE-T06.md, concept/SYS-CVS-CONCEPT-T06.md) | 0 | 0 | 1 | 1 |
| "coronary artery origin" (broadened) -> no hit -> NEW (confirmed) | 0 | 0 | 1 | 1 |
| "dilated cardiomyopathy" -> 3 hits, pending (import-ready/article/SYS-CVS-ARTICLE-T04.md, concept/SYS-CVS-CONCEPT-T04.md) | 0 | 0 | 1 | 1 |
| "edema" -> 26 hits, pending (Kasr 104-CPS-physiology-concepts.md "Causes of oedema" alias) -- borderline, same word not confirmed same scope | 0 | 0 | 1 | 1 |
| "fatty streak" -> no hit -> NEW | 0 | 0 | 1 | 1 |
| "fibrinous pericarditis" -> no hit -> NEW | 0 | 0 | 1 | 1 |
| "hypertension" -> 40 hits, pending (Alexandria AU-MED-106-physiology-concepts.md hypertension.definition-and-causes.overview canonical_key) | 0 | 0 | 1 | 1 |
| "left coronary artery origin" -> no hit | 0 | 0 | 1 | 1 |
| "long-term regulation of arterial blood pressure" -> no hit | 0 | 0 | 1 | 1 |
| "malignant hypertension" -> 1 hit, pending (import-ready/article/SYS-CVS-ARTICLE-T07.md) | 0 | 0 | 1 | 1 |
| "posterior interventricular artery" -> 1 hit, pending (Kasr 104-CPS-anatomy-concepts.md) | 0 | 0 | 1 | 1 |
| "rheumatic fever" -> 12 hits, pending (import-ready/concept/SYS-CVS-CONCEPT-T06.md, SYS-CVS-CONCEPT-T08.md) | 0 | 0 | 1 | 1 |
| "secondary hypertension" -> 4 hits, pending (import-ready/article/SYS-CVS-ARTICLE-T07.md, concept/SYS-CVS-CONCEPT-T07.md) | 0 | 0 | 1 | 1 |
| "smooth muscle histological features" -> no hit | 0 | 0 | 1 | 1 |
| "smooth muscle" (broadened) -> 93 hits, pending (Kasr 103-BMS-histology-department-written.md comparison table) -- borderline, verify scope at S2 | 0 | 0 | 1 | 1 |
| --- Source A (11/11 keyed) --- | 0 | 0 | 1 | 1 |
| --- Source B (8/8 keyed) --- | 0 | 0 | 1 | 1 |
| --- find-existing.mjs query log (17 distinct concept candidates) --- | 0 | 0 | 1 | 1 |
| A-Q1  key=printed  Anterior interventricular artery = branch of left coronary artery, supplies anterior 2/3 of IV septum | 0 | 0 | 1 | 1 |
| A-Q10 key=printed  Left coronary artery origin: left posterior aortic sinus of ascending aorta | 0 | 0 | 1 | 1 |
| A-Q11 key=printed  Long-term ABP regulation: RAS, ANP, vasopressin mechanisms | 0 | 0 | 1 | 1 |
| A-Q2  key=printed  Rheumatic fever: post-streptococcal (S. pyogenes), molecular mimicry vs M protein, type II hypersensitivity, cross-reacts heart/joint/brain | 0 | 0 | 1 | 1 |
| A-Q3  key=printed  Edema = excess tissue fluid; causes: raised hydrostatic P, lowered colloid osmotic P, raised capillary permeability, lymphatic obstruction, salt & water retention | 0 | 0 | 1 | 1 |
| A-Q4  key=printed  Amiodarone: class III anti-arrhythmic, blocks K+/Ca2+ channels + alpha/beta receptors; AEs: pulmonary toxicity, hepatic cirrhosis, corneal deposits, thyroid dysfunction, photosensitivity, GIT upset, neuro | 0 | 0 | 1 | 1 |
| A-Q5  key=printed  Posterior interventricular artery originates from right coronary artery | 0 | 0 | 1 | 1 |
| A-Q6  key=printed  Atherosclerosis risk factors: hyperlipidemia, HTN, smoking, diabetes, age, male sex, obesity, stress | 0 | 0 | 1 | 1 |
| A-Q7  key=printed  Autoregulation: intrinsic organ ability to maintain constant blood flow despite perfusion-pressure change; local metabolic + myogenic mechanisms; brain/heart/kidney | 0 | 0 | 1 | 1 |
| A-Q8  key=printed  Malignant hypertension causes of death (order): renal failure, heart failure, coronary heart disease, cerebral hemorrhage | 0 | 0 | 1 | 1 |
| A-Q9  key=printed  Smooth muscle histology: spindle-shaped, non-striated, non-branched, single central nucleus, no T-tubules | 0 | 0 | 1 | 1 |
| B-Q1  key=printed  Dilated cardiomyopathy: definition, causes, gross, microscopy, effect | 0 | 0 | 1 | 1 |
| B-Q2  key=printed  Cardiac tamponade: definition, causes, complications, medical emergency | 0 | 0 | 1 | 1 |
| B-Q3  key=printed  Fibrinous pericarditis: definition (bread and butter), causes | 0 | 0 | 1 | 1 |
| B-Q4  key=printed  Atherosclerosis: definition + risk factors (duplicate of A-Q6 concept) | 0 | 0 | 1 | 1 |
| B-Q5  key=printed  Fatty streak: definition, gross, microscopy (foam cells), sites | 0 | 0 | 1 | 1 |
| B-Q6  key=printed  Hypertension definition: sustained systolic >140 or diastolic >90 | 0 | 0 | 1 | 1 |
| B-Q7  key=printed  Secondary hypertension causes: renal, endocrine, pheochromocytoma, coarctation, obesity/OCP/sleep apnea, pregnancy | 0 | 0 | 1 | 1 |
| B-Q8  key=printed  Malignant hypertension: definition (>280/180), features, kidney changes (duplicate of A-Q8 concept, different facets — both kept as one candidate) | 0 | 0 | 1 | 1 |
| MUST-CVS-201 first-tranche triage keys | 0 | 0 | 1 | 1 |
| Source A = 00 Module-wide/06 EOM Exams/EOM MCQs - CVS201 Written Questions (Final) Fall 2024.pdf (3 pages, written, all subjects, by Absalam101 & Hamza & Rehab) | 0 | 0 | 1 | 1 |
| Source B = Pathology/06 EOM Exams/EOM MCQs - written pathology final by dr.maria.pdf (2 pages, written, Pathology, by Dr.maria) | 0 | 0 | 1 | 1 |
| Tally: pending=11 (edema and smooth-muscle-histology counted pending but flagged borderline/needs S2 re-verify), new=6, live=0, total distinct=17 | 0 | 0 | 1 | 1 |

## Held
(none)

## Remaining
- "amiodarone" -> no hit -> NEW
- "anterior interventricular artery" -> 7 hits, pending (Kasr 104-CPS-anatomy-concepts.md, import-ready/question/SYS-CVS-QUESTION-003.md)
- "arterial blood pressure regulation" (broadened) -> no hit -> NEW (confirmed)
- "atherosclerosis risk factors" -> no hit
- "atherosclerosis" (broadened) -> no hit -> NEW (confirmed)
- "autoregulation" -> 9 hits, pending (Kasr 104-CPS-physiology-concepts.md, local-blood-flow-regulation + coronary-circulation canonical_keys)
- "cardiac tamponade" -> 3 hits, pending (import-ready/article/SYS-CVS-ARTICLE-T06.md, concept/SYS-CVS-CONCEPT-T06.md)
- "coronary artery origin" (broadened) -> no hit -> NEW (confirmed)
- "dilated cardiomyopathy" -> 3 hits, pending (import-ready/article/SYS-CVS-ARTICLE-T04.md, concept/SYS-CVS-CONCEPT-T04.md)
- "edema" -> 26 hits, pending (Kasr 104-CPS-physiology-concepts.md "Causes of oedema" alias) -- borderline, same word not confirmed same scope
- "fatty streak" -> no hit -> NEW
- "fibrinous pericarditis" -> no hit -> NEW
- "hypertension" -> 40 hits, pending (Alexandria AU-MED-106-physiology-concepts.md hypertension.definition-and-causes.overview canonical_key)
- "left coronary artery origin" -> no hit
- "long-term regulation of arterial blood pressure" -> no hit
- "malignant hypertension" -> 1 hit, pending (import-ready/article/SYS-CVS-ARTICLE-T07.md)
- "posterior interventricular artery" -> 1 hit, pending (Kasr 104-CPS-anatomy-concepts.md)
- "rheumatic fever" -> 12 hits, pending (import-ready/concept/SYS-CVS-CONCEPT-T06.md, SYS-CVS-CONCEPT-T08.md)
- "secondary hypertension" -> 4 hits, pending (import-ready/article/SYS-CVS-ARTICLE-T07.md, concept/SYS-CVS-CONCEPT-T07.md)
- "smooth muscle histological features" -> no hit
- "smooth muscle" (broadened) -> 93 hits, pending (Kasr 103-BMS-histology-department-written.md comparison table) -- borderline, verify scope at S2
- --- Source A (11/11 keyed) ---
- --- Source B (8/8 keyed) ---
- --- find-existing.mjs query log (17 distinct concept candidates) ---
- A-Q1  key=printed  Anterior interventricular artery = branch of left coronary artery, supplies anterior 2/3 of IV septum
- A-Q10 key=printed  Left coronary artery origin: left posterior aortic sinus of ascending aorta
- A-Q11 key=printed  Long-term ABP regulation: RAS, ANP, vasopressin mechanisms
- A-Q2  key=printed  Rheumatic fever: post-streptococcal (S. pyogenes), molecular mimicry vs M protein, type II hypersensitivity, cross-reacts heart/joint/brain
- A-Q3  key=printed  Edema = excess tissue fluid; causes: raised hydrostatic P, lowered colloid osmotic P, raised capillary permeability, lymphatic obstruction, salt & water retention
- A-Q4  key=printed  Amiodarone: class III anti-arrhythmic, blocks K+/Ca2+ channels + alpha/beta receptors; AEs: pulmonary toxicity, hepatic cirrhosis, corneal deposits, thyroid dysfunction, photosensitivity, GIT upset, neuro
- A-Q5  key=printed  Posterior interventricular artery originates from right coronary artery
- A-Q6  key=printed  Atherosclerosis risk factors: hyperlipidemia, HTN, smoking, diabetes, age, male sex, obesity, stress
- A-Q7  key=printed  Autoregulation: intrinsic organ ability to maintain constant blood flow despite perfusion-pressure change; local metabolic + myogenic mechanisms; brain/heart/kidney
- A-Q8  key=printed  Malignant hypertension causes of death (order): renal failure, heart failure, coronary heart disease, cerebral hemorrhage
- A-Q9  key=printed  Smooth muscle histology: spindle-shaped, non-striated, non-branched, single central nucleus, no T-tubules
- B-Q1  key=printed  Dilated cardiomyopathy: definition, causes, gross, microscopy, effect
- B-Q2  key=printed  Cardiac tamponade: definition, causes, complications, medical emergency
- B-Q3  key=printed  Fibrinous pericarditis: definition (bread and butter), causes
- B-Q4  key=printed  Atherosclerosis: definition + risk factors (duplicate of A-Q6 concept)
- B-Q5  key=printed  Fatty streak: definition, gross, microscopy (foam cells), sites
- B-Q6  key=printed  Hypertension definition: sustained systolic >140 or diastolic >90
- B-Q7  key=printed  Secondary hypertension causes: renal, endocrine, pheochromocytoma, coarctation, obesity/OCP/sleep apnea, pregnancy
- B-Q8  key=printed  Malignant hypertension: definition (>280/180), features, kidney changes (duplicate of A-Q8 concept, different facets — both kept as one candidate)
- MUST-CVS-201 first-tranche triage keys
- Source A = 00 Module-wide/06 EOM Exams/EOM MCQs - CVS201 Written Questions (Final) Fall 2024.pdf (3 pages, written, all subjects, by Absalam101 & Hamza & Rehab)
- Source B = Pathology/06 EOM Exams/EOM MCQs - written pathology final by dr.maria.pdf (2 pages, written, Pathology, by Dr.maria)
- Tally: pending=11 (edema and smooth-muscle-histology counted pending but flagged borderline/needs S2 re-verify), new=6, live=0, total distinct=17
