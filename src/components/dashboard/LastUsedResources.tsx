import { Link } from 'react-router-dom'
import {
  Clock,
  ArrowRight,
  BookMarked,
  PlayCircle,
  ScrollText,
  Layers,
  Newspaper,
  FolderOpen,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useSubjectName } from '@/lib/useSubjectName'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { SubjectDot } from '@/components/ui/Subject'
import { useRecentResources } from '@/lib/useRecentResources'
import { useRelativeTime } from '@/lib/useRelativeTime'
import { useT } from '@/lib/i18n'

const TYPE_ICON: Record<string, LucideIcon> = {
  Book: BookMarked,
  Video: PlayCircle,
  Guideline: ScrollText,
  Deck: Layers,
  Article: Newspaper,
}

export function LastUsedResources() {
  const t = useT()
  const relativeTime = useRelativeTime()
  const subjectName = useSubjectName()
  const { recent } = useRecentResources()

  return (
    <Panel className="flex h-full flex-col">
      <PanelHeader
        title={t('Last used resources')}
        icon={Clock}
        action={
          <Link
            to="/app/resources"
            className="inline-flex items-center gap-1 text-[12.5px] font-medium text-primary hover:text-primary-strong"
          >
            {t('All')}
            <Icon icon={ArrowRight} size={14} className="rtl:-scale-x-100" />
          </Link>
        }
      />
      {recent.length === 0 ? (
        <div className="flex flex-1 items-center justify-center p-4">
          <EmptyState
            icon={FolderOpen}
            title={t('Nothing opened yet')}
            description={t('Resources you open appear here, so you can pick up where you left off.')}
            action={<ButtonLink to="/app/resources" variant="secondary" size="sm">{t('Browse resources')}</ButtonLink>}
          />
        </div>
      ) : (
        <div className="flex-1 p-2">
          <ul>
            {/* Capped so this half matches the heatmap's height and sits cleanly. */}
            {recent.slice(0, 4).map((r) => (
              <li key={r.id}>
                <Link to={`/app/resources?resource=${r.id}`} className="group flex w-full items-center gap-3 rounded-md px-2 py-2 text-start transition-colors hover:bg-inset">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2 transition-colors group-hover:text-ink">
                    <Icon icon={TYPE_ICON[r.type] ?? Newspaper} size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium text-ink">{r.title}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink-3">
                      <SubjectDot id={r.subjectId} />
                      <span className="truncate">
                        {subjectName(r.subjectId)}{r.meta ? ` · ${r.meta}` : ''}
                      </span>
                    </span>
                  </span>
                  <span className="tnum shrink-0 text-[11.5px] text-ink-3">{relativeTime(r.openedAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Panel>
  )
}
