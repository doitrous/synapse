package com.synapse.android.feature.focus

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.GlanceTheme
import androidx.glance.action.actionStartActivity
import androidx.glance.action.clickable
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import androidx.glance.appwidget.lazy.LazyColumn
import androidx.glance.appwidget.lazy.items
import androidx.glance.appwidget.provideContent
import androidx.glance.background
import androidx.glance.layout.Column
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.padding
import androidx.glance.semantics.contentDescription
import androidx.glance.semantics.semantics
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import com.synapse.android.MainActivity
import com.synapse.android.core.calendar.AgendaSnapshotItem
import java.time.LocalDate
import java.time.format.DateTimeFormatter

private val DATE_FORMAT = DateTimeFormatter.ofPattern("EEEE, MMM d")

/**
 * The home-screen calendar/timetable widget.
 *
 * Reads its agenda from [CalendarWidgetStore] -- the app precomputes it (see
 * [com.synapse.android.AppGraph]'s snapshot collector) so `provideGlance`
 * never has to open Room, which it must not do from the widget's process: see
 * [CalendarWidgetStore]'s doc. The exact sibling of how [FocusTasksWidget]
 * reads [FocusTasksStore], for the same reason.
 */
class FocusCalendarWidget : GlanceAppWidget() {
    override suspend fun provideGlance(context: Context, id: GlanceId) {
        val items = CalendarWidgetStore(context).items()
        provideContent {
            GlanceTheme(colors = GlanceCortexColors) {
                CalendarWidgetContent(items)
            }
        }
    }
}

class FocusCalendarWidgetReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = FocusCalendarWidget()
}

@Composable
private fun CalendarWidgetContent(items: List<AgendaSnapshotItem>) {
    Column(
        modifier = GlanceModifier
            .fillMaxSize()
            .background(GlanceTheme.colors.surface)
            .padding(12.dp)
            .clickable(actionStartActivity<MainActivity>())
            .semantics { contentDescription = "Open Nishany calendar" },
    ) {
        Text(
            LocalDate.now().format(DATE_FORMAT),
            style = TextStyle(color = GlanceTheme.colors.onSurface, fontWeight = FontWeight.Bold, fontSize = 14.sp),
        )
        if (items.isEmpty()) {
            Text(
                "Your timetable will appear here",
                style = TextStyle(color = GlanceTheme.colors.onSurfaceVariant, fontSize = 12.sp),
            )
        } else {
            LazyColumn {
                items(items, itemId = { it.hashCode().toLong() }) { item ->
                    Text(
                        "${item.whenLabel} — ${item.title}",
                        maxLines = 1,
                        style = TextStyle(
                            color = GlanceTheme.colors.onSurface,
                            fontSize = 13.sp,
                            fontWeight = if (item.isExam) FontWeight.Bold else FontWeight.Normal,
                        ),
                    )
                }
            }
        }
    }
}
