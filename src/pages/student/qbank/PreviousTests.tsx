import { useState } from 'react'
import {
  Play,
  ChevronDown,
  RotateCcw,
  Shuffle,
  History,
  MoreHorizontal,
  Square,
  Eye,
  PenLine,
  Trash2,
}from 'lucide-react'
import { type Question } from '@/data/qbank'
import type { AttemptRecord } from '@/data/attempts'
import { sessionDetail, type SessionSummary } from '@/data/attemptStats'
import { formatLongDate } from '@/lib/format'
import { useSubjectName } from '@/lib/useSubjectName'
import { SittingKindBadge } from '@/components/qbank/unified/SittingRows'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { TextInput } from '@/components/ui/Field'
import { IconButton } from '@/components/ui/IconButton'
import { ContextMenu } from '@/components/ui/ContextMenu'
import { Dialog } from '@/components/ui/Dialog'
import { SubjectDot } from '@/components/ui/Subject'
import { cn } from '@/lib/cn'
import { SessionDetailPanel } from './SessionDetailPanel'

/**
 * Tests already taken, and what to do about them.
 *
 * Reconstructed from the attempt log rather than stored twice: every record has
 * always carried the sessionId of the sitting that produced it, and nothing ever
 * read it back, so a student had no way to see what they had done.
 *
 * A row used to carry a name, a date, a count and one accuracy figure, with
 * every action buried behind a "…" menu — so the most useful thing a finished
 * test can offer, which is sitting it again, was three interactions deep and
 * did not exist. It opens onto its own numbers, and the two ways of taking it
 * again are one press each.
 */
