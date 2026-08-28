# 03 · Relationships

> You must have read [00-START-HERE.md](00-START-HERE.md) before using this file.

A **relationship** is a typed, directed edge between two concepts. It is what turns 1,718
isolated facts into something a student can navigate: *this causes that*, *you need this
before that makes sense*, *these two are the pair everyone confuses*.

The graph currently holds **1,718 concepts and 47 relationships**. This is the thinnest
part of the platform and the highest-value thing you can work on.

| | |
|---|---|
| **Imports at** | Admin › Relationships › Import (`/admin/relationships/import`) |
| **Goes in** | `docs/import-ready/relations/` |
| **Recognised by** | `source` + `type` + `target` all present |
| **Evidence goes in** | `docs/import-ready/evidence/` |
| **No `fieldsUsed`** | The relation branch reports `verified`, `needsEvidence` and `byType` instead. Check `byType` matches the edges you wrote. |

**Relations, claims and citations have no `field_notes` column.** The "say why it is empty"
rule in [00-START-HERE §5](00-START-HERE.md) does not apply here and cannot — writing
`## field_notes` on a relation fails with `unknown column "field_notes"`. Leave optional
fields out silently, and put anything worth saying in your hand-off report instead.

---

## When to write these

Relations are stage **S4** in [13-orchestration.md](13-orchestration.md) §4 — written once a
module's concept layer (S2) is settled, so an edge points at a `primary_node_id` and an
`article_ids` list that are not about to change under it.

Evidence for an edge comes from the department book first, the same source priority named in
[00-START-HERE.md](00-START-HERE.md) — a standard textbook only where the corpus has no
department text for that module, and cited as such.

Batch one module's edges together as `relations/<module>-relations.md` in that university's
import root, next to its `<module>-coverage.md`. Report the `verified` and `needsEvidence`
counts `medical:batch` prints for the file (see the header box above), not a guess at how many
edges "feel" reviewed.

---

## Read this before anything else

Two rules here will waste your afternoon if you learn them the hard way.

### 1 · Validate with the simulator, not the file validator

`npm run medical:batch` resolves references by scanning **the directory the file is in** —
not live state. This applies to relations *and* citations. So a perfectly correct edge
between two live concepts, and a perfectly correct citation against a real source, both
report:

```
Item 1 (CON-CVS-… -prerequisite_of-> CON-CVS-AE28ABD8CE2B0B): Target concept CON-CVS-AE28ABD8CE2B0B does not exist
Item 1 (CIT-KA-PHYSIO-PRELOAD-01): Resource src_69ddd24d145d8ec0420b does not exist
```

Both of those IDs are real and live. That is the tool being directory-scoped, not your work
being wrong. The check that means anything here is:

```bash
npm run medical:simulate -- "docs/import-ready/evidence/"*.md "docs/import-ready/relations/"*.md --emit /tmp/sim-$SCOPE.json
```

which loads live state first, then applies your batch in dependency order. The same four
files that produce the errors above simulate clean:

```
batches: [
 { "file": ".../0-concept.md",  "kind": "concept",  "created": 1, "updated": 0 },
 { "file": ".../a-claim.md",    "kind": "claim",    "created": 1, "updated": 0, "rejected": 0 },
 { "file": ".../b-citation.md", "kind": "citation", "created": 1, "updated": 0, "rejected": 0 },
 { "file": ".../c-relation.md", "kind": "relation", "created": 1, "updated": 0, "rejected": 0 }
]
delta: {"concepts":1,"relations":1,"claims":1,"citations":1}
errors: 0  skipped: 0
```

Use `medical:batch` for syntax and per-record contract checks; use `medical:simulate` for
anything that resolves an ID.

**`medical:simulate` has no `--with` flag — only `medical:batch` does.** Everything on
this page about widening `medical:batch`'s directory scope with repeated `--with <file>`
does not carry over: `medical:simulate`'s parser reads whatever token follows `--with` as
that flag's own value and silently drops it, and every file introduced by a later
`--with` on the same command line goes the same way. The run still exits 0 with
`errors: []`, because a dropped file was never read, let alone rejected — it looks exactly
like a clean pass. Name every sibling file positionally instead, in the apply order this
manual's worked commands already use (`... "evidence/"*.md "relations/"*.md ...`).

