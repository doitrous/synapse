import { useMemo, useState } from 'react'
import { ArrowLeft, Layers, Play, Plus, Pencil, Trash2, Settings2, Undo2 } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Dialog } from '@/components/ui/Dialog'
import { Tooltip } from '@/components/ui/Tooltip'
import { Field, TextInput } from '@/components/ui/Field'
import { SubjectTag } from '@/components/ui/Subject'
import { useT } from '@/lib/i18n'
import { pct, formatRelativeTime } from '@/lib/format'
import { cn } from '@/lib/cn'
import type { DeckView, FlashcardsApi } from '@/lib/useFlashcards'
import { DeckOptionsDialog } from './DeckOptionsDialog'
import { deckDashboardStats } from '@/data/flashcards/deckSummary'
import type { DeckCounts } from '@/data/flashcards/status'

/**
 * Decks and the per-deck dashboard.
 *
 * The list is the landing surface; selecting a deck opens its dashboard, where
 * the ten status measures are shown with both an exact count and a share of the
 * deck total. Those measures overlap by design — a card can be New and Unseen at
 * once — so the denominator is always the total and the caption says so, rather
 * than implying they sum to a whole. Every number comes from the same hook the
 * study screen writes to, so the dashboard and the queue can never disagree.
 */
export function DeckDashboard({
  api,
  onStudy,
  onAddToDeck,
}: {
  api: FlashcardsApi
  onStudy: (deckId: string) => void
  onAddToDeck: (deckId: string) => void
}) {
  const t = useT()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  const selected = selectedId ? api.getDeck(selectedId) : undefined

  if (selected) {
    return (
      <DeckDetail
        api={api}
        deck={selected}
        onBack={() => setSelectedId(null)}
        onStudy={() => onStudy(selected.id)}
        onAddToDeck={() => onAddToDeck(selected.id)}
      />
    )
  }

  const own = api.decks.filter((d) => !d.provided).sort((a, b) => a.name.localeCompare(b.name))
  const provided = api.decks.filter((d) => d.provided).sort((a, b) => a.name.localeCompare(b.name))

  if (api.decks.length === 0) {
    return (
      <>
        <Panel className="p-10 text-center">
          <EmptyState
            icon={Layers}
            title={t('No decks yet')}
            description={t('Create a deck to study by spaced repetition, or wait for a published deck to appear here.')}
            action={<Button variant="primary" size="sm" iconLeft={Plus} onClick={() => setCreating(true)}>{t('New deck')}</Button>}
          />
        </Panel>
        {creating && <CreateDeckDialog onClose={() => setCreating(false)} onCreate={(name) => { const id = api.createDeck(name); setCreating(false); setSelectedId(id) }} />}
      </>
    )
  }

  return (
    <div className="space-y-5">
      <Panel>
        <PanelHeader
          title={t('Your decks')}
          hint={String(own.length)}
          action={<Button size="sm" variant="secondary" iconLeft={Plus} onClick={() => setCreating(true)}>{t('New deck')}</Button>}
        />
        {own.length === 0 ? (
          <p className="px-4 py-6 text-center text-[12.5px] text-ink-3">{t('You have not created a deck yet.')}</p>
        ) : (
          <ul className="divide-y divide-line">
            {own.map((deck) => (
              <DeckRow key={deck.id} deck={deck} onOpen={() => setSelectedId(deck.id)} onStudy={() => onStudy(deck.id)} />
            ))}
          </ul>
        )}
      </Panel>

      {provided.length > 0 && (
        <Panel>
          <PanelHeader title={t('Provided decks')} hint={String(provided.length)} />
          <ul className="divide-y divide-line">
            {provided.map((deck) => (
              <DeckRow key={deck.id} deck={deck} onOpen={() => setSelectedId(deck.id)} onStudy={() => onStudy(deck.id)} />
            ))}
          </ul>
        </Panel>
      )}

      {creating && <CreateDeckDialog onClose={() => setCreating(false)} onCreate={(name) => { const id = api.createDeck(name); setCreating(false); setSelectedId(id) }} />}
    </div>
  )
}

