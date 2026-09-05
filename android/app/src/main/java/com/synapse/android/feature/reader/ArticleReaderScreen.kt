package com.synapse.android.feature.reader

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectDragGesturesAfterLongPress
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextLayoutResult
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.synapse.android.AppGraph
import com.synapse.android.core.library.LibraryMark
import com.synapse.android.core.library.LibraryMarks
import com.synapse.android.core.library.TextRange
import com.synapse.android.core.reader.Article
import com.synapse.android.core.reader.ArticleBlock
import com.synapse.android.core.reader.RelatedArticle
import com.synapse.android.core.ui.StateHost
import com.synapse.android.core.ui.UiState
import com.synapse.android.design.CortexRadius
import com.synapse.android.design.LocalCortex

/**
 * The article Reader, a pushed destination reached from the Library. A port of
 * the article half of iOS `ArticleReaderView`: authored prose read for hours,
 * so the body is serif and nothing competes with it -- key points, traps and
 * related reading sit after the article rather than beside it.
 *
 * Also ports iOS `MarkableText` + the highlight/note half of
 * `ArticleReaderView` (M6): long-pressing and dragging over a paragraph or a
 * verified fact selects it, from which a student can highlight (four tones)
 * or attach a note; existing marks resolve back onto the prose and are drawn
 * underneath it. See [ArticleReaderViewModel]'s class doc for the storage
 * side of that.
 *
 * @param onOpenArticle opens another article in the Reader (a "read next"
 *   link); the caller pushes a fresh Reader destination so system back returns
 *   here, matching iOS's `NavigationLink`.
 */
@Composable
fun ArticleReaderRoute(
    graph: AppGraph,
    articleId: String,
    onBack: () -> Unit,
    onOpenArticle: (String) -> Unit,
) {
    val viewModel: ArticleReaderViewModel = viewModel(factory = ArticleReaderViewModel.factory(graph.store, graph.sync))
    val state by viewModel.state.collectAsState()
    val marksStore by viewModel.marksStore.collectAsState()
    val saveFailed by viewModel.saveFailed.collectAsState()

    LaunchedEffect(articleId) { viewModel.load(articleId) }

    ArticleReaderScreen(
        state = state,
        marks = LibraryMarks.marks(marksStore, articleId),
        saveFailed = saveFailed,
        onBack = onBack,
        onOpenArticle = onOpenArticle,
        onCreateMark = { blockId, blockText, range, tone, onCreated ->
            viewModel.addMark(articleId, blockId, blockText, range, tone, onCreated)
        },
        onUpdateMark = viewModel::updateMark,
        onRemoveMark = { markId -> viewModel.removeMark(articleId, markId) },
        onAcknowledgeSaveFailure = viewModel::acknowledgeSaveFailure,
    )
}

@Composable
fun ArticleReaderScreen(
    state: UiState<Article>,
    marks: List<LibraryMark> = emptyList(),
    saveFailed: Boolean = false,
    onBack: () -> Unit,
    onOpenArticle: (String) -> Unit,
    onCreateMark: (blockId: String, blockText: String, range: TextRange, tone: String, onCreated: (LibraryMark) -> Unit) -> Unit = { _, _, _, _, _ -> },
    onUpdateMark: (LibraryMark) -> Unit = {},
    onRemoveMark: (markId: String) -> Unit = {},
    onAcknowledgeSaveFailure: () -> Unit = {},
) {
    val cortex = LocalCortex.current
    BackHandler(onBack = onBack)

    var pendingSelection by remember { mutableStateOf<PendingSelection?>(null) }
    var editingMark by remember { mutableStateOf<LibraryMark?>(null) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(cortex.paper),
    ) {
        ReaderHeader(onBack = onBack)
        StateHost(state = state, modifier = Modifier.fillMaxSize()) { article ->
            ArticleBody(
                article = article,
                marks = marks,
                onOpenArticle = onOpenArticle,
                onSelectionFinished = { blockId, blockText, range -> pendingSelection = PendingSelection(blockId, blockText, range) },
                onOpenMark = { id -> editingMark = marks.firstOrNull { it.id == id } },
            )
        }
    }

    val selection = pendingSelection
    if (selection != null) {
        SelectionDialog(
            onTone = { tone ->
                onCreateMark(selection.blockId, selection.blockText, selection.range, tone) {}
                pendingSelection = null
            },
            onNote = {
                onCreateMark(selection.blockId, selection.blockText, selection.range, LibraryMarks.offeredTones.first()) { mark ->
                    editingMark = mark
                }
                pendingSelection = null
            },
            onDismiss = { pendingSelection = null },
        )
    }

    val mark = editingMark
    if (mark != null) {
        MarkNoteDialog(
            mark = mark,
            onDismiss = { editingMark = null },
            onSave = { updated -> onUpdateMark(updated); editingMark = null },
            onRemove = { onRemoveMark(mark.id); editingMark = null },
        )
    }

    if (saveFailed) {
        AlertDialog(
            onDismissRequest = onAcknowledgeSaveFailure,
            confirmButton = { TextButton(onClick = onAcknowledgeSaveFailure) { Text("OK") } },
            title = { Text("Couldn't save") },
            text = { Text("That highlight or note wasn't saved. Try again.") },
        )
    }
}

