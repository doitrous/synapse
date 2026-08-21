# Media audit

What exists, where it lives, what an import batch can attach, and what a content
author has to request instead. Read from the implementation, not from the docs.

**The headline for anyone planning a batch:** the media *model* is complete and
production-quality. The media *stock* is empty. There are **zero** medical images
in this repository — no anatomy plate, no micrograph, no radiograph. A histology
practical cannot be built today from repo assets; it can only be authored with
its images requested.

---

## 1. The model

Media is modelled in four distinct shapes, deliberately kept apart. Three are
student-facing records; the fourth is an admin-only instruction to a human.

### 1a. The shared media library — the canonical shape

`MediaRecord` is the one real asset record. Server module and client twin are
held together by a parity test.

| Field | Type | Note |
|---|---|---|
| `id` | string | e.g. `med-<base36>-<rand>` |
| `storageKey` | string | content-addressed path, derived not chosen |
| `sha256` | string | 64 hex chars |
| `mimeType` | string | PNG / JPEG / GIF / WebP only |
| `sizeBytes` `width` `height` | number | **measured server-side from the decoded file, never claimed by the client** |
| `title` | string | what it is, in the picker |
| `altText` | string | **required before it reaches a student** |
| `rights` | string | **required before it reaches a student** |
| `tags` | `{ moduleIds, moduleSubjectPaths, conceptIds, yearIds }` | all `string[]` |
| `uploadedBy` `uploadedAt` | string | |

- `src/data/mediaLibrary.ts:24` — `MediaRecord`
- `server/src/mediaLibrary.js:11` — `MEDIA_STATE_KEY = 'synapse-media-library-v1'`
- `src/data/mediaLibrary.ts:70` — `mediaUrl(id)` → `/media/<id>`, the one place that knows the URL shape
- `src/data/mediaLibrary.ts:74`, `server/src/mediaLibrary.js:25` — `storageKeyFor(sha256, mime)` → `media/ab/cd/<sha256>.png`
- `src/data/mediaLibrary.ts:81` — `mediaReleaseBlockers`: no stored file / no alt text / no cleared rights

`MediaPlacement` (`src/data/mediaLibrary.ts:44`) is how a record is *used*:
`{ id, mediaId, slot: 'stem'|'answer'|'explanation', answerLabel?: 'A'…'F', caption? }`.
Resolution of which placements render in which slot is
`placementsFor` at `src/data/mediaPlacement.ts:10` — an `answer` placement with
no `answerLabel` renders nowhere rather than under every option.

### 1b. Article media — a separate, URL-based record

`ArticleMediaRecord` at `src/data/contentControl.ts:55`:
`{ id, type: 'image'|'audio'|'video', sourceId?, exactSource?, locator?, url?,
caption, altText, rights, necessity, anchor?, releaseWithoutReview? }`.

`anchor` (`src/data/contentControl.ts:47`) ties the media to a **verbatim quote**
in the article plus a block (`summary`/`body`/`hold`/`trap`), so reflowing prose
cannot silently detach a figure from what it explains.

Release rule at `src/data/contentControl.ts:97`: a missing `url` is fatal;
missing rights or alt text can be overridden by `releaseWithoutReview`.

Note this is a **URL**, not a `mediaId` — article media does not go through the
media library. That is the one real inconsistency in the model.

### 1c. Legacy / per-format image fields

| Field | Where | Type |
|---|---|---|
| `attachments: MediaAttachment[]` | question | `{ id, type: image\|audio\|video, name, url, mimeType?, size? }` — `contentControl.ts:31` |
| `attachedImage: string` | question | single URL, predates the library — `contentControl.ts:291` |
| `labeling.imageUrl` + `altText` + `points[]` | question, `format: 'labeling'` | `src/data/labelingQuestion.ts:32` |
| `mediaUrl?: string` | OSCE station | `contentControl.ts:468` |
| `mediaUrl?: string` | clinical-case decision | `contentControl.ts:490` |
| `mediaUrl: string` | lab/imaging question | `contentControl.ts:519` |
| `views[].image: string` | histology slide | `src/data/histology.ts:14`, a stored media reference |
| `mediaIds?: string[]` | concept | `src/data/conceptGraph.ts:91` — ids, not URLs, on purpose |

Every practical `mediaUrl` is **images only** — the runner renders any non-empty
value as an `<img>`, so an audio or video URL shows a student a broken image
(`contentControl.ts:511-518`).

