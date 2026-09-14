package com.synapse.app.core.party

import com.synapse.app.core.minigames.Grid
import com.synapse.app.core.minigames.MatchBoard
import com.synapse.app.core.minigames.MiniGameKind
import com.synapse.app.core.minigames.OrderedMiniGamePack
import com.synapse.app.core.minigames.RedFlagLane
import com.synapse.app.core.minigames.RedFlagSortPack
import com.synapse.app.core.minigames.SpotterGame
import com.synapse.app.core.minigames.normalizeTermGridAnswer
import com.synapse.app.core.minigames.validateMiniGamePack

/**
 * Server-authoritative party game synchronization rules, ported 1:1 from
 * web's `src/data/partyGameSync.ts` (test vectors mirrored in
 * `PartyGameSyncTest.kt`). Deliberately pure: no Android framework, no
 * network, no clock except the caller-provided timestamp — same discipline
 * as `core/minigames`'s own ports.
 *
 * The content builders below reuse `core/minigames`'s pure pack/board/grid
 * logic exactly as the web module reuses `crossword.ts`/`spotter.ts`/
 * `termMatch.ts`/`minigamePacks.ts` — no round content here is invented.
 *
 * IMPORTANT — this module is not the one on Android's network path. The
 * deployed server (`server/src/partyGames.js`, `applyActionToPartyGame`) runs
 * a second, simpler state machine: every current party member is seeded into
 * a game's `participants` map at creation time, so there is no client-sent
 * `join` action in production and a participant's username is never
 * client-supplied. `PartyApi`/`feature/party/PartyGamesRepository` target
 * *that* deployed machine and its actual action set (reconnect / leave /
 * start / submit_answer / next_round / end). This module exists because the
 * task explicitly mandates a 1:1 port of the pure reference module with its
 * test vectors — it still includes `join` because the ported source does.
 */

enum class PartyGameKind { TERM_GRID, SPOTTER, TERM_MATCH, CLINICAL_SEQUENCE, MECHANISM_CHAIN, RED_FLAG_SORT }

enum class PartyGameStatus { LOBBY, IN_ROUND, BETWEEN_ROUNDS, COMPLETED }

enum class PartyGameScoring { CHOICE, NORMALIZED_TEXT, ORDERED_EXACT_POSITIONS }

/** Mirrors TS's `PartyAnswerValue = string | string[] | Record<string, string>`. */
sealed interface PartyAnswerValue {
    data class Text(val value: String) : PartyAnswerValue
    data class Ordered(val value: List<String>) : PartyAnswerValue
    data class Mapped(val value: Map<String, String>) : PartyAnswerValue
}

/** A round's answer key: a single string (choice/text rounds) or an ordered list (ordered rounds). */
sealed interface PartyAnswerKey {
    data class Single(val value: String) : PartyAnswerKey
    data class Ordered(val value: List<String>) : PartyAnswerKey
}

data class PartyGameChoice(val id: String, val label: String, val lang: String? = null, val dir: String? = null)

/** `kind` is "authored" or "published" — see [ensureAuthoredContent]. */
data class PartyGameContentSource(val kind: String, val id: String, val label: String)

data class PartyGameRound(
    val id: String,
    val index: Int,
    val prompt: String,
    val choices: List<PartyGameChoice>,
    val answerKey: PartyAnswerKey,
    val maxPoints: Int,
    val scoring: PartyGameScoring,
    val payload: Map<String, Any?> = emptyMap(),
)

data class PartyGameContent(
    val kind: PartyGameKind,
    val title: String,
    val source: PartyGameContentSource,
    val rounds: List<PartyGameRound>,
    /** Always true for content built by the functions below; a test-only knob to exercise [ensureAuthoredContent]'s refusal. */
    val authoredOnly: Boolean = true,
)

data class PartyGameParticipant(
    val id: String,
    val username: String,
    val profileIcon: String? = null,
    val connected: Boolean,
    val joinedAt: String,
    val lastSeenAt: String,
)

