import test from 'node:test'
import assert from 'node:assert/strict'
import { emptyPracticalCommon, itemScope } from './contentControl.ts'
import type { ManagedContentItem, OsceAuthoringData } from './contentControl.ts'

function osce(scope: Partial<OsceAuthoringData>): ManagedContentItem {
  return {
    id: 'p1', kind: 'practical', title: 'Station', subjectId: 'cvs', status: 'Draft',
    owner: 'nobody', updatedAt: '2026-08-21', fields: {},
    practicalData: {
      ...emptyPracticalCommon(), format: 'osce',
      candidateInstructions: '', actorOpening: '', actorSections: [], actorFlags: [], markSections: [],
      ...scope,
    } as OsceAuthoringData,
  }
}

test('a practical reports the years and universities it was tagged with', () => {
  const item = osce({ yearIds: ['OMS_Y2'], universityIds: ['oms'], moduleIds: ['MOD_CVS'] })
  assert.deepEqual(itemScope(item), { universityIds: ['oms'], yearIds: ['OMS_Y2'] })
})

test('an untagged practical reports nothing, and so applies to everyone', () => {
  assert.deepEqual(itemScope(osce({})), { universityIds: [], yearIds: [] })
})

test('a new practical starts with no scope rather than an invented one', () => {
  const fresh = emptyPracticalCommon()
  assert.equal(fresh.moduleIds, undefined)
  assert.equal(fresh.yearIds, undefined)
})
