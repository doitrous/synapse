# 00 · Start here

The shared law. Every other manual in this folder assumes you have read this one.

You are authoring content for **Synapse**, a study platform for undergraduate medical
students in Egypt. You write **importer-format markdown batches**. You do not import
them, commit them, or push them. A human applies them by hand.

---

## 0 · Why you are here

**North star:** a student solves the question bank — MCQ, written, practical — and then
excels in their university exam. Every ruling below exists to serve that, and nothing
else.

### The law of priority

Source priority, highest first:

1. **Actual exam papers** of that university / year / module (EOM, EOY, resit/Baqoon,
   end-of-rotation), with their official keys or model answers.
2. **Department files** — department books, department question banks / MCQ books,
   practical atlases, official lecture files.
3. **Doctor notes, student notes, academy material** — tier ≤5 only, and never as the
   sole source of an answer.
4. **Standard textbooks** — only where the corpus has no department text for the
   point, and cited as such in `field_notes`.

**Scope is examinable.** Write what the module can examine — its own papers plus its own
department-book chapter — never wider. Inside a module, work in this order:

1. The concepts and articles that banked questions actually need.
2. The rest of the examinable chapter.
3. Nothing the module never sits.

**Sequence: articles before questions.** The validator refuses a question whose main
concept has no covering article — write or claim the article first, in the same batch.

**Answers come only from an official key or the department book**, page cited, never
reconciled by hand. A questionable printed key is recorded as printed, not silently
corrected. A garbled key is rendered by eye with the method recorded — or, failing that,
the question is left unkeyed and unauthored. An item that depends on an image becomes a
media request (§6), never a prose rewrite of what the image would have shown.

**Worked example.** A Kasr renal paper has a garbled MCQ key next to a clean
department-book chapter that never mentions the drug the question's stem names. You do
not average the two. You record the printed key as printed — or unkeyed, if it truly
cannot be read — and you write the article from the department book, not from the
question stem: a past paper is a source of *what was asked*, never of medical fact.

### The law of voice

Everything a student reads must sound like an authoritative, professional question bank —
not a study guide narrating its own sources. In every **student-facing** field — question
stems, options and explanations; article prose; concept `definition` / `explicit_objective`
/ `pitfalls`; glossary bodies — state the medicine **directly, on its own authority**. Never
refer to the study material itself: no "the department book says", "according to the
textbook", "the lecture notes state", "as per the source/handout", "the book's table gives",
"the department book's own worked example", or any variant. Source provenance is metadata —
it lives in `field_notes`, `evidence`, `citations` and `source_citation`, never in the
sentence a student sees.

This does not soften the answer rule above: answers still come only from a real key or the
department book, page-cited **in the metadata**. And a corrected or convention-flagged key is
stated about the **answer** — "the exam's printed key marks X, but Y is correct because…" —
never about the book. British spelling; exam-grade prose throughout. A batch whose
explanations lean on "the book says" is not finished, however clean `medical:batch` runs.

---

## Roles and the chain of command

- **Omar (owner).** The only human. Imports batches by hand via admin Bulk Import.
  Decides product questions. Supplies tokens, Telegram channel links, reviewers.
- **Chief of staff (one session).** The single channel every lane reports to — lanes
  never message each other. Issues standing orders, rulings, the browser queue,
  pause/resume. Audits lane self-reports with independent read-only subagents.
  Escalates to Omar only what genuinely needs him. Keeps `docs/chief-of-staff/BOARD.md`.
- **Orchestrator** (one session per university-year lane — Kasr Y1, Kasr Y2–5,
  Alexandria, Ain Shams, Helwan). Plans its lane, dispatches Sonnet subagents with
  explicit file ownership, holds a LANE-BRIEF, consolidates reports, runs the triage
  checkpoint. Never authors content itself. Commits checkpoints on its own branch, never
  pushes.
- **Validator / shared-tooling lane.** Owns the gates and the importer, serves the
  content lanes, lands on `main`, reports hashes to the chief of staff.
- **Subagent / authoring lane** — you, most of the time. Reads this file plus one type
  manual, writes batches, runs the gates, and reports in ≤20 lines: lane · produced ·
  validation · traceable-to-question share · drift to rule on · blockers · next. Ends its
  turn with a `BLOCKED` section when stuck, rather than guessing.

**Report discipline.** ≤20 lines. Numbers come from scripts, never estimates. **A claim
of green gates without pasted output is not green** — gate summary lines belong in the
commit body, or in `coverage/<module>-GATES.md`.

**The triage checkpoint.** Before any lane mints a single record, its orchestrator sends
the chief of staff one table — questions triaged · distinct concepts tested ·
live-hit / pending-hit / new — and waits for **TRIAGE APPROVED** before anyone writes.

The full operating procedure — LANE-BRIEF format, the browser queue, escalation paths —
is [13-orchestration.md](13-orchestration.md). This file covers what every lane needs;
that one covers how lanes are run.

---

## Content moves in stages

A record is **not finished** the moment `medical:batch` passes. It moves through nine
stages, each with its own gate, and the coverage ledger in each import root's
`coverage/` folder tracks where every record currently sits:

| Stage | What is produced | Gate |
|---|---|---|
| **S0 Intake** | Source manifest: sha256, textLayer, name-twins, tier, sitting year, module | Manifest validates; twins resolved; tier ≤5 |
| **S1 Triage** | Questions read, keys recovered, each assigned its tested concept; concept keys searched live + pending → live / pending / new | Triage checkpoint table; **TRIAGE APPROVED** |
| **S2 Build** | Concepts → articles (covering every tested concept) → questions | `medical:batch`, `concept-ids`, `presence`; gate lines in commit body |
| **S3 Tag & place** | Taxonomy placement, `universities` non-empty, years, weights, difficulty, `exam_weight_by_year` | Catalogue check; placement resolves; no blank required tags |
| **S4 Relate** | Typed concept relations with evidence; article ↔ concept links both directions | Relations batch validates; every question's concept covered by an article |
| **S5 Evidence** | Claims, citations, spans from the department book | `medical:citations`; `atomicClaimIds-missing = 0` |
| **S6 Media** | `media_recommendations` on every record that needs one | Media ledger lists every open request |
| **S7 Completeness** | `fieldsUsed` at floor; explanations ≥3 sentences; dup/label-twin scan clean | `medical:audit` delta zero; `duplicate-keys` zero; `INDEX.md` |
| **S8 Hand-over** | Full-sequence simulate in Omar's import order; `INDEX.md`; `GATES.md` | Omar imports; a named reviewer flips status to Published |

A lane may run S2 for a module before S3–S7 — that is normal, not a shortcut. But
**nothing is done until S7**, and a self-report that only cites `medical:batch` is
reporting S2, not completion. Full detail is
[13-orchestration.md](13-orchestration.md).

---

## The manuals

