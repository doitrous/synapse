package com.synapse.app.core.api
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.encodeToString
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test
class ModelsSerializationTest {
    private val api = Json { ignoreUnknownKeys = true }

    @Test fun stateDocRoundTrips() {
        val doc = StateDoc(value = JsonPrimitive("hello"), version = 3, updatedAt = "2026-08-20T10:00:00Z")
        val json = Json.encodeToString(doc)
        val back = Json.decodeFromString<StateDoc>(json)
        assertEquals(doc, back)
    }

    // Regression: the server returns the identity nested under `user` with extra
    // fields; the old flat `userId` DTO threw MissingFieldException and failed the
    // /api/session confirm gate for every real sign-in.
    @Test fun sessionDeserializesNestedUserFromServer() {
        val body = """{"user":{"id":"abc-123","email":"a@b.co","role":"student","tabs":[]}}"""
        assertEquals("abc-123", api.decodeFromString<SessionDto>(body).userId)
    }

    @Test fun sessionAcceptsNullUser() {
        assertNull(api.decodeFromString<SessionDto>("""{"user":null}""").user)
    }
}
