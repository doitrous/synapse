package com.nishany.android.feature.reader

import android.graphics.Bitmap
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.nishany.android.AppGraph
import com.nishany.android.core.reader.AnnotationObject
import com.nishany.android.core.reader.InkPoint
import com.nishany.android.core.library.ResourcePdfRenderer
import com.nishany.android.design.CortexRadius
import com.nishany.android.design.LocalCortex
import kotlin.math.roundToInt
import kotlinx.coroutines.withContext

/**
 * The resource Reader: a downloaded PDF, paged with a swipe, that a student
 * can draw ink or highlighter strokes onto. A port of the ink-capture half of
 * iOS `Features/Library/ResourceReaderView.swift` + `InkCaptureView.swift` --
 * shape recognition, the lasso, stroke stabilisation, hit-test erase/edit and
 * the tape/note/textbox/marker tools are this task's deferred scope (see the
 * report); [AnnotationObject] still carries any of those it finds unchanged.
 */
@Composable
fun ResourceReaderRoute(graph: AppGraph, resourceId: String, onBack: () -> Unit) {
    val viewModel: ResourceReaderViewModel = viewModel(
        factory = ResourceReaderViewModel.factory(graph.store, graph.sync, graph.api, graph.resourceFileStore, resourceId),
    )
    val state by viewModel.state.collectAsState()
    val tool by viewModel.tool.collectAsState()
    val annotationVersion by viewModel.annotationVersion.collectAsState()

    ResourceReaderScreen(
        state = state,
        tool = tool,
        onSetTool = viewModel::setTool,
        onBack = onBack,
        initialPage = graph.readerPreferences.lastPage(resourceId),
        objectsForPage = { page -> annotationVersion.let { viewModel.objects(page) } },
        onPageVisible = { page ->
            viewModel.loadAnnotations(page)
            graph.readerPreferences.setLastPage(resourceId, page)
        },
        onCommitStroke = viewModel::addStroke,
    )
}

@Composable
fun ResourceReaderScreen(
    state: ResourceReaderUi,
    tool: ToolSettings,
    onSetTool: (ToolSettings) -> Unit,
    onBack: () -> Unit,
    initialPage: Int = 1,
    objectsForPage: (Int) -> List<AnnotationObject> = { emptyList() },
    onPageVisible: (Int) -> Unit = {},
    onCommitStroke: (page: Int, points: List<InkPoint>) -> Unit = { _, _ -> },
) {
    val cortex = LocalCortex.current
    BackHandler(onBack = onBack)

    Column(modifier = Modifier.fillMaxSize().background(cortex.paper)) {
        ReaderHeader(onBack = onBack)
        Box(modifier = Modifier.fillMaxSize()) {
            when (state) {
                ResourceReaderUi.Loading -> CenteredSpinner()
                is ResourceReaderUi.Downloading -> DownloadingBody(state)
                is ResourceReaderUi.Failed -> CenteredMessage(state.message)
                is ResourceReaderUi.Ready -> PdfReaderBody(
                    file = state.file,
                    tool = tool,
                    onSetTool = onSetTool,
                    initialPage = initialPage,
                    objectsForPage = objectsForPage,
                    onPageVisible = onPageVisible,
                    onCommitStroke = onCommitStroke,
                )
            }
        }
    }
}

