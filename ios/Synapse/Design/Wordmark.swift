import SwiftUI

/// The nishany mark and lockup.
///
/// This is the client's own artwork, carried across from `public/brand/` rather
/// than redrawn — the O in "Connect" *is* the mark, so the wordmark and the
/// symbol are one thing and cannot be reassembled from a font and two circles.
///
/// The light artwork's deep blue goes muddy on a dark ground, so a lifted
/// variant is swapped in. Which one is chosen from the app's own theme rather
/// than the system trait, because a student on `warm` in a dark room is still
/// reading a light ground.
struct CortexMark: View {
    @Environment(\.strings) private var strings
    var size: CGFloat = 28

    @Environment(\.themeStore) private var theme

    var body: some View {
        Image(onDarkGround(theme.appearance) ? "logo-dark" : "logo")
            .resizable()
            .scaledToFit()
            .frame(height: size)
            .accessibilityHidden(true)
    }
}

/// The full lockup, mark and letters together.
///
/// Composed the way the website's header is — the live mark next to live text —
/// rather than a single baked image. A pre-rendered lockup went stale once
/// (it kept the old Connect-era mark long after the crimson Noon mark shipped),
/// and only the mark is real artwork; the words are just the product's name set
/// in a rounded face close to the brand's Baloo 2.
struct Wordmark: View {
    @Environment(\.strings) private var strings
    var height: CGFloat = 28

    var body: some View {
        HStack(spacing: height * 0.32) {
            CortexMark(size: height)

            VStack(alignment: .leading, spacing: height * 0.02) {
                Text("nishany")
                    .font(.system(size: height * 0.72, weight: .bold, design: .rounded))
                    .foregroundStyle(Theme.ink)
                Text("BY CONNECT")
                    .font(.system(size: height * 0.26, weight: .semibold, design: .rounded))
                    .tracking(height * 0.08)
                    .foregroundStyle(Theme.ink3)
            }
        }
        // The lockup is the product's name, so it is read out as one — never as
        // two words in two colours, which is what the artwork would dictate.
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(strings("Nishany"))
    }
}

/// Whether the ground under the mark is dark.
///
/// `system` is the only case that has to ask the phone; the other three are a
/// decision the student made.
@MainActor
private func onDarkGround(_ appearance: AppTheme) -> Bool {
    switch appearance {
    case .dark: true
    case .light, .warm: false
    case .system: UITraitCollection.current.userInterfaceStyle == .dark
    }
}
