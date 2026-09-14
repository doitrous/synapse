package com.synapse.app.feature.qbank

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle

fun hubTabTag(tab: HubTab): String = "qbank_hub_tab_${tab.name}"

/**
 * The Question Bank hub: a tab row over the existing "New" setup screen plus
 * the two sections this task adds — "Flagged & missed" (the Revise
 * collections) and "Previous tests". Everything is driven by one
 * [QuestionBankViewModel] so switching tabs never re-fetches.
 */
@Composable
fun QuestionBankHubScreen(
    onStartOffline: () -> Unit,
    onStartMultiResponsePractice: () -> Unit,
    viewModel: QuestionBankViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    if (uiState.loading) {
        Column(
            modifier = Modifier.fillMaxSize().testTag(QBANK_SETUP_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            CircularProgressIndicator()
        }
        return
    }

    Column(modifier = Modifier.fillMaxSize()) {
        TabRow(selectedTabIndex = uiState.hubTab.ordinal) {
            HubTab.entries.forEach { tab ->
                Tab(
                    selected = uiState.hubTab == tab,
                    onClick = { viewModel.onHubTabChange(tab) },
                    text = { Text(tab.label()) },
                    modifier = Modifier.testTag(hubTabTag(tab)),
                )
            }
        }

        when (uiState.hubTab) {
            HubTab.New -> QBankSetupScreen(
                onStartOffline = onStartOffline,
                onStartMultiResponsePractice = onStartMultiResponsePractice,
                viewModel = viewModel,
            )

            HubTab.Collections -> RevisionCollectionsScreen(
                flagged = uiState.flaggedQuestions,
                incorrect = uiState.incorrectQuestions,
                omitted = uiState.omittedQuestions,
                onView = viewModel::reviewCollection,
                onTestThese = viewModel::testThese,
                onTestScope = viewModel::testScope,
            )

            HubTab.Previous -> PreviousTestsScreen(
                sessions = uiState.previousTests,
                names = uiState.sessionNames,
                canRetakeSame = { sessionId -> uiState.reviewableQuestions(sessionId).isNotEmpty() },
                onRename = viewModel::renameSession,
                onReview = viewModel::reviewSession,
                onRetakeSame = viewModel::retakeSame,
                onRetakeScope = viewModel::retakeScope,
                onDelete = viewModel::deleteSession,
            )
        }
    }
}

private fun HubTab.label(): String = when (this) {
    HubTab.New -> "New"
    HubTab.Collections -> "Flagged & missed"
    HubTab.Previous -> "Previous tests"
}
