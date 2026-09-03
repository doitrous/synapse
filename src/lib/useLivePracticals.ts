import { useMemo } from 'react'
import { useContentSlice } from './content'
import { API_MODE } from './api'
import { isStudentPublishable, type ManagedContentItem } from '@/data/contentControl'
import { DIFFICULTIES, type Difficulty } from '@/data/qbank'
import {
  osceStations as DEMO_OSCE,
  clinicalCases as DEMO_CASES,
  labImaging as DEMO_LAB,
  type OsceStation,
  type ClinicalCase,
  type LabImagingSet,
} from '@/data/practical'

/**
 * The demo practicals, suppressed the moment a backend is configured.
 *
 * This guard was missing while `useLiveLibrary` and `useLiveResources` both had
 * it, so five demo stations, five demo cases and five demo lab sets reached
 * real students — carrying invented attempt counts, invented best scores, and
 * sign-offs attributed to named clinicians the student had never met.
 */
const SEED_OSCE = API_MODE ? [] : DEMO_OSCE
const SEED_CASES = API_MODE ? [] : DEMO_CASES
const SEED_LAB = API_MODE ? [] : DEMO_LAB

const asDifficulty = (v?: string): Difficulty => (DIFFICULTIES.includes(v as Difficulty) ? v as Difficulty : 'Moderate')

/** How many steps an authored item actually has, rather than a placeholder zero. */
const stepCount = (item: ManagedContentItem): number => {
  const data = item.practicalData
  if (data?.format === 'case') return data.decisions.length
  if (data?.format === 'lab') return data.questions.length
  return 0
}

/**
 * Practical content as students should see it: the catalogue only.
 *
 * These records describe the items — title, subject, duration, marks. What a
 * student has done with them lives in `usePracticalProgress`, keyed by the same
 * ids. The two used to be one shape, which is how a seeded literal came to
 * assert that everyone had attempted the cardiovascular station twice and
 * scored 78%.
 */
export function useLivePracticals() {
  const [ledger] = useContentSlice('practical')

  return useMemo(() => {
    const items = ledger.filter((i) => i.kind === 'practical')
    const byId = new Map(items.map((i) => [i.id, i]))
    const archived = (id: string) => {
      const item = byId.get(id)
      return item?.status === 'Archived' || (item?.status === 'Published' && !isStudentPublishable(item))
    }
    const seededIds = new Set([...SEED_OSCE, ...SEED_CASES, ...SEED_LAB].map((x) => x.id))

    const osceStations: OsceStation[] = SEED_OSCE.filter((s) => !archived(s.id)).map((s) => {
      const it = byId.get(s.id)
      if (!it) return s
      return { ...s, title: it.title?.trim() || s.title, subjectId: it.subjectId || s.subjectId, minutes: Number(it.fields.Duration) || s.minutes, marks: Number(it.fields.Marks) || s.marks, difficulty: asDifficulty(it.fields.Difficulty) }
    })

    const clinicalCases: ClinicalCase[] = SEED_CASES.filter((c) => !archived(c.id)).map((c) => {
      const it = byId.get(c.id)
      if (!it) return c
      return { ...c, title: it.title?.trim() || c.title, subjectId: it.subjectId || c.subjectId, minutes: Number(it.fields.Duration) || c.minutes }
    })

    const labImaging: LabImagingSet[] = SEED_LAB.filter((l) => !archived(l.id)).map((l) => {
      const it = byId.get(l.id)
      if (!it) return l
      const isImaging = it.fields.Type === 'Imaging interpretation' || it.fields['Lab subtype'] === 'Imaging'
      return { ...l, title: it.title?.trim() || l.title, subjectId: it.subjectId || l.subjectId, type: isImaging ? 'Imaging' : l.type }
    })

    // Admin-created (published) practicals with no seed → appended by their type.
    items
      .filter((i) => !seededIds.has(i.id) && isStudentPublishable(i))
      .forEach((i) => {
        const type = i.fields.Type
        // A checklist runs through the station runner with no actor, so it joins
        // the same list rather than having nowhere to appear.
        if (type === 'OSCE station' || type === 'Skills checklist') osceStations.push({ id: i.id, title: i.title, subjectId: i.subjectId, minutes: Number(i.fields.Duration) || 8, difficulty: asDifficulty(i.fields.Difficulty), marks: Number(i.fields.Marks) || 20, kind: type === 'Skills checklist' ? 'checklist' : 'station' })
        else if (type === 'Clinical case') clinicalCases.push({ id: i.id, title: i.title, presentation: i.fields.Vignette || '', subjectId: i.subjectId, minutes: Number(i.fields.Duration) || 12, steps: stepCount(i) })
        else if (type === 'Lab interpretation' || type === 'Imaging interpretation') labImaging.push({ id: i.id, title: i.title, type: type === 'Imaging interpretation' ? 'Imaging' : 'Lab', subjectId: i.subjectId, items: stepCount(i) })
      })

    return { osceStations, clinicalCases, labImaging }
  }, [ledger])
}
