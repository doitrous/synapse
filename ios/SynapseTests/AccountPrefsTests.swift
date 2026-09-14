import Testing
import Foundation
@testable import Synapse

/// What a student has chosen about being interrupted.
@Suite struct AccountPrefsTests {

    @Test func eachSwitchGovernsOnlyItsOwnKindOfReminder() {
        // Wanting to be told a lecture moved is not the same as wanting to be
        // told a concept is fading, so one switch must not silence the other.
        var prefs = AccountPrefs.default
        prefs.reviewReminders = false
        prefs.calendarReminders = true
        #expect(!prefs.allows(kind: "review"))
        #expect(prefs.allows(kind: "calendar"))

        prefs.reviewReminders = true
        prefs.calendarReminders = false
        #expect(prefs.allows(kind: "review"))
        #expect(!prefs.allows(kind: "timetable"))
    }

    @Test func anythingNeitherSwitchCoversIsStillDelivered() {
        // A student who turned off review nudges has not asked to stop hearing
        // that their exam moved, or that their account needs attention.
        var silent = AccountPrefs.default
        silent.reviewReminders = false
        silent.calendarReminders = false
        #expect(silent.allows(kind: "announcement"))
        #expect(silent.allows(kind: ""))
    }

    @Test func theKindIsMatchedWhateverCaseItWasWrittenIn() {
        var prefs = AccountPrefs.default
        prefs.reviewReminders = false
        prefs.calendarReminders = false
        #expect(!prefs.allows(kind: "Review"))
        #expect(!prefs.allows(kind: "CALENDAR"))
    }

    @Test func theDefaultsMatchTheWebsite() {
        // These four fields ARE the shared document; the defaults must be the
        // web's `DEFAULTS`, or a new student reads different values on each.
        let d = AccountPrefs.default
        #expect(d.reviewReminders)
        #expect(d.calendarReminders)
        #expect(d.dailyGoalQuestions == 30)
        #expect(d.reminderTime == "19:00")
    }

    /// The bug this guards: the two platforms write one shared document
    /// last-write-wins, so a field this struct fails to carry is a field the
    /// phone's next save silently erases. Decoding what the website wrote must
    /// keep every field, and re-encoding must give it all back.
    @Test func theRecordRoundTripsEveryFieldTheWebsiteWrote() throws {
        let json = """
        {"reviewReminders":false,"calendarReminders":true,"dailyGoalQuestions":45,"reminderTime":"08:30"}
        """
        let prefs = try JSONDecoder().decode(AccountPrefs.self, from: Data(json.utf8))
        #expect(!prefs.reviewReminders)
        #expect(prefs.calendarReminders)
        #expect(prefs.dailyGoalQuestions == 45)
        #expect(prefs.reminderTime == "08:30")

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

    @Test @MainActor func theDailyGoalNeverGoesNegative() async {
        // Stepping down past zero on the Account screen means "no goal", not a
        // negative one the Today ring would divide by.
        let store = AccountPrefsStore()
        await store.load()
        await store.set(dailyGoalQuestions: -5)
        #expect(store.prefs.dailyGoalQuestions == 0)
    }
}
