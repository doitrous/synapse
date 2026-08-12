# Claude prompt · Resumable medical-library programme plan

Copy the prompt below into Claude Code with this repository as its working
directory.

---

You are planning a multi-session medical-library programme for Synapse, an
undergraduate medical-learning platform for Egyptian medical students. Work in:

`/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse`

Your task in this run is to inspect the live repository and the two local
reference corpora, then create or update a durable Markdown control plane for
the programme. Produce a master plan and detailed plan for every system. Make
the work resumable across Claude sessions, with progress, decisions, evidence,
blockers, completed work, and the exact next action recorded.

## Important boundary for this run

This is a **planning and documentation run only**.

- Do not author, rewrite, import, publish, or delete medical articles, concepts,
  Qbank questions, or practical questions in this run.
- Do not change product code in this run.
- You may run read-only inspections, audits, validators, searches, and counts.
- Plan all required implementation and content work in executable detail.
- At the end, the next session must be able to open the master Markdown file and
  continue without relying on this conversation.

## Required planning files

Use this as the single source of truth:

`docs/medical-library-program/MASTER-PLAN.md`

Create detailed system plans under:

`docs/medical-library-program/systems/`

If an equivalent current plan already exists, update and reconcile it instead
of starting a competing plan. The master plan must remain authoritative and
link to every system plan. Preserve completed tasks, decisions, identifiers,
and historical notes when updating an existing plan; do not erase history.

Create one detailed file for each of the following 19 canonical Systems &
General roots, in this order:

1. `SYS-FND` — Foundations & General Principles
2. `SYS-DEV` — Human Development & Life Stages
3. `SYS-CVS` — Cardiovascular System
4. `SYS-RES` — Respiratory System
5. `SYS-REN` — Renal & Urinary System
6. `SYS-GIT` — Gastrointestinal, Hepatobiliary & Pancreatic
7. `SYS-END` — Endocrine & Metabolic System
8. `SYS-NEU` — Nervous System & Special Senses
9. `SYS-MSK` — Musculoskeletal System
10. `SYS-HEM` — Blood & Lymphoreticular System
11. `SYS-IMM` — Immune System
12. `SYS-INF` — Infection & Tropical Medicine
13. `SYS-OBS` — Pregnancy, Childbirth & Puerperium
14. `SYS-GYN` — Female Reproductive System & Breast
15. `SYS-AND` — Male Reproductive System
16. `SYS-PSY` — Behavioral Health
17. `SYS-DER` — Skin & Subcutaneous Tissue
18. `SYS-MUL` — Multisystem Processes, Emergencies & Critical Care
19. `SYS-POP` — Population Health, Evidence & Social Sciences

The four-view canonical architecture remains authoritative:

- Systems & General (`SYS-*`)
- By Discipline (`DIS-*`)
- Clinical Skills (`SKL-*`)
- Clinical Knowledge (`KNW-*`)

These are placements, not copies. Each article or concept is canonical once and
may have reviewed secondary placements across the other views. The 19 systems
are the execution spine, but the plan must cover **all academic and basic
medical knowledge across every system and discipline** appropriate to the first
three to four years of medical school. Do not limit the programme to the eight
subjects currently exposed by the runtime student tree.

## Read these sources before planning

Inspect the implementation, not only the possibly stale overview documents.
Use the complete documentation directory as a reference source:

`/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/docs`

In particular, use the article, article-archetype, concept, taxonomy, question,
and practical templates there as completeness checklists and consistency
contracts. They are a starting point, **not a ceiling**: do not limit the plan,
article catalogue, concept model, relationships, evidence, teaching features,
or bulk-import coverage to only the fields or examples currently mentioned in
those templates. Inspect the live types, editors, importers, readers, generated
data, and validated source material for additional applicable fields and useful
capabilities. Where documentation omits a live field, include it and plan to
update the documentation. Where documentation conflicts with implemented code
or an approved programme decision, record the discrepancy, determine the
intended contract, and plan a safe reconciliation rather than silently choosing
one.

At minimum read and reconcile:

