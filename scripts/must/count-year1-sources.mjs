#!/usr/bin/env node
/**
 * Read-only MUST Year 1 intake counter.
 *
 * It deliberately accepts the untracked evidence paths as arguments instead of
 * copying course material or the academic package into this branch.
 */
import { readFile, readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'

function option(name, fallback = '') {
  return process.argv.find((arg) => arg.startsWith(`${name}=`))?.slice(name.length + 1) || fallback
}

function parseTsv(text, label) {
  const [header, ...lines] = text.trimEnd().split(/\r?\n/)
  const columns = header.split('\t')
  if (!columns.length || columns.some((column) => !column)) throw new Error(`${label}: missing TSV header`)
  return lines.filter(Boolean).map((line, index) => {
    const values = line.split('\t')
    // csv.DictWriter emitted six audit rows without their final empty
    // `pdf_error` cell. Missing trailing empty cells are legal TSV; a surplus
    // cell is not, so retain strict failure for shifted/expanded records.
    if (values.length > columns.length) throw new Error(`${label}: row ${index + 2} has ${values.length} columns; expected at most ${columns.length}`)
    while (values.length < columns.length) values.push('')
    return Object.fromEntries(columns.map((column, columnIndex) => [column, values[columnIndex]]))
  })
}

async function readTsv(path, label) {
  return parseTsv(await readFile(path, 'utf8'), label)
}

async function countFiles(root) {
  let count = 0
  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name === '.DS_Store' || entry.name.startsWith('._')) continue
      const path = join(directory, entry.name)
      if (entry.isDirectory()) await visit(path)
      else if (entry.isFile()) count += 1
    }
  }
  await visit(root)
  return count
}

const inventoryArg = option('--inventory')
const recoveryArg = option('--recovery')
const packageArg = option('--package')
const desktopArg = option('--desktop-root')
if (![inventoryArg, recoveryArg, packageArg, desktopArg].every(Boolean)) {
  throw new Error('Usage: node scripts/must/count-year1-sources.mjs --inventory=... --recovery=... --package=... --desktop-root=...')
}
const inventoryPath = resolve(inventoryArg)
const recoveryPath = resolve(recoveryArg)
const packagePath = resolve(packageArg)
const desktopRoot = resolve(desktopArg)

const inventory = await readTsv(inventoryPath, 'inventory')
const recovery = await readTsv(recoveryPath, 'recovery')
const intakePackage = JSON.parse(await readFile(packagePath, 'utf8'))
const mustSnapshot = intakePackage.sourceSnapshots?.find((snapshot) => snapshot.universityId === 'must')
const mustUniversity = intakePackage.catalogue?.find((university) => university.id === 'must')
const yearOne = mustUniversity?.years?.find((year) => year.id === 'MUST_Y1')
if (!mustSnapshot || !yearOne) throw new Error('academic package lacks MUST/MUST_Y1 evidence')

const categories = new Set(['06 EOM Exams', '07 EOY Exams', '08 Midterm Exams'])
const keyPattern = /answer|answered|answer key|model answer|solution|solutions|اجاب|إجاب|حل/i
const yearOneRows = inventory.filter((row) => row.year === 'Year 1')
const recordFor = (course) => {
  const rows = yearOneRows.filter((row) => row.module === course.moduleId)
  const eom = rows.filter((row) => row.category === '06 EOM Exams')
  const eoy = rows.filter((row) => row.category === '07 EOY Exams')
  const midterm = rows.filter((row) => row.category === '08 Midterm Exams')
  const exam = rows.filter((row) => categories.has(row.category))
  const mcq = rows.filter((row) => row.category === '05 MCQs')
  const packageFiles = course.provenance?.sourceRefs?.find((source) => source.documentType === 'directory-manifest')?.fileCount ?? 0
  return {
    term: course.term,
    module: course.moduleId,
    packageFiles,
    inventoryFiles: rows.length,
    eom: eom.length,
    eoy: eoy.length,
    midterm: midterm.length,
    exam: exam.length,
    keyedExam: exam.filter((row) => keyPattern.test(row.relative_path)).length,
    mcq: mcq.length,
    questionSources: exam.length + mcq.length,
  }
}

const modules = yearOne.courses.map(recordFor)
const failedYearOne = recovery.filter((row) => row.semester === 'Semester 101' || row.semester === 'Semester 102')
const coveredYearOne = failedYearOne.filter((row) => row.likely_existing_equivalent).length
const missingYearOne = failedYearOne.length - coveredYearOne
const manifestFiles = (await readdir(desktopRoot, { recursive: true })).filter((path) => /(?:^|\/)00 Source Manifest - \d+\.tsv$/.test(path)).sort()
const manifestRows = []
for (const relativePath of manifestFiles) manifestRows.push(...await readTsv(join(desktopRoot, relativePath), relativePath))
const manifestStatuses = Object.fromEntries([...new Set(manifestRows.map((row) => row.status))].sort().map((status) => [status, manifestRows.filter((row) => row.status === status).length]))
const desktopFiles = await countFiles(desktopRoot)

console.log('MUST Year 1 intake readiness — deterministic read-only count')
console.log(`Identity: must | MUST | MUST University | MUST_Y1`)
console.log(`Evidence paths: inventory=${inventoryPath}`)
console.log(`Evidence paths: recovery=${recoveryPath}`)
console.log(`Evidence paths: package=${packagePath}`)
console.log(`Evidence paths: desktop=${desktopRoot}`)
console.log(`Snapshot counts: audit-inventory-records=${inventory.length}; package-fileCount=${mustSnapshot.fileCount}; source-manifest-rows=${manifestRows.length}`)
console.log(`Manifest status rows: ${Object.entries(manifestStatuses).map(([status, count]) => `${status}=${count}`).join('; ')}`)
console.log(`Current desktop files excluding .DS_Store/AppleDouble=${desktopFiles} (current tree; not substituted for either snapshot)`)
console.log(`Year 1 failed rows: failed=${failedYearOne.length}; covered-equivalent=${coveredYearOne}; unresolved=${missingYearOne}`)
console.log('Counting rule: exam=06 EOM Exams + 07 EOY Exams + 08 Midterm Exams; keyed-exam=exam pathname matches answer/answered/answer key/model answer/solution(s)/اجاب/إجاب/حل; question-source=exam + 05 MCQs. These are source-file counts, not extracted question or recovered-key counts.')
console.log('term\tacademic_label\tpackage_files\tinventory_files\teom\teoy\tmidterm\texam\tkeyed_exam\tmcq\tquestion_sources')
for (const module of modules) console.log([module.term, module.module, module.packageFiles, module.inventoryFiles, module.eom, module.eoy, module.midterm, module.exam, module.keyedExam, module.mcq, module.questionSources].join('\t'))
