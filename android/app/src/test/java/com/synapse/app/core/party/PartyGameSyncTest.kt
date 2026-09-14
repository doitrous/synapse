package com.synapse.app.core.party

import com.synapse.app.core.minigames.GridTerm
import com.synapse.app.core.minigames.MiniGameKind
import com.synapse.app.core.minigames.OrderedMiniGamePack
import com.synapse.app.core.minigames.RedFlagSortPack
import com.synapse.app.core.minigames.buildGrid
import com.synapse.app.core.minigames.buildMatchBoard
import com.synapse.app.core.minigames.buildSpotterGame
import com.synapse.app.core.minigames.validMiniGamePacks
import com.synapse.app.core.minigames.MatchMode
import com.synapse.app.core.taxonomy.TaxonomyTerm
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertThrows
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Ported from web's `src/data/partyGameSync.test.ts`, same assertions, same
 * shape of fixtures — adapted only where Android's own `core/minigames` port
 * already diverges from web's (Spotter is glossary-term-based here, not
 * histology-slide-based; see `Spotter.kt`'s class doc), and where a
 * JS-runtime "does this field exist" check becomes a Kotlin type check (the
 * public round/event types simply have no `answerKey`/`answer` property to
 * carry, so there is nothing to assert away — see the notes below).
 */
class PartyGameSyncTest {

    private val now = "2026-08-24T10:00:00.000Z"
    private val later = "2026-08-24T10:01:00.000Z"
    private val partyId = "party-1"
    private val host = PartyGameActor("host-1", partyId)
    private val guest = PartyGameActor("guest-1", partyId)
    private val source = PartyGameContentSource("authored", "fixture", "Authored fixture")

    private fun baseSession(content: PartyGameContent): PartyGameSession =
        createPartyGameSession(
            id = "game-1",
            partyId = partyId,
            hostId = host.id,
            host = PartyGameHost(host.id, "host"),
            content = content,
            now = now,
        )

    /** Same fixture `TermGridTest` uses — known to interlock past [com.synapse.app.core.minigames.MIN_TERMS]. */
    private fun termGridContent(): PartyGameContent {
        val terms = listOf(
            GridTerm("ANTERIOR", "Toward the front"),
            GridTerm("POSTERIOR", "Toward the back"),
            GridTerm("SUPERIOR", "Above"),
            GridTerm("INFERIOR", "Below"),
            GridTerm("MEDIAL", "Toward the midline"),
            GridTerm("LATERAL", "Away from the midline"),
            GridTerm("PROXIMAL", "Nearer the trunk"),
            GridTerm("DISTAL", "Further from the trunk"),
            GridTerm("SUPINE", "Lying face up"),
            GridTerm("PRONE", "Lying face down"),
        )
        val grid = buildGrid(terms, seed = 12)
        return partyContentFromTermGrid(grid, source)
    }

    private fun taxonomyTerms(): List<TaxonomyTerm> = (1..8).map {
        TaxonomyTerm(
            id = "t$it",
            term = "Term $it",
            arabic = "مصطلح $it",
            category = if (it % 2 == 0) "even" else "odd",
            definition = "Definition of term $it",
            definitionAr = "تعريف $it",
            example = null,
        )
    }

    private fun spotterContent(): PartyGameContent {
        val game = buildSpotterGame(taxonomyTerms(), seed = 7)
        return partyContentFromSpotter(game, source)
    }

    @Test
    fun buildsPartyContentForEverySupportedGameWithoutSynthesizingFacts() {
        val match = partyContentFromTermMatch(buildMatchBoard(taxonomyTerms(), MatchMode.DEFINITION, seed = 9), source)
        val sequence = partyContentFromOrderedMiniGamePack(validMiniGamePacks(MiniGameKind.CLINICAL_SEQUENCE)[0] as OrderedMiniGamePack)
        val mechanism = partyContentFromOrderedMiniGamePack(validMiniGamePacks(MiniGameKind.MECHANISM_CHAIN)[0] as OrderedMiniGamePack)
        val redFlags = partyContentFromRedFlagSortPack(validMiniGamePacks(MiniGameKind.RED_FLAG_SORT)[0] as RedFlagSortPack)
        val contents = listOf(termGridContent(), spotterContent(), match, sequence, mechanism, redFlags)

        assertEquals(
            listOf(
                PartyGameKind.TERM_GRID, PartyGameKind.SPOTTER, PartyGameKind.TERM_MATCH,
                PartyGameKind.CLINICAL_SEQUENCE, PartyGameKind.MECHANISM_CHAIN, PartyGameKind.RED_FLAG_SORT,
            ),
            contents.map { it.kind },
        )
        for (content in contents) {
            assertTrue(content.authoredOnly)
            assertTrue(content.rounds.isNotEmpty())
            // Every round's answerKey is non-optional in the Kotlin model (PartyAnswerKey,
            // not PartyAnswerKey?) — the TS `!== undefined` check has no equivalent to write.
            baseSession(content) // must not throw
        }
    }

