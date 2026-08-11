import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookCheck, ChevronLeft, ChevronRight, Database, FileSearch, RefreshCw, TriangleAlert } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { SearchInput, Select } from '@/components/ui/Field'
import { apiGet } from '@/lib/api'
import { useMedicalTaxonomy } from '@/data/medicalTaxonomyStore'

interface CountItem { count: number }
interface DestinationCount extends CountItem { destination: string }
interface SystemCount extends CountItem { systemId: string | null }
interface SourceStateCount extends CountItem { status: string }
interface CoverageSummary {
  candidates: number
  candidateSources: number
  destinations: DestinationCount[]
  systems: SystemCount[]
  sourceStates: SourceStateCount[]
  collections: Array<CountItem & { collectionId: string }>
}

interface CoverageCandidate {
  candidateId: string
  sourceId: string
  systemId: string | null
  subject: string | null
  topic: string | null
  subtopic: string | null
  microtopic: string | null
  label: string | null
  statement: string | null
  conceptType: string | null
  riskClass: string | null
  confidence: number | null
  destination: string
  reasonCode: string
  reason: string
  targetConceptId: string | null
  resourceRelativePath: string | null
  locatorPage: number | null
  locatorPrintedPage: string | null
  locatorSection: string | null
  locatorStart: number | null
  locatorEnd: number | null
  coverageUnitId: string | null
  supportSpan: string | null
}

interface CandidatePage {
  page: number
  pageSize: number
  total: number
  items: CoverageCandidate[]
}

const destinationLabel = (value: string) => ({
  needs_second_independent_source: 'Needs second source',
  needs_authoritative_evidence: 'Needs authoritative evidence',
  faculty_review_required: 'Faculty review required',
  curriculum_objective_only: 'Curriculum objective only',
  curriculum_signal_only: 'Assessment signal only',
  needs_atomization: 'Needs splitting into atomic claims',
  excluded_after_structural_quality_audit: 'Excluded after quality review',
  merged_after_conservative_queue_review: 'Merged into canonical concept',
}[value] || value.replaceAll('_', ' '))

const destinationTone = (value: string): 'neutral' | 'accent' | 'success' | 'warning' | 'danger' => {
  if (value.startsWith('merged_')) return 'success'
  if (value === 'faculty_review_required') return 'danger'
  if (value.startsWith('needs_')) return 'warning'
  if (value.startsWith('curriculum_')) return 'accent'
  return 'neutral'
}

const formatCount = (value: number) => new Intl.NumberFormat('en-US').format(value)

function locatorLabel(candidate: CoverageCandidate) {
  return [
    candidate.locatorPage != null ? `PDF page ${candidate.locatorPage}` : '',
    candidate.locatorPrintedPage ? `printed page ${candidate.locatorPrintedPage}` : '',
    candidate.locatorSection ? candidate.locatorSection : '',
  ].filter(Boolean).join(' · ') || 'Exact source location unavailable'
}

