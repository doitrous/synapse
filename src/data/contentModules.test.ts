import test from 'node:test'
import assert from 'node:assert/strict'
import { contentModuleLabels } from './contentModules.ts'
import type { ManagedContentItem } from './contentControl.ts'
import type { University } from './universities.ts'

const catalogue = [{
  id: 'KAU', short: 'KAU', name: 'King Abdulaziz University', country: 'Egypt',
  years: [{ id: 'KAU_Y1', year: 'Year 1', courses: [{ name: 'Cardiovascular module', block: 'CVS', moduleId: 'KAU-CVS-1' }] }],
}] as unknown as University[]

const collisionCatalogue = [
  {
    id: 'KAU', short: 'KAU', name: 'King Abdulaziz University', region: 'Egypt',
    years: [
      { id: 'KAU_Y1', year: 'Year 1', courses: [
        { name: 'KAU foundations', block: 'FND', moduleId: 'SHARED-1' },
        { name: 'Cardiovascular module', block: 'CVS', moduleId: 'KAU-CVS-1' },
        { name: 'Shared medicine', block: 'MED', moduleId: 'KAU-MED-1' },
      ] },
      { id: 'KAU_Y2', year: 'Year 2', courses: [
        { name: 'KAU clinical foundations', block: 'FND', moduleId: 'SHARED-1' },
      ] },
    ],
  },
  {
    id: 'OMS', short: 'OMS', name: 'October Medical School', region: 'Egypt',
    years: [{ id: 'OMS_Y1', year: 'Year 1', courses: [
      { name: 'OMS integrated foundations', block: 'FND', moduleId: 'SHARED-1' },
      { name: 'Shared medicine', block: 'MED', moduleId: 'OMS-MED-1' },
    ] }],
  },
] as unknown as University[]

function item(tags: Record<string, unknown>) {
  return {
    id: 'q-1', kind: 'question', title: 'Question', subjectId: 'cvs', status: 'Draft', owner: 'Admin', updatedAt: '', fields: {},
    questionData: { tags },
  } as unknown as ManagedContentItem
}

test('module IDs resolve to the faculty-facing module name and context', () => {
  const labels = contentModuleLabels(item({ moduleIds: ['KAU-CVS-1'] }), catalogue)
  assert.deepEqual(labels, [{ id: 'KAU-CVS-1', label: 'Cardiovascular module', context: 'KAU › Year 1', known: true }])
})

test('module path heads resolve and duplicate IDs collapse', () => {
  const labels = contentModuleLabels(item({
    moduleIds: ['KAU-CVS-1'],
    moduleSubjectPaths: ['KAU-CVS-1 > Anatomy', 'Cardiovascular module > Physiology'],
  }), catalogue)
  assert.equal(labels.length, 1)
  assert.equal(labels[0].label, 'Cardiovascular module')
})

test('unknown authored module references stay visible for repair', () => {
  assert.deepEqual(contentModuleLabels(item({ moduleIds: ['OLD-MODULE'] }), catalogue), [{
    id: 'OLD-MODULE', label: 'OLD-MODULE', context: 'This module is not present in the current university catalogue.', known: false,
  }])
})

test('legacy tags.module is not misreported as a real curriculum module', () => {
  assert.deepEqual(contentModuleLabels(item({ module: 'cvs' }), catalogue), [])
})

test('a duplicate module ID resolves inside the authored university and year', () => {
  assert.deepEqual(contentModuleLabels(item({
    moduleIds: ['SHARED-1'], years: ['OMS_Y1'],
  }), collisionCatalogue), [{
    id: 'SHARED-1', label: 'OMS integrated foundations', context: 'OMS › Year 1', known: true,
  }])

  assert.deepEqual(contentModuleLabels(item({
    moduleIds: ['SHARED-1'], universityIds: ['KAU'], years: ['Year 2'],
  }), collisionCatalogue), [{
    id: 'SHARED-1', label: 'KAU clinical foundations', context: 'KAU › Year 2', known: true,
  }])
})

test('a duplicate visible name resolves to the ID in the selected university', () => {
  assert.deepEqual(contentModuleLabels(item({
    moduleSubjectPaths: ['Shared medicine > Anatomy'], universityIds: ['OMS'], years: ['OMS_Y1'],
  }), collisionCatalogue), [{
    id: 'OMS-MED-1', label: 'Shared medicine', context: 'OMS › Year 1', known: true,
  }])
})

test('scope mismatch never borrows a module from another university', () => {
  const [label] = contentModuleLabels(item({
    moduleIds: ['KAU-CVS-1'], universityIds: ['OMS'], years: ['OMS_Y1'],
  }), collisionCatalogue)
  assert.equal(label.known, false)
  assert.equal(label.label, 'KAU-CVS-1')
  assert.match(label.context, /not in the item's selected university\/year/)
  assert.match(label.context, /KAU › Year 1/)
})

test('a colliding module without enough scope stays explicitly unresolved', () => {
  const [label] = contentModuleLabels(item({ moduleIds: ['SHARED-1'] }), collisionCatalogue)
  assert.equal(label.known, false)
  assert.equal(label.label, 'SHARED-1')
  assert.match(label.context, /matches multiple catalogue entries/)
  assert.match(label.context, /Add or correct the item's university and year scope/)
})