- `docs/authoring/README.md`
- `docs/authoring/subjects-and-topics.md`
- `docs/authoring/library-article.md`
- `docs/authoring/library-article-archetypes.md`
- `docs/authoring/concept.md`
- `docs/authoring/question.md`
- `docs/authoring/practical.md`
- `docs/medical-library-taxonomy-review.md`
- `docs/cardiovascular-pilot-field-audit.md`
- `src/data/contentControl.ts`
- `src/data/conceptGraph.ts`
- `src/data/medicalEvidence.ts`
- `src/data/articleTemplates.ts`
- `src/data/curriculumCatalog.ts`
- `src/data/medicalLibraryTaxonomy.ts`
- `src/data/taxonomyCrosswalk.ts`
- `src/data/taxonomyStore.ts`
- `src/data/bulkImport.ts`
- `src/pages/admin/SubjectsImportPage.tsx`
- `src/pages/admin/ConceptsImportPage.tsx`
- all five relevant admin editors and import surfaces
- `src/lib/useLiveLibrary.ts`
- `src/pages/student/Library.tsx`
- `scripts/audit-medical-content-fields.mjs`
- `scripts/validate-authoring-contract.mjs`
- `scripts/validate-reviewed-medical-taxonomy.mjs`
- `server/data/medical-library-v1.json`

Inspect both local reference corpora:

1. AMBOSS archive:
   `/Users/doitrous/Documents/Amboss`

   Start with `hierarchy.json`, `articles.jsonl`, the reconciliation report, and
   the archive documentation. Use the SQLite data only when it answers a
   specific unresolved question.

2. University resource digestion:
   `/Users/doitrous/Downloads/Resources Digestion Current aug 7`

   Start with `_blueprint_work/library_analysis.json`,
   `_coordination/current-taxonomy-progress.json`, and completed
   `01-explicitly-taught/**/taxonomy.json`, `provenance.json`, and
   `coverage.jsonl` artifacts. Distinguish completed, review-required, pending,
   retracted, blocked, OCR-dependent, and low-confidence material. A source not
   yet processed is not evidence that a topic is absent.

Record a dated baseline in the master plan: current branch/commit, working-tree
state, validator results, taxonomy counts, article/concept/relation counts,
status and publication-gate counts, source-corpus readiness counts, and any
discrepancies between code, generated data, and documentation. Recompute these
figures; do not blindly repeat numbers from this prompt.

## Locked programme decisions

Treat these as user-approved decisions. Put them in the master plan's locked
decision register.

1. Deliver a master plan plus a detailed plan for every system.
2. Use all 19 canonical system roots as the coverage and execution spine.
3. Cover all academic and basic medical knowledge across all systems and
   disciplines for medical students in approximately Years 1–4.
4. Do not force one article onto every taxonomy node. Topic and subtopic nodes
   may be honest navigation hubs. Create atomic articles for distinct,
   reusable, studiable units, plus overview articles only where they add real
   teaching value.
5. Begin execution with a platform-readiness phase. No taxonomy refinement or
   content authoring may begin until its blocking acceptance criteria pass.
6. Preserve stable existing IDs and evidence lineage. Improve records in place.
   Merge, redirect, deprecate, or remove only with a documented migration and
   impact analysis; never overwrite or delete silently.
7. Claude may mark sufficiently verified, low-risk material `Published` after
   it passes the documented evidence and projection gates. Treatment, dosing,
   procedure, emergency, recommendation, and time-sensitive material must obey
   the repository's stricter review policy and must not bypass required faculty
   review merely because extraction confidence is high.
8. Source hierarchy: the university corpus establishes local curriculum and
   exam emphasis; AMBOSS is a structural gap-check only; current authoritative
   web sources verify medical facts. High-risk claims require stronger and
   current corroboration.
9. Execute in the 19-system order listed above.
10. Plan the future Qbank and practical programme now, and leave explicit
    assessment-needs notes, but do not author, import, update, or publish any
    Qbank or practical content until the Library Completion Gate has passed.

## Phase 0 — platform readiness is a hard blocker

The first executable phase must make the platform capable of receiving the
planned content without losing fields or relationships. Nothing in the taxonomy
or library content phases may start until this phase is complete.

