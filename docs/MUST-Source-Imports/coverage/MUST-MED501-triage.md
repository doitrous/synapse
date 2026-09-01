# MUST-MED501 (Rheumatology & Immunology) — S3 triage

First module chosen for Phase-0's deep triage pass: smallest, most tightly-bounded 501
syllabus (7 topics at midterm, 7 at final — see `academic/MUST-Y5-modules.md`), and it
already had a **MUST-specific solved MCQ bank**, the highest-tier source type this lane
can find. Full priority-source survey for every 501/502 module is in
`coverage/MUST-Y5-priority-sources.md`; this file drills into MED501 only, per
13-orchestration.md §5.

## Scope of this pass

Two sources fully read and triaged:

| Source | Path | Pages | Method |
|---|---|---:|---|
| A | `05 MCQs/MCQs - MUST MCQ 501محلول.pdf` | 5 | `pagetext.mjs status` → clean native text, but **the answer key is a yellow highlight the text layer does not carry** — recovered by reading the PDF visually (Read tool) page by page, not by rendering (the text itself was already legible, only the highlight was lost) |
| B | `08 Midterm Exams/1- MED previous Questions mid & fin.pdf` | 3 | native text, `pagetext.mjs show` |

Remaining MED501 sources (`1000_MCQs_for_DAVIDSON+.pdf` and 10 other tier-3 textbook
banks, plus the reclassified tier-4 notes files) are listed in the priority-sources doc
but **not opened this pass** — flagged for S2, not part of this checkpoint's numbers.

## Source A — MUST MCQ 501 (solved)

26/26 questions keyed (100% — every answer is a distinct yellow highlight, unambiguous).
Full question-by-question key list: `coverage/MUST-MED501-triage-keys.txt` (block A).
One internal key conflict noted, not silently resolved: A26 asks which immunoglobulin
class rheumatoid factor is classically formed against and highlights **IgG** — standard
teaching is usually IgM. Held as printed; see conflict note below.

## Source B — previous Questions mid & fin (student recall)

This is an answer-recall document, not a transcribed exam. The **Rheumatology midterm**
section (12 items) has a usable stem fragment alongside each answer and was fully
triaged (block B). The **Medicine 501 final** section (30 items, "30×1=30 marks") has
stems for none of its items past a bare topic word — 12 of the 30 have an inferable
topic (Temporal arteritis, Reactive arthritis, SLE, etc.) but no actual question text,
and 18 are uninterpretable or too bare to use. **This whole 30-item section is triaged
(read) but not keyable as authorable MCQs without the original exam paper**, which does
not otherwise exist in the Year 5 tree. Logged as **needs Omar sources** — this is
exactly the kind of gap Telegram fetching used to fill and can no longer be chased that
way (per standing instruction, Telegram fetching is retired).

## Concept-level triage

28 distinct tested ideas after collapsing duplicates (ankylosing spondylitis is tested
3 times across A11/A14/B07; gout risk-factors/investigation/management appear in both A
and B; CREST/scleroderma prognosis appears in both A20 and B05 — each collapsed to one
row). `find-existing.mjs` run per concept, shortest distinctive term first per
00-START-HERE.md §4.

