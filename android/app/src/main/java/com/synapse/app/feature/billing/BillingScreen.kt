package com.synapse.app.feature.billing

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.core.api.MeEntitlement
import com.synapse.app.core.api.Voucher
import com.synapse.app.core.api.VoucherRedemption
import com.synapse.app.core.billing.isTrialVoucher

const val BILLING_LOADING_TAG = "billing_loading"
const val BILLING_UNAVAILABLE_TAG = "billing_unavailable"
const val BILLING_CODE_FIELD_TAG = "billing_code_field"
const val BILLING_APPLY_BUTTON_TAG = "billing_apply_button"
const val BILLING_REMOVE_BUTTON_TAG = "billing_remove_button"

/**
 * The Billing tab's single public entry point. Constructs its own
 * [BillingViewModel] via [hiltViewModel] — no navigation wiring required of
 * the caller, mirroring `PerformanceRoute`/`AccountRoute`.
 *
 * Read-only entitlement state plus voucher redemption only: there is no
 * payment provider wired into this app (Play Billing is explicitly out of
 * scope here), so this screen never offers to buy, change or cancel a plan —
 * matching iOS `BillingView`/web `Billing.tsx`.
 */
@Composable
fun BillingRoute(viewModel: BillingViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    BillingScreen(
        uiState = uiState,
        onCodeChange = viewModel::onCodeChange,
        onRedeem = viewModel::redeem,
        onRemoveVoucher = viewModel::removeVoucher,
    )
}

@Composable
private fun BillingScreen(
    uiState: BillingUiState,
    onCodeChange: (String) -> Unit,
    onRedeem: () -> Unit,
    onRemoveVoucher: () -> Unit,
) {
    when (uiState) {
        BillingUiState.Loading -> Box(
            modifier = Modifier.fillMaxSize().testTag(BILLING_LOADING_TAG),
            contentAlignment = Alignment.Center,
        ) { CircularProgressIndicator() }

        BillingUiState.Unavailable -> Box(
            modifier = Modifier.fillMaxSize().testTag(BILLING_UNAVAILABLE_TAG),
            contentAlignment = Alignment.Center,
        ) {
            Text(
                "Billing could not be loaded. Check your connection and try again.",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(24.dp),
            )
        }

        is BillingUiState.Content -> LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            item { Text("Billing", style = MaterialTheme.typography.titleLarge) }
            item { YourPlanCard(uiState.entitlement) }
            item { PaymentsCard() }
            item {
                VoucherCard(
                    state = uiState,
                    onCodeChange = onCodeChange,
                    onRedeem = onRedeem,
                    onRemoveVoucher = onRemoveVoucher,
                )
            }
        }
    }
}

// --- Your plan -----------------------------------------------------------------

private fun entitlementLabel(state: String?): String = when (state) {
    "trialing" -> "Trial"
    "active" -> "Active"
    "expired" -> "Expired"
    "cancelled" -> "Cancelled"
    else -> "No subscription"
}

@Composable
private fun YourPlanCard(entitlement: MeEntitlement?) {
    PanelCard(title = "Your plan", badge = entitlementLabel(entitlement?.state)) {
        if (entitlement == null || entitlement.state == null || entitlement.state == "none") {
            Text(
                "No plan has been granted to your account yet. Plans are arranged on the website.",
                style = MaterialTheme.typography.bodyMedium,
            )
        } else {
            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(entitlement.plan ?: "Your plan", style = MaterialTheme.typography.headlineSmall)
                Text(runsUntilText(entitlement), style = MaterialTheme.typography.bodySmall)
                HorizontalDivider(modifier = Modifier.padding(vertical = 4.dp))
                Text(
                    "Subscriptions are managed by the team. To change or end your plan, use the website.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }
    }
}

private fun runsUntilText(entitlement: MeEntitlement): String {
    val expiry = entitlement.expiresAt
    if (expiry.isNullOrEmpty()) return "Open-ended · no expiry recorded"
    val days = entitlement.daysLeft ?: return "Runs until $expiry"
    val left = if (days == 1) "day left" else "days left"
    return "Runs until $expiry · $days $left"
}

// --- Payments --------------------------------------------------------------------

@Composable
private fun PaymentsCard() {
    PanelCard(title = "Payments") {
        Text(
            "This app does not take card payments, and stores no card details. Your plan is arranged on the website.",
            style = MaterialTheme.typography.bodyMedium,
        )
    }
}

// --- Voucher -----------------------------------------------------------------------

@Composable
private fun VoucherCard(
    state: BillingUiState.Content,
    onCodeChange: (String) -> Unit,
    onRedeem: () -> Unit,
    onRemoveVoucher: () -> Unit,
) {
    PanelCard(title = "Student voucher", badge = if (state.redemption != null) "Applied" else null) {
        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            val redemption = state.redemption
            if (redemption != null) {
                AppliedVoucherRow(redemption, state.appliedVoucher, state.trialDaysLeft, state.trialExpired, state.isBusy, onRemoveVoucher)
            } else {
                Text(
                    "Eligibility is checked on the server against your university, year, group, the voucher dates, and the remaining redemption limit.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
                    OutlinedTextField(
                        value = state.code,
                        onValueChange = onCodeChange,
                        placeholder = { Text("Enter voucher code") },
                        singleLine = true,
                        modifier = Modifier.weight(1f).testTag(BILLING_CODE_FIELD_TAG),
                    )
                    Button(
                        onClick = onRedeem,
                        enabled = state.code.isNotBlank() && !state.isBusy,
                        modifier = Modifier.testTag(BILLING_APPLY_BUTTON_TAG),
                    ) { Text("Apply") }
                }
            }
            if (!state.message.isNullOrEmpty()) {
                Text(state.message, style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}

@Composable
private fun AppliedVoucherRow(
    redemption: VoucherRedemption,
    voucher: Voucher?,
    trialDaysLeft: Int?,
    trialExpired: Boolean,
    isBusy: Boolean,
    onRemoveVoucher: () -> Unit,
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column {
            Text(redemption.code, style = MaterialTheme.typography.bodyLarge)
            Text(savingLine(voucher, trialDaysLeft, trialExpired), style = MaterialTheme.typography.bodySmall)
        }
        TextButton(onClick = onRemoveVoucher, enabled = !isBusy, modifier = Modifier.testTag(BILLING_REMOVE_BUTTON_TAG)) {
            Text("Remove")
        }
    }
}

/**
 * Mirrors iOS `BillingView.savingLine`, minus the numeric saving amount: this
 * screen doesn't load the plan-pricing catalogue (see `BillingRepository`'s
 * doc comment), so a discount voucher falls to the same honest
 * "Applied to your account" text iOS/web use whenever no price can be
 * resolved. The trial countdown is real, though — [trialDaysLeft]/
 * [trialExpired] come from the server's own `redeemedAt` via
 * [BillingViewModel]'s `now` seam, not a guess.
 */
private fun savingLine(voucher: Voucher?, trialDaysLeft: Int?, trialExpired: Boolean): String {
    if (voucher != null && isTrialVoucher(voucher)) {
        return when {
            trialExpired -> "Trial has ended."
            trialDaysLeft != null -> if (trialDaysLeft == 1) "Full access · 1 day left" else "Full access · $trialDaysLeft days left"
            else -> "Full access trial"
        }
    }
    return "Applied to your account"
}

// --- Shared card chrome ------------------------------------------------------------

@Composable
private fun PanelCard(title: String, badge: String? = null, content: @Composable () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(title, style = MaterialTheme.typography.titleMedium)
                if (badge != null) {
                    Text(badge, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.primary)
                }
            }
            content()
        }
    }
}
