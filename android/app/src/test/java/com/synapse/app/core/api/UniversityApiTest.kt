package com.synapse.app.core.api

import kotlinx.coroutines.test.runTest
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class UniversityApiTest {
    private lateinit var server: MockWebServer
    private lateinit var api: RetrofitUniversityApi

    @Before fun setup() {
        server = MockWebServer()
        server.start()
        api = RetrofitUniversityApi(baseUrl = server.url("/api/").toString(), tokenProvider = { "test-token" })
    }

    @After fun teardown() = server.shutdown()

    @Test fun getUniversitySendsBearerTokenToTheRightPath() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"status":"missing_profile"}"""))
        api.getUniversity()

        val request = server.takeRequest()
        assertEquals("GET", request.method)
        assertTrue(request.path!!.endsWith("/me/university"))
        assertEquals("Bearer test-token", request.getHeader("Authorization"))
    }

    @Test fun getUniversityParsesTheProjection() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """{"status":"ready","university":{"id":"hu","name":"Helwan University","short":"HU","region":"Cairo"}}"""
            )
        )
        val projection = api.getUniversity()
        assertEquals("ready", projection.status)
        assertEquals("hu", projection.university?.id)
    }

    @Test fun getUniversityMaps401ToUnauthorized() = runTest {
        server.enqueue(MockResponse().setResponseCode(401).setBody("{}"))
        val error = runCatching { api.getUniversity() }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Unauthorized)
    }

    @Test fun getEnrollmentChangeRequestsUnwrapsTheRequestsList() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """{"requests":[{"id":"r1","field":"year","requestedValue":"Year 3","reason":"promoted","status":"pending"}]}"""
            )
        )
        val requests = api.getEnrollmentChangeRequests()
        assertEquals(1, requests.size)
        assertEquals("r1", requests.single().id)
        assertEquals("pending", requests.single().status)
    }

    @Test fun submitEnrollmentChangeRequestSendsTheFieldWireValueAndBody() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """{"ok":true,"request":{"id":"r1","field":"university","requestedValue":"cu","reason":"transferred","status":"pending"}}"""
            )
        )
        val result = api.submitEnrollmentChangeRequest(EnrollmentField.University, "cu", "transferred")

        assertTrue(result is EnrollmentChangeSubmission.Submitted)
        assertEquals("r1", (result as EnrollmentChangeSubmission.Submitted).request.id)
        assertTrue(server.takeRequest().body.readUtf8().contains("\"field\":\"university\""))
    }

    @Test fun submitEnrollmentChangeRequestReadsTheRefusalBodyOffA409() = runTest {
        server.enqueue(MockResponse().setResponseCode(409).setBody("""{"error":"pending_exists","id":"existing-1"}"""))

        val result = api.submitEnrollmentChangeRequest(EnrollmentField.Year, "Year 3", "promoted this term")

        assertTrue(result is EnrollmentChangeSubmission.Refused)
        result as EnrollmentChangeSubmission.Refused
        assertEquals("pending_exists", result.reason)
        assertEquals("existing-1", result.pendingRequestId)
    }

    @Test fun submitEnrollmentChangeRequestMaps401ToUnauthorizedRatherThanARefusal() = runTest {
        server.enqueue(MockResponse().setResponseCode(401).setBody("{}"))
        val error = runCatching { api.submitEnrollmentChangeRequest(EnrollmentField.Year, "Year 3", "promoted this term") }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Unauthorized)
    }
}
