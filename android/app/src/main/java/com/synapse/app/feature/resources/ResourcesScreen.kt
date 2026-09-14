package com.synapse.app.feature.resources

import android.graphics.Bitmap
import android.graphics.pdf.PdfRenderer
import android.os.ParcelFileDescriptor
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.produceState
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.annotation.StringRes
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.resources.MedicalResource
import com.synapse.app.core.resources.RESOURCE_TYPES
import com.synapse.app.core.resources.groupResourcesByChapter
import com.synapse.app.core.resources.pageFromMeta
import java.io.File

const val RESOURCES_LOADING_TAG = "resources_loading"
const val RESOURCES_SEARCH_FIELD_TAG = "resources_search_field"
const val RESOURCES_SAVED_ONLY_CHIP_TAG = "resources_saved_only_chip"
fun resourcesTypeChipTag(type: String): String = "resources_type_chip_$type"
fun resourcesFolderRowTag(folderId: String): String = "resources_folder_$folderId"
fun resourceRowTag(resourceId: String): String = "resources_row_$resourceId"
fun resourceBookmarkButtonTag(resourceId: String): String = "resources_bookmark_$resourceId"
const val RESOURCES_READER_BACK_BUTTON_TAG = "resources_reader_back_button"
const val RESOURCES_READER_DOWNLOAD_BUTTON_TAG = "resources_reader_download_button"

/** [RESOURCE_TYPES] is a fixed, controlled vocabulary (not synced free-form content) — safe to localize by mapping. */
@StringRes
private fun resourceTypeLabelRes(type: String): Int = when (type) {
    "Book" -> R.string.resources_type_book
    "Video" -> R.string.resources_type_video
    "Guideline" -> R.string.resources_type_guideline
    "Deck" -> R.string.resources_type_deck
    else -> R.string.resources_type_article
}

/**
 * The Resources tab's single public entry point. The shell mounts this
 * directly and it constructs its own [ResourcesViewModel] via [hiltViewModel]
 * — no navigation wiring required of the caller. The document reader is an
 * internal `rememberSaveable` pane rather than a shell route, mirroring
 * `feature/library`'s drill-down.
 */
@Composable
fun ResourcesRoute(viewModel: ResourcesViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    ResourcesScreen(
        uiState = uiState,
        onToggleBookmark = viewModel::toggleBookmark,
        onOpenResource = viewModel::openResource,
        onCloseReader = viewModel::closeReader,
        onRemoveDownload = viewModel::removeDownload,
    )
}

