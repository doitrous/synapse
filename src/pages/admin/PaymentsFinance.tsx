import { useMemo } from 'react'
import { Banknote, TrendingUp, Users, Repeat, CircleDollarSign, GraduationCap, CalendarRange, Plus, Trash2, Tags } from 'lucide-react'
import { finance, revenueByMonth, transactions } from '@/data/admin'
import { adminStudents } from '@/data/students'
import { YEARS } from '@/data/universities'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { initialPlans, priceForTier, PLANS_STORAGE_KEY, type PlanDef } from '@/data/plans'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Stat } from '@/components/ui/Stat'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Toggle } from '@/components/ui/Toggle'
import { TextInput } from '@/components/ui/Field'
import { BarList } from '@/components/charts/BarList'
import { Meter } from '@/components/ui/Meter'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'

const egp = (n: number) => `EGP ${Math.round(n).toLocaleString()}`

export function PaymentsFinance() {
  const [universities] = useUniversityCatalogue()
  const [plans, setPlans] = usePersistentState<PlanDef[]>(PLANS_STORAGE_KEY, initialPlans)

  const byUniversity = useMemo(() => universities.map((u) => {
    const students = adminStudents.filter((s) => s.universityId === u.id)
    const revenue = students.reduce((n, s) => n + priceForTier(plans, s.plan), 0)
    return { id: u.id, short: u.short, name: u.name, students: students.length, revenue, arpu: students.length ? revenue / students.length : 0 }
  }).sort((a, b) => b.revenue - a.revenue), [plans, universities])

  const byYear = useMemo(() => YEARS.map((y) => {
    const students = adminStudents.filter((s) => s.year === y)
    const revenue = students.reduce((n, s) => n + priceForTier(plans, s.plan), 0)
    return { year: y, students: students.length, revenue, arpu: students.length ? revenue / students.length : 0 }
  }), [plans])

  const totalRevenue = byUniversity.reduce((n, u) => n + u.revenue, 0)
  const maxUni = Math.max(1, ...byUniversity.map((u) => u.revenue))
  const maxYear = Math.max(1, ...byYear.map((y) => y.revenue))

  const setPlan = (id: string, patch: Partial<PlanDef>) => setPlans((cur) => cur.map((p) => p.id === id ? { ...p, ...patch } : p))
  const toggleScope = (id: string, field: 'universityIds' | 'years', value: string) => setPlans((cur) => cur.map((p) => {
    if (p.id !== id) return p
    const has = p[field].includes(value)
    return { ...p, [field]: has ? p[field].filter((x) => x !== value) : [...p[field], value] }
  }))
  const addPlan = () => setPlans((cur) => [...cur, { id: `plan-${Date.now()}`, name: 'New plan', priceEGP: 0, priceLabel: 'EGP 0', active: true, universityIds: [], years: [] }])

  return (
    <PageContainer>
      <PageHeader title="Payments & Finance" description="Revenue and subscriptions, broken down by university and year — with an editable plan catalogue." />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Stat label="MRR" value={`£${finance.mrr.toLocaleString()}`} delta="+3.3%" icon={Banknote} />
        <Stat label="ARR" value={`£${(finance.arr / 1000).toFixed(0)}k`} delta="+3.3%" icon={TrendingUp} />
        <Stat label="Active subs" value={finance.activeSubs.toLocaleString()} delta="+2%" icon={Users} />
        <Stat label="Churn" value={`${finance.churnPct}%`} sub="monthly" icon={Repeat} />
        <Stat label="ARPU" value={`£${finance.arpu.toFixed(2)}`} sub="per student" icon={CircleDollarSign} />
      </div>

      <Panel className="mb-4">
        <PanelHeader title="Revenue" hint="Last 6 months" />
        <div className="p-5">
          <BarList max={7500} data={revenueByMonth.map((m) => ({ key: m.month, label: m.month, value: m.revenue, valueLabel: `£${(m.revenue / 1000).toFixed(1)}k` }))} />
        </div>
      </Panel>

      {/* By-university and by-year revenue */}
      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Revenue by university" icon={GraduationCap} hint={`Monthly · ${egp(totalRevenue)} total`} />
          <div className="p-5"><BarList data={byUniversity.map((u) => ({ key: u.id, value: u.revenue, valueLabel: egp(u.revenue), label: <span className="inline-flex items-center gap-1.5">{u.short}</span> }))} /></div>
        </Panel>
        <Panel>
          <PanelHeader title="Revenue by year" icon={CalendarRange} hint="Monthly, across all universities" />
          <div className="p-5"><BarList data={byYear.map((y) => ({ key: y.year, value: y.revenue, valueLabel: egp(y.revenue), label: y.year }))} /></div>
        </Panel>
      </div>

      {/* Head-to-head comparisons */}
      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Panel className="overflow-hidden">
          <PanelHeader title="Universities head-to-head" hint="Revenue · students · ARPU" />
          <Table>
            <thead><tr><Th className="pl-4">University</Th><Th align="right">Students</Th><Th align="right">Revenue</Th><Th align="right">ARPU</Th><Th className="pr-4">Share</Th></tr></thead>
            <tbody>{byUniversity.map((u) => (
              <Tr key={u.id} hover>
                <Td className="pl-4 font-medium">{u.short}</Td>
                <Td align="right" className="tnum font-mono text-ink-2">{u.students}</Td>
                <Td align="right" className="tnum font-mono">{egp(u.revenue)}</Td>
                <Td align="right" className="tnum font-mono text-ink-2">{egp(u.arpu)}</Td>
                <Td className="pr-4"><Meter value={(u.revenue / maxUni) * 100} tone="accent" className="w-24" /></Td>
              </Tr>
            ))}</tbody>
          </Table>
        </Panel>
        <Panel className="overflow-hidden">
          <PanelHeader title="Years head-to-head" hint="Revenue · students · ARPU" />
          <Table>
            <thead><tr><Th className="pl-4">Year</Th><Th align="right">Students</Th><Th align="right">Revenue</Th><Th align="right">ARPU</Th><Th className="pr-4">Share</Th></tr></thead>
            <tbody>{byYear.map((y) => (
              <Tr key={y.year} hover>
                <Td className="pl-4 font-medium">{y.year}</Td>
                <Td align="right" className="tnum font-mono text-ink-2">{y.students}</Td>
                <Td align="right" className="tnum font-mono">{egp(y.revenue)}</Td>
                <Td align="right" className="tnum font-mono text-ink-2">{egp(y.arpu)}</Td>
                <Td className="pr-4"><Meter value={(y.revenue / maxYear) * 100} tone="success" className="w-24" /></Td>
              </Tr>
            ))}</tbody>
          </Table>
        </Panel>
      </div>

      {/* Editable plans & pricing */}
      <Panel className="mb-4">
        <PanelHeader title="Plans & pricing" icon={Tags} hint="Assign each plan to one or more universities/years" action={<Button variant="secondary" size="sm" iconLeft={Plus} onClick={addPlan}>Add plan</Button>} />
        <div className="divide-y divide-line">
          {plans.map((p) => (
            <div key={p.id} className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <TextInput value={p.name} onChange={(e) => setPlan(p.id, { name: e.target.value })} className="h-9 w-40 font-medium" aria-label="Plan name" />
                <div className="inline-flex items-center gap-1"><span className="text-[12px] text-ink-3">EGP</span><TextInput type="number" min={0} value={p.priceEGP} onChange={(e) => setPlan(p.id, { priceEGP: Number(e.target.value) || 0 })} className="h-9 w-24 tnum font-mono" aria-label="Monthly price" /><span className="text-[12px] text-ink-3">/mo</span></div>
                <TextInput value={p.priceLabel} onChange={(e) => setPlan(p.id, { priceLabel: e.target.value })} className="h-9 min-w-[14rem] flex-1 text-[12.5px]" aria-label="Price label" placeholder="Display price (cadences)" />
                <label className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-2">Active<Toggle checked={p.active} onChange={(active) => setPlan(p.id, { active })} label="Active" /></label>
                <button onClick={() => setPlans((cur) => cur.filter((x) => x.id !== p.id))} className="grid size-8 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label="Remove plan"><Icon icon={Trash2} size={14} /></button>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Universities</span>
                {universities.map((u) => (
                  <button key={u.id} onClick={() => toggleScope(p.id, 'universityIds', u.id)} className={cn('rounded-full border px-2.5 py-0.5 text-[11.5px]', (p.universityIds.length === 0 || p.universityIds.includes(u.id)) ? 'border-accent-line bg-accent-tint text-accent-strong' : 'border-line bg-surface text-ink-3')}>{u.short}</button>
                ))}
                <span className="ms-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Years</span>
                {YEARS.map((y) => (
                  <button key={y} onClick={() => toggleScope(p.id, 'years', y)} className={cn('rounded-full border px-2.5 py-0.5 text-[11.5px]', (p.years.length === 0 || p.years.includes(y)) ? 'border-accent-line bg-accent-tint text-accent-strong' : 'border-line bg-surface text-ink-3')}>{y.replace('Year ', 'Y')}</button>
                ))}
                <span className="text-[11px] text-ink-3">{p.universityIds.length === 0 && p.years.length === 0 ? '(applies to all)' : ''}</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="Recent transactions" />
        <Table>
          <thead><tr><Th className="pl-4">Invoice</Th><Th>Student</Th><Th>Plan</Th><Th align="right">Amount</Th><Th>Status</Th><Th align="right" className="pr-4">Date</Th></tr></thead>
          <tbody>{transactions.map((t) => (
            <Tr key={t.id} hover>
              <Td className="pl-4"><span className="tnum font-mono text-[12.5px] text-ink-2">{t.id}</span></Td>
              <Td><span className="tnum font-mono text-[12.5px] text-ink">{t.code}</span></Td>
              <Td className="text-ink-2">{t.plan}</Td>
              <Td align="right" className="tnum font-mono">{t.amount}</Td>
              <Td><StatusBadge status={t.status} /></Td>
              <Td align="right" className="whitespace-nowrap pr-4 text-[12.5px] text-ink-2">{t.date}</Td>
            </Tr>
          ))}</tbody>
        </Table>
      </Panel>
    </PageContainer>
  )
}
