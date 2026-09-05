package com.nishany.android.feature.focus

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import androidx.glance.GlanceTheme
import androidx.glance.appwidget.lazy.LazyColumn
import androidx.glance.appwidget.lazy.items
import androidx.glance.appwidget.provideContent
import androidx.glance.background
import androidx.glance.action.actionStartActivity
import androidx.glance.action.clickable
import androidx.glance.layout.Column
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.padding
import androidx.glance.semantics.contentDescription
import androidx.glance.semantics.semantics
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import com.nishany.android.MainActivity

/**
 * The home-screen to-do widget: [FocusTasksStore]'s items, the same
 * device-local list the Focus Timer's task picker reads from -- see that
 * store's class doc for why it is intentionally minimal (no sync, no
 * done/open state).
 *
 * Reads the store fresh on every [provideGlance] call rather than caching
 * anything of its own, so it never drifts from what the Focus Timer shows;
 * [FocusTimerScreen]'s add-task flow also calls `updateAll` directly so a
 * newly added task appears without waiting on the OS's own update cadence.
 */
class FocusTasksWidget : GlanceAppWidget() {
    override suspend fun provideGlance(context: Context, id: GlanceId) {
        val tasks = FocusTasksStore(context).tasks.value
        provideContent {
            GlanceTheme(colors = GlanceCortexColors) {
                TasksWidgetContent(tasks)
            }
        }
    }
}

class FocusTasksWidgetReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = FocusTasksWidget()
}

@Composable
private fun TasksWidgetContent(tasks: List<FocusTask>) {
    Column(
        modifier = GlanceModifier
            .fillMaxSize()
            .background(GlanceTheme.colors.surface)
            .padding(12.dp)
            .clickable(actionStartActivity<MainActivity>())
            .semantics { contentDescription = "Open Nishany to-do list" },
    ) {
        Text(
            "To-Do",
            style = TextStyle(color = GlanceTheme.colors.onSurface, fontWeight = FontWeight.Bold, fontSize = 14.sp),
        )
        if (tasks.isEmpty()) {
            Text(
                "No tasks yet -- add one in Focus",
                style = TextStyle(color = GlanceTheme.colors.onSurfaceVariant, fontSize = 12.sp),
            )
        } else {
            LazyColumn {
                items(tasks, itemId = { it.id.hashCode().toLong() }) { task ->
                    Text(
                        "• ${task.title}",
                        maxLines = 1,
                        style = TextStyle(color = GlanceTheme.colors.onSurface, fontSize = 13.sp),
                    )
                }
            }
        }
    }
}
