package com.synapse.android.feature.account

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.viewModelFactory
import androidx.lifecycle.viewmodel.initializer
import com.synapse.android.core.auth.AuthModel
import com.synapse.android.core.auth.AuthState
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.sync.SyncEngine
import com.synapse.android.core.sync.SyncStatus
import com.synapse.android.design.CortexThemeChoice
import com.synapse.android.design.ThemePreference
import java.time.Instant
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.combine

/**
 * What the Account screen shows: who is signed in, when their work last
 * actually reached the server, and how many edits are still waiting to go.
 *
 * [lastSyncedAt] is null both before the first sync and after a sync that
 * failed -- only [SyncStatus.Done] carries a timestamp, so a student is
 * never shown a formatted epoch that reads as data corruption.
 */
data class AccountUi(
    val email: String?,
    val lastSyncedAt: Instant?,
    val pendingWrites: Int,
    val themeChoice: CortexThemeChoice,
)

/**
 * Not a debug affordance -- [AccountUi.pendingWrites] is the honest answer
 * to "is my work saved?", and a student working offline on a ward deserves
 * to see it.
 *
 * [ui] is a cold [Flow]: every collector re-reads [auth]'s and [sync]'s
 * current [kotlinx.coroutines.flow.StateFlow] values and re-queries
 * [LocalStore.outboxCount] from scratch. That keeps this class trivially
 * testable -- no [androidx.lifecycle.viewModelScope], no `Dispatchers.Main`
 * to install in a test -- and costs nothing in production, since
 * `AccountScreen` collects it exactly once.
 */
class AccountViewModel(
    private val auth: AuthModel,
    sync: SyncEngine,
    store: LocalStore,
    private val themePreference: ThemePreference,
) : ViewModel() {

    val ui: Flow<AccountUi> = combine(
        auth.state,
        sync.status,
        store.outboxCount(),
        themePreference.choice,
    ) { authState, syncStatus, pendingWrites, themeChoice ->
        AccountUi(
            email = (authState as? AuthState.SignedIn)?.user?.email,
            lastSyncedAt = (syncStatus as? SyncStatus.Done)?.at,
            pendingWrites = pendingWrites,
            themeChoice = themeChoice,
        )
    }

    suspend fun signOut() = auth.signOut()

    /** Kept on this device only -- never touches [store] or the outbox; see [ThemePreference]. */
    fun setTheme(choice: CortexThemeChoice) = themePreference.set(choice)

    companion object {
        fun factory(auth: AuthModel, sync: SyncEngine, store: LocalStore, themePreference: ThemePreference) = viewModelFactory {
            initializer { AccountViewModel(auth, sync, store, themePreference) }
        }
    }
}
