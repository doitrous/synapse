import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Shuffle, Copy, Check } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Stat } from '@/components/ui/Stat'
import { Field } from '@/components/ui/Field'
import { Segmented } from '@/components/ui/Tabs'
import { useMedicalGlossary } from '@/data/glossaryStore'
import type { MedicalTerm } from '@/data/glossary'
import { buildBoard, isPair, MIN_PAIRS, type MatchBoard, type MatchMode, type MatchTile } from '@/data/termMatch'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'

/** A fresh seed for a link nobody has opened yet. */
function randomSeed(): number {
  return Math.floor(Math.random() * 0x7fffffff)
}

/** 75000ms → "1m 15s"; under a minute → "42s". Same small copy `SpotterPage`
 *  and `TermGridPage` each keep of this — not worth a shared module. */
function formatElapsed(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
}

/** How long a wrong pair stays flagged red before it clears — long enough to
 *  register, short enough not to slow the round down. Purely a UI beat;
 *  nothing about the board's determinism depends on it. */
const MISMATCH_FLASH_MS = 650

type TileState = 'idle' | 'selected' | 'matched' | 'wrong'

function TermMatchTile({
  tile,
  state,
  onClick,
}: {
  tile: MatchTile
  state: TileState
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state === 'matched'}
      // Only the Arabic side ever needs this — an English definition tile
      // rendered right-to-left would be as unreadable as Arabic rendered
      // left-to-right, and the rest of the board stays in the reader's
      // own direction regardless of which tiles are Arabic.
      lang={tile.arabic ? 'ar' : undefined}
      dir={tile.arabic ? 'rtl' : undefined}
      className={cn(
        'flex min-h-14 items-center justify-center rounded-lg border px-3 py-2 text-center text-[13.5px] font-medium transition-colors',
        state === 'idle' && 'border-line-2 bg-surface text-ink hover:border-ink-3/45 hover:bg-surface-2',
        state === 'selected' && 'border-primary bg-primary-tint text-primary-strong',
        state === 'matched' && 'border-success/40 bg-success-tint/40 text-success',
        state === 'wrong' && 'border-danger bg-danger-tint text-danger',
      )}
    >
      {tile.text}
    </button>
  )
}

/**
 * One board, from first tap through the finish panel. Keyed by the caller on
 * `${mode}:${seed}`, so switching mode or pressing "Play again" — which mints
 * a fresh seed — remounts this with fresh local state, the same way
 * `TermGridPlayer` is keyed on `${category}:${generation}`.
 */
function TermMatchPlayer({
  board,
  onReplay,
}: {
  board: MatchBoard & { refusal: null }
  onReplay: () => void
}) {
  const t = useT()
  const byId = useMemo(() => new Map(board.tiles.map((tile) => [tile.id, tile])), [board.tiles])

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [matchedIds, setMatchedIds] = useState<Set<string>>(() => new Set())
  const [wrongIds, setWrongIds] = useState<Set<string>>(() => new Set())
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [startedAt] = useState(() => Date.now())
  const [finishedAt, setFinishedAt] = useState<number | null>(null)
  const wrongTimer = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (wrongTimer.current !== null) window.clearTimeout(wrongTimer.current)
    },
    [],
  )

  const allMatched = matchedIds.size === board.tiles.length
  useEffect(() => {
    if (allMatched && finishedAt === null) setFinishedAt(Date.now())
  }, [allMatched, finishedAt])

  function handleTap(tile: MatchTile) {
    if (matchedIds.has(tile.id) || wrongIds.size > 0) return
    if (selectedId === tile.id) {
      setSelectedId(null)
      return
    }
    if (selectedId === null) {
      setSelectedId(tile.id)
      return
    }

    const first = byId.get(selectedId)
    if (!first) {
      setSelectedId(tile.id)
      return
    }

    if (isPair(first, tile)) {
      setMatchedIds((current) => new Set(current).add(first.id).add(tile.id))
      setSelectedId(null)
      return
    }

    // A wrong pair clears rather than staying picked — flagged red for a
    // beat so the student sees which two they tried, then both go back to
    // selectable.
    setWrongAttempts((n) => n + 1)
    setWrongIds(new Set([first.id, tile.id]))
    setSelectedId(null)
    wrongTimer.current = window.setTimeout(() => setWrongIds(new Set()), MISMATCH_FLASH_MS)
  }

  if (finishedAt !== null) {
    return (
      <Panel className="flex flex-wrap items-center gap-4 border-success/40 bg-success-tint/40 p-4">
        <div className="flex min-w-0 flex-1 flex-wrap gap-3">
          {/* Time taken and wrong attempts are reported apart, on purpose: a
              board cleared after many wrong tries is not the same result as
              one cleared cleanly, and a single combined figure would hide
              that. */}
          <Stat label={t('Time taken')} value={formatElapsed(finishedAt - startedAt)} />
          <Stat label={t('Wrong attempts')} value={String(wrongAttempts)} />
        </div>
        <Button variant="primary" onClick={onReplay}>{t('Play again')}</Button>
      </Panel>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {board.tiles.map((tile) => {
        const state: TileState = matchedIds.has(tile.id)
          ? 'matched'
          : wrongIds.has(tile.id)
            ? 'wrong'
            : selectedId === tile.id
              ? 'selected'
              : 'idle'
        return <TermMatchTile key={tile.id} tile={tile} state={state} onClick={() => handleTap(tile)} />
      })}
    </div>
  )
}

