import SwiftUI

/// A student's own notes.
///
/// Stored under the same key the web app uses, so a note written on the phone
/// is there in the browser. Written locally first and uploaded after, so a
/// thought caught on a ward with no signal is not lost.
struct Note: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var title: String
    var body: String
    var tags: [String]
    var updatedAt: String

    static let storageKey = "synapse.notebook.notes"
}

@MainActor
@Observable
final class NotebookModel {
    private(set) var notes: [Note] = []
    private(set) var isLoading = true

    private let api: SynapseAPI
    private let sync: SyncEngine

    init(api: SynapseAPI, sync: SyncEngine) {
        self.api = api
        self.sync = sync
    }

    func load() async {
        isLoading = true
        defer { isLoading = false }
        if let remote = try? await api.userState([Note].self, key: Note.storageKey) {
            notes = (remote.value ?? []).sorted { $0.updatedAt > $1.updatedAt }
        }
    }

    func save(_ note: Note) async {
        var updated = note
        updated.updatedAt = ISO8601DateFormatter.synapse.string(from: Date())

        if let index = notes.firstIndex(where: { $0.id == note.id }) {
            notes[index] = updated
        } else {
            notes.insert(updated, at: 0)
        }
        notes.sort { $0.updatedAt > $1.updatedAt }
        await sync.write(key: Note.storageKey, value: notes)
    }

    func delete(_ note: Note) async {
        notes.removeAll { $0.id == note.id }
        await sync.write(key: Note.storageKey, value: notes)
    }
}

struct NotebookView: View {
    let store: LocalStore
    let sync: SyncEngine

    @State private var model: NotebookModel?
    @State private var editing: Note?
    @State private var query = ""

    let api: SynapseAPI

    init(store: LocalStore, sync: SyncEngine, api: SynapseAPI) {
        self.store = store
        self.sync = sync
        self.api = api
    }

    var body: some View {
        Group {
            if let model {
                content(model)
            } else {
                ProgressView().tint(Theme.accent)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
        }
        .background(Theme.paper)
        .navigationTitle("Notebook")
        .navigationBarTitleDisplayMode(.inline)
        .task {
            if model == nil {
                let created = NotebookModel(api: api, sync: sync)
                model = created
                await created.load()
            }
        }
    }

    private func content(_ model: NotebookModel) -> some View {
        Group {
            if model.notes.isEmpty {
                EmptyStateView(
                    symbol: "note.text",
                    title: "No notes yet",
                    detail: "Anything you write here syncs to the website too."
                )
            } else {
                List {
                    ForEach(filtered(model.notes)) { note in
                        Button {
                            editing = note
                        } label: {
                            VStack(alignment: .leading, spacing: 3) {
                                Text(note.title.isEmpty ? "Untitled" : note.title)
                                    .font(Theme.ui(16, weight: 500))
                                    .foregroundStyle(Theme.ink)
                                if !note.body.isEmpty {
                                    Text(note.body)
                                        .font(Theme.ui(13))
                                        .foregroundStyle(Theme.ink2)
                                        .lineLimit(2)
                                }
                            }
                        }
                        .buttonStyle(.plain)
                        .listRowBackground(Theme.surface)
                        .swipeActions {
                            Button("Delete", role: .destructive) {
                                Task { await model.delete(note) }
                            }
                        }
                    }
                }
                .listStyle(.insetGrouped)
                .scrollContentBackground(.hidden)
                .background(Theme.paper)
                .searchable(text: $query, prompt: "Search notes")
            }
        }
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    editing = Note(id: UUID().uuidString, title: "", body: "", tags: [], updatedAt: "")
                } label: {
                    Image(systemName: "square.and.pencil")
                }
                .tint(Theme.accent)
            }
        }
        .sheet(item: $editing) { note in
            NoteEditor(note: note) { saved in
                Task { await model.save(saved) }
            }
        }
    }

    private func filtered(_ notes: [Note]) -> [Note] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return notes }
        return notes.filter {
            $0.title.localizedCaseInsensitiveContains(trimmed)
                || $0.body.localizedCaseInsensitiveContains(trimmed)
        }
    }
}

private struct NoteEditor: View {
    @State var note: Note
    let save: (Note) -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 12) {
                TextField("Title", text: $note.title)
                    .font(Theme.display(20))
                    .foregroundStyle(Theme.ink)

                TextEditor(text: $note.body)
                    .font(Theme.serifBody(16))
                    .foregroundStyle(Theme.ink)
                    .scrollContentBackground(.hidden)
                    .background(Theme.paper)
            }
            .padding(16)
            .background(Theme.paper)
            .navigationTitle("Note")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") { save(note); dismiss() }
                        .disabled(note.title.trimmed.isEmpty && note.body.trimmed.isEmpty)
                }
            }
        }
    }
}
