package com.synapse.app.feature.flashcards

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.flashcards.CardSchedule
import com.synapse.app.core.flashcards.CardState
import com.synapse.app.core.flashcards.DeckCard
import com.synapse.app.core.flashcards.StoredDeck
import com.synapse.app.core.flashcards.StudyCard
import com.synapse.app.core.flashcards.dueQueue
import com.synapse.app.core.flashcards.isDue
import com.synapse.app.core.flashcards.newCard
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject
import kotlin.random.Random

/**
 * One row of either deck list panel. [subjectId] is only ever populated for [provided] decks —
 * a self-authored [StoredDeck] carries no subject of its own, matching the web
 * (`DeckList.startStudy` passes `subjectId: ''` for an own deck).
 */
data class DeckSummary(
    val id: String,
    val title: String,
    val subjectId: String,
    val cards: List<DeckCard>,
    val dueCount: Int,
    val freshCount: Int,
    val provided: Boolean,
) {
    /** The Study button is disabled when a deck has nothing due and nothing new to show. */
    val canStudy: Boolean get() = dueCount > 0 || freshCount > 0
}

/** What [DeckListScreen] renders. */
sealed interface FlashcardsUiState {
    data object Loading : FlashcardsUiState
    data class Content(
        val ownDecks: List<DeckSummary>,
        val providedDecks: List<DeckSummary>,
    ) : FlashcardsUiState
}

/**
 * Drives [DeckListScreen]: loads the provided-deck catalogue and the student's own decks,
 * computes each deck's due/new counts, and owns full CRUD over the student's own decks
 * ([createDeck]/[addCard]/[updateCard]/[removeCard]/[removeDeck]) — all a thin pass-through to
 * [FlashcardsRepository], reloading afterward so [uiState] always reflects the latest write.
 *
 * [startStudy] resolves a deck for study and publishes [studyStart] — a one-shot event
 * [FlashcardsRoot] reacts to, exactly the shape
 * [com.synapse.app.feature.qbank.QuestionBankViewModel.sessionStart] uses. It does the *heavy*
 * work (repository reads, the provided→own mirror-on-study upsert, and snapshotting the
 * [dueQueue] once) so [CardRunnerViewModel] itself only needs the narrow [GradeSink] seam to stay
 * unit-testable without a real [FlashcardsRepository].
 */
