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
  /**
   * Documents this note is about — a Synapse resource, or a PDF the student
   * uploaded themselves. Optional and additive, so every note written before
   * this existed is still a valid note.
   *
   * `resourceId` is a reader route id, which means an upload is stored as
   * `my:<id>`; one field addresses both kinds because the reader does.
   */
  resourceRefs?: NoteResourceRef[]
  /** ISO timestamp of the last edit. */
  updatedAt: string
}

export interface NoteResourceRef {
  resourceId: string
  /** The page the student was on, when they were on one. */
  page?: number
  /** Kept alongside the id so a chip still reads if the item is withdrawn. */
  label: string
}

export const initialNotes: Note[] = []
