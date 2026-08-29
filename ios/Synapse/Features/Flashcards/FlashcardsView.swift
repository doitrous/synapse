import SwiftUI

/// Spaced-repetition flashcards — decks, study, and authoring.
///
/// The whole feature is a thin UI over `FlashcardStore`, which owns the synced
/// collection and review log. Decks made on the website appear here and vice
/// versa, because the store reads and writes the same account keys.
struct FlashcardsView: View {
    @Environment(\.strings) private var strings

    let store: LocalStore
    let sync: SyncEngine
    let api: SynapseAPI
    let audience: StudentAudience

    @State private var decks: FlashcardStore
    @State private var creatingDeck = false
    @State private var newDeckName = ""

    init(store: LocalStore, sync: SyncEngine, api: SynapseAPI, audience: StudentAudience) {
        self.store = store
        self.sync = sync
        self.api = api
        self.audience = audience
        _decks = State(wrappedValue: FlashcardStore(api: api, sync: sync))
    }

    var body: some View {
        NavigationStack {
            Group {
                if !decks.isLoaded {
                    ProgressView().tint(Theme.primary)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if decks.decks.isEmpty {
                    empty
                } else {
                    deckList
                }
            }
            .background(Theme.paper)
            .navigationTitle(strings("Flashcards"))
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        newDeckName = ""
                        creatingDeck = true
                    } label: {
                        Image(systemName: "plus")
                    }
                    .tint(Theme.primary)
                    .accessibilityLabel(strings("New deck"))
                    .disabled(!decks.isLoaded)
                }
                ToolbarItem(placement: .topBarTrailing) {
                    AssistantButton(surface: "Flashcards")
                }
            }
            .alert(strings("New deck"), isPresented: $creatingDeck) {
                TextField(strings("Deck name"), text: $newDeckName)
                Button(strings("Cancel"), role: .cancel) {}
                Button(strings("Create")) {
                    let name = newDeckName.trimmingCharacters(in: .whitespacesAndNewlines)
                    guard !name.isEmpty else { return }
                    Task { await decks.createDeck(name: name) }
                }
            }
        }
        .task { await decks.load() }
        // The collection can arrive from a website change after this screen has
        // loaded; refresh the derived views when a sync settles.
        .onChange(of: sync.status) { _, status in
            if case .done = status { Task { await decks.load() } }
        }
    }

    private var empty: some View {
        VStack(spacing: 16) {
            EmptyStateView(
                symbol: "rectangle.on.rectangle.angled",
                title: "No decks yet",
                detail: strings("Make a deck, add a few cards, and they will be waiting on the website too.")
            )
            Button {
                newDeckName = ""
                creatingDeck = true
            } label: {
                Text(strings("New deck"))
                    .font(Theme.ui(16, weight: 600))
                    .foregroundStyle(.white)
                    .padding(.horizontal, 20)
                    .padding(.vertical, 12)
                    .background(Theme.primary, in: Capsule())
            }
            .buttonStyle(.plain)
        }
    }

    private var deckList: some View {
        List {
            ForEach(decks.decks) { deck in
                NavigationLink {
                    DeckDetailView(store: decks, deckId: deck.id)
                } label: {
                    DeckRow(counts: decks.counts(forDeck: deck.id), name: deck.name)
                }
                .listRowBackground(Theme.surface)
            }
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
        .background(Theme.paper)
        .refreshable {
            await sync.refresh()
            await decks.load()
        }
    }
}

/// One deck in the list: its name, and the new/due work waiting in it.
private struct DeckRow: View {
    @Environment(\.strings) private var strings
    let counts: DeckCounts
    let name: String

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(name)
                .font(Theme.ui(16, weight: 500))
                .foregroundStyle(Theme.ink)
            HStack(spacing: 12) {
                pill("\(counts.new)", label: "new", tint: Theme.primary)
                pill("\(counts.reviewDue + counts.learning)", label: "due", tint: Theme.success)
                Text("\(counts.total) card\(counts.total == 1 ? "" : "s")")
                    .font(Theme.numeric(11))
                    .foregroundStyle(Theme.ink3)
            }
        }
        .padding(.vertical, 3)
    }

    private func pill(_ value: String, label: String, tint: Color) -> some View {
        HStack(spacing: 4) {
            Text(value).font(Theme.numeric(13)).foregroundStyle(tint)
            Text(strings(label)).font(Theme.ui(11)).foregroundStyle(Theme.ink3)
        }
    }
}

/// A single deck: what is due, and the ways in — study it, or add to it.
struct DeckDetailView: View {
    @Environment(\.strings) private var strings
    @Bindable var store: FlashcardStore
    let deckId: String

    @State private var studying = false
    @State private var adding = false

    private var counts: DeckCounts { store.counts(forDeck: deckId) }
    private var deckName: String { store.deck(deckId)?.name ?? "" }

    var body: some View {
        List {
            Section {
                countRow("Due for review", counts.reviewDue + counts.learning, Theme.success)
                countRow("New", counts.new, Theme.primary)
                countRow("Total", counts.total, Theme.ink2)
            }
            .listRowBackground(Theme.surface)

            Section {
                Button {
                    studying = true
                } label: {
                    Label(strings("Study"), systemImage: "play.fill")
                        .font(Theme.ui(16, weight: 600))
                        .foregroundStyle(store.studyQueue(forDeck: deckId).isEmpty ? Theme.ink3 : Theme.primary)
                }
                .disabled(store.studyQueue(forDeck: deckId).isEmpty)

                Button {
                    adding = true
                } label: {
                    Label(strings("Add card"), systemImage: "plus.circle")
                        .font(Theme.ui(16))
                        .foregroundStyle(Theme.ink)
                }
            }
            .listRowBackground(Theme.surface)
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
        .background(Theme.paper)
        .navigationTitle(deckName)
        .navigationBarTitleDisplayMode(.inline)
        .fullScreenCover(isPresented: $studying) {
            FlashcardStudyView(store: store, deckId: deckId)
        }
        .sheet(isPresented: $adding) {
            FlashcardAddView(store: store, deckId: deckId)
                .localisedSheet()
        }
    }

    private func countRow(_ label: String, _ value: Int, _ tint: Color) -> some View {
        HStack {
            Text(strings(label)).font(Theme.ui(15)).foregroundStyle(Theme.ink2)
            Spacer()
            Text("\(value)").font(Theme.numeric(17)).foregroundStyle(tint)
        }
    }
}
