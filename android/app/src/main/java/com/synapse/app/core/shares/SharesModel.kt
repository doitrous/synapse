package com.synapse.app.core.shares

import com.synapse.app.core.notebook.Note
import com.synapse.app.core.notebook.editorJsonToPlainText
import com.synapse.app.core.notebook.notePlainText
import com.synapse.app.core.whiteboard.BoardState
import com.synapse.app.core.whiteboard.WhiteboardCodec
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.add
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.encodeToJsonElement
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonArray

/**
 * Pure helpers for turning a local Notebook note or Whiteboard board into a
 * share payload, and back — kept apart from `feature/shares` so they can be
 * unit-tested with no repository/network involved, matching
 * `core/whiteboard/WhiteboardModel.kt`'s split from its own feature package.
 *
 * A share is a **copy**: publishing a note snapshots its text into the wire
 * shape web's `ShareDialog.tsx`/`SharedDocument.tsx` call `SharedNote`
 * (`title`, `plainText`, `editorJson`, `tags`) — the local
 * [com.synapse.app.core.notebook.Note] stays independent, matching that
 * doc comment's "the student's private source remains independent" note. A
 * whiteboard share's payload is the [BoardState] itself, verbatim — the same
 * shape `SharedBoardView.tsx` renders.
 */

object ShareKind {
    const val NOTE = "note"
    const val WHITEBOARD = "whiteboard"
}

/** `private`: only the owner. `view`/`edit` links stay inside the owner's cohort — see `sharePolicy.js`. */
object ShareAccess {
    const val PRIVATE = "private"
    const val VIEW = "view"
    const val EDIT = "edit"
}

/**
 * Matches web's `SHARE_INDEX_STORAGE_KEY` exactly. Maps a local handle (which
 * note or board) to the live share id publishing it created, purely so
 * re-publishing the same document updates that link instead of minting a
 * second one nobody has — the list of shares itself is never read from here;
 * `GET /api/shares/mine` is the source of truth (see `SharesRepository`).
 */
const val SHARE_INDEX_KEY = "synapse.account.shares.v1"

/** `note:<id>` for a Notebook note. Matches web's handle for a note exactly. */
fun noteShareHandle(noteId: String): String = "note:$noteId"

/**
 * `board:<id>` for a Whiteboard board. Web only ever had one whiteboard, so
 * its handle is the bare string `"board"`; Android's multi-board collection
 * needs one handle per board, so each carries its own id. This never collides
 * with web's key — an extra map entry a single-board web build never looks up
 * is harmless — and a board shared from Android still opens correctly on
 * web/iOS, which read the *share* itself, not this local index.
 */
fun boardShareHandle(boardId: String): String = "board:$boardId"

/** The `payload` field `POST /api/shares` / `PUT /api/shares/:id` expects for a note share. */
fun notePayload(note: Note): JsonElement = buildJsonObject {
    put("title", note.title.ifBlank { "Untitled" })
    put("plainText", notePlainText(note.plainText, note.editorJson))
    note.editorJson?.let { put("editorJson", it) }
    putJsonArray("tags") { note.tags.forEach { add(it) } }
}

/** The `payload` field for a whiteboard share — the board state, verbatim. */
fun boardPayload(json: Json, board: BoardState): JsonElement = json.encodeToJsonElement(BoardState.serializer(), board)

/**
 * Best-effort plain text out of a note share's payload, matching web's
 * `SharedNotePreview` fallback chain: `plainText ?? editorJsonToPlainText(editorJson) ?? body ?? ""`.
 * Never throws — an unreadable payload reads as an empty note rather than
 * failing to open the share at all.
 */
fun sharedNoteText(payload: JsonElement): String {
    val obj = payload as? JsonObject ?: return ""
    val plainText = obj["plainText"]?.jsonPrimitive?.contentOrNull
    if (!plainText.isNullOrEmpty()) return plainText
    val editorJson = obj["editorJson"] as? JsonObject
    if (editorJson != null) {
        val fromEditor = editorJsonToPlainText(editorJson)
        if (fromEditor.isNotEmpty()) return fromEditor
    }
    return obj["body"]?.jsonPrimitive?.contentOrNull.orEmpty()
}

/**
 * Tolerant decode of a whiteboard share's payload. Reuses [WhiteboardCodec]'s
 * element-by-element decode (round-tripped through its string form) rather
 * than a second parallel decoder, so one malformed note in somebody else's
 * board still can't hide the rest of it — matching that object's own doc
 * comment on why a plain `decodeFromString` is unsafe here.
 */
fun sharedBoardState(json: Json, payload: JsonElement): BoardState =
    WhiteboardCodec.decodeLegacyBoard(json, json.encodeToString(JsonElement.serializer(), payload)) ?: BoardState()
