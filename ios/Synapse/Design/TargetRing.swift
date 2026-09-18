import SwiftUI

/// The dial on "Today's target": a track, a faint inner circle marking it as a
/// dial rather than a bar bent into a ring, an arc that fills clockwise from
/// twelve o'clock, and a centre dot. A port of the mock's inline SVG — three
/// concentric circles and an arc, not a library.
struct TargetRing: View {
    var value: Int
    var goal: Int
    var size: CGFloat = 88
    var lineWidth: CGFloat = 8

    @Environment(\.layoutDirection) private var layoutDirection
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    /// The arc sweeps up to its value on arrival rather than being painted
    /// already full — the one moment of motion that tells the student the dial
    /// is theirs and it just moved. Held in state so `trim` has something to
    /// animate between; it starts at zero and springs to `progress` on appear.
    @State private var shown: Double = 0

    private var progress: Double {
        guard goal > 0 else { return 0 }
        return min(Double(value) / Double(goal), 1)
    }

    var body: some View {
        ZStack {
            Circle()
                .stroke(Theme.inset, lineWidth: lineWidth)
            // The mock's quiet second ring, well inside the track — there
            // only to read as a dial face, not to carry any value of its own.
            Circle()
                .stroke(Theme.grid, lineWidth: 1.5)
                .padding(size * 0.159)
            Circle()
                .trim(from: 0, to: shown)
                .stroke(Theme.primary, style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
                .rotationEffect(.degrees(-90))
            Circle()
                .fill(Theme.primary)
                .frame(width: lineWidth * 1.25, height: lineWidth * 1.25)
        }
        .onAppear {
            guard !reduceMotion else { shown = progress; return }
            withAnimation(Motion.settleSpring.delay(0.15)) { shown = progress }
        }
        .onChange(of: progress) { _, new in
            withAnimation(reduceMotion ? nil : Motion.settleSpring) { shown = new }
        }
        .padding(lineWidth / 2)
        .frame(width: size, height: size)
        // The Arabic artboard mirrors the ring horizontally rather than
        // reversing the arc's direction, so the sweep still reads as
        // "forward" against the mirrored layout around it.
        .scaleEffect(x: layoutDirection == .rightToLeft ? -1 : 1, y: 1)
        .accessibilityHidden(true)
    }
}
