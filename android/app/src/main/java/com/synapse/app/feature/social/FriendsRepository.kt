package com.synapse.app.feature.social

import com.synapse.app.core.api.FriendMutation
import com.synapse.app.core.api.FriendRequestsDto
import com.synapse.app.core.api.InviteResponse
import com.synapse.app.core.api.PersonDto
import com.synapse.app.core.api.RedeemInviteMutation
import com.synapse.app.core.api.SocialApi
import kotlinx.coroutines.CancellationException
import javax.inject.Inject

/**
 * What loading the friend graph came to. Offline is a normal outcome, never
 * a crash — matching [com.synapse.app.feature.performance.LeaderboardOutcome].
 */
sealed interface FriendsOutcome {
    data class Loaded(val friends: List<PersonDto>, val requests: FriendRequestsDto) : FriendsOutcome
    data object Unavailable : FriendsOutcome
}

/**
 * The Friends data layer. Unlike [StudyRoomsRepository]/[ChallengesRepository]
 * there is no polling here: neither iOS nor the web `useFriends` hook
 * re-fetches the friend graph on a timer (only a room or challenge someone is
 * actively sitting needs that) — a screen that wants fresher data calls
 * [friends] again itself (e.g. pull-to-refresh, or after a mutation).
 *
 * Facebook-linking (`/api/friends/facebook*`) is intentionally not wired:
 * those routes sit dark behind a server feature flag that is off by default
 * (see `server/src/index.js`'s "Facebook link" section), so there is nothing
 * live for this client to call yet.
 */
class FriendsRepository @Inject constructor(private val api: SocialApi) {

    suspend fun friends(): FriendsOutcome = try {
        val response = api.friends()
        FriendsOutcome.Loaded(response.friends, response.requests)
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        FriendsOutcome.Unavailable
    }

    suspend fun directorySearch(query: String): List<PersonDto>? = try {
        api.directory(query).people
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        null
    }

    suspend fun sendRequest(userId: String): FriendMutation = api.sendFriendRequest(userId)

    suspend fun respondToRequest(userId: String, accept: Boolean): FriendMutation =
        api.respondToFriendRequest(userId, accept)

    suspend fun remove(userId: String): FriendMutation = api.removeFriend(userId)

    suspend fun mintInvite(): InviteResponse = api.mintInvite()

    suspend fun redeemInvite(token: String): RedeemInviteMutation = api.redeemInvite(token)
}
