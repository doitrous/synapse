import SwiftUI

/// The nishany Noon mark, reused as today's progress ring.
///
/// Same viewBox, radii and dash fraction as the static brand mark (100×100,
/// r=34/20, arc spanning 76.4% of the circle): the outer crimson arc is a
/// faint track plus a filled portion sized to `done / goal`, both starting
/// from the same anchor the mark's own arc starts from. The inner rose arc
/// and the navy seed dot are drawn unchanged from the mark — the fixed,
/// "always-branded" half. A port of `src/components/dashboard/TargetSeed.tsx`.
///
/// No RTL mirror — this is a brand mark, not a directional meter (that's
/// `TargetRing`), so it always opens top-right like the logo does.
struct TargetSeed: View {
    var done: Int
    var goal: Int
    var size: CGFloat = 132

    @Environment(\.strings) private var strings
    @State private var sweep = false

    /// 163.2 / (2π·34) — the outer arc's dash length over its full circumference.
    private static let arcFraction = 0.764

    private var pct: Double {
        guard goal > 0 else { return 0 }
        return min(1, max(0, Double(done) / Double(goal)))
    }

    var body: some View {
        let scale = size / 100

        ZStack {
            // Outer track: the arc's full possible length, faint.
            Circle()
                .trim(from: 0, to: Self.arcFraction)
                .stroke(Theme.inset, style: StrokeStyle(lineWidth: 8 * scale, lineCap: .round))
                .frame(width: 68 * scale, height: 68 * scale)

            // Outer fill: today's progress, crimson, growing from the same start.
            Circle()
                .trim(from: 0, to: Self.arcFraction * (sweep ? pct : 0))
                .stroke(Color(UIColor(rgb: 0xA81D40)), style: StrokeStyle(lineWidth: 8 * scale, lineCap: .round))
                .frame(width: 68 * scale, height: 68 * scale)
                .animation(.easeOut(duration: 0.7), value: sweep)

            // Inner arc: the static brand accent, unchanged from the mark.
            Circle()
                .trim(from: 0, to: Self.arcFraction)
                .stroke(Color(UIColor(rgb: 0xE0859B)), style: StrokeStyle(lineWidth: 7 * scale, lineCap: .round))
                .frame(width: 40 * scale, height: 40 * scale)

            // The seed: midnight.
            Circle()
                .fill(Theme.midnight)
                .frame(width: 10 * scale, height: 10 * scale)
                .offset(x: 22 * scale, y: -22 * scale)
        }
        .frame(width: size, height: size)
        .onAppear { sweep = true }
        .accessibilityElement()
        .accessibilityLabel(
            "\(Money.number(Double(done), strings.language)) \(strings("of")) "
            + "\(Money.number(Double(goal), strings.language)) \(strings("questions done"))"
        )
    }
}
