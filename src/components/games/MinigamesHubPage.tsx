import { AlertTriangle, Building2, Crosshair, Grid3x3, ListOrdered, Shuffle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'

const games = [
  {
    title: 'Term Grid',
    description: 'Crossword practice from the published glossary.',
    href: '/app/term-grid',
    icon: Grid3x3,
    badge: 'Glossary',
  },
  {
    title: 'Spotter',
    description: 'Identify authored histology structures under time pressure.',
    href: '/app/spotter',
    icon: Crosshair,
    badge: 'Histology',
  },
  {
    title: 'Term Match',
    description: 'Match fixed terms to shuffled definitions or Arabic translations.',
    href: '/app/term-match',
    icon: Shuffle,
    badge: 'Glossary',
  },
  {
    title: 'Clinical Sequence',
    description: 'Order reviewed procedural or clinical steps.',
    href: '/app/clinical-sequence',
    icon: ListOrdered,
    badge: 'Authored pack',
  },
  {
    title: 'Mechanism Chain',
    description: 'Rebuild reviewed cause-to-effect chains.',
    href: '/app/mechanism-chain',
    icon: ListOrdered,
    badge: 'Authored pack',
  },
  {
    title: 'Red Flag Sort',
    description: 'Classify reviewed findings by escalation level.',
    href: '/app/red-flag-sort',
    icon: AlertTriangle,
    badge: 'Authored pack',
  },
  // Not a quiz like the other six, and kept here so it stays reachable: the
  // hospital builder is the one game with nothing to score against a pack.
  {
    title: 'Build Maristanas',
    description: 'Build and run a teaching hospital, ward by ward.',
    href: '/app/maristanas',
    icon: Building2,
    badge: 'Simulation',
  },
] as const

export function MinigamesHubPage() {
  const t = useT()

  return (
    <PageContainer>
      <PageHeader
        title={t('Minigames')}
        back={{ fallback: '/app' }}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {games.map((game) => (
          <Link
            key={game.href}
            to={game.href}
            className="group rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            <Panel className="flex h-full flex-col gap-4 border-line-2 bg-surface p-5 transition-[border-color,background-color,transform] group-hover:border-line-2 group-hover:bg-surface-2 group-active:translate-y-px">
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-primary-strong">
                  <Icon icon={game.icon} size={18} />
                </span>
                <Badge tone="outline">{t(game.badge)}</Badge>
              </div>
              <div>
                <h2 className="font-serif text-[18px] font-semibold text-ink">{t(game.title)}</h2>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{t(game.description)}</p>
              </div>
            </Panel>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
