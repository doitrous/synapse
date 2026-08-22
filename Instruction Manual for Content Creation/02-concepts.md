# 02 · Concepts

> You must have read [00-START-HERE.md](00-START-HERE.md) before using this file.

A **concept** is one testable idea. It is the atom the whole platform is built on: articles
teach concepts, questions test concepts, practicals assess concepts, and a student's mastery
profile is a map of concepts. Everything else is a container.

There are **52 columns**. This manual covers all of them. The pending batches in this repo
use 28 — and six of the missing ones are fields the audit requires, so those batches would
fail. Do not repeat that.

| | |
|---|---|
| **Imports at** | Admin › Concepts › Import (`/admin/concepts/import`) |
| **Goes in** | `docs/import-ready/concept/` |
| **Recognised by** | the presence of `label` or `canonical_key` — **always include `label`** |
| **`fieldsUsed` floor** | **50** of 52 for a **new** concept — the worked example scores **52** |

The floor applies to new records only. An **update** is deliberately sparse — `id` + the
discriminating columns + the fields you are changing — and will score far below it. Validate
an update with `medical:simulate` and confirm `created: 0, updated: 1`; `medical:batch` and
the floor do not apply. See [00-START-HERE §2](00-START-HERE.md).

**An update row must still restate `label` (or `canonical_key`).** Kind is detected once per
file, from its columns, and a concept is recognised by the presence of one of those two keys
— drop both because the row is "just an update" and the file's kind can resolve to
`unknown`. `medical:simulate` puts an unrecognised file in its `refused` list, which is kept
separate from `errors` on purpose, so a run can print zero errors while that update never
applied. A sparse row of `## id` + `+universities` alone is exactly the shape that gets lost
this way. Verified 2026-08-22 by the Ain Shams toolchain lane against the real validator;
turning into a validator error.

Append to a list field rather than retyping it, with a leading `+` on the cell — `+au`,
`+AU_Y1`, `+AU-MED-102`. Both the pipe-joined and the one-item-per-line form are safe: a
parser bug once stored every `+item` after the first with its plus still attached, in both
forms equally, and it is fixed at the parser (`312777b`) — there was never a form that
avoided it. A cell that mixes a plain item with a `+` one, `X | +Y`, is refused as ambiguous
rather than guessed at.

**`+` only works on a true ID-list column.** It is `listDirective`/`splitList`
(`src/data/importSemantics.ts`) that strips the leading `+` and appends — fields parsed a
different way never see it. `module_subject` is the case that bit: it is a list of paths, not
of IDs, split on newlines by `parseModuleSubjectPaths`, which never strips a `+`, so
`+101 ISK > Anatomy > Upper Limb` is stored with the literal `+` in front of it, not appended
to what was already there. Write a non-ID-list field as a full replacement, every time.
Verified 2026-08-22 by the Ain Shams toolchain lane against the real validator; turning into
a validator error.

Never write a **full record** over a hit: every field you name replaces what live state
holds, so a full record that means to add `AU` to `universities` but retypes the field
without the existing entries silently evicts every university already there. Carry only what
you are changing — never restate `source_candidate_ids` copied from the live record. An
update row is checked exactly like a new one, against the corpus concept index sitting beside
the batch, and a candidate ID that is real on the live record but absent from that index
fails as though invented. An `id` that is not live is refused outright rather than quietly
turned into a stub (`470fdde`).

---

## Is a concept the right thing to write?

| Write a concept when | Write something else when |
|---|---|
| It is one idea a question could test on its own | It is a whole topic — that is a [subject/topic node](01-subjects-and-topics.md) |
| A student could get it right or wrong | It is prose explaining several ideas — that is an [article](04-library-articles.md) |
| You can state it in one or two sentences | It is a bilingual vocabulary item — that is a [glossary term](11-glossary-terms.md) |
| | It is a link between two ideas — that is a [relationship](03-relationships.md) |

A good concept label is a **claim**, not a heading. "Ejection fraction classifies heart
failure; it does not define it" is a concept. "Heart failure" is a topic.

