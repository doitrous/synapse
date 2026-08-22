# Alexandria University — lane brief

Orders for every subagent working the Alexandria University corpus. Read this first, then
the manuals it names. The orchestrator (session `alexandria-university-content-000583`) is
your consultant: when you are blocked, stop and report — never guess.

## 1 · Identity — these values are fixed

| Thing | Value | Source |
|---|---|---|
| University ID | `au` | `src/data/universities.ts:178` — `Alexandria University`, short `AU` |
| Year IDs | `AU_Y1`, `AU_Y2`, `AU_Y3` | `buildYears('AU')` in the same file |
| Module IDs | `AU-<CODE>` — uppercase, hyphens, no spaces: `AU-MED-102`, `AU-MED-201`, `AU-UNI-104`, `AU-E-304`. **Ruled by the chief of staff 2026-08-22 evening**: module ids are global bare strings with no university cross-check in the importer, so a bare `MED 102` would collide with any other university printing the same code. The faculty-printed code (`MED 102`) stays in the module *name* and in aliases/`rawModuleShorthand`; it is never the id | ruling; `withModules()`, `bulkImport.ts`, `contentControl.ts:661`, `blueprint.ts:84–87` |
| Module names | the words after the dash in the folder name, e.g. `Foundation of Basic Medical Sciences & Medical Terminology` | same. Do not expand, translate or "improve" them |
| Corpus root | `/Users/doitrous/Desktop/Alexandria University/` (`y1/`, `y2/`, `y3/`, `General Resources/`) | read-only. **Never move, rename or delete a corpus file** — unlike Kasr, this tree is already organised |
| Output root | `docs/Alexandria-Source-Imports/` | mirrors `docs/Kasr-Source-Imports/` folder for folder |
| Tooling root | `scripts/alexandria/` | **not** `scripts/kasr/`, **not** `scripts/corpus-intake/` — see §4 |

Every authored item carries a **non-empty** `universities` (`au`), its year ID, the exact
`AU-…` module ID, and a `module_subject` path that resolves against `academic/`. An empty
`universities` list means *unrestricted* to the runtime — it is never acceptable here.

## 2 · Read order

1. `Instruction Manual for Content Creation/00-START-HERE.md` — the shared law.
2. The **one** manual for the type you were asked to produce (`02-concepts.md`,
   `04-library-articles.md`, `05-questions.md`, `12-resources.md`, `01-subjects-and-topics.md` …).
3. `Instruction Manual for Content Creation/SHARED-TOOLCHAIN.md` §§ "Findings every lane
   needs" — the Kasr lanes paid for each of those once; do not pay again. Especially:
   *Author to the manual's floor, not to 101's shape*; *Filter on university*; *Concepts,
   articles and questions are one authoring set*; the `[clear]` rule (list columns only — on
   a text column emit the key with nothing under it); `field_notes` keys are camelCase
   property names.
4. `docs/Kasr-Source-Imports/INDEX.md` and one finished Kasr module as the worked shape —
   `104 CPS` is complete end to end (`academic/104-cps-structure.md`,
   `coverage/104-CPS-coverage.md`, `concept/104-CPS-concepts.md`, `article/104-CPS-articles.md`,
   `question/104-CPS-mcq.md`, `evidence/104-CPS-*.md`). Copy the **field semantics**; do not
   copy its field coverage.

## 3 · Hard rules

- **Never** `git commit`, `git push`, or import. A batch is finished when it validates clean
  in its folder. The orchestrator commits.
- **Never invent an ID, a fact, a dose, a citation, a URL, or a sitting year.** If the source
  does not say it, the field is empty with a `field_notes` reason.
- **Search before you create** — `node "Instruction Manual for Content Creation/tools/find-existing.mjs" <shortest distinctive word>`,
  at least four queries. 1,718 concepts are live, most from Kasr; Alexandria teaches the
  same medicine. A hit is an **update**, not a second record. Universities are an overlay —
  where Alexandria teaches something differently, that is a `university_notes` entry.
- **Department-book concepts + articles first, questions second.** A question may only test
  a concept an article teaches; the validator refuses the rest. Omar's standing order.
