import { useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PLACEHOLDERS } from './placeholders'
import { studentNav, adminNav } from '@/components/shell/nav'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'

const ALL_ITEMS = [...studentNav, ...adminNav].flatMap((g) => g.items)

/** A faint schematic of the surface to come — a blueprint, not a spinner. */
function BlueprintSketch() {
  return (
    <div className="grid-chart-major flex min-h-[260px] flex-col gap-3 border-b border-line bg-surface-2 p-6 md:border-b-0 md:border-r">
      <div className="h-3 w-28 rounded bg-line-2" />
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 rounded-lg border border-dashed border-line-2 bg-surface/70" />
        ))}
      </div>
      <div className="flex-1 rounded-lg border border-dashed border-line-2 bg-surface/70" />
      <div className="h-3 w-20 rounded bg-line-2" />
    </div>
  )
}

export function Placeholder() {
  const { pathname } = useLocation()
  const item = ALL_ITEMS.find((i) => i.to === pathname)
  const spec = PLACEHOLDERS[pathname]
  const title = item?.label ?? 'Coming soon'

  return (
    <PageContainer>
      <PageHeader
        title={title}
        description={spec?.description}
        actions={<Badge tone="outline">Planned · {spec?.phase ?? 'Later'}</Badge>}
      />

      <Panel className="overflow-hidden">
        <div className="grid md:grid-cols-[1.05fr_1fr]">
          <BlueprintSketch />
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-ink-3">
              {item && <Icon icon={item.icon} size={16} />}
              <h2 className="font-sans text-[12px] font-semibold uppercase tracking-[0.08em]">
                On the build plan
              </h2>
            </div>
            <ul className="mt-4 space-y-3">
              {spec?.plan.map((line) => (
                <li key={line} className="flex items-start gap-3 text-[14px] leading-snug text-ink">
                  <span className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent">
                    <Icon icon={Check} size={13} strokeWidth={2.4} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>
    </PageContainer>
  )
}
