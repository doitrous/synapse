# University source extraction — plan and readiness audit

**Status: planning gate. Nothing below has been implemented.**

Companion to [`MASTER-PLAN.md`](MASTER-PLAN.md), which remains the programme's
single source of truth. This file plans one new track inside it: turning a
university's own source corpus into canonical concepts and every supported kind
of teaching and assessment content, for any university and any year.

- Baseline commit: `036ce3e` on `main`, pushed 2026-08-21.
- Source corpus audited: `/Users/doitrous/Desktop/Kasr Alainy` — 205 files,
  178 PDFs, 5,113 PDF pages, 1.4 GB.
- Audit method: four bounded read-only agents (manual/schema parity, academic
  structure, source inventory, question-format/media) plus lead verification of
  every consequential claim.

---

## 0. Git synchronisation result

The "15 ahead, 165 behind" hint was stale. On inspection `main` was already
level with `origin/main` at `d5c15c4`.

Four commits were made from the hanging work and pushed:

| Commit | What |
|---|---|
| `a615223` | iOS: merge the faculty and personal calendars so "what is next" answers from whichever has it; move "last used resources" to server-owned state |
| `fcbd3f8` | `scripts/telegram-library/` — the offline Kasr Al Ainy library generator and its 6 tests |
| `2af2ce2` | `.gitignore` — exclude `ios/.spm/`, the Swift packages CI clones at that path |
| `036ce3e` | Remove a `Text("DIAG recent=… upcoming=…")` line that had reached the dashboard body |

