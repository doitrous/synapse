package com.synapse.android.core.rooms

/** One person as the hall draws them: name, whether their ring is lit, whether they are idle. */
data class RosterMember(
    val userId: String,
    val displayName: String,
    val speaking: Boolean,
    val idle: Boolean,
    val isSelf: Boolean,
)

/** The room split into "Speaking now" and "In the room", plus whether voice is available. */
data class RoomRoster(
    val speakingNow: List<RosterMember>,
    val inRoom: List<RosterMember>,
    val sfuAvailable: Boolean,
    val sfuReason: String?,
) {
    val total: Int get() = speakingNow.size + inRoom.size
}

/**
 * Fold the live channel state into the two-list roster the screen shows.
 *
 * [selfSpeaking] is the local analyser's verdict, merged over the room's copy
 * of everyone else's — your own ring is measured here, not waited on from the
 * server round-trip. Returns null before the first `presence` (members still
 * unknown), which the screen renders as loading.
 */
fun buildRoster(state: RoomChannelState, selfSpeaking: Boolean): RoomRoster? {
    val members = state.members ?: return null
    val speakingIds = HashSet(state.speaking)
    val selfId = state.selfId
    if (selfId != null) {
        if (selfSpeaking) speakingIds.add(selfId) else speakingIds.remove(selfId)
    }

    val speakingNow = ArrayList<RosterMember>()
    val inRoom = ArrayList<RosterMember>()
    for (member in members.sortedBy { it.displayName.lowercase() }) {
        val talking = member.userId in speakingIds
        val row = RosterMember(
            userId = member.userId,
            displayName = member.displayName,
            speaking = talking,
            idle = member.activity == "idle",
            isSelf = member.userId == selfId,
        )
        if (talking) speakingNow.add(row) else inRoom.add(row)
    }
    return RoomRoster(
        speakingNow = speakingNow,
        inRoom = inRoom,
        sfuAvailable = state.sfu?.available ?: false,
        sfuReason = state.sfu?.reason,
    )
}
