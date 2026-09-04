import ActivityKit
import Foundation
import Observation

/// The Focus Timer's live session: persisted device-local in UserDefaults —
/// like the reader's `StudyTimer`, never synced, so two devices don't fight
/// over one block — ticking once a second while running, and crediting study
/// time through the exact endpoint every other study surface already posts
/// to (`POST /maristanas/study-heartbeat`).
///
/// A straight port of `useFocusSession.ts`'s device-local half; the pure
/// transitions themselves live in `FocusSession`.
@MainActor
@Observable
final class FocusSessionStore {

    private static let storageKey = "nishany.focusTimer.session.v1"
    /// Grace window strict mode gives a student who backgrounds the app or
    /// glances at a notification before the running block is thrown away.
    private static let strictGraceSeconds: TimeInterval = 15
    private static let heartbeatInterval: Duration = .seconds(60)
    private static let heartbeatSurface = "focus-timer"

    private(set) var state: FocusSessionState
    /// Seconds left before strict mode discards the block, or nil while no
    /// grace window is running.
    private(set) var strictWarningSecondsLeft: Int?

    var accruedSeconds: Int { FocusSession.accruedSeconds(state) }

    private let api: SynapseAPI
    private let defaults: UserDefaults
    private var tickTask: Task<Void, Never>?
    private var heartbeatTask: Task<Void, Never>?
    private var graceTask: Task<Void, Never>?
    /// The wall-clock instant the grace window ends, checked directly on
    /// return to the foreground — the countdown `Task` is best-effort (iOS
    /// can suspend it while backgrounded), this deadline is what makes the
    /// discard correct even if that task never got to run.
    private var graceDeadline: Date?
    /// One id per run, matching `StudyActivityTracker`'s own convention —
    /// minted fresh only when a block actually starts.
    private var sessionId = UUID().uuidString

    /// The Focus Timer's Live Activity, if one is currently showing on the
    /// lock screen / Dynamic Island. Started when a block starts running,
    /// updated on pause/resume/task-change, ended on stop/complete/discard —
    /// see `mutate` and `startTicking`'s auto-complete path.
    private var activity: Activity<FocusActivityAttributes>?
    /// The selected task's title, kept alongside `state.selectedTaskId`
    /// purely for the Live Activity — `FocusSessionState` only stores the id,
    /// and the Activity's `ContentState` wants text to show.
    private var selectedTaskTitle: String?

    init(api: SynapseAPI, defaults: UserDefaults = .standard) {
        self.api = api
        self.defaults = defaults
        if let data = defaults.data(forKey: Self.storageKey),
           let stored = try? Self.decoder.decode(FocusSessionState.self, from: data) {
            state = FocusSession.tick(stored)
        } else {
            state = FocusSession.initial()
        }
        save()
        if state.running {
            resumeTicking()
            // Our own `activity` reference only ever lives in memory — if the
            // app was relaunched (not just backgrounded) while a block was
            // running, reattach to whatever ActivityKit itself kept alive.
            activity = Activity<FocusActivityAttributes>.activities.first
            if activity != nil {
                Task { [weak self] in await self?.updateActivity() }
            }
        }
    }

    // MARK: - Actions

    func setMode(_ mode: FocusMode) { mutate { FocusSession.setMode($0, mode) } }
    func setDurationMinutes(_ minutes: Double) { mutate { FocusSession.setDurationMinutes($0, minutes) } }
    func reset() { mutate { FocusSession.reset($0) } }
    func discard() { mutate { FocusSession.discard($0) } }

    /// `title` is only used to refresh the Live Activity's display — the
    /// persisted state keeps just `taskId`, same as before.
    func selectTask(_ taskId: String?, title: String? = nil) {
        selectedTaskTitle = title
        mutate { FocusSession.selectTask($0, taskId) }
    }

    func setStrictArmed(_ armed: Bool) {
        mutate { FocusSession.setStrictArmed($0, armed) }
        if !armed { clearGrace() }
    }

    func toggleRunning() {
        if state.running {
            // Pausing keeps the Live Activity alive (showing a frozen clock)
            // rather than ending it — only stop/complete/discard end it.
            mutate(endsActivityOnStop: false) { FocusSession.pause($0) }
        } else {
            sessionId = UUID().uuidString
            mutate { FocusSession.start($0) }
        }
    }

    // MARK: - Strict-mode grace (driven by the view's scenePhase)

    /// The app left the foreground. A no-op unless strict mode is armed on a
    /// running block — matching the web's blur/visibilitychange gate.
    func appDidLeaveForeground() {
        guard state.strictArmed, state.running, graceTask == nil else { return }
        armGrace()
    }

    /// The app returned to the foreground: catch the clock up, and settle
    /// the grace window one way or the other.
    func appDidEnterForeground() {
        state = FocusSession.tick(state)
        save()
        if let deadline = graceDeadline, Date() >= deadline {
            mutate { FocusSession.discard($0) }
        }
        clearGrace()
    }

