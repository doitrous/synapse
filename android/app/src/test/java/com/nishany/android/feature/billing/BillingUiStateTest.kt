package com.nishany.android.feature.billing

import com.nishany.android.core.api.Entitlement
import com.nishany.android.core.ui.UiState
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** [billingUiState] in isolation -- same idiom as `PracticalUiStateTest`. */
class BillingUiStateTest {

    private fun noRetry(): () -> Unit = { error("retry should not run in this test") }

    private fun billing(entitlement: Entitlement? = null) =
        BillingUi(entitlement = entitlement, redemption = null, monthly = null, term = null)

    @Test
    fun `nothing loaded yet and no failure is Loading`() {
        assertEquals(UiState.Loading, billingUiState(null, failed = false, isOnline = true, retry = noRetry()))
    }

    @Test
    fun `a loaded plan is Content, even with a none entitlement`() {
        val result = billingUiState(billing(), failed = false, isOnline = true, retry = noRetry())
        assertTrue(result is UiState.Content)
    }

    @Test
    fun `a failed load while online says the read failed`() {
        val result = billingUiState(null, failed = true, isOnline = true, retry = noRetry())
        assertTrue(result is UiState.Error)
        assertTrue((result as UiState.Error).message.contains("could not be read"))
    }

    @Test
    fun `a failed load while offline says so`() {
        val result = billingUiState(null, failed = true, isOnline = false, retry = noRetry())
        assertTrue(result is UiState.Error)
        assertTrue((result as UiState.Error).message.contains("offline", ignoreCase = true))
    }
}
