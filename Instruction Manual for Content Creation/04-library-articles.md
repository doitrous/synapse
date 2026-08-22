# 04 · Library articles

> You must have read [00-START-HERE.md](00-START-HERE.md) before using this file.

An **article** is the prose a student reads. It teaches concepts; it does not replace them.
Everything a question can test should be a concept, and the article is where that concept
is explained well enough to be learnable.

There are **53 columns**. This manual covers all of them.

| | |
|---|---|
| **Imports at** | Admin › Bulk import → **article** (`/admin/import/article`) |
| **Goes in** | `docs/import-ready/article/` |
| **Recognised by** | `summary` **and** `sections` both present — include both or the file is misdetected |
| **`fieldsUsed` floor** | **49** of 53 — the worked example scores **51**. The only columns it omits are `body` and `image_recommendations`, both legacy aliases you should never use. |

---

## Scope

An article exists to cover a concept that is in scope by the same rule as 02-concepts.md §Scope
— tested by a banked question, or taught by the department book chapter the module examines.
Do not write an article for a concept the module never sits, and do not write prose covering
more than the concepts it names in `related_concepts`.

Coverage runs in **both directions**, and both must hold before the pair is finished: every
concept an article teaches goes in that article's `related_concepts`, **and** that concept must
list the article back in its own `article_ids`. At validate time the coverage check is the
**union** of the two — a question's main concept counts as covered if it is in the concept's
own `article_ids`, or if an article named alongside it on `--with` lists it in
`related_concepts` (05-questions.md §Coverage, precisely). That union is a simulation of what
importing both batches together would produce, not what importing already did: the article
importer never backfills a concept's live `article_ids`, so an article that names the concept
in `related_concepts` without the concept naming the article back will validate clean today —
as long as both are named on the same `--with` — and still leave live coverage broken the next
time someone checks without that article in the set. Write both directions for real.

A concept's `article_ids` is not proof either: `scripts/kasr/build-article-links.ts` writes
that field onto generated concept rows heuristically, by term overlap with article text, and
the validator's union rule then passes on the concept side alone. A 2026-08-23 check of 23
concepts found 17 with no article that actually named them and at least 2 links that were
outright wrong. Treat a term-overlap `article_ids` entry as a lead to verify, never as coverage
already achieved — run the coverage-verification pass before a module's INDEX (13-orchestration.md
§4, §10).

---

## The body is plain text in named sections

Not markdown. Not HTML. Not blocks. An article is a list of `### Heading` sections, each
holding plain prose:

```markdown
## sections
### Definition
Heart failure is a clinical syndrome in which the heart cannot deliver…

### Pathophysiology
Reduced stroke volume activates the renin–angiotensin–aldosterone system…
```

Paragraphs split on a blank line. The only inline markup that survives rendering is:

| You write | You get |
|---|---|
| `` `code` `` | inline code |
| `**bold**` | bold |
| `*italic*` | italic |
| `[text](https://…)` | a link — only `https:`, `http:`, `mailto:` and root-relative `/…` survive |

Anything else renders as literal characters. There is no heading syntax inside a section,
no lists, no tables. This is deliberate and it is not going to grow — if you need a
comparison table, file a media request for one.

### There is no inline concept-tag syntax

This surprises everyone. You do **not** write `[[concept]]` or `{{CON-…}}` in the prose.
Concepts connect to articles three ways, all out of band:

1. **`related_concepts`** — the article's list of concept IDs. This is the structural link.
2. **`annotations`** — a quote-anchored tag on one specific sentence. See below.
3. **Automatic matching at render time** — every active concept's label and aliases are
   word-boundary matched in the rendered prose and turned into a pressable popover. You get
   this for free, which is why concept `aliases` matter so much.

---

## Choosing a template

`template_id` sets which sections are expected. Pick the one that matches what the article
*is*, and the archetype is derived from it.

