# P0-D — validator compatibility probe

Lane P0-D checked whether the shared toolchain (`medical:batch`,
`medical:simulate`, `medical:audit`, `find-existing.mjs`, `mint-concept-id.mjs`,
`check-id-stability.ts`) treats `au` / `AU_Y1` / `MED 102` as a first-class
university, and where the cross-lane collision risks actually live. Every
finding below is backed by a command run in this worktree; nothing is read
from the code alone. All probe files live in the session scratchpad
(`.../scratchpad/probe/`) and were never committed. No live file was ever
written — every `medical:simulate` run used `--emit /tmp/sim-AU-*.json`, a
copy, and `server/data/medical-library-v1.json` was never touched (`git
status` on it stayed clean throughout).

**Module-ID note:** the orchestrator ruled mid-probe that AU module IDs are `AU-<CODE>`
(e.g. `AU-MED-102`), not the bare `MED 102` LANE-BRIEF §1 originally showed. That ruling
landed after most of this probe's runs were already finished and clean, and none of them
needed redoing — every finding below about *whether* `modules`/`universities` are validated
holds for any string, since nothing in the toolchain checks the string's shape or contents
either way (see Q2, Q6). The probes below that used the pre-ruling bare form (`MED 102`,
never `AU-MED-102`) are: `probe/academic/au-modules-probe.md`,
`probe/concept/AU-VALIDATOR-PROBE-concept.md`, `probe/article/AU-VALIDATOR-PROBE-article.md`,
`probe/question/AU-VALIDATOR-PROBE-question.md`, `probe/concept/q3a-full-collide.md`,
`probe/concept/q3a-sparse-collide.md`, `probe/concept/placement-error-probe.md`. (Kasr's own
real content in Q3b/Q3c legitimately keeps its own bare `102 INT` convention — that is
Kasr's module-ID shape, not AU's, and was never mine to change.) `q6-wrong-module.md` used
the intentionally-invalid `MED 999-DOES-NOT-EXIST`, which stays invalid under either
convention and needed no change. Every probe run **after** the ruling landed (the priority
section immediately below) uses `AU-MED-102`.

---

## PRIORITY — an update row for an ID that is not live anywhere yet

The blocking question: what does the sparse *update* form (`## id` + `## label` + `+`-append
fields, the form Q3a proved safe against a **live** collision) do when the `## id` it names
is **not live**, and exists only in **another lane's own unimported batch, in a different
folder**? Two orders, both run for real.

Used the same real, currently-pending Kasr concept as Q3b:
`CON-GIT-9589A7077392FD` (`cellulose-dietary-importance`,
`docs/Kasr-Source-Imports/concept/102-INT-concepts.md`; confirmed earlier not present in the
1,718 live concepts, `docs/import-ready`, or `docs/questions-import-ready`). Wrote one AU
sparse update row, `probe/q3b/au-sparse-update.md`:
```markdown
# Item
## id
CON-GIT-9589A7077392FD
## label
Cellulose is undigestible because its glucose units are joined by β1,4 bonds, so it acts as dietary bulk that prevents constipation and delays fat absorption
## universities
+au
## modules
+AU-MED-102
```

**Order (i) — the other lane's batch applied first, mine second, in one `medical:simulate` run:**
```
npm run medical:simulate -- probe/q3b/kasr-pending-extract.md probe/q3b/au-sparse-update.md \
  --emit /tmp/sim-AU-probe-q3-scenario-i.json
```
```json
"batches": [
  {"file": ".../kasr-pending-extract.md",  "kind": "concept", "created": 1, "updated": 0},
  {"file": ".../au-sparse-update.md",      "kind": "concept", "created": 0, "updated": 1}
],
"delta": {"concepts": 1, ...}, "errors": []
```
Stored record (verbatim, key fields): Kasr's full record survives completely intact —
`definition`, `pitfalls`, `articleIds: ["ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE"]`,
`examSignal`, `atomicClaimIds`, every `fieldNotes` entry — and the only two fields my sparse
row touched are additive:
```
universityIds: ["kau", "au"]
moduleIds:     ["102 INT", "AU-MED-102"]
```
This is the safe case: applying the creating batch and the update in the same run, in the
right order, works exactly as the manual's pattern promises, even though `CON-GIT-9589A7077392FD`
is not live anywhere — it only exists in this run's own in-memory state, built up file by file.

**Order (ii) — my update row applied ALONE, with the id absent from live state and from this
run entirely otherwise:**
```
npm run medical:simulate -- probe/q3b/au-sparse-update.md --emit /tmp/sim-AU-probe-q3-scenario-ii.json
```
```json
"batches": [
  {"file": ".../au-sparse-update.md", "kind": "concept", "created": 1, "updated": 0}
],
"delta": {"concepts": 1, ...}, "errors": []
```
**`created: 1`, not rejected, not skipped, no error, no warning.** The simulator cannot tell
"this ID is new, mint away" from "this ID belongs to a concept that already has a real
author elsewhere, and I just haven't seen their file in this run" — both look identical:
`created: 1`, `errors: []`. The stored record it materialises (verbatim, in full):
```json
{
  "id": "CON-GIT-9589A7077392FD",
  "label": "Cellulose is undigestible because its glucose units are joined by β1,4 bonds, so it acts as dietary bulk that prevents constipation and delays fat absorption",
  "aliases": [], "arabicLabel": null, "arabicAliases": null,
  "definition": "", "pitfalls": null, "status": "under review",
  "articleIds": [], "relatedConceptIds": null,
  "approvedFileResourceIds": null, "approvedVideoResourceIds": null,
  "secondaryNodeIds": null,
  "universityIds": ["au"], "moduleIds": ["AU-MED-102"],
  "resourceOccurrenceIds": null, "mergeIds": null, "rejectedMergeCandidateIds": null,
  "conflicts": null, "uncertainty": null, "evidenceGaps": null,
  "lastReviewed": null, "reviewDue": null, "exclusionReason": null,
  "systemId": null, "topicTagId": null, "subtopicId": null,
  "microtopicId": null, "nanotopicId": null
}
```
Note what is **missing entirely**: `canonicalKey` is not even a key on this record — because
my sparse row never mentioned it, and `materialiseNewConcept` only defaults fields it has an
explicit default for; `canonicalKey` is not one of them. A garbage stub now sits live (in the
emitted state) under the exact same ID Kasr's real batch will eventually claim, holding none
of Kasr's content and no way to identify what idea it is even supposed to be, beyond the
retyped label.

