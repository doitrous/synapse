import { seededRandom, shuffle } from './seededRandom.ts'

/**
 * A mixed sitting: one queue drawn from the three banks at once.
 *
 * The three banks each have a runner of their own and none of them knows about
 * the others, so the sitting cannot live inside any one of them. What is shared
 * is only this: which items were drawn, which one is on screen, and what came
 * back from each. Everything here is pure so the draw can be tested without a
 * DOM — the runner is the only part that needs React.
 */

/** Which bank an item was drawn from. Also the runner it dispatches to. */
export type MixedKind = 'mcq' | 'practical' | 'essay'

/** The order the banks are offered, dealt to, and reported in. */
export const MIXED_KINDS: readonly MixedKind[] = ['mcq', 'practical', 'essay']

/** One queued item: the bank it came from, and its id inside that bank. */
export interface MixedItem {
  kind: MixedKind
  id: string
}

/** How many items each bank contributes — or, as `available`, could contribute. */
export type MixedSplit = Record<MixedKind, number>

/** The ids each bank can currently draw from, already filtered by the builder. */
export type MixedPools = Record<MixedKind, string[]>

/**
 * What came back from one item.
 *
 * `correct` is only ever a boolean for an MCQ. A practical is ticked by the
 * student against a mark scheme and an essay is self-marked, so neither makes
 * an accuracy claim — the same reason `AttemptRecord.correct` is nullable.
 */
export interface MixedOutcome {
  visited: true
  correct?: boolean
}

export interface MixedSession {
  /** Drives the draw, so the same sitting rebuilds identically after a reload. */
  seed: number
  items: MixedItem[]
  /** How far through the queue the student is. `items.length` means finished. */
  cursor: number
  /** Epoch milliseconds, for the one figure the summary reports across banks. */
  startedAt: number
  /**
   * When the sitting stopped, once it has.
   *
   * A cursor past the end says the queue ran out; it does not say the student
   * has been shown the report. That distinction is what keeps a document left
   * behind by a closed tab from taking the page over: a sitting that arrives
   * already closed is finished business, not a report waiting to be read, and
   * the hub clears it instead of rendering it. See `mixedClosed`.
   */
  finishedAt?: number
  /** Keyed by `itemKey` — filled as the queue advances. */
  results: Record<string, MixedOutcome>
}

/** The most items one mixed sitting can hold. */
export const MAX_MIXED_ITEMS = 40

/** Stable key for one queued item, unique across the three id spaces. */
export function itemKey(item: MixedItem): string {
  return `${item.kind}:${item.id}`
}

export function emptySplit(): MixedSplit {
  return { mcq: 0, practical: 0, essay: 0 }
}

export function splitTotal(split: MixedSplit): number {
  return MIXED_KINDS.reduce((sum, kind) => sum + Math.max(0, split[kind]), 0)
}

/** No bank may be asked for more than it holds, and nothing may go negative. */
export function clampSplit(split: MixedSplit, available: MixedSplit): MixedSplit {
  const out = emptySplit()
  for (const kind of MIXED_KINDS) {
    out[kind] = Math.max(0, Math.min(Math.floor(split[kind] || 0), Math.max(0, available[kind])))
  }
  return out
}

/**
 * An even split of `total` across the banks, dealt one at a time.
 *
 * Dealing round by round rather than dividing by three is what makes it behave
 * when a bank runs dry: a bank with two items left takes two and the rest of
 * the round goes to the banks that can still take one, instead of the builder
 * offering a split it cannot fill.
 */
export function balancedSplit(total: number, available: MixedSplit): MixedSplit {
  const out = emptySplit()
  let left = Math.max(0, Math.floor(total || 0))
  let dealt = true
  while (left > 0 && dealt) {
    dealt = false
    for (const kind of MIXED_KINDS) {
      if (left === 0) break
      if (out[kind] >= Math.max(0, available[kind])) continue
      out[kind] += 1
      left -= 1
      dealt = true
    }
  }
  return out
}

/**
 * The queue itself.
 *
 * Each bank is shuffled and cut to its share, then the three shares are
 * shuffled together so a student does not get "all the MCQs, then all the
 * stations". Both draws come from one seeded stream, so a seed names a queue.
 */
