package com.synapse.app.core.notebook

import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonArray
import kotlinx.serialization.json.putJsonObject
import java.util.UUID

/**
 * The block model the native Compose editor edits directly (`feature/notebook`),
 * translated to/from the Lexical-shaped JSON in [Note.editorJson] so a note
 * written on Android round-trips through web/iOS.
 *
 * Deliberately block-level, not span-level: [NoteEditor.tsx] on the web offers
 * inline bold/italic/strikethrough marks within a block, which this editor does
 * not yet expose (paragraphs/headings/lists only, per this task's brief). A
 * block's [NoteBlock.text] is stored as one flat text child, same shape
 * [textNode] already produces for a plain-text note — so a note authored on
 * Android is a valid (if unformatted) Lexical document, never a corrupt one.
 */
sealed interface NoteBlockType {
    data object Paragraph : NoteBlockType
    data class Heading(val level: Int) : NoteBlockType
    data object BulletItem : NoteBlockType
    data object NumberItem : NoteBlockType
}

data class NoteBlock(val id: String, val type: NoteBlockType, val text: String)

private fun newBlockId(): String = UUID.randomUUID().toString()

/** Text content of one Lexical node: its own `text`, or its children's, concatenated. */
private fun textOfNode(node: JsonObject): String {
    val text = node["text"]?.jsonPrimitive?.contentOrNull
    if (text != null) return text
    val kids = node["children"]?.jsonArray ?: return ""
    return kids.joinToString("") { child -> (child as? JsonObject)?.let(::textOfNode) ?: "" }
}

/**
 * Walk [Note.editorJson] into the flat block list the editor renders. Tolerant:
 * an unrecognised node type degrades to a plain paragraph carrying its text
 * rather than being dropped or crashing the screen — the same "never lose the
 * words" contract [normaliseNotebookEditorJson] keeps for the pure transforms.
 */
fun JsonObject?.toNoteBlocks(): List<NoteBlock> {
    val children = this?.get("root")?.jsonObject?.get("children")?.jsonArray
    if (children.isNullOrEmpty()) return listOf(NoteBlock(newBlockId(), NoteBlockType.Paragraph, ""))

    val blocks = mutableListOf<NoteBlock>()
    for (node in children) {
        val obj = node as? JsonObject ?: continue
        when (obj["type"]?.jsonPrimitive?.contentOrNull) {
            "heading" -> {
                val tagLevel = obj["tag"]?.jsonPrimitive?.contentOrNull?.removePrefix("h")?.toIntOrNull()
                val level = (tagLevel ?: obj["level"]?.jsonPrimitive?.contentOrNull?.toIntOrNull() ?: 1).coerceIn(1, 2)
                blocks += NoteBlock(newBlockId(), NoteBlockType.Heading(level), textOfNode(obj))
            }
            "list" -> {
                val ordered = obj["listType"]?.jsonPrimitive?.contentOrNull == "number" ||
                    obj["tag"]?.jsonPrimitive?.contentOrNull == "ol"
                val itemType = if (ordered) NoteBlockType.NumberItem else NoteBlockType.BulletItem
                (obj["children"]?.jsonArray).orEmpty().forEach { item ->
                    val itemObj = item as? JsonObject ?: return@forEach
                    blocks += NoteBlock(newBlockId(), itemType, textOfNode(itemObj))
                }
            }
            else -> blocks += NoteBlock(newBlockId(), NoteBlockType.Paragraph, textOfNode(obj))
        }
    }
    return blocks.ifEmpty { listOf(NoteBlock(newBlockId(), NoteBlockType.Paragraph, "")) }
}

private fun headingNode(level: Int, text: String): JsonObject = buildJsonObject {
    put("type", "heading")
    put("version", 1)
    put("tag", "h$level")
    put("level", level)
    putJsonArray("children") { if (text.isNotEmpty()) add(textNode(text)) }
    put("direction", JsonNull)
    put("format", "")
    put("indent", 0)
}

private fun listItemNode(index: Int, text: String): JsonObject = buildJsonObject {
    put("type", "listitem")
    put("version", 1)
    put("value", index + 1)
    putJsonArray("children") { if (text.isNotEmpty()) add(textNode(text)) }
    put("direction", JsonNull)
    put("format", "")
    put("indent", 0)
}

private fun listNode(ordered: Boolean, items: List<String>): JsonObject = buildJsonObject {
    put("type", "list")
    put("version", 1)
    put("listType", if (ordered) "number" else "bullet")
    put("tag", if (ordered) "ol" else "ul")
    put("ordered", ordered)
    put("start", 1)
    putJsonArray("children") { items.forEachIndexed { index, text -> add(listItemNode(index, text)) } }
    put("direction", JsonNull)
    put("format", "")
    put("indent", 0)
}

/** Encode the block list back into a Lexical-shaped [NotebookEditorJson], grouping adjacent list items of the same kind into one `list` node. */
fun List<NoteBlock>.toEditorJson(): JsonObject {
    val children = mutableListOf<JsonObject>()
    var i = 0
    while (i < size) {
        val block = this[i]
        when (val type = block.type) {
            is NoteBlockType.Paragraph -> {
                children += paragraphNode(block.text)
                i++
            }
            is NoteBlockType.Heading -> {
                children += headingNode(type.level, block.text)
                i++
            }
            NoteBlockType.BulletItem, NoteBlockType.NumberItem -> {
                val ordered = type == NoteBlockType.NumberItem
                val group = mutableListOf<String>()
                while (i < size && this[i].type == type) {
                    group += this[i].text
                    i++
                }
                children += listNode(ordered, group)
            }
        }
    }
    return buildJsonObject {
        putJsonObject("root") {
            put("type", "root")
            put("version", 1)
            putJsonArray("children") { (children.ifEmpty { listOf(paragraphNode("")) }).forEach { add(it) } }
            put("direction", JsonNull)
            put("format", "")
            put("indent", 0)
        }
    }
}

/** Plain-text fallback of a block list — used for [Note.plainText] alongside the encoded JSON. */
fun List<NoteBlock>.toPlainText(): String = joinToString("\n") { it.text }
