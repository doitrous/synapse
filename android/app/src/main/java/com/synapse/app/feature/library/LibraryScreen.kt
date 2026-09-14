package com.synapse.app.feature.library

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.AssistChip
import androidx.compose.material3.AssistChipDefaults
import androidx.compose.material3.Button
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.library.LibraryArticle
import com.synapse.app.core.library.LibraryTreeNode
import com.synapse.app.core.library.articleIdsUnder

const val LIBRARY_LOADING_TAG = "library_loading"
fun libraryChapterRowTag(chapterId: String): String = "library_chapter_$chapterId"
fun libraryScopeRowTag(scope: String): String = "library_scope_$scope"
fun libraryArticleRowTag(articleId: String): String = "library_article_$articleId"
const val LIBRARY_MARK_READ_BUTTON_TAG = "library_mark_read_button"
const val LIBRARY_BACK_BUTTON_TAG = "library_back_button"
const val LIBRARY_ADD_TAG_FIELD_TAG = "library_add_tag_field"
const val LIBRARY_ADD_TAG_BUTTON_TAG = "library_add_tag_button"

/**
 * The Library tab's single public entry point. The shell mounts this
 * directly (see the plan's integration boundary) and it constructs its own
 * [LibraryViewModel] via [hiltViewModel] — no navigation wiring required of
 * the caller.
 */
@Composable
fun LibraryRoute(viewModel: LibraryViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    LibraryScreen(
        uiState = uiState,
        onToggleRead = viewModel::toggleRead,
        onAddTag = viewModel::addTag,
        onRemoveTag = viewModel::removeTag,
    )
}

/**
 * Where inside the library the student currently is, encoded as a single
 * saveable string (`rememberSaveable` needs no custom `Saver` for a String)
 * rather than a sealed class carrying nested lists — see [encodePane]/[decodePane].
 */
private sealed interface LibraryPane {
    data object Shelf : LibraryPane
    data class Chapter(val chapterId: String) : LibraryPane
    data class Tree(val scope: String, val path: List<String>) : LibraryPane
    data class Reader(val articleId: String) : LibraryPane
}

private const val PANE_UNIT_SEP = "\u0001"
private const val PANE_LIST_SEP = "\u0002"
private const val SHELF_PANE = "shelf"

private fun encodePane(pane: LibraryPane): String = when (pane) {
    is LibraryPane.Shelf -> SHELF_PANE
    is LibraryPane.Chapter -> "chapter$PANE_UNIT_SEP${pane.chapterId}"
    is LibraryPane.Tree -> "tree$PANE_UNIT_SEP${pane.scope}$PANE_UNIT_SEP${pane.path.joinToString(PANE_LIST_SEP)}"
    is LibraryPane.Reader -> "reader$PANE_UNIT_SEP${pane.articleId}"
}

/** Falls back to [LibraryPane.Shelf] for anything malformed — e.g. a saved-instance-state string from a build that encoded panes differently. */
private fun decodePane(encoded: String): LibraryPane {
    val parts = encoded.split(PANE_UNIT_SEP)
    val id = parts.getOrNull(1)
    return when {
        parts[0] == "chapter" && id != null -> LibraryPane.Chapter(id)
        parts[0] == "tree" && id != null ->
            LibraryPane.Tree(id, parts.getOrElse(2) { "" }.split(PANE_LIST_SEP).filter { it.isNotEmpty() })
        parts[0] == "reader" && id != null -> LibraryPane.Reader(id)
        else -> LibraryPane.Shelf
    }
}

/** The node at the end of [path], walked from [roots]; null if [path] doesn't resolve (a stale save-state, or content that has since changed). */
private fun resolveNode(roots: List<LibraryTreeNode>, path: List<String>): LibraryTreeNode? {
    var candidates = roots
    var current: LibraryTreeNode? = null
    for (id in path) {
        current = candidates.firstOrNull { it.id == id } ?: return null
        candidates = current.children
    }
    return current
}

