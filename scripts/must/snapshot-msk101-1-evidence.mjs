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
  'c7075e4c777e946e43ff29abae2de6a3a45e0980aa13c3d1627223bf88b962e5',
  'bdf42a294dbb4b9fc3fff64d8addfac111d7ef5a7138bf01637fb86eed03ee2a',
  '3527d08a3d0a8e5222cb300bd316836a7b675396af8ee1d03efdcc3c38cc2f2b',
  '4931e8f337b45786cb2c71f04a0d14b347a6824add714bda1f220d77e1935b2e',
  'b4a78a3acc4a83f7d6d1e0b02e1e65cb2f915793d4058dfe4e27113a2c2c71e9',
  '628bb55b5752bae6a4f89c4e068cf2a4ec97d7798e3db5784475e1891a8e5f84',
  '847876aeedd56f64c339aa61f8829131dcc9ff8f9eede1dc3be0ad656ce80124',
  '71d44657e0d87a79998716f4d34dd2e8a2a29225b2bfb6ac2c124c46dc7cc1c3',
  '0f49aeef33384bbd0cbe8e3ca038afb2668e9ea3d238b1c73f9d594307f9406a',
  'f9d29c62e1a46e98c0574769747455b04d2b1a46ae90b89df424e7e5bda31b51',
  '13bb48d71c0acabc39e05f22177b5a44eebd1dc849093754b083cdab57cc1a00',
  '14017cf209e94c9c5e431552ec4e934e42634c26a42e2bbbe9793736279e3f9f',
  'b377284c73e07e824ca22b20ba1974282b1457609f75fca3114b1be484d191d7',
  'be5a40228d1681591909501b64f819ddf90bce0e0d98fcc2fafd4571391cf2a4',
  '2b3046797114764969bbcd1b2826333c31b1d1177804327caf0187540d68fbfb',
  'af9a39096fa7cce2adcddcbc4c3b0603c3b6614579db064ce3e7ddbc2ba2bafe',
  '3d57008c1670965ae13fe5d8045d1cc94313640de23803cb40a71b579716e9f9',
  'c1a046c99016b3b7b6275e5ded280b1588e7eebfef02575d6f8d9c22a6666bdb',
  'cb03514801a6bee961b8543b62a8b148958618d318a80e0c5db50a91431e260e',
  '91e3d840f2296c8ef07243176d3daece0a7c2023ad0aa82f80527e5f4ecb39d7',
  '0856251edfee586c1b993f1898529f765d033c498cb03fd0fcff2f3b9ce2b6f7',
  '5fbc9fe1c84f101a80f5778632e5e30cb7f08956ab488c10c40e8a571c057363',
  'd4510a280552936a78865b7f800b53379ee610341cc7088b6b9beaecd978f0e0',
]
const SELECTED_CHECKSUM = '228a5361022abbb1572c28e0795f562b3ff4de8d10326873c7cf88a5aa559b02'
const REMAINING_CHECKSUM = '0d71e0cf2acf701ca6d2c9879ba17314b4e9625953d49696ed137614f1c16976'

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
  const expected = { 'audit-extract-failed': 3, 'audit-not-found': 14, 'empty-text': 14, 'sparse-text': 7, 'substantive-text': 30 }
  if (JSON.stringify(provenance.triageCheckpointRemainingAuditDebt) !== JSON.stringify(expected)) throw new Error('Audit-label triage debt drift')
  if (provenance.liveSourceVerification !== false) throw new Error('Live-source declaration drift')
  console.log('audit-label-static-test=pass remaining_audit_debt=30-substantive/7-sparse/14-empty/14-not-found/3-extract-failed')
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

