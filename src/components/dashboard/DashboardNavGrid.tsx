import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BookOpen, FolderOpen, Layers, Target } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { usePracticeProgress } from '@/lib/usePracticeProgress'
import { useFlashcardsDueToday } from '@/lib/useFlashcardsDueToday'
import { useLiveResources } from '@/lib/useLiveResources'
import { useT } from '@/lib/i18n'

function NavTile({ to, icon, title, stat }: { to: string; icon: LucideIcon; title: string; stat: string }) {
  return (
    <Link
      to={to}
      className="group flex min-w-0 flex-col gap-2.5 rounded-xl border border-line bg-surface p-4 shadow-panel transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:shadow-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-mist-line bg-mist text-primary-strong">
        <Icon icon={icon} size={17} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[14px] font-semibold text-ink">{title}</span>
        <span className="mt-0.5 block truncate text-[12px] text-ink-3">{stat}</span>
      </span>
    </Link>
  )
}

/**
 * The four doors off the home hero, each carrying the one stat that page
 * already reports elsewhere — the same bank total Practice's own card shows,
 * the same due count Revise's flashcards card computes, the same published
 * count Resources itself lists — so nothing here can read differently from
 * the page it opens onto.
 */
export function DashboardNavGrid() {
  const t = useT()
  const { bankTotal } = usePracticeProgress()
  const dueToday = useFlashcardsDueToday()
  const resourceCount = useLiveResources().length

  return (
    <div className="grid w-full max-w-[60rem] grid-cols-2 gap-3">
      <NavTile
        to="/app/practice"
        icon={Target}
        title={t('Practice')}
        stat={bankTotal ? `${bankTotal.toLocaleString()} ${t('questions')}` : t('Every exam format')}
      />
      <NavTile
        to="/app/flashcards"
        icon={Layers}
        title={t('Flashcards')}
        stat={dueToday === 1 ? `1 ${t('card due')}` : `${dueToday} ${t('due')}`}
      />
      <NavTile
        to="/app/library"
        icon={BookOpen}
        title={t('Library')}
        stat={t('Concepts & sources')}
      />
      <NavTile
        to="/app/resources"
        icon={FolderOpen}
        title={t('Resources')}
        stat={resourceCount ? `${resourceCount.toLocaleString()} ${t('resources')}` : t('Books & videos')}
      />
    </div>
  )
}
