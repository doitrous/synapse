import type { AssessmentScheme, AssessmentReconciliationStatus } from '../../data/assessmentScheme.ts'
import { formatMarks, reconcileAssessmentScheme } from '../../data/assessmentScheme.ts'
import type { AcademicSourceRef } from '../../data/academicSource.ts'
import type { CourseCurriculumSelection } from '../../data/courseCurriculum.ts'
import type { ModuleScheduleStore } from '../../data/moduleSchedule.ts'
import { moduleTotal, walkSubjects, type ModuleSubjectStore } from '../../data/moduleSubjects.ts'
import type { UniYear, University } from '../../data/universities.ts'

export const UNIVERSITY_KEY = 'synapse-academic-universities-v1'
export const CURRICULA_KEY = 'synapse-course-curricula-v1'
export const SCHEDULE_KEY = 'synapse-module-schedules-v1'
export const SUBJECTS_KEY = 'synapse-module-subjects-v1'
export const PROVENANCE_KEY = 'synapse-academic-source-provenance-v1'
export const ASSESSMENT_SCHEMES_KEY = 'synapse-assessment-schemes-v1'

export const ACADEMIC_DOCUMENT_KEYS = [
  UNIVERSITY_KEY,
  CURRICULA_KEY,
  SCHEDULE_KEY,
  SUBJECTS_KEY,
  PROVENANCE_KEY,
  ASSESSMENT_SCHEMES_KEY,
] as const

export type AcademicDocumentKey = typeof ACADEMIC_DOCUMENT_KEYS[number]
export type AssessmentSchemeStore = Record<string, AssessmentScheme>
export type CourseCurriculaStore = Record<string, CourseCurriculumSelection>
export type ProvenanceStore = Record<string, unknown>

export interface AcademicIntakePackage {
  schemaVersion: 1
  id: string
  generatedAt: string
  targetCalendarYear?: number
  sourceCalendarYear?: number
  metadataOnly?: boolean
  sourceSnapshots?: Array<Record<string, unknown>>
  protectedScopes?: Array<Record<string, unknown>>
  catalogue: University[]
  moduleSubjects: ModuleSubjectStore
  assessmentSchemes?: AssessmentSchemeStore
  quarantinedAssessmentSchemes?: AssessmentSchemeStore
  courseCurricula?: CourseCurriculaStore
  moduleSchedules?: ModuleScheduleStore
  sourceRefs: AcademicSourceRef[]
  scheduleCandidates?: Array<Record<string, unknown>>
  conflicts?: unknown[]
  warnings?: string[]
}

export interface CurrentAcademicDocuments {
  universities: University[]
  curricula: CourseCurriculaStore
  schedules: ModuleScheduleStore
  subjects: ModuleSubjectStore
  provenance: ProvenanceStore
  assessmentSchemes: AssessmentSchemeStore
}

export interface StagedAcademicDocuments {
  [UNIVERSITY_KEY]: University[]
  [CURRICULA_KEY]: CourseCurriculaStore
  [SCHEDULE_KEY]: ModuleScheduleStore
  [SUBJECTS_KEY]: ModuleSubjectStore
  [PROVENANCE_KEY]: ProvenanceStore
  [ASSESSMENT_SCHEMES_KEY]: AssessmentSchemeStore
}

export interface StagedIntake {
  documents: StagedAcademicDocuments
  summary: IntakeSummary
  markReconciliation: MarkReconciliationRow[]
  blockingReasons: string[]
  warnings: string[]
  fingerprint: string
}

export interface IntakeSummary {
  packageId: string
  universityId: string
  universityName: string
  selectedYearIds: string[]
  sourceFiles: number
  modules: number
  subjects: number
  schedules: number
  assessmentSchemes: number
  sourceRefs: number
  changedKeys: AcademicDocumentKey[]
  carriedForwardRows: number
}

export interface MarkReconciliationRow {
  key: string
  moduleLabel: string
  status: AssessmentReconciliationStatus
  declaredTotal: string
  componentTotal: string
  components: number
  errors: string[]
}

export interface PackageParseResult {
  ok: boolean
  package: AcademicIntakePackage | null
  errors: string[]
}

export interface ServerPreviewResult {
  ok: boolean
  changedKeys: string[]
  validationErrors: unknown[]
  protectionViolations: unknown[]
  fingerprints: Record<string, string>
  versions: Record<string, number | null>
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value))
}

