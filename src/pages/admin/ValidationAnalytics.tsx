import { useCallback, useEffect, useMemo, useState } from 'react'
import { BarChart3, CheckCircle2, ClipboardCheck, Clock3, Flag, RefreshCw, ShieldCheck, Users } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Stat } from '@/components/ui/Stat'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Select, Textarea, TextInput } from '@/components/ui/Field'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { API_BASE, API_MODE, apiGet, apiPost } from '@/lib/api'
import { ISSUE_LABEL, RELEVANCE_LABEL, type MetricRow, type ValidationAnalyticsData, type ValidationSetup } from '@/data/mcqValidation'

type Filters = {
  universityId: string; academicYear: string; term: string; moduleId: string; subjectId: string
  validatorId: string; batchStatus: string; from: string; to: string
}

const blankFilters: Filters = { universityId: '', academicYear: '', term: '', moduleId: '', subjectId: '', validatorId: '', batchStatus: '', from: '', to: '' }
const pct = (value: number) => `${Math.round((Number(value) || 0) * 100)}%`
const decimal = (value: number, digits = 1) => (Number(value) || 0).toFixed(digits)
const dateTime = (value: string | null) => value ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—'

function queryFor(filters: Filters) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(filters)) if (value) params.set(key, value)
  return params.toString() ? `?${params}` : ''
}

function unique(values: Array<string | null | undefined>) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))].sort()
}

