import Foundation

/// The Focus Timer's session state machine — a straight port of
/// `src/lib/focusSession.ts`, the reference both native ports mirror.
/// Deliberately dependency-free (no SwiftUI, no UIKit) so it reads as one
/// self-contained model and tests cleanly; `FocusSessionStore` is the only
/// place it meets UserDefaults, a ticking clock, and the network.
enum FocusMode: String, Codable, Sendable, Hashable {
    case countdown, countup
}

struct FocusSessionState: Codable, Equatable, Sendable {
    var mode: FocusMode
    /// Countdown target length. Irrelevant in count-up, but kept rather than
    /// dropped so switching back to countdown restores the student's last pick.
    var durationSeconds: Int
    /// Countdown only — clamped to `[0, durationSeconds]`.
    var remainingSeconds: Int
    /// Count-up only — seconds counted since the block started.
    var elapsedSeconds: Int
    var running: Bool
    var strictArmed: Bool
    var selectedTaskId: String?
    /// Wall clock the fields above were last accurate at. `tick` catches up
    /// from here, so a backgrounded app, a closed panel, or a relaunch all
    /// resume at the right second instead of freezing at the last write.
    var updatedAt: Date
    /// Set the moment a countdown reaches zero on its own; cleared by any
    /// user action (start, reset, mode/duration change). Nil in count-up.
    var completedAt: Date?
}

/// The pure transitions, namespaced as static functions (mirroring the
/// TypeScript module's free functions) rather than free functions at file
/// scope, so `start`/`pause`/`reset` don't collide with anything else in the
/// module.
enum FocusSession {
    static let defaultDurationMinutes = 25
    static let durationPresetsMinutes = [25, 50]
    static let minDurationMinutes = 5
    static let maxDurationMinutes = 180

    static func clampDurationMinutes(_ minutes: Double) -> Int {
        guard minutes.isFinite else { return defaultDurationMinutes }
        return min(maxDurationMinutes, max(minDurationMinutes, Int(minutes.rounded())))
    }

    static func initial(now: Date = Date()) -> FocusSessionState {
        let durationSeconds = defaultDurationMinutes * 60
        return FocusSessionState(
            mode: .countdown, durationSeconds: durationSeconds, remainingSeconds: durationSeconds,
            elapsedSeconds: 0, running: false, strictArmed: false, selectedTaskId: nil,
            updatedAt: now, completedAt: nil
        )
    }

    /// Seconds actually spent working this block — what credits study time.
    static func accruedSeconds(_ state: FocusSessionState) -> Int {
        state.mode == .countdown ? state.durationSeconds - state.remainingSeconds : state.elapsedSeconds
    }

    /// Catches a persisted state up to `now`. Pure, and safe to call on every
    /// read: idle state is returned untouched, so calling it speculatively
    /// costs nothing.
    static func tick(_ state: FocusSessionState, now: Date = Date()) -> FocusSessionState {
        guard state.running else { return state }
        let elapsed = max(0, Int(now.timeIntervalSince(state.updatedAt).rounded(.down)))
        guard elapsed > 0 else { return state }

        var next = state
        if state.mode == .countup {
            next.elapsedSeconds += elapsed
            next.updatedAt = now
            return next
        }
        let remaining = state.remainingSeconds - elapsed
        if remaining > 0 {
            next.remainingSeconds = remaining
            next.updatedAt = now
            return next
        }
        next.remainingSeconds = 0
        next.running = false
        next.updatedAt = now
        next.completedAt = now
        return next
    }

    static func setMode(_ state: FocusSessionState, _ mode: FocusMode, now: Date = Date()) -> FocusSessionState {
        guard state.mode != mode else { return state }
        var next = state
        next.mode = mode
        next.running = false
        next.updatedAt = now
        next.completedAt = nil
        if mode == .countdown {
            next.remainingSeconds = state.durationSeconds
        } else {
            next.elapsedSeconds = 0
        }
        return next
    }

    static func setDurationMinutes(_ state: FocusSessionState, _ minutes: Double, now: Date = Date()) -> FocusSessionState {
        let durationSeconds = clampDurationMinutes(minutes) * 60
        var next = state
        next.durationSeconds = durationSeconds
        next.remainingSeconds = durationSeconds
        next.running = false
        next.updatedAt = now
        next.completedAt = nil
        return next
    }

    static func start(_ state: FocusSessionState, now: Date = Date()) -> FocusSessionState {
        let caught = tick(state, now: now)
        if caught.running { return caught }
        // Starting again after a countdown finished restarts the block rather
        // than leaving "Start" dead at 0:00.
        var next = caught
        if caught.mode == .countdown, caught.remainingSeconds <= 0 {
            next.remainingSeconds = caught.durationSeconds
        }
        next.running = true
        next.updatedAt = now
        next.completedAt = nil
        return next
    }

    static func pause(_ state: FocusSessionState, now: Date = Date()) -> FocusSessionState {
        var next = tick(state, now: now)
        next.running = false
        next.updatedAt = now
        return next
    }

    static func reset(_ state: FocusSessionState, now: Date = Date()) -> FocusSessionState {
        var next = state
        next.remainingSeconds = state.durationSeconds
        next.elapsedSeconds = 0
        next.running = false
        next.updatedAt = now
        next.completedAt = nil
        return next
    }

    static func selectTask(_ state: FocusSessionState, _ taskId: String?) -> FocusSessionState {
        var next = state
        next.selectedTaskId = taskId
        return next
    }

    static func setStrictArmed(_ state: FocusSessionState, _ armed: Bool) -> FocusSessionState {
        var next = state
        next.strictArmed = armed
        return next
    }

    /// Strict mode's penalty for leaving: the running block is thrown away
    /// exactly as a manual reset would, rather than quietly paused and
    /// resumable. Whatever whole minutes already reached the server via the
    /// study-heartbeat stay credited — this only stops the block from
    /// counting as finished.
    static func discard(_ state: FocusSessionState, now: Date = Date()) -> FocusSessionState {
        reset(state, now: now)
    }

    static func formatClock(_ totalSeconds: Int) -> String {
        let safe = max(0, totalSeconds)
        let hours = safe / 3600
        let minutes = (safe % 3600) / 60
        let seconds = safe % 60
        if hours > 0 { return String(format: "%d:%02d:%02d", hours, minutes, seconds) }
        return String(format: "%d:%02d", minutes, seconds)
    }
}
