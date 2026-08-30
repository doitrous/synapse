#!/usr/bin/env node
/** Build a metadata-only FHB 102-2 S1 evidence snapshot. */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const REQUIRED = ['--inventory', '--inspected', '--readiness', '--triage', '--ledger-out', '--provenance-out']
const CATEGORIES = ['05 MCQs', '06 EOM Exams', '07 EOY Exams', '08 Midterm Exams']
const EXAM_CATEGORIES = new Set(['06 EOM Exams', '07 EOY Exams', '08 Midterm Exams'])
const KEY_PATTERN = /answer|answered|answer key|model answer|solution|solutions|اجاب|إجاب|حل/i
const PROCESSED_FAMILY_HASHES = []
const SELECTED_CHECKSUM = '3d7282909b1be0ee1a4b3ff7ae16d923505ab40926a44d97090c2e287e445313'
const REMAINING_CHECKSUM = SELECTED_CHECKSUM
const FIRST_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/00 Module-wide/06 EOM Exams/EOM MCQs - 1)FHB 102-2 Online Final Exam - PentaGram.pdf',
  sha256: 'dd800ea485e532ad4b5fedc7070c3e410b1d3bf13b7589c2fd79b38287704470',
  pages: 33,
  sourceProcessed: false,
}

function option(name) {
  const prefix = `${name}=`
  const value = process.argv.find((item) => item.startsWith(prefix))?.slice(prefix.length)
  if (!value) throw new Error(`Missing ${name}`)
  return resolve(value)
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex')
}

function fileSha256(path) {
  return sha256(readFileSync(path))
}

function parseTsv(path, label) {
  const [header, ...lines] = readFileSync(path, 'utf8').trimEnd().split(/\r?\n/)
  const columns = header.split('\t')
  if (!header || columns.some((column) => !column)) throw new Error(`${label}: invalid TSV header`)
  return lines.filter(Boolean).map((line, index) => {
    const values = line.split('\t')
    if (values.length > columns.length) throw new Error(`${label}: row ${index + 2} has too many columns`)
    while (values.length < columns.length) values.push('')
    return Object.fromEntries(columns.map((column, columnIndex) => [column, values[columnIndex]]))
  })
}

function sanitize(value) {
  return String(value ?? '').replace(/[\t\r\n]+/g, ' ').trim()
}

function inspectedIndex(inspected) {
  const result = new Map()
  for (const [path, diagnostic] of Object.entries(inspected)) {
    const normalized = path.replace(/\\/g, '/')
    const marker = '/MUST/'
    const index = normalized.lastIndexOf(marker)
    if (index >= 0) result.set(normalized.slice(index + marker.length), diagnostic)
  }
  return result
}

function auditMetadata(diagnostic) {
  if (!diagnostic) return { sampleChars: 0, status: 'audit-not-found' }
  const sample = String(diagnostic.sample ?? '')
  const contentChars = sample.replace(/[\s\f]/g, '').length
  if (diagnostic.error || (diagnostic.returncode ?? 0) !== 0) return { sampleChars: sample.length, status: 'audit-extract-failed' }
  if (contentChars === 0) return { sampleChars: sample.length, status: 'empty-text' }
  return { sampleChars: sample.length, status: contentChars < 500 ? 'sparse-text' : 'substantive-text' }
}

function requireSafeOutput(value, label) {
  if (/\/Users\/|doitrous/i.test(value)) throw new Error(`${label}: privacy scan failed`)
}

function runMetadataOnlyStaticTest() {
  const script = readFileSync(new URL(import.meta.url), 'utf8')
  const forbidden = ['child_' + 'process', 'pdf' + 'totext', 'open' + 'Sync', 'stat' + 'Sync', 'realpath' + 'Sync', '--' + 'root']
  for (const token of forbidden) if (script.includes(token)) throw new Error(`Metadata-only static test: forbidden token ${token}`)
  if (!script.includes("sourceRoot: '<MUST_ROOT>'") || !script.includes('liveSourceVerification: false')) throw new Error('Metadata-only declarations missing')
  console.log('metadata-only-static-test=pass source_open=absent source_stat=absent source_read=absent extractor=absent')
}

function selfTestValue(name) {
  const prefix = `${name}=`
  return process.argv.find((item) => item.startsWith(prefix))?.slice(prefix.length)
}