@HiltViewModel
class FlashcardsViewModel @Inject constructor(
    private val repository: FlashcardsRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<FlashcardsUiState>(FlashcardsUiState.Loading)
    val uiState: StateFlow<FlashcardsUiState> = _uiState.asStateFlow()

    private val _studyStart = MutableStateFlow<StudyStart?>(null)
    val studyStart: StateFlow<StudyStart?> = _studyStart.asStateFlow()

    init {
        load()
    }

    /**
     * (Re)computes [uiState]. [Loading][FlashcardsUiState.Loading] is emitted only for the very
     * first load, while there is nothing on screen yet — a post-mutation reload (every CRUD op
     * ends here) recomputes [Content][FlashcardsUiState.Content] in place, so an open dialog and
     * the deck list never flash away to a loading state mid-edit (a `Loading` frame would unmount
     * `DeckListContent` and dispose its dialog-open state — closing `ManageDeckDialog` on every
     * keystroke).
     */
    fun load() {
        viewModelScope.launch {
            if (_uiState.value !is FlashcardsUiState.Content) {
                _uiState.value = FlashcardsUiState.Loading
            }
            _uiState.value = buildContent()
        }
    }

    private suspend fun buildContent(): FlashcardsUiState.Content {
        val instant = now()
        val own = repository.ownDecks()
        val provided = repository.providedDecks()

        val ownEntries = own.values
            .filter { it.sourceId == null }
            .sortedByDescending { it.id }
            .map { deck -> deckSummary(deck.id, deck.name, subjectId = "", deck.cards, deck.schedules, provided = false, instant) }

        val providedEntries = provided.map { deck ->
            val mirror = own[deck.id]?.takeIf { it.sourceId == deck.id }
            deckSummary(deck.id, deck.title, deck.subjectId, deck.cards, mirror?.schedules.orEmpty(), provided = true, instant)
        }

        return FlashcardsUiState.Content(ownEntries, providedEntries)
    }

    /**
     * due = a scheduled, non-new card that [isDue]; fresh = a `New`-state card or one with no
     * schedule yet at all. A verbatim port of `counts()` in `src/components/flashcards/DeckList.tsx`.
     */
    private fun deckSummary(
        id: String,
        title: String,
        subjectId: String,
        cards: List<DeckCard>,
        schedules: Map<String, CardSchedule>,
        provided: Boolean,
        now: Instant,
    ): DeckSummary {
        var due = 0
        var fresh = 0
        for (card in cards) {
            val schedule = schedules[card.id]
            if (schedule == null || schedule.state == CardState.New) {
                fresh++
            } else if (isDue(schedule, now)) {
                due++
            }
        }
        return DeckSummary(id, title, subjectId, cards, due, fresh, provided)
    }

    /** Creates a new, empty own deck. A no-op if [name] is blank. */
    fun createDeck(name: String) {
        val trimmed = name.trim()
        if (trimmed.isBlank()) return
        viewModelScope.launch {
            val instant = now()
            val deck = StoredDeck(id = mintId("deck", instant), name = trimmed, cards = emptyList(), createdAt = instant.toString())
            repository.saveDeck(instant, deck)
            load()
        }
    }

    fun removeDeck(deckId: String) {
        viewModelScope.launch {
            repository.removeDeck(now(), deckId)
            load()
        }
    }

    /** Adds a card to an own deck. A no-op if either [front] or [back] is blank. */
    fun addCard(deckId: String, front: String, back: String) {
        val trimmedFront = front.trim()
        val trimmedBack = back.trim()
        if (trimmedFront.isBlank() || trimmedBack.isBlank()) return
        viewModelScope.launch {
            val instant = now()
            val card = DeckCard(id = mintId("card", instant), front = trimmedFront, back = trimmedBack)
            repository.updateOwnDecks(instant) { decks ->
                val deck = decks[deckId] ?: return@updateOwnDecks decks
                decks + (deckId to deck.copy(cards = deck.cards + card))
            }
            load()
        }
    }

    /**
     * Live-edits one card's text, unvalidated — mirrors `ManageDeckDialog`'s per-keystroke
     * `updateCard`, which writes whatever is typed (including transiently blank) rather than
     * gating on non-blank the way [addCard] does.
     */
    fun updateCard(deckId: String, cardId: String, front: String, back: String) {
        viewModelScope.launch {
            repository.updateOwnDecks(now()) { decks ->
                val deck = decks[deckId] ?: return@updateOwnDecks decks
                decks + (deckId to deck.copy(cards = deck.cards.map { if (it.id == cardId) it.copy(front = front, back = back) else it }))
            }
            load()
        }
    }

    /** Deletes one card from an own deck, and strips its schedule entry along with it. */
    fun removeCard(deckId: String, cardId: String) {
        viewModelScope.launch {
            repository.updateOwnDecks(now()) { decks ->
                val deck = decks[deckId] ?: return@updateOwnDecks decks
                decks + (deckId to deck.copy(cards = deck.cards.filterNot { it.id == cardId }, schedules = deck.schedules - cardId))
            }
            load()
        }
    }

    /**
     * Resolves [deckId] for study, snapshots its due queue once, and publishes [studyStart].
     *
     * A *provided* deck is mirrored into the student's own decks on every study start —
     * `cards` refreshed from the current catalogue, `schedules` carried over from any existing
     * mirror — per `DeckList.startStudy` on web. An *own* deck (no `sourceId`) runs directly, with
     * no mirror step.
     */
    fun startStudy(deckId: String) {
        viewModelScope.launch {
            val instant = now()
            val own = repository.ownDecks()
            val resolved = own[deckId]?.takeIf { it.sourceId == null }
                ?: mirrorProvidedDeck(deckId, own, instant)
                ?: return@launch

            val dailyCounts = repository.dailyCounts(instant)
            val studyCards = resolved.cards.map { card ->
                StudyCard(id = card.id, schedule = resolved.schedules[card.id] ?: newCard(instant))
            }
            // Snapshotted once, here, at study start — never re-derived mid-session. See
            // StudySession's doc comment for why CardRunnerViewModel must not recompute this.
            val queue = dueQueue(studyCards, instant, seenToday = dailyCounts)
            val session = StudySession(resolved.id, resolved.name, queue, resolved.cards.associateBy { it.id })
            _studyStart.value = StudyStart(session, sessionId = mintId("cards", instant))
        }
    }

    private suspend fun mirrorProvidedDeck(deckId: String, own: Map<String, StoredDeck>, now: Instant): StoredDeck? {
        val provided = repository.providedDecks().firstOrNull { it.id == deckId } ?: return null
        val mirror = own[deckId]?.takeIf { it.sourceId == deckId }
        val merged = StoredDeck(
            id = provided.id,
            name = provided.title,
            sourceId = provided.id,
            cards = provided.cards,
            schedules = mirror?.schedules.orEmpty(),
            createdAt = mirror?.createdAt ?: now.toString(),
        )
        repository.saveDeck(now, merged)
        return merged
    }

    /** Acknowledges the current [studyStart] event so it doesn't re-fire on recomposition. */
    fun consumeStudyStart() {
        _studyStart.value = null
    }
}

private const val ID_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789"

/** `"$prefix-" + base36(now) + "-" + 5 random [a-z0-9] chars`, mirroring `core/qbank/QBankSessionId`. */
private fun mintId(prefix: String, now: Instant, random: Random = Random.Default): String {
    val suffix = buildString { repeat(5) { append(ID_ALPHABET[random.nextInt(ID_ALPHABET.length)]) } }
    return "$prefix-${now.toEpochMilli().toString(36)}-$suffix"
}
