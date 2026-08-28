import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildBackfill,
  ensureChain,
  ownersOfPath,
  scopeConflict,
  moduleCatalogueIndex,
  collectNodeIds,
  createIdAllocator,
} from './backfill-library-trees.mjs'
import { allArticleIds, treeScope, findNode } from '../src/data/libraryTrees.ts'

function catalogue() {
  return [
    {
      id: 'kau',
      name: 'Kasr Al Ainy',
      short: 'KAU',
      region: 'Cairo',
      years: [
        {
          id: 'KAU_Y1',
          year: 'Year 1',
          students: 0,
          courses: [{ id: 'c-cvs', name: 'Cardiovascular module', block: 'CVS', moduleId: 'KAU-CVS-1' }],
        },
      ],
    },
    {
      id: 'au',
      name: 'Alexandria University',
      short: 'AU',
      region: 'Alexandria',
      years: [
        {
          id: 'AU_Y1',
          year: 'Year 1',
          students: 0,
          courses: [{ id: 'c-resp', name: 'Respiratory module', block: 'RESP', moduleId: 'AU-RESP-1' }],
        },
      ],
    },
  ]
}

function publishedArticle(overrides = {}) {
  return {
    id: overrides.id ?? 'art-1',
    kind: 'article',
    title: overrides.title ?? 'Heart failure',
    subjectId: 'cvs',
    status: 'Published',
    owner: 'x',
    updatedAt: '2026-01-01T00:00:00.000Z',
    fields: {},
    articleData: {
      summary: '', body: '', sections: [], holdThese: [], loseTheMark: [],
      questionIds: [], resourceIds: [], annotations: [],
      moduleIds: overrides.moduleIds ?? ['KAU-CVS-1'],
      moduleSubjectPaths: overrides.moduleSubjectPaths ?? [],
      universityIds: overrides.universityIds ?? [],
      yearIds: overrides.yearIds ?? [],
      ...overrides.articleData,
    },
  }
}

test('ensureChain creates a fresh chain and never mutates an existing node', () => {
  const allocate = createIdAllocator([])
  const start = [{ id: 'n1', title: 'Anatomy', articleIds: ['keep-me'] }]
  const { nodes, leafId } = ensureChain(start, ['Anatomy', 'Upper Limb'], allocate)

  // The existing "Anatomy" node's own identity and pre-existing articles are untouched.
  const anatomy = nodes.find((n) => n.title === 'Anatomy')
  assert.equal(anatomy.id, 'n1')
  assert.deepEqual(anatomy.articleIds, ['keep-me'])
  assert.equal(anatomy.children.length, 1)
  assert.equal(anatomy.children[0].title, 'Upper Limb')
  assert.equal(leafId, anatomy.children[0].id)

  // Original array/object references are not reused for the mutated node —
  // this is a "new nodes array" merge, not an in-place edit.
  assert.notEqual(nodes, start)
  assert.notEqual(nodes[0], start[0])
})

test('ensureChain matches an existing title case-insensitively and adds nothing new', () => {
  const allocate = createIdAllocator([])
  const start = [{ id: 'n1', title: 'anatomy', children: [{ id: 'n2', title: 'Upper Limb', articleIds: ['a1'] }] }]
  const { nodes, leafId } = ensureChain(start, ['Anatomy', 'upper limb'], allocate)
  assert.equal(leafId, 'n2')
  assert.deepEqual(collectNodeIds(nodes), new Set(['n1', 'n2']))
})

test('createIdAllocator never reuses a seeded id', () => {
  const allocate = createIdAllocator(['ltn-bf-seed'])
  for (let i = 0; i < 25; i += 1) assert.notEqual(allocate(), 'ltn-bf-seed')
})