**Downstream, `medical:audit` does catch this — but only because the stub is so empty:**
```
npm run medical:audit -- --source /tmp/sim-AU-probe-q3-scenario-ii.json   # filtered to this id
→ 36 errors: concept.canonicalKey missing, concept.definition missing, concept.subjectId
   missing, concept.primaryNodeId missing, concept.owner missing, ... (24 populated-field
   misses plus 12 "blank without an explicit reason" lines)
```
None of those 36 errors says anything like "this ID already exists elsewhere" or "possible
duplicate" — the audit catches it exactly the way it would catch any genuinely new,
under-authored concept, by volume of missing fields. **If a lane responded to this by
filling in the missing fields with a plausible new definition** (reasonably believing they
were finishing a legitimately new concept, since nothing told them otherwise) **the record
would eventually look complete, pass every gate, and only reveal the collision the day
someone imports Kasr's real, independently-authored `102-INT-concepts.md` batch** — at which
point Q3a's and Q3b's overwrite mechanics apply: whichever import runs second replaces every
field the other side specified, unmarked and unannounced (a plain, non-`+` `universities:
kau` in Kasr's real batch would silently evict `au` from the list the same way Q3a's full
record evicted `kau`).

**Also ran `medical:batch` on the sparse row alone**, for completeness — it reports the
ordinary "judges every record as new" errors (no definition, no explicit objective, no
Arabic label) and, being directory-scoped, has no way to know a same-ID batch exists in a
different folder either.

