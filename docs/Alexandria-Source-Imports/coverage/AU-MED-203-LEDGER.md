| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| quiz1 | 33 | 1 | 0 | 34 |
| quiz2 | 32 | 3 | 0 | 35 |
| quiz3 | 31 | 0 | 0 | 31 |
| quiz4 | 34 | 0 | 0 | 34 |
| week1 | 145 | 4 | 0 | 149 |
| week2 | 103 | 2 | 0 | 105 |
| comp1 (Previous Years CNS MCQ compilation, Q1-126 of 383) | 86 | 39 | 257 | 383 |

## Held
- quiz1-q04 — HIT-PENDING concept (ciliary ganglion, Kasr 102-INT batch not yet imported) — authored now in pending-live/AU-MED-203-questions.md per LANE-BRIEF §21, not emitted into this batch.
- quiz2-q03 — HIT-PENDING concept (Edinger-Westphal nucleus / near-response pathway, Kasr 102-INT batch not yet imported) — authored now in pending-live/AU-MED-203-questions.md alongside the sibling Quiz 1 Q4 question, per LANE-BRIEF §21 and coverage/AU-MED-203-triage.md's 'Confirmed HIT-PENDING (2)' note, not emitted into this batch.
- quiz2-q24 — HIT-PENDING concept (prefrontal cortex / frontal lobe personality change, CON-NEU-B0F7899B8DFF50) reuses an ASU-CNS-3 concept not yet imported to production (docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md) — authored as a sparse-overlay pending-live question per LANE-CARD-Y2's 'check CNS-3 first, reuse via sparse overlay' instruction, not emitted into this batch.
- quiz2-q28 — HIT-PENDING concept (inferior petrosal sinus draining to the internal jugular vein, CON-NEU-D479D9227D90F9) reuses an ASU-CNS-3 concept not yet imported to production (docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md) — authored as a sparse-overlay pending-live question per LANE-CARD-Y2's 'check CNS-3 first, reuse via sparse overlay' instruction, not emitted into this batch.
- week1-q47 — duplicate-of ASU-CNS-3 CON-NEU-168E2C67CB6BA7-adjacent live concept and question (cavernous sinus lateral wall contents III/IV/V1/V2 except mandibular) — near-exact duplicate of docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md label + docs/Ain-Shams-Source-Imports/question/ASU-CNS-3-anatomy-mcq.md title ("All of the following are found in the lateral wall of the cavernous sinus EXCEPT"); verified via find-existing.mjs; not re-authored, not overlaid (question is fully covered by the existing ASU-CNS-3 pair once that batch imports).
- week1-q99 — malformed source — only 3 answer options (a-c) are present in the extracted text, no fourth choice; native-text extraction confirmed via grep (not an OCR artifact), so a genuine source defect rather than a labelling/image question; not authored rather than inventing a fourth distractor.
- week1-q130 — malformed source — only 2 answer options (true/false) are present in the extracted text, below the 4-5 option contract (`emit-mcq.mjs` requires 4-5 letters); native-text extraction confirmed via `pagetext.mjs show` (not an OCR artifact), so a genuine source defect (a true/false item embedded in an MCQ paper) rather than a labelling/image question; not authored rather than inventing two extra distractors. Per LANE-CARD-Y2's standing rule and lane 5's week1-q99 precedent (<4 options → hold).
- week1-q149 — HIT-PENDING concept (oculomotor nerve within the lateral wall of the cavernous sinus, CON-NEU-94513EC37B29B8) reuses an ASU-CNS-3 concept not yet imported to production (docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md) — authored as a sparse-overlay pending-live question per LANE-CARD-Y2's 'check CNS-3 first, reuse via sparse overlay' instruction, not emitted into this batch. Distinct from week1-q47 (Q51-100 batch, held outright as a near-exact duplicate of the same ASU-CNS-3 question/concept pair): this item's own stem and distractor set (optic/olfactory/oculomotor/hypoglossal) are simpler and materially different from week1-q47's, so it is authored as its own overlay question rather than held with no new question at all.
- week2-q005 — HIT-PENDING concept (trochlear nerve and superior cerebellar peduncle decussation at the inferior midbrain level, CON-NEU-44845BF496BE5F) reuses an ASU-CNS-3 concept not yet imported to production (docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-final2024-mcq-concepts.md) — authored as a sparse-overlay pending-live question (docs/Alexandria-Source-Imports/pending-live/AU-MED-203-cns3-final2024-overlay-questions.md) per LANE-CARD-Y2's 'check CNS-3 first, reuse via sparse overlay' instruction, not emitted into this batch. find-existing.mjs surfaced this hit for 'trochlear nerve'.
- week2-q040 — malformed source — only 3 answer options (a-c) are present in the extracted text, no fourth choice ('40 The palatine tonsil is a proliferation of a Ectoderm b Endoderm c Mesoderm'); native-text extraction confirmed via pagetext.mjs show (not an OCR artifact), so a genuine source defect rather than a labelling/image question; below the 4-5 option contract emit-mcq.mjs enforces. Per LANE-CARD-Y2's standing rule and lane 5/6's week1-q99/week1-q130 precedent (<4 options → hold).
- comp1-q64 — duplicate of already-landed content (Broca's area location, inferior frontal gyrus) — dup of the existing "Which of the following is true regards Broca's area?" question/concept.
- comp1-q68 — duplicate of already-landed content (optic nerve does not pass through the superior orbital fissure) — dup of the existing concept of the same fact.
- comp1-q73 — duplicate of a pending-live overlay item (primary motor cortex location in the precentral gyrus) — dup of the "primary motor cortex (Brodmann area 4), in the precentral gyrus" concept in docs/Alexandria-Source-Imports/pending-live/AU-MED-203-cns3-overlay-concepts.md; this pass's vignette dressing (stroke patient) tests the same core location fact.
- comp1-q74 — near-duplicate of the module's already-saturated muscle spindle question set — "detects changes in length of muscles" restates the existing "muscle spindle monitors the degree of muscle stretch" concept, and each individual distractor fact (nuclear bag non-contractile centre, primary-vs-secondary endings) is already tested by existing week1/week2/quiz MCQs.
- comp1-q75 — internal verbatim duplicate within this same source: repeats comp1-q72's visceral-pain-pathway question ("transmitted along sensory fibers that travel with sympathetic nerves in the abdomen and thorax") with the correct answer moved from option A to option C, rest of the option set otherwise identical.
- comp1-q81 — duplicate of already-landed content (delta waves characterise stage N3 slow-wave sleep) — dup of the existing "Delta waves on the EEG characterise deep (slow-wave, stage N3) sleep" concept.
- comp1-q88 — duplicate of this same source's own comp1-q88-equivalent concept minted in pass 1 (the fourth ventricle is the derivative of the hindbrain's central cavity), docs/Alexandria-Source-Imports/concept/AU-MED-203-comp1-concepts.md.
- comp1-q95 — duplicate of already-landed content (nigrostriatal pathway releases dopamine) — dup of the existing "Parkinson disease is associated with dopamine deficiency in the nigrostriatal pathway" concept.
- comp1-q98 — duplicate within this same source's own pass 1: repeats comp1-q11 (caudate and putamen as basal ganglia nuclei), same fact with the option order shuffled.
- comp1-q100 — duplicate of already-landed content (alpha-gamma coactivation) — dup of the existing "Co-activation of alpha and gamma motor neurons keeps the muscle spindle sensitive to stretch during active muscle contraction" concept.
- comp1-q101 — duplicate of already-landed content (digastric anterior belly motor supply) — dup of the existing "Digastric receives its motor supply from two different cranial nerves — anterior belly from the trigeminal (V3), posterior belly from the facial (VII)" concept.
- comp1-q102 — duplicate of already-landed content (Pacinian corpuscle lamellae composition) — dup of the existing "The Pacinian corpuscle's lamellae are formed of Schwann cells (inner core) and fibroblasts (outer capsule)" concept.
- comp1-q108 — duplicate within this same source's own pass 1: repeats comp1-q21 (cerebellum's purely-motor, subconscious function as the TRUE statement), same fact with the option order shuffled.
- comp1-q115 — near-duplicate of this same source's own comp1-q14 (pass 1): both test the cornea's dominance of the resting eye's refractive power (comp1-q14 the magnitude — about two-thirds; comp1-q115 the mechanism — the air-cornea refractive index difference); held rather than re-authored given how directly comp1-q14 already covers the cornea's refractive importance.
- comp1-q122 — duplicate of already-landed content (anterior cerebral artery in the callosal sulcus) — dup of the existing "The anterior cerebral artery courses within the callosal sulcus" concept.
- comp1-q126 — duplicate of already-landed content (UMNL increases muscle tone/hypertonia) — dup of the existing "Upper motor neuron lesion hypertonia results from unopposed pontine facilitatory descending drive" concept.

