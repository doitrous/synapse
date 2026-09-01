# LANE-CARD — Qena Faculty of Medicine, South Valley University Year 1 (svu)
No separate LANE-BRIEF.md exists — this card is the brief. Read it first; open the full manual only at a wall named in your report.

## 1. Identity and ids
University id `svu` (live shell on `main`'s `src/data/universities.ts`: `{ id: 'svu', name: 'South Valley University (Qena)' }`). Desktop folder is named "Qina University" (informal) — the bylaw names the institution **Qena Faculty of Medicine, South Valley University** (كلية طب قنا – جامعة جنوب الوادي); no institution is actually named "Qina University". Kept `svu` per instructions. Year `SVU_Y1`. Module ids `SVU-<CODE>` — from the 2023 Internal Bylaw (5+2 credit-point program): `SVU-PSM101`, `SVU-PMM101`, `SVU-CBF101`, `SVU-PPE101` (Semester 1); `SVU-INI102`, `SVU-MPT102`, `SVU-HPE102` (Semester 2). Only `SVU-PMM101` and `SVU-CBF101` have any local source material. Concept ids mint university-blind — SVU's Year 1 basic science should mostly hit existing Kasr/Alexandria/AU concepts once triage runs. Files: `docs/Qina-Source-Imports/{manifest,academic,coverage}/` so far — no `concept/`/`article/`/`question/` yet, this lane is still S0–S3 and stopped at the S3 wall (§7).

## 2. The ten rules that cannot bend
Same ten as every lane. Corpus root `/Users/doitrous/Desktop/Universities/Qina University/Faculty of Medicine`. SVU runs a credit-point curriculum, module-named not department-named (`academic/SVU-Y1-modules.md` "Local corpus coverage") — the department split inside each module folder (Anatomy, Biochemistry, Embryology, Histology, Physiology) is this lane's own corpus organization, not an SVU-published subject list.

## 3. Read text, don't look at pictures
`node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (≤ 3 pages/call), `status` first. Readability index: `coverage/SVU-Y1-readability-index.md` (15 PDFs, 364 pages, 22 garbled — all in Anatomy). **Anatomy and Histology are native text** (Anatomy: some garbled pages, mostly image-heavy diagrams; Histology: 0 garbled). **All 4 Biochemistry PDFs and 3 of 4 Physiology PDFs are CamScanner image-only scans** — ~3 words/page, nothing but the watermark, unreadable without OCR. The 4 Embryology files are `.pptx`, not covered by `pagetext.mjs` (PDF-only) — not yet opened. Visually-marked keys (red/underline/highlight) → `pagetext.mjs keys` first; render only when it reports no text layer or ambiguous.

## 4. Author: seed → emit → gate
Not reached — **TRIAGE APPROVED required first, and this lane's triage table is all zeros** (§7). When directed: seed dir `docs/Qina-Source-Imports/coverage/seeds/<module>/` (create). `node scripts/content/emit-mcq.mjs <seed.json> --out <batch.md>` · `node scripts/content/gate.mjs batch <batch.md> --with <sibling concept/article files>` · `node scripts/content/gate.mjs simulate <files, apply order>` (positional, no `--with`).

## 5. Progress ledger
`node scripts/content/ledger.mjs <seed dir> --triage coverage/<module>-triage-keys.txt --out coverage/<module>-LEDGER.md` after every commit, once authoring starts. Not yet applicable — nothing authored.

## 6. Commit rhythm
First commit landed within minutes of worktree setup. Commit + push every 5–10 questions once authoring starts. Report ≤ 20 lines to chief-of-staff, ends `HANDOFF: <branch>@<sha> · awaiting TRIAGE APPROVED`.

## 7. This lane's known traps
- **No exam paper, question bank, or department book exists anywhere in this corpus.** All 19 Year 1 sources are lecture PDFs/slide decks (`manifest/y1-sources.json`, confirmed by direct listing, not just the Desktop catalog note that first flagged it). S3 triage is a zeroed checkpoint table (`coverage/SVU-Y1-triage.md`), not a per-module source count — **this is the wall**, three options left for the chief of staff (needs-Omar-sources / redirect to concept-only authoring off the lecture corpus / pause).
- **8 of 15 PDFs (all Biochemistry, 3 of 4 Physiology) are CamScanner image-only scans**, unreadable without OCR. Per the lane brief, OCR is reserved for priority scanned papers/banks — since neither exists here, OCR was **not** run; needs a scope ruling before spending the budget on lecture-tier scans.
- **Embryology's 4 `.pptx` files have not been opened for readability** — `pagetext.mjs` is PDF-only; no tool run against them yet.
- **One name-twin pair** in Histology (`هستولوجى أولى طب قنا (1).pdf` 23pp vs `هستولوجى أولى طب قنا.pdf` 16pp, identical page-1 text, different sha256) — preferred/discard recorded in the manifest; use only the "(1)" copy.
- **Module→department mapping is this lane's own inference from the bylaw's department roster (p9)** — `SVU-PMM101` = Anatomy Dept (incl. Embryology, per `ANA001`) + Histology and Cell Biology dept; `SVU-CBF101` = Biochemistry dept + Physiology dept. Flag **needs Omar** if a finer split matters before minting.
- **Semester 2 modules (INI-102, MPT-102, HPE-102) and PSM-101/PPE-101 have zero local sources** — confirmed gap, not a scanning miss.
- Desktop `_Catalog/` notes are useful context but every fact this lane reports was re-verified against the primary PDF directly — do not treat those notes as citable sources on their own.
- Telegram is retired — do not attempt to reach `@FAS1_bot` even though the Desktop notes name it as the corpus's origin; any further gap is "needs Omar sources."

## 8. Walls → where the answer lives
Id/search/overlay law → `00-START-HERE.md` §3–4. Gate/tool shape → `SHARED-TOOLCHAIN.md` §Content CLI. Explanation/coverage bar → `05-questions.md`. Staged pipeline + triage checkpoint → `13-orchestration.md` §4–5. Reviewer/publisher and answer-key rulings → `docs/chief-of-staff/HANDOFF.md` "Standing orders" (not yet read by this lane — check before any ruling that may already be settled). This lane's own wall (zero keyed material) → `coverage/SVU-Y1-triage.md`.
