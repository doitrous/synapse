package com.synapse.app.di

import com.synapse.app.feature.qbank.AttemptRecorder
import com.synapse.app.feature.qbank.QBankOfflineStore
import com.synapse.app.feature.qbank.QBankRepository
import com.synapse.app.feature.qbank.QBankRepositoryOfflineStore
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

/**
 * Binds the narrow seams `feature/qbank` view models depend on
 * ([AttemptRecorder], [QBankOfflineStore]) to the real [QBankRepository], so
 * production wiring stays a one-line adapter while unit tests use plain fakes.
 */
@Module
@InstallIn(SingletonComponent::class)
object QBankUiModule {

    @Provides
    fun provideAttemptRecorder(repository: QBankRepository): AttemptRecorder =
        AttemptRecorder { records, now -> repository.recordAttempts(records, now) }

    @Provides
    fun provideQBankOfflineStore(repository: QBankRepository): QBankOfflineStore =
        QBankRepositoryOfflineStore(repository)
}
