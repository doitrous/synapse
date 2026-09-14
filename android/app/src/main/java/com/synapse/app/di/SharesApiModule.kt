package com.synapse.app.di

import android.content.Context
import com.synapse.app.core.api.RetrofitSharesApi
import com.synapse.app.core.api.SharesApi
import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.config.AppConfig
import com.synapse.app.feature.shares.MyDocumentFileCache
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import java.io.File
import javax.inject.Singleton

/**
 * Provides [SharesApi] (and its [MyDocumentFileCache]) in its own module
 * rather than folding them into `AppModule` — this feature's DI wiring is
 * self-contained on purpose, so it never conflicts with other surfaces being
 * built on parallel branches that also touch shared API wiring. Mirrors
 * `MaristanaApiModule`/`BillingApiModule`.
 */
@Module
@InstallIn(SingletonComponent::class)
object SharesApiModule {

    @Provides
    @Singleton
    fun provideSharesApi(config: AppConfig, authBackend: AuthBackend): SharesApi =
        RetrofitSharesApi(config, authBackend::accessToken)

    @Provides
    @Singleton
    fun provideMyDocumentFileCache(@ApplicationContext context: Context, api: SharesApi): MyDocumentFileCache {
        val cacheDir = File(context.filesDir, "my-documents-files").apply { mkdirs() }
        return MyDocumentFileCache(cacheDir, api)
    }
}
