import SwiftUI

@main
struct SynapseApp: App {
    init() {
        Appearance.apply()
    }

    var body: some Scene {
        WindowGroup {
            RootView()
        }
    }
}
