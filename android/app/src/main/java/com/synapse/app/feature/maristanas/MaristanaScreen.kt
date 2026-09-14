package com.synapse.app.feature.maristanas

import androidx.annotation.StringRes
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.maristanas.MARISTANA_MILESTONES
import com.synapse.app.core.maristanas.MARISTANA_STEPS
import com.synapse.app.core.maristanas.MaristanaHospital
import com.synapse.app.core.maristanas.MaristanaMilestone
import com.synapse.app.core.maristanas.MaristanaOverview

const val MARISTANAS_LOADING_TAG = "maristanas_loading"
const val MARISTANAS_UNAVAILABLE_TAG = "maristanas_unavailable"
const val MARISTANAS_ONBOARDING_TAG = "maristanas_onboarding"
const val MARISTANAS_RENAME_BUTTON_TAG = "maristanas_rename_button"
const val MARISTANAS_RENAME_SAVE_TAG = "maristanas_rename_save"
fun maristanasHospitalTag(slot: Int): String = "maristanas_hospital_$slot"

/**
 * Build Maristanas' single public entry point. The shell mounts this
 * directly and it constructs its own [MaristanaViewModel] via [hiltViewModel]
 * — no navigation wiring required of the caller, mirroring `PracticalRoute`.
 */
@Composable
fun MaristanasRoute(viewModel: MaristanaViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    MaristanaScreen(
        uiState = uiState,
        onSelectHospital = viewModel::selectHospital,
        onRename = viewModel::rename,
        onDismissOnboarding = viewModel::dismissOnboarding,
        onRetry = viewModel::refresh,
    )
}

@Composable
private fun MaristanaScreen(
    uiState: MaristanaUiState,
    onSelectHospital: (Int) -> Unit,
    onRename: (Int, String) -> Unit,
    onDismissOnboarding: () -> Unit,
    onRetry: () -> Unit,
) {
    when (uiState) {
        MaristanaUiState.Loading -> Box(
            modifier = Modifier.fillMaxSize().testTag(MARISTANAS_LOADING_TAG),
            contentAlignment = Alignment.Center,
        ) { CircularProgressIndicator() }

        MaristanaUiState.Unavailable -> Box(
            modifier = Modifier.fillMaxSize().testTag(MARISTANAS_UNAVAILABLE_TAG),
            contentAlignment = Alignment.Center,
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    stringResource(R.string.maristanas_unavailable_message),
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(24.dp),
                )
                Button(onClick = onRetry) { Text(stringResource(R.string.common_retry)) }
            }
        }

        is MaristanaUiState.Content -> {
            val selected = uiState.overview.hospitals.firstOrNull { it.slot == uiState.selectedSlot } ?: uiState.overview.hospitals.last()
            Box(modifier = Modifier.fillMaxSize()) {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp),
                ) {
                    item { MaristanasHeader(uiState.overview, uiState.fromCache) }
                    uiState.renameRefusalMessage?.let { messageRes ->
                        item {
                            Text(
                                stringResource(messageRes),
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.error,
                            )
                        }
                    }
                    item {
                        BuildLedgerCard(
                            hospital = selected,
                            creditsPerStep = uiState.overview.config.creditsPerStep.toInt(),
                            onRename = { name -> onRename(selected.slot, name) },
                        )
                    }
                    item { CreditBreakdownCard(uiState.overview) }
                    item { Text(stringResource(R.string.maristanas_collection_title), style = MaterialTheme.typography.titleMedium) }
                    item {
                        LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            items(uiState.overview.hospitals) { hospital ->
                                HospitalChip(hospital, selected = hospital.slot == selected.slot, onClick = { onSelectHospital(hospital.slot) })
                            }
                        }
                    }
                    item { AchievementRail(selected.stage) }
                }
            }

            if (!uiState.onboarding.completed) {
                OnboardingDialog(onStart = onDismissOnboarding)
            }
        }
    }
}