**A bare `---` line inside a long field — `support_span`, `original_wording`, a quoted
passage in `qualifiers` or `context_note` — silently ends the record.** The importer
splits one file into records on any line that is only `---`, the exact same separator used
between `# Item` blocks. A horizontal rule or a row of dashes carried over from the
source PDF's own formatting truncates everything after it into a broken second record,
with no error naming what happened. Strip a bare `---` line out of any quoted source text
before saving the batch.

### 2 · An edge with no evidence chain is rejected at rest

Both the batch validator and `npm run medical:audit` error on any relation missing
`evidence_claim_ids` **or** `citation_ids`:

```
Item 1: no evidence chain — the audit rejects this at rest
rel-CON-CVS-A-causes-CON-CVS-B has no evidence chain
```

Setting `verification_status: needs_evidence` does **not** exempt it. There is no such
thing as a valid edge without a claim and a citation.

So writing a relationship means writing three records: the **edge**, the **claim** it
rests on, and the **citation** that supports the claim. This manual covers all three.
Existing claims and citations are reusable — there are 1,741 claims and 1,818 citations in
live state, and pointing at one of those is better than authoring a new one.

### 3 · One kind per file

`detectKind` inspects **only the first record** and validates the entire file against that
one kind. Put a claim and a citation in the same file and the citation is parsed as a
claim, producing a wall of nonsense:

```
Item 2 (CIT-…): unknown column "support_span"
Item 2 (CIT-…): unknown column "locator_page"
Item 2 (CIT-…): Concept ID is required
Item 2 (CIT-…): Risk class is required
```

Nothing there says "you mixed two kinds", so it is worth recognising on sight. Claims in
one file, citations in another, relations in a third:

```
docs/import-ready/evidence/SYS-CVS-CLAIM-002.md
docs/import-ready/evidence/SYS-CVS-CITATION-002.md
docs/import-ready/relations/SYS-CVS-RELATION-002.md
```

---

## The prompt

```
You are authoring concept relationships for Synapse, a study platform for undergraduate
medical students in Egypt.

Read, in this order:
1. Instruction Manual for Content Creation/00-START-HERE.md
2. Instruction Manual for Content Creation/03-relationships.md

Produce relation records, plus the claim and citation records each edge needs, in the
importer markdown format defined in that manual. Relations and evidence go in separate
files. No commentary before or after.

Non-negotiable:
- Both endpoints must already exist. Never mint a concept ID here — if the concept you
  need does not exist, author it via 02-concepts.md or stop and say so.
- Every edge needs both evidence_claim_ids and citation_ids. An edge without them is
  rejected by the audit, whatever its verification_status says.
- Reuse an existing claim where one fits before authoring a new one.
- Direction is meaningful. "A causes B" is not "B causes A".
- Bidirectional means two rows, not a flag.
- Never invent a source, a page number, or a quotation. The support_span must be the
  source's own words.

Validate with `npm run medical:simulate`, not `npm run medical:batch`.
```

---

## The 26 relation types

Every value, verbatim from `CONCEPT_RELATIONS`. Read `A —type→ B` as a sentence.

### Structure and taxonomy

| Type | Reads as | Use it for |
|---|---|---|
| `is_a` | A is a kind of B | Subtype to supertype. Atrial fibrillation `is_a` supraventricular arrhythmia. |
| `part_of` | A is part of B | Component to whole. The SA node `part_of` the conducting system. |
| `contains` | A contains B | The inverse of `part_of`, written from the whole. |
| `composed_of` | A is composed of B | What a structure is made of, rather than which parts it has. |
| `located_in` | A is located in B | Anatomical position. |
| `connects_to` | A connects to B | Physical continuity. |
| `supplies` | A supplies B | Arterial supply, innervation. |
| `drains_into` | A drains into B | Venous and lymphatic drainage. |

### Causation and mechanism

