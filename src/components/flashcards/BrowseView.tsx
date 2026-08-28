import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  CalendarClock,
  Eye,
  EyeOff,
  Flag,
  FolderInput,
  Info,
  Layers,
  MoreHorizontal,
  Pause,
  Pencil,
  Play,
  RotateCcw,
  Search,
  Tag,
  TagsIcon,
  Trash2,
  X,
} from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Dialog } from '@/components/ui/Dialog'
import { Checkbox } from '@/components/ui/Checkbox'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { Field, SearchInput, Select, TextInput } from '@/components/ui/Field'
import { DateField } from '@/components/ui/DateTimeField'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { ContextMenu, type ContextMenuItem } from '@/components/ui/ContextMenu'
import { Tooltip } from '@/components/ui/Tooltip'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { formatRelativeTime, relativeDay } from '@/lib/format'
import { isoDay } from '@/data/studyBlocks'
import type { CardWithMeta, FlashcardsApi } from '@/lib/useFlashcards'
import { FLAG_META, FLAGS } from '@/data/flashcards/flag'
import type { FlagColor, NoteType } from '@/data/flashcards/model'
import { exclusiveStatus, isBuried, type ExclusiveStatus } from '@/data/flashcards/status'
import { CardInfoBody } from './CardInfo'
import {
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  applyBrowse,
  isFiltering,
  noteFrontPlain,
  type BrowseFilters,
  type BrowseSort,
  type SortKey,
} from '@/data/flashcards/browseQuery'

/**
 * Browse: one searchable, sortable table over every card a student owns, with
 * multi-select and the same actions the study screen offers, applied in bulk.
 *
 * All the deciding — what matches, how it sorts — is delegated to the pure
 * `browseQuery` module, so this file is only the surface: inputs bound to a
 * filter spec, a table of rows, and the dialogs the bulk and per-row actions
 * open. Bulk edits go through the hook's `bulk*` methods, which commit once, so
 * selecting a hundred cards and suspending them never clobbers itself.
 */
