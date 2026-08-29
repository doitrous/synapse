import SwiftUI

/// Spaced-repetition flashcards.
///
/// A placeholder shell for now: the tab exists so navigation settles into its
/// final shape before the feature lands, and so a student who taps it is told
/// what is coming rather than finding a surface that is simply missing. The
/// deck store, study loop, and the SM-2 / FSRS schedulers arrive behind this.
struct FlashcardsView: View {
    @Environment(\.strings) private var strings

    let store: LocalStore
    let sync: SyncEngine
    let api: SynapseAPI
    let audience: StudentAudience

    var body: some View {
        NavigationStack {
            EmptyStateView(
                symbol: "rectangle.on.rectangle.angled",
                title: "Flashcards",
                detail: strings("Spaced-repetition flashcards are coming to the app. Your decks and reviews will sync with the website.")
            )
            .background(Theme.paper)
            .navigationTitle(strings("Flashcards"))
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    AssistantButton(surface: "Flashcards")
                }
            }
        }
    }
}
