/**
 * Which import contract a batch file is written against.
 *
 * Inferred from the columns rather than the filename, so a file cannot be
 * validated against the wrong contract by being misnamed.
 *
 * There were two copies of this, in `validate-content-batch.mjs` and
 * `simulate-content-import.mjs`, and they had already drifted: the validator
 * required `correct_answer` *and* `answer_a`, the simulator accepted either or
 * `vignette`. So the same file could be a question to one tool and unknown to
 * the other. One copy, one answer.
 */

export type BatchKind =
  | 'concept' | 'relation' | 'article' | 'question' | 'practical'
  | 'catalogue-resource' | 'resource' | 'claim' | 'citation' | 'span'
  | 'minigame' | 'unknown'

/**
 * The columns that identify a question, beyond `question` itself.
 *
 * Twelve formats, and only single-best-answer has lettered options. A written,
 * matching, completion or labelling batch carries none of `correct_answer`,
 * `answer_a` or `vignette` — so testing for those alone declared every one of
 * them unrecognised, an entire end-of-year paper included.
 */
const QUESTION_PAYLOADS = [
  'correct_answer', 'answer_a', 'vignette', 'format',
  'written_parts', 'correct_answers', 'completion_text',
  'matching_prompts', 'matching_options', 'labeling_points',
] as const

export function detectBatchKind(sample: Record<string, unknown>): BatchKind {
  const has = (key: string) => key in sample

  if (has('source') && has('type') && has('target')) return 'relation'
  if (has('kind') && has('prompt') && (has('steps') || has('findings'))) return 'minigame'
  if (has('question') && QUESTION_PAYLOADS.some(has)) return 'question'
  if (has('summary') && has('sections')) return 'article'
  if (has('claim_id') && has('resource_id')) return 'citation'
  if (has('concept_id') && has('display_text')) return 'claim'
  if (has('article_id') && has('section_id')) return 'span'
  if (has('source') && has('type')) return 'catalogue-resource'
  if (has('institution') && has('processing_status')) return 'resource'
  if (has('type') && (has('mark_scheme') || has('decisions')
    || has('lab_questions') || has('candidate_instructions'))) return 'practical'
  // A positive test rather than a fallback. Falling back to 'concept' meant any
  // unrecognised row became one; the simulator, which shared this shape, applied
  // a stray question batch as sixteen concept upserts without reporting anything.
  if (has('label') || has('canonical_key')) return 'concept'
  return 'unknown'
}
