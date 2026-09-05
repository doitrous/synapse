import { createHash } from 'node:crypto'

export const ACADEMIC_STATE_KEYS = [
  'nishany-academic-universities-v1',
  'nishany-course-curricula-v1',
  'nishany-module-schedules-v1',
  'nishany-module-subjects-v1',
  'nishany-assessment-schemes-v1',
  'nishany-academic-source-provenance-v1',
]

export const UNIVERSITY_KEY = 'nishany-academic-universities-v1'
export const CURRICULA_KEY = 'nishany-course-curricula-v1'
export const SCHEDULE_KEY = 'nishany-module-schedules-v1'
export const SUBJECTS_KEY = 'nishany-module-subjects-v1'
export const ASSESSMENT_SCHEMES_KEY = 'nishany-assessment-schemes-v1'
export const PROVENANCE_KEY = 'nishany-academic-source-provenance-v1'

const DEFAULT_TERM = 'Term 1'
const HIDDEN_STATES = new Set(['draft', 'conflicted'])
const REVIEW_ONLY_STATES = new Set(['ambiguous'])

/**
 * A module's schedule is invisible to students until an admin explicitly
 * publishes it. The flag lives inside the SCHEDULE_KEY document itself, under
 * one reserved key mapping module key -> boolean (see
 * `src/data/moduleSchedule.ts`, which owns the same convention client-side),
 * rather than on the per-module block array — a plain array has no room for
 * metadata. A module missing from that map is unpublished: that is the
 * migration for every schedule saved before this existed, and needs no
 * rewrite.
 */
export const SCHEDULE_PUBLISH_STATE_KEY = '__schedulePublishState__'

export function isSchedulePublished(scheduleDoc, key) {
  if (!key) return false
  const state = scheduleDoc?.[SCHEDULE_PUBLISH_STATE_KEY]
  return Boolean(state && typeof state === 'object' && state[key] === true)
}

const HELWAN_YEAR_ONE_ID = 'HU_Y1'
const HELWAN_YEAR_ONE_TOKENS = [
  'HU_Y1',
  'hu_y1',
  'year:HU_Y1',
  'helwan/year 1',
  'helwan\\year 1',
  'helwan/y1',
  'helwan\\y1',
  '/helwan/year 1/',
  '\\helwan\\year 1\\',
]

function safeJson(value, fallback = null) {
  if (value === null || value === undefined) return fallback
  if (typeof value !== 'string') return value
  try { return JSON.parse(value) } catch { return fallback }
}