function stableFingerprint(value: unknown): string {
  if (value === null || value === undefined) return 'null'
  if (typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map(stableFingerprint).join(',')}]`
  const record = value as Record<string, unknown>
  return `{${Object.keys(record).sort()
    .filter((key) => record[key] !== undefined)
    .map((key) => `${JSON.stringify(key)}:${stableFingerprint(record[key])}`)
    .join(',')}}`
}

export function fingerprintAcademicDocuments(documents: StagedAcademicDocuments): string {
  return stableFingerprint(documents)
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function validatePackage(value: unknown): PackageParseResult {
  const errors: string[] = []
  if (!isObject(value)) return { ok: false, package: null, errors: ['Package must be a JSON object.'] }
  if (value.schemaVersion !== 1) errors.push('schemaVersion must be 1.')
  if (!asString(value.id)) errors.push('id is required.')
  if (!asString(value.generatedAt)) errors.push('generatedAt is required.')
  if (!Array.isArray(value.catalogue)) errors.push('catalogue must be an array.')
  if (!isObject(value.moduleSubjects)) errors.push('moduleSubjects must be an object.')
  if (value.assessmentSchemes !== undefined && !isObject(value.assessmentSchemes)) errors.push('assessmentSchemes must be an object when present.')
  if (value.courseCurricula !== undefined && !isObject(value.courseCurricula)) errors.push('courseCurricula must be an object when present.')
  if (value.moduleSchedules !== undefined && !isObject(value.moduleSchedules)) errors.push('moduleSchedules must be an object when present.')
  if (!Array.isArray(value.sourceRefs)) errors.push('sourceRefs must be an array.')
  if (value.conflicts !== undefined && !Array.isArray(value.conflicts)) errors.push('conflicts must be an array when present.')
  if (value.warnings !== undefined && !Array.isArray(value.warnings)) errors.push('warnings must be an array when present.')
  if (errors.length) return { ok: false, package: null, errors }
  return { ok: true, package: value as unknown as AcademicIntakePackage, errors: [] }
}

export function parseAcademicIntakePackage(text: string): PackageParseResult {
  try {
    return validatePackage(JSON.parse(text))
  } catch {
    return { ok: false, package: null, errors: ['File is not valid JSON.'] }
  }
}

export function packageUniversities(pkg: AcademicIntakePackage): Array<{ id: string; label: string; years: UniYear[] }> {
  return pkg.catalogue.map((university) => ({
    id: university.id,
    label: `${university.short || university.id} — ${university.name || university.id}`,
    years: (university.years ?? []).filter((year) => year.id !== 'HU_Y1'),
  }))
}

function selectedPrefix(universityId: string, yearId: string): string {
  return `${universityId}:${yearId}:`
}

function keyIsSelected(key: string, universityId: string, selectedYearIds: readonly string[]): boolean {
  return selectedYearIds.some((yearId) => key.startsWith(selectedPrefix(universityId, yearId)))
}

function mergeSelectedStore<T>(
  current: Record<string, T>,
  incoming: Record<string, T> | undefined,
  universityId: string,
  selectedYearIds: readonly string[],
): Record<string, T> {
  const next: Record<string, T> = { ...(current ?? {}) }
  for (const [key, value] of Object.entries(incoming ?? {})) {
    if (keyIsSelected(key, universityId, selectedYearIds)) next[key] = value
  }
  return next
}

function mergeCatalogue(current: University[], incoming: University, selectedYearIds: readonly string[]): University[] {
  const selectedYears = (incoming.years ?? []).filter((year) => selectedYearIds.includes(year.id) && year.id !== 'HU_Y1')
  const currentUniversity = current.find((university) => university.id === incoming.id)
  const mergedUniversity: University = currentUniversity
    ? {
      ...currentUniversity,
      name: incoming.name || currentUniversity.name,
      short: incoming.short || currentUniversity.short,
      region: incoming.region || currentUniversity.region,
      years: [
        ...(currentUniversity.years ?? []).filter((year) => !selectedYearIds.includes(year.id)),
        ...selectedYears,
      ],
    }
    : { ...incoming, years: selectedYears }
  return current.some((university) => university.id === incoming.id)
    ? current.map((university) => university.id === incoming.id ? mergedUniversity : university)
    : [...current, mergedUniversity]
}

function sourceRefMentionsProtectedYear(ref: AcademicSourceRef): boolean {
  if (ref.universityId === 'hu' && ref.yearId === 'HU_Y1') return true
  const text = `${ref.originalPath ?? ''}\n${ref.currentPath ?? ''}`.toLowerCase()
  return /(?:^|[/\\])helwan[/\\](?:year\s*1|y1)(?:[/\\]|$)/i.test(text)
}

function selectedSourceRefs(pkg: AcademicIntakePackage, universityId: string, selectedYearIds: readonly string[]): AcademicSourceRef[] {
  return pkg.sourceRefs.filter((ref) => (
    ref.universityId === universityId
    && (!ref.yearId || selectedYearIds.includes(ref.yearId))
    && !sourceRefMentionsProtectedYear(ref)
  ))
}

function mergeProvenance(
  current: ProvenanceStore,
  pkg: AcademicIntakePackage,
  universityId: string,
  selectedYearIds: readonly string[],
): ProvenanceStore {
  const refs = selectedSourceRefs(pkg, universityId, selectedYearIds)
  const placementKey = `${pkg.id}:${universityId}:${[...selectedYearIds].sort().join(',')}`
  return {
    ...(current ?? {}),
    [placementKey]: {
      packageId: pkg.id,
      generatedAt: pkg.generatedAt,
      universityId,
      yearIds: selectedYearIds,
      sourceRefs: refs,
      sourceSnapshots: pkg.sourceSnapshots ?? [],
      warnings: pkg.warnings ?? [],
      conflicts: pkg.conflicts ?? [],
    },
  }
}

function packageConflictCount(pkg: AcademicIntakePackage, universityId: string, selectedYearIds: readonly string[]): number {
  return (pkg.conflicts ?? []).filter((value) => {
    if (!isObject(value)) return true
    if (value.status === 'resolved' || value.status === 'quarantined') return false
    if (value.universityId && value.universityId !== universityId) return false
    if (value.yearId && !selectedYearIds.includes(String(value.yearId))) return false
    return true
  }).length
}

function hasDraftEvidence(refs: readonly AcademicSourceRef[]): boolean {
  return refs.some((ref) => ref.evidenceState === 'conflicted')
}

function moduleLabelFromKey(pkg: AcademicIntakePackage, key: string): string {
  const [, yearId, courseId] = key.split(':')
  const university = pkg.catalogue.find((item) => item.years?.some((year) => year.id === yearId))
  const year = university?.years.find((item) => item.id === yearId)
  const course = year?.courses.find((item) => item.id === courseId)
  return course ? `${course.moduleId ?? course.name} · ${course.name}` : key
}

function markRows(pkg: AcademicIntakePackage, universityId: string, selectedYearIds: readonly string[]): MarkReconciliationRow[] {
  return Object.entries(pkg.assessmentSchemes ?? {})
    .filter(([key]) => keyIsSelected(key, universityId, selectedYearIds))
    .map(([key, scheme]) => {
      const reconciliation = reconcileAssessmentScheme(scheme)
      return {
        key,
        moduleLabel: moduleLabelFromKey(pkg, key),
        status: reconciliation.status,
        declaredTotal: formatMarks(reconciliation.declaredTotal),
        componentTotal: formatMarks(reconciliation.componentTotal),
        components: scheme.components.length,
        errors: reconciliation.errors,
      }
    })
    .sort((a, b) => a.key.localeCompare(b.key))
}

function assessmentCanPublish(scheme: AssessmentScheme): boolean {
  const state = String((scheme as AssessmentScheme & { evidenceState?: string }).evidenceState ?? scheme.reconciliationStatus ?? '').toLowerCase()
  return state !== 'conflicted' && state !== 'draft' && reconcileAssessmentScheme(scheme).status !== 'conflicted'
}

function changedKeys(base: Record<string, unknown>, next: Record<string, unknown>): AcademicDocumentKey[] {
  return ACADEMIC_DOCUMENT_KEYS.filter((key) => stableFingerprint(base[key] ?? null) !== stableFingerprint(next[key] ?? null))
}

export function buildStagedAcademicDocuments(
  pkg: AcademicIntakePackage,
  current: CurrentAcademicDocuments,
  universityId: string,
  selectedYearIds: readonly string[],
): StagedIntake {
  const blockingReasons: string[] = []
  if (!selectedYearIds.length) blockingReasons.push('Choose at least one year from the package.')
  if (pkg.metadataOnly) blockingReasons.push('Metadata-only packages are inventory previews and cannot publish.')
  if (universityId === 'hu' && selectedYearIds.includes('HU_Y1')) blockingReasons.push('HU_Y1 is protected and cannot be staged.')
  const unresolvedConflicts = packageConflictCount(pkg, universityId, selectedYearIds)
  if (unresolvedConflicts > 0) blockingReasons.push(`${unresolvedConflicts} package conflict${unresolvedConflicts === 1 ? '' : 's'} must be resolved before publishing.`)

  const incomingUniversity = pkg.catalogue.find((university) => university.id === universityId)
  if (!incomingUniversity) blockingReasons.push(`Package does not contain university ${universityId}.`)

  const selectedRefs = selectedSourceRefs(pkg, universityId, selectedYearIds)
  if (selectedRefs.length !== pkg.sourceRefs.filter((ref) => ref.universityId === universityId && (!ref.yearId || selectedYearIds.includes(ref.yearId))).length) {
    blockingReasons.push('Selected package includes protected Helwan Year 1 source references.')
  }
  if (hasDraftEvidence(selectedRefs)) blockingReasons.push('Conflicted source evidence cannot be published.')

  const markReconciliation = markRows(pkg, universityId, selectedYearIds)
  const conflictedMarks = markReconciliation.filter((row) => row.status === 'conflicted')
  const publishableAssessments = Object.fromEntries(Object.entries(pkg.assessmentSchemes ?? {}).filter(([, scheme]) => assessmentCanPublish(scheme)))
  const stagedWarnings = [
    ...(pkg.warnings ?? []),
    ...(conflictedMarks.length ? [`${conflictedMarks.length} conflicted assessment scheme${conflictedMarks.length === 1 ? ' was' : 's were'} quarantined from live marks.`] : []),
  ]

  const documents: StagedAcademicDocuments = {
    [UNIVERSITY_KEY]: incomingUniversity ? mergeCatalogue(current.universities, incomingUniversity, selectedYearIds) : current.universities,
    [CURRICULA_KEY]: mergeSelectedStore(current.curricula, pkg.courseCurricula, universityId, selectedYearIds),
    [SCHEDULE_KEY]: mergeSelectedStore(current.schedules, pkg.moduleSchedules, universityId, selectedYearIds),
    [SUBJECTS_KEY]: mergeSelectedStore(current.subjects, pkg.moduleSubjects, universityId, selectedYearIds),
    [PROVENANCE_KEY]: mergeProvenance(current.provenance, pkg, universityId, selectedYearIds),
    [ASSESSMENT_SCHEMES_KEY]: mergeSelectedStore(current.assessmentSchemes, publishableAssessments, universityId, selectedYearIds),
  }
  const baseDocs = {
    [UNIVERSITY_KEY]: current.universities,
    [CURRICULA_KEY]: current.curricula,
    [SCHEDULE_KEY]: current.schedules,
    [SUBJECTS_KEY]: current.subjects,
    [PROVENANCE_KEY]: current.provenance,
    [ASSESSMENT_SCHEMES_KEY]: current.assessmentSchemes,
  }

  const selectedSubjectKeys = Object.keys(pkg.moduleSubjects ?? {}).filter((key) => keyIsSelected(key, universityId, selectedYearIds))
  const selectedAssessmentKeys = Object.keys(publishableAssessments).filter((key) => keyIsSelected(key, universityId, selectedYearIds))
  const selectedScheduleKeys = Object.keys(pkg.moduleSchedules ?? {}).filter((key) => keyIsSelected(key, universityId, selectedYearIds))
  const carriedForwardRows = Object.entries(pkg.moduleSchedules ?? {})
    .filter(([key]) => keyIsSelected(key, universityId, selectedYearIds))
    .flatMap(([, rows]) => rows)
    .filter((row) => Boolean(row.carryForward || (row as unknown as Record<string, unknown>).carriedForward)).length

  return {
    documents,
    markReconciliation,
    blockingReasons,
    warnings: stagedWarnings,
    fingerprint: fingerprintAcademicDocuments(documents),
    summary: {
      packageId: pkg.id,
      universityId,
      universityName: incomingUniversity?.name ?? universityId,
      selectedYearIds: [...selectedYearIds],
      sourceFiles: (pkg.sourceSnapshots ?? []).reduce((sum, snapshot) => sum + (typeof snapshot.fileCount === 'number' ? snapshot.fileCount : 0), 0),
      modules: incomingUniversity?.years
        ?.filter((year) => selectedYearIds.includes(year.id))
        .reduce((sum, year) => sum + (year.courses?.length ?? 0), 0) ?? 0,
      subjects: selectedSubjectKeys.reduce((sum, key) => sum + walkSubjects(pkg.moduleSubjects[key] ?? []).length, 0),
      schedules: selectedScheduleKeys.reduce((sum, key) => sum + (pkg.moduleSchedules?.[key]?.length ?? 0), 0),
      assessmentSchemes: selectedAssessmentKeys.length,
      sourceRefs: selectedRefs.length,
      changedKeys: changedKeys(baseDocs, documents as unknown as Record<string, unknown>),
      carriedForwardRows,
    },
  }
}

export function countSubjectTree(subjects: ModuleSubjectStore): number {
  return Object.values(subjects).reduce((sum, tree) => sum + walkSubjects(tree).length, 0)
}

export function countAssessmentSchemes(store: AssessmentSchemeStore): number {
  return Object.keys(store).length
}

export function hasExpectedVersions(preview: ServerPreviewResult | null): boolean {
  return Boolean(preview?.ok && ACADEMIC_DOCUMENT_KEYS.every((key) => Object.hasOwn(preview.versions ?? {}, key)))
}

export function describeLegacyMarkTotals(subjects: ModuleSubjectStore, keys: readonly string[]): Array<{ key: string; total: number }> {
  return keys.map((key) => ({ key, total: moduleTotal(subjects[key] ?? []) }))
}
