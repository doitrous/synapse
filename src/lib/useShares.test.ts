import test from 'node:test'
import assert from 'node:assert/strict'

/**
 * `useShares.ts` (like `useStudyRooms.ts` and `useChallenges.ts`) imports
 * `./api`, which imports both extensionless specifiers and the `@/` alias —
 * fine for Vite, but `node --test --experimental-strip-types` resolves
 * neither, and `node:test`'s `mock.module` cannot rescue an unresolvable
 * specifier: it only intercepts one that already resolves. None of the four
 * hooks in this task can be imported under this repo's plain-node test
 * runner, and `./api` is outside this task's file scope to fix.
 *
 * So this mirrors the guard instead of importing it: `patchShare`'s
 * compare-and-restore rollback in `useShares.ts` (and its twins,
 * `rollbackRoom` in `useStudyRooms.ts` and `rollbackChallenge` in
 * `useChallenges.ts`) all reduce to this same shape — snapshot the field
 * before mutating it, and on failure restore it only if nothing else has
 * since moved it on. Reproduced verbatim (not re-derived) so a change to the
 * real guard's logic is a change to this test's expected behaviour too.
 */

interface Item {
  id: string
  starred: boolean
  starCount: number
}

function patchItem(list: Item[], id: string, patch: (item: Item) => Item): { list: Item[]; before: Item | null } {
  const index = list.findIndex((entry) => entry.id === id)
  if (index === -1) return { list, before: null }
  const before = list[index]
  const next = list.slice()
  next[index] = patch(before)
  return { list: next, before }
}

/** The exact guard used by `setShareStar`/`setShareFollow` in useShares.ts. */
function rollbackStar(list: Item[], id: string, targetStarred: boolean, before: Item): Item[] {
  return patchItem(list, id, (item) => (item.starred === targetStarred ? { ...item, starred: before.starred, starCount: before.starCount } : item)).list
}

test('setShareStar-style rollback: undoes on failure when nothing else has changed the field', () => {
  const before: Item = { id: 's1', starred: false, starCount: 3 }
  let list: Item[] = [before]

  // Optimistic apply, as setShareStar does before awaiting the network.
  ;({ list } = patchItem(list, 's1', (item) => ({ ...item, starred: true, starCount: item.starCount + 1 })))
  assert.deepEqual(list[0], { id: 's1', starred: true, starCount: 4 }, 'optimistic star applies immediately')

  // The request fails: roll back.
  list = rollbackStar(list, 's1', true, before)
  assert.deepEqual(list[0], before, 'a failed star reverts to the pre-click value with no data loss')
})

test('setShareStar-style rollback: does NOT clobber a newer value that already superseded it', () => {
  const before: Item = { id: 's1', starred: false, starCount: 3 }
  let list: Item[] = [before]

  // First click: star.
  ;({ list } = patchItem(list, 's1', (item) => ({ ...item, starred: true, starCount: item.starCount + 1 })))
  // Before the first request's failure is handled, a second click un-stars it
  // — this is the overlapping-operations race the task calls out.
  ;({ list } = patchItem(list, 's1', (item) => ({ ...item, starred: false, starCount: item.starCount - 1 })))
  assert.deepEqual(list[0], before, 'the second click already returned the item to its starting value')

  // The first request's failure arrives last. Its own rollback target was
  // `starred: true`, which is no longer what the item reads — the guard must
  // leave the (already-correct, newer) value alone rather than re-applying
  // the first click's stale snapshot on top of it.
  list = rollbackStar(list, 's1', true, before)
  assert.deepEqual(list[0], before, 'the stale rollback is a no-op once a newer click has already moved the field')
})

test('setShareStar-style rollback: reconciling a success overwrites the optimistic guess outright', () => {
  const before: Item = { id: 's1', starred: false, starCount: 3 }
  let list: Item[] = [before]
  ;({ list } = patchItem(list, 's1', (item) => ({ ...item, starred: true, starCount: item.starCount + 1 })))

  // The server's authoritative reply — e.g. someone else starred it too in
  // the meantime, so the real count is ahead of the optimistic guess.
  const serverTruth: Item = { id: 's1', starred: true, starCount: 6 }
  ;({ list } = patchItem(list, 's1', () => serverTruth))
  assert.deepEqual(list[0], serverTruth, 'a successful reply always wins over the optimistic guess')
})
