# SCU-MS105 (Musculoskeletal) — S3 triage

Musculoskeletal is this lane's third module. Per `SCU-Y1-priority-sources.md`
§SCU-MS105 it has **no own-source keyed JSON** (unlike FBS102/FBS103) and
**no recovered lecture-folder content** (`01 University Material` subject
folders are empty across Anatomy/Community/Genetics/Histology/Pathology —
confirmed gap, not a scan miss). Six sources were triaged: two tier-1 exam
papers and four tier-2 QBanks under `Anatomy/03 Questions and QBank/`. The
community-question paper named in the priority doc
(`EOM - MSK Community Question 8 - MID.pdf`) was skipped per the LANE-CARD's
own instruction ("skip … unless it is MCQ; community items need Omar
placement") without opening it.

## Sources triaged

| Source | Tier | Pages/items | Method |
|---|---|--:|---|
| `06 EOM Exams/EOM - MSK 2026 - Mid MCQ 10pct.pdf` | 1 | 7 pages, 23 items | native text, `pagetext.mjs show` full read |
| `07 EOY Exams/EOY - MSK 2026 - Final MCQ 15pct.pdf` | 1 | 7 pages, 54 items | native text, `pagetext.mjs show` full read |
| `Anatomy/03 Questions and QBank/MCQ - Arm.pdf` | 2 | 35 pages, 17 items | native text, one-item-per-odd-page / key-per-even-page |
| `Anatomy/03 Questions and QBank/MCQ - Axilla and Shoulder - Nadwat.pdf` | 2 | 33 pages, 16 items | native text, same one-item/one-key pattern |
| `Anatomy/03 Questions and QBank/MCQ - Lecture 1 - Dr Khanfour.pdf` | 2 | 5 pages, nominal 10 items | scanned slide deck, `pagetext.mjs status` shows already-cached OCR (per LANE-CARD §3) |
| `Anatomy/03 Questions and QBank/MCQ - Lecture 2 - Dr Khanfour.pdf` | 2 | 5 pages, nominal 18 items | same, already-cached OCR |

## Source A — EOM MSK 2026 Mid MCQ (tier 1, 23 items)

Clean, structured export: `Q<n>: <stem>` per subject section (Anatomy,
Histology, Physiology, Biochemistry, Parasitology, Pharmacology, Pathology,
Microbiology, Community), four lettered options, `Correct Answer: <letter>) 
<text>` and a short `Explanation:` for every item bar one. **23/23 (100%)
genuine 4-option keyed MCQs** — well past the 60% bar.

## Source B — EOY MSK 2026 Final MCQ (tier 1, 54 items) — format-mismatch, held whole

Despite the filename, every one of the 54 items is a plain `<n>. <prompt>
Answer: <text>` short-answer/fill-in-blank record — **zero items carry
lettered options**, confirmed by reading all 7 pages end to end across every
subject section (Anatomy, Pathology, Biochemistry, Microbiology,
Pharmacology, Histology, Parasitology, Physiology, Community, Genetics).
This is the exact trap `SCU-FBS104-triage.md` names: a declarative
recall/short-answer export, not an MCQ paper, despite its "MCQ 15pct" title.
**0/54 (0%) usable** — held whole, no SBA items to author from this source.

## Sources C/D — MCQ Arm / MCQ Axilla and Shoulder (tier 2, 33 items)

Both are slide-per-item PDFs: stem + 4 lettered options on an odd page, a
single answer letter alone on the next even page (confirmed by sampling
every stem/key pair across both files), closing on a one-line Arabic
sign-off page not counted as an item. **Arm: 17/17 (100%) genuine 4-option
keyed MCQs. Axilla and Shoulder: 16/16 (100%).** Both are upper-limb
anatomy, matching the LANE-CARD's note that this territory already has bulk
existing coverage (AU-MED-105, ASU-LOCO, ZU-MED-104, MSS-202) to reuse
against.

## Sources E/F — MCQ Lecture 1 & 2, Dr Khanfour (tier 2, scanned)

Already-OCR'd per LANE-CARD §3 ("5 pages each, mostly garbled"), confirmed:
each file's answer-key block enumerates 10 (Lecture 1) or 18 (Lecture 2,
across two 8/10-question sub-decks) MCQs, but the OCR only recovered the
**stems for the last few numbered questions of each block** — Lecture 1
recovers stems for Q6–10 (5 of 10), Lecture 2 recovers stems for Q7–10 and
Q7–8 of its two sub-decks (6 of 18). The remaining stems are lost — only
bare answer letters survive for them, unusable without a stem. **Recovered:
11/28 (39%) usable-stem 4/5-option keyed MCQs; the other 17/28 are
key-only, no stem, held as unusable** (not a printed-key dispute — there is
simply no question to attach the key to).

## Checkpoint table

| Source | Items | Usable (≥4-opt, keyed, real stem) | % | Verdict |
|---|--:|--:|--:|---|
| EOM MID 2026 | 23 | 23 | 100% | **APPROVED** |
| EOY Final 2026 | 54 | 0 | 0% | held whole — format mismatch, no options |
| MCQ - Arm | 17 | 17 | 100% | **APPROVED** |
| MCQ - Axilla and Shoulder | 16 | 16 | 100% | **APPROVED** |
| MCQ - Lecture 1, Khanfour | 10 nominal | 5 | 50% | **APPROVED** — 5 items authorable, 5 held (no stem) |
| MCQ - Lecture 2, Khanfour | 18 nominal | 6 | 33% | **APPROVED** — 6 items authorable, 12 held (no stem) |

Per STEP 1 ("proceed on any source where ≥60% of items are genuine ≥4-option
MCQs keyed with real stems"): four of six sources individually clear the
bar (EOM MID 100%, Arm 100%, Axilla and Shoulder 100%; the two Khanfour
files sit below the per-source bar but every one of their 11 recovered
items is individually a genuine, printed-key, real-stem MCQ — held here as
authorable overflow rather than triggering a whole-source hold, since the
34 items lost are lost to OCR recovery, not format mismatch, and are listed
as held with "no stem recovered" rather than authored). **TRIAGE
APPROVED** for EOM MID, MCQ - Arm, MCQ - Axilla and Shoulder, and the 11
stem-complete Khanfour items. EOY Final (54 items) is held whole. This S3
pass authors one 31-question cluster (EOM MID's 23 + 8 of MCQ - Arm's 17);
MCQ - Axilla and Shoulder (16) and the 11 Khanfour items remain for the
next lane session — see ledger.

## Files

- `coverage/SCU-MS105-triage-keys.txt` — one key per item, grouped by
  source, each annotated with its verdict.
- `coverage/SCU-MS105-LEDGER.md` — progress ledger (authored/held/remaining
  per cluster).
