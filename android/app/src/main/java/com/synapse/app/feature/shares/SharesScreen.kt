package com.synapse.app.feature.shares

import android.graphics.Bitmap
import android.graphics.pdf.PdfRenderer
import android.os.ParcelFileDescriptor
import android.provider.OpenableColumns
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.detectTransformGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.produceState
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.api.MyDocument
import com.synapse.app.core.api.ShareSummary
import com.synapse.app.core.notebook.Note
import com.synapse.app.core.shares.ShareAccess
import com.synapse.app.core.whiteboard.Board
import com.synapse.app.core.whiteboard.BoardState
import com.synapse.app.core.whiteboard.NOTE_HEIGHT
import com.synapse.app.core.whiteboard.NOTE_WIDTH
import com.synapse.app.core.whiteboard.NoteBox
import com.synapse.app.core.whiteboard.Point
import com.synapse.app.core.whiteboard.WhiteboardDocument
import com.synapse.app.core.whiteboard.anchorOf
import com.synapse.app.core.whiteboard.defaultControls
import com.synapse.app.core.whiteboard.filesOf
import com.synapse.app.core.whiteboard.imagesOf
import com.synapse.app.core.whiteboard.inkOf
import com.synapse.app.core.whiteboard.sidesBetween
import java.io.File
import kotlin.math.roundToInt

const val SHARES_LOADING_TAG = "shares_loading"
const val SHARES_DOCUMENTS_TAB_TAG = "shares_tab_documents"
const val SHARES_SHARES_TAB_TAG = "shares_tab_shares"
const val SHARES_MINE_SUBTAB_TAG = "shares_subtab_mine"
const val SHARES_DISCOVER_SUBTAB_TAG = "shares_subtab_discover"
const val SHARES_UPLOAD_BUTTON_TAG = "shares_upload_button"
const val SHARES_NEW_SHARE_BUTTON_TAG = "shares_new_share_button"
fun documentRowTag(id: String): String = "shares_document_$id"
fun documentDeleteButtonTag(id: String): String = "shares_document_delete_$id"
fun shareRowTag(id: String): String = "shares_share_$id"
fun shareStarButtonTag(id: String): String = "shares_star_$id"
fun shareFollowButtonTag(id: String): String = "shares_follow_$id"
fun shareDeleteButtonTag(id: String): String = "shares_delete_$id"
const val SHARES_DOCUMENT_READER_BACK_TAG = "shares_document_reader_back"
const val SHARES_SHARED_READER_BACK_TAG = "shares_shared_reader_back"
const val SHARES_SHARED_READER_TEXT_TAG = "shares_shared_reader_text"
const val SHARES_SHARED_BOARD_CANVAS_TAG = "shares_shared_board_canvas"

/**
 * The Shares + My Documents tab's single public entry point. Constructs its
 * own [SharesViewModel] via [hiltViewModel] — no navigation wiring required of
 * the caller. See [SharesViewModel]'s doc comment for what is implemented vs.
 * deliberately deferred.
 */
@Composable
fun SharesRoute(viewModel: SharesViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    when (val state = uiState) {
        is SharesUiState.Loading -> Box(Modifier.fillMaxSize().testTag(SHARES_LOADING_TAG), contentAlignment = Alignment.Center) {
            CircularProgressIndicator()
        }
        is SharesUiState.Content -> SharesContent(state, viewModel)
    }
}

@Composable
private fun SharesContent(state: SharesUiState.Content, viewModel: SharesViewModel) {
    when {
        state.documentReader != DocumentReaderState.Closed ->
            DocumentReaderPane(
                document = state.documents.firstOrNull { it.id == readerDocumentId(state.documentReader) },
                reader = state.documentReader,
                onBack = viewModel::closeDocumentReader,
                onRemoveDownload = { id -> viewModel.removeDownload(id) },
            )
        state.sharedReader != SharedReaderState.Closed ->
            SharedReaderPane(reader = state.sharedReader, onBack = viewModel::closeSharedReader)
        else -> TabbedPanes(state, viewModel)
    }
}

