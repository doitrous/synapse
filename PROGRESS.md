PROGRESS

## WIP checkpoint - all 5 solved books extracted
- Shebl Physio: 725/725 (native "Correct Answer: X)" text)
- Zahra Histo: 160/164 recovered (native "answer x" + chapter-end grid table for Respiratory chapter; 4 genuinely unkeyed in Lymphatic)
- Maher Cardio (Solved): 80/86 (bold-font OR underline-bar option; 6 skips: 5 ambiguous multi-marked, 1 unanswered)
- Anatomy Thorax Dept (Solved): 23/23 (yellow highlight vector rect)
- Jalal Explained (Solved): 357/369 (yellow highlight vector rect; 12 skips: 8 ambiguous multi-marked, 4 unanswered phrenic-nerve subsection)
Total recovered: 1345 keyed questions across 5 books.

## Key-recovery + triage checkpoint (this pass)
Matched the 5 books' 1345 keyed questions against the 915 keyless mcq-bank.json
rows via 3 progressively fuzzier passes (all option-set-validated to avoid
false positives — see match_recover.py/fuzzy_stem_pass.py/token_overlap_pass.py
docstrings): exact-stem 210, fuzzy-stem (ratio>=0.90) 117, token-overlap
(jaccard>=0.55) 56 = **383 recovered, 2 conflicting (books disagree, need a
human ruling), 530 no match at all in any solved book**.
Applied via apply.py (generator-input pattern, no hand edit of mcq-bank.json's
generated fields): 374 pre-existing + 383 new = **757/1289 mcq-bank rows now
keyed**. 532 remain keyless (2 conflicting + 530 no-match) — logged in
editorial-keying-candidates.json as candidates for the ANSWER-KEY GAPS ruling's
"keyed editorially, no printed key" path. NOT keyed here — that is authoring
work, reserved for after TRIAGE APPROVED.

Correction for the record: a mid-run status message said "757/915" and asked
to "finish the remaining ~158" — that arithmetic is off. 915 was the ORIGINAL
keyless count; 383 were recovered out of it, leaving 532 genuinely unmatched
(not 158). 757/1289 is the bank's total-keyed count (374 pre-existing + 383
new), not a remaining-to-do figure.

Three passes were run; a 4th pass (looser jaccard/ratio thresholds) was not
attempted — pass 3 already yielded steep diminishing returns (210 -> 117 -> 56)
and the ANSWER-KEY GAPS ruling treats a wrong key as worse than a missing one,
so further loosening was judged not worth the false-positive risk without a
human eye on the borderline cases.

Next: TRIAGE APPROVED needed before minting/authoring the 532 editorial-keying
candidates or touching concepts.

## Continuation session (kasr-104-cont2)
Orienting from this file + editorial-keying-candidates.json (per instructions, did NOT
slurp mcq-bank.json — sliced/grepped only). Confirmed org-wide gate applies here too
(docs/chief-of-staff/BOARD.md, Instruction Manual 13-orchestration.md S1 Triage row):
lanes stop after the triage table and mint/author nothing until CoS says "TRIAGE
APPROVED". This lane had not received that yet at pass start. Completed deliverable 1
(triage table via find-existing.mjs concept search over the 757 keyed rows, 45
clusters classified live/pending/new — see docs/Kasr-Source-Imports/coverage/
104-CPS-MCQ-triage.md) and stopped there per the gate, flagging the conflict.

CoS then reviewed and returned **TRIAGE APPROVED** with an explicit ruling: keying
(assigning an answer to an existing question under ANSWER-KEY GAPS) is NOT
concept-minting and is not gated by triage — cleared to proceed on the 532. Concept/
article authoring for the pending/live clusters stays HELD until all 1289 rows are
keyed and fully triaged (one clean authoring pass later).

## Editorial keying pass — 532/532 candidates processed
Worked all 532 editorial-keying-candidates.json rows in 15 batches (batch 11 onward;
batches 1-10 were the earlier triage-table pass) via the generator-input pattern:
`editorial-answers.json` (checked-in input, one entry per row: answer, fieldNote
"keyed editorially, no printed key", >=3-sentence explanation, per-wrong-option
distractor notes) + `apply_editorial.py` (rerunnable, folds onto mcq-bank.json's
`answer` field, never overwriting an existing printed/recovered key, mirroring
`apply.py`'s pattern exactly).

**Result: 357 keyed, 175 excluded (not keyed).**
- mcq-bank.json: **1114/1289 now keyed** (374 printed + 383 solved-book-recovered +
  357 editorial), `answerConfidence: "editorial-no-printed-key"` for the new 357.
- 175 rows were read and judged too corrupted/ambiguous to key confidently and
  excluded instead (`editorialExcluded: true` + `editorialExcludeReason` on the bank
  row) — per the ANSWER-KEY GAPS ruling, a wrong key is worse than a missing one.
  Common exclusion reasons, in rough order of frequency: (1) OCR page-bleed merging
  2+ unrelated questions into one stem/option-set (the largest single category,
  especially dense in Anatomy — Large Nerves/Tubes/Veins of the Thorax, Mediastinum);
  (2) the correct answer embedded as unlettered text in the stem (a recurring
  extraction pattern) with no assignable option letter surviving; (3) genuinely
  missing the correct option (all surviving lettered choices independently false, or
  all independently true with no way to pick the intended one); (4) discursive
  written-exam prompts (essay/short-answer questions) misfiled as MCQ rows; (5)
  questions depending on an unavailable figure/graph; (6) two co-equally valid
  mechanisms with no combining option to choose between.
- Anatomy was the most corrupted subject (~45% exclusion rate); Histology and
  Physiology's cleaner, more clinically-phrased sources yielded a much higher
  keying rate (Histology's Cardiovascular-Arteries cluster alone: 20/20 keyed, 0
  excluded).

Next: report to CoS with the keyed/excluded split; concept + article authoring for
the pending/live clusters (and a stem-level read of the 3 topic-only clusters
flagged in the triage doc) is the one clean pass still held for later, per CoS's
TRIAGE APPROVED ruling.
