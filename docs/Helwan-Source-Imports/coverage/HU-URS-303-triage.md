# HU-URS-303 — Urology/Renal (Genito-Urinary-Renal, "GUR") triage

Source: `coverage/HU-Y3-priority-sources.md` §HU-URS-303 tier 1 — "the entire
authorable corpus (3 files, no marks/schedule exist)". Corpus root
`/Users/doitrous/Desktop/Universities/helwan/Year 3/URS 303/`. Unlike
HU-GIT-301-B and HU-ORL-305 (a clean numbered MCQ bank + a separate printed
answer key, joined programmatically), **URS 303 has no department question
bank and no dedicated answer-key file of any kind.** All three files are
student-produced past-question/recall documents. sha256 verified against
`manifest/y3-sources.json` for all three (matched exactly).

| File | Pages | Words (native) | pagetext status |
|---|--:|--:|---|
| `Past Exams and MCQs/MCQs - URS 303 GUR questions.pdf` | 6 | 1,375 | native text, 0 garbled |
| `Past Exams and MCQs/MCQs - URS 303 phase questions.pdf` | 8 | 1,088 | 7 native, p8 garbled |
| `Past Exams and MCQs/EOM - MCQs - URS 303 final exam Batch 2021 related.pdf` | 25 | ~90 native (mostly section-title captions) | 23/25 pages are scanned images with only a caption in the text layer (`garbled=no` but words<10 — a present-but-undecodable text layer, see `Anatomy Model 1:` etc.); OCR sample run on pages 2,3,5,6 (4 of the render-cap-14 budget used) |

`Administration/00 Source availability note.md` (read in full): an
authenticated Telegram search of the module's own channel on 22 Aug 2026 for
schedule/marks/quiz-content/instructions/exam/`تعليمات` returned nothing
except these three PDFs (posted 6 Feb 2026). No values inferred or
fabricated — matches `LANE-CARD-Y2-3.md` §3's own characterization of URS
303 as the thinnest Year-3 module.

## What each file actually is

