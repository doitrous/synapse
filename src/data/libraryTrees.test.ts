import test from 'node:test'
import assert from 'node:assert/strict'
import {
  LIBRARY_TREES_STATE_KEY, addNode, allArticleIds, countBeneath, fileArticle, findNode,
  moveNode, parseTreeScope, removeNode, renameNode, treeScope, unfileArticle,
  type LibraryTreeNode,
} from './libraryTrees.ts'
import * as server from '../../server/src/libraryTrees.js'

const tree = (): LibraryTreeNode[] => ([
  { id: 'a', title: 'Anatomy', children: [
    { id: 'a1', title: 'Upper limb', articleIds: ['art-1', 'art-2'] },
    { id: 'a2', title: 'Lower limb' },
  ] },
  { id: 'b', title: 'Physiology' },
])

test('the client and the server agree what a scope is', () => {
  assert.equal(LIBRARY_TREES_STATE_KEY, server.LIBRARY_TREES_STATE_KEY)
  assert.equal(treeScope('module', 'MOD_CVS'), server.treeScope('module', 'MOD_CVS'))
  for (const key of ['module:MOD_CVS', 'year:OMS_Y2', 'module:A:B', 'MOD_CVS', 'cohort:X', 'module:', ':X', '']) {
    assert.deepEqual(parseTreeScope(key), server.parseTreeScope(key), key)
  }
})

test('a node can be added at the root or under any node, at any depth', () => {
  const rooted = addNode(tree(), null, 'Pathology')
  assert.deepEqual(rooted.map((node) => node.title), ['Anatomy', 'Physiology', 'Pathology'])

  const deep = addNode(tree(), 'a1', 'Brachial plexus')
  assert.deepEqual(findNode(deep, 'a1')!.children!.map((node) => node.title), ['Brachial plexus'])

  // No schema says what a level means, so five deep is as valid as two.
  let five = tree()
  let parent: string | null = 'a1'
  for (const title of ['x', 'y', 'z']) {
    five = addNode(five, parent, title)
    parent = findNode(five, parent!)!.children!.at(-1)!.id
  }
  assert.equal(findNode(five, parent!)!.title, 'z')
})

test('renaming touches one node and nothing else', () => {
  const renamed = renameNode(tree(), 'a2', 'Lower limb and pelvis')
  assert.equal(findNode(renamed, 'a2')!.title, 'Lower limb and pelvis')
  assert.equal(findNode(renamed, 'a1')!.title, 'Upper limb')
})

test('removing a node removes what is beneath it, and says how much first', () => {
  assert.deepEqual(countBeneath(findNode(tree(), 'a')!), { nodes: 2, articles: 2 })
  const pruned = removeNode(tree(), 'a')
  assert.equal(findNode(pruned, 'a'), null)
  assert.equal(findNode(pruned, 'a1'), null)
  assert.deepEqual(pruned.map((node) => node.id), ['b'])
})

test('a node moves among its siblings and never changes parent', () => {
  const moved = moveNode(tree(), 'a2', 'up')
  assert.deepEqual(findNode(moved, 'a')!.children!.map((node) => node.id), ['a2', 'a1'])
  // Past either end is a no-op rather than an error or a reparent.
  assert.deepEqual(moveNode(tree(), 'a1', 'up'), tree())
  assert.deepEqual(moveNode(tree(), 'b', 'down'), tree())
})

test('filing an article is idempotent, and unfiling is exact', () => {
  const filed = fileArticle(tree(), 'a2', 'art-9')
  assert.deepEqual(findNode(filed, 'a2')!.articleIds, ['art-9'])
  assert.deepEqual(findNode(fileArticle(filed, 'a2', 'art-9'), 'a2')!.articleIds, ['art-9'])
  assert.deepEqual(findNode(unfileArticle(filed, 'a2', 'art-9'), 'a2')!.articleIds, [])
})

test('the same article may be filed in more than one node', () => {
  // One article, placed twice. It is not copied, and it is not moved.
  const twice = fileArticle(tree(), 'a2', 'art-1')
  assert.deepEqual(findNode(twice, 'a1')!.articleIds, ['art-1', 'art-2'])
  assert.deepEqual(findNode(twice, 'a2')!.articleIds, ['art-1'])
  assert.deepEqual(allArticleIds(twice).sort(), ['art-1', 'art-2'])
})

test('every operation leaves the original untouched', () => {
  const original = tree()
  addNode(original, 'a', 'x')
  renameNode(original, 'a', 'x')
  removeNode(original, 'a')
  fileArticle(original, 'a1', 'x')
  moveNode(original, 'a1', 'down')
  assert.deepEqual(original, tree())
})
