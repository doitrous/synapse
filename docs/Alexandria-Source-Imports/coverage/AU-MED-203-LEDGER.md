| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| quiz1 | 33 | 1 | 0 | 34 |
| quiz2 | 32 | 3 | 0 | 35 |
| quiz3 | 31 | 0 | 0 | 31 |
| quiz4 | 34 | 0 | 0 | 34 |
| week1 | 145 | 4 | 0 | 149 |
| week2 | 103 | 2 | 0 | 105 |

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

## Remaining
(none — every source triaged so far in `coverage/AU-MED-203-triage.md` is fully authored or
held. Next untriaged frontier per `coverage/AU-Y2-priority-sources.md`: the 87-page "Previous
Years CNS MCQ with answers" compilation, 2 further weekly EOM finals (week 3, week 4+5), the
Mock 2027 question+answer pair, and the two largest banks — `MCQs - CNS bank by MCQs team.pdf`
(280pg) and `MCQs - CNS MCQs.pdf` (182pg).)