### 0A. Full bulk-import field parity

Create a field-parity matrix for each of:

- Subjects & Topics
- Library articles
- Concepts and typed concept relationships
- Qbank questions
- Practical questions/items

For **every persisted or admin-editable field**, trace:

`data type/model → admin editor → import schema → parser → validation →
create/update merge semantics → persistence/API → consumer/published projection →
automated test → authoring documentation`

Plan implementation so every such field can be populated and updated through
bulk import. This includes nested arrays, structured blocks, relationships,
governance/evidence fields, scope and placement, aliases and Arabic fields,
stable IDs, annotations, attachments/media metadata, per-answer explanations,
and intentional-empty `fieldNotes`. Do not silently ignore unknown columns or
drop unsupported values.

Required behaviours:

- Stable-ID upsert/update mode and create-only mode.
- Explicit replace, append, and clear semantics for lists and nested objects.
- Partial updates must not erase existing nested data accidentally.
- Referential validation before commit, with actionable row-level errors.
- Resumable batches and an import journal.
- Dry-run/full preview and machine-readable results.
- A round-trip fixture for every content type containing **every field**; after
  import, deep equality (apart from documented generated metadata) must pass.
- Tests for Markdown, CSV, and XLSX mapping where the formats differ.
- The authoring templates and importer examples must be generated from or
  validated against the actual schema so they cannot drift silently.

The current "Tag selected statement" editor feature is specifically blocked:
bulk article import currently initializes `annotations` as empty. Plan and test
an import syntax that can populate every annotation field (`id`, exact quote,
canonical concept ID, relation, and block), validates that the quote occurs in
the stated article block, validates the referenced concept and relation type,
and preserves annotations during update imports. This capability must ship
before article authoring starts.

Subjects & Topics import must support the full editable structural contract,
including stable IDs/upserts, titles, level-specific metadata, system short
labels and colours, cross-references, canonical crosswalk effects, and safe
rename/move impact reporting. It must not merely create a five-column title
path.

Concept import must cover the complete `Concept` contract plus typed relations,
not only labels, placement, definition, pitfalls, and a few weights.

Library import must cover the complete `ArticleAuthoringData` contract, including
related articles, annotations, publication/evidence governance, published
projection fields, image recommendations, and field notes.

Question and practical import capability is upgraded during platform readiness,
but no question or practical **content** is created or changed before the
Library Completion Gate.

### 0B. Admin-only image recommendations

Plan a first-class image/visual recommendation model rather than misusing an
incomplete student media record. The recommendation must be editable and
filterable in the admin dashboard, bulk-importable, and absent from every
student-facing projection until an admin supplies approved media.

At minimum plan fields for:

- stable recommendation ID and article ID
- visual type/brief (diagram, anatomy plate, histology, flowchart, graph,
  comparison table, imaging example, algorithm, etc.)
- exact teaching purpose and why prose is insufficient
- recommended article section/block and optional exact anchor quote
- priority: required / strongly helpful / optional
- status: needed / planned / supplied / declined
- admin notes, suggested source direction, and rights/licensing notes
- linked final media ID when fulfilled

Add admin coverage views so a person can filter outstanding recommendations by
system, article, priority, and status. Explicitly test that recommendations
never appear in the published article, HTML, search data, or student API/state.

### 0C. Fix student-facing connections and teaching callouts

Plan and test these known gaps before content work:

1. Related-article IDs are authored and described as student-facing, but the
   live-library projection/reader does not currently carry and render them.
   Add a useful related-reading surface with valid deep links, de-duplication,
   evidence/publication filtering, and no dead IDs.

2. Evidence-gated articles currently suppress authored `loseTheMark` entries
   and may show generic fallback traps. Fix the evidence/publication projection
   so reviewed, verified "Where people lose the mark" content survives the gate
   and appears to students. Apply the same explicit projection policy to
   `holdThese`.

   Do not solve this by exposing unverified text. Plan a safe representation or
   evidence link for each publishable callout. Add automated reader-level tests
   proving that:

   - the exact reviewed authored trap is visible after publication;
   - generic fallback text is not substituted when authored published traps
     exist;
   - unverified draft traps remain hidden;
   - "Hold these" follows the same stated evidence policy;
   - the admin can see why a callout is or is not publishable.

