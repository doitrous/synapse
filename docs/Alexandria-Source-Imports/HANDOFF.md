# HANDOFF — Alexandria University lane (orchestrator)

Last written 2026-08-23 ~00:50 Cairo. Branch `claude/alexandria-university-content-000583`
(worktree `.claude/worktrees/alexandria-university-content-000583`). Nothing pushed; main merged
through `d82dd36` / `0e08ac1` / `ed87a85`. Files are the memory: resume from this file +
`LANE-BRIEF.md` (§1–§21) + `Instruction Manual for Content Creation/00-START-HERE.md` + `13-orchestration.md`.

## Chain of command
Report only to the session named `synapse-chief-of-staff-…` ("Chief of staff — content lanes");
deltas only (hash, number, blocker). Omar's orders in force: Year 1 only until publishable (§17);
question-led scope (§10–§11); overlay minting (§12/§16); context hygiene (§21).

## Committed so far (all on the branch)
| Hash | What |
|---|---|
| f83c7fe | 23 AU modules, `AU-<CODE>` ids, `docs/import-ready/academic/au-modules.md`, `AU_MODULES` |
| ed7c8f0 / 2a168bc | manifest: 3,502 sources, twins, content twins, stream/cohort signals; OCR complete |
| 25b0484 / 1bcf357 / 69c79c6 | `scripts/alexandria/extract/pagetext.py` + cache guard; intake textcache separated |
| c722ea3 / 8b244cd | 13 triages consolidated (`coverage/00-wave1-triage-checkpoint.md`), publish plan (`coverage/00-publish-plan-year1.md`), wave-1 decisions |
| 1c2fdf6 | AU-MED-102 Anatomy: 3 new concepts, 3 articles, evidence, 3 MCQs (gate lines in body) |
| 194420e | AU-MED-102 Histology + Physiology: 25 concepts, 5 articles, evidence, 21 MCQs |
| 76cc236 | AU-MED-102 Biochemistry sub-lane A: CHO chemistry 14 concepts, 1 article, 12 MCQs; 13 resources |
| c4b3e55 | AU-MED-103 Biochemistry: 26 concepts, 9 articles, 30 MCQs; 38 pending-live updates |
| 654b24e | AU-MED-102 Biochemistry sub-lane C: 13 concepts, 4 articles, 20 MCQs (+12 on pending ids) |
| 5ac21ea | AU-MED-102 Anatomy pending-live: 23 labelled Kasr updates + 14 questions |
| 6ac97cb | AU-MED-102 Terminology: 81 glossary terms, 4 concepts, 2 articles, 4+2 questions — LANE DONE |
| 6fd9e4e | AU-MED-102 Biochem D: 26 concepts, 3 articles, evidence, 7 pending updates (19 ideas + questions owed) |
| f9a57e7 | AU-MED-103 Histology: 5 concepts + 5 live updates, 2 articles, 10 MCQs (audit key fix + pending/practical questions owed) |
| cd248e4 | AU-MED-102 Embryology: 4 concepts, 3 articles, 12 pending updates + 13 questions — LANE DONE |
| b9cb23c | Terminology shelf (subjects/ node under Foundations) + 3 concepts re-placed — 102-TERM fully DONE |
| 369ef39 | AU-MED-103 Biochemistry: 33 questions on Kasr ids — 103-BIOC DONE |
| 432ee37 | AU-MED-102 Biochem A: lipid chemistry 23 concepts, 10 MCQs (protein + enzymology remain) |
| 5751218 | AU-MED-102 Biochem B: bioenergetics + CHO metabolism — 8 concepts, 6 articles, 12 MCQs, 23 pending updates + 10 questions (lipid metabolism 55 ideas remain) |
| 78f2205 | AU-MED-105 Anatomy Step 2: 27 concepts, 7 articles, 36 pending updates — questions (460) with fresh lane W1-105-ANAT-Q |
| 6d32266 | AU-MED-105 Histology: 18 concepts, 8 articles, 33 + 14 questions — LANE DONE |
| 06f320a | AU-MED-103 Histology: audit 0, 13 pending questions + 9 practical written — LANE DONE |
| b5415d0 | AU-MED-102 Biochem D complete: 43 concepts, 3 articles, 38 + 5 questions — LANE DONE |
| bcb70d0 / 77d538d | 103 Physiology textbook record fixed (detector recognises only the evidence-source resource shape) |
| 033e435 | AU-MED-106 Anatomy groundwork: keys confirmed, Telegram bank triaged, 2 overlays (28 concepts + questions running) |
| ae39518 | AU-MED-102 Biochem B: 37 Kasr overlays (lipid + CHO) + 21 pending questions (lipid questions + explanation bar owed) |
| d4b0239 | AU-MED-102 Biochem A protein chemistry: 32 concepts, 10 MCQs (enzymology with fresh lane W1-102-BIOC-A2) |
| 7b86515 | AU-MED-103 Physiology: 19 concepts + 17 updates, 7 articles, 49 MCQs — LANE DONE (resource file format fix in flight; 10 spot items owed) |

