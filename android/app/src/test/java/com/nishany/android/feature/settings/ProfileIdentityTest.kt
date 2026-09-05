package com.nishany.android.feature.settings

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Test

/**
 * [normaliseUsername] and [usernameProblem] are a straight port of
 * `src/data/profileIcons.ts:15-25` -- the server normalises and validates the
 * same way, so a rule that drifted here would pass this device's own check
 * and still be rejected (or, worse, silently mean something different) on
 * save.
 */
class ProfileIdentityTest {

    @Test
    fun `normalises to lowercase with spaces collapsed to hyphens`() {
        assertEquals("jordan-lee", normaliseUsername("  Jordan   Lee  "))
    }

    @Test
    fun `rejects a username under three characters`() {
        assertNotNull(usernameProblem("jo"))
    }

    @Test
    fun `rejects a username over twenty-four characters`() {
        assertNotNull(usernameProblem("a".repeat(25)))
    }

    @Test
    fun `rejects a leading or trailing separator`() {
        assertNotNull(usernameProblem("-jordan"))
        assertNotNull(usernameProblem("jordan-"))
    }

    @Test
    fun `rejects repeated separators`() {
        assertNotNull(usernameProblem("jordan--lee"))
        assertNotNull(usernameProblem("jordan__lee"))
        assertNotNull(usernameProblem("jordan..lee"))
    }

    @Test
    fun `accepts a plain valid handle`() {
        assertNull(usernameProblem("jordan-lee.2"))
    }
}
