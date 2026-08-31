# Chief of staff — activity board

North star: **a student solves the question bank (MCQ, written, practical) and then excels in their university exam.**
Every record any lane produces must trace to a question a student will sit, or to the explanation of one.

## CURRENT PRIORITY ORDER (Omar, 2026-08-30)

**Finish Helwan Year 1, validate it to the publish line, then upload it to the live site. Continue MUST Year 1 in parallel.**

- ACTIVE: Helwan Year 1 BMS-102 and LCS-103 source triage; MUST Year 1 FHB-102-2 source triage after FHB-101 and MSK-101-1 approval.
- CURRENT EVIDENCE CHECKPOINT (2026-08-31): Helwan Year 1 = 7,311 accepted prompts / 5,777 answers / 2,431 concepts. Recent BMS virtual-lab evidence now totals 15 image MCQs + 40 practical case/image written operations + 6 drawing/written operations (31 source-supplied answers), plus LCS practical evidence (94 prompts / 526 teaching plates / 3,039 mappings / 173 unresolved residues / 87 keys). BMS is checkpointed through Family 284 with 13 paths / 11 unique hashes remaining; Families 270–274 and 276–277 governed 4,968 external pharmacology objective occurrences but excluded them from Helwan-eligible totals, Family 275 closes one absent duplicate-carrier path without recounting Family 258, Family 278 excludes two unkeyed off-module MCQs from a repeatedly labelled Module 1A lecture, and Families 279–284 close teaching-only pharmacology carriers at zero assessment delta. LCS source triage is exhausted at Family 230 with 0 paths / 0 hashes remaining and literal `TRIAGE APPROVED`; its external ledger closes at 7,635 prompts / 7,349 answers / 221 concepts. MUST FHB-101 = 8,044 questions / 7,626 answers / 489 concepts; all 115 selected paths / 106 hashes are processed and literal `TRIAGE APPROVED` is recorded. MUST MSK-101-1 = 7,165 questions / 6,960 answers / 36 concepts; all 103 selected paths / 101 unique hashes are reconciled and literal `TRIAGE APPROVED` is recorded. MUST FHB 102-2 is at 4,926 questions / 4,693 answers / 62 concepts, with 32 selected paths / 32 unique hashes remaining; its full later-source read-ahead ledger is now closed at a projected 5,444 questions / 5,217 answers / 62 concepts with zero remaining source-review debt, pending governed sequential commits.
- HELWAN DOWNSTREAM READINESS (2026-08-31): LCS authoring roots exist but contain no HU-LCS-103 batches, generator, `INDEX.md`, or `GATES.md`. The deterministic Helwan source index covers all 946 manifest paths / 888 content-addressed source IDs, and the existing validator resolves it from the Helwan evidence folder. The tested HU Year 1 fallback catalogue and staged academic import now declare all four modules in their source-proven terms, and the governed subject tree declares 15 literal module subjects. Consolidated Helwan approval remains blocked by BMS debt. Before authoring, refresh the stale claims/readiness state. The live HU_Y1 academic-protection gate remains intentionally closed until guarded publication; do not bypass it. Preserve article -> question -> practical/written ordering and exclude the external LCS ledger from Helwan sitting authority.
- STUDENT-FACING / LIVE: Helwan Year 1 still has 0 authored articles / 0 question batches / 0 practical records / 0 written batches and has not been uploaded; S2 authoring is held behind the fresh literal `TRIAGE APPROVED` gate.
- HELWAN SEQUENCE: finish remaining source debt -> consolidated literal `TRIAGE APPROVED` -> articles before questions -> practical/written records -> full import simulation and gates -> guarded additive production import -> live verification.
- PUBLICATION SAFETY: use `scripts/apply-content-import-to-db.mjs`; dry-run first, require zero rejected/skipped rows, preserve its timestamped backup/version history, then `--commit` only after the release package is validated.
- All downloaded material, if any becomes necessary, goes into the existing `/Users/doitrous/Desktop/helwan/Year 1/` or `/Users/doitrous/Desktop/MUST/Year 1/` tree. Current work uses local files and has downloaded nothing.

## PRIORITY ORDER (Omar, 2026-08-22 ~19:30)

**Pause all universities and years except Kasr Year 1 and Alexandria Year 1. Finish those two to publishable state so Omar can publish them; then resume the rest.**
- ACTIVE: Kasr Y1 (101–108), Alexandria Y1 (AU-MED-102/103/105/106 wave 1; 101 via Telegram), validator lane (serving those two).
- PAUSED (checkpoint, hold for "RESUME"): Kasr Y2–5 (after its current fetch run), Ain Shams, Helwan (lanes stop at triage checkpoint).
- Browser queue now: Kasr Y1 (T3 104 solved books → T5 → T6 → T4 → T7 → T1 residual; launches only after its stall probe passes) → Kasr Y2–5 remainder → [paused: Helwan, Ain Shams]. Alexandria's slot done: 1 file landed (MED 106 practical CVS bank, ASM Minds); MED 101 orientation exists only as chat text. Kasr Y1 items 1–2 closed: both gaps are real (atlas posted = 12-page corpus copy; cartilage MCQs never in the PDF).
- Publishable = every banked/triaged question's main concept covered by an article; all gates green; INDEX per import folder with exact order + flags for Omar; pending-live separated; audit debt blocking visibility cleared.

