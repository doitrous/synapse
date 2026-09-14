package com.synapse.app.core.whiteboard

import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * A malformed element inside a board's arrays must not take down the whole
 * document — see [WhiteboardCodec]'s doc. These vectors aren't in the TS/iOS
 * suites (tolerant decode is an Android-specific mandate, not a ported behaviour).
 */
class WhiteboardCodecTest {

    private val json = Json { ignoreUnknownKeys = true }

    @Test
    fun `unparseable JSON decodes to null rather than throwing`() {
        assertNull(WhiteboardCodec.decodeCollection(json, "not json at all"))
        assertNull(WhiteboardCodec.decodeLegacyBoard(json, "{"))
    }

    @Test
    fun `a note missing a required field is dropped, its siblings and the rest of the board survive`() {
        val raw = """
            {
              "activeBoardId": "default",
              "boards": [
                {
                  "id": "default", "title": "Board", "ownerId": "u1", "ownerName": "Mona",
                  "universityId": "asu", "year": "Year 3", "revision": 1, "updatedAt": "2026-08-24T00:00:00Z",
                  "state": {
                    "notes": [
                      {"id": "n1", "x": 1.0, "y": 2.0, "text": "good", "tone": "paper"},
                      {"x": 5.0, "y": 6.0, "text": "missing id"},
                      {"id": "n2", "x": 3.0, "y": 4.0, "text": "also good", "tone": "amber"}
                    ],
                    "links": [], "frames": []
                  }
                }
              ]
            }
        """.trimIndent()

        val collection = WhiteboardCodec.decodeCollection(json, raw)
        assertNotNull(collection)
        val board = collection!!.boards.single()
        assertEquals(listOf("n1", "n2"), board.state.notes.map { it.id })
        assertEquals("default", collection.activeBoardId)
    }

    @Test
    fun `a board missing its state decodes with an empty board rather than failing entirely`() {
        val raw = """{"activeBoardId":"a","boards":[{"id":"a","title":"A","ownerId":"u","ownerName":"N","universityId":"","year":"","revision":1,"updatedAt":"2026-08-24T00:00:00Z"}]}"""
        val collection = WhiteboardCodec.decodeCollection(json, raw)
        assertNotNull(collection)
        assertTrue(collection!!.boards.single().state.notes.isEmpty())
    }

    @Test
    fun `a legacy single board round-trips through the tolerant decoder`() {
        val raw = """{"notes":[{"id":"n1","x":1.5,"y":2.5,"text":"t","tone":"paper"}],"links":[],"frames":[]}"""
        val board = WhiteboardCodec.decodeLegacyBoard(json, raw)
        assertEquals(1, board?.notes?.size)
        assertEquals(1.5, board?.notes?.get(0)?.x)
    }
}
