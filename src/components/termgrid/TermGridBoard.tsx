import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Eye } from 'lucide-react'
import { normalizeTermGridAnswer, normalizeTermGridLetter, type Grid, type GridDirection, type PlacedWord } from '@/data/crossword'
import { IconButton } from '@/components/ui/IconButton'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const cellKey = (row: number, column: number) => `${row},${column}`

interface CellInfo {
  row: number
  column: number
  /** The letter that belongs here, for correctness checking and reveal. */
  letter: string
  /** The clue number printed in this square's corner, if it starts a word. */
  number?: number
  /** The word(s) running through this square — one, or two where they cross. */
  words: Partial<Record<GridDirection, PlacedWord>>
}

/** Index every square once, keyed by "row,column", from the placed words. */
function buildCells(grid: Grid): Map<string, CellInfo> {
  const cells = new Map<string, CellInfo>()
  for (const word of grid.words) {
    for (let i = 0; i < word.term.length; i++) {
      const row = word.direction === 'down' ? word.row + i : word.row
      const column = word.direction === 'across' ? word.column + i : word.column
      const at = cellKey(row, column)
      const existing = cells.get(at)
      if (existing) {
        existing.words[word.direction] = word
        if (i === 0) existing.number = word.number
      } else {
        cells.set(at, {
          row,
          column,
          letter: word.term[i],
          number: i === 0 ? word.number : undefined,
          words: { [word.direction]: word },
        })
      }
    }
  }
  return cells
}

interface Selection {
  row: number
  column: number
  direction: GridDirection
}

/**
 * Which word a square defaults to when nothing else decides — a click on a
 * square nobody has visited yet, or an accessible name for it.
 *
 * A square carries one printed number, but that number belongs to whichever
 * word(s) actually *start* there — a crossing word that merely passes through
 * keeps the number of wherever it started, earlier in the grid. Defaulting to
 * "across, if there is one" ignores that: a square numbered 9 because a Down
 * word starts there, with an Across word only crossing it mid-word, would
 * describe itself as the Across clue and leave the printed "9" pointing at
 * the wrong clue for anyone using a screen reader.
 */
function defaultDirectionFor(info: CellInfo): GridDirection {
  if (info.number !== undefined) {
    if (info.words.across?.number === info.number) return 'across'
    if (info.words.down?.number === info.number) return 'down'
  }
  return info.words.across ? 'across' : 'down'
}

export interface TermGridBoardProps {
  grid: Grid
  /** Typed letters, keyed "row,column" — the same shape `useTermGrid` persists. */
  letters: Record<string, string>
  onLetterChange: (cell: string, letter: string) => void
  revealedWords: string[]
  /** Whole answers prefilled by the puzzle, not counted as reveals. */
  givenWords?: string[]
  onRevealWord: (term: string) => void
  /** Whether wrong letters are currently flagged — toggled by the page's Check action. */
  showErrors: boolean
  /** Locks every square, once the puzzle is finished. */
  disabled?: boolean
}

/**
 * A crossword: a numbered grid of single-letter inputs, with its clues listed
 * Across and Down beside it.
 */
