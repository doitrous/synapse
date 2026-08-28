import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FolderOpen, ChevronRight, Network, GraduationCap } from 'lucide-react'
import { ControlDashboard, type ContentScope } from './ControlDashboard'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { usePersistentState } from '@/lib/usePersistentState'
import { useScopedItems } from '@/lib/useScopedContent'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, itemInScope, type ManagedContentItem } from '@/data/contentControl'
import { Icon } from '@/components/ui/Icon'
import { StorageLimitsPanel } from '@/components/admin/StorageLimitsPanel'
import { MediaLibraryBrowser } from '@/components/admin/MediaLibraryBrowser'
import { cn } from '@/lib/cn'

type Selection = { universityId?: string; year?: string }

/**
 * Resources & Media = a left "Master Resources & Media" navigator (all →
 * per-university → per-year) wrapped around the full resource catalogue. The
 * catalogue keeps its Files/Videos tabs, search, status filter, and editor; the
 * rail only narrows the scope. Systems/topics are edited in Subjects & Topics.
 */
export function ResourcesSetup() {
  const [universities] = useUniversityCatalogue()
  const [selection, setSelection] = useState<Selection>({})
  const [openUni, setOpenUni] = useState<string | null>(null)
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const items = useScopedItems(ledger)

  const scope: ContentScope = { universityId: selection.universityId, year: selection.year }
  const isMaster = !selection.universityId && !selection.year

  const resources = useMemo(() => items.filter((item) => item.kind === 'resource'), [items])

  /**
   * Counts per branch, using the same scope test the catalogue applies — so a
   * number in the rail always matches what opening it shows. `review` is the
   * number that matters day to day: it says where the work is.
   */
  const countsFor = useCallback((universityId?: string, year?: string) => {
    const inScope = resources.filter((item) => {
      return itemInScope(item, universityId, year)
    })
    return { total: inScope.length, review: inScope.filter((item) => item.status === 'In review').length }
  }, [resources])

  const master = countsFor()

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col lg:flex-row">
      {/* Left navigator */}
      <aside className="max-h-[45vh] shrink-0 overflow-y-auto border-b border-line bg-surface-2/40 p-3 lg:max-h-none lg:w-64 lg:overflow-visible lg:border-b-0 lg:border-e">
        <button
          type="button"
          onClick={() => { setSelection({}); setOpenUni(null) }}
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-start text-[13.5px] font-semibold',
            isMaster ? 'bg-primary-tint text-primary-strong' : 'text-ink hover:bg-inset',
          )}
        >
          <Icon icon={FolderOpen} size={16} />
          <span className="flex-1">Master Resources & Media</span>
          <span className="tnum font-mono text-[11px] text-ink-3">{master.total}</span>
        </button>
        {master.review > 0 && (
          <p className="mt-1.5 px-3 text-[11.5px] text-warning">
            <span className="tnum font-mono font-semibold">{master.review}</span> awaiting review
          </p>
        )}

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
                    className="grid size-10 place-items-center rounded text-ink-3 hover:text-ink sm:size-8"
                    aria-label={uniOpen ? `Collapse ${u.short}` : `Expand ${u.short}`}
                  >
                    <Icon icon={ChevronRight} size={14} className={cn('chevron-turn')} open={uniOpen} />
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelection({ universityId: u.id }); setOpenUni(u.id) }}
                    className={cn(
                      'flex min-h-10 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-start text-[13px]',
                      uniActive ? 'bg-primary-tint font-medium text-primary-strong' : 'text-ink-2 hover:bg-inset',
                    )}
                  >
                    <Icon icon={GraduationCap} size={14} />
                    <span className="font-medium">{u.short}</span>
                    <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink-3">{u.name}</span>
                    {countsFor(u.id).review > 0 && <span className="tnum shrink-0 rounded-full bg-warning-tint px-1.5 font-mono text-[10px] font-semibold text-warning">{countsFor(u.id).review}</span>}
                    <span className="tnum shrink-0 font-mono text-[10.5px] text-ink-3">{countsFor(u.id).total}</span>
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
        <div className="border-b border-line bg-surface px-5 py-2.5 text-[12.5px] text-ink-2">
          <span className="font-medium text-ink">Scope:</span>{' '}
          {isMaster
            ? 'Master Resources & Media — every resource'
            : `${universities.find((u) => u.id === selection.universityId)?.short ?? ''}${selection.year ? ` · ${selection.year}` : ' · all years'}`}
        </div>
        <div className="px-5 pt-3">
          <MediaLibraryBrowser />
          <StorageLimitsPanel />
        </div>
        <ControlDashboard key={`${selection.universityId ?? 'all'}-${selection.year ?? 'all'}`} initialKind="resource" lockedKind scope={scope} />
      </div>
    </div>
  )
}
