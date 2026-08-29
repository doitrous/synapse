# Anki deck import & export for the student flashcard page

**Date:** 2026-08-29
**Status:** Design approved (brainstorming), pending spec review → plan → build
**Owner:** orchestrator session; implementation fanned out to Sonnet subagents

---

## 1. Goal

Let a student **import** ready-made Anki decks into their personal flashcard
collection, and **export** their decks back out, from the flashcard page
(`src/pages/student/Flashcards.tsx`).

Import formats:
- `.apkg` — legacy (`collection.anki2`, plain SQLite) **and** modern 2.1.50+
  (`collection.anki21b`, zstd-compressed; decoy `collection.anki2` ignored).
- `.colpkg` — whole-collection export; same container as modern `.apkg`.
- CSV / text — three shapes: Anki CSV/TSV export, `front,back,tags` CSV with
  header, and simple `front | back` per line.

Export formats:
- `.apkg` — **legacy** container (plain `collection.anki2` SQLite + media);
  reimports cleanly into current Anki.
- Anki TSV, `front,back,tags` CSV, and simple `front | back` text.

Everything runs **client-side**. The importer produces a `FlashcardCollection`
(v2) object and commits it through the existing persistence path, so imported
decks sync to the cloud in live mode automatically. Imported **media** is
server-hosted through **My Documents** so it counts against the student's
Resources storage allowance and syncs across devices.

## 2. Non-goals (v1)

- **Generating modern zstd `.colpkg`/`.anki21b` on export.** Legacy `.apkg`
  reimports fine into current Anki; the extra zstd+protobuf authoring is not
  worth it. Import still fully supports the modern format.
- **Full-fidelity exotic note types.** Custom multi-field / multi-template note
  types and Image Occlusion import **best-effort** (see §7). Not reproduced
  natively.
- **Preserving the full Anki review-history audit trail** (`revlog` → every
  `ReviewEvent`). The optional "preserve scheduling" mode maps *current card
  state* (due date, ease/stability, reps) into `CardMeta`, not the entire log.
- **Syncing PDF annotations / other study surfaces across devices.** The user
  raised this as a broader ambition; it is a **separate follow-up feature**
  touching different code. Out of scope here. (Flashcard collection + imported
  media already sync via this work.)

## 3. Architecture

A client-side pipeline under a new `src/lib/anki/` module, plus a commit layer
in `src/lib/flashcards/`, plus two UI surfaces in `src/components/flashcards/`.
No new card/SQL backend: card data rides the existing state-sync path.

```
File (.apkg/.colpkg/.csv/.txt)
   │
   ▼
[container]  unzip (fflate) → detect legacy vs modern → zstd-decompress
   │          (fzstd) → yield { sqliteBytes, mediaEntries }
   ▼
[ankiDb]     sql.js → read col/notes/cards/revlog → typed AnkiPackage
   │
   ▼
[mapper]     AnkiPackage → { decks, notes, meta? } in our model
   │           (Basic/Cloze/best-effort; tags; cloze 1:1; media placeholders)
   ▼
[media]      upload each referenced asset via useMyDocuments → get doc refs
   │           → rewrite field HTML `<img>` / `[sound:]` → media references
   ▼
[commit]     merge decks+notes+meta into FlashcardCollection → persist
             (FLASHCARDS_COLLECTION_KEY, demo + live)

CSV/text import skips container/ankiDb: [csvText] → mapper output → commit.

Export: [collection selection] → [exportApkg] (sql.js build + fflate zip
             + media fetch) or [exportText] (CSV/TSV/text serialize) → download.
```

## 4. New dependencies

Add to `package.json` (all pure-JS / WASM, browser-friendly):
- **`fflate`** — zip read + write (import unzip, export zip). Also inflates the
  legacy `collection.anki2` zip entry.
- **`fzstd`** — zstd decompress (modern `collection.anki21b`). Decompress-only;
  export never needs zstd.
- **`sql.js`** — SQLite compiled to WASM; reads the Anki collection DB and
  builds the export DB. Ships a `.wasm` asset — must be bundled/served by Vite
  (locate the wasm via `locateFile`, vendored into `public/` or imported as a
  URL asset). No network fetch of the wasm at runtime.

> Worktree note: `node_modules` starts empty in a worktree — symlink to the
> main checkout before typechecking (see memory `worktree-node-modules-empty`).
> After adding deps, verify on disk with `git diff package.json` (memory
> `edit-overlay-vs-bash-disk`).

