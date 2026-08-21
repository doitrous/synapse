# Media Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give uploaded media somewhere to live on the server, so an image attached to a question or a histology slide reaches the student who needs it — and confirm it by rendering the student's own view rather than by claiming success.

**Architecture:** Bytes stream onto the existing `RESOURCE_STORAGE_DIR` volume through `server/src/uploads.js`, into a content-addressed path derived from the digest measured during the stream. Format and dimensions are sniffed from the bytes, never believed from a header. Metadata lives in one app_state document owned by the Resources & Media tab, so it inherits the role hierarchy's write path — diff, tab check, scope check, merge — with no new permission surface. Pure rule modules on the server are mirrored by TypeScript twins under `src/data/`, held together by parity tests, exactly as `roles`/`tabs`/`contentScope` already are.

**Tech Stack:** Node 24, Express 4, MariaDB (`mysql2`), React 19 + TypeScript, Vite. Tests: `node:test` + `node:assert/strict` on both sides. **No new dependencies** — image dimensions are parsed from file headers by hand, matching the PDF magic-byte sniffing already in `uploads.js`.

## Global Constraints

- **Client tests:** `npm test` → `node --test --experimental-strip-types "src/**/*.test.ts"`. Single file: `node --test --experimental-strip-types src/data/mediaLibrary.test.ts`.
- **Server tests:** `cd server && npm test` → `node --test src/*.test.js`. Single file: `cd server && node --test src/imageMeta.test.js`.
- **Server tests never touch the database.** Rules live in pure modules importing nothing from `db.js` — the convention stated in `server/src/identity.js:1-8` and followed by `roles.js`, `tabs.js`, `contentScope.js`, `stateMerge.js`.
- **Client mirrors are declared, never imported from `server/`.** That module is untyped JavaScript outside `src`; importing it into app code breaks the Vite bundle and `tsc -b`. Parity tests do the cross-boundary import — they are excluded from `tsconfig.app.json` and run on Node.
- **Type-check:** `npm run build`. **Lint:** `npm run lint` (0 errors; 19 pre-existing `only-export-components` warnings are expected).
- **No new npm dependencies**, server or client.
- **Every admin route names its tab.** Media routes use `requireTab('resources')`; the read route uses `requireAuthenticated`. Never `requireAdmin` — it no longer exists.
- **Commit style:** imperative sentence subjects stating the behaviour, not `feat:` prefixes. End every message with:
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`

## File Structure

**New — server:**

| File | Responsibility |
|---|---|
| `server/src/imageMeta.js` | Sniff format and pixel dimensions from the leading bytes |
| `server/src/imageMeta.test.js` | Real headers for PNG/JPEG/GIF/WebP, and refusals |
| `server/src/mediaLibrary.js` | Storage key from digest, release blockers, usage counting, delete refusal |
| `server/src/mediaLibrary.test.js` | Those rules |

**New — client:**

| File | Responsibility |
|---|---|
| `src/data/mediaLibrary.ts` | Client twin of `mediaLibrary.js`, plus the `MediaRecord`/`MediaPlacement` types |
| `src/data/mediaLibrary.test.ts` | Behaviour, plus parity against the server module |
| `src/lib/mediaUpload.ts` | Upload, re-fetch from the server, decode — the round trip |
| `src/components/admin/MediaPicker.tsx` | Choose an existing record, or upload a new one |
| `src/components/admin/MediaPlacementEditor.tsx` | Placements for one owner, with the proof-of-render preview |
| `src/components/admin/StrandedMediaNotice.tsx` | The `synapse-media:` warning and its re-upload control |
| `src/components/admin/MediaUsagePanel.tsx` | Who shares this image; replace everywhere, or re-point a subset |

**Modified:**

| File | Change |
|---|---|
| `server/src/index.js` | Four media routes; `MEDIA_STORAGE_DIR` |
| `server/src/tabs.js`, `src/data/adminTabs.ts` | `synapse-media-library-v1` on the Resources tab |
| `server/src/studentLedger.js` | `media` survives into the student projection |
| `src/data/contentControl.ts` | `MediaPlacement`; `media` on question authoring data |
| `src/data/qbank.ts` | `media?: MediaPlacement[]` on `Question` |
| `src/components/qbank/QuestionView.tsx` | Render stem, per-answer and explanation slots |
| `src/components/admin/QuestionEditorDialog.tsx` | Placements editor; stranded notice |
| `src/components/admin/HistologyEditorDialog.tsx` | Slide images through the media store |
| `src/pages/admin/MediaRequests.tsx` | Group by owner; fulfil in place; stranded count |
| `src/pages/admin/ResourcesSetup.tsx` | The media library browser |
| `src/data/conceptGraph.ts`, `src/pages/admin/ConceptsSetup.tsx` | `mediaIds`; priority bands |
| `src/components/concepts/ConceptChip.tsx` | Concept media in the student popover |

---

## Task 1: Read an image's real format and size from its bytes

**Files:**
- Create: `server/src/imageMeta.js`
- Create: `server/src/imageMeta.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `imageMeta(buffer): { mimeType, width, height } | null` — null when the bytes are not an image this product accepts. `MEDIA_MIME_EXTENSION: Record<string, string>`.

- [ ] **Step 1: Write the failing test**

Create `server/src/imageMeta.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { MEDIA_MIME_EXTENSION, imageMeta } from './imageMeta.js'

/** A minimal but real PNG header: signature, IHDR length/type, then 4+4 bytes. */
function png(width, height) {
  const buffer = Buffer.alloc(33)
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(buffer, 0)
  buffer.writeUInt32BE(13, 8)
  buffer.write('IHDR', 12)
  buffer.writeUInt32BE(width, 16)
  buffer.writeUInt32BE(height, 20)
  return buffer
}

/** JPEG: SOI, then an SOF0 frame carrying height then width, big-endian. */
function jpeg(width, height) {
  const buffer = Buffer.alloc(21)
  buffer.writeUInt16BE(0xffd8, 0)
  buffer.writeUInt16BE(0xffc0, 2)
  buffer.writeUInt16BE(17, 4)
  buffer.writeUInt8(8, 6)
  buffer.writeUInt16BE(height, 7)
  buffer.writeUInt16BE(width, 9)
  return buffer
}

function gif(width, height) {
  const buffer = Buffer.alloc(10)
  buffer.write('GIF89a', 0)
  buffer.writeUInt16LE(width, 6)
  buffer.writeUInt16LE(height, 8)
  return buffer
}

/** WebP VP8X, which states canvas size as two 24-bit values minus one. */
function webp(width, height) {
  const buffer = Buffer.alloc(30)
  buffer.write('RIFF', 0)
  buffer.write('WEBP', 8)
  buffer.write('VP8X', 12)
  buffer.writeUIntLE(width - 1, 24, 3)
  buffer.writeUIntLE(height - 1, 27, 3)
  return buffer
}

test('a PNG states its own size', () => {
  assert.deepEqual(imageMeta(png(1920, 1080)), { mimeType: 'image/png', width: 1920, height: 1080 })
})

test('a JPEG states its own size, height before width', () => {
  assert.deepEqual(imageMeta(jpeg(800, 600)), { mimeType: 'image/jpeg', width: 800, height: 600 })
})

test('a GIF states its size little-endian', () => {
  assert.deepEqual(imageMeta(gif(320, 240)), { mimeType: 'image/gif', width: 320, height: 240 })
})

test('a WebP states its canvas size minus one', () => {
  assert.deepEqual(imageMeta(webp(1024, 768)), { mimeType: 'image/webp', width: 1024, height: 768 })
})

test('anything that is not an image we accept is refused', () => {
  assert.equal(imageMeta(Buffer.from('%PDF-1.7')), null)
  assert.equal(imageMeta(Buffer.from('<svg xmlns=')), null, 'SVG can carry script and is not accepted')
  assert.equal(imageMeta(Buffer.alloc(0)), null)
  assert.equal(imageMeta(Buffer.from([0x89, 0x50])), null, 'truncated header')
  assert.equal(imageMeta(null), null)
})

test('an image with no area is refused, however well-formed its header', () => {
  assert.equal(imageMeta(png(0, 100)), null)
  assert.equal(imageMeta(gif(100, 0)), null)
})

test('every accepted type has an extension to store it under', () => {
  for (const mime of ['image/png', 'image/jpeg', 'image/gif', 'image/webp']) {
    assert.ok(MEDIA_MIME_EXTENSION[mime], mime)
  }
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd server && node --test src/imageMeta.test.js`
Expected: FAIL — `Cannot find module './imageMeta.js'`

