# SCU-FBS103 (Foundation 2) — S3 module triage

Foundation 2 is this lane's second module (Foundation 1 already triaged and
partly authored by prior lanes — `coverage/SCU-FBS102-triage.md`). It has the
second-richest already-keyed exam material of any FOMSCU Year 1 module (4
own-source JSON papers, 138 raw questions, 100% answered) covering nervous
tissue, action potential/resting membrane potential physiology, general
bacteriology, and a pathology-intro slice — per `LANE-CARD.md`'s module
identity note.

## Sources triaged

All four are structured JSON (already extracted, no PDF reading needed —
same `extraction_note` as Foundation 1: "Questions copied from public
Firestore document lectures/{id}...HTML wrappers stripped to text...No
questions invented." One caveat worth recording even though it does not
affect authored content: many `explanation` fields in these JSON files
themselves say "source of the answers and explanation is FOMNINU lecture
PDFs" — the printed **answer keys** are FOMSCU's own exam data, but the
**explanation prose** in the source JSON traces to FOMNINU, a different
faculty. This lane never copies that explanation text (every explanation is
written fresh, per LANE-CARD.md's standing rule for all lanes) so the
FOMNINU provenance of the JSON's own prose is a data-lineage note, not a
§7 "Related Alternate" exclusion — the exclusion rule applies to the
separate `_Needs Review - Related FOMNINU/*` file pair, which is not one of
these four and was not read.

| Source file | Questions | Keys recovered | Method |
|---|--:|--:|---|
| `06 EOM Exams/EOM - Foundation 2 2026 - FOMSCU MID - MCQ.json` | 62 | 62/62 | pre-extracted JSON, `answer` per item |
| `07 EOY Exams/EOY - Foundation 2 2025 - FOMSCU Final - MCQ.json` | 30 | 30/30 | same |
| `07 EOY Exams/EOY - Foundation 2 2026 - FOMSCU Final - MCQ.json` | 33 | 33/33 | same |
| `03 Questions and QBank/Formative 2025 - Foundation 2 - MCQ.json` | 13 | 13/13 | same |
| **Total (raw)** | **138** | **138/138** | |
| **After exact-text dedup** | **105 distinct** | **105/105** | normalized question text; repeats across MID/EOY/Formative papers collapsed |

Every one of the 105 distinct questions' printed answer string was checked
against its own options list — 0 mismatches (answer text not found among
that question's own options), so all 105 keys are usable as-is.

Distinct-question count by subject (`part` field in the source JSON):

| Subject | Distinct questions |
|---|--:|
| Histology | 17 |
| Embryology | 17 |
| Anatomy | 15 |
| Pharmacology | 12 |
| Parasitology | 11 |
| Microbiology | 11 |
| Biochemistry | 8 |
| Physiology | 7 |
| Pathology | 6 |
| Medical Ethics | 1 |

Condition check (LANE-CARD.md §STEP 1): 105/105 keyed = 100%, well past the
≥60%-keyed bar — met by construction as expected. **TRIAGE APPROVED**
(granted in advance on this condition) — proceeding to authoring.

## Concept-candidate method

Exact-text dedup (105 questions) collapses onto **103 distinct (subject,
answer) concept candidates** — 2 keys are shared by 2 questions each
(`histology-pseudounipolar-neurons`, `pharmacology-full-agonist`, both pairs
asking the same fact from different angles); 0 questions had a
generic/unusable answer (no "All of the above" style answers in this
module). Each candidate was queried against `find-existing.mjs` using its
answer text as the search term (one `node .../find-existing.mjs "<answer>"`
call per candidate, output parsed for `live`/`pending`/`no existing
record`).

**First-pass automated result:** live 15, pending 30, new 58 (103 total).

## Manual QA — the automated "live" bucket, again, mostly does not survive a close read

LANE-CARD.md §7 names this exact trap from the Foundation 1 pass: a
single-word or short generic answer string collides with an unrelated live
record sharing the word. FBS103's answer terms include several of that
shape (`one`, `parasite`, `hypertrophy`, `necrosis`, `pathogenesis`,
`microorganisms`, `20%`). Every one of the 15 automated "live" hits was read
against its actual source question before being trusted:

| Judgment | Count | Examples |
|---|--:|---|
| **Confirmed true positive** — same fact, safe to reuse | 5 | `facial vein` → `CON-FND-10446D757EB8E7` "Main veins draining the face"; `cytotrophoblast and syncytiotrophoblast` → `CON-OBS-CE9AE0A25B4C0B` (trophoblast bilayer); `the intraembryonic coelom` → `CON-DEV-65C2AEF8C5DB47`/`CON-DEV-90A4039B3F67A1` (coelom splits lateral-plate mesoderm); `hypertrophy` → `CON-MSK-0BE756765378A6` (exercise enlarges existing skeletal muscle fibres — matches the weightlifting stem exactly); `microorganisms` → `CON-INF-ABF1EA01540430` (antibiotics originally produced by microorganisms — matches the "natural penicillin source" stem) |
| **Reclassify live → pending** — the live hit itself was a false positive, but a genuine pending match turned up in the same result set | 1 | `mesenchymal cell`: the live hit (red-marrow fixed-cell list) is unrelated, but `docs/import-ready/concept/101-ISK-concepts.md` ("The active fibroblast comes from the mesenchymal cell and is built to synthesise protein") is the same fact as the FBS103 stem ("mother cell that differentiates into a fibroblast") |
| **Borderline / adjacent** — related topic, not the same specific fact; needs a human read before merging or minting | 1 | `cloacal membrane`: live hits describe the allantois/connecting-stalk *position relative to* the cloacal membrane after folding, not the FBS103 stem's actual ask (the bilaminar ectoderm+endoderm definition of the membrane itself) |
| **Homonym / unrelated false positive** — same word, different fact; reclassify toward "new" | 8 | `sartorius muscle` hit a lower-limb vessel-relations citation, not the "strap-like muscle" classification fact; `trigeminal nerve` hit a first-pharyngeal-arch embryology claim, not adult scalp sensory innervation; `20%` (GC-content stem) hit unrelated cardiac-filling and renal-tumour percentages; `vitamin K` hit warfarin/coumarin mechanism concepts, not the "gut-flora synthesis" fact the stem actually asks; `one` (axon count) hit ECG-lead and cardiac-cycle-timing concepts; `parasite` (definition stem) hit an eosinophil-defence citation; `necrosis` hit four different specific-disease necrosis facts (TB, malaria, endocrine, respiratory), none matching the "hepatocyte pyknosis in viral hepatitis" stem; `pathogenesis` hit rheumatic-fever and fatty-liver pathogenesis records, not a general-definition fact |

Net: of 15 automated "live" hits, **5 are trustworthy, 1 reclassifies to
pending, 1 is uncertain, and 8 are not** (folded into "new"). Same shape as
Foundation 1's finding (9 of 35 trustworthy there) — confirms this is a
property of the search method on this corpus, not a one-off.

## Spot-check — the "pending" bucket

A random sample of 10 of the 30 automated "pending" hits (seed 42, same
method as FBS102) was checked the same way:

| Key | Judgment |
|---|---|
| `microbiology-mycelium` | true positive — exact label match (ASU-INF-microbiology-concepts.md) |
| `anatomy-primary-cartilaginous-joint` | true positive — exact match (101-ISK-concepts.md) |
| `anatomy-frontalis` | **false positive** — the hit is about "norma frontalis" (an anatomical viewing position), not the frontalis muscle that elevates the eyebrows; a new homonym shape not seen in FBS102 |
| `parasitology-diagnostic-stage` | uncertain — hits are about specific worms' diagnostic stages (Strongyloides, Taenia, Hymenolepis), not a general definition of the term; the general-definition fact this stem actually needs may not exist yet |
| `embryology-pericardial-cavity` | **false positive** — hit is a clinical pericardiocentesis fact (Kasr 104-CPS), not the embryology fact (intraembryonic coelom cranial to the oropharyngeal membrane becomes the pericardial cavity) |
| `embryology-gastrulation` | true positive — exact match, multiple sources (101-ISK, AU-MED-102, SCU-FBS102's own overlay) |
| `parasitology-rhabditiform-larvae` | true positive — Helwan HU-GIT-301 records the same Strongyloides/rhabditiform-larvae fact |
| `biochemistry-aminoacyl-trna-synthetase` | true positive — exact match (ASU-MBG-translation-protein-synthesis-concepts.md) |
| `pharmacology-partial-agonist` | true positive — exact definitional match, multiple sources (108-INT, Kasr, Assiut) |
| `microbiology-continuous-cell-line` | true positive, weak — only one alias-level hit (O6U-IMP-106-new-concepts.md); label text not confirmed, flagged for a closer read at authoring time |

**7 of 10 clean true positives, 2 false positives, 1 uncertain** — looser
than Foundation 1's 10/10, so the remaining 20 pending hits are **not**
assumed clean; each needs the same read-the-actual-hit check at S2
authoring time, per LANE-CARD.md §7's standing instruction to re-query with
fuller context rather than trust the bare answer-word match.

## Checkpoint table

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit (corrected) | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| SCU-FBS103 | 138 (105 distinct) | 138/138 | 103 | 5 | 31 (30 automated + 1 reclassified from live) | 67 (58 automated + 8 reclassified from live + 1 borderline) | TBD — see below |

**Placement for new (67 candidates):** not assigned per-concept in this
Phase-0 pass, per the same rule as FBS102 (an S2 authoring decision).
Directional read from the subject breakdown and existing concept-id prefix
patterns seen in the `find-existing.mjs` hits above: Anatomy items (skull
muscles of mastication, facial vessels/nerves) place under `msk`, matching
FBS102's own skull-anatomy placement; Biochemistry (DNA replication,
nucleotide structure) places under `fnd`; Embryology places under the `dev`
family already used by the live/pending hits above (`CON-DEV-*`); Histology
places per specific tissue/body-system once the structure is known;
Microbiology and Parasitology place under `inf` (matching the `ASU-INF-*`
and Helwan `HU-GIT-301` hits seen in this pass); Pathology (general-pathology
definitions: hypertrophy, necrosis, pathogenesis) has no single clean
existing-lane precedent in this sample and needs a placement decision at S2;
Pharmacology places under `pharm`/its Kasr `108-INT` equivalent. The 1
Medical Ethics question repeats FBS102's own unresolved gap — **needs Omar**
ruling on placement, same as FBS102's 6 Ethics + 1 Community Medicine
questions (`SCU-FBS102-triage.md`'s Checkpoint section).

## Files

- `coverage/SCU-FBS103-triage-keys.txt` — one key per distinct question,
  grouped by subject, each annotated with its automated status and a
  question-text excerpt.
