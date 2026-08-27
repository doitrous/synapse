/**
 * Per-university tag audit — lane T1.
 *
 *   node scripts/alexandria/check-tags.mjs [--json]
 *
 * Walks every record in
 * docs/Alexandria-Source-Imports/{concept,article,question,written,pending-live,practical}/*.md
 * and reports, per module and per kind, how many of Omar's six per-university tags each
 * record carries:
 *   1. `+au` in universities
 *   2. the AU year (learner_years for concepts, years for article/question/practical/resource)
 *   3. `+AU-MED-xxx` in modules/module/module_ids
 *   4. an Alexandria module_subject path
 *   5. an exam_weight_by_year AU_Yn key
 *   6. a university_notes / field_notes(universityNotes) line naming the AU source
 *
 * `parseMarkdown`/`normalize` are copied verbatim from scripts/validate-content-batch.mjs
 * (same file the batch/simulate gates use) so a record here is read exactly as the
 * importer would read it. `detectBatchKind` is imported, not reimplemented, for the
 * same reason.
 *
 * SCHEMA TRUTH (read from src/data/conceptImport.ts + src/data/bulkImport.ts,
 * confirmed live by the chief-of-staff/orchestrator over medical:simulate probes):
 *
 *   kind      | universities col | year col              | module col   | module_subject | exam_weight_by_year | university_notes
 *   concept   | universities      | learner_years (number)| modules       | present, REPLACE (no + semantics; a literal leading `+` is stored) | present, merges key-by-key (no + needed) | NO column -> field_notes["universityNotes"] = "au: ..."
 *   article   | universities      | years (AU_Yn id)      | module        | present, but bulkImport.ts calls parseModuleSubjectPaths(values.module_subject) UNCONDITIONALLY -- an update row that never mentions the column still collapses it to [] (proved: ART-CVS-HEART-ORIENTATION moduleSubjectPaths undefined -> [] after an update that only touched universities) | NOT a field on ArticleAuthoringData at all | university_notes column, array of {universityId,text}, FULL ARRAY REPLACE (proved: a probe update dropped the existing "kau" note)
 *   question  | universities      | years (AU_Yn id)      | module        | same unconditional-collapse bug (bulkImport.ts:1158) | present (tags.examWeightByYear) | NO column (validator's H3 is pending) -> ledger file
 *   practical | universities      | years (AU_Yn id)      | module        | same unconditional-collapse bug | NOT a field on PracticalCommon at all | NO column -> ledger file
 *   resource  | universities      | years (AU_Yn id)      | module_ids (note: different key name) | same unconditional-collapse bug | NOT a field | NO column -> ledger file
 *   glossary  | (none — MedicalTerm has no per-university field of any kind; out of the audited glob anyway)
 *
 * BLOCKING QUESTION, answered: `module_subject` REPLACES, it does not merge/append,
 * on every kind that has it (concept: guarded so an *omitted* column is inert, but a
 * *present* one still replaces wholesale; article/question/practical/resource: even an
 * *omitted* column replaces, because the parse call is unconditional). Rule that follows
 * (chief of staff, standing): never write module_subject on a row whose `## id` is an
 * OVERLAY (an id that already exists live or in another lane's batch) -- there is no way
 * to add an Alexandria path to such a row without first re-typing every path the target
 * already carries, and this script does not have that target's content in scope. Only
 * NEW Alexandria-authored records (a fresh id, minted by this lane) may carry module_subject.
 * `exam_weight_by_year` merges by key and needs no `+`; a key on the wrong id (anything
 * other than exactly `AU_Y1`/`AU_Y2`/`AU_Y3`, read from src/data/universities.ts's
 * buildYears('AU')) hides the record from that year's blueprint silently (blueprint.ts).
 */
import { readFile, readdir } from 'node:fs/promises'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { detectBatchKind } from '../../src/data/batchKind.ts'
import { splitList } from '../../src/data/importSemantics.ts'
import { universities as UNIVERSITY_CATALOGUE } from '../../src/data/universities.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')

/* ---- copied from scripts/validate-content-batch.mjs (same parser every gate uses) ---- */
const normalize = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

function parseMarkdown(text) {
  return text.split(/^\s*---\s*$/m).map((part) => part.trim()).filter(Boolean).map((document) => {
    const result = {}
    const matcher = /^##[ \t]*(.+?)[ \t]*\r?\n([\s\S]*?)(?=\r?\n##[ \t]|(?![\s\S]))/gm
    let match
    while ((match = matcher.exec(document))) result[normalize(match[1])] = match[2].trim()
    return result
  })
}

/* ---- AU module -> AU year, read from the live catalogue, not re-typed ---- */
const AU = UNIVERSITY_CATALOGUE.find((u) => u.id === 'au')
const MODULE_YEAR = new Map()
for (const year of AU?.years ?? []) {
  for (const course of year.courses ?? []) MODULE_YEAR.set(course.moduleId, year.id)
}
// AU_Y1 -> 1, AU_Y2 -> 2 ... for the concept side (learner_years is numeric).
const yearNumber = (yearId) => Number((yearId ?? '').match(/_Y(\d+)$/)?.[1])

