package com.synapse.app.core.api

import com.synapse.app.core.model.StateDoc
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.JsonPrimitive
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class RetrofitSynapseApiTest {
    private lateinit var server: MockWebServer
    private lateinit var api: RetrofitSynapseApi

    @Before fun setup() {
        server = MockWebServer()
        server.start()
        api = RetrofitSynapseApi(baseUrl = server.url("/api/").toString(), tokenProvider = { "test-token" })
    }

    @After fun teardown() = server.shutdown()

    @Test fun getUserStateParsesStateDoc() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200)
                .setBody("{\"value\":{\"a\":1},\"version\":2,\"updatedAt\":\"2026-08-20T10:00:00Z\"}")
        )
        val doc = api.getUserState("synapse.notebook.notes")
        assertEquals(2L, doc.version)
        assertEquals("2026-08-20T10:00:00Z", doc.updatedAt)
    }

    @Test fun sendsBearerTokenHeader() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("{\"value\":{}}"))
        api.getUserState("k")
        assertEquals("Bearer test-token", server.takeRequest().getHeader("Authorization"))
    }

    @Test fun maps401ToUnauthorized() = runTest {
        server.enqueue(MockResponse().setResponseCode(401).setBody("{}"))
        val error = runCatching { api.getUserState("k") }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Unauthorized)
    }

    @Test fun maps403ToForbidden() = runTest {
        server.enqueue(MockResponse().setResponseCode(403).setBody("{}"))
        val error = runCatching { api.getUserState("k") }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Forbidden)
    }

    @Test fun maps500ToRetryable() = runTest {
        server.enqueue(MockResponse().setResponseCode(500).setBody("{}"))
        val error = runCatching { api.getUserState("k") }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Retryable)
    }

    @Test fun putUserStateSendsPutWithBody() = runTest {
        server.enqueue(MockResponse().setResponseCode(200))
        api.putUserState("synapse.notebook.notes", StateDoc(value = JsonPrimitive("x")))
        val request = server.takeRequest()
        assertEquals("PUT", request.method)
        assertTrue(request.path!!.contains("user-state/synapse.notebook.notes"))
    }
}
