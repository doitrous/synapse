package com.synapse.app.core.taxonomy

/**
 * The bilingual medical glossary a student browses for vocabulary building:
 * a term, its Arabic translation, and a plain-language explanation in both
 * languages. Ported from `src/data/glossary.ts`'s `MedicalTerm`/`GlossaryDoc`
 * (`synapse-medical-glossary-v1`) and iOS `GlossaryView.Term`.
 *
 * Pure — no Android framework, no storage — for the same reason
 * `core/library/Library.kt` is: a search/grouping rule that reads its own
 * store can only be asserted against itself.
 */

/** One glossary entry. [example] is optional, matching the web's `MedicalTerm.example?`. */
data class TaxonomyTerm(
    val id: String,
    val term: String,
    val arabic: String,
    val category: String,
    val definition: String,
    val definitionAr: String,
    val example: String?,
)

/** A category heading, bilingual — `MED_CATEGORIES` on web. */
data class TaxonomyCategory(val key: String, val arabic: String)

/** The whole published document, as projected off the catalogue. */
data class TaxonomyCatalogue(
    val categories: List<TaxonomyCategory>,
    val terms: List<TaxonomyTerm>,
)

/** [categories], each paired with the (search-filtered) terms filed under it. */
data class TaxonomyGroup(val category: TaxonomyCategory, val terms: List<TaxonomyTerm>)

/**
 * Group [terms] by [categories], in the document's own category order.
 *
 * Matches the web's `groups` computation in `MedicalTaxonomy.tsx`: a term
 * whose `category` does not match any published category key is not shown
 * under any heading (the same as web, where the group filter is keyed off
 * `MED_CATEGORIES`) — in practice this never happens, since categories and
 * terms are published together. A category with no matching terms (e.g. every
 * term in it was filtered out by search) is omitted, keeping empty sections
 * off the screen.
 */
fun groupByCategory(categories: List<TaxonomyCategory>, terms: List<TaxonomyTerm>): List<TaxonomyGroup> =
    categories
        .map { category -> TaxonomyGroup(category, terms.filter { it.category == category.key }) }
        .filter { it.terms.isNotEmpty() }

/**
 * Terms matching [query] against term, Arabic translation, and both
 * definitions — a case-insensitive substring search, matching the web's
 * `filtered` computation (`` `${term.term} ${term.ar} ${term.def} ${term.defAr}`.toLowerCase().includes(q) ``).
 * A blank query (after trimming) returns every term.
 */
fun searchTerms(terms: List<TaxonomyTerm>, query: String): List<TaxonomyTerm> {
    val trimmed = query.trim()
    if (trimmed.isEmpty()) return terms
    val needle = trimmed.lowercase()
    return terms.filter { term ->
        "${term.term} ${term.arabic} ${term.definition} ${term.definitionAr}".lowercase().contains(needle)
    }
}
