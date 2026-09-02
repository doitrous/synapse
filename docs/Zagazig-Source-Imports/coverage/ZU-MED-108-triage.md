# ZU-MED-108 (Professional Practice II: basic clinical skills 1) — triage, author1 pass

Priority sources per `coverage/ZU-Y1-priority-sources.md` §ZU-MED-108, all four located
under `_Staging/Telegram Year 1/Fakous Medical Data/Professional Practice II/` (Fakous
campus, ruled USABLE — chief-of-staff, 2026-09-01, LANE-CARD.md §7).
`source provenance: Fakous campus` on every question drawn from this folder. sha256(12)
verified against `coverage/ZU-Y1-priority-sources.md` for all four files before opening
any of them: `Fakous P.P2 Final 2024.pdf` → `82774d812f46` ✓, `Final Hamdy 1 - 1st
year.pdf` → `3a39ec7afade` ✓, `OSPE "Answers" Yousef Amr.pdf` → `663edb2b52f2` ✓, `Basic
clinical skills 1.pdf` → `49b325d17635` ✓. No ZU-MED-105 (Professional Practice I) triage
exists yet in this repo to cross-read for shared concept families — checked
(`docs/Zagazig-Source-Imports/coverage/ZU-MED-105-*` and `find ... "*105*"`, no hits) —
so this pass reused concept families from Ain Shams `ASU-BLS`, Helwan and Kasr `101-ISK`
directly per the dispatch's own instruction, not via a ZU-MED-105 triage.

## Source: `Fakous P.P2 Final 2024.pdf` (paper, tier 1)

4 pages, native text (`pagetext.mjs status` reports `garbled=no` on every page — no OCR
needed). 31 questions total, all single-best-answer MCQs on BLS/first-aid, airway
management, choking, vital signs and injection technique, matching the paper's own header
("Course: Professional Health care (Clinical Skills) S2 ... Number of Questions: 31 MCQ").

### Key-recovery method (the trap named in LANE-CARD.md §7, confirmed on this paper too)

