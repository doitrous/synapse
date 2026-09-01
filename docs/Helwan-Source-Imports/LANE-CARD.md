# LANE-CARD — Helwan University Year 1 (hu)
This module's content lives on branch `codex/helwan-year1-content`, not `main`. **The approved Year 1 release (HU-BMS-101, HU-BMS-102, HU-LCS-103) is COMPLETE, uploaded to production, and exact-read-back as Draft — do not re-import it.** Read `docs/Helwan-Source-Imports/CLAUDE-HANDOVER.md` on that branch before touching anything; it says STOPPED at Omar's request as of this writing.

## 1. Identity and ids
University id `hu`. Years `HU_Y1`… Module ids `HU-<CODE>`: `HU-BMS-101`, `HU-BMS-102`, `HU-LCS-103`, `HU-PSY-104` (the last is an authority hold, zero content — see §7). Files: `docs/Helwan-Source-Imports/{concept,article,question,written,practical,evidence,coverage}/`.

## 2. The ten rules that cannot bend
Same ten as every lane. Nothing changes from Draft without Omar's direct instruction — that includes fixing a typo in a live record; a "fix" is still a mutation of production content.

## 3. Read text, don't look at pictures
Organized source root: `/Users/doitrous/Desktop/Universities/helwan/Year 1/`. Import backups/audits: `/Users/doitrous/Desktop/Universities/helwan/Year 1/Administration/Import Backups/` (620 files / 51 GiB final archive — read-only reference, not a place to write). `node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` if a blocker needs a fresh source read, but there is currently no safe local authoring backlog in the approved scope (§7) — most work here is verification, not extraction. Rule: `status` → `show`; `words=0` → `pagetext.mjs ocr`; `render` ONLY that one page if the OCR text is unreadable.

## 4. Author: there is nothing left to author in scope
The three approved modules have **zero safe local authoring/upload debt** (BMS-101, BMS-102 Families270–295 fully audited with no safely authorable batch remaining, LCS-103 Families1–230 exhausted). Do not invent work by re-reading a "finished" family. If Omar supplies a new source or lifts a blocker (§7), author it the same way as any other lane: seed → `node scripts/content/emit-mcq.mjs <seed.json> --out <batch.md>` → `node scripts/content/gate.mjs batch <batch.md> --with <sibling files>` → `node scripts/content/gate.mjs simulate <files, apply order>` (no `--with`) — Helwan's own per-family generators (`scripts/helwan/HU-BMS-102-family223-part*-author.mjs`) are lane-owned precedent, not something to invoke blind.

## 5. Progress ledger
`coverage/HU-Y1-TRIAGE-GATES.md`, `coverage/HU-BMS-102-PATH-MICRO-TRIAGE.md`, `coverage/HU-LCS-103-TRIAGE.md`, `coverage/HU-PSY-104-TRIAGE.md` are the existing progress record — read them, do not regenerate from batch files.

## 6. Commit rhythm
There should be no new commits in the approved scope without an explicit Omar instruction. If one is given, first commit within minutes, commit + push every 5–10 questions, report ≤ 20 lines ending `HANDOFF: <branch>@<sha> · resume-first: <next>`, and update `CLAUDE-HANDOVER.md`.

## 7. This lane's known traps
- **Do not re-import anything.** The release is live and verified Draft; rerunning an import to "reproduce a report" is a real mutation risk, not a read.
- Every remaining blocker needs an explicit authority from Omar, not editorial judgement: `HU-PSY-104` needs an official Helwan/Capital paper or department bank with a matched key (Q12/Q14 have a real B-vs-D key conflict, unresolved); `BMS-101` has 9 malformed MCQs and 19 unmarked written prompts needing corrected options/keys or explicit mark authority; LCS practical evidence (94 prompts, 526 teaching plates, 3,039 mappings) needs rights-cleared media and an importer/schema ruling before it can leave evidence-only.
- Seven unscoped `HU_Y1` rows need an owner/catalogue assignment — do not assign one yourself.
- `docs/chief-of-staff/duplicate-keys.md` in this worktree is modified shared residue — do not stage or revert it without identifying its owner first.
- `tmp/` is untracked shared residue — do not delete or stage it.

## 8. Walls → where the answer lives
Id/search/overlay law → `00-START-HERE.md` §3–4. Gate/tool shape → `SHARED-TOOLCHAIN.md` §Content CLI. Explanation/coverage bar → `05-questions.md`. Current stop/resume state and blocker list → `CLAUDE-HANDOVER.md` on `codex/helwan-year1-content`, plus `docs/chief-of-staff/HANDOFF.md` and `BOARD.md` (named first in that handover's own read order).
