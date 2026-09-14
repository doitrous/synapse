package com.synapse.app.feature.qbank

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.synapse.app.R
import com.synapse.app.core.qbank.Question

fun collectionCardTag(key: String): String = "qbank_collection_$key"
fun collectionViewButtonTag(key: String): String = "qbank_collection_view_$key"
fun collectionTestTheseButtonTag(key: String): String = "qbank_collection_test_these_$key"
fun collectionTestScopeButtonTag(key: String): String = "qbank_collection_test_scope_$key"

/** One of the three Revise-hub collections: Flagged, Got wrong, or Omitted. */
private data class RevisionCollection(
    val key: String,
    val title: String,
    val empty: String,
    val questions: List<Question>,
)

/**
 * The Revise ("Flagged & missed") hub: three collections a student can come
 * back to, each offering View (a read-only look, see
 * [QuestionBankViewModel.reviewCollection]), Test these (drill exactly this
 * set), and Test this scope (a fresh sitting over the topics these questions
 * came from, including material never seen). Port of
 * `src/components/qbank/QuestionCollections.tsx`.
 */
@Composable
fun RevisionCollectionsScreen(
    flagged: List<Question>,
    incorrect: List<Question>,
    omitted: List<Question>,
    onView: (List<Question>) -> Unit,
    onTestThese: (List<Question>, String) -> Unit,
    onTestScope: (List<Question>, String) -> Unit,
    modifier: Modifier = Modifier,
) {
    val collections = listOf(
        RevisionCollection(
            key = "flagged", title = stringResource(R.string.qbank_source_flagged),
            empty = stringResource(R.string.qbank_collection_flagged_empty),
            questions = flagged,
        ),
        RevisionCollection(
            key = "incorrect", title = stringResource(R.string.qbank_source_incorrect),
            empty = stringResource(R.string.qbank_collection_incorrect_empty),
            questions = incorrect,
        ),
        RevisionCollection(
            key = "omitted", title = stringResource(R.string.qbank_source_omitted),
            empty = stringResource(R.string.qbank_collection_omitted_empty),
            questions = omitted,
        ),
    )

    LazyColumn(modifier = modifier.fillMaxSize().padding(16.dp)) {
        items(collections, key = { it.key }) { collection ->
            CollectionCard(collection, onView, onTestThese, onTestScope)
        }
    }
}

@Composable
private fun CollectionCard(
    collection: RevisionCollection,
    onView: (List<Question>) -> Unit,
    onTestThese: (List<Question>, String) -> Unit,
    onTestScope: (List<Question>, String) -> Unit,
) {
    Card(modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp).testTag(collectionCardTag(collection.key))) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(collection.title, style = MaterialTheme.typography.titleMedium)
                Text("${collection.questions.size}", style = MaterialTheme.typography.bodyMedium)
            }
            if (collection.questions.isEmpty()) {
                Text(
                    text = collection.empty,
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(top = 8.dp),
                )
            } else {
                collection.questions.take(3).forEach { question ->
                    Text(
                        text = question.stem,
                        style = MaterialTheme.typography.bodyMedium,
                        maxLines = 1,
                        modifier = Modifier.padding(top = 4.dp),
                    )
                }
                if (collection.questions.size > 3) {
                    Text(
                        text = stringResource(R.string.qbank_collection_and_more_format, collection.questions.size - 3),
                        style = MaterialTheme.typography.bodySmall,
                        modifier = Modifier.padding(top = 4.dp),
                    )
                }
            }
            Row(
                modifier = Modifier.fillMaxWidth().padding(top = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                TextButton(
                    onClick = { onView(collection.questions) },
                    enabled = collection.questions.isNotEmpty(),
                    modifier = Modifier.testTag(collectionViewButtonTag(collection.key)),
                ) { Text(stringResource(R.string.qbank_view)) }
                OutlinedButton(
                    onClick = { onTestThese(collection.questions, collection.title) },
                    enabled = collection.questions.isNotEmpty(),
                    modifier = Modifier.testTag(collectionTestTheseButtonTag(collection.key)),
                ) { Text(stringResource(R.string.qbank_test_these)) }
                OutlinedButton(
                    onClick = { onTestScope(collection.questions, collection.title) },
                    enabled = collection.questions.isNotEmpty(),
                    modifier = Modifier.testTag(collectionTestScopeButtonTag(collection.key)),
                ) { Text(stringResource(R.string.qbank_test_this_scope)) }
            }
        }
    }
}
