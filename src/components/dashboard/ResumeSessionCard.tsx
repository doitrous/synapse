import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { useActiveQbankSession } from '@/lib/useActiveQbankSession'
import { useT } from '@/lib/i18n'

/**
 * The paused sitting QuestionBank already keeps in local storage, surfaced
 * here so getting back into it never needs a stop at the hub first. Renders
 * nothing when nothing is in progress — a shortcut earns its place only when
 * there is somewhere to jump to.
 */
export function ResumeSessionCard() {
  const t = useT()
  const session = useActiveQbankSession()
  if (!session) return null

  return (
    <Panel className="flex w-full max-w-[60rem] items-center justify-between gap-4 p-4">
      <div className="min-w-0">
        <p className="text-[13.5px] font-semibold text-ink">{t('Pick up where you left off')}</p>
        <p className="mt-0.5 truncate text-[12.5px] text-ink-3">
          {session.name} &middot; {t('question')} {session.position} {t('of')} {session.total}
        </p>
      </div>
      <Link
        to="/app/qbank"
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-primary-line px-4 text-[13px] font-semibold text-primary-strong transition-colors hover:bg-primary-tint"
      >
        <Play size={14} strokeWidth={2.15} aria-hidden="true" />
        {t('Resume')}
      </Link>
    </Panel>
  )
}
