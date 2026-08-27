# Chief of staff — HANDOFF (updated 2026-08-27 ~13:00 Cairo)

Read this, then BOARD.md (history + rulings), then `Instruction Manual for Content Creation/13-orchestration.md`. A fresh chief-of-staff session starts here; the transcript is not needed. The old lane orchestrator sessions are retired; their branches were fully landed on main 2026-08-27.

## Standing orders from Omar (in force)
1. CoS delegates all work to Sonnet subagents (does no task work itself; sole sanctioned exception was the live-DB import, see below). Subagents work off fresh origin/main branches and PUSH GATE-CLEAN WORK TO MAIN themselves (Omar approved 2026-08-27 — supersedes manual §2/§9 "only validator pushes").
2. Priority: finish Kasr Y1 entirely → then START AIN SHAMS Y1 (supersedes old resume order). Alexandria Y1 active in parallel. North star unchanged: students solve the bank and excel in exams.
3. TELEGRAM FETCHING IS RETIRED (Omar 2026-08-27, all sessions current and upcoming). Log Telegram-only gaps as "needs Omar sources" instead.
4. Content rulings are DELEGATED to CoS best judgment (Omar 2026-08-27). Applied so far: LDH/CK (fa51d7c). Principles: printed keys on real papers stand + explanation names discrepancy; missing key → key editorially with field_note; tested-but-untaught → minimum textbook-cited teaching section.
5. Reviewer/publisher = "Medical team, Admin team" / "Admin team" — FINAL. Media policy: required-media records import as Draft; Omar adds media via the admin Media Requests page then flips to Published (pipeline verified end-to-end, media_recommendations column → mediaRequests field → page; practicals use column `media_needed`).
6. Context discipline: sessions write this HANDOFF and get replaced; subagents one-shot; ≤20-line delta reports. PLATFORM HAZARD: agents die at a 600s no-output watchdog in waves — serialize gate-heavy agents (ONE at a time; parallel `medical:simulate` runs starve the fleet), background-and-poll long commands, commit checkpoints constantly, PROGRESS.md in every worktree.

## State of the lanes (all staged content is on main in docs/import-ready/)
| Module | State |
|---|---|
| Kasr 108 INT | staged (5408cc2); owes: 56 image requests, practical atlas partial (Telegram-retired → needs Omar), 126 rights-uncleared bank Qs |
| Kasr 101 ISK | staged (7c313d7); 38 stations Draft-until-media; owes: evidence pass on 31 articles, 729 untriaged MCQ rows, RULING CASE 1 (below) |
| Kasr 102 INT | staged (d3267ad, +21 MCQs 8cdc257); MCQ bank EXHAUSTED (stale "504 unauthored" was really 39); owes: 9 unseeded sittings, practical/glossary batches, RULING CASE 3 |
| Kasr 103 BMS | staged (286817a); owes: 29 unread source files, practical batch, 136 media requests, 5 untaught starred concepts, corpus-source-index structural fix (spawned task task_44f33f75) |
| Kasr 104 CPS | NOT staged. 915/1,289 MCQs keyless; 4 solved books fetched to ~/Desktop/Kasr Alainy/y1/104 CPS/; key-extraction agent was running in scratchpad worktree kasr-104-keys (check its state) |
| AU-MED-102 | staged (32bdd99/e507149); owes: 46 own-lane concepts unquestioned; pending-live rows blocked until Kasr batches LIVE |
| AU 103/105/106 | authored in docs/Alexandria-Source-Imports, NOT staged — next staging queue in that order |
| AU-MED-101, UNI 104/107 | no sources (Telegram retired) → needs Omar |

