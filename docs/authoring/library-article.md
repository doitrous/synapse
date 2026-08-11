# Template · Library article

An article is a **studiable unit** that sits at one place in the blueprint and
discusses named concepts. It is not a textbook chapter and not a summary of
everything known.

Source of truth: `src/data/contentControl.ts:ArticleAuthoringData`,
`src/data/bulkImport.ts:IMPORT_SCHEMAS.article`, section contract in
[library-article-archetypes.md](library-article-archetypes.md).

---

## Prompt

```
You are writing a library article for Synapse, a study platform for
undergraduate medical students in Egypt.

Read docs/authoring/README.md, then this file, then
docs/authoring/library-article-archetypes.md.

Produce ONE article record in the importer markdown format shown in the
"Skeleton" section below, and nothing else — no preamble, no closing remarks.

Before writing:
1. Decide the archetype (condition, presentation, concept, anatomy, drug, skill,
   investigation, organism, emergency, public-health). This fixes your section
   headings — take them from library-article-archetypes.md and use them verbatim.
2. Find the article's home in the blueprint. One primary node, plus secondary
   nodes for other views where it genuinely belongs.
3. List the concepts the article will discuss. If a concept does not exist yet,
   note it — do not invent a concept ID.

While writing:
- Every factual sentence must be defensible from a qualified source. Where you
  cannot support one, cut it. Do not hedge a fact into existence.
- The summary is what a student reads in the list. Make it a claim about the
  topic, not a description of the article. Not "This article covers heart
  failure" but "Heart failure is a syndrome of inadequate output at normal
  filling pressures."
- `hold_these` are the points worth memorising. `lose_the_mark` are the specific
  errors students actually make — not generic advice.
- NEVER write a "Components and relations" section. That appendix was removed
  when articles became prose; the audit rejects any article that still has one.
- Never state a dose, a treatment recommendation, or an emergency action without
  a source. Set status to Draft; these never auto-publish.
- British spelling. Short sentences. No filler transitions.

If a required field cannot be filled honestly, leave it empty and add a
`fieldNotes` line saying why.
```

---

## Fields

### Required — the article is rejected without these

| Field key | Source of truth | Rule |
|---|---|---|
| `title` | `ManagedContentItem.title` | The thing itself, not a question. "Pulmonary embolism", not "What is PE?" |
| `subject` | `ManagedContentItem.subjectId` | One of `cvs`, `resp`, `renal`, `gi`, `neuro`, `endo`, `msk`, `pharm`. |
| `topic` | `fields.Topic` | The curriculum topic this sits under. Must exist in the tree. |
| `summary` | `articleData.summary` | 1–3 sentences making a claim about the topic. Shown in listings. |

### Structural — what makes it an article rather than a note

| Field key | Source of truth | Rule |
|---|---|---|
| `sections` | `articleData.sections` | `### Heading` per line, then the body. Headings come from your archetype, in order. A `Components and relations` section is forbidden. |
| `template_id` | `articleData.templateId` | `TPL-CONDITION`, `TPL-CONCEPT`, `TPL-PRESENTATION`, `TPL-ANATOMY`, `TPL-INVESTIGATION`, `TPL-DRUG`, `TPL-SKILL`, `TPL-ORGANISM`, `TPL-EMERGENCY`, `TPL-PUBLIC-HEALTH`. |
| `archetype` | `articleData.archetype` | Derived from `template_id` when omitted. Set it only to override. |
| `hold_these` | `articleData.holdThese` | High-yield points, one per line. 3–6. Each must be a complete, checkable statement. |
| `lose_the_mark` | `articleData.loseTheMark` | Specific errors students make. One per line. 2–5. |
| `reading_time` | `fields['Reading time']` | Minutes, integer. Roughly 200 words per minute. |
| `learner_stage` | `articleData.learnerStage` | e.g. `Years 1–3 foundation` or `Years 4–6 clinical`. |
| `high_yield` | `articleData.highYield` | `Core`, `High`, or `Supplementary`. Defaults to `Core`. |

### Placement

| Field key | Source of truth | Rule |
|---|---|---|
| `primary_node_id` | `articleData.primaryNodeId` | Canonical home, e.g. `SYS-CVS-T01`. Derived from subject+topic via the crosswalk when omitted. |
| `secondary_node_ids` | `articleData.secondaryNodeIds` | Other genuine placements across the four views. Not a tag cloud — each must be defensible. |
| `subtopic` | `articleData.subtopicId` | Optional curriculum overlay, `SUB_*`. |
| `microtopic` | `articleData.microtopicId` | Optional overlay, `MIC_*`. Leave empty with a `fieldNotes` reason when canonical placement is more precise. |

