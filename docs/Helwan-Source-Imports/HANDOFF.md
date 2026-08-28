# Helwan lane — handoff (paused 2026-08-22, written 2026-08-23)

Orchestrator session: `claude/helwan-content-orchestration-8fe5ec`. Paused by Omar's order
(finish Kasr Year 1 and Alexandria Year 1 first). Holding for the chief of staff's "RESUME".

## Where everything is

| Thing | Location |
|---|---|
| Branch, local commits | `claude/helwan-content-orchestration-8fe5ec`, 15 commits through `704660c` (rulings at `d5bcabe`), **nothing pushed**; `origin/main` merged at `fb4a246` — re-merge on resume |
| Standing orders for every lane | `docs/Helwan-Source-Imports/LANE-BRIEF.md` |
| Consolidated triage table + the five pre-issued rulings + resume checklist | `docs/Helwan-Source-Imports/coverage/TRIAGE-CHECKPOINT-2026-08-22.md` |
| Manifest (946 rows, `HU-<CODE>` ids, sha + name twins) | `docs/Helwan-Source-Imports/manifest/helwan-y1-3-sources.json` + `README.md` |
| Telegram fetch list (T1 7 / T2 8 / T3 10, slot plan, binding rules, URS addendum with `t.me/ii0y_gun` approved) | `docs/Helwan-Source-Imports/manifest/TELEGRAM-FETCH-LIST.md` — slot deferred behind Alexandria Year 1; browser handshake via the chief of staff only |
| Structure files (split, to merge per module before import) | `academic/GIT-301-structure-A.md` + `-B.md`, `academic/ORL-305-structure-ent.md` + `-ophthalmology.md`, `academic/FTF-304-structure.md` |
| MCQ banks + concept triage | `scripts/helwan/extract/HU-{GIT-301,FTF-304,ORL-305,URS-303}/*.json` |
| URS 303 triage + ledger | `docs/Helwan-Source-Imports/coverage/URS-303-{triage,coverage}.md` |
| Catalogue | `HU_MODULES` in `src/data/universities.ts` (only the `hu` line changed); `docs/import-ready/academic/hu-modules.md` |
| Tooling | `scripts/helwan/intake/*` (manifest), `scripts/helwan/extract/{helwan_module,pagetext}.py` |
| Claims | `Instruction Manual for Content Creation/CLAIMS.md` — one university row + per-lane rows (Open) |

## State of the six Year 3 lanes (all at the triage checkpoint; nothing minted or authored)

FTF-304 897 items / 843 keys · ORL-305-OPH 957 / 939 · GIT-301-A ~660 / ~347 (anatomy ~313
keyless) · GIT-301-B 302 / 302 · ORL-305-ENT 309 / 309 · URS-303 436 recall items, no real
paper, no official key. Totals ≈ 3,560 triaged, ≈ 2,850 keyed. Lane handles and agent ids
are not reusable after compaction — re-dispatch fresh lanes from the checkpoint file.

## The five pre-issued rulings (full text in the checkpoint file)

1. OPH `mul` by elimination accepted, `field_notes` "ophthalmology; no subject in catalogue",
   `module_subject` under `ORL 305 > Ophthalmology`; Omar asked about `oph`/`ent` ids.
2. Build `scripts/helwan/build-source-index.ts` (copy of Kasr's, header) merging the Helwan
   manifest **additively** into `docs/medical-library-program/evidence/corpus-source-index.json`.
3. ENT `CON-RES-7B27CD2545F4A5`: sparse update on the live id only; INDEX line "apply after
   `docs/import-ready/concept/SYS-RES-CONCEPT-REPAIR-001.md`".
4. `t.me/ii0y_gun` is a listed link for URS 303: identify first, papers/forms only, never Join.
5. GIT-A keyless anatomy: keyed items fully; book-cited answers as Draft with
   `answer_source: book`; never student notes; otherwise unanswered under OPEN.
Orchestrator ruling: shared GIT bank Q40 (omeprazole) → lane B; the other 49 → lane A.

## Resume order (on "RESUME")

1. `git fetch && git merge origin/main` (manual revised at `0e08ac1`: 00 §0 priority law,
   S0–S8 stages, new `13-orchestration.md`, 05 explanation floor, practicals scoped by
   university/year/module, update rows restate `## label`).
2. Re-read 00 and 13; revise LANE-BRIEF where the manual now says it better.
3. Re-dispatch the five content lanes (GIT-301-A, GIT-301-B, FTF-304, ORL-305-ENT,
   ORL-305-OPH) from the checkpoint file for steps 3–7 (concepts+articles → questions →
   evidence → media/coverage/INDEX/CLAIMS), plus one lane for ruling 2; merge the split
   structure files. TRIAGE APPROVED already stands.
4. Year 1 wave: BMS 101, BMS 102 ×2 (Path+Micro / Pharm+Biochem), LCS 103, PSY 104 — same
   checkpoint discipline.
5. Telegram slot when the chief of staff sends "browser is yours" (Year 2 first, then URS).

Report only to the chief-of-staff session; CC it on anything relayed to peers.