**Conclusion — this is the single most important finding of the whole probe.** There is no
gate anywhere in this toolchain — not `medical:batch` (directory-scoped by design), not
`medical:simulate` (the only thing standing between "update" and "duplicate" is whether the
other lane's file happens to be *in this same simulate invocation*), not `medical:audit`
(catches emptiness, never catches "this ID belongs to someone else's plan") — that can tell
an author their sparse "update" row just minted a fresh, near-empty stub under an ID that
another lane already owns in an unimported batch. The only real defence is procedural, not
tooling: **before writing a sparse update row for any ID, confirm with a live grep
(`grep -rn "<id>" docs/*-Source-Imports/`) that the ID is either genuinely live, genuinely
absent everywhere, or that you have the other lane's batch file in hand to run alongside
yours in the same `medical:simulate` invocation** — never assume "the ID would resolve if
it existed" is a check anything actually performs.

---

## Q1 — Where does `medical:simulate` get "live state" from?

**Command:**
```
grep -n "sourceFile = option" scripts/simulate-content-import.mjs
ls -la server/data/medical-library-v1.json
git log -1 --format="%ad %s" -- server/data/medical-library-v1.json
git status --porcelain -- server/data/medical-library-v1.json
```
**Output (trimmed):**
```
const sourceFile = option('source') ?? 'server/data/medical-library-v1.json'
-rw-r--r-- 1 doitrous staff 47068003 Aug 22 17:47 server/data/medical-library-v1.json
Wed Aug 12 09:53:53 2026 +0300 Ask the corpus what it teaches, and give all 19 systems a student route
(git status: clean — no diff)
```
It is a **committed JSON fixture**, `server/data/medical-library-v1.json` (45 MB, tracked
in git), not a database snapshot or an API call. `server/src/index.js:75` (`LAUNCH_DATA_PATH`)
reads the same file and exposes it only through a `/api/launch/medical-library-v1/preview`
endpoint that is explicitly "read-only launch preflight" and "never changes production
data" — promoting it to the real `app_state` table is a separate, owner-approved migration
step (the file's own header comment says the same: "promoting it is a separate,
owner-approved migration"). So the file is exactly as current as the last commit that
regenerated it — **11 days old** relative to today (2026-08-22), last touched by commit
`c6e6069` on 2026-08-12. `scripts/build-medical-library-v1.mjs` is what regenerates it, from
an external bundle path (`MEDICAL_BUNDLE_PATH`, defaults to a path outside this repo), not
from a live DB query — so if anyone applied a migration to the real `app_state` table
without re-running that build script and committing the result, this fixture would be stale
relative to true production state, and every lane's `medical:simulate` gate would be
checking against the stale copy without any way to detect the drift.

**Conclusion:** `medical:simulate`'s "live state" is a periodically-regenerated, committed
JSON export, not a live DB read — treat a green simulate as "matches the fixture as of its
last commit," not "matches production right now."

---

## Q2 — Does the toolchain accept `au` / `MED 102` / `AU_Y1` with no static catalogue entry?

Confirmed the premise first: `src/data/universities.ts:178` —
`{ id: 'au', name: 'Alexandria University', short: 'AU', region: 'Alexandria', years:
buildYears('AU') }` — no `withModules(...)` call, unlike `kau` on line 176. So `au` has
year IDs (`AU_Y1..AU_Y5`, `AU_INT1/2`) but zero static modules today.

Built a full authoring set in the scratchpad: `probe/concept/AU-VALIDATOR-PROBE-concept.md`
(minted `CON-GIT-03B28143B66C8B` via the manual's tool, `universities: au`, `modules: MED
102`, `module_subject: MED 102 > Biochemistry > Carbohydrate Digestion`), an article
teaching it (`ART-GIT-AU-PROBE-SALIVARY-AMYLASE`, `universities: au`, `years: AU_Y1`,
`module: MED 102`), and one MCQ testing it (`Q-AU-PROBE-SALIVARY-AMYLASE-01`, same fields).

**medical:batch, one file at a time (real errors only — university/module fields never
appear):**
```
concept  → 0 errors (fieldsUsed 31)
article  → 0 errors, after two authoring fixes (see below)
question → 2 errors:
  "main_concept CON-GIT-03B28143B66C8B is not a concept that exists"
  "library_ids ART-GIT-AU-PROBE-SALIVARY-AMYLASE is not an article that exists"
```
Both question errors are the **documented "does not exist for live records" class** from
`00-START-HERE.md` §8: `medical:batch` is directory-scoped and resolves IDs only against
sibling files in the same folder. My concept/article/question sit in three different
scratch subfolders, so the question file cannot see them — this is expected, not a defect,
and it is not about `au`/`MED 102` at all (the same error fires for any cross-folder
reference, Kasr included).

The article's first pass surfaced two **real, self-inflicted** errors, both instructive
because they reproduce documented gotchas rather than anything AU-specific:
```
"published_sections holds the literal \"[clear]\" ... Leave the body empty instead"
"media holds the literal \"[clear]\" ... "
"media_recommendations holds the literal \"[clear]\" ..."
"Library topic is required"
"missing required sections for TPL-CONCEPT: Key determinants, Clinical significance"
```
The three `[clear]`-on-a-`parseSections()`-column errors are the SHARED-TOOLCHAIN "URGENT"
sentinel bug in the other direction: `[clear]` is a list-column sentinel; on a
`parseSections`-parsed column it is read as prose and creates a visible garbage section
(here `medical:batch` actually catches it, unlike the plain-`text()` case the manual warns
about, where it is caught nowhere and just stores the literal string). Fixed by leaving the
body empty instead. The other two were plain missing fields I'd omitted. All five are
authoring mistakes, none are university/module related.

**medical:simulate on the whole set together (the gate):**
```
npm run medical:simulate -- probe/article/*.md probe/concept/*.md probe/question/*.md \
  --emit /tmp/sim-AU-probe.json
```
```json
"batches": [
  {"file": ".../article/AU-VALIDATOR-PROBE-article.md", "kind": "article", "created": 1, "updated": 0, "rejected": 0},
  {"file": ".../concept/AU-VALIDATOR-PROBE-concept.md",  "kind": "concept", "created": 1, "updated": 0},
  {"file": ".../question/AU-VALIDATOR-PROBE-question.md","kind": "question","created": 1, "updated": 0, "rejected": 0}
],
"delta": {"articles": 1, "concepts": 1, ...},
"errors": []
```
**Zero errors.** The simulator applied article → concept → question in dependency order
regardless of argument order (confirming the documented `ORDER` table), and every
cross-reference resolved because all three were in the same run.

**medical:audit, filtered to my IDs, with a positive control:**
```
npm run medical:audit -- --source /tmp/sim-AU-probe.json
→ total errors: 9, all 9 mention my IDs (ART-GIT-AU-PROBE-…, CON-GIT-03B28143B66C8B)
```
All 9 are genuine incompleteness on a smoke-test record (`resourceIds`, `relatedArticleIds`,
`finalPublisher`, `evidenceBasis`, `claimIds`, `spanIds` on the article; `relatedArticleIds`,
`resourceIds` on the concept) — fields on the `conceptPopulated`/`articlePopulated`
"must carry a value" list that a real deliverable would fill and my throwaway probe did
not. None mention `universities`, `modules`, `moduleIds`, `universityIds`, `au`, `AU_Y1`, or
`MED 102`.

**Positive control** — poisoned a real live concept (`CON-FND-14F19012C2D62F`, `resourceIds:
[clear]`) in the same simulate run and re-ran the filtered audit:
```
"concept.resourceIds missing for CON-FND-14F19012C2D62F, CON-GIT-03B28143B66C8B"
```
One line, both IDs named (the audit groups all offending IDs for one path onto one error
line — it is not silently vacuous; filtering to `CON-FND-` finds exactly the poisoned
record).

**Conclusion:** the toolchain has **no static catalogue check for university or module IDs
at all**, in `medical:batch`, `medical:simulate`, or `medical:audit` (confirmed again,
harder, under Q6). `au` / `AU_Y1` / `MED 102` pass every gate cleanly through a full
concept → article → question set with zero university-related errors.

---

## Q3a — ID collision: full record vs. sparse update, against a **live** Kasr concept

Picked `CON-CVS-7C9D59D257AC65` ("Fibrous and serous layers of the pericardium"), live,
`universityIds: ["kau"]`, `publicationStatus: "published"`.

**Full new-looking record, same `## id`, different content, `universities: au`, `modules:
MED 102`, `exam_weight_by_year: AU_Y1=0.5`:**
```
npm run medical:simulate -- probe/concept/q3a-full-collide.md --emit /tmp/sim-AU-probe-q3a-full.json
→ "created": 0, "updated": 1
```
Diffing the stored record before vs. after (`node -e` diff over both JSON files) — **fields
overwritten, verbatim before → after:**
```
label            "Fibrous and serous layers..." → "AU-OVERWRITE-TEST pericardial layers..."
aliases          [2 real aliases]                → [2 probe aliases]
definition       [real]                            → [probe placeholder]
learnerYears     [1,2,3]                           → [1]
universityIds    ["kau"]                           → ["au"]        <- kau EVICTED
moduleIds        []                                → ["MED 102"]
blueprintWeight  0.71                              → 0.5
clinicalRelevance 0.65                             → 0.5
academicRelevance 0.9                              → 0.5
confidence       0.97                              → 0.5
owner            "Admin team"                      → "Alexandria probe lane (P0-D)"
reviewer         "Medical team, Admin team"         → "[clear]"
publicationStatus "published"                      → "needs_evidence"   <- UNPUBLISHED
editorialReviewStatus "evidence_gate_passed"        → "authored_needs_independent_evidence"
examWeightByYear {KAU_Y1,Y2,Y3}                     → {KAU_Y1,Y2,Y3, "AU_Y1":0.5}  (merged, not replaced)
```
`examWeightByYear` is the one field that merged key-by-key (per `mergeAuthoringData`'s
"nested plain objects merge key-by-key" rule) — everything else that the full record
specified was a **plain replace**, including `universityIds`. **A full-record "AU version"
of a live Kasr concept silently evicts `kau` from `universityIds` and flips a published
concept back to `needs_evidence`**, with zero errors reported anywhere in the pipeline.

**Sparse update, same `## id` + `## label` (retyped) + `universities: +au` + `modules: +MED
102` + `exam_weight_by_year: +AU_Y1=0.5`, nothing else:**
```
medical:batch  → 3 errors (no definition / no explicit objective / no Arabic label) —
                 exactly the documented "judges every record as new" behaviour; not a
                 real problem for an update.
medical:simulate → "created": 0, "updated": 1, errors: []
```
Diff before → after: **only 3 fields changed**, all additive:
```
universityIds    ["kau"]                        → ["kau","au"]        <- kept, correctly appended
moduleIds        []                              → ["MED 102"]
examWeightByYear {KAU_Y1,Y2,Y3}                  → {KAU_Y1,Y2,Y3, "+AU_Y1":0.5}
```
Every other field — definition, aliases, owner, publicationStatus (stayed `"published"`),
reviewer, everything — survived untouched. **This is the safe form.**

**Bug found in passing:** the `+AU_Y1=0.5` directive on `exam_weight_by_year` produced the
key `"+AU_Y1"` (plus sign baked in literally), not `"AU_Y1"`. `weightMap()`
(`src/data/conceptImport.ts:91-95`) has no `+`-prefix handling at all — it is a plain
`key=value` parser, unlike `optionalList()`. The object still merges key-by-key regardless
(`mergeAuthoringData`'s generic nested-object rule), so the `+` prefix is not just
unnecessary here, it is actively wrong: **write `exam_weight_by_year: AU_Y1=0.5` with no
`+`, and the old KAU entries survive anyway.** Worth a Wanted-row note for whoever writes
the Alexandria concepts manual addendum, since the general list-column `+`-append habit
does not transfer to this one weight-map field.

**Conclusion:** the manual's "id + label + only the fields you change, with `+`" pattern is
the only safe collision form for an existing concept; a full/new-looking record on an
existing ID is a silent, undetected overwrite that can de-attribute a concept from its
original university and unpublish it — with `medical:simulate` reporting `updated: 1` and
`errors: []` in both cases, no different from a legitimate update. (This probe used the ID's
existing `KAU_Y1=0.7` etc. as the pre-collision baseline; see the **PRIORITY** section above
for what happens when the collision is against an ID that is not live at all, only pending
in another lane's own batch.)

---

## Q3b — Pending-vs-pending collision (neither side live yet)

Took a real, currently-pending Kasr concept, `CON-GIT-9589A7077392FD`
(`cellulose-dietary-importance`, `docs/Kasr-Source-Imports/concept/102-INT-concepts.md`,
not in the 1,718 live concepts, not in `docs/import-ready` or
`docs/questions-import-ready` either), extracted its one item verbatim, and wrote an AU
probe with the **same `## id`** and different content (`universities: au`, `modules: MED
102`).

```
Order A: kasr-pending-extract.md, then au-pending-collide.md
  → batches: [kasr: created 1, updated 0], [au: created 0, updated 1]
  → stored record: label "AU-PENDING-COLLISION-TEST...", universityIds ["au"], moduleIds ["MED 102"]

Order B: au-pending-collide.md, then kasr-pending-extract.md
  → batches: [au: created 1, updated 0], [kasr: created 0, updated 1]
  → stored record: label "Cellulose is undigestible...", universityIds ["kau"], moduleIds ["102 INT"]
```
Both runs report `errors: []` and clean `created`/`updated` counts either way. **Whichever
file is processed last wins completely** — the first file's version becomes the "existing"
record and the second file's `upsertRecords`/`mergeConcept` call overwrites it, exactly as
in Q3a's full-record case, because same-kind batches are applied in **argument order**
(`Array.prototype.sort` is stable and both files share `kind: 'concept'`, so `ORDER`'s
numeric key does not distinguish them).

**Conclusion:** if a combined gate run ever globs both `docs/Kasr-Source-Imports/concept/`
and `docs/Alexandria-Source-Imports/concept/` together, whichever directory's files a glob
happens to sort last **silently wins** any same-ID collision between two different
universities' pending batches, with no error, warning, or "kau lost" signal anywhere in the
report. This is the same risk as Q3a, but it fires **before either side is even live**, so
neither lane's own single-directory `medical:simulate` run (per the manual's per-lane gate
command) would ever see it — it only appears in a run that names both directories' files
together. (That test used two **full** competing records. The **PRIORITY** section above
runs the sharper version of this same question — a **sparse update row**, alone, with the
other lane's batch simply absent from the run — and finds the worse case: no collision
signal at all, just a silent, incomplete stub created under the other lane's ID.)

---

## Q3c — Key search coverage: canonical key only in `docs/Kasr-Source-Imports/concept/`

```
node "Instruction Manual for Content Creation/tools/find-existing.mjs" cellulose
→ finds it (5 hits, including "pending docs/Kasr-Source-Imports/concept/102-INT-concepts.md
   ... via ## label")
```
So `find-existing.mjs` **does** search `docs/Kasr-Source-Imports/` — its `BATCH_DIRS` is
built dynamically from every `docs/*-Source-Imports` directory
(`find-existing.mjs:35-41`), not hardcoded to `docs/import-ready` /
`docs/questions-import-ready` only. This already fixes the original Q5 premise for
find-existing.mjs specifically (see Q5 below) and its own header comment documents the
exact incident that motivated the fix.

But searching by the **literal canonical key** rather than a plain-English word:
```
node "Instruction Manual for Content Creation/tools/find-existing.mjs" "cellulose-dietary-importance"
→ "No existing record matches \"cellulose-dietary-importance\". Safe to create one."
```
**False negative.** Reading the source: the live-state loop does check
`hit(concept.canonicalKey)`, but the **pending-batch** loop
(`find-existing.mjs:92-98`) only matches `## (label|title|term|aliases)` — it never reads
`## canonical_key` for a pending file. So a canonical key that exists only in an
unimported Kasr batch is invisible to the one check a lane is told to run before minting,
*specifically when searched by the key itself* (searching by a word from the label still
works, as shown above).

**Grep form from LANE-BRIEF §10 step 2:**
```
grep -ril "cellulose-dietary-importance" docs/*-Source-Imports/concept/
→ docs/Kasr-Source-Imports/concept/102-INT-concepts.md
```
Finds it immediately.

**Conclusion:** `find-existing.mjs`'s directory coverage is already fixed and university-
agnostic; its **field** coverage on pending batches is not — it never checks
`canonical_key`. The brief's step-2 grep is not redundant advice, it is the only thing that
catches this specific gap. Worth a Wanted row for whoever owns `find-existing.mjs`: add
`canonical_key` to the pending-batch regex (`/^## (label|title|term|aliases|canonical_key)\r?\n.../`).

---

## Q4 — What does `mint-concept-id.mjs` hash? University-dependence? CI wiring?

```
sed -n '1,90p' "Instruction Manual for Content Creation/tools/mint-concept-id.mjs"
```
`const hash = createHash('sha256').update(canonicalKey).digest('hex').toUpperCase().slice(0, 14)`
— **hashes the canonical key alone.** The system code (`CON-<SYSTEM>-...`) is a
manually-typed prefix, not part of the hash input. **No university, no module** anywhere
in the mint. Confirmed live: minted `CON-GIT-03B28143B66C8B` from
`auvalidatorprobe.med102-smoke-test` with no university/module argument accepted by the
tool at all.

Contrast, `scripts/kasr/seeds/types.ts:449`:
```
export function conceptHash(module: string, key: string): string {
  return createHash('sha256').update(`kau:${module}:${key}`).digest('hex').toUpperCase().slice(0, 14)
}
```
Literally the string `"kau"`, hardcoded — not a parameter, not derived from any argument.
This function has **no university parameter at all**; it is Kasr-only by construction, and
the module *is* salted into the hash. So the two mints are fundamentally different schemes,
not just different default salts, and this is deliberate per LANE-BRIEF §10: "the manual's
tool is university-blind, and that is deliberate" — the same canonical key at Kasr and at
Alexandria gives the same ID, one concept, `universities` grows to hold both.

**CI wiring — corrected against the brief's claim.** `.github/workflows/content.yml`:
```
on:
  pull_request:
    paths: ['docs/Kasr-Source-Imports/**', 'scripts/kasr/**', 'scripts/validate-content-batch.mjs']
  push:
    branches: [main]
    paths: [same three globs]
```
`docs/Alexandria-Source-Imports/**` (and Ain Shams', Helwan's) is **not** in this trigger
list — a PR touching only Alexandria files does not run this workflow at all today.

Within the workflow, the only ID-integrity step is:
```
- name: One idea, one concept
  run: npm run medical:concept-ids     # → scripts/kasr/check-concept-ids.ts
```
`package.json` has **no `medical:id-stability` script**, and
`grep -rn "check-id-stability" --include=*.yml --include=*.json .` finds **zero**
references anywhere. `scripts/kasr/check-id-stability.ts` exists as a file but is wired
into neither an npm script nor any CI step.

Ran it directly against the probe concept anyway, since the brief asked to try:
```
node --experimental-strip-types scripts/kasr/check-id-stability.ts \
  probe/concept/AU-VALIDATOR-PROBE-concept.md
→ "ID stability: 3 concept IDs and 3 question IDs unchanged; 102 INT mints a distinct
   namespace."
→ "pharm refuses to mint without an explicit body-system code; overrides honoured."
→ exit 0
```
It **never reads `process.argv`** — the path I passed was silently ignored. The script is a
hardcoded, self-contained regression test pinning three specific Kasr concept IDs and three
question IDs for modules `101 ISK` / `102 INT` against `scripts/kasr/seeds/101-eoy-2025.ts`.
It cannot be pointed at any other file, AU or otherwise, and would need to be rewritten (or
a sibling written) to say anything about an Alexandria batch.

`check-concept-ids.ts` (the one that *does* run in CI, via `medical:concept-ids`) **is**
already university-agnostic by construction — its own header comment
(`scripts/kasr/check-concept-ids.ts:61-76`, dated 2026-08-22) documents that it used to scan
`docs/Kasr-Source-Imports/concept` alone, was caught missing a Kasr-key-reused-with-a-
different-id-under-Alexandria collision, and now builds `CONCEPT_DIRS` from every
`docs/*-Source-Imports/concept` directory dynamically, "discovered by shape, not by name...
The next university must not need an edit here to be checked." So the check itself is
ready for Alexandria; the CI trigger paths are the only thing not yet extended to run it on
an Alexandria-only PR.

**Conclusion:** `mint-concept-id.mjs` is genuinely university-blind (SHA-256 of canonical
key only) by deliberate design, matching the overlay model. The brief's §9 claim that
`check-id-stability.ts` "runs on pull requests" is **not accurate today** — it is not wired
into any CI step or npm script, and it ignores any path argument, unlike
`check-concept-ids.ts`, which does run in CI and is already cross-university-aware. The
real gap is `content.yml`'s trigger `paths:` list, not either check's logic.

---

## Q5 — Does `find-existing.mjs` search `docs/Alexandria-Source-Imports/`?

Yes — see Q3c. `BATCH_DIRS` is built as `['docs/import-ready', 'docs/questions-import-ready',
...every docs/*-Source-Imports directory found by readdirSync('docs')]`
(`find-existing.mjs:35-41`). The tool's own comment names the exact incident: a Kasr-only
hardcoded list once made a per-university folder invisible to this search, a duplicate got
written, and the fix was changed "to search by shape rather than by name: the next
university must not need an edit here to be searched." Verified live in Q3c
(`cellulose` search surfaced the Kasr-pending hit).

**The gap that remains is field coverage, not directory coverage** (already reported under
Q3c): the pending-batch loop only regexes `## (label|title|term|aliases)`, never `##
canonical_key`, so a search by the exact canonical key misses a pending record that a
search by an ordinary word from its label would find.

**Conclusion:** every Alexandria lane can trust `find-existing.mjs` to search
`docs/Alexandria-Source-Imports/` (and every other `*-Source-Imports` folder) automatically
— no edit needed, nothing to remember. What every lane *does* still need to remember is
LANE-BRIEF §10's own instruction: also `grep -ril "<canonical_key>"
docs/*-Source-Imports/concept/`, because that is the one thing find-existing.mjs's pending
search cannot do.

---

## Q6 — Does `medical:simulate`'s academic handling create the module in-run? Is `modules` validated at all?

**Academic batches are not a recognised kind anywhere in the shared toolchain.**
`src/data/batchKind.ts`'s `BatchKind` union is `'concept' | 'relation' | 'article' |
'question' | 'practical' | 'resource' | 'claim' | 'citation' | 'span' | 'unknown'` — there
is no `'academic'` kind, and `detectBatchKind` has no branch that could ever return one; a
`kau-modules.md`/`au-modules.md`-shaped file (only `## year`/`## term`/`## module`/`##
module_id` columns) matches none of the positive tests and falls through to `'unknown'`.

Confirmed with a probe (`probe/academic/au-modules-probe.md`, same shape as
`docs/import-ready/academic/kau-modules.md`) **and** against the real, already-committed
`kau-modules.md`:
```
npm run medical:batch -- probe/academic/au-modules-probe.md
→ kind: "unknown", errors: [".../its columns match none of the contracts this script
   validates ... Recognised kinds are concept, relation, article, question, practical,
   resource, claim, citation, span — a catalogue-resource, subjects or glossary batch is
   not one of them and has no branch here."]

npm run medical:batch -- docs/import-ready/academic/kau-modules.md   # the real, live file
→ identical error, kind "unknown"
```
So this is **not a new problem for Alexandria** — the real KAU academic file fails
`medical:batch` today, and always has. `medical:simulate` is more forgiving about it:
```
npm run medical:simulate -- probe/academic/au-modules-probe.md --emit /tmp/sim-AU-probe-academic.json
→ "skipped": [".../au-modules-probe.md: detected as \"unknown\", which this simulation does
   not apply. Move it out of the batch directory or add support for it."], "errors": []
```
Reading `src/data/universities.ts:107` confirms *why* this is harmless in practice: `const
KAU_MODULES: Record<string, [name, moduleId][]> = {...}` is a **hand-maintained TypeScript
constant** inside the source file itself. `grep -rn "kau-modules"` across the whole repo
finds exactly one reference outside the manual — the comment on `universities.ts:104`
saying "the same list ships as `docs/import-ready/academic/kau-modules.md`" for
documentation parity. **Nothing imports or parses `kau-modules.md` at runtime.** It is a
hand-mirrored doc of a table a person edits directly in `universities.ts`, per LANE-BRIEF
§9's own instruction for AU: "each university adds its own `const AU_MODULES` table beside
`KAU_MODULES`." So Kasr's INDEX note that academic is "not covered by `medical:simulate`" is
correct and, on inspection, actually understates it — it is not covered by `medical:batch`
either, and it was never meant to be: the real module catalogue is a TypeScript source
edit, and the `.md` file is only ever a documentation mirror of it.

**Is `modules` validated against anything?** Grepped both gates directly:
```
grep -n "universit\|module" scripts/validate-content-batch.mjs   → 0 matches
grep -n "universit|module" scripts/audit-medical-content-fields.mjs → only presence checks
  (conceptPresent/conceptIntentionalBlanks list `moduleIds`; never a membership check)
```
`src/data/conceptImport.ts:176`: `moduleIds: optionalList(values.modules)` — a plain string
list, no catalogue lookup, no `universitiesById`/`AU_MODULES` reference anywhere in the
import path. Proved with a **deliberately wrong module ID**:
```
probe/concept/q6-wrong-module.md:
  ## modules
  MED 999-DOES-NOT-EXIST
  ## module_subject
  MED 999-DOES-NOT-EXIST > Nonexistent Department > Nonexistent Topic

medical:batch  → 1 unrelated error (no Arabic label); nothing about the module
medical:simulate → created: 1, errors: []
medical:audit (filtered to this concept) → 24 errors, ALL about missing incompleteness
  fields (blueprintWeight, examWeightByYear, articleIds, etc. — this concept is otherwise
  minimal); zero mention the module
  "errors mentioning module anywhere in whole library: 0"
```
**Conclusion:** `modules` is unvalidated end-to-end — this is exactly how Kasr's `101 ISK`-
style module strings pass today, and it is exactly why an Alexandria lane's `MED 102` (or a
typo of it) passes too: there is no catalogue to check against, on either side. The academic
`.md` file is decorative documentation, not an import path, for both universities; the real
module table is the hand-edited `AU_MODULES`/`KAU_MODULES` constant in
`src/data/universities.ts`, and it plays no role in any content gate.

**Placement, contrast:** `primary_node_id`/`secondary_node_ids` (the canonical taxonomy, not
the module) **are** validated, everywhere modules are not:
```
probe/concept/placement-error-probe.md:  primary_node_id: SYS-NOTREAL-T99-S99
npm run medical:batch -- probe/concept/placement-error-probe.md
→ "placement SYS-NOTREAL-T99-S99 is not a canonical node"
```
(`scripts/validate-content-batch.mjs:582` and `:780`, both checking
`MEDICAL_TAXONOMY_INDEX.byId`.) So the asymmetry is real and load-bearing for authoring: a
wrong canonical node is refused everywhere; a wrong module string is refused nowhere.

---

## Rules for Alexandria lanes (paste into the brief)

0. **An "update" row for an ID that is not live anywhere is created, not refused — with no
   warning.** `medical:simulate` reports `created: 1, errors: []` identically whether an ID
   is genuinely new or belongs to another lane's not-yet-imported batch that simply is not
   in this run. Proved: a sparse `## id` + `## label` + `+au`/`+AU-MED-102` row for a real,
   currently-pending Kasr concept ID, run alone, materialised a near-empty stub (no
   `canonicalKey` at all, `definition: ""`, `articleIds: []`) under that exact ID.
   `medical:audit` does eventually flag it (36 errors, all "missing"/"blank" — never "already
   exists elsewhere"), but only because the stub is so empty; filling those fields in with a
   plausible new definition would make it pass every gate as a legitimate second author of
   the same idea, and the collision would surface only the day someone imports the real
   Kasr batch under the same ID. Before writing any update-style row, `grep -rn "<id>"
   docs/*-Source-Imports/` first — do not trust "it would resolve if it existed" to mean
   anything has actually checked that.
1. **AU module IDs are `AU-<CODE>`** (e.g. `AU-MED-102`), per the orchestrator's ruling —
   not the bare `MED 102` this probe started with. It makes no difference to any finding
   below: nothing in the toolchain validates the shape or existence of a module ID either
   way (rule 3, rule 10).
2. **`medical:simulate`'s "live state" is a committed fixture, not the DB.** It is
   `server/data/medical-library-v1.json`, last regenerated 2026-08-12 (commit `c6e6069`). A
   green simulate proves consistency with that snapshot, not with whatever the real
   `app_state` table holds right now.
3. **`au`, `AU_Y1`, `MED 102` need no code change to author against.** No static
   catalogue check exists for `universities` or `modules` anywhere in `medical:batch`,
   `medical:simulate`, or `medical:audit` — proved with a clean full concept+article+question
   set and, separately, with a deliberately fabricated module ID that produced zero errors.
   Do not wait on `AU_MODULES` landing in `universities.ts` before authoring content; that
   table is UI/documentation plumbing, not a gate.
4. **Never write a "full" record on an ID you found by search.** A complete-looking concept
   record with a live/pending ID that isn't yours will silently replace every field it
   specifies — including `universityIds` (evicting `kau`) and `publicationStatus` (silently
   un-publishing a live concept) — and `medical:simulate` reports this exactly the same as a
   legitimate update (`updated: 1`, `errors: []`). The only safe update is `## id` + `##
   label` (retyped) + only the fields you are changing, using `+` on list columns
   (`universities: +au`, `modules: +MED 102`). Do **not** use `+` on `exam_weight_by_year` —
   it has no append syntax and a leading `+` gets baked into the key literally; write
   `AU_Y1=0.5` with no plus sign and the existing KAU/HU entries survive anyway via the
   generic key-by-key object merge.
5. **Combined multi-university simulate runs are unordered and undetected.** If a batch of
   yours and a Kasr/Ain Shams/Helwan batch ever name the same `## id` and get simulated
   together, whichever file is *last* in argument order wins outright, with no warning. This
   can happen even before either side is live. Keep your own per-lane `medical:simulate ...
   docs/Alexandria-Source-Imports/<kind>/*.md` runs scoped to your own directory, and treat
   any orchestrator-run combined gate as something to ask about explicitly, not assume is
   safe.
6. **Before minting, run both `find-existing.mjs` (≥4 queries) and the brief's grep.**
   `find-existing.mjs` already searches every `docs/*-Source-Imports/` folder automatically
   — no per-university edit needed. But its pending-batch search only matches
   `label`/`title`/`term`/`aliases`; it never reads a pending file's `## canonical_key`. A
   search by the exact canonical key you're about to mint can return "safe to create" even
   though the key exists, verbatim, in an unimported Kasr batch. Always also run `grep -ril
   "<canonical_key>" docs/*-Source-Imports/concept/` per LANE-BRIEF §10 step 2 — it is not
   redundant, it is the only thing that catches this.
7. **`tools/mint-concept-id.mjs` is deliberately university-blind** (SHA-256 of the canonical
   key alone). The same key at Kasr and at Alexandria mints the identical ID — that is the
   overlay model working as designed, not a collision to fear, *provided* you follow rule 3
   above and update rather than overwrite when you get a hit.
8. **`scripts/kasr/check-id-stability.ts` does not run in CI and cannot check your batch.**
   Despite being cited as a CI gate, it is wired into no npm script and no workflow step
   (`.github/workflows/content.yml`'s only ID-integrity job is `medical:concept-ids` →
   `scripts/kasr/check-concept-ids.ts`), and it ignores any file path passed to it — it is a
   hardcoded self-test for two specific Kasr modules. Do not budget time trying to run it
   against Alexandria content.
9. **`check-concept-ids.ts` (the one that does run in CI) is already Alexandria-aware** — it
   scans every `docs/*-Source-Imports/concept` directory it finds, dynamically, by design.
   But `.github/workflows/content.yml`'s trigger `paths:` list is still Kasr-only
   (`docs/Kasr-Source-Imports/**`, `scripts/kasr/**`,
   `scripts/validate-content-batch.mjs`) — a PR touching only Alexandria files will not run
   this workflow, or that check, at all until the paths list is widened. Flag this to
   whoever owns CI config; it is outside this lane's tooling boundary to fix.
10. **Placement (`primary_node_id`/`secondary_node_ids`) is checked against the canonical
   taxonomy on every batch; `modules`/`module_subject` are not checked against anything.**
   Get placement right — it is the one part of a record this toolchain actually refuses when
   wrong (`"placement <id> is not a canonical node"`). A typo in `modules` will never be
   caught by tooling; it is caught only by a human reviewer, so double-check module IDs
   against LANE-BRIEF §1's exact list by eye.
11. **An academic module-list batch (`au-modules.md`, `kau-modules.md` shape) is not an
    import format at all** — it is `kind: "unknown"` in every gate, always has been (the real
    committed `kau-modules.md` fails `medical:batch` today), and is never consumed at
    runtime. The actual module catalogue is the hand-edited `AU_MODULES` constant in
    `src/data/universities.ts` (owned by lane P0-B per LANE-BRIEF §9); the `.md` file is a
    documentation mirror only. Do not expect `medical:batch`/`medical:simulate` to validate
    it, and do not treat its errors there as a blocker.

---

## BLOCKED

None. Every question above was settled with a command and its output; nothing required a
guess or a decision only the orchestrator could make.

---

```
LANE: P0-D
SCOPE: validator compatibility probe (tooling only — no real content authored) · every content kind touched by the AU pilot: academic, concept, article, question, plus the shared search/mint/CI tools
OUTPUT: docs/Alexandria-Source-Imports/coverage/00-validator-probe.md (this file); all probe
  batches in the session scratchpad under probe/ (never committed, never imported):
  probe/academic/au-modules-probe.md, probe/concept/AU-VALIDATOR-PROBE-concept.md,
  probe/concept/q3a-full-collide.md, probe/concept/q3a-sparse-collide.md,
  probe/concept/q6-wrong-module.md, probe/concept/placement-error-probe.md,
  probe/concept/positive-control-poison.md, probe/q3b/kasr-pending-extract.md,
  probe/q3b/au-pending-collide.md, probe/q3b/au-sparse-update.md,
  probe/article/AU-VALIDATOR-PROBE-article.md, probe/question/AU-VALIDATOR-PROBE-question.md
COUNTS: 12 probe files across 4 kinds; gates run: medical:batch x11, medical:simulate x10,
  medical:audit x4, find-existing.mjs x4, mint-concept-id.mjs x2, check-id-stability.ts x1.
  Full concept+article+question set: medical:batch clean after fixes, medical:simulate 0
  errors (created 1/1/1), medical:audit 9/9 errors traced to my own incompleteness, 0 to
  university/module. Positive control confirmed (1/1 hit on a poisoned live CON-FND-
  concept). Priority not-yet-live-ID update test: order (i) creator-then-update in one run
  → clean merge, Kasr content intact, au/AU-MED-102 appended; order (ii) update row alone →
  `created: 1, errors: []`, a near-empty stub materialised under the other lane's id with no
  collision signal anywhere until medical:audit's 36 incompleteness errors (never a
  "duplicate" error).
OWED: three Wanted rows for tool owners outside this lane's boundary —
  (a) find-existing.mjs's pending-batch regex should also match `## canonical_key`
      (currently only label/title/term/aliases);
  (b) .github/workflows/content.yml's trigger `paths:` should include
      `docs/Alexandria-Source-Imports/**` (and sibling universities') so
      `medical:concept-ids` (already cross-university-aware) actually runs on an
      Alexandria-only PR;
  (c) medical:simulate has no way to flag "this id is not in this run's live state or
      sibling batches" as a note when a concept/article/question kind row is otherwise a
      pure create — worth a lightweight warning rather than silence, since nothing else in
      the pipeline catches it earlier. All three reported upward, no script touched.
HAZARDS: (0) — the priority one — a sparse update row for an id that is not live anywhere
  is silently CREATED as a near-empty stub, indistinguishable in the report from a
  legitimate new concept; the only defence is grepping docs/*-Source-Imports/ for the id
  before writing an update row, never trusting the tool to notice; (1) a full/new-looking
  concept record on an existing ID silently overwrites universityIds and publicationStatus
  with no error — never write a full record on a search hit, only id+label+changed-fields
  with `+`; (2) `+` on exam_weight_by_year bakes the plus sign into the key literally —
  never prefix that field, plain merges anyway; (3) combined multi-university simulate runs
  let same-ID collisions resolve by argument order with zero warning, even pre-live; (4)
  check-id-stability.ts is not a real CI gate today and ignores path arguments — do not
  rely on it; (5) academic module-list batches are permanently kind:"unknown" and always
  will be — this is not a bug to chase.
BLOCKED: none
```
