/**
 * A library tree: the structure a faculty writes for one module or one year.
 *
 * The scope functions mirror `server/src/libraryTrees.js`, declared rather than
 * imported for the usual reason — that module is untyped JavaScript outside
 * `src`. `libraryTrees.test.ts` holds the two together.
 *
 * Every operation below returns a new tree and mutates nothing. The document is
 * shared state: an in-place edit is invisible to React, and unmergeable by the
 * server, which works out what a client changed by comparing documents.
 */
import { newId } from './userLibrary.ts'

export const LIBRARY_TREES_STATE_KEY = 'nishany-library-trees-v1'

export type LibraryTreeKind = 'module' | 'year'
/** `module:MOD_CVS` or `year:OMS_Y2`. The key a tree is stored under. */
export type LibraryTreeScope = string

export interface LibraryTreeNode {
  id: string
  title: string
  children?: LibraryTreeNode[]
  /** Articles filed here. Ids — the article itself lives once. */
  articleIds?: string[]
}

export interface LibraryTreesDocument {
  trees: Record<LibraryTreeScope, LibraryTreeNode[]>
}

const KINDS: LibraryTreeKind[] = ['module', 'year']

export function emptyLibraryTrees(): LibraryTreesDocument {
  return { trees: {} }
}

export function treeScope(kind: LibraryTreeKind, id: string): LibraryTreeScope {
  return `${kind}:${id}`
}

export function parseTreeScope(key: unknown): { kind: LibraryTreeKind; id: string } | null {
  if (typeof key !== 'string') return null
  const separator = key.indexOf(':')
  if (separator < 1) return null
  const kind = key.slice(0, separator) as LibraryTreeKind
  const id = key.slice(separator + 1)
  if (!KINDS.includes(kind) || !id) return null
  return { kind, id }
}

export function newNodeId(): string {
  return newId('ltn')
}

/** The node with this id, at any depth, or null. */
export function findNode(nodes: LibraryTreeNode[], id: string): LibraryTreeNode | null {
  for (const node of nodes) {
    if (node.id === id) return node
    const found = node.children ? findNode(node.children, id) : null
    if (found) return found
  }
  return null
}

/** Rebuild the tree, replacing whichever node matches. */
function mapNodes(
  nodes: LibraryTreeNode[],
  transform: (node: LibraryTreeNode) => LibraryTreeNode,
): LibraryTreeNode[] {
  return nodes.map((node) => {
    const mapped = transform(node)
    return mapped.children ? { ...mapped, children: mapNodes(mapped.children, transform) } : mapped
  })
}

/**
 * Add a node at the root, or beneath any node at any depth.
 *
 * No schema says what a level means, so five deep is as valid as two — a
 * constraint on depth is the thing this exists to remove.
 */
export function addNode(nodes: LibraryTreeNode[], parentId: string | null, title: string): LibraryTreeNode[] {
  const created: LibraryTreeNode = { id: newNodeId(), title }
  if (!parentId) return [...nodes, created]
  return mapNodes(nodes, (node) =>
    node.id === parentId ? { ...node, children: [...(node.children ?? []), created] } : node)
}

export function renameNode(nodes: LibraryTreeNode[], id: string, title: string): LibraryTreeNode[] {
  return mapNodes(nodes, (node) => (node.id === id ? { ...node, title } : node))
}

/** Remove a node and everything beneath it. The articles themselves are not touched. */
export function removeNode(nodes: LibraryTreeNode[], id: string): LibraryTreeNode[] {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => (node.children ? { ...node, children: removeNode(node.children, id) } : node))
}

/**
 * Move a node among its siblings.
 *
 * Never across parents: reordering and reparenting look alike and are not, and
 * a control that quietly does the second is how a subtree ends up somewhere
 * nobody chose. Past either end is a no-op rather than an error.
 */
export function moveNode(nodes: LibraryTreeNode[], id: string, direction: 'up' | 'down'): LibraryTreeNode[] {
  const index = nodes.findIndex((node) => node.id === id)
  if (index >= 0) {
    const target = direction === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= nodes.length) return nodes
    const reordered = [...nodes]
    const [moved] = reordered.splice(index, 1)
    reordered.splice(target, 0, moved)
    return reordered
  }
  return nodes.map((node) =>
    node.children ? { ...node, children: moveNode(node.children, id, direction) } : node)
}

/** File an article at a node. Filing the same one twice changes nothing. */
export function fileArticle(nodes: LibraryTreeNode[], nodeId: string, articleId: string): LibraryTreeNode[] {
  return mapNodes(nodes, (node) => {
    if (node.id !== nodeId) return node
    const filed = node.articleIds ?? []
    return filed.includes(articleId) ? node : { ...node, articleIds: [...filed, articleId] }
  })
}

export function unfileArticle(nodes: LibraryTreeNode[], nodeId: string, articleId: string): LibraryTreeNode[] {
  return mapNodes(nodes, (node) =>
    node.id === nodeId
      ? { ...node, articleIds: (node.articleIds ?? []).filter((candidate) => candidate !== articleId) }
      : node)
}

/**
 * How much sits beneath a node, for a delete that says so first.
 *
 * A tree is a placement, and removing one must not read as removing content —
 * so the count is stated, and stated alongside the fact that the articles
 * survive.
 */
export function countBeneath(node: LibraryTreeNode): { nodes: number; articles: number } {
  let count = { nodes: 0, articles: (node.articleIds ?? []).length }
  for (const child of node.children ?? []) {
    const beneath = countBeneath(child)
    count = { nodes: count.nodes + 1 + beneath.nodes, articles: count.articles + beneath.articles }
  }
  return count
}

/** Every article filed anywhere in this tree, once each. */
export function allArticleIds(nodes: LibraryTreeNode[]): string[] {
  const seen = new Set<string>()
  const walk = (list: LibraryTreeNode[]) => {
    for (const node of list) {
      for (const id of node.articleIds ?? []) seen.add(id)
      if (node.children) walk(node.children)
    }
  }
  walk(nodes)
  return [...seen]
}