| Type | Reads as | Use it for |
|---|---|---|
| `causes` | A causes B | Direct causation. Not correlation, not association. |
| `mechanism_step_before` | A is the step before B | One link in a chain. Build a pathway out of several of these rather than one vague `related_concepts`. |
| `increases` | A increases B | Quantitative, directional. |
| `decreases` | A decreases B | Quantitative, directional. |
| `regulates` | A regulates B | Control without a fixed direction — use when the effect can go either way. |
| `complication_of` | A is a complication of B | Written from the complication. |
| `accompanies` | A accompanies B | Co-occurrence with no causal claim. |
| `associated_with` | A is associated with B | The weakest causal claim. Use when the literature says association and you must not overstate it. |

### Clinical reasoning

| Type | Reads as | Use it for |
|---|---|---|
| `presents_as` | A presents as B | Disease to symptom or sign. |
| `diagnosed_by` | A is diagnosed by B | The test that establishes it. |
| `investigated_by` | A is investigated by B | A test that contributes without being diagnostic. |
| `treated_by` | A is treated by B | Condition to treatment. |
| `contraindicates` | A contraindicates B | A condition against a treatment. |
| `differential_of` | A is a differential of B | What else it could be. |

### Learning

| Type | Reads as | Use it for |
|---|---|---|
| `prerequisite_of` | A is a prerequisite of B | You cannot understand B without A. **The most useful type in the whole list** — it is what lets the platform sequence revision. |
| `often_confused_with` | A is often confused with B | The pair students actually mix up. Worth more to a revising student than five `related_concepts`. |
| `contrasts_with` | A contrasts with B | Deliberately compared, without being confused. |
| `related_concepts` | A is related to B | The fallback. **If you find yourself reaching for this, look at the list again** — an untyped edge carries almost no information, and the concept's own `related_concept_ids` already does that job. |

### Direction is not decoration

`causes` in one direction is a different claim from `causes` in the other. Getting it
backwards produces a graph that teaches the wrong thing. Before writing an edge, say the
sentence out loud with the type in the middle. If it does not read as true, the direction
or the type is wrong.

**Bidirectional means two rows, not a flag.** For genuinely symmetric types —
`often_confused_with`, `contrasts_with`, `associated_with`, `accompanies` — write both:

```markdown
## source
CON-CVS-AAAAAAAAAAAAAA
## type
often_confused_with
## target
CON-CVS-BBBBBBBBBBBBBB

---

## source
CON-CVS-BBBBBBBBBBBBBB
## type
often_confused_with
## target
CON-CVS-AAAAAAAAAAAAAA
```

Each row needs its own evidence chain. They may share the same claim and citation.

### Custom types

If none of the 26 fits, an admin can define a custom type at
Admin › Relationships (**"Add a custom relationship type"**), which slugifies it into
`synapse-relation-types-v1` and makes it available to bulk import. **You cannot create one
from a batch file** — the importer validates `type` against the stored list, and an unknown
value fails as `"X" is not a relation type`. If you need one, say so in your report and use
the closest built-in meanwhile.

---

## Relation fields · all 11

| Key | Label | Required | Rule |
|---|---|---|---|
| `source` | Source concept ID | **yes** | The concept the edge points **from**. Must already exist. |
| `type` | Relation type | **yes** | One of the 26 above, or a registered custom type. |
| `target` | Target concept ID | **yes** | The concept the edge points **to**. Must already exist. |
| `id` | Relation ID | no | **Omit it.** Derived as `rel-<source>-<type>-<target>`, which makes re-import idempotent. Only supply one to update an edge that already has a non-derived ID. |
| `evidence_claim_ids` | Evidence claim IDs | *effectively yes* | Claims supporting this edge. ID list — newline, `\|` or `;`. |
| `citation_ids` | Citation IDs | *effectively yes* | Citations backing those claims. |
| `verification_status` | Verification status | no | `verified` · `needs_evidence` · `conflicted`. **`verified` is only accepted when both a claim and a citation are named.** Write `needs_evidence` unless a human has reviewed it. |
| `confidence` | Confidence (0–1) | no | How sure you are of the edge itself. |
| `qualifiers` | Qualifiers | no | One `key: value` per line. Where the edge only holds under conditions: `population: adults`, `state: decompensated`, `polarity: negative`. |
| `reviewer` | Reviewer | no | Defaults to `Medical team, Admin team`. |
| `reviewed_at` | Reviewed at | no | ISO date. Only set when `verified`. |

### What the importer refuses

