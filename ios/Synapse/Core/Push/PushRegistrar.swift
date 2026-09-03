import UIKit
import UserNotifications
import Observation

/// Registers this device for the silent nudge that keeps sync instant, and —
/// once signed in — for the visible "Question of the Day is waiting" reminder.
///
/// The sync nudge carries no alert, badge or sound: iOS delivers a
/// `content-available` push without the student ever being asked, and that
/// path asks for no permission at all. A design where the payload *is* the
/// change would make delivery a correctness problem, and APNs does not
/// promise delivery, so a push that is delayed or dropped costs nothing — the
/// next refresh finds the same change.
///
/// The reminder is different: it is meant to be seen, so it does need
/// permission. That prompt is asked for here too, but only once there is an
/// account to attach it to — asking at cold launch, before a student has any
/// reason to trust the app yet, is how you train someone to say no to the
/// prompt that matters.
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

    /// A path from a tapped reminder (e.g. `/app/qotd`), waiting to be routed.
    ///
    /// The tap can land before there is anywhere to route it to — the app may
    /// still be launching — so it is held here rather than acted on directly,
    /// and consumed once a screen is ready to look at it.
    private(set) var pendingRoute: String?

    /// Whether the student has said yes to the visible reminder prompt.
    ///
    /// `nil` until the first check completes — reading it needs an async round
    /// trip to Notification Center, so this starts unknown rather than
    /// guessing "not granted" and flashing an enable row that then disappears.
    private(set) var reminderAuthorization: UNAuthorizationStatus?

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
    ///
    /// Registers for the silent sync nudge only. That needs a device token but
    /// no permission at all — `registerForRemoteNotifications` shows no system
    /// UI on its own — so this runs unconditionally on every sign-in. The
    /// *visible* reminder is a separate, user-facing permission and is asked
    /// for by `requestReminderPermission()` instead, only when a student taps
    /// a row that says why: iOS shows that dialog exactly once, and asking
    /// here, on a path nobody chose, is how you teach someone to decline it.
    func start(api: SynapseAPI) async {
        self.api = api
        UIApplication.shared.registerForRemoteNotifications()
        // A token can arrive before sign-in finishes. If it already has, it
        // still needs sending — the callback will not fire twice.
        if deviceToken != nil { Task { await send() } }
        await refreshReminderAuthorization()
    }

    /// What the system currently says about the visible-reminder permission,
    /// without asking for anything.
    func refreshReminderAuthorization() async {
        reminderAuthorization = await UNUserNotificationCenter.current()
            .notificationSettings().authorizationStatus
    }

    /// The one system prompt this app shows — triggered only by an explicit
    /// tap on a row that has already explained what it is for.
    func requestReminderPermission() async {
        do {
            _ = try await UNUserNotificationCenter.current()
                .requestAuthorization(options: [.alert, .sound, .badge])
        } catch {
            // A student who never sees the system prompt (Screen Time
            // restrictions, an unusual MDM profile) still gets sync.
        }
        await refreshReminderAuthorization()
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

    /// A reminder was tapped. Recorded for whichever screen is ready to route it.
    func routeTapped(_ path: String) {
        pendingRoute = path
    }

    /// Take the pending route, if any, so the same tap is never acted on twice.
    func consumePendingRoute() -> String? {
        defer { pendingRoute = nil }
        return pendingRoute
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

/// The callbacks that only reach a `UIApplicationDelegate`, plus how a
/// notification behaves once permission has been granted.
///
/// SwiftUI has no equivalent for remote-notification registration, so the app
/// keeps a delegate for exactly this. It doubles as the
/// `UNUserNotificationCenterDelegate` for the same reason: both are things
/// only a delegate object can be told, and there is exactly one of each in
/// this app.
final class PushDelegate: NSObject, UIApplicationDelegate {

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        // Set at launch, before any permission is requested or any push can
        // arrive — `start(api:)` only asks for permission later, once a
        // student has signed in, but a foreground alert or a tap can only be
        // shaped correctly if the delegate is already listening by then.
        UNUserNotificationCenter.current().delegate = self
        return true
    }

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

extension PushDelegate: UNUserNotificationCenterDelegate {

    /// A visible reminder arrived while the app was already open.
    ///
    /// Without this, a foreground notification is silent by default — the
    /// system assumes an app on screen already knows. A reminder is worth
    /// showing anyway: a student mid-session may still want the badge and
    /// sound rather than discovering it later.
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification,
        withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
    ) {
        completionHandler([.banner, .sound])
    }

    /// A reminder was tapped.
    ///
    /// Recorded rather than acted on directly: this delegate has no view of
    /// the tab bar or navigation state, and the app may still be launching.
    /// Whichever screen is ready reads it back with `consumePendingRoute()`.
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Void
    ) {
        // "path" mirrors the server's `sendApnsAlert` payload
        // (`server/src/push.js`); falling back to the QotD route is safe
        // because a visible reminder never sends anywhere else today.
        let path = response.notification.request.content.userInfo["path"] as? String ?? "/app/qotd"
        Task { @MainActor in
            PushRegistrar.shared.routeTapped(path)
            completionHandler()
        }
    }
}
