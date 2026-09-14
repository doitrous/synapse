package com.synapse.app.di

import com.synapse.app.core.api.RetrofitUniversityApi
import com.synapse.app.core.api.UniversityApi
import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.config.AppConfig
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

/**
 * Provides [UniversityApi] in its own module rather than folding it into
 * [AppModule] — this feature's DI wiring is self-contained on purpose, so it
 * never conflicts with the Account surface being built on a parallel branch
 * that also touches shared API wiring. Mirrors how [AppModule] provides
 * [com.synapse.app.core.api.QBankApi]/[com.synapse.app.core.api.LeaderboardApi].
 */
@Module
@InstallIn(SingletonComponent::class)
object UniversityApiModule {

    @Provides
    @Singleton
    fun provideUniversityApi(config: AppConfig, authBackend: AuthBackend): UniversityApi =
        RetrofitUniversityApi(config, authBackend::accessToken)
}
