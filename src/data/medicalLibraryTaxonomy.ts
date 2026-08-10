import { MEDICAL_TAXONOMY_ROWS } from './medicalLibraryTaxonomy.generated.ts'
import { MEDICAL_TAXONOMY_ADDITIONS, MEDICAL_TAXONOMY_TITLE_OVERRIDES, REDUNDANT_DISCIPLINE_FACETS } from './medicalLibraryTaxonomyCorrections.ts'

export type MedicalTaxonomyDivision = 'system' | 'discipline' | 'skills' | 'knowledge'
export type MedicalTaxonomyPriority = 'Core' | 'Extended' | string

export interface MedicalTaxonomyNode {
  id: string
  parentId: string | null
  division: MedicalTaxonomyDivision
  divisionLabel: string
  level: string
  title: string
  root: string
  topic?: string
  subtopic?: string
  microtopic?: string
  role: string
  templateId?: string
  slots: string[]
  priority: MedicalTaxonomyPriority
  note?: string
  depth: number
}

export interface MedicalTaxonomyDivisionDefinition {
  id: MedicalTaxonomyDivision
  label: string
  shortLabel: string
  description: string
  rootLabel: string
}

export const MEDICAL_TAXONOMY_STORAGE_KEY = 'synapse-medical-library-taxonomy-v1'

export const MEDICAL_TAXONOMY_DIVISIONS: MedicalTaxonomyDivisionDefinition[] = [
  { id: 'system', label: 'Systems & General', shortLabel: 'Systems & General', description: 'Learn through organ systems, foundations, life stages, infection, emergencies, and population health.', rootLabel: 'System or domain' },
  { id: 'discipline', label: 'By Discipline', shortLabel: 'Disciplines', description: 'Move across anatomy, physiology, pathology, pharmacology, clinical specialties, and supporting sciences.', rootLabel: 'Discipline' },
  { id: 'skills', label: 'Clinical Skills', shortLabel: 'Skills', description: 'Find history, examination, communication, procedures, prescribing, and clinical reasoning skills.', rootLabel: 'Domain' },
  { id: 'knowledge', label: 'Clinical Knowledge', shortLabel: 'Knowledge', description: 'Start from presentations, conditions, investigations, management, emergencies, and guidelines.', rootLabel: 'Domain' },
]

const DIVISION_BY_LABEL: Record<string, MedicalTaxonomyDivision> = {
  'By System': 'system',
  'By Discipline': 'discipline',
  'Clinical Skills': 'skills',
  'Clinical Knowledge': 'knowledge',
}

function nodeTitle(level: string, root: string, topic: string, subtopic: string, microtopic: string): string {
  if (level === 'System' || level === 'Discipline' || level === 'Domain') return root
  if (level === 'Topic') return topic
  if (level === 'Subtopic') return subtopic
  return microtopic || subtopic || topic || root
}

function buildSeed(): MedicalTaxonomyNode[] {
  const imported = MEDICAL_TAXONOMY_ROWS.map((row) => ({
    id: row[0],
    parentId: row[1].startsWith('ROOT-') ? null : row[1],
    division: DIVISION_BY_LABEL[row[2]],
    divisionLabel: row[2],
    level: row[3],
    title: MEDICAL_TAXONOMY_TITLE_OVERRIDES[row[0]] ?? nodeTitle(row[3], row[4], row[5], row[6], row[7]),
    root: row[4],
    topic: row[5] || undefined,
    subtopic: row[6] || undefined,
    microtopic: row[7] || undefined,
    role: row[8],
    templateId: row[9] || undefined,
    slots: row[10] ? row[10].split(';').map((value) => value.trim()).filter(Boolean) : [],
    priority: row[11],
    note: row[12] || undefined,
    depth: 0,
  }))
  const raw = [
    ...imported.filter((node) => !(node.division === 'discipline' && node.level === 'Subtopic' && REDUNDANT_DISCIPLINE_FACETS.has(node.title)) && !node.id.startsWith('KNW-CON-')),
    ...MEDICAL_TAXONOMY_ADDITIONS.map((node) => ({ ...node, depth: 0 })),
  ] as MedicalTaxonomyNode[]
  const byId = new Map(raw.map((node) => [node.id, node]))
  const depthOf = (node: typeof raw[number]): number => {
    let depth = 0
    let parentId = node.parentId
    const visited = new Set<string>()
    while (parentId) {
      if (visited.has(parentId)) throw new Error(`Medical taxonomy cycle at ${node.id}`)
      visited.add(parentId)
      depth += 1
      parentId = byId.get(parentId)?.parentId ?? null
    }
    return depth
  }
  return raw.map((node) => ({ ...node, depth: depthOf(node) }))
}

export const MEDICAL_TAXONOMY_SEED: MedicalTaxonomyNode[] = buildSeed()

export const MEDICAL_TAXONOMY_COUNTS = Object.freeze({
  nodes: MEDICAL_TAXONOMY_SEED.length,
  system: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'system').length,
  discipline: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'discipline').length,
  skills: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'skills').length,
  knowledge: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'knowledge').length,
  systemRoots: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'system' && node.parentId === null).length,
  disciplineRoots: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'discipline' && node.parentId === null).length,
  skillsRoots: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'skills' && node.parentId === null).length,
  knowledgeRoots: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'knowledge' && node.parentId === null).length,
})

export function freshMedicalTaxonomy(): MedicalTaxonomyNode[] {
  return MEDICAL_TAXONOMY_SEED.map((node) => ({ ...node, slots: [...node.slots] }))
}

export function indexMedicalTaxonomy(nodes: MedicalTaxonomyNode[]) {
  const byId = new Map<string, MedicalTaxonomyNode>()
  const childrenByParent = new Map<string | null, MedicalTaxonomyNode[]>()
  for (const node of nodes) {
    byId.set(node.id, node)
    const children = childrenByParent.get(node.parentId) ?? []
    children.push(node)
    childrenByParent.set(node.parentId, children)
  }
  return {
    byId,
    childrenByParent,
    roots: (division: MedicalTaxonomyDivision) => (childrenByParent.get(null) ?? []).filter((node) => node.division === division),
    children: (parentId: string) => childrenByParent.get(parentId) ?? [],
    lineage: (nodeId: string) => {
      const lineage: MedicalTaxonomyNode[] = []
      let current = byId.get(nodeId)
      const visited = new Set<string>()
      while (current && !visited.has(current.id)) {
        lineage.unshift(current)
        visited.add(current.id)
        current = current.parentId ? byId.get(current.parentId) : undefined
      }
      return lineage
    },
  }
}

export const MEDICAL_TAXONOMY_INDEX = indexMedicalTaxonomy(MEDICAL_TAXONOMY_SEED)

export function searchMedicalTaxonomy(nodes: MedicalTaxonomyNode[], query: string, division?: MedicalTaxonomyDivision): MedicalTaxonomyNode[] {
  const normalized = query.trim().toLocaleLowerCase()
  if (!normalized) return []
  return nodes.filter((node) => {
    if (division && node.division !== division) return false
    return `${node.title} ${node.root} ${node.topic ?? ''} ${node.subtopic ?? ''} ${node.microtopic ?? ''} ${node.id}`.toLocaleLowerCase().includes(normalized)
  })
}
