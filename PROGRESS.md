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

## Unrelated shared-file log (103 BMS lane + demo UI verification, from origin/main)
- 2026-08-27: finish-103-bms rebased clean onto origin/main (no conflicts); convention check vs 101 ISK/102 INT/108 INT: docs/import-ready/INDEX.md has NO 103 BMS apply-order section (101/102/108 each have one, 103 does not — not fixed, reported as larger-than-trivial); 0 QM-103-* ids are currently live in server/data/medical-library-v1.json, so the 5 MCQ question batches (QM-103-*) need no "Update matching items" note yet; all 12 staged 103-BMS article files carry status: Draft uniformly, including the ones with required media_recommendations (Draft-until-media convention holds by default); no practical/ or media-requests batch exists for 103 BMS in this pass; all 12 article files carry reviewer "Medical team, Admin team" / final_publisher "Admin team" per standing ruling.
- 2026-08-27 (correction): the line above about "0 QM-103-* ids are currently live" is wrong on the fact that matters — `server/data/medical-library-v1.json` is a stale build fixture, never production (production is Express, `server/src/index.js`; check the live URL, never `dist/` or that JSON file). **Production is live with 65 `QM-103-*` questions today** (Foundations 50, Blood/lymphoreticular 12, Renal 3), imported by Omar from an earlier snapshot of these same 5 MCQ batches. Written the "103 BMS" apply-order section into `docs/import-ready/INDEX.md` (61 files across 6 folders: evidence 1+5+5+4=15, article 12, concept 13, relations 1, question 5 MCQ+14 written=19, glossary 1), mirroring 101 ISK/102 INT/108 INT's structure, with the corrected "Must be On" note on all 5 MCQ question files and on `article/103-BMS-mcq-vitamins-nerve.md` (sparse update to already-live `ART-103-PHY-NERVE-ACTION-POTENTIAL`) and on 3 concept files (`anatomy-concepts.md`, `biochemistry-concepts.md`, `histology-concepts.md`) whose 13 canonical-key rows fixed by `coverage/103-BMS-OWED.md` §1 all resolve to already-live concept ids (verified: all 13 rows' bodies say "live", not just the 8 OWED.md flagged).
- 2026-08-27: per-file `npm run medical:batch` on all 61 staged 103-BMS files (`--with` every sibling 103-BMS concept + article file, matching the 101/102/108 GATES convention). 51/61 clean (`errors: []`). 10 files report non-empty `errors`, none of them a content defect introduced by this staging pass:
  - **6 evidence files, one root cause** — `evidence/103-BMS-sources.md` (9 errors), `-citations.md` (29), `-biochemistry-citations.md` (28), `-generated-citations.md` (164), `-mcq-citations.md` (12), `-mcq-carbohydrate-citations.md` (36) all fail "is not a source the corpus contains". Verified: all 9 `src_*` ids ARE in `docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json`, but `docs/import-ready/evidence/corpus-source-index.json` (267 entries, the file the validator actually checks against, generated by `scripts/kasr/build-source-index.ts`) was never regenerated after 103 BMS's 9 sources were added to the manifest — a shared, generated file, same class as 102 INT's `build-batches.ts` regeneration but touching all lanes' gate output, so left unregenerated rather than run in this bounded stage. Fix: `node --experimental-strip-types scripts/kasr/build-source-index.ts` (or whatever regenerates it from the manifest), owed to whoever next touches the shared evidence toolchain.
  - **2 article files, directory-scope false alarm (same class as 101/108's documented false alarms)** — `article/103-BMS-biochemistry.md` (3 errors) and `article/103-BMS-mcq-lipid.md` (1 error) report `related article ART-{GIT,REN,HEM,END}-TOP-* is authored nowhere in the batch directory` — these are live articles in other modules, outside `--with`'s 103-only scope; resolves clean under `medical:simulate` against real live state (next stage).
  - **1 relations file** — `relations/103-BMS-relations.md`: 671 errors with the concept/article `--with` set alone. Two components, neither a defect: 145 are `no evidence chain — the audit rejects this at rest`, exactly matching the 145 `needs_evidence` rows already declared in the INDEX table (by design, no citation on those relation records yet); re-run with evidence files also named via `--with` drops false "Claim/Citation does not exist" noise to 23 remaining `Target/Source concept does not exist` lines, all cross-module `CON-{REN,GIT,DER,NEU,CVS}-*` ids outside 103's own concept files — same directory-scope-false-alarm class as 108's relations row, resolved by full-folder `medical:simulate` (next stage), not by editing this file.
  - **1 glossary file** — `glossary/103-BMS-glossary.md`: 1 "error", which is `validate-content-batch.mjs` stating glossary is not a batch kind it recognises at all (same as `academic/` being out of scope for `medical:simulate` by design) — not a content problem, the script simply has no glossary branch.
  No trivial fixes were made — every failure traces to either a stale shared generated index or the same directory-scope-vs-live-state gap 101/102/108 already documented and left for `medical:simulate` to resolve, not to a typo or missing flag line introduced by staging.
- 2026-08-27 (final stage): corrected the evidence-file diagnosis above. Ran `node --experimental-strip-types scripts/kasr/build-source-index.ts`: output unchanged, 401/401 sources before and after, `git status` shows zero diff on `docs/Kasr-Source-Imports/evidence/corpus-source-index.json` — it was **not** stale; all 9 of 103's `src_*` ids were already present. The real finding: that script's `OUT` constant is `docs/Kasr-Source-Imports/evidence/corpus-source-index.json`, but `validate-content-batch.mjs:1351` resolves `corpus-source-index.json` beside the batch — `docs/import-ready/evidence/corpus-source-index.json`, a symlink to `docs/medical-library-program/evidence/corpus-source-index.json` (267 entries, built by the separate `scripts/build-corpus-source-index.mjs` walking `corpus/01-explicitly-taught/` only). That symlink target structurally cannot contain a Kasr Y1 manifest source — different corpus, different generator, by design — so no regeneration of the Kasr-side index clears the 6 evidence files' `medical:batch` errors; verified all 9 of 103's `src_*` ids are `MISSING from medlib-index` (checked directly). This is a repo-level toolchain gap (the two indices were never wired together), not staleness, and not a 103 defect — filed as a spawned task, not fixed here (bounded staging pass, cross-cuts every Kasr lane).
- 2026-08-27: chained `medical:simulate` for 103 BMS, 10 steps in INDEX apply order (resources → articles(12) → concepts(13) → claims(5) → citations(5) → spans(4) → relations → question-MCQ(5) → question-written(14) → glossary), each step's `--emit` feeding the next step's `--source`: `errors: []` and `rejected: 0` at every step (concept-kind batches report no `rejected` field at all, by design — created/updated only). One discrepancy vs INDEX.md's stated update counts, not an error: `103-BMS-anatomy-concepts.md` simulated 19 updates (INDEX said 5) and `103-BMS-histology-concepts.md` simulated 18 (INDEX said 3) — more rows resolved to already-live ids than the INDEX table claims; harmless since those files were already correctly marked "Must be On", but the INDEX counts are undercounts worth fixing later.
- 2026-08-27: combined `medical:simulate` across all of `docs/import-ready/` (108+101+102+103+every pre-existing CVS/REN/RES batch), 190 batches: `errors: []`, 0 rejected across all "rejected" fields present. 3 pre-existing skips, none 103-related (`academic/au-modules.md`, `academic/kau-modules.md`, `glossary/INDEX.md` — all "detected as unknown", by design). before→after: concepts 1718→2714, relations 47→871, claims 1741→3975, citations 1818→2689, resources 47→209, glossaryTerms 0→596.
- 2026-08-27: `medical:audit --source <combined emit>`: 346 total error-array entries. 291 are "no evidence chain" on relations; cross-checked programmatically against `relations/103-BMS-relations.md` by (source, type, target) — **all 145** of 103's own declared `needs_evidence` rows are present and accounted for exactly once, the remaining 146 are pre-existing needs_evidence relations from other already-staged modules (101/102/108/CVS etc., not introduced by 103). The other 55 entries are field-completeness notes (missing `resourceIds`/`relatedArticleIds`/`atomicClaimIds`/etc., blank `microtopicId`/`media`/`lastReviewed`) — every single one references a non-103 id (`ART-CVS-*`, `ART-101-ANA-*`, `ART-102-*`, `CON-CVS-*`, `CON-FND-*`/`CON-HEM-*` from pre-existing content). **Zero new errors trace to 103 BMS** in either category. No files unstaged; nothing to fix.
- 2026-08-28 (UI · clinical-case vitals verification): verified the `Vitals` strip renders on a live case in the demo build (branch `claude/dashboard-practical-ui-b03087`, now on `main`). Opened the seeded **Post-partum breathlessness** case (`cc-postpartum`, vitals lifted verbatim from its own stage-1 prose) in the case runner. The **Observations** card renders in the runner sidebar above **Case path** with note `room air` and HR 118 bpm · BP 108/68 mmHg · RR 30/min · SpO₂ 91% · Temp 37.4°C — correct values, units, and note. Abnormal flagging confirmed by computed `color`: HR / RR / SpO₂ = `rgb(168,18,30)` (`--color-danger`, red), BP / Temp = `rgb(22,25,32)` (`--color-ink`, neutral) — exactly the authored `abnormal: ['hr','rr','spo2']`. Verification method: the Browser pane would not composite frames in this environment (screenshots timed out), so confirmation was DOM-based (`get_page_text` + `getComputedStyle` on the `dt`/`dd` cells) rather than a screenshot — a more precise check of the flag colours than an image. Test-only caveat: the demo onboarding gate kept blocking, so the enrolment audience was seeded directly into `localStorage` (`synapse.account.audience.v1` = `{universityId:'kau', year:'1', group:''}`) to reach the app; no code change, demo-only. Full suite was already green at ship (1532 pass, tsc clean, build ✓).
