/**
 * Which article teaches which concept.
 *
 * Copied from `scripts/kasr/seeds/articles.ts`, emptied of Kasr's mappings —
 * every entry there points at a Kasr-authored article and would be wrong
 * here. The validator refuses a question whose concept no article covers
 * ("nothing teaches this question's answer"), so this map is how the written
 * and MCQ routes resolve `library_ids` — fill it in as Ain Shams articles are
 * authored.
 *
 * Keyed by concept ID rather than by canonical key, so the mapping breaks
 * loudly if a concept is re-minted rather than silently pointing an article
 * at something it no longer teaches. Concept IDs no longer carry a module or
 * university (see `seeds/types.ts`'s `mintConceptId`), so a concept Ain Shams
 * shares with Kasr resolves through whichever university's map an author
 * filled in first — check `find-existing.mjs` before minting a new article
 * for a concept that already has one.
 */
export const ARTICLE_FOR_CONCEPT: Record<string, string> = {}
