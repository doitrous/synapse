package com.synapse.android.design

import android.app.LocaleManager
import android.content.Context
import android.os.Build
import android.os.LocaleList
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * The two languages Settings offers, each labelled in its own name -- a
 * student looking for Arabic is looking for "العربية", not for the English
 * word for it.
 */
enum class AppLanguage(val wire: String, val ownName: String, val rtl: Boolean) {
    ENGLISH("en", "English", rtl = false),
    ARABIC("ar", "العربية", rtl = true);

    companion object {
        fun fromWire(wire: String?): AppLanguage = entries.firstOrNull { it.wire == wire } ?: ENGLISH
    }
}

/**
 * The reader's chosen language -- kept on this device, mirroring
 * [ThemePreference]'s own reasoning: plain `SharedPreferences` (nothing
 * secret here), never synced (a per-device UI setting, not a document the
 * outbox owns), and defaults to [AppLanguage.ENGLISH] rather than the system
 * locale, matching this app's other per-device defaults.
 *
 * // ponytail: every screen's copy is still hardcoded English -- there is no
 * // string-resource layer to switch. What this class actually drives today
 * // is layout direction ([AppLanguage.rtl], applied in `MainActivity` via
 * // `CompositionLocalProvider(LocalLayoutDirection ...)`) and, on API 33+,
 * // the OS-level per-app locale (date/number formatting and any
 * // system-drawn string, e.g. the notification permission dialog). Per-
 * // string Arabic translation is a later content task; wiring every string
 * // through `strings.xml` or an in-app dictionary is the upgrade path.
 */
class LanguagePreference(private val context: Context) {

    private val prefs = context.applicationContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    private val _language = MutableStateFlow(AppLanguage.fromWire(prefs.getString(KEY, null)))
    val language: StateFlow<AppLanguage> = _language.asStateFlow()

    fun set(language: AppLanguage) {
        prefs.edit().putString(KEY, language.wire).apply()
        _language.value = language
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            context.applicationContext.getSystemService(LocaleManager::class.java)
                ?.applicationLocales = LocaleList.forLanguageTags(language.wire)
        }
    }

    private companion object {
        const val PREFS_NAME = "synapse-language"
        const val KEY = "synapse-language"
    }
}