| File | Write this when you are creating or editing… |
|---|---|
| [01-subjects-and-topics.md](01-subjects-and-topics.md) | a subject, topic, subtopic, microtopic or nanotopic |
| [02-concepts.md](02-concepts.md) | a concept |
| [03-relationships.md](03-relationships.md) | a typed edge between two concepts, and its evidence |
| [04-library-articles.md](04-library-articles.md) | a library article |
| [05-questions.md](05-questions.md) | an MCQ |
| [06-osce-stations.md](06-osce-stations.md) | an OSCE station |
| [07-clinical-cases.md](07-clinical-cases.md) | a clinical case |
| [08-skills-checklists.md](08-skills-checklists.md) | a skills checklist |
| [09-lab-interpretation.md](09-lab-interpretation.md) | a lab interpretation set |
| [10-imaging-interpretation.md](10-imaging-interpretation.md) | an imaging interpretation set |
| [11-glossary-terms.md](11-glossary-terms.md) | a glossary term |
| [12-resources.md](12-resources.md) | a source: a PDF, textbook, guideline or video |
| [13-orchestration.md](13-orchestration.md) | how lanes are run: roles, stages, reports, queues |

Read this file, then **one** manual — the one for what you were asked to produce. Each
manual is complete for its own type; do not skim the others for background.

Two documented hand-offs are the exception, and your manual tells you when you have reached
one: **02 → 03** when the relationship pass turns up typed edges worth writing, and
**04 → 03** when an article needs a claim, citation or span. In both cases you are being
sent to author a *different content type*, in its own file — read 03 then, not before.

---

## 1 · Where work goes

Two kinds of root, and which one you write to depends on whether your batch is tied to
one university's exam lane or not.

### Per-university import roots

One root per university, each mirroring one exam-paper lane:

```
docs/Kasr-Source-Imports/
docs/Alexandria-Source-Imports/     (when present)
docs/Ain-Shams-Source-Imports/      (when present)
docs/Helwan-Source-Imports/         (when present)
```

Only `docs/Kasr-Source-Imports/` exists in this checkout today; the other three are
created the day that university's lane starts — don't create one yourself on spec.
Inside each, by content type and stage: `manifest/`, `coverage/`, `concept/`, `article/`,
`written/`, `practical/`, `question/`, `evidence/`, `relations/`, `glossary/`, plus
`pending-live/` for a sparse update targeting a concept id that isn't live yet (§3).

### The Systems-view root

```
docs/import-ready/
  subjects/     → Admin › Taxonomy › Import
  concept/      → Admin › Concepts › Import
  relations/    → Admin › Relationships › Import
  evidence/     → Admin › Evidence › Import          (12-resources.md)
  article/      → Admin › Bulk import (article)
  question/     → Admin › Bulk import (question)
  practical/    → Admin › Bulk import (practical)
  resource/     → Admin › Bulk import (resource)
  glossary/     → Admin › Glossary › Import
```

`docs/import-ready/` still exists, and is still where a batch goes when it is not tied
to one university's exam lane — a cross-university Systems-view record, most often.

Naming, in either root: `<CANONICAL-NODE>-<KIND>-<NNN>.md` — `SYS-RES-CONCEPT-004.md`,
`SYS-CVS-PRACTICAL-012.md`. Keep each folder's `INDEX.md` current: counts, what to expect
after importing, and anything the human must do in a particular order.

### Toolchain

`scripts/kasr/` is the shared toolchain — Kasr's own, and the template every other
university's lane copies from. A new lane copies what it needs into `scripts/<uni>/` and
edits its own copy from there. **Never edit another lane's files under `scripts/`** —
Kasr's included — a shared script changes behaviour for every lane still relying on it,
silently.

**A file is finished when it validates clean.** Nothing here is imported until Omar does
it. Never run `git commit`, `git push`, or an import.

---

## 2 · The file format

Every importer, the glossary included, reads the same markdown:

```markdown
# Item

## field_key
value, which may span
several lines

## another_field
value

---

# Item

## field_key
…
```

- `# Item` opens a record. A line containing only `---` separates records.
- `## field_key` **must match a key from your manual's field table exactly.** The **importer**
  ignores an unknown key silently, so a typo there does not error — it just loses that
  content. `npm run medical:batch` *does* flag it (`unknown column "field_ntoes"`), which is
  the main reason to run it before handing anything over.
- Keys are normalised `lowercase_with_underscores`. `## Canonical Key` and
  `## canonical_key` are the same key.
- One file may hold many records of the same kind. Practicals may mix all five formats.

Key order within a record does not matter to the importer; never write a script that assumes
it.

The glossary is not an exception to this format — it goes through the same generic import
wizard and the same `# Item` / `## field` parser as everything else. Its field keys and the
handful of headings that need spelling to auto-map correctly are in
[11-glossary-terms.md](11-glossary-terms.md).

### Two list-splitting rules, and mixing them corrupts your prose

| Rule | Splits on | Used by |
|---|---|---|
| **ID lists** | newline, `\|`, `;` | `concept_ids`, `resource_ids`, `universities`, `years`, `module`, `aliases`, `secondary_node_ids`, and every other list of identifiers |
| **Prose lists** | **newline only** | `hold_these`, `lose_the_mark`, `actor_flags`, `references`, `field_notes`, `university_notes`, `related_articles` |

A `+` only means append on a list column. On a prose, `key: value` or path column —
`module_subject` among them — it is stored as part of the value, and `medical:batch` now
refuses it (`d82dd36`). Write those fields as a full replacement.

Prose lists split on newlines only because a semicolon inside a teaching point was cutting
it into two half-sentences. Your manual's field table names the rule for every field. When
in doubt, put one item per line — that is correct under both rules.

A third shape exists for a few fields — **`key: value`, one per line**, splitting on the
first `:` only. It covers `field_notes`, a relation's `qualifiers`, a claim's `qualifiers`,
and `university_notes`. Neither list rule applies; one entry per line, always.

### Updating an existing record

Give the record's real `## id` and only the `## field_key` blocks you are changing. The
human imports with **Update matching items** on.

| You write | What happens to a list field |
|---|---|
| `Aspirin \| Ticagrelor` | replaced with exactly these |
| `+Prasugrel` | added to what is already there |
| `[clear]` | emptied |
| the key omitted entirely | left as it is |

This holds for every content type and every field: concepts, library articles, questions,
practicals and resources. Omit a key and the live value survives — including a question's
difficulty band and blueprint weights, a practical's timing, marks and mark scheme, and
`status` and `owner` everywhere. Send only what you are changing.

The required columns are the exception, and only because a row is rejected without them: a
question must always restate `question`, `correct_answer` and the correct option's text, and
a practical must always restate `type`.

A `+` cell adds without re-typing the list, and re-importing the same row does not duplicate
what it added, so a batch can be applied twice safely.

