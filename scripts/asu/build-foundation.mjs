#!/usr/bin/env node
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(fileURLToPath(new URL('../..', import.meta.url)))
const sourceRoot = process.argv[2]
  ? path.resolve(process.argv[2])
  : '/Users/doitrous/Desktop/ain shams'
const outRoot = path.join(repoRoot, 'docs/Ain-Shams-Source-Imports')
const manifestDir = path.join(outRoot, 'manifest')
const academicDir = path.join(outRoot, 'academic')
const evidenceDir = path.join(outRoot, 'evidence')
const coverageDir = path.join(outRoot, 'coverage')
const today = new Date().toISOString().slice(0, 10)

const YEAR_IDS = new Map([
  ['Year 1', 'ASU_Y1'],
  ['Year 2', 'ASU_Y2'],
  ['Year 3', 'ASU_Y3'],
])

const MODULE_IDS = new Map([
  ['Basic Life Support, History Taking and Clinical Examination', 'ASU-BLS'],
  ['Blood', 'ASU-BLOOD'],
  ['Cardiovascular System', 'ASU-CVS'],
  ['Central Nervous System', 'ASU-CNS'],
  ['Clinical Endocrinology', 'ASU-CLIN-ENDO'],
  ['Clinical Neurosciences and Special Senses', 'ASU-CLIN-NSS'],
  ['Clinical Urogenital Medicine', 'ASU-CLIN-UG'],
  ['Communication Skills', 'ASU-COMM'],
  ['Endocrine System', 'ASU-ENDO'],
  ['General Pathology', 'ASU-GPATH'],
  ['General Pharmacology', 'ASU-GPHARM'],
  ['Immunology', 'ASU-IMM'],
  ['Infection', 'ASU-INF'],
  ['Introduction to Anatomy and Embryology', 'ASU-AE'],
  ['Introduction to Histology and Cell Biology', 'ASU-HCB'],
  ['Introduction to Medical Biochemistry', 'ASU-IBM'],
  ['Locomotor System', 'ASU-LOCO'],
  ['Molecular Biology and Medical Genetics', 'ASU-MBG'],
  ['Research Methodology', 'ASU-RES-METH'],
  ['Respiratory System', 'ASU-RESP'],
  ['Special Senses', 'ASU-SENSES'],
  ['Urogenital System', 'ASU-UG'],
])

const ADMIN_MODULES = new Set(['Administration'])
const MEDIA_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic', '.tif', '.tiff', '.bmp', '.mp3', '.wav', '.m4a', '.mp4', '.mov'])
const OFFICE_EXT = new Set(['.docx', '.pptx', '.xlsx'])
const TEXT_EXT = new Set(['.txt', '.md', '.csv'])
const EXCLUDED_NAMES = new Set(['.DS_Store'])

function ensureDirs() {
  for (const dir of [manifestDir, academicDir, evidenceDir, coverageDir]) fs.mkdirSync(dir, { recursive: true })
}

function walk(dir) {
  const out = []
  for (const name of fs.readdirSync(dir).sort((a, b) => a.localeCompare(b))) {
    if (EXCLUDED_NAMES.has(name)) continue
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) out.push(...walk(full))
    else if (stat.isFile()) out.push(full)
  }
  return out
}

function sha256(file) {
  const hash = crypto.createHash('sha256')
  hash.update(fs.readFileSync(file))
  return hash.digest('hex')
}

function rel(file) {
  return path.relative(sourceRoot, file).split(path.sep).join('/')
}

function cleanModuleId(moduleName, yearName) {
  if (!moduleName || ADMIN_MODULES.has(moduleName)) return null
  const base = MODULE_IDS.get(moduleName) || `ASU-${slug(moduleName)}`
  if (moduleName === 'Central Nervous System' && yearName === 'Year 2') return 'ASU-CNS-2'
  if (moduleName === 'Central Nervous System' && yearName === 'Year 3') return 'ASU-CNS-3'
  if (moduleName === 'Endocrine System' && yearName === 'Year 2') return 'ASU-ENDO-2'
  if (moduleName === 'Endocrine System' && yearName === 'Year 3') return 'ASU-ENDO-3'
  if (moduleName === 'Special Senses' && yearName === 'Year 2') return 'ASU-SENSES-2'
  if (moduleName === 'Special Senses' && yearName === 'Year 3') return 'ASU-SENSES-3'
  if (moduleName === 'Research Methodology' && yearName === 'Year 2') return 'ASU-RES-METH-2'
  if (moduleName === 'Research Methodology' && yearName === 'Year 3') return 'ASU-RES-METH-3'
  return base
}

