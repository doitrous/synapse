import type {
  HeatCell,
  PlanBlock,
  Progress,
  ResourceRef,
  ReviewItem,
  Session,
  Subject,
} from './types'

/* ---- Subjects (organ-system + discipline, undergraduate) --------------- */

export const subjects: Subject[] = [
  { id: 'cvs', name: 'Cardiovascular', short: 'CVS', color: '#a8462f' },
  { id: 'resp', name: 'Respiratory', short: 'RESP', color: '#3f6f7a' },
  { id: 'renal', name: 'Renal & Urinary', short: 'RENAL', color: '#6f5788' },
  { id: 'gi', name: 'Gastrointestinal', short: 'GI', color: '#a07b34' },
  { id: 'neuro', name: 'Neurology', short: 'NEURO', color: '#5b7a4a' },
  { id: 'endo', name: 'Endocrine', short: 'ENDO', color: '#9c5f7e' },
  { id: 'msk', name: 'Musculoskeletal', short: 'MSK', color: '#877258' },
  { id: 'pharm', name: 'Pharmacology', short: 'PHARM', color: '#c06a3f' },
]

export const subjectsById: Record<string, Subject> = Object.fromEntries(
  subjects.map((s) => [s.id, s]),
)

export function getSubject(id: string): Subject {
  return subjectsById[id] ?? { id, name: id, short: id.toUpperCase(), color: '#8a938f' }
}

/* ---- Date helpers ------------------------------------------------------ */

function at(hour: number, minute: number, dayOffset = 0): Date {
  const d = new Date()
  d.setDate(d.getDate() + dayOffset)
  d.setHours(hour, minute, 0, 0)
  return d
}

/* ---- University schedule (today) --------------------------------------- */

export const todaySessions: Session[] = [
  {
    id: 's1',
    title: 'Heart failure: pathophysiology & staging',
    subjectId: 'cvs',
    kind: 'Lecture',
    start: at(9, 0),
    end: at(10, 0),
    location: 'Lecture Theatre B',
  },
  {
    id: 's2',
    title: 'ECG interpretation workshop',
    subjectId: 'cvs',
    kind: 'Seminar',
    start: at(11, 0),
    end: at(12, 30),
    location: 'Seminar Room 4',
  },
  {
    id: 's3',
    title: 'Diuretics & RAAS antagonists',
    subjectId: 'pharm',
    kind: 'Lecture',
    start: at(14, 0),
    end: at(15, 0),
    location: 'Online · recorded',
    online: true,
  },
  {
    id: 's4',
    title: 'Cardiovascular examination — OSCE prep',
    subjectId: 'cvs',
    kind: 'Lab',
    start: at(16, 30),
    end: at(18, 0),
    location: 'Clinical Skills Lab 2',
  },
]

/** The next session that has not yet started (falls back to the first). */
export const nextSession: Session =
  todaySessions.find((s) => s.start.getTime() > Date.now()) ?? todaySessions[0]

/* ---- Due reviews (spaced repetition) ----------------------------------- */

export const dueReviews: ReviewItem[] = [
  { id: 'r1', topic: 'Acute coronary syndromes', subjectId: 'cvs', kind: 'Questions', count: 24, dueInDays: -1, retention: 44 },
  { id: 'r2', topic: 'Diuretics: sites of action', subjectId: 'pharm', kind: 'Cards', count: 60, dueInDays: 0, retention: 55 },
  { id: 'r3', topic: 'Acid–base disturbances', subjectId: 'renal', kind: 'Cards', count: 34, dueInDays: 0, retention: 61 },
  { id: 'r4', topic: 'Cranial nerve lesions', subjectId: 'neuro', kind: 'Questions', count: 18, dueInDays: 1, retention: 71 },
  { id: 'r5', topic: 'Liver function tests', subjectId: 'gi', kind: 'Cards', count: 22, dueInDays: 2, retention: 76 },
]

/* ---- Today's personal study plan --------------------------------------- */

export const todaysPlan: PlanBlock[] = [
  { id: 'p1', time: '07:30', title: 'Cardiology cards due', subjectId: 'cvs', kind: 'Review', minutes: 25, done: true },
  { id: 'p2', time: '09:00', title: 'Heart failure — Library reading', subjectId: 'cvs', kind: 'Read', minutes: 40, done: true },
  { id: 'p3', time: '13:00', title: '20 questions · Cardiovascular', subjectId: 'cvs', kind: 'Qbank', minutes: 30, done: false },
  { id: 'p4', time: '16:30', title: 'OSCE: Cardiovascular examination', subjectId: 'cvs', kind: 'Practical', minutes: 45, done: false },
  { id: 'p5', time: '19:30', title: 'Pharmacology cards · diuretics', subjectId: 'pharm', kind: 'Review', minutes: 20, done: false },
]

/* ---- Last used resources ----------------------------------------------- */

export const lastUsedResources: ResourceRef[] = [
  { id: 'x1', title: "Kumar & Clark's Clinical Medicine", type: 'Book', subjectId: 'cvs', meta: 'p. 412 · Heart failure', openedLabel: '2h ago' },
  { id: 'x2', title: 'Heart failure: compensatory mechanisms', type: 'Video', subjectId: 'cvs', meta: '12 min', openedLabel: '5h ago' },
  { id: 'x3', title: 'NICE NG106 · Chronic heart failure', type: 'Guideline', subjectId: 'cvs', meta: 'Guideline', openedLabel: 'Yesterday' },
  { id: 'x4', title: 'Diuretics & the nephron', type: 'Deck', subjectId: 'pharm', meta: '38 slides', openedLabel: 'Yesterday' },
  { id: 'x5', title: 'Cranial nerves — high-yield notes', type: 'Article', subjectId: 'neuro', meta: '8 min read', openedLabel: '2 days ago' },
]

/* ---- Headline progress ------------------------------------------------- */

export const progress: Progress = {
  examReadiness: 68,
  examLabel: 'Cardiovascular block · Written + OSCE',
  daysToExam: 38,
  qbankAnswered: 1842,
  qbankTotal: 3200,
  practicalSigned: 14,
  practicalTotal: 22,
}

/* ---- Study heatmap (deterministic, last 17 weeks) ---------------------- */

function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), a | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildHeatmap(): HeatCell[] {
  const rnd = mulberry32(20260731)
  const cells: HeatCell[] = []
  const total = 17 * 7
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = total - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const day = date.getDay()
    const weekend = day === 0 || day === 6
    const recency = 1 - i / total // gentle ramp toward exam season
    const roll = rnd()

    let minutes = 0
    if (roll > (weekend ? 0.45 : 0.12)) {
      const base = weekend ? 70 : 150
      minutes = Math.round((base * (0.45 + rnd() * 0.9) + recency * 60) / 5) * 5
      minutes = Math.min(minutes, 300)
    }
    cells.push({ date, minutes })
  }
  return cells
}

export const studyHeatmap: HeatCell[] = buildHeatmap()
