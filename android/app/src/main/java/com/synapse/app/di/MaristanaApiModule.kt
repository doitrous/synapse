package com.synapse.app.di

import com.synapse.app.core.api.MaristanaApi
import com.synapse.app.core.api.RetrofitMaristanaApi
import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.config.AppConfig
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

/**
 * Provides [MaristanaApi] in its own module rather than folding it into
 * `AppModule` — this feature's DI wiring is self-contained on purpose, so it
 * never conflicts with other surfaces being built on parallel branches that
 * also touch shared API wiring. Mirrors `UniversityApiModule`, which provides
 * [com.synapse.app.core.api.UniversityApi] the same way.
 */
@Module
@InstallIn(SingletonComponent::class)
object MaristanaApiModule {

    @Provides
    @Singleton
    fun provideMaristanaApi(config: AppConfig, authBackend: AuthBackend): MaristanaApi =
        RetrofitMaristanaApi(config, authBackend::accessToken)
}
