# Library by module and by year — verification record

Date: 2026-08-21
Branch: `claude/media-library-user-hierarchy-42f2c5`
Plan: `docs/superpowers/plans/2026-08-21-library-by-module-and-year.md`

## What was verified here, and what could not be

No database and no Supabase session in this worktree. Everything checkable
without a backend was checked; the per-scope refusal needs a real reviewer
session and **is not claimed as passing**.

## Automated suites

| Command | Result |
|---|---|
| `npm test` | **1104 passed, 0 failed** (1096 before this phase — 8 new) |
| `cd server && npm test` | **213 passed, 0 failed** (202 before — 11 new) |
| `npm run build` | **succeeds**, no TypeScript errors |
| `npm run lint` | **0 errors** |

New: `libraryTrees` on both sides, with parity on scope parsing; scope tests for
the `libraryTree` kind; and four merge tests covering the reviewer path
end to end.

## The enforcement, proved in tests

`server/src/stateMerge.test.js`:

- A reviewer scoped to `OMS_Y2` may write `year:OMS_Y2`, and writing
  `year:OMS_Y4` is refused with the item named.
- Restructuring a tree requires the Library Setup tab; holding Questions Setup
  is not enough.
- Two reviewers restructuring **different** years both keep their work.
- Two restructuring **the same** year collide by name rather than one silently
  overwriting the other.

This is the check that was impossible for the generated taxonomy, whose nodes
carry no module or year — the reason `Systems & Topics` stayed editor-only in the
role hierarchy. A tree's key *is* its placement, so the answer is exact.

## Static sweeps

```
grep -rn "Curriculum mapping is ready|'curriculum'" src/
```

No library view matches. The remaining hits are unrelated: calendar layers
(`'curriculum' | 'personal'`) and the taxonomy overlay tab.

## Verified in a running browser (demo mode)

| Check | Result |
|---|---|
| Library Setup shows a **Library structure** panel | pass |
| The scope picker lists every module and year | pass — 115, grouped by university and year |
| A scope with no tree says so and offers to start one | pass — "No structure has been built for Year 2 yet." |
| Adding a top-level heading persists under its scope key | pass — `{"trees":{"year:KAU_Y2":[{"id":"ltn-…","title":"Anatomy"}]}}` |
| The library shows **six** views | pass — Systems & General, By Discipline, Clinical Skills, Clinical Knowledge, By Module, By Year |
| The "Curriculum mapping is ready" panel is gone | pass |
| By Year lists the student's own year first, marked | pass — "KAU · Year 3 **yours**" sorted to the top |
| Other universities' years stay reachable | pass — somebody revising ahead is not walled out |
| A tree built in the admin renders in the student view | pass — the `Anatomy` node appears under KAU · Year 2 |

## Outstanding — requires a running backend

**Not run.**

1. **The per-scope refusal, end to end.** As a reviewer assigned `OMS_Y2`,
   restructure `year:OMS_Y2` (expect 200) and `year:OMS_Y4` (expect **403** with
   the tree named in `refusals`).
2. **Two sessions.** Two console accounts restructuring different years both
   keep their work; the same year reports the collision.
3. **Filing across placements.** An article filed in a module tree still appears
   under Systems and opens the same reader from both.

## Notes

- A tree is an **additional placement**. Nothing is moved out of the Systems
  library, so an empty module tree hides nothing — the student view says as much
  in words rather than rendering a blank list.
- A filed article that no longer resolves shows as broken **in the admin editor**
  and renders as nothing in the student view. A reviewer can act on it; a student
  cannot, and showing them a dangling id would be noise.
- Nothing here resolves against the generated taxonomy. A node called "Anatomy"
  in a module tree has no relationship to the Anatomy division node, by design.
