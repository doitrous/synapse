import ActivityKit
import Foundation

/// The Focus Timer Live Activity's shape, shared by two targets: the app
/// (which starts, updates and ends the Activity from `FocusSessionStore`) and
/// the NishanyWidgets extension (which draws the lock-screen and Dynamic
/// Island UI). ActivityKit matches the app's `Activity<FocusActivityAttributes>`
/// to the extension's `ActivityConfiguration(for: FocusActivityAttributes.self)`
/// by this type, so the one file is a member of BOTH targets — see the
/// membership exception on the app's synchronized group in project.pbxproj.
///
/// The static `attributes` hold what never changes for a block; `ContentState`
/// holds what each update carries. Countdown drives a self-updating clock off
/// `endDate` (`Text(timerInterval:)`) so the Live Activity ticks without the
/// app pushing every second; count-up uses `startDate`.
struct FocusActivityAttributes: ActivityAttributes {
    struct ContentState: Codable, Hashable {
        /// True for a pomodoro countdown, false for count-up.
        var isCountdown: Bool
        var running: Bool
        /// When the current countdown reaches zero. Nil in count-up.
        var endDate: Date?
        /// When the current count-up block started counting. Nil in countdown.
        var startDate: Date?
        /// The selected task's title, or nil for an untitled block.
        var taskTitle: String?
        /// Remaining (countdown) or elapsed (count-up) seconds, frozen at the
        /// moment this state was pushed. The self-updating clock uses
        /// `endDate`/`startDate` while `running`; those are wall-clock
        /// intervals, so while paused they'd keep visibly ticking against a
        /// clock the app has actually stopped — this is what the widget shows
        /// instead when `running` is false.
        var displaySeconds: Int
    }

    /// Stable for the life of the Activity — nothing block-specific yet, but a
    /// non-empty attributes type keeps the door open (e.g. a chosen theme).
    var startedAt: Date
}
