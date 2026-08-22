# 13 · Orchestration

**You must have read [00-START-HERE.md](00-START-HERE.md).** Everything there — the file
format, ID rules, search-before-create, the validation gates — still applies to you. This
file adds the layer on top: how lanes are run, who reports to whom, and what a report has
to contain before it counts.

This file is for anyone acting as **chief of staff** or **orchestrator**, and for any
**authoring subagent** that wants to know what its report is judged against before it ends
its turn. If you are only writing concepts, articles or questions for a single module, read
§2 for your row and §3 for the report format, then go write. The rest is for the sessions
coordinating you.

---

## 1 · The shape of the operation

One human — Omar — owns the product and does every import by hand. Everyone else is a
Claude session. Sessions do not talk to each other directly; they talk to the **chief of
staff**, one session that holds the whole picture. Under the chief of staff sit
**orchestrators**, one per university-year lane (Kasr Year 1, Kasr Years 2–5, Alexandria,
Ain Shams, Helwan…), each running its own **authoring subagents** against a shared
toolchain maintained by a **validator / shared-tooling lane**. Content moves through nine
stages (§4) before it is "done", and nothing is imported until Omar clicks Bulk Import.

---

## 2 · Roles

| Role | Owns | Never does | Reports to |
|---|---|---|---|
| **Omar** (owner) | Product decisions; the only Bulk Import clicks; tokens, Telegram channel links, reviewers and publishers; catalogue changes (new subjects, new modules) | Does not author, validate, or run gates himself | — receives escalations |
| **Chief of staff** (one session) | The single channel every lane reports to; standing orders and rulings; the Telegram/browser queue; `docs/chief-of-staff/BOARD.md`; broadcasting toolchain hashes; deciding what needs Omar | Never authors content; never imports; never lets two lanes message each other; never invents a ruling Omar should make | Omar |
| **Orchestrator** (one session per university-year lane) | Its `LANE-BRIEF`; dispatching authoring subagents with explicit file ownership (`CLAIMS.md` rows); running the triage checkpoint and consolidating the table; checkpoint commits on its own branch | Never authors content itself — it dispatches; never pushes; never imports; never runs `removeOrphans` / `--sweep`; never messages another lane — routes through the chief of staff | Chief of staff only |
| **Validator / shared-tooling lane** | The gates (the `medical:*` npm scripts) and the importer; fixing bugs other lanes surface (stub-create, `+A \| +B`, CI globs, the catalogue check); the one lane that lands on `main` | Never authors medical content; never imports for Omar; never merges without `origin/main` first | Chief of staff, with hashes broadcast to every lane |
| **Authoring subagent** | One `(module, department)` claim in `CLAIMS.md`; reads 00 + one type manual; writes batches; runs `medical:batch` / `medical:simulate` / `medical:audit` on its own output | Never messages another lane; never commits, pushes, or imports; never runs `removeOrphans` / `--sweep`; never invents an ID (00 §3) | Its orchestrator (or the chief of staff directly, for a lane with no orchestrator layer, e.g. validator) |

A few rules apply across every row:

- **Nobody except Omar runs an import.** A file is finished when it validates clean, not
  when it is live.
- **Nobody except the validator lane runs `git push` to `main`.** Orchestrators and
  subagents commit checkpoints on their own branch and stop there.
- **Nobody runs `removeOrphans` or `--sweep`** (`scripts/kasr/build-batches.ts`) outside
  the shared-tooling lane's own retrofit work. It deletes written batches the current run
  did not generate, and it has already destroyed hand-authored work three separate times
  in this repo (see §10).
- **Orchestrator never authors.** If an orchestrator finds itself writing a `## definition`
  field, it has slipped into being a subagent and should hand the file to one.

---

## 3 · Chain of command and message discipline

**Lanes report to the chief of staff, and only the chief of staff.** An orchestrator does
not message another orchestrator, and a subagent does not message another subagent, even
when their work obviously touches ("104 CPS needs 102's physiology question" is a real
example — it was routed through the chief of staff as a `CLAIMS.md` **Wanted** row, not
sent lane-to-lane). If two lanes need to coordinate, the chief of staff is the router:
it holds both sides of the picture and can catch a collision neither lane can see.

