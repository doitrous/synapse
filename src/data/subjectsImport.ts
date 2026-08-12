/**
 * The editable structural contract for Subjects & Topics.
 *
 * The old importer was a five-column title path with no IDs. It matched nodes by
 * name, so renaming one created a second node beside it instead of moving it —
 * which is exactly the duplication the 2026-08-12 de-duplication removed by
 * hand. This file adds stable IDs, upsert, the system's own metadata, and a
 * rename/move impact report that runs before anything is written.
 */

import type { CurriculumSystem, CurriculumTopic, CurriculumSubtopic, CurriculumMicro } from './curriculumCatalog.ts'
import { importList } from './importSemantics.ts'

export interface SubjectsImportField {
  key: string
  label: string
  required?: boolean
  help: string
}

export const SUBJECTS_IMPORT_FIELDS: SubjectsImportField[] = [
  { key: 'system_id', label: 'System node ID', help: 'Existing system to update, e.g. cvs. Omit to match by name or create a new one.' },
  { key: 'system', label: 'System', required: true, help: 'Top-level system name, e.g. Cardiovascular.' },
  { key: 'system_short', label: 'System short label', help: 'Two or three letters shown on badges, e.g. CVS.' },
  { key: 'system_color', label: 'System colour', help: 'Hex colour for the system badge, e.g. #b4442f.' },
  { key: 'system_cross_refs', label: 'System cross-references', help: 'Topic node IDs owned by another system that also belong here. A cross-reference is a link, never a second node.' },
  { key: 'topic_id', label: 'Topic node ID', help: 'Existing topic to update or rename. Omit to match by name or create.' },
  { key: 'topic', label: 'Topic', help: 'Topic name under the system.' },
  { key: 'topic_cross_refs', label: 'Topic cross-references', help: 'Subtopic node IDs owned elsewhere that are also relevant to this topic.' },
  { key: 'subtopic_id', label: 'Subtopic node ID', help: 'Existing subtopic to update or rename.' },
  { key: 'subtopic', label: 'Subtopic', help: 'Subtopic name under the topic.' },
  { key: 'microtopic_id', label: 'Microtopic node ID', help: 'Existing microtopic to update or rename.' },
  { key: 'microtopic', label: 'Microtopic', help: 'Microtopic name under the subtopic.' },
  { key: 'nanotopic_id', label: 'Nanotopic node ID', help: 'Existing nanotopic to update or rename.' },
  { key: 'nanotopic', label: 'Nanotopic', help: 'Nanotopic name under the microtopic.' },
]

export type NodeLevel = 'system' | 'topic' | 'subtopic' | 'microtopic' | 'nanotopic'

export interface StructuralChange {
  level: NodeLevel
  action: 'create' | 'rename' | 'move' | 'update'
  nodeId: string
  from?: string
  to?: string
  /** Where it moves to, for a move. */
  newParentId?: string
}

export interface ImpactReport {
  changes: StructuralChange[]
  /** Records referencing a node this import renames or moves. */
  affected: Array<{ nodeId: string; kind: string; recordIds: string[] }>
  errors: string[]
}

export const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[‐-―]/g, '-').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/** Every node ID in the tree, with the level it sits at. */
export function indexTree(tree: CurriculumSystem[]): Map<string, NodeLevel> {
  const index = new Map<string, NodeLevel>()
  for (const system of tree) {
    index.set(system.id, 'system')
    for (const topic of system.topics) {
      index.set(topic.id, 'topic')
      for (const subtopic of topic.subs) {
        index.set(subtopic.id, 'subtopic')
        for (const micro of subtopic.micros) {
          index.set(micro.id, 'microtopic')
          for (const nano of micro.nanos) index.set(nano.id, 'nanotopic')
        }
      }
    }
  }
  return index
}

/** Every label declared in the tree, so "one label, one home" stays enforceable. */
export function labelHomes(tree: CurriculumSystem[]): Map<string, string[]> {
  const homes = new Map<string, string[]>()
  const record = (label: string, path: string) => {
    const key = label.trim().toLocaleLowerCase()
    homes.set(key, [...(homes.get(key) ?? []), path])
  }
  for (const system of tree) {
    for (const topic of system.topics) {
      record(topic.title, `${system.id}/${topic.title}`)
      for (const subtopic of topic.subs) record(subtopic.title, `${system.id}/${topic.title}/${subtopic.title}`)
    }
  }
  return homes
}

