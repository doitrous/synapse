import SwiftUI

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
    @Environment(\.strings) private var strings
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
                ProgressView().tint(Theme.primary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
        }
        .background(Theme.paper)
        .navigationTitle(strings("Notebook"))
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
                            NoteRow(note: note)
                        }
                        .buttonStyle(.plain)
                        .listRowBackground(Theme.surface)
                        .swipeActions {
                            Button(strings("Delete"), role: .destructive) {
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
                .tint(Theme.primary)
            }
        }
        .sheet(item: $editing) { note in
            NoteEditor(note: note) { saved in
                Task { await model.save(saved) }
            }
            .localisedSheet()
        }
    }

    /// Searched across what a student would think of as the note: its words,
    /// its tags, and the article it was written from.
    private func filtered(_ notes: [Note]) -> [Note] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return notes }
        return notes.filter { note in
            note.title.localizedCaseInsensitiveContains(trimmed)
                || NotebookDoc.notePlainText(note).localizedCaseInsensitiveContains(trimmed)
                || note.tags.contains { $0.localizedCaseInsensitiveContains(trimmed) }
                || (note.subtopicTitle ?? "").localizedCaseInsensitiveContains(trimmed)
        }
    }
}

/// One note, as it reads in the list.
///
/// The tags, the article it came from and the documents it points at were all
/// being stored and none of them shown, so a note written on the website
/// arrived here stripped of everything that gave it its context.
private struct NoteRow: View {
    @Environment(\.strings) private var strings
    let note: Note

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            Text(note.title.isEmpty ? "Untitled" : note.title)
                .font(Theme.ui(16, weight: 500))
                .foregroundStyle(Theme.ink)

            let preview = NotebookDoc.notePlainText(note)
            if !preview.isEmpty {
                Text(preview)
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink2)
                    .lineLimit(2)
            }

            if let article = note.subtopicTitle, !article.isEmpty {
                Label(article, systemImage: "text.book.closed")
                    .font(Theme.ui(11))
                    .foregroundStyle(Theme.primary)
                    .lineLimit(1)
            }

            if let refs = note.resourceRefs, !refs.isEmpty {
                ForEach(refs) { ref in
                    Label(
                        ref.page.map { "\(ref.label) · p.\($0)" } ?? ref.label,
                        systemImage: "doc.text"
                    )
                    .font(Theme.ui(11))
                    .foregroundStyle(Theme.ink3)
                    .lineLimit(1)
                }
            }

            if !note.tags.isEmpty {
                HStack(spacing: 5) {
                    ForEach(note.tags.prefix(4), id: \.self) { tag in
                        Text(tag)
                            .font(Theme.ui(10))
                            .foregroundStyle(Theme.ink2)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(Theme.inset, in: Capsule())
                    }
                }
            }

            if note.imageData != nil {
                Label(strings("Has an image"), systemImage: "photo")
                    .font(Theme.ui(11))
                    .foregroundStyle(Theme.ink3)
            }
        }
        .padding(.vertical, 2)
    }
}

private struct NoteEditor: View {
    @Environment(\.strings) private var strings
    @State private var note: Note
    let save: (Note) -> Void
    @Environment(\.dismiss) private var dismiss

    /// The title and readable words, edited apart from the note so its other
    /// fields — ink, referenced documents, the rich body written on the web —
    /// ride through untouched and are folded back in only on save.
    @State private var title: String
    @State private var text: String

    /// Reading or writing. Device-scoped, as on the web: whether you are
    /// reading your notes or editing them is about the moment, not the account.
    @AppStorage("nishany.notebook.reading") private var reading = false
    @State private var tagDraft = ""

    init(note: Note, save: @escaping (Note) -> Void) {
        let ensured = NotebookDoc.ensureNotebookEditor(note)
        _note = State(initialValue: ensured)
        _title = State(initialValue: ensured.title)
        _text = State(initialValue: NotebookDoc.notePlainText(ensured))
        self.save = save
    }

