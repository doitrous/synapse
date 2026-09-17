import { useMemo, useState } from 'react'
import { ChevronDown, History, ListChecks, PenLine, Shuffle, Stethoscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { BankItemRow } from './BankItemRow'
import { usePracticalCatalogue } from './practicalCatalogue'
import { useLiveEssays } from '@/lib/useLiveEssays'
import type { Sitting, SittingKind } from '@/data/sittings'
import { formatLongDate } from '@/lib/format'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const KIND_ICON: Record<SittingKind, LucideIcon> = {
  mcq: ListChecks,
  practical: Stethoscope,
  essay: PenLine,
  mixed: Shuffle,
}

const KIND_WORD: Record<SittingKind, string> = {
  mcq: 'MCQ',
  practical: 'Practical',
  essay: 'Essay',
  mixed: 'Mixed',
}

/** The kind of a sitting, as an icon and a word — never the icon alone. */
export function SittingKindBadge({ kind }: { kind: SittingKind }) {
  const t = useT()
  return (
    <Badge tone="outline" className="shrink-0">
      <Icon icon={KIND_ICON[kind]} size={13} />
      {t(KIND_WORD[kind])}
    </Badge>
  )
}

/**
 * Sittings that are not MCQ papers, listed.
 *
 * The MCQ list is its own component and keeps its own actions — review, rename,
 * retake, delete — because they are wired to session state this list has no
 * business holding. What a practical or a written sitting can honestly offer is
 * what it contained, so that is what a row opens onto.
 */
export function SittingRows({ sittings, onDelete }: { sittings: Sitting[]; onDelete?: (id: string) => void }) {
  const t = useT()
  const catalogue = usePracticalCatalogue()
  const { items: essays } = useLiveEssays()
  const [open, setOpen] = useState<string | null>(null)

  const essaysById = useMemo(() => new Map(essays.map((essay) => [essay.id, essay])), [essays])

  /** What a sitting is called when the student did not name it. */
  function title(sitting: Sitting): string {
    if (sitting.name?.trim()) return sitting.name.trim()
    if (sitting.kind === 'mixed') {
      const counts = sitting.bankCounts
      const parts = counts
        ? [
            counts.mcq ? `${counts.mcq} ${t('MCQ')}` : '',
            counts.practical ? `${counts.practical} ${t('practical')}` : '',
            counts.essay ? `${counts.essay} ${t('essay')}` : '',
          ].filter(Boolean)
        : []
      return [t('Mixed'), ...parts].join(' · ')
    }
    if (sitting.kind === 'practical') {
      return `${sitting.itemCount} ${sitting.itemCount === 1 ? t('practical item') : t('practical items')}`
    }
    if (sitting.kind === 'essay') {
      return `${sitting.itemCount} ${sitting.itemCount === 1 ? t('essay') : t('essays')}`
    }
    return `${sitting.itemCount} ${t('questions')}`
  }

  /** The result, in the terms this kind is actually marked in. */
  function result(sitting: Sitting): string {
    const { correct, covered, total } = sitting.result
    if (sitting.kind === 'mcq') {
      return correct == null || !total ? t('not marked') : `${correct} / ${total} ${t('correct')}`
    }
    if (sitting.kind === 'practical') {
      const reached = `${covered ?? 0} / ${total} ${t('reached')}`
      // "Passed" only where something was actually judged — a station under
      // half marks, a case with a wrong decision, a set left part-done.
      return correct == null ? reached : `${reached} · ${correct} ${t('passed')}`
    }
    if (sitting.kind === 'essay') {
      return total === 0 ? t('not marked yet') : `${covered ?? 0} / ${total} ${t('key points')}`
    }
    return `${covered ?? 0} / ${total} ${t('items reached')}`
  }

  /** One line per bank, for a mixed sitting. */
  function bankLine(sitting: Sitting): string | null {
    const counts = sitting.bankCounts
    if (!counts) return null
    return [
      `${counts.mcq} ${t('MCQ')}`,
      `${counts.practical} ${t('practical')}`,
      `${counts.essay} ${t('essay')}`,
    ].join(' · ')
  }

  /** What the sitting held, resolved back to titles where the bank still has them. */
  function items(sitting: Sitting) {
    return sitting.itemIds.map((raw) => {
      // Mixed sittings store `kind:id`; a single-bank sitting stores bare ids.
      const [maybeKind, ...rest] = raw.split(':')
      const known = maybeKind === 'mcq' || maybeKind === 'practical' || maybeKind === 'essay'
      const kind = known ? maybeKind : sitting.kind === 'mixed' ? null : sitting.kind
      const id = known ? rest.join(':') : raw
      if (kind === 'practical') {
        const entry = catalogue.byId.get(id)
        return entry
          ? { id: raw, title: entry.title, subjectId: entry.subjectId }
          : { id: raw, title: t('No longer published'), subjectId: '' }
      }
      if (kind === 'essay') {
        const essay = essaysById.get(id)
        return essay
          ? { id: raw, title: essay.title, subjectId: essay.subjectId }
          : { id: raw, title: t('No longer published'), subjectId: '' }
      }
      // An MCQ inside a mixed sitting: the question bank is not loaded here, and
      // naming it would mean holding the whole pool for a list of past tests.
      return { id: raw, title: t('MCQ question'), subjectId: '' }
    })
  }

  if (!sittings.length) {
    return (
      <Panel>
        <div className="px-5 py-12 text-center">
          <span className="mx-auto grid size-11 place-items-center rounded-xl bg-inset text-ink-3"><Icon icon={History} size={20} /></span>
          <p className="mt-3 text-[14px] font-semibold text-ink">{t('No tests of this kind yet')}</p>
          <p className="mx-auto mt-1 max-w-sm text-[12.5px] leading-relaxed text-ink-3">
            {t('Build one above and it will be kept here, with what it was made of.')}
          </p>
        </div>
      </Panel>
    )
  }

  return (
    <Panel>
      <ul className="divide-y divide-line">
        {sittings.map((sitting) => {
          const isOpen = open === sitting.id
          const line = bankLine(sitting)
          return (
            <li key={sitting.id}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3.5">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : sitting.id)}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? t('Hide') : t('Show')} ${title(sitting)}`}
                  className="grid size-11 shrink-0 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink sm:size-7"
                >
                  <Icon icon={ChevronDown} size={15} className={cn('transition-transform duration-150', !isOpen && '-rotate-90 rtl:rotate-90')} />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold text-ink">{title(sitting)}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11.5px] text-ink-3">
                    <span>{formatLongDate(new Date(sitting.finishedAt))}</span>
                    <span aria-hidden>·</span>
                    <span>{result(sitting)}</span>
                    {line && sitting.kind === 'mixed' && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{line}</span>
                      </>
                    )}
                  </p>
                </div>
                <SittingKindBadge kind={sitting.kind} />
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(sitting.id)}
                    className="min-h-11 rounded-md border border-line px-2.5 text-[11.5px] font-semibold text-ink-2 transition-colors hover:bg-inset hover:text-ink sm:min-h-8"
                  >
                    {t('Delete')}
                  </button>
                )}
              </div>

              {isOpen && (
                <ul className="divide-y divide-line border-t border-line bg-surface-2/40">
                  {items(sitting).map((item, index) => (
                    <BankItemRow
                      key={`${item.id}-${index}`}
                      title={item.title}
                      subjectId={item.subjectId}
                    />
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}
