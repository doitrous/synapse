# Term Grid — design

**Date:** 2026-08-20
**Status:** Approved, ready to plan
**Slice:** G of an eleven-part request — the last

---

## Scope

### In scope

1. A **crossword built from the medical glossary**: 8–15 terms interlocked in a
   small grid, their definitions as the clues.
2. **Solo play** — fill the grid, check it, see what you missed.
3. **With a friend** — a link carrying the seed, so both people get the exact
   same grid and can compare afterwards.
4. Reachable from **Study Together** and from **Medical Taxonomy**, where a
   grid is built from whatever category is filtered on screen.

### Out of scope

Nothing else remains; this is the last slice.

---

## Decisions taken

### 1 · It is a crossword, not Scrabble

Asked for "scrabble", but the constraints given — *8–15 words per game*, *the
board shouldn't be huge* — describe a crossword, and the material decides it:

- Scrabble needs a **dictionary of legal words**. Restricted to medical terms,
  almost no rack of seven letters yields a legal play, and the game stalls.
- Nothing can make a player *form* medical words. Allow ordinary English and it
  is Scrabble with a medical skin, teaching nothing; forbid it and it is
  unplayable.
- A crossword inverts that: the terms are the answers, and their **definitions
  are the clues**, so every square filled is a term recalled from its meaning.
  That is the thing worth practising.

It is also called **Term Grid**, not Scrabble, which is a Hasbro/Mattel
trademark. That was flagged when the eleven slices were first decomposed and
nothing since has changed it.

### 2 · The generator is pure, deterministic, and tested

Laying out a crossword is the only real algorithm in this slice, and a bad
layout does not throw — it produces a grid with words floating unconnected, or
silently drops half of them.

`buildGrid(terms, seed)` is pure and takes its seed, so:

- the same seed and the same terms always give the **identical grid**, which is
  what makes "play the same puzzle as a friend" a link rather than a server;
- every property worth trusting can be asserted — that placed words interlock,
  that letters at crossings agree, that nothing overlaps illegally.

`Math.random()` appears nowhere in it.

### 3 · Playing with a friend needs no server

The link carries the seed and the term set. Both people generate the same grid
locally and solve it; times are compared when they choose to share them.

This is deliberate. There is no database in this worktree, and the friend
graph's own slice shipped with untested SQL for exactly that reason. A game
that needs no round trip is a game that works, and one fewer table to be wrong
about.

### 4 · A grid is built from what is on screen

From the Medical Taxonomy, a grid uses the terms in the current filter, so
"Examination" gives an examination puzzle. From Study Together it offers the
categories. Fewer than eight terms in a filter is refused with a plain reason
rather than a thin puzzle.

---

## 1 · The generator

```ts
export interface PlacedWord {
  term: string
  clue: string
  row: number
  column: number
  direction: 'across' | 'down'
  /** The number shown in its first square. */
  number: number
}

export interface Grid {
  width: number
  height: number
  words: PlacedWord[]
  /** Terms that could not be interlocked, so the caller can say so. */
  skipped: string[]
}

export function buildGrid(terms: GridTerm[], seed: number, max = 15): Grid
```

**How it places.** Longest word first, laid across the middle. Each next word
is tried against every already-placed word at every shared letter; the first
placement that fits without an illegal touch is taken. A word that fits nowhere
is skipped rather than floated unconnected — a crossword whose words do not
cross is a word list.

**What "fits" means**, stated because it is what makes a crossword legible
rather than a jumble:

- the crossing letters must match;
- no square may be occupied by a different letter;
- a placed word may not run immediately alongside another parallel word, which
  would create unintended two-letter words down every column it touches;
- the squares immediately before and after a word must be empty, or it silently
  extends a neighbour into a word nobody clued.

**The grid is cropped** to what was used, so a puzzle of eight short terms is a
small board rather than a large mostly-empty one. That is the "not huge"
requirement, met by construction rather than by a magic number.

**Determinism** comes from the seed choosing the shuffle of candidate terms and
nothing else; placement itself is a deterministic scan.

## 2 · Playing

The grid, numbered in the usual way, with clues listed **Across** and **Down**.
Typing fills the current word; arrow keys and tab move; a square shared by two
words belongs to both.

- **Check** marks wrong letters, and can be pressed as often as wanted. It is a
  study tool, not an exam: hiding whether you are right helps nobody learn a
  vocabulary.
- **Reveal a word** for one that will not come, so a single unknown term cannot
  strand the whole puzzle.
- Finishing says how long it took and how many were revealed — separately,
  because a puzzle finished by revealing everything is not the same as one
  solved, and one number would hide that.

Progress is kept under `synapse.termgrid.` so a puzzle survives a reload, and
that prefix goes into `stateOwnership.ts` **and** its hand-maintained Swift
port.

## 3 · With a friend

**Share this puzzle** copies a link carrying the seed and the category. Opening
it builds the identical grid. When both have finished they can compare times —
shared by sending, not by a server that watches.

## 4 · Verification

**Unit** — `src/data/crossword.test.ts`, the centre of the slice:

- the same seed and terms produce an identical grid, twice
- a different seed produces a different arrangement of the same terms
- every placed word after the first crosses at least one other
- letters at every crossing agree between the two words that share the square
- no two words overlap illegally, and none runs immediately parallel to another
- the grid is cropped to its used bounds
- at most `max` words are placed, and terms that cannot be interlocked are
  reported in `skipped` rather than dropped silently
- fewer than eight usable terms is refused rather than yielding a thin puzzle
- numbering runs left to right, top to bottom, and a square starting both an
  across and a down word carries one number

**In the browser:** build a grid from a taxonomy category, type into it, check,
reveal a word, finish; open a shared link and confirm the identical grid.

Nothing here needs a database or a server.