    @Test
    fun refusesContentThatIsNotExplicitlyAuthoredOrPublished() {
        val unsafe = termGridContent().copy(authoredOnly = false)
        val error = assertThrows(PartyGameRuleError::class.java) { baseSession(unsafe) }
        assertEquals("synthetic_content_refused", error.code)
    }

    @Test
    fun requiresMembershipAndHostControlForProtectedTransitions() {
        val session = baseSession(termGridContent())
        val startError = assertThrows(PartyGameRuleError::class.java) {
            applyPartyGameAction(session, guest, PartyGameAction.Start, later)
        }
        assertEquals("not_party_member", startError.code)

        val joined = applyPartyGameAction(
            session, guest, PartyGameAction.Join(JoinParticipant(guest.id, "guest")), later,
        ).session

        val hostError = assertThrows(PartyGameRuleError::class.java) {
            applyPartyGameAction(joined, guest, PartyGameAction.Start, later)
        }
        assertEquals("host_required", hostError.code)
    }

    @Test
    fun recordsAnswerAndScoreEventsRedactsAnswerMaterialForPublicStreamsAndRejectsDuplicates() {
        var session = baseSession(termGridContent())
        session = applyPartyGameAction(session, guest, PartyGameAction.Join(JoinParticipant(guest.id, "guest")), later).session
        session = applyPartyGameAction(session, host, PartyGameAction.Start, later).session

        val round = session.content.rounds[0]
        val key = (round.answerKey as PartyAnswerKey.Single).value
        val submittedWithExtraPunctuation = key.toCharArray().joinToString("-")
        val result = applyPartyGameAction(
            session, guest, PartyGameAction.SubmitAnswer(round.id, PartyAnswerValue.Text(submittedWithExtraPunctuation)), later,
        )

        assertEquals(1, result.session.scores[guest.id])
        assertEquals(PartyGameStatus.BETWEEN_ROUNDS, result.session.status)

        val duplicateError = assertThrows(PartyGameRuleError::class.java) {
            applyPartyGameAction(result.session, guest, PartyGameAction.SubmitAnswer(round.id, PartyAnswerValue.Text(key)), later)
        }
        assertEquals("invalid_state", duplicateError.code)

        val publicState = redactPartyGameSession(result.session)
        // PublicPartyGameRound simply has no answerKey property to carry — the
        // TS `'answerKey' in publicState.currentRound` check has nothing to assert here.
        assertNotNull(publicState.currentRound)

        val answerEvent = result.events.first { it.type == PartyGameEventType.ANSWER_RECORDED }
        val redacted = redactPartyGameEvent(answerEvent, publicState)
        assertTrue(redacted.event.payload is PartyGameEventPayload.AnswerRecordedRedacted)

        val sse = toPartyGameSseMessage(redacted)
        assertEquals(PartyGameEventType.ANSWER_RECORDED, sse.eventType)
        assertEquals(result.session.version, sse.event.publicState?.version)
    }

    @Test
    fun replaysPersistedEventsIntoTheSameFinalStateAndSupportsReconnectAndCompletion() {
        var session = baseSession(partyContentFromOrderedMiniGamePack(validMiniGamePacks(MiniGameKind.CLINICAL_SEQUENCE)[0] as OrderedMiniGamePack))
        val initial = session
        val events = mutableListOf<PartyGameEventRecord>()

        val joined = applyPartyGameAction(session, guest, PartyGameAction.Join(JoinParticipant(guest.id, "guest")), later)
        events += joined.events
        session = joined.session

        val started = applyPartyGameAction(session, host, PartyGameAction.Start, later)
        events += started.events
        session = started.session

        val round = session.content.rounds[0]
        val order = (round.answerKey as PartyAnswerKey.Ordered).value
        val answered = applyPartyGameAction(session, guest, PartyGameAction.SubmitAnswer(round.id, PartyAnswerValue.Ordered(order)), later)
        events += answered.events
        session = answered.session

        val reconnected = applyPartyGameAction(session, guest, PartyGameAction.Reconnect, later)
        events += reconnected.events
        session = reconnected.session

        val completed = applyPartyGameAction(session, host, PartyGameAction.NextRound, later)
        events += completed.events
        session = completed.session

        assertEquals(PartyGameStatus.COMPLETED, session.status)
        assertEquals(session, replayPartyGameEvents(initial, events))
    }
}
