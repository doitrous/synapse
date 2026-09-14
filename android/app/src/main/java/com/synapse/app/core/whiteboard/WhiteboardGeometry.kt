package com.synapse.app.core.whiteboard

import kotlinx.serialization.Serializable
import kotlin.math.abs
import kotlin.math.floor
import kotlin.math.max
import kotlin.math.min

/**
 * Where things sit on the board, and how the board itself is bounded.
 *
 * A 1:1 port of `src/lib/whiteboardGeometry.ts` (see `whiteboardGeometry.test.ts`,
 * ported verbatim as [com.synapse.app.core.whiteboard.WhiteboardGeometryTest]). Every
 * formula below must stay numerically identical to the web and iOS ports — this is
 * the one surface where a student can lose their place entirely, and "panned into
 * empty space forever" is a bug you only find by trying it.
 *
 * The TS `View` type is renamed [BoardView] here to avoid colliding with
 * `android.view.View`; `NoteBox` keeps its TS name and shape (id/x/y/text) rather
 * than depending on the richer [com.synapse.app.core.whiteboard.Note] model, exactly
 * as the TS geometry module depends on nothing from `data/whiteboard.ts`.
 */

/** Also the persisted shape of a connector's bend ([LinkLine.c1]/[c2]) — kept serializable for that reuse. */
@Serializable
data class Point(val x: Double, val y: Double)

data class NoteBox(val id: String, val x: Double, val y: Double, val text: String? = null)

data class BoardView(val x: Double, val y: Double, val scale: Double)

data class Size(val width: Double, val height: Double)

data class BoardRect(val x: Double, val y: Double, val width: Double, val height: Double)

/**
 * The board has edges.
 *
 * An unbounded canvas sounds generous and is the opposite: pan far enough and
 * everything you made is somewhere behind you with no way back but a control you
 * have to know about. This is large enough that nobody reaches the edge by
 * accident, and small enough that the minimap means something.
 */
object Board {
    const val WIDTH: Double = 8000.0
    const val HEIGHT: Double = 5000.0
}

const val NOTE_WIDTH: Double = 176.0
const val NOTE_HEIGHT: Double = 74.0

/** Keep a point inside the board, allowing for the size of what is being placed. */
fun clampToBoard(point: Point, size: Size = Size(0.0, 0.0)): Point = Point(
    x = min(max(point.x, 0.0), max(0.0, Board.WIDTH - size.width)),
    y = min(max(point.y, 0.0), max(0.0, Board.HEIGHT - size.height)),
)

/**
 * Keep the viewport over the board.
 *
 * When the board is wider than the viewport the edges are hard stops. When it is
 * not — zoomed far out, or a narrow phone — the board is centred instead, because
 * clamping something smaller than its window puts it in a corner.
 */
fun clampView(view: BoardView, viewport: Size): BoardView {
    val worldWidth = Board.WIDTH * view.scale
    val worldHeight = Board.HEIGHT * view.scale
    val x = if (worldWidth <= viewport.width) {
        (viewport.width - worldWidth) / 2
    } else {
        min(0.0, max(viewport.width - worldWidth, view.x))
    }
    val y = if (worldHeight <= viewport.height) {
        (viewport.height - worldHeight) / 2
    } else {
        min(0.0, max(viewport.height - worldHeight, view.y))
    }
    return view.copy(x = x, y = y)
}

/** Screen pixels within the canvas -> board coordinates. */
fun toBoard(point: Point, view: BoardView): Point =
    Point(x = (point.x - view.x) / view.scale, y = (point.y - view.y) / view.scale)

enum class Side { Start, End }

/** Where a connector meets a note — the middle of its start or end edge. */
fun anchorOf(note: NoteBox, side: Side): Point = Point(
    x = if (side == Side.Start) note.x else note.x + NOTE_WIDTH,
    y = note.y + NOTE_HEIGHT / 2,
)

data class SidePair(val from: Side, val to: Side)

/**
 * Which sides two notes should be joined by.
 *
 * A connector that leaves the right edge and arrives at the right edge doubles
 * back over the note it came from; picking by relative position is what makes a
 * link read as a direction rather than a knot.
 */
