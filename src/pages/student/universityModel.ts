import type { AssessmentScheme } from '../../data/assessmentScheme.ts'
import { marksToNumber } from '../../data/assessmentScheme.ts'
import {
  EXAM_BLOCK_TYPES, MODULE_BLOCK_LABEL, scheduleLinks,
  type ModuleScheduleBlock,
  type ModuleScheduleBlockType,
  type ModuleScheduleStore,
} from '../../data/moduleSchedule.ts'
import {
  DEFAULT_TERM, EXAM_BUCKETS, bucketTotals, moduleKey, subjectsOf, walkSubjects,
  type ExamMarks,
  type ModuleSubject,
  type ModuleSubjectStore,
} from '../../data/moduleSubjects.ts'
import type { CurriculumCourse, UniYear, University } from '../../data/universities.ts'

export interface StudentUniversityProjection {
  profile: {
    studentId: string | null
    universityId: string | null
    year: string | null
    yearId: string | null
    group: string | null
  } | null
  university: { id: string; name: string; short: string; region: string } | null
  year: { id: string; year: string; active?: boolean; terms?: string[] } | null
  terms?: ProjectionTerm[]
  modules?: Array<{ id: string; name: string; moduleId: string | null; term: string }>
  status: 'ready' | 'being_verified' | 'missing_profile'
}

export interface ProjectionTerm {
  term: string
  modules: ProjectionModule[]
}

export interface ProjectionModule {
  id: string
  name: string
  moduleId: string | null
  term: string
  evidenceState?: string | null
  labels?: string[]
  assessment?: ProjectionAssessment
  subjects?: ProjectionSubject[]
  schedule?: ProjectionScheduleRow[]
  coverage?: ProjectionCoverage
}

export interface ProjectionAssessment {
  status?: string | null
  declaredTotal?: number | null
  componentTotal?: number | null
  total?: number | null
  displayTotal?: number | 'unavailable'
  credits?: number | null
  passRule?: string | null
  components?: ProjectionAssessmentComponent[]
}

export interface ProjectionAssessmentComponent {
  id?: string | null
  label?: string | null
  kind?: string | null
  marks?: number | null
  subjectAllocations?: Array<{ subjectId?: string | null; label?: string | null; marks?: number | null }>
  passRule?: string | null
}

export interface ProjectionSubject {
  id: string | null
  name: string
  type?: string | null
  evidenceState?: string | null
  labels?: string[]
  assessment?: ProjectionAssessment
  coverage?: ProjectionCoverage
  children?: ProjectionSubject[]
}

export interface ProjectionCoverage {
  articleIds?: string[]
  questionIds?: string[]
  practicalIds?: string[]
  topicNodeIds?: string[]
  conceptIds?: string[]
  resourceIds?: string[]
  counts?: Record<string, number>
}

export interface ProjectionScheduleRow {
  id: string | null
  type: string | null
  title: string | null
  date: string | null
  weekday?: string | null
  startTime?: string | null
  endTime?: string | null
  location?: string | null
  group?: string | null
  moduleNumber?: string | null
  sourceDate?: string | null
  sourceCycle?: string | null
  carriedForwardFrom?: string | null
  labels?: string[]
  links?: {
    subjectId?: string | null
    topicNodeIds?: string[]
    conceptIds?: string[]
    articleIds?: string[]
    resourceIds?: string[]
    assessmentComponentIds?: string[]
  }
}

export interface StudentAssessmentComponent {
  id: string
  label: string
  kind: string
  marks: number | null
  displayMarks: string
  allocations: Array<{ subjectId: string | null; label: string; marks: number | null; displayMarks: string }>
}

export interface StudentAssessmentMap {
  status: string
  declaredTotal: number | null
  componentTotal: number | null
  total: number | null
  displayTotal: string
  credits: number | null
  passRule: string | null
  components: StudentAssessmentComponent[]
}

export interface StudentScheduleMap {
  id: string
  type: string
  label: string
  title: string
  date: string | null
  startTime: string | null
  endTime: string | null
  location: string | null
  carriedForwardFrom: string | null
  labels: string[]
  start: Date | null
  isFuture: boolean
  isExam: boolean
  linkCount: number
}

