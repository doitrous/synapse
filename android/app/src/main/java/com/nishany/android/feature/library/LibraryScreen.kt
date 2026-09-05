package com.nishany.android.feature.library

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.nishany.android.AppGraph
import com.nishany.android.core.library.ArticleCard
import com.nishany.android.core.library.LibraryAtlas
import com.nishany.android.core.library.LibraryDivision
import com.nishany.android.core.library.LibraryResource
import com.nishany.android.core.library.ResourceGrouping
import com.nishany.android.core.library.TaxonomyNode
import com.nishany.android.core.library.filterResources
import com.nishany.android.core.library.groupResources
import com.nishany.android.core.sync.SyncStatus
import com.nishany.android.design.CortexRadius
import com.nishany.android.design.LocalCortex

/**
 * The Library, reached as its own destination from Home.
 *
 * A one-shot [LibraryViewModel.load] on entry, re-run when a background sync
 * finishes -- the first read otherwise lands on an empty cache, exactly as the
 * iOS `LibraryView`/`ResourcesView` handle it.
 */
@Composable
fun LibraryRoute(graph: AppGraph, onBack: () -> Unit, onOpenReader: (String) -> Unit) {
    val viewModel: LibraryViewModel = viewModel(factory = LibraryViewModel.factory(graph.store, graph.sync))
    val state by viewModel.state.collectAsState()
    val syncStatus by graph.sync.status.collectAsState()

    LaunchedEffect(Unit) { viewModel.load() }
    // Reload once the catalogue has actually landed.
    LaunchedEffect(syncStatus) {
        if (syncStatus is SyncStatus.Done) viewModel.load()
    }

    LibraryScreen(viewModel = viewModel, state = state, onBack = onBack, onOpenReader = onOpenReader)
}

/** Which detail card, if any, is open on top of the shelf. */
private sealed interface LibraryDetail {
    data class Resource(val id: String) : LibraryDetail
    data class Article(val id: String) : LibraryDetail
}

@Composable
fun LibraryScreen(
    viewModel: LibraryViewModel,
    state: LibraryUiState,
    onBack: () -> Unit,
    onOpenReader: (String) -> Unit,
) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(cortex.paper),
    ) {
        when (state) {
            LibraryUiState.Loading -> {
                Header(title = "Library", onBack = onBack)
                CenteredMessage { CircularProgressIndicator(color = cortex.primary) }
            }

            is LibraryUiState.Error -> {
                Header(title = "Library", onBack = onBack)
                CenteredMessage { Text(state.message, color = cortex.ink2) }
            }

            is LibraryUiState.Loaded -> LoadedLibrary(viewModel = viewModel, state = state, onBack = onBack, onOpenReader = onOpenReader)
        }
    }
}

@Composable
private fun LoadedLibrary(
    viewModel: LibraryViewModel,
    state: LibraryUiState.Loaded,
    onBack: () -> Unit,
    onOpenReader: (String) -> Unit,
) {
    var detail by remember { mutableStateOf<LibraryDetail?>(null) }
    // 0 = Resources shelf, 1 = Library taxonomy.
    var tab by rememberSaveable { mutableStateOf(0) }
    // The taxonomy drill: the division picked, then the node path into it.
    var division by rememberSaveable { mutableStateOf<String?>(null) }
    // Plain remember: the node drill resets on rotation, which is a minor,
    // acceptable cost -- a List<String> is not reliably rememberSaveable.
    var path by remember { mutableStateOf<List<String>>(emptyList()) }

    // System back unwinds the internal state before leaving the screen.
    BackHandler {
        when {
            detail != null -> detail = null
            tab == 1 && path.isNotEmpty() -> path = path.dropLast(1)
            tab == 1 && division != null -> division = null
            else -> onBack()
        }
    }

    when (val open = detail) {
        is LibraryDetail.Resource -> {
            val resource = state.resources.firstOrNull { it.id == open.id }
            ResourceDetailCard(resource = resource, onBack = { detail = null })
            return
        }
        is LibraryDetail.Article -> {
            val article = state.articlesById[open.id]
            ArticleDetailCard(article = article, onBack = { detail = null }, onOpenReader = onOpenReader)
            return
        }
        null -> Unit
    }

    Header(title = "Library", onBack = onBack)
    SegmentedTabs(
        options = listOf("Resources", "Library"),
        selected = tab,
        onSelect = { tab = it },
    )

    if (tab == 0) {
        ResourcesTab(viewModel = viewModel, state = state, onOpen = { detail = LibraryDetail.Resource(it) })
    } else {
        LibraryTab(
            state = state,
            division = division,
            path = path,
            onPickDivision = { division = it; path = emptyList() },
            onPushNode = { path = path + it },
            onOpenArticle = { detail = LibraryDetail.Article(it) },
        )
    }
}

