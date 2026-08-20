package com.synapse.android.core.api

import java.time.Instant
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.JsonPrimitive
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class SynapseApiTest {

    private lateinit var server: MockWebServer
    private lateinit var api: SynapseApi
    private var token: String? = "token-123"

    @Before fun setUp() {
        server = MockWebServer().also { it.start() }
        api = SynapseApi(
            baseUrl = server.url("/").toString().trimEnd('/'),
            client = OkHttpClient(),
            tokenProvider = { token },
        )
    }

    @After fun tearDown() = server.shutdown()

    @Test fun `the access token goes out as a bearer`() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"value":null,"updatedAt":null}"""))
        api.readState("synapse-plans-v1")
        assertEquals("Bearer token-123", server.takeRequest().getHeader("Authorization"))
    }

    @Test fun `a user-owned key goes to the user-state route`() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"value":null,"updatedAt":null}"""))
        api.readState("synapse.qbank.activeSession.v1")
        assertEquals("/api/user-state/synapse.qbank.activeSession.v1", server.takeRequest().path)
    }

    @Test fun `a catalogue key goes to the shared route`() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"value":null,"updatedAt":null}"""))
        api.readState("synapse-plans-v1")
        assertEquals("/api/state/synapse-plans-v1", server.takeRequest().path)
    }

    @Test fun `401 is unauthorized`() = runBlocking {
        server.enqueue(MockResponse().setResponseCode(401))
        val error = runCatching { api.readState("synapse-plans-v1") }.exceptionOrNull()
        assertTrue(error is ApiError.Unauthorized)
    }

    @Test fun `403 is forbidden and is never retried`() = runBlocking {
        // For a student asking for an admin-only key this is the permanent,
        // correct answer.
        server.enqueue(MockResponse().setResponseCode(403))
        val error = runCatching { api.readState("synapse-secret") }.exceptionOrNull()
        assertTrue(error is ApiError.Forbidden)
        assertTrue(!(error as ApiError).isRetryable)
    }

    @Test fun `404 is its own case so callers can fall back`() = runBlocking {
        server.enqueue(MockResponse().setResponseCode(404))
        val error = runCatching { api.manifest() }.exceptionOrNull()
        assertTrue(error is ApiError.NotFound)
    }

    @Test fun `500 is transient and is retryable`() = runBlocking {
        server.enqueue(MockResponse().setResponseCode(500))
        val error = runCatching { api.readState("synapse-plans-v1") }.exceptionOrNull()
        assertTrue((error as ApiError).isRetryable)
    }

    @Test fun `a body that is not the expected shape is malformed`() = runBlocking {
        server.enqueue(MockResponse().setBody("not json"))
        val error = runCatching { api.readState("synapse-plans-v1") }.exceptionOrNull()
        assertTrue(error is ApiError.Malformed)
    }

    @Test fun `the manifest is a state key, not a route of its own`() = runBlocking {
        // The server registers `/api/state/manifest` before `/api/state/:key`
        // (server/src/index.js:546). `/api/manifest` is a 404 and would send
        // sync down its no-manifest fallback path forever.
        server.enqueue(MockResponse().setBody("""{"keys":{}}"""))
        api.manifest()
        assertEquals("/api/state/manifest", server.takeRequest().path)
    }

    @Test fun `the manifest parses timestamps and nulls`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """{"keys":{"synapse-plans-v1":"2026-08-19T10:00:00.000Z","synapse-vouchers-v1":null}}"""
        ))
        val manifest = api.manifest()
        assertEquals(Instant.parse("2026-08-19T10:00:00Z"), manifest["synapse-plans-v1"])
        assertNull(manifest["synapse-vouchers-v1"])
        assertTrue(manifest.containsKey("synapse-vouchers-v1"))
    }

    @Test fun `a write is wrapped in the value envelope`() = runBlocking {
        server.enqueue(MockResponse().setResponseCode(200).setBody("{}"))
        api.writeState("synapse.reader.settings", JsonPrimitive("large"))
        val request = server.takeRequest()
        assertEquals("PUT", request.method)
        assertEquals("""{"value":"large"}""", request.body.readUtf8())
    }

    @Test fun `no token means no Authorization header rather than a null one`() = runBlocking {
        token = null
        server.enqueue(MockResponse().setBody("""{"value":null,"updatedAt":null}"""))
        api.readState("synapse-plans-v1")
        assertNull(server.takeRequest().getHeader("Authorization"))
    }

    // Fixture shape copied from server/src/index.js:146-153.
    @Test fun `session decodes every field for a signed-in user`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """{"user":{"id":"u1","email":"student@example.com","role":"student","aal":"aal1","mfaRequired":true}}"""
        ))
        val user = api.session()
        assertEquals("u1", user?.id)
        assertEquals("student@example.com", user?.email)
        assertEquals("student", user?.role)
        assertEquals("aal1", user?.aal)
        assertEquals(true, user?.mfaRequired)
    }

    // Fixture shape copied from server/src/index.js:146-153: an anonymous
    // caller gets a 200 with a null user, never a 401.
    @Test fun `session returns null for an anonymous caller without throwing`() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"user":null}"""))
        val user = api.session()
        assertNull(user)
    }

    // Fixture shape copied from server/src/index.js:165-176.
    @Test fun `me decodes every field of user, profile and entitlement`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """
            {
              "user": {"id":"u1","email":"student@example.com","role":"student","aal":"aal1","mfaRequired":true},
              "profile": {"studentId":"u1","name":"Jordan Lee","email":"student@example.com","universityId":"uni-1","year":"Y3","group":"G2","status":"active"},
              "subscription": null,
              "entitlement": {"state":"active","plan":"Pro","expiresAt":"2026-09-01T00:00:00.000Z","daysLeft":13}
            }
            """.trimIndent()
        ))
        val me = api.me()

        assertEquals("u1", me.user.id)
        assertEquals("student@example.com", me.user.email)
        assertEquals("student", me.user.role)
        assertEquals("aal1", me.user.aal)
        assertEquals(true, me.user.mfaRequired)

        assertEquals("u1", me.profile?.studentId)
        assertEquals("Jordan Lee", me.profile?.name)
        assertEquals("student@example.com", me.profile?.email)
        assertEquals("uni-1", me.profile?.universityId)
        assertEquals("Y3", me.profile?.year)
        assertEquals("G2", me.profile?.group)
        assertEquals("active", me.profile?.status)

        assertEquals("active", me.entitlement?.state)
        assertEquals("Pro", me.entitlement?.plan)
        assertEquals(Instant.parse("2026-09-01T00:00:00Z"), me.entitlement?.expiresAt)
        assertEquals(13, me.entitlement?.daysLeft)
    }

    // Fixture shape copied from server/src/index.js:165-176: a missing roster
    // row is a 200 with a null `profile` and the server's own fallback
    // entitlement (`{ state: 'none', plan: 'Free', expiresAt: null, daysLeft: null }`,
    // server/src/index.js:172), not an error.
    @Test fun `me decodes a null profile and the default entitlement without error`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """
            {
              "user": {"id":"u1","email":"student@example.com","role":"student","aal":"aal1","mfaRequired":false},
              "profile": null,
              "subscription": null,
              "entitlement": {"state":"none","plan":"Free","expiresAt":null,"daysLeft":null}
            }
            """.trimIndent()
        ))
        val me = api.me()

        assertNull(me.profile)
        assertEquals("none", me.entitlement?.state)
        assertEquals("Free", me.entitlement?.plan)
        assertNull(me.entitlement?.expiresAt)
        assertNull(me.entitlement?.daysLeft)
    }
}