export function BrowseView({ api, onAdd }: { api: FlashcardsApi; onAdd: () => void }) {
  const t = useT()
  const now = useMemo(() => new Date(), [])

  const [filters, setFilters] = useState<BrowseFilters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<BrowseSort>(DEFAULT_SORT)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set())
  const [pending, setPending] = useState<Pending>(null)

  // Debounce the free-text search so a fast typist doesn't re-filter per key.
  useEffect(() => {
    const id = setTimeout(() => setFilters((f) => (f.text === query ? f : { ...f, text: query })), 200)
    return () => clearTimeout(id)
  }, [query])

  const deckName = useMemo(() => {
    const map = new Map(api.decks.map((d) => [d.id, d.name]))
    return (id: string) => map.get(id) ?? id
  }, [api.decks])

  const byId = useMemo(() => new Map(api.allCards.map((e) => [e.card.id, e])), [api.allCards])

  // How many cards each note generates, for the "shares a note" affordance.
  const siblingCount = useMemo(() => {
    const counts = new Map<string, number>()
    for (const e of api.allCards) counts.set(e.card.noteId, (counts.get(e.card.noteId) ?? 0) + 1)
    return counts
  }, [api.allCards])

  const results = useMemo(
    () => applyBrowse(api.allCards, filters, sort, now, deckName),
    [api.allCards, filters, sort, now, deckName],
  )

  const selectedEntries = useMemo(
    () => [...selected].map((id) => byId.get(id)).filter((e): e is CardWithMeta => Boolean(e)),
    [selected, byId],
  )
  const selectedCardIds = selectedEntries.map((e) => e.card.id)
  const selectedNoteIds = [...new Set(selectedEntries.map((e) => e.card.noteId))]

  const visibleIds = results.map((e) => e.card.id)
  const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selected.has(id))
  const someSelected = !allSelected && visibleIds.some((id) => selected.has(id))

  const clearSelection = () => setSelected(new Set())
  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (allSelected) for (const id of visibleIds) next.delete(id)
      else for (const id of visibleIds) next.add(id)
      return next
    })
  }
  const toggleOne = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const resetFilters = () => {
    setQuery('')
    setFilters(DEFAULT_FILTERS)
  }

  if (api.allCards.length === 0) {
    return (
      <Panel className="p-10 text-center">
        <EmptyState
          icon={Layers}
          title={t('No cards to browse yet')}
          description={t('Add cards to a deck, and they will show up here to search, filter and manage.')}
          action={<Button variant="primary" size="sm" iconLeft={Pencil} onClick={onAdd}>{t('Add cards')}</Button>}
        />
      </Panel>
    )
  }

  return (
    <div className="space-y-4">
      <Panel>
        <div className="border-b border-line p-4">
          <div className="flex flex-col gap-3">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('Search cards, decks and tags')}
              aria-label={t('Search cards')}
            />
            <div className="flex flex-wrap items-end gap-2.5">
              <FilterSelect
                label={t('Deck')}
                value={filters.deckId ?? ''}
                onChange={(v) => setFilters((f) => ({ ...f, deckId: v || null }))}
                options={[{ value: '', label: t('All decks') }, ...api.decks.map((d) => ({ value: d.id, label: d.name }))]}
              />
              <FilterSelect
                label={t('State')}
                value={filters.state}
                onChange={(v) => setFilters((f) => ({ ...f, state: v as ExclusiveStatus | 'any' }))}
                options={[
                  { value: 'any', label: t('Any state') },
                  ...(Object.keys(STATE_META) as ExclusiveStatus[]).map((s) => ({ value: s, label: t(STATE_META[s].label) })),
                ]}
              />
              <FilterSelect
                label={t('Due')}
                value={filters.due}
                onChange={(v) => setFilters((f) => ({ ...f, due: v as BrowseFilters['due'] }))}
                options={[
                  { value: 'any', label: t('Any due') },
                  { value: 'due', label: t('Due now') },
                  { value: 'overdue', label: t('Overdue') },
                  { value: 'not-due', label: t('Not due') },
                ]}
              />
              <FilterSelect
                label={t('Flag')}
                value={filters.flag}
                onChange={(v) => setFilters((f) => ({ ...f, flag: v as BrowseFilters['flag'] }))}
                options={[
                  { value: 'any', label: t('Any flag') },
                  { value: 'none', label: t('No flag') },
                  ...FLAGS.map((flag) => ({ value: flag.color, label: t(flag.label) })),
                ]}
              />
              <FilterSelect
                label={t('Tag')}
                value={filters.tag ?? ''}
                onChange={(v) => setFilters((f) => ({ ...f, tag: v || null }))}
                options={[{ value: '', label: t('Any tag') }, ...api.allTags.map((tag) => ({ value: tag, label: tag }))]}
              />
              <FilterSelect
                label={t('Type')}
                value={filters.type}
                onChange={(v) => setFilters((f) => ({ ...f, type: v as NoteType | 'any' }))}
                options={[
                  { value: 'any', label: t('Any type') },
                  { value: 'basic', label: t('Basic') },
                  { value: 'cloze', label: t('Cloze') },
                  { value: 'image-occlusion', label: t('Image occlusion') },
                ]}
              />
              <FilterSelect
                label={t('Suspended')}
                value={filters.suspended}
                onChange={(v) => setFilters((f) => ({ ...f, suspended: v as BrowseFilters['suspended'] }))}
                options={[
                  { value: 'any', label: t('Any') },
                  { value: 'yes', label: t('Suspended') },
                  { value: 'no', label: t('Not suspended') },
                ]}
              />
              <FilterSelect
                label={t('Buried')}
                value={filters.buried}
                onChange={(v) => setFilters((f) => ({ ...f, buried: v as BrowseFilters['buried'] }))}
                options={[
                  { value: 'any', label: t('Any') },
                  { value: 'yes', label: t('Buried') },
                  { value: 'no', label: t('Not buried') },
                ]}
              />
              <div className="flex items-end gap-1.5">
                <FilterSelect
                  label={t('Sort by')}
                  value={sort.key}
                  onChange={(v) => setSort((s) => ({ ...s, key: v as SortKey }))}
                  options={SORT_KEYS.map((k) => ({ value: k, label: t(SORT_LABELS[k]) }))}
                />
                <IconButton
                  icon={sort.direction === 'asc' ? ArrowUp : ArrowDown}
                  label={sort.direction === 'asc' ? t('Ascending') : t('Descending')}
                  size="md"
                  onClick={() => setSort((s) => ({ ...s, direction: s.direction === 'asc' ? 'desc' : 'asc' }))}
                />
              </div>
              {isFiltering(filters) && (
                <Button variant="ghost" size="sm" iconLeft={X} onClick={resetFilters}>{t('Clear')}</Button>
              )}
            </div>
          </div>
        </div>

        {selected.size > 0 && (
          <BulkBar
            count={selected.size}
            cardIds={selectedCardIds}
            api={api}
            onClear={clearSelection}
            onAskReset={() => setPending({ kind: 'reset', cardIds: selectedCardIds })}
            onAskDelete={() => setPending({ kind: 'delete', noteIds: selectedNoteIds })}
            onAskSetDue={() => setPending({ kind: 'setDue', cardIds: selectedCardIds })}
            onAskMove={() => setPending({ kind: 'move', noteIds: selectedNoteIds })}
            onAskTag={(mode) => setPending({ kind: 'tag', noteIds: selectedNoteIds, mode })}
          />
        )}

        {results.length === 0 ? (
          <div className="p-10 text-center">
            <EmptyState
              icon={Search}
              title={t('No cards match')}
              description={t('Try a different search or clear the filters.')}
              action={<Button variant="secondary" size="sm" iconLeft={X} onClick={resetFilters}>{t('Clear filters')}</Button>}
            />
          </div>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th className="w-10">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                    label={t('Select all cards in view')}
                  />
                </Th>
                <Th>{t('Card')}</Th>
                <Th>{t('Deck')}</Th>
                <Th>{t('State')}</Th>
                <Th align="end">{t('Due')}</Th>
                <Th className="w-10"><span className="sr-only">{t('Actions')}</span></Th>
              </tr>
            </thead>
            <tbody>
              {results.map((entry) => (
                <BrowseRow
                  key={entry.card.id}
                  entry={entry}
                  now={now}
                  deckName={deckName(entry.card.deckId)}
                  siblings={siblingCount.get(entry.card.noteId) ?? 1}
                  selected={selected.has(entry.card.id)}
                  onToggle={() => toggleOne(entry.card.id)}
                  api={api}
                  onEdit={onAdd}
                  onInfo={() => setPending({ kind: 'info', entry })}
                  onAskReset={() => setPending({ kind: 'reset', cardIds: [entry.card.id] })}
                  onAskDelete={() => setPending({ kind: 'delete', noteIds: [entry.card.noteId] })}
                  onAskSetDue={() => setPending({ kind: 'setDue', cardIds: [entry.card.id] })}
                />
              ))}
            </tbody>
          </Table>
        )}

        <p className="border-t border-line px-4 py-2.5 text-[11.5px] text-ink-3">
          <span className="tnum font-medium text-ink-2">{results.length}</span>{' '}
          {results.length === 1 ? t('card') : t('cards')}
          {selected.size > 0 && <> · <span className="tnum">{selected.size}</span> {t('selected')}</>}
        </p>
      </Panel>

      {pending?.kind === 'info' && (
        <Dialog onClose={() => setPending(null)} label={t('Card info')} size="lg">
          <PanelHeader title={t('Card info')} icon={Info} />
          <div className="p-5">
            <CardInfoBody entry={pending.entry} events={api.reviewEvents.filter((e) => e.cardId === pending.entry.card.id)} />
          </div>
        </Dialog>
      )}

      {pending?.kind === 'reset' && (
        <ConfirmDialog
          icon={RotateCcw}
          title={t('Reset cards')}
          body={t('This returns the schedule of the selected cards to new, keeping their review history. This cannot be undone.')}
          confirmLabel={t('Reset')}
          onClose={() => setPending(null)}
          onConfirm={() => { api.bulkReset(pending.cardIds); setPending(null) }}
        />
      )}

      {pending?.kind === 'delete' && (
        <ConfirmDialog
          icon={Trash2}
          danger
          title={t('Delete cards')}
          body={t('This permanently deletes the selected notes and every card and schedule they generate. This cannot be undone.')}
          confirmLabel={t('Delete')}
          onClose={() => setPending(null)}
          onConfirm={() => { api.bulkDeleteNotes(pending.noteIds); clearSelection(); setPending(null) }}
        />
      )}

      {pending?.kind === 'setDue' && (
        <SetDueDialog
          onClose={() => setPending(null)}
          onConfirm={(day) => { api.bulkSetDue(pending.cardIds, day); setPending(null) }}
        />
      )}

      {pending?.kind === 'move' && (
        <MoveDeckDialog
          decks={api.decks.filter((d) => !d.provided).map((d) => ({ id: d.id, name: d.name }))}
          onClose={() => setPending(null)}
          onConfirm={(deckId) => { api.bulkMoveNotes(pending.noteIds, deckId); setPending(null) }}
        />
      )}

      {pending?.kind === 'tag' && (
        <TagDialog
          mode={pending.mode}
          allTags={api.allTags}
          presentTags={tagsOn(selectedEntries)}
          onClose={() => setPending(null)}
          onConfirm={(tag) => { api.bulkTag(pending.noteIds, tag, pending.mode === 'add'); setPending(null) }}
        />
      )}
    </div>
  )
}

