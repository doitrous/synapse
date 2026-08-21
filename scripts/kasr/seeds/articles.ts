/**
 * Which article teaches which concept.
 *
 * The validator refuses a question whose concept no article covers — "nothing
 * teaches this question's answer" — and it is right to: a question a student
 * gets wrong with nowhere to go and read is a dead end.
 *
 * Keyed by concept ID rather than by canonical key so the mapping breaks loudly
 * if a concept is re-minted, rather than silently pointing an article at
 * something it no longer teaches.
 */
export const ARTICLE_FOR_CONCEPT: Record<string, string> = {}