## Standing orders (issued 2026-08-22)

1. Lanes report only to the chief-of-staff session. Lanes never message each other; cross-lane needs are routed here.
2. Drift test, applied to every batch before it is called finished:
   - Does every question come from, or mirror, what this university/year/module actually sits? (past papers first; invented items only to fill a named gap)
   - Does every concept / article / relation / glossary term exist because a question tests it or its explanation needs it? If not, it is out of scope.
   - Is the correct-answer explanation a teaching moment, not a one-liner?
   - Does the batch validate clean (`medical:batch`, simulate, audit)?
3. Report format (≤20 lines): lane · produced (files + counts by kind) · validation status · share of records traceable to a question · blockers · next step.

## Lanes

| Session (address) | Lane | Last report | Status | Drift risk |
|---|---|---|---|---|
| media-library-user-hierarchy-42f2c5-8a | Kasr Alainy Year 1 (101–108) | 2026-08-22 first | Wave A: 8 concept/article lanes for 102/103/104 (791 banked MCQs blocked on missing articles); committed 108 relations (156), spans, merges; all gates clean | LOW–MEDIUM — 102/103 Wave A commits were chapter coverage (0/91 exam-linked); 104 audit is demand-driven (271/335 authorable MCQs chapter-covered, 0 demand chapters uncovered, 47/184 concepts no-demand). Ordered: question-backed first + separate commits; gate output in commits; 104 Physiology uncommitted; 64 untagged 104 rows; 915/1,289 104 MCQs keyless → Telegram item 3 matters |
| Kasr Alainy year 2,3,4,5 content planning | Kasr Alainy Years 2–5 | 2026-08-22 first | Phase 0: 6 subagents (toolchain retrofit, Y3–5 surveys, Y2 Telegram fetch 53 gaps). 0 content records yet. Holds the single browser queue | LOW by design (one concept per exam question). Open: 315/316/317 → CLIN 3 module mapping needs Omar |
| alexandria-university-content-000583-b4 | Alexandria Y1–3 (3,642 files) | 2026-08-22 first | Phase 0: 4 subagents (intake manifest, academic structure from 2023 bylaws, Telegram gap ledger, importer-collision probe). 23 modules (AU-…), gap ledger, 771-line validator probe done; manifest OCR running. Wave 1 APPROVED: 13 (module, dept) lanes on AU-MED-102/103/105/106, triage checkpoint before minting, no-paper guard on 105/106 | LOW — question-led |
| busy-goldberg-ac3e9e-bd | Ain Shams Y1–3 (2,177 files) | 2026-08-22 first | PAUSED at 2271002: 26 ASU- modules, manifests 2,142 rows (twins, gaps per module), scripts/asu ~11k lines with three-way mint switch proven, LANE-BRIEF + LANE-TEMPLATE (triage checkpoint). Resume-first: Y2/3 exam-rich modules (ASU-CNS-3, ASU-UG, ASU-ENDO-3…) while Year 1 waits on Omar's channel links | LOW — assessments-first plan. Curriculum move Y2T2↔Y3 handled as one concept/article, both paths |
| vibrant-wu-9bf9b7-6b | Helwan Y1–3 (946 files) | 2026-08-22 first | Manifest 946 rows (Y1 790, Y2 68, Y3 70); 12 modules HU-…; six Year 3 lanes RUNNING to a triage checkpoint; 0 records yet. Year 2 has no offline sources → Telegram slot after Kasr Y1 | LOW — question-led |
| focused-jepsen-7b1a4e-cd | Shared tooling / validator | 2026-08-23 05:30 | STOPPED; handoff 20348d5 (26 hashes). OPEN QUEUE for a fresh session: H2 module_subject `+` append; H3 university_notes on concept/question/practical; I resource detector branch (both shapes real; 19 columns); concrete-empty-default sweep. Landed (gate, snapshot-live, catalogue check, CI, stub/plus/label fixes, per-record floors, practical scope, update semantics). Handoff: docs/chief-of-staff/VALIDATOR-HANDOFF.md. Only red gate: medical:presence (103 BMS content → Kasr Y1) | n/a |

## Kasr Y1 PUBLISH PLAN (HEAD 1ce0d20, 2026-08-22 ~20:05)

| Module | Done | Remaining (owner) | ETA |
|---|---|---|---|
| 101 ISK | NOT YET two-sided: of 282 tested concepts, 127 both-sided, 155 concept-side-only (heuristic article_ids) → two reading lanes (anatomy ~105, histology ~50) add back-links / fix articles; explanation enrichment + 38-station practical repair also pending | publishes when the coverage pass, enrichment and practical repair are green |
| 108 INT | AT THE PUBLISH LINE (b5f9e6d): ten-step chained simulate in click order, zero rejects; INDEX-108-INT.md (14 rows) + 108-INT-GATES.md; audit 3 editorial lines. Atlas gap is real (item 1 closed) | needs: practical scope columns on its 10 stations; Omar's reviewer names |
| 102 INT | concepts, articles, evidence | MCQ triage 504 rows (B5a/b), 9 unseeded sittings (B6), relations (C9), INDEX | ≈2–3 h |
| 103 BMS | concepts, articles | evidence (C7), every question on 22 papers (B7a/b/c), relations, INDEX | ≈3 h |
| 104 CPS | concepts, articles, physio evidence | evidence+ledger regen (C8), MCQ triage 335 (B8), written pool 1,085 (B9), relations, INDEX; 915 MCQs keyless until Telegram item 3 | ≈3–4 h |

