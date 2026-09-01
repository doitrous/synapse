# Handoff — Kasr Alainy Years 2–5 (paused 2026-08-22, resume when the chief-of-staff sends RESUME)

Branch `claude/kasr-alainy-y2-content-0cf67a`, worktree `.claude/worktrees/busy-jemison-2e9a82`.
Checkpoint commit **`9d1925a`** (not pushed, not for `main`). Orders come from the
chief-of-staff session; the browser (Telegram Web in Omar's Chrome) queue is held there.

## Proven at the checkpoint
- `build-batches.ts "101 ISK"` leaves `docs/` unchanged — Year 1 batches byte-identical under the retrofit.
- `manifest/kasr-y1-sources.json` untouched; `check-id-stability` and `check-concept-ids` green (pre-`fa72ec4` versions).
- Every changed `.py` parses; every changed `.ts` loads. `seeds/from-json.ts` refuses an unknown tier,
  a non-numeric `sittingYear` or an unknown module (test: `seeds/from-json.test.ts`).

## What the checkpoint contains
- `scripts/corpus-intake/*`: `--year` on every step (default `y1`, unchanged); constants in `year_config.py`
  keyed by university + year; `move.py` is `y1`-only.
- `scripts/kasr/manifest.ts` + `extract/kasr_module.py`: module → manifest path for Years 1–5 (pure resolver,
  loud loader); `seeds/types.ts` MODULES = all 31 Kasr catalogue modules (Year 1 entries untouched);
  `seeds/registry.ts` assembled from `registry-y1..y5.ts`; `build-source-index.ts` merges every
  `kasr-y*-sources.json`; manifest routing in build-coverage / build-resources / build-module-sources /
  build-corpus-coverage / check-citations / match-sittings.
- `manifest/kasr-y2-sources.json` + `README-y2.md`: 631 rows (190 archived duplicates + 7 catalogue files excluded).
  Year 2 by tier: orientation 10 · EOM 27 · EOY 14 · EOM&EOY 2 · Baqoon 8 · department book 18 ·
  department questions 52 · instructor material 104 · exam-section revision material 33.

## Unfinished
- Years 3–5 manifests (`manifest.py --year y3|y4|y5` — surveys in the session scratchpad:
  `y5-survey.md/json` complete, `y4-survey.json` only, `y3-classified.json` only).
- Name-twin fields (`nameTwinOf`, `twinPreferred`: native text layer > larger page count > solved) on Y2–5 rows.
- Merge of `main`: `fa72ec4`, `57ef0d4`, `99865d3`, `0e08ac1` (manual revision: 00 §0, roles, S0–S8, new
  `13-orchestration.md`), `4286b26`, `6d3f597`, `ed87a85`; Year 1 tool commits as they land on `main`:
  `601b2c1`, `c0a3709` (replace its `manifestPathFor` with `manifestFor`), `bec5510`, `4033bde`, `a4449a8`.
  Re-run the 101 byte-identity proof AFTER merging.
- No `academic/*-structure.md` for any Year 2–5 module (eight agents died before output; brief in scratchpad
  `STRUCTURE-BRIEF.md` — rewrite against the revised manual first).
- No concepts, articles, questions, evidence or coverage ledgers for Years 2–5.

## Resume order
1. Merge `main`; re-read manual 00 and 13; rewrite briefs. 2. Finish retrofit (twins, y3–5 manifests),
re-prove Year 1, commit. 3. Y3/Y4 survey reports from their JSON. 4. Structure trees (205 NEU, 206 DIG,
207 END, 208 INT, 210 PAT, 213 PSY, SURG 5, IM 5, FM 5; Y3/Y4 after their surveys), each ending with
the module's papers/banks list. 5. Per module: department-book concepts + articles that banked questions
need → papers (seeds → `registry-y<N>.ts` → `build-batches`) → MCQ/written → gates → coverage; mint ids
only through the pipeline minter; search every `*-Source-Imports/concept` before minting.

## Browser remainder (re-queue behind the Year 1 lanes)
Landed (tier 2, 9 files): 208 INT `EOY (INT-208) {198 2nd}` + Solved; EPE-230 `EPE - 230 EXAM 2024`,
`EPE EXAMS`; Entrepreneurship EXAM + not solved; MPE-227 cancelled-subjects 2022, `MCQ Ethics 2nd year [1]/[2]`.
Not fetched: `t.me/FUTUREDOCTORS_198/4008` buttons (208 INT 196 2nd / 197 2nd EOY); student guide
(Siraj/2623, tier 1); tier 4 ×11; tier 5 ×32; never-captured links 196/6589, 196/6587, 196/6585,
Siraj/3390, Siraj/339; local copy `Histo MCQ by Dr.Kandeel [CNS].pdf`; Year 5: Futuredoctors194/11612
(answered EOR SUR MCQ 2025-194-1st), 194/10584 (5th-year study guide), six untitled links to identify,
local copy `~/Downloads/EOR SUR MCQ 2025-194-2nd Answered.pdf`. Full list: scratchpad `y2-telegram-gaps.md` §(b).

## Open questions for Omar
- 315 Ophthalmology / 316 ENT / 317 Forensic & Toxicology: one module `CLIN 3` (current mapping) or three?
- Catalogue labels ID `319` "Forensic Medicine"; the corpus says `319 Nutrition`.
- Two Year 5 papers print "4th year" in their own header (`IM Exam 4th Year 2nd Round.pdf`,
  `General Surgery [196] [Answered].pdf`) — catalogued under the printed year meanwhile.