| Template | Archetype | Required sections |
|---|---|---|
| `TPL-CONCEPT` | `concept` | Definition · Mechanism · Key determinants · Clinical significance |
| `TPL-CONDITION` | `condition` | Definition · Epidemiology · Aetiology and risk factors · Pathophysiology · Clinical picture · Investigation · Management · Complications and prognosis |
| `TPL-PRESENTATION` | `presentation` | Definition · Mechanisms · Differential diagnosis · Focused history · Focused examination · Initial investigation · Red flags · Immediate approach |
| `TPL-ANATOMY` | `anatomy` | Overview and position · Structure · Relations · Blood supply, innervation and lymphatics · Development · Surface and imaging anatomy · Clinical correlations |
| `TPL-INVESTIGATION` | `investigation` | Purpose and indications · Principle · How it is performed · Normal findings · Abnormal findings and interpretation · Limitations and pitfalls |
| `TPL-DRUG` | `drug` | Class and members · Mechanism of action · Pharmacokinetics · Indications · Dosing principles · Adverse effects · Contraindications and cautions · Interactions · Monitoring |
| `TPL-SKILL` | `skill` | Purpose and indications · Preparation and consent · Equipment · Step-by-step procedure · Safety and complications · Communication points · Assessment criteria |
| `TPL-ORGANISM` | `organism` | Classification and structure · Epidemiology and transmission · Pathogenesis and virulence · Clinical syndromes · Laboratory diagnosis · Treatment · Prevention and control |
| `TPL-EMERGENCY` | `emergency` | Recognition · Immediate priorities · Initial management · Definitive management · Escalation and referral · Reassessment and disposition · Pitfalls |
| `TPL-PUBLIC-HEALTH` | `public-health` | Definition and scope · Burden and determinants · Evidence base · Interventions and levels of prevention · Measurement and indicators · Policy and health-system context |

Optional sections each template also accepts:

| Template | Optional |
|---|---|
| `TPL-CONCEPT` | Normal values · Applied physiology · Common misconceptions |
| `TPL-CONDITION` | Classification · Prevention · **Egyptian context** |
| `TPL-PRESENTATION` | Age and context variation · Common misdiagnoses |
| `TPL-ANATOMY` | Histology · Variations and anomalies |
| `TPL-INVESTIGATION` | Contraindications · Patient preparation · **Availability and cost in Egypt** |
| `TPL-DRUG` | Use in pregnancy and lactation · Use in renal or hepatic impairment · **Cost and availability in Egypt** |
| `TPL-SKILL` | Contraindications · Documentation · Common OSCE errors |
| `TPL-ORGANISM` | **Endemicity in Egypt** · Antimicrobial resistance |
| `TPL-EMERGENCY` | Paediatric differences · Pre-hospital considerations |
| `TPL-PUBLIC-HEALTH` | **Egyptian national programmes** · Equity considerations |

The bolded ones are where local epidemiology and drug availability belong. Use them —
importing a Western prevalence figure unmarked is the failure mode this whole section
exists to prevent.

**`Components and relations` is a forbidden section.** It is rejected outright.

---

## The prompt

```
You are writing library articles for Synapse, a study platform for undergraduate medical
students in Egypt.

Read, in this order:
1. Instruction Manual for Content Creation/00-START-HERE.md
2. Instruction Manual for Content Creation/04-library-articles.md

Produce ONLY article records in the importer markdown format defined in that manual,
with no commentary before or after.

Non-negotiable:
- Search first with tools/find-existing.mjs. An existing article on this subject gets
  updated, not duplicated.
- Pick a template and write EVERY required section it lists. A missing required section
  is an import error.
- Every concept the article teaches goes in related_concepts, AND that concept's
  article_ids must list this article back. Both directions.
- Annotation quotes must appear VERBATIM in the block you name. The importer checks
  character by character.
- Never invent a fact, a citation, a dose, a URL, or an ID. Media you need is a request
  block, never a made-up link.
- British spelling. status: Draft. publication_gate: needs_evidence.

Validate with `npm run medical:batch` and report fieldsUsed. It must be 49 or more.
```

---

## Fields · must carry a value

From `articlePopulated` in the field audit, plus the importer's own required set.

### Identity and placement

