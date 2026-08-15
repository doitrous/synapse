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
- Add media only where a figure teaches something the prose cannot. Give every
  item a URL, alt text, and its rights; an item missing rights or alt text is
  held back until an admin releases it. Anchor it to a phrase when it explains
  those exact words; otherwise leave it article-level.
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

### Media

| Field key | Source of truth | Rule |
|---|---|---|
| `media` | `articleData.media` | One `### type · URL` block per item, then its labelled lines. |

A media item is either **anchored** to a phrase or **article-level**:

- **Anchored** — add `Anchor:` with text copied verbatim from the article. The
  reader marks that phrase as pressable and opens the media when a student
  presses it. Use `Anchor block:` to say where the phrase lives: `body`
  (default), `summary`, `hold`, or `trap`.
- **Article-level** — omit `Anchor:`. The item appears in the article's **Media**
  section instead.

Either way the item is listed in the sidebar's *Media in this article* panel, so
an anchored figure is never hidden from a student who is looking for it.

**What reaches a student.** An item with a URL, alt text, and cleared rights is
shown. An item missing rights or alt text is **held back by default** — but that
is a default, not a rule. The article editor states which items are held back and
why, and offers *Show to students anyway* on each one; in the importer the same
override is `Release without review: yes`. Nothing is ever withheld silently, and
the admin has the final say.

The one thing an override cannot fix is a missing URL: there is nothing to
render. Alt text falls back to the caption when an item is released without it.

```markdown
## media
### image · https://example.org/pv-loop.png
Caption: Pressure–volume loop in HFrEF.
Alt: A pressure–volume loop shifted right and down.
Rights: CC BY-SA 4.0
Necessity: The flattened curve is hard to picture from text alone.
Source: Kumar & Clark's Clinical Medicine
Locator: page 1042
Anchor: the curve is flattened and shifted downward
Anchor block: body

### video · https://example.org/cardiac-cycle.mp4
Caption: Cardiac cycle walkthrough.
Alt: Animation of valve events across one cardiac cycle.
Rights: Licensed for teaching use.
Necessity: Valve timing is clearer in motion than in a still figure.
```

**Anchor rules**

- The quote must appear **verbatim** in the article, or nothing becomes
  pressable. The editor warns you when it does not match.
- Anchor the words that name the thing, not a whole paragraph. "the curve is
  flattened" is a good anchor; a five-line sentence is not.
- One phrase carries one media item. Where two items match the same text, the
  first wins and the second stays article-level — split the sentence instead.
- Anchoring is for media that *explains that specific phrase*. If it illustrates
  the article generally, leave it article-level.

### Statement annotations — tagging the sentences that carry a concept

This is the importer's form of the editor's *Tag selected statement*. Use it for
the sentences worth standing out: a definition, a step in a mechanism, a contrast
students conflate.

| Field key | Source of truth | Rule |
|---|---|---|
| `annotations` | `articleData.annotations` | One `### relation · conceptId` block per annotation. |

```markdown
## annotations
### definition_of · med.concept.cardiac-output
Quote: the volume of blood ejected by one ventricle in one minute
Block: body
Id: ann-cvs-co-001
```

- `Quote:` must appear **verbatim** in the block you name, or the row is
  rejected. This is checked before anything is written — an annotation that
  highlights nothing is a silent failure, so it is made loud instead.
- `Block:` is `summary`, `body` (default), `hold`, or `trap`.
- The relation is `definition_of` or any concept relation type.
- `Id:` is optional. Omitted, it is derived from the concept, relation and quote,
  so re-importing the same file changes nothing.
- The concept must already exist and must be `published` before its annotation
  reaches a student. A student sees the concept's **label**, never its ID.

### Image recommendations — admin-only

A recommendation says what visual an article needs and why prose cannot carry it.
It is an instruction to a person, not content: it never appears in a published
article, its HTML, its search data, or any student API response. The backlog is
at **Library Setup → Image recommendations**, filterable by system, article,
priority and status.

| Field key | Source of truth | Rule |
|---|---|---|
| `media_recommendations` | `articleData.mediaRequests` | One `### medium-or-kind · rest` block per asset. |
| `image_recommendations` | `articleData.mediaRequests` | The former name for the same field. Still read, so authored batches keep importing; write `media_recommendations` in anything new. |

```markdown
## media_recommendations
### anatomy plate · Coronary artery territories mapped to ECG leads
Purpose: A student cannot hold the lead-to-territory mapping from prose alone.
Priority: required
Status: needed
Section: Blood supply, innervation and lymphatics
Source direction: openly licensed anatomy atlas
Rights: must be CC-BY or public domain
```

Articles, questions and practicals all record their outstanding assets as a
`MediaRequest`, and they share one backlog at **Library Setup → Media requests**.

The heading carries two axes, kept apart on purpose:

- **Medium** — `image`, `audio`, `video`. Lead with one of these when the asset
  is not a picture: `### audio · Station 2`, with the brief on a `Brief:` line.
- **Kind** — `diagram`, `anatomy plate`, `histology`, `flowchart`, `graph`,
  `comparison table`, `imaging example`, `algorithm`, `clinical photograph`,
  `other`. This is the genre of an image and means nothing for audio or video.
  Lead with a genre and the medium is taken to be `image`, with the rest of the
  heading read as the brief — which is the form above.

- `Purpose:` is required. If you cannot say what prose fails to convey, the
  asset is decorative — leave it out.