The modern media map is protobuf. **Do not add a protobuf library** — hand-write
a minimal varint reader for the one message shape (`repeated {uint32 index=1;
string name=2}` style). Scoped inside `container`.

## 5. Module breakdown (the build contract)

All new modules are pure where possible, each with a colocated `.test.ts`
(the flashcard codebase's TDD norm). Signatures below are the contract; a
subagent may refine names but must keep the boundaries.

### 5.1 `src/lib/anki/container.ts`
Unzip and normalize any Anki package to raw SQLite + media list.
```ts
export interface AnkiMediaEntry { ankiName: string; bytes: Uint8Array }
export interface AnkiContainer { sqlite: Uint8Array; media: AnkiMediaEntry[] }
export async function readAnkiPackage(file: ArrayBuffer): Promise<AnkiContainer>
```
- Unzip with fflate.
- Choose DB entry: prefer `collection.anki21b` (zstd → decompress) →
  `collection.anki21` → `collection.anki2`. Detect and reject the decoy
  `collection.anki2` (contains only a warning row) when a `.anki21b` exists.
- Media: legacy `media` JSON (`{"0":"img.png"}`) maps numbered entries; modern
  media map is a zstd-compressed protobuf — decode with the minimal reader.
- Depends on: fflate, fzstd.

### 5.2 `src/lib/anki/ankiDb.ts`
Read the collection DB into typed rows.
```ts
export interface AnkiPackage {
  models: Record<string, AnkiModel>   // notetypes: fields[], templates[], type (0 std / 1 cloze)
  decks: Record<string, AnkiDeck>     // id → name (name uses '::' for hierarchy)
  notes: AnkiNote[]                   // { id, mid, tags[], fields[] (flds split on 0x1f) }
  cards: AnkiCard[]                   // { id, nid, did, ord, due, ivl, factor, reps, lapses, queue, type }
}
export function readAnkiDb(sqlite: Uint8Array): AnkiPackage
```
- sql.js opens the bytes; read `col` (parse `models`/`decks` JSON — both the
  old col-JSON layout and the newer `notetypes`/`decks` tables in schema ≥18),
  `notes`, `cards`. Split `notes.flds` on `\x1f`.
- Depends on: sql.js.

### 5.3 `src/lib/anki/mapper.ts`
Pure transform: Anki rows → our model (no I/O, no media upload yet).
```ts
export interface MappedImport {
  decks: DeckRecord[]
  notes: Note[]                       // fields still carry Anki media tokens
  meta?: Record<string, CardMeta>     // present only when preserveSchedule
  mediaRefsNeeded: string[]           // Anki media names referenced by kept notes
  report: ImportReport                // counts, approximations, skips
}
export function mapAnkiPackage(pkg: AnkiPackage, opts: {
  preserveSchedule: boolean
  now: Date
  idFactory: () => string
}): MappedImport
```
- Note-type detection: model `type===1` → **Cloze** (`text`/`extra` from the
  cloze + extra fields; native `{{c1::…::hint}}` preserved almost 1:1). Standard
  Basic-like model → **Basic** (front = first template's question fields, back =
  answer fields, resolving `{{Field}}` from the note). Unknown/custom → best-effort
  Basic from first template's rendered front/back.
- Preserve **tags** on every note (Anki space-separated tags → `tags[]`).
- Deck hierarchy: Anki `A::B::C` → flattened deck name (kept as-is; we have no
  nested decks). Record `report` when flattening.
- Media tokens (`<img src="x">`, `[sound:x]`) are left in place; `mediaRefsNeeded`
  lists them for the media stage.
- `preserveSchedule` → map card `due/ivl/factor/reps/lapses/queue` → `CardMeta`
  via a documented mapping (read `src/data/srs.ts` `CardSchedule` first). Else
  omit `meta` (fresh cards materialize lazily on read).
- Depends on: model.ts, cloze.ts, srs.ts (read for shape).

### 5.4 `src/lib/anki/media.ts`
Upload referenced media and rewrite note fields to media references.
```ts
export async function materializeMedia(
  mapped: MappedImport,
  container: AnkiContainer,
  uploadDoc: (file: File, onProgress?: (f: number) => void,
    source?: { kind: 'resource'; id?: string }) => Promise<string>,
  onProgress?: (done: number, total: number) => void,
): Promise<{ notes: Note[]; report: ImportReport }>
```
- For each needed asset: build a `File` from `AnkiMediaEntry.bytes`, upload via
  the injected `uploadDoc` (the `useMyDocuments().upload` fn) with
  `source:{kind:'resource'}`, receive the doc id.
- Rewrite: `<img src="ankiName">` → `<img src="<mediaRef>">`; `[sound:ankiName]`
  → set note `fields.audio` (first) / report extras. `<mediaRef>` is the new
  My-Documents media reference form (see §6).
- Injecting `uploadDoc` keeps this module pure-ish and testable with a fake.

### 5.5 `src/lib/anki/csvText.ts`
The three text importers → mapper-shaped output (no media).
```ts
export function parseAnkiCsv(text: string): ParsedRows      // #separator/#html/#tags headers
export function parseFrontBackTagsCsv(text: string): ParsedRows
export function parsePipeLines(text: string): ParsedRows     // reuse decks.ts parseCardLines idea
export function rowsToNotes(rows: ParsedRows, opts): { decks; notes; report }
```
- Reuse existing `parseCsv` (ImportWizard) and `parseCardLines` (`src/data/decks.ts`).

### 5.6 `src/lib/flashcards/importCommit.ts`
Merge a mapped+materialized import into the collection (pure).
```ts
export function mergeImport(
  collection: FlashcardCollection,
  input: { decks: DeckRecord[]; notes: Note[]; meta?: Record<string, CardMeta> },
): FlashcardCollection
```
- Append decks + notes (fresh ids from mapper, collision-checked), merge
  optional `meta` by card id. Never mutate input. This is the bulk sibling of
  `quickAdd.ts` `appendBasicNote`; the wizard persists the result via
  `usePersistentState(FLASHCARDS_COLLECTION_KEY, …)`.

### 5.7 `src/lib/anki/exportApkg.ts` and `exportText.ts`
```ts
export async function exportDecksToApkg(
  collection: FlashcardCollection, deckIds: string[],
  fetchMedia: (ref: string) => Promise<{ name: string; bytes: Uint8Array } | null>,
): Promise<Blob>                       // legacy .apkg
export function exportDecksToText(
  collection: FlashcardCollection, deckIds: string[],
  format: 'anki-tsv' | 'csv' | 'pipe',
): string
```
- `exportApkg`: build a legacy `collection.anki2` with sql.js (minimal Basic +
  Cloze note types, decks, notes, cards, `col`), collect media via `fetchMedia`
  (resolve our refs → bytes), write `media` JSON, zip with fflate.
- Depends on: sql.js, fflate.

### 5.8 Rich-text image support (shared; careful — touches authoring)
`src/data/flashcards/richText.ts` + render path.
- Extend `sanitizeRich` allowlist to permit `<img>` **only** when `src` is a
  recognized media reference (`synapse-media:…`, `/media/…`, or the new
  My-Documents ref form). Allow `width`/`height`/`alt`; strip everything else.
  Any other `<img>` (remote URL, `data:`, script vectors) is dropped.
- Teach the study/render components (`RichField.tsx`, `StudyScreen.tsx` render
  path) to resolve media-reference `src` via `resolveMediaSource` (object URL,
  revoke on unmount) — mirrors `OcclusionCardFace.tsx`.
- This is what lets image-bearing Basic/Cloze imports actually display.

### 5.9 `src/lib/mediaStorage.ts` — resolve My-Documents media
- Add a reference form for My-Documents-hosted media and teach
  `resolveMediaSource` to fetch its bytes (authenticated) into an object URL.
  Confirm the raw-bytes GET endpoint for `user_documents` in
  `server/src/index.js`; add one if only a metadata/list route exists.

### 5.10 UI
`src/components/flashcards/ImportDeckDialog.tsx` and `ExportDeckDialog.tsx`,
entered from the Decks view / `AddView.tsx`, mirroring `ImportWizard.tsx`:
- Import: drop/select file → auto-detect format → options (target deck new/existing,
  **Start fresh vs Preserve due dates & ease**) → preview counts + report →
  commit with progress (parse, media upload N/M, write).
- Export: pick decks + format → build → download (`URL.createObjectURL`).

## 6. Media reference form

My-Documents media needs a reference string distinct from `synapse-media:`
(IndexedDB) and `/media/<id>` (managed). Proposed: **`synapse-doc:<id>`**,
resolved by `resolveMediaSource` → authenticated fetch of the user_document's
raw bytes → object URL. Chosen because it is unambiguous, and it survives sync
(the doc id is server-issued and per-user). The final token string is an
implementation detail the `mediaStorage` task fixes and the `media`/render tasks
consume.

## 7. Data mapping rules (reference)

| Anki | Ours |
|---|---|
| notetype `type=1` (cloze) | `ClozeNote` — `text` = cloze field, `extra` = Extra field; `{{c1::…}}` kept |
| standard notetype, 2 fields | `BasicNote` — front/back from first template's `{{Q}}`/`{{A}}` resolved against fields |
| standard, >2 fields / custom | best-effort `BasicNote` (first template rendered), **report** approximation |
| Image Occlusion notetype | best-effort: plain image `BasicNote` (image on front, labels on back), **report** — not native occlusion |
| multi-template note (N cards) | keep first template as one Basic note, **report** dropped templates |
| `tags` (space-sep) | `tags[]` — always preserved |
| deck `A::B` | flattened deck name `A::B`, **report** |
| `<img src=x>` / `[sound:x]` | media upload → `synapse-doc:` ref (img) / `fields.audio` (first sound) |
| card due/ivl/factor/reps | `CardMeta.schedule` **iff** preserveSchedule, else fresh |

`ImportReport` surfaces to the student: decks/notes/cards imported, media
uploaded, and a list of approximations/skips (e.g. "12 Image-Occlusion notes
imported as image cards", "3 custom note types simplified").

## 8. Testing strategy (TDD)

- Pure modules (`mapper`, `csvText`, `importCommit`, `exportText`, protobuf
  reader, schedule mapping) — unit tests first, table-driven, with small
  hand-built fixtures. No real Anki file needed for these.
- `container` / `ankiDb` — a couple of tiny real fixtures: one legacy `.apkg`,
  one modern `.apkg`, one `.colpkg` (checked into `src/lib/anki/__fixtures__/`,
  kept small — a few notes, one image). Golden-output assertions on the mapped
  result.
- `media` — injected fake `uploadDoc`; assert rewrite + upload calls.
- `exportApkg` — round-trip: export a collection, re-import it, assert notes/
  cards/tags survive (import↔export are mutually reinforcing tests).
- UI — component tests where practical; note `FLASHCARDS-HANDOFF.md` warns the
  in-app browser can't inject file uploads, so verify parsing at the lib layer
  and drive the dialog with a synthetic `File`.

## 9. Build decomposition & sequencing (for the Sonnet fleet)

Dependency order (→ = depends on). Modules on the same line are parallelizable.

1. **Foundation (parallel):**
   - A. deps + Vite wasm wiring (`fflate`, `fzstd`, `sql.js`)
   - B. `csvText.ts` (+tests) — no deps on A
   - C. `importCommit.ts` (+tests) — pure, no deps
   - D. rich-text image support §5.8 (+tests) — shared, isolate early
2. **Anki read (after A):** E. `container.ts` → F. `ankiDb.ts`
3. **Mapping (after F):** G. `mapper.ts` (+tests) incl. schedule mapping
4. **Media (after B/C/D + `useMyDocuments`):** H. `mediaStorage` §5.9 →
   I. `media.ts`
5. **Export (after A, D):** J. `exportText.ts` ∥ K. `exportApkg.ts`
6. **UI (after G, I, C, J/K):** L. `ImportDeckDialog` ∥ M. `ExportDeckDialog`,
   wired into `Flashcards.tsx` / `AddView.tsx`
7. **Integration & verify:** N. end-to-end round-trip test + typecheck/lint +
   browser smoke.

Each task ships as a small, tested, committed unit. The orchestrator reviews
each subagent's diff (memory: build only your module, diff before trusting;
verify disk with `git diff`/`grep`).

## 10. Risks / watch-items

- **sql.js wasm bundling** under Vite — must resolve without a runtime CDN
  fetch (CSP + offline). Vendor the `.wasm`.
- **Modern media protobuf** — hand-rolled reader must handle both the legacy
  JSON map and the protobuf map; test both.
- **`sanitizeRich` change is shared** with authoring — must not widen the
  allowlist beyond media-reference `<img>`; regression-test existing behavior.
- **Bundle size** — sql.js (~1MB wasm) + fzstd. Lazy-load the whole Anki module
  (dynamic `import()` from the dialogs) so it never enters the main bundle.
- **Quota UX** — a large media import can exceed the student's allowance; the
  wizard must pre-check `useMyDocuments().quotaBytes - usedBytes` and fail
  gracefully mid-upload (partial import + clear report), not silently.
- **Worktree `node_modules`** empty — symlink before typecheck.
```
