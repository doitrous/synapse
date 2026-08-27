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
APPROVED". This lane has not received that yet. Proceeding with deliverable 1 only
(complete the triage table via find-existing.mjs concept search over the 757 keyed
rows); deliverable 2 (editorial-keying the 532 = authoring work) is being held pending
explicit TRIAGE APPROVED, consistent with the note directly above written by the prior
pass in this same lane.
