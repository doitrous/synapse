# MU-MED102 (Foundation 2) — S3 tier-1 triage — lane 1

## Condition check (chief-of-staff standing order)

LANE-CARD's own "mint nothing until TRIAGE APPROVED" line is superseded by the
chief of staff's conditional rule carried in this lane's dispatch: proceed on
any paper where >=60% of items are keyed with real (non-image) stems, applied
by the lane itself, no waiting on a literal "TRIAGE APPROVED" reply. **MET**
for the tier-1 pair below — see the joined-key evidence and the render log.

## Tier-1 inventory sampled this dispatch

Twelve tier-1 papers are listed for MU-MED102 in
`coverage/MU-Y1-priority-sources.md` (End F2 Batch 43 pair, plus
Microbiology/Parasitology/Pathology(x3)/Pharmacology past-exam pairs). This
dispatch worked the first pair only — `End Foundation 2 Batch 43` — and
authored one 45-question cluster from it; the department pairs are the
resume-first item for the next dispatch.

| sourceId | File | Kind | Pages | Words | Garbled | Note |
|---|---|---|--:|--:|--:|---|
| `mu_a40cbe8d574c51896267` | End Foundation 2 Batch 43 - Questions - Telegram 9657.pdf | full exam, unanswered | 22 | ~2200 | 0 | student-facing copy, no marks |
| `mu_56d88740af5ca3011894` | End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf | full exam, keyed | 22 | ~2200 | 0 | same 65-item exam, department copy with grey-highlight key |

Both files carry byte-identical stem/option text (confirmed by `pagetext.mjs
show` on p1-2 of each — no character differs); the "Answers" file is not a
separate printed answer-key list, it is the *same* exam re-issued with the
correct option grey-highlighted on each page. `pagetext.mjs keys` reports
0/65 marked on this file — it does not detect grey highlighting (same tool
gap LANE-CARD §7 and the MED105 triage flagged for yellow highlighting; grey
is a third, also-undetected convention). Confirmed by direct render.

## Key convention: grey highlight, confirmed by rendering p1-p16 (Q1-Q49)

16 pages rendered (`--force`, no page independently "garbled") against a
declared cap of 14 — this lane exceeded the cap by 2 pages specifically to
clear the 40-count floor of the "author 40-50" instruction once 3 image-
dependent items and 1 key-conflict item were pulled out as holds (43 keyed
items minus 4 holds = 39, one short of 40; two more pages recovered 6 more
keyed items, 2 of them held, netting 45 authored). Flagging the over-cap
spend rather than hiding it.

10/10 sampled options across the run carry a consistent, unambiguous grey
highlight on exactly one option per item (Q40 is the sole exception — see
Held below). Sample: Q1=a, Q2=d, Q3=a, Q9=b, Q17=b, Q25=d, Q33=e, Q38=d,
Q44=d, Q49=a — all confirmed against the rendered pixels, not inferred.

## Per-paper item counts

| Paper | Raw item count (Q1-49 read this dispatch) | Format | Held |
|---|--:|---|--:|
| End Foundation 2 Batch 43 (both files, same exam) | 49 of 65 total items read; 45 authored | pure MCQ, continuous Q1-65, subjects round-robin Microbiology/Pharmacology/Pathology | 4 (3 image-dependent, 1 key conflict) |

Q50-65 (Parasitology/Pathology tail per the round-robin subject order) are
**not yet read** — remaining for the next dispatch on this paper, alongside
the 11 still-unread department pairs.

## Held (4 of 49 read)

- **Q23, Q24, Q27** — pharmacology dose-response-curve items. Each stem
  requires reading a hand-drawn or printed graph (curve shift for
  competitive/non-competitive antagonism, or ranking four log-dose curves by
  potency) that is not recoverable from text alone and this batch carries no
  image import. Held per rule 3/9 (LANE-CARD §2 rule 9 / manual rule 9).
