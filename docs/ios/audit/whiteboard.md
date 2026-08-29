# Port spec — Whiteboard

_Audit for the native iOS port of the Connect Cortex student app. iOS work lives in `ios/`. Web reference lives in `src/`. This spec is the source of truth for implementing Whiteboard on iOS._

## 1. Web behavior inventory

### Screens / routes

- Editor: registered as the `whiteboard` student page (`src/router.tsx:94,163`), component `Whiteboard()` in `src/pages/student/Whiteboard.tsx:72`. One full-screen canvas, no sub-routes.
- Public read-only viewer: `/s/:id` → `SharedDocument` (`src/router.tsx:330`) renders a published board from the same `BoardState` shape (not audited in this file beyond confirming it reads the same data model — see `src/data/whiteboard.ts`).
- `Resources.tsx:571` (`MyUploads`) still reads the **legacy single-board key** (`synapse.whiteboard.board`) to compute storage-usage accounting — a residual reference to the pre-collection format; not part of the editor's own state, flagged in §5.

### Multi-board model

The page does not edit one board — it edits the **active board of a collection**:
- `WhiteboardCollection` (`src/data/whiteboard.ts:123-133`): `activeBoardId`, `boards: WhiteboardDocument[]`, `sharedBoards`, `migratedFromSingleBoard`.
- `WhiteboardDocument` (`:106-121`): `id, title, state: BoardState, ownerId, ownerName, universityId, year, permission, collaborators, topics, stars, follows, revision, updatedAt`.
- Board list UI: "Your boards" / "Shared" tab switcher, collapsible panel (`Whiteboard.tsx:1328-1467`). Create (`createBoard`, `:726-739`), switch (`switchBoard`, `:741-744`), rename inline (`renameActiveBoard`, `:746-749`, double-click a board chip), delete (`deleteActiveBoard`, `:751-753`, disabled when it is the last board). Each board chip shows its `revision` counter (`:1378`).
- Switching boards resets undo/redo history and clears selection (`:187-194`).
- A legacy single-board install is migrated into the collection once, on load (`migrateSingleBoardToCollection`, `whiteboard.ts:250-273`, invoked at `Whiteboard.tsx:155-163`).

### Tools (toolbar, `Whiteboard.tsx:1470-1544`)

- **Select** (`MousePointer2`) — pan empty space, select/drag/resize items, default tool.
- **Pen** (`Pencil`) — freehand ink; drawing shows 5 ink colours (`INK_COLOURS`, `whiteboard.ts:136-142`, theme tokens so both themes stay legible) and 3 stroke widths (`INK_WIDTHS = [2,4,8]`, `:144`) as extra toolbar controls that appear only while the pen is active (`:1474-1500`).
- **Eraser** — touching a stroke's (fattened, invisible) hit-path deletes that whole stroke (`eraseStroke`, `:642-645`; hit path `:1003-1013`). Eraser does not touch notes/images/etc., only ink.
- **Ink layer order toggle** (`Layers` icon) — send freehand drawing above or below notes/pictures/files (`setInkAbove`, `:636-639`; two mutually-exclusive render sites, `:1141` and `:1320`).
- Keyboard shortcuts (`:884-889`): `v` select, `p`/`d` pen, `e` eraser, `Escape` clears selection and returns to select.

### Board objects

- **Sticky notes** — `addNote`/`addNoteAt` (`:491-502`, double-click empty space or the `+` button), drag (`noteDown`, `:468-475`), double-click to edit text in a `<textarea>` (`:1261-1263`), 8 tint colours via a per-note popover palette (`TONES`/`TONE_ORDER`, `whiteboard.ts:163-174`; UI `Whiteboard.tsx:1268-1294`), delete (`removeSelected`, `:531-536`, also `Delete`/`Backspace`).
- **Sections/frames** — dashed-border grouping rectangles with a draggable title bar and resize handle (`addFrame`/`frameDown`/`frameResizeDown`/`removeFrame`, `:504-466`). Notes whose centre is inside a frame move with it (`notesInFrame`, `:435-443`).
- **Connectors/links** — drag from a note's left/right edge dot to another note (`connectorDown`, `:477-482`; commit on pointerup, `:343-359`). Auto-routed cubic curve (`linkPath`/`defaultControls`, `whiteboardGeometry.ts:104-123`) or student-bent via two draggable control points (`bend` drag type, `:1101-1128`). Selectable (`:1100`), deletable (`removeSelectedLink`, `:514-519`), and can be reset to the automatic curve (`straightenSelectedLink`, `:521-529`).
- **Pictures** — `ImagePlus` toolbar button → file input → `addPicture` (`:653-681`) uploads through the student's managed-document store (`documents.upload`, `kind:'whiteboard'`), aspect-ratio preserved, drag/resize (`imageDown`/`imageResizeDown`, `:540-557`). Legacy inline/IndexedDB pictures are lazily migrated to the managed store (`:165-185`).
- **Files** — `Paperclip` button → `addFile` (`:690-711`), pinned as a card showing name + size; a PDF opens in the in-app reader (`openFile`, `:714-719`, `navigate('/app/resources/:id')`); anything else downloads via `apiDownload`.
- **Ready-made items** — a 51-item icon library (`src/data/readyItems.tsx`) across 6 categories (people/anatomy/tools/symptoms/trends/general), searchable popover (`readyItemsTrigger`, `:1577-1614`), placed at view centre (`addReadyItem`, `:596-613`), drag/resize (`readyItemDown`/`readyItemResizeDown`, `:580-594`), and re-orderable in the paint order — bring-forward/send-backward (`reorderSelectedReadyItem`, `:615-633`, toolbar buttons `:1523-1528`).
- Every item kind shares one delete affordance once selected: notes (`Trash2` in toolbar, `:1519`), images/files/ready items (`removeSelectedItem`, `:568-578`, toolbar `:1520-1534`), frames (`:1536`), links (`:1537-1543`).

