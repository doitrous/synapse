package com.synapse.app.feature.maristanas

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
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.maristanas.MARISTANA_MILESTONES
import com.synapse.app.core.maristanas.MARISTANA_STEPS
import com.synapse.app.core.maristanas.MaristanaHospital
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
                    "Your construction ledger could not be loaded. No construction credit has been changed.",
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(24.dp),
                )
                Button(onClick = onRetry) { Text("Try again") }
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
                    uiState.renameRefusalReason?.let { reason ->
                        item {
                            Text(
                                renameRefusalMessage(reason),
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
                    item { Text("Your collection", style = MaterialTheme.typography.titleMedium) }
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

/** Turns the server's verbatim rename refusal reason into student-facing copy. */
private fun renameRefusalMessage(reason: String): String = when (reason) {
    "hospital_not_unlocked" -> "You can rename a hospital once you have started building it."
    "invalid_hospital" -> "That name could not be saved. Try a shorter name."
    else -> "That name could not be saved."
}

@Composable
private fun MaristanasHeader(overview: MaristanaOverview, fromCache: Boolean) {
    Column {
        Text("Build Maristanas", style = MaterialTheme.typography.titleLarge)
        Text(
            "${overview.completedHospitals} hospitals completed · ${overview.totalCredits} total credits",
            style = MaterialTheme.typography.bodyMedium,
        )
        if (fromCache) {
            Text(
                "Showing your last saved progress — reconnect to see the latest.",
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.error,
            )
        }
        if (!overview.enabled) {
            Text(
                "Build Maristanas is resting. Your administrators have paused it; your learning evidence is still safe.",
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
                    Button(onClick = { onRename(name); editing = false }, modifier = Modifier.testTag(MARISTANAS_RENAME_SAVE_TAG)) { Text("Save") }
                    TextButton(onClick = { name = hospital.name; editing = false }) { Text("Cancel") }
                }
            } else {
                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                    Text(hospital.name, style = MaterialTheme.typography.headlineSmall)
                    TextButton(onClick = { editing = true }, modifier = Modifier.testTag(MARISTANAS_RENAME_BUTTON_TAG)) { Text("Rename") }
                }
            }

            Spacer(modifier = Modifier.height(12.dp))
            Text(
                if (hospital.completed) "Hospital complete" else "Step ${hospital.stage + 1} of $MARISTANA_STEPS",
                style = MaterialTheme.typography.bodyMedium,
            )
            LinearProgressIndicator(
                progress = { hospital.stage.toFloat() / MARISTANA_STEPS },
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
            )
            if (!hospital.completed) {
                Text(
                    "${hospital.creditsToNextStep} credits to place the next part (each part costs $creditsPerStep)",
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
            Text("Construction ledger", style = MaterialTheme.typography.titleMedium)
            Spacer(modifier = Modifier.height(8.dp))
            LedgerRow("Focused study", "${overview.studyMinutes} minutes recorded", overview.breakdown.study)
            LedgerRow("Questions answered", "${overview.questionsAnswered} attempts", overview.breakdown.questions)
            LedgerRow("Correct-answer credit", accuracy?.let { "$it% accuracy" } ?: "No marked answers yet", overview.breakdown.accuracy)
            LedgerRow(
                "Assessment scores",
                overview.averageAssessmentScore?.let { "${overview.assessmentSessions} sessions · $it% avg" } ?: "No assessment session yet",
                overview.breakdown.assessments,
            )
        }
    }
}

@Composable
private fun LedgerRow(label: String, detail: String, credits: Int) {
    Row(modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp), horizontalArrangement = Arrangement.SpaceBetween) {
        Column { Text(label, style = MaterialTheme.typography.bodyLarge); Text(detail, style = MaterialTheme.typography.bodySmall) }
        Text("+$credits", style = MaterialTheme.typography.bodyLarge)
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
                if (hospital.completed) "Built · $MARISTANA_STEPS/$MARISTANA_STEPS" else "${hospital.stage}/$MARISTANA_STEPS parts placed",
                style = MaterialTheme.typography.bodySmall,
            )
        }
    }
}

@Composable
private fun AchievementRail(stage: Int) {
    Column {
        Text("Construction achievements", style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(8.dp))
        MARISTANA_MILESTONES.forEach { milestone ->
            val unlocked = milestone.stage <= stage
            Row(modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                Column {
                    Text(milestone.title, style = MaterialTheme.typography.bodyLarge)
                    Text(milestone.description, style = MaterialTheme.typography.bodySmall)
                }
                Box(
                    modifier = Modifier
                        .background(
                            if (unlocked) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surfaceVariant,
                            RoundedCornerShape(4.dp),
                        )
                        .padding(horizontal = 8.dp, vertical = 4.dp),
                ) { Text(if (unlocked) "Earned" else "Stage ${milestone.stage}", style = MaterialTheme.typography.labelSmall) }
            }
        }
    }
}

@Composable
private fun OnboardingDialog(onStart: () -> Unit) {
    AlertDialog(
        modifier = Modifier.testTag(MARISTANAS_ONBOARDING_TAG),
        onDismissRequest = {},
        title = { Text("Build a place of healing") },
        text = {
            Text(
                "Your focused study becomes a Maristana — a hospital built one part at a time. " +
                    "Active study minutes, answered questions and assessment scores place the next part automatically.",
            )
        },
        confirmButton = { Button(onClick = onStart) { Text("Start building") } },
    )
}
