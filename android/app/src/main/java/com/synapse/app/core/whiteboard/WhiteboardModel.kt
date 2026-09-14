package com.synapse.app.core.whiteboard

import kotlinx.serialization.Serializable
import java.time.Instant

/**
 * What a whiteboard is made of.
 *
 * A 1:1 port of `src/data/whiteboard.ts` (see `whiteboard.test.ts`, ported verbatim
 * as [WhiteboardModelTest]). Kept apart from the editor screen so the persisted
 * document shape is the single description both the canvas and (eventually) any
 * read-only viewer draw from — matching why the web keeps it in its own module.
 *
 * `tone` on [Note], `kind` on [BoardFile] and `permission` on [WhiteboardDocument]/
 * [WhiteboardCollaborator] are kept as plain strings rather than Kotlin enums —
 * exactly iOS's choice for `tone` (see `Whiteboard.swift`'s `BoardNote.tone` doc) —
 * so a value introduced on web/iOS never makes a whole board undecodable here.
 */

@Serializable
data class Note(
    val id: String,
    val x: Double,
    val y: Double,
    val text: String = "",
    val tone: String = "paper",
)

/**
 * A connector between two notes.
 *
 * [c1]/[c2] are null on purpose: null means "use the automatic curve", which is
 * what every link on an existing board has, so none of them change. Present means
 * the student bent it, and their bend is what is drawn.
 */
@Serializable
data class LinkLine(
    val id: String,
    val from: String,
    val to: String,
    val c1: Point? = null,
    val c2: Point? = null,
)

@Serializable
data class Frame(
    val id: String,
    val x: Double,
    val y: Double,
    val width: Double,
    val height: Double,
    val title: String,
)

/**
 * A picture on the board.
 *
 * [documentId] is the managed media/document reference newly-added images use;
 * legacy boards may still carry [src] (an inline data URL or older stored-media
 * reference). This surface renders a placeholder tile for either — resolving
 * either field to actual pixels needs the document/media reader pipeline, which
 * is out of scope here — but both fields round-trip untouched on save, and a
 * newly placed image is not yet supported (see [com.synapse.app.feature.whiteboard.WhiteboardRepository]).
 */
@Serializable
data class BoardImage(
    val id: String,
    val x: Double,
    val y: Double,
    val width: Double,
    val height: Double,
    val documentId: String? = null,
    val src: String? = null,
    val alt: String = "",
    val sizeBytes: Long? = null,
)

/**
 * A file pinned to the board. Rendered as a placeholder tile with its name/size —
 * opening it needs the document reader pipeline, out of scope here; the reference
 * round-trips untouched.
 */
@Serializable
data class BoardFile(
    val id: String,
    val x: Double,
    val y: Double,
    val documentId: String,
    val name: String,
    val sizeBytes: Long,
    val kind: String,
)

/** One freehand line, as a flat `x, y, x, y…` list in board coordinates. */
@Serializable
data class InkStroke(
    val id: String,
    val points: List<Double>,
    val color: String,
    val width: Double,
)

/**
 * Everything on a board.
 *
 * [images]/[files]/[ink] are nullable so every board saved before they existed
 * still reads; [imagesOf]/[filesOf]/[inkOf] are the single place that turns a
 * missing one into an empty list, matching the TS module's accessors.
 */
@Serializable
data class BoardState(
    val notes: List<Note> = emptyList(),
    val links: List<LinkLine> = emptyList(),
    val frames: List<Frame> = emptyList(),
    val images: List<BoardImage>? = null,
    val files: List<BoardFile>? = null,
    val ink: List<InkStroke>? = null,
)

object WhiteboardPermission {
    const val OWNER = "owner"
    const val VIEW = "view"
    const val EDIT = "edit"
}

@Serializable
data class WhiteboardCollaborator(
    val userId: String,
    val username: String,
    val icon: String? = null,
    val permission: String,
)

@Serializable
data class WhiteboardDocument(
    val id: String,
    val title: String,
    val state: BoardState,
    val ownerId: String,
    val ownerName: String,
    val universityId: String,
    val year: String,
    val permission: String = WhiteboardPermission.OWNER,
    val collaborators: List<WhiteboardCollaborator> = emptyList(),
    val topics: List<String> = emptyList(),
    val stars: List<String> = emptyList(),
    val follows: List<String> = emptyList(),
    val revision: Int = 1,
    val updatedAt: String,
)

/**
 * A board's collection, whether or not it was saved before the field existed.
 *
 * [sharedBoards] mirrors the TS module's API-ready shape for boards shared by
 * other students; live collaboration/sharing (fetching and enforcing permissions
 * server-side) is a later, bespoke-REST task (M4) — this surface reads/writes the
 * field so it round-trips, and [sameAudienceSharedBoards]/[groupWhiteboardsByTopic]
 * exist for when that UI is built, but nothing here populates [sharedBoards] yet.
 */
