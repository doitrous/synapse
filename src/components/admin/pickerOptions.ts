import type { PickerOption } from '@/components/admin/EntityPicker'
import { buildConceptTree, type TreeNode } from '@/components/admin/ConceptNavigator'
import type { ConceptGraph } from '@/data/conceptGraph'
import type { ContentKind, ManagedContentItem } from '@/data/contentControl'
import type { MedicalTaxonomyNode } from '@/data/medicalLibraryTaxonomy'
import type { TaxSysNode } from '@/data/taxonomyStore'
import { defaultModuleId, type University } from '@/data/universities'
import { getSubject, subjects } from '@/data/subjects'

/**
 * Option lists for `EntityPicker`, one builder per kind of thing.
 *
 * These live apart from the pickers so an editor passes data rather than layout,
 * and so the grouping rules are written once. Every builder returns options in the
 * order they should be read: the picker groups by `group` but never re-sorts.
 */

/**
 * The heading a concept sits under.
 *
 * A full lineage reads "Cardiovascular System → Cardiovascular investigations and
 * procedures → Procedures → Catheterization", which is unusable as a heading, so
 * deep paths keep only where they start and where they end.
 */
function chapterLabel(path: string[]): string {
  if (path.length <= 2) return path.join(' › ')
  return `${path[0]} › ${path[path.length - 1]}`
}

/**
 * Every concept, grouped by its chapter.
 *
 * Placement is the same question the Concepts rail already answers — canonical
 * lineage where a concept has one, the legacy subject → topic → … path otherwise —
 * so this reuses `buildConceptTree` rather than inventing a second set of rules
 * that would drift from it.
 */
export function conceptOptions({
  graph,
  taxonomy,
  medicalTaxonomy,
}: {
  graph: ConceptGraph
  taxonomy: TaxSysNode[]
  medicalTaxonomy: MedicalTaxonomyNode[]
}): PickerOption[] {
  const tree = buildConceptTree({ concepts: graph.concepts, taxonomy, medicalTaxonomy, query: '', division: 'all' })
  const out: PickerOption[] = []
  const walk = (node: TreeNode, trail: string[]) => {
    const path = [...trail, node.label]
    const group = chapterLabel(path)
    node.concepts.forEach((concept) => out.push({
      id: concept.id,
      label: concept.label,
      sublabel: concept.id,
      group,
      keywords: `${concept.aliases.join(' ')} ${concept.definition}`,
    }))
    node.children.forEach((child) => walk(child, path))
  }
  tree.forEach((root) => walk(root, []))
  return out
}

/** Content of one kind, grouped by subject then chapter. */
export function contentOptions(
  items: ManagedContentItem[],
  kind: ContentKind,
  { exclude }: { exclude?: string } = {},
): PickerOption[] {
  const order = new Map(subjects.map((subject, index) => [subject.id, index]))
  return items
    .filter((item) => item.kind === kind && item.id !== exclude)
    .sort((a, b) => {
      const bySubject = (order.get(a.subjectId) ?? 99) - (order.get(b.subjectId) ?? 99)
      if (bySubject !== 0) return bySubject
      return (a.fields.Topic ?? '').localeCompare(b.fields.Topic ?? '')
    })
    .map((item) => ({
      id: item.id,
      label: item.title,
      sublabel: item.status === 'Published' ? undefined : item.status,
      group: `${getSubject(item.subjectId).short} › ${item.fields.Topic || 'Unfiled'}`,
      keywords: Object.values(item.fields).join(' '),
    }))
}

/** Every module in the catalogue, grouped by university and year. */
export function moduleOptions(catalogue: University[]): PickerOption[] {
  return catalogue.flatMap((university) =>
    university.years.flatMap((year) =>
      year.courses.map((course, index) => ({
        id: course.moduleId ?? defaultModuleId(course.name, index + 1),
        label: course.name,
        sublabel: course.moduleId ?? defaultModuleId(course.name, index + 1),
        group: `${university.short} › ${year.year}`,
        keywords: `${course.block} ${course.term ?? ''} ${university.name}`,
      })),
    ),
  )
}

/** Canonical library placements, grouped by division. */
export function taxonomyNodeOptions(nodes: MedicalTaxonomyNode[]): PickerOption[] {
  return nodes.map((node) => ({
    id: node.id,
    label: node.title,
    sublabel: node.id,
    group: `${node.divisionLabel} › ${node.root}`,
    keywords: `${node.topic ?? ''} ${node.subtopic ?? ''} ${node.microtopic ?? ''} ${node.level}`,
  }))
}

/**
 * Chapter names already in use, grouped by subject.
 *
 * Chapters are free strings rather than records, so the option list is whatever has
 * been written before — which is the point: it stops the fifth spelling of one chapter.
 */
export function chapterOptions(items: ManagedContentItem[]): PickerOption[] {
  const seen = new Map<string, string>()
  items.forEach((item) => {
    const chapters = [item.fields.Chapter, ...(item.resourceData?.chapters ?? [])]
    chapters.filter(Boolean).forEach((chapter) => {
      if (!seen.has(chapter!)) seen.set(chapter!, item.subjectId)
    })
  })
  return [...seen.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([chapter, subjectId]) => ({ id: chapter, label: chapter, group: getSubject(subjectId).short }))
}
