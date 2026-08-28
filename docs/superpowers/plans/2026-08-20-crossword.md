# Term Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a crossword out of the medical glossary — 8–15 terms interlocked, their definitions as clues — playable alone or against a friend on the identical grid.

**Architecture:** A pure, deterministic generator is the whole of the difficulty; the rest is a grid of inputs and a clue list. Sharing a puzzle is a link carrying a seed, not a server, so nothing here needs a database.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind v4. Tests: `node --test --experimental-strip-types "src/**/*.test.ts"`.

## Global Constraints

- Dependencies are installed. Do not run `npm install`. Add no dependency.
- `npx tsc -b` must stay green. `noUnusedLocals` is ON.
- **Every student-facing string goes through `useT()`.**
- **Logical CSS properties only**: `ps-`/`pe-`/`ms-`/`me-`/`start-`/`end-`. Never `pl-`/`pr-`/`left-`/`right-`. The app runs RTL in Arabic. **The grid itself is an exception worth stating**: a crossword's columns are a coordinate space, not a reading direction, and must not mirror in Arabic — build it with an explicit `dir="ltr"` on the board and say why in a comment.
- Tested modules import relatively with an explicit `.ts` extension — `node --test` cannot resolve `@/`. Type-only imports too.
- Comments explain **why**, not what.
- Commit messages are a plain sentence about what a person can now do. No `feat:`/`fix:` prefixes.
- **It is called Term Grid, never Scrabble** — that is a Hasbro/Mattel trademark.

---

### Task 1: The generator

The only real algorithm here. Pure, deterministic, no React, no storage, and **no `Math.random()`**.

**Files:**
- Create: `src/data/crossword.ts`
- Test: `src/data/crossword.test.ts`

**Interfaces:**
- Produces: `GridTerm`, `PlacedWord`, `Grid`, `MIN_TERMS`, `buildGrid`.

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildGrid, MIN_TERMS, type GridTerm, type Grid } from './crossword.ts'

const terms: GridTerm[] = [
  { term: 'ANTERIOR', clue: 'Toward the front' },
  { term: 'POSTERIOR', clue: 'Toward the back' },
  { term: 'SUPERIOR', clue: 'Above' },
  { term: 'INFERIOR', clue: 'Below' },
  { term: 'MEDIAL', clue: 'Toward the midline' },
  { term: 'LATERAL', clue: 'Away from the midline' },
  { term: 'PROXIMAL', clue: 'Nearer the trunk' },
  { term: 'DISTAL', clue: 'Further from the trunk' },
  { term: 'SUPINE', clue: 'Lying face up' },
  { term: 'PRONE', clue: 'Lying face down' },
]

/** Every square a grid actually uses, as "row,column" -> letter. */
function squares(grid: Grid): Map<string, string> {
  const used = new Map<string, string>()
  for (const word of grid.words) {
    for (let i = 0; i < word.term.length; i++) {
      const row = word.direction === 'down' ? word.row + i : word.row
      const column = word.direction === 'across' ? word.column + i : word.column
      used.set(`${row},${column}`, word.term[i])
    }
  }
  return used
}

test('the same seed and terms build the identical grid', () => {
  assert.deepEqual(buildGrid(terms, 42), buildGrid(terms, 42))
})

test('a different seed arranges them differently', () => {
  const a = JSON.stringify(buildGrid(terms, 1).words)
  const b = JSON.stringify(buildGrid(terms, 2).words)
  assert.notEqual(a, b)
})

test('letters agree wherever two words cross', () => {
  const grid = buildGrid(terms, 7)
  // squares() would silently overwrite a disagreement, so check as we build.
  const used = new Map<string, string>()
  for (const word of grid.words) {
    for (let i = 0; i < word.term.length; i++) {
      const row = word.direction === 'down' ? word.row + i : word.row
      const column = word.direction === 'across' ? word.column + i : word.column
      const key = `${row},${column}`
      const existing = used.get(key)
      if (existing !== undefined) assert.equal(existing, word.term[i], `disagreement at ${key}`)
      used.set(key, word.term[i])
    }
  }
})

test('every word after the first crosses another', () => {
  const grid = buildGrid(terms, 7)
  assert.ok(grid.words.length >= MIN_TERMS)
  const used = squares(grid)
  for (const word of grid.words.slice(1)) {
    const crossings = [...Array(word.term.length).keys()].filter((i) => {
      const row = word.direction === 'down' ? word.row + i : word.row
      const column = word.direction === 'across' ? word.column + i : word.column
      // A crossing is a square this word shares with a word running the other way.
      return grid.words.some((other) => other !== word && other.direction !== word.direction
        && coversSquare(other, row, column))
    })
    assert.ok(crossings.length > 0, `${word.term} crosses nothing`)
  }
  assert.ok(used.size > 0)
})

