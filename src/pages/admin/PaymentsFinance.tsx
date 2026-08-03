import { Banknote, TrendingUp, Users, Repeat, CircleDollarSign } from 'lucide-react'
import { finance, revenueByMonth, plans, transactions } from '@/data/admin'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Stat } from '@/components/ui/Stat'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Badge } from '@/components/ui/Badge'
import { BarList } from '@/components/charts/BarList'
import { Table, Th, Td, Tr } from '@/components/ui/Table'

export function PaymentsFinance() {
  return (
    <PageContainer>
      <PageHeader
        title="Payments & Finance"
        description="Revenue, subscriptions, plans, and recent transactions."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Stat label="MRR" value={`£${finance.mrr.toLocaleString()}`} delta="+3.3%" icon={Banknote} />
        <Stat label="ARR" value={`£${(finance.arr / 1000).toFixed(0)}k`} delta="+3.3%" icon={TrendingUp} />
        <Stat label="Active subs" value={finance.activeSubs.toLocaleString()} delta="+2%" icon={Users} />
        <Stat label="Churn" value={`${finance.churnPct}%`} sub="monthly" icon={Repeat} />
        <Stat label="ARPU" value={`£${finance.arpu.toFixed(2)}`} sub="per student" icon={CircleDollarSign} />
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Revenue" hint="Last 6 months" />
          <div className="p-5">
            <BarList
              max={7500}
              data={revenueByMonth.map((m) => ({
                key: m.month,
                label: m.month,
                value: m.revenue,
                valueLabel: `£${(m.revenue / 1000).toFixed(1)}k`,
              }))}
            />
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Plans" />
          <Table>
            <thead>
              <tr>
                <Th className="pl-4">Plan</Th>
                <Th>Price</Th>
                <Th align="right">Subscribers</Th>
                <Th align="right" className="pr-4">
                  Status
                </Th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <Tr key={p.name} hover>
                  <Td className="pl-4 font-medium">{p.name}</Td>
                  <Td className="tnum font-mono text-ink-2">{p.price}</Td>
                  <Td align="right" className="tnum font-mono text-ink-2">
                    {p.subs}
                  </Td>
                  <Td align="right" className="pr-4">
                    <Badge tone="success" dot>
                      Active
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      </div>

      <Panel>
        <PanelHeader title="Recent transactions" />
        <Table>
          <thead>
            <tr>
              <Th className="pl-4">Invoice</Th>
              <Th>Student</Th>
              <Th>Plan</Th>
              <Th align="right">Amount</Th>
              <Th>Status</Th>
              <Th align="right" className="pr-4">
                Date
              </Th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <Tr key={t.id} hover>
                <Td className="pl-4">
                  <span className="tnum font-mono text-[12.5px] text-ink-2">{t.id}</span>
                </Td>
                <Td>
                  <span className="tnum font-mono text-[12.5px] text-ink">{t.code}</span>
                </Td>
                <Td className="text-ink-2">{t.plan}</Td>
                <Td align="right" className="tnum font-mono">
                  {t.amount}
                </Td>
                <Td>
                  <StatusBadge status={t.status} />
                </Td>
                <Td align="right" className="whitespace-nowrap pr-4 text-[12.5px] text-ink-2">
                  {t.date}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Panel>
    </PageContainer>
  )
}
