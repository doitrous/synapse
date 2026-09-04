import ActivityKit
import SwiftUI
import WidgetKit

/// The Focus Timer Live Activity's UI: the lock-screen banner and the Dynamic
/// Island, both drawn from `FocusActivityAttributes` (shared with the app, which
/// starts and updates the Activity). This is the minimal working configuration —
/// a self-updating clock and the task title; richer layout, colours and Dynamic
/// Island regions are filled in on top of it.
struct FocusActivityWidget: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: FocusActivityAttributes.self) { context in
            // Lock screen / banner.
            HStack {
                clock(for: context.state)
                    .font(.title2.monospacedDigit())
                if let title = context.state.taskTitle {
                    Text(title).lineLimit(1)
                }
            }
            .padding()
            .activityBackgroundTint(.black.opacity(0.4))
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.center) {
                    clock(for: context.state).font(.title.monospacedDigit())
                }
            } compactLeading: {
                Image(systemName: "timer")
            } compactTrailing: {
                clock(for: context.state).monospacedDigit()
            } minimal: {
                Image(systemName: "timer")
            }
        }
    }

    /// A clock that ticks on its own from the state's dates, so the Activity
    /// updates without the app pushing every second.
    @ViewBuilder
    private func clock(for state: FocusActivityAttributes.ContentState) -> some View {
        if state.isCountdown, let end = state.endDate {
            Text(timerInterval: Date.now...end, countsDown: true)
        } else if let start = state.startDate {
            Text(timerInterval: start...Date.distantFuture, countsDown: false)
        } else {
            Text("0:00")
        }
    }
}
