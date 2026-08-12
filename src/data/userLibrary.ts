/**
 * Student-authored library articles and personal tagging.
 *
 * These live entirely in the student's own local storage — a student can create
 * an article organised into named clinical sections (Definition, Incidence,
 * Pathophysiology, …), attach personal tags to it, and reuse those tags across
 * other articles. University tags are NOT settable here — those are governed by
 * the admin dashboard only.
 */

export interface ArticleSection {
  id: string
  /** Section heading, e.g. "Definition", "Pathophysiology". Fully editable. */
  heading: string
  /** Free-text body for the section. */
  body: string
  /**
   * Reviewed narrative prose for the student projection. `body` remains the admin
   * draft: the reader shows `narrative` when it exists so an article reads as an
   * article, and its verified facts move to the Sources section at the end.
   */
  narrative?: string
  /**
   * `components` marks the generated concepts-and-relations listing. It is no
   * longer produced or shown to students; the tag remains only so existing
   * records can be recognised and filtered out.
   */
  kind?: 'content' | 'components'
  /**
   * Explicit ordering hint for the evidence spans inside this section.
   *
   * Membership is *not* read from here: a span records its own `articleId` and
   * `sectionId`, and `sectionSpans` derives the section's spans from those. This
   * list only pins the order of the spans it names, which matters because spans
   * are imported after the article and so could not name each other at
   * authoring time anyway.
   */
  spanIds?: string[]
}

export interface UserArticle {
  id: string
  title: string
  subjectId: string
  /** Optional summary shown at the top of the reader. */
  summary: string
  sections: ArticleSection[]
  /** Personal tags the student attached (reusable and searchable). */
  tags: string[]
  createdAt: string
  updatedAt: string
}

export const USER_ARTICLES_KEY = 'synapse.library.userArticles'
/** Map of articleId → personal tags, covering built-in articles too. */
export const PERSONAL_TAGS_KEY = 'synapse.library.personalTags'

/** The default clinical section scaffold offered when authoring a new article. */
export const DEFAULT_SECTION_HEADINGS = [
  'Definition',
  'Incidence',
  'Pathophysiology',
  'Pathology',
  'Clinical Picture',
  'Investigation',
  'Treatment',
]

let seq = 0
export function newId(prefix = 'ua'): string {
  seq += 1
  return `${prefix}-${Date.now().toString(36)}-${seq}`
}

export function emptySections(): ArticleSection[] {
  return DEFAULT_SECTION_HEADINGS.map((heading) => ({ id: newId('sec'), heading, body: '' }))
}
