package com.synapse.app.feature.essays

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
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
import com.synapse.app.core.essays.EssayQuestion
import com.synapse.app.core.essays.WrittenQuestion
import com.synapse.app.core.essays.coveredCount
import com.synapse.app.core.essays.markWritten
import com.synapse.app.core.essays.writtenFullyMarked

const val ESSAYS_LOADING_TAG = "essays_loading"
fun essaysWrittenRowTag(id: String): String = "essays_written_$id"
fun essaysEssayRowTag(id: String): String = "essays_essay_$id"
const val ESSAYS_BACK_BUTTON_TAG = "essays_back_button"
const val ESSAYS_REVEAL_BUTTON_TAG = "essays_reveal_button"

/**
 * The Essays surface's single public entry point. The shell mounts this
 * directly and it constructs its own [EssaysViewModel] via [hiltViewModel] —
 * no navigation wiring required of the caller. Internal list -> answer ->
 * self-mark navigation is owned entirely inside this composable.
 */
@Composable
fun EssaysRoute(viewModel: EssaysViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    var openEssayId by rememberSaveable { mutableStateOf<String?>(null) }
    var openWrittenId by rememberSaveable { mutableStateOf<String?>(null) }

    EssaysScreen(
        uiState = uiState,
        openEssayId = openEssayId,
        openWrittenId = openWrittenId,
        onOpenEssay = { openEssayId = it },
        onOpenWritten = { openWrittenId = it },
        onBack = { openEssayId = null; openWrittenId = null },
        onSaveEssayDraft = viewModel::saveEssayDraft,
        onRevealEssay = viewModel::revealEssay,
        onToggleEssayPoint = viewModel::toggleEssayPoint,
        onSaveWrittenDraft = viewModel::saveWrittenDraft,
        onRevealWritten = viewModel::revealWritten,
        onToggleWrittenPoint = viewModel::toggleWrittenPoint,
    )
}

@Composable
private fun EssaysScreen(
    uiState: EssaysUiState,
    openEssayId: String?,
    openWrittenId: String?,
    onOpenEssay: (String) -> Unit,
    onOpenWritten: (String) -> Unit,
    onBack: () -> Unit,
    onSaveEssayDraft: (String, String) -> Unit,
    onRevealEssay: (String) -> Unit,
    onToggleEssayPoint: (String, String) -> Unit,
    onSaveWrittenDraft: (String, String, String) -> Unit,
    onRevealWritten: (String) -> Unit,
    onToggleWrittenPoint: (String, String, String) -> Unit,
) {
    if (uiState !is EssaysUiState.Content) {
        Column(
            modifier = Modifier.fillMaxSize().testTag(ESSAYS_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) { Text("Loading…") }
        return
    }

    val openEssay = openEssayId?.let { uiState.essaysById[it] }
    val openWritten = openWrittenId?.let { uiState.writtenById[it] }

    when {
        openEssayId != null && openEssay == null -> LaunchedEffect(Unit) { onBack() }
        openWrittenId != null && openWritten == null -> LaunchedEffect(Unit) { onBack() }
        openEssay != null -> EssayRunnerPane(
            essay = openEssay,
            answer = uiState.essayAnswers[openEssay.id],
            onBack = onBack,
            onDraft = { onSaveEssayDraft(openEssay.id, it) },
            onReveal = { onRevealEssay(openEssay.id) },
            onTogglePoint = { onToggleEssayPoint(openEssay.id, it) },
        )
        openWritten != null -> WrittenRunnerPane(
            question = openWritten,
            answer = uiState.writtenAnswers[openWritten.id],
            onBack = onBack,
            onDraft = { partId, text -> onSaveWrittenDraft(openWritten.id, partId, text) },
            onReveal = { onRevealWritten(openWritten.id) },
            onTogglePoint = { partId, point -> onToggleWrittenPoint(openWritten.id, partId, point) },
        )
        else -> EssaysListScreen(uiState = uiState, onOpenEssay = onOpenEssay, onOpenWritten = onOpenWritten)
    }
}

@Composable
private fun EssaysListScreen(
    uiState: EssaysUiState.Content,
    onOpenEssay: (String) -> Unit,
    onOpenWritten: (String) -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        Text("Essay questions", style = MaterialTheme.typography.titleLarge)
        Text(
            "Read a written question, write your answer, then reveal the key points and mark yourself against them.",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 4.dp),
        )

        if (uiState.essaysById.isEmpty() && uiState.writtenById.isEmpty()) {
            Text(
                "No written questions published yet.",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 20.dp),
            )
            return@Column
        }

        if (uiState.writtenById.isNotEmpty()) {
            Text("Exam questions", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
            uiState.writtenById.values.forEach { question ->
                WrittenRow(question, uiState.writtenAnswers[question.id], onClick = { onOpenWritten(question.id) })
                HorizontalDivider()
            }
        }

        if (uiState.essaysById.isNotEmpty()) {
            Text("Practice essays", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
            uiState.essaysById.values.forEach { essay ->
                EssayRow(essay, uiState.essayAnswers[essay.id], onClick = { onOpenEssay(essay.id) })
                HorizontalDivider()
            }
        }
    }
}

