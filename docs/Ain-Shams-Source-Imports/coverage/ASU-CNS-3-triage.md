# ASU-CNS-3 triage — Phase 0 sample

Module: **ASU-CNS-3** (Central Nervous System, Year 3 Term 1), ASU_Y3. Subject placement for the
new concepts below: **`neuro`** — confirmed in the shared 20-subject catalogue (`00-START-HERE.md`
§"cvs resp renal gi neuro endo msk pharm fnd dev …"), no open-question anchor problem here (unlike
ASU-IBM's biochemistry-of-metabolism cluster).

## Why ASU-CNS-3 is the first module

Chosen over the year's other high-volume module, ASU-UG, on evidence, not just the board's prior
note:

- **Most named, dated past-exam papers of any Y2/Y3 module.** Counting files directly under
  `.../Central Nervous System/All Subjects/Assessments/` that are dated/named exam papers (not
  formatives, not practical checklists, not subject-wise MCQ banks): **~22–23** — `cns 1st/2nd ass
  2018/2019/2020` (5), `CNS Assessment 1`, `CNS SECOND ASSESSMENT 2023`, `FIRST ASSESSMENT CNS 2023`,
  and 14 `EOM - …paper 1/2… CNS <year>` files (2018–2024, one pair of near-duplicate 2024 finals).
  This matches the board's standing note ("22 papers") almost exactly — confirmed by directory
  listing, not just the manifest's `examType` field (which is null on most of these; see below).
- **82 departmental/subject question-bank files** (`kindFolder=Questions`) — close to the board's
  "70 bank files" (the gap is parasitology/other minor-subject banks the board's estimate likely
  excluded).
- ASU-UG has a nominally higher raw `Assessments+Questions` count (36+128=164 vs CNS-3's 51+82=133),
  but a manual read of a UG "Questions" sample (`docs/Ain-Shams-Source-Imports/manifest/asu-y3-sources.json`)
  shows most of it is LMS "Attempt review" exports of weekly formative quizzes — informal,
  low-curriculum-value practice logs, not compiled past-exam banks. CNS-3's Questions folder is
  organised per-subject compiled MCQ files (Anatomy 16, Physiology 19, Pharmacology 15, Histology 12,
  Biochemistry 10, Pathology 8, Parasitology 2) with no comparable formative-quiz noise.
  `solvedStatus=solved_or_answered_label` rows are tied at 5 each (UG/CNS-3).
- CNS-3 has the largest total source count in Year 3 (430 rows) and its Term-2 twin `ASU-CNS-2` also
  ranks near the top of Year 2 (131 rows, 2nd-highest Assessments+Questions after ASU-ENDO-2) — per
  the board's curriculum-move note (Y2T2↔Y3 CNS = one concept/article, both year/module paths),
  triaging CNS-3 first sets up shared concept work for CNS-2 as a direct follow-on, not a second
  from-scratch triage.

**Decision: ASU-CNS-3 confirmed as first module.**

## Key-recovery method

Both sample papers below are **already-keyed revision/recall compilations** — the correct
answer/topic is stated immediately after the question number, before the distractor-free stem
("N- <answer/topic>\n<stem description>"), not a raw exam paper with hidden distractor options and
a separate answer key. This is the dominant format across CNS-3's subject-wise MCQ banks (student
Telegram-channel compilations, not scanned original exam papers with the paper's own 4–5 options
intact). **No OCR or highlight-rendering was needed for either sample** — both are native
`pdftotext -layout` text, `status` showed 0 garbled pages on both. This differs from ASU-IBM (visual
read required, CamScanner scan) and from the Kasr/Menoufia "answer hidden in a highlight" trap — flag
for whoever authors this module: **the embedded-answer format means these sources ship a key by
default, but they do not ship a full 4–5-option MCQ stem** — the authoring lane will need to write
plausible distractors itself (with citations), not transcribe them from the source.

The corpus is not uniformly this clean: `asu-y2-coverage.md`'s CNS-2 blocker list (same module family,
Term 2 twin) shows CamScanner/no-text-layer scans among the CNS lecture PDFs (biochemistry,
microbiology). CNS-3's readability index (`ASU-Y3-readability-index.md`, running as of this triage)
will name the garbled pages precisely; the two MCQ sources sampled here happened to be clean.

## Papers read

