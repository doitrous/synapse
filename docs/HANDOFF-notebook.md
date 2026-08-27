# Notebook editor — Word-like ribbon (Workstream 6, Part 1 of N)

Scope of this pass: the **formatting core** of the notebook's rich-text editor —
a ribbon with Home / Insert / Draw / Layout tabs, Home + Layout fully wired,
Insert + Draw built as shells, plus the bottom status bar (page/word/media
counters, Focus, Zoom). This is a handoff to the next agent(s), who build the
Insert tab (image/link/table/ready-items) and the Draw tab (freehand ink).

## Files touched / added

- `src/components/notebook/NoteEditor.tsx` — rewritten. Registers the new
  nodes, defines the shared `theme`, hosts the ribbon + editing surface +
  status bar, keeps the existing controlled-state machinery
  (`LoadEditorStatePlugin`, `OnChangePlugin`, `locallyEmittedStates`,
  `normaliseForLexical`) intact.
- `src/components/notebook/NoteRibbon.tsx` — **new**. The ribbon itself: tab
  strip + per-tab control row.
- `src/components/notebook/noteCommands.ts` — **new**. Plain (non-JSX)
  Lexical command dispatchers, option data, and the `useActiveFormats` hook
  that reflects the current selection's formatting back to the ribbon.
- `src/data/notebook.ts` — added `notebookWordCount` and
  `notebookEmbeddedMediaCount` (pure helpers, no Lexical import).
- `src/pages/student/Notebook.tsx` — added a persisted `focusMode` flag that
  hides the note-list sidebar (desktop `<aside>` and the mobile "All
  notes/New" bar); wired `attachedMediaCount`, `notePosition`, `focusMode`,
  `onToggleFocus` into `<NoteEditor>`.

## What's implemented (Home + Layout, fully wired)

**Home tab** (`HomeRibbon` in `NoteRibbon.tsx`):
- Undo/Redo, disabled correctly via `CAN_UNDO_COMMAND`/`CAN_REDO_COMMAND`.
- Text-style dropdown (`TextStyleMenu`): Normal / Heading 1–4 / Quote, via
  `$setBlocksType` + `$createHeadingNode`/`$createQuoteNode`
  (`@lexical/rich-text`). Shows the current block's style.
- Bold / Italic / Underline / Strikethrough — `FORMAT_TEXT_COMMAND`, theme
  classes in `NoteEditor.tsx`'s `theme.text` (including
  `underlineStrikethrough`, which Lexical applies when both are active at
  once — a real theme key, not decorative).
- Text colour + Highlighter (`ColorMenu`, used twice) — palette popovers,
  `$patchStyleText` from `@lexical/selection` setting `color` /
  `background-color`. Colours are literal hex (`TEXT_COLORS`,
  `HIGHLIGHT_COLORS` in `noteCommands.ts`), same reasoning as the reader's
  ink palette: a colour written into saved content has to mean the same
  thing in every theme.
- List style dropdown (`ListMenu`): bullet / numbered / checklist via
  `INSERT_UNORDERED_LIST_COMMAND` / `INSERT_ORDERED_LIST_COMMAND` /
  `INSERT_CHECK_LIST_COMMAND`. `<CheckListPlugin />` is registered
  separately from `<ListPlugin />` — **both are required**: `ListPlugin`
  does not handle `INSERT_CHECK_LIST_COMMAND` or the checkbox click/keyboard
  interactions (verified by reading `@lexical/list`'s source; `registerList`
  and `registerCheckList` are two independent registrations).
- Subscript / Superscript — `FORMAT_TEXT_COMMAND`.
- Clear formatting — `noteCommands.ts`'s `clearFormatting`: strips inline
  colour/highlight and every character format, then resets the block to a
  paragraph (mirrors Word's eraser, which also drops heading styles back to
  Normal).

**Layout tab** (`LayoutRibbon`): align left/center/right/justify
(`FORMAT_ELEMENT_COMMAND`), indent/outdent
(`INDENT_CONTENT_COMMAND`/`OUTDENT_CONTENT_COMMAND`), horizontal line
(`INSERT_HORIZONTAL_RULE_COMMAND`, `@lexical/react/LexicalHorizontalRuleNode`
+ `LexicalHorizontalRulePlugin`).

