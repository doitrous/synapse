import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { parseAcademicOutline } from './academicImport.ts'
import { moduleKey } from './moduleSubjects.ts'
import {
  allModuleSubjectPaths, moduleSubjectPathOf, parseModuleSubjectPaths,
  resolveModuleSubjectPath, splitModuleSubjectPath,
} from './moduleSubjectPath.ts'

/** The 101 ISK tree, built the way an import would build it. */
function kasr() {
  const parsed = parseAcademicOutline(`# Year 1
- Introduction to Structure & Function [101 ISK]
  - Anatomy
    - Upper Limb
      - Brachial Plexus
    - Embryology
  - Histology
    - Epithelium`, { universityShort: 'KAU', knownModuleIds: ['101 ISK'] })
  const year = parsed.years[0]
  const course = year.courses[0]
  return {
    store: parsed.subjects,
    universityId: 'kau',
    yearId: year.id,
    courseId: course.id,
    moduleId: course.moduleId!,
    moduleName: course.name,
    subjects: parsed.subjects[moduleKey('kau', year.id, course.id)],
  }
}

describe('Writing a path', () => {
  test('segments split on > and lose their padding', () => {
    assert.deepEqual(splitModuleSubjectPath('101 ISK > Anatomy >  Upper Limb '),
      ['101 ISK', 'Anatomy', 'Upper Limb'])
  })

  test('empty segments are dropped rather than becoming blank levels', () => {
    assert.deepEqual(splitModuleSubjectPath('Anatomy >> Upper Limb >'), ['Anatomy', 'Upper Limb'])
  })

  test('one cell can carry several paths, one per line', () => {
    assert.deepEqual(
      parseModuleSubjectPaths('101 ISK > Anatomy\n101 ISK > Histology > Epithelium'),
      ['101 ISK > Anatomy', '101 ISK > Histology > Epithelium'],
    )
  })

  test('a subject name containing a comma or semicolon survives intact', () => {
    // The importer's usual `|` and `;` list separators would cut these in half.
    assert.deepEqual(
      parseModuleSubjectPaths('101 ISK > Blood, Lymph & Immunity; an overview'),
      ['101 ISK > Blood, Lymph & Immunity; an overview'],
    )
  })

  test('an empty cell yields no paths', () => {
    assert.deepEqual(parseModuleSubjectPaths(undefined), [])
    assert.deepEqual(parseModuleSubjectPaths('   '), [])
  })
})

describe('Resolving a path against the tree', () => {
  test('a full path reaches the subject it names', () => {
    const c = kasr()
    const out = resolveModuleSubjectPath('101 ISK > Anatomy > Upper Limb > Brachial Plexus', c)
    assert.equal(out.unresolvedSegment, undefined)
    assert.deepEqual(out.chain.map((s) => s.name), ['Anatomy', 'Upper Limb', 'Brachial Plexus'])
    assert.equal(out.subjectId, out.chain.at(-1)!.id)
  })

  test('the leading module segment is optional', () => {
    const c = kasr()
    const withIt = resolveModuleSubjectPath('101 ISK > Histology > Epithelium', c)
    const without = resolveModuleSubjectPath('Histology > Epithelium', c)
    assert.equal(withIt.subjectId, without.subjectId)
    assert.ok(withIt.subjectId)
  })

  test('the module may be named rather than coded', () => {
    const c = kasr()
    const out = resolveModuleSubjectPath('Introduction to Structure & Function > Anatomy', c)
    assert.deepEqual(out.chain.map((s) => s.name), ['Anatomy'])
  })

  test('matching ignores case and padding', () => {
    const c = kasr()
    const out = resolveModuleSubjectPath('101 isk >  ANATOMY  > upper limb', c)
    assert.deepEqual(out.chain.map((s) => s.name), ['Anatomy', 'Upper Limb'])
  })

  test('a path that stops matching reports where, and resolves to nothing', () => {
    const c = kasr()
    const out = resolveModuleSubjectPath('101 ISK > Anatomy > Lower Limb', c)
    assert.equal(out.unresolvedSegment, 'Lower Limb')
    assert.equal(out.subjectId, undefined,
      'must not fall back to Anatomy — that files the item a level above where it was meant to go')
    assert.deepEqual(out.chain.map((s) => s.name), ['Anatomy'])
  })

  test('a subject that exists elsewhere does not match at the wrong level', () => {
    const c = kasr()
    // `Upper Limb` is under Anatomy, not directly under the module.
    const out = resolveModuleSubjectPath('101 ISK > Upper Limb', c)
    assert.equal(out.unresolvedSegment, 'Upper Limb')
    assert.equal(out.subjectId, undefined)
  })

  test('a module with no tree resolves nothing rather than throwing', () => {
    const c = kasr()
    const out = resolveModuleSubjectPath('Anatomy', { ...c, courseId: 'no-such-course' })
    assert.equal(out.subjectId, undefined)
    assert.equal(out.unresolvedSegment, 'Anatomy')
  })

  test('an empty path resolves to nothing and says nothing failed', () => {
    const c = kasr()
    const out = resolveModuleSubjectPath('', c)
    assert.equal(out.subjectId, undefined)
    assert.equal(out.unresolvedSegment, undefined)
  })
})

describe('Rendering a path back', () => {
  test('a subject renders the way down to it', () => {
    const c = kasr()
    const plexus = resolveModuleSubjectPath('Anatomy > Upper Limb > Brachial Plexus', c).subjectId!
    assert.equal(moduleSubjectPathOf(c.subjects, plexus, c.moduleId),
      '101 ISK > Anatomy > Upper Limb > Brachial Plexus')
  })

  test('every path in a tree round-trips through resolution', () => {
    const c = kasr()
    const paths = allModuleSubjectPaths(c.subjects, c.moduleId)
    assert.equal(paths.length, 6)
    for (const path of paths) {
      const out = resolveModuleSubjectPath(path, c)
      assert.ok(out.subjectId, `"${path}" should resolve`)
      assert.equal(moduleSubjectPathOf(c.subjects, out.subjectId, c.moduleId), path)
    }
  })

  test('an unknown subject renders as nothing rather than a broken path', () => {
    const c = kasr()
    assert.equal(moduleSubjectPathOf(c.subjects, 'msub-nope', c.moduleId), '')
  })
})
