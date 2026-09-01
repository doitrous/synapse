# Anki Import & Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a student import ready-made Anki decks (`.apkg`, `.colpkg`, CSV/text) into their flashcard collection and export decks back out (legacy `.apkg`, CSV/TSV/text), fully client-side.

**Architecture:** A client-side pipeline in `src/lib/anki/` (unzip → read SQLite → map to our note/card model → upload media → commit) writing through the existing `FlashcardCollection` persistence, plus two dialogs in `src/components/flashcards/`. Imported media is server-hosted via My Documents so it counts against the student's storage allowance and syncs across devices. Pure modules are unit-tested first (TDD); WASM-backed readers are tested against tiny real fixtures.

**Tech Stack:** React 19 + TypeScript + Vite; `fflate` (zip), `fzstd` (zstd decode), `sql.js` (SQLite WASM); Node native test runner (`node --test --experimental-strip-types`), oxlint.

**Spec:** `docs/superpowers/specs/2026-08-29-anki-import-export-design.md` (read it — this plan argues from it).

## Global Constraints

- **Test runner:** `npm test` = `node --test --experimental-strip-types "src/**/*.test.ts"`. Tests are colocated `*.test.ts` using `node:test` + `node:assert/strict`. Run a single file with `node --test --experimental-strip-types src/lib/anki/csvText.test.ts`.
- **Lint:** `npm run lint` (oxlint). **Typecheck/build:** `npm run build` (`tsc -b && vite build`). oxlint alone never typechecks — always run `tsc` too (memory: worktree-node-modules-empty).
- **Imports use explicit `.ts` extensions** (see existing `quickAdd.ts`: `from '../../data/flashcards/model.ts'`). Match this.
- **Field HTML must pass `sanitizeRich`** (`src/data/flashcards/richText.ts`) — do not store unsanitized Anki HTML on a note.
- **Never mutate an input `FlashcardCollection`** — return a new object (see `appendBasicNote`).
- **Media references:** IndexedDB = `synapse-media:<id>`; managed = `/media/<id>`; **new:** My-Documents = `synapse-doc:<id>`.
- **Worktree:** `node_modules` is a symlink to the main checkout — already created. After any dep change verify on disk with `git diff package.json` (memory: edit-overlay-vs-bash-disk).
- **Lazy-load the Anki module** from the dialogs via dynamic `import()` so sql.js/fzstd never enter the main bundle.
- **Commit** after each task with a `feat:`/`test:`/`chore:` message; end messages with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

---

### Task 0: Dependencies + sql.js wasm wiring

**Files:**
- Modify: `package.json` (add deps)
- Create: `src/lib/anki/sqljs.ts` (sql.js loader that locates the wasm locally)
- Create: `src/lib/anki/sqljs.test.ts`

**Interfaces:**
- Produces: `loadSqlJs(): Promise<SqlJsStatic>` — a memoized loader returning the initialized sql.js module; `openDb(bytes: Uint8Array): Promise<Database>` and `newDb(): Promise<Database>` convenience wrappers.

- [ ] **Step 1: Add dependencies.** Add to `package.json` dependencies: `"fflate": "^0.8.2"`, `"fzstd": "^0.1.1"`, `"sql.js": "^1.12.0"`, and devDependency `"@types/sql.js": "^1.4.9"`. Then install: `npm install` (lands in the shared node_modules). Verify: `node -e "require.resolve('fflate'); require.resolve('fzstd'); require.resolve('sql.js'); console.log('ok')"`.

- [ ] **Step 2: Vendor the wasm.** Copy `node_modules/sql.js/dist/sql-wasm.wasm` to `public/sql-wasm.wasm` so Vite serves it at `/sql-wasm.wasm` (no runtime CDN fetch — CSP-safe). `cp node_modules/sql.js/dist/sql-wasm.wasm public/sql-wasm.wasm`.

- [ ] **Step 3: Write the failing test** (`src/lib/anki/sqljs.test.ts`):

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newDb } from './sqljs.ts'

test('newDb creates a usable in-memory sqlite database', async () => {
  const db = await newDb()
  db.run('CREATE TABLE t (a INTEGER, b TEXT)')
  db.run("INSERT INTO t VALUES (1, 'x')")
  const rows = db.exec('SELECT a, b FROM t')
  assert.equal(rows[0].values[0][0], 1)
  assert.equal(rows[0].values[0][1], 'x')
  db.close()
})
```

- [ ] **Step 4: Run it, expect FAIL** (module missing): `node --test --experimental-strip-types src/lib/anki/sqljs.test.ts`.

- [ ] **Step 5: Implement `src/lib/anki/sqljs.ts`:**

```ts
import initSqlJs, { type Database, type SqlJsStatic } from 'sql.js'

