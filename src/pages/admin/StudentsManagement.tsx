import { useMemo, useState } from 'react'
import { Users, ChevronRight, Search, GraduationCap, Layers } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { SearchInput } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { cn } from '@/lib/cn'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { adminStudents, type AdminStudent, type StudentStatus } from '@/data/students'

function statusTone(s: StudentStatus): 'success' | 'primary' | 'warning' | 'danger' {
  return s === 'Active' ? 'success' : s === 'Trial' ? 'primary' : s === 'Lapsed' ? 'warning' : 'danger'
}

export function StudentsManagement() {
  const [universities] = useUniversityCatalogue()
  const [scope, setScope] = useState<string>('all') // 'all' | uniId | uniId:year
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return adminStudents.filter((s) => {
      if (scope !== 'all') {
        const [uni, year] = scope.split(':')
        if (s.universityId !== uni) return false
        if (year && s.year !== year) return false
      }
      if (!q) return true
      return `${s.name} ${s.email} ${s.plan} ${s.status}`.toLowerCase().includes(q)
    })
  }, [scope, query])

  const count = (uniId?: string, year?: string) =>
    adminStudents.filter((s) => (!uniId || s.universityId === uniId) && (!year || s.year === year)).length

  const scopeLabel = scope === 'all'
    ? 'All students'
    : (() => { const [u, y] = scope.split(':'); const uni = universities.find((x) => x.id === u); return `${uni?.short ?? u}${y ? ` · ${y}` : ''}` })()

  return (
    <PageContainer>
      {/* The account-promotion panel that used to sit here is gone. It wrote
          roles from the Students tab, which Admins hold and which no longer
          carries any promotion power, and it did so through an endpoint that
          checked neither rank nor self-edit. Roles are changed in Users, where
          the record, the reason and the audit are already on screen. */}
      <PageHeader title="Students" description="Every registered student, organised by university and year. Select a scope on the left to focus." />

      <div className="grid items-start gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
        {/* ---- Left menu: Master Students → university → year ---- */}
        <Panel className="overflow-hidden">
          <button type="button" onClick={() => setScope('all')} className={cn('flex min-h-11 w-full items-center gap-2 border-b border-line px-3 py-2.5 text-start sm:min-h-10', scope === 'all' ? 'bg-primary-tint' : 'hover:bg-inset')}>
            <Icon icon={Users} size={16} className={scope === 'all' ? 'text-primary' : 'text-ink-3'} />
            <span className={cn('flex-1 text-[13.5px] font-semibold', scope === 'all' ? 'text-primary-strong' : 'text-ink')}>Master Students</span>
            <span className="tnum font-mono text-[11px] text-ink-3">{adminStudents.length}</span>
          </button>
          <div className="max-h-[32rem] overflow-y-auto p-1.5">
            {universities.map((uni) => {
              const open = expanded[uni.id] ?? false
              return (
                <div key={uni.id} className="mb-0.5">
                  <div className="flex items-center">
                    <button type="button" onClick={() => setExpanded((e) => ({ ...e, [uni.id]: !open }))} className="grid size-11 shrink-0 place-items-center rounded text-ink-3 hover:bg-inset hover:text-ink sm:size-7" aria-label="Toggle years">
                      <Icon icon={ChevronRight} size={14} className={cn('chevron-turn')} open={open} />
                    </button>
                    <button type="button" onClick={() => setScope(uni.id)} className={cn('flex min-h-11 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-start sm:min-h-8', scope === uni.id ? 'bg-primary-tint text-primary-strong' : 'hover:bg-inset')}>
                      <Icon icon={GraduationCap} size={14} className="text-ink-3" />
                      <span className="flex-1 truncate text-[13px] font-medium">{uni.short}</span>
                      <span className="tnum font-mono text-[10.5px] text-ink-3">{count(uni.id)}</span>
                    </button>
                  </div>
                  {open && (
                    <ul className="ms-7 border-s border-line-2 ps-1">
                      {uni.years.map((y) => {
                        const key = `${uni.id}:${y.year}`
                        return (
                          <li key={key}>
                            <button type="button" onClick={() => setScope(key)} className={cn('flex min-h-11 w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-[12.5px] sm:min-h-8', scope === key ? 'bg-primary-tint font-medium text-primary-strong' : 'text-ink-2 hover:bg-inset hover:text-ink')}>
                              <Icon icon={Layers} size={12} className="text-ink-3" />
                              <span className="flex-1 truncate">{y.year}</span>
                              <span className="tnum font-mono text-[10px] text-ink-3">{count(uni.id, y.year)}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </Panel>

        {/* ---- Roster ---- */}
        <Panel className="min-w-0 overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface-2/45 px-4 py-3">
            <span className="text-[13.5px] font-semibold text-ink">{scopeLabel}</span>
            <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students…" className="w-64" />
            <span className="ms-auto tnum font-mono text-[11.5px] text-ink-3">{filtered.length} shown</span>
          </div>
          <Table>
            <thead><tr><Th className="pl-4">Student</Th><Th>University · Year</Th><Th>Plan</Th><Th align="end">Answered</Th><Th align="end">Accuracy</Th><Th align="end">Readiness</Th><Th>Status</Th><Th align="end" className="pr-4">Last active</Th></tr></thead>
            <tbody>
              {filtered.slice(0, 200).map((s: AdminStudent) => {
                const uni = universities.find((u) => u.id === s.universityId)
                return (
                  <Tr key={s.id} hover>
                    <Td className="pl-4"><span className="inline-flex items-center gap-2.5"><Avatar name={s.name} size="sm" /><span className="min-w-0"><span className="block truncate text-[13px] font-medium text-ink">{s.name}</span><span className="block truncate text-[11px] text-ink-3">{s.email}</span></span></span></Td>
                    <Td className="whitespace-nowrap text-[12.5px] text-ink-2">{uni?.short} · {s.year}</Td>
                    <Td><Badge tone={s.plan === 'Free' ? 'neutral' : 'primary'}>{s.plan}</Badge></Td>
                    <Td align="end" className="tnum font-mono text-ink-2">{s.questionsAnswered.toLocaleString()}</Td>
                    <Td align="end" className="tnum font-mono text-ink-2">{s.accuracy}%</Td>
                    <Td align="end" className="tnum font-mono text-ink-2">{s.readiness}%</Td>
                    <Td><Badge tone={statusTone(s.status)}>{s.status}</Badge></Td>
                    <Td align="end" className="whitespace-nowrap pr-4 text-[11.5px] text-ink-3">{s.lastActive}</Td>
                  </Tr>
                )
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-14 text-center"><Icon icon={Search} size={20} className="mx-auto text-ink-3" /><p className="mt-2 text-[13px] font-medium text-ink">No students match</p></td></tr>
              )}
            </tbody>
          </Table>
        </Panel>
      </div>
    </PageContainer>
  )
}
