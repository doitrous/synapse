import test from 'node:test'
import assert from 'node:assert/strict'
import { NO_CHAPTER, UNGROUPED, groupResources } from './resourceGrouping.ts'

const CATALOGUE = ['cvs', 'resp', 'renal']

function resource(subjectId: string, modules: string[] = [], chapter?: string) {
  return { subjectId, modules, chapter, id: `${subjectId}-${modules[0] ?? ''}-${chapter ?? ''}` }
}

test('resources with an off-catalogue subject are still grouped, not dropped', () => {
  // The regression this guards: every published resource carries
  // `subjectId: "medical"`, which the curriculum catalogue does not list. The
  // page counted them and rendered "No resources match".
  const items = [resource('medical'), resource('medical'), resource('cvs')]
  const folders = groupResources(items, 'system', CATALOGUE)
  assert.deepEqual(folders.map((f) => f.key), ['cvs', 'medical'])
  assert.equal(folders.reduce((total, f) => total + f.count, 0), items.length)
})

test('nothing is lost under either grouping', () => {
  const items = [resource('medical', ['CVS 01']), resource('cvs'), resource('zzz', ['RES 02'])]
  for (const groupBy of ['system', 'module'] as const) {
    const total = groupResources(items, groupBy, CATALOGUE).reduce((sum, f) => sum + f.count, 0)
    assert.equal(total, items.length, `${groupBy} grouping lost a resource`)
  }
})

test('catalogue subjects keep catalogue order, and the rest follow', () => {
  const items = [resource('renal'), resource('aaa'), resource('cvs'), resource('bbb')]
  const folders = groupResources(items, 'system', CATALOGUE)
  assert.deepEqual(folders.map((f) => f.key), ['cvs', 'renal', 'aaa', 'bbb'])
})

test('a resource with no subject lands in one trailing folder', () => {
  const folders = groupResources([resource(''), resource('cvs')], 'system', CATALOGUE)
  assert.deepEqual(folders.map((f) => f.key), ['cvs', UNGROUPED])
  assert.equal(folders[1].subjectId, undefined)
})

test('module folders sort naturally, so CVS 2 precedes CVS 10', () => {
  // A plain string sort puts "CVS 10" before "CVS 2", which reads as an error.
  const items = [resource('cvs', ['CVS 10']), resource('cvs', ['CVS 2']), resource('cvs', ['CVS 1'])]
  const folders = groupResources(items, 'module', CATALOGUE)
  assert.deepEqual(folders.map((f) => f.key), ['CVS 1', 'CVS 2', 'CVS 10'])
})

test('resources with no module collect in a single folder at the end', () => {
  const items = [resource('cvs'), resource('cvs', ['CVS 01']), resource('resp')]
  const folders = groupResources(items, 'module', CATALOGUE)
  assert.deepEqual(folders.map((f) => f.key), ['CVS 01', UNGROUPED])
  assert.equal(folders[1].count, 2)
})

test('a module folder takes its colour from the first resource in it', () => {
  const folders = groupResources([resource('resp', ['RES 02'])], 'module', CATALOGUE)
  assert.equal(folders[0].subjectId, 'resp')
})

test('chapters become subfolders, and chapterless items collect under one key', () => {
  const items = [
    resource('cvs', [], 'Ch. 1'),
    resource('cvs', [], 'Ch. 1'),
    resource('cvs', [], 'Ch. 2'),
    resource('cvs'),
  ]
  const [folder] = groupResources(items, 'system', CATALOGUE)
  assert.deepEqual(folder.subfolders.map((s) => s.key), ['Ch. 1', 'Ch. 2', NO_CHAPTER])
  assert.equal(folder.subfolders[0].items.length, 2)
})

test('an empty list produces no folders rather than empty ones', () => {
  assert.deepEqual(groupResources([], 'system', CATALOGUE), [])
  assert.deepEqual(groupResources([], 'module', CATALOGUE), [])
})