export function TermMatchPage() {
  const t = useT()
  // Same source `MedicalTaxonomy` reads: live in production, the starter set
  // in demo mode.
  const [glossary] = useMedicalGlossary()
  const terms: MedicalTerm[] = glossary.terms

  const [searchParams] = useSearchParams()
  const urlSeedParam = searchParams.get('seed')
  const urlSeed = urlSeedParam !== null && /^-?\d+$/.test(urlSeedParam) ? Number(urlSeedParam) : null
  const urlModeParam = searchParams.get('mode')
  const urlMode: MatchMode | null = urlModeParam === 'arabic' || urlModeParam === 'definition' ? urlModeParam : null

  // Read once, on arrival — a friend's link decides the very first board and
  // its mode, the same way `TermGridPage` reads its own `?seed=`.
  const [seed, setSeed] = useState(() => urlSeed ?? randomSeed())
  const [mode, setMode] = useState<MatchMode>(() => urlMode ?? 'arabic')

  const board = useMemo(() => buildBoard(terms, mode, seed), [terms, mode, seed])

  const [copied, setCopied] = useState(false)
  // The seed and mode are the whole mechanism: opening this exact link
  // re-runs `buildBoard` over the same glossary with the same seed and mode
  // and lands on the identical board, tile order included.
  const shareLink = `${window.location.origin}/app/term-match?seed=${seed}&mode=${mode}`
  const handleShare = useCallback(() => {
    void navigator.clipboard?.writeText(shareLink)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }, [shareLink])

  const newGame = useCallback(() => setSeed(randomSeed()), [])

  return (
    <PageContainer>
      <PageHeader
        title={t('Term Match')}
        description={t('Match each term to its Arabic translation or its definition — pick two tiles at a time.')}
      />

      {terms.length === 0 ? (
        <Panel className="p-8">
          <EmptyState
            icon={Shuffle}
            title={t('The glossary has not been published yet.')}
            description={t('Terms appear here once they are published in the admin console.')}
          />
        </Panel>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <Field label={t('Mode')}>
              <Segmented
                items={[
                  { value: 'arabic', label: t('Arabic') },
                  { value: 'definition', label: t('Definition') },
                ]}
                value={mode}
                onChange={(value) => setMode(value as MatchMode)}
              />
            </Field>
            <Button variant="secondary" iconLeft={copied ? Check : Copy} onClick={handleShare}>
              {copied ? t('Copied') : t('Share this game')}
            </Button>
          </div>

          {board.refusal ? (
            <Panel className="p-8">
              <EmptyState
                icon={Shuffle}
                title={t('Not enough terms for Term Match')}
                description={t(
                  'Term Match needs at least {min} terms with a translation or definition — there are too few published right now.',
                ).replace('{min}', String(MIN_PAIRS))}
              />
            </Panel>
          ) : (
            <TermMatchPlayer key={`${mode}:${seed}`} board={board as MatchBoard & { refusal: null }} onReplay={newGame} />
          )}
        </>
      )}
    </PageContainer>
  )
}
