export interface SubjectPerf {
  subjectId: string
  accuracy: number
  answered: number
}

export interface TypePerf {
  type: string
  accuracy: number
  answered: number
}

export interface LeaderRow {
  rank: number
  code: string
  score: number
  isYou?: boolean
}

export const bySubject: SubjectPerf[] = [
  { subjectId: 'cvs', accuracy: 74, answered: 412 },
  { subjectId: 'gi', accuracy: 72, answered: 268 },
  { subjectId: 'neuro', accuracy: 70, answered: 224 },
  { subjectId: 'resp', accuracy: 68, answered: 301 },
  { subjectId: 'pharm', accuracy: 66, answered: 356 },
  { subjectId: 'msk', accuracy: 63, answered: 142 },
  { subjectId: 'renal', accuracy: 61, answered: 231 },
  { subjectId: 'endo', accuracy: 58, answered: 188 },
]

export const byType: TypePerf[] = [
  { type: 'Clinical vignette', accuracy: 73, answered: 640 },
  { type: 'Single best answer', accuracy: 71, answered: 902 },
  { type: 'Image-based', accuracy: 67, answered: 214 },
  { type: 'Extended matching', accuracy: 64, answered: 268 },
  { type: 'Data interpretation', accuracy: 59, answered: 198 },
]

// Anonymous — no names, only your own position is marked.
export const leaderboard: LeaderRow[] = [
  { rank: 1, code: 'A9K2', score: 91 },
  { rank: 2, code: 'F3M7', score: 89 },
  { rank: 3, code: 'Q8P1', score: 87 },
  { rank: 4, code: 'L2R6', score: 85 },
  { rank: 5, code: 'T7B4', score: 83 },
  { rank: 6, code: 'C1X9', score: 81 },
  { rank: 7, code: 'you', score: 79, isYou: true },
  { rank: 8, code: 'M4D8', score: 78 },
  { rank: 9, code: 'K6S3', score: 76 },
  { rank: 10, code: 'W5N2', score: 75 },
]

export const cohortSize = 214
export const yourPercentile = 88

export const timeManagement = {
  avgSeconds: 78,
  yearMedianSeconds: 65,
  targetSeconds: 90,
  fastestSeconds: 34,
  flaggedPct: 8,
  pacing: [
    { label: 'On pace', pct: 62, tone: 'success' as const },
    { label: 'Rushed', pct: 21, tone: 'warning' as const },
    { label: 'Slow', pct: 17, tone: 'neutral' as const },
  ],
}

export const firstAttempt = bySubject.map((subject, index) => ({
  ...subject,
  yearMedian: [69, 68, 66, 67, 65, 64, 63, 62][index],
  lastFive: [subject.accuracy - 4, subject.accuracy + 2, subject.accuracy - 1, subject.accuracy + 3, subject.accuracy],
}))

export const studyAllocation = [
  { label: 'Question bank', minutes: 410 },
  { label: 'Library', minutes: 285 },
  { label: 'Practical', minutes: 190 },
  { label: 'Lectures', minutes: 360 },
  { label: 'Notebook', minutes: 95 },
  { label: 'Study together', minutes: 80 },
]

export const studyByHour = {
  day: [0, 0, 0, 0, 0, 0, 5, 22, 18, 0, 0, 12, 25, 16, 0, 0, 31, 44, 56, 72, 65, 28, 8, 0],
  week: [0, 0, 0, 0, 0, 3, 18, 38, 42, 28, 21, 36, 48, 51, 32, 29, 46, 64, 78, 96, 88, 57, 22, 5],
  month: [0, 0, 0, 0, 2, 7, 19, 34, 39, 33, 26, 41, 52, 55, 44, 37, 49, 68, 83, 100, 91, 62, 29, 9],
}