@Composable
private fun PdfReaderBody(
    file: java.io.File,
    tool: ToolSettings,
    onSetTool: (ToolSettings) -> Unit,
    initialPage: Int,
    objectsForPage: (Int) -> List<AnnotationObject>,
    onPageVisible: (Int) -> Unit,
    onCommitStroke: (page: Int, points: List<InkPoint>) -> Unit,
) {
    var renderer by remember(file) { mutableStateOf<ResourcePdfRenderer?>(null) }
    var openFailed by remember(file) { mutableStateOf(false) }

    LaunchedEffect(file) {
        renderer = try {
            withContext(ResourcePdfRenderer.dispatcher) { ResourcePdfRenderer(file) }
        } catch (e: Exception) {
            openFailed = true
            null
        }
    }
    DisposableEffect(renderer) {
        // Runs on dispose, off the coroutine world entirely: a scope tied to
        // this composition would already be cancelling, and closing a
        // ParcelFileDescriptor is fast enough that blocking briefly here is
        // cheaper than risking the close silently never happening.
        onDispose { renderer?.let { r -> kotlinx.coroutines.runBlocking(ResourcePdfRenderer.dispatcher) { r.close() } } }
    }

    val current = renderer
    when {
        openFailed -> CenteredMessage("This file could not be opened as a PDF.")
        current == null -> CenteredSpinner()
        else -> {
            val pageCount = current.pageCount
            val pagerState = rememberPagerState(
                initialPage = (initialPage - 1).coerceIn(0, maxOf(0, pageCount - 1)),
            ) { pageCount }

            LaunchedEffect(pagerState.currentPage) { onPageVisible(pagerState.currentPage + 1) }

            Box(modifier = Modifier.fillMaxSize()) {
                HorizontalPager(
                    state = pagerState,
                    userScrollEnabled = tool.tool == ReaderTool.PAN,
                    modifier = Modifier.fillMaxSize(),
                ) { pageIndex ->
                    PdfPageView(
                        renderer = current,
                        pageIndex = pageIndex,
                        objects = objectsForPage(pageIndex + 1),
                        tool = tool,
                        onCommitStroke = { points -> onCommitStroke(pageIndex + 1, points) },
                    )
                }

                ReaderToolbar(
                    tool = tool,
                    onSetTool = onSetTool,
                    pageLabel = "${pagerState.currentPage + 1} / $pageCount",
                    modifier = Modifier.align(Alignment.BottomCenter).padding(bottom = 20.dp),
                )
            }
        }
    }
}

@Composable
private fun PdfPageView(
    renderer: ResourcePdfRenderer,
    pageIndex: Int,
    objects: List<AnnotationObject>,
    tool: ToolSettings,
    onCommitStroke: (List<InkPoint>) -> Unit,
) {
    val cortex = LocalCortex.current
    val density = LocalDensity.current

    BoxWithConstraints(modifier = Modifier.fillMaxSize().background(cortex.paper), contentAlignment = Alignment.Center) {
        // 2x the box width for sharpness, capped so a huge tablet display
        // does not ask PdfRenderer for an unreasonably large bitmap.
        val targetWidthPx = remember(maxWidth) { with(density) { (maxWidth.toPx() * 2).roundToInt().coerceIn(300, 2200) } }
        var bitmap by remember(pageIndex, targetWidthPx) { mutableStateOf<Bitmap?>(null) }

        LaunchedEffect(pageIndex, targetWidthPx) {
            bitmap = try {
                withContext(ResourcePdfRenderer.dispatcher) { renderer.render(pageIndex, targetWidthPx) }
            } catch (e: Exception) {
                null
            }
        }

        val bmp = bitmap
        if (bmp == null) {
            CircularProgressIndicator(color = cortex.primary)
        } else {
            var boxWidthPx by remember { mutableStateOf(0f) }
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .aspectRatio(bmp.width.toFloat() / bmp.height.toFloat())
                    .onSizeChanged { boxWidthPx = it.width.toFloat() },
            ) {
                androidx.compose.foundation.Image(
                    bitmap = bmp.asImageBitmap(),
                    contentDescription = "Page ${pageIndex + 1}",
                    modifier = Modifier.fillMaxSize(),
                )
                if (boxWidthPx > 0f) {
                    AnnotationLayer(
                        objects = objects,
                        boxWidthPx = boxWidthPx,
                        tool = tool,
                        onCommitStroke = onCommitStroke,
                    )
                }
            }
        }
    }
}

/**
 * Draws every mark already on the page, and -- when a drawing tool is active
 * -- captures a new freehand stroke.
 *
 * Ink and highlighter render as an actual path; anything else this build
 * defers (tape/note/textbox) draws as a plain tinted rectangle so a mark made
 * elsewhere is at least visible here, never invisible -- editing it is out of
 * scope (see the class doc on [AnnotationObject]).
 */