| Key | Required | Rule |
|---|---|---|
| `title` | **yes** | Student-facing. |
| `subject` | **yes** | One of the 20 in `src/data/curriculumCatalog.ts` — see [00-START-HERE §3](00-START-HERE.md) and [02-concepts.md](02-concepts.md) §Placement for the map where the source material doesn't name one outright. |
| `topic` | **yes** | Parent topic in the library navigator. |
| `summary` | **yes** | The opening summary. Also a discriminating column — always include it. |
| `sections` | **yes** in practice | `### Heading` blocks. The audit requires a value; the importer accepts `body` instead, but do not use it — it is legacy. |
| `id` | no | `ART-<SUBJECT>-<SLUG>`. Supply to update. |
| `status` | no | `Draft` · `In review` · `Published` · `Archived`. Write `Draft`. `server/src/studentLedger.js` redacts every item a student can reach at the source, and its one rule is `item.status !== 'Published'` → withheld — nothing else exempts a record. Stays `Draft` until a named reviewer or publisher (`reviewer` / `final_publisher`, not "Admin team" left as the default) flips it by hand; no gate flips it for you. |
| `owner` | no | Defaults to `Admin team`. Content owner. |
| `primary_node_id` | — | Canonical placement, `SYS-CVS-T01`. Derived from the subject/topic crosswalk when omitted — write it anyway. |
| `template_id` | — | From the table above. |
| `archetype` | — | Derived from the template. Write it; it must match. |
| `language` | — | `en`. |
| `learner_stage` | — | `Years 1–3 foundation` or `Years 4–6 clinical`. |
| `reading_time` | — | Estimated minutes. Editor default is 8; importer default 5. |

### Ownership and publication

| Key | Rule |
|---|---|
| `reviewer` | Who checked the medical content. Defaults `Medical team, Admin team`. **Default it to Dr. Omar** where a named reviewer is wanted. |
| `final_publisher` | Who releases it. Defaults `Admin team`. |
| `high_yield` | `Core` · `High` · `Supplementary`. Defaults `Core`. |
| `time_sensitive` | `stable` · `time_sensitive`. Anything that moves with guideline cycles is `time_sensitive`. |
| `publication_gate` | See below. Write `needs_evidence`. |
| `evidence_basis` | How the article is supported, one entry per line. **Prose list — newlines only.** |
| `claim_ids` | Evidence claim IDs this article rests on. |
| `span_ids` | Stable evidence span IDs inside the article. |
| `evidence_gaps` | **Required as a list even when empty** — use `[clear]` for none. The audit errors with `evidenceGaps must be present as an array` otherwise. |
| `notes` | Internal author notes. Never shown to a student. |
| `field_notes` | `field: reason`, one per line. **Prose list.** |

### The publication gate

| Gate | Meaning |
|---|---|
| `needs_evidence` | The default. No verified claim chain yet. |
| `faculty_review` | Needs a named faculty reviewer before release. |
| `conflicted` | Sources disagree; the conflict is recorded, not resolved silently. |
| `publishable` | Every student-visible span is claim-linked and verified. |
| `excluded` | Deliberately not for release. |

High extraction confidence is not verification. A student only ever sees spans that passed
the gate.

### Interconnection

| Key | Rule |
|---|---|
| `related_concepts` | **Every concept this article discusses.** ID list. Each of those concepts must list this article back in its `article_ids`. |
| `related_articles` | Further reading. **Prose list — newlines only.** One per line as `articleId` or `articleId: why they connect`. |
| `resource_ids` | Canonical resources that teach this article. |
| `universities` | University IDs — `OMS \| MMS`. |
| `years` | Year IDs — `OMS_Y2`. |
| `article_source_ids` | Resource IDs supporting the article as a whole. |

---

## Fields · must be present

From `articlePresent`. The key must exist even when empty.

`published_sections` · `published_summary` · `hold_these` · `lose_the_mark` ·
`question_ids` · `module` · `secondary_node_ids` · `subtopic` · `microtopic` · `nanotopic` ·
`university_notes` · `conflicts` · `media` · `last_reviewed` · `review_due`

**A `Published` article with no `published_sections` is an audit error** —
`has no safe student projection`. If you are not setting status to `Published`, leave it
present but empty.

