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
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

/**
 * [BillingViewModel] built against a real [BillingRepository] wired to
 * hand-written fakes — same convention as `PerformanceViewModelTest`.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class BillingViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-13T09:00:00Z")

    private lateinit var billingApi: VmFakeBillingApi
    private lateinit var accountApi: VmFakeAccountApi
    private lateinit var localStore: VmFakeLocalStore

    @Before fun setUp() {
        Dispatchers.setMain(dispatcher)
        billingApi = VmFakeBillingApi()
        accountApi = VmFakeAccountApi()
        localStore = VmFakeLocalStore()
    }

    @After fun tearDown() = Dispatchers.resetMain()

    private fun viewModel(): BillingViewModel {
        val repository = BillingRepository(billingApi, accountApi, localStore, json)
        return BillingViewModel(repository).apply { now = { this@BillingViewModelTest.now } }
    }

    @Test fun initLoadsEntitlementAndRedemption() = runTest {
        accountApi.meResponse = MeResponse(user = MeUser(id = "u1"), entitlement = MeEntitlement(state = "active", plan = "Maristana", daysLeft = 30))
        billingApi.mine = MineResponse(redemption = VoucherRedemption("v1", "WELCOME20", "2026-08-01T00:00:00Z"))
        localStore.catalogue[BillingRepository.VOUCHERS_KEY] =
            "" to """[{"id":"v1","code":"WELCOME20","name":"Welcome","discountType":"Percentage","amount":20}]"""

        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is BillingUiState.Content)
        state as BillingUiState.Content
        assertEquals("active", state.entitlement?.state)
        assertEquals("v1", state.redemption?.voucherId)
        assertEquals("WELCOME20", state.appliedVoucher?.code)
    }

    @Test fun initGoesToUnavailableWhenEntitlementCannotBeFetched() = runTest {
        accountApi.shouldFail = true
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(BillingUiState.Unavailable, viewModel.uiState.value)
    }

    @Test fun redeemAppliesAVoucherAndClearsTheCode() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        billingApi.redeemResult = RedeemResult(ok = true, voucher = Voucher(id = "v1", code = "WELCOME20", amount = 20.0))
        billingApi.mine = MineResponse(redemption = VoucherRedemption("v1", "WELCOME20", "2026-08-12T00:00:00Z"))
        viewModel.onCodeChange("welcome20")
        viewModel.redeem()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as BillingUiState.Content
        assertEquals("", state.code)
        assertFalse(state.isBusy)
        assertEquals("v1", state.redemption?.voucherId)
        assertTrue(state.message!!.contains("WELCOME20"))
    }

    @Test fun redeemSurfacesTheServersRefusalMessageWithoutClearingTheCode() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        billingApi.redeemResult = RedeemResult(ok = false, reason = "not_found", message = "That voucher code was not found. Check the spelling and try again.")
        viewModel.onCodeChange("BOGUS")
        viewModel.redeem()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as BillingUiState.Content
        assertEquals("BOGUS", state.code)
        assertFalse(state.isBusy)
        assertEquals("That voucher code was not found. Check the spelling and try again.", state.message)
        assertNull(state.redemption)
    }

    @Test fun redeemSurfacesAGenericMessageOnTransportFailure() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        billingApi.shouldFailRedeem = true
        viewModel.onCodeChange("WELCOME20")
        viewModel.redeem()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as BillingUiState.Content
        assertEquals("That voucher could not be applied. Check your connection and try again.", state.message)
    }

    @Test fun redeemIsANoOpForABlankCode() = runTest {
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.onCodeChange("   ")
        viewModel.redeem()
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(0, billingApi.redeemCalls)
    }

    @Test fun removeVoucherClearsTheRedemptionOnSuccess() = runTest {
        billingApi.mine = MineResponse(redemption = VoucherRedemption("v1", "WELCOME20", "2026-08-01T00:00:00Z"))
        localStore.catalogue[BillingRepository.VOUCHERS_KEY] = "" to """[{"id":"v1","code":"WELCOME20"}]"""
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.removeVoucher()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as BillingUiState.Content
        assertNull(state.redemption)
        assertNull(state.appliedVoucher)
        assertEquals("Voucher removed.", state.message)
    }

    @Test fun removeVoucherSurfacesAFailureMessageAndKeepsTheRedemption() = runTest {
        billingApi.mine = MineResponse(redemption = VoucherRedemption("v1", "WELCOME20", "2026-08-01T00:00:00Z"))
        val viewModel = viewModel()
        dispatcher.scheduler.advanceUntilIdle()

        billingApi.shouldFailRelease = true
        viewModel.removeVoucher()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as BillingUiState.Content
        assertEquals("v1", state.redemption?.voucherId)
        assertEquals("That voucher could not be removed. Try again.", state.message)
    }

    // --- trial countdown (the `now` seam) --------------------------------------------

    @Test fun aTrialVoucherRedeemedInTheFutureShowsTheDaysLeftAsOfNow() = runTest {
        billingApi.mine = MineResponse(redemption = VoucherRedemption("v1", "TRIAL3", "2026-08-11T09:00:00Z"))
        localStore.catalogue[BillingRepository.VOUCHERS_KEY] =
            "" to """[{"id":"v1","code":"TRIAL3","grant":"Full-access trial","trialDays":3}]"""
        val viewModel = viewModel() // now = 2026-08-13T09:00:00Z, redeemed 2026-08-11 -> ends 2026-08-14
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as BillingUiState.Content
        assertEquals(1, state.trialDaysLeft)
        assertFalse(state.trialExpired)
    }

    @Test fun aTrialVoucherPastItsEndIsReportedAsExpiredRatherThanNegativeDays() = runTest {
        billingApi.mine = MineResponse(redemption = VoucherRedemption("v1", "TRIAL3", "2026-08-01T09:00:00Z"))
        localStore.catalogue[BillingRepository.VOUCHERS_KEY] =
            "" to """[{"id":"v1","code":"TRIAL3","grant":"Full-access trial","trialDays":3}]"""
        val viewModel = viewModel() // ends 2026-08-04, well before now (2026-08-13)
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as BillingUiState.Content
        assertTrue(state.trialExpired)
        assertEquals(0, state.trialDaysLeft)
    }
}

// --- Fakes --------------------------------------------------------------------

private class VmFakeBillingApi : BillingApi {
    var mine: MineResponse = MineResponse()
    var redeemResult: RedeemResult = RedeemResult(ok = false)
    var releaseResult: ReleaseResult = ReleaseResult(ok = true)
    var shouldFailRedeem = false
    var shouldFailRelease = false
    var redeemCalls = 0

    override suspend fun myVoucher(): MineResponse = mine

    override suspend fun redeemVoucher(code: String): RedeemResult {
        redeemCalls++
        if (shouldFailRedeem) throw RuntimeException("boom")
        return redeemResult
    }

    override suspend fun releaseVoucher(): ReleaseResult {
        if (shouldFailRelease) throw RuntimeException("boom")
        return releaseResult
    }
}

private class VmFakeAccountApi : AccountApi {
    var meResponse: MeResponse = MeResponse(user = MeUser(id = "u1"), entitlement = MeEntitlement(state = "none"))
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

private class VmFakeLocalStore : LocalStore {
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
