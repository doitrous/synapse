package com.synapse.app.feature.social

import com.synapse.app.core.api.DirectoryResponse
import com.synapse.app.core.api.FriendMutation
import com.synapse.app.core.api.FriendRequestsDto
import com.synapse.app.core.api.FriendsResponse
import com.synapse.app.core.api.PersonDto
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [FriendsRepository] is a thin, offline-tolerant pass-through to [FakeSocialApi]
 * — no polling (see the class doc for why), so the one thing worth locking
 * down beyond "does it forward the call" is that a failure degrades to a
 * normal outcome without ever swallowing cancellation.
 */
class FriendsRepositoryTest {

    private val api = FakeSocialApi()
    private val repository = FriendsRepository(api)

    @Test
    fun friendsReturnsLoadedOnSuccess() = runTest {
        api.friendsResponse = FriendsResponse(
            friends = listOf(PersonDto(userId = "u2", displayName = "Sam")),
            requests = FriendRequestsDto(incoming = listOf(PersonDto(userId = "u3", displayName = "Ali"))),
        )
        val outcome = repository.friends()
        assertTrue(outcome is FriendsOutcome.Loaded)
        val loaded = outcome as FriendsOutcome.Loaded
        assertEquals(1, loaded.friends.size)
        assertEquals(1, loaded.requests.incoming.size)
    }

    @Test
    fun friendsDegradesToUnavailableWhenOffline() = runTest {
        api.friendsFailure = java.io.IOException("offline")
        assertEquals(FriendsOutcome.Unavailable, repository.friends())
    }

    @Test
    fun friendsRethrowsCancellationRatherThanSwallowingIt() = runTest {
        api.friendsFailure = CancellationException("navigated away")
        var thrown: Throwable? = null
        try {
            repository.friends()
        } catch (e: CancellationException) {
            thrown = e
        }
        assertTrue(thrown is CancellationException)
    }

    @Test
    fun directorySearchReturnsNullOnFailureRatherThanAnEmptyMatch() = runTest {
        api.directoryFailure = java.io.IOException("offline")
        assertNull(repository.directorySearch("sam"))
    }

    @Test
    fun directorySearchPassesThroughOnSuccess() = runTest {
        api.directoryResponse = DirectoryResponse(listOf(PersonDto(userId = "u9", displayName = "Nour")))
        val results = repository.directorySearch("nour")
        assertEquals(listOf("u9"), results?.map { it.userId })
    }

    @Test
    fun sendRequestForwardsTheMutation() = runTest {
        api.sendRequestResult = FriendMutation(ok = false, reason = "invalid_target")
        val result = repository.sendRequest("ghost")
        assertEquals(false, result.succeeded)
    }
}
