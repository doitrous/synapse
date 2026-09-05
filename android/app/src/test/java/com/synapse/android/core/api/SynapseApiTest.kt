package com.synapse.android.core.api

import java.time.Instant
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.JsonPrimitive
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
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

    @Test fun `qotd today decodes, keeping questionId optional and history as strings`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """{"date":"2026-08-29","questionId":"q-hf-1","answered":true,"answerIndex":1,"correct":true,"current":3,"longest":5,"history":["2026-08-29","2026-08-28"]}"""
        ))
        val today = api.qotdToday()
        assertEquals("/api/qotd/today", server.takeRequest().path)
        assertEquals("q-hf-1", today.questionId)
        assertEquals(1, today.answerIndex)
        assertEquals(3, today.current)
        assertEquals(listOf("2026-08-29", "2026-08-28"), today.history)
    }

    @Test fun `qotd today tolerates a null questionId`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """{"date":"2026-08-29","questionId":null,"answered":false,"answerIndex":null,"correct":null,"current":0,"longest":0,"history":[]}"""
        ))
        val today = api.qotdToday()
        assertNull(today.questionId)
        assertNull(today.answerIndex)
        assertNull(today.correct)
        assertTrue(today.history.isEmpty())
    }

    @Test fun `qotd answer posts questionId and answerIndex and decodes the marked result`() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"correct":false,"correctIndex":2,"current":0,"longest":5}"""))
        val result = api.qotdAnswer(questionId = "q-hf-1", answerIndex = 1)
        val request = server.takeRequest()
        assertEquals("POST", request.method)
        assertEquals("/api/qotd/answer", request.path)
        assertEquals("""{"questionId":"q-hf-1","answerIndex":1}""", request.body.readUtf8())
        assertEquals(false, result.correct)
        assertEquals(2, result.correctIndex)
    }

    @Test fun `qotd leaderboard decodes scope, rows, and viewer`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """{"scope":{"universityId":"kau","year":"Year 2"},"rows":[{"rank":1,"userId":"u1","username":"amir","profileIcon":null,"current":7,"totalCorrect":20,"totalAnswered":22}],"viewer":{"rank":4,"total":30,"current":3}}"""
        ))
        val board = api.qotdLeaderboard()
        assertEquals("kau", board.scope.universityId)
        assertEquals(1, board.rows.first().rank)
        assertEquals("amir", board.rows.first().username)
        assertNull(board.rows.first().profileIcon)
        assertEquals(4, board.viewer.rank)
    }

    @Test fun `qotd friends withhold correctness with a null until the viewer answers`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """{"date":"2026-08-29","viewerAnswered":false,"friends":[{"userId":"u2","name":"Sara","answered":true,"correct":null}]}"""
        ))
        val friends = api.qotdFriends()
        assertEquals(false, friends.viewerAnswered)
        assertEquals("Sara", friends.friends.first().name)
        assertEquals(true, friends.friends.first().answered)
        assertNull(friends.friends.first().correct)
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

    // This task's brief: "GET /api/me returns profile incl. statusMessage
    // (string|null) and aiConsentAt (ISO datetime|null)".
    @Test fun `me decodes username, profileIcon, statusMessage and aiConsentAt`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """
            {
              "user": {"id":"u1","email":"student@example.com","role":"student","aal":"aal1","mfaRequired":false},
              "profile": {"studentId":"u1","name":"Jordan Lee","email":"student@example.com","universityId":"uni-1","year":"Y3","group":"G2","status":"active","username":"jordan-lee","profileIcon":"heart","statusMessage":"on ward rotation","aiConsentAt":"2026-08-01T00:00:00.000Z"},
              "subscription": null,
              "entitlement": {"state":"none","plan":"Free","expiresAt":null,"daysLeft":null}
            }
            """.trimIndent()
        ))
        val me = api.me()

        assertEquals("jordan-lee", me.profile?.username)
        assertEquals("heart", me.profile?.profileIcon)
        assertEquals("on ward rotation", me.profile?.statusMessage)
        assertEquals(Instant.parse("2026-08-01T00:00:00Z"), me.profile?.aiConsentAt)
    }

    @Test fun `me tolerates a profile with no username, statusMessage or aiConsentAt yet`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """
            {
              "user": {"id":"u1","email":"student@example.com","role":"student","aal":"aal1","mfaRequired":false},
              "profile": {"studentId":"u1","name":"Jordan Lee","email":"student@example.com","universityId":"uni-1","year":"Y3","group":"G2","status":"active"},
              "subscription": null,
              "entitlement": {"state":"none","plan":"Free","expiresAt":null,"daysLeft":null}
            }
            """.trimIndent()
        ))
        val me = api.me()

        assertNull(me.profile?.username)
        assertNull(me.profile?.profileIcon)
        assertNull(me.profile?.statusMessage)
        assertNull(me.profile?.aiConsentAt)
    }

    @Test fun `usernameAvailable encodes the handle and decodes availability`() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"available":true}"""))
        val result = api.usernameAvailable("jordan lee")
        val request = server.takeRequest()
        assertEquals("GET", request.method)
        assertEquals("/api/me/username-available?handle=jordan+lee", request.path)
        assertEquals(true, result.available)
        assertNull(result.reason)
    }

    @Test fun `usernameAvailable surfaces the reason a handle is unavailable`() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"available":false,"reason":"taken"}"""))
        val result = api.usernameAvailable("amir")
        assertEquals(false, result.available)
        assertEquals("taken", result.reason)
    }

    @Test fun `updateEnrolment sends statusMessage even when empty, to clear it`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """{"ok":true,"profile":{"studentId":"u1","name":null,"email":null,"universityId":"uni-1","year":"Y3","group":null,"status":null}}"""
        ))
        api.updateEnrolment(universityId = "uni-1", year = "Y3", statusMessage = "")
        val request = server.takeRequest()
        assertEquals("PUT", request.method)
        assertEquals("/api/me/enrolment", request.path)
        assertEquals("""{"universityId":"uni-1","year":"Y3","statusMessage":""}""", request.body.readUtf8())
    }

    @Test fun `updateEnrolment omits a null statusMessage rather than clearing it`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """{"ok":true,"profile":{"studentId":"u1","name":null,"email":null,"universityId":"uni-1","year":"Y3","group":null,"status":null}}"""
        ))
        api.updateEnrolment(universityId = "uni-1", year = "Y3", username = "jordan-lee")
        val request = server.takeRequest()
        assertEquals("""{"universityId":"uni-1","year":"Y3","username":"jordan-lee"}""", request.body.readUtf8())
    }

    @Test fun `requestEnrollmentChange posts field, requestedValue and reason`() = runBlocking {
        server.enqueue(MockResponse().setBody("{}"))
        api.requestEnrollmentChange(field = "year", requestedValue = "Y4", reason = "Repeated the year officially")
        val request = server.takeRequest()
        assertEquals("POST", request.method)
        assertEquals("/api/me/enrollment-change-requests", request.path)
        assertEquals("""{"field":"year","requestedValue":"Y4","reason":"Repeated the year officially"}""", request.body.readUtf8())
    }

    @Test fun `submitSupport posts message and omits a null subject`() = runBlocking {
        server.enqueue(MockResponse().setBody("{}"))
        api.submitSupport(subject = null, message = "The QOTD screen won't load")
        val request = server.takeRequest()
        assertEquals("/api/me/support", request.path)
        assertEquals("""{"message":"The QOTD screen won't load"}""", request.body.readUtf8())
    }

    @Test fun `listSupport reads the tickets array`() = runBlocking {
        server.enqueue(MockResponse().setBody(
            """{"tickets":[{"id":"t1","subject":"Bug","message":"It crashed","createdAt":"2026-08-01T00:00:00.000Z","status":"open"}]}"""
        ))
        val tickets = api.listSupport()
        assertEquals(1, tickets.size)
        assertEquals("t1", tickets.first().id)
        assertEquals("Bug", tickets.first().subject)
        assertEquals("open", tickets.first().status)
    }

    @Test fun `listSupport tolerates a shape it doesn't recognise rather than throwing`() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"somethingElse":[1,2,3]}"""))
        val tickets = api.listSupport()
        assertTrue(tickets.isEmpty())
    }

    @Test fun `consentAi posts and decodes the stamped timestamp`() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"aiConsentAt":"2026-08-01T00:00:00.000Z"}"""))
        val at = api.consentAi()
        val request = server.takeRequest()
        assertEquals("POST", request.method)
        assertEquals("/api/me/consent/ai", request.path)
        assertEquals(Instant.parse("2026-08-01T00:00:00Z"), at)
    }

    @Test fun `deleteAccount issues a DELETE to api-account`() = runBlocking {
        server.enqueue(MockResponse().setBody("{}"))
        api.deleteAccount()
        val request = server.takeRequest()
        assertEquals("DELETE", request.method)
        assertEquals("/api/account", request.path)
    }

    @Test fun `joinParty posts the upper-cased code and decodes the party with members`() = runBlocking {
        server.enqueue(
            MockResponse().setBody(
                """{"ok":true,"party":{"id":"p1","code":"ABC123","name":"Anatomy crew","members":[
                    {"userId":"u1","displayName":"Sara","role":"host","activity":"studying"},
                    {"userId":"u2","displayName":"Omar","role":"member","activity":"idle"}]}}""",
            ),
        )
        val result = api.joinParty("abc123")
        val request = server.takeRequest()
        assertEquals("POST", request.method)
        assertEquals("/api/parties/join", request.path)
        assertTrue(request.body.readUtf8().contains("\"ABC123\""))
        assertTrue(result.ok)
        assertEquals("Anatomy crew", result.party?.name)
        assertEquals(2, result.party?.members?.size)
        assertEquals("Sara", result.party?.members?.first()?.displayName)
    }

    @Test fun `joinParty surfaces a refusal as ok false with a reason`() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"ok":false,"reason":"wrong_cohort"}"""))
        val result = api.joinParty("ZZZZZZ")
        assertFalse(result.ok)
        assertEquals("wrong_cohort", result.reason)
        assertNull(result.party)
    }
}