@Composable
private fun ResourcesScreen(
    uiState: ResourcesUiState,
    onToggleBookmark: (String) -> Unit,
    onOpenResource: (MedicalResource) -> Unit,
    onCloseReader: () -> Unit,
    onRemoveDownload: (String) -> Unit,
) {
    if (uiState !is ResourcesUiState.Content) {
        Column(
            modifier = Modifier.fillMaxSize().testTag(RESOURCES_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) { Text(stringResource(R.string.resources_loading)) }
        return
    }

    // Which resource, if any, the reader pane is open on. Separate from
    // ReaderState (the download's own progress) so the pane survives a
    // process-death recreation even mid-download — on return it simply
    // re-requests the download for the same id.
    var openResourceId by rememberSaveable { mutableStateOf<String?>(null) }

    val openResource = openResourceId?.let { id -> uiState.resources.firstOrNull { it.id == id } }
    if (openResourceId != null && openResource == null) {
        // The catalogue no longer has this id (e.g. unpublished mid-session).
        LaunchedEffect(openResourceId) { openResourceId = null }
    }

    if (openResource != null) {
        ReaderPane(
            resource = openResource,
            reader = uiState.reader,
            onBack = { openResourceId = null; onCloseReader() },
            onRetry = { onOpenResource(openResource) },
            onRemoveDownload = { onRemoveDownload(openResource.id) },
        )
    } else {
        CataloguePane(
            uiState = uiState,
            onToggleBookmark = onToggleBookmark,
            onOpenResource = { resource ->
                openResourceId = resource.id
                onOpenResource(resource)
            },
        )
    }
}

@Composable
private fun CataloguePane(
    uiState: ResourcesUiState.Content,
    onToggleBookmark: (String) -> Unit,
    onOpenResource: (MedicalResource) -> Unit,
) {
    var query by rememberSaveable { mutableStateOf("") }
    var typeFilter by rememberSaveable { mutableStateOf("all") }
    var subjectFilter by rememberSaveable { mutableStateOf("all") }
    var savedOnly by rememberSaveable { mutableStateOf(false) }
    /** The row whose "no file uploaded" note is expanded — matches web's `referenceOnlyId`. */
    var expandedId by rememberSaveable { mutableStateOf<String?>(null) }

    val availableTypes = remember(uiState.resources) {
        RESOURCE_TYPES.filter { type -> uiState.resources.any { it.type == type } }
    }
    val availableSubjects = remember(uiState.resources) {
        uiState.resources.map { it.subjectId }.filter { it.isNotBlank() }.distinct().sorted()
    }

    val filtered = uiState.resources.filter { resource ->
        val q = query.trim().lowercase()
        if (q.isNotEmpty() && !"${resource.title} ${resource.source}".lowercase().contains(q)) return@filter false
        if (typeFilter != "all" && resource.type != typeFilter) return@filter false
        if (subjectFilter != "all" && resource.subjectId != subjectFilter) return@filter false
        if (savedOnly && resource.id !in uiState.bookmarkedIds) return@filter false
        true
    }
    val folders = remember(filtered) { groupResourcesByChapter(filtered) }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(stringResource(R.string.nav_resources), style = MaterialTheme.typography.titleLarge)
        Text(
            stringResource(R.string.resources_subtitle),
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp),
        )

        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            label = { Text(stringResource(R.string.resources_search_label)) },
            singleLine = true,
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
            modifier = Modifier.fillMaxWidth().padding(top = 12.dp).testTag(RESOURCES_SEARCH_FIELD_TAG),
        )

        Row(
            modifier = Modifier.fillMaxWidth().padding(top = 10.dp).horizontalScroll(rememberScrollState()),
            horizontalArrangement = Arrangement.spacedBy(6.dp),
        ) {
            FilterChip(
                selected = savedOnly,
                onClick = { savedOnly = !savedOnly },
                label = { Text(stringResource(R.string.resources_saved_only)) },
                leadingIcon = { Icon(if (savedOnly) Icons.Filled.Favorite else Icons.Filled.FavoriteBorder, contentDescription = null) },
                modifier = Modifier.testTag(RESOURCES_SAVED_ONLY_CHIP_TAG),
            )
        }

        if (availableTypes.isNotEmpty()) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp).horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(6.dp),
            ) {
                FilterChip(selected = typeFilter == "all", onClick = { typeFilter = "all" }, label = { Text(stringResource(R.string.resources_all_types)) })
                availableTypes.forEach { type ->
                    FilterChip(
                        selected = typeFilter == type,
                        onClick = { typeFilter = type },
                        label = { Text(stringResource(resourceTypeLabelRes(type))) },
                        modifier = Modifier.testTag(resourcesTypeChipTag(type)),
                    )
                }
            }
        }

        if (availableSubjects.size > 1) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp).horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(6.dp),
            ) {
                FilterChip(selected = subjectFilter == "all", onClick = { subjectFilter = "all" }, label = { Text(stringResource(R.string.resources_all_subjects)) })
                availableSubjects.forEach { subjectId ->
                    FilterChip(selected = subjectFilter == subjectId, onClick = { subjectFilter = subjectId }, label = { Text(subjectId) })
                }
            }
        }

        Text(
            pluralStringResource(R.plurals.resources_count, filtered.size, filtered.size),
            style = MaterialTheme.typography.labelMedium,
            modifier = Modifier.padding(top = 10.dp, bottom = 4.dp),
        )

        if (folders.isEmpty()) {
            Text(
                stringResource(R.string.resources_empty_message),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 16.dp),
            )
        } else {
            Column(modifier = Modifier.weight(1f).fillMaxWidth().verticalScroll(rememberScrollState())) {
                folders.forEach { folder ->
                    Text(
                        folder.title,
                        style = MaterialTheme.typography.titleMedium,
                        modifier = Modifier.padding(top = 16.dp).testTag(resourcesFolderRowTag(folder.id)),
                    )
                    folder.resources.forEach { resource ->
                        ResourceRow(
                            resource = resource,
                            isSaved = resource.id in uiState.bookmarkedIds,
                            expanded = expandedId == resource.id,
                            onClick = {
                                if (resource.hasFile) onOpenResource(resource)
                                else expandedId = if (expandedId == resource.id) null else resource.id
                            },
                            onToggleBookmark = { onToggleBookmark(resource.id) },
                        )
                        HorizontalDivider()
                    }
                }
            }
        }
    }
}

