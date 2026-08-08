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

/** Read the live curriculum taxonomy (Subjects & Topics), the single source. */
export function useTaxonomyTree() {
  return usePersistentState<TaxSysNode[]>(TAXONOMY_STORAGE_KEY, seedTaxonomy)
}