---

## Scope

A concept exists for one of two reasons, in that order of priority: a banked question tests
it, or the department book chapter the module examines teaches it. Record which — list every
paper it came up on in `exam_signal`; where it exists only because the chapter teaches it and
no banked question has tested it yet, say so in `evidence_gaps`. A concept the module never
sits, in either sense, is out of scope.

## Stages

Writing this file is **S2** of the pipeline in [13-orchestration.md](13-orchestration.md) §4,
run after S1 triage has assigned the concept. S3 tags and places it — see Placement, below.
S4 gives it typed relations ([03-relationships.md](03-relationships.md), and step 4 below).
S5 gives it an evidence chain (`atomic_claim_ids`, below). None of that is optional: a concept
is not finished — whatever `fieldsUsed` says — until it has an article that teaches it, at
least one typed relation to a sibling, and evidence behind its claims.

---

## The prompt

Copy this when dispatching a subagent.

```
You are authoring concepts for Synapse, a study platform for undergraduate medical
students in Egypt.

Read, in this order:
1. Instruction Manual for Content Creation/00-START-HERE.md
2. Instruction Manual for Content Creation/02-concepts.md

Produce ONLY concept records, in the importer markdown format defined in that manual,
with no commentary before or after.

Non-negotiable:
- Search first with tools/find-existing.mjs, for the label AND each alias AND the
  obvious synonym. A hit means you update that record, not that you write a new one.
- Mint the ID with tools/mint-concept-id.mjs. Never omit `## id` — the importer's
  fallback produces an ID shape that matches nothing in live state.
- Fill every column in the manual's "must carry a value" table. Every blank in the
  "may be blank" table needs a field_notes line saying what you looked for.
- Run the relationship discovery pass. A concept in a populated topic with no
  relationships is not finished.
- Never invent a fact, a citation, a dose, or an ID.
- British spelling. status: under review.

