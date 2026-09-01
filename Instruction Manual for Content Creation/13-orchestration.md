# 13 · Orchestration

**You must have read [00-START-HERE.md](00-START-HERE.md).** Everything there — the file
format, ID rules, search-before-create, the validation gates — still applies to you. This
file adds the layer on top: how lanes are run, who reports to whom, and what a report has
to contain before it counts.

This file is for anyone acting as **the orchestrator**, and for any **authoring subagent**
that wants to know what its report is judged against before it ends its turn. If you are
only writing concepts, articles or questions for a single module, read §2 for your row and
§3 for the report format, then go write. The rest is for the session coordinating you.

> **Current model.** One orchestrator session runs every lane and dispatches Sonnet
> subagents directly — there is no separate per-university-year orchestrator layer between
> it and the subagents. Earlier revisions of this manual described a "chief of staff"
> session sitting above per-lane "orchestrator" sessions; that intermediate layer is
> **retired**. Where this file or others still say "chief of staff" or "lane orchestrator",
> read it as the one orchestrator described in §1–§2 below. The retirement is a standing
> fact (2026-08-27), not a one-time event — do not re-spin up a per-lane orchestrator layer
> without a new ruling from Omar.

---

## 1 · The shape of the operation

One human — Omar — owns the product and does every import decision by hand. Everyone else
is a Claude session. Sessions do not talk to each other directly; they talk to **the
orchestrator**, one session that holds the whole picture across every university and year.
The orchestrator dispatches **authoring subagents** directly, one per `(module,
cluster/department)` task, against a shared toolchain the orchestrator itself maintains
(there is no separate validator/shared-tooling lane in the current model — see §2). Content
moves through nine stages (§4) before it is "done". Most imports still wait for Omar's
review, but the orchestrator itself now drives the mechanical step of the live-database
import as a named, sanctioned exception (see the callout in §2) — Omar still approves before
that import runs and makes every catalogue-level decision.

---

## 2 · Roles