function slug(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'UNKNOWN'
}

function sniffExtension(file) {
  const ext = path.extname(file)
  if (ext === '.pdf_' || ext === '.PDF_') return { fileType: 'pdf', extensionSniffed: true }
  if (ext) return { fileType: ext.slice(1).toLowerCase(), extensionSniffed: false }
  return { fileType: 'unknown', extensionSniffed: false }
}

function category(parts, fileName, fileType) {
  const lower = `${parts.join('/')} ${fileName}`.toLowerCase()
  if (parts.includes('Schedules')) return 'Administrative (schedule)'
  if (parts.includes('Questions') && lower.includes('essay')) return 'Written Questions'
  if (parts.includes('Questions') || lower.includes('mcq') || lower.includes('question')) return 'MCQs'
  if (parts.includes('Practical') || lower.includes('practical')) return 'Practical'
  if (parts.includes('Lectures') || parts.includes('Slides') || lower.includes('lecture')) return 'Lectures'
  if (parts.includes('All Subjects')) return 'Integrated module material'
  if (MEDIA_EXT.has(`.${fileType}`)) return 'Media'
  return 'Instructor material'
}

function yearLabelFromName(name) {
  const matches = name.match(/20\d{2}(?:[-/ ]20\d{2})?/g)
  return matches ? matches[matches.length - 1].replace(/\//g, '-') : null
}

function pdfInfo(file) {
  try {
    const info = execFileSync('pdfinfo', [file], { encoding: 'utf8', timeout: 20_000 })
    const pages = info.match(/^Pages:\s+(\d+)/m)
    const pageCount = pages ? Number(pages[1]) : null
    const last = pageCount ? Math.min(pageCount, 3) : 1
    let text = ''
    try {
      text = execFileSync('pdftotext', ['-f', '1', '-l', String(last), file, '-'], { encoding: 'utf8', timeout: 30_000 })
    } catch {}
    const readable = readability(text)
    return {
      pageCount,
      textLayer: readable.words >= 12 ? 'native' : 'none',
      processingStatus: readable.words >= 12 ? 'pending' : 'blocked_no_text_layer_no_ocr',
      textLayerWordRatio: readable.ratio,
      controlCharDetected: readable.controlCharDetected,
      blocker: readable.words >= 12 ? null : 'no_native_text_layer_and_ocr_forbidden',
    }
  } catch (error) {
    return {
      pageCount: null,
      textLayer: 'unreadable',
      processingStatus: 'blocked_corrupt_or_unreadable',
      textLayerWordRatio: 0,
      controlCharDetected: false,
      blocker: `pdf_metadata_failed: ${String(error.message || error).split('\n')[0]}`,
    }
  }
}

function officeInfo(file, fileType) {
  try {
    const listing = execFileSync('unzip', ['-Z1', file], { encoding: 'utf8', timeout: 10_000 })
    const members = listing.split(/\r?\n/).filter(Boolean)
    const wanted = members.filter((name) => {
      if (fileType === 'docx') return name === 'word/document.xml'
      if (fileType === 'pptx') return /^ppt\/slides\/slide\d+\.xml$/.test(name)
      if (fileType === 'xlsx') return name === 'xl/sharedStrings.xml'
      return false
    }).slice(0, 12)
    let text = ''
    for (const member of wanted) {
      try {
        text += execFileSync('unzip', ['-p', file, member], { encoding: 'utf8', timeout: 10_000 }).replace(/<[^>]+>/g, ' ')
      } catch {}
    }
    const readable = readability(text)
    return {
      pageCount: fileType === 'pptx' ? members.filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name)).length : null,
      textLayer: readable.words >= 12 ? 'native' : 'none',
      processingStatus: readable.words >= 12 ? 'pending' : 'blocked_no_readable_office_text',
      textLayerWordRatio: readable.ratio,
      controlCharDetected: readable.controlCharDetected,
      blocker: readable.words >= 12 ? null : 'no_readable_office_text_without_external_conversion',
    }
  } catch (error) {
    return {
      pageCount: null,
      textLayer: 'unreadable',
      processingStatus: 'blocked_corrupt_or_unreadable',
      textLayerWordRatio: 0,
      controlCharDetected: false,
      blocker: `office_metadata_failed: ${String(error.message || error).split('\n')[0]}`,
    }
  }
}