/* ---- known-id sets: live state + every Kasr batch (HIT-LIVE / HIT-PENDING) ---- */
async function walk(dir) {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }
  const out = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (entry.isFile() && extname(entry.name) === '.md') out.push(full)
  }
  return out
}

async function knownIds() {
  const ids = new Set()
  const bundlePath = join(ROOT, 'server/data/medical-library-v1.json')
  try {
    const bundle = JSON.parse(await readFile(bundlePath, 'utf8'))
    const states = bundle.states ?? {}
    for (const concept of states['synapse-concept-graph-v2']?.concepts ?? []) ids.add(concept.id)
    for (const item of states['synapse-admin-content-ledger-v4'] ?? []) ids.add(item.id)
    for (const resource of states['synapse-medical-evidence-v1']?.resources ?? []) ids.add(resource.id)
  } catch (error) {
    console.error(`WARNING: could not read live bundle: ${error.message}`)
  }
  const kasrFiles = await walk(join(ROOT, 'docs/Kasr-Source-Imports'))
  for (const file of kasrFiles) {
    const text = await readFile(file, 'utf8')
    for (const row of parseMarkdown(text)) if (row.id) ids.add(row.id)
  }
  return ids
}

/* ---- per-kind field-name + tag-applicability table (the schema truth above) ---- */
const KIND_FIELDS = {
  concept: { universities: 'universities', year: 'learner_years', modules: 'modules', moduleSubject: 'module_subject', examWeight: 'exam_weight_by_year', universityNotes: null },
  article: { universities: 'universities', year: 'years', modules: 'module', moduleSubject: 'module_subject', examWeight: null, universityNotes: 'university_notes' },
  question: { universities: 'universities', year: 'years', modules: 'module', moduleSubject: 'module_subject', examWeight: 'exam_weight_by_year', universityNotes: null },
  practical: { universities: 'universities', year: 'years', modules: 'module', moduleSubject: 'module_subject', examWeight: null, universityNotes: null },
  resource: { universities: 'universities', year: 'years', modules: 'module_ids', moduleSubject: 'module_subject', examWeight: null, universityNotes: null },
}

const cellItems = (value) => (value === undefined ? [] : splitList(value))

function moduleOf(row, fieldName) {
  const items = cellItems(row[fieldName])
  return items.find((item) => /^AU-/.test(item)) ?? items[0]
}

/**
 * Every one of the six checks for one row, given its kind and whether its own
 * `## id` is a NEW Alexandria record or an OVERLAY onto a live/Kasr id.
 */
function tagStatus(row, kind, isOverlay) {
  const fields = KIND_FIELDS[kind]
  const status = {}

  // 1. +au in universities
  const unis = cellItems(row[fields.universities])
  status.au = unis.includes('au') ? 'present' : 'missing'

  // 2. the AU year
  if (kind === 'concept') {
    const years = cellItems(row[fields.year]).map(Number)
    const module = moduleOf(row, 'modules')
    const expected = MODULE_YEAR.has(module) ? yearNumber(MODULE_YEAR.get(module)) : undefined
    status.year = years.length ? (expected && !years.includes(expected) ? 'wrong' : 'present') : 'missing'
  } else {
    const years = cellItems(row[fields.year])
    const module = moduleOf(row, fields.modules)
    const expectedId = MODULE_YEAR.get(module)
    status.year = years.length ? (expectedId && !years.includes(expectedId) ? 'wrong' : 'present') : 'missing'
  }

  // 3. +AU-MED-xxx in modules
  const modules = cellItems(row[fields.modules])
  status.module = modules.some((module) => /^AU-/.test(module)) ? 'present' : 'missing'

  // 4. module_subject — REPLACE semantics: forbidden on an overlay row (no way to
  // restate what it would otherwise wipe), expected on a new one.
  const hasModuleSubject = row[fields.moduleSubject]?.trim()
  status.moduleSubject = isOverlay
    ? (hasModuleSubject ? 'present-but-forbidden-on-overlay' : 'n/a-overlay-rule')
    : (hasModuleSubject ? 'present' : 'missing')

  // 5. exam_weight_by_year
  if (!fields.examWeight) {
    status.examWeight = 'n/a-no-column'
  } else {
    const raw = row[fields.examWeight] ?? ''
    const entries = raw.split(/[\n|;]/).map((pair) => pair.split('=')[0]?.trim()).filter(Boolean)
    const auKeys = entries.filter((key) => /^AU_(Y[1-5]|INT[12])$/.test(key))
    const module = moduleOf(row, fields.modules)
    const expectedId = MODULE_YEAR.get(module)
    if (!entries.length) status.examWeight = 'missing'
    else if (expectedId && !auKeys.includes(expectedId)) status.examWeight = entries.some((k) => k.startsWith('AU')) ? 'wrong-key' : 'missing'
    else status.examWeight = 'present'
  }

  // 6. university_notes
  if (fields.universityNotes) {
    const raw = row[fields.universityNotes] ?? ''
    const hasAu = splitList(raw.replace(/\n(?=[A-Za-z]+:)/g, '|')).some((line) => /^au\s*:/i.test(line.trim()))
    status.universityNotes = hasAu ? 'present' : 'missing'
  } else if (kind === 'concept') {
    const notes = row.field_notes ?? ''
    const hasAu = /universityNotes\s*:\s*au\s*:/i.test(notes)
    status.universityNotes = hasAu ? 'present' : 'missing'
  } else {
    status.universityNotes = 'n/a-no-column-see-ledger'
  }

  return status
}

