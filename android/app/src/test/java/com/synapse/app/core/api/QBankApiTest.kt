package com.synapse.app.core.api

import kotlinx.coroutines.test.runTest
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class QBankApiTest {
    private lateinit var server: MockWebServer
    private lateinit var api: RetrofitQBankApi

    @Before fun setup() {
        server = MockWebServer()
        server.start()
        api = RetrofitQBankApi(baseUrl = server.url("/api/").toString(), tokenProvider = { "test-token" })
    }

    @After fun teardown() = server.shutdown()

    private fun sampleBody() = VerifiedAttemptsBody(
        attempts = listOf(
            VerifiedAttempt(
                attemptId = "sess-1:qbank:item-1",
                sessionId = "sess-1",
                questionId = "item-1",
                answerIndex = 2,
                seconds = 45,
                sessionDurationSeconds = 600,
                overtimeSeconds = null,
                answeredAt = "2026-08-29T12:00:00Z",
            )
        )
    )

    @Test fun postsAttemptsBodyToQbankAttemptsPath() = runTest {
        server.enqueue(MockResponse().setResponseCode(200))
        api.postAttempts(sampleBody())

        val request = server.takeRequest()
        assertEquals("POST", request.method)
        assertTrue(request.path!!.contains("qbank/attempts"))
        val bodyText = request.body.readUtf8()
        assertTrue(bodyText.contains("\"attemptId\":\"sess-1:qbank:item-1\""))
        assertTrue(bodyText.contains("\"answerIndex\":2"))
    }

    @Test fun sendsBearerTokenHeader() = runTest {
        server.enqueue(MockResponse().setResponseCode(200))
        api.postAttempts(sampleBody())
        assertEquals("Bearer test-token", server.takeRequest().getHeader("Authorization"))
    }

    @Test fun maps401ToUnauthorized() = runTest {
        server.enqueue(MockResponse().setResponseCode(401).setBody("{}"))
        val error = runCatching { api.postAttempts(sampleBody()) }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Unauthorized)
    }

    @Test fun maps403ToForbidden() = runTest {
        server.enqueue(MockResponse().setResponseCode(403).setBody("{}"))
        val error = runCatching { api.postAttempts(sampleBody()) }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Forbidden)
    }

    @Test fun maps500ToRetryable() = runTest {
        server.enqueue(MockResponse().setResponseCode(500).setBody("{}"))
        val error = runCatching { api.postAttempts(sampleBody()) }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Retryable)
    }
}
