import { useState } from 'react'
import { ChevronRight, Plus, Trash2, Tags } from 'lucide-react'
import type { University } from '@/data/universities'
import { YEARS } from '@/data/universities'
import {
  isPurchasable, monthlyEquivalent, priceAt, say,
  type Bilingual, type BillingPeriodDef, type CatalogPlan, type PlanCatalog, type PlanFeature,
} from '@/data/planCatalog'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Toggle } from '@/components/ui/Toggle'
import { cn } from '@/lib/cn'

/**
 * The plan catalogue, edited.
 *
 * Everything the landing page and Billing show comes from here, in both
 * languages, so a price changed in this panel changes the public page and what
 * a student is charged at the same moment. The previous editor had a name, a
 * monthly number and a free-text "display price" that nothing parsed — which is
 * why the public page could not read it and kept its own copy instead.
 */

const empty = (): Bilingual => ({ en: '', ar: '' })

/** Both languages of one string, side by side, because a plan needs both. */
function BilingualField({ label, value, onChange, placeholder, hint }: {
  label: string
  value: Bilingual | undefined
  onChange: (next: Bilingual) => void
  placeholder?: string
  hint?: string
}) {
  const current = value ?? empty()
  return (
    <Field label={label} hint={hint}>
      <div className="grid gap-1.5 sm:grid-cols-2">
        <div className="flex items-center gap-1.5">
          <span className="w-6 shrink-0 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-3">EN</span>
          <TextInput value={current.en} onChange={(event) => onChange({ ...current, en: event.target.value })} placeholder={placeholder} aria-label={`${label} in English`} className="h-9" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-6 shrink-0 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-3">ع</span>
          <TextInput value={current.ar} onChange={(event) => onChange({ ...current, ar: event.target.value })} dir="rtl" aria-label={`${label} in Arabic`} className="h-9" />
        </div>
      </div>
    </Field>
  )
}

function FeatureRow({ feature, onChange, onRemove }: {
  feature: PlanFeature
  onChange: (next: PlanFeature) => void
  onRemove: () => void
}) {
  return (
    <li className="grid gap-2 rounded-lg border border-line bg-surface p-2.5 lg:grid-cols-[10rem_minmax(0,1fr)_9rem_auto]">
      <TextInput
        value={feature.group?.en ?? ''}
        onChange={(event) => onChange({ ...feature, group: { ...(feature.group ?? empty()), en: event.target.value } })}
        placeholder="Section"
        aria-label="Feature section in English"
        className="h-8 text-[12.5px]"
      />
      <TextInput
        value={feature.label.en}
        onChange={(event) => onChange({ ...feature, label: { ...feature.label, en: event.target.value } })}
        placeholder="Feature"
        aria-label="Feature in English"
        className="h-8 text-[12.5px]"
      />
      <TextInput
        value={feature.value?.en ?? ''}
        onChange={(event) => onChange({ ...feature, value: { ...(feature.value ?? empty()), en: event.target.value } })}
        placeholder="Tick, or a value"
        aria-label="Feature value in English"
        className="h-8 text-[12.5px]"
      />
      <button type="button" onClick={onRemove} className="grid size-8 place-items-center justify-self-end rounded text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label="Remove feature">
        <Icon icon={Trash2} size={13} />
      </button>
      <div className="grid gap-2 lg:col-span-4 lg:grid-cols-[10rem_minmax(0,1fr)_9rem_2rem]">
        <TextInput value={feature.group?.ar ?? ''} onChange={(event) => onChange({ ...feature, group: { ...(feature.group ?? empty()), ar: event.target.value } })} dir="rtl" placeholder="القسم" aria-label="Feature section in Arabic" className="h-8 text-[12.5px]" />
        <TextInput value={feature.label.ar} onChange={(event) => onChange({ ...feature, label: { ...feature.label, ar: event.target.value } })} dir="rtl" placeholder="الميزة" aria-label="Feature in Arabic" className="h-8 text-[12.5px]" />
        <TextInput value={feature.value?.ar ?? ''} onChange={(event) => onChange({ ...feature, value: { ...(feature.value ?? empty()), ar: event.target.value } })} dir="rtl" placeholder="القيمة" aria-label="Feature value in Arabic" className="h-8 text-[12.5px]" />
        <span />
      </div>
    </li>
  )
}