@Composable
private fun ResourceRow(
    resource: MedicalResource,
    isSaved: Boolean,
    expanded: Boolean,
    onClick: () -> Unit,
    onToggleBookmark: () -> Unit,
) {
    Surface(onClick = onClick, modifier = Modifier.fillMaxWidth().testTag(resourceRowTag(resource.id))) {
        Column(modifier = Modifier.fillMaxWidth().padding(vertical = 10.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(resource.title, style = MaterialTheme.typography.bodyLarge)
                    val yearText = resource.year?.toString().orEmpty()
                    val detail = listOfNotNull(resource.source, resource.meta.ifBlank { null }, yearText.ifBlank { null })
                        .joinToString(" · ")
                    Text(detail, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 2.dp))
                    if (!resource.hasFile) {
                        Text(
                            stringResource(R.string.resources_file_not_uploaded_yet),
                            style = MaterialTheme.typography.labelSmall,
                            modifier = Modifier.padding(top = 2.dp),
                        )
                    }
                }
                Surface(
                    color = MaterialTheme.colorScheme.surfaceVariant,
                    modifier = Modifier.padding(end = 2.dp),
                ) {
                    Text(
                        stringResource(resourceTypeLabelRes(resource.type)),
                        style = MaterialTheme.typography.labelSmall,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                    )
                }
                IconButton(onClick = onToggleBookmark, modifier = Modifier.testTag(resourceBookmarkButtonTag(resource.id))) {
                    Icon(
                        if (isSaved) Icons.Filled.Favorite else Icons.Filled.FavoriteBorder,
                        contentDescription = stringResource(if (isSaved) R.string.resources_saved_description else R.string.resources_save_description),
                        tint = if (isSaved) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
            if (expanded && !resource.hasFile) {
                Text(
                    stringResource(
                        R.string.resources_no_file_note_format,
                        resource.meta.ifBlank { stringResource(R.string.resources_not_recorded) },
                    ),
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(top = 6.dp),
                )
            }
        }
    }
}

@Composable
private fun ReaderPane(
    resource: MedicalResource,
    reader: ReaderState,
    onBack: () -> Unit,
    onRetry: () -> Unit,
    onRemoveDownload: () -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            IconButton(onClick = onBack, modifier = Modifier.testTag(RESOURCES_READER_BACK_BUTTON_TAG)) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = stringResource(R.string.resources_back_description))
            }
            Text(resource.title, style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
            if (reader is ReaderState.Ready) {
                IconButton(onClick = onRemoveDownload) {
                    Icon(Icons.Filled.Delete, contentDescription = stringResource(R.string.resources_remove_download_description))
                }
            }
        }

        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            when (reader) {
                is ReaderState.Downloading -> Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    CircularProgressIndicator()
                    Text(stringResource(R.string.resources_downloading), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 12.dp))
                }

                is ReaderState.Failed -> Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(stringResource(R.string.resources_reader_failed_title), style = MaterialTheme.typography.titleMedium)
                    Text(stringResource(reader.messageRes), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp))
                    Button(onClick = onRetry, modifier = Modifier.padding(top = 12.dp)) { Text(stringResource(R.string.resources_try_again)) }
                }

                is ReaderState.Ready ->
                    if (reader.mediaType.equals("pdf", ignoreCase = true)) {
                        PdfPageViewer(file = reader.file, openAtPage = pageFromMeta(resource.meta))
                    } else {
                        // See core/resources/Resource.kt's doc comment: only
                        // PDF documents open in-app in this MVP.
                        Text(
                            stringResource(R.string.resources_unsupported_type_message),
                            style = MaterialTheme.typography.bodyMedium,
                        )
                    }

                is ReaderState.Closed -> Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        stringResource(R.string.resources_download_offline_message),
                        style = MaterialTheme.typography.bodyMedium,
                    )
                    Button(
                        onClick = onRetry,
                        modifier = Modifier.padding(top = 12.dp).testTag(RESOURCES_READER_DOWNLOAD_BUTTON_TAG),
                    ) { Text(stringResource(R.string.resources_download_button)) }
                }
            }
        }
    }
}

