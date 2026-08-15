# 12 · Resources and sources

> You must have read [00-START-HERE.md](00-START-HERE.md) before using this file.

This is the manual for getting a **PDF, textbook, guideline or video into Synapse** — so a
student can open it, and so a claim can cite page 121 of it rather than a sentence of free
text.

| | |
|---|---|
| **Goes in** | `docs/import-ready/resource/` and `docs/import-ready/evidence/` |
| **`fieldsUsed` floor** | catalogue **16** of 18 · source **14** of 17 |

---

## One PDF, two records

The word "resource" names two different things, kept in two different stores, imported on
two different pages. Confusing them is the mistake this manual exists to prevent.

| | **A · Catalogue resource** | **B · Evidence source** |
|---|---|---|
| What it is | Something a **student opens** — a book, a video, a deck | Something a **claim cites** — the provenance record |
| Lives in | the content ledger | the evidence store |
| Imports at | Bulk import → **resource** | Evidence › Import |
| Schema | `IMPORT_SCHEMAS.resource`, 18 columns | `EVIDENCE_IMPORT_FIELDS.resource`, 17 columns |
| Folder | `docs/import-ready/resource/` | `docs/import-ready/evidence/` |
| Pointed at by | a question's `resource_ids` | a concept's `resource_ids`, a citation's `resource_id` |
| Can you invent the ID? | Yes — you are creating the record | **No.** See §Never invent a source ID |

**They share an ID.** All 47 sources in live state exist in both stores under the same
`src_…` identifier. That is the convention: one PDF, one ID, two records. Write both, with
the same `id`, and everything that points at either resolves.

> Which one do you need? If a **student** should be able to open it, write A. If a **claim**
> needs to cite it, write B. A textbook you are authoring questions from usually needs
> **both**.

---

## Never invent a source ID

An evidence source whose ID starts `src_` must already exist in the corpus. The validator
checks it against `corpus-source-index.json`, and refuses anything it does not find:

```
Item 1 (src_totallyinventedsource99): src_totallyinventedsource99 is not a source the
corpus contains — do not invent a source ID
```

The check exists because three invented IDs once passed every other check and would have
become citations pointing at sources that never existed.

**So a local PDF cannot be cited until it has been through the corpus pipeline.** If the
file is not in the corpus, you have three honest options, in order of preference:

1. Cite a source that *is* in the corpus and says the same thing.
2. Cite it as a **web source** instead, if it has a public URL — `RES-WEB-…` IDs are not
   corpus-checked, but need `publication_date` and `accessed_at` under LD-08.
3. Record it in the question's free-text `source_citation` and author no evidence record.
   Weaker, but honest, and `source_citation` is required on every question anyway.

Never option 4, which is to make up an ID that looks plausible.

### Find out what the corpus already has

```bash
node -e "
const j=require('./docs/medical-library-program/evidence/corpus-source-index.json');
const q=process.argv[1].toLowerCase();
for (const [id, r] of Object.entries(j.sources))
  if (!q || (r.sourceRelativePath ?? '').toLowerCase().includes(q)) console.log(id, '|', r.sourceRelativePath);
" cardio
```

267 sources are indexed. If the PDF you were handed is one of them, use its ID.

> **The 47 sources already in live state are not in that index.** They came from an earlier
> pipeline run, and the index has moved on. So a citation naming one of them — the two Kasr
> Alainy CVS PDFs among them — trips the guard with *"is not a source the corpus contains"*
> even though the source is perfectly real and live.
>
> That is a false alarm on a known set of 47 legacy IDs, not a defect in your batch. Check
> against live state before believing it:
>
> ```bash
> node -e "
> const ev=JSON.parse(require('fs').readFileSync('server/data/medical-library-v1.json','utf8')).states['synapse-medical-evidence-v1'];
> const id=process.argv[1];
> const hit=ev.resources.find(r=>r.id===id);
> console.log(hit ? 'LIVE: '+hit.title : 'not a live source either — this one really is invented');
> " src_69ddd24d145d8ec0420b
> ```
>
> Live but unindexed is fine. Neither live nor indexed is the failure the guard is for.

> **The index must sit beside your batch.** The validator looks for
> `corpus-source-index.json` in the folder it is validating, and **silently skips the check
> when it is missing** — so an invented ID would pass. `docs/import-ready/evidence/` carries
> a symlink to the generated index for exactly this reason. If you author evidence anywhere
> else, put the index there too, or you lose the guard without being told.

