package com.synapse.app.work

import android.content.Context
import androidx.hilt.work.HiltWorker
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.synapse.app.core.sync.SyncEngine
import dagger.assisted.Assisted
import dagger.assisted.AssistedInject
import kotlinx.coroutines.CancellationException
import java.io.IOException
import java.time.Instant

/**
 * Background sync: periodic (~6h, network-constrained — see [com.synapse.app.SynapseApp])
 * plus whatever on-demand enqueue a future feature adds. Delegates entirely to
 * [SyncEngine.refresh]; a transient network failure is retried by WorkManager rather than
 * surfaced as a crash, while any other exception is left to fail the work run so a genuine
 * bug still shows up in logs/metrics instead of being silently retried forever.
 */
@HiltWorker
class SyncWorker @AssistedInject constructor(
    @Assisted appContext: Context,
    @Assisted params: WorkerParameters,
    private val syncEngine: SyncEngine,
) : CoroutineWorker(appContext, params) {

    override suspend fun doWork(): Result = try {
        syncEngine.refresh(Instant.now())
        Result.success()
    } catch (e: CancellationException) {
        throw e
    } catch (e: IOException) {
        Result.retry()
    }
}