/**
 * A basic paged PDF viewer built on the platform's own [PdfRenderer] — no
 * third-party dependency, and it pages a large document without loading all
 * of it into memory at once, the same reasoning iOS gives for using PDFKit
 * instead of a web view.
 *
 * Deliberately minimal: one page rendered at a time, forward/back navigation,
 * no zoom/pan, no text search, no outline, no ink/sticky annotations — see
 * `core/resources/Resource.kt`'s doc comment for why those are deferred
 * rather than missing by oversight.
 */
@Composable
private fun PdfPageViewer(file: File, openAtPage: Int?) {
    var pageIndex by rememberSaveable(file.absolutePath) { mutableIntStateOf(((openAtPage ?: 1) - 1).coerceAtLeast(0)) }

    val renderer = remember(file.absolutePath) {
        runCatching {
            val descriptor = ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY)
            PdfRenderer(descriptor)
        }.getOrNull()
    }
    DisposableEffect(renderer) {
        onDispose { renderer?.close() }
    }

    if (renderer == null) {
        Text(stringResource(R.string.resources_pdf_open_failed), style = MaterialTheme.typography.bodyMedium)
        return
    }

    val pageCount = renderer.pageCount
    // Clamped for reading/rendering rather than writing back into `pageIndex`
    // during composition — a document that opens with fewer pages than the
    // last-saved index still renders page 1 without a self-triggered
    // recomposition loop.
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
        Box(modifier = Modifier.weight(1f).fillMaxWidth(), contentAlignment = Alignment.Center) {
            val current = bitmap
            if (current != null) {
                Image(bitmap = current.asImageBitmap(), contentDescription = stringResource(R.string.resources_page_content_description_format, currentPage + 1))
            } else {
                CircularProgressIndicator()
            }
        }
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(vertical = 8.dp)) {
            TextButton(onClick = { if (currentPage > 0) pageIndex = currentPage - 1 }, enabled = currentPage > 0) { Text(stringResource(R.string.resources_previous_button)) }
            Spacer(modifier = Modifier.width(12.dp))
            Text(
                pluralStringResource(R.plurals.resources_page_of_format, pageCount, currentPage + 1, pageCount),
                style = MaterialTheme.typography.bodyMedium,
            )
            Spacer(modifier = Modifier.width(12.dp))
            TextButton(onClick = { if (currentPage < pageCount - 1) pageIndex = currentPage + 1 }, enabled = currentPage < pageCount - 1) { Text(stringResource(R.string.resources_next_button)) }
        }
    }
}