@Composable
private fun LibraryScreen(
    uiState: LibraryUiState,
    onToggleRead: (String) -> Unit,
    onAddTag: (String, String) -> Unit,
    onRemoveTag: (String, String) -> Unit,
) {
    if (uiState !is LibraryUiState.Content) {
        Column(
            modifier = Modifier.fillMaxSize().testTag(LIBRARY_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) { Text("Loading…") }
        return
    }

    var paneKey by rememberSaveable { mutableStateOf(SHELF_PANE) }
    val pane = remember(paneKey) { decodePane(paneKey) }
    fun navigate(next: LibraryPane) { paneKey = encodePane(next) }

    when (pane) {
        is LibraryPane.Shelf -> LibraryShelf(
            uiState = uiState,
            onOpenChapter = { navigate(LibraryPane.Chapter(it)) },
            onOpenScope = { navigate(LibraryPane.Tree(it, emptyList())) },
        )

        is LibraryPane.Chapter -> {
            val chapter = uiState.chapters.firstOrNull { it.id == pane.chapterId }
            if (chapter == null) {
                LaunchedEffect(Unit) { navigate(LibraryPane.Shelf) }
            } else {
                ArticleListPane(
                    title = chapter.title,
                    articleIds = chapter.articleIds,
                    uiState = uiState,
                    onBack = { navigate(LibraryPane.Shelf) },
                    onOpenArticle = { navigate(LibraryPane.Reader(it)) },
                )
            }
        }

        is LibraryPane.Tree -> {
            val roots = uiState.trees[pane.scope].orEmpty()
            val current = resolveNode(roots, pane.path)
            if (pane.path.isNotEmpty() && current == null) {
                LaunchedEffect(Unit) { navigate(LibraryPane.Shelf) }
            } else {
                TreePane(
                    scope = pane.scope,
                    nodes = current?.children ?: roots,
                    articleIdsHere = current?.articleIds.orEmpty(),
                    title = current?.title ?: friendlyScopeLabel(pane.scope),
                    uiState = uiState,
                    onOpenNode = { navigate(LibraryPane.Tree(pane.scope, pane.path + it.id)) },
                    onOpenArticle = { navigate(LibraryPane.Reader(it)) },
                    onBack = {
                        if (pane.path.isEmpty()) navigate(LibraryPane.Shelf)
                        else navigate(LibraryPane.Tree(pane.scope, pane.path.dropLast(1)))
                    },
                )
            }
        }

        is LibraryPane.Reader -> {
            val article = uiState.articlesById[pane.articleId]
            if (article == null) {
                LaunchedEffect(Unit) { navigate(LibraryPane.Shelf) }
            } else {
                ArticleReaderPane(
                    article = article,
                    isRead = pane.articleId in uiState.readIds,
                    tags = uiState.tagsByArticle[pane.articleId].orEmpty(),
                    onBack = { navigate(LibraryPane.Shelf) },
                    onToggleRead = { onToggleRead(pane.articleId) },
                    onAddTag = { onAddTag(pane.articleId, it) },
                    onRemoveTag = { onRemoveTag(pane.articleId, it) },
                )
            }
        }
    }
}

/** `module:MOD_CVS` -> `"Module MOD_CVS"`; unrecognised scopes are shown verbatim. */
private fun friendlyScopeLabel(scope: String): String = when {
    scope.startsWith("module:") -> "Module ${scope.removePrefix("module:")}"
    scope.startsWith("year:") -> "Year ${scope.removePrefix("year:")}"
    else -> scope
}

@Composable
private fun LibraryShelf(
    uiState: LibraryUiState.Content,
    onOpenChapter: (String) -> Unit,
    onOpenScope: (String) -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        Text("Library", style = MaterialTheme.typography.titleLarge)

        if (uiState.trees.isNotEmpty()) {
            Text("Browse by module & year", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
            uiState.trees.forEach { (scope, roots) ->
                val count = roots.flatMap(::articleIdsUnder).distinct().size
                ShelfRow(
                    title = friendlyScopeLabel(scope),
                    subtitle = "$count article${if (count == 1) "" else "s"}",
                    tag = libraryScopeRowTag(scope),
                    onClick = { onOpenScope(scope) },
                )
                HorizontalDivider()
            }
        }

        Text("All articles", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
        if (uiState.chapters.isEmpty()) {
            Text(
                "Published articles appear here once they are released.",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 8.dp),
            )
        } else {
            uiState.chapters.forEach { chapter ->
                ShelfRow(
                    title = chapter.title,
                    subtitle = "${chapter.articleIds.size} article${if (chapter.articleIds.size == 1) "" else "s"}",
                    tag = libraryChapterRowTag(chapter.id),
                    onClick = { onOpenChapter(chapter.id) },
                )
                HorizontalDivider()
            }
        }
    }
}

@Composable
private fun ShelfRow(title: String, subtitle: String, tag: String, onClick: () -> Unit) {
    Surface(onClick = onClick, modifier = Modifier.fillMaxWidth().testTag(tag)) {
        Column(modifier = Modifier.fillMaxWidth().padding(vertical = 12.dp)) {
            Text(title, style = MaterialTheme.typography.bodyLarge)
            Text(subtitle, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 2.dp))
        }
    }
}

@Composable
private fun TreePane(
    scope: String,
    nodes: List<LibraryTreeNode>,
    articleIdsHere: List<String>,
    title: String,
    uiState: LibraryUiState.Content,
    onOpenNode: (LibraryTreeNode) -> Unit,
    onOpenArticle: (String) -> Unit,
    onBack: () -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        BackHeader(title = title, onBack = onBack)

        if (nodes.isEmpty() && articleIdsHere.isEmpty()) {
            Text(
                "Nothing is filed here yet.",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 12.dp),
            )
        }

        nodes.forEach { node ->
            val count = articleIdsUnder(node).size
            ShelfRow(
                title = node.title,
                subtitle = "$count article${if (count == 1) "" else "s"}",
                tag = "${libraryScopeRowTag(scope)}_${node.id}",
                onClick = { onOpenNode(node) },
            )
            HorizontalDivider()
        }

        if (articleIdsHere.isNotEmpty()) {
            Text("Articles here", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 16.dp))
            articleIdsHere.forEach { id ->
                val article = uiState.articlesById[id] ?: return@forEach
                ArticleRow(article, read = id in uiState.readIds, onClick = { onOpenArticle(id) })
                HorizontalDivider()
            }
        }
    }
}

