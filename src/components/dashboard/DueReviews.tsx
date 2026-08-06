import { Flag, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReviewItem } from '@/data/types'
import { dueReviews } from '@/data/student'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Meter } from '@/components/ui/Meter'
import { ChapterMark } from '@/components/ui/ChapterMark'
import { useT } from '@/lib/i18n'

function retentionTone(r: number): 'danger' | 'warning' | 'success' {
  if (r < 50) return 'danger'
  if (r < 70) return 'warning'
  return 'success'
}

function DueBadge({ dueInDays }: { dueInDays: number }) {
  const t = useT()
  if (dueInDays < 0) return <Badge tone="danger">{t('Overdue')} {Math.abs(dueInDays)}{t('d')}</Badge>
  if (dueInDays === 0) return <Badge tone="warning">{t('Due today')}</Badge>
  return <Badge tone="neutral">{t('In')} {dueInDays}{t('d')}</Badge>
}

function ReviewRow({ item, index }: { item: ReviewItem; index: number }) {
  const t = useT()
  return (
    <li>
      <Link to={`/app/qbank?review=${item.id}`} className="group flex w-full items-start gap-3 rounded-md px-2 py-2.5 text-left transition-colors hover:bg-inset">
        <ChapterMark subjectId={item.subjectId} index={index + 1} compact className="mt-0.5" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-ink">
              {item.topic}
            </span>
            <DueBadge dueInDays={item.dueInDays} />
          </div>
          <div className="mt-1.5 flex items-center gap-2.5">
            <span className="shrink-0 text-[12px] text-ink-3">
              {item.count} {t(item.kind.toLowerCase())}
            </span>
            <Meter
              value={item.retention}
              tone={retentionTone(item.retention)}
              size="sm"
              className="max-w-[120px] flex-1"
            />
            <span className="tnum shrink-0 font-mono text-[11.5px] text-ink-2">
              {item.retention}%
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}

export function DueReviews() {
  const t = useT()
  const items = [...dueReviews].sort((a, b) => a.dueInDays - b.dueInDays)
  const totalItems = items.reduce((sum, r) => sum + r.count, 0)
  const overdue = items.filter((r) => r.dueInDays < 0).length

  return (
    <Panel className="flex h-full flex-col">
      <PanelHeader
        title={t('What deserves attention')}
        icon={Flag}
        action={overdue > 0 ? <Badge tone="danger">{overdue} {t('overdue')}</Badge> : undefined}
      />
      <p className="border-b border-line px-4 py-2 text-[12px] text-ink-3">{t('Reviews ordered by urgency and retention.')}</p>
      <div className="flex-1 p-2">
        <ul>
          {items.map((item, index) => (
            <ReviewRow key={item.id} item={item} index={index} />
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
        <span className="text-[12.5px] text-ink-2">
          <span className="tnum font-mono font-medium text-ink">{totalItems}</span> {t('items')} ·{' '}
          {items.length} {t('topics')}
        </span>
        <Link to="/app/qbank?session=review">
          <Button variant="primary" size="sm" iconLeft={Play}>{t('Start review')}</Button>
        </Link>
      </div>
    </Panel>
  )
}