| Source (fileName) | Pages | Words/status | Questions | Key format |
|---|---:|---|---:|---|
| `EOM MCQs - ANATOMY CNS PAPER 1 MCQ.pdf` | 6 | native, 0 garbled | 81 | embedded (answer stated before stem) |
| `EOM MCQs - PHYSIOLOGY CNS PAPER 1 MCQ.pdf` | 5 | native, 0 garbled | 48 | embedded (answer stated before stem) |
| `EOM - paper 1 cns 2018.pdf` (cross-check only, not counted in totals) | 6 | native, 0 garbled | ~20 read | same embedded format; **content overlaps** the two banks above (e.g. "facial n. → nucleus solitarius", "C fibers → warm temperature" appear near-verbatim in both) — confirms these "papers" and "subject banks" substantially recycle the same underlying question pool across files, a real dedup risk the authoring lane must budget for |

## Block-level concepts (representative, not exhaustive)

### Anatomy MCQ (81 Qs → ~62 distinct concepts after collapsing repeats)

Cranial-nerve nuclei/pathways, cavernous-sinus relations, brainstem vascular syndromes, cerebellar
peduncle connections, and infratemporal-fossa anatomy dominate. Representative canonical-key-style
concepts: `tectospinal-tract.function.head-turning-to-visual-stimuli`,
`accessory-nerve.spinal-part.sternomastoid-innervation`,
`cavernous-sinus.contents.abducens-nerve-relation` (**live hit**, see below),
`trigeminal-nerve.motor-division.inferior-alveolar-branch`,
`cerebellar-peduncle.icp-afferents.dorsal-external-arcuate-fibers`,
`pica-occlusion.lateral-medullary-syndrome.contralateral-pain-loss`,
`broca-area.location.inferior-frontal-gyrus`,
`fourth-ventricle.csf-outflow.foramen-of-luschka-magendie`,
`trigeminal-nerve.motor-nucleus.sve-column-location`,
`infratemporal-fossa.boundaries.lateral-pterygoid-plate`,
`medial-medullary-syndrome.anterior-spinal-artery-territory`,
`facial-nerve.nucleus.solitary-nucleus-taste`,
`glossopharyngeal-nerve.nucleus.nucleus-ambiguus-motor`,
`conus-medullaris.adult-vs-neonatal-vertebral-level`,
`prefrontal-cortex.function.personality-behavior-change`,
`caudate-nucleus.neostriatum-component`,
`sphenopalatine-ganglion.postganglionic-fiber.deep-petrosal-nerve`. Several items are the
**same fact asked twice** in the same file (e.g. inferior alveolar nerve motor division: Qs 4 and
53; C1 nerve rami: Qs 10 and 52; lateral pterygoid plate: Qs 22 and 55) — a real duplicate-key risk
the authoring lane must collapse, not author as two questions.

### Physiology MCQ (48 Qs → ~40 distinct concepts after collapsing repeats)