@Composable
private fun MaristanasHeader(overview: MaristanaOverview, fromCache: Boolean) {
    Column {
        Text(stringResource(R.string.maristanas_title), style = MaterialTheme.typography.titleLarge)
        Text(
            pluralStringResource(R.plurals.maristanas_hospitals_completed, overview.completedHospitals, overview.completedHospitals) +
                " · " +
                pluralStringResource(R.plurals.maristanas_credits_total, overview.totalCredits, overview.totalCredits),
            style = MaterialTheme.typography.bodyMedium,
        )
        if (fromCache) {
            Text(
                stringResource(R.string.maristanas_cached_notice),
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.error,
            )
        }
        if (!overview.enabled) {
            Text(
                stringResource(R.string.maristanas_disabled_notice),
                style = MaterialTheme.typography.bodyMedium,
            )
        }
    }
}

@Composable
private fun BuildLedgerCard(hospital: MaristanaHospital, creditsPerStep: Int, onRename: (String) -> Unit) {
    var editing by rememberSaveable(hospital.slot) { mutableStateOf(false) }
    var name by rememberSaveable(hospital.slot) { mutableStateOf(hospital.name) }

    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            if (editing) {
                OutlinedTextField(value = name, onValueChange = { name = it }, singleLine = true)
                Row(modifier = Modifier.padding(top = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(onClick = { onRename(name); editing = false }, modifier = Modifier.testTag(MARISTANAS_RENAME_SAVE_TAG)) { Text(stringResource(R.string.common_save)) }
                    TextButton(onClick = { name = hospital.name; editing = false }) { Text(stringResource(R.string.maristanas_cancel)) }
                }
            } else {
                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                    Text(hospital.name, style = MaterialTheme.typography.headlineSmall)
                    TextButton(onClick = { editing = true }, modifier = Modifier.testTag(MARISTANAS_RENAME_BUTTON_TAG)) { Text(stringResource(R.string.maristanas_rename_button)) }
                }
            }

            Spacer(modifier = Modifier.height(12.dp))
            Text(
                if (hospital.completed) {
                    stringResource(R.string.maristanas_hospital_complete)
                } else {
                    stringResource(R.string.maristanas_step_progress, hospital.stage + 1, MARISTANA_STEPS)
                },
                style = MaterialTheme.typography.bodyMedium,
            )
            LinearProgressIndicator(
                progress = { hospital.stage.toFloat() / MARISTANA_STEPS },
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
            )
            if (!hospital.completed) {
                Text(
                    pluralStringResource(
                        R.plurals.maristanas_credits_to_next_step,
                        hospital.creditsToNextStep,
                        hospital.creditsToNextStep,
                        creditsPerStep,
                    ),
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(top = 8.dp),
                )
            }
        }
    }
}

@Composable
private fun CreditBreakdownCard(overview: MaristanaOverview) {
    val accuracy = if (overview.questionsAnswered > 0) (overview.correctAnswers * 100) / overview.questionsAnswered else null
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(stringResource(R.string.maristanas_ledger_title), style = MaterialTheme.typography.titleMedium)
            Spacer(modifier = Modifier.height(8.dp))
            LedgerRow(
                stringResource(R.string.maristanas_ledger_study_label),
                pluralStringResource(R.plurals.maristanas_ledger_study_minutes, overview.studyMinutes, overview.studyMinutes),
                overview.breakdown.study,
            )
            LedgerRow(
                stringResource(R.string.maristanas_ledger_questions_label),
                pluralStringResource(R.plurals.maristanas_ledger_questions_detail, overview.questionsAnswered, overview.questionsAnswered),
                overview.breakdown.questions,
            )
            LedgerRow(
                stringResource(R.string.maristanas_ledger_accuracy_label),
                accuracy?.let { stringResource(R.string.maristanas_ledger_accuracy_percent, it) } ?: stringResource(R.string.maristanas_ledger_accuracy_none),
                overview.breakdown.accuracy,
            )
            LedgerRow(
                stringResource(R.string.maristanas_ledger_assessments_label),
                overview.averageAssessmentScore?.let {
                    pluralStringResource(R.plurals.maristanas_ledger_assessments_detail, overview.assessmentSessions, overview.assessmentSessions, it)
                } ?: stringResource(R.string.maristanas_ledger_assessments_none),
                overview.breakdown.assessments,
            )
        }
    }
}