/* ---- Rows ---------------------------------------------------------------- */

function BrowseRow({
  entry,
  now,
  deckName,
  siblings,
  selected,
  onToggle,
  api,
  onEdit,
  onInfo,
  onAskReset,
  onAskDelete,
  onAskSetDue,
}: {
  entry: CardWithMeta
  now: Date
  deckName: string
  siblings: number
  selected: boolean
  onToggle: () => void
  api: FlashcardsApi
  onEdit: () => void
  onInfo: () => void
  onAskReset: () => void
  onAskDelete: () => void
  onAskSetDue: () => void
}) {
  const t = useT()
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)
  const { card, meta } = entry
  const status = exclusiveStatus(meta, now)
  const buried = isBuried(meta, now)
  const excerpt = noteFrontPlain(entry.note) || t('(empty card)')
  const s = meta.schedule

  const items: ContextMenuItem[] = [
    { id: 'edit', label: t('Edit'), icon: Pencil, onSelect: onEdit },
    { id: 'info', label: t('Card info'), icon: Info, onSelect: onInfo },
    meta.suspended
      ? { id: 'unsuspend', label: t('Unsuspend'), icon: Play, separated: true, onSelect: () => api.suspend(card.id, false) }
      : { id: 'suspend', label: t('Suspend'), icon: Pause, separated: true, onSelect: () => api.suspend(card.id, true) },
    buried
      ? { id: 'unbury', label: t('Unbury'), icon: Eye, onSelect: () => api.bury(card.id, false) }
      : { id: 'bury', label: t('Bury'), icon: EyeOff, onSelect: () => api.bury(card.id, true) },
    { id: 'setdue', label: t('Set due date'), icon: CalendarClock, onSelect: onAskSetDue },
    { id: 'reset', label: t('Reset'), icon: RotateCcw, onSelect: onAskReset },
    { id: 'delete', label: t('Delete'), icon: Trash2, tone: 'danger', separated: true, onSelect: onAskDelete },
  ]

  return (
    <Tr className={cn(selected && 'bg-primary-tint/40')}>
      <Td className="align-top">
        <Checkbox checked={selected} onChange={onToggle} label={t('Select this card')} />
      </Td>
      <Td>
        <div className="flex items-start gap-2">
          <RowFlag flag={meta.flag} onSet={(flag) => api.setFlag(card.id, flag)} />
          <div className="min-w-0">
            <p className="line-clamp-2 text-ink" title={excerpt}>{excerpt}</p>
            <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11.5px] text-ink-3">
              <span className="uppercase tracking-[0.05em]">{t(TYPE_LABELS[entry.note.type])}</span>
              {siblings > 1 && (
                <Tooltip label={t('This note has more than one card')}>
                  <Badge tone="outline">{siblings} {t('cards')}</Badge>
                </Tooltip>
              )}
              {entry.note.tags.map((tag) => (
                <span key={tag} className="rounded bg-inset px-1.5 py-0.5 text-ink-2">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Td>
      <Td className="whitespace-nowrap text-ink-2">{deckName}</Td>
      <Td>
        <Badge tone={STATE_META[status].tone}>{t(STATE_META[status].label)}</Badge>
      </Td>
      <Td align="end" className="whitespace-nowrap">
        <span className="tnum block font-mono text-[12.5px] text-ink-2">{relativeDay(new Date(s.due), now)}</span>
        <span className="tnum block text-[11px] text-ink-3">
          {s.state === 'review' ? <>{s.interval}{t('d interval')}</> : formatRelativeTime(s.due, now)}
        </span>
      </Td>
      <Td className="align-top">
        <IconButton
          icon={MoreHorizontal}
          label={t('Card actions')}
          size="sm"
          onClick={(e) => setMenu({ x: e.clientX, y: e.clientY })}
        />
        {menu && <ContextMenu x={menu.x} y={menu.y} items={items} onClose={() => setMenu(null)} header={excerpt.slice(0, 60)} />}
      </Td>
    </Tr>
  )
}

/* ---- Bulk toolbar -------------------------------------------------------- */

function BulkBar({
  count,
  cardIds,
  api,
  onClear,
  onAskReset,
  onAskDelete,
  onAskSetDue,
  onAskMove,
  onAskTag,
}: {
  count: number
  cardIds: string[]
  api: FlashcardsApi
  onClear: () => void
  onAskReset: () => void
  onAskDelete: () => void
  onAskSetDue: () => void
  onAskMove: () => void
  onAskTag: (mode: 'add' | 'remove') => void
}) {
  const t = useT()
  const flagTrigger = usePopoverTrigger()

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
      <span className="me-1 text-[12.5px] font-medium text-ink-2">
        <span className="tnum">{count}</span> {t('selected')}
      </span>

      <div ref={flagTrigger.setAnchor} className="inline-flex">
        <Button variant="ghost" size="sm" iconLeft={Flag} onClick={flagTrigger.toggle}>{t('Flag')}</Button>
        {flagTrigger.open && (
          <FlagMenu
            anchor={flagTrigger.anchor}
            current={null}
            onClose={flagTrigger.close}
            onPick={(flag) => { api.bulkFlag(cardIds, flag); flagTrigger.close() }}
          />
        )}
      </div>
      <Button variant="ghost" size="sm" iconLeft={FolderInput} onClick={onAskMove}>{t('Move')}</Button>
      <Button variant="ghost" size="sm" iconLeft={Tag} onClick={() => onAskTag('add')}>{t('Add tag')}</Button>
      <Button variant="ghost" size="sm" iconLeft={TagsIcon} onClick={() => onAskTag('remove')}>{t('Remove tag')}</Button>
      <Button variant="ghost" size="sm" iconLeft={Pause} onClick={() => api.bulkSuspend(cardIds, true)}>{t('Suspend')}</Button>
      <Button variant="ghost" size="sm" iconLeft={Play} onClick={() => api.bulkSuspend(cardIds, false)}>{t('Unsuspend')}</Button>
      <Button variant="ghost" size="sm" iconLeft={EyeOff} onClick={() => api.bulkBury(cardIds, true)}>{t('Bury')}</Button>
      <Button variant="ghost" size="sm" iconLeft={Eye} onClick={() => api.bulkBury(cardIds, false)}>{t('Unbury')}</Button>
      <Button variant="ghost" size="sm" iconLeft={CalendarClock} onClick={onAskSetDue}>{t('Set due')}</Button>
      <Button variant="ghost" size="sm" iconLeft={RotateCcw} onClick={onAskReset}>{t('Reset')}</Button>
      <Button variant="ghost" size="sm" iconLeft={Trash2} onClick={onAskDelete}>{t('Delete')}</Button>

      <div className="ms-auto">
        <IconButton icon={X} label={t('Clear selection')} size="sm" onClick={onClear} />
      </div>
    </div>
  )
}

