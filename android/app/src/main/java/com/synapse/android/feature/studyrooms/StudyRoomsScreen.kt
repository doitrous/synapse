package com.synapse.android.feature.studyrooms

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.TextStyle
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.synapse.android.AppGraph
import com.synapse.android.core.rooms.MicRationaleDialog
import com.synapse.android.core.rooms.RoomRoster
import com.synapse.android.core.rooms.RosterMember
import com.synapse.android.core.rooms.hasMicPermission
import com.synapse.android.core.rooms.rememberMicPermissionRequester
import com.synapse.android.core.ui.StateHost
import com.synapse.android.design.LocalCortex

/**
 * Study Rooms, voice-only: enter a code, watch who is here, and — when the
 * server has an SFU — join the room's voice. The greenfield Android peer of the
 * web's `StudyRooms.tsx`. The shared "study test" room the web also offers is a
 * follow-on and not built here.
 */
@Composable
fun StudyRoomsRoute(graph: AppGraph, onBack: () -> Unit) {
    val viewModel: StudyRoomsViewModel = viewModel(
        factory = StudyRoomsViewModel.factory(
            appContext = LocalContext.current.applicationContext,
            api = graph.api,
            apiBaseUrl = graph.config.apiBaseUrl,
            tokenProvider = graph.authBackend::accessToken,
        ),
    )
    val state by viewModel.state.collectAsState()
    StudyRoomsScreen(
        state = state,
        onJoin = viewModel::join,
        onJoinVoice = viewModel::joinVoice,
        onToggleMute = viewModel::toggleMute,
        onLeaveVoice = viewModel::leaveVoice,
        onLeaveRoom = viewModel::leaveRoom,
        onBack = onBack,
    )
}

@Composable
fun StudyRoomsScreen(
    state: StudyRoomsState,
    onJoin: (String) -> Unit,
    onJoinVoice: () -> Unit,
    onToggleMute: () -> Unit,
    onLeaveVoice: () -> Unit,
    onLeaveRoom: () -> Unit,
    onBack: () -> Unit,
) {
    val cortex = LocalCortex.current
    Column(modifier = Modifier.fillMaxSize().background(cortex.paper).padding(24.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text("Study rooms", style = MaterialTheme.typography.headlineSmall, color = cortex.ink, modifier = Modifier.weight(1f))
            TextButton(onClick = onBack) { Text("Back") }
        }
        Spacer(Modifier.height(12.dp))
        when (state) {
            is StudyRoomsState.Lobby -> LobbyView(state = state, onJoin = onJoin)
            is StudyRoomsState.InRoom -> InRoomView(
                state = state,
                onJoinVoice = onJoinVoice,
                onToggleMute = onToggleMute,
                onLeaveVoice = onLeaveVoice,
                onLeaveRoom = onLeaveRoom,
            )
        }
    }
}

@Composable
private fun LobbyView(state: StudyRoomsState.Lobby, onJoin: (String) -> Unit) {
    val cortex = LocalCortex.current
    var code by remember { mutableStateOf("") }
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text(
            "Enter a room code to join your group's study room.",
            style = MaterialTheme.typography.bodyMedium,
            color = cortex.ink2,
        )
        OutlinedTextField(
            value = code,
            onValueChange = { code = it.uppercase().take(12) },
            label = { Text("Room code") },
            singleLine = true,
            textStyle = TextStyle(fontFamily = FontFamily.Monospace, letterSpacing = 2.sp, fontSize = 18.sp),
            keyboardOptions = KeyboardOptions(
                capitalization = KeyboardCapitalization.Characters,
                keyboardType = KeyboardType.Ascii,
                imeAction = ImeAction.Go,
            ),
            enabled = !state.joining,
            modifier = Modifier.fillMaxWidth().semantics { contentDescription = "Room code" },
        )
        if (state.error != null) {
            Text(state.error, color = cortex.danger, style = MaterialTheme.typography.bodySmall)
        }
        Button(
            onClick = { onJoin(code) },
            enabled = code.isNotBlank() && !state.joining,
            colors = ButtonDefaults.buttonColors(containerColor = cortex.primary, contentColor = cortex.onPrimary),
            modifier = Modifier.fillMaxWidth().heightIn(min = 48.dp).semantics { contentDescription = "Join room" },
        ) {
            if (state.joining) {
                CircularProgressIndicator(modifier = Modifier.size(18.dp), color = cortex.onPrimary, strokeWidth = 2.dp)
            } else {
                Text("Join room")
            }
        }
    }
}

@Composable
private fun androidx.compose.foundation.layout.ColumnScope.InRoomView(
    state: StudyRoomsState.InRoom,
    onJoinVoice: () -> Unit,
    onToggleMute: () -> Unit,
    onLeaveVoice: () -> Unit,
    onLeaveRoom: () -> Unit,
) {
    val cortex = LocalCortex.current
    Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        Column(modifier = Modifier.weight(1f)) {
            Text(state.party.name ?: "Study room", style = MaterialTheme.typography.titleMedium, color = cortex.ink, fontWeight = FontWeight.SemiBold)
            Text("Code ${state.party.code}", style = MaterialTheme.typography.bodySmall, color = cortex.ink3, fontFamily = FontFamily.Monospace)
        }
        TextButton(onClick = onLeaveRoom) { Text("Leave", color = cortex.danger) }
    }
    Spacer(Modifier.height(12.dp))

    StateHost(state = state.roster, modifier = Modifier.weight(1f)) { roster ->
        Column(modifier = Modifier.fillMaxSize()) {
            VoiceControls(
                voice = state.voice,
                sfuAvailable = roster.sfuAvailable,
                onJoinVoice = onJoinVoice,
                onToggleMute = onToggleMute,
                onLeaveVoice = onLeaveVoice,
            )
            Spacer(Modifier.height(12.dp))
            RosterList(roster, Modifier.weight(1f))
        }
    }
}

