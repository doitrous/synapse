package com.synapse.app.feature.whiteboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.whiteboard.BoardState
import com.synapse.app.core.whiteboard.BoardView
import com.synapse.app.core.whiteboard.Frame
import com.synapse.app.core.whiteboard.INK_COLOUR_CSS_VARS
import com.synapse.app.core.whiteboard.INK_COLOUR_IDS
import com.synapse.app.core.whiteboard.INK_WIDTHS
import com.synapse.app.core.whiteboard.InkStroke
import com.synapse.app.core.whiteboard.LinkLine
import com.synapse.app.core.whiteboard.NOTE_HEIGHT
import com.synapse.app.core.whiteboard.NOTE_WIDTH
import com.synapse.app.core.whiteboard.Note
import com.synapse.app.core.whiteboard.Point
import com.synapse.app.core.whiteboard.Size
import com.synapse.app.core.whiteboard.Tool
import com.synapse.app.core.whiteboard.WhiteboardCollection
import com.synapse.app.core.whiteboard.activeWhiteboard
import com.synapse.app.core.whiteboard.addWhiteboard
import com.synapse.app.core.whiteboard.clampToBoard
import com.synapse.app.core.whiteboard.clampView
import com.synapse.app.core.whiteboard.createWhiteboardDocument
import com.synapse.app.core.whiteboard.filesOf
import com.synapse.app.core.whiteboard.imagesOf
import com.synapse.app.core.whiteboard.inkOf
import com.synapse.app.core.whiteboard.noteAt
import com.synapse.app.core.whiteboard.panViewByBoardDelta
import com.synapse.app.core.whiteboard.removeWhiteboard
import com.synapse.app.core.whiteboard.renameWhiteboard
import com.synapse.app.core.whiteboard.toggleWhiteboardStar
import com.synapse.app.core.whiteboard.toBoard
import com.synapse.app.core.whiteboard.updateWhiteboardState
import com.synapse.app.core.whiteboard.viewFromMinimapPoint
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import kotlin.math.max
import kotlin.math.min

/** What [WhiteboardRoute] renders. */
sealed interface WhiteboardUiState {
    data object Loading : WhiteboardUiState

    data class Content(
        val collection: WhiteboardCollection,
        val view: BoardView = BoardView(0.0, 0.0, 1.0),
        val viewport: Size = Size(0.0, 0.0),
        val tool: Tool = Tool.Select,
        val inkColourId: String = INK_COLOUR_IDS.first(),
        val inkWidth: Double = INK_WIDTHS[1],
        val selectedNoteId: String? = null,
        val selectedFrameId: String? = null,
        val selectedLinkId: String? = null,
        val selectedImageId: String? = null,
        val selectedFileId: String? = null,
        val linkingFromNoteId: String? = null,
        val editingNoteId: String? = null,
        val editingFrameId: String? = null,
        /** The in-progress freehand stroke, board coordinates, flat x/y — not yet committed. */
        val drawingPoints: List<Double>? = null,
        val canUndo: Boolean = false,
        val canRedo: Boolean = false,
    ) : WhiteboardUiState {
        val activeBoard get() = activeWhiteboard(collection)
        val board: BoardState get() = activeBoard.state
    }
}

/**
 * Drives the Whiteboard canvas.
 *
 * Mutations come in two shapes, mirroring the web page's `remember()`-then-`setBoard()`
 * convention: a **discrete** action ([mutate]) snapshots undo, transforms the board and
 * persists in one step; a **drag** ([beginDrag]/[liveUpdate]/[commitDrag]) snapshots undo
 * once at the start, applies every intermediate frame to in-memory state only via
 * [liveUpdate] (no network write, no revision bump), and persists once at the end.
 *
 * ponytail: the web page persists on every intermediate drag frame too (cheap — it is
 * local storage). Here a write goes through [WhiteboardRepository.saveCollection] and
 * [com.synapse.app.core.sync.SyncEngine]'s outbox, so coalescing a whole drag into one
 * write avoids flooding the outbox and bumping `revision` dozens of times for one move.
 * Upgrade to per-frame persistence only if a feature actually needs to observe a note
 * mid-drag from another device — nothing does today (sharing/collaboration is deferred).
 */