### View / navigation

- **Pan** — drag empty space with the select tool (`backgroundDown`, `:407-421`), or arrow keys on the minimap (`minimapKeyDown`, `:954-965`).
- **Zoom** — mouse wheel / trackpad pinch (`onWheel`, `:389-397`, ctrl+wheel = pinch), toolbar +/− (`zoomBy`, `:374-387`, clamped 0.25–2.5×), percentage readout, "Fit to screen" (`fitContent`, `:846-854`, computed from `bounds` over every item type, `:828-844`).
- **Minimap** ("World view", `:1644-1665`) — whole 8000×5000 board shown at ~190×112, draggable/clickable to jump (`panFromMinimap`/`minimapDown/Move/Up`, `:924-952`), shows frames + notes + the current viewport rectangle.
- **Board bounds** — `BOARD = {width:8000, height:5000}` (`whiteboardGeometry.ts:43`); every placement is clamped inside it (`clampToBoard`) so nothing can be dragged out of reach; the viewport itself is clamped (`clampView`, `:63-73`) so it cannot be panned off the board entirely.

### Search

- `Ctrl/Cmd+F` or the search icon opens an inline find bar (`:1546-1567`); matches note text (`matchNotes`, `whiteboardGeometry.ts:143-150`, reading-order sort), shows `n/total`, `Enter`/`Shift+Enter` step through hits and re-centre the view on the match (`goToHit`, `:763-774`), matched notes get a highlight ring (`:1251`).

### Undo / redo

- Simple in-memory history stack, 50 entries, `structuredClone` snapshots of the whole `BoardState` (`snapshot`/`remember`/`undo`/`redo`, `:196-209`). Every mutating action calls `remember()` first. `Cmd/Ctrl+Z` / `+Shift+Z`, and toolbar `Undo2`/`Redo2` (`:1517`). Cleared on board switch (`:188-189`). **Session-only** — not persisted, not synced.

### Sharing / export

- `ShareDialog` (`:1616-1625`) publishes the current board (`payload={() => boardRef.current}`) under kind `'whiteboard'`, handle `'board'` — same mechanism as Notebook sharing. Published boards are discoverable by same-university/same-year classmates (`sameAudienceSharedBoards`/`groupWhiteboardsByTopic`, `whiteboard.ts:320-343`, or the live `useSharedDocuments('whiteboard')` feed in API mode, `Whiteboard.tsx:800-826`), with star/follow toggles. There is no separate "export image/PDF" action — sharing the link is the only distribution mechanism.

### Data model (`src/data/whiteboard.ts`)

```
Note        { id, x, y, text, tone }                                   :13
LinkLine    { id, from, to, c1?, c2? }                                  :21
Frame       { id, x, y, width, height, title }                         :22
BoardImage  { id, x, y, width, height, documentId?, src?, alt, sizeBytes? } :32-47
BoardFile   { id, x, y, documentId, name, sizeBytes, kind:'pdf'|'file' } :56
InkStroke   { id, points: number[], color, width }                     :59
ReadyElement{ id, x, y, width, height, readyItemId }                    :71
BoardState  { notes, links, frames, images?, files?, ink?, readyItems?, inkAbove? } :80-95
```
`InkStroke.points` is a **flat, uncompressed `[x0,y0,x1,y1,…]` array in board coordinates** — no quantization, no delta-encoding, no pressure (`inkPath`, `whiteboard.ts:345-356`, quadratic-through-midpoints smoothing). This is a different, simpler codec than the Reader's annotation ink (`StrokeCodec` below) — the two ink systems on the web are not unified either.

### Persistence / sync

