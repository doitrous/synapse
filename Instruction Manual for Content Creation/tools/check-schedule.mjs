/**
 * Does this schedule fragment hold together, and where does it land?
 *
 *   node "Instruction Manual for Content Creation/tools/check-schedule.mjs" docs/import-ready/schedule/KAU-Y2-SCHEDULE-001.json
 *   node "…/check-schedule.mjs" <fragment.json> --catalogue /tmp/live.json
 *   node "…/check-schedule.mjs" <fragment.json> --catalogue /tmp/live.json --out /tmp/schedule-bundle.json
 *
 * Module schedules have no import page and no branch in `medical:batch` — the
 * only supported way in is a human retyping every block into the Module
 * schedule dialog, or a patch written straight into the
 * `nishany-module-schedules-v1` state document. This is the gate for the second
 * route, and it is the whole gate: nothing else reads this file kind.
 *
 * Three things it does, in order:
 *
 * 1. **The contract.** Every block carries all 17 keys the app reads, with the
 *    right type in each. The dialog materialises defaults when a human clicks
 *    "Add block"; a hand-written block gets nothing, and a missing `topicIds`
 *    is not a blank field but a crash the next time somebody opens that block.
 *
 * 2. **Resolution.** A fragment addresses a module the way the faculty prints
 *    it — `KAU`, `Year 2`, `205 NEU`. The document is keyed
 *    `<universityId>:<yearId>:<courseId>`, and `courseId` is minted at import
 *    as `imp-<timestamp>-<row>`, so no author can know it in advance. This
 *    resolves the printed identity against live state and refuses to guess.
 *
 * 3. **The bundle.** `--out` merges the resolved keys into the live document
 *    and writes it in the shape `server/scripts/import-state-bundle.mjs` reads.
 *    The merge matters: that script replaces a state document wholesale, so a
 *    bundle built from the fragment alone would delete every schedule it does
 *    not mention.
 *
 * A fragment is deliberately *not* shaped like a bundle — it has no top-level
 * `states` key. Hand one to `import-state-bundle.mjs` by mistake and it writes
 * nothing at all, which is the only safe way for that mistake to end.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const args = process.argv.slice(2)
const file = args.find((a) => !a.startsWith('--'))
const flag = (name) => {
  const i = args.indexOf(name)
  return i === -1 ? undefined : args[i + 1]
}
const out = flag('--out')
const catalogueArg = flag('--catalogue')
const DEFAULT_CATALOGUE = 'server/data/medical-library-v1.json'

if (!file) {
  console.error('Usage: check-schedule.mjs <fragment.json> [--catalogue <bundle.json>] [--out <bundle.json>]')
  process.exit(2)
}

const DOCUMENT = 'nishany-module-schedules-v1'

/** The eight block types, from src/data/moduleSchedule.ts. */
const TYPES = ['lecture', 'practical', 'review', 'midterm', 'midyear', 'term', 'final', 'logbook']

/** Every key `ModuleScheduleBlock` declares, and how each one is checked. */
const SHAPE = {
  id: 'string',
  type: 'type',
  title: 'string',
  date: 'date',
  startTime: 'time',
  endTime: 'time',
  location: 'string',
  moduleNumber: 'string',
  topicIds: 'ids',
  notes: 'string',
  automaticQuestions: 'boolean',
  automaticPracticals: 'boolean',
  automaticQuestionIds: 'derived',
  automaticPracticalIds: 'derived',
  manualQuestionIds: 'ids',
  manualPracticalIds: 'ids',
  completed: 'boolean',
}

const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const errors = []
const warnings = []

/** A real calendar date in `YYYY-MM-DD`, not merely four digits and two dashes. */
function calendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [y, m, d] = value.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null
  return date
}

const minutes = (time) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5))

