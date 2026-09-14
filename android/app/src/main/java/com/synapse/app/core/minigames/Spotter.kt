package com.synapse.app.core.minigames

import com.synapse.app.core.taxonomy.TaxonomyTerm

/**
 * Spotter, re-targeted at the medical glossary.
 *
 * Web's Spotter (`src/data/spotter.ts`) pins an unnamed structure on a live
 * histology slide and asks the student to name it from four options, drawing
 * on `useLiveHistology`. Android has no offline-synced histology slide media
 * (see the deferral note on `feature/minigames/MinigamesRepository.kt`), so
 * rather than fabricate histology content this port keeps the same *round*
 * shape web uses — the correct answer plus same-category-first shuffled
 * distractors, seed-deterministic — but "pins" a glossary term's definition
 * instead of a slide structure: the student reads the definition and spots
 * the term it names. No facts are generated; every prompt and option comes
 * straight from the published glossary.
 *
 * Pure module: no Android framework, no storage, no clock.
 */

enum class SpotterRefusal { TOO_FEW_TERMS }

data class SpotterRound(
    val termId: String,
    /** The definition "pinned" for this round — the term itself is what the student spots. */
    val prompt: String,
    val category: String,
    /** The correct term plus distractors, already shuffled. */
    val options: List<String>,
    val answer: String,
)

data class SpotterGame(val rounds: List<SpotterRound>, val refusal: SpotterRefusal?)

const val SPOTTER_ROUNDS = 8
const val SPOTTER_OPTIONS_PER_ROUND = 4

/** Need at least this many distinctly named terms to fill one round's options. */
const val SPOTTER_MIN_TERMS = SPOTTER_OPTIONS_PER_ROUND

/**
 * Distractor term names for one round, same-category first — mirrors web's
 * `distractorsFor` (same-subject-first) over categories instead of subjects.
 */
private fun distractorsFor(answer: TaxonomyTerm, terms: List<TaxonomyTerm>, random: () -> Double): List<String> {
    val sameCategory = LinkedHashSet<String>()
    val otherCategory = LinkedHashSet<String>()
    for (term in terms) {
        if (term.term == answer.term) continue
        if (term.category == answer.category) sameCategory += term.term else otherCategory += term.term
    }

    val needed = SPOTTER_OPTIONS_PER_ROUND - 1
    val fromSameCategory = shuffle(sameCategory.toList(), random).take(needed)
    if (fromSameCategory.size >= needed) return fromSameCategory

    val stillNeeded = needed - fromSameCategory.size
    val fromElsewhere = shuffle(otherCategory.toList(), random).take(stillNeeded)
    return fromSameCategory + fromElsewhere
}

/**
 * Build the game.
 *
 * @param terms the published glossary terms a round may be asked from
 * @param seed the seed carried in a shared link; the whole game follows from it
 * @param rounds ceiling on how many rounds the game holds. Fewer askable terms than this shortens the game rather than repeating one.
 */
fun buildSpotterGame(terms: List<TaxonomyTerm>, seed: Int, rounds: Int = SPOTTER_ROUNDS): SpotterGame {
    // Only a term with a definition can be "pinned" as a prompt.
    val askable = terms.filter { it.definition.isNotBlank() }
    val distinctNames = askable.map { it.term }.toSet()
    // Below the floor, every round would either repeat an option or hand back
    // fewer than SPOTTER_OPTIONS_PER_ROUND choices — refuse rather than thin
    // the options into something that reads as broken.
    if (distinctNames.size < SPOTTER_MIN_TERMS) return SpotterGame(emptyList(), SpotterRefusal.TOO_FEW_TERMS)

    val random = seededRandom(seed)
    val order = shuffle(askable, random)

    val built = mutableListOf<SpotterRound>()
    for (candidate in order) {
        if (built.size >= rounds) break
        val distractors = distractorsFor(candidate, askable, random)
        // Not enough distinctly named peers to fill this particular round's
        // options — skip it rather than under-fill.
        if (distractors.size < SPOTTER_OPTIONS_PER_ROUND - 1) continue
        val options = shuffle(listOf(candidate.term) + distractors, random)
        built += SpotterRound(
            termId = candidate.id,
            prompt = candidate.definition,
            category = candidate.category,
            options = options,
            answer = candidate.term,
        )
    }

    return SpotterGame(built, refusal = null)
}