data class PartyGameRoundAnswer(
    val participantId: String,
    val roundId: String,
    val answer: PartyAnswerValue,
    val correct: Boolean,
    val points: Int,
    val maxPoints: Int,
    val answeredAt: String,
)

data class PartyGameSession(
    val id: String,
    val partyId: String,
    val hostId: String,
    val kind: PartyGameKind,
    val status: PartyGameStatus,
    val content: PartyGameContent,
    val participants: Map<String, PartyGameParticipant>,
    val currentRoundIndex: Int,
    val answersByRound: Map<String, Map<String, PartyGameRoundAnswer>>,
    val scores: Map<String, Int>,
    val version: Int,
    val createdAt: String,
    val updatedAt: String,
    val completedAt: String? = null,
)

data class PartyGameActor(val id: String, val partyId: String)

data class JoinParticipant(val id: String, val username: String, val profileIcon: String? = null)

sealed interface PartyGameAction {
    data class Join(val participant: JoinParticipant) : PartyGameAction
    data object Leave : PartyGameAction
    data object Reconnect : PartyGameAction
    data object Start : PartyGameAction
    data class SubmitAnswer(val roundId: String, val answer: PartyAnswerValue) : PartyGameAction
    data object NextRound : PartyGameAction
    data object End : PartyGameAction
}

enum class PartyGameEventType {
    PARTICIPANT_JOINED, PARTICIPANT_LEFT, PARTICIPANT_RECONNECTED,
    GAME_STARTED, ROUND_STARTED, ANSWER_RECORDED, SCORE_CHANGED, GAME_COMPLETED,
}

/** An [PartyGameRoundAnswer] with the submitted `answer` stripped — what [redactPartyGameEvent] emits publicly. */
data class RedactedRoundAnswer(
    val participantId: String,
    val roundId: String,
    val correct: Boolean,
    val points: Int,
    val maxPoints: Int,
    val answeredAt: String,
)

sealed interface PartyGameEventPayload {
    data class ParticipantJoined(val participant: PartyGameParticipant) : PartyGameEventPayload
    data class ParticipantId(val participantId: String) : PartyGameEventPayload
    data class RoundIndex(val roundIndex: Int) : PartyGameEventPayload
    data class AnswerRecorded(val answer: PartyGameRoundAnswer) : PartyGameEventPayload
    data class AnswerRecordedRedacted(val answer: RedactedRoundAnswer) : PartyGameEventPayload
    data class ScoreChanged(val scores: Map<String, Int>) : PartyGameEventPayload
    data class GameCompleted(val scores: Map<String, Int>) : PartyGameEventPayload
}

data class PartyGameEventRecord(
    val id: String,
    val sequence: Int,
    val partyId: String,
    val gameId: String,
    val type: PartyGameEventType,
    val actorId: String,
    val createdAt: String,
    val payload: PartyGameEventPayload,
)

data class PublicPartyGameRound(
    val id: String,
    val index: Int,
    val prompt: String,
    val choices: List<PartyGameChoice>,
    val maxPoints: Int,
    val scoring: PartyGameScoring,
    val payload: Map<String, Any?> = emptyMap(),
)

data class PublicPartyGameEvent(val event: PartyGameEventRecord, val publicState: PartyGamePublicState? = null)

data class PartyGamePublicState(
    val id: String,
    val partyId: String,
    val hostId: String,
    val kind: PartyGameKind,
    val status: PartyGameStatus,
    val title: String,
    val source: PartyGameContentSource,
    val participants: Map<String, PartyGameParticipant>,
    val currentRoundIndex: Int,
    val roundCount: Int,
    val currentRound: PublicPartyGameRound?,
    val answeredParticipantIds: List<String>,
    val scores: Map<String, Int>,
    val version: Int,
    val updatedAt: String,
    val completedAt: String? = null,
)

