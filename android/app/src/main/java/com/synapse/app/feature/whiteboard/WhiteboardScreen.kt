package com.synapse.app.feature.whiteboard

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.gestures.detectTransformGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.whiteboard.Board
import com.synapse.app.core.whiteboard.BoardFile
import com.synapse.app.core.whiteboard.BoardImage
import com.synapse.app.core.whiteboard.BoardView
import com.synapse.app.core.whiteboard.Frame
import com.synapse.app.core.whiteboard.INK_COLOUR_IDS
import com.synapse.app.core.whiteboard.INK_WIDTHS
import com.synapse.app.core.whiteboard.LinkLine
import com.synapse.app.core.whiteboard.NOTE_HEIGHT
import com.synapse.app.core.whiteboard.NOTE_WIDTH
import com.synapse.app.core.whiteboard.Note
import com.synapse.app.core.whiteboard.NoteBox
import com.synapse.app.core.whiteboard.Point
import com.synapse.app.core.whiteboard.TONE_ORDER
import com.synapse.app.core.whiteboard.Tool
import com.synapse.app.core.whiteboard.WhiteboardDocument
import com.synapse.app.core.whiteboard.anchorOf
import com.synapse.app.core.whiteboard.defaultControls
import com.synapse.app.core.whiteboard.filesOf
import com.synapse.app.core.whiteboard.imagesOf
import com.synapse.app.core.whiteboard.inkOf
import com.synapse.app.core.whiteboard.minimapViewport
import com.synapse.app.core.whiteboard.sidesBetween
import com.synapse.app.core.whiteboard.Size as BoardSize
import kotlin.math.hypot
import kotlin.math.max
import kotlin.math.min
import kotlin.math.roundToInt

const val WHITEBOARD_LOADING_TAG = "whiteboard_loading"

/**
 * The Whiteboard feature's single public entry point — constructs its own
 * [WhiteboardViewModel] via [hiltViewModel], no navigation wiring required of the
 * caller (see `feature.performance.PerformanceRoute` for the same shape).
 *
 * **What's implemented vs deferred** (see individual doc comments for detail):
 * implemented — render/create/move/edit notes, connectors, frames and freehand
 * ink; pan/pinch-zoom; select/pen/eraser tools; 50-deep undo/redo; the
 * `synapse.whiteboard.boards.v1` collection with legacy single-board migration;
 * a click-to-pan minimap; multi-board create/rename/delete/star. Deferred —
 * placing a *new* image/file (needs the document upload pipeline wired to this
 * surface: [WhiteboardViewModel.beginImageDrag]'s doc); frame-contained notes
 * travelling with their frame ([WhiteboardViewModel.beginFrameDrag]'s doc);
 * board sharing/collaboration ([com.synapse.app.core.whiteboard.WhiteboardCollection.sharedBoards]'s doc).
 */
@Composable
fun WhiteboardRoute(viewModel: WhiteboardViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    when (val state = uiState) {
        is WhiteboardUiState.Loading -> Box(Modifier.fillMaxSize().testTag(WHITEBOARD_LOADING_TAG), contentAlignment = Alignment.Center) {
            CircularProgressIndicator()
        }
        is WhiteboardUiState.Content -> WhiteboardContent(state, viewModel)
    }
}

@Composable
private fun WhiteboardContent(state: WhiteboardUiState.Content, viewModel: WhiteboardViewModel) {
    Column(Modifier.fillMaxSize()) {
        BoardTopBar(state, viewModel)
        Box(Modifier.fillMaxWidth().weight(1f)) {
            WhiteboardCanvas(state, viewModel)
        }
        BoardToolbar(state, viewModel)
    }

    state.editingNoteId?.let { id ->
        state.board.notes.find { it.id == id }?.let { note ->
            NoteEditorDialog(note, onSave = { viewModel.updateNote(it) }, onDelete = { viewModel.deleteNote(id) }, onDismiss = { viewModel.stopEditingNote() })
        }
    }
    state.editingFrameId?.let { id ->
        state.board.frames.find { it.id == id }?.let { frame ->
            FrameEditorDialog(frame, onSave = { viewModel.updateFrame(it) }, onDelete = { viewModel.deleteFrame(id) }, onDismiss = { viewModel.stopEditingFrame() })
        }
    }
}

