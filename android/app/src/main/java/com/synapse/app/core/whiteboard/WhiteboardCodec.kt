package com.synapse.app.core.whiteboard

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/**
 * Tolerant decode for a persisted whiteboard document.
 *
 * A board is the one surface where a single malformed element — a note some other
 * client wrote a stray field into, a link a future feature adds a variant of —
 * must not take down the whole document. A plain `Json.decodeFromString` fails the
 * *entire* array the moment one element doesn't fit the shape kotlinx.serialization
 * expects, so every list here is decoded element-by-element instead: an element
 * that won't parse is dropped, not the whole board.
 *
 * Encoding needs none of this — this app is always the one producing the well-formed
 * shape — so [WhiteboardRepository][com.synapse.app.feature.whiteboard.WhiteboardRepository]
 * writes with a plain `json.encodeToString`.
 */
object WhiteboardCodec {

    private const val FALLBACK_UPDATED_AT = "1970-01-01T00:00:00Z"

    fun decodeCollection(json: Json, raw: String): WhiteboardCollection? {
        val root = runCatching { json.parseToJsonElement(raw).jsonObject }.getOrNull() ?: return null
        val boards = tolerantList(root["boards"]) { decodeDocument(json, it) }
        val sharedBoards = tolerantList(root["sharedBoards"]) { decodeDocument(json, it) }
        val activeBoardId = root["activeBoardId"]?.jsonPrimitive?.contentOrNull ?: boards.firstOrNull()?.id ?: "default"
        val migrated = root["migratedFromSingleBoard"]?.jsonPrimitive?.booleanOrNull ?: false
        return WhiteboardCollection(activeBoardId, boards, sharedBoards, migrated)
    }

    fun decodeLegacyBoard(json: Json, raw: String): BoardState? {
        val root = runCatching { json.parseToJsonElement(raw).jsonObject }.getOrNull() ?: return null
        return decodeBoardState(json, root)
    }

    private fun decodeDocument(json: Json, element: JsonElement): WhiteboardDocument? {
        val obj = element as? JsonObject ?: return null
        val id = obj["id"]?.jsonPrimitive?.contentOrNull ?: return null
        val state = (obj["state"] as? JsonObject)?.let { decodeBoardState(json, it) } ?: INITIAL_BOARD
        return WhiteboardDocument(
            id = id,
            title = obj["title"]?.jsonPrimitive?.contentOrNull ?: "Untitled board",
            state = state,
            ownerId = obj["ownerId"]?.jsonPrimitive?.contentOrNull ?: "",
            ownerName = obj["ownerName"]?.jsonPrimitive?.contentOrNull ?: "",
            universityId = obj["universityId"]?.jsonPrimitive?.contentOrNull ?: "",
            year = obj["year"]?.jsonPrimitive?.contentOrNull ?: "",
            permission = obj["permission"]?.jsonPrimitive?.contentOrNull ?: WhiteboardPermission.OWNER,
            collaborators = tolerantList(obj["collaborators"]) { el ->
                runCatching { json.decodeFromJsonElement(WhiteboardCollaborator.serializer(), el) }.getOrNull()
            },
            topics = tolerantStrings(obj["topics"]),
            stars = tolerantStrings(obj["stars"]),
            follows = tolerantStrings(obj["follows"]),
            revision = obj["revision"]?.jsonPrimitive?.intOrNull ?: 1,
            updatedAt = obj["updatedAt"]?.jsonPrimitive?.contentOrNull ?: FALLBACK_UPDATED_AT,
        )
    }

    private fun decodeBoardState(json: Json, obj: JsonObject): BoardState = BoardState(
        notes = tolerantList(obj["notes"]) { el -> runCatching { json.decodeFromJsonElement(Note.serializer(), el) }.getOrNull() },
        links = tolerantList(obj["links"]) { el -> runCatching { json.decodeFromJsonElement(LinkLine.serializer(), el) }.getOrNull() },
        frames = tolerantList(obj["frames"]) { el -> runCatching { json.decodeFromJsonElement(Frame.serializer(), el) }.getOrNull() },
        images = obj["images"]?.let { arr -> tolerantList(arr) { el -> runCatching { json.decodeFromJsonElement(BoardImage.serializer(), el) }.getOrNull() } },
        files = obj["files"]?.let { arr -> tolerantList(arr) { el -> runCatching { json.decodeFromJsonElement(BoardFile.serializer(), el) }.getOrNull() } },
        ink = obj["ink"]?.let { arr -> tolerantList(arr) { el -> runCatching { json.decodeFromJsonElement(InkStroke.serializer(), el) }.getOrNull() } },
    )

    private fun tolerantStrings(element: JsonElement?): List<String> =
        (element as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList()

    private fun <T> tolerantList(element: JsonElement?, decode: (JsonElement) -> T?): List<T> =
        (element as? JsonArray)?.mapNotNull(decode) ?: emptyList()
}
