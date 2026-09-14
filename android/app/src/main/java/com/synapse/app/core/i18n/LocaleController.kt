package com.synapse.app.core.i18n

import androidx.appcompat.app.AppCompatDelegate
import androidx.core.os.LocaleListCompat

/**
 * Maps the synced `synapse-lang` value ([com.synapse.app.feature.account.AccountRepository.LANGUAGE_KEY])
 * onto AndroidX's per-app-locale API. `synapse-lang` is the cross-client source of truth (web
 * and iOS read/write the same key); [apply] just makes this client's UI follow it, the same way
 * the other clients already do.
 *
 * Called from two places: once at process start ([com.synapse.app.RootViewModel], reading the
 * stored value) and again the moment the student changes it in Account
 * ([com.synapse.app.feature.account.AccountViewModel.setLanguage]), so the switch is immediate
 * rather than waiting for a restart.
 */
object LocaleController {

    /** The only two languages `synapse-lang` is ever written as (see its KDoc). */
    private val SUPPORTED_LANGUAGES = setOf("en", "ar")

    /** Unknown, blank, or unrecognised values fall back to English rather than crashing. */
    fun localeTagFor(language: String?): String =
        language?.takeIf { it in SUPPORTED_LANGUAGES } ?: "en"

    /** Applies [language] (or its English fallback) as the app's per-app locale. */
    fun apply(language: String?) {
        AppCompatDelegate.setApplicationLocales(LocaleListCompat.forLanguageTags(localeTagFor(language)))
    }
}