// --- Top bar: board switcher, undo/redo -----------------------------------------------------

@Composable
private fun BoardTopBar(state: WhiteboardUiState.Content, viewModel: WhiteboardViewModel) {
    var menuOpen by remember { mutableStateOf(false) }
    var showNewBoardDialog by remember { mutableStateOf(false) }
    var showRenameDialog by remember { mutableStateOf(false) }
    val active = state.activeBoard

    Row(Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
        Box {
            TextButton(onClick = { menuOpen = true }, modifier = Modifier.testTag("whiteboard_board_switcher")) {
                Text(active.title, style = MaterialTheme.typography.titleMedium)
            }
            DropdownMenu(expanded = menuOpen, onDismissRequest = { menuOpen = false }) {
                state.collection.boards.forEach { board ->
                    DropdownMenuItem(
                        text = { Text(board.title + if (board.id == active.id) " ✓" else "") },
                        onClick = { menuOpen = false; viewModel.switchBoard(board.id) },
                    )
                }
                DropdownMenuItem(text = { Text(stringResource(R.string.whiteboard_new_board)) }, onClick = { menuOpen = false; showNewBoardDialog = true })
                DropdownMenuItem(text = { Text(stringResource(R.string.whiteboard_rename)) }, onClick = { menuOpen = false; showRenameDialog = true })
                DropdownMenuItem(
                    text = { Text(stringResource(R.string.whiteboard_delete_board)) },
                    enabled = state.collection.boards.size > 1,
                    onClick = { menuOpen = false; viewModel.removeBoard(active.id) },
                )
            }
        }
        IconButton(onClick = { viewModel.toggleStar(active.id, LOCAL_STUDENT_ID) }) {
            Text(if (active.stars.contains(LOCAL_STUDENT_ID)) "★" else "☆")
        }
        Spacer(Modifier.weight(1f))
        TextButton(onClick = viewModel::undo, enabled = state.canUndo) { Text(stringResource(R.string.whiteboard_undo)) }
        TextButton(onClick = viewModel::redo, enabled = state.canRedo) { Text(stringResource(R.string.whiteboard_redo)) }
    }

    if (showNewBoardDialog) {
        BoardNameDialog(title = stringResource(R.string.whiteboard_new_board), initial = "", onConfirm = { viewModel.addBoard(it); showNewBoardDialog = false }, onDismiss = { showNewBoardDialog = false })
    }
    if (showRenameDialog) {
        BoardNameDialog(title = stringResource(R.string.whiteboard_rename_board_title), initial = active.title, onConfirm = { viewModel.renameBoard(active.id, it); showRenameDialog = false }, onDismiss = { showRenameDialog = false })
    }
}

private const val LOCAL_STUDENT_ID = "local-student"

@Composable
private fun BoardNameDialog(title: String, initial: String, onConfirm: (String) -> Unit, onDismiss: () -> Unit) {
    var text by remember { mutableStateOf(initial) }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(title) },
        text = { OutlinedTextField(value = text, onValueChange = { text = it }, singleLine = true) },
        confirmButton = { TextButton(onClick = { onConfirm(text) }) { Text(stringResource(R.string.common_save)) } },
        dismissButton = { TextButton(onClick = onDismiss) { Text(stringResource(R.string.whiteboard_cancel)) } },
    )
}

// --- Canvas -----------------------------------------------------------------------------------

