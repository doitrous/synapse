import Foundation
import WidgetKit

/// The small slice of `UpcomingItem` the calendar widget needs. The
/// NishanyWidgets extension can't run the app's sync/DB layer to derive
/// "what's next" itself, so the app publishes this after every dashboard
/// refresh and the widget just reads it — see `CalendarWidget` in the
/// extension, which keeps a structural copy of this shape (separate target,
/// can't import this type directly).
struct CalendarSnapshotItem: Codable {
    var title: String
    var start: Date
    var isExam: Bool
    var courseName: String?
}

enum WidgetSnapshot {
    private static let key = "nishany.widgets.calendar.v1"
    /// `CalendarWidget`'s `kind`, matched in `ios/NishanyWidgets/CalendarWidget.swift`.
    private static let widgetKind = "CalendarWidget"
    private static let maxItems = 5

    /// Call after computing the dashboard's merged upcoming list (both
    /// calendars). Only what's still to come is published — a widget stuck
    /// showing a lecture that already ended is worse than one that's briefly
    /// a few minutes stale until the next refresh.
    static func publish(_ items: [UpcomingItem], now: Date = Date()) {
        let snapshot: [CalendarSnapshotItem] = items
            .filter { ($0.end ?? $0.start) >= now }
            .prefix(maxItems)
            .map { CalendarSnapshotItem(title: $0.title, start: $0.start, isExam: $0.isExam, courseName: $0.courseName) }

        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .iso8601
        guard let data = try? encoder.encode(snapshot) else { return }
        AppGroup.defaults.set(data, forKey: key)
        WidgetCenter.shared.reloadTimelines(ofKind: widgetKind)
    }
}
