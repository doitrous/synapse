import { SharedSpotterFigure } from './SharedSpotterFigure'
import { useEffect, useMemo, useState } from 'react'
import { Play, RotateCcw, Send, Trophy, Users, Wifi, WifiOff } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import {
  partyGameActionsPath,
  partyGameEventsPath,
  usePartyGameSync,
} from '@/lib/usePartyGameSync'
import type { PartyAnswerValue, PartyGameAction, PartyGamePublicState, PublicPartyGameRound } from '@/data/partyGameSync'

export interface PartyGameSyncPlayerProps {
  partyId: string
  gameId: string
  actorId: string
  initialState: PartyGamePublicState | null
  isHost?: boolean
  eventsPath?: string
  actionsPath?: string
  className?: string
}

function scoreRows(state: PartyGamePublicState) {
  return Object.values(state.participants)
    .map((participant) => ({
      participant,
      score: state.scores[participant.id] ?? 0,
    }))
    .sort((a, b) => b.score - a.score || a.participant.username.localeCompare(b.participant.username))
}

function roundLabel(round: PublicPartyGameRound | null, roundCount: number, t: (s: string) => string): string {
  if (!round) return t('No active round')
  return `${t('Round')} ${round.index + 1} / ${roundCount}`
}

function OrderedAnswerControls({
  round,
  disabled,
  onSubmit,
}: {
  round: PublicPartyGameRound
  disabled: boolean
  onSubmit: (answer: PartyAnswerValue) => void
}) {
  const t = useT()
  const [order, setOrder] = useState<string[]>([])

  useEffect(() => {
    setOrder([])
  }, [round.id])

  const remaining = round.choices.filter((choice) => !order.includes(choice.id))
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-line bg-inset p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Your order')}</p>
        <ol className="mt-2 space-y-1 text-[13px] text-ink-2">
          {order.length === 0 && <li>{t('Choose the first step to begin.')}</li>}
          {order.map((id, index) => {
            const choice = round.choices.find((item) => item.id === id)
            return <li key={id}>{index + 1}. {choice?.label ?? id}</li>
          })}
        </ol>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {remaining.map((choice) => (
          <Button key={choice.id} type="button" variant="secondary" disabled={disabled} onClick={() => setOrder((previous) => [...previous, choice.id])}>
            {choice.label}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="ghost" iconLeft={RotateCcw} disabled={disabled || order.length === 0} onClick={() => setOrder([])}>
          {t('Clear order')}
        </Button>
        <Button type="button" variant="primary" iconLeft={Send} disabled={disabled || order.length !== round.choices.length} onClick={() => onSubmit(order)}>
          {t('Submit order')}
        </Button>
      </div>
    </div>
  )
}

function RoundAnswerControls({
  round,
  disabled,
  onSubmit,
}: {
  round: PublicPartyGameRound
  disabled: boolean
  onSubmit: (answer: PartyAnswerValue) => void
}) {
  const t = useT()
  const [text, setText] = useState('')

  useEffect(() => {
    setText('')
  }, [round.id])

  if (round.scoring === 'ordered_exact_positions') {
    return <OrderedAnswerControls round={round} disabled={disabled} onSubmit={onSubmit} />
  }

  if (round.choices.length > 0) {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {round.choices.map((choice) => (
          <Button
            key={choice.id}
            type="button"
            variant="secondary"
            disabled={disabled}
            lang={choice.lang}
            dir={choice.dir}
            onClick={() => onSubmit(choice.id)}
            className="h-auto min-h-11 justify-start whitespace-normal px-3 py-2 text-start"
          >
            {choice.label}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault()
        if (text.trim()) onSubmit(text)
      }}
    >
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        disabled={disabled}
        placeholder={t('Type your answer…')}
        aria-label={t('Party game answer')}
        className="min-h-11 flex-1 rounded-lg border border-line bg-surface px-3 text-[14px] text-ink outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
      />
      <Button type="submit" variant="primary" iconLeft={Send} disabled={disabled || !text.trim()}>
        {t('Submit')}
      </Button>
    </form>
  )
}

export function PartyGameSyncPlayer({
  partyId,
  gameId,
  actorId,
  initialState,
  isHost = false,
  eventsPath,
  actionsPath,
  className,
}: PartyGameSyncPlayerProps) {
  const t = useT()
  const resolvedEventsPath = eventsPath ?? partyGameEventsPath(partyId, gameId)
  const resolvedActionsPath = actionsPath ?? partyGameActionsPath(partyId, gameId)
  const { state, connected, busy, error, sendAction } = usePartyGameSync({
    partyId,
    gameId,
    initialState,
    eventsPath: resolvedEventsPath,
    actionsPath: resolvedActionsPath,
    enabled: Boolean(initialState),
  })

  const hasAnswered = useMemo(
    () => Boolean(state?.answeredParticipantIds.includes(actorId)),
    [actorId, state?.answeredParticipantIds],
  )

  const dispatch = (action: PartyGameAction) => {
    void sendAction(action)
  }

  if (!state) {
    return (
      <Panel className={cn('p-6 text-center text-[13px] text-ink-3', className)}>
        {t('Party game will appear here when the host creates it.')}
      </Panel>
    )
  }

  return (
    <div className={cn('grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]', className)}>
      <Panel>
        <PanelHeader
          title={state.title}
          hint={roundLabel(state.currentRound, state.roundCount, t)}
          action={(
            <Badge tone={connected ? 'success' : 'warning'} dot>
              {connected ? t('Live') : t('Reconnecting')}
            </Badge>
          )}
        />
        <div className="space-y-5 p-5">
          {error && (
            <div className="rounded-lg border border-warning/25 bg-warning-tint px-3 py-2 text-[13px] text-warning">
              {error}
            </div>
          )}

          {state.status === 'lobby' && (
            <div className="rounded-xl border border-dashed border-line-2 bg-inset p-5 text-center">
              <Users className="mx-auto size-6 text-ink-3" aria-hidden />
              <p className="mt-2 text-[15px] font-semibold text-ink">{t('Lobby is ready')}</p>
              <p className="mt-1 text-[13px] text-ink-2">{t('The host starts when everyone is ready.')}</p>
              {isHost && (
                <Button className="mt-4" variant="primary" iconLeft={Play} loading={busy} onClick={() => dispatch({ type: 'start' })}>
                  {t('Start party game')}
                </Button>
              )}
            </div>
          )}

          {state.status === 'in_round' && state.currentRound && (
            <section aria-labelledby="party-game-round">
              <div className="mb-4">
                <Badge tone="accent">{state.kind}</Badge>
                <h3 id="party-game-round" className="mt-2 text-[20px] font-bold tracking-[-0.025em] text-ink">
                  {state.currentRound.prompt}
                </h3>
              </div>
              {state.kind==='spotter'&&state.currentRound.payload&&<SharedSpotterFigure payload={state.currentRound.payload}/>}
              <RoundAnswerControls
                round={state.currentRound}
                disabled={busy || hasAnswered}
                onSubmit={(answer) => dispatch({ type: 'submit_answer', roundId: state.currentRound!.id, answer })}
              />
              {hasAnswered && <p className="mt-3 text-[13px] text-ink-3">{t('Answer submitted. Waiting for the next round.')}</p>}
            </section>
          )}

          {state.status === 'between_rounds' && (
            <div className="rounded-xl border border-line bg-inset p-5">
              <p className="text-[15px] font-semibold text-ink">{t('Round recorded')}</p>
              <p className="mt-1 text-[13px] text-ink-2">{t('Your answers have been scored. The host can continue when everyone is ready.')}</p>
              {isHost && (
                <Button className="mt-4" variant="primary" iconLeft={Play} loading={busy} onClick={() => dispatch({ type: 'next_round' })}>
                  {state.currentRoundIndex + 1 >= state.roundCount ? t('Complete game') : t('Next round')}
                </Button>
              )}
            </div>
          )}

          {state.status === 'completed' && (
            <div className="rounded-xl border border-success/25 bg-success-tint p-5">
              <p className="flex items-center gap-2 text-[15px] font-semibold text-success">
                <Trophy className="size-4" aria-hidden />
                {t('Party game complete')}
              </p>
              <p className="mt-1 text-[13px] text-ink-2">{t('See how you did, and compare what you learned together.')}</p>
            </div>
          )}
        </div>
      </Panel>

      <Panel>
        <PanelHeader
          title={t('Scoreboard')}
          icon={Trophy}
          action={connected ? <Wifi className="size-4 text-success" aria-hidden /> : <WifiOff className="size-4 text-warning" aria-hidden />}
        />
        <ol className="divide-y divide-line">
          {scoreRows(state).map(({ participant, score }, index) => (
            <li key={participant.id} className="flex items-center gap-3 px-4 py-3">
              <span className="grid size-7 place-items-center rounded-full bg-inset text-[12px] font-semibold text-ink-2">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-medium text-ink">{participant.username}</span>
                <span className="block text-[11px] text-ink-3">
                  {participant.connected ? t('Connected') : t('Away')}
                </span>
              </span>
              <span className="text-[13px] font-semibold text-ink">{score}</span>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  )
}
