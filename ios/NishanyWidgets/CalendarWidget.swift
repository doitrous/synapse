import SwiftUI
import WidgetKit

/// Structural copy of the app's `CalendarSnapshotItem` — see
/// `ios/Nishany/Core/Schedule/WidgetSnapshot.swift`, which publishes this
/// shape to the App Group after every dashboard refresh, reusing the app's
/// existing `Upcoming` merge rather than this extension re-deriving it.
private struct SharedCalendarItem: Codable {
    var title: String
    var start: Date
    var isExam: Bool
    var courseName: String?
}

private struct CalendarEntry: TimelineEntry {
    let date: Date
    let items: [SharedCalendarItem]
}

private struct CalendarProvider: TimelineProvider {
    private static let key = "nishany.widgets.calendar.v1"

    private func readItems() -> [SharedCalendarItem] {
        guard let data = AppGroup.defaults.data(forKey: Self.key) else { return [] }
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        return (try? decoder.decode([SharedCalendarItem].self, from: data)) ?? []
    }

    func placeholder(in context: Context) -> CalendarEntry {
        CalendarEntry(date: .now, items: [
            SharedCalendarItem(title: "Cardiology lecture", start: .now.addingTimeInterval(3600), isExam: false, courseName: "Cardiology"),
        ])
    }

    func getSnapshot(in context: Context, completion: @escaping (CalendarEntry) -> Void) {
        let items = context.isPreview ? placeholder(in: context).items : readItems()
        completion(CalendarEntry(date: .now, items: items))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<CalendarEntry>) -> Void) {
        // Absolute date/time text (not relative "in 2 hours") so this stays
        // correct without a periodic recompute — the app republishes and
        // reloads whenever the dashboard refreshes.
        // ponytail: a session that starts passes without a reload until the
        // next app refresh still shows it; upgrade to a short timeline with
        // several future reload points if that proves to matter.
        completion(Timeline(entries: [CalendarEntry(date: .now, items: readItems())], policy: .never))
    }
}

struct CalendarWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "CalendarWidget", provider: CalendarProvider()) { entry in
            CalendarWidgetView(items: entry.items)
                .containerBackground(.fill.tertiary, for: .widget)
        }
        .configurationDisplayName("Upcoming")
        .description("What's next on your timetable.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

private struct CalendarWidgetView: View {
    @Environment(\.widgetFamily) private var family
    let items: [SharedCalendarItem]

    private var visibleCount: Int { family == .systemSmall ? 1 : 3 }

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Label("Upcoming", systemImage: "calendar")
                .font(.caption.weight(.semibold))
                .foregroundStyle(.secondary)

            if items.isEmpty {
                Spacer(minLength: 0)
                Text("No upcoming sessions — your timetable will appear here")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Spacer(minLength: 0)
            } else {
                VStack(alignment: .leading, spacing: 8) {
                    ForEach(Array(items.prefix(visibleCount).enumerated()), id: \.offset) { _, item in
                        row(item)
                    }
                }
                Spacer(minLength: 0)
            }
        }
    }

    private func row(_ item: SharedCalendarItem) -> some View {
        HStack(alignment: .top, spacing: 6) {
            VStack(alignment: .leading, spacing: 1) {
                Text(item.start, style: .date)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                Text(item.start, style: .time)
                    .font(.caption.weight(.semibold))
            }
            .frame(width: 62, alignment: .leading)

            VStack(alignment: .leading, spacing: 1) {
                HStack(spacing: 4) {
                    Text(item.title)
                        .font(.caption)
                        .lineLimit(1)
                    if item.isExam {
                        Text("EXAM")
                            .font(.system(size: 8, weight: .bold))
                            .padding(.horizontal, 4)
                            .padding(.vertical, 1)
                            .background(.red.opacity(0.15))
                            .foregroundStyle(.red)
                            .clipShape(Capsule())
                    }
                }
                if let courseName = item.courseName {
                    Text(courseName)
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
            }
        }
    }
}