@Serializable
data class WhiteboardCollection(
    val activeBoardId: String,
    val boards: List<WhiteboardDocument> = emptyList(),
    val sharedBoards: List<WhiteboardDocument> = emptyList(),
    val migratedFromSingleBoard: Boolean = false,
)

/** The ink colours, by id. Actual colour values are theme tokens resolved in the UI layer. */
val INK_COLOUR_IDS: List<String> = listOf("ink", "primary", "danger", "success", "warning")

/**
 * The exact CSS custom-property string web writes for each ink colour id (see
 * `INK_COLOURS` in `src/data/whiteboard.ts`). New strokes drawn on Android write
 * one of these values into [InkStroke.color] — not an Android colour resource —
 * so a stroke drawn here still resolves to the right theme colour if the same
 * board is later opened on web. [colourIdForCssVar] does the reverse for
 * rendering a stroke (from any client) here.
 */
val INK_COLOUR_CSS_VARS: Map<String, String> = INK_COLOUR_IDS.associateWith { "var(--color-$it)" }

/** Best-effort reverse lookup of [INK_COLOUR_CSS_VARS], tolerant of an unrecognised stored value. */
fun colourIdForCssVar(value: String): String =
    INK_COLOUR_CSS_VARS.entries.find { it.value == value }?.key ?: INK_COLOUR_IDS.first()

val INK_WIDTHS: List<Double> = listOf(2.0, 4.0, 8.0)

/** Default size for a placed picture, in board units. */
const val IMAGE_W = 260.0
const val FILE_W = 210.0
const val FILE_H = 78.0

/** Which whiteboard tool is active. Purely a UI concept — never persisted. */
enum class Tool { Select, Pen, Eraser }

/**
 * Eight light note colours, by the keys the web/iOS apps store. Tints rather than
 * fills, so a note reads as paper with a wash over it — resolved to actual theme
 * colours in the UI layer, exactly like [INK_COLOUR_IDS].
 */
val TONE_ORDER: List<String> = listOf("paper", "teal", "amber", "rose", "sage", "sand", "slate", "clay")

val TONE_LABEL: Map<String, String> = mapOf(
    "paper" to "Paper", "teal" to "Teal", "amber" to "Amber", "rose" to "Rose",
    "sage" to "Sage", "slate" to "Slate", "sand" to "Sand", "clay" to "Clay",
)

/**
 * A new whiteboard is empty.
 *
 * It used to be seeded with sample notes/connectors/a frame on the web — someone
 * else's diagram, written into a real student's account the first time they
 * dragged anything. Not repeated here.
 */
val INITIAL_BOARD = BoardState()

const val WHITEBOARD_COLLECTION_KEY = "synapse.whiteboard.boards.v1"
const val LEGACY_WHITEBOARD_KEY = "synapse.whiteboard.board"

/** A board's collections, whether or not it was saved before the field existed. */
fun imagesOf(board: BoardState): List<BoardImage> = board.images ?: emptyList()
fun filesOf(board: BoardState): List<BoardFile> = board.files ?: emptyList()
fun inkOf(board: BoardState): List<InkStroke> = board.ink ?: emptyList()

/** Who a board belongs to — the piece of the student's identity every new document needs. */
data class WhiteboardOwner(
    val ownerId: String,
    val ownerName: String,
    val universityId: String,
    val year: String,
)

fun createWhiteboardDocument(
    id: String,
    title: String,
    state: BoardState = INITIAL_BOARD,
    ownerId: String,
    ownerName: String,
    universityId: String,
    year: String,
    now: String = Instant.now().toString(),
): WhiteboardDocument = WhiteboardDocument(
    id = id,
    title = title,
    state = state,
    ownerId = ownerId,
    ownerName = ownerName,
    universityId = universityId,
    year = year,
    permission = WhiteboardPermission.OWNER,
    collaborators = emptyList(),
    topics = emptyList(),
    stars = emptyList(),
    follows = emptyList(),
    revision = 1,
    updatedAt = now,
)

fun emptyWhiteboardCollection(
    ownerId: String = "local-student",
    ownerName: String = "Student",
    universityId: String = "",
    year: String = "",
): WhiteboardCollection {
    val board = createWhiteboardDocument(
        id = "default", title = "Default board", state = INITIAL_BOARD,
        ownerId = ownerId, ownerName = ownerName, universityId = universityId, year = year,
    )
    return WhiteboardCollection(activeBoardId = board.id, boards = listOf(board), sharedBoards = emptyList(), migratedFromSingleBoard = false)
}

