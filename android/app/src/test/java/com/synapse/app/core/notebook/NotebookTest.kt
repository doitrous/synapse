package com.synapse.app.core.notebook

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Test vectors ported verbatim from `src/data/notebook.test.ts` so Android's
 * pure notebook transforms stay numerically/structurally identical to web's.
 */
class NotebookTest {

    private val json = Json { ignoreUnknownKeys = true }

    // "legacy markdown is preserved but its formatting marks do not enter the readable editor"
    @Test
    fun legacyMarkdownIsPreservedButItsFormattingMarksDoNotEnterTheReadableEditor() {
        val note = Note(
            id = "legacy",
            title = "Legacy",
            body = "# Heading\n- Point\n> Quote",
            updatedAt = "2026-01-01T00:00:00.000Z",
        )

        val migrated = ensureNotebookEditor(note)

        assertEquals(note.body, migrated.legacyMarkdownSource)
        assertEquals("Heading\nPoint\nQuote", editorJsonToPlainText(migrated.editorJson))
    }

    // "new text produces a Lexical-compatible serialised root"
    @Test
    fun newTextProducesALexicalCompatibleSerialisedRoot() {
        val state = plainTextToEditorJson("First\nSecond")

        assertEquals("root", state["root"]!!.jsonObject["type"]!!.jsonPrimitive.content)
        assertEquals(1, state["root"]!!.jsonObject["version"]!!.jsonPrimitive.content.toInt())
        val firstChild = state["root"]!!.jsonObject["children"]!!.jsonArray[0].jsonObject
        assertEquals("paragraph", firstChild["type"]!!.jsonPrimitive.content)
        assertEquals("text", firstChild["children"]!!.jsonArray[0].jsonObject["type"]!!.jsonPrimitive.content)
        assertEquals("First\nSecond", editorJsonToPlainText(state))
    }

    // "the temporary block JSON migrates lazily without losing its words"
    @Test
    fun theTemporaryBlockJsonMigratesLazilyWithoutLosingItsWords() {
        val old = json.parseToJsonElement(
            """
            {
              "root": {
                "type": "root", "version": 1,
                "children": [
                  { "type": "heading", "version": 1, "text": "Clinical sequence" },
                  { "type": "paragraph", "version": 1, "text": "Assess airway first." }
                ]
              }
            }
            """.trimIndent(),
        ).jsonObject

        val next = normaliseNotebookEditorJson(old)

        assertEquals("Clinical sequence\nAssess airway first.", editorJsonToPlainText(next))
        val children = next["root"]!!.jsonObject["children"]!!.jsonArray
        assertTrue(children.all { (it as JsonObject)["children"] != null })
    }
}
