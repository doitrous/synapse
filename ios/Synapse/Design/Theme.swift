import SwiftUI

/// Which of the three grounds the app is standing on.
///
/// The website ships three themes rather than a light/dark pair, and they are
/// not a gradient between two poles: **light** is the reference, **warm** is
/// the clinical-paper character the product had before, and **dark** is a
/// separate reading of the same tokens. `system` follows the phone, choosing
/// light or dark.
enum AppTheme: String, CaseIterable, Sendable {
    case system, light, warm, dark

    var label: String {
        switch self {
        case .system: "Match my phone"
        case .light: "Light"
        case .warm: "Warm"
        case .dark: "Dark"
        }
    }

    static let key = "nishany-theme"
}

/// Which theme is in force, and a way to change it.
///
/// The palette below is read through static members at 120-odd call sites, so
/// rather than thread an environment value through every one of them the
/// chosen theme is held statically and the view tree is keyed on this object —
/// changing it rebuilds everything beneath, which is what repaints the app.
@MainActor
@Observable
final class ThemeStore {

    private(set) var appearance: AppTheme {
        didSet { Theme.appearance = appearance }
    }

    private let defaults: UserDefaults

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
        let stored = defaults.string(forKey: AppTheme.key) ?? ""
        appearance = AppTheme(rawValue: stored) ?? .system
        Theme.appearance = appearance
    }

    func use(_ theme: AppTheme) {
        guard theme != appearance else { return }
        appearance = theme
        defaults.set(theme.rawValue, forKey: AppTheme.key)
        // Before the tree rebuilds, so the bars it creates take the new ground.
        Appearance.reapply()
    }
}

/// The active theme, reachable from any view.
///
/// Given a default rather than being required, for the same reason the
/// translation is: a view that cannot find it should read in the default theme,
/// not refuse to render. The sign-in screen is the case that proves it — it
/// shows the wordmark before the signed-in tree that owns the store exists.
private struct ThemeStoreKey: EnvironmentKey {
    @MainActor static let defaultValue = ThemeStore()
}

extension EnvironmentValues {
    var themeStore: ThemeStore {
        get { self[ThemeStoreKey.self] }
        set { self[ThemeStoreKey.self] = newValue }
    }
}

/// The nishany palette, ported from the `@theme` block in
/// `src/index.css`.
///
/// **Two hues, and which is which matters.** `primary` is cortex crimson and is
/// the *action* colour — buttons, selection, the thing you press. `accent` is
/// cortex blue and is *structural* — concepts, sources and citations. They were
/// one token before the rebrand, and the collision is the reason the web
/// renamed 869 usages: `accent` used to mean "the action colour", and now means
/// blue. The same rename happened here.
///
/// Every value is declared for all three themes. Dark is not a darkening of
/// light: the fills hold their light values while the *text* steps move up the
/// ramp, because saturated brand colour is held as a fill and lifted as text.
enum Theme {

    /// Set by `ThemeStore`. Read by every token below.
    nonisolated(unsafe) static var appearance: AppTheme = .system

    // MARK: - Surfaces

    /// The page behind everything. Carries a hint of the brand blue.
    static var paper: Color { token(light: 0xF5F7FB, warm: 0xF7F2EA, dark: 0x0D1117) }
    /// Cards, sheets, and panels sitting on the page.
    static var surface: Color { token(light: 0xFFFFFF, warm: 0xFFFDF9, dark: 0x151B24) }
    /// A secondary panel, or a resting row.
    static var surface2: Color { token(light: 0xEEF1F7, warm: 0xF1EBE1, dark: 0x1D2531) }
    /// Wells, inputs and meter beds — recessed rather than raised. In dark it
    /// goes *below* the page rather than above it, which is how a recess reads
    /// when there is no shadow to be had.
    static var inset: Color { token(light: 0xE4E9F2, warm: 0xE9E1D4, dark: 0x0A0E14) }

    // MARK: - Text

    /// Body and headings. Near-black and faintly cool — and in dark never pure
    /// white, which at two in the morning is only glare.
    static var ink: Color { token(light: 0x161920, warm: 0x1F1B16, dark: 0xE8ECF3) }
    /// Secondary text. Holds at least 4.5:1 on `paper` in every theme.
    static var ink2: Color { token(light: 0x5D636F, warm: 0x675E51, dark: 0xA2ABBB) }
    /// Faint — large or decorative only. Less faint in dark, so labels stay
    /// legible against a ground that gives them less help.
    static var ink3: Color { token(light: 0x949AA8, warm: 0x9B9284, dark: 0x7D8798) }