/**
 * What records point at a node.
 *
 * A rename is safe; a move is not, because articles, concepts, questions and
 * resources address these IDs directly. The report is produced before the write
 * so the author can see the blast radius rather than discover it afterwards.
 */
export function referencesTo(
  nodeIds: string[],
  records: {
    articles?: Array<{ id: string; subtopicId?: string; microtopicId?: string; nanotopicId?: string; moduleIds?: string[] }>
    concepts?: Array<{ id: string; topicTagId?: string; subtopicId?: string; microtopicId?: string; nanotopicId?: string }>
  },
): ImpactReport['affected'] {
  const wanted = new Set(nodeIds)
  const affected: ImpactReport['affected'] = []
  for (const nodeId of nodeIds) {
    const articleIds = (records.articles ?? [])
      .filter((article) => [article.subtopicId, article.microtopicId, article.nanotopicId].includes(nodeId))
      .map((article) => article.id)
    const conceptIds = (records.concepts ?? [])
      .filter((concept) => [concept.topicTagId, concept.subtopicId, concept.microtopicId, concept.nanotopicId].includes(nodeId))
      .map((concept) => concept.id)
    if (articleIds.length) affected.push({ nodeId, kind: 'article', recordIds: articleIds })
    if (conceptIds.length) affected.push({ nodeId, kind: 'concept', recordIds: conceptIds })
  }
  return affected.filter((entry) => wanted.has(entry.nodeId))
}

interface RowContext {
  tree: CurriculumSystem[]
  taken: Set<string>
  changes: StructuralChange[]
  errors: string[]
}

const uniqueId = (base: string, taken: Set<string>) => {
  const seed = base || 'node'
  let id = seed
  let suffix = 2
  while (taken.has(id)) id = `${seed}-${suffix++}`
  taken.add(id)
  return id
}

const byName = <T extends { title?: string; name?: string }>(items: T[], name: string) =>
  items.find((item) => (item.title ?? item.name ?? '').toLowerCase() === name.toLowerCase())

/**
 * Apply one mapped row to a draft tree.
 *
 * A row that carries an ID updates that node — including renaming it. A row with
 * no ID falls back to matching by name, which is what the old importer always
 * did, so existing files keep working.
 */