- Storage key: `synapse.whiteboard.boards.v1` holds the **entire `WhiteboardCollection`** (all boards, not sharded per-board) via `usePersistentState` (`Whiteboard.tsx:83-86`, key constant `whiteboard.ts:191`). Legacy single-board key `synapse.whiteboard.board` (`:192`) is migrated in once and then dormant for the editor (still read elsewhere, see §5).
- `usePersistentState` (`src/lib/usePersistentState.ts:26-45`) is the same generic mechanism every synced student document uses: **demo mode** (no `VITE_API_BASE`) → `localStorage`; **live mode** → hydrated from and written to `/api/user-state/:key` on the MariaDB-backed server, with an in-memory debounce, retry, and a `localStorage` crash-recovery copy per key (`src/lib/stateStore.ts`).
- Ownership routing: any `synapse.whiteboard.*` key is matched by `USER_OWNED_PATTERNS` (`src/lib/stateOwnership.ts:9`) and goes to the per-student store, not the shared catalogue.
- Server side: generic per-key routes, no whiteboard-specific server code — `GET/PUT/DELETE /api/user-state/:key` (`server/src/index.js:2125,2134,2177`). Sharing rides the existing notes/whiteboards share pipeline (`SHARE_KINDS` includes `'whiteboard'`, `server/src/sharePolicy.js:10`; `server/src/shares.js`).
- Pictures/files are **not** inlined into the board document — they go through the student's own document store (`documents.upload`, `@/lib/useMyDocuments`) and the board keeps only a `documentId` reference, resolved on render via `resolveMediaSource`/`apiFetchFile` (`BoardImageView`, `:1679-1744`).
- Because the whole collection is one JSON document rewritten on every change (same as every other `usePersistentState` key), a board with many strokes/images/ready-items grows that one document; the app does not shard whiteboards the way the Reader shards annotations by page (see §5).

### Empty / loading / error / offline states

- **Empty board**: `INITIAL_BOARD = {notes:[],links:[],frames:[]}` (`whiteboard.ts:190`) — no placeholder graphic, just the blank grid and a persistent hint pill at the bottom ("Double-click to add a note · drag a dot on a note to connect it · scroll to zoom", `Whiteboard.tsx:1666`).
- **Attaching**: toolbar button label swaps to "Adding the picture…" / "Adding the file…" and disables both attach buttons while `attaching !== null` (`:1510-1511`); `BoardImageView` shows "Loading picture…" while resolving a source (`:1741`).
- **Attach error**: dismissible red banner (`attachError`, `:1569-1574`); `BoardImageView` renders an inline error paragraph if the media can't be resolved (`:1737-1739`, e.g. "stored as managed media but is not available in this browser yet").
- **Shared tab**: loading/"Opening shared boards…", error banner, and an explicit empty state ("No same-university/year whiteboards have been shared with you yet.") for both the live-API feed and the local preview fallback (`:1393-1400`, `:1432-1436`).
- **Offline**: no dedicated UI state; `stateStore.ts`'s debounce/retry/recovery-copy mechanism keeps the edit in `localStorage` until the network returns, transparently to this page.

## 2. iOS current state

Files:
- `ios/Synapse/Core/Whiteboard/Whiteboard.swift` — data model + `BoardGeometry` (pure geometry helpers) + `BoardTone`.
- `ios/Synapse/Features/More/WhiteboardView.swift` — the only screen, reached from More (`ios/Synapse/Features/More/MoreView.swift:42`).
- `ios/SynapseTests/WhiteboardTests.swift` — geometry + storage round-trip tests, no UI tests.

**What exists**: notes only (add/edit text/tone/delete), links (two-tap "Connect" mode, not drag-from-edge), pan (`DragGesture`), pinch-zoom, "fit to content", a single implicit board.

**What's modeled but unused**: `BoardFrame` (`Whiteboard.swift:31-38`) is decoded/encoded but **never rendered or created** — `grep` for `frames`/`BoardFrame` in `WhiteboardView.swift` returns nothing. A board made on the web with sections opens on iOS with the sections silently absent from view (data survives a round-trip per `WhiteboardTests.roundTrip`, `WhiteboardTests.swift:189-197`, but there is no way to see or add one).

**What's missing entirely**: pen/ink drawing, eraser, ink colour/width, ink-above/below toggle, sticky-note colour beyond the editor sheet (there is no in-canvas palette popover, only the note-editor sheet grid — functionally present but not the same interaction), pictures, files/PDF pinning, ready-made items library, multi-board collection (create/switch/rename/delete — the model is a single `BoardState`, not `WhiteboardCollection`), search, undo/redo, minimap, zoom toolbar controls/percentage readout, sharing, link bending/straightening, link deletion (a link can be made but not removed independent of deleting a note), forward/backward ordering (no z-order concept at all — SwiftUI `ForEach` paint order only).

**Storage key mismatch (load-bearing)**: `BoardState.storageKey = "synapse.whiteboard.board"` (`Whiteboard.swift:50`) is the **legacy single-board key** the web migrated away from. The web's live key today is `synapse.whiteboard.boards.v1` holding a `WhiteboardCollection`, not a bare `BoardState`. As shipped, the iOS app:
1. Never reads or writes anything the current web editor reads or writes — a board made on web today does **not** appear on the phone, and a board made on the phone does not appear on the web's board list (it would only surface via the one-time `migrateSingleBoardToCollection` path, and only if the web collection has never migrated before — `whiteboard.ts:250-273`).
2. Decodes correctly (`BoardState` is structurally compatible with `WhiteboardDocument.state`), so the fix is a key + wrapper-type change, not a codec rewrite.