/* ---- Flag menu ----------------------------------------------------------- */

function FlagMenu({
  anchor,
  current,
  onClose,
  onPick,
}: {
  anchor: HTMLElement | null
  current: FlagColor | null
  onClose: () => void
  onPick: (flag: FlagColor | null) => void
}) {
  const t = useT()
  return (
    <Popover anchor={anchor} onClose={onClose} role="menu" label={t('Flag')} className="min-w-[10rem] py-1">
      {FLAGS.map((flag) => (
        <button
          key={flag.color}
          type="button"
          role="menuitem"
          onClick={() => onPick(flag.color)}
          className={cn(
            'flex w-full items-center gap-2.5 px-3 py-2 text-start text-[13px] text-ink-2 transition-colors hover:bg-inset hover:text-ink',
            current === flag.color && 'bg-inset text-ink',
          )}
        >
          <span className="size-2.5 rounded-full" style={{ backgroundColor: flag.token }} />
          {t(flag.label)}
        </button>
      ))}
      <div className="mt-1 border-t border-line pt-1">
        <button
          type="button"
          role="menuitem"
          onClick={() => onPick(null)}
          className="flex w-full items-center gap-2.5 px-3 py-2 text-start text-[13px] text-ink-2 transition-colors hover:bg-inset hover:text-ink"
        >
          <Icon icon={X} size={13} className="text-ink-3" />
          {t('Clear flag')}
        </button>
      </div>
    </Popover>
  )
}

