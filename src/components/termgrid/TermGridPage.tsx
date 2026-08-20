import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Grid3x3, Copy, Check } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Field, Select } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Stat } from '@/components/ui/Stat'
import { useMedicalGlossary } from '@/data/glossaryStore'
import { buildGrid, MIN_TERMS, type GridTerm } from '@/data/crossword'
import { useTermGrid, termGridPuzzleId } from '@/lib/useTermGrid'
import { usePersistentState } from '@/lib/usePersistentState'
import { useT } from '@/lib/i18n'
import { TermGridBoard } from './TermGridBoard'

/**
 * Turns a category and a "how many times reshuffled" counter into a seed.
 *
 * The seed itself is never stored: `buildGrid` is a pure function of
 * (terms, seed), so the same category and the same generation number always
 * land on the same grid. Only the generation needs to persist, which keeps a
 * half-finished puzzle exactly where the student left it across a reload,
 * while "New puzzle" still has a way to move on to a different arrangement.
 */
function hashSeed(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) hash = (Math.imul(hash, 31) + input.charCodeAt(i)) | 0
  return hash
}

/** 75000ms → "1m 15s"; under a minute → "42s". */
function formatElapsed(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
}

/**
 * One puzzle, from build through finish. Keyed by the caller on
 * `${category}:${generation}` so switching category or pressing "New puzzle"
 * remounts this with fresh local state, the same way `EssayRunner` is keyed
 * on the question id.
 */