/** Not started / Draft saved / Marked — ported from `EssayRow` in `EssayQuestions.tsx`. */
@Composable
private fun EssayRow(essay: EssayQuestion, answer: EssayAnswer?, onClick: () -> Unit) {
    val covered = coveredCount(answer?.ticked, essay.keyPoints.map { it.id })
    val status = when {
        covered != null -> "Marked · ${covered.covered} of ${covered.total} points covered"
        !answer?.text.isNullOrBlank() -> "Draft saved"
        else -> "Not started"
    }
    Surface(onClick = onClick, modifier = Modifier.fillMaxWidth().testTag(essaysEssayRowTag(essay.id))) {
        Column(modifier = Modifier.fillMaxWidth().padding(vertical = 10.dp)) {
            Text(essay.title, style = MaterialTheme.typography.bodyLarge)
            Text(status, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 2.dp))
        }
    }
}

/** Not started / Draft saved / Marked — ported from `WrittenRow` in `EssayQuestions.tsx`. */
@Composable
private fun WrittenRow(question: WrittenQuestion, answer: WrittenAnswer?, onClick: () -> Unit) {
    val score = markWritten(answer?.ticks, question.parts)
    val marked = writtenFullyMarked(answer?.ticks, question.parts)
    val wrote = answer?.text?.values?.any { it.isNotBlank() } == true
    val status = score?.takeIf { marked }?.let { "Marked · ${it.marks} of ${it.outOf} marks" }
        ?: if (wrote) "Draft saved" else "Not started"
    Surface(onClick = onClick, modifier = Modifier.fillMaxWidth().testTag(essaysWrittenRowTag(question.id))) {
        Column(modifier = Modifier.fillMaxWidth().padding(vertical = 10.dp)) {
            Text(question.title, style = MaterialTheme.typography.bodyLarge)
            Text(
                "${question.parts.size} parts · ${question.totalMarks} marks · $status",
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 2.dp),
            )
        }
    }
}

@Composable
private fun BackHeader(title: String, onBack: () -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        IconButton(onClick = onBack, modifier = Modifier.testTag(ESSAYS_BACK_BUTTON_TAG)) {
            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
        }
        Text(title, style = MaterialTheme.typography.titleLarge)
    }
}

/**
 * One essay: prompt, a draft the student writes and that auto-saves as they
 * type, then — once revealed — the examiner's note, the model answer, and the
 * key points ticked to self-mark. Ported from `EssayRunner.tsx`'s write/reveal
 * stages (`initialStage` in `src/data/essay.ts`).
 */
