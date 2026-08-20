import SwiftUI

/// Where every question in the sitting stands, and a way to jump to any of them.
///
/// A port of `src/components/qbank/QuestionNavigator.tsx`. Five states rather
/// than four: `omitted` means the student reached a question and walked past it
/// without answering, which is not the same as never having got there. Folding
/// the two together is what makes a progress strip useless — someone scanning
/// for unfinished work needs to know which gaps they already went by.
struct QuestionNavigator: View {
    let model: QuestionBankModel
    var store: QBankStore?
    let jump: (Int) -> Void

    @Environment(\.dismiss) private var dismiss

    private let columns = [GridItem(.adaptive(minimum: 46), spacing: 10)]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    LazyVGrid(columns: columns, spacing: 10) {
                        ForEach(model.session.indices, id: \.self) { position in
                            Button { jump(position) } label: {
                                cell(position)
                            }
                            .buttonStyle(.plain)
                        }
                    }

                    legend

                    if !model.omitted.isEmpty {
                        // The one thing worth saying out loud before a student
                        // finishes: these are the ones they meant to come back to.
                        Text("^[\(model.omitted.count) question](inflect: true) you passed over.")
                            .font(Theme.ui(13))
                            .foregroundStyle(Theme.warning)
                    }
                }
                .padding(20)
            }
            .background(Theme.paper)
            .navigationTitle("Questions")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                        .font(Theme.ui(16, weight: 600))
                        .tint(Theme.primary)
                }
            }
        }
    }

    private func cell(_ position: Int) -> some View {
        let state = model.state(at: position)
        let flagged = store.map { $0.isMarked(model.session[position].id) } ?? false

        return Text("\(position + 1)")
            .font(Theme.numeric(14))
            .foregroundStyle(colour(state).ink)
            .frame(maxWidth: .infinity)
            .frame(height: 44)
            .background(colour(state).fill)
            .overlay(
                RoundedRectangle(cornerRadius: Theme.Radius.md)
                    .stroke(colour(state).border, lineWidth: position == model.index ? 2 : 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.md))
            .overlay(alignment: .topTrailing) {
                if flagged {
                    Image(systemName: "flag.fill")
                        .font(.system(size: 8))
                        .foregroundStyle(Theme.primary)
                        .padding(3)
                }
            }
    }

    private var legend: some View {
        HStack(spacing: 14) {
            ForEach(shownStates, id: \.self) { state in
                HStack(spacing: 5) {
                    RoundedRectangle(cornerRadius: 3)
                        .fill(colour(state).fill)
                        .overlay(RoundedRectangle(cornerRadius: 3).stroke(colour(state).border, lineWidth: 1))
                        .frame(width: 12, height: 12)
                    Text(label(state))
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink2)
                }
            }
        }
    }

    /// Right and wrong only once there is something to be right about — before
    /// then the strip would be giving the answers away.
    private var shownStates: [QuestionState] {
        model.isRevealed || model.reviewing
            ? [.correct, .wrong, .omitted, .unseen]
            : [.answered, .omitted, .unseen]
    }

    private func label(_ state: QuestionState) -> String {
        switch state {
        case .answered: "Answered"
        case .correct: "Correct"
        case .wrong: "Wrong"
        case .omitted: "Omitted"
        case .unseen: "Unseen"
        }
    }

    private func colour(_ state: QuestionState) -> (fill: Color, border: Color, ink: Color) {
        switch state {
        // Blue, not crimson. Crimson is the action colour and is what a
        // flag uses, so an answered question drawn in it said the same thing
        // as one marked for review.
        case .answered: (Theme.accentTint, Theme.accent, Theme.accentStrong)
        case .correct: (Theme.successTint, Theme.success, Theme.success)
        case .wrong: (Theme.dangerTint, Theme.danger, Theme.danger)
        case .omitted: (Theme.warningTint, Theme.warning, Theme.warning)
        case .unseen: (Theme.surface, Theme.line, Theme.ink3)
        }
    }
}

/// What a student wrote about one question.
///
/// Kept against the question rather than the sitting, so a note made in March
/// is still there when the same question comes round in June.
struct QuestionNoteSheet: View {
    @Binding var text: String
    var store: QBankStore?
    let save: () -> Void

    @FocusState private var writing: Bool
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 0) {
                TextEditor(text: $text)
                    .font(Theme.ui(15))
                    .foregroundStyle(Theme.ink)
                    .scrollContentBackground(.hidden)
                    .background(Theme.paper)
                    .focused($writing)
                    .padding(.horizontal, 12)

                if let store, store.savingNote || store.savedNote {
                    Text(store.savingNote ? "Saving…" : "Saved")
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink2)
                        .padding(.horizontal, 18)
                        .padding(.bottom, 10)
                }
            }
            .background(Theme.paper)
            .navigationTitle("Your note")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") {
                        save()
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