@Composable
private fun WhiteboardCanvas(state: WhiteboardUiState.Content, viewModel: WhiteboardViewModel) {
    val density = LocalDensity.current
    val view = state.view
    val board = state.board
    val notesById = remember(board.notes) { board.notes.associateBy { it.id } }

    val boardColor = MaterialTheme.colorScheme.surfaceVariant
    val linkColor = MaterialTheme.colorScheme.primary
    val drawingColor = MaterialTheme.colorScheme.onSurface

    Box(
        Modifier
            .fillMaxSize()
            .onSizeChanged { viewModel.setViewport(BoardSize(it.width.toDouble(), it.height.toDouble())) }
            .background(MaterialTheme.colorScheme.background)
            .pointerInput(state.tool) {
                if (state.tool == Tool.Select) {
                    detectTransformGestures { centroid, pan, zoom, _ ->
                        if (pan != Offset.Zero) viewModel.panBy(pan.x.toDouble(), pan.y.toDouble())
                        if (zoom != 1f) viewModel.zoomBy(zoom.toDouble(), Point(centroid.x.toDouble(), centroid.y.toDouble()))
                    }
                }
            }
            .pointerInput(state.tool, board.links) {
                when (state.tool) {
                    Tool.Select -> detectTapGestures(
                        onTap = { offset ->
                            val point = viewModel.toBoardPoint(Point(offset.x.toDouble(), offset.y.toDouble()))
                            val threshold = 12.0 / max(0.25, view.scale)
                            val hitLink = linkNear(board.links, notesById, point, threshold)
                            if (hitLink != null) viewModel.selectLink(hitLink.id) else viewModel.clearSelection()
                        },
                        onDoubleTap = { offset -> viewModel.addNoteIfEmptyAt(viewModel.toBoardPoint(Point(offset.x.toDouble(), offset.y.toDouble()))) },
                    )
                    Tool.Pen -> detectDragGestures(
                        onDragStart = { offset -> viewModel.beginStroke(viewModel.toBoardPoint(Point(offset.x.toDouble(), offset.y.toDouble()))) },
                        onDrag = { change, _ -> change.consume(); viewModel.appendStrokePoint(viewModel.toBoardPoint(Point(change.position.x.toDouble(), change.position.y.toDouble()))) },
                        onDragEnd = { viewModel.endStroke() },
                        onDragCancel = { viewModel.endStroke() },
                    )
                    Tool.Eraser -> detectDragGestures(
                        onDragStart = { offset -> viewModel.beginErase(); viewModel.eraseAt(viewModel.toBoardPoint(Point(offset.x.toDouble(), offset.y.toDouble()))) },
                        onDrag = { change, _ -> change.consume(); viewModel.eraseAt(viewModel.toBoardPoint(Point(change.position.x.toDouble(), change.position.y.toDouble()))) },
                        onDragEnd = { viewModel.endErase() },
                        onDragCancel = { viewModel.endErase() },
                    )
                }
            }
            .testTag("whiteboard_canvas"),
    ) {
        Canvas(Modifier.fillMaxSize()) {
            drawRect(boardColor, topLeft = Offset(view.x.toFloat(), view.y.toFloat()), size = androidx.compose.ui.geometry.Size((Board.WIDTH * view.scale).toFloat(), (Board.HEIGHT * view.scale).toFloat()))

            for (link in board.links) {
                val from = notesById[link.from] ?: continue
                val to = notesById[link.to] ?: continue
                drawLink(from, to, link, view, linkColor)
            }

            for (stroke in inkOf(board)) {
                drawInk(stroke.points, view, colorForInk(stroke.color), stroke.width.toFloat() * view.scale.toFloat())
            }
            state.drawingPoints?.let { points ->
                drawInk(points, view, colorForInk(com.synapse.app.core.whiteboard.INK_COLOUR_CSS_VARS[state.inkColourId] ?: ""), state.inkWidth.toFloat() * view.scale.toFloat())
            }
        }

        for (frame in board.frames) {
            FrameView(frame, view, isSelected = state.selectedFrameId == frame.id, onTap = { viewModel.selectFrame(frame.id) }, viewModel = viewModel)
        }
        val imageLabel = stringResource(R.string.whiteboard_image_label)
        for (image in imagesOf(board)) {
            PlaceholderTile(x = image.x, y = image.y, width = image.width, height = image.height, label = image.alt.ifBlank { imageLabel }, view = view, isSelected = state.selectedImageId == image.id, onTap = { viewModel.selectImage(image.id) }, onDragStart = { viewModel.beginImageDrag(image.id) }, onDragMove = { viewModel.dragImageTo(image.id, it) }, onDragEnd = { viewModel.commitDrag() })
        }
        for (file in filesOf(board)) {
            PlaceholderTile(x = file.x, y = file.y, width = 210.0, height = 78.0, label = file.name, view = view, isSelected = state.selectedFileId == file.id, onTap = { viewModel.selectFile(file.id) }, onDragStart = { viewModel.beginFileDrag(file.id) }, onDragMove = { viewModel.dragFileTo(file.id, it) }, onDragEnd = { viewModel.commitDrag() })
        }
        for (note in board.notes) {
            NoteView(note, view, isSelected = state.selectedNoteId == note.id, isLinkSource = state.linkingFromNoteId == note.id, viewModel = viewModel)
        }

        Minimap(state, viewModel, Modifier.align(Alignment.BottomEnd).padding(10.dp))
    }
}

