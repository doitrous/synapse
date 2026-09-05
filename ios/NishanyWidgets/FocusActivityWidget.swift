import ActivityKit
import SwiftUI
import WidgetKit

/// The Focus Timer Live Activity's UI: the lock-screen banner and the full
/// Dynamic Island, both drawn from `FocusActivityAttributes` (shared with the
/// app, which starts, updates and ends the Activity from `FocusSessionStore`).
///
/// Read-only — no Pause/Stop buttons here.
/// ponytail: interactive `LiveActivityIntent` buttons would need App Intents
/// wired to `FocusSessionStore` across the extension boundary; a read-only
/// Live Activity is acceptable for this milestone, add if a student asks.
struct FocusActivityWidget: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: FocusActivityAttributes.self) { context in
            lockScreen(context.state)
                .activityBackgroundTint(.black.opacity(0.4))
                .activitySystemActionForegroundColor(.white)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Image(systemName: "timer")
                        .font(.title3)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    clock(for: context.state)
                        .font(.title3.monospacedDigit())
                }
                DynamicIslandExpandedRegion(.center) {
                    Text(context.state.taskTitle ?? "Focus")
                        .font(.subheadline.weight(.semibold))
                        .lineLimit(1)
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text(context.state.running ? "Focusing" : "Paused")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            } compactLeading: {
                Image(systemName: "timer")
            } compactTrailing: {
                clock(for: context.state)
                    .monospacedDigit()
                    .frame(width: 44)
            } minimal: {
                Image(systemName: "timer")
            }
        }
    }

    private func lockScreen(_ state: FocusActivityAttributes.ContentState) -> some View {
        HStack(spacing: 12) {
            Image(systemName: "timer")
                .font(.title2)
                .foregroundStyle(.white)
                .frame(width: 40, height: 40)
                .background(.white.opacity(0.15), in: Circle())

            VStack(alignment: .leading, spacing: 2) {
                Text(state.taskTitle ?? "Focus")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.white)
                    .lineLimit(1)
                Text(state.running ? "Focusing" : "Paused")
                    .font(.caption2)
                    .foregroundStyle(.white.opacity(0.7))
            }

            Spacer(minLength: 8)

            clock(for: state)
                .font(.title2.monospacedDigit())
                .foregroundStyle(.white)
        }
        .padding(16)
    }

    /// A clock that ticks on its own from the state's dates while running, so
    /// the Activity updates without the app pushing every second. While
    /// paused it falls back to `displaySeconds`, a frozen value — using
    /// `endDate`/`startDate` there would keep it visibly counting against a
    /// clock the app has actually stopped.
    @ViewBuilder
    private func clock(for state: FocusActivityAttributes.ContentState) -> some View {
        if state.running, state.isCountdown, let end = state.endDate {
            Text(timerInterval: Date.now...end, countsDown: true)
        } else if state.running, !state.isCountdown, let start = state.startDate {
            Text(timerInterval: start...Date.distantFuture, countsDown: false)
        } else {
            Text(formatClock(state.displaySeconds))
        }
    }

    private func formatClock(_ totalSeconds: Int) -> String {
        let safe = max(0, totalSeconds)
        let hours = safe / 3600
        let minutes = (safe % 3600) / 60
        let seconds = safe % 60
        if hours > 0 { return String(format: "%d:%02d:%02d", hours, minutes, seconds) }
        return String(format: "%d:%02d", minutes, seconds)
    }
}
