import { defaultModuleId, universityYearId, type CurriculumCourse, type UniYear } from './universities.ts'
import {
  emptyExamMarks, moduleKey, newModuleSubject,
  type ExamMarks, type ModuleSubject, type ModuleSubjectStore,
} from './moduleSubjects.ts'
import { EMPTY_CURRICULUM_SELECTION } from './courseCurriculum.ts'

/**
 * Parse an academic-structure outline into years, terms, modules and the
 * subjects inside each module.
 *
 * ```
 * # Year 1
 * ## Term 1
 * - Introduction to Structure & Function [101 ISK]
 *   - Anatomy (written EOM 20, written EOY 30, practical EOY 15)
 *     - Upper Limb
 *       - Brachial Plexus
 *   - Histology
 * ```
 *
 * `#` is a year, `##` a term, and a top-level `-` a module. A `-` **indented
 * beneath a module** is a subject of it, and indenting further nests subjects
 * as deep as the curriculum goes.
 *
 * This used to stop at modules, and the subject tree — which already existed,
 * and which every piece of content needs in order to say where in a curriculum
 * it belongs — could only be built by hand, one dialog at a time. Reproducing a
 * department book's chapters that way for five modules across five years is not
 * work anyone finishes, so it did not get done, and content stayed tagged to
 * whole modules.
 *
 * Two rules that matter more than the grammar:
 *
 *  - **An existing module ID wins.** A source folder called `101` names the
 *    module the catalogue calls `101 ISK`; minting a second module for the
 *    shorthand would split a year's content across two IDs that look alike.
 *    Pass the current catalogue as `knownModuleIds` and a shorthand resolves
 *    onto the real ID instead of taking a new one.
 *  - **Only a module's direct subjects carry marks.** Deeper ones exist so that
 *    content can be filed at the level it belongs to. Marks written on a deeper
 *    subject are an error, not a silent no-op.
 */

export interface AcademicParseResult {
  years: UniYear[]
  subjects: ModuleSubjectStore
  yearsAdded: number
  terms: number
  modules: number
  subjectCount: number
  /** Shorthand that resolved onto a module already in the catalogue. */
  resolvedShorthand: { wrote: string; resolvedTo: string }[]
  errors: string[]
}

/** `(written EOM 20, written EOY 30, practical EOM 10, practical EOY 15)` */
const MARKS_RX = /\(([^)]*)\)\s*$/
const MARK_PART_RX = /(written|practical)\s*(eom|eoy|end of module|end of year)\s*(\d+)/gi

function parseMarks(text: string): { marks: ExamMarks; found: boolean } {
  const marks = emptyExamMarks()
  let found = false
  for (const [, kind, when, value] of text.matchAll(MARK_PART_RX)) {
    const endOfYear = /eoy|end of year/i.test(when)
    const key = /written/i.test(kind)
      ? (endOfYear ? 'writtenEndOfYear' : 'writtenEndOfModule')
      : (endOfYear ? 'practicalEndOfYear' : 'practicalEndOfModule')
    marks[key] = Number(value)
    found = true
  }
  return { marks, found }
}

/** How many levels of indent a line carries. Two spaces or one tab per level. */
function indentOf(raw: string): number {
  const lead = raw.match(/^[ \t]*/)?.[0] ?? ''
  const spaces = lead.replace(/\t/g, '  ').length
  return Math.floor(spaces / 2)
}

