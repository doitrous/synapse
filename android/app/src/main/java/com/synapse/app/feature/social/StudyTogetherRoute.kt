package com.synapse.app.feature.social

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle

/** Which of the three Study Together sections is showing. */
private enum class StudyTogetherTab { Rooms, Challenges, Friends }

/**
 * The Study Together tab's entire flow: Study Rooms, Challenges and Friends
 * as one screen's sections — mirroring the production web `StudyTogether`
 * page and (for rooms specifically) iOS's `StudyTogetherView`. Opening a
 * room or challenge overlays that detail lifecycle on top of the tabs, the
 * same `when`-over-position flow `feature.qbank.QuestionBankRoot` uses rather
 * than a nested `NavHost` — this is one bottom-nav destination.
 *
 * All five view models resolve via [hiltViewModel] against this
 * destination's own back-stack entry, so an open room/challenge survives a
 * configuration change instead of dropping the student back to the list.
 */
@Composable
fun StudyTogetherRoute(
    roomsViewModel: StudyRoomsViewModel = hiltViewModel(),
    roomViewModel: RoomViewModel = hiltViewModel(),
    challengesViewModel: ChallengesViewModel = hiltViewModel(),
    challengeViewModel: ChallengeViewModel = hiltViewModel(),
    friendsViewModel: FriendsViewModel = hiltViewModel(),
) {
    var tab by rememberSaveable { mutableStateOf(StudyTogetherTab.Rooms) }

    val openedRoomId by roomsViewModel.openedRoomId.collectAsStateWithLifecycle()
    val openedChallengeId by challengesViewModel.openedChallengeId.collectAsStateWithLifecycle()

    LaunchedEffect(openedRoomId) {
        openedRoomId?.let { roomViewModel.open(it) }
    }
    LaunchedEffect(openedChallengeId) {
        openedChallengeId?.let { challengeViewModel.open(it) }
    }

    when {
        openedRoomId != null -> RoomDetailScreen(
            viewModel = roomViewModel,
            onLeave = {
                roomViewModel.close()
                roomsViewModel.consumeOpenedRoom()
                roomsViewModel.load()
            },
        )

        openedChallengeId != null -> ChallengeDetailScreen(
            viewModel = challengeViewModel,
            onLeave = {
                challengeViewModel.close()
                challengesViewModel.consumeOpenedChallenge()
                challengesViewModel.load()
            },
        )

        else -> Column(modifier = Modifier.fillMaxSize()) {
            Text("Study together", style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(16.dp))

            val tabIndex = tab.ordinal
            TabRow(selectedTabIndex = tabIndex) {
                Tab(selected = tabIndex == 0, onClick = { tab = StudyTogetherTab.Rooms }, text = { Text("Rooms") })
                Tab(selected = tabIndex == 1, onClick = { tab = StudyTogetherTab.Challenges }, text = { Text("Challenges") })
                Tab(selected = tabIndex == 2, onClick = { tab = StudyTogetherTab.Friends }, text = { Text("Friends") })
            }

            when (tab) {
                StudyTogetherTab.Rooms -> RoomsScreen(viewModel = roomsViewModel)
                StudyTogetherTab.Challenges -> ChallengesScreen(viewModel = challengesViewModel)
                StudyTogetherTab.Friends -> FriendsScreen(viewModel = friendsViewModel)
            }
        }
    }
}
