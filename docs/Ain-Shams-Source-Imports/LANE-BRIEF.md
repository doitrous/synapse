# Ain Shams lane brief

Orchestrator: session `busy-goldberg-ac3e9e` (branch `claude/busy-goldberg-ac3e9e`). Every Ain
Shams subagent reads this file first, then `Instruction Manual for Content Creation/00-START-HERE.md`,
then the ONE manual for the kind it is producing, then the sections of
`Instruction Manual for Content Creation/SHARED-TOOLCHAIN.md` named in its orders. The manual is law;
this brief tells you how the law applies to this university.

## 1. What we are building

Synapse content for **Ain Shams University (`asu`) Years 1, 2 and 3**, from the corpus at
`/Users/doitrous/Desktop/Ain Shams` (2,177 files, ~10 GB, almost all PDF). The corpus is already
organised on one grammar — do not move or rename anything in it:

```
<Year N>/<Term K>/<Module>/<Subject>/<Lectures|Practical|Assessments|Compilations|Notes|Department Books>/<file>
<Year N>/<Term K>/<Module>/All Subjects/<Assessments|Practical|Department Books>/<file>
<Year N>/[Term K/]Administration/Schedules/<file>
```

Sub-folders under a kind are usually a doctor's name (`Dr.Omar/`) or `Slides/`, `Official Faculty PDFs/`.
Filenames carry signals: `Bg` (a student-group compilation), `EOM`, `MCQs -`, `Formatives`, `essay`,
`DPT BOOK`, `Checklist`, `[old]`, a year, a doctor's name. The `NOTE … NOTE` convention from Kasr does
not appear here.

Identity: university `asu`, years `ASU_Y1`, `ASU_Y2`, `ASU_Y3` (`src/data/universities.ts:177` —
the catalogue has the university but **no modules**; the catalogue lane adds them).

## 2. Where things go — and where they never go

| Thing | Path |
|---|---|
| Batches (every kind) | `docs/Ain-Shams-Source-Imports/<kind>/` — same folder set and meaning as `docs/Kasr-Source-Imports/` (read its `INDEX.md`) |
| Manifest | `docs/Ain-Shams-Source-Imports/manifest/asu-y1-sources.json`, `asu-y2-…`, `asu-y3-…` + `README.md` |
| Toolchain | `scripts/asu/` — intake, extraction, seeds, emitters. Copy the pattern from `scripts/kasr/` and `scripts/corpus-intake/`; change the constants (`kau`→`asu`, `KAU_Y1`→`ASU_Y<N>`, root path, module table, output dir). Keep field semantics byte-identical to Kasr's `emit.ts` so the two universities can be compared. **Exception — concept IDs are NOT salted** (see §6, Minting). |
| Per-run extraction results | `scripts/asu/extract/<MODULE-SLUG>/…` — module-namespaced from day one, never an unprefixed file |
| Page cache | `scripts/asu/extract/pagetext/` (gitignored — add to `.gitignore` if not covered) |

**Never write into `scripts/kasr/`, `scripts/corpus-intake/`, `docs/Kasr-Source-Imports/`, or
`package.json`.** Five Kasr lanes own those; the Years 2–5 lane is mid-retrofit of `corpus-intake`
(uncommitted `year_config.py`). Invoke everything by path (`node --experimental-strip-types scripts/asu/…`,
`python3 scripts/asu/intake/…`). If you find a bug in a Kasr script you copied, fix it in your copy
and put the finding in your report so the orchestrator can relay it — do not edit theirs.

Batch filenames are module-named: `<MODULE-ID>-<subject>-<kind>.md`, e.g.
`ASU-IMM-immunology-concepts.md`, `ASU-CVS-anatomy-articles.md` (the module ID already carries the
`ASU-` prefix; do not add a year token). One kind per file (`detectKind` reads the
first record only). A module with several subjects gets one file per `(subject, kind)`.

## 3. Module IDs — settled 2026-08-22

Module IDs are minted once, in `src/data/universities.ts` (`ASU_MODULES`) and
`docs/import-ready/academic/asu-modules.md`; the human-readable catalogue with evidence is
`docs/Ain-Shams-Source-Imports/academic/asu-modules.md`. **Every ID is `ASU-<TOKEN>`**, upper-case,
hyphens, no spaces — `ASU-IMM`, `ASU-CVS`, `ASU-CNS-2`, `ASU-IBM-1` — because content records store
`moduleIds` as bare strings with no university cross-check, so a bare `CVS` would collide with another
university's and sits one case-fold from the subject id `cvs`. Names that recur across years carry a
year suffix (`ASU-CNS-2` / `ASU-CNS-3`); the `-1` in `ASU-IBM-1` is the faculty's own printed code.