**Both `+` forms are safe now** — `+A | +B` in one cell, and one `+item` per line — fixed
at the parser in 312777b. Before the fix, only the first item in a `+`-prefixed cell lost
its plus; every later item was stored with the literal `+` still on it, an ID no record
ever has, silently — newline-separated cells had the same bug, so "one `+` per line" was
never actually the safe form. What is still refused is **mixing** a plain item with a
`+` one in the same cell (`X | +Y`) — ambiguous, so the validator asks rather than
guessing whether you meant replace or append. `exam_weight_by_year` never takes a `+`;
write keyed values instead — `AU_Y1=0.5`.

**`+` only appends on a true ID-list column.** The append/replace/clear/untouched logic
lives in one place (`listDirective`/`splitList` in `src/data/importSemantics.ts`), and only
fields parsed through it see the leading `+` at all. `module_subject` is a list of *paths*,
split on newlines by a separate parser that never strips a `+` — so `+101 ISK > Anatomy`
imports with the literal plus still on the front, not appended to what was already there.
Treat any field this manual doesn't explicitly call an ID list the same way: write it as a
full replacement, never a `+` cell. Verified 2026-08-22 by the Ain Shams toolchain lane
against the real validator; `medical:batch` now refuses it (`d82dd36`).

**An update row must still restate the kind's discriminator** — `## label` for a concept
(restate the live record's label verbatim; `canonical_key` may accompany it but does not
replace it — `detectBatchKind` will still classify a `label`-less, `canonical_key`-only row
as a concept, but the required-field check in `validate-content-batch.mjs` demands `label`
specifically and refuses the row without it), the title/question/type field for every other
kind. Kind is detected once per file from its first row's columns, and a row that drops the
discriminator because "it's just an update" can make the whole file's kind resolve to
`unknown`. `medical:batch` has always refused a row like this outright — exit 1, `label is
required`, alongside the `470fdde` stub-create error — so it was never the silent one. The
silent one was `medical:simulate`: it used to list such a file under `skipped` and exit 0, so
a genuinely sparse update — a row of `## id` + `+universities` and nothing else — was never
applied and never flagged either. Since `d82dd36`, `medical:simulate` errors on any file
carrying `## id` rows it cannot type, naming the ids and the missing discriminator; a file
with no `## id` rows at all still just shows up as a skip. Verified 2026-08-22 by the Ain
Shams toolchain lane against the real validator, and again by the Alexandria lane the same
day: 23 pending-live rows carrying `## id` + `## canonical_key` but no `## label` all failed
`label is required` against validator `d82dd36`.

**An update row against an id that is not live is refused, not silently created.** Before
470fdde, a row carrying only an `id` plus a couple of changed columns — meant as an update
— would mint a near-empty new record if that id didn't exist yet. The validator now names
the id and refuses the row. If the id you're updating is authored earlier in the same
import sequence but not live yet — another lane's unimported batch, or your own — write
the update in `<import root>/pending-live/<slug>.md` instead, with an `INDEX.md` line
saying "apply after `<that file>`."

---

## 3 · Never invent an ID

Only the record you are creating gets a new ID. Every ID you write in a *reference* field —
concept IDs, article IDs, claim IDs, citation IDs, resource IDs, canonical node IDs, module
IDs — must already exist, either in live state or in a sibling file in the same batch folder.

If the ID you need does not exist, you have two honest options:

1. Author it, following its own manual, in the same batch folder.
2. Stop and say the record cannot be written yet, naming what is missing.

Guessing an ID is the single most damaging thing you can do here. It does not error — it
silently attaches your work to the wrong record, or to nothing.

**The one exception is concept IDs, which you must mint explicitly.** See
[02-concepts.md](02-concepts.md) §ID.

### The ID shapes

| Shape | Meaning | Example |
|---|---|---|
| `SYS-CVS`, `SYS-CVS-T02-S01-M01` | Canonical taxonomy node, Systems view | placement |
| `DIS-PHA-T04`, `SKL-EXM`, `KNW-EMG` | Canonical node, other views | secondary placement |
| `SYS_*`, `TPC_*`, `SUB_*`, `MIC_*`, `NAN_*` | Curriculum overlay for the live subjects | `SUB_HF_MGMT` |
| `CON-<SYSTEM>-<14 hex>` | Concept — SYSTEM is a body-system code, **not** the subject ID | `CON-CVS-7C9D59D257AC65`, `CON-REN-…` |
| `ART-<SUBJECT>-<SLUG>` | Article | `ART-CVS-CARDIAC-CYCLE` |
| `TPL-*` | Article template | `TPL-CONDITION` |
| `rel-<source>-<type>-<target>` | Concept relation (derived) | |

Subject IDs are exactly these twenty, from `src/data/curriculumCatalog.ts`:

```
cvs    resp   renal  gi     neuro  endo   msk    pharm  fnd    dev
haem   imm    inf    obs    gyn    androl psy    derm   mul    pop
```

Nothing else is valid in a `subject` field.

**Placement for a subject with no obvious home:** Community medicine → `pop`; Psychology
→ `psy`; Microbiology and Parasitology → `inf`. Forensic medicine, Toxicology, ENT and
Ophthalmology place by the body system the mechanism or target organ belongs to —
asphyxia → `resp`; otitis / conjunctivitis → `inf`; visual pathway, pupil, audiovestibular
→ `neuro`; ocular embryology → `dev`; organophosphates → `mul`; an umbrella
forensic/toxicology principle with no single organ also → `mul`. A pharmacology concept
takes `FND` or `INF` as its `CON-` system code (below), never a subject of its own. `oph`
and `ent` as subject ids are pending an Omar ruling — do not mint against them yet.

This list said eight until 2026-08-22 — the eight that happen to have live
concepts. The other twelve are equally valid and were being written from memory,
which is how `ren` and `neu` reached a committed batch: both are placeholdered
at runtime rather than refused, so nothing said a word. `medical:batch` now
refuses a subject outside this list.

**Twelve of the twenty have no live concept yet** — `fnd`, `dev`, `haem`, `imm`,
`inf`, `obs`, `gyn`, `androl`, `psy`, `derm`, `mul`, `pop`. That is not a reason
to avoid them; it means you have no precedent to copy, so read the catalogue
rather than an existing batch. Live counts today: `pharm` 206, `gi` 126, `msk`
123, `renal` 119, `resp` 112, `neuro` 108, `cvs` 98, `endo` 90.

**`pharm` is the one subject that cannot pick its own `CON-` prefix.** The mint
refuses it without an explicit body-system code, because live state files all
206 pharmacology concepts under `FND` (general) or `INF` (anti-infectives) and
`CON-MUL-` has no members at all. Name the system on the seed.

> Some older live records carry `subjectId: "medical"` — 736 of them, from the extraction
> pipeline. That is legacy data, not a subject you may use.

### Module ids

