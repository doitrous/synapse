/**
 * The MCQ source a student can filter a test by — deliberately a small, clean
 * three-value vocabulary shown to students, distinct from the admin free-text
 * provenance (`ContentSource`) and the academic-intake evidence taxonomy
 * (`AcademicSourceCategory`), neither of which is student-facing.
 */
export type QuestionSource = 'dept-mcq' | 'dept-book' | 'past-paper'

export const QUESTION_SOURCES: readonly QuestionSource[] = ['dept-mcq', 'dept-book', 'past-paper'] as const

export const QUESTION_SOURCE_LABEL: Record<QuestionSource, string> = {
  'dept-mcq': 'Department MCQs',
  'dept-book': 'Department Book',
  'past-paper': 'Past Papers',
}

/** The bucket a question falls in once untagged questions are given a home. */
export const UNSPECIFIED_SOURCE = 'unspecified' as const
export type SourceBucket = QuestionSource | typeof UNSPECIFIED_SOURCE

export const UNSPECIFIED_SOURCE_LABEL = 'Unspecified'

/** Display order: the three real sources, then untagged last. */
export const SOURCE_BUCKET_ORDER: readonly SourceBucket[] = [...QUESTION_SOURCES, UNSPECIFIED_SOURCE]

/** An absent source is a first-class, expected state during rollout, not an error. */
export function bucketOf(source: QuestionSource | undefined): SourceBucket {
  return source ?? UNSPECIFIED_SOURCE
}

export function sourceBucketLabel(bucket: SourceBucket): string {
  return bucket === UNSPECIFIED_SOURCE ? UNSPECIFIED_SOURCE_LABEL : QUESTION_SOURCE_LABEL[bucket]
}
