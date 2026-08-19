import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Stethoscope, ChevronRight, Network, GraduationCap } from 'lucide-react'
import { ControlDashboard, type ContentScope } from './ControlDashboard'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

type Selection = { universityId?: string; year?: string }

/**
 * Practical Setup = a left "Master Practical" navigator (all practicals →
 * per-university → per-year) wrapped around the full practical catalogue, matching
 * Questions Setup and Resources & Media. Systems/topics are edited in Subjects & Topics.
 */
export function PracticalSetup() {
  const [universities] = useUniversityCatalogue()
  const [selection, setSelection] = useState<Selection>({})
  const [openUni, setOpenUni] = useState<string | null>(null)

  const scope: ContentScope = { universityId: selection.universityId, year: selection.year }
  const isMaster = !selection.universityId && !selection.year

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col lg:flex-row">
      <aside className="max-h-[45vh] shrink-0 overflow-y-auto border-b border-line bg-surface-2/40 p-3 lg:max-h-none lg:w-64 lg:overflow-visible lg:border-b-0 lg:border-e">
        <button
          type="button"
          onClick={() => { setSelection({}); setOpenUni(null) }}
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[13.5px] font-semibold',
            isMaster ? 'bg-primary-tint text-primary-strong' : 'text-ink hover:bg-inset',
          )}
        >
          <Icon icon={Stethoscope} size={16} />
          Master Practical
        </button>

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
                    onClick={() => setOpenUni(uniOpen ? null : u.id)}
                    className="grid size-7 place-items-center rounded text-ink-3 hover:text-ink"
                    aria-label={uniOpen ? `Collapse ${u.short}` : `Expand ${u.short}`}
                  >
                    <Icon icon={ChevronRight} size={14} className={cn('chevron-turn')} open={uniOpen} />
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelection({ universityId: u.id }); setOpenUni(u.id) }}
                    className={cn(
                      'flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px]',
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
                            onClick={() => setSelection({ universityId: u.id, year: y })}
                            className={cn(
                              'block w-full rounded px-2.5 py-1.5 text-left text-[12.5px]',
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

        <Link to="/admin/taxonomy" className="mt-4 flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-[12px] text-ink-2 hover:border-primary-line hover:text-primary-strong">
          <Icon icon={Network} size={14} />
          Edit systems & topics
        </Link>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="border-b border-line bg-surface px-5 py-2.5 text-[12.5px] text-ink-2">
          <span className="font-medium text-ink">Scope:</span>{' '}
          {isMaster
            ? 'Master Practical — every station & case'
            : `${universities.find((u) => u.id === selection.universityId)?.short ?? ''}${selection.year ? ` · ${selection.year}` : ' · all years'}`}
        </div>
        <ControlDashboard key={`${selection.universityId ?? 'all'}-${selection.year ?? 'all'}`} initialKind="practical" lockedKind scope={scope} />
      </div>
    </div>
  )
}
