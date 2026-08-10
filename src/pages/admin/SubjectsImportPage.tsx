import { ImportWizard, type ImportField } from '@/components/admin/ImportWizard'
import {
  useTaxonomyTree, slug, systemId, topicIdOf, subtopicIdOf, microtopicIdOf, nanotopicIdOf,
  type TaxSysNode,
} from '@/data/taxonomyStore'

const FIELDS: ImportField[] = [
  { key: 'system', label: 'System', required: true, help: 'Top-level system (e.g. Cardiovascular). Reused if it already exists.' },
  { key: 'topic', label: 'Topic', help: 'Topic under the system.' },
  { key: 'subtopic', label: 'Subtopic', help: 'Subtopic under the topic.' },
  { key: 'microtopic', label: 'Microtopic', help: 'Microtopic under the subtopic.' },
  { key: 'nanotopic', label: 'Nanotopic', help: 'Nanotopic under the microtopic.' },
]

const MD = `# Item\n## system\nImmunology\n## topic\nHypersensitivity\n## subtopic\nType I hypersensitivity\n## microtopic\nMast cell degranulation\n## nanotopic\nIgE cross-linking\n\n---\n\n# Item\n## system\nImmunology\n## topic\nAutoimmunity\n## subtopic\nTolerance mechanisms`

function allIds(tree: TaxSysNode[]): Set<string> {
  const set = new Set<string>()
  tree.forEach((s) => { set.add(s.id); s.topics.forEach((t) => { set.add(t.id); t.subs.forEach((su) => { set.add(su.id); su.micros.forEach((m) => { set.add(m.id); m.nanos.forEach((n) => set.add(n.id)) }) }) }) })
  return set
}

export function SubjectsImportPage() {
  const [tree, setTree] = useTaxonomyTree()

  function commit(rows: Array<Record<string, string>>) {
    const errors: string[] = []
    let systems = 0, topics = 0, subs = 0, micros = 0, nanos = 0
    const draft: TaxSysNode[] = structuredClone(tree)
    const taken = allIds(draft)
    const uid = (base: string) => { let id = base, n = 2; while (taken.has(id)) id = `${base}-${n++}`; taken.add(id); return id }
    const byName = <T extends { title?: string; name?: string }>(arr: T[], name: string) =>
      arr.find((x) => (x.title ?? x.name ?? '').toLowerCase() === name.toLowerCase())

    rows.forEach((v, i) => {
      const sysName = v.system?.trim()
      if (!sysName) { errors.push(`Row ${i + 2}: system is required.`); return }
      let sys = draft.find((s) => s.name.toLowerCase() === sysName.toLowerCase())
      if (!sys) {
        const id = uid(slug(sysName))
        const created: TaxSysNode = { id, name: sysName, short: sysName.slice(0, 3).toUpperCase(), color: '#8a938f', sysId: systemId(id), topics: [] }
        sys = created; draft.push(created); systems++
      }

      if (!v.topic?.trim()) return
      let top = byName(sys.topics, v.topic.trim())
      if (!top) { const id = uid(slug(v.topic.trim())); top = { id, title: v.topic.trim(), tpcId: topicIdOf(id), subs: [] }; sys.topics.push(top); topics++ }

      if (!v.subtopic?.trim()) return
      let sub = byName(top.subs, v.subtopic.trim())
      if (!sub) { const id = uid(slug(v.subtopic.trim())); sub = { id, title: v.subtopic.trim(), subId: subtopicIdOf(id), micros: [] }; top.subs.push(sub); subs++ }

      if (!v.microtopic?.trim()) return
      let mic = byName(sub.micros, v.microtopic.trim())
      if (!mic) { const id = uid(slug(v.microtopic.trim())); mic = { id, title: v.microtopic.trim(), micId: microtopicIdOf(id), nanos: [] }; sub.micros.push(mic); micros++ }

      if (!v.nanotopic?.trim()) return
      if (!byName(mic.nanos, v.nanotopic.trim())) { const id = uid(slug(v.nanotopic.trim())); mic.nanos.push({ id, title: v.nanotopic.trim(), nanId: nanotopicIdOf(id) }); nanos++ }
    })

    setTree(draft)
    const imported = systems + topics + subs + micros + nanos
    return { imported, failed: errors.length, errors: [...errors, `Added ${systems} systems · ${topics} topics · ${subs} subtopics · ${micros} microtopics · ${nanos} nanotopics`].filter(Boolean) }
  }

  return (
    <ImportWizard
      title="Bulk import Subjects & Topics"
      description="Open a spreadsheet, CSV, or Markdown file; map every column, preview each row, then merge into the single-source taxonomy. Existing names are reused; new nodes get unique IDs."
      noun="taxonomy nodes"
      fields={FIELDS}
      markdownExample={MD}
      aliases={{ subject: 'system', chapter: 'topic', sub_topic: 'subtopic', micro: 'microtopic', nano: 'nanotopic' }}
      previewSecondary={{ header: 'Path', get: (v) => [v.system, v.topic, v.subtopic, v.microtopic, v.nanotopic].filter(Boolean).join(' › ') || '—' }}
      validateRow={(v) => (v.system?.trim() ? [] : ['System is required'])}
      commit={commit}
      backTo="/admin/taxonomy"
      backLabel="Back to Subjects & Topics"
    />
  )
}