export function stableFingerprint(value) {
  if (value === null || value === undefined) return 'null'
  if (typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map(stableFingerprint).join(',')}]`
  return `{${Object.keys(value).sort()
    .filter((key) => value[key] !== undefined)
    .map((key) => `${JSON.stringify(key)}:${stableFingerprint(value[key])}`)
    .join(',')}}`
}

export function sha256Json(value) {
  return createHash('sha256').update(stableFingerprint(value)).digest('hex')
}

export function parseCatalogue(raw) {
  const parsed = safeJson(raw, [])
  return Array.isArray(parsed) ? parsed : []
}

function parseObject(raw) {
  const parsed = safeJson(raw, {})
  return isObject(parsed) ? parsed : {}
}

export function parseAcademicDocuments(rawDocuments = {}) {
  return {
    [UNIVERSITY_KEY]: parseCatalogue(rawDocuments[UNIVERSITY_KEY]),
    [CURRICULA_KEY]: parseObject(rawDocuments[CURRICULA_KEY]),
    [SCHEDULE_KEY]: parseObject(rawDocuments[SCHEDULE_KEY]),
    [SUBJECTS_KEY]: parseObject(rawDocuments[SUBJECTS_KEY]),
    [ASSESSMENT_SCHEMES_KEY]: parseObject(rawDocuments[ASSESSMENT_SCHEMES_KEY]),
    [PROVENANCE_KEY]: parseObject(rawDocuments[PROVENANCE_KEY]),
  }
}

export function findCatalogueYear(catalogue, universityId, yearOrId) {
  const university = catalogue.find((entry) => entry?.id === universityId)
  if (!university || !Array.isArray(university.years)) return null
  const needle = String(yearOrId ?? '').trim()
  if (!needle) return null
  return university.years.find((year) => year?.id === needle || year?.year === needle) ?? null
}

export function academicModuleKey(universityId, yearId, courseId) {
  return `${universityId}:${yearId}:${courseId}`
}

function legacyAcademicModuleKey(universityId, yearLabel, courseId) {
  return `${universityId}:${yearLabel}:${courseId}`
}

function coerceDocs(input) {
  if (Array.isArray(input)) {
    return parseAcademicDocuments({ [UNIVERSITY_KEY]: input })
  }
  return parseAcademicDocuments(input ?? {})
}

function stateOf(record) {
  const state = record?.evidenceState
    ?? record?.status
    ?? record?.publicationStatus
    ?? record?.reviewStatus
    ?? record?.verificationStatus
    ?? record?.linkState
    ?? record?.reconciliationStatus
  return state === undefined || state === null ? '' : String(state).toLowerCase()
}

function isHiddenRecord(record) {
  if (!record || typeof record !== 'object') return false
  if (record.draft === true || record.conflicted === true) return true
  return HIDDEN_STATES.has(stateOf(record))
}

function isReviewOnlyRecord(record) {
  return REVIEW_ONLY_STATES.has(stateOf(record))
}

function asArray(value) {
  return Array.isArray(value) ? value : []
}

function unique(values) {
  return [...new Set(asArray(values).filter((value) => value !== null && value !== undefined && String(value).trim() !== '').map(String))]
}

function mergeSelection(target, selection) {
  if (!selection || typeof selection !== 'object' || isHiddenRecord(selection) || isReviewOnlyRecord(selection)) return target
  for (const field of ['articleIds', 'questionIds', 'practicalIds', 'topicNodeIds', 'conceptIds', 'resourceIds']) {
    target[field].push(...unique(selection[field]))
  }
  return target
}

function compactSelection(selection) {
  return Object.fromEntries(Object.entries(selection).map(([key, value]) => [key, key === 'subjectId' ? (value ?? null) : unique(value)]))
}

function labelsFor(record) {
  const labels = []
  const state = stateOf(record)
  if (state && !HIDDEN_STATES.has(state)) labels.push(state)
  if (record?.carriedForward || record?.carriedForwardFrom) labels.push('carried-forward')
  if (record?.inferred === true || state === 'inferred') labels.push('inferred')
  if (isReviewOnlyRecord(record)) labels.push('being-verified')
  return unique(labels)
}

function provenanceFrom(store, ...ids) {
  if (!store || typeof store !== 'object') return null
  for (const id of ids.filter(Boolean)) {
    const direct = store[id]
    if (direct && typeof direct === 'object') return isHiddenRecord(direct) ? null : direct
    for (const bucket of ['modules', 'subjects', 'schedules', 'curricula', 'assessments']) {
      const nested = store[bucket]?.[id]
      if (nested && typeof nested === 'object') return isHiddenRecord(nested) ? null : nested
    }
  }
  return null
}

function centsToNumber(value) {
  if (value === null || value === undefined || value === '') return null
  const amount = Number(value)
  if (!Number.isFinite(amount)) return null
  return amount / 100
}

function legacyMarkComponents(marks = {}) {
  const fields = [
    ['oral', 'Oral', 'oral'],
    ['practical', 'Practical', 'practical'],
    ['written', 'Written', 'final_written'],
    ['yearWork', 'Year work', 'coursework'],
  ]
  return fields
    .map(([field, label, kind]) => ({ id: field, label, kind, marks: Number(marks[field] ?? 0) }))
    .filter((component) => Number.isFinite(component.marks) && component.marks > 0)
}

function allocationProjection(allocation) {
  return {
    subjectId: allocation?.subjectId ?? null,
    label: allocation?.label ?? null,
    marks: centsToNumber(allocation?.marks),
  }
}

function schemeProjection(scheme, fallbackMarks) {
  if (scheme && typeof scheme === 'object' && isHiddenRecord(scheme)) {
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
  if (scheme && typeof scheme === 'object' && !isHiddenRecord(scheme)) {
    const components = asArray(scheme.components)
      .filter((component) => !isHiddenRecord(component))
      .map((component) => ({
        id: component.id ?? null,
        label: component.label ?? component.kind ?? 'Assessment',
        kind: component.kind ?? 'custom',
        marks: centsToNumber(component.marks),
        subjectAllocations: asArray(component.subjectAllocations).map(allocationProjection),
        passRule: component.passRule ?? null,
      }))
    const componentTotal = components.reduce((sum, component) => sum + (component.marks ?? 0), 0)
    const declaredTotal = centsToNumber(scheme.declaredTotal)
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
  const components = legacyMarkComponents(fallbackMarks)
  const total = components.reduce((sum, component) => sum + component.marks, 0)
  return {
    status: components.length ? 'derived' : 'partial',
    declaredTotal: components.length ? total : null,
    componentTotal: components.length ? total : null,
    total: components.length ? total : null,
    displayTotal: components.length ? total : 'unavailable',
    credits: null,
    passRule: null,
    components,
  }
}

function subjectProjection(subject) {
  if (!subject || typeof subject !== 'object' || isHiddenRecord(subject)) return null
  const coverage = compactSelection(mergeSelection({
    articleIds: [],
    questionIds: [],
    practicalIds: [],
    topicNodeIds: [],
    conceptIds: [],
    resourceIds: [],
  }, subject.curriculum ?? subject.coverage))
  const children = asArray(subject.children).map((child) => subjectProjection(child)).filter(Boolean)
  const assessment = schemeProjection(subject.assessmentScheme, subject.exam)
  return {
    id: subject.id ?? null,
    name: subject.name ?? subject.title ?? 'Untitled subject',
    type: subject.type ?? (children.length ? 'subject' : 'subsubject'),
    evidenceState: subject.provenance?.evidenceState ?? subject.evidenceState ?? null,
    labels: labelsFor(subject.provenance ?? subject),
    assessment,
    coverage,
    children,
  }
}

function subjectTreeAndCoverage(subjects) {
  const coverage = {
    articleIds: [],
    questionIds: [],
    practicalIds: [],
    topicNodeIds: [],
    conceptIds: [],
    resourceIds: [],
  }
  const tree = asArray(subjects)
    .map((subject) => subjectProjection(subject))
    .filter(Boolean)
  const visit = (node) => {
    mergeSelection(coverage, node.coverage)
    for (const child of node.children ?? []) visit(child)
  }
  for (const node of tree) visit(node)
  return { subjects: tree, coverage: compactSelection(coverage) }
}

function splitLegacyTopicIds(block) {
  const explicit = {
    subjectId: block?.subjectId ?? block?.links?.subjectId ?? null,
    topicNodeIds: unique([...(block?.topicNodeIds ?? []), ...(block?.links?.topicNodeIds ?? [])]),
    conceptIds: unique([...(block?.conceptIds ?? []), ...(block?.links?.conceptIds ?? [])]),
    articleIds: unique([...(block?.articleIds ?? []), ...(block?.links?.articleIds ?? [])]),
    resourceIds: unique([...(block?.resourceIds ?? []), ...(block?.links?.resourceIds ?? [])]),
    assessmentComponentIds: unique([...(block?.assessmentComponentIds ?? []), ...(block?.links?.assessmentComponentIds ?? [])]),
  }
  for (const id of unique(block?.topicIds)) {
    if (/^(ART|ARTICLE)[-_]/i.test(id)) explicit.articleIds.push(id)
    else if (/^(CON|CONCEPT)[-_]/i.test(id)) explicit.conceptIds.push(id)
    else explicit.topicNodeIds.push(id)
  }
  return compactSelection(explicit)
}

function scheduleProjection(block) {
  if (!block || typeof block !== 'object' || isHiddenRecord(block)) return null
  const links = isReviewOnlyRecord(block) ? {
    subjectId: block.subjectId ?? block.links?.subjectId ?? null,
    topicNodeIds: [],
    conceptIds: [],
    articleIds: [],
    resourceIds: [],
    assessmentComponentIds: [],
  } : splitLegacyTopicIds(block)
  return {
    id: block.id ?? null,
    type: block.type ?? null,
    title: block.title ?? block.topic ?? null,
    date: block.date ?? null,
    weekday: block.weekday ?? null,
    startTime: block.startTime ?? null,
    endTime: block.endTime ?? null,
    location: block.location ?? null,
    group: block.group ?? block.studyGroup ?? null,
    moduleNumber: block.moduleNumber ?? null,
    sourceDate: block.sourceDate ?? null,
    sourceCycle: block.sourceCycle ?? null,
    carriedForwardFrom: block.carriedForwardFrom ?? null,
    labels: labelsFor(block),
    links,
  }
}

function termsForYear(year) {
  const seen = new Set()
  const terms = []
  for (const term of asArray(year?.terms)) {
    const label = String(term || DEFAULT_TERM)
    if (!seen.has(label)) { seen.add(label); terms.push(label) }
  }
  for (const course of asArray(year?.courses)) {
    const label = String(course?.term ?? course?.block ?? DEFAULT_TERM)
    if (!seen.has(label)) { seen.add(label); terms.push(label) }
  }
  return terms.length ? terms : [DEFAULT_TERM]
}

export function studentUniversityProjection(profile, academicDocuments) {
  const docs = coerceDocs(academicDocuments)
  const catalogue = docs[UNIVERSITY_KEY]
  if (!profile) return { profile: null, university: null, year: null, modules: [], status: 'missing_profile' }
  const universityId = profile.universityId ?? profile.university_id ?? null
  const yearId = profile.yearId ?? profile.year_id ?? null
  const yearLabel = profile.year ?? null
  const university = catalogue.find((entry) => entry?.id === universityId) ?? null
  const year = university
    ? (yearId ? findCatalogueYear(catalogue, universityId, yearId) : null)
      ?? findCatalogueYear(catalogue, universityId, yearLabel)
    : null
  const profileProjection = {
    studentId: profile.id ?? profile.studentId ?? null,
    universityId,
    year: year?.year ?? yearLabel,
    yearId: year?.id ?? yearId,
    group: profile.group ?? profile.study_group ?? profile.studyGroup ?? null,
  }
  if (!university || !year) {
    return {
      profile: profileProjection,
      university: university
        ? { id: university.id, name: university.name, short: university.short, region: university.region }
        : null,
      year: null,
      terms: [],
      modules: [],
      status: 'being_verified',
    }
  }
  const moduleEntries = []
  const terms = termsForYear(year).map((term) => ({ term, modules: [] }))
  const termMap = new Map(terms.map((term) => [term.term, term]))
  for (const course of asArray(year?.courses)) {
    if (isHiddenRecord(course)) continue
    const key = academicModuleKey(universityId, year?.id, course.id)
    const legacyKey = legacyAcademicModuleKey(universityId, year?.year, course.id)
    const moduleSubjects = docs[SUBJECTS_KEY][key] ?? docs[SUBJECTS_KEY][legacyKey] ?? course.subjects ?? []
    const moduleCurriculum = docs[CURRICULA_KEY][key] ?? docs[CURRICULA_KEY][legacyKey] ?? course.curriculum ?? null
    const moduleSchedule = docs[SCHEDULE_KEY][key] ?? docs[SCHEDULE_KEY][legacyKey] ?? []
    const moduleScheme = docs[ASSESSMENT_SCHEMES_KEY][key] ?? docs[ASSESSMENT_SCHEMES_KEY][legacyKey] ?? course.assessmentScheme ?? null
    const provenance = provenanceFrom(docs[PROVENANCE_KEY], key, legacyKey, course.id, course.moduleId)
    if (isHiddenRecord(provenance)) continue
    const { subjects, coverage: subjectCoverage } = subjectTreeAndCoverage(moduleSubjects)
    const coverage = compactSelection(mergeSelection({ ...subjectCoverage }, moduleCurriculum))
    // A schedule with content that has never been published stays out of the
    // student projection entirely — the module still shows up, just with no
    // timetable rows, which the client already renders as "schedule pending."
    const schedulePublished = isSchedulePublished(docs[SCHEDULE_KEY], key) || isSchedulePublished(docs[SCHEDULE_KEY], legacyKey)
    const schedule = schedulePublished ? asArray(moduleSchedule).map(scheduleProjection).filter(Boolean) : []
    const term = String(course.term ?? course.block ?? DEFAULT_TERM)
    const entry = {
      id: course.id,
      name: course.name,
      moduleId: course.moduleId ?? null,
      term,
      creditPoints: typeof course.creditPoints === 'number' ? course.creditPoints : null,
      evidenceState: provenance?.evidenceState ?? course.evidenceState ?? null,
      labels: unique([...labelsFor(provenance ?? course), ...(schedule.some((row) => row.labels.includes('carried-forward')) ? ['carried-forward'] : [])]),
      assessment: schemeProjection(moduleScheme, course.exam ?? course.marks),
      subjects,
      schedule,
      coverage: {
        ...coverage,
        counts: Object.fromEntries(Object.entries(coverage).map(([field, values]) => [field, values.length])),
      },
    }
    moduleEntries.push(entry)
    if (!termMap.has(term)) {
      const bucket = { term, modules: [] }
      terms.push(bucket)
      termMap.set(term, bucket)
    }
    termMap.get(term).modules.push(entry)
  }
  return {
    profile: profileProjection,
    university: university
      ? { id: university.id, name: university.name, short: university.short, region: university.region }
      : null,
    year: year
      ? {
        id: year.id,
        year: year.year,
        active: year.active !== false && university?.active !== false,
        terms: Array.isArray(year.terms) ? year.terms : [],
      }
      : null,
    terms,
    modules: moduleEntries.map((entry) => ({
      id: entry.id,
      name: entry.name,
      moduleId: entry.moduleId,
      term: entry.term,
    })),
    status: university && year ? 'ready' : 'being_verified',
  }
}

export function changedAcademicKeys(baseDocs, nextDocs) {
  const changes = []
  for (const key of ACADEMIC_STATE_KEYS) {
    if (!(key in nextDocs)) continue
    if (stableFingerprint(baseDocs[key] ?? null) !== stableFingerprint(nextDocs[key] ?? null)) changes.push(key)
  }
  return changes
}

function includesProtectedToken(value) {
  const text = stableFingerprint(value)
  const lower = text.toLowerCase()
  return HELWAN_YEAR_ONE_TOKENS.some((token) => lower.includes(token.toLowerCase()))
}

function protectedStoreSlice(value) {
  if (!isObject(value)) return {}
  return Object.fromEntries(Object.entries(value).filter(([key, entry]) => (
    key.startsWith('hu:HU_Y1:')
    || key.startsWith('hu:Year 1:')
    || includesProtectedToken(entry)
  )))
}

export function academicProtectionViolations(baseDocs, nextDocs) {
  const violations = []
  const nextUniversities = nextDocs[UNIVERSITY_KEY]
  if (nextUniversities !== undefined) {
    const baseYear = findCatalogueYear(Array.isArray(baseDocs[UNIVERSITY_KEY]) ? baseDocs[UNIVERSITY_KEY] : [], 'hu', HELWAN_YEAR_ONE_ID)
    const nextYear = findCatalogueYear(Array.isArray(nextUniversities) ? nextUniversities : [], 'hu', HELWAN_YEAR_ONE_ID)
    if (stableFingerprint(baseYear ?? null) !== stableFingerprint(nextYear ?? null)) {
      violations.push({ key: UNIVERSITY_KEY, scope: HELWAN_YEAR_ONE_ID, reason: 'Helwan Year 1 catalogue is immutable' })
    }
  }
  for (const key of [CURRICULA_KEY, SCHEDULE_KEY, SUBJECTS_KEY, ASSESSMENT_SCHEMES_KEY, PROVENANCE_KEY]) {
    if (!(key in nextDocs)) continue
    const before = protectedStoreSlice(baseDocs[key])
    const after = protectedStoreSlice(nextDocs[key])
    if (stableFingerprint(before) !== stableFingerprint(after)) {
      violations.push({ key, scope: HELWAN_YEAR_ONE_ID, reason: 'batch mentions protected Helwan Year 1 scope' })
    }
  }
  return violations
}

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
}

export function validateAcademicDocuments(nextDocs) {
  const errors = []
  if (UNIVERSITY_KEY in nextDocs && !Array.isArray(nextDocs[UNIVERSITY_KEY])) {
    errors.push({ key: UNIVERSITY_KEY, reason: 'universities document must be an array' })
  }
  for (const key of [CURRICULA_KEY, SCHEDULE_KEY, SUBJECTS_KEY, ASSESSMENT_SCHEMES_KEY, PROVENANCE_KEY]) {
    if (key in nextDocs && !isObject(nextDocs[key])) errors.push({ key, reason: 'document must be an object' })
  }
  return errors
}

export function academicPreview(baseDocs, nextDocs) {
  const changedKeys = changedAcademicKeys(baseDocs, nextDocs)
  const validationErrors = validateAcademicDocuments(nextDocs)
  const protectionViolations = academicProtectionViolations(baseDocs, nextDocs)
  return {
    ok: validationErrors.length === 0 && protectionViolations.length === 0,
    changedKeys,
    validationErrors,
    protectionViolations,
    fingerprints: Object.fromEntries(changedKeys.map((key) => [key, sha256Json(nextDocs[key] ?? null)])),
  }
}
