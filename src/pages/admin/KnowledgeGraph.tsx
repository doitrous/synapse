import { useSearchParams } from 'react-router-dom'
import { Braces, GitFork } from 'lucide-react'
import { Tabs } from '@/components/ui/Tabs'
import { ConceptsSetup } from './ConceptsSetup'
import { RelationshipsSetup } from './RelationshipsSetup'

/**
 * Concepts and Relationships are two editors over one document
 * (`nishany-concept-graph-v2`): the nodes and the edges of the same graph.
 * They were two sidebar tabs; this is the one tab that holds both, switched by
 * `?view=` so the old `/admin/concepts` and `/admin/relationships` links land
 * on the right editor. Each editor keeps its own page header and toolbar.
 */
export function KnowledgeGraph() {
  const [params, setParams] = useSearchParams()
  const view = params.get('view') === 'relationships' ? 'relationships' : 'concepts'
  return (
    <div>
      <div className="border-b border-line bg-surface px-5 py-2.5">
        <Tabs
          items={[
            { value: 'concepts', label: 'Concepts', icon: Braces },
            { value: 'relationships', label: 'Relationships', icon: GitFork },
          ]}
          value={view}
          onChange={(v) => setParams(v === 'concepts' ? {} : { view: v }, { replace: true })}
        />
      </div>
      {view === 'relationships' ? <RelationshipsSetup /> : <ConceptsSetup />}
    </div>
  )
}