**`GUR questions.pdf`** (99 items, `❀`-bulleted, counted programmatically):
one-line **fact statements with the answer baked in** ("Nerve supply to
kidney: celiac plexus"), grouped under subject headers (Anatomy 24, Physio
17, Histo 16, Bio 6, Micro 16, Pharma 7) plus an unlabelled Patho case list
(10 case references, no answers, e.g. "Case about mastitis in lactating
female"). None of the 99 are phrased as a stem with a set of lettered
options — there is nothing to "join a key" against because the answer is
already inline and there are no distractors. "GUR" is the module's own
colloquial exam name (confirmed independently on the final-exam file's p25:
"امتحان فاينل GUR دفعة 2020" = "GUR final exam, 2020 batch"), so this file
reads as fully on-module.

**`phase questions.pdf`** (100 items, same `❀` format): same fact/short-
question + inline-answer shape, but spanning far more subjects (Anatomy 19,
Physio 20, Bio 14, Histo 10 + Family 5, Micro 8, Para 5, Patho 10, Pharma 10).
Read in full (pages 1-7; page 8 is garbled, not OCR'd — see below) and
independently re-confirms the old triage's finding cited in
`HU-Y3-priority-sources.md` (**"92% off-module, phase questions spanning
other Year-3 modules"**): only the Anatomy section (pelvic/GU/reproductive:
ureter, uterus, ovary, UB, testis) and part of Physio (renal
threshold/insulin/K-shift items, mixed with unrelated CVS/pulmonary
physiology) are URS-303 material; Bio (jaundice, DKA, MODY), Histo (general
epithelium/cell biology), Family (rheumatic fever, meningitis), Micro
(hepatitis, poliomyelitis, H. flu), Para (giardia, malaria, toxoplasma),
Patho (Cushing ulcer, MI, COPD) and Pharma (antidiabetics) are other Year-2/3
modules' content, not URS 303's.

**`EOM - final exam Batch 2021 related.pdf`** (25 pages): a scanned
multi-source compilation — several different students'/groups' recollections
of the same final exam, stapled together with subject-model headers
("Anatomy Model 1", "Histology First Group", etc.), several partly in
Arabizi/mixed-language shorthand ("nafs as2elet el form ele adem t2reban" =
"same questions as the previous form roughly"). OCR'd sample (pages 2, 3, 5,
6 — 4 of the render-cap-14 budget) recovers real question fragments (e.g.
"Which structure connects uterus to labia majora — Round ligament of
uterus") but the option lists are inconsistent or missing entirely across
groups, several items are truncated mid-sentence, and no answer-key page
exists anywhere in the file — p25 (the only page with substantial native
text) is a list of Telegram/Google-Drive links to source material, not an
answer key. This file is genuinely on-module and closer to real exam
recollection than `phase questions.pdf`, but its transcription quality and
structural completeness (missing/inconsistent choice lists, no key to check
against) make it unusable as clean joinable MCQ+key material without
reconstruction that goes beyond triage/OCR scope — each item would need its
distractor set invented from scratch with no key to confirm the "correct"
answer beyond a single student's unverified recollection.

## Join rate

**No separate answer-key file exists for any of the three sources — there is
nothing to compute a formal join rate against**, unlike GIT-301-B (302/302)
or ORL-305 (959/980). Substituting the closest honest proxy — "items with an
unambiguous inline answer *and* a full stem+option-set shape" — the rate is:

| File | Items | Inline-answer | Real stem+options | On-module |
|---|--:|--:|--:|--:|
| GUR questions | 99 | 99 (100%) | 0 (0%) | 99 (100%, by file identity) |
| phase questions | 100 | 100 (100%) | 0 (0%) | ~8 (8%, matches old triage's 92% off-module) |
| final exam (OCR sample, 4pp) | ~12 recognizable | ~12 | 0 (no key to confirm any) | ~12 (100%, sample) |

**0% of the corpus has a real stem with a printed/joinable option set and a
verifiable key.** Even the maximally generous reading (treating every
inline-answer fact statement as "keyed") caps at 199/199 = 100% *keyed* but
0% *real stems* — the two-part gate ("keyed **with real stems**") is not met
by any file. Final-exam items, the one source with genuine stem+option
shape, have no key at all to verify against and were not fully OCR'd (21 of
25 pages untouched, reserving render-cap budget rather than spending it on a
file already shown to lack an answer key).

## Chapter/subject map (as far as the corpus supports one)

Subjects referenced across all three files, matching the shared Year-3
"Model 1 / Model 2" exam-block pattern also seen in GIT-301/FTF-304/ORL-305:
Anatomy, Histology, Physiology, Biochemistry, Microbiology, Parasitology,
Pathology, Pharmacology, Family Medicine. No per-chapter numbering exists
(none of the three files uses numbered `Q1..Qn` items) — subject headers are
the only structure present.

## Concept-reuse spot check (informational only, not gating)

Ran `find-existing.mjs` + `grep -ril` for 6 literal terms this corpus's
Anatomy/Physio content would need (search-before-mint per
`00-START-HERE.md` §3-4), to confirm the reuse landscape ORL-305's triage
flagged (Ain Shams `CON-REN-*`, Kasr `SYS-REN`) is real and current:

| Term | Result |
|---|---|
| celiac plexus kidney | no hit |
| renal threshold glucose | no hit (Kasr `SYS-REN` concepts use different phrasing) |
| ovarian fossa | no hit |
| tunica albuginea testis | 1 hit, ASU-UG histology concept (different fact: layers, not "surrounds testis") — not a merge |
| vas deferens | 3 hits across ASU-UG `CON-REN-*` reproductive concepts — real overlap likely if this module is ever authored |
| pudendal canal | no hit |

Confirms the LANE-BRIEF's expectation of heavy reuse against ASU-UG
`CON-REN-*` (140+) once/if this module reaches authorable material — noted
for whoever picks this module up next, not consumed here.

## TRIAGE APPROVED condition

**Not met.** 0% of items have a real stem + joinable option set + verifiable
key; even the most generous inline-answer reading tops out at 100% *keyed*
but 0% *real stems*, and the module's own gate is the conjunction of both
("≥60% of items are keyed with real stems"). Per the dispatch's own
instruction, this lane **stops here** — no STEP 2 authoring, no mints.

## Recommendation / walls

URS 303 needs one of:
1. A real department question bank + answer key from Telegram or another
   channel (the module's own Telegram search already came back empty — see
   `Administration/00 Source availability note.md`; this is a "needs Omar
   sources" gap, not a re-triage-able one).
2. A ruling on whether `GUR questions.pdf`'s 99 inline fact/answer pairs are
   authorable as some other content shape (e.g. claims/flashcards) rather
   than SBA questions, since they carry a real sourced answer but no option
   set — out of this lane's authority to decide unilaterally, since the
   dispatch scopes this lane to MCQ questions via the bank+key build path.
3. A scoped OCR pass on the remaining 21 pages of the final-exam PDF (this
   pass used 4 of the render-cap-14 budget) *if* a matching answer key
   surfaces from source #1 above — without a key, further OCR of this file
   would not change the gate outcome.

No mints, no authoring, no DB/importer actions taken this pass.