function RowFlag({ flag, onSet }: { flag: FlagColor | null; onSet: (flag: FlagColor | null) => void }) {
  const t = useT()
  const trigger = usePopoverTrigger()
  return (
    <>
      <button
        ref={trigger.setAnchor}
        type="button"
        onClick={trigger.toggle}
        aria-label={flag ? t('Flagged') + ': ' + t(FLAG_META[flag].label) : t('Set flag')}
        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded transition-colors hover:bg-inset"
      >
        {flag ? (
          <span className="size-2.5 rounded-full" style={{ backgroundColor: FLAG_META[flag].token }} />
        ) : (
          <Icon icon={Flag} size={13} className="text-ink-3" />
        )}
      </button>
      {trigger.open && (
        <FlagMenu
          anchor={trigger.anchor}
          current={flag}
          onClose={trigger.close}
          onPick={(next) => { onSet(next); trigger.close() }}
        />
      )}
    </>
  )
}

/* ---- Dialogs ------------------------------------------------------------- */

function ConfirmDialog({
  icon,
  title,
  body,
  confirmLabel,
  danger,
  onClose,
  onConfirm,
}: {
  icon: typeof Trash2
  title: string
  body: string
  confirmLabel: string
  danger?: boolean
  onClose: () => void
  onConfirm: () => void
}) {
  const t = useT()
  return (
    <Dialog onClose={onClose} label={title} size="sm">
      <PanelHeader title={title} icon={icon} />
      <div className="space-y-4 p-5">
        <p className="text-[13.5px] leading-relaxed text-ink-2">{body}</p>
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant={danger ? 'danger' : 'primary'} iconLeft={icon} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </Dialog>
  )
}

