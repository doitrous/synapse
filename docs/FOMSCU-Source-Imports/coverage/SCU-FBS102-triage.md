# SCU-FBS102 (Foundation 1) — S3 first-module triage

Foundation 1 was selected as the first module (13-orchestration.md §5) because it has both
the richest already-keyed exam material of any FOMSCU Year 1 module (5 own-source JSON
papers, 100% answered and explained) and the deepest lecture-material coverage (30
files across Anatomy, Biochemistry, Ethics, Genetics, Histology, Physiology — see
`coverage/SCU-Y1-priority-sources.md`).

## Sources triaged

All five are structured JSON (already extracted, no PDF reading needed for this pass —
`extraction_note` in each file: "Questions copied from public Firestore document
lectures/{id}...HTML wrappers stripped to text...No questions invented"). One additional
JSON exists under `_Needs Review - Related FOMNINU/` but is **excluded** — it is FOMNINU
(a different faculty), not FOMSCU, and this lane triages FOMSCU only.

| Source file | Questions | Keys recovered | Method |
|---|--:|--:|---|
| `06 EOM Exams/EOM - Foundation 1 2026 - FOMSCU MID - MCQ.json` | 22 | 22/22 | pre-extracted JSON, `answer`+`explanation` per item |
| `07 EOY Exams/EOY - Foundation 1 2026 - FOMSCU Final - MCQ.json` | 57 | 57/57 | same |
| `03 Questions and QBank/Formative and Past Exams 2021 - MCQ.json` | 82 | 82/82 | same |
| `03 Questions and QBank/Formative and Past Exams 2022 - MCQ.json` | 61 | 61/61 | same |
| `03 Questions and QBank/Formative and Past Exams 2023 - MCQ.json` | 20 | 20/20 | same |
| **Total (raw)** | **242** | **242/242** | |
| **After exact-text dedup** | **168 distinct** | **168/168** | normalized question text; repeats across the 2021-2023-2026 papers collapsed |

Distinct-question count by subject (`part` field in the source JSON):

| Subject | Distinct questions |
|---|--:|
| Anatomy | 38 |
| Biochemistry | 33 |
| Histology | 31 |
| Physiology | 28 |
| Genetics | 27 |
| Medical Ethics | 6 |
| Embryology | 4 |
| Community Medicine | 1 |

## Concept-candidate method

Exact-text dedup (168 questions) collapses onto **160 distinct (subject, answer) concept
candidates** — 8 questions share an answer already covered by another question in the
same subject; 0 questions had a generic/unusable answer (e.g. "All of the above"). Each
candidate was queried against `find-existing.mjs` using its answer text as the search
term (script: ad hoc, not committed — one `node .../find-existing.mjs "<answer>"` call
per candidate, output parsed for `live`/`pending`/`no existing record`).

**First-pass automated result:** live 35, pending 45, new 80 (160 total).

## Manual QA — the automated "live" bucket does not survive a close read

`00-START-HERE.md` §4 warns that `find-existing.mjs` is a plain substring match and a
short, generic query is exactly the trap that produces false hits. This lane's answer
terms are often single common words ("repair", "rounded", "conduction", "effector",
"exocytosis") that collide with unrelated live concepts sharing the word. Every one of
the 35 automated "live" hits was read against its actual source question (not just the
query string) before being trusted:

| Judgment | Count | Examples |
|---|--:|---|
| **Confirmed true positive** — same fact, safe to treat as live-hit | 9 | `operator` → lac operon operator concept (`CON-FND-B5B2112BF2CADE`); `amniotic cavity`, `endomysium`, `mast cells`, `plasma cells`, `active transport`, `carbon dioxide`, `systolic pressure`, `cloacal membrane`/allantois-folding |
| **Homonym / unrelated false positive** — same word, different fact; reclassify toward "new" pending re-query at S2 | 21 | `cristae` hit vestibular-canal cristae, not mitochondrial cristae; `conduction` hit AV-nodal conduction, not heat conduction; `effector` hit an antibody-isotype concept, not a reflex-arc effector; `mitosis` hit an ovarian-follicle concept; `tight junction` hit a Sertoli-cell-specific concept for a generic-membrane-barrier question; plus `cholesterol`, `essential fatty acids`, `l amino acids`, `mitochondria`, `repair`, `reverse transcriptase`, `exocrine glands`, `fibroblasts`, `filaments`, `smooth muscle`, `rounded`, and the 5 single-generic-word queries (`bilateral`, `fibers`, `synergist`, `ventral`, `two`) |
| **Borderline / adjacent** — related topic, not the same specific fact; needs a human read before either merging or minting | 5 | `medulla oblongata` (citation mentions it in a different context), `vitamin c` (hit is about gastrectomy-caused deficiency, question is about scurvy generally), `lysosomes`, `silver stain`, `exocytosis` |

Net: of 35 automated "live" hits, **9 are trustworthy, 26 are not** (21 reclassified,
5 flagged uncertain). The corrected live-hit count for the checkpoint table below is **9**,
with the 26 folded into "new" (provisional — a proper `find-existing.mjs` pass with fuller
context, not just the bare answer word, should be re-run at S2 authoring time; that is the
manual's own standing instruction, not a gap specific to this lane).

## Spot-check — the "pending" bucket

A random sample of 10 of the 45 automated "pending" hits (seed 42) was checked the same
way — reading the actual `find-existing.mjs` top hit against the source question:
`reticular connective tissue`, `primary cartilaginous`, `coronal plane`, `glyceraldehyde
3-phosphate`, `compound lipids`, `pronation`, `membranous ossification`, `cyclins`,
`cranial nerve x`, `golgi apparatus` — **all 10 were genuine true positives**, hitting the
matching Kasr `101-ISK`/`102-INT`/`103-BMS` MCQ-concept batches or the `AU-MED-105`
histology article set. This is expected: FOMSCU Foundation 1's basic-science content
(amino acids, lipid classes, cell biology, general histology, osteology) is largely the
same foundational curriculum Kasr and Alexandria Year 1 already cover, just reached from
a different exam. The other 35 pending hits were not individually re-verified within this
Phase-0 pass — flagged as first-pass-only, high-confidence given the clean 10/10 sample,
not exhaustively confirmed.

## Checkpoint table

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| SCU-FBS102 | 242 (168 distinct) | 242/242 | 160 | 9 | 45 | 106 | TBD — see below |

**Placement for new (106 candidates):** not assigned per-concept in this Phase-0 pass —
that is an S2 authoring decision, not a triage one. Directional read from the subject
breakdown: Biochemistry/Genetics/general-cell-biology items (amino acids, lipid classes,
enzymes, cell cycle, inheritance) predominantly belong under `fnd` (foundational, per
`SHARED-TOOLCHAIN.md`'s subject list); named-structure Anatomy/Histology items (specific
muscles, cranial nerves, connective-tissue types) place by body system once the specific
structure is known; the 6 Medical Ethics and 1 Community Medicine questions have no
canonical FOMSCU subject id yet — **needs Omar** ruling on whether Ethics/Community
questions belong under an existing subject (`pop` per `SHARED-TOOLCHAIN.md`'s "Community
medicine → pop" rule) or need their own placement discussion given FOMSCU's own Ethics
module content (Informed Consent, Physician-Patient Relationship — see
`Ethics/01 University Material/`, 3 lecture files, 76 pages for the physician-patient one).

## Files

- `coverage/SCU-FBS102-triage-keys.txt` — one key per distinct question, grouped by
  subject, each annotated with its automated status and a question-text excerpt.
