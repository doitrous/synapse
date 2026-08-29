import SwiftUI

/// Author a Basic card — a front and a back — into one deck.
///
/// The smallest authoring surface that produces a studyable card. Cloze and
/// image-occlusion authoring build on this later; for now a plain front/back is
/// what the study loop needs to prove the round trip end to end.
struct FlashcardAddView: View {
    @Environment(\.strings) private var strings
    @Environment(\.dismiss) private var dismiss

    @Bindable var store: FlashcardStore
    let deckId: String

    @State private var front = ""
    @State private var back = ""
    @State private var saving = false

    private var canSave: Bool {
        !front.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !back.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    field(strings("Front"), text: $front)
                } header: {
                    Text(strings("Front")).font(Theme.panelTitle()).foregroundStyle(Theme.ink2).textCase(nil)
                }
                .listRowBackground(Theme.surface)

                Section {
                    field(strings("Back"), text: $back)
                } header: {
                    Text(strings("Back")).font(Theme.panelTitle()).foregroundStyle(Theme.ink2).textCase(nil)
                }
                .listRowBackground(Theme.surface)
            }
            .listStyle(.insetGrouped)
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
            .navigationTitle(strings("Add card"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(strings("Cancel")) { dismiss() }.tint(Theme.primary)
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(strings("Save")) { save() }
                        .tint(Theme.primary)
                        .disabled(!canSave || saving)
                }
            }
        }
    }

    private func field(_ prompt: String, text: Binding<String>) -> some View {
        TextField(prompt, text: text, axis: .vertical)
            .font(Theme.ui(16))
            .foregroundStyle(Theme.ink)
            .lineLimit(3...8)
    }

    private func save() {
        saving = true
        let stamp = ISO8601DateFormatter.synapse.string(from: Date())
        let note = FlashcardNote(
            id: FlashcardStore.newId("note"), type: .basic, deckId: deckId, tags: [],
            createdAt: stamp, updatedAt: stamp,
            fields: NoteFields(front: front, back: back),
            image: nil, imageWidth: nil, imageHeight: nil, occluders: nil, groups: nil, mode: nil
        )
        Task {
            await store.saveNote(note)
            dismiss()
        }
    }
}
