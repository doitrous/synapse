import SwiftUI

/// Writing in a sticky note or a text box.
///
/// A real `TextEditor` rather than anything drawn: it is what gives a student
/// the caret, selection, dictation, autocorrect and an Arabic keyboard that
/// lays out right-to-left — the web made the same choice, and for the same
/// reason. Saved on dismissal rather than per keystroke, because every save is
/// a shard rewrite.
struct WidgetTextSheet: View {
    let object: AnnotationObject
    let onSave: (String) -> Void

    @State private var text: String
    @FocusState private var writing: Bool
    @Environment(\.dismiss) private var dismiss

    init(object: AnnotationObject, onSave: @escaping (String) -> Void) {
        self.object = object
        self.onSave = onSave
        _text = State(initialValue: object.text ?? "")
    }

    var body: some View {
        NavigationStack {
            TextEditor(text: $text)
                .font(Theme.ui(16))
                .foregroundStyle(Theme.ink)
                .scrollContentBackground(.hidden)
                .background(Theme.paper)
                .focused($writing)
                .padding(.horizontal, 12)
                .navigationTitle(object.kind == .note ? "Note" : "Text")
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .topBarTrailing) {
                        Button("Done") {
                            onSave(text)
                            dismiss()
                        }
                        .font(Theme.ui(16, weight: 600))
                        .tint(Theme.primary)
                    }
                }
        }
        .presentationDetents([.medium])
        .onAppear { writing = true }
    }
}
