package com.synapse.app.di

import android.content.Context
import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.preferencesDataStoreFile
import androidx.room.Room
import com.synapse.app.core.api.RetrofitSynapseApi
import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.auth.AuthModel
import com.synapse.app.core.auth.DataStoreTokenStore
import com.synapse.app.core.auth.SupabaseAuthBackend
import com.synapse.app.core.auth.TokenStore
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.room.RoomLocalStore
import com.synapse.app.core.cache.room.SynapseDatabase
import com.synapse.app.core.config.AppConfig
import com.synapse.app.core.sync.STUDENT_READABLE_KEYS
import com.synapse.app.core.sync.SyncEngine
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import javax.inject.Singleton

/**
 * The app's Hilt object graph. Breaks the api/auth cycle deliberately: the
 * API's bearer token is read from [AuthBackend.accessToken] directly (not
 * [AuthModel]), and [AuthModel]'s `confirmSession` round-trips through
 * [SynapseApi.session]. Nothing depends on [AuthModel] here, so there is no
 * cycle — only the (future) UI reads it.
 *
 * No standalone auth [okhttp3.Interceptor] is registered: [RetrofitSynapseApi]
 * already attaches its own per-call `Authorization: Bearer` header, and the
 * GoTrue calls in [SupabaseAuthBackend] authenticate with the `apikey` header
 * instead of a bearer token, so a shared interceptor would have nothing useful
 * to add.
 */
@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideAppConfig(): AppConfig = AppConfig.fromBuildConfig()

    @Provides
    @Singleton
    fun provideOkHttpClient(): OkHttpClient = OkHttpClient()

    @Provides
    @Singleton
    fun provideSynapseDatabase(@ApplicationContext context: Context): SynapseDatabase =
        Room.databaseBuilder(context, SynapseDatabase::class.java, "synapse.db").build()

    @Provides
    @Singleton
    fun provideLocalStore(database: SynapseDatabase): LocalStore = RoomLocalStore(database)

    @Provides
    @Singleton
    fun provideTokenStore(@ApplicationContext context: Context): TokenStore {
        val dataStore = PreferenceDataStoreFactory.create(
            produceFile = { context.preferencesDataStoreFile("synapse_auth_tokens") }
        )
        return DataStoreTokenStore(dataStore)
    }

    @Provides
    @Singleton
    fun provideAuthBackend(
        config: AppConfig,
        tokenStore: TokenStore,
        okHttpClient: OkHttpClient,
    ): AuthBackend = SupabaseAuthBackend(config, tokenStore, okHttpClient)

    @Provides
    @Singleton
    fun provideSynapseApi(config: AppConfig, authBackend: AuthBackend): SynapseApi =
        RetrofitSynapseApi(config, tokenProvider = authBackend::accessToken)

    @Provides
    @Singleton
    fun provideAuthModel(authBackend: AuthBackend, api: SynapseApi): AuthModel =
        AuthModel(authBackend, confirmSession = { runCatching { api.session() }.isSuccess })

    @Provides
    @Singleton
    fun provideSyncEngine(api: SynapseApi, store: LocalStore): SyncEngine =
        SyncEngine(api, store, STUDENT_READABLE_KEYS)
}
