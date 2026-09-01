import { useCallback } from 'react'
import { usePersistentState } from './usePersistentState'

const TERM_GRID_STORAGE_KEY = 'nishany.termgrid.progress.v1'

/**
 * One puzzle's progress: what a student typed, and which words they gave up
 * on and had shown to them instead.
 *
 * `revealedWords` is kept apart from `letters` for the same reason
 * `EssayAnswer.revealed` is kept apart from `ticked` in `useEssayAnswers` — a
 * puzzle finished by revealing every word is not one the student solved, and
 * the page reports those two outcomes apart. Folding a reveal into `letters`
 * would erase that distinction: a revealed word and a correctly typed one
 * would leave the same letters behind.
 */
export interface TermGridProgress {
  /** Typed letters, keyed however the board addresses a cell (e.g. "row,column"). */
  letters: Record<string, string>
  /** Terms shown outright rather than filled in by the student. */
  revealedWords: string[]
  startedAt: string
  finishedAt: string | null
}

const emptyProgress = (): TermGridProgress => ({
  letters: {},
  revealedWords: [],
  startedAt: new Date().toISOString(),
  finishedAt: null,
})

/**
 * Identify one puzzle by the seed that generated its grid and the category the
 * terms were drawn from.
 *
 * The seed alone is not enough: `buildGrid` (`src/data/crossword.ts`) is a
 * pure function of its inputs, so two categories sharing the same seed number
 * would otherwise land on one progress record and each would appear to
 * overwrite the other's grid.
 */
export function termGridPuzzleId(category: string, seed: number): string {
  return `${category}:${seed}`
}

/**
 * Read and add to a student's term grid puzzles.
 *
 * One flat document holding every puzzle touched, keyed by
 * `termGridPuzzleId` — matching how `useEssayAnswers` keeps one document
 * across every question rather than a key per record: a puzzle is edited in
 * place as the student fills it in, not appended to as a log. This store
 * holds only letters and reveals; it has no notion of rows, columns, or how a
 * grid is laid out.
 */
export function useTermGrid() {
  const [puzzles, setPuzzles] = usePersistentState<Record<string, TermGridProgress>>(
    TERM_GRID_STORAGE_KEY,
    {},
  )

  // Idempotent: a puzzle already in progress keeps its original startedAt
  // rather than restarting the clock every time the page is opened again.
  const start = useCallback((puzzleId: string) => {
    setPuzzles((current) => {
      if (current[puzzleId]) return current
      return { ...current, [puzzleId]: emptyProgress() }
    })
  }, [setPuzzles])

  const setLetter = useCallback((puzzleId: string, cell: string, letter: string) => {
    setPuzzles((current) => {
      const existing = current[puzzleId] ?? emptyProgress()
      return {
        ...current,
        [puzzleId]: { ...existing, letters: { ...existing.letters, [cell]: letter } },
      }
    })
  }, [setPuzzles])

  const revealWord = useCallback((puzzleId: string, term: string) => {
    setPuzzles((current) => {
      const existing = current[puzzleId] ?? emptyProgress()
      if (existing.revealedWords.includes(term)) return current
      return {
        ...current,
        [puzzleId]: { ...existing, revealedWords: [...existing.revealedWords, term] },
      }
    })
  }, [setPuzzles])

  // Idempotent for the same reason as `start`: finishing an already-finished
  // puzzle again must not push its finishedAt later.
  const finish = useCallback((puzzleId: string) => {
    setPuzzles((current) => {
      const existing = current[puzzleId]
      if (!existing || existing.finishedAt) return current
      return {
        ...current,
        [puzzleId]: { ...existing, finishedAt: new Date().toISOString() },
      }
    })
  }, [setPuzzles])

  return { puzzles, start, setLetter, revealWord, finish }
}