private fun readerDocumentId(reader: DocumentReaderState): String? = when (reader) {
    is DocumentReaderState.Downloading -> reader.documentId
    is DocumentReaderState.Ready -> reader.documentId
    is DocumentReaderState.Failed -> reader.documentId
    DocumentReaderState.Closed -> null
}

@Composable
private fun TabbedPanes(state: SharesUiState.Content, viewModel: SharesViewModel) {
    var tab by rememberSaveable { mutableIntStateOf(0) }
    Column(Modifier.fillMaxSize()) {
        TabRow(selectedTabIndex = tab) {
            Tab(selected = tab == 0, onClick = { tab = 0 }, text = { Text("My Documents") }, modifier = Modifier.testTag(SHARES_DOCUMENTS_TAB_TAG))
            Tab(selected = tab == 1, onClick = { tab = 1 }, text = { Text("Shares") }, modifier = Modifier.testTag(SHARES_SHARES_TAB_TAG))
        }
        state.error?.let { message ->
            Text(message, color = MaterialTheme.colorScheme.error, modifier = Modifier.padding(12.dp))
        }
        if (tab == 0) MyDocumentsPane(state, viewModel) else SharesPane(state, viewModel)
    }
}

// --- My Documents --------------------------------------------------------------

@Composable
private fun MyDocumentsPane(state: SharesUiState.Content, viewModel: SharesViewModel) {
    val context = LocalContext.current
    val uploadLauncher = rememberLauncherForActivityResult(ActivityResultContracts.OpenDocument()) { uri ->
        if (uri == null) return@rememberLauncherForActivityResult
        val resolver = context.contentResolver
        // ponytail: reads the whole file into memory before chunking rather than
        // streaming it — simplest correct thing for typical document sizes; move
        // to a streamed ContentResolver read per chunk if very large uploads OOM.
        val bytes = resolver.openInputStream(uri)?.use { it.readBytes() } ?: return@rememberLauncherForActivityResult
        var cursorName: String? = null
        resolver.query(uri, arrayOf(OpenableColumns.DISPLAY_NAME), null, null, null)?.use { cursor ->
            val column = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
            if (cursor.moveToFirst() && column >= 0) cursorName = cursor.getString(column)
        }
        val fileName = cursorName ?: uri.lastPathSegment ?: "Document"
        val mimeType = resolver.getType(uri)
        var offset = 0
        viewModel.uploadDocument(fileName, mimeType, bytes.size.toLong()) { _, chunkBytes ->
            val slice = bytes.copyOfRange(offset, offset + chunkBytes)
            offset += chunkBytes
            slice
        }
    }

    Column(Modifier.fillMaxSize().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text("My Documents", style = MaterialTheme.typography.titleLarge)
                if (state.quotaBytes > 0) {
                    Text("${formatBytes(state.usedBytes)} of ${formatBytes(state.quotaBytes)} used", style = MaterialTheme.typography.bodySmall)
                }
            }
            Button(onClick = { uploadLauncher.launch(arrayOf("*/*")) }, modifier = Modifier.testTag(SHARES_UPLOAD_BUTTON_TAG)) { Text("Upload") }
        }

        if (state.documents.isEmpty()) {
            Text("Nothing uploaded yet.", style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 24.dp))
        } else {
            Column(Modifier.weight(1f).fillMaxWidth().verticalScroll(rememberScrollState())) {
                state.documents.forEach { document ->
                    DocumentRow(document, onOpen = { viewModel.openDocument(document) }, onRename = { viewModel.renameDocument(document.id, it) }, onDelete = { viewModel.deleteDocument(document.id) })
                    HorizontalDivider()
                }
            }
        }
    }
}

