# The library, by module and by year

Date: 2026-08-21
Status: approved design, not yet planned
Scope: library trees, the student library, Library Setup

## Problem

The library has five views. Four are generated: `system`, `discipline`,
`skills` and `knowledge` are divisions of `synapse-medical-library-taxonomy-v1`,
a fixed tree an admin can browse and place content into but cannot restructure.

The fifth, **My Curriculum**, renders this and nothing else
(`MedicalLibraryAtlas.tsx:285`):

> Curriculum mapping is ready. Published articles appear here only after a
> university, year, and module are explicitly assigned. No placement is guessed.

It lists no articles under any circumstances. It is a promise, not a view.

So a student cannot browse the library the way their degree is actually
organised — by the module they are sitting and the year they are in — and a
faculty cannot arrange their own material the way they teach it. Every placement
must fit a taxonomy written for medicine in general rather than for this
university's Year 2.

## Decisions taken

Settled during brainstorming; not open in planning.

| Decision | Choice |
|---|---|
| Where the content comes from | **The same articles, placed a second time.** A tree files existing articles by id; nothing is copied. |
| Tree shape | **No fixed depth and no fixed meaning per level.** Subjects, topics, subtopics — or five levels, if that is how a faculty teaches. |
| Storage | **One document**, `synapse-library-trees-v1`, holding every tree keyed by scope. Not one document per module. |
| Who may edit | **Reviewers, for the modules and years they are assigned**, enforced by the server. Editors and above, everywhere. |
| My Curriculum | **Replaced** by By module and By year. The empty promise goes. |
| Articles filed nowhere | **Still appear in Systems.** These are additional placements, not a replacement. |

## Non-goals

- Changing the generated taxonomy or the four views built on it.
- Moving articles out of the Systems library. A tree is a second placement.
- Per-student or personal trees. These are faculty structures.
- Reordering articles within a node beyond the order they are filed in.

---

## 1. One document, keyed by scope

```ts
type LibraryTreeScope = `module:${string}` | `year:${string}`

interface LibraryTreeNode {
  id: string
  title: string
  children?: LibraryTreeNode[]
  /** Articles filed at this node. Ids — the article itself lives once. */
  articleIds?: string[]
}

interface LibraryTreesDocument {
  trees: Record<LibraryTreeScope, LibraryTreeNode[]>
}
```

**Why one document rather than one per module.** A key like
`synapse-library-tree-module-MOD_CVS` is a dynamic key space, and
`tabsForStateKey` maps exact keys — an unregistered key is super-admin-only by
design, so every new module's tree would be unreachable until somebody added it
to the registry. One registered key with a **`stateMerge` adapter** avoids that
entirely and buys more besides: the adapter treats each tree as an item keyed by
its scope string, so the diff, the tab check, the per-item scope check and the
conflict detection built for the role hierarchy all apply unchanged.

That is what makes the enforcement exact. `changeWritableBy` can say *this
change is to `year:OMS_Y2`, and you are assigned `OMS_Y2`* — precisely the check
that was impossible for Systems & Topics, whose nodes carry no module or year,
and the reason that surface was left editor-only.

The document is owned by the **Library Setup** tab.

## 2. The tree has no schema

A node is a title and some children. Nothing records whether a level is a
"subject" or a "topic", because a constraint on depth is the thing this exists
to remove. A faculty that teaches Anatomy → Upper Limb → Brachial Plexus gets
three levels; one that teaches Anatomy → Upper Limb gets two; one that wants five
gets five.

Titles are free text and are not resolved against the generated taxonomy. A node
called "Anatomy" in `module:MOD_CVS` has no relationship to the `Anatomy`
division node, and is not meant to.

## 3. Articles are filed, never copied

`articleIds` holds ids of articles that already exist. One article can be filed
in many trees at once, and in the generated taxonomy at the same time. Editing it
changes it everywhere it appears — the principle the media work just established
for images, applied to prose.

An article filed in no tree still appears under Systems. These trees are
additional placements, so an empty module tree hides nothing.

A filed article whose id no longer resolves is shown as a broken placement
naming the id, not silently dropped: content deleted out from under a tree is
something a reviewer should see, not something the interface should tidy away.

## 4. What a student sees

**By module** and **By year** replace My Curriculum. Six views total.

Each opens on the student's own first — their modules, their year, from
`identity.audience` — with the rest reachable below. A scope with no tree yet
says so plainly rather than rendering an empty list that looks broken.

Beneath a node, its articles; beneath that, its children. Selecting an article
opens the same reader every other view uses.

## 5. What an admin sees

A **Library structure** section on Library Setup:

- Pick a module or a year. A reviewer is offered only the ones they are assigned;
  editors and above see all of them.
- Add, rename, move and delete nodes at any depth. Deleting a node with children
  asks first and names how many articles are filed beneath it.
- File articles into a node with the existing `EntityPicker`.
- A tree that does not exist yet is offered as "start one", not as an error.

## 6. Verification

- **Scope, on the server.** A reviewer assigned `OMS_Y2` may write
  `year:OMS_Y2` and is refused `year:OMS_Y4` and `module:MOD_ANY` with the item
  named.
- **Two reviewers, two trees.** Concurrent edits to different scopes both
  survive; concurrent edits to the same scope conflict by name rather than one
  overwriting the other.
- **Filing.** An article filed in a module tree appears there, still appears
  under Systems, and opens the same reader from both.
- **Broken placements.** A filed id that no longer resolves is shown as broken
  rather than hidden.
- **The student views.** A student sees their own module and year first, and a
  scope with no tree says so.

Verified against a running app before any of it is called done.