| Year | Term 1 | Term 2 |
|---|---|---|
| ASU_Y1 | ASU-IMM · ASU-AE · ASU-HCB · ASU-IBM-1 · ASU-MBG | ASU-BLS · ASU-GPATH · ASU-GPHARM · ASU-INF · ASU-LOCO |
| ASU_Y2 | ASU-BLOOD · ASU-CVS · ASU-RESP | ASU-CNS-2 · ASU-ENDO-2 · ASU-RM-2 · ASU-SS-2 |
| ASU_Y3 | ASU-CNS-3 · ASU-CLIN-NEURO · ASU-COMM · ASU-RM-3 · ASU-SS-3 | ASU-CLIN-ENDO · ASU-CLIN-UG · ASU-ENDO-3 · ASU-UG |

**Every record you emit — concept, article, question, written, practical, resource — carries a
non-empty `universities` (`asu`), the exact year ID(s), the exact module ID(s), and a `module_subject`
path `<Module ID> > <Subject> > <chapter>`.** An empty `universities` list means *every* university's
students see the record (`contentControl.ts`, `blueprint.ts`) — it is never acceptable here.

**Curriculum move — ruled 2026-08-22 (evidence in the catalogue doc):** the new programme moved CNS /
Endocrine / Special Senses / Research Methodology from Year 3 down to Year 2 Term 2; byte-twin papers
sit in both year folders. The rule: **one label, one home** — author a concept or
article once, list both learner years and both module paths, and let each question keep the year and
module it was actually sat under. Read a twin paper once (the manifest records `twinOf`).

## 4. Order of work — question-led (Omar's standing orders, 2026-08-22)

**The goal every record serves: a student solves the question bank (MCQ, written, practical) and then
excels in their real Ain Shams exam.** Apply this test to every record before calling a batch finished:

1. **Past papers and exam-shaped material are the source of truth.** Per module, extract the
   assessments first (EOM / final / formative / essay / MCQ banks / practical checklists, highest tier
   first) into a *tested-concept list*: what the exam actually asks. Invented items only fill a gap you
   can name.
   **TRIAGE CHECKPOINT (uniform rule, every university).** A module lane STOPS after triage and ends
   its turn with a table: questions triaged (by paper/sitting), distinct concepts tested, and of those
   how many are **live-hit** (sparse update), **pending-hit** (another lane's unimported batch →
   `pending-live/`), or **new** (to mint) — each concept named with its canonical key and the
   question(s) that test it. Nothing is minted or authored until the orchestrator consolidates the
   lanes' tables, sends them up, and comes back with "TRIAGE APPROVED" (or a cut list). Build the
   triage table as a file — `docs/Ain-Shams-Source-Imports/coverage/<MODULE-ID>-triage.md` — so the
   approval can point at rows.
2. **A concept, article, relation, glossary term or resource exists only because a question tests it
   or the correct-answer explanation needs it.** If you cannot point to the question, it is out of
   scope — do not write it. Author those concepts + articles from the department book / lectures.
3. **Then author the questions** — the validator refuses a question whose main concept has no article,
   so step 2 must land before step 3 validates. `explanation_<correct>` is the whole worked teaching
   moment, not a one-line justification. Mastery tagging is honest: `main_concept` / `concept_ids` only
   for what the question really tests; scenario dressing goes in `contextual_concept_ids`.
4. Practicals, then evidence (claims, citations, spans), then media requests.

Your report states the **share of records traceable to a real question**, and names any record that is
not, so the orchestrator can rule on it.

## 5. Gates — what "done" means

`npm run medical:batch` is **not** the gate. The gate is:

```
npm run medical:batch -- "<file>" [--with <each sibling it references>]       # unknown columns, format
npm run medical:simulate -- docs/Ain-Shams-Source-Imports/<kind>/<your files> --emit /tmp/sim-ASU-<scope>.json
npm run medical:audit -- --source /tmp/sim-ASU-<scope>.json   # filter to your own IDs; use a positive control
```

Zero errors at simulate and at audit against your own IDs, `created`/`updated` counts as you intended
(an update shows `updated: 1, delta 0`). Use a scope-unique `/tmp/sim-ASU-…` name — the machine is
shared. Floors: concepts 50 of 52 columns, articles 49, SBA questions 46, **written questions 41 is the
ceiling**, not a shortfall. Do not pad to reach a floor. Do not mix batch kinds in one `--with` call.

