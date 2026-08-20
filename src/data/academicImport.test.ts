import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { parseAcademicOutline } from './academicImport.ts'
import { moduleKey } from './moduleSubjects.ts'

const KASR = ['101 ISK', '102 INT', '103 BMS', '104 CPS', '108 INT']

describe('Reading an academic outline', () => {
  test('years, terms and modules still parse as they did', () => {
    const out = parseAcademicOutline(`# Year 1
## Term 1
- Foundations of Medicine [MED 01]
- Anatomy & Physiology [ANA 02]
## Term 2
- Cell & Molecular Biology [CEL 03]`)
    assert.deepEqual(out.errors, [])
    assert.equal(out.yearsAdded, 1)
    assert.equal(out.terms, 2)
    assert.equal(out.modules, 3)
    assert.deepEqual(out.years[0].courses.map((c) => c.moduleId), ['MED 01', 'ANA 02', 'CEL 03'])
    assert.deepEqual(out.years[0].courses.map((c) => c.term), ['Term 1', 'Term 1', 'Term 2'])
  })

  test('a module with no ID gets one generated', () => {
    const out = parseAcademicOutline('# Year 1\n- Foundations of Medicine')
    assert.deepEqual(out.errors, [])
    assert.equal(out.years[0].courses[0].moduleId.length > 0, true)
  })
})

