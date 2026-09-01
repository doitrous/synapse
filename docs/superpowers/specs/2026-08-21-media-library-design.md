# A media library: somewhere for the bytes to live

Date: 2026-08-21
Status: approved design, not yet planned
Scope: server media storage, admin authoring surfaces, student rendering

## Problem

**Uploaded media never leaves the uploader's browser.** `storeMediaFile`
(`src/lib/mediaStorage.ts`) writes files to IndexedDB and returns a
`synapse-media:<id>` reference. Two authoring surfaces call it:

- `QuestionEditorDialog.tsx:21` — every image, audio and video attached to a
  question.
- `HistologyEditorDialog.tsx:175` — the image behind every histology slide.

There is **no image-upload endpoint anywhere on the server**. The only real file
storage is `/api/medical-resources/:id/file`, which is built for pre-registered,
hash-qualified source documents: it requires a `storageKey` and `sha256` written
into the catalogue *before* the upload, and refuses anything that does not match.
That is right for a textbook and unusable for "the reviewer needs to attach this
X-ray".

So the sequence a reviewer experiences today is: choose a file, see it render
perfectly, read a confirmation, and ship a question that **no student can see the
image in** — and that they themselves cannot see from a different machine, or
after clearing site data. The confirmation is not lying about the upload; it is
reporting a write to a store that only they can read.

Three consequences.

1. Every image attached to a question or a histology slide since those features
   shipped is invisible to students, and nothing on screen says so.
2. The bug spreads with each new content kind. Histology is the most recent
   instance and will not be the last.
3. The same image cannot be used twice. An upper limb plate that belongs on
   forty questions is uploaded forty times into forty browsers.

Separately, and smaller: a question can carry one stem image and a flat
attachment list, so an item whose *options* are images — "which of these four
radiographs shows…" — cannot be authored at all.

## Decisions taken

Settled during brainstorming; not open in planning.

| Decision | Choice |
|---|---|
| Where bytes live | The **existing persistent volume**, `RESOURCE_STORAGE_DIR` (`/data/medical-library`), as a third sibling beside `medical-resources` and `my-documents`. No new infrastructure, no new credentials. |
| Storage layout | **Content-addressed**: `media/<aa>/<bb>/<sha256>.<ext>`. |
| Metadata | A new app_state document, `nishany-media-library-v1`, owned by the **Resources & Media** tab — which exists and which reviewers already hold. |
| Duplicate uploads | **Bytes dedupe; records do not.** The uploader is told the identical image already exists and offered it. |
| What counts as "uploaded" | The **student's own `QuestionView` component**, re-fetching from the server and rendering the image in its slot. A rendering, not a sentence. |
| Question media slots | **Stem, each answer A–F, and the explanation.** |
| Legacy fields | `attachedImage` and `attachments` **keep working and keep rendering**. |
| Changing shared media | **Two separate operations**: replace the file everywhere, or re-point a chosen subset at a different record. Never one dialog with a checkbox. |
| Deleting shared media | **Refused** while anything references it, naming what. |
| Stranded IndexedDB media | **Flagged in place** and offered re-upload. Never silently migrated. |
| Concept priority | **No second field.** `blueprintWeight` stays the one number; a band control makes it legible. |

## Non-goals

- Object storage (S3/R2). The volume is there and proven; moving to a bucket is
  a deployment decision, not this spec's.
- Versioning media. Replacing is replacing; the usage list is what makes it safe.
- Image editing, cropping or transformation of any kind.
- The By-module / By-year library views. Separate spec, built after this.

---

## 1. The media record

### Bytes

Written through `receiveStream` / `assembleChunks` in `server/src/uploads.js` —
the path already carrying a size meter that stops mid-stream, a temporary file
opened `wx` so two uploads cannot collide, an atomic rename so a reader never
sees a half-written file, a traversal guard, and cleanup on every failure path.
Nothing about that mechanism is reinvented; it gains a second caller.