function readability(text) {
  const chars = text.length
  const controls = Array.from(text).filter((ch) => {
    const code = ch.charCodeAt(0)
    return (code < 32 && !'\n\r\t'.includes(ch)) || code === 127
  }).length
  const words = text.match(/[^\W\d_]{3,}/gu)?.length || 0
  const wordChars = (text.match(/[^\W\d_]/gu) || []).length
  return {
    words,
    ratio: chars ? Number((wordChars / chars).toFixed(4)) : 0,
    controlCharDetected: chars ? controls / chars > 0.05 : false,
  }
}

function textInfo(file) {
  try {
    const text = fs.readFileSync(file, 'utf8')
    const readable = readability(text)
    return {
      pageCount: null,
      textLayer: readable.words >= 12 ? 'native' : 'none',
      processingStatus: readable.words >= 12 ? 'pending' : 'blocked_no_readable_text',
      textLayerWordRatio: readable.ratio,
      controlCharDetected: readable.controlCharDetected,
      blocker: readable.words >= 12 ? null : 'no_readable_text',
    }
  } catch (error) {
    return {
      pageCount: null,
      textLayer: 'unreadable',
      processingStatus: 'blocked_corrupt_or_unreadable',
      textLayerWordRatio: 0,
      controlCharDetected: false,
      blocker: `text_read_failed: ${String(error.message || error).split('\n')[0]}`,
    }
  }
}

function sourceRecord(file, bySha) {
  const relative = rel(file)
  const parts = relative.split('/')
  const yearName = parts[0]
  const term = parts[1]?.startsWith('Term ') ? parts[1] : null
  const moduleFolder = term ? parts[2] : parts[1]
  const subjectFolder = moduleFolder === 'Administration' ? null : (term ? parts[3] : parts[2])
  const kindFolder = moduleFolder === 'Administration' ? parts[2] : (term ? parts[4] : parts[3])
  const subFolder = moduleFolder === 'Administration' ? parts[3] : (term ? parts[5] : parts[4])
  const yearId = YEAR_IDS.get(yearName) || null
  const moduleId = cleanModuleId(moduleFolder, yearName)
  const { fileType, extensionSniffed } = sniffExtension(file)
  const hash = sha256(file)
  const sourceId = `src_${hash.slice(0, 20)}`
  const fileName = path.basename(file)
  const cat = category(parts, fileName, fileType)
  let info
  if (fileType === 'pdf') info = pdfInfo(file)
  else if (OFFICE_EXT.has(`.${fileType}`)) info = officeInfo(file, fileType)
  else if (TEXT_EXT.has(`.${fileType}`)) info = textInfo(file)
  else if (MEDIA_EXT.has(`.${fileType}`)) info = { pageCount: null, textLayer: null, processingStatus: 'media_only', textLayerWordRatio: null, controlCharDetected: false, blocker: 'media_only_no_text_extraction' }
  else info = { pageCount: null, textLayer: null, processingStatus: 'blocked_unsupported_file_type', textLayerWordRatio: null, controlCharDetected: false, blocker: `unsupported_file_type_${fileType}` }
  const firstForSha = bySha.get(hash)
  if (!firstForSha) bySha.set(hash, sourceId)
  return {
    sourceId,
    sha256: hash,
    absolutePath: file,
    corpusRelativePath: relative,
    fileName,
    fileNameWithoutInstructions: fileName,
    universityId: 'asu',
    yearId,
    moduleId,
    secondaryModule: null,
    moduleSubjectPath: moduleId && subjectFolder ? `${moduleId} > ${subjectFolder}` : null,
    sourceCategory: cat,
    instructor: null,
    crossModulePractical: false,
    subject: subjectFolder,
    examType: cat.includes('MCQ') ? 'MCQ' : (cat.includes('Written') ? 'Written' : null),
    bookKind: null,
    sourceTier: tier(cat),
    folderPriorityLabel: null,
    examSitting: null,
    rawYearCode: null,
    batchImpliesCalendarYear: null,
    calendarYearLabel: yearLabelFromName(fileName),
    yearConflict: null,
    examSittingYear: null,
    examSittingYearSource: null,
    solvedStatus: /solved|answer|answered|key/i.test(fileName) ? 'solved_or_answered_label' : null,
    oldSystemExcluded: false,
    exclusionReason: moduleFolder === 'Administration' ? 'administrative_schedule' : null,
    appliedNoteInstructions: [],
    fileType,
    pageCount: info.pageCount,
    textLayer: info.textLayer,
    processingStatus: info.processingStatus,
    extractionDisposition: disposition(info.processingStatus),
    moduleFolder,
    term,
    subjectFolder,
    kindFolder,
    subFolder,
    extensionSniffed,
    textLayerWordRatio: info.textLayerWordRatio,
    controlCharDetected: info.controlCharDetected,
    probeStatus: info.blocker ? 'blocked' : 'native_text_probe_ok',
    probeOcrChars: null,
    duplicateOf: firstForSha || null,
    twinOf: null,
  }
}

