package com.synapse.android.design

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * [ThemePreference] is plain, unencrypted `SharedPreferences` -- see the
 * class doc for why -- so these tests exercise a real
 * [android.content.SharedPreferences] under Robolectric rather than a fake
 * or a mock of the store.
 */
@RunWith(RobolectricTestRunner::class)
class ThemePreferenceTest {

    private fun context(): Context = ApplicationProvider.getApplicationContext()

    @Test
    fun `an unset preference is light, not the system setting`() {
        val preference = ThemePreference(context())

        assertEquals(CortexThemeChoice.LIGHT, preference.choice.value)
    }

    @Test
    fun `an unrecognised stored value falls back to light rather than crashing`() {
        context().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
            .edit().putString(PREFS_KEY, "sepia").apply()

        val preference = ThemePreference(context())

        assertEquals(CortexThemeChoice.LIGHT, preference.choice.value)
    }

    @Test
    fun `each choice round-trips through storage by its wire name`() {
        val prefs = context().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

        for (choice in CortexThemeChoice.entries) {
            ThemePreference(context()).set(choice)

            assertEquals(choice.wire, prefs.getString(PREFS_KEY, null))
            assertEquals(choice, ThemePreference(context()).choice.value)
        }
    }

    @Test
    fun `warm shares every fill and on-colour with light`() {
        // The guard on Step 1: WarmCortexColors is a `copy` of
        // LightCortexColors, so a future edit that hand-writes warm instead
        // of copying light fails here rather than in a reader's eyes.
        assertEquals(LightCortexColors.primary, WarmCortexColors.primary)
        assertEquals(LightCortexColors.primaryStrong, WarmCortexColors.primaryStrong)
        assertEquals(LightCortexColors.primarySoft, WarmCortexColors.primarySoft)
        assertEquals(LightCortexColors.onPrimary, WarmCortexColors.onPrimary)
        assertEquals(LightCortexColors.accent, WarmCortexColors.accent)
        assertEquals(LightCortexColors.accentStrong, WarmCortexColors.accentStrong)
        assertEquals(LightCortexColors.onAccent, WarmCortexColors.onAccent)
        assertEquals(LightCortexColors.success, WarmCortexColors.success)
        assertEquals(LightCortexColors.onSuccess, WarmCortexColors.onSuccess)
        assertEquals(LightCortexColors.warning, WarmCortexColors.warning)
        assertEquals(LightCortexColors.onWarning, WarmCortexColors.onWarning)
        assertEquals(LightCortexColors.danger, WarmCortexColors.danger)
        assertEquals(LightCortexColors.onDanger, WarmCortexColors.onDanger)
    }

    private companion object {
        const val PREFS_NAME = "synapse-theme"
        const val PREFS_KEY = "synapse-theme"
    }
}
