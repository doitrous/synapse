#!/usr/bin/env node
/**
 * Build the durable, metadata-only FHB 101 S1 evidence snapshot.
 *
 * The snapshot reads only pinned audit, recovery, and academic-package metadata.
 * It never opens, stats, hashes, extracts, or otherwise accesses Desktop source
 * files. `<MUST_ROOT>` is a provenance token, not a live filesystem location.
 */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const REQUIRED = [
  '--inventory', '--inspected', '--recovery', '--coverage-validation', '--package',
  '--readiness', '--triage', '--ledger-out', '--provenance-out',
]
const CATEGORIES = ['05 MCQs', '06 EOM Exams', '07 EOY Exams', '08 Midterm Exams']
const PROCESSED_FAMILY_HASHES = [
  'a87b09c5f33157263fb623fcfbc2eeb315f90633fdd1a5a8f9244a67c6313e95',
  'a569f3a6960887f8852b74db3a73a828f642b4857e68ccad9c81db8a3993fbec',
  '349ca7a6f8d6fb2622384456c8ecc03a3b8088c1cd09b8fd58d41af4eaa8b54f',
  '3185bf1cbb970c279afdc5bc0a36f9aef98fc50198a30619e940198105b08d6a',
  'e52ac69820eff5407e033622c6163130ce2e52f1624eade5a46ee3e3fb266bcb',
  '5606f1829f2868ca94669174e185a385aebc3ba38c913b1921cfc769add2ed56',
  '14aca09deac964563bef09fe2f12b651db40c7d789bad98527d56f90d74f8668',
  '441ea28e2179fa0488d8afed03d595aae31e97087607c13d16c929fe0db62906',
]