export function ValidationAnalytics() {
  const [filters, setFilters] = useState<Filters>(blankFilters)
  const [analytics, setAnalytics] = useState<ValidationAnalyticsData | null>(null)
  const [setup, setSetup] = useState<ValidationSetup>({ validators: [], batches: [] })
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [title, setTitle] = useState('')
  const [universityId, setUniversityId] = useState('')
  const [academicYear, setAcademicYear] = useState('')
  const [term, setTerm] = useState('')
  const [moduleId, setModuleId] = useState('')
  const [moduleName, setModuleName] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [dueAt, setDueAt] = useState('')
  const [questionIds, setQuestionIds] = useState('')
  const [selectedValidators, setSelectedValidators] = useState<string[]>([])

  const loadSetup = useCallback(async () => {
    if (!API_MODE) return
    setSetup(await apiGet<ValidationSetup>('/admin/mcq-validation/setup'))
  }, [])

  const loadAnalytics = useCallback(async (next: Filters) => {
    if (!API_MODE) { setLoading(false); setError('Validation analytics requires the live Nishani backend.'); return }
    setLoading(true); setError('')
    try { setAnalytics(await apiGet<ValidationAnalyticsData>(`/admin/mcq-validation/analytics${queryFor(next)}`)) }
    catch { setError('Validation analytics could not be loaded. This area is available only to administrators.') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { void Promise.all([loadSetup(), loadAnalytics(blankFilters)]) }, [loadSetup, loadAnalytics])

  const dimensions = useMemo(() => ({
    universities: unique([...setup.validators.map((v) => v.universityId), ...setup.batches.map((b) => String(b.universityId || '') || null)]),
    years: unique(setup.batches.map((b) => String(b.academicYear || '') || null)),
    terms: unique(setup.batches.map((b) => String(b.term || '') || null)),
    modules: unique(setup.batches.map((b) => String(b.moduleId || '') || null)),
    subjects: unique(setup.batches.map((b) => String(b.subjectId || '') || null)),
  }), [setup])

  const availableValidators = setup.validators.filter((validator) => !universityId || validator.universityId === universityId)

  async function createAndAssign() {
    const ids = questionIds.split(/[\s,]+/).map((id) => id.trim()).filter(Boolean)
    if (!title.trim() || !universityId || !ids.length) { setError('Batch title, university and at least one question ID are required.'); return }
    setBusy(true); setError(''); setNotice('')
    try {
      const created = await apiPost<{ batch: { id: string; questionCount: number } }>('/admin/mcq-validation/batches', {
        title, universityId, academicYear, term, moduleId, moduleName, subjectId, subjectName, dueAt: dueAt || null, questionIds: ids,
      })
      if (selectedValidators.length) {
        await apiPost(`/admin/mcq-validation/batches/${encodeURIComponent(created.batch.id)}/assign`, { validatorIds: selectedValidators })
      }
      setNotice(`Created ${title} with ${created.batch.questionCount} questions${selectedValidators.length ? ` and assigned ${selectedValidators.length} validators` : ''}.`)
      setTitle(''); setQuestionIds(''); setSelectedValidators([])
      await Promise.all([loadSetup(), loadAnalytics(filters)])
    } catch { setError('The batch could not be created. Check that every question ID is a published, answerable MCQ and every validator belongs to the selected university.') }
    finally { setBusy(false) }
  }

  const summary = analytics?.summary
  const updateFilter = (key: keyof Filters, value: string) => setFilters((current) => ({ ...current, [key]: value }))

  return (
    <PageContainer className="max-w-[1480px]">
      <PageHeader title="MCQ Validation Analytics" description="Assign blind validation batches and review curriculum fit, accuracy, confidence, pace, issue flags, and cross-validator agreement."
        actions={<><Badge tone="success"><ShieldCheck size={13} /> Admin only</Badge><Button size="sm" variant="secondary" iconLeft={RefreshCw} loading={loading} onClick={() => void Promise.all([loadSetup(), loadAnalytics(filters)])}>Refresh</Button></>} />
      {error && <Panel className="mb-4 border-danger/30 bg-danger-tint px-4 py-3 text-[13px] text-danger" role="alert">{error}</Panel>}
      {notice && <Panel className="mb-4 border-success/30 bg-success-tint px-4 py-3 text-[13px] text-success" role="status">{notice}</Panel>}

      <Panel className="mb-4"><PanelHeader title="Filters" icon={BarChart3} hint="Every chart and review row" /><div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
        <FilterSelect label="University" value={filters.universityId} values={dimensions.universities} onChange={(v) => updateFilter('universityId', v)} />
        <FilterSelect label="Academic year" value={filters.academicYear} values={dimensions.years} onChange={(v) => updateFilter('academicYear', v)} />
        <FilterSelect label="Term" value={filters.term} values={dimensions.terms} onChange={(v) => updateFilter('term', v)} />
        <FilterSelect label="Module" value={filters.moduleId} values={dimensions.modules} onChange={(v) => updateFilter('moduleId', v)} />
        <FilterSelect label="Subject" value={filters.subjectId} values={dimensions.subjects} onChange={(v) => updateFilter('subjectId', v)} />
        <Field label="Validator"><Select value={filters.validatorId} onChange={(e) => updateFilter('validatorId', e.target.value)}><option value="">All validators</option>{setup.validators.map((validator) => <option key={validator.id} value={validator.id}>{validator.name}</option>)}</Select></Field>
        <Field label="Batch status"><Select value={filters.batchStatus} onChange={(e) => updateFilter('batchStatus', e.target.value)}><option value="">All statuses</option><option value="assigned">Assigned</option><option value="started">Started</option><option value="completed">Completed</option></Select></Field>
        <Field label="From"><TextInput type="date" value={filters.from} onChange={(e) => updateFilter('from', e.target.value)} /></Field>
        <Field label="To"><TextInput type="date" value={filters.to} onChange={(e) => updateFilter('to', e.target.value)} /></Field>
        <div className="flex items-end gap-2"><Button variant="primary" className="flex-1" onClick={() => void loadAnalytics(filters)}>Apply</Button><Button variant="secondary" onClick={() => { setFilters(blankFilters); void loadAnalytics(blankFilters) }}>Reset</Button></div>
      </div></Panel>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label="Validators" value={String(summary?.totalValidators ?? 0)} sub={`${summary?.validatorsByUniversity.length ?? 0} universities`} icon={Users} />
        <Stat label="Completed batches" value={String(summary?.batches.completed ?? 0)} sub={`${summary?.batches.started ?? 0} started · ${summary?.batches.assigned ?? 0} assigned`} icon={CheckCircle2} />
        <Stat label="Completion rate" value={pct(summary?.completionRate ?? 0)} sub="filtered assignments" icon={ClipboardCheck} />
        <Stat label="Questions attempted" value={(summary?.questionsAttempted ?? 0).toLocaleString()} sub={`${summary?.uniqueQuestionsAttempted ?? 0} unique`} icon={Flag} />
        <Stat label="Accuracy" value={pct(summary?.accuracy ?? 0)} sub={`${decimal(summary?.averageConfidence ?? 0)}/5 confidence · ${decimal(summary?.averageTimeSeconds ?? 0)}s`} icon={Clock3} />
      </div>

      <div className="mb-4 grid gap-4 xl:grid-cols-2">
        <Panel><PanelHeader title="Validators by university" /><Table><thead><Tr><Th>University</Th><Th align="end">Validators</Th><Th align="end">Completion</Th><Th align="end">Accuracy</Th></Tr></thead><tbody>{summary?.validatorsByUniversity.map((row) => { const completion = analytics?.completion.byUniversity.find((x) => x.id === row.universityId); const accuracy = analytics?.accuracy.byUniversity.find((x) => x.id === row.universityId); return <Tr key={row.universityId}><Td>{row.universityId}</Td><Td align="end">{row.validators}</Td><Td align="end">{pct(completion?.completionRate ?? 0)}</Td><Td align="end">{pct(accuracy?.accuracy ?? 0)}</Td></Tr> })}</tbody></Table></Panel>
        <Panel><PanelHeader title="Curriculum relevance" /><div className="grid grid-cols-3 gap-3 p-5">{Object.entries(RELEVANCE_LABEL).map(([key,label]) => <div key={key} className="rounded-lg border border-line bg-inset p-4 text-center"><p className="font-mono text-[24px] font-semibold text-ink">{summary?.relevance[key as keyof typeof summary.relevance] ?? 0}</p><p className="mt-1 text-[12px] text-ink-3">{label}</p></div>)}</div></Panel>
      </div>

      <Panel className="mb-4 overflow-hidden"><PanelHeader title="Completion and accuracy by validator" hint={`${analytics?.accuracy.byValidator.length ?? 0} validators with attempts`} /><Table><thead><Tr><Th>Validator</Th><Th align="end">Assigned</Th><Th align="end">Completed</Th><Th align="end">Completion</Th><Th align="end">Attempted</Th><Th align="end">Accuracy</Th><Th align="end">Confidence</Th><Th align="end">Time / question</Th></Tr></thead><tbody>{analytics?.completion.byValidator.map((row) => { const metric = analytics.accuracy.byValidator.find((item) => item.id === row.id); return <Tr key={row.id}><Td className="font-medium">{row.label}</Td><Td align="end">{row.assigned}</Td><Td align="end">{row.completed}</Td><Td align="end">{pct(row.completionRate)}</Td><Td align="end">{metric?.attempted ?? 0}</Td><Td align="end">{pct(metric?.accuracy ?? 0)}</Td><Td align="end">{decimal(metric?.averageConfidence ?? 0)}/5</Td><Td align="end">{decimal(metric?.averageTimeSeconds ?? 0)}s</Td></Tr> })}</tbody></Table></Panel>

      <div className="mb-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <MetricPanel title="Accuracy by year" rows={analytics?.accuracy.byYear ?? []} />
        <MetricPanel title="Accuracy by term" rows={analytics?.accuracy.byTerm ?? []} />
        <MetricPanel title="Accuracy by module" rows={analytics?.accuracy.byModule ?? []} />
        <MetricPanel title="Accuracy by subject" rows={analytics?.accuracy.bySubject ?? []} />
        <Panel><PanelHeader title="Flagged by issue type" /><div className="divide-y divide-line">{Object.entries(ISSUE_LABEL).map(([key,label]) => <div key={key} className="flex items-center justify-between px-4 py-3 text-[13px]"><span>{label}</span><Badge tone={(summary?.flags[key as keyof typeof summary.flags] ?? 0) ? 'warning' : 'neutral'}>{summary?.flags[key as keyof typeof summary.flags] ?? 0}</Badge></div>)}</div></Panel>
        <Panel><PanelHeader title="Validator agreement" hint="Same question across validators" /><div className="divide-y divide-line">{analytics?.agreement.slice(0, 8).map((row) => <div key={row.questionId} className="px-4 py-3"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[12px] text-ink">{row.questionId}</span><Badge tone={row.disagreement ? 'warning' : 'success'}>{pct(row.answerAgreement)} agree</Badge></div><p className="mt-1 text-[11.5px] text-ink-3">{row.universityId} · {row.validatorCount} validators · answers {Object.entries(row.answerDistribution).map(([answer,count]) => `${answer}: ${count}`).join(', ')}</p><p className="mt-1 text-[11.5px] text-ink-3">Curriculum: {Object.entries(row.relevanceDistribution).map(([result,count]) => `${RELEVANCE_LABEL[result as keyof typeof RELEVANCE_LABEL] ?? result}: ${count}`).join(', ')}</p></div>)}{!analytics?.agreement.length && <p className="p-5 text-center text-[12px] text-ink-3">No question has two validator responses yet.</p>}</div></Panel>
      </div>

      <Panel className="mb-4 overflow-hidden"><PanelHeader title="Questions needing review" hint={`${analytics?.reviewQueue.length ?? 0} flagged submissions`} /><div className="divide-y divide-line">{analytics?.reviewQueue.map((row) => <article key={row.id} className="p-4"><div className="flex flex-wrap items-center gap-2"><Badge tone="warning">{ISSUE_LABEL[row.issueCategory]}</Badge><span className="font-mono text-[12px] text-ink">{row.questionId}</span><span className="text-[12px] text-ink-3">{row.validatorName} · {row.universityId} · {dateTime(row.submittedAt)}</span><span className="ms-auto text-[12px] text-ink-3">Answer {row.selectedAnswer} · {row.confidence}/5 · {row.timeSeconds}s</span></div><p className="mt-2 text-[13px] text-ink-2">{row.suggestedCorrection || 'No suggested correction supplied.'}</p>{row.evidenceText && <p className="mt-1 text-[12.5px] text-ink-3">Evidence: {row.evidenceText}</p>}<div className="mt-2 flex gap-3 text-[12px]">{row.evidenceUrl && <a className="font-semibold text-primary" href={row.evidenceUrl} target="_blank" rel="noreferrer">Open source URL</a>}{row.sourceId && <a className="font-semibold text-primary" href={`${API_BASE}/mcq-validator/sources/${encodeURIComponent(row.sourceId)}/content`} target="_blank" rel="noreferrer">Open uploaded evidence</a>}</div></article>)}{!analytics?.reviewQueue.length && <p className="p-8 text-center text-[13px] text-ink-3">No flagged questions match these filters.</p>}</div></Panel>

      <Panel className="mb-4"><PanelHeader title="Create and assign a validation batch" icon={ClipboardCheck} hint="Question content is snapshotted; validators receive no answer key or explanation." /><div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Batch title"><TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Year 2 CVS validation" /></Field>
        <Field label="University"><Select value={universityId} onChange={(e) => { setUniversityId(e.target.value); setSelectedValidators([]) }}><option value="">Select university</option>{dimensions.universities.map((value) => <option key={value}>{value}</option>)}</Select></Field>
        <Field label="Academic year"><TextInput value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} placeholder="Year 2" /></Field>
        <Field label="Term"><TextInput value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Term 1" /></Field>
        <Field label="Module ID"><TextInput value={moduleId} onChange={(e) => setModuleId(e.target.value)} /></Field>
        <Field label="Module name"><TextInput value={moduleName} onChange={(e) => setModuleName(e.target.value)} /></Field>
        <Field label="Subject ID"><TextInput value={subjectId} onChange={(e) => setSubjectId(e.target.value)} /></Field>
        <Field label="Subject name"><TextInput value={subjectName} onChange={(e) => setSubjectName(e.target.value)} /></Field>
        <Field label="Due date"><TextInput type="datetime-local" value={dueAt} onChange={(e) => setDueAt(e.target.value)} /></Field>
        <Field label="Question IDs" className="sm:col-span-2 lg:col-span-3"><Textarea value={questionIds} onChange={(e) => setQuestionIds(e.target.value)} placeholder="Paste comma-, space-, or line-separated published question IDs" /></Field>
        <Field label="Assign validators" className="sm:col-span-2 lg:col-span-4"><div className="grid gap-2 rounded-lg border border-line p-3 sm:grid-cols-2 lg:grid-cols-3">{availableValidators.map((validator) => <label key={validator.id} className="flex items-center gap-2 text-[12.5px] text-ink-2"><input type="checkbox" checked={selectedValidators.includes(validator.id)} onChange={(e) => setSelectedValidators((current) => e.target.checked ? [...current, validator.id] : current.filter((id) => id !== validator.id))} className="accent-primary" />{validator.name}<span className="text-ink-3">{validator.year || validator.email}</span></label>)}{!availableValidators.length && <p className="text-[12px] text-ink-3">Choose a university with active MCQ Validator accounts.</p>}</div></Field>
        <div className="sm:col-span-2 lg:col-span-4"><Button variant="primary" loading={busy} onClick={() => void createAndAssign()}>Create batch{selectedValidators.length ? ` and assign ${selectedValidators.length}` : ''}</Button></div>
      </div></Panel>

      <Panel className="overflow-hidden"><PanelHeader title="Recent batches" /><Table><thead><Tr><Th>Batch</Th><Th>Placement</Th><Th>Status</Th><Th align="end">Questions</Th><Th align="end">Validators</Th><Th align="end">Completed</Th></Tr></thead><tbody>{setup.batches.map((batch) => <Tr key={String(batch.id)}><Td className="font-medium">{String(batch.title)}</Td><Td className="text-[12px] text-ink-3">{[batch.universityId, batch.academicYear, batch.term, batch.moduleName, batch.subjectName].filter(Boolean).join(' · ')}</Td><Td><Badge tone={batch.status === 'assigned' ? 'primary' : 'neutral'}>{String(batch.status)}</Badge></Td><Td align="end">{Number(batch.questionCount)}</Td><Td align="end">{Number(batch.validatorCount)}</Td><Td align="end">{Number(batch.completedAssignments || 0)}</Td></Tr>)}</tbody></Table></Panel>
    </PageContainer>
  )
}

function FilterSelect({ label, value, values, onChange }: { label: string; value: string; values: string[]; onChange: (value: string) => void }) {
  return <Field label={label}><Select value={value} onChange={(e) => onChange(e.target.value)}><option value="">All</option>{values.map((entry) => <option key={entry}>{entry}</option>)}</Select></Field>
}

function MetricPanel({ title, rows }: { title: string; rows: MetricRow[] }) {
  return <Panel className="overflow-hidden"><PanelHeader title={title} /><Table><thead><Tr><Th>Group</Th><Th align="end">Attempted</Th><Th align="end">Accuracy</Th><Th align="end">Confidence</Th><Th align="end">Time</Th></Tr></thead><tbody>{rows.slice(0, 20).map((row) => <Tr key={row.id}><Td>{row.label}</Td><Td align="end">{row.attempted}</Td><Td align="end">{pct(row.accuracy)}</Td><Td align="end">{decimal(row.averageConfidence)}/5</Td><Td align="end">{decimal(row.averageTimeSeconds)}s</Td></Tr>)}</tbody></Table></Panel>
}