| Error | Meaning |
|---|---|
| `Source concept X does not exist` | Endpoint not in live state (simulate) or the batch directory (batch) |
| `A relation cannot point a concept at itself` | `source` equals `target` |
| `"X" is not a relation type` | Not in the 26 and not a registered custom type |
| `Claim X does not exist` / `Citation X does not exist` | Evidence ID does not resolve |
| `A relation may only be verified when it names both a claim and a citation` | `verified` without the chain |
| `duplicate of an edge already in this batch` / `…already in the graph` | Same source + type + target, regardless of ID |

A duplicate is the same **direction, type and endpoints**. `A causes B` and `B causes A`
are not duplicates — they are two different claims, and usually one of them is wrong.

---

## The evidence chain

Three records, in this order: **resource → claim → citation**. Import order matters —
the simulator applies claims before citations and citations before relations.

### Reuse first

There are 1,741 claims and 1,818 citations already live. Check before authoring:

```bash
node -e "
const ev=JSON.parse(require('fs').readFileSync('server/data/medical-library-v1.json','utf8')).states['synapse-medical-evidence-v1'];
const term=process.argv[1].toLowerCase();
for(const c of ev.claims) if((c.displayText||'').toLowerCase().includes(term)) console.log(c.id, '|', c.displayText);
" "frank-starling"
```

If a claim already says what your edge rests on, point at it. Do not author a second.

### Claim fields · all 14

A claim is one atomic assertion, in subject–predicate–object form.

| Key | Required | Rule |
|---|---|---|
| `id` | **yes** | `CLM-<SYSTEM>-<SLUG>-<NN>`, e.g. `CLM-CVS-FRANK-STARLING-01`. **`SYSTEM` is the same body-system code concepts use — not the subject ID.** `renal` → `REN`, `resp` → `RES`, `gi` → `GIT`, `endo` → `END`, `neuro` → `NEU`. Full list: `AND CVS DER DEV END FND GIT GYN HEM IMM INF MSK MUL NEU OBS POP PSY REN RES`. Simplest safe rule: take the code from the concept ID in `concept_id`. |
| `concept_id` | **yes** | The concept this claim supports. Must already exist. |
| `subject` | **yes** | The thing the claim is about. |
| `predicate` | **yes** | The relation asserted — `is`, `causes`, `contains`. |
| `object` | **yes** | What is asserted of the subject. |
| `display_text` | **yes** | The claim as one readable sentence. **A student may see this**, so write it as prose, not as a triple. |
| `risk_class` | **yes** | `foundational_stable` · `clinical_non_treatment` · `treatment_or_action`. Anything touching a dose, a drug choice or an emergency action is `treatment_or_action` and will not auto-publish. |
| `verification_status` | no | `verified` · `needs_evidence` · `conflicted` · `excluded`. Defaults to `needs_evidence`. |
| `conflict_status` | no | `none`, or a description of how sources disagree. |
| `confidence` | no | 0–1. |
| `freshness` | no | `stable_local_curriculum_fact`, or the guideline cycle it follows. |
| `time_sensitive` | no | `yes` or `no`. Anything that moves with guideline cycles is `yes`. |
| `review_due` | no | ISO date. **Required when time-sensitive.** |
| `qualifiers` | no | One `key: value` per line — polarity, laterality, population, state, numbers and units. |

> Authoring a **new** source — getting a PDF into the evidence store so a citation can name
> it — is [12-resources.md](12-resources.md). A `src_…` ID must already exist in the corpus;
> you cannot invent one.

### Citation fields · all 12

A citation ties a claim to an exact place in a source.

| Key | Required | Rule |
|---|---|---|
| `id` | **yes** | `CIT-<SLUG>-<NN>`. |
| `claim_id` | **yes** | The claim this supports. Must already exist. |
| `resource_id` | **yes** | The source. Must already exist in the evidence store. |
| `evidence_role` | **yes** | `local_curriculum` for a university source; `independent_verification` for an authoritative one. |
| `support_span` | **yes** | **The source's own words.** Quoted, not paraphrased. If you cannot quote it, you cannot cite it. |
| `locator_type` | no | `page` · `printed_page` · `section` · `line` · `span` · `timestamp`. |
| `locator_page` | no | Page number in the file. |
| `locator_section` | no | Named section or heading. |
| `locator_detail` | no | Anything finer — a line range, a character span, a timestamp. |
| `context_note` | no | What a reader needs in order to interpret the span. |
| `confidence` | no | 0–1. |
| `counts_as_claim_evidence` | no | `yes` or `no`. **Only a citation with an exact locator may count** — the audit errors with `counts as evidence without an exact locator` otherwise. |