function tier(cat) {
  if (cat === 'Administrative (schedule)') return 9
  if (cat === 'Lectures') return 1
  if (cat === 'Practical') return 2
  if (cat === 'MCQs' || cat === 'Written Questions') return 3
  if (cat === 'Integrated module material') return 4
  if (cat === 'Media') return 8
  return 5
}

function disposition(status) {
  if (status === 'pending') return 'ready'
  if (status === 'media_only') return 'media_only'
  if (status?.startsWith('blocked')) return 'blocked'
  return 'blocked'
}

function manifestFor(yearName, sources) {
  const yearId = YEAR_IDS.get(yearName)
  const inYear = sources.filter((s) => s.yearId === yearId)
  const declMap = new Map()
  for (const s of inYear) {
    if (!s.moduleId || !s.subjectFolder) continue
    const key = `${s.moduleId}\t${s.moduleFolder}\t${s.subjectFolder}`
    const current = declMap.get(key) || { moduleId: s.moduleId, moduleFolder: s.moduleFolder, subjectFolder: s.subjectFolder, kind: 'observed subject folder', fileCount: 0 }
    current.fileCount += 1
    declMap.set(key, current)
  }
  return {
    schemaVersion: 'kasr-source-manifest/1.0.0',
    generatedOn: today,
    universityId: 'asu',
    yearId,
    corpusRoot: path.join(sourceRoot, yearName),
    note: 'Generated from the local Ain Shams source tree without OCR. Field semantics follow the Kasr manifest where comparable; ASU module IDs are local to this source foundation and are derived from observed year/term/module/subject folders.',
    moduleSubjectDeclarations: Array.from(declMap.values()).sort(compareDecl),
    count: inYear.length,
    sources: inYear.sort((a, b) => a.corpusRelativePath.localeCompare(b.corpusRelativePath)),
  }
}

function compareDecl(a, b) {
  return a.moduleId.localeCompare(b.moduleId) || a.subjectFolder.localeCompare(b.subjectFolder)
}

