import type { AcademicSourceRef } from './academicSource.ts'

export const HELWAN_YEAR_1_ID = 'HU_Y1'

export interface AcademicMutationTarget {
  universityId?: string
  yearId?: string
  moduleId?: string
  sourcePath?: string
  contentIds?: string[]
}

export interface AcademicProtectionCheck {
  ok: boolean
  violations: string[]
}

function pathSegments(value: string): string[] {
  return value
    .split(/[/\\]+/)
    .map((segment) => segment.trim().toLowerCase())
    .filter(Boolean)
}

function isHelwanSegment(segment: string): boolean {
  return /(?:^|\s)helwan(?:\s+uni(?:versity)?)?$/.test(segment.replace(/^\d+(?:\.\d+)?\s*/, ''))
}

function isYearOneSegment(segment: string): boolean {
  return segment === 'hu_y1' || segment === 'y1' || /^year\s*0?1$/.test(segment)
}

export function isProtectedHelwanYearOnePath(sourcePath: string): boolean {
  const segments = pathSegments(sourcePath)
  const helwanIndex = segments.findIndex(isHelwanSegment)
  if (helwanIndex < 0) return false
  return segments.slice(helwanIndex + 1).some(isYearOneSegment)
}

export function isHelwanYearOneTarget(target: AcademicMutationTarget): boolean {
  if (target.yearId === HELWAN_YEAR_1_ID) return true
  if (target.universityId?.toLowerCase() === 'hu' && target.yearId?.toUpperCase().includes('Y1')) return true
  if (target.moduleId?.toUpperCase().startsWith('HU_Y1')) return true
  if (target.sourcePath && isProtectedHelwanYearOnePath(target.sourcePath)) return true
  return (target.contentIds ?? []).some((id) => id.toUpperCase().includes('HU_Y1'))
}

export function assertNoProtectedAcademicTargets(targets: readonly AcademicMutationTarget[]): AcademicProtectionCheck {
  const violations = targets
    .filter(isHelwanYearOneTarget)
    .map((target) => target.sourcePath ?? target.moduleId ?? target.yearId ?? target.contentIds?.join(',') ?? 'unknown target')
  return { ok: violations.length === 0, violations }
}

export function assertNoProtectedSourceRefs(refs: readonly AcademicSourceRef[]): AcademicProtectionCheck {
  return assertNoProtectedAcademicTargets(refs.map((ref) => ({
    universityId: ref.universityId,
    yearId: ref.yearId,
    sourcePath: ref.currentPath ?? ref.originalPath,
  })))
}
