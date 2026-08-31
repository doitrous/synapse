#!/usr/bin/env node
/** Build a metadata-only FHB 102-2 S1 evidence snapshot. */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const REQUIRED = ['--inventory', '--inspected', '--readiness', '--triage', '--ledger-out', '--provenance-out']
const CATEGORIES = ['05 MCQs', '06 EOM Exams', '07 EOY Exams', '08 Midterm Exams']
const EXAM_CATEGORIES = new Set(['06 EOM Exams', '07 EOY Exams', '08 Midterm Exams'])
const KEY_PATTERN = /answer|answered|answer key|model answer|solution|solutions|اجاب|إجاب|حل/i
const PROCESSED_FAMILY_HASHES = [
  'dd800ea485e532ad4b5fedc7070c3e410b1d3bf13b7589c2fd79b38287704470',
  'b9989e9ef3c314f6c771c32a4ad2f096c02648a3b1f98281117ce7c4f5208063',
  '4bd3b78f762673d7eb7f1c0fc76651d76fd335105a287451e47c51d2bd0be5cf',
  '8bd3b772b3b32db5972665614475a6193f5ffa871e686a2026b0a7aeeadf375c',
  '352f47c6e866e76a9d8b2aa4772a0f7d7a731170aa23214ac95ba51021c7213f',
  'ae85035d9ea693b962b7d4a1999b7e61bed472cf0127eb04e3dcf2bd90892f37',
  'd563da91fcfe9ac872abf66c7f91729535a895bcc329978a67321fcf4aec3f43',
  '1c477cdee3ad720f5e94adfd2eafd9908bbcd61f9622f7b60ec93c9cb7f3d229',
  '9cf944929a7cffa384d05bc660ce1fc449e47ab2c1920f09d4bf861d942092bc',
  'd81b956eb2c8a26aada7ab5105d66d5a6c62a1047bfdf2a3c517b9966a3f00fc',
  'f7a3192de2d21063dabcb7c1316c8e8e71b05ada37f47cb1cb4fd8759ade2bdd',
  '9b3aae1b913cff2c41851e255119bc377a6b94cf089450fa7c9805b03234be19',
  'e783e4871dd209458fcd73b69c39fed532d4aee593fa4097c2d739b1df388def',
]
const SELECTED_CHECKSUM = '3d7282909b1be0ee1a4b3ff7ae16d923505ab40926a44d97090c2e287e445313'
const REMAINING_CHECKSUM = '6125bc441f96df6a27d82d670e67601bf265a2e42239d21b1817e42d9fa5b175'
const FIRST_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/00 Module-wide/06 EOM Exams/EOM MCQs - 1)FHB 102-2 Online Final Exam - PentaGram.pdf',
  sha256: 'dd800ea485e532ad4b5fedc7070c3e410b1d3bf13b7589c2fd79b38287704470',
  pages: 33,
  sourceProcessed: true,
}
const SECOND_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/00 Module-wide/05 MCQs/MCQs - FHB102-2.pdf',
  sha256: 'b9989e9ef3c314f6c771c32a4ad2f096c02648a3b1f98281117ce7c4f5208063',
  pages: 6,
  sourceProcessed: true,
}
const THIRD_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 1).pdf',
  sha256: '4bd3b78f762673d7eb7f1c0fc76651d76fd335105a287451e47c51d2bd0be5cf',
  pages: 45,
  sourceProcessed: true,
}
const FOURTH_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 2).pdf',
  sha256: '8bd3b772b3b32db5972665614475a6193f5ffa871e686a2026b0a7aeeadf375c',
  pages: 56,
  sourceProcessed: true,
}
const FIFTH_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till mid_MUCIZE DOCTORS PUPLISH.pdf',
  sha256: '352f47c6e866e76a9d8b2aa4772a0f7d7a731170aa23214ac95ba51021c7213f',
  pages: 47,
  sourceProcessed: true,
}
const SIXTH_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - AE - MCQ.pdf',
  sha256: 'ae85035d9ea693b962b7d4a1999b7e61bed472cf0127eb04e3dcf2bd90892f37',
  pages: 29,
  sourceProcessed: true,
}
const SEVENTH_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - FHB 102-2 Microbiology Infection tutorial-4.pdf',
  sha256: 'd563da91fcfe9ac872abf66c7f91729535a895bcc329978a67321fcf4aec3f43',
  pages: 20,
  sourceProcessed: true,
}
const EIGHTH_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - FHB MICRO CH10 PRACTICE.pdf',
  sha256: '1c477cdee3ad720f5e94adfd2eafd9908bbcd61f9622f7b60ec93c9cb7f3d229',
  pages: 3,
  sourceProcessed: true,
}
const NINTH_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - FHB-2 micro mcq.pdf',
  sha256: '9cf944929a7cffa384d05bc660ce1fc449e47ab2c1920f09d4bf861d942092bc',
  pages: 1,
  sourceProcessed: true,
}
const TENTH_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Formative Micro.pdf',
  sha256: 'd81b956eb2c8a26aada7ab5105d66d5a6c62a1047bfdf2a3c517b9966a3f00fc',
  pages: 4,
  sourceProcessed: true,
}
const ELEVENTH_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Formative questions microbiology Spring 2026.pdf',
  sha256: 'f7a3192de2d21063dabcb7c1316c8e8e71b05ada37f47cb1cb4fd8759ade2bdd',
  pages: 6,
  sourceProcessed: true,
}
const TWELFTH_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - General Bacteriology & Mycology.pdf',
  sha256: '9b3aae1b913cff2c41851e255119bc377a6b94cf089450fa7c9805b03234be19',
  pages: 44,
  sourceProcessed: true,
}
const THIRTEENTH_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - General Virology.pdf',
  sha256: 'e783e4871dd209458fcd73b69c39fed532d4aee593fa4097c2d739b1df388def',
  pages: 20,
  sourceProcessed: true,
}
const NEXT_SOURCE = {
  relativePath: 'Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - General_Mycology_MCQ_SAQ.pdf',
  sha256: 'a50083b794e01754d76a6a129f9f61fceeaa6775e5b2b4e93c8a10d49a42cfa2',
  pages: 5,
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
  const expected = { 'audit-extract-failed': 2, 'audit-not-found': 11, 'empty-text': 12, 'sparse-text': 23, 'substantive-text': 35 }
  if (JSON.stringify(provenance.triageCheckpointRemainingAuditDebt) !== JSON.stringify(expected)) throw new Error('Audit-label triage debt drift')
  if (provenance.liveSourceVerification !== false) throw new Error('Live-source declaration drift')
  console.log('audit-label-static-test=pass remaining_audit_debt=35-substantive/23-sparse/12-empty/11-not-found/2-extract-failed')
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

for (const value of [SELECTED_CHECKSUM, REMAINING_CHECKSUM, FIRST_SOURCE.relativePath, FIRST_SOURCE.sha256, SECOND_SOURCE.relativePath, SECOND_SOURCE.sha256, THIRD_SOURCE.relativePath, THIRD_SOURCE.sha256, FOURTH_SOURCE.relativePath, FOURTH_SOURCE.sha256, FIFTH_SOURCE.relativePath, FIFTH_SOURCE.sha256, SIXTH_SOURCE.relativePath, SIXTH_SOURCE.sha256, SEVENTH_SOURCE.relativePath, SEVENTH_SOURCE.sha256, EIGHTH_SOURCE.relativePath, EIGHTH_SOURCE.sha256, NINTH_SOURCE.relativePath, NINTH_SOURCE.sha256, TENTH_SOURCE.relativePath, TENTH_SOURCE.sha256, ELEVENTH_SOURCE.relativePath, ELEVENTH_SOURCE.sha256, TWELFTH_SOURCE.relativePath, TWELFTH_SOURCE.sha256, THIRTEENTH_SOURCE.relativePath, THIRTEENTH_SOURCE.sha256, NEXT_SOURCE.relativePath, NEXT_SOURCE.sha256]) {
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
if (processedHashes.length !== 13 || remainingHashes.length !== 81 || processedHashes.length + remainingHashes.length !== 94) throw new Error('Processed/remaining reconciliation drift')
if (sha256(remainingHashes.join('\n')) !== REMAINING_CHECKSUM) throw new Error('Remaining checksum drift')

const header = ['relative_path', 'bytes', 'sha256', 'year', 'semester', 'module', 'subject', 'category', 'pdf_pages', 'pdf_error', 'audit_sample_chars', 'audit_sample_status']
const ledger = `${header.join('\t')}\n${ledgerRows.map((row) => header.map((field) => sanitize(row[field])).join('\t')).join('\n')}\n`
const countStatuses = (rows) => Object.fromEntries([...new Set(rows.map((row) => row.audit_sample_status))].sort().map((status) => [status, rows.filter((row) => row.audit_sample_status === status).length]))
const remainingRows = ledgerRows.filter((row) => !processedHashes.includes(row.sha256))
const remainingDebt = countStatuses(remainingRows)
const expectedRemainingDebt = { 'audit-extract-failed': 2, 'audit-not-found': 11, 'empty-text': 12, 'sparse-text': 23, 'substantive-text': 35 }
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
  completedSourceCoverage: [
    {
      sha256: FIRST_SOURCE.sha256,
      sourcePages: 33,
      renderedReadPages: '1-33',
      capturedPromptScreenshots: 33,
      distinctAssessmentPrompts: 32,
      objectiveMcqPrompts: 32,
      capturedQuestionLabels: 'Q1-Q22,Q24,Q26-Q27,Q29-Q35',
      absentQuestionLabels: ['Q23', 'Q25', 'Q28'],
      repeatedCaptureState: { label: 'Q1', pages: [1, 3], assessmentOccurrenceCount: 1 },
      printedKeyObservations: 18,
      studentSelectedResponseObservations: 18,
      officialFacultyKeyObservations: 0,
      sourceAbsentAnswers: 14,
      writtenPrompts: 0,
      practicalOrImagePrompts: 0,
      teachingPrompts: 0,
      familyQuestionDelta: 32,
      familyAnswerDelta: 18,
      acceptedSourceHandles: 22,
      searchesRun: 88,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 22,
      sourceProcessed: true,
      authorityDisposition: 'direct CamScanner photographs of a Qorrect FHB102-2 Fundamentals of human body II active-attempt interface declaring 35 questions, 70 marks and 42 marks to pass; strong exam-sitting evidence, but no visible result screen, official faculty key, institution authentication, examiner or sitting date',
      boundaryDisposition: 'thirty-two distinct conventional MCQ occurrences across Parasitology Q1-Q12, Pharmacology Q13-Q22 and Microbiology Q24,Q26-Q27,Q29-Q35; eighteen carry a student-selected response, fourteen are unselected, Q23/Q25/Q28 are absent, and the two Q1 screenshots are one assessment occurrence in two attempt states',
      preservedSourceDefects: ['Q23, Q25 and Q28 are absent although the interface declares 35 questions', 'Q1 is photographed twice and counted once', 'student selections are answer-bearing attempt observations rather than an authenticated faculty key', 'personal account names visible in screenshots are excluded from durable evidence'],
    },
    {
      sha256: SECOND_SOURCE.sha256,
      sourcePages: 6,
      renderedReadPages: '1-6',
      questionPages: '1-5',
      keyPages: '5-6',
      printedPromptObservations: 32,
      objectiveMcqPrompts: 32,
      printedKeyObservations: 31,
      sourceAbsentAnswers: 1,
      writtenPrompts: 0,
      practicalOrImagePrompts: 0,
      teachingPrompts: 0,
      exactNormalizedPromptSequenceSiblingOf: FIRST_SOURCE.sha256,
      referenceAcceptedSourceHandles: 22,
      referenceSearchesRun: 88,
      acceptedSourceHandles: 0,
      searchesRun: 0,
      familyQuestionDelta: 0,
      familyAnswerDelta: 13,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 0,
      sourceProcessed: true,
      authorityDisposition: 'anonymous Microsoft Word-generated answer-bearing question bank created in 2021; only FHB102-2 is titled, with no visible institution, department, examiner, sitting date or authenticated faculty-key mark',
      boundaryDisposition: 'thirty-two continuously numbered objective MCQs on pages 1-5 and thirty-one terminal printed answer tokens on pages 5-6; Q32 has no printed answer; normalized prompt sequence exactly matches the thirty-two distinct prompts already counted from the first carrier',
      preservedSourceDefects: ['Q32 has no printed answer and none is inferred', 'Q13 and Q22 cross page boundaries but each is counted once', 'academically questionable printed answer tokens are preserved without correction', 'the printed answer list is source answer evidence rather than an authenticated faculty key'],
    },
    {
      sha256: THIRD_SOURCE.sha256,
      sourcePages: 45,
      renderedReadPages: '1-45',
      questionPages: '1-8,10-17,19-26,28-35,37-44',
      answerOnlyPages: '9,18,27,36,45',
      printedPromptObservations: 150,
      objectiveMcqPrompts: 150,
      printedKeyObservations: 150,
      sourceAbsentAnswers: 0,
      writtenPrompts: 0,
      practicalOrImagePrompts: 0,
      teachingPrompts: 0,
      sectionBoundary: [
        { section: 'Parasitology (Introduction)', questionPages: '1-8', keyPage: 9, prompts: 30, answers: 30 },
        { section: 'Parasitology (Arthropoda)', questionPages: '10-17', keyPage: 18, prompts: 30, answers: 30 },
        { section: 'Microbiology (Chapters 1, 2 and 3)', questionPages: '19-26', keyPage: 27, prompts: 30, answers: 30 },
        { section: 'Microbiology (Chapter 6)', questionPages: '28-35', keyPage: 36, prompts: 30, answers: 30 },
        { section: 'Pharmacology', questionPages: '37-44', keyPage: 45, prompts: 30, answers: 30 },
      ],
      sourceFirstHandles: 15,
      priorFhb1022CollapsedHandles: 4,
      acceptedSourceHandles: 11,
      searchesRun: 44,
      familyQuestionDelta: 150,
      familyAnswerDelta: 150,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 11,
      sourceProcessed: true,
      authorityDisposition: 'student-authored revision question bank visibly attributed to Absalam101 and created in Microsoft Word in 2025; the title and filename call it a midterm bank, but no institution, department, examiner, sitting, marks or authenticated faculty-key mark is visible, so the five printed answer tables are source keys rather than official faculty keys',
      boundaryDisposition: 'five independent thirty-question conventional MCQ sections, each followed by a complete thirty-token answer-only page; 150 distinct objective prompts and 150 prompt-matched printed answer observations, with no written, practical, image-identification or teaching-only prompt boundary',
      preservedSourceDefects: ['the title-page statement that the PDF contains 150 questions is corroborated by the visible five-by-thirty boundary but is not an exam-authority claim', 'academically questionable printed answer tokens are preserved without medical correction', 'page-break continuations remain one prompt occurrence each', 'the printed answer tables are source answer evidence rather than authenticated faculty keys'],
    },
    {
      sha256: FOURTH_SOURCE.sha256,
      sourcePages: 56,
      renderedReadPages: '1-56',
      questionPages: '1-9,10-17,19-28,30-37,39-47,48-56',
      answerOnlyPages: '18,29,38',
      mixedPromptAndAnswerPages: '9,47,56',
      printedPromptObservations: 180,
      objectiveMcqPrompts: 180,
      printedKeyObservations: 180,
      sourceAbsentAnswers: 0,
      writtenPrompts: 0,
      practicalOrImagePrompts: 0,
      teachingPrompts: 0,
      sectionBoundary: [
        { section: 'Parasitology (Mosquitoes)', pages: '1-9', prompts: 30, answers: 30 },
        { section: 'Parasitology (Sandfly)', questionPages: '10-17', keyPage: 18, prompts: 30, answers: 30 },
        { section: 'Microbiology (Mycology)', questionPages: '19-28', keyPage: 29, prompts: 30, answers: 30 },
        { section: 'Microbiology (Virology)', questionPages: '30-37', keyPage: 38, prompts: 30, answers: 30 },
        { section: 'Microbiology (Chapter 10)', pages: '39-47', prompts: 30, answers: 30 },
        { section: 'Pharmacology', pages: '48-56', prompts: 30, answers: 30 },
      ],
      sourceFirstHandles: 18,
      priorFhb1022CollapsedHandles: 3,
      acceptedSourceHandles: 15,
      searchesRun: 60,
      familyQuestionDelta: 180,
      familyAnswerDelta: 180,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 15,
      sourceProcessed: true,
      authorityDisposition: 'student-authored revision question bank visibly attributed to Absalam101 and created in Microsoft Word in 2025; the title and filename call it a midterm bank, but no institution, department, examiner, sitting, marks or authenticated faculty-key mark is visible, so the printed answer tables are source keys rather than official faculty keys',
      boundaryDisposition: 'six independent thirty-question conventional MCQ sections with complete thirty-token answer tables; 180 distinct objective prompts and 180 prompt-matched printed answer observations, with no written, practical, image-identification or teaching-only prompt boundary',
      preservedSourceDefects: ['the title-page statement that the PDF contains 180 questions is corroborated by the visible six-by-thirty boundary but is not an exam-authority claim', 'Virology Q9 begins with a stray W in the printed stem', 'academically questionable printed answer tokens are preserved without medical correction', 'page-break continuations remain one prompt occurrence each', 'the printed answer tables are source answer evidence rather than authenticated faculty keys'],
    },
    {
      sha256: FIFTH_SOURCE.sha256,
      sourcePages: 47,
      renderedReadPages: '1-47',
      nonAssessmentPages: '1-5',
      questionPages: '6-19,20-23,24-28,29-35,37-43,45-47',
      answerOnlyPages: '36,44',
      printedPromptObservations: 265,
      objectiveMcqPrompts: 265,
      printedAnswerTokens: 265,
      printedKeyObservations: 264,
      orphanOrMisnumberedAnswerTokens: 1,
      sourceAbsentAnswers: 1,
      writtenPrompts: 0,
      practicalOrImagePrompts: 0,
      teachingPrompts: 0,
      sectionBoundary: [
        { section: 'Parasitology core MCQs', pages: '6-19', prompts: 95, promptMatchedAnswers: 94, sourceAbsentAnswers: 1, orphanOrMisnumberedAnswerTokens: 1 },
        { section: 'Parasitology case-based MCQs', pages: '20-23', prompts: 22, promptMatchedAnswers: 22 },
        { section: 'Parasitology advanced MCQs', pages: '24-28', prompts: 33, promptMatchedAnswers: 33 },
        { section: 'Pharmacology Antibacterial (1)', questionPages: '29-35', keyPage: 36, prompts: 50, promptMatchedAnswers: 50 },
        { section: 'Pharmacology Antibacterial (2)', questionPages: '37-43', keyPage: 44, prompts: 50, promptMatchedAnswers: 50 },
        { section: 'Pharmacology advanced MCQs', pages: '45-47', prompts: 15, promptMatchedAnswers: 15 },
      ],
      sourceFirstHandles: 13,
      priorFhb1022CollapsedHandles: 13,
      acceptedSourceHandles: 0,
      searchesRun: 0,
      familyQuestionDelta: 265,
      familyAnswerDelta: 264,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 0,
      sourceProcessed: true,
      authorityDisposition: 'Mucize Doctors student-team revision book for MUST medical students, explicitly described as from students to students and as a supplementary educational resource; authored and reviewed by named students, with no authenticated exam sitting, faculty-key mark, examiner or department provenance despite the 2025 midterm branding and marks-distribution table',
      boundaryDisposition: '265 conventional objective MCQ prompts across 150 Parasitology and 115 Pharmacology occurrences; 265 printed answer tokens include 264 prompt-matched answer observations and one misnumbered orphan token, leaving one source-absent prompt answer; no written, practical, image-identification or teaching prompt boundary',
      preservedSourceDefects: ['the page 9 answer line omits Q25 and instead prints an orphan second Q35 token, so no Q25 answer is inferred', 'Case 1 says following images show blood-smear stages, but no diagnostic image is visibly printed on the page', 'the preface gives a three-subject midterm marks distribution including Microbiology although this volume contains only Parasitology and Pharmacology questions', 'academically questionable prompts and answer tokens are preserved without medical correction', 'student-team review and MUST branding are not treated as authenticated faculty-key or exam-sitting authority'],
    },
    {
      sha256: SIXTH_SOURCE.sha256,
      sourcePages: 29,
      renderedReadPages: '1-29',
      nonAssessmentPages: '1',
      questionPages: '2-28',
      answerOnlyPages: '29',
      printedPromptObservations: 177,
      objectiveMcqPrompts: 177,
      printedAnswerTokens: 177,
      printedKeyObservations: 177,
      sourceAbsentAnswers: 0,
      writtenPrompts: 0,
      practicalOrImagePrompts: 0,
      teachingPrompts: 0,
      sectionBoundary: [
        { section: 'Bacterial structure', pages: '2-9', questionLabels: '1-50', prompts: 50, answers: 50 },
        { section: 'Bacterial growth', pages: '9-13', questionLabels: '51-76', prompts: 26, answers: 26 },
        { section: 'Genetics and bacteriophage', pages: '13-19', questionLabels: '77-120', prompts: 44, answers: 44 },
        { section: 'Antibiotic resistance', pages: '19-20', questionLabels: '121-128', prompts: 8, answers: 8 },
        { section: 'Infection', pages: '21-25', questionLabels: '129-157', prompts: 29, answers: 29 },
        { section: 'General virology', pages: '25-26', questionLabels: '158-166', prompts: 9, answers: 9 },
        { section: 'General mycology', pages: '27-28', questionLabels: '167-177', prompts: 11, answers: 11 },
      ],
      sourceFirstHandles: 12,
      priorFhb1022CollapsedHandles: 6,
      acceptedSourceHandles: 6,
      searchesRun: 24,
      familyQuestionDelta: 177,
      familyAnswerDelta: 177,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 6,
      sourceProcessed: true,
      authorityDisposition: 'anonymous CamScanner reproduction titled only Microbiology MCQ / AE, with PDF metadata AE - Book 5 and no visible institution, department, examiner, sitting date, marks, author or authenticated faculty-key mark; the terminal answer table is source answer evidence rather than an official faculty key',
      boundaryDisposition: 'one cover page, 177 consecutively numbered conventional objective MCQs on pages 2-28, and one complete 177-token answer-only table on page 29; no written, practical, image-identification or teaching-only prompt boundary',
      preservedSourceDefects: ['the visible source supplies no author or authority statement beyond the AE cover mark and generic section headings', 'printed grammatical, spelling and academically questionable prompt and answer tokens are preserved without correction', 'the answer table is treated as source-printed evidence rather than an authenticated faculty key', 'section headings embedded between numbered prompts are not counted as teaching pages or prompts'],
    },
    {
      sha256: SEVENTH_SOURCE.sha256,
      sourcePages: 20,
      renderedReadPages: '1-20',
      nonAssessmentPages: '1,6,20',
      questionPages: '2-5,7-19',
      printedPromptObservations: 17,
      objectiveMcqPrompts: 17,
      printedKeyObservations: 11,
      inlineHighlightedAnswerObservations: 11,
      sourceAbsentAnswers: 6,
      writtenPrompts: 0,
      practicalOnlyPrompts: 0,
      practicalOrImagePrompts: 4,
      teachingOnlyPages: 1,
      teachingPrompts: 0,
      sectionBoundary: [
        { section: 'Core bacterial structure, growth, genetics and virulence', pages: '2-5,7-15', questionLabels: '1-13', prompts: 13, answers: 11, sourceAbsentAnswers: 2 },
        { section: 'Image-supported clinical and laboratory identification', pages: '16-19', questionLabels: '14-17', prompts: 4, answers: 0, sourceAbsentAnswers: 4 },
      ],
      sourceFirstHandles: 6,
      priorFhb1022CollapsedHandles: 5,
      acceptedSourceHandles: 1,
      searchesRun: 4,
      familyQuestionDelta: 17,
      familyAnswerDelta: 11,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 1,
      sourceProcessed: true,
      authorityDisposition: 'anonymous tutorial slide deck titled FHB 102-2 | Infection module | Tutorial, with no visible institution, department, examiner, sitting, marks, named author or authenticated faculty-key mark; inline yellow highlights are source answer evidence rather than an official faculty key',
      boundaryDisposition: 'seventeen conventional objective MCQs on pages 2-5 and 7-19; Q1-Q11 each have one inline yellow-highlighted source answer while Q12-Q17 remain visibly unkeyed; Q14-Q17 are image-supported clinical or laboratory MCQs; page 6 is a teaching-only Gram-wall comparison diagram and pages 1 and 20 are non-assessment slides',
      preservedSourceDefects: ['Q12-Q17 have no visible answer mark and no answers are inferred', 'Q14-Q17 use embedded clinical and laboratory images but remain one objective prompt occurrence each', 'printed spelling, grammar and academically questionable highlighted options are preserved without correction', 'the yellow highlights are source answer evidence rather than authenticated faculty-key observations'],
    },
    {
      sha256: EIGHTH_SOURCE.sha256,
      sourcePages: 3,
      renderedReadPages: '1-3',
      questionPages: '1-3',
      answerPages: '3',
      printedPromptObservations: 18,
      objectiveMcqPrompts: 18,
      printedKeyObservations: 18,
      sourceAbsentAnswers: 0,
      writtenPrompts: 0,
      practicalOrImagePrompts: 0,
      teachingPrompts: 0,
      unnumberedPromptSequence: true,
      sourceFirstHandles: 2,
      priorFhb1022CollapsedHandles: 1,
      acceptedSourceHandles: 1,
      searchesRun: 4,
      familyQuestionDelta: 18,
      familyAnswerDelta: 18,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 1,
      sourceProcessed: true,
      authorityDisposition: 'Google Docs-exported CH.10 (Micro) practice sheet with Maii Mahmoud Rady printed in each footer and March 2025 browser-export metadata; no visible institution, department, examiner, sitting, marks or authenticated faculty-key mark; the terminal answer list is source answer evidence rather than an official faculty key',
      boundaryDisposition: 'eighteen unnumbered conventional objective MCQs across pages 1-3 followed by eighteen ordered option-and-text answer lines on page 3; positional reconciliation provides one source answer observation for each prompt; no written, practical, image-identification or teaching prompt boundary',
      preservedSourceDefects: ['the eighth prompt crosses the page 1-2 boundary and remains one occurrence', 'near-repeated organism-identification stems remain separate assessment occurrences because each is independently asked and answered', 'printed grammatical and academically questionable prompt and answer tokens are preserved without correction', 'the terminal answer list is source answer evidence rather than an authenticated faculty key'],
    },
    {
      sha256: NINTH_SOURCE.sha256,
      sourcePages: 1,
      renderedReadPages: '1',
      questionPages: '1',
      printedPromptObservations: 5,
      objectiveMcqPrompts: 5,
      printedKeyObservations: 5,
      inlineHighlightedAnswerObservations: 5,
      sourceAbsentAnswers: 0,
      writtenPrompts: 0,
      practicalOrImagePrompts: 0,
      teachingPrompts: 0,
      sourceFirstHandles: 3,
      priorFhb1022CollapsedHandles: 3,
      acceptedSourceHandles: 0,
      searchesRun: 0,
      familyQuestionDelta: 5,
      familyAnswerDelta: 5,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 0,
      sourceProcessed: true,
      authorityDisposition: 'March 2025 Microsoft Word-generated exercise with an individual author string in PDF metadata but no visible author, institution, department, examiner, sitting, marks or authenticated faculty-key claim; personal metadata is excluded from durable evidence',
      boundaryDisposition: 'five numbered conventional objective MCQs on one page, each with one inline yellow-highlighted source answer; no separate key, written prompt, practical station, image-identification prompt, teaching passage or non-assessment page',
      preservedSourceDefects: ['the visible heading prints FH8 102-2', 'the source uses mesosome wording for the bacterial respiratory chain', 'academically questionable highlighted options remain source truth without correction', 'the inline highlights are source answer evidence rather than authenticated faculty-key observations'],
    },
    {
      sha256: TENTH_SOURCE.sha256,
      sourcePages: 4,
      renderedReadPages: '1-4',
      questionPages: '1-4',
      printedPromptObservations: 29,
      objectiveMcqPrompts: 23,
      writtenPrompts: 6,
      printedKeyObservations: 0,
      sourceAbsentAnswers: 29,
      practicalOrImagePrompts: 0,
      teachingPrompts: 0,
      sectionBoundary: [
        { section: 'FHB102-2 formative paper', pages: '1-2', objectiveMcqPrompts: 13, writtenPrompts: 3, answers: 0 },
        { section: 'MSK102-2-labelled formative paper inside FHB inventory carrier', pages: '3-4', objectiveMcqPrompts: 10, writtenPrompts: 3, answers: 0 },
      ],
      sourceFirstHandles: 7,
      priorFhb1022CollapsedHandles: 4,
      acceptedSourceHandles: 3,
      searchesRun: 12,
      familyQuestionDelta: 29,
      familyAnswerDelta: 0,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 3,
      sourceProcessed: true,
      authorityDisposition: 'CamScanner carrier of two direct formative-paper scans with blank Name/I.D. fields; pages 1-2 are headed FORMATIVE EXAME -FHB102-2 and pages 3-4 Formative Exam for MSK 102-2; no institution, department, examiner, date, marks, answer key or authenticated faculty mark is visible, so paper format supports assessment intent but not an authenticated sitting or key',
      boundaryDisposition: 'one FHB102-2 paper with thirteen objective MCQs plus three written prompts and one MSK102-2-labelled paper with ten objective MCQs plus three written prompts; twenty-nine visible assessment occurrences, all unkeyed; no practical, image-identification or teaching prompt boundary',
      preservedSourceDefects: ['the second paper is explicitly labelled MSK 102-2 despite residing in an FHB 102-2 inventory path and is not silently relabelled', 'both independent numbering sequences are preserved', 'all twenty-nine prompts are unkeyed and no answers are inferred', 'show-through from reverse-side printing is not counted as an extra prompt occurrence', 'printed grammatical and academically questionable tokens remain source truth without correction'],
    },
    {
      sha256: ELEVENTH_SOURCE.sha256,
      sourcePages: 6,
      renderedReadPages: '1-6',
      questionPages: '1-3',
      answerRevealPages: '4-6',
      promptRevealPairs: [{ questionPage: 1, answerRevealPage: 4 }, { questionPage: 2, answerRevealPage: 5 }, { questionPage: 3, answerRevealPage: 6 }],
      printedPromptObservations: 24,
      objectiveMcqPrompts: 24,
      answerRevealRepeatPrompts: 24,
      printedKeyObservations: 24,
      inlineHighlightedAnswerObservations: 24,
      sourceAbsentAnswers: 0,
      writtenPrompts: 0,
      practicalOrImagePrompts: 0,
      teachingPrompts: 0,
      sourceFirstHandles: 5,
      priorFhb1022CollapsedHandles: 4,
      acceptedSourceHandles: 1,
      searchesRun: 4,
      familyQuestionDelta: 24,
      familyAnswerDelta: 24,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 1,
      sourceProcessed: true,
      authorityDisposition: 'named Formative questions 102 revision carrier with By / Dr Mo Haitham and Nour elganaihy printed in each footer and March 2026 iOS Quartz metadata; the filename supplies a Spring 2026 label, but no institution, department, examiner, sitting, marks or authenticated faculty-key claim is visible; highlighted options are source answer evidence rather than an official faculty key',
      boundaryDisposition: 'three independent eight-question conventional objective sets on pages 1-3; pages 4-6 repeat the exact respective prompt sequences with one inline yellow-highlighted source answer each; twenty-four distinct prompts and twenty-four prompt-matched answer observations, with reveal repeats excluded from the question count and no written, practical, image-identification or teaching prompt boundary',
      preservedSourceDefects: ['pages 4-6 are answer-bearing reveal repeats of pages 1-3 and do not create twenty-four additional question occurrences', 'highlighted responses concerning dimorphic-fungus temperature, Cryptococcus capsule, viral envelope, inactivated-vaccine production, bacterial-host relationships and fungal-versus-bacterial structure remain source truth without medical correction', 'the footer attribution and Spring 2026 filename are not treated as institution, exam-sitting or authenticated faculty-key authority', 'the inline highlights are source answer evidence rather than authenticated faculty-key observations'],
    },
    {
      sha256: TWELFTH_SOURCE.sha256,
      sourcePages: 44,
      renderedReadPages: '1-44',
      nonAssessmentPages: '1',
      questionPages: '2-42',
      answerOnlyPages: '43-44',
      printedPromptObservations: 334,
      objectiveMcqPrompts: 334,
      conventionalMultipleChoiceOrMatchingPrompts: 297,
      trueFalsePrompts: 37,
      printedAnswerTokens: 334,
      printedKeyObservations: 334,
      sourceAbsentAnswers: 0,
      writtenPrompts: 0,
      practicalOrImagePrompts: 0,
      teachingPrompts: 0,
      sectionBoundary: [
        { section: 'Microbial world and bacterial cell structure', questionPages: '2-16', questionLabels: '1-115' },
        { section: 'Bacterial growth and physiology', questionPages: '16-20', questionLabels: '116-155' },
        { section: 'Bacterial genetics', questionPages: '20-27', questionLabels: '156-199' },
        { section: 'Antibacterial agents and chemotherapy', questionPages: '27-35', questionLabels: '200-271' },
        { section: 'Host-microbe relationship and epidemiology of infectious diseases', questionPages: '35-39', questionLabels: '272-297' },
        { section: 'True or false review', questionPages: '39-42', questionLabels: '298-334' },
      ],
      sourceFirstHandles: 8,
      priorFhb1022CollapsedHandles: 8,
      acceptedSourceHandles: 0,
      searchesRun: 0,
      familyQuestionDelta: 334,
      familyAnswerDelta: 334,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 0,
      sourceProcessed: true,
      authorityDisposition: 'CamScanner reproduction titled Bacteriology & Mycology & Infection Control in Health Care Sittings and visibly attributed to Amany Tharwat Abdel Rahman, Professor of Microbiology and Immunology; no institution, module, examiner, sitting, marks or authenticated faculty-key claim is visible; the terminal answer tables are source answer evidence rather than an official MUST key',
      boundaryDisposition: 'one cover page; Q1-Q297 as conventional multi-option or matching items and Q298-Q334 as true-or-false items on pages 2-42; complete answer-only tables for Q1-Q334 on pages 43-44; 334 distinct objective prompts and 334 prompt-matched printed answer observations with no written, practical, image-identification or teaching prompt boundary',
      preservedSourceDefects: ['matching labels are independently numbered assessment occurrences and are counted once each', 'page-break continuations remain one prompt occurrence', 'printed spelling, deprecated terminology, internal contradictions and academically questionable answer tokens remain source truth without correction', 'the professor attribution and question-book title are not treated as MUST institution, exam-sitting or authenticated faculty-key authority'],
    },
    {
      sha256: THIRTEENTH_SOURCE.sha256,
      sourcePages: 20,
      renderedReadPages: '1-20',
      nonAssessmentPages: '1',
      questionPages: '2-17',
      answerOnlyPages: '18-20',
      printedPromptObservations: 174,
      objectiveMcqPrompts: 122,
      generalVirologyMcqPrompts: 65,
      trueFalsePrompts: 55,
      systemicVirologyMcqPrompts: 2,
      writtenPrompts: 52,
      completionWrittenPrompts: 52,
      printedKeyObservations: 172,
      sourceAbsentAnswers: 2,
      practicalOrImagePrompts: 0,
      teachingPrompts: 0,
      sectionBoundary: [
        { section: 'General virology MCQs', questionPages: '2-10', questionLabels: '1-65', prompts: 65, answers: 65 },
        { section: 'Complete questions on general virology', questionPages: '10-15', answerPages: '19-20', questionLabels: '1-52', prompts: 52, answers: 52 },
        { section: 'True and false questions on general virology', questionPages: '15-17', answerPage: '18', questionLabels: '1-55', prompts: 55, answers: 55 },
        { section: 'MCQs on systemic virology', questionPage: '17', questionLabels: '1-2', prompts: 2, answers: 0, sourceAbsentAnswers: 2 },
      ],
      sourceFirstHandles: 7,
      priorFhb1022CollapsedHandles: 7,
      acceptedSourceHandles: 0,
      searchesRun: 0,
      familyQuestionDelta: 174,
      familyAnswerDelta: 172,
      liveHits: 0,
      pendingHits: 0,
      newConceptsAfterPriorFhb1022Collapse: 0,
      sourceProcessed: true,
      authorityDisposition: 'CamScanner reproduction headed Medical Virology and visibly attributed to Tahany Ahmad Abdel Raouf, Professor of Microbiology and Immunology; no institution, module, examiner, sitting, marks or authenticated faculty-key claim is visible; answer tables are source answer evidence rather than an official MUST key',
      boundaryDisposition: 'one cover page; sixty-five general-virology MCQs, fifty-two numbered completion/written prompts, fifty-five true-or-false items, and two terminal systemic-virology MCQs on pages 2-17; pages 18-20 answer every prompt except the two systemic-virology MCQs; 174 prompt occurrences and 172 prompt-matched answer observations with no practical, image-identification or teaching prompt boundary',
      preservedSourceDefects: ['the two systemic-virology MCQs on page 17 have no printed answer and none is inferred', 'multi-blank completion items remain one assessment occurrence and one answer observation per printed number', 'page-break continuations remain one prompt occurrence', 'printed spelling, deprecated terminology, internal contradictions and academically questionable answers remain source truth without correction', 'the professor attribution and Medical Virology heading are not treated as MUST institution, exam-sitting or authenticated faculty-key authority'],
    },
  ],
  triageCumulative: { printedPromptObservations: 1405, printedKeyObservations: 1366, namedConceptsAssigned: 60, liveHits: 0, pendingHits: 0, newConcepts: 60 },
  firstSourceCandidate: FIRST_SOURCE,
  secondSourceCandidate: SECOND_SOURCE,
  thirdSourceCandidate: THIRD_SOURCE,
  fourthSourceCandidate: FOURTH_SOURCE,
  fifthSourceCandidate: FIFTH_SOURCE,
  sixthSourceCandidate: SIXTH_SOURCE,
  seventhSourceCandidate: SEVENTH_SOURCE,
  eighthSourceCandidate: EIGHTH_SOURCE,
  ninthSourceCandidate: NINTH_SOURCE,
  tenthSourceCandidate: TENTH_SOURCE,
  eleventhSourceCandidate: ELEVENTH_SOURCE,
  twelfthSourceCandidate: TWELFTH_SOURCE,
  thirteenthSourceCandidate: THIRTEENTH_SOURCE,
  nextSourceCandidate: NEXT_SOURCE,
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
