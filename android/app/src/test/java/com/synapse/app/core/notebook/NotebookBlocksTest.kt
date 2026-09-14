package com.synapse.app.core.notebook

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class NotebookBlocksTest {

    @Test
    fun emptyDocumentDecodesToOneEmptyParagraph() {
        val blocks = (null as JsonObject?).toNoteBlocks()
        assertEquals(1, blocks.size)
        assertEquals(NoteBlockType.Paragraph, blocks.single().type)
        assertEquals("", blocks.single().text)
    }

    @Test
    fun paragraphsAndHeadingsRoundTripThroughEditorJson() {
        val blocks = listOf(
            NoteBlock("1", NoteBlockType.Heading(1), "Heart failure"),
            NoteBlock("2", NoteBlockType.Paragraph, "Reduced ejection fraction."),
        )

        val decoded = blocks.toEditorJson().toNoteBlocks()

        assertEquals(2, decoded.size)
        assertEquals(NoteBlockType.Heading(1), decoded[0].type)
        assertEquals("Heart failure", decoded[0].text)
        assertEquals(NoteBlockType.Paragraph, decoded[1].type)
        assertEquals("Reduced ejection fraction.", decoded[1].text)
    }

    @Test
    fun adjacentBulletItemsGroupIntoOneListNodeAndUngroupBackToTheSameItems() {
        val blocks = listOf(
            NoteBlock("1", NoteBlockType.BulletItem, "Assess airway"),
            NoteBlock("2", NoteBlockType.BulletItem, "Assess breathing"),
        )

        val editorJson = blocks.toEditorJson()
        val listNode = editorJson["root"]!!.jsonObject["children"]!!.jsonArray.single().jsonObject
        assertEquals("list", listNode["type"]!!.jsonPrimitive.content)

        val decoded = editorJson.toNoteBlocks()
        assertEquals(listOf("Assess airway", "Assess breathing"), decoded.map { it.text })
        assertTrue(decoded.all { it.type == NoteBlockType.BulletItem })
    }

    @Test
    fun numberedListsRoundTripSeparatelyFromBulletLists() {
        val blocks = listOf(
            NoteBlock("1", NoteBlockType.NumberItem, "First"),
            NoteBlock("2", NoteBlockType.NumberItem, "Second"),
        )

        val decoded = blocks.toEditorJson().toNoteBlocks()

        assertTrue(decoded.all { it.type == NoteBlockType.NumberItem })
        assertEquals(listOf("First", "Second"), decoded.map { it.text })
    }

    @Test
    fun anUnrecognisedNodeTypeDegradesToAPlainParagraphRatherThanCrashingOrDroppingWords() {
        val json = Json.parseToJsonElement(
            """{"root":{"type":"root","version":1,"children":[
                {"type":"quote","version":1,"children":[{"type":"text","version":1,"text":"A quote"}]}
            ]}}""",
        ).jsonObject

        val blocks = json.toNoteBlocks()

        assertEquals(1, blocks.size)
        assertEquals(NoteBlockType.Paragraph, blocks.single().type)
        assertEquals("A quote", blocks.single().text)
    }
}