    // MARK: - Lines

    static var line: Color { token(light: 0xE3E7EF, warm: 0xE9E0D2, dark: 0x232B37) }
    static var line2: Color { token(light: 0xCCD3E0, warm: 0xD7CCB9, dark: 0x38424F) }

    // MARK: - Primary — cortex crimson, the action colour

    static var primary: Color { token(light: 0xD13A63, warm: 0xD13A63, dark: 0xD13A63) }
    /// The filled control under a press. Light grounds darken; dark grounds
    /// brighten, because darkening on a dark ground buries the control.
    static var primaryHover: Color { token(light: 0xB62D55, warm: 0xB62D55, dark: 0xE0537A) }
    /// The **text** step, not a fill — what sits on a tint.
    static var primaryStrong: Color { token(light: 0xA82449, warm: 0xA82449, dark: 0xF193AB) }
    static var primarySoft: Color { token(light: 0xEF8FA3, warm: 0xEF8FA3, dark: 0x8C2745) }
    /// A control fill — pills, chips, a selected tab. Never a page background.
    static var primaryTint: Color { token(light: 0xFFF5F5, warm: 0xFDEFEF, dark: 0x2A141D) }
    static var primaryLine: Color { token(light: 0xF4C8D6, warm: 0xF0C8D1, dark: 0x4A2130) }
    /// Text and icons drawn *on* a primary fill. White clears AA on `#d13a63`
    /// against any ground, so it does not move.
    static var onPrimary: Color { token(light: 0xFFFFFF, warm: 0xFFFFFF, dark: 0xFFFFFF) }

    // MARK: - Accent — cortex blue, the structural colour

    /// Concepts, sources and citations. `#1553b3` is unreadable on a dark
    /// ground, so dark lifts it rather than dimming it.
    static var accent: Color { token(light: 0x1553B3, warm: 0x1553B3, dark: 0x6FA5FF) }
    static var accentStrong: Color { token(light: 0x0E3F8C, warm: 0x0E3F8C, dark: 0xA3C5FF) }
    static var accentSoft: Color { token(light: 0x5A8EE0, warm: 0x5A8EE0, dark: 0x2C5697) }
    static var accentTint: Color { token(light: 0xEAF1FD, warm: 0xEEF1F8, dark: 0x11203A) }
    static var accentLine: Color { token(light: 0xC4D9F7, warm: 0xCBD8EE, dark: 0x24406B) }
    /// Dark ink on a light-blue fill, in dark. Light themes take near-white.
    static var onAccent: Color { token(light: 0xF8FBFF, warm: 0xF8FBFF, dark: 0x0A1120) }

    // MARK: - Signals — functional only, never decorative

    static var success: Color { token(light: 0x1A6E56, warm: 0x1A6E56, dark: 0x4DC79B) }
    static var warning: Color { token(light: 0x8A5A0A, warm: 0x8A5A0A, dark: 0xE3A83F) }
    /// Inverted in dark: danger becomes the brighter pure red, so it is not
    /// mistaken for primary's rose.
    static var danger: Color { token(light: 0xA8121E, warm: 0xA8121E, dark: 0xFF6B6B) }

    static var successTint: Color { token(light: 0xE3F2EC, warm: 0xE8EFDF, dark: 0x0E2B23) }
    static var warningTint: Color { token(light: 0xFBF0D9, warm: 0xF7EDD7, dark: 0x2E2410) }
    static var dangerTint: Color { token(light: 0xFCE7E9, warm: 0xF9E6E3, dark: 0x331416) }

    /// Text drawn on a signal fill.
    ///
    /// These invert: in dark the fills *lighten*, so their foreground goes
    /// dark. Hardcoding white would fail contrast in dark mode on exactly the
    /// surfaces that matter most.
    static var onSuccess: Color { token(light: 0xF4FBF8, warm: 0xF4FBF8, dark: 0x06130F) }
    static var onWarning: Color { token(light: 0xFFFAF0, warm: 0xFFFAF0, dark: 0x1A1305) }
    static var onDanger: Color { token(light: 0xFFF7F7, warm: 0xFFF7F7, dark: 0x1A0708) }

    // MARK: - Charts

    static var grid: Color { token(light: 0xE8ECF4, warm: 0xECE4D6, dark: 0x1B2330) }
    static var gridMajor: Color { token(light: 0xDBE1EC, warm: 0xE2D9C9, dark: 0x232C39) }

