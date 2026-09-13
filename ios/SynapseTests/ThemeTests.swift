import SwiftUI
import Testing
@testable import Synapse

/// The Connect Cortex palette.
///
/// The rebrand renamed a token rather than repainting one: `accent` used to
/// mean "the action colour" and now means blue. Anything that still reads the
/// old meaning is not a compile error — it is a crimson button rendered in
/// structural blue, or a source rule rendered as though it were pressable.
/// Serialised, and for a reason: the palette is read through static members, so
/// two of these running at once would each be resolving colours in whichever
/// theme the other had just set.
@MainActor
@Suite(.serialized)
struct ThemeTests {

    /// The colour is taken as an autoclosure so it is read *after* the theme is
    /// set. Passing it by value reads it in whichever theme happened to be in
    /// force at the call site — which is a whole test suite that silently
    /// checks the previous theme's values.
    private func resolved(_ colour: @autoclosure () -> Color, in appearance: AppTheme) -> UIColor {
        Theme.appearance = appearance
        return UIColor(colour()).resolvedColor(with: UITraitCollection(userInterfaceStyle: .light))
    }

    private func hex(_ colour: UIColor) -> String {
        var r: CGFloat = 0, g: CGFloat = 0, b: CGFloat = 0, a: CGFloat = 0
        colour.getRed(&r, green: &g, blue: &b, alpha: &a)
        return String(format: "%02X%02X%02X", Int(r * 255 + 0.5), Int(g * 255 + 0.5), Int(b * 255 + 0.5))
    }

    /// Cortex crimson is the action colour, in every theme. The fill holds its
    /// value on a dark ground — white on `#d13a63` clears AA anywhere — while
    /// only the text step moves.
    @Test func primaryIsCortexCrimsonEverywhere() {
        for theme in [AppTheme.light, .warm, .dark] {
            #expect(hex(resolved(Theme.primary, in: theme)) == "D13A63")
        }
        Theme.appearance = .system
    }

    /// Cortex blue is structural. `#1553b3` is unreadable on a dark ground, so
    /// dark lifts it rather than dimming it — a token that simply darkened
    /// would vanish.
    @Test func accentIsCortexBlueAndLiftsInDark() {
        #expect(hex(resolved(Theme.accent, in: .light)) == "1553B3")
        #expect(hex(resolved(Theme.accent, in: .warm)) == "1553B3")
        #expect(hex(resolved(Theme.accent, in: .dark)) == "6FA5FF")
        Theme.appearance = .system
    }

    /// The two hues must never be the same colour: they mean different things,
    /// and the whole rename exists to keep them apart.
    @Test func theTwoHuesAreDistinctInEveryTheme() {
        for theme in [AppTheme.light, .warm, .dark] {
            #expect(hex(resolved(Theme.primary, in: theme)) != hex(resolved(Theme.accent, in: theme)))
        }
        Theme.appearance = .system
    }

    @Test func eachThemeHasItsOwnGround() {
        #expect(hex(resolved(Theme.paper, in: .light)) == "F5F7FB")
        #expect(hex(resolved(Theme.paper, in: .warm)) == "F7F2EA")
        #expect(hex(resolved(Theme.paper, in: .dark)) == "0D1117")
        Theme.appearance = .system
    }

    /// In dark the inset goes *below* the page rather than above it. That is
    /// how a recess reads when there is no shadow to be had.
    @Test func theInsetRecessesOnADarkGround() {
        func luminance(_ theme: AppTheme, _ colour: @autoclosure @escaping () -> Color) -> CGFloat {
            var white: CGFloat = 0, alpha: CGFloat = 0
            resolved(colour(), in: theme).getWhite(&white, alpha: &alpha)
            return white
        }

        #expect(luminance(.light, Theme.inset) < luminance(.light, Theme.paper))
        #expect(luminance(.dark, Theme.inset) < luminance(.dark, Theme.paper))
        Theme.appearance = .system
    }

    /// Body ink must never be pure white on a dark ground — at two in the
    /// morning that is only glare.
    @Test func darkInkIsNotPureWhite() {
        #expect(hex(resolved(Theme.ink, in: .dark)) != "FFFFFF")
        #expect(hex(resolved(Theme.ink, in: .dark)) == "E8ECF3")
        Theme.appearance = .system
    }

    /// The heatmap ascends on a dark ground. If it descended, a full heatmap
    /// would read as an empty one.
    @Test func theHeatmapAscendsInDark() {
        func white(_ step: Int) -> CGFloat {
            var w: CGFloat = 0, a: CGFloat = 0
            resolved(Theme.scale(step), in: .dark).getWhite(&w, alpha: &a)
            return w
        }
        #expect(white(0) < white(5))
        Theme.appearance = .system
    }

    @Test func theScaleIsClampedRatherThanCrashing() {
        Theme.appearance = .light
        #expect(UIColor(Theme.scale(-3)) == UIColor(Theme.scale(0)))
        #expect(UIColor(Theme.scale(99)) == UIColor(Theme.scale(5)))
        Theme.appearance = .system
    }
}

struct ThemeStoreTests {

    /// The web keeps the theme under this key, and it is device-scoped: a
    /// student on a phone in a dark room has not chosen dark on their laptop.
    @Test func theKeyIsTheWebs() {
        #expect(AppTheme.key == "nishany-theme")
    }

    @MainActor
    @Test func theChoiceSurvivesARestart() {
        let store = UserDefaults(suiteName: UUID().uuidString) ?? .standard

        let first = ThemeStore(defaults: store)
        #expect(first.appearance == .system)
        first.use(.warm)

        #expect(ThemeStore(defaults: store).appearance == .warm)
        Theme.appearance = .system
    }
}