@HiltViewModel
class WhiteboardViewModel @Inject constructor(
    private val repository: WhiteboardRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<WhiteboardUiState>(WhiteboardUiState.Loading)
    val uiState: StateFlow<WhiteboardUiState> = _uiState.asStateFlow()

    private val undoStack = ArrayDeque<BoardState>()
    private val redoStack = ArrayDeque<BoardState>()

    init { load() }

    fun load() {
        viewModelScope.launch {
            val collection = repository.loadCollection(now())
            undoStack.clear(); redoStack.clear()
            _uiState.value = WhiteboardUiState.Content(collection = collection)
        }
    }

    private fun content(): WhiteboardUiState.Content? = _uiState.value as? WhiteboardUiState.Content

    private fun update(transform: (WhiteboardUiState.Content) -> WhiteboardUiState.Content) {
        val state = content() ?: return
        _uiState.value = transform(state)
    }

    private fun persist(collection: WhiteboardCollection) {
        viewModelScope.launch { repository.saveCollection(now(), collection) }
    }

    // --- Discrete mutation / undo-redo -----------------------------------------------

    private fun mutate(transform: (BoardState) -> BoardState) {
        val state = content() ?: return
        pushUndo(state.board)
        val nextBoard = transform(state.board)
        commit(state, nextBoard, clearRedo = true)
    }

    private fun commit(state: WhiteboardUiState.Content, nextBoard: BoardState, clearRedo: Boolean) {
        val collection = updateWhiteboardState(state.collection, state.collection.activeBoardId, nextBoard, now().toString())
        _uiState.value = state.copy(
            collection = collection,
            canUndo = undoStack.isNotEmpty(),
            canRedo = if (clearRedo) false else redoStack.isNotEmpty(),
        )
        persist(collection)
    }

    private fun pushUndo(board: BoardState) {
        undoStack.addLast(board)
        if (undoStack.size > 50) undoStack.removeFirst()
        redoStack.clear()
    }

    fun undo() {
        val state = content() ?: return
        val previous = undoStack.removeLastOrNull() ?: return
        redoStack.addLast(state.board)
        commit(clearSelection(state), previous, clearRedo = false)
    }

    fun redo() {
        val state = content() ?: return
        val next = redoStack.removeLastOrNull() ?: return
        undoStack.addLast(state.board)
        val collection = updateWhiteboardState(state.collection, state.collection.activeBoardId, next, now().toString())
        _uiState.value = clearSelection(state).copy(collection = collection, canUndo = true, canRedo = redoStack.isNotEmpty())
        persist(collection)
    }

    private fun clearSelection(state: WhiteboardUiState.Content) = state.copy(
        selectedNoteId = null, selectedFrameId = null, selectedLinkId = null,
        selectedImageId = null, selectedFileId = null, linkingFromNoteId = null,
    )

    // --- Drag lifecycle ----------------------------------------------------------------

    /** Call once when a drag/draw gesture starts — captures the single undo point for the whole gesture. */
    fun beginDrag() {
        val state = content() ?: return
        pushUndo(state.board)
    }

    /** Applies every intermediate drag frame to in-memory state only. See the class doc. */
    fun liveUpdate(transform: (BoardState) -> BoardState) {
        val state = content() ?: return
        val nextBoard = transform(state.board)
        val collection = state.collection.copy(
            boards = state.collection.boards.map { if (it.id == state.collection.activeBoardId) it.copy(state = nextBoard) else it },
        )
        _uiState.value = state.copy(collection = collection)
    }

    /** Persists the drag's final state. Undo was already captured by [beginDrag]. */
    fun commitDrag() {
        val state = content() ?: return
        commit(state, state.board, clearRedo = true)
    }

    // --- Tools ---------------------------------------------------------------------------

    fun setTool(tool: Tool) = update { it.copy(tool = tool, drawingPoints = null) }
    fun setInkColour(id: String) = update { it.copy(inkColourId = id) }
    fun setInkWidth(width: Double) = update { it.copy(inkWidth = width) }

    // --- View / viewport -------------------------------------------------------------------

    fun setViewport(size: Size) = update { it.copy(viewport = size, view = clampView(it.view, size)) }

    fun setView(next: BoardView) = update { it.copy(view = clampView(next, it.viewport)) }

    fun panBy(dx: Double, dy: Double) = update { it.copy(view = clampView(it.view.copy(x = it.view.x + dx, y = it.view.y + dy), it.viewport)) }

    fun zoomBy(factor: Double, focal: Point) = update { state ->
        val view = state.view
        val scale = min(2.5, max(0.25, view.scale * factor))
        val wx = (focal.x - view.x) / view.scale
        val wy = (focal.y - view.y) / view.scale
        state.copy(view = clampView(BoardView(x = focal.x - wx * scale, y = focal.y - wy * scale, scale = scale), state.viewport))
    }

    fun panFromMinimap(point: Point, minimapSize: Size) = update { state ->
        state.copy(view = viewFromMinimapPoint(point, state.viewport, minimapSize, state.view))
    }

    fun panByMinimapKeys(delta: Point) = update { state ->
        state.copy(view = panViewByBoardDelta(state.view, delta, state.viewport))
    }

    /** Screen point (within the canvas) -> board point, given the current view. */
    fun toBoardPoint(screen: Point): Point {
        val state = content() ?: return screen
        return toBoard(screen, state.view)
    }

    // --- Selection / linking ---------------------------------------------------------------

    fun clearSelection() = update(::clearSelection)

    /** Tapping a note: first tap selects, a second tap on the already-selected note opens the editor, and a tap while linking completes the link (mirrors iOS's `tap(_:)`). */
    fun tapNote(id: String) {
        val state = content() ?: return
        val from = state.linkingFromNoteId
        if (from != null) {
            if (from != id) addLink(from, id)
            update { it.copy(linkingFromNoteId = null) }
            return
        }
        if (state.selectedNoteId == id) {
            update { it.copy(editingNoteId = id) }
        } else {
            update { clearSelection(it).copy(selectedNoteId = id) }
        }
    }

    fun startLinking(fromId: String) = update { it.copy(linkingFromNoteId = if (it.linkingFromNoteId == fromId) null else fromId) }
    fun cancelLinking() = update { it.copy(linkingFromNoteId = null) }

    fun selectFrame(id: String) = update { clearSelection(it).copy(selectedFrameId = id) }
    fun selectLink(id: String) = update { clearSelection(it).copy(selectedLinkId = id) }
    fun selectImage(id: String) = update { clearSelection(it).copy(selectedImageId = id) }
    fun selectFile(id: String) = update { clearSelection(it).copy(selectedFileId = id) }

    fun stopEditingNote() = update { it.copy(editingNoteId = null) }
    fun editFrame(id: String) = update { it.copy(editingFrameId = id) }
    fun stopEditingFrame() = update { it.copy(editingFrameId = null) }

    // --- Notes ---------------------------------------------------------------------------

    fun addNoteAtCenter() {
        val state = content() ?: return
        val center = toBoard(Point(state.viewport.width / 2, state.viewport.height / 2), state.view)
        addNoteAt(Point(center.x - NOTE_WIDTH / 2, center.y - NOTE_HEIGHT / 2))
    }

    fun addNoteAt(corner: Point) {
        val placed = clampToBoard(corner, com.synapse.app.core.whiteboard.Size(NOTE_WIDTH, NOTE_HEIGHT))
        val id = "n-${UUID.randomUUID()}"
        mutate { board -> board.copy(notes = board.notes + Note(id = id, x = placed.x, y = placed.y, text = "", tone = "paper")) }
        update { it.copy(selectedNoteId = id, selectedFrameId = null, editingNoteId = id) }
    }

    fun addNoteIfEmptyAt(point: Point) {
        val state = content() ?: return
        if (noteAt(state.board.notes.map { it.toBox() }, point) != null) return
        addNoteAt(Point(point.x - NOTE_WIDTH / 2, point.y - NOTE_HEIGHT / 2))
    }

    fun updateNote(note: Note) = mutate { board -> board.copy(notes = board.notes.map { if (it.id == note.id) note else it }) }

    fun deleteNote(id: String) {
        mutate { board ->
            board.copy(
                notes = board.notes.filter { it.id != id },
                links = board.links.filter { it.from != id && it.to != id },
            )
        }
        update { it.copy(selectedNoteId = null, editingNoteId = null) }
    }

    fun beginNoteDrag(id: String) {
        beginDrag()
        update { clearSelection(it).copy(selectedNoteId = id) }
    }

    fun dragNoteTo(id: String, point: Point) = liveUpdate { board ->
        val placed = clampToBoard(point, com.synapse.app.core.whiteboard.Size(NOTE_WIDTH, NOTE_HEIGHT))
        board.copy(notes = board.notes.map { if (it.id == id) it.copy(x = placed.x, y = placed.y) else it })
    }

    // --- Links -----------------------------------------------------------------------------

    fun addLink(from: String, to: String) {
        val state = content() ?: return
        if (state.board.links.any { it.from == from && it.to == to }) return
        mutate { board -> board.copy(links = board.links + LinkLine(id = "l-${UUID.randomUUID()}", from = from, to = to)) }
    }

    fun removeSelectedLink() {
        val id = content()?.selectedLinkId ?: return
        mutate { board -> board.copy(links = board.links.filter { it.id != id }) }
        update { it.copy(selectedLinkId = null) }
    }

    fun straightenSelectedLink() {
        val id = content()?.selectedLinkId ?: return
        mutate { board -> board.copy(links = board.links.map { if (it.id == id) it.copy(c1 = null, c2 = null) else it }) }
    }

    // --- Frames ----------------------------------------------------------------------------

    fun addFrame() {
        val state = content() ?: return
        val center = toBoard(Point(state.viewport.width / 2, state.viewport.height / 2), state.view)
        val id = "f-${UUID.randomUUID()}"
        mutate { board ->
            board.copy(frames = board.frames + Frame(id = id, x = center.x - 260, y = center.y - 150, width = 520.0, height = 300.0, title = "New study section"))
        }
        update { it.copy(selectedFrameId = id, selectedNoteId = null, editingFrameId = id) }
    }

    fun updateFrame(frame: Frame) = mutate { board -> board.copy(frames = board.frames.map { if (it.id == frame.id) frame else it }) }

    fun deleteFrame(id: String) {
        mutate { board -> board.copy(frames = board.frames.filter { it.id != id }) }
        update { it.copy(selectedFrameId = null, editingFrameId = null) }
    }

    /**
     * ponytail: contained notes do not travel with the frame while dragging (the web page's
     * `notesInFrame` linkage). A student can still drag them individually after moving the
     * frame. Upgrade if this surface's users actually rely on frame-grouping — worth doing,
     * just not for a first, correct-round-trip pass on the largest surface in the app.
     */
    fun beginFrameDrag(id: String) {
        beginDrag()
        update { clearSelection(it).copy(selectedFrameId = id) }
    }

    fun dragFrameTo(id: String, point: Point) = liveUpdate { board ->
        board.copy(frames = board.frames.map { if (it.id == id) it.copy(x = point.x, y = point.y) else it })
    }

    fun resizeFrame(id: String, width: Double, height: Double) = liveUpdate { board ->
        board.copy(frames = board.frames.map { if (it.id == id) it.copy(width = max(80.0, width), height = max(60.0, height)) else it })
    }

    // --- Images / files ----------------------------------------------------------------------

    /**
     * Placing a new image or file from the device requires uploading it through the
     * student's document store first (the same pipeline `documentId` on [BoardImage]/[BoardFile]
     * points at) — that upload path is not wired to this surface yet. What is already on a
     * loaded board renders (as a placeholder tile; see [BoardImage]'s doc) and round-trips on
     * every save untouched, including images/files this UI cannot create.
     */
    fun beginImageDrag(id: String) {
        beginDrag()
        update { clearSelection(it).copy(selectedImageId = id) }
    }

    fun dragImageTo(id: String, point: Point) = liveUpdate { board ->
        board.copy(images = imagesOf(board).map { if (it.id == id) it.copy(x = point.x, y = point.y) else it })
    }

    fun beginFileDrag(id: String) {
        beginDrag()
        update { clearSelection(it).copy(selectedFileId = id) }
    }

    fun dragFileTo(id: String, point: Point) = liveUpdate { board ->
        board.copy(files = filesOf(board).map { if (it.id == id) it.copy(x = point.x, y = point.y) else it })
    }

    fun removeSelectedItem() {
        val state = content() ?: return
        state.selectedImageId?.let { id -> mutate { board -> board.copy(images = imagesOf(board).filter { it.id != id }) } }
        state.selectedFileId?.let { id -> mutate { board -> board.copy(files = filesOf(board).filter { it.id != id }) } }
        update { it.copy(selectedImageId = null, selectedFileId = null) }
    }

    // --- Ink (pen / eraser) -----------------------------------------------------------------

    fun beginStroke(point: Point) {
        beginDrag()
        update { it.copy(drawingPoints = listOf(point.x, point.y)) }
    }

    fun appendStrokePoint(point: Point) = update { state ->
        val points = state.drawingPoints ?: return@update state
        state.copy(drawingPoints = points + listOf(point.x, point.y))
    }

    fun endStroke() {
        val state = content() ?: return
        val points = state.drawingPoints
        update { it.copy(drawingPoints = null) }
        if (points == null || points.size < 4) {
            // Too short to be a real stroke: drop the undo point beginStroke() pushed.
            undoStack.removeLastOrNull()
            return
        }
        val stroke = InkStroke(
            id = "i-${UUID.randomUUID()}",
            points = points,
            color = INK_COLOUR_CSS_VARS[state.inkColourId] ?: INK_COLOUR_CSS_VARS.getValue(INK_COLOUR_IDS.first()),
            width = state.inkWidth,
        )
        commit(content() ?: return, state.board.copy(ink = inkOf(state.board) + stroke), clearRedo = true)
    }

    /** Erasing removes a whole stroke the touch passes near — a drag can remove several. */
    fun beginErase() = beginDrag()

    fun eraseAt(point: Point, thresholdBoardUnits: Double = 14.0) {
        val state = content() ?: return
        val hit = inkOf(state.board).firstOrNull { stroke -> strokeNear(stroke.points, point, thresholdBoardUnits) } ?: return
        liveUpdate { board -> board.copy(ink = inkOf(board).filter { it.id != hit.id }) }
    }

    fun endErase() = commitDrag()

    private fun strokeNear(points: List<Double>, point: Point, threshold: Double): Boolean {
        if (points.size < 2) return false
        if (points.size == 2) return distance(points[0], points[1], point) <= threshold
        var i = 0
        while (i + 3 < points.size) {
            if (distanceToSegment(points[i], points[i + 1], points[i + 2], points[i + 3], point) <= threshold) return true
            i += 2
        }
        return false
    }

    private fun distance(x: Double, y: Double, point: Point): Double {
        val dx = point.x - x; val dy = point.y - y
        return kotlin.math.sqrt(dx * dx + dy * dy)
    }

    private fun distanceToSegment(ax: Double, ay: Double, bx: Double, by: Double, point: Point): Double {
        val dx = bx - ax; val dy = by - ay
        val lengthSq = dx * dx + dy * dy
        if (lengthSq == 0.0) return distance(ax, ay, point)
        val t = max(0.0, min(1.0, ((point.x - ax) * dx + (point.y - ay) * dy) / lengthSq))
        return distance(ax + t * dx, ay + t * dy, point)
    }

    // --- Board management --------------------------------------------------------------------

    fun switchBoard(id: String) {
        undoStack.clear(); redoStack.clear()
        update { state ->
            clearSelection(state).copy(
                collection = state.collection.copy(activeBoardId = id),
                view = clampView(BoardView(0.0, 0.0, 1.0), state.viewport),
                canUndo = false, canRedo = false, editingNoteId = null, editingFrameId = null,
            )
        }
        content()?.let { persist(it.collection) }
    }

    fun addBoard(title: String) {
        val state = content() ?: return
        val active = state.activeBoard
        val board = createWhiteboardDocument(
            id = "wb-${UUID.randomUUID()}", title = title.ifBlank { "Untitled board" },
            ownerId = active.ownerId, ownerName = active.ownerName, universityId = active.universityId, year = active.year,
            now = now().toString(),
        )
        val collection = addWhiteboard(state.collection, board)
        undoStack.clear(); redoStack.clear()
        _uiState.value = clearSelection(state).copy(collection = collection, canUndo = false, canRedo = false)
        persist(collection)
    }

    fun renameBoard(id: String, title: String) {
        val state = content() ?: return
        val collection = renameWhiteboard(state.collection, id, title)
        _uiState.value = state.copy(collection = collection)
        persist(collection)
    }

    fun removeBoard(id: String) {
        val state = content() ?: return
        val collection = removeWhiteboard(state.collection, id)
        if (collection === state.collection) return
        undoStack.clear(); redoStack.clear()
        _uiState.value = clearSelection(state).copy(collection = collection, canUndo = false, canRedo = false)
        persist(collection)
    }

    fun toggleStar(boardId: String, studentId: String) {
        val state = content() ?: return
        val collection = state.collection.copy(
            boards = state.collection.boards.map { if (it.id == boardId) toggleWhiteboardStar(it, studentId) else it },
        )
        _uiState.value = state.copy(collection = collection)
        persist(collection)
    }
}

private fun Note.toBox() = com.synapse.app.core.whiteboard.NoteBox(id, x, y, text)