`pagetext.mjs keys` reports **0 keyed / 0 ambiguous / 5 unmarked across 4 page(s)** for
this paper — the tool cannot see the mark at all, not even the corrupted-glyph pattern
documented for `ZU-MED-103`/`106`/`107`'s scanned `Final` papers, because this particular
paper is **native text with the correct-answer mark drawn by hand directly on the printed
page before scanning** (a blue-ink circle or rounded box drawn around the entire correct
option's text, or — on about a third of items — a diagonal pen stroke through just the
option's letter instead, sometimes reinforced by a handwritten margin letter next to the
question number, e.g. "c" beside Q1, "A" beside Q2). Because the text layer is native
(not OCR'd), the ink mark leaves the extracted *text* completely undisturbed — `keys`
finds nothing to flag at all, rather than a corrupted glyph — so this paper is an even
harder silent-failure case than the corpus's usual hand-drawn-ink trap: `pagetext.mjs
status` reporting `garbled=no` does **not** mean the answer key is readable from text.
Every one of the 31 answers below was confirmed by rendering all 4 pages as images
(`pagetext.mjs render --force`, one render per page, 4 renders total, all four already
rendered and read directly — several re-cropped and re-read at higher zoom via a local
Python/Pillow crop to confirm a specific option or margin letter) before being recorded.
No double-marks or contradictions were found anywhere on this paper; nothing is held.

### Checkpoint table

| Source | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| `Fakous P.P2 Final 2024.pdf` | 31 (all SBA) | 31/31 legible + render-confirmed (0 held) | 31 distinct | 0 | 3 | 28 | `fnd` (airway management, BLS/CPR/AED, choking, recovery position/transfer, history-taking, consciousness levels, vital signs, injection technique — all professional-practice/clinical-skills territory) |

**31/31 = 100% of the Final paper's SBA items keyed with real, legible stems and
render-confirmed** — well above the ≥60% conditional-approval bar in this lane's
dispatch. TRIAGE APPROVED, applied by this lane per the dispatch's own rule.

### Option-count trim (>5 options)

Two items (Q3, Q11) printed 6 options (a-f, including a non-informative "None of the
above" as option f, with the correct answer being "All of the above" as option e in both
cases). Per LANE-CARD.md §7 / the dispatch's own rule (">5 options trimmed and
documented"), both were trimmed to 5 options by dropping "None of the above" — the
correct answer's own option, and every other real distractor, is unaffected. Documented
in each question's own `author_notes`.

## Source: `Final Hamdy 1 - 1st year.pdf` (labelled "paper, tier 1" in the priority-sources
doc; found to be a lecture handout, not an exam paper — see below)

23 pages, native text, clean (`garbled=no` on every page). Despite its filename and its
tier-1/"paper" classification in `coverage/ZU-Y1-priority-sources.md`, this file is **Dr.
Hamdy Amer's "Professional Practice 1st year — Clinical Skills 2024" lecture handout**
(confirmed by reading pp.1-21: a title page, then a running "Clinical Examination & Vital
Signs" / "Different Injections Techniques" chapter text covering history-taking,
conscious-level grading, vital-signs measurement, BP measurement pitfalls, respiration
assessment, and IM/IV/SC/ID injection technique — the same syllabus the Final paper
examines, but written as prose teaching text, not as questions). `pagetext.mjs keys`
reports "1 keyed / 0 ambiguous / 27 unmarked across 23 page(s)" — the "1 keyed" hit and
every "Qn" line the tool flags are false positives from the lecture's own numbered lists
(e.g. "1. Alert / 2. Lethargic / 3. Obtunded…" under "Conscious level:"), confirmed by
reading the actual page text at every flagged location (pp.6, 12-21) — none of these
pages contain a lettered MCQ option anywhere. **Verdict: not an exam paper, no keyed MCQs
recoverable — reclassified here as tier-2/catalogue-only**, matching the role
`ZU-MED-103`'s "Hand out Module 1" handout played in that module's own triage (corroborating
evidence that the Final paper's syllabus is genuine, not authored from directly). Not
triaged question-by-question; not counted toward the keyed-% denominator above, since it
carries no questions at all.

## Source: `OSPE "Answers" Yousef Amr.pdf` (practical, tier 2 — has keyed MCQs, used for
triage completeness, NOT authored this pass)

16 pages, native text. Two distinct documents live inside this one PDF: (1) pp.2-7 and
11-16, a fill-in-the-blank OSPE practical draft ("How to check if an arrested patient is
unconscious? …………") with short-answer prompts, no lettered options anywhere — out of
scope for SBA authoring, same treatment as the essay questions logged in other modules'
triages; pp.11-16 duplicate pp.2-7's same 21 prompts with a student's own handwritten
answers filled in, still no single-letter key format. (2) pp.8-10, a separate 17-question
lettered MCQ set titled "الاسئله الجديدة" ("The new questions"), signed "Yousef Amr" at
the bottom of p.10, with the correct option on every question marked by a clean **PDF
highlight annotation** (not hand-drawn ink) — `pagetext.mjs keys` correctly detects most
of these directly ("11 keyed / 6 ambiguous / 42 unmarked across 16 page(s)" overall, with
every one of the 17 MCQ items' answers legible and render-confirmed once each of the 6
"ambiguous" flags was checked by rendering: all 6 turned out to be single, unambiguous
highlights that the automatic detector under-resolved, not genuine double-marks). Topics:
BLS/CPR key phrases, paediatric pulse-check landmarks, choking management, AED use,
polytrauma/ABCDE primary survey, cervical-spine precautions, GCS, definitive airway,
paediatric choking — overlapping but not duplicating the Final paper's own 31 items (no
shared stem). **17/17 = 100% keyed, render-confirmed, usable per the dispatch's tier-2
rule ("use only if they contain keyed MCQs")** — this source clears the bar and is
recorded here for the next author to pick up; not authored into this pass's cluster
because the Final paper alone already supplied a full 30-50-question cluster (31) on its
own, and one source per pass keeps the seed/gate/ledger trail simple to audit. See
"Remaining" below.

## Source: `Basic clinical skills 1.pdf` (practical, tier 2 — catalogue only)

69 pages, native text, clean. Confirmed to be the module's own official lecture handout/
learning-outcomes document (p.2 index: Part I First Aid — Airway management, BLS & AED,
Choking, Recovery position & safe patient transfer; Part II Clinical skills — History and
general examination, Vital signs, Injection techniques), matching the Final paper's own
question spread topic-for-topic. Per LANE-CARD.md §7 ("practical files … tier 2 — use
only if they contain keyed MCQs"), this file has none (`pagetext.mjs keys` not run
question-by-question since a manual read of the index and several chapter openings
confirmed prose teaching content throughout, no lettered MCQ blocks); not authored from,
catalogued here only, and used as background reading for writing accurate concept/article
definitions (Korotkoff sounds, BP-measurement pitfalls, injection angles) that go beyond
what the exam paper's stems alone state.

## Concept search — 0 live-hit, 3 pending-hit, 28 new

`find-existing.mjs` run for every one of the 31 distinct concepts before minting, short
literal queries per LANE-CARD.md §4, cross-checked with `grep -ril` across
`docs/*-Source-Imports/concept`, `docs/*-Source-Imports/pending-live` and
`docs/import-ready/concept`.

**0 live hits** — nothing in `server/data/medical-library-v1.json` covers this paper's
professional-practice/clinical-skills territory closely enough to overlay; the closest
near-misses (a MUST paediatric-resuscitation concept mentioning jaw thrust in passing, a
Kasr postural-hypotension-as-drug-side-effect concept, a live "conscious level" citation
about meningitis) are logged as rejected merge candidates in the concept file, not
overlaid, since none states the atomic fact this paper's own question tests.

**3 pending hits** (concept exists only in another lane's unimported batch) — sparse
pending-live overlay, `pending-live/ZU-MED-108-pp2final24-pending-overlays.md`:
- `CON-CVS-D3ED0A0E795D72` (`docs/import-ready/concept/SYS-CVS-CONCEPT-T02.md`, a
  cross-university "SYS-CVS" curriculum-bank record) "Syncope is a transient loss of
  consciousness caused by global cerebral hypoperfusion…" — Q2 (fainting = loss of
  consciousness from momentary cerebral blood-supply interruption). Direct match. This
  record carries **no existing `modules`/`module_subject` field at all** (its own
  `field_notes` state "No module catalogue is populated for this curriculum") — the
  overlay supplies its first module tagging rather than evicting any prior union; see the
  overlay file's header note for the reasoning.
- `CON-CVS-20A1EC258BFF30` (`docs/Alexandria-Source-Imports/concept/
  AU-MED-106-physiology-concepts.md`) "Korotkoff sound character changes through the
  phases of cuff deflation, from first appearance to muffling to silence" — Q24 (how many
  Korotkoff phases are heard during BP measurement). Partial-topic match taken
  deliberately: this record's own definition names all 5 phases (I tapping, II
  murmurish, III banging, IV muffled, V **silence**), which makes the paper's printed key
  of "4" defensible on the reading "phases that produce an audible sound" (I-IV; phase V
  is defined by the absence of sound) rather than the total named-phase count (5) — the
  question's own explanation states this reading explicitly. Not held, since only one
  option is marked and no second mark contradicts it.
- `CON-CVS-A0579343614BCD` (`docs/Kasr-Source-Imports/concept/
  104-CPS-physiology-concepts.md`) "Systolic, diastolic and mean arterial pressure are
  distinct quantities… pulse pressure widens when arterial compliance falls" — Q28
  (systolic minus diastolic BP = pulse pressure). Direct match — the record's own
  definition states verbatim "Pulse pressure is the difference between systolic and
  diastolic pressure."

**28 new concepts minted** — `concept/ZU-MED-108-pp2final24-concepts.md`, covered by 7 new
articles (`article/ZU-MED-108-pp2final24-articles.md`): an airway-manoeuvres article (Q1
jaw thrust, Q3 obstruction signs, Q5 NPA contraindication, Q6 NPA sizing, Q7 OPA sizing,
Q9 unconscious-noisy-breathing first step), a choking article (Q8 abdominal-thrust
indication, Q11 choking signs), a BLS/CPR/AED article (Q4 responsiveness check, Q10
cardiac-arrest signs, Q12 DRSABCD sequence, Q13 CPR compression mechanics, Q14 AED pad
placement), a recovery-position/transfer article (Q15 recovery-position purpose, Q16 safe
transfer method), a history/consciousness article (Q17 personal history, Q19 comatose
definition), a vital-signs article (Q21 vital-signs components, Q22 pulse deficit, Q26
postural hypotension, Q30 brachial pulse), and an injections article (Q18 IV route for
chronic-disease medication, Q20 intradermal uses/insulin exception, Q23 intradermal
angle, Q25 Z-track technique, Q27 subcutaneous definition, Q29 IM complications, Q31
fastest injection route).

## Needs Omar

- None this pass. Q24's Korotkoff-phase-count reading (4 audible phases vs 5 named
  phases) is resolved in the question's own explanation, not left as an open question.
- `CON-CVS-D3ED0A0E795D72`'s missing module tagging (see above) is a genuine first-time
  addition, not a ruling call — flagged in the overlay file's own header note for
  visibility, not escalated.

## Remaining (not authored this pass, logged for the next author)

- `OSPE "Answers" Yousef Amr.pdf` pp.8-10, 17 SBA questions, 100% keyed via clean PDF
  highlight annotation (not the corpus's usual hand-drawn-ink trap), topics: BLS key
  phrases, paediatric pulse-check, choking management, AED, polytrauma/ABCDE, cervical
  spine precautions, GCS, definitive airway, paediatric choking. Triaged in full above;
  not seeded/authored this pass since the Fakous Final paper alone already supplied a
  complete 30-50-question cluster. `resume-first` for author2/next pass.

## Author2 update (pp2ospe pass)

16/17 of the above authored as cluster `pp2ospe` — `question/ZU-MED-108-pp2ospe-mcq.md`,
`concept/ZU-MED-108-pp2ospe-concepts.md` (15 new concepts; Q3 reused lane1's own
`CON-FND-5C4297B73F7F48`, no new mint), `article/ZU-MED-108-pp2ospe-articles.md` (4 new
articles). `pp2ospe-q16` held: on render, the printed options B/C ("First aid approach
… DOES NOT include") are corrupted/scrambled in the source PDF itself — "B. Transfer
the patient on a" cuts off mid-clause and "C. Keep the helmet on wheelchair" reads as
two concatenated half-sentences — a genuine print defect, not an extraction artifact;
the PDF highlight marks C but the fact actually tested cannot be recovered with
confidence. Broad `find-existing.mjs`/`grep -ril` search (including the other Zagazig
lane, ZU-MED-105 lane 3 — professionalism/ethics only, no overlap) found 0 live hits, 0
pending hits, and one rejected-merge near-miss (a paediatric GCS *scoring* concept in
`MUST-Source-Imports`, a different atomic fact from this batch's GCS-*purpose* concept).
With this pass, `Final Hamdy 1` and `Basic clinical skills 1.pdf` remain catalogue-only
(no lettered MCQs, confirmed in this file above) — **ZU-MED-108's keyed sources are now
exhausted.**