@Composable
private fun EssayRunnerPane(
    essay: EssayQuestion,
    answer: EssayAnswer?,
    onBack: () -> Unit,
    onDraft: (String) -> Unit,
    onReveal: () -> Unit,
    onTogglePoint: (String) -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        BackHeader(title = essay.title, onBack = onBack)
        Text(essay.prompt, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(top = 12.dp))

        OutlinedTextField(
            value = answer?.text.orEmpty(),
            onValueChange = onDraft,
            label = { Text("Your answer") },
            modifier = Modifier.fillMaxWidth().heightIn(min = 140.dp).padding(top = 16.dp),
        )

        if (!answer.isRevealed()) {
            Button(onClick = onReveal, modifier = Modifier.padding(top = 16.dp).testTag(ESSAYS_REVEAL_BUTTON_TAG)) {
                Text("Reveal key points")
            }
        } else {
            if (essay.examinerNote.isNotBlank()) {
                Text("Examiner's note", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
                Text(essay.examinerNote, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 4.dp))
            }

            Text("Tick every point you actually made", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
            essay.keyPoints.forEach { point ->
                val checked = answer?.ticked?.contains(point.id) == true
                Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth().padding(top = 4.dp)) {
                    Checkbox(checked = checked, onCheckedChange = { onTogglePoint(point.id) })
                    Text(point.text, style = MaterialTheme.typography.bodyMedium)
                }
            }

            if (essay.modelAnswer.isNotBlank()) {
                Text("Model answer", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
                Text(essay.modelAnswer, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 4.dp))
            }
        }
    }
}

/**
 * One written exam question: every part's prompt and marks, a per-part draft
 * that auto-saves as the student types, then — once revealed — each part's
 * expected points ticked to self-mark, and the running score. Ported from
 * `WrittenRunner.tsx`.
 *
 * Parts are shown in the order the paper listed them (`question.parts`),
 * rather than resolved against `dependsOnPartId` the way
 * `writtenPartsInOrder` does on web — a deliberate scope cut; see this
 * feature's report for why.
 */
@Composable
private fun WrittenRunnerPane(
    question: WrittenQuestion,
    answer: WrittenAnswer?,
    onBack: () -> Unit,
    onDraft: (String, String) -> Unit,
    onReveal: () -> Unit,
    onTogglePoint: (String, String) -> Unit,
) {
    val revealed = answer.isRevealed()
    val score = if (revealed) markWritten(answer?.ticks, question.parts) else null

    Column(modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState())) {
        BackHeader(title = question.title, onBack = onBack)
        if (question.stem.isNotBlank()) {
            Text(question.stem, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(top = 12.dp))
        }
        if (score != null) {
            Text(
                "Score: ${score.marks} of ${score.outOf} marks",
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(top = 8.dp),
            )
        }

        question.parts.forEach { part ->
            Text(
                "(${part.label}) ${part.prompt} [${part.marks} marks]",
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(top = 20.dp),
            )
            OutlinedTextField(
                value = answer?.text?.get(part.id).orEmpty(),
                onValueChange = { onDraft(part.id, it) },
                label = { Text("Your answer") },
                modifier = Modifier.fillMaxWidth().heightIn(min = 100.dp).padding(top = 8.dp),
            )

            if (revealed) {
                val partTicks = answer?.ticks?.get(part.id).orEmpty()
                part.expectedPoints.forEach { point ->
                    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth().padding(top = 4.dp)) {
                        Checkbox(checked = point in partTicks, onCheckedChange = { onTogglePoint(part.id, point) })
                        Text(point, style = MaterialTheme.typography.bodyMedium)
                    }
                }
            }
        }

        if (!revealed) {
            Button(onClick = onReveal, modifier = Modifier.padding(top = 20.dp).testTag(ESSAYS_REVEAL_BUTTON_TAG)) {
                Text("Reveal mark scheme")
            }
        }
    }
}