let cached: Promise<SqlJsStatic> | null = null

/**
 * Load sql.js once. In the browser the wasm is served from /sql-wasm.wasm
 * (vendored into public/, no CDN — CSP-safe). Under Node's test runner
 * `locateFile` resolves the file from node_modules on disk.
 */
export function loadSqlJs(): Promise<SqlJsStatic> {
  if (!cached) {
    cached = initSqlJs({
      locateFile: (f: string) =>
        typeof window === 'undefined'
          ? new URL(`../../../node_modules/sql.js/dist/${f}`, import.meta.url).pathname
          : `/${f}`,
    })
  }
  return cached
}

export async function openDb(bytes: Uint8Array): Promise<Database> {
  const SQL = await loadSqlJs()
  return new SQL.Database(bytes)
}

export async function newDb(): Promise<Database> {
  const SQL = await loadSqlJs()
  return new SQL.Database()
}
```

- [ ] **Step 6: Run it, expect PASS.** If `locateFile` under Node can't find the wasm, adjust the relative path to the actual `node_modules/sql.js/dist/sql-wasm.wasm` on disk (the symlink resolves it).

- [ ] **Step 7: Commit.** `git add package.json package-lock.json public/sql-wasm.wasm src/lib/anki/sqljs.ts src/lib/anki/sqljs.test.ts && git commit -m "chore(anki): add fflate/fzstd/sql.js + wasm loader"` (+ Co-Authored-By trailer).

---

### Task 1: CSV/text importers (`csvText.ts`)

**Files:**
- Create: `src/lib/anki/csvText.ts`, `src/lib/anki/csvText.test.ts`
- Read for reuse: `src/data/decks.ts` (`parseCardLines`), `src/components/admin/ImportWizard.tsx` (`parseCsv`)

**Interfaces:**
- Produces:
```ts
export interface ParsedRow { front: string; back: string; tags: string[] }
export function parsePipeLines(text: string): ParsedRow[]
export function parseFrontBackTagsCsv(text: string): ParsedRow[]
export function parseAnkiCsv(text: string): ParsedRow[]
export type TextFormat = 'pipe' | 'csv' | 'anki'
export function detectTextFormat(text: string): TextFormat
```
- `front`/`back` are RAW strings (not yet HTML-escaped/sanitized); the mapper/commit stage handles safety.

- [ ] **Step 1: Write failing tests** (`csvText.test.ts`):

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parsePipeLines, parseFrontBackTagsCsv, parseAnkiCsv, detectTextFormat } from './csvText.ts'

test('parsePipeLines: one card per line, split on first pipe', () => {
  const rows = parsePipeLines('Q1 | A1\nQ2 | A2 | ignored-extra')
  assert.deepEqual(rows, [
    { front: 'Q1', back: 'A1', tags: [] },
    { front: 'Q2', back: 'A2 | ignored-extra', tags: [] },
  ])
})

test('parsePipeLines: blank lines skipped, a line with no pipe is front-only', () => {
  const rows = parsePipeLines('Solo\n\nQ | A')
  assert.deepEqual(rows, [
    { front: 'Solo', back: '', tags: [] },
    { front: 'Q', back: 'A', tags: [] },
  ])
})

test('parseFrontBackTagsCsv: header row maps front/back/tags, tags space-split', () => {
  const rows = parseFrontBackTagsCsv('front,back,tags\n"Hello, world",Hi,"tag1 tag2"')
  assert.deepEqual(rows, [{ front: 'Hello, world', back: 'Hi', tags: ['tag1', 'tag2'] }])
})

test('parseAnkiCsv: honors #separator:tab and #tags column, skips # comment lines', () => {
  const text = '#separator:tab\n#tags column:3\nFront\tBack\ttag-a tag-b'
  assert.deepEqual(parseAnkiCsv(text), [{ front: 'Front', back: 'Back', tags: ['tag-a', 'tag-b'] }])
})

test('detectTextFormat: #-headers => anki, comma header => csv, else pipe', () => {
  assert.equal(detectTextFormat('#separator:tab\nA\tB'), 'anki')
  assert.equal(detectTextFormat('front,back,tags\nA,B,'), 'csv')
  assert.equal(detectTextFormat('A | B'), 'pipe')
})
```