Cross-cutting after question lanes stop: sitting-year sweep (30 rows + ~600 lines), GATES.md per module, master INDEX, full-sequence simulate in checklist order (ordered), final ledger.
Totals now: concepts 730→1,063; articles 184→277; relations 0→350; glossary 0→514; spans 168→562; claims 1,437→1,584.

## Alexandria Y1 TRIAGE (c722ea3, approved 2026-08-22 ~20:30)

~3,188 questions across 13 lanes (AU-MED-102/103/105/106); ~877 concepts: 63 live / ~355 pending in Kasr Y1 / ~301 new. 100% question-traceable. ETA after approval: 103/106 ~3–4 h, 105 ~4–5 h, 102 ~6 h (BIOC split 4 ways). Plan: coverage/00-publish-plan-year1.md. Explanation bar (≥3 sentences) imposed from the first question.

## Rulings

- YEARS ARE IDS (2026-08-23): `years` carries canonical year ids only (`KAU_Y1`, `AU_Y1`), exact case — never the label `Year 1` (2,469 rows across 41 files today) or lower-case ids (114). Kasr normalises in the sitting-year sweep. Concepts have no years/module columns: their per-year trace is exam_weight_by_year keys + universities.

- TESTED BUT UNTAUGHT (2026-08-23): a banked question whose concept has no department text gets the minimum textbook-cited teaching (a section in the nearest article, scope = what the questions ask, field_notes say why); questions stay in the bank. A tested concept is never left unteachable.

- PER-UNIVERSITY TRACEABILITY (Omar, 2026-08-23 ~03:30): every shared record carries, for EACH university using it, its university id, its year id(s), its module id(s), its own module_subject path, its exam_weight_by_year key(s), and a university_notes source line — so filtering by one university reproduces that university's view. Lanes verify by script per module; validator gate H enforces universities ↔ years ↔ module ↔ exam-weight consistency; manual 00 §3 carries the law.

- CONVENTION CLASHES (2026-08-23): when two universities' exams key different answers for one shared idea (ATP/glucose 38 classical vs 30–32 modern), the shared concept states both conventions and which exam keys which (owner of the concept amends the prose); each question keeps its printed key and its explanation names the convention. Never a sparse update to another lane's prose field.

- TWO-SIDED COVERAGE (2026-08-23): for hand-over, every tested concept must be named in an article's related_concepts AND that article must actually teach it; a heuristic concept-side `article_ids` (build-article-links.ts term overlap) alone is not coverage. Verification pass per module before INDEX. (Manual 04/05/13 to carry this on next touch.)

- TRIAGE CHECKPOINT (all universities): lanes stop after question-led triage; the orchestrator sends CoS one table (questions triaged · concepts tested · live-hit / pending-hit / new) and mints nothing until "TRIAGE APPROVED".