## Lanes (Sonnet subagents; resumable by id from the roster in the orchestrator scratchpad; a lane
## whose transcript is gone is restarted fresh from its committed triage file — never redo finished work)
DONE lanes: 102-HIST+PHYS, 102-TERM, 102-EMBR, 102-BIOC-D, 103-BIOC, 103-HIST, 103-PHYS, 105-HIST, 102-ANAT (pending-id questions limited by 17 Kasr concepts with no article — routed to Kasr Y1), BIOC-C, 103-BIOC (NEW/live scope; pending-id questions in progress).
Running Steps 2–4 (orders: `LANE-ORDERS-PHASE1.md` + lane rulings in `coverage/00-publish-plan-year1.md` § Corrections):
102-ANAT (pending-live label fix + 126 questions) · 102-EMBR · 102-TERM (glossary-first; cut by a
server rate limit, resumable) · 102-BIOC-A (lipid/protein chemistry + enzymology remain) ·
102-BIOC-B metabolism · 102-BIOC-C nitrogen/blood · 102-BIOC-D molecular · 103-BIOC ·
103-HIST (owns the boundary questions) · 103-PHYS (textbook resource) · 105-ANAT (keys by eye) ·
105-HIST. Restarted fresh 2026-08-23 ~01:00 (transcripts lost): 105-PHYS (third sitting), 106-ANAT, 106-PHYS
(both re-triage against the Telegram practical CVS bank first), F1 fetch (second sitting, ≤20 min).
103-BIOC sent back for questions on its 12 pending ids; 105-HIST sent back for a missing claim + Step 3.
Done: 102-HIST+PHYS (194420e). F1 first sitting landed one MED 106 practical CVS bank; found the
"ASM Minds" cohort channels (paid-content brands with occasional free gifts).

## API outage 2026-08-23 ~01:00–01:40
Every resumed authoring lane died with "stalled: no progress for 600s" twice over (Kasr Y1 saw
the same). Rule from the chief of staff: keep ≤4 concurrent, probe with one small lane
(BIOC-C: audit + CLAIMS row + report), resume the others only when it completes. Lane ids are
in the orchestrator's roster; any lane whose transcript is gone restarts from its triage file.
F1 fetch is DONE (browser free; 1 file landed for MED 106; channels for Omar in the fetch log).

## Tag audit (Omar's order, brief §24)
Lane T1 (`acceff98807d7552d` in the roster) is writing `scripts/alexandria/check-tags.mjs`, proving
module_subject/exam_weight/university_notes semantics on shared records, and fixing gaps in
files no other lane is writing. Its numbers go to the chief of staff; the check joins every GATES.

## Uncommitted lane output on disk
`git status` shows concept/, article/, evidence/, question/, glossary/, pending-live/ files from
the lanes above. Commit per lane when its report lands, gates re-run first, gate lines in the body,
question-backed records separate from everything else.

## Next steps, in order
1. Per lane report: re-run gates (batch per file; simulate of its own files; audit filtered to its
   ids; pending-live with the Kasr targets as plain simulate args), commit, report the hash.
2. When F1 stops: "browser free" + landed/not-landed to the chief of staff; re-run
   `scripts/alexandria/intake/{inventory,probe,classify,manifest,index}.py` so Telegram files get
   sourceIds; tell the 106 lanes the ids.
3. Rebuild `INDEX.md` in every import folder (orchestrator only) with Omar's order: academic →
   Kasr Y1 files named in pending-live/INDEX.md → resources → articles → concepts → evidence →
   questions → pending-live last.
4. Publishable check per module (§17); report per module.
5. Years 2–3 frozen until "RESUME".

## Open asks of Omar
Alexandria Telegram channel links / joins (ASM Minds); zero orientation documents for any module;
the list of Kasr Y1 batches already applied in production; `medical:snapshot-live`.

## Exact resume message for a fresh orchestrator session
"You are the Alexandria University orchestrator. Read docs/Alexandria-Source-Imports/HANDOFF.md,
LANE-BRIEF.md, Instruction Manual for Content Creation/00-START-HERE.md and 13-orchestration.md.
Check `git log --oneline -20` and `git status`; commit any lane output whose report is in
CLAIMS.md Done after re-running its gates; resume or restart the lanes listed in HANDOFF.md from
their triage files; report deltas to the chief-of-staff session."