private fun colorForInk(cssVar: String): Color = when {
    cssVar.contains("primary") -> Color(0xFF3B82F6)
    cssVar.contains("danger") -> Color(0xFFDC2626)
    cssVar.contains("success") -> Color(0xFF16A34A)
    cssVar.contains("warning") -> Color(0xFFD97706)
    else -> Color(0xFF1F2937)
}

private fun toneColor(tone: String): Color = when (tone) {
    "teal" -> Color(0xFFDCFCE7)
    "amber" -> Color(0xFFFEF3C7)
    "rose" -> Color(0xFFFEE2E2)
    "sage" -> Color(0xFFECFDF5)
    "slate" -> Color(0xFFE2E8F0)
    "sand" -> Color(0xFFF5F0E6)
    "clay" -> Color(0xFFFFE4D6)
    else -> Color(0xFFFFFFFF)
}

private fun toScreen(point: Point, view: BoardView): Offset =
    Offset((point.x * view.scale + view.x).toFloat(), (point.y * view.scale + view.y).toFloat())

/** Cubic bezier point at parameter [t], matching [defaultControls]/`linkPath`'s curve. */
private fun cubicAt(a: Point, c1: Point, c2: Point, b: Point, t: Double): Point {
    val mt = 1 - t
    return Point(
        x = mt * mt * mt * a.x + 3 * mt * mt * t * c1.x + 3 * mt * t * t * c2.x + t * t * t * b.x,
        y = mt * mt * mt * a.y + 3 * mt * mt * t * c1.y + 3 * mt * t * t * c2.y + t * t * t * b.y,
    )
}

/** Is any point within [threshold] board units of a link's curve? Used for tap-to-select, since links aren't their own composables. */
private fun linkNear(links: List<LinkLine>, notesById: Map<String, Note>, point: Point, threshold: Double): LinkLine? {
    for (link in links) {
        val from = notesById[link.from] ?: continue
        val to = notesById[link.to] ?: continue
        val sides = sidesBetween(NoteBox(from.id, from.x, from.y), NoteBox(to.id, to.x, to.y))
        val start = anchorOf(NoteBox(from.id, from.x, from.y), sides.from)
        val end = anchorOf(NoteBox(to.id, to.x, to.y), sides.to)
        val controls = if (link.c1 != null && link.c2 != null) link.c1 to link.c2 else defaultControls(start, end)
        var t = 0.0
        while (t <= 1.0) {
            val p = cubicAt(start, controls.first, controls.second, end, t)
            if (hypot(p.x - point.x, p.y - point.y) <= threshold) return link
            t += 0.05
        }
    }
    return null
}

private fun androidx.compose.ui.graphics.drawscope.DrawScope.drawLink(from: Note, to: Note, link: LinkLine, view: BoardView, color: Color) {
    val sides = sidesBetween(NoteBox(from.id, from.x, from.y), NoteBox(to.id, to.x, to.y))
    val start = anchorOf(NoteBox(from.id, from.x, from.y), sides.from)
    val end = anchorOf(NoteBox(to.id, to.x, to.y), sides.to)
    val controls = if (link.c1 != null && link.c2 != null) link.c1 to link.c2 else defaultControls(start, end)
    val path = Path().apply {
        val s = toScreen(start, view)
        moveTo(s.x, s.y)
        val c1 = toScreen(controls.first, view)
        val c2 = toScreen(controls.second, view)
        val e = toScreen(end, view)
        cubicTo(c1.x, c1.y, c2.x, c2.y, e.x, e.y)
    }
    drawPath(path, color, style = Stroke(width = 1.5f * view.scale.toFloat()))
}