- **The evidence layer (claims → citations → spans) and the bank→leaf MCQ triage apply to
  every module.** No module gets a lighter process.
- **Floors are the manual's:** concept ≥ 50/52, article ≥ 49/53, MCQ ≥ 46/50, written
  ceiling 41, resource catalogue 16/18, subject tree 12/14.
- **Gates, in order:** `medical:batch` per file (format only) → `medical:simulate … --emit
  /tmp/sim-AU-<scope>.json` (the gate) → `medical:audit -- --source …` filtered to your own
  IDs with a positive control. Use your own `/tmp/sim-AU-…` filename; the machine is shared.
- **One lane, one output file.** Name every file `<MODULE-SLUG>-<subject>-<kind>.md`, one
  (module, subject, kind) per file — `AU-MED-102-anatomy-concepts.md`,
  `AU-MED-102-anatomy-articles.md`, `AU-MED-102-eom-2023-mcq.md`. Claim it in `Instruction Manual
  for Content Creation/CLAIMS.md` with scope `AU · <AU-MODULE-ID> · <subject> · <kind>` —
  **append at the bottom of the table**, never at the placeholder row. (Same grammar as the
  Helwan and Ain Shams lanes.)
- **Hand edits to a generated batch die on the next rebuild.** If you generate, make the
  fix generator input. If you hand-author, the file must not carry a generator header.

## 4 · Tooling boundary

**No system-level installs.** `brew install`, `brew install --cask`, anything under `/usr/local`
or `/Applications`, or a global `pip install` is not yours to run — record the file as
`unprobed` with the tool it would need and report it. A Python package into a venv under
`scripts/alexandria/.venv/` is fine. (P0-A started a LibreOffice cask install unasked on
2026-08-22; it was reported to Omar, not ordered.)


`scripts/kasr/` and `scripts/corpus-intake/` belong to the Kasr sessions (Year 1 lane and
the Years 2–5 master). **Do not edit them.** Alexandria tooling lives in `scripts/alexandria/`:
copy what you need, parametrise it (`--university au`, `--year`, `--module`), and say in the
file header which Kasr file it was taken from and at which commit. Cache page text under
a gitignored `scripts/alexandria/pagetext/`. Results go to `scripts/alexandria/extract/<MODULE>/`.
Nobody edits `package.json` — invoke by path.

## 5 · Corpus hazards already known

- **Duplicates by name.** Roughly half the files exist twice: `X.pdf` and `X [from
  Alexandria University Updated].pdf`. Dedupe by checksum; one source ID per content hash.
- **A four-digit number in a filename is a cohort, not a sitting year.** `Final CNS 2027`,
  `END GIT EXAM 2029`, `End foundation 2030` name the *graduating batch*. The year a paper
  was sat comes only from the paper's own header. Record the cohort as a signal; leave the
  year empty unless the page says it. (Kasr learned this the hard way — see
  memory `kasr-batch-sitting-year-formula`.)
- **`مصريين` / `Egyptian` and `وافدين` / `wafdeen`** are the two streams' papers for the same
  sitting. Same module, same exam, two papers. Record the stream on the resource; do not
  treat them as two years.
- **`EOM -`, `EOM MCQs -`, `EOY -`, `MCQs -`, `DPT BOOK -`** prefixes are the organiser's
  classification and are reliable; subfolder names (`Anatomy`, `Exams`, `General`) are the
  department. Read the header anyway — the Kasr manifest found nine papers under the wrong
  module by text.
- **Answer keys hide**: in highlights, in a separate `answers` file, in a mock's second half.
  Read `SHARED-TOOLCHAIN.md` → *Recovering an answer key: one decision procedure* before
  recording any key. A mark on every option is not a key.
- **`pptx`/`ppt`** make up ~200 files (lecture slides). Text extraction via `python-pptx`
  or `libreoffice --headless --convert-to pdf`; never hand-transcribe slides from a render.
- Empty or near-empty in the corpus: `MED 101`, `UNI 107`, `UNI 310`, `UNI 311`, `E 304`,
  `E 306` (0 files), `MED 302` (2 files), `MED 307` (8), `MED 308` (19), `MED 305` (23),
  `MED 309` (35). These go on the gap ledger for the Telegram fetch lane — you do not
  open Telegram yourself.

