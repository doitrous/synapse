import type { ComponentType } from 'react'
import { useSearchParams } from 'react-router-dom'
import { UserCog, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tabs } from '@/components/ui/Tabs'
import { useIdentity } from '@/lib/useIdentity'
import { UsersManagement } from './UsersManagement'
import { StudentsManagement } from './StudentsManagement'

/**
 * People — the two accounts surfaces under one entry.
 *
 * Console Users manages staff accounts: roles, console access, password resets,
 * enrolment change requests. Students manages the learner roster. They are two
 * capabilities a super admin can grant independently (a support role might hold
 * Students without the power to change roles), so the page shows only the
 * sections the viewer holds. `?view=` lands old `/admin/users` and
 * `/admin/students` links on the right section.
 */
const SECTIONS: { id: string; label: string; icon: LucideIcon; Component: ComponentType }[] = [
  { id: 'users', label: 'Console Users', icon: UserCog, Component: UsersManagement },
  { id: 'students', label: 'Students', icon: Users, Component: StudentsManagement },
]

export function People() {
  const identity = useIdentity()
  const [params, setParams] = useSearchParams()
  const held = SECTIONS.filter((s) => identity.tabs.includes(s.id))
  if (held.length === 0) return null // route guard already blocks this; defensive

  const active = held.find((s) => s.id === params.get('view')) ?? held[0]
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