function SetDueDialog({ onClose, onConfirm }: { onClose: () => void; onConfirm: (day: string) => void }) {
  const t = useT()
  const [day, setDay] = useState(() => isoDay(new Date()))
  return (
    <Dialog onClose={onClose} label={t('Set due date')} size="sm">
      <PanelHeader title={t('Set due date')} icon={CalendarClock} />
      <div className="space-y-4 p-5">
        <Field label={t('Due date')}>
          <DateField value={day} onChange={setDay} />
        </Field>
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="primary" iconLeft={CalendarClock} onClick={() => day && onConfirm(day)} disabled={!day}>{t('Set due date')}</Button>
        </div>
      </div>
    </Dialog>
  )
}

function MoveDeckDialog({
  decks,
  onClose,
  onConfirm,
}: {
  decks: { id: string; name: string }[]
  onClose: () => void
  onConfirm: (deckId: string) => void
}) {
  const t = useT()
  const [deckId, setDeckId] = useState(decks[0]?.id ?? '')
  return (
    <Dialog onClose={onClose} label={t('Move to deck')} size="sm">
      <PanelHeader title={t('Move to deck')} icon={FolderInput} />
      <div className="space-y-4 p-5">
        {decks.length === 0 ? (
          <p className="text-[13.5px] text-ink-2">{t('There is no deck you own to move these cards into. Provided-deck cards cannot be moved.')}</p>
        ) : (
          <Field label={t('Destination deck')} hint={t('Provided-deck cards in the selection are left where they are.')}>
            <Select value={deckId} onChange={(e) => setDeckId(e.target.value)}>
              {decks.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </Select>
          </Field>
        )}
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="primary" iconLeft={FolderInput} onClick={() => deckId && onConfirm(deckId)} disabled={!deckId}>{t('Move')}</Button>
        </div>
      </div>
    </Dialog>
  )
}

function TagDialog({
  mode,
  allTags,
  presentTags,
  onClose,
  onConfirm,
}: {
  mode: 'add' | 'remove'
  allTags: string[]
  presentTags: string[]
  onClose: () => void
  onConfirm: (tag: string) => void
}) {
  const t = useT()
  const [tag, setTag] = useState('')
  const suggestions = mode === 'add' ? allTags : presentTags
  const title = mode === 'add' ? t('Add tag') : t('Remove tag')
  const value = tag.trim()
  return (
    <Dialog onClose={onClose} label={title} size="sm">
      <PanelHeader title={title} icon={mode === 'add' ? Tag : TagsIcon} />
      <div className="space-y-4 p-5">
        <Field label={t('Tag')} htmlFor="bulk-tag">
          <TextInput
            id="bulk-tag"
            autoFocus
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && value) onConfirm(value) }}
            placeholder={t('e.g. high-yield')}
          />
        </Field>
        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setTag(s)}
                className="rounded-full border border-line bg-surface px-2.5 py-1 text-[12px] text-ink-2 transition-colors hover:border-line-2 hover:text-ink"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="primary" onClick={() => value && onConfirm(value)} disabled={!value}>{title}</Button>
        </div>
      </div>
    </Dialog>
  )
}

