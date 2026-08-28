import type { ExamMarks } from './moduleSubjects.ts'

export type MarkAmount = number

export type AssessmentComponentKind =
  | 'assignments'
  | 'coursework'
  | 'quiz'
  | 'midterm'
  | 'eom'
  | 'eoy'
  | 'final-written'
  | 'saq'
  | 'mcq'
  | 'case'
  | 'practical'
  | 'ospe'
  | 'osce'
  | 'oral'
  | 'portfolio'
  | 'attendance'
  | 'logbook'
  | 'pass-fail'
  | 'custom'

export type AssessmentReconciliationStatus = 'exact' | 'partial' | 'conflicted'

export interface SubjectMarkAllocation {
  subjectId: string
  marks: MarkAmount
  componentId?: string
  notes?: string
}

export interface AssessmentComponent {
  id: string
  label: string
  kind: AssessmentComponentKind
  marks: MarkAmount
  sitting?: string
  modality?: string
  subjectAllocations?: SubjectMarkAllocation[]
  passRule?: string
}

export interface AssessmentScheme {
  declaredTotal?: MarkAmount
  credits?: number
  passRule?: string
  components: AssessmentComponent[]
  reconciliationStatus?: AssessmentReconciliationStatus
}

export interface AssessmentReconciliation {
  status: AssessmentReconciliationStatus
  declaredTotal: MarkAmount | null
  componentTotal: MarkAmount
  errors: string[]
}

export function markAmount(value: number | string | null | undefined): MarkAmount | null {
  if (value === null || value === undefined || value === '') return null
  const parsed = typeof value === 'number' ? value : Number(value.trim())
  if (!Number.isFinite(parsed) || parsed < 0) return null
  return Math.round(parsed * 100)
}

export function marksToNumber(amount: MarkAmount | null | undefined): number | null {
  if (amount === null || amount === undefined) return null
  return amount / 100
}

export function formatMarks(amount: MarkAmount | null | undefined): string {
  const value = marksToNumber(amount)
  if (value === null) return 'unavailable'
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')
}

export function componentTotal(scheme: Pick<AssessmentScheme, 'components'>): MarkAmount {
  return scheme.components.reduce((sum, component) => sum + component.marks, 0)
}

function allocationsTotal(component: AssessmentComponent): MarkAmount | null {
  if (!component.subjectAllocations?.length) return null
  return component.subjectAllocations.reduce((sum, allocation) => sum + allocation.marks, 0)
}

export function reconcileAssessmentScheme(scheme: AssessmentScheme): AssessmentReconciliation {
  const errors: string[] = []
  const total = componentTotal(scheme)
  for (const component of scheme.components) {
    const allocated = allocationsTotal(component)
    if (allocated !== null && allocated !== component.marks) {
      errors.push(`${component.label || component.id} allocations total ${formatMarks(allocated)} but component is ${formatMarks(component.marks)}.`)
    }
  }
  if (scheme.declaredTotal !== undefined && scheme.declaredTotal !== total && scheme.reconciliationStatus !== 'partial') {
    errors.push(`Declared total is ${formatMarks(scheme.declaredTotal)} but components total ${formatMarks(total)}.`)
  }
  if (errors.length) return { status: 'conflicted', declaredTotal: scheme.declaredTotal ?? null, componentTotal: total, errors }
  if (scheme.reconciliationStatus === 'conflicted') {
    return { status: 'conflicted', declaredTotal: scheme.declaredTotal ?? null, componentTotal: total, errors }
  }
  if (scheme.reconciliationStatus === 'partial') {
    return { status: 'partial', declaredTotal: scheme.declaredTotal ?? null, componentTotal: total, errors }
  }
  if (scheme.declaredTotal === undefined || scheme.components.length === 0) {
    return { status: 'partial', declaredTotal: scheme.declaredTotal ?? null, componentTotal: total, errors }
  }
  return { status: 'exact', declaredTotal: scheme.declaredTotal, componentTotal: total, errors }
}

export function withReconciliationStatus(scheme: AssessmentScheme): AssessmentScheme {
  return { ...scheme, reconciliationStatus: reconcileAssessmentScheme(scheme).status }
}

export function compatibilityExamMarks(scheme: AssessmentScheme): ExamMarks {
  const out: ExamMarks = {
    writtenEndOfModule: 0,
    writtenEndOfYear: 0,
    practicalEndOfModule: 0,
    practicalEndOfYear: 0,
  }
  for (const component of scheme.components) {
    const value = marksToNumber(component.marks) ?? 0
    if (component.kind === 'practical' || component.kind === 'ospe' || component.kind === 'osce' || component.modality === 'clinical') {
      if (/\beom\b|end of module/i.test(`${component.id} ${component.label}`)) out.practicalEndOfModule += value
      else out.practicalEndOfYear += value
    } else if (component.kind === 'eom' || component.kind === 'midterm' || component.kind === 'quiz' || component.kind === 'coursework' || component.kind === 'assignments') {
      out.writtenEndOfModule += value
    } else if (component.kind === 'eoy' || component.kind === 'final-written' || component.kind === 'saq' || component.kind === 'mcq' || component.kind === 'case') {
      out.writtenEndOfYear += value
    }
  }
  return out
}

export function schemeFromLegacyExamMarks(marks: ExamMarks, declaredTotal?: number): AssessmentScheme {
  const entries: Array<[AssessmentComponent['id'], AssessmentComponent['label'], AssessmentComponentKind, number]> = [
    ['written-eom', 'Written end of module', 'eom', marks.writtenEndOfModule],
    ['written-eoy', 'Written end of year', 'eoy', marks.writtenEndOfYear],
    ['practical-eom', 'Practical end of module', 'practical', marks.practicalEndOfModule],
    ['practical-eoy', 'Practical end of year', 'ospe', marks.practicalEndOfYear],
  ]
  const scheme: AssessmentScheme = {
    declaredTotal: markAmount(declaredTotal) ?? undefined,
    components: entries
      .map(([id, label, kind, value]) => ({ id, label, kind, marks: markAmount(value) ?? 0 }))
      .filter((component) => component.marks > 0),
  }
  return withReconciliationStatus(scheme)
}
