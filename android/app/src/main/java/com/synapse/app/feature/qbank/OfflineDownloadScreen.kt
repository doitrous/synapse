package com.synapse.app.feature.qbank

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.qbank.Question

const val QBANK_OFFLINE_DOWNLOAD_BUTTON_TAG = "qbank_offline_download_button"
const val QBANK_OFFLINE_PROGRESS_TAG = "qbank_offline_progress"
const val QBANK_OFFLINE_RESULT_TAG = "qbank_offline_result"
const val QBANK_OFFLINE_BACK_BUTTON_TAG = "qbank_offline_back_button"
fun offlineRemoveButtonTag(index: Int): String = "qbank_offline_remove_$index"

/**
 * Lets a student pin the setup screen's current scope for offline use, and
 * manage scopes already pinned on this device. [scope]/[questions] describe
 * what "download for offline" targets right now — the scope currently
 * selected on [QBankSetupScreen] — passed in rather than re-read, since this
 * screen is not itself scoped to a nav-graph entry that could own that state.
 *
 * Media prefetch is currently a no-op (see
 * [QBankRepository.pinScopeForOffline] — [Question] carries no media field
 * yet), so today "downloading" mostly just records the scope as pinned; the
 * count/progress UI here is forward-compatible with real media once content
 * references it.
 */
@Composable
fun OfflineDownloadScreen(
    scope: Set<String>,
    questions: List<Question>,
    onBack: () -> Unit,
    viewModel: PinnedScopesViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(stringResource(R.string.qbank_offline_title), style = MaterialTheme.typography.titleLarge)

        Text(
            text = stringResource(R.string.qbank_offline_current_selection_format, scope.size, questions.size),
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 8.dp),
        )

        Button(
            onClick = { viewModel.download(scope, questions) },
            enabled = !uiState.downloading && scope.isNotEmpty(),
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(QBANK_OFFLINE_DOWNLOAD_BUTTON_TAG),
        ) {
            Text(stringResource(R.string.qbank_offline_download_selection_button))
        }

        if (uiState.downloading) {
            val progress = if (uiState.progressTotal > 0) uiState.progressDone / uiState.progressTotal.toFloat() else 0f
            LinearProgressIndicator(
                progress = { progress },
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp).testTag(QBANK_OFFLINE_PROGRESS_TAG),
            )
        }

        uiState.lastResult?.let { result ->
            Text(
                text = stringResource(R.string.qbank_offline_result_format, result.cachedCount, result.alreadyCachedCount),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 8.dp).testTag(QBANK_OFFLINE_RESULT_TAG),
            )
        }

        Text(
            text = stringResource(R.string.qbank_pinned_scopes_label),
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(top = 24.dp),
        )
        LazyColumn(modifier = Modifier.weight(1f).padding(top = 4.dp)) {
            if (uiState.pinnedScopes.isEmpty()) {
                item { Text(stringResource(R.string.qbank_offline_nothing_pinned), style = MaterialTheme.typography.bodyMedium) }
            }
            itemsIndexed(uiState.pinnedScopes) { index, pinnedScope ->
                Card(modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                    ) {
                        Text(
                            pluralStringResource(R.plurals.qbank_scope_items_count, pinnedScope.size, pinnedScope.size),
                            style = MaterialTheme.typography.bodyMedium,
                        )
                        TextButton(
                            onClick = { viewModel.remove(pinnedScope) },
                            modifier = Modifier.testTag(offlineRemoveButtonTag(index)),
                        ) { Text(stringResource(R.string.qbank_remove)) }
                    }
                }
            }
        }

        TextButton(onClick = onBack, modifier = Modifier.testTag(QBANK_OFFLINE_BACK_BUTTON_TAG)) {
            Text(stringResource(R.string.qbank_back))
        }
    }
}