export interface StudentSubjectMap {
  id: string
  name: string
  type: string
  labels: string[]
  coverageCount: number
  children: StudentSubjectMap[]
}

export interface StudentModuleMap {
  id: string
  name: string
  moduleId: string
  term: string
  labels: string[]
  assessment: StudentAssessmentMap
  subjects: StudentSubjectMap[]
  subjectCount: number
  schedule: StudentScheduleMap[]
  futureBlocks: number
  coverageCount: number
  badges: Array<'verified' | 'carried-forward' | 'inferred' | 'being-verified' | 'needs-marks' | 'needs-schedule'>
}

export interface StudentTermMap {
  term: string
  modules: StudentModuleMap[]
  marks: number | null
}

export interface StudentCurriculumMap {
  profile: StudentUniversityProjection['profile']
  university: StudentUniversityProjection['university']
  year: StudentUniversityProjection['year']
  status: StudentUniversityProjection['status']
  terms: StudentTermMap[]
  modules: StudentModuleMap[]
  upcoming: Array<StudentScheduleMap & { moduleName: string; moduleId: string }>
  totals: {
    terms: number
    modules: number
    marks: number | null
    marksUnavailable: boolean
    subjects: number
    scheduleRows: number
  }
}

const HIDDEN_STATES = new Set(['draft', 'conflicted'])
const REVIEW_ONLY_STATES = new Set(['ambiguous', 'being_verified', 'being-verified'])

function stateOf(record: unknown): string {
  if (!record || typeof record !== 'object') return ''
  const state = (record as Record<string, unknown>).evidenceState
    ?? (record as Record<string, unknown>).status
    ?? (record as Record<string, unknown>).publicationStatus
    ?? (record as Record<string, unknown>).reviewStatus
    ?? (record as Record<string, unknown>).verificationStatus
    ?? (record as Record<string, unknown>).linkState
    ?? (record as Record<string, unknown>).reconciliationStatus
  return state === undefined || state === null ? '' : String(state).toLowerCase()
}

function isHiddenRecord(record: unknown): boolean {
  if (!record || typeof record !== 'object') return false
  const value = record as Record<string, unknown>
  return value.draft === true || value.conflicted === true || HIDDEN_STATES.has(stateOf(record))
}

function unique(values: Array<string | null | undefined>): string[] {
  return [...new Set(values.map((value) => String(value ?? '').trim()).filter(Boolean))]
}

function labelsFor(record: unknown): string[] {
  if (!record || typeof record !== 'object') return []
  const value = record as Record<string, unknown>
  const state = stateOf(record)
  return unique([
    state && !HIDDEN_STATES.has(state) ? state : null,
    value.carriedForward || value.carriedForwardFrom || value.carryForward ? 'carried-forward' : null,
    value.inferred === true || state === 'inferred' ? 'inferred' : null,
    REVIEW_ONLY_STATES.has(state) ? 'being-verified' : null,
  ])
}

/**
 * A module's coverage, merged from every subject beneath it — any depth.
 *
 * Coverage is chosen per subject, so "what does this module cover" has to walk
 * the whole tree, the same way `mergeCurricula` walks the admin-side
 * `ModuleSubject` tree it is chosen on. This is the read-only counterpart: the
 * source here is whatever `ProjectionSubject[]` a student's own page actually
 * receives, live from the server or from the demo projection (whose
 * `coverage` field mirrors `ModuleSubject.curriculum` field-for-field).
 *
 * Only `articleIds` and `topicNodeIds` are merged — the two lists a caller
 * needs to resolve "which library articles does this module cover" — but the
 * shape is easy to widen if a future caller needs the other lists too.
 */
export function mergeModuleCoverage(module: Pick<ProjectionModule, 'coverage' | 'subjects'>): { articleIds: string[]; topicNodeIds: string[] } {
  const articleIds = new Set<string>()
  const topicNodeIds = new Set<string>()
  const absorb = (coverage: ProjectionCoverage | undefined) => {
    coverage?.articleIds?.forEach((id) => articleIds.add(id))
    coverage?.topicNodeIds?.forEach((id) => topicNodeIds.add(id))
  }
  const visit = (list: ProjectionSubject[] | undefined) => {
    (list ?? []).forEach((subject) => {
      absorb(subject.coverage)
      visit(subject.children)
    })
  }
  // A module may carry its own coverage directly (a server could choose to
  // roll it up server-side) in addition to whatever its subjects carry — both
  // are absorbed so neither source can be silently dropped.
  absorb(module.coverage)
  visit(module.subjects)
  return { articleIds: [...articleIds], topicNodeIds: [...topicNodeIds] }
}

