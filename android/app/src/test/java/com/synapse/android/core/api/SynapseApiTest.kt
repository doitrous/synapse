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
}