@Composable
private fun LedgerRow(label: String, detail: String, credits: Int) {
    Row(modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp), horizontalArrangement = Arrangement.SpaceBetween) {
        Column { Text(label, style = MaterialTheme.typography.bodyLarge); Text(detail, style = MaterialTheme.typography.bodySmall) }
        Text(stringResource(R.string.maristanas_ledger_credit_delta, credits), style = MaterialTheme.typography.bodyLarge)
    }
    HorizontalDivider()
}

@Composable
private fun HospitalChip(hospital: MaristanaHospital, selected: Boolean, onClick: () -> Unit) {
    val border = if (selected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline
    Card(
        modifier = Modifier.testTag(maristanasHospitalTag(hospital.slot)),
        onClick = onClick,
        border = BorderStroke(if (selected) 2.dp else 1.dp, border),
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(hospital.name, style = MaterialTheme.typography.bodyLarge)
            Text(
                if (hospital.completed) {
                    stringResource(R.string.maristanas_hospital_built, MARISTANA_STEPS)
                } else {
                    pluralStringResource(R.plurals.maristanas_hospital_parts_placed, hospital.stage, hospital.stage, MARISTANA_STEPS)
                },
                style = MaterialTheme.typography.bodySmall,
            )
        }
    }
}

@Composable
private fun AchievementRail(stage: Int) {
    Column {
        Text(stringResource(R.string.maristanas_achievements_title), style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(8.dp))
        MARISTANA_MILESTONES.forEach { milestone ->
            val unlocked = milestone.stage <= stage
            Row(modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                Column {
                    Text(stringResource(milestoneTitleRes(milestone)), style = MaterialTheme.typography.bodyLarge)
                    Text(stringResource(milestoneDescriptionRes(milestone)), style = MaterialTheme.typography.bodySmall)
                }
                Box(
                    modifier = Modifier
                        .background(
                            if (unlocked) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surfaceVariant,
                            RoundedCornerShape(4.dp),
                        )
                        .padding(horizontal = 8.dp, vertical = 4.dp),
                ) {
                    Text(
                        if (unlocked) stringResource(R.string.maristanas_achievement_earned) else stringResource(R.string.maristanas_achievement_stage, milestone.stage),
                        style = MaterialTheme.typography.labelSmall,
                    )
                }
            }
        }
    }
}

/**
 * [MARISTANA_MILESTONES] is a fixed, non-admin-configurable set of six stages
 * (`core/maristanas/Maristana.kt`) — its English `title`/`description` fields
 * are display copy, not synced config, so this feature localizes them by
 * mapping the stable `stage` number to a string resource rather than editing
 * that shared core file (out of this feature's scope).
 */
@StringRes
private fun milestoneTitleRes(milestone: MaristanaMilestone): Int = when (milestone.stage) {
    1 -> R.string.maristanas_milestone_1_title
    5 -> R.string.maristanas_milestone_5_title
    10 -> R.string.maristanas_milestone_10_title
    15 -> R.string.maristanas_milestone_15_title
    20 -> R.string.maristanas_milestone_20_title
    else -> R.string.maristanas_milestone_25_title
}

@StringRes
private fun milestoneDescriptionRes(milestone: MaristanaMilestone): Int = when (milestone.stage) {
    1 -> R.string.maristanas_milestone_1_desc
    5 -> R.string.maristanas_milestone_5_desc
    10 -> R.string.maristanas_milestone_10_desc
    15 -> R.string.maristanas_milestone_15_desc
    20 -> R.string.maristanas_milestone_20_desc
    else -> R.string.maristanas_milestone_25_desc
}

@Composable
private fun OnboardingDialog(onStart: () -> Unit) {
    AlertDialog(
        modifier = Modifier.testTag(MARISTANAS_ONBOARDING_TAG),
        onDismissRequest = {},
        title = { Text(stringResource(R.string.maristanas_onboarding_title)) },
        text = { Text(stringResource(R.string.maristanas_onboarding_body)) },
        confirmButton = { Button(onClick = onStart) { Text(stringResource(R.string.maristanas_onboarding_start)) } },
    )
}