### Hold these · Where people lose the mark

Two prose lists (**newlines only** — a semicolon inside a teaching point would cut it in
half). These are the highest-value fields in the article and the ones most often left blank.

- **`hold_these`** — what a student must retain. Not a summary of the section; the thing
  they should be able to say from memory in six months.
- **`lose_the_mark`** — the specific error that costs marks. Name the wrong belief, not the
  right one.

Each line can be evidence-gated through `callout_evidence`, keyed by the **exact** callout
text:

```markdown
## callout_evidence
### Ordering D-dimer when CTPA is already indicated.
Claims: CLM-RESP-PE-01
Citations: CIT-KA-RESP-PE-01
Span: span-resp-pe-04
Reviewed by: Dr Omar
Reviewed at: 2026-01-12
```

The heading must match a `hold_these` or `lose_the_mark` line character for character, or
the importer reports it.

---

## Fields · may be blank, with a stated reason

From `articleIntentionalBlanks`: `arabic_title` · `aliases` · `question_ids` · `module` ·
`microtopic` · `nanotopic` · `media` · `last_reviewed` · `review_due`

A blank here without a `field_notes` line fails the audit. `N/A` and `TODO` are not reasons.

`arabic_title` and `aliases` deserve real effort rather than a note: aliases are what drive
the automatic concept-linking in rendered prose, and an Arabic title can be researched and
written directly without a separate verification step.

---

## The evidence layer

Spans, claims and citations are stage **S5** — written from the department book, after the
article's prose exists, against the same source that wrote it. In the Kasr toolchain, three
tools carry this in order: `scripts/kasr/extract/deptbook-spans.py` locates candidate spans in
the extracted book text, `scripts/kasr/build-evidence.ts` turns them into claim and citation
batches, and `scripts/kasr/apply-article-evidence.ts` fills a finished article's `claim_ids`
and `span_ids` from that evidence — a targeted rewrite of those two columns only, safe to run
twice, that never touches the hand-authored prose around them.

Landing S5 with `[clear]` in a prose-section column is a live failure, not a hypothetical one:
`[clear]` is the sentinel for an empty **list** column, but `sections`, `published_sections`,
`annotations`, `media` and `media_recommendations` are parsed by `parseSections`, which has no
heading to split on and stores a section whose body is the literal word "[clear]" — visible to
a student on `published_sections`. Thirty articles across three Kasr batches shipped it before
the batch validator was taught to refuse it by name (`60c898a`). The correct empty for any of
those five columns is an empty body, not `[clear]`.

---

## Evidence spans — `span_ids` must carry a value

`articleData.spanIds` is on the audit's **must carry a value** list, not its
must-be-present list. An article with `span_ids` empty — or written as `[clear]` — fails:

```
article.articleData.spanIds missing for ART-CVS-PRELOAD-STROKE-VOLUME
```

So a properly authored article comes with at least one **evidence span**: a record tying one
exact sentence in one section to the claims that support it. All 145 live articles carry
them, which is why the audit currently passes on live state.

A span is an evidence record, so it goes in `docs/import-ready/evidence/` — in **its own
file**, because `detectKind` reads only the first record and a file cannot mix kinds.

| Key | Required | Rule |
|---|---|---|
| `id` | **yes** | `SPN-<SUBJ>-<SLUG>-<NN>`. |
| `article_id` | **yes** | The article this span sits in. |
| `section_id` | **yes** | The section within that article. **Derived, not free text** — see below. |
| `text` | **yes** | The exact sentence a student sees, which the claims support. |
| `text_hash` | no | Derived when omitted, so a reflow cannot detach the span. Omit it. |
| `claim_ids` | no | Claims supporting this sentence. |
| `citation_ids` | no | Citations backing those claims. |

**Section IDs are derived by the importer** as
`<article-id-lowercased>-<heading-slug>`, deduplicated with `-2`, `-3` on repeats. So the
`Mechanism` section of `ART-CVS-PRELOAD-STROKE-VOLUME` is
`art-cvs-preload-stroke-volume-mechanism`. Get this from the article you are writing rather
than guessing — and note it changes if you rename the heading.

