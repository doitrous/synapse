package com.synapse.app.core.shares

import com.synapse.app.core.notebook.Note
import com.synapse.app.core.notebook.plainTextToEditorJson
import com.synapse.app.core.whiteboard.BoardState
import com.synapse.app.core.whiteboard.Note as BoardNote
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class SharesModelTest {

    private val json = Json { ignoreUnknownKeys = true }

    // --- handles -------------------------------------------------------------

    @Test
    fun noteShareHandleIsPrefixedWithNote() {
        assertEquals("note:abc-123", noteShareHandle("abc-123"))
    }

    @Test
    fun boardShareHandleIsPrefixedWithBoard() {
        assertEquals("board:default", boardShareHandle("default"))
    }

    // --- notePayload -----------------------------------------------------------

    @Test
    fun notePayloadCarriesTitlePlainTextAndTags() {
        val note = Note(id = "n1", title = "Cardio", plainText = "Two heart sounds", tags = listOf("exam"))

        val payload = notePayload(note).jsonObject

        assertEquals("Cardio", payload["title"]?.jsonPrimitive?.content)
        assertEquals("Two heart sounds", payload["plainText"]?.jsonPrimitive?.content)
        assertEquals(listOf("exam"), payload["tags"]?.jsonArray?.map { it.jsonPrimitive.content })
    }

    @Test
    fun notePayloadFallsBackToUntitledForABlankTitle() {
        val note = Note(id = "n1", title = "  ", plainText = "x")
        assertEquals("Untitled", notePayload(note).jsonObject["title"]?.jsonPrimitive?.content)
    }

    @Test
    fun notePayloadDerivesPlainTextFromEditorJsonWhenPlainTextIsAbsent() {
        val editorJson = plainTextToEditorJson("From the editor")
        val note = Note(id = "n1", title = "T", plainText = null, editorJson = editorJson)

        val payload = notePayload(note).jsonObject

        assertEquals("From the editor", payload["plainText"]?.jsonPrimitive?.content)
    }

    // --- sharedNoteText ----------------------------------------------------------

    @Test
    fun sharedNoteTextPrefersPlainText() {
        val payload = buildJsonObject { put("plainText", "Plain"); put("body", "Body") }
        assertEquals("Plain", sharedNoteText(payload))
    }

    @Test
    fun sharedNoteTextFallsBackToEditorJsonWhenPlainTextIsMissing() {
        val payload = buildJsonObject { put("editorJson", plainTextToEditorJson("From editor")) }
        assertEquals("From editor", sharedNoteText(payload))
    }

    @Test
    fun sharedNoteTextFallsBackToBodyWhenNothingElseIsPresent() {
        val payload = buildJsonObject { put("body", "Legacy body") }
        assertEquals("Legacy body", sharedNoteText(payload))
    }

    @Test
    fun sharedNoteTextIsEmptyForAnUnreadablePayload() {
        assertEquals("", sharedNoteText(JsonNull))
    }

    // --- sharedBoardState --------------------------------------------------------

    @Test
    fun sharedBoardStateDecodesANoteRoundTrippedThroughBoardPayload() {
        val board = BoardState(notes = listOf(BoardNote(id = "note-1", x = 10.0, y = 20.0, text = "Hi")))

        val decoded = sharedBoardState(json, boardPayload(json, board))

        assertEquals(1, decoded.notes.size)
        assertEquals("Hi", decoded.notes.single().text)
    }

    @Test
    fun sharedBoardStateIsEmptyForAnUnreadablePayload() {
        val decoded = sharedBoardState(json, JsonPrimitive("not a board"))
        assertTrue(decoded.notes.isEmpty())
    }
}