### 1d. Which content kinds can carry media

`ContentKind = 'question' | 'article' | 'practical' | 'resource' | 'deck' | 'essay' | 'histology'`
(`src/data/contentControl.ts:13`).

| Kind | Real media | Media request |
|---|---|---|
| **question** | `media: MediaPlacement[]` (`:288`), `attachedImage` (`:291`), `attachments` (`:275`), `labeling.imageUrl` | `mediaRequests?` (`:296`) |
| **article** | `media?: ArticleMediaRecord[]` (`:371`) | `mediaRequests?` (`:373`) |
| **practical** | `mediaUrl` per station / decision / lab question | `mediaRequests` — **required, not optional** (`:424`) |
| **histology** | `views[].image` per objective (4×/10×/40×) | none |
| **concept** *(not a ContentKind; lives in the concept graph)* | `mediaIds?: string[]` | **none — see gap below** |
| **resource** | none (`icon`, `storageKey` only — `:556`, `:560`) | none |
| **deck** | none | none |
| **essay** | none | none |

Questions alone carry `MediaPlacement[]`, and the comment at
`contentControl.ts:282-287` says why: an article already has anchored media, and a
second list beside it would be two ways to put a picture in one article, free to
disagree about which renders.

**Gap worth naming.** `MEDIA_REQUEST_OWNER_KINDS` includes `'concept'`
(`contentControl.ts:112`) and the backlog page has a label and a catalogue link
for it (`src/pages/admin/MediaRequests.tsx:47`, `:63`), but `ConceptNode` has no
`mediaRequests` field at all and the backlog only collects from article /
question / practical (`MediaRequests.tsx:105-109`). A concept-owned request is
typed and routed but has nowhere to be stored. Requests for a concept's plate
must currently be hung off an article or question.

---

## 2. Storage and serving

**Files live on the server filesystem, content-addressed. Not in `public/`, not
in a database column, not on an external CDN.**

- `server/src/index.js:75` — `RESOURCE_STORAGE_DIR = process.env.RESOURCE_STORAGE_DIR || '/data/medical-library'`
- `server/src/index.js:78` — `MEDIA_STORAGE_DIR = RESOURCE_STORAGE_DIR` (same volume)
- `server/src/index.js:79` — `MEDIA_MAX_BYTES = process.env.MEDIA_MAX_BYTES || 20 MB`

Path inside that root is `media/<sha0-1>/<sha2-3>/<sha256>.<ext>`. The digest *is*
the path, which makes traversal impossible (64 lowercase hex characters contain
no slash or dot — `server/src/mediaLibrary.js:20-24`) and makes the path its own
integrity check.

The `MediaRecord` **metadata** is not in a table either — it is one JSON document
in `app_state` under key `synapse-media-library-v1`, cached in-process and
invalidated on write (`server/src/index.js:98`, `:109-115`).

### Routes

| Route | Guard | What it does |
|---|---|---|
| `POST /api/media` | `requireTab('resources')` | `server/src/index.js:1520` |
| `GET /api/media/:id` | `requireAuthenticated` | `server/src/index.js:1578` |
| `DELETE /api/media/:id` | `requireTab('resources')` | `server/src/index.js:1597` — refuses only; reports who still uses it |

The upload path is careful and worth trusting: bytes stream to a staging file
with a size meter that aborts mid-stream (`server/src/uploads.js:41`), the type
and dimensions are sniffed from the **file's own first 64 KB**, never from
`Content-Type` (`index.js:1533-1538`), and only then does an atomic rename move
it to the path its digest names. Identical bytes are stored once but still get
one record each, so two people's alt text is never merged
(`index.js:1544-1552`).

Serving sets `Cache-Control: private, max-age=31536000, immutable` — safe
precisely because the URL is a digest and can never come to mean a different
picture (`index.js:1584`).

`DELETE` never removes bytes. It only answers whether the record may go, because
the file is content-addressed and another record may legitimately name it.

### Admin upload UI — yes, several