## 6. Hazards that have already cost other lanes real work

- **Minting (ruling 2026-08-22, law for every university lane).** A concept ID is
  `CON-<SYSTEM>-` + SHA-256 of the canonical key alone, first 14 hex — exactly what
  `tools/mint-concept-id.mjs` does. No university, no module in the hash: one medical idea = one
  concept; universities/years/modules are overlays. Kasr's `kau:<module>:<key>` salt is a divergence
  you do not copy. Mandatory key search before every mint — live state, `docs/import-ready/`, and every
  `docs/*-Source-Imports/**` concept batch; a hit is a sparse **update record** (`+asu`, `+ASU_Y<N>`,
  `+<module path>`), never a second full record. **Minting rule (2026-08-22, freeze lifted — law
  for every university):**
  1. Key with **no hit anywhere** → mint with the manual's unsalted tool. Key hit in **live state** →
     sparse update (`+asu`, `+ASU_Y<N>`, `+<module>`). Key hit **only in another lane's unimported
     batch** → the same sparse update, written to `docs/Ain-Shams-Source-Imports/pending-live/<slug>.md`
     (outside every folder Omar imports) with an INDEX line "apply only after `<that file>` is live" —
     because the importer silently **creates a stub** for an update row whose id is not live.
  2. **Never a full record on a found id** — it evicts the other university's overlay, can un-publish a
     live concept, and `simulate` reports it as a normal update. `exam_weight_by_year` has no `+` form:
     write `ASU_Y1=0.5`-style keys only.
  3. **Simulate your own directory only** — a combined run lets the last file silently win on a shared id.
  4. `find-existing.mjs` does not read `## canonical_key` in pending files — `grep` the key across
     `docs/*-Source-Imports/` before minting, until the validator lane fixes it.
  5. `npm run medical:concept-ids` before every hand-over; output in your report.
  Two hazards until the validator lane fixes them: CI content gates trigger on Kasr paths only, so a
  green PR proves nothing for Ain Shams — run the npm gates locally; and `medical:simulate`'s "live"
  state is a fixture from 2026-08-12, so anything Omar imported since is invisible to "is it live?".
- **Search before you mint.** `node "Instruction Manual for Content Creation/tools/find-existing.mjs" <short word>` —
  at least four queries, shortest distinctive word first. Kasr lanes have already authored hundreds of
  Year 1–level concepts (anatomy, histology, physiology, biochemistry, pathology, pharmacology). An Ain
  Shams concept that already exists live or in `docs/Kasr-Source-Imports/` is an **update** (add `asu`
  to `universities`, the ASU year and module path) — never a second record. Universities are an overlay,
  not a branch: one article, `university_notes` for where Ain Shams teaches it differently.
- **Three spellings of "deliberately empty", one per parser** — `[clear]` only on list columns; an empty
  `## key` block on text and section columns; never `[clear]` in `sections`, `published_sections`,
  `annotations`, `media`, `media_recommendations` (it becomes a student-visible section).
- **`field_notes` keys are camelCase property names** (`moduleIds`, `arabicLabel`, `nanotopicId`), not
  import columns.
- **Answer keys hide** in highlights, stamps, flattened ink and pencil; `pdftotext` on a solved paper can
  equal the unsolved twin. Render the page and look before building any detector; `gs -dShowAnnots=false`
  vs `pdftoppm` tells annotation from page content. A blank page is reported blank, never reconstructed.
- **`textLayer` lies**; a text layer can be present and all `U+0001`. Guard on the ratio of word-forming
  characters, not length.
- **Re-running an extractor replaces, never verifies.** OCR passes are hours. Cap deliberately, cache,
  and never regenerate a committed result "to check it".
- **Hand edits to generated batches die on the next build.** Make it generator input (per-module plan
  files), or keep the file hand-authored and never generate into it.
- **A sweep that deletes what it did not write is forbidden.** If you copy `build-batches.ts`, keep
  deletion opt-in (`--sweep`) and marker-guarded.
- **Subject IDs (ruled 2026-08-22, verified in `src/data/curriculumCatalog.ts`)** are the twenty:
  `cvs resp renal gi neuro endo msk pharm fnd dev haem imm inf obs gyn androl psy derm mul pop` — not
  the manual's eight (stale). The importer validates none of them, so a typo is silent. Placement for
  subjects with no obvious home: Community → `pop`; Psychology → `psy`; Microbiology + Parasitology →
  `inf`; Forensic / Toxicology / ENT / Ophthalmology → the body system of the mechanism or target organ
  (asphyxia → `resp`, otitis/conjunctivitis → `inf`, visual pathway/pupil/audiovestibular → `neuro`,
  ocular embryology → `dev`, organophosphates → `mul`); umbrella forensic/tox principles → `mul`. Drug
  labels belong to `pharm`, and `pharm` concepts take `FND` or `INF` as the `CON-` body-system code.
  `CON-<SYSTEM>` is a body-system code, not the subject.