// -- Resources shelf -------------------------------------------------------

@Composable
private fun ResourcesTab(
    viewModel: LibraryViewModel,
    state: LibraryUiState.Loaded,
    onOpen: (String) -> Unit,
) {
    val cortex = LocalCortex.current
    val query by viewModel.query.collectAsState()
    val grouping by viewModel.grouping.collectAsState()

    val filtered = filterResources(state.resources, query)
    val folders = groupResources(filtered, grouping)

    Column(modifier = Modifier.fillMaxSize()) {
        OutlinedTextField(
            value = query,
            onValueChange = viewModel::setQuery,
            singleLine = true,
            placeholder = { Text("Search resources") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 8.dp)
                .semantics { contentDescription = "Search resources" },
        )

        Row(
            modifier = Modifier.padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            ResourceGrouping.entries.forEach { option ->
                FilterChip(
                    selected = grouping == option,
                    onClick = { viewModel.setGrouping(option) },
                    label = { Text(option.label) },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = cortex.primaryTint,
                        selectedLabelColor = cortex.primaryStrong,
                    ),
                )
            }
        }

        when {
            state.resourcesEmptyReason != null ->
                CenteredMessage { Text(state.resourcesEmptyReason, color = cortex.ink2) }

            folders.isEmpty() ->
                CenteredMessage { Text("No resources match \"$query\".", color = cortex.ink2) }

            else -> LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = androidx.compose.foundation.layout.PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                folders.forEach { folder ->
                    item(key = "h-${folder.title}") {
                        Text(
                            folder.title,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold,
                            color = cortex.ink2,
                            modifier = Modifier.padding(top = 6.dp),
                        )
                    }
                    items(folder.resources, key = { it.id }) { resource ->
                        ResourceRow(resource = resource, onClick = { onOpen(resource.id) })
                    }
                }
            }
        }
    }
}

@Composable
private fun ResourceRow(resource: LibraryResource, onClick: () -> Unit) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(CortexRadius.xl))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(CortexRadius.xl))
            .clickable(onClick = onClick)
            .semantics { contentDescription = "Open ${resource.title}" }
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        Text(resource.title, fontSize = 14.sp, fontWeight = FontWeight.SemiBold, color = cortex.ink)
        Text(
            buildString {
                append(resource.type.label)
                if (resource.source != "—") append(" · ${resource.source}")
                resource.year?.let { append(" · $it") }
            },
            fontSize = 12.sp,
            color = cortex.ink3,
        )
        if (!resource.isOpenable) {
            Text("Not yet available to open", fontSize = 11.sp, color = cortex.ink3)
        }
    }
}

// -- Library taxonomy ------------------------------------------------------