@Composable
private fun ArticleListPane(
    title: String,
    articleIds: List<String>,
    uiState: LibraryUiState.Content,
    onBack: () -> Unit,
    onOpenArticle: (String) -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        BackHeader(title = title, onBack = onBack)
        articleIds.forEach { id ->
            val article = uiState.articlesById[id] ?: return@forEach
            ArticleRow(article, read = id in uiState.readIds, onClick = { onOpenArticle(id) })
            HorizontalDivider()
        }
    }
}

@Composable
private fun BackHeader(title: String, onBack: () -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        IconButton(onClick = onBack, modifier = Modifier.testTag(LIBRARY_BACK_BUTTON_TAG)) {
            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
        }
        Text(title, style = MaterialTheme.typography.titleLarge)
    }
}

@Composable
private fun ArticleRow(article: LibraryArticle, read: Boolean, onClick: () -> Unit) {
    Surface(onClick = onClick, modifier = Modifier.fillMaxWidth().testTag(libraryArticleRowTag(article.id))) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            if (read) {
                Icon(
                    Icons.Filled.CheckCircle,
                    contentDescription = "Read",
                    modifier = Modifier.size(18.dp),
                    tint = MaterialTheme.colorScheme.primary,
                )
            } else {
                Spacer(modifier = Modifier.size(18.dp))
            }
            Text(article.title, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
        }
    }
}

/**
 * The article reader: summary, sections (reviewed prose when available, the
 * authoring draft otherwise — see [com.synapse.app.core.library.LibraryProjection]),
 * key points, exam traps, personal tags, and the mark-as-read toggle.
 *
 * Does not yet support selecting text to highlight or annotate — see
 * `core/library/Library.kt`'s doc comment for why that is deferred.
 */
@Composable
private fun ArticleReaderPane(
    article: LibraryArticle,
    isRead: Boolean,
    tags: List<String>,
    onBack: () -> Unit,
    onToggleRead: () -> Unit,
    onAddTag: (String) -> Unit,
    onRemoveTag: (String) -> Unit,
) {
    var newTag by rememberSaveable { mutableStateOf("") }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        BackHeader(title = article.title, onBack = onBack)

        Text(article.chapter, style = MaterialTheme.typography.labelLarge, modifier = Modifier.padding(top = 4.dp))

        Button(
            onClick = onToggleRead,
            modifier = Modifier.padding(top = 12.dp).testTag(LIBRARY_MARK_READ_BUTTON_TAG),
        ) {
            if (isRead) {
                Icon(Icons.Filled.CheckCircle, contentDescription = null, modifier = Modifier.size(18.dp))
                Text(" Marked as read")
            } else {
                Text("Mark as read")
            }
        }

        if (article.summary.isNotBlank()) {
            Text(article.summary, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(top = 16.dp))
        }

        article.sections.forEach { section ->
            if (section.heading.isNotBlank()) {
                Text(section.heading, style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
            }
            if (section.body.isNotBlank()) {
                Text(section.body, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp))
            }
        }

        if (article.keyPoints.isNotEmpty()) {
            Text("Key points", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
            article.keyPoints.forEach { Text("• $it", style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 4.dp)) }
        }

        if (article.traps.isNotEmpty()) {
            Text("Where people lose the mark", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
            article.traps.forEach { Text("• $it", style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 4.dp)) }
        }

        if (article.questionIds.isNotEmpty()) {
            Text(
                "${article.questionIds.size} linked question${if (article.questionIds.size == 1) "" else "s"} in the question bank.",
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 20.dp),
            )
        }

        Text("Your tags", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
        Row(modifier = Modifier.fillMaxWidth().padding(top = 6.dp), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            tags.forEach { tag ->
                AssistChip(
                    onClick = { onRemoveTag(tag) },
                    label = { Text(tag) },
                    trailingIcon = { Icon(Icons.Filled.Close, contentDescription = "Remove tag", modifier = Modifier.size(16.dp)) },
                    colors = AssistChipDefaults.assistChipColors(),
                )
            }
        }
        Row(modifier = Modifier.fillMaxWidth().padding(top = 8.dp), verticalAlignment = Alignment.CenterVertically) {
            OutlinedTextField(
                value = newTag,
                onValueChange = { newTag = it },
                label = { Text("Add a tag") },
                singleLine = true,
                modifier = Modifier.weight(1f).testTag(LIBRARY_ADD_TAG_FIELD_TAG),
            )
            TextButton(
                onClick = { onAddTag(newTag); newTag = "" },
                enabled = newTag.isNotBlank(),
                modifier = Modifier.testTag(LIBRARY_ADD_TAG_BUTTON_TAG),
            ) { Text("Add") }
        }
    }
}
