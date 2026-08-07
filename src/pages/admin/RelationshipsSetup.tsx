import { useMemo, useState } from 'react'
import { Plus, Trash2, ArrowRight, Upload, Search, CircleCheck, TriangleAlert } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Field, SearchInput, Select, Textarea } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  CONCEPT_STORAGE_KEY,
  CONCEPT_RELATIONS,
  initialConceptGraph,
  type ConceptGraph,
  type ConceptRelationType,
} from '@/data/conceptGraph'

/** Directed relationship types (source → target). */
const RELATION_TYPES: readonly ConceptRelationType[] = CONCEPT_RELATIONS

export function RelationshipsSetup() {
  const [graph, setGraph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [query, setQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [source, setSource] = useState('')
  const [type, setType] = useState<ConceptRelationType>('associated_with')
  const [target, setTarget] = useState('')
  const [notice, setNotice] = useState<string | null>(null)
  const [importing, setImporting] = useState(false)
  const [importText, setImportText] = useState('')
  const [report, setReport] = useState<{ added: number; skipped: number; errors: string[] } | null>(null)

  const conceptLabel = (id: string) => graph.concepts.find((c) => c.id === id)?.label ?? id
  const conceptOptions = [...graph.concepts].sort((a, b) => a.label.localeCompare(b.label))

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return graph.relations.filter((rel) => {
      if (filterType !== 'all' && rel.type !== filterType) return false
      if (!q) return true
      return `${conceptLabel(rel.sourceId)} ${rel.type} ${conceptLabel(rel.targetId)} ${rel.sourceId} ${rel.targetId}`.toLowerCase().includes(q)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph.relations, query, filterType, graph.concepts])

  function addRelation() {
    if (!source || !target || source === target) return
    if (graph.relations.some((r) => r.sourceId === source && r.targetId === target && r.type === type)) {
      setNotice('That relationship already exists.')
      return
    }
    setGraph((g) => ({ ...g, relations: [{ id: `rel-${Date.now()}`, sourceId: source, type, targetId: target }, ...g.relations] }))
    setNotice(`Added: ${conceptLabel(source)} → ${type} → ${conceptLabel(target)}.`)
  }

  function removeRelation(id: string) {
    setGraph((g) => ({ ...g, relations: g.relations.filter((r) => r.id !== id) }))
  }

  function runImport() {
    const byId = new Map(graph.concepts.map((c) => [c.id, c]))
    const byLabel = new Map(graph.concepts.map((c) => [c.label.toLowerCase(), c]))
    const resolve = (token: string) => byId.get(token.trim()) ?? byLabel.get(token.trim().toLowerCase())
    const validTypes = new Set<string>(RELATION_TYPES)
    const existing = new Set(graph.relations.map((r) => `${r.sourceId}|${r.type}|${r.targetId}`))
    const additions: ConceptGraph['relations'] = []
    const errors: string[] = []
    let skipped = 0

    importText.split(/\r?\n/).forEach((raw, index) => {
      const line = raw.trim()
      if (!line || line.startsWith('#')) return
      const parts = line.split('|').map((p) => p.trim())
      if (parts.length < 3) { errors.push(`Line ${index + 1}: expected "source | type | target".`); return }
      const [s, ty, t] = parts
      const src = resolve(s); const tgt = resolve(t)
      if (!src) { errors.push(`Line ${index + 1}: unknown concept "${s}".`); return }
      if (!tgt) { errors.push(`Line ${index + 1}: unknown concept "${t}".`); return }
      if (!validTypes.has(ty)) { errors.push(`Line ${index + 1}: unknown relation type "${ty}".`); return }
      if (src.id === tgt.id) { errors.push(`Line ${index + 1}: a concept cannot relate to itself.`); return }
      const key = `${src.id}|${ty}|${tgt.id}`
      if (existing.has(key) || additions.some((a) => `${a.sourceId}|${a.type}|${a.targetId}` === key)) { skipped++; return }
      additions.push({ id: `rel-imp-${Date.now()}-${index}`, sourceId: src.id, type: ty as ConceptRelationType, targetId: tgt.id })
    })

    if (additions.length) setGraph((g) => ({ ...g, relations: [...additions, ...g.relations] }))
    setReport({ added: additions.length, skipped, errors })
  }

  const template = `# One relationship per line:  source | type | target\n# source/target can be a Concept ID or its exact label\nmed.concept.stemi | part_of | med.concept.acute-coronary-syndrome\nHeart failure | treated_by | Beta-blockade\nNSTEMI | often_confused_with | STEMI`

  return (
    <PageContainer>
      <PageHeader
        title="Relationships"
        description="Directed relationships between concepts. Each relation stores its direction (source → target) and appears wherever the concept is shown."
        actions={<Button variant="secondary" size="md" iconLeft={Upload} onClick={() => { setImporting(true); setReport(null); setImportText('') }}>Bulk import</Button>}
      />

      {notice && (
        <div role="status" className="mb-4 flex items-center gap-2 rounded-lg border border-success/25 bg-success-tint/70 px-4 py-2.5 text-[13px] text-ink">
          <Icon icon={CircleCheck} size={16} className="text-success" /><span className="flex-1">{notice}</span>
          <button onClick={() => setNotice(null)} className="text-[12px] font-medium text-ink-3 hover:text-ink">Dismiss</button>
        </div>
      )}

      {/* Add relationship */}
      <Panel className="mb-4">
        <PanelHeader title="Add a relationship" icon={Plus} />
        <div className="grid items-end gap-3 p-4 lg:grid-cols-[1fr_auto_1fr_auto]">
          <Field label="Source concept">
            <Select value={source} onChange={(e) => setSource(e.target.value)}>
              <option value="">— Select —</option>
              {conceptOptions.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </Select>
          </Field>
          <Field label="Relation (direction →)">
            <Select value={type} onChange={(e) => setType(e.target.value as ConceptRelationType)}>
              {RELATION_TYPES.map((rt) => <option key={rt} value={rt}>{rt}</option>)}
            </Select>
          </Field>
          <Field label="Target concept">
            <Select value={target} onChange={(e) => setTarget(e.target.value)}>
              <option value="">— Select —</option>
              {conceptOptions.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </Select>
          </Field>
          <Button variant="primary" iconLeft={Plus} onClick={addRelation} disabled={!source || !target || source === target}>Add</Button>
        </div>
      </Panel>

      {/* Relationship list */}
      <Panel>
        <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface-2/45 px-4 py-3">
          <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search relationships…" className="w-72" />
          <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-52">
            <option value="all">All types</option>
            {RELATION_TYPES.map((rt) => <option key={rt} value={rt}>{rt}</option>)}
          </Select>
          <span className="ms-auto tnum font-mono text-[11.5px] text-ink-3">{rows.length} of {graph.relations.length}</span>
        </div>
        <Table>
          <thead><tr><Th className="pl-4">Source</Th><Th>Relation</Th><Th>Target</Th><Th align="right" className="pr-4">Actions</Th></tr></thead>
          <tbody>
            {rows.map((rel) => (
              <Tr key={rel.id} hover>
                <Td className="pl-4 font-medium">{conceptLabel(rel.sourceId)}</Td>
                <Td><span className="inline-flex items-center gap-1.5"><Badge tone="accent">{rel.type}</Badge><Icon icon={ArrowRight} size={13} className="text-ink-3" /></span></Td>
                <Td className="text-ink-2">{conceptLabel(rel.targetId)}</Td>
                <Td align="right" className="pr-4"><Button variant="ghost" size="sm" iconLeft={Trash2} className="hover:text-danger" onClick={() => removeRelation(rel.id)}>Remove</Button></Td>
              </Tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-14 text-center"><Icon icon={Search} size={20} className="mx-auto text-ink-3" /><p className="mt-2 text-[13px] font-medium text-ink">No relationships</p><p className="mt-1 text-[12px] text-ink-3">Add one above or bulk-import.</p></td></tr>
            )}
          </tbody>
        </Table>
      </Panel>

      {/* Bulk import dialog */}
      {importing && (
        <div className="fixed inset-0 z-50 grid items-end bg-ink/30 p-0 animate-fade sm:place-items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Bulk import relationships" onMouseDown={() => setImporting(false)}>
          <Panel className="animate-pop flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-b-none pb-[env(safe-area-inset-bottom)] shadow-pop sm:max-w-xl sm:rounded-xl" onMouseDown={(e) => e.stopPropagation()}>
            <PanelHeader title="Bulk import relationships" icon={Upload} />
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
              <ol className="list-inside list-decimal space-y-1 text-[12.5px] text-ink-2">
                <li>Write one relationship per line: <code className="rounded bg-inset px-1 font-mono text-[11px]">source | type | target</code>.</li>
                <li>Use a Concept ID or its exact label for source/target.</li>
                <li>Lines starting with <code className="font-mono text-[11px]">#</code> are ignored. Duplicates are skipped.</li>
                <li>Press <b>Import</b> — you'll get a report of what was added, skipped, and rejected.</li>
              </ol>
              <Field label="Relationships">
                <Textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder={template} className="min-h-[12rem] font-mono text-[12px]" />
              </Field>
              {report && (
                <div className="rounded-lg border border-line bg-surface-2/50 p-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="success">{report.added} added</Badge>
                    <Badge tone="neutral">{report.skipped} skipped (duplicate)</Badge>
                    <Badge tone={report.errors.length ? 'danger' : 'neutral'}>{report.errors.length} rejected</Badge>
                  </div>
                  {report.errors.length > 0 && (
                    <ul className="mt-2 max-h-32 space-y-0.5 overflow-y-auto">
                      {report.errors.map((e, i) => <li key={i} className="flex items-start gap-1.5 text-[11.5px] text-danger"><Icon icon={TriangleAlert} size={12} className="mt-0.5 shrink-0" />{e}</li>)}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-line bg-surface-2/40 px-5 py-3">
              <Button variant="ghost" onClick={() => setImporting(false)}>Close</Button>
              <Button variant="primary" iconLeft={Upload} onClick={runImport} disabled={!importText.trim()}>Import</Button>
            </div>
          </Panel>
        </div>
      )}
    </PageContainer>
  )
}
