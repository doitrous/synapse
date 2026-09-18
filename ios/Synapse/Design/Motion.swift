import SwiftUI
import UIKit

/// The nishany motion tokens.
///
/// Ported from `src/index.css`. Interface response is 100–250ms on
/// `ease-out-quint`; anything slower reads as the app thinking rather than the
/// app answering.
enum Motion {

    /// `cubic-bezier(0.22, 1, 0.36, 1)` — leaves quickly, arrives gently.
    static func outQuint(_ duration: TimeInterval) -> Animation {
        .timingCurve(0.22, 1, 0.36, 1, duration: duration)
    }

    /// `cubic-bezier(0.76, 0, 0.24, 1)` — the collapse easing, symmetrical
    /// because a disclosure opens and closes the same way.
    static func inOutQuart(_ duration: TimeInterval) -> Animation {
        .timingCurve(0.76, 0, 0.24, 1, duration: duration)
    }

    static let fast: TimeInterval = 0.15
    static let base: TimeInterval = 0.18
    static let screen: TimeInterval = 0.26

    /// How far a screen settles on arrival. Eight points, not twenty-four: the
    /// shell stays put and only the page beneath it re-settles.
    static let settle: CGFloat = 8

    /// Between rows in a staggered list.
    static let staggerStep: TimeInterval = 0.03
    /// Rows past this arrive late enough to feel broken rather than composed.
    static let staggerCap = 8

    /// A card entrance's slide distance — a touch further than the shell's
    /// `settle`, because a card is meant to be noticed arriving, the shell is not.
    static let rise: CGFloat = 14

    /// The press-response spring: quick to compress, quick to recover, no
    /// overshoot that would read as bounce. Direct manipulation, so it stays
    /// crisp rather than playful.
    static let press = Animation.spring(response: 0.30, dampingFraction: 0.72)

    /// The spring a value settles on when it changes under the finger's command
    /// (a ring filling, a number rolling). A little life, still honest.
    static let settleSpring = Animation.spring(response: 0.55, dampingFraction: 0.82)

    /// A single light tap of haptic feedback. Cheap, and it is most of what
    /// separates a control that feels connected to the finger from one that does
    /// not. No-ops on a device without a Taptic Engine.
    @MainActor static func tap(_ style: UIImpactFeedbackGenerator.FeedbackStyle = .light) {
        UIImpactFeedbackGenerator(style: style).impactOccurred()
    }
}

// MARK: - Pressable

/// The house button style: the label dips and softens under the finger, springs
/// back on release, and a light haptic confirms the touch landed. Applied to
/// every card and button that does something, so the whole surface feels
/// connected to the hand rather than painted on.
///
/// The scale is a transform, so — like `screenIn` — it never gates visibility;
/// under Reduce Motion the dip is dropped and only the haptic and a faint
/// opacity change remain.
struct PressableStyle: ButtonStyle {
    var scale: CGFloat = 0.97
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(reduceMotion ? 1 : (configuration.isPressed ? scale : 1))
            .opacity(configuration.isPressed ? 0.86 : 1)
            .animation(Motion.press, value: configuration.isPressed)
            .onChange(of: configuration.isPressed) { _, pressed in
                if pressed { Motion.tap() }
            }
    }
}

extension ButtonStyle where Self == PressableStyle {
    /// `.buttonStyle(.pressable)` — the house press feedback.
    static var pressable: PressableStyle { PressableStyle() }
    /// A firmer dip for large hero surfaces, where 0.97 is imperceptible.
    static var pressableCard: PressableStyle { PressableStyle(scale: 0.985) }
}

// MARK: - Card surface + depth

extension View {

    /// The one card surface for the whole app: the fill, its hairline, the
    /// clip, and — the part the flat design was missing — a soft, low shadow
    /// that lifts the card a few points off the page. The shadow is faint by
    /// design (it reads as light, not as a drop shadow) and effectively
    /// invisible in dark mode, where the hairline already carries the edge.
    func card(_ radius: CGFloat = Theme.Radius.xl, fill: Color = Theme.surface) -> some View {
        self
            .background(fill)
            .overlay(RoundedRectangle(cornerRadius: radius).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: radius))
            .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
            .shadow(color: .black.opacity(0.03), radius: 2, y: 1)
    }

    /// A staggered slide-up entrance for a card in a scrolling column.
    ///
    /// **Transform only**, on the same principle as `screenIn`: the card slides
    /// up into place, it never fades in, so it is present the instant it exists
    /// and correct under Reduce Motion, in a snapshot, and on restore. `index`
    /// spaces the arrivals; past `staggerCap` they all land together rather than
    /// trickling in late enough to feel broken.
    func entrance(_ index: Int) -> some View {
        modifier(Entrance(index: index))
    }
}

private struct Entrance: ViewModifier {
    let index: Int
    @State private var arrived = false
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    func body(content: Content) -> some View {
        content
            .offset(y: arrived || reduceMotion ? 0 : Motion.rise)
            .onAppear {
                guard !reduceMotion else { arrived = true; return }
                let delay = Double(min(index, Motion.staggerCap)) * Motion.staggerStep
                withAnimation(Motion.outQuint(Motion.screen).delay(delay)) { arrived = true }
            }
    }
}

extension View {

    /// A screen settling as it arrives.
    ///
    /// **Transform only, never opacity.** The web states this as a hard rule
    /// and it is worth keeping: motion may refine how content arrives, it may
    /// never be the thing that makes content visible. An entrance built on
    /// opacity leaves the content invisible wherever the animation does not
    /// run — and on a phone that is a snapshot, a backgrounded app being
    /// restored, or a student who has switched Reduce Motion on.
    ///
    /// - Parameter key: what counts as an arrival. Keyed on the destination, so
    ///   moving between two resources does not re-settle the reader.
    func screenIn(_ key: some Hashable) -> some View {
        modifier(ScreenIn(key: AnyHashable(key)))
    }
}

private struct ScreenIn: ViewModifier {
    let key: AnyHashable

    @State private var arrived = false
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    func body(content: Content) -> some View {
        content
            .offset(y: arrived || reduceMotion ? 0 : Motion.settle)
            .onAppear { settle() }
            .onChange(of: key) { _, _ in
                arrived = false
                settle()
            }
    }

    private func settle() {
        guard !reduceMotion else { arrived = true; return }
        withAnimation(Motion.outQuint(Motion.screen)) { arrived = true }
    }
}