export function MedicalCoverageReview() {
  const [taxonomy] = useMedicalTaxonomy()
  const systemNames = useMemo(() => new Map(taxonomy.filter((node) => node.parentId === null).map((node) => [node.id, node.title])), [taxonomy])
  const [summary, setSummary] = useState<CoverageSummary | null>(null)
  const [pageData, setPageData] = useState<CandidatePage | null>(null)
  const [destination, setDestination] = useState('')
  const [systemId, setSystemId] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    void apiGet<CoverageSummary>('/medical-library/coverage/summary')
      .then((value) => { if (!cancelled) setSummary(value) })
      .catch(() => { if (!cancelled) setError('The medical coverage summary could not be loaded.') })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    let cancelled = false
    const timer = window.setTimeout(() => {
      setLoading(true)
      setError('')
      const params = new URLSearchParams({ page: String(page), pageSize: '50' })
      if (destination) params.set('destination', destination)
      if (systemId) params.set('systemId', systemId)
      if (query.trim()) params.set('search', query.trim())
      void apiGet<CandidatePage>(`/medical-library/coverage/candidates?${params}`)
        .then((value) => {
          if (cancelled) return
          setPageData(value)
          setSelectedId((current) => value.items.some((item) => item.candidateId === current) ? current : value.items[0]?.candidateId ?? null)
        })
        .catch(() => { if (!cancelled) setError('The review queue could not be loaded. Confirm the admin session and try again.') })
        .finally(() => { if (!cancelled) setLoading(false) })
    }, 220)
    return () => { cancelled = true; window.clearTimeout(timer) }
  }, [destination, page, query, systemId])

  const selected = pageData?.items.find((item) => item.candidateId === selectedId) ?? null
  const totalPages = Math.max(1, Math.ceil((pageData?.total || 0) / (pageData?.pageSize || 50)))
  const countFor = (key: string) => summary?.destinations.find((item) => item.destination === key)?.count || 0

  function resetFilters() {
    setDestination('')
    setSystemId('')
    setQuery('')
    setPage(1)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Medical evidence review"
        description="Every extracted Kasr statement has a recorded destination. This queue keeps unsupported wording visible to reviewers without publishing it as medical truth."
        actions={<Link to="/admin/library"><Button variant="secondary" size="md" iconLeft={ArrowLeft}>Back to Library</Button></Link>}
      />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ['Reviewed candidates', summary?.candidates || 0, 'Every eligible Kasr extract'],
          ['Need a second source', countFor('needs_second_independent_source'), 'Stable facts held back'],
          ['Faculty review', countFor('faculty_review_required'), 'Treatment and action content'],
          ['Safe merges applied', countFor('merged_after_conservative_queue_review'), 'Exact proposition matches only'],
        ].map(([label, value, hint]) => (
          <Panel key={String(label)} className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{label}</p>
            <p className="tnum mt-2 font-mono text-[25px] font-semibold leading-none text-ink">{formatCount(Number(value))}</p>
            <p className="mt-1.5 text-[11.5px] leading-snug text-ink-3">{hint}</p>
          </Panel>
        ))}
      </div>

      {summary && (
        <Panel className="mb-4 overflow-hidden">
          <PanelHeader title="Source readiness" icon={Database} hint={`${formatCount(summary.sourceStates.reduce((sum, item) => sum + item.count, 0))} digested source records`} />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 text-[11.5px] text-ink-2">
            {summary.sourceStates.map((item) => (
              <span key={item.status} className="inline-flex items-center gap-2">
                <span className={`size-1.5 rounded-full ${item.status === 'available_file' ? 'bg-success' : item.status === 'source_binary_unavailable' ? 'bg-danger' : 'bg-warning'}`} />
                <span className="font-medium">{item.status === 'available_file' ? 'Source file available' : item.status === 'source_binary_unavailable' ? 'Source binary unavailable' : 'No current source locator'}</span>
                <span className="tnum font-mono text-ink-3">{formatCount(item.count)}</span>
              </span>
            ))}
            <span className="text-ink-3">Unavailable Ain Shams digests remain quarantined and cannot count as claim evidence.</span>
          </div>
        </Panel>
      )}

      <Panel className="mb-4 overflow-hidden">
        <PanelHeader title="Review filters" icon={FileSearch} hint={pageData ? `${formatCount(pageData.total)} matching` : 'Loading…'} />
        <div className="grid gap-2 p-3 sm:grid-cols-[minmax(15rem,1fr)_14rem_14rem_auto] sm:items-center">
          <SearchInput value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search statement, concept, source, or ID…" />
          <Select aria-label="Evidence destination" value={destination} onChange={(event) => { setDestination(event.target.value); setPage(1) }}>
            <option value="">All destinations</option>
            {summary?.destinations.map((item) => <option key={item.destination} value={item.destination}>{destinationLabel(item.destination)} ({formatCount(item.count)})</option>)}
          </Select>
          <Select aria-label="Medical system" value={systemId} onChange={(event) => { setSystemId(event.target.value); setPage(1) }}>
            <option value="">All systems</option>
            {summary?.systems.map((item) => item.systemId && <option key={item.systemId} value={item.systemId}>{systemNames.get(item.systemId) || item.systemId} ({formatCount(item.count)})</option>)}
          </Select>
          <Button variant="ghost" size="sm" iconLeft={RefreshCw} onClick={resetFilters}>Clear</Button>
        </div>
      </Panel>

      {error && <div role="alert" className="mb-4 flex items-start gap-2 rounded-lg border border-danger/25 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger"><Icon icon={TriangleAlert} size={16} className="mt-0.5 shrink-0" />{error}</div>}

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <Panel className="min-w-0 overflow-hidden" aria-busy={loading}>
          <PanelHeader title="Candidate statements" icon={Database} hint="Select a statement to inspect its evidence decision" />
          <div className="divide-y divide-line">
            {!loading && pageData?.items.length === 0 && (
              <div className="px-4 py-14 text-center"><Icon icon={BookCheck} size={22} className="mx-auto text-ink-3" /><p className="mt-2 text-[13px] font-medium text-ink">No matching candidates</p><p className="mt-1 text-[12px] text-ink-3">Change a filter or clear the search.</p></div>
            )}
            {loading && !pageData && <div className="px-4 py-14 text-center text-[12.5px] text-ink-3">Loading the evidence queue…</div>}
            {pageData?.items.map((candidate) => (
              <button
                key={candidate.candidateId}
                type="button"
                onClick={() => setSelectedId(candidate.candidateId)}
                className={`block w-full px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${selectedId === candidate.candidateId ? 'bg-accent-tint/55' : 'hover:bg-inset/50'}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold leading-snug text-ink">{candidate.label || 'Untitled extracted statement'}</p>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-ink-2">{candidate.statement}</p>
                  </div>
                  <Badge tone={destinationTone(candidate.destination)}>{destinationLabel(candidate.destination)}</Badge>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-ink-3">
                  <span>{systemNames.get(candidate.systemId || '') || candidate.systemId || 'Unplaced'}</span>
                  <span>{locatorLabel(candidate)}</span>
                  {candidate.confidence != null && <span>{Math.round(candidate.confidence * 100)}% extraction confidence</span>}
                </div>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-2/40 px-4 py-3">
            <p className="tnum font-mono text-[11px] text-ink-3">Page {pageData?.page || page} of {totalPages}</p>
            <div className="flex items-center gap-1">
              <Button variant="secondary" size="sm" iconLeft={ChevronLeft} disabled={page <= 1 || loading} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</Button>
              <Button variant="secondary" size="sm" iconLeft={ChevronRight} disabled={page >= totalPages || loading} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Next</Button>
            </div>
          </div>
        </Panel>

        <div className="xl:sticky xl:top-20">
          <Panel className="overflow-hidden">
            <PanelHeader title="Decision record" icon={BookCheck} />
            {selected ? (
              <div className="space-y-4 p-4">
                <div>
                  <Badge tone={destinationTone(selected.destination)} dot>{destinationLabel(selected.destination)}</Badge>
                  <p className="mt-2 text-[13.5px] font-semibold leading-snug text-ink">{selected.label}</p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">{selected.statement}</p>
                </div>
                <div className="rounded-lg border border-line bg-surface-2/45 p-3">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Why it is here</p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-ink-2">{selected.reason}</p>
                  <p className="mt-2 font-mono text-[10px] text-ink-3">{selected.reasonCode}</p>
                </div>
                <dl className="space-y-2 text-[11.5px]">
                  <div><dt className="font-semibold text-ink-3">Source</dt><dd className="mt-0.5 break-words text-ink-2">{selected.resourceRelativePath || selected.sourceId}</dd></div>
                  <div><dt className="font-semibold text-ink-3">Exact locator</dt><dd className="mt-0.5 text-ink-2">{locatorLabel(selected)}</dd></div>
                  {selected.supportSpan && <div><dt className="font-semibold text-ink-3">Source passage</dt><dd className="mt-1 rounded-md border-s-2 border-accent-line bg-surface-2/50 px-2.5 py-2 text-[11.5px] leading-relaxed text-ink-2">{selected.supportSpan}</dd></div>}
                  {selected.targetConceptId && <div><dt className="font-semibold text-ink-3">Canonical destination</dt><dd className="mt-0.5 font-mono text-[10.5px] text-accent-strong">{selected.targetConceptId}</dd></div>}
                  <div><dt className="font-semibold text-ink-3">Lineage</dt><dd className="mt-0.5 break-all font-mono text-[10px] text-ink-3">{selected.candidateId} · {selected.sourceId}</dd></div>
                </dl>
              </div>
            ) : (
              <div className="px-4 py-10 text-center text-[12px] text-ink-3">Select a candidate to inspect its source, locator, and editorial decision.</div>
            )}
          </Panel>
        </div>
      </div>
    </PageContainer>
  )
}
