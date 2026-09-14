package com.synapse.app.core.api

import kotlinx.coroutines.test.runTest
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class LeaderboardApiTest {
    private lateinit var server: MockWebServer
    private lateinit var api: RetrofitLeaderboardApi

    @Before fun setup() {
        server = MockWebServer()
        server.start()
        api = RetrofitLeaderboardApi(baseUrl = server.url("/api/").toString(), tokenProvider = { "test-token" })
    }

    @After fun teardown() = server.shutdown()

    @Test fun sendsMetricAsAQueryParamOnTheLeaderboardsPath() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("{\"rows\":[]}"))
        api.getLeaderboard(LeaderboardMetric.ConceptsMastered)

        val request = server.takeRequest()
        assertEquals("GET", request.method)
        assertTrue(request.path!!.contains("leaderboards?metric=conceptsMastered"))
    }

    @Test fun percentCorrectMetricSendsItsOwnWireValue() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("{\"rows\":[]}"))
        api.getLeaderboard(LeaderboardMetric.PercentCorrect)

        assertTrue(server.takeRequest().path!!.contains("metric=percentCorrect"))
    }

    @Test fun sendsBearerTokenHeader() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("{\"rows\":[]}"))
        api.getLeaderboard(LeaderboardMetric.ConceptsMastered)
        assertEquals("Bearer test-token", server.takeRequest().getHeader("Authorization"))
    }

    @Test fun parsesRowsScopeAndViewer() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """
                {
                  "rows": [{"rank":1,"username":"a1","securedConcepts":12,"verifiedAnswers":140}],
                  "scope": {"university":"Cairo University","year":"Year 3","term":"Fall"},
                  "viewer": {"eligible": false, "verifiedAnswers": 10, "requiredAnswers": 100}
                }
                """.trimIndent()
            )
        )
        val response = api.getLeaderboard(LeaderboardMetric.ConceptsMastered)

        assertEquals(1, response.rows.size)
        assertEquals("a1", response.rows.single().username)
        assertEquals(12, response.rows.single().securedConcepts)
        assertEquals("Cairo University", response.scope?.university)
        assertEquals(false, response.viewer?.eligible)
    }

    @Test fun maps401ToUnauthorized() = runTest {
        server.enqueue(MockResponse().setResponseCode(401).setBody("{}"))
        val error = runCatching { api.getLeaderboard(LeaderboardMetric.ConceptsMastered) }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Unauthorized)
    }

    @Test fun maps500ToRetryable() = runTest {
        server.enqueue(MockResponse().setResponseCode(500).setBody("{}"))
        val error = runCatching { api.getLeaderboard(LeaderboardMetric.ConceptsMastered) }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Retryable)
    }
}