`origin/main` advanced to `f18f30a` (PR #25, Arabic taxonomy controls) *during*
this run — another session is active in the same working directory. That was
merged at `8595e66`; the merge was clean, touching only `src/data/i18n-ar.ts`.
A safety branch `safety/preserved-local-work-2026-08-20` holding the preserved
tip was pushed **before** the merge. Nothing was force-pushed.

**Checks after reconciliation, all green:** `npx tsc -b` exit 0 · web tests
1040/1040 · `oxlint` exit 0 · `vite build` succeeds · iOS `xcodebuild test`
**433 tests in 72 suites, TEST SUCCEEDED** · `node --test` telegram-library 6/6.

Left uncommitted on purpose: `.obsidian/workspace.json`, a tracked file holding
machine-local editor layout. It is preserved in the working tree, not deleted.

**New baseline: `036ce3e`.**

---

## 1. Current-state audit

### 1.1 What already exists and should be reused

This programme is not starting from nothing. Reuse, do not rebuild:

| Capability | Where | Verdict |
|---|---|---|
| Canonical 4-view taxonomy (`SYS-`/`DIS-`/`SKL-`/`KNW-`, 1,883 nodes) | `src/data/curriculumCatalog.ts`, `medicalLibraryTaxonomy.ts` | Complete. This is the concept spine. University curricula overlay it. |
| Per-file source manifest + coverage ledger | `corpus/**/taxonomy.json`, schema `uninect-per-file-taxonomy/1.0.0`; 2,166 files already exist | **Mature. Reuse — do not invent a second manifest.** |
| Processing progress ledger | `corpus/_coordination/current-taxonomy-progress.json` | Reuse. Already has the `blocker_reason` idiom for recording exclusions auditably. |
| Source/concept ID integrity indexes | `scripts/build-corpus-source-index.mjs`, `build-corpus-concept-index.mjs` | Reuse; needs a depth fix (§3.2). |
| Concept import, full 54-field contract with stable-ID upsert | `src/data/conceptImport.ts` | Complete (`BLK-02` closed). |
| Typed relation import | `src/data/evidenceImport.ts`, `RelationsImportPage.tsx` | Complete (`BLK-03`, `BLK-12` closed). |
| Claims / citations / spans import | `src/data/evidenceImport.ts` | Complete. |
| Article annotation import with verbatim-quote verification | `src/data/bulkImport.ts` | Complete (`BLK-01` closed). |
| Media *request* model + admin queue | `MediaRequest`, `/admin/library/images` | Exists; incomplete (§1.3). |
| Batch validator, importer simulator, field-parity reporter | `scripts/validate-content-batch.mjs`, `simulate-content-import.mjs`, `report-import-field-parity.mjs` | Exist; strictness is uneven (§1.4). |
| Nested `ModuleSubject` tree with arbitrary depth | `src/data/moduleSubjects.ts:37` | Type exists; unreachable by import (§1.3). |
| Kasr Alainy university, `KAU_Y1`, module `101 ISK` | `src/data/universities.ts:176`, `:109` | **All three confirmed present.** |

The existing programme (`MASTER-PLAN.md`) has Phase 0 (platform readiness) and
Phase 1 (taxonomy) **passed**, and Phase 2 in progress with `SYS-FND`,
`SYS-DEV` and `SYS-CVS` complete. Its `LD-08` already names the university
corpus as the authority for local curriculum and exam emphasis.

### 1.2 The blocking discovery

> **Every authenticated student can download the entire admin content ledger.**

`server/src/index.js:816` places `'synapse-admin-content-ledger-v4'` in
`STUDENT_READABLE_STATE`. `GET /api/state/:key` (`index.js:884`) then returns
`JSON.parse(rows[0].v)` **verbatim**. Redaction happens only client-side, in
`src/lib/usePublishedQuestions.ts:16-52` and its siblings — after the whole
document has already been delivered.

So a student today can read, for every item in the ledger: `Draft` and
`Archived` content, `authorNotes`, the `source` provenance record, every
`mediaRequest`, essay `modelAnswer`s, OSCE mark schemes and actor briefs, and
**the correct answer and every explanation for every question they have not
attempted**.

No test asserts what `STUDENT_READABLE_STATE` may contain (`grep` finds the
identifier only in `index.js`).

This is not merely "gap 6 is true". It means the requirement — *original source
questions and answers must have a guaranteed private server-only provenance
store* — **cannot be satisfied by adding fields to the current ledger**. Any
provenance written there ships to students by construction. This is the single
hard blocker for the whole programme and it is `READY-01`.

### 1.3 Confirmed gaps, against the sixteen raised

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 1 | Question data supports multiple `mainConceptIds` but validator and manual enforce exactly one | **TRUE** | `scripts/validate-content-batch.mjs:165` `if (main.length !== 1)`; manual `05-questions.md:125`. Model is plural. The practical branch already allows ≥1 (`:256`), and `05-questions.md:476` contradicts its own field table. |
| 2 | Some code treats the first main concept as the only primary | **TRUE** | `src/data/adaptive/item.ts:83` `primaryConcept()` = `mainConceptIds[0] ?? secondaryConceptIds[0]`. Consumed at `priority.ts:281`, `blockBuilder.ts:186,218,453`. Also `scripts/build-medical-library-v1.mjs:523` resolves only `conceptIds[0]`. |
| 3 | Assessment model is single-best-answer MCQ only | **TRUE** | `AnswerLabel = 'A'…'F'` (`contentControl.ts:16`), one `correctAnswer` (`:210`), six hard-coded slots (`QuestionEditorDialog.tsx:29`). No `format` discriminant exists. `tags.questionType` is a blueprint label ("Diagnosis"), not a response format. Adjacent kinds `essay` and `histology` exist as separate `ContentKind`s, not question formats. |
| 4 | The five practical types do not cover general faculty written questions | **TRUE** | Code has three formats — `'osce' \| 'case' \| 'lab'` (`contentControl.ts:415`); the five manual strings collapse onto them. None is a written/essay container. |
| 5 | `ContentSource` exists but import does not populate detailed provenance | **PARTIAL** | `ContentSource` is 4 fields (`contentControl.ts:466`): `origin`, `universityId`, `institution`, `reference`. Rich provenance *is* importable on the separate evidence-source record (`report-import-field-parity.mjs:240`: `sha256`, `source_relative_path`, `accessed_at`, `rights`). Catalogue resources deliberately carry none. |
| 6 | No guaranteed private server-only provenance store | **TRUE, and worse** | See §1.2. There are no content tables in `server/schema.sql` at all; content is one JSON blob in `app_state`, and that blob is student-readable. |
| 7 | `ModuleSubject` tree exists but academic import handles only years/terms/modules | **TRUE** | Tree at `moduleSubjects.ts:37` with `children?: ModuleSubject[]`. Importer grammar at `AcademicImportDialog.tsx:34-89` is exactly `# Year` / `## Term` / `- Module [ID]`. Also: the tree lives **only in localStorage** (`:50`) — no server table, so it is per-browser. |
| 8 | Content cannot be tagged with a stable module-subject path via import | **TRUE** | No `module_subject`/`msub` column anywhere in `bulkImport.ts` or `scripts/`. Tagging granularity stops at module ID. |
| 9 | Scalar exam weights cannot express type, tier, frequency, recency, confidence separately | **TRUE** | `blueprintWeight`, `examWeightByYear`, `weightConfidence` (`conceptGraph.ts:75,77,108`); collapsed to one number at `adaptive/blueprint.ts:61`. Source tier, frequency and recency **have no fields at all**. `weightConfidence` exists but `rawConceptWeight` never reads it. |
| 10 | Concepts cannot own media requests | **TRUE** | `MEDIA_REQUEST_OWNER_KINDS = ['article','question','practical']` (`contentControl.ts:99`). `Concept` has no `mediaRequests` field. |
| 11 | No reusable-media lookup and resolution workflow | **TRUE** | `MediaRequests.tsx:76` searches *requests* only. There is no index of fulfilled assets — no lookup by name, code, anatomy, modality or tag. `MediaRequest.mediaId` (`:161`) is declared as the link to real media and **nothing resolves it**. |
| 12 | Several practical formats cannot render fulfilled media | **TRUE** | Only `lab` renders media (`LabQuestionDraft.mediaUrl` → `PracticalRunner.tsx:557,643`). OSCE and case drafts have no media field. |
| 13 | Authoring folders/validators assume central `docs/import-ready/<kind>/` | **PARTIAL — better than feared** | The validators take arbitrary paths and resolve siblings relatively (`validate-content-batch.mjs:22,74`). What *is* hardcoded: live state at `:119,:226` with no override flag, and the manual's duplicate-search tool at `tools/find-existing.mjs:26` (`BATCH_DIRS = ['docs/import-ready','docs/questions-import-ready']`). A university root would validate but be **invisible to the anti-duplication search** — which is the dangerous half. |
| 14 | Manuals document importer/editor gaps | **TRUE, extensively** | Checklists not editable in admin (`08:22,:101`); checklist imports with zero steps (`08:44`); media requests have no admin create form (`00:438`); briefless requests "silently dropped" (`00:476`); `Media:` inside a decision block "silently discarded" (`07:207`); `medical:batch` **crashes** on catalogue-resource, subjects and glossary files (`validate-content-batch.mjs:438`). |
| 15 | Limited content-subject IDs conflict with the canonical taxonomy | **TRUE** | Manual fixes 8 IDs (`00:167`); canonical taxonomy is 1,883 nodes in 4 views; 736 live records carried a ninth value `"medical"`; concept IDs use a *third* body-system vocabulary. **No validator enforces the eight** — `simulate-content-import.mjs:213` passes `row.subject` straight through. |
| 16 | Importers silently ignore unknown fields or permit invalid rows | **PARTIAL, split by tool** | `validate-content-batch.mjs` errors on unknown columns for all six kinds it knows. `simulate-content-import.mjs` — *which the manual calls "the gate"* (`00:562`) — has **no unknown-column check anywhere** and enforces none of the question content rules. So a batch failing `medical:batch` can simulate clean. |

**Already fixed upstream** (do not re-plan): article annotations import
(`BLK-01`), concept full-contract upsert (`BLK-02`), relation import
(`BLK-03`), subjects structural import (`BLK-04`), `relatedArticleIds` reaching
the reader (`BLK-05`), callout evidence policy (`BLK-06`/`07`), the
`ImageRecommendation` model (`BLK-08`), evidence import (`BLK-12`).

### 1.4 Two live defects found while auditing

Both are outside this programme's scope. Neither should be fixed inside it.

1. **Every Study Together / challenge / study-room answer is marked wrong.**
   `server/src/publishedQuestions.js:36` computes
   `correctIndex: answers.findIndex((answer) => answer?.correct)`.
   `QuestionAnswerDraft` is `{ label, text, explanation }`
   (`contentControl.ts:18`) — it has **no** `correct` property; correctness
   lives in the sibling `correctAnswer` label, and the client derives it at
   `usePublishedQuestions.ts:38`. So `correctIndex` is always `-1`, and
   `parties.js:477`, `challenges.js:108` and `studyRooms.js:209` all gate on
   `correctIndex >= 0`. (`PracticalAnswerDraft` *does* carry `correct`
   (`contentControl.ts:294`) — the likely source of the confusion.)

2. **The ledger leak** of §1.2, which is in scope, as `READY-01`.

### 1.5 Source corpus inventory

205 files under `/Users/doitrous/Desktop/Kasr Alainy`; 178 PDFs totalling 5,113
pages (exact, via `pdfinfo`); plus 5 JPEG grade screenshots, 1 PNG, 1 RTF and
20 `.DS_Store`. Only `y1` is present — no years 2–5 material.

By priority class:

| Class | Files | Notes |
|---|---|---|
| Orientation | 8 | The strongest scope signal. One is dual-purpose (Radiology X-Ray orientation, 30 p). |
| EOM past papers | 17 | |
| EOY past papers | 43 | Includes `GATHERED`/`MERGED` compilations (50–89 p) spanning several sittings in one PDF. |
| Baqoon (resit) | 6 | Rounds marked in Arabic: الدور الأول / دور تاني / الدور الثالث. Two spellings, `BAQOON` and `BAKOON`. |
| Theoretical department book | 17 | Includes `Department Book Module 101.pdf`, 291 p. |
| Department question/MCQ/practical book | 14 (+3 `[Last priority]`) | |
| Labelled-priority instructor/academy material | 49 | Across `[1st]`…`[5th priority]` folders. |
| Unlabelled supplementary | 11 | Includes 5 administrative grade screenshots. |
| **Excluded — `OLD SYSTEM`** | **1** | `102 INT/2022 102 قديم EOY 2022 PHYSIO OLD SYSTEM.pdf`. The only file bearing the marker. |

Modules present: `101 ISK`, `102 INT`, `103 BMS`, `104 CPS`, `108 INT`, plus a
`2ry Modules` folder. Folders always carry the full module code; filenames are
inconsistent (`103`, `[104]`, `INT-108`, `EPE-130`).

**`NOTE … NOTE` instructions found — all three, exactly as anticipated:**

| Literal text | Path | Meaning |
|---|---|---|
| `NOTE 2 SUBJECTS ARE ANATOMY AND HISTOLOGY NOTE` | `y1/101 ISK/` (empty dir) | Module 101 has exactly two subjects |
| `NOTE 2 SUBJECTS ARE BIOCHEMISTRY AND PHYSIOLOGY NOTE` | `y1/102 INT/` (empty dir) | Module 102 has exactly two subjects |
| `NOTE this is Dr. Galal's final revision pdf use it accordingly NOTE` | filename prefix in `101 ISK/Anatomy Dr. Galal Anatomy [3rd Priority]/` | Condensed final revision, 77 p — deduplicate against the full Galal set rather than extracting independently |

Eleven further empty directories encode the same declaration implicitly:
`103 BMS/{Anatomy,Biochemistry,Histology,Physiology}`,
`104 CPS/{Anatomy,Histology,Physiology}`, `108 INT/{Pathology,Pharmacology}`.
Treated as authoritative subject declarations (assumption `A-04`).

**Year-code vs calendar-year conflicts: 10 found, 8 of them exactly ±1 year.**
This is the one genuinely blocking question — see §8.

---

## 2. Proposed manual changes

Manuals are ~2 days newer than the validators they describe, and several
document behaviour that changes under this plan. The rule for every edit below:
**generate or test the manual against the schema so it cannot drift again**
(`PLAT-TEMPLATE-001` already established this pattern).

| Manual | Change |
|---|---|
| `00-START-HERE.md` | Add the university-source lifecycle and the source-manifest contract. Replace the closed 8-subject list (`:167`) with the canonical taxonomy plus the crosswalk. Document the new `format` column and the written/practical derivation restrictions. Document the module-subject path syntax. Rewrite the "importer ignores unknown keys silently" note (`:88`) once importers are fail-closed. Add the media-reuse-before-request rule. Split lead-orchestrator from worker-agent permissions. |
| `01-subjects-and-topics.md` | Add module-subject trees as an importable structure distinct from the canonical taxonomy; document the department-book chapter/subchapter reproduction rule. |
| `02-concepts.md` | Add `mediaRequests` on concepts; add the structured exam-signal block replacing scalar weights; add source-occurrence locators. |
| `03-relationships.md` | Add the "overlapping but distinct — why not merged" relation and its required rationale field. |
| `04-library-articles.md` | Align with the new media-resolution workflow; note the `Purpose:` rule that the validator does not currently enforce for articles. |
| `05-questions.md` | **Largest change.** Reframe from MCQ-only to format-discriminated. Fix `main_concept` from "exactly one" to "at least one", removing the internal contradiction at `:476`. Add the derivation-permission matrix. |
| `06`–`10` | Align the five practical manuals with the real three-format code model, or with the extended model once it changes. Fix the skills-checklist gaps the manual itself admits. |
| `11-glossary-terms.md` | Note that no validator covers glossary, or remove the gap by adding one. |
| `12-resources.md` | Document the source-manifest linkage and the corpus-ID guard that currently fails open. |
| `CLAIMS.md` | Extend the claim scope to `university · year · module · module-subject · source file · page range · content type · output file`. |
| **New** `13-written-questions.md` | The written-question contract, subparts, marks, derivation restriction. |
| **New** `14-other-assessment-formats.md` | Matching, true/false, completion, labeling, image-based. |
| **New** `15-university-source-orchestration.md` | The end-to-end per-module workflow, agent-neutral. |
| `tools/find-existing.mjs` | Un-hardcode `BATCH_DIRS` so university roots are searched. **This is a correctness fix, not a convenience one** — without it the anti-duplication search silently misses the new roots. |

---

## 3. Architecture and system changes

### 3.1 Private provenance — `READY-01`, blocks everything

Two changes, both required:

1. **Remove `'synapse-admin-content-ledger-v4'` from `STUDENT_READABLE_STATE`**
   and serve students a server-built projection instead — an explicit
   allow-list, mirroring the field selection that
   `usePublishedQuestions.ts:16-52` already performs, moved server-side. Add a
   test that fails if any admin-only key re-enters the readable set, and a test
   asserting the projection's exact key set.
2. **A genuinely server-only provenance store.** Real tables in
   `server/schema.sql` — not an `app_state` blob, because every blob is one
   allow-list mistake away from disclosure:

   - `source_file` — the manifest row (§3.2).
   - `source_occurrence` — concept/content ↔ source file ↔ page ↔ locator.
   - `source_question` — the original question verbatim: format, all subparts,
     choices, marks, source-marked answer, agent answer, conflict flag,
     rationale, confidence, OCR status, extraction agent + version + timestamp,
     transformation link to the student-facing item.

   Reachable only through admin-authenticated routes. No student route joins
   them. Tests assert that.

### 3.2 Source manifest — extend, do not invent

Reuse `uninect-per-file-taxonomy/1.0.0` and
`_coordination/current-taxonomy-progress.json`. They already carry `source_id`,
`source_relative_path`, `source_sha256_before_replacement`, `page_count`,
`languages`, `processing_status`, `coverage_ledger`, `blocked_items`,
`extracted_mcqs`, `validation`, and per-occurrence `page_number` /
`printed_page_label` / `section_or_heading` / `short_support_span`.

Add a Kasr-specific block: `universityId`, `yearId`, `moduleId` (the **exact**
catalogue ID, e.g. `101 ISK`), `moduleSubjectPath`, `rawModuleShorthand`,
`sourceCategory`, `assessmentFormats[]`, `examType`
(orientation/EOM/EOY/Baqoon/department/other), `examSitting`, `bookKind`
(theoretical/question/practical), `folderPriority`, `rawYearCode`,
`calendarYear`, `yearConflict`, `recencyRank`, `solvedStatus`,
`oldSystemExcluded`, `appliedNotes[]`, `duplicateOf[]`, `absolutePath`.

Two fixes to existing tooling:

- `build-corpus-source-index.mjs` and `build-corpus-concept-index.mjs` assume a
  **two-level** tree (`<collection>/<entry>/taxonomy.json`). The Kasr tree is
  four levels deep (`y1/101 ISK/Anatomy Dr. Galal…/MCQs/file.pdf`), so they
  would **silently skip most of it**. Make the walk recursive.
- Both index only `01-explicitly-taught/`, never `02-all-medically-meaningful/`.

Record `OLD SYSTEM` exclusions using the established `blocker_reason` idiom
(new value `superseded_curriculum_old_system`) so the exclusion is auditable
and never silently reconsidered.

### 3.3 Priority representation

Replace the scalar with a structured, separately-inspectable record, and derive
the scalar from it so `adaptive/blueprint.ts` keeps working unchanged:

```
ExamSignal {
  examType        orientation | eom | eoy | baqoon | department | other
  sourceTier      1..7  (the absolute priority hierarchy)
  sitting         first | second | third
  academicYear    normalised calendar year
  rawYearCode     as written in the filename
  appearances     [{ sourceId, page, examType, year }]   // frequency, kept whole
  recencyRank     derived, recomputed — never stored as the only truth
  confidence      0..1
}
```

`recencyRank` and the derived blueprint weight are **computed**, never the only
record. Every input stays inspectable, satisfying the requirement that the
axes not collapse irreversibly.

### 3.4 Question-format model

Add a `format` discriminant to `QuestionAuthoringData`, defaulting to
`mcq_single_best` so all existing content is untouched:

`mcq_single_best` · `mcq_multi` · `matching` · `true_false` · `completion` ·
`labeling` · `image_based` · `short_answer` · `structured_written` · `essay` ·
`comparison_table` · `multipart_written`

Each format needs: a payload type, an import parser, validator rules, an admin
editor branch, a student renderer, grading, and mastery credit. The
derivation-permission matrix is enforced **in the validator**, not left to prose:

- a `structured_written` / `essay` / `multipart_written` / `comparison_table`
  derivative requires a `derivedFrom` pointing at an existing written source
  question;
- a practical derivative requires an existing practical precedent;
- every other format may derive from any non-written, non-practical precedent,
  or from a concept extracted from an exam or a qualified text source.

Also in this workstream: change `validate-content-batch.mjs:165` from `!== 1`
to `< 1`, and fix `primaryConcept()` (`adaptive/item.ts:83`) plus its five
consumers so co-primary concepts all receive mastery evidence.

### 3.5 Module-subject import and tagging

- Persist `ModuleSubjectStore` server-side (it is localStorage-only today, so
  the tree does not survive a different browser).
- Extend the academic importer grammar beyond `# Year` / `## Term` /
  `- Module [ID]` to nested subjects of arbitrary depth.
- Add a `module_subject_path` column to every content batch schema, resolving
  a path like `101 ISK > Anatomy > Upper Limb > Brachial Plexus` to a stable ID.
- **Shorthand resolution:** a folder named `101` must resolve to the existing
  catalogue module `101 ISK` and must never mint a competing module. Preserve
  the raw shorthand as `rawModuleShorthand` on the manifest.

### 3.6 Media

- Add `'concept'` to `MEDIA_REQUEST_OWNER_KINDS` and `mediaRequests` to
  `Concept`.
- Build a **media asset registry** with search by internal name, code, anatomy,
  modality, stain, view and tags — the reuse-before-request step is currently
  impossible because no such index exists.
- Make `MediaRequest.mediaId` actually resolve; nothing reads it today.
- Give `osce` and `case` practical drafts a media field and render it; only
  `lab` can today.

### 3.7 University import roots

`docs/Kasr-Source-Imports` **is an empty, untracked directory** — git does not
track empty directories, so it does not exist in the repository at all. Keep the
existing singular name. Generate scaffolds from a template rather than by hand:

```
docs/Kasr-Source-Imports/
  INDEX.md  manifest/  coverage/  academic/  subjects/  taxonomy/
  resource/ evidence/  concept/   relations/ article/
  question/ written/   practical/ glossary/  media-requests/
```

Same shape for every university in the catalogue (12 exist; only `kau` has
modules). Un-hardcode `tools/find-existing.mjs` so these roots are searched for
duplicates.

---

## 4. Relationship to the existing programme

**Recommendation: this becomes a new phase inside `MASTER-PLAN.md`, not a
competing master plan.** The canonical concept graph is shared; a second plan
authoring into the same store is how duplicate concept trees get created —
exactly what the locked rules forbid.

Concretely: a new `Phase 5 — University source extraction`, with gate
`GATE-SOURCE-001`, and `READY-01`…`READY-08` added to the blocker table. The
19-system Phase 2 continues to own canonical coverage; Phase 5 owns local
curriculum emphasis, exam provenance and university overlays, and feeds
concepts into the same graph under the same `LD-06` in-place-improvement rule.

---

## 5. Execution waves

Bounded deliverables, not time estimates. Each wave ends with committed,
tested, pushed work.

**Wave 1 — Confidentiality (`READY-01`).** Server-side student projection;
ledger removed from the readable set; provenance tables; leak tests. *Nothing
else starts until this passes* — every later wave writes provenance.

**Wave 2 — Manifest and corpus intake.** Manifest schema extension; recursive
index walk; ingest all 205 files; `OLD SYSTEM` exclusion recorded; OCR-required
queue populated; coverage ledger initialised. No medical content.

**Wave 3 — Academic structure.** Server-persisted module subjects; academic
importer extension; `module_subject_path` on every batch schema; shorthand
resolution; `101 ISK` subject tree from the department book's chapters.

**Wave 4 — Assessment model.** `format` discriminant and all formats end to
end; derivation-permission validator; multi-main-concept fix across validator,
`primaryConcept()` and its consumers.

**Wave 5 — Priority and media.** `ExamSignal`; concept-owned media requests;
media asset registry and search; media rendering for `osce` and `case`.

**Wave 6 — Import roots, validators, manuals.** Scaffolds for all universities;
make `simulate-content-import.mjs` fail-closed on unknown columns; fix the
`validate-content-batch.mjs:438` crash on unrecognised kinds; close the two
fail-open corpus guards; un-hardcode `find-existing.mjs`; manuals `00`–`15`
regenerated against the schemas; `CLAIMS.md` scope extension.

**Wave 7 — Readiness gate.** Full test suite, lint, build, parity, simulation,
audit, medical validators. Report and stop.

**Wave 8 — First content deliverable (`101 ISK`), separately approved.**

---

## 6. First-deliverable acceptance criteria — `101 ISK`

Proposed as the first module: it is explicitly named by a `NOTE` instruction,
it has the richest source set (79 files including a 291-page department book,
five EOM papers, fifteen EOY papers and three Baqoon papers), and its two
subjects are declared unambiguously.

Accepted when:

- Every one of its files has a manifest row and a terminal disposition.
- Every page has a disposition — covered, excluded with reason, or queued for OCR.
- Every source question has one of the nine auditable dispositions, with the
  original preserved privately and never published verbatim.
- The Anatomy and Histology subject trees reproduce the current department
  book's chapter/subchapter structure.
- Every concept carries all supporting source occurrences with locators precise
  enough to take an administrator to the right page.
- Every question and teaching item resolves to at least one canonical concept.
- Written and practical content exists wherever a precedent exists, and nowhere
  it does not.
- Media is reused where suitable and precisely requested where not.
- Every item carries `kau` · `KAU_Y1` · `101 ISK` · module-subject path.
- Batches validate, simulate clean, and audit clean; indices updated.

---

## 7. Risks and assumptions

| ID | Assumption taken (conservative, recorded rather than blocking) |
|---|---|
| `A-01` | `[Last priority]` means keep-and-rank-last, not exclude. The three `Old Dpt Anatomy Book` files are retained. |
| `A-02` | The 5 JPEG grade screenshots are administrative; excluded from concept extraction but recorded as excluded-with-reason. |
| `A-03` | `EOY 2019 PHYSIO -102` is treated as a 2019 sitting, flagged for review as possibly pre-reform. |
| `A-04` | The 11 empty subject-named directories are authoritative subject declarations for modules 103/104/108. |
| `A-05` | A document serving two modules is indexed once per source path, with both module tags, per the corpus rule of path independence. |
| `A-06` | `102 INT/102  2024 (1).pdf` has no exam-type marker; type deferred to content inspection during execution. |
| `A-07` | The Desktop corpus lands as a new collection preserving its module structure, rather than merging into the existing subject-organised `corpus/01-explicitly-taught/1. Kasr Alainy Books/`. Both remain, cross-linked by checksum. |

**Risks.** The ledger leak is live in production today and widens with every
batch imported. Another session is editing the same working directory
concurrently, so every wave must re-fetch before pushing. The `format`
discriminant touches the widest surface in the codebase and is the most likely
source of regression; it is deliberately additive with a default.

---

## 8. The one genuinely blocking question

Everything else has a safe conservative assumption. This one does not, because
it silently reorders every priority decision in the programme.

**Batch code or calendar year — which is authoritative for recency?**

Ten filenames carry both, and **eight conflict by exactly ±1 year**:

| File | Batch → implies | Calendar label |
|---|---|---|
| `EOY 195 first 2022 101 ISK final` | 195 → 2021 | 2022 |
| `EOY 196 ISK 101 - WRITTEN 2023` | 196 → 2022 | 2023 |
| `EOM 196 2021 End of Module 102` | 196 → 2022 | 2021 |
| `EOM 196 104 - 2023` | 196 → 2022 | 2023 |
| …and six more | | |

A systematic ±1 is consistent with **batch code = the year the cohort entered**
while **calendar label = the year they sat the exam** — year-1 exams falling in
the following calendar year. If that is right, the supplied mapping
(200 = 2026 …) is off by one for exam-sitting purposes, and "latest three
years" and "latest five final-exam years" select the wrong papers throughout.

Two of the eight are separately explainable (a third-round Baqoon for batch 197
genuinely sat in 2024; a second-round for 198 sat in 2025), which is itself
evidence for the entry-vs-sitting reading.

I can proceed either way, but not undo it cheaply once concepts carry
recency-derived priority.
