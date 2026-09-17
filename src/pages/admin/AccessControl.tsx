import { useMemo } from 'react'
import { KeyRound, TriangleAlert } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  ADMIN_TAB_VIEWS, DEFAULT_ROLE_TABS, ROLE_TABS_STATE_KEY, tabsForRole,
} from '@/data/adminTabs'
import { ADMIN_TAB_ICONS } from '@/data/adminTabIcons'
import { ROLE_LABEL } from '@/data/adminRoles'

const CONFIGURABLE = ['editor', 'admin', 'reviewer'] as const
type ConfigurableRole = (typeof CONFIGURABLE)[number]
type RoleTabConfig = Partial<Record<ConfigurableRole, string[]>>

/** A stored key read back as something a person can scan. */
function governedLabel(stateKeys: string[], apiPrefixes: string[]): string {
  const documents = stateKeys.map((key) => key.replace(/^nishany-/, '').replace(/-v\d+$/, ''))
  const parts = [...new Set([...documents, ...apiPrefixes])]
  return parts.length ? parts.join(' · ') : 'the page only'
}

/**
 * Which console tabs each role sees.
 *
 * The super admin column is computed and rendered locked, never read from this
 * document. That is what makes locking yourself out impossible, and showing it
 * as a fixed column states the property rather than leaving it implied by code
 * nobody reads.
 *
 * Every row names what its tab actually governs, because switching one off is
 * a decision about capability — the server refuses that tab's documents and
 * routes to anyone without it — and a decision should not be a guess about
 * what will break.
 */
export function AccessControl() {
  const [config, setConfig] = usePersistentState<RoleTabConfig>(ROLE_TABS_STATE_KEY, {})

  const held = useMemo(() => ({
    editor: new Set(tabsForRole('editor', config)),
    admin: new Set(tabsForRole('admin', config)),
    reviewer: new Set(tabsForRole('reviewer', config)),
  }), [config])

  const customised = CONFIGURABLE.filter((role) => Array.isArray(config[role]))

  function toggle(role: ConfigurableRole, tabId: string) {
    setConfig((current) => {
      const base = current[role] ?? DEFAULT_ROLE_TABS[role] ?? []
      const next = base.includes(tabId) ? base.filter((id) => id !== tabId) : [...base, tabId]
      return { ...current, [role]: next }
    })
  }

  function restore(role: ConfigurableRole) {
    setConfig((current) => {
      const next = { ...current }
      delete next[role]
      return next
    })
  }

  return (
    <PageContainer>
      <PageHeader
        title="Access control"
        description="Which console tabs each role sees. A tab is the whole unit of permission: hiding one does not only remove the link, it makes the server refuse that area's documents and routes. Super admin holds everything and cannot be changed — that is what makes locking yourself out impossible."
      />

      <Panel className="mb-4 p-4">
        <div className="flex items-start gap-2.5">
          <Icon icon={TriangleAlert} size={16} className="mt-0.5 shrink-0 text-warning" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-ink">Changes take effect on the next request</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-ink-2">
              Somebody already signed in keeps the sidebar they loaded with until they reload the page, but the server
              refuses a removed tab immediately. Nobody keeps access they have just lost.
            </p>
          </div>
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        <PanelHeader
          title="Tabs by role"
          icon={KeyRound}
          hint={customised.length ? `${customised.length} role${customised.length === 1 ? '' : 's'} customised` : 'all roles on their defaults'}
        />
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <Tr>
                <Th>Tab</Th>
                <Th>Governs</Th>
                <Th>{ROLE_LABEL.super_admin}</Th>
                {CONFIGURABLE.map((role) => <Th key={role}>{ROLE_LABEL[role]}</Th>)}
              </Tr>
            </thead>
            <tbody>
              {ADMIN_TAB_VIEWS.map((view) => (
                <Tr key={view.id}>
                  <Td>
                    <span className="flex items-center gap-2">
                      <Icon icon={ADMIN_TAB_ICONS[view.icon]} size={14} className="shrink-0 text-ink-3" />
                      <span className="text-[12.5px] font-medium text-ink">{view.label}</span>
                    </span>
                    <span className="mt-0.5 block font-mono text-[11px] text-ink-3">{view.to}</span>
                  </Td>
                  <Td>
                    <span className="text-[11.5px] leading-snug text-ink-3">
                      {governedLabel(view.stateKeys, view.apiPrefixes)}
                    </span>
                  </Td>
                  <Td><Badge tone="success">always</Badge></Td>
                  {CONFIGURABLE.map((role) => (
                    <Td key={role}>
                      {view.superAdminOnly ? (
                        <span className="text-[11.5px] text-ink-3">super admin only</span>
                      ) : view.adminOnly && role === 'reviewer' ? (
                        <span className="text-[11.5px] text-ink-3">administrators only</span>
                      ) : (
                        <input
                          type="checkbox"
                          className="size-4 accent-primary"
                          checked={held[role].has(view.id)}
                          onChange={() => toggle(role, view.id)}
                          aria-label={`${view.label} for ${ROLE_LABEL[role]}`}
                        />
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </tbody>
          </Table>
        </div>
        {customised.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-t border-line p-3">
            <span className="text-[11.5px] text-ink-3">Back to defaults:</span>
            {customised.map((role) => (
              <Button key={role} variant="secondary" size="sm" onClick={() => restore(role)}>
                {ROLE_LABEL[role]}
              </Button>
            ))}
          </div>
        )}
      </Panel>
    </PageContainer>
  )
}