/**
 * A frame this port would hand to an SSE transport, as web's
 * `toPartyGameSseMessage` does. Web serializes [event] to a JSON string for
 * the wire; nothing on Android talks SSE (see this file's class doc), so this
 * port keeps the event as data rather than adding a JSON dependency purely to
 * round-trip a string nothing reads.
 */
data class PartyGameSseMessage(val eventType: PartyGameEventType, val id: String, val event: PublicPartyGameEvent)

class PartyGameRuleError(val code: String, message: String) : Exception(message)

private fun ruleAssert(condition: Boolean, code: String, message: String) {
    if (!condition) throw PartyGameRuleError(code, message)
}

private fun ensureAuthoredContent(content: PartyGameContent) {
    ruleAssert(content.authoredOnly, "synthetic_content_refused", "Party games can only use validated authored or published content.")
    ruleAssert(
        content.source.kind == "authored" || content.source.kind == "published",
        "synthetic_content_refused",
        "Party content source must be authored or published.",
    )
    ruleAssert(content.rounds.isNotEmpty(), "empty_content", "Party games need at least one round.")
    for (round in content.rounds) {
        ruleAssert(round.prompt.isNotBlank(), "invalid_round", "${round.id}: prompt is required.")
        ruleAssert(round.maxPoints > 0, "invalid_round", "${round.id}: maxPoints must be positive.")
    }
}

private fun assertSameParty(session: PartyGameSession, actor: PartyGameActor) {
    ruleAssert(actor.partyId == session.partyId, "wrong_party", "Action actor is not in this party.")
}

private fun assertMember(session: PartyGameSession, actor: PartyGameActor) {
    assertSameParty(session, actor)
    ruleAssert(session.participants.containsKey(actor.id), "not_party_member", "Only party members can act on this game.")
}

private fun assertHost(session: PartyGameSession, actor: PartyGameActor) {
    assertMember(session, actor)
    ruleAssert(actor.id == session.hostId, "host_required", "Only the host can control the party game.")
}

private fun currentRound(session: PartyGameSession): PartyGameRound? = session.content.rounds.getOrNull(session.currentRoundIndex)

private fun compareText(a: String, b: String): Boolean = a.trim().lowercase() == b.trim().lowercase()

private data class Scored(val correct: Boolean, val points: Int, val maxPoints: Int)

private fun scoreAnswer(round: PartyGameRound, answer: PartyAnswerValue): Scored {
    if (round.scoring == PartyGameScoring.ORDERED_EXACT_POSITIONS) {
        val expected = (round.answerKey as? PartyAnswerKey.Ordered)?.value
            ?: throw PartyGameRuleError("invalid_answer_key", "${round.id}: ordered rounds require an ordered key.")
        val submitted = (answer as? PartyAnswerValue.Ordered)?.value
            ?: throw PartyGameRuleError("invalid_answer", "Submit the ordered item ids as an array.")
        var points = 0
        for (i in expected.indices) if (submitted.getOrNull(i) == expected[i]) points++
        return Scored(correct = points == expected.size && submitted.size == expected.size, points = points, maxPoints = expected.size)
    }

    val key = (round.answerKey as? PartyAnswerKey.Single)?.value
        ?: throw PartyGameRuleError("invalid_answer_key", "${round.id}: choice/text rounds require a string key.")
    val submitted = (answer as? PartyAnswerValue.Text)?.value
        ?: throw PartyGameRuleError("invalid_answer", "Submit a single answer for this round.")
    val correct = if (round.scoring == PartyGameScoring.NORMALIZED_TEXT) {
        normalizeTermGridAnswer(submitted) == normalizeTermGridAnswer(key)
    } else {
        compareText(submitted, key)
    }
    return Scored(correct, if (correct) round.maxPoints else 0, round.maxPoints)
}