    /// The heatmap ramp, ground → crimson.
    ///
    /// In dark it ascends in brightness instead: on a dark ground "more" has to
    /// mean lighter, or a full heatmap reads as an empty one.
    static func scale(_ step: Int) -> Color {
        let light: [UInt32] = [0xE8ECF4, 0xF8D7E0, 0xEFA9BF, 0xE0789A, 0xC94E77, 0xA82449]
        let warm: [UInt32] = [0xECE4D6, 0xF6D9DF, 0xEDABBD, 0xDE7A98, 0xC75075, 0xA82449]
        let dark: [UInt32] = [0x1A212B, 0x3B1D29, 0x5F2739, 0x8D3253, 0xBB416B, 0xE8759A]
        let index = min(max(step, 0), 5)
        return token(light: light[index], warm: warm[index], dark: dark[index])
    }

    // MARK: - Shape

    enum Radius {
        static let sm: CGFloat = 6
        static let md: CGFloat = 8
        static let lg: CGFloat = 10
        static let xl: CGFloat = 12
        /// The largest the design system allows. Cards are never pill-rounded.
        static let xxl: CGFloat = 16
    }

    // MARK: - Type

    /// The families bundled with the app, matching the site.
    enum Family {
        static let serif = "Source Serif 4"
        static let sans = "Geist"
        static let mono = "Geist Mono"
    }

    /// A bundled variable font at an exact weight.
    ///
    /// `Font.custom(...).weight(...)` can only ask for one of the nine named
    /// weights, and the site's headings are set at 560 — between semibold and
    /// medium, and not expressible that way. Setting the `wght` axis directly
    /// gives the same face the website renders rather than the nearest one.
    static func variable(_ family: String, size: CGFloat, weight: CGFloat) -> Font {
        // 'wght' as a four-character code.
        let axis = 0x77676874
        let descriptor = UIFontDescriptor(fontAttributes: [
            .family: family,
            kCTFontVariationAttribute as UIFontDescriptor.AttributeName: [axis: weight],
        ])
        return Font(UIFont(descriptor: descriptor, size: size))
    }

    /// The same bundled face as a `UIFont`, for the UIKit-backed rich editor.
    static func uiFont(_ family: String = Family.serif, size: CGFloat, weight: CGFloat = 400) -> UIFont {
        let axis = 0x77676874
        let descriptor = UIFontDescriptor(fontAttributes: [
            .family: family,
            kCTFontVariationAttribute as UIFontDescriptor.AttributeName: [axis: weight],
        ])
        return UIFont(descriptor: descriptor, size: size)
    }

    /// Page titles and headings: Source Serif 4 at 560, as the site sets it.
    static func display(_ size: CGFloat) -> Font {
        variable(Family.serif, size: size, weight: 560)
    }

    /// Long-form reading. The article body is the reason the serif is bundled.
    static func serifBody(_ size: CGFloat, weight: CGFloat = 400) -> Font {
        variable(Family.serif, size: size, weight: weight)
    }

    /// Interface text.
    static func ui(_ size: CGFloat, weight: CGFloat = 400) -> Font {
        variable(Family.sans, size: size, weight: weight)
    }

    /// Panel titles — sans, small, semibold. The counterpart to `display`, and
    /// the pairing that gives Synapse its hierarchy: *panel titles are sans,
    /// page titles are serif*.
    static func panelTitle(_ size: CGFloat = 13) -> Font {
        variable(Family.sans, size: size, weight: 600)
    }

    /// Figures in tables and meters, where digits must line up between rows.
    static func numeric(_ size: CGFloat, weight: CGFloat = 400) -> Font {
        variable(Family.mono, size: size, weight: weight)
    }

    // MARK: - Building blocks

    /// One token, in whichever theme is in force.
    ///
    /// `system` is the only one that consults the trait: the other three are a
    /// deliberate choice and must not change under the student when the sun
    /// goes down.
    private static func token(light: UInt32, warm: UInt32, dark: UInt32) -> Color {
        switch appearance {
        case .light: Color(UIColor(rgb: light))
        case .warm: Color(UIColor(rgb: warm))
        case .dark: Color(UIColor(rgb: dark))
        case .system:
            Color(UIColor { traits in
                UIColor(rgb: traits.userInterfaceStyle == .dark ? dark : light)
            })
        }
    }
}