/** A selection a student just made, waiting on a tone (or a note) to become a mark. */
private data class PendingSelection(val blockId: String, val blockText: String, val range: TextRange)

@Composable
private fun ArticleBody(
    article: Article,
    marks: List<LibraryMark>,
    onOpenArticle: (String) -> Unit,
    onSelectionFinished: (blockId: String, blockText: String, range: TextRange) -> Unit,
    onOpenMark: (String) -> Unit,
) {
    val cortex = LocalCortex.current

    // The blocks a student can mark: prose and verified facts, exactly the
    // set iOS's `markableBlocks` draws from. The block id only has to be
    // consistent with itself between this composable's own renders -- see
    // `LibraryMark.kt`'s doc on `TextAnchor.block` -- so the block's index in
    // `article.blocks` (matching this screen's own `LazyColumn` item keys) is
    // enough; a mark made on the web or iOS never carries this id anyway and
    // falls back to `LibraryMarks.place`'s content search.
    val markableBlocks = remember(article) {
        article.blocks.mapIndexedNotNull { index, block ->
            when (block) {
                is ArticleBlock.Paragraph -> "block:$index" to block.text
                is ArticleBlock.Fact -> "block:$index" to block.text
                else -> null
            }
        }
    }
    val (placements, orphans) = remember(marks, markableBlocks) { LibraryMarks.place(marks, markableBlocks) }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 20.dp, vertical = 20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        item(key = "header") {
            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(
                    article.title,
                    fontSize = 26.sp,
                    fontWeight = FontWeight.Bold,
                    color = cortex.ink,
                    modifier = Modifier.semantics { heading() },
                )
                Text("${article.readingMinutes} min read", fontSize = 12.sp, color = cortex.ink3, fontFamily = FontFamily.Monospace)
                if (article.summary.isNotEmpty()) {
                    Text(article.summary, fontSize = 16.sp, color = cortex.ink2)
                }
            }
        }

        items(article.blocks.size, key = { "b-$it" }) { index ->
            val blockId = "block:$index"
            BlockView(
                block = article.blocks[index],
                blockId = blockId,
                placements = placements[blockId] ?: emptyList(),
                onSelectionFinished = onSelectionFinished,
                onOpenMark = onOpenMark,
            )
        }

        if (article.keyPoints.isNotEmpty()) {
            item(key = "hold") { Panel(title = "Hold these", items = article.keyPoints, accent = true) }
        }
        if (article.traps.isNotEmpty()) {
            item(key = "traps") { Panel(title = "Where people lose the mark", items = article.traps, accent = false) }
        }
        if (marks.isNotEmpty()) {
            item(key = "marks") {
                YourMarksPanel(marks = marks, orphanIds = orphans.map { it.id }.toSet(), onOpenMark = onOpenMark)
            }
        }
        if (article.relatedArticles.isNotEmpty()) {
            item(key = "related") { RelatedReading(article.relatedArticles, onOpenArticle) }
        }
    }
}