private fun createEvent(
    session: PartyGameSession,
    actorId: String,
    type: PartyGameEventType,
    payload: PartyGameEventPayload,
    createdAt: String,
): PartyGameEventRecord {
    val sequence = session.version + 1
    return PartyGameEventRecord(
        id = "${session.id}:$sequence",
        sequence = sequence,
        partyId = session.partyId,
        gameId = session.id,
        type = type,
        actorId = actorId,
        createdAt = createdAt,
        payload = payload,
    )
}

private fun applyEvent(session: PartyGameSession, event: PartyGameEventRecord): PartyGameSession {
    val base = session.copy(version = event.sequence, updatedAt = event.createdAt)
    return when (event.type) {
        PartyGameEventType.PARTICIPANT_JOINED -> {
            val participant = (event.payload as PartyGameEventPayload.ParticipantJoined).participant
            base.copy(
                participants = base.participants + (participant.id to participant),
                scores = if (base.scores.containsKey(participant.id)) base.scores else base.scores + (participant.id to 0),
            )
        }
        PartyGameEventType.PARTICIPANT_LEFT -> {
            val id = (event.payload as PartyGameEventPayload.ParticipantId).participantId
            val existing = base.participants[id] ?: return base
            base.copy(participants = base.participants + (id to existing.copy(connected = false, lastSeenAt = event.createdAt)))
        }
        PartyGameEventType.PARTICIPANT_RECONNECTED -> {
            val id = (event.payload as PartyGameEventPayload.ParticipantId).participantId
            val existing = base.participants[id] ?: return base
            base.copy(participants = base.participants + (id to existing.copy(connected = true, lastSeenAt = event.createdAt)))
        }
        PartyGameEventType.GAME_STARTED -> base.copy(status = PartyGameStatus.IN_ROUND, currentRoundIndex = 0)
        PartyGameEventType.ROUND_STARTED -> {
            val index = (event.payload as PartyGameEventPayload.RoundIndex).roundIndex
            base.copy(status = PartyGameStatus.IN_ROUND, currentRoundIndex = index)
        }
        PartyGameEventType.ANSWER_RECORDED -> {
            val answer = (event.payload as PartyGameEventPayload.AnswerRecorded).answer
            val forRound = (base.answersByRound[answer.roundId] ?: emptyMap()) + (answer.participantId to answer)
            base.copy(answersByRound = base.answersByRound + (answer.roundId to forRound))
        }
        PartyGameEventType.SCORE_CHANGED -> {
            val scores = (event.payload as PartyGameEventPayload.ScoreChanged).scores
            base.copy(scores = scores, status = PartyGameStatus.BETWEEN_ROUNDS)
        }
        PartyGameEventType.GAME_COMPLETED -> base.copy(status = PartyGameStatus.COMPLETED, completedAt = event.createdAt)
    }
}

private fun addEvent(
    events: MutableList<PartyGameEventRecord>,
    session: PartyGameSession,
    actorId: String,
    type: PartyGameEventType,
    payload: PartyGameEventPayload,
    createdAt: String,
): PartyGameSession {
    val event = createEvent(session, actorId, type, payload, createdAt)
    events += event
    return applyEvent(session, event)
}

data class PartyGameHost(val id: String, val username: String, val profileIcon: String? = null)

fun createPartyGameSession(
    id: String,
    partyId: String,
    hostId: String,
    content: PartyGameContent,
    host: PartyGameHost,
    now: String,
): PartyGameSession {
    ensureAuthoredContent(content)
    ruleAssert(host.id == hostId, "host_mismatch", "The initial host must match hostId.")
    val hostParticipant = PartyGameParticipant(
        id = host.id, username = host.username, profileIcon = host.profileIcon,
        connected = true, joinedAt = now, lastSeenAt = now,
    )
    return PartyGameSession(
        id = id, partyId = partyId, hostId = hostId, kind = content.kind, status = PartyGameStatus.LOBBY,
        content = content, participants = mapOf(hostParticipant.id to hostParticipant), currentRoundIndex = 0,
        answersByRound = emptyMap(), scores = mapOf(hostParticipant.id to 0), version = 0, createdAt = now, updatedAt = now,
    )
}