@Composable
private fun DocumentRow(document: MyDocument, onOpen: () -> Unit, onRename: (String) -> Unit, onDelete: () -> Unit) {
    var renaming by remember { mutableStateOf(false) }
    Surface(onClick = onOpen, modifier = Modifier.fillMaxWidth().testTag(documentRowTag(document.id))) {
        Row(Modifier.fillMaxWidth().padding(vertical = 10.dp), verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text(document.title, style = MaterialTheme.typography.bodyLarge)
                Text("${document.mediaType ?: "file"} · ${formatBytes(document.sizeBytes)}", style = MaterialTheme.typography.bodySmall)
            }
            TextButton(onClick = { renaming = true }) { Text("Rename") }
            IconButton(onClick = onDelete, modifier = Modifier.testTag(documentDeleteButtonTag(document.id))) {
                Icon(Icons.Filled.Delete, contentDescription = "Delete")
            }
        }
    }
    if (renaming) {
        RenameDialog(initial = document.title, onConfirm = { onRename(it); renaming = false }, onDismiss = { renaming = false })
    }
}

@Composable
private fun RenameDialog(initial: String, onConfirm: (String) -> Unit, onDismiss: () -> Unit) {
    var text by remember { mutableStateOf(initial) }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Rename") },
        text = { OutlinedTextField(value = text, onValueChange = { text = it }, singleLine = true) },
        confirmButton = { TextButton(onClick = { onConfirm(text) }) { Text("Save") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}

@Composable
private fun DocumentReaderPane(document: MyDocument?, reader: DocumentReaderState, onBack: () -> Unit, onRemoveDownload: (String) -> Unit) {
    Column(Modifier.fillMaxSize().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            IconButton(onClick = onBack, modifier = Modifier.testTag(SHARES_DOCUMENT_READER_BACK_TAG)) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
            }
            Text(document?.title ?: "Document", style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
            if (reader is DocumentReaderState.Ready) {
                IconButton(onClick = { onRemoveDownload(reader.documentId) }) { Icon(Icons.Filled.Delete, contentDescription = "Remove download") }
            }
        }
        Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            when (reader) {
                is DocumentReaderState.Downloading -> Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    CircularProgressIndicator()
                    Text("Downloading…", modifier = Modifier.padding(top = 12.dp))
                }
                is DocumentReaderState.Failed -> Text(reader.message, style = MaterialTheme.typography.bodyMedium)
                is DocumentReaderState.Ready ->
                    if (reader.mediaType.equals("pdf", ignoreCase = true)) {
                        DocumentPdfViewer(reader.file)
                    } else {
                        Text("This file type isn't supported in the reader yet — it has been downloaded to the app's storage.", style = MaterialTheme.typography.bodyMedium)
                    }
                DocumentReaderState.Closed -> Unit
            }
        }
    }
}

/**
 * A minimal single-page-at-a-time PDF viewer, the same shape as
 * `feature.resources.ResourcesScreen`'s `PdfPageViewer` (kept as its own
 * small copy rather than shared — that one is a private implementation
 * detail of Resources, and this feature is deliberately self-contained; see
 * `di/SharesApiModule.kt`'s doc comment on why).
 */
@Composable
private fun DocumentPdfViewer(file: File) {
    var pageIndex by rememberSaveable(file.absolutePath) { mutableIntStateOf(0) }
    val renderer = remember(file.absolutePath) {
        runCatching { PdfRenderer(ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY)) }.getOrNull()
    }
    DisposableEffect(renderer) { onDispose { renderer?.close() } }

    if (renderer == null) {
        Text("This document could not be opened as a PDF.", style = MaterialTheme.typography.bodyMedium)
        return
    }
    val pageCount = renderer.pageCount
    val currentPage = pageIndex.coerceIn(0, (pageCount - 1).coerceAtLeast(0))
    val bitmap by produceState<Bitmap?>(initialValue = null, key1 = file.absolutePath, key2 = currentPage) {
        value = runCatching {
            val page = renderer.openPage(currentPage)
            try {
                val rendered = Bitmap.createBitmap(page.width * 2, page.height * 2, Bitmap.Config.ARGB_8888)
                page.render(rendered, null, null, PdfRenderer.Page.RENDER_MODE_FOR_DISPLAY)
                rendered
            } finally {
                page.close()
            }
        }.getOrNull()
    }
    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxSize()) {
        Box(Modifier.weight(1f).fillMaxWidth(), contentAlignment = Alignment.Center) {
            val current = bitmap
            if (current != null) Image2(current) else CircularProgressIndicator()
        }
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(vertical = 8.dp)) {
            TextButton(onClick = { if (currentPage > 0) pageIndex = currentPage - 1 }, enabled = currentPage > 0) { Text("Previous") }
            Text("${currentPage + 1} of $pageCount", modifier = Modifier.padding(horizontal = 8.dp))
            TextButton(onClick = { if (currentPage < pageCount - 1) pageIndex = currentPage + 1 }, enabled = currentPage < pageCount - 1) { Text("Next") }
        }
    }
}

