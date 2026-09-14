package com.synapse.app.feature.flashcards

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.AssistChip
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
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
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
import com.synapse.app.core.flashcards.DeckCard

const val FLASHCARDS_LOADING_TAG = "flashcards_loading"
const val FLASHCARDS_NEW_DECK_BUTTON_TAG = "flashcards_new_deck_button"
fun deckStudyButtonTag(deckId: String): String = "flashcards_deck_study_$deckId"
fun deckEditButtonTag(deckId: String): String = "flashcards_deck_edit_$deckId"
fun deckDeleteButtonTag(deckId: String): String = "flashcards_deck_delete_$deckId"
const val CREATE_DECK_NAME_FIELD_TAG = "flashcards_create_deck_name_field"
const val CREATE_DECK_CONFIRM_BUTTON_TAG = "flashcards_create_deck_confirm_button"
const val MANAGE_DECK_ADD_FRONT_FIELD_TAG = "flashcards_manage_deck_add_front_field"
const val MANAGE_DECK_ADD_BACK_FIELD_TAG = "flashcards_manage_deck_add_back_field"
const val MANAGE_DECK_ADD_BUTTON_TAG = "flashcards_manage_deck_add_button"
fun manageDeckCardDeleteTag(cardId: String): String = "flashcards_manage_deck_card_delete_$cardId"
const val DELETE_DECK_CONFIRM_BUTTON_TAG = "flashcards_delete_deck_confirm_button"

/**
 * The Flashcards deck list: "Your decks" (own, full CRUD) and "Provided decks" (Study only). A
 * verbatim-behavior port of `src/components/flashcards/DeckList.tsx` — see that file, and
 * `docs/superpowers/specs/2026-08-29-android-flashcards-research.md` §3.2, for the exact button
 * inventory this mirrors.
 */
@Composable
fun DeckListScreen(
    viewModel: FlashcardsViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    DeckListContent(
        uiState = uiState,
        onStudy = viewModel::startStudy,
        onCreateDeck = viewModel::createDeck,
        onRemoveDeck = viewModel::removeDeck,
        onAddCard = viewModel::addCard,
        onUpdateCard = viewModel::updateCard,
        onRemoveCard = viewModel::removeCard,
    )
}

@Composable
private fun DeckListContent(
    uiState: FlashcardsUiState,
    onStudy: (String) -> Unit,
    onCreateDeck: (String) -> Unit,
    onRemoveDeck: (String) -> Unit,
    onAddCard: (String, String, String) -> Unit,
    onUpdateCard: (String, String, String, String) -> Unit,
    onRemoveCard: (String, String) -> Unit,
) {
    // Declared BEFORE the loading early-return so a (now first-load-only) Loading frame can never
    // dispose this dialog-open state — defense in depth alongside FlashcardsViewModel.load() no
    // longer flashing Loading on a post-mutation reload.
    var creating by rememberSaveable { mutableStateOf(false) }
    var managingDeckId by rememberSaveable { mutableStateOf<String?>(null) }
    var deletingDeckId by rememberSaveable { mutableStateOf<String?>(null) }

    if (uiState !is FlashcardsUiState.Content) {
        Column(
            modifier = Modifier.fillMaxSize().testTag(FLASHCARDS_LOADING_TAG),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            Text(stringResource(R.string.flashcards_loading))
        }
        return
    }

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState()),
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(stringResource(R.string.flashcards_your_decks_title), style = MaterialTheme.typography.titleLarge)
            TextButton(onClick = { creating = true }, modifier = Modifier.testTag(FLASHCARDS_NEW_DECK_BUTTON_TAG)) {
                Icon(Icons.Filled.Add, contentDescription = null)
                Text(" " + stringResource(R.string.flashcards_new_deck))
            }
        }

        if (uiState.ownDecks.isEmpty()) {
            Text(
                stringResource(R.string.flashcards_no_own_decks),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 8.dp),
            )
        } else {
            uiState.ownDecks.forEach { deck ->
                DeckRow(
                    deck = deck,
                    onStudy = { onStudy(deck.id) },
                    onManage = { managingDeckId = deck.id },
                    onDelete = { deletingDeckId = deck.id },
                )
                HorizontalDivider()
            }
        }

        Text(
            stringResource(R.string.flashcards_provided_decks_title),
            style = MaterialTheme.typography.titleLarge,
            modifier = Modifier.padding(top = 24.dp),
        )
        if (uiState.providedDecks.isEmpty()) {
            Text(
                stringResource(R.string.flashcards_no_provided_decks_yet),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 8.dp),
            )
        } else {
            uiState.providedDecks.forEach { deck ->
                DeckRow(deck = deck, onStudy = { onStudy(deck.id) }, onManage = null, onDelete = null)
                HorizontalDivider()
            }
        }
    }

    if (creating) {
        CreateDeckDialog(
            onClose = { creating = false },
            onCreate = { name ->
                onCreateDeck(name)
                creating = false
            },
        )
    }

    val managingDeck = uiState.ownDecks.firstOrNull { it.id == managingDeckId }
    if (managingDeck != null) {
        ManageDeckDialog(
            deck = managingDeck,
            onClose = { managingDeckId = null },
            onAddCard = { front, back -> onAddCard(managingDeck.id, front, back) },
            onUpdateCard = { cardId, front, back -> onUpdateCard(managingDeck.id, cardId, front, back) },
            onRemoveCard = { cardId -> onRemoveCard(managingDeck.id, cardId) },
        )
    }

    val deletingDeck = uiState.ownDecks.firstOrNull { it.id == deletingDeckId }
    if (deletingDeck != null) {
        DeleteDeckDialog(
            name = deletingDeck.title,
            onClose = { deletingDeckId = null },
            onConfirm = {
                onRemoveDeck(deletingDeck.id)
                deletingDeckId = null
            },
        )
    }
}

