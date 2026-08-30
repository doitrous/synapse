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
const COMPLETED_SOURCE_SCREEN = {
  sha256: 'c9acc5b2b0f555649cd344edf6f4c0faddacc97b30940f023f55c76693002983',
  sourcePages: 101,
  renderedReadPages: '1-101',
  printedPromptObservations: 111,
  printedKeyObservations: 0,
  namedConceptsAssigned: 0,
  sourceProcessed: true,
}
const PROCESSED_FAMILY_HASHES = [
  'a87b09c5f33157263fb623fcfbc2eeb315f90633fdd1a5a8f9244a67c6313e95',
  'a569f3a6960887f8852b74db3a73a828f642b4857e68ccad9c81db8a3993fbec',
  '349ca7a6f8d6fb2622384456c8ecc03a3b8088c1cd09b8fd58d41af4eaa8b54f',
  '3185bf1cbb970c279afdc5bc0a36f9aef98fc50198a30619e940198105b08d6a',
  'e52ac69820eff5407e033622c6163130ce2e52f1624eade5a46ee3e3fb266bcb',
  '5606f1829f2868ca94669174e185a385aebc3ba38c913b1921cfc769add2ed56',
  '14aca09deac964563bef09fe2f12b651db40c7d789bad98527d56f90d74f8668',
  '441ea28e2179fa0488d8afed03d595aae31e97087607c13d16c929fe0db62906',
  '56137b8483844ab6aa52d12ee164beaac03207d97195414019bf70a4350dfeb4',
  '5a363e2f09c2b2ac7d13d5a29adf9a6a0d1e97dfe70f74f885529285516aaf76',
  '23248abb15aad2399e99a4cf7c5d0d0aca0070287efb5e24739a982b83c8fafa',
  'a433bee65fdb0cdb5a5f9f17948789d58e91f49a633a7502672e5981efa05662',
  '6c2aa8130c1d9d73c68acaf44ba2f39f5ce9709c9c8f332cda5cd2751a973f7b',
  '2e869cc596ae375f593d7b899b2090c4bcb3ef4cd29e1fd4b68c01860de91a60',
  'ebdfe31bcde14e7c0a3f068748d3f9543d34346a2d439c92c0add1de8b0d13af',
  '137b732d2192915c54a3b9b3b9fa245e48f991cabfd1d88c4212e279837e1c9b',
  '492fc275403ca0435a94d678378c2c8d444248134d1a0621d7476952eab8db41',
  '7eae568758b50729de376c829bf30c964bddc048bb74dc49210ad40d2ed019db',
  '5f1087b43622a1285ea2d011bd808ab42992a7630b9790b8e8803a3831ef419b',
  'c9acc5b2b0f555649cd344edf6f4c0faddacc97b30940f023f55c76693002983',
  'c7f9044d4f8c67e9369999ae71692dd98b153cfa68038a3f0115ede546873fe9',
  'a52b8c4a67088411b314bcab37820383ad7a32b05b03f0d293e84421db34f195',
  'bc12b680f19c703645cc26e0296cd5ab27b66d565c8480c0a07859842bee3d07',
  '784b370995586c0c1adac303fff438cc0c6faad9897a678229dfe6b2d3beec80',
  '871ca5046ee04990d95ead25942884a31d840009afe4e76d77779e13d294e294',
  '6ce0f81b5a2ab455d7194a47cb0833680b3dedfeb8840fbae72332a4afb8c206',
  '814bbedd8906d5c163797afbf65ccc4bf49b9698a278a2e9fa78f8596fc26d24',
  '6cf74ccb49a440815850ef9f458f80f31200f7b70fa8361f473af2ba3baaed89',
  'c4bf2ad6ce516b135823e91d7b02814107a4822f7b35ca7e4e23eb76807b3452',
  '28d4f5ec3791a9e54c086fa7c77614bd1f575b04ce655f3d8fd287b6980a1c97',
  '8c9858100455f46cdc85ee85b0719630703a458e164e71bdb80e8f7a1d01f89a',
  '545c5a3a4537d35c2e8228f261dfb48f87ea216c6cc89c016c603d0062a2d916',
  '140d0fd692d7c58f752faf2b50169a3c006d42e1becc93641532b0f8e92cdef7',
  '911f278560e8ee3b11a18fbc4116651e1c99b633be9b2b01e2f275b8b918c11d',
  '98361efdecd40f23a8e444b97fabf08cb8c5933c6d8f7bb10aa10c0e75d1551b',
  '7f3b6495509665efac02b6c16b6bc1b28de0eba800d2b4b0cb73d280bbe6a129',
  '032e8b2634ec8f4e8c9b694739f2d9f5a39115fa879437f18ed62e4b21dd0263',
  '80ca3b0d4df30607c1fb3ba5c99f09204d8fb8709752b8437d113c97d9cbdc28',
  '1cecd06ab3f64fc1fc58229fc82bae297af9f2b65d73040d67c11e0d7c14c2c4',
  'e6d0c5242f043d70b60c979dea0131e737be9e959db553a23adf38718f6246af',
  '786c3d2e96fa2c5d3fb34b470bbcb20fadf6182e05d25c72ec43ceca35bcfdd0',
  '220b2abe681b34636c9f888ec2bdf54ec743a0f1328abcc3ef8304de69945664',
  '6ea8ad8bf30d8191cb7aa1d1a073efa5c5e8832a9182c96264db8fe8a1622af6',
  '1e2b05e259ae2eca175f3c97a985e7c3a1b37d489ecedaed74fcd810998730a3',
  '025b988c1ce7f90beaf3f86ad4c8fde63cf27c4ce10616832e877c66cc222825',
  'd6c7f6be8d5066df575221ff5f3c7903d2c5204b2fddd81481fbd383a1d14100',
  '76b58bc56d2446cd2726f4fd96a038084d5bd8eb0081b30cbf64ad355de1ba31',
  '001c485cb1a8f9928c04a4390dbc920477f96285484f2dc4c7aeedd93dffa65b',
  '72f19c349bd5817ad84d61737cbc63cf844da772ecc71f1db3943853ade961cd',
  '2f57b61e7071d6e87a5ae7a0464cbae2ab7d2cef7f12941420473966fd89aa58',
  '8a64d8e0f81611aeeb3797c0c3d332c749c28505893e974d35e4e1d6712dcb6b',
  '994b3e415b43d5b276a810e5a74b177f5774d6d99b775a0e094b0914c76b2fbb',
  '81bd1052dfcf4d1985205bbf7ae7aaf419eba184f7a2204af600f58e605a1b7f',
  'b8ac8fb8398288c987687c364a49cd465bc7f94c777d02a34e444c1e86c68d4c',
  '71d44657e0d87a79998716f4d34dd2e8a2a29225b2bfb6ac2c124c46dc7cc1c3',
  '448345893d693ac8a08fd21a6ca326bc19cd1e4e36a1b26a03fb1d43c3f4b5e1',
  '62143e16ae5d80b75313c51fbf850cbe6fe0223940abc2131ab130cb7cf337c8',
  '6789f9c206abb44eb1cbbac5ffea20c0b0a052732c9569bca7a54ca407840618',
  'f968cf5a23f4fb2dca711ffe0abedbe3d94f7289ce3e3dc774d967c3fd5861a7',
  'c0f79eb94816582bfe81bd9fa724ba8b524a82a99ae6aba6bb3f4bf8a11a45ad',
  '7978c265f52aa8190589c47a01ef536ca753583e4699a39d59f3f5267e8566b4',
  '8d6091da0290ba43cd96017fafe09a5b7d14b2c362adcbca3d158d30cef768fd',
  'd738a7058cf60ce6456496a9d92ff33842e5cfd27693963a85079a2615ce151d',
  'c8e53814c441fa19bcab20e99812075c163b53d9a8147a080927f81723da4438',
  '345d7475ddb0ac4653ec09742516bc8e4c76e697be3eea96cc578dd8a4a50f8b',
  'd9a07518aecda26323373d582d437e0b854a0bcf083cf21a730ab0aa2e266f06',
  'af3e920291b581bbc053205c0f42229a4cee595d7a1a086011b4dcaec2f19ee6',
  '7be6cdf15892e27f1ee76f589d41ef072a3abf8f94d89b56e11782911da28380',
  '3617ee832b59ed14004cf501b2a502b27051b9b1d80ef5bdf3dd9bab4a7eff72',
  '0f4c76704d3e67b1c7db6e1d5df55d183fa7352da07e628502b550f29b7303b3',
  '2c9ba7d2333e672e7ecca19f595c3e77c6df40c01d02f23f9acdbe947dc1ba3d',
  '6846577508f49244d715afb12267b8b6db92ef5d9140be391919a040d2ba70de',
  'a6de213a3876866fe421224a4c1ee0d9998f40beccb13d648b0f29fbfe9d303c',
  'f23b50418ba1fb9d14494eda1db6c11f5e9d8c9d8e0e0bb4e97dae764b1d5333',
  'c87febba511ffa8db2f9ce53b9308edde620e6650c7464836fa7f46f9f65d2b4',
  'b39cd6a2feeba48546e1cf82b7d0b03b5a54d0cde43cbb719c343f081c889cad',
  '1f436a96117e21759285f2f2c549f37ad95d9939ed7068a5cff760baa43d562e',
  '4247d855313f6cdffdeaacb7cd2b12b2f7b33711d35c392720aaa8ceaedd6f93',
  'a44fb9d4295209c4722a348a02a865d9e18dacfcd75901dbaccc943c23a6a2ff',
  '22180a77cf8d4eb2d59d046ee1936efa544a79932b326cf554f9d343d73a34cd',
  '93cd4d818d9285c05ebed927fe56494f74b63226913616f1016c9bb03c4bd462',
  '5a481cad54731aef1bb2f12273e62a9c7d0d8273803aff5fdc3168d90be7df4e',
  'e2d3f6426b89f38d130b179e138641cbb15690fae6ce53cead26c20d7fdb74fb',
  'ae19d24e32de6833e7f42b1d1cb27518394af607bd75b618fa96c0f9c01364bc',
  '685e671956525d3ba1c709981d9fe1f97920fc1929e6f2a28ca2fc7fdc5b1746',
  'cab8d5df30995d578656bdc05780f2cc655bfb6e7b17fd4997ba065d85188c6a',
  'fd4b6a9e5c415da313f81663e39a4c4d60127752cf4762fe6799deed68711115',
  '168c6d4fa11fc30119b28a38b3f4f68e788c0e08dc37aef12ea13eb3fc1acdd3',
  '5582d9ca8f95ba200f9f2b6d68895ea51e2bd2b90be14158cbd1656542a7b5f2',
  '0fe5b1851c266615f551142b2824cb46e38a9b7c0359be8f671f80f994deec4f',
  '2dec835c8d017c992f906882435e68e992181cb41b5323df635c89f48d6f0098',
  'c68736c35ed34dec3ef483924d9957651bb298972b81416df1a971d1f68c8141',
  'f5d0b062bfdc1d03a7259d5ed345e3fff12ac80ecdf91b3a03d1bc1b97cc92dc',
  '19543c6669ea24693cf67555802a1d34a7330f621a05478a6af22d1abb938a16',
  '0540c06021496251ac88d8d5c1b3b91388ae562e93969c8295cc669e909fca15',
  '248048db0f9ccc82dd0f3cf28a176ace8a4615fed998da046c6746fe23d388d5',
  '833bde7eae7d5da6b9ba4032670ad61dee9b49bbb617b82e5910e2690b436607',
  '78a2e07d3c4d22724f5b83c0502bf7321b7f1516e295426d1d3fc34f6b9ba6ca',
  '5e7a3a7c3a890ac633e79f1c39d84445c3af117b1b5910fbdd266cf7a55aee24',
  '4b0c3b7ff8eef46a863234bb64b49154355991d4b32bb2e1b721011f7d2c05a0',
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
  const remainingChecksum = 'db98a57b90f11fc2d3fcf66064325bf005aefa349669ad51c89122591363f2e2'
  if (!readiness.includes(remainingChecksum) || !triage.includes(remainingChecksum)) throw new Error('Triage/readiness evidence does not pin the selected remaining checksum')
  if (!readiness.includes(COMPLETED_SOURCE_SCREEN.sha256)) throw new Error('Readiness evidence no longer retains the completed source')
  if (!PROCESSED_FAMILY_HASHES.includes(COMPLETED_SOURCE_SCREEN.sha256)) throw new Error('Completed source must be marked processed')
  for (const fragment of ['pages 1–101 of 101', '95 + 16 = 111', 'sourceProcessed=true', '0 named concepts']) {
    if (!triage.includes(fragment)) throw new Error(`Triage evidence does not pin full-source boundary: ${fragment}`)
  }
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
  if (parsed.triageCheckpointRemainingExtractionDebt.emptyTextRows !== 6 || parsed.triageCheckpointRemainingExtractionDebt.sparseTextRows !== 0 || parsed.triageCheckpointRemainingExtractionDebt.substantiveTextRows !== 0) throw new Error('Audit-label static test: triage debt drift')
  console.log('audit-label-static-test=pass forbidden-temporal-text-labels=absent audit_sample_labels=present triage_debt=0-substantive/6-empty/0-sparse')
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
if (remainingHashes.length !== 6 || processedHashes.length + remainingHashes.length !== selectedHashes.length) throw new Error('Processed and remaining hashes do not reconcile to 106')
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
  completedSourceCoverage: COMPLETED_SOURCE_SCREEN,
  remaining: { inventoryMetadataRows: ledgerRows.filter((row) => !processedHashes.includes(row.sha256)).length, uniqueSha256: remainingHashes.length, sortedNewlineSha256: remainingChecksum, auditSampleStatusCounts: remainingAuditSampleStatusCounts },
  triageCheckpointRemainingExtractionDebt: { substantiveTextRows: 0, emptyTextRows: 6, sparseTextRows: 0, source: 'pinned triage/readiness checkpoint; not replaced by audit-sample status counts' },
  reconciliation: { selectedUniqueSha256: selectedHashes.length, processedUniqueSha256: processedHashes.length, remainingUniqueSha256: remainingHashes.length, processedPlusRemaining: processedHashes.length + remainingHashes.length },
  year1RecoveryOutcomes: recoveryOutcomes,
}
const provenanceText = `${JSON.stringify(provenance, null, 2)}\n`
requireSafeOutput(ledger, 'ledger')
requireSafeOutput(provenanceText, 'provenance')
writeFileSync(options['ledger-out'], ledger, 'utf8')
writeFileSync(options['provenance-out'], provenanceText, 'utf8')
console.log(`snapshot-fhb101-evidence: rows=${ledgerRows.length}; unique_hashes=${selectedHashes.length}; duplicate_paths=${ledgerRows.length - selectedHashes.length}; processed=${processedHashes.length}; remaining=${remainingHashes.length}; remaining_sha256=${remainingChecksum}; inventory_metadata_rows=${ledgerRows.length}; live_source_verification=false`)
