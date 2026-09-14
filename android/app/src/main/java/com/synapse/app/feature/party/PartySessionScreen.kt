package com.synapse.app.feature.party

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.api.PartySessionDto
import com.synapse.app.core.api.PartySessionItemRefDto
import com.synapse.app.core.api.PartySessionMemberDto
import com.synapse.app.core.qbank.Question

/**
 * Sit a party session, one item at a time — the Android analogue of web's
 * `PartySessionRunner`. A `question` item is graded server-side; a
 * `practical`/`essay` item ref has no on-device authored-content resolver yet
 * (see [PartySessionsRepository]'s class doc), so it renders as a self-check
 * card that records "I've done this" honestly rather than inventing a body
 * for the item.
 */
@Composable
fun PartySessionScreen(viewModel: PartySessionViewModel = hiltViewModel(), onExit: () -> Unit) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    when (val state = uiState) {
        PartySessionUiState.Loading -> Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }

        is PartySessionUiState.Gone -> Column(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(stringResource(state.message), style = MaterialTheme.typography.bodyLarge)
            OutlinedButton(onClick = onExit) { Text(stringResource(R.string.party_back)) }
        }

        is PartySessionUiState.InSession -> {
            val session = state.session
            val questionsById = remember(state.questions) { state.questions.associateBy { it.id } }
            val remaining = remember(session) { session.itemRefs.filter { "${it.kind}:${it.id}" !in session.answeredKeys } }
            val allDone = session.itemRefs.isNotEmpty() && remaining.isEmpty()

            LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                item { Text(session.name, style = MaterialTheme.typography.titleLarge) }
                state.message?.let { message -> item { Text(stringResource(message), color = MaterialTheme.colorScheme.error) } }

                when {
                    session.state == "scheduled" -> item {
                        Text(stringResource(R.string.party_reason_not_started), style = MaterialTheme.typography.bodyLarge)
                    }

                    session.isClosed || allDone -> item {
                        ResultsCard(session)
                    }

                    else -> item {
                        val current = remaining.first()
                        Text(
                            stringResource(R.string.party_ratio_format, session.myAnswers.size + 1, session.itemRefs.size),
                            style = MaterialTheme.typography.labelLarge,
                        )
                        if (current.kind == "question") {
                            val question = questionsById[current.id]
                            if (question == null) {
                                Text(stringResource(R.string.party_question_unavailable), style = MaterialTheme.typography.bodyMedium)
                            } else {
                                QuestionCard(question, onAnswer = { index -> viewModel.answerQuestion(question.id, index) })
                            }
                        } else {
                            SelfCheckCard(current, onDone = { viewModel.markSelfChecked(current.kind, current.id) })
                        }
                    }
                }

                item { Text(stringResource(R.string.party_who_is_in_title), style = MaterialTheme.typography.titleMedium) }
                items(session.members, key = { it.userId }) { member -> MemberTallyRow(member) }

                item { OutlinedButton(onClick = onExit) { Text(stringResource(R.string.party_leave_action)) } }
            }
        }
    }
}

@Composable
private fun QuestionCard(question: Question, onAnswer: (Int) -> Unit) {
    var chosen by rememberSaveable(question.id) { mutableIntStateOf(-1) }
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(question.stem, style = MaterialTheme.typography.bodyLarge)
            question.options.forEachIndexed { index, option ->
                OutlinedButton(
                    onClick = { chosen = index },
                    modifier = Modifier.fillMaxWidth(),
                ) { Text("${option.label}. ${option.text}") }
            }
            Button(
                onClick = { onAnswer(chosen) },
                enabled = chosen >= 0,
                modifier = Modifier.fillMaxWidth(),
            ) { Text(stringResource(R.string.party_submit_answer)) }
        }
    }
}

@Composable
private fun SelfCheckCard(item: PartySessionItemRefDto, onDone: () -> Unit) {
    var busy by remember(item.id) { mutableStateOf(false) }
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(
                stringResource(if (item.kind == "practical") R.string.party_practical_item else R.string.party_essay_question),
                style = MaterialTheme.typography.titleMedium,
            )
            Text(
                stringResource(R.string.party_self_check_note),
                style = MaterialTheme.typography.bodySmall,
            )
            Button(onClick = { busy = true; onDone() }, enabled = !busy, modifier = Modifier.fillMaxWidth()) { Text(stringResource(R.string.party_done_this)) }
        }
    }
}

@Composable
private fun ResultsCard(session: PartySessionDto) {
    val marked = session.myAnswers.filter { it.kind == "question" }
    val practised = session.myAnswers.count { it.kind != "question" }
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(stringResource(R.string.party_your_result), style = MaterialTheme.typography.titleMedium)
            if (marked.isNotEmpty()) {
                Text(
                    stringResource(R.string.party_correct_of, marked.count { it.correct == true }, marked.size),
                    style = MaterialTheme.typography.headlineSmall,
                )
            } else {
                Text(stringResource(R.string.party_marked_none), style = MaterialTheme.typography.bodyMedium)
            }
            if (practised > 0) {
                Text(pluralStringResource(R.plurals.party_self_checked_count, practised, practised), style = MaterialTheme.typography.bodyMedium)
            }
            Text(
                stringResource(R.string.party_self_checked_note),
                style = MaterialTheme.typography.bodySmall,
            )
        }
    }
}

@Composable
private fun MemberTallyRow(member: PartySessionMemberDto) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(member.displayName ?: stringResource(R.string.party_member_fallback_name))
        Column(horizontalAlignment = Alignment.End) {
            Text(
                member.tally.marked?.let { stringResource(R.string.party_ratio_format, it.correct, it.of) } ?: stringResource(R.string.party_not_marked_yet),
                style = MaterialTheme.typography.labelLarge,
            )
            if (member.tally.practised > 0) {
                Text(pluralStringResource(R.plurals.party_self_checked_count, member.tally.practised, member.tally.practised), style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
