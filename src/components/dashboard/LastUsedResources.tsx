import { Link } from 'react-router-dom'
import {
  Clock,
  ArrowRight,
  BookMarked,
  PlayCircle,
  ScrollText,
  Layers,
  Newspaper,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ResourceType } from '@/data/types'
import { getSubject, lastUsedResources } from '@/data/student'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Icon } from '@/components/ui/Icon'
import { SubjectDot } from '@/components/ui/Subject'
import { useT } from '@/lib/i18n'

const TYPE_ICON: Record<ResourceType, LucideIcon> = {
  Book: BookMarked,
  Video: PlayCircle,
  Guideline: ScrollText,
  Deck: Layers,
  Article: Newspaper,
}

export function LastUsedResources() {
  const t = useT()
  return (
    <Panel className="flex h-full flex-col">
      <PanelHeader
        title={t('Last used resources')}
        icon={Clock}
        action={
          <Link
            to="/app/resources"
            className="inline-flex items-center gap-1 text-[12.5px] font-medium text-accent hover:text-accent-strong"
          >
            {t('All')}
            <Icon icon={ArrowRight} size={14} className="rtl:-scale-x-100" />
          </Link>
        }
      />
      <div className="flex-1 p-2">
        <ul>
          {lastUsedResources.map((r) => (
            <li key={r.id}>
              <Link to={`/app/resources?resource=${r.id}`} className="group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-inset">
                <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2 transition-colors group-hover:text-ink">
                  <Icon icon={TYPE_ICON[r.type]} size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-ink">
                    {r.title}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink-3">
                    <SubjectDot id={r.subjectId} />
                    <span className="truncate">
                      {getSubject(r.subjectId).name} · {r.meta}
                    </span>
                  </span>
                </span>
                <span className="tnum shrink-0 text-[11.5px] text-ink-3">{r.openedLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}
