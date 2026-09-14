package com.synapse.app.core.api

import kotlinx.coroutines.test.runTest
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class AccountApiTest {
    private lateinit var server: MockWebServer
    private lateinit var api: RetrofitAccountApi

    @Before fun setup() {
        server = MockWebServer()
        server.start()
        api = RetrofitAccountApi(baseUrl = server.url("/api/").toString(), tokenProvider = { "test-token" })
    }

    @After fun teardown() = server.shutdown()

    @Test fun sendsBearerTokenHeaderOnGetMe() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"user":{"id":"u1"}}"""))
        api.getMe()
        assertEquals("Bearer test-token", server.takeRequest().getHeader("Authorization"))
    }

    @Test fun getMeParsesAFullRoster() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """
                {
                  "user": {"id": "u1", "email": "a@b.com", "role": "student"},
                  "profile": {"studentId": "s1", "name": "Omar", "universityId": "KAU", "year": "Year 3", "yearId": "KAU_Y3", "group": "Group 4"},
                  "entitlement": {"state": "trialing", "plan": "Free", "daysLeft": 5}
                }
                """.trimIndent()
            )
        )
        val response = api.getMe()

        assertEquals("u1", response.user.id)
        assertEquals("KAU", response.profile?.universityId)
        assertEquals("KAU_Y3", response.profile?.yearId)
        assertEquals(5, response.entitlement?.daysLeft)
    }

    @Test fun getMeToleratesANullProfileAndEntitlement() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"user":{"id":"u1"},"profile":null}"""))
        val response = api.getMe()
        assertNull(response.profile)
        assertNull(response.entitlement)
    }

    @Test fun putEnrolmentSendsTheGivenFieldsAsJson() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"ok":true}"""))
        val result = api.putEnrolment(EnrolmentRequest(universityId = "KAU", year = "Year 3", group = "Group 4"))

        val request = server.takeRequest()
        assertEquals("PUT", request.method)
        assertTrue(request.path!!.endsWith("me/enrolment"))
        assertTrue(request.body.readUtf8().contains("\"universityId\":\"KAU\""))
        assertTrue(result.ok)
    }

    @Test fun getDiscoverableParsesTheFlag() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"discoverable":true}"""))
        assertTrue(api.getDiscoverable().discoverable)
    }

    @Test fun setDiscoverablePostsTheRequestedValue() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"ok":true,"discoverable":true}"""))
        val result = api.setDiscoverable(true)

        val request = server.takeRequest()
        assertEquals("POST", request.method)
        assertTrue(request.body.readUtf8().contains("\"discoverable\":true"))
        assertTrue(result.discoverable)
    }

    @Test fun deleteAccountSendsDelete() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"ok":true}"""))
        val result = api.deleteAccount()

        assertEquals("DELETE", server.takeRequest().method)
        assertTrue(result.ok)
    }

    @Test fun exportRawReturnsTheRawBody() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"documents":{}}"""))
        val body = api.exportRaw()
        assertTrue(body.string().contains("documents"))
    }

    @Test fun maps401ToUnauthorized() = runTest {
        server.enqueue(MockResponse().setResponseCode(401).setBody("{}"))
        val error = runCatching { api.getMe() }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Unauthorized)
    }

    @Test fun maps409ToRetryable() = runTest {
        // enrollment_locked / username_taken — this client has no richer classification for a conflict.
        server.enqueue(MockResponse().setResponseCode(409).setBody("""{"error":"enrollment_locked"}"""))
        val error = runCatching { api.putEnrolment(EnrolmentRequest("KAU", "Year 3")) }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Retryable)
    }
}
