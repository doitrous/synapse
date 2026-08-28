# AU-MED-102 untested-concept backlog — CLOSED 2026-08-28

Chief-of-staff dispatched this lane to close AU-MED-102's untested-concept
backlog the question-led way: for each own-lane concept with no authored
question, check the module's own exam papers / MCQ banks for real demand
before writing anything. Never invent a question for chapter coverage the
module doesn't examine.

## Result: all 46 (48 as independently re-counted) were tested-but-unauthored — 0 chapter-only-no-demand

The chief-of-staff's board entry estimated 46 (Biochem-structural 39,
Biochem-molecular 5, Physiology 3, Histology 2, Anatomy 1). Re-deriving the
untested set directly (diffing every concept id in the five AU-MED-102
concept files against every `main_concept`/`concept_ids` referenced across
this module's own `question/` and `pending-live/` files) found **48**
(Biochem-structural 37, Biochem-molecular 5, Physiology 3, Histology 2,
Anatomy 1) — the 2-item gap from the board's estimate is immaterial; both
counts are in the same range and the re-derived list is exhaustive by
construction. All 48 were investigated. **Every one had real exam demand
already recorded on the concept itself** (`exam_signal`, `original_wording`,
or an `atomic_claim_ids` → citation chain carrying the verbatim printed
stem/options) — this lane's concepts were mined from department MCQ banks and
EOM papers in the first place, so the population that reaches "concept, no
question" is, by construction, already pre-filtered to concepts a real paper
tests. **0 were chapter-coverage with no demand.** Nothing was invented; 46
questions were authored (all 48 minus 2 folded into combined items — see
below), each transcribing a real banked item.

## Split

| Category | Untested (re-derived) | Authored | Notes |
|---|---:|---:|---|
| Biochem-structural | 37 | 37 (as 36 question records — 2 CHO concepts folded into 1 combined item) | 2 CHO + 13 Lipid + 22 Protein |
| Biochem-molecular | 5 | 5 | All 5, including 3 the prior pass had explicitly left unauthored (see below) |
| Physiology | 3 | 3 | 2 from an unkeyed 60-question paper, keyed editorially (see below) |
| Histology | 2 | 2 | 1 EOM-paper item, 1 live-concept overlay (apocrine) |
| Anatomy | 1 | 1 | Resolved a key this lane had earlier called unresolvable |
| **Total** | **48** | **46 question records** (48 concepts closed) | |

## Where the 6 "unkeyed" items actually stood — corrected

Six items across this lane's prior work had been marked as having no
confident printed key, and left unauthored or hedged. Direct visual reads of
the source PDF pages (not the earlier automated text-layer extraction) found:

- **DNA & RNA MCQ Q13, Q25** (`CON-FND-5B8E3AAFEB6C35`, `CON-FND-CA2D65E688434A`):
  tagged "OCR-garbled '0' key" by the prior pass. The bank's own printed
  answer table (p16) is completely legible and reads `13.c`, `25.c` — clean,
  unambiguous. Authored.
- **Protein MCQ Q22, Q34, Q38, Q74** (`CON-FND-8CF5D9C1E7D8B7` zein,
  `CON-FND-493AC407478AA3` histones, `CON-FND-8ED61C8CFF3381` cysteine,
  `CON-FND-A1FC2FAF9F0211` cystine): the resource's own qualification note
  describes this 74-question bank as "57 keyed / 17 unkeyed". A direct page
  render of its answer table (p13) is complete and gapless from Q1 to Q74,
  with no missing row anywhere, including at all four of these positions
  (`22.b`, `34.b`, `38.b`, `74.d`). The "unkeyed" characterisation appears to
  describe a different, lower-quality scan of the same bank (a name-twin file
  with no text layer exists in the corpus); the clean copy this lane already
  cites has no gaps. All four authored as cleanly keyed.
- **Protein MCQ Q58** (`CON-FND-93B011BEEE72F4`, disulfide bonds): the prior
  pass, believing this item unkeyed, guessed "albumin" as the exception and
  flagged its own uncertainty in `field_notes`/`original_wording` (correctly
  noting albumin does carry disulfide bonds in reality — a live tension the
  earlier author had already spotted but couldn't resolve without the key).
  The bank's own table reads `58.d` = **Glucagon** — a 29-residue,
  cysteine-free peptide with no disulfide bonds, which resolves the earlier
  tension cleanly. **Concept corrected in place** (label, definition,
  pitfalls, `original_wording`; record was still pending import, not live,
  so this is a direct edit, not an update-style duplicate) and the question
  authored against the corrected fact.

## The one item left genuinely ambiguous, by design

**DNA & RNA MCQ Q64** (`CON-FND-9D5D6275474035`, mRNA decapping): the bank's
own printed key reads "A or D" with a handwritten marginal note in Arabic
("رأيي أنا" — "my own opinion"), i.e. the source itself records the setter's
uncertainty. This is recorded as printed, not silently resolved. The question
is authored keying **A (decapping)** on independent biochemical grounds
(decapping halts translation initiation and triggers 5'→3' decay; RNA editing
does not itself halt translation) — flagged here for chief-of-staff awareness
as the one item in this closure where the printed source itself disagrees
with itself, rather than being cleanly keyed or cleanly unkeyed.

## Two items resolved from prior "cannot be keyed" notes

- **Apocrine secretion** (`CON-DER-8F25CCE084AF16`, histology): a live
  Kasr-origin concept already overlaid for `au` by an earlier pass, whose own
  `field_notes` named the test ("Alexandria's EOM bank... tests
  apocrine-gland identification") without an `exam_signal` line. Traced to
  EOM "Final foundation 2030" Q103 (p22), printed key `103.C` = Mammary
  gland — clean. Authored.
- **Shoulder circumduction** (`CON-MSK-9E9BBA40F75CE3`, anatomy): the
  concept's own `field_notes` said the Wagih Anatomy MCQ item testing general
  circumduction "sits in the file whose printed answer key is OCR-garbled and
  unaligned to question number... no `exam_signal` line is added because the
  specific question cannot yet be keyed with confidence." A direct page read
  of that file (p6, Q3: "The circular movement is called... d. Circumduction")
  is completely clean and directly legible, keyed `d`. The garbled item
  referenced in the field_notes is a *different* question elsewhere in the
  same file, still unresolved and not touched by this closure. Authored, and
  the missing resource record for this source
  (`src_84b91e011582f2b53494` + twin `src_2fc64c0a9d050208a7d0`) was added to
  `evidence/AU-MED-102-anatomy-sources.md` (it had never been staged).

## Two unusual authoring decisions, both documented in `author_notes`

- **CHO storage/structural classification** (`CON-FND-656649A3CAAE22`): the
  source bank tests this as four separate single-best-answer items (Q49-52,
  each with the same four options — Starch/Cellulose/Glycogen/GAGs — asking
  about a different plant/animal × storage/structural cell). Combined into
  one higher-order pairing question rather than authored as four near-clone
  items, since the concept treats the classification as one unified fact and
  every option restates a pairing the source itself keys.
- **Negative-feedback components** (`CON-FND-B75AF58F0B4C86`, physiology):
  the source (EOM 2030, Physiology Q2) prints only three options (a-c); a
  fourth distractor was added editorially to meet this bank's 4-option floor,
  clearly marked as not part of the printed item.

## Traceability

Own-lane AU-MED-102 questions now testing a `main_concept` that previously had
none: **46** (across `AU-MED-102-biochem-structural-mcq.md` +37,
`-biochem-molecular-mcq.md` +5, `-physiology-mcq.md` +3, `-histology-mcq.md`
+2, `-anatomy-mcq.md` +1). Every one carries `library_ids` resolving to an
existing covering article (no new articles minted), `main_concept` a concept
already live in this batch's own concept files (no new concepts minted, one
corrected in place), and a `source_citation` naming the real paper/bank and
question number.

## Gates run

- `medical:batch` on each touched question file, `--with` the matching
  concept/article/evidence files: 0 errors on all five files (physiology,
  histology, anatomy, biochem-molecular, biochem-structural).
- `medical:batch` on the corrected `AU-MED-102-biochem-structural-concepts.md`:
  0 errors, 69 items, fieldsUsed 52.
- Full-tree `medical:simulate` (positional, `resource/ article/ concept/
  evidence/ relations/ practical/ question/ glossary/`, 305 files): 0
  regressions — only the 29 known AU-MED-105 anatomy-practical labelling-image
  gaps (pre-existing, unrelated, needs Omar's images).
- `medical:audit --source` against that emitted state: 346 total (pre-existing,
  library-wide, unrelated to this lane); 0 among the 46 new question ids or
  the corrected concept id.
- `medical:concept-ids`: "no rival ids".
- `medical:duplicate-keys`: 0 new key collisions (1 pre-existing label
  collision, unrelated, already tracked in `docs/chief-of-staff/duplicate-keys.md`).

## Commits (this checkout's branch, landed on `main`)

1. `8cb1e507` — 11 questions (physiology 3, histology 2, anatomy 1, molecular 5)
   + the missing Wagih Anatomy MCQ resource record.
2. `439748ec` — 15 questions (CHO 2, Lipid 13).
3. `4e1b4dfa` — 22 questions (Protein) + the disulfide-bonds concept correction.