**Toolchain hashes are broadcast by the chief of staff, not discovered by lanes reading
each other's branches.** When the validator lane lands a fix — `fa72ec4` for the
cross-university concept-id check, `57ef0d4` for the catalogue check, `312777b` for the
`+A | +B` fix — the chief of staff relays the commit hash to every lane that needs to
rebase onto it. A lane that hears about a fix secondhand, from another lane's report
rather than a chief-of-staff broadcast, should treat it as a rumour until confirmed.

**A silent session is idle, not busy.** A Claude session does not think, poll, or make
progress between the messages it sends — it exists only for the duration of a turn. So the
report is not a status update you send partway through useful work; it **is** the last
thing that happens in a turn, and nothing you do after sending it exists until you are
invoked again. Do the work, then report — never report first and continue "in the
background", because there is no background.

**Report format, every time, ≤20 lines:**

```
Lane: <name>
Doing now: <task> + <subagents running, if any>
Produced: <files, counts by kind — "concept 12, article 4, question 91">
Validation: <medical:batch / simulate / audit status, with the actual gate lines pasted,
             not "all green">
Traceable-to-question: <share of records that trace to a banked question, e.g. "91/91">
Drift to rule on: <anything the chief of staff needs to decide>
Blockers: <what is stuck and on what>
Next: <what happens without further instruction>
```

Numbers come from a script's own output, never an estimate. **"All gates clean" without
the pasted gate lines is not a green report** — the lines go in the commit body or in
`coverage/<module>-GATES.md`, and the report quotes or points at them. A drift audit exists
precisely because self-reported "clean" has been wrong before (§6).

**When a lane is stuck, it ends its turn with a `BLOCKED` section**, not a partial report
padded to look finished:

```
BLOCKED
What: <the specific thing that cannot proceed>
Why: <the missing input, ID, ruling, or resource>
Tried: <what was checked before concluding it is actually blocked>
Needs: <chief of staff ruling, or escalation to Omar, named explicitly>
```

A lane that goes quiet without a `BLOCKED` section is indistinguishable from a lane that
forgot to report — treat both as a reason to check in, not as "still working".

---

## 4 · The staged pipeline (S0–S8)

Content does not become "done" by being written; it becomes done by clearing nine stages
in order. Each stage has an input, an output folder, a gate, a sign-off, and a line in the
module's coverage ledger.

| Stage | What happens | Output | Gate (npm script) | Sign-off |
|---|---|---|---|---|
| **S0 Intake** | Build the source manifest: sha256, `textLayer`, name-twins (`nameTwinOf` / `twinPreferred`), tier, sitting year by exam type, module | `manifest/` | manifest validates; twins resolved; tier ≤5 | Orchestrator |
| **S1 Triage** | Read every printed question, recover keys, assign each question the concept it tests, search live + every `docs/*-Source-Imports` + `docs/import-ready` for that concept → live / pending / new | the triage table (§5) | the triage checkpoint itself | Chief of staff — **"TRIAGE APPROVED"** |
| **S2 Build** | Author concepts (definition, `explicit_objective`, `canonical_key`, `exam_signal`, `evidence_gaps`) → articles covering every tested concept → questions (MCQ / written / practical) | `concept/`, `article/`, `question/`, `written/`, `practical/` | `medical:batch`, `medical:concept-ids`, `medical:presence` | Subagent, gate lines in the commit body |
| **S3 Tag & place** | Taxonomy placement (canonical node, subject ∈ the 20, module id with university prefix for non-Kasr, `module_subject`, microtopic), non-empty `universities`, years, blueprint weights, difficulty, cognitive fields, `exam_weight_by_year` | same files, in place | the catalogue check inside `medical:batch` (`57ef0d4`); placement resolves; no blank required tag | Subagent |
| **S4 Relate** | Typed concept relations with evidence (03); article ↔ concept links both directions (`article.related_concepts` and `concept.article_ids`) | `relations/` | relations batch validates; every question's main concept is covered by an article in its `library_ids` | Subagent |
| **S5 Evidence** | Claims, citations, spans from the department book; every article sentence traceable | `evidence/` | `medical:citations`; `atomicClaimIds-missing = 0` | Subagent |
| **S6 Media** | Every record needing an image/diagram/audio carries `media_recommendations` (what, where, why); practical/imaging/OSCE items with no media are marked, never rewritten as prose | `media-requests/` | media ledger per module lists every open request | Subagent |
| **S7 Completeness** | `fieldsUsed` at or above the manual's floor for every type; `explanation_<correct>` ≥3 sentences (mechanism + takeaway), each distractor explained; duplicate-key and label-twin scan clean; no two records for one idea; glossary deduped | same files | `medical:audit` delta zero; `medical:duplicate-keys` zero; per-import-folder `INDEX.md` (import order, "Update matching items" flags, expected created/updated, assumed-live ids) | Orchestrator consolidates, chief of staff spot-checks |
| **S8 Hand-over** | Full-sequence `medical:simulate` in the exact import order Omar will click; per-module `INDEX`; `GATES.md`; Omar imports; status flipped to Published by a named reviewer/publisher | — | full-sequence simulate, zero errors | Omar |

