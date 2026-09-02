# AU-MED-203 · Nervous System & Professionalism, Medical Law and Ethics — question-led triage

Module `AU-MED-203`, Year `AU_Y2`. Selected as the S3 first-module triage target — richest
keyed exam material of any AU Year 2 module: 634 total files (largest of the five), 138
`Department Questions` files (most of any module), and — unique among Year 2 modules — a
dedicated 87-page "Previous Years…with answers" compilation, a full Mock-2027 question+
answer pair, 5 separately-keyed weekly EOM finals, and the four Workshop Quizzes triaged in
full below. See `coverage/AU-Y2-priority-sources.md` for the cross-module ranking and the
categorizer-gap note (this module's real EOM papers are filed under `Department Questions`,
not `End of Module paper` — a manifest classifier bug, not a corpus gap).

## Scope of this pass

Only the four Workshop Quizzes were read question-by-question and checked against live/
pending state. They are the smallest, cleanest fully-keyed source in the module (40 pages
total, native text throughout, no OCR needed) and give a representative first read of the
module's concept mix before the larger banks (182-280 pages each) are triaged. Everything
else identified for this module is catalogued in `AU-Y2-priority-sources.md` and queued,
not triaged, here.

## The four sources

| File | sourceId | Pages | Questions | Key format |
|---|---|--:|--:|---|
| `MCQs - 1st Quiz.pdf` | `src_9a9b871f19d313ffca54` | 10 | 34 | Native-text answer table, p10 |
| `MCQs - 2nd Quiz.pdf` | `src_e0ce8dbbc37fcf3b12e9` | 10 | 35 | Native-text answer table, p10 |
| `MCQs - 3rd Quiz.pdf` | `src_b016b1b1c534c724e141` | 9 | 31 | Native-text answer table, p9 |
| `MCQs - 4th Quiz.pdf` | `src_caec6d06d9d48d9aaaa2` | 10 | 34 | Native-text answer table, p10 |

All four: `Nervous System/General/Questions/Workshop/`, `textLayer: native`, 0 garbled
pages, no OCR needed. Read in full (every page), keys transcribed from each file's own
final-page answer table — same reliable format across all four, cross-checked against a
known fact (e.g. Quiz 1 Q9 cavernous sinus → abducent nerve, correct per the key).

**Key-recovery method note:** a fifth file in the same module,
`General/Questions/Mocks/MCQs - MCQ CNS with answers.pdf`, looked like an easy fifth
source (6 pages, filename claims answers) but its extracted text carries a `•` bullet
before one option per question that does **not** reliably mark the correct answer — Q1
("trochlear nerve supplies which muscle?") has the bullet on option B (medial rectus)
while the correct answer is C (superior oblique), verified against basic anatomy. This is
the same visual-key trap already flagged lane-wide (Menoufia, 2026-08-27): the source's
real answer marking (highlight/bold/color) did not survive plain-text extraction, and the
bullet glyph is decorative, not a key. **Not counted as keyed. Not triaged.** Needs the
visual-key extractor tool (dispatched, not yet on `main`) or a rendered-page read before
its questions can be trusted.

## Question-by-question topics and hit status

134 questions read; every one keyed. 20 of the 134 reference a figure/diagram the text
extraction cannot show (`labeling_image` candidates — leave `labeling_image` blank,
`media_recommendations: Priority: required` per LANE-CARD §4): Quiz 1 Q31-34, Quiz 2
Q13-15/22/31-32, Quiz 3 Q5/8/19-20/28, Quiz 4 Q3/9/17/19/29.

After collapsing near-duplicate angles on the same fact (muscle spindle physiology tested
4×, cavernous sinus contents 2×, CSF chloride/sugar in meningitis 2×, thoracic-cord nuclei
2×, internal capsule 2× — each collapsed to one concept), **134 questions → ~121 distinct
concepts tested**.

