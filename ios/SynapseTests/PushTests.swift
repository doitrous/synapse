import Testing
import UIKit
@testable import Synapse

/// The silent nudge that makes sync instant.
///
/// The half that belongs to the app: turning Apple's token into the string the
/// server accepts, and answering a nudge by refreshing. Whether iOS chooses to
/// deliver a given push is Apple's half and cannot be asserted here.
@Suite(.serialized) @MainActor struct PushTests {

    @Test func aTokenBecomesTheHexStringTheServerAccepts() {
        let push = PushRegistrar.shared
        push.received(Data([0xab, 0x01, 0xff, 0x00]))
        // Lower-case hex, two characters a byte, no separators — what Apple's
        // own tooling prints and what `normaliseDeviceToken` matches.
        #expect(push.deviceToken == "ab01ff00")
    }

    @Test func arealTokenPassesTheServersOwnRule() {
        let push = PushRegistrar.shared
        // APNs issues 32 bytes.
        push.received(Data(repeating: 0x3f, count: 32))
        let token = try! #require(push.deviceToken)

        // The rule in `normaliseDeviceToken`: 32–255 characters, alphanumeric
        // only. A token that fails it registers nothing and nobody reports the
        // notification they never received.
        #expect(token.count == 64)
        #expect(token.allSatisfy { $0.isHexDigit })
        #expect(token.count >= 32 && token.count <= 255)
    }

    @Test func aFailureToRegisterIsRecordedRatherThanRaised() {
        let push = PushRegistrar.shared
        push.failed(NSError(domain: "APNs", code: 3000, userInfo: [
            NSLocalizedDescriptionKey: "no valid “aps-environment” entitlement string found for application",
        ]))
        #expect(!push.isRegistered)
        // The exact message that cost an hour to find, kept where it can be
        // read rather than thrown at a student.
        #expect(push.lastError?.contains("aps-environment") == true)
    }

    @Test func theEnvironmentMatchesHowTheBuildIsProvisioned() {
        // A token minted against sandbox means nothing to the production
        // gateway, so the server is told which rather than left to guess.
        #if DEBUG
        #expect(PushRegistrar.environment == "sandbox")
        #else
        #expect(PushRegistrar.environment == "production")
        #endif
    }

    @Test func aNudgeRefreshesAndReportsThatItDid() async {
        let push = PushRegistrar.shared
        var refreshes = 0
        push.onNudge = { refreshes += 1 }
        defer { push.onNudge = nil }

        let before = push.nudgesReceived
        await push.nudge()

        #expect(refreshes == 1)
        #expect(push.nudgesReceived == before + 1)
    }

    @Test func theDelegateAnswersEveryNudgeAndAlwaysCallsBack() async {
        // iOS kills an app that leaves the completion handler hanging, and it
        // stops delivering to one that reports no data for work it did do.
        let push = PushRegistrar.shared
        var refreshed = false
        push.onNudge = { refreshed = true }
        defer { push.onNudge = nil }

        let result: UIBackgroundFetchResult = await withCheckedContinuation { continuation in
            PushDelegate().application(
                UIApplication.shared,
                didReceiveRemoteNotification: ["aps": ["content-available": 1]],
                fetchCompletionHandler: { continuation.resume(returning: $0) }
            )
        }

        #expect(result == .newData)
        #expect(refreshed)
    }

    @Test func aNudgeCarriesNoContentTheAppIsAllowedToTrust() async {
        // The payload is a signal, not data. If the app ever read a value out
        // of it, a push APNs chose to drop would become a correctness problem —
        // and APNs does not promise delivery.
        let push = PushRegistrar.shared
        var seen = 0
        push.onNudge = { seen += 1 }
        defer { push.onNudge = nil }

        for payload in [["aps": ["content-available": 1]],
                        ["aps": ["content-available": 1], "k": "nishany.progress.attempts.v1"]] {
            _ = await withCheckedContinuation { (continuation: CheckedContinuation<UIBackgroundFetchResult, Never>) in
                PushDelegate().application(
                    UIApplication.shared,
                    didReceiveRemoteNotification: payload,
                    fetchCompletionHandler: { continuation.resume(returning: $0) }
                )
            }
        }
        // Both refresh identically: the key is for a log line, nothing more.
        #expect(seen == 2)
    }

    @Test func signingOutWithNoTokenIsNotAnError() async {
        // Sign-out runs on every account, including one that never registered.
        await PushRegistrar.shared.signOut()
    }
}