Validate with `npm run medical:batch` and report fieldsUsed. It must be 50 or more.
```

---

## Step 1 · Search

```bash
node "Instruction Manual for Content Creation/tools/find-existing.mjs" "<your label>"
```

Run it again for every alias you intend to give it, and for the synonym another author
would have reached for. If anything comes back, go to 00-START-HERE §4 and decide between
update, distinguish, or record-as-rejected. **Do not proceed to step 2 on a hit.**

It searches live state, `docs/import-ready`, every `docs/*-Source-Imports`, and — beside the
usual label/title fields — the `canonical_key` column of every pending batch, because a
canonical key rarely reads like a label-shaped search term and used to slip past this check
entirely.

**A hit only in another lane's unimported batch** — not live, not yours — is still a hit.
Write your update as a sparse record in that import root's `pending-live/<slug>.md`, with an
`INDEX` line reading "apply after `<the other lane's file>`". Do not edit their file, and do
not treat an unimported batch as though it does not exist.

## Step 2 · Mint the ID

Every one of the 1,718 concepts in live state is `CON-<SYSTEM>-<14 hex>`. The importer does
**not** default to that shape — if you omit `## id`, `conceptFromRow` falls back to
`med.concept.<slug-of-label>`, which matches nothing and opens a second ID namespace inside
one graph. So the ID is never optional.

> **The first segment is a body-system code, not the subject ID.** They differ for five of
> the eight subjects, and guessing gets it wrong: `renal` → **REN**, `resp` → **RES**,
> `gi` → **GIT**, `endo` → **END**, `neuro` → **NEU**. Only `cvs`, `msk` and `pharm` are
> unsurprising, and `pharm` concepts are filed under the system whose drugs they are rather
> than under a pharmacology code. It is also not the canonical node — `CON-REN-` concepts
> sit under `SYS-PHY`, `SYS-PAT` and `SYS-ANA` nodes. Let the tool decide.
>
> The 19 valid codes: `AND CVS DER DEV END FND GIT GYN HEM IMM INF MSK MUL NEU OBS POP PSY
> REN RES`.

**One medical idea is one ID, across every university.** `universities`, `learner_years` and
`module_subject` are overlays on that one record — a second university teaching the same idea
is a sparse update adding itself to those fields, never a second concept. This is exactly what
step 1's search exists to protect, and it is also why this tool never salts the hash with a
module or a university: `mint-concept-id.mjs` hashes the canonical key alone, so the same idea
mints the same ID no matter who asks for it.

Kasr's own pipeline (`mintConceptId` in `scripts/kasr/seeds/types.ts`) does the opposite — it
salts the hash with the module (`kau:<module>:<key>`), so two modules teaching one idea mint
two IDs on purpose, to be found by the redundancy scan below and merged by a human. Both
minters are real and both are in use today. Which one a new lane should use, and how a
module-salted ID and an unsalted one for the same idea get reconciled, is a product question
the chief of staff holds — do not decide it yourself mid-batch.

First write the **canonical key** — a stable, dot-separated de-duplication key,
`entity.relation.qualifier`:

```
heart.contractility.frank-starling
kidney.filtration.gfr-autoregulation
pericardium.layers.fibrous-serous
```

Then mint from it:

```bash
$ node "Instruction Manual for Content Creation/tools/mint-concept-id.mjs" REN kidney.filtration.gfr-autoregulation
CON-REN-1617BADC9D272B
ok — CON-REN- from canonical key "kidney.filtration.gfr-autoregulation", checked against 2056 existing IDs.
```

Get the code wrong and it tells you, rather than minting something plausible:

```bash
$ node "Instruction Manual for Content Creation/tools/mint-concept-id.mjs" RENAL foo.bar
! "RENAL" is not a system code.
  Valid codes: AND CVS DER DEV END FND GIT GYN HEM IMM INF MSK MUL NEU OBS POP PSY REN RES
  Note these are body systems, not subject IDs — renal is REN, resp is RES, gi is GIT, endo is END, neuro is NEU.
```

It is deterministic — the same canonical key always mints the same ID, so re-running never
forks a record — and it checks for collisions against live state and every pending batch. A
collision means either you are writing something that already exists, or your canonical key
is not specific enough. Both are your problem to fix, not to route around.

## Step 3 · Write the record

Field tables below. Then step 4, the relationship pass.

---

## Fields · must carry a value

A blank here is an audit error. All 28 of these come from `conceptPopulated` in
`scripts/audit-medical-content-fields.mjs`, plus the columns needed to place the record.

### Identity

| Key | Admin label | Rule |
|---|---|---|
| `label` | Concept name | **Required.** The claim a student sees. Not a heading. Not editable after creation — get it right. |
| `id` | Canonical ID | `CON-<SYSTEM>-<14 hex>` from step 2. Never omit, and never hand-write the system code. |
| `canonical_key` | Canonical key | The dot-separated key you minted from. **Two records with the same key are the same concept** — this is the de-duplication key of record. |
| `definition` | Definition | One or two sentences. This is *exactly* what a student sees on the concept card after they reveal an answer, so write it for that moment. |
| `explicit_objective` | Explicit objective | What a student must be able to **do**. This is what a question tests. Start with a verb: "Predict how preload change moves stroke volume." |
| `concept_type` | Concept type | `definition` · `mechanism` · `classification` · `clinical_feature` · `investigation` · `management` · `epidemiology`. Free text in the form, so this list is the only guard — stay on it. |
| `status` | Status | `active` · `under review` · `inactive`. Write `under review` unless you are promoting a record that has been through review. |
| `support_mode` | Support mode | `direct_statement` when a source states it outright; `inferred` when you assembled it from more than one. Also free text — stay on these two. |

### Placement

`primary_node_id` is the placement of record. The `topic`/`subtopic`/`microtopic` columns
are the older university overlay and are derived from it when absent — but the audit wants
them **present**, so write both.

| Key | Admin label | Rule |
|---|---|---|
| `subject` | System / subject ID | One of the 20 in `src/data/curriculumCatalog.ts` — see [00-START-HERE §3](00-START-HERE.md). Twelve of the twenty have no live concept yet; that is not a reason to avoid them. |
| `primary_node_id` | Canonical node ID | One canonical taxonomy node — `SYS-CVS-T02-S01-M01`. Must already exist. This is the concept's one home. |
| `article_ids` | Article IDs | Every article that teaches this concept. **Each of those articles must list this concept back** in `related_concepts`. A concept with no article is an orphan. |

Source material does not always name one of the 20 outright. Placement for the ones without an
obvious home: `Community medicine` → `pop`; `Psychology` → `psy`; `Microbiology` and
`Parasitology` → `inf`; `Forensic medicine`, `Toxicology`, `ENT` and `Ophthalmology` → the body
system of the mechanism or the target organ — asphyxia → `resp`, otitis/conjunctivitis → `inf`,
the visual pathway/pupil/audiovestibular system → `neuro`, ocular embryology → `dev`,
organophosphates → `mul`; an umbrella forensic or toxicology principle with no single target
organ also → `mul`. `pharm` concepts take the `FND` or `INF` `CON-` system code, never their
own. (`oph` and `ent` as subjects in their own right: pending Omar.)

### Audience and weighting

| Key | Admin label | Rule |
|---|---|---|
| `learner_years` | Learner years | `2 \| 3`. Numeric. Which years actually meet this. |
| `universities` | University IDs | Canonical university IDs. Which universities teach it. **Must be non-empty** — an empty list makes the record visible to every university, which is rarely what you mean. |
| `blueprint_weight` | Blueprint weight (0–1) | Overall exam weight. 0.8 = examined nearly every sitting; 0.2 = examined rarely. |
| `exam_weight_by_year` | Exam weight by year | `HU_Y2=0.7 \| HU_Y3=0.5`. Per-year override where a year weights it differently from the overall figure. |
| `clinical_relevance` | Clinical relevance (0–1) | How much it matters on the ward. |
| `academic_relevance` | Academic relevance (0–1) | How much it matters in the written exam. These genuinely differ — the Krebs cycle is high academic, low clinical. |
| `module_subject` | Module subject path(s) | Where inside each module it sits — `101 ISK > Anatomy > Upper Limb`. One path per line. The canonical placement is `primary_node_id`; this is the curriculum's own. |
| `exam_signal` | Exam appearances | Which papers this came up on, one per line as `src_… \| tier \| year \| p14`. The blueprint weight is **derived** from these. |
| `weight_confidence` | Weight confidence (0–1) | How sure the weights are. **Be honest; a guess is not a 1.** If you inferred the weight from one past paper, that is 0.3. |
| `confidence` | Confidence (0–1) | Authoring confidence in the content. Never a substitute for verification. |

### Evidence

| Key | Admin label | Rule |
|---|---|---|
| `atomic_claim_ids` | Atomic claim IDs | Evidence claims supporting this concept. See the note below — this is the field most likely to stop you. |
| `resource_ids` | Resource IDs | Every source that teaches or verifies this. **The audit rejects a resource ID that is not in the evidence store.** |
| `related_article_ids` | Related article IDs | Articles that discuss it without owning it. Distinct from `article_ids`, which is what teaches it. |
| `original_wording` | Original wording | The source's own words, one per line. Preserves provenance through a merge — when two records are folded together, this is how the original phrasing survives. |

> **`atomic_claim_ids` is required, and for a genuinely new concept there is often no claim
> to point at.** §3 forbids inventing IDs, and the field is not on the may-be-blank list, so
> `field_notes` cannot rescue it. Three honest ways out, in order of preference:
>
> 1. **Reuse a live claim that genuinely supports your concept.** Search first —
>    `find-existing.mjs` covers claims, citations and resources:
>    ```bash
>    node "Instruction Manual for Content Creation/tools/find-existing.mjs" "autoregulation"
>    ```
>    A claim bound to a *neighbouring* concept is acceptable only if it actually asserts what
>    your concept says. Attaching a near-miss to clear a validator is the wrong trade.
> 2. **Author the claim and its citation** in `docs/import-ready/evidence/`, following
>    [03-relationships.md](03-relationships.md) — claims and citations in separate files. This
>    is the right answer whenever your concept rests on a source you can quote, and it is
>    what makes the concept publishable rather than merely valid.
> 3. **Say so and stop.** If no source in the evidence store supports it and you cannot
>    quote one, the concept is not ready. Report it rather than attaching something plausible.

### Governance

| Key | Admin label | Rule |
|---|---|---|
| `owner` | Owner | Defaults to `Admin team`. |
| `reviewer` | Reviewer | Defaults to `Medical team, Admin team`. |
| `final_publisher` | Publisher | Defaults to `Admin team`. |
| `publication_status` | Publication status | `published` · `needs_evidence` · `under_review` · `faculty_review`. Only `published` reaches a student. Write `needs_evidence` for new work. Free text in the form — stay on the list. |
| `editorial_review_status` | Editorial review status | Free text describing where the record sits. `drafted_not_reviewed`, `evidence_gate_passed`, `awaiting_faculty`. |
| `field_notes` | Field notes | `field: reason`, one per line. Required whenever anything below is blank. |

---

## Fields · must be present

The key must exist. An empty list is a legitimate value; a **missing key** is an audit
error, because the audit cannot tell an intentional empty from an omission. From
`conceptPresent`.

| Key | Rule |
|---|---|
| `topic` | Topic title or `TPC_` ID. Derived from `primary_node_id` when absent — write it anyway. |
| `subtopic` | `SUB_` ID or title. |
| `microtopic` | `MIC_` ID or title. May be blank with a reason. |
| `nanotopic` | `NAN_` ID or title. May be blank with a reason. |
| `secondary_node_ids` | Other valid placements across the four views — `DIS-PHY-T02 \| KNW-DIA`. This is "also appears in". A concept that a discipline course also teaches belongs here. |
| `related_concept_ids` | The **untyped** neighbour list. Typed edges live in [03-relationships.md](03-relationships.md); this is the loose "see also". |
| `modules` | Module IDs. Usually blank with a reason — see below. Kasr modules are bare (`101 ISK`); a non-Kasr university prefixes its own — `ASU-CVS`, `AU-MED-102`, `HU-GIT-301` (uppercase, spaces to hyphens). |
| `aliases` | Alternate terms and spelling variants. An alias never creates a second concept — it makes the existing one findable. Include abbreviations (`HFrEF`), the full form, and the common misspelling. |
| `arabic_label` | Reviewed Arabic term. Research it and write it; no additional verification step is required. |
| `arabic_aliases` | Reviewed Arabic alternates, including the transliterated form students actually say. |
| `pitfalls` | **The mistake students actually make.** Shown as a warning on the concept card. Name the wrong belief, not the right one: "Calling the visceral serous layer 'epicardium' and then treating it as a third layer." |
| `approved_file_resource_ids` | File resources cleared for this concept. |
| `approved_video_resource_ids` | Video resources cleared for this concept. |
| `conflicts` | Where sources disagree. **Record it; do not pick silently.** One per line, naming both positions. |
| `uncertainty` | What is genuinely unclear about the concept itself — not your uncertainty about the sources. |
| `evidence_gaps` | What is still unsupported. New records land with `Evidence must be attached before publication.` |
| `merge_ids` | Merge records that folded other candidates into this one. |
| `rejected_merge_candidate_ids` | Candidates deliberately **not** merged. Write the near-miss you decided against in step 1 here, so the next author does not re-litigate it. |
| `last_reviewed` | ISO date. Blank with a reason on new work. |
| `review_due` | ISO date. Blank with a reason on new work. |
| `exclusion_reason` | Why this concept is deliberately not published. Empty unless it is excluded. |

---

## Fields · may be blank, with a stated reason

From `conceptIntentionalBlanks`. Leaving one of these empty is fine. Leaving it empty
**without a `field_notes` line** is an audit error.

`arabic_label` · `aliases` · `pitfalls` · `modules` · `microtopic` · `nanotopic` ·
`approved_file_resource_ids` · `approved_video_resource_ids` · `last_reviewed` ·
`review_due` · `resource_occurrence_ids` · `source_candidate_ids`

Two of these deserve explanation, because the code carries the reasoning:

- **`resource_occurrence_ids`** records where a *pipeline-extracted* concept appears in the
  source corpus. A concept written by a person has no such record. Requiring it forced a
  fabricated ID, so it now needs a stated reason instead.
- **`source_candidate_ids`** is the same story. Some concepts have no corpus candidate
  because the local curriculum does not teach the source material at all. That absence is a
  finding worth recording — and requiring the field made the nearest wrong ID tempting
  (searching the corpus for "falls" returns "Fallopian").

Good and bad reasons:

```markdown
## field_notes
resource_occurrence_ids: Hand-authored from the topic blueprint; this concept has no corpus extraction record.
source_candidate_ids: Searched the corpus for "frank starling" and "starling law" — no candidate record exists.
modules: No verified live module ID was supplied; curriculum mapping remains explicit and unguessed.
arabic_label: No standard Arabic term is in undergraduate use in Egypt; students use the English term.
```

`N/A`, `TODO`, `none`, and silence all fail the audit.

---

## Step 4 · The relationship discovery pass

**This is mandatory and it is where most of the value is.** The graph currently holds 1,718
concepts and 47 relationships. Almost every concept in it is an island.

Relationships are not required for a concept to be valid. But a concept sitting in a topic
alongside ten siblings, with no edge to any of them, is not finished — you have written a
fact, not a piece of a map.

**After drafting the concept, before you validate:**

1. List the concepts already placed under the same `primary_node_id` and its parent.

   **Do not assume your siblings are under a `SYS-` node.** Placement in live state is
   uneven: all 98 cardiovascular concepts sit under `SYS-CVS-T01`, but **zero** renal
   concepts sit under any `SYS-REN-*` node — all 119 are on `DIS-*` discipline nodes, 40 of
   them on `DIS-PHY-T04`. Searching the wrong root returns nothing and looks like "this
   topic has no siblings", which is the one answer that will make you skip the pass. Find
   where they actually are first:

   ```bash
   node -e "
   const g=JSON.parse(require('fs').readFileSync('server/data/medical-library-v1.json','utf8')).states['synapse-concept-graph-v2'];
   const subj=process.argv[1], by={};
   for(const c of g.concepts) if(c.subjectId===subj) by[c.primaryNodeId||'(none)']=(by[c.primaryNodeId||'(none)']||0)+1;
   for(const [node,n] of Object.entries(by).sort((a,b)=>b[1]-a[1])) console.log(String(n).padStart(4), node);
   " renal
   ```

   ```
     40 DIS-PHY-T04
     29 DIS-HIS-T03
     14 DIS-ANA-T05
     14 DIS-PHA-T03
     13 DIS-BIO-T06
   ```

   Then list the siblings under whichever node that reports:

   ```bash
   node -e "
   const g=JSON.parse(require('fs').readFileSync('server/data/medical-library-v1.json','utf8')).states['synapse-concept-graph-v2'];
   const node=process.argv[1];
   for(const c of g.concepts) if((c.primaryNodeId||'').startsWith(node)) console.log(c.id, c.label);
   " SYS-CVS-T01
   ```

   Real output today, abbreviated — 98 concepts sit under `SYS-CVS-T01`, and 53 of them
   have no relationship at all:

   ```
   CON-CVS-7C9D59D257AC65 Fibrous and serous layers of the pericardium
   CON-CVS-AE28ABD8CE2B0B Heart within the pericardium and middle mediastinum
   CON-CVS-930E4596CA5673 Spiral relation of the pulmonary trunk and ascending aorta
   CON-CVS-10EC8DB8FAF3BF Anterior pericardial fixation
   ```

2. Add the concepts in your own batch to that list.

3. For **each** of them, ask which of the 26 typed relations genuinely holds — in which
   direction. Not "are these related" (everything in a topic is loosely related) but "is
   there a specific, nameable, directed relationship here". The full list with direction
   semantics is in [03-relationships.md](03-relationships.md); the ones that carry most of
   the load are `causes`, `prerequisite_of`, `part_of`, `mechanism_step_before`,
   `presents_as`, `diagnosed_by`, `treated_by`, `differential_of`, `complication_of`,
   `is_a`, `often_confused_with` and `contrasts_with`.

4. Put the loose ones in this concept's `related_concept_ids`. Write the specific ones as
   **typed edges in a relations batch**, following [03-relationships.md](03-relationships.md)
   — including the claim and citation each edge needs.

5. Record the outcome either way:

   ```markdown
   ## field_notes
   relationships: Walked the 9 concepts under SYS-CVS-T02. Wrote 3 typed edges
   (prerequisite_of, mechanism_step_before, often_confused_with) in
   SYS-CVS-RELATION-002.md. The rest are same-topic proximity only, not typed links.
   ```

Two relation types earn special attention because they are the ones that actually help a
revising student and the ones nobody writes: **`often_confused_with`** and
**`contrasts_with`**. If you know the pair students mix up, that edge is worth more than
three `related_concepts`.

---

## Redundancy

`npm run medical:duplicate-keys` regenerates `docs/chief-of-staff/duplicate-keys.md` from
live state plus every batch: an exact `canonical_key` collision, which the ID-stability gate
also enforces, and a normalised-label collision, which nothing enforces and relies entirely on
a human reading the report. **A label twin — the same idea written twice under two different
keys — is a duplicate, not two concepts that happen to agree.** Merge them: pick the surviving
ID, fold the other's fields into it, repoint every reference (`article_ids`,
`related_concept_ids`, relation edges, a question's main concept) at the survivor, and record
the discarded ID in `merge_ids` on the record that absorbed it.

The 101 ISK case: `pectoralis-major-attachment-nerve-action` and
`pectoralis-major-attachment-action-nerve` are one fact — pectoralis major's attachments,
nerve supply and action — written to two canonical keys that only reorder the same three
words, minted to two different IDs as a result. The mint cannot catch this; it only refuses an
*exact* key collision. Reading the label is the only check that does.

---

## Media

Concepts **cannot** carry media requests — `MEDIA_REQUEST_OWNER_KINDS` is
`article`, `question`, `practical`. If a concept needs a diagram, file the request on the
article that teaches it and name the concept in the purpose line:

```markdown
## media_recommendations
### diagram · Frank–Starling curves at three contractility states
Purpose: Teaches CON-CVS-7F21D5F24E0D4F. The shift between curves is the whole concept and
cannot be carried by prose — a student needs to see the family of curves at once.
Priority: required
Status: needed
Section: Pathophysiology
Source direction: openly licensed physiology text
```

See [00-START-HERE.md](00-START-HERE.md) §6 for the full block syntax.

---

## Worked example

A complete record. It validates clean at **`fieldsUsed: 52`** — every available column
present. Nine of them are deliberately empty, and each empty one has a `field_notes` line
saying why. Copy this shape.

```markdown
# Item

## id
CON-CVS-7F21D5F24E0D4F

## label
Preload sets stroke volume through the Frank–Starling relationship

## canonical_key
heart.contractility.frank-starling

## aliases
Frank-Starling law
Starling's law of the heart
Length-tension relationship of cardiac muscle
FSM

## arabic_label
قانون فرانك-ستارلينغ

## arabic_aliases
علاقة الطول بالتوتر في عضلة القلب

## definition
Within physiological limits, the more the ventricle is filled during diastole, the more
forcefully it contracts. Stretching cardiac muscle increases the sensitivity of the
myofilaments to calcium and improves actin–myosin overlap, so a larger end-diastolic
volume produces a larger stroke volume without any change in contractility.

## explicit_objective
Predict the direction stroke volume moves when preload changes, and distinguish that from
a change in contractility.

## pitfalls
Treating any rise in stroke volume as a rise in contractility. Preload moves the heart
along one Frank–Starling curve; contractility moves it onto a different curve. A student
who cannot separate these will misread every ventricular function graph in the exam.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
SYS-CVS-T02-S01-M01

## secondary_node_ids
DIS-PHY-T02

## topic
TPC_CVS_CARDIAC_PHYSIOLOGY

## subtopic
SUB_CVS_CARDIAC_OUTPUT

## microtopic
MIC_CVS_PRELOAD

## nanotopic

## modules

## article_ids
ART-CVS-CARDIAC-CYCLE

## related_article_ids
ART-CVS-HEART-FAILURE-HFREF

## related_concept_ids
CON-CVS-AE28ABD8CE2B0B

## resource_ids
src_69ddd24d145d8ec0420b

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
2 | 3

## universities
KAU | HU

## blueprint_weight
0.75

## exam_weight_by_year
KAU_Y2=0.8 | KAU_Y3=0.6 | HU_Y2=0.7

## clinical_relevance
0.6

## academic_relevance
0.9

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
CLM-CVS-FRANK-STARLING-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The greater the heart muscle is stretched during filling, the greater is the force of
contraction and the greater the quantity of blood pumped into the aorta."

## merge_ids

## rejected_merge_candidate_ids
CON-CVS-10EC8DB8FAF3BF

## conflicts

## uncertainty
The relative contribution of increased myofilament calcium sensitivity versus improved
filament overlap is still debated; undergraduate sources state both without weighting them.

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical placement is already more precise than the overlay microtopic.
nanotopicId: The microtopic placement is already more precise than any nanotopic would be.
moduleIds: No verified live module ID was supplied; curriculum mapping remains explicit and unguessed.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the topic blueprint; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "frank starling" and "starling law" — no candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-CVS-10EC8DB8FAF3BF is anterior pericardial fixation — adjacent anatomy, deliberately not merged.
relationships: Walked the 9 concepts under SYS-CVS-T02. Wrote 3 typed edges in SYS-CVS-RELATION-002.md. The rest are same-topic proximity only.
```

---

## Before you hand off

```bash
npm run medical:batch -- "docs/import-ready/concept/<your-file>.md"
npm run medical:simulate -- "docs/import-ready/concept/"*.md --emit /tmp/sim-$SCOPE.json
npm run medical:audit -- --source /tmp/sim-$SCOPE.json
npm run medical:validate:authoring
```

- [ ] I searched for the label, every alias, and the obvious synonym
- [ ] Every `## id` came from `mint-concept-id.mjs`; none was left to the importer's fallback
- [ ] Every field in *must carry a value* has one
- [ ] Every field in *must be present* is present, even where empty
- [ ] Every blank in *may be blank* has a `field_notes` reason naming what I looked for
- [ ] `fieldsUsed` ≥ **50** (the worked example scores 52; there is no excuse for 28)
- [ ] I ran the relationship discovery pass and recorded its outcome in `field_notes`
- [ ] Every article in `article_ids` lists this concept back in its `related_concepts`
- [ ] `weight_confidence` reflects what I actually know, not what I would like to be true
- [ ] All four commands return zero errors

### The failures specific to concepts

| Symptom | Cause |
|---|---|
| `kind: "unknown"` from the validator | The file has no `label` and no `canonical_key` column |
| IDs come out as `med.concept.*` | You omitted `## id` |
| `references unknown resource X` | A `resource_ids` entry is not in the evidence store |
| `X is blank without an explicit reason` | A *may be blank* field is empty with no `field_notes` line |
| `X absent for <id>` | A *must be present* key is missing entirely — different from being empty |
| Duplicate concept reaches the graph | You skipped step 1, or searched only the exact label |