/** A freehand stroke as a smooth path — quadratic through midpoints, the same construction as `inkPath`. */
private fun androidx.compose.ui.graphics.drawscope.DrawScope.drawInk(points: List<Double>, view: BoardView, color: Color, strokeWidth: Float) {
    if (points.size < 2) return
    val path = Path()
    val first = toScreen(Point(points[0], points[1]), view)
    path.moveTo(first.x, first.y)
    if (points.size < 4) {
        path.lineTo(first.x + 0.01f, first.y + 0.01f)
    } else {
        var i = 2
        while (i + 3 < points.size) {
            val mid = toScreen(Point((points[i] + points[i + 2]) / 2, (points[i + 1] + points[i + 3]) / 2), view)
            val control = toScreen(Point(points[i], points[i + 1]), view)
            path.quadraticTo(control.x, control.y, mid.x, mid.y)
            i += 2
        }
        val last = toScreen(Point(points[points.size - 2], points[points.size - 1]), view)
        path.lineTo(last.x, last.y)
    }
    drawPath(path, color, style = Stroke(width = max(2f, strokeWidth)))
}

// --- Draggable helper --------------------------------------------------------------------------

private fun Modifier.boardDrag(scale: Double, startPoint: () -> Point, onStart: () -> Unit, onMove: (Point) -> Unit, onEnd: () -> Unit): Modifier =
    pointerInput(scale) {
        var running = Point(0.0, 0.0)
        detectDragGestures(
            onDragStart = { running = startPoint(); onStart() },
            onDrag = { change, amount ->
                change.consume()
                running = Point(running.x + amount.x / scale, running.y + amount.y / scale)
                onMove(running)
            },
            onDragEnd = { onEnd() },
            onDragCancel = { onEnd() },
        )
    }

// --- Notes ---------------------------------------------------------------------------------

@Composable
private fun NoteView(note: Note, view: BoardView, isSelected: Boolean, isLinkSource: Boolean, viewModel: WhiteboardViewModel) {
    val density = LocalDensity.current
    val currentNote = rememberUpdatedState(note)
    val screen = toScreen(Point(note.x, note.y), view)
    val widthDp = with(density) { (NOTE_WIDTH * view.scale).toFloat().toDp() }
    val heightDp = with(density) { (NOTE_HEIGHT * view.scale).toFloat().toDp() }
    val borderColor = when {
        isLinkSource -> MaterialTheme.colorScheme.tertiary
        isSelected -> MaterialTheme.colorScheme.primary
        else -> MaterialTheme.colorScheme.outline
    }

    Box(
        Modifier
            .offset { IntOffset(screen.x.roundToInt(), screen.y.roundToInt()) }
            .size(widthDp, heightDp)
            .background(toneColor(note.tone), RoundedCornerShape(8.dp))
            .border(if (isSelected || isLinkSource) 2.dp else 1.dp, borderColor, RoundedCornerShape(8.dp))
            .pointerInput(note.id) { detectTapGestures(onTap = { viewModel.tapNote(note.id) }) }
            .boardDrag(
                scale = view.scale,
                startPoint = { Point(currentNote.value.x, currentNote.value.y) },
                onStart = { viewModel.beginNoteDrag(note.id) },
                onMove = { viewModel.dragNoteTo(note.id, it) },
                onEnd = { viewModel.commitDrag() },
            )
            .padding(6.dp)
            .testTag("whiteboard_note_${note.id}"),
    ) {
        Text(
            note.text.ifBlank { stringResource(R.string.whiteboard_empty_note) },
            style = MaterialTheme.typography.bodySmall,
            maxLines = 4,
            overflow = TextOverflow.Ellipsis,
            color = if (note.text.isBlank()) MaterialTheme.colorScheme.onSurfaceVariant else MaterialTheme.colorScheme.onSurface,
        )
    }
}