A module id is a **global bare string** — one namespace, not one per university. Kasr
predates the prefix rule and keeps its ids as-is, e.g. `101 ISK`. Every other
university's module ids carry that university's prefix: `ASU-CVS`, `AU-MED-102`,
`HU-GIT-301` — uppercase, spaces to hyphens. The validator refuses a non-Kasr module id
without it.

`## universities` must be **non-empty on every record**, always — empty does not mean
"none of them," it means **every university**, so a blank field reaches students it was
never written or checked for. Kasr-only content says `Kasr`, not blank.

### The concept-id overlay rule

One medical idea gets **one concept id, across every university** — `mint-concept-id.mjs`
hashes `canonical_key` and never salts it, so the same key always mints the same id
regardless of who writes it. `universities`, `learner_years` and `modules` are overlays on
that one concept, not separate concepts.

Always run `find-existing.mjs` first (§4) — it searches live state, every
`docs/*-Source-Imports` root and `docs/import-ready`, including `canonical_key` inside
pending batches.

- **A hit in live state** → a **sparse update**: the id, the discriminating columns, and
  only the overlay fields you're adding — `+ASU`, `+ASU_Y2`, `+<module>`. **Never a full
  record** — it replaces every named field, which can silently evict a university or
  un-publish a live record by omission.
- **A hit only in another lane's unimported batch** → the same sparse update, written into
  `<import root>/pending-live/<slug>.md` with an `INDEX.md` line naming what it applies
  after (§1, §2).

Kasr's own pipeline salts concept ids per module, so two minters currently exist in this
repo with different behaviour on the same input — which one a new lane should use is an
open product question, not yours to resolve by guessing.

### Per-university traceability on shared records

One shared id, but **every university that uses the record carries its own complete tag
set** — not a share of one combined set. A concept, article, question, resource or
practical that three universities teach is one record with three universities' worth of
tags sitting side by side on it, and every one of those universities' tags must be there
in full, or that university's view of the record is broken without the record looking
wrong to anyone checking a different university.

The six tags, per kind (verified against the importers, `src/data/*.ts`):

| Tag | Concept | Article | Question | Resource / Practical |
|---|---|---|---|---|
| `universities` | `universityIds` (`conceptImport.ts:184`) | `universityIds` (`bulkImport.ts:1233`) | `tags.universityIds` (`bulkImport.ts:1147`) | `universityIds` |
| `years` | `learner_years` → `learnerYears`, plain numbers (`conceptImport.ts:183`) | `years` → `yearIds`, scoped ids like `OMS_Y2` (`bulkImport.ts:1233`) | `years` → `tags.years` (`bulkImport.ts:1146`) | `years` → `yearIds` |
| `module` | `modules` → `moduleIds` (`conceptImport.ts:185`) | `module` → `moduleIds` | `module` → `tags.moduleIds` (`bulkImport.ts:1157`) | `module_ids` (resource) |
| `module_subject` | one path per line, first segment names the module (`conceptImport.ts:194-196`, `moduleSubjectPath.ts`) | same | same (`bulkImport.ts:1158`) | same |
| `exam_weight_by_year` | `YEAR_ID=weight` pairs (`conceptImport.ts:187`) | — (not a field on this kind) | `YEAR_ID=weight` pairs (`bulkImport.ts:1162`) | — |
| `university_notes` | — **not a field on this kind today** — | `UNI: text` per line (`bulkImport.ts:117`, `:1183-1184`) | — **landing, not live yet** — | — **landing, not live yet** — |

Every field marked "—" genuinely does not exist on that kind's import contract as of
2026-08-23; do not invent a column for it. `university_notes` is currently **article-only**
— a lane is adding it to the question and practical importers, but until that ships,
university-specific callouts on a question or practical have nowhere to go except
`author_notes` (internal, never shown to a student) or the article that covers it.

**How each tag actually merges — this is where a second university's overlay gets lost:**

- `universities`, `module` (as an id list) and `years`-as-ids are true ID-list columns:
  `optionalList`/`listDirective` (`src/data/importSemantics.ts`) give you `+au`, `+AU_Y1`,
  `+AU-MED-102` — append without retyping what is already there. This is the safe, ordinary
  case.
- **`years` carries canonical year ids only** — `KAU_Y1`, `AU_Y1`… — exact case, never the
  bare label `Year 1` and never a lower-cased id (ruling 2026-08-23). A label names no
  university, so it cannot be traced per university the way an id can; production `years`
  holds all three shapes today (`KAU_Y1` 539 rows, `kau_y3` 114 rows, the bare label `Year 1`
  in 2,469 rows across 41 files). `buildYears` (`src/data/universities.ts:63-75`) mints the
  real format — `${CODE}_Y${n}` upper-case per university — cite that, not a guess. Kasr
  normalises its own existing records to ids in its sitting-year sweep; that is cleanup on
  Kasr's side, not a reason to write the label yourself.
- `module_subject` is **not** an ID-list column — it is a list of paths, parsed by
  `parseModuleSubjectPaths` (`moduleSubjectPath.ts:33-38`), which splits only on newlines and
  never strips a leading `+`. **Today, writing it replaces the field wholesale**; a second
  university's path must be added by restating every path already there plus your own, in
  one cell, one path per line — `+101 ISK > Anatomy` stores the literal `+` in front of the
  path, not an append (`02-concepts.md`, `04-library-articles.md`, `05-questions.md` all
  carry this warning already). A lane is landing `+<path>` append support for this field
  (in progress, 2026-08-23) — until it ships, treat every `module_subject` write as a full
  replacement.
- `exam_weight_by_year` is a nested object, not a list, so it merges **per key**
  (`mergeAuthoringData`, `src/data/importMerge.ts:43-59`, recurses into plain objects rather
  than replacing them). Writing only your own `YEAR_ID=weight` entries is safe — another
  university's year keys already on the record survive untouched. The trap is the key
  itself, not the merge: get the year id wrong and your entry sits beside the others,
  contributing nothing to anyone.
- `university_notes` (article only) is a flat prose list re-parsed whole on every write
  (`bulkImport.ts:1183-1184`) — restate every university's note line, not only your own, the
  same discipline as `module_subject`.

**A record is traceable per university when filtering by that university alone reproduces
that university's whole view of it** — which years, which modules, which exam weight, which
source. That is exactly what the runtime does: `itemInScope`/`itemScope`
(`src/data/contentControl.ts:651-666`) is the question/article/resource/practical filter a
student's own university and year are run through, and `conceptInScope`
(`src/data/adaptive/blueprint.ts:84-92`) is the concept one. Reproduce the filter by hand —
pick one university id, check every tag above resolves to something that names it — and if
any tag comes up silent, that university's traceability is broken even though every other
university's is fine.

**What breaks when one tag is missing, verified against the code that reads it:**

- **Empty `universities`** does not mean "no university" — it means **every university**
  (`itemScope`/`conceptInScope` both treat an empty list as unrestricted). A record you
  meant to scope to one university, left blank, silently reaches all of them.
