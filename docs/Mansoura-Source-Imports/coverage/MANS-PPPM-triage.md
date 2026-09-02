# MANS-PPPM — triage (lane `mans-pppm-author1`)

## Scope note

The Telegram `PPPM` archive group (422 files) spans old-baseline S1 modules
`MANS-PPP` and `MANS-PPMIP`, **not** the current-cohort S2 module also coded
`MANS-PPPM-201` — per the LANE-CARD, per-file resolution of this split is
unstarted, so this lane authors under the fallback file prefix `MANS-PPPM`
(exact printed module name recorded per-record in `module_subject`; see
"Module id" below). Per the task brief, the tier-1 paper `PPPM Exam Bank (
61, 60, 59, 58).pdf` (`src_111bbd078054dc30d3af`) was read first and proved
usable, so the fall-through sources (`Patho MCQ Formative & Exams`, `PPPM
Continuous Book`) were not opened this pass.

## Source triaged

`PPPM Exam Bank ( 61, 60, 59, 58).pdf` — a 44-page, four-subject compiled
exam bank (a 4-cohort back-catalogue, cohorts 61/60/59/58), organised by
subject rather than by cohort:

| Subject | Pages | Approx. items |
|---|---:|---:|
| Pharmacology | 1-16 | ~80 |
| Pathology | 17-27 | ~55 |
| Microbiology | 28-36 | ~45 |
| Parasitology | 37-44 | ~40 |
| **Total (whole bank)** | 44 | **218** |

This pass triaged and authored from the **Pharmacology section only, p.1-6
(questions 1-30 of the section's ~80)**. Pathology, Microbiology,
Parasitology, and Pharmacology p.7-16 are catalogued (this file, the
resource record) but **not yet triaged** — flagged as remaining work, not
silently skipped.

## Readability and key evidence

`pagetext.mjs status` on the full 44-page PDF: all 44 pages `garbled=no,
ocr=no` — a clean, non-scanned text layer throughout. `pagetext.mjs keys`
reported **216 keyed / 0 ambiguous / 2 unmarked across 44 pages (99%)** —
red-text, bold-flag printed keys, well above the lane's 60% approval bar on
its own.

**Trap found and worked around:** `pagetext.mjs keys`' letter-to-question
attribution is **unreliable on this file's layout**. The bank prints its
answer key as a **standalone letter in a right-margin column spanning the
full height of each 5-question page block** — not inline beside, or on the
same text-extraction line as, the correct option. A full-page render of p.1
and p.2 (`pagetext.mjs render`, after `mark-garbled` to enable it) showed
the true keys visually — Q1=A, Q2=D, Q3=A, Q4=E, Q5=E, Q6=A, Q7=D, Q8=E,
Q9=B, Q10=A — while `pagetext.mjs keys` reported Q1=B, Q2=A, Q3=B, Q4=B,
Q5=B, Q6=A, Q7=A, Q8=B, Q9=B, Q10=B for the same ten questions: only 2 of 10
matched. The tool's line-proximity heuristic clearly mis-attributes the
key column's floating letters to whichever option line the PDF's text
extraction happens to place them nearest, which does not correspond to the
actual key on this template.

**Fix applied:** every key used in this pass's 30 authored questions (p.1-6)
was verified by rendering the page image and reading the key column
directly, not by trusting `pagetext.mjs keys`' output. This cost 6 renders
(p.1-6), well under the lane's 14-render cap. **Flagged for whoever
continues this source**: do not trust `pagetext.mjs keys` on the remaining
pages (7-44) of this same file without a render spot-check first — the
mis-attribution is systematic to this bank's layout, not a one-off.

## Triage verdict: TRIAGE APPROVED

99% keyed by printed red-text bold marks with real stems (216/218 across
the whole bank; 30/30 in the triaged Pharmacology p.1-6 slice, all
render-verified) — well above the lane's 60% bar. Proceeding to author one
cluster from the verified slice.

## Module id

LANE-CARD's Mansoura identity table lists `MANS-PPP` and `MANS-PPMIP` as
the old-baseline S1 modules this Telegram-`PPPM` group spans, but does not
resolve **which pages of this specific file belong to which of the two** —
"per-file resolution of `AEP`/`HBG`/Telegram-`PPPM` is unstarted." Per the
task brief's own fallback instruction, this lane uses **`MANS-PPPM`** as
the file prefix (`concept/MANS-PPPM-concepts.md`,
`article/MANS-PPPM-articles.md`, `question/MANS-PPPM-*-mcq.md`), with the
exact printed subject name ("PHARMACOLOGY", per the source PDF's own page
header) captured in every record's `module_subject` field
(`MANS-PPPM > Pharmacology > ...`). **Flagged for the chief-of-staff /
whoever resolves the PPPM split**: this file's Pharmacology section may
ultimately belong entirely to one of `MANS-PPP`/`MANS-PPMIP` (Pharmacology
is a plausible fit for either, depending on how the department split its
S1 curriculum) — a future rename/re-key pass may be needed once the split
is resolved, but the content and keys themselves do not change.

## Concept coverage (this pass)

23 distinct concepts cited by the 30 authored questions:

- **13 reused** (all pending, from Kasr 108-INT/208-INT/102-INT, Helwan
  GIT-301, and Assiut MPT-104 pharmacology batches) — general pharmacology
  and ANS pharmacology overlaps heavily with Kasr's basic-science
  pharmacology content, exactly as expected for Year-1 basic science.
- **10 minted** (`CON-FND-*`), all `find-existing.mjs`-searched first (both
  narrow and broadened queries) with zero true duplicates found. One
  additional genuine duplicate candidate (prodrug, `CON-FND-BA163122577F76`
  in a Helwan file) was found but not reused — its cited article id has no
  corresponding article record anywhere in the corpus (an orphan reference,
  confirmed by grep across every article directory), so a fresh record with
  a working article was minted instead rather than citing a broken
  reference or editing another university's file. Flagged in both the
  question's and the concept's `field_notes` for whoever next touches that
  Helwan file.

Full concept-by-concept detail (search terms, hit/miss, reuse/mint
decision) is inline in each question's `field_notes.keySource`/
`field_notes.reuse`/`field_notes.mint` in `question/MANS-PPPM-pppmbank-mcq.md`
and in `concept/MANS-PPPM-concepts.md`'s own `field_notes.sourceCandidateIds`.

## Needs Omar / needs a second pass (not blockers, logged so they aren't lost)

- Pharmacology p.7-16 (remainder of the Pharmacology section, ~50 more
  items) — not yet triaged.
- Pathology (p.17-27), Microbiology (p.28-36), Parasitology (p.37-44)
  sections of this same file — not yet triaged; these subjects sit outside
  this author's Pharmacology focus and outside `pharm` subject scope, so a
  future pass (possibly a different author) should pick them up.
- `pagetext.mjs keys`' right-margin-key-column mis-attribution on this file
  — a real tool limitation, not specific to this lane; worth flagging
  upstream if other lanes hit exam banks with the same right-margin key
  layout.
- Isoniazid/acetylator-status hepatotoxicity (`CON-FND-EB87625D1D27A9`,
  question pppmbank-q21) — this bank's printed key credits rapid
  acetylation; standard texts more often credit slow acetylation with
  isoniazid toxicity (chiefly peripheral neuropathy). Printed key followed
  per lane rule, doubt flagged in `author_notes`, not silently corrected.