    var body: some View {
        NavigationStack {
            Group {
                if reading { readingView } else { editingView }
            }
            .background(Theme.paper)
            .navigationTitle(reading ? "Note" : "Editing")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(strings("Cancel")) { dismiss() }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        reading.toggle()
                    } label: {
                        Image(systemName: reading ? "pencil" : "book")
                    }
                    .tint(Theme.primary)
                    .accessibilityLabel(reading ? "Edit" : "Read")
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(strings("Save")) {
                        save(NotebookDoc.applyingEdit(to: note, title: title, text: text))
                        dismiss()
                    }
                    .disabled(title.trimmed.isEmpty && text.trimmed.isEmpty)
                }
            }
        }
    }

    private var editingView: some View {
        VStack(alignment: .leading, spacing: 12) {
            TextField(strings("Title"), text: $title)
                .font(Theme.display(20))
                .foregroundStyle(Theme.ink)

            if !NotebookDoc.isSimple(note.editorJson) {
                richFormattingNotice
            }

            TextEditor(text: $text)
                .font(Theme.serifBody(16))
                .foregroundStyle(Theme.ink)
                .scrollContentBackground(.hidden)
                .background(Theme.paper)

            tagEditor
            context
        }
        .padding(16)
    }

    /// Shown when a note was formatted on the web with structure this plain
    /// editor cannot represent. Its words are safe; its formatting is not, so
    /// say so rather than quietly flatten a table the next time Save is pressed.
    private var richFormattingNotice: some View {
        Label(
            strings("This note was formatted on the web. Editing here keeps your text but not that formatting."),
            systemImage: "info.circle"
        )
        .font(Theme.ui(12))
        .foregroundStyle(Theme.ink2)
        .padding(10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.inset)
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
    }

    private var readingView: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 14) {
                Text(title.isEmpty ? "Untitled" : title)
                    .font(Theme.display(24))
                    .foregroundStyle(Theme.ink)

                Text(text)
                    .font(Theme.serifBody(17))
                    .foregroundStyle(Theme.ink)
                    .lineSpacing(5)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .textSelection(.enabled)

                if !note.tags.isEmpty {
                    HStack(spacing: 6) {
                        ForEach(note.tags, id: \.self) { tag in
                            Text(tag)
                                .font(Theme.ui(11))
                                .foregroundStyle(Theme.ink2)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 3)
                                .background(Theme.inset, in: Capsule())
                        }
                    }
                }

                context
            }
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
    }

    private var tagEditor: some View {
        VStack(alignment: .leading, spacing: 6) {
            if !note.tags.isEmpty {
                HStack(spacing: 6) {
                    ForEach(note.tags, id: \.self) { tag in
                        Button {
                            note.tags.removeAll { $0 == tag }
                        } label: {
                            HStack(spacing: 3) {
                                Text(tag)
                                Image(systemName: "xmark").font(.system(size: 8))
                            }
                            .font(Theme.ui(11))
                            .foregroundStyle(Theme.ink2)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 3)
                            .background(Theme.inset, in: Capsule())
                        }
                        .buttonStyle(.plain)
                    }
                }
            }

            TextField(strings("Add a tag"), text: $tagDraft)
                .font(Theme.ui(13))
                .submitLabel(.done)
                .onSubmit {
                    let tag = tagDraft.trimmed
                    if !tag.isEmpty, !note.tags.contains(tag) { note.tags.append(tag) }
                    tagDraft = ""
                }
        }
    }

    /// What the note is about, where the website recorded it.
    ///
    /// Shown rather than editable: these are set when a note is written from an
    /// article or a document, and the phone has no way to make that link yet.
    /// Showing them is what stops a note arriving here stripped of its context.
    @ViewBuilder private var context: some View {
        let refs = note.resourceRefs ?? []
        if note.subtopicTitle?.isEmpty == false || !refs.isEmpty {
            VStack(alignment: .leading, spacing: 6) {
                Text(strings("About"))
                    .font(Theme.panelTitle())
                    .foregroundStyle(Theme.ink3)

                if let article = note.subtopicTitle, !article.isEmpty {
                    Label(article, systemImage: "text.book.closed")
                        .font(Theme.ui(13))
                        .foregroundStyle(Theme.primary)
                }

                ForEach(refs) { ref in
                    Label(
                        ref.page.map { "\(ref.label) · page \($0)" } ?? ref.label,
                        systemImage: "doc.text"
                    )
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink2)
                }
            }
            .padding(12)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.surface)
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
        }
    }
}
