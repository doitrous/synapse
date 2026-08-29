package com.synapse.app

import android.app.Application
import androidx.hilt.work.HiltWorkerFactory
import androidx.work.Configuration
import androidx.work.Constraints
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.NetworkType
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import com.synapse.app.work.SyncWorker
import dagger.hilt.EntryPoint
import dagger.hilt.InstallIn
import dagger.hilt.android.EntryPointAccessors
import dagger.hilt.android.HiltAndroidApp
import dagger.hilt.components.SingletonComponent
import java.util.concurrent.TimeUnit

private const val SYNC_WORK_NAME = "synapse-periodic-sync"
private const val SYNC_INTERVAL_HOURS = 6L

/**
 * Fetches [HiltWorkerFactory] from the app's Hilt component without `@Inject`-annotated
 * *field* injection on [SynapseApp]. Field injection is the textbook pattern here, but this
 * project's toolchain combination (Kotlin 2.1.20, emitting JVM metadata version `2.1.0`,
 * against `com.google.dagger:hilt-android-compiler:2.52`'s bundled Kotlin-metadata reader)
 * throws `IllegalStateException: Unable to read Kotlin metadata due to unsupported metadata
 * version` specifically when Dagger validates a Kotlin `lateinit var` `@Inject` field —
 * confirmed by isolating `@Inject lateinit var workerFactory: HiltWorkerFactory` as the sole
 * trigger (removing only the `@Inject` annotation, nothing else, made the failure disappear).
 * An `@EntryPoint` provision method doesn't go through that same field/member-injection
 * metadata check, so this sidesteps the incompatibility entirely while still resolving the
 * exact same Hilt-provided [HiltWorkerFactory]. The real fix is a `hilt-android`/
 * `hilt-android-compiler` (or Kotlin) version bump in `gradle/libs.versions.toml`, which is
 * outside this file's scope — see the Task 6 report for details.
 */
@EntryPoint
@InstallIn(SingletonComponent::class)
interface WorkerFactoryEntryPoint {
    fun workerFactory(): HiltWorkerFactory
}

/**
 * Wires [HiltWorkerFactory] into WorkManager (so [SyncWorker]'s `@AssistedInject` constructor
 * gets its [com.synapse.app.core.sync.SyncEngine] dependency) and schedules the periodic
 * background sync on first launch.
 *
 * The manifest disables WorkManager's default `androidx.startup` initializer (it would run
 * before Hilt has finished setting up this class's component), so [WorkManager.getInstance]
 * performs on-demand initialization the first time it's called below, from [onCreate].
 */
@HiltAndroidApp
class SynapseApp : Application(), Configuration.Provider {

    override val workManagerConfiguration: Configuration
        get() {
            val entryPoint = EntryPointAccessors.fromApplication(this, WorkerFactoryEntryPoint::class.java)
            return Configuration.Builder()
                .setWorkerFactory(entryPoint.workerFactory())
                .build()
        }

    override fun onCreate() {
        super.onCreate()
        scheduleSyncWork()
    }

    private fun scheduleSyncWork() {
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build()
        val request = PeriodicWorkRequestBuilder<SyncWorker>(SYNC_INTERVAL_HOURS, TimeUnit.HOURS)
            .setConstraints(constraints)
            .build()
        WorkManager.getInstance(this).enqueueUniquePeriodicWork(
            SYNC_WORK_NAME,
            ExistingPeriodicWorkPolicy.KEEP,
            request,
        )
    }
}