function argument(name) {
  const prefix = `${name}=`
  const value = process.argv.find((item) => item.startsWith(prefix))?.slice(prefix.length)
  if (!value) throw new Error(`Missing ${name}; usage: node scripts/must/snapshot-fhb101-evidence.mjs ${REQUIRED.map((item) => `${item}=...`).join(' ')}`)
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

function sourceToken(path) {
  const normalized = String(path ?? '').replace(/\\/g, '/')
  const marker = '/MUST/'
  const markerIndex = normalized.lastIndexOf(marker)
  if (markerIndex < 0) throw new Error('Recovery metadata has no MUST source-root segment')
  return `<MUST_ROOT>/${normalized.slice(markerIndex + marker.length)}`
}

function buildInspectedIndex(inspected) {
  const index = new Map()
  for (const [path, diagnostic] of Object.entries(inspected)) {
    const normalized = path.replace(/\\/g, '/')
    const marker = '/MUST/'
    const markerIndex = normalized.lastIndexOf(marker)
    if (markerIndex >= 0) index.set(normalized.slice(markerIndex + marker.length), diagnostic)
  }
  return index
}

function auditMetadata(diagnostic) {
  if (!diagnostic) return { sampleChars: 0, status: 'audit-not-found' }
  const sample = String(diagnostic.sample ?? '')
  const sampleContentChars = sample.replace(/[\s\f]/g, '').length
  if (diagnostic.error || (diagnostic.returncode ?? 0) !== 0) return { sampleChars: sample.length, status: 'audit-extract-failed' }
  if (sampleContentChars === 0) return { sampleChars: sample.length, status: 'empty-text' }
  return { sampleChars: sample.length, status: sampleContentChars < 500 ? 'sparse-text' : 'substantive-text' }
}

function expectedTriageState(readiness, triage) {
  for (const hash of PROCESSED_FAMILY_HASHES) {
    if (!readiness.includes(hash) || !triage.includes(hash)) throw new Error(`Triage evidence does not pin processed family hash ${hash}`)
  }
  const remainingChecksum = 'dbcea142ee933fda95f915ee8801a89ada6031098c0942e378097988d42bb6da'
  if (!readiness.includes(remainingChecksum) || !triage.includes(remainingChecksum)) throw new Error('Triage/readiness evidence does not pin the selected remaining checksum')
  return remainingChecksum
}

function packageFhbStructure(packageDocument) {
  const university = packageDocument.catalogue?.find((item) => item.id === 'must')
  const year = university?.years?.find((item) => item.id === 'MUST_Y1')
  const course = year?.courses?.find((item) => item.moduleId === 'FHB 101')
  const source = course?.provenance?.sourceRefs?.find((item) => item.documentType === 'directory-manifest')
  if (!course || !source?.originalPath) throw new Error('Academic package lacks MUST_Y1/FHB 101 directory-manifest structure')
  return {
    universityId: university.id,
    yearId: year.id,
    courseId: course.id,
    moduleId: course.moduleId,
    term: course.term,
    evidenceState: course.evidenceState,
    originalPath: source.originalPath,
    directoryManifestSha256: source.sha256,
    fileCount: source.fileCount,
  }
}

function requireSafeOutput(value, label) {
  if (/\/Users\/|doitrous/i.test(value)) throw new Error(`${label}: privacy scan failed before write`)
}

function runMetadataOnlyStaticTest() {
  const script = readFileSync(new URL(import.meta.url), 'utf8')
  const forbiddenTokens = [
    'child_' + 'process', 'pdf' + 'totext', 'open' + 'Sync', 'stat' + 'Sync', 'fstat' + 'Sync',
    'read' + 'Sync', 'realpath' + 'Sync', '--' + 'root', '--desktop' + '-root',
  ]
  for (const forbidden of forbiddenTokens) {
    if (script.includes(forbidden)) throw new Error(`Metadata-only static test: forbidden token ${forbidden}`)
  }
  if (!script.includes("sourceRoot: '<MUST_ROOT>'") || !script.includes('liveSourceVerification: false')) throw new Error('Metadata-only static test: provenance declarations missing')
  console.log(['metadata-only-static-test=pass', 'source_open=absent', 'source_stat=absent', 'source_read=absent', 'extractor=absent'].join(' '))
}

function optionValue(name) {
  const prefix = `${name}=`
  return process.argv.find((item) => item.startsWith(prefix))?.slice(prefix.length)
}

function runAuditLabelStaticTest() {
  const ledgerPath = optionValue('--ledger')
  const provenancePath = optionValue('--provenance')
  if (!ledgerPath || !provenancePath) throw new Error('Usage: --self-test-audit-labels --ledger=... --provenance=...')
  const script = readFileSync(new URL(import.meta.url), 'utf8')
  const ledger = readFileSync(resolve(ledgerPath), 'utf8')
  const provenance = readFileSync(resolve(provenancePath), 'utf8')
  const joined = `${script}\n${ledger}\n${provenance}`
  for (const forbidden of ['cur' + 'rent_' + 'text_chars', 'text_' + 'status', 'cur' + 'rent' + 'TextChars', 'live' + 'TextStatus']) {
    if (joined.includes(forbidden)) throw new Error(`Audit-label static test: forbidden label ${forbidden}`)
  }
  if (!ledger.startsWith('relative_path\tbytes\tsha256\tyear\tsemester\tmodule\tsubject\tcategory\tpdf_pages\tpdf_error\taudit_sample_chars\taudit_sample_status\n')) throw new Error('Audit-label static test: ledger header mismatch')
  const parsed = JSON.parse(provenance)
  if (!parsed.auditSampleStatusCounts || !parsed.triageCheckpointRemainingExtractionDebt || parsed.liveSourceVerification !== false) throw new Error('Audit-label static test: provenance declarations missing')
  if (parsed.triageCheckpointRemainingExtractionDebt.emptyTextRows !== 39 || parsed.triageCheckpointRemainingExtractionDebt.sparseTextRows !== 6) throw new Error('Audit-label static test: triage debt drift')
  console.log('audit-label-static-test=pass forbidden-temporal-text-labels=absent audit_sample_labels=present triage_debt=39-empty/6-sparse')
}

if (process.argv.includes('--self-test-metadata-only') || process.argv.includes('--self-test-audit-labels')) {
  if (process.argv.includes('--self-test-metadata-only')) runMetadataOnlyStaticTest()
  if (process.argv.includes('--self-test-audit-labels')) runAuditLabelStaticTest()
  process.exit(0)
}

const options = Object.fromEntries(REQUIRED.map((name) => [name.slice(2), argument(name)]))
const inventory = parseTsv(options.inventory, 'inventory')
const inspected = JSON.parse(readFileSync(options.inspected, 'utf8'))
const inspectedByRelativePath = buildInspectedIndex(inspected)
const recovery = parseTsv(options.recovery, 'recovery')
const coverageValidation = parseTsv(options['coverage-validation'], 'coverage validation')
const academicPackage = JSON.parse(readFileSync(options.package, 'utf8'))
const readiness = readFileSync(options.readiness, 'utf8')
const triage = readFileSync(options.triage, 'utf8')
const expectedRemainingChecksum = expectedTriageState(readiness, triage)

const selected = inventory.filter((row) => row.module === 'FHB 101' && CATEGORIES.includes(row.category))
if (selected.length !== 115) throw new Error(`Expected 115 selected rows; received ${selected.length}`)
const subjects = Object.fromEntries(['Anatomy', 'Histology', 'Physiology'].map((subject) => [subject, selected.filter((row) => row.subject === subject).length]))
const categories = Object.fromEntries(CATEGORIES.map((category) => [category, selected.filter((row) => row.category === category).length]))
if (JSON.stringify(subjects) !== JSON.stringify({ Anatomy: 27, Histology: 57, Physiology: 31 })) throw new Error(`Unexpected subject split: ${JSON.stringify(subjects)}`)
if (JSON.stringify(categories) !== JSON.stringify({ '05 MCQs': 48, '06 EOM Exams': 21, '07 EOY Exams': 0, '08 Midterm Exams': 46 })) throw new Error(`Unexpected category split: ${JSON.stringify(categories)}`)

const ledgerRows = selected.map((row) => {
  const diagnostic = auditMetadata(inspectedByRelativePath.get(row.relative_path))
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
if (selectedHashes.length !== 106) throw new Error(`Expected 106 selected hashes; received ${selectedHashes.length}`)
const selectedChecksum = sha256(selectedHashes.join('\n'))
const processedHashes = [...PROCESSED_FAMILY_HASHES].sort()
for (const hash of processedHashes) if (!selectedHashes.includes(hash)) throw new Error(`Processed hash absent from selected ledger: ${hash}`)
const remainingHashes = selectedHashes.filter((hash) => !processedHashes.includes(hash))
if (remainingHashes.length !== 98 || processedHashes.length + remainingHashes.length !== selectedHashes.length) throw new Error('Processed and remaining hashes do not reconcile to 106')
const remainingChecksum = sha256(remainingHashes.join('\n'))
if (remainingChecksum !== expectedRemainingChecksum) throw new Error(`Remaining checksum drift: ${remainingChecksum}`)

const header = ['relative_path', 'bytes', 'sha256', 'year', 'semester', 'module', 'subject', 'category', 'pdf_pages', 'pdf_error', 'audit_sample_chars', 'audit_sample_status']
const ledger = `${header.join('\t')}\n${ledgerRows.map((row) => header.map((field) => sanitize(row[field])).join('\t')).join('\n')}\n`

const yearOneRecovery = recovery.filter((row) => row.semester === 'Semester 101' || row.semester === 'Semester 102')
if (yearOneRecovery.length !== 5) throw new Error(`Expected five Year 1 recovery outcomes; received ${yearOneRecovery.length}`)
const coverageByRow = new Map(coverageValidation.map((row) => [row.row, row.validation_class]))
const recoveryOutcomes = yearOneRecovery.map((row) => ({
  row: Number(row.row),
  semester: row.semester,
  sourcePriority: row.source_priority,
  existingEquivalent: Boolean(row.likely_existing_equivalent),
  validationClass: coverageByRow.get(row.row) || 'unvalidated-unresolved',
  outcome: row.likely_existing_equivalent ? 'covered-equivalent' : 'unresolved',
  intendedDestination: sourceToken(row.intended_destination),
}))
const recoveryCounts = {
  failed: recoveryOutcomes.length,
  coveredEquivalent: recoveryOutcomes.filter((row) => row.outcome === 'covered-equivalent').length,
  unresolved: recoveryOutcomes.filter((row) => row.outcome === 'unresolved').length,
}
if (JSON.stringify(recoveryCounts) !== JSON.stringify({ failed: 5, coveredEquivalent: 2, unresolved: 3 })) throw new Error(`Unexpected Year 1 recovery counts: ${JSON.stringify(recoveryCounts)}`)
const auditSampleStatusCounts = Object.fromEntries([...new Set(ledgerRows.map((row) => row.audit_sample_status))].sort().map((status) => [status, ledgerRows.filter((row) => row.audit_sample_status === status).length]))
const remainingAuditSampleStatusCounts = Object.fromEntries([...new Set(ledgerRows.filter((row) => !processedHashes.includes(row.sha256)).map((row) => row.audit_sample_status))].sort().map((status) => [status, ledgerRows.filter((row) => !processedHashes.includes(row.sha256) && row.audit_sample_status === status).length]))

const provenance = {
  schemaVersion: 'fhb101-s1-evidence-snapshot/v1',
  scope: 'FHB 101 S1 metadata-only durable evidence snapshot; no source content is imported.',
  sourceRoot: '<MUST_ROOT>',
  liveSourceVerification: false,
  selector: { module: 'FHB 101', categories: CATEGORIES, inventoryRows: 115, uniqueSha256: 106, duplicatePaths: 9 },
  selectorCounts: { subjects, categories },
  inputSha256: {
    inventoryTsv: fileSha256(options.inventory),
    inspectedTextJson: fileSha256(options.inspected),
    recoveryManifestTsv: fileSha256(options.recovery),
    coverageValidationTsv: fileSha256(options['coverage-validation']),
    academicPackageJson: fileSha256(options.package),
    readinessMarkdown: fileSha256(options.readiness),
    triageMarkdown: fileSha256(options.triage),
  },
  inputMetadata: { inventoryDeclaredFileMetadata: true, inspectedTextDiagnostics: 'sample-length classification only; raw samples are excluded' },
  academicPackageFhbStructure: packageFhbStructure(academicPackage),
  selectedInventory: { inventoryMetadataRows: ledgerRows.length, uniqueSha256: selectedHashes.length, sortedNewlineSha256: selectedChecksum },
  auditSampleStatusCounts,
  processedFamilies: { sha256: processedHashes, uniqueSha256: processedHashes.length },
  remaining: { inventoryMetadataRows: ledgerRows.filter((row) => !processedHashes.includes(row.sha256)).length, uniqueSha256: remainingHashes.length, sortedNewlineSha256: remainingChecksum, auditSampleStatusCounts: remainingAuditSampleStatusCounts },
  triageCheckpointRemainingExtractionDebt: { emptyTextRows: 39, sparseTextRows: 6, source: 'pinned triage/readiness checkpoint; not replaced by audit-sample status counts' },
  reconciliation: { selectedUniqueSha256: selectedHashes.length, processedUniqueSha256: processedHashes.length, remainingUniqueSha256: remainingHashes.length, processedPlusRemaining: processedHashes.length + remainingHashes.length },
  year1RecoveryOutcomes: recoveryOutcomes,
}
const provenanceText = `${JSON.stringify(provenance, null, 2)}\n`
requireSafeOutput(ledger, 'ledger')
requireSafeOutput(provenanceText, 'provenance')
writeFileSync(options['ledger-out'], ledger, 'utf8')
writeFileSync(options['provenance-out'], provenanceText, 'utf8')
console.log(`snapshot-fhb101-evidence: rows=${ledgerRows.length}; unique_hashes=${selectedHashes.length}; duplicate_paths=${ledgerRows.length - selectedHashes.length}; processed=${processedHashes.length}; remaining=${remainingHashes.length}; remaining_sha256=${remainingChecksum}; inventory_metadata_rows=${ledgerRows.length}; live_source_verification=false`)
