package com.synapse.app.core.auth

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.preferencesDataStoreFile
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/** Exercises [AccountIdentityStore] against a real (Robolectric) DataStore file — same convention as `ThemePreferenceTest`. */
@RunWith(RobolectricTestRunner::class)
class AccountIdentityStoreTest {

    private fun newStore(): AccountIdentityStore {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val dataStore = PreferenceDataStoreFactory.create(
            produceFile = { context.preferencesDataStoreFile("account_identity_test_${System.nanoTime()}") }
        )
        return AccountIdentityStore(dataStore)
    }

    @Test fun defaultsToUnknownWhenNothingStored() = runTest {
        val store = newStore()
        assertEquals(AccountIdentity.Unknown, store.current())
        assertFalse(store.current().isKnown)
    }

    @Test fun roundTripsASavedIdentity() = runTest {
        val store = newStore()
        val identity = AccountIdentity(universityId = "KAU", year = "Year 3", yearId = "KAU_Y3", group = "Group 4")

        store.save(identity)

        assertEquals(identity, store.current())
    }

    @Test fun aLaterSaveOverwritesTheEarlierOne() = runTest {
        val store = newStore()
        store.save(AccountIdentity(universityId = "KAU", year = "Year 1", yearId = "KAU_Y1"))

        store.save(AccountIdentity(universityId = "CU", year = "Year 2", yearId = "CU_Y2"))

        assertEquals(AccountIdentity(universityId = "CU", year = "Year 2", yearId = "CU_Y2"), store.current())
    }
}
