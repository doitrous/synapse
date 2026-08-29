# Port spec — Resources

_Audit for the native iOS port of the Connect Cortex student app. iOS work lives in `ios/`. Web reference lives in `src/`. This spec is the source of truth for implementing `Resources` on iOS._

> **Naming correction up front.** The brief that spawned this audit calls the web feature "a student document editor + reader." Having read it end to end, that is not quite what it is. `Resources` is a **library/catalogue browser** (admin-authored books, guidelines, decks, articles, videos — read-only content) plus a **personal file locker** ("My uploads": a student's own PDFs/images, upload/rename/delete, no authoring). The **reader** (`ResourceReader.tsx` → `ReaderShell`) is a PDF viewer with a full **ink/markup annotation system** (pen, highlighter, sticky notes, text boxes, tape, ruler, lasso select, undo/redo, custom outline sections) — annotating on top of a document, not word-processing one. There is no rich-text document authoring anywhere in this feature (that exists elsewhere, in the separate Notebook feature, out of scope here). Section 5 flags this for an Omar decision on whether "editor" should be read narrower (My uploads: file management) or wider (a future rich-text notebook-style entry point reachable from Resources).

## 1. Web behavior inventory

### Routes
- `/app/resources` → `Resources()` in `src/pages/student/Resources.tsx:74`. Three sections via a segmented switch (`Files` / `Videos` / `My uploads`), state `section` (`src/pages/student/Resources.tsx:80`).
- `/app/resources/:id` → `ResourceReader` (`src/pages/student/ResourceReader.tsx:1`, a 1-line re-export of `ReaderShell` at `src/components/reader/ReaderShell.tsx:58`). `id` is either a catalogue resource id or `my:<documentId>` for a personal upload (`src/lib/useReaderSource.ts:19,39-45`).
- `/app/resources?id=<x>` redirects to `/app/resources/:id` (`src/pages/student/Resources.tsx:154-158`) — used for "jump to source" deep links from articles/citations.

### Files / Videos sections (the catalogue)
- Segmented switch `Files | Videos | My uploads` — `src/pages/student/Resources.tsx:256-272`.
- **Organise by**: System (subject) vs Module — `Segmented` control, `src/pages/student/Resources.tsx:278-282`, backed by `useLocalChoice('synapse.resources.groupBy', 'module', ['system','module'])` (device-only, not synced) at `src/pages/student/Resources.tsx:83`.
- **Two-level folder tree**: primary folder (subject under System, or `modules[0]` under Module) → subfolder by chapter. Built by `groupResources()` in `src/data/resourceGrouping.ts:47-94`. Unrecognised subjects/modules are kept, not dropped (`src/data/resourceGrouping.ts:13-14,64-68`); folders and subfolders are individually collapsible (`toggleFolder`, `src/pages/student/Resources.tsx:104,377-397`).
- **Filters panel** (togglable, remembered per-device via `useLocalPreference('synapse.resources.filters', true)`, `src/pages/student/Resources.tsx:91,303-358`):
  - Free-text search (title/source/chapter) — `src/pages/student/Resources.tsx:160-162,306-311`.
  - Subject `<select>`, counted from what's actually loaded, not a static list — `src/pages/student/Resources.tsx:312-319,134-144`.
  - University `<select>`, only shown if any resource restricts to one — `src/pages/student/Resources.tsx:320-329`.
  - Year `<select>`, same rule — `src/pages/student/Resources.tsx:330-339`.
  - "Saved only" toggle — `src/pages/student/Resources.tsx:340-343`.
  - Type filter chips, Files section only: All / Book / Guideline / Deck / Article, with live counts — `src/pages/student/Resources.tsx:57,345-356`. (`ResourceType = 'Book'|'Video'|'Guideline'|'Deck'|'Article'`, `src/data/types.ts:47`.)
  - Active-filter count badge + one-tap clear when the panel is collapsed — `src/pages/student/Resources.tsx:286-296`.
  - A stale subject filter (nothing left behind it) auto-resets to "all" — `src/pages/student/Resources.tsx:148-150`.
- **Row actions**: tap opens the resource (`openResource`, `src/pages/student/Resources.tsx:227-243`); bookmark toggle (`Bookmark`/`BookmarkCheck` icon button that does not also trigger the row's open, `src/pages/student/Resources.tsx:428-430,482-484`); scope chips (year/university) shown only when the author actually restricted the resource (`src/pages/student/Resources.tsx:472-479`); type badge (`src/pages/student/Resources.tsx:480`).
- **Video cards** render as a thumbnail grid (`src/pages/student/Resources.tsx:399-435`) instead of a list; opening one calls `apiOpenFile('/medical-resources/:id')` (`src/pages/student/Resources.tsx:236-238`) — i.e. **videos never enter the in-app PDF reader**, they open externally/in a new tab.
- **Reference-only resources** (catalogued, no file uploaded — `hasFile: false`): tapping expands an inline "not uploaded yet" note showing the author's recorded location instead of opening anything (`src/pages/student/Resources.tsx:227-231,422-426,486-494`). This is common: `useLiveResources` derives `hasFile` from whether the ledger item actually has a `storageKey` (`src/lib/useLiveResources.ts:47,68`), and most seeded resources don't.
- **Empty state**: "No resources/videos match" with a hint to clear filters (`src/pages/student/Resources.tsx:369-372`).
- **Open-failure toast**: a fixed bottom banner if a video/file fails to open (`src/pages/student/Resources.tsx:513-517`).

### My uploads section (`MyUploads`, `src/pages/student/Resources.tsx:566-781`)
This is the only place a student *creates or edits* something in this feature — it is file management, not authoring:
- **Add a file** — a file `<input>` behind a styled label, one file at a time, with a live percent while uploading (`src/pages/student/Resources.tsx:632-641`, `accept()` at `590-602`).
- Storage bar: used vs quota, split Documents vs Media, "deduplicated — a file used twice counts once" (`src/pages/student/Resources.tsx:643-659`, math in `quotaShare`/`dedupedMediaBytes` at `561-564,860-875`).
- **Documents list** (PDFs only — the only `mediaType` the reader opens): tap to open in the reader at `/app/resources/my:<id>` (`src/pages/student/Resources.tsx:687-704`, `uploadRouteId` from `src/lib/useReaderSource.ts:43-45`); **Rename** via `window.prompt` (`699`); **Delete** with a confirm that warns marks are deleted with it (`700`).
- **Media** (everything non-PDF: images/files from this upload flow *and* from the student's Notebook and Whiteboard, deduplicated) — collapsed behind a disclosure button, on-demand preview (image only) via `loadPreviewSource`/`togglePreview` (`src/pages/student/Resources.tsx:548-559,604-618,736-775`), and download for anything with a `documentId` when the app is in API mode (`757-759`).
- No folders/organisation in My uploads — flat list, sorted by source label then title (`src/pages/student/Resources.tsx:857`).
- No sharing of any kind anywhere in this feature.

### The reader (`ReaderShell.tsx`)
PDFKit-equivalent viewer (custom canvas + PDF.js-style page layout, `src/lib/reader/pageLayout.ts` etc.) with:
- Continuous vertical paging, fit modes `closer|width|page` remembered per device (`useLocalChoice('synapse.reader.fit', ...)`, `src/components/reader/ReaderShell.tsx:80`), pinch/scroll zoom anchored to the pointer (`zoomBy`, `328-347`).
- **Annotation toolbar** (`ReaderToolbar`, imported `src/components/reader/ReaderShell.tsx:32`): pan, lasso select, pen, highlighter, shape, eraser, note, text box, tape, laser pointer, ruler — tool shortcuts `v a p h s e n t k l r` (`367-406`). Per-tool settings: colour, stroke width, pen style, stroke stabilisation, eraser radius/mode, note/tape tone, shape snapping, lasso mode.
- **Undo/redo** with drag-coalescing (`src/components/reader/useAnnotations.ts:161-228`), ⌘Z/⌘⇧Z (`src/components/reader/ReaderShell.tsx:378-382`).
- **Widgets**: sticky notes and text boxes are editable in place (`WidgetLayer`, `setWidgetText`), tape is a plain highlight strip; a lasso selection can be recoloured/retoned/deleted in bulk (`SelectionBar`, `802-849`).
- **Outline / Contents panel**: the PDF's own outline plus student-authored "sections" (named page markers, `addMarker`/`removeMarker`) — `src/components/reader/ReaderShell.tsx:658-717`.
- **Search**: in-document text search plus a live search over the student's own note/textbox text (`noteHits`, `src/components/reader/ReaderShell.tsx:416-420,725-786`).
- **Study timer** overlay (`StudyTimer`).
- Deep-linkable to a page via `?page=N`, resolved from an author-typed location string (`pageParamFor`, `src/pages/student/Resources.tsx:69-72`) or from `useUrlPageSync`.
- States: opening spinner, "source file not uploaded yet" (catalogue item with no bytes), load error with "open in a new tab instead" fallback, missing resource ("not here" with a link back) — `src/components/reader/ReaderShell.tsx:431-442,554-573`.
- A save that the server refuses is surfaced as a persistent alert banner rather than silently dropped (`src/components/reader/ReaderShell.tsx:541-545`, backed by `annotations.error` from `src/components/reader/useAnnotations.ts:75-77,124-130`).

### Data model & persistence
| What | Web key(s) | Owner / sync |
|---|---|---|
| Catalogue resources | `synapse-admin-content-ledger-v4` (shared, admin-writable; overlaid onto `SEED_RESOURCES`) | Shared catalogue store — `src/lib/useLiveResources.ts:78,3` |
| Bookmarks | `synapse.bookmarks.resources.v1` | User-owned (`/^synapse\.bookmarks\./`, `src/lib/stateOwnership.ts:26`) — `src/pages/student/Resources.tsx:60,115` |
| Organise-by choice | `synapse.resources.groupBy` | **Device-only**, plain `localStorage`, never synced (`useLocalChoice`, `src/lib/useLocalPreference.ts:34-45`) |
| Filters-panel open | `synapse.resources.filters` | Device-only (`useLocalPreference`) |
| Reader fit mode | `synapse.reader.fit` | Device-only (`useLocalChoice`) |
| Annotations (ink/notes/markers) | `synapse.annotations.v1.<scope>.s<shardIndex>` + `synapse.annotations.v1.<scope>.idx` (manifest) | User-owned (`/^synapse\.annotations\./`) — sharded 16 pages/shard, only 3 shards (current ±1) held open at once. `src/lib/reader/annotationKey.ts:18-55`, `src/components/reader/useAnnotations.ts` |
| My uploads (**live/API mode**) | Dedicated REST resource, **not** a generic user-state JSON key | `GET/POST /api/my-documents`, `PUT .../chunks/:uploadId/:index`, `POST .../chunks/:uploadId/complete`, `PATCH /api/my-documents/:id`, `GET .../:id/file`, `DELETE /api/my-documents/:id` — all `requireAuthenticated`, backed by a `user_documents` SQL table (`server/src/index.js:592-716`). Files land under `RESOURCE_STORAGE_DIR/my-documents/<userId>/<id>.<ext>` (`server/src/index.js:545,608`). Quota comes from the account's subscription plan (`documentAllowance`, `server/src/index.js:523-543`); max document size `MY_DOCUMENT_MAX_BYTES` (100 MB default, `503`); chunk size `RESOURCE_CHUNK_MAX_BYTES` (64 MB default, `145`). |
| My uploads (**demo mode**, no API base) | `synapse.myDocuments.v1` | User-owned pattern exists (`/^synapse\.myDocuments\./`, `src/lib/stateOwnership.ts:35`) but is only actually exercised as a `usePersistentState` fallback with no server underneath — files stay in this browser's IndexedDB (`storeMediaFile`, `src/lib/useMyDocuments.ts:102-109`). **This is not how production My-uploads sync works; treat it as demo scaffolding only.** |
| Recently opened resources | via `useRecentResources`/`noteOpened` (not read in this audit; referenced at `src/pages/student/Resources.tsx:107,235`) | User-owned, dotted |

Empty/loading/error states are enumerated inline above (catalogue empty state, reader missing/error/unopened-file states, upload failure banner, bookmark/annotation-save failure banners). There is no explicit offline UI in this feature beyond what `usePersistentState`'s debounced write + crash-recovery copy already provides silently.

## 2. iOS current state

**This is not a greenfield feature.** iOS already has a resource catalogue browser and a genuinely full-featured PDF annotation reader that is close to parity with the web reader, including byte-for-byte-compatible storage keys. What is missing is narrower than "the editor" — it is specifically the **My uploads / personal document** feature (entirely absent) and some catalogue-browsing polish. Read-only claim, precisely:

- **Catalogue browsing (`ios/Synapse/Features/Library/ResourcesView.swift`)** — present, reduced:
  - Segmented control exists but only for **grouping** (`By chapter` / `By type`, `ResourceModel.Grouping`, `ios/Synapse/Core/Library/ResourceModel.swift:192-203`), not for **section** (Files/Videos/My uploads — no such switch exists at all, `ios/Synapse/Features/Library/ResourcesView.swift:24-186`).
  - Grouping is **single-level** (`ResourceModel.group`, `ios/Synapse/Core/Library/ResourceModel.swift:207-236`) — there is no subject-vs-module distinction and no chapter subfolder nesting the way web's `groupResources` (`src/data/resourceGrouping.ts:47-94`) does. `.system` here groups by chapter directly, and `.kind` groups by `ResourceType`, not by web's "Module" (which groups by `modules[0]`, a concept `LibraryResource` doesn't even carry — no `modules: [String]` field exists, `ios/Synapse/Core/Library/ResourceModel.swift:9-26`).
  - Filtering is reduced to: free-text search (`.searchable`, `ios/Synapse/Features/Library/ResourcesView.swift:50`), "Saved only" (`142`), "Only ones I can open" (`146`). **No subject filter, no university filter, no year filter, no type chips** — the web's `Select`s and `FilterChip`s (`src/pages/student/Resources.tsx:312-356`) have no iOS counterpart.
  - Bookmarks are implemented and correctly synced to the *same* key the web uses (`ResourceModel.bookmarksKey = "synapse.bookmarks.resources.v1"`, `ios/Synapse/Core/Library/ResourceModel.swift:88`, written through `sync.write` at `153`) — this one is at parity.
  - **Video resources are not distinguished from documents.** `ResourceType.video` exists (`ios/Synapse/Core/Library/ResourceModel.swift:29-33`) but every openable resource — video or not — routes into `ResourceReaderView` (`ios/Synapse/Features/Library/ResourcesView.swift:76-96`), and `ResourceFileStore.fileURL` unconditionally appends `.pdf` to the downloaded file (`ios/Synapse/Core/Library/ResourceFileStore.swift:55-62`). There is no external-open path (no `apiOpenFile` analogue). A video resource would attempt to download as a PDF and fail or render garbage in `PDFReader`.
  - Downloads (not streaming) — a resource is fetched once via `ResourceFileStore.download(_:)` (`ios/Synapse/Core/Library/ResourceFileStore.swift:69-107`) and kept in `Application Support/Synapse/Resources` until explicitly removed. This is a deliberate, reasonable divergence from the web (which streams pages on demand) and should stay.

- **Reader / annotation editing (`ResourceReaderView.swift`, `Core/Reader/*`)** — **this is not read-only**, and is close to full parity with web:
  - Full ink toolset: pen, highlighter, eraser, shapes/lasso select, notes, text boxes, tape, ruler (`ReaderToolbar`, `ToolSettings`, `InkCaptureView`, `AnnotationOverlay` — wired in `ios/Synapse/Features/Library/ResourceReaderView.swift:113-240`).
  - Undo/redo with drag-coalescing, matching web's `tag`/`coalesce` mechanism exactly (`AnnotationStore.Op`/`record`, `ios/Synapse/Core/Reader/AnnotationStore.swift:271-321` vs `src/components/reader/useAnnotations.ts:161-228`).
  - Contents panel with student-authored sections + document outline (`ReaderPanel`, wired at `ios/Synapse/Features/Library/ResourceReaderView.swift:170-191`), in-document + in-notes search (`findInDocument`, `295-313`), study timer (`StudyTimer`, `332-355`).
  - **Storage keys are a byte-for-byte port**: `AnnotationKey.swift` mirrors `annotationKey.ts` exactly, including the FNV-1a hash-over-original-id detail (`ios/Synapse/Core/Reader/AnnotationKey.swift:14-78` vs `src/lib/reader/annotationKey.ts`), and `AnnotationStore.swift` mirrors `useAnnotations.ts`'s sharding/window/manifest/undo model line for line (`ios/Synapse/Core/Reader/AnnotationStore.swift`). Marks made on the phone and the website land under the identical key and will genuinely round-trip.
  - Gaps vs web reader: no zoom-anchored pinch control call-out (PDFKit's native pinch replaces it, acceptable), no laser pointer tool (present on web toolbar, not enumerated in iOS `ToolSettings`/`Tool` — not verified further in this audit, flagged for a follow-up check), no explicit "save refused" banner equivalent to `annotations.error` in the UI (the store exposes `problem: String?`, `ios/Synapse/Core/Reader/AnnotationStore.swift:27,96`, but `ResourceReaderView` never reads it — worth wiring up).

- **My uploads / personal documents — entirely absent.** `grep -rn "MyDocument\|myDocuments\|my-documents" ios/` returns nothing except the speculative pattern already sitting in `StateOwnership.swift:35` (`"^synapse\\.myDocuments\\."`), which nothing in the app ever triggers or tests (`ios/SynapseTests/StateOwnershipTests.swift` has no case for it). Concretely, iOS has:
  - No model equivalent to `MyDocument`/`useMyDocuments` (`src/lib/useMyDocuments.ts:26-46`).
  - No upload UI, no document picker/photo picker integration, no chunked-upload client for `POST /api/my-documents` + `PUT .../chunks/...` + `POST .../complete`.
  - No rename/delete UI or API calls (`PATCH`/`DELETE /api/my-documents/:id`).
  - No storage-quota display.
  - No "Media" (images-from-notebook/whiteboard) aggregation — though `NotebookView.swift` and `WhiteboardView.swift` do exist (`ios/Synapse/Features/More/`), so the source data for a future Media tab is already on-device; it's only the cross-feature inventory view that's missing.
  - **Nearest existing iOS pattern to mirror**: `ResourceFileStore` (`ios/Synapse/Core/Library/ResourceFileStore.swift`) already has the shape of a document-state machine (`notDownloaded/downloading/ready/failed`) and disk management (Application Support, excluded from backup) that a new `MyDocumentStore` should reuse for the *download* half; the *upload* half has no precedent anywhere in `ios/` yet and needs new chunked-upload client code in `SynapseAPI.swift` alongside `downloadResource` (`ios/Synapse/Core/API/SynapseAPI.swift:302`).

**Answering the required question directly: is iOS Resources read-only?** No, not uniformly. Reading + *marking up* a catalogue document is already fully editable and already syncs correctly. What is genuinely read-only/missing is (a) a student's own document library (upload/rename/delete — 100% absent) and (b) catalogue filter/organisation richness (present on web, absent on iOS). The core net-new work is (a); (b) is smaller, independent polish.

## 3. Gap list (web → iOS)

Ordered by dependency (each item is independently committable):

1. **`MyDocument` data model** — Swift struct mirroring `src/lib/useMyDocuments.ts:26-46` (`id, title, mediaType, fileName, mimeType, sizeBytes, pageCount, createdAt, sourceKind, sourceId`).
2. **`SynapseAPI` My Documents client** — `GET /api/my-documents`, `POST /api/my-documents`, chunked `PUT .../chunks/:uploadId/:index`, `POST .../chunks/:uploadId/complete`, `PATCH .../:id`, `GET .../:id/file`, `DELETE .../:id`. New code beside `downloadResource` (`ios/Synapse/Core/API/SynapseAPI.swift:302`); chunk size must respect `RESOURCE_CHUNK_MAX_BYTES` (64 MB, server-configurable) and total size `MY_DOCUMENT_MAX_BYTES` (100 MB).
3. **`MyDocumentStore`** (Core/Library) — list cache + upload progress/queue state machine, reusing `ResourceFileStore`'s `.ready/.downloading/.failed` shape for the download-back-down side (opening an uploaded PDF).
4. **My uploads UI** (Features/Library) — new `MyUploadsView` (or a tab inside `ResourcesView`): add-a-file (document picker + photo picker), storage quota bar, documents list (open/rename/delete), collapsible Media list with on-demand preview.
5. **Section switcher** (Files / Videos / My uploads) on `ResourcesView`, replacing today's single catalogue list.
6. **Video resource handling** — stop routing `.video` resources into `ResourceReaderView`/`ResourceFileStore`'s PDF path; add an external-open path (Safari view controller or `UIApplication.open`) hitting the same host URL the web's `apiOpenFile('/medical-resources/:id')` resolves to.
7. **Catalogue filter parity** — subject, university, and year filters; type chips (Book/Guideline/Deck/Article) with live counts, mirroring `src/pages/student/Resources.tsx:312-356`.
8. **Two-level, dual-axis grouping** — add a `modules: [String]` field to `LibraryResource`/ledger projection, and port `groupResources()`'s System(subject)/Module → chapter nesting (`src/data/resourceGrouping.ts:47-94`) in place of `ResourceModel.group`'s single-level chapter/type split.
9. **Reference-only inline affordance** — when `hasFile == false`, iOS currently just doesn't make the row a `NavigationLink` (`ios/Synapse/Features/Library/ResourcesView.swift:88-96`); web additionally surfaces the author's recorded location text inline on tap (`src/pages/student/Resources.tsx:422-426,486-494`) — small UX parity item.
10. **Wire `AnnotationStore.problem` into the reader UI** — the store already tracks a save-refused message (`ios/Synapse/Core/Reader/AnnotationStore.swift:27`), it's just never displayed, unlike web's persistent banner (`src/components/reader/ReaderShell.tsx:541-545`).
11. *(Verify, not build)* Confirm laser-pointer tool parity in `ToolSettings`/`ReaderToolbar` — not confirmed in this pass.

Items 1–6 are the "editor" gap proper (My uploads is the only real content-creation gap in this feature). Items 7–11 are catalogue/reader polish and can ship independently, in any order, after or alongside 1–6.

## 4. Port spec

### Data layer
- **`MyDocument`** — `ios/Synapse/Core/Library/MyDocument.swift` (new). Plain `Codable` struct matching the server row shape 1:1 (see table in §1): `id: String`, `title: String`, `mediaType: String` (`"pdf" | "file"`, matches `mediaType: string` — keep as raw string, not an enum, since the server treats it as free text beyond `pdf`), `fileName: String?`, `mimeType: String?`, `sizeBytes: Int`, `pageCount: Int?`, `createdAt: String` (ISO8601), `sourceKind: String?` (`resource|notebook|whiteboard`), `sourceId: String?`. No `ref` field — that's a web-only demo-mode IndexedDB detail with no iOS equivalent (iOS is always "live" mode).
- **`MyDocumentStore`** — `ios/Synapse/Core/Library/MyDocumentStore.swift` (new), `@MainActor @Observable`, modelled on `ResourceFileStore`: `items: [MyDocument]`, `usedBytes`/`quotaBytes` (from the `GET /api/my-documents` response), `upload(_:onProgress:)` doing the create→chunk-loop→complete dance against `SynapseAPI`, `rename(_:title:)`, `remove(_:)`, and a download/open state machine for reading an uploaded PDF back (reuse `ResourceFileStore`'s `State` enum verbatim or factor it out to a shared type both stores use — do the latter, since duplicating `notDownloaded/downloading/ready/failed` is exactly the kind of drift this audit exists to prevent).
- **Persistence: this is not a `SyncEngine.write` key.** Unlike bookmarks and annotations, "My uploads" content and metadata live in a dedicated authenticated REST resource (`server/src/index.js:592-716`, table `user_documents`), not under `/api/user-state/:key`. Do **not** route this through `StateOwnership`/`SyncEngine`'s generic JSON outbox — it needs its own upload queue (see Sync/offline below). The `synapse.myDocuments.` entry already in `StateOwnership.swift:35` should stay (it documents the web's demo-mode fallback and costs nothing to keep correct), but no new iOS code should key off it.
- **Video external-open** — no new persistence; add a small helper (e.g. `ResourceOpener.openExternally(_:api:)`) that resolves the same `/medical-resources/:id` path the web's `apiOpenFile` hits and opens it via `SFSafariViewController` or `UIApplication.shared.open`.
- **Grouping** — extend `LibraryResource` (`ios/Synapse/Core/Library/ResourceModel.swift:9-26`) with `modules: [String]`, sourced the same way `useLiveResources` sources it (`item.resourceData?.moduleIds`, `src/lib/useLiveResources.ts:45`) via `ResourceModel.project`'s ledger JSON parsing (`ios/Synapse/Core/Library/ResourceModel.swift:162-186`). Port `groupResources()` as a pure `static func group(_:by:subjectOrder:)` returning a two-level `Folder`/`Subfolder` shape, unit-testable exactly like the web's `resourceGrouping.test.ts` counterpart.

### UI
- **`ResourcesView.swift`**: add a top segmented control for section (`Files | Videos | My uploads`), matching `Theme` tokens already used elsewhere in this file (`Theme.primary`, `Theme.surface`, `.pickerStyle(.segmented)` pattern already present at `128-137`). Videos section renders a grid of `ResourceRow`-style cards with a play glyph, tapping → external open (gap #6), not `NavigationLink` to the PDF reader.
- **New `MyUploadsView.swift`** (Features/Library): storage bar (two-colour stacked bar, Documents vs Media, same "deduplicated" caption as web), a `List` of documents (open/rename via alert-with-textfield/delete with confirmation dialog — SwiftUI equivalents of `window.prompt`/`window.confirm`), a disclosure group for Media with an on-demand `AsyncImage`-or-cached-preview. Use `.fileImporter`/`PhotosPicker` for "Add a file", not a bespoke picker.
- **Filters**: extend the existing `filters` `@ViewBuilder` (`ios/Synapse/Features/Library/ResourcesView.swift:128-147`) with `Picker`s for subject/university/year (only shown when the loaded set is non-trivial, mirroring web's conditional rendering at `src/pages/student/Resources.tsx:320-329`) and a chip row for type — reuse whatever `FilterChip`-equivalent component exists elsewhere in the iOS design system (check `ios/Synapse/Features/QuestionBank` for an existing chip control before inventing a new one).
- **Reader**: no new screen needed; wire `AnnotationStore.problem` into a small alert/banner in `ResourceReaderView` (gap #10). All copy through `strings`/`Environment(\.strings)` as already done throughout this file; RTL is handled automatically by SwiftUI's layout mirroring (no manual RTL code found or needed in `Features/Reader`).
- Arabic/RTL: no special casing needed beyond what's already implicit in SwiftUI (`HStack`/`leading`/`trailing` already used throughout these files rather than hardcoded left/right) — verify only that any new icon (upload arrow, trash, pencil) has a directionally-neutral SF Symbol or is explicitly flipped where the web mirrors an icon for RTL (`rtl:-scale-x-100` usages in `src/pages/student/Resources.tsx:485,702`).

### Sync/offline
- **Bookmarks, grouping choice, filters-open, reader fit**: already correctly modelled — bookmarks via `SyncEngine.write`/outbox (`ios/Synapse/Core/Library/ResourceModel.swift:153`), the rest as plain `UserDefaults`/`@AppStorage` (`ios/Synapse/Features/Library/ResourcesView.swift:11`, `ResourceModel.swift:64-71`) — correctly device-local, matching web's `useLocalChoice`/`useLocalPreference`. No change needed.
- **Annotations**: already fully wired through `SyncEngine.write` per shard/manifest write (`ios/Synapse/Core/Reader/AnnotationStore.swift:178,197,216,222`), which queues into `LocalStore`'s outbox and drains via `SyncEngine.drainOutbox()` (`ios/Synapse/Core/Sync/SyncEngine.swift:270-317`). No change needed — this is the part of "the editor" that already round-trips flawlessly between phone and website.
- **My uploads is a different offline problem and must not reuse the JSON outbox as-is**: a new document's *bytes* can't be queued as a small JSON blob the way a `write(key:value:)` call queues an annotation shard. Recommended shape:
  - **Metadata** (title edits, deletes) can piggyback on the existing retry/outbox pattern conceptually (queue-then-drain, `SyncEngine.drainOutbox()`'s abandon-on-403/keep-on-401/retry-on-transient logic is worth mirroring), but as calls against the dedicated `/api/my-documents/:id` endpoints, not as a `synapse.*` state key.
  - **Uploads** need their own durable queue: persist "pending upload" rows (local file URL + chunk progress + server `id`/`uploadId` once created) in `LocalStore` (SQLite/GRDB, alongside the existing outbox tables), and resume/retry chunk-by-chunk on reconnect — closer to `URLSession` background upload tasks than to the JSON outbox. This is materially new infrastructure, not a small addition to `SyncEngine`.
  - A pending upload started offline should show `.downloading`-equivalent progress (or a distinct `.queued` state) in `MyUploadsView`, matching the web's percent indicator (`src/pages/student/Resources.tsx:634`).
- **Video external open**: no offline story needed beyond what `SFSafariViewController`/`UIApplication.open` already do (fails visibly if there's no connectivity, same as web's `apiOpenFile` catch at `src/pages/student/Resources.tsx:236-238`).

### Tests
Swift Testing (`@Test`) cases to add, alongside the existing `ResourceProjectionTests.swift`, `AnnotationModelTests.swift`, `StateOwnershipTests.swift`:
- `MyDocumentStoreTests`: upload happy path (create → N chunks → complete updates `sizeBytes`/`pageCount`), rename, delete-removes-from-list, quota math (`usedBytes`/`quotaBytes` display), chunk-size boundary (a file exactly at `RESOURCE_CHUNK_MAX_BYTES` boundary splits into the right chunk count).
- `MyDocumentStoreTests` (offline): a queued upload survives a simulated disconnect/reconnect and completes without double-creating the server-side document (must not call `POST /api/my-documents` twice for one retry).
- `ResourceGroupingTests` (mirrors `src/data/resourceGrouping.test.ts`): unrecognised subject/module kept not dropped; numeric chapter/module sort ("Module 2" before "Module 10"); System vs Module produce different primary keys from the same input.
- `StateOwnershipTests` addition: assert `synapse.myDocuments.` still matches `isUserOwned` (documents intent, costs one line) but add a comment/test noting production My-uploads traffic never actually uses this key — so a future refactor doesn't "fix" it into being used incorrectly.
- `ResourceOpenerTests` (video path): a `.video` resource never resolves to a `ResourceReaderView`/PDF file URL; it resolves to the external-open URL.
- Existing `AnnotationModelTests.swift` should already cover shard/manifest round-tripping — confirm it includes a case asserting the *exact* key string for a known id (not just that it round-trips), since key drift is silent by design (per the file's own doc comment, `ios/Synapse/Core/Reader/AnnotationKey.swift:6-8`).

### Suggested build order
1. `MyDocument` model + `SynapseAPI` client methods (no UI) — pure, testable in isolation.
2. `MyDocumentStore` (list + rename + delete + open-existing) against the new client — still no upload.
3. Upload (foreground only, no offline queue yet): add-a-file → chunked upload → appears in list. Ships a usable v1.
4. `MyUploadsView` UI, wired to the above; add the section switcher to `ResourcesView`.
5. Video external-open fix (independent, small, arguably do this *before* step 3 since it's a correctness bug today, not just a gap).
6. Offline upload queue (durable, resumable) — polish, once the foreground path is proven.
7. Catalogue filter parity (subject/university/year/type chips) — independent of everything above.
8. Two-level grouping + `modules` field — independent, touches `ResourceModel`/`LedgerDecoder` projection.
9. Wire `AnnotationStore.problem` into the reader UI — trivial, do any time.
10. Media aggregation tab inside My uploads, pulling from Notebook/Whiteboard stores — last, since it's cross-feature and lowest value relative to effort.

Steps 1–4 are "minimal real v1 editor" (a student can bring, read, rename, and remove their own files, on par with the web's core loop). Steps 5–10 are later polish, independently committable in any order.

## 5. Open questions / blockers

- **Scope of "editor" for Omar to confirm.** This audit found no rich-text/word-processor authoring anywhere in the web Resources feature — "editing" here means either (a) file management in My uploads, or (b) ink/note annotation on top of a PDF (already built on iOS). If what was actually wanted is a Notebook-style rich-text document creator reachable from Resources, that does not exist on web either and would be new product scope, not a port — needs a decision before any of §4 is built against the wrong target.
- **Video handling is a live correctness bug on iOS today**, not just a missing feature: tapping an openable `.video` resource currently attempts to download and PDF-render it (`ResourceFileStore.fileURL` hardcodes `.pdf`, `ios/Synapse/Core/Library/ResourceFileStore.swift:61`). Worth fixing regardless of My-uploads timing — flagging as a candidate for a standalone fix outside this port's main sequencing.
- **Offline upload queue design** (§4 Sync/offline) needs an architecture decision: extend `LocalStore`'s existing outbox tables to hold binary/chunk state, or stand up a parallel `URLSession` background-upload-backed queue. This audit recommends the latter but didn't inspect `LocalStore`'s schema deeply enough to rule out the former cheaply — worth a quick spike before committing to build order step 6.
- **Storage quota source of truth**: `documentAllowance` on the server reads plan from `subscriptions`/`students` tables (`server/src/index.js:523-543`) — confirm iOS already has an equivalent "current plan" read (it likely does, via `StudentAudience`/entitlement plumbing referenced in `ResourceModel.audience`) so the quota bar doesn't need a new plan lookup.
- **Laser-pointer tool parity** (§2, iOS reader gaps) was flagged but not verified — needs a quick follow-up check of `ToolSettings.swift`/`ReaderToolbar.swift` against web's `Tool` union (`src/components/reader/InkSurface.tsx`, not read in this pass) before being added to a build order.
- Nothing here is Telegram-only or otherwise blocked on an external source — all server behavior was confirmed directly from `server/src/index.js`.