| Component | Role |
|---|---|
| `src/components/admin/MediaPicker.tsx` | The upload + choose dialog. `accept="image/png,image/jpeg,image/gif,image/webp"` (`:107`); mints the `MediaRecord` (`:85`) |
| `src/components/admin/MediaLibraryBrowser.tsx:31` | "Every image the product holds" — search by title / alt text / rights. Mounted at `src/pages/admin/ResourcesSetup.tsx:142` |
| `src/components/admin/MediaPlacementEditor.tsx:48` | Place an image into a question slot; used from `QuestionEditorDialog.tsx:303` |
| `src/components/admin/MediaUsagePanel.tsx` | Replace the file behind a record everywhere (`:50`), or re-point selected placements (`:70`) |
| `src/components/admin/HistologyEditorDialog.tsx:184` | Per-objective slide upload; creates the record with **blank alt text and rights on purpose** (`:194-197`) |
| `src/components/admin/StrandedMediaNotice.tsx` | Rescues images that only ever existed in one browser's IndexedDB |
| `src/pages/admin/MediaRequests.tsx` | The request backlog, at `/admin/library/media` (`src/router.tsx:271`) |

`uploadMedia` refuses to report success until the bytes have made the round trip
and **decoded** on the way back — `verifyRenders` fetches the stored file and
`createImageBitmap`s it (`src/lib/mediaUpload.ts:43-51`). That exists because an
earlier path wrote to IndexedDB and reported success, which was true and useless.

---

## 3. The import path

**Yes — a bulk-import batch can carry media, and it is the primary way media
requests enter the system.** `IMPORT_SCHEMAS` is at `src/data/bulkImport.ts:50`.

### Fields that carry media, by kind

| Kind | Field | Carries | Line |
|---|---|---|---|
| question | `attached_image` | one image URL beside the stem | `bulkImport.ts:99` |
| question | `attachments` | `### image\|audio\|video · URL` blocks + `Name:`, `Mime:` | `:98` |
| question | `labeling_image` / `labeling_alt` / `labeling_points` | labelling plate + `1 @ 34,58 = Answer \| Also accepted` | `:62-64` |
| question | `media_recommendations` | **admin-only requests** | `:96` |
| article | `media` | `### image\|video\|audio · URL` + `Caption:` `Alt:` `Rights:` `Necessity:` `Anchor:` `Anchor block:` `Release without review:` | `:129` |
| article | `image_recommendations` *or* `media_recommendations` | **admin-only requests** (both accepted) | `:131`, `:132` |
| practical | `station_image` | OSCE light-box image | `:173` |
| practical | `decisions` → `Media:` line | clinical-case decision image | `:663`, `:685` |
| practical | `lab_questions` → `Media:` line | lab/imaging question image, **image URL only** | `:179` |
| practical | `media_needed` *or* `media_recommendations` | **admin-only requests** | `:185`, `:186` |
| histology | `image_4x` / `image_10x` / `image_40x` | slide images; **at least one required** | `:239-241`, validated `:980` |
| resource / deck / essay | — | nothing | |

### What a batch row cannot do

- **A batch cannot attach an existing library `MediaPlacement`.** There is no
  import column for `media` placements on a question, and `parseMediaRequests`
  reads no `Slot:` or `Answer:` line (`bulkImport.ts:485-530`). Slot and
  `answerLabel` are set only in `MediaPlacementEditor`, or inherited when a
  request is fulfilled (`MediaRequests.tsx:203`). A batch can name a `Media id:`
  on a *request*, but that only marks the request as met.
- **A batch cannot upload bytes.** Every import media field is a URL. Files enter
  only through `POST /api/media` from the admin UI.
- **A batch cannot create a concept-owned request** — no concept import field,
  and no field on `ConceptNode` to hold one.

### Import-time validation that will reject a sloppy batch

- `bulkImport.ts:886-890` — a `### type ·` media block with no URL after it would
  be silently dropped, so the import errors instead.
- `bulkImport.ts:903-907` — a `### kind ·` recommendation with no brief errors.
- `bulkImport.ts:840` — labelling image or points given on a non-labelling format errors.
- `bulkImport.ts:980` — a histology slide with no power image is refused: "a slide
  with no image cannot be looked at".

### What a row attaching an image to a question looks like

```markdown
# Item
## id
KAU-CVS-Q-0114
## title
Coronary territory of an inferior STEMI
## subject
cvs
## status
Published
## question
Which artery is occluded?
## correct_answer
A
## answer_a
Right coronary artery
## explanation_a
ST elevation in II, III and aVF is the inferior territory.
## attached_image
https://media.example.edu/ecg/inferior-stemi-12lead.png
## media_recommendations
### imaging example · 12-lead ECG, 2 mm ST elevation in II, III and aVF, no reciprocal artefact
Purpose: The stem asks the student to read a territory off a trace. A described ECG tests recall of a fact; the trace tests the skill.
Priority: required
Status: needed
Source direction: openly licensed ECG library
Rights: must be CC-BY or public domain
```