- **Twins.** The manifest marks exact twins (`twinOf`, same sha256) and name-twins (`nameTwinOf`,
  same normalised title + page count, different bytes — re-exports that often LOST their text layer).
  Read the copy marked `twinPreferred: true`, and cite the sourceId you actually read.
- **Never invent an ID, a fact, a dose, a URL.** Media is a request block, never a link.
- **Sitting years:** a calendar year printed on the paper wins; the Ain Shams corpus prints years on most
  assessment filenames. If you derive a year from anything else, say how in `examSittingYearSource`.

## 7. Protocol

- Before writing any batch, add your row to `Instruction Manual for Content Creation/CLAIMS.md` —
  **append to the bottom of the Open table**, never at the placeholder line. Scope = `(ASU module, subject, kind)`.
  Move it to Done with the validator's counts when finished.
- One agent, one output file. Want something in another lane's file → **Wanted** row + tell the orchestrator.
- **Never `git commit`, `git push`, or import.** The orchestrator commits on the branch at checkpoints.
- **Stuck = stop and report.** Never guess past a brick wall. End your turn with a `BLOCKED:` section
  stating exactly what you tried, what you found, and the decision you need. The orchestrator answers
  and resumes you.
- Your final message is a report the orchestrator can read without opening files: what you produced
  (paths, counts, validator output verbatim for the gate commands), what you did **not** do and why,
  hazards you hit, and figures another lane must know. Plain language; no claims of "done" without the
  gate output pasted.

## 8. Upstream Kasr toolchain changes to port into `scripts/asu/` (ledger)

`scripts/asu/` was copied from `origin/main` at `eba7f15`. Later Kasr commits worth porting, with
the branch they live on (not all on `main` yet) — the toolchain lane ports, never edits theirs:

| Commit | Branch | What |
|---|---|---|
| `4033bde` | `claude/kasr-alainy-content-report-e0ee59` | `build-spans.ts` module-parameterised (sentence→claim provenance via `parseSections`, so `section_id` matches the importer); `apply-article-evidence.ts` discovers every article batch a module owns |
| `a4449a8` | same | `check-concept-ids.ts` invariant restated: one `canonical_key` → one id within a module; same-id repeats across files legitimate; update rows may carry a blank key when the id is live/keyed. Plus a SHARED-TOOLCHAIN section |
| `c0a3709` | same | `build-evidence.ts` module-parameterised (`--module "<id>" --concepts … --book … [--out-prefix]`; chapter located from `module_subject`, book chosen by manifest subject, curated claims skipped, manifest path behind `manifestPathFor(module)`) |
| `d82dd36` | `main` | Validator: `medical:batch` refuses a `+` on any column that cannot take one (asks the importer); `medical:simulate` now errors, naming the ids, on a label-less `## id` row instead of listing the file under `skipped` with exit 0. **Lesson:** the silent gate was simulate's exit code — read its `skipped` list, never just the code. Both hazards credited to the asu-toolchain lane |
| `bec5510` | same | MCQ triage pipeline per module (`seeds/mcq/<module-slug>/`, `extract/<module-slug>/mcq-bank.json`) |

## 9. Telegram fetch protocol (ruled 2026-08-22)

One Chrome, serialised across sessions; queue Kasr Y2–5 → Helwan → Alexandria → Ain Shams; the
chief-of-staff session hands the browser over ("browser is yours") and receives it back ("browser
free"). On our turn a fetch lane may use Telegram Web's search box to discover Ain Shams channels and
record their `t.me/` links, but **must never click Join** on anything — a channel the account is not in
yields nothing without Omar, and joining is his decision. Open only supplied channel links; Omar's
other chats are off-limits; never enter credentials. Omar is being asked directly for Ain Shams
channel links, which outrank discovery. Tier order for fetching: final/EOM papers → MCQ banks →
department books → practical checklists (the gap table is `manifest/telegram-sources.md` §D and the
manifest README's Gaps section). Downloads land in `~/Downloads`, are filed under the corpus grammar,
and intake is re-run for that year afterwards.
