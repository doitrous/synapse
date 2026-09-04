import Foundation

/// The one shared container the app and this extension both declare in
/// their entitlements — see `Config/Synapse.entitlements` and
/// `Config/SynapseWidgets.entitlements`. A structural duplicate of
/// `ios/Synapse/Core/AppGroup.swift`: this extension is a separate target
/// (module), so the two small files can't share one declaration without an
/// Xcode project edit that isn't warranted for one constant.
enum AppGroup {
    static let suite = "group.com.nishany.app"
    static let defaults = UserDefaults(suiteName: suite) ?? .standard
}
