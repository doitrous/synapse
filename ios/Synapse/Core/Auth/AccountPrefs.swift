import Foundation
import Observation

/// What a student has chosen about how the app treats them.
///
/// A port of the record behind the website's Account page, and it must stay the
/// **same shape** as the web's `AccountPrefs` — the two write to one shared
/// document (`nishany.account.prefs.v1`), last-write-wins, so a field this
/// struct does not carry is a field the other platform's next save silently
/// erases. The web's shape is exactly these four keys.
///
/// The two switches decide which notification campaigns reach this student — the
/// timetable ones and the review ones are separate because wanting to be told a
/// lecture moved is not the same as wanting to be told a concept is fading.
///
/// `timezone` is deliberately NOT here: it is not a preference on this document.
/// The server reads a student's timezone from their profile row (see
/// `qotdReminders.js`), which the web sets with `PUT /api/me/profile`; this app
/// does the same in `AccountPrefsStore.syncTimezone`. Writing it into this doc
/// (as an earlier version did) reached no reader and wiped the study prefs.
struct AccountPrefs: Codable, Equatable, Sendable {
    var reviewReminders: Bool
    var calendarReminders: Bool
    /// Study preferences — kept on the shared document so they follow the
    /// student across devices, as on the web.
    var dailyGoalQuestions: Int
    var reminderTime: String

    /// The student's own, so dotted.
    static let key = "nishany.account.prefs.v1"

    /// Matches the web's `DEFAULTS`.
    static var `default`: AccountPrefs {
        AccountPrefs(
            reviewReminders: true,
            calendarReminders: true,
            dailyGoalQuestions: 30,
            reminderTime: "19:00"
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

    /// The timezone this device last pushed to the profile, so a launch that
    /// changes nothing does not PUT again. Per-device, so `UserDefaults`.
    private static let pushedTimezoneKey = "nishany.account.pushedTimezone"

    init(api: SynapseAPI? = nil, sync: SyncEngine? = nil) {
        self.api = api
        self.sync = sync
    }

    func load() async {
        guard let api else { isLoaded = true; return }
        // A never-written key 404s; that is an empty record, not a failure, so
        // the switches must still unlock. Any other error leaves them locked.
        do {
            if let stored = try await api.userState(AccountPrefs.self, key: AccountPrefs.key).value {
                prefs = stored
            }
            isLoaded = true
        } catch APIError.notFound {
            isLoaded = true
        } catch {
            // Left locked: a failed read must not let a write overwrite the
            // student's real choices with this device's defaults.
        }
    }

    func set(reviewReminders: Bool) async {
        prefs.reviewReminders = reviewReminders
        await save()
    }

    func set(calendarReminders: Bool) async {
        prefs.calendarReminders = calendarReminders
        await save()
    }

    /// How many questions a day the student aims for. Drives the Today ring;
    /// clamped at zero, and stepped in fives on the way in, like the web.
    func set(dailyGoalQuestions: Int) async {
        prefs.dailyGoalQuestions = max(0, dailyGoalQuestions)
        await save()
    }

    /// Record the device's timezone on the profile when it differs from what
    /// was last pushed from here.
    ///
    /// A student who flies home for the holidays should not get a reminder at
    /// four in the morning because the server still thinks they are in Cairo.
    /// This writes the profile row the reminder sender actually reads, not the
    /// preferences document, and only when the zone has moved.
    func syncTimezone() async {
        guard let api else { return }
        let current = TimeZone.current.identifier
        let pushed = UserDefaults.standard.string(forKey: Self.pushedTimezoneKey)
        guard current != pushed else { return }
        do {
            try await api.putProfile(timezone: current)
            UserDefaults.standard.set(current, forKey: Self.pushedTimezoneKey)
        } catch {
            // Best-effort; it retries on the next launch since nothing is
            // recorded as pushed.
        }
    }

    private func save() async {
        guard isLoaded else { return }
        await sync?.write(key: AccountPrefs.key, value: prefs)
    }
}
