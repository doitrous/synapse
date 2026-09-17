import type { AttemptRecord } from '../data/attempts.ts'

/** The server-bound shape of one verified answer, queued for durable delivery. */
export interface Pending {
  attemptId: string
  sessionId?: string
  questionId: string
  answerIndex: number
  seconds: number | null
  sessionDurationSeconds: number | null
  overtimeSeconds: number | null
  answeredAt: string
}

/**
 * Pure record → server-payload projection: only markable Question Bank answers
 * (a real chosen option) are sent. `correct`/`correctIndex` are deliberately
 * NOT transmitted — the server marks against its own published key. Kept free of
 * app-layer imports so it stays unit-testable.
 */
export function toPendingPayloads(records: AttemptRecord[]): Pending[] {
  return records.flatMap((record) => {
    if (record.surface !== 'qbank' || !Number.isInteger(record.selectedIndex)) return []
    return [{
      attemptId: record.id,
      sessionId: record.sessionId,
      questionId: record.itemId,
      answerIndex: record.selectedIndex as number,
      seconds: record.seconds,
      sessionDurationSeconds: record.sessionDurationSeconds ?? null,
      overtimeSeconds: record.sessionOvertimeSeconds ?? null,
      answeredAt: record.at,
    }]
  })
}
