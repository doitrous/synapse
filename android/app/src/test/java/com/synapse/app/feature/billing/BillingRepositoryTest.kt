package com.synapse.app.feature.billing

import com.synapse.app.core.api.AccountApi
import com.synapse.app.core.api.AccountDeletionResult
import com.synapse.app.core.api.BillingApi
import com.synapse.app.core.api.DiscoverableResponse
import com.synapse.app.core.api.EnrolmentRequest
import com.synapse.app.core.api.EnrolmentResult
import com.synapse.app.core.api.MeEntitlement
import com.synapse.app.core.api.MeResponse
import com.synapse.app.core.api.MeUser
import com.synapse.app.core.api.MineResponse
import com.synapse.app.core.api.ReleaseResult
import com.synapse.app.core.api.RedeemResult
import com.synapse.app.core.api.Voucher
import com.synapse.app.core.api.VoucherRedemption
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

/**
 * [BillingRepository] against fakes for [BillingApi]/[AccountApi]/[LocalStore] —
 * same convention as `PerformanceRepositoryTest`/`AccountRepositoryTest`.
 */
class BillingRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }
    private lateinit var billingApi: FakeBillingApi
    private lateinit var accountApi: FakeAccountApi
    private lateinit var localStore: FakeLocalStore
    private lateinit var repository: BillingRepository

    @Before fun setup() {
        billingApi = FakeBillingApi()
        accountApi = FakeAccountApi()
        localStore = FakeLocalStore()
        repository = BillingRepository(billingApi, accountApi, localStore, json)
    }

    // --- entitlement --------------------------------------------------------------

    @Test fun loadEntitlementReturnsTheServerResponse() = runTest {
        accountApi.meResponse = MeResponse(user = MeUser(id = "u1"), entitlement = MeEntitlement(state = "trialing", daysLeft = 5))

        val outcome = repository.loadEntitlement()

        assertTrue(outcome is EntitlementOutcome.Loaded)
        assertEquals("trialing", (outcome as EntitlementOutcome.Loaded).me.entitlement?.state)
    }

    @Test fun loadEntitlementDegradesToUnavailableOnFailure() = runTest {
        accountApi.shouldFail = true
        assertEquals(EntitlementOutcome.Unavailable, repository.loadEntitlement())
    }

    // --- redemption -----------------------------------------------------------------

    @Test fun loadRedemptionReturnsNullWhenNothingIsApplied() = runTest {
        billingApi.mine = MineResponse(redemption = null)
        assertNull(repository.loadRedemption())
    }

    @Test fun loadRedemptionReturnsTheServerRow() = runTest {
        billingApi.mine = MineResponse(redemption = VoucherRedemption("v1", "WELCOME20", "2026-08-01T10:00:00Z"))
        assertEquals("v1", repository.loadRedemption()?.voucherId)
    }

    @Test fun loadRedemptionDegradesToNullOnFailure() = runTest {
        billingApi.shouldFailMine = true
        assertNull(repository.loadRedemption())
    }

    // --- vouchers catalogue -----------------------------------------------------------

    @Test fun vouchersCatalogueIsEmptyWhenNothingIsCached() = runTest {
        assertEquals(emptyList<Voucher>(), repository.vouchersCatalogue())
    }

    @Test fun vouchersCatalogueDecodesTheCachedArray() = runTest {
        localStore.catalogue[BillingRepository.VOUCHERS_KEY] =
            "2026-08-01T00:00:00Z" to """[{"id":"v1","code":"WELCOME20","amount":20}]"""

        val vouchers = repository.vouchersCatalogue()

        assertEquals(1, vouchers.size)
        assertEquals("WELCOME20", vouchers.single().code)
    }

    @Test fun vouchersCatalogueIsEmptyOnMalformedJson() = runTest {
        localStore.catalogue[BillingRepository.VOUCHERS_KEY] = "2026-08-01T00:00:00Z" to "not json"
        assertEquals(emptyList<Voucher>(), repository.vouchersCatalogue())
    }

    // --- redeem ------------------------------------------------------------------------

    @Test fun redeemReturnsAppliedOnSuccess() = runTest {
        billingApi.redeemResult = RedeemResult(ok = true, voucher = Voucher(id = "v1", code = "WELCOME20"))

        val outcome = repository.redeem("welcome20")

        assertTrue(outcome is RedeemOutcome.Applied)
        assertEquals("WELCOME20", (outcome as RedeemOutcome.Applied).voucher.code)
    }

    @Test fun redeemReturnsRefusedWithTheServersMessage() = runTest {
        billingApi.redeemResult = RedeemResult(ok = false, reason = "not_found", message = "That voucher code was not found. Check the spelling and try again.")

        val outcome = repository.redeem("BOGUS")

        assertTrue(outcome is RedeemOutcome.Refused)
        assertEquals("That voucher code was not found. Check the spelling and try again.", (outcome as RedeemOutcome.Refused).message)
    }

    @Test fun redeemReturnsFailedOnTransportError() = runTest {
        billingApi.shouldFailRedeem = true
        assertEquals(RedeemOutcome.Failed, repository.redeem("WELCOME20"))
    }

    // --- release -------------------------------------------------------------------------

    @Test fun releaseReturnsTrueOnSuccessEvenWhenNothingWasApplied() = runTest {
        billingApi.releaseResult = ReleaseResult(ok = true, released = null)
        assertTrue(repository.release())
    }

    @Test fun releaseReturnsFalseOnTransportError() = runTest {
        billingApi.shouldFailRelease = true
        assertEquals(false, repository.release())
    }
}

