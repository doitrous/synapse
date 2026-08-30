#!/usr/bin/env node
/** Build a metadata-only MSK 101-1 S1 evidence snapshot. */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const REQUIRED = ['--inventory', '--inspected', '--readiness', '--triage', '--ledger-out', '--provenance-out']
const CATEGORIES = ['05 MCQs', '06 EOM Exams', '07 EOY Exams', '08 Midterm Exams']
const PROCESSED_FAMILY_HASHES = [
  '43a8be3c091e5b7f41820f5e155711519af16ed6a5c7fa05330134cc8c5e4903',
  'fe9862ea46f61535b7856c7d6a8e28907f6ea8a96e104b49be012a8f4733c61d',
  'e7aefe7a41975d7979f00b71cf47ecae7edcf9e39e664c51d09193713bb68231',
  'a6ee40dd89c3933e821f7393fbba1f5ecfb2eb6c5c3dc752c6846fad91ead2de',
  '2b8132c42fd12c48df167c4015f332692c61df0ce49e9145be4793325e4034d0',
  '5da6cd6d288fb46dba2f3ed81b483a20eb6dd2935d65d2da42ea7e3efd1849eb',
  '12bb34d47ef4f248cd224da7063e493d07ab6990e5b6b87455872d9bccd8eb6a',
  '000e8e77fc82ffc6d211870fa3f07cb0fcc334a3b9b64c8596f445670f996e4f',
  'ee0ff6ce7f1dc6353f4aef429bece4e7bcf9e7d5d21ef36ae973c22e0820a0b7',
  '98866db469c5a755eb93cc9f2dbe793078dfdf5f5be96010e774455233fa04fd',
  '4527ea2e576eacc579acad1c0f2456e6db51961ab7c16b260173fd8c956812d6',
]
const SELECTED_CHECKSUM = '228a5361022abbb1572c28e0795f562b3ff4de8d10326873c7cf88a5aa559b02'
const REMAINING_CHECKSUM = '0609d6089c85fe73c083c048c0adfacd72f6c99962d5c4394478b9440366a58a'

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
  const expected = { 'audit-extract-failed': 3, 'audit-not-found': 14, 'empty-text': 15, 'sparse-text': 8, 'substantive-text': 52 }
  if (JSON.stringify(provenance.triageCheckpointRemainingAuditDebt) !== JSON.stringify(expected)) throw new Error('Audit-label triage debt drift')
  if (provenance.liveSourceVerification !== false) throw new Error('Live-source declaration drift')
  console.log('audit-label-static-test=pass remaining_audit_debt=52-substantive/8-sparse/15-empty/14-not-found/3-extract-failed')
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

for (const value of [...PROCESSED_FAMILY_HASHES, SELECTED_CHECKSUM, REMAINING_CHECKSUM, '991', '921', '21']) {
  if (!readiness.includes(value) || !triage.includes(value)) throw new Error(`Readiness/triage evidence missing ${value}`)
}

const selected = inventory.filter((row) => row.module === 'MSK 101-1' && CATEGORIES.includes(row.category))
if (selected.length !== 103) throw new Error(`Expected 103 selected rows; received ${selected.length}`)
const subjects = Object.fromEntries(['Anatomy', 'Histology'].map((subject) => [subject, selected.filter((row) => row.subject === subject).length]))
const categories = Object.fromEntries(CATEGORIES.map((category) => [category, selected.filter((row) => row.category === category).length]))
if (JSON.stringify(subjects) !== JSON.stringify({ Anatomy: 56, Histology: 47 })) throw new Error(`Unexpected subject split: ${JSON.stringify(subjects)}`)
if (JSON.stringify(categories) !== JSON.stringify({ '05 MCQs': 41, '06 EOM Exams': 13, '07 EOY Exams': 0, '08 Midterm Exams': 49 })) throw new Error(`Unexpected category split: ${JSON.stringify(categories)}`)

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
if (selectedHashes.length !== 101 || sha256(selectedHashes.join('\n')) !== SELECTED_CHECKSUM) throw new Error('Selected hash-set drift')
const processedHashes = [...PROCESSED_FAMILY_HASHES].sort()
for (const hash of processedHashes) if (!selectedHashes.includes(hash)) throw new Error(`Processed hash absent: ${hash}`)
const remainingHashes = selectedHashes.filter((hash) => !processedHashes.includes(hash))
if (processedHashes.length !== 11 || remainingHashes.length !== 90 || processedHashes.length + remainingHashes.length !== 101) throw new Error('Processed/remaining reconciliation drift')
if (sha256(remainingHashes.join('\n')) !== REMAINING_CHECKSUM) throw new Error('Remaining checksum drift')

const header = ['relative_path', 'bytes', 'sha256', 'year', 'semester', 'module', 'subject', 'category', 'pdf_pages', 'pdf_error', 'audit_sample_chars', 'audit_sample_status']
const ledger = `${header.join('\t')}\n${ledgerRows.map((row) => header.map((field) => sanitize(row[field])).join('\t')).join('\n')}\n`
const countStatuses = (rows) => Object.fromEntries([...new Set(rows.map((row) => row.audit_sample_status))].sort().map((status) => [status, rows.filter((row) => row.audit_sample_status === status).length]))
const remainingRows = ledgerRows.filter((row) => !processedHashes.includes(row.sha256))
const remainingDebt = countStatuses(remainingRows)
const expectedRemainingDebt = { 'audit-extract-failed': 3, 'audit-not-found': 14, 'empty-text': 15, 'sparse-text': 8, 'substantive-text': 52 }
if (JSON.stringify(remainingDebt) !== JSON.stringify(expectedRemainingDebt)) throw new Error(`Remaining audit debt drift: ${JSON.stringify(remainingDebt)}`)

