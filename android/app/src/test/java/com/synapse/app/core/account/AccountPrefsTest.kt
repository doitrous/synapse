package com.synapse.app.core.account

import com.synapse.app.core.sync.StateOwnership
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/** Mirrors iOS `AccountPrefsTests` case for case (the store-lifecycle cases live in `AccountRepositoryTest` instead — there is no separate store type on Android). */
class AccountPrefsTest {

    @Test fun eachSwitchGovernsOnlyItsOwnKindOfReminder() {
        var prefs = AccountPrefs("Africa/Cairo", reviewReminders = false, calendarReminders = true)
        assertFalse(prefs.allows("review"))
        assertTrue(prefs.allows("calendar"))

        prefs = AccountPrefs("Africa/Cairo", reviewReminders = true, calendarReminders = false)
        assertTrue(prefs.allows("review"))
        assertFalse(prefs.allows("timetable"))
    }

    @Test fun anythingNeitherSwitchCoversIsStillDelivered() {
        val silent = AccountPrefs("Africa/Cairo", reviewReminders = false, calendarReminders = false)
        assertTrue(silent.allows("announcement"))
        assertTrue(silent.allows(""))
    }

    @Test fun theKindIsMatchedWhateverCaseItWasWrittenIn() {
        val prefs = AccountPrefs("Africa/Cairo", reviewReminders = false, calendarReminders = false)
        assertFalse(prefs.allows("Review"))
        assertFalse(prefs.allows("CALENDAR"))
    }

    @Test fun bothRemindersAreOnByDefault() {
        val default = AccountPrefs.default("Africa/Cairo")
        assertTrue(default.reviewReminders)
        assertTrue(default.calendarReminders)
        assertEquals("Africa/Cairo", default.timezone)
    }

    @Test fun theRecordRoundTripsAsTheWebsiteWroteIt() {
        val json = Json { ignoreUnknownKeys = true }
        val raw = """{"timezone":"Africa/Cairo","reviewReminders":false,"calendarReminders":true}"""
        val prefs = json.decodeFromString(AccountPrefs.serializer(), raw)
        assertEquals("Africa/Cairo", prefs.timezone)
        assertFalse(prefs.reviewReminders)

        val again = json.decodeFromString(AccountPrefs.serializer(), json.encodeToString(AccountPrefs.serializer(), prefs))
        assertEquals(prefs, again)
    }

    @Test fun theKeyIsStudentOwnedSoTheServerWillAcceptTheWrite() {
        assertTrue(StateOwnership.isUserOwned(AccountPrefs.KEY))
    }
}
