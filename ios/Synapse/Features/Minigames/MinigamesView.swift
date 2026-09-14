import SwiftUI

/// The minigames hub. Light, glossary-driven practice between question sittings.
///
/// Pushed from the More menu's own `NavigationStack`, so it has none of its own.
/// Term Match is the first game to run natively; the others (Term Grid, Spotter,
/// and the authored-pack games) light up here as they arrive.
struct MinigamesView: View {
    @Environment(\.strings) private var strings
    let store: LocalStore
    let sync: SyncEngine
    let api: SynapseAPI

    var body: some View {
        List {
            Section {
                NavigationLink {
                    TermMatchView(store: store)
                } label: {
                    gameRow(
                        "Term Match", symbol: "square.on.square.dashed",
                        detail: "Match each term to its Arabic translation or its definition."
                    )
                }
            } header: {
                Text(strings("Play"))
            } footer: {
                Text(strings("Quick rounds drawn from the published glossary. More games are on the way."))
                    .font(Theme.ui(12))
            }
            .listRowBackground(Theme.surface)
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
        .background(Theme.paper)
        .navigationTitle(strings("Minigames"))
    }

    private func gameRow(_ title: String, symbol: String, detail: String) -> some View {
        HStack(spacing: 12) {
            Image(systemName: symbol)
                .font(.system(size: 18, weight: .semibold))
                .foregroundStyle(Theme.primary)
                .frame(width: 34, height: 34)
                .background(Theme.primaryTint)
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.md))
            VStack(alignment: .leading, spacing: 2) {
                Text(strings(title))
                    .font(Theme.ui(15, weight: 600))
                    .foregroundStyle(Theme.ink)
                Text(strings(detail))
                    .font(Theme.ui(12.5))
                    .foregroundStyle(Theme.ink3)
            }
        }
        .padding(.vertical, 2)
    }
}