for (const value of [...PROCESSED_FAMILY_HASHES, SELECTED_CHECKSUM, REMAINING_CHECKSUM, '3134', '3033', '32']) {
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
if (processedHashes.length !== 34 || remainingHashes.length !== 67 || processedHashes.length + remainingHashes.length !== 101) throw new Error('Processed/remaining reconciliation drift')
if (sha256(remainingHashes.join('\n')) !== REMAINING_CHECKSUM) throw new Error('Remaining checksum drift')

const header = ['relative_path', 'bytes', 'sha256', 'year', 'semester', 'module', 'subject', 'category', 'pdf_pages', 'pdf_error', 'audit_sample_chars', 'audit_sample_status']
const ledger = `${header.join('\t')}\n${ledgerRows.map((row) => header.map((field) => sanitize(row[field])).join('\t')).join('\n')}\n`
const countStatuses = (rows) => Object.fromEntries([...new Set(rows.map((row) => row.audit_sample_status))].sort().map((status) => [status, rows.filter((row) => row.audit_sample_status === status).length]))
const remainingRows = ledgerRows.filter((row) => !processedHashes.includes(row.sha256))
const remainingDebt = countStatuses(remainingRows)
const expectedRemainingDebt = { 'audit-extract-failed': 3, 'audit-not-found': 14, 'empty-text': 14, 'sparse-text': 7, 'substantive-text': 30 }
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
    { sha256: PROCESSED_FAMILY_HASHES[11], sourcePages: 6, renderedReadPages: '1-6', questionPages: '1-6', keyPages: '6', printedPromptObservations: 46, printedKeyObservations: 46, acceptedSourceHandles: 4, searchesRun: 16, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[12], sourcePages: 6, renderedReadPages: '1-6', questionPages: '1-6', keyPages: '6', printedPromptObservations: 45, printedKeyObservations: 45, acceptedSourceHandles: 4, searchesRun: 16, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[13], sourcePages: 12, renderedReadPages: '1-12', questionPages: '1-12', inlineAnswerPages: '1-12', printedPromptObservations: 69, printedKeyObservations: 69, acceptedSourceHandles: 5, searchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 2, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[14], sourcePages: 11, renderedReadPages: '1-11', questionPages: '1-11', inlineAnswerPages: '1-11', printedPromptObservations: 67, printedKeyObservations: 67, acceptedSourceHandles: 4, searchesRun: 16, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 2, sourceProcessed: true, preservedSourceDefects: ['distinct prompts share labels 38 and 39', 'two distinct prompts labelled 54'] },
    { sha256: PROCESSED_FAMILY_HASHES[15], sourcePages: 16, renderedReadPages: '1-16', teachingPages: '2-8', questionPages: '9-16', keyPages: '16', printedPromptObservations: 25, printedKeyObservations: 25, acceptedSourceHandles: 7, searchesRun: 28, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 2, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[16], sourcePages: 12, renderedReadPages: '1-12', questionPages: '1-12', printedPromptObservations: 43, printedKeyObservations: 0, exactPromptSequenceDuplicateOf: PROCESSED_FAMILY_HASHES[4], familyQuestionDelta: 0, familyAnswerDelta: 0, acceptedSourceHandles: 0, searchesRun: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[17], sourcePages: 28, renderedReadPages: '1-28', questionPages: '1-27', keyPages: '28', printedPromptObservations: 95, printedKeyObservations: 95, acceptedSourceHandles: 5, searchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[18], sourcePages: 24, renderedReadPages: '1-24', printedPromptObservations: 271, printedKeyObservations: 268, sourceAbsentAnswers: 3, crossModuleExactDuplicateOf: { module: 'FHB 101', sha256: PROCESSED_FAMILY_HASHES[18] }, referenceFhbAcceptedSourceHandles: 39, referenceFhbSearchesRun: 156, familyQuestionDelta: 0, familyAnswerDelta: 0, acceptedSourceHandles: 0, searchesRun: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, preservedSourceDefects: ['cytology omits labels 5, 77, 80 and 82 and repeats label 6', 'epithelium 33 cancelled', 'connective tissue 37 cancelled', 'cytogenetics label 3 repeated', 'nervous tissue 13 cancelled'] },
    { sha256: PROCESSED_FAMILY_HASHES[19], sourcePages: 12, renderedReadPages: '1-12', coverPages: '1', teachingPages: '2-4', questionPages: '5-12', keyPages: '12', printedPromptObservations: 30, printedKeyObservations: 30, acceptedSourceHandles: 4, searchesRun: 16, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true },
    { sha256: PROCESSED_FAMILY_HASHES[20], sourcePages: 17, renderedReadPages: '1-17', coverPages: '1', teachingPages: '2-5,11-12,17', questionPages: '5-10,13-16', keyPages: '10-11,16', printedPromptObservations: 40, printedKeyObservations: 40, acceptedSourceHandles: 5, searchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, preservedSourceDefects: ['first-bank hypodermal-fat-cell prompt repeated as Q3 and Q18', 'second-bank Q8 less-numerous wording preserved with printed axilla key', 'second-bank Q13 layer answer preserved despite adjacent teaching tension'] },
    { sha256: PROCESSED_FAMILY_HASHES[21], sourcePages: 19, renderedReadPages: '1-19', teachingPages: '1,4-6,11-12,18-19', questionPages: '2-4,7-11,12-17', keyPages: '4,11,17', printedPromptObservations: 54, printedKeyObservations: 54, acceptedSourceHandles: 5, searchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, preservedSourceDefects: ['second-bank Q7 Arabic joke option', 'second-bank Q17 football joke option', 'third key first answer token lacks printed 1 label', 'third-bank Q13 key conflicts with adjacent perichondrium teaching'] },
    { sha256: PROCESSED_FAMILY_HASHES[22], sourcePages: 29, renderedReadPages: '1-29', coverPages: '1', indexPages: '2', questionPages: '3-29', inlineAnswerPages: '3-29', printedPromptObservations: 153, printedKeyObservations: 151, sourceAbsentAnswers: 2, acceptedSourceHandles: 6, searchesRun: 24, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, preservedSourceDefects: ['2014-2018 sequence jumps from 24 to 26', 'Q26 option label 2c is malformed', '2014-2018 muscle-spindle Q6 carries an ambiguous blue cross/check and remains unkeyed', '2015 muscle-spindle Q5 is crossed out and remains unkeyed'] },
    { sha256: PROCESSED_FAMILY_HASHES[23], sourcePages: 18, renderedReadPages: '1-18', questionPages: '1-15', keyPages: '16-18', printedPromptObservations: 50, printedKeyObservations: 50, acceptedSourceHandles: 5, searchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, preservedSourceDefects: ['Q26 lacks the period printed after other question labels', 'Q45 says emimysium is skeletal muscle', 'Q32/Q46, Q39/Q48, Q40/Q49, Q41/Q47 and Q15/Q42 repeat earlier function prompts'] },
    { sha256: PROCESSED_FAMILY_HASHES[24], sourcePages: 92, renderedReadPages: '1-92', coverPages: '1', questionPages: '2-83', keyPages: '8,14,22,31,39,48,54,59,66,73,78,84', writtenPages: '84-89', teachingPages: '89-92', printedPromptObservations: 419, printedKeyObservations: 418, sourceAbsentAnswers: 1, acceptedSourceHandles: 4, searchesRun: 16, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, preservedSourceDefects: ['final mixed-bank Q6 key is explicitly XX and remains unkeyed', 'final mixed answer table repeats label 19 and omits the expected second label', 'thirteen CASES entries are teaching summaries rather than assessment prompts'] },
    { sha256: PROCESSED_FAMILY_HASHES[25], sourcePages: 28, renderedReadPages: '1-28', coverPages: '1-3', indexPages: '4', questionPages: '5-9,11-19,21-27', keyPages: '10,20,28', printedPromptObservations: 148, printedKeyObservations: 148, acceptedSourceHandles: 3, searchesRun: 12, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, embeddedPromptSequenceReuse: [{ sha256: PROCESSED_FAMILY_HASHES[7], promptObservations: 38 }, { sha256: PROCESSED_FAMILY_HASHES[23], promptObservations: 50 }], preservedSourceDefects: ['bone Q10 key conflicts with its osteoblast wording and later bank items', 'bone Q36 key selects Sharpey fibres for periosteum-to-marrow wording', 'skeletal Q45 says emimysium is skeletal muscle', 'skeletal Q36 option Producing AT is truncated', 'skeletal function stems repeat at Q32/Q46, Q39/Q48, Q40/Q49, Q41/Q47 and Q15/Q42'] },
    { sha256: PROCESSED_FAMILY_HASHES[26], sourcePages: 3, renderedReadPages: '1-3', teachingPages: '1-3', printedPromptObservations: 0, printedKeyObservations: 0, acceptedSourceHandles: 0, searchesRun: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, boundaryDisposition: 'teaching/revision notes only; no assessment prompts' },
    { sha256: PROCESSED_FAMILY_HASHES[27], sourcePages: 22, renderedReadPages: '1-22', questionPages: '1-22', objectiveMcqPrompts: 201, writtenPrompts: 24, printedPromptObservations: 225, printedKeyObservations: 0, sourceAbsentAnswers: 225, acceptedSourceHandles: 5, searchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 5, sourceProcessed: true, authorityDisposition: 'student-authored compilation; filename-only 2025/past-exam claim rejected', writtenCompositeTreatment: 'page-21 shoulder case retained as 14 occurrences because each subprompt is separately numbered and has a distinct response space' },
    { sha256: PROCESSED_FAMILY_HASHES[28], sourcePages: 28, renderedReadPages: '1-28', visibleQuestionPages: '1-17,21-27', latentNonRenderedTextPages: '18-20', answerOnlyPages: '28', printedPromptObservations: 177, objectiveMcqPrompts: 177, printedKeyObservations: 190, objectiveKeyObservations: 176, answerOnlyWrittenObservations: 14, visibleUnkeyedPrompts: 1, sourceAbsentAnswers: 1, keyedPartialSiblingOf: PROCESSED_FAMILY_HASHES[27], familyQuestionDelta: 0, familyAnswerDelta: 190, acceptedSourceHandles: 0, searchesRun: 0, referenceAcceptedSourceHandles: 5, referenceSearchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, preservedSourceDefects: ['Q138-Q161 exist only in the non-rendered text layer on visually blank pages 18-20 and are excluded', 'two isolated red marks on page 20 cannot be mapped to visible prompts and are excluded', 'visible Q168 has no answer mark', 'page 28 prints fourteen answers without their written prompts'] },
    { sha256: PROCESSED_FAMILY_HASHES[29], sourcePages: 24, renderedReadPages: '1-24', visibleQuestionPages: '1-23', inlineKeyPages: '1-20', answerOnlyPages: '24', printedPromptObservations: 180, objectiveMcqPrompts: 180, printedKeyObservations: 173, objectiveKeyObservations: 159, answerOnlyWrittenObservations: 14, visibleUnkeyedPrompts: 21, sourceAbsentAnswers: 21, complementaryKeyedSiblingOf: PROCESSED_FAMILY_HASHES[27], overlapsKeyedPartialSibling: PROCESSED_FAMILY_HASHES[28], familyQuestionDelta: 0, familyAnswerDelta: 22, acceptedSourceHandles: 0, searchesRun: 0, referenceAcceptedSourceHandles: 5, referenceSearchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, preservedSourceDefects: ['Q160-Q180 are visible but unmarked', 'Q181-Q201 are absent from this shorter sibling', 'page 24 prints fourteen answers without their written prompts'] },
    { sha256: PROCESSED_FAMILY_HASHES[30], sourcePages: 55, renderedReadPages: '1-55', teachingPages: '1-23,26-32', writtenPromptAndAnswerPages: '24-25', objectiveQuestionPages: '33-55', printedPromptObservations: 194, objectiveMcqPrompts: 180, writtenPrompts: 14, printedKeyObservations: 152, objectiveKeyObservations: 138, writtenAnswerObservations: 14, visibleUnkeyedPrompts: 42, sourceAbsentAnswers: 42, mixedTeachingAssessmentSiblingOf: PROCESSED_FAMILY_HASHES[27], overlapsKeyedPartialSibling: PROCESSED_FAMILY_HASHES[28], overlapsComplementaryKeyedSibling: PROCESSED_FAMILY_HASHES[29], inventoryPathOccurrences: 2, exactDuplicateInventoryPathCount: 1, familyQuestionDelta: 0, familyAnswerDelta: 0, acceptedSourceHandles: 0, searchesRun: 0, referenceAcceptedSourceHandles: 5, referenceSearchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, boundaryDisposition: 'thirty teaching-only pages; fourteen written prompts with answers; Q1-Q138 keyed; Q139-Q180 visible but unkeyed' },
    { sha256: PROCESSED_FAMILY_HASHES[31], sourcePages: 78, renderedReadPages: '1-78', questionPages: '1-78', keyPages: '5,9-10,14-15,20-21,27-28,41-43,58-60,69-70,77-78', printedPromptObservations: 336, objectiveMcqPrompts: 336, printedKeyObservations: 336, objectiveKeyObservations: 336, visibleUnkeyedPrompts: 0, sourceAbsentAnswers: 0, familyQuestionDelta: 336, familyAnswerDelta: 336, acceptedSourceHandles: 0, searchesRun: 0, referenceAcceptedSourceHandles: 5, referenceSearchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, authorityDisposition: 'student-authored MUCIZE DOCTORS MSK 101-2 practice compendium; not an authenticated MUST/MSK 101-1 exam', bankBoundary: { elbowAnastomosis: { prompts: 20, keys: 20 }, cubitalFossa: { prompts: 15, keys: 15 }, anteriorForearmMuscles: { prompts: 26, keys: 26 }, posteriorForearmMuscles: { prompts: 32, keys: 32 }, retinacula: { prompts: 31, keys: 31 }, jointsAndSuperficialVeins: { prompts: 66, keys: 66 }, nerves: { prompts: 75, keys: 75 }, arteries: { prompts: 38, keys: 38 }, handAndPalmarSpaces: { prompts: 33, keys: 33 } } },
    { sha256: PROCESSED_FAMILY_HASHES[32], sourcePages: 3, renderedReadPages: '1-3', teachingPages: '1-2', blankPages: '3', printedPromptObservations: 0, printedKeyObservations: 0, acceptedSourceHandles: 0, searchesRun: 0, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, boundaryDisposition: 'two teaching/reference table pages covering fifteen muscles; one visually blank page; no assessment prompts or keys' },
    { sha256: PROCESSED_FAMILY_HASHES[33], sourcePages: 64, renderedReadPages: '1-64', questionPages: '1-5,7-11,13-17,19-24,26-31,33-47,49-64', keyPages: '6,12,18,25,32,48,49-64', printedPromptObservations: 341, objectiveMcqPrompts: 341, printedKeyObservations: 326, objectiveKeyObservations: 326, visibleUnkeyedPrompts: 15, sourceAbsentAnswers: 15, familyQuestionDelta: 341, familyAnswerDelta: 326, acceptedSourceHandles: 0, searchesRun: 0, referenceAcceptedSourceHandles: 5, referenceSearchesRun: 20, liveHits: 0, pendingHits: 0, newConceptsAfterPriorMskCollapse: 0, sourceProcessed: true, authorityDisposition: 'external generic upper-limb MCQ compilation; no MUST institution, department, examiner, sitting or official-key authority', bankBoundary: { section1: { prompts: 34, reliableKeys: 25, unkeyed: 9 }, section2: { prompts: 30, reliableKeys: 30, unkeyed: 0 }, section4: { prompts: 27, reliableKeys: 21, unkeyed: 6 }, section5GeneralPrinciples: { prompts: 37, reliableKeys: 37, unkeyed: 0 }, section6: { prompts: 35, reliableKeys: 35, unkeyed: 0 }, section7: { prompts: 98, reliableKeys: 98, unkeyed: 0 }, inlineUpperLimbBank: { prompts: 80, reliableKeys: 80, unkeyed: 0 } }, preservedSourceDefects: ['printed section numbering skips Section 3', 'Section 1 answer table prints No answer for Q18-Q26', 'Section 4 answer table prints only ? or ?? for Q12-Q17', 'question-text question-mark strings and garbled inline-bank footer retained'] },
  ],
  triageCumulative: { printedPromptObservations: 3134, printedKeyObservations: 3033, namedConceptsAssigned: 32, liveHits: 0, pendingHits: 1, newConcepts: 31 },
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