| Role | Owns | Never does | Reports to |
|---|---|---|---|
| **Omar** (owner) | Product decisions; supplies tokens, sources, and Telegram/channel links; catalogue changes (new subjects, new modules); approves the live-import step; content rulings are delegated to the orchestrator's best judgment | Does not author, validate, or run gates himself | — receives escalations |
| **Orchestrator** (one session, all lanes) | The single address Omar messages; holds the whole picture; dispatches Sonnet subagents directly (no intermediate per-lane orchestrator — that layer is retired); maintains `docs/chief-of-staff/BOARD.md` and `HANDOFF.md`; broadcasts toolchain facts; decides the rulings Omar has delegated; closes stale PRs; decides what needs Omar; **drives the live-database import** as the one sanctioned exception where it does hands-on work (see the callout below) | Never hand-authors content otherwise — it delegates; never lets two subagents message each other; never invents a ruling only Omar should make | Omar |
| **Authoring subagent** (Sonnet, one per `(module, cluster/department)` task) | A fresh agent per task, dispatched off a named branch/origin — **never resumed** (a resumed agent context-bloats and tends to die on load; the orchestrator starts a new agent off the branch instead); runs in its own isolated git worktree; reads 00 + the relevant type manual; authors and gates its own output (`medical:batch` / `medical:simulate` / `medical:audit`); commits fast (first commit under ~4 minutes, ~10–15 records per commit after that); pushes gate-clean work — authoring lanes push to their **own branch** (so HEADs stay visible); staging, backlog, doc, and other import-ready-mutating work pushes straight to **`main`** (Omar's standing order, 2026-08-27 — supersedes any earlier rule that only a validator lane pushes to main) | Never messages another subagent — routes through the orchestrator; never runs `removeOrphans` / `--sweep`; never invents an ID (00 §3); never runs an import itself | The orchestrator |

**The live-database import — the one exception to "orchestrator never authors/never
imports".** The orchestrator drives `scripts/apply-content-import-to-db.mjs` by hand once
Omar has approved a batch and opened the DB tunnel — this is the sole sanctioned case where
the orchestrator does the hands-on work instead of delegating it. See [[live-db-import]] /
`docs/chief-of-staff/HANDOFF.md` for the mechanics: the synapsedb tunnel is
`10.0.1.11:3306` (not the stale `8823` some earlier notes reference), and it is flaky enough
under a long-running write that the working technique is to run the dry-run once — it emits
a full post-import state via the same simulate path — and then flush that emitted result
straight to prod in a background transaction, rather than holding one live connection open
through the whole `--commit`. **The version-baseline desync that used to need a separate
repair pass is fixed at the source now**: `scripts/apply-content-import-to-db.mjs` inserts
each `app_state_versions` row with the value it is WRITING to `app_state`, in the same
transaction (its own comment at ~lines 126–134 documents the fix) — so the newest version
row already matches `app_state` the moment `--commit` returns, instead of trailing it by one
generation. Verified 2026-08-28 against a real production import: every key's newest version
row matched `app_state`. A post-import sanity check (newest `app_state_versions` row per key
== `app_state`) is still worth doing, but the separate
`scripts/repair-content-version-baseline.mjs --commit` run is no longer required (see 00 /
hazards register, now marked resolved).

A few rules apply across the operation:

- **Every import still needs Omar's decision to proceed** — the orchestrator drives the
  mechanical `--commit` step above only after Omar has approved that specific batch and
  opened the tunnel. A file is finished when it validates clean, not when it is live, and
  "the orchestrator can run the script" does not mean "the orchestrator decides what ships."
- **Nobody runs `removeOrphans` or `--sweep`** (`scripts/kasr/build-batches.ts`) outside a
  deliberate, reviewed retrofit. It deletes written batches the current run did not
  generate, and it has already destroyed hand-authored work three separate times in this
  repo (see §10).
- **The orchestrator never hand-authors content.** If it finds itself writing a
  `## definition` field for a module, it has slipped into being a subagent and should hand
  the file to one — the live-import exception above is the only carve-out, and it is a
  mechanical script run, not content authoring.

---

## 3 · Chain of command and message discipline

**Subagents report to the orchestrator, and only the orchestrator.** A subagent does not
message another subagent, even when their work obviously touches ("104 CPS needs 102's
physiology question" is a real example — it was routed through a `CLAIMS.md` **Wanted**
row, not sent lane-to-lane). The orchestrator is the router: it holds every lane's picture
at once and can catch a collision no single subagent can see.

**Toolchain facts and rulings are broadcast by the orchestrator, baked into the next
dispatch prompt** — not discovered by one subagent reading another's branch. When a fix
lands (`fa72ec4` for the cross-university concept-id check, `57ef0d4` for the catalogue
check, `312777b` for the `+A | +B` fix are past examples) or a standing rule is issued (the
law-of-voice rule below is a current one), the orchestrator carries it into every dispatch
prompt going forward. A subagent that hears about a fix or rule secondhand, from another
subagent's report rather than from its own dispatch prompt, should treat it as a rumour
until confirmed.

**The law of voice (standing rule, Omar 2026-08-28).** Student-facing text — question
stems, options, explanations, article prose, concept `definition` / `explicit_objective` /
`pitfalls`, glossary entries — states the medicine directly. It never says "the department
book says", "according to the textbook", "the book's table gives", or anything else that
names the source instead of teaching the fact. Provenance belongs only in `field_notes` and
citations. This has to be baked into every authoring dispatch prompt; it is not something a
subagent will infer on its own, and a real backlog of existing content still violates it
(see §10).

**A subagent that grows a large context checkpoints and hands off instead of resuming.** If
a dispatched subagent's work is going to run long, it commits what is finished, writes a
`PROGRESS.md` in its worktree, and ends its turn with one line in this exact shape:

```
HANDOFF: <branch>@<sha> · resume-first: <the very next action, named explicitly>
```

The orchestrator then dispatches a **fresh** agent off that branch — it does not resume the
agent that wrote the handoff line. A resumed agent tends to context-bloat and die on load;
starting clean off the named commit is the only combination that has actually worked.

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
Drift to rule on: <anything the orchestrator needs to decide>
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
Needs: <orchestrator ruling, or escalation to Omar, named explicitly>
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
| **S1b Extraction cache** | One `pagetext.mjs` pass per source PDF (extract once, sha256-keyed, cached outside the repo); commit `coverage/<lane>-readability-index.md` from `node scripts/content/pagetext.mjs index <dir> --out <file>` | `coverage/<lane>-readability-index.md` | index committed; garbled pages named | Orchestrator |
| **S1 Triage** | Read every printed question via cached text (`pagetext.mjs show`/`status`, never re-extract), recover keys, assign each question the concept it tests, search live + every `docs/*-Source-Imports` + `docs/import-ready` for that concept → live / pending / new | the triage table (§5) | the triage checkpoint itself | Orchestrator — **"TRIAGE APPROVED"** |
| **S2 Build** | Author concepts (definition, `explicit_objective`, `canonical_key`, `exam_signal`, `evidence_gaps`) → articles covering every tested concept → questions (MCQ / written / practical) | `concept/`, `article/`, `question/`, `written/`, `practical/` | `medical:batch`, `medical:concept-ids`, `medical:presence` | Subagent, gate lines in the commit body |
| **S3 Tag & place** | Taxonomy placement (canonical node, subject ∈ the 20, module id with university prefix for non-Kasr, `module_subject`, microtopic), non-empty `universities`, years, blueprint weights, difficulty, cognitive fields, `exam_weight_by_year`. **Per-university completeness**: every university named in `universities` also has its own year id(s), module id(s), `module_subject` path and `exam_weight_by_year` key — see 00 §3, "Per-university traceability" | same files, in place | the catalogue check inside `medical:batch` (`57ef0d4`); placement resolves; no blank required tag; consistency check across `universities` ↔ `years` ↔ `module` ↔ `exam_weight_by_year` keys is in progress as of 2026-08-23, not yet enforced | Subagent |
| **S4 Relate** | Typed concept relations with evidence (03); article ↔ concept links both directions (`article.related_concepts` and `concept.article_ids`) | `relations/` | relations batch validates; every question's main concept is covered by an article in its `library_ids` | Subagent |
| **S5 Evidence** | Claims, citations, spans from the department book; every article sentence traceable | `evidence/` | `medical:citations`; `atomicClaimIds-missing = 0` | Subagent |
| **S6 Media** | Every record needing an image/diagram/audio carries `media_recommendations` (what, where, why); practical/imaging/OSCE items with no media are marked, never rewritten as prose | `media-requests/` | media ledger per module lists every open request | Subagent |
| **S7 Completeness** | `fieldsUsed` at or above the manual's floor for every type; `explanation_<correct>` ≥3 sentences (mechanism + takeaway), each distractor explained; duplicate-key and label-twin scan clean; no two records for one idea; glossary deduped | same files | `medical:audit` delta zero; `medical:duplicate-keys` zero; per-import-folder `INDEX.md` (import order, "Update matching items" flags, expected created/updated, assumed-live ids) | Orchestrator consolidates subagents' reports and spot-checks |
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
- **Two-sided coverage, not one.** S4's "article ↔ concept links both directions" and S7's
  completeness sign-off both mean it literally: a tested concept is covered only when an
  article names it in `related_concepts` **and** that article actually teaches it. A
  concept's `article_ids` written by `scripts/kasr/build-article-links.ts`'s term-overlap
  heuristic is not coverage by itself — it is a lead. The coverage-verification pass (script
  the concept-side-only list per module, read each linked article, add the back-link or fix
  the article) has to run before a module's `INDEX` at S8, not be assumed from a clean
  `medical:batch`.

---

## 5 · The triage checkpoint

Before any subagent mints a single new concept ID for a module, its triage rolls up into
**one table** the orchestrator reviews, and nothing gets minted until the orchestrator
replies with the literal phrase **"TRIAGE APPROVED"**. The table:

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

The orchestrator **consolidates** subagents' triage into this one table — it does not want
thirteen separate department-lane tables for one module, it wants one merged view it can
approve in a single reply. Alexandria's Year 1 wave is the worked example (from when this
still ran through a per-lane orchestrator layer, since retired — the consolidation habit is
the part that carried forward): thirteen `(module, department)` lanes triaged separately and
were rolled into one table (~3,188 questions, ~877 concepts: 63 live / ~355 pending / ~301
new) before it was approved as a single unit.