### What a row attaching an image to a practical slide looks like

For a **histology slide** (`kind: histology`) the images are the item:

```markdown
# Item
## id
KAU-GI-HISTO-0007
## title
Ileum
## subject
gi
## tissue
Small bowel
## stain
H&E
## description
Villi, crypts of Lieberkühn, and Peyer's patches in the submucosa.
## image_4x
https://media.example.edu/histology/ileum-4x.jpg
## image_40x
https://media.example.edu/histology/ileum-40x.jpg
```

For a **lab/imaging practical**, the image rides on the question block, and the
still-missing asset goes in `media_needed`:

```markdown
## lab_questions
### Consolidation vs effusion
Concept: CON-RES-EXAMPLE
Q: What does the blunted costophrenic angle indicate?
Media: https://media.example.edu/cxr/effusion-pa.png
*= A pleural effusion
Why: Fluid tracks up the chest wall and produces a meniscus.
Explanation: A meniscus and blunted angle indicate fluid, not consolidation.

## media_needed
### image · Consolidation vs effusion
Brief: PA chest radiograph, right-sided effusion with a clear meniscus, no lines or labels
Purpose: The question cannot be answered from the text alone.
Priority: required
Status: needed
```

---

## 4. What already exists — the inventory

Every raster and vector file in the repository, excluding `node_modules/` and
`dist/`. **29 files. None of them is a medical image.**

| Directory | Count | Files | What they are |
|---|---|---|---|
| `public/brand/` | 6 | `logo.png`, `logo-dark.png`, `logo-white.png`, `logo-stacked.png`, `logo-wordmark.png`, `logo-wordmark-white.png` | UI chrome |
| `public/` (root) | 4 | `favicon.png`, `icons.svg`, `og-image.png` (1200×630), `og-image-ar.png` | UI chrome / social cards |
| `public/microscope/` | 2 | `microscope.png` (440×440), `focus-grid.jpg` (2880×2400) | **Not specimens.** A studio photograph of a microscope instrument, plus 120 frames of a push-in animation tiled on a 12×10 grid — the intro animation for the histology viewer. See `public/microscope/README.md` and `spriteCell` in `src/data/histology.ts` |
| `ios/Synapse/Resources/Brand/` | 4 | logo variants | UI chrome |
| `scripts/og/` | 2 | `og-image.svg`, `og-image-ar.svg` | sources for the social cards |
| `.impeccable/mocks/`, `.impeccable/review/` | 11 | auth screen mockups and screenshots | design artefacts, not shipped |

**Anatomy plates: 0. Histology micrographs: 0. Radiographs: 0. ECG traces: 0.
Clinical photographs: 0.**

The server-side media store (`/data/medical-library/media/…`) is outside the
repository, so it cannot be audited here — but nothing in the repo seeds it, and
the histology upload flow deliberately creates records with blank alt text and
rights, so anything there is unreleased until a human describes it.

Meanwhile **70 media requests are already authored and outstanding**, every one
of them `Status: needed`, across the CVS articles in `docs/import-ready/article/`
(e.g. `SYS-CVS-ARTICLE-T02.md:119-132`). The backlog exists; the assets do not.

**Consequence for planning:** a histology practical, a labelling question, an
imaging-interpretation station, and any article figure all have to be authored
with a media *request* rather than a media *attachment*. The only alternative is
an external URL the batch supplies, and that carries a licensing decision no
batch should make on its own.

---

## 5. Privacy

### The deny-list

`server/src/studentLedger.js:53` — `PRIVATE_FIELDS`, stripped at **any depth**
(`strip()` at `:134`), applied server-side before delivery. Only `Published`
items leave at all (`:150`).

**`mediaRequests` and `mediaRecommendations` are both in the deny-list**
(`studentLedger.js:69`), grouped under the comment "Work still outstanding: media
being chased". `rights` and `sha256` are private too (`:70`). This is enforced,
not merely intended: `studentLedger.test.js:59` asserts
`out.questionData.mediaRequests === undefined`, and `:64` asserts the brief
string appears nowhere in the serialised payload. `mediaRequests.test.ts` runs
five leak-canary strings through every article projection path and asserts none
survives, including through `overlaySubtopic` and the evidence-gated path.