function coversSquare(word: { term: string; row: number; column: number; direction: 'across' | 'down' }, row: number, column: number) {
  for (let i = 0; i < word.term.length; i++) {
    const r = word.direction === 'down' ? word.row + i : word.row
    const c = word.direction === 'across' ? word.column + i : word.column
    if (r === row && c === column) return true
  }
  return false
}

test('the grid is cropped to the squares it uses', () => {
  const grid = buildGrid(terms, 3)
  const used = squares(grid)
  const rows = [...used.keys()].map((k) => Number(k.split(',')[0]))
  const columns = [...used.keys()].map((k) => Number(k.split(',')[1]))
  assert.equal(Math.min(...rows), 0)
  assert.equal(Math.min(...columns), 0)
  assert.equal(grid.height, Math.max(...rows) + 1)
  assert.equal(grid.width, Math.max(...columns) + 1)
})

test('no more than the maximum are placed', () => {
  const many = Array.from({ length: 40 }, (_, i) => ({ term: `TERM${i}`, clue: `Clue ${i}` }))
  assert.ok(buildGrid(many, 5, 12).words.length <= 12)
})

test('a term that cannot be interlocked is reported, not dropped in silence', () => {
  const grid = buildGrid([...terms, { term: 'XYZQW', clue: 'Shares no letter' }], 9)
  const placed = new Set(grid.words.map((w) => w.term))
  if (!placed.has('XYZQW')) assert.ok(grid.skipped.includes('XYZQW'))
})

test('too few usable terms is refused rather than made into a thin puzzle', () => {
  const grid = buildGrid(terms.slice(0, 3), 4)
  assert.equal(grid.words.length, 0)
  assert.equal(grid.skipped.length, 3)
})

test('numbering runs top to bottom, left to right', () => {
  const grid = buildGrid(terms, 11)
  const ordered = [...grid.words].sort((a, b) => a.row - b.row || a.column - b.column)
  let previous = 0
  for (const word of ordered) {
    assert.ok(word.number >= previous, 'numbers must not go backwards in reading order')
    previous = word.number
  }
})

