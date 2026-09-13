import SwiftUI

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