data class PartyGameActionResult(val session: PartyGameSession, val events: List<PartyGameEventRecord>)

fun applyPartyGameAction(
    session: PartyGameSession,
    actor: PartyGameActor,
    action: PartyGameAction,
    now: String,
): PartyGameActionResult {
    val events = mutableListOf<PartyGameEventRecord>()

    val result = when (action) {
        is PartyGameAction.Join -> {
            assertSameParty(session, actor)
            ruleAssert(actor.id == action.participant.id, "actor_mismatch", "A member can only join as themselves.")
            ruleAssert(session.status == PartyGameStatus.LOBBY, "game_already_started", "New members can only join while the game is in the lobby.")
            val existing = session.participants[actor.id]
            val participant = if (existing != null) {
                existing.copy(username = action.participant.username, profileIcon = action.participant.profileIcon, connected = true, lastSeenAt = now)
            } else {
                PartyGameParticipant(action.participant.id, action.participant.username, action.participant.profileIcon, connected = true, joinedAt = now, lastSeenAt = now)
            }
            addEvent(events, session, actor.id, PartyGameEventType.PARTICIPANT_JOINED, PartyGameEventPayload.ParticipantJoined(participant), now)
        }

        PartyGameAction.Leave -> {
            assertMember(session, actor)
            addEvent(events, session, actor.id, PartyGameEventType.PARTICIPANT_LEFT, PartyGameEventPayload.ParticipantId(actor.id), now)
        }

        PartyGameAction.Reconnect -> {
            assertMember(session, actor)
            addEvent(events, session, actor.id, PartyGameEventType.PARTICIPANT_RECONNECTED, PartyGameEventPayload.ParticipantId(actor.id), now)
        }

        PartyGameAction.Start -> {
            assertHost(session, actor)
            ruleAssert(session.status == PartyGameStatus.LOBBY, "invalid_state", "Only lobby games can start.")
            addEvent(events, session, actor.id, PartyGameEventType.GAME_STARTED, PartyGameEventPayload.RoundIndex(0), now)
        }

        is PartyGameAction.SubmitAnswer -> {
            assertMember(session, actor)
            ruleAssert(session.status == PartyGameStatus.IN_ROUND, "invalid_state", "Answers are only accepted during an active round.")
            val round = currentRound(session) ?: throw PartyGameRuleError("round_missing", "The active round is missing.")
            ruleAssert(action.roundId == round.id, "wrong_round", "Answer submitted for a round that is not active.")
            ruleAssert(session.answersByRound[round.id]?.get(actor.id) == null, "duplicate_answer", "A member can answer a round once.")
            val scored = scoreAnswer(round, action.answer)
            val recorded = PartyGameRoundAnswer(actor.id, round.id, action.answer, scored.correct, scored.points, scored.maxPoints, now)
            val afterAnswer = addEvent(events, session, actor.id, PartyGameEventType.ANSWER_RECORDED, PartyGameEventPayload.AnswerRecorded(recorded), now)
            val scores = afterAnswer.scores + (actor.id to ((afterAnswer.scores[actor.id] ?: 0) + recorded.points))
            addEvent(events, afterAnswer, actor.id, PartyGameEventType.SCORE_CHANGED, PartyGameEventPayload.ScoreChanged(scores), now)
        }

        PartyGameAction.NextRound -> {
            assertHost(session, actor)
            ruleAssert(
                session.status == PartyGameStatus.BETWEEN_ROUNDS || session.status == PartyGameStatus.IN_ROUND,
                "invalid_state",
                "There is no round to advance.",
            )
            val nextIndex = session.currentRoundIndex + 1
            if (nextIndex >= session.content.rounds.size) {
                addEvent(events, session, actor.id, PartyGameEventType.GAME_COMPLETED, PartyGameEventPayload.GameCompleted(session.scores), now)
            } else {
                addEvent(events, session, actor.id, PartyGameEventType.ROUND_STARTED, PartyGameEventPayload.RoundIndex(nextIndex), now)
            }
        }

        PartyGameAction.End -> {
            assertHost(session, actor)
            addEvent(events, session, actor.id, PartyGameEventType.GAME_COMPLETED, PartyGameEventPayload.GameCompleted(session.scores), now)
        }
    }

    return PartyGameActionResult(result, events)
}