function buildSourceIndex(sources) {
  const byId = new Map()
  for (const s of sources) {
    if (!readableForIndex(s)) continue
    const entry = byId.get(s.sourceId) || {
      sourceRelativePath: s.corpusRelativePath,
      sourceRelativePaths: [],
      sha256: s.sha256,
      processingStatus: s.processingStatus,
      pageCount: s.pageCount,
      languages: ['en'],
      exclusionReason: s.exclusionReason,
      universityId: 'asu',
      yearIds: [],
      moduleIds: [],
      categories: [],
    }
    entry.sourceRelativePaths.push(s.corpusRelativePath)
    if (s.yearId && !entry.yearIds.includes(s.yearId)) entry.yearIds.push(s.yearId)
    if (s.moduleId && !entry.moduleIds.includes(s.moduleId)) entry.moduleIds.push(s.moduleId)
    if (s.sourceCategory && !entry.categories.includes(s.sourceCategory)) entry.categories.push(s.sourceCategory)
    byId.set(s.sourceId, entry)
  }
  const out = {}
  for (const [id, entry] of Array.from(byId.entries()).sort((a, b) => a[0].localeCompare(b[0]))) {
    entry.sourceRelativePaths.sort()
    entry.yearIds.sort()
    entry.moduleIds.sort()
    entry.categories.sort()
    entry.sourceRelativePath = entry.sourceRelativePaths.length === 1 ? entry.sourceRelativePaths[0] : null
    out[id] = entry
  }
  return {
    note: 'Ain Shams readable in-scope source IDs generated from local files without OCR. Scanned/corrupt/media-only files remain in manifests and coverage ledgers but are omitted here until readable text exists.',
    generatedFrom: [
      'docs/Ain-Shams-Source-Imports/manifest/asu-y1-sources.json',
      'docs/Ain-Shams-Source-Imports/manifest/asu-y2-sources.json',
      'docs/Ain-Shams-Source-Imports/manifest/asu-y3-sources.json',
    ],
    manifestGeneratedOn: today,
    count: Object.keys(out).length,
    sources: out,
  }
}

function readableForIndex(s) {
  if (s.extractionDisposition !== 'ready') return false
  if (s.sourceCategory === 'Media') return false
  return true
}

function academicMarkdown(yearName, manifest) {
  const lines = []
  lines.push('<!--')
  lines.push(`  Ain Shams ${yearName} academic structure.`)
  lines.push('  Derived only from the local folder hierarchy and schedule/source filenames under /Users/doitrous/Desktop/ain shams.')
  lines.push('  No medical topics, facts, marks, or citations were inferred from unread source content.')
  lines.push('  Import target: Academic Setup > Import. Review module IDs before applying; they are ASU-local IDs.')
  lines.push('-->')
  lines.push('')
  lines.push(`# ${yearName}`)
  const byTerm = groupBy(manifest.sources.filter((s) => s.moduleId), (s) => s.term || 'Administration')
  for (const term of Array.from(byTerm.keys()).sort(termSort)) {
    lines.push(`## ${term}`)
    const byModule = groupBy(byTerm.get(term), (s) => `${s.moduleId}\t${s.moduleFolder}`)
    for (const key of Array.from(byModule.keys()).sort()) {
      const [moduleId, moduleFolder] = key.split('\t')
      lines.push(`- ${moduleFolder} [${moduleId}]`)
      const bySubject = groupBy(byModule.get(key).filter((s) => s.subjectFolder), (s) => s.subjectFolder)
      for (const subject of Array.from(bySubject.keys()).sort()) {
        lines.push(`  - ${subject}`)
        const byKind = groupBy(bySubject.get(subject), (s) => s.kindFolder || 'Files')
        for (const kind of Array.from(byKind.keys()).sort()) {
          lines.push(`    - ${kind} (${byKind.get(kind).length} files)`)
        }
      }
    }
  }
  lines.push('')
  lines.push('## Source Evidence Used')
  lines.push(`- Manifest: docs/Ain-Shams-Source-Imports/manifest/asu-y${manifest.yearId.slice(-1).toLowerCase()}-sources.json`)
  lines.push(`- Observed subject declarations: ${manifest.moduleSubjectDeclarations.length}`)
  lines.push(`- Source files inventoried: ${manifest.count}`)
  lines.push('- Blockers are listed in the matching coverage ledger; no OCR was performed.')
  lines.push('')
  return lines.join('\n')
}

function termSort(a, b) {
  const rank = (x) => x === 'Term 1' ? 1 : x === 'Term 2' ? 2 : x === 'Administration' ? 3 : 9
  return rank(a) - rank(b) || a.localeCompare(b)
}