- **A module tagged without its university** (i.e. the university you added is missing from
  `universities` even though its module id is present) is invisible to that university's
  own per-university filter — `itemUniversities` (`contentScope.ts:137-141`) and
  `itemWritableBy` (`contentScope.ts:151-166`) derive "which university" partly from scoped
  year ids like `AU_Y1`, so a module tag with no matching university or year id on the
  record cannot be traced back to anyone.
- **An `exam_weight_by_year` key on the wrong year id is lost**, and not merely unused —
  `conceptInScope` (`blueprint.ts:88-90`) restricts a concept's blueprint visibility to
  *exactly* the year ids present in `exam_weight_by_year` once that map has any entries at
  all. A concept correctly tagged `universities: +au`, `learner_years: +1` but whose
  `exam_weight_by_year` only ever got a Kasr key (`KAU_Y1`) is **excluded outright** from
  Alexandria Year 1's blueprint — not under-weighted, absent — because the map names a year
  Alexandria's filter never matches.

The validator is being extended to enforce this consistency directly — `universities` ↔
`years` ↔ `module` ↔ `exam_weight_by_year` keys all naming the same set of universities, one
check rather than four separate fields an author has to cross-check by hand (in progress as
of 2026-08-23; do not assume it is enforced yet). Until it lands, each module's `GATES.md`
(13 §4, S8) reports the per-record completeness of these six tags — treat a record flagged
incomplete there as not actually finished for that university, regardless of what its
`fieldsUsed` count says.

---

## 4 · Search before you create

This is not optional and it is not a formality. Duplicated concepts and articles are the
most expensive mistake in this repo, because nothing detects them at import time and a
student ends up with two half-covered versions of one idea.

**Before you mint anything, run:**

```bash
node "Instruction Manual for Content Creation/tools/find-existing.mjs" "<the label or a distinctive phrase from it>"
```

It searches live concepts by label, alias, canonical key and definition; live articles,
questions and practicals by title and alias; the live glossary in both languages; and
every unimported batch — `docs/import-ready/`, `docs/questions-import-ready/`, and now
**every `docs/*-Source-Imports` root** it finds (b3cad82), not just Kasr's. Since that
commit it also matches `## canonical_key` inside a pending batch, not only `## label`,
`## title`, `## term` and `## aliases` — a mismatched label with a matching key is now a
hit, not a false "safe to create."

Real output:

```
$ node "Instruction Manual for Content Creation/tools/find-existing.mjs" pericardium
live concept  CON-CVS-7C9D59D257AC65   Fibrous and serous layers of the pericardium  · aliases: Types of pericardium, Fibrous and serous pericardial coverings
live concept  CON-CVS-AE28ABD8CE2B0B   Heart within the pericardium and middle mediastinum
live concept  CON-CVS-10EC8DB8FAF3BF   Anterior pericardial fixation
live article  ART-CVS-HEART-ORIENTATION  Heart orientation and pericardium  · Published
pending       docs/questions-import-ready/SYS-CVS-CONCEPT-T06.md  A rigid pericardium makes the ventricles compete for a fixed volume  · via ## label

9 existing record(s). Update one of these rather than creating a duplicate.
```

```
$ node "Instruction Manual for Content Creation/tools/find-existing.mjs" "xyzzy plumbus"
No existing record matches "xyzzy plumbus". Safe to create one.
```

**The match is a plain substring, so a longer query is a *worse* query.** This is the trap
that actually produces duplicates:

```
$ … "Renal autoregulation of glomerular filtration rate"
No existing record matches "renal autoregulation of glomerular filtration rate". Safe to create one.

$ … "autoregulation"
live concept  CON-REN-B7AC8C3EEC5F35  Autoregulation keeps renal flow and GFR relatively constant between about 90 and 200 mmHg
```

Same repo, same moment. Searching your full label — the obvious thing to do — reports "safe
to create" for a concept that already exists. **Search the shortest distinctive word first**,
then widen.

A real search is at least four queries:

1. The **single most distinctive word** in your label — `autoregulation`, `pericardium`, `preload`.
2. Each alias you intend to give the record.
3. The synonym another author would have used — "MI" and "myocardial infarction", "SOB" and
   "dyspnoea", "kidney" and "renal".
4. The mechanism or structure the record is *about*, when your label names an effect.

One search of one long phrase is not a search.

### What to do with a hit

| What you found | What you do |
|---|---|
| The same idea, same scope | **Update it.** Same `## id`, only the blocks you are improving. Never a second record. |
| The same idea, but yours is better written | **Update it.** Replace the weak fields. The ID stays. |
| Overlapping but genuinely distinct | Create yours, and add each to the other's `related_concept_ids` / `related_articles`. Say in `field_notes` why they are separate. |
| A near-miss you decided against merging | Record its ID in `rejected_merge_candidate_ids` so the next author does not re-litigate it. |

**The tiebreaker, when rows 1 and 3 both look plausible.** Ask: *could one record answer
both questions without becoming two paragraphs stapled together?* If yes, it is one concept —
update. If the two would need separate objectives, they are distinct — create and cross-link.

A worked case. Live: "Autoregulation keeps renal flow and GFR relatively constant between
about 90 and 200 mmHg" — a *range*. Proposed: the tubuloglomerular and myogenic *mechanism*
that achieves it. One objective is "state the range", the other is "explain how it is
achieved"; a question could test either without the other. **Two concepts**, cross-linked,
with the live one recorded in `rejected_merge_candidate_ids`.

Rows 3 and 4 are **not exclusive** — doing both, as above, is the intended outcome. Row 4
alone is for a near-miss you are not linking to at all.

When you genuinely cannot tell, **write the update**. A merged record can be split later;
a duplicate pair is found by nobody and quietly halves the coverage of both.

Worked example — you were asked to write a concept on "the two layers of the pericardium".
The search above returns `CON-CVS-7C9D59D257AC65 Fibrous and serous layers of the pericardium`.
That is your concept. You do **not** create `CON-CVS-<new>`. You write:

```markdown
# Item

## id
CON-CVS-7C9D59D257AC65

## label
Fibrous and serous layers of the pericardium

## definition
The pericardium has two layers: a tough outer fibrous layer that limits acute
distension, and an inner serous layer whose parietal and visceral sheets enclose the
pericardial cavity.

## pitfalls
Calling the visceral serous layer "epicardium" and then treating it as a third,
separate layer. It is the visceral sheet of the serous pericardium.

## aliases
Types of pericardium | Fibrous and serous pericardial coverings | Two layers of the pericardium
```

Three fields changed. Everything else on that concept is left alone, because an omitted key
is untouched. Note that `aliases` re-types the two existing values alongside the new one —
that is deliberate, for the `+append` reason given above.