@Composable
private fun AnnotationLayer(
    objects: List<AnnotationObject>,
    boxWidthPx: Float,
    tool: ToolSettings,
    onCommitStroke: (List<InkPoint>) -> Unit,
) {
    var liveStroke by remember(tool.tool) { mutableStateOf<List<Offset>>(emptyList()) }

    Canvas(
        modifier = Modifier
            .fillMaxSize()
            .pointerInputForTool(tool, boxWidthPx, onStrokeChanged = { liveStroke = it }, onCommitStroke = onCommitStroke),
    ) {
        for (obj in objects) {
            when {
                obj.isInk -> drawInkObject(obj, boxWidthPx)
                else -> drawWidgetObject(obj, boxWidthPx)
            }
        }
        if (liveStroke.size > 1) {
            drawPath(
                path = Path().apply {
                    moveTo(liveStroke[0].x, liveStroke[0].y)
                    for (point in liveStroke.drop(1)) lineTo(point.x, point.y)
                },
                color = hexColor(tool.color).copy(alpha = (tool.strokeAlpha ?: 1.0).toFloat()),
                style = Stroke(
                    width = (tool.strokeWidth * boxWidthPx).toFloat(),
                    cap = StrokeCap.Round,
                    join = StrokeJoin.Round,
                ),
            )
        }
    }
}

private fun Modifier.pointerInputForTool(
    tool: ToolSettings,
    boxWidthPx: Float,
    onStrokeChanged: (List<Offset>) -> Unit,
    onCommitStroke: (List<InkPoint>) -> Unit,
): Modifier {
    if (tool.tool == ReaderTool.PAN || boxWidthPx <= 0f) return this
    return this.then(
        Modifier.pointerInput(tool.tool, boxWidthPx) {
            var points = mutableListOf<Offset>()
            detectDragGestures(
                onDragStart = { offset ->
                    points = mutableListOf(offset)
                    onStrokeChanged(points.toList())
                },
                onDrag = { change, _ ->
                    change.consume()
                    points.add(change.position)
                    onStrokeChanged(points.toList())
                },
                onDragEnd = {
                    val pageSpacePoints = points.map { InkPoint((it.x / boxWidthPx).toDouble(), (it.y / boxWidthPx).toDouble()) }
                    onCommitStroke(pageSpacePoints)
                    points = mutableListOf()
                    onStrokeChanged(emptyList())
                },
                onDragCancel = {
                    points = mutableListOf()
                    onStrokeChanged(emptyList())
                },
            )
        },
    )
}

private fun androidx.compose.ui.graphics.drawscope.DrawScope.drawInkObject(obj: AnnotationObject, boxWidthPx: Float) {
    val encoded = obj.p ?: return
    if (encoded.size < 2) return
    val points = com.nishany.android.core.reader.StrokeCodec.decode(encoded)
    if (points.isEmpty()) return

    val path = Path().apply {
        moveTo((points[0].x * boxWidthPx).toFloat(), (points[0].y * boxWidthPx).toFloat())
        for (point in points.drop(1)) lineTo((point.x * boxWidthPx).toFloat(), (point.y * boxWidthPx).toFloat())
    }
    drawPath(
        path = path,
        color = hexColor(obj.color ?: "#241d16").copy(alpha = (obj.a ?: 1.0).toFloat()),
        style = Stroke(width = ((obj.w ?: 0.003) * boxWidthPx).toFloat(), cap = StrokeCap.Round, join = StrokeJoin.Round),
    )
}

/** Tape/note/textbox/marker -- not authored or fully rendered by this build; see [AnnotationObject]'s class doc. */
private fun androidx.compose.ui.graphics.drawscope.DrawScope.drawWidgetObject(obj: AnnotationObject, boxWidthPx: Float) {
    val rect = obj.r ?: return
    if (rect.size != 4) return
    val left = (rect[0] * boxWidthPx).toFloat()
    val top = (rect[1] * boxWidthPx).toFloat()
    val width = ((rect[2] - rect[0]) * boxWidthPx).toFloat()
    val height = ((rect[3] - rect[1]) * boxWidthPx).toFloat()
    if (width <= 0f || height <= 0f) return

    drawRect(
        color = toneColor(obj.tone).copy(alpha = 0.28f),
        topLeft = Offset(left, top),
        size = androidx.compose.ui.geometry.Size(width, height),
    )
}