describe('Subjects inside a module', () => {
  const outline = `# Year 1
## Term 1
- Introduction to Structure & Function [101 ISK]
  - Anatomy (written EOM 20, written EOY 30, practical EOY 15)
    - Upper Limb
      - Brachial Plexus
      - Cubital Fossa
    - Embryology
  - Histology (written EOY 25)
- Integrated Basic Sciences [102 INT]
  - Biochemistry
  - Physiology`

  test('nesting follows indentation, as deep as it goes', () => {
    const out = parseAcademicOutline(outline, { universityShort: 'KAU', knownModuleIds: KASR })
    assert.deepEqual(out.errors, [])
    assert.equal(out.modules, 2)
    assert.equal(out.subjectCount, 8)

    const isk = out.years[0].courses.find((c) => c.moduleId === '101 ISK')!
    const tree = out.subjects[moduleKey('kau', out.years[0].id, isk.id)]
    assert.deepEqual(tree.map((s) => s.name), ['Anatomy', 'Histology'])

    const anatomy = tree[0]
    assert.deepEqual(anatomy.children?.map((s) => s.name), ['Upper Limb', 'Embryology'])
    assert.deepEqual(anatomy.children?.[0].children?.map((s) => s.name), ['Brachial Plexus', 'Cubital Fossa'])
    assert.equal(anatomy.children?.[1].children, undefined)
  })

  test('marks land on the module\'s direct subjects', () => {
    const out = parseAcademicOutline(outline, { universityShort: 'KAU', knownModuleIds: KASR })
    const isk = out.years[0].courses.find((c) => c.moduleId === '101 ISK')!
    const tree = out.subjects[moduleKey('kau', out.years[0].id, isk.id)]
    assert.deepEqual(tree[0].marks, {
      writtenEndOfModule: 20, writtenEndOfYear: 30,
      practicalEndOfModule: 0, practicalEndOfYear: 15,
    })
    assert.equal(tree[1].marks.writtenEndOfYear, 25)
    // A name is not left carrying its own mark syntax.
    assert.equal(tree[0].name, 'Anatomy')
  })

  test('marks on a nested subject are refused, not silently dropped', () => {
    const out = parseAcademicOutline(`# Year 1
- Module [101 ISK]
  - Anatomy
    - Upper Limb (written EOY 10)`, { universityShort: 'KAU', knownModuleIds: KASR })
    assert.equal(out.errors.length, 1)
    assert.match(out.errors[0], /only a module's direct subjects carry marks/)
  })

  test('each module keeps its own subjects', () => {
    const out = parseAcademicOutline(outline, { universityShort: 'KAU', knownModuleIds: KASR })
    const int = out.years[0].courses.find((c) => c.moduleId === '102 INT')!
    const tree = out.subjects[moduleKey('kau', out.years[0].id, int.id)]
    assert.deepEqual(tree.map((s) => s.name), ['Biochemistry', 'Physiology'])
  })

  test('a subject with no module above it is an error', () => {
    const out = parseAcademicOutline('# Year 1\n## Term 1\n  - Anatomy')
    assert.equal(out.errors.length, 1)
    assert.match(out.errors[0], /has no module above it/)
  })

  test('skipping an indent level is an error rather than a guess', () => {
    const out = parseAcademicOutline(`# Year 1
- Module [101 ISK]
      - Way Too Deep`, { universityShort: 'KAU', knownModuleIds: KASR })
    assert.equal(out.errors.length, 1)
    assert.match(out.errors[0], /indented past its parent/)
  })

  test('tabs indent the same as two spaces', () => {
    const out = parseAcademicOutline('# Year 1\n- Module [101 ISK]\n\t- Anatomy\n\t\t- Upper Limb',
      { universityShort: 'KAU', knownModuleIds: KASR })
    assert.deepEqual(out.errors, [])
    const tree = out.subjects[moduleKey('kau', out.years[0].id, out.years[0].courses[0].id)]
    assert.deepEqual(tree[0].children?.map((s) => s.name), ['Upper Limb'])
  })
})

describe('An existing module ID wins over a shorthand', () => {
  test('a bare 101 resolves onto the catalogue\'s "101 ISK"', () => {
    const out = parseAcademicOutline('# Year 1\n- Introduction [101]',
      { universityShort: 'KAU', knownModuleIds: KASR })
    assert.deepEqual(out.errors, [])
    assert.equal(out.years[0].courses[0].moduleId, '101 ISK')
    assert.deepEqual(out.resolvedShorthand, [{ wrote: '101', resolvedTo: '101 ISK' }])
  })

  test('the full ID is taken as itself and not duplicated', () => {
    const out = parseAcademicOutline('# Year 1\n- Introduction [101 ISK]',
      { universityShort: 'KAU', knownModuleIds: KASR })
    assert.equal(out.years[0].courses[0].moduleId, '101 ISK')
    assert.deepEqual(out.resolvedShorthand, [])
  })

  test('an ambiguous shorthand is refused rather than guessed', () => {
    // Two modules share the head "INT" in Kasr's own catalogue shape.
    const out = parseAcademicOutline('# Year 1\n- Something [INT]',
      { universityShort: 'KAU', knownModuleIds: ['INT 102', 'INT 108'] })
    assert.equal(out.errors.length, 1)
    assert.match(out.errors[0], /could be INT 102 or INT 108/)
  })

  test('an unknown ID is still accepted as a new module', () => {
    const out = parseAcademicOutline('# Year 1\n- New Module [205 NEU]',
      { universityShort: 'KAU', knownModuleIds: KASR })
    assert.deepEqual(out.errors, [])
    assert.equal(out.years[0].courses[0].moduleId, '205 NEU')
  })
})

describe('The Kasr Year 1 structure the corpus states', () => {
  test('parses with the subjects its NOTE folders declare', () => {
    const out = parseAcademicOutline(`# Year 1
## Term 1
- Introduction to Structure & Function [101]
  - Anatomy
  - Histology
- Integrated Basic Sciences [102]
  - Biochemistry
  - Physiology
- Basic Medical Sciences [103]
  - Anatomy
  - Biochemistry
  - Histology
  - Physiology
- Cardiopulmonary System [104]
  - Anatomy
  - Histology
  - Physiology
- Integrated Pathology & Pharmacology [108]
  - Pathology
  - Pharmacology`, { universityShort: 'KAU', knownModuleIds: KASR })

    assert.deepEqual(out.errors, [])
    assert.equal(out.modules, 5)
    // 101 ISK 2, 102 INT 2, 103 BMS 4, 104 CPS 3, 108 INT 2.
    assert.equal(out.subjectCount, 13)
    assert.deepEqual(
      out.years[0].courses.map((c) => c.moduleId),
      ['101 ISK', '102 INT', '103 BMS', '104 CPS', '108 INT'],
      'every shorthand resolved onto the catalogue ID rather than minting a rival',
    )
    assert.equal(out.resolvedShorthand.length, 5)
  })
})