/* ---- walk the audited glob ---- */
const GLOB_DIRS = ['concept', 'article', 'question', 'written', 'pending-live', 'practical']

async function main() {
  const ids = await knownIds()
  const records = []

  for (const dirName of GLOB_DIRS) {
    const dir = join(ROOT, 'docs/Alexandria-Source-Imports', dirName)
    let files
    try {
      files = (await readdir(dir)).filter((f) => f.endsWith('.md')).sort()
    } catch {
      continue
    }
    for (const file of files) {
      const path = join(dir, file)
      const text = await readFile(path, 'utf8')
      const rows = parseMarkdown(text)
      for (const row of rows) {
        const kind = detectBatchKind(row)
        if (kind === 'unknown' || kind === 'relation' || kind === 'claim' || kind === 'citation' || kind === 'span') continue
        const id = row.id
        const isOverlay = Boolean(id && ids.has(id))
        const module = moduleOf(row, KIND_FIELDS[kind]?.modules ?? 'module') ?? '(unknown module)'
        const status = tagStatus(row, kind, isOverlay)
        records.push({ file: `${dirName}/${file}`, id: id || '(no id)', kind, module, isOverlay, status })
      }
    }
  }

  /* ---- aggregate per module, per kind ---- */
  const buckets = new Map()
  for (const record of records) {
    const key = `${record.module} · ${record.kind}`
    if (!buckets.has(key)) buckets.set(key, { module: record.module, kind: record.kind, total: 0, new: 0, overlay: 0, tags: {}, missing: {} })
    const bucket = buckets.get(key)
    bucket.total += 1
    bucket[record.isOverlay ? 'overlay' : 'new'] += 1
    for (const [tag, value] of Object.entries(record.status)) {
      bucket.tags[tag] = bucket.tags[tag] ?? { present: 0, missing: 0, na: 0, wrong: 0 }
      bucket.missing[tag] = bucket.missing[tag] ?? []
      if (value === 'present') bucket.tags[tag].present += 1
      else if (value.startsWith('n/a')) bucket.tags[tag].na += 1
      else if (value === 'wrong' || value === 'wrong-key' || value === 'present-but-forbidden-on-overlay') {
        bucket.tags[tag].wrong += 1
        bucket.missing[tag].push(`${record.id} (${value})`)
      } else {
        bucket.tags[tag].missing += 1
        bucket.missing[tag].push(record.id)
      }
    }
  }

  const rows = [...buckets.values()].sort((a, b) => a.module.localeCompare(b.module) || a.kind.localeCompare(b.kind))
  const TAGS = ['au', 'year', 'module', 'moduleSubject', 'examWeight', 'universityNotes']
  const TAG_LABEL = { au: '+au', year: 'AU year', module: '+AU-MED', moduleSubject: 'module_subject', examWeight: 'exam_weight_by_year', universityNotes: 'university_notes' }

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify({ generatedAt: new Date().toISOString(), buckets: rows, records }, null, 2))
    return
  }

  console.log(`# Alexandria per-university tag audit\n`)
  console.log(`| Module | Kind | Total | New | Overlay | ${TAGS.map((t) => TAG_LABEL[t]).join(' | ')} |`)
  console.log(`|---|---|---|---|---|${TAGS.map(() => '---').join('|')}|`)
  for (const bucket of rows) {
    const cells = TAGS.map((tag) => {
      const t = bucket.tags[tag] ?? { present: 0, missing: 0, na: 0, wrong: 0 }
      const parts = []
      parts.push(`${t.present}/${bucket.total}`)
      if (t.na) parts.push(`${t.na} n/a`)
      if (t.wrong) parts.push(`${t.wrong} wrong`)
      return parts.join(', ')
    })
    console.log(`| ${bucket.module} | ${bucket.kind} | ${bucket.total} | ${bucket.new} | ${bucket.overlay} | ${cells.join(' | ')} |`)
  }

  console.log(`\n## Ids missing each tag\n`)
  for (const bucket of rows) {
    for (const tag of TAGS) {
      const missing = bucket.missing[tag] ?? []
      if (missing.length) console.log(`- ${bucket.module} · ${bucket.kind} · ${TAG_LABEL[tag]}: ${missing.join(', ')}`)
    }
  }
}

main()