function PlanEditor({ plan, periods, universities, onChange, onRemove }: {
  plan: CatalogPlan
  periods: BillingPeriodDef[]
  universities: University[]
  onChange: (next: CatalogPlan) => void
  onRemove: () => void
}) {
  const patch = (fields: Partial<CatalogPlan>) => onChange({ ...plan, ...fields })

  const toggleScope = (field: 'universityIds' | 'years', value: string) => {
    const list = plan[field]
    patch({ [field]: list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value] } as Partial<CatalogPlan>)
  }

  const setPrice = (periodId: string, raw: string) => {
    const next = { ...plan.prices }
    // An empty box means "not sold at this period", which is a different fact
    // from "free", and the two must not collapse into one another.
    if (raw.trim() === '') delete next[periodId]
    else next[periodId] = Math.max(0, Number(raw) || 0)
    patch({ prices: next })
  }

  return (
    <div className="space-y-3.5 border-t border-line bg-surface-2/30 p-4">
      <div className="grid gap-3.5 lg:grid-cols-2">
        <BilingualField label="Plan name" value={plan.name} onChange={(name) => patch({ name })} placeholder="QBank" />
        <BilingualField label="Call to action" value={plan.cta} onChange={(cta) => patch({ cta })} placeholder="Subscribe" />
      </div>
      <BilingualField label="What it gives" value={plan.entitlement} onChange={(entitlement) => patch({ entitlement })} placeholder="The full question bank…" />
      <div className="grid gap-3.5 lg:grid-cols-2">
        <BilingualField label="Badge" value={plan.badge} onChange={(badge) => patch({ badge })} placeholder="Best value" hint="Optional — sits on the card" />
        <BilingualField label="Quoted instead of a price" value={plan.quoted} onChange={(quoted) => patch({ quoted })} placeholder="Quoted" hint="Optional — for plans with no list price" />
      </div>

      <div>
        <p className="mb-1.5 text-[12.5px] font-medium text-ink-2">Price per period</p>
        <div className="flex flex-wrap gap-3">
          {periods.map((period) => (
            <label key={period.id} className="flex items-center gap-1.5 text-[12px] text-ink-3">
              <span className="font-medium text-ink-2">{say(period.label, 'en')}</span>
              <TextInput
                type="number"
                min={0}
                value={plan.prices[period.id] ?? ''}
                onChange={(event) => setPrice(period.id, event.target.value)}
                placeholder="not sold"
                aria-label={`Price for ${say(period.label, 'en')}`}
                className="tnum h-8 w-28 font-mono"
              />
              {period.comingSoon && <span className="text-[10.5px] font-semibold uppercase text-warning">soon</span>}
            </label>
          ))}
        </div>
        <p className="mt-1 text-[11.5px] text-ink-3">
          Leave a box empty where the plan is not sold that way. Worth{' '}
          <span className="tnum font-mono">EGP {Math.round(monthlyEquivalent(plan, periods))}</span> a month for reporting.
        </p>
      </div>

      <div>
        <div className="mb-1.5 flex items-center gap-2">
          <p className="text-[12.5px] font-medium text-ink-2">What it includes</p>
          <span className="text-[11.5px] text-ink-3">Builds the comparison table on the pricing page</span>
          <Button
            className="ms-auto"
            variant="secondary"
            size="sm"
            iconLeft={Plus}
            onClick={() => patch({ features: [...plan.features, { group: empty(), label: empty() }] })}
          >
            Add feature
          </Button>
        </div>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <FeatureRow
              key={index}
              feature={feature}
              onChange={(next) => patch({ features: plan.features.map((entry, i) => (i === index ? next : entry)) })}
              onRemove={() => patch({ features: plan.features.filter((_, i) => i !== index) })}
            />
          ))}
          {plan.features.length === 0 && (
            <li className="rounded-lg border border-dashed border-line px-3 py-3 text-[12.5px] text-ink-3">
              No features listed. This plan will not appear in the comparison table.
            </li>
          )}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
        <Field label="Prominence">
          <Select
            value={plan.prominence}
            onChange={(event) => patch({ prominence: event.target.value as CatalogPlan['prominence'] })}
            className="h-9 w-40"
          >
            <option value="primary">Tier (compared)</option>
            <option value="secondary">Other offer</option>
          </Select>
        </Field>
        <label className="inline-flex items-center gap-2 text-[12.5px] text-ink-2">
          <Toggle checked={plan.active} onChange={(active) => patch({ active })} label="Active" />Active
        </label>
        <label className="inline-flex items-center gap-2 text-[12.5px] text-ink-2">
          <Toggle checked={plan.featured === true} onChange={(featured) => patch({ featured })} label="Featured" />Featured
        </label>
        <label className="inline-flex items-center gap-2 text-[12.5px] text-ink-2">
          <Toggle checked={plan.comingSoon === true} onChange={(comingSoon) => patch({ comingSoon })} label="Coming soon" />Coming soon
        </label>
        <Button className="ms-auto" variant="ghost" size="sm" iconLeft={Trash2} onClick={onRemove}>Remove plan</Button>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Universities</span>
        {universities.map((university) => (
          <button
            key={university.id}
            type="button"
            onClick={() => toggleScope('universityIds', university.id)}
            className={cn(
              'rounded-full border px-2.5 py-0.5 text-[11.5px]',
              plan.universityIds.length === 0 || plan.universityIds.includes(university.id)
                ? 'border-primary-line bg-primary-tint text-primary-strong'
                : 'border-line bg-surface text-ink-3',
            )}
          >
            {university.short}
          </button>
        ))}
        <span className="ms-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Years</span>
        {YEARS.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => toggleScope('years', year)}
            className={cn(
              'rounded-full border px-2.5 py-0.5 text-[11.5px]',
              plan.years.length === 0 || plan.years.includes(year)
                ? 'border-primary-line bg-primary-tint text-primary-strong'
                : 'border-line bg-surface text-ink-3',
            )}
          >
            {year.replace('Year ', 'Y')}
          </button>
        ))}
        {plan.universityIds.length === 0 && plan.years.length === 0 && (
          <span className="text-[11px] text-ink-3">(applies to all)</span>
        )}
      </div>
    </div>
  )
}