    private func armGrace() {
        let deadline = Date().addingTimeInterval(Self.strictGraceSeconds)
        graceDeadline = deadline
        strictWarningSecondsLeft = Int(Self.strictGraceSeconds)
        graceTask = Task { [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(for: .seconds(1))
                guard let self, !Task.isCancelled else { return }
                let remaining = deadline.timeIntervalSinceNow
                if remaining <= 0 {
                    self.mutate { FocusSession.discard($0) }
                    self.clearGrace()
                    return
                }
                self.strictWarningSecondsLeft = Int(remaining.rounded(.up))
            }
        }
    }

    private func clearGrace() {
        graceTask?.cancel()
        graceTask = nil
        graceDeadline = nil
        strictWarningSecondsLeft = nil
    }

    // MARK: - Ticking, heartbeat, persistence

    private enum ActivitySync { case start, update, end, none }

    /// `endsActivityOnStop` distinguishes pause (Live Activity stays, shows
    /// paused) from reset/discard (Live Activity ends) when a mutation turns
    /// running off — `toggleRunning`'s pause branch is the one call site that
    /// passes `false`. When running doesn't change at all (e.g. `selectTask`
    /// while paused), an existing Activity is still refreshed so its title
    /// doesn't go stale.
    private func mutate(endsActivityOnStop: Bool = true, _ fn: (FocusSessionState) -> FocusSessionState) {
        let wasRunning = state.running
        state = fn(FocusSession.tick(state))
        save()

        let sync: ActivitySync
        if state.running {
            if !wasRunning { resumeTicking() }
            sync = activity == nil ? .start : .update
        } else {
            stopTicking()
            if wasRunning {
                sync = endsActivityOnStop ? .end : .update
            } else {
                sync = activity == nil ? .none : .update
            }
        }

        switch sync {
        case .start: Task { [weak self] in await self?.startActivity() }
        case .update: Task { [weak self] in await self?.updateActivity() }
        case .end: Task { [weak self] in await self?.endActivity() }
        case .none: break
        }
    }

    private func resumeTicking() {
        startTicking()
        startHeartbeat()
    }

    private func startTicking() {
        tickTask?.cancel()
        tickTask = Task { [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(for: .seconds(1))
                guard let self, !Task.isCancelled else { return }
                self.state = FocusSession.tick(self.state)
                self.save()
                if !self.state.running {
                    // Reaching zero on its own, not a user pause — the block
                    // is complete, so the Live Activity ends rather than
                    // freezing on "0:00".
                    self.stopTicking()
                    await self.endActivity()
                    return
                }
            }
        }
    }

    private func stopTicking() {
        tickTask?.cancel()
        tickTask = nil
        heartbeatTask?.cancel()
        heartbeatTask = nil
    }

    private func startHeartbeat() {
        heartbeatTask?.cancel()
        let sid = sessionId
        heartbeatTask = Task { [weak self] in
            while !Task.isCancelled {
                guard let self else { return }
                let bucket = Int(Date().timeIntervalSince1970 / 60)
                _ = try? await self.api.studyHeartbeat(bucket: bucket, sessionId: sid, surface: Self.heartbeatSurface)
                try? await Task.sleep(for: Self.heartbeatInterval)
            }
        }
    }

    private func save() {
        guard let data = try? Self.encoder.encode(state) else { return }
        defaults.set(data, forKey: Self.storageKey)
    }

    private static let encoder = JSONEncoder()
    private static let decoder = JSONDecoder()

    // MARK: - Live Activity

    /// No-op if Live Activities are unavailable or the student has turned
    /// them off — a block still runs perfectly well device-locally without
    /// one, so this never blocks or throws into the caller.
    private func startActivity() async {
        guard activity == nil, ActivityAuthorizationInfo().areActivitiesEnabled else { return }
        let attributes = FocusActivityAttributes(startedAt: Date())
        let content = ActivityContent(state: makeContentState(), staleDate: nil)
        activity = try? Activity.request(attributes: attributes, content: content)
    }

    private func updateActivity() async {
        guard let activity else { return }
        await activity.update(ActivityContent(state: makeContentState(), staleDate: nil))
    }

    private func endActivity() async {
        guard let activity else { return }
        await activity.end(ActivityContent(state: makeContentState(), staleDate: nil), dismissalPolicy: .immediate)
        self.activity = nil
    }

    private func makeContentState() -> FocusActivityAttributes.ContentState {
        let isCountdown = state.mode == .countdown
        return FocusActivityAttributes.ContentState(
            isCountdown: isCountdown,
            running: state.running,
            endDate: state.running && isCountdown
                ? Date().addingTimeInterval(TimeInterval(state.remainingSeconds)) : nil,
            startDate: state.running && !isCountdown
                ? Date().addingTimeInterval(-TimeInterval(state.elapsedSeconds)) : nil,
            taskTitle: selectedTaskTitle,
            displaySeconds: isCountdown ? state.remainingSeconds : state.elapsedSeconds
        )
    }
}