@Composable
private fun DeckRow(
    deck: DeckSummary,
    onStudy: () -> Unit,
    onManage: (() -> Unit)?,
    onDelete: (() -> Unit)?,
) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(deck.title, style = MaterialTheme.typography.bodyLarge)
                if (deck.provided) {
                    AssistChip(onClick = {}, enabled = false, label = { Text(stringResource(R.string.flashcards_provided_chip)) })
                }
            }
            Text(
                pluralStringResource(R.plurals.flashcards_cards_count, deck.cards.size, deck.cards.size) +
                    " · " + pluralStringResource(R.plurals.flashcards_due_count, deck.dueCount, deck.dueCount) +
                    " · " + pluralStringResource(R.plurals.flashcards_new_count, deck.freshCount, deck.freshCount),
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 2.dp),
            )
        }
        if (onManage != null) {
            IconButton(onClick = onManage, modifier = Modifier.testTag(deckEditButtonTag(deck.id))) {
                Icon(Icons.Filled.Edit, contentDescription = stringResource(R.string.flashcards_edit_deck_description))
            }
        }
        if (onDelete != null) {
            IconButton(onClick = onDelete, modifier = Modifier.testTag(deckDeleteButtonTag(deck.id))) {
                Icon(Icons.Filled.Delete, contentDescription = stringResource(R.string.flashcards_delete_deck_description))
            }
        }
        Button(
            onClick = onStudy,
            enabled = deck.canStudy,
            modifier = Modifier.testTag(deckStudyButtonTag(deck.id)),
        ) {
            Icon(Icons.Filled.PlayArrow, contentDescription = null, modifier = Modifier.size(18.dp))
            Text(" " + stringResource(R.string.flashcards_study_button))
        }
    }
}

@Composable
private fun CreateDeckDialog(onClose: () -> Unit, onCreate: (String) -> Unit) {
    var name by remember { mutableStateOf("") }
    AlertDialog(
        onDismissRequest = onClose,
        title = { Text(stringResource(R.string.flashcards_new_deck)) },
        text = {
            OutlinedTextField(
                value = name,
                onValueChange = { name = it },
                label = { Text(stringResource(R.string.flashcards_deck_name_label)) },
                singleLine = true,
                modifier = Modifier.fillMaxWidth().testTag(CREATE_DECK_NAME_FIELD_TAG),
            )
        },
        confirmButton = {
            TextButton(
                onClick = { onCreate(name) },
                enabled = name.isNotBlank(),
                modifier = Modifier.testTag(CREATE_DECK_CONFIRM_BUTTON_TAG),
            ) { Text(stringResource(R.string.flashcards_create_deck_button)) }
        },
        dismissButton = { TextButton(onClick = onClose) { Text(stringResource(R.string.flashcards_cancel)) } },
    )
}