function TermGridPlayer({
  category,
  seed,
  terms,
  onReplay,
}: {
  category: string
  seed: number
  terms: GridTerm[]
  onReplay: () => void
}) {
  const t = useT()
  const grid = useMemo(() => buildGrid(terms, seed), [terms, seed])
  const puzzleId = termGridPuzzleId(category, seed)
  const { puzzles, start, setLetter, revealWord, finish } = useTermGrid()
  const progress = puzzles[puzzleId] ?? { letters: {}, revealedWords: [], startedAt: null, finishedAt: null }
  const [checkedOnce, setCheckedOnce] = useState(false)

  useEffect(() => { start(puzzleId) }, [puzzleId, start])

  const isComplete = useMemo(() => {
    if (grid.words.length === 0) return false
    for (const word of grid.words) {
      for (let i = 0; i < word.term.length; i++) {
        const row = word.direction === 'down' ? word.row + i : word.row
        const column = word.direction === 'across' ? word.column + i : word.column
        if ((progress.letters[`${row},${column}`] ?? '') !== word.term[i]) return false
      }
    }
    return true
  }, [grid, progress.letters])

  useEffect(() => {
    if (isComplete && !progress.finishedAt) finish(puzzleId)
  }, [isComplete, progress.finishedAt, finish, puzzleId])

  const handleLetterChange = useCallback(
    (cell: string, letter: string) => setLetter(puzzleId, cell, letter),
    [puzzleId, setLetter],
  )

  const handleReveal = useCallback(
    (term: string) => {
      const word = grid.words.find((candidate) => candidate.term === term)
      if (!word) return
      revealWord(puzzleId, term)
      // A revealed word is filled in outright, not merely marked as given up
      // on — the letters land in `letters` so the board shows them and a
      // crossing word that only needed this letter can still be finished.
      for (let i = 0; i < word.term.length; i++) {
        const row = word.direction === 'down' ? word.row + i : word.row
        const column = word.direction === 'across' ? word.column + i : word.column
        setLetter(puzzleId, `${row},${column}`, word.term[i])
      }
    },
    [grid, puzzleId, revealWord, setLetter],
  )

  if (grid.words.length === 0) {
    return (
      <Panel className="p-8">
        <EmptyState
          icon={Grid3x3}
          title={t('Not enough terms for a puzzle')}
          description={t('Term Grid needs at least {min} terms in a category that can interlock into a crossword. This one has too few — try another category.').replace(
            '{min}',
            String(MIN_TERMS),
          )}
        />
      </Panel>
    )
  }

  const finished = Boolean(progress.finishedAt)

  return (
    <div className="space-y-4">
      {finished && progress.startedAt && progress.finishedAt && (
        <Panel className="flex flex-wrap items-center gap-4 border-success/40 bg-success-tint/40 p-4">
          <div className="flex min-w-0 flex-1 flex-wrap gap-3">
            {/* Time taken and words revealed are reported apart, on purpose: a
                puzzle finished by revealing every word is not one the student
                solved, and a single combined figure would hide that. */}
            <Stat
              label={t('Time taken')}
              value={formatElapsed(new Date(progress.finishedAt).getTime() - new Date(progress.startedAt).getTime())}
            />
            <Stat label={t('Words revealed')} value={String(progress.revealedWords.length)} />
          </div>
          <Button variant="primary" onClick={onReplay}>{t('New puzzle')}</Button>
        </Panel>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="secondary" onClick={() => setCheckedOnce(true)} disabled={finished}>
          {t('Check')}
        </Button>
        {!finished && (
          <Button variant="ghost" size="sm" onClick={onReplay}>{t('New puzzle')}</Button>
        )}
      </div>

      <TermGridBoard
        grid={grid}
        letters={progress.letters}
        onLetterChange={handleLetterChange}
        revealedWords={progress.revealedWords}
        onRevealWord={handleReveal}
        showErrors={checkedOnce}
        disabled={finished}
      />
    </div>
  )
}

export function TermGridPage() {
  const t = useT()
  // Same source `MedicalTaxonomy` reads: live in production, the starter set
  // in demo mode. See `useMedicalGlossary` for why it is not auto-seeded here.
  const [glossary] = useMedicalGlossary()
  const categories = glossary.categories

  const [searchParams] = useSearchParams()
  // A link from Medical Taxonomy carries both a category and a seed; a link
  // from Study Together carries only a seed, since both students land on the
  // same default category as long as they see the same published glossary
  // (`categories[0]`). Either way this is read once, on arrival, and decides
  // the very first puzzle shown — before the student touches the category
  // select or "New puzzle".
  const urlCategoryParam = searchParams.get('category')
  const urlSeedParam = searchParams.get('seed')
  const validUrlCategory = urlCategoryParam && categories.some((c) => c.key === urlCategoryParam) ? urlCategoryParam : null
  const urlSeed = urlSeedParam !== null && /^-?\d+$/.test(urlSeedParam) ? Number(urlSeedParam) : null

  const [chosenCategory, setChosenCategory] = useState(() => validUrlCategory ?? '')
  const category = chosenCategory || categories[0]?.key || ''

  // The category the link actually resolved to on the very first render —
  // captured once so that browsing away to a different category and back
  // does not re-trigger a stale comparison against a `chosenCategory` that
  // has since changed.
  const initialCategory = useRef(category).current
  // `null` once "New puzzle" has been pressed, exactly like a self-generated
  // seed is retired by moving the generation counter forward — a shared
  // puzzle is a starting point, not something "New puzzle" should be unable
  // to leave.
  const [pinnedSeed, setPinnedSeed] = useState<number | null>(() => urlSeed)

  const terms = useMemo<GridTerm[]>(
    () => glossary.terms.filter((term) => term.category === category).map((term) => ({ term: term.term, clue: term.def })),
    [glossary.terms, category],
  )

  const [generations, setGenerations] = usePersistentState<Record<string, number>>('synapse.termgrid.generation.v1', {})
  const generation = generations[category] ?? 0
  const generatedSeed = hashSeed(`${category}:${generation}`)
  const seed = pinnedSeed !== null && category === initialCategory ? pinnedSeed : generatedSeed

  const newPuzzle = useCallback(() => {
    setPinnedSeed(null)
    setGenerations((current) => ({ ...current, [category]: (current[category] ?? 0) + 1 }))
  }, [category, setGenerations])

  const [copied, setCopied] = useState(false)
  // The seed and category are the whole mechanism: opening this exact link
  // re-runs `buildGrid` over the same terms with the same seed and lands on
  // the identical grid, with nothing server-side to keep in sync.
  const shareLink = `${window.location.origin}/app/term-grid?category=${encodeURIComponent(category)}&seed=${seed}`
  const handleShare = useCallback(() => {
    void navigator.clipboard?.writeText(shareLink)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }, [shareLink])

  return (
    <PageContainer>
      <PageHeader
        title={t('Term Grid')}
        description={t('A crossword built from the glossary — fill in each term from its definition.')}
      />

      {categories.length === 0 ? (
        <Panel className="p-8">
          <EmptyState
            icon={Grid3x3}
            title={t('The glossary has not been published yet.')}
            description={t('Terms appear here once they are published in the admin console.')}
          />
        </Panel>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-xs flex-1">
              <Field label={t('Category')} htmlFor="term-grid-category">
                <Select id="term-grid-category" value={category} onChange={(event) => setChosenCategory(event.target.value)}>
                  {categories.map((c) => (
                    <option key={c.key} value={c.key}>{t(c.key)}</option>
                  ))}
                </Select>
              </Field>
            </div>
            <Button variant="secondary" iconLeft={copied ? Check : Copy} onClick={handleShare}>
              {copied ? t('Copied') : t('Share this puzzle')}
            </Button>
          </div>

          <TermGridPlayer key={`${category}:${generation}`} category={category} seed={seed} terms={terms} onReplay={newPuzzle} />
        </>
      )}
    </PageContainer>
  )
}