function DeckRow({ deck, onOpen, onStudy }: { deck: DeckView; onOpen: () => void; onStudy: () => void }) {
  const t = useT()
  const c = deck.counts
  const toStudy = c.reviewDue + c.new + c.learning
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-2.5 px-4 py-3.5">
      <button type="button" onClick={onOpen} className="flex min-w-0 flex-1 items-center gap-3 text-start">
        <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
          <Icon icon={Layers} size={18} />
        </span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[14px] font-medium text-ink">{deck.name}</span>
            {deck.provided && <Badge tone="outline">{t('Provided')}</Badge>}
          </span>
          <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[12px] text-ink-3">
            {deck.subjectId && <SubjectTag id={deck.subjectId} />}
            <span><span className="tnum font-mono text-ink-2">{c.total}</span> {t('cards')}</span>
          </span>
        </span>
      </button>
      <div className="flex items-center gap-3 text-[12.5px] text-ink-3">
        <span><span className="tnum font-mono font-medium text-accent">{c.reviewDue}</span> {t('due')}</span>
        <span><span className="tnum font-mono font-medium text-primary-strong">{c.new}</span> {t('new')}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <IconButton icon={Settings2} label={t('Deck dashboard')} size="sm" onClick={onOpen} />
        <Button variant="primary" size="sm" iconLeft={Play} onClick={onStudy} disabled={toStudy === 0}>{t('Study')}</Button>
      </div>
    </li>
  )
}

const COUNT_DEFS: { key: keyof DeckCounts; label: string; tip: string; tone?: string }[] = [
  { key: 'new', label: 'New', tip: 'Currently in the new scheduling state.', tone: 'text-primary-strong' },
  { key: 'learning', label: 'Learning', tip: 'In learning or relearning steps.' },
  { key: 'reviewDue', label: 'Review due', tip: 'Review cards due now or overdue, and not suspended or buried.', tone: 'text-accent' },
  { key: 'young', label: 'Young', tip: 'A review card with an interval under 21 days.' },
  { key: 'mature', label: 'Mature', tip: 'A review card with an interval of at least 21 days.' },
  { key: 'learned', label: 'Learned', tip: 'Has at least one completed review and has not since been reset.' },
  { key: 'unseen', label: 'Unseen', tip: 'Never answered, with no review history.' },
  { key: 'buried', label: 'Buried', tip: 'Hidden until the next study day.' },
  { key: 'suspended', label: 'Suspended', tip: 'Excluded until unsuspended.' },
]