/**
 * Full CRUD on an own deck's cards: existing cards render as live-edited front/back fields (no
 * non-blank gate — matches `ManageDeckDialog.updateCard` on web) plus a per-card delete that also
 * strips that card's schedule; an "Add a card" section gates its Add button on both sides being
 * non-blank. No reorder control, matching the student's own-deck editor on web (unlike the admin
 * editor, which has one).
 */
@Composable
private fun ManageDeckDialog(
    deck: DeckSummary,
    onClose: () -> Unit,
    onAddCard: (String, String) -> Unit,
    onUpdateCard: (String, String, String) -> Unit,
    onRemoveCard: (String) -> Unit,
) {
    var newFront by remember { mutableStateOf("") }
    var newBack by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onClose,
        title = { Text(deck.title) },
        text = {
            Column(modifier = Modifier.verticalScroll(rememberScrollState())) {
                if (deck.cards.isEmpty()) {
                    Text(stringResource(R.string.flashcards_no_cards_yet), style = MaterialTheme.typography.bodyMedium)
                } else {
                    deck.cards.forEach { card -> ExistingCardRow(card, onUpdateCard, onRemoveCard) }
                }

                HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
                Text(stringResource(R.string.flashcards_add_a_card_label), style = MaterialTheme.typography.labelLarge)
                OutlinedTextField(
                    value = newFront,
                    onValueChange = { newFront = it },
                    label = { Text(stringResource(R.string.flashcards_front)) },
                    modifier = Modifier.fillMaxWidth().padding(top = 6.dp).testTag(MANAGE_DECK_ADD_FRONT_FIELD_TAG),
                )
                OutlinedTextField(
                    value = newBack,
                    onValueChange = { newBack = it },
                    label = { Text(stringResource(R.string.flashcards_back)) },
                    modifier = Modifier.fillMaxWidth().padding(top = 6.dp).testTag(MANAGE_DECK_ADD_BACK_FIELD_TAG),
                )
                TextButton(
                    onClick = {
                        onAddCard(newFront, newBack)
                        newFront = ""
                        newBack = ""
                    },
                    enabled = newFront.isNotBlank() && newBack.isNotBlank(),
                    modifier = Modifier.padding(top = 4.dp).testTag(MANAGE_DECK_ADD_BUTTON_TAG),
                ) {
                    Icon(Icons.Filled.Add, contentDescription = null)
                    Text(" " + stringResource(R.string.flashcards_add))
                }
            }
        },
        confirmButton = { TextButton(onClick = onClose) { Text(stringResource(R.string.flashcards_done)) } },
    )
}

@Composable
private fun ExistingCardRow(card: DeckCard, onUpdateCard: (String, String, String) -> Unit, onRemoveCard: (String) -> Unit) {
    Surface {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(6.dp),
        ) {
            OutlinedTextField(
                value = card.front,
                onValueChange = { onUpdateCard(card.id, it, card.back) },
                label = { Text(stringResource(R.string.flashcards_front)) },
                modifier = Modifier.weight(1f),
            )
            OutlinedTextField(
                value = card.back,
                onValueChange = { onUpdateCard(card.id, card.front, it) },
                label = { Text(stringResource(R.string.flashcards_back)) },
                modifier = Modifier.weight(1f),
            )
            IconButton(onClick = { onRemoveCard(card.id) }, modifier = Modifier.testTag(manageDeckCardDeleteTag(card.id))) {
                Icon(Icons.Filled.Delete, contentDescription = stringResource(R.string.flashcards_delete_card_description))
            }
        }
    }
}

@Composable
private fun DeleteDeckDialog(name: String, onClose: () -> Unit, onConfirm: () -> Unit) {
    AlertDialog(
        onDismissRequest = onClose,
        title = { Text(stringResource(R.string.flashcards_delete_deck_title)) },
        text = { Text(stringResource(R.string.flashcards_delete_deck_body_format, name)) },
        confirmButton = {
            TextButton(onClick = onConfirm, modifier = Modifier.testTag(DELETE_DECK_CONFIRM_BUTTON_TAG)) {
                Text(stringResource(R.string.flashcards_delete))
            }
        },
        dismissButton = { TextButton(onClick = onClose) { Text(stringResource(R.string.flashcards_cancel)) } },
    )
}
