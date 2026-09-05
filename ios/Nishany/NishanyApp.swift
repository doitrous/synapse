import SwiftUI

@main
struct NishanyApp: App {
    /// Kept for one reason: remote-notification registration has no SwiftUI
    /// equivalent, and the token arrives nowhere else.
    @UIApplicationDelegateAdaptor(PushDelegate.self) private var pushDelegate

    init() {
        Appearance.apply()
    }

    var body: some Scene {
        WindowGroup {
            RootView()
        }
    }
}