```markdown
# Item

## id
SPN-CVS-PRELOAD-01

## article_id
ART-CVS-PRELOAD-STROKE-VOLUME

## section_id
art-cvs-preload-stroke-volume-mechanism

## text
The more the ventricle is filled during diastole, the more forcefully it contracts.

## claim_ids
CLM-CVS-PRELOAD-SV-01

## citation_ids
CIT-KA-PHYSIO-PRELOAD-01
```

The `text` here is the same sentence the annotation quotes, and it is the sentence the
claim asserts. That alignment is the point: the span is what lets a student see *this
sentence* is backed by *that source*.

---

## Statement annotations

An annotation ties one **exact sentence** in the article to a concept, with a typed
relation. This is what makes a specific claim in the prose traceable.

```markdown
## annotations
### definition_of · CON-CVS-7F21D5F24E0D4F
Quote: the more the ventricle is filled during diastole, the more forcefully it contracts
Block: body
Id: ann-cvs-preload-001
```

- Heading splits on `|` or `·`: `relation · conceptId`.
- **`Quote:` must appear verbatim in the named block.** The importer checks it and fails
  with `` the quote "…" does not appear in the body block ``. Copy-paste it; do not retype.

> **The line-wrap trap.** The match is literal — no whitespace normalisation. A quote that
> is one line in your `## annotations` block but wraps across two lines in the section text
> **will not match**, even though it reads identically:
>
> ```
> …improves actin–myosin overlap. The result is that the more the ventricle is filled during
> diastole, the more forcefully it contracts.
> ```
>
> Quoting "the more the ventricle is filled during diastole, the more forcefully it
> contracts" from that fails, because the stored text has a newline between `during` and
> `diastole`. Fix it by keeping the sentence you intend to annotate **on a single line** in
> the section body. This is the most common article import error and it looks like a typo
> when it is not.
- `Block:` is `summary` · `body` · `hold` · `trap`. The `body` block is
  `sections` + `published_sections` + `body` joined.
- `Id:` is optional — it derives from a hash of concept + relation + quote, so re-import is
  idempotent. Omit it.
- Relations are `definition_of` plus all 26 in [03-relationships.md](03-relationships.md).

---

## Media

Media is stage **S6**. Two different things, and mixing them up puts an unfinished asset one
flag away from a student.

### Real media you have — `## media`

```markdown
## media
### image · https://example.org/pv-loop.png
Caption: Pressure–volume loop at three preloads
Alt: Three nested pressure–volume loops, widening as end-diastolic volume rises
Rights: CC BY-SA 4.0
Necessity: The area of the loop is stroke work; prose cannot show the area changing.
Source: Guyton and Hall, Textbook of Medical Physiology
Locator: page 121
Anchor: the curve is flattened and shifted downward
Anchor block: body
```

`Caption:`, `Alt:` and `Rights:` are all required for the asset to reach a student. A media
block with **no URL is dropped** and reported. `Anchor:` must appear in the article text or
nothing becomes pressable.

There is a `Release without review: yes` escape hatch. **Do not use it.** It exists for an
admin who holds the rights but has not recorded them yet.

### Media you need — `## media_recommendations`

```markdown
## media_recommendations
### diagram · Frank–Starling curves at three contractility states
Purpose: The shift between curves is the whole concept and cannot be carried by prose.
Priority: required
Status: needed
Section: Pathophysiology
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain
```

**Every request needs a `Purpose:` line** — articles fail with
`Image recommendation N has no Purpose: line saying why prose is not enough`. `Section:`
should name a real section heading. Full syntax in [00-START-HERE.md](00-START-HERE.md) §6.

`image_recommendations` is a legacy alias for the same field. Use `media_recommendations`.

One article may request several assets — one per section that needs one. Write one `###`
block each.

---

## University overlay

Universities are an overlay, not a branch of the tree. Where two universities teach
something differently, that is a note on **one** article — never two articles.

```markdown
## universities
OMS | MMS

## years
OMS_Y2 | OMS_Y3 | MMS_Y2

## module

## university_notes
OMS: Kasr Alainy expects the two-level Wells score, not the three-level version.
MMS: The Mansoura course covers this under Emergency Medicine rather than Respiratory.
```