@Composable
private fun Image2(bitmap: Bitmap) {
    androidx.compose.foundation.Image(bitmap = bitmap.asImageBitmap(), contentDescription = "Page")
}

// --- Shares -----------------------------------------------------------------

@Composable
private fun SharesPane(state: SharesUiState.Content, viewModel: SharesViewModel) {
    var showMine by rememberSaveable { mutableStateOf(true) }
    var showPublishPicker by rememberSaveable { mutableStateOf(false) }

    Column(Modifier.fillMaxSize().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("Shares", style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
            Button(onClick = { showPublishPicker = true }, modifier = Modifier.testTag(SHARES_NEW_SHARE_BUTTON_TAG)) { Text("New share") }
        }
        Row(Modifier.padding(top = 8.dp), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            FilterChip(selected = showMine, onClick = { showMine = true }, label = { Text("Mine") }, modifier = Modifier.testTag(SHARES_MINE_SUBTAB_TAG))
            FilterChip(selected = !showMine, onClick = { showMine = false }, label = { Text("Discover") }, modifier = Modifier.testTag(SHARES_DISCOVER_SUBTAB_TAG))
        }

        val list = if (showMine) state.myShares else state.discoverableShares
        if (list.isEmpty()) {
            Text(if (showMine) "You haven't shared anything yet." else "Nothing shared with your cohort yet.", modifier = Modifier.padding(top = 24.dp))
        } else {
            Column(Modifier.weight(1f).fillMaxWidth().verticalScroll(rememberScrollState())) {
                list.forEach { share ->
                    ShareRow(
                        share = share,
                        onOpen = { viewModel.openShare(share.id) },
                        onToggleStar = { viewModel.toggleStar(share) },
                        onToggleFollow = { viewModel.toggleFollow(share) },
                        onDelete = { viewModel.deleteShare(share.id) },
                    )
                    HorizontalDivider()
                }
            }
        }
    }

    if (showPublishPicker) {
        PublishPickerDialog(
            state = state,
            onPublishNote = { note, access -> viewModel.publishNote(note, access); showPublishPicker = false },
            onPublishBoard = { board, access -> viewModel.publishBoard(board, access); showPublishPicker = false },
            onDismiss = { showPublishPicker = false },
        )
    }
}