**Active-state reflection**: `useActiveFormats` in `noteCommands.ts` — a
selection-change listener (`registerUpdateListener` + a
`SELECTION_CHANGE_COMMAND` command handler, the belt-and-braces pattern
Lexical's own playground toolbar uses) that lights up Bold/Italic/etc.,
shows the current heading/list/alignment, and reads the current
color/highlight via `$getSelectionStyleValueForProperty`.

**Bottom status bar** (`NoteStatusBar` + `ZoomControl` in `NoteEditor.tsx`):
- Left: "Page X of Y" — **X/Y is the note's 1-based position among the
  student's notes** (`notePosition` prop, computed in `Notebook.tsx` from
  the `notes` array), not an estimated print-pagination count. This was a
  deliberate choice between the two options the brief offered: a
  words-per-page estimate needs an arbitrary assumption and no real
  pagination to back "current page" with, so it can't stay honest; a note's
  position in the list needs no assumption at all.
- Word count (`notebookWordCount`, `src/data/notebook.ts`) and media count
  (`notebookEmbeddedMediaCount` + `attachedMediaCount` prop, the note's
  pasted-image attachment folded in — see the trap below on why the walk is
  type-name-based rather than a fixed list).
- Right: Focus button (only renders if `onToggleFocus` is passed) and Zoom
  (`ZoomControl`, 50–200% in a `Minus`/percentage/`Plus` + preset popover,
  persisted via `usePersistentState('synapse.notebook.zoom', 100)`, applied
  as an inline `fontSize` on the editing surface's wrapper — not the CSS
  `zoom` property, for broader browser support).

**Focus mode**: `Notebook.tsx` owns a persisted `focusMode` flag
(`synapse.notebook.focusMode`) because it has to hide page-level chrome (the
desktop note-list `<aside>` and the mobile "All notes / New" bar) that
`NoteEditor` has no reach into. The toggle button lives in the editor's
status bar (`onToggleFocus` prop) so it still reads as part of the editor's
own chrome, the way Word's Focus/Immersive mode does.

## Node + theme registration

`NOTE_NODES = [ListNode, ListItemNode, HeadingNode, QuoteNode,
HorizontalRuleNode]` is a single constant in `NoteEditor.tsx`, used in
**both** `NoteEditor`'s and `NotePreview`'s `LexicalComposer` `nodes` array —
register any future node (image, link, table, ready-item) in this one place
so it renders in both the editor and read-only previews (shared notes,
dashboards, wherever `NotePreview` is used). The `theme` object (also
shared by both) needs a matching entry for anything with visible styling.

## Traps found and fixed while building this — read before adding a node type

1. **`normaliseForLexical`'s legacy-format detector** (bottom of
   `NoteEditor.tsx`) decides whether stored JSON is already Lexical's own
   shape by checking every root-level child has an array `children` field.
   That's true for every `ElementNode` (paragraph, heading, quote, list) but
   **false for a `DecoratorNode`** (the horizontal rule, and any inline
   image/table/ready-item node the next agent adds if it can appear as a
   *top-level* root child). Without a fix, saving a note containing an `hr`
   would make the very next load decide the document "isn't real Lexical
   JSON" and flatten it to plain text — silently deleting all formatting.
   Fixed by special-casing `child.type === 'horizontalrule'` in the
   `.every(...)` check. **If you add a new top-level (non-inline) decorator
   node, add its `type` string to that same check** — grep
   `normaliseForLexical` in `NoteEditor.tsx`. An *inline* decorator node
   (one that only ever appears inside a paragraph's `children` array, not
   as a root child) does not need this, since the paragraph itself still
   has an array `children`.
2. **`HorizontalRuleNode`'s className comes from `theme.hr`, not a
   Tailwind arbitrary selector.** The deprecated `@lexical/react` wrapper
   class only overrides `$config()`; `createDOM()` is inherited from
   `@lexical/extension`'s base class, which calls
   `addClassNamesToElement(element, config.theme.hr)`. `theme.hr` is set in
   `NoteEditor.tsx`.
3. **Media count is a type-name regex walk** (`notebookEmbeddedMediaCount`
   in `src/data/notebook.ts`), matching any node `type` containing
   image/embed/media, rather than a hardcoded node-type list — so it starts
   counting automatically the moment the Insert tab registers a real inline
   image/table node, with no change needed here. Keep that node's `type`
   string matching that pattern (e.g. `'inline-image'`, not something
   unrelated) or update the regex.
