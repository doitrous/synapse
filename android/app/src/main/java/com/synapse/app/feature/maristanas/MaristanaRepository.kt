package com.synapse.app.feature.maristanas

import com.synapse.app.core.api.MaristanaApi
import com.synapse.app.core.api.RenameHospitalResult
import com.synapse.app.core.api.StudyHeartbeatBody
import com.synapse.app.core.api.StudyHeartbeatResult
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.maristanas.DEFAULT_MARISTANA_ONBOARDING
import com.synapse.app.core.maristanas.MARISTANA_ONBOARDING_KEY
import com.synapse.app.core.maristanas.MaristanaOnboardingState
import com.synapse.app.core.maristanas.MaristanaOverview
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.CancellationException
import kotlinx.serialization.json.Json
import java.time.Instant
import javax.inject.Inject

/** What one overview fetch came to. */
sealed interface MaristanaOverviewOutcome {
    /** [fromCache] is true when this is the last-good response served after a failed/offline live fetch. */
    data class Loaded(val overview: MaristanaOverview, val fromCache: Boolean) : MaristanaOverviewOutcome

    /** Neither the network nor the offline cache had anything to show. Never substituted with demo data. */
    data object Unavailable : MaristanaOverviewOutcome
}

/**
 * The Build Maristanas data layer. [overview] is the one live call this
 * feature makes for its primary content — the server computes the entire
 * construction ledger from this student's own activity, so nothing here
 * re-derives it. A failed or offline fetch degrades to the last-good
 * response cached from a previous successful fetch (never to fabricated or
 * demo data), matching `PerformanceRepository`'s leaderboard-degrades-honestly
 * shape. Onboarding dismissal is the one piece of state this feature owns
 * itself, round-tripped through [SyncEngine] like `PracticalRepository`'s
 * progress doc.
 */
class MaristanaRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val api: MaristanaApi,
    private val json: Json,
) {

    suspend fun overview(now: Instant): MaristanaOverviewOutcome = try {
        val fresh = api.getOverview()
        cacheOverview(fresh, now)
        MaristanaOverviewOutcome.Loaded(fresh, fromCache = false)
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        cachedOverview()?.let { MaristanaOverviewOutcome.Loaded(it, fromCache = true) } ?: MaristanaOverviewOutcome.Unavailable
    }

    /** This student's onboarding/dismissal doc. All-defaults (not yet dismissed) if nothing has been saved. */
    suspend fun onboardingState(): MaristanaOnboardingState {
        val stored = localStore.getUserState(MARISTANA_ONBOARDING_KEY) ?: return DEFAULT_MARISTANA_ONBOARDING
        return runCatching { json.decodeFromString(MaristanaOnboardingState.serializer(), stored) }.getOrDefault(DEFAULT_MARISTANA_ONBOARDING)
    }

    suspend fun completeOnboarding(now: Instant) {
        val next = MaristanaOnboardingState(version = 1, completed = true)
        syncEngine.write(MARISTANA_ONBOARDING_KEY, json.encodeToString(MaristanaOnboardingState.serializer(), next), now)
    }

    suspend fun rename(slot: Int, name: String): RenameHospitalResult = api.renameHospital(slot, name)

    /**
     * Record one active-study minute (`POST /api/maristanas/study-heartbeat`).
     *
     * Exposed for a future cross-cutting study-presence tracker — web's
     * `StudyActivityTracker` (`src/components/shell/StudyActivityTracker.tsx`)
     * mounts app-wide in the shell and pings this endpoint once a minute while
     * the student is actively using one of a fixed set of *study* surfaces
     * (library, QBank, Adaptive, Practical, ...) — Build Maristanas' own
     * dashboard is deliberately **not** one of them on web either, since
     * looking at your own progress is not itself studying. The shell is out
     * of scope for this feature (see the plan this surface was built from),
     * so nothing in this module calls [recordStudyHeartbeat] on its own: doing
     * so from this screen's mere presence would be exactly the fabricated
     * heartbeat the plan warns against. A future shell-level tracker (or a
     * feature that owns a real study surface) is the intended caller.
     */
    suspend fun recordStudyHeartbeat(bucket: Long, sessionId: String?, moduleId: String?, subjectId: String?, surface: String?): StudyHeartbeatResult =
        api.postStudyHeartbeat(StudyHeartbeatBody(bucket, sessionId, moduleId, subjectId, surface))

    private suspend fun cacheOverview(overview: MaristanaOverview, now: Instant) {
        localStore.putCatalogue(OVERVIEW_CACHE_KEY, now.toString(), json.encodeToString(MaristanaOverview.serializer(), overview))
    }

    private suspend fun cachedOverview(): MaristanaOverview? {
        val stored = localStore.getCatalogue(OVERVIEW_CACHE_KEY) ?: return null
        return runCatching { json.decodeFromString(MaristanaOverview.serializer(), stored) }.getOrNull()
    }

    private companion object {
        /**
         * A private offline cache of a per-user live endpoint response — deliberately
         * not a `core/sync/StudentReadableKeys.kt` entry, since that list is for shared
         * catalogue docs [SyncEngine] pulls; this key is never read or written by
         * [SyncEngine], only by this repository, via the same generic catalogue table.
         */
        const val OVERVIEW_CACHE_KEY = "maristana-overview-cache-v1"
    }
}
