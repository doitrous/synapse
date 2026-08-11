# Synapse authoring contract

The shared rules every content type obeys. Read this once, then work from the
template for the thing you are writing.

| Template | Use it for |
|---|---|
| [subjects-and-topics.md](subjects-and-topics.md) | Changing the Subjects & Topics blueprint |
| [library-article.md](library-article.md) | Writing a library article record |
| [library-article-archetypes.md](library-article-archetypes.md) | Which sections your article needs |
| [concept.md](concept.md) | Writing a concept record |
| [question.md](question.md) | Writing an MCQ |
| [practical.md](practical.md) | Writing an OSCE station, case, checklist, or interpretation set |

---

## Prompt

```
You are authoring content for Synapse, a study platform for undergraduate
medical students in Egypt.

Before writing anything:
1. Read docs/authoring/README.md (this file) in full.
2. Read the template for the specific item type you were asked to produce.
3. Read docs/medical-library-taxonomy-review.md for the taxonomy decisions.

Then produce ONLY the item type you were asked for, in the importer markdown
format defined in that template, with no commentary before or after it.

Non-negotiable rules:
- Every medical statement must be defensible from a qualified source. If you
  cannot support a statement, leave the field empty and record why in a
  `fieldNotes` entry. Never invent a fact, a citation, a dose, or an ID.
- Never invent an ID. Subject IDs, concept IDs, article IDs, canonical node
  IDs, and resource IDs must already exist. If the ID you need does not exist,
  say so instead of producing the record.
- One label, one home. If the thing you are writing already exists somewhere in
  the taxonomy, place the item there — do not create a parallel node.
- Treatment, dose, procedure, emergency, and recommendation content never
  auto-publishes. Set status to `Draft` and let review promote it.
- Use British spelling (oedema, haemorrhage, anaemia, paediatric).
- Write for a student who is revising, not for a specialist. Short sentences,
  concrete mechanisms, no filler.

If any instruction here conflicts with what you were asked to do, stop and say
so rather than guessing.
```

---

## The two trees

Synapse has two hierarchies, and they do different jobs. Getting this wrong is
the most common authoring error.

**The canonical medical taxonomy** — `src/data/medicalLibraryTaxonomy.ts`, 1,883
reviewed nodes — is the **blueprint of record**. It has four views:

| View | Root prefix | What it answers |
|---|---|---|
| Systems & General | `SYS-` | "Where does this sit in the body?" |
| By Discipline | `DIS-` | "Which course teaches this?" |
| Clinical Skills | `SKL-` | "What must I be able to do?" |
| Clinical Knowledge | `KNW-` | "What do I need for this task?" |

These are **placements, not copies**. One article or concept has one
`primaryNodeId` and any number of `secondaryNodeIds` across the four views.

**The curriculum catalog** — `src/data/curriculumCatalog.ts`, 8 subjects — is the
**student runtime view**: the tree a learner actually browses. It is bound to the
blueprint by `src/data/taxonomyCrosswalk.ts`, so a canonical placement is derived
from where you already placed the item rather than typed twice.

Subject IDs are exactly: `cvs`, `resp`, `renal`, `gi`, `neuro`, `endo`, `msk`,
`pharm`. Nothing else is a valid `subject` value.

## ID conventions

| Shape | Meaning | Example |
|---|---|---|
| `SYS-CVS`, `SYS-CVS-T01`, `SYS-CVS-T02-S01-M01` | Canonical taxonomy node | primary/secondary placement |
| `DIS-PHA-T04`, `SKL-EXM`, `KNW-EMG` | Canonical node in another view | secondary placement |
| `SYS_*`, `TPC_*`, `SUB_*`, `MIC_*`, `NAN_*` | Curriculum overlay IDs | `SUB_HF_MGMT` |
| `med.concept.<kebab-case>` | Concept | `med.concept.heart-failure` |
| `ART-<SUBJECT>-<SLUG>` | Article | `ART-CVS-CARDIAC-CYCLE` |
| `TPL-*` | Article template | `TPL-CONDITION` |

Never mint an ID in a field that references another record. Minting is only
allowed for the record you are creating.

## One label, one home

