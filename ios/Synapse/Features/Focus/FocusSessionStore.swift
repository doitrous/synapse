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
        if state.running { resumeTicking() }
    }

    // MARK: - Actions

    func setMode(_ mode: FocusMode) { mutate { FocusSession.setMode($0, mode) } }
    func setDurationMinutes(_ minutes: Double) { mutate { FocusSession.setDurationMinutes($0, minutes) } }
    func reset() { mutate { FocusSession.reset($0) } }
    func discard() { mutate { FocusSession.discard($0) } }
    func selectTask(_ taskId: String?) { mutate { FocusSession.selectTask($0, taskId) } }

    func setStrictArmed(_ armed: Bool) {
        mutate { FocusSession.setStrictArmed($0, armed) }
        if !armed { clearGrace() }
    }

    func toggleRunning() {
        if state.running {
            mutate { FocusSession.pause($0) }
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

    private func mutate(_ fn: (FocusSessionState) -> FocusSessionState) {
        let wasRunning = state.running
        state = fn(FocusSession.tick(state))
        save()
        if state.running {
            if !wasRunning { resumeTicking() }
        } else {
            stopTicking()
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
                if !self.state.running { self.stopTicking(); return }
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
}
