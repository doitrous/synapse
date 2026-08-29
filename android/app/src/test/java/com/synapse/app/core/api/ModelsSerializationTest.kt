package com.synapse.app.core.api
import com.synapse.app.core.model.StateDoc
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.encodeToString
import org.junit.Assert.assertEquals
import org.junit.Test
class ModelsSerializationTest {
    @Test fun stateDocRoundTrips() {
        val doc = StateDoc(value = JsonPrimitive("hello"), version = 3, updatedAt = "2026-08-20T10:00:00Z")
        val json = Json.encodeToString(doc)
        val back = Json.decodeFromString<StateDoc>(json)
        assertEquals(doc, back)
    }
}