**Nearest existing iOS patterns to mirror** (greenfield for everything past notes/links):
- Ink capture, pressure, coalesced-touch sampling, stabilization, eraser hit-testing: `ios/Synapse/Features/Reader/InkCaptureView.swift` (full custom `UIView` touch handler, not PencilKit).
- Stroke simplify/quantize codec (a *different*, more sophisticated format than the web whiteboard's flat-array `InkStroke`): `ios/Synapse/Core/Reader/StrokeCodec.swift`.
- Tool state shape: `ios/Synapse/Core/Reader/ToolSettings.swift` (`ReaderTool`, `NoteTone` — already the same 8-tone palette as the whiteboard, per the comment at `ios/Synapse/Core/Reader/AnnotationObject.swift:31`).
- Generic sync write-through + outbox: `ios/Synapse/Core/Sync/SyncEngine.swift:241-282` (`sync.write(key:value:)`), already exactly what `WhiteboardView.swift:295-306` uses — no new sync mechanism is needed, only pointing it at the right key/type.
- Sharded per-scope keys (if the whiteboard ever needs to stop being one giant document): `ios/Synapse/Core/Reader/AnnotationStore.swift:1-19`.

**No iOS "My Documents"/uploaded-file store exists at all** (`grep -rln "my-documents\|MyDocument" ios/Synapse` → no matches; `SynapseAPI.swift` has no upload/download-by-document-id calls, only `downloadResource` for catalogue/ledger PDFs). This blocks a faithful port of pictures and files, which on web are references into that store — see §5.

## 3. Gap list (web → iOS)

### Tool parity table

| Web tool / control | Web ref | iOS status |
|---|---|---|
| Select / pan / drag-select | `Whiteboard.tsx:407-421` | Present (drag-to-pan, tap-to-select) |
| Pinch zoom, wheel zoom | `:374-397` | Present (pinch only; no wheel/trackpad equivalent needed on iOS, but no +/− buttons or % readout either) |
| Fit to content | `:846-854` | Present (`fitToContent`, `WhiteboardView.swift:273-291`) |
| Board bounds / clamped pan & placement | `whiteboardGeometry.ts:43-73` | Present, values match (`BoardGeometry.swift:67,86-95`) |
| Minimap | `:1644-1665` | **Missing** |
| Sticky notes: add/move/edit/delete | `:491-536` | Present |
| Note colour (8 tones) | `:1268-1294` | Present (in edit sheet, `NoteEditorSheet`) |
| Sections/frames: add/move/resize/rename/delete | `:504-466` | **Modeled, not rendered — missing in practice** |
| Notes travel with their frame | `:435-443` | Missing (no frames) |
| Connectors: drag-from-edge | `:477-482` | Different UX: two-tap "Connect" mode instead (`WhiteboardView.swift:180-193`) |
| Connector bend / straighten | `:1101-1128`, `:521-529` | **Missing** |
| Connector delete (standalone) | `:514-519` | **Missing** (only disappears if a note is deleted) |
| Pen / freehand ink | `:409-421`, ink layer `:987-1021` | **Missing** |
| Ink colour (5) / width (3) | `whiteboard.ts:136-144` | **Missing** |
| Ink above/below toggle | `:636-639` | **Missing** |
| Eraser (stroke-hit delete) | `:642-645` | **Missing** |
| Pictures: add/move/resize | `:653-681`, `:540-557` | **Missing** (also blocked on no document store, §5) |
| Files/PDF pin: add/open/download | `:690-719` | **Missing** (same blocker) |
| Ready-made items library (51 icons, 6 categories) | `src/data/readyItems.tsx` | **Missing** |
| Ready-item forward/backward (z-order) | `:615-633` | **Missing** (no z-order concept at all) |
| Search notes | `:1546-1567` | **Missing** |
| Undo / redo | `:196-209` | **Missing** |
| Multi-board: create/switch/rename/delete/list | `:726-753`, `:1355-1467` | **Missing** (single implicit board) |
| Sharing (publish, star, follow) | `:1616-1625`, `:800-826` | **Missing** |
| Keyboard shortcuts | `:884-889` | N/A (no hardware keyboard assumed, acceptable to skip) |

Roughly **7 of 24** rows are present (select/pan, zoom, fit, bounds, notes CRUD, note colour, a link mechanism) — under a third, and the one non-parity item shipped (frames) is invisible. This is a large-surface, mostly-greenfield port.

### Gap bullets, ordered by dependency

1. **Storage key + collection model fix** — without this every other feature is built on top of data the web can never see. Must land before or alongside anything else.
2. **`WhiteboardCollection`/`WhiteboardDocument` Swift types + multi-board UI** (list, create, switch, rename, delete) — everything downstream operates on "the active board's `BoardState`", so this reshapes how `WhiteboardView` gets its data.
3. **Undo/redo** — cheap (snapshot stack, same as web) and every subsequent feature (ink, frames, images) should participate in it from day one rather than being retrofitted.
4. **Frame/section rendering + CRUD** — the model exists; this is "finish what's there."
5. **Freehand ink (pen + eraser + colour/width + above/below)** — the highest-value missing tool and the one with real technical risk (see §4 rendering substrate). Depends on nothing above except undo.
6. **Link bend/straighten/standalone-delete** — extends the existing two-tap link mechanism.
7. **Z-order (bring-forward/send-backward)** — needed before ready-items and pictures can stack sensibly; currently no board object has a z-index.
8. **Ready-made items library** — a data/asset port (icons + categories) plus placement/resize/reorder UI; no server dependency.
9. **Pictures and files** — gated on an iOS "My Documents" upload/download client existing (§5 blocker); until then this cannot match the web's reference-not-inline model.
10. **Search** — small, depends on nothing but notes existing (already true).
11. **Minimap** — nice-to-have, purely additive, no data dependency.
12. **Sharing (publish/star/follow)** — depends on the multi-board model (a board must have a stable id/title to publish) and ideally on the app already having a share surface pattern (Notebook sharing, if ported) to reuse.

## 4. Port spec

### Data layer

Location: `ios/Synapse/Core/Whiteboard/`.

- Extend `Whiteboard.swift`'s model to match `src/data/whiteboard.ts` field-for-field:
  - `BoardImage`, `BoardFile`, `InkStroke`, `ReadyElement` structs (new), each `Codable, Identifiable, Equatable, Sendable`, matching the web's optional fields exactly (`documentId`/`src` both optional on `BoardImage`; `inkAbove: Bool?` on `BoardState`) so decoding a document written by either platform never drops data — same discipline already used for `BoardLink.c1/c2` (`Whiteboard.swift:23-29`) and the "unknown tone still decodes" test (`WhiteboardTests.swift:224-229`).
  - `BoardState` gains `images: [BoardImage] = []`, `files: [BoardFile] = []`, `ink: [InkStroke] = []`, `readyItems: [ReadyElement] = []`, `inkAbove: Bool = false` — default-valued so an old locally-cached `BoardState` (notes/links/frames only) still decodes.
  - New `WhiteboardDocument` and `WhiteboardCollection` structs, direct ports of `whiteboard.ts:106-133` (same field names, `snake`→`camel` only where Swift convention requires — keep JSON keys identical via `CodingKeys` if property names must differ for Swift style, but prefer identical names since the web's JSON is camelCase already).
  - **`BoardState.storageKey` is retired.** Replace with `WhiteboardCollection.storageKey = "synapse.whiteboard.boards.v1"` (the constant the web actually uses, `whiteboard.ts:191`). Do not invent a new key.
  - Port `emptyWhiteboardCollection`, `createWhiteboardDocument`, `activeWhiteboard`, `updateWhiteboardState`, `addWhiteboard`, `renameWhiteboard`, `removeWhiteboard` as free functions or `WhiteboardCollection` methods — same signatures/behavior as `whiteboard.ts:200-308`, unit-testable without SwiftUI.
  - Extend `BoardGeometry` with z-order-aware hit testing (currently `note(at:)` only handles notes, `Whiteboard.swift:149-157`) generalized to "topmost item of any kind under a point," and a `bounds(of board: BoardState)` port of `Whiteboard.tsx:828-844` for fit-to-content.
  - Port `inkPath`-equivalent smoothing for on-screen rendering only (quadratic-through-midpoints, `whiteboard.ts:345-356`) — this is *display* smoothing, separate from any capture-time stabilization (see below).

### Rendering substrate: keep custom, do not adopt PencilKit

**Recommendation: extend the existing custom `InkCaptureView`-style engine, not PencilKit.**

Justification:
- The app already has a production-proven, low-latency custom ink pipeline for the Reader (`ios/Synapse/Features/Reader/InkCaptureView.swift`) that:
  - drains `event.coalescedTouches(for:)` (up to ~240 Hz Pencil sampling) rather than the ~60/120 Hz touch-delivery rate (`InkCaptureView.swift:257-281`) — this is the actual latency/smoothness lever, and PencilKit is not required to get it;
  - captures pressure per point (`pressure(of:)`, `:283-288`);
  - has a configurable stroke stabilizer (`Stabilize.swift`, used at `:76-77,210,360-361`);
  - already draws highlighter vs pen blend modes, eraser radius/trail, and (bonus, not needed for whiteboard v1) shape recognition and a ruler tool.
  - This is a general `UIView`-level capture surface, not PDF-specific in its touch/stroke logic (the PDF-specific parts are `pageSpace`/`place`/`onScreen`, which map screen↔page coordinates through `PDFView`/`PDFPage`). Porting it to the whiteboard means swapping that coordinate mapping for the whiteboard's own `offset`/`scale` (already the same shape as `BoardGeometry.toBoard`/`centred`), not rewriting the touch/pressure/stabilization core.
- **The cross-platform tension, stated precisely**: the web whiteboard's `InkStroke.points` is a flat, uncompressed `[x,y,x,y,…]` array in *board* coordinates (`whiteboard.ts:59`, `inkPath` at `:345-356`), and that is the wire format that must round-trip to `synapse.whiteboard.boards.v1` so a stroke drawn on iOS renders correctly in a browser and vice versa. PencilKit's native persistence unit is `PKDrawing`/`PKStroke` — a binary, Apple-only format (stroke paths as `PKStrokePath` with per-point force/altitude/azimuth, ink type, transform) with **no JS decoder** and no path to becoming `[x,y,…]` pairs without Apple mediating the conversion. Two ways to use PencilKit given that constraint, both bad:
  1. Store `PKDrawing.dataRepresentation()` alongside/instead of `InkStroke.points` → the web can never render, edit, or export a board with PencilKit-authored ink; sharing/collaboration breaks silently for any student who drew on iOS.
  2. Convert `PKStroke.path` samples to `[x,y,…]` at commit time, discarding PencilKit's format → is possible, but then PencilKit's main advantages (its own renderer, its own undo, its own ink-type rendering) are moot, because storage and playback are already being done by hand-rolled code — at that point PencilKit is only being used as an input capture surface, which `InkCaptureView`'s touch handling already does, with (per the Reader work) already-tuned coalesced-sample and pressure handling, and with a coordinate model (page/board space, not view space) the whiteboard needs anyway.
  - PencilKit also brings its own `PKToolPicker` UI, its own undo manager, and its own view (`PKCanvasView`) that would sit alongside (not replace) the existing SwiftUI note/frame/link layers — a second rendering system layered under the first, doubling the surfaces that have to agree on coordinates, z-order, and hit-testing.
- Given the port must stay bit-for-bit compatible with a web stroke format that is a plain point array, and the app already has a hand-built capture engine that meets every "flawless" criterion in the prompt (low-latency Pencil input via coalesced touches, pressure capture, smooth rendering via `screenPath`'s quad-curve fit, and a working stabilizer), building a second ink stack on PencilKit purely for whiteboard would add a second engine to maintain for no capability the first doesn't already have, and would actively risk the sync requirement.
- Use the web whiteboard's own simpler `InkStroke` shape (flat points, no quantization) for the wire format — **not** the Reader's `StrokeCodec` (RDP-simplify + quantize + delta-encode), because that codec's wire format (`AnnotationObject.p: [Int]`) is a port of `src/lib/reader/strokeCodec.ts`, a *different* system the whiteboard web code does not use or decode. Reusing `StrokeCodec` for the whiteboard would desync from the web's actual `InkStroke.points` field and break round-tripping. RDP simplification is still worth applying to the *whiteboard's own* `points: [Double]` array before it lands in `InkStroke`, entirely client-side and losslessly, matching whatever (if any) simplification the web toolbar's point-distance throttle already does (`Whiteboard.tsx:306-311`, a 1.5-board-unit minimum spacing) — this keeps large boards small without changing the wire shape.

Practical shape of the port: a new `WhiteboardInkCaptureView: UIView` (or a shared base extracted from `InkCaptureView` for the parts that are not PDF-specific — coalesced-touch loop, pressure, stabilizer plumbing) living in `ios/Synapse/Features/Whiteboard/`, feeding `onStroke: (_ points: [CGPoint]) -> Void` in *board* coordinates (via `BoardGeometry.toBoard`), committed as one `InkStroke` on touch-up exactly as the web commits one `InkStroke` on pointer-up (`Whiteboard.tsx:328-341`).

### UI

Location: promote `ios/Synapse/Features/More/WhiteboardView.swift` to `ios/Synapse/Features/Whiteboard/` (it is growing well past a "More" utility screen; keep a thin `MoreView.swift:42` navigation link into it). Suggested split, mirroring the web's own decomposition:

- `WhiteboardView.swift` — top-level screen: board list bar, toolbar, canvas host, minimap, share sheet trigger. Owns `@State private var collection: WhiteboardCollection`, `activeBoardId`, `tool: WhiteboardTool`, `selection` (generalized beyond today's `selected: String?` to cover any item kind, mirroring the web's `selected`/`selectedFrame`/`selectedLink`/`selectedItem` split at `Whiteboard.tsx:101-131`).
- `WhiteboardCanvas.swift` — the `ZStack` of frames/links/ink/images/files/readyItems/notes, replacing today's inline `canvas(_:)` (`WhiteboardView.swift:67-108`). Z-order becomes explicit array order per kind, same convention as the web ("later in the array paints later," `whiteboard.ts:68-70`).
- `WhiteboardInkCaptureView.swift` (UIKit bridge, see above) for the pen/eraser layer.
- `WhiteboardToolbar.swift` — tool switcher + colour/width pickers (pen active) + undo/redo + zoom/fit, replacing the inline `toolbar` computed property (`WhiteboardView.swift:197-236`).
- `BoardListSheet.swift` or an inline collapsible section — create/switch/rename/delete, "Your/Shared" tabs.
- `ReadyItemPicker.swift` — searchable grid sheet, categories from a ported `ReadyItems.swift` data file (mirroring `src/data/readyItems.tsx`; icons can be SF Symbols or bundled SVG/PDF vector assets — a 1:1 icon-for-icon port is a design decision, not an engineering one, flag to Omar).
- Keep `NoteCard`/`NoteEditorSheet` (`WhiteboardView.swift:308-420`) largely as-is; extend the editor sheet's tone grid is already correct.
- All copy through `strings`/`useT`-equivalent (already used, e.g. `strings("Whiteboard")`, `:42`), Theme tokens only (already the pattern, `Theme.paper`, `Theme.primaryTint`, etc.) — no new work needed there, just keep it up as the view grows.
- RTL: the web mirrors resize handles and connector dots (`rtl:-left-1.5 rtl:right-auto`, `Whiteboard.tsx:1074`, `:1165`, `:1235`); confirm the iOS canvas is not laid out with a RTL-sensitive `HStack`/`leading` assumption anywhere the web explicitly flips (frame resize handle corner, connector dot side) — board-space (x,y) content itself should NOT mirror (an infinite canvas has no "leading/trailing", same as the web treats `left`/`top` in board space as ltr-invariant and only flips chrome).

### Sync/offline

- No new sync mechanism. Point `sync.write(key: WhiteboardCollection.storageKey, value: collection)` at the collection type, same call shape as today's `sync.write(key: BoardState.storageKey, value: board)` (`WhiteboardView.swift:304`). `SyncEngine.write` already asserts `StateOwnership.isUserOwned(key)` (`SyncEngine.swift:242`) — `synapse.whiteboard.boards.v1` matches the existing `^synapse\.whiteboard\.` pattern (`StateOwnership.swift:20`) with no changes needed there.
- Load: `api.userState(WhiteboardCollection.self, key: WhiteboardCollection.storageKey)` replacing today's `api.userState(BoardState.self, key: BoardState.storageKey)` (`WhiteboardView.swift:298`). On first load with nothing server-side, seed with `emptyWhiteboardCollection` (ported from `whiteboard.ts:237-248`), not `.empty`.
- Offline edits already go through the generic outbox (`store.enqueue`/`store.pendingWrites`/`drainOutbox`, `SyncEngine.swift:241-311`) — persisted in `LocalStore` (SQLite), which is strictly more durable than the web's `localStorage` recovery-copy approach (`stateStore.ts`), so no gap to close here, just correct wiring.
- **One-time migration decision needed** (flag to Omar, §5): should the iOS build read the legacy `synapse.whiteboard.board` key on first launch of the new version and fold it into the collection (mirroring `migrateSingleBoardToCollection`, `whiteboard.ts:250-273`) for any install that shipped the old single-board iOS whiteboard before this port lands? If any TestFlight/production iOS users already have boards under the old key, skipping this loses their work; if none do yet, this can be skipped entirely and the app can go straight to the collection key.
- Debounce/coalescing: the web debounces writes per key (`stateStore.ts`) so a drag doesn't write on every frame; mirror with a similar debounce before calling `sync.write` from continuous gestures (drag/resize/ink-stroke-commit), not on every `onChanged` — only commit on gesture end, same as `WhiteboardView.swift:177` already does for note drags (`.onEnded { Task { await save() } }`). Ink strokes should follow the same rule: write once per completed stroke, never per sample.
- Pictures/files: **do not inline bytes into the synced `BoardState`** (would blow past the server's per-document size guard the Reader's `AnnotationStore.maxShardBytes` comment flags, `AnnotationStore.swift:19`, and would diverge from the web's reference model). This is hard-blocked on an iOS document-upload client existing — see §5.

### Tests

New `@Test` cases in (extended) `WhiteboardTests.swift`, following the existing `@Suite` grouping:

- `Suite("Collection")`: `activeWhiteboard` falls back correctly when `activeBoardId` doesn't match any board (port of `whiteboard.ts:275-286`); `updateWhiteboardState` bumps `revision`/`updatedAt` and leaves other boards untouched; `removeWhiteboard` refuses to drop the last board; `renameWhiteboard` trims and falls back to "Untitled board" on empty input.
- `Suite("Storage")` additions: a `WhiteboardCollection` with images/files/ink/readyItems round-trips through `JSONEncoder`/`JSONDecoder` unchanged; a collection JSON fixture captured from the web (or hand-written to match `whiteboard.ts`'s shape) decodes without loss, including an `InkStroke` with an odd-length or empty `points` array; `inkAbove` absent decodes as `false`/`nil` without crashing (mirrors the "unknown tone still decodes" pattern, `WhiteboardTests.swift:224-229`).
- `Suite("Ink")`: stroke-commit produces one `InkStroke` per completed drag, never per sample; a stroke under the minimum-length guard (single point / near-zero movement, mirroring `Whiteboard.tsx:335-336`, "two points is the minimum that draws anything") is discarded rather than stored; eraser hit-test against a fattened stroke path removes the whole stroke by id.
- `Suite("Z-order")`: a generalized `topmost(at:in:)` picks the correct item across mixed kinds (note over image over ready item, matching paint order); forward/backward reordering is a no-op at the array's own ends (port of the `index === -1 || target < 0 || target >= items.length` guard, `Whiteboard.tsx:627`).
- `Suite("Undo")`: `remember()`-then-mutate-then-`undo()` restores the prior snapshot; `redo()` after a fresh mutation (not after undo) is a no-op; history caps at 50 entries and drops the oldest.
- UI-level (manual/UAT, not `@Test`): Apple Pencil pressure and latency feel, since that is inherently a device-feel judgment `@Test` cannot capture — call this out explicitly as a manual verification step before shipping, not a gap in the automated suite.

### Suggested build order (small, independently-committable increments)

1. **Fix the storage key + introduce `WhiteboardCollection`/`WhiteboardDocument`** with a single "default board" UI (no board-list chrome yet) — this alone makes the phone and the web agree on where a board lives, which is the single highest-leverage, lowest-risk commit in this whole port.
2. **Undo/redo** over the existing note/link feature set.
3. **Frames**: render + add/move/resize/rename/delete, notes-travel-with-frame.
4. **Multi-board UI**: list/create/switch/rename/delete, "Your boards" only (skip Shared/publish for now).
5. **Z-order model** (generalize `note(at:)` → `topmost(at:)`, add forward/backward) — lands before ready items/pictures so they aren't built on a data shape that has to be revisited.
6. **Freehand ink v1**: pen + eraser + one colour + one width, using the ported capture view; no ink-above/below toggle yet (always under notes, matching the web default).
7. **Ink polish**: colour/width pickers, above/below toggle.
8. **Link bend/straighten/standalone delete.**
9. **Ready-made items** (data port + picker + place/resize/reorder).
10. **Search.**
11. **Minimap.**
12. **Pictures + files** — only after (or in tandem with, if prioritized) an iOS My Documents upload/download client lands; this is the one item genuinely gated on work outside the whiteboard itself.
13. **Sharing** (publish/star/follow) — last, since it depends on the multi-board model being solid and ideally reuses whatever share UI pattern a ported Notebook feature establishes first.

## 5. Open questions / blockers

- **Blocker — no iOS document-upload/download client.** `SynapseAPI.swift` has no equivalent of the web's `/my-documents/*` endpoints or `useMyDocuments()` upload flow; `grep -rln "my-documents\|MyDocument" ios/Synapse` returns nothing. Pictures and files on the whiteboard are, on web, references into that store (`BoardImage.documentId`, `BoardFile.documentId`) — porting them faithfully requires that client to exist first, independent of the whiteboard. Needs an Omar decision: build "My Documents" as its own prerequisite phase, or accept a divergent iOS-only inline-image fallback for v1 (with a migration plan once the real store lands)?
- **Decision needed — legacy key migration on iOS.** If any shipped iOS build has already written boards under `synapse.whiteboard.board` (the current, soon-to-be-retired storage key), the new collection-based storage needs a one-time migration path (mirroring `migrateSingleBoardToCollection`) or those boards are orphaned. If no iOS build has shipped this feature to real users yet, this can be skipped — confirm which is true before landing item 1 of the build order.
- **Decision needed — ready-made item icon assets.** The web's 51 icons (`src/data/readyItems.tsx`) are React SVG components; porting 1:1 means either bundling matching SF Symbols (fast, but not visually identical) or exporting/vectorizing the actual icon set as PDF/SVG assets (visually faithful, more asset work). Needs a design call, not an engineering one.
- **Clarification needed — RDP/point-throttling parity.** The web throttles ink sampling to a 1.5-board-unit minimum spacing (`Whiteboard.tsx:306-311`) but does not otherwise simplify or compress stroke points before storage. Should iOS apply any additional simplification (e.g., a light RDP pass) before committing a stroke, given Pencil's higher sample rate would otherwise produce noticeably denser `points` arrays for the same visual line than a mouse-drawn web stroke? This doesn't break compatibility either way (the wire format is just a point array), but affects document size and is worth a decision rather than an assumption.
- **Not server-dependent, no blocker**: every persistence primitive needed (`GET/PUT/DELETE /api/user-state/:key`, share kind `'whiteboard'`) already exists server-side; this port is entirely client work.
- **Flag, not a blocker**: `src/pages/student/Resources.tsx:571` still reads the legacy `synapse.whiteboard.board` key for storage-usage accounting on web — a pre-existing web-side loose end unrelated to the iOS port, noted here only because it means "the legacy key" is not fully dead even on web.