@Composable
private fun LibraryTab(
    state: LibraryUiState.Loaded,
    division: String?,
    path: List<String>,
    onPickDivision: (String) -> Unit,
    onPushNode: (String) -> Unit,
    onOpenArticle: (String) -> Unit,
) {
    val cortex = LocalCortex.current
    val atlas = state.atlas

    if (state.libraryEmptyReason != null) {
        CenteredMessage { Text(state.libraryEmptyReason, color = cortex.ink2) }
        return
    }

    if (division == null) {
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = androidx.compose.foundation.layout.PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp),
        ) {
            items(LibraryDivision.entries, key = { it.division }) { d ->
                DivisionCard(division = d, count = atlas.divisionCount(d.division), onClick = { onPickDivision(d.division) })
            }
        }
        return
    }

    // Inside a division: children of the current node (or the division roots),
    // plus any articles pinned directly on the current node.
    val currentNodeId = path.lastOrNull()
    val childNodes = (if (currentNodeId == null) atlas.roots(division) else atlas.children(currentNodeId))
        .filter { atlas.hasArticles(it.id) }
    val articleIds = currentNodeId?.let { atlas.articlesOn(it) }.orEmpty()

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = androidx.compose.foundation.layout.PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        currentNodeId?.let { id ->
            item(key = "crumb") {
                Text(
                    atlas.node(id)?.title ?: "",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = cortex.ink,
                    modifier = Modifier.padding(bottom = 2.dp),
                )
            }
        }
        items(childNodes, key = { "n-${it.id}" }) { node ->
            NodeRow(node = node, count = atlas.articleCount(node.id), onClick = { onPushNode(node.id) })
        }
        items(articleIds, key = { "a-$it" }) { articleId ->
            val article = state.articlesById[articleId] ?: return@items
            ArticleRow(article = article, onClick = { onOpenArticle(articleId) })
        }
        if (childNodes.isEmpty() && articleIds.isEmpty()) {
            item(key = "empty") { Text("Nothing filed here yet.", color = cortex.ink3, fontSize = 12.sp) }
        }
    }
}

@Composable
private fun DivisionCard(division: LibraryDivision, count: Int, onClick: () -> Unit) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(CortexRadius.xl))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(CortexRadius.xl))
            .clickable(onClick = onClick)
            .semantics { contentDescription = "Browse ${division.label}, $count articles" }
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(6.dp),
    ) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text(division.label, fontSize = 15.sp, fontWeight = FontWeight.SemiBold, color = cortex.ink, modifier = Modifier.weight(1f))
            Text("$count", fontSize = 13.sp, color = cortex.primaryStrong, fontFamily = FontFamily.Monospace)
        }
        Text(division.detail, fontSize = 12.sp, color = cortex.ink3)
    }
}

@Composable
private fun NodeRow(node: TaxonomyNode, count: Int, onClick: () -> Unit) {
    val cortex = LocalCortex.current
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(CortexRadius.lg))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(CortexRadius.lg))
            .clickable(onClick = onClick)
            .semantics { contentDescription = "Open ${node.title}, $count articles" }
            .padding(14.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(node.title, fontSize = 14.sp, color = cortex.ink, modifier = Modifier.weight(1f))
        Text("$count", fontSize = 12.sp, color = cortex.ink3, fontFamily = FontFamily.Monospace)
    }
}

@Composable
private fun ArticleRow(article: ArticleCard, onClick: () -> Unit) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(CortexRadius.lg))
            .background(cortex.surface2)
            .clickable(onClick = onClick)
            .semantics { contentDescription = "Open article ${article.title}" }
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(3.dp),
    ) {
        Text(article.title, fontSize = 14.sp, fontWeight = FontWeight.SemiBold, color = cortex.ink)
        Text("${article.readingMinutes} min read", fontSize = 11.sp, color = cortex.ink3)
    }
}

// -- Detail cards (reader stubbed) ----------------------------------------

