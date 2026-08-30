import type { Question } from './qbank.ts'
import { SOURCE_BUCKET_ORDER, bucketOf, sourceBucketLabel, type SourceBucket } from './questionSource.ts'

export interface SourceOption {
  bucket: SourceBucket
  label: string
  /** How many questions of this bucket are in the given set. */
  count: number
}

/**
 * The source buckets present in a question set, in display order, each with its
 * count — powers the builder's source chips. Buckets with no questions are
 * omitted, so the caller can hide the control when fewer than two remain.
 */
export function sourceOptions(questions: readonly Question[]): SourceOption[] {
  const counts = new Map<SourceBucket, number>()
  for (const q of questions) {
    const b = bucketOf(q.source)
    counts.set(b, (counts.get(b) ?? 0) + 1)
  }
  return SOURCE_BUCKET_ORDER
    .filter((b) => counts.has(b))
    .map((b) => ({ bucket: b, label: sourceBucketLabel(b), count: counts.get(b) ?? 0 }))
}

export interface SourceCoverageRow {
  bucket: SourceBucket
  label: string
  questionsAvailable: number
  questionsAnswered: number
  conceptsAvailable: number
  conceptsSeen: number
}

/**
 * Per-source coverage, derived purely from the available question set and the
 * ids the student has answered. "Seen", not "correct": this is a coverage
 * figure — accuracy lives in the mastery ledger. Computed from the questions'
 * current source tag rather than the attempt snapshot, so a re-tagged question
 * moves buckets and legacy attempts (which predate `AttemptRecord.source`)
 * still count.
 */
export function sourceCoverage(
  questions: readonly Question[],
  answeredItemIds: ReadonlySet<string>,
): SourceCoverageRow[] {
  const acc = new Map<SourceBucket, {
    qAvail: number
    qAns: number
    conceptsAvail: Set<string>
    conceptsSeen: Set<string>
  }>()
  for (const q of questions) {
    const bucket = bucketOf(q.source)
    let e = acc.get(bucket)
    if (!e) {
      e = { qAvail: 0, qAns: 0, conceptsAvail: new Set(), conceptsSeen: new Set() }
      acc.set(bucket, e)
    }
    e.qAvail += 1
    const answered = answeredItemIds.has(q.id)
    if (answered) e.qAns += 1
    for (const c of q.conceptIds ?? []) {
      e.conceptsAvail.add(c)
      if (answered) e.conceptsSeen.add(c)
    }
  }
  return SOURCE_BUCKET_ORDER
    .filter((bucket) => acc.has(bucket))
    .map((bucket) => {
      const e = acc.get(bucket)!
      return {
        bucket,
        label: sourceBucketLabel(bucket),
        questionsAvailable: e.qAvail,
        questionsAnswered: e.qAns,
        conceptsAvailable: e.conceptsAvail.size,
        conceptsSeen: e.conceptsSeen.size,
      }
    })
}
