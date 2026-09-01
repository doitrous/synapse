# LANE-CARD — Zagazig University Year 1 (zu)
No LANE-BRIEF.md — this card is the brief. Read first; open the full manual only at a wall named in your report.

## 1. Identity and ids
University id `zu` (shell already exists on `main`'s `src/data/universities.ts` — do not edit that file from this lane). Year `ZU_Y1`. Module ids `ZU-<CODE>` from the 2023 Internal Bylaw (5+2 credit-point program): `ZU-UNI-101` (Human rights), `ZU-MED-102` (Medical Terminology), `ZU-MED-103` (Structure and Function), `ZU-MED-104` (Musculoskeletal & Integumentary), `ZU-MED-105` (PP I: professionalism), `ZU-MED-106` (Cardiopulmonary), `ZU-MED-107` (GIT and Nutrition), `ZU-MED-108` (PP II: basic clinical skills 1). `E-109` (elective) is bylaw-listed but has **zero** recovered source material. Files: `docs/Zagazig-Source-Imports/{manifest,academic,coverage}/` — S0–S3 only so far.

## 2. The ten rules that cannot bend
Same ten as every lane (`00-START-HERE.md` §1). Corpus root `/Users/doitrous/Desktop/Universities/Zagazig University/Faculty of Medicine`. Three corpora: `faculty-admin` (8 files, whole-program bylaws), `year1` (15 files, mostly-empty organized tree), `staging` (617 files, Telegram dump split into 8 module folders — §7 provenance flag before authoring from it).

## 3. Read text, don't look at pictures
`node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (≤3 pages/call), `status` first. Readability index: `coverage/ZU-Y1-readability-index.md` (611 PDFs, 15,016 pages, 3,816 garbled — ~25%, concentrated in Musculoskeletal 1594/4032 and Cardiopulmonary 982/3985, mostly image-heavy MCQ/OSPE scans). The 48-page bylaw was 100% garbled and is already OCR'd in full (English model — codes/numerals print in Latin script even in this Arabic scan) — don't re-OCR it. **A hand-drawn-ink answer-key pattern is corpus-wide on `Final`-named scanned papers** — see §7 before trusting `pagetext.mjs keys`' "0 keyed" verdict on one.

## 4. Author: seed → emit → gate
Not reached yet — **TRIAGE APPROVED required first**, and separately, **the Fakous/Zagazig provenance question (§7) needs an Omar ruling before authoring draws on `staging`** — two different gates, don't conflate them. When authoring starts: seed dir `docs/Zagazig-Source-Imports/coverage/seeds/<module>/` (create). `node scripts/content/emit-mcq.mjs <seed.json> --out <batch.md>` · `node scripts/content/gate.mjs batch <batch.md> --with <sibling concept/article files>` · `node scripts/content/gate.mjs simulate <files, apply order>` (positional, no `--with`).

## 5. Progress ledger
`node scripts/content/ledger.mjs <seed dir> --triage coverage/<module>-triage-keys.txt --out coverage/<module>-LEDGER.md` after every commit, once authoring starts. `coverage/ZU-MED-106-triage.md` is this lane's worked triage example: one Final exam (46 q) fully triaged, key-recovery method documented and render-confirmed, 45 distinct concepts (4 live-partial, 1 pending, 40 new).

## 6. Commit rhythm
First commit within minutes of worktree setup; committed + pushed after each deliverable. Branch `zagazig-y1-phase0`, rebase onto `origin/main` and push to main once TRIAGE APPROVED lands (docs only). Report ≤20 lines to chief-of-staff, ends `HANDOFF: <branch>@<sha> · awaiting TRIAGE APPROVED`.

## 7. This lane's known traps
- **Provenance: 617/640 inventoried files (97%) come from a Telegram source named "Fakous Medical Data"**; the Desktop audit that staged them states "Fakous is a different faculty" while noting the source index "mixes/labels Zagazig and Fakous variants" (`_Catalog/Official Curriculum Completeness Check.md`, `Year 1 Completion Audit.md` — Desktop, not this repo). Module folder names/counts match the confirmed Zagazig bylaw — reassuring, not proof. **Needs Omar** before S2+ authoring draws on `staging`, mirroring FOMSCU's FOMNINU exclusion (`docs/FOMSCU-Source-Imports/LANE-CARD.md` §7). Nothing was fetched from Telegram this session (standing retirement respected) — the dump was already staged on Desktop 2026-08-30; its provenance is what this item asks Omar to rule on.
- **Hand-drawn-ink answer keys, not detected by `pagetext.mjs keys`.** `Fakous CPS Final 2024.pdf`'s correct answers are pen-marked over the option letter (before scanning), corrupting that letter's glyph in `pdftotext` output — not a colour/font/annotation the `keys` tool looks for, so it reports "0 keyed" every time. Recoverable from the corrupted glyph; confirm with `render --force` first (done for all 4 pages here — `coverage/ZU-MED-106-triage.md`). Expect this on other modules' `Final` papers; not checked outside Cardiopulmonary yet.
- **The organized `Year 1/` tree is mostly empty** — several modules' `01 University Material` subfolders hold 0 files. Real content currently lives only in `staging`.
- **Bylaw's numeric cells for UNI-101/MED-102/105/108 are OCR-provisional** — same scan artifact garbled both this session's OCR and a prior Desktop transcription. MED-103/104/106/107 read clean (12pt/8w/180marks).
- **"Human Rights and Community Issues"** (`staging` folder name) doesn't cleanly resolve to one bylaw code — UNI-101 covers "Human rights" only. Needs Omar.
- **One CPS file sits outside its module folder**: `Year 1/07 EOY/تحديدات فاينال - CPS كتاب القسم.pdf` — the module-inference heuristic misses it.
- **`E-109` (elective) has zero recovered source material** anywhere — genuinely nothing found.

## 8. Walls → where the answer lives
Id/search/overlay law → `00-START-HERE.md` §3–4. Gate/tool shape (`pagetext.mjs`, `gate.mjs`, `emit-mcq.mjs`) → `SHARED-TOOLCHAIN.md` §Content CLI. Explanation/coverage bar → `05-questions.md`. Staged pipeline + triage checkpoint → `13-orchestration.md` §4–5. Reviewer/publisher, answer-key rulings, Telegram-fetch retirement → chief-of-staff HANDOFF (not yet read by this lane — check first for a policy-shaped wall).