function runAuditLabelStaticTest() {
  const ledgerPath = selfTestValue('--ledger')
  const provenancePath = selfTestValue('--provenance')
  if (!ledgerPath || !provenancePath) throw new Error('Audit-label self-test requires --ledger and --provenance')
  const ledger = readFileSync(resolve(ledgerPath), 'utf8')
  const provenance = JSON.parse(readFileSync(resolve(provenancePath), 'utf8'))
  if (!ledger.startsWith('relative_path\tbytes\tsha256\tyear\tsemester\tmodule\tsubject\tcategory\tpdf_pages\tpdf_error\taudit_sample_chars\taudit_sample_status\n')) throw new Error('Ledger header mismatch')
  const expected = { 'audit-extract-failed': 2, 'audit-not-found': 11, 'empty-text': 16, 'sparse-text': 25, 'substantive-text': 42 }
  if (JSON.stringify(provenance.triageCheckpointRemainingAuditDebt) !== JSON.stringify(expected)) throw new Error('Audit-label triage debt drift')
  if (provenance.liveSourceVerification !== false) throw new Error('Live-source declaration drift')
  console.log('audit-label-static-test=pass remaining_audit_debt=42-substantive/25-sparse/16-empty/11-not-found/2-extract-failed')
}

if (process.argv.includes('--self-test-metadata-only') || process.argv.includes('--self-test-audit-labels')) {
  if (process.argv.includes('--self-test-metadata-only')) runMetadataOnlyStaticTest()
  if (process.argv.includes('--self-test-audit-labels')) runAuditLabelStaticTest()
  process.exit(0)
}

const options = Object.fromEntries(REQUIRED.map((name) => [name.slice(2), option(name)]))
const inventory = parseTsv(options.inventory, 'inventory')
const inspected = JSON.parse(readFileSync(options.inspected, 'utf8'))
const byPath = inspectedIndex(inspected)
const readiness = readFileSync(options.readiness, 'utf8')
const triage = readFileSync(options.triage, 'utf8')

for (const value of [SELECTED_CHECKSUM, REMAINING_CHECKSUM, FIRST_SOURCE.relativePath, FIRST_SOURCE.sha256]) {
  if (!readiness.includes(value) || !triage.includes(value)) throw new Error(`Readiness/triage evidence missing ${value}`)
}
if (!readiness.includes('96 paths / 94 unique SHA-256s') || !triage.includes('96 inventory paths / 94 unique SHA-256s')) {
  throw new Error('Readiness/triage evidence missing selected-set path/hash boundary')
}
if (!readiness.includes('checkpointed-incomplete') || !triage.includes('incomplete read-only S1 checkpoint')) throw new Error('Bootstrap blocker state missing')

const selected = inventory.filter((row) => row.module === 'FHB 102-2' && CATEGORIES.includes(row.category))
if (selected.length !== 96) throw new Error(`Expected 96 selected rows; received ${selected.length}`)
const subjectNames = ['00 Module-wide', 'Microbiology', 'Parasitology', 'Pharmacology']
const subjects = Object.fromEntries(subjectNames.map((subject) => [subject, selected.filter((row) => row.subject === subject).length]))
const categories = Object.fromEntries(CATEGORIES.map((category) => [category, selected.filter((row) => row.category === category).length]))
if (JSON.stringify(subjects) !== JSON.stringify({ '00 Module-wide': 5, Microbiology: 28, Parasitology: 21, Pharmacology: 42 })) throw new Error(`Unexpected subject split: ${JSON.stringify(subjects)}`)
if (JSON.stringify(categories) !== JSON.stringify({ '05 MCQs': 45, '06 EOM Exams': 26, '07 EOY Exams': 0, '08 Midterm Exams': 25 })) throw new Error(`Unexpected category split: ${JSON.stringify(categories)}`)

const examRows = selected.filter((row) => EXAM_CATEGORIES.has(row.category))
const prioritySignal = {
  assessmentCategoryPaths: examRows.length,
  answerKeyLabelledAssessmentPaths: examRows.filter((row) => KEY_PATTERN.test(row.relative_path)).length,
  candidateQuestionSourcePaths: selected.length,
}
if (JSON.stringify(prioritySignal) !== JSON.stringify({ assessmentCategoryPaths: 51, answerKeyLabelledAssessmentPaths: 0, candidateQuestionSourcePaths: 96 })) throw new Error(`Unexpected priority signal: ${JSON.stringify(prioritySignal)}`)

const ledgerRows = selected.map((row) => {
  const diagnostic = auditMetadata(byPath.get(row.relative_path))
  return {
    relative_path: row.relative_path,
    bytes: row.bytes,
    sha256: row.sha256,
    year: row.year,
    semester: row.semester,
    module: row.module,
    subject: row.subject,
    category: row.category,
    pdf_pages: row.pdf_pages,
    pdf_error: row.pdf_error,
    audit_sample_chars: diagnostic.sampleChars,
    audit_sample_status: diagnostic.status,
  }
})

const selectedHashes = [...new Set(ledgerRows.map((row) => row.sha256))].sort()
if (selectedHashes.length !== 94 || sha256(selectedHashes.join('\n')) !== SELECTED_CHECKSUM) throw new Error('Selected hash-set drift')
const processedHashes = [...PROCESSED_FAMILY_HASHES].sort()
const remainingHashes = selectedHashes.filter((hash) => !processedHashes.includes(hash))
if (processedHashes.length !== 0 || remainingHashes.length !== 94 || processedHashes.length + remainingHashes.length !== 94) throw new Error('Processed/remaining reconciliation drift')
if (sha256(remainingHashes.join('\n')) !== REMAINING_CHECKSUM) throw new Error('Remaining checksum drift')