@Composable
private fun ResourceDetailCard(resource: LibraryResource?, onBack: () -> Unit) {
    val cortex = LocalCortex.current
    Header(title = "Resource", onBack = onBack)
    if (resource == null) {
        CenteredMessage { Text("This resource is no longer available.", color = cortex.ink2) }
        return
    }
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Text(resource.title, fontSize = 20.sp, fontWeight = FontWeight.Bold, color = cortex.ink)
        MetaRow("Type", resource.type.label)
        MetaRow("Source", resource.source)
        resource.chapter?.let { MetaRow("Chapter", it) }
        resource.year?.let { MetaRow("Year", it.toString()) }
        if (resource.meta.isNotEmpty()) MetaRow("Location", resource.meta)

        Spacer(Modifier.size(8.dp))
        // The article Reader is wired (see ArticleDetailCard). The *resource*
        // reader is the PDF + ink-annotation surface
        // (ios/Synapse/Features/Library/ResourceReaderView.swift): it needs a
        // native PDF engine (continuous render + text search/outline) plus a
        // resource file-download store, neither of which Android has yet.
        // Deferred pending that decision -- see the M6 report.
        Button(
            onClick = { /* TODO: open reader */ },
            enabled = false,
            colors = ButtonDefaults.buttonColors(containerColor = cortex.primary, contentColor = cortex.onPrimary),
        ) {
            Text(if (resource.isOpenable) "Open (coming soon)" else "Not yet available")
        }
    }
}

@Composable
private fun ArticleDetailCard(article: ArticleCard?, onBack: () -> Unit, onOpenReader: (String) -> Unit) {
    val cortex = LocalCortex.current
    Header(title = "Article", onBack = onBack)
    if (article == null) {
        CenteredMessage { Text("This article is no longer available.", color = cortex.ink2) }
        return
    }
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Text(article.title, fontSize = 20.sp, fontWeight = FontWeight.Bold, color = cortex.ink)
        MetaRow("Chapter", article.chapter)
        MetaRow("Reading time", "${article.readingMinutes} min")
        if (article.summary.isNotEmpty()) {
            Text(article.summary, fontSize = 14.sp, color = cortex.ink2)
        }
        Spacer(Modifier.size(8.dp))
        Button(
            onClick = { onOpenReader(article.id) },
            modifier = Modifier.semantics { contentDescription = "Read ${article.title}" },
            colors = ButtonDefaults.buttonColors(containerColor = cortex.primary, contentColor = cortex.onPrimary),
        ) {
            Text("Read")
        }
    }
}

@Composable
private fun MetaRow(label: String, value: String) {
    val cortex = LocalCortex.current
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("$label:", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = cortex.ink2)
        Text(value, fontSize = 13.sp, color = cortex.ink)
    }
}

// -- Shared chrome ---------------------------------------------------------

@Composable
private fun Header(title: String, onBack: () -> Unit) {
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
        Text(title, fontSize = 17.sp, fontWeight = FontWeight.Bold, color = cortex.ink)
    }
}

@Composable
private fun SegmentedTabs(options: List<String>, selected: Int, onSelect: (Int) -> Unit) {
    val cortex = LocalCortex.current
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        options.forEachIndexed { index, label ->
            val isSelected = index == selected
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(CortexRadius.md))
                    .background(if (isSelected) cortex.primaryTint else cortex.surface)
                    .border(1.dp, if (isSelected) cortex.primaryLine else cortex.line, RoundedCornerShape(CortexRadius.md))
                    .clickable { onSelect(index) }
                    .semantics { contentDescription = label }
                    .padding(vertical = 10.dp),
                contentAlignment = Alignment.Center,
            ) {
                Text(
                    label,
                    fontSize = 13.sp,
                    fontWeight = if (isSelected) FontWeight.SemiBold else FontWeight.Normal,
                    color = if (isSelected) cortex.primaryStrong else cortex.ink2,
                )
            }
        }
    }
}

@Composable
private fun CenteredMessage(content: @Composable () -> Unit) {
    Box(modifier = Modifier.fillMaxSize().padding(32.dp), contentAlignment = Alignment.Center) {
        content()
    }
}
