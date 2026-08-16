import SwiftUI

/// The Synapse palette, ported from the `@theme` block in `src/index.css`.
///
/// The web app ships three themes rather than a light/dark pair: **warm** is the
/// default and is what gives the product its clinical-paper character, with
/// **light** (cooler, greyer) and **dark** as alternatives. Only warm and dark
/// are defined here; light arrives with the theme picker in a later step.
///
/// Colours are declared for both appearances so a student who has their phone
/// in dark mode gets the dark palette without the app having to ask.
enum Theme {

    // MARK: - Surfaces

    /// The page behind everything.
    static let paper = adaptive(light: 0xF6F1E9, dark: 0x17140F)
    /// Cards, sheets, and panels sitting on the page.
    static let surface = adaptive(light: 0xFFFDFA, dark: 0x201C16)
    /// A secondary panel, or a resting row.
    static let surface2 = adaptive(light: 0xF1EBE1, dark: 0x282219)
    /// Wells and inputs — recessed rather than raised.
    static let inset = adaptive(light: 0xECE4D7, dark: 0x322A20)

    // MARK: - Text

    /// Body and headings.
    static let ink = adaptive(light: 0x241D16, dark: 0xF2ECE2)
    /// Secondary text. Holds at least 4.5:1 on `paper` in both appearances.
    static let ink2 = adaptive(light: 0x6B6053, dark: 0xB6AB9A)
    /// Decorative only — never body text, it does not meet contrast.
    static let ink3 = adaptive(light: 0x9C9083, dark: 0x8B8172)

    // MARK: - Lines

    static let line = adaptive(light: 0xE8DFD1, dark: 0x322B21)
    static let line2 = adaptive(light: 0xDACFBD, dark: 0x443B2E)

    // MARK: - Accent

    static let accent = adaptive(light: 0xB0512B, dark: 0xD9825A)
    static let accentStrong = adaptive(light: 0x8C3D1D, dark: 0xEDA07C)
    static let accentTint = adaptive(light: 0xF4E5D9, dark: 0x3B2418)
    static let accentLine = adaptive(light: 0xE6C6B1, dark: 0x55341F)
    /// Text and icons drawn *on* an accent fill.
    static let onAccent = adaptive(light: 0xFDF7F2, dark: 0x1B120C)

    // MARK: - Signals

    static let success = adaptive(light: 0x5E7A4F, dark: 0x8FAE79)
    static let warning = adaptive(light: 0xA5732A, dark: 0xD3A25C)
    static let danger = adaptive(light: 0xB23A3A, dark: 0xE07B74)

    /// Text drawn on a signal fill.
    ///
    /// Note these invert: in dark mode the fills *lighten*, so their
    /// foreground goes dark. Hardcoding white here would fail contrast in dark
    /// mode on exactly the surfaces that matter most.
    static let onSuccess = adaptive(light: 0xF7FAF2, dark: 0x17200F)
    static let onWarning = adaptive(light: 0xFDF8EE, dark: 0x241A09)
    static let onDanger = adaptive(light: 0xFDF4F2, dark: 0x2B100E)

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

    /// Page titles and headings. The web app sets Source Serif 4 at weight 560;
    /// until the variable font is bundled, the system serif at semibold is the
    /// closest match that ships for free and supports Arabic.
    static func display(_ size: CGFloat) -> Font {
        .system(size: size, weight: .semibold, design: .serif)
    }

    /// Panel titles — sans, small, semibold. The counterpart to `display`, and
    /// the pairing that gives Synapse its hierarchy.
    static func panelTitle(_ size: CGFloat = 13) -> Font {
        .system(size: size, weight: .semibold)
    }

    /// Figures in tables and meters, where digits must line up between rows.
    static func numeric(_ size: CGFloat) -> Font {
        .system(size: size, design: .monospaced).monospacedDigit()
    }

    // MARK: - Building blocks

    private static func adaptive(light: UInt32, dark: UInt32) -> Color {
        Color(UIColor { traits in
            UIColor(rgb: traits.userInterfaceStyle == .dark ? dark : light)
        })
    }
}

private extension UIColor {
    convenience init(rgb: UInt32) {
        self.init(
            red: CGFloat((rgb >> 16) & 0xFF) / 255,
            green: CGFloat((rgb >> 8) & 0xFF) / 255,
            blue: CGFloat(rgb & 0xFF) / 255,
            alpha: 1
        )
    }
}
