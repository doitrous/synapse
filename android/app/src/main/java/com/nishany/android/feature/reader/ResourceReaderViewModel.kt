package com.nishany.android.feature.reader

import android.graphics.Bitmap
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.nishany.android.core.api.NishanyApi
import com.nishany.android.core.backgroundWorkScope
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.library.ResourceFileStore
import com.nishany.android.core.library.ResourcePdfRenderer
import com.nishany.android.core.model.ContentKind
import com.nishany.android.core.reader.AnnotationKey
import com.nishany.android.core.reader.AnnotationObject
import com.nishany.android.core.reader.AnnotationStore
import com.nishany.android.core.reader.InkPoint
import com.nishany.android.core.sync.SyncEngine
import java.io.File
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

/** The pointer's job right now -- a v1 subset of iOS `ReaderTool`. Only `pan`, `pen` and `highlighter` are built; the rest (eraser, lasso, shapes, widgets, laser) are this task's deferred scope. */
enum class ReaderTool { PAN, PEN, HIGHLIGHTER }

/** Literal sRGB pen colours, the same twelve the web offers (`ReaderPalette.ink` on iOS / `src/components/reader/ToolPanel`). */
object ReaderPalette {
    val ink = listOf(
        "#241d16", "#6b6053", "#b0512b", "#c2691c", "#a5732a", "#4f8f3a",
        "#2f7d6b", "#3b6bb0", "#7a4fb0", "#b03a76", "#b23a3a", "#5b6570",
    )
}

/** What the ink toolbar is set to. Deliberately not persisted -- a student picks a pen for a task, not for life, matching iOS `ToolSettings`'s own doc. */
data class ToolSettings(
    val tool: ReaderTool = ReaderTool.PAN,
    val color: String = ReaderPalette.ink[0],
    val width: Double = 0.003,
) {
    /** The highlighter draws four times as wide and translucent -- the stored object records that, not the picker's own width. */
    val strokeWidth: Double get() = if (tool == ReaderTool.HIGHLIGHTER) width * 4 else width
    val strokeAlpha: Double? get() = if (tool == ReaderTool.HIGHLIGHTER) 0.35 else null
}

sealed interface ResourceReaderUi {
    data object Loading : ResourceReaderUi
    data class Downloading(val title: String, val fraction: Float?) : ResourceReaderUi
    data class Ready(val title: String, val file: File) : ResourceReaderUi
    data class Failed(val message: String) : ResourceReaderUi
}

/**
 * The resource Reader: downloads (or opens the cached copy of) a resource's
 * PDF, then owns the [AnnotationStore] a student draws into. A port of the
 * ink half of iOS `Features/Library/ResourceReaderView.swift` -- the PDF
 * paging itself is [ResourcePdfRenderer], driven from the screen's own
 * `HorizontalPager` state, not this ViewModel.
 */
class ResourceReaderViewModel(
    private val store: LocalStore,
    private val sync: SyncEngine,
    private val api: NishanyApi,
    private val fileStore: ResourceFileStore,
    private val resourceId: String,
) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("ResourceReaderViewModel")

    val annotationStore = AnnotationStore(api, sync, AnnotationKey.Kind.RESOURCE, resourceId)

    /** Bumped after every [annotationStore] load or write, so Compose knows to re-read [annotations]. */
    private val _annotationVersion = MutableStateFlow(0)

    private val _tool = MutableStateFlow(ToolSettings())
    val tool: StateFlow<ToolSettings> = _tool.asStateFlow()

    val state: StateFlow<ResourceReaderUi> = combine(
        titleFlow(),
        fileStore.states.map { it[resourceId] },
    ) { title, fileState ->
        when (fileState) {
            null, ResourceFileStore.State.NotDownloaded -> {
                fileStore.download(resourceId)
                ResourceReaderUi.Loading
            }
            is ResourceFileStore.State.Downloading -> ResourceReaderUi.Downloading(title ?: "Resource", fileState.fraction)
            is ResourceFileStore.State.Ready -> ResourceReaderUi.Ready(title ?: "Resource", fileState.file)
            is ResourceFileStore.State.Failed -> ResourceReaderUi.Failed(fileState.message)
        }
    }.stateIn(viewModelScope, SharingStarted.Eagerly, ResourceReaderUi.Loading)

    private fun titleFlow() = store.ledgerItems(ContentKind.RESOURCE)
        .map { items -> items.firstOrNull { it.id == resourceId }?.title }

    /** Objects on [page], re-read whenever [_annotationVersion] moves -- callers key their `remember` off it (see `ResourceReaderScreen`). */
    val annotationVersion: StateFlow<Int> = _annotationVersion.asStateFlow()

    fun objects(page: Int): List<AnnotationObject> = annotationStore.objects(page)

    fun setTool(next: ToolSettings) {
        _tool.value = next
    }

    /** Loads the shards around [page] -- call on first render and whenever the visible page changes. */
    fun loadAnnotations(page: Int) {
        backgroundScope.launch {
            annotationStore.load(around = page)
            _annotationVersion.value += 1
        }
    }

    /** Commits a freehand stroke drawn on [page] in page-space points. */
    fun addStroke(page: Int, points: List<InkPoint>) {
        if (points.isEmpty()) return
        val settings = tool.value
        val kind = if (settings.tool == ReaderTool.HIGHLIGHTER) AnnotationObject.KIND_HIGHLIGHTER else AnnotationObject.KIND_INK
        val object_ = AnnotationObject.ink(
            kind = kind,
            tool = if (settings.tool == ReaderTool.HIGHLIGHTER) "highlighter" else "ball",
            color = settings.color,
            width = settings.strokeWidth,
            alpha = settings.strokeAlpha,
            points = points,
            page = page,
            z = annotationStore.nextZ(page),
            stamp = AnnotationObject.nextStamp(annotationStore.lastStamp),
        )
        backgroundScope.launch {
            annotationStore.add(object_)
            _annotationVersion.value += 1
        }
    }

    /** Opens the PDF on a dedicated single-threaded dispatcher -- [ResourcePdfRenderer] is not safe for concurrent page access. Closed by the caller (the screen's own `DisposableEffect`) once it is done with it. */
    suspend fun openRenderer(file: File): ResourcePdfRenderer = ResourcePdfRenderer(file)

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        fun factory(store: LocalStore, sync: SyncEngine, api: NishanyApi, fileStore: ResourceFileStore, resourceId: String) = viewModelFactory {
            initializer { ResourceReaderViewModel(store, sync, api, fileStore, resourceId) }
        }
    }
}

/** A page render, cached by [ResourceReaderScreen] outside the ViewModel -- a `Bitmap` cannot survive process death and does not belong in saved state. */
data class PageBitmap(val pageIndex: Int, val bitmap: Bitmap, val widthPx: Int)