@Composable
private fun ShareRow(share: ShareSummary, onOpen: () -> Unit, onToggleStar: () -> Unit, onToggleFollow: () -> Unit, onDelete: () -> Unit) {
    Surface(onClick = onOpen, modifier = Modifier.fillMaxWidth().testTag(shareRowTag(share.id))) {
        Row(Modifier.fillMaxWidth().padding(vertical = 10.dp), verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text(share.title, style = MaterialTheme.typography.bodyLarge)
                val detail = listOfNotNull(share.kind, share.access, share.ownerName?.let { "by $it" }).joinToString(" · ")
                Text(detail, style = MaterialTheme.typography.bodySmall)
            }
            IconButton(onClick = onToggleStar, modifier = Modifier.testTag(shareStarButtonTag(share.id))) {
                Icon(
                    Icons.Filled.Star,
                    contentDescription = if (share.starred) "Starred" else "Star",
                    tint = if (share.starred) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
            if (!share.isOwner) {
                TextButton(onClick = onToggleFollow, modifier = Modifier.testTag(shareFollowButtonTag(share.id))) {
                    Text(if (share.following) "Following" else "Follow")
                }
            }
            if (share.isOwner) {
                IconButton(onClick = onDelete, modifier = Modifier.testTag(shareDeleteButtonTag(share.id))) {
                    Icon(Icons.Filled.Delete, contentDescription = "Delete share")
                }
            }
        }
    }
}

@Composable
private fun PublishPickerDialog(
    state: SharesUiState.Content,
    onPublishNote: (Note, String) -> Unit,
    onPublishBoard: (WhiteboardDocument, String) -> Unit,
    onDismiss: () -> Unit,
) {
    var access by remember { mutableStateOf(ShareAccess.VIEW) }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Share one of your things") },
        text = {
            Column(Modifier.height(360.dp).verticalScroll(rememberScrollState())) {
                Text("Access", style = MaterialTheme.typography.labelMedium)
                Row(Modifier.padding(top = 4.dp, bottom = 8.dp), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    FilterChip(selected = access == ShareAccess.VIEW, onClick = { access = ShareAccess.VIEW }, label = { Text("View") })
                    FilterChip(selected = access == ShareAccess.EDIT, onClick = { access = ShareAccess.EDIT }, label = { Text("Edit") })
                }
                if (state.shareableNotes.isEmpty() && state.shareableBoards.isEmpty()) {
                    Text("Nothing to share yet — write a note or start a board first.", style = MaterialTheme.typography.bodyMedium)
                }
                state.shareableNotes.forEach { note ->
                    PublishRow(title = note.title.ifBlank { "Untitled note" }, subtitle = "Note", onClick = { onPublishNote(note, access) })
                }
                state.shareableBoards.forEach { board ->
                    PublishRow(title = board.title, subtitle = "Board", onClick = { onPublishBoard(board, access) })
                }
            }
        },
        confirmButton = { TextButton(onClick = onDismiss) { Text("Close") } },
    )
}

@Composable
private fun PublishRow(title: String, subtitle: String, onClick: () -> Unit) {
    Surface(onClick = onClick, modifier = Modifier.fillMaxWidth()) {
        Column(Modifier.fillMaxWidth().padding(vertical = 8.dp)) {
            Text(title, style = MaterialTheme.typography.bodyMedium)
            Text(subtitle, style = MaterialTheme.typography.bodySmall)
        }
    }
}

// --- Shared-document reader ---------------------------------------------------

@Composable
private fun SharedReaderPane(reader: SharedReaderState, onBack: () -> Unit) {
    Column(Modifier.fillMaxSize().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack, modifier = Modifier.testTag(SHARES_SHARED_READER_BACK_TAG)) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
            }
            val title = when (reader) {
                is SharedReaderState.NoteReady -> reader.share.title
                is SharedReaderState.BoardReady -> reader.share.title
                else -> "Shared item"
            }
            Text(title, style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
        }
        Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            when (reader) {
                is SharedReaderState.Loading -> CircularProgressIndicator()
                is SharedReaderState.Failed -> Text(reader.message, style = MaterialTheme.typography.bodyMedium)
                is SharedReaderState.NoteReady -> Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
                    Text(reader.text, modifier = Modifier.testTag(SHARES_SHARED_READER_TEXT_TAG))
                }
                is SharedReaderState.BoardReady -> SharedBoardCanvas(reader.board)
                SharedReaderState.Closed -> Unit
            }
        }
    }
}

/**
 * Read-only render of a shared whiteboard, reusing `core.whiteboard`'s pure
 * geometry ([Board], [anchorOf], [sidesBetween], [defaultControls]) — the same
 * math `feature.whiteboard.WhiteboardScreen`'s canvas draws from — rather than
 * a second parallel coordinate system. Deliberately does not reuse that
 * screen's `WhiteboardCanvas` composable itself: it is wired directly to a
 * live [com.synapse.app.feature.whiteboard.WhiteboardViewModel] for editing
 * (drag, undo/redo, tool state) that a foreign, read-only shared board has no
 * business driving. Pan/zoom only; no editing, matching the brief's "render
 * read-only" scope for a shared board.
 */
