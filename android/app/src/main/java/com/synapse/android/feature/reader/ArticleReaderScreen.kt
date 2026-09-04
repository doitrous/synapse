package com.synapse.android.feature.reader

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.synapse.android.AppGraph
import com.synapse.android.core.reader.Article
import com.synapse.android.core.reader.ArticleBlock
import com.synapse.android.core.reader.RelatedArticle
import com.synapse.android.core.ui.StateHost
import com.synapse.android.design.CortexRadius
import com.synapse.android.design.LocalCortex

/**
 * The article Reader, a pushed destination reached from the Library. A port of
 * the article half of iOS `ArticleReaderView`: authored prose read for hours,
 * so the body is serif and nothing competes with it -- key points, traps and
 * related reading sit after the article rather than beside it.
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
    val viewModel: ArticleReaderViewModel = viewModel(factory = ArticleReaderViewModel.factory(graph.store))
    val state by viewModel.state.collectAsState()

    LaunchedEffect(articleId) { viewModel.load(articleId) }

    ArticleReaderScreen(state = state, onBack = onBack, onOpenArticle = onOpenArticle)
}

@Composable
fun ArticleReaderScreen(
    state: com.synapse.android.core.ui.UiState<Article>,
    onBack: () -> Unit,
    onOpenArticle: (String) -> Unit,
) {
    val cortex = LocalCortex.current
    BackHandler(onBack = onBack)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(cortex.paper),
    ) {
        ReaderHeader(onBack = onBack)
        StateHost(state = state, modifier = Modifier.fillMaxSize()) { article ->
            ArticleBody(article = article, onOpenArticle = onOpenArticle)
        }
    }
}

@Composable
private fun ArticleBody(article: Article, onOpenArticle: (String) -> Unit) {
    val cortex = LocalCortex.current
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
            BlockView(article.blocks[index])
        }

        if (article.keyPoints.isNotEmpty()) {
            item(key = "hold") { Panel(title = "Hold these", items = article.keyPoints, accent = true) }
        }
        if (article.traps.isNotEmpty()) {
            item(key = "traps") { Panel(title = "Where people lose the mark", items = article.traps, accent = false) }
        }
        if (article.relatedArticles.isNotEmpty()) {
            item(key = "related") { RelatedReading(article.relatedArticles, onOpenArticle) }
        }
    }
}

@Composable
private fun BlockView(block: ArticleBlock) {
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
        is ArticleBlock.Paragraph -> Text(
            block.text,
            fontSize = 17.sp,
            color = cortex.ink,
            fontFamily = FontFamily.Serif,
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
            Text(block.text, fontSize = 16.sp, color = cortex.ink, fontFamily = FontFamily.Serif)
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