@Composable
private fun BlockView(
    block: ArticleBlock,
    blockId: String,
    placements: List<LibraryMarks.Placement>,
    onSelectionFinished: (blockId: String, blockText: String, range: TextRange) -> Unit,
    onOpenMark: (String) -> Unit,
) {
    val cortex = LocalCortex.current
    when (block) {
        is ArticleBlock.Heading -> Text(
            block.text,
            fontSize = 19.sp,
            fontWeight = FontWeight.Bold,
            color = cortex.ink,
            modifier = Modifier.padding(top = 4.dp).semantics { heading() },
        )

        // Serif for the body: long-form reading wants a book face, matching iOS.
        is ArticleBlock.Paragraph -> MarkableProse(
            text = block.text,
            blockId = blockId,
            placements = placements,
            fontFamily = FontFamily.Serif,
            fontSize = 17.sp,
            color = cortex.ink,
            onSelectionFinished = onSelectionFinished,
            onOpenMark = onOpenMark,
        )

        is ArticleBlock.Callout -> Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(CortexRadius.lg))
                .background(cortex.primaryTint)
                .border(1.dp, cortex.primaryLine, RoundedCornerShape(CortexRadius.lg))
                .padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(4.dp),
        ) {
            Text(block.title.uppercase(), fontSize = 11.sp, fontWeight = FontWeight.Bold, color = cortex.primaryStrong)
            Text(block.text, fontSize = 15.sp, color = cortex.ink)
        }

        // A cited statement takes the structural accent, not the action colour.
        is ArticleBlock.Fact -> Row(modifier = Modifier.fillMaxWidth()) {
            Box(
                modifier = Modifier
                    .width(2.dp)
                    .height(20.dp)
                    .background(cortex.accent),
            )
            Spacer(Modifier.width(10.dp))
            MarkableProse(
                text = block.text,
                blockId = blockId,
                placements = placements,
                fontFamily = FontFamily.Serif,
                fontSize = 16.sp,
                color = cortex.ink,
                onSelectionFinished = onSelectionFinished,
                onOpenMark = onOpenMark,
            )
        }

        is ArticleBlock.SourcesHeader -> Row(
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            Text("Sources", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = cortex.ink2)
            Text("${block.count}", fontSize = 11.sp, color = cortex.ink3, fontFamily = FontFamily.Monospace)
            Box(modifier = Modifier.weight(1f).height(1.dp).background(cortex.line))
        }
    }
}

/**
 * Article prose a student can select and mark -- a `Text` with two gesture
 * detectors layered on: a long-press-then-drag reports the selected range
 * (via [TextLayoutResult.getOffsetForPosition], the only way Compose's plain
 * `Text` hands back character offsets), and a tap opens the note on an
 * existing mark under the tapped point. Resolved marks are painted as a
 * translucent background span -- no underline layer, unlike iOS's
 * `UITextView` rendering, since `AnnotatedString` has no separate
 * underline-colour attribute; the background alone is legible against the
 * reader's paper background at the tones' alpha.
 *
 * Concept-term links (iOS's `ConceptText` split) are not ported here -- see
 * this task's report.
 */
@Composable
private fun MarkableProse(
    text: String,
    blockId: String,
    placements: List<LibraryMarks.Placement>,
    fontFamily: FontFamily,
    fontSize: TextUnit,
    color: Color,
    onSelectionFinished: (blockId: String, blockText: String, range: TextRange) -> Unit,
    onOpenMark: (String) -> Unit,
) {
    var layoutResult by remember { mutableStateOf<TextLayoutResult?>(null) }
    var dragStart by remember { mutableStateOf(-1) }
    var dragEnd by remember { mutableStateOf(-1) }

    val annotated = remember(text, placements) {
        buildAnnotatedString {
            append(text)
            for (placement in placements) {
                val start = placement.range.start.coerceIn(0, text.length)
                val end = placement.range.end.coerceIn(start, text.length)
                if (end > start) {
                    addStyle(
                        SpanStyle(background = MarkTonePalette.color(placement.mark.tone, color).copy(alpha = 0.25f)),
                        start,
                        end,
                    )
                }
            }
        }
    }

    Text(
        text = annotated,
        fontFamily = fontFamily,
        fontSize = fontSize,
        color = color,
        onTextLayout = { layoutResult = it },
        modifier = Modifier
            .fillMaxWidth()
            .pointerInput(text, placements) {
                detectTapGestures { offset ->
                    val index = layoutResult?.getOffsetForPosition(offset) ?: return@detectTapGestures
                    val hit = placements.firstOrNull { index >= it.range.start && index < it.range.end }
                    if (hit != null) onOpenMark(hit.mark.id)
                }
            }
            .pointerInput(text) {
                detectDragGesturesAfterLongPress(
                    onDragStart = { offset ->
                        val index = layoutResult?.getOffsetForPosition(offset) ?: 0
                        dragStart = index
                        dragEnd = index
                    },
                    onDrag = { change, _ ->
                        change.consume()
                        dragEnd = layoutResult?.getOffsetForPosition(change.position) ?: dragEnd
                    },
                    onDragEnd = {
                        val start = minOf(dragStart, dragEnd)
                        val end = maxOf(dragStart, dragEnd)
                        if (dragStart >= 0 && end > start) {
                            onSelectionFinished(blockId, text, TextRange(start, end))
                        }
                        dragStart = -1
                        dragEnd = -1
                    },
                )
            },
    )
}

