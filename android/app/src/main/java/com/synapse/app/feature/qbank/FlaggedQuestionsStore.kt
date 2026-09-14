package com.synapse.app.feature.qbank

import java.time.Instant
import javax.inject.Inject

/**
 * The narrow slice of [QBankRepository] that [SessionViewModel] needs to read and
 * persist a student's flagged questions across sittings (not just within the
 * current one). Same motivation as [AttemptRecorder]: a plain fake stands in for
 * tests instead of a real [QBankRepository].
 */
interface FlaggedQuestionsStore {
    suspend fun flaggedIds(): Set<String>
    suspend fun setFlaggedIds(ids: Set<String>, now: Instant)

    companion object {
        /**
         * The default for callers that don't care about flags persisting (chiefly
         * tests constructing [SessionViewModel] directly) -- flags then behave
         * exactly as before this store existed: in-memory, for the one sitting.
         */
        val NoOp: FlaggedQuestionsStore = object : FlaggedQuestionsStore {
            override suspend fun flaggedIds(): Set<String> = emptySet()
            override suspend fun setFlaggedIds(ids: Set<String>, now: Instant) {}
        }
    }
}

/** Adapts [QBankRepository] to [FlaggedQuestionsStore] for production DI. */
class QBankRepositoryFlaggedQuestionsStore @Inject constructor(
    private val repository: QBankRepository,
) : FlaggedQuestionsStore {
    override suspend fun flaggedIds(): Set<String> = repository.flaggedIds()
    override suspend fun setFlaggedIds(ids: Set<String>, now: Instant) = repository.setFlaggedIds(ids, now)
}
