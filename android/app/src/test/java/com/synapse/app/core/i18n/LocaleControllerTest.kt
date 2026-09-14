package com.synapse.app.core.i18n

import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * [LocaleController.localeTagFor] maps `synapse-lang` ("en"/"ar", unknown, or absent) onto the
 * tag [LocaleController.apply] hands to `AppCompatDelegate.setApplicationLocales`. Kept as a
 * plain JVM test against the pure mapping function — [LocaleController.apply] itself is a
 * one-line call into AndroidX's own per-app-locale plumbing, exercised for real by
 * `:app:assembleDebug` and by [com.synapse.app.feature.account.AccountViewModelTest] (which
 * drives [com.synapse.app.feature.account.AccountViewModel.setLanguage]).
 */
class LocaleControllerTest {

    @Test
    fun `localeTagFor maps ar to ar`() {
        assertEquals("ar", LocaleController.localeTagFor("ar"))
    }

    @Test
    fun `localeTagFor maps en to en`() {
        assertEquals("en", LocaleController.localeTagFor("en"))
    }

    @Test
    fun `localeTagFor falls back to en for unknown values`() {
        assertEquals("en", LocaleController.localeTagFor("fr"))
    }

    @Test
    fun `localeTagFor falls back to en for blank or null`() {
        assertEquals("en", LocaleController.localeTagFor(""))
        assertEquals("en", LocaleController.localeTagFor(null))
    }
}