function countCoverage(coverage: ProjectionCoverage | undefined): number {
  if (!coverage) return 0
  if (coverage.counts) {
    return Object.entries(coverage.counts)
      .filter(([key]) => key !== 'counts')
      .reduce((sum, [, value]) => sum + (Number.isFinite(value) ? value : 0), 0)
  }
  return [
    coverage.articleIds, coverage.questionIds, coverage.practicalIds,
    coverage.topicNodeIds, coverage.conceptIds, coverage.resourceIds,
  ].reduce((sum, values) => sum + (values?.length ?? 0), 0)
}

/**
 * A plain-language label for an assessment component when the record itself
 * carries none. Kinds are a closed, faculty-facing vocabulary (`eom`, `saq`,
 * `pass-fail`...); this is the one place they are translated into wording a
 * student would recognise from their own exam timetable, rather than printed
 * as-is on a screen that never shows anything else internal.
 */
const KIND_LABEL: Partial<Record<string, string>> = {
  eom: 'Written · end of module',
  eoy: 'Written · end of year',
  midterm: 'Midterm exam',
  quiz: 'Quiz',
  coursework: 'Coursework',
  assignments: 'Assignments',
  'final-written': 'Final written exam',
  saq: 'Short-answer questions',
  mcq: 'MCQ exam',
  case: 'Case-based exam',
  practical: 'Practical exam',
  ospe: 'OSPE',
  osce: 'OSCE',
  oral: 'Oral exam',
  portfolio: 'Portfolio',
  attendance: 'Attendance',
  logbook: 'Logbook',
  'pass-fail': 'Pass/fail component',
  custom: 'Assessment component',
}

function flattenSubjectNames(subjects: readonly StudentSubjectMap[]): Record<string, string> {
  const map: Record<string, string> = {}
  const visit = (list: readonly StudentSubjectMap[]) => list.forEach((subject) => {
    map[subject.id] = subject.name
    visit(subject.children)
  })
  visit(subjects)
  return map
}

function formatDisplayMarks(value: number | null | undefined | 'unavailable'): string {
  if (value === null || value === undefined || value === 'unavailable') return 'unavailable'
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')
}

function localDateTime(date: string | null | undefined, time: string | null | undefined): Date | null {
  if (!date) return null
  const [year, month, day] = date.split('-').map(Number)
  if (!year || !month || !day) return null
  const [hour = 0, minute = 0] = (time || '00:00').split(':').map(Number)
  const out = new Date(year, month - 1, day, hour, minute)
  return Number.isFinite(out.getTime()) ? out : null
}

function normalizeAssessment(input: ProjectionAssessment | undefined, subjectNames: Record<string, string> = {}): StudentAssessmentMap {
  const components = (input?.components ?? [])
    .filter((component) => component.marks !== null && component.marks !== undefined)
    .map<StudentAssessmentComponent>((component, index) => ({
      id: component.id ?? `component-${index + 1}`,
      label: component.label || KIND_LABEL[component.kind ?? ''] || 'Assessment component',
      kind: component.kind ?? 'custom',
      marks: component.marks ?? null,
      displayMarks: formatDisplayMarks(component.marks),
      // Never the raw subjectId: an unresolved allocation reads as a plain,
      // still-informative "Allocation 2" rather than an internal identifier.
      allocations: (component.subjectAllocations ?? []).map((allocation, allocationIndex) => ({
        subjectId: allocation.subjectId ?? null,
        label: allocation.label || (allocation.subjectId ? subjectNames[allocation.subjectId] : undefined) || `Allocation ${allocationIndex + 1}`,
        marks: allocation.marks ?? null,
        displayMarks: formatDisplayMarks(allocation.marks),
      })),
    }))
  const total = input?.total ?? (input?.displayTotal === 'unavailable' ? null : input?.displayTotal) ?? null
  return {
    status: input?.status ?? (total === null ? 'partial' : 'exact'),
    declaredTotal: input?.declaredTotal ?? null,
    componentTotal: input?.componentTotal ?? null,
    total,
    displayTotal: formatDisplayMarks(input?.displayTotal ?? total),
    credits: input?.credits ?? null,
    passRule: input?.passRule ?? null,
    components,
  }
}

