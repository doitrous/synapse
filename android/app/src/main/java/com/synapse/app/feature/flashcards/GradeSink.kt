package com.synapse.app.feature.flashcards

import com.synapse.app.core.flashcards.CardSchedule
import java.time.Instant

/**
 * The narrow slice of [FlashcardsRepository] that [CardRunnerViewModel] needs to persist one
 * graded card: the card's freshly [grade][com.synapse.app.core.flashcards.grade]-updated
 * [CardSchedule], and the day's bumped new/review count ([wasNew] selects which counter).
 *
 * Mirrors [com.synapse.app.feature.qbank.AttemptRecorder] — the same "narrow seam over a
 * heavy-constructor repository" trick that keeps [CardRunnerViewModel] unit-testable with a
 * plain fake, while production wires it to [FlashcardsRepository] via
 * `di/FlashcardsUiModule.kt`.
 */
fun interface GradeSink {
    suspend fun persist(deckId: String, cardId: String, newSchedule: CardSchedule, wasNew: Boolean, now: Instant)
}