| # | Concept (canonical idea, not exact wording) | Tested in | Hit |
|---|---|---|---|
| 1 | Anti-CCP antibody specificity for RA | A01 | New |
| 2 | RA hallmark clinical feature (prolonged morning stiffness) | A02 | New |
| 3 | Rheumatoid factor — associations/false statements | A03 | New |
| 4 | Anemia of chronic disease in RA | A04 | New |
| 5 | ARA 1987 / ACR diagnostic criteria for RA | A05 | New |
| 6 | Acute gout arthritis — presentation & risk factors (thiazide, obesity, purine intake) | A06, B08 | New |
| 7 | Gout — gold-standard diagnostic investigation (joint aspiration + polarized microscopy) | A09 | New |
| 8 | Gout — supportive investigation (serum uric acid) | A07, B09 | New |
| 9 | Gout acute management — remove precipitant (stop thiazide) | A08, B10 | New |
| 10 | Boutonniere (buttonhole) deformity mechanism | A10 | New |
| 11 | Ankylosing spondylitis — clinical presentation (young, AM back pain relieved by activity, FHx) | A11, A14, B07 | New |
| 12 | Bouchard's nodes — PIP joint, osteoarthritis | A12 | New |
| 13 | Heberden's nodes — DIP joint, osteoarthritis | A13 | New |
| 14 | Psoriatic arthritis — DIP joint involvement | A15 | New |
| 15 | Antiphospholipid syndrome (DVT + recurrent miscarriage) | A16 | **Pending** — `docs/import-ready/concept/ASU-IBM-biochem-mcq-concepts.md` (`antiphospholipidsyndrome.autoimmune.target`), same article/question batch |
| 16 | HLA-B27-associated disease group (seronegative spondyloarthropathies) | A17 | New |
| 17 | Osteoarthritis epidemiology (most common arthritis; postmenopausal women) | A18, B02 | New |
| 18 | Acute monoarthritis workup (joint aspiration to exclude septic arthritis) | A19 | New |
| 19 | Limited scleroderma / CREST prognosis (~70% survival) | A20, B05 | New |
| 20 | Poor prognostic factors in RA | A21 | New |
| 21 | Pseudogout / CPPD crystal deposition | A22 | New |
| 22 | Gout maintenance therapy vs. acute-attack contraindication (allopurinol not for the acute attack) | A23 | New — related but distinct from 3 **live** biochem-mechanism concepts on allopurinol (`CON-REN-B3AEE6F2…`, `CON-REN-E5BAEF03…`, `CON-REN-42ED4D50…`); those teach structure/mechanism, none teach the clinical "not for acute gout" point — cross-link when authored, do not merge |
| 23 | Infliximab / anti-TNF-α mechanism | A24 | New |
| 24 | DMARD classification (NSAIDs are not DMARDs) | A25 | New |
| 25 | Rheumatoid factor immunoglobulin class | A26, B12 | New — **held, conflicting printed keys**: A26 highlights IgG, B12 states "IgA against IgM"; standard teaching is usually IgM. Neither source repaired by inference; both keys recorded, an author must resolve against the actual department source, not this lane's judgement |
| 26 | RA — which listed condition is not a true variant (congenital) | B01 | New |
| 27 | Septic arthritis management — what is NOT indicated (blood transfusion) | B03 | New |
| 28 | Scleroderma differential — Reiter's disease is not a feature | B04 | New |

(Raynaud's phenomenon / beta-blocker avoidance, B06, was folded into row 6's family of
gout/crystal-arthropathy teaching only loosely — on review it is its own idea and is
listed separately below rather than force-fit.)

| 29 | Raynaud's phenomenon — drug to avoid (beta-blockers) | B06 | New |

`immunoglobulin M` and `allopurinol` searches also surfaced **related-but-not-matching**
live records (a B-cell-surface-receptor concept for IgM; three allopurinol
mechanism/structure concepts) — recorded above as informational, not counted as hits,
per the tiebreaker rule in 00-START-HERE.md §4 ("could one record answer both
questions?" — no, different objectives).

## Checkpoint table (13-orchestration.md §5)

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| MUST-MED501 | 56 (26 source A + 30 source B) | 38 (26 A + 12 B midterm-section) | 29 | 0 | 1 | 28 | `imm` (rheumatology/immunology has no dedicated subject id in the 20-subject list — placed under `imm` per 00-START-HERE.md §3's "no obvious home" rule; a few rows, e.g. gout/CPPD/OA, could alternatively sit under `msk` — **TBD, needs an explicit placement ruling before minting**, not decided by this lane) |

18 of the 56 triaged questions (source B's "Medicine 501 final" section) are **blocked**,
not held — no printed key exists to record because no stem exists; they do not appear
in the keys-recovered or concept counts above and need the original exam material,
logged as needs-Omar.

## Needs Omar

- The full "Medicine 501 final" exam paper (30 questions) — only a bare answer-recall
  list survives in the source tree; the original questions were not found anywhere else
  in `Universities/MUST/Year 5`.
- A ruling on where Rheumatology/Immunology-flavoured concepts (row 29's family) place:
  `imm` outright, or split `imm`/`msk` by mechanism vs. joint-disease content.
- A ruling on the unrostered "Law and Human Rights" elective folder (see
  `academic/MUST-Y5-modules.md`).
- A ruling on the MED501 midterm marks conflict (15 per the plan's Arabic note vs. 22
  per the syllabus PDF — see same file).

## STOP

Phase-0 triage complete for MUST-MED501's two highest-tier opened sources. **No
concept, article or question has been minted.** Awaiting **TRIAGE APPROVED** from the
chief of staff before any S2 authoring begins, per 13-orchestration.md §5.
