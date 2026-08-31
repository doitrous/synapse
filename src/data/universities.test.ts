import test from 'node:test'
import assert from 'node:assert/strict'
import { universitiesById } from './universities.ts'

test('the default Helwan Year 1 catalogue places its four governed modules in their evidenced terms', () => {
  const year = universitiesById.hu.years.find((candidate) => candidate.id === 'HU_Y1')

  assert.ok(year)
  assert.deepEqual(year.terms, ['Term 1', 'Term 2'])
  assert.deepEqual(
    year.courses.map(({ name, moduleId, term }) => ({ name, moduleId, term })),
    [
      { name: 'BMS 101 - Basic Medical Science I', moduleId: 'HU-BMS-101', term: 'Term 1' },
      { name: 'BMS 102 - Basic Medical Science II', moduleId: 'HU-BMS-102', term: 'Term 2' },
      { name: 'LCS 103 - Locomotor and Coordination System', moduleId: 'HU-LCS-103', term: 'Term 2' },
      { name: 'PSY 104 - Psychology', moduleId: 'HU-PSY-104', term: 'Term 2' },
    ],
  )
})