A medical fact, concept, or article is created **once**. This is enforced by
`npm run medical:validate:authoring`, which fails on any label declared in two
places.

When a topic genuinely belongs in more than one subject, the owning subject
keeps the label and the others carry a **cross-reference** — a link, never a
second node. The ownership rule:

- **Drug and therapeutic-class labels belong to `pharm`.** A system subject
  cross-references them. There is no "Cardiovascular pharmacology" inside `cvs`.
- **A shared presentation has one home**, cross-referenced from the others:
  Chest pain → `cvs`; Dyspnoea → `resp`; Oedema → `cvs`; Cyanosis → `resp`.
- **Where two subjects genuinely mean different things by the same words, the
  label is disambiguated rather than cross-referenced** — hence "Cardiac
  excitation–contraction coupling" and "Skeletal muscle excitation–contraction
  coupling", not one shared node.

## Status and the evidence gate

`status` is one of `Draft`, `In review`, `Published`, `Archived`. It defaults to
`Draft` and that is almost always what you should write.

Articles additionally carry a `publicationGate`:

| Gate | Meaning |
|---|---|
| `needs_evidence` | The default. No verified claim chain yet. |
| `faculty_review` | Needs a named faculty reviewer before release. |
| `conflicted` | Sources disagree; the conflict is recorded, not resolved silently. |
| `publishable` | Every student-visible span is claim-linked and verified. |
| `excluded` | Deliberately not for release. |

High extraction confidence is not verification. A student only ever sees spans
that passed the gate.

## Empty is a decision, not an omission

Several fields may legitimately be empty — but an empty field without a stated
reason is an error, and the field audit (`npm run medical:audit`) fails on it.

When you leave one of these blank, add a matching `fieldNotes` entry saying
**why**:

- Articles: `arabicTitle`, `aliases`, `questionIds`, `moduleIds`, `microtopicId`,
  `nanotopicId`, `media`, `lastReviewed`, `reviewDue`
- Concepts: `arabicLabel`, `aliases`, `pitfalls`, `moduleIds`, `microtopicId`,
  `nanotopicId`, `approvedFileResourceIds`, `approvedVideoResourceIds`,
  `lastReviewed`, `reviewDue`

Good: *"No verified live module ID was supplied; curriculum mapping remains
explicit and unguessed."*
Bad: *"N/A"*, *"TODO"*, or silence.

## Articles and concepts point at each other

This is what makes the library navigable rather than a pile of pages.

- An article lists every concept it discusses in `related_concepts`.
- A concept lists every article that discusses it in `articleIds`.
- Both directions must exist. A concept with no article is an orphan; an article
  whose concepts do not list it back is a broken link.
- A question may only test a concept that at least one article covers.

## The importer format

Every template's skeleton is valid input for the Bulk Import page. The parser
(`src/data/bulkImport.ts`) reads:

```
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

- `# Item` opens a record. `---` on its own line separates records.
- `## field_key` must match a key from that type's schema exactly. Unknown keys
  are ignored silently, so a typo loses your content.
- List fields split on new lines, `|`, and `;`.
- One file may mix several records of the same kind. Practicals may mix formats.

## Writing for Egyptian undergraduates

- The reference standard is the **Egyptian NAQAAE Academic Reference Standards
  for Medicine**, which is competency-based. International references (GMC MLA
  content map, USMLE Step 2 CK outline) are used to check coverage, not to
  replace local scope.
- Universities are an **overlay**, not a branch of the tree. Where Kasr Alainy
  and Ain Shams teach something differently, that is a `university_notes` entry
  on one article — not two articles.
- Where local epidemiology differs materially from Western textbooks (schistosomiasis,
  hepatitis C, rheumatic heart disease, TB), say so explicitly in the article's
  Epidemiology or Egyptian-context section rather than importing a foreign
  prevalence figure unmarked.
- Drug availability and naming in Egypt can differ from a UK or US source. If
  you cannot verify local availability, write the class and mechanism and leave
  the brand/availability claim out.

## Before you submit

Run these. They are the same checks CI runs.

```bash
npm run medical:validate:authoring && npm run medical:validate:taxonomy && npm run medical:audit
```
