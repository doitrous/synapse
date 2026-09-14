package com.synapse.app.feature.billing

import com.synapse.app.core.api.AccountApi
import com.synapse.app.core.api.BillingApi
import com.synapse.app.core.api.MeResponse
import com.synapse.app.core.api.Voucher
import com.synapse.app.core.api.VoucherRedemption
import com.synapse.app.core.cache.LocalStore
import kotlinx.coroutines.CancellationException
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.Json
import javax.inject.Inject

/** `GET /api/me` either answers, or it doesn't — offline on first load, or a session hiccup. */
sealed interface EntitlementOutcome {
    data class Loaded(val me: MeResponse) : EntitlementOutcome
    data object Unavailable : EntitlementOutcome
}

/**
 * What a redeem attempt came back with. [Refused] carries the server's own
 * human-readable [Refused.message] (`server/src/vouchers.js#REFUSALS`) — a
 * refusal is a normal answer to render, not an error to interpret. [Failed]
 * is the transport/offline case, which has no server message to show.
 */
sealed interface RedeemOutcome {
    data class Applied(val voucher: Voucher) : RedeemOutcome
    data class Refused(val message: String) : RedeemOutcome
    data object Failed : RedeemOutcome
}

/**
 * The Billing data layer: entitlement/subscription ([loadEntitlement], reusing
 * [AccountApi.getMe] rather than re-declaring `/api/me` on [BillingApi] — see
 * `BillingApi.kt`'s doc comment on why this feature owns only the three
 * voucher endpoints), the student's own redemption ([loadRedemption]), the
 * shared voucher catalogue a redemption's full details are looked up against
 * ([vouchersCatalogue]), and redeeming/releasing a code.
 *
 * No plan-pricing lookup: `synapse-plan-catalog-v1` isn't part of this
 * feature's confirmed state-key contract, and the "Student voucher" panel's
 * existing "Applied to your account" fallback (used by iOS/web whenever a
 * price can't be resolved) already covers a discount voucher with no known
 * price honestly. A trial voucher never needed a price to describe itself.
 */
class BillingRepository @Inject constructor(
    private val billingApi: BillingApi,
    private val accountApi: AccountApi,
    private val localStore: LocalStore,
    private val json: Json,
) {

    suspend fun loadEntitlement(): EntitlementOutcome = try {
        EntitlementOutcome.Loaded(accountApi.getMe())
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        EntitlementOutcome.Unavailable
    }

    /** Best-effort — matches iOS `BillingModel.load()`'s `try? api.myVoucher()`: no redemption applied reads the same as "couldn't check". */
    suspend fun loadRedemption(): VoucherRedemption? = try {
        billingApi.myVoucher().redemption
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        null
    }

    /**
     * The shared, admin-authored voucher catalogue a redemption's id resolves
     * against. A student may not be allowed to read the whole list server-side,
     * and it may simply not be cached yet — either way this degrades to an
     * empty list rather than an error, matching iOS's own comment on the
     * equivalent load.
     */
    suspend fun vouchersCatalogue(): List<Voucher> {
        val stored = localStore.getCatalogue(VOUCHERS_KEY) ?: return emptyList()
        return runCatching { json.decodeFromString(ListSerializer(Voucher.serializer()), stored) }
            .getOrDefault(emptyList())
    }

    suspend fun redeem(code: String): RedeemOutcome = try {
        val result = billingApi.redeemVoucher(code)
        val voucher = result.voucher
        if (result.ok && voucher != null) {
            RedeemOutcome.Applied(voucher)
        } else {
            RedeemOutcome.Refused(result.message ?: "That voucher could not be applied.")
        }
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        RedeemOutcome.Failed
    }

    /** True on success (including "nothing was applied" — the server itself treats that as `ok`). False only on a transport failure. */
    suspend fun release(): Boolean = try {
        billingApi.releaseVoucher().ok
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        false
    }

    companion object {
        /** Shared/read-only — already in [com.synapse.app.core.sync.STUDENT_READABLE_KEYS]. */
        const val VOUCHERS_KEY = "synapse-vouchers-v1"
    }
}
