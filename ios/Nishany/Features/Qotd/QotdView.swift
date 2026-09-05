import SwiftUI

/// Question of the Day — the day's shared question, a streak, the cohort
/// leaderboard, and how friends did. One screen; answering marks server-side.
struct QotdView: View {
    @Environment(\.strings) private var strings
    @State private var model: QotdModel
    let sync: SyncEngine

    init(store: LocalStore, sync: SyncEngine, api: NishanyAPI, audience: StudentAudience) {
        _model = State(wrappedValue: QotdModel(api: api, store: store, audience: audience))
        self.sync = sync
    }

    var body: some View {
        NavigationStack {
            Group {
                if model.isLoading {
                    ProgressView().tint(Theme.primary)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if let error = model.errorText {
                    EmptyStateView(symbol: "wifi.exclamationmark", title: "Couldn't load", detail: error)
                } else {
                    content
                }
            }
            .background(Theme.paper)
            .navigationTitle(strings("Question of the Day"))
            .navigationBarTitleDisplayMode(.inline)
        }
        .task { await model.load() }
        .onChange(of: sync.status) { _, status in
            if case .done = status { Task { await model.load() } }
        }
    }

    private var content: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                streakHeader

                if let question = model.question {
                    questionBlock(question)
                } else if let reason = model.emptyReason {
                    EmptyStateView(symbol: "questionmark.circle", title: "No question today", detail: reason)
                }

                leaderboardSection
                friendsSection
            }
            .padding(20)
            .frame(maxWidth: 680)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.paper)
    }

    // MARK: - Streak

    private var streakHeader: some View {
        HStack(spacing: 10) {
            Image(systemName: "flame.fill").foregroundStyle(model.current > 0 ? Theme.danger : Theme.ink3)
            Text("\(model.current)")
                .font(Theme.numeric(22))
                .foregroundStyle(Theme.ink)
            Text(model.current == 1 ? "day streak" : "day streak")
                .font(Theme.ui(14))
                .foregroundStyle(Theme.ink2)
            Spacer()
            if model.longest > 0 {
                Text("Longest \(model.longest)")
                    .font(Theme.ui(12))
                    .foregroundStyle(Theme.ink3)
            }
        }
    }

    // MARK: - Question

    @ViewBuilder
    private func questionBlock(_ question: Question) -> some View {
        VStack(alignment: .leading, spacing: 16) {
            if !question.vignette.isEmpty {
                Text(question.vignette)
                    .font(Theme.serifBody(16))
                    .foregroundStyle(Theme.ink)
                    .lineSpacing(5)
            }
            Text(question.stem)
                .font(Theme.ui(18, weight: 600))
                .foregroundStyle(Theme.ink)

            ForEach(question.options) { option in
                OptionRow(
                    option: option,
                    state: optionState(option),
                    isAnswered: model.answered
                ) {
                    Task { await model.answer(option.label) }
                }
            }

            if model.answered {
                reveal(question)
            }
        }
    }

    private func optionState(_ option: AnswerOption) -> OptionRow.State {
        guard model.answered else {
            return option.label == model.chosenLabel ? .chosen : .unanswered
        }
        if option.label == model.correctLabel { return .correct }
        if option.label == model.chosenLabel { return .chosenWrong }
        return .otherWrong
    }

    @ViewBuilder
    private func reveal(_ question: Question) -> some View {
        let correct = question.correctOption
        let separateExplanation = !question.explanation.isEmpty
            && question.explanation != (correct?.explanation ?? "")

        VStack(alignment: .leading, spacing: 12) {
            if let correct, !correct.explanation.isEmpty {
                block("Why the right answer is right", symbol: "checkmark", tint: Theme.success, text: correct.explanation)
            }
            if separateExplanation {
                block("Explanation", symbol: nil, tint: Theme.ink2, text: question.explanation)
            }
            if let objective = question.learningObjective, !objective.isEmpty {
                block("What this tests", symbol: nil, tint: Theme.primaryStrong, text: objective)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private func block(_ title: String, symbol: String?, tint: Color, text: String) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(spacing: 5) {
                if let symbol { Image(systemName: symbol).font(.system(size: 11, weight: .bold)) }
                Text(strings(title)).font(Theme.panelTitle())
            }
            .foregroundStyle(tint)
            Text(text)
                .font(Theme.serifBody(15))
                .foregroundStyle(Theme.ink)
                .lineSpacing(4)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
    }

    // MARK: - Leaderboard

    @ViewBuilder
    private var leaderboardSection: some View {
        if let board = model.leaderboard, !board.rows.isEmpty {
            VStack(alignment: .leading, spacing: 10) {
                Text(strings("Cohort leaderboard")).font(Theme.panelTitle()).foregroundStyle(Theme.ink2)
                ForEach(board.rows) { row in
                    HStack(spacing: 12) {
                        Text("\(row.rank)")
                            .font(Theme.numeric(13)).foregroundStyle(Theme.ink3)
                            .frame(width: 24, alignment: .leading)
                        Text(row.username).font(Theme.ui(14)).foregroundStyle(Theme.ink)
                        Spacer()
                        Label("\(row.current)", systemImage: "flame.fill")
                            .font(Theme.ui(12)).foregroundStyle(Theme.ink2).labelStyle(.titleAndIcon)
                        Text("\(row.totalCorrect)✓").font(Theme.numeric(12)).foregroundStyle(Theme.ink3)
                    }
                }
                if let rank = board.viewer.rank {
                    Text("You — #\(rank) of \(board.viewer.total)")
                        .font(Theme.ui(12)).foregroundStyle(Theme.primaryStrong)
                }
            }
            .padding(14)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
        }
    }

    // MARK: - Friends

    @ViewBuilder
    private var friendsSection: some View {
        if let friends = model.friends, !friends.friends.isEmpty {
            VStack(alignment: .leading, spacing: 10) {
                Text(strings("Friends")).font(Theme.panelTitle()).foregroundStyle(Theme.ink2)
                ForEach(friends.friends) { friend in
                    HStack(spacing: 12) {
                        Text(friend.name).font(Theme.ui(14)).foregroundStyle(Theme.ink)
                        Spacer()
                        friendStatus(friend)
                    }
                }
            }
            .padding(14)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
        }
    }

    @ViewBuilder
    private func friendStatus(_ friend: QotdFriends.Friend) -> some View {
        if !friend.answered {
            Text(strings("Not yet")).font(Theme.ui(12)).foregroundStyle(Theme.ink3)
        } else if let correct = friend.correct {
            Image(systemName: correct ? "checkmark.circle.fill" : "xmark.circle.fill")
                .foregroundStyle(correct ? Theme.success : Theme.danger)
        } else {
            Image(systemName: "circle.fill").font(.system(size: 8)).foregroundStyle(Theme.ink3)
        }
    }
}
