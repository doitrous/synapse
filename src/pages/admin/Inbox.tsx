import type { ComponentType } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ImagePlus, Siren, Flag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tabs } from '@/components/ui/Tabs'
import { useIdentity } from '@/lib/useIdentity'
import { MediaRequests } from './MediaRequests'
import { EscalationsQueue } from './EscalationsQueue'
import { ReportsReview } from './ReportsReview'

/**
 * The one moderation Inbox — Media Requests, Escalations, Content Reports.
 *
 * They are three separate capabilities with three different access tiers
 * (reviewers hold Media and Reports; only editors and super admins hold
 * Escalations; an admin holds Reports alone), so the page shows only the
 * sections the viewer actually holds. The tab that owns each section — and the
 * server guard behind it — is unchanged; this only gathers them behind one
 * sidebar entry. `?view=` lets the old `/admin/library/media`, `/admin/escalations`
 * and `/admin/reports` links land on the right section.
 */
const SECTIONS: { id: string; label: string; icon: LucideIcon; Component: ComponentType }[] = [
  { id: 'media', label: 'Media Requests', icon: ImagePlus, Component: MediaRequests },
  { id: 'escalations', label: 'Escalations', icon: Siren, Component: EscalationsQueue },
  { id: 'reports', label: 'Content Reports', icon: Flag, Component: ReportsReview },
]

export function Inbox() {
  const identity = useIdentity()
  const [params, setParams] = useSearchParams()
  const held = SECTIONS.filter((s) => identity.tabs.includes(s.id))
  if (held.length === 0) return null // the route guard already blocks this, but be defensive

  const wanted = params.get('view')
  const active = held.find((s) => s.id === wanted) ?? held[0]
  const Active = active.Component

  return (
    <div>
      {held.length > 1 && (
        <div className="border-b border-line bg-surface px-5 py-2.5">
          <Tabs
            items={held.map((s) => ({ value: s.id, label: s.label, icon: s.icon }))}
            value={active.id}
            onChange={(v) => setParams(v === held[0].id ? {} : { view: v }, { replace: true })}
          />
        </div>
      )}
      <Active />
    </div>
  )
}
