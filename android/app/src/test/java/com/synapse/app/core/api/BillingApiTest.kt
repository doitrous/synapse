package com.synapse.app.core.api

import kotlinx.coroutines.test.runTest
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class BillingApiTest {
    private lateinit var server: MockWebServer
    private lateinit var api: RetrofitBillingApi

    @Before fun setup() {
        server = MockWebServer()
        server.start()
        api = RetrofitBillingApi(baseUrl = server.url("/api/").toString(), tokenProvider = { "test-token" })
    }

    @After fun teardown() = server.shutdown()

    @Test fun sendsBearerTokenHeader() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("{\"redemption\":null}"))
        api.myVoucher()
        assertEquals("Bearer test-token", server.takeRequest().getHeader("Authorization"))
    }

    @Test fun myVoucherParsesANullRedemption() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("{\"redemption\":null}"))
        assertNull(api.myVoucher().redemption)
    }

    @Test fun myVoucherParsesAnActiveRedemption() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """{"redemption":{"voucherId":"v1","code":"WELCOME20","redeemedAt":"2026-08-01T10:00:00.000Z"}}"""
            )
        )
        val response = api.myVoucher()
        val request = server.takeRequest()

        assertEquals("GET", request.method)
        assertTrue(request.path!!.endsWith("vouchers/mine"))
        assertEquals("v1", response.redemption?.voucherId)
        assertEquals("2026-08-01T10:00:00.000Z", response.redemption?.redeemedAt)
    }

    @Test fun redeemPostsTheCodeAndParsesASuccessfulRedemption() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """{"ok":true,"voucher":{"id":"v1","code":"WELCOME20","amount":20,"redemptionCount":144}}"""
            )
        )
        val result = api.redeemVoucher("welcome20")

        val request = server.takeRequest()
        assertEquals("POST", request.method)
        assertTrue(request.path!!.endsWith("vouchers/redeem"))
        assertTrue(request.body.readUtf8().contains("welcome20"))
        assertTrue(result.ok)
        assertEquals("WELCOME20", result.voucher?.code)
    }

    @Test fun redeemParsesATypedRefusalAsAnOrdinary200() = runTest {
        server.enqueue(
            MockResponse().setResponseCode(200).setBody(
                """{"ok":false,"reason":"not_found","message":"That voucher code was not found. Check the spelling and try again."}"""
            )
        )
        val result = api.redeemVoucher("BOGUS")

        assertEquals(false, result.ok)
        assertEquals("not_found", result.reason)
        assertNull(result.voucher)
    }

    @Test fun releaseVoucherIsADeleteAndParsesTheReleasedId() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("""{"ok":true,"released":"v1"}"""))
        val result = api.releaseVoucher()

        val request = server.takeRequest()
        assertEquals("DELETE", request.method)
        assertTrue(result.ok)
        assertEquals("v1", result.released)
    }

    @Test fun maps401ToUnauthorized() = runTest {
        server.enqueue(MockResponse().setResponseCode(401).setBody("{}"))
        val error = runCatching { api.myVoucher() }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Unauthorized)
    }

    @Test fun maps500ToRetryable() = runTest {
        server.enqueue(MockResponse().setResponseCode(500).setBody("{}"))
        val error = runCatching { api.myVoucher() }.exceptionOrNull()
        assertTrue(error is ApiException)
        assertTrue((error as ApiException).error is ApiError.Retryable)
    }
}
