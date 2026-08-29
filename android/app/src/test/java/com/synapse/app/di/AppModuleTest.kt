package com.synapse.app.di

import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.auth.AuthModel
import com.synapse.app.core.auth.Tokens
import com.synapse.app.core.auth.TokenStore
import com.synapse.app.core.cache.room.RoomLocalStore
import com.synapse.app.core.cache.room.SynapseDatabase
import com.synapse.app.core.config.AppConfig
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.test.runTest
import okhttp3.OkHttpClient
import org.junit.After
import org.junit.Assert.assertNotNull
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * Exercises [AppModule]'s `@Provides` functions directly (no Hilt component
 * needed) with a test [AppConfig] and an in-memory [TokenStore]/[SynapseDatabase],
 * asserting the graph wires up to a usable [AuthModel] and [SyncEngine].
 */
@RunWith(RobolectricTestRunner::class)
class AppModuleTest {
    private lateinit var db: SynapseDatabase

    @Before fun setup() {
        db = Room.inMemoryDatabaseBuilder(ApplicationProvider.getApplicationContext(), SynapseDatabase::class.java)
            .allowMainThreadQueries()
            .build()
    }

    @After fun teardown() = db.close()

    @Test fun graphProducesNonNullSyncEngineAndAuthModel() = runTest {
        val config = AppConfig(apiHost = "api.test", supabaseHost = "sb.test", supabaseAnonKey = "anon-key")
        val okHttpClient = AppModule.provideOkHttpClient()
        val localStore = AppModule.provideLocalStore(db)
        val tokenStore = FakeTokenStore()

        val authBackend = AppModule.provideAuthBackend(config, tokenStore, okHttpClient)
        val api = AppModule.provideSynapseApi(config, authBackend)
        val authModel = AppModule.provideAuthModel(authBackend, api)
        val syncEngine = AppModule.provideSyncEngine(api, localStore)

        assertNotNull(authModel)
        assertNotNull(syncEngine)
    }

    @Test fun provideAppConfigReadsBuildConfig() {
        assertNotNull(AppModule.provideAppConfig())
    }

    @Test fun provideSynapseDatabaseBuildsARealDatabase() {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val database = AppModule.provideSynapseDatabase(context)
        assertNotNull(database)
        database.close()
    }

    @Test fun provideTokenStoreProducesAWorkingStore() = runTest {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val tokenStore = AppModule.provideTokenStore(context)
        assertNotNull(tokenStore)
    }
}

/** In-memory [TokenStore] double for tests. Not a real persistence layer. */
private class FakeTokenStore : TokenStore {
    var saved: Tokens? = null

    override suspend fun save(tokens: Tokens) {
        saved = tokens
    }

    override suspend fun load(): Tokens? = saved

    override suspend fun clear() {
        saved = null
    }
}
