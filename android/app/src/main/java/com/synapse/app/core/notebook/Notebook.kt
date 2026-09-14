package com.synapse.app.core.notebook

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonArray
import kotlinx.serialization.json.putJsonObject

/**
 * The student's own notes. Direct port of `src/data/notebook.ts`'s `Note` —
 * same fields, same storage key (`synapse.notebook.notes`), one array
 * rewritten whole (matching web's `usePersistentState` and iOS's
 * `NotebookModel`, which stores the same array under the same key rather than
 * a per-note document; there is no `synapse.notebook.<id>` key on either
 * client).
 *
 * [editorJson] is kept as a raw [JsonObject] rather than a typed node tree —
 * see the doc comment on [textNode] for why: iOS's typed `Note` struct drops
 * every field it doesn't declare the moment it rewrites the array, silently
 * erasing `editorJson`/`imageDocumentId`/etc. from notes it merely echoes
 * back. A raw-JSON field can't make that mistake: an unknown grandchild
 * attribute a future web change adds survives every Android read-modify-write
 * untouched.
 */
@Serializable
data class Note(
    val id: String,
    val title: String = "",
    /** Legacy markdown body. See [ensureNotebookEditor]. */
    val body: String = "",
    val editorJson: JsonObject? = null,
    val plainText: String? = null,
    val legacyMarkdownSource: String? = null,
    val revision: Int? = null,
    val tags: List<String> = emptyList(),
    val subtopicId: String? = null,
    val subtopicTitle: String? = null,
    val subjectId: String? = null,
    /** Managed student-owned media for newly pasted images. Not yet writable from Android — see `feature/notebook/NotebookScreen.kt`. */
    val imageDocumentId: String? = null,
    /** Legacy inline image data URL. Not yet writable from Android. */
    val imageData: String? = null,
    val resourceRefs: List<NoteResourceRef>? = null,
    /** ISO timestamp of the last edit. Defaulted (never absent in practice) so one note missing it can't fail decoding the whole list. */
    val updatedAt: String = "",
)

@Serializable
data class NoteResourceRef(
    val resourceId: String,
    val page: Int? = null,
    val label: String = "",
)

// --- Pure transforms, ported 1:1 from src/data/notebook.ts -----------------
// Test vectors carried over verbatim in NotebookTest.kt from notebook.test.ts.

/** `textNode` from notebook.ts. */
fun textNode(text: String): JsonObject = buildJsonObject {
    put("type", "text")
    put("version", 1)
    put("text", text)
    put("detail", 0)
    put("format", 0)
    put("mode", "normal")
    put("style", "")
}

/** `paragraphNode` from notebook.ts. */
fun paragraphNode(text: String): JsonObject = buildJsonObject {
    put("type", "paragraph")
    put("version", 1)
    putJsonArray("children") { if (text.isNotEmpty()) add(textNode(text)) }
    put("direction", JsonNull)
    put("format", "")
    put("indent", 0)
    put("textFormat", 0)
    put("textStyle", "")
}

private val bulletPrefix = Regex("^[-*]\\s+")
private val numberedPrefix = Regex("^\\d+\\.\\s+")

/**
 * `plainTextToEditorJson` from notebook.ts. Old markdown formatting marks are
 * stripped down to plain paragraph text — the rich-text state receives only
 * the readable words, never the marks; the source markdown is preserved
 * separately as [Note.legacyMarkdownSource].
 */
fun plainTextToEditorJson(text: String): JsonObject {
    val lines = text.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    val blocks = lines.map { line ->
        val trimmed = line.trim()
        when {
            trimmed.startsWith("## ") -> paragraphNode(trimmed.removePrefix("## ").trim())
            trimmed.startsWith("# ") -> paragraphNode(trimmed.removePrefix("# ").trim())
            trimmed.startsWith("> ") -> paragraphNode(trimmed.removePrefix("> ").trim())
            bulletPrefix.containsMatchIn(trimmed) -> paragraphNode(trimmed.replaceFirst(bulletPrefix, ""))
            numberedPrefix.containsMatchIn(trimmed) -> paragraphNode(trimmed.replaceFirst(numberedPrefix, ""))
            else -> paragraphNode(line)
        }
    }
    return buildJsonObject {
        putJsonObject("root") {
            put("type", "root")
            put("version", 1)
            putJsonArray("children") { (blocks.ifEmpty { listOf(paragraphNode("")) }).forEach { add(it) } }
            put("direction", JsonNull)
            put("format", "")
            put("indent", 0)
        }
    }
}

/** `editorJsonToPlainText` from notebook.ts. */
fun editorJsonToPlainText(editorJson: JsonObject?): String {
    val children = editorJson?.get("root")?.jsonObject?.get("children")?.jsonArray
    if (children.isNullOrEmpty()) return ""
    fun textOf(node: JsonObject): String {
        val text = node["text"]?.jsonPrimitive?.contentOrNull
        if (text != null) return text
        val kids = node["children"]?.jsonArray ?: return ""
        return kids.joinToString("") { child -> (child as? JsonObject)?.let(::textOf) ?: "" }
    }
    return children.joinToString("\n") { child -> (child as? JsonObject)?.let(::textOf) ?: "" }
}

/** Convert the worker-era block JSON into Lexical's serialised editor state. Direct port of `normaliseNotebookEditorJson`. */
fun normaliseNotebookEditorJson(editorJson: JsonObject): JsonObject {
    val first = editorJson["root"]?.jsonObject?.get("children")?.jsonArray?.firstOrNull() as? JsonObject
    if (first == null || first["children"]?.jsonArray != null) return editorJson
    return plainTextToEditorJson(editorJsonToPlainText(editorJson))
}

/**
 * `notePlainText` from notebook.ts. The web source also falls back to `body`
 * after `editorJsonToPlainText`, but that fallback is unreachable there too —
 * `editorJsonToPlainText` never returns `undefined`/`null` (only possibly an
 * empty string, which JS's `??` does not treat as absent) — so it is omitted
 * here rather than ported as dead code.
 */
fun notePlainText(plainText: String?, editorJson: JsonObject?): String =
    plainText ?: editorJsonToPlainText(editorJson)

/** `ensureNotebookEditor` from notebook.ts. */
fun ensureNotebookEditor(note: Note): Note {
    if (note.editorJson != null && note.plainText != null) return note
    val source = note.body
    return note.copy(
        editorJson = plainTextToEditorJson(source),
        plainText = source.replace("\r\n", "\n").replace("\r", "\n"),
        legacyMarkdownSource = note.legacyMarkdownSource ?: source,
        revision = note.revision ?: 1,
    )
}

/** `editorJsonFromPlainText` from notebook.ts (the `previous` parameter is unused there too). */
fun editorJsonFromPlainText(text: String): JsonObject = plainTextToEditorJson(text)