- Rule 2 reads as a PRIORITY, not a ban: (1) concepts/articles banked questions need → (2) rest of the examinable chapter per dept book (Omar's full-coverage order stands) → (3) nothing the module never examines.
- Sequence articles → questions is correct (validator refuses a question whose main concept has no article).
- Relay (browser-free notices, toolchain hashes, cross-lane asks) goes through the chief of staff. Y2–5 lane keeps the browser; CoS dispatches the next lane.

- MINTING across universities: manual's `mint-concept-id.mjs` stays unsalted — one idea = one concept ID, universities/years/modules are overlays; key search before every mint; a hit → sparse update record. Kasr keeps its per-module salt for now. Duplicate scan (5c28167, `npm run medical:duplicate-keys`): 0 key collisions across 2,656 rows (positive-controlled); 2 label collisions in 101 ISK routed to Kasr Y1 for merge. Gate landed fa72ec4 on main. Mint freeze PARTIALLY lifted: no-hit → mint; live hit → sparse update; hit only in another lane's unimported batch → sparse update in `<root>/pending-live/<slug>.md` with an INDEX "apply after X is live" line (the importer silently creates a stub for a non-live id). Freeze FULLY lifted for all universities.
- Browser (Telegram Web in Omar's Chrome) queue: Kasr Y2–5 (running, 60 items) → Kasr Y1 (items 1–2: 108 INT practical atlas, 103 BMS EOY-2025 histology) → Helwan → Alexandria → Ain Shams → Kasr Y1 (items 3–4: 104 CPS solved books, 101 ISK EOY-2023 written). Tier ≤ 5 only.
- Ain Shams curriculum move: one concept/article with both year/module paths; questions keep the year sat.

- Telegram fetch rules for every lane: never click Join on an invite link (log it as "needs Omar to join"); never open `t.me/addlist/` folder links; multi-university fallback channels may supply department books Helwan's syllabus names, never another university's papers/MCQ banks.

- MODULE IDS (verified in code: global bare strings, no namespace; empty `universities` = unrestricted): new universities prefix every module id — `ASU-CVS`, `AU-MED-102`, `HU-GIT-301`; Kasr keeps `101 ISK`. Every record must carry a non-empty `universities`. Validator lane adds both as errors.
- SITTING YEAR (Kasr, validated on 87 dated Y1 papers): EOM = batch + 1826, EOY/Baqoon = batch + 1827 for Year 1; generalise +1825+k / +1826+k; printed date wins.

- SUBJECT IDS (verified): 20 valid ids per curriculumCatalog.ts; manual §3 stale (validator lane correcting). Importer validates none → validator adds the check. Placement law: Community→pop, Psych→psy, Micro+Para→inf, Forensic/Tox/ENT/Ophth→body system of mechanism/target organ, umbrella principles→mul.
- DEDUPE HAZARD (Alexandria, full data): 1,334 "[Updated]" twin pairs share no hash; 1,424/2,163 disagree on textLayer (Updated copy often flattened). Every manifest records nameTwinOf + twinPreferred (native text layer first); lanes cite the copy they read.

- IMPORT HAZARDS (Alexandria probe, 00-validator-probe.md): full record on a found id evicts other universities / un-publishes, reported as a plain update; combined simulate runs let the last file win; find-existing ignores `## canonical_key` in pending files; CI content gates are Kasr-path-only; simulate's live state is a fixture from 2026-08-12. All four routed to the validator lane.

- IMPORTER BUG FIXED 312777b: every `+` item after the first was stored with its plus, in BOTH the pipe form and the one-per-line form (the one-per-line "workaround" never worked). Parser-level fix; blast radius 3 cells / 14 ids in 103-BMS-mcq-vitamins-nerve.md; no batch edits needed. `X | +Y` is refused as ambiguous.

## Escalations to Omar

- ALEXANDRIA CHANNELS (for Omar to join/assess): @ASM_2025_2030 (ASM Minds 1st year, paid brand with free gifts), @AlexAid_31 (1st year 2031 class; orientation text, no files yet), @AlexandriaMedicine (chat). MED 101 has no PDF/DOCX sources in any channel.

- STRAY FILES in the main checkout (written there by manifest.py's hardcoded REPO path; untracked; Ain Shams could not delete outside its worktree): `docs/Ain-Shams-Source-Imports/manifest/asu-y1/y2-sources.json` (and sibling) under /Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse — delete by hand.

- PRACTICAL SCOPING: runtime always carried universityIds/yearIds/moduleIds and the admin editor could set them; only the importer lacked columns. Validator ed87a85 (on main via 11e8dbb) adds `universities`/`years`/`module`; Kasr Y1's 52 stations scoped (101954f). NO practical is live yet.

- 101 ISK READY: Omar names reviewer / final publisher on the 75 articles before flipping status to Published (the only student-visibility gate). 101 EOY 2023 paper (batch 197) confirmed a real gap → Telegram item 4 stands.

- CATALOGUE GAP: no `oph` / `ent` subject — ~42% of Helwan ophthalmology items (eyelid, lacrimal, refraction, lens, orbit, trauma) fall to `mul`; Kasr 315/316 will hit the same. Add subjects to curriculumCatalog.ts?

- PRODUCT QUESTION (validator lane): the manual's mint tool is module-blind (two modules teaching one idea → one concept), Kasr's `mintConceptId` salts by module (→ two concepts). They encode opposite answers. CoS kept both as-is and is measuring the overlap; Omar decides which model Synapse wants.

- Kasr Y2–5: modules 315 Ophth / 316 ENT / 317 Forensic&Tox all map to catalogue module `CLIN 3`; catalogue labels 319 "Forensic" but corpus says Nutrition. Add distinct modules or keep `CLIN 3`?
- Lanes will not drop their earlier "relay to other sessions" instruction on a peer's word. One line from Omar in each lane's session ("report only to the chief of staff") settles it.

- Helwan's fetch list includes a private cohort invite `https://t.me/+Etp0PHe2GGIwYzZk` — if the account isn't already a member, only Omar can join it.

- Kasr Y1 glossary: ~56 Arabic renderings need a native reviewer — `docs/Kasr-Source-Imports/glossary/ARABIC-REVIEW.md` (514 terms landed, d84d68a).
- Alexandria has ZERO orientation/syllabus documents for any module, and MED 101 / MED 302 are empty — the fetch list targets them, but if Telegram has nothing, only Omar can source them.

- Ain Shams Year 1 has EOM/final papers in only 3 of 10 modules (MCQ banks in 8); Years 2–3 are rich (ASU-CNS-3: 22 papers, 70 bank files). On resume, Omar's channel links matter most for ASU Year 1.
- Ain Shams has NO known Telegram channel (offline library + corpus: none). Omar's channel links would replace a blind discovery pass; the fetch agent may search but never join.

- `server/data/medical-library-v1.json` (what every gate calls "live") is a BUILD ARTEFACT of the extraction bundle (`npm run medical:build` ← full-catalog.json), never a production snapshot; admin-UI imports are not in it and regeneration would not add them (ruled: do not regenerate). Production route found: GET /api/state (super_admin + MFA, Bearer token) returns exactly the `states` object the gates read. LANDED 99865d3: `npm run medical:snapshot-live` (super_admin + MFA token) and `npm run medical:snapshot-staleness` (any authenticated token); env vars only, never stored/echoed; refuses to write on anything but a 200 with a non-empty object. NEEDS OMAR to run snapshot-live once (commands handed over).

- Kasr Y5 tree: two genuine papers print "4th year" in their own header — which year do they belong to? (catalogued under printed year meanwhile)

## Log

- 2026-08-30 — Independent Telegram acquisition: Zagazig University Year 1 completed from the user-supplied `Fakous Medical Data` index and all accessible linked public repositories. 619 canonical academic files (592 PDFs, 27 PowerPoints), 0 invalid; 211 exact repeats isolated; 28 recordings deferred. Audit: `docs/chief-of-staff/telegram-audits/zagazig/Year 1 Completion Audit.md`. Next university in this independent queue: Assiut newer source first, then `(63)` fallback for gaps only.
- 2026-08-22 — Standing orders sent to all six live sessions; status reports requested.
- 2026-08-22 — Reports in from Kasr Y1 and Kasr Y2–5; rulings sent. Two Sonnet auditors dispatched (import-ready drift audit; lane-branch survey).
- 2026-08-22 — All six lanes reported. Branch survey (Sonnet) confirms self-reports: only Kasr Y1 has content (26 commits ahead); others Phase 0; no off-goal code. Minting ruling + browser queue broadcast. check-concept-ids cross-university fix assigned to validator lane.
- 2026-08-22 — Kasr Y1 delivered its 4-item Telegram list; given next slot for Tier 1 items only.
- 2026-08-22 — Kasr Y1 toolchain hashes broadcast (4033bde build-spans/apply-article-evidence; a4449a8 check-concept-ids invariant; build-evidence.ts pending) — on Y1's branch, not main. Validator lane ordered to base its cross-university check-concept-ids extension on a4449a8 to avoid a two-version collision.
- Import-ready drift audit (Sonnet) done: 128 CVS T02–T09 concepts + 58 articles with zero question linkage (older session, unowned). Recommendation to Omar: reuse when Kasr Y2–5 reaches cardiology; do not invent MCQs.
- 2026-08-22 — Helwan fetch list ready (T1≈7, T2=8, T3≈10); accepted with no-join / no-addlist / books-only-from-other-universities rules.
- 2026-08-22 — Ain Shams catalogue landed (26 modules). withModules() gained optional `term` (KAU byte-identical). Asked ASU to confirm short module tokens resolve per-university.
- 2026-08-22 — Validator lane landed fa72ec4 (cross-university concept-id gate, 4 tests). Broadcast to all; freeze partially lifted. Helwan Year 3 lane list approved (6 lanes). Catalogue-check task queued for validator lane.
- 2026-08-22 — Module-id fact check (Sonnet) → prefix ruling sent to ASU/AU/HU. Sitting-year rule relayed Y1 → Y2–5. Subject-id fact check pending (Helwan cites curriculumCatalog.ts with 20 ids).
- 2026-08-22 — Subject-id fact check done → 20-id ruling + placement map broadcast to all. Helwan & Alexandria module renames applied (HU-…, AU-…). Kasr Y1 merged fa72ec4 (216272b), 514 glossary terms (d84d68a).
- 2026-08-22 — Ain Shams rename committed (4eb9cb5, merged fa72ec4 → 7c8a704); scout found no ASU Telegram source.
- 2026-08-22 — Validator lane landed 5c28167 duplicate-key scan; 0 key collisions, 2 label twins (101 ISK pectoralis major, lysosome types) → Kasr Y1. Catalogue check started (term = catalogue attribute, never required on a record).
- 2026-08-22 — Alexandria P0-D landed (771-line probe). Held case ruled (pending-live folder). Mint freeze fully lifted. Validator lane queued: CI path widening, fixture regeneration question, find-existing canonical_key read, stub-create error.
- 2026-08-22 — Alexandria wave 1 approved (13 lanes) with triage checkpoint + no-paper guard.
- 2026-08-22 — Kasr Y1 hashes c0a3709 (build-evidence per module) + bec5510 (MCQ triage per module) broadcast; Wave A: 4 of 8 lanes landed (3ece25d, d905b50, 88c7550) — Sonnet drift audit dispatched on them. Alexandria wave 1 template now two-stage (triage → approve → author), 8b244cd. Kasr Y2–5 Year 5 survey: 225 files, 75 papers, tier-1 = 0; 8-item Telegram append approved.
- 2026-08-22 — Alexandria P0-A/B: 23 modules, 3,502 distinct sources (584 banks, 146 dept books, 31 EOM papers), 0 module mismatches; 13 wave-1 lanes + P0-E pagetext lane dispatched to triage checkpoint (71be31e). Twin hazard refined and broadcast.
- 2026-08-22 — Helwan manifest landed; six Year 3 lanes dispatched; triage checkpoint imposed (same as Alexandria). Kasr Y1 101 relations 9b5b962 (194 edges).
- 2026-08-22 ~19:30 — Omar: pause all but Kasr Y1 + Alexandria Y1. Pause orders sent (Kasr Y2–5, Ain Shams, Helwan); focus orders + publish-plan requests sent (Kasr Y1, Alexandria); validator queue re-ordered (fixture answer first). Wave A audit relaunched (first run died at session limit).
- 2026-08-22 — Validator: fixture is bundle-derived, not production; module existence cannot be gated (fixture seeds courses: []). Catalogue check approved as built (universities non-empty/valid, prefix, module_subject consistency, subject ∈ 20); ren/neu fixed in 103 BMS; 12 of 20 subjects have no live concept. Next: map production read routes for a live snapshot.
- 2026-08-22 — Ain Shams pause acknowledged; checkpoint + PAUSE REPORT pending its two lanes finishing.
- 2026-08-22 — Kasr Y1: 101 twins merged (73ef214), 102 evidence layer (100 claims/75 citations/77 spans), 104 lanes at 66/33/29 concepts; seven lanes resumed after the limit. PUBLISH PLAN due with the Wave A report. Waiting on Kasr Y2–5 "browser free".
- 2026-08-22 — Validator: 57ef0d4 catalogue check on main (gate); /api/state route found; snapshot-live + staleness scripts ordered (Omar runs with his own token). Helwan pause applied (c38345a).
- 2026-08-22 — Kasr Y2–5: browser free (fetch agent killed by limit; 9 tier-2 Y2 files landed, remainder re-queued); PAUSE REPORT in — retrofit unfinished, not landing on main; resume order recorded. Browser handed to Kasr Y1.
- 2026-08-22 — Kasr Y2–5 checkpoint 9d1925a (retrofit; Year 1 byte-identity proofs passed; main not merged; Y3–5 manifests pending). Decision: stays on branch until RESUME.
- 2026-08-22 — Wave A drift audit landed: ids clean, scope fine, but 0/91 new concepts tied to a banked question. Kasr Y1 ordered to report the blocked-MCQ numbers per module and to mint MCQ-unblocking concepts first from here on.
- 2026-08-22 — Kasr Y1 accepted the audit: gate lines in every commit body + coverage/<module>-GATES.md; question-backed items first and separate; coverable-MCQ numbers come from seeds/mcq triage lanes (102: 504 rows, 104: 287) — starting as id-reuse lands. 104 Anatomy 0c87e45, 104 Histology ecb6621, 103 Histology 7b432ef committed; three 103 question lanes reading every printed paper.
- 2026-08-22 — Validator 99865d3: snapshot-live + snapshot-staleness on main (1337 tests). Commands handed to Omar. Next: CI widening.
- 2026-08-22 — 104 CPS audit: demand-driven; Physiology 46/14 uncommitted; coverage docs stale; 64 untagged rows; 915 keyless MCQs make Telegram item 3 publishing-relevant.
- 2026-08-22 — Kasr Y1: 601b2c1 pipeline id-reuse (seeds/types.ts resolveConceptId); 102 triage in two lanes (504 rows); 103 question lanes; 104 Physiology committing on lane report; Telegram items 1–2 in progress. Merge note relayed to Kasr Y2–5.
- 2026-08-22 — Validator 9dba8ca: CI triggers/globs widened to docs/*-Source-Imports/** (brace trap avoided; unmatched-glob guard added); YAML not parsed locally → Sonnet parse check dispatched. Next: stub-create error.
- 2026-08-22 — Kasr Y1 WAVE A REPORT + PUBLISH PLAN received; accepted; full-sequence simulate in checklist order ordered as proof of import order.
- 2026-08-22 — 103 evidence landed (754 claims/164 citations/238 spans, atomicClaimIds-missing 118→0). Importer `+A | +B` bug routed to validator; workaround broadcast.
- 2026-08-22 — Helwan TRIAGE TABLE (1390573): ~3,560 Qs, ~2,850 keyed across 6 lanes; PAUSE REPORT in (12 local commits). Five rulings pre-issued; TRIAGE APPROVED takes effect on RESUME. Resume order: Helwan has the most ready exam-derived material of the paused lanes.
- 2026-08-22 — 101 ISK publishable at b3e7893 (D1 lane): audit debt editorial only; [clear]-above-ids parse bug and microtopic key fixed; spans 254→266; INDEX-101-ISK.md.
- 2026-08-22 — Kasr Y1 fetch done: items 1–2 verified absent from the channel (real gaps). Browser → Alexandria.
- 2026-08-22 — 101 verification (Sonnet): INDEX/gates/ids hold; written = 100 not 94; main-concept→article coverage 103/258 by related_concepts; explanations 2 sentences. Two questions to Kasr Y1 before declaring ready.
- 2026-08-22 — Alexandria TRIAGE APPROVED with 7 corrections + explanation bar + pending-live ordering; 13 lanes resumed into authoring.
- 2026-08-22 — 101: coverage resolved (258/258); explanation enrichment via claims approved; validator silent-skip queued as #6.
- 2026-08-22 — origin/main now carries 470fdde (stub-create error), 312777b (`+A | +B` fix), b3cad82 (find-existing reads canonical_key) — validator #4, importer fix, #5 all landed. CoS worktree merged to origin/main as base for the MANUAL REVISION (Omar's order: exams + department files first; orchestrator + chief-of-staff roles). Manual frozen for other lanes.
- 2026-08-22 — Validator queue empty: 470fdde, 312777b, b3cad82, daf0d4d on main (1348 tests). Correction broadcast: one-`+`-per-line did not avoid the bug. New validator queue assigned. Kasr Y1 merged b3cad82; 108 pharmacology update rows restating source_candidate_ids fail the candidate check → Y1 drops them from sparse rows.
- 2026-08-22 — Kasr Y1: 16d40c0 (102 EOY/Baqoon 2022, 37 items), 0f4ed91 (104 Baqoon-2024, held: not gate-clean), 73ce312 (104 histology evidence, audit 45→2), 77fa72c (103 anatomy written), ce09de1 (104 evidence+ledger). Generator fix B0c: sparse update regardless of id equality. Mistagged 102 physiology source left unseeded (upheld).
- 2026-08-22 — Manual writers done: 13-orchestration (new), 05, 01+06–12+CLAIMS; 00 and 02/03/04 running. Findings: withModules() on main has no term element; practicals have no universities column → validator task C.
- 2026-08-22 — All five manual writers done (00 49 KB w/ §0 law, roles, stages, gates; 13-orchestration new 27 KB; 05 40 KB; 02/03/04; 01+06–12+CLAIMS). Base merged to origin/main 4286b26 (validator task A landed). Consistency reviewer running; then commit on CoS branch → land on main → unfreeze.
- 2026-08-22 — Ain Shams PAUSE REPORT in (2271002). Hazards: `+` on module_subject stored literally; update row without label silently skipped → validator task D; manual reviewer told. Kasr tooling findings relayed to Y1.
- 2026-08-22 — Validator: A 4286b26, B 6d3f597 (fieldsUsed now per RECORD vs floors; 104-CPS-mcq-authored 40/40 below floor, 4 with no correct explanation), C ed87a85 (held for manual). Kasr Y1: 108 at publish line (b5f9e6d), 101 9637c93, 102 biochem triage 2f0e8ed (320 MCQs), 103 70 written, 104 64 chapter-less rows triaged. Manual review clean; finisher adding practical columns + hazards.
- 2026-08-22 — Kasr Y1: relation graph complete (1,129 edges: 101 194/68v, 102 150/130v 54bd1ce, 103 324/179v 3e683a2, 104 305/176v 54e8467, 108 156/156v); 102 triage done — 422 MCQs from 504 keyed rows, 117 duplicates collapsed, 98 concepts minted; coverage lane scripting banked→covered→authored. 52 stations gaining scope columns.
- 2026-08-22 — MANUAL REVISION LANDED on main at 0e08ac1 (15 files, ~373 KB; authoringDocs test 11/11). Freeze lifted; active lanes told to merge and re-read 00 + 13; paused lanes briefed for resume. Validator released to push ed87a85.
- 2026-08-22 — Validator D landed d82dd36 (`+` on non-id column → error; unknown-kind id row → error); ed87a85 on main. Kasr Y1 merged manual (547c195), stations scoped (101954f), re-gating 108. Validator task E: per-record floors for practical types.
- 2026-08-22 — Kasr Y1 merged d82dd36 (452aa0e): all 52 practicals errors 0 → 108 practical INDEX step green; no new D-class errors. Remaining batch noise = sparse live-id rows failing create-required fields → validator task F (update semantics in batch).
- 2026-08-22 — Manual corrections landed on main at 3c39584 (simulate was the silent tool, not batch; `+` only on list columns; TDZ hazard row). authoringDocs test 11/11.
- 2026-08-22 — Alexandria first landed file 1c2fdf6 (AU-MED-102 Anatomy: 3 new concepts, 3 sparse updates, 3 articles, 3 questions; all gates 0 errors; 100% traceable); lane sent back for the other 126 questions. Fetch found ASM Minds channels + a MED 106 practical CVS bank. Manual fix: concept update discriminator = `## label` only.
- 2026-08-22 — Manual label-discriminator fix landed on main at 2adac8d (merged over dcc6929).
- 2026-08-22 — Kasr Y1 7ab418f: generator emits sparse updates for any hand-authored key (104: 32 rows); enrichment started. Importer bug → validator G: blank label defaults to '' and blanks the live label on update.
- 2026-08-23 00:45 — Omar: CONTEXT DISCIPLINE order (compact or hand off; subagents one-shot; deltas only). Broadcast to all lanes; HANDOFF.md written for the chief of staff; Kasr Y2–5 handoff committed. Ain Shams session exited at the 00:30 limit (paused at 2271002; resume from branch). Alexandria first-file audit not relaunched (not worth tokens).
- 2026-08-23 — Validator E dcc6929 (practical floors; 101 histology practical 38/38 below floor, media undescribed), F 2d3c6c6 (live-id sparse rows validate as updates; every concept batch on main clean), handoff 3f4ea7a; 103 OWED was never owed. G in progress, then validator holds for a fresh session.
- 2026-08-23 — Validator G c255322; handoff 1d063a0; lane holding. Alexandria c4b3e55 (AU-MED-103 Biochem). Kasr Y1 7b93d83 merge, 101 practical repair lane, HANDOFF 86244b9.
- 2026-08-23 — medical:presence (b885078): 3 mid-edit 103 anatomy rows; 102 evidence gaps owned by 102 lanes; check-concept-presence.mjs judges sparse rows as full → Kasr Y1 patching its own script with the 2d3c6c6 live-id rule. Presence must be green before INDEX-102/103.
- 2026-08-23 ~01:20 — PLATFORM STALL: every Kasr Y1 subagent since ~00:40 died at the 600 s stream watchdog (10 lanes). Kasr Y1 paused dispatch 10 min, probing with one lane, max 4 concurrent after. Alexandria asked to confirm and cap. All partial work on disk; HANDOFFs committed.
- 2026-08-23 ~01:30 — Alexandria browser free: 1 file landed; channels listed for Omar. Stall platform-wide; both orchestrators probing with one lane. Chrome reserved for Kasr Y1 T3 after its probe.
- 2026-08-23 ~01:45 — API recovered (Alexandria probe passed; ≤4 lanes). Alexandria 654b24e (Biochem C). CROSS-LANE GAP: 17 concepts in 101-ISK-mcq-concepts.md have no teaching article → routed to Kasr Y1 to verify 101's coverage claim and write the missing articles before hand-over.
- 2026-08-23 ~01:55 — Kasr Y1 confirmed: 17/23 Alexandria ids covered only by heuristic concept-side links, ≥2 wrong. Ruling: two-sided coverage is the publish gate; verification pass widened to every module.
- 2026-08-23 ~02:05 — Two-sided coverage scan: 101 155/282 concept-side-only; 102 99/164 (+17 article-only ok); 103 2 (+14 none, in-flight); 104 8; 108 0. Reading lanes dispatched per module (probe permitting).
- 2026-08-23 ~02:15 — Kasr Y1 probe proven (a3c77f6: 104 pipeline 120 MCQs/30 concepts; 160/335 bank rows authored, 172 untriaged); dispatch at 4: 101 two-sided ×2, 103 anatomy, 102 coverage; then 103 histology, enrichment, 103 biochem papers, 101 practical floor, 104 two-sided+INDEX, T3 fetch. check-two-sided-coverage.py 4ad6755. Alexandria 6fd9e4e (Biochem D); label-before-id parser hazard relayed.
- 2026-08-23 ~02:30 — Manual on main 1a9f190: glossary uses # Item blocks (pipe table was UI copy; `definition_ar`), two-sided coverage in 04/05/13, field-order hazard. Kasr Y1 asked to confirm its 514 glossary terms are block-form.
- 2026-08-23 ~03:00 — ETAs to Omar: 108 ready now; Kasr 101–104 ≈ 4–5 h + 2 h cross-cutting; Alexandria 102/103 ≈ 2–3.5 h, 105/106 ≈ 5–6 h, 101 unsourced; ~250 Alexandria items need media (policy decision for Omar). 8f00ae3 presence patch. ATP-yield convention ruling issued.
- 2026-08-23 ~03:35 — Omar: per-university/per-year tag sets on shared records. Orders to Kasr Y1 + Alexandria (script + fix + GATES), validator H (consistency gate), manual section in progress. Kasr Y1 3a46d91 (103 anatomy done, presence clear); 72f50b3 (102 two-sided 147/164); ATP concept amended. Alexandria 18 landings, 6 lanes done.
- 2026-08-23 ~03:50 — Kasr tag audit (1b586d9): universities/years/module/module_subject complete except 3 (103) + 9 (108) rows; university_notes missing on generated records and the column exists only for concept+article. module_subject REPLACES on import (no `+`). Rulings: validator H2 (`+` append on module_subject) + H3 (university_notes on question/practical kinds); generator emits university_notes on every kind; overlays restate the full path union meanwhile.
- 2026-08-23 ~04:05 — Kasr Y1 89993f4: 101 histology two-sided 80→0 (73 back-links, 4 rewired; six articles had related_concepts [clear] while teaching). Ruling on 3 question-book-only concepts: textbook-cited teaching section.
- 2026-08-23 ~04:20 — Manual: per-university traceability law written into 00 §3 (+02/04/05/13). Verified: university_notes is ARTICLE-only; bulkImport computes module_subject unconditionally for question/article/practical/resource → sparse updates wipe it (H2b, urgent); exam_weight key on wrong year id hides a concept from that blueprint. Validator H/H2/H2b/H3 queued; lanes warned.
- 2026-08-23 ~04:45 — 101 ISK two-sided 279/282 (89993f4 histology 80→0; 0b9bd71 anatomy 59 confirmed, 8 rewired, 8 taught via page-cited extensions); last 3 closing under the textbook ruling. Remaining for 101: enrichment, 38 stations, INDEX re-run. Kasr: 0 non-concept update rows in tree (module_subject wipe cannot bite). Alexandria 22 landings.
- 2026-08-23 ~05:00 — Alexandria: detectBatchKind never recognises the 18-column catalogue resource schema (12-resources.md shape) → validator task I; Alexandria writes resources in evidence-source shape meanwhile.
- 2026-08-23 ~05:10 — Validator H 7ec2ef4 (consistency gate; module-per-university unbuildable for non-Kasr; concepts out of the year rule), H2b 2edea35 (module_subject guard on all four kinds). H2, H3, I deferred to a fresh validator session via handoff; lane stopping. Years-as-ids ruling to Kasr Y1.
- 2026-08-23 ~05:25 — Kasr Y1 ENRICHMENT landed: 101 explanation median 145→402 chars, ≤2-sentence 92%→0.8%, none empty; 102 156→401; 104 byte-identical; 49 short (no usable claim) hand-listed. Generator lane: years→KAU_Yn, universityNotes line, missing question columns (41→46). Running: 104 hand-40, 12-row tags, 103 biochem papers, 101 textbook fallback.
- 2026-08-23 ~05:35 — Validator stopped (handoff 20348d5). I verdict: both resource shapes real, detector lacks a branch; 12-resources says 18 cols, real 19 → manual fix running with years-as-ids.