/** A mark's tone drawn as a colour. Covers the whole `NOTE_TONES` palette an author can write, not only the four this app's own picker offers -- an unknown tone falls back to [fallback] rather than vanishing. Mirrors iOS `MarkTonePalette`. */
private object MarkTonePalette {
    private val hex: Map<String, Long> = mapOf(
        "amber" to 0xc2691c, "teal" to 0x2f7d6b, "rose" to 0xb03a76, "sage" to 0x4f8f3a,
        "slate" to 0x5b6570, "sand" to 0x8a6d3b, "clay" to 0xc2352f, "paper" to 0x8a8578,
    )

    fun color(tone: String, fallback: Color): Color = hex[tone]?.let { Color(0xFF000000 or it) } ?: fallback

    /** "amber" -> "Amber", for a swatch's accessibility label. */
    fun label(tone: String): String = if (tone.isEmpty()) tone else tone.replaceFirstChar { it.uppercase() }
}

/** A fresh selection: pick a tone to highlight in, or open a note on it. */
@Composable
private fun SelectionDialog(onTone: (String) -> Unit, onNote: () -> Unit, onDismiss: () -> Unit) {
    val cortex = LocalCortex.current
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Mark this selection") },
        text = {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                LibraryMarks.offeredTones.forEach { tone ->
                    Box(
                        modifier = Modifier
                            .size(28.dp)
                            .clip(CircleShape)
                            .background(MarkTonePalette.color(tone, cortex.accent))
                            .clickable { onTone(tone) }
                            .semantics { contentDescription = MarkTonePalette.label(tone) },
                    )
                }
            }
        },
        confirmButton = { TextButton(onClick = onNote) { Text("Add note") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}

/** Reading, writing and removing one mark's tone and note. */
@Composable
private fun MarkNoteDialog(mark: LibraryMark, onDismiss: () -> Unit, onSave: (LibraryMark) -> Unit, onRemove: () -> Unit) {
    val cortex = LocalCortex.current
    var note by remember(mark.id) { mutableStateOf(mark.note) }
    var tone by remember(mark.id) { mutableStateOf(mark.tone) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Your note") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Text(
                    "“${mark.anchor.exact}”",
                    fontFamily = FontFamily.Serif,
                    fontStyle = FontStyle.Italic,
                    color = cortex.ink2,
                )
                Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    LibraryMarks.offeredTones.forEach { option ->
                        Box(
                            modifier = Modifier
                                .size(24.dp)
                                .clip(CircleShape)
                                .background(MarkTonePalette.color(option, cortex.accent))
                                .border(
                                    width = if (tone == option) 2.dp else 1.dp,
                                    color = if (tone == option) cortex.ink else cortex.line,
                                    shape = CircleShape,
                                )
                                .clickable { tone = option }
                                .semantics { contentDescription = MarkTonePalette.label(option) },
                        )
                    }
                }
                OutlinedTextField(
                    value = note,
                    onValueChange = { note = it },
                    label = { Text("Note") },
                    modifier = Modifier.fillMaxWidth().height(120.dp),
                )
                TextButton(
                    onClick = onRemove,
                    modifier = Modifier.semantics { contentDescription = "Remove highlight" },
                ) { Text("Remove") }
            }
        },
        confirmButton = {
            TextButton(onClick = { onSave(mark.copy(tone = tone, note = note)) }) { Text("Done") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}

/**
 * Every mark on this article, in one place -- a highlight halfway down a long
 * article is otherwise easy to lose. Orphans, whose words an edit removed,
 * are shown dimmed and italic rather than dropped, so nothing a student wrote
 * disappears silently. Mirrors iOS `ArticleReaderView.yourMarks`.
 */
@Composable
private fun YourMarksPanel(marks: List<LibraryMark>, orphanIds: Set<String>, onOpenMark: (String) -> Unit) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(CortexRadius.xl))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(CortexRadius.xl))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        Text(
            "Your marks (${marks.size})",
            fontSize = 13.sp,
            fontWeight = FontWeight.Bold,
            color = cortex.ink2,
            modifier = Modifier.semantics { heading() },
        )
        marks.forEach { mark ->
            val orphaned = mark.id in orphanIds
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onOpenMark(mark.id) }
                    .semantics { contentDescription = if (mark.note.isBlank()) "Your highlight: ${mark.anchor.exact}" else "Your note: ${mark.anchor.exact}" }
                    .padding(vertical = 4.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                Box(
                    modifier = Modifier
                        .padding(top = 4.dp)
                        .size(10.dp)
                        .clip(CircleShape)
                        .background(MarkTonePalette.color(mark.tone, cortex.accent)),
                )
                Column {
                    Text(
                        "“${mark.anchor.exact}”",
                        fontFamily = FontFamily.Serif,
                        fontSize = 14.sp,
                        fontStyle = if (orphaned) FontStyle.Italic else FontStyle.Normal,
                        color = if (orphaned) cortex.ink3 else cortex.ink,
                    )
                    if (mark.note.isNotBlank()) {
                        Text(mark.note, fontSize = 12.sp, color = cortex.ink2, modifier = Modifier.padding(top = 2.dp))
                    }
                }
            }
        }
    }
}

