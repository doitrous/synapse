import type { AttemptRecord } from './attempts.ts'
import type { PracticalProgress } from './practicalProgress.ts'

/**
 * "Missed" for the practical bank.
 *
 * The MCQ bank can say this in one word — an answer was wrong — because every
 * MCQ is marked against a key. Nothing in the practical bank is. So the rule
 * below is written out of what the student's own record actually contains,
 * rather than out of a score that does not exist:
 *
 * - **OSCE station.** `stations[id]` holds the best marks the student ticked
 *   themselves and the total those marks were out of. It holds no pass mark —
 *   nothing in the authoring model carries one — so a station counts as missed
 *   when its best run is **below half marks**. Half is stated here, once, as
 *   `STATION_PASS_SHARE`; when stations gain an authored pass mark this is the
 *   one line that changes.
 * - **Clinical case.** `cases[id]` records only how far through the decisions
 *   the student got, never whether a decision was right — but each decision is
 *   written to the attempt log as `surface: 'case'`, `itemId: '<caseId>:<n>'`,
 *   with a real `correct`. So a case is missed when **any of its decisions was
 *   answered wrongly**, or when it was **started and left unfinished** (there
 *   is work outstanding on it either way).
 * - **Lab & imaging set.** Same shape: `labs[id].done` counts questions
 *   *answered*, not questions right, so wrongness is read from the log
 *   (`surface: 'lab'`, `itemId: '<setId>:<n>'`). Missed when **any question in
 *   it was answered wrongly**, or when it was **started and left unfinished**.
 *
 * An item the catalogue no longer holds is never returned: a withdrawn station
 * cannot be sat, and offering it would be offering a dead end.
 */

/** A station below this share of its own mark total counts as missed. */
export const STATION_PASS_SHARE = 0.5

/** The shape this needs out of the practical catalogue — id and which list it came from. */
export interface PracticalCatalogueEntry {
  id: string
  kind: 'osce' | 'case' | 'lab'
}

/** Records belonging to one practical item, whatever index they carry. */
function recordsFor(records: AttemptRecord[], surface: 'case' | 'lab', id: string): AttemptRecord[] {
  const prefix = `${id}:`
  return records.filter((record) => (
    record.surface === surface && (record.itemId === id || record.itemId.startsWith(prefix))
  ))
}

function anyWrong(records: AttemptRecord[]): boolean {
  return records.some((record) => record.correct === false)
}

/**
 * The practical items this student's own record says did not go well.
 *
 * Ordered by when the item was last worked on, most recent first — the same
 * order the flagged list uses, so the two groups read as one page.
 */
export function missedPracticalIds(
  progress: PracticalProgress,
  catalogue: PracticalCatalogueEntry[],
  /** The attempt log. Optional: without it, only stations and unfinished work are found. */
  records: AttemptRecord[] = [],
): string[] {
  const missed: { id: string; at: string }[] = []

  for (const entry of catalogue) {
    if (entry.kind === 'osce') {
      const station = progress.stations?.[entry.id]
      if (!station || !station.outOf) continue
      if (station.bestMarks / station.outOf < STATION_PASS_SHARE) missed.push({ id: entry.id, at: station.lastAt })
      continue
    }

    if (entry.kind === 'case') {
      const attempt = progress.cases?.[entry.id]
      const wrong = anyWrong(recordsFor(records, 'case', entry.id))
      // `lastStep > 0` and not completed: started, and there is more of it left.
      const unfinished = Boolean(attempt) && attempt!.status !== 'completed' && attempt!.lastStep > 0
      if (attempt && (wrong || unfinished)) missed.push({ id: entry.id, at: attempt.lastAt })
      continue
    }

    const set = progress.labs?.[entry.id]
    if (!set || set.done <= 0) continue
    const wrong = anyWrong(recordsFor(records, 'lab', entry.id))
    const unfinished = set.done < set.items
    if (wrong || unfinished) missed.push({ id: entry.id, at: set.lastAt })
  }

  return missed
    .sort((a, b) => ((b.at ?? '').localeCompare(a.at ?? '') || a.id.localeCompare(b.id)))
    .map((entry) => entry.id)
}

/** When one practical item was last worked on, or null if it never was. */
export function practicalLastAt(progress: PracticalProgress, id: string): string | null {
  return progress.stations?.[id]?.lastAt ?? progress.cases?.[id]?.lastAt ?? progress.labs?.[id]?.lastAt ?? null
}
