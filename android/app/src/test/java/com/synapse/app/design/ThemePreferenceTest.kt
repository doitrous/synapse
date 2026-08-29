package com.synapse.app.design

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.preferencesDataStoreFile
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/** Exercises [ThemePreference] against a real (Robolectric) DataStore file. */
@RunWith(RobolectricTestRunner::class)
class ThemePreferenceTest {

    private fun newPreference(): ThemePreference {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val dataStore = PreferenceDataStoreFactory.create(
            produceFile = { context.preferencesDataStoreFile("theme_prefs_test_${System.nanoTime()}") }
        )
        return ThemePreference(dataStore)
    }

    @Test
    fun defaultsToLightWhenNothingStored() = runTest {
        val preference = newPreference()
        assertEquals(ThemeChoice.Light, preference.choice.first())
    }

    @Test
    fun roundTripsAStoredChoice() = runTest {
        val preference = newPreference()

        preference.set(ThemeChoice.Warm)
        assertEquals(ThemeChoice.Warm, preference.choice.first())

        preference.set(ThemeChoice.Dark)
        assertEquals(ThemeChoice.Dark, preference.choice.first())

        preference.set(ThemeChoice.Light)
        assertEquals(ThemeChoice.Light, preference.choice.first())
    }
}
