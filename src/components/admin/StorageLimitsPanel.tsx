import { useState } from 'react'
import { ChevronRight, HardDrive } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import { usePlanCatalog } from '@/lib/usePlanCatalog'
import { say } from '@/data/planCatalog'
import {
  DEFAULT_STORAGE_LIMITS, MEGABYTE, STORAGE_LIMITS_STORAGE_KEY, formatBytes, limitFor,
  normaliseBytes, type StorageLimits,
} from '@/data/storageLimits'

/**
 * How much room students get for the documents they upload themselves.
 *
 * There was one number, set by an environment variable and identical for
 * everybody, changeable only by redeploying. This sets a default and lets any
 * plan name its own — which is the point of having plans.
 *
 * Entered in megabytes because that is the unit the number is discussed in;
 * stored in bytes because that is the unit it is enforced in.
 */

/** Megabytes in, bytes out, with the stored figure shown as it will read. */
function LimitField({ label, hint, bytes, placeholder, onChange }: {
  label: string
  hint?: string
  bytes: number | null
  placeholder?: string
  onChange: (bytes: number | null) => void
}) {
  return (
    <Field label={label} hint={hint}>
      <div className="flex items-center gap-2">
        <TextInput
          type="number"
          min={0}
          value={bytes === null ? '' : Math.round(bytes / MEGABYTE)}
          placeholder={placeholder}
          onChange={(event) => {
            const raw = event.target.value.trim()
            onChange(raw === '' ? null : normaliseBytes(Number(raw) * MEGABYTE))
          }}
          aria-label={label}
          className="tnum h-9 w-28 font-mono"
        />
        <span className="text-[12px] text-ink-3">MB</span>
        {bytes !== null && <span className="tnum font-mono text-[11.5px] text-ink-3">{formatBytes(bytes)}</span>}
      </div>
    </Field>
  )
}

export function StorageLimitsPanel() {
  const [limits, setLimits] = usePersistentState<StorageLimits>(STORAGE_LIMITS_STORAGE_KEY, DEFAULT_STORAGE_LIMITS)
  const [catalog] = usePlanCatalog()
  const [open, setOpen] = useState(false)

  const setPlanLimit = (planId: string, bytes: number | null) =>
    setLimits((current) => {
      const byPlan = { ...current.byPlan }
      // Cleared means "take the default", which is a different fact from zero.
      if (bytes === null) delete byPlan[planId]
      else byPlan[planId] = bytes
      return { ...current, byPlan }
    })

  const overrides = Object.keys(limits.byPlan).length

  return (
    <Panel className="mb-3">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-start hover:bg-inset"
      >
        <Icon icon={ChevronRight} size={14} className={cn('shrink-0 text-ink-3 transition-transform', open && 'rotate-90')} />
        <Icon icon={HardDrive} size={16} className="shrink-0 text-ink-2" />
        <span className="text-[13.5px] font-medium text-ink">Self-uploaded document storage</span>
        <span className="tnum font-mono text-[12px] text-ink-2">{formatBytes(limits.defaultBytes)}</span>
        <span className="text-[11.5px] text-ink-3">
          {overrides === 0 ? 'same for every plan' : `${overrides} ${overrides === 1 ? 'plan differs' : 'plans differ'}`}
        </span>
      </button>

      {open && (
        <div className="space-y-4 border-t border-line bg-surface-2/30 p-4">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
            <LimitField
              label="Everyone, unless their plan says otherwise"
              bytes={limits.defaultBytes}
              onChange={(bytes) => setLimits((current) => ({ ...current, defaultBytes: bytes ?? 0 }))}
            />
            <p className="max-w-md pb-1 text-[12px] leading-relaxed text-ink-3">
              Applies to the documents a student uploads themselves, not to the library. Lowering a limit
              stops further uploads; it never deletes what a student already has.
            </p>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">By plan</p>
            <ul className="space-y-2">
              {catalog.plans.map((plan) => {
                const override = limits.byPlan[plan.id]
                const resolved = limitFor(limits, plan.id)
                return (
                  <li key={plan.id} className="flex flex-wrap items-end gap-x-4 gap-y-2 rounded-lg border border-line bg-surface p-3">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-medium text-ink">{say(plan.name, 'en')}</span>
                      <span className="block truncate text-[11.5px] text-ink-3">
                        {override === undefined ? `Takes the default — ${formatBytes(resolved)}` : `${formatBytes(resolved)} on this plan`}
                      </span>
                    </span>
                    <LimitField
                      label="Limit"
                      bytes={override === undefined ? null : override}
                      placeholder="default"
                      onChange={(bytes) => setPlanLimit(plan.id, bytes)}
                    />
                    {override !== undefined && (
                      <Button variant="ghost" size="sm" onClick={() => setPlanLimit(plan.id, null)}>Use default</Button>
                    )}
                  </li>
                )
              })}
              {catalog.plans.length === 0 && (
                <li className="rounded-lg border border-dashed border-line p-4 text-[12.5px] text-ink-3">
                  No plans yet. Add them in Payments &amp; Finance.
                </li>
              )}
            </ul>
            <p className="mt-2 text-[11.5px] text-ink-3">
              A plan set to <span className="tnum font-mono">0</span> MB has no room for self-uploads at all —
              which is not the same as leaving the field empty, where the default applies. A student whose
              subscription lapses is measured against Free.
            </p>
          </div>
        </div>
      )}
    </Panel>
  )
}