## 6 · Telegram

Only the orchestrator's designated fetch lane touches Telegram, through Omar's logged-in
Chrome, one lane at a time. Every other lane records what it could not find in
`coverage/00-gap-ledger.md` (what, for which module and department, why it matters, tier).

## 7 · When you are blocked

End your turn with a section headed `BLOCKED` that states: what you were doing, what you
tried, the exact error or ambiguity, and what decision you need. The orchestrator answers
and resumes you. Do not pick an answer and carry on.

## 8 · Report format

Every lane ends with:

```
LANE: <id>
SCOPE: <module · department · type>
OUTPUT: <paths>
COUNTS: <items, fieldsUsed, gate results — batch / simulate / audit>
OWED: <back-links, Wanted rows, anything not done and why>
HAZARDS: <anything the next lane would otherwise rediscover>
BLOCKED: <or "none">
```

## 9 · Settled with the peer sessions (2026-08-22, 18:xx)

- **Sibling universities.** Ain Shams (`asu`, `docs/Ain-Shams-Source-Imports/`, `scripts/asu/`)
  and Helwan (`hu`) run the same shape in parallel. Same rules, separate folders.
- **`src/data/universities.ts`:** each university adds its **own** `const AU_MODULES` table
  beside `KAU_MODULES` and swaps only its single array line to
  `withModules(buildYears('AU'), AU_MODULES)`. Separate const, separate line — nothing else
  in that file is touched. The matching import batch is `docs/import-ready/academic/au-modules.md`
  (kau-modules.md is the template). The academic lane (P0-B) owns both.
- **CI gates you will meet:** `medical:id-stability` (`scripts/kasr/check-id-stability.ts`, pins
  one concept ID per module) and `scripts/kasr/check-concept-ids.ts` (one canonical key → one
  ID per module), both run on pull requests. Read what they check before minting.
- **Update, don't duplicate.** Kasr lanes have authored hundreds of Year 1–2-level concepts,
  live and pending in `docs/Kasr-Source-Imports/`. An Alexandria concept that matches one is an
  **update** — add `au` to `universities`, the AU year, the AU module path — never a second
  record. `find-existing.mjs` may not search the Kasr pending folders; grep them too.
- **Chrome / Telegram:** one browser across every university. Only the orchestrator books it,
  by messaging the Kasr Years 2–5 session and waiting for an explicit "browser free".
- **Corpus intake is being generalised** by the Kasr Years 2–5 lane into a `(university, year)`
  constants table. Until that hash lands, `scripts/alexandria/intake/` is the fallback and must
  not assume the hook's final shape.

## 10 · Orders added 2026-08-22 evening — these override anything above that conflicts

### Scope test (from Omar via the chief-of-staff session)
Everything exists so a student can solve the question bank and then pass the real exam.
- **Past papers and exam-shaped material are the source of truth.** The triage runs from the
  papers and MCQ banks *to* the department book: list what the papers test, then author the
  concept + article that teaches each tested idea, then the question. Authoring order is
  still concept → article → question (the validator refuses a question whose concept has no
  article), but **scope is decided by the questions**.
- A concept, article, relation, glossary term or resource exists only because a question
  tests it or a correct-answer explanation needs it. If you cannot name the question, do not
  write it. Record the question ID(s) in the concept's `field_notes` / article's
  `question_ids` so the trace is auditable.
- The correct-answer explanation is the teaching moment: `explanation_<correct>` is the
  whole worked explanation, not a one-liner.
- Mastery tagging is honest: `main_concept` / `concept_ids` only for what the question
  really tests; scenario dressing goes in `contextual_concept_ids`.
- Every report states the share of records traceable to a real question.

### Placement (from the validator lane, read from the code)
`medical:batch` checks every `primary_node_id` / `secondary_node_ids` against the canonical
taxonomy index (1,883 nodes, `SYS-`, `DIS-`, `SKL-`, `KNW-`). **There is no AU tree and you
may not invent one.** Place on the canonical node that describes the same medicine; a real
gap in the tree is a Wanted row in CLAIMS.md, reported upward, never a new node.

