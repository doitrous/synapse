# 104 CPS · MCQ bank — question-led triage (keyed rows)

Continuation of the 104 CPS key-recovery pass (see `PROGRESS.md` and
`scripts/kasr/extract/104-CPS/mcq-bank.json`). Scope: the **757 keyed** rows only
(374 pre-existing printed keys + 383 recovered from the 5 solved books this pass).
The 532 still-keyless rows are out of scope here — they sit in
`scripts/kasr/extract/104-CPS/solved-books/editorial-keying-candidates.json`
pending the ANSWER-KEY GAPS ruling and are **not** triaged below (no key means no
settled question to search a concept against yet). Step 1 only — no concepts,
articles or questions authored below; mints nothing. Ends at the triage checkpoint.

## Counts

| questions triaged (keyed) | distinct concept-candidate clusters | hit-live | hit-pending | new | needs finer sub-triage |
|---:|---:|---:|---:|---:|---:|
| 757 | 45 | 23 clusters / 384 questions | 17 clusters / 312 questions | 2 clusters / 10 questions | 3 clusters / 51 questions |

Cluster = the question's `leaf` field (finest grain the extractor assigns), falling
back to `chapter`, then `subject`, then `topic` when finer fields are null. This is
coarser than the per-idea grain other lanes' triage docs use (each row there is one
distinct tested idea); at 757 keyed rows a per-question idea-list was not completed
this pass — see "Grain and limits" below.

## Method

`node "Instruction Manual for Content Creation/tools/find-existing.mjs" <term>` run
per cluster (1–2 word representative term per the tool's own guidance that compound
phrases under-match its plain substring search), classified live if any `live *` row
returned, else pending if any `pending` row returned (covers live state +
`docs/import-ready` + every `docs/*-Source-Imports`), else new. Raw hit counts saved
to `scripts/kasr/extract/104-CPS/solved-books/concept-search-results.txt`.

## Clusters

| cluster | keyed Qs | classification | search term used | live hits | pending hits |
|---|---:|---|---|---:|---:|
| Lungs | 54 | live | lungs | 20 | 14 |
| Heart | 41 | live | heart | 48 | 175 |
| The heart | 10 | live | heart | 48 | 175 |
| Cardiac Function | 45 | live | cardiac output | 10 | 11 |
| Arteries | 32 | live | arteries | 41 | 59 |
| Cell Division | 26 | live | cell division | 3 | 3 |
| Electrical Activity of the Heart | 20 | live | pacemaker | 8 | 34 |
| Mechanical Properties of Cardiac Muscle | 19 | live | cardiac muscle | 8 | 28 |
| Veins | 17 | live | veins | 49 | 51 |
| Spleen | 16 | live | spleen | 5 | 55 |
| Mediastinum | 16 | live | mediastinum | 4 | 31 |
| Intercostal Spaces | 14 | live | intercostal | 9 | 29 |
| Lymph node | 11 | live | lymph node | 23 | 42 |
| Basic Mechanisms of Circulatory Control | 10 | live | baroreceptor | 8 | 11 |
| Large Tubes of the Thorax | 9 | live | trachea | 10 | 22 |
| Large Veins of the Thorax | 8 | live | vena cava | 4 | 5 |
| The Diaphragm | 8 | live | (diaphragm) | 1 | 14 |
| Thymus | 7 | live | thymus | 2 | 46 |
| Large Arteries of the Thorax | 7 | live | aorta | 26 | 33 |
| Gas exchange in the lung | 6 | live | gas exchange | 2 | 10 |
| Organization of the Respiratory System | 4 | live | respiratory tract | 3 | 10 |
| Pericardium | 3 | live | pericardium | 12 | 20 |
| Lymphatics of the Thorax | 1 | live | thoracic duct | 1 | 13 |
| Histology-general | 58 | pending | histology | 14 | 42 |
| Conducting Portion | 52 | pending | (conducting portion) | 0 | 4 |
| Human Chromosome | 36 | pending | (human chromosome) | 0 | 1 |
| A-V Connections | 32 | pending | (a-v connections) | 0 | 1 |
| Respiratory Portion | 22 | pending | (respiratory portion) | 0 | 2 |
| Pulmonary Compliance | 21 | pending | (pulmonary compliance) | 0 | 1 |
| Gas Transport by the Blood | 19 | pending | hemoglobin | 36 | 98 |
| Vascular Function | 17 | pending | vascular resistance | 0 | 2 |
| Thoracic Cage | 14 | pending | (thoracic cage) | 0 | 2 |
| Chromosomal Aberrations (Abnormalities) | 12 | pending | (chromosomal aberrations) | 0 | 5 |
| Tonsils | 11 | pending | tonsils | 0 | 10 |
| Thoracic Cavity | 7 | pending | pleural cavity | 0 | 1 |
| The Cell Cycle | 4 | pending | (the cell cycle) | 0 | 25 |
| Cytogenetics | 2 | pending | cytogenetics | 0 | 6 |
| Alveolar Phagocytes | 2 | pending | (alveolar phagocytes) | 0 | 1 |
| Large Nerves of the Thorax | 2 | pending | phrenic nerve | 0 | 9 |
| Macrophage system | 1 | pending | macrophage system | 0 | 1 |
| Control of Respiration | 8 | new | respiratory rhythm | 0 | 0 |
| Development of the Heart | 2 | new | cardiogenesis | 0 | 0 |
| Physiology (topic-only, no chapter/leaf) | 34 | needs finer sub-triage | — | — | — |
| unknown (topic-only, no chapter/leaf) | 15 | needs finer sub-triage | — | — | — |
| Respiratory (topic-only, no chapter/leaf) | 2 | needs finer sub-triage | — | — | — |

## Grain and limits

- **Cluster grain, not idea grain.** 757 rows collapse into 45 clusters here rather
  than being read stem-by-stem into a per-idea list (the format used by e.g.
  `AU-MED-102-anatomy-triage.md`). A `find-existing` hit on a cluster term (e.g.
  "heart", 41 keyed Qs) does not mean every one of those 41 distinct ideas is
  covered — only that the module/organ already has live or pending content, which
  is the signal this checkpoint needs to decide live/pending/new at commit time.
  Idea-level dedup against near-duplicate concepts is authoring-stage work, same as
  every other lane's Step 2.
- **51 questions (3 clusters) are topic-only** — the extractor assigned no
  `chapter`/`leaf` for these keyed rows (they carry only `topic: Physiology`,
  `unknown`, or `Respiratory`), so cluster-term search would just re-run the whole
  module's name and return noise. These need a stem-level read before they can be
  classified; flagged for the authoring pass, not blocking this checkpoint.
- **Two clusters ("Control of Respiration", 8 Qs; "Development of the Heart", 2 Qs)
  found zero hits anywhere** (live or pending, live+pending across two alternate
  search terms each) — genuinely new content, not yet covered by any Kasr or other
  university lane.
- Compound multi-word cluster labels (marked `(term)` above) under-matched the
  tool's plain-substring search on the first pass and were not re-run with a
  shorter alternate; their true live/pending status may be undercounted rather
  than overcounted (a false "0" is more likely here than a false hit).

## Gate

**This lane stops here.** Per `docs/chief-of-staff/BOARD.md`'s TRIAGE CHECKPOINT
rule and `Instruction Manual for Content Creation/13-orchestration.md` §S1, nothing
below this line is minted or authored until the chief of staff reviews this table
and returns **"TRIAGE APPROVED"**. The 532 still-keyless rows in
`editorial-keying-candidates.json` are explicitly included in that hold — see
`PROGRESS.md`'s "Next" line, written by the prior pass in this same lane before this
one started.