---

## 6 · Drift audit

Subagent self-reports are not taken as ground truth. The orchestrator periodically
dispatches an **independent, read-only Sonnet subagent** — one with no stake in the
authoring subagent's own narrative — to check a lane's output against what it claimed. This
is not distrust of any particular lane; it is because a lane's own gates (`medical:batch`,
`medical:simulate`, `medical:audit`) can all pass green on a batch that is still off-goal,
and nothing in the authoring loop itself catches that.

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

**Telegram fetching is retired (Omar, 2026-08-27, all sessions current and upcoming).** The
Telegram/browser queue described below was real practice through 2026-08-22–23 and the
rules are kept here because a lane's existing intake and the hazards it hit still matter,
but **no session — orchestrator or subagent — opens the Telegram Web session or fetches a
new source through it any more.** A gap that would previously have gone on the fetch list
is instead logged as **"needs Omar sources"** and left for Omar to supply directly. Do not
revive the fetch queue without a new instruction from Omar.

Historical shape of the queue, for context and for the hazards it surfaced (do not act on
this as a live process):

- One queue, one lane at a time, held by the chief-of-staff-equivalent session. A lane that
  needed a source queued through it rather than opening the browser itself, and announced
  "browser free" back when done — a lane that finished its fetch and stayed silent held the
  queue for everyone behind it.
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