`find-existing.mjs` was run against ~55 of the most specific/identifiable concept terms
(named structures, named syndromes, named nuclei — the terms most likely to already have a
canonical record). Generic/compound phrasings that don't reduce to a clean search term
(e.g. "occlusion — two afferent neurons sharing a discharge zone", "definition of ganglia")
were not independently searched this pass and are conservatively bucketed as NEW pending a
real check before minting — **this checkpoint is a lower bound on live/pending, not a
verified final split.**

**Confirmed HIT-LIVE (4):**
- Abducens nerve runs within the cavernous sinus cavity (`CON-FND-0D9D7A5BD1305F`) — Quiz 1 Q9
- Climbing fibers, one-to-one with Purkinje cells (`CON-NEU-8A71D5AFDB8D21` /
  `CON-NEU-C65857AA4DFCF8`) — Quiz 1 Q13
- Meissner corpuscle as a fine-touch receptor (`CON-NEU-57EC6C7FBCDD1E`) — Quiz 1 Q16
- Dentate nucleus as the most lateral deep cerebellar nucleus (`CON-NEU-2F4980F4507C06`) —
  Quiz 4 Q31

**Confirmed HIT-PENDING (2):**
- Ciliary ganglion (`docs/import-ready/concept/102-INT-mcq-concepts.md`,
  `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md`) — Quiz 1 Q4
- Edinger-Westphal nucleus (same two files) — Quiz 2 Q3