export function PreviousTests({
  sessions,
  names,
  liveSessionId,
  records,
  questions,
  onRename,
  onResume,
  onTerminate,
  onReview,
  onRetakeSame,
  onRetakeScope,
  onDelete,
  canReview,
  canRetakeSame,
  t,
}: {
  sessions: SessionSummary[]
  names: Record<string, string>
  /** The sitting still in progress, if there is one. */
  liveSessionId: string | null
  /** The whole log; each row reads only its own sitting out of it. */
  records: AttemptRecord[]
  questions: Question[]
  onRename: (sessionId: string, name: string) => void
  onResume: () => void
  onTerminate: () => void
  onReview: (sessionId: string) => void
  onRetakeSame: (sessionId: string) => void
  onRetakeScope: (entry: SessionSummary) => void
  onDelete: (sessionId: string) => void
  canReview: (sessionId: string) => boolean
  canRetakeSame: (sessionId: string) => boolean
  t: (key: string) => string
}) {
  const subjectName = useSubjectName()
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [menu, setMenu] = useState<{ sessionId: string; x: number; y: number } | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  if (!sessions.length) {
    return (
      <Panel>
        <div className="px-5 py-12 text-center">
          <span className="mx-auto grid size-11 place-items-center rounded-xl bg-inset text-ink-3"><Icon icon={History} size={20} /></span>
          <p className="mt-3 text-[14px] font-semibold text-ink">{t('No tests yet')}</p>
          <p className="mx-auto mt-1 max-w-sm text-[12.5px] leading-relaxed text-ink-3">{t('Start a session and it will be kept here, with what you scored.')}</p>
        </div>
      </Panel>
    )
  }

  return (
    <Panel>
      <ul className="divide-y divide-line">
        {sessions.map((entry) => {
          const name = names[entry.sessionId]?.trim() || t('Untitled test')
          const isEditing = editing === entry.sessionId
          const isOpen = expanded === entry.sessionId
          const live = entry.sessionId === liveSessionId
          return (
            <li key={entry.sessionId}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : entry.sessionId)}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? t('Hide') : t('Show')} ${name}`}
                  className="grid size-11 shrink-0 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink sm:size-7"
                >
                  <Icon icon={ChevronDown} size={15} className={cn('transition-transform duration-150', !isOpen && '-rotate-90 rtl:rotate-90')} />
                </button>
                <div className="min-w-0 flex-1">
                  {isEditing ? (
                    <form
                      onSubmit={(event) => { event.preventDefault(); onRename(entry.sessionId, draft.trim()); setEditing(null) }}
                      className="flex items-center gap-2"
                    >
                      <TextInput
                        value={draft}
                        autoFocus
                        maxLength={60}
                        onChange={(event) => setDraft(event.target.value)}
                        onBlur={() => { onRename(entry.sessionId, draft.trim()); setEditing(null) }}
                        aria-label={t('Test name')}
                      />
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setDraft(names[entry.sessionId] ?? ''); setEditing(entry.sessionId) }}
                      className="flex min-h-11 max-w-full items-center text-start text-[13.5px] font-semibold text-ink hover:text-primary-strong sm:min-h-0"
                      title={t('Rename')}
                    >
                      <span className="min-w-0 truncate">{name}</span>
                    </button>
                  )}
                  {/* `min-w-0` and a truncating subject: wrapping alone cannot
                      save a line whose single longest item is wider than a
                      phone, and "Cardiovascular" beside a date and a count is
                      exactly that. */}
                  <p className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2 text-[11.5px] text-ink-3">
                    <span>{formatLongDate(new Date(entry.startedAt))}</span>
                    <span aria-hidden>·</span>
                    <span>{entry.answered} {entry.answered === 1 ? t('question') : t('questions')}</span>
                    {entry.subjectIds.slice(0, 2).map((subjectId) => (
                      <span key={subjectId} className="inline-flex min-w-0 max-w-full items-center gap-1">
                        <SubjectDot id={subjectId} />
                        <span className="truncate">{subjectName(subjectId)}</span>
                      </span>
                    ))}
                  </p>
                </div>
                {/* Every row in this list says what kind of test it was, because
                    the list now holds four kinds and "11 questions" and "11
                    items" are not the same sitting. */}
                <SittingKindBadge kind="mcq" />
                {live && <Badge tone="warning">{t('In progress')}</Badge>}
                {/* An unmarked sitting shows a dash, not a nought: nobody scored it. */}
                <span className="tnum shrink-0 font-mono text-[15px] font-semibold text-ink">
                  {entry.accuracy == null ? '—' : `${Math.round(entry.accuracy * 100)}%`}
                </span>
                <IconButton
                  icon={MoreHorizontal}
                  label={`${t('Actions for')} ${name}`}
                  size="sm"
                  onClick={(event) => {
                    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
                    setMenu({ sessionId: entry.sessionId, x: rect.left, y: rect.bottom + 4 })
                  }}
                />
              </div>

              {isOpen && (
                <>
                  <SessionDetailPanel detail={sessionDetail(records, entry.sessionId)} questions={questions} t={t} />
                  {/* Out of the menu and onto the surface. Sitting a test again
                      is the most useful thing a finished test offers, and it
                      was not offered at all. */}
                  <div className="flex flex-wrap gap-2 border-t border-line bg-surface-2/40 px-4 pb-4 sm:px-5">
                    <Button
                      size="sm"
                      variant="primary"
                      iconLeft={RotateCcw}
                      disabled={!canRetakeSame(entry.sessionId)}
                      title={canRetakeSame(entry.sessionId) ? undefined : t('None of these questions are published any more')}
                      onClick={() => onRetakeSame(entry.sessionId)}
                    >
                      {t('Retake these questions')}
                    </Button>
                    <Button size="sm" variant="secondary" iconLeft={Shuffle} onClick={() => onRetakeScope(entry)}>
                      {t('New test, same scope')}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      iconLeft={Eye}
                      disabled={!canReview(entry.sessionId)}
                      onClick={() => onReview(entry.sessionId)}
                    >
                      {t('Review answers')}
                    </Button>
                    {live && (
                      <Button size="sm" variant="ghost" iconLeft={Play} onClick={onResume}>{t('Resume this test')}</Button>
                    )}
                  </div>
                </>
              )}
            </li>
          )
        })}
      </ul>

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          items={[
            ...(menu.sessionId === liveSessionId ? [
              { id: 'resume', label: t('Resume this test'), icon: Play, onSelect: onResume },
              { id: 'terminate', label: t('End this test'), icon: Square, onSelect: onTerminate },
            ] : []),
            {
              id: 'retake',
              label: t('Retake these questions'),
              icon: RotateCcw,
              disabled: !canRetakeSame(menu.sessionId),
              onSelect: () => onRetakeSame(menu.sessionId),
            },
            {
              id: 'review',
              label: t('Review answers'),
              icon: Eye,
              disabled: !canReview(menu.sessionId),
              onSelect: () => onReview(menu.sessionId),
            },
            {
              id: 'rename',
              label: t('Rename'),
              icon: PenLine,
              onSelect: () => { setDraft(names[menu.sessionId] ?? ''); setEditing(menu.sessionId) },
            },
            {
              id: 'delete',
              label: t('Delete this test'),
              icon: Trash2,
              tone: 'danger' as const,
              separated: true,
              onSelect: () => setConfirmDelete(menu.sessionId),
            },
          ]}
        />
      )}

      {confirmDelete && (
        <Dialog onClose={() => setConfirmDelete(null)} label={t('Delete this test')} size="sm">
          <PanelHeader title={t('Delete this test')} icon={Trash2} />
          <div className="space-y-4 p-5">
            {/* Said plainly, because it is not only a row disappearing: these
                answers are part of the accuracy every other screen reports. */}
            <p className="text-[13.5px] leading-relaxed text-ink-2">
              {t('This removes every answer from that sitting. Your overall accuracy and progress will be recalculated without them, and it cannot be undone.')}
            </p>
            <div className="flex justify-end gap-2 border-t border-line pt-4">
              <Button variant="ghost" onClick={() => setConfirmDelete(null)}>{t('Cancel')}</Button>
              <Button
                variant="danger"
                iconLeft={Trash2}
                onClick={() => { onDelete(confirmDelete); setConfirmDelete(null) }}
              >
                {t('Delete')}
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </Panel>
  )
}
