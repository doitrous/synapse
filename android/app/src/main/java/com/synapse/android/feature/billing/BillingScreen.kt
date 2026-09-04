package com.synapse.android.feature.billing

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.synapse.android.core.api.Entitlement
import com.synapse.android.core.api.PricingQuote
import com.synapse.android.core.api.VoucherRedemption
import com.synapse.android.core.ui.StateHost
import com.synapse.android.design.LocalCortex

/**
 * Billing (parity item G6): plan status, pricing for reference, and a
 * voucher redeem/release control. No payment flow of any kind -- there is no
 * gateway behind this app (see [BillingViewModel]'s class doc), so this
 * screen never offers a card field or a "buy" button, only what the account
 * already has and a code it can apply.
 */
@Composable
fun BillingScreen(viewModel: BillingViewModel, onBack: () -> Unit) {
    val uiState by viewModel.uiState.collectAsState()
    val busy by viewModel.busy.collectAsState()
    val message by viewModel.message.collectAsState()
    var code by remember { mutableStateOf("") }

    Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text("Billing", style = MaterialTheme.typography.headlineSmall, modifier = Modifier.weight(1f))
            TextButton(onClick = onBack) { Text("Back") }
        }

        StateHost(state = uiState, modifier = Modifier.weight(1f).padding(top = 12.dp)) { billing ->
            Column(
                modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(20.dp),
            ) {
                PlanPanel(entitlement = billing.entitlement)
                PricingPanel(monthly = billing.monthly, term = billing.term)
                VoucherPanel(
                    redemption = billing.redemption,
                    code = code,
                    onCodeChange = { code = it },
                    busy = busy,
                    message = message,
                    onApply = { viewModel.redeem(code); code = "" },
                    onRemove = viewModel::release,
                )
            }
        }
    }
}

@Composable
private fun Panel(title: String, badge: String? = null, content: @Composable () -> Unit) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(14.dp))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text(title, style = MaterialTheme.typography.titleSmall, color = cortex.ink2, modifier = Modifier.weight(1f))
            if (badge != null) {
                Text(badge, style = MaterialTheme.typography.labelSmall, color = cortex.primaryStrong)
            }
        }
        content()
    }
}

@Composable
private fun PlanPanel(entitlement: Entitlement?) {
    val cortex = LocalCortex.current
    val badge = entitlement?.state?.takeIf { it.isNotBlank() }?.replaceFirstChar { it.uppercase() } ?: "None"
    Panel(title = "Your plan", badge = badge) {
        if (entitlement == null || entitlement.state == "none") {
            Text(
                "No plan has been granted to your account yet. Plans are arranged on the website.",
                style = MaterialTheme.typography.bodyMedium,
                color = cortex.ink2,
            )
        } else {
            Text(entitlement.plan ?: "Your plan", style = MaterialTheme.typography.titleLarge, color = cortex.ink)
            val days = entitlement.daysLeft
            Text(
                if (days != null) "$days day${if (days == 1) "" else "s"} left" else "Open-ended — no expiry recorded",
                style = MaterialTheme.typography.bodySmall,
                color = cortex.ink3,
            )
            Text(
                "Subscriptions are managed by the Nishany team. To change or end your plan, use the website.",
                style = MaterialTheme.typography.bodySmall,
                color = cortex.ink3,
            )
        }
    }
}

@Composable
private fun PricingPanel(monthly: PricingQuote?, term: PricingQuote?) {
    val cortex = LocalCortex.current
    Panel(title = "Pricing") {
        val quotes = listOfNotNull(monthly?.let { it to "Monthly" }, term?.let { it to "Term" })
        if (quotes.isEmpty()) {
            Text("Pricing could not be loaded.", style = MaterialTheme.typography.bodySmall, color = cortex.ink3)
        } else {
            quotes.forEach { (quote, label) ->
                Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                    Text(label, style = MaterialTheme.typography.bodyMedium, color = cortex.ink2, modifier = Modifier.weight(1f))
                    Text(
                        "${quote.totalAmount.toInt()} ${quote.currency}",
                        style = MaterialTheme.typography.titleSmall,
                        color = cortex.ink,
                    )
                }
            }
        }
        Text(
            "Nishany does not take card payments in the app, and stores no card details. Your plan is arranged on the website.",
            style = MaterialTheme.typography.bodySmall,
            color = cortex.ink3,
        )
    }
}

@Composable
private fun VoucherPanel(
    redemption: VoucherRedemption?,
    code: String,
    onCodeChange: (String) -> Unit,
    busy: Boolean,
    message: String?,
    onApply: () -> Unit,
    onRemove: () -> Unit,
) {
    val cortex = LocalCortex.current
    Panel(title = "Student voucher", badge = if (redemption != null) "Applied" else null) {
        if (redemption != null) {
            Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Text(redemption.code, style = MaterialTheme.typography.titleSmall, color = cortex.ink, modifier = Modifier.weight(1f))
                TextButton(
                    onClick = onRemove,
                    enabled = !busy,
                    modifier = Modifier.semantics { contentDescription = "Remove voucher" },
                ) { Text("Remove") }
            }
        } else {
            Text(
                "Eligibility is checked on the server against your university, year, group, and the voucher's own dates and limit.",
                style = MaterialTheme.typography.bodySmall,
                color = cortex.ink3,
            )
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(
                    value = code,
                    onValueChange = onCodeChange,
                    label = { Text("Voucher code") },
                    singleLine = true,
                    modifier = Modifier
                        .weight(1f)
                        .semantics { contentDescription = "Voucher code" },
                )
                Button(onClick = onApply, enabled = code.isNotBlank() && !busy) { Text("Apply") }
            }
        }
        message?.let { Text(it, style = MaterialTheme.typography.bodySmall, color = cortex.ink2) }
    }
}