Regenerate it with:

```bash
node --experimental-strip-types scripts/build-corpus-source-index.mjs
```

---

## A · The catalogue resource — 18 columns

What a student opens. Imports at **Bulk import → resource**.

| Key | Required | Rule |
|---|---|---|
| `title` | **yes** | The source as a student would recognise it. |
| `subject` | **yes** | One of `cvs resp renal gi neuro endo msk pharm`. |
| `type` | **yes** | `Book` · `Video` · `Guideline` · `Deck` · `Article`. |
| `source` | **yes** | Publisher, institution or author. |
| `id` | no | Use the `src_…` ID if this PDF is in the corpus, so both records match. |
| `status` | no | `Draft`. |
| `owner` | no | Author or team responsible. |
| `url` | no | Direct link or internal asset URL. |
| `year` | no | Four-digit publication year. |
| `topics` | no | Topic/subtopic IDs or titles it covers. **Solving questions on this resource pulls in these topics**, so this is what makes it usable as a revision filter. |
| `chapter` | no | Chapters it covers. Files land in the Files tab, videos in the Videos tab. |
| `module_ids` | no | Modules it serves. |
| `included_concepts` | no | Concept IDs it covers. **Each named concept is auto-updated to approve this resource** — this is what fills a concept's `approvedFileResourceIds`, which every concept currently leaves blank. |
| `included_articles` | no | Library article IDs it supports. |
| `concept_locations` | no | Page-level deep links, one per line: `conceptId \| page\|line\|slide\|timestamp \| locator`. |
| `universities` | no | University IDs. |
| `years` | no | Year IDs — `HU_Y2 \| HU_Y3`. |
| `description` | no | What it teaches and why it is relevant. |

`included_concepts` is the field worth caring about. Every concept in the repo currently
carries a `field_notes` line saying no resource has cleared rights for it. Naming the
concept here is what removes that.

> **Do not run `npm run medical:batch` on a catalogue-resource file.** `detectKind` has no
> branch for it, so it falls through to `unknown` and crashes with
> `TypeError: Cannot read properties of undefined (reading 'map')`. That means "wrong tool",
> not "bad file" — the same trap as subjects and glossary. Use `medical:simulate`, and the
> import wizard's own preview.

---

## B · The evidence source — 17 columns

What a citation points at. Imports at **Evidence › Import**. This one **is** validated by
`medical:batch`.

| Key | Required | Rule |
|---|---|---|
| `id` | **yes** | The corpus `src_…` ID for a local file, or `RES-WEB-…` for a web source. Not invented. |
| `title` | **yes** | The source as it would be cited. |
| `institution` | **yes** | Kasr Alainy, OpenStax, WHO. |
| `processing_status` | **yes** | The corpus state, or `authoritative_article_level_reference` for a web source. |
| `collection_id` | no | Which corpus collection it belongs to. |
| `source_relative_path` | no | Path within the corpus. **Must match the corpus record exactly** — a mismatch errors. Never an absolute path from your machine. |
| `source_uri` | web only | The URL you actually read. |
| `media_type` | no | `application/pdf`, `text/html`. |
| `languages` | no | `en \| ar`. |
| `publication_date` | **web** | ISO date. Required for a web source under LD-08. |
| `accessed_at` | **web** | ISO date you read it. Required for a web source. |
| `page_count` | no | |
| `sha256` | no | Content hash, where one exists. Do not compute a fake one. |
| `rights` | no | Licence or permission basis. |
| `qualification` | no | **Why this source is qualified to support a medical claim.** A lecture handout and a national guideline are not equivalent; say which this is. |
| `confidence` | no | 0–1. How much weight it carries. |
| `is_assessment` | no | `yes`/`no`. **An exam paper is curriculum signal, not medical authority** — mark past papers `yes` so nothing treats them as clinical evidence. |

`is_assessment` matters when you are working from past papers. It lets the platform learn
what gets examined without ever citing an exam paper as proof that something is medically
true.

---

## The whole chain, for a textbook you are authoring from

Four records, four files, one folder each. Same `id` in the first two.