test('a square starting both an across and a down word carries one number', () => {
  const grid = buildGrid(terms, 13)
  const starts = new Map<string, number[]>()
  for (const word of grid.words) {
    const key = `${word.row},${word.column}`
    starts.set(key, [...(starts.get(key) ?? []), word.number])
  }
  for (const [, numbers] of starts) {
    assert.equal(new Set(numbers).size, 1, 'one square, one number')
  }
})
```

- [ ] **Step 2: Run it and watch it fail**

`node --test --experimental-strip-types src/data/crossword.test.ts` — FAIL, cannot resolve `./crossword.ts`.

- [ ] **Step 3: Write the implementation**

`buildGrid(terms, seed, max = 15)`:

1. Normalise terms — uppercase, letters only; drop any with fewer than 3 letters or containing a space, and report them in `skipped`. A multi-word term cannot go in a crossword square.
2. If fewer than `MIN_TERMS` (8) survive, return an empty grid with them all in `skipped`. **Refusing is the requirement**, not a thin puzzle.
3. Shuffle deterministically from `seed` — a small LCG or xorshift written inline. **No `Math.random()` anywhere.**
4. Longest first: place it across at an origin with room to grow in both directions.
5. For each remaining word, scan every placed word and every shared letter, and take the first placement that `fits`.
6. Crop to the used bounds, so both minima become 0.
7. Number the start squares in reading order, one number per square.

`fits(placement, occupied)` must reject:
- a crossing whose letters disagree;
- any square already holding a different letter;
- a square immediately before or after the word being occupied — otherwise it silently extends a neighbour;
- a square directly alongside the word being occupied where that word is not itself crossing there — otherwise two parallel words create unintended two-letter words.

That last rule is what separates a crossword from a jumble; state that in the comment.

- [ ] **Step 4: Run it and watch it pass** — 10 tests. Then `npm test`.

- [ ] **Step 5: Commit**

```bash
git add src/data/crossword.ts src/data/crossword.test.ts
git commit -m "Lay medical terms out so they cross"
```

---

### Task 2: Where a puzzle lives

**Files:**
- Modify: `src/lib/stateOwnership.ts` + its test, `ios/Synapse/Core/Sync/StateOwnership.swift`
- Create: `src/lib/useTermGrid.ts`

- [ ] **Step 1** — add `/^synapse\.termgrid\./` to `USER_OWNED_PATTERNS` **and** `"^synapse\\.termgrid\\."` to the Swift port, matching its escaping exactly. That file says it must stay a direct port; a mismatch means the phone writes a student's work where the web never reads it, and nothing reports an error. Add a test for the key.

- [ ] **Step 2** — `useTermGrid` over `usePersistentState` on `synapse.termgrid.progress.v1`, keyed by puzzle id (the seed plus the category), holding: the letters typed, which words were revealed, when it was started, and when it was finished. A puzzle must survive a reload.

- [ ] **Step 3** — verify and commit.

```bash
git add src/lib src/lib/stateOwnership.test.ts ios/Synapse/Core/Sync/StateOwnership.swift
git commit -m "Keep a half-finished puzzle where it belongs"
```

---

### Task 3: Playing it

**Files:**
- Create: `src/components/termgrid/TermGridBoard.tsx`, `src/components/termgrid/TermGridPage.tsx`
- Modify: `src/router.tsx`, `src/components/shell/nav.ts`

- [ ] **Step 1: the board**

A numbered grid of single-letter inputs, clues listed **Across** and **Down**.

- Typing advances along the current word; **arrow keys** move a square; **Tab** moves to the next clue; clicking a square selects the word it belongs to, and clicking again switches to the crossing word.
- **`dir="ltr"` on the board.** A crossword's columns are a coordinate space, not a reading direction — mirroring it in Arabic would put square 1 on the right and break every clue number. The clue list around it stays in the reader's direction. Comment this; it looks like a mistake otherwise.
- Each input is a real `<input>` with an accessible name naming its square and its clue, so the puzzle is not mouse-only.

- [ ] **Step 2: the page**

Choose a category, build a grid, play it. **Check** marks wrong letters and can be pressed freely — this is study, not an exam. **Reveal a word** for one that will not come.

Finishing reports the time and the number revealed **separately**; a puzzle finished by revealing everything is not a puzzle solved, and one figure would hide that.

Fewer than eight usable terms in a category says so plainly rather than offering a thin puzzle.

- [ ] **Step 3: route and navigate**

`/app/term-grid` via `lazyNamed`, and a `studentNav` entry in the **Workspace** group: `{ label: 'Term Grid', to: '/app/term-grid', icon: Grid3x3 }`. **Confirm the icon exists in `lucide-react` at runtime** — a missing export is a blank page, not a type error.

- [ ] **Step 4** — `npx tsc -b`, `npm test`.

  Browser: **check `document.hidden` first**; if the pane is closed say so and verify by DOM query rather than claiming you looked. Build a grid, type into it, check, reveal, finish.

```bash
git add src/components/termgrid src/router.tsx src/components/shell/nav.ts
git commit -m "Solve a grid of medical terms"
```

---

### Task 4: From the taxonomy, and with a friend

**Files:**
- Modify: `src/pages/student/MedicalTaxonomy.tsx`, `src/components/termgrid/TermGridPage.tsx`, `src/pages/student/StudyTogether.tsx`

- [ ] **Step 1** — a **Play these as a grid** control on the Medical Taxonomy, building a puzzle from the terms in the current filter and routing to it with the category and a fresh seed in the URL. Say how many terms went in; refuse under eight with a plain reason.

- [ ] **Step 2** — **Share this puzzle** copies a link carrying the seed and category. Opening it builds the identical grid — that is what the generator's determinism is for, and it is why this needs no server.

- [ ] **Step 3** — an entry in **Study Together** offering a grid to play against a friend, alongside the existing tabs. It links to the same page with a fresh seed; there is no server round trip.

- [ ] **Step 4** — verify: open a shared link in a second tab and confirm the grid is identical square for square.

```bash
git add src/pages/student src/components/termgrid
git commit -m "Turn what you are reading into a puzzle, and send it to someone"
```

---

## Out of scope, deliberately

- **Scrabble.** A medical-only dictionary stalls it, and nothing can make a player form medical words. The name is also a Hasbro/Mattel trademark.
- **Live head-to-head.** A seed in a link gives both people the same puzzle with no server, no table, and nothing to be wrong about — which matters here, where no database has ever been reachable.
