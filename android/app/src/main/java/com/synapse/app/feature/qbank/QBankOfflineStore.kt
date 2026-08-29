package com.synapse.app.feature.qbank

import com.synapse.app.core.qbank.Question
import javax.inject.Inject

/**
 * The narrow slice of [QBankRepository] that [PinnedScopesViewModel] needs for offline
 * pin management.
 *
 * Same motivation as [AttemptRecorder]: [QBankRepository]'s constructor pulls in a
 * DataStore, [com.synapse.app.core.media.MediaCache], and Retrofit APIs, which a
 * ViewModel unit test shouldn't have to stand up. [QBankRepositoryOfflineStore] is the
 * production adapter, bound in `di/QBankUiModule.kt`; tests use a small fake instead.
 */
interface QBankOfflineStore {
    suspend fun pinScopeForOffline(
        scope: Set<String>,
        questions: List<Question>,
        onProgress: (done: Int, total: Int) -> Unit = { _, _ -> },
    ): PinResult

    suspend fun pinnedScopes(): List<Set<String>>

    suspend fun unpin(scope: Set<String>)
}

/** Adapts [QBankRepository] to [QBankOfflineStore] for production DI. */
class QBankRepositoryOfflineStore @Inject constructor(
    private val repository: QBankRepository,
) : QBankOfflineStore {

    override suspend fun pinScopeForOffline(
        scope: Set<String>,
        questions: List<Question>,
        onProgress: (done: Int, total: Int) -> Unit,
    ): PinResult = repository.pinScopeForOffline(scope, questions, onProgress = onProgress)

    override suspend fun pinnedScopes(): List<Set<String>> = repository.pinnedScopes()

    override suspend fun unpin(scope: Set<String>) = repository.unpin(scope)
}