### Links — these make the library navigable

| Field key | Source of truth | Rule |
|---|---|---|
| `related_concepts` | `articleData.relatedConceptIds` | Every concept this article discusses. Each must exist and must list this article back. |
| `question_ids` | `articleData.questionIds` | Questions testing this article. Empty is fine — add a `fieldNotes` reason. |
| `resource_ids` | `articleData.resourceIds` | Resources that teach it. |

### Scope

| Field key | Source of truth | Rule |
|---|---|---|
| `universities` | `articleData.universityIds` | University IDs this applies to, e.g. `HU \| ASU`. |
| `years` | `articleData.yearIds` | Year IDs, e.g. `OMS_Y2`. |
| `module` | `articleData.moduleIds` | Module IDs. Leave empty rather than guessing; add a `fieldNotes` reason. |
| `university_notes` | `articleData.universityNotes` | `OMS: note text`, one per line. For genuine local teaching differences — not a second article. |

### Governance

| Field key | Source of truth | Rule |
|---|---|---|
| `status` | `ManagedContentItem.status` | `Draft` unless you are the reviewer promoting it. |
| `owner` | `ManagedContentItem.owner` | Author or team. |

## Skeleton

Copy this, fill it, paste it into Bulk Import. Delete the fields you genuinely
cannot fill — but record why in `fieldNotes` via the editor.

```markdown
# Item

## title
<The thing itself>

## subject
<cvs | resp | renal | gi | neuro | endo | msk | pharm>

## topic
<Curriculum topic title, exactly as it appears in the tree>

## template_id
<TPL-CONDITION | TPL-CONCEPT | TPL-PRESENTATION | TPL-ANATOMY | TPL-INVESTIGATION | TPL-DRUG | TPL-SKILL | TPL-ORGANISM | TPL-EMERGENCY | TPL-PUBLIC-HEALTH>

## learner_stage
Years 1–3 foundation

## high_yield
Core

## status
Draft

## summary
<1–3 sentences that make a claim about the topic.>

## sections
### <First required heading for your archetype>
<Body.>
### <Next required heading>
<Body.>

## hold_these
<High-yield point 1>
<High-yield point 2>
<High-yield point 3>

## lose_the_mark
<A specific error students make>
<Another specific error>

## primary_node_id
<SYS-XXX-TNN>

## secondary_node_ids
<DIS-XXX>
<KNW-XXX>

## related_concepts
med.concept.<slug>
med.concept.<slug>

## resource_ids
<resource id>

## universities
<HU | ASU>

## years
<Year 2>

## reading_time
<minutes>

---

# Item
...
```

## Worked fragment

The tone to aim for — mechanism first, then why it matters:

```markdown
## summary
Heart failure is a clinical syndrome in which the heart cannot deliver output
sufficient for metabolic demand at normal filling pressures. The compensatory
responses that restore output in the short term are the same ones that drive
progressive decline.

## hold_these
Heart failure is a syndrome, not a diagnosis — always name the underlying cause.
Prognostic therapy in HFrEF works by blocking compensation, not by stimulating the heart.
A flattened Frank–Starling curve explains why filling pressures rise while output does not.

## lose_the_mark
Equating NYHA class with ACC/AHA stage. NYHA moves both ways with treatment; ACC/AHA stage never regresses.
Giving a positive inotrope as chronic therapy because "the heart is weak".
```

## Reject if

- You cannot name the archetype, so you cannot name the sections.
- The article restates another article rather than adding a distinct unit — merge
  instead, or make one a section of the other.
- `related_concepts` is empty. An article that discusses no named concept is a
  note, not a library article.
- Any concept ID, resource ID, or canonical node ID in the record does not exist.
- The article carries a `Components and relations` section.
- The record contains a dose, treatment recommendation, or emergency action you
  cannot cite.
- `summary` describes the article ("This article explains…") instead of the topic.

## Self-check

- [ ] Every `## key` matches a key in `IMPORT_SCHEMAS.article`.
- [ ] Section headings match the archetype's required list, in order, and none is
      `Components and relations`.
- [ ] Every `related_concepts` ID exists, and each of those concepts lists this
      article in its `articleIds`.
- [ ] `primary_node_id` exists in the canonical taxonomy; every
      `secondary_node_ids` entry is defensible, not decorative.
- [ ] Every intentionally blank field has a `fieldNotes` reason.
- [ ] `status` is `Draft`.

```bash
npm run medical:audit
```
