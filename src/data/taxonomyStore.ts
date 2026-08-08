import { usePersistentState } from '@/lib/usePersistentState'
import { taxonomyTree, systemId, topicIdOf, subtopicIdOf, microtopicIdOf, nanotopicIdOf } from '@/data/taxonomy'

export const TAXONOMY_STORAGE_KEY = 'synapse-taxonomy-tree-v3'

export const slug = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'item'

export interface TaxNano { id: string; title: string; nanId: string }
export interface TaxMicro { id: string; title: string; micId: string; nanos: TaxNano[] }
export interface TaxSub { id: string; title: string; subId: string; micros: TaxMicro[] }
export interface TaxTopicNode { id: string; title: string; tpcId: string; subs: TaxSub[] }
export interface TaxSysNode { id: string; name: string; short: string; sysId: string; topics: TaxTopicNode[] }

/** A few demo microtopics (with nanotopics) so every level is populated. */
const DEMO_MICROS: Record<string, Record<string, string[]>> = {
  'hf-patho': { 'Frank–Starling curve': ['Preload reserve', 'Length–tension relationship'], 'Neurohormonal activation': [] },
  'acs-dx': { 'ECG territories': ['Inferior leads (II, III, aVF)'], 'Troponin kinetics': [] },
  'asthma-patho': { 'Type-2 inflammation': [] },
  'diur-sites': { 'Nephron transporters': [] },
}

export function seedTaxonomy(): TaxSysNode[] {
  return taxonomyTree().map((s) => ({
    id: s.id, name: s.name, short: s.short, sysId: s.sysId,
    topics: s.topics.map((t) => ({
      id: t.id, title: t.title, tpcId: t.tpcId,
      subs: t.subtopics.map((st) => ({
        id: st.id, title: st.title, subId: st.subId,
        micros: Object.entries(DEMO_MICROS[st.id] ?? {}).map(([m, nanos]) => ({
          id: slug(m), title: m, micId: microtopicIdOf(slug(m)),
          nanos: nanos.map((n) => ({ id: slug(n), title: n, nanId: nanotopicIdOf(slug(n)) })),
        })),
      })),
    })),
  }))
}

export { systemId, topicIdOf, subtopicIdOf, microtopicIdOf, nanotopicIdOf }

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