function checkBlock(block, where) {
  const say = (message) => errors.push(`${where}: ${message}`)
  if (typeof block !== 'object' || block === null || Array.isArray(block)) {
    say('is not a block object')
    return
  }
  for (const key of Object.keys(block)) {
    if (!(key in SHAPE)) say(`unknown key "${key}" — the app never reads it, so it is content you will lose`)
  }
  for (const [key, rule] of Object.entries(SHAPE)) {
    if (!(key in block)) {
      say(`missing "${key}" — every block carries all ${Object.keys(SHAPE).length} keys, empty or not`)
      continue
    }
    const value = block[key]
    if (rule === 'string' || rule === 'date' || rule === 'time' || rule === 'type') {
      if (typeof value !== 'string') say(`"${key}" must be a string`)
    } else if (rule === 'boolean') {
      if (typeof value !== 'boolean') say(`"${key}" must be true or false`)
    } else if (rule === 'ids' || rule === 'derived') {
      if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string')) say(`"${key}" must be an array of strings`)
      else if (rule === 'derived' && value.length > 0) say(`"${key}" must be empty — it is recomputed from the tagged topics when a human saves the block, and anything written here is a match you did not compute`)
    }
  }
  if (typeof block.type === 'string' && !TYPES.includes(block.type)) say(`type "${block.type}" is not one of ${TYPES.join(', ')}`)
  if (typeof block.title === 'string' && !block.title.trim()) say('title is empty — the dialog refuses to save a block without one')
  if (typeof block.date === 'string' && !calendarDate(block.date)) say(`date "${block.date}" is not a real date in YYYY-MM-DD`)

  const timed = block.type !== 'logbook'
  for (const key of ['startTime', 'endTime']) {
    const value = block[key]
    if (typeof value !== 'string') continue
    if (!timed) {
      if (value !== '') say(`"${key}" must be "" on a logbook task — it is a deadline, not a sitting`)
    } else if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) {
      say(`"${key}" is "${value}" — write a 24-hour HH:MM, zero-padded`)
    }
  }
  if (timed && /^([01]\d|2[0-3]):[0-5]\d$/.test(block.startTime ?? '') && /^([01]\d|2[0-3]):[0-5]\d$/.test(block.endTime ?? '')) {
    if (minutes(block.endTime) <= minutes(block.startTime)) say(`ends at ${block.endTime}, which is not after ${block.startTime}`)
  }
  if (typeof block.id === 'string' && !/^sch-[a-z0-9-]+-\d{8}-\d{2}$/.test(block.id)) {
    warnings.push(`${where}: id "${block.id}" is not sch-<module>-<YYYYMMDD>-<NN>; a re-run that mints a different id imports a second copy of this block`)
  }
}

// ---------------------------------------------------------------- the fragment

let fragment
try {
  fragment = JSON.parse(readFileSync(file, 'utf8'))
} catch (error) {
  console.error(`${file}: not readable as JSON — ${error.message}`)
  process.exit(2)
}

if (fragment.states) errors.push('this file has a top-level "states" key, which makes it look like a state bundle — a fragment must not, so that import-state-bundle.mjs cannot apply it directly')
if (fragment.document !== DOCUMENT) errors.push(`"document" must be "${DOCUMENT}"`)
for (const key of ['university', 'year', 'source']) {
  if (typeof fragment[key] !== 'string' || !fragment[key].trim()) errors.push(`"${key}" must say what it is — "source" names the file this timetable was read from, and is what makes the batch checkable`)
}
if (!Array.isArray(fragment.modules) || fragment.modules.length === 0) {
  errors.push('"modules" must be a non-empty array')
  report()
}

const seenIds = new Map()
for (const [index, entry] of fragment.modules.entries()) {
  const label = entry?.module_id ? `module ${entry.module_id}` : `modules[${index}]`
  if (typeof entry?.module_id !== 'string' || !entry.module_id.trim()) {
    errors.push(`${label}: "module_id" must be the module ID the faculty prints — "205 NEU", not a course id`)
    continue
  }
  if (!Array.isArray(entry.blocks) || entry.blocks.length === 0) {
    errors.push(`${label}: "blocks" must be a non-empty array — a module with no sessions is not a schedule`)
    continue
  }
  entry.blocks.forEach((block, blockIndex) => {
    checkBlock(block, `${label} · block ${blockIndex + 1}`)
    const id = block?.id
    if (typeof id !== 'string') return
    if (seenIds.has(id)) errors.push(`${label} · block ${blockIndex + 1}: id "${id}" is already used by ${seenIds.get(id)} — the dialog matches blocks by id, so a duplicate overwrites`)
    else seenIds.set(id, label)
  })

  // Two sittings of the same module at the same hour is usually a group split
  // that was transcribed twice, but a faculty does run parallel groups, so this
  // is worth saying and not worth refusing.
  const timed = entry.blocks.filter((block) => block?.type !== 'logbook' && typeof block?.date === 'string')
  for (let a = 0; a < timed.length; a++) {
    for (let b = a + 1; b < timed.length; b++) {
      if (timed[a].date !== timed[b].date) continue
      if (minutes(timed[a].startTime ?? '00:00') < minutes(timed[b].endTime ?? '00:00') && minutes(timed[b].startTime ?? '00:00') < minutes(timed[a].endTime ?? '00:00')) {
        warnings.push(`${label}: "${timed[a].title}" and "${timed[b].title}" overlap on ${timed[a].date}`)
      }
    }
  }
}

// --------------------------------------------------------------- the catalogue

const cataloguePath = catalogueArg ?? (existsSync(DEFAULT_CATALOGUE) ? DEFAULT_CATALOGUE : undefined)
const resolved = []
let live = {}