### Minting — the manual's tool is university-blind, and that is deliberate
`tools/mint-concept-id.mjs` hashes the canonical key only. The same key at Kasr and at
Alexandria gives the **same ID** — one concept, two universities in `universities`. That is
the manual's overlay design. The failure mode is a lane that does not notice the hit and
writes a full new record over someone else's fields. So, before every mint:
1. `find-existing.mjs` with ≥4 queries (live state + `docs/import-ready` + `docs/questions-import-ready`).
2. `grep -ril "<canonical_key>" docs/*-Source-Imports/concept/` — the Kasr, Ain Shams and
   Helwan pending batches, which find-existing does not see.
3. A hit anywhere → an **update record**: `## id` + `## label` + only the fields you change
   (`universities` with `+au`, `years` with `+AU_Y1`, `modules` with `+AU-MED-102`,
   `university_notes` if Alexandria teaches it differently). Never a second full record.
4. No hit → mint, and write the canonical key you minted into your report so the audit can
   check it against the next university's batch.

### Evidence tooling
`scripts/kasr/build-spans.ts` (commit `4033bde`, branch `claude/kasr-alainy-content-report-e0ee59`)
is the model for span generation: it takes `parseSections` from `src/data/bulkImport.ts` so
`section_id` is exactly what the wizard derives — keep that import in any copy. Its block
parser uses `(?=\n## |(?![\s\S]))`; the older `(?=\n## |$)` with the `m` flag truncates
multi-line fields at the first blank line. Do not copy the old form.

### Chain of command
Lanes report to the orchestrator only. The orchestrator reports to the chief-of-staff
session and routes every cross-lane request through it.

## 11 · Rulings from the chief of staff (2026-08-22, evening)

- **Minting: overlay-by-rule.** The manual's tool stays unsalted; one medical idea = one
  concept ID across universities; `universities` / `years` / `modules` are overlays. Key
  search before every mint covers live state + every `docs/*-Source-Imports/**` concept
  batch + `docs/import-ready/`; a hit → sparse update, never a full record.
- **MINT FREEZE.** No Alexandria lane mints a concept ID until the orchestrator lifts it.
  Two things must land first: P0-D's proof of what the importer does with a full-record
  collision, and the validator lane's `find-existing.mjs` extension to `docs/*-Source-Imports/`
  plus its tree-wide duplicate-key scan. Until then: write triage lists, draft articles
  and concepts with `## id` left as `<<PENDING-MINT>>`, and fill IDs last. A file with a
  pending ID never goes through `medical:batch` and never sits in an import root.
- **Scope confirmed:** EOM papers / MCQ banks / EOY decide which concepts and articles exist;
  then the rest of the department-book chapter the module examines; nothing beyond. Order:
  concept → article → question.
- **Browser queue:** Kasr Y2–5 → Helwan → Alexandria → Ain Shams. The fetch lane starts only
  on "browser is yours" from the chief of staff; channel links only, tier-ranked, MED 101
  and MED 302 first; the orchestrator sends "browser free" when done.

### Toolchain hashes to copy from (branch `claude/kasr-alainy-content-report-e0ee59`, not yet on main)
- `a4449a8` — `scripts/kasr/check-concept-ids.ts` invariant: one canonical_key → one id within
  a module; same-key-same-id repeats across files are legitimate; an update row may carry a
  blank key when the id is live and keyed. Dated section in SHARED-TOOLCHAIN.md.
- `4033bde` — `build-spans.ts` module-parameterised; `apply-article-evidence.ts` discovers every
  article batch a module owns.
- `build-evidence.ts` generalisation: pending, hash to follow.
Read them with `git show <hash>:<path>`; copy into `scripts/alexandria/` with a header naming
path + hash. The mint freeze lifts only when the orchestrator says so.

### Pending follow-up — `AU_MODULES` terms
Ain Shams (`claude/busy-goldberg-ac3e9e`) is landing `withModules()` with an optional third
tuple element `term`. When that hash reaches main, the academic lane fills the third element
for every AU module from `au-modules.md` (10 Term 1 / 13 Term 2). Nobody adds a parallel
term mechanism, and nobody edits `withModules` here.

## 12 · Mint freeze PARTIALLY lifted (chief of staff, after `fa72ec4` on main)