- [ ] **Step 3: Write `server/src/imageMeta.js`**

```js
/**
 * What an image actually is, read from its own bytes.
 *
 * `Content-Type` is whatever the uploader claimed, and a file extension is
 * whatever they typed. Both are trusted nowhere here — this is the same stance
 * `assembleChunks` already takes when it sniffs `%PDF-` rather than believing a
 * header, and for the same reason: a renamed executable must be refused at the
 * point it would otherwise become a teaching asset.
 *
 * Dimensions are read here rather than measured in a browser, because the
 * browser's number is a claim made by the client and this one is a fact about
 * the file. No dependency: four headers, each a documented fixed layout.
 *
 * SVG is deliberately absent. It is a document that can carry script, not a
 * picture, and it would be served from our own origin.
 */

export const MEDIA_MIME_EXTENSION = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
}

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

/** A frame header that states a size, as opposed to one that only carries data. */
const JPEG_SIZE_MARKERS = new Set([
  0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7,
  0xffc9, 0xffca, 0xffcb, 0xffcd, 0xffce, 0xffcf,
])

export function imageMeta(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 10) return null
  const found = png(buffer) ?? jpeg(buffer) ?? gif(buffer) ?? webp(buffer)
  // A header can be well-formed and still describe nothing renderable. Zero in
  // either axis is not a small image, it is a broken one.
  if (!found || found.width <= 0 || found.height <= 0) return null
  return found
}

function png(buffer) {
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) return null
  if (buffer.subarray(12, 16).toString('latin1') !== 'IHDR') return null
  return { mimeType: 'image/png', width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
}

/**
 * JPEG carries its size inside a frame header, which sits after any number of
 * other segments, so the segment chain is walked rather than assumed.
 */
function jpeg(buffer) {
  if (buffer.readUInt16BE(0) !== 0xffd8) return null
  let offset = 2
  while (offset + 9 < buffer.length) {
    const marker = buffer.readUInt16BE(offset)
    if ((marker & 0xff00) !== 0xff00) return null
    if (JPEG_SIZE_MARKERS.has(marker)) {
      return {
        mimeType: 'image/jpeg',
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      }
    }
    const length = buffer.readUInt16BE(offset + 2)
    if (length < 2) return null
    offset += 2 + length
  }
  return null
}

function gif(buffer) {
  const magic = buffer.subarray(0, 6).toString('latin1')
  if (magic !== 'GIF87a' && magic !== 'GIF89a') return null
  return { mimeType: 'image/gif', width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) }
}

/**
 * Only the extended (VP8X) form states a canvas size directly, and it states it
 * minus one. The lossy and lossless forms are read from their own sub-chunks.
 */
function webp(buffer) {
  if (buffer.length < 30) return null
  if (buffer.subarray(0, 4).toString('latin1') !== 'RIFF') return null
  if (buffer.subarray(8, 12).toString('latin1') !== 'WEBP') return null
  const chunk = buffer.subarray(12, 16).toString('latin1')
  if (chunk === 'VP8X') {
    return {
      mimeType: 'image/webp',
      width: buffer.readUIntLE(24, 3) + 1,
      height: buffer.readUIntLE(27, 3) + 1,
    }
  }
  if (chunk === 'VP8 ') {
    return {
      mimeType: 'image/webp',
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    }
  }
  if (chunk === 'VP8L') {
    const bits = buffer.readUInt32LE(21)
    return {
      mimeType: 'image/webp',
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    }
  }
  return null
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd server && node --test src/imageMeta.test.js`
Expected: PASS — 7 tests.

- [ ] **Step 5: Commit**

```bash
git add server/src/imageMeta.js server/src/imageMeta.test.js
git commit -m "$(cat <<'EOF'
Read what an image is from the image, not from its label

Content-Type is whatever the uploader claimed and the extension is
whatever they typed. The same stance the PDF path already takes, for the
same reason: a renamed executable must be refused before it becomes a
teaching asset. SVG is not accepted at all — it is a document that can
carry script, served from our own origin.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: The media library's rules

**Files:**
- Create: `server/src/mediaLibrary.js`
- Create: `server/src/mediaLibrary.test.js`

**Interfaces:**
- Consumes: `imageMeta.js` (Task 1).
- Produces:
  - `MEDIA_STATE_KEY = 'synapse-media-library-v1'`
  - `storageKeyFor(sha256, mimeType): string | null`
  - `mediaReleaseBlockers(record): string[]`
  - `isMediaReleased(record): boolean`
  - `usageOf(mediaId, ledger, concepts): Array<{ ownerId, ownerKind, ownerTitle, where }>`
  - `deleteRefusal(mediaId, ledger, concepts): string | null`

- [ ] **Step 1: Write the failing test**

Create `server/src/mediaLibrary.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  MEDIA_STATE_KEY, deleteRefusal, isMediaReleased, mediaReleaseBlockers, storageKeyFor, usageOf,
} from './mediaLibrary.js'

const SHA = 'ab12cd34'.padEnd(64, '0')

const question = (id, placements) => ({
  id, kind: 'question', title: `Question ${id}`,
  questionData: { tags: {}, media: placements },
})

test('the stored path is derived from the digest, and fans out', () => {
  assert.equal(storageKeyFor(SHA, 'image/png'), `media/ab/12/${SHA}.png`)
  assert.equal(storageKeyFor(SHA, 'image/jpeg'), `media/ab/12/${SHA}.jpg`)
})

test('a path is refused for anything that is not a real digest and type', () => {
  assert.equal(storageKeyFor('short', 'image/png'), null)
  assert.equal(storageKeyFor(SHA, 'application/pdf'), null)
  assert.equal(storageKeyFor(SHA.toUpperCase(), 'image/png'), null, 'a digest is lowercase hex')
  assert.equal(storageKeyFor('../../etc/passwd'.padEnd(64, 'a'), 'image/png'), null)
})

test('an image reaches a student only once it can be described and is cleared', () => {
  const complete = { storageKey: `media/ab/12/${SHA}.png`, altText: 'Anterior upper limb', rights: 'CC BY 4.0' }
  assert.deepEqual(mediaReleaseBlockers(complete), [])
  assert.equal(isMediaReleased(complete), true)

  assert.deepEqual(mediaReleaseBlockers({ ...complete, altText: '  ' }), ['no alt text'])
  assert.deepEqual(mediaReleaseBlockers({ ...complete, rights: '' }), ['no cleared rights'])
  assert.deepEqual(mediaReleaseBlockers({ ...complete, storageKey: '' }), ['no stored file'])
  assert.equal(isMediaReleased({ ...complete, rights: '' }), false)
})

test('usage names every item that points at this image, and where', () => {
  const ledger = [
    question('q1', [{ id: 'p1', mediaId: 'med-a', slot: 'stem' }]),
    question('q2', [{ id: 'p2', mediaId: 'med-a', slot: 'answer', answerLabel: 'C' }]),
    question('q3', [{ id: 'p3', mediaId: 'med-b', slot: 'stem' }]),
  ]
  const usage = usageOf('med-a', ledger, [])
  assert.deepEqual(usage.map((entry) => [entry.ownerId, entry.where]), [['q1', 'stem'], ['q2', 'answer C']])
  assert.deepEqual(usageOf('med-b', ledger, []).map((entry) => entry.ownerId), ['q3'])
  assert.deepEqual(usageOf('med-nobody', ledger, []), [])
})

test('a concept that shows an image counts as using it', () => {
  const concepts = [{ id: 'c1', label: 'Brachial plexus', mediaIds: ['med-a'] }]
  const usage = usageOf('med-a', [], concepts)
  assert.deepEqual(usage.map((entry) => [entry.ownerKind, entry.ownerId, entry.where]), [['concept', 'c1', 'concept media']])
})

test('an image in use cannot be deleted, and the refusal says who is using it', () => {
  const ledger = [question('q1', [{ id: 'p1', mediaId: 'med-a', slot: 'stem' }])]
  const refusal = deleteRefusal('med-a', ledger, [])
  assert.match(refusal, /1 item/)
  assert.match(refusal, /Question q1/)
  assert.equal(deleteRefusal('med-free', ledger, []), null)
})

