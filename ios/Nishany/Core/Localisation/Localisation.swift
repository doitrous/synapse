import Foundation
import Observation
import SwiftUI

/// Which language the student reads in.
enum AppLanguage: String, CaseIterable, Codable, Sendable {
    case en, ar

    /// In its own language, which is how a language picker is read: someone
    /// looking for Arabic is looking for "العربية", not for "Arabic".
    var ownName: String {
        switch self {
        case .en: "English"
        case .ar: "العربية"
        }
    }

    var layoutDirection: LayoutDirection {
        self == .ar ? .rightToLeft : .leftToRight
    }

    var locale: Locale { Locale(identifier: self == .ar ? "ar" : "en") }
}

/// The language the app is in, and the words to say it in.
///
/// A port of `src/lib/i18n.tsx`. Two things make this a synced record rather
/// than a device setting: `synapse-lang` is in the user-owned list on both
/// platforms, and a student who chose Arabic on a laptop has chosen Arabic.
///
/// Kept in `UserDefaults` as well, and read from there first. The server round
/// trip takes a moment, and starting every launch in English before flipping to
/// Arabic a second later is worse than starting in the language the student
/// last used.
@MainActor
@Observable
final class Localisation {

    static let key = "synapse-lang"

    private(set) var language: AppLanguage

    private let api: NishanyAPI?
    private let sync: SyncEngine?
    /// Injectable so two of these can exist without fighting over one global —
    /// which is a testing convenience and also the honest description of what
    /// this depends on.
    private let defaults: UserDefaults

    init(api: NishanyAPI? = nil, sync: SyncEngine? = nil, defaults: UserDefaults = .standard) {
        self.api = api
        self.sync = sync
        self.defaults = defaults
        let stored = defaults.string(forKey: Self.key) ?? ""
        language = AppLanguage(rawValue: stored) ?? .en
    }

    /// Take the account's choice, if the server has one.
    ///
    /// Only when it differs: writing back what was just read would queue a
    /// pointless upload on every launch.
    func load() async {
        guard let api,
              let remote = try? await api.userState(String.self, key: Self.key),
              let chosen = remote.value.flatMap(AppLanguage.init(rawValue:)),
              chosen != language
        else { return }

        language = chosen
        defaults.set(chosen.rawValue, forKey: Self.key)
    }

    func set(_ language: AppLanguage) async {
        guard language != self.language else { return }
        self.language = language
        defaults.set(language.rawValue, forKey: Self.key)
        await sync?.write(key: Self.key, value: language.rawValue)
    }

    func toggle() async {
        await set(language == .ar ? .en : .ar)
    }

    /// Translate an English source string.
    ///
    /// Missing Arabic falls back to the English it was written from, so a
    /// surface not yet wrapped reads as English rather than as a blank or a
    /// key. That is what lets this be applied a screen at a time.
    func callAsFunction(_ english: String) -> String {
        guard language == .ar else { return english }
        return ArabicStrings.table[english] ?? english
    }

    var layoutDirection: LayoutDirection { language.layoutDirection }
    var isRightToLeft: Bool { language == .ar }
}

/// The active translation, reachable from any view.
///
/// A default is provided so a view can be built and previewed without one
/// rather than crashing — an untranslated screen is a small problem, a screen
/// that will not render is a large one.
private struct LocalisationKey: EnvironmentKey {
    @MainActor static let defaultValue = Localisation()
}

extension EnvironmentValues {
    var strings: Localisation {
        get { self[LocalisationKey.self] }
        set { self[LocalisationKey.self] = newValue }
    }
}

/// Re-apply the reading direction inside a sheet.
///
/// A sheet is presented in its own context, and SwiftUI does not carry
/// `layoutDirection` into it the way it carries ordinary environment values —
/// so the words inside a sheet came out in Arabic while the layout stayed
/// left-to-right, which is worse than either being wrong on its own. The
/// `strings` value *does* reach the sheet, so the direction can be recovered
/// from it rather than threaded through by hand.
private struct Localised: ViewModifier {
    @Environment(\.strings) private var strings

    func body(content: Content) -> some View {
        content
            .environment(\.layoutDirection, strings.layoutDirection)
            .environment(\.locale, strings.language.locale)
    }
}

extension View {
    /// Put this on the root of any sheet. It is a no-op in English.
    func localisedSheet() -> some View { modifier(Localised()) }
}
