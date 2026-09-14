package com.synapse.app.feature.party

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle

/**
 * The Parties surface's entire flow: the list, one party's lobby, sitting a
 * session, and playing a party game — one `when`-over-position flow, the
 * same shape `feature.social.StudyTogetherRoute` and
 * `feature.qbank.QuestionBankRoot` use rather than a nested `NavHost`. The
 * orchestrator wires this as a single Nav hub entry (`"parties" to
 * PartiesRoute`).
 *
 * All four view models resolve via [hiltViewModel] against this
 * destination's own back-stack entry, so an open party/session/game survives
 * a configuration change instead of dropping the student back to the list.
 */
@Composable
fun PartiesRoute(
    partiesViewModel: PartiesViewModel = hiltViewModel(),
    lobbyViewModel: PartyLobbyViewModel = hiltViewModel(),
    sessionViewModel: PartySessionViewModel = hiltViewModel(),
    gameViewModel: PartyGameViewModel = hiltViewModel(),
) {
    var openPartyId by rememberSaveable { mutableStateOf<String?>(null) }

    val openedPartyId by partiesViewModel.openedPartyId.collectAsStateWithLifecycle()
    val openedSessionId by lobbyViewModel.openedSessionId.collectAsStateWithLifecycle()
    val openedGameId by lobbyViewModel.openedGameId.collectAsStateWithLifecycle()

    LaunchedEffect(openedPartyId) {
        openedPartyId?.let {
            openPartyId = it
            partiesViewModel.consumeOpenedParty()
        }
    }
    LaunchedEffect(openPartyId) {
        openPartyId?.let { lobbyViewModel.open(it) }
    }
    LaunchedEffect(openedSessionId) {
        openedSessionId?.let { sessionViewModel.open(it) }
    }
    LaunchedEffect(openedGameId, openPartyId) {
        val partyId = openPartyId
        val gameId = openedGameId
        if (partyId != null && gameId != null) gameViewModel.open(partyId, gameId)
    }

    when {
        openedGameId != null && openPartyId != null -> PartyGameScreen(
            viewModel = gameViewModel,
            onExit = {
                gameViewModel.close()
                lobbyViewModel.consumeOpenedGame()
                lobbyViewModel.refreshLists()
            },
        )

        openedSessionId != null -> PartySessionScreen(
            viewModel = sessionViewModel,
            onExit = {
                sessionViewModel.close()
                lobbyViewModel.consumeOpenedSession()
                lobbyViewModel.refreshLists()
            },
        )

        openPartyId != null -> PartyLobbyScreen(
            viewModel = lobbyViewModel,
            onLeft = {
                lobbyViewModel.close()
                openPartyId = null
                partiesViewModel.load()
            },
            onBack = {
                lobbyViewModel.close()
                openPartyId = null
            },
        )

        else -> PartiesScreen(viewModel = partiesViewModel, onOpenParty = { id -> openPartyId = id })
    }
}