- [ ] **Step 2: Run, expect FAIL.**

- [ ] **Step 3: Implement `csvText.ts`.** Write a small RFC-4180 CSV/TSV splitter (quotes, embedded delimiters/newlines), plus the three parsers. For Anki: read leading `#key:value` lines (`separator` accepts `tab`/`comma`/`;`/a literal char, `tags column:N` 1-indexed, `html:true` passthrough). `separator:tab` → `\t`. `parsePipeLines` splits on the first `|` only. Reuse the tokenizing approach from `ImportWizard.tsx` `parseCsv` if convenient. Keep the delimiter-splitter as one internal `splitDelimited(text, delim)` helper used by both CSV parsers.

- [ ] **Step 4: Run, expect PASS.**

- [ ] **Step 5: Commit** `feat(anki): csv/tsv/pipe importers`.

---

### Task 2: Import commit layer (`importCommit.ts`)

**Files:**
- Create: `src/lib/flashcards/importCommit.ts`, `src/lib/flashcards/importCommit.test.ts`
- Read: `src/lib/flashcards/quickAdd.ts`, `src/data/flashcards/model.ts`

**Interfaces:**
- Consumes: `FlashcardCollection`, `DeckRecord`, `Note`, `CardMeta` from `model.ts`.
- Produces:
```ts
export interface ImportInput {
  decks: DeckRecord[]
  notes: Note[]
  meta?: Record<string, CardMeta>   // card id -> meta (preserve-schedule)
}
export function mergeImport(collection: FlashcardCollection, input: ImportInput): FlashcardCollection
```

- [ ] **Step 1: Write failing tests** (`importCommit.test.ts`):

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mergeImport } from './importCommit.ts'
import { EMPTY_COLLECTION, type BasicNote, type DeckRecord } from '../../data/flashcards/model.ts'

const deck: DeckRecord = { id: 'deck-1', name: 'Imported', createdAt: '2026-08-29T00:00:00.000Z' }
const note: BasicNote = {
  id: 'note-1', type: 'basic', deckId: 'deck-1', tags: ['anki'],
  createdAt: '2026-08-29T00:00:00.000Z', updatedAt: '2026-08-29T00:00:00.000Z',
  fields: { front: 'Q', back: 'A' },
}

test('mergeImport adds decks and notes without mutating the input collection', () => {
  const before = structuredClone(EMPTY_COLLECTION)
  const next = mergeImport(EMPTY_COLLECTION, { decks: [deck], notes: [note] })
  assert.deepEqual(EMPTY_COLLECTION, before)           // unchanged
  assert.equal(next.decks['deck-1'].name, 'Imported')
  assert.equal((next.notes['note-1'] as BasicNote).fields.front, 'Q')
  assert.deepEqual(next.notes['note-1'].tags, ['anki'])
})