export function PlanCatalogEditor({ catalog, onChange, universities }: {
  catalog: PlanCatalog
  onChange: (next: PlanCatalog) => void
  universities: University[]
}) {
  const [open, setOpen] = useState<string | null>(null)

  const setPlan = (id: string, next: CatalogPlan) =>
    onChange({ ...catalog, plans: catalog.plans.map((plan) => (plan.id === id ? next : plan)) })

  const setPeriod = (id: string, fields: Partial<BillingPeriodDef>) =>
    onChange({ ...catalog, periods: catalog.periods.map((period) => (period.id === id ? { ...period, ...fields } : period)) })

  const addPlan = () => {
    const id = `plan-${Date.now().toString(36)}`
    onChange({
      ...catalog,
      plans: [...catalog.plans, {
        id,
        name: { en: 'New plan', ar: 'خطة جديدة' },
        entitlement: empty(),
        features: [],
        prices: {},
        cta: { en: 'Subscribe', ar: 'اشترك' },
        prominence: 'secondary',
        active: false,
        universityIds: [],
        years: [],
      }],
    })
    setOpen(id)
  }

  return (
    <>
      <Panel className="mb-4">
        <PanelHeader
          title="Billing periods"
          hint="What a plan can be bought for"
          action={
            <Button
              variant="secondary"
              size="sm"
              iconLeft={Plus}
              onClick={() => onChange({
                ...catalog,
                periods: [...catalog.periods, { id: `period-${Date.now().toString(36)}`, label: empty(), billedAs: empty(), months: 1 }],
              })}
            >
              Add period
            </Button>
          }
        />
        <ul className="divide-y divide-line">
          {catalog.periods.map((period) => (
            <li key={period.id} className="grid gap-3 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_6rem_auto]">
              <BilingualField label="Label" value={period.label} onChange={(label) => setPeriod(period.id, { label })} placeholder="1 term" />
              <BilingualField label="Billed as" value={period.billedAs} onChange={(billedAs) => setPeriod(period.id, { billedAs })} placeholder="billed each term" />
              <Field label="Months" hint="Drives the saving">
                <TextInput
                  type="number"
                  min={1}
                  value={period.months}
                  onChange={(event) => setPeriod(period.id, { months: Math.max(1, Number(event.target.value) || 1) })}
                  aria-label="Months covered"
                  className="tnum h-9 font-mono"
                />
              </Field>
              <div className="flex items-end gap-2 pb-1">
                <label className="inline-flex items-center gap-2 text-[12.5px] text-ink-2">
                  <Toggle checked={period.comingSoon === true} onChange={(comingSoon) => setPeriod(period.id, { comingSoon })} label={`${say(period.label, 'en')} coming soon`} />
                  Coming soon
                </label>
                <button
                  type="button"
                  onClick={() => onChange({ ...catalog, periods: catalog.periods.filter((entry) => entry.id !== period.id) })}
                  className="grid size-9 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger"
                  aria-label={`Remove ${say(period.label, 'en')}`}
                >
                  <Icon icon={Trash2} size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel className="mb-4">
        <PanelHeader
          title="Plans & pricing"
          icon={Tags}
          hint="Shown on the landing page in both languages"
          action={<Button variant="secondary" size="sm" iconLeft={Plus} onClick={addPlan}>Add plan</Button>}
        />
        <ul className="divide-y divide-line">
          {catalog.plans.map((plan) => {
            const expanded = open === plan.id
            const monthly = priceAt(plan, catalog.periods[0]?.id ?? '', catalog.periods)
            const sellable = catalog.periods.some((period) => isPurchasable(plan, period))
            return (
              <li key={plan.id}>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : plan.id)}
                  aria-expanded={expanded}
                  className="flex w-full flex-wrap items-center gap-2.5 px-4 py-3 text-start hover:bg-inset"
                >
                  <Icon icon={ChevronRight} size={14} className={cn('shrink-0 text-ink-3 chevron-turn')} open={expanded} />
                  <span className="text-[13.5px] font-medium text-ink">{say(plan.name, 'en')}</span>
                  <span className="text-[12px] text-ink-3" dir="rtl">{say(plan.name, 'ar')}</span>
                  <span className="tnum font-mono text-[12px] text-ink-2">
                    {monthly ? `EGP ${monthly.amount}` : 'no price'}
                  </span>
                  <span className="rounded-full border border-line px-2 py-0.5 text-[10.5px] text-ink-3">
                    {plan.prominence === 'primary' ? 'Tier' : 'Other offer'}
                  </span>
                  {plan.comingSoon && <span className="rounded-full border border-warning/30 bg-warning-tint px-2 py-0.5 text-[10.5px] font-semibold text-warning">Coming soon</span>}
                  {!plan.active && <span className="rounded-full border border-line-2 bg-inset px-2 py-0.5 text-[10.5px] font-semibold text-ink-3">Inactive</span>}
                  {plan.active && !plan.comingSoon && !sellable && (
                    <span className="rounded-full border border-warning/30 bg-warning-tint px-2 py-0.5 text-[10.5px] font-semibold text-warning" title="Active, but priced at no purchasable period">
                      Not sellable
                    </span>
                  )}
                  <span className="ms-auto text-[11.5px] text-ink-3">{plan.features.length} features</span>
                </button>
                {expanded && (
                  <PlanEditor
                    plan={plan}
                    periods={catalog.periods}
                    universities={universities}
                    onChange={(next) => setPlan(plan.id, next)}
                    onRemove={() => { setOpen(null); onChange({ ...catalog, plans: catalog.plans.filter((entry) => entry.id !== plan.id) }) }}
                  />
                )}
              </li>
            )
          })}
        </ul>
      </Panel>
    </>
  )
}
