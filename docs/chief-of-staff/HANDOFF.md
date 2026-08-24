# Chief of staff — HANDOFF (updated 2026-08-23 01:05 Cairo)

Read this, then BOARD.md (full history and rulings), then `Instruction Manual for Content Creation/13-orchestration.md`. A fresh chief-of-staff session starts here; the transcript is not needed.

## Standing orders from Omar (in force)
1. Lanes report only to the chief of staff; lanes never message each other; the chief of staff routes everything and delegates all work to Sonnet subagents (does no task work itself).
2. North star: students solve the question bank (MCQ, written, practical) and excel in their exam. Law of priority: real exam papers → department files → notes ≤ tier 5 → textbooks. Scope = examinable. Articles before questions.
3. PRIORITY (2026-08-22 ~19:30): pause every lane except Kasr Year 1 and Alexandria Year 1; finish those two to publishable so Omar can publish; then RESUME the rest (Kasr Y2–5 → Helwan → Ain Shams).
4. CONTEXT DISCIPLINE (2026-08-23 00:30): sessions with large contexts write a HANDOFF.md and compact or are replaced by a fresh session; subagents are one-shot; reports are deltas ≤20 lines.

## Sessions (address = ListAgents name)
- Kasr Y1 orchestrator: `media-library-user-hierarchy-42f2c5-8a` — ACTIVE. Branch claude/kasr-alainy-content-report-e0ee59. 108 INT and 101 ISK at the publish line; 102/103/104 in triage/authoring; enrichment of explanations running; INDEX-<module>.md + coverage/<module>-GATES.md per module; full-sequence simulate in click order is the hand-over proof.
- Alexandria orchestrator: `alexandria-university-content-000583-b4` — ACTIVE. 16 authoring lanes on AU-MED-102/103/105/106 after TRIAGE APPROVED; holds the browser (Telegram) for its Year 1 list; first landed file 1c2fdf6.
- Validator / shared tooling: `focused-jepsen-7b1a4e-cd` — HOLDING, queue empty (E dcc6929, F 2d3c6c6, G c255322 landed; 24 hashes total). Its handoff: docs/chief-of-staff/VALIDATOR-HANDOFF.md — a fresh validator session starts from it + 13-orchestration.md when a new queue exists. Only red gate on main: medical:presence (103 BMS content, Kasr Y1's).
- Kasr Y2–5: `Kasr Alainy year 2,3,4,5 content planning` — PAUSED at 9d1925a (retrofit unfinished, not for main). Resume: merge main, re-read 00+13, prove retrofit, Y3/Y4 surveys, structure agents, remaining fetch list.
- Helwan: `vibrant-wu-9bf9b7-6b` — PAUSED at d5bcabe with triage table (≈3,560 Qs) and five pre-issued rulings; "TRIAGE APPROVED" takes effect on RESUME.
- Ain Shams: `busy-goldberg-ac3e9e-bd` — PAUSED at 2271002; session may have exited at the 00:30 limit (unreachable at 00:40). Resume needs Omar's Ain Shams Telegram links; Year 1 has papers in 3/10 modules.

## Browser (Telegram Web in Omar's Chrome) queue
Alexandria (holding, Year 1 list) → Kasr Y1 (T3 104 solved books → T5 102 Baqoon 198/199 → T6 104 Baqoon 199 → T4 101 EOY 197 → T7 → T1 residual) → Kasr Y2–5 remainder → paused lanes. Rules: listed links + search only; never Join; never addlist; no video/audio; tier ≤ 5; "browser is yours" / "browser free" through the chief of staff.

## Needs Omar (unchanged)
1. Run `npm run medical:snapshot-live` with his AAL2 token (MEDICAL_API_BASE=https://synapse.doitrous.com) so "live" = production.
2. Which docs/import-ready + Kasr-Source-Imports batches he has already applied.
3. Telegram: Alexandria/Ain Shams channel links; Kasr item T3 (104 solved books, unblocks 915 MCQs).
4. Arabic reviewer for docs/Kasr-Source-Imports/glossary/ARABIC-REVIEW.md.
5. Reviewer/publisher names for 101 and 108 before status → Published.
6. `oph` / `ent` subjects in curriculumCatalog.ts; CLIN 3 vs 315/316/317; Y5 "4th year" papers.
7. Delete two stray untracked files in the main checkout: docs/Ain-Shams-Source-Imports/manifest/asu-y1/y2-sources.json (+ sibling).

## How to operate
- On any report: verify numbers with a read-only Sonnet audit when a claim gates publishing; rule; route; log to BOARD.md; escalate only what needs Omar.
- A silent session is idle, not busy: ping the validator to continue its queue; `notify_when_idle` is one-shot and re-delivers stale notices — do not re-arm on every tick.
- Manual is on main (0e08ac1 → 2adac8d). Lanes merge main before every gate run.