function coverageMarkdown(yearName, manifest) {
  const summary = countBy(manifest.sources, (s) => coverageState(s))
  const pages = manifest.sources.reduce((n, s) => n + (s.pageCount || 0), 0)
  const lines = []
  lines.push(`# ${manifest.yearId} — source coverage`)
  lines.push('')
  lines.push(`Generated by \`node scripts/asu/build-foundation.mjs "${sourceRoot}"\`.`)
  lines.push('No OCR was performed; files without native readable text are explicit blockers.')
  lines.push('')
  lines.push(`${manifest.count} source files inventoried, ${pages} pages/slides counted where metadata was readable.`)
  lines.push('')
  lines.push('| State | Files | Meaning |')
  lines.push('| --- | ---: | --- |')
  for (const state of ['ready', 'blocked', 'duplicate', 'corrupt', 'media-only']) {
    lines.push(`| ${state} | ${summary.get(state) || 0} | ${stateMeaning(state)} |`)
  }
  lines.push('')
  lines.push('## Module Summary')
  lines.push('')
  lines.push('| Module | Subject folders | Files | Ready | Blocked | Duplicate | Media-only |')
  lines.push('| --- | ---: | ---: | ---: | ---: | ---: | ---: |')
  const byModule = groupBy(manifest.sources, (s) => s.moduleId || 'unassigned')
  for (const moduleId of Array.from(byModule.keys()).sort()) {
    const rows = byModule.get(moduleId)
    const subjects = new Set(rows.map((s) => s.subjectFolder).filter(Boolean)).size
    lines.push(`| ${moduleId} | ${subjects} | ${rows.length} | ${rows.filter((s) => coverageState(s) === 'ready').length} | ${rows.filter((s) => coverageState(s) === 'blocked' || coverageState(s) === 'corrupt').length} | ${rows.filter((s) => coverageState(s) === 'duplicate').length} | ${rows.filter((s) => coverageState(s) === 'media-only').length} |`)
  }
  lines.push('')
  lines.push('## Blockers')
  lines.push('')
  const blockers = manifest.sources.filter((s) => ['blocked', 'corrupt'].includes(coverageState(s)))
  if (!blockers.length) lines.push('None.')
  for (const s of blockers) lines.push(`- **${s.fileName}** — ${s.processingStatus}; ${s.corpusRelativePath}`)
  lines.push('')
  lines.push('## Duplicates')
  lines.push('')
  const dupes = manifest.sources.filter((s) => coverageState(s) === 'duplicate')
  if (!dupes.length) lines.push('None.')
  for (const s of dupes) lines.push(`- **${s.fileName}** duplicates ${s.duplicateOf}; ${s.corpusRelativePath}`)
  lines.push('')
  lines.push('## Every Source')
  lines.push('')
  lines.push('| Source ID | File | Category | Pages | Text | State |')
  lines.push('| --- | --- | --- | ---: | --- | --- |')
  for (const s of manifest.sources) {
    lines.push(`| ${s.sourceId} | ${escapeCell(s.corpusRelativePath)} | ${escapeCell(s.sourceCategory)} | ${s.pageCount ?? ''} | ${s.textLayer ?? ''} | ${coverageState(s)} |`)
  }
  lines.push('')
  return lines.join('\n')
}

function coverageState(s) {
  if (s.duplicateOf) return 'duplicate'
  if (s.processingStatus === 'media_only') return 'media-only'
  if (s.processingStatus === 'blocked_corrupt_or_unreadable') return 'corrupt'
  if (s.extractionDisposition === 'ready') return 'ready'
  return 'blocked'
}

function stateMeaning(state) {
  return {
    ready: 'Native readable text or Office/XML text was found; ready for later semantic/content work.',
    blocked: 'No readable native text or unsupported type; left visible because OCR/import is out of scope.',
    duplicate: 'Same bytes as another source ID/path; not reprocessed independently.',
    corrupt: 'Metadata/text probe failed; source needs manual repair or replacement.',
    'media-only': 'Image/audio/video asset, not a text source.',
  }[state]
}

function groupBy(rows, keyFn) {
  const map = new Map()
  for (const row of rows) {
    const key = keyFn(row)
    const list = map.get(key) || []
    list.push(row)
    map.set(key, list)
  }
  return map
}

function countBy(rows, keyFn) {
  const map = new Map()
  for (const row of rows) map.set(keyFn(row), (map.get(keyFn(row)) || 0) + 1)
  return map
}