export function parseAcademicOutline(
  markdown: string,
  options: { universityShort?: string; knownModuleIds?: readonly string[] } = {},
): AcademicParseResult {
  const { universityShort = 'IMPORT', knownModuleIds = [] } = options
  const known = new Map(knownModuleIds.map((id) => [id.toUpperCase(), id]))
  // A shorthand such as `101` matches the catalogue's `101 ISK` when the
  // catalogue holds exactly one module starting with it — never when two do,
  // because then the outline has to say which.
  const byPrefix = new Map<string, string[]>()
  for (const id of knownModuleIds) {
    const head = id.split(/\s+/)[0].toUpperCase()
    byPrefix.set(head, [...(byPrefix.get(head) ?? []), id])
  }

  const errors: string[] = []
  const years: UniYear[] = []
  const subjects: ModuleSubjectStore = {}
  const resolvedShorthand: AcademicParseResult['resolvedShorthand'] = []
  const takenIds = new Set<string>(known.keys())

  let curYear: UniYear | null = null
  let curTerm: string | null = null
  let curCourse: CurriculumCourse | null = null
  // `CurriculumCourse.moduleId` is optional on the type, but every course this
  // parser builds is given one. Held separately so the subject IDs below do not
  // have to re-assert that on every line.
  let curModuleId = ''
  // Subject being built at each indent depth, so a deeper line can find its parent.
  let stack: { depth: number; subject: ModuleSubject }[] = []
  let terms = 0
  let modules = 0
  let subjectCount = 0
  let seq = 0

  const uniqueModuleId = (base: string): string => {
    let candidate = base
    let n = 2
    while (takenIds.has(candidate.toUpperCase())) { candidate = `${base}-${n}`; n++ }
    takenIds.add(candidate.toUpperCase())
    return candidate
  }

  const resolveModuleId = (written: string, line: number): string => {
    const exact = known.get(written.toUpperCase())
    if (exact) return exact
    const matches = byPrefix.get(written.toUpperCase())
    if (matches?.length === 1) {
      resolvedShorthand.push({ wrote: written, resolvedTo: matches[0] })
      return matches[0]
    }
    if (matches && matches.length > 1) {
      errors.push(`Line ${line}: "${written}" could be ${matches.join(' or ')}. Write the full module ID.`)
      return uniqueModuleId(written)
    }
    return uniqueModuleId(written)
  }

  // An outline usually opens with a comment saying where it came from, and
  // those run to many lines. Skipping only the line that starts `<!--` reported
  // every other line of the note as unrecognised, which buried the real errors
  // under twenty false ones.
  let inComment = false

  markdown.split('\n').forEach((raw, idx) => {
    const line = raw.trim()
    const lineNo = idx + 1

    if (inComment) {
      if (line.includes('-->')) inComment = false
      return
    }
    if (line.startsWith('<!--')) {
      if (!line.includes('-->')) inComment = true
      return
    }
    if (!line) return

    if (line.startsWith('## ')) {
      if (!curYear) { errors.push(`Line ${lineNo}: term "${line.slice(3)}" has no year above it.`); return }
      curTerm = line.slice(3).trim()
      if (!curYear.terms?.includes(curTerm)) curYear.terms = [...(curYear.terms ?? []), curTerm]
      terms++
      curCourse = null
      stack = []
      return
    }

    if (line.startsWith('# ')) {
      const label = line.slice(2).trim()
      curYear = { id: universityYearId(universityShort, label), year: label, students: 0, courses: [], terms: [] }
      years.push(curYear)
      curTerm = null
      curCourse = null
      stack = []
      return
    }

    if (!line.startsWith('- ') && !line.startsWith('* ')) {
      errors.push(`Line ${lineNo}: unrecognised "${line}". Use # Year, ## Term, - Module [ID], or an indented - Subject.`)
      return
    }

    const depth = indentOf(raw)
    let body = line.slice(2).trim()

    if (depth === 0) {
      if (!curYear) { errors.push(`Line ${lineNo}: module "${body}" has no year.`); return }
      const term = curTerm ?? 'Term 1'
      if (!curYear.terms?.includes(term)) curYear.terms = [...(curYear.terms ?? []), term]
      const m = body.match(/^(.*?)\s*\[([^\]]+)\]\s*$/)
      const name = (m ? m[1] : body).trim()
      if (!name) { errors.push(`Line ${lineNo}: empty module name.`); return }
      seq++
      const moduleId = m
        ? resolveModuleId(m[2].trim(), lineNo)
        : uniqueModuleId(defaultModuleId(name, seq))
      curModuleId = moduleId
      curCourse = { id: `imp-${seq}-${moduleId.replace(/\W+/g, '-').toLowerCase()}`, name, block: term, moduleId, term }
      curYear.courses.push(curCourse)
      modules++
      stack = []
      return
    }

    // Indented: a subject of the module above it.
    if (!curCourse || !curYear) {
      errors.push(`Line ${lineNo}: subject "${body}" has no module above it.`)
      return
    }

    const marksMatch = body.match(MARKS_RX)
    let marks = emptyExamMarks()
    if (marksMatch) {
      const parsed = parseMarks(marksMatch[1])
      if (parsed.found) {
        if (depth > 1) {
          errors.push(`Line ${lineNo}: only a module's direct subjects carry marks, and "${body}" is nested deeper.`)
        }
        marks = parsed.marks
        body = body.slice(0, marksMatch.index).trim()
      }
    }
    if (!body) { errors.push(`Line ${lineNo}: empty subject name.`); return }

    const subject: ModuleSubject = {
      ...newModuleSubject(body),
      id: `msub-${curModuleId.replace(/\W+/g, '-').toLowerCase()}-${++subjectCount}`,
      marks,
      curriculum: structuredClone(EMPTY_CURRICULUM_SELECTION),
    }

    while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop()
    const key = moduleKey(universityShort.toLowerCase(), curYear.id, curCourse.id)

    if (!stack.length) {
      if (depth > 1) {
        errors.push(`Line ${lineNo}: "${body}" is indented past its parent — a subject may only go one level deeper than the line above it.`)
        return
      }
      subjects[key] = [...(subjects[key] ?? []), subject]
    } else {
      const parent = stack[stack.length - 1].subject
      if (depth > stack[stack.length - 1].depth + 1) {
        errors.push(`Line ${lineNo}: "${body}" is indented past its parent — a subject may only go one level deeper than the line above it.`)
        return
      }
      parent.children = [...(parent.children ?? []), subject]
    }
    stack.push({ depth, subject })
  })

  return {
    years, subjects, yearsAdded: years.length, terms, modules, subjectCount,
    resolvedShorthand, errors,
  }
}
