import Foundation
import Network
import Observation

/// Whether the device currently has a usable network path.
///
/// One shared instance, read directly the same way `AppBlocker.shared` /
/// `PushRegistrar.shared` are — a value this cheap to observe does not need
/// environment plumbing. `NWPathMonitor`'s handler fires on its own queue, so
/// each update hops to the main actor through the static singleton (the same
/// pattern `PushRegistrar`'s UIKit callbacks use) rather than capturing
/// `self` across that boundary.
@MainActor
@Observable
final class Connectivity {
    static let shared = Connectivity()

    private(set) var isOnline = true
    /// Coarse transport, when there is one to report — wifi vs. cellular vs.
    /// nothing. Not load-bearing anywhere yet; kept because it's free off the
    /// same path update.
    private(set) var pathType: NWInterface.InterfaceType?

    private let monitor = NWPathMonitor()

    private init() {
        monitor.pathUpdateHandler = { path in
            Task { @MainActor in
                Connectivity.shared.apply(path)
            }
        }
        monitor.start(queue: DispatchQueue(label: "nishany.connectivity"))
    }

    private func apply(_ path: NWPath) {
        isOnline = path.status == .satisfied
        pathType = path.availableInterfaces.first?.type
    }
}