`scripts/kasr/check-concept-ids.ts` now scans every `docs/*-Source-Imports/concept` batch, and
`find-existing.mjs` already globs every university root. Run **`npm run medical:concept-ids`**
before every hand-over. The key search (§10) is unchanged. Then:

| Key search result | What you write |
|---|---|
| No hit anywhere | mint with `tools/mint-concept-id.mjs` — **allowed** |
| Hit in **live** state | sparse update record (`+au`, `+AU_Yn`, `+AU-MED-xxx`) — **allowed** |
| Hit only in **another lane's unimported batch** (Kasr/Ain Shams/Helwan `*-Source-Imports`) | write the record with that existing ID but **hold it** in `pending-live/<slug>.md`, outside any import root, until the orchestrator lifts this case |

Replace every `<<PENDING-MINT>>` placeholder under these rules before validating.

## 13 · Corpus facts from the gap ledger (`coverage/00-gap-ledger.md`)
- **The `[from Alexandria University Updated]` twins are NOT byte-identical** (0/20 sampled;
  1–8% size differences, same page counts, different text-extraction outcomes). The manifest
  records both with `nameTwinOf` and marks one `twinPreferred`. Read the preferred one, cite
  the one you read, never treat them as two sources of evidence for one fact.
- 3,615 raw files → ~2,281 distinct by name. Zero orientation/schedule files anywhere — the
  module's own statement of what it examines does not exist in this corpus; the EOM papers
  are the only blueprint. Forensic Medicine & Toxicology is empty in all three Year 2 modules
  that reference it. `MED 302` is empty across all six departments.
- `Anatomy` and `Anatomy and Embryology` are sibling folders in four modules — query both.
- `MED 305/307/308/309` carry unlabeled book-length teaching texts; file counts undersell them.

## 14 · Subject ruling (chief of staff, verified in `src/data/curriculumCatalog.ts`)

The valid `subject` ids are the catalogue's **20**, not the manual's eight (the manual is
stale and being corrected): `cvs resp renal gi neuro endo msk pharm fnd dev haem imm inf obs
gyn androl psy derm mul pop`. **The importer validates none of them — a typo is silent**, so
copy from this list. Placement law for subjects with no obvious home:

| Teaching | `subject` | Notes |
|---|---|---|
| Community Medicine / public health | `pop` | |
| Psychology / behavioural | `psy` | |
| Microbiology, Parasitology, Tropical | `inf` | |
| Forensic Medicine, Toxicology, ENT, Ophthalmology | the body system of the **mechanism or target organ** | asphyxia → `resp`; otitis / conjunctivitis → `inf`; visual pathway, pupil, audiovestibular → `neuro`; ocular embryology → `dev`; organophosphates → `mul` |
| Umbrella forensic / toxicology principles | `mul` | |
| Pharmacology | `pharm` | the `CON-` body-system code is `FND` or `INF`, never `MUL` (SHARED-TOOLCHAIN) |

`universities` must be non-empty on every record — no gate catches an empty list yet
(the validator lane is adding the error); an empty list means *unrestricted* at runtime.

## 15 · What the validator probe proved (`coverage/00-validator-probe.md`) — read before authoring

- **An update row for an ID that is not live is CREATED as a stub, silently.** The held case
  in §12 stays held: a sparse update for an ID that exists only in another lane's unimported
  batch goes in `pending-live/<slug>.md` outside any import root, with an INDEX line
  "apply only after <that file> is live". Never fill such a stub in to make it pass.
- **A full record on an ID you found by search replaces every field it names** — it evicts
  `kau` from `universities` and can un-publish a live concept, and simulate reports it as a
  normal `updated: 1`. Sparse update only; `+` on list columns; `exam_weight_by_year` has no
  `+` — write `AU_Y1=<weight>` and the existing keys survive.
- **Simulate only your own directory.** Two files naming one `## id` in one run → last file
  wins, no warning.
- **`find-existing.mjs` never reads a pending file's `## canonical_key`** (label/title/term/
  aliases only). The `grep -ril "<canonical_key>" docs/*-Source-Imports/concept/` is the only
  key-level check for pending batches. Both, every time.
