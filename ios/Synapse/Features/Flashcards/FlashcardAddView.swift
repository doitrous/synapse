import SwiftUI
import UIKit

/// Author a card into one deck — Basic (front/back) or Cloze (one block of text
/// with `{{c1::…}}` deletions).
///
/// The cloze editor is a `UITextView` rather than SwiftUI's `TextEditor` for one
/// reason: it exposes the selection as an `NSRange`, which is UTF-16 — exactly
/// the units `Cloze.insert` wants — so "make the selected word a cloze" is a
/// direct call with no index gymnastics.
struct FlashcardAddView: View {
    @Environment(\.strings) private var strings
    @Environment(\.dismiss) private var dismiss

    @Bindable var store: FlashcardStore
    let deckId: String

    @State private var type: NoteType = .basic
    @State private var front = ""
    @State private var back = ""
    @State private var clozeText = ""
    @State private var clozeExtra = ""
    @State private var selection = NSRange(location: 0, length: 0)
    @State private var saving = false

    private var clozeValidation: ClozeValidation { Cloze.validate(clozeText) }

    private var canSave: Bool {
        switch type {
        case .basic:
            return !front.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
                && !back.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
        case .cloze:
            return clozeValidation.ok
        case .imageOcclusion:
            return false
        }
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Picker(strings("Card type"), selection: $type) {
                        Text(strings("Basic")).tag(NoteType.basic)
                        Text(strings("Cloze")).tag(NoteType.cloze)
                    }
                    .pickerStyle(.segmented)
                }
                .listRowBackground(Theme.surface)

                if type == .basic {
                    basicFields
                } else {
                    clozeFields
                }
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

    @ViewBuilder
    private var basicFields: some View {
        Section {
            field(strings("Front"), text: $front)
        } header: {
            header("Front")
        }
        .listRowBackground(Theme.surface)

        Section {
            field(strings("Back"), text: $back)
        } header: {
            header("Back")
        }
        .listRowBackground(Theme.surface)
    }

    @ViewBuilder
    private var clozeFields: some View {
        Section {
            ClozeTextEditor(text: $clozeText, selectedRange: $selection)
                .frame(minHeight: 120)
            Button {
                let r = clozeText.isEmpty ? NSRange(location: 0, length: 0) : selection
                let result = Cloze.insert(clozeText, selStart: r.location, selEnd: r.location + r.length)
                clozeText = result.text
                selection = NSRange(location: result.caret, length: 0)
            } label: {
                Label(strings("Make cloze"), systemImage: "bracket.square")
                    .font(Theme.ui(14, weight: 600))
                    .foregroundStyle(Theme.primary)
            }
        } header: {
            header("Text")
        } footer: {
            clozeStatus
        }
        .listRowBackground(Theme.surface)

        Section {
            field(strings("Extra (optional)"), text: $clozeExtra)
        } header: {
            header("Extra")
        }
        .listRowBackground(Theme.surface)
    }

    @ViewBuilder
    private var clozeStatus: some View {
        if clozeText.isEmpty {
            Text(strings("Select a word and tap Make cloze, or type {{c1::like this}}."))
                .font(Theme.ui(12)).foregroundStyle(Theme.ink3)
        } else if let error = clozeValidation.errors.first {
            Text(strings(message(for: error)))
                .font(Theme.ui(12)).foregroundStyle(Theme.danger)
        } else {
            let n = Cloze.numbers(clozeText).count
            Text("\(n) card\(n == 1 ? "" : "s")")
                .font(Theme.numeric(12)).foregroundStyle(Theme.success)
        }
    }

    private func message(for error: ClozeError) -> String {
        switch error {
        case .noCloze: return "Wrap a word in a cloze to make a card."
        case .emptyDeletion: return "A cloze deletion is empty."
        case .unbalanced: return "There is an unclosed {{ or }}."
        case .zeroNumber: return "Cloze numbers start at 1."
        }
    }

    private func header(_ title: String) -> some View {
        Text(strings(title)).font(Theme.panelTitle()).foregroundStyle(Theme.ink2).textCase(nil)
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
        let fields: NoteFields = type == .basic
            ? NoteFields(front: front, back: back)
            : NoteFields(text: clozeText, extra: clozeExtra)
        let note = FlashcardNote(
            id: FlashcardStore.newId("note"), type: type, deckId: deckId, tags: [],
            createdAt: stamp, updatedAt: stamp, fields: fields,
            image: nil, imageWidth: nil, imageHeight: nil, occluders: nil, groups: nil, mode: nil
        )
        Task {
            await store.saveNote(note)
            dismiss()
        }
    }
}

/// A plain `UITextView` bridged to SwiftUI so its selection (an `NSRange` in
/// UTF-16) is available to the "make cloze" action.
private struct ClozeTextEditor: UIViewRepresentable {
    @Binding var text: String
    @Binding var selectedRange: NSRange

    func makeUIView(context: Context) -> UITextView {
        let view = UITextView()
        view.delegate = context.coordinator
        view.font = .systemFont(ofSize: 16)
        view.textColor = UIColor(Theme.ink)
        view.backgroundColor = .clear
        view.textContainerInset = .zero
        view.textContainer.lineFragmentPadding = 0
        view.autocorrectionType = .default
        view.isScrollEnabled = true
        return view
    }

    func updateUIView(_ view: UITextView, context: Context) {
        if view.text != text { view.text = text }
        // Re-apply the caret after a programmatic edit (Make cloze), clamped so a
        // shorter text can never carry a stale out-of-range selection.
        let end = (view.text as NSString).length
        let clamped = NSRange(location: min(selectedRange.location, end), length: 0)
        if view.selectedRange != clamped && !view.isFirstResponder {
            view.selectedRange = clamped
        } else if view.selectedRange.location > end {
            view.selectedRange = clamped
        }
    }

    func makeCoordinator() -> Coordinator { Coordinator(self) }

    final class Coordinator: NSObject, UITextViewDelegate {
        private let parent: ClozeTextEditor
        init(_ parent: ClozeTextEditor) { self.parent = parent }

        func textViewDidChange(_ view: UITextView) {
            parent.text = view.text
            parent.selectedRange = view.selectedRange
        }

        func textViewDidChangeSelection(_ view: UITextView) {
            parent.selectedRange = view.selectedRange
        }
    }
}