export function buildMixedQueue(pools: MixedPools, split: MixedSplit, seed: number): MixedItem[] {
  const random = seededRandom(seed)
  const picked: MixedItem[] = []
  for (const kind of MIXED_KINDS) {
    const pool = pools[kind] ?? []
    const take = Math.max(0, Math.min(Math.floor(split[kind] || 0), pool.length))
    // The shuffle is drawn for every bank, empty share or not, so adding a
    // bank with nothing selected cannot shift the draw of the others.
    const drawn = shuffle(pool, random)
    for (const id of drawn.slice(0, take)) picked.push({ kind, id })
  }
  return shuffle(picked, random)
}

export function startMixedSession(items: MixedItem[], seed: number, startedAt: number): MixedSession {
  return { seed, items, cursor: 0, startedAt, results: {} }
}

export function currentMixedItem(session: MixedSession): MixedItem | null {
  return session.items[session.cursor] ?? null
}

export function mixedFinished(session: MixedSession): boolean {
  return session.cursor >= session.items.length
}

/**
 * A sitting that has been stopped, and whose report has therefore been shown.
 *
 * Distinct from `mixedFinished` on purpose. The runner asks "is the queue out
 * of items"; the page asks "is this document still this visit's business". A
 * closed document found at mount belongs to a visit that has ended — the tab
 * was closed on the report, or the write that cleared it never flushed — and
 * rendering its report again would put the student in front of a screen they
 * cannot leave, because the only way out of it is the button they already
 * pressed.
 */
export function mixedClosed(session: MixedSession | null | undefined): boolean {
  return typeof session?.finishedAt === 'number'
}

/** Record what the item on screen produced, without moving off it. */
export function markMixed(session: MixedSession, outcome: Omit<MixedOutcome, 'visited'>): MixedSession {
  const item = currentMixedItem(session)
  if (!item) return session
  return {
    ...session,
    results: { ...session.results, [itemKey(item)]: { visited: true, ...outcome } },
  }
}

/**
 * Move to the next item.
 *
 * An item left without a mark still counts as visited: a station that was
 * exited early was worked on, and the summary would otherwise report a sitting
 * of six as a sitting of four.
 */
export function advanceMixed(session: MixedSession): MixedSession {
  const item = currentMixedItem(session)
  if (!item) return session
  const key = itemKey(item)
  const results = session.results[key]
    ? session.results
    : { ...session.results, [key]: { visited: true as const } }
  return { ...session, cursor: session.cursor + 1, results }
}

/**
 * Stop the sitting where it stands and stamp when.
 *
 * Through `advanceMixed` first, so the item that was on screen when the student
 * stopped is filed as visited like every other one — jumping the cursor
 * straight to the end reported a sitting of three, stopped on item two, as one
 * item reached.
 */
export function finishMixed(session: MixedSession, at: number): MixedSession {
  const advanced = advanceMixed(session)
  return { ...advanced, cursor: advanced.items.length, finishedAt: at }
}

/** One bank's line in the summary. */
export interface MixedBankTally {
  kind: MixedKind
  /** How many items of this kind the queue held. */
  total: number
  /** How many of them the student reached. */
  visited: number
  /** How many were marked against a key — MCQs only. */
  marked: number
  correct: number
}

export interface MixedTally {
  banks: MixedBankTally[]
  total: number
  visited: number
  marked: number
  correct: number
}

export function summariseMixed(session: MixedSession): MixedTally {
  const banks = MIXED_KINDS.map((kind) => {
    const items = session.items.filter((item) => item.kind === kind)
    const outcomes = items.map((item) => session.results[itemKey(item)]).filter(Boolean) as MixedOutcome[]
    const marked = outcomes.filter((outcome) => typeof outcome.correct === 'boolean')
    return {
      kind,
      total: items.length,
      visited: outcomes.length,
      marked: marked.length,
      correct: marked.filter((outcome) => outcome.correct).length,
    }
  })
  return {
    banks,
    total: banks.reduce((sum, bank) => sum + bank.total, 0),
    visited: banks.reduce((sum, bank) => sum + bank.visited, 0),
    marked: banks.reduce((sum, bank) => sum + bank.marked, 0),
    correct: banks.reduce((sum, bank) => sum + bank.correct, 0),
  }
}