**Subagents are not unlimited — this is now a named platform hazard, not an occasional
surprise.** Two separate failure modes kill dispatched subagents in waves: a 600-second
no-output watchdog that kills a silent agent outright, and an intermittently flaky
connection that can stall an agent pre-commit for 30–120 minutes at a time. When the
connection is healthy, a single lane can run a full pass end to end; when it is bad, agents
die before their first commit, in waves, regardless of task. The mitigations that have
actually worked, in order of importance:

- **Fresh agent per lane, never resumed** — a resumed agent tends to context-bloat and die
  on load; dispatch a new agent off the last good branch/commit instead (see the `HANDOFF:`
  line in §3).
- **Commit fast, in small batches** — first commit under ~4 minutes, roughly 10–15 records
  per commit after that, so a mid-run death loses minutes of work, not hours.
- **Background any command that might run past ~90 seconds and poll it**, rather than
  blocking a turn on it and risking the watchdog firing on legitimate work.
- **Cap concurrency around 4–6 at a time** — a healthy connection window can sustain more; a
  bad window means pausing dispatch entirely and re-probing with a single lane every
  20–30 minutes rather than continuing to churn.
- **No fan-out.** A dispatched subagent that itself spawns sub-agents is how a whole wave
  dies at once — every subagent works alone, reporting only to the orchestrator.
- **Verify progress by reading branch HEADs (`git log`), never by trusting that a resume did
  anything.** A resumed or orphaned agent's own claim about what it finished is not
  evidence; the commit on the branch is.

**One lane per `(module, department)`, with explicit file ownership.** This is the same
`CLAIMS.md` discipline from 00 §9, scaled up: the orchestrator does not let two subagents
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
3. Hold. Do nothing further until the orchestrator sends the literal word **"RESUME"**.

A retrofit to the shared toolchain follows a stricter rule: **it does not land on `main`
while a publishing lane depends on a stable tree.** Kasr Years 2–5's toolchain retrofit
checkpointed on its own branch rather than merging, specifically because Kasr Year 1 was
mid-publish and could not absorb a toolchain change underneath it without re-running every
gate it had already passed. A retrofit is only safe to land once nothing downstream is
actively depending on the tree not moving.

---

## 9 · Branch and landing discipline

- **Authoring subagents work on their own named branch, off fresh `origin/main`.** A
  module/cluster's in-progress authoring — before it is staged into
  `docs/import-ready/` — lands there, not on `main` directly, so its branch HEAD stays the
  place to verify real progress (§7).
- **Gate-clean staging, backlog, doc, and other `import-ready`-mutating work pushes straight
  to `main`, by the subagent itself.** This is Omar's standing order (2026-08-27): it
  supersedes any earlier rule in this manual that only a dedicated validator lane pushes to
  `main`. There is no separate validator/shared-tooling lane in the current model — a
  subagent that touches the shared toolchain gates its own change the same way it gates its
  own content, and pushes once clean.
