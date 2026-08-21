import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, FolderTree, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Select, TextInput } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { EntityPicker } from '@/components/admin/EntityPicker'
import { contentOptions } from '@/components/admin/pickerOptions'
import { usePersistentState } from '@/lib/usePersistentState'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { useIdentity } from '@/lib/useIdentity'
import { defaultModuleId } from '@/data/universities'
import {
  CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem,
} from '@/data/contentControl'
import {
  LIBRARY_TREES_STATE_KEY, addNode, countBeneath, emptyLibraryTrees, fileArticle, moveNode,
  removeNode, renameNode, treeScope, unfileArticle,
  type LibraryTreeKind, type LibraryTreeNode, type LibraryTreesDocument,
} from '@/data/libraryTrees'

interface ScopeChoice { key: string; kind: LibraryTreeKind; label: string; group: string }

/**
 * The structure a faculty writes for one module or one year.
 *
 * Nothing here resolves against the generated taxonomy: a node called "Anatomy"
 * in a module's tree has no relationship to the Anatomy division node, and is
 * not meant to. That independence is the point — the generated tree describes
 * medicine, and this one describes how a department teaches it.
 */
export function LibraryTreeEditor() {
  const [document, setDocument] = usePersistentState<LibraryTreesDocument>(LIBRARY_TREES_STATE_KEY, emptyLibraryTrees)
  const [catalogue] = useUniversityCatalogue()
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const identity = useIdentity()
  const [scopeKey, setScopeKey] = useState('')
  const [adding, setAdding] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState('')

  const articlePicks = useMemo(() => contentOptions(ledger, 'article'), [ledger])
  const articleTitles = useMemo(
    () => new Map(ledger.filter((item) => item.kind === 'article').map((item) => [item.id, item.title])),
    [ledger],
  )

  /**
   * The modules and years this person may build a structure for.
   *
   * A reviewer is offered only what they are assigned; the server refuses the
   * rest anyway, and offering a choice that will be refused is a worse way to
   * learn your scope than not being offered it.
   */
  const scopes = useMemo<ScopeChoice[]>(() => {
    const allowedModules = identity.contentScope?.moduleIds
    const allowedYears = identity.contentScope?.yearIds
    const out: ScopeChoice[] = []
    catalogue.forEach((university) => {
      university.years.forEach((year) => {
        if (!allowedYears || allowedYears.includes(year.id)) {
          out.push({ key: treeScope('year', year.id), kind: 'year', label: year.year, group: `${university.short} · years` })
        }
        year.courses.forEach((course, index) => {
          const moduleId = course.moduleId ?? defaultModuleId(course.name, index + 1)
          if (allowedModules && !allowedModules.includes(moduleId)) return
          out.push({ key: treeScope('module', moduleId), kind: 'module', label: `${course.name} (${moduleId})`, group: `${university.short} · ${year.year}` })
        })
      })
    })
    return out
  }, [catalogue, identity.contentScope])

  const chosen = scopes.find((scope) => scope.key === scopeKey) ?? null
  const nodes = chosen ? document.trees[chosen.key] ?? null : null

  function update(next: (current: LibraryTreeNode[]) => LibraryTreeNode[]) {
    if (!chosen) return
    setDocument((current) => ({
      ...current,
      trees: { ...current.trees, [chosen.key]: next(current.trees[chosen.key] ?? []) },
    }))
  }

  function remove(node: LibraryTreeNode) {
    const beneath = countBeneath(node)
    const detail = beneath.nodes || beneath.articles
      ? `“${node.title}” holds ${beneath.nodes} node${beneath.nodes === 1 ? '' : 's'} and ${beneath.articles} filed article${beneath.articles === 1 ? '' : 's'}.\n\nDelete it? The articles themselves are not deleted — they stay in the library and in every other place they are filed.`
      : `Delete “${node.title}”?`
    // A tree is a placement. Removing one must never read as removing content.
    if (window.confirm(detail)) update((current) => removeNode(current, node.id))
  }

  return (
    <Panel className="mb-4 overflow-hidden">
      <PanelHeader
        title="Library structure"
        icon={FolderTree}
        hint={chosen ? chosen.label : `${scopes.length} module${scopes.length === 1 ? '' : 's'} and years`}
      />
      <div className="border-b border-line p-3">
        <Select value={scopeKey} onChange={(event) => setScopeKey(event.target.value)} aria-label="Which module or year">
          <option value="">Choose a module or year…</option>
          {[...new Set(scopes.map((scope) => scope.group))].map((group) => (
            <optgroup key={group} label={group}>
              {scopes.filter((scope) => scope.group === group).map((scope) => (
                <option key={scope.key} value={scope.key}>{scope.label}</option>
              ))}
            </optgroup>
          ))}
        </Select>
        {scopes.length === 0 && (
          <p className="mt-2 text-[11.5px] leading-relaxed text-ink-2">
            {identity.contentScope
              ? 'You have not been assigned any modules or years yet. Ask a super admin or an editor to widen your scope.'
              : 'No universities have been set up yet. Add them in Academic Setup first.'}
          </p>
        )}
      </div>

      {!chosen ? (
        <EmptyState
          icon={FolderTree}
          title="Choose a module or a year"
          description="Each one gets its own structure, written the way your faculty teaches it. Nothing here has to follow the Systems & Topics tree."
        />
      ) : nodes === null ? (
        <div className="p-4">
          <p className="text-[13px] font-semibold text-ink">No structure has been built for {chosen.label} yet.</p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-2">
            Start one and add whatever levels the teaching uses — subjects, topics, subtopics, or deeper. There is no
            fixed depth, and it does not have to match the Systems &amp; Topics tree.
          </p>
          <Button className="mt-2" size="sm" variant="primary" iconLeft={Plus} onClick={() => update((current) => current)}>
            Start a structure for this
          </Button>
        </div>
      ) : (
        <div className="p-3">
          <TreeLevel
            nodes={nodes}
            depth={0}
            articleTitles={articleTitles}
            articlePicks={articlePicks}
            adding={adding}
            newTitle={newTitle}
            onAdding={setAdding}
            onNewTitle={setNewTitle}
            onAdd={(parentId, title) => update((current) => addNode(current, parentId, title))}
            onRename={(id, title) => update((current) => renameNode(current, id, title))}
            onMove={(id, direction) => update((current) => moveNode(current, id, direction))}
            onRemove={remove}
            onFile={(nodeId, articleIds) => update((current) => {
              const node = nodes && findIn(nodes, nodeId)
              const before = node?.articleIds ?? []
              let next = current
              articleIds.filter((id) => !before.includes(id)).forEach((id) => { next = fileArticle(next, nodeId, id) })
              before.filter((id) => !articleIds.includes(id)).forEach((id) => { next = unfileArticle(next, nodeId, id) })
              return next
            })}
          />
          <div className="mt-3">
            {adding === 'root' ? (
              <div className="flex gap-2">
                <TextInput autoFocus value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="New top-level name" />
                <Button size="sm" variant="primary" disabled={!newTitle.trim()} onClick={() => { onAddRoot(); }}>Add</Button>
                <Button size="sm" variant="ghost" onClick={() => { setAdding(null); setNewTitle('') }}>Cancel</Button>
              </div>
            ) : (
              <Button size="sm" variant="secondary" iconLeft={Plus} onClick={() => { setAdding('root'); setNewTitle('') }}>
                Add a top-level heading
              </Button>
            )}
          </div>
        </div>
      )}
    </Panel>
  )

  function onAddRoot() {
    const title = newTitle.trim()
    if (!title) return
    update((current) => addNode(current, null, title))
    setAdding(null)
    setNewTitle('')
  }
}

