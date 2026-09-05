import assert from 'node:assert/strict'
import test from 'node:test'
import { yearScopeMatches } from './universities.ts'

test('a bare year label matches the composite id for the same year (the bug)', () => {
  assert.equal(yearScopeMatches(['Year 1'], 'KAU_Y1'), true)
})

test('two identical composite ids still match literally', () => {
  assert.equal(yearScopeMatches(['KAU_Y1'], 'KAU_Y1'), true)
})

test('two different composite ids never match, even for the same year number (no cross-university leak)', () => {
  assert.equal(yearScopeMatches(['KAU_Y1'], 'AU_Y1'), false)
})

test('a bare label is university-agnostic; the university tag gates it separately', () => {
  assert.equal(yearScopeMatches(['Year 1'], 'AU_Y1'), true)
})

test('an empty year list is unrestricted', () => {
  assert.equal(yearScopeMatches([], 'KAU_Y1'), true)
})

test('internship year labels match their composite id', () => {
  assert.equal(yearScopeMatches(['Internship Year 2'], 'KAU_INT2'), true)
})

test('a mismatched year number never matches', () => {
  assert.equal(yearScopeMatches(['Year 2'], 'KAU_Y1'), false)
})
