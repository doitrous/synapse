import test from 'node:test'
import assert from 'node:assert/strict'
import { adaptivePoolItem } from '../../../server/src/adaptivePoolProject.js'
import { managedQuestionToStudentQuestion } from '../questionProjection.ts'
import type { ManagedContentItem } from '../contentControl.ts'

/**
 * The server adaptive-pool projection must agree with the client.
 *
 * Adaptive Setup runs on the server projection (`adaptivePoolItem`), but the
 * numbers it shows must match what the client would have produced from the full
 * ledger. Two things are asserted:
 *
 *  - GATE parity, against the real client gate `managedQuestionToStudentQuestion`
 *    (the same null-conditions `adaptiveItemFrom` filters by): an item is in the
 *    pool here iff the client would have made it an adaptive item. This is the
 *    part most likely to drift, so it is locked to the live function, not a copy.
 *  - FIELD correctness: the concept/scope fields, with the main/secondary dedup
 *    and module merge `adaptiveItemFrom` applies, checked against explicit values.
 *
 * (`adaptiveItemFrom` itself imports the `@/` alias, so it is not importable under
 * `node --test`; its gate — the only subtle half — is exactly this function.)
 */
function question(over: Partial<NonNullable<ManagedContentItem['questionData']>> = {}, top: Partial<ManagedContentItem> = {}): ManagedContentItem {
  return {
    id: 'q1', kind: 'question', status: 'Published', title: 'Cardiac cycle', subjectId: 'cvs', fields: { Topic: 'Heart' },
    questionData: {
      tags: {
        topic: 'Heart', mainConceptIds: ['c-main', 'c-both'], conceptIds: ['c-both', 'c-secondary'],
        universityIds: ['kau'], years: ['KAU_Y1'], questionOnlyFor: [], moduleIds: ['m1'], module: 'm2',
      },
      answers: [
        { label: 'A', text: 'Systole', explanation: 'x' },
        { label: 'B', text: 'Diastole', explanation: 'y' },
      ],
      correctAnswer: 'B', libraryIds: [], resourceIds: [], attachedImage: '', attachments: [], learningObjective: '', estimatedSeconds: 0,
      ...over,
    },
    ...top,
  } as ManagedContentItem
}

/** The server projects it iff the client gate would have admitted it. */
function assertGateParity(item: ManagedContentItem, label: string) {
  const inClientPool = managedQuestionToStudentQuestion(item, [item]) !== null
  const inServerPool = adaptivePoolItem(item) !== null
  assert.equal(inServerPool, inClientPool, label)
}

test('an approved question is in the pool with concept/scope fields deduped', () => {
  assertGateParity(question(), 'approved question')
  const row = adaptivePoolItem(question())
  assert.deepEqual(row, {
    id: 'q1',
    mainConceptIds: ['c-main', 'c-both'],
    secondaryConceptIds: ['c-secondary'], // c-both dropped: already a main concept
    conceptIds: ['c-main', 'c-both', 'c-secondary'],
    universityIds: ['kau'],
    years: ['KAU_Y1'],
    onlyFor: [],
    moduleIds: ['m1', 'm2'], // moduleIds ∪ the single `module`
  })
})

test('every gate reject path agrees with the client (both exclude)', () => {
  assertGateParity(question({}, { status: 'Draft' }), 'unpublished')
  assertGateParity(question({ answers: [{ label: 'A', text: 'only one', explanation: '' }] } as never), 'fewer than two answers')
  assertGateParity(question({ correctAnswer: 'Z' }), 'no correct answer among options')
  assertGateParity(question({ answers: [{ label: 'A', text: 'Systole', explanation: '' }, { label: 'B', text: '  ', explanation: '' }] } as never), 'blank second option')
  assertGateParity(question({ mediaRequests: [{ id: 'r1', priority: 'required', status: 'requested' }] } as never), 'blocking media request')
})

test('a supplied required media request does not block', () => {
  const supplied = question({ mediaRequests: [{ id: 'r1', priority: 'required', status: 'supplied', mediaId: 'media-1' }] } as never)
  assertGateParity(supplied, 'supplied media request')
  assert.notEqual(adaptivePoolItem(supplied), null)
})

test('an allow-list (questionOnlyFor) is carried to the scope gate', () => {
  const item = question({ tags: { topic: 'Heart', mainConceptIds: ['c'], conceptIds: [], universityIds: [], years: [], questionOnlyFor: ['KAU_Y1'], moduleIds: [] } } as never)
  assert.deepEqual(adaptivePoolItem(item)?.onlyFor, ['KAU_Y1'])
})