Layout is content-addressed, `media/<aa>/<bb>/<sha256>.<ext>`, where `aa` and
`bb` are the first four hex characters — so no directory holds an unbounded
number of entries. The path *is* the integrity check: a file that hashes to its
own name cannot have been corrupted in place unnoticed.

### Record

```ts
interface MediaRecord {
  id: string              // med-…
  storageKey: string      // media/ab/cd/<sha256>.png
  sha256: string
  mimeType: string
  sizeBytes: number
  /** Measured from the decoded image, never from what the client claimed. */
  width: number
  height: number
  /** What it is, in the picker. */
  title: string
  /** Required before it can reach a student. */
  altText: string
  /** Required before it can reach a student. */
  rights: string
  tags: {
    moduleIds: string[]
    moduleSubjectPaths: string[]
    conceptIds: string[]
    yearIds: string[]
  }
  uploadedBy: string
  uploadedAt: string
}
```

`altText` and `rights` gate delivery on the same rule `isMediaReleased`
(`src/data/contentControl.ts:90`) already applies to article media: an item
missing either is held back from students, and the editor states which is
missing rather than withholding it silently.

Tags exist so the library is searchable by the same vocabulary content is tagged
with — including `moduleSubjectPaths`, which `main` introduced and which reviewer
scope already reads.

### Duplicate uploads

The upload is hashed as it streams. If the digest already exists, the bytes are
not written twice — but the uploader gets their own record, after being told:
*this exact image is already in the library as "Upper limb, anterior" — use that
instead?* Merging two people's alt text and rights because their bytes matched
would be the wrong kind of clever.

### Routes

| Route | Guard | Purpose |
|---|---|---|
| `POST /api/media` | `requireTab('resources')` | Register a record; returns its id and upload target |
| `PUT /api/media/:id/file` | `requireTab('resources')` | Stream the bytes |
| `GET /api/media/:id` | `requireAuthenticated` | Serve, with `immutable` caching — content-addressed, so safe forever |
| `DELETE /api/media/:id` | `requireTab('resources')` | Refused while referenced (§4) |

`GET` is authenticated rather than public: these are a paying product's teaching
assets, and the existing resource route holds the same line.

## 2. Slots, and proof of rendering

### Placements

```ts
interface MediaPlacement {
  id: string
  mediaId: string
  slot: 'stem' | 'answer' | 'explanation'
  /** Only meaningful when slot is 'answer'. */
  answerLabel?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  /** A caption for this use alone. The record's own `title` is untouched. */
  caption?: string
}
```

`QuestionAuthoringData` gains `media: MediaPlacement[]`. `PracticalCommon` and
`ArticleAuthoringData` gain the same list, with `slot` narrowed to what those
kinds have.

`attachedImage: string` and `attachments: MediaAttachment[]`
(`contentControl.ts:220-223`) are **retained and still rendered**. They are in
the student projection today (`server/src/studentLedger.js:81`); breaking live
content to tidy a data model is not a trade this spec makes. New authoring
writes placements; existing content moves across through §5's flagging path.

### The confirmation

An upload is not confirmed until, in order:

1. the bytes are stored and the server has answered;
2. the editor **re-fetches from `GET /api/media/:id`** — the server round trip,
   not the local blob it still holds — and decodes it, which both proves it is a
   real image and yields the true `width` and `height` recorded above;
3. the editor renders the **actual `QuestionView` component the student runs**
   (`src/components/qbank/QuestionView.tsx`), with the placement applied;
4. and only then is the request marked fulfilled.

Step 3 is the load-bearing one and the reason this spec exists. A purpose-built
preview can be right while the student's view is wrong, which is today's failure
wearing a new costume. Rendering the student's own component makes "it renders
correctly in its correct place" true by construction rather than by assertion.

Each step that fails says which one failed. Nothing reports success on behalf of
a later step that has not run.

## 3. Media Requests, as a worklist that fulfils

`MediaRequest` (`contentControl.ts:137`) already supports many requests per
owner across articles, questions and practicals. What is missing is any way to
*act* on one: the page offers a status dropdown, so "supplied" means only that
somebody typed it.