fun replayPartyGameEvents(initial: PartyGameSession, events: List<PartyGameEventRecord>): PartyGameSession =
    events.sortedBy { it.sequence }.fold(initial) { session, event -> applyEvent(session, event) }

fun redactPartyGameSession(session: PartyGameSession): PartyGamePublicState {
    val round = currentRound(session)
    val publicRound = round?.let {
        PublicPartyGameRound(it.id, it.index, it.prompt, it.choices, it.maxPoints, it.scoring, it.payload)
    }
    val roundId = round?.id
    return PartyGamePublicState(
        id = session.id, partyId = session.partyId, hostId = session.hostId, kind = session.kind, status = session.status,
        title = session.content.title, source = session.content.source, participants = session.participants,
        currentRoundIndex = session.currentRoundIndex, roundCount = session.content.rounds.size, currentRound = publicRound,
        answeredParticipantIds = roundId?.let { session.answersByRound[it]?.keys?.toList() } ?: emptyList(),
        scores = session.scores, version = session.version, updatedAt = session.updatedAt, completedAt = session.completedAt,
    )
}

fun redactPartyGameEvent(event: PartyGameEventRecord, publicState: PartyGamePublicState? = null): PublicPartyGameEvent {
    val payload = if (event.type == PartyGameEventType.ANSWER_RECORDED) {
        val answer = (event.payload as PartyGameEventPayload.AnswerRecorded).answer
        PartyGameEventPayload.AnswerRecordedRedacted(
            RedactedRoundAnswer(answer.participantId, answer.roundId, answer.correct, answer.points, answer.maxPoints, answer.answeredAt),
        )
    } else {
        event.payload
    }
    return PublicPartyGameEvent(event = event.copy(payload = payload), publicState = publicState)
}

fun toPartyGameSseMessage(event: PublicPartyGameEvent): PartyGameSseMessage =
    PartyGameSseMessage(eventType = event.event.type, id = event.event.id, event = event)

// --- Content builders — reuse core/minigames's pure pack/board/grid logic; no round content is invented here. ---

fun partyContentFromTermGrid(grid: Grid, source: PartyGameContentSource, title: String = "Term Grid party"): PartyGameContent =
    PartyGameContent(
        kind = PartyGameKind.TERM_GRID,
        title = title,
        source = source,
        rounds = grid.words.mapIndexed { index, word ->
            PartyGameRound(
                id = "term-grid:${word.number}:${word.direction}",
                index = index,
                prompt = word.clue,
                choices = emptyList(),
                answerKey = PartyAnswerKey.Single(word.term),
                maxPoints = 1,
                scoring = PartyGameScoring.NORMALIZED_TEXT,
                payload = mapOf("clueNumber" to word.number, "direction" to word.direction.name, "row" to word.row, "column" to word.column),
            )
        },
    )

fun partyContentFromSpotter(game: SpotterGame, source: PartyGameContentSource, title: String = "Spotter party"): PartyGameContent =
    PartyGameContent(
        kind = PartyGameKind.SPOTTER,
        title = title,
        source = source,
        rounds = game.rounds.mapIndexed { index, round ->
            PartyGameRound(
                id = "spotter:${round.termId}",
                index = index,
                prompt = round.prompt,
                choices = round.options.map { PartyGameChoice(id = it, label = it) },
                answerKey = PartyAnswerKey.Single(round.answer),
                maxPoints = 1,
                scoring = PartyGameScoring.CHOICE,
                payload = mapOf("termId" to round.termId, "category" to round.category),
            )
        },
    )