**Near-misses checked and ruled NOT a hit** (topically adjacent record exists, but tests a
different fact — recorded so a later pass doesn't re-search these): corneal transparency
(live/pending hits are GAG biochemistry, not corneal layer anatomy); palatine tonsil (hits
are histology/capsule structure, not embryological pouch origin); rhodopsin (hits are
biochemistry of photobleaching, not the retinal layer where it's made); enkephalin (hit is
adrenal medulla secretion, not pain-gate mechanism); sternocleidomastoid (hit is clavicle-
fracture biomechanics, not head-tilt action); ansa cervicalis (hit is an unrelated citation
row, not the omohyoid-innervation fact).

**Checked and confirmed NEW (~49 specific terms, non-exhaustive list):** ultimobranchial
body, Argyll-Robertson pupil, area 22, anterior choroidal artery/internal capsule, corpus
callosum (long association fibers), basilar membrane tonotopy, cerebellar glomeruli,
paracentral lobule, stria vascularis, cogwheel rigidity, digastric dual innervation, REM
sleep physiology, gate theory of pain, auriculotemporal nerve, otolith organs, inferior
petrosal sinus, Clark's nucleus, CSF chloride in meningitis, internal capsule lesion
(spastic hemiplegia), Brown-Séquard syndrome, olfactory nerve fiber type (SVA), Golgi
tendon organ, flocculonodular lobe (balance), maxillary nerve (upper lip), muscle spindle
afferents, superior salivatory nucleus, foramen spinosum, alpha-gamma coactivation, slow-
wave sleep EEG, rods vs cones, neural crest derivatives, internal medullary lamina,
cochlear duct anatomy, posterior inferior cerebellar artery, sixth pharyngeal arch,
lateral horn (sympathetic), inferior cerebellar peduncle tracts, loudness/basilar-membrane
amplitude, cutaneous hyperalgesia, substantia nigra location, spinal shock, mass reflex,
occlusion (afferent convergence), definition of ganglia, glutamate as excitatory
transmitter, precuneus blood supply, posterior superior alveolar nerve, tuberculum impar,
optic tract lesion (homonymous hemianopia), third/fourth pharyngeal pouch/arch
derivatives, tectum (colliculi).

**Not independently searched (bucketed NEW, needs a real check before minting — ~66
remaining terms):** every image-labeled item (20 questions — these need the figure
identified before a concept can even be named), plus the remaining lettered-option facts
not listed above (e.g. area of cerebral cortex representations, thalamic nucleus functions,
specific artery-origin facts, sleep-stage EEG details, receptor-adaptation physiology).

## Checkpoint table

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| AU-MED-203 (Quizzes 1-4 only) | 134 | 134 | ~121 | 4 (confirmed) | 2 (confirmed) | ~115 (49 confirmed + ~66 not yet individually searched) | TBD — see field_notes; concepts split roughly Anatomy (cranial nerves, pharyngeal arch derivatives, cerebellar/thalamic nuclei), Physiology (reflexes, receptor physiology, sleep, pain pathways), Histology (retina layers, cerebellar cortex layers) |
| AU-MED-203 Week 1 EOM Final (first 50 of 151) | 48 | 48 | 47 | 0 | 1 (confirmed) | 47 confirmed NEW, all minted | Anatomy 19 (facial nerve/scalp, dural folds/venous sinuses), Physiology 23 (general sensory receptor physiology, muscle spindle/Golgi tendon organ), Histology 5 (muscle spindle, craniospinal ganglion, Pacinian corpuscle) |
| AU-MED-203 Week 1 EOM Final (Q51-100 of 151) | 50 | 50 | 38 | 0 | 0 | 35 confirmed NEW, all minted; 3 reuse existing week1a/Quiz-3-4 concepts | Anatomy 31 (dural folds/cavernous sinus extension, facial nerve/scalp, posterior triangle/neck veins/lymphatics), Physiology 4 (ascending sensory pathways, receptor coding) |
| AU-MED-203 Week 1 EOM Final (Q101-151 of 151, final tail) | 51 | 51 | 47 | 0 | 1 (confirmed, sparse overlay) | 45 confirmed NEW, all minted; 2 within-batch collapses (thermoreceptor fibre type, anosmia/cribriform) | Anatomy 26 (neck triangles, cavernous sinus, cranial nerve classification, extraocular muscles, olfactory/optic pathways), Physiology 19 (dorsal column/spinothalamic modalities, sensory receptor physiology), Histology 2 (muscle spindle, Meissner corpuscle) |

## Week 1 EOM Final — chief-of-staff STEP2 dispatch, lane 4, 2026-09-02

`EOM MCQs - CNS- week 1 final.pdf` (`src_f5698c4e06db91539a01`, twinPreferred=true over the
`[from Alexandria University Updated]` copy per manifest) — `Nervous System/General/
Questions/Alpha team/`, `textLayer: native`, 37 pages, no OCR needed. Filed under manifest
`category: Department Questions` (the §4 categorizer-gap bug — this is a real dated weekly
EOM final, `EOM MCQs -` prefix not recognised as `EOM -`). 151 numbered MCQs total, each
page self-contained: 5 questions with their own inline per-page answer line (not one
end-of-file table like the Workshop Quizzes) — read `status` → `show` ≤3 pages/call per
LANE-CARD §3, no `keys` render needed (native per-page text keys, cross-checked against
basic anatomy/physiology on a sample before trusting the rest).

This pass read and triaged the first 50 numbered questions: Q1-28 (physiology/histology,
dated "Sun 9th Feb" on p2) and Q31-50 (anatomy, dated "Mon 10th Feb" on p9). Q29-30 do not
exist in the source (the numbering jumps 28→31); 4 short-answer/discuss items on p8 and p36
are essay questions, not MCQs, and were excluded, not counted as triaged. All 48 keyed MCQs
were searched via `find-existing.mjs` before minting; 47 confirmed NEW (no live or pending
hit for any of them, incl. against ASU-CNS-3's concept files and Kasr). One (Q47, cavernous
sinus lateral-wall contents III/IV/V1/V2 except mandibular) was an exact hit against a live
ASU-CNS-3 concept + question pair (not yet imported to production) and was HELD as
duplicate-of, not re-authored — see `AU-MED-203-LEDGER.md`'s Held section. Q101-151 (past
this pass's first-50 read) remain untriaged for a future pass.

## Week 1 EOM Final, Q51-100 — lane 5, 2026-09-02

Continued directly from lane 4's stop point (`00aa997a`, Q1-50 done, Q101-151 remaining).
Read `status` → `show` ≤3 pages/call, pages 13-24 (Q51-100 span these 12 pages at 5
questions/page, with two intervening essay-question pages at p15 and p22 that reset their
own 1-6 numbering and were excluded, not counted). Q51-98 and Q100 (49 questions) keyed
from each page's own inline answer line and authored; **Q99 held** — the extracted text
carries only 3 answer options (a-c), no fourth choice, confirmed via `pagetext.mjs grep`
against the raw text (not an OCR artifact) — a genuine source defect, not authored rather
than inventing a distractor.

All 49 keyed questions were checked via `find-existing.mjs` (label/alias/canonical_key/
definition terms) against live state, every pending batch (incl. ASU-CNS-3, Kasr) and this
module's own quiz1-4/week1a concept files before minting. This half of the paper continues
directly into topics the first half (Q1-50) had already opened — dural folds, the cavernous
sinus, sternocleidomastoid — so several questions were cross-checked BY HAND against the
already-minted week1a/Quiz-3-4 concept list (not just `find-existing.mjs`, whose exact-
substring matching missed at least one same-fact restatement): 3 questions (week1-q55, a
straight-sinus-formation restatement; week1-q93, a stimulus-intensity-coding restatement)
reuse an existing week1a concept outright, and 3 more (week1-q74/75/86) reuse the existing
Workshop Quiz 3-4 sternocleidomastoid-action concept. Within this half's own 49 questions,
8 near-duplicate angles on the same fact were collapsed to one concept each per the
module's established precedent (occipital-artery/anterior-auricle, orbicularis-oculi-
orbital-part-action, facial-artery-branches, great-auricular-nerve/angle-of-mandible x3,
buccal-branch-mandibular-vs-facial, second-arch-facial-expression-muscles, buccinator-
function, ophthalmic-nerve-branches) — 35 concepts minted in total for 49 questions, 38
distinct concepts tested overall. No HIT-LIVE or HIT-PENDING found this pass. Two printed
keys diverge from standard teaching and are kept per LANE-CARD with doubts recorded on the
concept record: week1-q92 (thermal sensation lesion localisation — the key's laterality
appears inverted against the standard crossed spinothalamic pathway) and week1-q94
(position-sense receptors — the source's "tractile" option is read literally as a probable
typo for "tactile"). Q101-151 remain untriaged for a future pass.

