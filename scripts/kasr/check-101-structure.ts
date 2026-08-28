import { readFileSync } from 'node:fs'
import { parseAcademicOutline } from '../../src/data/academicImport.ts'
import { moduleKey, walkSubjects } from '../../src/data/moduleSubjects.ts'

const KASR = ['101 ISK','102 INT','103 BMS','104 CPS','108 INT']
const md = readFileSync('docs/Kasr-Source-Imports/academic/101-isk-structure.md', 'utf8')
const out = parseAcademicOutline(md, { universityShort: 'KAU', knownModuleIds: KASR })

console.log('errors:', out.errors.length ? out.errors : 'none')
console.log('modules:', out.years[0].courses.map(c => c.moduleId))
console.log('shorthand resolved:', out.resolvedShorthand)
console.log('subject nodes:', out.subjectCount)
const course = out.years[0].courses[0]
const tree = out.subjects[moduleKey('kau', out.years[0].id, course.id)]
for (const top of tree) {
  const kids = top.children ?? []
  console.log(`  ${top.name}  (marks: written EOY ${top.marks.writtenEndOfYear}) — ${kids.length} chapters, ${walkSubjects([top]).length - 1} nodes beneath`)
  for (const k of kids) console.log(`      ${k.name} (${(k.children ?? []).length})`)
}
