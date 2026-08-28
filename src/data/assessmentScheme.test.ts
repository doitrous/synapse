import test from 'node:test'
import assert from 'node:assert/strict'
import {
  compatibilityExamMarks, formatMarks, markAmount, reconcileAssessmentScheme, schemeFromLegacyExamMarks,
} from './assessmentScheme.ts'

test('mark amounts preserve decimal halves exactly as hundredths', () => {
  assert.equal(markAmount('12.5'), 1250)
  assert.equal(markAmount(26.5), 2650)
  assert.equal(formatMarks(1250), '12.5')
})

test('known module totals reconcile exactly against component totals', () => {
  const scheme = {
    declaredTotal: markAmount(300)!,
    components: [
      { id: 'written', label: 'Written', kind: 'eoy' as const, marks: markAmount(240)! },
      { id: 'practical', label: 'Practical', kind: 'ospe' as const, marks: markAmount(60)! },
    ],
  }
  assert.deepEqual(reconcileAssessmentScheme(scheme), {
    status: 'exact',
    declaredTotal: 30000,
    componentTotal: 30000,
    errors: [],
  })
})

test('subject allocations are checked inside their component without double-counting', () => {
  const scheme = {
    declaredTotal: markAmount(100)!,
    components: [
      {
        id: 'practical',
        label: 'Practical',
        kind: 'practical' as const,
        marks: markAmount(60)!,
        subjectAllocations: [
          { subjectId: 'anatomy', marks: markAmount(20)!, componentId: 'practical' },
          { subjectId: 'physiology', marks: markAmount(40)!, componentId: 'practical' },
        ],
      },
      { id: 'written', label: 'Written', kind: 'eoy' as const, marks: markAmount(40)! },
    ],
  }
  assert.equal(reconcileAssessmentScheme(scheme).status, 'exact')
})

test('component or allocation mismatches are conflicted, not silently accepted', () => {
  const totalMismatch = reconcileAssessmentScheme({
    declaredTotal: markAmount(100)!,
    components: [{ id: 'written', label: 'Written', kind: 'eoy', marks: markAmount(90)! }],
  })
  assert.equal(totalMismatch.status, 'conflicted')
  assert.match(totalMismatch.errors[0], /Declared total/)

  const allocationMismatch = reconcileAssessmentScheme({
    declaredTotal: markAmount(60)!,
    components: [{
      id: 'ftf',
      label: 'FTF',
      kind: 'ospe',
      marks: markAmount(60)!,
      subjectAllocations: [{ subjectId: 'one', marks: markAmount(30)! }],
    }],
  })
  assert.equal(allocationMismatch.status, 'conflicted')
  assert.match(allocationMismatch.errors[0], /allocations total/)
})

test('unknown declared totals remain partial rather than becoming zero', () => {
  const result = reconcileAssessmentScheme({
    components: [{ id: 'written', label: 'Written', kind: 'eoy', marks: markAmount(40)! }],
  })
  assert.equal(result.status, 'partial')
  assert.equal(result.declaredTotal, null)
  assert.equal(result.componentTotal, 4000)
})

test('legacy four-bucket marks can be projected from a flexible scheme', () => {
  const scheme = schemeFromLegacyExamMarks({
    writtenEndOfModule: 20,
    writtenEndOfYear: 30,
    practicalEndOfModule: 12.5,
    practicalEndOfYear: 26.5,
  }, 89)
  assert.deepEqual(compatibilityExamMarks(scheme), {
    writtenEndOfModule: 20,
    writtenEndOfYear: 30,
    practicalEndOfModule: 12.5,
    practicalEndOfYear: 26.5,
  })
})