@Composable
private fun NoteEditorDialog(note: Note, onSave: (Note) -> Unit, onDelete: () -> Unit, onDismiss: () -> Unit) {
    var text by remember(note.id) { mutableStateOf(note.text) }
    var tone by remember(note.id) { mutableStateOf(note.tone) }
    Dialog(onDismissRequest = { onSave(note.copy(text = text, tone = tone)); onDismiss() }) {
        Box(Modifier.background(MaterialTheme.colorScheme.surface, RoundedCornerShape(12.dp)).padding(16.dp)) {
            Column {
                Text(stringResource(R.string.whiteboard_note_dialog_title), style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.padding(4.dp))
                OutlinedTextField(value = text, onValueChange = { text = it }, modifier = Modifier.fillMaxWidth(), minLines = 3, maxLines = 6)
                Spacer(Modifier.padding(6.dp))
                Text(stringResource(R.string.whiteboard_colour_label), style = MaterialTheme.typography.labelMedium)
                Row(Modifier.fillMaxWidth().padding(vertical = 6.dp)) {
                    TONE_ORDER.forEach { candidate ->
                        Box(
                            Modifier
                                .padding(3.dp)
                                .size(28.dp)
                                .background(toneColor(candidate), RoundedCornerShape(6.dp))
                                .border(if (tone == candidate) 2.dp else 1.dp, if (tone == candidate) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline, RoundedCornerShape(6.dp))
                                .pointerInput(candidate) { detectTapGestures(onTap = { tone = candidate }) },
                        )
                    }
                }
                Row(Modifier.fillMaxWidth(), horizontalArrangement = androidx.compose.foundation.layout.Arrangement.SpaceBetween) {
                    TextButton(onClick = { onDelete(); onDismiss() }) { Text(stringResource(R.string.whiteboard_delete)) }
                    TextButton(onClick = { onSave(note.copy(text = text, tone = tone)); onDismiss() }) { Text(stringResource(R.string.whiteboard_done)) }
                }
            }
        }
    }
}

// --- Frames ----------------------------------------------------------------------------------

@Composable
private fun FrameView(frame: Frame, view: BoardView, isSelected: Boolean, onTap: () -> Unit, viewModel: WhiteboardViewModel) {
    val density = LocalDensity.current
    val currentFrame = rememberUpdatedState(frame)
    val screen = toScreen(Point(frame.x, frame.y), view)
    val widthDp = with(density) { (frame.width * view.scale).toFloat().toDp() }
    val heightDp = with(density) { (frame.height * view.scale).toFloat().toDp() }

    Box(
        Modifier
            .offset { IntOffset(screen.x.roundToInt(), screen.y.roundToInt()) }
            .size(widthDp, heightDp)
            .border(if (isSelected) 2.dp else 1.dp, if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline, RoundedCornerShape(4.dp))
            .pointerInput(frame.id) {
                detectTapGestures(onTap = { onTap() }, onDoubleTap = { viewModel.editFrame(frame.id) })
            }
            .boardDrag(
                scale = view.scale,
                startPoint = { Point(currentFrame.value.x, currentFrame.value.y) },
                onStart = { viewModel.beginFrameDrag(frame.id) },
                onMove = { viewModel.dragFrameTo(frame.id, it) },
                onEnd = { viewModel.commitDrag() },
            )
            .testTag("whiteboard_frame_${frame.id}"),
    ) {
        Text(
            frame.title,
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(4.dp),
        )
    }
}

@Composable
private fun FrameEditorDialog(frame: Frame, onSave: (Frame) -> Unit, onDelete: () -> Unit, onDismiss: () -> Unit) {
    var title by remember(frame.id) { mutableStateOf(frame.title) }
    var width by remember(frame.id) { mutableStateOf(frame.width.roundToInt().toString()) }
    var height by remember(frame.id) { mutableStateOf(frame.height.roundToInt().toString()) }
    Dialog(onDismissRequest = onDismiss) {
        Box(Modifier.background(MaterialTheme.colorScheme.surface, RoundedCornerShape(12.dp)).padding(16.dp)) {
            Column {
                Text(stringResource(R.string.whiteboard_frame_dialog_title), style = MaterialTheme.typography.titleMedium)
                OutlinedTextField(value = title, onValueChange = { title = it }, label = { Text(stringResource(R.string.whiteboard_title_label)) }, singleLine = true, modifier = Modifier.fillMaxWidth().padding(top = 8.dp))
                Row(Modifier.padding(top = 8.dp)) {
                    OutlinedTextField(value = width, onValueChange = { width = it.filter(Char::isDigit) }, label = { Text(stringResource(R.string.whiteboard_width_label)) }, singleLine = true, modifier = Modifier.weight(1f))
                    Spacer(Modifier.width(8.dp))
                    OutlinedTextField(value = height, onValueChange = { height = it.filter(Char::isDigit) }, label = { Text(stringResource(R.string.whiteboard_height_label)) }, singleLine = true, modifier = Modifier.weight(1f))
                }
                Row(Modifier.fillMaxWidth().padding(top = 8.dp), horizontalArrangement = androidx.compose.foundation.layout.Arrangement.SpaceBetween) {
                    TextButton(onClick = { onDelete(); onDismiss() }) { Text(stringResource(R.string.whiteboard_delete)) }
                    TextButton(onClick = {
                        onSave(frame.copy(title = title.ifBlank { frame.title }, width = width.toDoubleOrNull() ?: frame.width, height = height.toDoubleOrNull() ?: frame.height))
                        onDismiss()
                    }) { Text(stringResource(R.string.whiteboard_done)) }
                }
            }
        }
    }
}