- `Priority:` `required`, `strongly helpful`, `optional`. `required` means the
  item is not usable without it and must not publish until it exists.
- `Status:` `needed`, `planned`, `supplied`, `declined`. Add `Media id:` once a
  real media item fulfils it.

### Callout evidence — what makes a callout publishable

An evidence-gated article publishes a `hold_these` or `lose_the_mark` line only
when that line carries its own evidence, or the article records a review. Lines
that pass neither test stay hidden, and the reader shows nothing rather than
substituting generic advice.

| Field key | Source of truth | Rule |
|---|---|---|
| `callout_evidence` | `articleData.calloutEvidence` | One `### exact callout text` block per line. |

```markdown
## callout_evidence
### Ordering D-dimer when CTPA is already indicated.
Claims: claim-pe-1
Citations: cite-pe-1
Reviewed by: Dr Omar
```

The heading must match the callout **exactly**, or the row is rejected — evidence
attached to a line that does not exist would silently fail to publish it.

### Links — these make the library navigable

| Field key | Source of truth | Rule |
|---|---|---|
| `related_concepts` | `articleData.relatedConceptIds` | Every concept this article discusses. Each must exist and must list this article back. |
| `related_articles` | `articleData.relatedArticleIds` | Further reading, one per line as `articleId` or `articleId: why they connect`. Only links to a readable article reach a student; dead IDs are dropped. |
| `question_ids` | `articleData.questionIds` | Questions testing this article. Empty is fine — add a `fieldNotes` reason. |
| `resource_ids` | `articleData.resourceIds` | Resources that teach it. |

### Scope

| Field key | Source of truth | Rule |
|---|---|---|
| `universities` | `articleData.universityIds` | University IDs this applies to, e.g. `HU \| ASU`. |
| `years` | `articleData.yearIds` | Year IDs, e.g. `OMS_Y2`. |
| `module` | `articleData.moduleIds` | Module IDs. Leave empty rather than guessing; add a `fieldNotes` reason. |
| `university_notes` | `articleData.universityNotes` | `OMS: note text`, one per line. For genuine local teaching differences — not a second article. |

### Identity and language

| Field key | Source of truth | Rule |
|---|---|---|
| `id` | `ManagedContentItem.id` | Existing canonical ID to update. Omit to create. In update mode a blank column leaves that field alone; a leading `+` adds to a list instead of replacing it; write `[clear]` to empty a list on purpose. |
| `aliases` | `articleData.aliases` | Alternate names and spelling variants. An alias never creates a second taxonomy node. |
| `arabic_title` | `articleData.arabicTitle` | Reviewed Arabic title. |
| `language` | `articleData.language` | Primary language of the prose, e.g. `en`. |
| `nanotopic` | `articleData.nanotopicId` | Optional overlay, `NAN_*`. |

### Student projection

| Field key | Source of truth | Rule |
|---|---|---|
| `published_summary` | `articleData.publishedSummary` | The student-facing summary when it differs from the admin draft. |
| `published_sections` | `articleData.publishedSections` | The evidence-gated projection, same `### Heading` format as `sections`. Setting it makes the article evidence-gated. |

### Evidence

| Field key | Source of truth | Rule |
|---|---|---|
| `evidence_basis` | `articleData.evidenceBasis` | How the article is supported, one entry per line. |
| `article_source_ids` | `articleData.articleLevelSourceIds` | Resources supporting the article as a whole. |
| `claim_ids` | `articleData.claimIds` | Evidence claims this article rests on. Each must resolve. |
| `span_ids` | `articleData.spanIds` | Stable evidence spans inside the article. |
| `conflicts` | `articleData.conflicts` | Where sources disagree. Record the disagreement; never choose silently. |
| `evidence_gaps` | `articleData.evidenceGaps` | What is still unsupported. Must be present as a list even when empty — use `[clear]`. |

### Governance

| Field key | Source of truth | Rule |
|---|---|---|
| `status` | `ManagedContentItem.status` | `Draft` unless you are the reviewer promoting it. |
| `owner` | `ManagedContentItem.owner` | Author or team. |
| `reviewer` | `articleData.reviewer` | Who checked the medical content. |
| `final_publisher` | `articleData.finalPublisher` | Who released it to students. |
| `last_reviewed` | `articleData.lastReviewed` | ISO date. Publishes this article's callouts under the callout policy above. |
| `review_due` | `articleData.reviewDue` | ISO date this must be re-checked by. |
| `time_sensitive` | `articleData.timeSensitive` | `stable` or `time_sensitive`. Anything that moves with guideline cycles is `time_sensitive` — do not default everything to stable. |
| `publication_gate` | `articleData.publicationGate` | `publishable`, `needs_evidence`, `faculty_review`, `conflicted`, or `excluded`. |
| `field_notes` | `articleData.fieldNotes` | Why a field is intentionally empty, one per line as `field: reason`. |
| `notes` | `articleData.notes` | Internal author notes. Never shown to a student. |

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

## media
### image · <url>
Caption: <what the figure shows>
Alt: <what a screen reader should say>
Rights: <licence or permission>
Necessity: <what it teaches that the prose cannot>
Anchor: <verbatim phrase from the article, or omit for article-level>
Anchor block: body
Release without review: <yes, only to publish before rights/alt are recorded>

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
- A media item has no URL — there is nothing to show.
- A media anchor quotes text that is not in the article.
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
