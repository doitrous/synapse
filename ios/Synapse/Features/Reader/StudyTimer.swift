import Foundation
import Observation

/// How long this sitting has been.
///
/// A port of `src/components/reader/StudyTimer.tsx`. It survives the app being
/// closed because a study session outlasts a process — putting the phone down
/// to answer the door should not reset the hour you have been sitting there.
///
/// Kept on the device rather than synced, like the rest of the reader's
/// preferences: it is about this sitting, not about the student.
@MainActor
@Observable
final class StudyTimer {

    private static let key = "nishany.reader.timer.v1"

    private struct Stored: Codable {
        var startedAt: Double?
        var accumulated: Double = 0
    }

    /// Redrawn once a second while running, which is all a clock needs.
    private(set) var elapsed: TimeInterval = 0
    private(set) var isRunning = false

    private var stored: Stored
    private var ticker: Task<Void, Never>?

    init() {
        let raw = UserDefaults.standard.data(forKey: Self.key)
        stored = raw.flatMap { try? JSONDecoder().decode(Stored.self, from: $0) } ?? Stored()
        isRunning = stored.startedAt != nil
        elapsed = total
        if isRunning { start() }
    }

    // No `deinit` cancel: it cannot touch main-actor state, and the tick holds
    // only a weak reference — it returns of its own accord once this is gone.

    private var total: TimeInterval {
        guard let startedAt = stored.startedAt else { return stored.accumulated }
        return stored.accumulated + (Date().timeIntervalSince1970 * 1000 - startedAt) / 1000
    }

    func toggle() {
        if isRunning {
            // Bank what has run so far, so the count is not lost on pause.
            stored.accumulated = total
            stored.startedAt = nil
            isRunning = false
            ticker?.cancel()
            ticker = nil
        } else {
            stored.startedAt = Date().timeIntervalSince1970 * 1000
            isRunning = true
            start()
        }
        elapsed = total
        save()
    }

    func reset() {
        ticker?.cancel()
        ticker = nil
        stored = Stored()
        isRunning = false
        elapsed = 0
        save()
    }

    private func start() {
        ticker?.cancel()
        ticker = Task { [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(for: .seconds(1))
                guard let self else { return }
                self.elapsed = self.total
            }
        }
    }

    private func save() {
        guard let data = try? JSONEncoder().encode(stored) else { return }
        UserDefaults.standard.set(data, forKey: Self.key)
    }

    /// `h:mm:ss` once there is an hour to show, `mm:ss` before that — an hour
    /// of leading zeros tells a student nothing.
    nonisolated static func clock(_ seconds: TimeInterval) -> String {
        let total = Int(max(seconds, 0))
        let hours = total / 3600
        let minutes = (total % 3600) / 60
        let secs = total % 60
        return hours > 0
            ? String(format: "%d:%02d:%02d", hours, minutes, secs)
            : String(format: "%02d:%02d", minutes, secs)
    }
}
