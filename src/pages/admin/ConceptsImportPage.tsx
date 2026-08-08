import { ImportWizard, type ImportField } from '@/components/admin/ImportWizard'
import { usePersistentState } from '@/lib/usePersistentState'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type Concept, type ConceptGraph } from '@/data/conceptGraph'
import { useTaxonomyTree } from '@/data/taxonomyStore'
import { subjects } from '@/data/student'

const slug = (v: string) => v.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'concept'
const num01 = (v?: string) => { const n = Number(v); return Number.isFinite(n) && v?.trim() ? Math.min(1, Math.max(0, n)) : undefined }
const list = (v?: string) => (v ?? '').split(/[\n,;|]/).map((x) => x.trim()).filter(Boolean)

const FIELDS: ImportField[] = [
  { key: 'label', label: 'Concept name', required: true, help: 'The concept label students see.' },
  { key: 'id', label: 'Canonical ID', help: 'Optional; auto-derived from the label if omitted.' },
  { key: 'subject', label: 'System / subject ID', help: 'e.g. cvs, resp, renal — from Subjects & Topics.' },
  { key: 'topic', label: 'Topic', help: 'Topic title or TPC_ ID from Subjects & Topics.' },
  { key: 'subtopic', label: 'Subtopic', help: 'Subtopic title or SUB_ ID.' },
  { key: 'microtopic', label: 'Microtopic', help: 'Microtopic title or MIC_ ID.' },
  { key: 'nanotopic', label: 'Nanotopic', help: 'Nanotopic title or NAN_ ID.' },
  { key: 'definition', label: 'Definition', help: 'Shown after the answer is revealed.' },
  { key: 'pitfalls', label: 'Common pitfall', help: 'A trap shown as a warning.' },
  { key: 'aliases', label: 'Aliases', help: 'Comma/line separated alternate terms.' },
  { key: 'status', label: 'Status', help: 'active, under review, or inactive.' },
  { key: 'blueprint_weight', label: 'Blueprint weight (0–1)' },
  { key: 'clinical_relevance', label: 'Clinical relevance (0–1)' },
  { key: 'academic_relevance', label: 'Academic relevance (0–1)' },
  { key: 'exam_weight_by_year', label: 'Exam weight by year', help: 'e.g. OMS_Y2=0.7 | OMS_Y3=0.5' },
]

const MD = `# Item\n## label\nAnion gap\n## subject\nrenal\n## topic\nAcid–base balance\n## subtopic\nMetabolic acidosis\n## definition\nThe calculated difference between measured serum cations and anions.\n## pitfalls\nForgetting to calculate it in every metabolic acidosis.\n## aliases\nAG\n## status\nactive\n## blueprint_weight\n0.6\n## clinical_relevance\n0.7\n## academic_relevance\n0.8\n## exam_weight_by_year\nOMS_Y2=0.6 | OMS_Y3=0.4`

function parseWeights(v?: string): Record<string, number> | undefined {
  const entries = list(v).map((e) => e.split('=').map((s) => s.trim())).filter(([k, w]) => k && w)
  if (!entries.length) return undefined
  return Object.fromEntries(entries.map(([k, w]) => [k, Math.min(1, Math.max(0, Number(w) || 0))]))
}

export function ConceptsImportPage() {
  const [graph, setGraph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [taxonomy] = useTaxonomyTree()

  /** Resolve taxonomy placement (visible IDs) from subject + free-text titles/ids. */
  function placement(subjectId: string, values: Record<string, string>): Partial<Concept> {
    const sys = taxonomy.find((s) => s.id === subjectId || s.short.toLowerCase() === subjectId.toLowerCase())
    if (!sys) return { subjectId: subjectId || undefined }
    const findBy = <T extends { title: string }>(arr: T[], q: string, idKey: (t: T) => string) => {
      if (!q) return undefined
      return arr.find((t) => t.title.toLowerCase() === q.toLowerCase() || idKey(t).toLowerCase() === q.toLowerCase())
    }
    const top = findBy(sys.topics, values.topic, (t) => t.tpcId)
    const sub = top && findBy(top.subs, values.subtopic, (s) => s.subId)
    const mic = sub && findBy(sub.micros, values.microtopic, (m) => m.micId)
    const nan = mic && findBy(mic.nanos, values.nanotopic, (n) => n.nanId)
    return {
      subjectId: sys.id, systemId: sys.sysId,
      topicTagId: top?.tpcId, subtopicId: sub?.subId, microtopicId: mic?.micId, nanotopicId: nan?.nanId,
    }
  }

  function commit(rows: Array<Record<string, string>>) {
    const errors: string[] = []
    const existing = new Set(graph.concepts.map((c) => c.id))
    const additions: Concept[] = []
    rows.forEach((v, i) => {
      const label = v.label?.trim()
      if (!label) { errors.push(`Row ${i + 2}: missing concept name.`); return }
      const id = v.id?.trim() || `med.concept.${slug(label)}`
      if (existing.has(id) || additions.some((a) => a.id === id)) { errors.push(`Row ${i + 2}: duplicate id ${id}.`); return }
      const status = (['active', 'inactive', 'under review'].includes(v.status?.trim()) ? v.status.trim() : 'active') as Concept['status']
      additions.push({
        id, label,
        aliases: list(v.aliases),
        definition: v.definition?.trim() ?? '',
        pitfalls: v.pitfalls?.trim() || undefined,
        status,
        articleIds: [],
        blueprintWeight: num01(v.blueprint_weight),
        clinicalRelevance: num01(v.clinical_relevance),
        academicRelevance: num01(v.academic_relevance),
        examWeightByYear: parseWeights(v.exam_weight_by_year),
        ...placement(v.subject?.trim() ?? '', v),
      })
    })
    if (additions.length) setGraph((g) => ({ ...g, concepts: [...additions, ...g.concepts] }))
    return { imported: additions.length, failed: errors.length, errors }
  }

  return (
    <ImportWizard
      title="Bulk import concepts"
      description="Open a spreadsheet, CSV, or Markdown file; map every column, preview each row, then commit. Curriculum placement resolves against Subjects & Topics."
      noun="concepts"
      fields={FIELDS}
      markdownExample={MD}
      aliases={{ name: 'label', concept: 'label', system: 'subject', subject_id: 'subject' }}
      previewSecondary={{ header: 'System', get: (v) => v.subject || (subjects.find((s) => s.id === v.subject)?.name ?? '—') }}
      validateRow={(v) => (v.label?.trim() ? [] : ['Concept name is required'])}
      commit={commit}
      backTo="/admin/concepts"
      backLabel="Back to concepts"
    />
  )
}