test('ownersOfPath strips a matching module head and falls back to every module when ambiguous', () => {
  const index = moduleCatalogueIndex(catalogue())
  const stripped = ownersOfPath('KAU-CVS-1 > Anatomy > Upper Limb', ['KAU-CVS-1'], index)
  assert.deepEqual(stripped, { owners: ['KAU-CVS-1'], rest: ['Anatomy', 'Upper Limb'] })

  const byName = ownersOfPath('Cardiovascular module > Anatomy', ['KAU-CVS-1'], index)
  assert.deepEqual(byName, { owners: ['KAU-CVS-1'], rest: ['Anatomy'] })

  const ambiguous = ownersOfPath('Anatomy > Upper Limb', ['KAU-CVS-1', 'AU-RESP-1'], index)
  assert.deepEqual(ambiguous, { owners: ['KAU-CVS-1', 'AU-RESP-1'], rest: ['Anatomy', 'Upper Limb'] })
})

test('scopeConflict is null with no catalogue entry, no recorded scope, or a matching scope', () => {
  const index = moduleCatalogueIndex(catalogue())
  const kauCvs = index.get('KAU-CVS-1')
  assert.equal(scopeConflict({ articleData: {} }, null), null)
  assert.equal(scopeConflict({ articleData: {} }, kauCvs), null)
  assert.equal(scopeConflict({ articleData: { universityIds: ['kau'], yearIds: ['KAU_Y1'] } }, kauCvs), null)
})

test('scopeConflict fires when the article scope excludes the module\'s own university or year', () => {
  const index = moduleCatalogueIndex(catalogue())
  const kauCvs = index.get('KAU-CVS-1')
  const conflict = scopeConflict({ articleData: { universityIds: ['au'] } }, kauCvs)
  assert.match(conflict, /article is scoped to university \[au\]/)
})

test('buildBackfill files a published article under a fresh path derived module tree', () => {
  const article = publishedArticle({ moduleSubjectPaths: ['KAU-CVS-1 > Anatomy > Upper Limb'], articleData: { moduleIds: ['KAU-CVS-1'] } })
  const { document, report } = buildBackfill({ ledger: [article], trees: { trees: {} }, catalogue: catalogue() })

  const scope = treeScope('module', 'KAU-CVS-1')
  const tree = document.trees[scope]
  const anatomy = tree.find((n) => n.title === 'Anatomy')
  assert.ok(anatomy, 'creates the written chain with the module head stripped')
  const upperLimb = anatomy.children.find((n) => n.title === 'Upper Limb')
  assert.deepEqual(upperLimb.articleIds, [article.id])

  assert.equal(report.totals.modulesTouched, 1)
  assert.equal(report.totals.nodesCreated, 2)
  assert.equal(report.totals.articleFilingsAdded, 1)
  assert.equal(report.modules[0].catalogue.universityShort, 'KAU')
})

test('buildBackfill files an article with no subject path under the General bucket', () => {
  const article = publishedArticle({ moduleSubjectPaths: [] })
  const { document } = buildBackfill({ ledger: [article], trees: { trees: {} }, catalogue: catalogue() })
  const tree = document.trees[treeScope('module', 'KAU-CVS-1')]
  const general = tree.find((n) => n.title === 'General')
  assert.ok(general)
  assert.deepEqual(general.articleIds, [article.id])
})

test('buildBackfill never touches or removes an existing hand-authored node', () => {
  const handAuthored = {
    trees: {
      [treeScope('module', 'KAU-CVS-1')]: [
        { id: 'hand-1', title: 'Physiology', children: [{ id: 'hand-2', title: 'Cardiac cycle', articleIds: ['hand-article'] }] },
      ],
    },
  }
  const article = publishedArticle({ moduleSubjectPaths: ['KAU-CVS-1 > Anatomy > Upper Limb'] })
  const { document } = buildBackfill({ ledger: [article], trees: handAuthored, catalogue: catalogue() })
  const tree = document.trees[treeScope('module', 'KAU-CVS-1')]

  // The hand-authored branch survives untouched, id and article intact.
  const physiology = findNode(tree, 'hand-1')
  assert.ok(physiology)
  assert.equal(physiology.title, 'Physiology')
  const cardiacCycle = findNode(tree, 'hand-2')
  assert.deepEqual(cardiacCycle.articleIds, ['hand-article'])

  // The backfilled branch sits alongside it.
  assert.ok(tree.find((n) => n.title === 'Anatomy'))
})