if (!cataloguePath) {
  warnings.push('no catalogue given and no local snapshot found — the contract was checked, but nothing resolved a module ID against live state')
  if (out) errors.push('--out needs a catalogue: the bundle is the live document with your keys merged in, and without it the write would delete every schedule you did not mention')
} else {
  let states
  try {
    states = JSON.parse(readFileSync(cataloguePath, 'utf8')).states ?? {}
  } catch (error) {
    console.error(`${cataloguePath}: not readable as a state bundle — ${error.message}`)
    process.exit(2)
  }
  const universities = states['nishany-academic-universities-v1'] ?? []
  const ledger = states['nishany-admin-content-ledger-v4'] ?? []
  live = states[DOCUMENT] ?? {}
  const articles = new Map(ledger.map((item) => [item.id, item]))

  const wanted = String(fragment.university ?? '').trim().toLowerCase()
  const university = universities.find((item) => item.id?.toLowerCase() === wanted || item.short?.toLowerCase() === wanted)
  const wantedYear = String(fragment.year ?? '').trim().toLowerCase()
  const year = university?.years?.find((item) => item.id?.toLowerCase() === wantedYear || item.year?.toLowerCase() === wantedYear)

  if (!university) errors.push(`university "${fragment.university}" is not in the catalogue — it holds ${universities.map((item) => item.short).join(', ') || 'nothing'}`)
  else if (!year) errors.push(`"${fragment.year}" is not a year of ${university.short} — it has ${university.years.map((item) => item.year).join(', ') || 'no years'}`)

  for (const entry of fragment.modules) {
    if (!year || typeof entry?.module_id !== 'string') continue
    const wantedModule = entry.module_id.trim().toLowerCase()
    const byId = year.courses.filter((course) => course.moduleId?.trim().toLowerCase() === wantedModule)
    const byName = year.courses.filter((course) => course.name?.trim().toLowerCase() === wantedModule)
    const matches = byId.length ? byId : byName
    if (matches.length === 0) {
      errors.push(`module "${entry.module_id}" does not exist in ${university.short} ${year.year} — import it at Academic setup › Import first, or say in your report that it is missing. Never invent a course id`)
      continue
    }
    if (matches.length > 1) {
      errors.push(`module "${entry.module_id}" matches ${matches.length} modules in ${university.short} ${year.year} — disambiguate by module ID`)
      continue
    }
    const course = matches[0]
    const key = `${university.id}:${year.id}:${course.id}`
    const existing = live[key] ?? []
    if (existing.length) {
      warnings.push(`${key} (${course.moduleId ?? course.name}) already holds ${existing.length} block(s) live — merging adds to them`)
      for (const block of entry.blocks) {
        if (existing.some((current) => current.id === block?.id)) errors.push(`module ${entry.module_id}: block id "${block.id}" already exists live and would be replaced`)
      }
    }
    for (const block of entry.blocks) {
      for (const id of block?.topicIds ?? []) {
        const item = articles.get(id)
        if (!item) errors.push(`module ${entry.module_id} · "${block.title}": topic id "${id}" is in no content ledger record`)
        else if (item.kind !== 'article') errors.push(`module ${entry.module_id} · "${block.title}": topic id "${id}" is a ${item.kind}, and only articles may be tagged`)
      }
    }
    resolved.push({ key, course, entry })
  }
}

// ------------------------------------------------------------------ the report

function report() {
  const blocks = (fragment.modules ?? []).reduce((sum, entry) => sum + (Array.isArray(entry.blocks) ? entry.blocks.length : 0), 0)
  console.log(`${file}`)
  console.log(`  ${fragment.university ?? '—'} · ${fragment.year ?? '—'} · ${(fragment.modules ?? []).length} module(s) · ${blocks} block(s)`)
  for (const entry of fragment.modules ?? []) {
    const match = resolved.find((item) => item.entry === entry)
    console.log(`\n  ${entry.module_id ?? '—'}${match ? `  → ${match.key}` : '  → unresolved'}`)
    for (const block of entry.blocks ?? []) {
      const date = typeof block?.date === 'string' ? calendarDate(block.date) : null
      const day = date ? WEEKDAY[date.getDay()] : '???'
      const when = block?.type === 'logbook' ? 'due       ' : `${block?.startTime ?? '??:??'}–${block?.endTime ?? '??:??'}`
      console.log(`    ${block?.date ?? '??????????'} ${day}  ${when}  ${String(block?.type ?? '?').padEnd(9)} ${block?.title ?? ''}`)
    }
  }
  if (warnings.length) {
    console.log(`\n  ${warnings.length} warning(s)`)
    warnings.forEach((warning) => console.log(`    ! ${warning}`))
  }
  if (errors.length) {
    console.log(`\n  ${errors.length} error(s)`)
    errors.forEach((error) => console.log(`    ✗ ${error}`))
    console.log('\nNot ready. Fix every error and run this again.')
    process.exit(1)
  }
  console.log('\n  0 errors. Check every weekday above against the source before you hand this over.')
}

report()

if (out) {
  const merged = { ...live }
  for (const { key, entry } of resolved) merged[key] = [...(merged[key] ?? []), ...entry.blocks]
  writeFileSync(out, JSON.stringify({ exportedAt: new Date().toISOString(), states: { [DOCUMENT]: merged } }, null, 1))
  const before = Object.values(live).reduce((sum, list) => sum + list.length, 0)
  const after = Object.values(merged).reduce((sum, list) => sum + list.length, 0)
  console.log(`\n  wrote ${out} — ${DOCUMENT}, ${Object.keys(merged).length} module key(s), ${before} → ${after} blocks`)
}