> **Keep the discriminating columns even in an update.** `## label` above is unchanged, and
> it is required, not optional — `canonical_key` alone will still get the file classified as
> a concept batch, but the row itself is refused with `label is required` unless `## label`
> is restated too. Strip both and the validator cannot classify the record at all — it falls
> through to `unknown` and refuses the file, naming the kinds it recognises. (It used to
> crash with a `TypeError` here, which said the same thing far less usefully.)
>
> An update record carries `id` + the discriminating columns for its type + only the fields
> you are changing. Your manual names the discriminating columns in its header box.

**Validate a partial update with `medical:simulate`, not `medical:batch`.** The batch
validator judges every record as though it were new, so a three-field update fails on every
field it did not re-type:

```
Item 1 (Fibrous and serous layers of the pericardium): no explicit objective — a concept without one cannot be assessed
Item 1 (Fibrous and serous layers of the pericardium): no Arabic label and no field note saying why (LD-15)
```

The simulator merges against live state and reports the truth — note `created: 0,
updated: 1`, which is how you confirm you updated rather than duplicated:

```
batches: [{"file":"…","kind":"concept","created":0,"updated":1}]
delta:   {"concepts":0}
errors:  []
```

A `delta` of `0` with `updated: 1` is exactly right for an update. A `delta` of `1` means
you created a second record and your `id` did not match.

### One label, one home

A label is created once. `npm run medical:validate:authoring` fails on any label declared
in two places. When a topic genuinely belongs to more than one subject, the owning subject
keeps the label and the others carry a **cross-reference** — a link, never a second node.

- **Drug and therapeutic-class labels belong to `pharm`.** There is no "Cardiovascular
  pharmacology" inside `cvs`; `cvs` cross-references it.
- **A shared presentation has one home:** chest pain → `cvs`; dyspnoea → `resp`;
  oedema → `cvs`; cyanosis → `resp`.
- **Where two subjects mean genuinely different things by the same words, disambiguate the
  label** rather than cross-referencing — "Cardiac excitation–contraction coupling" and
  "Skeletal muscle excitation–contraction coupling", not one shared node.

### The tree-wide duplicate scan

`find-existing.mjs` depends on picking the right query (§4 above). `npm run
medical:duplicate-keys` (5c28167) is the backstop — it scans the whole tree for one idea
wearing two concept ids, searched or not. Run it before handing off any batch that mints
concepts, not only when you suspect a collision.

**Label-twin rule.** The same idea under two different wordings is still a duplicate —
"Autoregulation of renal blood flow" and "How the kidney keeps its own blood flow
constant" are one concept, not two, even though no substring search catches both. Read a
surprising phrasing before deciding it's unrelated.

---

## 5 · Fill every field, or say why it is empty

This is the reason these manuals exist. The current pending concept batches use **28 of the
52 available columns**, and six of the omitted ones are fields the audit *requires* — so
they would fail on import.

Your manual's field table splits every column three ways:

- **Must carry a value.** A blank is an audit error, full stop.
- **Must be present.** The key must exist; an empty list is fine, but the field cannot be
  missing. **For a list field, an empty `## key` block does not make it present** — see below.
- **May be blank, with a stated reason.** Leave it out only with a matching `field_notes`
  entry saying *why*.

> **An empty block and `[clear]` are different.** Writing `## span_ids` with nothing under
> it parses as *untouched* — the key ends up **absent**, and the audit reports
> `article.articleData.spanIds missing`. To say "present and deliberately empty", write:
>
> ```markdown
> ## span_ids
> [clear]
> ```
>
> For fields on the *must be present* list that you are leaving empty, `[clear]` is the
> correct value. Blank is only right for a field on the *may be blank* list that also has a
> `field_notes` entry. New concepts are partly protected here — `materialiseNewConcept`
> writes absent optional keys as `null` — but articles are not, so this bites articles first.

`field_notes` is one entry per line, `field: reason`:

```markdown
## field_notes
moduleIds: No verified live module ID was supplied; curriculum mapping remains explicit and unguessed.
arabicLabel: No standard Arabic term is in undergraduate use in Egypt; students use the English term.
```

Good reasons say what was looked for and what was found. `N/A`, `TODO`, `none`, and silence
are all audit failures.

> **The key is the model's camelCase property name, not the import column.** This is the
> single easiest way to write a batch that passes `medical:batch` and fails
> `medical:audit`. `noteMap` stores whatever you type, verbatim and unnormalised; the audit
> looks the note up by the **property** name. They differ for most of the fields that need
> a note, and two are not even a case change:
>
> | Import column | `field_notes` key |
> |---|---|
> | `modules` | **`moduleIds`** |
> | `nanotopic` | **`nanotopicId`** |
> | `microtopic` | `microtopicId` |
> | `arabic_label` | `arabicLabel` |
> | `approved_file_resource_ids` | `approvedFileResourceIds` |
> | `approved_video_resource_ids` | `approvedVideoResourceIds` |
> | `last_reviewed` | `lastReviewed` |
> | `review_due` | `reviewDue` |
> | `resource_occurrence_ids` | `resourceOccurrenceIds` |
> | `source_candidate_ids` | `sourceCandidateIds` |
> | `question_ids` (articles) | `questionIds` |
> | `arabic_title` (articles) | `arabicTitle` |
> | `aliases`, `pitfalls`, `media` | unchanged |
>
> Write a note in snake_case and the audit does not see it — you get
> `X is blank without an explicit reason` for a field you carefully explained. Only **blank**
> fields need a note; a note on a filled field is harmless but pointless.

**Check your utilisation before you hand off.** `npm run medical:batch` reports
`fieldsUsed` — the number of distinct columns your file actually uses. Your manual states
the floor for your type. A file under it is not finished.

### Never invent a fact

Every medical statement must be defensible from a qualified source. If you cannot support
it, leave the field empty and record why in `field_notes`. Never invent a fact, a citation,
a dose, or an ID.

- Treatment, dose, procedure, emergency and recommendation content **never auto-publishes**.
  Set `status` to `Draft` and let review promote it.
- British spelling: oedema, haemorrhage, anaemia, paediatric.
- Write for a student revising, not for a specialist. Short sentences, concrete mechanisms,
  no filler.
- The reference standard is the **Egyptian NAQAAE Academic Reference Standards for
  Medicine**. International references (GMC MLA content map, USMLE Step 2 CK outline) check
  coverage; they do not replace local scope.
- Where local epidemiology differs materially from Western textbooks — schistosomiasis,
  hepatitis C, rheumatic heart disease, TB — say so explicitly rather than importing a
  foreign prevalence figure unmarked.
- Drug availability and naming in Egypt can differ from a UK or US source. If you cannot
  verify local availability, write the class and mechanism and leave the brand claim out.
- Universities are an **overlay, not a branch of the tree.** Where Kasr Alainy and Ain Shams
  teach something differently, that is a `university_notes` entry on one article — not two
  articles.

---

## 6 · Requesting media

You will often need a diagram, an ECG, a histology field or a heart-sound recording that
does not exist. **Never invent a URL and never describe an image as though it were there.**
You file a request, and it appears in the admin backlog at **Library Setup → Media requests**
for a human to fulfil.