function escapeCell(value) {
  return String(value ?? '').replace(/\|/g, '\\|')
}

function writeJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 1)}\n`)
}

function writeIndexIfAbsent(manifests, sourceIndex) {
  const indexPath = path.join(outRoot, 'INDEX.md')
  if (fs.existsSync(indexPath)) return { path: indexPath, action: 'preserved-existing' }

  const lines = []
  lines.push('# Ain Shams source imports')
  lines.push('')
  lines.push('Shared source foundation for Ain Shams Years 1, 2 and 3. Generated from `/Users/doitrous/Desktop/ain shams` without OCR, import, commit, push or publication.')
  lines.push('')
  lines.push('| Year | Sources | Ready | Blocked | Duplicate | Media-only | Manifest | Academic | Coverage |')
  lines.push('| --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |')
  for (const m of manifests) {
    const slugYear = m.yearId.slice(-1).toLowerCase()
    const c = countBy(m.sources, (s) => coverageState(s))
    lines.push(`| ${m.yearId} | ${m.count} | ${c.get('ready') || 0} | ${(c.get('blocked') || 0) + (c.get('corrupt') || 0)} | ${c.get('duplicate') || 0} | ${c.get('media-only') || 0} | [manifest](manifest/asu-y${slugYear}-sources.json) | [academic](academic/asu-y${slugYear}-structure.md) | [coverage](coverage/asu-y${slugYear}-coverage.md) |`)
  }
  lines.push('')
  lines.push(`Readable source index: [corpus-source-index.json](evidence/corpus-source-index.json), ${sourceIndex.count} source IDs.`)
  lines.push('')
  lines.push('## Import Order')
  lines.push('')
  lines.push('1. `academic/` module-subject structures first.')
  lines.push('2. Later content batches can reference `module_subject` paths from these structures.')
  lines.push('3. Evidence/resources/questions/articles/practicals are not authored in this shared foundation pass.')
  lines.push('')
  lines.push('## Blockers')
  lines.push('')
  lines.push('- Scanned PDFs and corrupt/unreadable files are intentionally blocked because OCR is out of scope.')
  lines.push('- Media-only files are inventoried but not placed in the source index.')
  lines.push('- Academic structure is folder/schedule-derived only; it does not claim chapter-level medical content.')
  lines.push('')
  fs.writeFileSync(indexPath, `${lines.join('\n')}\n`)
  return { path: indexPath, action: 'created' }
}

function main() {
  ensureDirs()
  if (!fs.existsSync(sourceRoot)) throw new Error(`source root does not exist: ${sourceRoot}`)
  const bySha = new Map()
  const files = walk(sourceRoot)
  const sources = files.map((file) => sourceRecord(file, bySha))
  const manifests = []
  for (const yearName of YEAR_IDS.keys()) {
    const manifest = manifestFor(yearName, sources)
    manifests.push(manifest)
    const yearNo = manifest.yearId.slice(-1).toLowerCase()
    writeJson(path.join(manifestDir, `asu-y${yearNo}-sources.json`), manifest)
    fs.writeFileSync(path.join(academicDir, `asu-y${yearNo}-structure.md`), academicMarkdown(yearName, manifest))
    fs.writeFileSync(path.join(coverageDir, `asu-y${yearNo}-coverage.md`), coverageMarkdown(yearName, manifest))
  }
  const sourceIndex = buildSourceIndex(sources)
  writeJson(path.join(evidenceDir, 'corpus-source-index.json'), sourceIndex)
  const rootIndex = writeIndexIfAbsent(manifests, sourceIndex)
  console.log(JSON.stringify({
    sourceRoot,
    files: sources.length,
    manifests: manifests.map((m) => ({ yearId: m.yearId, count: m.count })),
    sourceIndex: sourceIndex.count,
    rootIndex: {
      path: path.relative(repoRoot, rootIndex.path),
      action: rootIndex.action,
    },
    outputs: [
      path.relative(repoRoot, manifestDir),
      path.relative(repoRoot, academicDir),
      path.relative(repoRoot, coverageDir),
      path.relative(repoRoot, path.join(evidenceDir, 'corpus-source-index.json')),
    ],
  }, null, 2))
}

main()