/** The 8 shared note tones (`src/lib/reader/annotations.ts`'s `NOTE_TONES`) as literal colours -- the same mapping `ArticleReaderScreen`'s `MarkTonePalette` uses. */
private fun toneColor(tone: String?): Color {
    val hex: Long = when (tone) {
        "amber" -> 0xc2691cL; "teal" -> 0x2f7d6bL; "rose" -> 0xb03a76L; "sage" -> 0x4f8f3aL
        "slate" -> 0x5b6570L; "sand" -> 0x8a6d3bL; "clay" -> 0xc2352fL; "paper" -> 0x8a8578L
        else -> 0x8a8578L
    }
    return Color((0xFF000000L or hex).toInt())
}

private fun hexColor(hex: String): Color = try {
    Color(android.graphics.Color.parseColor(hex))
} catch (e: IllegalArgumentException) {
    Color.Black
}

@Composable
private fun ReaderToolbar(tool: ToolSettings, onSetTool: (ToolSettings) -> Unit, pageLabel: String, modifier: Modifier = Modifier) {
    val cortex = LocalCortex.current
    Column(
        modifier = modifier
            .clip(RoundedCornerShape(CortexRadius.xl))
            .background(cortex.surface)
            .padding(horizontal = 14.dp, vertical = 10.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Text(pageLabel, fontSize = 12.sp, color = cortex.ink3)

        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            ToolButton(label = "Read", selected = tool.tool == ReaderTool.PAN) { onSetTool(tool.copy(tool = ReaderTool.PAN)) }
            ToolButton(label = "Pen", selected = tool.tool == ReaderTool.PEN) { onSetTool(tool.copy(tool = ReaderTool.PEN)) }
            ToolButton(label = "Marker", selected = tool.tool == ReaderTool.HIGHLIGHTER) { onSetTool(tool.copy(tool = ReaderTool.HIGHLIGHTER)) }
        }

        if (tool.tool != ReaderTool.PAN) {
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                ReaderPalette.ink.forEach { hex ->
                    Box(
                        modifier = Modifier
                            .size(22.dp)
                            .clip(CircleShape)
                            .background(hexColor(hex))
                            .border(
                                width = if (tool.color == hex) 2.dp else 0.dp,
                                color = cortex.ink,
                                shape = CircleShape,
                            )
                            .clickable { onSetTool(tool.copy(color = hex)) }
                            .semantics { contentDescription = "Colour $hex" },
                    )
                }
            }
        }
    }
}

@Composable
private fun ToolButton(label: String, selected: Boolean, onClick: () -> Unit) {
    val cortex = LocalCortex.current
    Text(
        label,
        fontSize = 13.sp,
        color = if (selected) cortex.onPrimary else cortex.ink,
        modifier = Modifier
            .clip(RoundedCornerShape(CortexRadius.md))
            .background(if (selected) cortex.primary else cortex.primaryTint)
            .clickable(onClick = onClick)
            .padding(horizontal = 12.dp, vertical = 6.dp)
            .semantics { contentDescription = label },
    )
}

@Composable
private fun DownloadingBody(state: ResourceReaderUi.Downloading) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier.fillMaxSize().padding(32.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(state.title, fontSize = 16.sp, color = cortex.ink, modifier = Modifier.padding(bottom = 12.dp))
        val fraction = state.fraction
        if (fraction != null) {
            LinearProgressIndicator(progress = { fraction }, modifier = Modifier.fillMaxWidth(), color = cortex.primary)
        } else {
            CircularProgressIndicator(color = cortex.primary)
        }
        Text("Downloading…", fontSize = 12.sp, color = cortex.ink3, modifier = Modifier.padding(top = 8.dp))
    }
}

@Composable
private fun CenteredSpinner() {
    val cortex = LocalCortex.current
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        CircularProgressIndicator(color = cortex.primary)
    }
}

@Composable
private fun CenteredMessage(message: String) {
    val cortex = LocalCortex.current
    Box(modifier = Modifier.fillMaxSize().padding(32.dp), contentAlignment = Alignment.Center) {
        Text(message, color = cortex.ink2)
    }
}

@Composable
private fun ReaderHeader(onBack: () -> Unit) {
    val cortex = LocalCortex.current
    Row(
        modifier = Modifier.fillMaxWidth().background(cortex.surface).padding(horizontal = 12.dp, vertical = 12.dp),
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
        Text("Resource", fontSize = 17.sp, color = cortex.ink)
    }
}