fun partyContentFromTermMatch(board: MatchBoard, source: PartyGameContentSource, title: String = "Term Match party"): PartyGameContent =
    PartyGameContent(
        kind = PartyGameKind.TERM_MATCH,
        title = title,
        source = source,
        rounds = board.termTiles.mapIndexed { index, term ->
            PartyGameRound(
                id = "term-match:${term.pairId}",
                index = index,
                prompt = term.text,
                choices = board.partnerTiles.map { partner ->
                    PartyGameChoice(
                        id = partner.pairId,
                        label = partner.text,
                        lang = if (partner.arabic) "ar" else null,
                        dir = if (partner.arabic) "rtl" else null,
                    )
                },
                answerKey = PartyAnswerKey.Single(term.pairId),
                maxPoints = 1,
                scoring = PartyGameScoring.CHOICE,
                payload = mapOf("mode" to board.mode.name, "termTileId" to term.id),
            )
        },
    )

fun partyContentFromOrderedMiniGamePack(
    pack: OrderedMiniGamePack,
    source: PartyGameContentSource = PartyGameContentSource("authored", pack.id, pack.source.label),
): PartyGameContent {
    val errors = validateMiniGamePack(pack)
    ruleAssert(errors.isEmpty(), "invalid_authored_pack", errors.joinToString("; "))
    val kind = if (pack.kind == MiniGameKind.CLINICAL_SEQUENCE) PartyGameKind.CLINICAL_SEQUENCE else PartyGameKind.MECHANISM_CHAIN
    val kindTag = if (kind == PartyGameKind.CLINICAL_SEQUENCE) "clinical-sequence" else "mechanism-chain"
    return PartyGameContent(
        kind = kind,
        title = pack.title,
        source = source,
        rounds = listOf(
            PartyGameRound(
                id = "$kindTag:${pack.id}",
                index = 0,
                prompt = pack.prompt,
                choices = pack.steps.map { PartyGameChoice(id = it.id, label = it.text) },
                answerKey = PartyAnswerKey.Ordered(pack.steps.map { it.id }),
                maxPoints = pack.steps.size,
                scoring = PartyGameScoring.ORDERED_EXACT_POSITIONS,
                payload = mapOf("packId" to pack.id, "topic" to pack.topic, "subjectId" to pack.subjectId, "explanation" to pack.explanation),
            ),
        ),
    )
}

fun partyContentFromRedFlagSortPack(
    pack: RedFlagSortPack,
    source: PartyGameContentSource = PartyGameContentSource("authored", pack.id, pack.source.label),
): PartyGameContent {
    val errors = validateMiniGamePack(pack)
    ruleAssert(errors.isEmpty(), "invalid_authored_pack", errors.joinToString("; "))
    return PartyGameContent(
        kind = PartyGameKind.RED_FLAG_SORT,
        title = pack.title,
        source = source,
        rounds = pack.findings.mapIndexed { index, finding ->
            PartyGameRound(
                id = "red-flag-sort:${pack.id}:${finding.id}",
                index = index,
                prompt = finding.text,
                choices = listOf(
                    PartyGameChoice(id = "urgent", label = pack.lanes.getValue(RedFlagLane.URGENT)),
                    PartyGameChoice(id = "routine", label = pack.lanes.getValue(RedFlagLane.ROUTINE)),
                ),
                answerKey = PartyAnswerKey.Single(finding.lane.name.lowercase()),
                maxPoints = 1,
                scoring = PartyGameScoring.CHOICE,
                payload = mapOf("packId" to pack.id, "findingId" to finding.id, "topic" to pack.topic, "subjectId" to pack.subjectId),
            )
        },
    )
}