**The rule that matters most here:** a lane may run S2 for a module before touching S3–S7
— building concepts and articles ahead of tagging them is normal, not a shortcut — but
**nothing is "done" until S7 passes**, and a module's `INDEX` is written **only at S8**,
never earlier. Writing an `INDEX.md` at S3 because the folder "looks ready" produces a
document that lies about import order the moment S4 or S5 adds a file. The coverage ledger
(`coverage/<module>-coverage.md`) is what tracks a record's real stage in the meantime —
read it before assuming anything is further along than S2.

Three cross-cutting rules apply at every stage, not just their nominal one:

- **The explanation bar.** `explanation_<correct>` is the whole worked explanation — at
  least three sentences (why right, mechanism, takeaway) — and every distractor gets its
  own explanation too. This is imposed from the first question a lane writes, not patched
  in at S7; retrofitting it onto hundreds of already-written questions is exactly the
  enrichment pass Kasr Y1 had to schedule for 101 ISK.
- **The media-marking rule.** A practical, imaging or OSCE item that needs an image but
  does not have one is marked with a `media_recommendations` request (00 §6) and left that
  way. It is never rewritten as prose that pretends the image is unnecessary, and it is
  never shipped with an invented URL.
- **Redundancy gates.** `medical:duplicate-keys` (exact key collisions) and the
  find-existing search (00 §4, label collisions caught by hand) both have to be clean
  before S7 signs off. A batch that passes `medical:batch` and `medical:audit` can still
  carry a duplicate concept neither gate is built to catch — that is what the drift audit
  in §6 exists for.

---

## 5 · The triage checkpoint

Before any lane mints a single new concept ID, the orchestrator sends the chief of staff
**one table**, and mints nothing until the reply is the literal phrase **"TRIAGE
APPROVED"**. The table:

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| AU-MED-103 | 612 | 598 | 141 | 22 | 63 | 56 | listed per subject, or "TBD — see field_notes" |

- **Questions triaged** — every printed question in scope, read, whether or not its key
  survived.
- **Keys recovered** — how many of those actually resolved to a correct answer (a garbled
  or unavailable key is triaged but not keyed — see the Kasr PDF extraction hazard in §10).
- **Distinct concepts tested** — after collapsing near-duplicate questions onto one
  concept, not a raw question count.
- **Live / pending / new** — live means a `find-existing` hit in production; pending means
  a hit in another lane's unimported batch; new means no hit anywhere and this lane will
  mint it.
- **Placement for new** — where each new concept will sit in the taxonomy, named before
  minting, not discovered afterward.

The orchestrator **consolidates** its subagents' triage into this one table — the chief of
staff does not want thirteen separate department-lane tables for one module, it wants one
merged view it can approve in a single reply. Alexandria's Year 1 wave is the worked
example: thirteen `(module, department)` lanes triaged separately, and the orchestrator
rolled them into one table (~3,188 questions, ~877 concepts: 63 live / ~355 pending / ~301
new) before the chief of staff approved it as a single unit.

---

## 6 · Drift audit

Lane self-reports are not taken as ground truth. The chief of staff periodically dispatches
an **independent, read-only Sonnet subagent** — one with no stake in the lane's own
narrative — to check a lane's output against what it claimed. This is not distrust of any
particular lane; it is because a lane's own gates (`medical:batch`, `medical:simulate`,
`medical:audit`) can all pass green on a batch that is still off-goal, and nothing in the
authoring loop itself catches that.