---

## Worked example

**Three files.** Claims, citations and relations each go in their own file — see the
one-kind-per-file rule above.

First the claim, `docs/import-ready/evidence/SYS-CVS-CLAIM-002.md`:

```markdown
# Item

## id
CLM-CVS-PRELOAD-SV-01

## concept_id
CON-CVS-7F21D5F24E0D4F

## subject
Ventricular end-diastolic volume

## predicate
increases

## object
Stroke volume, within physiological limits

## display_text
Within physiological limits, an increase in ventricular end-diastolic volume increases
stroke volume without any change in contractility.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
population: adults
state: physiological range only
```

Then the citation, `docs/import-ready/evidence/SYS-CVS-CITATION-002.md`:

```markdown
# Item

## id
CIT-KA-PHYSIO-PRELOAD-01

## claim_id
CLM-CVS-PRELOAD-SV-01

## resource_id
src_69ddd24d145d8ec0420b

## evidence_role
local_curriculum

## support_span
"The greater the heart muscle is stretched during filling, the greater is the force of
contraction and the greater the quantity of blood pumped into the aorta."

## locator_type
page

## locator_page
121

## locator_section
Regulation of cardiac output · Heterometric regulation

## locator_detail
lines 14–19

## context_note
Stated as the Frank–Starling mechanism; the surrounding text makes clear it holds only
within the physiological range of stretch.

## confidence
0.95

## counts_as_claim_evidence
yes
```

`src_69ddd24d145d8ec0420b` is `PHYSIO CARDIOVASCULAR SYSTEM.pdf`, a real Kasr Alainy
resource already in the evidence store. Resource IDs are `src_<hash>` — you cannot invent
one, and a made-up ID fails with `Resource X does not exist`. List what is available with:

```bash
node -e "
const ev=JSON.parse(require('fs').readFileSync('server/data/medical-library-v1.json','utf8')).states['synapse-medical-evidence-v1'];
for(const r of ev.resources) console.log(r.id,'|',r.title,'|',r.institution||'');
"
```

Finally the edge, `docs/import-ready/relations/SYS-CVS-RELATION-002.md`:

```markdown
# Item

## source
CON-CVS-7F21D5F24E0D4F

## type
prerequisite_of

## target
CON-CVS-AE28ABD8CE2B0B

## evidence_claim_ids
CLM-CVS-PRELOAD-SV-01

## citation_ids
CIT-KA-PHYSIO-PRELOAD-01

## verification_status
needs_evidence

## confidence
0.85

## qualifiers
population: adults
scope: undergraduate physiology sequence

## reviewer
Medical team, Admin team
```

No `## id` — it derives to `rel-CON-CVS-7F21D5F24E0D4F-prerequisite_of-CON-CVS-AE28ABD8CE2B0B`,
so importing the file twice updates one edge rather than creating two.

---

## Finding edges worth writing

Do not sit down to "write ten relationships". Start from a topic and read what is already
there:

```bash
node -e "
const g=JSON.parse(require('fs').readFileSync('server/data/medical-library-v1.json','utf8')).states['synapse-concept-graph-v2'];
const node=process.argv[1];
const here=g.concepts.filter(c=>(c.primaryNodeId||'').startsWith(node));
for(const c of here){
  const edges=g.relations.filter(r=>r.sourceId===c.id||r.targetId===c.id).length;
  console.log(String(edges).padStart(2), c.id, c.label);
}
console.log('... '+here.length+' concepts, '+here.filter(c=>!g.relations.some(r=>r.sourceId===c.id||r.targetId===c.id)).length+' with no edges');
" SYS-CVS-T01
```

Real output today:

```
 1 CON-CVS-7C9D59D257AC65 Fibrous and serous layers of the pericardium
 2 CON-CVS-AE28ABD8CE2B0B Heart within the pericardium and middle mediastinum
 1 CON-CVS-AD0D9E76B568F0 Retrosternal position of the heart
 0 CON-CVS-930E4596CA5673 Spiral relation of the pulmonary trunk and ascending aorta
 0 CON-CVS-10EC8DB8FAF3BF Anterior pericardial fixation
 0 CON-CVS-4B1B7D6AE18CC6 Anterior relation of the sternocostal surface
 0 CON-CVS-1D2C77D7421EF7 Atrial formation of the upper cardiac border
 0 CON-CVS-5E6A3445314E64 Attachments of a tricuspid valve cusp
... 98 concepts, 53 with no edges
```

Concepts showing `0` are the work. Note that a node with no concepts under it returns
nothing at all — live CVS concepts currently sit under `SYS-CVS-T01` only, so
`SYS-CVS-T02` is genuinely empty rather than broken. For each, ask the four questions that produce most of
the good edges:

1. **What must a student already understand before this makes sense?** → `prerequisite_of`
2. **What is the next step in the mechanism?** → `mechanism_step_before`
3. **Which concept in this topic do students mix this up with?** → `often_confused_with`
4. **What does this cause, or what causes it?** → `causes`

An edge you cannot support with a quotable source is not an edge yet. Write it down in your
report as a gap rather than inventing a citation for it.

---

## Before you hand off

```bash
npm run medical:batch -- "docs/import-ready/evidence/<your-evidence-file>.md"
npm run medical:simulate -- "docs/import-ready/evidence/"*.md "docs/import-ready/relations/"*.md --emit /tmp/sim-$SCOPE.json
npm run medical:audit -- --source /tmp/sim-$SCOPE.json
```

**Read `delta` and `errors`, not `conceptsNowCarryingVerifiedClaims`.** Despite its name,
that key is **not a delta** — it is a full dump of every unpublished concept in the library
carrying a verified claim, and it returns the same ~1,616 entries whether your batch changed
anything or nothing:

```bash
$ npm run medical:simulate -- <a claim that already exists> --emit /tmp/sim-probe.json
  delta:   {"concepts":0,"relations":0,"claims":0,"citations":0}
  conceptsNowCarryingVerifiedClaims: 1616 entries
```

Zero delta, 1,616 "now carrying". Your concepts appear in it whether or not your batch
touched them, so it cannot tell you your evidence landed. The keys that can:

```
delta:  {"relations":3,"claims":1,"citations":1}
errors: []
```

`delta` counts what your batch actually added. `errors: []` means every ID resolved. Those
two are the result.

- [ ] Both endpoints of every edge already exist; I minted no concept IDs here
- [ ] I said each edge out loud as a sentence and the direction reads true
- [ ] Symmetric relationships are two rows, each with its own evidence
- [ ] Every edge names both a claim and a citation
- [ ] I checked for an existing claim before authoring a new one
- [ ] Every `support_span` is the source's own words, and I did not invent a page number
- [ ] `counts_as_claim_evidence: yes` only where the locator is exact
- [ ] No edge uses `related_concepts` where a specific type would have fitted
- [ ] `verification_status` is `needs_evidence` unless a human reviewed it
- [ ] I validated with **simulate**, and understand why `batch` reports missing endpoints

### The failures specific to relationships

| Symptom | Cause |
|---|---|
| `Source concept X does not exist`, but it is live | You used `medical:batch`. Use `medical:simulate`. |
| `no evidence chain — the audit rejects this at rest` | Missing `evidence_claim_ids` or `citation_ids` |
| `"X" is not a relation type` | Typo, or a custom type that was never registered in the admin UI |
| `duplicate of an edge already in the graph` | The edge exists. Update it, or leave it alone. |
| `counts as evidence without an exact locator` | `counts_as_claim_evidence: yes` with no `locator_page` / `locator_section` / `locator_detail` |
| `medical:simulate` reports `errors: []`, but a sibling file's IDs still resolve as missing | You passed it after `--with`; `medical:simulate` has no such flag and silently dropped it — list every file positionally instead |
| A record after a long quoted passage is missing or garbled | A bare `---` line inside `support_span`/`original_wording`/a qualifier ended the record early — strip stray horizontal rules from pasted source text |
| Two edges appear where you wrote one | You supplied `## id` and it did not match the derived form |