/* ---- Small pieces & tables ----------------------------------------------- */

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{label}</span>
      <Select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label} className="min-w-[8.5rem]">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </Select>
    </label>
  )
}

type Pending =
  | { kind: 'info'; entry: CardWithMeta }
  | { kind: 'reset'; cardIds: string[] }
  | { kind: 'delete'; noteIds: string[] }
  | { kind: 'setDue'; cardIds: string[] }
  | { kind: 'move'; noteIds: string[] }
  | { kind: 'tag'; noteIds: string[]; mode: 'add' | 'remove' }
  | null

const STATE_META: Record<ExclusiveStatus, { label: string; tone: 'primary' | 'accent' | 'neutral' | 'success' | 'warning' }> = {
  new: { label: 'New', tone: 'primary' },
  learning: { label: 'Learning', tone: 'accent' },
  relearning: { label: 'Relearning', tone: 'accent' },
  young: { label: 'Young', tone: 'neutral' },
  mature: { label: 'Mature', tone: 'success' },
  suspended: { label: 'Suspended', tone: 'warning' },
  buried: { label: 'Buried', tone: 'neutral' },
}

const TYPE_LABELS: Record<NoteType, string> = {
  basic: 'Basic',
  cloze: 'Cloze',
  'image-occlusion': 'Image occlusion',
}

const SORT_KEYS: SortKey[] = ['created', 'edited', 'due', 'interval', 'lapses', 'deck']
const SORT_LABELS: Record<SortKey, string> = {
  created: 'Created',
  edited: 'Edited',
  due: 'Due',
  interval: 'Interval',
  lapses: 'Lapses',
  deck: 'Deck',
}

function tagsOn(entries: CardWithMeta[]): string[] {
  const set = new Set<string>()
  for (const e of entries) for (const tag of e.note.tags) set.add(tag)
  return [...set].sort((a, b) => a.localeCompare(b))
}