export function applyRow(
  values: Record<string, string>,
  context: RowContext,
  ids: {
    systemId: (slug: string) => string
    topicId: (slug: string) => string
    subtopicId: (slug: string) => string
    microtopicId: (slug: string) => string
    nanotopicId: (slug: string) => string
  },
  rowNumber: number,
): void {
  const { tree, taken, changes, errors } = context
  const systemName = values.system?.trim()
  if (!systemName) { errors.push(`Row ${rowNumber}: system is required.`); return }

  /* ---- system ---------------------------------------------------------- */
  const systemIdGiven = values.system_id?.trim()
  let system = systemIdGiven ? tree.find((entry) => entry.id === systemIdGiven) : byName(tree, systemName)
  if (systemIdGiven && !system) { errors.push(`Row ${rowNumber}: system ID ${systemIdGiven} does not exist.`); return }
  if (!system) {
    const id = uniqueId(slugify(systemName), taken)
    system = { id, name: systemName, short: values.system_short?.trim() || systemName.slice(0, 3).toUpperCase(), color: values.system_color?.trim() || '#8a938f', sysId: ids.systemId(id), topics: [] }
    tree.push(system)
    changes.push({ level: 'system', action: 'create', nodeId: id, to: systemName })
  } else {
    if (system.name !== systemName) {
      changes.push({ level: 'system', action: 'rename', nodeId: system.id, from: system.name, to: systemName })
      system.name = systemName
    }
    if (values.system_short?.trim()) system.short = values.system_short.trim()
    if (values.system_color?.trim()) system.color = values.system_color.trim()
  }
  const systemCrossRefs = importList(values.system_cross_refs)
  if (systemCrossRefs.length) system.crossRefs = systemCrossRefs

  /* ---- topic ----------------------------------------------------------- */
  const topicName = values.topic?.trim()
  const topicIdGiven = values.topic_id?.trim()
  if (!topicName && !topicIdGiven) return
  let topic: CurriculumTopic | undefined
  if (topicIdGiven) {
    const owner = tree.find((entry) => entry.topics.some((candidate) => candidate.id === topicIdGiven))
    topic = owner?.topics.find((candidate) => candidate.id === topicIdGiven)
    if (!topic) { errors.push(`Row ${rowNumber}: topic ID ${topicIdGiven} does not exist.`); return }
    // Moving a topic between systems is a real structural change, so it is
    // reported rather than performed as a side effect of a title path.
    if (owner && owner.id !== system.id) {
      owner.topics = owner.topics.filter((candidate) => candidate.id !== topicIdGiven)
      system.topics.push(topic)
      changes.push({ level: 'topic', action: 'move', nodeId: topic.id, from: owner.id, newParentId: system.id })
    }
    if (topicName && topic.title !== topicName) {
      changes.push({ level: 'topic', action: 'rename', nodeId: topic.id, from: topic.title, to: topicName })
      topic.title = topicName
    }
  } else {
    topic = byName(system.topics, topicName!)
    if (!topic) {
      const id = uniqueId(slugify(topicName!), taken)
      topic = { id, title: topicName!, tpcId: ids.topicId(id), subs: [] }
      system.topics.push(topic)
      changes.push({ level: 'topic', action: 'create', nodeId: id, to: topicName })
    }
  }
  const topicCrossRefs = importList(values.topic_cross_refs)
  if (topicCrossRefs.length) topic.crossRefs = topicCrossRefs

  /* ---- subtopic, microtopic, nanotopic --------------------------------- */
  const subName = values.subtopic?.trim()
  const subIdGiven = values.subtopic_id?.trim()
  if (!subName && !subIdGiven) return
  let subtopic: CurriculumSubtopic | undefined = subIdGiven
    ? topic.subs.find((candidate) => candidate.id === subIdGiven)
    : byName(topic.subs, subName!)
  if (subIdGiven && !subtopic) { errors.push(`Row ${rowNumber}: subtopic ID ${subIdGiven} is not under topic ${topic.id}.`); return }
  if (!subtopic) {
    const id = uniqueId(slugify(subName!), taken)
    subtopic = { id, title: subName!, subId: ids.subtopicId(id), micros: [] }
    topic.subs.push(subtopic)
    changes.push({ level: 'subtopic', action: 'create', nodeId: id, to: subName })
  } else if (subName && subtopic.title !== subName) {
    changes.push({ level: 'subtopic', action: 'rename', nodeId: subtopic.id, from: subtopic.title, to: subName })
    subtopic.title = subName
  }

  const microName = values.microtopic?.trim()
  const microIdGiven = values.microtopic_id?.trim()
  if (!microName && !microIdGiven) return
  let micro: CurriculumMicro | undefined = microIdGiven
    ? subtopic.micros.find((candidate) => candidate.id === microIdGiven)
    : byName(subtopic.micros, microName!)
  if (microIdGiven && !micro) { errors.push(`Row ${rowNumber}: microtopic ID ${microIdGiven} is not under subtopic ${subtopic.id}.`); return }
  if (!micro) {
    const id = uniqueId(slugify(microName!), taken)
    micro = { id, title: microName!, micId: ids.microtopicId(id), nanos: [] }
    subtopic.micros.push(micro)
    changes.push({ level: 'microtopic', action: 'create', nodeId: id, to: microName })
  } else if (microName && micro.title !== microName) {
    changes.push({ level: 'microtopic', action: 'rename', nodeId: micro.id, from: micro.title, to: microName })
    micro.title = microName
  }

  const nanoName = values.nanotopic?.trim()
  const nanoIdGiven = values.nanotopic_id?.trim()
  if (!nanoName && !nanoIdGiven) return
  const nano = nanoIdGiven
    ? micro.nanos.find((candidate) => candidate.id === nanoIdGiven)
    : byName(micro.nanos, nanoName!)
  if (nanoIdGiven && !nano) { errors.push(`Row ${rowNumber}: nanotopic ID ${nanoIdGiven} is not under microtopic ${micro.id}.`); return }
  if (!nano) {
    const id = uniqueId(slugify(nanoName!), taken)
    micro.nanos.push({ id, title: nanoName!, nanId: ids.nanotopicId(id) })
    changes.push({ level: 'nanotopic', action: 'create', nodeId: id, to: nanoName })
  } else if (nanoName && nano.title !== nanoName) {
    changes.push({ level: 'nanotopic', action: 'rename', nodeId: nano.id, from: nano.title, to: nanoName })
    nano.title = nanoName
  }
}

/** Labels that would end up declared in more than one place after this import. */
export function duplicateLabelsIn(tree: CurriculumSystem[]): Array<{ label: string; paths: string[] }> {
  return [...labelHomes(tree)]
    .filter(([, paths]) => paths.length > 1)
    .map(([label, paths]) => ({ label, paths }))
}