## Week 2 EOM Final, Q61-120 — au-203-author9, 2026-09-03

Closed out the 120-question Week 2 EOM Final paper. Continued directly from lane 7's stop
point (Q1-60 done, Q61-120 remaining). Read `status` → `show` ≤3 pages/call, pages 16-25.
**Q76-90 do not exist in the source**: the paper's own numbering jumps 75→91 at p19/p20 (an
essay-question page at p19 intervening, resetting its own 1-4 numbering), matching the
module's established numbering-gap precedent from the Week 1 EOM Final (Q29-30 gap) — not
counted as triaged, not held, since there is no question there to author or hold. 45 numbered
questions read (Q61-75, Q91-120), all keyed from each page's own inline answer line, all
authored — 0 held this pass. `find-existing.mjs` was run for every candidate concept term,
cross-checked by hand-grepping this module's own anatomy/physiology concept files by root
term (per lane 5's "the exact-substring match missed 3 of its own module's concepts"
precedent) — this caught 4 own-module reuses `find-existing.mjs`'s head-truncated output alone
would have missed (enkephalin/Ca-channel `CON-NEU-6D6F38874EC1D7`, neuropathic-pain-mechanism
`CON-NEU-869BE9A0BA4E6C`, convergence-projection-theory `CON-NEU-F246724EF98DA3` and the
first-arch-muscles-plus-digastric `CON-FND-4BAD664DBB3998`), plus 2 gate-theory reuses
(`CON-NEU-844FC9F4A461B3`, `CON-NEU-04F9C773D465DB`) and 1 bifid-tongue reuse
(`CON-FND-6FABEEDE721203`) that the plain search did surface. 25 concepts minted (10
embryology/face-development, 10 cerebral-cortex gyri/sulci/Brodmann-area anatomy, 5 pain
physiology); 2 near-duplicate angle pairs collapsed within this pass (q62/q63/q73 →
maxillary-process/definitive-palate; q93/q107 → area-43-taste-postcentral-gyrus;
q106/q112 → lateral-sulcus-three-rami — three pairs total). One HIT-LIVE reuse (q75, incisive
fossa, `CON-DEV-0CA2D891A1BFB3`, a King Abdulaziz University concept — sparse `+au`/`+AU_Y2`/
`+AU-MED-203`/`+article_ids` overlay applied directly to this batch's own
`concept/AU-MED-203-anatomy-concepts.md`, not routed through pending-live since the target is
already live). Three HIT-PENDING ASU-CNS-3 reuses (q91/q111 sharing `CON-NEU-8F800A1650C2CA`,
precentral gyrus/area 4; q110, `CON-NEU-0FFACE78A09499`, Broca's area — both appended to the
existing `pending-live/AU-MED-203-cns3-overlay-{concepts,questions}.md` pair; q103/q104/q119
sharing `CON-NEU-A873F557A4465C`, periaqueductal grey/enkephalinergic analgesia — a new
`pending-live/AU-MED-203-cns3-physio-overlay-{concepts,questions}.md` pair, since this hit's
base ASU-CNS-3 source file, `-physio-mcq-concepts.md`, differs from the two existing overlay
pairs' anatomy-mcq source file). One printed-key doubt recorded: q97 ("cause of referred
pain") keys 'same embryological origin', conflicting with this same paper's own q30 concept
(`CON-NEU-F246724EF98DA3`, convergence-projection theory) and standard teaching — authored as
printed with the conflict recorded on the new concept's own `conflicts` field, per the
module's established doubt-recording precedent, not held. `medical:batch` on the main question
file: 0 errors except one confirmed **known false positive** ("main concept
CON-DEV-0CA2D891A1BFB3 is not covered by any article in library_ids") — `foldInSiblings`'s
naive `article_ids.split()` in `scripts/validate-content-batch.mjs` does not strip a sparse
row's leading `+`, so the appended `+ART-NEU-AU-MED-203-QUIZ1-ANATOMY` article link never
matches this question's plain `library_ids` string in the offline check; the same class of
false positive already logged in `scripts/kasr/seeds/mcq/104-CPS/PROGRESS.md`. Confirmed a
non-issue via `medical:simulate` (the real gate): full positional run (all AU-MED-203 +
ASU-CNS-3 concept/article/resource files + this pass's question/overlay files) — `errors: []`,
`skipped: []`, `created: 39` (main question file) / `6` and `3` (the two overlay question
files, each figure including the 3-4 already-landed sibling questions from earlier lanes) /
`updated: 1` (the Q75 sparse overlay, correctly resolved as an update against the live kau
record, not a stub create) / `updated: 5` and `1` (the two ASU-CNS-3 overlay concept files).
This closes out AU-MED-203's Week 2 EOM Final paper (Q1-120) in full: 103 authored, 2 held, 0
remaining (accounting for the 15-question Q76-90 numbering gap).

## "Previous Years CNS MCQ with answers" compilation, Q1-63 of 383 — au-203-author10, 2026-09-03

Started the module's largest single keyed source (87 native-text pages, `src_27a0ccf21cff0f58e6e3`,
383 sequentially-numbered questions with 2 numbering collisions at q37/q132 from a fresh past
paper restarting mid-sequence, not a gap). Read and triaged Q1-63 (pages 2-15) against the full
already-authored AU-MED-203 corpus (384 question stems + 533 concept labels, AU-MED-203 +
ASU-CNS-3, loaded once via grep) plus `find-existing.mjs`. 23 of 63 triaged as duplicates (18
external duplicates of already-landed AU-MED-203/ASU-CNS-3 content, 2 internal verbatim repeats
within this same source — q26 repeats q19, q50 repeats q7 — held, not re-authored; the module's
established near-duplicate-angle precedent also applied to q58, a repeat of week2-Q055's
lymph-node-group MCQ pattern for a different named node). 40 of 63 authored into
`question/AU-MED-203-comp1-mcq.md` (seed `coverage/seeds/AU-MED-203/comp1.json`), 0 held for
malformed sources in this range. 40 concepts minted (35 CON-NEU, 2 CON-FND), each checked via
`find-existing.mjs` before minting, 0 collisions against the 13578 existing IDs checked. No
HIT-PENDING or HIT-LIVE reuse in this range — every new concept is genuinely new. `medical:batch`
on question + concept + resource files (run with each other and the module's article files as
`--with` siblings): `errors: []` across all three (only expected `needs_evidence` warnings).
`medical:simulate` positional (3 article files + this pass's concept/resource/question files):
`errors: []`, `rejected: 0`, `created` matches each file's row count exactly. Appended a new
`src_27a0ccf21cff0f58e6e3` catalogue-resource row to `resource/AU-MED-203-resources.md` (no
prior record existed for this source). Full duplicate breakdown with twin ids in
`coverage/AU-MED-203-triage.md`'s "Previous Years CNS MCQ with answers compilation, pass 1"
section.

## "Previous Years CNS MCQ with answers" compilation, pass 2 (Q64-126) — au-203-author11, 2026-09-03

Continued directly from pass 1's stop point (Q1-63 done, Q64-383 remaining). Read `status` →
`show` 2-3 pages/call, pages 16-30. Loaded the full already-authored AU-MED-203 corpus once
(424 question stems, 607 concept labels across AU-MED-203 + ASU-CNS-3) via
`grep -h "^## question$"`/`"^## label$"`, then triaged Q64-126 (63 numbers) against that
corpus plus `find-existing.mjs` before authoring anything, per pass 1's precedent.

**One numbering gap**: q66 does not exist in the source (numbering jumps 65→67 on p16, no
page break or essay-page intervening) — matching the module's established numbering-gap
precedent (Week 1 EOM Final Q29-30, Week 2 EOM Final Q76-90); not counted as triaged, not
held. 62 numbered questions read (Q64-65, Q67-126), all keyed from each page's own inline
answer line.

**46 of 62 triaged as new** and authored into `question/AU-MED-203-comp1-mcq.md` (seed:
`coverage/seeds/AU-MED-203/comp1.json`) — q65, q67, q69-72, q76-80, q82-87, q89-94, q96-97,
q99, q103-107, q109-114, q116-121, q123-125. 46 concepts minted (all `CON-NEU`), each
canonical key checked via `find-existing.mjs` before minting, 0 collisions against the
existing IDs the mint tool checked against.

**16 of 62 triaged as duplicates**, logged in the `## Held` list above with twin ids: 15
external duplicates of already-landed AU-MED-203/ASU-CNS-3 content or pending-live overlay
items (q64, q68, q73, q74, q81, q88, q95, q98, q100, q101, q102, q108, q115, q122, q126 — of
which q88, q98 and q108 duplicate this same source's own pass 1, and q115 near-duplicates
pass 1's q14), plus 1 internal verbatim repeat within this pass itself (q75 repeats q72's
visceral-pain-pathway question with the correct option moved from A to C). No HIT-PENDING
reuse required a new pending-live overlay pair this pass (q73's twin already lives in the
existing `cns3-overlay` pair from an earlier lane; this pass's own duplicate was held outright
rather than overlaid, since the existing overlay item already fully covers the fact).

**Two printed-key doubts recorded**, kept as printed per LANE-CARD rather than silently
corrected, each with the conflict named on its own concept's `conflicts` field: q82 ("lateral
reticulospinal tract") credits contralateral, not the more commonly taught ipsilateral-
dominant, inhibition of muscle tone; q125 ("stimulation of the medial part of the right
primary motor area") credits left-hand movement, whereas standard motor homunculus topography
(lower limb represented medially) would predict left-foot movement instead.

`medical:batch` on the question file (with the module's 3 article files, the concept file and
the resource file as `--with` siblings) and on the concept file standalone: `errors: []` for
both (86 items each; only expected `needs_evidence` per-concept warnings). `medical:simulate`
positional (3 article files + concept + resource + question files, the full chain): `errors:
[]`, `rejected: 0`, `skipped: 0` — concepts `created: 86`, questions `created: 86`, matching
each file's own row count exactly (86 = 40 from pass 1 + 46 from this pass); the 3 article
files and the resource file each resolve as `created` unchanged from pass 1 (this pass added
no new resource or article). Full duplicate breakdown with twin ids in
`coverage/AU-MED-203-triage.md`'s "Previous Years CNS MCQ with answers compilation, pass 2"
section.

## Remaining
Q127-383 of the "Previous Years CNS MCQ with answers" compilation (pages 31-87,
`src_27a0ccf21cff0f58e6e3`) — the next resume point for this source. Beyond that, per
`coverage/AU-Y2-priority-sources.md`: 2 further weekly EOM finals (week 3, week 4+5), the Mock
2027 question+answer pair, and the two largest banks — `MCQs - CNS bank by MCQs team.pdf`
(280pg) and `MCQs - CNS MCQs.pdf` (182pg).
