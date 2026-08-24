import { AlertTriangle, Crosshair, Grid3x3, ListOrdered, Shuffle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { validMiniGamePacks } from '@/data/minigamePacks'
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
] as const

export function MinigamesHubPage() {
  const t = useT()
  const authoredPackCount = validMiniGamePacks().length

  return (
    <PageContainer>
      <PageHeader
        title={t('Minigames')}
        description={t('Short, authored practice games for terms, slides, mechanisms and red flags.')}
      />

      <Panel className="mb-4 p-4">
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          {t('Medicine game facts come from reviewed local packs or published content. The app can shuffle and score them, but it does not invent facts during play.')}
        </p>
        <p className="mt-1 text-[12px] text-ink-3">{authoredPackCount} {t('authored packs ready')}</p>
      </Panel>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {games.map((game) => (
          <Link
            key={game.href}
            to={game.href}
            className="group rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            <Panel className="flex h-full flex-col gap-3 p-4 transition-[border-color,background-color,transform] group-hover:border-line-2 group-hover:bg-surface-2 group-active:translate-y-px">
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