function normalizeSubjects(subjects: ProjectionSubject[] | undefined): StudentSubjectMap[] {
  return (subjects ?? []).map((subject, index) => {
    const children = normalizeSubjects(subject.children)
    return {
      id: subject.id ?? `subject-${index + 1}`,
      name: subject.name || 'Untitled subject',
      type: subject.type ?? (children.length ? 'subject' : 'subsubject'),
      labels: unique([...(subject.labels ?? []), subject.evidenceState ?? null]),
      coverageCount: countCoverage(subject.coverage),
      children,
    }
  })
}

function countSubjectNodes(subjects: readonly StudentSubjectMap[]): number {
  return subjects.reduce((sum, subject) => sum + 1 + countSubjectNodes(subject.children), 0)
}

function normalizeSchedule(rows: ProjectionScheduleRow[] | undefined, now: Date): StudentScheduleMap[] {
  return (rows ?? []).map((row, index) => {
    const type = row.type ?? 'lecture'
    const start = localDateTime(row.date, row.startTime)
    const links = row.links ?? {}
    const linkCount = [
      links.subjectId ? [links.subjectId] : [],
      links.topicNodeIds, links.conceptIds, links.articleIds, links.resourceIds, links.assessmentComponentIds,
    ].reduce((sum, values) => sum + (values?.length ?? 0), 0)
    return {
      id: row.id ?? `schedule-${index + 1}`,
      type,
      label: MODULE_BLOCK_LABEL[type as ModuleScheduleBlockType] ?? type,
      title: row.title ?? MODULE_BLOCK_LABEL[type as ModuleScheduleBlockType] ?? 'Timetable block',
      date: row.date ?? null,
      startTime: row.startTime ?? null,
      endTime: row.endTime ?? null,
      location: row.location ?? null,
      carriedForwardFrom: row.carriedForwardFrom ?? null,
      labels: row.labels ?? [],
      start,
      isFuture: Boolean(start && start.getTime() >= now.getTime()),
      isExam: EXAM_BLOCK_TYPES.includes(type as ModuleScheduleBlockType),
      linkCount,
    }
  }).sort((a, b) => (a.start?.getTime() ?? Number.MAX_SAFE_INTEGER) - (b.start?.getTime() ?? Number.MAX_SAFE_INTEGER))
}

function moduleBadges(module: Omit<StudentModuleMap, 'badges'>): StudentModuleMap['badges'] {
  const labels = new Set(module.labels)
  const badges: StudentModuleMap['badges'] = []
  if (module.assessment.total !== null && module.assessment.status !== 'partial') badges.push('verified')
  else badges.push('needs-marks')
  if (labels.has('carried-forward') || module.schedule.some((row) => row.labels.includes('carried-forward'))) badges.push('carried-forward')
  if (labels.has('inferred') || module.schedule.some((row) => row.labels.includes('inferred'))) badges.push('inferred')
  if (labels.has('being-verified') || module.assessment.status === 'being_verified') badges.push('being-verified')
  if (module.schedule.length === 0) badges.push('needs-schedule')
  return badges
}

