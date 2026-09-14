package com.synapse.app.feature.shell

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Icon
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp

/** Test tag on the More-hub row for [route], so tests can trigger it unambiguously. */
fun moreHubItemTag(route: String) = "more_hub_item_$route"

/**
 * The "More" tab's content: every [MORE_GROUPS] destination that doesn't fit in the 5-tab
 * [BOTTOM_DESTINATIONS] bar, grouped the same way the web sidebar groups them (`studentNav` in
 * `src/components/shell/nav.ts`) — mirroring the production iOS app's `MoreView`, which folds
 * the same "everything past the tab bar" surfaces behind one hub. Tapping a row invokes
 * [onNavigate] with that destination's route; [AppScaffold] wires this to a plain `NavHost`
 * push so the back stack returns here.
 */
@Composable
fun MoreHubScreen(onNavigate: (String) -> Unit, modifier: Modifier = Modifier) {
    // A plain scrolling Column, not a LazyColumn: the hub is a fixed ~16-row list, so lazy
    // composition buys nothing and every row stays composed — which also lets a test scroll
    // to any row by tag rather than fighting lazy off-screen recycling.
    Column(modifier = modifier.verticalScroll(rememberScrollState())) {
        MORE_GROUPS.forEach { group ->
            Text(
                text = stringResource(group.labelRes),
                style = MaterialTheme.typography.labelLarge,
                color = MaterialTheme.colorScheme.primary,
                modifier = Modifier.padding(start = 16.dp, top = 16.dp, bottom = 4.dp),
            )
            group.items.forEach { destination ->
                val label = stringResource(destination.labelRes)
                ListItem(
                    headlineContent = { Text(label) },
                    leadingContent = {
                        Icon(destination.icon, contentDescription = label)
                    },
                    modifier = Modifier
                        .testTag(moreHubItemTag(destination.route))
                        .clickable { onNavigate(destination.route) },
                )
            }
        }
    }
}