The design note at `contentControl.ts:143-148` is explicit about why a request is
its own type: an unfulfilled request stored as an `ArticleMediaRecord` would sit
one `releaseWithoutReview` flag away from a student.

### The public list

`server/src/studentLedger.js:78` — `PUBLIC_FIELDS`. It contains:

- `attachedImage`, `attachments`, `media` (`:85`)
- `media` again for articles (`:95`)
- `mediaUrl` (`:102`), with the comment: "A student cannot answer 'what does this
  film show' without the film."

`PUBLIC_FIELDS` is documentation for a drift guard, not a runtime filter —
nothing reads it at runtime (`:76`). Anything not in the deny-list ships.

### > Would attaching a source scan of an exam paper to a question leak it to students?

**Yes. Immediately and completely.**

Every field that could hold such a scan is student-visible:

- `attachedImage` and `attachments` — in `PUBLIC_FIELDS` (`studentLedger.js:85`)
- `media: MediaPlacement[]` — in `PUBLIC_FIELDS`, and the student question view
  renders it (`src/components/qbank/QuestionView.tsx:54`)
- `mediaUrl` on any practical — in `PUBLIC_FIELDS` (`:102`)

And the bytes are reachable. `GET /api/media/:id` is guarded by
`requireAuthenticated` only, not by console access (`server/src/index.js:1578`) —
every logged-in student passes it. Worse, the **whole media library document is
student-readable**: `MEDIA_STATE_KEY` is in `STUDENT_READABLE_STATE`
(`server/src/index.js:867-870`) and `REDACTED_STATE_KEYS` covers only the content
ledger (`studentLedger.js:166`). So every student receives every `MediaRecord`'s
`title`, `altText`, `rights`, `tags` and `uploadedBy` — for every image in the
product, including ones placed on no published item.

The comment at `index.js:868` justifies this as "alt text and dimensions for
every image a student may be shown", but the set is not filtered to shown images,
and `rights` — a field the ledger deny-list treats as private — travels in full.

**The rule for authors, therefore:**

> A source scan, a photographed exam paper, an original question sheet, or any
> image whose provenance is the paper it was lifted from must **never** be
> attached to any media field. The deny-list protects the *description* of a
> wanted asset; it protects nothing about an attached one. Provenance goes in
> `source`, `sourceCitation`, `sourceProvenance` or `author_notes` — all private
> (`studentLedger.js:57`, `:64`) — as text, never as a picture.

Two lesser findings, recorded but not in scope to fix here:

1. `MediaRecord.title` and `altText` are student-readable for every record in the
   library. A title like `"EOY 101 2025 paper, Q14 scan"` discloses provenance
   that the ledger deny-list exists to withhold. Titles should be described
   descriptively ("Inferior STEMI 12-lead"), never by source.
2. `MediaRecord.rights` reaches students even though `rights` is in
   `PRIVATE_FIELDS` for the ledger. The two paths disagree.

---

## 6. The media request format

**This mechanism already exists. It is not new, and nothing needs inventing.**

- Type: `MediaRequest` at `src/data/contentControl.ts:150`
- Parser: `parseMediaRequests` at `src/data/bulkImport.ts:485`
- Import fields: `media_recommendations` (all three kinds), `image_recommendations`
  (article), `media_needed` (practical) — all aliases into the one parser
- Backlog UI: `/admin/library/media` — `src/pages/admin/MediaRequests.tsx`
- Destination folder for batches: `docs/Kasr-Source-Imports/media-requests/`
- 70 requests already written this way in `docs/import-ready/article/`

What follows is the existing format, documented — not a proposal.

### Block grammar

One `### ` block per asset. The heading has two accepted forms
(`bulkImport.ts:468-484`):

- **Genre-led** — `### histology · <brief>`. Sets `kind`, implies `medium: image`,
  and the text after the `·` is the brief. Articles use this.
- **Medium-led** — `### image · <where it goes>`, with the brief on its own
  `Brief:` line. Practicals use this. A `Brief:` line always wins over the heading.

Either `·` or `|` separates the lead token from the rest.

