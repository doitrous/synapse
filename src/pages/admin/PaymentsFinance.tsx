import { useMemo } from 'react'
import { Banknote, TrendingUp, Users, Repeat, CircleDollarSign, GraduationCap, CalendarRange } from 'lucide-react'
import { finance, revenueByMonth, transactions } from '@/data/admin'
import { adminStudents } from '@/data/students'
import { YEARS } from '@/data/universities'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { monthlyPriceFor } from '@/data/planCatalog'
import { usePlanCatalog } from '@/lib/usePlanCatalog'
import { PlanCatalogEditor } from '@/components/admin/PlanCatalogEditor'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Stat } from '@/components/ui/Stat'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { BarList } from '@/components/charts/BarList'
import { Meter } from '@/components/ui/Meter'
import { Table, Th, Td, Tr } from '@/components/ui/Table'

const egp = (n: number) => `EGP ${Math.round(n).toLocaleString()}`

export function PaymentsFinance() {
  const [universities] = useUniversityCatalogue()
  const [catalog, setCatalog] = usePlanCatalog()

  const byUniversity = useMemo(() => universities.map((u) => {
    const students = adminStudents.filter((s) => s.universityId === u.id)
    const revenue = students.reduce((n, s) => n + monthlyPriceFor(catalog, s.plan), 0)
    return { id: u.id, short: u.short, name: u.name, students: students.length, revenue, arpu: students.length ? revenue / students.length : 0 }
  }).sort((a, b) => b.revenue - a.revenue), [catalog, universities])

  const byYear = useMemo(() => YEARS.map((y) => {
    const students = adminStudents.filter((s) => s.year === y)
    const revenue = students.reduce((n, s) => n + monthlyPriceFor(catalog, s.plan), 0)
    return { year: y, students: students.length, revenue, arpu: students.length ? revenue / students.length : 0 }
  }), [catalog])

  const totalRevenue = byUniversity.reduce((n, u) => n + u.revenue, 0)
  const maxUni = Math.max(1, ...byUniversity.map((u) => u.revenue))
  const maxYear = Math.max(1, ...byYear.map((y) => y.revenue))


  return (
    <PageContainer>
      <PageHeader title="Payments & Finance" description="Revenue and subscriptions, broken down by university and year — and the plan catalogue the landing page and Billing both read." />

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

      <PlanCatalogEditor catalog={catalog} onChange={setCatalog} universities={universities} />

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