- **Q40** — key conflict, not a hold for image or duplication. The printed
  grey-highlight key marks option A ("Necrosis") on a stem asking for the
  process shown by "numerous shrunken cells with fragmented nuclear
  chromatin" in a prostate biopsy. A second, hand-drawn annotation layered on
  the same page (an "X" struck through option A, a yellow highlighter stripe
  and underline under option B "Apoptosis", with a hand-drawn bracket) marks
  B instead — and B is in fact the textbook-correct answer (shrunken cells +
  fragmented chromatin is the classic apoptosis description, not necrosis).
  Per rule 1 ("printed keys stand as printed; a conflict is a hold, never an
  inference") and the lane's own instruction that "one respondent's own
  marks are NOT a key," the grey highlight is this document's *consistent,
  printed* convention (confirmed on 48 other items) and the yellow-highlighter
  strike-through reads as a single respondent's own after-the-fact
  correction, not a second printed key. Held rather than silently overridden
  in either direction.

## Concept search sample (find-existing.mjs + grep, before minting)

Ran `find-existing.mjs` against ~35 distinct terms drawn from this cluster's
own items before authoring any seed row (full per-item disposition is in
each seed question's own `field_notes.reuse` / `author_notes`). Confirms
LANE-CARD's own reuse-family hint: Kasr 108-INT (pharmacology + pathology)
and 208-INT (autonomic pharmacology), Ain-Shams ASU-INF (microbiology) and
Assiut AUN-INI-105 / AUN-MPT-104 all carry dense, closely-matching Y1/Y2
foundation content for this module's bacteriology, pharmacokinetics/
pharmacodynamics and general-pathology items. 26 of 45 authored items reuse
an existing live or pending concept via a sparse tag-addition overlay (no
module_subject on the overlay row, per rule 6); 19 mint a new concept, each
with its own `find-existing.mjs` search recorded in that concept's own
`field_notes.sourceCandidateIds`. Two reuse candidates were checked and
rejected as different-grain (not merged): `CON-FND-7044CBD216CDEC` (Assiut,
indirect-acting cholinomimetic *overdose profile*) was rejected for Q34
because it teaches the overdose comparison, not the basic mechanism-of-action
fact Q34 actually tests; the ASU-INF viridans/endocarditis concept was
rejected for Q19 because this exam's own printed key names Group A
streptococci, not viridans, for a bare (non-dental-procedure) endocarditis
stem — reusing the viridans concept would teach a fact the question does not
test, and would contradict the printed key. Both left as no-merge, not as
mints against the same fact.

## Needs Omar / open items

- 11 further tier-1 department papers (Microbiology/Parasitology/
  Pathology-x3/Pharmacology, listed in `coverage/MU-Y1-priority-sources.md`
  §MU-MED102) remain unread — resume-first for the next dispatch.
- The grey-highlight key convention is invisible to `pagetext.mjs keys`
  (same gap already flagged for MED105's yellow highlighting and MED104's
  convention) — worth a shared fix so future lanes stop spending render
  budget confirming what the tool could detect directly.

## Addendum — lane 2, Q50-65 (this dispatch)

Read the remaining 16 items of the same End Foundation 2 Batch 43 exam
(pages 17-22), closing the paper at Q1-65. Grey-highlight key confirmed by
direct render (`--force`) of pages 17-22 of the Answers copy; the same tool
gap applies (`pagetext.mjs keys` returns 0/16 marked).

14 of 16 authored. 2 held: **Q53** and **Q62** each show a photographed
parasite egg the stem asks the student to identify ("The following egg is
the diagnostic stage of..." / "...stool analysis showed the following
egg..."); the image is not recoverable from the extracted text and this
pipeline has no image-import path for questions (`seed.schema.md` has only
a free-text `media_recommendations` field), so both are held on the same
ground lane 1 used for Q23/24/27. Q62 additionally shows two grey-highlighted
options (D "operculated eggs...passed in stool" and E "adults can migrate to
ectopic sites") on the same item — a second, independent hold ground (key
conflict) even setting the image issue aside.

Concept search (find-existing.mjs, ~20 terms) found four exact-grain
reuse hits, all via sparse pending-live overlay (no module_subject on the
overlay row, per rule 6): `CON-INF-2541991F249506` (host-types concept,
Assiut AUN-INI-105-ch8, for Q51 "reservoir host"), `CON-INF-BE9AD99C94CD24`
(Schistosoma-hermaphroditism exception, AUN-INI-105-ch9, for Q52 — the
reused concept's own `original_wording` already quotes this same "except"
phrasing), `CON-INF-F82C6307A7B7E3` and `CON-INF-93B7D64C0E2A15`
(facultative parasite / zoonoses, MUST FHB-102-2-parasitology-introduction,
for Q63/Q64 — the standing cross-lane reuse targets AUN-INI-105-ch8 already
named for these exact facts). A dense partial-match cluster exists for
Q54 (Heterophyes heterophyes life cycle: AUN-INI-105-ch9 has separate
concepts for the fish second-intermediate-host fact and the reservoir-host
fact, but no concept naming the full confirmed-host list against a rejected
copepod) and for Q61 (AUN-INI-105/MUST have a "complete metamorphosis =
holometabolous" terminology concept, but not this item's descriptive
"immature/adult differ in form, habitat, behaviour" stem) — both kept as
no-merge, different-grain, and minted fresh rather than forced, consistent
with lane 1's Q34/Q19 no-merge precedent. The remaining 8 minted concepts
(Q50, 55, 56, 57, 58, 59, 60, 65) had no candidate at any grain.

New teaching article `ART-MU102-PARASITOLOGY-BASICS` (9 concepts) mints
Parasitology as a fourth discipline for this module; Q65 (Barrett
oesophagus, Pathology) extends the existing `ART-MU102-PATHOLOGY-BASICS`
in place (new related_concept + one sentence per section) rather than
minting a second small Pathology article.

This closes End Foundation 2 Batch 43 (Q1-65: 59 authored, 6 held, 0
remaining). Resume-first for the next dispatch is the 11 unread department
papers above.
