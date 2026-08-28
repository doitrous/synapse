import Foundation
import Observation

/// What a student has chosen about how the app treats them.
///
/// A port of the record behind the website's Account page. The two switches
/// decide which notification campaigns reach this student — the timetable ones
/// and the review ones are separate because wanting to be told a lecture moved
/// is not the same as wanting to be told a concept is fading.
///
/// The timezone is recorded rather than chosen: reminders are sent from the
/// server, which cannot know what a phone's clock is set to unless it is told.
struct AccountPrefs: Codable, Equatable, Sendable {
    var timezone: String
    var reviewReminders: Bool
    var calendarReminders: Bool

    /// The student's own, so dotted.
    static let key = "synapse.account.prefs.v1"

    static var `default`: AccountPrefs {
        AccountPrefs(
            timezone: TimeZone.current.identifier,
            reviewReminders: true,
            calendarReminders: true
        )
    }

    /// Whether a campaign of this kind is allowed through.
    ///
    /// Anything that is neither a review nor a calendar reminder is not covered
    /// by either switch and is delivered: a student who turned off review
    /// nudges has not asked to stop hearing that their exam moved.
    func allows(kind: String) -> Bool {
        switch kind.lowercased() {
        case "review", "reviews": reviewReminders
        case "calendar", "timetable", "schedule": calendarReminders
        default: true
        }
    }
}

@MainActor
@Observable
final class AccountPrefsStore {

    private(set) var prefs = AccountPrefs.default
    /// False until the first read succeeds. Writing before then would replace
    /// the student's choices with this device's defaults.
    private(set) var isLoaded = false

    private let api: SynapseAPI?
    private let sync: SyncEngine?

    init(api: SynapseAPI? = nil, sync: SyncEngine? = nil) {
        self.api = api
        self.sync = sync
    }

    func load() async {
        guard let api else { isLoaded = true; return }
        if let stored = (try? await api.userState(AccountPrefs.self, key: AccountPrefs.key))?.value {
            prefs = stored
        }
        isLoaded = true
    }

    func set(reviewReminders: Bool) async {
        prefs.reviewReminders = reviewReminders
        await save()
    }

    func set(calendarReminders: Bool) async {
        prefs.calendarReminders = calendarReminders
        await save()
    }

    /// Record the device's timezone when it differs from what is stored.
    ///
    /// A student who flies home for the holidays should not get a reminder at
    /// four in the morning because the server still thinks they are in Cairo.
    func syncTimezone() async {
        let current = TimeZone.current.identifier
        guard isLoaded, prefs.timezone != current else { return }
        prefs.timezone = current
        await save()
    }

    private func save() async {
        guard isLoaded else { return }
        await sync?.write(key: AccountPrefs.key, value: prefs)
    }
}
