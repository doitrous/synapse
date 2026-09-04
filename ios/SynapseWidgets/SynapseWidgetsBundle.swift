import SwiftUI
import WidgetKit

/// The widget extension's entry point. Every home-screen widget and the Focus
/// Timer Live Activity the app vends are declared here — WidgetKit builds the
/// bundle from whatever this `body` lists.
@main
struct SynapseWidgetsBundle: WidgetBundle {
    var body: some Widget {
        TasksWidget()
        CalendarWidget()
        FocusActivityWidget()
    }
}
