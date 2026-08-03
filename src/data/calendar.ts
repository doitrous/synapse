import { getSubject } from './student'

export type Layer = 'curriculum' | 'personal'

export interface CalEvent {
  id: string
  title: string
  date: Date
  time: string
  layer: Layer
  subjectId: string
  kind: string
}

const CYCLE = ['cvs', 'resp', 'renal', 'neuro', 'pharm', 'gi', 'endo', 'msk']

/** Deterministic, plausible schedule for any month — so navigation always
 *  shows a full calendar. Curriculum and personal are distinct layers. */
export function monthEvents(year: number, month: number): CalEvent[] {
  const events: CalEvent[] = []
  const days = new Date(year, month + 1, 0).getDate()

  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d)
    const dow = date.getDay()
    const subj = CYCLE[(d + month) % CYCLE.length]
    const subj2 = CYCLE[(d + month + 3) % CYCLE.length]
    const key = `${year}-${month}-${d}`

    // Curriculum layer (university timetable)
    if (dow === 1)
      events.push({ id: `c1-${key}`, title: `Lecture: ${getSubject(subj).name}`, date, time: '09:00', layer: 'curriculum', subjectId: subj, kind: 'Lecture' })
    if (dow === 2)
      events.push({ id: `c2-${key}`, title: `Seminar: ${getSubject(subj2).name}`, date, time: '11:00', layer: 'curriculum', subjectId: subj2, kind: 'Seminar' })
    if (dow === 4)
      events.push({ id: `c4-${key}`, title: `Lab: ${getSubject(subj).name}`, date, time: '14:00', layer: 'curriculum', subjectId: subj, kind: 'Lab' })

    // Personal layer (self-directed study plan)
    if (d % 2 === 0)
      events.push({ id: `p1-${key}`, title: `Review: ${getSubject(subj).short} cards`, date, time: '19:30', layer: 'personal', subjectId: subj, kind: 'Review' })
    if (d % 5 === 0)
      events.push({ id: `p2-${key}`, title: `20 questions · ${getSubject(subj2).short}`, date, time: '13:00', layer: 'personal', subjectId: subj2, kind: 'Qbank' })
    if (d % 7 === 3)
      events.push({ id: `p3-${key}`, title: `Read: ${getSubject(subj).name}`, date, time: '16:00', layer: 'personal', subjectId: subj, kind: 'Read' })
  }

  // A mid-month assessment on the third Thursday
  const thirdThu = [...Array(days).keys()]
    .map((i) => new Date(year, month, i + 1))
    .filter((dt) => dt.getDay() === 4)[2]
  if (thirdThu)
    events.push({
      id: `assess-${year}-${month}`,
      title: 'Formative assessment: Cardiovascular',
      date: thirdThu,
      time: '10:00',
      layer: 'curriculum',
      subjectId: 'cvs',
      kind: 'Assessment',
    })

  return events
}