Pain pathways, cerebellar/basal-ganglia motor circuits, and spinal-cord lesion syndromes dominate.
Representative concepts: `gate-control-theory.pain-modulation.mechanism`,
`brown-sequard-syndrome.contralateral-pain-ipsilateral-proprioception`,
`syringomyelia.dissociated-sensory-loss.jacket-distribution`,
`muscle-spindle.gamma-motor-neuron.intrafusal-synapse`,
`cerebellar-lesion.signs.hypotonia-dysdiadochokinesia`,
`basal-ganglia.indirect-pathway.subthalamic-nucleus-disinhibition`,
`hemiballismus.subthalamic-nucleus-lesion` (**appears in both papers** — anatomy Q28/Q36,
physiology Q28 — same fact, collapse to one concept), `referred-pain.gallbladder-to-scapula-tip`,
`periaqueductal-gray.enkephalin-analgesia`, `crossed-extensor-reflex.mechanism`,
`parkinson-disease.gpi-subthalamic-oscillation.static-tremor`,
`flocculonodular-lobe.function.equilibrium` (also duplicates anatomy Q28 "folliculonodular
function").

## Live-hit spot-checks (`find-existing.mjs`, 22 terms across both blocks)

| Term | Result |
|---|---|
| `tectospinal` | No hit — safe to create |
| `corticospinal` | No hit — safe to create |
| `Broca` | Substring false-positive only (matches inside "fibrocaseous") — treated as no-hit |
| `hemiballismus` | No hit — safe to create |
| `lateral medullary` | No hit — safe to create |
| `PICA` | Substring false-positive only (matches inside "apical") — treated as no-hit |
| `medial medulla` | No hit — safe to create |
| `cavernous sinus` | **1 hit** — `CON-FND-0D9D7A5BD1305F` "Abducens nerve relation to the cavernous internal carotid artery" — directly covers anatomy Q61 ("abducent N. inside the cavernous sinus"); **update, do not re-mint** |
| `trigeminal ganglion` | No hit — safe to create |
| `foramen of Luschka` | No hit — safe to create |
| `cuneocerebellar` | No hit — safe to create |
| `auriculotemporal` | No hit — safe to create |
| `solitary nucleus` | No hit — safe to create |
| `subthalamic nucleus` | No hit — safe to create |
| `Brown-Sequard` | No hit — safe to create |
| `syringomyelia` | No hit — safe to create |
| `gate control theory` | No hit — safe to create |
| `muscle spindle` | No hit — safe to create |
| `golgi tendon organ` | No hit — safe to create |
| `dysdiadochokinesia` | No hit — safe to create |
| `referred pain gall bladder` | No hit — safe to create |
| `raphe magnus` | No hit — safe to create |
| `crossed extensor reflex` | No hit — safe to create |
| `periaqueductal gray` | No hit — safe to create |

**Caveat:** `find-existing.mjs` does raw case-insensitive substring matching with no word
boundaries — two queries above ("Broca", "PICA") hit only because those letters appear inside
unrelated words ("fibroCAseous", "aPICAl"). Short/common-substring queries need manual review of
the hit row, not just a pass/fail count; the authoring lane should re-run the full search on every
concept's final canonical key before minting (`00-START-HERE.md` §4), not reuse this table verbatim.

**Unlike ASU-IBM's biochemistry (heavy overlap with Kasr biochem building blocks)**, CNS-3's
neuroanatomy/neurophysiology detail shows almost no overlap with anything currently live or pending
— only the cavernous-sinus/abducens fact hit. This is a genuinely under-covered area of the
catalogue relative to Kasr 101-ISK/AU-105 anatomy (which are musculoskeletal-anatomy-heavy per their
own lane cards) — worth flagging to the chief of staff as a coverage gap, not just an ASU finding.

## Checkpoint table

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| ASU-CNS-3 (sample) | 129 | 129 | ~95 (62 anatomy + 40 physio, minus ~7 cross-block duplicates) | 1 | 0 | ~94 | `neuro` (confirmed valid subject code) |

**This is a Phase-0 sample, not a full-module triage.** 129 of an estimated several-thousand
questions across CNS-3's ~23 papers and 82 banks were read. The remaining papers/banks are listed in
order in `coverage/ASU-Y3-priority-sources.md` under `## ASU-CNS-3`. Recommend the authoring lane
finish the full CNS-3 triage (all subject MCQ banks first — they are the cleanest native-text,
already-keyed source; the ~14 raw dated `EOM - paper N` files next, cross-checking for the recycled-
content overlap noted above; the 6+ pharmacology/anatomy "[old]" tagged banks and dept books last)
before any concept is minted, per LANE-CARD §4/§6 and the "TRIAGE APPROVED" gate.

## Addendum (cluster 2, physio-mcq)

The physiology paper's page count matched the sample (5 pp, native, 0 garbled), but its item count
did not: `pagetext.mjs show` on all 5 pages returns **65 questions**, not the 48 this triage counted
(48 stops mid-page-3; items 49-65 run through page 4 and into page 5). Cluster 2 authored only the
scoped 48 (44 distinct facts after collapsing duplicates, matching this triage's "~40" estimate
closely), per the dispatch's explicit "first 48 items" scope — **items 49-65 are untriaged and
unauthored**, a real follow-on cluster, not a gap hidden in this count. Recommend the next CNS-3
cluster start there (`## ASU-CNS-3` in `coverage/ASU-Y3-priority-sources.md`) rather than a fresh
paper, since the source is already open, cached and partially triaged.

Cross-paper duplication with the anatomy cluster ran deeper than the two facts (hemiballismus,
flocculonodular/equilibrium) flagged above: physio Q3 (area 4 function) also turned out to be an
exact duplicate of anatomy's own Q1 concept, caught only by re-running `find-existing.mjs`-equivalent
checks per item rather than trusting this triage doc's spot-check table alone. Three more items
(Q11, Q13, Q39) duplicated pending concepts in Alexandria's AU-MED-203 physiology batch, and one
(Q34) duplicated a live Kasr concept — none of these were visible from this triage's own 22-term
spot-check, which only covered anatomy-paper terms. **The lesson for the next cluster**: the
Phase-0 spot-check table is a starting point, not a substitute for a fresh per-item search once the
actual items are in hand.

## Addendum (cluster 3, physio-mcq items 49-65 + second paper)

Finished the physiology paper: read pages 4-5 in full (17 items, matching the
addendum above exactly — items 49-63 on p4, 64-65 spilling onto p5). 10
authored (10 new mints; one fact, kinin/bradykinin as a pain mediator, matches
a pending Helwan HU-BMS-102 pathology concept but was minted fresh since that
concept has no article record anywhere to link a question to — logged as a
`rejected_merge_candidate_id`, not silently ignored), 7 held as within-file
duplicates of facts cluster 2 already authored in items 1-48 (crude touch/
A-delta, gamma motor neuron/intrafusal, ankle clonus, corticostriatal
glutamate, kinetic-vs-static tremor, spinocerebellar damping, and — cross-
paper — gracile/cuneate kinesthesia already covered by this lane's own
cluster 1 anatomy Q42). The physio-mcq cluster (cluster 2 + 3 combined) is
now 54 authored / 11 held / 0 remaining / 65 total — fully triaged and
authored.

Opened the next paper per `coverage/ASU-Y3-priority-sources.md` §ASU-CNS-3:
`EOM - CNS FINAL PAPER 1 2024.pdf` (source `src_a5a15b69f093397250ab`,
3 pages, native text, 0 garbled). Page 1 is a 27-item embedded-answer MCQ
block spanning biochemistry/anatomy/physiology/pharmacology (unlike the
single-subject anatomy/physio banks cluster 1/2 read); pages 2-3 are a
9-item essay block (short-answer facts, no printed options at all — this
cluster converted 10 of those facts into standard MCQs with its own
distractors). Of the MCQ block's 27 items: 4 (items 1-4) are biochemistry,
out of this lane's neuro subject scope and not seeded; 1 (item 5) is an
unrecoverably ambiguous printed key (a bare "T5" answer with no stem
context); 1 (item 17) is diagram-dependent (an explicit "رسمة" — drawing —
reference with no printed text stem); 13 are cross-paper duplicates of
facts already authored in this lane's own cluster 1 anatomy or cluster 2/3
physio batches (paracentral lobule, rubrospinal tract, gate control theory,
syringomyelia, stretch reflex, motor learning/climbing fibres, foramen of
Luschka/Magendie, deep petrosal nerve, inferior petrosal sinus,
hemiballismus, and — same-cluster — the primary-motor-cortex/contralateral-
hemiplegia fact shared with this cluster's own physio-mcq-q52); the
remaining 10 (items 6, 10, 11, 13, 15, 16, 19, 20, 22, 24) are new mints.
Of the essay block's 9 items (10 discrete facts, one essay item yielding
two), 1 (Parkinson's static-tremor mechanism) duplicates cluster 2's own
physio concept; the other 10 facts are new mints. `final2024-mcq` cluster:
20 authored / 14 held / 0 remaining / 34 total.

This cluster's combined output: 30 authored (30 new mints), 21 held — see
`coverage/ASU-CNS-3-LEDGER.md`. `coverage/ASU-CNS-3-triage-keys.txt`
extended with all `physio-mcq-q49`..`q65` and `final2024-mcq-q05`..`q38`
keys (biochemistry items 1-4 excluded from the key list, not "remaining").
Full per-item search-before-mint was re-run per item, not reused from this
triage doc's Phase-0 spot-check table, per the addendum's own lesson above —
several near-duplicates only surfaced this way (e.g. the internal-capsule-
vs-cortex spastic-hemiplegia distinction against Alexandria's pending
AU-MED-203 concept, kept as a `rejected_merge_candidate_id` rather than
merged, since the lesion site genuinely differs).

## Needs Omar

- None yet identified specific to CNS-3 (unlike ASU-IBM/Fayoum). The corpus is source-rich; no
  missing-material gap found in this sample.
- Curriculum-move handling for CNS-2/CNS-3 (Y2T2↔Y3, one concept/article with both year/module paths,
  questions keep the year sat) is a standing board ruling already — the authoring lane should confirm
  it still applies unchanged before writing the first CNS-2/CNS-3 shared concept.