@Composable
private fun SharedBoardCanvas(board: BoardState) {
    var view by remember(board) { mutableStateOf(fitView(board)) }
    val notesById = remember(board.notes) { board.notes.associateBy { it.id } }
    val linkColor = MaterialTheme.colorScheme.primary
    val drawingColor = MaterialTheme.colorScheme.onSurface

    Box(
        Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .pointerInput(Unit) {
                detectTransformGestures { _, pan, zoom, _ ->
                    view = view.copy(x = view.x + pan.x, y = view.y + pan.y, scale = (view.scale * zoom).coerceIn(0.1, 3.0))
                }
            }
            .testTag(SHARES_SHARED_BOARD_CANVAS_TAG),
    ) {
        Canvas(Modifier.fillMaxSize()) {
            for (link in board.links) {
                val from = notesById[link.from] ?: continue
                val to = notesById[link.to] ?: continue
                drawSharedLink(NoteBox(from.id, from.x, from.y), NoteBox(to.id, to.x, to.y), link.c1, link.c2, view, linkColor)
            }
            for (stroke in inkOf(board)) {
                drawSharedInk(stroke.points, view, drawingColor, (stroke.width * view.scale).toFloat())
            }
        }
        val density = androidx.compose.ui.platform.LocalDensity.current
        for (frame in board.frames) {
            BoardTile(x = frame.x, y = frame.y, width = frame.width, height = frame.height, view = view, density = density, background = null) {
                Text(frame.title, style = MaterialTheme.typography.labelSmall, modifier = Modifier.padding(4.dp))
            }
        }
        for (image in imagesOf(board)) {
            BoardTile(x = image.x, y = image.y, width = image.width, height = image.height, view = view, density = density, background = MaterialTheme.colorScheme.surfaceVariant) {
                Text(image.alt.ifBlank { "Image" }, style = MaterialTheme.typography.labelSmall, maxLines = 2, overflow = TextOverflow.Ellipsis, modifier = Modifier.padding(6.dp))
            }
        }
        for (file in filesOf(board)) {
            BoardTile(x = file.x, y = file.y, width = 210.0, height = 78.0, view = view, density = density, background = MaterialTheme.colorScheme.surfaceVariant) {
                Text(file.name, style = MaterialTheme.typography.labelSmall, maxLines = 2, overflow = TextOverflow.Ellipsis, modifier = Modifier.padding(6.dp))
            }
        }
        for (note in board.notes) {
            BoardTile(x = note.x, y = note.y, width = NOTE_WIDTH, height = NOTE_HEIGHT, view = view, density = density, background = toneColor(note.tone)) {
                Text(
                    note.text.ifBlank { "Empty note" },
                    style = MaterialTheme.typography.bodySmall,
                    maxLines = 4,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.padding(6.dp),
                )
            }
        }
    }
}