```
docs/import-ready/resource/SYS-CVS-RESOURCE-001.md    catalogue  (student can open it)
docs/import-ready/evidence/SYS-CVS-SOURCE-001.md      source     (claims can cite it)
docs/import-ready/evidence/SYS-CVS-CLAIM-001.md       claim      (what it says)
docs/import-ready/evidence/SYS-CVS-CITATION-001.md    citation   (where it says it)
```

One kind per file — `detectKind` reads only the first record and validates the whole file
against it. Claims and citations are covered in
[03-relationships.md](03-relationships.md); the citation is what carries the page number.

Import order is `resource → … → claim → citation`, so the source must land before anything
cites it.

---

## Worked example

**A · catalogue**, `docs/import-ready/resource/SYS-CVS-RESOURCE-001.md`:

```markdown
# Item

## id
src_99d6986f57e3e3c8e44f

## title
Cardiovascular System, Part 1

## subject
cvs

## type
Book

## source
Ain Shams University — Faculty of Medicine

## status
Draft

## owner
Dr. Omar

## url

## year
2023

## topics
TPC_CVS_CARDIAC_PHYSIOLOGY

## chapter
Regulation of cardiac output
Arterial blood pressure

## module_ids

## included_concepts
CON-CVS-7C9D59D257AC65

## included_articles
ART-CVS-HEART-ORIENTATION

## concept_locations
CON-CVS-7C9D59D257AC65 | page | 121

## universities
OMS

## years
OMS_Y2

## description
The Ain Shams cardiovascular course book, part one. 181 pages covering cardiac anatomy,
autorhythmicity and conduction, and the cardiac cycle.
```

**B · source**, `docs/import-ready/evidence/SYS-CVS-SOURCE-001.md`:

```markdown
# Item

## id
src_99d6986f57e3e3c8e44f

## title
Cardiovascular System, Part 1

## institution
Ain Shams University

## processing_status
taxonomy_complete

## collection_id

## source_relative_path
2. Ain Shams Uni Books/Cvs_part 1.pdf

## source_uri

## media_type
application/pdf

## languages
en

## publication_date

## accessed_at

## page_count
181

## sha256
1607cbb975648fb114b3b8f6f3d19cf9e702c1168b14628999eeff9faa0c0d44

## rights
Faculty teaching material, used under the university's own licence.

## qualification
A prescribed university course book, and the text the local examination is written against.
Authoritative for local curriculum scope; cross-check any clinical recommendation against a
current guideline.

## confidence
0.85

## is_assessment
no
```

Every value here — the path, the hash, the page count, the processing status — is copied
from the corpus index rather than typed from the file. That is the only way to be sure
`source_relative_path` matches, and it is why the record validates.

---

## Before you hand off

```bash
npm run medical:batch -- "docs/import-ready/evidence/<your-source-file>.md"
npm run medical:simulate -- "docs/import-ready/resource/"*.md "docs/import-ready/evidence/"*.md --emit /tmp/synapse-sim.json
npm run medical:audit -- --source /tmp/synapse-sim.json
```

- [ ] I wrote **both** records if a student should open it and a claim should cite it, with the same `id`
- [ ] Every `src_…` ID came from the corpus index — I invented none
- [ ] `corpus-source-index.json` is present in the folder I validated, so the check actually ran
- [ ] `source_relative_path` either matches the corpus exactly or is empty
- [ ] A past paper is marked `is_assessment: yes`
- [ ] `qualification` says why this source can support a medical claim
- [ ] I did **not** run `medical:batch` on the catalogue file
- [ ] No `sha256` I could not compute, no `url` I could not open

### The failures specific to this type

| Symptom | Cause |
|---|---|
| `X is not a source the corpus contains — do not invent a source ID` | The `src_` ID is not in the index. Use a real one, or a `RES-WEB-` web source. |
| `X is "…" in the corpus, not "…"` | `source_relative_path` disagrees with the corpus record. Leave it empty. |
| `cites X, which is not a source the corpus contains` | A citation's `resource_id` names a source that does not exist. |
| `TypeError: Cannot read properties of undefined (reading 'map')` | You ran `medical:batch` on a **catalogue** resource file. |
| An invented ID passes | `corpus-source-index.json` is missing from the folder, so the check was skipped. |
| A concept still says no resource has cleared rights | Name the concept in the catalogue record's `included_concepts`. |
