import SwiftUI
import WidgetKit

/// Structural copy of the app's `FocusTask` — see
/// `ios/Synapse/Features/Focus/FocusTasks.swift`, which is the one that
/// actually writes this to the App Group. Decoding only cares about shape,
/// not type identity, so no shared file is needed across the two targets.
private struct SharedFocusTask: Codable, Identifiable {
    let id: String
    var title: String
}

private struct TasksEntry: TimelineEntry {
    let date: Date
    let tasks: [SharedFocusTask]
}

private struct TasksProvider: TimelineProvider {
    private static let key = "nishany.focusTimer.tasks.v1"

    private func readTasks() -> [SharedFocusTask] {
        guard let data = AppGroup.defaults.data(forKey: Self.key),
              let decoded = try? JSONDecoder().decode([SharedFocusTask].self, from: data)
        else { return [] }
        return decoded
    }

    func placeholder(in context: Context) -> TasksEntry {
        TasksEntry(date: .now, tasks: [
            SharedFocusTask(id: "1", title: "Review cardiology notes"),
            SharedFocusTask(id: "2", title: "Practice MCQs"),
        ])
    }

    func getSnapshot(in context: Context, completion: @escaping (TasksEntry) -> Void) {
        let tasks = context.isPreview ? placeholder(in: context).tasks : readTasks()
        completion(TasksEntry(date: .now, tasks: tasks))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<TasksEntry>) -> Void) {
        // No periodic recompute needed — the app calls `WidgetCenter.shared
        // .reloadTimelines(ofKind: "TasksWidget")` whenever the task list
        // actually changes, so this only needs to reflect what's stored now.
        completion(Timeline(entries: [TasksEntry(date: .now, tasks: readTasks())], policy: .never))
    }
}

struct TasksWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "TasksWidget", provider: TasksProvider()) { entry in
            TasksWidgetView(tasks: entry.tasks)
                .containerBackground(.fill.tertiary, for: .widget)
        }
        .configurationDisplayName("Focus Tasks")
        .description("Your Focus Timer task list.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

private struct TasksWidgetView: View {
    @Environment(\.widgetFamily) private var family
    let tasks: [SharedFocusTask]

    private var visibleCount: Int { family == .systemSmall ? 3 : 6 }

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Label("Focus", systemImage: "checklist")
                .font(.caption.weight(.semibold))
                .foregroundStyle(.secondary)

            if tasks.isEmpty {
                Spacer(minLength: 0)
                Text("No tasks yet — add one in Focus")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Spacer(minLength: 0)
            } else {
                VStack(alignment: .leading, spacing: 5) {
                    ForEach(tasks.prefix(visibleCount)) { task in
                        HStack(spacing: 6) {
                            Image(systemName: "circle")
                                .font(.caption2)
                                .foregroundStyle(.secondary)
                            Text(task.title)
                                .font(.caption)
                                .lineLimit(1)
                        }
                    }
                }
                if tasks.count > visibleCount {
                    Text("+\(tasks.count - visibleCount) more")
                        .font(.caption2)
                        .foregroundStyle(.tertiary)
                }
                Spacer(minLength: 0)
            }
        }
    }
}
