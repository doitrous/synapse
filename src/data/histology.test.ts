import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  clampPin, objectivesOf, openingObjective, structuresAt, managedSlideToStudentSlide,
} from './histology.ts'
import type { ManagedContentItem } from './contentControl.ts'

const slide = {
  id: 's1', title: 'Ileum', subjectId: 'gi', tissue: 'Small bowel', stain: 'H&E',
  views: [
    { objective: 10 as const, image: 'ten.jpg' },
    { objective: 4 as const, image: 'four.jpg' },
  ],
  structures: [
    { id: 'a', label: 'Villus', at: { 4: { x: 0.2, y: 0.3 } } },
    { id: 'b', label: 'Goblet cell', at: { 10: { x: 0.6, y: 0.6 } } },
  ],
}

test('a pin is kept inside the image', () => {
  assert.deepEqual(clampPin({ x: 1.4, y: -0.2 }), { x: 1, y: 0 })
  assert.deepEqual(clampPin({ x: 0.5, y: 0.5 }), { x: 0.5, y: 0.5 })
})

test('the turret offers only the objectives the slide has, in order', () => {
  assert.deepEqual(objectivesOf(slide), [4, 10])
})

test('a slide opens at its lowest power', () => {
  assert.equal(openingObjective(slide), 4)
})

test('only structures pinned at this objective are shown', () => {
  assert.deepEqual(structuresAt(slide, 4).map((s) => s.label), ['Villus'])
  assert.deepEqual(structuresAt(slide, 10).map((s) => s.label), ['Goblet cell'])
  assert.deepEqual(structuresAt(slide, 40), [])
})

test('a slide with no structures is still a slide', () => {
  assert.deepEqual(structuresAt({ ...slide, structures: [] }, 4), [])
})

test('an unpublished slide is not offered to students', () => {
  const item = {
    id: 's1', kind: 'histology', title: 'Ileum', subjectId: 'gi', status: 'Draft',
    owner: '', updatedAt: '', fields: {},
    histologyData: { tissue: 'Small bowel', stain: 'H&E', views: slide.views, structures: [] },
  } as unknown as ManagedContentItem
  assert.equal(managedSlideToStudentSlide(item), null)
})

test('a published slide with no image is not offered either', () => {
  const item = {
    id: 's1', kind: 'histology', title: 'Ileum', subjectId: 'gi', status: 'Published',
    owner: '', updatedAt: '', fields: {},
    histologyData: { tissue: 'Small bowel', stain: 'H&E', views: [], structures: [] },
  } as unknown as ManagedContentItem
  assert.equal(managedSlideToStudentSlide(item), null)
})

test('a published slide projects into the student shape', () => {
  const item = {
    id: 's1', kind: 'histology', title: 'Ileum', subjectId: 'gi', status: 'Published',
    owner: '', updatedAt: '', fields: { Description: 'Note the villi.' },
    histologyData: { tissue: 'Small bowel', stain: 'H&E', views: slide.views, structures: slide.structures },
  } as unknown as ManagedContentItem
  const projected = managedSlideToStudentSlide(item)
  assert.equal(projected?.title, 'Ileum')
  assert.equal(projected?.stain, 'H&E')
  assert.equal(projected?.description, 'Note the villi.')
  assert.deepEqual(projected?.views.map((v) => v.objective), [4, 10])
})
