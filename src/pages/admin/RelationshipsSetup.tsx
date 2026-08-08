import { useMemo, useState } from 'react'
import { Plus, Trash2, ArrowRight, Upload, Search, CircleCheck, TriangleAlert, Tag } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Field, SearchInput, Select, Textarea, TextInput } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { usePersistentState } from '@/lib/usePersistentState'
import { cn } from '@/lib/cn'
import {
  CONCEPT_STORAGE_KEY,
  CONCEPT_RELATIONS,
  initialConceptGraph,
  type ConceptGraph,
  type ConceptRelationType,
} from '@/data/conceptGraph'

/** Built-in directed relationship types (source → target). */
const RELATION_TYPES: readonly ConceptRelationType[] = CONCEPT_RELATIONS
const RELATION_TYPES_KEY = 'synapse-relation-types-v1'
const slugType = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '')

export function RelationshipsSetup() {
  const [graph, setGraph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [customTypes, setCustomTypes] = usePersistentState<string[]>(RELATION_TYPES_KEY, [])
  const allTypes = [...RELATION_TYPES, ...customTypes.filter((t) => !RELATION_TYPES.includes(t as ConceptRelationType))]
  const [query, setQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [source, setSource] = useState('')
  const [type, setType] = useState<ConceptRelationType>('associated_with')
  const [targets, setTargets] = useState<string[]>([])
  const [bidirectional, setBidirectional] = useState(false)
  const [newType, setNewType] = useState('')
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
    const tgts = targets.filter((t) => t && t !== source)
    if (!source || tgts.length === 0) return
    const exists = new Set(graph.relations.map((r) => `${r.sourceId}|${r.type}|${r.targetId}`))
    const additions: ConceptGraph['relations'] = []
    let dup = 0
    const push = (s: string, t: string) => {
      const key = `${s}|${type}|${t}`
      if (exists.has(key) || additions.some((a) => `${a.sourceId}|${a.type}|${a.targetId}` === key)) { dup++; return }
      additions.push({ id: `rel-${Date.now()}-${additions.length}`, sourceId: s, type, targetId: t })
    }
    // One source → many targets; optionally back-and-forth (both directions).
    tgts.forEach((t) => { push(source, t); if (bidirectional) push(t, source) })
    if (additions.length) setGraph((g) => ({ ...g, relations: [...additions, ...g.relations] }))
    const dir = bidirectional ? ' (both directions)' : ''
    setNotice(additions.length
      ? `Added ${additions.length} relationship${additions.length === 1 ? '' : 's'}${dir}${dup ? `, ${dup} duplicate skipped` : ''}.`
      : 'Those relationships already exist.')
    setTargets([])
  }

  const addTarget = (id: string) => { if (id && !targets.includes(id)) setTargets((cur) => [...cur, id]) }

  function removeRelation(id: string) {
    setGraph((g) => ({ ...g, relations: g.relations.filter((r) => r.id !== id) }))
  }

  function addCustomType() {
    const t = slugType(newType)
    if (!t || allTypes.includes(t as ConceptRelationType)) { setNewType(''); return }
    setCustomTypes((cur) => [...cur, t])
    setType(t as ConceptRelationType)
    setNewType('')
    setNotice(`Added relationship type "${t}".`)
  }

  function runImport() {
    const byId = new Map(graph.concepts.map((c) => [c.id, c]))
    const byLabel = new Map(graph.concepts.map((c) => [c.label.toLowerCase(), c]))
    const resolve = (token: string) => byId.get(token.trim()) ?? byLabel.get(token.trim().toLowerCase())
    const validTypes = new Set<string>(allTypes)
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
      // Optional 4th token makes the line bidirectional: both | bi | <-> | ↔
      const both = /^(both|bi|<->|↔)$/i.test(parts[3] ?? '')
      const addOne = (sId: string, tId: string) => {
        const key = `${sId}|${ty}|${tId}`
        if (existing.has(key) || additions.some((a) => `${a.sourceId}|${a.type}|${a.targetId}` === key)) { skipped++; return }
        additions.push({ id: `rel-imp-${Date.now()}-${index}-${additions.length}`, sourceId: sId, type: ty as ConceptRelationType, targetId: tId })
      }
      addOne(src.id, tgt.id)
      if (both) addOne(tgt.id, src.id)
    })

    if (additions.length) setGraph((g) => ({ ...g, relations: [...additions, ...g.relations] }))
    setReport({ added: additions.length, skipped, errors })
  }

  const template = `# One relationship per line:  source | type | target [| both]\n# source/target can be a Concept ID or its exact label\n# Add a 4th "both" to make it bidirectional (↔). Repeat a pair with a new type for multiple links.\nmed.concept.stemi | part_of | med.concept.acute-coronary-syndrome\nHeart failure | treated_by | Beta-blockade\nNSTEMI | often_confused_with | STEMI | both\nAlcohol | increases | ALT\nAlcohol | increases | AST`

  return (
    <PageContainer>
      <PageHeader
        title="Relationships"
        description="Relationships between concepts — directional (source → target) or back-and-forth (↔). One concept can link to many at once, and the same pair can hold several relations of different types."
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
        <PanelHeader title="Add a relationship" icon={Plus} hint="One source → one or more targets; optionally both directions" />
        <div className="grid items-start gap-3 p-4 lg:grid-cols-[1fr_auto_1fr]">
          <Field label="Source concept">
            <Select value={source} onChange={(e) => setSource(e.target.value)}>
              <option value="">— Select —</option>
              {conceptOptions.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </Select>
          </Field>
          <Field label="Relation & direction">
            <div className="flex items-center gap-1.5">
              <Select value={type} onChange={(e) => setType(e.target.value as ConceptRelationType)} className="min-w-[9rem]">
                {allTypes.map((rt) => <option key={rt} value={rt}>{rt}</option>)}
              </Select>
              <button
                type="button"
                onClick={() => setBidirectional((v) => !v)}
                aria-pressed={bidirectional}
                title={bidirectional ? 'Both directions (↔)' : 'One direction (→)'}
                className={cn('grid h-9 w-11 shrink-0 place-items-center rounded-lg border text-[13px] font-semibold transition-colors',
                  bidirectional ? 'border-accent-line bg-accent-tint text-accent-strong' : 'border-line bg-surface text-ink-2 hover:bg-inset')}
              >
                {bidirectional ? '↔' : '→'}
              </button>
            </div>
          </Field>
          <Field label="Target concept(s)" hint="Add several to connect one concept to many at once.">
            <Select value="" onChange={(e) => addTarget(e.target.value)}>
              <option value="">— Add target —</option>
              {conceptOptions.filter((c) => c.id !== source && !targets.includes(c.id)).map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </Select>
            {targets.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {targets.map((tid) => (
                  <span key={tid} className="inline-flex items-center gap-1 rounded-full border border-accent-line bg-accent-tint py-0.5 pe-1.5 ps-2.5 text-[12px] font-medium text-accent-strong">
                    {conceptLabel(tid)}
                    <button onClick={() => setTargets((cur) => cur.filter((x) => x !== tid))} aria-label={`Remove ${conceptLabel(tid)}`} className="text-accent/70 hover:text-accent"><Icon icon={Trash2} size={11} /></button>
                  </span>
                ))}
              </div>
            )}
          </Field>
        </div>
        <div className="flex items-center justify-between gap-2 px-4 pb-4">
          <p className="text-[11.5px] text-ink-3">{source && targets.length ? `${conceptLabel(source)} ${bidirectional ? '↔' : '→'} ${type} ${bidirectional ? '↔' : '→'} ${targets.length} concept${targets.length === 1 ? '' : 's'}` : 'Pick a source and one or more targets.'}</p>
          <Button variant="primary" iconLeft={Plus} onClick={addRelation} disabled={!source || targets.length === 0}>Add {targets.length > 1 ? `${targets.length} relations` : 'relation'}</Button>
        </div>
        <div className="flex flex-wrap items-end gap-2 border-t border-line px-4 py-3">
          <Field label="Add a custom relationship type" hint="Define your own directed type — it becomes available above and in bulk import." className="min-w-[16rem] flex-1">
            <TextInput value={newType} onChange={(e) => setNewType(e.target.value)} placeholder="e.g. exacerbated_by" onKeyDown={(e) => { if (e.key === 'Enter') addCustomType() }} />
          </Field>
          <Button variant="secondary" iconLeft={Tag} onClick={addCustomType} disabled={!newType.trim()}>Add type</Button>
          {customTypes.length > 0 && (
            <div className="flex w-full flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-ink-3">Custom:</span>
              {customTypes.map((ct) => (
                <span key={ct} className="inline-flex items-center gap-1 rounded-full border border-accent-line bg-accent-tint py-0.5 pe-1.5 ps-2.5 text-[11.5px] font-medium text-accent-strong">
                  {ct}
                  <button onClick={() => setCustomTypes((cur) => cur.filter((x) => x !== ct))} aria-label={`Remove ${ct}`} className="text-accent/70 hover:text-accent"><Icon icon={Trash2} size={11} /></button>
                </span>
              ))}
            </div>
          )}
        </div>
      </Panel>

      {/* Relationship list */}
      <Panel>
        <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface-2/45 px-4 py-3">
          <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search relationships…" className="w-72" />
          <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-52">
            <option value="all">All types</option>
            {allTypes.map((rt) => <option key={rt} value={rt}>{rt}</option>)}
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
                <li>Add a 4th token <code className="rounded bg-inset px-1 font-mono text-[11px]">both</code> to make it bidirectional (↔). Repeat a pair with a different type for multiple links.</li>
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
