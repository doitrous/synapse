/**
 * The student's own notes.
 *
 * Seeded with five clinical notes — "Heart failure — the compensation trap",
 * "Four pillars of HFrEF" — which were written into every account the moment it
 * opened the notebook, and carried frozen relative timestamps ("2 days ago")
 * that never aged because they were strings, not times. Both are gone: a
 * notebook starts empty, and `updatedAt` is a real ISO timestamp.
 */
export interface Note {
  id: string
  title: string
  body: string
  tags: string[]
  subtopicId?: string
  subtopicTitle?: string
  subjectId?: string
  imageData?: string
  /** ISO timestamp of the last edit. */
  updatedAt: string
}

export const initialNotes: Note[] = []
