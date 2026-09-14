package com.synapse.app.di

import com.synapse.app.core.api.BillingApi
import com.synapse.app.core.api.RetrofitBillingApi
import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.config.AppConfig
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

/**
 * Provides [BillingApi] in its own module rather than folding it into
 * [AppModule] — this feature's DI wiring is self-contained on purpose, so it
 * never conflicts with other surfaces built on parallel branches that also
 * touch shared API wiring. Mirrors [UniversityApiModule].
 */
@Module
@InstallIn(SingletonComponent::class)
object BillingApiModule {

    @Provides
    @Singleton
    fun provideBillingApi(config: AppConfig, authBackend: AuthBackend): BillingApi =
        RetrofitBillingApi(config, authBackend::accessToken)
}