| Line | Maps to | Required | Accepted values |
|---|---|---|---|
| *(heading lead)* | `medium` or `kind` | yes | `image`, `audio`, `video` — or a genre |
| *(heading tail)* or `Brief:` | `brief` | **yes — a block with no brief is dropped** | free text, one line |
| `Purpose:` | `teachingPurpose` | strongly expected | why prose cannot carry it |
| `Priority:` | `priority` | defaults `strongly helpful` | `required`, `strongly helpful`, `optional` |
| `Status:` | `status` | defaults `needed` | `needed`, `planned`, `supplied`, `declined` |
| `Kind:` | `kind` | optional | `diagram`, `anatomy plate`, `histology`, `flowchart`, `graph`, `comparison table`, `imaging example`, `algorithm`, `clinical photograph`, `other` (anything else → `other`) |
| `Section:` | `section` | optional | article section heading, or a practical's `###` block |
| `Block:` | `block` | optional | `summary`, `body`, `hold`, `trap` |
| `Anchor:` | `anchorQuote` | optional | **verbatim** text from the owner |
| `Source direction:` | `sourceDirection` | optional | where a fulfiller should look |
| `Rights:` | `rightsNotes` | optional | the licensing constraint |
| `Notes:` | `notes` | optional | anything else for the human |
| `Media id:` | `mediaId` | optional | set only when `Status: supplied` |
| `Id:` | `id` | optional | otherwise derived from owner + brief + index |

`Slot:` and `Answer:` are **not parsed** — `slot` and `answerLabel` exist on the
type (`contentControl.ts:180-182`) but are set only in the UI, or inherited when
the backlog fulfils a request (`MediaRequests.tsx:203`).

The owner is implicit: `ownerId` is the row's own id and `ownerKind` is set by
which import module parsed it — `'article'` (`bulkImport.ts:1173`), `'question'`
(`:1139`), `'practical'` (`:722`).

### Template

```markdown
## media_recommendations
### anatomy plate · Brachial plexus in the posterior triangle, roots to terminal branches, with the relation to the subclavian artery and the first rib shown
Purpose: The exam asks which trunk lies where relative to the artery. The relations are three-dimensional; a paragraph lists them in an order the student then has to un-order to answer.
Priority: required
Status: needed
Kind: anatomy plate
Section: Applied anatomy
Anchor: the trunks lie superior and posterior to the subclavian artery
Source direction: openly licensed anatomy atlas — Gray's public-domain plates, or Anatomography CC-BY
Rights: must be CC-BY or public domain; no all-rights-reserved textbook figure
Notes: Fulfils KAU-CVS-Q-0208 and KAU-CVS-Q-0211, which both turn on the artery relation. Unlabelled version preferred so it can also carry a labelling question.
```

Every requested field is covered:

| Requirement | Carried by |
|---|---|
| what is needed | heading lead → `medium` + `kind` |
| what it must show | `brief` (the heading tail), and `Purpose:` for the teaching point |
| where it will attach — content ID | `ownerId`, implicit from the row's `## id` |
| where it will attach — field | `Section:` / `Block:` / `Anchor:` |
| why — which exam question depends on it | `Purpose:` for the teaching argument, `Notes:` for the specific item IDs |
| licensing constraint | `Rights:`, with `Source direction:` for where to look |

### Practical variant

Medium-led, because the heading names the `###` block the asset belongs to:

```markdown
## media_needed
### image · Immediate action
Brief: 12-lead ECG showing 2 mm ST elevation in II, III and aVF
Purpose: The decision cannot be made from the text alone.
Priority: required
Status: needed
Rights: must be CC-BY or public domain
```

### Two conventions worth adopting for the Kasr batches

Neither is enforced by the parser; both close real gaps found above.

1. **Name the dependent items in `Notes:`.** "Why" is asked for, and
   `teachingPurpose` answers it editorially, but nothing in the schema records
   *which question breaks without this image*. Writing `Fulfils KAU-CVS-Q-0208,
   KAU-CVS-Q-0211` in `Notes:` makes the request's cost visible in the backlog,
   which filters on free text across `brief`, `teachingPurpose` and `ownerTitle`
   (`MediaRequests.tsx:138`).

2. **Always write `Rights:`.** It is optional to the parser but not to the
   product: `MediaRecord.rights` is a release blocker
   (`mediaLibrary.ts:81-86`), so an asset sourced without a recorded licence
   constraint arrives unpublishable and someone has to re-derive the constraint
   after the fact.

For a concept that needs a plate, there is nowhere to file the request today
(§1d). Until `ConceptNode` gains a `mediaRequests` field, hang it on the article
that teaches the concept and name the concept ID in `Notes:`.
