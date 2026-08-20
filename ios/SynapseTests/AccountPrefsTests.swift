import Testing
import Foundation
@testable import Synapse

/// What a student has chosen about being interrupted.
@Suite struct AccountPrefsTests {

    @Test func eachSwitchGovernsOnlyItsOwnKindOfReminder() {
        // Wanting to be told a lecture moved is not the same as wanting to be
        // told a concept is fading, so one switch must not silence the other.
        var prefs = AccountPrefs(timezone: "Africa/Cairo", reviewReminders: false, calendarReminders: true)
        #expect(!prefs.allows(kind: "review"))
        #expect(prefs.allows(kind: "calendar"))

        prefs = AccountPrefs(timezone: "Africa/Cairo", reviewReminders: true, calendarReminders: false)
        #expect(prefs.allows(kind: "review"))
        #expect(!prefs.allows(kind: "timetable"))
    }

    @Test func anythingNeitherSwitchCoversIsStillDelivered() {
        // A student who turned off review nudges has not asked to stop hearing
        // that their exam moved, or that their account needs attention.
        let silent = AccountPrefs(timezone: "Africa/Cairo", reviewReminders: false, calendarReminders: false)
        #expect(silent.allows(kind: "announcement"))
        #expect(silent.allows(kind: ""))
    }

    @Test func theKindIsMatchedWhateverCaseItWasWrittenIn() {
        let prefs = AccountPrefs(timezone: "Africa/Cairo", reviewReminders: false, calendarReminders: false)
        #expect(!prefs.allows(kind: "Review"))
        #expect(!prefs.allows(kind: "CALENDAR"))
    }

    @Test func bothRemindersAreOnUntilAStudentSaysOtherwise() {
        #expect(AccountPrefs.default.reviewReminders)
        #expect(AccountPrefs.default.calendarReminders)
        #expect(!AccountPrefs.default.timezone.isEmpty)
    }

    @Test func theRecordRoundTripsAsTheWebsiteWroteIt() throws {
        let json = """
        {"timezone":"Africa/Cairo","reviewReminders":false,"calendarReminders":true}
        """
        let prefs = try JSONDecoder().decode(AccountPrefs.self, from: Data(json.utf8))
        #expect(prefs.timezone == "Africa/Cairo")
        #expect(!prefs.reviewReminders)

        let again = try JSONDecoder().decode(AccountPrefs.self, from: JSONEncoder().encode(prefs))
        #expect(again == prefs)
    }

    @Test func theKeyIsStudentOwnedSoTheServerWillAcceptTheWrite() {
        // A hyphenated key would be refused, and the phone would be writing
        // preferences the website never reads.
        #expect(StateOwnership.isUserOwned(AccountPrefs.key))
    }

    @Test @MainActor func aStoreWithNothingToReadStillFinishesLoading() async {
        // Otherwise the switches would sit disabled forever on a device that
        // cannot reach the server, and a student could never turn one off.
        let store = AccountPrefsStore()
        #expect(!store.isLoaded)
        await store.load()
        #expect(store.isLoaded)
        #expect(store.prefs.reviewReminders)
    }

    @Test @MainActor func achangeIsHeldEvenWhenThereIsNowhereToSendIt() async {
        // The switch must move under the student's finger regardless; the
        // record catches up when there is something to write to.
        let store = AccountPrefsStore()
        await store.load()
        await store.set(reviewReminders: false)
        #expect(!store.prefs.reviewReminders)
    }
}