## Week 1 EOM Final, Q101-151 (final tail) — lane 6, 2026-09-02

Continued directly from lane 5's stop point (`810043d1`, Q51-100 done, Q101-151 remaining —
the last 51 items of the 151-question paper). Read `status` → `show` ≤3 pages/call, pages
25-35 (Q101-151 span these 11 pages at 5 questions/page, with one intervening essay-question
page at p29 that reset its own 1-6 numbering and was excluded, not counted; p35 carries 6
numbered questions instead of 5, closing the paper exactly at Q151). All 51 questions keyed
from each page's own inline answer line. **Q130 held**: the extracted text carries only 2
answer options (true/false), below the 4-5 option contract `emit-mcq.mjs` enforces — a
genuine source defect (a true/false item embedded in an MCQ paper), confirmed via
`pagetext.mjs show` (not an OCR artifact); per LANE-CARD-Y2's standing rule and lane 5's
week1-q99 precedent (<4 options → hold), not authored. **Q149 reused via sparse overlay**:
"Which nerve goes through the lateral side of the cavernous sinus?" (key: oculomotor) tests
the same underlying fact as the ASU-CNS-3 lateral-wall concept (`CON-NEU-94513EC37B29B8`,
already reused once for the held week1-q47 in the Q51-100 pass) — but this item's own stem
and distractor set (optic/olfactory/oculomotor/hypoglossal) are simpler and materially
different from week1-q47's near-exact "EXCEPT ... III/IV/V1/V2" duplicate, so it earned its
own sparse-overlay question (`pending-live/AU-MED-203-cns3-overlay-questions.md`) rather than
a bare hold with no new question at all. 49 questions authored and emitted.