// --- Fakes --------------------------------------------------------------------

private class FakeBillingApi : BillingApi {
    var mine: MineResponse = MineResponse()
    var redeemResult: RedeemResult = RedeemResult(ok = false)
    var releaseResult: ReleaseResult = ReleaseResult(ok = true)
    var shouldFailMine = false
    var shouldFailRedeem = false
    var shouldFailRelease = false

    override suspend fun myVoucher(): MineResponse {
        if (shouldFailMine) throw RuntimeException("boom")
        return mine
    }

    override suspend fun redeemVoucher(code: String): RedeemResult {
        if (shouldFailRedeem) throw RuntimeException("boom")
        return redeemResult
    }

    override suspend fun releaseVoucher(): ReleaseResult {
        if (shouldFailRelease) throw RuntimeException("boom")
        return releaseResult
    }
}

private class FakeAccountApi : AccountApi {
    var meResponse: MeResponse = MeResponse(user = MeUser(id = "u1"))
    var shouldFail = false

    override suspend fun getMe(): MeResponse {
        if (shouldFail) throw RuntimeException("boom")
        return meResponse
    }

    override suspend fun putEnrolment(body: EnrolmentRequest): EnrolmentResult = EnrolmentResult(ok = true)
    override suspend fun getDiscoverable(): DiscoverableResponse = DiscoverableResponse()
    override suspend fun setDiscoverable(discoverable: Boolean): DiscoverableResponse = DiscoverableResponse(discoverable = discoverable, ok = true)
    override suspend fun deleteAccount(): AccountDeletionResult = AccountDeletionResult(ok = true)
    override suspend fun exportRaw(): okhttp3.ResponseBody = "{}".toResponseBody("application/json".toMediaType())
}

private class FakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) { catalogue[key] = updatedAt to json }
    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) {}
    override suspend fun pendingOutbox(): List<OutboxEntry> = emptyList()
    override suspend fun clearOutbox(key: String) {}
    override suspend fun putAttempts(items: List<ModelAttemptRecord>) {}
    override suspend fun attempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {}
    override suspend fun getUserState(key: String): String? = null
    override suspend fun userStateSavedAt(key: String): String? = null
    override suspend fun clearAll() { catalogue.clear() }
}