- **Merge `origin/main` before every gate run, and before every push.** Several subagents
  can be pushing to `main` concurrently; a gate run against a stale base can report clean on
  a check that already changed upstream, and a push onto a stale base can silently drop
  someone else's concurrent commit. Re-fetch and merge/rebase before trusting a gate result
  or pushing, not after.
- **Hand edits to a generated batch are lost on rebuild.** If a batch file is produced by
  a generator (`scripts/kasr/build-batches.ts` and friends), a hand edit to the generated
  `.md` file survives only until the next run regenerates it. Change the generator's seed
  input instead — the hand edit has to become something the generator itself would produce.
  A **whole-module regeneration cannot be run by two lanes at once** (they collide on the
  same output files), and a full regen of a module's MCQ batch has been observed to drop
  hand-applied question `resource_ids` tags that a later pass added on top of the generated
  file — after any regeneration, diff the id sets before and after (`comm -23` on a sorted
  id list works) to prove the run was additive-only before trusting it.
- **Image-only scanned banks are authored by render-and-read, not by trusting OCR.** A bank
  that exists only as scanned page images (no usable text layer) is rendered to page images
  (`pdftoppm` or equivalent) and read by eye, question by question — the same discipline as
  the Kasr PDF extraction traps in §10, where a present `textLayer` has still turned out to
  be undecodable or to hide the real answer key inside a highlight rather than in the text.

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
| Update row missing its kind's discriminator | Kind is detected once per file from its first row's columns (`detectBatchKind`, `src/data/batchKind.ts`) — a concept file is *typed* as a concept on `## label` or `## canonical_key`, either alone, but the row-level required-field check in `validate-content-batch.mjs` keys on `## label` specifically; `canonical_key` does not substitute. Every other kind needs its own title/question/type field. `medical:batch` has always refused a label-less row outright (exit 1, `label is required`, alongside the `470fdde` stub-create error); it was `medical:simulate` that stayed silent — it listed such a file under `skipped` and exited 0, so a sparse `## id` + `+universities` row never applied and never showed as an error | Ain Shams toolchain lane, 2026-08-22, against the real validator. Fixed `d82dd36`: `medical:simulate` now errors on any file carrying `## id` rows it cannot type, naming the ids and the discriminator; a file with no ids at all still just shows a skip |
| Concept update row with `## id` + `## canonical_key` but no `## label` | Refused as `label is required` (`d82dd36`) — `canonical_key` is enough to type the file as a concept batch, but not enough to satisfy the row's required-field check; 23 Alexandria pending-live rows hit it on 2026-08-22. Restate the Kasr label on every sparse row | Alexandria lane, 2026-08-22, against validator `d82dd36` |
| Temporal-dead-zone traps in the validator/simulate scripts | A `const` referenced before its declaration inside a loop hoist; the fix is to declare shared accumulators above the file loop, not inside it | Hit three times, 2026-08-22 |
| One-sided coverage from `build-article-links.ts` | `scripts/kasr/build-article-links.ts` writes heuristic `article_ids` onto generated concept rows by term overlap with article text; the validator's union rule then passes on the concept side alone, with no article actually naming the concept back or teaching it | Ruling 2026-08-23, verified in code 2026-08-22: 17 of 23 concepts checked had no article naming them and ≥2 links were wrong. Run the coverage-verification pass per module before its `INDEX` (§4) |
| Field order inside a `# Item` record | A record's `## field` blocks can appear in any order — some Kasr concept files put `## label` before `## id` — but the importer reads by key, not by position. A lane script that parses by position shifts every id by one record | Caught by Alexandria 2026-08-23, before minting. Parse by key, never by position |
| A shared record tagged for one university only | A record with `universities`, `module` and `module_subject` written for one university but missing the others is either invisible to those universities' own per-university filters (a module tag with no matching university/year id, `contentScope.ts:137-166`) or, if `universities` itself was left blank, visible to **everyone** instead of only the university that was actually authored (`itemScope`/`conceptInScope`, `contentControl.ts:651-666`, `blueprint.ts:84-92`) — the two opposite failures look identical until you check which field was empty | Ongoing risk on every multi-university shared record; see 00 §3, "Per-university traceability" |
| `years` column held three shapes | Production `years` held the canonical id (`KAU_Y1`, 539 rows), a lower-cased id (`kau_y3`, 114 rows), and the bare label (`Year 1`, 2,469 rows across 41 files) — a label names no university, so it can never be checked per university the way an id can | Ruled ids-only 2026-08-23; write the exact-case id from `buildYears` (`src/data/universities.ts:63-75`), never the label, never lower-case |
| PDF answer keys hide in highlights | A printed key is not reliably in the extracted text — it is often only visible as a highlighted/shaded option on the rendered page, and a PDF's `textLayer` can be *present* and still not decode to anything usable. Trusting "has a text layer" as "keys are recoverable by text extraction" overstates what is actually recoverable | Kasr PDF extraction, ongoing — recover keys by rendering pages to images and reading them, the same render-and-read discipline as image-only scanned banks (§9), not by trusting OCR/text-layer output alone |
| `medical:batch` passing is not the gate | A batch can be `medical:batch`-clean and still be import-broken — `medical:simulate` (does it actually apply, in the real import order, without silent skips or rejects) and `medical:audit` (does the result still meet the completeness/evidence bar) fail in different ways `medical:batch` cannot see. Treat all three as required, never just the first | Recurring — see the `medical:simulate` silent-skip hazard above and the drift audit's own rationale (§6) |
| Whole-module regeneration drops hand-applied tags | Regenerating an entire module's MCQ batch (`scripts/kasr/build-batches.ts` for that module) does not preserve `resource_ids` tags a later, separate pass had hand-applied on top of the generated file — the regen has no way to know about them and silently emits without them | Observed on a Kasr 104-CPS-style rebuild; verify with a before/after id-set diff (`comm -23`) and re-apply any tags the diff shows were lost, or fold the tagging step into generator input instead |
| Import batch "clear" vs. blank has two different meanings | Whether a blank cell means "leave the existing value alone" or "wipe the field" — and whether `[clear]` is even the right directive to force a wipe — depends on which kind of batch (concept/article/question/practical/etc.) is parsing the row; the same-looking cell is correct in one batch kind and silently wrong in another, and both wrong forms still pass every automated gate | Cross-university, recurring — check the specific kind's parser (`src/data/importSemantics.ts` and the per-kind batch builder) rather than assuming one convention holds everywhere |
| Live-DB import can silently un-publish everything it just imported *(RESOLVED 2026-08-28 — fixed at the source)* | The import script used to record the *pre-import* value in the newest `app_state_versions` row, desyncing the version baseline from what was actually written — content landed live but any publish click on it then reverted, because the baseline the publish flow trusts was stale | Hit during the 2026-08-27 live import. `scripts/apply-content-import-to-db.mjs` now writes the newest `app_state_versions` row with the same value it commits to `app_state`, in the same transaction (see the callout in §2), so the desync can no longer occur — the separate `repair-content-version-baseline.mjs --commit` pass is no longer a required step. A post-import sanity check (newest version == `app_state`) is still good practice |
| Law-of-voice backlog predates the rule | The law of voice (§3) — student-facing text states the medicine directly, never "the department book says" — was only imposed as a standing rule on 2026-08-28. On the day it was issued, roughly 2,857 existing student-facing lines already on `main` still violated it. It is a live authoring rule for everything written from here on, and a known, quantified, not-yet-scheduled cleanup debt for what was written before it, generated Kasr content included (fix the seed/extract input, then regenerate — never hand-edit the generated `.md`, per §9) | Identified 2026-08-28; cleanup pass not yet started as of this revision |
| `medical:simulate --with` silently drops files | `medical:simulate` has no `--with` flag; passing one anyway is parsed as the value of a `--something` token, silently dropping every file after it, still exits 0, still reports `errors: []` | Use `node scripts/content/gate.mjs simulate <files, positional, apply order>` (§0.5 in `00-START-HERE.md`) — it rejects a `--with` outright instead of silently dropping the file |
| Render-heavy lanes die at the 600 s watchdog | A subagent that renders every page to an image before reading it burns most of a dispatch's wall-clock budget on rendering alone, and a wave of such subagents gets killed mid-run when the watchdog fires | Cache text once per PDF (`pagetext.mjs`, S1b above) and render only pages `mark-garbled` has flagged — `render` itself refuses an unmarked page |
| Stale brief triggers a re-derivation expedition | A dispatch brief written from memory of "what's probably left" sends a subagent re-triaging or re-reading material that is already done, burning a dispatch on rediscovery instead of new work | Every dispatch carries a ledger delta (`node scripts/content/ledger.mjs <seed-dir> --triage <keys> --out coverage/<lane>-LEDGER.md`, §11 below) — the ledger, not the brief author's memory, is the source of what remains |
| Hand-edited generated batch destroyed by regen | Same failure as the `removeOrphans` and "hand edits to generated batches" hazards above, now with a seed-authored source: editing the `.md` `emit-mcq.mjs` produced looks safe until the seed is re-emitted (or the lane regenerates) and the hand edit vanishes with no warning | Seeds only — fix `scripts/content/emit-mcq.mjs`'s input JSON and re-run `content:emit`, never touch the emitted `.md` by hand |