fun sidesBetween(from: NoteBox, to: NoteBox): SidePair =
    if (to.x + NOTE_WIDTH / 2 >= from.x + NOTE_WIDTH / 2) {
        SidePair(Side.End, Side.Start)
    } else {
        SidePair(Side.Start, Side.End)
    }

/** The default bend: a horizontal ease out of each edge, half the gap wide. */
fun defaultControls(a: Point, b: Point): Pair<Point, Point> {
    val reach = max(40.0, abs(b.x - a.x) / 2)
    val direction = if (b.x >= a.x) 1.0 else -1.0
    return Point(a.x + reach * direction, a.y) to Point(b.x - reach * direction, b.y)
}

data class LinkPath(val d: String, val controls: Pair<Point, Point>)

/** Formats a Double the way JS stringifies a `number` — no trailing `.0` for integral values. */
internal fun jsNumber(value: Double): String =
    if (value == value.toLong().toDouble()) value.toLong().toString() else value.toString()

/** A cubic path through the given (or default) control points. */
fun linkPath(a: Point, b: Point, controls: Pair<Point, Point>? = null): LinkPath {
    val (c1, c2) = controls ?: defaultControls(a, b)
    val d = "M ${jsNumber(a.x)} ${jsNumber(a.y)} C ${jsNumber(c1.x)} ${jsNumber(c1.y)}, " +
        "${jsNumber(c2.x)} ${jsNumber(c2.y)}, ${jsNumber(b.x)} ${jsNumber(b.y)}"
    return LinkPath(d, c1 to c2)
}

/** The note under a board point, topmost last — matching paint order. */
fun noteAt(notes: List<NoteBox>, point: Point): NoteBox? {
    for (index in notes.indices.reversed()) {
        val note = notes[index]
        if (point.x >= note.x && point.x <= note.x + NOTE_WIDTH &&
            point.y >= note.y && point.y <= note.y + NOTE_HEIGHT
        ) {
            return note
        }
    }
    return null
}

/**
 * Notes whose text contains the query, in reading order.
 *
 * Reading order rather than creation order, because stepping through hits should
 * follow the diagram as it looks, not as it was built. Rows are banded so two
 * notes side by side are not reordered by a few pixels of drift.
 */
fun matchNotes(notes: List<NoteBox>, query: String): List<NoteBox> {
    val needle = query.trim().lowercase()
    if (needle.isEmpty()) return emptyList()
    val band = NOTE_HEIGHT
    return notes
        .filter { (it.text ?: "").lowercase().contains(needle) }
        .sortedWith(
            compareBy<NoteBox> { floor(it.y / band) }
                .thenBy { it.x }
                .thenBy { it.id },
        )
}

/** The view that puts a board point in the middle of the viewport. */
fun viewCentredOn(point: Point, viewport: Size, scale: Double): BoardView = clampView(
    BoardView(x = viewport.width / 2 - point.x * scale, y = viewport.height / 2 - point.y * scale, scale = scale),
    viewport,
)

fun minimapScale(size: Size): Double = min(size.width / Board.WIDTH, size.height / Board.HEIGHT)

fun minimapViewport(view: BoardView, viewport: Size, minimap: Size): BoardRect {
    val scale = minimapScale(minimap)
    return BoardRect(
        x = (-view.x / view.scale) * scale,
        y = (-view.y / view.scale) * scale,
        width = (viewport.width / view.scale) * scale,
        height = (viewport.height / view.scale) * scale,
    )
}

fun viewFromMinimapPoint(point: Point, viewport: Size, minimap: Size, current: BoardView): BoardView {
    val scale = minimapScale(minimap)
    val boardPoint = Point(x = point.x / scale, y = point.y / scale)
    return viewCentredOn(boardPoint, viewport, current.scale)
}

fun panViewByBoardDelta(view: BoardView, delta: Point, viewport: Size): BoardView = clampView(
    view.copy(x = view.x - delta.x * view.scale, y = view.y - delta.y * view.scale),
    viewport,
)