// --- Images / files (render + preserve; see WhiteboardRoute's doc) --------------------------

@Composable
private fun PlaceholderTile(x: Double, y: Double, width: Double, height: Double, label: String, view: BoardView, isSelected: Boolean, onTap: () -> Unit, onDragStart: () -> Unit, onDragMove: (Point) -> Unit, onDragEnd: () -> Unit) {
    val density = LocalDensity.current
    val screen = toScreen(Point(x, y), view)
    val widthDp = with(density) { (width * view.scale).toFloat().toDp() }
    val heightDp = with(density) { (height * view.scale).toFloat().toDp() }
    val position = rememberUpdatedState(Point(x, y))

    Box(
        Modifier
            .offset { IntOffset(screen.x.roundToInt(), screen.y.roundToInt()) }
            .size(widthDp, heightDp)
            .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(6.dp))
            .border(if (isSelected) 2.dp else 1.dp, if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline, RoundedCornerShape(6.dp))
            .pointerInput(label, x, y) { detectTapGestures(onTap = { onTap() }) }
            .boardDrag(scale = view.scale, startPoint = { position.value }, onStart = onDragStart, onMove = onDragMove, onEnd = onDragEnd)
            .padding(6.dp),
    ) {
        Text(label, style = MaterialTheme.typography.labelSmall, maxLines = 2, overflow = TextOverflow.Ellipsis)
    }
}

// --- Minimap ---------------------------------------------------------------------------------

@Composable
private fun Minimap(state: WhiteboardUiState.Content, viewModel: WhiteboardViewModel, modifier: Modifier) {
    val density = LocalDensity.current
    val widthDp = 120.dp
    val heightDp = 76.dp
    val widthPx = with(density) { widthDp.toPx().toDouble() }
    val heightPx = with(density) { heightDp.toPx().toDouble() }
    val minimapSize = BoardSize(widthPx, heightPx)
    val viewportRect = remember(state.view, state.viewport) { minimapViewport(state.view, state.viewport, minimapSize) }
    val boardColor = MaterialTheme.colorScheme.surfaceVariant
    val outlineColor = MaterialTheme.colorScheme.outline
    val viewportColor = MaterialTheme.colorScheme.primary

    Box(
        modifier
            .size(widthDp, heightDp)
            .background(boardColor, RoundedCornerShape(6.dp))
            .border(1.dp, outlineColor, RoundedCornerShape(6.dp))
            .pointerInput(Unit) {
                detectDragGestures(
                    onDragStart = { offset -> viewModel.panFromMinimap(Point(offset.x.toDouble(), offset.y.toDouble()), minimapSize) },
                    onDrag = { change, _ -> change.consume(); viewModel.panFromMinimap(Point(change.position.x.toDouble(), change.position.y.toDouble()), minimapSize) },
                )
            }
            .testTag("whiteboard_minimap"),
    ) {
        Canvas(Modifier.fillMaxSize()) {
            drawRect(
                viewportColor,
                topLeft = Offset(viewportRect.x.toFloat(), viewportRect.y.toFloat()),
                size = androidx.compose.ui.geometry.Size(viewportRect.width.toFloat(), viewportRect.height.toFloat()),
                style = Stroke(width = 2f),
            )
        }
    }
}

// --- Bottom toolbar ---------------------------------------------------------------------------