@Composable
private fun VoiceControls(
    voice: VoiceUi,
    sfuAvailable: Boolean,
    onJoinVoice: () -> Unit,
    onToggleMute: () -> Unit,
    onLeaveVoice: () -> Unit,
) {
    val cortex = LocalCortex.current
    val context = LocalContext.current
    var showRationale by remember { mutableStateOf(false) }
    val requestMic = rememberMicPermissionRequester { granted -> if (granted) onJoinVoice() }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(14.dp))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        when {
            voice.reconnecting -> Text("Reconnecting to voice…", color = cortex.ink2, style = MaterialTheme.typography.bodyMedium)
            voice.callActive -> Text("You are in the room's voice.", color = cortex.success, style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.SemiBold)
            voice.reason != null -> Text(voice.reason, color = cortex.ink2, style = MaterialTheme.typography.bodySmall)
            else -> Text("Join to talk with everyone in the room.", color = cortex.ink2, style = MaterialTheme.typography.bodySmall)
        }

        if (voice.callActive || voice.reconnecting || voice.phase == VoicePhase.JOINING) {
            Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                Button(
                    onClick = onToggleMute,
                    enabled = voice.callActive,
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (voice.muted) cortex.dangerTint else cortex.primaryTint,
                        contentColor = if (voice.muted) cortex.danger else cortex.primaryStrong,
                    ),
                    modifier = Modifier.weight(1f).heightIn(min = 48.dp)
                        .semantics { contentDescription = if (voice.muted) "Unmute" else "Mute" },
                ) {
                    Text(if (voice.muted) "Unmute" else "Mute")
                }
                OutlinedButton(
                    onClick = onLeaveVoice,
                    modifier = Modifier.weight(1f).heightIn(min = 48.dp).semantics { contentDescription = "Leave voice" },
                ) {
                    Text("Leave voice", color = cortex.ink)
                }
            }
        } else {
            Button(
                onClick = {
                    if (context.hasMicPermission()) onJoinVoice() else showRationale = true
                },
                enabled = sfuAvailable,
                colors = ButtonDefaults.buttonColors(containerColor = cortex.primary, contentColor = cortex.onPrimary),
                modifier = Modifier.fillMaxWidth().heightIn(min = 48.dp).semantics { contentDescription = "Join voice" },
            ) {
                Text(if (sfuAvailable) "Join voice" else "Voice unavailable")
            }
        }
    }

    if (showRationale) {
        MicRationaleDialog(
            onConfirm = { showRationale = false; requestMic() },
            onDismiss = { showRationale = false },
        )
    }
}

@Composable
private fun RosterList(roster: RoomRoster, modifier: Modifier = Modifier) {
    LazyColumn(modifier = modifier, verticalArrangement = Arrangement.spacedBy(8.dp)) {
        if (roster.speakingNow.isNotEmpty()) {
            item { SectionLabel("Speaking now") }
            items(roster.speakingNow, key = { "spk-${it.userId}" }) { MemberRow(it) }
        }
        item { SectionLabel("In the room (${roster.total})") }
        items(roster.inRoom, key = { "in-${it.userId}" }) { MemberRow(it) }
        item { Spacer(Modifier.height(24.dp)) }
    }
}

@Composable
private fun SectionLabel(text: String) {
    val cortex = LocalCortex.current
    Text(text, style = MaterialTheme.typography.labelSmall, color = cortex.ink3)
}

@Composable
private fun MemberRow(member: RosterMember) {
    val cortex = LocalCortex.current
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(cortex.surface)
            .border(1.dp, if (member.speaking) cortex.success else cortex.line, RoundedCornerShape(12.dp))
            .padding(horizontal = 14.dp, vertical = 12.dp)
            .semantics {
                contentDescription = buildString {
                    append(member.displayName)
                    if (member.isSelf) append(", you")
                    append(if (member.speaking) ", speaking" else if (member.idle) ", idle" else ", in the room")
                }
            },
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Box(
            modifier = Modifier.size(10.dp).clip(CircleShape).background(
                when {
                    member.speaking -> cortex.success
                    member.idle -> cortex.ink3
                    else -> cortex.accentStrong
                },
            ),
        )
        Text(
            member.displayName + if (member.isSelf) " (you)" else "",
            style = MaterialTheme.typography.bodyMedium,
            color = cortex.ink,
            fontWeight = if (member.speaking) FontWeight.SemiBold else FontWeight.Normal,
            modifier = Modifier.weight(1f),
        )
        if (member.idle && !member.speaking) {
            Text("idle", style = MaterialTheme.typography.labelSmall, color = cortex.ink3)
        }
    }
}