3. Statement annotations must have a meaningful student or graph consumer
   where appropriate. Define which annotations create inline concept affordances,
   which remain admin metadata, and how publication filtering works. Do not show
   raw IDs or editor-only metadata to students.

### 0D. Readiness acceptance gate

Define exact tests and commands. At minimum retain and extend:

- `npm run medical:validate:authoring`
- `npm run medical:validate:taxonomy`
- `npm run medical:audit`
- unit/integration tests for import round trips and the student reader
- typecheck/build/lint tests appropriate to changed files

The master plan must state unambiguously: **no taxonomy or medical-content
execution begins until every Phase 0 blocker is closed and its evidence is
linked in the plan.**

## Phase 1 — validate and refine the structure against AMBOSS

Compare both Synapse trees with the local AMBOSS hierarchy:

- Canonical taxonomy: 19 systems plus discipline, skills, and knowledge views.
- Student runtime curriculum tree and its crosswalk to the canonical taxonomy.
- AMBOSS hierarchy nodes, article placements, related links, and unique article
  catalogue.

Do not copy AMBOSS blindly. Do not adopt its US-specific level, naming, roots,
filters, later-career guides, osteopathic branch, CME structure, or article
granularity merely because they exist. AMBOSS is a comparator, not the source
of truth.

For every candidate difference, classify it as one of:

- genuine undergraduate gap to add
- useful rename or split
- merge/de-duplication
- move of canonical home
- secondary placement or cross-reference
- alias/spelling variant
- metadata/filter, not a node
- outside Years 1–4 scope
- AMBOSS-specific and rejected
- already covered under a different Synapse label
- unresolved; requires qualified curriculum or faculty evidence

Every proposed structural change must include the existing node, proposed
change, rationale, source(s), affected IDs/records, migration plan, crosswalk
impact, student-navigation impact, and rollback strategy. Preserve the current
anti-redundancy decisions: one canonical item, one primary home, secondary
placements rather than copies, university curricula as overlays, and meaningful
labels rather than facets such as "core", "applied", "common", or "rare".

The structure output must include:

- current-vs-AMBOSS crosswalk and disposition ledger
- gap list with confidence and evidence
- proposed taxonomy patch batches
- runtime-tree expansion plan from 8 subjects toward full 19-system coverage
- ID migration/redirect map
- acceptance criteria and regression checks

No structure is changed during this planning run.

## Phase 2 onward — article and concept programme

Plan autonomous, system-by-system execution after Phase 0 and the taxonomy
review are approved.

### Sources and truth policy

- Treat AMBOSS as a structure and coverage comparator. Do not copy its prose,
  tables, proprietary media, or hierarchy wholesale. Do not use it as the sole
  factual authority.
- Treat completed local university taxonomy artifacts as curriculum and exam
  signals plus candidate evidence. Preserve their source-relative path,
  resource ID/hash, exact locator, support span, confidence, uncertainty, and
  processing/review state. Do not treat extraction confidence as medical
  verification.
- Do not rely on pending, retracted, blocked, OCR-dependent, unreadable, or
  review-required records as verified evidence. Record them as coverage risks.
- Research the web freely where it is more efficient or needed. Prefer current
  primary and authoritative sources: official guidelines and public-health
  bodies, recognised professional societies, current consensus documents,
  peer-reviewed reviews, authoritative open textbooks, and Egyptian/regional
  sources where local epidemiology, availability, or policy matters.
- Record URL, title, publisher/body, publication/update date, access date,
  jurisdiction, and exact claim/section supported.
- Independently corroborate treatment, dosing, emergency, procedure,
  recommendation, and time-sensitive claims. Record conflicts instead of
  silently choosing a source.
- Never invent a fact, citation, locator, ID, review, or source.
- Use British medical spelling and write for revising medical students, not
  specialists.

### Article catalogue rules

Do not create an article for every taxonomy node mechanically. For every node,
decide whether it is:

- navigation-only hub
- overview article
- atomic article home
- secondary placement only
- empty but legitimate planned destination