**Requests group under their owner.** A question waiting on three images is one
block listing three jobs, not three unrelated rows in a flat table. This is what
"show those multiple media requests under that question" asks for.

**A request can name its slot.** `MediaRequest` gains `slot` and `answerLabel`,
so a request can say *answer C needs a chest X-ray*. Requests that name no slot
still work; the fulfiller chooses at upload time.

**Fulfilment happens in place.** Every request carries an upload control and a
"choose from library" picker side by side. On success the placement is written,
§2's preview proves it, and `status` becomes `supplied` **as a consequence**.

`planned` and `declined` remain human judgements and keep their control.
`supplied` stops being one — it is now a fact about the world, and is set by the
thing that made it true.

## 4. Reuse, and changing it for some but not all

One record, referenced by many owners. That is what makes an upper limb plate
fixable once instead of forty times, and it is also what makes it dangerous. Two
operations, deliberately separate in the interface:

**Replace this image everywhere.** Swaps the file behind the record; every
referencing item changes. This is the right action when the diagram is
mislabelled. Before it runs, the editor names the count and lists what will
change.

**Use a different image here.** Re-points a *selection* of placements at a
different record — one item, several ticked, or all of them. Everything
unticked keeps what it had. This changes who points at what; it changes no image.

They are not two paths through one dialog. A reviewer who wanted the second and
got the first has silently edited thirty-nine questions they never opened.

The **usage list** is the same list in both: it is where you see who shares this
image, and where you tick what to move.

**Delete is refused while anything references it**, and names what. An image
cannot be removed out from under content that renders it.

## 5. Concepts, and the stranded backlog

### Media on concepts

`Concept` (`src/data/conceptGraph.ts`) gains `mediaIds: string[]`, drawn from the
same library — so the plate on a question is the same record as the plate on the
*upper limb* concept, not a second copy of it. The concept editor gains a media
section; the student's concept popover renders them.

### Priority, made legible rather than duplicated

Concept exam priority already exists and already works: `blueprintWeight` is
editable at `ConceptsSetup.tsx:518`, `examWeightByYear` carries it per year, and
`src/data/adaptive/priority.ts` reads it to decide what a student studies next.

So nothing is added. Above the number sits a band control — **Critical / High /
Standard / Background** — writing the same 0–1 value, with the raw number still
visible and editable beneath it. Concepts can be sorted and filtered by band, and
each concept states what its weight is currently doing to the study order.

A second priority field would be two numbers meaning one thing, free to disagree.

### The stranded backlog

Any `synapse-media:` reference — a question attachment, a histology slide —
renders as **"this image exists only in one browser; students cannot see it"**,
with an upload control beside it. Where the current browser still holds the
bytes, a single click pushes them to the server and rewrites the reference.

Nothing is migrated silently. An automatic migration does nothing at all on a
machine that never held the file, and doing nothing looks identical to success.

A count of everything still stranded sits on the Media Requests page. A backlog
nobody can see is a backlog nobody works.

## 6. Verification

- **The round trip, not the local copy.** A test that uploads, clears the local
  blob, re-fetches from `GET /api/media/:id`, and renders — which is the exact
  failure mode this spec exists to end.
- **Slots.** A question with media on the stem, on answer C, and on the
  explanation renders each in its place in `QuestionView`, and the published
  student projection carries all three.
- **Release gating.** A record missing `altText` or `rights` does not reach a
  student, and the editor says which is missing.
- **Reuse.** Replacing a record's file changes every referencing item;
  re-pointing a subset changes only the ticked ones and leaves the rest; deleting
  a referenced record is refused and names its users.
- **Dedupe.** The same bytes uploaded twice are stored once and produce two
  records, with the duplicate surfaced.
- **Stranded media.** A `synapse-media:` reference renders its warning, and
  re-upload rewrites it to a served URL.

Verified against a running app before any of it is called done. The live checks
still outstanding from the role hierarchy
(`2026-08-21-admin-role-hierarchy-verification.md`) should be run first, since
media upload is behind `requireTab('resources')` and depends on them holding.
