import SwiftUI

/// Shared empty state, so every surface explains itself the same way.
///
/// Relocated verbatim from `Features/Library/ResourcesView.swift` (M5.1) —
/// its initializer is unchanged, so the ~18 existing call sites did not need
/// to move. `StateSurface` below renders its own empty/error modes through
/// this same view, so the look stays one thing across the app.
struct EmptyStateView: View {
    @Environment(\.strings) private var strings
    let symbol: String
    let title: LocalizedStringKey
    let detail: String

    var body: some View {
        VStack(spacing: 10) {
            Image(systemName: symbol)
                .font(.system(size: 32))
                .foregroundStyle(Theme.ink3)
            Text(title)
                .font(Theme.display(20))
                .foregroundStyle(Theme.ink)
            Text(detail)
                .font(Theme.ui(14))
                .foregroundStyle(Theme.ink2)
                .multilineTextAlignment(.center)
        }
        .padding(32)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Theme.paper)
    }
}

/// Content, or whichever of three states stands in its place — loading,
/// error, or empty. Modeled on the web's `AsyncSurface` (`src/components/ui/
/// AsyncSurface.tsx`): `error` wins over everything, then `isLoading`, then
/// `isEmpty`, then `content`.
///
/// The spinner is held back for `delayMs` so a fetch that resolves almost
/// instantly never flashes one — the same debounce the web version does with
/// its own `delayMs`.
struct StateSurface<Content: View>: View {
    @Environment(\.strings) private var strings

    var isLoading: Bool
    var isEmpty: Bool = false
    /// Wins over loading and empty. Pass a plain, student-facing message —
    /// this is rendered through `EmptyStateView`, not surfaced raw.
    var error: String? = nil
    /// Offered as a button under the error message. Omit it (leave `nil`) for
    /// an error that truly cannot be retried.
    var retry: (() -> Void)? = nil
    var empty: EmptyConfig? = nil
    var delayMs: Int = 150
    @ViewBuilder var content: () -> Content

    @State private var showSpinner = false

    struct EmptyConfig {
        let symbol: String
        let title: LocalizedStringKey
        let detail: String

        init(symbol: String, title: LocalizedStringKey, detail: String) {
            self.symbol = symbol
            self.title = title
            self.detail = detail
        }
    }

    var body: some View {
        Group {
            if let error {
                errorState(error)
            } else if isLoading {
                if showSpinner {
                    ProgressView()
                        .tint(Theme.primary)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .accessibilityLabel(strings("Loading"))
                        .accessibilityAddTraits(.updatesFrequently)
                } else {
                    Color.clear
                }
            } else if isEmpty, let empty {
                EmptyStateView(symbol: empty.symbol, title: empty.title, detail: empty.detail)
            } else {
                content()
            }
        }
        // Restarts (and cancels the previous wait) every time `isLoading`
        // flips, so a quick loading -> not-loading -> loading never leaves a
        // stale timer that flips the spinner on late.
        .task(id: isLoading) {
            guard isLoading else { showSpinner = false; return }
            showSpinner = false
            try? await Task.sleep(for: .milliseconds(delayMs))
            if !Task.isCancelled { showSpinner = true }
        }
    }

    @ViewBuilder
    private func errorState(_ message: String) -> some View {
        EmptyStateView(symbol: "wifi.exclamationmark", title: "Couldn't load", detail: message)
            .accessibilityElement(children: .combine)
            .safeAreaInset(edge: .bottom) {
                if let retry {
                    Button {
                        retry()
                    } label: {
                        Text(strings("Retry"))
                            .font(Theme.ui(15, weight: 600))
                            .frame(maxWidth: .infinity)
                            .frame(height: 44)
                            .background(Theme.primary)
                            .foregroundStyle(Theme.onPrimary)
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                    }
                    .padding(.horizontal, 32)
                    .padding(.bottom, 20)
                }
            }
    }
}