`university_notes` is a **prose list** — one note per line, `UNIVERSITY: text`. It renders
as a distinct in-article aside.

---

## Worked example

Abbreviated prose, complete field coverage.

```markdown
# Item

## id
ART-CVS-PRELOAD-STROKE-VOLUME

## title
Preload and stroke volume

## arabic_title
الحمل القبلي وحجم الضربة

## aliases
Frank-Starling in practice
Ventricular filling and output

## subject
cvs

## topic
Cardiac physiology

## subtopic
SUB_CVS_CARDIAC_OUTPUT

## microtopic
MIC_CVS_PRELOAD

## nanotopic

## primary_node_id
SYS-CVS-T01-S02-M01

## secondary_node_ids
DIS-PHY-T02

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
7

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Dr. Omar

## reviewer
Dr. Omar

## final_publisher
Dr. Omar

## summary
Preload is the degree of ventricular filling at the end of diastole. Within physiological
limits, more filling produces a larger stroke volume without any change in contractility —
the Frank–Starling relationship. Separating this from a change in contractility is what
makes every ventricular function curve readable.

## sections
### Definition
Preload is the load on the ventricular myocardium at the end of diastole, approximated
clinically by end-diastolic volume and, less reliably, by end-diastolic pressure.

### Mechanism
Stretching cardiac muscle increases the sensitivity of the myofilaments to calcium and
improves actin–myosin overlap.
The more the ventricle is filled during diastole, the more forcefully it contracts.

### Key determinants
Venous return, atrial contraction, heart rate and ventricular compliance. Anything that
shortens diastole reduces filling time and therefore preload.

### Clinical significance
A patient whose stroke volume rises after a fluid bolus is preload-responsive. That is a
position on one Frank–Starling curve, not a change in contractility.

## published_summary

## published_sections

## hold_these
Preload moves the heart along one Frank–Starling curve; contractility moves it onto a different curve.
Within physiological limits, more end-diastolic volume means more stroke volume.

## lose_the_mark
Reading any rise in stroke volume as a rise in contractility.
Treating end-diastolic pressure as interchangeable with end-diastolic volume — compliance sits between them.

## callout_evidence
### Preload moves the heart along one Frank–Starling curve; contractility moves it onto a different curve.
Claims: CLM-CVS-PRELOAD-SV-01
Citations: CIT-KA-PHYSIO-PRELOAD-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-15

## related_concepts
CON-CVS-7F21D5F24E0D4F

## related_articles
ART-CVS-CARDIAC-CYCLE: the filling phase this article depends on

## question_ids

## resource_ids
src_69ddd24d145d8ec0420b

## article_source_ids
src_69ddd24d145d8ec0420b

## claim_ids
CLM-CVS-PRELOAD-SV-01

## span_ids
SPN-CVS-PRELOAD-01

## universities
OMS

## years
OMS_Y2

## module

## university_notes
OMS: Kasr Alainy teaches this under Experimental Physiology in second year.

## annotations
### definition_of · CON-CVS-7F21D5F24E0D4F
Quote: The more the ventricle is filled during diastole, the more forcefully it contracts.
Block: body

## media

## media_recommendations
### graph · Frank–Starling curves at three contractility states
Purpose: The shift between curves is the entire distinction the article turns on, and a
student cannot hold a family of curves from a sentence.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

### diagram · Preload, afterload and contractility on one ventricular pressure–volume loop
Purpose: Shows why end-diastolic pressure and volume diverge when compliance changes —
the trap named in "Where people lose the mark".
Priority: strongly helpful
Status: needed
Section: Key determinants

## publication_gate
needs_evidence

## evidence_basis
Kasr Alainy Physiology CVS course notes, cross-checked against a standard physiology text.

## evidence_gaps
The compliance–pressure relationship is asserted but not yet claim-linked.

## conflicts

## last_reviewed

## review_due

## notes
Written to support the preload concept; the afterload article should be written next and
cross-linked.

## field_notes
nanotopicId: The microtopic placement is already more precise than any nanotopic would be.
moduleIds: No verified live module ID was supplied; curriculum mapping remains explicit and unguessed.
questionIds: No questions test this article yet; they are the next batch.
media: No rights-cleared asset exists yet — two are requested in media_recommendations.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
```

