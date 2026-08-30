import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Archive, Database, ChevronRight, Network, GraduationCap, CalendarDays } from 'lucide-react'
import { ControlDashboard, type QuestionScope } from './ControlDashboard'
import { QotdPinPanel } from '@/components/admin/QotdPinPanel'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useIdentity } from '@/lib/useIdentity'

type Selection = { universityId?: string; year?: string }
export type QuestionCatalogueView = 'current' | 'archived' | 'qotd'

/**
 * Questions Setup = a left "Master Question Bank" navigator (all questions →
 * per-university → per-year) wrapped around the full question catalogue. The
 * catalogue keeps its own search, status filter, systems→topics grouping, and
 * editor; the rail only narrows the scope. Systems/topics themselves are edited
 * in the single-source Subjects & Topics tab.
 */
export function QuestionsSetup() {
  const [universities] = useUniversityCatalogue()
  const identity = useIdentity()
  const [selection, setSelection] = useState<Selection>({})
  const [openUni, setOpenUni] = useState<string | null>(null)
  const [view, setView] = useState<QuestionCatalogueView>('current')

  useEffect(() => {
    if (identity.contentScope && view === 'archived') setView('current')
  }, [identity.contentScope, view])

  const scope: QuestionScope = { universityId: selection.universityId, year: selection.year }
  const isMaster = view === 'current' && !selection.universityId && !selection.year

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col lg:flex-row">
      {/* Left navigator */}
      <aside className="max-h-[45vh] shrink-0 overflow-y-auto border-b border-line bg-surface-2/40 p-3 lg:max-h-none lg:w-64 lg:overflow-visible lg:border-b-0 lg:border-e">
        {!identity.contentScope && <button
          type="button"
          onClick={() => { setView('current'); setSelection({}); setOpenUni(null) }}
          aria-pressed={isMaster}
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-start text-[13.5px] font-semibold',
            isMaster ? 'bg-primary-tint text-primary-strong' : 'text-ink hover:bg-inset',
          )}
        >
          <Icon icon={Database} size={16} />
          Master Question Bank
        </button>}

        <button
          type="button"
          onClick={() => { setView('archived'); setSelection({}); setOpenUni(null) }}
          aria-pressed={view === 'archived'}
          className={cn(
            'mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-start text-[13.5px] font-semibold',
            view === 'archived' ? 'bg-inset text-ink' : 'text-ink-2 hover:bg-inset',
          )}
        >
          <Icon icon={Archive} size={16} />
          Archived questions
        </button>

        {/* Editors and super admins can curate the Question of the Day; the
            deterministic daily pick and the pins document are cohort-keyed, not
            module-scoped, so this is offered by role (rank ≥ editor) rather than
            gated on a content scope like the Master/Archived views. */}
        {identity.rank >= 2 && <button
          type="button"
          onClick={() => { setView('qotd'); setSelection({}); setOpenUni(null) }}
          aria-pressed={view === 'qotd'}
          className={cn(
            'mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-start text-[13.5px] font-semibold',
            view === 'qotd' ? 'bg-inset text-ink' : 'text-ink-2 hover:bg-inset',
          )}
        >
          <Icon icon={CalendarDays} size={16} />
          Question of the Day
        </button>}

        <p className="mt-4 mb-1.5 px-3 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">By university & year</p>
        <ul className="space-y-0.5">
          {universities.map((u) => {
            const uniOpen = openUni === u.id
            const uniActive = selection.universityId === u.id && !selection.year
            return (
              <li key={u.id}>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => { setView('current'); setOpenUni(uniOpen ? null : u.id) }}
                    className="grid size-10 place-items-center rounded text-ink-3 hover:text-ink sm:size-8"
                    aria-label={uniOpen ? `Collapse ${u.short}` : `Expand ${u.short}`}
                  >
                    <Icon icon={ChevronRight} size={14} className={cn('chevron-turn')} open={uniOpen} />
                  </button>
                  <button
                    type="button"
                    onClick={() => { setView('current'); setSelection({ universityId: u.id }); setOpenUni(u.id) }}
                    aria-pressed={uniActive}
                    className={cn(
                      'flex min-h-10 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-start text-[13px]',
                      uniActive ? 'bg-primary-tint font-medium text-primary-strong' : 'text-ink-2 hover:bg-inset',
                    )}
                  >
                    <Icon icon={GraduationCap} size={14} />
                    <span className="font-medium">{u.short}</span>
                    <span className="truncate text-[11.5px] text-ink-3">{u.name}</span>
                  </button>
                </div>
                {uniOpen && (
                  <ul className="ms-8 mt-0.5 space-y-0.5 border-s border-line ps-2">
                    {u.years.map((yr) => yr.year).map((y) => {
                      const yearActive = selection.universityId === u.id && selection.year === y
                      return (
                        <li key={y}>
                          <button
                            type="button"
                            onClick={() => { setView('current'); setSelection({ universityId: u.id, year: y }) }}
                            aria-pressed={yearActive}
                            className={cn(
                              'block min-h-10 w-full rounded px-2.5 py-1.5 text-start text-[12.5px]',
                              yearActive ? 'bg-primary-tint font-medium text-primary-strong' : 'text-ink-3 hover:bg-inset hover:text-ink-2',
                            )}
                          >
                            {y}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>

        <Link to="/admin/taxonomy" className="mt-4 flex min-h-11 items-center gap-2 rounded-lg border border-line px-3 py-2 text-[12px] text-ink-2 hover:border-primary-line hover:text-primary-strong">
          <Icon icon={Network} size={14} />
          Edit systems & topics
        </Link>
      </aside>

      {/* Scoped catalogue */}
      <div className="min-w-0 flex-1">
        {view === 'qotd' ? (
          <QotdPinPanel />
        ) : (
          <>
            <div className="border-b border-line bg-surface px-5 py-2.5 text-[12.5px] text-ink-2">
              <span className="font-medium text-ink">Scope:</span>{' '}
              {view === 'archived'
                ? 'Archive — retired questions from every former university and year'
                : isMaster
                ? 'Master Question Bank — every question'
                : `${universities.find((u) => u.id === selection.universityId)?.short ?? ''}${selection.year ? ` · ${selection.year}` : ' · all years'}`}
            </div>
            <ControlDashboard key={`${view}-${selection.universityId ?? 'all'}-${selection.year ?? 'all'}`} initialKind="question" lockedKind questionScope={scope} questionView={view} archiveControl="external" />
          </>
        )}
      </div>
    </div>
  )
}
