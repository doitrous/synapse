import Testing
import Foundation
@testable import Synapse

/// The privacy manifest ships, and says what the app actually does.
///
/// Apple rejects an upload without one, and the failure arrives at submission
/// rather than at build time — which is the worst moment to discover it. These
/// assertions are cheap insurance against the file being dropped, renamed out
/// of the bundle root, or edited into something that no longer parses.
@Suite struct PrivacyManifestTests {

    private var manifest: [String: Any] {
        get throws {
            let url = try #require(
                Bundle.main.url(forResource: "PrivacyInfo", withExtension: "xcprivacy"),
                "PrivacyInfo.xcprivacy is not in the app bundle"
            )
            let data = try Data(contentsOf: url)
            let plist = try PropertyListSerialization.propertyList(from: data, format: nil)
            return try #require(plist as? [String: Any])
        }
    }

    @Test func theManifestIsInTheBundleAndParses() throws {
        #expect(try !manifest.isEmpty)
    }

    @Test func theAppDoesNotClaimToTrack() throws {
        // There is no advertising, no analytics SDK, and nothing joined to
        // another company's data. Declaring otherwise would be a lie that
        // costs students their App Store privacy label.
        #expect(try manifest["NSPrivacyTracking"] as? Bool == false)
        #expect(try (manifest["NSPrivacyTrackingDomains"] as? [String])?.isEmpty == true)
    }

    @Test func userDefaultsIsDeclaredWithAReason() throws {
        // The app stores its own settings there — theme, language, reader
        // tools, the study timer. Apple requires the category *and* a reason
        // code; a category with no reason is rejected the same as no entry.
        let types = try #require(manifest["NSPrivacyAccessedAPITypes"] as? [[String: Any]])
        let defaults = try #require(
            types.first { $0["NSPrivacyAccessedAPIType"] as? String == "NSPrivacyAccessedAPICategoryUserDefaults" },
            "UserDefaults is used throughout the app and must be declared"
        )
        let reasons = try #require(defaults["NSPrivacyAccessedAPITypeReasons"] as? [String])
        #expect(reasons.contains("CA92.1"))
    }

    @Test func everyCollectedTypeSaysWhyItIsCollected() throws {
        let collected = try #require(manifest["NSPrivacyCollectedDataTypes"] as? [[String: Any]])
        #expect(!collected.isEmpty)

        for entry in collected {
            let name = entry["NSPrivacyCollectedDataType"] as? String ?? "(unnamed)"
            let purposes = entry["NSPrivacyCollectedDataTypePurposes"] as? [String] ?? []
            #expect(!purposes.isEmpty, "\(name) is collected for no stated purpose")
            // None of it is for tracking. If that ever changes, it must be a
            // decision someone makes on purpose, not a default that drifted.
            #expect(entry["NSPrivacyCollectedDataTypeTracking"] as? Bool == false,
                    "\(name) is marked as tracking")
        }
    }

    @Test func whatSignUpAsksForIsWhatTheManifestDeclares() throws {
        // Sign-up takes an email, a name and a phone number. A field collected
        // but undeclared is the exact mismatch App Review looks for.
        let collected = try #require(manifest["NSPrivacyCollectedDataTypes"] as? [[String: Any]])
        let declared = Set(collected.compactMap { $0["NSPrivacyCollectedDataType"] as? String })

        for required in ["NSPrivacyCollectedDataTypeEmailAddress",
                         "NSPrivacyCollectedDataTypeName",
                         "NSPrivacyCollectedDataTypePhoneNumber"] {
            #expect(declared.contains(required), "\(required) is asked for at sign-up but not declared")
        }
    }
}
