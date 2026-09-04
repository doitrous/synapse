import Foundation
import Observation

/// One thing a student can focus a block on.
///
/// Device-local, like the reader's `StudyTimer` — no server sync. Per Omar's
/// call to build a minimal task list now rather than wire up the real one,
/// this is intentionally thin: an id and a title, nothing else.
struct FocusTask: Codable, Identifiable, Equatable, Sendable {
    let id: String
    var title: String
}

@MainActor
@Observable
final class FocusTasksStore {
    private static let key = "nishany.focusTimer.tasks.v1"

    private(set) var tasks: [FocusTask]
    private let defaults: UserDefaults

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
        if let data = defaults.data(forKey: Self.key),
           let decoded = try? JSONDecoder().decode([FocusTask].self, from: data) {
            tasks = decoded
        } else {
            tasks = []
        }
    }

    /// Adds a task and returns its id, so the caller can select it
    /// immediately — mirrors `tasks.addTask` on the web, which the panel
    /// chains straight into `selectTask`. Blank titles are dropped rather
    /// than stored as an empty row.
    @discardableResult
    func add(title: String) -> String? {
        let trimmed = title.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return nil }
        let task = FocusTask(id: UUID().uuidString, title: trimmed)
        tasks.append(task)
        save()
        return task.id
    }

    func remove(_ id: String) {
        tasks.removeAll { $0.id == id }
        save()
    }

    private func save() {
        guard let data = try? JSONEncoder().encode(tasks) else { return }
        defaults.set(data, forKey: Self.key)
    }
}
