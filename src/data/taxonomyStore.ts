import { usePersistentState } from '@/lib/usePersistentState'
import {
  freshCurriculumCatalog,
  curriculumSlug,
  curriculumSystemId,
  curriculumTopicId,
  curriculumSubtopicId,
  curriculumMicrotopicId,
  curriculumNanotopicId,
  type CurriculumNano,
  type CurriculumMicro,
  type CurriculumSubtopic,
  type CurriculumTopic,
  type CurriculumSystem,
} from '@/data/curriculumCatalog'

export const TAXONOMY_STORAGE_KEY = 'nishany-taxonomy-tree-v4'

export const slug = curriculumSlug

export type TaxNano = CurriculumNano
export type TaxMicro = CurriculumMicro
export type TaxSub = CurriculumSubtopic
export type TaxTopicNode = CurriculumTopic
export type TaxSysNode = CurriculumSystem

export function seedTaxonomy(): TaxSysNode[] {
  return freshCurriculumCatalog()
}

export const systemId = curriculumSystemId
export const topicIdOf = curriculumTopicId
export const subtopicIdOf = curriculumSubtopicId
export const microtopicIdOf = curriculumMicrotopicId
export const nanotopicIdOf = curriculumNanotopicId

/** Every slug ID in the tree, for uniqueness checks. */
function allTaxIds(tree: TaxSysNode[]): Set<string> {
  const set = new Set<string>()
  tree.forEach((s) => { set.add(s.id); s.topics.forEach((t) => { set.add(t.id); t.subs.forEach((su) => { set.add(su.id); su.micros.forEach((m) => { set.add(m.id); m.nanos.forEach((n) => set.add(n.id)) }) }) }) })
  return set
}
function uniqueTaxId(base: string, taken: Set<string>): string {
  let id = base; let n = 2
  while (taken.has(id)) id = `${base}-${n++}`
  return id
}

/** Rename any node by level + node id, returning a new tree. */
export function renameTaxonomyNode(tree: TaxSysNode[], level: string, nodeId: string, title: string): TaxSysNode[] {
  const t = title.trim()
  if (!t) return tree
  return tree.map((sys) => {
    if (level === 'system' && sys.id === nodeId) return { ...sys, name: t }
    return {
      ...sys,
      topics: sys.topics.map((tp) => {
        if (level === 'topic' && tp.id === nodeId) return { ...tp, title: t }
        return {
          ...tp,
          subs: tp.subs.map((su) => {
            if (level === 'subtopic' && su.id === nodeId) return { ...su, title: t }
            return {
              ...su,
              micros: su.micros.map((mi) => {
                if (level === 'microtopic' && mi.id === nodeId) return { ...mi, title: t }
                return { ...mi, nanos: mi.nanos.map((na) => (level === 'nanotopic' && na.id === nodeId ? { ...na, title: t } : na)) }
              }),
            }
          }),
        }
      }),
    }
  })
}

/** Add a topic under a system (matched by node id OR subjectId). Returns a new tree. */
export function addTaxTopic(tree: TaxSysNode[], sysKey: string, title: string): TaxSysNode[] {
  const t = title.trim(); if (!t) return tree
  const taken = allTaxIds(tree)
  const id = uniqueTaxId(slug(t), taken)
  return tree.map((sys) => (sys.id === sysKey || sys.sysId === sysKey ? { ...sys, topics: [...sys.topics, { id, title: t, tpcId: topicIdOf(id), subs: [] }] } : sys))
}

/** Add a subtopic under a topic (matched by topic node id). Returns a new tree. */
export function addTaxSub(tree: TaxSysNode[], topicNodeId: string, title: string): TaxSysNode[] {
  const t = title.trim(); if (!t) return tree
  const taken = allTaxIds(tree)
  const id = uniqueTaxId(slug(t), taken)
  return tree.map((sys) => ({
    ...sys,
    topics: sys.topics.map((tp) => (tp.id === topicNodeId ? { ...tp, subs: [...tp.subs, { id, title: t, subId: subtopicIdOf(id), micros: [] }] } : tp)),
  }))
}

/** Read the live curriculum taxonomy (Subjects & Topics), the single source. */
export function useTaxonomyTree() {
  return usePersistentState<TaxSysNode[]>(TAXONOMY_STORAGE_KEY, seedTaxonomy)
}