An article must be a distinct studiable unit. Apply one of the 10 existing
archetypes and its exact section contract. Split genuinely mixed archetypes;
merge duplicate articles. Preserve stable IDs when updating current articles.

Every planned article must account for all relevant site fields and features,
including:

- identity, aliases, Arabic/title policy, language and learner stage
- template/archetype and complete required sections
- canonical primary and secondary placements
- university/year/module scope and university-specific notes
- complete readable prose and safe published projection
- `holdThese` and `loseTheMark`, each specific, useful, and evidence-governed
- exact statement annotations using "Tag selected statement" for definitions,
  mechanisms, relationships, contrasts, and other statements that should stand
  out or connect to a canonical concept
- related concepts and reciprocal links
- related articles and a reason for each connection
- resource IDs, article-level sources, claims, stable spans, citations,
  evidence basis, conflicts, gaps, freshness, review dates, and publication gate
- admin-only image recommendations wherever a visual is required or materially
  improves understanding
- question/practical coverage **notes only** until the Library Completion Gate

Do not add decorative image recommendations. Flag visuals particularly where
spatial anatomy, histology, embryology, pathways, mechanism sequences, graphs,
tables, algorithms, imaging, morphology, or physical-examination findings are
hard to understand reliably from prose alone.

### Concept and relationship rules

Concepts are the smallest assessable objectives, not article headings. Plan
canonicalisation before minting a new concept. Preserve provenance and merge
lineage across the large local candidate corpus.

Every concept must have reciprocal article links and account for its complete
model, including aliases, reviewed Arabic fields, definition, explicit
objective, type, placement, scope, weights with honest confidence, pitfalls,
sources, claims, occurrences, conflicts, uncertainty, evidence gaps,
governance, publication state, and intentional-empty reasons.

Build useful typed relationships within and across systems. Prioritise:

- prerequisites and learning order
- part/whole and anatomy/spatial relationships
- mechanism sequences
- causal, increasing, decreasing, and regulatory relationships
- presentation, diagnosis, investigation, treatment, contraindication,
  complication, and differential relationships
- contrasts and `often_confused_with`
- cross-system connections that help a student transfer a mechanism

Do not create graph noise. Each edge must be meaningful, directed correctly,
deduplicated, and evidence-governed. A relation is `verified` only when its
claim-and-citation chain passes validation.

### Existing content

Inventory every existing article, concept, relationship, annotation, placement,
source, and publication state before proposing new records. For each current
record choose: keep, enrich, correct, merge, split, redirect, deprecate, or
exclude. State why. Preserve stable IDs and references whenever possible. Plan
repair of current anomalies such as records outside the current subject-ID
contract rather than assuming they are valid or deleting them.

## Required detail in each system plan

Every system plan must be executable, not a generic checklist. Include:

1. Scope, learner years, prerequisites, and cross-system dependencies.
2. Current canonical and runtime taxonomy inventory.
3. AMBOSS comparison dispositions relevant to this system.
4. Local university-source coverage and readiness map.
5. Taxonomy changes and migrations, if any.
6. Existing content disposition ledger.
7. Planned article catalogue: update/new/merge/split/hub, archetype, primary and
   secondary placement, prerequisites, source plan, visual need, and acceptance
   criteria.
8. Planned concept batches and canonicalisation/merge approach.
9. Planned within-system and cross-system relationship batches.
10. Statement-annotation plan and relationship-to-article plan.
11. Evidence and publication strategy, including high-risk/time-sensitive work.
12. Admin-only image recommendation inventory.
13. Future Qbank/practical coverage notes only—no stems, options, station briefs,
    mark schemes, or assessment records yet.
14. Batch sequence, dependencies, risk, estimated scale, validation commands,
    completion criteria, and rollback/recovery notes.
15. A precise "Start here next" task.

## Library Completion Gate

Define a measurable gate that must pass across all 19 systems and all discipline,
skills, and knowledge placements before assessment authoring begins. It must
include at least:

- approved taxonomy/crosswalk with no structural validator errors
- every in-scope node classified as hub/article/placement/legitimate empty state
- all planned atomic and overview articles complete or explicitly excluded with
  rationale