/** One board item placed at its board coordinates, converted to screen pixels via [view] — the same transform `feature.whiteboard.WhiteboardScreen`'s `toScreen` applies. */
@Composable
private fun BoardTile(
    x: Double,
    y: Double,
    width: Double,
    height: Double,
    view: com.synapse.app.core.whiteboard.BoardView,
    density: androidx.compose.ui.unit.Density,
    background: Color?,
    content: @Composable () -> Unit,
) {
    val screenX = (x * view.scale + view.x).roundToInt()
    val screenY = (y * view.scale + view.y).roundToInt()
    val widthDp = with(density) { (width * view.scale).toFloat().toDp() }
    val heightDp = with(density) { (height * view.scale).toFloat().toDp() }
    Box(
        Modifier
            .offset { androidx.compose.ui.unit.IntOffset(screenX, screenY) }
            .width(widthDp)
            .height(heightDp)
            .let { if (background != null) it.background(background, RoundedCornerShape(6.dp)) else it }
            .border(1.dp, MaterialTheme.colorScheme.outline, RoundedCornerShape(6.dp)),
    ) { content() }
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

private fun fitView(board: BoardState): com.synapse.app.core.whiteboard.BoardView {
    val xs = board.notes.flatMap { listOf(it.x, it.x + NOTE_WIDTH) } +
        board.frames.flatMap { listOf(it.x, it.x + it.width) } +
        imagesOf(board).flatMap { listOf(it.x, it.x + it.width) } +
        filesOf(board).flatMap { listOf(it.x, it.x + 210.0) }
    val ys = board.notes.flatMap { listOf(it.y, it.y + NOTE_HEIGHT) } +
        board.frames.flatMap { listOf(it.y, it.y + it.height) } +
        imagesOf(board).flatMap { listOf(it.y, it.y + it.height) } +
        filesOf(board).flatMap { listOf(it.y, it.y + 78.0) }
    val minX = (xs.minOrNull() ?: 0.0) - 60
    val minY = (ys.minOrNull() ?: 0.0) - 60
    // A fixed, generous starting scale: the exact viewport size isn't known
    // until layout, and a shared board is read-only, so "start zoomed out a
    // bit and let the student pinch in" is enough — unlike the editor, there
    // is no minimap here to jump back from if `fit()`'s own math is off.
    val scale = 0.35
    return com.synapse.app.core.whiteboard.BoardView(x = -minX * scale, y = -minY * scale, scale = scale)
}

private fun DrawScope.drawSharedLink(from: NoteBox, to: NoteBox, c1: Point?, c2: Point?, view: com.synapse.app.core.whiteboard.BoardView, color: Color) {
    val sides = sidesBetween(from, to)
    val start = anchorOf(from, sides.from)
    val end = anchorOf(to, sides.to)
    val controls = if (c1 != null && c2 != null) c1 to c2 else defaultControls(start, end)
    val path = Path().apply {
        moveTo((start.x * view.scale + view.x).toFloat(), (start.y * view.scale + view.y).toFloat())
        cubicTo(
            (controls.first.x * view.scale + view.x).toFloat(), (controls.first.y * view.scale + view.y).toFloat(),
            (controls.second.x * view.scale + view.x).toFloat(), (controls.second.y * view.scale + view.y).toFloat(),
            (end.x * view.scale + view.x).toFloat(), (end.y * view.scale + view.y).toFloat(),
        )
    }
    drawPath(path, color, style = Stroke(width = 1.5f * view.scale.toFloat()))
}

private fun DrawScope.drawSharedInk(points: List<Double>, view: com.synapse.app.core.whiteboard.BoardView, color: Color, strokeWidth: Float) {
    if (points.size < 2) return
    fun screen(x: Double, y: Double) = Offset((x * view.scale + view.x).toFloat(), (y * view.scale + view.y).toFloat())
    val path = Path()
    val first = screen(points[0], points[1])
    path.moveTo(first.x, first.y)
    var i = 2
    while (i + 3 < points.size) {
        val mid = screen((points[i] + points[i + 2]) / 2, (points[i + 1] + points[i + 3]) / 2)
        val control = screen(points[i], points[i + 1])
        path.quadraticTo(control.x, control.y, mid.x, mid.y)
        i += 2
    }
    if (points.size >= 4) {
        val last = screen(points[points.size - 2], points[points.size - 1])
        path.lineTo(last.x, last.y)
    }
    drawPath(path, color, style = Stroke(width = maxOf(2f, strokeWidth)))
}

private fun formatBytes(bytes: Long): String = when {
    bytes >= 1024 * 1024 -> "%.1f MB".format(bytes / (1024.0 * 1024.0))
    bytes >= 1024 -> "%.0f KB".format(bytes / 1024.0)
    else -> "$bytes B"
}
