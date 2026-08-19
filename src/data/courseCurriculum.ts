/**
 * What a module — now a module subject — has chosen from the library.
 *
 * This lived on `CourseCurriculumDialog`, which meant `src/data` had to import
 * from a component to name the shape it stores. It is a stored document, so it
 * belongs with the other stored documents; the dialog re-exports it, and every
 * existing import site keeps working.
 */

/** Keyed `${universityId}:${yearId}:${courseId}`. */
export const COURSE_CURRICULA_STORAGE_KEY = 'synapse-course-curricula-v1'

export interface CourseCurriculumSelection {
  articleIds: string[]
  questionIds: string[]
  practicalIds: string[]
  /**
   * Library topics this subject covers. Records intent, where the id lists record
   * outcome — so "everything under Valve disease" survives content being added
   * later, and the admin can re-run it rather than re-tick it.
   */
  topicNodeIds?: string[]
  conceptIds?: string[]
  resourceIds?: string[]
}

export const EMPTY_CURRICULUM_SELECTION: CourseCurriculumSelection = {
  articleIds: [], questionIds: [], practicalIds: [], topicNodeIds: [], conceptIds: [], resourceIds: [],
}

/** Everything chosen, across every list — the number the module row shows. */
export function curriculumCount(selection: CourseCurriculumSelection | undefined): number {
  if (!selection) return 0
  return (selection.topicNodeIds?.length ?? 0)
    + selection.articleIds.length
    + selection.questionIds.length
    + selection.practicalIds.length
    + (selection.conceptIds?.length ?? 0)
    + (selection.resourceIds?.length ?? 0)
}
