import Foundation

/// The one shared container the app and the SynapseWidgets extension both
/// declare in their entitlements — see `Config/Synapse.entitlements` and
/// `Config/SynapseWidgets.entitlements`. The extension runs in its own
/// sandbox and cannot read the app's standard UserDefaults, so anything the
/// widgets or Live Activity need to read is written through this suite
/// instead — Focus tasks (`FocusTasksStore`) and the upcoming-schedule
/// snapshot (`WidgetSnapshot`).
enum AppGroup {
    static let suite = "group.com.nishany.app"
    static let defaults = UserDefaults(suiteName: suite) ?? .standard
}
