import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Crosshair, Copy, Check, CheckCircle2, XCircle } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { Stat } from '@/components/ui/Stat'
import { useLiveHistology } from '@/lib/useLiveHistology'
import { useCatalogueAvailability } from '@/lib/useCatalogueAvailability'
import { buildSpotter, MIN_LABELS, type SpotterGame, type SpotterRound } from '@/data/spotter'
import type { HistologySlide } from '@/data/histology'
import { resolveMediaSource } from '@/lib/mediaStorage'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'

/** A fresh seed for a link nobody has opened yet. */
function randomSeed(): number {
  return Math.floor(Math.random() * 0x7fffffff)
}

/** 75000ms → "1m 15s"; under a minute → "42s". Small enough that sharing it
 *  with `TermGridPage`'s own copy of this isn't worth a shared module. */
function formatElapsed(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
}

/**
 * One round: the pinned slide, its four options, and the feedback once
 * answered. Keyed by the caller on `structureId` so a new round is a fresh
 * mount — local "which option is chosen" state and the image fetch both
 * start clean without an extra effect to reset them.
 */
function SpotterRoundView({
  round,
  slide,
  onAnswer,
}: {
  round: SpotterRound
  slide: HistologySlide | undefined
  onAnswer: (correct: boolean) => void
}) {
  const t = useT()
  const [chosen, setChosen] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState('')

  const image = slide?.views.find((view) => view.objective === round.objective)?.image

  // Same resolve-and-revoke shape as `SlideViewer`: a stored image reference
  // is not a URL, resolving it can outlive the round that asked for it, and
  // the object URL it may create has to be revoked exactly once.
  useEffect(() => {
    if (!image) {
      setImageUrl('')
      setImageLoading(false)
      return
    }
    let active = true
    let resolvedUrl = ''
    let shouldRevoke = false
    setImageLoading(true)
    setImageError('')
    resolveMediaSource(image)
      .then((resolved) => {
        // The round may have moved on while this was in flight. Applying a
        // stale URL here would show the previous round's field; skipping the
        // revoke would leak the blob it just created.
        if (!active) {
          if (resolved.revoke) URL.revokeObjectURL(resolved.url)
          return
        }
        resolvedUrl = resolved.url
        shouldRevoke = resolved.revoke
        setImageUrl(resolved.url)
        setImageLoading(false)
      })
      .catch((reason: unknown) => {
        if (!active) return
        setImageLoading(false)
        setImageError(reason instanceof Error ? reason.message : t('This image could not be loaded.'))
      })
    return () => {
      active = false
      if (shouldRevoke && resolvedUrl) URL.revokeObjectURL(resolvedUrl)
    }
    // `image` is the only thing that should re-trigger a fetch — depending on
    // `slide`/`round` themselves would refetch on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, t])

  function choose(option: string) {
    if (chosen !== null) return
    setChosen(option)
    onAnswer(option === round.answer)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[13.5px] font-medium text-ink">{round.slideTitle}</p>
        <Badge tone="outline">{round.objective}×</Badge>
      </div>

      <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-line bg-surface-2">
        {imageLoading && (
          <p className="grid aspect-square place-items-center px-8 text-center text-[12px] text-ink-3">
            {t('Loading the slide…')}
          </p>
        )}
        {!imageLoading && imageError && (
          <p role="alert" className="grid aspect-square place-items-center px-8 text-center text-[12px] text-danger">
            {imageError}
          </p>
        )}
        {!imageLoading && !imageError && !image && (
          <p className="grid aspect-square place-items-center px-8 text-center text-[12px] text-ink-3">
            {t('This slide has no image yet.')}
          </p>
        )}
        {!imageLoading && !imageError && image && (
          <div className="relative">
            <img src={imageUrl} alt="" draggable={false} className="block w-full" />
            <span
              role="img"
              aria-label={t('The structure to identify')}
              style={
                {
                  // A pin marks a point on the image itself, not a side of the
                  // page — exactly like `SlideViewer`'s pin, this stays
                  // `left`/`top` rather than `insetInlineStart`. The image is
                  // never mirrored under `dir="rtl"`, so a logical property
                  // here would slide the pin to the wrong side of an
                  // unflipped picture.
                  left: `${round.at.x * 100}%`,
                  top: `${round.at.y * 100}%`,
                } satisfies CSSProperties
              }
              className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary shadow-[0_0_0_1px_rgba(0,0,0,0.35)]"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {round.options.map((option) => {
          const isChosen = chosen === option
          const isAnswer = option === round.answer
          const revealed = chosen !== null
          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              disabled={revealed}
              className={cn(
                'flex items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 text-start text-[13.5px] font-medium transition-colors',
                !revealed && 'border-line-2 bg-surface text-ink hover:border-ink-3/45 hover:bg-surface-2',
                revealed && isAnswer && 'border-success bg-success-tint text-success',
                revealed && isChosen && !isAnswer && 'border-danger bg-danger-tint text-danger',
                revealed && !isChosen && !isAnswer && 'border-line bg-surface text-ink-3',
              )}
            >
              {option}
              {revealed && isAnswer && <CheckCircle2 size={16} className="shrink-0" aria-hidden />}
              {revealed && isChosen && !isAnswer && <XCircle size={16} className="shrink-0" aria-hidden />}
            </button>
          )
        })}
      </div>

      {chosen !== null && (
        <p role="status" className={cn('text-[13px] font-medium', chosen === round.answer ? 'text-success' : 'text-danger')}>
          {chosen === round.answer ? t('Correct!') : t("Not quite — it's {answer}.").replace('{answer}', round.answer)}
        </p>
      )}
    </div>
  )
}

