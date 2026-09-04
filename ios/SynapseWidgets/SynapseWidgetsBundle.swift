import SwiftUI
import WidgetKit

/// The widget extension's entry point. Every home-screen widget and the Focus
/// Timer Live Activity the app vends are declared here — WidgetKit builds the
/// bundle from whatever this `body` lists.
///
/// The scaffold ships one placeholder widget so the target has content and
/// builds; the real to-do widget, calendar widget and
/// `FocusActivityConfiguration` (Live Activity) are added on top of it.
@main
struct SynapseWidgetsBundle: WidgetBundle {
    var body: some Widget {
        PlaceholderWidget()
    }
}
