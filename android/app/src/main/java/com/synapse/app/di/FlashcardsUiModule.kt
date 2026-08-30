package com.synapse.app.di

import com.synapse.app.feature.flashcards.FlashcardsRepository
import com.synapse.app.feature.flashcards.GradeSink
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

/**
 * Binds [GradeSink] — the narrow seam [com.synapse.app.feature.flashcards.CardRunnerViewModel]
 * depends on — to the real [FlashcardsRepository], the same "one-line adapter in production,
 * plain fake in tests" trick as `di/QBankUiModule.kt`'s [com.synapse.app.feature.qbank.AttemptRecorder] binding.
 */
@Module
@InstallIn(SingletonComponent::class)
object FlashcardsUiModule {

    @Provides
    fun provideGradeSink(repository: FlashcardsRepository): GradeSink =
        GradeSink { deckId, cardId, newSchedule, wasNew, now ->
            repository.updateOwnDecks(now) { decks ->
                val deck = decks[deckId] ?: return@updateOwnDecks decks
                decks + (deckId to deck.copy(schedules = deck.schedules + (cardId to newSchedule)))
            }
            repository.updateDailyCounts(now) { counts ->
                if (wasNew) counts.copy(newSeen = counts.newSeen + 1) else counts.copy(reviewsSeen = counts.reviewsSeen + 1)
            }
        }
}