- **`universities` and `modules` are validated nowhere.** Copy `AU-…` ids from §1 by eye; a
  typo will never be caught by a tool. Placement *is* checked and refused.
- "Live state" for simulate is `server/data/medical-library-v1.json` (regenerated 2026-08-12),
  not the database.
- CI now runs every content gate on Alexandria files (`9dba8ca`: `content.yml` triggers on
  `docs/*-Source-Imports/**` and `scripts/alexandria/**`, and walks every university's batch
  directory). Still run every gate locally and paste the output — CI is the second check.

## 16 · Mint freeze FULLY LIFTED (chief of staff, after P0-D) — the four laws

1. A key whose ID exists only in another lane's unimported batch → sparse update written to
   `docs/Alexandria-Source-Imports/pending-live/<slug>.md` (Omar never imports from there);
   the folder INDEX says "apply only after <that university's file> is live".
2. Sparse updates only on found IDs; `+` on list columns; `exam_weight_by_year` as
   `AU_Y1=0.5`-style keys only.
3. Simulate your own directory only; never combine directories in one run.
4. `grep -ril "<canonical_key>" docs/*-Source-Imports/concept/` stays mandatory.
Everything in §12 that said "hold" now means "write it under rule 1". `<<PENDING-MINT>>`
placeholders are no longer allowed in any file.

### More toolchain hashes (Kasr Year 1 branch, not main)
- `c0a3709` — `scripts/kasr/build-evidence.ts` module-parameterised (`--module`, `--concepts`,
  `--book`, `--out-prefix`; reads the pagetext cache; `manifestPathFor(module)`).
- `bec5510` — MCQ triage pipeline per module (`seeds/mcq/<module-slug>/`, `extract/<module-slug>/mcq-bank.json`).
The tooling lane copies these into `scripts/alexandria/` with headers naming path + hash.

## 17 · YEAR 1 ONLY (Omar, via the chief of staff, 2026-08-22 evening)

"Pause all universities and years; finish Year 1 of Kasr and Year 1 of Alexandria first so I
can publish them; then continue with the rest."
- Wave 1 (AU-MED-102/103/105/106) runs to the checkpoint, then to completion after approval.
- **Years 2–3: no lanes, no authoring, until the orchestrator says RESUME.** P0-E may pre-extract
  Year 1 only.
- **Publishable, per Year 1 module:** every triaged question's main concept is covered by an
  article; `medical:batch`, `simulate`, `audit`, `concept-ids` all green; pending-live records
  separated with their import-order line; each import folder's `INDEX.md` carries the exact
  order and flags for Omar.
- The Telegram fetch list is re-ordered Year 1 first (MED 101 first, then the Year 1 gaps in
  `coverage/00-gap-ledger.md`); Year 2/3 rows wait.

### What "live" means (validator lane, verified in code)
`server/data/medical-library-v1.json` — what simulate and find-existing call live — is built
from the extraction bundle, never from production. Omar's admin-UI imports are not in it and
regeneration would not add them. So:
- **HIT-LIVE** = the id is in the bundle.
- A key found only in `docs/import-ready/` or any `docs/*-Source-Imports/` folder is
  **HIT-PENDING** even if Omar may already have imported that batch — it goes to
  `pending-live/` with the batch name in its import-order line, and Omar confirms at import.
- Deterministic ids mean a re-mint of an already-applied key becomes an update, not a
  duplicate. Nothing to fear there; the hazard is only the stub-creation case in §15.

### Catalogue gate now in `medical:batch` (`57ef0d4` on main, merged here)
`universities` non-empty and valid; `module_subject`'s first segment must be a module the
record declares in `modules`; `subject` ∈ the 20 catalogue ids; the `AU-` prefix is required
on module ids; module *existence* is deliberately not gated. A production read route exists
(`GET /api/state`, super-admin + MFA) and `medical:snapshot-live` is coming so Omar can refresh
the fixture; until he runs it, "live" still means the bundle and the pending-live rules stand.

### Cache discipline (after the 2026-08-22 overwrite incident)
**Nothing writes into `scripts/alexandria/pagetext/` except `scripts/alexandria/extract/pagetext.py`.**
An intake job wrote a different schema under the same filenames and wiped 3,397 page
extractions in four seconds. `pagetext.py` now validates a cache hit before trusting it and
rebuilds on a foreign schema; any other tool keeps its own directory.

