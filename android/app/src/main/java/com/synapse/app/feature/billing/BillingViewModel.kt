package com.synapse.app.feature.billing

import androidx.annotation.AnyRes
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.R
import com.synapse.app.core.api.MeEntitlement
import com.synapse.app.core.api.Voucher
import com.synapse.app.core.api.VoucherRedemption
import com.synapse.app.core.billing.billingReasonMessage
import com.synapse.app.core.billing.isTrialVoucher
import com.synapse.app.core.billing.trialEndsAt
import com.synapse.app.core.billing.voucherTrialDays
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import java.time.temporal.ChronoUnit
import javax.inject.Inject

/**
 * A user-facing message resolved at the composable: a plain `@StringRes`
 * [res] (optionally with format [args]), or — when [pluralCount] is set — a
 * `@PluralsRes` [res] selected on that count (with [args] as its format args,
 * same convention as `resources.getQuantityString(res, pluralCount, *args)`).
 */
data class BillingMessage(
    @AnyRes val res: Int,
    val args: List<Any> = emptyList(),
    val pluralCount: Int? = null,
)

/** What [BillingRoute] renders. */
sealed interface BillingUiState {
    data object Loading : BillingUiState

    /** `/api/me` could not be fetched at all — offline on first load, or a session hiccup. */
    data object Unavailable : BillingUiState

    data class Content(
        val entitlement: MeEntitlement?,
        val redemption: VoucherRedemption? = null,
        /** [redemption]'s full details, resolved from the shared voucher catalogue — null while nothing is applied, or while the catalogue doesn't (yet) carry it. */
        val appliedVoucher: Voucher? = null,
        /** Days left in [appliedVoucher]'s trial, derived from [redemption]'s real `redeemedAt` against [BillingViewModel.now] — null when there's nothing to derive (no trial applied, or no [VoucherRedemption.redeemedAt] to derive it from). */
        val trialDaysLeft: Int? = null,
        val trialExpired: Boolean = false,
        val code: String = "",
        val isBusy: Boolean = false,
        val message: BillingMessage? = null,
    ) : BillingUiState
}

/**
 * Drives [BillingRoute]: the read-only entitlement/subscription state and
 * voucher redemption. Purchasing a plan is explicitly out of scope (see
 * `BillingRepository`'s doc comment) — this view model never offers to buy,
 * change or cancel anything, matching iOS `BillingModel`/web `Billing.tsx`.
 */
@HiltViewModel
class BillingViewModel @Inject constructor(
    private val repository: BillingRepository,
) : ViewModel() {

    /** Overridable for tests — trial expiry is time-dependent. */
    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<BillingUiState>(BillingUiState.Loading)
    val uiState: StateFlow<BillingUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            _uiState.value = BillingUiState.Loading
            when (val outcome = repository.loadEntitlement()) {
                EntitlementOutcome.Unavailable -> _uiState.value = BillingUiState.Unavailable
                is EntitlementOutcome.Loaded -> {
                    val redemption = repository.loadRedemption()
                    val vouchers = repository.vouchersCatalogue()
                    _uiState.value = contentFor(outcome.me.entitlement, redemption, vouchers)
                }
            }
        }
    }

    fun onCodeChange(text: String) {
        val state = _uiState.value as? BillingUiState.Content ?: return
        _uiState.value = state.copy(code = text)
    }

    fun redeem() {
        val state = _uiState.value as? BillingUiState.Content ?: return
        val code = state.code.trim()
        if (code.isEmpty() || state.isBusy) return
        _uiState.value = state.copy(isBusy = true, message = null)
        viewModelScope.launch {
            when (val outcome = repository.redeem(code)) {
                is RedeemOutcome.Applied -> {
                    // Re-fetches rather than synthesizing a redemption row, so
                    // `redeemedAt` (and this trial's real countdown) comes from
                    // the server, not a guess — mirrors AccountRepository's
                    // re-fetch-after-write convention.
                    val redemption = repository.loadRedemption()
                    val vouchers = repository.vouchersCatalogue().let { existing ->
                        if (existing.any { it.id == outcome.voucher.id }) existing else existing + outcome.voucher
                    }
                    val content = contentFor(currentEntitlement(), redemption, vouchers)
                    _uiState.value = content.copy(
                        code = "",
                        message = if (isTrialVoucher(outcome.voucher)) {
                            val days = voucherTrialDays(outcome.voucher)
                            BillingMessage(R.plurals.billing_voucher_applied_trial, listOf(outcome.voucher.code, days), pluralCount = days)
                        } else {
                            BillingMessage(R.string.billing_voucher_applied_discount, listOf(outcome.voucher.code))
                        },
                    )
                }
                is RedeemOutcome.Refused -> {
                    val current = _uiState.value as? BillingUiState.Content ?: return@launch
                    _uiState.value = current.copy(isBusy = false, message = BillingMessage(billingReasonMessage(outcome.reason)))
                }
                RedeemOutcome.Failed -> {
                    val current = _uiState.value as? BillingUiState.Content ?: return@launch
                    _uiState.value = current.copy(
                        isBusy = false,
                        message = BillingMessage(R.string.billing_redeem_failed_transport),
                    )
                }
            }
        }
    }

    fun removeVoucher() {
        val state = _uiState.value as? BillingUiState.Content ?: return
        if (state.isBusy) return
        _uiState.value = state.copy(isBusy = true, message = null)
        viewModelScope.launch {
            val ok = repository.release()
            val current = _uiState.value as? BillingUiState.Content ?: return@launch
            _uiState.value = if (ok) {
                current.copy(
                    isBusy = false,
                    redemption = null,
                    appliedVoucher = null,
                    trialDaysLeft = null,
                    trialExpired = false,
                    message = BillingMessage(R.string.billing_voucher_removed),
                )
            } else {
                current.copy(isBusy = false, message = BillingMessage(R.string.billing_voucher_remove_failed))
            }
        }
    }

    private fun currentEntitlement(): MeEntitlement? = (_uiState.value as? BillingUiState.Content)?.entitlement

    private fun contentFor(entitlement: MeEntitlement?, redemption: VoucherRedemption?, vouchers: List<Voucher>): BillingUiState.Content {
        val applied = redemption?.let { r -> vouchers.find { it.id == r.voucherId } }
        val (daysLeft, expired) = trialWindow(applied, redemption)
        return BillingUiState.Content(
            entitlement = entitlement,
            redemption = redemption,
            appliedVoucher = applied,
            trialDaysLeft = daysLeft,
            trialExpired = expired,
        )
    }

    /** Derives the applied trial's remaining days/expiry from [now] — nothing to derive without a trial voucher and a real `redeemedAt`. */
    private fun trialWindow(voucher: Voucher?, redemption: VoucherRedemption?): Pair<Int?, Boolean> {
        if (voucher == null || !isTrialVoucher(voucher)) return null to false
        val redeemedAt = redemption?.redeemedAt?.let { runCatching { Instant.parse(it) }.getOrNull() } ?: return null to false
        val end = trialEndsAt(voucher, redeemedAt) ?: return null to false
        val current = now()
        if (end.isBefore(current)) return 0 to true
        val daysLeft = ChronoUnit.DAYS.between(current, end).toInt().coerceAtLeast(0)
        return daysLeft to false
    }
}
