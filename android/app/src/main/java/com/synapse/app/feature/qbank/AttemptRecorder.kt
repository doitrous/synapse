package com.synapse.app.feature.qbank

import com.synapse.app.core.qbank.AttemptRecord
import java.time.Instant

/**
 * The narrow slice of [QBankRepository] that [SessionViewModel] needs to persist a
 * finished sitting's attempts.
 *
 * [QBankRepository] has a heavy constructor (DataStore, [com.synapse.app.core.media.MediaCache],
 * Retrofit APIs, ...), which would make [SessionViewModel] painful to unit-test with a real
 * instance. This seam lets a plain fake stand in for tests, while production wires it to
 * [QBankRepository.recordAttempts] via a `@Provides` in `di/QBankUiModule.kt`.
 */
fun interface AttemptRecorder {
    suspend fun record(records: List<AttemptRecord>, now: Instant)
}