const provenance = {
  schemaVersion: 'msk101-1-s1-evidence-snapshot/v1',
  scope: 'MSK 101-1 S1 metadata-only durable evidence snapshot; no source content is imported.',
  sourceRoot: '<MUST_ROOT>',
  liveSourceVerification: false,
  selector: { module: 'MSK 101-1', categories: CATEGORIES, inventoryRows: 103, uniqueSha256: 101, duplicatePaths: 2 },
  selectorCounts: { subjects, categories },
  inputSha256: {
    inventoryTsv: fileSha256(options.inventory),
    inspectedTextJson: fileSha256(options.inspected),
    readinessMarkdown: fileSha256(options.readiness),
    triageMarkdown: fileSha256(options.triage),
  },
  inputMetadata: { inventoryDeclaredFileMetadata: true, inspectedTextDiagnostics: 'sample-length classification only; raw samples are excluded' },
  selectedInventory: { inventoryMetadataRows: ledgerRows.length, uniqueSha256: selectedHashes.length, sortedNewlineSha256: SELECTED_CHECKSUM },
  auditSampleStatusCounts: countStatuses(ledgerRows),
  processedFamilies: { sha256: processedHashes, uniqueSha256: processedHashes.length },
  completedSourceCoverage: [
    { sha256: PROCESSED_FAMILY_HASHES[0], sourcePages: 3, renderedReadPages: '1-3', printedPromptObservations: 21, printedKeyObservations: 12, acceptedSourceHandles: 3, newConceptsAfterPriorMskCollapse: 3, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[1], sourcePages: 5, renderedReadPages: '1-5', printedPromptObservations: 24, printedKeyObservations: 23, acceptedSourceHandles: 4, newConceptsAfterPriorMskCollapse: 1, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[2], sourcePages: 5, renderedReadPages: '1-5', printedPromptObservations: 24, printedKeyObservations: 0, exactPromptSequenceDuplicateOf: PROCESSED_FAMILY_HASHES[1], familyQuestionDelta: 0, familyAnswerDelta: 0, acceptedSourceHandles: 0, searchesRun: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[3], sourcePages: 14, renderedReadPages: '1-14', printedPromptObservations: 216, printedKeyObservations: 216, acceptedSourceHandles: 10, searchesRun: 40, liveHits: 0, pendingHits: 1, newConceptsAfterPriorMskCollapse: 9, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[4], sourcePages: 12, renderedReadPages: '1-12', printedPromptObservations: 43, printedKeyObservations: 43, acceptedSourceHandles: 7, searchesRun: 28, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 5, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[5], sourcePages: 23, renderedReadPages: '1-23', printedPromptObservations: 141, printedKeyObservations: 141, acceptedSourceHandles: 5, searchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 2, sourceProcessed: true, preservedSourceDefects: ['two distinct prompts numbered 41', 'two corresponding key entries numbered 41'] },
    { sha256: PROCESSED_FAMILY_HASHES[6], sourcePages: 11, renderedReadPages: '1-11', printedPromptObservations: 63, printedKeyObservations: 37, acceptedSourceHandles: 4, searchesRun: 16, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, sourceAbsentAnswers: 26 },
    { sha256: PROCESSED_FAMILY_HASHES[7], sourcePages: 20, renderedReadPages: '1-20', teachingPages: '5-8', printedPromptObservations: 78, printedKeyObservations: 78, acceptedSourceHandles: 4, searchesRun: 16, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[8], sourcePages: 34, renderedReadPages: '1-34', printedPromptObservations: 247, printedKeyObservations: 213, acceptedSourceHandles: 5, searchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, sourceAbsentAnswers: 34, preservedSourceDefects: ['two distinct extra-bank prompts numbered 80', 'extra-bank labels 128 and 129 absent'] },
    { sha256: PROCESSED_FAMILY_HASHES[9], sourcePages: 32, renderedReadPages: '1-32', questionPages: '1-25', keyPages: '26-32', printedPromptObservations: 111, printedKeyObservations: 111, acceptedSourceHandles: 5, searchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[10], sourcePages: 13, renderedReadPages: '1-13', printedPromptObservations: 47, printedKeyObservations: 47, answerMarkingPages: '1-13', acceptedSourceHandles: 5, searchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true },
  ],
  triageCumulative: { printedPromptObservations: 991, printedKeyObservations: 921, namedConceptsAssigned: 21, liveHits: 0, pendingHits: 1, newConcepts: 20 },
  remaining: { inventoryMetadataRows: remainingRows.length, uniqueSha256: remainingHashes.length, sortedNewlineSha256: REMAINING_CHECKSUM, auditSampleStatusCounts: remainingDebt },
  triageCheckpointRemainingAuditDebt: remainingDebt,
  reconciliation: { selectedUniqueSha256: 101, processedUniqueSha256: processedHashes.length, remainingUniqueSha256: remainingHashes.length, processedPlusRemaining: processedHashes.length + remainingHashes.length },
}

const provenanceText = `${JSON.stringify(provenance, null, 2)}\n`
requireSafeOutput(ledger, 'ledger')
requireSafeOutput(provenanceText, 'provenance')
writeFileSync(options['ledger-out'], ledger, 'utf8')
writeFileSync(options['provenance-out'], provenanceText, 'utf8')
console.log(`snapshot-msk101-1-evidence: rows=${ledgerRows.length}; unique_hashes=${selectedHashes.length}; duplicate_paths=${ledgerRows.length - selectedHashes.length}; processed=${processedHashes.length}; remaining=${remainingHashes.length}; remaining_sha256=${REMAINING_CHECKSUM}; live_source_verification=false`)