- every article satisfies its archetype and complete field contract
- all concepts are canonicalised, non-orphaned, and reciprocally linked
- relationship coverage meets defined usefulness thresholds, with no broken IDs
- every student-visible medical span and callout passes its evidence policy
- "Hold these" and "Where people lose the mark" publish correctly
- statement annotations and related-article connections function end to end
- admin-only image recommendations exist where needed and never leak to students
- publication status and remaining faculty-review queues are explicit
- content, taxonomy, authoring, import, reader, typecheck, and build tests pass
- unresolved source gaps, conflicts, and blockers are documented rather than
  hidden

Only after the master plan records this gate as passed may the next programme
begin authoring Qbank and practical content. Until then, assessment work is
limited to coverage counts, intended concept targets, proposed formats, and
dependency notes in the plan.

## Resumability and progress-control contract

The master plan must make context loss harmless. Include these sections at the
top:

1. **Current state** — overall status, active phase, active system, active task
   ID, last verified commit, last update time, and whether the worktree was
   clean.
2. **Start here next** — one exact next task, required files, commands, expected
   output, and stop condition.
3. **Locked decisions** — the 10 decisions above plus later approved decisions.
4. **Hard gates** — Phase 0, taxonomy approval, per-system completion, Library
   Completion Gate, assessment-authoring gate.
5. **Programme progress table** — every phase and system with status, counts,
   blockers, plan link, latest evidence, and next task.
6. **Baseline and target metrics** — totals and coverage denominators, not only
   percentages.
7. **Blockers and open questions** — owner, impact, evidence, workaround, and
   required decision.
8. **Decision log** — append-only, dated, with rationale and affected tasks.
9. **Change/progress log** — append-only summaries of completed sessions,
   commits, validations, outputs, and follow-up work.
10. **Recovery protocol** — how to resume after an interrupted import, failed
    batch, partial migration, changed source, or stale generated artifact.

Use stable task IDs such as `PLAT-IMPORT-001`, `TAX-COMPARE-001`,
`SYS-FND-ARTICLE-001`, and `GATE-LIBRARY-001`. Each executable task must record:

- status: Not started / In progress / Blocked / Done / Superseded
- objective and non-goals
- dependencies
- exact files/data touched
- safe batch boundary
- acceptance criteria
- validation commands
- output/evidence paths
- rollback/recovery method
- completion date and commit when done
- next task ID

Do not mark a task done because files were changed. Mark it done only when its
acceptance checks pass and evidence is linked. Keep only one content batch per
agent/session unless the plan proves the batches are independent and safe.

At the start of every future session, the plan must instruct the agent to:

1. Read the master plan and the active system plan.
2. Inspect `git status` and preserve unrelated user changes.
3. Re-run the active task's baseline checks if inputs may have changed.
4. Update the task to `In progress` before execution.
5. Work only to the stated batch boundary.
6. Run acceptance tests.
7. Update counts, evidence, logs, status, and "Start here next" before stopping.

## Planning quality requirements

- Base the plan on observed code and data. Label every inference.
- Resolve contradictions between docs and implementation explicitly.
- Separate verified fact, source-derived candidate, editorial judgement, and
  unresolved question.
- Prefer machine-generated inventories and diffable manifests over prose-only
  claims.
- Make batch sizes small enough to validate and resume safely.
- Include estimates as ranges with assumptions; do not invent false precision.
- Do not hide infeasible scale. Show totals, sequencing, automation strategy,
  review queues, and the human decisions that remain necessary.
- Never equate "generated" with "verified" or "published".
- Do not make this a schedule based on imaginary person-days. Make it an
  dependency-aware execution plan with measurable gates.

## Required final response for this run

After creating/updating the planning files, respond concisely with:

1. The master-plan path and system-plan directory.
2. The recomputed baseline and the most important discrepancies found.
3. The Phase 0 blockers that prevent content authoring today.
4. The first executable task ID and why it is first.
5. Every unresolved question that genuinely requires the user; do not ask about
   decisions already locked above.

Do not include or generate medical content, assessment questions, or practical
stations in this planning run.
