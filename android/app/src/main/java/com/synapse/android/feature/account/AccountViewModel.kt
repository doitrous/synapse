package com.synapse.android.feature.account

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.viewModelFactory
import androidx.lifecycle.viewmodel.initializer
import com.synapse.android.core.auth.AuthModel
import com.synapse.android.core.auth.AuthState
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.sync.SyncEngine
import com.synapse.android.core.sync.SyncStatus
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
) : ViewModel() {

    val ui: Flow<AccountUi> = combine(auth.state, sync.status, store.outboxCount()) { authState, syncStatus, pendingWrites ->
        AccountUi(
            email = (authState as? AuthState.SignedIn)?.user?.email,
            lastSyncedAt = (syncStatus as? SyncStatus.Done)?.at,
            pendingWrites = pendingWrites,
        )
    }

    suspend fun signOut() = auth.signOut()

    companion object {
        fun factory(auth: AuthModel, sync: SyncEngine, store: LocalStore) = viewModelFactory {
            initializer { AccountViewModel(auth, sync, store) }
        }
    }
}
