import SwiftUI

/// Shown when the server refuses paid content with a 402 — the trial lapsed or
/// there is no active plan. It replaces the generic "couldn't reach the server"
/// a retryable error would otherwise produce on every study surface.
///
/// nishany has no self-serve payments (mirrors the web `Upgrade` page): access
/// is granted by the team, so this points the student at support and offers a
/// refresh for when access has just been arranged. Free surfaces (Today, and
/// later Study Rooms / Minigames / Question of the Day) stay reachable via
/// "Browse free features".
struct PaywallView: View {
    @Environment(\.strings) private var strings

    /// Re-run sync; if access was just granted, `subscriptionRequired` clears
    /// and the cover dismisses itself.
    let onRefresh: () async -> Void
    /// Leave the paid surface for the free part of the app.
    let onBrowseFree: () -> Void

    @State private var refreshing = false

    private static let supportEmail = "help@nishany.com"

    var body: some View {
        VStack(spacing: 20) {
            Spacer()

            Image(systemName: "lock.circle.fill")
                .font(.system(size: 56))
                .foregroundStyle(Theme.primary)

            VStack(spacing: 8) {
                Text(strings("Full access has ended"))
                    .font(Theme.display(24))
                    .foregroundStyle(Theme.ink)
                    .multilineTextAlignment(.center)

                Text(strings("The question bank, resources, flashcards and the rest of nishany's study tools need an active subscription. Your free trial or plan is no longer active."))
                    .font(Theme.ui(15))
                    .foregroundStyle(Theme.ink2)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 340)
            }

            VStack(spacing: 12) {
                if let mail = URL(string: "mailto:\(Self.supportEmail)?subject=nishany%20subscription") {
                    Link(destination: mail) {
                        Text(strings("Contact \(Self.supportEmail)"))
                            .font(Theme.ui(16, weight: 600))
                            .foregroundStyle(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(Theme.primary, in: RoundedRectangle(cornerRadius: Theme.Radius.lg))
                    }
                }

                Button {
                    Task { refreshing = true; await onRefresh(); refreshing = false }
                } label: {
                    HStack(spacing: 8) {
                        if refreshing { ProgressView().tint(Theme.primary) }
                        Text(strings(refreshing ? "Checking…" : "I've subscribed — refresh"))
                    }
                    .font(Theme.ui(15, weight: 500))
                    .foregroundStyle(Theme.primary)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                    .background(Theme.surface, in: RoundedRectangle(cornerRadius: Theme.Radius.lg))
                }
                .disabled(refreshing)
            }
            .frame(maxWidth: 340)

            Button(strings("Browse free features")) { onBrowseFree() }
                .font(Theme.ui(15))
                .foregroundStyle(Theme.ink2)
                .padding(.top, 4)

            Spacer()
            Spacer()
        }
        .padding(24)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Theme.paper)
    }
}