@Composable
private fun Panel(title: String, items: List<String>, accent: Boolean) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(CortexRadius.xl))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(CortexRadius.xl))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Text(
            title,
            fontSize = 13.sp,
            fontWeight = FontWeight.Bold,
            color = if (accent) cortex.primaryStrong else cortex.warning,
            modifier = Modifier.semantics { heading() },
        )
        items.forEach { line ->
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("·", color = cortex.ink3, fontSize = 15.sp)
                Text(line, fontSize = 15.sp, color = cortex.ink)
            }
        }
    }
}

@Composable
private fun RelatedReading(related: List<RelatedArticle>, onOpenArticle: (String) -> Unit) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier.fillMaxWidth().padding(top = 4.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        Text("Read next", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = cortex.ink2, modifier = Modifier.semantics { heading() })
        related.forEach { link ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(CortexRadius.lg))
                    .clickable { onOpenArticle(link.id) }
                    .semantics { contentDescription = "Open article ${link.title}" }
                    .padding(vertical = 6.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Column(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                    Text(link.title, fontSize = 15.sp, fontWeight = FontWeight.Medium, color = cortex.primary)
                    link.reason?.let { Text(it, fontSize = 13.sp, color = cortex.ink3) }
                }
                Text("›", fontSize = 20.sp, color = cortex.ink3)
            }
        }
    }
}

@Composable
private fun ReaderHeader(onBack: () -> Unit) {
    val cortex = LocalCortex.current
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(cortex.surface)
            .padding(horizontal = 12.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Text(
            "‹",
            fontSize = 24.sp,
            color = cortex.primaryStrong,
            modifier = Modifier
                .clip(RoundedCornerShape(CortexRadius.md))
                .clickable(onClick = onBack)
                .semantics { contentDescription = "Back" }
                .padding(horizontal = 8.dp, vertical = 2.dp),
        )
        Text("Article", fontSize = 17.sp, fontWeight = FontWeight.Bold, color = cortex.ink)
    }
}