test('buildBackfill drops a scope-conflicting article and reports it instead of filing it', () => {
  const article = publishedArticle({ articleData: { moduleIds: ['KAU-CVS-1'], universityIds: ['au'] } })
  const { document, report } = buildBackfill({ ledger: [article], trees: { trees: {} }, catalogue: catalogue() })
  const tree = document.trees[treeScope('module', 'KAU-CVS-1')]
  assert.deepEqual(allArticleIds(tree ?? []), [])
  assert.equal(report.scopeConflicts.length, 1)
  assert.equal(report.scopeConflicts[0].articleId, article.id)
})

test('buildBackfill excludes Draft, Archived, and media-blocked articles', () => {
  const draft = publishedArticle({ id: 'art-draft' })
  draft.status = 'Draft'
  const archived = publishedArticle({ id: 'art-archived' })
  archived.status = 'Archived'
  const blocked = publishedArticle({ id: 'art-blocked' })
  blocked.articleData.mediaRequests = [{ id: 'mr-1', priority: 'required', status: 'needed' }]

  const { document, report } = buildBackfill({ ledger: [draft, archived, blocked], trees: { trees: {} }, catalogue: catalogue() })
  assert.equal(report.totals.publishedArticlesConsidered, 0)
  assert.equal(Object.keys(document.trees).length, 0)
})

test('buildBackfill skips and reports an article with no module assignment', () => {
  const article = publishedArticle({ articleData: { moduleIds: [] } })
  const { report } = buildBackfill({ ledger: [article], trees: { trees: {} }, catalogue: catalogue() })
  assert.equal(report.skippedArticles.length, 1)
  assert.equal(report.skippedArticles[0].id, article.id)
})

test('buildBackfill is idempotent: a second pass over its own output adds nothing', () => {
  const articles = [
    publishedArticle({ id: 'a1', moduleSubjectPaths: ['101 ISK > Anatomy > Upper Limb'] }),
    publishedArticle({ id: 'a2', moduleSubjectPaths: [] }),
    publishedArticle({ id: 'a3', articleData: { moduleIds: ['AU-RESP-1'] }, universityIds: ['au'] }),
  ]
  const first = buildBackfill({ ledger: articles, trees: { trees: {} }, catalogue: catalogue() })
  const second = buildBackfill({ ledger: articles, trees: first.document, catalogue: catalogue() })

  assert.deepEqual(second.document, first.document)
  assert.equal(second.report.totals.nodesCreated, 0)
  assert.equal(second.report.totals.articleFilingsAdded, 0)
})

test('buildBackfill files one article under multiple modules independently', () => {
  const article = publishedArticle({
    id: 'multi',
    articleData: { moduleIds: ['KAU-CVS-1', 'AU-RESP-1'] },
    moduleSubjectPaths: ['KAU-CVS-1 > Anatomy', 'AU-RESP-1 > Physiology'],
  })
  const { document } = buildBackfill({ ledger: [article], trees: { trees: {} }, catalogue: catalogue() })
  const cvsTree = document.trees[treeScope('module', 'KAU-CVS-1')]
  const respTree = document.trees[treeScope('module', 'AU-RESP-1')]
  assert.ok(cvsTree.find((n) => n.title === 'Anatomy' && n.articleIds?.includes('multi')))
  assert.ok(respTree.find((n) => n.title === 'Physiology' && n.articleIds?.includes('multi')))
})

test('buildBackfill warns when a module id is not in the catalogue but still files it', () => {
  const article = publishedArticle({ articleData: { moduleIds: ['UNKNOWN-MOD'] } })
  const { document, report } = buildBackfill({ ledger: [article], trees: { trees: {} }, catalogue: catalogue() })
  const tree = document.trees[treeScope('module', 'UNKNOWN-MOD')]
  assert.deepEqual(allArticleIds(tree), [article.id])
  assert.equal(report.modules[0].warnings.length, 1)
})
