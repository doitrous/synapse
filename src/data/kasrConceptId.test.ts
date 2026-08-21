import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { conceptHash, mintConceptId, subjectCollisions } from '../../scripts/kasr/seeds/types.ts'

/**
 * The property the whole Kasr concept scheme rests on, and the one hole in it.
 *
 * A concept ID is minted from the canonical key alone, so two sessions
 * authoring the same material converge on one ID instead of forking. That is
 * what lets two lanes work one module without a shared lock.
 *
 * The hole: the subject picks the `CON-<SYS>-` prefix and is not hashed. One
 * key filed under two subjects therefore mints two IDs that differ in three
 * characters, nothing at import time notices, and a student's mastery of one
 * idea splits across both.
 */

describe('A concept id is a function of its canonical key', () => {
  test('the same key mints the same id every time', () => {
    assert.equal(mintConceptId('haem', 'decidua-definition-parts-fates'),
      mintConceptId('haem', 'decidua-definition-parts-fates'))
  })

  test('different keys mint different ids', () => {
    assert.notEqual(mintConceptId('haem', 'platelet-granule-types-and-contents'),
      mintConceptId('haem', 'platelet-count-and-thrombocytopenia'))
  })

  test('two sessions authoring the same key converge without talking to each other', () => {
    // Why the scheme exists. Nothing coordinates these two calls.
    const oneLane = mintConceptId('msk', 'elbow-joint-type-bones-ligaments')
    const otherLane = mintConceptId('msk', 'elbow-joint-type-bones-ligaments')
    assert.equal(oneLane, otherLane)
  })

  test('the subject changes only the prefix, which is the hole this file exists for', () => {
    const dev = mintConceptId('dev', 'decidua-definition-parts-fates')
    const msk = mintConceptId('msk', 'decidua-definition-parts-fates')
    assert.notEqual(dev, msk, 'two ids')
    assert.equal(conceptHash('decidua-definition-parts-fates'), dev.slice('CON-DEV-'.length))
    assert.equal(dev.slice('CON-DEV-'.length), msk.slice('CON-MSK-'.length),
      'and they share a hash body, which is what makes them one concept minted twice')
  })
})

describe('subjectCollisions finds a key given two subjects', () => {
  test('agreement is silence', () => {
    assert.deepEqual(subjectCollisions([
      { key: 'decidua-definition-parts-fates', subject: 'dev', where: 'paper' },
      { key: 'decidua-definition-parts-fates', subject: 'dev', where: 'question book' },
      { key: 'elbow-joint-type-bones-ligaments', subject: 'msk', where: 'paper' },
    ]), [])
  })

  test('a disagreement is reported with both subjects and both sources', () => {
    const [clash, ...rest] = subjectCollisions([
      { key: 'decidua-definition-parts-fates', subject: 'dev', where: 'seeds/101-eoy-2025.ts' },
      { key: 'decidua-definition-parts-fates', subject: 'msk', where: 'seeds/mcq/fetal-membranes.ts' },
    ])
    assert.deepEqual(rest, [])
    assert.equal(clash.key, 'decidua-definition-parts-fates')
    assert.deepEqual(clash.subjects, ['dev', 'msk'])
    // Both files, so whoever fixes it knows where to look rather than grepping.
    assert.deepEqual(clash.where, ['seeds/101-eoy-2025.ts', 'seeds/mcq/fetal-membranes.ts'])
  })

  test('every offender is reported, not just the first', () => {
    // A build that reports one collision per run makes a reviewer rebuild once
    // per mistake, which is how the second and third go unfixed.
    const clashes = subjectCollisions([
      { key: 'a', subject: 'dev', where: 'one' }, { key: 'a', subject: 'msk', where: 'two' },
      { key: 'b', subject: 'fnd', where: 'one' }, { key: 'b', subject: 'haem', where: 'two' },
      { key: 'c', subject: 'msk', where: 'one' },
    ])
    assert.deepEqual(clashes.map((clash) => clash.key), ['a', 'b'])
  })

  test('one key under three subjects reports all three', () => {
    const [clash] = subjectCollisions([
      { key: 'a', subject: 'dev', where: 'one' },
      { key: 'a', subject: 'msk', where: 'two' },
      { key: 'a', subject: 'fnd', where: 'three' },
    ])
    assert.deepEqual(clash.subjects, ['dev', 'fnd', 'msk'])
  })

  test('no entries is not a collision', () => {
    assert.deepEqual(subjectCollisions([]), [])
  })
})