function DeckDetail({
  api,
  deck,
  onBack,
  onStudy,
  onAddToDeck,
}: {
  api: FlashcardsApi
  deck: DeckView
  onBack: () => void
  onStudy: () => void
  onAddToDeck: () => void
}) {
  const t = useT()
  const now = useMemo(() => new Date(), [])
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const metas = useMemo(() => api.cardsForDeck(deck.id).map((c) => c.meta), [api, deck.id])
  const stats = useMemo(() => deckDashboardStats(metas, api.reviewEvents.filter((e) => e.deckId === deck.id), now), [metas, api.reviewEvents, deck.id, now])
  const sessionSize = useMemo(() => api.studyQueue(deck.id, now).length, [api, deck.id, now])
  const c = deck.counts
  const buriedCount = c.buried
  const share = (n: number) => (c.total === 0 ? '0%' : pct((n / c.total) * 100))

  return (
    <div className="space-y-5">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:text-ink">
        <Icon icon={ArrowLeft} size={15} /> {t('All decks')}
      </button>

      <Panel>
        <PanelHeader
          title={deck.name}
          icon={Layers}
          hint={deck.provided ? t('Provided') : undefined}
          action={
            <div className="flex items-center gap-1.5">
              {buriedCount > 0 && (
                <Tooltip label={t('Unbury all cards in this deck')}>
                  <Button size="sm" variant="ghost" iconLeft={Undo2} onClick={() => api.unburyDeck(deck.id)}>
                    {t('Unbury')} <span className="tnum">({buriedCount})</span>
                  </Button>
                </Tooltip>
              )}
              {!deck.provided && <IconButton icon={Pencil} label={t('Add and edit cards')} size="sm" onClick={onAddToDeck} />}
              <IconButton icon={Settings2} label={t('Deck options')} size="sm" onClick={() => setOptionsOpen(true)} />
              {!deck.provided && <IconButton icon={Trash2} label={t('Delete deck')} size="sm" onClick={() => setDeleting(true)} />}
            </div>
          }
        />

        <div className="grid gap-4 p-5 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex flex-col items-start gap-2">
            <Button variant="primary" iconLeft={Play} onClick={onStudy} disabled={sessionSize === 0}>
              {stats.studiedToday > 0 ? t('Continue study') : t('Start study')}
            </Button>
            <p className="text-[12px] text-ink-3">
              {sessionSize > 0
                ? <>{t('About')} <span className="tnum font-medium text-ink-2">{sessionSize}</span> {t('cards this session')}</>
                : t('Nothing due right now.')}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[12.5px] sm:grid-cols-3 sm:justify-self-end">
            <ExtraStat label={t('Due today')} value={stats.dueToday} />
            <ExtraStat label={t('Overdue')} value={stats.overdue} />
            <ExtraStat label={t('Studied today')} value={stats.studiedToday} />
            <ExtraStat label={t('Pass rate today')} value={stats.passRateToday === null ? '—' : pct(stats.passRateToday * 100)} />
            <ExtraStat label={t('New / day')} value={deck.config.newPerDay} />
            <ExtraStat label={t('Last studied')} value={stats.lastStudied ? formatRelativeTime(stats.lastStudied, now) : t('never')} />
          </dl>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title={t('Card breakdown')} hint={<><span className="tnum">{c.total}</span> {t('total')}</>} />
        <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-5">
          {COUNT_DEFS.map((def) => (
            <Tooltip key={def.key} label={t(def.tip)}>
              <div className="bg-surface p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t(def.label)}</p>
                <p className={cn('tnum mt-1 font-mono text-[20px] font-semibold', def.tone ?? 'text-ink')}>{c[def.key]}</p>
                <p className="tnum text-[11.5px] text-ink-3">{share(c[def.key])}</p>
              </div>
            </Tooltip>
          ))}
        </div>
        <p className="border-t border-line px-4 py-2.5 text-[11.5px] text-ink-3">
          {t('Percentages are shares of the deck total and overlap — they are not meant to add up to 100%.')}
        </p>
      </Panel>

      {optionsOpen && <DeckOptionsDialog api={api} deck={deck} onClose={() => setOptionsOpen(false)} />}
      {deleting && (
        <ConfirmDeleteDialog name={deck.name} onClose={() => setDeleting(false)} onConfirm={() => { api.removeDeck(deck.id); setDeleting(false); onBack() }} />
      )}
    </div>
  )
}

function ExtraStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-start sm:gap-0">
      <dt className="text-ink-3">{label}</dt>
      <dd className="tnum font-mono font-medium text-ink">{value}</dd>
    </div>
  )
}

function CreateDeckDialog({ onClose, onCreate }: { onClose: () => void; onCreate: (name: string) => void }) {
  const t = useT()
  const [name, setName] = useState('')
  return (
    <Dialog onClose={onClose} label={t('New deck')} size="sm">
      <PanelHeader title={t('New deck')} icon={Layers} />
      <div className="space-y-4 p-5">
        <Field label={t('Deck name')} htmlFor="new-deck-name">
          <TextInput id="new-deck-name" autoFocus value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && name.trim()) onCreate(name) }} placeholder={t('e.g. Cranial nerves')} />
        </Field>
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="primary" onClick={() => onCreate(name)} disabled={!name.trim()}>{t('Create deck')}</Button>
        </div>
      </div>
    </Dialog>
  )
}

function ConfirmDeleteDialog({ name, onClose, onConfirm }: { name: string; onClose: () => void; onConfirm: () => void }) {
  const t = useT()
  return (
    <Dialog onClose={onClose} label={t('Delete this deck')} size="sm">
      <PanelHeader title={t('Delete this deck')} icon={Trash2} />
      <div className="space-y-4 p-5">
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          {t('This removes')} <span className="font-medium text-ink">{name}</span> {t('and every card and schedule in it. This cannot be undone.')}
        </p>
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="danger" iconLeft={Trash2} onClick={onConfirm}>{t('Delete')}</Button>
        </div>
      </div>
    </Dialog>
  )
}
