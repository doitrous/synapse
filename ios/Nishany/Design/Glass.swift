import SwiftUI

/// Liquid Glass, where iOS 26 offers it and a material where it does not.
///
/// The deployment target is iOS 18, and it stays there: reaching the phones
/// students already own matters more here than a uniform finish. So glass is
/// **additive, never structural**. Every surface that takes it must already
/// read correctly as a material — the glass is what a newer phone adds on top,
/// not what makes the layout work.
///
/// Applied only to chrome that genuinely floats over content, which is what the
/// material is for: the reader's tool palette, the question bank's footer, the
/// selection bar, the study-timer chip. A card sitting in a list is not
/// floating over anything and takes a surface colour instead.
extension View {

    /// A floating bar or palette.
    ///
    /// - Parameter shape: the same shape the fallback fills, so the two agree
    ///   about where the edge is.
    @ViewBuilder
    func floatingChrome<S: Shape>(in shape: S) -> some View {
        if #available(iOS 26.0, *) {
            glassEffect(.regular, in: shape)
        } else {
            background(.ultraThinMaterial, in: shape)
        }
    }

    /// A floating control that responds to touch.
    ///
    /// `interactive()` makes the glass react to a press. On iOS 18 the material
    /// cannot do that, so the control keeps whatever press feedback its button
    /// style already gives it — which is why this is applied to the background
    /// rather than replacing the style.
    @ViewBuilder
    func floatingControl<S: Shape>(in shape: S) -> some View {
        if #available(iOS 26.0, *) {
            glassEffect(.regular.interactive(), in: shape)
        } else {
            background(.ultraThinMaterial, in: shape)
        }
    }

    /// Groups sibling glass surfaces so they merge and separate as one.
    ///
    /// Without the container each pane refracts independently and two adjacent
    /// controls read as two panes of glass rather than one object. On iOS 18
    /// this is the identity.
    @ViewBuilder
    func glassGroup(spacing: CGFloat = 8) -> some View {
        if #available(iOS 26.0, *) {
            GlassEffectContainer(spacing: spacing) { self }
        } else {
            self
        }
    }
}
