# LANE-CARD -- Al-Azhar University Damietta Year 1 (azd)

**No separate LANE-BRIEF.md exists -- this card is the brief.** Read this card
first; open the full manual only at a wall named in your report.

## 1. Identity and ids

No university id is registered yet for Al-Azhar University Damietta -- `azd`
is this lane's working prefix (Al-Azhar **D**amietta), pending the chief of
staff registering it in `src/data/universities.ts` (do not add it yourself).
Year `AZD_Y1`. Module ids `AZD-<CODE>` -- this lane's own working
assignments (see `academic/AZD-Y1-modules.md`): 7 Year 1 modules
(`AZD-NHB`, `AZD-PDDT`, `AZD-BMS`, `AZD-CMBG` in Semester 1;
`AZD-HBI`, `AZD-MSK`, `AZD-RESP` in Semester 2), plus 9 ancillary/pass-fail
components. Only three modules (`AZD-HBI`, `AZD-MSK`, `AZD-RESP`) have any
Desktop material at all -- 4 files each, all under a second, undocumented
top-level folder (`Faculty of Medicine/Year 1/<nickname>/_Telegram Year 1
Archive/`), not the README's documented `Year 1/Semester N/...` tree, which
is empty scaffolding. Files: `docs/AlAzharDamietta-Source-Imports/
{manifest,academic,coverage}/`.

## 2. The ten rules that cannot bend

Same ten as every lane (13-orchestration.md §11's DISPATCH/LANE-BRIEF
skeleton). Corpus root `/Users/doitrous/Desktop/Universities/Al-Azhar
University Damietta`. Concept ids mint university-blind -- search live +
every `docs/*-Source-Imports` + `docs/import-ready` before minting
(00-START-HERE.md §4); AZD Y1 body-structure/musculoskeletal content
overlaps heavily with Kasr `101-ISK`/`103-BMS`, Alexandria `AU-MED-102/105`,
and live `CON-MSK-*`/`CON-DER-*`/`CON-NEU-*` -- 16/24 searched concepts
(67%) already exist somewhere.

## 3. Read text, don't look at pictures

`node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (<=3 pages/call),
`status` first. **Answer keys hide in yellow highlight, invisible to
plain-text extraction** -- `Formative exam with answers.pdf` (`AZD-MSK`)
reads as 0-marked/ambiguous via `pagetext.mjs keys` (1/25 found) but is
25/25 keyed once rendered (200 dpi). Assume the same for any other
"with answers"/"solved" file here before trusting a mostly-empty `keys`
scan. Readability index: `coverage/AZD-Y1-readability-index.md`. Five of
the 12 Telegram-archive files (`AZD-HBI`'s 4 files + `AZD-RESP`'s
physiology file) show 0 garbled pages but under 50 native words over
several pages -- the low-word-count trap, image scans in practice; OCR
before trusting them as clean.

## 4. Author: seed -> emit -> gate

seed dir: `docs/AlAzharDamietta-Source-Imports/coverage/seeds/<module>/`
(not created yet, pre-TRIAGE-APPROVED) * `node scripts/content/emit-mcq.mjs
<seed.json> --out <batch.md>` * `node scripts/content/gate.mjs batch
<batch.md> --with <module's concept+article files, plus any pending-lane
files a search hit names>` * `node scripts/content/gate.mjs simulate
<files, apply order>` (positional, no `--with`). Nothing authored yet.

## 5. Progress ledger

`node scripts/content/ledger.mjs <seed dir> --triage coverage/<module>-
triage-keys.txt --out coverage/<module>-LEDGER.md` once authoring starts.
`coverage/AZD-MSK-triage.md` is the worked example: source selection (why
the one keyed formative exam beat the corpus's larger-but-unkeyed or
image-scanned alternatives), key-recovery method (render, not text
extraction), checkpoint table, per-question concept table with
`find-existing.mjs` hits.

## 6. Commit rhythm

First commit within minutes of worktree setup; commit+push after each
deliverable (S0 manifest, S1b readability, S2 priority sources, S1 triage,
LANE-CARD). Report <=20 lines to chief-of-staff, ends `HANDOFF:
<branch>@<sha> · awaiting TRIAGE APPROVED`.

## 7. This lane's known traps

- **Two unrelated trees share one corpus.** `README - Library Guide.md`
  documents `Year 1/Year 2/Year 3/Semester N/...` -- almost entirely empty
  scaffolding (schedules + Student Guide only). The only real content (12
  PDFs) sits under a second, undocumented top-level folder, `Faculty of
  Medicine/Year 1/<Blood|Musculoskeletal|Respiratory>/_Telegram Year 1
  Archive/`, using informal nicknames for the official Semester 2 modules.
  Always check both trees; the README alone under-reports the corpus.
- **Semester 1's `99 Ancillary Courses` folder over-claims.** It has 9
  Desktop subfolders but the Student Guide's own Semester 1 marks table
  (p.21) names only 5. `Clinical Nutrition`, `Hospital Administration`,
  `Quality in Health Facilities` are not on that table at all, and `Quran`
  belongs to *Semester 2* per the same table (whose own folder tree already
  has it correctly). Do not author against those four as Year 1 Semester 1
  without an Omar ruling -- see `academic/AZD-Y1-modules.md`.
- **Professionalism numbering is reversed**: the table's "Professionalism
  2" (Semester 1) is Soft Skills; "Professionalism 1" (Semester 2) is
  Medical Ethics.
- **4 of 7 Year 1 modules have zero source material** (`AZD-NHB`,
  `AZD-PDDT`, `AZD-BMS`, `AZD-CMBG`), and so does every ancillary/pass-fail
  component. Telegram fetching is retired -- this lane cannot close that gap
  by fetching further. Needs Omar sources.
- **The prior curator's own scope note is load-bearing**: `Faculty of
  Medicine/Year 1/_Catalog/Year 1 Priority 4.md` explains the 4-file cap.
- Live/pending overlap on `AZD-MSK`'s 24 triaged concepts: 6 live (sarcomere,
  coracobrachialis/musculocutaneous, rotator cuff, biceps/musculocutaneous,
  chronaxie, RMP mechanism), 10 pending (mostly Kasr `101-ISK`/`103-BMS`,
  Alexandria `AU-MED-102/105`), 8 new (`msk` x6, `gyn` x1, `fnd` x1).

## 8. Walls -> where the answer lives

Id/search/overlay law -> `00-START-HERE.md` §3-4. Gate/tool shape ->
`SHARED-TOOLCHAIN.md` §Content CLI. Explanation bar -> `05-questions.md`.
Triage checkpoint -> `13-orchestration.md` §5. Reviewer/publisher,
answer-key rulings -> `docs/chief-of-staff/HANDOFF.md` "Standing orders".
No AZD LANE-BRIEF.md yet -- start one if this card isn't enough.
