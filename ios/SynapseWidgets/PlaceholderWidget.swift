import SwiftUI
import WidgetKit

/// Placeholder so the extension target has a buildable widget from the first
/// commit. Replaced by the real to-do and calendar widgets.
struct PlaceholderWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "PlaceholderWidget", provider: PlaceholderProvider()) { entry in
            Text(entry.date, style: .time)
                .containerBackground(.fill.tertiary, for: .widget)
        }
        .configurationDisplayName("Nishany")
        .description("Placeholder.")
        .supportedFamilies([.systemSmall])
    }
}

private struct PlaceholderEntry: TimelineEntry {
    let date: Date
}

private struct PlaceholderProvider: TimelineProvider {
    func placeholder(in context: Context) -> PlaceholderEntry { PlaceholderEntry(date: .now) }
    func getSnapshot(in context: Context, completion: @escaping (PlaceholderEntry) -> Void) {
        completion(PlaceholderEntry(date: .now))
    }
    func getTimeline(in context: Context, completion: @escaping (Timeline<PlaceholderEntry>) -> Void) {
        completion(Timeline(entries: [PlaceholderEntry(date: .now)], policy: .never))
    }
}
