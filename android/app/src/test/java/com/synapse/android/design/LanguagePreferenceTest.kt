package com.synapse.android.design

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/** Mirrors [ThemePreferenceTest] -- same reasoning, same plain unencrypted `SharedPreferences`. */
@RunWith(RobolectricTestRunner::class)
class LanguagePreferenceTest {

    private fun context(): Context = ApplicationProvider.getApplicationContext()

    @Test
    fun `an unset preference is English, not the system locale`() {
        val preference = LanguagePreference(context())

        assertEquals(AppLanguage.ENGLISH, preference.language.value)
        assertFalse(preference.language.value.rtl)
    }

    @Test
    fun `an unrecognised stored value falls back to English rather than crashing`() {
        context().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
            .edit().putString(PREFS_KEY, "fr").apply()

        val preference = LanguagePreference(context())

        assertEquals(AppLanguage.ENGLISH, preference.language.value)
    }

    @Test
    fun `each choice round-trips through storage by its wire name, and Arabic is RTL`() {
        val prefs = context().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

        for (language in AppLanguage.entries) {
            LanguagePreference(context()).set(language)

            assertEquals(language.wire, prefs.getString(PREFS_KEY, null))
            assertEquals(language, LanguagePreference(context()).language.value)
        }
        assertTrue(AppLanguage.ARABIC.rtl)
    }

    private companion object {
        const val PREFS_NAME = "synapse-language"
        const val PREFS_KEY = "synapse-language"
    }
}