All 49 emitted questions were checked via `find-existing.mjs` (label/alias/canonical_key/
definition terms) against live state, every pending batch (incl. ASU-CNS-3, Kasr) and this
module's own quiz1-4/week1a/week1b concept files before minting; `find-existing.mjs` alone
was cross-checked by hand-reading candidate hits' full record bodies per LANE-CARD-Y2's "the
exact-substring match missed 3 of its own module's concepts" warning from lane 5. Within this
half's own 51 questions, 2 near-duplicate angles on the same fact were collapsed to one
concept each: week1-q107/week1-q119 (cutaneous thermoreceptor A-delta/C fibre innervation,
restated with a different option set) and week1-q131/week1-q148 (anosmia from olfactory nerve
injury, restated without the cribriform-plate vignette) — 47 concepts minted in total for 49
questions, 47 distinct concepts tested overall (no full reuse of an existing live/pending
concept beyond the Q149 overlay). Four printed keys diverge from standard teaching and are
kept per LANE-CARD with doubts recorded on the concept record: week1-q112 (the internal
carotid artery is keyed as NOT a carotid-triangle content, against the standard content list
— most plausibly conflating triangle membership with the separate true fact that the ICA
gives no branches in the neck), week1-q124 (oculomotor nerve keyed as supplying superior
oblique via an "all the above" option, against standard extraocular innervation — and against
this same paper's own, correctly-keyed week1-q133), week1-q127 (dorsal column lesion patients
keyed as NOT identifying position with eyes open, against the standard Romberg-sign teaching
that visual compensation is preserved with eyes open) and week1-q126/week1-q129 (pressure
sense keyed to the ventral spinothalamic tract rather than the dorsal columns — an internally
consistent convention across this specific paper, not necessarily universal, recorded as a
milder note rather than a full doubt). Two image-labeled figure blocks (4 questions:
week1-q136/137 muscle spindle, week1-q139/140 Meissner's corpuscle) have `labeling_image`
left blank and `media_recommendations: Priority: required` per LANE-CARD §4. This closes out
the Week 1 EOM Final paper (Q1-151) in full: 145 authored, 4 held, 0 remaining.

## Not triaged this module (queued, see priority-sources doc for the full list)

- 2 stream-specific EOM finals (`Final CNS مصريين 2027`, `Final CS وافدين 2027`)
- Mock 2027 question+answer pair (43pg each)
- `EOM MCQs - Previous Years CNS MCQ with answers.pdf` (87pg — largest single keyed source
  in the module)
- Week 2 EOM Final (`EOM MCQs - CNS- week 2 Final.pdf`, `src_70b2ac8853db17b047ea`, twinPreferred
  over the `[from Alexandria University Updated]` copy, 27pg, `textLayer: native`) — surveyed
  by lane 6, 2026-09-02, not triaged in depth: 120 numbered MCQs (Q1-120, two essay-question
  pages at p15/p26 excluded), same reliable per-page inline answer-key format as Week 1 EOM
  Final, sampled at p2-3, p13-15 and p24-26 (start, middle, end) with every sampled page
  cleanly keyed and no garbling/OCR/visual-key-trap signs — **100% keyed on this sample,
  triage-ready for a future authoring pass**, not yet read question-by-question or searched
  via find-existing.mjs.
- 2 further weekly EOM finals (`CNS- week 3/4+5 Final`, page counts not yet checked this pass)
- 5 further Mock variants (`CNS mock`, `MOCK 1 CNS`, `cns mock exam`, `Mock CNS answers`,
  `mock CNS with answers`)
- `MCQs - CNS bank by MCQs team.pdf` (280pg) and `MCQs - CNS MCQs.pdf` (182pg) — the two
  largest banks in the module
- 5 Workshop MCQ weekly banks (29-49pg each)
- The visual-key-trap file (`MCQ CNS with answers.pdf`, flagged above, needs tooling)
- 26 Professionalism-department bank files, 14 Anatomy-department bank files, 34
  Physiology-department bank files (1577 pages)
- 259 lecture-slide files, 62 practical files, 33 department-book files (not exam
  material — module content, read at S2 when authoring the module's articles)

`ledger.mjs` triage-keys file: `coverage/AU-MED-203-triage-keys.txt` (292 keys, one per
triaged question, `quiz1-q01`…`quiz4-q34` plus `week1-q01`…`week1-q28`,`week1-q31`…
`week1-q151` — the full 151-question Week 1 EOM Final paper, Q1-151).
