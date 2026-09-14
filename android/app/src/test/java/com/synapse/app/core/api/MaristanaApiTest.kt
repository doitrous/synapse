package com.synapse.app.core.api

import kotlinx.coroutines.test.runTest
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class MaristanaApiTest {
    private lateinit var server: MockWebServer
    private lateinit var api: RetrofitMaristanaApi

    @Before fun setup() {
        server = MockWebServer()
        server.start()
        api = RetrofitMaristanaApi(baseUrl = server.url("/api/").toString(), tokenProvider = { "test-token" })
    }

    @After fun teardown() = server.shutdown()

    private val overviewBody = """
        {
          "enabled": true,
          "config": {"version":1,"enabled":true,"creditsPerStep":100,"creditsPerStudyMinute":2,"creditsPerQuestion":2,"creditsPerCorrectAnswer":10,"assessmentMinimumQuestions":20,"creditsPerAssessmentPercent":1.5},
          "totalCredits": 130,
          "completedHospitals": 0,
          "studyMinutes": 40,
          "questionsAnswered": 10,
          "correctAnswers": 8,
          "assessmentSessions": 0,
          "averageAssessmentScore": null,
          "breakdown": {"study":80,"questions":20,"accuracy":80,"assessments":0},
          "hospitals": [{"slot":1,"name":"Maristana 01","stage":1,"completed":false,"active":true,"creditsInHospital":130,"creditsToNextStep":70,"stepProgress":0.3}],
          "recentActivity": [],
          "thisWeek": {"studyMinutes":40,"questionsAnswered":10,"credits":180}
        }
    """.trimIndent()

    @Test fun getOverviewSendsBearerTokenToTheRightPath() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody(overviewBody))
        api.getOverview()

        val request = server.takeRequest()
        assertEquals("GET", request.method)
        assertTrue(request.path!!.endsWith("/maristanas"))
        assertEquals("Bearer test-token", request.getHeader("Authorization"))
    }

    @Test fun getOverviewParsesTheFullOverview() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody(overviewBody))
        val overview = api.getOverview()

        assertEquals(130, overview.totalCredits)
        assertEquals(1, overview.hospitals.size)
        assertEquals("Maristana 01", overview.hospitals.single().name)
        assertEquals(0.3, overview.hospitals.single().stepProgress, 0.0001)
    }

    @Test fun getOverviewMaps401ToUnauthorized() = runTest {
        server.enqueue(MockResponse().setResponseCode(401).setBody("{}"))
        val error = runCatching { api.getOverview() }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Unauthorized)
    }

    @Test fun postStudyHeartbeatSendsTheBucketAndSurface() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"ok":true,"accepted":true,"minuteBucket":123}"""))
        val result = api.postStudyHeartbeat(StudyHeartbeatBody(bucket = 123, sessionId = "s1", surface = "qbank"))

        val request = server.takeRequest()
        assertTrue(request.path!!.endsWith("/maristanas/study-heartbeat"))
        assertTrue(request.body.readUtf8().contains("\"bucket\":123"))
        assertTrue(result is StudyHeartbeatResult.Recorded)
        assertEquals(true, (result as StudyHeartbeatResult.Recorded).accepted)
        assertEquals(123L, result.minuteBucket)
    }

    @Test fun postStudyHeartbeatReadsTheRefusalBodyOffA400() = runTest {
        server.enqueue(MockResponse().setResponseCode(400).setBody("""{"error":"invalid_minute_bucket"}"""))
        val result = api.postStudyHeartbeat(StudyHeartbeatBody(bucket = 0))

        assertTrue(result is StudyHeartbeatResult.Refused)
        assertEquals("invalid_minute_bucket", (result as StudyHeartbeatResult.Refused).reason)
    }

    @Test fun renameHospitalSendsTheNameBodyToTheSlotPath() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"ok":true,"slot":1,"name":"Ibn Sina House"}"""))
        val result = api.renameHospital(1, "Ibn Sina House")

        val request = server.takeRequest()
        assertEquals("PATCH", request.method)
        assertTrue(request.path!!.endsWith("/maristanas/1"))
        assertTrue(request.body.readUtf8().contains("\"name\":\"Ibn Sina House\""))
        assertTrue(result is RenameHospitalResult.Renamed)
        assertEquals("Ibn Sina House", (result as RenameHospitalResult.Renamed).name)
    }

    @Test fun renameHospitalReadsTheNotUnlockedRefusalOffA403() = runTest {
        server.enqueue(MockResponse().setResponseCode(403).setBody("""{"error":"hospital_not_unlocked"}"""))
        val result = api.renameHospital(5, "Too Far Ahead")

        assertTrue(result is RenameHospitalResult.Refused)
        assertEquals("hospital_not_unlocked", (result as RenameHospitalResult.Refused).reason)
    }

    @Test fun renameHospitalReadsTheInvalidRefusalOffA400() = runTest {
        server.enqueue(MockResponse().setResponseCode(400).setBody("""{"error":"invalid_hospital"}"""))
        val result = api.renameHospital(1, "")

        assertTrue(result is RenameHospitalResult.Refused)
        assertEquals("invalid_hospital", (result as RenameHospitalResult.Refused).reason)
    }

    @Test fun renameHospitalMaps401ToUnauthorizedRatherThanARefusal() = runTest {
        server.enqueue(MockResponse().setResponseCode(401).setBody("{}"))
        val error = runCatching { api.renameHospital(1, "New Name") }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Unauthorized)
    }
}