/**
 * One game, from first round through the finish panel. Keyed by the caller
 * on the seed, so pressing "Play again" — which mints a fresh seed — remounts
 * this with fresh local state, the same way `TermGridPlayer` is keyed on
 * `${category}:${generation}`.
 */
function SpotterPlayer({
  game,
  slides,
  onReplay,
}: {
  game: SpotterGame & { refusal: null }
  slides: HistologySlide[]
  onReplay: () => void
}) {
  const t = useT()
  const slideById = useMemo(() => new Map(slides.map((slide) => [slide.id, slide])), [slides])
  const [roundIndex, setRoundIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [startedAt] = useState(() => Date.now())
  const [finishedAt, setFinishedAt] = useState<number | null>(null)

  const round = game.rounds[roundIndex]!

  function handleAnswer(isCorrect: boolean) {
    if (isCorrect) setCorrect((c) => c + 1)
    setAnswered(true)
  }

  function advance() {
    if (roundIndex + 1 >= game.rounds.length) {
      setFinishedAt(Date.now())
      return
    }
    setRoundIndex((i) => i + 1)
    setAnswered(false)
  }

  if (finishedAt !== null) {
    return (
      <Panel className="flex flex-wrap items-center gap-4 border-success/40 bg-success-tint/40 p-4">
        <div className="flex min-w-0 flex-1 flex-wrap gap-3">
          {/* Correct-out-of-total and time taken are reported apart, on
              purpose — the same reasoning `TermGridPage` uses for time taken
              versus words revealed. */}
          <Stat label={t('Score')} value={`${correct}/${game.rounds.length}`} />
          <Stat label={t('Time taken')} value={formatElapsed(finishedAt - startedAt)} />
        </div>
        <Button variant="primary" onClick={onReplay}>{t('Play again')}</Button>
      </Panel>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-[12.5px] font-medium text-ink-2">
        {t('Round {current} of {total}')
          .replace('{current}', String(roundIndex + 1))
          .replace('{total}', String(game.rounds.length))}
      </p>
      <SpotterRoundView key={round.structureId} round={round} slide={slideById.get(round.slideId)} onAnswer={handleAnswer} />
      {answered && (
        <Button variant="primary" onClick={advance}>{t('Continue')}</Button>
      )}
    </div>
  )
}

export function SpotterPage() {
  const t = useT()
  const { slides } = useLiveHistology()
  const availability = useCatalogueAvailability(slides.length)

  const [searchParams] = useSearchParams()
  const urlSeedParam = searchParams.get('seed')
  const urlSeed = urlSeedParam !== null && /^-?\d+$/.test(urlSeedParam) ? Number(urlSeedParam) : null
  // Read once, on arrival — a friend's link decides the very first game, the
  // same way `TermGridPage` reads its own `?seed=`.
  const [seed, setSeed] = useState(() => urlSeed ?? randomSeed())

  const game = useMemo(() => buildSpotter(slides, seed), [slides, seed])

  const [copied, setCopied] = useState(false)
  // The seed is the whole invitation: opening this exact link re-runs
  // `buildSpotter` over the same published slides with the same seed and
  // lands on the identical rounds, with nothing server-side to keep in sync.
  const shareLink = `${window.location.origin}/app/spotter?seed=${seed}`
  const handleShare = useCallback(() => {
    void navigator.clipboard?.writeText(shareLink)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }, [shareLink])

  const newGame = useCallback(() => setSeed(randomSeed()), [])

  return (
    <PageContainer>
      <PageHeader
        title={t('Spotter')}
        description={t('A structure is pinned on a live slide but not named — pick it from four options before the next one comes up.')}
        back={{ fallback: '/app/minigames' }}
      />

      {availability.kind === 'loading' || availability.kind === 'error' ? (
        <Panel className="p-8">
          <CatalogueUnavailable
            availability={availability}
            empty={{
              title: t('No slides ready for Spotter'),
              description: t('Spotter needs published slides with at least one structure pinned. They will appear here once an admin publishes some.'),
            }}
          />
        </Panel>
      ) : (
        <>
          {!game.refusal && (
            <div className="mb-4 flex items-center justify-end">
              <Button variant="secondary" iconLeft={copied ? Check : Copy} onClick={handleShare}>
                {copied ? t('Copied') : t('Share this game')}
              </Button>
            </div>
          )}

          {game.refusal ? (
            <Panel className="p-8">
              <EmptyState
                icon={Crosshair}
                title={t(game.refusal === 'too_few_structures' ? 'No slides ready for Spotter' : 'Not enough structures for Spotter')}
                description={
                  game.refusal === 'too_few_structures'
                    ? t('Spotter needs published slides with at least one structure pinned. They will appear here once an admin publishes some.')
                    : t(
                        'Spotter needs at least {min} differently labelled structures across the published slides to build a round of options — there are too few right now.',
                      ).replace('{min}', String(MIN_LABELS))
                }
              />
            </Panel>
          ) : (
            <SpotterPlayer key={seed} game={game as SpotterGame & { refusal: null }} slides={slides} onReplay={newGame} />
          )}
        </>
      )}
    </PageContainer>
  )
}