---

## 11 · Templates

### DISPATCH skeleton (one cluster)

Since the token-discipline pass (00 §0.5, 2026-09-01), a subagent's context is a
LANE-CARD (`docs/<University>-Source-Imports/LANE-CARD.md`, ≤ 2 pages, Task 4 of the
content-pipeline refit) plus one of these — not the manual, and not a full LANE-BRIEF.
The orchestrator still keeps lane-level state for itself (folded into
`docs/chief-of-staff/BOARD.md` / `HANDOFF.md`, per §2); this is what it hands a subagent
per dispatch:

```markdown
### DISPATCH skeleton (one cluster)
- Read: `docs/<Uni>-Source-Imports/LANE-CARD.md` (only).
- Base: `<branch>@<sha>`. Worktree off it. `ln -s` node_modules from the main checkout.
- Scope: cluster `<name>` — ledger delta: authored <n>, held <n>, remaining <n> (keys: <list or path>).
- Sources: `<pdf path>` pages <a–b> via pagetext (already cached; garbled pages: <list>).
- Do: seed → emit → gate batch (--with <files>) → gate simulate (<files, apply order>) → ledger → commit+push every 5–10 q.
- Stop at: <n> questions or any wall. Report ≤ 20 lines, ends `HANDOFF: <branch>@<sha> · resume-first: <next>`.
```