fun migrateSingleBoardToCollection(
    legacy: BoardState,
    collection: WhiteboardCollection,
    owner: WhiteboardOwner,
    now: String = Instant.now().toString(),
): WhiteboardCollection {
    if (collection.migratedFromSingleBoard) return collection
    val defaultBoard = createWhiteboardDocument(
        id = "default", title = "Default board", state = legacy,
        ownerId = owner.ownerId, ownerName = owner.ownerName, universityId = owner.universityId, year = owner.year,
        now = now,
    )
    val boards = if (collection.boards.isEmpty()) {
        listOf(defaultBoard)
    } else {
        collection.boards.mapIndexed { index, board ->
            if (index == 0) defaultBoard.copy(id = board.id, title = board.title.ifEmpty { defaultBoard.title }) else board
        }
    }
    return collection.copy(
        boards = boards,
        activeBoardId = collection.activeBoardId.ifEmpty { defaultBoard.id },
        migratedFromSingleBoard = true,
    )
}

fun activeWhiteboard(collection: WhiteboardCollection): WhiteboardDocument =
    collection.boards.find { it.id == collection.activeBoardId }
        ?: collection.boards.firstOrNull()
        ?: createWhiteboardDocument(
            id = "default", title = "Default board",
            ownerId = "local-student", ownerName = "Student", universityId = "", year = "",
        )

fun updateWhiteboardState(
    collection: WhiteboardCollection,
    id: String,
    next: BoardState,
    now: String = Instant.now().toString(),
): WhiteboardCollection = collection.copy(
    boards = collection.boards.map { board ->
        if (board.id == id) board.copy(state = next, revision = board.revision + 1, updatedAt = now) else board
    },
)

fun addWhiteboard(collection: WhiteboardCollection, board: WhiteboardDocument): WhiteboardCollection =
    collection.copy(boards = collection.boards + board, activeBoardId = board.id)

fun renameWhiteboard(collection: WhiteboardCollection, id: String, title: String): WhiteboardCollection {
    val cleaned = title.trim().ifEmpty { "Untitled board" }
    return collection.copy(
        boards = collection.boards.map { board ->
            if (board.id == id) board.copy(title = cleaned, revision = board.revision + 1, updatedAt = Instant.now().toString()) else board
        },
    )
}

fun removeWhiteboard(collection: WhiteboardCollection, id: String): WhiteboardCollection {
    if (collection.boards.size <= 1) return collection
    val boards = collection.boards.filter { it.id != id }
    return collection.copy(
        boards = boards,
        activeBoardId = if (collection.activeBoardId == id) boards.first().id else collection.activeBoardId,
    )
}

fun toggleWhiteboardStar(board: WhiteboardDocument, studentId: String): WhiteboardDocument {
    val stars = if (board.stars.contains(studentId)) board.stars - studentId else board.stars + studentId
    return board.copy(stars = stars)
}

fun toggleWhiteboardFollow(board: WhiteboardDocument, studentId: String): WhiteboardDocument {
    val follows = if (board.follows.contains(studentId)) board.follows - studentId else board.follows + studentId
    return board.copy(follows = follows)
}

data class Audience(val universityId: String, val year: String)

fun sameAudienceSharedBoards(collection: WhiteboardCollection, audience: Audience): List<WhiteboardDocument> =
    collection.sharedBoards.filter { it.universityId == audience.universityId && it.year == audience.year }

data class TopicGroup(val topic: String, val boards: List<WhiteboardDocument>)

fun groupWhiteboardsByTopic(boards: List<WhiteboardDocument>): List<TopicGroup> {
    val buckets = LinkedHashMap<String, MutableList<WhiteboardDocument>>()
    for (board in boards) {
        val topics = board.topics.ifEmpty { listOf("Unfiled") }
        for (topic in topics) {
            buckets.getOrPut(topic) { mutableListOf() }.add(board)
        }
    }
    return buckets.entries
        .sortedBy { it.key }
        .map { (topic, group) ->
            TopicGroup(
                topic = topic,
                boards = group.sortedWith(
                    compareByDescending<WhiteboardDocument> { it.stars.size }
                        .thenByDescending { parsedInstant(it.updatedAt) },
                ),
            )
        }
}

private fun parsedInstant(value: String): Instant = runCatching { Instant.parse(value) }.getOrDefault(Instant.EPOCH)

/** A freehand line as an SVG path. Quadratic through midpoints, so it is smooth. */
fun inkPath(points: List<Double>): String {
    if (points.size < 4) {
        return if (points.size == 2) "M ${jsNumber(points[0])} ${jsNumber(points[1])} l 0.01 0.01" else ""
    }
    val sb = StringBuilder("M ${jsNumber(points[0])} ${jsNumber(points[1])}")
    var i = 2
    while (i + 3 < points.size) {
        val mx = (points[i] + points[i + 2]) / 2
        val my = (points[i + 1] + points[i + 3]) / 2
        sb.append(" Q ${jsNumber(points[i])} ${jsNumber(points[i + 1])} ${jsNumber(mx)} ${jsNumber(my)}")
        i += 2
    }
    sb.append(" L ${jsNumber(points[points.size - 2])} ${jsNumber(points[points.size - 1])}")
    return sb.toString()
}