Requests attach to **articles, questions and practicals only**. There is no create form
anywhere in the admin UI — importing is the only way one comes into existence, which is why
getting this block right matters.

If a **concept** or a **glossary term** needs an image, route the request through the
article that teaches it and name the concept ID in the `Purpose:` line.

The column is `media_recommendations` on all three types. Two older names are still read —
`image_recommendations` on articles and `media_needed` on practicals — but do not write
them; they exist so that already-authored batches keep working.

### The block

```markdown
## media_recommendations
### anatomy plate · Coronary artery territories mapped to ECG leads
Purpose: A student cannot hold the lead-to-territory mapping from prose alone, and every
exam question on infarct localisation depends on it.
Priority: required
Status: needed
Section: Blood supply, innervation and lymphatics
Source direction: openly licensed anatomy atlas
Rights: must be CC-BY or public domain

### image · Interpreting the ECG
Brief: 12-lead ECG showing 2 mm ST elevation in leads II, III and aVF
Purpose: The territory cannot be identified from a text description alone.
Priority: required
Status: needed
```

**Two heading forms.** Lead with `image`, `audio` or `video` and the tail names *where* the
asset goes, with the brief on its own `Brief:` line. Or lead with a genre and the tail *is*
the brief, with the medium implied as `image`. A `Brief:` line always wins.

| Line | Required? | Values |
|---|---|---|
| heading | yes | `### <medium or genre> · <rest>` |
| `Brief:` | yes (heading tail counts) | One line: what to draw or source. A request with no brief is **silently dropped**. |
| `Purpose:` | yes | What a student can do after seeing it, and why prose cannot carry it. Articles error without this. |
| `Priority:` | yes | `required` · `strongly helpful` · `optional` — defaults to `strongly helpful` |
| `Status:` | yes | `needed` · `planned` · `supplied` · `declined` — defaults to `needed` |
| `Kind:` | if not in heading | `diagram` · `anatomy plate` · `histology` · `flowchart` · `graph` · `comparison table` · `imaging example` · `algorithm` · `clinical photograph` · `other` — defaults to `other` |
| `Section:` | when it belongs to one part | An article section heading, or a practical `###` block title, or the literal `station`. **Practicals error if this names a block that does not exist.** |
| `Block:` | optional | `summary` · `body` · `hold` · `trap` |
| `Anchor:` | optional | Verbatim text from the record this asset illustrates |
| `Source direction:` | strongly encouraged | Where a fulfiller should look |
| `Rights:` | strongly encouraged | Licensing constraint |
| `Notes:` | optional | |

Media list is `image`, `audio`, `video`. Genre only means anything for images.

**One record may request several assets** — one for the question stem, one for a distractor,
one for a particular article section. Write one `###` block per asset. Do not bundle two
images into one request.

`Priority: required` means *the item cannot publish without it*. Use it when the teaching
point genuinely fails without the asset, not to express enthusiasm.

### Real media, when you actually have it

If you have a real, rights-cleared URL, that is a different field — `## media` on articles,
`## attachments` on questions — and it needs `Caption:`, `Alt:`, `Rights:` and `Necessity:`.
A media block with no URL is dropped and reported. Your manual covers this if the type
supports it.

---

## 7 · Everything points back

This is what makes the library navigable instead of a pile of pages. Both directions must
exist, and you write both.

| You wrote | You must also |
|---|---|
| An article listing a concept in `related_concepts` | add the article's ID to that concept's `article_ids` |
| A concept listing an article in `related_article_ids` | make sure that article lists the concept back |
| A question testing a concept | make sure some article covers that concept — a question may only test a concept the library teaches |
| A concept | run the relationship discovery pass in [02-concepts.md](02-concepts.md) |
| A relation | give it a claim **and** a citation — see [03-relationships.md](03-relationships.md) |

A concept with no article is an orphan. An article whose concepts do not list it back is a
broken link. Neither errors at import; both are found by `npm run medical:audit`.

---

## 8 · Gates

Run all of these. Zero errors at every step, or the batch is not finished — and per
"Content moves in stages" above, S7/S8 need more of them than S2 alone. The commands
below show `docs/import-ready/<kind>/` as the path — substitute your actual root
(§1) when you are writing in a per-university import root instead.

| npm script | What it catches |
|---|---|
| `medical:batch` | Per-file shape and column errors; directory-scoped only (below) |
| `medical:simulate` | The real gate — applies your batch to a copy of live state |
| `medical:audit` | Under-filled fields, blank-without-reason, broken cross-references |
| `medical:presence` | Every Kasr concept/article batch actually covers what triage said it must |
| `medical:citations` | Evidence: every claim traceable, `atomicClaimIds-missing = 0` |
| `medical:concept-ids` | One key, one id, across every university's `*-Source-Imports/concept` |
| `medical:id-stability` | An id does not drift between runs |
| `medical:duplicate-keys` | One idea wearing two concept ids, tree-wide (§4) |
| `medical:batches-present` | The manifest names batches that actually exist on disk |
| `medical:validate:authoring` / `medical:validate:taxonomy` | Committed repo state — labels, placement — not your unimported batch |
| `medical:snapshot-live` / `medical:snapshot-staleness` | Refresh, and measure the gap in, the live-state extract (below) |

Verify these names against `package.json` before typing one from memory — the list above
matches this checkout today, not a promise about tomorrow's.

- **`--with` for sibling batches.** `medical:simulate` and the presence/citations/
  concept-id checks resolve ids against live state plus whatever files you pass with
  `--with`. A question batch validated without its own concept batch beside it errors on
  the unresolved concept — a real error, not a silent skip — and since daf0d4d that error
  now adds *"name its concept file with `--with`"*. Pass every sibling batch your ids
  resolve against.
- **The catalogue check runs inside `medical:batch`** (57ef0d4), not as a separate
  script. It checks who a record is claimed for (`universities`, `module`) against
  `src/data/universities.ts` — it is what refuses a non-Kasr module id without its
  university prefix (§3), and an empty `universities` list.
- **Simulate one directory at a time.** A combined run across two folders lets the
  *last* file win on any id both define — a green result that silently dropped one
  author's changes.
- **"Live state" is not automatically today's production data.** It means
  `server/data/medical-library-v1.json` — the extraction bundle's copy, **not**
  production, unless Omar ran `npm run medical:snapshot-live` (99865d3) to pull it fresh;
  `medical:snapshot-staleness` reports the gap.
- **Paste the output, don't summarise it.** Gate lines go in the commit body, or in
  `coverage/<module>-GATES.md` for a lane that isn't committing yet — a claim of green
  gates without pasted output is not green.

```bash
npm run medical:batch -- "docs/import-ready/<kind>/<your-file>.md"
```

Per-file. Parses exactly as the import wizard does and reports what would be written,
including `fieldsUsed`. Real output:

```
{
 "file": "docs/import-ready/concept/SYS-CVS-CONCEPT-T02.md",
 "kind": "concept",
 "items": 11,
 "fieldsUsed": 28,
 "placements": [ "SYS-CVS-T02-S01-M01", … ],
 "errors": []
}
```

> **It detects the kind from your columns, not your filename.** A concept file missing both
> `label` and `canonical_key` is not recognised as a concept. This has bitten before: a
> stray question batch was applied as sixteen silent concept upserts. Your manual names the
> columns that identify your type — always include them.

**`medical:batch` is not the gate.** It is directory-scoped: it resolves IDs against sibling
files in the same folder, never against live state. For relations, citations, and an
article's `related_articles`, it reports `does not exist` for records that are live and
correct. Your manual tells you which of its errors are real for your type. It is also
strict about unknown columns — a misspelt `## key` is an error here, even though the
**importer itself** would silently ignore it and lose your content. That difference is the
reason to run it at all.

```bash
npm run medical:simulate -- "docs/import-ready/<kind>/"*.md --emit /tmp/sim-$SCOPE.json
```

**This is the gate.** It applies the whole set to a **copy** of live state, in dependency
order, and reports the delta. It is the only check that resolves IDs against records that
are already live.

Use a filename nobody else will use — `$SCOPE` stands for your claimed scope, e.g.
`/tmp/sim-SYS-RES-T04-concepts.json`. Several agents share this machine, and a hard-coded
shared path gets overwritten between your simulate and your audit, so you audit somebody
else's batch and get a green result for work that was never checked.

Read `delta` and `errors`. Your `INDEX.md` will appear under `skipped` with
`detected as "unknown"` — that is expected and harmless, because §1 requires an `INDEX.md`
in the folder the glob picks up. It is not an error and you do not need to move it.

```bash
npm run medical:audit -- --source /tmp/sim-$SCOPE.json
```

The field audit, run against the state your batch *would* produce. **This is what catches
an under-filled record**, a blank field with no stated reason, and a broken cross-reference.
A batch can pass `medical:batch` cleanly and fail this — that is the normal way an
incomplete record gets caught, so never stop at `medical:batch`.

The audit reports on the whole library, so filter to your own IDs:

```bash
npm run --silent medical:audit -- --source /tmp/sim-$SCOPE.json | node -e "
let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{
const j=JSON.parse(s.slice(s.indexOf('{')));
const mine=j.errors.filter(e=>e.includes(process.argv[1]));
console.log('total',j.errors.length,'| mine',mine.length); mine.forEach(e=>console.log(' ',e));});" CON-REN-
```

```bash
npm run medical:validate:authoring && npm run medical:validate:taxonomy
```

> **These two do not read your batch.** Neither takes a file argument; both validate
> committed repo state. They catch a duplicate label you introduced *after* it is imported,
> not before. Run them so you know the repo is clean, but do not read a pass as approval of
> your file.

The glossary sits outside all four. See [11-glossary-terms.md](11-glossary-terms.md).

### The difficulty mix

Anything that sets a per-question difficulty — MCQs, clinical cases, lab and imaging
interpretation — is measured against a bank-wide target:

| Band | Target share |
|---|---:|
| `Easy` | 25% |
| `Moderate` | 55% |
| `Hard` | 15% |
| `Challenging` | 5% |

`medical:batch` warns when a file drifts more than 15 percentage points from any of these:

```
"notes": [
 "difficulty mix in this file drifts from the bank target: Easy 0% vs 25% target, Hard 33% vs 15% target"
]
```

It is a **note, not an error** — a three-question file cannot hit the mix, and forcing it
would be worse than ignoring it. Judge it across the batch you are producing, not per file.
A whole bank of `Moderate` is the failure this is watching for.

`Hard` and `Challenging` both mean "expect most students to miss this". `Hard` is a concept
a strong student gets right; `Challenging` needs several steps held at once.

### Import order

The simulator applies kinds in this order, and so will the human:

```
resource → article → concept → claim → citation → span → relation → practical → question
```

If you are producing a later kind, everything earlier that you reference must already be
live or be sitting in the same batch folder.

---

## Telegram and other fetches

Telegram runs through Omar's own logged-in Chrome, one lane at a time, with the chief of
staff holding the queue. Only listed channel links and the in-app search box — never
click **Join**, log "needs Omar to join" instead; never use **addlist**; no video or
audio downloads. Dedupe by sha256, tier ≤5 like every other source, and another
university's past papers are never this university's examinable signal. Full procedure:
[13-orchestration.md](13-orchestration.md).

---

## 9 · Working alongside other agents

Several agents share this one checkout. The protocol is short and not optional.

**Claim your scope before you write anything.** A scope is a
`(canonical node, content type)` pair — `SYS-RES · T04 · concepts`. Open
[CLAIMS.md](CLAIMS.md), re-read it to check nobody holds an overlapping scope, and add your
row. Then start.

**One agent, one output file.** Never append to a file another row claims. If you need
something in a file someone else holds, put it under **Wanted** in `CLAIMS.md` instead.

**Shared records belong to the owning subject.** Two agents working different systems will
both want a cross-system concept. The subject that owns the label under §4 authors it;
everyone else references the ID and notes the dependency in their claim row. If it does not
exist yet, add it under **Wanted** — do not mint it yourself.

**Respect the import order.** Do not assume an earlier kind exists unless it is live or
claimed by someone in `CLAIMS.md`.

**Release when done.** Move your row to **Done** with the file path and the validator's item
count, and update the folder's `INDEX.md`.

**Never** run `git commit`, `git push`, or an import — yours or anyone else's.

---

## 10 · Before you report finished

- [ ] I searched for an existing record, using more than one phrase — including a **short,
      general** one — and acted on what I found
- [ ] I did not invent a single ID
- [ ] Every field in my manual's *must carry a value* list has one
- [ ] Every field in the *must be present* list is present — `[clear]` where empty, not blank
- [ ] Every blank in the *may be blank* list has a `field_notes` reason that says what I
      looked for, keyed by the **camelCase property name**
- [ ] `fieldsUsed` is at or above my manual's floor, **where my manual states one** — practicals
      and relations report different metrics instead, named in their own manuals
- [ ] Every media need is a request block, not an invented URL
- [ ] Every back-link in §7 exists in both directions, or is named in my report as owed
- [ ] **`medical:simulate` returns zero errors, and `medical:audit --source` returns zero
      errors against my own IDs.** These two are the gate. `medical:batch` errors count only
      where my manual says they are real for my type — for relations and citations it reports
      `does not exist` for live records by design
- [ ] My `CLAIMS.md` row is in **Done**, and the folder's `INDEX.md` is current
- [ ] The file is in `docs/import-ready/<kind>/` and I have imported nothing

Report the folder path explicitly. `docs/import-ready/<kind>/` — naming it saves a search.