**What a drift auditor checks:**

- `exam_signal` filled on every new concept — a concept minted without one has no evidence
  it came from an actual question.
- Concept → question linkage — does the concept actually get tested by a banked question,
  or was it minted because a chapter exists, with no question behind it?
- Dangling IDs — a relation, citation, or `related_concepts` entry pointing at an ID that
  is not live and not in the same batch.
- Explanation length distribution — a batch of `explanation_<correct>` fields that are all
  one sentence passes every automated gate and still fails the actual bar.
- Gate artefacts — do the pasted gate lines in the commit body match what an independent
  rerun of the same command produces?

**Worked example from today (2026-08-22).** The Kasr Y1 Wave A drift audit found that the
102 and 103 concept/article commits were clean on every automated gate — ids resolved,
scope was in bounds — but **0 of 91** newly minted concepts were tied to a banked question.
The lane had built chapter coverage (every topic in the department book) rather than
question-led coverage (only what a paper actually asks), which is a real ordering choice
(00 §4's priority list puts banked-question concepts first) but had not been reported as
such. The lane was ordered to report blocked-MCQ counts per module going forward and to
mint MCQ-unblocking concepts first. By contrast, the same audit on 104 CPS found the
opposite pattern and did not flag it: coverage there was demand-driven from the start
(271/335 authorable MCQs chapter-covered, 0 demand chapters uncovered), so a chapter-first
build was the right call for that module and the audit said so.

The lesson embedded in that example: **the same finding ("this concept has no question
behind it yet") is a defect in one module and a non-issue in another**, depending on
whether the lane declared it was doing question-led or chapter-led coverage in the first
place. An auditor's job is to check the claim against the evidence, not to apply one rule
to every lane.

---

## 7 · Queues and shared resources

**Telegram / browser is one queue, one lane at a time, held by the chief of staff.** Every
lane that needs to fetch a source through the Telegram Web session in Omar's Chrome queues
through the chief of staff rather than opening it itself. The chief of staff announces
"browser is yours" to the lane at the head of the queue and expects "browser free" back
when that lane is done — a lane that finishes its fetch and stays silent is holding the
queue for everyone behind it. Rules carried into every fetch turn (source: brief §D):

- Listed channel links and the search box only.
- Open a channel to identify it; **never click Join** on an invite link — log it as
  "needs Omar to join" and move on.
- **Never open `t.me/addlist/`** folder links.
- No video, no audio.
- sha256 dedupe against the manifest already on file.
- Tier ≤5 only.
- **Another university's papers are never this university's signal** — a multi-university
  fallback channel may supply a department book by its actual syllabus name, never another
  university's exam papers or MCQ bank passed off as this one's.

**Subagents are not unlimited.** Today's board recorded a session limit being hit more than
once — a Kasr Y2–5 fetch agent killed mid-run, a Wave A drift audit that died on its first
attempt, seven Kasr Y1 subagents needing to resume after hitting the same wall. An
orchestrator dispatching a wide fan-out of subagents should expect this and plan for
resumability (checkpoint commits, §8), not assume every subagent it launches runs to
completion in one pass.

**One lane per `(module, department)`, with explicit file ownership.** This is the same
`CLAIMS.md` discipline from 00 §9, scaled up: an orchestrator does not let two subagents
hold overlapping scope, and it records each subagent's claim — output file, dependencies —
before dispatching. `103 BMS`, with four departments and four department books, is why this
matters at the orchestrator level and not just the subagent level: one concept file with
four departments writing to it at once is the exact collision `CLAIMS.md` exists to
prevent, so 103 BMS splits one file per `(subject, kind)` instead.

---

## 8 · Pause / resume

When Omar reprioritises — as happened today, pausing every lane except Kasr Year 1 and
Alexandria Year 1 — a paused lane does not vanish mid-file. It **checkpoints**:

1. Commit whatever is finished on the lane's own branch. **Do not push.**
2. Send a **PAUSE REPORT** with one of three states per piece of work:
   - **committed** — finished, gated, and sitting in a checkpoint commit.
   - **checkpointed-unfinished** — partial work committed so nothing is lost, but it did
     not clear its stage's gate and is not ready to resume from blindly.
   - **resume-first** — the very next action on RESUME, named explicitly, so the lane does
     not have to re-derive where it stopped.
3. Hold. Do nothing further until the chief of staff sends the literal word **"RESUME"**.

A retrofit to the shared toolchain follows a stricter rule: **it does not land on `main`
while a publishing lane depends on a stable tree.** Kasr Years 2–5's toolchain retrofit
checkpointed on its own branch rather than merging, specifically because Kasr Year 1 was
mid-publish and could not absorb a toolchain change underneath it without re-running every
gate it had already passed. A retrofit is only safe to land once nothing downstream is
actively depending on the tree not moving.

---

## 9 · Branch and landing discipline

- **Lanes work on their own branch.** An orchestrator's checkpoint commits, and its
  subagents' work, land there — never on `main` directly.
- **The validator / shared-tooling lane is the only lane that lands on `main`.** Gate
  fixes, importer fixes, and shared toolchain retrofits go through it.
- **Merge `origin/main` before every gate run.** Several sessions push to `main`
  concurrently; a gate run against a stale base can report clean on a check that already
  changed upstream. Re-fetch and merge before trusting a gate result, not after.
- **Hand edits to a generated batch are lost on rebuild.** If a batch file is produced by
  a generator (`scripts/kasr/build-batches.ts` and friends), a hand edit to the generated
  `.md` file survives only until the next run regenerates it. Change the generator's seed
  input instead — the hand edit has to become something the generator itself would produce.

---

## 10 · Hazards register

One line each, with the date it actually bit, so nobody re-discovers these the hard way.

| Hazard | What happens | Bit on |
|---|---|---|
| `removeOrphans` / `--sweep` | Deletes any hand-authored written batch that the current generator run did not itself produce, because nothing in the filename distinguishes generated from hand-authored | Has destroyed work three separate times; most recently the `108 INT` `written/` file, twice |
| Hand edits to generated batches | Silently discarded on the next regeneration; the fix is always "make it generator input", never "re-apply the edit" | Ongoing — see §9 |
| Name-twin files are not byte-identical | A `"[… Updated]"` twin of a source often lost its text layer or otherwise diverged from the original; citing the twin instead of the copy actually read misattributes the source | Alexandria intake, 2026-08-22 (1,334 twin pairs share no hash; 1,424/2,163 disagree on `textLayer`) |
| Stale "live" fixture | `medical:simulate`'s live-state fixture is a build artefact of the extraction bundle, not a production snapshot, and was dated 2026-08-12 when discovered | Alexandria validator probe, 2026-08-22 |
| Stub-create on a non-live update row | An update row naming an ID that is not actually live used to create a silent stub instead of erroring | Fixed 2026-08-22, `470fdde` |
| `+A \| +B` on one cell | Every `+item` after the first was stored with its literal `+`, in **both** forms — pipe-joined on one line and one-per-line — so "write one `+` per line" was never a working workaround, only an unverified guess | Kasr Y1, 2026-08-22; fixed at the parser, `312777b`. A stored value never begins with `+` now; a mixed cell like `X \| +Y` is refused outright as ambiguous |
| Module ids are bare strings | No university namespace on a module id, and an empty `universities` field means "visible to every university" rather than "visible to none" — the opposite of what it looks like | Caught before it shipped, 2026-08-22; enforced by the catalogue check |
| Empty `universities` field | Same root cause as above — a record with no `universities` value is not scoped to nobody, it is scoped to everybody | Same, `57ef0d4` |
| Concept-resolution error had no hint | `medical:batch` always errored on a `main_concept` / `concept_ids` / `contextual_concept_ids` entry that resolved against nothing — it never silently skipped it — but the message ("… is not a concept that exists") sent an author hunting for an ID typo when the real cause is almost always the concept batch not being named with `--with` | Message fixed 2026-08-22, `daf0d4d` — every resolution failure now ends "if it is authored in this batch set, name its concept file with `--with`" |
| `source_candidate_ids` restated on an update row | The candidate check resolves against the extraction corpus's candidate index, not against live state — restating an ID that is only live (not in that corpus index) fails as "not a concept candidate the corpus contains", even though the id is real | `scripts/validate-content-batch.mjs:1014`; omit `source_candidate_ids` on an update unless you are adding a candidate the corpus index actually has |
| CI ran Kasr-only paths | The content gates in CI were scoped to `docs/Kasr-Source-Imports/**` only, so every other university's batches were landing with zero CI coverage | Fixed 2026-08-22, `9dba8ca` (widened to `docs/*-Source-Imports/**`) |
| `+` on a non-ID-list column | `+` only appends on a field parsed through `listDirective`/`splitList` (`src/data/importSemantics.ts`). `module_subject` is a path list, parsed separately and never stripped of a leading `+`, so `+101 ISK > Anatomy` stores the literal plus instead of appending. Any field this manual doesn't call an ID list needs a full replacement, not a `+` cell | Ain Shams toolchain lane, 2026-08-22, against the real validator. `medical:batch` now refuses it (`d82dd36`) |
| Update row missing its kind's discriminator | Kind is detected once per file from its first row's columns (`detectBatchKind`, `src/data/batchKind.ts`) — a concept needs `## label` or `## canonical_key`, every other kind its own title/question/type field. `medical:batch` has always refused a row missing it outright (exit 1, `label is required`, alongside the `470fdde` stub-create error); it was `medical:simulate` that stayed silent — it listed such a file under `skipped` and exited 0, so a sparse `## id` + `+universities` row never applied and never showed as an error | Ain Shams toolchain lane, 2026-08-22, against the real validator. Fixed `d82dd36`: `medical:simulate` now errors on any file carrying `## id` rows it cannot type, naming the ids and the discriminator; a file with no ids at all still just shows a skip |
| Temporal-dead-zone traps in the validator/simulate scripts | A `const` referenced before its declaration inside a loop hoist; the fix is to declare shared accumulators above the file loop, not inside it | Hit three times, 2026-08-22 |

---

## 11 · Templates

### LANE-BRIEF skeleton

An orchestrator holds one of these for its lane and keeps it current. No live example
ships in this worktree — every lane's `LANE-BRIEF.md` lives on that lane's own branch — so
treat the shape below as the contract, not a file to go copy.

```markdown
# LANE-BRIEF — <University> Year <N>

## Identity
Session: <address>
Reports to: chief of staff, only
University code / Year overlay: <e.g. kau / KAU_Y1>
Modules in scope: <list, with module ids as they will actually be written>

## Roots
Import root: docs/<University>-Source-Imports/
Subfolders: manifest/ coverage/ concept/ article/ question/ written/ practical/
            evidence/ relations/ glossary/ pending-live/
Shared toolchain: scripts/<uni>/ (copied from scripts/kasr/, never edits Kasr's files)

## Rules
- Priority order (00 §A): papers+keys > department files > notes/academy (tier ≤5) >
  textbooks (cited).
- Search before mint (00 §4). Sparse update on a live or pending hit, never a full record.
- Triage checkpoint before minting (§5 of this file) — wait for "TRIAGE APPROVED".
- One lane per (module, department); CLAIMS.md rows before writing.
- Report format §3 of this file, ≤20 lines, end of turn.

## Hazards specific to this lane
<name-twin behaviour, missing Telegram source, curriculum-move modules, whatever this
lane has already found that the next reader should not rediscover>

## Report template
<paste the §3 block, filled with this lane's own last values, so the orchestrator's own
subagents have a copy-pasteable example>
```

### PUBLISH PLAN skeleton

Written once a lane's modules are close enough to S7 that "how much is left" is a real
question, not a hope.

```markdown
# <University> Year <N> PUBLISH PLAN (HEAD <hash>, <date>)

| Module | Done | Remaining (owner) | ETA |
|---|---|---|---|
| <module id> | <stages cleared, with a concrete number — "coverage 258/258 under the
  union rule"> | <what's left, stage by stage, and which subagent/lane owns each> | <hours,
  not "soon"> |

## Ordered import checklist
1. <folder> — <what depends on it being imported first, and why>
2. <folder> — …
   (mirrors the pipeline's import order: resource → article → concept → claim →
   citation → span → relation → practical → question, per module)

## Needs Omar
- <anything only Omar can decide or supply before this module can reach S8 — a reviewer
  name, a missing source, a catalogue gap, a subject placement ruling>
```

Both skeletons stay short on purpose. A LANE-BRIEF or PUBLISH PLAN that grows past what an
orchestrator can re-read in one pass stops being a brief.
