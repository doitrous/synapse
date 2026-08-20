import UIKit
import Observation

/// Registers this device for the silent nudge that keeps sync instant.
///
/// The nudge carries no alert, badge or sound. iOS delivers a
/// `content-available` push without the student ever being asked, so this asks
/// for **no notification permission at all** — requesting one the feature does
/// not need is how an app trains people to say no to the prompts that matter.
/// Visible reminders are a separate feature and will ask separately.
///
/// What arrives is a signal, never content: "something of yours changed". The
/// app then refreshes through the ordinary sync path, so a push that is delayed
/// or dropped costs nothing — the next refresh finds the same change. That is
/// deliberate. A design where the payload *is* the change would make delivery a
/// correctness problem, and APNs does not promise delivery.
@MainActor
@Observable
final class PushRegistrar {

    /// One per app. The token arrives through `UIApplicationDelegate`, which is
    /// not somewhere a value can be injected, so the delegate needs a known
    /// place to put it.
    static let shared = PushRegistrar()

    private(set) var deviceToken: String?
    private(set) var lastError: String?
    /// True once the server has accepted this token.
    private(set) var isRegistered = false
    /// How many nudges have been acted on, for the sync readout.
    private(set) var nudgesReceived = 0

    /// What to do when a nudge lands. Set once the sync engine exists.
    var onNudge: (() async -> Void)?

    private var api: SynapseAPI?

    /// Which APNs environment this build's token belongs to.
    ///
    /// A token minted against sandbox is meaningless to the production gateway
    /// and vice versa, so the server is told which one to use rather than left
    /// to guess. Debug builds are provisioned for development; everything
    /// else — TestFlight included — is production.
    static var environment: String {
        #if DEBUG
        "sandbox"
        #else
        "production"
        #endif
    }

    private init() {}

    /// Begin, once there is an account to attach the device to.
    func start(api: SynapseAPI) {
        self.api = api
        UIApplication.shared.registerForRemoteNotifications()
        // A token can arrive before sign-in finishes. If it already has, it
        // still needs sending — the callback will not fire twice.
        if deviceToken != nil { Task { await send() } }
    }

    /// The token, as APNs hands it over.
    func received(_ token: Data) {
        // Hex, lower case: what the server's `normaliseDeviceToken` accepts and
        // what Apple's own tooling prints.
        deviceToken = token.map { String(format: "%02x", $0) }.joined()
        lastError = nil
        Task { await send() }
    }

    func failed(_ error: Error) {
        // Registration fails on a simulator without a paired push environment,
        // and on a device with no network. Neither is worth interrupting a
        // student over: sync still works, it just is not instant.
        isRegistered = false
        lastError = error.localizedDescription
    }

    /// Act on a nudge.
    func nudge() async {
        nudgesReceived += 1
        await onNudge?()
    }

    /// Stop sending to this device.
    ///
    /// Called before the session is torn down, while the token that authorises
    /// the delete is still valid. Afterwards the row would be unreachable and
    /// the next student on this phone would inherit the reminders.
    func signOut() async {
        guard let api, let deviceToken else { return }
        try? await api.unregisterDevice(token: deviceToken)
        isRegistered = false
        UIApplication.shared.unregisterForRemoteNotifications()
    }

    private func send() async {
        guard let api, let deviceToken else { return }
        do {
            try await api.registerDevice(
                token: deviceToken,
                environment: Self.environment,
                locale: Locale.current.identifier,
                appVersion: Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String
            )
            isRegistered = true
            lastError = nil
        } catch {
            // Worth recording but not worth retrying here: `start` runs on every
            // launch, and a token the server never received is sent again then.
            isRegistered = false
            lastError = String(describing: error)
        }
    }
}

/// The three callbacks that only reach a `UIApplicationDelegate`.
///
/// SwiftUI has no equivalent for remote-notification registration, so the app
/// keeps a delegate for exactly this and nothing else.
final class PushDelegate: NSObject, UIApplicationDelegate {

    func application(
        _ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        Task { @MainActor in PushRegistrar.shared.received(deviceToken) }
    }

    func application(
        _ application: UIApplication,
        didFailToRegisterForRemoteNotificationsWithError error: Error
    ) {
        Task { @MainActor in PushRegistrar.shared.failed(error) }
    }

    /// A nudge landed.
    ///
    /// `.newData` is returned whenever the refresh was attempted, rather than
    /// only when something changed. iOS uses this to decide how willing it is
    /// to wake the app again, and reporting `.noData` for a refresh that
    /// legitimately found nothing new would teach it to stop delivering the
    /// nudges that do carry a change.
    func application(
        _ application: UIApplication,
        didReceiveRemoteNotification userInfo: [AnyHashable: Any],
        fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
    ) {
        // The completion-handler form rather than the `async` one. Both are
        // valid Swift; only this one is unambiguously the selector UIKit looks
        // for on the delegate, and a silent push that is never delivered gives
        // no error to work back from.
        Task { @MainActor in
            await PushRegistrar.shared.nudge()
            completionHandler(.newData)
        }
    }
}
