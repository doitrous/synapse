import SwiftUI

/// One answer option, however it is being looked at.
///
/// Shared between the question bank and a shared room's review: a question that
/// has been answered reads the same wherever it is met, and two renderings of
/// the same thing drift.
struct OptionRow: View {
    enum State { case unanswered, chosen, correct, chosenWrong, otherWrong }

    let option: AnswerOption
    let state: State
    let isAnswered: Bool
    let choose: () -> Void

    var body: some View {
        Button(action: choose) {
            VStack(alignment: .leading, spacing: 8) {
                HStack(alignment: .top, spacing: 10) {
                    Text(option.label)
                        .font(Theme.numeric(13))
                        .foregroundStyle(labelColor)
                        .frame(width: 20, alignment: .leading)
                    Text(option.text)
                        .font(Theme.ui(15))
                        .foregroundStyle(Theme.ink)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    if let symbol {
                        Image(systemName: symbol).foregroundStyle(labelColor)
                    }
                }

            }
            .padding(14)
            .background(background)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(border, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
        }
        .buttonStyle(.plain)
        .disabled(isAnswered)
    }

    private var symbol: String? {
        switch state {
        case .correct: "checkmark"
        case .chosenWrong: "xmark"
        default: nil
        }
    }

    private var labelColor: Color {
        switch state {
        case .correct: Theme.success
        case .chosenWrong: Theme.danger
        case .chosen: Theme.accentStrong
        default: Theme.ink3
        }
    }

    private var background: Color {
        switch state {
        case .unanswered, .otherWrong: Theme.surface
        case .chosen: Theme.accentTint
        case .correct, .chosenWrong: Theme.surface2
        }
    }

    private var border: Color {
        switch state {
        case .correct: Theme.success
        case .chosenWrong: Theme.danger
        case .chosen: Theme.accent
        default: Theme.line
        }
    }
}
