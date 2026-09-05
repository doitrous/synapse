package com.nishany.android.feature.billing

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.nishany.android.core.ConnectivityMonitor
import com.nishany.android.core.api.ApiError
import com.nishany.android.core.api.Entitlement
import com.nishany.android.core.api.PricingQuote
import com.nishany.android.core.api.NishanyApi
import com.nishany.android.core.api.VoucherRedemption
import com.nishany.android.core.backgroundWorkScope
import com.nishany.android.core.ui.UiState
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

/** Everything [BillingScreen] draws once the plan has loaded. */
data class BillingUi(
    val entitlement: Entitlement?,
    val redemption: VoucherRedemption?,
    val monthly: PricingQuote?,
    val term: PricingQuote?,
)

/**
 * Billing (parity item G6): what the student is entitled to, and a place to
 * redeem or release a voucher -- a port of iOS's `BillingModel`
 * (`ios/Synapse/Core/Billing/Billing.swift`). There is no payment gateway in
 * this app -- money moves only as an admin grant or a voucher -- so unlike
 * iOS's fuller screen this carries no student-ID upload flow and no purchase
 * button; see [BillingScreen] for the same restraint on the UI side.
 *
 * Network-only, the same shape as
 * [com.nishany.android.feature.assistant.AssistantViewModel]:
 * [NishanyApi.me] is the one read this screen cannot do without (iOS's own
 * `BillingModel.load` comment says the same), so a failed load is
 * [UiState.Error] rather than a stale local copy -- there is nothing cached
 * to fall back to. [myVoucher][NishanyApi.myVoucher] and the two
 * [pricingQuote][NishanyApi.pricingQuote] reads are best-effort: a plan
 * screen missing "Applied" or a price line is a smaller loss than the whole
 * screen refusing to load over a secondary read.
 */
class BillingViewModel(
    private val api: NishanyApi,
    connectivity: ConnectivityMonitor? = null,
) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("BillingViewModel")

    private val _billing = MutableStateFlow<BillingUi?>(null)
    private val _loadFailed = MutableStateFlow(false)

    val uiState: StateFlow<UiState<BillingUi>> =
        combine(_billing, _loadFailed, connectivity?.isOnline ?: flowOf(true)) { billing, failed, online ->
            billingUiState(billing, failed, online, retry = ::load)
        }.stateIn(backgroundScope, SharingStarted.Eagerly, UiState.Loading)

    private val _busy = MutableStateFlow(false)
    val busy: StateFlow<Boolean> = _busy.asStateFlow()

    /** What the last redeem/release attempt said, in the server's own words when it refused one. */
    private val _message = MutableStateFlow<String?>(null)
    val message: StateFlow<String?> = _message.asStateFlow()

    init {
        load()
    }

    fun load() {
        backgroundScope.launch {
            try {
                val me = api.me()
                val redemption = runCatching { api.myVoucher() }.getOrNull()
                val monthly = runCatching { api.pricingQuote(PERIOD_MONTH) }.getOrNull()
                val term = runCatching { api.pricingQuote(PERIOD_TERM) }.getOrNull()
                _billing.value = BillingUi(me.entitlement, redemption, monthly, term)
                _loadFailed.value = false
            } catch (e: ApiError) {
                _loadFailed.value = true
            }
        }
    }

    /**
     * Redeem [code]. A refusal is a normal, server-worded answer -- see
     * [NishanyApi.redeemVoucher]'s doc -- not an exception this catches
     * specially.
     */
    fun redeem(code: String) {
        val wanted = code.trim()
        if (wanted.isEmpty() || _busy.value) return
        _busy.value = true
        _message.value = null
        backgroundScope.launch {
            try {
                val result = api.redeemVoucher(wanted)
                val voucher = result.voucher
                if (result.ok && voucher != null) {
                    _billing.update { it?.copy(redemption = VoucherRedemption(voucher.id, voucher.code, null)) }
                    _message.value = "${voucher.code} has been applied to your account."
                } else {
                    _message.value = result.message ?: "That voucher could not be applied."
                }
            } catch (e: ApiError) {
                _message.value = "That voucher could not be applied. Check your connection and try again."
            } finally {
                _busy.value = false
            }
        }
    }

    fun release() {
        if (_busy.value) return
        _busy.value = true
        backgroundScope.launch {
            try {
                api.releaseVoucher()
                _billing.update { it?.copy(redemption = null) }
                _message.value = "Voucher removed."
            } catch (e: ApiError) {
                _message.value = "That voucher could not be removed. Try again."
            } finally {
                _busy.value = false
            }
        }
    }

    fun clearMessage() {
        _message.value = null
    }

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        const val PERIOD_MONTH = "month"
        const val PERIOD_TERM = "term"

        fun factory(api: NishanyApi, connectivity: ConnectivityMonitor) = viewModelFactory {
            initializer { BillingViewModel(api, connectivity) }
        }
    }
}

/**
 * The pure billing-plus-connectivity -> [UiState] fold behind
 * [BillingViewModel.uiState] -- same idiom as
 * [com.nishany.android.feature.assistant.assistantUiState].
 */
internal fun billingUiState(
    billing: BillingUi?,
    failed: Boolean,
    isOnline: Boolean,
    retry: () -> Unit,
): UiState<BillingUi> = when {
    billing != null -> UiState.Content(billing)
    failed -> UiState.Error(
        message = if (isOnline) {
            "Your plan could not be read. Try again."
        } else {
            "You're offline, so your plan can't be shown right now."
        },
        retry = retry,
    )
    else -> UiState.Loading
}
