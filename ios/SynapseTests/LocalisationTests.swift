import Foundation
import SwiftUI
import Testing
@testable import Synapse

/// The language layer, and the table it reads from.
///
/// Keyed by the English source string, exactly as the website is, so the two
/// platforms say the same words and a surface can be wrapped one at a time.
@MainActor
struct LocalisationTests {

    /// Its own store, so these never race each other or the app's.
    private func fresh(_ name: String = UUID().uuidString) -> Localisation {
        Localisation(defaults: UserDefaults(suiteName: name) ?? .standard)
    }

    /// The key both platforms route to the student's own record. The web has
    /// it in `USER_OWNED_PATTERNS`; if this drifted, a language chosen on a
    /// laptop would not follow to the phone.
    @Test func theLanguageKeyIsTheWebs() {
        #expect(Localisation.key == "synapse-lang")
        #expect(StateOwnership.isUserOwned(Localisation.key))
    }

    @Test func englishIsTheSourceAndNeedsNoTable() {
        let strings = fresh()
        #expect(strings.language == .en)
        #expect(strings("Dashboard") == "Dashboard")
        #expect(strings("A string nobody has ever translated") == "A string nobody has ever translated")
    }

    /// A key with no Arabic behind it falls back to the English it was written
    /// from. That is what lets the app be translated a screen at a time — an
    /// unwrapped surface reads as English rather than as a blank or a key.
    @Test func missingArabicFallsBackToEnglish() async {
        let strings = fresh()
        await strings.set(.ar)

        #expect(strings("Library") == "المكتبة")
        #expect(strings("A string nobody has ever translated") == "A string nobody has ever translated")
    }

    @Test func arabicReadsRightToLeft() {
        #expect(AppLanguage.en.layoutDirection == .leftToRight)
        #expect(AppLanguage.ar.layoutDirection == .rightToLeft)
    }

    /// A language picker is read by someone looking for their own language, so
    /// each is named in itself.
    @Test func eachLanguageIsNamedInItsOwnWords() {
        #expect(AppLanguage.en.ownName == "English")
        #expect(AppLanguage.ar.ownName == "العربية")
    }

    @Test func theChoiceSurvivesARestart() async {
        let suite = UUID().uuidString
        let store = UserDefaults(suiteName: suite) ?? .standard

        let first = Localisation(defaults: store)
        await first.set(.ar)

        // A second instance reading the same store is what the next launch
        // sees.
        #expect(Localisation(defaults: store).language == .ar)

        await first.set(.en)
        #expect(Localisation(defaults: store).language == .en)
    }

    @Test func togglingGoesBackAndForth() async {
        let strings = fresh()
        await strings.toggle()
        #expect(strings.language == .ar)
        await strings.toggle()
        #expect(strings.language == .en)
    }
}

/// The generated table itself.
struct ArabicStringsTests {

    /// Generated from the website's own file. A table that shrank would mean
    /// the generator had silently dropped entries.
    @Test func theTableCameAcrossWhole() {
        #expect(ArabicStrings.table.count >= 600)
    }

    /// Spot checks across the surfaces, so a mangled generation is caught
    /// rather than merely a smaller one.
    @Test func theWordsAreTheWebsWords() {
        #expect(ArabicStrings.table["Library"] == "المكتبة")
        #expect(ArabicStrings.table["Question Bank"] == "بنك الأسئلة")
        #expect(ArabicStrings.table["Practical"] == "العملي")
        #expect(ArabicStrings.table["Resources"] == "المصادر")
        #expect(ArabicStrings.table["Calendar"] == "التقويم")
    }

    /// No entry may be blank: an empty translation renders as nothing at all,
    /// which is worse than the English it replaced.
    @Test func noEntryIsEmpty() {
        #expect(ArabicStrings.table.allSatisfy { !$0.key.isEmpty && !$0.value.isEmpty })
    }

    /// Every value should carry Arabic. One that is still pure ASCII is an
    /// untranslated string that slipped in looking translated.
    @Test func everyTranslationIsActuallyArabic() {
        let arabic = CharacterSet(charactersIn: "\u{0600}"..."\u{06FF}")
        let suspect = ArabicStrings.table.filter { _, value in
            value.unicodeScalars.allSatisfy { !arabic.contains($0) }
        }
        #expect(suspect.isEmpty, "Entries with no Arabic in them: \(suspect.keys.sorted())")
    }
}