4. **`@lexical/utils` is not an installed dependency** (only `lexical`,
   `@lexical/react`, `@lexical/rich-text`, `@lexical/list`,
   `@lexical/selection` are, per the brief). `mergeRegister`,
   `$findMatchingParent`, and `$isRootOrShadowRoot` all turned out to be
   re-exported from the core `lexical` package itself in the installed
   version (0.49) — confirmed by reading `node_modules/lexical/dist/index.d.ts`
   — so `noteCommands.ts` imports them from `'lexical'`, not
   `'@lexical/utils'`. Don't add `@lexical/utils` as a new dependency; check
   `lexical`'s own barrel export first.

## Remaining work (next agents)

### Insert tab — `InsertRibbonStub` in `NoteRibbon.tsx`

Currently a row of disabled placeholder icon buttons (Image/Link/Table/Ready
items) plus a "Coming soon" badge, clearly commented as a stub. Replace the
whole function body. Needs, per the original brief:

- **Inline image in text** — a custom Lexical `DecoratorNode` (inline: true)
  using the page's existing `uploadDocument` flow (see `documents.upload` /
  `useMyDocuments` in `src/pages/student/Notebook.tsx`, and how
  `ManagedNotebookImage` resolves a stored document to a displayable URL —
  reuse that resolution logic for the decorator's render). Register the new
  node class in `NOTE_NODES` in `NoteEditor.tsx` (both composers), give it a
  `theme` entry if it needs one, and make sure its serialized `type` either
  keeps a `children` array (if element-based) or gets added to the
  `normaliseForLexical` special case above (if decorator-based) — and to the
  `notebookEmbeddedMediaCount` regex if its type name doesn't already match
  `/image|embed|media/i`.
- **Hyperlink** via `@lexical/link` (not yet installed — add it). Needs
  `LinkNode`/`AutoLinkNode` registered, a `LinkPlugin`, and a small
  popover/dialog for entering the URL (there's precedent for a small
  anchored form in `src/components/ui/DateTimeField.tsx`'s day picker, and
  `Popover`/`usePopoverTrigger` from `src/components/ui/Popover.tsx`, which
  `NoteRibbon.tsx` already uses extensively — follow the same
  `ref={setAnchor}` / `setOpen(true)` pattern there).
- **Table** via `@lexical/table` (not yet installed — add it), with
  insert-row/insert-column controls. `@lexical/table` needs its own node set
  (`TableNode`, `TableRowNode`, `TableCellNode`) registered in `NOTE_NODES`
  and its own plugin.
- **Ready-items inserter** — `import { READY_ITEMS, readyItemsByCategory,
  searchReadyItems } from '@/data/readyItems'`, inserted inline as a
  decorator node (read `src/data/readyItems.tsx` first for the shape of a
  ready item before designing the node's serialized form).

Keep the tab-switching wiring in `NoteRibbon`'s top-level `NoteRibbon()`
function untouched — only replace `InsertRibbonStub`'s body.

### Draw tab — `DrawRibbonStub` in `NoteRibbon.tsx`

Also a disabled-button stub (Pen/Eraser/Layers icons). Needs freehand
drawing over the note with over/under z-order (draw above or below the
text). There's a full freehand annotation system already in
`src/components/reader/` (`InkSurface.tsx`, `ReaderToolbar.tsx` — see
`INK_COLORS`, `PENS`, `TOOLS` there) built for the document reader; it is
**not** wired to notes, but it is the closest prior art in this codebase for
pointer-driven ink strokes, undo/redo of strokes, and colour/tool state —
worth reading before designing the notebook version from scratch. Keep in
mind the note editor's content already scrolls and reflows (unlike the
reader's fixed-page canvas), which the drawing layer's coordinate system
will need to account for.

## Verified, not run

`npx oxlint` is clean on all five touched/added files (exit 0). This
worktree's `node_modules` is empty (dependencies aren't installed here), so
`tsc`/build/dev-server could not be run — per the shared task instructions,
that's reserved for the orchestrator's integration barrier anyway. All
Lexical API signatures used here (`$patchStyleText`, `$setBlocksType`,
`$createHeadingNode`, `INSERT_CHECK_LIST_COMMAND`,
`INSERT_HORIZONTAL_RULE_COMMAND`, `CAN_UNDO_COMMAND`, etc.) were checked
directly against the installed `.d.ts` files under the main repo's
`node_modules/@lexical/*` (v0.49) rather than assumed from memory.