export function normalizeStudentUniversityProjection(
  projection: StudentUniversityProjection,
  now = new Date(),
): StudentCurriculumMap {
  const sumMarks = (values: Array<number | null>): number | null =>
    values.some((value) => value !== null) ? values.reduce<number>((sum, value) => sum + (value ?? 0), 0) : null
  const terms = (projection.terms ?? []).map<StudentTermMap>((term) => {
    const modules = (term.modules ?? []).map<StudentModuleMap>((raw) => {
      const subjects = normalizeSubjects(raw.subjects)
      const schedule = normalizeSchedule(raw.schedule, now)
      const base = {
        id: raw.id,
        name: raw.name || raw.moduleId || 'Untitled module',
        moduleId: raw.moduleId || raw.id,
        term: raw.term || term.term || DEFAULT_TERM,
        labels: unique([...(raw.labels ?? []), raw.evidenceState ?? null]),
        assessment: normalizeAssessment(raw.assessment, flattenSubjectNames(subjects)),
        subjects,
        subjectCount: countSubjectNodes(subjects),
        schedule,
        futureBlocks: schedule.filter((row) => row.isFuture).length,
        coverageCount: countCoverage(raw.coverage),
      }
      return { ...base, badges: moduleBadges(base) }
    })
    const moduleMarks = modules.map((module) => module.assessment.total)
    return {
      term: term.term || DEFAULT_TERM,
      modules,
      marks: sumMarks(moduleMarks),
    }
  })
  const modules = terms.flatMap((term) => term.modules)
  const upcoming = modules.flatMap((module) => module.schedule
    .filter((row) => row.isFuture)
    .map((row) => ({ ...row, moduleName: module.name, moduleId: module.moduleId })))
    .sort((a, b) => (a.start?.getTime() ?? 0) - (b.start?.getTime() ?? 0))
  const markTotals = modules.map((module) => module.assessment.total)
  return {
    profile: projection.profile,
    university: projection.university,
    year: projection.year,
    status: projection.status,
    terms,
    modules,
    upcoming,
    totals: {
      terms: terms.length,
      modules: modules.length,
      marks: sumMarks(markTotals),
      marksUnavailable: markTotals.some((value) => value === null),
      subjects: modules.reduce((sum, module) => sum + module.subjectCount, 0),
      scheduleRows: modules.reduce((sum, module) => sum + module.schedule.length, 0),
    },
  }
}

function projectionAssessmentFromScheme(scheme: AssessmentScheme | null | undefined, fallbackMarks?: ExamMarks): ProjectionAssessment {
  if (scheme && isHiddenRecord(scheme)) {
    return {
      status: 'being_verified',
      declaredTotal: null,
      componentTotal: null,
      total: null,
      displayTotal: 'unavailable',
      credits: null,
      passRule: null,
      components: [],
    }
  }
  if (scheme && !isHiddenRecord(scheme)) {
    const components = (scheme.components ?? []).map((component) => ({
      id: component.id,
      label: component.label,
      kind: component.kind,
      marks: marksToNumber(component.marks),
      subjectAllocations: (component.subjectAllocations ?? []).map((allocation) => ({
        subjectId: allocation.subjectId,
        // No label here: `normalizeAssessment` resolves it to the subject's
        // real name, or a plain "Allocation N" — never the raw subjectId.
        label: null,
        marks: marksToNumber(allocation.marks),
      })),
      passRule: component.passRule ?? null,
    }))
    const componentTotal = components.reduce((sum, component) => sum + (component.marks ?? 0), 0)
    const declaredTotal = marksToNumber(scheme.declaredTotal)
    return {
      status: scheme.reconciliationStatus ?? (declaredTotal !== null && Math.abs(componentTotal - declaredTotal) < 0.001 ? 'exact' : 'partial'),
      declaredTotal,
      componentTotal: components.length ? componentTotal : null,
      total: declaredTotal ?? (components.length ? componentTotal : null),
      displayTotal: declaredTotal ?? (components.length ? componentTotal : 'unavailable'),
      credits: scheme.credits ?? null,
      passRule: scheme.passRule ?? null,
      components,
    }
  }
  const totals = fallbackMarks ?? EXAM_BUCKETS.reduce((out, bucket) => ({ ...out, [bucket.key]: 0 }), {} as ExamMarks)
  const components = EXAM_BUCKETS
    .map((bucket) => ({ id: bucket.key, label: bucket.label, kind: bucket.key, marks: totals[bucket.key] || 0 }))
    .filter((component) => component.marks > 0)
  const total = components.reduce((sum, component) => sum + component.marks, 0)
  return {
    status: total > 0 ? 'derived' : 'partial',
    declaredTotal: total > 0 ? total : null,
    componentTotal: total > 0 ? total : null,
    total: total > 0 ? total : null,
    displayTotal: total > 0 ? total : 'unavailable',
    credits: null,
    passRule: null,
    components,
  }
}