const header = ['relative_path', 'bytes', 'sha256', 'year', 'semester', 'module', 'subject', 'category', 'pdf_pages', 'pdf_error', 'audit_sample_chars', 'audit_sample_status']
const ledger = `${header.join('\t')}\n${ledgerRows.map((row) => header.map((field) => sanitize(row[field])).join('\t')).join('\n')}\n`
const countStatuses = (rows) => Object.fromEntries([...new Set(rows.map((row) => row.audit_sample_status))].sort().map((status) => [status, rows.filter((row) => row.audit_sample_status === status).length]))
const remainingRows = ledgerRows.filter((row) => !processedHashes.includes(row.sha256))
const remainingDebt = countStatuses(remainingRows)
const expectedRemainingDebt = { 'audit-extract-failed': 2, 'audit-not-found': 11, 'empty-text': 16, 'sparse-text': 25, 'substantive-text': 42 }
if (JSON.stringify(remainingDebt) !== JSON.stringify(expectedRemainingDebt)) throw new Error(`Remaining audit debt drift: ${JSON.stringify(remainingDebt)}`)

const duplicateFamilies = [...new Set(ledgerRows.map((row) => row.sha256))]
  .map((hash) => ({ sha256: hash, relativePaths: ledgerRows.filter((row) => row.sha256 === hash).map((row) => row.relative_path) }))
  .filter((family) => family.relativePaths.length > 1)
if (duplicateFamilies.length !== 1 || duplicateFamilies[0].sha256 !== '9d8fd6b6b5d51ccc5049efc430daa26267f57ac04dc11717686cfad21af7edf1' || duplicateFamilies[0].relativePaths.length !== 3) throw new Error('Duplicate-family drift')

const provenance = {
  schemaVersion: 'fhb102-2-s1-evidence-snapshot/v1',
  scope: 'FHB 102-2 S1 metadata-only durable evidence snapshot; no source content is imported.',
  sourceRoot: '<MUST_ROOT>',
  liveSourceVerification: false,
  approvalState: 'checkpointed-incomplete',
  selector: { module: 'FHB 102-2', categories: CATEGORIES, inventoryRows: 96, uniqueSha256: 94, duplicatePaths: 2 },
  selectorCounts: { subjects, categories },
  prioritySignal,
  inputSha256: {
    inventoryTsv: fileSha256(options.inventory),
    inspectedTextJson: fileSha256(options.inspected),
    readinessMarkdown: fileSha256(options.readiness),
    triageMarkdown: fileSha256(options.triage),
  },
  inputMetadata: { inventoryDeclaredFileMetadata: true, inspectedTextDiagnostics: 'sample-length classification only; raw samples are excluded' },
  selectedInventory: { inventoryMetadataRows: ledgerRows.length, uniqueSha256: selectedHashes.length, sortedNewlineSha256: SELECTED_CHECKSUM },
  auditSampleStatusCounts: countStatuses(ledgerRows),
  duplicateFamilies,
  processedFamilies: { sha256: processedHashes, uniqueSha256: processedHashes.length },
  completedSourceCoverage: [],
  triageCumulative: { printedPromptObservations: 0, printedKeyObservations: 0, namedConceptsAssigned: 0, liveHits: 0, pendingHits: 0, newConcepts: 0 },
  firstSourceCandidate: FIRST_SOURCE,
  remaining: { inventoryMetadataRows: remainingRows.length, uniqueSha256: remainingHashes.length, sortedNewlineSha256: REMAINING_CHECKSUM, auditSampleStatusCounts: remainingDebt },
  triageCheckpointRemainingAuditDebt: remainingDebt,
  reconciliation: { selectedUniqueSha256: 94, processedUniqueSha256: processedHashes.length, remainingUniqueSha256: remainingHashes.length, processedPlusRemaining: processedHashes.length + remainingHashes.length },
}

const provenanceText = `${JSON.stringify(provenance, null, 2)}\n`
requireSafeOutput(ledger, 'ledger')
requireSafeOutput(provenanceText, 'provenance')
writeFileSync(options['ledger-out'], ledger, 'utf8')
writeFileSync(options['provenance-out'], provenanceText, 'utf8')
console.log(`snapshot-fhb102-2-evidence: rows=${ledgerRows.length}; unique_hashes=${selectedHashes.length}; duplicate_paths=${ledgerRows.length - selectedHashes.length}; processed=${processedHashes.length}; remaining=${remainingHashes.length}; remaining_sha256=${REMAINING_CHECKSUM}; live_source_verification=false`)