Only the **blank** intentional-blank fields need a note. `arabicTitle`, `aliases` and
`microtopicId` are filled above, so they are correctly absent from `field_notes`.

---

## Before you hand off

```bash
npm run medical:batch -- "docs/import-ready/article/<your-file>.md"
npm run medical:simulate -- "docs/import-ready/article/"*.md --emit /tmp/sim-$SCOPE.json
npm run medical:audit -- --source /tmp/sim-$SCOPE.json
npm run medical:validate:authoring
```

> **`related_articles` is checked against the batch directory, not live state.** Pointing at
> an article that is already published gives you
> `related article ART-CVS-CARDIAC-CYCLE is authored nowhere in the batch directory` from
> `medical:batch`, even though it exists. The worked example above produces exactly that,
> and simulates clean:
>
> ```
> batches: [{"file":".../example-article.md","kind":"article","created":1,"updated":0,"rejected":0}]
> delta:   {"articles":1}
> errors:  []
> ```
>
> Trust `medical:simulate` for anything that resolves an ID.

- [ ] I searched before creating; an existing article was updated rather than duplicated
- [ ] Every required section for my `template_id` is present
- [ ] `archetype` matches the template
- [ ] No `Components and relations` section
- [ ] Every annotation `Quote:` is copy-pasted, not retyped, and appears in the named block
- [ ] Every concept in `related_concepts` lists this article back in its `article_ids`
- [ ] `evidence_gaps` is present as a list, `[clear]` if none
- [ ] `hold_these` and `lose_the_mark` are filled, one item per line
- [ ] Every media need is a request with a `Purpose:` line; no invented URLs
- [ ] `fieldsUsed` ≥ **49** (the worked example scores 51)
- [ ] All four commands return zero errors

### The failures specific to articles

| Symptom | Cause |
|---|---|
| `kind` is not `article` | The file lacks `summary` or `sections` |
| `the quote "…" does not appear in the body block` | Annotation quote retyped or paraphrased |
| `Image recommendation N has no Purpose: line` | Media request missing `Purpose:` |
| `N media blocks have no URL after "### type ·" and would be dropped` | A `## media` block with no URL — it should have been a request |
| `evidenceGaps must be present as an array` | `evidence_gaps` omitted entirely |
| `has no safe student projection` | `status: Published` with empty `published_sections` |
| `references unknown concept X` | A `related_concepts` ID that does not exist |
| `still carries a Components and relations section` | Forbidden section |
| `related article X is authored nowhere in the batch directory`, but X is live | Directory-scoped check. Confirm with `medical:simulate`. |
| A teaching point arrives cut in half | You used `;` in a prose list. One item per line. |

---

## `module_subject` — where inside a module this article belongs

A module ID alone is too coarse to revise by: a module runs for a term and
covers two or more disciplines, so "this belongs to `101 ISK`" does not tell a
student working on the brachial plexus whether it is theirs.

Write the way down, **one path per line**:

```
## module_subject
101 ISK > Anatomy > Upper Limb > Brachial Plexus
101 ISK > Histology > Epithelium
```

Newlines separate paths — never `|` or `;`. Every other list column accepts
those, and this one must not: a faculty's own subject name may contain either,
and splitting on them would cut it in half.

The first segment may name the module, by ID or by name, and is optional.
Segments match the module's subject tree by name, ignoring case and padding.

A path that stops matching resolves to **nothing**, and reports the segment it
failed on. It does not fall back to the last segment that did match — that would
file the article a level above where it was meant to go, which is worse than
being told it failed.

The path is stored as written, not as a resolved ID. The subject tree gets
reorganised as department books change, and a path that stops resolving can be
reported and repaired, where a stale ID just points at nothing.

Build the tree first, with an indented outline in **Academic Setup › Import** —
see `01-subjects-and-topics.md`.
