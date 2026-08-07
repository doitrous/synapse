import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import {
  osceStations as SEED_OSCE,
  clinicalCases as SEED_CASES,
  labImaging as SEED_LAB,
  type OsceStation,
  type ClinicalCase,
  type LabImagingSet,
} from '@/data/practical'

const asDifficulty = (v?: string): OsceStation['difficulty'] => (v === 'Easy' || v === 'Hard' ? v : 'Moderate')

/**
 * Practical content as students should see it: seeded stations/cases/lab sets
 * with admin edits from the content ledger overlaid, plus any items created in
 * Practical Setup. Per-student progress (attempts, scores, done) is preserved;
 * archived items are hidden. Skills sign-off and oral questions are personal and
 * stay as-is.
 */
export function useLivePracticals() {
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)

  return useMemo(() => {
    const items = ledger.filter((i) => i.kind === 'practical')
    const byId = new Map(items.map((i) => [i.id, i]))
    const archived = (id: string) => byId.get(id)?.status === 'Archived'
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
      .filter((i) => !seededIds.has(i.id) && i.status === 'Published')
      .forEach((i) => {
        const type = i.fields.Type
        if (type === 'OSCE station') osceStations.push({ id: i.id, title: i.title, subjectId: i.subjectId, minutes: Number(i.fields.Duration) || 8, difficulty: asDifficulty(i.fields.Difficulty), marks: Number(i.fields.Marks) || 20, attempts: 0 })
        else if (type === 'Clinical case') clinicalCases.push({ id: i.id, title: i.title, presentation: i.fields.Vignette || '', subjectId: i.subjectId, minutes: Number(i.fields.Duration) || 12, steps: 0, status: 'not-started' })
        else if (type === 'Lab interpretation' || type === 'Imaging interpretation') labImaging.push({ id: i.id, title: i.title, type: type === 'Imaging interpretation' ? 'Imaging' : 'Lab', subjectId: i.subjectId, items: 0, done: 0 })
      })

    return { osceStations, clinicalCases, labImaging }
  }, [ledger])
}