**Standing law that still applies and is not restated on the card itself** (carried
forward from the retired LANE-BRIEF skeleton — the card's own §2 "ten rules" covers the
per-record ones; these are the dispatch-level ones):

- Priority order (00 §0, the law of priority): papers+keys > department files >
  notes/academy (tier ≤5) > textbooks (cited).
- Triage checkpoint before minting (§5 of this file) — wait for "TRIAGE APPROVED"; a
  cluster dispatch never mints a concept id the triage table did not already place.
- One lane per (module, department); `CLAIMS.md` rows before writing, so two dispatches
  never claim the same cluster.
- Report format ≤ 20 lines (§3 of this file), ending with the `HANDOFF:` line above.

### LANE-BRIEF skeleton (lane onboarding — one per session, not per dispatch)

The DISPATCH skeleton above is what a subagent receives for one cluster of work. This is
what still establishes a whole lane/session in the first place — university, roots,
modules in scope — before any dispatch is written against it. No live example ships in
this worktree; treat the shape below as the contract, not a file to go copy.

```markdown
# LANE-BRIEF — <University> Year <N>

## Identity
Session: <address>
Reports to: the orchestrator, only
University code / Year overlay: <e.g. kau / KAU_Y1>
Modules in scope: <list, with module ids as they will actually be written>

## Roots
Import root: docs/<University>-Source-Imports/
Subfolders: manifest/ coverage/ concept/ article/ question/ written/ practical/
            evidence/ relations/ glossary/ pending-live/
Shared toolchain: scripts/<uni>/ (copied from scripts/kasr/, never edits Kasr's files)
LANE-CARD: docs/<University>-Source-Imports/LANE-CARD.md (what every dispatch reads)

## Rules
See "Standing law" under the DISPATCH skeleton above, plus: search before mint (00 §4),
sparse update on a live or pending hit, never a full record.

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