@Composable
private fun BoardToolbar(state: WhiteboardUiState.Content, viewModel: WhiteboardViewModel) {
    Column(Modifier.fillMaxWidth().padding(8.dp)) {
        Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            ToolButton(stringResource(R.string.whiteboard_tool_select), state.tool == Tool.Select) { viewModel.setTool(Tool.Select) }
            ToolButton(stringResource(R.string.whiteboard_tool_pen), state.tool == Tool.Pen) { viewModel.setTool(Tool.Pen) }
            ToolButton(stringResource(R.string.whiteboard_tool_eraser), state.tool == Tool.Eraser) { viewModel.setTool(Tool.Eraser) }
            Spacer(Modifier.weight(1f))
            TextButton(onClick = { viewModel.addNoteAtCenter() }) { Text(stringResource(R.string.whiteboard_add_note_button)) }
            TextButton(onClick = { viewModel.addFrame() }) { Text(stringResource(R.string.whiteboard_add_frame_button)) }
        }
        if (state.tool == Tool.Pen) {
            Row(Modifier.fillMaxWidth().padding(top = 4.dp), verticalAlignment = Alignment.CenterVertically) {
                INK_COLOUR_IDS.forEach { id ->
                    Box(
                        Modifier
                            .padding(3.dp)
                            .size(22.dp)
                            .background(colorForInk(id), RoundedCornerShape(50))
                            .border(if (state.inkColourId == id) 2.dp else 1.dp, if (state.inkColourId == id) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline, RoundedCornerShape(50))
                            .pointerInput(id) { detectTapGestures(onTap = { viewModel.setInkColour(id) }) },
                    )
                }
                Spacer(Modifier.width(12.dp))
                INK_WIDTHS.forEach { width ->
                    TextButton(onClick = { viewModel.setInkWidth(width) }) { Text(width.roundToInt().toString(), color = if (state.inkWidth == width) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurface) }
                }
            }
        }
        val selectedNote = state.selectedNoteId
        val selectedFrame = state.selectedFrameId
        val selectedLink = state.selectedLinkId
        val selectedItem = state.selectedImageId ?: state.selectedFileId
        if (selectedNote != null || selectedFrame != null || selectedLink != null || selectedItem != null) {
            Row(Modifier.fillMaxWidth().padding(top = 4.dp), verticalAlignment = Alignment.CenterVertically) {
                when {
                    selectedNote != null -> {
                        TextButton(onClick = { viewModel.startLinking(selectedNote) }) {
                            Text(stringResource(if (state.linkingFromNoteId == null) R.string.whiteboard_connect else R.string.whiteboard_pick_a_note))
                        }
                        TextButton(onClick = { viewModel.tapNote(selectedNote) }) { Text(stringResource(R.string.whiteboard_edit)) }
                        TextButton(onClick = { viewModel.deleteNote(selectedNote) }) { Text(stringResource(R.string.whiteboard_delete)) }
                    }
                    selectedFrame != null -> {
                        TextButton(onClick = { viewModel.editFrame(selectedFrame) }) { Text(stringResource(R.string.whiteboard_edit)) }
                        TextButton(onClick = { viewModel.deleteFrame(selectedFrame) }) { Text(stringResource(R.string.whiteboard_delete)) }
                    }
                    selectedLink != null -> {
                        TextButton(onClick = { viewModel.straightenSelectedLink() }) { Text(stringResource(R.string.whiteboard_straighten_link)) }
                        TextButton(onClick = { viewModel.removeSelectedLink() }) { Text(stringResource(R.string.whiteboard_delete)) }
                    }
                    selectedItem != null -> {
                        TextButton(onClick = { viewModel.removeSelectedItem() }) { Text(stringResource(R.string.whiteboard_delete)) }
                    }
                }
                Spacer(Modifier.weight(1f))
                Text(stringResource(R.string.whiteboard_zoom_percent_format, (state.view.scale * 100).roundToInt()), style = MaterialTheme.typography.labelSmall)
            }
        }
    }
}

@Composable
private fun ToolButton(label: String, active: Boolean, onClick: () -> Unit) {
    TextButton(onClick = onClick) {
        Text(label, color = if (active) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurface)
    }
}
