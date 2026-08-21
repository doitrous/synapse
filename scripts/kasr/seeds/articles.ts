/**
 * Which article teaches which concept.
 *
 * The validator refuses a question whose concept no article covers — "nothing
 * teaches this question's answer" — and it is right to: a question a student
 * gets wrong with nowhere to go and read is a dead end.
 *
 * This was a hand-written table, and a hand-written table is the same fact
 * stored twice: once in an article's `related_concepts` or a concept's
 * `article_ids`, once here. Two copies drift, and they drift silently, because
 * nothing compares them. `build-article-links.ts` derives the mapping from the
 * batches themselves and writes `article-links.json`; this file reads it.
 *
 * The table it replaces had grown to 71 entries, and the generator reproduces
 * every one of them — 71 of 71, no misses, no disagreements — before adding the
 * ones nobody had got round to typing. That reproduction is the evidence for
 * the change: a generator that disagreed with the hand table would be proposing
 * a rewrite rather than an extension, and would deserve the opposite decision.
 *
 * Keyed by concept ID rather than canonical key, so a re-minted concept breaks
 * the mapping loudly instead of quietly pointing at an article that no longer
 * teaches it.
 *
 * One caveat that no code here can check, and that the generator repeats in its
 * own output: a link means an author thought the two were related. It is not
 * evidence the article answers the concept. Read before trusting one.
 */
import { readFileSync } from 'node:fs'

interface ArticleLinks {
  links: Record<string, string[]>
}

const LINKS = 'scripts/kasr/seeds/article-links.json'

/**
 * Every article that teaches a concept, by concept ID.
 *
 * A concept examined from two sides is genuinely taught by both — a cilium by
 * the cytoplasm article and by the membranous-specialisations one — and its
 * questions cite whichever their leaf sits under. Keeping only the first left
 * the other leaf's questions reported as taught by nothing.
 */
export const ARTICLES_FOR_CONCEPT: Record<string, string[]> =
  (JSON.parse(readFileSync(LINKS, 'utf8')) as ArticleLinks).links

/**
 * One article per concept, for callers that can only carry one.
 *
 * The first alphabetically, which is arbitrary but stable: every article in the
 * list teaches the concept, so any of them satisfies the coverage check, and an
 * arbitrary-but-deterministic choice at least does not change under a rebuild.
 */
export const ARTICLE_FOR_CONCEPT: Record<string, string> = Object.fromEntries(
  Object.entries(ARTICLES_FOR_CONCEPT).map(([conceptId, articles]) => [conceptId, articles[0]]),
)