function findIn(nodes: LibraryTreeNode[], id: string): LibraryTreeNode | null {
  for (const node of nodes) {
    if (node.id === id) return node
    const found = node.children ? findIn(node.children, id) : null
    if (found) return found
  }
  return null
}

/** One level of the tree, and every level beneath it. */
function TreeLevel({
  nodes, depth, articleTitles, articlePicks, adding, newTitle,
  onAdding, onNewTitle, onAdd, onRename, onMove, onRemove, onFile,
}: {
  nodes: LibraryTreeNode[]
  depth: number
  articleTitles: Map<string, string>
  articlePicks: ReturnType<typeof contentOptions>
  adding: string | null
  newTitle: string
  onAdding: (id: string | null) => void
  onNewTitle: (title: string) => void
  onAdd: (parentId: string, title: string) => void
  onRename: (id: string, title: string) => void
  onMove: (id: string, direction: 'up' | 'down') => void
  onRemove: (node: LibraryTreeNode) => void
  onFile: (nodeId: string, articleIds: string[]) => void
}) {
  return (
    <ul className={depth > 0 ? 'ms-4 border-s border-line ps-3' : ''}>
      {nodes.map((node) => (
        <li key={node.id} className="mt-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <TextInput
              aria-label={`Name of ${node.title}`}
              value={node.title}
              onChange={(event) => onRename(node.id, event.target.value)}
              className="h-8 min-w-0 flex-1 text-[12.5px] font-medium"
            />
            <button type="button" aria-label={`Move ${node.title} up`} className="grid size-8 place-items-center rounded text-ink-3 hover:bg-inset hover:text-ink" onClick={() => onMove(node.id, 'up')}>
              <Icon icon={ChevronUp} size={14} />
            </button>
            <button type="button" aria-label={`Move ${node.title} down`} className="grid size-8 place-items-center rounded text-ink-3 hover:bg-inset hover:text-ink" onClick={() => onMove(node.id, 'down')}>
              <Icon icon={ChevronDown} size={14} />
            </button>
            <button type="button" aria-label={`Add a heading under ${node.title}`} className="grid size-8 place-items-center rounded text-ink-3 hover:bg-inset hover:text-ink" onClick={() => { onAdding(node.id); onNewTitle('') }}>
              <Icon icon={Plus} size={14} />
            </button>
            <button type="button" aria-label={`Delete ${node.title}`} className="grid size-8 place-items-center rounded text-ink-3 hover:bg-inset hover:text-danger" onClick={() => onRemove(node)}>
              <Icon icon={Trash2} size={14} />
            </button>
          </div>

          <div className="ms-1 mt-1.5">
            <EntityPicker
              label="Articles filed here"
              noun="articles"
              options={articlePicks}
              selected={node.articleIds ?? []}
              onChange={(articleIds) => onFile(node.id, articleIds)}
            />
            {/* Content deleted out from under a tree is something a reviewer
                should see, not something the interface tidies away. */}
            {(node.articleIds ?? []).filter((id) => !articleTitles.has(id)).map((id) => (
              <p key={id} className="mt-1 text-[11px] text-warning">filed article no longer exists — {id}</p>
            ))}
          </div>

          {adding === node.id && (
            <div className="ms-4 mt-2 flex gap-2">
              <TextInput autoFocus value={newTitle} onChange={(event) => onNewTitle(event.target.value)} placeholder={`New heading under ${node.title}`} />
              <Button size="sm" variant="primary" disabled={!newTitle.trim()} onClick={() => { onAdd(node.id, newTitle.trim()); onAdding(null); onNewTitle('') }}>Add</Button>
              <Button size="sm" variant="ghost" onClick={() => { onAdding(null); onNewTitle('') }}>Cancel</Button>
            </div>
          )}

          {node.children && node.children.length > 0 && (
            <TreeLevel
              nodes={node.children}
              depth={depth + 1}
              articleTitles={articleTitles}
              articlePicks={articlePicks}
              adding={adding}
              newTitle={newTitle}
              onAdding={onAdding}
              onNewTitle={onNewTitle}
              onAdd={onAdd}
              onRename={onRename}
              onMove={onMove}
              onRemove={onRemove}
              onFile={onFile}
            />
          )}
        </li>
      ))}
    </ul>
  )
}