test('the document this library lives in is named once', () => {
  assert.equal(MEDIA_STATE_KEY, 'synapse-media-library-v1')
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd server && node --test src/mediaLibrary.test.js`
Expected: FAIL — `Cannot find module './mediaLibrary.js'`

- [ ] **Step 3: Write `server/src/mediaLibrary.js`**

```js
/**
 * Where a media file is stored, whether it may be shown, and who is using it.
 *
 * No database and no Express: the same split every rule module here makes, so
 * these can be tested without a driver loaded. `src/data/mediaLibrary.ts`
 * mirrors it and a parity test holds the two together.
 */

import { MEDIA_MIME_EXTENSION } from './imageMeta.js'

export const MEDIA_STATE_KEY = 'synapse-media-library-v1'

/**
 * The path a file with this digest is stored at.
 *
 * Content-addressed, so the path is also the integrity check: a file that
 * hashes to its own name cannot have been corrupted in place unnoticed. The
 * first four hex characters fan the tree out, so no directory ends up holding
 * every image in the product.
 *
 * Returns null rather than a best effort for anything that is not a real
 * digest and an accepted type — which is also what makes traversal impossible
 * here: 64 lowercase hex characters cannot contain a slash or a dot.
 */
export function storageKeyFor(sha256, mimeType) {
  const extension = MEDIA_MIME_EXTENSION[mimeType]
  if (!extension) return null
  if (typeof sha256 !== 'string' || !/^[0-9a-f]{64}$/.test(sha256)) return null
  return `media/${sha256.slice(0, 2)}/${sha256.slice(2, 4)}/${sha256}.${extension}`
}

/**
 * Why this image would not currently reach a student.
 *
 * The same three-part rule `isMediaReleased` applies to article media, for the
 * same reasons: something with no file cannot render, something with no alt
 * text cannot be read aloud, and something with uncleared rights should not be
 * published at all.
 */
export function mediaReleaseBlockers(record) {
  const blockers = []
  if (!record?.storageKey?.trim()) blockers.push('no stored file')
  if (!record?.altText?.trim()) blockers.push('no alt text')
  if (!record?.rights?.trim()) blockers.push('no cleared rights')
  return blockers
}

export function isMediaReleased(record) {
  return mediaReleaseBlockers(record).length === 0
}

/** Where each content kind keeps its placements. */
function placementsOf(item) {
  return item?.questionData?.media
    ?? item?.articleData?.media
    ?? item?.practicalData?.media
    ?? []
}

/** How a placement reads on screen, so a usage list is scannable. */
function whereOf(placement) {
  if (placement.slot === 'answer') return `answer ${placement.answerLabel ?? '?'}`
  return placement.slot ?? 'stem'
}

/**
 * Every item pointing at this image.
 *
 * This is what makes reuse safe rather than merely possible: before an image is
 * replaced or removed, the person doing it can see exactly what they are about
 * to change, and pick which of those they meant.
 */
export function usageOf(mediaId, ledger, concepts) {
  const usage = []
  for (const item of Array.isArray(ledger) ? ledger : []) {
    for (const placement of placementsOf(item)) {
      if (placement?.mediaId !== mediaId) continue
      usage.push({
        ownerId: item.id,
        ownerKind: item.kind,
        ownerTitle: item.title,
        placementId: placement.id,
        where: whereOf(placement),
      })
    }
  }
  for (const concept of Array.isArray(concepts) ? concepts : []) {
    if (!concept?.mediaIds?.includes(mediaId)) continue
    usage.push({
      ownerId: concept.id,
      ownerKind: 'concept',
      ownerTitle: concept.label,
      placementId: null,
      where: 'concept media',
    })
  }
  return usage
}

/**
 * Why this image cannot be deleted, or null when it can.
 *
 * An image is never removed out from under content that renders it. The
 * refusal names what is using it, because "cannot delete" without a reason is
 * an obstacle rather than an answer.
 */
export function deleteRefusal(mediaId, ledger, concepts) {
  const usage = usageOf(mediaId, ledger, concepts)
  if (!usage.length) return null
  const names = usage.slice(0, 5).map((entry) => entry.ownerTitle).join(', ')
  const rest = usage.length > 5 ? `, and ${usage.length - 5} more` : ''
  return `${usage.length} item${usage.length === 1 ? '' : 's'} still use this image: ${names}${rest}`
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd server && node --test src/mediaLibrary.test.js`
Expected: PASS — 7 tests.

- [ ] **Step 5: Commit**

```bash
git add server/src/mediaLibrary.js server/src/mediaLibrary.test.js
git commit -m "$(cat <<'EOF'
Say where an image lives, and who would notice if it moved

The path is the digest, so it is also the integrity check, and sixty-four
lowercase hex characters cannot contain a slash. Usage is computed
before anything is replaced or deleted, because reuse is only safe if
you can see what you are about to change.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: The media routes

**Files:**
- Modify: `server/src/index.js`
- Modify: `server/src/tabs.js`
- Modify: `server/src/tabs.test.js`

**Interfaces:**
- Consumes: `imageMeta.js`, `mediaLibrary.js`, `receiveStream` from `uploads.js`, `requireTab` from `auth.js`.
- Produces: `POST /api/media`, `GET /api/media/:id`, `DELETE /api/media/:id`.

The upload is one request, not the register-then-stream dance `medical-resources` needs — there is no pre-qualified digest to check against, because the digest is what the upload produces.

- [ ] **Step 1: Declare the document on the Resources tab**

In `server/src/tabs.js`, add the media key to the `resources` entry:

```js
  { id: 'resources', to: '/admin/resources', group: 'Content',
    stateKeys: ['synapse-admin-content-ledger-v4', 'synapse-media-library-v1'],
    apiPrefixes: ['/api/medical-resources', '/api/media'] },
```

Mirror it in `src/data/adminTabs.ts` on the same entry. In `server/src/tabs.test.js`, extend the key-ownership test:

```js
  assert.deepEqual(tabsForStateKey('synapse-media-library-v1'), ['resources'])
```

Run: `cd server && node --test src/tabs.test.js`
Expected: PASS.

Run: `node --test --experimental-strip-types src/data/adminTabs.test.ts`
Expected: PASS — the parity test proves both sides gained the same entry.

- [ ] **Step 2: Add the routes**

At the top of `server/src/index.js`, beside the other constants near line 72:

```js
const MEDIA_STORAGE_DIR = RESOURCE_STORAGE_DIR
const MEDIA_MAX_BYTES = Number(process.env.MEDIA_MAX_BYTES) || 20 * 1024 * 1024
```

Add the imports:

```js
import { imageMeta } from './imageMeta.js'
import { MEDIA_STATE_KEY, deleteRefusal, storageKeyFor } from './mediaLibrary.js'
```

Then, beside the other `medical-resources` routes:

```js
/**
 * Receive one image.
 *
 * A single request, unlike a medical resource: there the catalogue already
 * knows the digest and the upload is checked against it, and here the digest is
 * what the upload produces. So the bytes land in a staging file, are measured
 * and identified from their own content, and only then move to the path their
 * digest names.
 */
app.post('/api/media', requireTab('resources'), wrap(async (req, res) => {
  const staging = resolveWithin(MEDIA_STORAGE_DIR, join('media', '.staging', randomUUID()))
  if (!staging) return res.status(500).json({ error: 'media staging path could not be resolved' })

  let received
  try {
    received = await receiveStream(req, staging, { maxBytes: MEDIA_MAX_BYTES })
  } catch (error) {
    return res.status(413).json({ error: error.message })
  }

  // Identified from the file, never from the Content-Type the caller sent.
  const head = Buffer.alloc(Math.min(64 * 1024, received.sizeBytes))
  const handle = await open(staging, 'r')
  try { await handle.read(head, 0, head.length, 0) } finally { await handle.close() }
  const meta = imageMeta(head)
  if (!meta) {
    await rm(staging, { force: true })
    return res.status(415).json({ error: 'that file is not a PNG, JPEG, GIF or WebP image' })
  }

  const storageKey = storageKeyFor(received.sha256, meta.mimeType)
  const fullPath = storageKey && resolveWithin(MEDIA_STORAGE_DIR, storageKey)
  if (!fullPath) {
    await rm(staging, { force: true })
    return res.status(500).json({ error: 'media path could not be resolved' })
  }

  // Two people uploading the same file store it once. They still each get their
  // own record — the client is told about the match and offers the existing one.
  const alreadyStored = existsSync(fullPath)
  if (alreadyStored) await rm(staging, { force: true })
  else {
    await mkdir(dirname(fullPath), { recursive: true })
    await rename(staging, fullPath)
  }

  res.json({
    ok: true,
    storageKey,
    sha256: received.sha256,
    sizeBytes: received.sizeBytes,
    mimeType: meta.mimeType,
    width: meta.width,
    height: meta.height,
    alreadyStored,
  })
}))

/**
 * Serve one image.
 *
 * Authenticated, like every other stored file here: these are a paying
 * product's teaching assets. Cached immutably because the path is the digest —
 * this URL cannot ever mean a different picture.
 */
app.get('/api/media/:id', requireAuthenticated, wrap(async (req, res) => {
  const record = (await mediaRecords()).find((entry) => entry.id === req.params.id)
  if (!record) return res.status(404).json({ error: 'media not found' })
  const fullPath = resolveWithin(MEDIA_STORAGE_DIR, record.storageKey || '')
  if (!fullPath || !existsSync(fullPath)) return res.status(404).json({ error: 'media file is missing' })
  res.setHeader('Content-Type', record.mimeType || 'application/octet-stream')
  res.setHeader('Cache-Control', 'private, max-age=31536000, immutable')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.sendFile(fullPath)
}))

app.delete('/api/media/:id', requireTab('resources'), wrap(async (req, res) => {
  const [ledgerRow] = await pool.query('SELECT v FROM app_state WHERE k = ?', ['synapse-admin-content-ledger-v4'])
  const [graphRow] = await pool.query('SELECT v FROM app_state WHERE k = ?', ['synapse-concept-graph-v2'])
  const ledger = ledgerRow.length ? JSON.parse(ledgerRow[0].v) : []
  const concepts = graphRow.length ? (JSON.parse(graphRow[0].v).concepts ?? []) : []
  const refusal = deleteRefusal(req.params.id, ledger, concepts)
  if (refusal) return res.status(409).json({ error: refusal })
  // The record is removed by the client's write to the library document; this
  // route exists to refuse, and to say why. The bytes are left in place: they
  // are content-addressed, so another record may legitimately name them.
  res.json({ ok: true })
}))
```

Add a `mediaRecords()` reader beside `medicalResourceRecords()`, following its cache-and-invalidate shape:

```js
let mediaSnapshot = null

async function mediaRecords() {
  if (mediaSnapshot) return mediaSnapshot
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [MEDIA_STATE_KEY])
  mediaSnapshot = rows.length ? JSON.parse(rows[0].v)?.records ?? [] : []
  return mediaSnapshot
}
```

And drop the cache inside `invalidateSnapshots(key)` when `key === MEDIA_STATE_KEY`, exactly as it already does for the medical-resource snapshot.

Extend the imports from `node:fs/promises` to include `open`, `rename`, `mkdir`, `rm`, and from `node:crypto` to include `randomUUID`, if any are not already imported.

- [ ] **Step 3: Verify**

Run: `cd server && node --check src/index.js`
Expected: no output.

Run: `cd server && npm test`
Expected: PASS — all suites including `imageMeta` and `mediaLibrary`.

Run: `cd server && grep -c "requireAdmin" src/index.js`
Expected: `0`.

- [ ] **Step 4: Commit**

```bash
git add server/src/index.js server/src/tabs.js server/src/tabs.test.js src/data/adminTabs.ts
git commit -m "$(cat <<'EOF'
Accept an image, and put it where its digest says

One request rather than the resource path's register-then-stream: there
the catalogue already knows the digest and checks the upload against it,
and here the digest is what the upload produces. The bytes land in
staging, are identified from their own content, and only then move to
the path they name. The same file twice is stored once.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: The client's twin, and the round trip

**Files:**
- Create: `src/data/mediaLibrary.ts`
- Create: `src/data/mediaLibrary.test.ts`
- Create: `src/lib/mediaUpload.ts`

**Interfaces:**
- Consumes: Task 2's rules, Task 3's routes.
- Produces: `MediaRecord`, `MediaPlacement`, `MEDIA_STATE_KEY`, `storageKeyFor`, `mediaReleaseBlockers`, `isMediaReleased`, `usageOf`, `deleteRefusal`, `mediaUrl(id)`; and `uploadMedia(file)` → `{ record, alreadyStored }`, `verifyRenders(id)` → `{ width, height }`.

- [ ] **Step 1: Write `src/data/mediaLibrary.ts`**

Transliterate `server/src/mediaLibrary.js` — same functions, same order, same comments — declared rather than imported, for the reason in the Global Constraints. Add the types:

```ts
export interface MediaRecord {
  id: string
  storageKey: string
  sha256: string
  mimeType: string
  sizeBytes: number
  width: number
  height: number
  title: string
  altText: string
  rights: string
  tags: { moduleIds: string[]; moduleSubjectPaths: string[]; conceptIds: string[]; yearIds: string[] }
  uploadedBy: string
  uploadedAt: string
}

export type MediaSlot = 'stem' | 'answer' | 'explanation'

export interface MediaPlacement {
  id: string
  mediaId: string
  slot: MediaSlot
  /** Only meaningful when slot is 'answer'. */
  answerLabel?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  /** A caption for this use alone. The record's own `title` is untouched. */
  caption?: string
}

export interface MediaLibraryDocument { records: MediaRecord[] }

/** Where a stored image is fetched from. The one place that knows the shape. */
export function mediaUrl(id: string): string {
  return `/media/${encodeURIComponent(id)}`
}
```

Do not paraphrase the rule bodies — the parity test compares the two implementations, and a tidier client version is what that test exists to catch.

- [ ] **Step 2: Write the parity test `src/data/mediaLibrary.test.ts`**

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { MEDIA_STATE_KEY, deleteRefusal, isMediaReleased, mediaReleaseBlockers, storageKeyFor, usageOf } from './mediaLibrary.ts'
import * as server from '../../server/src/mediaLibrary.js'

const SHA = 'ab12cd34'.padEnd(64, '0')

test('the client and the server agree where a file is stored', () => {
  assert.equal(MEDIA_STATE_KEY, server.MEDIA_STATE_KEY)
  for (const mime of ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'application/pdf']) {
    assert.equal(storageKeyFor(SHA, mime), server.storageKeyFor(SHA, mime), mime)
  }
  assert.equal(storageKeyFor('short', 'image/png'), server.storageKeyFor('short', 'image/png'))
})

test('the client and the server agree on what holds an image back', () => {
  const cases = [
    { storageKey: 'media/ab/12/x.png', altText: 'a', rights: 'b' },
    { storageKey: '', altText: 'a', rights: 'b' },
    { storageKey: 'x', altText: ' ', rights: 'b' },
    { storageKey: 'x', altText: 'a', rights: '' },
    {},
  ]
  for (const record of cases) {
    assert.deepEqual(mediaReleaseBlockers(record as never), server.mediaReleaseBlockers(record))
    assert.equal(isMediaReleased(record as never), server.isMediaReleased(record))
  }
})

test('the client and the server agree who is using an image', () => {
  const ledger = [
    { id: 'q1', kind: 'question', title: 'Q1', questionData: { media: [{ id: 'p1', mediaId: 'med-a', slot: 'stem' }] } },
    { id: 'q2', kind: 'question', title: 'Q2', questionData: { media: [{ id: 'p2', mediaId: 'med-a', slot: 'answer', answerLabel: 'C' }] } },
  ]
  const concepts = [{ id: 'c1', label: 'Plexus', mediaIds: ['med-a'] }]
  assert.deepEqual(usageOf('med-a', ledger as never, concepts as never), server.usageOf('med-a', ledger, concepts))
  assert.equal(deleteRefusal('med-a', ledger as never, concepts as never), server.deleteRefusal('med-a', ledger, concepts))
  assert.equal(deleteRefusal('med-none', ledger as never, concepts as never), server.deleteRefusal('med-none', ledger, concepts))
})
```

- [ ] **Step 3: Run it**

Run: `node --test --experimental-strip-types src/data/mediaLibrary.test.ts`
Expected: PASS — 3 tests.

- [ ] **Step 4: Write `src/lib/mediaUpload.ts`**

```ts
import { API_MODE, apiFetchFile, apiSend } from './api'
import { mediaUrl, type MediaRecord } from '@/data/mediaLibrary'

/**
 * Put a file on the server and prove it came back.
 *
 * The proving is the point. The old path wrote to IndexedDB and reported
 * success, which was true and useless: the write had happened somewhere only
 * that browser could read. So nothing here reports success until the bytes have
 * made the round trip and decoded on the way back.
 */

export interface UploadedMedia {
  /** Everything the server measured from the file itself. */
  measured: Pick<MediaRecord, 'storageKey' | 'sha256' | 'mimeType' | 'sizeBytes' | 'width' | 'height'>
  /** True when these exact bytes were already stored under another record. */
  alreadyStored: boolean
}

export async function uploadMedia(file: File): Promise<UploadedMedia> {
  if (!API_MODE) throw new Error('Uploading media needs the live backend. Set VITE_API_BASE to connect it.')
  const response = await apiSend<{
    storageKey: string; sha256: string; mimeType: string; sizeBytes: number
    width: number; height: number; alreadyStored: boolean
  }>('/media', 'POST', file)
  const { alreadyStored, ...measured } = response
  return { measured, alreadyStored }
}

/**
 * Fetch a stored image back and decode it.
 *
 * Deliberately not the blob still in hand: what has to be proved is that the
 * *server* has it and will hand it to somebody else. A decode that yields real
 * dimensions is the difference between "the request succeeded" and "there is a
 * picture there".
 */
export async function verifyRenders(id: string): Promise<{ width: number; height: number }> {
  const bytes = await apiFetchFile(mediaUrl(id))
  const blob = new Blob([bytes])
  const bitmap = await createImageBitmap(blob)
  try {
    if (!bitmap.width || !bitmap.height) throw new Error('The stored file did not decode as an image.')
    return { width: bitmap.width, height: bitmap.height }
  } finally {
    bitmap.close()
  }
}
```

`apiSend` currently JSON-stringifies its body. Extend it so a `File` or `Blob` body is sent as-is with its own content type rather than stringified — one branch, and the media route is its only caller:

```ts
  const isBinary = body instanceof Blob
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: await headers(!isBinary),
    body: body == null ? undefined : isBinary ? body : JSON.stringify(body),
    keepalive,
  })
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data/mediaLibrary.ts src/data/mediaLibrary.test.ts src/lib/mediaUpload.ts src/lib/api.ts
git commit -m "$(cat <<'EOF'
Prove the picture came back, not that the request succeeded

The old path wrote to IndexedDB and reported success, which was true and
useless — the write had happened somewhere only that browser could read.
Nothing here reports success until the bytes have made the round trip
and decoded at real dimensions on the way back.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Placements, and the student's view of them

**Files:**
- Modify: `src/data/contentControl.ts`
- Modify: `src/data/qbank.ts`
- Modify: `src/components/qbank/QuestionView.tsx`
- Modify: `server/src/studentLedger.js`
- Create: `src/components/ui/PlacedMedia.tsx`
- Create: `src/data/mediaPlacement.test.ts`

**Interfaces:**
- Consumes: `MediaPlacement` from Task 4.
- Produces: `placementsFor(media, slot, answerLabel)`; `<PlacedMedia>`; `Question.media`.

- [ ] **Step 1: Write the failing test**

Create `src/data/mediaPlacement.test.ts`:

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { placementsFor } from './mediaPlacement.ts'
import type { MediaPlacement } from './mediaLibrary.ts'

const media: MediaPlacement[] = [
  { id: 'p1', mediaId: 'm1', slot: 'stem' },
  { id: 'p2', mediaId: 'm2', slot: 'answer', answerLabel: 'A' },
  { id: 'p3', mediaId: 'm3', slot: 'answer', answerLabel: 'C' },
  { id: 'p4', mediaId: 'm4', slot: 'explanation' },
]

test('each slot gets only what belongs to it', () => {
  assert.deepEqual(placementsFor(media, 'stem').map((p) => p.mediaId), ['m1'])
  assert.deepEqual(placementsFor(media, 'explanation').map((p) => p.mediaId), ['m4'])
  assert.deepEqual(placementsFor(media, 'answer', 'A').map((p) => p.mediaId), ['m2'])
  assert.deepEqual(placementsFor(media, 'answer', 'C').map((p) => p.mediaId), ['m3'])
  assert.deepEqual(placementsFor(media, 'answer', 'B'), [])
})

test('an answer slot with no letter belongs to no option', () => {
  // Otherwise a half-written placement would appear under every option at once.
  assert.deepEqual(placementsFor([{ id: 'x', mediaId: 'm', slot: 'answer' }], 'answer', 'A'), [])
})

test('absent media is not an error', () => {
  assert.deepEqual(placementsFor(undefined, 'stem'), [])
  assert.deepEqual(placementsFor([], 'stem'), [])
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test --experimental-strip-types src/data/mediaPlacement.test.ts`
Expected: FAIL — `Cannot find module './mediaPlacement.ts'`

- [ ] **Step 3: Write `src/data/mediaPlacement.ts`**

```ts
import type { MediaPlacement, MediaSlot } from './mediaLibrary.ts'

/**
 * The media belonging to one slot of one item.
 *
 * An answer placement must name its letter to belong anywhere: without this a
 * half-written placement would render under every option at once, which is
 * worse than rendering nowhere.
 */
export function placementsFor(
  media: MediaPlacement[] | undefined,
  slot: MediaSlot,
  answerLabel?: string,
): MediaPlacement[] {
  if (!media?.length) return []
  return media.filter((placement) => {
    if (placement.slot !== slot) return false
    if (slot !== 'answer') return true
    return Boolean(placement.answerLabel) && placement.answerLabel === answerLabel
  })
}
```

- [ ] **Step 4: Run the test**

Run: `node --test --experimental-strip-types src/data/mediaPlacement.test.ts`
Expected: PASS — 3 tests.

- [ ] **Step 5: Add the fields**

In `src/data/contentControl.ts`, add to **`QuestionAuthoringData` only**:

```ts
  /**
   * Images placed in this item, by slot. Separate from `attachedImage` and
   * `attachments`, which predate the media library and still render — live
   * content is not broken to tidy a data model.
   */
  media?: MediaPlacement[]
```

Import the type: `import type { MediaPlacement } from './mediaLibrary.ts'`.

**Not on articles, and not on practicals.** An article already has a media
system — `ArticleMediaRecord[]`, with anchors tying an image to the exact words
it illustrates and its own release gating. A second list beside it would be two
ways to put a picture in an article, free to disagree about which renders.
Practicals likewise carry `LabQuestionDraft.mediaUrl`.

Both instead gain the *store*: their existing URL fields accept a media-library
URL, so an article plate and a lab image become server-stored without a second
placement model. Slots were only missing on questions, which is the one kind
whose options can themselves be pictures.

In `src/data/qbank.ts`, beside `attachedImage` and `attachments` (lines 44–45):

```ts
  media?: MediaPlacement[]
```

In `server/src/studentLedger.js:81`, add `'media'` to the list of question fields the projection keeps, so placements survive to the student.

- [ ] **Step 6: Render them**

Create `src/components/ui/PlacedMedia.tsx`:

```tsx
import { useEffect, useState } from 'react'
import { ZoomableImage } from '@/components/ui/MediaAttachmentView'
import { mediaUrl, type MediaPlacement, type MediaRecord } from '@/data/mediaLibrary'
import { apiFetchFile } from '@/lib/api'

/**
 * One placed image, fetched with the session's credentials.
 *
 * `GET /api/media/:id` is authenticated, and an `<img src>` cannot send a
 * bearer token — it would simply 401 and show a broken image. So the bytes are
 * fetched like any other protected file and handed to the tag as an object URL,
 * which is exactly what `MediaAttachmentView` already does for attachments.
 * Revoked on unmount, or the tab leaks a blob per image it has ever shown.
 */
function PlacedImage({ record, caption }: { record: MediaRecord; caption?: string }) {
  const [source, setSource] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    let objectUrl = ''
    apiFetchFile(mediaUrl(record.id))
      .then((bytes) => {
        if (!active) return
        objectUrl = URL.createObjectURL(new Blob([bytes], { type: record.mimeType }))
        setSource(objectUrl)
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : 'This image could not be loaded.')
      })
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [record.id, record.mimeType])

  if (error) return <p role="alert" className="px-1 text-[11.5px] text-danger">{error}</p>
  if (!source) return <div className="h-40 animate-pulse rounded-lg bg-inset" aria-hidden />
  return (
    <figure className="mt-2 overflow-hidden rounded-xl border border-line bg-surface-2 p-2">
      <ZoomableImage src={source} alt={record.altText} className="max-h-80 w-full rounded-lg object-contain" />
      {(caption || record.title) && (
        <figcaption className="mt-1.5 px-1 text-[11.5px] leading-snug text-ink-3">{caption || record.title}</figcaption>
      )}
    </figure>
  )
}

/**
 * Images placed in one slot of an item.
 *
 * Alt text comes from the record rather than the placement: it describes the
 * picture, and the picture does not change between uses. The caption does, so
 * that is per-placement.
 */
export function PlacedMedia({ placements, records, className }: {
  placements: MediaPlacement[]
  records: Map<string, MediaRecord>
  className?: string
}) {
  if (!placements.length) return null
  return (
    <div className={className}>
      {placements.map((placement) => {
        const record = records.get(placement.mediaId)
        return record
          ? <PlacedImage key={placement.id} record={record} caption={placement.caption} />
          : null
      })}
    </div>
  )
}
```

In `src/components/qbank/QuestionView.tsx`, render the three slots. Read the file first and match its layout conventions. The stem block goes beside the existing `attachedImage` block (line 83); the answer block goes inside the option map, after the option's text; the explanation block goes with the explanation, which only renders when `revealed` is true.

```tsx
<PlacedMedia placements={placementsFor(question.media, 'stem')} records={mediaRecords} />
```

```tsx
<PlacedMedia placements={placementsFor(question.media, 'answer', LETTERS[index])} records={mediaRecords} />
```

```tsx
{revealed && <PlacedMedia placements={placementsFor(question.media, 'explanation')} records={mediaRecords} />}
```

`mediaRecords` is a `Map<string, MediaRecord>` read from the media library document by a small hook, `useMediaRecords()`, in `src/lib/useMediaRecords.ts`:

```ts
import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { MEDIA_STATE_KEY, type MediaLibraryDocument, type MediaRecord } from '@/data/mediaLibrary'

/** Every media record, by id. One document, read by every surface that renders media. */
export function useMediaRecords(): Map<string, MediaRecord> {
  const [document] = usePersistentState<MediaLibraryDocument>(MEDIA_STATE_KEY, { records: [] })
  return useMemo(() => new Map((document.records ?? []).map((record) => [record.id, record])), [document])
}
```

`MEDIA_STATE_KEY` must be added to `STUDENT_READABLE_STATE` in `server/src/index.js`, since students need the alt text and dimensions to render what they have been given.

- [ ] **Step 7: Verify**

Run: `npm test && npm run build`
Expected: all PASS, build succeeds.

- [ ] **Step 8: Commit**

```bash
git add src/data/contentControl.ts src/data/qbank.ts src/data/mediaPlacement.ts src/data/mediaPlacement.test.ts src/components/ui/PlacedMedia.tsx src/components/qbank/QuestionView.tsx src/lib/useMediaRecords.ts server/src/studentLedger.js server/src/index.js
git commit -m "$(cat <<'EOF'
Let an image belong to an answer, not just to a question

"Which of these four radiographs shows..." could not be authored at all:
a question carried one stem image and a flat attachment list, with no
way to say which option a picture belonged to. Placements name a slot —
stem, an answer letter, or the explanation — and an answer placement
without a letter belongs nowhere rather than to all of them.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: The proof-of-render preview

**Files:**
- Create: `src/components/admin/MediaPlacementEditor.tsx`
- Create: `src/components/admin/MediaPicker.tsx`

**Interfaces:**
- Consumes: `uploadMedia`, `verifyRenders` (Task 4); `PlacedMedia`, `placementsFor` (Task 5).
- Produces: `<MediaPlacementEditor question … />`, `<MediaPicker onPick … />`.

- [ ] **Step 1: Write `MediaPicker.tsx`**

A two-mode control: upload a file, or choose an existing record. On upload it calls `uploadMedia`, writes a record into the library document, and — when the server reports `alreadyStored` — first offers the existing record that already holds those bytes:

```tsx
const { measured, alreadyStored } = await uploadMedia(file)
const twin = alreadyStored ? records.find((record) => record.sha256 === measured.sha256) : undefined
if (twin) {
  setDuplicate(twin)   // renders: "this exact image is already in the library as …; use it?"
  return
}
```

Choosing "use it" calls `onPick(twin.id)` and writes no new record. Choosing "add anyway" writes a new record sharing the `storageKey`, which is correct and costs no disk.

New records are written with `title`, `altText` and `rights` fields required before the record leaves the dialog — `mediaReleaseBlockers` decides, and the dialog states which are outstanding rather than refusing silently.

- [ ] **Step 2: Write `MediaPlacementEditor.tsx`**

The component that makes the confirmation honest:

```tsx
type ProofState =
  | { phase: 'idle' }
  | { phase: 'uploading' }
  | { phase: 'verifying' }
  | { phase: 'rendering'; mediaId: string }
  | { phase: 'proved'; mediaId: string; width: number; height: number }
  | { phase: 'failed'; at: 'upload' | 'verify' | 'render'; reason: string }
```

```tsx
async function attach(file: File, slot: MediaSlot, answerLabel?: string) {
  setProof({ phase: 'uploading' })
  let mediaId: string
  try {
    mediaId = await pickerUpload(file)             // writes the record
  } catch (error) {
    return setProof({ phase: 'failed', at: 'upload', reason: message(error) })
  }
  // The server has it. Whether a student can see it is a different question,
  // and this is where it gets asked.
  setProof({ phase: 'verifying' })
  try {
    const { width, height } = await verifyRenders(mediaId)
    setProof({ phase: 'rendering', mediaId })
    onChange([...placements, { id: newPlacementId(), mediaId, slot, answerLabel }])
    setProof({ phase: 'proved', mediaId, width, height })
  } catch (error) {
    setProof({ phase: 'failed', at: 'verify', reason: message(error) })
  }
}
```

The `proved` state renders the **actual student view** below the editor:

```tsx
{proof.phase === 'proved' && (
  <div className="mt-3 rounded-xl border border-success/40 bg-success-tint/30 p-3">
    <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
      <Icon icon={Check} size={14} className="text-success" />
      Stored and rendering — {proof.width}×{proof.height}. This is what the student sees:
    </p>
    <div className="mt-2 rounded-lg border border-line bg-surface p-3">
      <QuestionView question={previewQuestion} chosen={null} revealed onChoose={() => undefined} />
    </div>
  </div>
)}
```

`previewQuestion` is the draft projected into the student `Question` shape, with the new placement included. **Use `QuestionView` itself** — the component the runner renders. A purpose-built preview can be right while the student's view is wrong, which is the failure this whole plan exists to end.

Every `failed` state names its stage: *the upload did not complete*, *the server has it but it did not come back as an image*, *it came back but did not render in that slot*. None of them says "uploaded".

- [ ] **Step 3: Verify in the browser**

Run: `npm run build`
Expected: build succeeds.

Start the dev server through the preview tooling. In demo mode `uploadMedia` throws the "needs the live backend" error by design — confirm the editor shows that as a **failed** state naming the upload stage, and never as a success. That negative case is the one worth checking without a backend.

- [ ] **Step 4: Commit**

```bash
git add src/components/admin/MediaPicker.tsx src/components/admin/MediaPlacementEditor.tsx
git commit -m "$(cat <<'EOF'
Make the confirmation a rendering rather than a sentence

Nothing says uploaded until the bytes have gone to the server, come
back, decoded, and rendered through the same QuestionView the student
runs. Each failure names its stage — did not complete, did not come back
as an image, did not render in that slot — because "upload failed" for
three different reasons is three different fixes.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: The question editor, and stranded media

**Files:**
- Modify: `src/components/admin/QuestionEditorDialog.tsx`
- Create: `src/components/admin/StrandedMediaNotice.tsx`

- [ ] **Step 1: Write `StrandedMediaNotice.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { isStoredMediaReference, resolveMediaSource } from '@/lib/mediaStorage'

/**
 * An image that exists only in one browser.
 *
 * `synapse-media:` references were written to IndexedDB, so they render for
 * whoever uploaded them and for nobody else — including that same person on a
 * different machine. Saying so where the image appears is the whole point:
 * this was invisible, which is why it survived.
 *
 * Re-upload is offered only when this browser actually holds the bytes. On any
 * other machine the notice states plainly that the file is not here, because a
 * disabled button that does nothing looks the same as one that quietly failed.
 */
export function StrandedMediaNotice({ reference, onRecovered }: {
  reference: string
  onRecovered: (mediaId: string) => void
}) {
  const [available, setAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    resolveMediaSource(reference)
      .then(() => { if (!cancelled) setAvailable(true) })
      .catch(() => { if (!cancelled) setAvailable(false) })
    return () => { cancelled = true }
  }, [reference])

  if (!isStoredMediaReference(reference)) return null
  return (
    <div className="rounded-lg border border-warning/40 bg-warning-tint px-3 py-2.5">
      <p className="flex items-start gap-2 text-[12px] font-semibold text-ink">
        <Icon icon={TriangleAlert} size={14} className="mt-0.5 shrink-0 text-warning" />
        This image exists only in one browser. Students cannot see it.
      </p>
      <p className="mt-1 text-[11.5px] leading-relaxed text-ink-2">
        {available === false
          ? 'The file is not on this machine, so it cannot be recovered here. Whoever uploaded it can re-upload it from the browser they used, or attach it again from the original.'
          : 'Re-upload it to publish it. The original file is still in this browser.'}
      </p>
      {available && (
        <Button className="mt-2" size="sm" variant="secondary" onClick={() => void recover(reference, onRecovered)}>
          Upload to the server
        </Button>
      )}
    </div>
  )
}
```

`recover` reads the blob back through `resolveMediaSource`, turns it into a `File`, and puts it through the same `uploadMedia` + `verifyRenders` path as any other upload — nothing about a rescued file is trusted more than a fresh one.

- [ ] **Step 2: Wire the editor**

In `QuestionEditorDialog.tsx`, add a *Placed media* section using `MediaPlacementEditor`, above the existing *Question attachments* section. Leave the attachments section in place — it holds live content.

Render `<StrandedMediaNotice>` beside any `attachedImage` or `attachments[].url` that `isStoredMediaReference` returns true for.

- [ ] **Step 3: Verify**

Run: `npm test && npm run build && npm run lint`
Expected: PASS, build succeeds, 0 lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/admin/QuestionEditorDialog.tsx src/components/admin/StrandedMediaNotice.tsx
git commit -m "$(cat <<'EOF'
Say which images only exist in one browser

Every image attached before today renders for whoever uploaded it and
for nobody else, and nothing on screen said so — which is why it
survived this long. Re-upload is offered only where the bytes are
actually present; elsewhere the notice says the file is not here, because
a button that quietly does nothing is worse than no button.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Media Requests, as a worklist that fulfils

**Files:**
- Modify: `src/pages/admin/MediaRequests.tsx`
- Modify: `src/data/contentControl.ts` (`MediaRequest` gains `slot`, `answerLabel`)

- [ ] **Step 1: Let a request name its slot**

In `contentControl.ts`, on `MediaRequest` (line 137):

```ts
  /** Where in the owner this asset goes, when the requester knows. */
  slot?: MediaSlot
  /** Only meaningful when slot is 'answer'. */
  answerLabel?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
```

- [ ] **Step 2: Group requests under their owner**

Replace the flat `visible` table with owner blocks. The row mapping already produces `ownerId`/`ownerTitle`; group by `ownerId` and render one panel per owner listing its requests. This is what "show those multiple media requests under that question" asks for — three images wanted by one question is one job, not three unrelated rows.

- [ ] **Step 3: Fulfil in place**

Each request row gets `<MediaPicker>` and, on a successful pick, writes the placement onto the owner and sets the request's `status` to `supplied` and its `mediaId` — in the same ledger update, so a fulfilled request and the media it refers to can never disagree.

Remove `supplied` from the status dropdown's options. `planned` and `declined` stay: they are human judgements. `supplied` becomes a fact set by the thing that made it true.

- [ ] **Step 4: Show the stranded count**

Above the backlog, a panel counting every `synapse-media:` reference across the ledger, linking to the items holding them.

- [ ] **Step 5: Verify**

Run: `npm test && npm run build`
Expected: PASS, build succeeds.

In the running app, open `/admin/library/media` and confirm requests group under their owners and the status control no longer offers `supplied`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/admin/MediaRequests.tsx src/data/contentControl.ts
git commit -m "$(cat <<'EOF'
Let the backlog be worked, not just re-labelled

The page could only change a status by hand, so "supplied" meant that
somebody typed it. It now means an image was uploaded, came back,
rendered in its slot, and was written onto the item — set by the thing
that made it true. A question waiting on three images reads as one job.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: The library browser, and changing shared media

**Files:**
- Create: `src/components/admin/MediaUsagePanel.tsx`
- Modify: `src/pages/admin/ResourcesSetup.tsx`

- [ ] **Step 1: The browser**

A `Media` section on Resources & Media, beside the existing resource catalogue.
Follow that page's own `Panel` + `Table` conventions rather than inventing a
layout. One row per record, with:

| Column | Content |
|---|---|
| Image | `<PlacedImage>` at thumbnail size |
| Title | `record.title`, and `record.altText` beneath it in `text-ink-3` |
| Size | `${record.width}×${record.height}`, and `sizeBytes` humanised |
| Used by | `usageOf(record.id, ledger, concepts).length`, linking to the usage panel |
| State | `mediaReleaseBlockers(record)` as a `danger` badge listing what is missing, or a `success` badge reading `live` |

Above it, a search over `title` and `altText`, and selects filtering on
`tags.moduleIds`, `tags.yearIds` and `tags.conceptIds` — the same vocabulary
content is tagged with, so a reviewer looking for "the upper limb plate" can
find it the way they would find the questions that use it.

**The library is deliberately not filtered by reviewer scope.** Restricting it
would fight the reason it exists: an upper limb plate is equally useful to a
Year 2 and a Year 4 reviewer, and forcing the second to re-upload it recreates
the duplication this replaces. Seeing an image grants nothing on its own —
*placing* one edits a question, and that write is already refused out of scope
by `authoriseChanges`. Scope governs content, not the shelf the assets sit on.

- [ ] **Step 2: The usage panel, with two clearly separate actions**

```tsx
/**
 * Who shares this image, and the two different things you might mean by
 * changing it.
 *
 * Replacing the file changes every item at once, which is the point of reuse
 * and also its hazard. Re-pointing changes only what is ticked. They are
 * separate controls rather than one dialog with a checkbox, because a reviewer
 * who wanted the second and got the first has silently edited every other item
 * on this list without opening one of them.
 */
```

- **Replace this image everywhere** — uploads a new file, rewrites this record's `storageKey`/`sha256`/dimensions. Confirmation states the count: *this changes 40 items*.
- **Use a different image for the ticked items** — each usage row has a checkbox; the action re-points those placements at another record and leaves the rest alone.
- **Delete** — calls `DELETE /api/media/:id`, which refuses with the usage list while anything references it. The button states the refusal rather than being disabled without explanation.

- [ ] **Step 3: Verify**

Run: `npm test && npm run build && npm run lint`
Expected: PASS, build succeeds, 0 lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/admin/MediaUsagePanel.tsx src/pages/admin/ResourcesSetup.tsx
git commit -m "$(cat <<'EOF'
Separate replacing an image from changing which one is used

Both change what a question shows, and confusing them silently edits
thirty-nine questions nobody opened. Replacing rewrites the file behind
one record and states the count first. Re-pointing moves only the ticked
items. Deleting is refused while anything still renders it, and says
what.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Concepts — media, and priority made legible

**Files:**
- Modify: `src/data/conceptGraph.ts`
- Modify: `src/pages/admin/ConceptsSetup.tsx`
- Modify: `src/components/concepts/ConceptChip.tsx`
- Create: `src/data/conceptPriority.ts`
- Create: `src/data/conceptPriority.test.ts`

- [ ] **Step 1: Write the failing priority test**

Create `src/data/conceptPriority.test.ts`:

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { PRIORITY_BANDS, bandOf, weightForBand } from './conceptPriority.ts'

test('every weight lands in exactly one band', () => {
  for (let weight = 0; weight <= 1.0001; weight += 0.05) {
    const bands = PRIORITY_BANDS.filter((band) => weight >= band.min && weight < band.max)
    assert.equal(bands.length, 1, `weight ${weight.toFixed(2)} matched ${bands.length} bands`)
  }
})

test('a band round-trips through its own weight', () => {
  for (const band of PRIORITY_BANDS) {
    assert.equal(bandOf(weightForBand(band.id)).id, band.id, band.id)
  }
})

test('the bands read in exam language, strongest first', () => {
  assert.deepEqual(PRIORITY_BANDS.map((band) => band.id), ['critical', 'high', 'standard', 'background'])
  assert.equal(bandOf(1).id, 'critical')
  assert.equal(bandOf(0).id, 'background')
})

test('an unset weight is background rather than an error', () => {
  assert.equal(bandOf(undefined).id, 'background')
  assert.equal(bandOf(Number.NaN).id, 'background')
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test --experimental-strip-types src/data/conceptPriority.test.ts`
Expected: FAIL — `Cannot find module './conceptPriority.ts'`

- [ ] **Step 3: Write `src/data/conceptPriority.ts`**

```ts
/**
 * `blueprintWeight`, said in exam language.
 *
 * The weight already exists, is already editable, and already decides what a
 * student studies next through `src/data/adaptive/priority.ts`. What it lacked
 * was any way to read it: 0.7 is not a sentence anyone says about an exam.
 *
 * So this is a vocabulary over one number, not a second number. Adding a
 * separate priority field would mean two values meaning one thing, free to
 * disagree, with nothing to say which wins.
 */

export interface PriorityBand {
  id: 'critical' | 'high' | 'standard' | 'background'
  label: string
  hint: string
  /** Inclusive. */
  min: number
  /** Exclusive, except for the top band. */
  max: number
}

export const PRIORITY_BANDS: PriorityBand[] = [
  { id: 'critical', label: 'Critical', hint: 'Comes up almost every sitting. A student who misses this loses marks.', min: 0.75, max: Infinity },
  { id: 'high', label: 'High', hint: 'Regularly examined. Worth deliberate revision.', min: 0.5, max: 0.75 },
  { id: 'standard', label: 'Standard', hint: 'Examined sometimes. Covered by ordinary study.', min: 0.25, max: 0.5 },
  { id: 'background', label: 'Background', hint: 'Rarely examined directly. Supports understanding elsewhere.', min: 0, max: 0.25 },
]

export function bandOf(weight: number | undefined | null): PriorityBand {
  const value = typeof weight === 'number' && Number.isFinite(weight) ? weight : 0
  return PRIORITY_BANDS.find((band) => value >= band.min && value < band.max) ?? PRIORITY_BANDS[3]
}

/** The weight the middle of a band writes, so picking one is a real edit. */
export function weightForBand(id: PriorityBand['id']): number {
  const band = PRIORITY_BANDS.find((candidate) => candidate.id === id) ?? PRIORITY_BANDS[3]
  const top = band.max === Infinity ? 1 : band.max
  return Math.round(((band.min + top) / 2) * 100) / 100
}
```

- [ ] **Step 4: Run the test**

Run: `node --test --experimental-strip-types src/data/conceptPriority.test.ts`
Expected: PASS — 4 tests.

- [ ] **Step 5: Wire the concept surfaces**

- `conceptGraph.ts`: `Concept` gains `mediaIds?: string[]`.
- `ConceptsSetup.tsx`: above the *Blueprint weight (0–1)* field at line 518, add a band control writing `weightForBand(id)`; keep the number field visible beneath it, and show `bandOf(draft.blueprintWeight).hint`. Add a media section using `MediaPicker`, writing `mediaIds`. Add band to the navigator's sort and filter.
- `ConceptChip.tsx`: render the concept's media in the student popover through `PlacedMedia`.

- [ ] **Step 6: Verify**

Run: `npm test && npm run build && npm run lint`
Expected: PASS, build succeeds, 0 lint errors.

- [ ] **Step 7: Commit**

```bash
git add src/data/conceptPriority.ts src/data/conceptPriority.test.ts src/data/conceptGraph.ts src/pages/admin/ConceptsSetup.tsx src/components/concepts/ConceptChip.tsx
git commit -m "$(cat <<'EOF'
Say a concept's exam weight in words a person uses

The number already existed, was already editable, and already decided
what a student studies next. What it lacked was any way to read it — 0.7
is not a sentence anyone says about an exam. Critical, High, Standard
and Background write the same number; a second priority field would have
been two values meaning one thing with nothing to say which wins.

Concepts also carry media now, from the same library, so the plate on a
question and the plate on the concept are one record.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Histology slides, off IndexedDB

**Files:**
- Modify: `src/components/admin/HistologyEditorDialog.tsx`
- Modify: `src/components/practical/SlideViewer.tsx`

- [ ] **Step 1: Upload slides through the media store**

Replace the `storeMediaFile` call at `HistologyEditorDialog.tsx:175` with the `uploadMedia` + `verifyRenders` path, storing the resulting media id on the view's `image` field as `mediaUrl(id)`.

`SlideViewer.tsx:100` calls `resolveMediaSource`, which passes non-`synapse-media:` values through unchanged — so a served URL needs no change there, and old references keep resolving for whoever holds them.

- [ ] **Step 2: Flag the stranded ones**

Render `<StrandedMediaNotice>` beside any slide view whose `image` is still a `synapse-media:` reference.

- [ ] **Step 3: Verify**

Run: `npm test && npm run build`
Expected: PASS, build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/admin/HistologyEditorDialog.tsx src/components/practical/SlideViewer.tsx
git commit -m "$(cat <<'EOF'
Let a student see the slide the reviewer uploaded

Histology arrived after this bug and inherited it: a slide image went to
IndexedDB, rendered perfectly for whoever chose it, and reached nobody.
Slides now go where every other image goes, and the ones already
stranded say so.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Verification

**Files:**
- Create: `docs/superpowers/plans/2026-08-21-media-library-verification.md`

- [ ] **Step 1: Run everything**

```bash
npm test && npm run lint && npm run build && cd server && npm test
```

Expected: all green, 0 lint errors.

- [ ] **Step 2: Confirm nothing new writes to IndexedDB**

```bash
grep -rn "storeMediaFile" src/ | grep -v "mediaStorage.ts"
```

Expected: no matches. `resolveMediaSource` may still appear — it is how stranded references keep resolving for whoever holds them.

- [ ] **Step 3: The round trip, against a running backend**

The check this plan exists for. With a real session:

1. Attach an image to a question's stem. Confirm the editor shows the student view with the image in place.
2. **Clear the browser's IndexedDB and site data, reload, reopen the question.** The image must still render. Under the old path it would vanish — this is the whole difference.
3. Open the same question in a different browser, signed in as a different console account. The image must render there too.
4. Sign in as a student for whom that question is published. The image must render in the stem.
5. Repeat 1–4 for an image on answer C and one on the explanation.

- [ ] **Step 4: Reuse and refusals**

1. Attach the same record to a second question. Confirm the usage panel shows both.
2. Replace the file everywhere; confirm both change and the count was stated first.
3. Re-point one of them at a different record; confirm the other is untouched.
4. Delete the record; confirm a 409 naming its users.
5. Upload the identical file again; confirm one stored file, a duplicate prompt, and no second copy on disk.

- [ ] **Step 5: Release gating and refusals**

1. A record with no alt text does not reach the student view, and the editor says which field is missing.
2. Upload a PDF renamed to `.png`; confirm **415**, and that nothing is written under `media/`.
3. Upload something over `MEDIA_MAX_BYTES`; confirm **413** and no staging file left behind.

- [ ] **Step 6: Write it up honestly**

Record each command, each status code, each screen. State plainly which checks were run and which were not. **Do not report this complete on the strength of the code alone** — the bug being fixed is precisely one where the code looked right and the student saw nothing.

- [ ] **Step 7: Commit**

```bash
git add docs/superpowers/plans/2026-08-21-media-library-verification.md
git commit -m "$(cat <<'EOF'
Record what the round trip actually did

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Deployment note

`MEDIA_MAX_BYTES` defaults to 20 MB and needs no configuration. Media shares
`RESOURCE_STORAGE_DIR`, so **no new volume or mount is required** — but the
existing volume now grows with every image, and its free space becomes worth
watching where it previously only moved when a textbook was added.

Nothing here is reachable until the role hierarchy's outstanding live checks
hold: every media route is behind `requireTab('resources')`, so a reviewer who
cannot reach that tab in production cannot upload. Run
`2026-08-21-admin-role-hierarchy-verification.md` §Outstanding first.