test('mergeImport merges optional card meta by card id', () => {
  const meta = { 'note-1::card': { schedule: { state: 'review' } } } as any
  const next = mergeImport(EMPTY_COLLECTION, { decks: [deck], notes: [note], meta })
  assert.equal(next.meta['note-1::card'].schedule.state, 'review')
})
```

- [ ] **Step 2: Run, expect FAIL.**

- [ ] **Step 3: Implement** — spread `collection.decks`/`notes`/`meta`, add each incoming deck (keyed by id) and note (keyed by id), and merge `meta` entries when present. Return a fresh `{ version: 2, decks, notes, meta }`. Do not overwrite an existing id silently — if a colliding id is passed, the mapper is responsible for freshness, but guard by keeping incoming last-write and noting it's caller's contract.

- [ ] **Step 4: Run, expect PASS.**

- [ ] **Step 5: Commit** `feat(flashcards): bulk import commit (mergeImport)`.

---

### Task 3: Rich-text image support (shared)

**Files:**
- Modify: `src/data/flashcards/richText.ts` (`sanitizeRich` allowlist)
- Modify: `src/components/flashcards/RichField.tsx` and the study render path (`StudyScreen.tsx`) to resolve media-ref `<img src>` — mirror `OcclusionCardFace.tsx`'s resolve-and-revoke pattern
- Test: `src/data/flashcards/richText.test.ts` (extend existing)

**Interfaces:**
- Produces: `sanitizeRich` now preserves `<img>` iff `src` matches a media reference (`synapse-media:…`, `/media/…`, `synapse-doc:…`); allows `alt`, `width`, `height`; strips all other `<img>` and any other attributes.

- [ ] **Step 1: Read** `src/data/flashcards/richText.ts` to learn the current allowlist mechanism and `isStoredMediaReference` (`src/lib/mediaStorage.ts`) plus the `/^\/media\/[^/?#]+$/` matcher.

- [ ] **Step 2: Write failing tests** (extend `richText.test.ts`):

```ts
test('sanitizeRich keeps <img> with a nishany-doc media reference src', () => {
  const html = sanitizeRich('<img src="synapse-doc:med-1" alt="x" width="200">')
  assert.match(html, /<img[^>]+src="synapse-doc:med-1"/)
  assert.match(html, /alt="x"/)
})

test('sanitizeRich strips <img> with a remote or data src', () => {
  assert.doesNotMatch(sanitizeRich('<img src="https://evil/x.png">'), /<img/)
  assert.doesNotMatch(sanitizeRich('<img src="data:image/png;base64,AAAA">'), /<img/)
})
```

- [ ] **Step 3: Run, expect FAIL.**

- [ ] **Step 4: Implement** — add `img` to the tag allowlist with an attribute filter that keeps `src` only when it's a media reference (reuse `isStoredMediaReference` + the `/media/` matcher + a new `synapse-doc:` matcher), plus `alt`/`width`/`height`. Everything else about the sanitizer stays exactly as-is (regression-test the existing cases still pass: run the whole file).

- [ ] **Step 5: Update the render path** — in `RichField.tsx` / study render, after setting sanitized HTML, find `img[src^="synapse-"], img[src^="/media/"]`, resolve each via `resolveMediaSource`, set the resolved object URL, and revoke on unmount. Follow `OcclusionCardFace.tsx`. Add/adjust a component test if the file has one; otherwise verify via the integration task.

- [ ] **Step 6: Run tests + `tsc`, expect PASS.**

- [ ] **Step 7: Commit** `feat(flashcards): render media-reference images in rich text`.

---

### Task 4: Anki container reader (`container.ts`)

**Files:**
- Create: `src/lib/anki/container.ts`, `src/lib/anki/container.test.ts`
- Create fixtures: `src/lib/anki/__fixtures__/legacy.apkg`, `modern.apkg`, `collection.colpkg` (tiny; a few notes + 1 small image)

**Interfaces:**
- Consumes: fflate, fzstd.
- Produces:
```ts
export interface AnkiMediaEntry { ankiName: string; bytes: Uint8Array }
export interface AnkiContainer { sqlite: Uint8Array; media: AnkiMediaEntry[]; format: 'legacy' | 'modern' }
export async function readAnkiPackage(file: ArrayBuffer): Promise<AnkiContainer>
```

- [ ] **Step 1: Build fixtures.** Use a scratch Node script with `genanki`-style raw sqlite, OR simpler: create them with the real Anki app is not available — instead build minimal fixtures programmatically in a `scripts/anki/make-fixtures.mjs`: (a) legacy = zip of a `collection.anki2` sqlite (built with sql.js) + `media` = `{"0":"a.png"}` + a file `0`; (b) modern = same sqlite zstd-compressed as `collection.anki21b` + a decoy `collection.anki2` (one-row warning) + protobuf-ish media map; (c) colpkg = same as modern. Keep each < 20 KB. Commit fixtures + the generator.

- [ ] **Step 2: Write failing tests** — for each fixture: `readAnkiPackage(buf)` returns a non-empty `sqlite`, the right `format`, and one media entry named `a.png` with non-empty bytes. Assert the decoy `collection.anki2` in the modern fixture is NOT chosen (the returned sqlite must be the real one — check a sentinel table/row present only in the real DB).

- [ ] **Step 3: Run, expect FAIL.**

- [ ] **Step 4: Implement** — `unzipSync` (fflate) the archive; pick DB entry by priority `collection.anki21b` (→ `fzstd.decompress`) > `collection.anki21` > `collection.anki2`; when a `.anki21b`/`.anki21` exists, treat `collection.anki2` as a decoy. Media: if a `media` text entry parses as JSON → legacy numbered map; else decode the protobuf map with a minimal varint reader (`readVarint`, fields: `1`=index/uint, `2`=name/string). Map numbered zip entries to `ankiName`; in modern format media bytes may be zstd-framed — decompress if the zstd magic `0x28 0xB5 0x2F 0xFD` is present. Return entries.

- [ ] **Step 5: Run, expect PASS.**

- [ ] **Step 6: Commit** `feat(anki): unzip .apkg/.colpkg with legacy+modern detection`.

---

### Task 5: Anki DB reader (`ankiDb.ts`)

**Files:**
- Create: `src/lib/anki/ankiDb.ts`, `src/lib/anki/ankiDb.test.ts`
- Read for reuse: `src/lib/anki/sqljs.ts`

**Interfaces:**
- Consumes: `openDb` from `sqljs.ts`; `AnkiContainer.sqlite`.
- Produces:
```ts
export interface AnkiField { name: string; ord: number }
export interface AnkiTemplate { name: string; ord: number; qfmt: string; afmt: string }
export interface AnkiModel { id: string; name: string; type: 0 | 1; fields: AnkiField[]; templates: AnkiTemplate[] }
export interface AnkiDeck { id: string; name: string }
export interface AnkiNote { id: number; mid: string; tags: string[]; fields: string[] }
export interface AnkiCard { id: number; nid: number; did: string; ord: number; type: number; queue: number; due: number; ivl: number; factor: number; reps: number; lapses: number }
export interface AnkiPackage { models: Record<string, AnkiModel>; decks: Record<string, AnkiDeck>; notes: AnkiNote[]; cards: AnkiCard[] }
export async function readAnkiDb(sqlite: Uint8Array): Promise<AnkiPackage>
```

- [ ] **Step 1: Write failing test** — open the Task 4 legacy fixture's sqlite (import `readAnkiPackage` on the fixture, feed `.sqlite`), assert models/decks parsed, `notes.length` matches the fixture, and `notes[0].fields` is the `\x1f`-split array.

- [ ] **Step 2: Run, expect FAIL.**

- [ ] **Step 3: Implement** — open with sql.js. Read `col` row: `models` and `decks` are JSON TEXT in schema v11; if empty, fall back to the newer `notetypes`/`fields`/`templates`/`decks` tables (schema ≥18). Normalize both into `AnkiModel`/`AnkiDeck`. Read `notes` (`id,mid,tags,flds`; split `flds` on `\x1f`; tags space-split/trim). Read `cards` columns. Close the db.

- [ ] **Step 4: Run, expect PASS.**

- [ ] **Step 5: Commit** `feat(anki): read collection db (notes/cards/models/decks)`.

---

### Task 6: Mapper + schedule mapping (`mapper.ts`)

**Files:**
- Create: `src/lib/anki/mapper.ts`, `src/lib/anki/mapper.test.ts`
- Read: `src/data/flashcards/model.ts`, `src/data/flashcards/cloze.ts`, `src/data/srs.ts` (`CardSchedule` shape), `src/data/flashcards/richText.ts`

**Interfaces:**
- Consumes: `AnkiPackage` (Task 5), `Note`/`DeckRecord`/`CardMeta` (model.ts).
- Produces:
```ts
export interface ImportReport { decks: number; notes: number; cards: number; mediaRefs: number; approximations: string[] }
export interface MappedImport {
  decks: DeckRecord[]; notes: Note[]; meta?: Record<string, CardMeta>
  mediaRefsNeeded: string[]; report: ImportReport
}
export function mapAnkiPackage(pkg: AnkiPackage, opts: { preserveSchedule: boolean; now: Date; idFactory: () => string }): MappedImport
```

- [ ] **Step 1: Write failing tests** — build a small in-memory `AnkiPackage` (one standard 2-field model + note → BasicNote front/back; one cloze model + `{{c1::x}}` note → ClozeNote with text preserved; tags carried; a custom 4-field model → best-effort Basic + an `approximations` entry). With `preserveSchedule:true`, assert `meta['<noteId>::card']` exists and its schedule reflects the Anki card's `ivl`. Assert `mediaRefsNeeded` collects a `<img src="a.png">` from a field.

- [ ] **Step 2: Run, expect FAIL.**

- [ ] **Step 3: Implement.** For each note: resolve its model; `type===1` → ClozeNote (`text` = the cloze-bearing field, `extra` = a field named `Extra`/`Back Extra` if present, else ''); standard → BasicNote (front from fields referenced by template[0].qfmt `{{Field}}`, back from afmt, resolving `{{FrontSide}}`; if resolution is trivial use field[0]/field[1]). Unknown/complex → BasicNote from first template render + push a human string into `report.approximations`. Preserve `tags`. Flatten deck names. Collect media tokens (`<img src>`, `[sound:]`) into `mediaRefsNeeded` (leave tokens in field text for Task 8). Sanitize each field with `sanitizeRich` AFTER media rewrite happens in Task 8 — so here, store raw field HTML but DO run a `sanitizeRich` pass that now tolerates media-ref `<img>` (Task 3). Generate fresh note ids via `idFactory`. When `preserveSchedule`, map each card: build a `CardSchedule` (read `srs.ts`) from `ivl`(days)/`factor`(ease/1000)/`reps`/`queue` and wrap in a `CardMeta` (use `newCardMeta` then overwrite schedule + `reviewCount = reps`). Card id = `` `${noteId}::${templateKey}` `` (`'card'` for basic, `` `c${n}` `` for cloze).

- [ ] **Step 4: Run, expect PASS.**

- [ ] **Step 5: Commit** `feat(anki): map anki notes/cards to flashcard model`.

---

### Task 7: My-Documents media reference + server raw endpoint

**Files:**
- Modify: `src/lib/mediaStorage.ts` (`resolveMediaSource` + a `docMediaReference(id)` helper + `synapse-doc:` matcher)
- Verify/Modify: `server/src/index.js` — ensure a raw-bytes GET for a `user_documents` file exists (e.g. `GET /api/my-documents/:id/raw`); add if only metadata/list exists
- Test: `src/lib/mediaStorage.test.ts` (extend)

**Interfaces:**
- Produces: `docMediaReference(id: string): string` → `` `synapse-doc:${id}` ``; `resolveMediaSource('synapse-doc:<id>')` fetches the raw bytes (authenticated `apiFetchBlob`) → object URL `{ url, revoke: true }`.

- [ ] **Step 1: Read** `src/lib/mediaStorage.ts` (`resolveMediaSource`, `isStoredMediaReference`, the `/media/` branch and `apiFetchBlob`), and grep `server/src/index.js` for `my-documents` routes to find the raw-serve path.

- [ ] **Step 2: Write failing test** — `docMediaReference('med-1') === 'synapse-doc:med-1'`; and (unit) that `resolveMediaSource` routes a `synapse-doc:` ref to the documents raw endpoint (inject/stub the fetch as the existing tests do for `/media/`).

- [ ] **Step 3: Run, expect FAIL.**

- [ ] **Step 4: Implement client** — add the `synapse-doc:` matcher + `docMediaReference`; in `resolveMediaSource`, when API_MODE and ref starts `synapse-doc:`, `apiFetchBlob('/my-documents/<id>/raw')` → object URL. **Implement server** — if no raw route exists, add `GET /api/my-documents/:id/raw` (`requireAuthenticated`, scoped to `user_id = req.identity.id`, streams the stored file by `storage_key`), mirroring how `/api/media/:id` streams.

- [ ] **Step 5: Run tests + tsc, expect PASS.** (Server route: smoke via the integration task.)

- [ ] **Step 6: Commit** `feat(media): resolve my-documents-hosted media (nishany-doc refs)`.

---

### Task 8: Media materialization (`media.ts`)

**Files:**
- Create: `src/lib/anki/media.ts`, `src/lib/anki/media.test.ts`
- Read: `src/lib/useMyDocuments.ts` (`upload` signature), `src/lib/mediaStorage.ts` (`docMediaReference`)

**Interfaces:**
- Consumes: `MappedImport` (Task 6), `AnkiContainer` (Task 4), `docMediaReference` (Task 7); an injected `uploadDoc` matching `useMyDocuments().upload`.
- Produces:
```ts
export async function materializeMedia(
  mapped: MappedImport, container: AnkiContainer,
  uploadDoc: (file: File, onProgress?: (f: number) => void, source?: { kind: 'resource'; id?: string }) => Promise<string>,
  onProgress?: (done: number, total: number) => void,
): Promise<{ notes: Note[]; report: ImportReport }>
```

- [ ] **Step 1: Write failing test** — a `MappedImport` with a BasicNote whose front is `<img src="a.png">` and `mediaRefsNeeded:['a.png']`, a container with media entry `a.png`. Inject a fake `uploadDoc` that returns `'med-xyz'`. Assert the returned note's front is `<img src="synapse-doc:med-xyz">` and `uploadDoc` was called once with a `File` named `a.png`.

- [ ] **Step 2: Run, expect FAIL.**

- [ ] **Step 3: Implement** — for each `mediaRefsNeeded` name found in the container, build `new File([bytes], ankiName, { type: guessMime(ankiName) })`, `await uploadDoc(file, …, { kind: 'resource' })` → id → `docMediaReference(id)`. Rewrite across all notes' field strings: `<img src="ankiName">` → the doc ref; `[sound:ankiName]` → set `fields.audio` = doc ref on Basic/Cloze (first only; extras → `report.approximations`). De-dupe uploads by ankiName. Update `report.mediaRefs`. (Note: `File` exists in Node ≥20 global.)

- [ ] **Step 4: Run, expect PASS.**

- [ ] **Step 5: Commit** `feat(anki): upload imported media to my-documents and rewrite refs`.

---

### Task 9: Text/CSV export (`exportText.ts`)

**Files:**
- Create: `src/lib/anki/exportText.ts`, `src/lib/anki/exportText.test.ts`
- Read: `src/data/flashcards/model.ts`, `src/data/flashcards/richText.ts` (a `stripToText` helper if present, else strip tags)

**Interfaces:**
- Produces:
```ts
export function exportDecksToText(collection: FlashcardCollection, deckIds: string[], format: 'anki-tsv' | 'csv' | 'pipe'): string
```

- [ ] **Step 1: Write failing tests** — a collection with 2 basic notes in one deck: `pipe` → `Q1 | A1\nQ2 | A2`; `csv` → `front,back,tags\n...` with quoting; `anki-tsv` → `#separator:tab\n#html:true\n` header then `front\tback\ttags`. Cloze notes export their source text as the front.

- [ ] **Step 2: Run, expect FAIL.**

- [ ] **Step 3: Implement** — filter notes by `deckIds`; per note derive `{front, back, tags}` (basic: fields; cloze: `text`/`extra`); serialize per format (CSV with RFC-4180 quoting, tags space-joined). `anki-tsv` keeps HTML (`#html:true`); `pipe`/`csv` strip to text.

- [ ] **Step 4: Run, expect PASS.**

- [ ] **Step 5: Commit** `feat(anki): export decks to csv/tsv/text`.

---

### Task 10: Legacy `.apkg` export (`exportApkg.ts`)

**Files:**
- Create: `src/lib/anki/exportApkg.ts`, `src/lib/anki/exportApkg.test.ts`
- Read: `src/lib/anki/sqljs.ts` (`newDb`), fflate `zipSync`

**Interfaces:**
- Produces:
```ts
export async function exportDecksToApkg(
  collection: FlashcardCollection, deckIds: string[],
  fetchMedia: (ref: string) => Promise<{ name: string; bytes: Uint8Array } | null>,
): Promise<Blob>
```

- [ ] **Step 1: Write failing round-trip test** — export a small collection (basic + cloze + tags) to a `.apkg` Blob → feed its bytes back through `readAnkiPackage` + `readAnkiDb` + `mapAnkiPackage` → assert note count, fronts, and tags survive.

- [ ] **Step 2: Run, expect FAIL.**

- [ ] **Step 3: Implement** — build a legacy `collection.anki2` with `newDb()`: create the v11 schema (`col`, `notes`, `cards`, `graves`, `revlog`), insert a `col` row with two note types in the `models` JSON (a Basic `{{Front}}/{{Back}}` and a Cloze), one `decks` JSON entry per exported deck, and `notes`/`cards` rows (fields joined by `\x1f`, cards `ord`/`due`/`ivl` defaulted). Export the db bytes (`db.export()`). Collect media refs from note fields, `fetchMedia` each → numbered entries + `media` JSON. `zipSync` (fflate) → `Blob([...], {type:'application/octet-stream'})`. Reference the Anki schema from the spec's sources.

- [ ] **Step 4: Run, expect PASS.**

- [ ] **Step 5: Commit** `feat(anki): export decks to legacy .apkg`.

---

### Task 11: Import dialog UI

**Files:**
- Create: `src/components/flashcards/ImportDeckDialog.tsx`
- Modify: `src/components/flashcards/AddView.tsx` (or `Flashcards.tsx`) to add an "Import deck" entry point
- Read: `src/components/admin/ImportWizard.tsx` (pattern), `src/lib/useFlashcards.ts`, `src/lib/useMyDocuments.ts`

**Interfaces:**
- Consumes: `readAnkiPackage`, `readAnkiDb`, `mapAnkiPackage`, `materializeMedia`, `mergeImport`, `csvText` parsers — all via a dynamic `import('../../lib/anki/…')` so they stay out of the main bundle; `useMyDocuments().upload`; the collection setter used by `useFlashcards`.

- [ ] **Step 1: Build the dialog** — file drop/select (`accept=".apkg,.colpkg,.csv,.txt,.tsv"`); detect by extension; options: target deck (new name / existing) and a **Start fresh vs Preserve due dates & ease** toggle; a **Preview** step showing `ImportReport` counts + approximations; a **Commit** step with progress (parse → media N/M → write). On commit: run the pipeline, `mergeImport` into the collection, persist via the flashcards hook. Pre-check quota (`quotaBytes - usedBytes`) before uploading media and warn/stop with a clear message if the deck's media would exceed it.

- [ ] **Step 2: Wire the entry point** in `AddView.tsx`/`Flashcards.tsx`.

- [ ] **Step 3: Verify** — lib-level pipeline is already unit-tested; drive the dialog with a synthetic `File` in a component test if practical (note: in-app browser can't inject uploads — see `FLASHCARDS-HANDOFF.md`). Run `tsc` + lint.

- [ ] **Step 4: Commit** `feat(flashcards): import deck dialog`.

---

### Task 12: Export dialog UI

**Files:**
- Create: `src/components/flashcards/ExportDeckDialog.tsx`
- Modify: Decks view (`DeckDashboard.tsx`/`DeckList.tsx`) to add an "Export" action
- Read: `src/lib/anki/exportApkg.ts`, `exportText.ts`, `src/lib/mediaStorage.ts` (`resolveMediaSource` to fetch media bytes for export)

**Interfaces:**
- Consumes: `exportDecksToApkg`, `exportDecksToText` (dynamic import); a `fetchMedia(ref)` built on `resolveMediaSource` (fetch the object URL → `arrayBuffer`).

- [ ] **Step 1: Build the dialog** — pick deck(s) + format (`.apkg` / Anki TSV / CSV / text) → build → trigger download (`URL.createObjectURL` + `<a download>`; filename from deck name). For `.apkg`, supply `fetchMedia` that resolves each media ref to bytes.

- [ ] **Step 2: Wire the entry point** in the Decks view.

- [ ] **Step 3: Verify** — `tsc` + lint; export path exercised by Task 10's round-trip test.

- [ ] **Step 4: Commit** `feat(flashcards): export deck dialog`.

---

### Task 13: Integration, typecheck, lint, smoke

**Files:**
- Create: `src/lib/anki/roundtrip.test.ts` (end-to-end at the lib layer)

- [ ] **Step 1: End-to-end test** — take each `__fixtures__` package → full import pipeline with a fake `uploadDoc` → `mergeImport` → assert deck/note/card counts and that a media-bearing note ends with a `synapse-doc:` ref. Then export the resulting decks to `.apkg` and re-import → counts stable.
- [ ] **Step 2: Run full suite** `npm test`; fix failures.
- [ ] **Step 3: `npm run build`** (tsc + vite) — resolve any type/bundle errors; confirm the Anki module is dynamically imported (not in the main chunk).
- [ ] **Step 4: `npm run lint`.**
- [ ] **Step 5: Browser smoke** (preview) — open the flashcard page, confirm the Import/Export entry points render and the dialogs open. (File-upload injection is limited in the in-app browser; verify UI presence + a text-paste import path if feasible.)
- [ ] **Step 6: Commit** `test(anki): end-to-end import/export round-trip`.

---

## Self-Review

- **Spec coverage:** container/ankiDb/mapper/media/csvText/commit/exportText/exportApkg/richtext/mediaStorage/UI all map to spec §5.1–5.10; formats (§1), non-goals (§2), mapping table (§7), sequencing (§9), risks (§10) each have a home. ✅
- **Placeholder scan:** no TBD/"handle edge cases" — each task has concrete tests + implementation direction. Heavy WASM tasks direct the agent to exact files to read rather than hand-waving. ✅
- **Type consistency:** `MappedImport`, `AnkiContainer`, `AnkiPackage`, `ImportReport`, `docMediaReference`, `synapse-doc:` used consistently across Tasks 4–12. ✅
- **Media ref:** minted only in Task 7 (`docMediaReference`), consumed in 8/3/12. ✅
```