export function TermGridBoard({
  grid,
  letters,
  onLetterChange,
  revealedWords,
  givenWords = [],
  onRevealWord,
  showErrors,
  disabled = false,
}: TermGridBoardProps) {
  const t = useT()
  const cells = useMemo(() => buildCells(grid), [grid])
  const revealedSet = useMemo(() => new Set(revealedWords), [revealedWords])
  const givenSet = useMemo(() => new Set(givenWords), [givenWords])

  // Clue order: across first, then down, each ascending by number. This is the
  // order both clue lists render in and the order Tab walks.
  const acrossWords = useMemo(
    () => grid.words.filter((w) => w.direction === 'across').sort((a, b) => a.number - b.number),
    [grid],
  )
  const downWords = useMemo(
    () => grid.words.filter((w) => w.direction === 'down').sort((a, b) => a.number - b.number),
    [grid],
  )
  const clueOrder = useMemo(() => [...acrossWords, ...downWords], [acrossWords, downWords])

  const [selected, setSelected] = useState<Selection | null>(null)
  // A puzzle change (new category, new seed) starts the selection over at the
  // first clue rather than pointing at a square from the puzzle before it.
  useEffect(() => {
    setSelected(clueOrder.length > 0 ? { row: clueOrder[0].row, column: clueOrder[0].column, direction: clueOrder[0].direction } : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid])

  // Mirrors `selected` for handlers that need the value *before* this same
  // event's own state update — see handleCellClick below.
  const selectedRef = useRef(selected)
  useEffect(() => { selectedRef.current = selected }, [selected])

  const inputs = useRef<Map<string, HTMLInputElement>>(new Map())
  const registerInput = useCallback(
    (at: string) => (node: HTMLInputElement | null) => {
      if (node) inputs.current.set(at, node)
      else inputs.current.delete(at)
    },
    [],
  )
  const focusCell = useCallback((row: number, column: number) => {
    inputs.current.get(cellKey(row, column))?.focus()
  }, [])

  const wordFor = useCallback(
    (row: number, column: number, direction: GridDirection): PlacedWord | undefined => cells.get(cellKey(row, column))?.words[direction],
    [cells],
  )

  const isRevealed = useCallback(
    (row: number, column: number): boolean => {
      const info = cells.get(cellKey(row, column))
      if (!info) return false
      return Object.values(info.words).some((word) => word && (revealedSet.has(word.term) || givenSet.has(word.term)))
    },
    [cells, revealedSet, givenSet],
  )

  const givenLetterAt = useCallback(
    (row: number, column: number): string => {
      const info = cells.get(cellKey(row, column))
      if (!info) return ''
      const word = Object.values(info.words).find((entry) => entry && givenSet.has(entry.term))
      return word ? info.letter : ''
    },
    [cells, givenSet],
  )

  /**
   * Click a square: select the word it belongs to. Click the *same* square
   * again: switch to the word crossing it there, if one does.
   *
   * Reads `selectedRef` rather than `selected` directly, because a click also
   * fires a native focus first; if this handler read the state variable it
   * would see whatever a focus handler had just set it to, and "the same
   * square again" could never be detected. There is deliberately no `onFocus`
   * selection handler for that same reason — only clicks and the keyboard
   * handlers below change the selection.
   */
  const handleCellClick = useCallback(
    (row: number, column: number) => {
      const info = cells.get(cellKey(row, column))
      if (!info) return
      const prev = selectedRef.current
      if (prev && prev.row === row && prev.column === column) {
        const crossing: GridDirection = prev.direction === 'across' ? 'down' : 'across'
        if (info.words[crossing]) setSelected({ row, column, direction: crossing })
        return
      }
      const direction: GridDirection = prev && info.words[prev.direction] ? prev.direction : defaultDirectionFor(info)
      setSelected({ row, column, direction })
    },
    [cells],
  )

  const handleChange = useCallback(
    (row: number, column: number, raw: string) => {
      const letter = normalizeTermGridLetter(raw)
      onLetterChange(cellKey(row, column), letter)
      if (!letter) return
      const direction = selectedRef.current?.direction ?? 'across'
      const word = wordFor(row, column, direction)
      if (!word) return
      const index = direction === 'across' ? column - word.column : row - word.row
      if (index + 1 < word.term.length) {
        const nextRow = direction === 'down' ? row + 1 : row
        const nextColumn = direction === 'across' ? column + 1 : column
        setSelected({ row: nextRow, column: nextColumn, direction })
        focusCell(nextRow, nextColumn)
      }
    },
    [onLetterChange, wordFor, focusCell],
  )

  const handlePaste = useCallback(
    (row: number, column: number, raw: string) => {
      const answer = normalizeTermGridAnswer(raw)
      if (!answer) return
      const direction = selectedRef.current?.direction ?? 'across'
      const word = wordFor(row, column, direction)
      if (!word) {
        onLetterChange(cellKey(row, column), answer.slice(-1))
        return
      }
      const startIndex = direction === 'across' ? column - word.column : row - word.row
      for (let i = 0; i < answer.length && startIndex + i < word.term.length; i++) {
        const nextIndex = startIndex + i
        const nextRow = direction === 'down' ? word.row + nextIndex : word.row
        const nextColumn = direction === 'across' ? word.column + nextIndex : word.column
        onLetterChange(cellKey(nextRow, nextColumn), answer[i])
      }
      const focusIndex = Math.min(word.term.length - 1, startIndex + answer.length)
      const nextRow = direction === 'down' ? word.row + focusIndex : word.row
      const nextColumn = direction === 'across' ? word.column + focusIndex : word.column
      setSelected({ row: nextRow, column: nextColumn, direction })
      focusCell(nextRow, nextColumn)
    },
    [focusCell, onLetterChange, wordFor],
  )

  const handleKeyDown = useCallback(
    (row: number, column: number, event: KeyboardEvent<HTMLInputElement>) => {
      const info = cells.get(cellKey(row, column))
      if (!info) return
      const direction = selectedRef.current?.direction ?? defaultDirectionFor(info)

      if (event.key === 'Tab') {
        // The DOM order of the squares is row-major, not clue order, so the
        // browser's own Tab traversal would jump around the grid rather than
        // walking the clue list. Own it instead.
        event.preventDefault()
        if (clueOrder.length === 0) return
        const current = wordFor(row, column, direction) ?? clueOrder[0]
        const index = clueOrder.findIndex((word) => word === current)
        const nextIndex = event.shiftKey
          ? (index - 1 + clueOrder.length) % clueOrder.length
          : (index + 1) % clueOrder.length
        const next = clueOrder[nextIndex]
        setSelected({ row: next.row, column: next.column, direction: next.direction })
        focusCell(next.row, next.column)
        return
      }

      if (event.key === 'Backspace') {
        if (letters[cellKey(row, column)]) {
          onLetterChange(cellKey(row, column), '')
          return
        }
        const word = wordFor(row, column, direction)
        if (!word) return
        const index = direction === 'across' ? column - word.column : row - word.row
        if (index > 0) {
          const prevRow = direction === 'down' ? row - 1 : row
          const prevColumn = direction === 'across' ? column - 1 : column
          onLetterChange(cellKey(prevRow, prevColumn), '')
          setSelected({ row: prevRow, column: prevColumn, direction })
          focusCell(prevRow, prevColumn)
        }
        return
      }

      // Arrow keys move one square in the grid's own coordinate space — see
      // the note on the grid container below for why that is fixed regardless
      // of reading direction.
      const moves: Record<string, [number, number]> = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
      }
      const move = moves[event.key]
      if (move) {
        event.preventDefault()
        const targetRow = row + move[0]
        const targetColumn = column + move[1]
        const target = cells.get(cellKey(targetRow, targetColumn))
        if (!target) return
        const nextDirection: GridDirection = target.words[direction] ? direction : defaultDirectionFor(target)
        setSelected({ row: targetRow, column: targetColumn, direction: nextDirection })
        focusCell(targetRow, targetColumn)
      }
    },
    [cells, clueOrder, letters, onLetterChange, wordFor, focusCell],
  )

  const activeWordFor = useCallback(
    (row: number, column: number): PlacedWord | undefined => {
      const info = cells.get(cellKey(row, column))
      if (!info) return undefined
      const direction: GridDirection =
        selected && selected.row === row && selected.column === column ? selected.direction : defaultDirectionFor(info)
      return info.words[direction]
    },
    [cells, selected],
  )

  const selectedWord = selected ? wordFor(selected.row, selected.column, selected.direction) : undefined

  const isInSelectedWord = useCallback(
    (row: number, column: number): boolean => {
      if (!selectedWord) return false
      const info = cells.get(cellKey(row, column))
      return info?.words[selectedWord.direction] === selectedWord
    },
    [cells, selectedWord],
  )

  const ariaLabelFor = useCallback(
    (info: CellInfo): string => {
      const word = activeWordFor(info.row, info.column)
      if (!word) return ''
      const directionLabel = word.direction === 'across' ? t('across') : t('down')
      return t('Row {row}, column {column}. {number} {direction}: {clue}')
        .replace('{row}', String(info.row + 1))
        .replace('{column}', String(info.column + 1))
        .replace('{number}', String(word.number))
        .replace('{direction}', directionLabel)
        .replace('{clue}', word.clue)
    },
    [activeWordFor, t],
  )

  const rows = Array.from({ length: grid.height }, (_, row) => row)
  const columns = Array.from({ length: grid.width }, (_, column) => column)

  const ClueList = ({ title, words }: { title: string; words: PlacedWord[] }) => (
    <div className="min-w-0 flex-1">
      <h3 className="mb-1.5 text-[12.5px] font-semibold text-ink-2">{title}</h3>
      <ol className="space-y-0.5">
        {words.map((word) => {
          const isSelected = selectedWord === word
          const revealed = revealedSet.has(word.term)
          const given = givenSet.has(word.term)
          return (
            <li key={`${word.direction}-${word.number}`} className="flex items-start gap-1">
              <button
                type="button"
                onClick={() => {
                  setSelected({ row: word.row, column: word.column, direction: word.direction })
                  focusCell(word.row, word.column)
                }}
                className={cn(
                  'min-w-0 flex-1 rounded-md px-2 py-1 text-start text-[12.5px] leading-snug transition-colors',
                  isSelected ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset hover:text-ink',
                  revealed && 'text-ink-3 line-through decoration-ink-3/60',
                  given && 'bg-primary-tint/35 text-primary-strong',
                )}
              >
                <span className="tnum font-mono font-semibold">{word.number}.</span> {word.clue}
                {given && <span className="ms-1 font-semibold">({t('given')})</span>}
              </button>
              <IconButton
                icon={Eye}
                label={t('Reveal this word')}
                size="sm"
                disabled={disabled || revealed || given}
                onClick={() => onRevealWord(word.term)}
                className="shrink-0"
              />
            </li>
          )
        })}
      </ol>
    </div>
  )

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="overflow-x-auto">
        {/*
          Every other surface in this app runs in logical (start/end) CSS
          properties so it mirrors correctly under Arabic. This grid does not:
          its columns are a coordinate space, not prose. Square 1 has to stay
          at the visual left and "across" has to keep running left-to-right no
          matter which language is active, or every clue number would point at
          the wrong cell. `dir="ltr"` here is deliberate, not a missed RTL pass.
        */}
        <div
          dir="ltr"
          className="inline-grid gap-px rounded-md border border-line bg-line p-px"
          style={{ gridTemplateColumns: `repeat(${grid.width}, 2rem)`, gridTemplateRows: `repeat(${grid.height}, 2rem)` }}
        >
          {rows.flatMap((row) =>
            columns.map((column) => {
              const info = cells.get(cellKey(row, column))
              if (!info) return <div key={cellKey(row, column)} className="size-8 bg-transparent" />

              const at = cellKey(row, column)
              const givenValue = givenLetterAt(row, column)
              const value = givenValue || (letters[at] ?? '')
              const wrong = showErrors && value !== '' && value !== info.letter
              const revealed = isRevealed(row, column)
              const given = givenValue !== ''
              const isSelectedCell = selected?.row === row && selected?.column === column
              const inWord = isInSelectedWord(row, column)

              return (
                <div key={at} className="relative size-8 bg-surface">
                  {info.number !== undefined && (
                    <span className="pointer-events-none absolute start-0.5 top-0 font-mono text-[8px] leading-none text-ink-3">
                      {info.number}
                    </span>
                  )}
                  <input
                    ref={registerInput(at)}
                    type="text"
                    inputMode="text"
                    autoCapitalize="characters"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    maxLength={1}
                    value={value}
                    disabled={disabled || revealed}
                    aria-label={ariaLabelFor(info)}
                    onFocus={(event) => event.currentTarget.select()}
                    onClick={() => handleCellClick(row, column)}
                    onChange={(event) => handleChange(row, column, event.target.value)}
                    onPaste={(event) => {
                      event.preventDefault()
                      if (disabled || given) return
                      handlePaste(row, column, event.clipboardData.getData('text'))
                    }}
                    onKeyDown={(event) => handleKeyDown(row, column, event)}
                    className={cn(
                      'size-8 border text-center font-mono text-[15px] font-semibold uppercase text-ink outline-none transition-colors',
                      'disabled:cursor-default',
                      wrong ? 'border-danger bg-danger-tint text-danger' : 'border-transparent',
                      !wrong && revealed && 'bg-success-tint/50 text-success',
                      !wrong && given && 'bg-primary-tint/60 text-primary-strong',
                      !wrong && !revealed && isSelectedCell && 'bg-primary-tint text-primary-strong ring-2 ring-inset ring-primary',
                      !wrong && !revealed && !isSelectedCell && inWord && 'bg-primary-tint/35',
                    )}
                  />
                </div>
              )
            }),
          )}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row lg:flex-col">
        <ClueList title={t('Across')} words={acrossWords} />
        <ClueList title={t('Down')} words={downWords} />
      </div>
    </div>
  )
}