### Garbled answer keys are not a text-extraction problem
On AU-MED-105's five anatomy banks and AU-MED-102 Terminology MCQ1/MCQ2 the PDF text layer's
word positions are collapsed to a sliver (a prior CamScanner OCR with corrupted metadata).
`pdftotext -layout/-raw/-fixed` all return the same scrambled order; `--layout` is byte-identical
to plain. A key from one of these files can be recorded only from a **render** read by eye,
question by question, with the method written in the triage; otherwise the question stays
unkeyed and is not authored. Never reorder letters by pattern.

### `+` additions: one per line, never pipe-joined (importer bug, fix in progress)
On an update row, `+ID-A | +ID-B` stores the second value as the literal string `+ID-B`.
Until the validator lane's fix lands, write every `+` addition on its own line:

```markdown
## universities
+au

## modules
+AU-MED-102
```

## 18 · TRIAGE APPROVED (chief of staff) — binding for Step 2 onward

All seven corrections in `coverage/00-publish-plan-year1.md` § Corrections apply as written.
Three additions:
1. **Explanation bar.** `explanation_<correct>` is the whole worked explanation — at least three
   sentences: why it is right, the mechanism, and the thing to remember. Each distractor gets one
   sentence saying why it is wrong. A two-sentence explanation fails review.
2. **Pending-live ordering.** Omar imports Kasr Year 1 before Alexandria. Sparse updates into
   Kasr Y1 ids go in `pending-live/<slug>.md` per lane, and `pending-live/INDEX.md` carries one
   line per file naming the Kasr file it follows. No per-record hand-off.
3. **Commits.** Lanes still never run git. The orchestrator commits each lane's question-backed
   records separately from everything else, with the gate lines in the commit body — so every
   report must paste the exact `medical:batch` / `simulate` / `audit` / `concept-ids` output.

## 19 · Validator landings merged (312777b, 470fdde, b3cad82) — three rule changes
1. `+` additions: the fix is at the parser (`312777b`), so `+A | +B` and one-per-line are BOTH safe now
   (the one-per-line workaround never actually avoided the bug). A stored value never begins with
   `+`; a mixed cell `X | +Y` is refused as ambiguous. No batch edits needed.
2. **An update-shaped row for an id that is neither live nor authored in the same batch folder is
   now an ERROR.** Validate every `pending-live/<slug>.md` with `--with` the Kasr concept file it
   targets: `npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/<slug>.md --with docs/Kasr-Source-Imports/concept/<file>.md`.
   A pending-live file that fails without `--with` and passes with it is correct.
3. `find-existing.mjs` now reads `## canonical_key` in pending batches; the manual grep is no
   longer required (harmless if you keep it).
4. **An update row carries only changed fields.** Never restate `source_candidate_ids` copied from a
   live record — the candidate check fails on live-only candidates until the validator's next fix.

## 20 · Revised manual on main (`0e08ac1`, merged)
- Every lane dispatched from now on reads `00-START-HERE.md` (§0 law of priority, roles, stages
  S0–S8, gates) and `13-orchestration.md` (reports, triage checkpoint, pause/resume, hazards
  register, skeletons) before its type manual. `05-questions.md` now carries the three-sentence
  explanation floor and the coverage rule — the same bar as §18.
- Lanes already in flight keep their orders; nothing in the revision contradicts §10–§19.
- **An update row must restate its kind's discriminator** (`## label` for a concept; the
  discriminating columns in each manual's header box) or it is silently refused. Every
  `pending-live/` row carries `## id` + `## label` + the `+` fields — nothing else.
- **Practical stations are scoped** by `universities` / `years` / `module` (importer columns
  landing as `ed87a85`); an empty `universities` means every university — never leave it empty.

### Two more validator rules (`ed87a85`, `d82dd36`, merged)
- Every practical station carries `universities: au` (plus `years`, `module`).
- A leading `+` on a non-id-list column is an ERROR: `module_subject` and every prose/path field
  is written as a full replacement. An update row without its discriminator (`## label`) is now
  an ERROR rather than a silent skip — which is what you want.