function projectionSubject(subject: ModuleSubject): ProjectionSubject | null {
  if (isHiddenRecord(subject)) return null
  const children = (subject.children ?? []).map(projectionSubject).filter(Boolean) as ProjectionSubject[]
  return {
    id: subject.id,
    name: subject.name || 'Untitled subject',
    type: children.length ? 'subject' : 'subsubject',
    evidenceState: subject.provenance?.evidenceState ?? null,
    labels: labelsFor(subject.provenance ?? subject),
    assessment: projectionAssessmentFromScheme(subject.assessmentScheme, subject.marks),
    coverage: subject.curriculum,
    children,
  }
}

function projectionSchedule(block: ModuleScheduleBlock): ProjectionScheduleRow | null {
  if (isHiddenRecord(block)) return null
  const links = scheduleLinks(block)
  const carryForward = block.carryForward
  return {
    id: block.id,
    type: block.type,
    title: block.title,
    date: block.date,
    startTime: block.startTime,
    endTime: block.endTime,
    location: block.location,
    moduleNumber: block.moduleNumber,
    sourceDate: carryForward?.sourceDate ?? null,
    sourceCycle: carryForward?.sourceCycle ?? null,
    carriedForwardFrom: carryForward?.carriedForwardFrom ?? null,
    labels: unique([...labelsFor(block.provenance ?? block), ...(carryForward ? ['carried-forward'] : [])]),
    links,
  }
}

function scheduleFor(schedules: ModuleScheduleStore, university: University, year: UniYear, courseId: string): ModuleScheduleBlock[] {
  return schedules[moduleKey(university.id, year.id, courseId)] ?? schedules[moduleKey(university.id, year.year, courseId)] ?? []
}

function termsForYear(year: UniYear): string[] {
  const seen = new Set<string>()
  const terms: string[] = []
  for (const term of year.terms ?? []) {
    const label = term || DEFAULT_TERM
    if (!seen.has(label)) { seen.add(label); terms.push(label) }
  }
  for (const course of year.courses ?? []) {
    const label = course.term || course.block || DEFAULT_TERM
    if (!seen.has(label)) { seen.add(label); terms.push(label) }
  }
  return terms.length ? terms : [DEFAULT_TERM]
}

export function buildDemoStudentUniversityProjection(
  university: University,
  year: UniYear,
  subjects: ModuleSubjectStore,
  schedules: ModuleScheduleStore,
  assessmentSchemes: Record<string, AssessmentScheme> = {},
): StudentUniversityProjection {
  const terms = termsForYear(year).map<ProjectionTerm>((term) => ({
    term,
    modules: year.courses
      .filter((course) => (course.term || course.block || DEFAULT_TERM) === term)
      .map<ProjectionModule>((course: CurriculumCourse) => {
        const key = moduleKey(university.id, year.id, course.id)
        const legacyKey = moduleKey(university.id, year.year, course.id)
        const moduleSubjects = subjectsOf(subjects, university.id, year.id, course.id)
        const scheme = assessmentSchemes[key] ?? assessmentSchemes[legacyKey] ?? null
        const schedule = scheduleFor(schedules, university, year, course.id).map(projectionSchedule).filter(Boolean) as ProjectionScheduleRow[]
        return {
          id: course.id,
          name: course.name,
          moduleId: course.moduleId ?? null,
          term,
          labels: unique([schedule.some((row) => row.labels?.includes('carried-forward')) ? 'carried-forward' : null]),
          assessment: projectionAssessmentFromScheme(scheme, bucketTotals(moduleSubjects)),
          subjects: moduleSubjects.map(projectionSubject).filter(Boolean) as ProjectionSubject[],
          schedule,
          coverage: { counts: { subjectNodes: walkSubjects(moduleSubjects).length } },
        }
      }),
  }))
  return {
    profile: {
      studentId: null,
      universityId: university.id,
      year: year.year,
      yearId: year.id,
      group: null,
    },
    university: { id: university.id, name: university.name, short: university.short, region: university.region },
    year: { id: year.id, year: year.year, active: year.active !== false && university.active !== false, terms: year.terms ?? [] },
    terms,
    modules: terms.flatMap((term) => term.modules.map((module) => ({
      id: module.id,
      name: module.name,
      moduleId: module.moduleId,
      term: module.term,
    }))),
    status: 'ready',
  }
}