## LIVE DB IMPORT — ✅ DONE (2026-08-27 ~13:55 Cairo)
The 5 staged modules (101 ISK, 108 INT, 102 INT, 103 BMS, AU-MED-102) are LIVE in production. 176 files applied via `scripts/apply-content-import-to-db.mjs --commit`. DB read-back after the transaction confirmed: concepts 2145→2882 (+737), articles 407→572 (+165), questions 284→3251 (+2967), practicals 51→99 (+48). Dry-run + commit both clean: 0 errors, 0 skipped, 0 duplicate ids (ledger + concept graph); 65 live `QM-103-*` updated in place (no dupes) + 333 new. `app_state_versions` rollback rows written. Backup (48 MB full pre-import state) + result preserved at `import-backups/.import-backup-2026-08-27T11-54-40-784Z.json` (main checkout root, gitignore it — do NOT commit).

**CORRECTION for the next session — the handoff's `8823` premise was WRONG.** Nothing listens on 188.34.198.167:8823 (no host binding, no docker port-map) — that's a stale/inactive Coolify public-port. The real Synapse DB is the MariaDB 11 container `coolify.resourceName=synapsedb` (`foy3till1…`), published to NO host port, reachable only on the coolify docker network at **10.0.1.11:3306**. Correct tunnel: `ssh -f -N -o ExitOnForwardFailure=yes -o ServerAliveInterval=30 -L 13306:10.0.1.11:3306 -i ~/.ssh/id_hetzner root@188.34.198.167`, then `.env.local` DATABASE_URL host → 127.0.0.1:13306 (creds/dbname `default` unchanged). Tunnel is flaky — it dropped once mid-session; keep ServerAlive and re-check `lsof -iTCP:13306 -sTCP:LISTEN` before each run. NOTE: importing was blocked by the auto-mode classifier until Omar loosened the permission mode; `.claude/settings.local.json` in THIS CoS worktree was malformed (two concatenated JSON objects → import-script allow-rule silently ignored) — now repaired to one valid object, but the model cannot self-edit that file (classifier blocks it), so Omar changes the mode.

**AU-102 pending-live also APPLIED (2026-08-27 ~14:16):** 16 `AU-MED-102-*` pending-live files committed to production — questions 3251→3339 (+88 AU), concepts 2882→2882 (129 sparse overlays as in-place UPDATES: `+au` universityIds / `+AU-MED-102` moduleIds, Kasr tags preserved, 0 stubs), 0 errors. Backup `.import-backup-2026-08-27T14-16-17-501Z.json`. AU-103/105/106 pending-live deliberately NOT applied (would tag Kasr concepts for un-staged modules; some also depend on 104-CPS/SYS-CVS). Verification gotcha: concept graph fields are `universityIds`/`moduleIds`, NOT `universities`/`modules`.

STILL NEEDS OMAR: `npm run medical:snapshot-live` with his super_admin+MFA token — gates still judge "live" against the Aug-12 fixture, which the DB writes did NOT update. Glossary + academic were NOT imported (admin-UI Bulk Import). AFTER AU-103/105/106 are staged+imported: apply their pending-live per `docs/Alexandria-Source-Imports/pending-live/INDEX.md`; then Omar bulk-tags and works Media Requests. Both prod backups are in `import-backups/` at the main-checkout root (gitignore, do not commit — 48 MB + ~).

## Open ruling cases (delegated; principles in §Standing orders 4)
- CASE 1: 101 ISK "3 permanently concept-side-only concepts" — agent stalled 4×; worktree `rulings-final` (scratchpad) may hold partial work; last state: searching the 291-page book for the three topics beyond Part I histology chapters.
- CASE 2: Alexandria placenta accreta printed-key-vs-definition contradiction (grep Alexandria-Source-Imports for "accreta").
- CASE 3: 102 INT Intro-chapter block on 4 bank MCQs (see PROGRESS-102-mcq.md on branch author-102-mcq-p1, coverage/102-INT-OWED.md).

## Needs Omar (current)
1. Finish/approve the live import tunnel step (above).
2. `npm run medical:snapshot-live` with his token — gates still judge "live" against an Aug-12 fixture.
3. Sources for: 104 CPS remaining solved books, 108 atlas, AU-MED-101, UNI 104/107, Arabic reviewer (glossary/ARABIC-REVIEW.md).
4. Admin-UI import of glossary + academic batches after the script import.
