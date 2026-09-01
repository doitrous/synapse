package com.synapse.android.core.auth

import com.synapse.android.core.api.SessionUser
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class CachedSessionUserTest {

    @Test fun `every field the app reads survives the round trip`() {
        val user = SessionUser(
            id = "u1",
            email = "student@example.com",
            role = "admin",
            aal = "aal2",
            mfaRequired = true,
        )

        assertEquals(user, CachedSessionUser.decode(CachedSessionUser.encode(user)))
    }

    @Test fun `the optional fields survive being absent`() {
        // GET /api/session omits these for an account the roster has not
        // filled in yet, and a null that comes back as "null" would put the
        // string in front of the student.
        val user = SessionUser(id = "u1", email = null, role = null, aal = null, mfaRequired = false)

        assertEquals(user, CachedSessionUser.decode(CachedSessionUser.encode(user)))
    }

    @Test fun `nothing a previous build could have left behind throws`() {
        // This is read on the restore path, where the app has no network and
        // no other answer. Anything unreadable has to mean "ask the server",
        // never a crash on launch.
        assertNull(CachedSessionUser.decode(""))
        assertNull(CachedSessionUser.decode("{"))
        assertNull(CachedSessionUser.decode("[]"))
        assertNull(CachedSessionUser.decode("{}"))
        assertNull(CachedSessionUser.decode("""{"email":"student@example.com"}"""))
        assertNull(CachedSessionUser.decode("""{"id":""}"""))
        assertNull(CachedSessionUser.decode("""{"id":null}"""))
    }

    @Test fun `a field of the wrong type is tolerated rather than fatal`() {
        val decoded = CachedSessionUser.decode("""{"id":"u1","mfaRequired":"yes"}""")

        assertEquals("u1", decoded?.id)
        // Not "yes": an unreadable flag falls back to the safe answer rather
        // than claiming a second factor the server never asked for.
        assertEquals(false, decoded?.mfaRequired)
    }
}
