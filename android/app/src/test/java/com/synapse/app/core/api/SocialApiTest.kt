package com.synapse.app.core.api

import kotlinx.coroutines.test.runTest
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

/**
 * [RetrofitSocialApi] against the shapes `server/src/studyRooms.js`,
 * `server/src/challenges.js` and `server/src/friends.js` actually return —
 * one representative call per area (paths, the bearer header, tolerant JSON
 * decode of a nested payload) plus the shared HTTP-error mapping every
 * Retrofit client under `core/api` relies on.
 */
class SocialApiTest {
    private lateinit var server: MockWebServer
    private lateinit var api: RetrofitSocialApi

    @Before fun setup() {
        server = MockWebServer()
        server.start()
        api = RetrofitSocialApi(baseUrl = server.url("/api/").toString(), tokenProvider = { "test-token" })
    }

    @After fun teardown() = server.shutdown()

    @Test fun sendsBearerTokenHeader() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"rooms":[]}"""))
        api.myRooms()
        assertEquals("Bearer test-token", server.takeRequest().getHeader("Authorization"))
    }

    @Test fun createRoomPostsToStudyRoomsWithTheBody() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"ok":true,"room":${roomJson(status = "lobby")}}"""))
        api.createRoom(CreateRoomBody(name = "Shared test", questionIds = listOf("q1", "q2"), timed = true, secondsPerQuestion = 90))

        val request = server.takeRequest()
        assertEquals("POST", request.method)
        assertTrue(request.path!!.endsWith("study-rooms"))
        assertTrue(request.body.readUtf8().contains("\"secondsPerQuestion\":90"))
    }

    @Test fun roomParsesMembersAndMyAnswersFromTheNestedPayload() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"room":${roomJson(status = "running")}}"""))
        val room = api.room("r1")

        assertEquals("running", room.status)
        assertEquals(1, room.members.size)
        assertEquals("Sam", room.members.single().displayName)
        assertEquals(1, room.myAnswers.size)
        assertTrue(room.myAnswers.single().correct)
    }

    @Test fun submitRoomAnswerPostsToTheAnswersPath() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"ok":true,"correct":true,"correctIndex":1}"""))
        val result = api.submitRoomAnswer("r1", RoomAnswerBody(questionId = "q1", chosenIndex = 1, seconds = 12))

        assertTrue(server.takeRequest().path!!.endsWith("study-rooms/r1/answers"))
        assertEquals(true, result.correct)
    }

    @Test fun challengeParsesTheResultOnceBothSidesHaveFinished() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """{"challenge":{"id":"c1","challengerId":"u1","opponentId":"u2","status":"complete","myRole":"challenger",
                    "myFinished":true,"opponentFinished":true,
                    "result":{"challenger":{"correct":8,"answered":10,"seconds":300},"opponent":{"correct":6,"answered":10,"seconds":250},
                              "questions":[{"questionId":"q1","challengerCorrect":true,"opponentCorrect":false}]}}}"""
            )
        )
        val challenge = api.challenge("c1")

        assertEquals("complete", challenge.status)
        assertEquals(8, challenge.result?.challenger?.correct)
        assertEquals(1, challenge.result?.questions?.size)
    }

    @Test fun respondToChallengePostsAcceptInTheBody() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"ok":true}"""))
        api.respondToChallenge("c1", accept = true)

        val request = server.takeRequest()
        assertTrue(request.path!!.endsWith("challenges/c1/respond"))
        assertTrue(request.body.readUtf8().contains("\"accept\":true"))
    }

    @Test fun friendsParsesIncomingAndOutgoingRequests() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """{"friends":[{"userId":"u2","displayName":"Sam"}],
                    "requests":{"incoming":[{"userId":"u3","displayName":"Ali"}],"outgoing":[]}}"""
            )
        )
        val response = api.friends()

        assertEquals(1, response.friends.size)
        assertEquals(1, response.requests.incoming.size)
        assertTrue(response.requests.outgoing.isEmpty())
    }

    @Test fun directorySendsTheQueryAsAQueryParam() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"people":[]}"""))
        api.directory("sam")
        assertTrue(server.takeRequest().path!!.contains("friends/directory?q=sam"))
    }

    @Test fun maps401ToUnauthorized() = runTest {
        server.enqueue(MockResponse().setResponseCode(401).setBody("{}"))
        val error = runCatching { api.myRooms() }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Unauthorized)
    }

    @Test fun maps404ToRetryableSoTheRepositoryLayerCanDistinguishItFromAuthFailures() = runTest {
        server.enqueue(MockResponse().setResponseCode(404).setBody("""{"error":"room not found"}"""))
        val error = runCatching { api.room("gone") }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Retryable)
    }

    private fun roomJson(status: String) = """
        {"id":"r1","code":"ABC123","name":"Shared test","hostUserId":"u1","isHost":true,"status":"$status",
         "timed":true,"secondsPerQuestion":90,"questionCount":2,"questionIds":["q1","q2"],"resultsOpen":false,
         "members":[{"userId":"u2","displayName":"Sam","finished":false,"answered":1,"correct":null}],
         "myAnswers":[{"questionId":"q1","chosenIndex":0,"correct":true}],"myFinished":false}
    """.trimIndent()
}
